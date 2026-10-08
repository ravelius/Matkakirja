// ASTRONAUTTIEN KUVIEN SIRUT (omistaja 6.10.2026 00.1x Päätoimittajan kautta): "astronauttien kuvissa pulun chat pitäisi
// muuttua sen mukaan mikä kuva on näytöllä. pulun pitää generoida valmiit kysymykset näkymän mukaan".
// Worker: ehdotukset näytöllä olevan kuvan tiedoista, KV-välimuisti kuvan tunnuksella (yksi generointi kuvaa kohden),
// ja Pulun vastaus saman kuvan kontekstissa. Vika toistetaan ensin: sama kuva → toinen mallikutsu, kuva ei kehotteessa.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { siivoaKuva, kuvaKontekstiksi, kuvaSirujenAvain } from '../tools/pollo/kuvasirut.js';

const KUVA = {
  tunnus: 'ISS064-E-12345', nimi: 'Niilin suisto', maa: 'Egypti', lat: 30.9, lon: '31.2',
  selite: 'Niilin suisto yöllä: Kairon valot ja suiston kaupungit.', aika: '2021-02-03', retkikunta: '64',
};

function ymparisto() {
  const kv = new Map();
  return { kv, env: { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app',
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } } };
}

async function kutsu(env, runko, ip = '10.1.0.1') {
  const pyynnot = [];
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('api.anthropic.com')) {
      pyynnot.push(JSON.parse(init.body));
      const teksti = runko.tehtava === 'ehdotukset'
        ? 'Miksi Kairon valot näkyvät avaruuteen?\nMiten suisto on syntynyt?\nMiksi suisto on kolmion muotoinen?'
        : 'Suisto on syntynyt Niilin tuomasta lietteestä.';
      return new Response(JSON.stringify({ content: [{ type: 'text', text: teksti }], stop_reason: 'end_turn',
        usage: { input_tokens: 1, output_tokens: 1 } }), { headers: { 'content-type': 'application/json' } });
    }
    return new Response('{}');
  };
  const odotukset = [];
  try {
    const v = await worker.fetch(new Request('https://pollo.example/', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': ip },
      body: JSON.stringify(runko) }), env, { waitUntil: (p) => odotukset.push(p) });
    await Promise.all(odotukset);
    return { status: v.status, json: await v.json(), pyynnot };
  } finally { globalThis.fetch = vanha; }
}

const kehoteTekstina = (p) => JSON.stringify(p.messages) + JSON.stringify(p.system);

test('siivoaKuva: tunnus pakollinen ja rajattu, vain sallitut kentät, katot', () => {
  assert.equal(siivoaKuva(null), null);
  assert.equal(siivoaKuva({ kohde: 'X' }), null, 'ilman tunnusta ei kuvaa');
  assert.equal(siivoaKuva({ tunnus: 'a b/c' }), null, 'tunnuksessa vain turvalliset merkit');
  const k = siivoaKuva({ ...KUVA, salainen: 'ei', selite: 'x'.repeat(2000) });
  assert.equal(k.tunnus, 'ISS064-E-12345');
  assert.equal(k.salainen, undefined);
  assert.ok(k.selite.length <= 600);
  assert.equal(k.lon, 31.2, 'luku merkkijonona kelpaa');
  assert.equal(siivoaKuva({ tunnus: 'a', lat: 'pohjoinen', lon: 999 }).lat, undefined, 'kelvoton koordinaatti pois');
});

test('kuvan avain riippuu kuvan tiedoista, ei kentien järjestyksestä', async () => {
  const a = await kuvaSirujenAvain(siivoaKuva(KUVA));
  const b = await kuvaSirujenAvain(siivoaKuva({ retkikunta: '64', ...KUVA }));
  const c = await kuvaSirujenAvain(siivoaKuva({ ...KUVA, selite: 'toinen' }));
  assert.match(a, /^pulu:kuvasirut:v2:[0-9a-f]{32}$/);
  assert.equal(a, b);
  assert.notEqual(a, c, 'eri selite → eri avain (asiakas ei voi myrkyttää toisen kuvan siruja)');
});

test('ehdotukset kuvalle: kuvan tiedot kehotteeseen, toinen katselu välimuistista ilman mallikutsua', async () => {
  const { env, kv } = ymparisto();
  const eka = await kutsu(env, { tehtava: 'ehdotukset', konteksti: 'Astronautin kamera', kuva: KUVA });
  assert.equal(eka.status, 200);
  assert.deepEqual(eka.json.ehdotukset, ['Miksi Kairon valot näkyvät avaruuteen?', 'Miten suisto on syntynyt?', 'Miksi suisto on kolmion muotoinen?']);
  assert.equal(eka.pyynnot.length, 1);
  assert.match(kehoteTekstina(eka.pyynnot[0]), /Niilin suisto yöllä/, 'kuvan selite kehotteessa');
  assert.match(kehoteTekstina(eka.pyynnot[0]), /ISS064-E-12345/);
  const toka = await kutsu(env, { tehtava: 'ehdotukset', konteksti: 'Astronautin kamera, eri tila', kuva: KUVA });
  assert.equal(toka.status, 200);
  assert.deepEqual(toka.json.ehdotukset, eka.json.ehdotukset);
  assert.equal(toka.pyynnot.length, 0, 'sama kuva → ei uutta generointia');
  const laskurit = [...kv.keys()].filter((k) => k.startsWith('pollo:p'));
  assert.ok(laskurit.every((k) => kv.get(k) === '1'), 'välimuistiosuma ei kuluta pelaajan päivärajaa');
  const muu = await kutsu(env, { tehtava: 'ehdotukset', kuva: { ...KUVA, tunnus: 'ISS070-E-1', selite: 'Alpit' } });
  assert.equal(muu.pyynnot.length, 1, 'toinen kuva → oma generointi');
});

test('ehdotukset ilman kuvaa toimivat kuten ennen (ei välimuistia)', async () => {
  const { env } = ymparisto();
  const a = await kutsu(env, { tehtava: 'ehdotukset', konteksti: 'Kööpenhamina' });
  const b = await kutsu(env, { tehtava: 'ehdotukset', konteksti: 'Kööpenhamina' });
  assert.equal(a.pyynnot.length + b.pyynnot.length, 2);
});

test('vastaus kuvan kontekstissa: kuvan tiedot kulkevat kehotteeseen', async () => {
  const { env } = ymparisto();
  const v = await kutsu(env, { kysymys: 'Mikä tuo kirkas alue on?', kuva: KUVA });
  assert.equal(v.status, 200);
  assert.match(kehoteTekstina(v.pyynnot[0]), /Niilin suisto yöllä/);
  assert.match(kuvaKontekstiksi(siivoaKuva(KUVA)), /astronautt/i);
});

test('kuvasirujen kehote: kokonaiset lauseet verbin kanssa, enintään kuusi sanaa (Päätoimittaja 6.10.)', async () => {
  const { KUVASIRUKEHOTE } = await import('../tools/pollo/kuvasirut.js');
  assert.match(KUVASIRUKEHOTE, /kokonainen, luonteva suomenkielinen kysymyslause verbin kanssa, enintään kuusi sanaa/);
  assert.match(KUVASIRUKEHOTE, /täsmälleen kolme riviä/);
});
