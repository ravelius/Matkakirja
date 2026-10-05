// ELÄVÄ OPAS (tools/pollo/opas.js + worker hoidaOpas, omistaja 5.10.2026 klo 17.5x): Wikipedia-ehdokkaat, jäsennys ja
// worker-reitti tyngätyillä rajapinnoilla (Wikipedia, Wikidata, Anthropic, ElevenLabs).
import test from 'node:test';
import assert from 'node:assert/strict';
import { jasennaOpas, siivoaOpasPyynto, haeEhdokkaat, oppaanViesti, etaisyys } from '../tools/pollo/opas.js';
import worker from '../tools/pollo/worker.js';

const EHDOKKAAT = [
  { numero: 1, otsikko: 'Kööpenhaminan Tivoli', kieli: 'fi', id: 'Q110289', url: 'https://fi.wikipedia.org/wiki/Tivoli', lat: 55.6737, lon: 12.5681, alarivi: 'Huvipuisto', kuva: null, tiivistelma: 'Huvipuisto.', etaisyys_m: 300 },
  { numero: 2, otsikko: 'Nyhavn', kieli: 'en', id: 'Q1394197', url: 'https://en.wikipedia.org/wiki/Nyhavn', lat: 55.6798, lon: 12.5911, alarivi: 'Canal', kuva: null, tiivistelma: 'Canal.', etaisyys_m: 1500 },
];

test('jäsennys: pysähdys ehdokkaan koordinaatein, koko rajattu, tuntematon numero hylätään', () => {
  const p = jasennaOpas('PYSÄHDYS: 2\nNIMI: Nyhavn\nKOKO: 9000\nKORKEUS: 12\nTEKSTI: Nyhavn on värikäs kanava.', EHDOKKAAT);
  assert.equal(p.tyyppi, 'pysahdys');
  assert.equal(p.id, 'Q1394197');
  assert.equal(p.lat, 55.6798, 'koordinaatit Wikipediasta, ei mallilta');
  assert.equal(p.koko_m, 3000);
  assert.equal(p.korkeus_m, 12);
  assert.equal(p.teksti, 'Nyhavn on värikäs kanava.');
  assert.equal(jasennaOpas('PYSÄHDYS: 9\nNIMI: X\nTEKSTI: Y', EHDOKKAAT), null);
  const k = jasennaOpas('KYSYMYS: Mitä haluat nähdä?\nVAIHTOEHTO: Vanhaa\nVAIHTOEHTO: Modernia\nVAIHTOEHTO: Kolmas', EHDOKKAAT);
  assert.deepEqual(k, { tyyppi: 'kysymys', teksti: 'Mitä haluat nähdä?', vaihtoehdot: ['Vanhaa', 'Modernia'] });
});

test('pyynnön siivous: sijainti, käydyt ja toive rajattu', () => {
  const p = siivoaOpasPyynto({ sijainti: { lat: 55.7, lon: 12.6 }, toive: 'x'.repeat(500), kaydyt: ['Q1', '', 'Q2'] });
  assert.deepEqual(p.sijainti, { lat: 55.7, lon: 12.6 });
  assert.equal(p.toive.length, 300);
  assert.deepEqual(p.kaydyt, ['Q1', 'Q2']);
  assert.equal(siivoaOpasPyynto({ sijainti: { lat: 0, lon: 0 } }).sijainti, null);
  assert.ok(Math.abs(etaisyys({ lat: 55.6737, lon: 12.5681 }, { lat: 55.6798, lon: 12.5911 }) - 1580) < 60);
  assert.match(oppaanViesti({ kaupunki: 'Kööpenhamina', toive: null, kaydyt: [], isoisa: null }, EHDOKKAAT), /1\. Kööpenhaminan Tivoli — 300 m/);
});

/** Tyngätty verkko: Wikipedian geohaku + Wikidata + tiivistelmät + Anthropic + ElevenLabs. */
function tynka({ malli = 'PYSÄHDYS: 1\nNIMI: Tivoli\nKOKO: 300\nTEKSTI: Tivoli on huvipuisto.' } = {}) {
  const kutsut = [];
  const fetch = async (osoite, init = {}) => {
    const u = String(osoite);
    kutsut.push(u);
    const json = (d) => new Response(JSON.stringify(d), { status: 200, headers: { 'content-type': 'application/json' } });
    if (u.includes('generator=geosearch')) {
      return json({ query: { pages: {
        1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, description: 'Amusement park', coordinates: [{ lat: 55.6737, lon: 12.5681 }] },
        2: { title: 'Battle of Copenhagen', pageprops: { wikibase_item: 'Q9' }, description: 'Battle of the Napoleonic Wars', coordinates: [{ lat: 55.67, lon: 12.57 }] },
        3: { title: 'Nyhavn', pageprops: { wikibase_item: 'Q1394197' }, description: 'Canal', coordinates: [{ lat: 55.6798, lon: 12.5911 }] },
      } } });
    }
    if (u.includes('wikidata.org')) {
      return json({ entities: {
        Q110289: { sitelinks: { fiwiki: { title: 'Kööpenhaminan Tivoli' }, enwiki: {}, dewiki: {} } },
        Q1394197: { sitelinks: { enwiki: {}, dewiki: {}, svwiki: {} } },
      } });
    }
    if (u.includes('/page/summary/')) {
      const otsikko = decodeURIComponent(u.split('/page/summary/')[1]).replace(/_/g, ' ');
      if (otsikko === 'Kööpenhamina') return json({ title: 'Kööpenhamina', extract: 'Pääkaupunki.', coordinates: { lat: 55.676, lon: 12.568 } });
      return json({ title: otsikko, extract: `${otsikko} on kohde.`, description: 'kohde', wikibase_item: 'X',
        coordinates: otsikko.includes('Tivoli') ? { lat: 55.6737, lon: 12.5681 } : { lat: 55.6798, lon: 12.5911 },
        content_urls: { desktop: { page: `https://wiki/${otsikko}` } } });
    }
    if (u.includes('api.anthropic.com')) {
      kutsut.malli = JSON.parse(init.body).model;
      return json({ content: [{ type: 'text', text: malli }], stop_reason: 'end_turn' });
    }
    if (u.includes('api.elevenlabs.io')) {
      kutsut.eleven = JSON.parse(init.body);
      return new Response(new Uint8Array(16000), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
    }
    return new Response('{}', { status: 404 });
  };
  return { fetch, kutsut };
}

test('ehdokkaat: tapahtumat pois, kieliversiot järjestävät, suomenkielinen tiivistelmä ensin', async () => {
  const { fetch } = tynka();
  const e = await haeEhdokkaat(fetch, { lat: 55.676, lon: 12.568 }, []);
  assert.deepEqual(e.map((x) => x.id), ['Q110289', 'Q1394197'], 'taistelu ei ole pysähdys');
  assert.equal(e[0].otsikko, 'Kööpenhaminan Tivoli');
  assert.equal(e[0].kieli, 'fi');
  assert.equal(e[0].id, 'Q110289', 'Wikidata-tunnus geohausta');
  const ilman = await haeEhdokkaat(fetch, { lat: 55.676, lon: 12.568 }, ['Q110289']);
  assert.deepEqual(ilman.map((x) => x.id), ['Q1394197'], 'nähdyt suodatetaan');
});

async function ajaOpas(otsakkeet, runko, verkko) {
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = verkko.fetch;
  try {
    const env = { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k' };
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', ...otsakkeet },
      body: JSON.stringify(runko),
    }), env, {});
    return { tila: v.status, data: await v.json() };
  } finally {
    globalThis.fetch = alkuperainen;
  }
}

test('worker /opas/seuraava: Sonnet, Wikipedian koordinaatit, Williamin ääni valmiina; testiotsakkeella ei ääntä', async () => {
  const verkko = tynka();
  const { tila, data } = await ajaOpas({ 'x-pollo-kehittaja': 'k' }, { kaupunki: 'Kööpenhamina' }, verkko);
  assert.equal(tila, 200);
  assert.equal(data.tyyppi, 'pysahdys');
  assert.equal(data.id, 'Q110289');
  assert.equal(data.lat, 55.6737);
  assert.equal(verkko.kutsut.malli, 'claude-sonnet-5-5');
  assert.match(data.aani, /^https:\/\/pollo\.example\/opas\/aani\/[0-9a-f]{32}\.mp3$/);
  assert.equal(data.kesto_s, 1);
  assert.equal(verkko.kutsut.eleven.model_id, 'eleven_v4_turbo');
  assert.equal(verkko.kutsut.eleven.voice_settings.stability, undefined, 'William: oletusvakaus');

  const testi = tynka();
  const t = await ajaOpas({ 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' }, { kaupunki: 'Kööpenhamina' }, testi);
  assert.equal(t.data.aani, null);
  assert.equal(testi.kutsut.eleven, undefined, 'testi ei kutsu ElevenLabsia');

  const ilman = await ajaOpas({}, {}, tynka());
  assert.equal(ilman.tila, 400, 'kaupunki tai sijainti puuttuu');
});
