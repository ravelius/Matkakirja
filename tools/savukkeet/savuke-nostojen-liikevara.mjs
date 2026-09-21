/*
 * SAVUKE: NOSTOT OVAT VALMIINA RUUDUN ULKOPUOLELLA — EIVÄT TUPSAHDA
 * PANOROINNISSA (omistaja 21.9.2026, työpöytä v2026: *"panoroitaessa
 * uudelle alueelle nostot tupsahtavat näytölle jälkikäteen"*; Fablen erä
 * LIIKEVARA, js/pallolauta/nostot.js NOSTOJEN_LIIKEVARA_OSUUS).
 *
 * Ranska z7 (korkeus 0,1), työpöytä 1400 × 900 ja puhelin 390 × 844.
 * Levossa luetaan rungon nostot (sovitin.nostotRungolla: tunnus, paikka,
 * mitta, dx/dy) — joukko A. Panoroidaan hiirellä 400 px vasemmalle 25
 * askeleena ja luetaan joka askeleella rungon nostot ruudun sisällä;
 * levon jälkeen joukko C = rungon nostot ruudun sisällä. Vartiot:
 *   1. jokainen C:n nosto oli rungolla jo ENNEN panorointia (A) —
 *      ilmestymisviive ruudun reunalla 0 kehystä;
 *   2. A∩C: fontti/mitta sama ennen ja jälkeen (±1 %) — ei kokomuutoksia;
 *   3. A∩C: sovittelun siirto (dx, dy) ja kylki samat — paikka ei muutu;
 *   4. panoroinnin aikana yhdelläkään askeleella ei puutu C:n nostoa,
 *      joka on jo ruudussa (instanssi ei katoa kesken eleen);
 *   5. ei sivuvirheitä.
 * Vastakoe: `LIIKEVARA=0` (`?liikevara=0`, nostot.js nostojenLiikevaraPx) →
 * vartio 1 kaatuu. Puhelimella veto on 60 % ruudun leveydestä (234 px).
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-nostojen-liikevara.mjs [kuvakansio]
 *       NAKYMAT=tyopoyta,puhelin  SAVUKE_MOOTTORI=chromium|webkit
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
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'chromium';
const NAKYMAT = (process.env.NAKYMAT ?? 'tyopoyta,puhelin').split(',');
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const RUUDUT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 },
};
// Lähtö Ranskan länsipuoliskolla: vedon jälkeen itäinen Ranska (Alsace, Alpit) tulee oikealta ruutuun.
const RANSKA = { lat: 46.8, lng: 0.5, altitude: 0.1 };
const PANOROINTI_PX = 400;
const ASKELIA = 25;
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
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
for (const nakyma of NAKYMAT) {
  const ruutu = RUUDUT[nakyma];
  const virheet = [];
  const ctx = await selain.newContext({ ...ruutu, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${process.env.LIIKEVARA === '0' ? '&liikevara=0' : ''}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(1500);
  await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, RANSKA);
  await sivu.waitForTimeout(4000);
  const odotaLepo = async () => {
    await sivu.waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 }).catch(() => {});
    await sivu.waitForFunction(() => {
      const s = window.matkakirja.ui.pallolauta.glSovitin?.(); const t = s?.tila?.();
      if (!t || !(t.nostotGl > 0)) return false;
      const dom = [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu')).length;
      return dom === t.nostotCss2d;
    }, null, { timeout: 20000 }).catch(() => {});
    await sivu.waitForTimeout(1200);
  };
  /** Rungon nostot (ikonit): tunnus → { x, y, sisalla, mitta, dx, dy }. */
  const lue = () => sivu.evaluate(() => {
    const ui = window.matkakirja.ui; const l = ui.pallolauta; const s = l.glSovitin();
    const koti = l.kotelo.getBoundingClientRect();
    const datumit = new Map(s.viimeisetNostot().map((d) => [d.avain ?? `${d.laji}:${d.id}`, d]));
    const ulos = {};
    for (const i of s.nostotRungolla()) {
      if (!i.tunnus.endsWith('#ikoni')) continue;
      const q = ui.pallonInstanssi.getScreenCoords(i.lat, i.lng, 0);
      if (!q) continue;
      const d = datumit.get(i.tunnus.replace(/#ikoni$/u, ''));
      ulos[i.tunnus] = {
        nimi: d?.nimi ?? '?', x: q.x, y: q.y, sisalla: q.x >= 0 && q.y >= 0 && q.x <= koti.width && q.y <= koti.height,
        mitta: i.mitta, dx: d?.dx ?? 0, dy: d?.dy ?? 0, puoli: d?.puoli ?? null, nimio: d?.nimioNakyy ?? null,
        este: l.nostot.sovittelunAsennot?.().get(d?.avain)?.este ?? null,
      };
    }
    return { nostot: ulos, pov: ui.pallonInstanssi.pointOfView(), liikevara: l.nostot?.liikevaraPx?.() ?? null };
  });
  await odotaLepo();
  const ennen = await lue();
  const A = new Map(Object.entries(ennen.nostot));
  const sisallaEnnen = [...A.values()].filter((n) => n.sisalla).length;
  tieto(`${nakyma} · ennen`, `rungolla ${A.size} nostoa, ruudussa ${sisallaEnnen}, liikevara ${ennen.liikevara} px, alt ${p(ennen.pov.altitude, 3)}`);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nostojen-liikevara-${nakyma}-ennen.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  // Panorointi: 400 px vasemmalle (kartta liikkuu vasemmalle, uusi alue tulee oikealta).
  const x0 = ruutu.viewport.width / 2; const y0 = ruutu.viewport.height / 2;
  // Puhelimella 400 px veisi koko ruudun: veto enintään 60 % ruudun leveydestä.
  const veto = Math.min(PANOROINTI_PX, Math.round(0.6 * ruutu.viewport.width));
  await sivu.mouse.move(x0, y0); await sivu.mouse.down();
  const askeleet = [];
  for (let i = 1; i <= ASKELIA; i += 1) {
    await sivu.mouse.move(x0 - (veto * i) / ASKELIA, y0);
    await sivu.waitForTimeout(16);
    askeleet.push(await lue());
  }
  await sivu.mouse.up();
  await odotaLepo();
  const jalkeen = await lue();
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nostojen-liikevara-${nakyma}-jalkeen.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  const C = Object.entries(jalkeen.nostot).filter(([, n]) => n.sisalla);
  const siirtyi = Math.abs(jalkeen.pov.lng - ennen.pov.lng) > 0.05;
  const uudet = C.filter(([t]) => !A.has(t));
  tieto(`${nakyma} · jälkeen`, `lng ${p(ennen.pov.lng, 2)} → ${p(jalkeen.pov.lng, 2)}, ruudussa ${C.length}, uusia (ei rungolla ennen) ${uudet.length}: ${uudet.map(([, n]) => n.nimi).join(', ')}`);
  vaadi(`1. ${nakyma}: jokainen panoroinnin jälkeen ruudussa oleva nosto oli rungolla jo ennen (ilmestymisviive 0)`,
    siirtyi && C.length >= 5 && uudet.length === 0, `siirtyi ${siirtyi}, ruudussa ${C.length}, uusia ${uudet.length}`);
  const yhteiset = C.filter(([t]) => A.has(t));
  const kokoMuuttui = yhteiset.filter(([t, n]) => Math.abs(n.mitta - A.get(t).mitta) > 0.01 * A.get(t).mitta);
  vaadi(`2. ${nakyma}: ruudussa olevien nostojen koko sama ennen ja jälkeen (±1 %)`, yhteiset.length >= 3 && kokoMuuttui.length === 0,
    `yhteisiä ${yhteiset.length}, koko muuttui ${kokoMuuttui.map(([, n]) => n.nimi).join(', ') || 'ei'}`);
  // Paikka vartioidaan niiltä, jotka olivat RUUDUSSA jo ennen: liikevarasta ruutuun tullut
  // lappu sovitellaan levossa ruudun reunaa vasten (sovittelu.js LIIKEVARA), ja se saa vaihtaa kylkeä.
  // Reunan lähellä (nimiön leveyden verran) reunasääntö saa vaihtaa kylkeä tai piilottaa — ei lasketa.
  const REUNAVYO = Math.round(Math.min(160, ruutu.viewport.width * 0.2));
  const kaukanaReunasta = (n) => n.x > REUNAVYO && n.x < ruutu.viewport.width - REUNAVYO && n.y > REUNAVYO && n.y < ruutu.viewport.height - REUNAVYO;
  const ruudussaMolemmin = yhteiset.filter(([t, n]) => A.get(t).sisalla && kaukanaReunasta(n) && kaukanaReunasta(A.get(t)));
  // Reunasääntö on pelin oma (sovittelu.js: nimiö ei ylitä ruudun reunaa) eikä liikevaran:
  // vedon jälkeen reunaan joutuneen noston nimiö saa piiloutua (este 'reuna') — ei lasketa.
  const paikkaMuuttui = ruudussaMolemmin.filter(([t, n]) => { const a = A.get(t); return n.este !== 'reuna' && (Math.abs(n.dx - a.dx) > 0.5 || Math.abs(n.dy - a.dy) > 0.5 || n.puoli !== a.puoli || n.nimio !== a.nimio); });
  vaadi(`3. ${nakyma}: ruudussa pysyneiden sovittelun siirto, kylki ja nimiön näkyvyys samat (paikka ei muutu)`, (ruudussaMolemmin.length >= 2 || nakyma === 'puhelin') && paikkaMuuttui.length === 0,
    `ruudussa ennen ja jälkeen ${ruudussaMolemmin.length}, muuttui ${paikkaMuuttui.map(([t, n]) => `${n.nimi} (${A.get(t).puoli}/${A.get(t).dx},${A.get(t).dy}/${A.get(t).nimio} → ${n.puoli}/${n.dx},${n.dy}/${n.nimio}${n.este ? ` este ${n.este}` : ''})`).join(', ') || 'ei'}`);
  // 4. Eleen aikana: C:n nosto, joka on askeleella ruudussa, on rungolla sillä askeleella.
  const puuttui = [];
  for (const [i, a] of askeleet.entries()) {
    for (const [t, n] of C) {
      const s = a.nostot[t];
      if (!s) {
        // Oliko se jo ruudussa tällä askeleella? Arvio: jos se oli ruudussa edellisellä tai seuraavalla luetulla askeleella.
        const naapuri = askeleet[i - 1]?.nostot[t] ?? askeleet[i + 1]?.nostot[t];
        if (naapuri?.sisalla || n.sisalla) puuttui.push(`${i}:${n.nimi}`);
      }
    }
  }
  vaadi(`4. ${nakyma}: eleen aikana yksikään ruudussa oleva nosto ei katoa rungolta`, puuttui.length === 0, puuttui.slice(0, 6).join(', '));
  vaadi(`${nakyma}: ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}
await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
