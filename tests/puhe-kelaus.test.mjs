/*
 * Puhesoittimen kelaus (omistaja 28.9.2026: "-10sek ja +10sek sekä
 * kappale eteen ja taakse napit kelaukseen" + kappalelista):
 * siirryAika ja siirryKappaleeseen tynkäpiirillä, jonka palat ovat 5 s
 * äänekästä puhetta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const asettuu = () => new Promise((r) => setImmediate(r));

async function soitin(t) {
  const piirit = [];
  const pyynnot = [];
  class AudioContext {
    currentTime = 0; state = 'running'; destination = {}; lahteet = [];
    constructor() { piirit.push(this); }
    resume() { this.state = 'running'; return Promise.resolve(); }
    suspend() { this.state = 'suspended'; return Promise.resolve(); }
    createGain() { return { connect() {}, disconnect() {}, gain: { setValueAtTime() {}, linearRampToValueAtTime() {} } }; }
    createBufferSource() {
      const s = { connect() {}, disconnect() {}, stop() { this.pysaytetty = true; }, start(alku, offset, kesto) { Object.assign(this, { alku, offset, kesto }); } };
      this.lahteet.push(s);
      return s;
    }
    decodeAudioData() {
      const data = new Float32Array(50).fill(0.5);
      return Promise.resolve({ sampleRate: 10, duration: 5, length: 50, numberOfChannels: 1, getChannelData: () => data });
    }
  }
  const fetch = async (url, options) => {
    if (String(url).startsWith('blob:')) return new Response(new Uint8Array(8));
    return new Promise((resolve, reject) => pyynnot.push({ resolve, reject, body: JSON.parse(options.body) }));
  };
  t.mock.method(globalThis, 'fetch', fetch);
  const ennen = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, writable: true, value: { Audio: class {}, fetch, navigator: { onLine: true }, AudioContext } });
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  const { luoPuheSoitin } = await import(`../js/puhe.js?kelaus=${encodeURIComponent(t.name)}`);
  const s = luoPuheSoitin();
  t.after(() => { s.pysayta(); ennen ? Object.defineProperty(globalThis, 'window', ennen) : delete globalThis.window; });
  return {
    s, piirit, pyynnot,
    async vastaaKaikki() { for (let i = 0; i < 10; i += 1) { for (const p of pyynnot.splice(0)) p.resolve(new Response(new Uint8Array(8))); await asettuu(); } },
    tick(aika) { piirit[0].currentTime = aika; t.mock.timers.tick(150); },
    viimeinen() { return piirit[0].lahteet.filter((l) => !l.pysaytetty).at(0); },
  };
}

test('+10 s ylittää palan rajan: seuraava pala alkaa oikeasta kohdasta', async (t) => {
  const q = await soitin(t);
  q.s.lisaa('Ensimmäinen.\nToinen.\nKolmas.');
  q.s.paata();
  await asettuu();
  await q.vastaaKaikki();
  q.tick(0.1);
  await asettuu();
  const alku = q.piirit[0].lahteet[0].alku;
  q.tick(alku + 2); // 2 s ensimmäisen palan puhetta
  q.s.siirryAika(10); // → 12 s: pala 0 (5 s) + pala 1 (5 s) + 2 s palaan 2
  await q.vastaaKaikki();
  q.tick(alku + 2.2);
  await asettuu();
  const soiva = q.viimeinen();
  assert.ok(soiva, 'uusi lähde aikataulussa');
  assert.ok(Math.abs(soiva.offset - 2) < 0.1, `offset ${soiva.offset}`);
  assert.equal(q.s.tilanne().kappale, 2);
});

test('−10 s perääntyy soitettuihin paloihin ja pysähtyy alkuun', async (t) => {
  const q = await soitin(t);
  q.s.lisaa('Ensimmäinen.\nToinen.');
  q.s.paata();
  await asettuu();
  await q.vastaaKaikki();
  q.tick(0.1);
  await asettuu();
  const a0 = q.piirit[0].lahteet[0].alku;
  const a1 = q.piirit[0].lahteet[1].alku;
  q.tick(a1 + 3); // 3 s toista palaa → −10 s = alkuun (vain 5 s edellistä)
  q.tick(a1 + 3.1);
  q.s.siirryAika(-10);
  await q.vastaaKaikki();
  q.tick(a1 + 3.3); // aikataulutus: uusi pala alkaa 0,08 s myöhemmin
  await asettuu();
  q.tick(a1 + 3.6);
  await asettuu();
  const soiva = q.viimeinen();
  assert.ok(soiva && soiva.offset < 0.1, `offset ${soiva?.offset}`);
  assert.equal(q.s.tilanne().kappale, 0);
  assert.ok(a0 < a1);
});

test('siirryKappaleeseen hyppää suoraan kappaleen alkuun', async (t) => {
  const q = await soitin(t);
  q.s.lisaa('Yksi.\nKaksi.\nKolme.\nNeljä.');
  q.s.paata();
  await asettuu();
  await q.vastaaKaikki();
  q.tick(0.1);
  q.s.siirryKappaleeseen(3);
  await q.vastaaKaikki();
  q.tick(0.4);
  await asettuu();
  assert.equal(q.s.tilanne().kappale, 3);
  assert.ok(q.viimeinen().offset < 0.1);
});
