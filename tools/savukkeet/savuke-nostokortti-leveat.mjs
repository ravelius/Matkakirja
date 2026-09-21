/*
 * Savuke: NOSTOKORTIN KAKSIPALSTATAITTO LEVEILLÄ RUUDUILLA.
 *
 * Omistajan tilaus 21.9.2026 (kaappaus Le Mans -nostosta työpöydällä):
 * fokusnosto-kortti (js/fokusnosto.js, css/fokusnosto.css osio 13) saa
 * yli ~1100 px leveillä ruuduilla kaksi palstaa — kuva vasemmalla
 * n. 58 % kortin leveydestä (pystykuvalla kapeampi), oikealla kuvateksti,
 * leipäteksti ja "Lukijan kysymys" allekkain, vastausvaihtoehdot palstan
 * levyisinä. Alle rajan kortti on entinen pino, mutta leveys enintään
 * ~760 px (js/nostokuva.js NOSTOKUVA_LEVEA_RAJA/NOSTOKUVA_KAPEA_KATTO).
 * Puhelin (390) pysyy täysin ennallaan. Galleria ja navigointiväkäset
 * (reunanuolet, pyyhkäisy, nuolinäppäimet) toimivat kuten ennen; kuva on
 * aina kokonaan näkyvissä (ei rajausta, contain).
 *
 * Ruudut 390 × 844, 1400 × 900 ja 1920 × 1080. Ämpäri Noden kautta.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostokortti-leveat.mjs [kuvakansio]
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

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400', '1920']).map((w) => ({
  390: { nimi: '390', width: 390, height: 844 },
  1400: { nimi: '1400', width: 1400, height: 900 },
  1920: { nimi: '1920', width: 1920, height: 1080 },
}[w]));

/** Kortin mitat kaksipalstataiton vartiointiin. */
const LUE = `(juuri) => {
  const k = document.querySelector(juuri);
  if (!k) return null;
  const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) }; };
  const kuvanappi = k.querySelector('.fokusnosto-kuvanappi, .nostokuva-nappi');
  const kuvateksti = k.querySelector('.fokusnosto-kuva > .fokusnosto-kuvateksti, .fokusnosto-kuva > .nostokuva-selite');
  const teksti = k.querySelector('.fokusnosto-teksti');
  const visa = k.querySelector('.minitehtava.fokusnosto-visa');
  const visaNappi = k.querySelector('.minitehtava.fokusnosto-visa .kulttuuri-vaihtoehdot button');
  const img = k.querySelector('.nostokuva-img, .fokusnosto-kuva img');
  return {
    kortti: rect(k),
    kuva: rect(kuvanappi),
    kuvateksti: rect(kuvateksti),
    teksti: rect(teksti),
    visa: rect(visa),
    visaNappi: rect(visaNappi),
    laskuri: k.querySelector('.nostosarja-kuvalaskuri')?.textContent?.trim() ?? '',
    pysty: k.classList.contains('fokusnosto-pysty'),
    kuvaSuhde: img && img.naturalWidth && img.naturalHeight ? img.naturalHeight / img.naturalWidth : 0,
    gridSarakkeet: getComputedStyle(k.querySelector('.fokusnosto-sisalto')).gridTemplateColumns,
  };
}`;

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

  // Saapumisvirta pois tieltä (sama syy kuin savuke-nostokortti.mjs).
  const siivoa = () => sivu.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros, .saapumistraileri, .fokusvirta-isokuva, .fokuskohde-zoom')) el.remove();
  });

  /* ── vaakakuvan galleria: Chaîne des Puys (2 kuvaa) ──────────────── */
  await siivoa();
  const vaaka = await sivu.evaluate(async (lue) => {
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, 'maalehti-chaine-des-puys');
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return { loytyi, ...(eval(lue))('.fokusnosto-kortti') };
  }, LUE);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-${ruutu.nimi}.png`) });
  vaadi(`${ruutu.nimi} · nosto aukesi ja kuva näkyy`, Boolean(vaaka?.loytyi) && vaaka.kuva?.w > 0, JSON.stringify(vaaka));
  tieto(`${ruutu.nimi} · kortti/kuva/teksti`, JSON.stringify({ kortti: vaaka.kortti, kuva: vaaka.kuva, teksti: vaaka.teksti, grid: vaaka.gridSarakkeet }));

  if (ruutu.width >= 1100) {
    // (a) kuva ja tekstipalsta rinnakkain: kuva vasemmalla, teksti/kuvateksti oikealla, päällekkäin (sama korkeusalue).
    const rinnakkain = Boolean(vaaka.kuva) && Boolean(vaaka.teksti)
      && vaaka.kuva.x < vaaka.teksti.x
      && vaaka.kuva.y <= vaaka.teksti.bottom && vaaka.teksti.y <= vaaka.kuva.bottom;
    vaadi(`${ruutu.nimi} · a. kuva ja tekstipalsta ovat rinnakkain (kuva vasemmalla)`,
      rinnakkain, JSON.stringify({ kuva: vaaka.kuva, teksti: vaaka.teksti }));
    // Kuvateksti on tekstipalstan puolella, kuvan yläreunan tasalla.
    vaadi(`${ruutu.nimi} · a2. kuvateksti on kuvan vierellä (ei kuvan alla)`,
      Boolean(vaaka.kuvateksti) && vaaka.kuvateksti.x >= vaaka.kuva.right - 4,
      JSON.stringify({ kuvateksti: vaaka.kuvateksti, kuva: vaaka.kuva }));
    // Kuvapalstan leveys ≈ 58 % ± 5 % kortista (vaakakuva).
    const osuus = vaaka.kuva.w / vaaka.kortti.w;
    tieto(`${ruutu.nimi} · kuvapalstan osuus kortista (vaakakuva)`, osuus.toFixed(3));
    vaadi(`${ruutu.nimi} · a3. kuvapalstan leveys ≈ 58 % ± 5 % kortista`,
      osuus >= 0.53 && osuus <= 0.63, osuus.toFixed(3));
    // (b) kuva kokonaan näkyvissä: kuvan laatikko kortin sisällä, ei leikkausta.
    vaadi(`${ruutu.nimi} · b. kuva kokonaan kortin sisällä (ei leikkausta)`,
      vaaka.kuva.x >= vaaka.kortti.x - 1 && vaaka.kuva.right <= vaaka.kortti.right + 1
        && vaaka.kuva.y >= vaaka.kortti.y - 1 && vaaka.kuva.bottom <= vaaka.kortti.bottom + 1,
      JSON.stringify({ kuva: vaaka.kuva, kortti: vaaka.kortti }));
  } else {
    // (c) alle 1100 px: kortin leveys enintään ~760 px.
    vaadi(`${ruutu.nimi} · c. kortin leveys ≤ 760 px alle 1100 px:n ruudulla`,
      vaaka.kortti.w <= 760, `kortti.w ${vaaka.kortti.w}`);
  }

  if (ruutu.nimi === '390') {
    // (d) 390: kortin leveys sama kuin ennen — verrataan js/nostokuva.js
    // nostokuvanVakioleveys-funktion RAJATTOMAAN (Infinity) tulokseen,
    // eli täsmälleen siihen, mitä ennen tätä ominaisuutta laskettiin.
    const taysiLeveys = await sivu.evaluate(async ([w, h]) => {
      const { nostokuvanVakioleveys } = await import('/js/nostokuva.js');
      return Math.round(nostokuvanVakioleveys({ ruutuLeveys: w, ruutuKorkeus: h }));
    }, [ruutu.width, ruutu.height]);
    // vara (reunus+sisennys+mahdollinen kaista) on sama luku molemmilla
    // koodipoluilla — kortti.w pitäisi olla taysiLeveys + pieni vara
    // (~20–70 px), eli kapea katto (760 px) ei saa koskea 390 px:n
    // ruutuun ollenkaan (kortti on joka tapauksessa kaukana 760 px:stä).
    const vara = vaaka.kortti.w - taysiLeveys;
    vaadi(`${ruutu.nimi} · d. kapea katto ei koske puhelinta (kortti = rajaton kaava, ei 760 px:n katto)`,
      vaaka.kortti.w < 760 && vara >= 15 && vara <= 90,
      JSON.stringify({ kortinLeveys: vaaka.kortti.w, taysiLeveys, vara }));
  }

  /* ── karuselli: laskuri ja nuolet toimivat (e) ───────────────────── */
  const kuvanKeskipiste = vaaka.kuva ? { x: vaaka.kuva.x + vaaka.kuva.w / 2, y: vaaka.kuva.y + vaaka.kuva.h / 2 } : null;
  vaadi(`${ruutu.nimi} · e1. galleria alkaa laskurista 1 / 2`,
    /^1\s*\/\s*2$/.test(vaaka.laskuri), `laskuri "${vaaka.laskuri}"`);
  await sivu.evaluate(() => {
    document.querySelector('.fokusnosto-kortti .nostosarja-kuvanuoli.seuraava')?.click();
  });
  await sivu.waitForTimeout(400);
  const nuoli = await sivu.evaluate((lue) => (eval(lue))('.fokusnosto-kortti'), LUE);
  vaadi(`${ruutu.nimi} · e2. reunanuoli vaihtaa kuvaa (2 / 2)`,
    /^2\s*\/\s*2$/.test(nuoli?.laskuri), `laskuri "${nuoli?.laskuri}"`);
  await sivu.evaluate(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
  });
  await sivu.waitForTimeout(400);
  const nappain = await sivu.evaluate((lue) => (eval(lue))('.fokusnosto-kortti'), LUE);
  vaadi(`${ruutu.nimi} · e3. nuolinäppäin vaihtaa kuvaa takaisin (1 / 2)`,
    /^1\s*\/\s*2$/.test(nappain?.laskuri), `laskuri "${nappain?.laskuri}"`);
  if (kuvanKeskipiste) {
    await sivu.mouse.move(kuvanKeskipiste.x - 60, kuvanKeskipiste.y);
    await sivu.mouse.down();
    await sivu.mouse.move(kuvanKeskipiste.x - 150, kuvanKeskipiste.y + 4, { steps: 8 });
    await sivu.mouse.up();
    await sivu.waitForTimeout(400);
  }
  const pyyhkaisy = await sivu.evaluate((lue) => (eval(lue))('.fokusnosto-kortti'), LUE);
  vaadi(`${ruutu.nimi} · e4. pyyhkäisy vaihtaa kuvaa (2 / 2)`,
    /^2\s*\/\s*2$/.test(pyyhkaisy?.laskuri), `laskuri "${pyyhkaisy?.laskuri}"`);

  /* ── LISÄÄ-tila leveällä ruudulla (kaappaus dokumentointiin) ─────── */
  if (ruutu.nimi === '1400' && KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-lisaa-${ruutu.nimi}.png`) });
  }

  /* ── pystykuva: pariisi-soi (yksi kuva, FRA) ─────────────────────── */
  await siivoa();
  const pysty = await sivu.evaluate(async (lue) => {
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, 'pariisi-soi');
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return { loytyi, ...(eval(lue))('.fokusnosto-kortti') };
  }, LUE);
  if (KUVAKANSIO && ruutu.nimi === '1400') {
    await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-pysty-${ruutu.nimi}.png`) });
  }
  vaadi(`${ruutu.nimi} · pystynosto aukesi ja kuva on pystymuotoinen`,
    Boolean(pysty?.loytyi) && pysty.kuvaSuhde > 1, JSON.stringify({ loytyi: pysty?.loytyi, kuvaSuhde: pysty?.kuvaSuhde }));
  if (ruutu.width >= 1100) {
    vaadi(`${ruutu.nimi} · pystykuvalla kortti sai .fokusnosto-pysty-luokan`, pysty.pysty === true, `pysty ${pysty.pysty}`);
    if (pysty.kuva && pysty.kortti) {
      const osuusPysty = pysty.kuva.w / pysty.kortti.w;
      tieto(`${ruutu.nimi} · kuvapalstan osuus kortista (pystykuva)`, osuusPysty.toFixed(3));
      vaadi(`${ruutu.nimi} · pystykuvan kuvapalsta on kapeampi kuin vaakakuvan`,
        osuusPysty < vaaka.kuva.w / vaaka.kortti.w, `pysty ${osuusPysty.toFixed(3)} vs vaaka ${(vaaka.kuva.w / vaaka.kortti.w).toFixed(3)}`);
      vaadi(`${ruutu.nimi} · pystykuva kokonaan kortin sisällä (ei leikkausta)`,
        pysty.kuva.x >= pysty.kortti.x - 1 && pysty.kuva.right <= pysty.kortti.right + 1
          && pysty.kuva.y >= pysty.kortti.y - 1 && pysty.kuva.bottom <= pysty.kortti.bottom + 1,
        JSON.stringify({ kuva: pysty.kuva, kortti: pysty.kortti }));
    }
  }

  /* ── "Lukijan kysymys": vastausvaihtoehdot palstan levyisinä ─────── */
  await siivoa();
  const visa = await sivu.evaluate(async (lue) => {
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, 'maalehti-peilisali');
    await new Promise((v) => setTimeout(v, 700));
    document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 700));
    return { loytyi, ...(eval(lue))('.fokusnosto-kortti') };
  }, LUE);
  vaadi(`${ruutu.nimi} · Lukijan kysymys -laatikko ja vastausnappi löytyvät`,
    Boolean(visa?.loytyi) && Boolean(visa.visa) && Boolean(visa.visaNappi), JSON.stringify(visa));
  if (visa.visaNappi && visa.visa) {
    // Visa-laatikolla on oma sisennyksensä (--tehtava-reunus: 0,8rem
    // kummallakin sivulla, css/styles.css .minitehtava.fokusnosto-visa),
    // joten nappi on n. 25–30 px laatikkoa kapeampi — silti koko
    // KÄYTETTÄVISSÄ olevan tilan levyinen (width: 100 %), ei kapeampi.
    vaadi(`${ruutu.nimi} · vastausvaihtoehto täyttää visa-laatikon sisätilan`,
      visa.visa.w - visa.visaNappi.w >= 15 && visa.visa.w - visa.visaNappi.w <= 40,
      JSON.stringify({ visaNappi: visa.visaNappi, visa: visa.visa }));
    if (ruutu.width >= 1100) {
      vaadi(`${ruutu.nimi} · visa-laatikko on tekstipalstan (ei kortin koko) levyinen`,
        visa.visa.w < visa.kortti.w * 0.85 && visa.visa.x > visa.kortti.x + 40,
        JSON.stringify({ visa: visa.visa, kortti: visa.kortti }));
    }
  }
  if (KUVAKANSIO && ruutu.nimi === '1400') {
    await sivu.screenshot({ path: join(KUVAKANSIO, `nosto-visa-${ruutu.nimi}.png`) });
  }

  vaadi(`${ruutu.nimi} · ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
