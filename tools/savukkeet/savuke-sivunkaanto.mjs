/*
 * Savuke: SIVUNKÄÄNTÖ — lehti kääntyy kuin kirja (StPageFlip; omistaja
 * 5.9.2026 sanatarkasti "Tee 2. Ensin"; Raamattu VALMIIT KIRJASTOT:
 * STPAGEFLIP ENSIN; js/sivunkaanto.js).
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   KIRJASTO ÄMPÄRISTÄ (?lauta=kartta, Lontoon lehti):
 *   1. Kirjasto latautuu vendor/-polusta, kun lehti avataan
 *      (window.St.PageFlip; pyyntö osuu vendor/page-flip-2.0.7).
 *   2. Napin kääntö (Seuraava) avaa kääntöteatterin (.sivunkaanto-
 *      teatteri näkyvissä, kaksi .sivunkaanto-sivua), sivu vaihtuu
 *      heti oikeaan korttiin ja teatteri sulkeutuu alle 1,5 s:ssa.
 *   3. Tarttuva otsikkorivi on ehjä käännön jälkeen: .aihe-nimi
 *      näkyy yläreunassa, siinä hampurilainen ja lukijan kaiutin.
 *   4. Lepotilassa dialogissa ei ole kloonien id-kaksoiskappaleita.
 *   5. Sormiveto: pointer-ele oikealta vasemmalle taittaa sivun kulman
 *      (tila user_fold, kopiolla .sivunkaanto-kaanto) ja irrotus
 *      40 %:n matkan jälkeen vie sivun yli (sivu + 1).
 *   6. Lyhyt veto (< 40 %, hidas) palauttaa lähtösivun ja sen
 *      vierityskohdan.
 *   7. Taaksepäin (Edellinen) on peilattu teatteri (.peilattu) ja
 *      sivu vähenee.
 *   8. Sisällysvalikon rivi kääntää (teatteri auki) ja vie oikealle
 *      sivulle; lukijan kaiutin on uuden sivun otsikkorivissä.
 *   9. Jatkuva luenta kääntää sivun teatterin kautta (jatkaLehdenLuentaa).
 *   Mittarit (raportti): DOM-solmut ennen, käännön aikana ja jälkeen;
 *      käännön kehysajat p95 ja max; klooniin kuluva aika.
 *
 *   VARAPOLUT:
 *  10. Ilman kirjastoa (vendor katkaistu): teatteria ei synny, sivu
 *      vaihtuu vanhalla liu'ulla (.sivu-oikealta).
 *  11. Lippu matkakirja-sivunkaanto=0: sama vanha pino.
 *  12. reducedMotion: sama vanha pino — eikä liukuakaan.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa — kirjasto
 * reititetään selaimelle täältä. Ilman ämpäriä savuke ajaa vain
 * varapolkujen vartiot ja toteaa sen.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-sivunkaanto.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
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
const VENDOR = 'vendor/page-flip-2.0.7.browser.js';
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
const kirjasto = await ampariHaku(`${AMPARI}${VENDOR}`);
const AMPARI_TOIMII = kirjasto?.status === 200;
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — kirjasto ei voi latautua; ajetaan vain varapolkujen vartiot');
else tieto('kirjasto ämpäristä', `${kirjasto.body.length} tavua`);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Uusi sivu Lontoon lehdessä: ämpäri reititetty (tai kirjasto katkaistu). */
async function avaaLehti({ kirjastoSaa = true, lippu = null, reducedMotion = 'no-preference' } = {}) {
  /*
   * Palvelutyöntekijä estetään: sw.js säilöö vendor/-kirjastot omaan
   * koriinsa (VENDORCACHE), ja workerin oma fetch ohittaa Playwrightin
   * page.routen — reititys ämpäriin ei näkisi pyyntöä lainkaan
   * (todettu 5.9.2026: skripti jäi ikuisesti odottamaan).
   */
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion, hasTouch: true,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((arvo) => {
    try {
      if (arvo === null) localStorage.removeItem('matkakirja-sivunkaanto');
      else localStorage.setItem('matkakirja-sivunkaanto', arvo);
    } catch { /* yksityinen tila */ }
  }, lippu);
  const sivu = await ctx.newPage();
  const pyynnot = { kirjasto: 0, virheet: [] };
  sivu.on('pageerror', (e) => pyynnot.virheet.push(String(e.message ?? e)));
  sivu.on('console', (m) => {
    // Katkaistut ämpäri- ja Commons-pyynnöt (route.abort) ja paikallisen
    // palvelimen puuttuvat kuvat eivät ole käännön vikoja.
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) pyynnot.virheet.push(m.text());
  });
  sivu.on('request', (r) => { if (r.url().includes(VENDOR)) pyynnot.kirjasto += 1; });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const url = route.request().url();
    if (!url.includes('/vendor/')) { route.abort(); return; }
    if (!kirjastoSaa) { route.abort(); return; }
    const vastaus = await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: 'text/javascript', body: vastaus.body });
  });
  await sivu.goto(`${osoite}?lauta=kartta`, { waitUntil: 'load' });
  await sivu.waitForTimeout(1500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1000);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') {
      g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
      window.matkakirja.ui.render();
    }
  });
  await sivu.waitForTimeout(1200);
  // Lehtilukko auki ennen avausta (ks. savuke-lehtiotsikko): laatta pois.
  await sivu.evaluate(() => {
    window.matkakirja.game.tokens?.delete('lontoo');
    window.matkakirja.ui.openArrival(window.matkakirja.ui.game.board.cityById.get('lontoo'));
  });
  await sivu.waitForTimeout(900);
  return { ctx, sivu, pyynnot };
}

/** Kääntöteatterin tila selaimesta. */
const teatterinTila = () => ({
  auki: Boolean(document.querySelector('.sivunkaanto-teatteri:not([hidden])')),
  sivuja: document.querySelectorAll('.sivunkaanto-teatteri .sivunkaanto-sivu').length,
  peilattu: Boolean(document.querySelector('.sivunkaanto-teatteri.peilattu:not([hidden])')),
  kaanto: Boolean(document.querySelector('.sivunkaanto-teatteri .sivunkaanto-kaanto')),
  sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
  liuku: Boolean(document.querySelector('#arrival-kategoria.sivu-oikealta, #arrival-kategoria.sivu-vasemmalta')),
  kirjasto: typeof window.St?.PageFlip === 'function',
  dom: document.querySelectorAll('*').length,
});

/** Odottaa, että teatteri sulkeutuu; palauttaa odotusajan ms tai -1. */
async function odotaSulku(sivu, katto = 1500) {
  const alku = Date.now();
  const ok = await sivu.waitForFunction(() => !document.querySelector('.sivunkaanto-teatteri:not([hidden])'),
    null, { timeout: katto }).then(() => true).catch(() => false);
  return ok ? Date.now() - alku : -1;
}

/* ================= KIRJASTO ÄMPÄRISTÄ ================= */
if (AMPARI_TOIMII) {
  const { ctx, sivu, pyynnot } = await avaaLehti();
  const auki = await sivu.evaluate(() => Boolean(document.getElementById('arrival-dialog')?.open));
  vaadi('lehti on auki (lehtilukko ei ohita)', auki);
  const latautui = await sivu.waitForFunction(() => typeof window.St?.PageFlip === 'function', null, { timeout: 15000 })
    .then(() => true).catch(() => false);
  vaadi('1. kirjasto latautuu vendor/-polusta lehden avautuessa', latautui && pyynnot.kirjasto >= 1,
    `St=${latautui}, pyyntöjä ${pyynnot.kirjasto}`);
  if (pyynnot.virheet.length) tieto('sivun virheet', pyynnot.virheet.slice(0, 5).join(' | '));

  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'sivunkaanto-kansi.png') });
  /* 2. Napin kääntö + mittarit (ilman kaappausta: kuvan otto pysäyttää
   * piirron ja vääristäisi kehysajat — kääntökuva otetaan vartiossa 9) */
  const nappi = await sivu.evaluate(async () => {
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));
    const domEnnen = document.querySelectorAll('*').length;
    const sivuEnnen = window.matkakirja.ui.lehtitila.tutkiSivu;
    // Kehysajat käännön ajalta.
    const kehykset = [];
    let edellinen = performance.now();
    let mittaa = true;
    const askel = (t) => { kehykset.push(t - edellinen); edellinen = t; if (mittaa) requestAnimationFrame(askel); };
    requestAnimationFrame(askel);
    const t0 = performance.now();
    document.querySelector('.tutki-alanapit .seuraava')?.click();
    const kesti = performance.now() - t0;
    const heti = {
      auki: Boolean(document.querySelector('.sivunkaanto-teatteri:not([hidden])')),
      sivuja: document.querySelectorAll('.sivunkaanto-teatteri .sivunkaanto-sivu').length,
      sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
      dom: document.querySelectorAll('*').length,
    };
    await odota(120);
    const kesken = {
      kaanto: Boolean(document.querySelector('.sivunkaanto-teatteri .sivunkaanto-kaanto')),
      dom: document.querySelectorAll('*').length,
    };
    let odotettu = 0;
    while (document.querySelector('.sivunkaanto-teatteri:not([hidden])') && odotettu < 2000) { await odota(50); odotettu += 50; }
    mittaa = false;
    await odota(50);
    const nimi = document.querySelector('#arrival-kategoria .aihe-nimi');
    const r = nimi?.getBoundingClientRect();
    const kloonit = document.querySelectorAll('#arrival-dialog [id="arrival-city"]').length;
    const jarj = kehykset.slice(3).sort((a, b) => a - b);
    return {
      domEnnen, sivuEnnen, heti, kesken, odotettu, kesti,
      domJalkeen: document.querySelectorAll('*').length,
      sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
      nimiYlhaalla: Boolean(r) && r.top >= 0 && r.top < 120 && r.height > 0,
      hampurilainen: Boolean(nimi?.querySelector('.lehti-hampurilainen:not([hidden])')),
      kaiutin: Boolean(nimi?.querySelector('.lukija-nappi')),
      kloonit,
      kehyksia: jarj.length,
      p95: jarj[Math.floor(jarj.length * 0.95)] ?? 0,
      max: jarj[jarj.length - 1] ?? 0,
    };
  });
  vaadi('2. Seuraava avaa kääntöteatterin ja piirtää uuden sivun heti',
    nappi.heti.auki && nappi.heti.sivuja === 2 && nappi.heti.sivu === nappi.sivuEnnen + 1,
    JSON.stringify(nappi.heti));
  vaadi('   taite on kääntöpuoli (huntu) käännön aikana', nappi.kesken.kaanto === true);
  vaadi('   teatteri sulkeutuu alle 1,5 s:ssa', nappi.odotettu < 1500, `${nappi.odotettu} ms`);
  vaadi('3. tarttuva otsikkorivi ehjä: aihe-nimi ylhäällä, hampurilainen ja kaiutin siinä',
    nappi.nimiYlhaalla && nappi.hampurilainen && nappi.kaiutin, JSON.stringify(nappi));
  vaadi('4. lepotilassa dialogissa on yksi #arrival-city (ei kloonien kaksoiskappaleita)',
    nappi.kloonit === 1, `${nappi.kloonit}`);
  tieto('DOM-solmut ennen / käännön aikana / jälkeen', `${nappi.domEnnen} / ${nappi.kesken.dom} / ${nappi.domJalkeen}`);
  tieto('kloonaus + piirto (napin käsittelijä)', `${nappi.kesti.toFixed(1)} ms`);
  tieto('käännön kehysaika p95 / max', `${nappi.p95.toFixed(1)} / ${nappi.max.toFixed(1)} ms (${nappi.kehyksia} kehystä)`);

  /* 5. Sormiveto eteenpäin: taite seuraa, irrotus 45 %:n matkalla vie yli */
  const ennenVetoa = await sivu.evaluate(() => window.matkakirja.ui.lehtitila.tutkiSivu);
  const alkuX = 330; const alkuY = 500;
  await sivu.touchscreen.tap(1, 1).catch(() => {});
  await sivu.mouse.move(alkuX, alkuY);
  await sivu.mouse.down();
  await sivu.mouse.move(alkuX - 20, alkuY, { steps: 2 });
  await sivu.mouse.move(alkuX - 90, alkuY + 10, { steps: 6 });
  const kesken = await sivu.evaluate(teatterinTila);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'sivunkaanto-veto-kesken.png') });
  await sivu.mouse.move(alkuX - 190, alkuY + 20, { steps: 8 });
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'sivunkaanto-veto-puolessa.png') });
  await sivu.waitForTimeout(350);
  await sivu.mouse.up();
  const sulku5 = await odotaSulku(sivu);
  const jalkeen5 = await sivu.evaluate(teatterinTila);
  vaadi('5. sormiveto taittaa sivun kulman (teatteri auki, kääntöpuoli näkyy)',
    kesken.auki && kesken.kaanto && !kesken.peilattu, JSON.stringify(kesken));
  vaadi('   irrotus 45 %:n matkalla vie sivun yli', sulku5 >= 0 && jalkeen5.sivu === ennenVetoa + 1,
    `sulku ${sulku5} ms, sivu ${ennenVetoa} → ${jalkeen5.sivu}`);

  /* 6. Lyhyt veto palauttaa lähtösivun ja vierityskohdan */
  await sivu.evaluate(() => { document.querySelector('#arrival-dialog .dialog-card').scrollTop = 300; });
  const ennen6 = await sivu.evaluate(() => ({
    sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
    vieritys: document.querySelector('#arrival-dialog .dialog-card').scrollTop,
  }));
  await sivu.mouse.move(alkuX, alkuY);
  await sivu.mouse.down();
  await sivu.mouse.move(alkuX - 20, alkuY, { steps: 2 });
  await sivu.mouse.move(alkuX - 60, alkuY, { steps: 4 });
  await sivu.waitForTimeout(450);
  await sivu.mouse.up();
  const sulku6 = await odotaSulku(sivu);
  const jalkeen6 = await sivu.evaluate(() => ({
    sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
    vieritys: document.querySelector('#arrival-dialog .dialog-card').scrollTop,
    kloonit: document.querySelectorAll('#arrival-dialog [id="arrival-city"]').length,
  }));
  // Vierityskohta palautetaan pikselilleen, mutta Chromen
  // vieritysankkurointi siirtää sitä uudelleen piirretyn sivun kuvien
  // asettuessa (mitattu −102…+90 px ajosta riippuen; näkyvä sisältö
  // pysyy paikallaan) — vartio vaatii, ettei kohta palaa sivun alkuun.
  vaadi('6. lyhyt hidas veto palauttaa lähtösivun ja vierityskohdan',
    sulku6 >= 0 && jalkeen6.sivu === ennen6.sivu && jalkeen6.vieritys >= 100 && jalkeen6.kloonit === 1,
    `${JSON.stringify(ennen6)} → ${JSON.stringify(jalkeen6)}`);
  // Pyyhkäisyn click-tulppa (350 ms) ehtii raueta ennen seuraavaa nappia.
  await sivu.waitForTimeout(400);

  /* 7. Taaksepäin = peilattu teatteri */
  const ennen7 = await sivu.evaluate(() => window.matkakirja.ui.lehtitila.tutkiSivu);
  await sivu.evaluate(() => document.querySelector('.tutki-alanapit .edellinen')?.click());
  const kesken7 = await sivu.evaluate(teatterinTila);
  await sivu.waitForTimeout(140);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'sivunkaanto-taakse-kesken.png') });
  const sulku7 = await odotaSulku(sivu);
  const jalkeen7 = await sivu.evaluate(teatterinTila);
  vaadi('7. Edellinen kääntää peilatussa teatterissa ja sivu vähenee',
    kesken7.auki && kesken7.peilattu && sulku7 >= 0 && jalkeen7.sivu === ennen7 - 1,
    `${JSON.stringify(kesken7)} → ${jalkeen7.sivu}`);

  /* 8. Sisällysvalikon hyppy + lukijan kaiutin uudella sivulla */
  const sisallys = await sivu.evaluate(async () => {
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));
    const { ui } = window.matkakirja;
    document.querySelector('.lehti-hampurilainen')?.click();
    await odota(250);
    const rivit = [...document.querySelectorAll('.sisallys-levy .sisallys-rivi')];
    const kohde = rivit[rivit.length - 1];
    const otsikko = kohde?.querySelector('.sisallys-otsikko')?.textContent ?? '';
    kohde?.click();
    const heti = {
      auki: Boolean(document.querySelector('.sivunkaanto-teatteri:not([hidden])')),
      sivu: ui.lehtitila.tutkiSivu,
    };
    let odotettu = 0;
    while (document.querySelector('.sivunkaanto-teatteri:not([hidden])') && odotettu < 2000) { await odota(50); odotettu += 50; }
    const nimi = document.querySelector('#arrival-kategoria .aihe-nimi');
    const nappi = nimi?.querySelector('.lukija-nappi');
    return {
      rivit: rivit.length, otsikko, heti, odotettu,
      sivu: ui.lehtitila.tutkiSivu,
      sivuja: 1 + (ui.lehtitila.tutkiSivut?.length ?? 0),
      otsikkoSivulla: nimi?.textContent?.trim() ?? '',
      kaiutin: Boolean(nappi),
      kaiutinLahde: Boolean(nappi?.__lukijaLahde?.()?.classList?.contains('dialog-card')),
    };
  });
  vaadi('8. sisällysvalikon rivi kääntää teatterissa ja vie viimeiselle sivulle',
    sisallys.rivit >= 2 && sisallys.heti.auki && sisallys.odotettu < 1500 && sisallys.sivu === sisallys.sivuja - 1,
    JSON.stringify(sisallys));
  vaadi('   lukijan kaiutin on uuden sivun otsikkorivissä ja lukee oikeaa korttia',
    sisallys.kaiutin && sisallys.kaiutinLahde, JSON.stringify(sisallys));

  /* 9. Jatkuva luenta kääntää teatterin kautta (+ kääntökuva kesken) */
  const kaappaus = KUVAKANSIO
    ? sivu.waitForTimeout(400).then(() => sivu.screenshot({ path: join(KUVAKANSIO, 'sivunkaanto-nappi-kesken.png') }))
    : Promise.resolve();
  const luenta = await sivu.evaluate(async () => {
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));
    const { ui } = window.matkakirja;
    ui.naytaTutkiSivu(1, { heti: true });
    await odota(200);
    const ennen = ui.lehtitila.tutkiSivu;
    // Sama koukku, jota lukija kutsuu luennan päättyessä automoodissa
    // (js/lehti.js varustaLukija → jatko: jatkaLehdenLuentaa).
    const jatko = document.querySelector('#arrival-dialog .lukija-nappi')?.__lukijaJatko;
    const tulos = typeof jatko === 'function' ? jatko() : null;
    const auki = Boolean(document.querySelector('.sivunkaanto-teatteri:not([hidden])'));
    let odotettu = 0;
    while (document.querySelector('.sivunkaanto-teatteri:not([hidden])') && odotettu < 2000) { await odota(50); odotettu += 50; }
    return { ennen, tulos: Boolean(tulos), auki, sivu: ui.lehtitila.tutkiSivu, odotettu };
  });
  await kaappaus;
  vaadi('9. jatkuva luenta kääntää sivun teatterin kautta', luenta.auki && luenta.sivu === luenta.ennen + 1 && luenta.odotettu < 1500,
    JSON.stringify(luenta));
  // Lepotilan hinta: kirjaston rAF-silmukka pyörii ikuisesti, mutta
  // piirto on portitettu pois (js/sivunkaanto.js) — kehysajan on
  // oltava joutilaan sivun tasoa.
  const lepo = await sivu.evaluate(() => new Promise((ok) => {
    const ajat = [];
    let edellinen = performance.now();
    const askel = (t) => {
      ajat.push(t - edellinen); edellinen = t;
      if (ajat.length < 40) requestAnimationFrame(askel);
      else { const j = ajat.slice(2).sort((a, b) => a - b); ok({ p95: j[Math.floor(j.length * 0.95)], max: j[j.length - 1] }); }
    };
    requestAnimationFrame(askel);
  }));
  tieto('lepotilan kehysaika teatterin kanssa p95 / max', `${lepo.p95.toFixed(1)} / ${lepo.max.toFixed(1)} ms`);
  vaadi('   lepotilassa teatteri ei maksa kehyksiä (p95 ≤ 34 ms)', lepo.p95 <= 34, `${lepo.p95.toFixed(1)} ms`);
  if (pyynnot.virheet.length) tieto('sivun virheet lopussa', pyynnot.virheet.slice(0, 5).join(' | '));
  vaadi('   ei sivuvirheitä käännösten aikana', pyynnot.virheet.length === 0, pyynnot.virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

/* ================= VARAPOLUT ================= */
const varapolku = async (nimi, asetukset, odotaLiuku) => {
  const { ctx, sivu, pyynnot } = await avaaLehti(asetukset);
  await sivu.waitForTimeout(800);
  const tila = await sivu.evaluate(async () => {
    const odota = (ms) => new Promise((r) => setTimeout(r, ms));
    const ennen = window.matkakirja.ui.lehtitila.tutkiSivu;
    document.querySelector('.tutki-alanapit .seuraava')?.click();
    const heti = {
      auki: Boolean(document.querySelector('.sivunkaanto-teatteri:not([hidden])')),
      liuku: Boolean(document.querySelector('#arrival-kategoria.sivu-oikealta')),
      sivu: window.matkakirja.ui.lehtitila.tutkiSivu,
    };
    await odota(400);
    return { ennen, heti, kirjasto: typeof window.St?.PageFlip === 'function' };
  });
  vaadi(`${nimi}: teatteria ei synny, sivu vaihtuu vanhalla pinolla`,
    !tila.heti.auki && tila.heti.sivu === tila.ennen + 1 && (odotaLiuku ? tila.heti.liuku : true),
    `${JSON.stringify(tila)} pyyntöjä ${pyynnot.kirjasto}`);
  await ctx.close();
  return tila;
};
const ilman = await varapolku('10. ilman kirjastoa (vendor katkaistu)', { kirjastoSaa: false }, true);
vaadi('    kirjastoa ei ole ikkunassa, kun ämpäri ei vastaa', ilman.kirjasto === false);
await varapolku('11. lippu matkakirja-sivunkaanto=0', { lippu: '0' }, true);
await varapolku('12. reduced motion', { reducedMotion: 'reduce' }, false);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
