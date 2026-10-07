// ESIGENEROITU ESITTELY (omistaja 7.10.2026): lukitun kaupungin kierros ja listan kohteet valmiista tekstistä ilman
// mallikutsua; kohde ilman valmista tekstiä ja vapaat toiveet live-mallilla.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { tyhjennaKuvalista } from '../tools/pollo/opas-kuvat.js';
import { oppaanEsittely, kaupunkiId, tyhjennaEsittelyt, valmisKohde } from '../tools/pollo/opas-esittely.js';

beforeEach(() => { tyhjennaReunamuisti(); tyhjennaKuvalista(); tyhjennaEsittelyt(); });
const kuva = (n) => ({ url: `https://media.matkakirja.app/kuvat/${n}.jpg`, tyyppi: 'valokuva', tekija: 'T', lisenssi: 'CC BY 4.0', lahdeUrl: `https://c/${n}`, jarjestys: 1 });
const KOHTEET = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`Q${100 + i}`,
  { nimi: `Kohde ${i}`, kaupunki: 'testila', lat: 60 + i / 1000, lon: 25, kuvat: [kuva(`k${i}`)] }]));
const LISTA = { kohteet: KOHTEET, kaupungit: { testila: { nimi: 'Testilä', lat: 60, lon: 25, kohteet: Object.keys(KOHTEET), kuvat: [] } } };
const ESITTELY = { kaupunki: 'Testilä', id: 'testila', versio: 1, kohteet: Array.from({ length: 9 }, (_, i) => ({
  id: `Q${100 + i}`, nimi: `Kohde ${i}`, kuvaus: `Kuvaus ${i}`, luokka: 'rakennus', koko_m: 120 + i,
  teksti: `Kohde ${i} on valmis pitkä kerronta.`, lyhyt: i < 8 ? `Kohde ${i} lyhyesti.` : null, syventava: `Miksi ${i}?`, isoisa: false, lahteet: [] })) };
const H = { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' };
function ymparisto() {
  const r2 = new Map(), kv = new Map();
  return { POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } }, ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, OPAS_KUVALISTA_TESTI: LISTA,
    OPAS_ESITTELY_TESTI: { testila: ESITTELY },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); }, delete: async (k) => { r2.delete(k); } } };
}
async function opas(env, runko, malliVastaus = 'NIMI: Kohde 9\nTEKSTI: Live-kerronta.\nVAIHTOEHTO: A\nVAIHTOEHTO: B') {
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('anthropic')) { if (JSON.stringify(JSON.parse(init.body).system).includes('Matkakirja-pelin kertoja')) malli += 1; return new Response(JSON.stringify({ content: [{ type: 'text', text: malliVastaus }], stop_reason: 'end_turn' })); }
    return new Response(JSON.stringify({ query: { pages: {} }, claims: {}, entities: {} }));
  };
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti: { lat: 60, lon: 25 }, ...runko }) }), env, { waitUntil() {} })).json();
    return { d, malli };
  } finally { globalThis.fetch = vanha; }
}

test('kierros valmiista tekstistä ilman mallikutsua; toinen pysähdys myös', async () => {
  const env = ymparisto();
  const { d, malli } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'e1' });
  assert.equal(malli, 0);
  assert.equal(d.valmis, true); assert.equal(d.id, 'Q100'); assert.equal(d.teksti, 'Kohde 0 on valmis pitkä kerronta.');
  assert.equal(d.alarivi, 'Kuvaus 0'); assert.equal(d.koko_m, 120); assert.equal(d.luokka, 'rakennus');
  assert.equal(d.vaihtoehdot[0], 'Miksi 0?'); assert.equal(d.vaihtoehdot.length, 2);
  assert.deepEqual(d.kierros, { numero: 1, maara: 8 }); assert.equal(d.kuvat.length, 1);
  const toka = await opas(env, { kaydyt: ['Q100'], istunto: 'e1' });
  assert.equal(toka.malli, 0); assert.equal(toka.d.id, 'Q101'); assert.equal(toka.d.valmis, true);
});

test('Kaupunkikierros-jono (lyhyt, toive = kohteen nimi) → lyhyt valmis teksti', async () => {
  const { d, malli } = await opas(ymparisto(), { toive: 'Kohde 3', lyhyt: true, istunto: 'e2' });
  assert.equal(malli, 0); assert.equal(d.id, 'Q103'); assert.equal(d.teksti, 'Kohde 3 lyhyesti.');
  const pitka = await opas(ymparisto(), { toive: 'Kohde 8', lyhyt: true, istunto: 'e3' });
  assert.equal(pitka.d.teksti, 'Kohde 8 on valmis pitkä kerronta.', 'ei lyhyttä → pitkä');
});

test('kohde ilman valmista tekstiä ja vapaa toive → live-malli', async () => {
  const a = await opas(ymparisto(), { toive: 'Kohde 9', istunto: 'e4' });
  assert.equal(a.malli, 1); assert.equal(a.d.valmis, undefined); assert.equal(a.d.teksti, 'Live-kerronta.');
  const b = await opas(ymparisto(), { toive: 'Missä voisi syödä?', istunto: 'e5' });
  assert.equal(b.malli, 1);
});

test('oppaanEsittely: vain listatut id:t, haku kerran, virhe → null', async () => {
  assert.equal(kaupunkiId('Kööpenhamina'), 'koopenhamina'); assert.equal(kaupunkiId('Malá Strana'), 'mala-strana');
  let n = 0;
  const haku = async () => { n += 1; return new Response(JSON.stringify(ESITTELY)); };
  assert.equal(await oppaanEsittely({}, 'Testilä', haku), null, 'ei aineistoindeksissä → ei hakua');
  assert.equal(n, 0);
  assert.equal(valmisKohde(ESITTELY, 'Q102').lyhyt, 'Kohde 2 lyhyesti.');
  assert.equal(valmisKohde(ESITTELY, 'Q999'), null);
});

test('puhe_teksti: näytölle kirjoitusasu, äänen tunniste ääntämisversiosta', async () => {
  const { createHash } = await import('node:crypto');
  const env = ymparisto();
  const kohde = { ...ESITTELY.kohteet[0], teksti: 'Kohde 0 eli Pont Alexandre III on silta.', puhe_teksti: 'Kohde 0 eli Pont Alexandre Trois on silta.' };
  env.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, kohteet: [kohde, ...ESITTELY.kohteet.slice(1)] } };
  const sha = createHash('sha256').update(`william|eleven_v4_turbo|${kohde.puhe_teksti}`).digest('hex').slice(0, 32);
  const vanhaGet = env.PUHE_R2.get;
  env.PUHE_R2.get = async (k) => (k === `opas/${sha}.mp3` ? { body: new Uint8Array(4), text: async () => '' } : vanhaGet(k));
  const { d } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'e6' });
  assert.equal(d.teksti, kohde.teksti);
  assert.ok(String(d.aani).includes(sha), `ääni ${d.aani}`);
});

test('omat kohteet (Giza): vain kokeilu-otsakkeella; Liiku kierros LS1:n järjestyksessä', async () => {
  const { omatKohteet } = await import('../tools/pollo/opas-esittely.js');
  const { sallittuKaupunki, sallitutPyynnolle } = await import('../tools/pollo/sallitut.js');
  const kok = { OPAS_KOKEILU: ['giza'], OPAS_SALLITUT_ESTO: '1' };
  assert.equal(omatKohteet('Gizan pyramidit'), null, 'TF-appit eivät näe Gizaa');
  assert.equal(sallittuKaupunki('Gizan pyramidit', { OPAS_SALLITUT_ESTO: '1' }), null);
  assert.ok(!sallitutPyynnolle({}).some((x) => x.id === 'giza'));
  assert.deepEqual(omatKohteet('Gizan pyramidit', kok).kierros, ['Q130958', 'Q208358', 'Q238623', 'Q37200']);
  assert.equal(sallittuKaupunki('Gizan pyramidit', kok)?.id, 'giza');
  assert.ok(sallitutPyynnolle(kok).some((x) => x.id === 'giza'));
  const vanha = globalThis.fetch; globalThis.fetch = async () => new Response('{}');
  try {
    const e = { ...ymparisto(), OPAS_ESITTELY_TESTI: undefined, OPAS_SALLITUT_ESTO: '1' };
    const ilman = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Gizan%20pyramidit', { headers: H }), e, {});
    assert.equal(ilman.status, 403, 'ilman otsaketta ei-sallittu');
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Gizan%20pyramidit',
      { headers: { ...H, 'x-matkakirja-kokeilu': 'giza' } }), e, {})).json();
    assert.deepEqual(d.kierros, ['Q130958', 'Q208358', 'Q238623', 'Q37200']);
    assert.deepEqual(d.kohteet.map((k) => k.nimi), ['Gizan suuri sfinksi', 'Khefrenin pyramidi', 'Mykerinoksen pyramidi', 'Kheopsin pyramidi']);
    const a = await (await worker.fetch(new Request('https://pollo.example/opas/aineistot', { headers: { origin: 'https://matkakirja.app', 'x-matkakirja-kokeilu': 'giza' } }),
      { POLLO_ORIGINIT: 'https://matkakirja.app' }, {})).json();
    assert.ok(a.sallitut.some((x) => x.id === 'giza'));
  } finally { globalThis.fetch = vanha; }
});

test('Giza kokeilu-otsakkeella: kierros alkaa Sfinksin valmiista kerronnasta ilman mallikutsua', async () => {
  const { OPAS_OMAT } = await import('../tools/pollo/opas-omat.js');
  const e = { ...ymparisto(), OPAS_ESITTELY_TESTI: undefined, OPAS_SALLITUT_ESTO: '1' };
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('anthropic') && JSON.stringify(JSON.parse(init.body).system).includes('Matkakirja-pelin kertoja')) malli += 1;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: X\nTEKSTI: x' }], query: { pages: {} }, claims: {}, entities: {} }));
  };
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: { ...H, 'x-matkakirja-kokeilu': 'giza' },
      body: JSON.stringify({ kaupunki: 'Gizan pyramidit', sijainti: { lat: 29.9765, lon: 31.1313 }, toive: 'Esittele kaupunki', istunto: 'g1' }) }), e, { waitUntil() {} })).json();
    assert.equal(malli, 0); assert.equal(d.valmis, true); assert.equal(d.id, 'Q130958');
    assert.equal(d.teksti, OPAS_OMAT.giza.kohteet[0].teksti); assert.deepEqual(d.kierros, { numero: 1, maara: 4 });
    const ilman = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Gizan pyramidit', toive: 'Esittele kaupunki', istunto: 'g2' }) }), e, { waitUntil() {} });
    assert.equal(ilman.status, 403);
  } finally { globalThis.fetch = vanha; }
});

test('/opas/kysymykset: valmiin esittelyn kohde → 5 valmista kysymystä ja Kerro lisää litteinä kenttinä', async () => {
  const e = ymparisto();
  const k0 = { ...ESITTELY.kohteet[0], kysymykset: ['Kuka tämän rakensi?', 'Miksi se on täällä?', 'Mitä sisällä on?', 'Kuka täällä asui?', 'Mitä tänään tapahtuu?'] };
  e.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, kohteet: [k0, ...ESITTELY.kohteet.slice(1)] } };
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u) => { if (String(u).includes('anthropic')) malli += 1;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'Mikä tämä on?\nKuka teki?\nMiksi?\nMilloin?\nMissä?\nMitä?' }], stop_reason: 'end_turn' })); };
  try {
    const hae = (q) => worker.fetch(new Request(`https://pollo.example/opas/kysymykset?paikka=${q}&nimi=Kohde&kaupunki=Testil%C3%A4`, { headers: H }), e, { waitUntil() {} }).then((v) => v.json());
    const d = await hae('Q100');
    assert.deepEqual(d.kysymykset, k0.kysymykset); assert.equal(malli, 0, 'valmiit kysymykset ilman mallia');
    assert.equal(d.kerro_lisaa_teksti, k0.teksti); assert.ok(!('kerro_lisaa_kesto_s' in d), 'ilman ääntä ei kestoa (LS1: lukukesto)');
    assert.equal(d.kerro_lisaa, undefined, 'ei alikenttää (#4107: vanhat natiivit)');
    assert.equal(d.kerro_lisaa_aani ?? null, null, 'ei esigeneroitua ääntä → ei kenttää');
    const ilman = await hae('Q999');
    assert.equal(ilman.kerro_lisaa_teksti, undefined); assert.ok(ilman.kysymykset.length > 0);
  } finally { globalThis.fetch = vanha; }
});

test('Kerro lisää: ei maksullista generointia – ääni vain R2:sta, muuten null; tekstiä ei tallenneta', async () => {
  const { createHash } = await import('node:crypto');
  const e = ymparisto(); const kirjoitukset = [];
  const vanhaPut = e.PUHE_R2.put; e.PUHE_R2.put = async (k, v) => { kirjoitukset.push(k); return vanhaPut(k, v); };
  e.ELEVEN_API_KEY = 'e';
  let eleven = 0;
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u) => { if (String(u).includes('elevenlabs')) eleven += 1;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'A?\nB?\nC?\nD?\nE?\nF?' }], stop_reason: 'end_turn' })); };
  try {
    const hae = () => worker.fetch(new Request('https://pollo.example/opas/kysymykset?paikka=Q101&nimi=Kohde&kaupunki=Testil%C3%A4', { headers: H }), e, { waitUntil() {} }).then((v) => v.json());
    const a = await hae();
    assert.equal(a.kerro_lisaa_aani ?? null, null); assert.equal(a.kerro_lisaa_aani_pcm ?? null, null);
    assert.ok(!kirjoitukset.some((k) => k.startsWith('opas/teksti/')), 'tekstiä ei tallenneta → GET ei voi generoida');
    const sha = createHash('sha256').update(`william|eleven_v4_turbo|${ESITTELY.kohteet[1].teksti}`).digest('hex').slice(0, 32);
    await vanhaPut(`opas/${sha}.mp3`, 'mp3');
    const b = await hae();
    assert.ok(String(b.kerro_lisaa_aani).endsWith(`/opas/aani/${sha}.mp3`)); assert.equal(b.kerro_lisaa_aani_pcm, null);
    const g = await worker.fetch(new Request(`https://pollo.example/opas/aani/${'f'.repeat(32)}.mp3`), e, { waitUntil() {} });
    assert.equal(g.status, 404, 'tuntematon sha ei generoi');
    assert.equal(eleven, 0, 'ElevenLabsia ei kutsuttu');
  } finally { globalThis.fetch = vanha; }
});

test('esittely-indeksi: pilotti pariisi, praha, wien (vienti 7.10.)', async () => {
  const { OPAS_AINEISTOT } = await import('../tools/pollo/aineistot.js');
  assert.deepEqual(OPAS_AINEISTOT.esittely.slice(0, 6), ['pariisi', 'praha', 'wien', 'rooma', 'lontoo', 'koopenhamina']);
  // Äänettömät 31 (omistaja 7.10. 18.2x): kaikki sallitut kaupungit, jokaisella oma polku esittely-aaneton-v1:ssä.
  const { OPAS_SALLITUT } = await import('../tools/pollo/sallitut.js');
  assert.deepEqual([...OPAS_AINEISTOT.esittely].sort(), OPAS_SALLITUT.sallitut.map((x) => x.id).sort());
  for (const id of OPAS_AINEISTOT.esittely.slice(6)) assert.equal(OPAS_AINEISTOT.esittely_polut[id], `opas/esittely-aaneton-v1/${id}.json`);
});

test('avauksen lupaama alku: kierros alkaa esittelyn kierros[0]:sta, ei kameraa lähimmästä (Rooma: Forum, ei Trevi)', async () => {
  const env = ymparisto();
  env.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, avaus: { teksti: 'Kierros alkaa Kohteesta 5.' }, kierros: ['Q105'] } };
  const { d, malli } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'a1' });
  assert.equal(malli, 0); assert.equal(d.id, 'Q105'); assert.deepEqual(d.kierros, { numero: 1, maara: 8 });
  const ilman = ymparisto();
  ilman.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, kierros: ['Q105'] } };
  assert.equal((await opas(ilman, { toive: 'Esittele kaupunki', istunto: 'a2' })).d.id, 'Q100', 'ilman avausta lähin kuten ennen');
});

test('Liiku-kierros alkaa avauksen lupaamasta kohteesta (LS1 lukee kierroksen /opas/liiku-vastauksesta)', async () => {
  const vanha = globalThis.fetch; globalThis.fetch = async () => new Response('{}');
  try {
    const e = ymparisto();
    e.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, avaus: { teksti: 'Kierros alkaa Kohteesta 5.' }, kierros: ['Q105'] } };
    const hae = async (env) => (await (await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Testil%C3%A4&lat=60&lon=25',
      { headers: H }), env, { waitUntil() {} })).json()).kierros;
    assert.equal((await hae(e))[0], 'Q105');
    assert.equal((await hae(ymparisto()))[0], 'Q100', 'ilman avausta lähin kuten ennen');
  } finally { globalThis.fetch = vanha; }
});

test('esittely_polut: Praha ja Wien poikkeavasta polusta (avaus + kierros), muut esittely-v1', async () => {
  const urlit = [];
  const haku = async (u) => { urlit.push(String(u)); return new Response(JSON.stringify(ESITTELY)); };
  await oppaanEsittely({}, 'Praha', haku); await oppaanEsittely({}, 'Rooma', haku);
  assert.deepEqual(urlit, ['https://media.matkakirja.app/opas/esittely-v1b/praha.json', 'https://media.matkakirja.app/opas/esittely-v1/rooma.json']);
});

test('sana-ajat (LS1 7.10.): aani_ajat vain kun R2:ssa on <sha>.ajat.json; GET palauttaa R2:sta, puuttuva 404', async () => {
  const { createHash } = await import('node:crypto');
  const sha = createHash('sha256').update(`william|eleven_v4_turbo|${ESITTELY.kohteet[0].teksti}`).digest('hex').slice(0, 32);
  const ajat = JSON.stringify({ versio: 1, teksti: ESITTELY.kohteet[0].teksti, sanat: [[0, 0.1, 0.4]] });
  const env = ymparisto();
  const vanhaGet = env.PUHE_R2.get;
  env.PUHE_R2.get = async (k) => (k === `opas/${sha}.mp3` ? { body: new Uint8Array(4), text: async () => '' }
    : k === `opas/${sha}.ajat.json` ? { body: ajat, text: async () => ajat } : vanhaGet(k));
  const { d } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'aj1' });
  assert.equal(d.valmis, true);
  assert.ok(String(d.aani_ajat).endsWith(`/opas/aani/${sha}.ajat.json`), `aani_ajat ${d.aani_ajat}`);
  const g = await worker.fetch(new Request(`https://pollo.example/opas/aani/${sha}.ajat.json`), env, { waitUntil() {} });
  assert.equal(g.status, 200); assert.deepEqual(await g.json(), JSON.parse(ajat));
  const puuttuu = await worker.fetch(new Request(`https://pollo.example/opas/aani/${'e'.repeat(32)}.ajat.json`), env, { waitUntil() {} });
  assert.equal(puuttuu.status, 404);
  // Ilman ajat-tiedostoa kenttää ei ole (vanhat natiivit ja varapolku).
  const ilman = ymparisto();
  const g2 = ilman.PUHE_R2.get;
  ilman.PUHE_R2.get = async (k) => (k === `opas/${sha}.mp3` ? { body: new Uint8Array(4), text: async () => '' } : g2(k));
  const { d: d2 } = await opas(ilman, { toive: 'Esittele kaupunki', istunto: 'aj2' });
  assert.equal('aani_ajat' in d2, false);
});

test('yksityiskohdat_polut: Pariisin luettelo v2 (Sisältökirjuri 7.10.)', async () => {
  const { OPAS_AINEISTOT } = await import('../tools/pollo/aineistot.js');
  assert.deepEqual(OPAS_AINEISTOT.yksityiskohdat_polut, { pariisi: 'esittely/pariisi-v2/pariisi-yksityiskohdat.json',
    praha: 'esittely/praha-v1/praha-yksityiskohdat.json', wien: 'esittely/wien-v1/wien-yksityiskohdat.json',
    rooma: 'esittely/rooma-v2/rooma-yksityiskohdat.json' });
});

test('äänetön esittely (omistaja 7.10. 18.2x): ei generointia, ei aani-, aani_pcm- eikä kesto_s-kenttiä; R2:n ääni soi, jos on', async () => {
  const env = ymparisto();
  env.OPAS_ESITTELY_TESTI = { testila: { ...ESITTELY, aaneton: true } };
  env.ELEVEN_API_KEY = 'e';
  const kirjoitukset = [];
  const vanhaPut = env.PUHE_R2.put;
  env.PUHE_R2.put = async (k, v) => { kirjoitukset.push(k); return vanhaPut(k, v); };
  const H2 = { ...H }; delete H2['x-matkakirja-testi'];   // tuotantopyyntö: tavallisesti tekstitallenne → GET generoisi
  const vanha = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ query: { pages: {} }, claims: {}, entities: {} }));
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H2,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti: { lat: 60, lon: 25 }, toive: 'Esittele kaupunki', istunto: 'an1' }) }), env, { waitUntil() {} })).json();
    assert.equal(d.valmis, true); assert.equal(d.teksti, 'Kohde 0 on valmis pitkä kerronta.');
    for (const k of ['aani', 'aani_pcm', 'kesto_s', 'aani_ajat']) assert.equal(k in d, false, `${k} ei kuulu äänettömälle`);
    assert.ok(!kirjoitukset.some((k) => /teksti|opas\/[0-9a-f]{32}\.(t|json)/.test(k)), `ei tekstitallennetta: ${kirjoitukset}`);
  } finally { globalThis.fetch = vanha; }
  // Ääni myöhemmin R2:een → soi ilman muutosta.
  const { createHash } = await import('node:crypto');
  const sha = createHash('sha256').update(`william|eleven_v4_turbo|${ESITTELY.kohteet[0].teksti}`).digest('hex').slice(0, 32);
  const g = env.PUHE_R2.get;
  env.PUHE_R2.get = async (k) => (k === `opas/${sha}.mp3` ? { body: new Uint8Array(4), text: async () => '' } : g(k));
  const { d: d2 } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'an2' });
  assert.ok(String(d2.aani).includes(sha));
});

test('näyttönimi ≠ tunnus: Reykjavík löytää islanti-esittelyn', async () => {
  const urlit = [];
  await oppaanEsittely({}, 'Reykjavík', async (u) => { urlit.push(String(u)); return new Response(JSON.stringify(ESITTELY)); });
  assert.deepEqual(urlit, ['https://media.matkakirja.app/opas/esittely-aaneton-v1/islanti.json']);
});
