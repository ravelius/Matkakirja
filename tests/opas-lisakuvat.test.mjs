// OPPAAN KUVAT: 6.10.2026 20.0x alkaen vain oppaan kuvalistasta (opas-kuvat.js). yhdistaKuvat ja siistiTekija ovat yhä
// käytössä kuvalistan koonnissa ja vanhoissa poluissa.
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

// KUVAT VAIN KUVALISTASTA (omistaja 6.10.2026 20.0x): pysähdyksen kuvat tulevat oppaan kuvalistasta Q:lla (1–5, järjestys),
// ei Wikidatan P18:aa eikä Commons-luokkaa lennossa. Ei osumaa → kuvat [].
const LISTA = { kohteet: { Q943946: { nimi: 'Nyhavn', kaupunki: 'koopenhamina', lat: 55.6797, lon: 12.5906, kuvat: [
  { url: 'https://media.matkakirja.app/kuvat/nyhavn-2.jpg', tyyppi: 'valokuva', tekija: 'B', lisenssi: 'CC BY 4.0', lahdeUrl: 'https://commons/File:2', jarjestys: 2 },
  { url: 'https://media.matkakirja.app/kuvat/nyhavn-1.jpg', tyyppi: 'valokuva', tekija: 'A', lisenssi: 'CC BY-SA 4.0', lahdeUrl: 'https://commons/File:1', jarjestys: 1 },
] } }, kaupungit: {}, aliakset: {} };
test('kuvat vain kuvalistasta Q:lla järjestyksessä; ei P18- eikä Commons-hakua lennossa', async () => {
  const kv = new Map(); const kutsut = [];
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, OPAS_KUVALISTA_TESTI: LISTA,
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
  const vanha = globalThis.fetch; globalThis.fetch = (u, init) => { kutsut.push(decodeURIComponent(String(u))); return verkko(u, init); };
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', toive: 'Nyhavn' }) }), env, { waitUntil() {} });
    const d = await v.json();
    assert.deepEqual(d.kuvat.map((k) => k.url), ['https://media.matkakirja.app/kuvat/nyhavn-1.jpg', 'https://media.matkakirja.app/kuvat/nyhavn-2.jpg']);
    assert.equal(d.kuvat[0].lahde, 'https://commons/File:1', 'lahde vanhoille natiiveille');
    assert.ok(!kutsut.some((s) => s.includes('property=P18') || s.includes('property=P373') || s.includes('commons.wikimedia.org')),
      'ei kuvahakua lennossa');
    const ilman = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', toive: 'Nyhavn' }) }), { ...env, OPAS_KUVALISTA_TESTI: { kohteet: {}, kaupungit: {} } }, { waitUntil() {} })).json();
    assert.deepEqual(ilman.kuvat, [], 'ei listalla → ei kuvia');
  } finally { globalThis.fetch = vanha; }
});

test('tekijärivi luettavaksi', async () => {
  const { siistiTekija } = await import('../tools/pollo/opas.js');
  assert.equal(siistiTekija('No machine-readable author provided. Thue assumed (based on copyright claims).'), 'Thue');
  assert.equal(siistiTekija('No machine-readable author provided. Bjoerna~commonswiki assumed (based on copyright claims).'), 'Bjoerna');
  assert.equal(siistiTekija('<a href="x">Julian Herzog</a> ( Website )'), 'Julian Herzog');
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
