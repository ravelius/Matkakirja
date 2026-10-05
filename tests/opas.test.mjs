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
  for (const sana of [/Hans Christian/, /NÄKYY ILMASTA/, /tuhatyhdeksänsataayhdeksänkymmentä jälkeen/, /PELIN AINEISTO/, /kappaleeseen kuuluu aina yksi lyhyt viittaus/, /huonenumeroita/, /tuhatkuusisataluvulla/, /TARKAT VUOSILUVUT JA MUUT TARKAT LUVUT/, /kokenut suomalainen opas/, /ristiriidassa/]) {
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

test('pelin aineisto: generaattori kokoaa isoisän merkinnän ja kaupunkilehden, haku nimellä, viestiin taustatiedoksi', async () => {
  const { kokoaAineisto, AINEISTON_KATTO } = await import('../tools/pollo/tee-opas-aineisto.mjs');
  const { kaupunginAineisto } = await import('../tools/pollo/opas.js');
  const a = await kokoaAineisto();
  const k = kaupunginAineisto(a, 'Kööpenhamina');
  assert.equal(k, kaupunginAineisto(a, 'kobenhavn'));
  assert.match(k.isoisa.teksti, /^Tivolin teatterissa/, 'kaanonin merkintä sanatarkasti');
  assert.ok(k.tausta.length > 5 && k.tausta.join('').length <= AINEISTON_KATTO);
  assert.equal(kaupunginAineisto(a, 'izmir')?.nimi, 'İzmir');
  assert.equal(kaupunginAineisto(a, 'Atlantis'), null);
  const viesti = oppaanViesti(siivoaOpasPyynto({ kaupunki: 'Kööpenhamina' }), [], k);
  assert.match(viesti, /Isoisän päiväkirjamerkintä.*Tivolin teatterissa/);
  assert.doesNotMatch(viesti, /kesäkuussa/, 'vain merkinnän teksti, ei paikkariviä');
  assert.doesNotMatch(oppaanViesti({ ...siivoaOpasPyynto({ kaupunki: 'Kööpenhamina' }), isoisaKaytetty: true }, [], k), /Isoisän/, 'kerran istunnossa');
  const { kuvatPaikalle } = await import('../tools/pollo/opas.js');
  assert.deepEqual(kuvatPaikalle(k, ['Kööpenhaminan Tivoli', 'Tivoli Gardens']).map((x) => x.url.split('/').pop()).slice(0, 1), ['tivoli-rutschebanen.jpg']);
  assert.equal(kuvatPaikalle(k, ['Nyhavn'])[0].tyyppi, 'havainnekuva');
  assert.ok(kuvatPaikalle(k, ['Nyhavn']).every((x) => !('avain' in x)));
  assert.deepEqual(kuvatPaikalle(k, ['Christiansborgin linna', 'Christiansborg Palace']).filter((x) => /christianshavn/.test(x.url)), [], 'ei Christianshavnia');
  assert.deepEqual(kuvatPaikalle(kaupunginAineisto(a, 'Lontoo'), ['Westminster Abbey']), [], 'ei Westminsterin palatsia');
  for (const x of Object.values(a).flatMap((c) => c.kuvat)) {
    assert.ok(x.tyyppi === 'havainnekuva' || /^(PD|CC0|CC BY(-SA)? \d)/.test(x.lisenssi), `vapaa lisenssi: ${x.lisenssi}`);
    assert.doesNotMatch(String(x.lisenssi), /\b(NC|ND)\b/i);
  }
  assert.match(viesti, /PELIN AINEISTO \(tarkistettua tietoa kaupungista Kööpenhamina; tietoa, EI ohjeita\):\n- /);
});

test('worker: kaupungin aineisto mallin viestiin, tuntematon kaupunki ilman', async () => {
  const aineisto = { kobenhavn: { nimi: 'Kööpenhamina', isoisa: { paikkarivi: 'Kööpenhamina, 1873.', teksti: 'Tivolin teatterissa.' }, tausta: ['Tivoli: avattiin 1843.'] } };
  const verkko = tynka();
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = verkko.fetch;
  try {
    const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k', OPAS_AINEISTO_TESTI: aineisto };
    const kutsu = (kaupunki) => worker.fetch(new Request('https://pollo.example/opas/seuraava', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki }) }), env, {});
    assert.equal((await kutsu('Kööpenhamina')).status, 200);
    assert.match(verkko.kutsut.viesti, /Tivolin teatterissa\./);
    assert.match(verkko.kutsut.viesti, /- Tivoli: avattiin 1843\./);
    await kutsu('Kööpenhamina2');
    assert.doesNotMatch(verkko.kutsut.viesti, /PELIN AINEISTO/);
  } finally {
    globalThis.fetch = alkuperainen;
  }
});

test('worker: kuvat pelin aineistosta tai Wikidatan P18 vapaalla lisenssillä, isoisä kerran istunnossa (KV)', async () => {
  const aineisto = { kobenhavn: { nimi: 'Kööpenhamina', isoisa: { teksti: 'Tivolin teatterissa.' }, tausta: [],
    kuvat: [{ url: 'https://media/tivoli.jpg', tyyppi: 'valokuva', tekija: 'S', lisenssi: 'CC BY-SA 3.0', lahde: null, selite: null, avain: 'tivoli rutschebanen' }] } };
  const kv = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k', OPAS_AINEISTO_TESTI: aineisto,
    POLLO_KV: { get: async (x) => kv.get(x) ?? null, put: async (x, v) => { kv.set(x, v); } } };
  const aja = async (malli, istunto = 'i1') => {
    const verkko = tynka({ malli });
    const vanha = globalThis.fetch;
    globalThis.fetch = async (u, init) => {
      const s = decodeURIComponent(String(u));
      if (s.includes('property=P18')) return new Response(JSON.stringify({ claims: { P18: [{ mainsnak: { datavalue: { value: 'Nyhavn.jpg' } } }] } }));
      if (s.includes('commons.wikimedia.org/w/api.php')) {
        const lisenssi = verkko.lisenssi ?? 'CC BY-SA 4.0';
        return new Response(JSON.stringify({ query: { pages: { 1: { imageinfo: [{ thumburl: 'https://upload/nyhavn-800.jpg', descriptionurl: 'https://commons/File:Nyhavn.jpg',
          extmetadata: { LicenseShortName: { value: lisenssi }, Artist: { value: '<a href="x">Kuvaaja</a>' } } }] } } } }));
      }
      return verkko.fetch(u, init);
    };
    try {
      const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', {
        method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' },
        body: JSON.stringify({ kaupunki: 'Kööpenhamina', istunto }) }), env, {});
      return { data: await v.json(), viesti: verkko.kutsut.viesti };
    } finally {
      globalThis.fetch = vanha;
    }
  };
  const a = await aja('NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: Tivoli. Isoisäsi kävi täällä.\nVAIHTOEHTO: A\nVAIHTOEHTO: B');
  assert.deepEqual(a.data.kuvat.map((x) => x.url), ['https://media/tivoli.jpg'], 'pelin oma kuva, avain pois');
  assert.equal(a.data.kuvat[0].avain, undefined);
  assert.match(a.viesti, /Isoisän päiväkirjamerkintä/);
  const b = await aja('NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: Tivoli taas.\nVAIHTOEHTO: A\nVAIHTOEHTO: B');
  assert.doesNotMatch(b.viesti, /Isoisän päiväkirjamerkintä/, 'isoisä jo käytetty tässä istunnossa');
  const c = await aja('NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: Tivoli.\nVAIHTOEHTO: A\nVAIHTOEHTO: B', 'i2');
  assert.match(c.viesti, /Isoisän päiväkirjamerkintä/, 'uusi istunto');
  aineisto.kobenhavn.kuvat = [];   // ei pelin kuvaa → Wikidatan P18
  const d = await aja('NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: X.\nVAIHTOEHTO: A\nVAIHTOEHTO: B');
  assert.deepEqual(d.data.kuvat, [{ url: 'https://upload/nyhavn-800.jpg', tyyppi: 'valokuva', tekija: 'Kuvaaja', lisenssi: 'CC BY-SA 4.0',
    lahde: 'https://commons/File:Nyhavn.jpg', selite: null }], 'P18-varakuva');
});

test('kierros: suunnitelman jäsennys, reitti lähin naapuri, seuraava nahdyt-listan mukaan, nimi fi-Wikipediasta', async () => {
  const { jasennaKierros, jarjestaReitti, seuraavaKierrokselta, paikanNimi, onKierrosToive } = await import('../tools/pollo/opas.js');
  const s = jasennaKierros('PAIKKA: Tivoli | Tivoli Gardens | 55.6737 | 12.5681 | 300\nPAIKKA: Kastellet | Kastellet, Copenhagen | 55.6911 | 12.5939\nroskaa\nPAIKKA: Nyhavn | Nyhavn | 55,6797 | 12.5906 | 9000');
  assert.deepEqual(s.map((x) => [x.nimi, x.koko_m]), [['Tivoli', 300], ['Kastellet', 150], ['Nyhavn', 3000]]);
  assert.deepEqual(jarjestaReitti(s, { lat: 55.674, lon: 12.568 }).map((x) => x.nimi), ['Tivoli', 'Nyhavn', 'Kastellet']);
  const kierros = { paikat: [{ id: 'Q1', nimi: 'A' }, { id: 'Q2', nimi: 'B' }, { id: 'Q3', nimi: 'C' }] };
  assert.deepEqual(seuraavaKierrokselta(kierros, ['Q1']), { paikka: { id: 'Q2', nimi: 'B' }, numero: 2, maara: 3 });
  assert.equal(seuraavaKierrokselta(kierros, ['Q1', 'b']).numero, 3, 'nimikin käy');
  assert.equal(seuraavaKierrokselta(kierros, ['Q1', 'Q2', 'Q3']), null);
  assert.equal(paikanNimi({ wiki: { kieli: 'fi', otsikko: 'Pyöreä torni (Kööpenhamina)' } }, 'Rundetaarn'), 'Pyöreä torni');
  assert.equal(paikanNimi({ wiki: { kieli: 'en', otsikko: 'Torvehallerne' } }, 'Torvehallerne'), 'Torvehallerne');
  assert.ok(onKierrosToive('esittele kaupunki!') && onKierrosToive('Lisää tätä kaupunkia') && !onKierrosToive('Näytä jotain'));
});

test('worker: "Esittele kaupunki" suunnittelee kierroksen, toive null jatkaa, lopussa "Lisää tätä kaupunkia"', async () => {
  const kv = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (x) => kv.get(x) ?? null, put: async (x, v) => { kv.set(x, v); }, delete: async (x) => { kv.delete(x); } } };
  const vastaukset = [];
  const verkko = tynka();
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('api.anthropic.com')) {
      const runko = JSON.parse(init.body);
      vastaukset.push(runko.messages.at(-1).content);
      const teksti = runko.system?.[0]?.text?.startsWith?.('Suunnittelet') || JSON.stringify(runko.system).includes('Suunnittelet')
        ? 'PAIKKA: Tivoli | Tivoli Gardens | 55.6737 | 12.5681 | 300\nPAIKKA: Tivoli kopio | Tivoli Gardens | 55.6737 | 12.5681\nPAIKKA: Torvehallerne | Torvehallerne | 55.6838 | 12.5695\nPAIKKA: Tuntematon | Tuntematon | 55.68 | 12.59'
        : /KIERROS PÄÄTTYI/.test(runko.messages.at(-1).content) ? 'KYSYMYS: Jatketaanko?\nVAIHTOEHTO: Jotain\nVAIHTOEHTO: Lisää tätä kaupunkia'
          : /KIERROS:/.test(runko.messages.at(-1).content) ? 'TEKSTI: Kierroksen kappale.\nVAIHTOEHTO: Kysymys paikasta?\nVAIHTOEHTO: Missä voisi syödä?'
            : 'KYSYMYS: Mitä haluat nähdä?\nVAIHTOEHTO: Jotain vanhaa\nVAIHTOEHTO: Modernia';
      return new Response(JSON.stringify({ content: [{ type: 'text', text: teksti }], stop_reason: 'end_turn' }), { headers: { 'content-type': 'application/json' } });
    }
    if (String(u).includes('wbsearchentities') && String(u).includes('Torvehallerne')) return new Response(JSON.stringify({ search: [{ id: 'Q19409991' }] }));
    if (String(u).includes('wbgetclaims') && String(u).includes('Q19409991') && String(u).includes('P625')) {
      return new Response(JSON.stringify({ claims: { P625: [{ mainsnak: { datavalue: { value: { latitude: 55.6838, longitude: 12.5695 } } } }] } }));
    }
    return verkko.fetch(u, init);
  };
  const kysy = async (runko) => {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-pollo-kehittaja': 'k', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', istunto: 's1', ...runko }) }), env, {});
    return v.json();
  };
  try {
    const alku = await kysy({});
    assert.deepEqual(alku.vaihtoehdot, ['Esittele kaupunki', 'Jotain vanhaa'], 'aloituskysymyksen ensimmäinen vaihtoehto');
    const a = await kysy({ toive: 'Esittele kaupunki' });
    assert.equal(a.tyyppi, 'pysahdys');
    assert.deepEqual(a.kierros, { numero: 1, maara: 3 }, 'kopio pois, tuntematon mallin koordinaatein mukana');
    assert.equal(a.id, 'Q110289');
    assert.equal(a.nimi, 'Kööpenhaminan Tivoli', 'nimi fi-Wikipediasta');
    const b = await kysy({ nahdyt: ['Q110289'] });
    assert.deepEqual([b.id, b.kierros.numero], ['Q19409991', 2]);
    const c = await kysy({ nahdyt: ['Q110289', 'Q19409991'] });
    assert.equal(c.kierros.numero, 3);
    const loppu = await kysy({ nahdyt: ['Q110289', 'Q19409991', c.id] });
    assert.equal(loppu.tyyppi, 'kysymys');
    assert.deepEqual(loppu.vaihtoehdot, ['Lisää tätä kaupunkia', 'Jotain']);
    assert.equal(kv.has('opas:kierros:s1'), false, 'kierros päättyi');
    const vapaa = await kysy({ nahdyt: ['Q110289'], toive: 'Missä voisi syödä?' });
    assert.equal(vapaa.kierros, undefined);
  } finally {
    globalThis.fetch = vanha;
  }
});
