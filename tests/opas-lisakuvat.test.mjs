// OPPAAN LISÄKUVAT (omistaja 5.10.2026 klo 23.5x; muoto Natiivi-UI:n kanssa): enintään 6 kuvaa per pysähdys, paras ensin:
// pelin omat → Wikidatan P18 → kohteen Commons-luokka (P373); vain vapaat lisenssit, ei karttoja/logoja/svg:tä.
import test, { beforeEach } from 'node:test';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';

// Reunamuisti (reuna.js) on isolaatin muistia: jokainen testi alkaa kylmänä kuten ennen KV-mallilla (6.10.).
beforeEach(() => tyhjennaReunamuisti());

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

test('aikaraja: hidas Commons ei hidasta vastausta; haku valmistuu taustalla välimuistiin, seuraava saa kuvat', async () => {
  const kv = new Map();
  const odotukset = [];
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
  const hidas = async (u, init) => {
    if (String(u).includes('commons.wikimedia.org')) await new Promise((r) => setTimeout(r, 1500));
    return verkko(u, init);
  };
  const vanha = globalThis.fetch; globalThis.fetch = hidas;
  try {
    const pyynto = () => worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', toive: 'Nyhavn' }) }), env, { waitUntil: (p) => odotukset.push(p) });
    const t0 = Date.now();
    const eka = await (await pyynto()).json();
    assert.ok(Date.now() - t0 < 3500, `vastaus odotti vain P18:n kuten ennen (${Date.now() - t0} ms)`);
    assert.equal(eka.kuvat.length, 1, 'ei ehtinyt → P18 kuten ennen (ei jää ilman kuvaa)');
    await Promise.all(odotukset);
    const toka = await (await pyynto()).json();
    assert.equal(toka.kuvat.length, 7, 'välimuistista');
  } finally { globalThis.fetch = vanha; }
});

// TEKIJÄTIETO PAKOLLINEN (Linssiseppä 6.10.: natiivi näki Canal Granden kuvat ilman tekijää/lisenssiä; CC BY vaatii
// tekijän). Lisäkuva kelpaa vain, jos sillä on lisenssi ja lähde sekä tekijä (PD/CC0 ilman tekijääkin). Vika ensin.
test('yhdistaKuvat: lisäkuva ilman tekijää tai lisenssiä pudotetaan (CC BY vaatii tekijän); PD ilman tekijää kelpaa', async () => {
  const { yhdistaKuvat } = await import('../tools/pollo/opas.js');
  const lahde = (n) => `https://commons.wikimedia.org/wiki/File:${n}.jpg`;
  const tulos = yhdistaKuvat([], [
    { url: 'a', tyyppi: 'valokuva', tekija: 'Iain Cameron', lisenssi: 'CC BY 2.0', lahde: lahde('a') },
    { url: 'b', tyyppi: 'valokuva', tekija: null, lisenssi: 'CC BY-SA 4.0', lahde: lahde('b') },
    { url: 'c', tyyppi: 'valokuva', tekija: 'X', lisenssi: null, lahde: lahde('c') },
    { url: 'd', tyyppi: 'valokuva', tekija: null, lisenssi: 'PD', lahde: lahde('d') },
    { url: 'e', tyyppi: 'valokuva', tekija: 'Y', lisenssi: 'CC0', lahde: null },
  ]);
  assert.deepEqual(tulos.map((k) => k.url), ['a', 'd'], 'toisto: tekijätön CC-kuva tai lisenssitön kuva meni läpi');
});

test('yhdistaKuvat: pelin omat valokuvat ilman tekijää pois, havainnekuvan lähderivi HAVAINNEKUVA (kylmä ja lämmin polku)', async () => {
  const { yhdistaKuvat } = await import('../tools/pollo/opas.js');
  const omat = [
    { url: 'o1', tyyppi: 'valokuva', tekija: null, lisenssi: 'CC BY-SA 4.0', lahde: null },
    { url: 'o2', tyyppi: 'havainnekuva', tekija: null, lisenssi: null, lahde: null },
    { url: 'o3', tyyppi: 'valokuva', tekija: 'Didier Descouens', lisenssi: 'CC BY-SA 4.0', lahde: null },
  ];
  for (const lisat of [[], null]) {   // kylmä: lisäkuvat eivät ehtineet; lämmin: tyhjä lista
    const tulos = yhdistaKuvat(omat, lisat);
    assert.deepEqual(tulos.map((k) => k.url), ['o2', 'o3'], 'toisto: tekijätön oma valokuva näytettiin');
    assert.equal(tulos[0].lisenssi, 'HAVAINNEKUVA');
    assert.ok(tulos.every((k) => k.lisenssi && (k.tekija || k.lisenssi === 'HAVAINNEKUVA')));
  }
});

// TYHJÄ KUVAMUISTI (6.10. 21.1x, tuotanto: Sensō-ji Q615183 "[]" vuorokaudeksi R2:ssa, pysähdys ilman kuvaa): Wikidatan
// virhe ei tallennu tyhjänä listana, ja vanha tyhjä merkintä ei estä P18-varakuvaa.
test('lisäkuvat: haun virhe ei tallennu tyhjänä; tyhjä välimuisti → P18-varakuva', async () => {
  const { lisaKuvatValimuistilla, HAKU_UUSINTA_MS } = await import('../tools/pollo/opas.js');
  HAKU_UUSINTA_MS.oletus = 0;
  const r2 = new Map();
  const R2 = { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } };
  const k = await lisaKuvatValimuistilla(async () => new Response('', { status: 429 }), null, 'Q943946', R2);
  assert.deepEqual(k, []);
  assert.equal(r2.size, 0, 'virhettä ei välimuistiin');
  // Vanha tyhjä merkintä (ennen korjausta tallentunut) → worker odottaa P18:n.
  await R2.put(`tila/${encodeURIComponent('opas:kuvat:v1:Q943946')}.json`, JSON.stringify({ a: '[]', v: Date.now() + 86400000 }));
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, PUHE_R2: R2 };
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', toive: 'Nyhavn' }) }), env, { waitUntil() {} })).json();
    assert.equal(d.kuvat.length, 1, 'P18-varakuva tyhjän välimuistin ohi');
  } finally { globalThis.fetch = vanha; }
});
