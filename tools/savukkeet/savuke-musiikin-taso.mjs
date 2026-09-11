/*
 * Savuke: MUSIIKIN TASO JA YKSI KERROIN (omistajan vika 8.9.2026 klo
 * 18.39, iPhone, Vilnan kaupunkikartta, maailma-pakki, kehittäjätila:
 * *"Taustamusiikki on aivan liian kovalla, eikä rattaan säädin vaikuta
 * sen tasoon ollenkaan."*).
 *
 * Yksikkötesti ei näe tästä mitään: kyse on oikeista <audio>-
 * elementeistä oikeassa selaimessa, oikeasta pelin kulusta (hyppy
 * Vilnaan maailmalaudalla) ja siitä, mitä VOLUME oikeasti on silloin
 * kun raita soi.
 *
 * MITÄ MITATAAN
 *  1. Mikä raita Vilnassa soi ja millä volumella.
 *  2. Musiikin taso suhteessa kertojan tasoon (puheVoima()).
 *  3. Kehittäjän 'musiikki'-säädin muuttaa SOIVAN raidan tasoa heti.
 *
 *   node tools/savukkeet/savuke-musiikin-taso.mjs
 */
import http from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAUPUNKI = process.argv[2] ?? 'vilna';
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Tallenne: peli käynnissä maailmankartalla, jotta hyppy on mahdollinen. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1194 }, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
sivu.on('pageerror', (v) => console.log(`HUOM  ${String(v.message ?? v).slice(0, 160)}`));

/*
 * Musiikki tulee ämpärin audio/-kansiosta. Äänitiedostot EIVÄT ole enää
 * repossa (linjaus 11.9.2026), mutta paikallinen assets/audio voi olla
 * generointiajon jäljiltä olemassa — jos raita löytyy levyltä, se
 * tarjoillaan sieltä (mittaus ei silloin riipu verkosta). Muuten, ja
 * kaikille muille peilipyynnöille, haetaan oikeasti ja
 * välimuistitetaan.
 */
const valimuisti = new Map();
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (reitti) => {
  const url = reitti.request().url();
  const osuma = /\/audio\/([^?]+)/.exec(url);
  const oma = osuma ? join(JUURI, 'assets/audio', osuma[1]) : null;
  if (oma && existsSync(oma)) {
    reitti.fulfill({
      status: 200,
      contentType: 'audio/mpeg',
      headers: { 'access-control-allow-origin': '*' },
      body: readFileSync(oma),
    });
    return;
  }
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: Buffer.from(await v.arrayBuffer()),
    })).catch((e) => ({ status: 502, contentType: 'text/plain', body: Buffer.from(String(e)) })));
  }
  reitti.fulfill(await valimuisti.get(url));
});
await sivu.route('**workers.dev/**', (reitti) => reitti.abort());

/* Jokainen soitin talteen konstruktorista: ne eivät ole DOMissa. */
await sivu.addInitScript(() => {
  window.__aanet = [];
  const OikeaAudio = window.Audio;
  window.Audio = function Audio(...args) {
    const audio = new OikeaAudio(...args);
    window.__aanet.push(audio);
    return audio;
  };
  window.Audio.prototype = OikeaAudio.prototype;
  window.__reititykset = [];
  for (const nimi of ['AudioContext', 'webkitAudioContext']) {
    const Alku = window[nimi];
    if (typeof Alku !== 'function') continue;
    window[nimi] = function Piiri(...a) {
      const ctx = new Alku(...a);
      const oikea = ctx.createMediaElementSource.bind(ctx);
      ctx.createMediaElementSource = (el) => {
        try {
          const s = oikea(el);
          window.__reititykset.push({ src: String(el.src).split('/').pop(), ok: true });
          return s;
        } catch (e) {
          window.__reititykset.push({ src: String(el.src).split('/').pop(), virhe: String(e).slice(0, 80) });
          throw e;
        }
      };
      return ctx;
    };
    window[nimi].prototype = Alku.prototype;
  }
  /** Ulostulon huippupoikkeama nollasta: 0 = mykkä ketju. */
  window.__huippu = (a) => {
    if (!a.aaniMittari) return null;
    const d = new Float32Array(a.aaniMittari.fftSize);
    a.aaniMittari.getFloatTimeDomainData(d);
    let s = 0;
    for (const v of d) s = Math.max(s, Math.abs(v));
    return s;
  };
  window.__soivat = () => window.__aanet
    .filter((a) => !a.paused && !a.ended && (a.currentSrc || a.src))
    .map((a) => ({
      nimi: String(a.currentSrc || a.src).split('/').pop().split('?')[0],
      volume: Math.round(a.volume * 10000) / 10000,
      gain: a.aaniVahvistin ? Math.round(a.aaniVahvistin.gain.value * 10000) / 10000 : null,
      // Kuuluva taso riippumatta siitä, kumpi reitti on käytössä.
      taso: a.aaniVahvistin ? a.aaniVahvistin.gain.value : a.volume,
      huippu: window.__huippu(a),
    }));
});
await sivu.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, TALLENNE);

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(4000);
await sivu.evaluate((id) => {
  const { ui, game } = window.matkakirja;
  ui.doKehittajaSiirto(game.board.cityById.get(id));
}, KAUPUNKI);
await sivu.waitForTimeout(12000);

const musiikki = (rivit) => rivit.filter((r) => /^musa-|^siirtyma-|^linssi-/.test(r.nimi));
const soivat = await sivu.evaluate(() => window.__soivat());
for (const r of soivat) tieto('soi', `${r.nimi} volume=${r.volume}${r.gain === null ? '' : ` gain=${r.gain}`}`);

const reititys = await sivu.evaluate(async () => {
  const { sfx } = await import('/js/sound.js');
  const ctx = sfx.ctx ?? sfx.ensureContext?.();
  return { ctxTila: ctx?.state ?? 'ei kontekstia', reititetty: window.__aanet.filter((a) => a.aaniVahvistin).length };
});
tieto('äänireititys', JSON.stringify(reititys));

const puhe = await sivu.evaluate(async () => (await import('/js/aani-ehdokkaat.js')).puheVoima());
tieto('kertojan taso (puheVoima)', puhe);

const musa = musiikki(soivat);
vaadi(`${KAUPUNKI}: musiikkiraita soi`, musa.length > 0, 'yhtään musiikkiraitaa ei soinut');
for (const r of musa) {
  const dB = 20 * Math.log10(r.taso / puhe);
  tieto(`${r.nimi} suhteessa kertojaan`, `${dB.toFixed(1)} dB (taso ${r.taso})`);
  vaadi(`${r.nimi} on selvästi kertojan alla (≤ −12 dB)`, dB <= -12, `${dB.toFixed(1)} dB`);
  /*
   * REITITETTY KETJU EI SAA OLLA MYKKÄ. Juuri tähän ansaan reititys
   * kaatui ensin: elementin oma volume jäi nollaan, jolloin graafiin
   * syötettiin hiljaisuutta ja hiljaisuusvahti pudotti raidan takaisin
   * volume-polulle joka kerta.
   */
  if (r.huippu !== null) {
    vaadi(`${r.nimi}: reititetty ketju soi (mittarin lukema > 0)`, r.huippu > 0, 'ketju on mykkä');
  }
}

const saada = async (arvo) => {
  await sivu.evaluate(async (v) => {
    const m = await import('/js/kehittajan-voimat.js');
    m.asetaKehittajanKerroin('musiikki', v);
  }, arvo);
  await sivu.waitForTimeout(1000);
  return musiikki(await sivu.evaluate(() => window.__soivat()));
};

const hiljaa = await saada(0.5);
const kovaa = await saada(2);
for (const ennen of musa) {
  const a = hiljaa.find((r) => r.nimi === ennen.nimi);
  const b = kovaa.find((r) => r.nimi === ennen.nimi);
  tieto(`${ennen.nimi} kertoimilla 1 / 0,5 / 2`, `${ennen.taso} / ${a?.taso} / ${b?.taso}`);
  vaadi(`${ennen.nimi}: säädin alas hiljentää soivan raidan`, a && a.taso < ennen.taso * 0.9,
    `${ennen.taso} → ${a?.taso}`);
  vaadi(`${ennen.nimi}: säädin ylös kovemmalle`, b && b.taso > ennen.taso * 1.1,
    `${ennen.taso} → ${b?.taso}`);
}

console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
