/*
 * Savuke: LENNON RAJAUS, PUNAINEN VIIVA JA PULU POIS (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 30).
 *
 * Omistajan havainnot 16.9.2026 pelin sisäisestä lennosta: *"lentomatkalla
 * punainen viiva ei piirry, kartta zoomaa suoraan kohdemaahan, pulu näkyy
 * lennon aikana."*
 *
 * MITATUT JUURISYYT (390 × 844, Ateena → Rooma, tämän savukkeen oma
 * mittaus 16.9.2026):
 *
 *   1. KAMERA ZOOMASI KOHDEMAAHAN. `game.actionFly` siirtää pelaajan
 *      kohdekaupunkiin JO ENNEN animaatiota, ja `ui.movingPlayerId`
 *      asetetaan vasta animatePawnissa. Siinä välissä `ui.run`in render
 *      osui js/pallolauta/lauta.js:n "KAMERA SEURAA TELEPORTTIA"
 *      -haaraan: kuljettajan rajausajo alkoi t = 21 ms ja `saavu()`
 *      ohitti sen t = 45 ms. Korjaus: haara ei laukea, kun
 *      `ui.lentoKaari` on päällä (= täsmälleen lennon ajan).
 *   2. RAJAUS EI MAHTUNUT RUUTUUN. Kapealla ruudulla kameran
 *      `korkeuteenSovitus` (PÄÄTÖKSET 17) sovittaa laatikon RUUDUN
 *      KORKEUTEEN ja antaa sen vuotaa sivuille — oikein maalle, tuhoisa
 *      matkalle: lennon laatikosta (375 × 154 lautayksikköä) näkyi 85
 *      yksikköä eli alle neljännes. Korjaus: `kokonaan: true` lennon
 *      rajauksessa, ja marginaali 0,35 → 0,158 (12 % ruudun mitasta).
 *   3. MAAN ULOSZOOMAUSKATTO PURISTI KUVAN TAKAISIN. `matkaZoomirajat`
 *      nollasi vain linssin syrjäytyksen, ei `maanLaatikko`n kattoa:
 *      rajausajo nousi 385 yksikköön ja `tahdistaZoomirajat` veti sen
 *      kesken lennon 205:een (kohdemaan katto).
 *   4. PUNAISTA VIIVAA EI PIIRRETTY LAINKAAN. `lauta.reitit.jalki` oli
 *      vain avauslennon kutsu; pelin oma lento ei koskenut siihen
 *      (mitattu: jäljen datumia ei ollut kerroksessa yhdelläkään
 *      lennon näytteellä).
 *   5. PULU JÄI RUUDULLE. Kelluva pulunappi katoaa body.flight-active
 *      -luokalla, mutta pallolaudan lento menee doFly:n kalvottomaan
 *      haaraan (pack `maailmankartta`), jossa luokkaa ei aseteta:
 *      napin laskettu peittävyys oli 1 kaikissa lennon näytteissä.
 *
 * VARTIOT:
 *   1. MOLEMMAT PÄÄT RUUDULLA. Lennon alussa lähtö- ja kohdekaupungin
 *      ruutupaikat ovat 5–20 % etäisyydellä ruudun reunasta.
 *   2. KAMERA EI LIIKU LENNON AIKANA. Keskipiste ja mittakaava pysyvät
 *      (poikkeama ≤ 2 % näkyvästä kaaresta).
 *   3. VIIVA KASVAA KONEEN PERÄÄN. Jäljen osuus kasvaa monotonisesti
 *      (vähintään kolme näytettä), alkaa nollasta ja päätyy ykköseen.
 *   4. PULU POISSA LENNON AJAN. Kelluvan napin ja paneelin laskettu
 *      peittävyys on 0 lennon näytteissä ja 1 laskeutumisen jälkeen.
 *   5. PERILLÄ KOHDEMAAN SAAPUMISNÄKYMÄ. Laskeutumisen jälkeen kamera
 *      on samassa näkymässä kuin `lauta.saavu({ kesto: 0 })` antaa.
 *   6. SAMA LEVEÄLLÄ RUUDULLA (1400 × 900).
 *
 * VASTAKOKEET (kaikki ajetaan ja kirjataan):
 *   A. ILMAN `kokonaan`-LIPPUA sama laatikko rajautuu korkeuteen ja
 *      lähtökaupunki jää ruudun ulkopuolelle — vartio 1 erottaa siis
 *      korjatun rajauksen vanhasta.
 *   B. SAAPUMISAJO KESKEN LENNON (`lauta.saavu()` käsin) siirtää
 *      kameran keskipistettä yli 2 % — vartio 2 mittaa kameran
 *      paikallaanoloa eikä sattumaa.
 *   C. RUNKOLUOKKA POIS (`lento-kesken` poistetaan kesken lennon) tuo
 *      pulun takaisin ruudulle — vartio 4 mittaa kytkintä.
 *
 * MIKSI VARTIO: kaikki viisi juurisyytä ovat yhden rivin kokoisia eikä
 * yksikään kaada mitään kadotessaan. Rajauslippu on yksi kenttä,
 * teleporttiehto yksi ehto, kattovapautus yksi `return null`, jälki yksi
 * kutsu ja pulun väistö yksi runkoluokka.
 *
 *   node tools/savukkeet/savuke-lento-rajaus.mjs [kansio] [--dpr N]
 *
 * Pallotila tarvitsee ämpärin (Globe.gl ja laatat) — se reititetään
 * selaimelle Noden fetchin kautta (NODE_USE_ENV_PROXY=1, malli
 * savuke-nappula-liike.mjs), ja peli aloitetaan tallenteesta Ateenassa:
 * siellä on lentokenttä ja lähin lentokohde on Rooma.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argit = process.argv.slice(2);
const dprArg = argit.indexOf('--dpr');
const DPR = dprArg >= 0 ? Number(argit[dprArg + 1]) : 1;
const vipujenArvot = new Set();
if (dprArg >= 0) vipujenArvot.add(dprArg + 1);
const ULOS = argit.find((a, i) => !a.startsWith('--') && !vipujenArvot.has(i))
  ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/* Ämpäri Noden kautta (malli savuke-liiku.mjs). */
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
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const TALLENNE = JSON.stringify(peli.toJSON());

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0; let kaikki = 0;
const rivit = [];
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  const tulos = ehto ? `OK    ${nimi}` : `FAIL  ${nimi} — ${lisa}`;
  if (ehto) lapi += 1;
  rivit.push(tulos);
  console.log(tulos);
};

/* Kaappaus pienennettynä selaimen kankaalla (raporttikuvan katto). */
const kaappaa = async (sivuOlio, nimi, skaala = 0.72) => {
  const png = (await sivuOlio.screenshot()).toString('base64');
  const pieni = await sivuOlio.evaluate(async ([data, k]) => {
    const kuva = new Image();
    await new Promise((ok, hup) => {
      kuva.onload = ok; kuva.onerror = hup; kuva.src = `data:image/png;base64,${data}`;
    });
    const kangas = document.createElement('canvas');
    kangas.width = Math.round(kuva.width * k);
    kangas.height = Math.round(kuva.height * k);
    kangas.getContext('2d').drawImage(kuva, 0, 0, kangas.width, kangas.height);
    return kangas.toDataURL('image/jpeg', 0.82).split(',')[1];
  }, [png, skaala]);
  writeFileSync(join(ULOS, nimi), Buffer.from(pieni, 'base64'));
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Avaa sivun annetulla ruudulla ja odottaa pallolaudan valmiiksi. */
async function avaaSivu(leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus },
    deviceScaleFactor: DPR,
    serviceWorkers: 'block',
    isMobile: leveys < 900,
    hasTouch: leveys < 900,
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(`${leveys}px: ${e.message}`));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app\//, async (route) => {
    const url = route.request().url();
    if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
    const vastaus = await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForTimeout(2500);
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'ateena' };
    g.world.visited.add('ateena');
    g.phase = 'action';
    g.player.money = 300;
    ui.render();
    await new Promise((r) => setTimeout(r, 1500));
  });
  return { ctx, sivu };
}

/*
 * ══════════════════════════════════════════════════════════════════
 * LENNON MITTAUS — NÄYTTEET SELAIMEN OMALTA KELLOLTA
 * ══════════════════════════════════════════════════════════════════
 *
 * Lento on oikea `ui.doFly`, ei käsin ajettu kuljettaja: juuri sen
 * ketjun (actionFly → render → animatePawn → laske) varrella kaikki
 * viisi juurisyytä istuivat. Näytteet kerätään sivun omassa
 * ajastimessa 60 ms välein, koska kontin ohjelmistopiirto pyörii
 * muutamassa kehyksessä sekunnissa eikä rAF antaisi riittävästi
 * näytteitä 2,8 sekunnin lennolta.
 */
const MITTARI = `
window.__aloitaLento = async (valinnat = {}) => {
  // Edellisen ajon tulos pois heti: kaappauksen odotus lukee tätä, ja
  // vanha \`valmis: true\` laukaisi kuvan ennen kuin lento oli alkanut.
  window.__lento = null;
  window.__jaadytetty = null;
  window.__jaadytysKaynnissa = false;
  if (valinnat.jaadyta) window.__valmisteleKello();
  const { ui, game: g } = window.matkakirja;
  const lauta = ui.pallolauta;
  const kam = ui.kamera();
  const pallo = lauta.pallo;
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  g.player.money = 300;
  ui.render();
  kam.pysaytaKameraAjo?.();
  await lauta.saavu({ kesto: 0 });
  await new Promise((r) => setTimeout(r, 1500));

  const kohdeId = g.airportDestinations()[0];
  const lahtoId = g.player.pos.city;
  const kotelo = document.querySelector('.pallo-kotelo');
  /** Kaupungin ruutupaikka osuutena kotelon leveydestä ja korkeudesta. */
  const ruutu = (id) => {
    const c = g.board.cityById.get(id);
    if (!c || !kotelo) return null;
    const d = lauta.siirtymat?.get(id);
    const a = lauta.asteet(d ? { x: c.x + d.dx, y: c.y + d.dy } : { x: c.x, y: c.y });
    const p = a ? pallo.getScreenCoords(a.lat, a.lon, 0) : null;
    if (!p) return null;
    return { x: p.x / kotelo.clientWidth, y: p.y / kotelo.clientHeight };
  };
  const peittavyys = (valitsin) => {
    const el = document.querySelector(valitsin);
    return el ? Number(getComputedStyle(el).opacity) : null;
  };
  const nayte = () => {
    const pov = pallo.pointOfView();
    const tila = kam.kameranTila?.() ?? null;
    const jalki = (pallo.pathsData?.() ?? []).find((d) => d.avain === 'avauslennon-jalki') ?? null;
    return {
      t: Math.round(performance.now()),
      kone: Boolean(document.querySelector('.pallolauta-kone')),
      lat: pov.lat, lng: pov.lng, alt: pov.altitude,
      leveys: tila ? tila.leveys : null,
      osuus: jalki ? jalki.viiva : null,
      pisteita: jalki ? jalki.pisteet.length : 0,
      paksuus: jalki ? jalki.paksuus : null,
      nappi: peittavyys('.pollo-nappi'),
      paneeli: peittavyys('.pollo-paneeli'),
      hahmo: (() => {
        const el = document.querySelector('.livia-kasvot-pinta');
        return el ? getComputedStyle(el).visibility : null;
      })(),
      luokka: document.body.classList.contains('lento-kesken'),
      pA: ruutu(lahtoId), pB: ruutu(kohdeId),
    };
  };

  /*
   * JÄLJEN KIRJANPITO KERROKSEN RAJAPINNASTA, EI NÄYTTEISTÄ. Kone
   * kutsuu \`lauta.reitit.jalki\`a joka kehyksellä (js/pallolauta/siirto.js
   * piirraKone), joten kääre näkee jokaisen osuuden — myös sen viimeisen,
   * jonka \`laske()\` piirtää juuri ennen viivan poistoa. Ajastinnäytteet
   * eivät sitä näe: ohjelmistopiirto vie pääsäikeen sekunniksi kerrallaan
   * ja viimeinen näyte jäi mittauksesta riippuen 0,76:een tai 1,00:aan.
   */
  const jaadytaKuvaan = Boolean(valinnat.jaadyta);
  const jalkiAlkuperainen = lauta.reitit.jalki;
  const jaljet = [];
  lauta.reitit.jalki = (pisteet, valinnat = {}) => {
    jaljet.push({
      t: Math.round(performance.now()),
      osuus: pisteet ? (valinnat.osuus ?? 1) : null,
      paksuus: pisteet ? (valinnat.paksuus ?? null) : null,
      pisteita: pisteet ? pisteet.length : 0,
    });
    /*
     * JÄÄDYTYS LAUKEAA TÄSTÄ, EI NÄYTTEISTÄ. Ensimmäinen jälkipiirto on
     * täsmälleen lennon alku (osuus 0), kun taas ajastinnäytteitä tulee
     * hitaassa piirrossa niin harvakseltaan, että ensimmäinen niistä oli
     * jo osuudella 0,98 — kuva olisi lennon lopusta eikä puolivälistä.
     */
    if (jaadytaKuvaan && pisteet && !window.__jaadytysKaynnissa) {
      window.__jaadytysKaynnissa = true;
      void window.__jaadyta(0.5).then((v) => { window.__jaadytetty = v ?? -1; });
    }
    return jalkiAlkuperainen(pisteet, valinnat);
  };

  window.__lento = { lahtoId, kohdeId, naytteet: [nayte()], jaljet, valmis: false };
  /*
   * NÄYTTEET SEKÄ AJASTIMESTA ETTÄ KEHYKSISTÄ. Leveällä ruudulla
   * (1400 × 900) ohjelmistopiirto vie pääsäikeen sekunniksi kerrallaan
   * ja pelkkä setInterval sai koko 2,8 sekunnin lennolta yhden näytteen.
   * requestAnimationFrame ajetaan samassa tahdissa kuin lennon oma
   * silmukka, joten se osuu myös niihin hetkiin; vähintään 25 ms:n
   * väli pitää huolen, ettei sama hetki kirjaudu kahdesti.
   */
  let edellinen = 0;
  const kerraa = () => {
    const nyt = performance.now();
    if (nyt - edellinen < 25) return null;
    edellinen = nyt;
    const n = nayte();
    window.__lento.naytteet.push(n);
    // VASTAKOE B: saapumisajo käsin kesken lennon.
    if (valinnat.saavuKesken && n.kone && n.osuus !== null && !window.__lento.saavuAjettu) {
      window.__lento.saavuAjettu = true;
      void lauta.saavu({ kesto: 600 });
    }
    // VASTAKOE C: runkoluokka pois kesken lennon.
    if (valinnat.luokkaPois && n.kone) document.body.classList.remove('lento-kesken');
    /*
     * RAPORTTIKUVAN JÄÄDYTYS LAUKAISTAAN SIVULTA, EI NODESTA: yksi
     * edestakainen CDP-kutsu maksaa tässä kontissa enemmän kuin koko
     * 2,8 sekunnin lento kestää, ja Nodesta ohjattu jäädytys ehti aina
     * myöhässä (mitattu: osuus oli jo null).
     */
    return n;
  };
  const kello = setInterval(kerraa, 40);
  let kehys = requestAnimationFrame(function askel() {
    kerraa();
    kehys = requestAnimationFrame(askel);
  });

  ui.doFly(kohdeId);
  // Odotetaan kone laudalle ja pois; sitten kamera paikalleen.
  const alku = performance.now();
  let nahtiin = false;
  for (;;) {
    const laudalla = Boolean(document.querySelector('.pallolauta-kone'));
    if (laudalla) nahtiin = true;
    if (nahtiin && !laudalla) break;
    if (performance.now() - alku > 25000) break;
    await new Promise((r) => setTimeout(r, 40));
  }
  for (let i = 0; i < 160; i += 1) {
    if (!kam.kameraAjossa()) break;
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 800));
  clearInterval(kello);
  cancelAnimationFrame(kehys);
  const perilla = nayte();
  /*
   * PERILLÄ = KOHDEMAAN SAAPUMISNÄKYMÄ. Väite mitataan itse
   * rajausfunktiosta: ajetaan sama saapumisajo kerran lisää
   * nollakestolla ja katsotaan, oliko kamera jo siinä.
   */
  await lauta.saavu({ kesto: 0 });
  await new Promise((r) => setTimeout(r, 600));
  const saapuminen = nayte();
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  lauta.reitit.jalki = jalkiAlkuperainen;
  window.__lento.valmis = true;
  window.__lento.perilla = perilla;
  window.__lento.saapuminen = saapuminen;
  return window.__lento;
};

/*
 * ══════════════════════════════════════════════════════════════════
 * RAPORTTIKUVA: LENTO JÄÄDYTETÄÄN PUOLIVÄLIIN
 * ══════════════════════════════════════════════════════════════════
 *
 * Playwrightin kuvankaappaus kestää tässä kontissa 16–18 sekuntia
 * (mitattu), eli lento ehtii päättyä monta kertaa sen aikana: kaksi
 * peräkkäistä yritystä osui Rooman saapumiskorttiin. Sama temppu kuin
 * savuke-nappula-liike.mjs:n mittauksessa: kuljettaja lukee paikkansa
 * rAF:n aikaleimasta, joten mittaus antaa kellon. Kello pysäytetään
 * siihen kohtaan, jossa jälki on noin puolivälissä, kuva otetaan
 * rauhassa, ja sitten kello vapautetaan ja lento jatkuu loppuun.
 *
 * Kohta haarukoidaan eikä arvata: koneen vaihekäyrä ei ole lineaarinen,
 * eikä lennon kestoa ole viety moduulista ulos.
 */
/*
 * KELLO OTETAAN HALTUUN JO ENNEN LENTOA, VAIKKA SE VASTA SEURAA
 * OIKEAA AIKAA. Jos kello vaihdetaan vasta lennon alettua, yksi jo
 * jonossa oleva rAF-kutsu ehtii vielä OIKEALLA aikaleimalla — ja kun
 * sivu on ollut pystyssä kymmenen minuuttia ja piirtää sekunnin
 * välein, se yksi kehys vei lennon suoraan loppuun (mitattu: jäljen
 * toinen arvo oli 0,11 nopeassa ajossa ja 1,00 hitaassa). Kun kääre on
 * paikallaan alusta asti, jonossa ei ole yhtään vanhaa kutsua.
 */
window.__valmisteleKello = () => {
  const rafAlku = window.requestAnimationFrame.bind(window);
  const nytAlku = performance.now.bind(performance);
  const tila = { kello: nytAlku(), seuraa: true, rafAlku, nytAlku };
  window.requestAnimationFrame = (cb) => rafAlku(() => {
    if (tila.seuraa) tila.kello = nytAlku();
    cb(tila.kello);
  });
  performance.now = () => (tila.seuraa ? nytAlku() : tila.kello);
  window.__sulata = () => {
    window.requestAnimationFrame = rafAlku;
    performance.now = nytAlku;
  };
  window.__kello = tila;
};

window.__jaadyta = async (tavoite = 0.5) => {
  const lauta = window.matkakirja.ui.pallolauta;
  const tila = window.__kello;
  if (!tila) return null;
  const { rafAlku } = tila;
  const osuus = () => {
    const j = window.__lento?.jaljet ?? [];
    const v = j[j.length - 1];
    return v ? v.osuus : null;
  };
  const kehys = () => new Promise((r) => rafAlku(() => r()));
  tila.seuraa = false;
  let kello = tila.kello;
  const aseta = (arvo) => { kello = arvo; tila.kello = arvo; };
  /*
   * KELLOA SIIRRETÄÄN VAIN ETEENPÄIN PIENIN ASKELIN — EI HAARUKOIDEN.
   * Lennon päättyminen on peruuttamaton: jos kello loikkaa kaaren yli,
   * kuljettaja ratkaisee lupauksen, laske() poistaa viivan eikä
   * takaisin pääse. Ensimmäinen haarukointi teki juuri sen (askel 4000
   * ms > lennon 2800 ms), ja kuva osui saapumiskorttiin.
   */
  const perus = kello;
  let d = 0;
  /*
   * KATTO ON KOVA. Lukema luetaan viivakerroksen kutsuista, ja hitaassa
   * ohjelmistopiirrossa se voi laahata monta kehystä — silloin pelkkä
   * "osuus ≥ tavoite" ei pysäytä siirtoa ajoissa (mitattu: 1,00 ja
   * kerran lento kokonaan ohi). Kello ei siksi missään tilanteessa
   * siirry yli 1500 ms:n lennon alusta; tavallinen lento on 2800 ms
   * (js/ui.js MANNER_LENTO_MS), joten katto on aina kaaren puolivälin
   * tienoilla eikä koskaan sen yli.
   */
  const KATTO_MS = 1500;
  while (d < KATTO_MS) {
    const v = osuus();
    if (v === null || v >= tavoite) break;
    d = Math.min(KATTO_MS, d + 250);
    aseta(perus + d);
    lauta.heraa?.();
    await kehys();
  }
  return osuus();
};

/*
 * VASTAKOE A: sama laatikko ilman \`kokonaan\`-lippua. Kohde lasketaan
 * kameran omalla funktiolla ja päät projisoidaan siihen näkymään —
 * pallo itse ei liiku, joten vastakoe ei sotke mitattua lentoa.
 */
window.__rajausVertailu = async () => {
  const { ui, game: g } = window.matkakirja;
  const { lennonRajaus, LENNON_RAJAUKSEN_MARGINAALI } = await import('./js/pallolauta/siirto.js');
  const lauta = ui.pallolauta;
  const kam = ui.kamera();
  const pallo = lauta.pallo;
  const kotelo = document.querySelector('.pallo-kotelo');
  const a = { type: 'city', city: window.__lento.lahtoId };
  const b = { type: 'city', city: window.__lento.kohdeId };
  const bbox = lennonRajaus(g.board, a, b);
  const ennenPov = pallo.pointOfView();
  /*
   * MAAN ULOSZOOMAUSKATTO POIS VERTAILUN AJAKSI. Lennolla katto on pois
   * (matkaZoomirajat), joten vertailun on oltava samassa tilassa —
   * muuten kumpikin rajaus puristuisi kohdemaan kattoon eikä vastakoe
   * mittaisi rajausta vaan kattoa.
   */
  ui.matkaZoomivapaus(true);
  const mittaa = async (kokonaan) => {
    const kohde = kam.kameranKohde({ bbox, marginaali: LENNON_RAJAUKSEN_MARGINAALI, kokonaan });
    pallo.pointOfView(kohde, 0);
    /*
     * PROJEKTIO PÄIVITTYY VASTA PIIRROSSA. Globe.gl siirtää kameransa
     * omassa renderissään, joten getScreenCoords antaa vanhan kuvan
     * kunnes kangas on piirretty — ja lepotilassa (lauta.heraa) piirtoa
     * ei tule lainkaan. Odotetaan siis oikeita kehyksiä, ei kelloa.
     */
    lauta.heraa?.();
    for (let i = 0; i < 12; i += 1) {
      await new Promise((r) => requestAnimationFrame(() => r()));
    }
    await new Promise((r) => setTimeout(r, 300));
    const paikka = (pos) => {
      const c = g.board.cityById.get(pos.city);
      const d = lauta.siirtymat?.get(pos.city);
      const ast = lauta.asteet(d ? { x: c.x + d.dx, y: c.y + d.dy } : { x: c.x, y: c.y });
      const p = ast ? pallo.getScreenCoords(ast.lat, ast.lon, 0) : null;
      return p ? { x: p.x / kotelo.clientWidth, y: p.y / kotelo.clientHeight } : null;
    };
    return { kohde, pA: paikka(a), pB: paikka(b) };
  };
  const kanssa = await mittaa(true);
  const ilman = await mittaa(false);
  pallo.pointOfView(ennenPov, 0);
  ui.matkaZoomivapaus(false);
  await new Promise((r) => setTimeout(r, 120));
  return { bbox, kanssa, ilman };
};
`;

/** Mihin kohtaan lentoa kukin raporttikuva osui (kuvan nimi → osuus). */
const kuvienKohdat = new Map();

/**
 * Yksi mitattu lento. KAAPPAUS ON OMA AJONSA (`kuva`), koska
 * Playwrightin kuvankaappaus pysäyttää sivun sekunniksi: mitatulla
 * lennolla se söi juuri ne näytteet, joita vartiot lukevat (1400 px:llä
 * lennosta jäi kaksi näytettä koko 2,8 sekunnin matkalta). Mittaus ja
 * kuva ajetaan siis peräkkäin samassa selaimessa.
 */
async function ajaLento(sivu, { kuva = null, valinnat = {} } = {}) {
  await sivu.evaluate(MITTARI);
  const lupaus = sivu.evaluate((v) => window.__aloitaLento(v), valinnat);
  if (kuva) {
    /*
     * KAAPPAUS LAUKAISTAAN KONEEN ILMESTYMISESTÄ, EI VIIVAN PUOLIVÄLISTÄ.
     * Playwrightin kuvankaappaus sarjallistaa koko sivun ja vie tässä
     * kontissa 1–2 sekuntia; kun laukaisin oli "osuus > 0,25", kuva
     * valmistui vasta laskeutumisen jälkeen (mitattu: kaksi ajoa
     * peräkkäin Rooman saapumiskortti ruudulla). Kone ilmestyy laudalle
     * kamera-ajon alussa eli noin sekunnin ennen lähtöä, joten
     * laukaisusta kuvaan kuluva aika osuu lennon puoliväliin.
     */
    await sivu.waitForFunction(
      () => Boolean(window.__lento) && Boolean(document.querySelector('.pallolauta-kone')),
      null,
      { timeout: 40000, polling: 30 },
    ).catch(() => {});
    /*
     * SUORA JPEG ILMAN SIVUN OMAA PIENENNYSTÄ. Muiden savukkeiden
     * `kaappaa` lähettää png:n sivulle, piirtää sen kankaalle ja lukee
     * takaisin — se on tässä kontissa useita sekunteja, ja lento kerkesi
     * päättyä ennen kuin kuva valmistui (kaksi ajoa peräkkäin osui
     * Rooman saapumiskorttiin). Playwright pienentää ja pakkaa itse.
     */
    // Sivu jäädyttää lennon puoliväliin itse; tässä vain odotetaan.
    /*
     * ODOTUS ON PITKÄ TARKOITUKSELLA: jäädytys etenee kehys kerrallaan,
     * ja hidas ohjelmistopiirto voi antaa vain kolmanneksen kehyksestä
     * sekunnissa. 60 sekunnin katto jäi kerran kiinni juuri tähän, ja
     * kuva otettiin vasta laskeutumisen jälkeen.
     */
    await sivu.waitForFunction(() => window.__jaadytetty !== null, null,
      { timeout: 180000, polling: 100 }).catch(() => {});
    const osuus = await sivu.evaluate(() => window.__jaadytetty);
    const kello = Date.now();
    writeFileSync(join(ULOS, kuva), await sivu.screenshot({ type: 'jpeg', quality: 78 }));
    kuvienKohdat.set(kuva, { osuus, ms: Date.now() - kello });
    await sivu.evaluate(() => window.__sulata?.());
  }
  return lupaus;
}

/*
 * LENNON NÄYTTEET = NE, JOISSA JÄLKI ON OLEMASSA. Kone luodaan jo ennen
 * lentoa (`nosta` + `aseta`), ja se seisoo lähtökaupungin yllä sen ajan,
 * kun kamera ajaa rajaukseen — pelkkä koneen olemassaolo ei siis ole
 * "lennon aika". Jälkidatumi syntyy täsmälleen silloin, kun kone lähtee
 * (js/pallolauta/siirto.js `lahde`), joten se on oikea portti.
 */
const lennonNaytteet = (naytteet) => naytteet.filter((n) => n.kone && n.osuus !== null);

/** Vaakaetäisyys reunasta: Ateena → Rooma on pääosin vaakasuuntainen. */
const vaakaEtaisyys = (p) => (p ? Math.min(p.x, 1 - p.x) : null);

/**
 * PÄÄAKSELI RATKAISEE MARGINAALIN. Rajaus sovittaa laatikon siihen
 * suuntaan, jossa matka on pidempi RUUDULLA; toisessa suunnassa
 * marginaali on väistämättä suurempi (kuvasuhde). Vartio mittaa siis
 * 5–20 %:n marginaalin pääakselilta ja vaatii toiselta vain, että piste
 * on ruudulla.
 */
const paidenMitat = (pA, pB) => {
  if (!pA || !pB) return null;
  const pysty = Math.abs(pB.y - pA.y) > Math.abs(pB.x - pA.x);
  const akseli = (p) => (pysty ? Math.min(p.y, 1 - p.y) : Math.min(p.x, 1 - p.x));
  const sivu = (p) => (pysty ? Math.min(p.x, 1 - p.x) : Math.min(p.y, 1 - p.y));
  return {
    pysty,
    lahto: { akseli: akseli(pA), sivu: sivu(pA) },
    kohde: { akseli: akseli(pB), sivu: sivu(pB) },
  };
};

/*
 * PÄÄT MITATAAN LENNON VIIMEISESTÄ NÄYTTEESTÄ. Kamera seisoo koko
 * lennon (vartio 2 mittaa juuri sen), joten mikä tahansa lennon näyte
 * kertoo saman rajauksen — mutta ENSIMMÄINEN ei: Globe.gl:n
 * `getScreenCoords` lukee sen kameran, joka on viimeksi PIIRRETTY, ja
 * kontin ohjelmistopiirto laahaa yhden kehyksen verran juuri
 * rajausajon jäljiltä (mitattu 16.9.2026: ensimmäinen näyte 104 %,
 * seuraavat 88 % vakaasti).
 */
const rajausNayte = (naytteet) => {
  const lento = lennonNaytteet(naytteet);
  return lento.length ? lento[lento.length - 1] : null;
};

/** Vartio 1 yhdellä ruudulla. */
const vartioPaat = (leveys, alku) => {
  const mitat = paidenMitat(alku?.pA, alku?.pB);
  vaadi(`${leveys}: lennon aikana molemmat päät ovat ruudulla`,
    Boolean(mitat) && mitat.lahto.sivu > 0.02 && mitat.kohde.sivu > 0.02,
    JSON.stringify({ pA: alku?.pA, pB: alku?.pB }));
  for (const nimi of ['lahto', 'kohde']) {
    const e = mitat?.[nimi]?.akseli ?? null;
    vaadi(`${leveys}: ${nimi === 'lahto' ? 'lähtö' : 'kohde'} on 5–20 % reunasta `
      + `(${mitat?.pysty ? 'pystyakseli' : 'vaaka-akseli'})`,
      e !== null && e >= 0.05 && e <= 0.20,
      `etäisyys ${e === null ? 'ei paikkaa' : `${(e * 100).toFixed(1)} %`}`);
  }
  return mitat;
};

/**
 * Kameran keskipisteen ja mittakaavan suurin poikkeama lennon aikana,
 * osuutena näkyvästä kaaresta. Näkyvä kaari luetaan kameran omasta
 * tilasta (leveys lautayksikköinä → asteita), jotta luku on sama mitta
 * kuin ruudun leveys.
 */
const kameranHorjunta = (naytteet) => {
  const lento = lennonNaytteet(naytteet);
  if (lento.length < 2) return null;
  const a = lento[0];
  const leveysAst = ((a.leveys ?? 1) * 360) / 12000;
  let suurin = 0;
  let zoom = 0;
  for (const n of lento) {
    const dLat = n.lat - a.lat;
    const dLng = (n.lng - a.lng) * Math.cos((a.lat * Math.PI) / 180);
    suurin = Math.max(suurin, Math.hypot(dLat, dLng) / Math.max(1e-6, leveysAst));
    zoom = Math.max(zoom, Math.abs(n.alt - a.alt) / Math.max(1e-6, a.alt));
  }
  return { keskipiste: suurin, zoom, naytteita: lento.length };
};

/*
 * PULU MITATAAN HÄIVYTYKSEN JÄLKEEN. Väistö on sama 0,3 sekunnin
 * css-siirtymä kuin kalvolennolla (css/styles.css body.flight-active
 * .pollo-nappi), ja jos nappi syntyy uudestaan lennon alussa, siirtymä
 * voi vielä olla kesken ensimmäisellä näytteellä (mitattu 1400 × 900:
 * 1 → 0 → 0). Vartio vaatii siis piilon kaikilta näytteiltä, jotka ovat
 * vähintään häivytyksen mitan päässä lennon alusta — ja runkoluokan
 * heti ensimmäisestä.
 */
const HAIVYTYS_MS = 300;
const puluNaytteet = (naytteet) => {
  const lento = lennonNaytteet(naytteet);
  if (!lento.length) return [];
  const alku = lento[0].t;
  return lento.filter((n) => n.t - alku >= HAIVYTYS_MS);
};

/* ================= 390 px ========================================= */

const { ctx: ctx390, sivu } = await avaaSivu(390, 844);
const lento390 = await ajaLento(sivu);
const lentoNaytteet = lennonNaytteet(lento390.naytteet);

vaadi('390: lento alkoi ja kone oli laudalla', lentoNaytteet.length >= 3,
  `koneellisia näytteitä ${lentoNaytteet.length}`);

/* ---- 1. molemmat päät ruudulla 5–20 % reunasta -------------------- */

const alku390 = rajausNayte(lento390.naytteet);
const mitat390 = vartioPaat('390', alku390);

/* ---- 2. kamera ei liiku lennon aikana ----------------------------- */

const horjunta390 = kameranHorjunta(lento390.naytteet);
vaadi('390: kameran keskipiste ei siirry lennon aikana yli 2 %',
  Boolean(horjunta390) && horjunta390.keskipiste <= 0.02,
  JSON.stringify(horjunta390));
vaadi('390: kameran mittakaava ei muutu lennon aikana yli 2 %',
  Boolean(horjunta390) && horjunta390.zoom <= 0.02, JSON.stringify(horjunta390));

/* ---- 3. viiva kasvaa koneen perään -------------------------------- */

const osuudet390 = lento390.jaljet.filter((j) => j.osuus !== null).map((j) => j.osuus);
const monotoninen = osuudet390.every((v, i) => i === 0 || v >= osuudet390[i - 1] - 1e-9);
vaadi('390: jäljen näytteitä on vähintään kolme', osuudet390.length >= 3,
  `näytteitä ${osuudet390.length}`);
vaadi('390: jäljen osuus kasvaa monotonisesti', monotoninen, JSON.stringify(osuudet390));
/*
 * "EI VALMIINA ALUSSA" MITATAAN KAHDESTA SUUNNASTA: ennen lennon alkua
 * jälkidatumia ei ole kerroksessa LAINKAAN (kone seisoo lähtökaupungin
 * yllä kamera-ajon ajan), ja lennon näytteissä osuus kasvaa nollasta
 * täyteen. Ensimmäisen näytteen katto on väljä (0,4), koska
 * ohjelmistopiirto voi viedä sekunnin lennon 2,8 sekunnista — se on
 * mittauksen tiheys, ei viivan käytös.
 */
vaadi('390: ennen lentoa kerroksessa ei ole jälkeä lainkaan',
  lento390.naytteet.filter((n) => n.t < (lentoNaytteet[0]?.t ?? 0)).every((n) => n.osuus === null),
  JSON.stringify(lento390.naytteet.map((n) => n.osuus)));
vaadi('390: jälki alkaa nollasta ja päätyy täyteen',
  osuudet390.length >= 3 && osuudet390[0] === 0
    && osuudet390[osuudet390.length - 1] === 1,
  JSON.stringify([osuudet390[0], osuudet390[osuudet390.length - 1]]));
vaadi('390: jälki poistetaan kerrokselta laskeutumisessa',
  lento390.jaljet.length > 3 && lento390.jaljet[lento390.jaljet.length - 1].osuus === null,
  JSON.stringify(lento390.jaljet.slice(-2)));
const jalkiPiirrot = lento390.jaljet.filter((j) => j.osuus !== null);
vaadi('390: jälki on paksu punainen viiva koko kaaren pisteillä',
  jalkiPiirrot.every((j) => j.pisteita > 16 && j.paksuus >= 8),
  JSON.stringify(jalkiPiirrot[0] ?? null));

/* ---- 4. pulu poissa lennon ajan ----------------------------------- */

const pulu390 = puluNaytteet(lento390.naytteet);
vaadi('390: kelluva pulunappi on piilossa koko lennon',
  pulu390.length >= 1 && pulu390.every((n) => n.nappi <= 0.02),
  JSON.stringify(lentoNaytteet.map((n) => n.nappi)));
vaadi('390: pulun paneeli on piilossa koko lennon',
  lentoNaytteet.every((n) => n.paneeli === null || n.paneeli === 0),
  JSON.stringify(lentoNaytteet.map((n) => n.paneeli)));
vaadi('390: runkoluokka lento-kesken on päällä lennon ajan ja poissa perillä',
  lentoNaytteet.every((n) => n.luokka === true) && lento390.perilla.luokka === false,
  JSON.stringify({ lento: lentoNaytteet.map((n) => n.luokka), perilla: lento390.perilla.luokka }));
vaadi('390: pulun hahmo on piilossa koko lennon',
  pulu390.length >= 1 && pulu390.every((n) => n.hahmo === null || n.hahmo === 'hidden'),
  JSON.stringify(lentoNaytteet.map((n) => n.hahmo)));
vaadi('390: pulu palaa näkyviin laskeutumisen jälkeen',
  lento390.perilla.nappi === 1
    && (lento390.perilla.hahmo === null || lento390.perilla.hahmo === 'visible'),
  JSON.stringify({ nappi: lento390.perilla.nappi, hahmo: lento390.perilla.hahmo }));

/* ---- 5. perillä kohdemaan saapumisnäkymä -------------------------- */

const ero390 = Math.abs(lento390.perilla.leveys - lento390.saapuminen.leveys)
  / Math.max(1, lento390.saapuminen.leveys);
vaadi('390: laskeutumisen jälkeen kamera on kohdemaan saapumisnäkymässä',
  ero390 < 0.12
    && Math.abs(lento390.perilla.lat - lento390.saapuminen.lat) < 1.5
    && Math.abs(lento390.perilla.lng - lento390.saapuminen.lng) < 1.5,
  JSON.stringify({ perilla: lento390.perilla, saapuminen: lento390.saapuminen }));

/* ---- VASTAKOE A: ilman kokonaan-lippua rajaus ei mahdu ------------ */

const vertailu = await sivu.evaluate(() => window.__rajausVertailu());
const vastakoeA = vaakaEtaisyys(vertailu.ilman.pA);
vaadi('VASTAKOE A: ilman kokonaan-lippua lähtökaupunki EI ole 5–20 % reunasta',
  !(vastakoeA !== null && vastakoeA >= 0.05 && vastakoeA <= 0.20),
  `etäisyys ${vastakoeA === null ? 'ei paikkaa' : `${(vastakoeA * 100).toFixed(1)} %`}`);
vaadi('VASTAKOE A: kokonaan-lipulla sama laatikko mahtuu',
  (() => { const e = vaakaEtaisyys(vertailu.kanssa.pA); return e !== null && e >= 0.05 && e <= 0.20; })(),
  JSON.stringify(vertailu.kanssa));

/* ---- VASTAKOE B: saapumisajo kesken lennon liikuttaa kameraa ------ */

const lentoB = await ajaLento(sivu, { valinnat: { saavuKesken: true } });
const horjuntaB = kameranHorjunta(lentoB.naytteet);
vaadi('VASTAKOE B: käsin ajettu saapumisajo siirtää keskipistettä yli 2 %',
  Boolean(horjuntaB) && horjuntaB.keskipiste > 0.02, JSON.stringify(horjuntaB));

/* ---- VASTAKOE C: runkoluokka pois tuo pulun takaisin -------------- */

const lentoC = await ajaLento(sivu, { valinnat: { luokkaPois: true } });
const lentoCNaytteet = lennonNaytteet(lentoC.naytteet);
vaadi('VASTAKOE C: ilman runkoluokkaa pulu näkyy lennon aikana',
  lentoCNaytteet.some((n) => n.nappi === 1),
  JSON.stringify(lentoCNaytteet.map((n) => n.nappi)));

/* ================= 1400 px ======================================== */

const { ctx: ctx1400, sivu: sivu1400 } = await avaaSivu(1400, 900);
const lento1400 = await ajaLento(sivu1400);
const naytteet1400 = lennonNaytteet(lento1400.naytteet);

vaadi('1400: lento alkoi ja kone oli laudalla', naytteet1400.length >= 2,
  `koneellisia näytteitä ${naytteet1400.length}`);
const alku1400 = rajausNayte(lento1400.naytteet);
const mitat1400 = vartioPaat('1400', alku1400);
const horjunta1400 = kameranHorjunta(lento1400.naytteet);
vaadi('1400: kameran keskipiste ei siirry lennon aikana yli 2 %',
  Boolean(horjunta1400) && horjunta1400.keskipiste <= 0.02, JSON.stringify(horjunta1400));
const osuudet1400 = lento1400.jaljet.filter((j) => j.osuus !== null).map((j) => j.osuus);
vaadi('1400: jäljen osuus kasvaa monotonisesti nollasta täyteen',
  osuudet1400.length >= 3 && osuudet1400[0] === 0
    && osuudet1400[osuudet1400.length - 1] === 1
    && osuudet1400.every((v, i) => i === 0 || v >= osuudet1400[i - 1] - 1e-9),
  JSON.stringify(osuudet1400));
const pulu1400 = puluNaytteet(lento1400.naytteet);
vaadi('1400: pulu on piilossa lennon ajan ja palaa perillä',
  pulu1400.length >= 1 && pulu1400.every((n) => n.nappi <= 0.02)
    && lento1400.perilla.nappi === 1,
  JSON.stringify({ lento: naytteet1400.map((n) => n.nappi), perilla: lento1400.perilla.nappi }));
vaadi('1400: pulun hahmo on piilossa lennon ajan ja palaa perillä',
  pulu1400.length >= 1 && pulu1400.every((n) => n.hahmo === null || n.hahmo === 'hidden')
    && (lento1400.perilla.hahmo === null || lento1400.perilla.hahmo === 'visible'),
  JSON.stringify({ lento: naytteet1400.map((n) => n.hahmo), perilla: lento1400.perilla.hahmo }));
vaadi('1400: runkoluokka lento-kesken on päällä koko lennon',
  naytteet1400.every((n) => n.luokka === true),
  JSON.stringify(naytteet1400.map((n) => n.luokka)));

/* ---- raporttikuvat omina ajoinaan --------------------------------- */

/*
 * KUVAT AJETAAN TUOREISSA VÄLILEHDISSÄ. Mitatut lennot ja vastakokeet
 * jättävät sivun raskaaksi (kolme lentoa, kolme laattalatausta), ja
 * jäädytys etenee kehys kerrallaan — vanhalla välilehdellä se kesti yli
 * minuutin ja kuva myöhästyi lennosta. Tuore konteksti maksaa yhden
 * latauksen ja tekee kuvasta toistettavan.
 */
const { ctx: ctxKuva390, sivu: kuvaSivu390 } = await avaaSivu(390, 844);
await ajaLento(kuvaSivu390, {
  kuva: 'lento-rajaus-390-20260916.jpg', valinnat: { jaadyta: true },
});
kuvienKohdat.set('lento-rajaus-390-20260916.jpg', {
  ...kuvienKohdat.get('lento-rajaus-390-20260916.jpg'),
});
await ctxKuva390.close();
const { ctx: ctxKuva1400, sivu: kuvaSivu1400 } = await avaaSivu(1400, 900);
await ajaLento(kuvaSivu1400, {
  kuva: 'lento-rajaus-1400-20260916.jpg', valinnat: { jaadyta: true },
});
await ctxKuva1400.close();

/* ---- yhteenveto --------------------------------------------------- */

const taulu = [];
const paikka = (p) => (p ? `${(p.x * 100).toFixed(1)} / ${(p.y * 100).toFixed(1)} %` : 'ei paikkaa');
taulu.push(`390 px: ${lento390.lahtoId} → ${lento390.kohdeId}, koneellisia näytteitä `
  + `${lentoNaytteet.length}`);
taulu.push(`390 px: lähtö ${paikka(alku390?.pA)} · kohde ${paikka(alku390?.pB)} `
  + `(näkyvä leveys ${Math.round(alku390?.leveys ?? 0)} lautayksikköä)`);
taulu.push(`390 px: pääakseli ${mitat390?.pysty ? 'pysty' : 'vaaka'} · 1400 px: `
  + `${mitat1400?.pysty ? 'pysty' : 'vaaka'}`);
taulu.push(`390 px: kameran horjunta ${JSON.stringify(horjunta390)}`);
taulu.push(`390 px: jäljen piirtoja ${osuudet390.length}, osuudet `
  + `${osuudet390.filter((v, i) => i % Math.ceil(osuudet390.length / 8) === 0 || i === osuudet390.length - 1).map((v) => v.toFixed(2)).join(' → ')}`);
taulu.push(`390 px: pulunapin peittävyys lennolla `
  + `${[...new Set(lentoNaytteet.map((n) => n.nappi))].join(',')} · perillä ${lento390.perilla.nappi}`);
taulu.push(`390 px: pulun hahmon näkyvyys lennolla `
  + `${[...new Set(lentoNaytteet.map((n) => n.hahmo))].join(',')} · perillä ${lento390.perilla.hahmo}`);
taulu.push(`390 px: perillä leveys ${Math.round(lento390.perilla.leveys)} · saapumisrajaus `
  + `${Math.round(lento390.saapuminen.leveys)} (ero ${(ero390 * 100).toFixed(1)} %)`);
taulu.push(`raporttikuvat: ${[...kuvienKohdat.entries()]
  .map(([k, v]) => `${k} @ ${typeof v.osuus === 'number' && v.osuus >= 0 ? v.osuus.toFixed(2) : 'ei lennossa'} `
    + `(kaappaus ${v.ms} ms)`).join(' · ')}`);
taulu.push(`VASTAKOE A: ilman lippua lähtö ${paikka(vertailu.ilman.pA)}, `
  + `lipulla ${paikka(vertailu.kanssa.pA)}`);
taulu.push(`VASTAKOE B: horjunta ${JSON.stringify(horjuntaB)}`);
taulu.push(`VASTAKOE C: pulunapin peittävyydet `
  + `${[...new Set(lentoCNaytteet.map((n) => n.nappi))].join(',')}`);
taulu.push(`1400 px: lähtö ${paikka(alku1400?.pA)} · kohde ${paikka(alku1400?.pB)}; `
  + `horjunta ${JSON.stringify(horjunta1400)}`);
taulu.push('');
taulu.push(...rivit);
if (virheet.length) taulu.push('', 'SIVUVIRHEET:', ...virheet);
writeFileSync(join(ULOS, 'savuke-lento-rajaus.txt'), `${taulu.join('\n')}\n`);
console.log(`\n${taulu.slice(0, 10).join('\n')}`);

await ctx390.close();
await ctx1400.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
