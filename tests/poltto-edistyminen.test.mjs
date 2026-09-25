/*
 * POLTON EDISTYMISRAPORTTI JA EHEYSTARKISTUS.
 *
 * Kaksi asiaa, joita ei voi katsomalla nähdä ja joiden virhe maksaa
 * tunteja (Mac-poltto on mitattu 7,5 h, omistaja 7.9.2026):
 *
 *  1. RAPORTTI ON AJON AINOA IKKUNA. Jos shardien tilatiedostoista
 *     koottu yhteenveto laskee väärin — valmiit shardit kesken, tahti
 *     koko ajon keskiarvona viimeisen välin sijaan — Fable lukee
 *     numeroita, jotka näyttävät oikeilta mutta valehtelevat siitä,
 *     onko ajo edennyt lainkaan. Testi rakentaa keinotekoisen
 *     lokikansion ja tarkistaa jokaisen luvun.
 *
 *  2. EHEYSTARKISTUS ON LUETTELON PORTTI. Luettelo on pelin ainoa tieto
 *     pyramidista: se lupaa laatat, jotka peli sitten pyytää. Tarkistus
 *     vertaa poltettujen laattojen määrää luettelon bittikarttaan, ja
 *     jos vertailu on liian salliva, ämpäriin menee luettelo joka
 *     lupaa laattoja joita siellä ei ole (404 jokaisesta puuttuvasta).
 *     Testi poistaa yhden laatan laskennasta ja vaatii, että
 *     tarkistus huomaa sen.
 *
 * Mitään ei polteta eikä viedä: kaikki tiedostot ovat testin omia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  bittienMaara, eheys, kokoaEdistyminen, lueTila, odotetutPallosta,
  odotetutPyramidista, summaaLaskut, viimeisetRivit, yhteenvetoRivi,
} from '../tools/poltto-edistyminen.mjs';

const kansio = () => mkdtempSync(join(tmpdir(), 'poltto-'));

/** Shardin tilatiedosto samassa muodossa kuin polttoskriptin tila_kirjoita. */
function tila(lokit, nimi, kentat) {
  const rivit = Object.entries({ shardi: nimi, ...kentat })
    .map(([k, v]) => `${k}=${v}`).join('\n');
  writeFileSync(join(lokit, `${nimi}.tila`), `${rivit}\n`);
}

/** Bittikartta base64:nä: mitkä laatat ovat olemassa (bitti 1). */
function kartta(bitit) {
  const tavut = Buffer.alloc(Math.ceil(bitit.length / 8));
  bitit.forEach((b, i) => { if (b) tavut[i >> 3] |= 1 << (i & 7); });
  return tavut.toString('base64');
}

test('tilatiedoston jäsennys sietää tyhjät rivit ja arvon = -merkin', () => {
  const t = lueTila('shardi=z8-001\ntila=ajossa\n\nloki=/a/b=c.log\n');
  assert.equal(t.shardi, 'z8-001');
  assert.equal(t.tila, 'ajossa');
  assert.equal(t.loki, '/a/b=c.log');
});

test('edistyminen laskee shardit, laatat ja tahdin viimeiseltä väliltä', () => {
  const lokit = kansio();
  writeFileSync(join(lokit, 'shardit.txt'), 'z8-001\nz8-002\nz8-003\nz8-004\n');
  const alkoi = 1_757_000_000;
  tila(lokit, 'z8-001', { tila: 'valmis', tehty: 824, kaikki: 824, alkoi, yritys: 1 });
  tila(lokit, 'z8-002', { tila: 'valmis', tehty: 824, kaikki: 824, alkoi, yritys: 2 });
  tila(lokit, 'z8-003', { tila: 'ajossa', tehty: 200, kaikki: 824, alkoi, yritys: 1 });
  // z8-004 ei ole vielä alkanut: sillä ei ole tilatiedostoa lainkaan.

  const nyt = (alkoi + 600) * 1000;
  const r = kokoaEdistyminen({
    lokit,
    ajo: '34054242743',
    vaihe: 'pyramidi',
    nyt,
    edellinen: {
      ajo: '34054242743',
      hetki: new Date(nyt - 300_000).toISOString(),
      laattoja: { tehty: 1348 },
    },
  });

  assert.deepEqual(r.shardit, {
    kaikki: 4, valmis: 2, ajossa: 1, kaatunut: 0, jonossa: 1,
  });
  assert.equal(r.laattoja.tehty, 1848);
  // Aloittamaton shardi arvioidaan alkaneiden keskiarvolla (824).
  assert.equal(r.laattoja.odotettu, 3296);
  // (1848 - 1348) laattaa viidessä minuutissa = 100 laattaa/min.
  assert.equal(r.laattaa_min, 100);
  assert.equal(r.jaljella_min, Math.round((3296 - 1848) / 100));
  assert.equal(Date.parse(r.arvio_valmis) - nyt, r.jaljella_min * 60_000);
  assert.equal(r.kesto_min, 10);
  assert.equal(r.valmis, false);
  assert.match(yhteenvetoRivi(r), /shardit 2\/4 valmis/);
  assert.match(yhteenvetoRivi(r), /100 laattaa\/min/);
});

test('edellisen ajon raportti ja sen shardit eivät sotke uutta ajoa', () => {
  const lokit = kansio();
  // Työkansio elää ajojen yli: levyllä on edellisen ajon tilatiedostot
  // (eri jako, 8 shardia) ja edellisen ajon edistyminen.json.
  writeFileSync(join(lokit, 'pallo-shardit.txt'), 'pallo-001\npallo-002\n');
  const alkoi = 1_757_000_000;
  tila(lokit, 'pallo-001', { tila: 'ajossa', tehty: 5, kaikki: 50, alkoi, yritys: 1 });
  tila(lokit, 'pallo-007', { tila: 'valmis', tehty: 999, kaikki: 999, alkoi: 1, yritys: 1 });

  const r = kokoaEdistyminen({
    lokit,
    ajo: 'uusi',
    nyt: (alkoi + 300) * 1000,
    edellinen: {
      ajo: 'vanha',
      hetki: new Date((alkoi + 240) * 1000).toISOString(),
      laattoja: { tehty: 20_000 },
    },
  });
  assert.equal(r.shardit.kaikki, 2);
  assert.equal(r.laattoja.tehty, 5, 'listan ulkopuolinen shardi ei kuulu tähän ajoon');
  assert.equal(r.laattaa_min, null, 'toisen ajon raportti ei kelpaa tahdin lähteeksi');
});

test('kaatunut shardi näkyy raportissa lokin viimeisine riveineen', () => {
  const lokit = kansio();
  const loki = join(lokit, 'pallo-002.uusinta.log');
  // Piirtoloki palaa rivin alkuun \r:llä; raportin on silti näytettävä
  // viimeiset rivit eikä yhtä kilometrin mittaista riviä.
  writeFileSync(loki, '10/85 laattaa\r20/85 laattaa\rError: HTTP 429\n');
  writeFileSync(join(lokit, 'pallo-shardit.txt'), 'pallo-001\npallo-002\n');
  tila(lokit, 'pallo-001', { tila: 'valmis', tehty: 43, kaikki: 43, alkoi: 1, yritys: 1 });
  tila(lokit, 'pallo-002', { tila: 'kaatui', tehty: 20, kaikki: 42, alkoi: 1, yritys: 2, loki });

  const r = kokoaEdistyminen({ lokit, ajo: 'paikallinen', vaihe: 'pallo', valmis: true, koodi: 1 });
  assert.equal(r.shardit.kaatunut, 1);
  assert.equal(r.kaatuneet[0].shardi, 'pallo-002');
  assert.equal(r.kaatuneet[0].yritys, 2);
  assert.deepEqual(r.kaatuneet[0].rivit.slice(-1), ['Error: HTTP 429']);
  assert.deepEqual(r.kesken, ['pallo-002']);
  assert.match(yhteenvetoRivi(r), /VALMIS \(koodi 1\)/);
  assert.match(yhteenvetoRivi(r), /kaatuneet: pallo-002/);
});

test('viimeisetRivit lukee vain lokin lopun', () => {
  const lokit = kansio();
  const loki = join(lokit, 'iso.log');
  writeFileSync(loki, `${'x'.repeat(200_000)}\nviimeinen rivi\n`);
  assert.deepEqual(viimeisetRivit(loki, 2).slice(-1), ['viimeinen rivi']);
  assert.deepEqual(viimeisetRivit(join(lokit, 'ei-ole.log')), []);
});

test('bittikartta kertoo laattojen määrän', () => {
  assert.equal(bittienMaara(kartta([1, 0, 1, 1, 0, 0, 0, 0, 1])), 4);
  assert.equal(bittienMaara(''), 0);
});

test('odotukset luetaan luettelosta, ei arvata', () => {
  const luettelo = {
    tasot: [
      { z: 7, sarakkeita: 169, riveja: 103, laatasto: null },
      { z: 8, sarakkeita: 338, riveja: 206, laatasto: null },
    ],
    viivataso: { laatastot: { 8: kartta([1, 1, 0, 1]) } },
    nostotaso: { laatastot: { 8: kartta([1, 0, 0, 0]) } },
  };
  const o = odotetutPyramidista(luettelo);
  assert.equal(o.get('pohja z8'), 69_628);
  assert.equal(o.get('pohja z7'), 17_407);
  assert.equal(o.get('viivat z8'), 3);
  assert.equal(o.get('nostot z8'), 1);
  // Mercator-taso on täysi ruudukko: 4^Z.
  const p = odotetutPallosta({ tasot: { min: 0, max: 3 } });
  assert.equal(p.get('pallo z3'), 64);
  assert.equal([...p.values()].reduce((s, n) => s + n, 0), 85);
});

test('eheystarkistus huomaa puuttuvan laatan mutta sietää tuntemattoman shardin', () => {
  const lokit = kansio();
  mkdirSync(lokit, { recursive: true });
  writeFileSync(join(lokit, 'pallo-001.laskut'), 'pallo 0 1\npallo 1 4\npallo 2 8\npallo 3 32\n');
  writeFileSync(join(lokit, 'pallo-002.laskut'), 'pallo 2 8\npallo 3 32\n');
  const nimet = ['pallo-001', 'pallo-002'];
  const odotetut = odotetutPallosta({ tasot: { min: 0, max: 3 } });

  const taysi = summaaLaskut(lokit, nimet);
  assert.equal(taysi.summat.get('pallo z3'), 64);
  assert.equal(eheys({ summat: taysi.summat, odotetut }).ok, true);

  // Yksi laatta pois: tarkistuksen on kaaduttava, ei pyöristettävä.
  writeFileSync(join(lokit, 'pallo-002.laskut'), 'pallo 2 8\npallo 3 31\n');
  const vajaa = summaaLaskut(lokit, nimet);
  const tulos = eheys({ summat: vajaa.summat, odotetut, tuntemattomat: vajaa.tuntemattomat });
  assert.equal(tulos.ok, false);
  assert.deepEqual(tulos.puuttuvat, [{ avain: 'pallo z3', poltettu: 63, odotus: 64, ero: 1 }]);

  // Shardi ilman laskentaa (vanhan ajon .valmis-merkki) ei kaada
  // tarkistusta vaan kirjautuu tuntemattomaksi.
  const vanha = summaaLaskut(lokit, [...nimet, 'pallo-003']);
  assert.deepEqual(vanha.tuntemattomat, ['pallo-003']);

  // Ylimääräinen laatta on yhtä lailla vika: luettelo ei tunne sitä.
  writeFileSync(join(lokit, 'pallo-002.laskut'), 'pallo 2 8\npallo 3 33\n');
  const liika = summaaLaskut(lokit, nimet);
  assert.equal(eheys({ summat: liika.summat, odotetut }).ok, false);
});
