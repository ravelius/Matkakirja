// Vartioi yhden tiedoston niputusta (tools/build-standalone.mjs).
//
//   node tools/tarkista-niputus.mjs
//
// Niputus ketjuttaa MODULES-listan tiedostot samaan globaaliin
// näkyvyysalueeseen ilman moduulirajoja. Siitä seuraa kolme
// vikaluokkaa, joita yksikään testi ei näe, koska kokoaminen
// onnistuu ja vika ilmenee vasta selaimessa (build-standalonen
// kommenttilohko kertoo historian — NS-törmäys ja
// "Cannot access ... before initialization"):
//
//   1. NIMITÖRMÄYS: kaksi listan tiedostoa julistaa saman
//      top-level-nimen → "Identifier ... has already been declared".
//   2. IRRALLINEN LISTAUS: listalla on moduuli, jota mikään listan
//      tiedosto ei tuo staattisesti — sääntö build-standalonessa:
//      sellaista ei saa listata (NS-törmäyksen oppi). POIKKEUS:
//      js/packs-tiedostot ohitetaan, koska tests/sw.test.mjs vaatii
//      ne kaikki listalle ("unohtunut paketti") — kaksi vartijaa
//      vaatii vastakkaista, ja ristiriidan purku odottaa Fablen
//      päätöstä. Törmäystarkistus 1 kattaa niidenkin pääriskin.
//   3. JÄRJESTYSVIRHE: staattinen riippuvuus on listalla vasta
//      tuojansa JÄLKEEN. Kun jokainen riippuvuus on ennen tuojaansa,
//      moduulitason lukujärjestys on aina turvallinen.
//
// Työkalu kaatuu mieluummin kuin vaikenee: jos MODULES-lista ei
// löydy tai julistuksia ei tunnisteta, ajo päättyy virheeseen.
// Tunnistus on rivipohjainen (talon tyyli: top-level-julistukset
// sarakkeessa 0) ja kommentit, merkkijonot, mallineet ja
// regex-literaalit tyhjätään ensin tilakoneella — sisennetyt eli
// funktioiden sisäiset julistukset eivät osu tarkistukseen.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

/* ---------- MODULES-listan luku build-standalonesta ---------- */

function lueModuulilista() {
  const src = read('tools/build-standalone.mjs');
  const alku = src.indexOf('const MODULES = [');
  const loppu = src.indexOf('\n];', alku);
  if (alku < 0 || loppu < 0) {
    throw new Error('MODULES-listaa ei löydy tools/build-standalone.mjs:stä');
  }
  const lohko = src.slice(alku, loppu);
  const tiedostot = [...lohko.matchAll(/'([^']+\.js)'/g)].map((m) => m[1]);
  if (tiedostot.length < 80 || !tiedostot.includes('js/ui.js')
    || !tiedostot.includes('js/main.js')) {
    throw new Error(`MODULES-lista näyttää vajaalta (${tiedostot.length} riviä) — tarkista lukutapa`);
  }
  return tiedostot;
}

/* ---------- Lähdekoodin tyhjäys tilakoneella ---------- */

// Palauttaa saman mittaisen tekstin, jossa kommenttien, merkki-
// jonojen, mallineiden ja regex-literaalien sisältö on välejä.
// Rivinvaihdot säilyvät, jotta rivinumerot pitävät.
function tyhjaaEiKoodi(src) {
  let ulos = '';
  const pino = ['koodi'];   // tilapino; 'koodi$'-kehys = mallineen ${}-lauseke
  const laskurit = [];      // aaltosulkusyvyys kutakin koodi$-kehystä kohden
  let vika = '';            // edellinen merkitsevä merkki regex-heuristiikkaan
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    const tila = pino[pino.length - 1];
    if (tila === 'rivi') {
      if (c === '\n') { pino.pop(); ulos += '\n'; } else ulos += ' ';
      continue;
    }
    if (tila === 'lohko') {
      if (c === '*' && n === '/') { pino.pop(); ulos += '  '; i++; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'hipsu' || tila === 'lainaus') {
      const raja = tila === 'hipsu' ? "'" : '"';
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === raja) { pino.pop(); ulos += c; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'malline') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === '`') { pino.pop(); ulos += c; }
      else if (c === '$' && n === '{') { pino.push('koodi$'); laskurit.push(0); ulos += '  '; i++; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'regex') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === '[') { pino.push('regexluokka'); ulos += ' '; }
      else if (c === '/') { pino.pop(); ulos += c; vika = '/'; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    if (tila === 'regexluokka') {
      if (c === '\\') { ulos += '  '; i++; }
      else if (c === ']') { pino.pop(); ulos += ' '; }
      else ulos += c === '\n' ? '\n' : ' ';
      continue;
    }
    // koodi tai koodi$
    if (c === '/' && n === '/') { pino.push('rivi'); ulos += '  '; i++; continue; }
    if (c === '/' && n === '*') { pino.push('lohko'); ulos += '  '; i++; continue; }
    if (c === "'") { pino.push('hipsu'); ulos += c; continue; }
    if (c === '"') { pino.push('lainaus'); ulos += c; continue; }
    if (c === '`') { pino.push('malline'); ulos += c; continue; }
    if (c === '/') {
      // Regex vai jakolasku: literaali voi alkaa vain arvottoman
      // kohdan perästä (avausmerkki, operaattori tai rivin alku).
      if (vika === '' || '=(,[!&|?:;{}\n+-*%<>'.includes(vika)) {
        pino.push('regex'); ulos += c; continue;
      }
      ulos += c; vika = c; continue;
    }
    if (tila === 'koodi$') {
      if (c === '{') laskurit[laskurit.length - 1]++;
      if (c === '}') {
        if (laskurit[laskurit.length - 1] === 0) {
          pino.pop(); laskurit.pop(); ulos += ' '; continue;
        }
        laskurit[laskurit.length - 1]--;
      }
    }
    ulos += c;
    if (!/\s/.test(c)) vika = c;
  }
  return ulos;
}

/* ---------- Top-level-julistusten poiminta ---------- */

function poimiJulistukset(polku) {
  const puhdas = tyhjaaEiKoodi(read(polku));
  const nimet = [];
  const rivit = puhdas.split('\n');
  for (let r = 0; r < rivit.length; r++) {
    const rivi = rivit[r];
    let m = rivi.match(
      /^(?:export\s+)?(?:const|let|var|async\s+function|function|class)\s*\*?\s*([A-Za-z_$][\w$]*)/,
    );
    if (m) { nimet.push({ nimi: m[1], rivi: r + 1 }); continue; }
    // Hajotusjulistus: const { a, b: c } = … tai const [x, y] = …
    m = rivi.match(/^(?:export\s+)?(?:const|let|var)\s*[{[]([^}\]]*)[}\]]/);
    if (m) {
      for (const osa of m[1].split(',')) {
        const nimi = (osa.includes(':') ? osa.split(':')[1] : osa).trim();
        if (/^[A-Za-z_$][\w$]*$/.test(nimi)) nimet.push({ nimi, rivi: r + 1 });
      }
    }
  }
  return nimet;
}

/* ---------- Tarkistukset ---------- */

const moduulit = lueModuulilista();
const viat = [];

// Kaksoislistaus on virhe jo itsessään.
const nahty = new Set();
for (const polku of moduulit) {
  if (nahty.has(polku)) viat.push(`kahdesti listalla: ${polku}`);
  nahty.add(polku);
}

// 1. Nimitörmäykset.
const julistajat = new Map(); // nimi → [{polku, rivi}]
let julistuksia = 0;
for (const polku of moduulit) {
  for (const { nimi, rivi } of poimiJulistukset(polku)) {
    julistuksia++;
    if (!julistajat.has(nimi)) julistajat.set(nimi, []);
    julistajat.get(nimi).push({ polku, rivi });
  }
}
if (julistuksia < 500) {
  throw new Error(`vain ${julistuksia} julistusta tunnistettu — poiminta lienee rikki`);
}
for (const [nimi, paikat] of julistajat) {
  const eriTiedostot = new Set(paikat.map((p) => p.polku));
  if (eriTiedostot.size > 1) {
    viat.push(`nimitörmäys "${nimi}": ${paikat.map((p) => `${p.polku}:${p.rivi}`).join(' ja ')}`);
  }
}

// Staattiset tuonnit (sama tapa kuin build-standalonen checkModuleList).
const tuojat = new Map(); // polku → Set(tuotujen polut)
for (const polku of moduulit) {
  const kansio = dirname(polku);
  const tuodut = new Set();
  for (const m of read(polku).matchAll(/from '(\.\.?\/[\w/-]+\.js)'/g)) {
    tuodut.add(join(kansio, m[1]).replaceAll('\\', '/'));
  }
  tuojat.set(polku, tuodut);
}

// 2. Irralliset listaukset: kukaan listalla ei tuo, eikä ole
// käynnistystiedosto (main.js). js/packs ohitetaan (ks. otsake).
let pakkoja = 0;
for (const polku of moduulit) {
  if (polku === 'js/main.js') continue;
  const tuotu = moduulit.some((toinen) => toinen !== polku && tuojat.get(toinen).has(polku));
  if (tuotu) continue;
  if (polku.startsWith('js/packs/')) { pakkoja++; continue; }
  viat.push(`irrallinen listaus: ${polku} — mikään listan moduuli ei tuo sitä`);
}

// 3. Järjestys: riippuvuus ennen tuojaansa.
const sija = new Map(moduulit.map((polku, i) => [polku, i]));
for (const polku of moduulit) {
  for (const dep of tuojat.get(polku)) {
    if (sija.has(dep) && sija.get(dep) > sija.get(polku)) {
      viat.push(`järjestysvirhe: ${polku} tuo moduulin ${dep}, joka on listalla vasta sen jälkeen`);
    }
  }
}

if (viat.length) {
  console.error(`NIPUTUSTARKISTUS: ${viat.length} vikaa\n`);
  for (const vika of viat) console.error(`  - ${vika}`);
  process.exit(1);
}
console.log(`niputus kunnossa: ${moduulit.length} moduulia, ${julistuksia} top-level-julistusta, ei törmäyksiä`
  + (pakkoja ? ` (tiedoksi: ${pakkoja} tuomatonta js/packs-listausta, ks. otsake)` : ''));
