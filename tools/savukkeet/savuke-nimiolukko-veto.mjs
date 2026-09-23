/*
 * SAVUKE: NÄKYVÄ NIMIÖ EI VAIHDA PUOLTA PANOROITAESSA (omistaja 23.9.2026
 * klo 08.47, iPhone v2140: "Chambordin linna" ja "Loire" hyppäsivät
 * symbolin vasemmalta oikealle kesken vedon; sanatarkasti *"Mitkään
 * tekstit eivät saisi vaihtaa paikkaa panoroitaessa kun ne ovat
 * ruudulla."*). Toteutus js/pallolauta/sovittelu.js NÄKYVÄ NIMIÖ PITÄÄ
 * PUOLENSA.
 *
 * Vetoapuri __kehysprofiili asentuu vain koelipulla (`&koe=tuntematon` = ei koetta).
 * Ranska kohdemaana (Fogg Marseillessa), kamera Loiren laaksoon kahdella
 * korkeudella. Kymmenen sekunnin vetosarja: vedot eri suuntiin ja väliin
 * ~450 ms:n tauot, jolloin lepoladonta (ja sen sovittelu) ehtii ajaa —
 * juuri se, mitä sormi tekee iPhonella — ja sen perään zoomi kolme
 * porrasta sisään ja kolme ulos. Joka 50 ms luetaan jokaisen
 * elävän noston nimiön puoli (nostot.lappuLaatikot); nimiö on RUUDULLA,
 * kun sen laatikko leikkaa ruudun.
 *
 *   V1 näkyvillä nimiöillä 0 puolenvaihtoa (sama nimiö ruudulla
 *      peräkkäisissä näytteissä, eri puoli). Zoomi ei muutu sarjassa.
 *   V2 mitattavaa oli: ruudulla vähintään 5 eri nimiötä.
 *   V3 ei sivuvirheitä.
 *   V5 zoomi sisään ja ulos (ctrl + rulla, 3 + 3 porrasta per näkymä)
 *      todella muutti skaalaa — V1 kattaa myös ne (omistajan tarkennus
 *      23.9.2026: näkyvä nimiö ei vaihda puolta ZOOMISSAKAAN, vain koko
 *      muuttuu).
 *   V4 jokaisen eleen jälkeen levossa ruudulla näkyvät laput eivät
 *      leikkaa toisiaan (vakautta ei osteta limityksellä).
 *
 * Aja: PLAYWRIGHT_JS=… NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-nimiolukko-veto.mjs [kaappauskansio]
 * SAVUKE_MOOTTORI=chromium vaihtaa moottorin.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const kirjasto = await ampari('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js');
if (!kirjasto) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Loiren laakso (Chambord 47,62 N 1,52 E): maan mitta ja lähikuva. */
const NAKYMAT = [
  { nimi: 'Loire-maa', lat: 47.4, lng: 1.2, alt: 0.12 },
  { nimi: 'Loire-lahi', lat: 47.55, lng: 1.4, alt: 0.05 },
];
/* Vedot: [suunta, kesto ms]; tauko jokaisen jälkeen (lepoladonta ehtii). */
const VEDOT = [
  [[1, 0.2], 1100], [[-1, -0.1], 1200], [[0.3, 1], 1000], [[-0.2, -1], 1100],
  [[1, -0.6], 1000], [[-1, 0.5], 1100], [[0.8, 0.8], 900], [[-0.8, -0.8], 900],
];
/* Zoomi: kolme porrasta sisään ja kolme ulos (kesto = portaan yläraja ms). */
const ZOOMIT = [['sisaan', 4000], ['sisaan', 4000], ['sisaan', 4000], ['ulos', 4000], ['ulos', 4000], ['ulos', 4000]];
const TAUKO_MS = 450;

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
// Synteettinen veto: OrbitControlsin setPointerCapture ei tunne keksittyä pointerId:tä (sama kuin savuke-eihaive-veto).
sivu.on('pageerror', (e) => { const t = String(e.message ?? e); if (!/PointerCapture|can not be found here/i.test(t)) virheet.push(t); });
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());

try {
  await sivu.goto(`${osoite}?lauta=pallo&koe=tuntematon`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili), null, { timeout: 90000 });
  let vaihtoja = 0;
  let zoomiPortaita = 0;
  let zoomiLiikkui = 0;
  let limityksia = 0;
  let nakyviaYht = 0;
  let piilotettuYht = 0;
  const nahdyt = new Set();
  for (const n of NAKYMAT) {
    await sivu.evaluate(({ lat, lng, alt }) => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat, lng, altitude: alt }, 0), n);
    await sivu.waitForTimeout(5000);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `${n.nimi}-0.png`) });
    const ELEET = [...VEDOT, ...ZOOMIT];
    for (let i = 0; i < ELEET.length; i += 1) {
      const [suunta, kesto] = ELEET[i];
      const tulos = await sivu.evaluate(async ({ suunta, kesto, tauko }) => {
        const l = window.matkakirja.ui.pallolauta;
        const w = innerWidth; const h = innerHeight;
        const ruudulla = (b) => b.x1 > 0 && b.x0 < w && b.y1 > 0 && b.y0 < h;
        let edellinen = new Map();
        const vaihdot = [];
        const nahty = new Set();
        let zoomi = null;
        const nayte = () => {
          const nyt = new Map();
          for (const b of l.nostot.lappuLaatikot()) {
            if (!ruudulla(b)) continue;
            const avain = `${b.id}|${b.nimi}`;
            nyt.set(avain, b.puoli);
            nahty.add(b.nimi);
            const ennen = edellinen.get(avain);
            if (ennen && ennen !== b.puoli) vaihdot.push(`${b.nimi}: ${ennen} → ${b.puoli}`);
          }
          edellinen = nyt;
        };
        const ajastin = setInterval(nayte, 50);
        if (suunta === 'sisaan' || suunta === 'ulos') {
          /*
           * ZOOMIPORRAS: ctrl + rulla ruudun keskeltä (pallo.js v1591: paljas
           * rulla panoroi; kirjaston kuuntelija ei vaadi isTrusted-lippua,
           * sama kuin savuke-nimiot-vakaat). Zoomi liukuu rAF:lla; porras
           * päättyy, kun skaala on pysynyt paikallaan `tauko` ms.
           */
          const kohde = document.elementFromPoint(w / 2, h / 2) ?? l.kotelo;
          kohde.dispatchEvent(new WheelEvent('wheel', {
            deltaY: suunta === 'sisaan' ? -240 : 240, deltaMode: 0, ctrlKey: true, clientX: w / 2, clientY: h / 2, bubbles: true, cancelable: true,
          }));
          const alku = performance.now();
          let sk = l.kamera.nakyvaAlue()?.skaala ?? 0; let muuttui = alku;
          const sk0 = sk;
          while (performance.now() - muuttui < tauko && performance.now() - alku < kesto) {
            await new Promise((v) => setTimeout(v, 50));
            const s2 = l.kamera.nakyvaAlue()?.skaala ?? 0;
            if (Math.abs(s2 - sk) > 1e-9) { sk = s2; muuttui = performance.now(); }
          }
          zoomi = sk0 > 0 ? sk / sk0 : null;
        } else {
          await window.__kehysprofiili.veto({ kesto, nopeusPx: 260, suunta });
          await new Promise((v) => setTimeout(v, tauko));
        }
        nayte();
        clearInterval(ajastin);
        // Levossa: näkyvät nimiöt eivät ole päällekkäin (lukko ei saa ostaa vakautta limityksellä).
        const levossa = l.nostot.lappuLaatikot().filter(ruudulla);
        const limit = [];
        for (let a = 0; a < levossa.length; a += 1) {
          for (let b = a + 1; b < levossa.length; b += 1) {
            const x = levossa[a]; const y = levossa[b];
            if (x.x0 < y.x1 && y.x0 < x.x1 && x.y0 < y.y1 && y.y0 < x.y1) limit.push(`${x.nimi} × ${y.nimi}`);
          }
        }
        return { zoomi, vaihdot, nahty: [...nahty], limit, piilotettu: l.nostot.sovittelunTulos()?.piilotettu ?? null, nakyvia: levossa.length };
      }, { suunta, kesto, tauko: TAUKO_MS });
      tulos.nahty.forEach((x) => nahdyt.add(x));
      if (typeof suunta === 'string') {
        zoomiPortaita += 1;
        if (tulos.zoomi && Math.abs(Math.log(tulos.zoomi)) > 0.05) zoomiLiikkui += 1;
        tieto(`${n.nimi} zoomi ${suunta}`, `skaala × ${tulos.zoomi?.toFixed(3) ?? '—'}, puolenvaihtoja ${tulos.vaihdot.length}`);
      }
      vaihtoja += tulos.vaihdot.length;
      limityksia += tulos.limit.length;
      if (tulos.limit.length) tieto(`${n.nimi} veto ${i + 1} limittäin levossa`, tulos.limit.join('; '));
      nakyviaYht += tulos.nakyvia;
      piilotettuYht += tulos.piilotettu ?? 0;
      if (tulos.vaihdot.length) tieto(`${n.nimi} ele ${i + 1} (${typeof suunta === 'string' ? `zoomi ${suunta}` : 'veto'}) puolenvaihdot`, tulos.vaihdot.join('; '));
      if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `${n.nimi}-${i + 1}.png`) });
    }
  }
  tieto('ruudulla nähdyt nimiöt', [...nahdyt].slice(0, 40).join(', '));
  tieto('levossa näkyviä nimiöitä / piilotettuja (summa vedoista)', `${nakyviaYht} / ${piilotettuYht}`);
  vaadi('V1 näkyvillä nimiöillä 0 puolenvaihtoa veto- ja zoomisarjassa', vaihtoja === 0, `${vaihtoja} vaihtoa`);
  vaadi('V5 zoomi todella liikkui (skaala muuttui ≥ 5 % vähintään neljässä portaassa)', zoomiLiikkui >= 4, `${zoomiLiikkui}/${zoomiPortaita}`);
  vaadi('V2 mitattavaa: ruudulla ≥ 5 eri nimiötä', nahdyt.size >= 5, `${nahdyt.size}`);
  vaadi('V3 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
  vaadi('V4 levossa näkyvät nimiöt eivät ole päällekkäin', limityksia === 0, `${limityksia} paria`);
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
