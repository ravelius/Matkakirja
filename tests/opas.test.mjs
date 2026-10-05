// ELÄVÄ OPAS (tools/pollo/opas.js + worker hoidaOpas, omistaja 5.10.2026 klo 17.5x / 18.0x): Sonnet valitsee paikan ja
// kertoo omasta tiedostaan, worker hakee koordinaatit nimellä (ei Wikipedian tekstiä), kaksi vaihtoehtoa joka kappaleeseen.
// Rajapinnat tyngätty (Wikipedia, Wikidata, Anthropic, ElevenLabs).
import test from 'node:test';
import assert from 'node:assert/strict';
import { jasennaOpas, siivoaOpasPyynto, paikanKoordinaatit, kaydytNimiksi, oppaanViesti, etaisyys, OPAS_KEHOTE } from '../tools/pollo/opas.js';
import worker from '../tools/pollo/worker.js';

const KOOPENHAMINA = { lat: 55.676, lon: 12.568 };

test('jäsennys: pysähdys mallin kentin, koko rajattu, teksti päättyy ennen vaihtoehtoja; kysymys', () => {
  const p = jasennaOpas('NIMI: Nyhavn\nWIKIPEDIA: Nyhavn\nLAT: 55,6798\nLON: 12.5911\nKOKO: 9000\nKORKEUS: 12\n'
    + 'TEKSTI: Nyhavn on värikäs kanava.\nSe on vilkas.\nVAIHTOEHTO: Kerro lisää\nVAIHTOEHTO: Näytä jotain modernia');
  assert.equal(p.tyyppi, 'pysahdys');
  assert.equal(p.wikipedia, 'Nyhavn');
  assert.equal(p.lat, 55.6798);
  assert.equal(p.koko_m, 3000);
  assert.equal(p.korkeus_m, 12);
  assert.equal(p.teksti, 'Nyhavn on värikäs kanava. Se on vilkas.');
  assert.deepEqual(p.vaihtoehdot, ['Kerro lisää', 'Näytä jotain modernia']);
  assert.equal(jasennaOpas('NIMI: X'), null, 'ilman tekstiä ei pysähdystä');
  const k = jasennaOpas('KYSYMYS: Mitä haluat nähdä?\nVAIHTOEHTO: Vanhaa\nVAIHTOEHTO: Modernia\nVAIHTOEHTO: Kolmas');
  assert.deepEqual(k, { tyyppi: 'kysymys', teksti: 'Mitä haluat nähdä?', vaihtoehdot: ['Vanhaa', 'Modernia'] });
});

test('pyyntö ja kehote: nahdyt, edellinen kappale, toive rajattu; kehotteessa omistajan 18.0x-linjat', () => {
  const p = siivoaOpasPyynto({ sijainti: { lat: 55.7, lon: 12.6 }, toive: 'x'.repeat(500), nahdyt: ['Q1', '', 'Q2'], edellinen_teksti: 'Edellinen.' });
  assert.deepEqual(p.sijainti, { lat: 55.7, lon: 12.6 });
  assert.equal(p.toive.length, 300);
  assert.deepEqual(p.kaydyt, ['Q1', 'Q2']);
  assert.equal(siivoaOpasPyynto({ sijainti: { lat: 0, lon: 0 } }).sijainti, null);
  assert.ok(Math.abs(etaisyys({ lat: 55.6737, lon: 12.5681 }, { lat: 55.6798, lon: 12.5911 }) - 1580) < 60);
  const viesti = oppaanViesti(p, ['Tivoli', 'Nyhavn']);
  assert.match(viesti, /Jo kerrotut paikat.*Tivoli; Nyhavn/);
  assert.match(viesti, /Edellinen kappale: Edellinen\./);
  assert.doesNotMatch(OPAS_KEHOTE, /tiivistelm|ehdokka/i, 'ei Wikipedian tekstiä eikä ehdokaslistaa');
  for (const sana of [/Hans Christian/, /NÄKYY ILMASTA/, /viime vuosikymmenten/, /huonenumeroita/, /tuhatkuusisataluvulla/, /kokenut suomalainen opas/, /ristiriidassa/]) {
    assert.match(OPAS_KEHOTE, sana);
  }
});

/** Tyngätty verkko: Wikipedian otsikko-/hakukysely ja kaupungin koordinaatit, Wikidata, Anthropic, ElevenLabs. */
function tynka({ malli = 'NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nLAT: 55.67\nLON: 12.56\nKOKO: 300\nTEKSTI: Tivoli on huvipuisto.\nVAIHTOEHTO: Lisää\nVAIHTOEHTO: Seuraava' } = {}) {
  const kutsut = { wiki: [] };
  const fetch = async (osoite, init = {}) => {
    const u = decodeURIComponent(String(osoite));
    const json = (d) => new Response(JSON.stringify(d), { status: 200, headers: { 'content-type': 'application/json' } });
    if (u.includes('wikipedia.org')) {
      kutsut.wiki.push(u);
      if (u.includes('extract') || u.includes('/page/summary/')) kutsut.tiivistelma = true;
      if (u.includes('titles=Kööpenhamina')) return json({ query: { pages: { 7: { title: 'Kööpenhamina', coordinates: [{ lat: 55.676, lon: 12.568 }] } } } });
      if (u.includes('titles=Tivoli Gardens')) {
        return json({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, description: 'Amusement park', coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } });
      }
      if (u.includes('titles=Tivoli (Ohio)')) {   // samanniminen kaukana → hylätään, haku löytää oikean
        return json({ query: { pages: { 3: { title: 'Tivoli (Ohio)', pageprops: { wikibase_item: 'Q9' }, coordinates: [{ lat: 40, lon: -82 }] } } } });
      }
      if (u.includes('gsrsearch=Tivoli')) {
        return json({ query: { pages: { 1: { index: 1, title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } });
      }
      return json({ query: { pages: { '-1': { title: 'x', missing: '' } } } });
    }
    if (u.includes('wbsearchentities')) return json({ search: u.includes('search=Torvehallerne') ? [{ id: 'Q19409991' }] : [] });
    if (u.includes('wbgetclaims')) {
      return json({ claims: u.includes('Q19409991') ? { P625: [{ mainsnak: { datavalue: { value: { latitude: 55.6836, longitude: 12.5696 } } } }] } : {} });
    }
    if (u.includes('wikidata.org')) {
      return json({ entities: {
        Q110289: { sitelinks: { fiwiki: { title: 'Kööpenhaminan Tivoli' } }, descriptions: { fi: { value: 'huvipuisto Kööpenhaminassa' } }, labels: { fi: { value: 'Tivoli' } } },
        Q1394197: { sitelinks: {}, labels: { en: { value: 'Nyhavn' } } },
      } });
    }
    if (u.includes('api.anthropic.com')) {
      kutsut.malli = JSON.parse(init.body).model;
      kutsut.viesti = JSON.parse(init.body).messages.at(-1).content;
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

test('koordinaatit nimellä: otsikko, kaukainen samanniminen hylätään ja haku löytää, muuten mallin arvio kaupungin sisällä', async () => {
  const { fetch, kutsut } = tynka();
  const a = await paikanKoordinaatit(fetch, { nimi: 'Tivoli', wikipedia: 'Tivoli Gardens', lat: 55.6, lon: 12.5 }, KOOPENHAMINA);
  assert.deepEqual([a.lat, a.lon, a.id, a.lahde], [55.6737, 12.5681, 'Q110289', 'wikipedia']);
  assert.equal(a.alarivi, 'huvipuisto Kööpenhaminassa');
  assert.equal(a.wiki.kieli, 'fi');
  const b = await paikanKoordinaatit(fetch, { nimi: 'Tivoli', wikipedia: 'Tivoli (Ohio)', lat: 55.6, lon: 12.5 }, KOOPENHAMINA);
  assert.equal(b.id, 'Q110289', 'kaukainen samanniminen ohitetaan');
  const c = await paikanKoordinaatit(fetch, { nimi: 'Tuntematon', wikipedia: 'Tuntematon', lat: 55.68, lon: 12.59 }, KOOPENHAMINA);
  assert.deepEqual([c.lat, c.lahde], [55.68, 'malli']);
  assert.equal(await paikanKoordinaatit(fetch, { nimi: 'Tuntematon', lat: 40, lon: -82 }, KOOPENHAMINA), null);
  const d = await paikanKoordinaatit(fetch, { nimi: 'Torvehallerne', wikipedia: 'Torvehallerne', lat: 55.7, lon: 12.6 }, KOOPENHAMINA);
  assert.deepEqual([d.id, d.lat, d.lahde], ['Q19409991', 55.6836, 'wikipedia'], 'Wikidatan nimihaku + P625, kun artikkelia ei ole');
  assert.equal(kutsut.tiivistelma, undefined, 'tekstiä ei haeta');
  assert.deepEqual(await kaydytNimiksi(fetch, ['Q110289', 'Q1394197', 'Raatihuone']), ['Kööpenhaminan Tivoli', 'Nyhavn', 'Raatihuone']);
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

test('worker /opas/seuraava: Sonnet valitsee, koordinaatit Wikipediasta nimellä, Williamin ääni; testiotsakkeella ei ääntä', async () => {
  const verkko = tynka();
  const { tila, data } = await ajaOpas({ 'x-pollo-kehittaja': 'k' }, { kaupunki: 'Kööpenhamina', nahdyt: ['Q1394197'] }, verkko);
  assert.equal(tila, 200);
  assert.equal(data.tyyppi, 'pysahdys');
  assert.equal(data.id, 'Q110289');
  assert.equal(data.lat, 55.6737, 'Wikipedian koordinaatti, ei mallin arvio');
  assert.deepEqual(data.vaihtoehdot, ['Lisää', 'Seuraava']);
  assert.equal(data.wikipedia, undefined);
  assert.equal(verkko.kutsut.malli, 'claude-sonnet-5-5');
  assert.match(verkko.kutsut.viesti, /Jo kerrotut paikat.*Nyhavn/, 'nahdyt nimiksi mallille');
  assert.equal(verkko.kutsut.tiivistelma, undefined);
  assert.match(data.aani, /^https:\/\/pollo\.example\/opas\/aani\/[0-9a-f]{32}\.mp3$/);
  assert.equal(data.kesto_s, 1);
  assert.equal(verkko.kutsut.eleven.model_id, 'eleven_v4_turbo');
  assert.equal(verkko.kutsut.eleven.voice_settings.stability, undefined, 'William: oletusvakaus');

  const testi = tynka();
  const t = await ajaOpas({ 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' }, { kaupunki: 'Kööpenhamina' }, testi);
  assert.equal(t.data.aani, null);
  assert.equal(testi.kutsut.eleven, undefined, 'testi ei kutsu ElevenLabsia');

  const kaukana = await ajaOpas({ 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' }, { kaupunki: 'Kööpenhamina' },
    tynka({ malli: 'NIMI: Tuntematon\nLAT: 40\nLON: -82\nTEKSTI: X.' }));
  assert.equal(kaukana.tila, 502, 'kaupungin ulkopuolinen paikka hylätään');

  const ilman = await ajaOpas({}, {}, tynka());
  assert.equal(ilman.tila, 400, 'kaupunki tai sijainti puuttuu');
});
