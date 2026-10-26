// Natural Earthista puuttuvat saaret (kartan kokonaistarkistus, PT 10.10.2026):
// tools/generoi-maapolygonit.mjs LISASAARET ottaa renkaan GSHHG-rantaviivasta.
// Jokaisen saaren karttavalo osuu maansa rajan sisään (2 km:n varalla).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maarajaRivit } from '../tools/vienti/maarajat.mjs';

const rivit = maarajaRivit(new URL('../assets/data/maapolygonit.json', import.meta.url));

function sisalla([x, y], r) {
  let s = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i]; const [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) s = !s;
  }
  return s;
}

test('LISASAARET ovat maansa rajan sisällä', () => {
  for (const [iso, lat, lon, nimi] of [
    ['IRL', 51.771, -10.54, 'Skellig Michael'], ['ISL', 65.3759, -22.912, 'Flatey'],
    ['ISL', 63.7409, -22.9576, 'Eldey'], ['SWE', 57.8828, 11.582, 'Marstrand'],
  ]) {
    const { renkaat } = rivit.find((r) => r.id === iso);
    // Hila alle 2 km:n säteellä (lon ±0,02° on 60°N:llä noin 1 km).
    const hila = [0, 0.01, -0.01, 0.02, -0.02].flatMap((a) => [0, 0.005, -0.005, 0.01, -0.01].map((b) => [a, b]));
    const osuu = hila.some(([a, b]) => renkaat.some((r) => sisalla([lon + a, lat + b], r)));
    assert.ok(osuu, `${nimi} (${iso}) puuttuu maarajoista`);
  }
});
