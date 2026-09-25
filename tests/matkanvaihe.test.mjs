/*
 * MATKAN VAIHEKÄYRÄ: NAPPULA KULKEE JOKA MATKAPISTEEN LÄPI
 * (omistaja 16.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 29 kohta 1,
 * sanatarkasti: *"pelinappula saisi silti liikkua jokaisen matkapisteen
 * lapi ja kiihdyttaa ja jarruttaa niiden valilla"*).
 *
 * Vartioitava asia on kolmiosainen, ja jokainen osa katoaisi hiljaa:
 *   1. PISTEET OSUVAT KOHDALLEEN. Jos vääristys tehtäisiin ajan eikä
 *      etenemisen suhteen, nappula ohittaisi matkapisteet viistosti —
 *      mitään ei kaatuisi, mutta reitti ei kulkisi niiden läpi.
 *   2. VAUHTI NOTKAHTAA PISTEESSÄ ja nousee välillä (jarrutus ja
 *      kiihdytys). Nolla-amplitudi eli MATKAPISTEEN_VAUHTI = 1
 *      palauttaisi vanhan tasaisen kyydin.
 *   3. NAPPULA EI PERUUTA eikä pysähdy kesken: käyrä on aidosti
 *      kasvava, ja pysähdys on vain lähdössä ja perillä.
 *
 * Nopeuskäyrä on puhdasta matematiikkaa, joten se mitataan tässä;
 * ruudulla se mitataan tools/savukkeet/savuke-nappula-liike.mjs:llä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  MATKAPISTEEN_VAUHTI, autokyydinVaihe, matkanVaihe,
} from '../js/siirtokoreografia.js';

/** autokyydinVaiheen käänteisfunktio: se t, jolla eteneminen on x. */
const aika = (x) => (x < 0.5 ? Math.sqrt(x / 2) : 1 - Math.sqrt((1 - x) / 2));

test('matkan vaihekäyrä alkaa nollasta ja päättyy ykköseen', () => {
  for (const n of [1, 2, 3, 4, 7, 12]) {
    const vaihe = matkanVaihe(n);
    assert.ok(Math.abs(vaihe(0)) < 1e-12, `n=${n} alku`);
    assert.ok(Math.abs(vaihe(1) - 1) < 1e-12, `n=${n} loppu`);
  }
  // Yhden matkapisteen matkassa ei ole välipisteitä: käyrä on entinen.
  for (let t = 0; t <= 1.0001; t += 0.05) {
    assert.ok(Math.abs(matkanVaihe(1)(t) - autokyydinVaihe(t)) < 1e-12, `t=${t}`);
  }
});

test('jokainen matkapiste osuu kohdalleen (nappula kulkee sen läpi)', () => {
  for (const n of [2, 3, 4, 6, 9]) {
    const vaihe = matkanVaihe(n);
    for (let i = 0; i <= n; i += 1) {
      const e = vaihe(aika(i / n));
      assert.ok(Math.abs(e - i / n) < 1e-9,
        `n=${n}, piste ${i}: eteneminen ${e} ≠ ${i / n}`);
    }
  }
});

test('vauhti jarruttaa jokaiseen pisteeseen ja kiihdyttää välillä', () => {
  const n = 5;
  const vaihe = matkanVaihe(n);
  const d = 1e-4;
  const vauhti = (t) => (vaihe(t + d) - vaihe(t - d)) / (2 * d);
  for (let i = 1; i < n; i += 1) {
    const pisteessa = vauhti(aika(i / n));
    const ennen = vauhti(aika((i - 0.5) / n));
    const jalkeen = vauhti(aika((i + 0.5) / n));
    assert.ok(pisteessa < ennen && pisteessa < jalkeen,
      `piste ${i}: ${pisteessa} ei ole hitaampi kuin ${ennen} / ${jalkeen}`);
  }
  /*
   * NOTKAHDUKSEN SYVYYS mitataan matkan KESKIPISTEESTÄ. Käyrässä on
   * kaksi kerrosta (autokyydin iso kiihdytys ja pisteiden aaltoilu),
   * ja iso ele muuttaa vauhtia myös välin sisällä — mutta keskellä
   * matkaa se on symmetrinen, joten naapurinäytteiden keskiarvo
   * kumoaa sen ja jäljelle jää pisteiden oma suhde
   * MATKAPISTEEN_VAUHTI / (2 − MATKAPISTEEN_VAUHTI).
   */
  const m = 4;
  const keski = matkanVaihe(m);
  // W(x) = vaihe(aika(x)): iso ele kumoutuu, kun aikamuuttuja luetaan
  // sen omalla käänteisfunktiolla — jäljelle jää pisteiden aaltoilu.
  const W = (x) => keski(aika(x));
  const v = (x) => (W(x + d) - W(x - d)) / (2 * d);
  const suhde = v(0.5) / ((v(1.5 / m) + v(2.5 / m)) / 2);
  assert.ok(Math.abs(suhde - MATKAPISTEEN_VAUHTI / (2 - MATKAPISTEEN_VAUHTI)) < 0.02,
    `notkahduksen suhde ${suhde}`);
});

test('matka pysähtyy vain lähdössä ja perillä eikä koskaan peruuta', () => {
  const n = 4;
  const vaihe = matkanVaihe(n);
  let edellinen = -1;
  let nollia = 0;
  const askel = 1 / 2000;
  for (let t = 0; t <= 1.0000001; t += askel) {
    const e = vaihe(Math.min(1, t));
    assert.ok(e >= edellinen - 1e-12, `nappula peruutti kohdassa t=${t}`);
    if (t > 0 && Math.abs(e - edellinen) < 1e-9) nollia += 1;
    edellinen = e;
  }
  // Pysähdyksiä on vain päissä (autokyydin oma kiihdytys ja jarrutus).
  assert.ok(nollia < 40, `pysähdyksiä kesken matkan: ${nollia} näytettä`);
  assert.ok(vaihe(0.5) > 0.4 && vaihe(0.5) < 0.6, `puolimatka ${vaihe(0.5)}`);
});

test('käyrä on sama riippumatta siitä, monestiko sitä kutsutaan', () => {
  const vaihe = matkanVaihe(4);
  const a = [0, 0.13, 0.5, 0.77, 1].map(vaihe);
  const b = [0, 0.13, 0.5, 0.77, 1].map(vaihe);
  assert.deepEqual(a, b);
  // Kokonaiskesto ei muutu: aikamuuttujaan ei kosketa.
  assert.equal(vaihe(1), 1);
});
