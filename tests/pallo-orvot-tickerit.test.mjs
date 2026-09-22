/*
 * ORVOT FRAME-TICKERIT (Fable 22.9.2026): globe.gl-paketin latauksessa
 * luodut kerrosoliot pyörittivät neljää rAF-ketjua myös levossa.
 * Suodatin pudottaa paketin suorituksen ajan vain frame-tickerin nuolen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { suodataOrvotTickerit, ORVON_TICKERIN_LAHDE } from '../js/pallo.js';

// Täsmälleen paketin muoto (globe.gl-2.46.2.min.js, frame-ticker animateOnce).
const tickerinNuoli = () => (0, eval)('(function(e){return function(){return e.onFrame()}})')({ onFrame() {} });

test('suodatin pudottaa vain frame-tickerin nuolen ja vain latauksen ajan', () => {
  const rekisteroidyt = [];
  const ikkuna = { requestAnimationFrame: (fn) => { rekisteroidyt.push(fn); return rekisteroidyt.length; } };
  const alkuperainen = ikkuna.requestAnimationFrame;
  const orvot = suodataOrvotTickerit(ikkuna);
  assert.equal(String(tickerinNuoli()), ORVON_TICKERIN_LAHDE);
  assert.equal(ikkuna.requestAnimationFrame(tickerinNuoli()), 0, 'orpo ei rekisteröidy');
  const oma = () => {};
  assert.equal(ikkuna.requestAnimationFrame(oma), 1, 'muut menevät läpi');
  function onFrame() {}
  ikkuna.requestAnimationFrame(onFrame);
  assert.equal(rekisteroidyt.length, 2, 'nimetty funktio ei ole orpo');
  assert.equal(orvot.lopeta(), 1);
  assert.equal(ikkuna.requestAnimationFrame, alkuperainen, 'alkuperäinen palautuu');
  ikkuna.requestAnimationFrame(tickerinNuoli());
  assert.equal(rekisteroidyt.length, 3, 'latauksen jälkeen oman pallon tickerit kulkevat');
});

test('jos joku kääri rAF:n väliin, ketju pysyy ehjänä ja suodatus loppuu', () => {
  const rekisteroidyt = [];
  const ikkuna = { requestAnimationFrame: (fn) => { rekisteroidyt.push(fn); return rekisteroidyt.length; } };
  const orvot = suodataOrvotTickerit(ikkuna);
  const alla = ikkuna.requestAnimationFrame;
  const kaare = (fn) => alla(fn); // esim. kehysprofiili
  ikkuna.requestAnimationFrame = kaare;
  orvot.lopeta();
  assert.equal(ikkuna.requestAnimationFrame, kaare, 'kääre jää paikalleen');
  ikkuna.requestAnimationFrame(tickerinNuoli());
  assert.equal(rekisteroidyt.length, 1, 'suodatin ei enää pudota');
});

test('suodatin kytketään kirjaston latausyritykseen ja puretaan päätöksessä', () => {
  const lahde = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  const yritys = lahde.slice(lahde.indexOf('function yritaPallokirjasto'), lahde.indexOf('export function lataaPallokirjasto'));
  assert.match(yritys, /const orvot = suodataOrvotTickerit\(ikkuna\)/);
  assert.match(yritys, /const pudotettuja = orvot\.lopeta\(\)/);
  assert.ok(yritys.indexOf('suodataOrvotTickerit(ikkuna)') < yritys.indexOf('doc.head.appendChild(s)'), 'ennen skriptin lisäystä');
});
