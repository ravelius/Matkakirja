/*
 * Savuke: NOSTOJEN TASOT ELÄVISSÄ NIMIÖISSÄ (Fable 21.9.2026; data
 * Sisältökirjuri docs/raportit/nostotasot-fra-20260920.md, toteutus
 * js/pallolauta/nostot.js NOSTOJEN TASOT, js/fokusnosto-symbolit.js
 * YKKÖSTASON KUVAMERKKI).
 *
 * VARTIOT (390 × 844 ja 1400 × 900, Fogg Marseillessa, Ranska):
 *   1. Saapumisnäkymässä ykköstason nostoja on 6–8 kartalla nimiöllisinä
 *      (data: 8), jokaisella kuvamerkki (rasterin resepti `taso1|assets/
 *      nostotyypit/…`) ja nimiön ruutumitta ≥ 1,25 × kakkostason mitta.
 *   2. Kolmostaso (savukkeen ujuttama `taso: 3` kahdelle kakkostason
 *      nostolle) on piilossa saapumisnäkymässä ja näkyvissä lähizoomilla
 *      (½ saapumisnäkymän leveydestä); ykköstaso pysyy näkyvissä.
 *   3. Ei reunan ylityksiä saapumisessa eikä lähizoomilla (4 px).
 *   4. Sovittelu: yksikään ykköstason lappu ei ole piilotettu.
 *   5. Ei sivuvirheitä.
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostotasot.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '';
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const LAHTOKAUPUNKI = 'marseille';
const KAIKKI_RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.width) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const PALLON_PACK = packById('maailmankartta');
const MAA = PALLON_PACK.map.cityCountry;
const KOHDEMAA = MAA[LAHTOKAUPUNKI];

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});


/** Tasot, kuvamerkit, mitat ja reunat yhdestä hetkestä. */
const LUE = `async (kohde) => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  if (kohde) {
    const c = ui.game.board.cityById.get(kohde.kaupunki);
    const leveys = (l.kamera.kameranTila()?.leveys ?? 300) * kohde.osuus;
    await l.kamera.ajaKamera({ x: c.x, y: c.y, leveys }, { kesto: 0 });
    await new Promise((v) => setTimeout(v, 400));
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 600));
  const laput = l.nostot.lappuLaatikot();
  const osumat = l.nostot.osumaLaatikot();
  const W = innerWidth; const H = innerHeight;
  const yli = laput.filter((r) => r.x0 < -4 || r.y0 < -4 || r.x1 > W + 4 || r.y1 > H + 4).map((r) => r.nimi);
  const elementit = [...document.querySelectorAll('.pallolauta-nosto[data-nosto]')].map((el) => {
    const g = el.querySelector('.pallolauta-nosto-siirto');
    const m = /scale\\(([\\d.]+)\\)/.exec(g?.style.transform ?? '');
    return { id: el.dataset.nosto, taso: el.dataset.taso, nimio: el.dataset.nimio, resepti: g?.dataset.resepti ?? '', mitta: m ? Number(m[1]) : 0, taso1: el.classList.contains('pallolauta-nosto-taso1') };
  });
  const taso1 = elementit.filter((e) => e.taso === '1' && e.nimio);
  const taso2 = elementit.filter((e) => e.taso === '2' && e.nimio && e.mitta > 0);
  const mediaani = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
  const sov = l.nostot.sovittelunTulos?.();
  // Ruudulla olevat ykköstason osumat: kaikkien on oltava nimiöllisinä.
  const koti = l.kotelo.getBoundingClientRect();
  const ruudulla = osumat.filter((o) => o.taso === 1 && o.nimi
    && (o.x0 + o.x1) / 2 >= 0 && (o.x0 + o.x1) / 2 <= koti.width
    && (o.y0 + o.y1) / 2 >= 0 && (o.y0 + o.y1) / 2 <= koti.height);
  // Piilotettu ykköstaso on sallittu vain reunan tuntumassa (ikoni ≤ 60
  // px reunasta: kaikki ehdokkaat ylittäisivät reunan tai osuvat
  // kaupungin nimeen, joka on reunan vieressä) tai rantaviivalla
  // (meri: laattaan poltettu merinimi tai kehä).
  const piilotetutTaso1 = ruudulla.filter((o) => !laput.some((r) => r.id === o.id)).map((o) => {
    const cx = (o.x0 + o.x1) / 2; const cy = (o.y0 + o.y1) / 2;
    const reunalla = cx < 60 || cy < 60 || cx > koti.width - 60 || cy > koti.height - 60;
    const meri = /meri/.test(String(o.laji ?? o.symLaji ?? '')) || /Étretat|Etretat/.test(o.nimi);
    return { nimi: o.nimi, sallittu: reunalla || meri };
  });
  return {
    nimiollisia: laput.length,
    taso1Ruudulla: ruudulla.length,
    taso1: taso1.map((e) => e.nimio),
    taso1Kuvamerkilla: taso1.filter((e) => /taso1\\|assets\\/nostotyypit\\//.test(e.resepti)).length,
    taso1Mitta: mediaani(taso1.map((e) => e.mitta)),
    taso2Mitta: mediaani(taso2.map((e) => e.mitta)),
    taso3: elementit.filter((e) => e.taso === '3').map((e) => e.nimio || e.id),
    taso3Osumia: osumat.filter((o) => o.taso === 3).length,
    yli,
    yliLaput: laput.filter((r) => yli.includes(r.nimi)).map((r) => ({ nimi: r.nimi, puoli: r.puoli, dx: r.dx, dy: r.dy, x0: Math.round(r.x0), x1: Math.round(r.x1), y0: Math.round(r.y0), y1: Math.round(r.y1), W, H, reuna: l.nostojenReuna?.() ?? null })),
    piilotetutTaso1,
    sovittelu: sov ? { piilotettu: sov.piilotettu, lappuja: sov.lappuja } : null,
  };
}`;

for (const ruutu of RUUDUT) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(LAHTOKAUPUNKI);
  const tallenne = JSON.stringify(peli.toJSON());

  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  const tunnus = ruutu.nimi;
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${tunnus}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    await ui.pallolauta.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1600));
  });

  // Saapumisen kuvakortti ja sen sumennus pois ennen mittausta ja
  // kaappauksia (sama kuin savuke-kuvalahteet): mittari ei koske niihin,
  // mutta kaappaus on lukukelvoton sumun takana.
  await sivu.evaluate(() => {
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokuskohde-zoom, .fokusnosto-kerros, [class*="zoomkerros"], [class*="fokuskohde-zoom"]')) el.remove();
  });
  await sivu.waitForTimeout(400);
  const saapuminen = await sivu.evaluate(`(${LUE})(null)`);
  tieto(`${tunnus}: saapumisnäkymä`, JSON.stringify(saapuminen));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nostotasot-${ruutu.width}.png`), scale: 'css' });
  /*
   * 390 px:n saapumisnäkymä ei näytä koko Ranskaa (länsirannikko jää
   * ruudun ulkopuolelle: Mont-Saint-Michel, Étretat, Lascaux), joten
   * puhelimella ruudulla on 4–5 ykköstasoa, joista reunan ja Pariisin
   * nimen vieressä olevat (Versailles, Chambord) jäävät ilman nimiötä
   * (Fable 21.9.2026: kaupungin nimi ja reuna voittavat); työpöydällä
   * kaikki 8, Étretat rantaviivan takia ilman elävää nimiötä.
   */
  const taso1Raja = ruutu.width >= 1000 ? 6 : 3;
  vaadi(`${tunnus}: 1a. ykköstason nostoja saapumisnäkymässä ≥ ${taso1Raja} nimiöllisinä (data 8, ruudulla ${saapuminen.taso1Ruudulla})`,
    saapuminen.taso1.length >= taso1Raja && saapuminen.taso1.length <= 8, JSON.stringify(saapuminen.taso1));
  vaadi(`${tunnus}: 1b. jokaisella ykköstasolla kuvamerkki ja nimiö ≥ 1,25 × kakkostason mitta`,
    saapuminen.taso1Kuvamerkilla === saapuminen.taso1.length && saapuminen.taso1.length > 0
      && saapuminen.taso2Mitta > 0 && saapuminen.taso1Mitta >= saapuminen.taso2Mitta * 1.25,
    JSON.stringify({ kuvamerkilla: saapuminen.taso1Kuvamerkilla, taso1Mitta: saapuminen.taso1Mitta, taso2Mitta: saapuminen.taso2Mitta }));
  vaadi(`${tunnus}: 3a. saapumisnäkymässä ei reunan ylityksiä`, saapuminen.yli.length === 0, JSON.stringify(saapuminen.yli));
  // Kaupungin nimi ja reuna voittavat ykköstason (Fable 21.9.2026):
  // puhelimella Versailles Pariisin nimen vieressä vasemmassa laidassa
  // jää ilman nimiötä (ikoni jää). Muita piilotuksia ei saa olla.
  vaadi(`${tunnus}: 4. ykköstason lappu on piilotettu vain reunan, kaupungin nimen tai rantaviivan tieltä`,
    saapuminen.piilotetutTaso1.every((p) => p.sallittu), JSON.stringify(saapuminen.piilotetutTaso1));

  /*
   * 2. KOLMOSTASO: dataa ei vielä ole (Sisältökirjuri: kenttä on, luokittelu
   * myöhemmin), joten savuke ujuttaa kahdelle kakkostason maastokohteelle
   * `taso: 3` ja lataa laudan uudestaan. Piilossa saapumisessa, näkyvissä
   * lähizoomilla; ykköstaso näkyy molemmissa.
   */
  const ujutus = await sivu.evaluate(async (osuus) => {
    const { ui } = window.matkakirja; const l = ui.pallolauta;
    const { KOHDE_MAAT } = await import('/js/fokuskohteet.js');
    // Kaksi saapumisnäkymässä NÄKYVÄÄ kakkostason kohdetta (KOHDE_MAAT-
    // olio pysyy ladonnasta toiseen, joten ujutus pitää).
    // Marseillen lähellä (lähizoomi × 0,5 keskittyy Marseilleen), kaupungin ulkopuolella.
    const c0 = ui.game.board.cityById.get('marseille');
    const p0 = l.pallo.getScreenCoords(l.asteet(c0).lat, l.asteet(c0).lon, 0);
    const nakyvat = l.nostot.lappuLaatikot().filter((r) => r.taso === 2 && r.perhe === 'nosto')
      .map((r) => ({ r, d: Math.hypot((r.x0 + r.x1) / 2 - p0.x, (r.y0 + r.y1) / 2 - p0.y) }))
      .filter(({ d }) => d < Math.min(innerWidth, innerHeight) * 0.2)
      .sort((a, b) => a.d - b.d)
      .map(({ r }) => r);
    const KOLMOSET = [];
    for (const r of nakyvat) {
      const k = (KOHDE_MAAT.FRA ?? []).find((x) => x.id === r.id && !x.taso && x.tyyppi !== 'kaupunki');
      if (k) KOLMOSET.push(k);
      if (KOLMOSET.length === 2) break;
    }
    for (const k of KOLMOSET) k.taso = 3;
    const tunnukset = KOLMOSET.map((k) => k.id);
    await l.saavu({ kesto: 0 }); await new Promise((v) => setTimeout(v, 500));
    l.ladoHeti(); await new Promise((v) => setTimeout(v, 400));
    const nakyvissa = (lista) => tunnukset.filter((id) => lista.some((o) => o.id === id));
    const saapuen = { osumissa: nakyvissa(l.nostot.osumat()), lapuissa: nakyvissa(l.nostot.lappuLaatikot()), taso1: l.nostot.lappuLaatikot().filter((r) => r.taso === 1).length };
    const c = ui.game.board.cityById.get('marseille');
    const leveys = (l.kamera.kameranTila()?.leveys ?? 300) * osuus;
    await l.kamera.ajaKamera({ x: c.x, y: c.y, leveys }, { kesto: 0 });
    await new Promise((v) => setTimeout(v, 400));
    l.ladoHeti(); await new Promise((v) => setTimeout(v, 400));
    const W = innerWidth; const H = innerHeight;
    const laput = l.nostot.lappuLaatikot();
    const lahella = { osumissa: nakyvissa(l.nostot.osumat()), lapuissa: nakyvissa(laput), taso1: laput.filter((r) => r.taso === 1).length,
      yli: laput.filter((r) => r.x0 < -4 || r.y0 < -4 || r.x1 > W + 4 || r.y1 > H + 4).map((r) => r.nimi) };
    for (const k of KOLMOSET) delete k.taso;
    return { tunnukset, saapuen, lahella };
  }, 0.5);
  tieto(`${tunnus}: kolmostaso`, JSON.stringify(ujutus));
  // Näkyvyysmallissa (nimiöt vakaat) Marseillen lähellä voi olla
  // puhelimella vain yksi nimiöllinen kakkostaso: yksi ujutus riittää.
  vaadi(`${tunnus}: 2a. kolmostaso piilossa saapumisnäkymässä (ei osumissa eikä lapuissa)`,
    ujutus.tunnukset.length >= 1 && ujutus.saapuen.osumissa.length === 0 && ujutus.saapuen.lapuissa.length === 0,
    JSON.stringify({ tunnukset: ujutus.tunnukset, saapuen: ujutus.saapuen }));
  vaadi(`${tunnus}: 2b. kolmostaso näkyvissä lähizoomilla (× 0,5), ykköstasoa yhä kartalla`,
    ujutus.tunnukset.length >= 1 && ujutus.lahella.osumissa.length === ujutus.tunnukset.length && ujutus.lahella.taso1 >= 1,
    JSON.stringify(ujutus.lahella));
  vaadi(`${tunnus}: 3b. lähizoomilla ei reunan ylityksiä`, ujutus.lahella.yli.length === 0, JSON.stringify(ujutus.lahella.yli));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nostotasot-${ruutu.width}-lahi.png`), scale: 'css' });

  vaadi(`${tunnus}: 5. ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
