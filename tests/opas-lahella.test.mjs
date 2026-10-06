// "MIKÄ TÄMÄ ON?" (omistaja 6.10.2026): GET /opas/lahella → tunnetut kohteet säteeltä etäisyysjärjestyksessä, tyyppisuodatus,
// laajennus 400 m:iin, Jerusalem neutraalisti, välimuisti ruuduittain. Ei ElevenLabs-kutsuja.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

beforeEach(() => tyhjennaReunamuisti());
const M = 1 / 111320;   // noin metri leveysasteina
let kutsut = 0;
function verkko(keskus, kohteet) {
  return async (u) => {
    const s = decodeURIComponent(String(u)); kutsut += 1;
    if (s.includes('elevenlabs')) throw new Error('ElevenLabs-kutsu testissä');
    if (s.includes('generator=geosearch')) {
      const fi = s.includes('fi.wikipedia');
      return new Response(JSON.stringify({ query: { pages: Object.fromEntries(kohteet.filter((k) => fi ? k.fi : !k.fi).map((k, i) => [String(i), {
        title: k.otsikko, coordinates: [{ lat: keskus.lat + k.m * M, lon: keskus.lon }], description: k.kuvaus,
        pageprops: { wikibase_item: k.q, ...(k.kuva ? { page_image_free: k.kuva } : {}) } }])) } }));
    }
    if (s.includes('wbgetentities')) {
      const ids = /ids=([^&]+)/.exec(s)[1].split('|');
      return new Response(JSON.stringify({ entities: Object.fromEntries(ids.map((q) => { const k = kohteet.find((x) => x.q === q);
        return [q, { claims: { P31: [{ mainsnak: { datavalue: { value: { id: k.tyyppi ?? 'Q41176' } } } }], ...(k.tapahtuma ? { P585: [{}] } : {}) },
          labels: k.fiNimi ? { fi: { value: k.fiNimi } } : {}, descriptions: k.kuvaus ? { fi: { value: k.kuvaus } } : {} }]; })) }));
    }
    if (s.includes('commons.wikimedia.org')) {
      const t = /titles=([^&]+)/.exec(s)[1].split('|');
      return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.map((x, i) => [String(i), { title: x, imageinfo: [{ thumburl: `https://u/${x}`,
        descriptionurl: `https://c/${x}`, mime: 'image/jpeg', width: 2000, height: 1000,
        extmetadata: { LicenseShortName: { value: 'CC BY-SA 4.0' }, Artist: { value: 'Kuvaaja' } } }] }])) } }));
    }
    return new Response('{}');
  };
}
function ymparisto() {
  const r2 = new Map();
  return { env: { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app',
    OPAS_KUVALISTA_TESTI: { kohteet: { Q1: { nimi: 'Helsingin tuomiokirkko', kuvat: [{ url: 'https://media.matkakirja.app/kuvat/x.jpg', tyyppi: 'valokuva', tekija: 'Kuvaaja', lisenssi: 'CC BY-SA 4.0', lahdeUrl: 'https://commons/File:X.jpg', jarjestys: 1 }] } }, kaupungit: {} },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } } } };
}
const hae = (env, q) => worker.fetch(new Request(`https://pollo.example/opas/lahella?${q}`, { headers: { origin: 'https://matkakirja.app' } }), env, {});

test('/opas/lahella: säde 150 m, etäisyysjärjestys, tyyppisuodatus, kuva tekijätiedoin, toinen haku välimuistista', async () => {
  const keskus = { lat: 60.17, lon: 24.952 };
  const kohteet = [
    { q: 'Q1', otsikko: 'Helsingin tuomiokirkko', fi: true, m: 14, kuvaus: 'tuomiokirkko Helsingissä', kuva: 'Tuomiokirkko.jpg' },
    { q: 'Q2', otsikko: 'Senaatintori', fi: true, m: 108, tyyppi: 'Q174782' },
    { q: 'Q3', otsikko: 'Tuomaan Markkinat', fi: true, m: 20, tapahtuma: true },
    { q: 'Q4', otsikko: 'Aleksanterinkatu (Helsinki)', fi: true, m: 30, tyyppi: 'Q79007' },
    { q: 'Q5', otsikko: 'Some Building', fi: false, m: 60, fiNimi: 'Eräs rakennus' },
    { q: 'Q6', otsikko: 'Kaukainen talo', fi: true, m: 300 },
  ];
  const vanha = globalThis.fetch; globalThis.fetch = verkko(keskus, kohteet); kutsut = 0;
  try {
    const { env } = ymparisto();
    const v = await hae(env, `lat=${keskus.lat}&lon=${keskus.lon}`); const d = await v.json();
    assert.equal(v.status, 200);
    assert.equal(d.r, 150); assert.equal(d.laajennettu, false);
    assert.deepEqual(d.kohteet.map((k) => k.nimi), ['Helsingin tuomiokirkko', 'Eräs rakennus', 'Senaatintori'], 'tapahtuma ja katu pois, 300 m pois');
    assert.ok(d.kohteet[0].etaisyys_m >= 13 && d.kohteet[0].etaisyys_m <= 15);
    assert.equal(d.kohteet[0].kuva.tekija, 'Kuvaaja');
    assert.equal(d.kohteet[0].alarivi, 'tuomiokirkko Helsingissä');
    assert.ok(kutsut <= 6, `alipyyntöjä ${kutsut}`);
    const ennen = kutsut; await hae(env, `lat=${keskus.lat + 20 * M}&lon=${keskus.lon}`);
    assert.equal(kutsut, ennen, 'sama ruutu välimuistista');
  } finally { globalThis.fetch = vanha; }
});

test('/opas/lahella: tyhjästä 400 m:iin, enintään 8, Jerusalem neutraalisti, virheellinen sijainti 400', async () => {
  const keskus = { lat: 31.778, lon: 35.236 };
  const kohteet = Array.from({ length: 12 }, (_, i) => ({ q: `Q${i + 10}`, otsikko: `Kohde ${i}`, fi: true, m: 200 + i * 10,
    kuvaus: i === 0 ? 'pyhäkkö Jerusalemissa, Israelissa' : 'rakennus' }));
  const vanha = globalThis.fetch; globalThis.fetch = verkko(keskus, kohteet);
  try {
    const { env } = ymparisto();
    const d = await (await hae(env, `lat=${keskus.lat}&lon=${keskus.lon}&r=100`)).json();
    assert.equal(d.laajennettu, true); assert.equal(d.r, 400);
    assert.equal(d.kohteet.length, 8);
    assert.equal(d.kohteet[0].alarivi, null, 'Jerusalemissa ei maan nimeä');
    assert.equal((await hae(env, 'lat=abc&lon=1')).status, 400);
  } finally { globalThis.fetch = vanha; }
});
