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
 * päälle."*
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   E1  Kerros syntyy avauksen ylälohkoon (.intro-kartta) ja on
 *       TEKSTIN TAKANA: se on lohkon ensimmäinen lapsi, julisteotsikko
 *       tulee DOMissa sen jälkeen ja piirtyy siis päälle.
 *   E2  Kone liikkuu: koneen muunnos vaihtuu näytteiden välillä.
 *   E3  Punainen viiva pitenee: polun pituus kasvaa eikä kutistu.
 *   E4  Isoisän aikalaiskuva ilmestyy laskeutumisella KARTAN
 *       ULKOPUOLELLE: kortti ei leikkaa avaustekstin laatikkoa
 *       (.intro-palsta, #intro-text) eikä julisteotsikkoa, ja
 *       kuvateksti on sanasta sanaan js/isoisan-valokuvat.js:n lappu.
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
 *   E9  LÄHTÖKAUPUNGIN VALINTA PALLOLLA (aalto 3A): "Valitse
 *       aloituskaupunki" avaa pallolaudan valintatilaan — tasokartta
 *       PYSYY lepotilassa ja svg#board tyhjänä, valittavat kaupungit
 *       ovat pallon kohdemerkkejä (Lontoo ja Ateena ainoat nimet), ja
 *       kohdemerkin napautus käynnistää pelin. Aalto 1D jätti tähän
 *       kartan herätyksen; tämä vartio pitää huolen ettei se palaa.
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
  reitinPisteet, teeReitti,
} = await import(`${JUURI}js/etusivupallo.js`);
const { ISOISAN_VALOKUVAT } = await import(`${JUURI}js/isoisan-valokuvat.js`);
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
} = {}) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion,
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
  // Kortti asuu koko avausnäkymässä (.intro), ei pallolohkossa.
  const kuva = document.querySelector('.etusivupallo-kuva');
  const kartta = document.querySelector('.intro-kartta');
  return {
    kerros: Boolean(juuri),
    ekaLapsi: kartta?.firstElementChild?.className ?? null,
    otsikkoJalkeen: Boolean(juuri && kartta?.querySelector('.intro-juliste')
      && (juuri.compareDocumentPosition(kartta.querySelector('.intro-juliste'))
        & Node.DOCUMENT_POSITION_FOLLOWING)),
    videoita: juuri ? juuri.querySelectorAll('video').length : 0,
    julisteita: juuri ? juuri.querySelectorAll('img.etusivupallo-juliste').length : 0,
    pallollaLuokka: document.querySelector('.intro')?.classList.contains('intro-pallolla') ?? false,
    kartanLapsia: kartta ? kartta.children.length : 0,
    koneenMuunnos: kone?.getAttribute('transform') ?? null,
    viivanPituus: viiva?.getTotalLength ? Math.round(viiva.getTotalLength()) : 0,
    kuvaNakyy: Boolean(kuva?.classList.contains('nakyy')),
    kuvateksti: kuva?.querySelector('figcaption')?.textContent ?? '',
    kuvanLaatikko: kuva?.classList.contains('nakyy') ? laatikko(kuva) : null,
    pallonLaatikko: laatikko(juuri),
    palstaLaatikko: laatikko(document.querySelector('.intro-palsta')),
    tekstiLaatikko: laatikko(document.getElementById('intro-text')),
    otsikkoLaatikko: laatikko(document.querySelector('.intro-juliste')),
    aika: document.querySelector('.etusivupallo-video')?.currentTime ?? null,
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
    vaadi('E1b kerros on avauksen ylälohkon ensimmäinen lapsi (tekstin takana)',
      alku.ekaLapsi?.includes('etusivupallo') && alku.otsikkoJalkeen,
      `ensimmäinen lapsi "${alku.ekaLapsi}", otsikko jälkeen: ${alku.otsikkoJalkeen}`);
    vaadi('E1c video on kerroksessa ja soi', alku.videoita === 1 && alku.aika !== null,
      `videoita ${alku.videoita}, aika ${alku.aika}`);
    vaadi('E1d tasokarttaa ei alusteta etusivua varten (lepotila, svg#board tyhjä)',
      alku.lepotila === true && alku.laudanOsia === 0,
      `lepotila ${alku.lepotila}, laudan osia ${alku.laudanOsia}`);

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

    const kuvassa = await sivu.waitForFunction(
      () => document.querySelector('.etusivupallo-kuva.nakyy'), null, { timeout: 12000 },
    ).then(() => true).catch(() => false);
    const kuvatila = await sivu.evaluate(LUE_TILA);
    vaadi('E4a isoisän aikalaiskuva ilmestyy laskeutumisella', kuvassa && kuvatila.kuvaNakyy,
      'kuvakortti ei saanut .nakyy-luokkaa 12 s:ssa');
    const lappu = new Set(Object.values(ISOISAN_VALOKUVAT).map((k) => k.kuvateksti));
    vaadi('E4b kuvateksti on sanasta sanaan isoisän valokuvan lappu',
      lappu.has(kuvatila.kuvateksti), `"${kuvatila.kuvateksti}"`);
    vaadi('E4c kuva on kartan ulkopuolella eikä leikkaa avaustekstiä',
      Boolean(kuvatila.kuvanLaatikko)
      && !leikkaavat(kuvatila.kuvanLaatikko, kuvatila.palstaLaatikko)
      && !leikkaavat(kuvatila.kuvanLaatikko, kuvatila.tekstiLaatikko)
      && !leikkaavat(kuvatila.kuvanLaatikko, kuvatila.otsikkoLaatikko),
      `kuva ${JSON.stringify(kuvatila.kuvanLaatikko)}, palsta ${JSON.stringify(kuvatila.palstaLaatikko)}, `
      + `otsikko ${JSON.stringify(kuvatila.otsikkoLaatikko)}`);
    tieto('sumuverho kevennetty (.intro-pallolla)', kuvatila.pallollaLuokka);
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
      peitossa,
      piste: r ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) } : null,
    };
  });
  vaadi('E9a nappi avaa pallolaudan eikä herätä tasokarttaa',
    nappiNakyy && avautui && valinta.pallolauta && valinta.lepotila === true
    && valinta.laudanOsia === 0 && !valinta.etusivupallo,
    `pallolauta ${valinta.pallolauta}, lepotila ${valinta.lepotila}, laudan osia ${valinta.laudanOsia}`);
  vaadi('E9b valittavat ovat pallon kohdemerkkejä, nimiä vain Lontoo ja Ateena',
    valinta.kohteet.length === 1 && valinta.kohteet[0].startsWith('aloitus:')
    && valinta.nimet.join(',') === 'ateena,lontoo',
    `kohteet ${JSON.stringify(valinta.kohteet)}, nimet ${JSON.stringify(valinta.nimet)}`);
  vaadi('E9c kuplat eivät peitä valittavaa kaupunkia', !valinta.peitossa,
    `kohdemerkki ${JSON.stringify(valinta.piste)} jäi kuplapinon alle`);
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'etusivupallo-valinta.png'), scale: 'css' });
  }
  if (valinta.piste) await sivu.mouse.click(valinta.piste.x, valinta.piste.y);
  const alkoi = await sivu.waitForFunction(() => window.matkakirja.ui.game.phase !== 'pickstart',
    null, { timeout: 30000 }).then(() => true).catch(() => false);
  const jalkeen = await sivu.evaluate(() => ({
    vaihe: window.matkakirja.ui.game.phase,
    lepotila: window.matkakirja.ui.kartta.lepotila,
    laudanOsia: document.querySelector('svg#board')?.querySelectorAll('*').length ?? null,
  }));
  vaadi('E9d kohdemerkin napautus käynnistää pelin ilman tasokarttaa',
    alkoi && jalkeen.lepotila === true && jalkeen.laudanOsia === 0,
    `vaihe ${jalkeen.vaihe}, lepotila ${jalkeen.lepotila}, laudan osia ${jalkeen.laudanOsia}`);
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
