/*
 * ROIKKUVA KOSKETUS — yksi sormi panoroi aina.
 *
 * Omistajan iPad-havainto 7.9.2026 ilta (Ihmisen matka -linssin
 * lopussa), sanatarkasti: *"Kartan pyörittämisessä on joku bugi, koska
 * näyttää ihan kuin yksi sormi olisi koko ajan painettuna. jos koitan
 * yhdellä sormella vierittää, niin kartta zoomautuukin sisään ja ulos,
 * eikä vierity."*
 *
 * Juurisyy ja koko ketju: docs/moduulit/karttapallo.md luku 17.
 * Ruudulla ketjun ajaa savuke tools/savukkeet/savuke-pallo-kosketus.mjs;
 * tämä testi vartioi ne säännöt, jotka eivät vaadi selainta:
 * nollaimen lopputila, kerroksen ilmoitus ja pallon sormivahdin kytkennät.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  KOSKETUKSEN_VAPAUTUS,
  nollaaKosketusOhjaimet,
  vapautaKosketus,
} from '../js/ui-apurit.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/** OrbitControlsin mallinnus: yksityiset kentät ja dokumentin kuulijat. */
function valeOhjaimet({ pointers = [], paikat = {} } = {}) {
  const poistetut = [];
  const doc = {
    removeEventListener(laji, fn) { poistetut.push([laji, fn]); },
  };
  return {
    poistetut,
    state: 2,
    _pointers: [...pointers],
    _pointerPositions: { ...paikat },
    _onPointerMove: function move() {},
    _onPointerUp: function up() {},
    domElement: { ownerDocument: doc },
  };
}

test('nollaaKosketusOhjaimet vie listan, paikat, tilan ja dokumentin kuulijat', () => {
  const ohj = valeOhjaimet({ pointers: [7, 9], paikat: { 7: { x: 1, y: 2 }, 9: { x: 3, y: 4 } } });
  assert.equal(nollaaKosketusOhjaimet(ohj), true, 'roikkuva sormi löytyi');
  assert.deepEqual(ohj._pointers, []);
  assert.deepEqual(Object.keys(ohj._pointerPositions), []);
  assert.equal(ohj.state, -1, 'STATE.NONE');
  assert.deepEqual(ohj.poistetut.map(([laji]) => laji), ['pointermove', 'pointerup']);
  // Toinen kerta on tyhjäkäynti: mitään ei ollut nollattavana.
  assert.equal(nollaaKosketusOhjaimet(ohj), false);
  assert.equal(nollaaKosketusOhjaimet(null), false);
});

test('varapolku: ilman _pointers-kenttää unohtuneille lähetetään pointercancel', () => {
  const laheteyt = [];
  const ohj = {
    domElement: { dispatchEvent(e) { laheteyt.push(e.type); } },
  };
  globalThis.PointerEvent ??= class { constructor(tyyppi) { this.type = tyyppi; } };
  assert.equal(nollaaKosketusOhjaimet(ohj, [3, 4]), true);
  assert.deepEqual(laheteyt, ['pointercancel', 'pointercancel']);
});

test('vapautaKosketus lähettää dokumentille kerroksen ilmoituksen', () => {
  const nahdyt = [];
  const doc = { dispatchEvent(e) { nahdyt.push([e.type, e.detail]); return true; } };
  assert.equal(vapautaKosketus({ paitsi: 12, doc }), true);
  assert.equal(nahdyt[0][0], KOSKETUKSEN_VAPAUTUS);
  assert.deepEqual(nahdyt[0][1], { paitsi: 12 });
  // Ilman dokumenttia (yksikkötestit, työhuoneen esikatselu) ei mitään.
  assert.equal(vapautaKosketus({ doc: null }), false);
});

test('pallon sormivahti lukee noston dokumentista ja nollaa kirjaston listan', () => {
  const pallo = lue('../js/pallo.js');
  const ele = pallo.slice(pallo.indexOf('export function asennaPallonEleet'));
  // Sormet ovat pointerId-joukko: pelkkä laskuri ei kertonut, KUKA jäi.
  assert.match(ele, /const sormet = \{ alhaalla: 0, nipistys: false, idt: new Set\(\) \};/);
  // Alas kaappausvaiheessa ENNEN kirjaston omaa pointerdownia kankaalla.
  assert.match(ele, /kuuntele\(doc, 'pointerdown', sormiAlas, true\)/);
  assert.match(ele, /kuuntele\(doc, 'pointerup', irrota, true\)/);
  assert.match(ele, /kuuntele\(doc, 'pointercancel', irrota, true\)/);
  // Ensimmäinen sormi siivoaa roikkuvan HETI (ennen kirjastoa).
  assert.match(ele, /if \(sormet\.idt\.size === 0\) nollaaKosketusOhjaimet\(ohjaimet, sormet\.idt\);\s*\n\s*ohjaimet\.autoRotate = false;/);
  // Turvaverkko: tausta, fokus, kerroksen katoaminen.
  for (const laji of [KOSKETUKSEN_VAPAUTUS, 'visibilitychange', 'blur', 'pagehide']) {
    assert.ok(ele.includes(laji === KOSKETUKSEN_VAPAUTUS ? 'KOSKETUKSEN_VAPAUTUS' : `'${laji}'`),
      `${laji} puuttuu sormivahdista`);
  }
  // Kaikki kytkennät puretaan pallon mukana.
  assert.match(ele, /pura: \(\) => \{ pysaytaLiuku\(\); pysaytaRulla\(\); puraSormivahti\(\); \}/);
});

test('kerrokset, jotka katoavat kesken kosketuksen, ilmoittavat siitä', () => {
  // Valikon sulku tapahtuu pointerdownissa: sama sormi jatkaa usein
  // panorointiin, joten se säästetään (paitsi).
  assert.match(lue('../js/ui-apurit.js'), /vapautaKosketus\(\{ paitsi: tapahtuma\.pointerId \?\? null, doc \}\)/);
  // Kuplan sulkeva napautus poistaa kuplan kartan päältä.
  assert.match(lue('../js/pollo.js'), /vapautaKosketus\(\{ paitsi: tapahtuma\.pointerId \?\? null, doc: this\.doc \}\)/);
  // Linssin purku vie paneelin, lamput ja loppulapun kerralla.
  const aikajana = lue('../js/aikajana.js');
  const pura = aikajana.slice(aikajana.indexOf('  pura() {'));
  // Muistin tallennus ja nostokortin purku tulivat väliin (7.9.2026),
  // joten ikkuna on hieman leveämpi — mutta yhä ennen kelluvia kortteja.
  assert.match(pura.slice(0, 2200), /vapautaKosketus\(\);/);
});
