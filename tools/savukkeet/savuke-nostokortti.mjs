/*
 * Savuke: NOSTOKORTTI — LÄHDERIVI POIS, KARUSELLI, HAVAINNEKUVA-MERKKI,
 * KUVAN KOKO LISÄÄ-TILASSA, PYYHKÄISY JA NUOLINÄPPÄIMET.
 *
 * Omistajan tilaus 20.9.2026 (kaappaukset docs/raportit/kaappaukset/
 * omistaja-20260920/nosto-*.webp), Fablen erä "nostokortti":
 *
 *   1. Kortin alaosan lähderivi ("Maalehden sivu …, js/packs/…") on
 *      poissa KAIKISTA nostotyypeistä: täkynosto, kohdekortti,
 *      hahmotelma, eläintäky, skandaali, historian hetki. Kuvan oma
 *      lähderivi (Commons) SÄILYY (.fokusnosto-kuvalahde /
 *      .nostokuva-lahde / .fokuskohde-kuvalahde).
 *   2. Useampi kuva on KARUSELLI (laskuri "1 / 2"), ei pino: myös
 *      kohdekortilla (Avignonin paavinpalatsi: kuva + kuvat).
 *   3. Generoitu kuva saa "Havainnekuva"-pientekstin lyhyeen
 *      kuvatekstiin (lahde alkaa "Tekoälyllä tuotettu havainnekuva.").
 *   4. Kuva pysyy samankokoisena pienestä kortista LISÄÄ-tilaan:
 *      korkeus LISÄÄ / pieni ≥ 0,8 (mitataan Chaîne des Puys, 2 kuvaa).
 *   5. Karuselli vaihtaa kuvaa pyyhkäisyllä (pointer-ele) ja
 *      nuolinäppäimillä (vasen/oikea), ei vain reunanuolista.
 *
 * Ruudut 390 × 844 ja 1400 × 900. Ämpäri Noden kautta.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostokortti.mjs [kuvakansio]
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
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

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

// iPad-pysty (820×1180) tuli nostokortti 2:n myötä (omistaja 20.9.2026):
// omistajan kaappaus pystykuvasta ja leikkautuneesta otsikosta oli juuri
// tältä ruudulta.
const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400', 'ipad']).map((w) => ({
  390: { nimi: '390', width: 390, height: 844 },
  1400: { nimi: '1400', width: 1400, height: 900 },
  ipad: { nimi: 'ipad', width: 820, height: 1180 },
}[w]));

/** Kortin yleismitat: lähderivi, kuvalähde, laskuri, havainne, kuva. */
const LUE = `(juuri) => {
  const k = document.querySelector(juuri);
  if (!k) return null;
  const img = k.querySelector('.nostokuva-img, .fokusnosto-kuva img, .fokuskohde-kuva img, .elaintaky-kuva img, .elaintaky-karuselli-ruutu img');
  return {
    lahderivi: [...k.querySelectorAll('.fokusnosto-lahde')].map((e) => e.textContent.trim()),
    kuvalahde: [...k.querySelectorAll('.fokusnosto-kuvalahde, .nostokuva-lahde, .fokuskohde-kuvalahde')]
      .map((e) => e.textContent.trim()).filter(Boolean),
    laskuri: k.querySelector('.nostosarja-kuvalaskuri')?.textContent?.trim() ?? '',
    kuvia: k.querySelectorAll('figure').length,
    havainne: [...k.querySelectorAll('.kuvateksti-havainne')].map((e) => e.textContent),
    kuvaKorkeus: img ? Math.round(img.getBoundingClientRect().height) : 0,
    kuvaLeveys: img ? Math.round(img.getBoundingClientRect().width) : 0,
    nappi: (() => { const n = k.querySelector('.nostokuva-nappi, .fokusnosto-kuvanappi, .fokuskohde-kuvanappi'); const r = n?.getBoundingClientRect(); return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width } : null; })(),
    teksti: k.textContent.length,
    // Nostokortti 2: kortin ja kuvan laatikot ruudulla, otsikon näkyvyys.
    kortti: (() => { const r = k.getBoundingClientRect(); return { x: Math.round(r.left), w: Math.round(r.width), top: Math.round(r.top), bottom: Math.round(r.bottom) }; })(),
    kuva: img ? (() => { const r = img.getBoundingClientRect(); return { x: Math.round(r.left), w: Math.round(r.width), top: Math.round(r.top), bottom: Math.round(r.bottom) }; })() : null,
    // Sisältökotelon sisäala ilman vierityspalkin kaistaa (scrollbar-gutter): kuva keskittyy tähän.
    sisus: (() => { const s = k.querySelector('.nostokuva-sisalto, .fokusnosto-sisalto, .fokuskohde-sisalto'); if (!s) return null; const r = s.getBoundingClientRect(); return { x: Math.round(r.left + s.clientLeft), w: s.clientWidth }; })(),
    otsikko: (() => {
      const o = k.querySelector('.fokusnosto-kortti-otsikko, .fokuskohde-otsikko, h3');
      if (!o) return null;
      const r = o.getBoundingClientRect();
      // Tyyppirivi (kohdekortin ylärivi) kuuluu samaan "otsikko näkyy" -vaatimukseen.
      const y = k.querySelector('.fokuskohde-ylarivi')?.getBoundingClientRect();
      const s = k.querySelector('.nostokuva-sisalto, .fokusnosto-sisalto, .fokuskohde-sisalto') ?? k;
      return { top: Math.round(Math.min(r.top, y?.top ?? r.top)), bottom: Math.round(r.bottom), h: Math.round(r.height), vieritys: Math.round(s.scrollTop ?? 0), teksti: o.textContent.trim().slice(0, 40), tyyppirivi: y ? Math.round(y.top) : null };
    })(),
    nuolet: [...k.querySelectorAll('.nostosarja-kuvanuoli')].map((n) => { const r = n.getBoundingClientRect(); const cs = getComputedStyle(n); return { w: Math.round(r.width), h: Math.round(r.height), fontPx: parseFloat(cs.fontSize), bg: cs.backgroundColor, x: Math.round(r.left), top: Math.round(r.top) }; }),
  };
}`;

/** Suurennoksen mitat: kuva, väkäset, laskuri. */
const LUE_ZOOM = `() => {
  const z = document.querySelector('.fokuskohde-zoom');
  if (!z) return null;
  const img = z.querySelector('.fokuskohde-zoomkuva');
  const r = img?.getBoundingClientRect();
  return {
    kuva: r ? { x: Math.round(r.left), w: Math.round(r.width), top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) } : null,
    src: img?.currentSrc || img?.src || '',
    laskuri: z.querySelector('.fokuskohde-zoomlaskuri')?.textContent?.trim() ?? '',
    nuolet: [...z.querySelectorAll('.fokuskohde-zoomnuoli')].map((n) => { const b = n.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), fontPx: parseFloat(getComputedStyle(n).fontSize) }; }),
    auki: z.classList.contains('fokuskohde-zoom-auki'),
  };
}`;

const TYOPOLKU = /Maalehden sivu|js\/packs\/|luetaan lehdestä|en-Wikipedia|tarkistettu \d/;

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height }, deviceScaleFactor: 1, serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
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
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.pallolauta, null, { timeout: 90000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(() => { const { ui } = window.matkakirja; clearTimeout(ui.automaattiheittoAjastin); ui.automaattiheittoAjastin = null; });

  /*
   * SAAPUMISVIRTA POIS TIELTÄ (CI 20.9.2026, PR #2634: väite 5b punainen
   * molemmilla ruuduilla, paikallisesti vihreä). Saapumisen kuvakortit
   * (js/fokusvirta.js) nousevat kartan päälle omaan tahtiinsa, ja CI:n
   * ajoituksella sellainen kuva osui täsmälleen pyyhkäisyn
   * lähtöpisteeseen: pointerdown meni saapumiskuvan <img>:lle eikä
   * kortin kuvanapille, joten sarja ei nähnyt elettä. Virta suljetaan
   * pelin omalla sulkijalla ja jäänteet poistetaan ennen jokaista
   * korttia — sama kuin savuke-kuvalahteet ja savuke-kartuscha-3.
   */
  const siivoa = () => sivu.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros, .saapumistraileri, .fokusvirta-isokuva, .fokuskohde-zoom')) el.remove();
  });

  /* ── 1 + 4 + 5: täkynosto, kaksi kuvaa (Chaîne des Puys) ─────────── */
  await siivoa();
  const pieni = await sivu.evaluate(async (lue) => {
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, 'maalehti-chaine-des-puys');
    await new Promise((v) => setTimeout(v, 700));
    return { loytyi, ...(eval(lue))('.fokusnosto-kortti') };
  }, LUE);
  vaadi(`${ruutu.nimi} · täkynosto aukesi pienenä (kuva edellä)`, pieni?.loytyi && pieni.kuvaKorkeus > 0, JSON.stringify(pieni));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-pieni-${ruutu.nimi}.png`) });
  const lisaa = await sivu.evaluate(async (lue) => {
    document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return (eval(lue))('.fokusnosto-kortti');
  }, LUE);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-lisaa-${ruutu.nimi}.png`) });
  const suhde = pieni.kuvaKorkeus ? lisaa.kuvaKorkeus / pieni.kuvaKorkeus : 0;
  tieto(`${ruutu.nimi} · kuvan korkeus pieni / LISÄÄ`, `${pieni.kuvaKorkeus} / ${lisaa.kuvaKorkeus} px (suhde ${suhde.toFixed(2)})`);
  vaadi(`${ruutu.nimi} · 4. kuva pysyy lähes samankokoisena LISÄÄ-tilassa (≥ 0,8 × pieni)`,
    suhde >= 0.8 && suhde <= 1.05, `suhde ${suhde.toFixed(2)}`);
  vaadi(`${ruutu.nimi} · 1a. täkynoston kortissa ei ole työpolkulähderiviä`,
    lisaa.lahderivi.length === 0 && !TYOPOLKU.test(lisaa.lahderivi.join(' ')) && lisaa.teksti > 200,
    JSON.stringify(lisaa.lahderivi));
  vaadi(`${ruutu.nimi} · 1b. kuvan oma lähderivi (Commons) säilyy`,
    lisaa.kuvalahde.some((t) => /Commons|Valokuva|CC|public domain/i.test(t)), JSON.stringify(lisaa.kuvalahde));
  vaadi(`${ruutu.nimi} · 2a. kahden kuvan nosto on karuselli (laskuri 1 / 2)`,
    /^1\s*\/\s*2$/.test(lisaa.laskuri), `laskuri "${lisaa.laskuri}"`);
  // 5a: nuolinäppäin oikealle
  const nappain = await sivu.evaluate(async (lue) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    await new Promise((v) => setTimeout(v, 250));
    const a = (eval(lue))('.fokusnosto-kortti').laskuri;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    await new Promise((v) => setTimeout(v, 250));
    return { oikea: a, vasen: (eval(lue))('.fokusnosto-kortti').laskuri };
  }, LUE);
  vaadi(`${ruutu.nimi} · 5a. nuolinäppäimet vaihtavat kuvaa (→ 2/2, ← 1/2)`,
    /^2\s*\/\s*2$/.test(nappain.oikea) && /^1\s*\/\s*2$/.test(nappain.vasen), JSON.stringify(nappain));
  // 5b: pyyhkäisy kuvan päällä (pointer-ele, vasemmalle = seuraava)
  const n = lisaa.nappi;
  if (n) {
    const x0 = n.x + Math.min(60, n.w * 0.2);
    // Lähtöpisteen on oltava kortin kuvanapilla, ei minkään päälle
    // nousseen kortin: muuten ele ei mittaa karusellia.
    const alla = await sivu.evaluate(({ x, y }) => {
      const e = document.elementFromPoint(x, y);
      return e ? `${e.tagName}.${e.className}` : 'ei mitään';
    }, { x: x0, y: n.y });
    vaadi(`${ruutu.nimi} · pyyhkäisyn lähtöpiste on kortin kuvalla`, /nostokuva-img|nostokuva-nappi/.test(alla), alla);
    await sivu.mouse.move(x0, n.y);
    await sivu.mouse.down();
    await sivu.mouse.move(x0 - 90, n.y + 4, { steps: 8 });
    await sivu.mouse.up();
    await sivu.waitForTimeout(400);
  }
  const pyyhkaisy = await sivu.evaluate((lue) => ({
    laskuri: (eval(lue))('.fokusnosto-kortti').laskuri,
    suurennos: Boolean(document.querySelector('.fokuskohde-zoom, .fokusnosto-zoom, dialog[open]')),
  }), LUE);
  vaadi(`${ruutu.nimi} · 5b. pyyhkäisy vasemmalle vaihtaa seuraavaan kuvaan eikä avaa suurennosta`,
    /^2\s*\/\s*2$/.test(pyyhkaisy.laskuri) && !pyyhkaisy.suurennos, JSON.stringify(pyyhkaisy));

  /* ── 2b: kohdekortti, kuva + kuvat (Avignonin paavinpalatsi) ─────── */
  await siivoa();
  const kohde = await sivu.evaluate(async (lue) => {
    const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const k = (KOHDE_MAAT.FRA ?? []).find((x) => x.id === 'avignonin-paavinpalatsi');
    if (!k) return null;
    avaaFokuskohde(window.matkakirja.ui, k);
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return (eval(lue))('.fokuskohde-popup');
  }, LUE);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `kohde-avignon-${ruutu.nimi}.png`) });
  vaadi(`${ruutu.nimi} · 2b. kohdekortin kaksi kuvaa ovat karuselli (yksi kehys, laskuri 1 / 2)`,
    Boolean(kohde) && /^1\s*\/\s*2$/.test(kohde.laskuri) && kohde.kuvia === 1, JSON.stringify(kohde));
  vaadi(`${ruutu.nimi} · 1c. kohdekortissa ei työpolkulähderiviä, kuvalähde säilyy`,
    Boolean(kohde) && kohde.lahderivi.length === 0 && kohde.kuvalahde.length > 0, JSON.stringify(kohde?.lahderivi));

  /* ── 6: nostokortti 2 (omistaja 20.9.2026) ───────────────────────── */
  // 6a: väkäset ovat hyvin pienet ja kuvan reunoilla, ei tumma nappi.
  vaadi(`${ruutu.nimi} · 6a. karusellin väkäset ovat pienet chevronit kuvan reunoilla (ei taustaa, ≤ 20 px kirjasin)`,
    lisaa.nuolet.length === 2 && lisaa.nuolet.every((n) => n.fontPx <= 20 && /rgba\(0, 0, 0, 0\)|transparent/.test(n.bg)
      && n.top >= lisaa.kuva.top - 2 && n.h <= lisaa.kuva.bottom - lisaa.kuva.top + 4),
    JSON.stringify({ nuolet: lisaa.nuolet, kuva: lisaa.kuva }));
  // 6b: vaakakuvan kortti (Avignon) vs. pystykuvan kortti (Rouen):
  // sama leveys, kuva kokonaan ruudulla, otsikko näkyvissä LISÄÄ-tilassa.
  await siivoa();
  // Rouen (hahmotelma-fra) on KOHDEkortti, jonka pääkuva on pystykuva —
  // omistajan kaappauksen kortti; vertailukohta on Avignon (vaakakuva).
  const rouen = await sivu.evaluate(async (lue) => {
    const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const k = (KOHDE_MAAT.FRA ?? []).find((x) => x.id === 'hahmotelma-rouen');
    if (!k) return null;
    avaaFokuskohde(window.matkakirja.ui, k);
    await new Promise((v) => setTimeout(v, 1200));
    const pieni = (eval(lue))('.fokuskohde-popup');
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return { loytyi: true, pieni, lisaa: (eval(lue))('.fokuskohde-popup') };
  }, LUE);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-rouen-${ruutu.nimi}.png`) });
  const rk = rouen?.pieni?.kuva;
  vaadi(`${ruutu.nimi} · 6b. pystykuvan nosto aukesi ja kuva on pystymuotoinen`,
    Boolean(rouen?.loytyi) && rk && rk.w > 0 && (rk.bottom - rk.top) > rk.w, JSON.stringify(rk));
  vaadi(`${ruutu.nimi} · 6c. kortin leveys on sama pysty- ja vaakakuvalla (±2 px)`,
    Boolean(rk) && Boolean(kohde) && Math.abs(rouen.pieni.kortti.w - kohde.kortti.w) <= 2,
    `rouen ${rouen?.pieni?.kortti?.w} vs avignon ${kohde?.kortti?.w}`);
  vaadi(`${ruutu.nimi} · 6d. pystykuva on kokonaan ruudulla ja keskellä korttia`,
    Boolean(rk) && rk.top >= 0 && rk.bottom <= ruutu.height && rk.x >= 0 && rk.x + rk.w <= ruutu.width
      && Math.abs((rk.x + rk.w / 2) - ((rouen.pieni.sisus ?? rouen.pieni.kortti).x + (rouen.pieni.sisus ?? rouen.pieni.kortti).w / 2)) <= 3,
    JSON.stringify({ kuva: rk, sisus: rouen?.pieni?.sisus, kortti: rouen?.pieni?.kortti, ruutu: [ruutu.width, ruutu.height] }));
  const ro = rouen?.lisaa?.otsikko;
  vaadi(`${ruutu.nimi} · 6e. LISÄÄ-tilassa otsikko on näkyvissä (kortin sisällä, ei vieritetty piiloon)`,
    Boolean(ro) && ro.top >= rouen.lisaa.kortti.top - 1 && ro.bottom <= rouen.lisaa.kortti.bottom && ro.top >= 0 && ro.vieritys === 0 && ro.tyyppirivi !== null,
    JSON.stringify({ otsikko: ro, kortti: rouen?.lisaa?.kortti }));
  vaadi(`${ruutu.nimi} · 6f. LISÄÄ-tilassa kuva on yhä kokonaan ruudulla`,
    Boolean(rouen?.lisaa?.kuva) && rouen.lisaa.kuva.top >= 0 && rouen.lisaa.kuva.bottom <= ruutu.height,
    JSON.stringify(rouen?.lisaa?.kuva));
  // 6g: suurennos (contain) ja selaus suurennoksessa.
  const zoom = await sivu.evaluate(async (lueZ) => {
    document.querySelector('.fokuskohde-popup .nostokuva-nappi')?.click();
    await new Promise((v) => setTimeout(v, 900));
    const eka = (eval(lueZ))();
    document.querySelector('.fokuskohde-zoomnuoli.seuraava')?.click();
    await new Promise((v) => setTimeout(v, 900));
    const toka = (eval(lueZ))();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    await new Promise((v) => setTimeout(v, 900));
    const kolmas = (eval(lueZ))();
    return { eka, toka, kolmas };
  }, LUE_ZOOM);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `zoom-rouen-${ruutu.nimi}.png`) });
  const zk = zoom?.eka?.kuva;
  const zTaytto = zk ? Math.max(zk.w / ruutu.width, zk.h / ruutu.height) : 0;
  tieto(`${ruutu.nimi} · suurennoksen täyttö`, `${zk?.w}×${zk?.h} / ${ruutu.width}×${ruutu.height} (${zTaytto.toFixed(2)})`);
  vaadi(`${ruutu.nimi} · 6g. suurennos täyttää ruudun contain-periaatteella (≥ 0,85 lyhyempään suuntaan) ja pysyy ruudulla`,
    Boolean(zk) && zTaytto >= 0.85 && zk.top >= 0 && zk.bottom <= ruutu.height && zk.x >= 0 && zk.x + zk.w <= ruutu.width,
    JSON.stringify(zk));
  vaadi(`${ruutu.nimi} · 6h. suurennoksessa on pienet väkäset ja laskuri 1 / 2`,
    Boolean(zoom?.eka) && zoom.eka.nuolet.length === 2 && zoom.eka.nuolet.every((n) => n.fontPx <= 20) && /^1\s*\/\s*2$/.test(zoom.eka.laskuri),
    JSON.stringify({ nuolet: zoom?.eka?.nuolet, laskuri: zoom?.eka?.laskuri }));
  vaadi(`${ruutu.nimi} · 6i. väkänen vaihtaa suurennoksen kuvan (2 / 2, eri src) ja ← palaa (1 / 2)`,
    Boolean(zoom?.toka) && /^2\s*\/\s*2$/.test(zoom.toka.laskuri) && zoom.toka.src !== zoom.eka.src
      && /^1\s*\/\s*2$/.test(zoom.kolmas?.laskuri ?? '') && zoom.kolmas.src === zoom.eka.src,
    JSON.stringify({ eka: zoom?.eka?.laskuri, toka: zoom?.toka?.laskuri, kolmas: zoom?.kolmas?.laskuri }));
  // 6j: pyyhkäisy suurennoksessa (vasemmalle = seuraava), ei sulje.
  await sivu.mouse.move(ruutu.width / 2, ruutu.height / 2);
  await sivu.mouse.down();
  await sivu.mouse.move(ruutu.width / 2 - 90, ruutu.height / 2 + 4, { steps: 8 });
  await sivu.mouse.up();
  await sivu.waitForTimeout(700);
  const zPyyh = await sivu.evaluate((lueZ) => (eval(lueZ))(), LUE_ZOOM);
  vaadi(`${ruutu.nimi} · 6j. pyyhkäisy suurennoksessa vaihtaa kuvan (2 / 2) eikä sulje suurennosta`,
    Boolean(zPyyh) && /^2\s*\/\s*2$/.test(zPyyh.laskuri), JSON.stringify(zPyyh && { laskuri: zPyyh.laskuri }));
  const zSulku = await sivu.evaluate(async (lue) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await new Promise((v) => setTimeout(v, 900));
    return { auki: Boolean(document.querySelector('.fokuskohde-zoom')), kortti: (eval(lue))('.fokuskohde-popup') };
  }, LUE);
  vaadi(`${ruutu.nimi} · 6k. Esc sulkee suurennoksen ja kortti näyttää saman kuvan (2 / 2)`,
    !zSulku.auki && /^2\s*\/\s*2$/.test(zSulku.kortti?.laskuri ?? ''), JSON.stringify({ auki: zSulku.auki, laskuri: zSulku.kortti?.laskuri }));

  /* ── 1d + 3: eläintäky (BIH: generoitu havainnekuva) ─────────────── */
  await siivoa();
  const taky = await sivu.evaluate(async (lue) => {
    const { avaaElaintaky } = await import('/js/elaintaky.js');
    avaaElaintaky(window.matkakirja.ui, 'BIH');
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.elaintaky-kerros .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return (eval(lue))('.elaintaky-kerros');
  }, LUE);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `taky-bih-${ruutu.nimi}.png`) });
  vaadi(`${ruutu.nimi} · 3. generoitu kuva saa "Havainnekuva"-merkin lyhyeen kuvatekstiin`,
    Boolean(taky) && taky.havainne.length >= 1 && taky.havainne.every((t) => t === 'Havainnekuva'),
    JSON.stringify(taky?.havainne));
  vaadi(`${ruutu.nimi} · 1d. eläintäyn kortissa ei työpolkulähderiviä`,
    Boolean(taky) && taky.lahderivi.length === 0, JSON.stringify(taky?.lahderivi));

  /* ── 1e: skandaali ja historian hetki ────────────────────────────── */
  await siivoa();
  const muut = await sivu.evaluate(async (lue) => {
    const { SKANDAALIT } = await import('/js/packs/skandaalit.js');
    const { avaaSkandaali } = await import('/js/skandaalit.js');
    const iso = Object.keys(SKANDAALIT).find((k) => SKANDAALIT[k].length);
    avaaSkandaali(window.matkakirja.ui, iso, SKANDAALIT[iso][0]);
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.skandaali-kerros .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 500));
    const s = (eval(lue))('.skandaali-kerros');
    for (const el of document.querySelectorAll('.skandaali-kerros')) el.remove();
    const { HISTORIAN_HETKET } = await import('/js/packs/historian-hetket.js');
    const { avaaHetki } = await import('/js/historian-hetket.js');
    const h0 = HISTORIAN_HETKET[0];
    avaaHetki(window.matkakirja.ui, h0.iso ?? h0.maa ?? null, h0);
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.hetki-kerros .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 500));
    const h = (eval(lue))('.hetki-kerros');
    return { s, h };
  }, LUE);
  vaadi(`${ruutu.nimi} · 1e. skandaalikortissa ei työpolkulähderiviä`,
    Boolean(muut.s) && !TYOPOLKU.test(muut.s.lahderivi.join(' ')), JSON.stringify(muut.s?.lahderivi));
  vaadi(`${ruutu.nimi} · 1f. historian hetken metarivi (paikka · päiväys) ei ole työpolku`,
    Boolean(muut.h) && !TYOPOLKU.test(muut.h.lahderivi.join(' ')), JSON.stringify(muut.h?.lahderivi));

  vaadi(`${ruutu.nimi} · ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
