/*
 * Sisällön vienti (tools/vienti/vie-sisalto.mjs): mitään ei jää pois.
 *
 * Vienti on siirtoputken perusta natiiviin peliin (loki 23.9.2026 klo
 * 09.43): jos se pudottaa hiljaa yhdenkin kentän, uusi peli menettää
 * sisältöä kenenkään huomaamatta. Siksi testi ei luota viennin omiin
 * laskuihin vaan vertaa tulosta suoraan lähdemoduuleihin:
 *
 *   1. jokainen js/packs/*.js ja jokainen sen export on manifestissa
 *      oikealla lukumäärällä,
 *   2. jokainen export palautuu JSONista alkuperäisen kanssa samaksi
 *      (oma vertailija, ei viennin koodia) — funktiot lähdetekstinä,
 *   3. sama lähde antaa tavulleen saman tuloksen,
 *   4. kokoelmien lukumäärät täsmäävät pakettien lukuihin ja jokainen
 *      id-viittaus osuu olemassa olevaan alkioon,
 *   5. jokainen mediaviitteen esiintymä osoittaa viennissä juuri siihen
 *      merkkijonoon, ja ämpärilajeilla on ämpärin osoite,
 *   6. manifestin tiivisteet vastaavat tiedostoja.
 *
 * Packien ulkopuoliset nimetyt exportit (tools/vienti/lahteet.mjs)
 * tarkistetaan samoin kohdissa 1 ja 2.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JUURI, kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { palauta } from '../tools/vienti/sarjallista.mjs';
import { PEILI_JUURI } from '../js/media.js';
import { LISAMODUULIT, LISATIEDOSTOT } from '../tools/vienti/lahteet.mjs';

const eka = await kokoaVienti();
const toka = await kokoaVienti();
const { tiedostot, manifest } = eka;
const moduulitiedosto = (polku) => JSON.parse(tiedostot.get(`moduulit/${polku.replace(/\.js$/, '.json')}`));

function samat(a, b, polku, pino = new Set()) {
  const vika = (miksi) => assert.fail(`${polku}: ${miksi}`);
  if (typeof a === 'function') {
    if (b?.$funktio !== a.name || b?.lahde !== String(a)) vika('funktio ei säilynyt');
    return;
  }
  if (a === null || typeof a !== 'object') {
    if (!Object.is(a, b)) vika(`${String(a).slice(0, 60)} ≠ ${String(b).slice(0, 60)}`);
    return;
  }
  if (pino.has(a)) return; // kehä: sama esi-isä, tarkistettu jo
  pino.add(a);
  try {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) vika('taulukon pituus');
      for (let i = 0; i < a.length; i++) {
        if ((i in a) !== (i in b)) vika(`aukko kohdassa ${i}`);
        samat(a[i], b[i], `${polku}/${i}`, pino);
      }
    } else if (a instanceof Map) {
      if (!(b instanceof Map) || a.size !== b.size) vika('Map');
      const bp = [...b];
      [...a].forEach(([k, v], i) => {
        samat(k, bp[i][0], `${polku}/<avain ${i}>`, pino);
        samat(v, bp[i][1], `${polku}/${String(k)}`, pino);
      });
    } else if (a instanceof Set) {
      if (!(b instanceof Set) || a.size !== b.size) vika('Set');
      const bp = [...b];
      [...a].forEach((v, i) => samat(v, bp[i], `${polku}/<${i}>`, pino));
    } else if (a instanceof Date || a instanceof RegExp) {
      if (String(a) !== String(b)) vika('Date/RegExp');
    } else if (ArrayBuffer.isView(a)) {
      if (Buffer.compare(Buffer.from(a.buffer, a.byteOffset, a.byteLength),
        Buffer.from(b.buffer, b.byteOffset, b.byteLength)) !== 0) vika('typed');
    } else {
      const ka = Object.keys(a);
      assert.deepEqual(Object.keys(b), ka, `${polku}: avaimet`);
      for (const k of ka) samat(a[k], b[k], `${polku}/${k}`, pino);
    }
  } finally {
    pino.delete(a);
  }
}

test('jokainen paketti ja jokainen export on manifestissa oikealla lukumäärällä', async () => {
  const packit = readdirSync(join(JUURI, 'js/packs')).filter((f) => f.endsWith('.js'));
  const manifestissa = new Map(manifest.moduulit.map((m) => [m.moduuli, m]));
  assert.ok(packit.length > 300, `pakettien määrä ${packit.length}`);
  for (const f of packit) {
    const polku = `js/packs/${f}`;
    const m = manifestissa.get(polku);
    assert.ok(m, `${polku} puuttuu viennistä`);
    const ns = await import(pathToFileURL(join(JUURI, polku)).href);
    assert.deepEqual(m.exportit.map((e) => e.nimi), Object.keys(ns), `${polku}: exportit`);
    for (const e of m.exportit) {
      const v = ns[e.nimi];
      const lkm = Array.isArray(v) ? v.length
        : v instanceof Map || v instanceof Set ? v.size
          : v && typeof v === 'object' ? Object.keys(v).length : null;
      assert.equal(e.lkm, lkm, `${polku}#${e.nimi}: lukumäärä`);
    }
  }
  for (const { moduuli, exportit } of LISAMODUULIT) {
    const m = manifestissa.get(moduuli);
    assert.ok(m, `${moduuli} puuttuu viennistä`);
    assert.deepEqual(m.exportit.map((e) => e.nimi), exportit, `${moduuli}: nimetyt exportit`);
  }
  for (const polku of LISATIEDOSTOT) {
    assert.ok(manifest.lisatiedostot.some((t) => t.lahde === polku), `${polku} puuttuu viennistä`);
  }
  const exportteja = manifest.moduulit.reduce((a, m) => a + m.exportit.length, 0);
  assert.equal(manifest.laskennat.exportteja, exportteja);
  assert.equal(manifest.laskennat.moduuleja, manifest.moduulit.length);
});

test('jokainen export palautuu viennistä alkuperäisen kanssa samaksi', () => {
  for (const m of manifest.moduulit) {
    const ns = eka.nimiavaruudet.get(m.moduuli);
    const vienti = moduulitiedosto(m.moduuli);
    assert.equal(vienti.moduuli, m.moduuli);
    const nimet = m.exportit.map((e) => e.nimi);
    assert.deepEqual(Object.keys(vienti.exportit), nimet, `${m.moduuli}: exportit`);
    for (const nimi of nimet) {
      samat(ns[nimi], palauta(vienti.exportit[nimi]), `${m.moduuli}#${nimi}`);
    }
  }
});

test('sama lähde antaa tavulleen saman viennin', () => {
  assert.deepEqual([...toka.tiedostot.keys()], [...tiedostot.keys()]);
  for (const [polku, teksti] of tiedostot) {
    assert.equal(toka.tiedostot.get(polku), teksti, `${polku} vaihteli ajojen välillä`);
  }
});

test('kokoelmat täsmäävät paketteihin ja viittaukset osuvat', () => {
  const P = eka.nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA;
  const ns = (f) => eka.nimiavaruudet.get(f.includes('/') ? f : `js/packs/${f}`);
  const avaimia = (o) => Object.keys(o).length;
  const alkioita = (o) => Object.values(o).flat().length;
  const sisakkain = (o) => Object.values(o).reduce((a, v) => a + Object.keys(v).length, 0);
  const kokoelma = (nimi) => JSON.parse(tiedostot.get(`kokoelmat/${nimi}.json`));
  const odotus = {
    kaupungit: P.cities.length,
    reitit: P.edges.length + P.airRoutes.length,
    kysymykset: Object.values(P.questions).flat().length,
    paikkatiedot: Object.values(P.placeFacts).flat().length,
    kaksintaistelut: P.duels.length,
    pulmat: P.puzzles.length,
    kaupunkilehdet: avaimia(ns('kulttuuri-kategoriat.js').KULTTUURI_KATEGORIAT),
    maalehdet: avaimia(ns('maa-kategoriat.js').MAA_KATEGORIAT),
    nahtavyydet: sisakkain(ns('nahtavyysjutut.js').NAHTAVYYSJUTUT),
    miniatyyrit: sisakkain(ns('miniatyyrit.js').MINIATYYRIT),
    skandaalit: alkioita(ns('skandaalit.js').SKANDAALIT),
    monumentit: alkioita(ns('monumentit-eurooppa.js').EUROOPAN_KADONNEET),
    historianHetket: ns('historian-hetket.js').HISTORIAN_HETKET.length,
    elaintayt: avaimia(ns('elaintakyt.js').ELAINTAKYT),
    paikallisaarteet: avaimia(ns('paikallisaarteet.js').PAIKALLISAARTEET),
    julisteet: avaimia(ns('julisteet.js').JULISTEET),
    kohtaamiset: avaimia(ns('kohtaamiset.js').KOHTAAMISET),
    kohtaamiskuvat: ns('js/kohtaamiskuvat-data.js').kohtaamiskuvat.length,
    tarinakaari: avaimia(ns('tarinakaari.js').TARINAKAARI),
    saapumispuheet: avaimia(ns('saapumispuheet.js').SAAPUMISPUHEET),
    fokusvirrat: avaimia(ns('fokusvirrat.js').FOKUSVIRRAT),
    saannot: new Set(['js/rules.js', 'js/game.js'].flatMap((f) => Object.entries(ns(f))
      .filter(([, v]) => ['number', 'string', 'boolean'].includes(typeof v)).map(([n]) => n))).size,
    saapuminen: P.cities.length,
    esilasketut: ns('historian-hetket.js').HISTORIAN_HETKET.length + avaimia(ns('elaintakyt.js').ELAINTAKYT)
      + new Set(Object.values(P.map.countryShapes).map((m) => m.nimi).filter(Boolean)).size + 2 + 1,
  };
  assert.deepEqual(manifest.kokoelmat.map((k) => k.nimi).sort(), Object.keys(odotus).sort(),
    'uudella kokoelmalla pitää olla lukumäärätarkistus tässä');
  for (const [nimi, lkm] of Object.entries(odotus)) {
    assert.equal(kokoelma(nimi).alkiot.length, lkm, `${nimi}: lukumäärä`);
  }
  const idt = new Map();
  for (const k of manifest.kokoelmat) {
    const alkiot = kokoelma(k.nimi).alkiot;
    const joukko = new Set(alkiot.map((a) => a.id));
    assert.equal(joukko.size, alkiot.length, `${k.nimi}: id:t eivät ole yksikäsitteisiä`);
    idt.set(k.nimi, joukko);
  }
  for (const k of manifest.kokoelmat) {
    const { viittaukset, alkiot } = kokoelma(k.nimi);
    for (const [kentta, kohde] of Object.entries(viittaukset)) {
      for (const a of alkiot) {
        if (a[kentta] == null) continue;
        // Viittaus voi olla myös id-taulukko (saapuminen.historianHetket).
        for (const id of [].concat(a[kentta])) {
          assert.ok(idt.get(kohde).has(id), `${k.nimi}/${a.id}.${kentta} → ${kohde}: ${id} puuttuu`);
        }
      }
    }
  }
  for (const c of kokoelma('kaupungit').alkiot) {
    assert.ok(Number.isFinite(c.lat) && Number.isFinite(c.lon), `${c.id}: sijainti`);
    // Jerusalemilla ei ole maata pelin datassa (tarkoituksella) — vienti
    // ei keksi sitä, vaan kulkee lähteen mukana.
    assert.equal(c.maa, P.map.cityCountry[c.id] ?? null, `${c.id}: maa`);
    if (c.maa !== null) assert.match(c.maa, /^[A-Z]{3}$/, `${c.id}: maa`);
  }
});

test('mediaviitteet osoittavat vientiin ja ämpärilajeilla on ämpärin osoite', () => {
  const { viitteet } = JSON.parse(tiedostot.get('media.json'));
  const valimuisti = new Map();
  const hae = (moduuli, nimi, pointer) => {
    if (!valimuisti.has(moduuli)) valimuisti.set(moduuli, moduulitiedosto(moduuli));
    let v = valimuisti.get(moduuli).exportit[nimi];
    for (const osa of pointer.split('/').slice(1)) v = v[osa.replace(/~1/g, '/').replace(/~0/g, '~')];
    return v;
  };
  let esiintymia = 0;
  for (const m of viitteet) {
    for (const e of m.esiintymat) {
      esiintymia++;
      assert.equal(hae(e.moduuli, e.export, e.polku), m.arvo, `${e.moduuli}#${e.export}${e.polku}`);
    }
    if (['kuva-commons', 'lippu-commons', 'aani-peilattu', 'ampari-avain', 'kohtaamiskuva', 'juliste', 'hetkikuva'].includes(m.laji)) {
      const reitit = [m.url, ...(m.varat ?? [])];
      assert.ok(m.avain && reitit.includes(PEILI_JUURI + m.avain), `${m.laji} ${m.arvo}: ei ämpärin osoitetta`);
    }
  }
  assert.equal(esiintymia, manifest.laskennat.mediaEsiintymia);
  const lajit = JSON.parse(tiedostot.get('skeema/media.schema.json'))
    .properties.viitteet.items.properties.laji.enum;
  for (const laji of Object.keys(manifest.laskennat.mediaLajeittain)) {
    assert.ok(lajit.includes(laji), `media.schema.json ei tunne lajia ${laji}`);
  }
  const exportienViitteet = manifest.moduulit.reduce((a, mm) => a + mm.exportit.reduce((b, e) => b + e.mediaviitteita, 0), 0);
  assert.equal(esiintymia, exportienViitteet);
});

test('manifestin tiivisteet vastaavat tiedostoja', () => {
  const sha = (s) => createHash('sha256').update(s).digest('hex');
  for (const m of manifest.moduulit) assert.equal(sha(tiedostot.get(m.tiedosto)), m.sha256, m.tiedosto);
  for (const k of manifest.kokoelmat) assert.equal(sha(tiedostot.get(k.tiedosto)), k.sha256, k.tiedosto);
  for (const t of manifest.lisatiedostot) assert.equal(sha(tiedostot.get(t.tiedosto)), t.sha256, t.tiedosto);
  assert.equal(sha(tiedostot.get('media.json')), manifest.media.sha256);
});
