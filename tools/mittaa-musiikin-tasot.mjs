/*
 * Mittaa musiikkiraitojen ja luentojen todellisen tason (RMS + huippu)
 * dekoodaamalla tiedostot oikeasti selaimessa. Vertailu kertoo, kuinka
 * paljon musiikin PERUSTASON pitää olla puheen alla.
 *
 *   node tools/mittaa-musiikin-tasot.mjs [tiedosto ...]
 */
import http from 'node:http';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;
const KANSIO = join(JUURI, 'assets/audio');
const oletukset = readdirSync(KANSIO)
  .filter((n) => /^(musa-|siirtyma-|linssi-|intro-puhe|huudahdus-)/.test(n) && n.endsWith('.mp3'));
const tiedostot = process.argv.slice(2).length ? process.argv.slice(2) : oletukset;

/* Ulkoiset osoitteet haetaan Nodella ja tarjoillaan omasta juuresta:
 * selaimen fetch ei pääse peiliin CORSin yli. */
const ulkoiset = new Map();
for (const [i, nimi] of tiedostot.entries()) {
  if (!/^https?:/.test(nimi)) continue;
  const polku = `/ulko/${i}.mp3`;
  ulkoiset.set(polku, Buffer.from(await (await fetch(nimi)).arrayBuffer()));
  tiedostot[i] = { osoite: polku, nimi };
}

const palvelin = http.createServer((req, res) => {
  const osa = decodeURIComponent(req.url.split('?')[0]);
  if (ulkoiset.has(osa)) {
    res.writeHead(200, { 'content-type': 'audio/mpeg' });
    res.end(ulkoiset.get(osa));
    return;
  }
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': extname(polku) === '.mp3' ? 'audio/mpeg' : 'text/html' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext()).newPage();
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });

const tulos = await sivu.evaluate(async (nimet) => {
  const ctx = new (window.OfflineAudioContext ?? window.webkitOfflineAudioContext)(1, 1, 44100);
  const rivit = [];
  for (const rivi of nimet) {
    const nimi = typeof rivi === 'string' ? rivi : rivi.nimi;
    try {
      const osoite = typeof rivi === 'string' ? `assets/audio/${rivi}` : rivi.osoite;
      const data = await (await fetch(osoite)).arrayBuffer();
      const puskuri = await ctx.decodeAudioData(data);
      const kanava = puskuri.getChannelData(0);
      let summa = 0;
      let huippu = 0;
      for (let i = 0; i < kanava.length; i += 1) {
        summa += kanava[i] * kanava[i];
        huippu = Math.max(huippu, Math.abs(kanava[i]));
      }
      const rms = Math.sqrt(summa / kanava.length);
      rivit.push({ nimi, kesto: Math.round(puskuri.duration), rms, huippu });
    } catch (e) {
      rivit.push({ nimi, virhe: String(e).slice(0, 80) });
    }
  }
  return rivit;
}, tiedostot);

const dB = (v) => (v > 0 ? (20 * Math.log10(v)).toFixed(1) : '-inf');
for (const r of tulos.sort((a, b) => (b.rms ?? 0) - (a.rms ?? 0))) {
  if (r.virhe) { console.log(`${r.nimi.padEnd(42)} VIRHE ${r.virhe}`); continue; }
  console.log(`${r.nimi.padEnd(42)} kesto ${String(r.kesto).padStart(4)} s  RMS ${dB(r.rms).padStart(7)} dBFS  huippu ${dB(r.huippu).padStart(6)} dBFS`);
}

await selain.close();
palvelin.close();
