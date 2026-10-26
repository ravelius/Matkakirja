// NOMINATIM (tools/pollo/nominatim.js, omistaja 5.10.2026 "lisää Nominatim", juna 146): välimuisti, vuoro, UA,
// palvelin env:stä, geometria → reittipisteet (ketjutus, Douglas–Peucker ≤ 30, alueen keskilinja).
import test from 'node:test';
import assert from 'node:assert/strict';
import { nominatimHaku, geometriaPisteiksi, harvenna, NOMINATIM_OLETUS } from '../tools/pollo/nominatim.js';
import { paikanKorostus, paikanKoordinaatit } from '../tools/pollo/opas.js';

function muisti() {
  const kv = new Map();
  return { kv, POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
}

test('nominatimHaku: oma UA ilman sähköpostia, palvelin env:stä, pysyvä välimuisti, tyhjäkin välimuistiin', async () => {
  const kutsut = [];
  const haku = async (url, init) => {
    kutsut.push({ url, ua: init.headers['user-agent'] });
    const tyhja = url.includes('Tuntematon');
    return new Response(JSON.stringify(tyhja ? [] : [{ lat: '55.68', lon: '12.59', osm_type: 'way', osm_id: 1,
      geojson: { type: 'LineString', coordinates: [[12.58, 55.68], [12.59, 55.68]] } }]), { status: 200 });
  };
  const m = muisti();
  const env = { POLLO_KV: m.POLLO_KV, NOMINATIM_OSOITE: 'https://oma.nominatim.example/' };
  const a = await nominatimHaku(haku, env, 'Nyhavn, Kööpenhamina', { geometria: true });
  assert.deepEqual([a.lat, a.lon, a.osm, a.geometria.type], [55.68, 12.59, 'way1', 'LineString']);
  assert.match(kutsut[0].url, /^https:\/\/oma\.nominatim\.example\/search\?format=jsonv2&limit=1&accept-language=fi&q=Nyhavn.*&polygon_geojson=1/);
  assert.doesNotMatch(kutsut[0].ua, /@/, 'ei sähköpostia');
  assert.match(kutsut[0].ua, /Matkakirja/);
  await nominatimHaku(haku, env, 'nyhavn, kööpenhamina', { geometria: true });
  assert.equal(kutsut.length, 1, 'välimuistista (kirjainkoko ei vaikuta)');
  assert.equal(await nominatimHaku(haku, env, 'Tuntematon', {}), null);
  assert.equal(await nominatimHaku(haku, env, 'Tuntematon', {}), null);
  assert.equal(kutsut.length, 2, 'tyhjä tulos välimuistissa');
  assert.equal(NOMINATIM_OLETUS, 'https://nominatim.openstreetmap.org');
});

test('nominatimHaku: enintään 1 haku sekunnissa (isolaatin vuoro)', async () => {
  const ajat = [];
  const haku = async () => { ajat.push(Date.now()); return new Response('[]', { status: 200 }); };
  for (const q of ['a1', 'a2', 'a3']) await nominatimHaku(haku, {}, q);
  assert.ok(ajat[1] - ajat[0] >= 950 && ajat[2] - ajat[1] >= 950, `välit ${ajat[1] - ajat[0]} ja ${ajat[2] - ajat[1]} ms`);
});

test('geometria → reittipisteet: ketjutus, harvennus ≤ 30, alueen keskilinja', () => {
  // Kaksi osuutta väärin päin ja eri järjestyksessä → yksi viiva päästä päähän.
  const multi = { type: 'MultiLineString', coordinates: [[[12.59, 55.68], [12.58, 55.68]], [[12.57, 55.68], [12.58, 55.68]]] };
  const m = geometriaPisteiksi(multi);
  assert.equal(m.length, 2, 'suora harvenee päätepisteisiin');
  assert.deepEqual([m[0][1], m.at(-1)[1]].sort(), [12.57, 12.59]);
  // Kaareva viiva 200 pisteellä → ≤ 30 pistettä, päät säilyvät.
  const kaari = { type: 'LineString', coordinates: Array.from({ length: 200 }, (_, i) => [12.57 + i * 0.0001, 55.68 + Math.sin(i / 20) * 0.001]) };
  const k = geometriaPisteiksi(kaari);
  assert.ok(k.length > 3 && k.length <= 30, `pisteitä ${k.length}`);
  assert.deepEqual(k[0], [55.68, 12.57]);
  // Kanava-allas (suorakaide 400 m × 30 m) → keskilinja.
  const allas = { type: 'Polygon', coordinates: [[[12.58, 55.6800], [12.5864, 55.6800], [12.5864, 55.68027], [12.58, 55.68027], [12.58, 55.6800]]] };
  const a = geometriaPisteiksi(allas);
  assert.ok(a.length >= 2 && a.every((p) => Math.abs(p[0] - 55.680135) < 0.00006), 'keskilinja altaan keskellä');
  assert.equal(geometriaPisteiksi({ type: 'Point', coordinates: [12.5, 55.6] }), null, 'piste ei ole reitti');
  assert.equal(harvenna([[0, 0], [0, 0.00001], [0, 0.00002]], 5).length, 2);
});

test('korostus ja koordinaatit OSM:stä: kanavan muoto, varakoordinaatti ennen mallin arviota', async () => {
  const haku = async (url) => {
    if (url.includes('nominatim')) {
      if (url.includes('Christianshavns')) {
        return new Response(JSON.stringify([{ lat: '55.6724', lon: '12.5908', osm_type: 'relation', osm_id: 2,
          geojson: { type: 'LineString', coordinates: [[12.583, 55.6727], [12.590, 55.6725], [12.596, 55.6750], [12.599, 55.6776]] } }]));
      }
      if (url.includes('Pieni+tori') || url.includes('Pieni%20tori')) return new Response(JSON.stringify([{ lat: '55.676', lon: '12.57', osm_type: 'node', osm_id: 3 }]));
      return new Response('[]');
    }
    return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {} }));
  };
  const env = { ...muisti() };
  const kor = await paikanKorostus(haku, { lat: 55.6727, lon: 12.5918, koko_m: 900, luokka: 'kanava', nimi: 'Christianshavns Kanal' },
    { lat: 55.676, lon: 12.568 }, { env, kaupunki: 'Kööpenhamina' });
  assert.equal(kor.tyyppi, 'reitti');
  assert.equal(kor.pisteet.length, 4);
  const p = await paikanKoordinaatit(haku, { nimi: 'Pieni tori', lat: 55.7, lon: 12.6 }, { lat: 55.676, lon: 12.568 }, { env, kaupunki: 'Kööpenhamina' });
  assert.deepEqual([p.lat, p.lahde, p.id], [55.676, 'osm', 'osm:node3']);
});

test('worker: OSM-data vain krediitit:["osm"]-asiakkaille (ODbL; vanhat natiivit TF 143–145 ilman)', async () => {
  const { default: worker } = await import('../tools/pollo/worker.js');
  const kutsut = { nominatim: 0 };
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    const s = decodeURIComponent(String(u));
    if (s.includes('nominatim')) {
      kutsut.nominatim += 1;
      return new Response(JSON.stringify([{ lat: '55.6797', lon: '12.5906', osm_type: 'relation', osm_id: 9,
        geojson: { type: 'LineString', coordinates: [[12.5858, 55.6803], [12.5880, 55.6800], [12.5920, 55.6795], [12.5938, 55.6794]] } }]));
    }
    if (s.includes('api.anthropic.com')) {
      return new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: Nyhavn\nWIKIPEDIA: Nyhavn\nLUOKKA: kanava\nKOKO: 400\nTEKSTI: Nyhavn.\nVAIHTOEHTO: A?\nVAIHTOEHTO: B' }], stop_reason: 'end_turn' }));
    }
    if (s.includes('titles=Nyhavn')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Nyhavn', pageprops: { wikibase_item: 'Q943946' }, coordinates: [{ lat: 55.6797, lon: 12.5906 }] } } } }));
    if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
    return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
  };
  const kv = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
  const pyynto = (runko) => worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' },
    body: JSON.stringify({ kaupunki: 'Kööpenhamina', ...runko }) }), env, {}).then((v) => v.json());
  try {
    const vanhaAsiakas = await pyynto({});
    assert.equal(kutsut.nominatim, 0, 'ei Nominatimia ilman OSM-krediittiä');
    assert.notDeepEqual(vanhaAsiakas.korostus?.pisteet?.[0], [55.6803, 12.5858], 'vanha asiakas ei saa OSM-muotoa');
    const uusi = await pyynto({ krediitit: ['osm'] });
    assert.ok(kutsut.nominatim >= 1);
    assert.equal(uusi.korostus.tyyppi, 'reitti');
    assert.deepEqual(uusi.korostus.pisteet[0], [55.6803, 12.5858], 'OSM-muoto krediitin kanssa (päätepiste OSM:stä)');
  } finally {
    globalThis.fetch = vanha;
  }
});
