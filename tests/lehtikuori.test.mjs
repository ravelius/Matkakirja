import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { LEHTIKUORI_TAPAHTUMA, ilmoitaNatiiville, lehtikuorenKaupunki } from '../js/lehtikuori.js';
import { suoraanKartallePaalla } from '../js/piirtokoe-asetus.js';

/*
 * LEHTIKUORI (natiivin pelin WKWebView, 23.9.2026): ?lehti=<kaupunki>
 * avaa pelkän kaupunkilehden ilman lautaa ja tallennusta, ja sulkeminen
 * kerrotaan natiiville.
 */
const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('lehtikuori: osoite, natiiviviesti ja ohitukset', () => {
  assert.equal(lehtikuorenKaupunki('?lehti=pariisi'), 'pariisi');
  assert.equal(lehtikuorenKaupunki('?lauta=pallo'), null);
  assert.equal(lehtikuorenKaupunki('?lehti=<script>'), null, 'vain kaupunkitunnus');
  // Viesti WKWebViewn käsittelijälle ja sivutapahtumana.
  const viestit = [];
  const tapahtumat = [];
  const ikkuna = {
    webkit: { messageHandlers: { matkakirja: { postMessage: (v) => viestit.push(v) } } },
    dispatchEvent: (e) => tapahtumat.push(e),
  };
  const v = ilmoitaNatiiville('lehti-suljettu', { kaupunki: 'pariisi' }, ikkuna);
  assert.deepEqual(v, { tapahtuma: 'lehti-suljettu', kaupunki: 'pariisi' });
  assert.deepEqual(viestit, [v]);
  assert.equal(tapahtumat[0].type, LEHTIKUORI_TAPAHTUMA);
  assert.doesNotThrow(() => ilmoitaNatiiville('x', {}, {}), 'selaimessa ilman kuorta ei kaadu');
  // Saapumisesitykset ohitetaan kuten Suoraan kartalle -tilassa.
  assert.equal(suoraanKartallePaalla('?lehti=pariisi'), true);
  assert.equal(suoraanKartallePaalla('?lauta=pallo'), false);
});

test('lehtikuori: käynnistys ei tallenna eikä avaa lautaa; vain lehti näkyy', () => {
  const main = lue('../js/main.js');
  assert.match(main, /const lehtiPeli = lehtiKaupunkiId\n\s*\? rakennaPikatiePeli\(Game, packById\('maailmankartta'\), lehtiKaupunkiId\) : null;/);
  assert.match(main, /ui = new UI\(lehtiPeli, \{ onNewGame: \(\) => \{\}, onChange: \(\) => \{\} \}\);\n[^\n]*\n\s*ui\.lehtikuori = true;\n\s*ui\.katselu = true;\n\s*ui\.mount\(\);/,
    'lippu ennen mountia, ei tallennusta');
  assert.match(main, /if \(!katseluPack && !lehtiPeli\) \{\n\s*natiiviKirjauduPelikeskukseen\(\);/);
  assert.match(lue('../js/ui.js'), /paivitaPallolauta\(\) \{\n[^\n]*\n\s*if \(this\.lehtikuori\) return;/);
  const css = lue('../css/styles.css');
  assert.match(css, /body\.lehtikuori > \.app,\nbody\.lehtikuori > \.paivitysruutu \{ display: none !important; \}/);
  // Lehti on bodyn suora lapsi, joten .app:n piilotus ei vie sitä.
  const html = lue('../index.html').replace(/<!--[\s\S]*?-->/g, '');
  assert.ok(html.indexOf('<dialog id="arrival-dialog"') > html.lastIndexOf('<div class="app"'));
});

test('lehtikuori: teko-silta ja natiivin alkutila', async () => {
  const {
    LEHDEN_TEOT, asetaLehtikuorenTila, kytkeTekoSilta, lehtikuorenTila,
  } = await import('../js/lehtikuori.js');
  const { Game } = await import('../js/game.js');
  const { packById } = await import('../js/pack.js');
  const { rakennaPikatiePeli } = await import('../js/kehittaja-pikatie.js');
  const peli = rakennaPikatiePeli(Game, packById('maailmankartta'), 'pariisi');
  assert.ok(peli, 'pikatiepeli');

  // Natiivi koodaa tilan base64url-JSONiksi risuaitaan (LehtiOsoite.cs).
  const tila = {
    raha: 123,
    kaupat: { kulttuuri: ['maailmankartta:pariisi'], pullat: [], julisteet: ['pariisi'], nostotehtavat: 2, aarrepisteOhje: true },
  };
  const b64 = Buffer.from(JSON.stringify(tila), 'utf8').toString('base64url');
  assert.deepEqual(lehtikuorenTila(`#tila=${b64}`), tila);
  assert.equal(lehtikuorenTila('#tila=%%%'), null, 'rikki → null');
  assert.equal(lehtikuorenTila(''), null);
  assert.ok(asetaLehtikuorenTila(peli, tila));
  assert.equal(peli.player.money, 123);
  assert.equal(peli.nostotehtavatRatkaistu, 2);

  const viestit = [];
  const ikkuna = { webkit: { messageHandlers: { matkakirja: { postMessage: (v) => viestit.push(v) } } } };
  assert.deepEqual(kytkeTekoSilta(peli, ikkuna), [...LEHDEN_TEOT]);
  assert.deepEqual(kytkeTekoSilta(peli, ikkuna), [], 'kerran per peli');

  assert.equal(peli.actionKulttuuri('pariisi', true).ok, false, 'natiivissa jo vastattu');
  assert.equal(viestit.length, 0, 'epäonnistunut teko ei lähde');
  assert.equal(peli.actionKulttuuri('lontoo', true, 25).ok, true);
  assert.equal(peli.player.money, 148);
  assert.deepEqual(viestit.at(-1), { tapahtuma: 'teko', teko: 'actionKulttuuri', args: ['lontoo', true, 25] });
  assert.equal(peli.myonnaJuliste('pariisi').uusi, false);
  assert.equal(peli.myonnaJuliste('lontoo').uusi, true);
  assert.equal(peli.merkitseAarrepisteOhje(), false, 'natiivissa jo nähty');
  assert.equal(peli.kirjaaNostotehtava(), 3);
  assert.deepEqual(viestit.map((v) => v.teko), ['actionKulttuuri', 'myonnaJuliste', 'kirjaaNostotehtava']);
});
