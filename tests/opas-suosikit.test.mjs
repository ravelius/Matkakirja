// MAAILMAN 50 SUOSIKKIA (omistaja 6.10.2026; juna 149): GET /opas/kohteet?n=50 → vakaa lista, erähaku (muutama alipyyntö),
// kuvat vain tekijä- ja lisenssitiedoin, välimuisti R2:ssa. Ilman n:ää täkyt kuten ennen.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

beforeEach(() => tyhjennaReunamuisti());
const N = 60;
const nimet = Array.from({ length: N }, (_, i) => `Kohde ${i}`);
let kutsut = { malli: 0, muut: 0 };
const verkko = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) {
    kutsut.malli += 1;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: nimet.map((n, i) => `KOHDE: ${n} | ${n} | Kaupunki | FR | Koukku numero ${i}.`).join('\n') }], stop_reason: 'end_turn' }));
  }
  kutsut.muut += 1;
  if (s.includes('en.wikipedia.org') && s.includes('titles=')) {
    const t = /titles=([^&]+)/.exec(s)[1].split('|');
    return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.map((x, i) => {
      const n = Number(x.split(' ')[1]);
      return [String(n + 1), n % 10 === 9 ? { title: x, missing: '' } : { title: x, coordinates: [{ lat: 10 + n / 10, lon: 20 }], pageprops: { wikibase_item: `Q${n + 100}` } }];
    })) } }));
  }
  if (s.includes('wbgetentities')) {
    const ids = /ids=([^&]+)/.exec(s)[1].split('|');
    return new Response(JSON.stringify({ entities: Object.fromEntries(ids.map((q) => [q, { claims: { P18: [{ mainsnak: { datavalue: { value: `${q}.jpg` } } }] },
      descriptions: { fi: { value: `kuvaus ${q}` } } }])) }));
  }
  if (s.includes('commons.wikimedia.org')) {
    const t = /titles=([^&]+)/.exec(s)[1].split('|');
    return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.map((x, i) => [String(i), { title: x, imageinfo: [{ thumburl: `https://u/${x}`, descriptionurl: `https://c/${x}`, mime: 'image/jpeg', width: 2000, height: 1000,
      extmetadata: { LicenseShortName: { value: i % 3 ? 'CC BY-SA 4.0' : 'CC BY 2.0' }, Artist: { value: i % 4 === 0 ? '' : `Tekijä ${i}` } } }] }])) } }));
  }
  return new Response('{}');
};
function ymparisto() {
  const r2 = new Map();
  return { r2, env: { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app',
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } } } };
}

test('/opas/kohteet?n=50: 50 kohdetta erähaulla, kuvat vain tekijätiedoin, toinen haku R2:sta', async () => {
  const vanha = globalThis.fetch; globalThis.fetch = verkko; kutsut = { malli: 0, muut: 0 };
  try {
    const { env } = ymparisto();
    const hae = () => worker.fetch(new Request('https://pollo.example/opas/kohteet?n=50', { headers: { origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.9.9.9' } }), env, {});
    const v = await hae(); const d = await v.json();
    assert.equal(v.status, 200);
    assert.equal(d.kohteet.length, 50, 'missing-otsikot (joka 10.) pois, 54 kelpaavaa → 50');
    assert.ok(kutsut.muut <= 8, `alipyyntöjä ${kutsut.muut} (Cloudflaren raja 50)`);
    assert.ok(d.kohteet.every((k) => k.id && Number.isFinite(k.lat) && k.koukku));
    assert.ok(d.kohteet.every((k) => !k.kuva || (k.kuva.tekija && k.kuva.lisenssi)), 'kuva vain tekijätiedoin');
    assert.ok(d.kohteet.some((k) => k.kuva) && d.kohteet.some((k) => !k.kuva));
    assert.match(d.kohteet[0].alarivi, /kuvaus Q100/);
    const ennen = kutsut.malli; await hae();
    assert.equal(kutsut.malli, ennen, 'välimuistista');
  } finally { globalThis.fetch = vanha; }
});
