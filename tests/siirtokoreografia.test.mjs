/*
 * SIIRRON KOREOGRAFIA OMASSA MODUULISSAAN (pallolauta vaihe 2,
 * docs/moduulit/karttapallo.md luku 7: STEP_MS, HYPYN_TAUKO_MS,
 * NAPPULAN_LAHDON_VIIVE_MS, siirtoajonKesto, ENNAKON_* ja
 * siirtoajonPehmennys siirrettiin js/ui.js:stä js/siirtokoreografia.js:ään
 * SANATARKASTI).
 *
 * Vartioitava asia on, että siirto oli MEKAANINEN: luvut ovat samat kuin
 * ennen (v1553) ja käyrä on sama funktio — muuten omistajan 2.9.2026
 * mittaama koreografia (viive 300 ms, saapumisero 280 ms, trapetsi
 * rampeilla 0,3) olisi muuttunut siirron sivuvaikutuksena eikä kukaan
 * huomaisi. Suhteet ja järjestys vartioidaan tests/siirtoajoitus.test.mjs:ssä;
 * tämä vartioi arvot ja tuojat.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import * as koreo from '../js/siirtokoreografia.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* --- 1. vakiot samat kuin ennen siirtoa (js/ui.js v1553) ----------- */

test('vakiot ovat täsmälleen entiset', () => {
  const entiset = {
    STEP_MS: 190,
    HYPYN_TAUKO_MS: 190,
    HYPYN_KAARI: 0.34,
    HYPYN_KORKEUS_MIN: 9,
    HYPYN_KORKEUS_MAX: 30,
    JALKAMATKAN_STEP_MS: 860,
    JALKAMATKAN_STEP_LYHIN_MS: 640,
    JALKAMATKAN_KATTO_MS: 5200,
    NAPPULAN_LAHDON_VIIVE_MS: 300,
    NAPPULAN_SAAPUMISERO_MS: 280,
    SIIRTOAJON_LYHIN_MS: 1200,
    SIIRTOAJON_PISIN_MS: 6200,
    SAATON_RAMPPI: 0.3,
    SIIRTOZOOMIN_LAHENNYS: 2.0,
    ENNAKKOZOOMIN_MS: 760,
    ENNAKON_HENGAHDYS_MS: 120,
    ENNAKON_ASKELIA: 2,
    SAATON_VAHIN_PX: 24,
    SAATON_VAHIN_OSUUS: 0.06,
  };
  for (const [nimi, arvo] of Object.entries(entiset)) {
    assert.equal(koreo[nimi], arvo, `${nimi} muuttui siirrossa`);
  }
  // Johdetut: jalkamatkan porrastus ja kamera-ajon kesto entisillä luvuilla.
  assert.equal(koreo.jalkamatkanAskel(1), 860);
  assert.equal(koreo.jalkamatkanAskel(6), 708);
  assert.equal(koreo.siirtoajonKesto(860), 1440);
  assert.equal(koreo.siirtoajonKesto(0), 1200);
  assert.equal(koreo.siirtoajonKesto(60000), 6200);
});

/* --- 2. pehmennys sama kuin ennen --------------------------------- */

/** Trapetsi täsmälleen kuten js/ui.js v1553 (vertailukappale). */
function entinenPehmennys(t, ramppi = 0.3) {
  const x = Math.min(1, Math.max(0, t));
  const r = Math.min(0.49, Math.max(0.0001, ramppi));
  const v = 1 / (1 - r);
  if (x < r) {
    const a = x / r;
    return v * r * (a ** 3 - (a ** 4) / 2);
  }
  if (x > 1 - r) {
    const b = (1 - x) / r;
    return 1 - v * r * (b ** 3 - (b ** 4) / 2);
  }
  return v * (x - r / 2);
}

test('siirtoajonPehmennys on sama käyrä kuin ennen (1000 näytettä, kaksi ramppia)', () => {
  for (const ramppi of [0.3, 0.2, 0.45]) {
    for (let i = 0; i <= 1000; i++) {
      const t = i / 1000;
      assert.ok(Math.abs(koreo.siirtoajonPehmennys(t, ramppi) - entinenPehmennys(t, ramppi)) < 1e-12,
        `t=${t}, ramppi ${ramppi}`);
    }
  }
  assert.equal(koreo.SAATON_PEHMENNYS(0.5), koreo.siirtoajonPehmennys(0.5));
  // Hypyn vaihe: sama kaava kuin tasokartan hyppaaAskelissa oli
  // (vaaka ease-in-out, pysty 4t(1−t)).
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const e = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
    const { e: eNyt, nousu } = koreo.hypynVaihe(t);
    assert.ok(Math.abs(eNyt - e) < 1e-12 && Math.abs(nousu - 4 * t * (1 - t)) < 1e-12, `t=${t}`);
  }
  assert.equal(koreo.hypynHuippu(1), 9);
  assert.equal(koreo.hypynHuippu(1000), 30);
  assert.ok(Math.abs(koreo.hypynHuippu(50) - 17) < 1e-9);
});

/* --- 3. tuojat ja kehäriippuvuus ----------------------------------- */

test('ui.js ja pallon kamera tuovat koreografian moduulista; ui.js ei julista lukuja enää', () => {
  const ui = lue('../js/ui.js');
  const kamera = lue('../js/pallolauta/kamera.js');
  const moduuli = lue('../js/siirtokoreografia.js');
  assert.match(ui, /from '\.\/siirtokoreografia\.js';/);
  // sovitaAjonKesto muutti js/kartta.js:stä koreografiaan 5.9.2026
  // (laiskoituserä 5b): yksi tuonti tasokartasta olisi vetänyt koko
  // js/kartta.js:n muistiin heti pallolaudan avautuessa.
  assert.match(kamera, /import \{ siirtoajonPehmennys, sovitaAjonKesto \} from '\.\.\/siirtokoreografia\.js';/);
  assert.ok(!kamera.includes("from '../ui.js'"), 'kamera.js tuo yhä ui.js:ää — kehäriippuvuus');
  assert.ok(!moduuli.includes('import '), 'siirtokoreografia.js on lehtimoduuli: ei tuonteja');
  for (const nimi of ['STEP_MS', 'HYPYN_TAUKO_MS', 'NAPPULAN_LAHDON_VIIVE_MS', 'SAATON_RAMPPI',
    'ENNAKKOZOOMIN_MS', 'ENNAKON_HENGAHDYS_MS', 'ENNAKON_ASKELIA', 'SIIRTOZOOMIN_LAHENNYS']) {
    assert.ok(!new RegExp(`^const ${nimi} = `, 'm').test(ui), `ui.js julistaa yhä ${nimi}`);
    assert.match(moduuli, new RegExp(`^export const ${nimi} = `, 'm'), `${nimi} puuttuu moduulista`);
  }
  for (const fn of ['jalkamatkanAskel', 'siirtoajonPehmennys', 'siirtoajonKesto']) {
    assert.ok(!ui.includes(`export function ${fn}(`), `ui.js vie yhä ${fn}`);
    assert.match(moduuli, new RegExp(`^export function ${fn}\\(`, 'm'));
  }
  // Tasokartan hyppy ja pallon hyppy lukevat saman kaaren.
  assert.match(ui, /const \{ e, nousu \} = hypynVaihe\(t\);/);
  assert.match(lue('../js/pallolauta/siirto.js'), /hypynVaihe\(t\)/);
  // Niputus ja SHELL tuntevat moduulin (riippuvuus ennen tuojaansa).
  const modules = lue('../tools/build-standalone.mjs');
  assert.ok(modules.indexOf("'js/siirtokoreografia.js'") < modules.indexOf("'js/ui.js'"),
    'siirtokoreografia.js ei ole MODULES-listalla ennen ui.js:ää');
  assert.match(lue('../sw.js'), /'\.\/js\/siirtokoreografia\.js'/);
});
