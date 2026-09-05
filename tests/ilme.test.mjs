/*
 * ILMEPAKETTI (js/ilme.js): Vivus + Rough.js + rough-notation
 * (omistajan päätös 5.9.2026, kartoituksen TOP 6 kohta 6).
 *
 * Testit lukevat moduulin Nodessa ilman DOM:ia: liput, virhehaara,
 * osoitteet (ämpärin vendor/-polku, ei CDN:ää tuotantokoodissa),
 * reduced motion ja se, ettei paketti koske linssikerrokseen eikä
 * kartan kameraan. Selaimessa sama paketti todennetaan savukkeella
 * tools/savukkeet/savuke-ilme.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ILME_AVAIN, ILME_JUURI, ILME_KIRJASTOT, ILME_LIPUT, ILME_UUSINTAVIIVE_MS,
  asetaIlme, asetaIlmePaketti, esilataaIlme, ilmeKirjasto, ilmePaalla, ilmePakettiPaalla,
  karheaKehys, korosta, korostaSana, lataaIlmeKirjasto, ilmeLiikeVahennetty, nollaaIlmeMuisti,
  piirraMusteviiva, yhdenTiedostonVersio,
} from '../js/ilme.js';
import { PEILI_JUURI } from '../js/media.js';
import { LAHTEET } from '../js/lahteet.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/** Muistinvarainen localStorage yhdelle testille. */
function muistilla(alku = {}) {
  const arvot = new Map(Object.entries(alku));
  globalThis.localStorage = {
    getItem: (k) => (arvot.has(k) ? arvot.get(k) : null),
    setItem: (k, v) => arvot.set(k, String(v)),
    removeItem: (k) => arvot.delete(k),
  };
  nollaaIlmeMuisti();
  return arvot;
}

/** Tekaistu dokumentti: kirjaa luodut skriptit ja antaa laukaista load/error. */
function tekoDokumentti({ moduuliskripti = true } = {}) {
  const skriptit = [];
  const doc = {
    querySelector: (v) => (v === 'script[type="module"]' && moduuliskripti ? {} : null),
    createElement: () => {
      const kuuntelijat = {};
      const s = {
        addEventListener: (nimi, f) => { kuuntelijat[nimi] = f; },
        laukaise: (nimi) => kuuntelijat[nimi]?.(),
        remove: () => {},
      };
      skriptit.push(s);
      return s;
    },
    head: { appendChild: () => {} },
  };
  return { doc, skriptit };
}

test.afterEach(() => {
  delete globalThis.localStorage;
  delete globalThis.matchMedia;
  for (const { globaali } of Object.values(ILME_KIRJASTOT)) delete globalThis[globaali];
  nollaaIlmeMuisti();
});

test('liput: puuttuva avain on päällä, vain "0" sammuttaa, kytkin kääntää kaikki', () => {
  const arvot = muistilla();
  assert.deepEqual(Object.keys(ILME_LIPUT), ['musteviiva', 'karhea', 'korostus']);
  for (const lippu of Object.keys(ILME_LIPUT)) assert.equal(ilmePaalla(lippu), true, lippu);
  assert.equal(ilmePaalla('tuntematon'), false, 'tuntematon lippu ei ole koskaan päällä');
  assert.equal(ilmePakettiPaalla(), true);

  asetaIlme('korostus', false);
  assert.equal(arvot.get(`${ILME_AVAIN}korostus`), '0', 'pois = "0" avaimessa');
  assert.equal(ilmePaalla('korostus'), false);
  assert.equal(ilmePaalla('musteviiva'), true, 'muut liput eivät muutu');
  assert.equal(ilmePakettiPaalla(), false, 'yksikin pois = paketti pois');

  asetaIlme('korostus', true);
  assert.equal(arvot.has(`${ILME_AVAIN}korostus`), false, 'päällä = avain poistetaan');

  asetaIlmePaketti(false);
  assert.deepEqual([...arvot.keys()].sort(), ['musteviiva', 'karhea', 'korostus'].map((l) => ILME_AVAIN + l).sort());
  asetaIlmePaketti(true);
  assert.equal(arvot.size, 0);

  // Kelvoton arvo palauttaa oletuksen (sama linja kuin fokusmoodilla).
  muistilla({ [`${ILME_AVAIN}karhea`]: 'joo' });
  assert.equal(ilmePaalla('karhea'), true);
});

test('liput: yksityinen selaus (localStorage heittää) = kaikki päällä', () => {
  globalThis.localStorage = {
    getItem: () => { throw new Error('SecurityError'); },
    setItem: () => { throw new Error('SecurityError'); },
    removeItem: () => { throw new Error('SecurityError'); },
  };
  nollaaIlmeMuisti();
  assert.equal(ilmePakettiPaalla(), true);
  assert.doesNotThrow(() => asetaIlmePaketti(false));
});

test('osoitteet: kolme kirjastoa ämpärin vendor/-polusta, versiot kiinni, ei CDN:ää koodissa', () => {
  assert.equal(ILME_JUURI, PEILI_JUURI, 'sama peili kuin kuvilla ja äänillä (js/media.js)');
  assert.match(ILME_JUURI, /^https:\/\/pub-[a-z0-9]+\.r2\.dev\/$/);
  assert.equal(ILME_KIRJASTOT.vivus.osoite, `${ILME_JUURI}vendor/vivus-0.4.6.min.js`);
  assert.equal(ILME_KIRJASTOT.rough.osoite, `${ILME_JUURI}vendor/rough-4.6.6.js`);
  assert.equal(ILME_KIRJASTOT.notation.osoite, `${ILME_JUURI}vendor/rough-notation-0.5.1.iife.js`);
  assert.deepEqual(
    Object.values(ILME_KIRJASTOT).map((k) => k.globaali),
    ['Vivus', 'rough', 'RoughNotation'],
  );
  // Tuotantokoodi ei viittaa CDN:ään (Raamattu, VALMIIT KIRJASTOT sääntö 1).
  for (const p of ['../js/ilme.js', '../js/main.js', '../js/ui.js', '../js/fokusvirta.js', '../js/karttaselite.js', '../sw.js']) {
    const koodi = lue(p).split('\n').filter((r) => !/^\s*(\/\/|\/?\*)/.test(r)).join('\n');
    assert.ok(!/jsdelivr|cdnjs|unpkg\.com|esm\.sh/.test(koodi), `${p}: CDN-osoite tuotantokoodissa`);
  }
});

test('lataus: laiska, memoized, virhehaara jäähyllä ja puuttuva globaali on virhe', async () => {
  muistilla();
  const { doc, skriptit } = tekoDokumentti();
  let kello = 1000;
  const nyt = () => kello;

  // Kaksi kysyjää, yksi skripti.
  const a = lataaIlmeKirjasto('vivus', doc, nyt);
  const b = lataaIlmeKirjasto('vivus', doc, nyt);
  assert.equal(skriptit.length, 1, 'toinen kysyjä saa saman lupauksen');
  assert.equal(skriptit[0].src, ILME_KIRJASTOT.vivus.osoite);
  assert.equal(skriptit[0].async, true);
  globalThis.Vivus = function Vivus() {};
  skriptit[0].laukaise('load');
  assert.equal(await a, globalThis.Vivus);
  assert.equal(await b, globalThis.Vivus);
  // Globaali paikallaan: ei uutta skriptiä.
  await lataaIlmeKirjasto('vivus', doc, nyt);
  assert.equal(skriptit.length, 1);

  // Verkkovirhe: hylkäys, jäähy, jäähyn jälkeen uusi yritys.
  const c = lataaIlmeKirjasto('rough', doc, nyt);
  skriptit[1].laukaise('error');
  await assert.rejects(c, /ei latautunut/);
  await assert.rejects(lataaIlmeKirjasto('rough', doc, nyt), /jäähy/, 'heti perään ei yritetä uudestaan');
  assert.equal(skriptit.length, 2);
  kello += ILME_UUSINTAVIIVE_MS + 1;
  const d = lataaIlmeKirjasto('rough', doc, nyt);
  assert.equal(skriptit.length, 3, 'jäähyn jälkeen uusi skripti');
  globalThis.rough = { svg: () => ({}) };
  skriptit[2].laukaise('load');
  assert.equal(await d, globalThis.rough);

  // Skripti latautui mutta globaalia ei tullut (väärä tiedosto ämpärissä).
  const e = lataaIlmeKirjasto('notation', doc, nyt);
  skriptit[3].laukaise('load');
  await assert.rejects(e, /globaali RoughNotation puuttuu/);

  await assert.rejects(lataaIlmeKirjasto('tuntematon', doc, nyt), /tuntematon kirjasto/);
  // Globaali paikallaan voittaa kaiken: null-dokumentti ei haittaa.
  assert.equal(await lataaIlmeKirjasto('vivus', null, nyt), globalThis.Vivus);
  // Ilman globaalia ja jäähyn jälkeen dokumentti on pakollinen.
  kello += ILME_UUSINTAVIIVE_MS + 1;
  await assert.rejects(lataaIlmeKirjasto('notation', null, nyt), /ei dokumenttia/);
});

test('ilmeKirjasto: lippu pois ja yhden tiedoston versio eivät lataa mitään; virhe on null', async () => {
  muistilla({ [`${ILME_AVAIN}karhea`]: '0' });
  const { doc, skriptit } = tekoDokumentti();
  assert.equal(await ilmeKirjasto('karhea', doc), null, 'lippu pois → null');
  assert.equal(skriptit.length, 0, 'lippu pois → ei skriptiä');

  const dist = tekoDokumentti({ moduuliskripti: false });
  assert.equal(yhdenTiedostonVersio(dist.doc), true);
  assert.equal(yhdenTiedostonVersio(doc), false);
  assert.equal(await ilmeKirjasto('korostus', dist.doc), null, 'dist/ jää ilman kirjastoja');
  assert.equal(dist.skriptit.length, 0);

  const lupaus = ilmeKirjasto('korostus', doc);
  assert.equal(skriptit.length, 1);
  skriptit[0].laukaise('error');
  assert.equal(await lupaus, null, 'verkkovirhe → null, ei poikkeusta');

  // Esilataus kunnioittaa lippuja ja nielee virheet.
  nollaaIlmeMuisti();
  const esi = tekoDokumentti();
  const tulos = esilataaIlme(esi.doc);
  assert.equal(esi.skriptit.length, 2, 'karhea pois: vain kaksi skriptiä');
  esi.skriptit.forEach((s) => s.laukaise('error'));
  assert.deepEqual(await tulos, [null, null, null]);
});

test('reduced motion: musteviiva ei piirry eikä lataa, apurit palauttavat null ilman DOM:ia', () => {
  muistilla();
  globalThis.matchMedia = () => ({ matches: true });
  assert.equal(ilmeLiikeVahennetty(), true);
  const { doc, skriptit } = tekoDokumentti();
  const polku = { getAttribute: () => 'M0,0 L1,1' };
  const kerros = {
    dataset: {},
    querySelectorAll: () => [polku],
    tagName: 'g',
  };
  assert.equal(piirraMusteviiva(kerros, { doc }), false);
  assert.equal(kerros.dataset.ilmeReitit, 'M0,0 L1,1', 'tunniste kirjataan silti: sama reitti ei piirry toiste');
  assert.equal(kerros.dataset.musteviiva, undefined);
  assert.equal(skriptit.length, 0, 'reduced motion ei lataa Vivusta');

  delete globalThis.matchMedia;
  assert.equal(ilmeLiikeVahennetty(), false);
  assert.equal(piirraMusteviiva(kerros, { doc }), false, 'sama tunniste → ei uutta piirtoa');
  kerros.dataset = {};
  assert.equal(piirraMusteviiva(kerros, { doc }), false, 'kirjasto ei ole vielä ladattu → ei piirtoa, lataus alkaa');
  assert.equal(skriptit.length, 1, 'ensimmäinen kutsu käynnistää latauksen seuraavia varten');
  assert.equal(skriptit[0].src, ILME_KIRJASTOT.vivus.osoite);

  // Tyhjä kerros nollaa tunnisteen: seuraava ilmestyminen on uusi.
  kerros.querySelectorAll = () => [];
  assert.equal(piirraMusteviiva(kerros, { doc }), false);
  assert.equal(kerros.dataset.ilmeReitit, undefined);

  assert.equal(piirraMusteviiva(null), false);
});

test('apurit ilman kohdetta palauttavat null eivätkä heitä', async () => {
  muistilla();
  assert.equal(await korosta(null), null);
  assert.equal(await korostaSana(null, 'x'), null);
  assert.equal(await karheaKehys(null), null);
});

test('linssikerros ja kartan kamera pysyvät koskemattomina', () => {
  for (const p of ['../js/linssit/kerros.js', '../js/kartta.js']) {
    const koodi = lue(p);
    assert.ok(!/ilme\.js|piirraMusteviiva|karheaKehys|karheaViiva|korosta\(/.test(koodi),
      `${p} ei saa tuoda ilmepakettia (docs/moduulit/linssit.md 1.7, Raamattu sääntö 5)`);
  }
  const ilme = lue('../js/ilme.js');
  assert.ok(!/linssi|kerros\.js|ajaKamera|kartta\.js'/.test(ilme.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')),
    'js/ilme.js ei viittaa linssikerrokseen eikä kameraan');
  // Ei SVG-suodattimia (iOS): sama sääntö kuin linsseillä.
  assert.ok(!/\bfe[A-Z]\w*|filter\s*=/.test(ilme), 'ilmepaketissa ei ole SVG-suodattimia');
  // Musteviiva on koukku olemassa olevaan reittikerrokseen, ei uusi kerros.
  const ui = lue('../js/ui.js');
  assert.match(ui, /piirraMusteviiva\(kerros\);/);
  assert.equal((ui.match(/piirraMusteviiva\(/g) ?? []).length, 2, 'kaksi kutsua: tyhjennys ja piirto');
});

test('lähdesivu ja README luettelevat kolme kirjastoa omina riveinään (pilari 5)', () => {
  const ryhma = LAHTEET.find((r) => r.otsikko === 'Avoimen lähdekoodin kirjastot');
  assert.ok(ryhma, 'lähderyhmä puuttuu');
  const nimet = ryhma.rivit.map((r) => r.nimi);
  for (const odotettu of ['Vivus 0.4.6', 'Rough.js 4.6.6', 'rough-notation 0.5.1']) {
    const rivi = ryhma.rivit.find((r) => r.nimi.startsWith(odotettu));
    assert.ok(rivi, `${odotettu} puuttuu js/lahteet.js:stä: ${nimet.join(' | ')}`);
    assert.equal(rivi.lisenssi, 'MIT');
  }
  const readme = lue('../README.md');
  for (const odotettu of ['Vivus 0.4.6', 'Rough.js 4.6.6', 'rough-notation 0.5.1']) {
    assert.ok(readme.includes(`| ${odotettu}`), `${odotettu} puuttuu README.md:n lähdeluvusta`);
  }
});

test('savuke ja README-rivi ovat olemassa', () => {
  const readme = lue('../tools/savukkeet/README.md');
  assert.ok(readme.includes('| savuke-ilme |'), 'tools/savukkeet/README.md: savuke-ilme-rivi puuttuu');
  assert.ok(lue('../tools/savukkeet/savuke-ilme.mjs').includes('rough-annotation'));
});
