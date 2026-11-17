/*
 * js/ohjaa-peliin.js (17.11.2026): etusivun yhteensopivuusskripti ohjaa pelaa.html:ään ne, joilla peli jo on
 * (asennettu sovellus, tallennus, pelin parametri tai #esittely, iOS-kuori). Uusi kävijä jää etusivulle.
 * Skripti on klassinen (ei moduuli), joten se ajetaan vm:llä mock-ikkunassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const KOODI = readFileSync(new URL('../js/ohjaa-peliin.js', import.meta.url), 'utf8');
const INDEX = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

/** Ajaa skriptin mock-ikkunassa; palauttaa { ikkuna, ohjattu } (ohjattu = replace-kutsun osoite tai null). */
function aja({ pathname = '/', search = '', hash = '', tallennus = null, standalone = false,
  displayStandalone = false, kuori = false, tallennusHeittaa = false, dokumentti = true } = {}) {
  const tila = { ohjattu: null };
  const ikkuna = {
    location: { pathname, search, hash, replace(url) { tila.ohjattu = url; } },
    navigator: { standalone },
    matchMedia: (q) => ({ matches: displayStandalone && q === '(display-mode: standalone)' }),
    localStorage: {
      getItem(k) {
        if (tallennusHeittaa) throw new Error('SecurityError');
        return k === 'matkakirja-save-v1' ? tallennus : null;
      },
    },
  };
  if (dokumentti) ikkuna.document = {};
  if (kuori) ikkuna.webkit = { messageHandlers: { matkakirja: { postMessage() {} } } };
  ikkuna.window = ikkuna;
  vm.runInNewContext(KOODI, ikkuna);
  return { ikkuna, ohjattu: tila.ohjattu };
}

test('uusi kävijä jää etusivulle', () => {
  assert.equal(aja().ohjattu, null);
  assert.equal(aja({ search: '?utm_source=x' }).ohjattu, null);
  assert.equal(aja({ hash: '#artikkelit' }).ohjattu, null);
});

test('kotinäytön sovellus ohjataan (display-mode ja iOS navigator.standalone)', () => {
  assert.equal(aja({ displayStandalone: true }).ohjattu, 'pelaa.html');
  assert.equal(aja({ standalone: true, pathname: '/index.html' }).ohjattu, 'pelaa.html');
});

test('tallennus ohjaa; estetty localStorage ei kaada', () => {
  assert.equal(aja({ tallennus: '{"v":1}' }).ohjattu, 'pelaa.html');
  assert.equal(aja({ tallennus: '' }).ohjattu, 'pelaa.html');
  assert.equal(aja({ tallennusHeittaa: true }).ohjattu, null);
});

test('pelin parametrit ja #esittely ohjaavat, kysely ja hash säilyvät', () => {
  for (const p of ['lehti', 'lauta', 'dev', 'koe', 'kortti', 'omistaja', 'paivitys', 'turvatila']) {
    assert.equal(aja({ search: `?${p}=x` }).ohjattu, `pelaa.html?${p}=x`, p);
  }
  assert.equal(aja({ search: '?omistaja' }).ohjattu, 'pelaa.html?omistaja');
  // Vanhat natiiviversiot pyytävät index.html?lehti=<kaupunki>.
  assert.equal(aja({ pathname: '/index.html', search: '?lehti=helsinki' }).ohjattu, 'pelaa.html?lehti=helsinki');
  assert.equal(aja({ search: '?a=1&lauta=pallo&dev=ruutu', hash: '#x' }).ohjattu, 'pelaa.html?a=1&lauta=pallo&dev=ruutu#x');
  assert.equal(aja({ hash: '#esittely' }).ohjattu, 'pelaa.html#esittely');
  assert.equal(aja({ hash: '#Esittely' }).ohjattu, 'pelaa.html#Esittely');
});

test('iOS-kuori ohjataan', () => {
  assert.equal(aja({ kuori: true }).ohjattu, 'pelaa.html');
});

test('?esittely ohittaa ohjauksen, pelisivulla ei ohjata (ei silmukkaa)', () => {
  assert.equal(aja({ search: '?esittely', tallennus: '1', displayStandalone: true }).ohjattu, null);
  assert.equal(aja({ pathname: '/pelaa.html', search: '?lehti=x', tallennus: '1' }).ohjattu, null);
});

test('päätösfunktio on kutsuttavissa ilman automaattiajoa', () => {
  const { ikkuna, ohjattu } = aja({ dokumentti: false, tallennus: '1' });
  assert.equal(ohjattu, null, 'ilman documentia skripti ei ohjaa itse');
  const api = ikkuna.MatkakirjaOhjaus;
  assert.equal(api.ohjauksenSyy({ location: { pathname: '/', search: '?lehti=oslo', hash: '' } }), 'parametri');
  assert.equal(api.ohjauksenSyy({ location: { pathname: '/', search: '', hash: '' } }), '');
  assert.equal(api.pitaakoOhjata({ location: { pathname: '/', search: '', hash: '#esittely' } }), true);
  assert.equal(api.pelinOsoite({ location: { search: '?a', hash: '#b' } }), 'pelaa.html?a#b');
  for (const p of ['lehti', 'lauta', 'dev', 'koe', 'kortti', 'omistaja', 'paivitys', 'turvatila']) {
    assert.ok(api.PELIN_PARAMETRIT.includes(p), p);
  }
});

test('väliaikainen index.html ohjaa kaiken pelaa.html:ään ensimmäisenä skriptinä', () => {
  const ensimmainen = INDEX.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(ensimmainen, 'index.html:ssä ei ole skriptiä');
  assert.match(ensimmainen[1], /location\.replace\('pelaa\.html' \+ location\.search \+ location\.hash\)/);
  assert.ok(INDEX.indexOf('<script') < INDEX.indexOf('<link'), 'ohjaus ajetaan ennen muita latauksia');
  assert.match(INDEX, /<noscript><meta http-equiv="refresh" content="0; url=pelaa\.html"/);
  assert.match(INDEX, /<a href="pelaa\.html">/);
});
