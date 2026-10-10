// Pienet saaret maarajoissa (kartan kokonaistarkistus A5, PT 10.10.2026):
// 2–10 km:n saaret pysyvät rajoissa, eikä mikään rengas jää saman maan
// suuremman renkaan sisään (natiivin even-odd-täyttö tekisi siitä reiän).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maarajaRivit, sisakkaisetPois, alanSailyttavaHarvennus } from '../tools/vienti/maarajat.mjs';

const nelio = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];

test('sisakkaisetPois: sisällä oleva pikkurengas putoaa, ulkopuolinen ja enimmäkseen ulkona oleva jäävät', () => {
  const manner = nelio(0, 0, 10, 10);
  const sisalla = nelio(4, 4, 4.1, 4.1);
  const ulkona = nelio(12, 4, 12.1, 4.1);
  const reunalla = nelio(9.95, 4, 10.15, 4.2); // neljäsosa mantereen sisällä
  const tulos = sisakkaisetPois([manner, sisalla, ulkona, reunalla]);
  assert.deepEqual(tulos, [manner, ulkona, reunalla]);
});

test('alanSailyttavaHarvennus: kapea kaistale ei litisty nollan alaiseksi viivaksi (Majuro, A5b)', () => {
  const kaista = nelio(0, 0, 1, 0.01);
  const h = alanSailyttavaHarvennus(kaista, 0.05);
  assert.equal(h.length, 5);
  const ala = Math.abs(h.slice(0, -1).reduce((s, p, i) => s + p[0] * h[i + 1][1] - h[i + 1][0] * p[1], 0) / 2);
  assert.ok(ala > 0.009, `ala ${ala}`);
  // Leveä rengas harvennetaan entisellään.
  assert.deepEqual(alanSailyttavaHarvennus(nelio(0, 0, 1, 1), 0.05), nelio(0, 0, 1, 1));
});

const rivit = maarajaRivit(new URL('../assets/data/maapolygonit.json', import.meta.url));

test('maarajoissa ei ole saman maan suuremman renkaan sisään jäävää rengasta', () => {
  const sisakkaiset = rivit.filter((r) => sisakkaisetPois(r.renkaat).length !== r.renkaat.length).map((r) => r.id);
  assert.deepEqual(sisakkaiset, []);
});

function sisalla([x, y], r) {
  let s = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i]; const [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) s = !s;
  }
  return s;
}

test('A5:n pienet saaret ovat maansa rajan sisällä (2 km:n varalla)', () => {
  const kohteet = [
    ['EST', 58.129, 23.99, 'Kihnu'], ['ISL', 63.433, -20.266, 'Heimaey'], ['ITA', 38.7928, 15.212, 'Stromboli'],
    ['IDN', -4.5841, 129.917, 'Bandasaaret'], ['FJI', -18.5425, 177.629, 'Vatulele'], ['TWN', 22.05, 121.53, 'Lanyu'],
    ['KOR', 34.0264, 127.3125, 'Port Hamilton'], ['SLB', -9.1333, 159.8167, 'Savo'],
  ];
  for (const [iso, lat, lon, nimi] of kohteet) {
    const { renkaat } = rivit.find((r) => r.id === iso);
    const d = 0.02;
    const osuu = [[0, 0], [d, 0], [-d, 0], [0, d], [0, -d]].some(([a, b]) => renkaat.some((r) => sisalla([lon + a, lat + b], r)));
    assert.ok(osuu, `${nimi} (${iso}) puuttuu maarajoista`);
  }
});
