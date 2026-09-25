/*
 * Pulu avoimen paneelin yläpuolelle (PAATOKSET 50, js/pulu-paneelin-ylla.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { pulunAlareunaPaneelinYlla, PULUN_RAKO_PX } from '../js/pulu-paneelin-ylla.js';

test('pulu nousee paneelin yläreunan päälle rakoineen', () => {
  // 844 px ikkuna, paneeli alkaa 600 px:stä, pulu 48 px.
  const bottom = pulunAlareunaPaneelinYlla({ paneelinYla: 600, puluKorkeus: 48, ikkunanKorkeus: 844 });
  assert.equal(bottom, 844 - 600 + PULUN_RAKO_PX);
  // Pulun alareuna on siis paneelin yläreunan yläpuolella.
  assert.ok(844 - bottom < 600);
});

test('pulu ei nouse yläpalkin alle: silloin paikka jää ennalleen', () => {
  assert.equal(pulunAlareunaPaneelinYlla({
    paneelinYla: 90, puluKorkeus: 48, ikkunanKorkeus: 844, ylaraja: 60,
  }), null);
});

test('puuttuva mitta ei siirrä pulua', () => {
  assert.equal(pulunAlareunaPaneelinYlla({ paneelinYla: NaN, puluKorkeus: 48, ikkunanKorkeus: 844 }), null);
});

test('vahti lepää kartan liikkeen ajan (sulavuus kohta 17): kierros ohitetaan, kun kotelo on pallolauta-liikkuu', async () => {
  const { asennaPuluPaneelinYlla } = await import('../js/pulu-paneelin-ylla.js');
  let liikkuu = false;
  let tarkistuksia = 0;
  const tick = [];
  const win = {
    location: { search: '' }, innerHeight: 844,
    setInterval: (fn) => { tick.push(fn); return 1; }, clearInterval() {},
    addEventListener() {}, removeEventListener() {},
    getComputedStyle: () => ({ display: 'block', visibility: 'visible', opacity: '1' }),
  };
  const nappi = {
    classList: { contains: (c) => c === 'pollo-kelluu', add() {}, remove() {} },
    style: { setProperty() {}, removeProperty() {} },
    getBoundingClientRect: () => { tarkistuksia += 1; return { left: 300, right: 348, top: 700, bottom: 748, width: 48, height: 48 }; },
    getClientRects: () => [{}],
    isConnected: true, offsetParent: {},
  };
  const doc = {
    defaultView: win,
    elementsFromPoint: () => [],
    querySelector: (sel) => (sel === '.pallolauta-liikkuu' ? (liikkuu ? {} : null) : null),
  };
  const vahti = asennaPuluPaneelinYlla(nappi, doc);
  assert.ok(vahti && tick.length === 1);
  const ennen = tarkistuksia;
  tick[0](); tick[0]();
  assert.ok(tarkistuksia > ennen, 'levossa kierros tarkistaa');
  const levossa = tarkistuksia;
  liikkuu = true;
  tick[0](); tick[0](); tick[0]();
  assert.equal(tarkistuksia, levossa, 'liikkeessä ei rect-lukuja');
  assert.equal(vahti.tila().ohitettuja, 3);
  liikkuu = false;
  tick[0]();
  assert.ok(tarkistuksia > levossa, 'liikkeen jälkeen kierros jatkuu');
  vahti.pura();
});
