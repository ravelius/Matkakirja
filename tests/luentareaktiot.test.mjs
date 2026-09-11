/*
 * LUENTAREAKTIOT — pulu reagoi isoisän luennan sisällä.
 *
 * Raamattu: PULU REAGOI TEKSTIN SISALLA; skeema docs/pulu-reaktiot.md
 * osiossa "Luentareaktiot (tekstin sisällä)". Testi vartioi kolmea
 * asiaa, joita ei näe pelistä kuin kuuntelemalla:
 *
 *   1. ANKKURIN RATKAISU: pakin `ankkuri` löytyy äänitteen
 *      sanakohtaisista aikaleimoista sanasta sanaan, välimerkeistä ja
 *      kirjainkoosta riippumatta — eikä löytymätön ankkuri koskaan
 *      arvaa hetkeä.
 *   2. AJOITUS: reaktio ammutaan kerran ja oikeassa kohdassa; tauko ei
 *      ammu, kelaus eteenpäin ei ammu väliin jääneitä, kelaus
 *      taaksepäin palauttaa ne.
 *   3. SISÄLLÖN VARTIO: jokaisen fokusvirtapakin reaktioankkuri löytyy
 *      sen OMASTA luentatekstistä ja tarkoitus kuuluu sallittuun
 *      joukkoon. Väärä ankkuri olisi pelissä pelkkää hiljaisuutta.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import {
  REAKTION_TARKOITUKSET, aikaleimojenOsoite, kaupunkiOsoitteesta, kytkeLuentareaktiot,
  lataaLuentareaktiot, ratkaiseAnkkurit,
} from '../js/luentareaktiot.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { karsiTagit } from '../tools/generoi-linssiluennat.mjs';
import { REAKTION_TARKOITUKSET as TYOKALUN_TARKOITUKSET, etsiAnkkuri, sanoiksi } from '../tools/kohdista-luennat.mjs';

const JUURI = new URL('..', import.meta.url);
const lue = (polku) => readFileSync(new URL(polku, JUURI), 'utf8');

/** Aikaleimatiedosto tekstistä: sana sekunnin välein, 400 ms per sana. */
function aikaleimat(teksti) {
  const sanat = teksti.split(/\s+/).filter(Boolean).map((sana, i) => ({
    sana, alku: i * 1000, loppu: i * 1000 + 400,
  }));
  return { versio: 1, teksti, kesto: sanat.length * 1000, sanat, lauseet: [0] };
}

/** Soitinta esittävä EventTarget (sama tyyli kuin livia-tilanteet-testi). */
function soitin() {
  const a = new EventTarget();
  a.currentTime = 0;
  a.paused = false;
  a.ended = false;
  a.aja = (sekunnit) => { a.currentTime = sekunnit; a.dispatchEvent(new Event('timeupdate')); };
  return a;
}

/** Kerää reaction-tapahtumat testin ajaksi. */
function kuuntele(t) {
  const osumat = [];
  const off = kuunteleLivianTilanteita((laji, tiedot) => {
    if (laji === 'reaction') osumat.push(tiedot);
  });
  t.after(off);
  return osumat;
}

test('ankkuri ratkeaa sanasta sanaan; välimerkit ja kirjainkoko eivät ratkaise', () => {
  const data = aikaleimat('Ostin palan saippuaa. Terva, kala ja suolavesi seurasivat minua.');
  const lista = ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'Ostin palan.', tarkoitus: 'myotailee', voimakkuus: 0.3, siirtyma: 0 },
    { id: 'b', ankkuri: 'terva KALA ja suolavesi', tarkoitus: 'huvittuu', voimakkuus: 0.45, siirtyma: 120 },
  ], data);
  // "palan" on toinen sana: loppu 1400 ms.
  assert.deepEqual(lista[0], { id: 'a', hetki: 1400, tarkoitus: 'myotailee', voimakkuus: 0.3 });
  // "suolavesi" on seitsemäs sana (indeksi 6): loppu 6400 + siirtymä 120.
  assert.deepEqual(lista[1], { id: 'b', hetki: 6520, tarkoitus: 'huvittuu', voimakkuus: 0.45 });
});

test('löytymätön ankkuri ja tuntematon tarkoitus ohitetaan, ei arvata hetkeä', () => {
  const data = aikaleimat('Marseillen satamassa myytiin saippuaa tiiliskivinä.');
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'ei-ole', ankkuri: 'kauppias vakuutti', tarkoitus: 'epailee', voimakkuus: 0.5 },
    { id: 'vaara-tarkoitus', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'nauraa', voimakkuus: 0.5 },
    { id: 'tyhja', ankkuri: '', tarkoitus: 'huvittuu', voimakkuus: 0.5 },
  ], data), []);
  // Ilman aikaleimoja ei synny yhtään hetkeä (ei merkkimääräarvioita).
  assert.deepEqual(ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'huvittuu', voimakkuus: 0.5 },
  ], null), []);
  // Voimakkuus rajataan, puuttuva siirtymä on nolla.
  const [rivi] = ratkaiseAnkkurit([
    { id: 'a', ankkuri: 'saippuaa tiiliskivinä', tarkoitus: 'huvittuu', voimakkuus: 3 },
  ], data);
  assert.deepEqual(rivi, { id: 'a', hetki: 4400, tarkoitus: 'huvittuu', voimakkuus: 1 });
});

test('reaktio ammutaan kerran ja vasta hetkellään; tauko ei ammu', (t) => {
  const osumat = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 2000, tarkoitus: 'huvittuu', voimakkuus: 0.35 },
    { id: 'r2', hetki: 3000, tarkoitus: 'epailee', voimakkuus: 0.5 },
  ], { kaupunki: 'marseille' });
  t.after(purku);

  a.dispatchEvent(new Event('playing'));
  a.aja(1.5);
  assert.equal(osumat.length, 0, 'ennen hetkeä ei ammuta');
  a.aja(2.1);
  assert.equal(osumat.length, 1);
  assert.equal(osumat[0].tunnus, 'r1');
  assert.equal(osumat[0].lahde, 'matkakirja');
  assert.equal(osumat[0].kaupunki, 'marseille');
  assert.equal(osumat[0].tarkoitus, 'huvittuu');
  assert.equal(osumat[0].voimakkuus, 0.35);
  assert.equal(osumat[0].tunnus2, a, 'soitin kulkee mukana eleen omistajaksi');
  a.aja(2.4);
  assert.equal(osumat.length, 1, 'sama reaktio ei ammu kahdesti');

  // Tauko: kello ei etene eikä pysähtynyt soitin reagoi.
  a.paused = true;
  a.dispatchEvent(new Event('pause'));
  a.currentTime = 3.2;
  a.dispatchEvent(new Event('timeupdate'));
  assert.equal(osumat.length, 1, 'tauko ei ammu');
  a.paused = false;
  a.dispatchEvent(new Event('playing'));
  assert.equal(osumat.length, 2, 'jatko ampuu ohitetun hetken');
  assert.equal(osumat[1].tunnus, 'r2');
});

test('kelaus taaksepäin sallii uudelleen, eteenpäin ohittaa väliin jääneet', (t) => {
  const osumat = kuuntele(t);
  const a = soitin();
  const purku = kytkeLuentareaktiot(a, [
    { id: 'r1', hetki: 2000, tarkoitus: 'huvittuu', voimakkuus: 0.35 },
    { id: 'r2', hetki: 6000, tarkoitus: 'epailee', voimakkuus: 0.5 },
    { id: 'r3', hetki: 9000, tarkoitus: 'vakavoituu', voimakkuus: 0.4 },
  ], { kaupunki: 'marseille' });
  t.after(purku);

  a.dispatchEvent(new Event('playing'));
  a.aja(1.4);
  a.aja(2.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1']);

  // Eteenpäin kelaus r3:n yli: r2 ja r3 jäävät väliin eikä niitä ammuta.
  a.dispatchEvent(new Event('seeking'));
  a.currentTime = 9.5;
  a.dispatchEvent(new Event('seeked'));
  a.aja(9.5);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1'], 'väliin jääneitä ei ammuta jälkikäteen');
  a.aja(9.8);
  assert.equal(osumat.length, 1);

  // Taaksepäin kelaus: ohitetut palaavat ammuttaviksi.
  a.dispatchEvent(new Event('seeking'));
  a.currentTime = 5.5;
  a.dispatchEvent(new Event('seeked'));
  a.aja(5.5);
  assert.equal(osumat.length, 1);
  a.aja(6.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1', 'r2']);
  a.aja(7.6);
  a.aja(9.2);
  assert.deepEqual(osumat.map((o) => o.tunnus), ['r1', 'r2', 'r3']);
});

test('loppu, tyhjennys ja purku irrottavat kuuntelijat', (t) => {
  const osumat = kuuntele(t);
  const a = soitin();
  kytkeLuentareaktiot(a, [{ id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  a.dispatchEvent(new Event('ended'));
  a.aja(2);
  assert.equal(osumat.length, 0, 'loppunut luenta ei enää ammu');

  const b = soitin();
  const purku = kytkeLuentareaktiot(b, [{ id: 'r1', hetki: 1000, tarkoitus: 'huvittuu', voimakkuus: 0.3 }], {});
  purku();
  b.aja(2);
  assert.equal(osumat.length, 0, 'purettu kytkentä ei ammu');
  // Tyhjä lista ei kytke mitään, mutta palauttaa kelvollisen purun.
  assert.equal(typeof kytkeLuentareaktiot(soitin(), [], {}), 'function');
});

test('puuttuva aikaleimatiedosto (404) on hiljainen null eikä virhe', async (t) => {
  const vanha = globalThis.fetch;
  let pyyntoja = 0;
  globalThis.fetch = async () => { pyyntoja += 1; return { ok: false, status: 404 }; };
  t.after(() => { globalThis.fetch = vanha; });
  const polku = 'assets/audio/puhe-fokus-matkakirja-testikaupunki.mp3';
  assert.equal(await lataaLuentareaktiot('testikaupunki', polku), null);
  // Välimuisti: toista pyyntöä ei lähetetä samalle osoitteelle.
  assert.equal(await lataaLuentareaktiot('testikaupunki', polku), null);
  assert.equal(pyyntoja, 1);
  assert.match(aikaleimojenOsoite(polku), /puhe-fokus-matkakirja-testikaupunki\.aikaleimat\.json/);
  assert.equal(kaupunkiOsoitteesta(polku), 'testikaupunki');
  assert.equal(kaupunkiOsoitteesta('assets/audio/intro-puhe.mp3'), null);
});

test('rikkinäinen tai tyhjä aikaleimatiedosto ei kaada luentaa', async (t) => {
  const vanha = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ versio: 1, sanat: [] }) });
  t.after(() => { globalThis.fetch = vanha; });
  assert.equal(await lataaLuentareaktiot('tyhja', 'assets/audio/puhe-fokus-matkakirja-tyhja.mp3'), null);
  globalThis.fetch = async () => { throw new Error('verkko poikki'); };
  assert.equal(await lataaLuentareaktiot('rikki', 'assets/audio/puhe-fokus-matkakirja-rikki.mp3'), null);
});

test('VARTIO: jokaisen pakin reaktioankkurit löytyvät sen omasta luentatekstistä', () => {
  const kaupungit = Object.keys(FOKUSVIRRAT);
  assert.ok(kaupungit.length >= 45, `fokusvirtoja ${kaupungit.length}, odotettiin vähintään 45`);
  assert.deepEqual([...REAKTION_TARKOITUKSET], [...TYOKALUN_TARKOITUKSET],
    'pelin ja työkalun tarkoituslistat eivät saa eriytyä');
  const nahdyt = new Set();
  let reaktioita = 0;
  for (const id of kaupungit) {
    const merkinta = FOKUSVIRRAT[id]?.matkakirja;
    const reaktiot = merkinta?.reaktiot;
    if (!Array.isArray(reaktiot) || !reaktiot.length) continue;
    /*
     * ÄÄNITTEEN TEKSTI ON RUUDUN TEKSTI (Raamattu). Ankkuri kirjoitetaan
     * `teksti`-kenttää vasten, mutta kohdistus tehdään `luenta`-kentästä
     * tagit karsittuina — jos ne eriytyvät, ankkuri ei löydy pelissä.
     */
    assert.equal(karsiTagit(merkinta.luenta ?? merkinta.teksti), merkinta.teksti,
      `${id}: luenta ja teksti eriytyneet (tagit karsittuna)`);
    const sanat = sanoiksi(merkinta.teksti);
    const data = aikaleimat(merkinta.teksti);
    for (const reaktio of reaktiot) {
      reaktioita += 1;
      assert.ok(reaktio.id && !nahdyt.has(reaktio.id), `${id}: reaktion tunnus puuttuu tai toistuu (${reaktio.id})`);
      nahdyt.add(reaktio.id);
      assert.ok(REAKTION_TARKOITUKSET.includes(reaktio.tarkoitus),
        `${reaktio.id}: tarkoitus "${reaktio.tarkoitus}" ei ole sallittu`);
      assert.ok(Number.isFinite(reaktio.voimakkuus) && reaktio.voimakkuus > 0 && reaktio.voimakkuus <= 1,
        `${reaktio.id}: voimakkuus ei ole välillä 0–1`);
      assert.ok(Number.isFinite(reaktio.siirtyma ?? 0), `${reaktio.id}: siirtymä ei ole luku`);
      assert.ok(etsiAnkkuri(sanat, reaktio.ankkuri) >= 0,
        `${reaktio.id}: ankkuria "${reaktio.ankkuri}" ei löydy ${id}-pakin tekstistä sanasta sanaan`);
    }
    // Sama ratkaisu kuin pelissä: jokainen rivi saa hetken.
    assert.equal(ratkaiseAnkkurit(reaktiot, data).length, reaktiot.length,
      `${id}: osa reaktioista jäi ilman hetkeä`);
  }
  assert.ok(reaktioita >= 6, `reaktioita löytyi ${reaktioita}, pilotissa on kuusi`);
});

test('kohdistustyökalun kuiva ajo kertoo osoitteet eikä tarvitse verkkoa', () => {
  const loki = execFileSync(process.execPath, [
    fileURLToPath(new URL('tools/kohdista-luennat.mjs', JUURI)), '--kaupungit', 'marseille', '--kuiva',
  ], { encoding: 'utf8', env: { ...process.env, ELEVEN_API_KEY: '', HTTPS_PROXY: '', https_proxy: '' } });
  assert.match(loki, /KUIVA AJO/);
  assert.match(loki, /audio\/puhe-fokus-matkakirja-marseille\.mp3/);
  assert.match(loki, /assets\/aikaleimat\/puhe-fokus-matkakirja-marseille\.aikaleimat\.json/);
  assert.match(loki, /marseille\.r6: ankkuri sanoissa/);
  assert.doesNotMatch(loki, /xi-api-key|ELEVEN_API_KEY=/, 'avainta ei tulosteta');
});

test('moduuli on esilatauslistassa ja niputuksessa', () => {
  assert.match(lue('sw.js'), /'\.\/js\/luentareaktiot\.js',/);
  const nippu = lue('tools/build-standalone.mjs');
  assert.match(nippu, /'js\/luentareaktiot\.js',/);
  assert.ok(nippu.indexOf("'js/luentareaktiot.js'") < nippu.indexOf("'js/luenta.js'"),
    'luentareaktiot ennen luentaa: luenta.js tuo sen staattisesti');
  assert.ok(nippu.indexOf("'js/packs/fokusvirrat.js'") < nippu.indexOf("'js/luentareaktiot.js'"),
    'fokusvirrat ennen luentareaktioita');
  assert.match(lue('js/luenta.js'),
    /import \{ kytkeMatkakirjanReaktiot \} from '\.\/luentareaktiot\.js';/);
});
