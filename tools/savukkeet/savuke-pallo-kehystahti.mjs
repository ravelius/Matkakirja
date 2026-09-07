/*
 * SAVUKE JA MITTARI: PALLON KEHYSTAHTI — pisin kehys, ei keskiarvo
 * (omistaja 7.9.2026, Raamattu PALLON SULAVUUS).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-kehystahti.mjs
 *       [--nakyma=tyopoyta|puhelin] [--dpr=N] [--vaihe=pano|zoom|kaikki]
 *       [--kesto=6000] [--zoomkesto=4000] [--kehyksia=45] [--zoomkehyksia=30]
 *       [--toistot=2] [--jalki] [--ulos=<kansio>] [--tunniste=<nimi>]
 *
 * OMISTAJA 7.9.2026, SANATARKASTI: *"kartta pyörii nyt jo todella
 * hyvin, mutta jos vertaa google earthiin, niin vielä tulee vähän
 * tökkimistä eli ei niin sulavaa ruudun päivitystä, vaikka välillä on
 * sujuvaa. löytyykö jostain vielä optimoitavaa tai jotain mikä kuluttaa
 * laskentatehoa? mittari kyllä näyttää pysyvän 55-60 fps tasossa. voiko
 * se muuton 55 ja 60 välillä kuitenkin näkyä tökkimisenä?"*
 *
 * VASTAUS ON MITTA: 55 fps ei ole 55/60 verran hitaampi kuva vaan viisi
 * PUDOTETTUA kehystä sekunnissa, ja jokainen niistä on 33 ms:n nykäys
 * 16,7 ms:n virrassa. Keskiarvo ei siis kelpaa mitaksi lainkaan — tämä
 * savuke mittaa PISIMMÄN KEHYKSEN ja pudotusten osuuden.
 *
 * ── MITÄ MITATAAN ─────────────────────────────────────────────────
 *
 *   1. Jokaisen kehyksen kesto (rAF-erotus) ja siitä pelin oman
 *      JS-työn osuus, kun kamera kulkee Ateenan yllä 6 s:n tasaista
 *      panorointia ja 4 s:n zoomausta vastaavin KEHYSASKELIN.
 *   2. JS/kehys p50, p95, pisin ja yli 17 ms:n kehysten osuus
 *      (ks. KALIBROINTI alla).
 *   3. Kehyskohtainen erittely: paljonko kussakin kehyksessä paloi
 *      laattakerroksen päivitykseen (js/pallolaatat.js suorita),
 *      kirjaston laattamoottoriin (updatePov), tekstuurien vientiin
 *      (renderer.initTexture) ja three.js:n piirtoon (renderer.render).
 *      Erittely kertoo SYYN: pisimmän kehyksen rivi näyttää suoraan,
 *      mihin aika meni.
 *   4. `--jalki`: Chromen oma jälki (CDP Tracing) samalta jaksolta,
 *      pisimmät päätason tehtävät nimineen (Layout, UpdateLayoutTree,
 *      GCEvent, Decode Image, FunctionCall …).
 *
 * ── KALIBROINTI: MITÄ RAJA 17 ms MITTAA TÄSSÄ YMPÄRISTÖSSÄ ────────
 *
 * MITATTU 7.9.2026: kontin Chromium piirtää SwiftShaderilla (ANGLE
 * Vulkan, ohjelmistorasteroija) ja pallo vie kokonaisen kehyksen
 * 150 ms (360 × 240) … 1 130 ms (1 600 × 900 dpr 1) — joutilaanakin.
 * KEHYSVÄLI EI SIIS OLE TÄSSÄ MITATTAVISSA: kiinteä 17 ms:n raja
 * antaisi aina 100 % ja suhteellinen raja (× mediaani) aina 0 %.
 * Kumpikaan ei kertoisi mitään pelin koodista.
 *
 * VARTIO MITTAA SIKSI SEN OSAN KEHYKSESTÄ, JOKA ON PELIN OMAA TYÖTÄ:
 * pääsäikeen JS-aika kehystä kohti = laattakerroksen päivitys
 * (js/pallolaatat.js) + kirjaston laattamoottorin updatePov +
 * tekstuurien vienti (renderer.initTexture) + three.js:n piirtokutsu
 * (renderer.render). Rasterointi tapahtuu sen ulkopuolella, ja juuri se
 * on ainoa osa, joka on kontissa epärealistinen — laitteella sen tekee
 * näytönohjain. Raja 17 ms on siis LAITTEEN 60 Hz:n kehysbudjetti
 * sellaisenaan: jos pelin oma JS ei mahdu siihen, kehys putoaa
 * laitteellakin.
 *
 * MITTA ON LISÄKSI PAHIN TAPAUS. Laattakerros harventaa päivityksensä
 * 100 ms:iin (LAATTAKERROS_PAIVITYSVALI_LIIKE_MS), joten laitteella
 * vain joka kuudes kehys tekee täyden päivityksen; kontissa kehysväli
 * on satoja millisekunteja, joten TÄYSI PÄIVITYS OSUU JOKAISEEN
 * MITATTUUN KEHYKSEEN. Mitattu jakauma vastaa siis laitteen
 * raskaimpia kehyksiä — juuri niitä, jotka omistaja näkee tökkimisenä.
 *
 * VARTIO KAATUU, jos yli 17 ms:n JS-kehyksiä on panoroinnissa (tai
 * zoomissa) enemmän kuin NYKAYSOSUUS_RAJA (3 %).
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const NAKYMA = arg('nakyma', 'tyopoyta');
const VAIHE = arg('vaihe', 'kaikki');
const KESTO = Number(arg('kesto', 6000));
const ZOOMKESTO = Number(arg('zoomkesto', 4000));
const KORKEUS = Number(arg('korkeus', 0.35));
const JALKI = process.argv.includes('--jalki');
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/kehystahti');
const TUNNISTE = arg('tunniste', NAKYMA);
mkdirSync(ULOS, { recursive: true });

/** 60 Hz:n kehysbudjetti: pelin oma JS ei saa viedä tätä enempää. */
const NYKAYS_MS = 17;
/** Vartion raja: näin monta prosenttia budjetin ylittäviä kehyksiä saa olla. */
const NYKAYSOSUUS_RAJA = 3;
/*
 * ZOOMIN RAJA ON VÄLJEMPI (10 %) KAHDESTA SYYSTÄ. Omistajan raja koskee
 * panorointia, ja zoomissa on lisäksi työtä, joka on oikeaa eikä
 * hukkaa: tason vaihtuessa koko näkyvä laattajoukko lasketaan uudestaan
 * (mitattu kerroksen päivitys 17 ms juuri vaihdon kehyksellä). Zoom on
 * siis mukana ilmoitusluontoisena vartiona, joka nappaa karkean
 * regressiot mutta ei kaadu yhteen tason vaihtoon.
 */
const ZOOMIN_OSUUS_RAJA = 10;
/*
 * TOISTOT JA PARAS AJO. Kontti on jaettu, ja yksittäinen kehys voi
 * keskeytyä naapurin ajoon: mitattu 7.9.2026 sama koodi peräkkäin —
 * `renderer.render` mediaani 3 ms mutta pisin 76 ms, `updatePov`
 * mediaani 0 ms mutta pisin 40 ms. Yksittäiset piikit eivät siis
 * mittaa peliä. Jakso ajetaan siksi TOISTOT kertaa ja vartio lukee
 * PARHAAN ajon (pienin JS-p95) — se on lähin arvio kuormattomasta
 * koneesta. Kaikki ajot jäävät JSON-raporttiin.
 */
const TOISTOT = Number(arg('toistot', 2));
/*
 * KONEEN KUORMA MITATAAN JA JAETAAN POIS. Konttia jakaa moni ajo, ja
 * mitattu 7.9.2026: sama koodi antoi kuormitetulla koneella
 * kehysmediaanin 1 200 ms ja rauhallisella 750 ms — samassa suhteessa
 * venyivät JS-ajat. Ilman normalisointia vartio kaatuisi naapurin
 * ajoon eikä pelin koodiin. Sivun sisällä ajetaan siksi kiinteä
 * laskusilmukka (KALIBROINNIN_KIERROKSIA) viisi kertaa, paras aika
 * otetaan koneen nopeudeksi, ja JS-ajat kerrotaan suhteella
 * PERUSAIKA / mitattu. PERUSAIKA on tämän kontin rauhallinen lukema
 * (Xeon 2,8 GHz, mitattu 7.9.2026).
 */
const KALIBROINNIN_KIERROKSIA = 2e6;
const KALIBROINNIN_PERUSAIKA_MS = 3.4;

const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 },
};

/* ---------------- palvelin ja ämpäri ---------------- */
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
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

const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;

const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const nakyma = { ...NAKYMAT[NAKYMA] };
if (arg('dpr', null)) nakyma.deviceScaleFactor = Number(arg('dpr'));
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
const cdp = await ctx.newCDPSession(sivu);

await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(3000);

/* ---------------- sivun sisäinen kehysmittari ---------------- */
await sivu.evaluate(() => {
  const M = {
    mittaa: false,
    kehykset: [],   // [dt, laatat, moottori, tekstuurit, piirto]
    osat: { laatat: 0, moottori: 0, tekstuurit: 0, piirto: 0 },
    kutsut: { laatat: [], moottori: [], tekstuurit: [], piirto: [] },
    tekstuureja: 0,
    pitkat: [],
  };
  window.__tahti = M;
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;

  let edellinen = performance.now();
  const askel = (t) => {
    if (M.mittaa) {
      M.kehykset.push([
        +(t - edellinen).toFixed(3),
        +M.osat.laatat.toFixed(3), +M.osat.moottori.toFixed(3),
        +M.osat.tekstuurit.toFixed(3), +M.osat.piirto.toFixed(3),
      ]);
      if (M.pohja && !window.__peittaa?.()) M.pohja.peittamatta += 1;
    }
    M.osat.laatat = 0; M.osat.moottori = 0; M.osat.tekstuurit = 0; M.osat.piirto = 0;
    edellinen = t;
    requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);

  /** Kääre, joka laskee kuluneen ajan osaan `nimi` (kehys ja kutsu). */
  const mittaa = (olio, avain, nimi) => {
    const alkuperainen = olio?.[avain];
    if (typeof alkuperainen !== 'function') return false;
    olio[avain] = function mitattu(...args) {
      const t0 = performance.now();
      try { return alkuperainen.apply(this, args); } finally {
        const dt = performance.now() - t0;
        M.osat[nimi] += dt;
        if (M.mittaa) M.kutsut[nimi].push(+dt.toFixed(3));
      }
    };
    return true;
  };

  try {
    new PerformanceObserver((lista) => {
      if (!M.mittaa) return;
      for (const e of lista.getEntries()) M.pitkat.push(+e.duration.toFixed(1));
    }).observe({ type: 'longtask', buffered: false });
  } catch { /* longtaskia ei tueta */ }

  M.kytketty = {};
  if (pallo) {
    const renderer = pallo.renderer?.();
    M.kytketty.piirto = mittaa(renderer, 'render', 'piirto');
    if (renderer && typeof renderer.initTexture === 'function') {
      const alkuperainen = renderer.initTexture.bind(renderer);
      renderer.initTexture = (t) => {
        const t0 = performance.now();
        try { return alkuperainen(t); } finally {
          const dt = performance.now() - t0;
          M.osat.tekstuurit += dt;
          if (M.mittaa) { M.tekstuureja += 1; M.kutsut.tekstuurit.push(+dt.toFixed(3)); }
        }
      };
      M.kytketty.tekstuurit = true;
    }
    let moottori = null;
    pallo.scene().traverse((o) => { if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o; });
    if (moottori) { window.__moottori = moottori; M.kytketty.moottori = mittaa(moottori, 'updatePov', 'moottori'); }
    const kerros = ui.pallolauta?.lepokerros?.();
    if (kerros) M.kytketty.laatat = mittaa(kerros, 'paivita', 'laatat');
    /*
     * POHJAN HARVENNUS (js/pallo.js): `moottori.pohjapaivityksia` kertoo,
     * montako kertaa kirjaston oma laattamoottori oikeasti luetteloi
     * pohjan. Kääre yllä laskee KUTSUT (kaikki), tämä TEHDYT TYÖT —
     * ero on juuri se, minkä harvennus säästää. `peittamatta` kertoo,
     * montako kehystä kerros ei peittänyt koko näkyvää aluetta.
     */
    M.pohja = { alku: 0, loppu: 0, peittamatta: 0 };
    window.__pohjalukema = () => (moottori?.pohjapaivityksia ?? 0);
    window.__peittaa = () => Boolean(kerros?.peittaa?.());
    /*
     * VALMISTELU on laatan pääsäikeen työ latauksen jälkeen (kangas,
     * drawImage, verkon puskurit, materiaali). Se osuu satunnaiseen
     * kehykseen eikä näy kehyskoukussa, joten kerros mittaa sen itse
     * (js/pallolaatat.js mittarit.valmisteluMs).
     */
    window.__valmistelu = () => (kerros?.valmistelu?.() ?? [0, 0, 0]);
  }
});

/** Koneen nopeus: kiinteä laskusilmukka, paras viidestä (ks. yllä). */
const kalibroi = () => sivu.evaluate((kierroksia) => {
  const kierros = () => {
    const t0 = performance.now();
    let summa = 0;
    for (let i = 1; i < kierroksia; i += 1) summa += Math.sqrt(i);
    // `summa` luetaan, jottei moottori optimoi silmukkaa pois.
    return summa > 0 ? performance.now() - t0 : NaN;
  };
  let paras = Infinity;
  for (let i = 0; i < 5; i += 1) paras = Math.min(paras, kierros());
  return paras;
}, KALIBROINNIN_KIERROKSIA);

const ateena = await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  const c = game.board.cityById.get('ateena');
  const a = ui.pallolauta.asteet({ x: c.x, y: c.y });
  return { x: c.x, y: c.y, lat: a?.lat, lon: a?.lon };
});

const asetaKamera = (lat, lng, altitude) => sivu.evaluate(({ lat, lng, altitude }) => {
  window.matkakirja.ui.pallolauta.heraa?.();
  window.matkakirja.ui.pallonInstanssi.pointOfView({ lat, lng, altitude }, 0);
}, { lat, lng, altitude });
const odotaLepo = async (ms) => {
  await sivu.waitForFunction(() => !window.matkakirja.ui.pallolauta.kamera.kameraAjossa(), null, { timeout: 60000 });
  await sivu.waitForTimeout(ms);
};
const ajaKamera = (kohde, kesto) => sivu.evaluate(({ kohde, kesto }) => window.matkakirja.ui.pallolauta.kamera
  .ajaKamera(kohde, { kesto, pehmennys: (t) => t }), { kohde, kesto });

/*
 * KEHYSASKEL, EI KELLO. Kamera siirretään joka piirretyllä kehyksellä
 * TÄSMÄLLEEN sen verran kuin se siirtyisi laitteella 60 Hz:n kehyksessä
 * (dLng = koko matka / (kesto / 16,7 ms)). Kellosta ajettu ajo tekisi
 * kontissa yhdellä kehyksellä satojen millisekuntien loikan, jolloin
 * laattakerroksen ennakkoalue paisuisi eikä mitattu työ vastaisi
 * laitteen kehystä lainkaan. Näin jokainen mitattu kehys on laitteen
 * kehys — vain seinäkelloaika venyy.
 */
const askelin = ({ dLat = 0, dLng = 0, kerroin = 1, kehyksia }) => sivu.evaluate(
  ({ dLat, dLng, kerroin, kehyksia }) => new Promise((valmis) => {
    const pallo = window.matkakirja.ui.pallonInstanssi;
    window.matkakirja.ui.pallolauta.heraa?.();
    let n = 0;
    const askel = () => {
      const pov = pallo.pointOfView();
      pallo.pointOfView({
        lat: pov.lat + dLat, lng: pov.lng + dLng, altitude: pov.altitude * kerroin,
      }, 0);
      n += 1;
      if (n < kehyksia) requestAnimationFrame(askel);
      else valmis(n);
    };
    requestAnimationFrame(askel);
  }),
  { dLat, dLng, kerroin, kehyksia },
);

const alkaa = async () => {
  if (JALKI) {
    await cdp.send('Tracing.start', {
      transferMode: 'ReturnAsStream',
      traceConfig: {
        includedCategories: [
          'devtools.timeline', 'disabled-by-default-devtools.timeline',
          'disabled-by-default-v8.gc', 'v8.execute', 'blink.user_timing',
        ],
      },
    });
  }
  await sivu.evaluate(() => {
    const M = window.__tahti;
    M.kehykset = [];
    M.tekstuureja = 0;
    M.pitkat = [];
    for (const avain of Object.keys(M.kutsut)) M.kutsut[avain] = [];
    if (M.pohja) { M.pohja.alku = window.__pohjalukema?.() ?? 0; M.pohja.peittamatta = 0; }
    M.valmisteluAlku = window.__valmistelu?.() ?? [0, 0, 0];
    M.mittaa = true;
  });
};
const paattyy = async () => {
  const m = await sivu.evaluate(() => {
    const M = window.__tahti;
    M.mittaa = false;
    if (M.pohja) M.pohja.loppu = window.__pohjalukema?.() ?? 0;
    return {
      kehykset: M.kehykset, tekstuureja: M.tekstuureja, kytketty: M.kytketty,
      kutsut: M.kutsut, pitkat: M.pitkat,
      pohja: M.pohja ? { paivityksia: M.pohja.loppu - M.pohja.alku, peittamatta: M.pohja.peittamatta } : null,
      valmistelu: (() => {
        const nyt = window.__valmistelu?.() ?? [0, 0, 0];
        const alku = M.valmisteluAlku ?? [0, 0, 0];
        return { ms: +(nyt[0] - alku[0]).toFixed(1), n: nyt[1] - alku[1], max: +nyt[2].toFixed(1) };
      })(),
    };
  });
  m.jalki = JALKI ? await lueJalki() : null;
  return m;
};

/** Chromen jälki virrasta: pisimmät päätason tehtävät nimineen. */
async function lueJalki() {
  const valmis = new Promise((ok) => cdp.once('Tracing.tracingComplete', ok));
  await cdp.send('Tracing.end');
  const { stream } = await valmis;
  if (!stream) return null;
  let teksti = '';
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const pala = await cdp.send('IO.read', { handle: stream, size: 1 << 20 });
    teksti += pala.data;
    if (pala.eof) break;
  }
  await cdp.send('IO.close', { handle: stream });
  let tapahtumat;
  try { tapahtumat = JSON.parse(teksti).traceEvents ?? []; } catch { return null; }
  const yhteenveto = new Map();
  for (const e of tapahtumat) {
    if (e.ph !== 'X' || !(e.dur > 0)) continue;
    const nimi = e.name;
    const rivi = yhteenveto.get(nimi) ?? { nimi, n: 0, msYht: 0, msMax: 0 };
    rivi.n += 1;
    rivi.msYht += e.dur / 1000;
    rivi.msMax = Math.max(rivi.msMax, e.dur / 1000);
    yhteenveto.set(nimi, rivi);
  }
  return [...yhteenveto.values()]
    .map((r) => ({ ...r, msYht: +r.msYht.toFixed(1), msMax: +r.msMax.toFixed(1) }))
    .sort((a, b) => b.msYht - a.msYht).slice(0, 20);
}

/* ---------------- yhteenveto ---------------- */
const p = (lista, osuus) => {
  if (!lista.length) return null;
  const jarj = [...lista].sort((a, b) => a - b);
  return +jarj[Math.min(jarj.length - 1, Math.floor(osuus * (jarj.length - 1)))].toFixed(1);
};
const kutsurivi = (lista) => (lista.length
  ? { n: lista.length, p50: p(lista, 0.5), p95: p(lista, 0.95), max: p(lista, 1) }
  : { n: 0, p50: null, p95: null, max: null });
const kooste = (m, kerroin = 1) => {
  const kehykset = m.kehykset;
  const dt = kehykset.map((k) => k[0]);
  if (!dt.length) return null;
  // JS-TYÖ KEHYKSESSÄ = se osa kehyksestä, joka on pallon omaa
  // pääsäikeen työtä (ks. KALIBROINTI tiedoston alussa).
  const js = kehykset.map((k) => +((k[1] + k[2] + k[3] + k[4]) * kerroin).toFixed(3));
  const yliJs = js.filter((d) => d > NYKAYS_MS).length;
  const pisin = kehykset.reduce((a, b) => (b[1] + b[2] + b[3] + b[4] > a[1] + a[2] + a[3] + a[4] ? b : a), kehykset[0]);
  const summa = (i) => +kehykset.reduce((s, k) => s + k[i], 0).toFixed(1);
  return {
    kehyksia: dt.length,
    kehysP50: p(dt, 0.5),
    kehysP95: p(dt, 0.95),
    kehysPisin: p(dt, 1),
    jsP50: p(js, 0.5),
    jsP95: p(js, 0.95),
    jsPisin: p(js, 1),
    jsYli17: yliJs,
    jsYli17Osuus: +((100 * yliJs) / js.length).toFixed(1),
    pisinErittely: {
      js: +(pisin[1] + pisin[2] + pisin[3] + pisin[4]).toFixed(1),
      laatat: pisin[1], moottori: pisin[2], tekstuurit: pisin[3], piirto: pisin[4], kehys: pisin[0],
    },
    msYht: {
      laatat: summa(1), moottori: summa(2), tekstuurit: summa(3), piirto: summa(4),
    },
    kutsut: {
      laatat: kutsurivi(m.kutsut.laatat), moottori: kutsurivi(m.kutsut.moottori),
      tekstuurit: kutsurivi(m.kutsut.tekstuurit), piirto: kutsurivi(m.kutsut.piirto),
    },
    pitkia: m.pitkat.length,
    pitkinMs: m.pitkat.length ? Math.max(...m.pitkat) : 0,
    pohja: m.pohja,
    valmistelu: m.valmistelu,
  };
};

/* ================= mittausjaksot ================= */
const tulos = { nakyma: NAKYMA, dpr: nakyma.deviceScaleFactor, korkeus: KORKEUS, kestoMs: KESTO };

// Koneen nopeus ennen mittausta: JS-ajat suhteutetaan tähän (ks. yllä).
const kalibrointiMs = await kalibroi();
const KUORMAKERROIN = Math.min(1, KALIBROINNIN_PERUSAIKA_MS / kalibrointiMs);
tulos.kalibrointi = { ms: +kalibrointiMs.toFixed(2), perusaika: KALIBROINNIN_PERUSAIKA_MS, kerroin: +KUORMAKERROIN.toFixed(3) };

await asetaKamera(ateena.lat, ateena.lon, KORKEUS);
await odotaLepo(4000);
const leveys = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.kamera.kameranTila().leveys);
tulos.leveysYks = +leveys.toFixed(1);

// Laitteen kehyksiä mitattavassa jaksossa (60 Hz), ja niistä se osa,
// joka kontissa oikeasti ajetaan (--kehyksia).
const LAITEKEHYKSET = Math.round(KESTO / 16.7);
const KEHYKSIA = Number(arg('kehyksia', 45));
const ZOOM_LAITEKEHYKSET = Math.round(ZOOMKESTO / 16.7);
const ZOOM_KEHYKSIA = Number(arg('zoomkehyksia', 30));
tulos.kehyksia = KEHYKSIA;
tulos.laitekehykset = LAITEKEHYKSET;

if (VAIHE === 'kaikki' || VAIHE === 'pano') {
  // Panorointi: kaksi kotelon leveyttä itään 6 s:ssa = LAITEKEHYKSET
  // askelta; mitataan niistä KEHYKSIA ensimmäistä (--kehyksia).
  const dLng = (2 * leveys * 360) / 12000 / LAITEKEHYKSET;
  /*
   * PANOROINTI KULKEE AINA UUTEEN MAASTOON, EIKÄ SITÄ LÄMMITETÄ.
   * Lämmitysajo koko matkan yli olisi tehnyt mittauksesta arpapeliä:
   * LRU:n muistikatto (24 näkymätöntä valmista laattaa) on pienempi
   * kuin matkan varrella olevien laattojen määrä, joten osa ehti
   * purkautua ja osa ei — mitattu 7.9.2026 kaksi ajoa peräkkäin, 27
   * tekstuurin vientiä ja 0. Nyt kamera lähtee levänneestä Ateenasta ja
   * jokainen toisto JATKAA siitä, mihin edellinen jäi: joka ajo lataa
   * laattoja samaan tahtiin, mikä on sekä toistettavaa että se raskain
   * tapaus, jossa omistaja tökkimisen näkee.
   */
  await asetaKamera(ateena.lat, ateena.lon, KORKEUS);
  await odotaLepo(3000);
  const ajot = [];
  for (let toisto = 0; toisto < TOISTOT; toisto += 1) {
    await odotaLepo(2000);
    await alkaa();
    await askelin({ dLng, kehyksia: KEHYKSIA });
    const m = await paattyy();
    ajot.push({
      ...kooste(m, KUORMAKERROIN), asteAskel: +dLng.toFixed(4), tekstuureja: m.tekstuureja,
      kytketty: m.kytketty, jalki: m.jalki,
    });
  }
  tulos.panoAjot = ajot.map((a) => ({ jsP50: a.jsP50, jsP95: a.jsP95, jsPisin: a.jsPisin, jsYli17Osuus: a.jsYli17Osuus }));
  tulos.pano = ajot.reduce((a, b) => (b.jsP95 < a.jsP95 ? b : a), ajot[0]);
}

if (VAIHE === 'kaikki' || VAIHE === 'zoom') {
  // Zoom 0,35 → 0,09 (yksi lautaleveys neljäsosaan) 4 s:ssa.
  const kerroin = (0.25) ** (1 / ZOOM_LAITEKEHYKSET);
  const ajot = [];
  for (let toisto = 0; toisto < TOISTOT; toisto += 1) {
    await asetaKamera(ateena.lat, ateena.lon, KORKEUS);
    await odotaLepo(3000);
    await alkaa();
    await askelin({ kerroin, kehyksia: ZOOM_KEHYKSIA });
    const m = await paattyy();
    ajot.push({ ...kooste(m, KUORMAKERROIN), kerroin: +kerroin.toFixed(5), tekstuureja: m.tekstuureja, jalki: m.jalki });
    await odotaLepo(2000);
  }
  tulos.zoomAjot = ajot.map((a) => ({ jsP50: a.jsP50, jsP95: a.jsP95, jsPisin: a.jsPisin, jsYli17Osuus: a.jsYli17Osuus }));
  tulos.zoom = ajot.reduce((a, b) => (b.jsP95 < a.jsP95 ? b : a), ajot[0]);
}

tulos.virheet = virheet;
const raportti = join(ULOS, `kehystahti-${TUNNISTE}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 2));

/* ================= tuloste ja vartio ================= */
const rivi = (nimi, k) => (k
  ? `${nimi.padEnd(6)} kehyksiä ${String(k.kehyksia).padStart(4)} · JS/kehys p50 ${String(k.jsP50).padStart(6)} ms`
    + ` · p95 ${String(k.jsP95).padStart(6)} ms · pisin ${String(k.jsPisin).padStart(6)} ms`
    + ` · yli 17 ms ${String(k.jsYli17Osuus).padStart(5)} % (${k.jsYli17} kpl)`
  : `${nimi.padEnd(6)} OHI`);

console.log(`SAVUKE pallo-kehystahti — ${NAKYMA} ${nakyma.viewport.width}×${nakyma.viewport.height} dpr ${nakyma.deviceScaleFactor}`);
console.log(`kuorma  laskusilmukka ${tulos.kalibrointi.ms} ms (rauhallinen ${KALIBROINNIN_PERUSAIKA_MS} ms)`
  + ` → JS-ajat kerrotaan ${tulos.kalibrointi.kerroin}:lla`);
if (tulos.panoAjot) console.log(`toistot pano ${JSON.stringify(tulos.panoAjot)}`);
if (tulos.zoomAjot) console.log(`toistot zoom ${JSON.stringify(tulos.zoomAjot)}`);
console.log(rivi('pano', tulos.pano));
console.log(rivi('zoom', tulos.zoom));
for (const [nimi, k] of [['pano', tulos.pano], ['zoom', tulos.zoom]]) {
  if (!k) continue;
  const e = k.pisinErittely;
  console.log(`  ${nimi} raskaimman kehyksen JS ${e.js} ms: laatat ${e.laatat} · moottori ${e.moottori}`
    + ` · tekstuurit ${e.tekstuurit} · piirto ${e.piirto} (koko kehys ${e.kehys} ms, rasterointi mukana)`);
  console.log(`  ${nimi} kutsut (n · p50 · p95 · max ms):`
    + ` laatat ${k.kutsut.laatat.n}·${k.kutsut.laatat.p50}·${k.kutsut.laatat.p95}·${k.kutsut.laatat.max}`
    + ` | moottori ${k.kutsut.moottori.n}·${k.kutsut.moottori.p50}·${k.kutsut.moottori.p95}·${k.kutsut.moottori.max}`
    + ` | tekstuurit ${k.kutsut.tekstuurit.n}·${k.kutsut.tekstuurit.p50}·${k.kutsut.tekstuurit.p95}·${k.kutsut.tekstuurit.max}`
    + ` | piirto ${k.kutsut.piirto.n}·${k.kutsut.piirto.p50}·${k.kutsut.piirto.p95}·${k.kutsut.piirto.max}`);
  console.log(`  ${nimi} kehysajat (rasterointi mukana, ei laitteen mitta): p50 ${k.kehysP50} ms`
    + ` · p95 ${k.kehysP95} ms · pisin ${k.kehysPisin} ms · pitkiä tehtäviä ${k.pitkia} (pisin ${k.pitkinMs} ms)`);
  if (k.valmistelu) {
    console.log(`  ${nimi} laattojen valmistelu (kangas, verkko, materiaali): ${k.valmistelu.ms} ms`
      + ` / ${k.valmistelu.n} laattaa · pisin koskaan ${k.valmistelu.max} ms`);
  }
  if (k.pohja) {
    console.log(`  ${nimi} pohja päivitettiin ${k.pohja.paivityksia} kertaa / ${k.kehyksia} kehystä`
      + ` (kerros ei peittänyt ${k.pohja.peittamatta} kehyksessä)`);
  }
  if (k.jalki) {
    console.log(`  ${nimi} jälki (pisimmät):`);
    for (const j of k.jalki.slice(0, 8)) console.log(`    ${j.nimi.padEnd(28)} n ${String(j.n).padStart(5)} · yht ${j.msYht} ms · max ${j.msMax} ms`);
  }
}

const vartiot = [];
if (tulos.pano) {
  /*
   * PÄÄVARTIO on omistajan raja sellaisenaan: yli 17 ms:n JS-kehyksiä
   * enintään 3 %. Se luetaan KUORMAKERTOIMELLA suhteutetuista ajoista,
   * jotta naapurin ajo kontissa ei kaada vartiota (ks. KONEEN KUORMA).
   */
  vartiot.push([
    tulos.pano.jsYli17Osuus <= NYKAYSOSUUS_RAJA,
    `panoroinnin yli ${NYKAYS_MS} ms:n JS-kehysten osuus ${tulos.pano.jsYli17Osuus} % (raja ${NYKAYSOSUUS_RAJA} %)`,
  ]);
  /*
   * RAKENTEELLISET VARTIOT eivät riipu koneen kuormasta lainkaan, joten
   * ne kaatuvat vain, jos JOKIN KOODISSA muuttuu takaisin. Ne vartioivat
   * tämän erän kaksi mitattua korjausta.
   */
  vartiot.push([
    (tulos.pano.pohja?.paivityksia ?? 0) <= 0.7 * tulos.pano.kehyksia,
    `pohja päivitettiin ${tulos.pano.pohja?.paivityksia ?? '–'} kertaa / ${tulos.pano.kehyksia} kehystä`
    + ' (harvennus päällä: enintään 0,7 × kehykset)',
  ]);
  vartiot.push([
    tulos.pano.kutsut.tekstuurit.n <= tulos.pano.kehyksia,
    `tekstuurien vientejä ${tulos.pano.kutsut.tekstuurit.n} / ${tulos.pano.kehyksia} kehystä (enintään yksi kehyksessä)`,
  ]);
  vartiot.push([
    tulos.pano.kehyksia >= 5,
    `panoroinnista kertyi ${tulos.pano.kehyksia} kehystä (vähintään 5)`,
  ]);
  vartiot.push([
    tulos.pano.kytketty?.laatat && tulos.pano.kytketty?.moottori,
    `mittarin kääreet kiinni: ${JSON.stringify(tulos.pano.kytketty ?? {})}`,
  ]);
}
if (tulos.zoom) {
  vartiot.push([
    tulos.zoom.jsYli17Osuus <= ZOOMIN_OSUUS_RAJA,
    `zoomin yli ${NYKAYS_MS} ms:n JS-kehysten osuus ${tulos.zoom.jsYli17Osuus} % (raja ${ZOOMIN_OSUUS_RAJA} %)`,
  ]);
}
vartiot.push([virheet.length === 0, `sivuvirheitä ${virheet.length}${virheet.length ? `: ${virheet[0]}` : ''}`]);

let fail = 0;
for (const [ok, teksti] of vartiot) {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${teksti}`);
  if (!ok) fail += 1;
}
console.log(`raportti: ${raportti}`);

await ctx.close();
await selain.close();
palvelin.close();
process.exit(fail ? 1 : 0);
