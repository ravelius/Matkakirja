/*
 * EUROOPAN JOKIEN GEOGLOWS-KORVAUS (tools/fokuskartta/joet-lisa.mjs),
 * korjattu 29.9.2026 koepoltosta (kuvaparit joet-wien-z8.jpg, joet-rooma-z10.jpg).
 *
 * WIEN—BRATISLAVA (kaksoisjoki): Tonava on rajajoki, ja Itävallan ja
 * Slovakian GEOGLOWS-tiedostot digitoivat rajaosuuden hieman eri
 * ketjutuksella. Vanha koko-uoman kynnys (≥ 60 % pisteistä lähellä →
 * koko uoma pois) ei osunut kumpaankaan tiedostoon, koska päällekkäisyys
 * oli vain OSA kummankin ketjusta — molemmat piirtyivät kokonaan, ja
 * Tonava näkyi kahtena lähes samana viivana. Testi jäljittelee tätä
 * pienemmässä mittakaavassa.
 *
 * PAKETIN JOKI POIS VAIN JOS GEOGLOWS KORVAA SEN: ennen paketin uoma
 * poistettiin heti, kun se osui Euroopan laatikkoon, vaikka GEOGLOWS-
 * aineistossa ei olisi sille lainkaan vastinetta (esim. kanava tai
 * järven keskilinja).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { korvaaEuroopanJoet } from '../tools/fokuskartta/joet-lisa.mjs';

/** Identiteettiprojektio testejä varten: lauta = astetta. */
const KAAVA = {
  lautaX: (lon) => lon, lautaY: (lat) => lat, lautaLon: (x) => x, lautaLat: (y) => y,
};

function geojson(nimi, features) {
  return {
    type: 'FeatureCollection',
    features: features.map(({ valuma, pisteet }) => ({
      type: 'Feature',
      properties: { iso: nimi, valuma_km2: valuma },
      geometry: { type: 'LineString', coordinates: pisteet },
    })),
  };
}

function kansioGeoglows(tiedostot) {
  const dir = mkdtempSync(join(tmpdir(), 'joet-lisa-'));
  for (const [nimi, features] of Object.entries(tiedostot)) {
    writeFileSync(join(dir, `${nimi}.geojson`), JSON.stringify(geojson(nimi, features)));
  }
  return dir;
}

const diag = (lon, lat) => Array.from({ length: 9 }, (_, i) => [lon + i, lat + i]);

test('rajajoki: osittain päällekkäiset ketjut eivät jää tuplana (Tonava Wien-Bratislava)', () => {
  const kansio = kansioGeoglows({
    AUT: [{ valuma: 1000, pisteet: diag(1, 1) }], // (1,1)…(9,9)
    SVK: [{ valuma: 900, pisteet: diag(7, 7) }], // (7,7)…(15,15), 3/9 pistettä päällekkäin
  });
  const k = korvaaEuroopanJoet([], kansio, KAAVA, { alue: { lon0: 0, lon1: 20, lat0: 0, lat1: 20 } });
  assert.equal(k.lisatty, 2, 'AUT kokonaan + SVK:n ei-päällekkäinen häntä omana viivanaan');

  const kaikkiPisteet = k.joet.flatMap((j) => j.pisteet.map(([x, y]) => `${x},${y}`));
  const laskuri = new Map();
  for (const p of kaikkiPisteet) laskuri.set(p, (laskuri.get(p) ?? 0) + 1);
  // Päällekkäinen jakso (7,7)-(9,9) ei saa esiintyä kahdesti eri viivoilla.
  for (const p of ['7,7', '8,8', '9,9']) {
    assert.equal([...k.joet].filter((j) => j.pisteet.some(([x, y]) => `${x},${y}` === p)).length, 1,
      `piste ${p} kuuluu vain yhteen viivaan`);
  }
  // SVK:n oma pätkä (10,10) eteenpäin on säilynyt.
  assert.ok(k.joet.some((j) => j.pisteet.some(([x, y]) => x === 14 && y === 14)), 'SVK:n uniikki häntä säilyy');
});

test('paketin joki poistetaan vain, jos GEOGLOWS-verkko todella kulkee sen kohdalla', () => {
  const kansio = kansioGeoglows({
    AUT: [{ valuma: 1000, pisteet: diag(1, 1) }], // (1,1)…(9,9)
  });
  const paketti = [
    { nimi: 'Vastinejoki', tarkeys: 1, pisteet: diag(1, 1) }, // sama kuin GEOGLOWS: pitäisi korvautua
    { nimi: 'Kanava', tarkeys: 2, pisteet: [[50, 50], [51, 51], [52, 52], [53, 53]] }, // ei GEOGLOWS-vastinetta: säilyy
  ];
  const k = korvaaEuroopanJoet(paketti, kansio, KAAVA, { alue: { lon0: 0, lon1: 60, lat0: 0, lat1: 60 } });
  assert.equal(k.poistettu, 1, 'vain GEOGLOWS:n todella korvaama paketin joki poistuu');
  assert.ok(!k.joet.some((j) => j.nimi === 'Vastinejoki'), 'GEOGLOWS-vastineellinen paketin joki korvattu');
  assert.ok(k.joet.some((j) => j.nimi === 'Kanava'), 'ilman GEOGLOWS-vastinetta oleva paketin joki säilyy');
});

test('meri leikkaa GEOGLOWS-uoman jaksoihin kuten ennenkin', () => {
  const kansio = kansioGeoglows({
    AAA: [{ valuma: 500, pisteet: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]] }],
  });
  const onMeri = (lon) => lon === 3; // keskimmäinen piste merellä
  const k = korvaaEuroopanJoet([], kansio, KAAVA, {
    alue: { lon0: 0, lon1: 10, lat0: 0, lat1: 10 }, onMeri,
  });
  assert.equal(k.lisatty, 2, 'meri katkaisee uoman kahdeksi maalla olevaksi jaksoksi');
});
