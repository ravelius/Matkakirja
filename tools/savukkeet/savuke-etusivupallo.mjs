/*
 * Savuke: ETUSIVUN ESIRENDERÖITY PALLO (pallolauta vaihe 5a).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-etusivupallo.mjs [kuvakansio]
 *
 * Omistajan tilaus 5.9.2026 sanatarkasti: *"etusivun kartan voi pitää
 * aluksi vielä vanhassa mutta sitten kun ehditään tehdä uusi, niin
 * siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa, mutta on jo renderöity
 * blurrattuna, jotta efekti ei vie etusivulla tehoja. ja siinä
 * lentokone voisi lentää eri kaupunkien välillä samalla kun pallo
 * pyörii ja piirtää paksua punaista viivaa ja aina ei kaupunkien
 * välillä kun kone laskeutuu, tulee uusi isoisän aikalaiskuva jonnekin
 * kartan ulkopuolelle pienellä, niin että ei jää etusivun tekstin
 * päälle."* — ja klo 22.45: *"isoisän kuvat voivat olla blurrattuja ja
 * haalealla ja jäädä tekstin alle"*, *"ne voisivat pinoutua hieman
 * sikin sokin toistensa päälle"*.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   E1  Kerros syntyy KOKO AVAUSPANEELIIN (.intro) ja on TEKSTIN
 *       TAKANA: se on paneelin ensimmäinen lapsi, julisteotsikko tulee
 *       DOMissa sen jälkeen ja piirtyy siis päälle. Kerros on paneelin
 *       kokoinen ja video rajataan cover-tavalla (omistaja 5.9.2026:
 *       *"pallo saisi pyöriä koko etusivun alalla"*).
 *   E2  Kone liikkuu: koneen muunnos vaihtuu näytteiden välillä.
 *   E3  Punainen viiva pitenee: polun pituus kasvaa eikä kutistu.
 *   E4  ISOISÄN KUVAT ON JÄTETTY POIS ETUSIVULTA (omistajan päätös
 *       6.9.2026 klo 01.20, sanatarkasti: *"Jätä isoisän kuvat pois
 *       etusivulta"*): koko kierroksen ajan avausnäkymässä ei ole
 *       yhtään kuvakorttia eikä pinokerrosta, ja avauspaneelin ainoa
 *       lisäkerros on pallo itse.
 *   E10 COVER-SOVITUS: koneen ruutupiste, jonka SELAIN laski SVG:n
 *       xMidYMid slice -rajauksella, on sama kuin moduulin oma
 *       kerroksenSovitus + videostaRuudulle antaa — ja piste osuu
 *       videon pallolle (etäisyys keskeltä alle pallon säteen).
 *   E1d Tasokarttaa EI alusteta etusivua varten (aalto 1D): kartta on
 *       lepotilassa ja svg#board tyhjä koko avausnäkymän ajan.
 *   E5  Lippu pois → ENTINEN ETUSIVU: .intro-kartassa on vain
 *       julisteotsikko, ei etusivupallo-elementtiä eikä
 *       .intro-pallolla-luokkaa; sama DOM kuin ilman koko moduulia, ja
 *       vanha pienoiskartta on hereillä.
 *   E6  Vipu purkaa kerroksen ilman sivulatausta (kehittäjävalikon
 *       tapa: lippu '0' + render).
 *   E7  Reduced motion: ei <video>-elementtiä lainkaan, pysäytyskuva
 *       tilalla ja kone paikallaan.
 *   E8  Ei verkkoa (etusivu.json ei vastaa): kerrosta ei synny eikä
 *       karttaa herätetä — etusivu on pelkkää paperia julisteotsikon
 *       kanssa.
 *   E11 AVAUKSEN AJOITUS (omistaja 5.9.2026 ilta ja klo 00.20): juliste
 *       on ruudulla jo ennen videon latautumista (hidas verkko), ja
 *       napautuksen jälkeen vaiheet tulevat järjestyksessä — pallo ja
 *       otsikko heti, "osa II" 2,3 s päästä feidaten, kirjoituskone
 *       vasta häivytyksen jälkeen. JULISTEOTSIKKO EI LIIKU EIKÄ VAIHDA
 *       KOKOA yhdessäkään vaiheessa (omistaja: *"etusivun otsikko
 *       hyppää alussa eri kokoon kun kirjoituskone teksti alkaa"*).
 *       Samalla otetaan kaappaukset 1400×900.
 *   E9  LÄHTÖKAUPUNGIN VALINTA PALLOLLA (aalto 3A): "Valitse
 *       aloituskaupunki" avaa pallolaudan valintatilaan — tasokartta
 *       PYSYY lepotilassa ja svg#board tyhjänä, valittavat kaupungit
 *       ovat pallon kohdemerkkejä (karttanimi vain Lontoolla — Ateenan
 *       nimi tulee sen omasta merkistä), pallo pyörii hitaasti täydessä
 *       terävyydessä, ja kohdemerkin napautus käynnistää pelin ja
 *       vapauttaa laatupakotuksen. Aalto 1D jätti tähän kartan
 *       herätyksen; tämä vartio pitää huolen ettei se palaa.
 *
 * LIPPU ON POISKYTKIN (aalto 1D, omistaja 5.9.2026: *"Käännä kaikki
 * pallolle, niin voidaan sulkea vanha kartta kokonaan."*): oletus on
 * PÄÄLLÄ pallolaudalla, ja savukkeen `lippu: false` kirjoittaa
 * muistiin '0' niin kuin ratasvalikon vipukin.
 *
 * ── MISTÄ VIDEO TULEE TÄSSÄ SAVUKKEESSA ───────────────────────────
 *
 * Oikea video on ämpärissä vasta kun workflow tee-etusivupallo on
 * ajettu. Savuke ei odota sitä: se NAUHOITTAA selaimessa pienen
 * WebM-videon (MediaRecorder + canvas.captureStream) ja tarjoilee sen
 * pallon paikalla. Näin vartiot mittaavat oikeaa polkua (video →
 * currentTime → koneen ruutupiste) riippumatta siitä, mikä ämpärissä
 * on. Luettelo (etusivu.json) rakennetaan pelin omasta paketista
 * samoilla funktioilla kuin työkalussa.
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

const {
  ETUSIVUPALLO_VERSIO, ETUSIVUN_KAMERA, ETUSIVUPALLO_TIEDOSTOT,
  SVG_SOVITUS, SOVITUS_TAPA,
  kerroksenSovitus, reitinPisteet, teeReitti, videostaRuudulle,
} = await import(`${JUURI}js/etusivupallo.js`);
const { packById } = await import(`${JUURI}js/pack.js`);

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = req.url.split('?')[0];
  if (osa === '/savuke-tyhja') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<!doctype html><meta charset="utf-8"><title>nauhuri</title>');
    return;
  }
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ---------- luettelo (etusivu.json) pelin omasta paketista ---------- */

const KOEVIDEON_KESTO = 7;
const reitti = teeReitti(reitinPisteet(packById('maailmankartta')));
const luettelo = {
  versio: ETUSIVUPALLO_VERSIO,
  kesto: KOEVIDEON_KESTO,
  fps: 15,
  julisteAika: 3,
  mitat: {
    leveys: 800, korkeus: 800, lava: 900, fov: ETUSIVUN_KAMERA.fov,
  },
  kamera: ETUSIVUN_KAMERA,
  reitti: reitti.pisteet.map((p) => ({ id: p.id, nimi: p.nimi, lat: p.lat, lon: p.lon })),
  tiedostot: ETUSIVUPALLO_TIEDOSTOT,
};
tieto('reitin kesto oikeassa videossa', `${reitti.kesto.toFixed(1)} s (savukkeessa ${KOEVIDEON_KESTO} s)`);

/* ---------- selain ---------- */

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  /*
   * WebGL ohjelmistorasteroijalla (aalto 3A): lähtövalinta on nyt
   * pallolaudalla, ja ilman näitä lippuja Globe.gl ei rakenna
   * kontekstia — savuke mittaisi silloin varapolkua eikä valintaa.
   * Muihin vartioihin liput eivät vaikuta.
   */
  args: ['--autoplay-policy=no-user-gesture-required',
    '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

/** Pieni WebM selaimessa nauhoitettuna (ks. tiedoston alku). */
async function nauhoitaKoevideo(ctx) {
  const sivu = await ctx.newPage();
  await sivu.goto(`${osoite}savuke-tyhja`, { waitUntil: 'load' });
  const b64 = await sivu.evaluate(async (kesto) => {
    if (typeof MediaRecorder === 'undefined') return null;
    const kangas = document.createElement('canvas');
    kangas.width = 320;
    kangas.height = 320;
    const g = kangas.getContext('2d');
    const virta = kangas.captureStream(15);
    const palat = [];
    let nauhuri;
    try {
      nauhuri = new MediaRecorder(virta, { mimeType: 'video/webm;codecs=vp8' });
    } catch { return null; }
    nauhuri.ondataavailable = (e) => palat.push(e.data);
    const loppu = new Promise((ok) => { nauhuri.onstop = ok; });
    nauhuri.start();
    const alku = performance.now();
    await new Promise((ok) => {
      const piirra = () => {
        const t = (performance.now() - alku) / 1000;
        g.fillStyle = '#efdcb4';
        g.fillRect(0, 0, 320, 320);
        g.fillStyle = '#8a6c46';
        g.beginPath();
        g.arc(160, 160, 118, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = '#46331f';
        g.fillRect((t * 40) % 280, 20, 14, 14);
        if (t >= kesto) ok();
        else requestAnimationFrame(piirra);
      };
      piirra();
    });
    nauhuri.stop();
    await loppu;
    const tavut = new Uint8Array(await new Blob(palat, { type: 'video/webm' }).arrayBuffer());
    let s = '';
    for (let i = 0; i < tavut.length; i++) s += String.fromCharCode(tavut[i]);
    return btoa(s);
  }, KOEVIDEON_KESTO);
  await sivu.close();
  return b64 ? Buffer.from(b64, 'base64') : null;
}

const apuCtx = await selain.newContext({ viewport: { width: 400, height: 400 } });
const koevideo = await nauhoitaKoevideo(apuCtx);
await apuCtx.close();
if (koevideo) tieto('koevideo', `${(koevideo.length / 1024).toFixed(0)} kt WebM (nauhoitettu selaimessa)`);
else console.log('HUOM  MediaRecorder ei käytettävissä — videovartiot (E1–E4, E6) ohitetaan');

const JULISTE = readFileSync(join(JUURI, 'assets/etusivu/irtolehti.png'));
const ETUSIVUPOLKU = `julisteet/etusivu/${ETUSIVUPALLO_VERSIO}/`;
const ampariValimuisti = new Map();

/**
 * Uusi sivu: etusivun aineisto tarjoillaan täältä, muu ämpäri Noden
 * fetchin kautta (kontin selain ei osaa välityspalvelinta).
 */
async function avaaSivu({
  lippu = true, aineisto = true, reducedMotion = 'no-preference', video = koevideo,
  ikkuna = { width: 390, height: 844 }, videoViive = 0,
} = {}) {
  const ctx = await selain.newContext({
    viewport: ikkuna, deviceScaleFactor: 2, reducedMotion,
    serviceWorkers: 'block',
  });
  /*
   * LIPPU ON POISKYTKIN (aalto 1D): oletus seuraa lautaa, joten pallolla
   * pelkkä avaimen poisto EI enää sammuta kerrosta — pois kytkeminen
   * kirjoittaa '0' (js/ui-apurit.js asetaEtusivupallo).
   */
  await ctx.addInitScript((paalla) => {
    try {
      localStorage.setItem('matkakirja-kehittaja', '1');
      localStorage.setItem('matkakirja-etusivupallo', paalla ? '1' : '0');
    } catch { /* yksityinen tila */ }
  }, lippu);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**workers.dev/**', (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const url = route.request().url();
    if (url.includes(ETUSIVUPOLKU)) {
      if (!aineisto) { route.abort(); return; }
      if (url.endsWith('etusivu.json')) {
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(luettelo) });
        return;
      }
      if (url.endsWith(ETUSIVUPALLO_TIEDOSTOT.webm) && video) {
        /*
         * VIDEO SAA TULLA MYÖHÄSSÄ (E11a): juuri siinä ikkunassa
         * etusivu oli ennen tyhjä pergamentti, joten hidas verkko on
         * ainoa tapa mitata, että juliste on jo ruudulla.
         */
        if (videoViive) {
          setTimeout(() => route.fulfill({
            status: 200, contentType: 'video/webm', body: video,
          }).catch(() => {}), videoViive);
          return;
        }
        route.fulfill({ status: 200, contentType: 'video/webm', body: video });
        return;
      }
      if (url.endsWith(ETUSIVUPALLO_TIEDOSTOT.juliste)) {
        route.fulfill({ status: 200, contentType: 'image/png', body: JULISTE });
        return;
      }
      route.abort();
      return;
    }
    if (!ampariValimuisti.has(url)) {
      ampariValimuisti.set(url, fetch(url).then(async (v) => ({
        status: v.status,
        contentType: v.headers.get('content-type') ?? 'application/octet-stream',
        body: Buffer.from(await v.arrayBuffer()),
      })).catch(() => ({ status: 502, contentType: 'text/plain', body: Buffer.alloc(0) })));
    }
    route.fulfill(await ampariValimuisti.get(url));
  });
  /*
   * OLETUSLAUTA (aalto 1D): savuke ajetaan siinä tilassa, jossa peli
   * käynnistyy — pallolaudalla. Vaiheessa 5a tässä oli `?lauta=kartta`,
   * koska etusivun pallo oli lipun takana ja vertailukohta oli vanha
   * pienoiskartta; nyt vertailukohta tehdään lipun poiskytkimellä
   * (avaaSivu { lippu: false }), jolloin sama ajo mittaa myös sen,
   * ettei tasokarttaa alusteta turhaan (E1d).
   */
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.introEl, null, { timeout: 60000 });
  return { ctx, sivu, virheet };
}

/** Avauksen tila: kerros, kone, viiva ja kuvan laatikko. */
const LUE_TILA = () => {
  const juuri = document.querySelector('.etusivupallo');
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0
      ? { x: r.left, y: r.top, w: r.width, h: r.height } : null;
  };
  const kone = juuri?.querySelector('.etusivupallo-kone');
  const viiva = juuri?.querySelector('.etusivupallo-viiva');
  const z = (el) => (el ? getComputedStyle(el).zIndex : null);
  const kartta = document.querySelector('.intro-kartta');
  const paneeli = document.querySelector('#intro');
  const otsikko = document.querySelector('.intro-juliste');
  return {
    kerros: Boolean(juuri),
    // Kerros on KOKO PANEELIN ensimmäinen lapsi (5.9.2026 ilta).
    ekaLapsi: paneeli?.firstElementChild?.className ?? null,
    otsikkoJalkeen: Boolean(juuri && otsikko
      && (juuri.compareDocumentPosition(otsikko) & Node.DOCUMENT_POSITION_FOLLOWING)),
    videoFit: juuri ? getComputedStyle(juuri.querySelector('.etusivupallo-video')
      ?? juuri.querySelector('.etusivupallo-juliste') ?? juuri).objectFit : null,
    svgPAR: juuri?.querySelector('.etusivupallo-reitti')?.getAttribute('preserveAspectRatio') ?? null,
    /*
     * ISOISÄN KUVAT ON JÄTETTY POIS ETUSIVULTA (omistaja 6.9.2026 klo
     * 01.20): näiden lukujen on pysyttävä nollassa koko kierroksen.
     */
    kortteja: document.querySelectorAll('.etusivupallo-kuva').length,
    pinoja: document.querySelectorAll('.etusivupallo-pino').length,
    paneelinLapset: [...(document.querySelector('#intro')?.children ?? [])]
      .map((el) => el.className),
    /* KERROSJÄRJESTYS SELAIMEN LASKEMANA: teksti > verho > video. */
    zPallo: z(juuri),
    zVerho: z(document.querySelector('.intro-verho')),
    zKartta: z(document.querySelector('.intro-kartta')),
    zArkki: z(document.querySelector('.intro-arkki')),
    koneenLaatikko: laatikko(kone),
    paneelinLaatikko: laatikko(paneeli),
    saatimet: [...document.querySelectorAll(
      '#intro button, #intro a, .start-gate-keskus, .start-aanet, .start-btn, .start-linkki',
    )].map(laatikko).filter(Boolean),
    videoita: juuri ? juuri.querySelectorAll('video').length : 0,
    julisteita: juuri ? juuri.querySelectorAll('img.etusivupallo-juliste').length : 0,
    pallollaLuokka: document.querySelector('.intro')?.classList.contains('intro-pallolla') ?? false,
    kartanLapsia: kartta ? kartta.children.length : 0,
    koneenMuunnos: kone?.getAttribute('transform') ?? null,
    viivanPituus: viiva?.getTotalLength ? Math.round(viiva.getTotalLength()) : 0,
    pallonLaatikko: laatikko(juuri),
    palstaLaatikko: laatikko(document.querySelector('.intro-palsta')),
    tekstiLaatikko: laatikko(document.getElementById('intro-text')),
    otsikkoLaatikko: laatikko(document.querySelector('.intro-juliste')),
    /*
     * OTSIKON RIVIT PIKSELILLEEN (omistaja 5.9.2026 klo 00.20:
     * *"etusivun otsikko hyppää alussa eri kokoon kun kirjoituskone
     * teksti alkaa"*). Laatikot ja kirjasinkoot samasta hetkestä, jotta
     * vartio voi verrata avauksen vaiheita keskenään.
     */
    otsikonRivit: ['.juliste-nimi', '.juliste-yla', '.juliste-ala', '.juliste-osa']
      .map((v) => {
        const el = document.querySelector(v);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          v,
          x: +r.left.toFixed(1),
          y: +r.top.toFixed(1),
          w: +r.width.toFixed(1),
          h: +r.height.toFixed(1),
          koko: getComputedStyle(el).fontSize,
        };
      }).filter(Boolean),
    aika: document.querySelector('.etusivupallo-video')?.currentTime ?? null,
    /*
     * AVAUKSEN KOLME VAIHETTA (omistaja 5.9.2026 ilta): juliste näkyy
     * heti, video vaihtuu sen tilalle, "osa II" feidaa sisään ja vasta
     * sitten alkaa kirjoituskone.
     */
    julisteenPeitto: Number(getComputedStyle(
      document.querySelector('.etusivupallo-juliste') ?? document.body,
    ).opacity),
    videonPeitto: document.querySelector('.etusivupallo-video')
      ? Number(getComputedStyle(document.querySelector('.etusivupallo-video')).opacity) : null,
    videonTila: document.querySelector('.etusivupallo-video')?.readyState ?? null,
    kerrosNakyy: Boolean(juuri?.classList.contains('nakyy')),
    osanPeitto: Number(getComputedStyle(
      document.querySelector('.juliste-osa') ?? document.body,
    ).opacity),
    nimiNakyy: (document.querySelector('.juliste-nimi')?.textContent ?? '').trim(),
    paikkarivi: (document.getElementById('intro-paikka')?.textContent ?? '').length,
    runko: (document.getElementById('intro-runko')?.textContent ?? '').length,
    /*
     * TASOKARTTA POIS TIELTÄ (aalto 1D): pallolaudalla avausnäkymän
     * pienoiskarttaa ei alusteta lainkaan — svg#board jää tyhjäksi ja
     * js/kartta.js on lepotilassa. Lipulla pois vanha kartta piirtyy
     * entiseen tapaan, ja nämä kaksi lukua erottavat tilat toisistaan.
     */
    lepotila: window.matkakirja?.ui?.kartta?.lepotila ?? null,
    laudanOsia: document.querySelector('svg#board')?.querySelectorAll('*').length ?? null,
  };
};

/**
 * Kehysaika etusivulla: rAF-näytteet annetun ajan verran. Omistajan
 * ehto on, ettei efekti vie etusivulla tehoja — tämä on se mittari.
 * Kontin ohjelmistorasteroija on hidas, joten luvut ovat vertailua
 * varten (lippu päällä vs. pois), eivät laitteen totuus.
 */
const mittaaKehysaika = (sivu, ms = 3000) => sivu.evaluate((kesto) => new Promise((ok) => {
  const valit = [];
  let edellinen = performance.now();
  const alku = edellinen;
  const askel = (nyt) => {
    valit.push(nyt - edellinen);
    edellinen = nyt;
    if (nyt - alku < kesto) requestAnimationFrame(askel);
    else {
      valit.sort((a, b) => a - b);
      ok({
        kehyksia: valit.length,
        p50: Math.round(valit[Math.floor(valit.length * 0.5)] ?? 0),
        p95: Math.round(valit[Math.floor(valit.length * 0.95)] ?? 0),
      });
    }
  };
  requestAnimationFrame(askel);
}), ms);

const leikkaavat = (a, b) => Boolean(a && b
  && a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h);

/* ================= LIPPU PÄÄLLÄ ================= */

if (koevideo) {
  const { ctx, sivu, virheet } = await avaaSivu({ lippu: true });
  const syntyi = await sivu.waitForFunction(() => Boolean(document.querySelector('.etusivupallo')),
    null, { timeout: 30000 }).then(() => true).catch(() => false);
  vaadi('E1a kerros syntyy lipulla päällä', syntyi, 'etusivupallo-elementtiä ei ilmestynyt 30 s:ssa');

  if (syntyi) {
    // Aloitusportti pois, jotta avausteksti on ruudulla kuvan tieltä.
    await sivu.evaluate(() => {
      [...document.querySelectorAll('button')]
        .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
    });
    await sivu.waitForTimeout(1200);

    const alku = await sivu.evaluate(LUE_TILA);
    vaadi('E1b kerros on avauspaneelin ensimmäinen lapsi (tekstin takana)',
      alku.ekaLapsi?.includes('etusivupallo') && alku.otsikkoJalkeen,
      `ensimmäinen lapsi "${alku.ekaLapsi}", otsikko jälkeen: ${alku.otsikkoJalkeen}`);
    vaadi('E1c video on kerroksessa ja soi', alku.videoita === 1 && alku.aika !== null,
      `videoita ${alku.videoita}, aika ${alku.aika}`);
    vaadi('E1d tasokarttaa ei alusteta etusivua varten (lepotila, svg#board tyhjä)',
      alku.lepotila === true && alku.laudanOsia === 0,
      `lepotila ${alku.lepotila}, laudan osia ${alku.laudanOsia}`);
    /*
     * KOKO ETUSIVUN ALA (omistaja 5.9.2026 klo 21.30): kerros on
     * paneelin kokoinen ±1 px, ja video täyttää sen cover-tavalla.
     */
    const p = alku.paneelinLaatikko;
    const k = alku.pallonLaatikko;
    vaadi('E1e kerros peittää koko avauspaneelin',
      Boolean(p && k) && Math.abs(p.x - k.x) < 1 && Math.abs(p.y - k.y) < 1
      && Math.abs(p.w - k.w) < 1 && Math.abs(p.h - k.h) < 1,
      `paneeli ${JSON.stringify(p)} vs. kerros ${JSON.stringify(k)}`);
    vaadi('E1f video ja SVG rajautuvat samoin (cover ≡ xMidYMid slice)',
      alku.videoFit === SOVITUS_TAPA && alku.svgPAR === SVG_SOVITUS[SOVITUS_TAPA],
      `object-fit ${alku.videoFit}, preserveAspectRatio ${alku.svgPAR}`);

    await sivu.waitForTimeout(1500);
    const keski = await sivu.evaluate(LUE_TILA);
    await sivu.waitForTimeout(1800);
    const loppu = await sivu.evaluate(LUE_TILA);

    vaadi('E2 kone liikkuu pallon pinnalla',
      alku.koneenMuunnos !== keski.koneenMuunnos && keski.koneenMuunnos !== loppu.koneenMuunnos,
      `${alku.koneenMuunnos} → ${keski.koneenMuunnos} → ${loppu.koneenMuunnos}`);
    vaadi('E3 punainen viiva pitenee',
      loppu.viivanPituus > keski.viivanPituus && keski.viivanPituus >= alku.viivanPituus,
      `pituudet ${alku.viivanPituus} → ${keski.viivanPituus} → ${loppu.viivanPituus}`);

    /*
     * E4 ISOISÄN KUVAT ON JÄTETTY POIS ETUSIVULTA (omistajan päätös
     * 6.9.2026 klo 01.20, sanatarkasti: *"Jätä isoisän kuvat pois
     * etusivulta"*). Ennen tässä oli kymmenen vartiota kuvapinosta;
     * nyt vartioidaan päinvastaista: koko kierroksen ajan avausnäkymään
     * ei ilmesty yhtään korttia eikä pinokerrosta, ja avauspaneelin
     * ainoa lisäkerros on pallo itse. Odotus on pitkä tarkoituksella —
     * kuvat tulivat ennen jo muutamassa sekunnissa.
     */
    const kuvaIlmestyi = await sivu.waitForFunction(
      () => Boolean(document.querySelector('.etusivupallo-kuva')
        || document.querySelector('.etusivupallo-pino')),
      null, { timeout: 12000 },
    ).then(() => true).catch(() => false);
    const kuvaton = await sivu.evaluate(LUE_TILA);
    vaadi('E4a etusivulle ei ilmesty isoisän kuvia eikä pinokerrosta',
      !kuvaIlmestyi && kuvaton.kortteja === 0 && kuvaton.pinoja === 0,
      `kortteja ${kuvaton.kortteja}, pinoja ${kuvaton.pinoja}`);
    vaadi('E4b avauspaneelin ainoa lisäkerros on pallo',
      kuvaton.paneelinLapset.filter((l) => String(l).includes('etusivupallo')).length === 1,
      `paneelin lapset: ${kuvaton.paneelinLapset.join(' | ')}`);
    /*
     * E4c KERROSJÄRJESTYS ILMAN PINOA: teksti > verho > video. Luvut
     * ovat selaimen laskemat, eivät tiedoston tekstiä.
     */
    const luku = (v) => (v === 'auto' || v == null ? 0 : Number(v));
    vaadi('E4c kerrosjärjestys: teksti > verho > video',
      luku(kuvaton.zKartta) > luku(kuvaton.zVerho)
      && luku(kuvaton.zArkki) > luku(kuvaton.zVerho)
      && luku(kuvaton.zVerho) > luku(kuvaton.zPallo),
      `pallo ${kuvaton.zPallo}, verho ${kuvaton.zVerho}, `
      + `kartta ${kuvaton.zKartta}, arkki ${kuvaton.zArkki}`);
    // E10 mittaa saman hetken tilasta kuin E4 (kerros on jo pyörinyt).
    const toinen = kuvaton;

    /*
     * E10 COVER-SOVITUS: selain laski koneen paikan SVG:n slice-
     * rajauksella, moduuli laskee saman kerroksenSovituksella. Jos nämä
     * eroavat, kone lentäisi videon pallon vierestä.
     */
    const muunnos = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(toinen.koneenMuunnos ?? '');
    const sovitus = kerroksenSovitus(luettelo.mitat, {
      leveys: toinen.pallonLaatikko.w, korkeus: toinen.pallonLaatikko.h,
    });
    const oma = muunnos
      ? videostaRuudulle({ x: Number(muunnos[1]), y: Number(muunnos[2]) }, sovitus) : null;
    const selaimen = toinen.koneenLaatikko ? {
      x: toinen.koneenLaatikko.x - toinen.pallonLaatikko.x + toinen.koneenLaatikko.w / 2,
      y: toinen.koneenLaatikko.y - toinen.pallonLaatikko.y + toinen.koneenLaatikko.h / 2,
    } : null;
    vaadi('E10a moduulin sovitus = selaimen SVG-rajaus (alle 2 px ero)',
      Boolean(oma && selaimen) && Math.hypot(oma.x - selaimen.x, oma.y - selaimen.y) < 2,
      `oma ${JSON.stringify(oma)} vs. selain ${JSON.stringify(selaimen)}`);
    /*
     * Kone osuu videon PALLOLLE: pallon säde videon pikseleinä on
     * f·sin θ/(D − cos θ) reunalla (cos θ = 1/D), fov 50° ja korkeus
     * 1,55 → noin 411 px, kun lava on 900 ja kuva 800.
     */
    const D = 1 + ETUSIVUN_KAMERA.korkeus;
    const f = (luettelo.mitat.lava / 2) / Math.tan((ETUSIVUN_KAMERA.fov * Math.PI) / 360);
    const sade = (f * Math.sqrt(1 - 1 / D ** 2)) / (D - 1 / D);
    const etaisyys = muunnos
      ? Math.hypot(Number(muunnos[1]) - luettelo.mitat.leveys / 2,
        Number(muunnos[2]) - luettelo.mitat.korkeus / 2) : Infinity;
    vaadi('E10b kone on videon pallon pinnalla myös cover-rajauksessa', etaisyys < sade,
      `etäisyys keskeltä ${etaisyys.toFixed(0)} px, pallon säde ${sade.toFixed(0)} px`);
    tieto('sumuverho kevennetty (.intro-pallolla)', kuvaton.pallollaLuokka);
    const kehysaika = await mittaaKehysaika(sivu);
    tieto('kehysaika etusivulla, pallo PÄÄLLÄ',
      `p50 ${kehysaika.p50} ms, p95 ${kehysaika.p95} ms (${kehysaika.kehyksia} kehystä)`);

    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, 'etusivupallo.png'), scale: 'css' });
    }

    /* E6: vipu pois ilman sivulatausta. */
    const purettu = await sivu.evaluate(() => {
      localStorage.setItem('matkakirja-etusivupallo', '0');
      // Koko piirto kuten vivussa (js/main.js): pallolaudalla tasokartta
      // herää samalla lepotilasta vanhaksi pienoiskartaksi.
      window.matkakirja.ui.render();
      return new Promise((ok) => setTimeout(() => ok({
        kerros: Boolean(document.querySelector('.etusivupallo')),
        luokka: document.querySelector('.intro')?.classList.contains('intro-pallolla'),
      }), 200));
    });
    vaadi('E6 vipu purkaa kerroksen ilman sivulatausta',
      !purettu.kerros && !purettu.luokka, JSON.stringify(purettu));
  }
  if (virheet.length) tieto('sivun virheet', virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

/* ================= LIPPU POIS: ENTINEN ETUSIVU ================= */

{
  const { ctx, sivu, virheet } = await avaaSivu({ lippu: false });
  await sivu.waitForTimeout(2500);
  const tila = await sivu.evaluate(LUE_TILA);
  const html = await sivu.evaluate(() => document.querySelector('.intro-kartta')?.innerHTML ?? '');
  vaadi('E5a lipulla pois kerrosta ei ole', !tila.kerros && tila.videoita === 0);
  vaadi('E5b avauksen ylälohkossa on vain julisteotsikko (entinen DOM)',
    tila.kartanLapsia === 1 && !html.includes('etusivupallo') && html.includes('intro-juliste'),
    `lapsia ${tila.kartanLapsia}`);
  vaadi('E5c sumuverho on ennallaan (ei .intro-pallolla)', !tila.pallollaLuokka);
  // Poiskytkin palauttaa myös vanhan pienoiskartan: kartta on hereillä ja
  // svg#board piirretty (aalto 1D — muuten ylälohkoon jäisi pergamentti).
  vaadi('E5d vanha pienoiskartta on hereillä lipulla pois',
    tila.lepotila === false && tila.laudanOsia > 0,
    `lepotila ${tila.lepotila}, laudan osia ${tila.laudanOsia}`);
  const kehysaika = await mittaaKehysaika(sivu);
  tieto('kehysaika etusivulla, pallo POIS (vertailukohta)',
    `p50 ${kehysaika.p50} ms, p95 ${kehysaika.p95} ms (${kehysaika.kehyksia} kehystä)`);
  if (virheet.length) tieto('sivun virheet (lippu pois)', virheet.slice(0, 3).join(' | '));
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'etusivupallo-pois.png'), scale: 'css' });
  }
  await ctx.close();
}

/* ================= REDUCED MOTION ================= */

if (koevideo) {
  const { ctx, sivu } = await avaaSivu({ lippu: true, reducedMotion: 'reduce' });
  const syntyi = await sivu.waitForFunction(() => Boolean(document.querySelector('.etusivupallo')),
    null, { timeout: 20000 }).then(() => true).catch(() => false);
  const alku = await sivu.evaluate(LUE_TILA);
  await sivu.waitForTimeout(1500);
  const loppu = await sivu.evaluate(LUE_TILA);
  vaadi('E7a reduced motion: pysäytyskuva ilman videota',
    syntyi && alku.videoita === 0 && alku.julisteita === 1,
    `videoita ${alku.videoita}, julisteita ${alku.julisteita}`);
  vaadi('E7b reduced motion: kone seisoo paikallaan',
    Boolean(alku.koneenMuunnos) && alku.koneenMuunnos === loppu.koneenMuunnos,
    `${alku.koneenMuunnos} → ${loppu.koneenMuunnos}`);
  await ctx.close();
}

/* ========== E9: LÄHTÖKAUPUNGIN VALINTA PALLOLLA (aalto 3A) ========== */

/*
 * Omistaja 5.9.2026 sanatarkasti: *"Käännä kaikki pallolle, niin
 * voidaan sulkea vanha kartta kokonaan."* Aalto 1D jätti napin
 * herättämään tasokartan; nyt valinta tehdään pallolta, ja tämä on
 * savukkeen mittari sille.
 */
if (koevideo) {
  const { ctx, sivu } = await avaaSivu({ lippu: true });
  await sivu.waitForFunction(() => Boolean(document.querySelector('.etusivupallo')),
    null, { timeout: 30000 }).catch(() => {});
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  // Nappi paljastuu vasta kun avausteksti on kirjoitettu loppuun.
  const nappiNakyy = await sivu.waitForFunction(
    () => document.querySelector('.intro-valinta')
      && !document.querySelector('.intro-valinta').classList.contains('intro-valinta-piilossa'),
    null, { timeout: 90000 },
  ).then(() => true).catch(() => false);
  await sivu.evaluate(() => document.querySelector('.intro-valinta')?.click());
  const avautui = await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.pallolauta),
    null, { timeout: 90000 }).then(() => true).catch(() => false);
  await sivu.waitForTimeout(6000);

  const valinta = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const kohde = document.querySelector('.pallolauta-kohde');
    const r = kohde?.getBoundingClientRect();
    // Kuplapino ei saa peittää valittavaa kaupunkia (omistaja 29.8.2026).
    const kuplat = [...document.querySelectorAll('.pollo-vihje, .pollo-kuplapino-kehys')]
      .map((e) => e.getBoundingClientRect())
      .filter((b) => b.width > 0);
    const peitossa = r ? kuplat.some((b) => r.left < b.right && b.left < r.right
      && r.top < b.bottom && b.top < r.bottom) : false;
    return {
      pallolauta: Boolean(ui.pallolauta),
      lepotila: ui.kartta.lepotila,
      laudanOsia: document.querySelector('svg#board')?.querySelectorAll('*').length ?? null,
      etusivupallo: Boolean(document.querySelector('.etusivupallo')),
      kohteet: [...document.querySelectorAll('.pallolauta-kohde')].map((e) => e.dataset.kohde),
      nimet: [...document.querySelectorAll('.pallolauta-nimi')].map((e) => e.dataset.kaupunki).sort(),
      kohdenimet: [...document.querySelectorAll('.pallolauta-kohde .target-nimi')]
        .map((e) => e.textContent),
      peitossa,
      piste: r ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) } : null,
    };
  });
  vaadi('E9a nappi avaa pallolaudan eikä herätä tasokarttaa',
    nappiNakyy && avautui && valinta.pallolauta && valinta.lepotila === true
    && valinta.laudanOsia === 0 && !valinta.etusivupallo,
    `pallolauta ${valinta.pallolauta}, lepotila ${valinta.lepotila}, laudan osia ${valinta.laudanOsia}`);
  /*
   * YKSI NIMI VALITTAVALLE (omistajan kaappaus 5.9.2026 klo 00.30):
   * Ateenan kohdalla oli KAKSI nimeä — nimikerroksen harmaa kapiteeli ja
   * kohdemerkin oma tumma lappu. Merkin nimi voittaa, joten
   * karttanimikerros latoo valinnassa enää Lontoon.
   */
  vaadi('E9b valittavat ovat pallon kohdemerkkejä, karttanimi vain Lontoolla',
    valinta.kohteet.length === 1 && valinta.kohteet[0].startsWith('aloitus:')
    && valinta.nimet.join(',') === 'lontoo' && valinta.kohdenimet.join(',') === 'Ateena',
    `kohteet ${JSON.stringify(valinta.kohteet)}, nimet ${JSON.stringify(valinta.nimet)}, `
    + `kohdenimet ${JSON.stringify(valinta.kohdenimet)}`);
  vaadi('E9c kuplat eivät peitä valittavaa kaupunkia', !valinta.peitossa,
    `kohdemerkki ${JSON.stringify(valinta.piste)} jäi kuplapinon alle`);
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'etusivupallo-valinta.png'), scale: 'css' });
  }
  /*
   * E9e PALLO PYÖRII HITAASTI TÄYDESSÄ TERÄVYYDESSÄ (omistaja 5.9.2026
   * klo 00.30: *"karttapallo saisi pyöriä hitaast täydessä
   * terävyydessä"*). Kulmanopeus luetaan seinäkellosta, joten
   * ohjelmistorasteroijan hitaat kehykset EIVÄT näy suuntana: mitataan
   * vain, että kierto etenee itään ja että laatupakotus on päällä.
   */
  const pyorintaA = await sivu.evaluate(async () => {
    const { pallonLaatuPakotettu } = await import('/js/pallo.js');
    return {
      lng: window.matkakirja.ui.pallolauta.pallo.pointOfView().lng,
      pyorii: window.matkakirja.ui.pallolauta.aloitusvalinnanPyorinta(),
      laatu: pallonLaatuPakotettu(),
    };
  });
  await sivu.waitForTimeout(3000);
  const pyorintaB = await sivu.evaluate(() => ({
    lng: window.matkakirja.ui.pallolauta.pallo.pointOfView().lng,
  }));
  vaadi('E9e pallo pyörii itään ja terävä tila on pakotettuna',
    pyorintaA.pyorii === true && pyorintaA.laatu === true && pyorintaB.lng > pyorintaA.lng,
    `pyorii ${pyorintaA.pyorii}, laatu ${pyorintaA.laatu}, `
    + `lng ${pyorintaA.lng.toFixed(2)} → ${pyorintaB.lng.toFixed(2)}`);
  if (valinta.piste) await sivu.mouse.click(valinta.piste.x, valinta.piste.y);
  const alkoi = await sivu.waitForFunction(() => window.matkakirja.ui.game.phase !== 'pickstart',
    null, { timeout: 30000 }).then(() => true).catch(() => false);
  const jalkeen = await sivu.evaluate(async () => {
    const { pallonLaatuPakotettu } = await import('/js/pallo.js');
    return {
      vaihe: window.matkakirja.ui.game.phase,
      lepotila: window.matkakirja.ui.kartta.lepotila,
      laudanOsia: document.querySelector('svg#board')?.querySelectorAll('*').length ?? null,
      pyorii: window.matkakirja.ui.pallolauta?.aloitusvalinnanPyorinta() ?? null,
      laatu: pallonLaatuPakotettu(),
    };
  });
  vaadi('E9d kohdemerkin napautus käynnistää pelin ilman tasokarttaa',
    alkoi && jalkeen.lepotila === true && jalkeen.laudanOsia === 0,
    `vaihe ${jalkeen.vaihe}, lepotila ${jalkeen.lepotila}, laudan osia ${jalkeen.laudanOsia}`);
  vaadi('E9f valinta lopettaa pyörinnän ja vapauttaa laatupakotuksen',
    jalkeen.pyorii === false && jalkeen.laatu === false,
    `pyorii ${jalkeen.pyorii}, laatu ${jalkeen.laatu}`);
  await ctx.close();
}

/* ========== E11: AVAUKSEN AJOITUS (omistaja 5.9.2026 ilta) ========== */

/*
 * Omistaja sanatarkasti: *"tuon etusivun voisi animoida niin että pallo
 * lähtee heti pyörimään ja näytöllä näkyy otsikko, mutta "Osa II.."
 * tulee vasta noin reilun sekunnin päästä feidaten. sitten alkaa
 * kirjoituskone ja luenta"*.
 *
 *   E11a Juliste on ruudulla ENNEN kuin video on latautunut (hidas
 *        verkko): kerroksella on nakyy-luokka, juliste peittävä ja
 *        video vielä läpinäkyvä ja lataamatta.
 *   E11b Vaiheet järjestyksessä: 0,3 s otsikko ilman "osa II" ja ilman
 *        kirjoituskonetta → 2,0 s "osa II" yhä piilossa (viive on nyt
 *        2,3 s, omistaja klo 00.20: *"osa 2 saisi tulla sekunnin
 *        myöhemmin"*) → 3,5 s "osa II" näkyvissä → 4,5 s kirjoituskone
 *        käynnissä. Samalla otetaan kaappaukset.
 *   E11f JULISTEOTSIKKO EI LIIKU EIKÄ VAIHDA KOKOA yhdessäkään
 *        vaiheessa (omistaja klo 00.20: *"etusivun otsikko hyppää
 *        alussa eri kokoon kun kirjoituskone teksti alkaa"*): rivien
 *        laatikot ja kirjasinkoot ovat samat 0,3 s ja 6 s kohdalla.
 */

if (koevideo) {
  const { ctx, sivu } = await avaaSivu({ lippu: true, videoViive: 2500 });
  /*
   * Odotetaan JULISTETTA, ei videota: juliste tulee näkyviin heti kun
   * kuva on purettu, ja juuri silloin videon on vielä oltava lataamatta
   * — se on tämän vartion koko sisältö.
   */
  const julisteNakyy = await sivu.waitForFunction(() => {
    const el = document.querySelector('.etusivupallo-juliste');
    return Boolean(el) && Number(getComputedStyle(el).opacity) > 0.9;
  }, null, { timeout: 30000 }).then(() => true).catch(() => false);
  const heti = await sivu.evaluate(LUE_TILA);
  vaadi('E11a juliste näkyy jo ennen videon latautumista',
    julisteNakyy && heti.kerrosNakyy && heti.julisteenPeitto > 0.9
    && heti.videonTila !== null && heti.videonTila < 2 && heti.videonPeitto === 0,
    `kerros ${heti.kerrosNakyy}, juliste ${heti.julisteenPeitto}, `
    + `video ${heti.videonPeitto} (readyState ${heti.videonTila})`);
  await ctx.close();
}

if (koevideo) {
  const { ctx, sivu } = await avaaSivu({ lippu: true, ikkuna: { width: 1400, height: 900 } });
  await sivu.waitForFunction(() => Boolean(document.querySelector('.etusivupallo')),
    null, { timeout: 30000 }).catch(() => {});
  /*
   * Video käyntiin ja häivytys loppuun ENNEN kellon nollaa: mitataan
   * avausta eikä latausta. Oikealla pelaajalla nappiin menee joka
   * tapauksessa sekunteja, joten pallo pyörii jo napautushetkellä.
   */
  await sivu.waitForFunction(() => {
    const v = document.querySelector('.etusivupallo-video');
    return v && v.currentTime > 0 && Number(getComputedStyle(v).opacity) > 0.99;
  }, null, { timeout: 25000 }).catch(() => {});
  const alkuhetki = await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
    return performance.now();
  });
  const otokset = new Map();
  /*
   * Näytehetket ja kaappaukset (omistajan tarkastuskuvat 5.9.2026):
   * 0,3 s · 2,5 s · 3,5 s · 6 s · 25 s. Väliin mahtuvat vartioiden
   * omat hetket 2,0 s (osa II ei ole vielä alkanut) ja 4,5 s
   * (kirjoituskone käynnissä).
   */
  const KAAPPAUSHETKET = new Set([300, 2500, 3500, 6000, 25000]);
  for (const ms of [300, 2000, 2500, 3000, 3500, 4500, 6000, 25000]) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForFunction(
      ([t0, kohta]) => performance.now() - t0 >= kohta, [alkuhetki, ms], { timeout: 60000 },
    ).catch(() => {});
    // eslint-disable-next-line no-await-in-loop
    otokset.set(ms, await sivu.evaluate(LUE_TILA));
    if (KUVAKANSIO && KAAPPAUSHETKET.has(ms)) {
      // eslint-disable-next-line no-await-in-loop
      await sivu.screenshot({
        path: join(KUVAKANSIO, `etusivupallo-avaus-${ms}ms.png`), scale: 'css',
      });
    }
  }
  const a = otokset.get(300);
  const b = otokset.get(2000);
  const c = otokset.get(3500);
  const d = otokset.get(4500);
  vaadi('E11b pallo ja otsikko ovat ruudulla heti (0,3 s)',
    a.kerrosNakyy && a.videonPeitto === 1 && a.aika > 0 && a.nimiNakyy.length > 0,
    `kerros ${a.kerrosNakyy}, video ${a.videonPeitto}, aika ${a.aika}, otsikko "${a.nimiNakyy}"`);
  vaadi('E11c "osa II" on vielä piilossa eikä kirjoituskone ole alkanut (0,3 s)',
    a.osanPeitto < 0.1 && a.paikkarivi === 0 && a.runko === 0,
    `osa ${a.osanPeitto}, paikkarivi ${a.paikkarivi} merkkiä, runko ${a.runko}`);
  vaadi('E11d "osa II" tulee sekunnin myöhemmin kuin ennen (2,0 s piilossa → 3,5 s näkyvissä)',
    b.osanPeitto < 0.1 && c.osanPeitto > 0.9,
    `peittävyydet 0,3 s ${a.osanPeitto} → 2,0 s ${b.osanPeitto} → 3,5 s ${c.osanPeitto}`);
  /*
   * Kirjoituskone alkaa vasta häivytyksen jälkeen, siis 2,3 + 0,9 =
   * 3,2 s napautuksesta. Vertailuhetki on 2,5 s (alaotsikko on juuri
   * feidaamassa sisään): 3,0 s olisi vain 200 ms ennen ja heiluisi
   * kontin hitaiden kehysten mukana.
   */
  vaadi('E11e kirjoituskone alkaa vasta häivytyksen jälkeen (2,5 s → 4,5 s)',
    otokset.get(2500).paikkarivi === 0 && d.paikkarivi > 0,
    `paikkarivi 2,5 s: ${otokset.get(2500).paikkarivi} merkkiä, 4,5 s: ${d.paikkarivi} merkkiä`);
  /*
   * E11f OTSIKKO EI HYPPÄÄ. Juurisyy oli, että js/ui.js fitIntro ajettiin
   * vasta kirjoituskoneen alkaessa ja asetti julisteelle eri koon kuin
   * css:n lähtöarvo — otsikko kasvoi 19 % ja nousi 27 px juuri siinä
   * hetkessä (mitattu 1400 × 900). Vartio vertaa rivi riviltä.
   */
  const rivi = (tila, v) => tila.otsikonRivit.find((r) => r.v === v);
  const eroaa = (x, y) => Math.abs(x - y) > 0.6;
  const hypyt = [];
  for (const hetki of [2500, 3500, 6000, 25000]) {
    for (const r of a.otsikonRivit) {
      const nyt = rivi(otokset.get(hetki), r.v);
      if (!nyt) continue;
      // "osa II" feidaa sisään: peittävyys muuttuu, laatikko ei saa.
      if (nyt.koko !== r.koko || eroaa(nyt.x, r.x) || eroaa(nyt.y, r.y)
        || eroaa(nyt.w, r.w) || eroaa(nyt.h, r.h)) {
        hypyt.push(`${hetki}ms ${r.v}: ${r.koko} ${r.x},${r.y} ${r.w}×${r.h} → `
          + `${nyt.koko} ${nyt.x},${nyt.y} ${nyt.w}×${nyt.h}`);
      }
    }
  }
  vaadi('E11f julisteotsikko ei liiku eikä vaihda kokoa avauksen aikana',
    hypyt.length === 0, hypyt.join(' | '));
  tieto('otsikon rivit 0,3 s', a.otsikonRivit.map(
    (r) => `${r.v} ${r.koko} ${r.w}×${r.h}`,
  ).join(' | '));
  tieto('avauksen vaiheet', [...otokset].map(([ms, t]) => `${ms}ms osa ${t.osanPeitto.toFixed(2)} `
    + `rivi ${t.paikkarivi} kortteja ${t.kortteja}`).join(' | '));
  if (KUVAKANSIO) tieto('kaappaukset', `${KUVAKANSIO}/etusivupallo-avaus-*.png`);
  await ctx.close();
}

/* ===== E4k: KOKO KIERROS ILMAN KUVIA (omistaja 6.9.2026 klo 01.20) ===== */

/*
 * Omistaja sanatarkasti: *"Jätä isoisän kuvat pois etusivulta"*. Yllä
 * oleva E4a katsoo yhtä hetkeä; tämä katsoo KOKO KIERROKSEN yli, koska
 * kuvat tulivat ennen vasta laskeutumisilla — myöhäinen kortti olisi
 * juuri se, joka jäisi ensimmäisestä vartiosta huomaamatta. Savukkeen
 * koevideo on KOEVIDEON_KESTO sekuntia, joten muutama kierros mahtuu
 * odotusaikaan.
 */
if (koevideo) {
  const { ctx, sivu } = await avaaSivu({ lippu: true, ikkuna: { width: 1400, height: 900 } });
  await sivu.waitForFunction(() => Boolean(document.querySelector('.etusivupallo-video')),
    null, { timeout: 30000 }).catch(() => {});
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  const kierroksia = 2.5;
  const odotus = Math.round(KOEVIDEON_KESTO * kierroksia * 1000);
  const ilmestyi = await sivu.waitForFunction(
    () => Boolean(document.querySelector('.etusivupallo-kuva')),
    null, { timeout: odotus, polling: 200 },
  ).then(() => true).catch(() => false);
  const lopuksi = await sivu.evaluate(LUE_TILA);
  vaadi(`E4k kuvia ei tule ${kierroksia} kierroksen aikanakaan`,
    !ilmestyi && lopuksi.kortteja === 0 && lopuksi.pinoja === 0,
    `kortteja ${lopuksi.kortteja}, pinoja ${lopuksi.pinoja} (${(odotus / 1000).toFixed(0)} s)`);
  tieto('avausnäkymä ilman kuvia', `paneelin lapset: ${lopuksi.paneelinLapset.join(' | ')}`);
  await ctx.close();
}

/* ================= EI VERKKOA ================= */

{
  const { ctx, sivu } = await avaaSivu({ lippu: true, aineisto: false });
  await sivu.waitForTimeout(3000);
  const tila = await sivu.evaluate(LUE_TILA);
  /*
   * Ilman aineistoa kerrosta ei synny — eikä tasokarttaa herätetä
   * (aalto 1D): ylälohkoon jää pergamentti ja julisteotsikko, ei
   * koskaan tyhjää ruutua.
   */
  vaadi('E8 ilman aineistoa etusivu on pelkkää paperia eikä kartta herää',
    !tila.kerros && tila.kartanLapsia === 1 && tila.lepotila === true && tila.laudanOsia === 0,
    `lapsia ${tila.kartanLapsia}, lepotila ${tila.lepotila}, laudan osia ${tila.laudanOsia}`);
  await ctx.close();
}

await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
