/*
 * PÖLLÖN KEHITTÄJÄKOODI SAVUKKEISSA (Julkaisija 28.9.2026).
 *
 * Savukkeet, jotka eivät katkaise eivätkä jäljittele pöllöpalvelinta,
 * lähettävät x-pollo-kehittaja-otsakkeen VAIN pöllön originiin
 * (tools/savukkeet/pollo-kehittajakoodi.mjs), jotta ajot eivät kuluta
 * Pulun IP-kohtaista päivärajaa. Koodin arvoa ei saa tulostaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

import {
  lisaaPolloKehittajakoodi, onPolloOsoite, POLLO_ORIGIN, POLLO_KEHITTAJA_OTSAKE, POLLO_TESTI_OTSAKE,
} from '../tools/savukkeet/pollo-kehittajakoodi.mjs';
import { POLLOPALVELIN } from '../js/packs/pollo-asetukset.js';

const KOODI = 'testikoodi-ei-oikea-9f3';

function tynkaKohde() {
  const reitit = [];
  return { reitit, async route(ehto, kasittelija) { reitit.push({ ehto, kasittelija }); } };
}

test('origin on pelin pöllöpalvelin', () => {
  assert.ok(POLLOPALVELIN.startsWith('https://'));
  assert.equal(POLLO_ORIGIN, new URL(POLLOPALVELIN).origin);
});

test('reitti osuu vain pöllöpalvelimen originiin', () => {
  assert.ok(onPolloOsoite(new URL(POLLOPALVELIN)));
  assert.ok(onPolloOsoite(`${POLLOPALVELIN}/jotain?x=1`));
  for (const vieras of [
    'https://matkakirja-ehdotukset.samireivinen.workers.dev/',
    'https://matkakirja-sahke.samireivinen.workers.dev/',
    `${POLLOPALVELIN}.evil.example/`,
    `https://evil.example/?u=${encodeURIComponent(POLLOPALVELIN)}`,
    `http://${new URL(POLLOPALVELIN).host}/`,
    'http://127.0.0.1:8734/index.html',
    'https://media.matkakirja.app/audio/x.mp3',
    'ei osoite',
  ]) assert.ok(!onPolloOsoite(vieras), vieras);
});

test('koodi lisätään pöllöpyyntöön fallbackilla, muut otsakkeet säilyvät, arvoa ei tulosteta', async () => {
  const kohde = tynkaKohde();
  const tulosteet = [];
  const alkuperaiset = { log: console.log, warn: console.warn, error: console.error };
  console.log = console.warn = console.error = (...a) => tulosteet.push(a.join(' '));
  let ok;
  try {
    ok = await lisaaPolloKehittajakoodi(kohde, {
      env: { POLLO_KEHITTAJAKOODI: KOODI }, varoita: (v) => tulosteet.push(v),
    });
  } finally { Object.assign(console, alkuperaiset); }
  assert.equal(ok, true);
  assert.equal(kohde.reitit.length, 1);
  const { ehto, kasittelija } = kohde.reitit[0];
  assert.equal(typeof ehto, 'function', 'reitin ehto on funktio, ei kaikki-glob');
  assert.ok(ehto(new URL(`${POLLOPALVELIN}/`)));
  assert.ok(!ehto(new URL('https://example.com/')));
  let saatu = null;
  await kasittelija({
    request: () => ({ headers: () => ({ 'content-type': 'application/json' }) }),
    fallback: (v) => { saatu = v; },
    continue: () => assert.fail('continue ohittaisi savukkeen omat reitit'),
  });
  assert.deepEqual(saatu, { headers: { 'content-type': 'application/json', [POLLO_KEHITTAJA_OTSAKE]: KOODI, [POLLO_TESTI_OTSAKE]: '1' } });
  assert.ok(!tulosteet.some((t) => t.includes(KOODI)), 'koodi päätyi tulosteeseen');
});

test('ilman muuttujaa: ei reittiä, varoitus ilman arvoa', async () => {
  const kohde = tynkaKohde();
  const varoitukset = [];
  const ok = await lisaaPolloKehittajakoodi(kohde, { env: {}, varoita: (v) => varoitukset.push(v) });
  assert.equal(ok, false);
  assert.equal(kohde.reitit.length, 0);
  assert.equal(varoitukset.length, 1);
  assert.match(varoitukset[0], /POLLO_KEHITTAJAKOODI puuttuu/);
  const tyhja = tynkaKohde();
  assert.equal(await lisaaPolloKehittajakoodi(tyhja, { env: { POLLO_KEHITTAJAKOODI: '  ' }, varoita: () => {} }), false);
  assert.equal(tyhja.reitit.length, 0);
});

test('apuri ei käytä extraHTTPHeadersia eikä tulosta koodia', () => {
  const lahde = readFileSync(new URL('../tools/savukkeet/pollo-kehittajakoodi.mjs', import.meta.url), 'utf8');
  assert.ok(!/setExtraHTTPHeaders|extraHTTPHeaders\s*:/.test(lahde));
  assert.ok(!/(console\.\w+|varoita)\([^)]*\bkoodi\b/.test(lahde));
});

/*
 * TUOTANTOON OSUVAT SAVUKKEET (kartoitus 28.9.2026): lataavat pelin eivätkä
 * katkaise/jäljittele pöllöpalvelinta. Muut savukkeet katkaisevat kaiken
 * ulkoisen, reitittävät workers.dev:n tai ajavat workerin paikallisena.
 */
const TUOTANTOON_OSUVAT = [
  'tools/savuke-karttazoom.mjs',
  'tools/savukkeet/mittaa-kirjastokokeilu.mjs',
  'tools/savukkeet/mittaa-pallon-vektorit.mjs',
  'tools/savukkeet/savuke-aanilataus.mjs',
  'tools/savukkeet/savuke-aarrekuva.mjs',
  'tools/savukkeet/savuke-geo.mjs',
  'tools/savukkeet/savuke-maapilleri.mjs',
  'tools/savukkeet/savuke-maaselain.mjs',
  'tools/savukkeet/savuke-matkakirjakulma.mjs',
  'tools/savukkeet/savuke-musiikin-saadin.mjs',
  'tools/savukkeet/savuke-paivityspopup.mjs',
  'tools/savukkeet/savuke-pallolaatat-offline.mjs',
  'tools/savukkeet/savuke-postikortti.mjs',
  'tools/savukkeet/savuke-rekisterointi.mjs',
  'tools/savukkeet/savuke-valikon-sulku.mjs',
];

test('tuotantoon osuvat savukkeet käyttävät apuria jokaisella sivulla', () => {
  for (const polku of TUOTANTOON_OSUVAT) {
    const lahde = readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
    assert.match(lahde, /import \{ lisaaPolloKehittajakoodi \} from '\.\/(savukkeet\/)?pollo-kehittajakoodi\.mjs';/, polku);
    const sivuja = (lahde.match(/\.newPage\(/g) ?? []).length;
    const kutsuja = (lahde.match(/await lisaaPolloKehittajakoodi\(/g) ?? []).length;
    assert.ok(kutsuja >= 1 && kutsuja >= sivuja, `${polku}: ${kutsuja} kutsua, ${sivuja} sivua`);
  }
});

/*
 * VARTIJA UUSILLE SAVUKKEILLE: jokainen pelin lataava savuke joko
 * katkaisee/jäljittelee pöllön (workers.dev- tai pollo-reitti, kaikki-
 * ulkoinen-katkaisu, paikallinen worker) tai käyttää apuria.
 */
test('uusi pelin lataava savuke ei kuluta Pulun rajaa huomaamatta', () => {
  const tiedostot = [
    ...readdirSync(new URL('../tools/savukkeet/', import.meta.url))
      .filter((n) => n.endsWith('.mjs')).map((n) => `tools/savukkeet/${n}`),
    ...readdirSync(new URL('../tools/', import.meta.url))
      .filter((n) => /^savuke-.*\.mjs$/.test(n)).map((n) => `tools/${n}`),
  ];
  const suojattu = /workers\\?\.dev|matkakirja-pollo|POLLOPALVELIN|lisaaPolloKehittajakoodi|route\(\s*\(\w+\)\s*=>\s*!|\(\?!localhost\)|route\('\*\*:\/\/\*\*'/;
  const puuttuu = [];
  for (const polku of tiedostot) {
    const lahde = readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
    if (!/\.goto\(/.test(lahde)) continue;
    if (!/index\.html|\?lauta=|localhost|127\.0\.0\.1|OSOITE|osoite/.test(lahde)) continue;
    if (/minipulu\.html|traileri\.html/.test(lahde)) continue; // eivät lataa peliä
    if (!suojattu.test(lahde)) puuttuu.push(polku);
  }
  assert.deepEqual(puuttuu, []);
});
