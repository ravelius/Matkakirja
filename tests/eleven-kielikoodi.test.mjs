// SUOMI PAKOTETTUNA (omistaja 6.10.2026 Päätoimittajan kautta: "ElevenLabs ei osaa arvata kieltä"; lyhyet leikkeet ääntyivät
// väärin): jokaisessa workerin ElevenLabs-puhekutsussa language_code "fi" (multilingual_v2 ei tue kenttää → ei lähetetä).
// Generointityökalut (tools/generoi-*.mjs, hahmonaytteet, tekstityopoyta-audio) lähettävät saman. Vika toistettiin ensin.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import worker from '../tools/pollo/worker.js';

test('workerin luenta lähettää ElevenLabsille language_code "fi"', async () => {
  const kutsut = [];
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('api.elevenlabs.io')) { kutsut.push(JSON.parse(init.body)); return new Response(new Uint8Array(4000)); }
    return new Response('{}');
  };
  try {
    const env = { ELEVEN_API_KEY: 'e', XAI_API_KEY: 'x', POLLO_ORIGINIT: 'https://matkakirja.app' };
    await worker.fetch(new Request('https://pollo.example/', { method: 'POST', headers: { 'content-type': 'application/json',
      origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.6.0.1' }, body: JSON.stringify({ tehtava: 'puhe', persoona: 'kertoja', teksti: 'Tanska.' }) }), env, { waitUntil() {} });
    assert.equal(kutsut.length, 1);
    assert.equal(kutsut[0].language_code, 'fi', 'toisto: kielikoodi puuttui');
  } finally { globalThis.fetch = vanha; }
});

test('generointityökalut lähettävät language_code "fi" (multilingual_v2 pois)', () => {
  for (const t of ['generoi-avaus', 'generoi-hihkaisut', 'generoi-kaari', 'generoi-kohtaamiset', 'generoi-linssiluennat', 'generoi-luennat',
    'generoi-pulu', 'hahmonaytteet', 'tekstityopoyta-audio']) {
    const s = readFileSync(new URL(`../tools/${t}.mjs`, import.meta.url), 'utf8');
    assert.match(s, /language_code\s*:\s*'fi'/, `${t}: kielikoodi puuttuu`);
  }
});
