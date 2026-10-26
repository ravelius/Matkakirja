import { test } from 'node:test';
import assert from 'node:assert/strict';
import { animoiKoko, TIIVISTYKSEN_MS } from '../js/tiivistys.js';

/** Tynkäelementti: koko riippuu luokasta, tyylit kirjataan. */
const laatikko = () => {
  const el = {
    kiinni: false,
    style: {},
    kuuntelijat: {},
    get offsetWidth() { return 1; },
    getBoundingClientRect() { return this.kiinni ? { width: 120, height: 24 } : { width: 320, height: 140 }; },
    addEventListener(t, f) { this.kuuntelijat[t] = f; },
    removeEventListener(t) { delete this.kuuntelijat[t]; },
  };
  return el;
};

test('koko liukuu mitatusta alusta mitattuun loppuun ja mitat vapautuvat lopuksi', async () => {
  const el = laatikko();
  animoiKoko(el, () => { el.kiinni = true; });
  assert.equal(el.style.width, '120px');
  assert.equal(el.style.height, '24px');
  assert.match(el.style.transition, new RegExp(`width ${TIIVISTYKSEN_MS}ms`));
  el.kuuntelijat.transitionend({ target: el, propertyName: 'width' });
  assert.equal(el.style.width, '');
  assert.equal(el.style.height, '');
  assert.equal(el.style.transition, '');
});

test('ilman kokomuutosta tai ennen asettelua ei animoida', () => {
  const el = laatikko();
  animoiKoko(el, () => {});
  assert.equal(el.style.width, undefined);
  const irti = { style: {}, getBoundingClientRect: () => ({ width: 0, height: 0 }) };
  let tehty = false;
  animoiKoko(irti, () => { tehty = true; });
  assert.ok(tehty, 'muutos tehdään aina');
  assert.equal(irti.style.width, undefined);
});
