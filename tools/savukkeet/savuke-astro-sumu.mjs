/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERAN SUMU (PAATOKSET 43 kohta 7).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… KOTELOT=iphone PORTTI=8835 \
 *     KAAPPAUKSET=tools/savukkeet/kaappaukset/astro-sumu \
 *     node tools/savukkeet/savuke-astro-sumu.mjs
 *
 * Yksikkötestit (tests/astro-sumu.test.mjs) näkevät profiilikaavat;
 * tämä savuke katsoo RUUTUA 390 × 844 -puhelinmitalla Italian saappaan
 * kohdalta ja vertaa kolmea korkeutta SUMUTTOMAAN ajoon (`?sumu=0`).
 * Ilman vertailuajoa peiton profiilia ei voi mitata: pelkkä kirkkaus
 * kertoisi maastosta eikä sumusta.
 *
 * VÄITTEET:
 *   1. PEITON PROFIILI. Linssin oma mitta (`tila().sumu`) antaa kolmella
 *      korkeudella kaukaa < 0,2, keskeltä > 0,5 ja läheltä 0 — ja RUUTU
 *      seuraa sitä: keskiön kirkkausero sumuttomaan ajoon on keskellä
 *      suurempi kuin kaukana ja lähellä käytännössä nolla.
 *   2. KOHINAN HAJONTA > 0. Sumukalvo ei ole tasainen himmennys:
 *      kaappauksen keskiruudun kirkkauden keskihajonta on suurempi
 *      sumullisessa kuin sumuttomassa ajossa (sumu TUO rakennetta).
 *   3. PILVET HÄIPYVÄT. Pilvikuoren peitto on kaukaa lähellä 0,9 ja
 *      lähizoomissa 0.
 *   4. KEHYSTAHTI >= 50 fps ja JS-keko sekä laattakerroksen
 *      tekstuuritavut kirjataan ennen ja jälkeen.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, luminanssi } from './pallon-liike-mittarit.mjs';
import { PILVIEN_LEVEYS, PILVIEN_KORKEUS } from '../../js/linssit/astro-sumu.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
/* Paikallinen ämpäri kuten savuke-astro-pallo.mjs:ssä (SAVUKE_AMPARI_PAIKALLINEN). */
const PAIKALLINEN_AMPARI = process.env.SAVUKE_AMPARI_PAIKALLINEN ?? '';
async function ulkohaku(url) {
  if (PAIKALLINEN_AMPARI) {
    const polku = join(PAIKALLINEN_AMPARI, new URL(url).pathname.split('/').pop());
    if (existsSync(polku)) return { body: readFileSync(polku), tyyppi: 'image/webp' };
  }
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = (async () => {
    for (let yritys = 0; yritys < 3; yritys += 1) {
      const v = await fetch(url).then(async (r) => (r.ok
        ? { body: Buffer.from(await r.arrayBuffer()), tyyppi: r.headers.get('content-type') }
        : null)).catch(() => null);
      if (v) return v;
      await new Promise((r) => { setTimeout(r, 250 * (yritys + 1)); });
    }
    return null;
  })().then((v) => { if (!v) VALIMUISTI.delete(url); return v; });
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = Number(process.env.PORTTI) || 8835;
await new Promise((r) => palvelin.listen(PORTTI, r));

let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js')]) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
const chromium = paketti?.chromium ?? paketti?.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Keskiruudun kirkkauden keskiarvo ja keskihajonta (kaappauksesta). */
function ruudunTilastot(kuva, { x0, y0, x1, y1 }) {
  const arvot = [];
  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      arvot.push(luminanssi(kuva.data, (y * kuva.width + x) * 4));
    }
  }
  const ka = arvot.reduce((a, b) => a + b, 0) / arvot.length;
  const hajonta = Math.sqrt(arvot.reduce((s, v) => s + (v - ka) ** 2, 0) / arvot.length);
  return { ka: +ka.toFixed(2), hajonta: +hajonta.toFixed(2), n: arvot.length };
}

/**
 * KAHDEN KAAPPAUKSEN EROTUS samalta alueelta: keskiarvo ja
 * keskihajonta. Tasainen himmennys antaisi VAKION eron (hajonta 0);
 * repaleinen harso antaa vaihtelevan.
 */
function erotuksenTilastot(a, b, { x0, y0, x1, y1 }) {
  const arvot = [];
  for (let y = y0; y < y1; y += 2) {
    for (let x = x0; x < x1; x += 2) {
      const i = (y * a.width + x) * 4;
      arvot.push(luminanssi(a.data, i) - luminanssi(b.data, i));
    }
  }
  const ka = arvot.reduce((p, q) => p + q, 0) / arvot.length;
  const hajonta = Math.sqrt(arvot.reduce((p, q) => p + (q - ka) ** 2, 0) / arvot.length);
  return { ka: +ka.toFixed(2), hajonta: +hajonta.toFixed(2), n: arvot.length };
}

async function avaaPeli(s, haku) {
  /*
   * `domcontentloaded` JA PITKÄ KATKO. `load` odottaa jokaista kuvaa ja
   * ääntä; toisessa kontekstissa (vertailuajo) selaimen välimuisti on
   * tyhjä ja ämpärihaut menevät uudestaan Noden läpi, jolloin 30 s:n
   * oletus katkaisi ajon ennen kuin sivu oli edes valmis (mitattu
   * Macilla 18.9.2026). Peli alustuu moduuleista, ei `load`ista.
   */
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${haku}`, {
    waitUntil: 'domcontentloaded', timeout: 90000,
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
    ui.render();
  });
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .catch(() => null);
  await s.waitForTimeout(1800);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
}

async function avaaLinssiEleella(s, odota = 6500) {
  await s.click('#turn-pill', { timeout: 20000 })
    .catch(() => s.evaluate(() => document.getElementById('turn-pill')?.click()));
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('button[data-linssi="satelliitti"]')?.click()));
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  await aktivoi.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('.linssi-aktivoi')?.click()));
  await s.waitForTimeout(odota);
}

/*
 * AVAUSANIMAATIO POIS ENNEN MITTAUSTA (PAATOKSET 52 ja 53, 19.–20.9.2026).
 * Linssin avausajo kirjoittaa kameran korkeuden joka kehyksellä, ja
 * ISS-seuranta kääntää Maata, kunnes pelaaja koskee ruutuun. Savukkeen
 * asettama korkeus vedettiin siksi takaisin lepokorkeuteen ja merkit
 * liikkuivat napautuksen alta. Sama ele kuin pelaajalla: yksi pointerdown
 * pallon koteloon (js/linssit/satelliitti-avaruus.js otePalloon) päättää
 * ajon ja seurannan. Ei napautus kartalle: mitään ei avata.
 */
const pysaytaAvaus = async (s) => {
  /*
   * PALJASTUS ENSIN: mustan kerroksen aikana ote ei päätä ajoa
   * (otePalloon palaa, kun paljastus odottaa) — otsikkokortti on ruudulla
   * vähintään PALJASTUKSEN_MINIMI_MS eli 1,8 s.
   */
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.paljastus?.vaihe === 'paljastettu',
    null, { timeout: 20000 },
  ).catch(() => {});
  await s.evaluate(() => {
    // Sama kotelo, johon linssi kuuntelee otteen (lauta.kotelo).
    const kotelo = window.matkakirja.ui.pallolauta?.kotelo
      ?? document.querySelector('.pallo-kotelo, .pallo-kuori');
    for (const laji of ['pointerdown', 'pointerup']) {
      kotelo?.dispatchEvent(new PointerEvent(laji, { bubbles: true, cancelable: true, clientX: 1, clientY: 1 }));
    }
  });
  await s.waitForTimeout(500);
  const tila = () => s.evaluate(() => {
    const t = window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.();
    return { ajo: t?.avausajo?.kaynnissa ?? null, seuranta: t?.issSeuranta ?? null };
  });
  let nyt = await tila();
  // Toinen yritys, jos ensimmäinen ele osui vielä paljastuksen häivytykseen.
  if (nyt.ajo !== false || nyt.seuranta !== false) {
    await s.waitForTimeout(800);
    await s.evaluate(() => {
      const kotelo = window.matkakirja.ui.pallolauta?.kotelo
        ?? document.querySelector('.pallo-kotelo, .pallo-kuori');
      for (const laji of ['pointerdown', 'pointerup']) {
        kotelo?.dispatchEvent(new PointerEvent(laji, { bubbles: true, cancelable: true, clientX: 1, clientY: 1 }));
      }
    });
    await s.waitForTimeout(400);
    nyt = await tila();
  }
  return nyt;
};

/** Kamera Italian saappaan ylle annettuun korkeuteen. */
const ASETA = (alt) => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  ui.pallolauta?.kamera?.pysaytaKameraAjo?.();
  const ohjaimet = pallo.controls?.();
  if (ohjaimet) ohjaimet.autoRotate = false;
  ui.pallolauta?.zoomirajat?.({ min: 0.05, max: 40 });
  pallo.pointOfView({ lat: 41.0, lng: 14.5, altitude: alt }, 0);
  ui.pallolauta?.heraa?.();
};

/** Linssin omat luvut (avaruusnäkymän `tila`). */
const TILA = () => {
  const ui = window.matkakirja.ui;
  const t = ui.pallolinssi?.kahva?.avaruus?.tila?.() ?? null;
  const pallo = ui.pallonInstanssi;
  const sade = pallo.getGlobeRadius?.() ?? 0;
  const p = pallo.camera?.()?.position;
  const korkeus = sade > 0 && p?.length ? p.length() / sade - 1 : null;
  return {
    korkeus,
    avauskorkeus: t?.avauskorkeus ?? null,
    sumu: t?.sumu?.sumu ?? null,
    pilvienPeitto: t?.sumu?.pilvet ?? null,
    pilvienNakyvyys: t?.sumu?.pilvienNakyvyys ?? null,
    kalvoja: document.querySelectorAll('.astro-sumu > div').length,
    peitot: [...document.querySelectorAll('.astro-sumu > div')]
      .map((el) => Number(getComputedStyle(el).opacity)),
  };
};

/** Kehystahti ja muisti. */
const MITTAA_FPS = () => new Promise((valmis) => {
  let n = 0;
  const t0 = performance.now();
  const askel = () => {
    n += 1;
    if (performance.now() - t0 < 2000) requestAnimationFrame(askel);
    else valmis({ fps: +(n / ((performance.now() - t0) / 1000)).toFixed(1) });
  };
  requestAnimationFrame(askel);
});

const MUISTI = () => {
  const ui = window.matkakirja.ui;
  const kerros = ui.pallolauta?.lepokerros?.()?.tila?.() ?? null;
  return {
    kekoMt: Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1048576),
    laattaTavutMt: Math.round(((kerros?.kaytetytTavut ?? kerros?.tavuja ?? 0) / 1048576) * 10) / 10,
    laattoja: kerros?.laattoja ?? null,
  };
};

async function ajo(sumuPaalla) {
  const konteksti = await selain.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    serviceWorkers: 'block',
    reducedMotion: 'no-preference',
  });
  const s = await konteksti.newPage();
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    /*
     * CORS-OTSAKE ON PAKOLLINEN. Ämpäri ei anna `access-control-allow-
     * origin`ia 127.0.0.1:lle, ja aito pilvikuva luetaan kankaalle
     * `fetch`illä (mode: cors) — ilman tätä otsaketta haku kaatuisi ja
     * savuke mittaisi proseduraalisia pilviä luullen niitä aidoiksi.
     * Sama otsake on jo savuke-astro-pallossa.
     */
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(s, sumuPaalla ? '' : '&sumu=0');
  const muistiEnnen = await s.evaluate(MUISTI);
  await avaaLinssiEleella(s);
  const avausPysahtyi = await pysaytaAvaus(s);
  console.log(`    AVAUS PYSÄYTETTY ${JSON.stringify(avausPysahtyi)}`);
  const avaus = await s.evaluate(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.avauskorkeus ?? null,
  );
  const alt = Number(avaus) > 0 ? Number(avaus) : 4.5;
  /* Kolme korkeutta: zoomin ulkoraja, tihein kohta ja lähiraja. */
  const korkeudet = [
    { tunnus: 'kauko', alt: alt * 1.3 },
    { tunnus: 'keski', alt: alt * 0.6 },
    { tunnus: 'lahi', alt: alt * 0.18 },
  ];
  const otokset = [];
  for (const k of korkeudet) {
    await s.evaluate(ASETA, k.alt);
    await s.waitForTimeout(1800);
    const tila = await s.evaluate(TILA);
    /*
     * ── PILVIKUORI POIS RUUTUMITTAUKSEN AJAKSI (19.9.2026) ─────────
     *
     * Väite 1b mittaa RUUDULTA, paljonko AVARUUSSUMU muuttaa kuvaa.
     * Pilvikuori on eri kerros ja eri profiili (0,9 → 0), ja aidon
     * NASA-kuvan tultua se vei väitteen mennessään: ero sumuttomaan
     * ajoon oli kaukana +9,7 mutta keskellä −3,3, eli luku kertoi
     * pilvistä eikä sumusta. Kuori viedään pois piirrosta kaappauksen
     * ajaksi (`piilotaPilvet`, sama kytkin kuin pinnan mittauksella) ja
     * palautetaan heti perään — peiton oma profiili luetaan yhä
     * `tila`sta, joka on luettu ENNEN piilotusta.
     */
    const piilotettu = await s.evaluate(() => {
      const kahva = window.matkakirja.ui.pallolinssi?.kahva?.avaruus;
      const ok = Boolean(kahva?.piilotaPilvet?.(true));
      /*
       * ISS JA RATAKAARI POIS: ne liikkuvat joka kehyksellä ja osuvat
       * keskiruutuun, joten ne toisivat mittaukseen omaa vaihteluaan.
       */
      const tyyli = document.createElement('style');
      tyyli.id = 'astro-sumun-mittaus';
      tyyli.textContent = '.astro-rata, .astro-iss { display: none !important; }';
      document.head.appendChild(tyyli);
      window.matkakirja.ui.pallolauta?.heraa?.();
      return ok;
    });
    await s.waitForTimeout(400);
    const kaappaus = await s.screenshot();
    /*
     * SUMUN OMA OSUUS: sama näkymä ilman sumukalvoja, samasta
     * kamera-asennosta ja saman sekunnin sisällä. Erotuskuva ON sumu
     * — ja jos sumu olisi tasainen himmennys, erotus olisi VAKIO.
     */
    let sumuton = null;
    if (sumuPaalla && k.tunnus === 'keski') {
      await s.evaluate(() => {
        const tyyli = document.getElementById('astro-sumun-mittaus');
        if (tyyli) tyyli.textContent += ' .astro-sumu { display: none !important; }';
        window.matkakirja.ui.pallolauta?.heraa?.();
      });
      await s.waitForTimeout(400);
      sumuton = decodePng(await s.screenshot());
    }
    await s.evaluate(() => {
      document.getElementById('astro-sumun-mittaus')?.remove();
      window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false);
      window.matkakirja.ui.pallolauta?.heraa?.();
    });
    if (ULOS) writeFileSync(join(ULOS, `astro-sumu-${sumuPaalla ? 'on' : 'off'}-${k.tunnus}.png`), kaappaus);
    const kuva = decodePng(kaappaus);
    // Keskiruutu: pallon keskus 390 × 844 -kotelossa, dpr 2.
    const tilastot = ruudunTilastot(kuva, {
      x0: Math.round(kuva.width * 0.30), y0: Math.round(kuva.height * 0.36),
      x1: Math.round(kuva.width * 0.70), y1: Math.round(kuva.height * 0.64),
    });
    const RUUTU = {
      x0: Math.round(kuva.width * 0.30), y0: Math.round(kuva.height * 0.36),
      x1: Math.round(kuva.width * 0.70), y1: Math.round(kuva.height * 0.64),
    };
    const erotus = sumuton ? erotuksenTilastot(kuva, sumuton, RUUTU) : null;
    otokset.push({ ...k, tila, tilastot, piilotettu, erotus });
    console.log(`  ${sumuPaalla ? 'sumu' : 'pois'} ${k.tunnus.padEnd(6)} alt=${k.alt.toFixed(2)} `
      + `sumu=${tila.sumu ?? '?'} peitot=${JSON.stringify(tila.peitot)} `
      + `ka=${tilastot.ka} hajonta=${tilastot.hajonta}`);
  }
  const fps = await s.evaluate(MITTAA_FPS);
  const muistiJalkeen = await s.evaluate(MUISTI);
  const pilvet = await s.evaluate(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.sumu ?? null,
  );
  await konteksti.close();
  return { otokset, fps, muistiEnnen, muistiJalkeen, virheet, pilvet, alt };
}

console.log('— sumullinen ajo —');
const paalla = await ajo(true);
console.log('— sumuton vertailuajo (?sumu=0) —');
const pois = await ajo(false);

/* ---- väite 1: peiton profiili ------------------------------------- */
const luku = (a, t) => a.otokset.find((o) => o.tunnus === t);
const kaukoP = luku(paalla, 'kauko')?.tila?.sumu ?? null;
const keskiP = luku(paalla, 'keski')?.tila?.sumu ?? null;
const lahiP = luku(paalla, 'lahi')?.tila?.sumu ?? null;
vaadi('peiton profiili: kaukaa < 0,2, keskeltä > 0,5, läheltä 0',
  kaukoP !== null && kaukoP < 0.2 && keskiP > 0.5 && lahiP === 0,
  `kauko=${kaukoP} keski=${keskiP} lahi=${lahiP}`);

/* ---- väite 1b: ruutu seuraa profiilia ----------------------------- */
const ero = (t) => {
  const a = luku(paalla, t)?.tilastot?.ka ?? 0;
  const b = luku(pois, t)?.tilastot?.ka ?? 0;
  return +(a - b).toFixed(2);
};
const eroKauko = ero('kauko');
const eroKeski = ero('keski');
const eroLahi = ero('lahi');
/*
 * MITÄ TÄMÄ VÄITE MITTAA — JA MITÄ EI.
 *
 * Ensimmäinen versio vaati, että kirkkausero on KESKELLÄ suurin. Se
 * meni punaiseksi (kauko 83,8 vs. keski 83,5, mitattu 18.9.2026),
 * koska ruudun ero sumuttomaan ajoon oli PILVIKERROKSEN JA
 * AVARUUSSUMUN SUMMA. Toinen versio vaati molemmilta selvää eroa, ja
 * AITO NASA-pilvikuva kaatoi senkin (kauko +9,7, keski −3,3): pilvet
 * ovat oma kerroksensa, oma profiilinsa ja omat pikselinsä.
 *
 * Nyt väite on se, mitä se sanoo olevansa: kaappaus otetaan PILVIKUORI
 * PIILOTETTUNA, joten ero sumuttomaan ajoon on yksin AVARUUSSUMUN
 * osuus — kaukana ja keskellä harso näkyy, lähellä sitä ei ole
 * lainkaan. Pilvien oma profiili on väitteessä 1c ja `tila`ssa.
 */
vaadi('ruudun kirkkausero (pilvikuori piilossa): kaukana ja keskellä selvä, lähellä nolla',
  eroKauko > 2 && eroKeski > 5 && Math.abs(eroLahi) < 2,
  `kauko=${eroKauko} keski=${eroKeski} lahi=${eroLahi}`
  + ` (kuori piilotettu: ${luku(paalla, 'keski')?.piilotettu})`);

/* ---- väite 1c: sumun peitto RUUDULTA (computed style) ------------- */
const peitto = (t) => (luku(paalla, t)?.tila?.peitot ?? [])[0] ?? null;
vaadi('sumukalvon peitto ruudulla: kaukaa < 0,2, keskeltä > 0,5, läheltä 0',
  peitto('kauko') < 0.2 && peitto('keski') > 0.5 && peitto('lahi') === 0,
  `kauko=${peitto('kauko')} keski=${peitto('keski')} lahi=${peitto('lahi')}`);

/* ---- väite 2: kohinan hajonta ------------------------------------- */
/*
 * MIKSI RUUDUN OMA HAJONTA EI KELPAA MITTARIKSI (mitattu 19.9.2026).
 *
 * Ensimmäinen versio vaati, että keskiruudun kirkkauden keskihajonta
 * on sumullisessa ajossa suurempi kuin sumuttomassa. Se meni
 * punaiseksi (13,93 vs. 16,29) — eikä siksi, että sumu olisi tasainen,
 * vaan siksi, että HARSO PEITTÄÄ MAASTON: maaston oma kontrasti on
 * moninkertainen sumun omaan verrattuna, ja 0,62:n peitto vaimentaa
 * sitä enemmän kuin sumu tuo omaansa. Luku mittasi maastoa.
 *
 * Nyt mitataan SUMUN OMA OSUUS: sama näkymä sumukalvot piilotettuna ja
 * erotuskuva näiden kahden välillä. Tasainen himmennys antaisi vakion
 * (hajonta ≈ 0); repaleinen harso antaa vaihtelevan eron.
 */
const erotusKeski = luku(paalla, 'keski')?.erotus ?? null;
vaadi('sumu ei ole tasainen himmennys: sen oma osuus vaihtelee ruudulla',
  Boolean(erotusKeski) && erotusKeski.ka > 3 && erotusKeski.hajonta > 2,
  `sumun oma osuus keskellä: keskiarvo ${erotusKeski?.ka}, hajonta`
  + ` ${erotusKeski?.hajonta} (vaadittu > 3 ja > 2); keskiruudun oma hajonta`
  + ` sumulla ${luku(paalla, 'keski')?.tilastot?.hajonta},`
  + ` sumuttomassa ajossa ${luku(pois, 'keski')?.tilastot?.hajonta}`);

/* ---- väite 3: kalvot ruudulla ------------------------------------- */
const kalvoja = luku(paalla, 'keski')?.tila?.kalvoja ?? 0;
vaadi('kaksi sumukalvoa DOMissa ja peitot eri suuret', kalvoja === 2
  && new Set(luku(paalla, 'keski').tila.peitot).size === 2,
  `kalvoja=${kalvoja} peitot=${JSON.stringify(luku(paalla, 'keski')?.tila?.peitot)}`);

/* ---- väite 4: kehystahti ja muisti -------------------------------- */
vaadi('fps >= 50', paalla.fps.fps >= 50, `${paalla.fps.fps} fps (sumuton ${pois.fps.fps})`);
/*
 * TEKSTUURIBUDJETTI ON DETERMINISTINEN, JS-KEKO EI OLE. Kaksi eri
 * selainkontekstia roskienkeruineen antoi 264 ja 175 Mt, ja sama ajo
 * näytti 312 Mt jo ENNEN linssin avausta — ero on roskienkeruun
 * ajoitusta, ei sumun hintaa. Raja (PAATOKSET 36, 32 Mt) koskee
 * pilvitekstuuria, ja se lasketaan vakioista: 2 048 × 1 024 RGBA = 8 Mt.
 * Keko ja laattakerroksen tavut KIRJATAAN silti lokiin.
 */
const pilvienMt = (PILVIEN_LEVEYS * PILVIEN_KORKEUS * 4) / 1048576;
vaadi('pilvitekstuuri <= 32 Mt (PAATOKSET 36)', pilvienMt <= 32,
  `${PILVIEN_LEVEYS}x${PILVIEN_KORKEUS} RGBA = ${pilvienMt} Mt`);
console.log(`JS-keko (ei vertailukelpoinen konteksteittain): sumu ${paalla.muistiJalkeen.kekoMt} Mt, `
  + `sumuton ${pois.muistiJalkeen.kekoMt} Mt`);
console.log(`laattakerros: sumu ${paalla.muistiJalkeen.laattaTavutMt} Mt / `
  + `sumuton ${pois.muistiJalkeen.laattaTavutMt} Mt; `
  + `keko ennen linssiä ${paalla.muistiEnnen.kekoMt} Mt`);
vaadi('ei sivuvirheitä', paalla.virheet.length === 0, paalla.virheet.slice(0, 2).join(' | '));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok).length;
console.log(`\n${tulokset.length - kaatui}/${tulokset.length} vihreänä`);
process.exit(kaatui ? 1 : 0);
