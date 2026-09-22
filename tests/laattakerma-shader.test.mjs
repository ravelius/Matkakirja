import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KERMA_MAA_ERO, KERMA_MERI_ERO, asennaKermaShader, kermaMaskinAlue, kermanVariLuvuiksi, luoKermanJaetut, paivitaKermanJaetut,
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

test('kerman väri heksasta lukuiksi', () => {
  assert.deepEqual(kermanVariLuvuiksi('#ff0080').map((v) => Math.round(v * 255)), [255, 0, 128]);
  assert.equal(kermanVariLuvuiksi(undefined).length, 3);
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
  assert.match(shader.fragmentShader, /texture2D\( map, vKermaUv \)/);
  assert.doesNotMatch(shader.fragmentShader, /\bvUv\b|\bvMapUv\b/);
  assert.match(shader.vertexShader, /varying vec2 vKermaUv;/);
  assert.match(shader.vertexShader, /#include <uv_vertex>\nvKermaUv = uv;/);
  assert.match(shader.fragmentShader, /varying vec2 vKermaUv;/);
  assert.equal(materiaali.customProgramCacheKey(), 'laattakerma-1');
});

test('jaettujen päivitys ilman renkaita nollaa maskin alueen, peitot tasoituksesta', () => {
  const jaettu = luoKermanJaetut();
  const ok = paivitaKermanJaetut(jaettu, { kerma: '#faf4d6', peitto: 0.8, sumu: { peitto: 0.35 }, renkaat: [] }, { luoKangas: () => null });
  assert.equal(ok, false);
  assert.equal(jaettu.kermaPeitto.value, 0.8);
  assert.equal(jaettu.kermaSumuPeitto.value, 0.35);
  assert.deepEqual(jaettu.kermaMaskiAlue.value, [0, 0, 1, 1]);
});
