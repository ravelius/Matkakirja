// SUOMI PAKOTETTUNA (omistaja 6.10.2026 Päätoimittajan kautta: "ElevenLabs ei osaa arvata kieltä"; lyhyet leikkeet ääntyivät
// väärin): jokaisessa workerin ElevenLabs-puhekutsussa language_code "fi" (multilingual_v2 EI käytössä: tukematon malli → virhe, omistaja 17.10.2026 klo 23.04).
// Generointityökalut (tools/generoi-*.mjs, hahmonaytteet, tekstityopoyta-audio) lähettävät saman. Vika toistettiin ensin.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { kieliFi } from '../tools/elevenlabs-kieli.mjs';
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

test('kieliFi: suomi aina; kielikoodia tukematon malli on virhe', () => {
  assert.deepEqual(kieliFi('eleven_v4_turbo'), { language_code: 'fi' });
  assert.deepEqual(kieliFi('eleven_v3'), { language_code: 'fi' });
  assert.throws(() => kieliFi('eleven_multilingual_v2'), /ei tue language_code/);
});

// OMISTAJAN PÄÄTÖS 17.10.2026 klo 23.04: "pidä huoli että jatkossa aina suomi pakotettuna". Skannataan KAIKKI työkalut: jokainen tiedosto, joka
// kutsuu ElevenLabsin puhepäätettä (text-to-speech / text-to-dialogue / with-timestamps), liittää rungon kielikoodin `kieliFi(...)`-apurilla
// tai kirjaimellisella `language_code: 'fi'`, eikä missään ole multilingual-poikkeusta (`includes('multilingual')`).
function tyokalut(hakemisto) {
  const ulos = [];
  for (const n of readdirSync(hakemisto)) {
    const p = join(hakemisto, n);
    if (statSync(p).isDirectory()) { if (n !== 'node_modules') ulos.push(...tyokalut(p)); } else if (/\.(mjs|js)$/.test(n)) ulos.push(p);
  }
  return ulos;
}
const PUHEKUTSU = /(?:api\.elevenlabs\.io|\$\{API\}|ELEVEN_PUHE_RAJAPINTA|PUHE_OSOITE)[^\n]*?\/v1\/text-to-(?:speech|dialogue)|ELEVEN_PUHE_RAJAPINTA\s*=|PUHE_OSOITE\s*=\s*`\$\{API\}\/v1\/text-to-speech`/;

test('jokainen ElevenLabsin puhekutsu lähettää language_code "fi" (skannaus tools/)', () => {
  const kutsujat = [];
  for (const p of tyokalut(new URL('../tools', import.meta.url).pathname)) {
    if (p.endsWith('elevenlabs-kieli.mjs')) continue;
    const s = readFileSync(p, 'utf8');
    if (!PUHEKUTSU.test(s)) continue;
    kutsujat.push(p);
    assert.match(s, /kieliFi\(|language_code\s*:\s*'fi'/, `${p}: ElevenLabsin puhekutsusta puuttuu language_code 'fi'`);
    assert.doesNotMatch(s, /includes\('multilingual'\)/, `${p}: multilingual-poikkeus kielletty (tukematon malli → virhe)`);
  }
  assert.ok(kutsujat.length >= 10, `skannaus löysi vain ${kutsujat.length} puhekutsujaa`);
  for (const t of ['generoi-avaus', 'generoi-hihkaisut', 'generoi-kaari', 'generoi-kohtaamiset', 'generoi-linssiluennat', 'generoi-luennat',
    'generoi-pulu', 'hahmonaytteet', 'tekstityopoyta-audio']) {
    assert.ok(kutsujat.some((p) => p.endsWith(`/${t}.mjs`)), `${t}: puuttuu skannauksesta`);
  }
});

test('linssiluentojen aikaleimareitti ei käytä multilingual_v2:ta', async () => {
  const { AIKALEIMOJEN_MALLI } = await import('../tools/generoi-linssiluennat.mjs');
  assert.doesNotMatch(AIKALEIMOJEN_MALLI, /multilingual/);
  assert.doesNotThrow(() => kieliFi(AIKALEIMOJEN_MALLI));
});
