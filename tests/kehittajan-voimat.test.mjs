import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  KEHITTAJAN_VOIMA_ASKEL, KEHITTAJAN_VOIMA_MAX, KEHITTAJAN_VOIMA_MIN,
  KEHITTAJAN_VOIMA_OLETUS, asetaKehittajanKerroin, kehittajanKerroin, kehittajanKerroinTeksti,
  kuunteleKehittajanKerrointa, saadaKehittajanKerrointa,
} from '../js/kehittajan-voimat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('kerroin on oletuksena 1 ja pysyy rajoissa', () => {
  assert.equal(kehittajanKerroin('tausta'), 1);
  /*
   * VAIN TAUSTAÄÄNI ON JÄLJELLÄ (9.9.2026). Musiikin ×0,25…×3,0
   * -askellin poistettiin: se oli lineaarinen ja kapea, eikä sen arvo
   * mennyt iPhonessa perille lainkaan. Musiikilla on nyt oma liuku
   * 0–100 omalla käyrällään (js/musiikkivalitsin.js), ja kaksi
   * säädintä samalle asialle oli osa alkuperäistä vikaa.
   */
  assert.deepEqual(KEHITTAJAN_VOIMA_OLETUS, { tausta: 1 });
  assert.equal(kehittajanKerroin('musiikki'), 1, 'poistettu laji ei saa muuttua säätimeksi');
  assert.equal(kehittajanKerroin('olematon'), 1);
  assert.equal(asetaKehittajanKerroin('tausta', 99), KEHITTAJAN_VOIMA_MAX);
  assert.equal(asetaKehittajanKerroin('tausta', 0), KEHITTAJAN_VOIMA_MIN);
  assert.equal(asetaKehittajanKerroin('tausta', 'roska'), 1);
});

test('plus ja miinus liikuttavat askelen ja kuuntelija kuulee muutoksen', () => {
  asetaKehittajanKerroin('tausta', 1);
  const kuultu = [];
  const irti = kuunteleKehittajanKerrointa('tausta', (v) => kuultu.push(v));
  assert.equal(saadaKehittajanKerrointa('tausta', 1), 1 + KEHITTAJAN_VOIMA_ASKEL);
  assert.equal(saadaKehittajanKerrointa('tausta', -1), 1);
  assert.deepEqual(kuultu, [1.1, 1]);
  irti();
  assert.equal(kehittajanKerroinTeksti('tausta'), '×1,0');
});

test('ambienssi ja siirtymämusiikki kertovat tasonsa kehittäjän kertoimella', () => {
  /*
   * Väistö luetaan nyt avauksenMaisemanKerroin-funktiosta (7.9.2026:
   * avauksen aikana kertoja ei väistä terminaalia), joten kaava on
   * tavoite × kerroin × kehittäjän säädin — ja se sama funktio
   * palauttaa tavallisessa tilassa `oma.vaimennus`:n sellaisenaan.
   */
  const virta = lue('../js/ambience-stream.js');
  assert.match(virta, /oma\.tavoite \* avauksenMaisemanKerroin\(oma\) \* kehittajanKerroin\('tausta'\)/);
  assert.match(virta, /avauksenMaisemanKerroin = \(oma\) =>[\s\S]{0,200}oma\?\.vaimennus \?\? 1/);
  // Musiikkireitit eivät lue kehittäjän kerrointa suoraan vaan
  // js/musiikkivalitsin.js:n musiikinKerroin()-funktion kautta; sitä
  // vartioi tests/musiikin-kerroin.test.mjs.
  assert.match(lue('../js/siirtymamusiikki.js'), /raidanTaso = [\s\S]{0,160}musiikinKerroin\(\)/);
  const html = lue('../index.html');
  /*
   * TAUSTAÄÄNI ON LIUKU MUIDEN ÄÄNENTASOJEN JOUKOSSA (omistaja
   * 11.9.2026: *"taustaääni on oudosti erillään muista
   * äänisäätimistä"*). Entinen +/- kerroinaskellin poistui
   * kehittäjälohkosta; kerroin ja sen kuuntelijat ovat ennallaan.
   */
  assert.match(html, /class="aanivoima" data-liuku="tausta"/);
  assert.match(html, /id="voima-tausta"[\s\S]{0,200}type="range"/);
  assert.doesNotMatch(html, /data-laji="tausta"/,
    'taustaäänellä on taas kaksi säädintä — kerroinaskellin ja liuku');
  assert.match(lue('../js/main.js'), /avain: 'tausta'[\s\S]{0,200}asetaKehittajanKerroin\('tausta', arvo\)/);
  // Musiikin rivi on nyt liuku 0–100 eikä +/- askellin (omistaja 9.9.2026).
  assert.match(html, /id="kehittaja-musiikki-liuku"[\s\S]{0,200}type="range"/);
  assert.doesNotMatch(html, /data-laji="musiikki"/,
    'musiikilla on taas kaksi säädintä — kerroinaskellin ja liuku');
});

test('Sarajevon äänimaisema ei ole kirkonkelloja (omistaja 3.9.2026)', () => {
  const ehdokkaat = lue('../js/aani-ehdokkaat.js');
  const sarajevo = ehdokkaat.slice(ehdokkaat.indexOf('    sarajevo: ['), ehdokkaat.indexOf('    sofia: ['));
  assert.doesNotMatch(sarajevo, /stjosephchurch/);
  assert.match(sarajevo, /ferhadija/);
});
