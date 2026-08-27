/*
 * Savuke: jalkamatkan siirtymä (#96) ja maataulun väistöt (#102).
 *
 * Omistajan tilaukset:
 *   #96 *"Matkustusanimaatio jalan saisi olla hitaampi. Kartta voisi
 *   samalla myös hitaasti siirtyä uuteen kohteeseen ja paljastaa sitä
 *   näkyviin sitä mukaa kun nappula etenee. Taustalle pitää kehitellä
 *   sopiva äänimaisema siirtymän ajaksi."*
 *   #102 *"Kun maan pieni faktaruutu aukeaa, niin se voisi piilottaa
 *   matkusta-napin väliaikaisesti, jos se on laudalla, ja sen lisäksi
 *   tekstin alla olevat kohdat saisi blurrautua."*
 *
 * VARTIOT:
 *   1. HIDAS ASKEL. Maareittiä kuljettaessa matka kestää selvästi
 *      kauemmin kuin sama polku lennon askeltahdilla (STEP_MS).
 *   2. SAATTAVA KAMERA. Matkan aikana kamera-ajo on käynnissä, kartan
 *      keskipiste siirtyy JA näkymä menee selvästi lähemmäs (omistajan
 *      pelitesti 27.8.2026: *"pitäisi olla ainakin lähempänä jotta
 *      lauta liikkuisi enemmän"*) — ja saattozoomi purkautuu perillä
 *      takaisin lähtökertoimeen.
 *   3. ELE VOITTAA. Sormi kartalle kesken matkan pysäyttää saattamisen,
 *      eikä ajo herää uudelleen matkan loppuosalla.
 *   4. MATKAN ÄÄNI. Oma äänilippu on päällä matkan ajan ja laskeutuu
 *      viimeisellä askeleella, jotta määränpään maisema saa nousta.
 *   5. MAATAULU. Auki ollessaan se piilottaa Matkusta-napin ja piirtää
 *      alleen sumennuskerroksen; sulkeutuessa nappi palaa.
 *
 * OMISTAJAN PELITESTI 27.8.2026 (iPhone ja iPad) toi samaan savukkeeseen
 * kolme korjausta lisää:
 *
 *   7. NAPPULA NÄKYY LEHDEN PÄÄLLÄ. v1097:n "Ota pallot pois" piilotti
 *      pelinappulan fokuslehden päältä, ja tinaherran myötä (#100)
 *      sääntö kääntyi itseään vastaan: *"tinaherra-nappula EI näy
 *      Kreikan fokuslaudalla"*. Nappula ei saa enää kantaa
 *      .fokus-lehden-alla-luokkaa, ja kaupungin nimilapun on säilyttävä.
 *   8. NOPPA EI PYÖRÄHDÄ ITSESTÄÄN. *"kun aarteen on avannut, peli menee
 *      SUORAAN nopanheittoon"* — esivalittu matkustustapa saa jäädä,
 *      mutta heitto on aina pelaajan napin takana.
 *   9. NOPAN KOMPOSITORIVIHJE VAIN HEITON AJAKSI. Pysyvä
 *      `will-change: transform` kartan siirtokuoressa lepäävässä nopassa
 *      pakotti sen ALLA olevan kartan omalle kerrokselleen, ja iPhonella
 *      kerros jäi varaamatta: *"kartat eivät näy taustalla kun
 *      pelinappula hyppii"*.
 *
 * MIKSI VARTIO: lähes jokainen takeista rikkoutuu hiljaa. Kamera-ajon
 * kohteesta unohtuva zoomikerroin muuttaa saattamisen taas kevyeksi
 * liu'uksi eikä mikään kaadu; äänilipun unohtuminen jättää metsätuulen
 * soimaan kaupunkiin; Matkusta-napin piilotus ja nopan vihje asuvat
 * CSS-luokissa, jotka menettää yhdellä nimenmuutoksella; ja nappulan
 * piilotussääntö on yksi rivi keskellä 80-rivistä metodia.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(e.message));
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);

// Ateena on fokusnäkymän vakiokaupunki (sama alustus kuin
// tools/savuke-fokuskartta.mjs): maareittejä on ja kartuutsi on
// laudalla, joten molemmat tilaukset pääsevät ajoon samassa tilassa.
const alku = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') {
    game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  }
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 1800));
  return { kaupunki: game.cityOf()?.id, fokus: ui.fokusmoodi === true };
});
vaadi('0 nappula Ateenassa ja fokusmoodi päällä',
  alku.kaupunki === 'ateena' && alku.fokus, JSON.stringify(alku));

/* --- 5. maataulu ensin: se ei sotke pelitilaa --------------------- */
const taulu = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  /*
   * Matkusta-nappi näkyy fokusmoodissa vasta kun kaupungin laatta on
   * käännetty (ui.liikuNappiNakyy). Laatta pois, jotta nappi on
   * laudalla — juuri se tilanne, jota tilaus koskee.
   */
  const kaupunki = ui.game.cityOf();
  ui.game.tokens.delete(kaupunki.id);
  ui.render();
  await new Promise((r) => setTimeout(r, 400));
  const nappi = () => document.querySelector('.toimintorivi .monitoimi-nappi');
  const tila = (el) => (el ? {
    naky: getComputedStyle(el).visibility, peitto: +getComputedStyle(el).opacity,
  } : null);
  const ennen = tila(nappi());
  document.querySelector('.fokus-kartuutsi')?.click();
  await new Promise((r) => setTimeout(r, 500));
  const t = document.querySelector('.fokus-maataulu');
  const pseudo = t ? getComputedStyle(t, '::before') : null;
  const auki = {
    lippu: document.body.classList.contains('maataulu-auki'),
    taulu: t?.classList.contains('auki') ?? false,
    nappi: tila(nappi()),
    sumennus: pseudo ? (pseudo.backdropFilter || pseudo.webkitBackdropFilter) : '',
    maski: pseudo ? (pseudo.maskImage || pseudo.webkitMaskImage) : '',
    z: pseudo?.zIndex ?? null,
    vaakavieritys: t ? t.scrollWidth - t.clientWidth : null,
  };
  // Sulku: napautus kartalle (sama polku kuin pelaajalla).
  ui.mapPane.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 500));
  return {
    ennen,
    auki,
    kiinni: {
      lippu: document.body.classList.contains('maataulu-auki'),
      nappi: tila(nappi()),
      auki: Boolean(ui.fokusMaatauluAuki),
    },
  };
});
vaadi('5a maataulu aukeaa kartuutsista ja nostaa lippunsa',
  taulu.auki.taulu === true && taulu.auki.lippu === true, JSON.stringify(taulu.auki));
vaadi('5b Matkusta-nappi näkyi ennen ja piiloutui taulun ajaksi',
  taulu.ennen?.naky === 'visible' && taulu.ennen?.peitto === 1
  && taulu.auki.nappi?.naky === 'hidden' && taulu.auki.nappi?.peitto === 0,
  JSON.stringify({ ennen: taulu.ennen, auki: taulu.auki.nappi }));
vaadi('5c taulun alla on pehmeäreunainen sumennuskerros',
  /blur/.test(taulu.auki.sumennus) && /gradient/.test(taulu.auki.maski)
  && taulu.auki.z === '-1',
  JSON.stringify({ s: taulu.auki.sumennus, z: taulu.auki.z }));
vaadi('5d sumennuskerros ei kasvata taulun vieritysaluetta',
  taulu.auki.vaakavieritys === 0, String(taulu.auki.vaakavieritys));
vaadi('5e taulun sulkeutuessa nappi palaa',
  taulu.kiinni.lippu === false && taulu.kiinni.auki === false
  && taulu.kiinni.nappi?.naky === 'visible' && taulu.kiinni.nappi?.peitto === 1,
  JSON.stringify(taulu.kiinni));

/* --- 1., 2. ja 4. jalkamatka -------------------------------------- */
const matka = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const { findMoves } = await import('./js/rules.js');
  g.phase = 'action';
  g.autoTravel = false;
  if (!g.actionTravel('land').ok) return { virhe: 'ei maareittiä' };
  g.die = 4;
  g.phase = 'move';
  g.moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const [avain, siirto] = [...g.moves.entries()]
    .sort((a, b) => b[1].path.length - a[1].path.length)[0];
  const alkuNakyma = ui.nakyvaAlue();
  const alkuhetki = performance.now();
  ui.mannerZoom = true;
  const kerroinEnnen = ui.kartta.zoomiKerroin;
  /*
   * Kamera-ajot talteen. Perillä saapuminen voi ajaa kameran uuteen
   * MAAHAN (js/fokuskartta.js), ja se pyyhkii saattozoomin paluun
   * mittaustuloksista — siksi paluuta ei mitata näkymästä vaan siitä,
   * mitä kameralta pyydettiin.
   */
  const ajot = [];
  const alkuperainenAjaKamera = ui.kartta.ajaKamera.bind(ui.kartta);
  ui.kartta.ajaKamera = (kohde, valinnat) => {
    ajot.push({ kerroin: kohde?.kerroin ?? null, kesto: valinnat?.kesto ?? null });
    return alkuperainenAjaKamera(kohde, valinnat);
  };
  ui.doMove(avain);
  const naytteet = [];
  const kello = setInterval(() => {
    naytteet.push({
      ajossa: ui.kartta.kameraAjossa(),
      aani: Boolean(ui.jalkamatkanAani),
      kerroin: ui.kartta.zoomiKerroin,
      nappula: document.querySelector('.pawn-moving')?.style.transform ?? null,
    });
  }, 60);
  while (document.querySelector('.pawn-moving') || performance.now() - alkuhetki < 400) {
    await new Promise((r) => setTimeout(r, 60));
    if (performance.now() - alkuhetki > 12000) break;
  }
  clearInterval(kello);
  const kesto = performance.now() - alkuhetki;
  const matkanKerroin = Math.max(...naytteet.map((n) => n.kerroin));
  // Paluuajo lähtee heti viimeisen laskeutumisen jälkeen.
  await new Promise((r) => setTimeout(r, 300));
  const loppuNakyma = ui.nakyvaAlue();
  ui.kartta.ajaKamera = alkuperainenAjaKamera;
  return {
    askeleet: siirto.path.length,
    kesto: Math.round(kesto),
    aaniPaalla: naytteet.filter((n) => n.aani).length,
    aaniLopuksi: Boolean(ui.jalkamatkanAani),
    ajossa: naytteet.filter((n) => n.ajossa).length,
    nappulapaikkoja: new Set(naytteet.map((n) => n.nappula)).size,
    siirtyma: +Math.hypot(
      loppuNakyma.x - alkuNakyma.x, loppuNakyma.y - alkuNakyma.y,
    ).toFixed(1),
    kerroinEnnen: +kerroinEnnen.toFixed(4),
    kerroinMatkalla: +matkanKerroin.toFixed(4),
    ajot,
    kerroinEnnenAjo: ajot[0]?.kerroin ? +ajot[0].kerroin.toFixed(4) : null,
    // Paluu on saattoajon JÄLKEEN pyydetty ajo, jolla on oma kestonsa
    // (SAATON_PALUU_MS); saapumisen maanvaihdos ajaa rajauslaatikkoon
    // eikä kertoimeen, joten se erottuu tästä.
    paluuKerroin: ajot.slice(1).find((a) => a.kerroin)?.kerroin ?? null,
  };
});
// Vertailukohta: sama määrä askelia lennon tahdilla (STEP_MS 190).
const lennonTahti = await sivu.evaluate(async (askeleet) => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const p = g.player;
  const eid = p.pos.type === 'edge' ? p.pos.edge : [...g.board.adj.get(p.pos.city)][0];
  const e = g.board.edgeById.get(eid);
  const polku = [];
  for (let i = 1; i <= Math.min(askeleet, e.steps); i++) {
    polku.push({ type: 'edge', edge: eid, idx: i });
  }
  const alkuhetki = performance.now();
  await ui.animatePawn(p, { ...p.pos }, polku, 190);
  return { askeleet: polku.length, kesto: Math.round(performance.now() - alkuhetki) };
}, matka.askeleet);

const hidastus = (matka.kesto / matka.askeleet) / (lennonTahti.kesto / lennonTahti.askeleet);
vaadi('1 jalkamatkan askel on selvästi lennon askelta hitaampi',
  matka.askeleet > 1 && hidastus > 1.25,
  JSON.stringify({ matka, lennonTahti, hidastus: +hidastus.toFixed(2) }));
vaadi('2a kamera saattoi nappulaa matkan ajan', matka.ajossa > 5, String(matka.ajossa));
vaadi('2b kartta siirtyi uuteen kohteeseen', matka.siirtyma > 5, String(matka.siirtyma));
vaadi('2c kamera meni matkan ajaksi lähemmäs',
  matka.kerroinMatkalla > matka.kerroinEnnen * 1.2,
  JSON.stringify([matka.kerroinEnnen, matka.kerroinMatkalla]));
vaadi('2d saattozoomi purkautui perillä lähtökertoimeen',
  matka.paluuKerroin !== null
  && Math.abs(matka.paluuKerroin - matka.kerroinEnnen) < 0.02 * matka.kerroinEnnen,
  JSON.stringify({ ennen: matka.kerroinEnnen, ajot: matka.ajot }));
vaadi('4a matkan äänilippu oli päällä matkan ajan', matka.aaniPaalla > 3, String(matka.aaniPaalla));
vaadi('4b äänilippu laski ennen saapumista', matka.aaniLopuksi === false);

/* --- 3. ele keskeyttää saattamisen -------------------------------- */
await sivu.waitForFunction(() => !window.matkakirja.ui.busy, null, { timeout: 20000 });
await sivu.waitForTimeout(600);
const keskeytys = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const { findMoves } = await import('./js/rules.js');
  g.phase = 'action';
  g.autoTravel = false;
  if (!g.actionTravel('land').ok) return { virhe: 'ei maareittiä' };
  g.die = 4;
  g.phase = 'move';
  g.moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const [avain] = [...g.moves.entries()]
    .sort((a, b) => b[1].path.length - a[1].path.length)[0];
  ui.mannerZoom = true;
  ui.doMove(avain);
  await new Promise((r) => setTimeout(r, 400));
  const ennen = ui.kartta.kameraAjossa();
  const nakymaEnnen = ui.nakyvaAlue();
  const pane = ui.mapPane;
  const laatikko = pane.getBoundingClientRect();
  const ele = {
    bubbles: true,
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
    clientX: laatikko.left + laatikko.width / 2,
    clientY: laatikko.top + laatikko.height / 2,
  };
  pane.dispatchEvent(new PointerEvent('pointerdown', ele));
  const jalkeen = ui.kartta.kameraAjossa();
  pane.dispatchEvent(new PointerEvent('pointerup', ele));
  let ajossaJaljella = 0;
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 60));
    if (ui.kartta.kameraAjossa()) ajossaJaljella += 1;
  }
  const nakymaJalkeen = ui.nakyvaAlue();
  return {
    ennen,
    jalkeen,
    ajossaJaljella,
    nappulaLiikkuu: Boolean(document.querySelector('.pawn-moving')),
    liike: +Math.hypot(
      nakymaJalkeen.x - nakymaEnnen.x, nakymaJalkeen.y - nakymaEnnen.y,
    ).toFixed(1),
  };
});
vaadi('3a ele pysäytti saattamisen', keskeytys.ennen === true && keskeytys.jalkeen === false,
  JSON.stringify(keskeytys));
vaadi('3b kamera jäi paikalleen matkan loppuosaksi',
  keskeytys.ajossaJaljella === 0 && keskeytys.liike < 1 && keskeytys.nappulaLiikkuu === true,
  JSON.stringify(keskeytys));


/* --- 7. nappula näkyy lehden päällä (omistajan pelitesti 27.8.) ---- */
const nappula = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  // Kesken jäänyt siirto voi jättää liikkuvan nappulan lipun päälle,
  // jolloin drawPawns jättää oman nappulan piirtämättä.
  ui.movingPlayerId = null;
  ui.render();
  ui.drawPawns();
  await new Promise((r) => setTimeout(r, 400));
  /*
   * Ämpärin lehtikuvaa ei kontissa ole, mutta piilotussääntö nojaa
   * pelkkään BBOXIIN (paivitaFokusPallot `pohja`): asetetaan se käsin,
   * jolloin Ateena on "lehden päällä" täsmälleen kuten pelissä.
   */
  const c = g.cityOf();
  ui.fokusPohjaBbox = { x: c.x - 400, y: c.y - 400, w: 800, h: 800 };
  ui.paivitaFokusPallot();
  await new Promise((r) => setTimeout(r, 200));
  const oma = ui.pawnLayer?.querySelector('.pawn');
  const kuva = oma?.querySelector('.pawn-kuva');
  const laatikko = kuva?.getBoundingClientRect();
  const tulos = {
    onNappula: Boolean(oma),
    piilossa: oma?.classList.contains('fokus-lehden-alla') ?? null,
    naky: oma ? getComputedStyle(oma).visibility : null,
    peitto: oma ? +getComputedStyle(oma).opacity : null,
    kuvaOsoite: kuva?.getAttribute('href') ?? null,
    kuvanKorkeus: laatikko ? +laatikko.height.toFixed(1) : 0,
    nimilappu: Boolean([...document.querySelectorAll('.city-label')]
      .find((n) => n.dataset.kaupunki === 'ateena'
        && !n.classList.contains('fokus-lehden-alla'))),
  };
  ui.fokusPohjaBbox = null;
  ui.paivitaFokusPallot();
  return tulos;
});
vaadi('7a nappula ei piiloudu lehden alle', nappula.piilossa === false,
  JSON.stringify(nappula));
vaadi('7b tinaherra on näkyvissä ja mitallinen',
  /nappula-tinaherra\.webp$/.test(nappula.kuvaOsoite ?? '')
  && nappula.naky === 'visible' && nappula.peitto === 1
  && nappula.kuvanKorkeus > 4,
  JSON.stringify(nappula));
vaadi('7c kaupungin nimilappu on yhä luettavissa', nappula.nimilappu === true);

/* --- 8. noppa ei pyörähdä itsestään -------------------------------- */
const heitto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  g.phase = 'action';
  g.autoTravel = true;
  g.travelMode = null;
  g.actionTravel('land');
  ui.render();
  const vaiheHeti = g.phase;
  const nopatEnnen = g.die;
  // Reilusti yli entisen automaattiheiton viiveen (320 ms).
  await new Promise((r) => setTimeout(r, 1400));
  const napit = [...document.querySelectorAll('.toimintorivi-liuku button')]
    .map((b) => b.getAttribute('aria-label') ?? b.title ?? '');
  return {
    vaiheHeti,
    vaiheMyohemmin: g.phase,
    nopatEnnen,
    noppaNyt: g.die,
    napit,
  };
});
vaadi('8a vaihe jäi nopanheittoon eikä noppa pyörähtänyt itsestään',
  heitto.vaiheHeti === 'roll' && heitto.vaiheMyohemmin === 'roll'
  && !heitto.noppaNyt, JSON.stringify(heitto));
vaadi('8b heitto on pelaajan oma nappi',
  heitto.napit.some((n) => /noppa/i.test(n)), JSON.stringify(heitto.napit));

/* --- 9. nopan kompositorivihje vain heiton ajaksi ------------------ */
const vihje = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const noppa = () => document.querySelector('.board-die');
  const lue = () => {
    const n = noppa();
    return n ? getComputedStyle(n).willChange : null;
  };
  const lupaus = ui.animateDie(5);
  await new Promise((r) => setTimeout(r, 250));
  const kesken = lue();
  await lupaus;
  await new Promise((r) => setTimeout(r, 300));
  return { kesken, levossa: lue() };
});
vaadi('9 nopan will-change on voimassa vain heiton ajan',
  /transform/.test(vihje.kesken ?? '') && !/transform/.test(vihje.levossa ?? ''),
  JSON.stringify(vihje));

vaadi('6 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
