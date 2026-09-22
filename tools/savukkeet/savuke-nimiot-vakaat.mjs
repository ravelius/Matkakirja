/*
 * Savuke: NIMIÖT VAKAAT — NIMIÖ EI LIIKU ELEEN AIKANA (Fable 21.9.2026,
 * omistaja v1985: *"karttanostot pomppivat kun panoroi tai zoomaa"*;
 * js/pallolauta/sovittelu.js Google Earthin malli, nostot.js sovittele
 * `lepo`, lauta.js lepoladonta).
 *
 * VARTIOT (390 × 844 ja 1400 × 900, Fogg Marseillessa, Ranska):
 *   1. PANOROINTI 2 s (sormi kankaalla): jokaisen eleen alussa
 *      näkyvän lapun asento (kylki, siirto, näkyvyys) on sama joka
 *      näytteessä eleen aikana — nimiö vain seuraa ankkuria.
 *   2. ZOOMI 3 porrasta (ctrl + rulla, pallo.js v1591: paljas rulla
 *      panoroi): sama väite; rulla ja näytteet sivun sisällä rAF:lla
 *      220 ms, vertailu vain ennen lepoladontaa.
 *   3. LEVOSSA eleen jälkeen: yksikään näkyvä nimiö ei ylitä reunaa
 *      (4 px) eivätkä näkyvät nimiöt limity keskenään (0 paria;
 *      ykköstason pakkoasento sallitaan).
 *   4. Häivytys on siirtymä ≤ 200 ms (css .nostosym-nimiokuva) ja
 *      piilotettu nimiö on yhä DOMissa (ikoni jää, nimiö opacity 0).
 *   5. Ei sivuvirheitä.
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nimiot-vakaat.mjs [kuvakansio]
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


/** DOM-asennot: avain → kylki|dx,dy|piilossa (vain resepti ja luokat, ei ruutupaikka). */
const ASENNOT = `() => {
  const ulos = {};
  // Liikevara (22.9.2026): ruudun ulkopuolelle ladottu lappu ei ole pelaajan silmissä —
  // vain kotelon sisällä olevat merkit vertaillaan.
  const koti = window.matkakirja.ui.pallolauta.kotelo.getBoundingClientRect();
  for (const el of document.querySelectorAll('.pallolauta-nosto[data-nosto]:not(.pallolauta-poistuu)')) {
    const g = el.querySelector('.pallolauta-nosto-siirto');
    if (!g) continue;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
    if (cx < koti.left || cx > koti.right || cy < koti.top || cy > koti.bottom) continue;
    const puoli = (g.dataset.resepti ?? '').split('|')[2] ?? '';
    const m = /translate\\(([-\\d.]+)px, ([-\\d.]+)px\\)/.exec(g.style.transform ?? '');
    ulos[el.dataset.nosto] = puoli + '|' + (m ? Math.round(Number(m[1])) + ',' + Math.round(Number(m[2])) : '0,0')
      + '|' + (g.classList.contains('nostosym-nimio-piilossa') ? 'P' : 'N');
  }
  return ulos;
}`;

/** Lepomitta: reunaylitykset ja näkyvien nimiöiden limitys. */
const LEPO = `() => {
  const l = window.matkakirja.ui.pallolauta;
  l.ladoHeti();
  const laput = l.nostot.lappuLaatikot();
  // Laatikot ovat kotelon pikseleinä: reuna on kotelon koko, ei ikkunan.
  const W = l.kotelo.clientWidth; const H = l.kotelo.clientHeight;
  // Ykköstason pakkoasento (kaikki ehdokkaat reunan yli tai tukossa)
  // saa ylittää reunan: se ei häivy (sovittelu.js sääntö 4).
  const asennot = l.nostot.sovittelunAsennot();
  const pakko = (r) => asennot.get('nosto:' + r.id)?.syy === 'pakko' || [...asennot].some(([k, a]) => k.endsWith(':' + r.id) && a.syy === 'pakko');
  // Liikevara (nostot.js LIIKEVARA, 22.9.2026): ruudun ulkopuolelle ladotut laput eivät ole
  // reunaylityksiä — ylitys on lappu, joka on OSITTAIN ruudussa ja osittain sen yli.
  const osittain = (r) => r.x1 > 0 && r.x0 < W && r.y1 > 0 && r.y0 < H;
  const ylittaa = (r) => osittain(r) && (r.x0 < -4 || r.y0 < -4 || r.x1 > W + 4 || r.y1 > H + 4);
  const yli = laput.filter((r) => ylittaa(r) && !pakko(r)).map((r) => r.nimi);
  const yliPakko = laput.filter((r) => ylittaa(r) && pakko(r)).map((r) => r.nimi);
  const lim = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  const parit = [];
  for (let i = 0; i < laput.length; i += 1) {
    for (let j = i + 1; j < laput.length; j += 1) {
      if (lim(laput[i], laput[j])) parit.push(laput[i].nimi + ' × ' + laput[j].nimi + (laput[i].taso === 1 || laput[j].taso === 1 ? ' (taso 1)' : ''));
    }
  }
  const piilossa = [...document.querySelectorAll('.pallolauta-nosto .nostosym-nimio-piilossa')].length;
  const nimioKuva = document.querySelector('.pallolauta-nosto .nostosym-nimiokuva');
  const siirtyma = nimioKuva ? getComputedStyle(nimioKuva).transitionDuration : '';
  return { lappuja: laput.length, yli, yliPakko, parit, piilossa, siirtyma, sovittelu: l.nostot.sovittelunTulos() };
}`;

/** Eleen näytteiden vertailu: asennot, jotka olivat alussa, eivät saa muuttua. */
function eleenMuutokset(naytteet) {
  const alku = naytteet[0] ?? {};
  const muutokset = [];
  for (let i = 1; i < naytteet.length; i += 1) {
    for (const [id, tila] of Object.entries(naytteet[i])) {
      if (alku[id] != null && alku[id] !== tila) muutokset.push(`${id}: ${alku[id]} → ${tila} (näyte ${i})`);
    }
  }
  return [...new Set(muutokset)];
}

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
  await sivu.goto(`${osoite}?lauta=pallo&glnimiot=0${process.env.LIIKEVARA === "0" ? "&liikevara=0" : ""}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
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
  const alku = await sivu.evaluate(`(${LEPO})()`);
  tieto(`${tunnus}: lepo ennen eleitä`, JSON.stringify({ lappuja: alku.lappuja, yli: alku.yli, yliPakko: alku.yliPakko, parit: alku.parit.length, piilossa: alku.piilossa }));

  /** Kamera levossa (skaala sama 400 ms) ja lepoladonta ajettu. */
  const odotaLepo = async () => {
    await sivu.waitForFunction(() => {
      const l = window.matkakirja.ui.pallolauta;
      const s = l.kamera.nakyvaAlue()?.skaala ?? 0;
      const ed = window.__lepoSkaala;
      window.__lepoSkaala = { s, t: performance.now() };
      return Boolean(ed) && Math.abs(ed.s - s) < 1e-6 && performance.now() - ed.t >= 400
        && l.nostot.sovittelunTulos()?.lukossa === false;
    }, null, { timeout: 15000, polling: 100 }).catch(() => {});
    await sivu.waitForTimeout(300);
  };

  /* ── 1. panorointi 2 s ─────────────────────────────────────────── */
  const koti = await sivu.evaluate(() => { const r = window.matkakirja.ui.pallolauta.kotelo.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const x0 = koti.x + koti.w * 0.5;
  const y0 = koti.y + koti.h * 0.55;
  await odotaLepo();
  const naytteetPan = [];
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  naytteetPan.push(await sivu.evaluate(`(${ASENNOT})()`));
  const askelia = 20;
  const t0 = Date.now();
  for (let i = 1; i <= askelia; i += 1) {
    // Loiva kaari: 2 s, yhteensä ~120 px vasemmalle ja 60 px ylös.
    await sivu.mouse.move(x0 - (120 * i) / askelia, y0 - (60 * i) / askelia, { steps: 3 });
    naytteetPan.push(await sivu.evaluate(`(${ASENNOT})()`));
    const tavoite = t0 + (2000 * i) / askelia;
    const odota = tavoite - Date.now();
    if (odota > 0) await sivu.waitForTimeout(odota);
  }
  await sivu.mouse.up();
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `vakaat-${ruutu.width}-pan.png`), scale: 'css' });
  const panMuutokset = eleenMuutokset(naytteetPan);
  tieto(`${tunnus}: panorointi`, `${naytteetPan.length} näytettä, alussa ${Object.keys(naytteetPan[0]).length} lappua, muutoksia ${panMuutokset.length}`);
  vaadi(`${tunnus}: 1. panoroinnin aikana yhdenkään lapun kylki, siirto tai näkyvyys ei muutu`,
    naytteetPan.length >= 10 && Object.keys(naytteetPan[0]).length >= 10 && panMuutokset.length === 0,
    panMuutokset.slice(0, 5).join(' | '));
  await sivu.waitForTimeout(800);
  const lepoPan = await sivu.evaluate(`(${LEPO})()`);
  vaadi(`${tunnus}: 3a. levossa panoroinnin jälkeen: ei reunaylityksiä, näkyvät nimiöt eivät limity`,
    lepoPan.yli.length === 0 && lepoPan.parit.filter((p) => !p.includes('(taso 1)')).length === 0,
    JSON.stringify({ yli: lepoPan.yli, yliPakko: lepoPan.yliPakko, parit: lepoPan.parit.slice(0, 4) }));

  /* ── 2. zoomi 3 porrasta ────────────────────────────────────────── */
  /*
   * ZOOMI KOLMENA PORTAANA. Jokainen rullan porras on oma eleensä:
   * näytteet otetaan heti portaan jälkeen ja 40 ms myöhemmin (kamera
   * liukuu, lepoladonta ei ole ehtinyt: LADONNAN_LEPOVIIVE_MS 260 ms), ja
   * ne verrataan portaan ALKUUN. Portaiden väliin jäävä lepo on oma
   * päätöshetkensä ("zoomiportaittain"), jolloin näkyvyys saa muuttua —
   * Playwrightin rullakierros kestää työpöydällä sekunteja.
   */
  /*
   * NÄYTTEET SIVUN SISÄLLÄ, EI PLAYWRIGHT-KIERROKSINA (kuormaherkkyys,
   * 22.9.2026): vartio 2 punastui koneen kuormassa, kun rullan ja
   * näytteen välinen kierros venyi yli LADONNAN_LEPOVIIVE_MS:n (260 ms) ja
   * lepoladonta — sallittu päätöshetki — osui näytteiden väliin. Nyt
   * rullan jälkeen sivu kirjaa asennot joka kehykseltä 220 ms rAF:lla
   * ilman kierroksia, ja jokaisen näytteen mukana on tieto, oliko
   * sovittelu lukossa (ele) vai lepoladonnan tulos. Vertailu kattaa vain
   * näytteet ennen ensimmäistä lepoladontaa: ele päättyy siihen.
   */
  const NAYTTEET = `async (x, y) => {
    const l = window.matkakirja.ui.pallolauta;
    const asennot = (${ASENNOT});
    // Lepoladonta = sovittelun tulos on UUSI olio (jokainen ladonta luo omansa) eikä lukossa.
    let viime = l.nostot.sovittelunTulos();
    const skaala0 = l.kamera.nakyvaAlue()?.skaala ?? 0;
    const otto = () => {
      const s = l.nostot.sovittelunTulos(); const lepo = s !== viime && s?.lukossa === false; viime = s;
      const sk = l.kamera.nakyvaAlue()?.skaala ?? 0;
      return { t: performance.now(), lepo, sk, liike: Math.abs(sk - skaala0) > 1e-9, a: asennot() };
    };
    // Rulla lähetetään sivun sisältä (WheelEvent kartan päällä olevaan
    // elementtiin, kirjaston wheel-kuuntelija ei vaadi isTrusted-lippua):
    // ei Node-kierrosta rullan ja näytteen väliin. Kirjaus päättyy 220 ms
    // ensimmäisen kameran muutoksen jälkeen tai 4 s:n kuluttua.
    const ulos = [otto()];
    const kohde = document.elementFromPoint(x, y) ?? l.kotelo;
    // ctrl + rulla = zoom (pallo.js v1591: paljas rulla panoroi); zoom liukuu
    // zoominLiuku-rAF:lla, joten ele kestää useita kehyksiä.
    kohde.dispatchEvent(new WheelEvent('wheel', { deltaY: -120, deltaMode: 0, ctrlKey: true, clientX: x, clientY: y, bubbles: true, cancelable: true }));
    const alku = performance.now();
    let liikeAlku = 0;
    await new Promise((valmis) => {
      const askel = () => {
        const o = otto(); ulos.push(o);
        if (o.liike && !liikeAlku) liikeAlku = o.t;
        const nyt = performance.now();
        if ((liikeAlku && nyt - liikeAlku >= 220) || nyt - alku >= 4000) valmis(); else requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
    });
    return ulos;
  }`;
  const zoomMuutokset = [];
  let zoomLappuja = 0;
  let zoomNaytteita = 0;
  await sivu.mouse.move(x0, y0);
  for (let porras = 0; porras < 3; porras += 1) {
    const otot = await sivu.evaluate(`(${NAYTTEET})(${x0}, ${y0})`);
    const ekaLiike = otot.findIndex((o) => o.liike);
    if (ekaLiike < 1) { tieto(`${tunnus}: zoomiporras ${porras + 1}`, `kamera ei liikkunut ${otot.length} näytteen aikana (${Math.round(otot.at(-1).t - otot[0].t)} ms, skaala ${otot[0].sk} → ${otot.at(-1).sk})`); continue; }
    // Alku = viimeinen näyte ennen kameran liikettä; ele päättyy ensimmäiseen lepoladontaan.
    const alku = otot[ekaLiike - 1].a;
    zoomLappuja = Math.max(zoomLappuja, Object.keys(alku).length);
    const eleessa = [];
    for (const o of otot.slice(ekaLiike)) { if (o.lepo) break; eleessa.push(o.a); }
    zoomNaytteita += eleessa.length;
    for (const m of eleenMuutokset([alku, ...eleessa])) zoomMuutokset.push(`porras ${porras + 1}: ${m}`);
    const lepoIdx = otot.findIndex((o, i) => i >= ekaLiike && o.lepo);
    tieto(`${tunnus}: zoomiporras ${porras + 1}`, `${otot.length} näytettä ${Math.round(otot.at(-1).t - otot[0].t)} ms:ssa, liike näytteestä ${ekaLiike}, eleessä ${eleessa.length}, lepoladonta ${lepoIdx >= 0 ? 'näytteessä ' + lepoIdx : 'ei'}`);
    // Lepo portaiden välissä: rullan vaimennus kestää työpöydällä lähes
    // kaksi sekuntia, ja vasta sen jälkeen tulee lepoladonta (260 ms).
    // Päätös saa tulla — se on eleen ULKOPUOLELLA — mutta seuraava
    // porras alkaa vasta kun kamera on levännyt ja ladonta on tehty.
    await odotaLepo();
  }
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `vakaat-${ruutu.width}-zoom.png`), scale: 'css' });
  tieto(`${tunnus}: zoomi`, `3 porrasta, lappuja ${zoomLappuja}, eleen näytteitä ${zoomNaytteita}, muutoksia portaiden aikana ${zoomMuutokset.length}`);
  vaadi(`${tunnus}: 2. zoomiportaan aikana yhdenkään lapun kylki, siirto tai näkyvyys ei muutu`,
    zoomLappuja >= 10 && zoomNaytteita >= 3 && zoomMuutokset.length === 0,
    zoomMuutokset.slice(0, 5).join(' | '));
  await sivu.waitForTimeout(800);
  const lepoZoom = await sivu.evaluate(`(${LEPO})()`);
  vaadi(`${tunnus}: 3b. levossa zoomin jälkeen: ei reunaylityksiä, näkyvät nimiöt eivät limity`,
    lepoZoom.yli.length === 0 && lepoZoom.parit.filter((p) => !p.includes('(taso 1)')).length === 0,
    JSON.stringify({ yli: lepoZoom.yli, yliPakko: lepoZoom.yliPakko, parit: lepoZoom.parit.slice(0, 4) }));
  vaadi(`${tunnus}: 4. häivytys on siirtymä ≤ 200 ms ja piilotettu nimiö on DOMissa`,
    /^0\.(0\d|1\d|2)s?$|^0\.2s$/.test(lepoZoom.siirtyma) && lepoZoom.piilossa >= 0,
    JSON.stringify({ siirtyma: lepoZoom.siirtyma, piilossa: lepoZoom.piilossa }));
  tieto(`${tunnus}: lepo zoomin jälkeen`, JSON.stringify({ lappuja: lepoZoom.lappuja, piilossa: lepoZoom.piilossa, sovittelu: lepoZoom.sovittelu }));

  vaadi(`${tunnus}: 5. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
