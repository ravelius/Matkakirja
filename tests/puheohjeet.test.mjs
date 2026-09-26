/*
 * Lukijaäänen oletusten näyttökopio pysyy workerin taulun tasalla.
 *
 * Totuus on tools/pollo/worker.js PUHE_PERSOONAT; js/puhe-oletukset.js
 * on saman taulun näyttökopio pelin säätödialogia varten (omistajan
 * tilaus 15.8.2026: oletusprompti näkyviin). Kaksi käsin ylläpidettyä
 * kopiota ajautuvat erilleen ensimmäisessä muutoksessa, ellei kone
 * valvo — siksi tämä testi vertaa niitä merkilleen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PUHE_OLETUKSET } from '../js/puhe-oletukset.js';
import { STRIIMIAANET_XAI, STRIIMIAANI_OLETUS } from '../js/puhe.js';
import { valitsePuhemoottori } from '../tools/pollo/worker.js';

function workerinPersoonat() {
  const koodi = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  const alku = koodi.indexOf('const PUHE_PERSOONAT = {');
  assert.ok(alku >= 0, 'workerista ei löytynyt PUHE_PERSOONAT-taulua');
  const loppu = koodi.indexOf('\n};', alku);
  assert.ok(loppu > alku, 'PUHE_PERSOONAT-taulun loppua ei löytynyt');
  const lohko = koodi.slice(alku + 'const PUHE_PERSOONAT ='.length, loppu + 2);
  // Lohko on pelkkä olioliteraali merkkijonoliitoksineen — ei koodia.
  // eslint-disable-next-line no-new-func
  return new Function(`return (${lohko});`)();
}

test('js/puhe-oletukset.js vastaa workerin persoonataulua merkilleen', () => {
  const worker = workerinPersoonat();
  assert.deepEqual(Object.keys(PUHE_OLETUKSET).sort(), Object.keys(worker).sort(),
    'persoonalistat eroavat — päivitä js/puhe-oletukset.js');
  for (const [nimi, oletus] of Object.entries(worker)) {
    assert.equal(PUHE_OLETUKSET[nimi].aani, oletus.aani,
      `${nimi}: ääni eroaa workerista — päivitä js/puhe-oletukset.js`);
    assert.equal(PUHE_OLETUKSET[nimi].ohje, oletus.ohje,
      `${nimi}: ohje eroaa workerista — päivitä js/puhe-oletukset.js`);
  }
});

/*
 * xAI-striimiäänet (omistaja 27.9.2026): workerin XAI_AANET-taulu ja
 * kehittäjävalikon näyttökopio js/puhe.js STRIIMIAANET_XAI pysyvät
 * samoina, ja oletusääni ara on molemmissa.
 */
test('js/puhe.js STRIIMIAANET_XAI vastaa workerin XAI_AANET-taulua', () => {
  const koodi = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  const osuma = koodi.match(/const XAI_AANET = (\[[^\]]*\]);/);
  assert.ok(osuma, 'workerista ei löytynyt XAI_AANET-taulua');
  // eslint-disable-next-line no-new-func
  const worker = new Function(`return (${osuma[1]});`)();
  assert.deepEqual(STRIIMIAANET_XAI, worker, 'äänilistat eroavat — päivitä js/puhe.js');
  assert.ok(worker.includes(STRIIMIAANI_OLETUS), 'oletusääni puuttuu listalta');
  assert.match(koodi, /const XAI_AANI_OLETUS = 'ara';/, 'workerin oletusääni ei ole ara');
});

test('valitsePuhemoottori: xAI kun avain on, OpenAI varalla, null ilman avaimia', () => {
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'xai' }), 'xai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o' }), 'xai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'openai' }), 'openai');
  assert.equal(valitsePuhemoottori({ OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'xai' }), 'openai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', PUHE_MOOTTORI: 'openai' }), 'xai');
  assert.equal(valitsePuhemoottori({}), null);
});
