// OPPAAN LISÄKUVAT (omistaja 5.10.2026 klo 23.5x; muoto Natiivi-UI:n kanssa): enintään 6 kuvaa per pysähdys, paras ensin:
// pelin omat → Wikidatan P18 → kohteen Commons-luokka (P373); vain vapaat lisenssit, ei karttoja/logoja/svg:tä.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';

const tiedosto = (nimi, { lisenssi = 'CC BY-SA 4.0', leveys = 4000, korkeus = 3000, mime = 'image/jpeg' } = {}) => ({
  title: `File:${nimi}`, imageinfo: [{ thumburl: `https://upload/1280px-${nimi}`, descriptionurl: `https://commons/File:${nimi}`,
    width: leveys, height: korkeus, mime, extmetadata: { LicenseShortName: { value: lisenssi }, Artist: { value: `Kuvaaja ${nimi}` } } }],
});
const verkko = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) return new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: Nyhavn\nWIKIPEDIA: Nyhavn\nTEKSTI: Kanava.\nVAIHTOEHTO: A?\nVAIHTOEHTO: B' }], stop_reason: 'end_turn' }));
  if (s.includes('titles=Nyhavn') && s.includes('wikipedia')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Nyhavn', pageprops: { wikibase_item: 'Q943946' }, coordinates: [{ lat: 55.6797, lon: 12.5906 }] } } } }));
  if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
  if (s.includes('property=P18')) return new Response(JSON.stringify({ claims: { P18: [{ mainsnak: { datavalue: { value: 'Nyhavn paa.jpg' } } }] } }));
  if (s.includes('property=P373')) return new Response(JSON.stringify({ claims: { P373: [{ mainsnak: { datavalue: { value: 'Nyhavn' } } }] } }));
  if (s.includes('commons.wikimedia.org') && s.includes('gcmtitle=Category:Nyhavn')) {
    const t = [tiedosto('Nyhavn 1.jpg'), tiedosto('Nyhavn map.png'), tiedosto('Nyhavn 2.jpg', { lisenssi: 'CC BY-NC 2.0' }),
      tiedosto('Nyhavn logo.svg', { mime: 'image/svg+xml' }), tiedosto('Nyhavn pysty.jpg', { leveys: 2000, korkeus: 3000 }),
      tiedosto('Nyhavn pieni.jpg', { leveys: 640, korkeus: 480 }), tiedosto('Nyhavn 3.jpg'), tiedosto('Nyhavn 4.jpg', { lisenssi: 'Public domain' }),
      tiedosto('Nyhavn 5.jpg', { lisenssi: 'CC0' }), tiedosto('Nyhavn 6.jpg'), tiedosto('Nyhavn paa.jpg')];
    return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.map((x, i) => [i + 10, { ...x, index: i + 1 }])) } }));
  }
  if (s.includes('commons.wikimedia.org') && s.includes('titles=File:Nyhavn paa.jpg')) return new Response(JSON.stringify({ query: { pages: { 1: tiedosto('Nyhavn paa.jpg') } } }));
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};

test('lisäkuvat: P18 ensin, sitten Commons-luokka, enintään 6, vain vapaat jpg/png vaakakuvat ensin, ei karttoja/logoja/pieniä/NC', async () => {
  const kv = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', toive: 'Nyhavn' }) }), env, {});
    const d = await v.json();
    const nimet = d.kuvat.map((k) => k.lahde.replace('https://commons/File:', ''));
    assert.equal(d.kuvat.length, 7, `kuvia ${d.kuvat.length}: ${nimet}`);   // P18 + 6 kelvollista luokasta (yläraja 8)
    assert.equal(nimet[0], 'Nyhavn paa.jpg', 'P18 ensin (vanhat asiakkaat näyttävät tämän)');
    for (const huono of ['Nyhavn map.png', 'Nyhavn 2.jpg', 'Nyhavn logo.svg', 'Nyhavn pieni.jpg']) assert.ok(!nimet.includes(huono), huono);
    assert.equal(new Set(nimet).size, nimet.length, 'ei kaksoiskappaleita');
    assert.ok(!nimet.slice(0, 5).includes('Nyhavn pysty.jpg') || nimet.indexOf('Nyhavn pysty.jpg') > nimet.indexOf('Nyhavn 3.jpg'), 'vaakakuvat ensin');
    assert.ok(d.kuvat.every((k) => k.tekija && k.lisenssi && k.url.startsWith('https://upload/1280px-')));
  } finally { globalThis.fetch = vanha; }
});

test('tekijärivi luettavaksi', async () => {
  const { siistiTekija } = await import('../tools/pollo/opas.js');
  assert.equal(siistiTekija('No machine-readable author provided. Thue assumed (based on copyright claims).'), 'Thue');
  assert.equal(siistiTekija('No machine-readable author provided. Bjoerna~commonswiki assumed (based on copyright claims).'), 'Bjoerna');
  assert.equal(siistiTekija('<a href="x">Julian Herzog</a> ( Website )'), 'Julian Herzog');
});
