/*
 * js/ohjaa-peliin.js (17.11.2026; omistaja 11.34): etusivu (index.html = esittely) ohjaa pelaa.html:ään VAIN
 * pelin osoiteparametrilla tai iOS-kuoressa. Ei standalone- eikä tallennustarkistusta; pelkkä #esittely jää
 * etusivulle. Skripti on klassinen (ei moduuli), joten se ajetaan vm:llä mock-ikkunassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const KOODI = readFileSync(new URL('../js/ohjaa-peliin.js', import.meta.url), 'utf8');
const INDEX = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

/** Ajaa skriptin mock-ikkunassa; palauttaa { ikkuna, ohjattu } (ohjattu = replace-kutsun osoite tai null). */
function aja({ pathname = '/', search = '', hash = '', tallennus = null, standalone = false,
  displayStandalone = false, kuori = false, dokumentti = true } = {}) {
  const tila = { ohjattu: null };
  const ikkuna = {
    location: { pathname, search, hash, replace(url) { tila.ohjattu = url; } },
    navigator: { standalone },
    matchMedia: (q) => ({ matches: displayStandalone && q === '(display-mode: standalone)' }),
    localStorage: { getItem: (k) => (k === 'matkakirja-save-v1' ? tallennus : null) },
  };
  if (dokumentti) ikkuna.document = {};
  if (kuori) ikkuna.webkit = { messageHandlers: { matkakirja: { postMessage() {} } } };
  ikkuna.window = ikkuna;
  vm.runInNewContext(KOODI, ikkuna);
  return { ikkuna, ohjattu: tila.ohjattu };
}

test('kävijä jää etusivulle: ei parametria, vieras parametri tai pelkkä hash', () => {
  assert.equal(aja().ohjattu, null);
  assert.equal(aja({ search: '?utm_source=x' }).ohjattu, null);
  assert.equal(aja({ hash: '#esittely' }).ohjattu, null, 'sivulla on oma #esittely-ankkuri');
  assert.equal(aja({ hash: '#tarina' }).ohjattu, null);
});

test('asennettu sovellus tai tallennus EI ohjaa (omistaja 11.34: varotoimia ei tarvita)', () => {
  assert.equal(aja({ displayStandalone: true }).ohjattu, null);
  assert.equal(aja({ standalone: true }).ohjattu, null);
  assert.equal(aja({ tallennus: '{"v":1}' }).ohjattu, null);
});

test('pelin parametrit ohjaavat, kysely ja hash säilyvät', () => {
  for (const p of ['lehti', 'lauta', 'dev', 'koe', 'kortti', 'omistaja', 'paivitys', 'turvatila']) {
    assert.equal(aja({ search: `?${p}=x` }).ohjattu, `pelaa.html?${p}=x`, p);
  }
  assert.equal(aja({ search: '?omistaja' }).ohjattu, 'pelaa.html?omistaja');
  // Vanhat natiiviversiot pyytävät index.html?lehti=<kaupunki>.
  assert.equal(aja({ pathname: '/index.html', search: '?lehti=helsinki' }).ohjattu, 'pelaa.html?lehti=helsinki');
  assert.equal(aja({ search: '?a=1&lauta=pallo&dev=ruutu', hash: '#esittely' }).ohjattu,
    'pelaa.html?a=1&lauta=pallo&dev=ruutu#esittely');
});

test('iOS-kuori ohjataan, kysely säilyy', () => {
  assert.equal(aja({ kuori: true }).ohjattu, 'pelaa.html');
  assert.equal(aja({ kuori: true, search: '?x=1' }).ohjattu, 'pelaa.html?x=1');
});

test('pelisivulla ei ohjata (ei silmukkaa)', () => {
  assert.equal(aja({ pathname: '/pelaa.html', search: '?lehti=x', kuori: true }).ohjattu, null);
});

test('päätösfunktio on kutsuttavissa ilman automaattiajoa', () => {
  const { ikkuna, ohjattu } = aja({ dokumentti: false, search: '?lehti=oslo' });
  assert.equal(ohjattu, null, 'ilman documentia skripti ei ohjaa itse');
  const api = ikkuna.MatkakirjaOhjaus;
  assert.equal(api.ohjauksenSyy({ location: { pathname: '/', search: '?lehti=oslo', hash: '' } }), 'parametri');
  assert.equal(api.ohjauksenSyy({ location: { pathname: '/', search: '', hash: '' } }), '');
  assert.equal(api.pitaakoOhjata({ location: { pathname: '/', search: '', hash: '#esittely' } }), false);
  assert.equal(api.pelinOsoite({ location: { search: '?a', hash: '#b' } }), 'pelaa.html?a#b');
});

test('etusivu lataa ohjauksen ensimmäisenä skriptinä, synkronisesti', () => {
  const ensimmainen = INDEX.match(/<script\b[^>]*>/);
  assert.ok(ensimmainen, 'index.html:ssä ei ole skriptiä');
  assert.equal(ensimmainen[0], '<script src="js/ohjaa-peliin.js">');
  const head = INDEX.slice(0, INDEX.indexOf('</head>'));
  assert.ok(head.indexOf('js/ohjaa-peliin.js') < head.indexOf('<link'), 'ohjaus ajetaan ennen muita latauksia');
});
