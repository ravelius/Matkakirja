/*
 * Pöllön vastauskuvan haku (js/wiki.js haeKuvallinenArtikkeli).
 *
 * Suora nimihaku ensin, haku varalle: kysymyslause tai taivutettu
 * käsite ("Milloin Lontoon metro avattiin?") ei ole artikkelin nimi,
 * mutta hakuosuman kautta kuvallinen artikkeli löytyy silti. Verkko
 * jäljitellään fetchImpl-stubilla — testi ei riipu Wikipediasta eikä
 * sen käyttörajoista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { haeKuvallinenArtikkeli, searchUrl, summaryUrl } from '../js/wiki.js';

const KUVA = 'https://upload.wikimedia.org/thumb/x/Metro.jpg/320px-Metro.jpg';

/** Stub: summary vastaa vain tunnetuille nimille, haku löytää parhaan. */
function teeFetch({ artikkelit = {}, haku = {} } = {}, loki = []) {
  return async (url) => {
    loki.push(url);
    const vastaa = (data) => ({ ok: true, json: async () => data });
    for (const [nimi, data] of Object.entries(artikkelit)) {
      if (url === summaryUrl('fi', nimi) || url === summaryUrl('en', nimi)) {
        return vastaa(data);
      }
    }
    for (const [teksti, osuma] of Object.entries(haku)) {
      if (url === searchUrl('fi', teksti) || url === searchUrl('en', teksti)) {
        return vastaa({ query: { search: osuma ? [{ title: osuma }] : [] } });
      }
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };
}

const ARTIKKELI = {
  title: 'Lontoon metro',
  extract: 'M'.repeat(220),
  thumbnail: { source: KUVA },
  content_urls: { desktop: { page: 'https://fi.wikipedia.org/wiki/Lontoon_metro' } },
};

test('suora nimi voittaa: hakua ei edes kysytä', async () => {
  const loki = [];
  const fetchImpl = teeFetch({ artikkelit: { 'Lontoon metro': ARTIKKELI } }, loki);
  const s = await haeKuvallinenArtikkeli('Lontoon metro', { fetchImpl });
  assert.equal(s?.image, KUVA);
  assert.ok(!loki.some((u) => u.includes('list=search')), 'haku kysyttiin turhaan');
});

test('kysymyslause löytää kuvan haun kautta', async () => {
  const fetchImpl = teeFetch({
    artikkelit: { 'Lontoon metro': ARTIKKELI },
    haku: { 'Milloin Lontoon metro avattiin': 'Lontoon metro' },
  });
  const s = await haeKuvallinenArtikkeli('Milloin Lontoon metro avattiin', { fetchImpl });
  assert.equal(s?.title, 'Lontoon metro');
  assert.equal(s?.image, KUVA);
});

test('montaasi-nimiset kuvat karsitaan myös hakupolulla', async () => {
  const montaasi = { ...ARTIKKELI, thumbnail: { source: 'https://x/Montage_of_London.jpg' } };
  const fetchImpl = teeFetch({
    artikkelit: { Lontoo: montaasi },
    haku: { 'Kerro Lontoosta': 'Lontoo' },
  });
  const s = await haeKuvallinenArtikkeli('Kerro Lontoosta', { fetchImpl });
  assert.equal(s, null, 'montaasikuva ei kelpaa vastauskuvaksi');
});

test('ilman osumaa palautuu null eikä mikään heitä', async () => {
  const s = await haeKuvallinenArtikkeli('höpöhöpö', { fetchImpl: teeFetch() });
  assert.equal(s, null);
});
