/*
 * Savuke: NAAPURIREITTIEN VIUHKA ON MATKASESSIO.
 *
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 8 (omistaja 14.9.2026,
 * sanatarkasti): *"reittiviuhka tulee nakyviin heti kun pelaaja painaa
 * 'liiku' nappia ja on kokoajan nakyvissa kunnes pelaaja saapuu uuteen
 * kaupunkiin tai peruuttaa liikkumisen eli jaakin nykyiseen
 * kaupunkiin"*. Lähtötilaus samana päivänä: *"onko kaupunkien valiset
 * siirtymalinjat ja merireitit omalla tasollaan? jos on niin ne voi
 * ottaa pois nakyvista ja palauttaa vasta kun pelaaja painaa liiku
 * nappia"*.
 *
 * ── MITÄ TÄMÄ MITTAA ──────────────────────────────────────────────
 *
 * Näkyvyyssääntö on YKSI funktio (js/ui.js matkareittienValinta), mutta
 * sitä ei mitata tässä lukemalla funktion paluuarvoa — se olisi saman
 * lauseen toistoa. Mitataan se, minkä pelaaja näkee: pallon omat
 * kerrokset (js/pallolauta/reitit.js — `pathsData` reittiviivat,
 * `pointsData` askelhelmet, `arcsData` lentokaaret). Jos sääntö ja
 * piirto erkanevat, luvut eivät täsmää eikä kumpikaan kaadu itsestään.
 *
 * MATKA AJETAAN OIKEILLA NAPEILLA. Sessio alkaa Liiku-napin
 * painalluksesta ja jatkuu nopanheiton yli, ja juuri se ketju on tämän
 * erän uusi asia — sitä ei siksi jäljitellä kenttiä kirjoittamalla vaan
 * napautetaan alanappiriviltä. Nappulan siirtäminen kesken matkaa ja
 * perille kirjoittaa `pos`-kentän: se on asema eikä ele, ja pelin oma
 * kohteenvalinta pallon pinnalta olisi tässä vain kohinaa.
 *
 * ── VARTIOT (Varsova, 4 maareittiä) ───────────────────────────────
 *
 *   1. ENNEN LIIKUA EI OLE VIUHKAA. Vuoro alkaa kaupungissa vaiheesta
 *      'roll', koska liftaus on ainoa noppatapa ja game.beginTurn
 *      esivalitsee sen (`autoTravel`, PAATOKSET 5). Silti 0 viivaa ja
 *      0 helmeä: siirtovaihe ei enää yksin riitä.
 *   2. LIIKU-NAPIN PAINALLUS TUO VIUHKAN: 4 viivaa, helmiä yli nollan,
 *      ja `ui.matkaSessio` on lähtökaupunki.
 *   3. VIUHKA PYSYY NOPANHEITON YLI. "Heitä noppa" sulkee liu'un
 *      (js/ui.js piirraToimintorivi), mutta viuhka on yhä 4 ja sessio
 *      yhä auki — tämä on se hetki, jonka omistaja päätti 14.9.2026.
 *   4. KESKEN REITTIÄ TASAN SE YKSI REITTI, myös ilman sessiota:
 *      sivunlataus kesken matkaa ei säilytä sessiota, ja poikkeus
 *      (`pos.type === 'edge'`) kantaa senkin.
 *   5. PERILLÄ UUDESSA KAUPUNGISSA TYHJÄ ja sessio päättynyt.
 *   6. PERUUTUS TYHJÄ kummallakin tavalla: Liiku-napin toinen
 *      painallus ja liu'un sulku kartalta (ui.suljeLiuku, sama metodi
 *      jonka kytkeLiukuSulku kutsuu).
 *   7. KATSELUTILA JA BOTIN VUORO OVAT ENNALLAAN tyhjiä.
 *   9. POLTETTUA REITTIVERKKOA EI LADATA PALLOLLE. Viivatason laatta
 *      (.../viivat/z…) on oma tiedostonsa, ja pallon pitää pärjätä
 *      ilman: rajat se piirtää vektorina, reitit elävänä kerroksena.
 *      Mittarina on pyyntöjen määrä — poltettua mustetta ei voi lukea
 *      kerroksista, koska se on laatan kankaassa.
 *  10. SIVUNLATAUS KAUPUNGISSA on tyhjä: sessio ei ole tallenteessa,
 *      eikä uusi sivukaan hae viivatason laattoja.
 *
 *   8. LENTOKAARTEN SÄÄNTÖ EI MUUTU (omistaja 1.9.2026): Ateenassa
 *      lentolista auki → kaaria yli nollan, ilman listaa nolla. Tämä on
 *      erän tärkein vastavartio: viuhkan piilotus ei saa viedä kaaria.
 *
 * ── VASTAKOE ──────────────────────────────────────────────────────
 *
 * VARTIO 9:N VASTAKOE (erä 9, 14.9.2026): palauta js/pallolaatat.js
 * lepokerroksenKerrokset-funktion `viiva: false` takaisin muotoon
 * `viiva: Boolean(viivat)`. Silloin pallo latoo poltetun reittiverkon
 * takaisin kartalle, viivalaattapyyntöjä tulee kymmeniä ja vartiot 9 ja
 * 10b muuttuvat punaisiksi — vaikka vartiot 1–8 pysyvät vihreinä. Juuri
 * se ero on tämän erän vika: elävä kerros oli oikein jo v1865:ssä,
 * mutta ruudulla viuhka näkyi laatoista.
 *
 * Vartiot 1 ja 6 erottavat vanhan ja uuden säännön. Vanha ehto
 * (`liukuAuki || vaiheessa`) näyttäisi viuhkan jo lepotilassa ja jättäisi
 * sen päälle peruutuksen jälkeen; ensimmäisen kierroksen liukuehto
 * (`this.liukuAuki`) puolestaan veisi viuhkan pois heti nopanheiton
 * jälkeen eli kaataisi vartion 3. Aja savuke muutos palautettuna, niin
 * ero näkyy numeroina.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 * Laaja ruutu 2560 × 1352 (omistajan työpöytä): ennen Liikua, Liiku
 * painettuna, nopanheiton jälkeen, kesken matkaa, perillä ja peruutus.
 * Nimiö erottaa ENNEN- ja JÄLKEEN-ajon toisistaan.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Ilman ämpäriä
 * pallo ei lataudu; savuke toteaa sen ja päättyy ohituksella.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-reitit-piiloon.mjs \
 *         [kuvakansio] [nimio]
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '/tmp/matkakirja-kaappaukset';
const NIMIO = process.argv[3] ?? 'jalkeen';
if (!existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Omistajan työpöytä: laaja ruutu, jolla viuhka näkyy kokonaan. */
const RUUTU = { width: 2560, height: 1352 };
/** Raporttikuvan pienennys: mitataan täydellä ruudulla, talletetaan pienenä. */
const KUVAN_SKAALA = 0.3;
/** Kaupunki, jonka viuhka mitataan: neljä maareittiä, ei lentokenttää. */
const KAUPUNKI = 'varsova';
/** Lentokaarivartion kaupunki: maa- ja merireittejä sekä lentokenttä. */
const LENTOKAUPUNKI = 'ateena';

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
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
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
const tallenne = JSON.stringify(peli.toJSON());
const NAAPURIT = [...(peli.board.adj.get(KAUPUNKI) ?? [])];
const NAAPUREITA = NAAPURIT.length;
const REITTI = NAAPURIT[0];
/** Reitin toinen pää: se kaupunki, johon matka päättyy vartiossa 5. */
const PERILLA = peli.board.edgeById.get(REITTI).a === KAUPUNKI
  ? peli.board.edgeById.get(REITTI).b : peli.board.edgeById.get(REITTI).a;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: RUUTU, deviceScaleFactor: 1, serviceWorkers: 'block',
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
/*
 * POLTETTU REITTIVERKKO ON OMA MITTARINSA (vartio 9). Viivatason laatta
 * on oma tiedostonsa (.../viivat/z<taso>/<sarake>/<rivi>), joten
 * pyyntöjen määrä kertoo suoraan, latooko pallo poltettua reittiverkkoa
 * kartalle — sitä ei voi lukea pallon kerroksista, koska poltettu muste
 * on laatan kankaassa eikä datumina missään.
 */
let viivalaattaPyyntoja = 0;
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  if (/\/viivat\//.test(route.request().url())) viivalaattaPyyntoja += 1;
  const v = await ampariHaku(route.request().url());
  if (!v || v.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: v.tyyppi ?? 'application/octet-stream',
    body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 120000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
  { timeout: 120000 }).then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));

/**
 * LUKEE SEN, MINKÄ PELAAJA NÄKEE: pallon reittiviivat (varjot pois
 * laskuista), askelhelmet ja lentokaaret — sekä rinnalle pelin tilan,
 * jotta raportista näkyy, ovatko sääntö ja piirto samaa mieltä. Ei
 * kirjoita mitään.
 */
const lue = () => sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  /*
   * VARJO EI OLE OMA REITTI: jokainen reittiviiva työnnetään kahdesti
   * (js/pallolauta/reitit.js — vaalea uoma ensin, musteviiva päälle),
   * joten pelaajan näkemien viivojen määrä on eri avainten määrä
   * ilman '#varjo'-päätettä.
   */
  const viivat = new Set();
  for (const d of l.pallo.pathsData()) {
    const avain = String(d.avain ?? '');
    if (!avain || avain.endsWith('#varjo')) continue;
    viivat.add(avain);
  }
  const valinta = ui.matkareittienValinta();
  return {
    viivoja: viivat.size,
    viivat: [...viivat],
    helmia: l.pallo.pointsData().filter((x) => x.laji === 'helmi').length,
    kaaria: l.pallo.arcsData().length,
    vaihe: ui.game.phase,
    autoTravel: ui.game.autoTravel,
    liukuAuki: ui.liukuAuki,
    matkaSessio: ui.matkaSessio ?? null,
    saanto: valinta.reittiTunnukset.length,
    lennot: valinta.lennot.length,
    avain: valinta.avain,
  };
});

/**
 * Asettaa aseman ja vaiheen ja piirtää uudestaan. Nappulan siirto on
 * pelin sisäinen asema (js/rules.js pos), ei ele — kohteen napauttaminen
 * pallon pinnalta olisi tässä vain kohinaa.
 */
const aseta = (t) => sivu.evaluate(async (x) => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const { game } = ui;
  if (x.pos) game.player.pos = x.pos;
  if (x.phase) game.phase = x.phase;
  if (x.autoTravel !== undefined) game.autoTravel = x.autoTravel;
  if (x.uusiVuoro) {
    /*
     * VAIHE 'action' ENSIN: game.travelModes palauttaa tyhjän listan
     * muussa vaiheessa, jolloin beginTurn jättäisi matkustustavan
     * esivalitsematta ja mittaisi tilaa, jota pelissä ei ole.
     */
    game.phase = 'action';
    game.player.money = Math.max(game.player.money, 300);
    game.tehtavaTarjolla = () => false;
    game.beginTurn();
  }
  if (x.botti !== undefined) game.player.isBot = x.botti;
  if (x.katselu !== undefined) ui.katselu = x.katselu;
  if (x.liuku !== undefined) ui.liukuAuki = x.liuku;
  if (x.sessio !== undefined) ui.matkaSessio = x.sessio;
  if (x.suljeLiuku) ui.suljeLiuku();
  if (x.keskita) {
    /*
     * VAIN KESKITYS, EI ZOOMIA: korkeus otetaan siitä, mihin peli itse
     * asettui saapumisessa (maan rajaus, karttauudistus). Oma luku
     * antaisi kuvan, jota pelissä ei ole.
     */
    const c = game.board.cityById.get(x.keskita);
    const p = l.asteet({ x: c.x, y: c.y });
    const nyt = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: p.lat, lng: p.lon, altitude: nyt.altitude }, 0);
    await new Promise((v) => setTimeout(v, 700));
  }
  if (x.piirra !== false) ui.render();
  ui.paivitaMatkareitit();
  await new Promise((v) => setTimeout(v, 500));
}, t);

/** Napauttaa alanappirivin nappia sen nimellä; palauttaa löytyikö se. */
const paina = (teksti) => sivu.evaluate((t) => {
  const nappi = [...document.querySelectorAll('.actions button')].find((b) => (
    `${b.textContent} ${b.getAttribute('aria-label') ?? ''}`.includes(t)));
  if (!nappi) return false;
  nappi.click();
  return true;
}, teksti);

const kuva = async (nimi) => {
  /*
   * SAAPUMISEN ISOKUVA POIS ENNEN KAAPPAUSTA. Kaupunkiin saavuttaessa
   * fokusvirta jättää kartan päälle kaupungin ison kuvan
   * (.fokusvirta-isokuva), joka peittää juuri sen alueen, jota tässä
   * mitataan. Se nollataan pelin omalla kutsulla — savuke ei piilota
   * sitä CSS:llä eikä poista käsin, jottei kaappaus näyttäisi
   * näkymää, jota pelissä ei ole.
   */
  for (let i = 0; i < 6; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.evaluate(async () => {
      const { nollaaFokuskuvat, suljeFokusvirta } = await import('/js/fokusvirta.js');
      suljeFokusvirta(window.matkakirja.ui);
      nollaaFokuskuvat(window.matkakirja.ui);
    });
    await sivu.waitForTimeout(500);
    const jaljella = await sivu.evaluate(() => Boolean(
      document.querySelector('.fokusvirta-isokuva, .saapumistraileri'),
    ));
    /* eslint-enable no-await-in-loop */
    if (!jaljella) break;
  }
  /*
   * KAAPPAUS PIENENNETÄÄN SELAIMEN OMALLA KANKAALLA (sama kaava kuin
   * savuke-liiku): kartan pergamenttipinta on kohinaa, joka tekee
   * 2560 × 1352 png:stä yli kaksi megatavua, ja raporttikuvat pidetään
   * 400 kt:n kokoluokassa, jottei repon historia paisu. Mittaukset
   * luetaan pallon kerroksista eikä kuvasta, joten mittakaava ei vaikuta
   * yhteenkään lukuun — kuva on todiste silmälle.
   */
  const png = (await sivu.screenshot()).toString('base64');
  const pieni = await sivu.evaluate(async ([data, k]) => {
    const img = new Image();
    await new Promise((ok, hup) => {
      img.onload = ok; img.onerror = hup; img.src = `data:image/png;base64,${data}`;
    });
    const kangas = document.createElement('canvas');
    kangas.width = Math.round(img.width * k);
    kangas.height = Math.round(img.height * k);
    kangas.getContext('2d').drawImage(img, 0, 0, kangas.width, kangas.height);
    return kangas.toDataURL('image/png').split(',')[1];
  }, [png, KUVAN_SKAALA]);
  const polku = join(KUVAKANSIO, `reitit-${nimi}-${NIMIO}.png`);
  writeFileSync(polku, Buffer.from(pieni, 'base64'));
  tieto('kuva', `${polku} (${Math.round(Buffer.from(pieni, 'base64').length / 1024)} kt)`);
  return polku;
};

if (auki) {
  /*
   * SAAPUMISTRAILERI SAA PÄÄTTYÄ ITSE. Peli avaa kaupunkiin
   * saavuttaessa kolmen kuvan trailerin (js/saapumistraileri.js), joka
   * peittää kartan noin kymmeneksi sekunniksi. Mittaus alkaa vasta sen
   * jälkeen — muuten kaappauksessa olisi trailerin kuva eikä karttaa.
   */
  await sivu.waitForTimeout(14000);
  /*
   * PUHDAS LÄHTÖTILANNE. Saapumiskortti suljetaan pelin omalla
   * kutsulla, kaupungin tehtävä vaimennetaan ('stay' on aito valinta,
   * joka estäisi matkustustavan esivalinnan) ja vuoro aloitetaan
   * alusta. Rahaa 300 p, jotta bussi ja laiva ovat tarjolla.
   */
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    ui.game.tehtavaTarjolla = () => false;
    ui.game.player.money = 300;
    ui.game.beginTurn();
    ui.render();
  });
  await sivu.waitForTimeout(1200);

  const kaupungissa = { type: 'city', city: KAUPUNKI };
  const keskella = { type: 'edge', edge: REITTI, idx: 1 };

  /* ---- 1. lepotila: ennen Liikua ei viuhkaa ---------------------- */
  await aseta({ pos: kaupungissa, uusiVuoro: true, keskita: KAUPUNKI });
  const lepo = await lue();
  tieto('1 lepo (ennen Liikua)', JSON.stringify(lepo));
  await kuva('ennen-liikua');

  /* ---- 2. Liiku painetaan: matka alkaa --------------------------- */
  const liikuLoytyi = await paina('Liiku');
  await sivu.waitForTimeout(900);
  const liikuPainettu = await lue();
  tieto('2 Liiku painettu', JSON.stringify(liikuPainettu));
  await kuva('liiku-painettu');

  /* ---- 3. noppa heitetään: liuku sulkeutuu, viuhka jää ----------- */
  const noppaLoytyi = await paina('Heitä noppa');
  await sivu.waitForTimeout(2500);
  const heiton = await lue();
  tieto('3 nopanheiton jälkeen', JSON.stringify(heiton));
  await kuva('heiton-jalkeen');

  /* ---- 4. kesken reittiä, sessiolla ja ilman (sivunlataus) ------- */
  await aseta({ pos: keskella, phase: 'move', keskita: KAUPUNKI });
  const kesken = await lue();
  tieto('4a kesken reittiä (sessio tallessa)', JSON.stringify(kesken));
  await aseta({ pos: keskella, phase: 'move', sessio: null });
  const keskenIlman = await lue();
  tieto('4b kesken reittiä (sivunlataus: ei sessiota)', JSON.stringify(keskenIlman));
  await kuva('kesken-matkaa');

  /* ---- 5. perillä uudessa kaupungissa ---------------------------- */
  await aseta({ pos: keskella, phase: 'move', sessio: KAUPUNKI });
  await aseta({
    pos: { type: 'city', city: PERILLA }, phase: 'action', keskita: PERILLA,
  });
  const perilla = await lue();
  tieto('5 perillä uudessa kaupungissa', JSON.stringify(perilla));
  await kuva('perilla');

  /* ---- 6. peruutus kahdella tavalla ------------------------------ */
  await aseta({ pos: kaupungissa, uusiVuoro: true, keskita: KAUPUNKI });
  await paina('Liiku');
  await sivu.waitForTimeout(700);
  const ennenPeruutusta = await lue();
  await paina('Liiku');
  await sivu.waitForTimeout(700);
  await aseta({ piirra: false });
  const peruutusNapista = await lue();
  tieto('6a peruutus Liiku-napista', JSON.stringify(peruutusNapista));
  await kuva('peruutus');

  await paina('Liiku');
  await sivu.waitForTimeout(700);
  const ennenKarttaa = await lue();
  await aseta({ suljeLiuku: true });
  const peruutusKartalta = await lue();
  tieto('6b peruutus kartalta (suljeLiuku)', JSON.stringify(peruutusKartalta));

  /* ---- 7. katselu ja botti --------------------------------------- */
  /*
   * Sessio JA liuku auki: ilman kumpaakin vartio menisi läpi tyhjänä
   * eikä mittaisi katselutilaa lainkaan.
   */
  await aseta({
    pos: kaupungissa, uusiVuoro: true, sessio: KAUPUNKI, liuku: true, katselu: true,
  });
  const katselu = await lue();
  tieto('7a katselutila (sessio ja liuku auki)', JSON.stringify(katselu));
  await aseta({ katselu: false, botti: true, sessio: KAUPUNKI, liuku: true });
  const botti = await lue();
  tieto('7b botin vuoro (sessio ja liuku auki)', JSON.stringify(botti));
  await aseta({ botti: false, sessio: null, liuku: false });

  /* ---- 8. lentokaaret: sääntö ei muutu --------------------------- */
  await aseta({
    pos: { type: 'city', city: LENTOKAUPUNKI }, uusiVuoro: true, keskita: LENTOKAUPUNKI,
  });
  await sivu.evaluate(() => { window.matkakirja.ui.game.player.money = 3000; });
  await paina('Liiku');
  await sivu.waitForTimeout(700);
  const lentoEnnen = await lue();
  const lentoLoytyi = await paina('Lentäen');
  await sivu.waitForTimeout(2500);
  const lentoLista = await lue();
  tieto('8a lentolista auki', JSON.stringify(lentoLista));
  await aseta({ pos: { type: 'city', city: LENTOKAUPUNKI }, uusiVuoro: true, sessio: null });
  const lentoIlman = await lue();
  tieto('8b lentokaupunki ilman listaa', JSON.stringify(lentoIlman));

  /* ---- vartiot --------------------------------------------------- */
  vaadi('napit löytyivät (Liiku, Heitä noppa, Lentäen)',
    liikuLoytyi && noppaLoytyi && lentoLoytyi,
    JSON.stringify({ liikuLoytyi, noppaLoytyi, lentoLoytyi }));
  vaadi('1. ennen Liikua ei viuhkaa (vaihe roll, matkustustapa esivalittu)',
    lepo.viivoja === 0 && lepo.helmia === 0 && lepo.matkaSessio === null,
    JSON.stringify(lepo));
  vaadi(`2. Liiku-napin painallus tuo viuhkan (${NAAPUREITA} naapuria)`,
    liikuPainettu.viivoja === NAAPUREITA && liikuPainettu.helmia > 0
      && liikuPainettu.matkaSessio === KAUPUNKI,
    JSON.stringify(liikuPainettu));
  vaadi('3. viuhka pysyy nopanheiton yli vaikka liuku sulkeutuu',
    heiton.viivoja === NAAPUREITA && heiton.liukuAuki === false
      && heiton.vaihe === 'move' && heiton.matkaSessio === KAUPUNKI,
    JSON.stringify(heiton));
  vaadi('4a. kesken reittiä tasan se yksi reitti',
    kesken.viivoja === 1 && kesken.viivat[0] === REITTI, JSON.stringify(kesken));
  vaadi('4b. sivunlataus kesken matkaa näyttää yhä sen yhden reitin',
    keskenIlman.viivoja === 1 && keskenIlman.viivat[0] === REITTI,
    JSON.stringify(keskenIlman));
  vaadi('5. perillä uudessa kaupungissa tyhjä ja sessio päättynyt',
    perilla.viivoja === 0 && perilla.helmia === 0 && perilla.matkaSessio === null,
    JSON.stringify(perilla));
  vaadi('6a. peruutus Liiku-napista tyhjentää viuhkan',
    ennenPeruutusta.viivoja === NAAPUREITA && peruutusNapista.viivoja === 0
      && peruutusNapista.matkaSessio === null,
    JSON.stringify({ ennenPeruutusta, peruutusNapista }));
  vaadi('6b. peruutus kartalta (suljeLiuku) tyhjentää viuhkan',
    ennenKarttaa.viivoja === NAAPUREITA && peruutusKartalta.viivoja === 0
      && peruutusKartalta.matkaSessio === null,
    JSON.stringify({ ennenKarttaa, peruutusKartalta }));
  vaadi('7a. katselutilassa ei reittejä vaikka matka olisi kesken',
    katselu.viivoja === 0 && katselu.matkaSessio === KAUPUNKI, JSON.stringify(katselu));
  vaadi('7b. botin vuorolla ei reittejä vaikka matka olisi kesken',
    botti.viivoja === 0 && botti.matkaSessio === KAUPUNKI, JSON.stringify(botti));
  vaadi('8a. lentolista auki piirtää kaaret (omistajan 1.9.2026 sääntö ennallaan)',
    lentoLista.kaaria > 0 && lentoEnnen.kaaria === 0,
    JSON.stringify({ lentoEnnen, lentoLista }));
  vaadi('8b. ilman lentolistaa ei kaaria',
    lentoIlman.kaaria === 0, JSON.stringify(lentoIlman));

  /* ---- 9. poltettu reittiverkko ei tule pallolle ----------------- */
  /*
   * TÄMÄ ON ERÄN 9 VARTIO (Raamattu KARTTAUUDISTUKSEN PAATOKSET 9 kohta
   * 6, omistaja 14.9.2026: *"lisaksi reittiviuhka nakyy edelleen vaikka
   * ei olla liikkumistilassa. korjaa se myos."*).
   *
   * Vartiot 1–8 mittaavat elävää kerrosta, ja ne olivat vihreitä jo
   * v1865:ssä — silti viuhka näkyi ruudulla, koska REITTIVERKKO ON
   * POLTETTU VIIVATASON LAATTOIHIN ja pallo latoi ne joka laatan
   * kankaalle (js/pallolaatat.js lepokerroksenKerrokset). Poltettua
   * mustetta ei voi mitata kerroksista; se mitataan siitä, ettei
   * laattoja edes haeta.
   */
  tieto('9 viivalaattapyyntöjä koko ajon aikana', viivalaattaPyyntoja);
  vaadi('9. poltettua reittiverkkoa ei ladata pallolle (0 viivalaattaa)',
    viivalaattaPyyntoja === 0,
    `pallo haki ${viivalaattaPyyntoja} viivatason laattaa`);

  /* ---- 10. sivunlataus kaupungissa -------------------------------- */
  /*
   * TALLENNUKSESTA PALUU. Sessio ei ole tallenteessa (se on ruudun
   * tila), joten kaupungissa seisova pelaaja saa tyhjän kartan myös
   * sivunlatauksen jälkeen — ja koska viivalaskuri jatkuu latauksen yli,
   * sama vartio 9 kattaa uuden sivun laatat.
   */
  await sivu.evaluate(() => { window.matkakirja.ui.game.save?.(); });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 120000 });
  const uudelleen = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta),
    null, { timeout: 120000 }).then(() => true).catch(() => false);
  await sivu.waitForTimeout(6000);
  const lataus = uudelleen ? await lue() : null;
  tieto('10 sivunlatauksen jälkeen', JSON.stringify(lataus));
  vaadi('10. sivunlataus kaupungissa: ei viuhkaa eikä sessiota',
    Boolean(lataus) && lataus.viivoja === 0 && lataus.helmia === 0
      && lataus.matkaSessio === null,
    JSON.stringify(lataus));
  tieto('10 viivalaattapyyntöjä latauksen jälkeen', viivalaattaPyyntoja);
  vaadi('10b. sivunlatauskaan ei hae viivatason laattoja',
    viivalaattaPyyntoja === 0, `pallo haki ${viivalaattaPyyntoja} viivatason laattaa`);
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
