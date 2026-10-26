// Selaimen kävijäping (js/kaynti.js): kerran istunnossa, omistaja merkitään, paikallinen ja automaatio ohitetaan.
import test from 'node:test';
import assert from 'node:assert/strict';
import { lahetaKaynti, kayntiSallittu, merkitseOmistajaOsoitteesta, onOmistaja } from '../js/kaynti.js';
import { PELI } from '../js/lahteet.js';

function varasto() {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), m };
}
const julkinen = { hostname: 'matkakirja.app', protocol: 'https:', search: '' };

test('kerran istunnossa per tapahtuma, runko ilman henkilötietoja', () => {
  const lahetetyt = [];
  const a = { laheta: (r) => lahetetyt.push(r), istunto: varasto(), varasto: varasto(), sijainti: julkinen, nav: {} };
  const r = lahetaKaynti('avaus', 'v2500', a);
  assert.deepEqual(r, { tehtava: 'kaynti', alusta: 'web', versio: 'v2500', tapahtuma: 'avaus', omistaja: false });
  assert.equal(lahetaKaynti('avaus', 'v2500', a), null);
  assert.ok(lahetaKaynti('apuraha', 'v2500', a));
  assert.equal(lahetetyt.length, 2);
});

test('omistaja merkitään vain osoitteesta', () => {
  const v = varasto();
  merkitseOmistajaOsoitteesta({ search: '?omistaja' }, v);
  assert.equal(onOmistaja(v), true);
  const lahetetyt = [];
  lahetaKaynti('avaus', '', { laheta: (r) => lahetetyt.push(r), istunto: varasto(), varasto: v, sijainti: julkinen, nav: {} });
  assert.equal(lahetetyt[0].omistaja, true);
});

test('paikallinen palvelin ja automaatioselain eivät lähetä', () => {
  assert.equal(kayntiSallittu({ hostname: '127.0.0.1', protocol: 'http:' }, {}), false);
  assert.equal(kayntiSallittu({ hostname: 'localhost', protocol: 'http:' }, {}), false);
  assert.equal(kayntiSallittu(julkinen, { webdriver: true }), false);
  assert.equal(kayntiSallittu(julkinen, {}), true);
});

test('lähetysvirhe ei heitä', () => {
  assert.doesNotThrow(() => lahetaKaynti('avaus', '', { laheta: () => { throw new Error('verkko'); }, istunto: varasto(), varasto: varasto(), sijainti: julkinen, nav: {} }));
});

test('tekijätiedoissa rivi nimettömästä laskennasta', () => {
  assert.equal(PELI.yksityisyys, 'Peli laskee nimettömiä käyntikertoja; IP-osoitteita ei tallenneta.');
});

test('kehittäjätila ja esittelylinssit eivät tee omistajaa (arvioija lasketaan ulkopuoliseksi)', () => {
  const v = varasto();
  v.setItem('matkakirja-kehittaja', '1');
  v.setItem('matkakirja-esittelylinssit', '1');
  merkitseOmistajaOsoitteesta({ search: '?lauta=pallo' }, v);
  assert.equal(onOmistaja(v), false);
  const lahetetyt = [];
  lahetaKaynti('esittelylinssit', 'v2500', { laheta: (r) => lahetetyt.push(r), istunto: varasto(), varasto: v, sijainti: julkinen, nav: {} });
  assert.equal(lahetetyt[0].omistaja, false);
});
