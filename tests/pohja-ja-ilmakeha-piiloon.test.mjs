/*
 * SULAVUUSKATSAUS 22.9.2026 KOHDAT 1 JA 2: ilmakehäkuori sammuu, kun sen
 * hehku ei ole ruudulla; kirjaston pohja (pohjapallo + z5) jää piirtämättä,
 * kun laattakerros peittää koko ruudun täysin häivytetyillä laatoilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { ILMAKEHAN_REUNAVARA_AST, ilmakehaNakyy } from '../js/pallo.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('ilmakehä: puhelimen lähikuvat sammuttavat kuoren, maailmanäkymä sytyttää', () => {
  const puhelin = { fov: 50, kuvasuhde: 390 / 844, kuoriKorkeus: 0.18 };
  for (const altitude of [0.03, 0.05, 0.2, 0.6, 1.0]) assert.equal(ilmakehaNakyy({ ...puhelin, altitude }), false, `korkeus ${altitude}`);
  for (const altitude of [1.6, 1.9, 2.5]) assert.equal(ilmakehaNakyy({ ...puhelin, altitude }), true, `korkeus ${altitude}`);
  // Työpöytä (leveä): reuna tulee kulmaan aiemmin.
  const tyopoyta = { fov: 50, kuvasuhde: 1400 / 900, kuoriKorkeus: 0.18 };
  assert.equal(ilmakehaNakyy({ ...tyopoyta, altitude: 0.2 }), false);
  assert.equal(ilmakehaNakyy({ ...tyopoyta, altitude: 0.9 }), true);
  // Astronautin paksumpi kuori (0,25) näkyy hieman aiemmin.
  assert.equal(ilmakehaNakyy({ ...puhelin, altitude: 1.5, kuoriKorkeus: 0.25 }), true);
  // Kameran sisällä kuoresta: ei koskaan.
  assert.equal(ilmakehaNakyy({ ...puhelin, altitude: 0.1, kuoriKorkeus: 0.18 }), false);
  // Puuttuva korkeus: varmuuden vuoksi päällä.
  assert.equal(ilmakehaNakyy({ altitude: NaN }), true);
  assert.ok(ILMAKEHAN_REUNAVARA_AST >= 0);
});

test('ilmakehän vahti asennetaan rakennaPallossa ja kirjoittaa vain muutokset', () => {
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /asennaIlmakehanVahti\(pallo, kotelo\);/);
  const vahti = pallo.slice(pallo.indexOf('export function asennaIlmakehanVahti'));
  assert.match(vahti, /if \(nakyy === paalla\) return;/);
  assert.match(vahti, /pallo\.showAtmosphere\(nakyy\)/);
  assert.match(vahti, /laattakerroksenKokeet\(\)\.has\('ilmakehavanha'\)/);
});

test('pohja piiloon vain kun kerros peittää koko ruudun; koelippu pohjavanha', () => {
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /const piiloon = eiPohjaa \|\| \(pohjanPiilotus && kerrosKaytossa && kerros\.peittaaKokonaan\(\)\);/);
  // Paljas kartta (`eipohja`, omistaja 23.9.2026): pohja aina piilossa.
  assert.match(pallo, /const eiPohjaa = laattakerroksenKokeet\(\)\.has\('eipohja'\);/);
  assert.match(pallo, /moottori\.visible = !piiloon;/);
  assert.match(pallo, /laattakerroksenKokeet\(\)\.has\('pohjavanha'\)/);
  // Vapautetun kerroksen jälkeen pohja palaa (kutsu myös kun kerros ei ole käytössä).
  assert.match(pallo, /if \(!kerrosKaytossa\) \{ tahdistaPohjanNakyvyys\(\); return; \}/);
  const laatat = lue('../js/pallolaatat.js');
  const ehto = laatat.slice(laatat.indexOf('peittaaKokonaan: () =>'), laatat.indexOf('mittarit: () => ({'));
  assert.match(ehto, /!purettu && !lukittu/);
  assert.match(ehto, /naytteitaPallolla === LAATTAKERROS_NAYTTEITA \* LAATTAKERROS_NAYTTEITA/);
  assert.match(ehto, /peittoOsuus === 1/);
});
