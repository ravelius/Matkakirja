import test from 'node:test';
import assert from 'node:assert/strict';
import { asennaLivianKasvot } from '../js/livia-eleet.js';
import { ilmoitaLivianKasvopuhe } from '../js/livia-puhetila.js';

// Rajattu DOM- ja kelloharness: ajaa oikeaa livia-eleet-sovitinta ilman selainta.
function ymparisto(t) {
  let c, now = 1000, id = 0;
  t.after(() => c?.tuhoa());
  const raf = new Map(), timers = new Map(), observers = [];
  class El extends EventTarget {
    children = []; hidden = false; isConnected = true; style = {}; textContent = ''; className = ''; attrs = {};
    classList = { items: new Set(), add: (...xs) => xs.forEach(x => this.classList.items.add(x)), remove: (...xs) => xs.forEach(x => this.classList.items.delete(x)), contains: x => this.classList.items.has(x), toggle: (x, on) => on ? this.classList.items.add(x) : this.classList.items.delete(x) };
    ctx = { rects: [], clearRect() { this.rects = []; }, fillRect(...r) { this.rects.push(r); }, imageSmoothingEnabled: true };
    append(e) { this.children.push(e); e.parent = this; }
    remove() { this.isConnected = false; if (this.parent) this.parent.children = this.parent.children.filter(x => x !== this); }
    setAttribute(n, v) { this.attrs[n] = v; }
    getContext() { return this.ctx; }
    querySelector() { return this.children.find(x => x.className === 'pollo-odottaa' && x.isConnected) || null; }
  }
  const doc = new EventTarget(), lehti = new El(), win = new EventTarget();
  lehti.id = 'arrival-dialog'; lehti.localName = 'dialog';
  doc.hidden = false; doc.body = new El(); doc.createElement = () => new El(); doc.querySelector = () => null;
  doc.getElementById = key => key === 'arrival-dialog' ? lehti : null;
  const button = new El(), virta = new El(), reduced = new EventTarget(); reduced.matches = false;
  Object.assign(win, { innerWidth: 393, innerHeight: 852 }); doc.defaultView = win; doc.documentElement = { clientWidth: 393 };
  const set = (key, value) => { const old = Object.getOwnPropertyDescriptor(globalThis, key); Object.defineProperty(globalThis, key, { configurable: true, writable: true, value }); t.after(() => old ? Object.defineProperty(globalThis, key, old) : delete globalThis[key]); };
  set('requestAnimationFrame', fn => { raf.set(++id, fn); return id; }); set('cancelAnimationFrame', key => raf.delete(key));
  set('setTimeout', (fn, ms) => { timers.set(++id, { fn, at: now + ms }); return id; }); set('clearTimeout', key => timers.delete(key));
  set('matchMedia', () => reduced); set('getComputedStyle', e => ({ display: e.hidden ? 'none' : 'block', visibility: 'visible' }));
  set('MutationObserver', class { constructor(fn) { this.fn = fn; observers.push(this); } observe(el) { this.el = el; } disconnect() { this.el = null; } });
  set('addEventListener', (...args) => win.addEventListener(...args)); set('removeEventListener', (...args) => win.removeEventListener(...args));
  t.mock.method(performance, 'now', () => now);
  const tick = ms => { const end = now + ms; while (now < end) { now = Math.min(end, now + 20); const frames = [...raf.values()]; raf.clear(); frames.forEach(fn => fn(now)); for (const [key, value] of [...timers]) if (value.at <= now) { timers.delete(key); value.fn(); } } };
  const notify = el => observers.filter(o => o.el === el).forEach(o => o.fn([]));
  const pollo = { doc, nappi: button, virta, auki: true, haeUi: () => ({}) };
  c = asennaLivianKasvot(pollo); tick(5000); notify(button);
  const row = new El(); row.className = 'pollo-odottaa'; row.textContent = 'Hyvä kysymys. Käyn kysymässä pöllöltä, pieni hetki..'; virta.append(row);
  const token = {}; c.tilanne('waiting', { tunnus: token }); notify(virta); tick(3300);
  return { c, doc, win, reduced, tick, notify, token, row, virta, raf, canvas: doc.body.children[0].children[0] };
}

const poissa = canvas => !/data-part="whole-bird"/.test(canvas.innerHTML);

test('oma puhe ei palauta lintua aktiivisen chat-poissaolon aikana', t => {
  const e = ymparisto(t), speech = {}; assert.equal(poissa(e.canvas), true);
  ilmoitaLivianKasvopuhe(speech, true, 'Odota vielä.'); e.tick(100); assert.equal(poissa(e.canvas), true);
  ilmoitaLivianKasvopuhe(speech, false); e.tick(100); assert.equal(poissa(e.canvas), true);
});

test('reduced-motionin vaihto molempiin suuntiin säilyttää chat-poissaolon', t => {
  const e = ymparisto(t); assert.equal(poissa(e.canvas), true);
  e.reduced.matches = true; e.reduced.dispatchEvent(new Event('change')); e.tick(100); assert.equal(poissa(e.canvas), true);
  e.reduced.matches = false; e.reduced.dispatchEvent(new Event('change')); e.tick(100); assert.equal(poissa(e.canvas), true);
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), true); e.tick(1800); assert.equal(poissa(e.canvas), false);
});

test('pagehide peruu chat-paluun vaikka document.hidden ei ole vielä vaihtunut', t => {
  const e = ymparisto(t); assert.equal(poissa(e.canvas), true);
  e.win.dispatchEvent(new Event('pagehide'));
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), false);
  e.tick(3000);
  assert.doesNotMatch(e.canvas.innerHTML, /data-part="book"/);
});

test('chatvastaus säilyttää staattisen kirjaeleen koko oman puheen ajan', t => {
  const e = ymparisto(t), speech = {};
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), true);
  ilmoitaLivianKasvopuhe(speech, true, 'Tässä on pitkä vastaus.');
  e.tick(1700); assert.match(e.canvas.innerHTML, /data-part="book"/);
  e.tick(4300); assert.match(e.canvas.innerHTML, /data-part="book"/);
  ilmoitaLivianKasvopuhe(speech, false);
});

test('visibility hidden ja chatClose mitätöivät paluutokenin', t => {
  const e = ymparisto(t); e.doc.hidden = true; e.doc.dispatchEvent(new Event('visibilitychange'));
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), false);
});

test('uusi waiting syrjäyttää vanhan ja vain uuden vastaus palauttaa', t => {
  const e = ymparisto(t), uusi = {};
  assert.equal(e.c.tilanne('waiting', { tunnus: uusi }), true);
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), false);
  e.c.tilanne('waitingEnd', { tunnus: e.token });
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: uusi }), true);
  e.c.tilanne('waitingEnd', { tunnus: uusi }); e.tick(2000); assert.equal(poissa(e.canvas), false);
});

test('waitingEnd ilman vastausta peruu eikä käynnistä myöhäistä paluuta', t => {
  const e = ymparisto(t); assert.equal(e.c.tilanne('waitingEnd', { tunnus: e.token }), true);
  assert.equal(e.c.tilanne('waitingAnswer', { tunnus: e.token }), false);
  e.tick(4000); assert.equal(poissa(e.canvas), false);
});
