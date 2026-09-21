/*
 * SELAINSAVUKE: KOKO RUUDUN KORTTI PYSYY TURVA-ALUEEN SISÄLLÄ.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kortti-turva-alue.mjs [kuvakansio]
 *
 * Omistajan iPhone-kaappaus 21.9.2026 (natiivi v2021, skandaali
 * "Kuningattaren kaulanauhajuttu"): kortti alkoi tilarivin alta —
 * kellonaika peitti otsikkorivin SKANDAALIT ja sulkunappi ✕ oli
 * akkukuvakkeen päällä. Fable: kaikkiin koko ruudun kortteihin
 * padding-top env(safe-area-inset-top) (viewport-fit=cover), sulkunappi
 * sen alle; sama alareunaan ja vaaka-asennon sivuihin.
 *
 * Headless-selaimella env(safe-area-inset-*) on 0, joten insetit
 * PAKOTETAAN :root-muuttujiin --turva-* (css/styles.css), joista sekä
 * css (env-fallback ei kelpaa — muuttuja ylikirjoitetaan tyylitagilla)
 * että js/nostokuva.js lukevat ne. Pysty 390 × 844: ylä 47, ala 34.
 * Vaaka 844 × 390: ylä 0, ala 21, vasen 47, oikea 47.
 *
 * Kortit: skandaali (js/skandaalit.js, kuva edellä + Lisää) ja kohdekortti
 * (js/fokuskohteet.js, Chartres, kuva edellä + Lisää). Vartiot per kortti
 * ja asento: otsikkorivin (.fokusnosto-ylarivi) yläreuna ≥ ylä-inset,
 * sulkunapin laatikko kokonaan insetin alapuolella ja sivuinsetin
 * sisäpuolella, kortin alareuna ≤ ruutu − ala-inset, kortin vasen ≥
 * vasen inset ja oikea ≤ ruutu − oikea inset.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'chromium';

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

/** iPhone 14/15 -luokan insetit CSS-pikseleinä (pysty: tilarivi 47, kotipalkki 34). */
const ASENNOT = [
  { nimi: 'pysty', viewport: { width: 390, height: 844 }, turva: { yla: 47, ala: 34, vasen: 0, oikea: 0 } },
  { nimi: 'vaaka', viewport: { width: 844, height: 390 }, turva: { yla: 0, ala: 21, vasen: 47, oikea: 47 } },
];
const KORTIT = [
  {
    nimi: 'skandaali',
    kuori: '.skandaali-kortti',
    avaa: async () => {
      const { SKANDAALIT } = await import('/js/packs/skandaalit.js');
      const { avaaSkandaali } = await import('/js/skandaalit.js');
      const s = (SKANDAALIT.FRA ?? []).find((x) => x.id === 'kaulanauhajuttu-1785');
      if (!s) return false;
      avaaSkandaali(window.matkakirja.ui, 'FRA', s);
      return true;
    },
    sulje: async () => { const { suljeSkandaali } = await import('/js/skandaalit.js'); suljeSkandaali(window.matkakirja.ui); },
  },
  {
    nimi: 'kohdekortti',
    kuori: '.fokuskohde-popup',
    avaa: async () => {
      const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
      const kohde = (KOHDE_MAAT.FRA ?? []).find((k) => k.id === 'chartresin-katedraali');
      if (!kohde) return false;
      avaaFokuskohde(window.matkakirja.ui, kohde);
      return true;
    },
    sulje: async () => { const { suljeFokuskohde } = await import('/js/fokuskohteet.js'); suljeFokuskohde(window.matkakirja.ui); },
  },
];

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
for (const asento of ASENNOT) {
  const ctx = await selain.newContext({ viewport: asento.viewport, deviceScaleFactor: 2, hasTouch: true, isMobile: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => {
    try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
  }, tallenne);
  const s = await ctx.newPage();
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e.message)));
  // Ämpärin kuvat Noden kautta (selaimen CORS), muu verkko kiinni: kuva edellä -kortti
  // ja "Lisää" syntyvät vain, kun pääkuva latautuu.
  await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && !/media\.matkakirja\.app|r2\.dev/.test(u.hostname), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const v = await ampariHaku(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await s.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.game), null, { timeout: 90000 }).then(() => true).catch(() => false);
  vaadi(`${asento.nimi}: peli aukesi`, auki);
  await s.waitForTimeout(2500);
  // Insetit pakotetaan: sama muuttuja, jota css:n env()-säännöt ja js/nostokuva.js lukevat.
  const t = asento.turva;
  await s.addStyleTag({ content: `:root{--turva-yla:${t.yla}px;--turva-ala:${t.ala}px;--turva-vasen:${t.vasen}px;--turva-oikea:${t.oikea}px}` });
  await s.evaluate(() => { for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokusvirta-kortti')) el.remove(); });
  for (const kortti of KORTIT) {
    const mittaa = async (vaihe) => s.evaluate(async ([kuori, vaiheNimi]) => {
      const k = document.querySelector(kuori);
      if (!k) return null;
      const laatikko = (el) => { const r = el?.getBoundingClientRect(); return r ? { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height } : null; };
      return {
        vaihe: vaiheNimi,
        kortti: laatikko(k),
        ylarivi: laatikko(k.querySelector('.fokusnosto-ylarivi, .fokuskohde-ylarivi')),
        otsikko: laatikko(k.querySelector('.fokusnosto-kortti-otsikko, .fokuskohde-otsikko, h3')),
        sulje: laatikko(k.querySelector('.fokusnosto-kortti-sulje, .fokuskohde-sulje, button[aria-label="Sulje"]')),
        lisaa: Boolean(k.querySelector('.nostokuva-lisaa')),
        ruutu: { w: innerWidth, h: innerHeight },
      };
    }, [kortti.kuori, vaihe]);
    const avattu = await s.evaluate(kortti.avaa).catch((e) => String(e));
    await s.waitForTimeout(900);
    const m1 = await mittaa('kuva');
    // "Lisää": lehti latoutuu kuvan ympärille (kuva edellä -kortti).
    const lisaa = await s.evaluate((kuori) => { const n = document.querySelector(`${kuori} .nostokuva-lisaa`); if (n) { n.click(); return true; } return false; }, kortti.kuori);
    await s.waitForTimeout(900);
    const m2 = lisaa ? await mittaa('lehti') : null;
    if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `kortti-turva-alue-${kortti.nimi}-${asento.nimi}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
    tieto(`${asento.nimi}/${kortti.nimi}`, JSON.stringify({ avattu, lisaa, m1: m1 && { kortti: m1.kortti, sulje: m1.sulje, ylarivi: m1.ylarivi }, m2: m2 && { kortti: m2.kortti, sulje: m2.sulje, ylarivi: m2.ylarivi } }));
    vaadi(`${asento.nimi}/${kortti.nimi}: kortti aukesi`, avattu === true && m1?.kortti, String(avattu));
    for (const m of [m1, m2].filter(Boolean)) {
      const tunnus = `${asento.nimi}/${kortti.nimi}/${m.vaihe}`;
      const r = (x) => (x ? `${x.top.toFixed(1)}–${x.bottom.toFixed(1)} × ${x.left.toFixed(1)}–${x.right.toFixed(1)}` : 'ei');
      vaadi(`${tunnus}: kortin yläreuna turva-alueen alapuolella (≥ ${t.yla} px)`, m.kortti.top >= t.yla - 0.5, `kortti ${r(m.kortti)}`);
      // Kuva edellä -vaiheessa sulkunappi ja ylärivi eivät ole vielä ruudulla
      // (js/nostokuva.js: vain kuva, kuvateksti ja Lisää); ne vartioidaan lehdessä.
      if (m.vaihe === 'lehti' || m.sulje?.w > 0) {
        vaadi(`${tunnus}: sulkunappi kokonaan turva-alueen ulkopuolella`,
          m.sulje?.w > 0 && m.sulje.top >= t.yla - 0.5 && m.sulje.right <= m.ruutu.w - t.oikea + 0.5 && m.sulje.left >= t.vasen - 0.5,
          `sulje ${r(m.sulje)}`);
      }
      const ylin = m.ylarivi ?? m.otsikko;
      if (m.vaihe === 'lehti' || ylin?.w > 0) {
        vaadi(`${tunnus}: otsikkorivi turva-alueen alapuolella`, ylin?.w > 0 && ylin.top >= t.yla - 0.5, `ylärivi ${r(ylin)}`);
      }
      vaadi(`${tunnus}: kortin alareuna kotipalkin yläpuolella (≤ ${m.ruutu.h - t.ala} px)`, m.kortti.bottom <= m.ruutu.h - t.ala + 0.5, `kortti ${r(m.kortti)}`);
      vaadi(`${tunnus}: kortti sivuinsettien sisällä`, m.kortti.left >= t.vasen - 0.5 && m.kortti.right <= m.ruutu.w - t.oikea + 0.5, `kortti ${r(m.kortti)}`);
    }
    await s.evaluate(kortti.sulje).catch(() => {});
    await s.waitForTimeout(400);
  }
  vaadi(`${asento.nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
