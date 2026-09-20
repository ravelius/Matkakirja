/*
 * Savuke: KARTUSCHA 3 — PIENESSÄ EI LIPPUA, ISOSSA LIPPU TEKSTIN
 * KORKUINEN, ISO PIENENEE KUN KARTTAAN KOSKETAAN (omistaja 20.9.2026
 * klo 15.20, kaappaus docs/raportit/kaappaukset/omistaja-20260920/
 * kartuscha-v1977.png, sanatarkasti: *"pienennetyssä versiossa ei saa
 * näkyä lippu ja isonnetussa versiossa se pitää olla yhtä korkea kuin
 * maan nimi teksti. lisäksi infokortti pitää pienentyä automaattisesti
 * jos pelaaja koskee karttaan tai liikuttaa sitä"*).
 *
 * === VARTIOT (390 × 844 ja 1400 × 900, Fogg Pariisissa) ===========
 *
 *   1. PIENESSÄ EI LIPPUA: lipun laatikko on 0 × 0 ennen avausta.
 *   2. ISOSSA LIPPU ON VERSAALIN KORKUINEN: lippukuvan korkeus (reuna
 *      mukaan lukien) on otsikon versaalikorkeus ± 2 px. Versaalin
 *      korkeus mitataan otsikon omalla kirjasimella canvasista
 *      (TextMetrics.actualBoundingBoxAscent "RANSKA"), ei
 *      rivikorkeudesta. Lipun alareuna on otsikon perusviivalla (± 2 px).
 *   3. KARTTAAN KOSKEMINEN PIENENTÄÄ: napautus kartalle kortin
 *      ulkopuolelle sulkee ison muodon; sama vedolle ja rullalle.
 *   4. VASTAKOE: napautus kortin SISÄLLE (nykyluvut) ei sulje sitä.
 *   5. Ei sivuvirheitä.
 *
 * Ajo:  PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kartuscha-3.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

async function avaaPeli({ leveys, korkeus }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
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
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200,
        contentType: v.tyyppi ?? 'application/octet-stream',
        body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) {
    await sivu.waitForTimeout(3000);
    await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      clearTimeout(ui.automaattiheittoAjastin);
      ui.automaattiheittoAjastin = null;
      const l = ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1500));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
    await sivu.waitForTimeout(600);
  }
  return { ctx, sivu, virheet, auki };
}

/** Kartuschan mitat ruudusta. */
const lue = (sivu) => sivu.evaluate(() => {
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height,
      keskiX: r.left + r.width / 2, keskiY: r.top + r.height / 2,
    };
  };
  const otsikko = document.querySelector('.maapaneeli-nimi-suomi');
  const lippu = document.querySelector('.maapaneeli-lippu');
  const kuva = document.querySelector('.maapaneeli-lippukuva');
  /*
   * VERSAALIN KORKEUS JA PERUSVIIVA OTSIKON OMALLA KIRJASIMELLA.
   * Rivilaatikko (line-height 1,1) on korkeampi kuin kirjaimet, joten
   * "yhtä korkea kuin teksti" mitataan kirjaimista: canvas antaa
   * versaalin nousun (actualBoundingBoxAscent) ja alapidennyksen
   * puuttumisen (descent ≈ 0 versaalilla). Perusviiva on rivilaatikon
   * sisällä: laatikon yläreuna + puolikas rivivälin ylimäärä + nousu
   * (fontAscent), mutta se on kirjasinkohtainen; siksi perusviiva
   * mitataan suoraan DOMista: nollakorkuinen inline-apuelementti
   * otsikon perässä asettuu perusviivalle.
   */
  let versaali = 0;
  let perusviiva = null;
  if (otsikko) {
    const tyyli = getComputedStyle(otsikko);
    const c = document.createElement('canvas').getContext('2d');
    c.font = `${tyyli.fontWeight} ${tyyli.fontSize} ${tyyli.fontFamily}`;
    versaali = c.measureText('RANSKA').actualBoundingBoxAscent;
    const apu = document.createElement('span');
    apu.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    otsikko.appendChild(apu);
    perusviiva = apu.getBoundingClientRect().bottom;
    apu.remove();
  }
  return {
    valikkoAuki: Boolean(window.matkakirja?.ui?.pallolauta?.maapaneeli?.valikkoAuki?.()),
    kortti: laatikko(document.querySelector('.maapaneeli-kortti')),
    otsikko: laatikko(otsikko),
    avain: laatikko(document.querySelector('.maapaneeli-avain')),
    rivit: laatikko(document.querySelector('.maapaneeli-rivit')),
    lippu: laatikko(lippu),
    lippuNakyy: Boolean(lippu) && !lippu.hidden && lippu.getBoundingClientRect().width > 0,
    lippukuva: laatikko(kuva),
    lippuFontti: lippu ? getComputedStyle(lippu).fontSize : null,
    otsikkoFontti: otsikko ? getComputedStyle(otsikko).fontSize : null,
    versaali,
    perusviiva,
    ruutu: { w: window.innerWidth, h: window.innerHeight },
  };
});

const napauta = async (sivu, x, y) => {
  await sivu.mouse.click(Math.round(x), Math.round(y));
  await sivu.waitForTimeout(400);
};

/*
 * Kartan kohta kortin ulkopuolella: vasen yläosa yläpalkin alla. Ruudun
 * keskellä on saapumiskuvan kortti (hiipuu hitaasti), ja napautus siihen
 * ei ole karttaan koskemista.
 */
const kartanKohta = (t) => ({ x: Math.round(t.ruutu.w * 0.15), y: 140 });

const KAIKKI_RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => r.nimi === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} (${ruutu.leveys}x${ruutu.korkeus}) ===`);
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`${ruutu.nimi} · pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

  /*
   * SAAPUMISKORTTI POIS TIELTÄ: saapumisen kuvakortti (fokuskohde-popup)
   * peittää puhelimella kartan yläosan hiipumiseensa asti, eikä sen
   * napautus ole karttaan koskemista. Suljetaan sen omasta ✕:stä kuten
   * savuke-arvonimet, jotta kartan kohta on aidosti karttaa.
   */
  const suljeSaapumiskortit = () => sivu.evaluate(async () => {
    const { suljeFokusvirta } = await import('./js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    document.querySelector('.fokuskohde-popup .fokuskohde-sulje, .fokuskohde-sulje')?.click();
  });
  await suljeSaapumiskortit();
  await sivu.waitForTimeout(600);
  const kortinTiella = await sivu.evaluate(() => Boolean(document.querySelector('.fokuskohde-popup')));
  tieto(`${ruutu.nimi} saapumiskortti sulkemisen jälkeen`, kortinTiella ? 'yhä DOMissa' : 'poissa');

  /* --- 1. pienessä ei lippua ---------------------------------------- */
  const pieni = await lue(sivu);
  vaadi(`${ruutu.nimi} · 1 pienessä kartuschassa ei ole lippua`,
    !pieni.valikkoAuki && !pieni.lippuNakyy && (pieni.lippu?.w ?? 0) === 0,
    JSON.stringify({ auki: pieni.valikkoAuki, lippu: pieni.lippu }));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `kartuscha3-pieni-${ruutu.nimi}.png`) });

  /* --- 2. isossa lippu on versaalin korkuinen ----------------------- */
  await napauta(sivu, pieni.avain.keskiX, pieni.avain.keskiY);
  const iso = await lue(sivu);
  vaadi(`${ruutu.nimi} · kartuscha aukesi`, iso.valikkoAuki, 'valikko ei auennut');
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `kartuscha3-iso-${ruutu.nimi}.png`) });
  const korkeusEro = Math.abs((iso.lippukuva?.h ?? 0) - iso.versaali);
  const perusviivaEro = iso.perusviiva != null && iso.lippukuva
    ? Math.abs(iso.lippukuva.y1 - iso.perusviiva) : 999;
  tieto(`${ruutu.nimi} lippu`, `kuva ${iso.lippukuva?.h?.toFixed(1)} px, versaali ${iso.versaali.toFixed(1)} px, `
    + `otsikkofontti ${iso.otsikkoFontti}, lipun fontti ${iso.lippuFontti}, `
    + `lipun alareuna ${iso.lippukuva?.y1?.toFixed(1)} vs perusviiva ${iso.perusviiva?.toFixed(1)}`);
  vaadi(`${ruutu.nimi} · 2a isossa lippu näkyy otsikon perässä`,
    iso.lippuNakyy && iso.lippu.x0 >= iso.otsikko.x1 - 2, JSON.stringify({ lippu: iso.lippu, otsikko: iso.otsikko }));
  vaadi(`${ruutu.nimi} · 2b lippu on yhtä korkea kuin maan nimen versaali (± 2 px)`,
    iso.versaali > 8 && korkeusEro <= 2,
    `kuva ${iso.lippukuva?.h?.toFixed(1)} px vs versaali ${iso.versaali.toFixed(1)} px (ero ${korkeusEro.toFixed(1)})`);
  vaadi(`${ruutu.nimi} · 2c lipun alareuna on otsikon perusviivalla (± 2 px)`,
    perusviivaEro <= 2, `ero ${perusviivaEro.toFixed(1)} px`);
  vaadi(`${ruutu.nimi} · 2d lipun em-mitta on otsikon kirjasinkoko`,
    iso.lippuFontti === iso.otsikkoFontti, `${iso.lippuFontti} vs ${iso.otsikkoFontti}`);

  /* --- 4. vastakoe: napautus kortin sisälle ei sulje ---------------- */
  await napauta(sivu, iso.rivit.keskiX, iso.rivit.keskiY);
  const sisalle = await lue(sivu);
  vaadi(`${ruutu.nimi} · 4 vastakoe: napautus kortin sisälle (nykyluvut) ei sulje kartuschaa`,
    sisalle.valikkoAuki, 'kartuscha sulkeutui omasta napautuksestaan');

  /* --- 3a. napautus kartalle sulkee ---------------------------------- */
  const kohta = kartanKohta(sisalle);
  // Saapumisvirta voi tuoda uuden kortin kartan päälle; pois ennen kosketusta.
  await suljeSaapumiskortit();
  await sivu.waitForTimeout(300);
  const kohdalla = await sivu.evaluate(({ x, y }) => {
    const el = document.elementFromPoint(x, y);
    return { kartalla: Boolean(window.matkakirja.ui.pallolauta?.kotelo?.contains(el)), tag: el?.className || el?.tagName };
  }, kohta);
  tieto(`${ruutu.nimi} kosketuskohta`, JSON.stringify({ kohta, ...kohdalla }));
  await napauta(sivu, kohta.x, kohta.y);
  const napautuksenJalkeen = await lue(sivu);
  vaadi(`${ruutu.nimi} · 3a napautus kartalle pienentää kartuschan`,
    !napautuksenJalkeen.valikkoAuki && !napautuksenJalkeen.lippuNakyy,
    JSON.stringify({ auki: napautuksenJalkeen.valikkoAuki, kohta }));

  /* --- 3b. veto kartalla sulkee -------------------------------------- */
  await napauta(sivu, napautuksenJalkeen.avain.keskiX, napautuksenJalkeen.avain.keskiY);
  const ennenVetoa = await lue(sivu);
  vaadi(`${ruutu.nimi} · kartuscha aukesi uudestaan`, ennenVetoa.valikkoAuki);
  const k2 = kartanKohta(ennenVetoa);
  await sivu.mouse.move(k2.x, k2.y);
  await sivu.mouse.down();
  await sivu.mouse.move(k2.x + 60, k2.y + 20, { steps: 8 });
  await sivu.mouse.up();
  await sivu.waitForTimeout(400);
  const vedonJalkeen = await lue(sivu);
  vaadi(`${ruutu.nimi} · 3b veto kartalla pienentää kartuschan`,
    !vedonJalkeen.valikkoAuki, JSON.stringify({ auki: vedonJalkeen.valikkoAuki }));

  /* --- 3c. rulla kartalla sulkee ------------------------------------- */
  await napauta(sivu, vedonJalkeen.avain.keskiX, vedonJalkeen.avain.keskiY);
  const ennenRullaa = await lue(sivu);
  vaadi(`${ruutu.nimi} · kartuscha aukesi kolmannen kerran`, ennenRullaa.valikkoAuki);
  const k3 = kartanKohta(ennenRullaa);
  await sivu.mouse.move(k3.x, k3.y);
  await sivu.mouse.wheel(0, -120);
  await sivu.waitForTimeout(400);
  const rullanJalkeen = await lue(sivu);
  vaadi(`${ruutu.nimi} · 3c rulla kartalla pienentää kartuschan`,
    !rullanJalkeen.valikkoAuki, JSON.stringify({ auki: rullanJalkeen.valikkoAuki }));

  vaadi(`${ruutu.nimi} · 5 sivulla ei ole virheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
