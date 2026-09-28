#!/usr/bin/env node
/*
 * SELAINSAVUKE: PULUN ÄÄNIKESKUSTELU (koe, omistaja 28.9.2026 "laita uusi pulunappi peliin").
 *
 *   zsh -c 'source ~/.matkakirja-avaimet-koodaus.zsh; \
 *     PLAYWRIGHT_JS=…/node_modules/playwright/index.js nice -n 10 node tools/savukkeet/savuke-pulu-realtime.mjs'
 *
 * EI taskpolicy -b:tä: taustaprioriteetilla headless-selaimen audiosäie ei pysy
 * reaaliajassa, mikrofonin ääni venyy ja napsuu, eikä xAI tunnista puhetta (mitattu 28.9.).
 *
 * Todentaa selainpolun OIKEAA xAI:ta vasten: Chromium, väärennetty mikrofoni
 * (suomenkielinen kysymys macOS:n `say -v Satu` -äänellä), Pöllö-worker ajetaan
 * tässä prosessissa (tools/pollo/worker.js fetch) ja pelin pyynnöt ohjataan sille,
 * joten token haetaan samalla reitillä kuin tuotannossa — avain pysyy Nodessa.
 * Kuluttaa noin 20–30 s xAI-aikaa (0,08 $/min).
 *
 * VÄITTEET:
 *   1. Koenappi näkyy kehittäjätilassa Pulun chatissa.
 *   2. Napautus: mikrofoni, token (worker 200), WebSocket auki, session.update lähtee.
 *   3. Mikrofonin PCM menee xAI:lle (input_audio_buffer.append) ja xAI tunnistaa puheen lopun.
 *   4. Pulu vastaa äänellä (response.output_audio.delta) ja tekstitys tulee chat-kuplaan.
 *   5. Napin toinen napautus sulkee yhteyden; ei sivuvirheitä.
 * Mittari: viive xAI:n puheen lopusta (speech_stopped) ensimmäiseen ääneen.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const JUURI = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
const ULOS = '/Users/Shared/Claude/proto-3d/lokit/pulu-realtime';
mkdirSync(ULOS, { recursive: true });
if (!process.env.XAI_API_KEY) { console.error('XAI_API_KEY puuttuu ympäristöstä.'); process.exit(2); }

// Kysymys ääneksi: 1,5 s hiljaisuutta, kysymys, 8 s hiljaisuutta (VAD tunnistaa lopun).
const WAV = join(ULOS, 'savuke-kysymys.wav');
const AIFF = join(ULOS, 'savuke-kysymys.aiff');
execFileSync('say', ['-v', 'Satu', '-o', AIFF, 'Hei Pulu, mitä Ateenassa kannattaa syödä?']);
execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-t', '1.5', '-i', 'anullsrc=r=48000:cl=mono',
  '-i', AIFF, '-f', 'lavfi', '-t', '8', '-i', 'anullsrc=r=48000:cl=mono',
  '-filter_complex', '[1:a]aresample=48000,aformat=channel_layouts=mono[q];[0:a][q][2:a]concat=n=3:v=0:a=1',
  '-ar', '48000', '-ac', '1', '-c:a', 'pcm_s16le', WAV]);

const { default: worker } = await import(pathToFileURL(join(JUURI, 'tools/pollo/worker.js')).href);
const { POLLOPALVELIN } = await import(pathToFileURL(join(JUURI, 'js/packs/pollo-asetukset.js')).href);
const KV = new Map();
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = createServer((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(0, r));
const ORIGIN = `http://127.0.0.1:${palvelin.address().port}`;
const KOODI = 'savukekoodi';
const env = {
  POLLO_ORIGINIT: ORIGIN, XAI_API_KEY: process.env.XAI_API_KEY, POLLO_KEHITTAJAKOODI: KOODI,
  POLLO_KV: { async get(k) { return KV.get(k) ?? null; }, async put(k, v) { KV.set(k, v); } },
};

const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS));
const paketti = pw.chromium ? pw : (pw.default ?? pw);
const selain = await paketti.chromium.launch({
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream',
    `--use-file-for-fake-audio-capture=${WAV}%noloop`, '--autoplay-policy=no-user-gesture-required',
    '--disable-features=AudioServiceOutOfProcess'],
});
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push(ok);
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};
const ctx = await selain.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true, serviceWorkers: 'block' });
await ctx.grantPermissions(['microphone'], { origin: ORIGIN });
const s = await ctx.newPage();
const virheet = [];
s.on('pageerror', (e) => virheet.push(String(e)));
const tokenit = [];
await s.route((u) => u.href.startsWith(POLLOPALVELIN), async (r) => {
  const q = r.request();
  const vastaus = await worker.fetch(new Request(POLLOPALVELIN, {
    method: q.method(), headers: q.headers(), body: q.method() === 'POST' ? q.postData() : undefined,
  }), env, {});
  const runko = Buffer.from(await vastaus.arrayBuffer());
  if (q.postData()?.includes('"realtime"')) tokenit.push(vastaus.status);
  r.fulfill({ status: vastaus.status, headers: Object.fromEntries(vastaus.headers), body: runko });
});
await s.route((u) => !u.href.startsWith(ORIGIN) && !u.href.startsWith(POLLOPALVELIN), (r) => r.abort());
await s.addInitScript((koodi) => {
  try {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-pollo-kehittajakoodi', koodi);
  } catch { /* yksityinen */ }
  // WebSocket-loki: tapahtumien tyypit aikaleimoineen (ei ääntä).
  const Alkup = window.WebSocket;
  window.__ws = { avattu: 0, suljettu: 0, lahetetty: [], saatu: [] };
  window.WebSocket = class extends Alkup {
    constructor(...a) {
      super(...a);
      window.__ws.osoite = String(a[0]);
      window.__ws.olio = this;
      this.addEventListener('open', () => { window.__ws.avattu = performance.now(); });
      this.addEventListener('close', () => { window.__ws.suljettu = performance.now(); });
      this.addEventListener('message', (e) => {
        try { const t = JSON.parse(e.data).type; window.__ws.saatu.push([t, performance.now()]); } catch { /* ei JSON */ }
      });
    }
    send(d) {
      try { const o = JSON.parse(d); window.__ws.lahetetty.push([o.type, performance.now()]); if (o.type === 'input_audio_buffer.append' && (window.__ws.aani ??= []).length < 400) window.__ws.aani.push(o.audio); if (o.type === 'session.update') window.__ws.istunto = { ...o.session, instructions: `${String(o.session?.instructions ?? '').length} mrk` }; } catch { /* ei JSON */ }
      return super.send(d);
    }
  };
}, KOODI);

await s.goto(`${ORIGIN}/index.html?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await s.waitForFunction(() => [...document.querySelectorAll('button')].some((b) => /aloita seikkailu/i.test(b.textContent)), null, { timeout: 120000 });
await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
await s.waitForTimeout(2500);
await s.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
});
await s.waitForTimeout(3000);
await s.keyboard.press('Escape');
await s.evaluate(() => { document.querySelector('dialog[open]')?.close?.(); });
await s.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await s.waitForTimeout(1500);
const nakyy = await s.evaluate(() => {
  const b = document.querySelector('.pollo-realtime-koe');
  return { olemassa: Boolean(b), nakyy: Boolean(b && !b.hidden && b.getClientRects().length), teksti: b?.textContent };
});
vaadi('koenappi näkyy kehittäjätilassa Pulun chatissa', nakyy.nakyy, JSON.stringify(nakyy));
await s.screenshot({ path: join(ULOS, 'savuke-chat-nappi.png') });

await s.evaluate(() => document.querySelector('.pollo-realtime-koe')?.click());
// Odota vastauksen loppua (response.done) tai 35 s.
await s.waitForFunction(() => window.__ws?.saatu.some(([t]) => t === 'response.done'), null, { timeout: 60000 }).catch(() => {});
await s.waitForTimeout(1500);
await s.screenshot({ path: join(ULOS, 'savuke-chat-vastaus.png') });
const loki = await s.evaluate(() => {
  const w = window.__ws;
  const eka = (lista, t) => lista.find(([x]) => x === t)?.[1] ?? null;
  const laske = (lista, t) => lista.filter(([x]) => x === t).length;
  const kuplat = [...document.querySelectorAll('.pollo-virta .pollo-kupla, .pollo-virta [class*="viesti"]')]
    .map((k) => `${k.className.split(' ').slice(-1)[0]}: ${k.textContent.trim().slice(0, 140)}`).slice(-4);
  return {
    osoite: w.osoite?.replace(/\?.*$/, ''), avattu: Boolean(w.avattu),
    sessionUpdate: laske(w.lahetetty, 'session.update'), append: laske(w.lahetetty, 'input_audio_buffer.append'),
    puheAlkoi: eka(w.saatu, 'input_audio_buffer.speech_started'), puheLoppui: eka(w.saatu, 'input_audio_buffer.speech_stopped'),
    ekaAani: eka(w.saatu, 'response.output_audio.delta'), aaniPaloja: laske(w.saatu, 'response.output_audio.delta'),
    valmis: Boolean(eka(w.saatu, 'response.done')), virheet: w.saatu.filter(([t]) => t === 'error').length,
    tyypit: [...new Set(w.saatu.map(([t]) => t))].slice(0, 20), kuplat,
    istunto: w.istunto, konteksti: window.__mikkiTaajuus,
    jarjestys: w.saatu.filter(([t]) => !/delta|ping/.test(t)).map(([t, a]) => `${Math.round(a - w.avattu)}:${t}`).slice(0, 40),
    napinTeksti: document.querySelector('.pollo-realtime-koe')?.textContent,
  };
});
console.log(JSON.stringify(loki, null, 1));
{
  const palat = await s.evaluate(() => ({ aani: window.__ws.aani ?? [], rate: window.__ws.istunto?.audio?.input?.format?.rate }));
  const pcm = Buffer.concat(palat.aani.map((b) => Buffer.from(b, 'base64')));
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(palat.rate, 24);
  h.writeUInt32LE(palat.rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  writeFileSync(join(ULOS, 'savuke-lahetetty.wav'), Buffer.concat([h, pcm]));
  console.log(`lähetetty ääni: ${(pcm.length / 2 / palat.rate).toFixed(2)} s @ ${palat.rate} Hz, ${palat.aani.length} palaa`);
}
vaadi('token workerilta (200) ja WebSocket xAI:hin auki, session.update lähti',
  tokenit[0] === 200 && loki.avattu && /api\.x\.ai/.test(loki.osoite ?? '') && loki.sessionUpdate >= 1, `token ${tokenit.join(',')}`);
vaadi('mikrofonin PCM menee xAI:lle ja puheen loppu tunnistetaan', loki.append > 10 && loki.puheLoppui != null, `append ${loki.append}`);
vaadi('Pulu vastaa äänellä ja vastaus valmistuu', loki.aaniPaloja > 5 && loki.valmis && loki.virheet === 0, `ääniä ${loki.aaniPaloja}`);
const puluKupla = loki.kuplat.some((k) => /pollo/.test(k) && k.length > 12);
vaadi('tekstitys chat-kuplaan', puluKupla, loki.kuplat.join(' | '));
const viive = loki.puheLoppui != null && loki.ekaAani != null ? Math.round(loki.ekaAani - loki.puheLoppui) : null;
console.log(`VIIVE xAI:n puheen lopusta ensimmäiseen ääneen: ${viive} ms`);

await s.evaluate(() => document.querySelector('.pollo-realtime-koe')?.click());
await s.waitForTimeout(1500);
// Sulkemisen kättely voi kestää: CLOSING (2) tai CLOSED (3) riittää.
const kiinni = await s.evaluate(() => ({ tila: window.__ws.olio?.readyState, teksti: document.querySelector('.pollo-realtime-koe')?.textContent }));
vaadi('toinen napautus sulkee yhteyden', kiinni.tila >= 2 && /Puhu Pululle/.test(kiinni.teksti ?? ''), JSON.stringify(kiinni));
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' / '));
await selain.close();
palvelin.close();
const hylatyt = tulokset.filter((x) => !x).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(hylatyt ? 1 : 0);
