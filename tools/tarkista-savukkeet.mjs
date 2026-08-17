// SAVUKEVARTIJA — vertaa savukkeiden ui.X-viittaukset UI:n toteutukseen.
//
//   node tools/tarkista-savukkeet.mjs
//
// MIKSI: savukkeet ajavat selaimessa window.matkakirja.ui:ta vasten,
// mutta mikään portti ei aja savukkeita — kun UI:n metodi tai kenttä
// siirtyy tai vaihtaa nimeä, savuke hajoaa hiljaa (moduuliremontin
// M3–M5a katkaisivat 7 savuketta kenenkään huomaamatta, todettu
// auditissa 17.8.2026). Tämä vartija lukee savukkeet ja UI:n TEKSTINÄ
// ja kaatuu, jos savuke viittaa johonkin, mitä toteutuksessa ei ole.
//
// MITÄ TARKISTETAAN (kommentit, merkkijonot ja regexit tyhjätään
// ensin, joten proosa ei laukaise):
//
//   1. KUTSU ui.metodi(...): metodin on löydyttävä UI-luokasta —
//      tai savukkeen on itse kirjoitettava kenttä samassa
//      tiedostossa (monkeypatch, esim. ui.alkuperainenVaihda = ...).
//   2. LUKU ui.kenttä: kentän on oltava UI-luokan metodi, toteutuksen
//      asettama kenttä (this.X = ui.js:ssä tai ui.X = js/-moduulissa)
//      tai savukkeen itsensä samassa tiedostossa kirjoittama
//      mittarikenttä (esim. ui.sivunvaihdot = 0). Poikkeus: ui.X.bind()
//      vaatii aina toteutuksen nimen — monkeypatch kirjoittaa saman
//      nimen, joten oma kirjoitus ei saa peittää kadonnutta metodia.
//   3. ui.lehtitila.X luku JA kirjoitus: X:n on oltava lehtitila-
//      olion dokumentoitu kenttä (ui.js:n rakentimen literaali) —
//      väärä avain tarkoittaisi, että savuke luulee nollaavansa
//      tilaa, jota peli ei lue.
//
// RAJAT: vain ensimmäinen pistetaso tarkistetaan (ui.game.x ohittuu
// game-kenttänä) eikä destrukturointia (const { x } = ui) tunnisteta —
// savukkeissa kumpaakaan ei käytetä UI-tilaan. Vartija kaatuu
// mieluummin kuin vaikenee: jos jäsennys tuottaa epäilyttävän vähän
// nimiä, ajo päättyy virheeseen.

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { tyhjaaEiKoodi } from './lahde-tyhjays.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const NIMI = '[A-Za-z_$][A-Za-z0-9_$]*';

/* ---------- UI:n toteutuksen nimet ---------- */

// UI-luokan metodit: 2 välilyönnin sisennys luokkarungossa on talon
// tyyli (tarkista-niputuksen rivipohjainen oppi). Runko luetaan
// "export class UI {" -rivistä tiedoston loppuun — luokka on
// tiedoston viimeinen lohko.
function lueMetodit(puhdasUi) {
  const alku = puhdasUi.indexOf('export class UI');
  if (alku < 0) throw new Error('export class UI ei löydy js/ui.js:stä');
  const runko = puhdasUi.slice(alku);
  const metodit = new Set();
  const re = new RegExp(`^  (?:static\\s+|async\\s+|get\\s+|set\\s+)*(${NIMI})\\s*\\(`, 'gm');
  for (const m of runko.matchAll(re)) metodit.add(m[1]);
  if (metodit.size < 150) {
    throw new Error(`UI-luokasta löytyi vain ${metodit.size} metodia — tarkista lukutapa`);
  }
  return metodit;
}

// Toteutuksen asettamat kentät: this.X = ui.js:ssä sekä ui.X =
// js/-moduuleissa (pinnat kirjoittavat ui-olioon delegoituina).
function lueKentat(puhdasUi) {
  const kentat = new Set();
  const asetus = `\\s*(?:\\?\\?=|\\|\\|=|&&=|=(?!=))`;
  for (const m of puhdasUi.matchAll(new RegExp(`\\bthis\\.(${NIMI})${asetus}`, 'g'))) {
    kentat.add(m[1]);
  }
  for (const tiedosto of readdirSync(join(root, 'js'))) {
    if (!tiedosto.endsWith('.js')) continue;
    const puhdas = tyhjaaEiKoodi(read(join('js', tiedosto)));
    for (const m of puhdas.matchAll(new RegExp(`\\bui\\.(${NIMI})${asetus}`, 'g'))) {
      kentat.add(m[1]);
    }
  }
  if (kentat.size < 100) {
    throw new Error(`toteutuksesta löytyi vain ${kentat.size} kenttää — tarkista lukutapa`);
  }
  return kentat;
}

// lehtitila-olion dokumentoidut kentät (ui.js:n rakentimen literaali).
function lueLehtitilanKentat(puhdasUi) {
  const alku = puhdasUi.indexOf('this.lehtitila = {');
  if (alku < 0) throw new Error('this.lehtitila-literaalia ei löydy js/ui.js:stä');
  const loppu = puhdasUi.indexOf('};', alku);
  const lohko = puhdasUi.slice(alku, loppu);
  const kentat = new Set();
  for (const m of lohko.matchAll(new RegExp(`^\\s+(${NIMI}):`, 'gm'))) kentat.add(m[1]);
  if (kentat.size < 25) {
    throw new Error(`lehtitilasta löytyi vain ${kentat.size} kenttää — tarkista lukutapa`);
  }
  return kentat;
}

/* ---------- Savukkeiden viittausten poiminta ---------- */

function savukeTiedostot() {
  const listat = [];
  for (const tiedosto of readdirSync(join(root, 'tools'))) {
    if (/^(savuke|kuvaa)-.*\.mjs$/.test(tiedosto)) listat.push(join('tools', tiedosto));
  }
  for (const tiedosto of readdirSync(join(root, 'tools/savukkeet'))) {
    if (/\.mjs$/.test(tiedosto)) listat.push(join('tools/savukkeet', tiedosto));
  }
  if (listat.length < 15) {
    throw new Error(`savukkeita löytyi vain ${listat.length} — tarkista lukutapa`);
  }
  return listat.sort();
}

// Poimii tiedostosta kaikki ui.X- ja ui.lehtitila.X-viittaukset.
// Palauttaa { rivi, nimi, lehtitilanJasen, kutsu, kirjoitus }.
function poimiViittaukset(puhdas) {
  const viittaukset = [];
  const re = new RegExp(
    `\\bui\\.(?:(lehtitila)(?:\\?\\.|\\.)(${NIMI})|(${NIMI}))`, 'g',
  );
  for (const m of puhdas.matchAll(re)) {
    const nimi = m[3] ?? m[1];
    const lehtitilanJasen = m[2] ?? null;
    const jatko = puhdas.slice(m.index + m[0].length).replace(/^\s+/, '');
    const kutsu = jatko.startsWith('(') || jatko.startsWith('?.(');
    const kirjoitus = /^(?:\?\?=|\|\|=|&&=|=(?![=>]))/.test(jatko);
    // ui.X.bind(ui) = monkeypatchin pohja: X:n on oltava toteutuksen
    // nimi, eikä savukkeen oma kirjoitus kelpaa alibiksi — juuri näin
    // ui.avaaNahtavyys-kietaisu kaatui hiljaa M4:n jälkeen.
    const sidonta = jatko.startsWith('.bind(');
    const rivi = puhdas.slice(0, m.index).split('\n').length;
    viittaukset.push({ rivi, nimi, lehtitilanJasen, kutsu, kirjoitus, sidonta });
  }
  return viittaukset;
}

/* ---------- Vertailu ---------- */

const puhdasUi = tyhjaaEiKoodi(read('js/ui.js'));
const metodit = lueMetodit(puhdasUi);
const kentat = lueKentat(puhdasUi);
const lehtitila = lueLehtitilanKentat(puhdasUi);

const viat = [];
let viittauksia = 0;
for (const tiedosto of savukeTiedostot()) {
  const viittaukset = poimiViittaukset(tyhjaaEiKoodi(read(tiedosto)));
  viittauksia += viittaukset.length;
  // Savukkeen itse kirjoittamat kentät (mittarit, monkeypatchit)
  // kelpaavat saman tiedoston lukuihin ja kutsuihin.
  const omat = new Set(viittaukset.filter((v) => v.kirjoitus && !v.lehtitilanJasen)
    .map((v) => v.nimi));
  for (const v of viittaukset) {
    if (v.lehtitilanJasen) {
      if (!lehtitila.has(v.lehtitilanJasen)) {
        viat.push(`${tiedosto}:${v.rivi} ui.lehtitila.${v.lehtitilanJasen} ei ole `
          + 'lehtitila-olion kenttä (ks. js/ui.js rakentimen literaali)');
      }
      continue;
    }
    if (v.sidonta && !metodit.has(v.nimi) && !kentat.has(v.nimi)) {
      viat.push(`${tiedosto}:${v.rivi} ui.${v.nimi}.bind(...) — ${v.nimi} ei ole `
        + 'UI:n metodi eikä kenttä (savukkeen oma kirjoitus ei kelpaa sidontaan)');
      continue;
    }
    if (v.kutsu && !metodit.has(v.nimi) && !omat.has(v.nimi)) {
      viat.push(`${tiedosto}:${v.rivi} ui.${v.nimi}(...) ei ole UI-luokan metodi`);
      continue;
    }
    if (!v.kutsu && !v.kirjoitus && !metodit.has(v.nimi) && !kentat.has(v.nimi)
      && !omat.has(v.nimi)) {
      viat.push(`${tiedosto}:${v.rivi} ui.${v.nimi} ei ole UI:n kenttä eikä metodi`);
    }
  }
}

if (viittauksia < 100) {
  console.error(`SAVUKEVARTIJA: vain ${viittauksia} ui-viittausta löytyi — tarkista lukutapa`);
  process.exit(1);
}
if (viat.length) {
  console.error(`SAVUKEVARTIJA: ${viat.length} vikaa\n`);
  for (const vika of viat) console.error(`  - ${vika}`);
  process.exit(1);
}
console.log(`savukkeet kunnossa: ${viittauksia} ui-viittausta, `
  + `${metodit.size} metodia, ${kentat.size} kenttää, ${lehtitila.size} lehtitilan kenttää`);
