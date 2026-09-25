import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KERMA_MAA_ERO, KERMA_MERI_ERO, asennaKermaShader, kermaMaskinAlue, kermanVariLineaariseksi, kermanVariLuvuiksi, srgbLineaariseksi, luoKermanJaetut, paivitaKermanJaetut,
} from '../js/laattakerma-shader.js';
import { readFileSync } from 'node:fs';

test('kerman kynnykset ovat samat kuin pallolaatat.js:n kangaspolulla', () => {
  const laatat = readFileSync(new URL('../js/pallolaatat.js', import.meta.url), 'utf8');
  assert.match(laatat, new RegExp(`const TASOITUS_MERI_ERO = ${KERMA_MERI_ERO};`));
  assert.match(laatat, new RegExp(`const TASOITUS_MAA_ERO = ${KERMA_MAA_ERO};`));
});

test('maskin alue kattaa renkaat ja sumun aukot marginaalilla', () => {
  const alue = kermaMaskinAlue({ renkaat: [[[10, 20], [30, 20], [30, 40]]], sumu: { aukot: [{ x: 5, y: 30, rx: 2, ry: 3 }] } }, 0.1);
  assert.ok(alue.x0 < 3 && alue.y0 < 20 && alue.x0 + alue.w > 30 && alue.y0 + alue.h > 40);
  assert.equal(kermaMaskinAlue({ renkaat: [] }), null);
});

test('kerman väri heksasta lukuiksi ja lineaariseksi', () => {
  assert.deepEqual(kermanVariLuvuiksi('#ff0080').map((v) => Math.round(v * 255)), [255, 0, 128]);
  assert.equal(kermanVariLuvuiksi(undefined).length, 3);
  // Jaettu uniformi on lineaarinen: #faf4d6 → sRGB 0,98/0,957/0,839 → lin ≈ 0,955/0,905/0,672.
  const lin = kermanVariLineaariseksi('#faf4d6');
  assert.ok(Math.abs(lin[0] - 0.955) < 0.003 && Math.abs(lin[2] - 0.672) < 0.003, JSON.stringify(lin));
  assert.ok(Math.abs(srgbLineaariseksi(0.5) - 0.214) < 0.001);
  assert.equal(srgbLineaariseksi(0), 0);
  assert.deepEqual(luoKermanJaetut().kermaVari.value, lin);
});

test('shader ujutetaan map_fragmentin tilalle ja uniformit jaetaan', () => {
  const jaettu = luoKermanJaetut();
  const materiaali = {};
  const omat = asennaKermaShader(materiaali, { jaettu, laatta: { alue: { x0: 1, y0: 2, w: 3, h: 4 }, paalla: true } });
  const shader = {
    uniforms: {},
    vertexShader: '#include <common>\nvoid main(){\n#include <uv_vertex>\n}',
    fragmentShader: '#include <common>\nvoid main(){\n#include <map_fragment>\n}',
  };
  materiaali.onBeforeCompile(shader);
  assert.equal(shader.uniforms.kermaMaski, jaettu.kermaMaski, 'maski on jaettu olio');
  assert.deepEqual(shader.uniforms.kermaLaattaAlue.value, [1, 2, 3, 4]);
  assert.equal(omat.kermaPaalla.value, 1);
  assert.match(shader.fragmentShader, /uniform sampler2D kermaMaski/);
  assert.match(shader.fragmentShader, /smoothstep\(36\.0, 52\.0, kermaEro\)/);
  assert.doesNotMatch(shader.fragmentShader, /#include <map_fragment>/);
  // Oma varying, ei kirjaston nimeä (vika v2084: vUv ei ole r155:ssä → ei käänny).
  assert.match(shader.fragmentShader, /texture2D\( map, vec2\(vKermaUv\.x, /);
  assert.doesNotMatch(shader.fragmentShader, /\bvUv\b|\bvMapUv\b/);
  assert.match(shader.vertexShader, /varying vec2 vKermaUv;/);
  assert.match(shader.vertexShader, /#include <uv_vertex>\nvKermaUv = uv;/);
  assert.match(shader.fragmentShader, /varying vec2 vKermaUv;/);
  assert.equal(materiaali.customProgramCacheKey(), 'laattakerma-2');
  // Nollakopio-bittikartta: kuva v-käännettynä uniformin mukaan, lauta-y verkon uv:stä.
  assert.equal(omat.kermaKaanto.value, 0);
  assert.match(shader.fragmentShader, /texture2D\( map, vec2\(vKermaUv\.x, mix\(vKermaUv\.y, 1\.0 - vKermaUv\.y, kermaKaanto\)\) \)/);
  assert.match(shader.fragmentShader, /\(1\.0 - vKermaUv\.y\) \* kermaLaattaAlue\.w/);
  const kaannetty = {};
  const omat2 = asennaKermaShader(kaannetty, { jaettu, laatta: { alue: { x0: 0, y0: 0, w: 1, h: 1 } }, kaanto: true });
  assert.equal(omat2.kermaKaanto.value, 1);
  // Sulavuus kohta 3: ei pow-pareja, sekoitus lineaarisessa, sqrt-likiarvo erolle.
  assert.doesNotMatch(shader.fragmentShader, /pow\(/);
  assert.match(shader.fragmentShader, /sqrt\(kermaTexel\.r\) - sqrt\(kermaTexel\.b\)/);
  assert.match(shader.fragmentShader, /mix\(kermaTexel\.rgb, kermaVari,/);
  // Mittauslippu: täsmällinen sRGB-runko omalla ohjelma-avaimella.
  const tarkka = {};
  asennaKermaShader(tarkka, { jaettu, laatta: { alue: { x0: 0, y0: 0, w: 1, h: 1 } }, tarkka: true });
  const s2 = { uniforms: {}, vertexShader: '#include <common>\n#include <uv_vertex>', fragmentShader: '#include <common>\n#include <map_fragment>' };
  tarkka.onBeforeCompile(s2);
  assert.match(s2.fragmentShader, /pow\(kermaTexel\.rgb, vec3\(1\.0 \/ 2\.4\)\)/);
  assert.equal(tarkka.customProgramCacheKey(), 'laattakerma-2-tarkka');
});

test('jaettujen päivitys ilman renkaita nollaa maskin alueen, peitot tasoituksesta', () => {
  const jaettu = luoKermanJaetut();
  const ok = paivitaKermanJaetut(jaettu, { kerma: '#faf4d6', peitto: 0.8, sumu: { peitto: 0.35 }, renkaat: [] }, { luoKangas: () => null });
  assert.equal(ok, false);
  assert.equal(jaettu.kermaPeitto.value, 0.8);
  assert.equal(jaettu.kermaSumuPeitto.value, 0.35);
  assert.deepEqual(jaettu.kermaMaskiAlue.value, [0, 0, 1, 1]);
});
