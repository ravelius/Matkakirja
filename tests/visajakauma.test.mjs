/*
 * VISAVASTAUSTEN INDEKSIJAKAUMAN VARTIJA.
 *
 * TAUSTA. Mittaus 30.8.2026 paljasti indeksi 0 -vinouman: pelaajalle
 * TALLENNETUSSA JÄRJESTYKSESSÄ näytettävissä visoissa oikea vastaus
 * oli lähes aina vaihtoehtolistan ensimmäinen (kulttuurivisat 94 %,
 * fokusvirran minivisat 74 %, kaupunkilehden minitehtävät 67 %,
 * maalehden minitehtävät 55 %). Kirjoittaja kirjoittaa oikean
 * luontevasti ensin — ja tarkkaavainen pelaaja oppii arvaamaan
 * ykkösen tuntematta aihetta. Sama ilmiö kuin pituusvinoumassa
 * (tools/tarkista-vaihtoehdot.mjs), mutta eri akselilla.
 *
 * MITÄ VARTIOIDAAN: vain rakenteet, jotka piirtyvät ruudulle datan
 * järjestyksessä. Laattakysymykset, kaarikysymykset ja pulmat EIVÄT
 * kuulu tänne, koska game.js sekoittaa niiden vaihtoehdot ajon aikana
 * (shuffledOrder) — niiden datajärjestys ei koskaan näy pelaajalle.
 * Skandaalivisoilla on oma, tiukempi vartija (tests/skandaalit.test.mjs).
 *
 * RAJA on löysempi kuin tasajako (45 % yhdellä indeksillä), jotta uusi
 * pieni sisältöerä ei kaadu heti — mutta systemaattinen "oikea aina
 * ensin" -erä kaatuu ennen kuin vinouma ehtii kasvaa takaisin.
 * Uuden erän kirjoittajalle: sijoita oikea vastaus vaihtelevasti,
 * paitsi jos vaihtoehdot ovat loogisessa järjestyksessä (vuosiluvut,
 * suuruusjärjestys) — silloin järjestys saa jäädä ja jakauma tasataan
 * muissa kysymyksissä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';
import { AFRICA_KULTTUURI } from '../js/packs/africa-kulttuuri.js';
import { EUROPE_KULTTUURI } from '../js/packs/europe-kulttuuri.js';

const RAJA = 0.45;

/**
 * Kerää rakenteesta kaikki visan muotoiset oliot: vaihtoehtolista ja
 * oikean kokonaislukuindeksi joko suomeksi (vaihtoehdot/oikea) tai
 * englanniksi (options/correct). Rekursio kattaa myös uudet pesäpaikat
 * — uusi visa samassa datapuussa tulee vartioiduksi ilman uutta koodia.
 */
function* visat(arvo) {
  if (Array.isArray(arvo)) {
    for (const alkio of arvo) yield* visat(alkio);
    return;
  }
  if (!arvo || typeof arvo !== 'object') return;
  if (Array.isArray(arvo.vaihtoehdot) && Number.isInteger(arvo.oikea)) {
    yield { n: arvo.vaihtoehdot.length, indeksi: arvo.oikea };
  }
  if (Array.isArray(arvo.options) && Number.isInteger(arvo.correct)) {
    yield { n: arvo.options.length, indeksi: arvo.correct };
  }
  for (const lapsi of Object.values(arvo)) {
    if (typeof lapsi === 'object' && lapsi !== null) yield* visat(lapsi);
  }
}

/** Rakenteet, jotka näytetään tallennetussa järjestyksessä. */
const RAKENTEET = {
  'fokusvirran minivisat (fokusvirta-*.js)': FOKUSVIRRAT,
  'kaupunkilehden minitehtävät (kulttuuri-kategoriat.js)': KULTTUURI_KATEGORIAT,
  'maalehden minitehtävät (maa-kategoriat.js)': MAA_KATEGORIAT,
  'kulttuurivisat (africa- ja europe-kulttuuri.js)': { AFRICA_KULTTUURI, EUROPE_KULTTUURI },
};

for (const [nimi, data] of Object.entries(RAKENTEET)) {
  test(`oikean vastauksen jakauma on tasainen: ${nimi}`, () => {
    // Jaotellaan vaihtoehtomäärän mukaan — kolmen ja neljän vaihtoehdon
    // visoja ei mitata samassa nipussa, koska tasajako on eri.
    const perN = new Map();
    for (const visa of visat(data)) {
      assert.ok(visa.indeksi >= 0 && visa.indeksi < visa.n,
        `${nimi}: oikea (${visa.indeksi}) ei osu vaihtoehtoihin (${visa.n})`);
      (perN.get(visa.n) ?? perN.set(visa.n, []).get(visa.n)).push(visa.indeksi);
    }
    assert.ok(perN.size > 0, `${nimi}: yhtään visaa ei löytynyt — muuttuiko rakenne?`);

    for (const [n, indeksit] of perN) {
      // Alle kymmenen visan nippu ei voi rikkoa rajaa mielekkäästi.
      if (indeksit.length < 10) continue;
      const jakauma = Array(n).fill(0);
      for (const i of indeksit) jakauma[i] += 1;
      for (let i = 0; i < n; i++) {
        const osuus = jakauma[i] / indeksit.length;
        assert.ok(osuus <= RAJA,
          `${nimi}, ${n} vaihtoehtoa: indeksi ${i} on oikea ${jakauma[i]}/${indeksit.length} `
          + `visassa (${Math.round(osuus * 100)} %) — raja on ${RAJA * 100} %. `
          + `Jakauma [${jakauma.join(', ')}]. Siirrä uusien visojen oikeita vastauksia `
          + 'muille paikoille (sisältö ei muutu, vain järjestys ja oikea-indeksi).');
      }
    }
  });
}
