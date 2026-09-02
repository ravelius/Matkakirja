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
 *      lauta liikkuisi enemmän"*). ZOOMI ON OMA VAIHEENSA JA TULEE
 *      ENSIN, ja kamera jää perillä siihen minne se ajettiin
 *      (omistajan tilaus 1.9.2026 ilta, ks. 2d ja 2e).
 *   3. ELE VOITTAA. Sormi kartalle kesken matkan pysäyttää saattamisen,
 *      eikä ajo herää uudelleen matkan loppuosalla.
 *   4. MATKAN ÄÄNI. Oma äänilippu nousee vasta nappulan liikkeen
 *      kanssa (ei ennakkozoomissa), on päällä matkan ajan ja laskeutuu
 *      viimeisellä askeleella, jotta määränpään maisema saa nousta.
 *   5. MAATAULU. Auki ollessaan se piilottaa Matkusta-napin ja piirtää
 *      alleen sumennuskerroksen; sulkeutuessa nappi palaa ja sumennus
 *      vapautuu. Sumennus on OMA ELEMENTTINSÄ .fokus-maatauluhuntu
 *      taulun rinnalla — ei taulun ::before-pseudo (ks. 5c).
 *
 * OMISTAJAN PELITESTI 27.8.2026 (iPhone ja iPad) toi samaan savukkeeseen
 * kolme korjausta lisää:
 *
 *   7. NAPPULA NÄKYY LEHDEN PÄÄLLÄ. v1097:n "Ota pallot pois" piilotti
 *      pelinappulan fokuslehden päältä, ja tinaherran myötä (#100)
 *      sääntö kääntyi itseään vastaan: *"nappula EI näy
 *      Kreikan fokuslaudalla"*. Nappula ei saa enää kantaa
 *      .fokus-lehden-alla-luokkaa. Luokkaa ei enää kirjoiteta
 *      kenellekään (30.8.2026), joten vartio on nyt varmistus siitä
 *      ettei piilotus palaa; kaupungin nimi tulee laatasta.
 *   8. NOPPA EI PYÖRÄHDÄ ITSESTÄÄN KAUPUNGISSA. *"kun aarteen on
 *      avannut, peli menee SUORAAN nopanheittoon"* — esivalittu
 *      matkustustapa saa jäädä, mutta heitto on aina pelaajan napin
 *      takana. RAJAUS TARKENTUI 2.9.2026: sääntö koskee kaupunkia,
 *      jossa vuoro on aito valinta. Kesken reittiä heitto tulee
 *      itsestään — ks. vartio 10.
 *   9. NOPAN KOMPOSITORIVIHJE VAIN HEITON AJAKSI. Pysyvä
 *      `will-change: transform` kartan siirtokuoressa lepäävässä nopassa
 *      pakotti sen ALLA olevan kartan omalle kerrokselleen, ja iPhonella
 *      kerros jäi varaamatta: *"kartat eivät näy taustalla kun
 *      pelinappula hyppii"*.
 *
 *  10. MATKA JATKUU ITSESTÄÄN (omistaja 2.9.2026: *"nopanheitto tulee
 *      jatkua automaattisesti jos ei olla saavuttu seuraavaan
 *      kohdekaupunkiin"*). Kun nappula pysähtyy reitin askelpisteeseen,
 *      seuraava heitto tulee ilman napautusta — mutta vasta pienen
 *      hengähdyksen jälkeen, ei samassa silmänräpäyksessä. Aika
 *      mitataan.
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
  const h = document.querySelector('.fokus-maatauluhuntu');
  const hs = h ? getComputedStyle(h) : null;
  const auki = {
    lippu: document.body.classList.contains('maataulu-auki'),
    taulu: t?.classList.contains('auki') ?? false,
    nappi: tila(nappi()),
    onHuntu: Boolean(h),
    huntuAuki: h?.classList.contains('auki') ?? false,
    // Huntu EI saa olla taulun sisällä (ks. 5c ja 5d).
    huntuUlkona: Boolean(h) && Boolean(t) && !t.contains(h),
    sumennus: hs ? (hs.backdropFilter || hs.webkitBackdropFilter) : '',
    maski: hs ? (hs.maskImage || hs.webkitMaskImage) : '',
    z: hs?.zIndex ?? null,
    tauluZ: t ? getComputedStyle(t).zIndex : null,
    huntuKorkeus: h ? +h.getBoundingClientRect().height.toFixed(1) : 0,
    tauluKorkeus: t ? +t.getBoundingClientRect().height.toFixed(1) : 0,
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
      huntuAuki: h?.classList.contains('auki') ?? null,
      huntuNaky: h ? getComputedStyle(h).visibility : null,
    },
  };
});
vaadi('5a maataulu aukeaa kartuutsista ja nostaa lippunsa',
  taulu.auki.taulu === true && taulu.auki.lippu === true, JSON.stringify(taulu.auki));
vaadi('5b Matkusta-nappi näkyi ennen ja piiloutui taulun ajaksi',
  taulu.ennen?.naky === 'visible' && taulu.ennen?.peitto === 1
  && taulu.auki.nappi?.naky === 'hidden' && taulu.auki.nappi?.peitto === 0,
  JSON.stringify({ ennen: taulu.ennen, auki: taulu.auki.nappi }));
/*
 * 5c ODOTUS PÄIVITETTY: SUMENNUS EI OLE ENÄÄ TAULUN ::before-PSEUDO.
 *
 * Vanha odotus luki `getComputedStyle(taulu, '::before')` ja vaati
 * z-index: -1. Omistajan pelitestipalaute 27.8.2026 iltapäivällä muutti
 * käytöksen: pseudo kattoi vain taulun ja loppui juuri ennen KREIKKA-
 * kartuutsia (eri elementti, .fokusmitat), joten sumennuksen alareuna
 * piirsi terävän viivan ruudun poikki. Pseudoa ei voi venyttää
 * kartuutsin yli, koska taulu on vierityssäiliö (overflow-y: auto) ja
 * yli venyvä lapsi kasvattaisi sen vieritysaluetta — siksi sumennus on
 * nyt karttaruudun oma lapsi .fokus-maatauluhuntu, jonka mitat lasketaan
 * molemmista kalusteista (js/fokusmitat.js luoMaataulu +
 * paivitaMaatauluHuntu, css/styles.css .fokus-maatauluhuntu).
 *
 * Vartioitava asia on sama kuin ennen — pehmeäreunainen sumennus taulun
 * ALLA — mutta mitattuna oikeasta elementistä: huntu on taulun
 * ULKOPUOLELLA, sen z-indeksin ALLA (muuten sumennus söisi oman
 * tekstinsä) ja aidosti mitattu (mittaamaton huntu jää CSS:n
 * lähtöarvoihin 0 × 0 eikä sumenna mitään).
 */
vaadi('5c taulun alla on pehmeäreunainen sumennuskerros',
  taulu.auki.onHuntu === true && taulu.auki.huntuAuki === true
  && taulu.auki.huntuUlkona === true
  && /blur/.test(taulu.auki.sumennus) && /gradient/.test(taulu.auki.maski)
  && Number(taulu.auki.z) < Number(taulu.auki.tauluZ)
  && taulu.auki.huntuKorkeus > taulu.auki.tauluKorkeus,
  JSON.stringify(taulu.auki));
// Yhä voimassa, ja nyt myös vartio paluulle pseudoratkaisuun: taulun
// laitojen yli venyvä lapsi kasvattaisi vieritysalueen (ks. 5c).
vaadi('5d sumennuskerros ei kasvata taulun vieritysaluetta',
  taulu.auki.vaakavieritys === 0, String(taulu.auki.vaakavieritys));
vaadi('5e taulun sulkeutuessa nappi palaa ja sumennus vapautuu',
  taulu.kiinni.lippu === false && taulu.kiinni.auki === false
  && taulu.kiinni.nappi?.naky === 'visible' && taulu.kiinni.nappi?.peitto === 1
  && taulu.kiinni.huntuAuki === false && taulu.kiinni.huntuNaky === 'hidden',
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
  /*
   * NÄYTTEISSÄ ON MUKANA KELLO JA NAPPULAN OLEMASSAOLO (1.9.2026).
   * Uusi siirtoketju on kaksivaiheinen — ennakkozoomi ensin, nappula
   * vasta sitten — ja juuri sitä ei voi mitata pelkästä kestosta:
   * on tiedettävä, MILLOIN liikkuva nappula ilmestyi laudalle ja mikä
   * zoomikerroin oli jo silloin voimassa.
   */
  const naytteet = [];
  const kello = setInterval(() => {
    naytteet.push({
      t: performance.now() - alkuhetki,
      ajossa: ui.kartta.kameraAjossa(),
      aani: Boolean(ui.jalkamatkanAani),
      kerroin: ui.kartta.zoomiKerroin,
      nappula: document.querySelector('.pawn-moving')?.style.transform ?? null,
    });
  }, 40);
  /*
   * ODOTETAAN NAPPULAN ILMESTYMISTÄ JA KATOAMISTA, ei kiinteää
   * alkuviivettä: siirto alkaa nyt ennakkozoomilla, joten kiinteä
   * 400 ms lopettaisi mittauksen ennen kuin nappula on edes laudalla.
   */
  let nahtiin = false;
  for (;;) {
    const laudalla = Boolean(document.querySelector('.pawn-moving'));
    if (laudalla) nahtiin = true;
    if (nahtiin && !laudalla) break;
    if (performance.now() - alkuhetki > 15000) break;
    await new Promise((r) => setTimeout(r, 40));
  }
  clearInterval(kello);
  const matkanKerroin = Math.max(...naytteet.map((n) => n.kerroin));
  // Mahdollinen paluuajo lähtisi heti viimeisen laskeutumisen jälkeen.
  await new Promise((r) => setTimeout(r, 400));
  const loppuNakyma = ui.nakyvaAlue();
  ui.kartta.ajaKamera = alkuperainenAjaKamera;
  const liikkuvat = naytteet.filter((n) => n.nappula !== null);
  const ensimmainen = liikkuvat[0];
  const viimeinen = liikkuvat.at(-1);
  return {
    askeleet: siirto.path.length,
    // Nappulan OMA kesto: ennakkozoomi ei kuulu askeltahtiin.
    kesto: ensimmainen && viimeinen ? Math.round(viimeinen.t - ensimmainen.t) : 0,
    // Milloin nappula ilmestyi laudalle — eli milloin liike alkoi.
    liikeAlkoi: ensimmainen ? Math.round(ensimmainen.t) : null,
    // Zoomikerroin sillä hetkellä kun nappula lähti liikkeelle.
    kerroinLiikkeenAlussa: ensimmainen ? +ensimmainen.kerroin.toFixed(4) : null,
    aaniPaalla: naytteet.filter((n) => n.aani).length,
    // Kuului ennen liikettä? Äänen on määrä nousta vasta askelten kanssa.
    aaniEnnenLiiketta: naytteet.some((n) => n.nappula === null && n.aani),
    aaniLopuksi: Boolean(ui.jalkamatkanAani),
    ajossa: naytteet.filter((n) => n.ajossa).length,
    nappulapaikkoja: new Set(liikkuvat.map((n) => n.nappula)).size,
    siirtyma: +Math.hypot(
      loppuNakyma.x - alkuNakyma.x, loppuNakyma.y - alkuNakyma.y,
    ).toFixed(1),
    kerroinEnnen: +kerroinEnnen.toFixed(4),
    kerroinMatkalla: +matkanKerroin.toFixed(4),
    kerroinLopuksi: +ui.kartta.zoomiKerroin.toFixed(4),
    ajot,
    // Ennakkozoomi on ENSIMMÄINEN ajo, ja ainoa jolle annetaan kerroin:
    // saatto panoroi nykyisellä mittakaavalla ja saapumisajot rajaavat
    // laatikkoon. Kertoimellisten ajojen määrä on siis suoraan vartio
    // sille, ettei paluuajo ole hiipinyt takaisin.
    ennakonKerroin: ajot[0]?.kerroin ? +ajot[0].kerroin.toFixed(4) : null,
    ennakonKesto: ajot[0]?.kesto ?? null,
    kertoimellisiaAjoja: ajot.filter((a) => a.kerroin).length,
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
/*
 * 2d KORVATTU (omistaja 1.9.2026 ilta): ennen tässä vaadittiin, että
 * saattozoomi PURKAUTUU perillä lähtökertoimeen. Tilaus kääntyi:
 * *"kartta saisi zoomautua lähemmäksi ensin ja sitten vasta pelaaja
 * alkaisi liikkua"* — ja kun zoomi on oma, katsottu vaiheensa, sen
 * kumoaminen heti perillä on nykäisy eikä palautus. Kamera jää siis
 * sinne minne se ajettiin; kylläytymisen estää siirtozoomin
 * absoluuttinen katto (js/kartta.js siirtoZoomiKerroin), ei paluuajo.
 */
vaadi('2d kamera EI palaa perillä lähtökertoimeen',
  matka.kertoimellisiaAjoja === 1
  && matka.kerroinLopuksi > matka.kerroinEnnen * 1.2,
  JSON.stringify({
    ennen: matka.kerroinEnnen, lopuksi: matka.kerroinLopuksi, ajot: matka.ajot,
  }));
/*
 * 2e ZOOMI ENSIN, NAPPULA VASTA SITTEN — tilauksen ydin. Liikkuva
 * nappula (.pawn-moving) ilmestyy laudalle vasta ennakkoajon jälkeen,
 * ja sillä hetkellä zoomikerroin on jo ennakon tavoitteessa. Kaksi
 * erillistä mittausta, koska yksinään kumpikin voi valehdella:
 * pelkkä viive voisi tulla mistä tahansa odotuksesta, ja pelkkä
 * kerroin olisi voimassa myös vanhassa yhtaikaisessa toteutuksessa.
 */
vaadi('2e ennakkozoomi ajettiin ennen nappulan liikettä',
  matka.ennakonKerroin !== null
  && matka.ennakonKerroin > matka.kerroinEnnen * 1.2
  && matka.liikeAlkoi >= matka.ennakonKesto * 0.7
  && matka.kerroinLiikkeenAlussa >= matka.ennakonKerroin * 0.98,
  JSON.stringify({
    ennakonKerroin: matka.ennakonKerroin,
    ennakonKesto: matka.ennakonKesto,
    liikeAlkoi: matka.liikeAlkoi,
    kerroinLiikkeenAlussa: matka.kerroinLiikkeenAlussa,
    kerroinEnnen: matka.kerroinEnnen,
  }));
vaadi('4a matkan äänilippu oli päällä matkan ajan', matka.aaniPaalla > 3, String(matka.aaniPaalla));
vaadi('4b äänilippu laski ennen saapumista', matka.aaniLopuksi === false);
// Ääni kuuluu nappulan liikkeeseen eikä zoomaukseen: ennakkozoomin
// aikana soi yhä lähtökaupungin oma maisema (js/ui.js animatePawnSisalla).
vaadi('4c matkan ääni ei alkanut jo ennakkozoomin aikana',
  matka.aaniEnnenLiiketta === false, JSON.stringify(matka.aaniEnnenLiiketta));

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
  /*
   * ELE VASTA KUN NAPPULA ON LIIKKEELLÄ (1.9.2026). Ennen tässä
   * odotettiin kiinteät 400 ms, mutta siirto alkaa nyt ennakkozoomilla
   * (js/ui.js ENNAKKOZOOMIN_MS) eikä nappula ole silloin vielä
   * laudalla — vartio 3b mittaisi tyhjää. Odotetaan siis liikkuvaa
   * nappulaa ja annetaan matkan päästä alkuun.
   */
  for (let i = 0; i < 60 && !document.querySelector('.pawn-moving'); i++) {
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 300));
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
   * PIILOTUSSÄÄNTÖÄ EI ENÄÄ OLE (30.8.2026): `.fokus-lehden-alla` oli
   * lehtijärjestelmän sääntö, ja pyramidissa "lehti" on koko maailma.
   * Vartio jää silti voimaan käänteisenä — se kaatuu, jos piilotus
   * palaa nappulaan. Maan ikkuna ajetaan normaalisti (paivitaMaanIkkuna
   * renderissä), joten käsin asetettavaa bboxia ei tarvita.
   */
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
    onKuva: Boolean(kuva),
    kuvanKorkeus: laatikko ? +laatikko.height.toFixed(1) : 0,
    /*
     * Kaupungin nimi tulee LAATASTA eikä elävästä kerroksesta
     * (30.8.2026): elävää .city-labelia ei ladota pyramidilaudalla
     * lainkaan, koska nimi on poltettu laattaan. Vartioitava asia on
     * siis päinvastainen kuin ennen: elävää lappua EI saa olla.
     */
    elavaNimilappu: document.querySelectorAll('.cities .city-label').length,
  };
  return tulos;
});
vaadi('7a nappula ei piiloudu lehden alle', nappula.piilossa === false,
  JSON.stringify(nappula));
/*
 * Hahmon ULKONÄKÖ ei kuulu tähän vartioon (nappula vaihtui 27.8.2026
 * tinaherrasta valkoiseksi kartionappulaksi, js/ui.js NAPPULA_TYYLI);
 * vartioitava asia on, että nappula on lehden PÄÄLLÄ näkyvissä ja
 * mitallisena eikä piiloutunut sen alle.
 */
vaadi('7b nappula on näkyvissä ja mitallinen',
  nappula.onKuva === true
  && nappula.naky === 'visible' && nappula.peitto === 1
  && nappula.kuvanKorkeus > 4,
  JSON.stringify(nappula));
vaadi('7c kaupungin nimi tulee laatasta eikä elävästä nimilapusta',
  nappula.elavaNimilappu === 0, `eläviä nimilappuja ${nappula.elavaNimilappu}`);

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

/* --- 10. matka jatkuu itsestään reitin askelpisteestä -------------- */
/*
 * Omistajan tilaus 2.9.2026, sanatarkasti: *"nopanheitto tulee jatkua
 * automaattisesti jos ei olla saavuttu seuraavaan kohdekaupunkiin"*.
 *
 * Vartio ajaa TODELLISEN ketjun: siirto reitin askelpisteeseen →
 * animaatio loppuun → ei yhtään napautusta → nopan pitää pyörähtää
 * itsestään. Aika mitataan, koska hengähdys on osa tilausta: heiton on
 * tultava vasta kun nappula on laskeutunut (js/ui.js
 * AUTOMAATTIHEITON_TAUKO_MS = 750), ei samassa silmänräpäyksessä.
 *
 * Vartio 8 (noppa ei pyörähdä itsestään KAUPUNGISSA) jää voimaan
 * sellaisenaan — automaatti tunnistaa nimenomaan reitillä olon.
 */
const jatkuu = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const { findMoves } = await import('./js/rules.js');
  await new Promise((r) => setTimeout(r, 300));

  // Pitkä maareitti: kahden askeleen heitto jää varmasti reitin varteen.
  const reitti = g.board.edges.find((e) => e.type === 'land' && e.steps >= 4);
  if (!reitti) return { virhe: 'ei tarpeeksi pitkää maareittiä' };
  ui.movingPlayerId = null;
  g.player.pos = { type: 'city', city: reitti.a };
  g.phase = 'action';
  g.autoTravel = false;
  g.travelMode = null;
  g.die = null;
  if (!g.actionTravel('land').ok) return { virhe: 'maareitti ei kelvannut' };
  g.die = 2;
  g.phase = 'move';
  g.moves = findMoves(g.board, g.player.pos, 2, { mode: 'land' });
  const valinta = [...g.moves.entries()].find(([, m]) => m.pos.type === 'edge');
  if (!valinta) return { virhe: 'kahden askeleen päässä ei reittipistettä' };

  ui.doMove(valinta[0]);
  // Siirto näytetään loppuun asti (run nollaa busy-lipun vasta silloin).
  for (let i = 0; i < 1200 && ui.busy; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
  const siirtoValmis = performance.now();
  const asema = g.player.pos.type;
  const vaihe = g.phase;
  const lippu = g.jatkaAutomaattisesti === true;

  // Tästä eteenpäin EI kosketa mihinkään: nopan on tultava itsestään.
  for (let i = 0; i < 400 && g.die === null; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
  const viive = Math.round(performance.now() - siirtoValmis);
  const tulos = { asema, vaihe, lippu, viive, noppa: g.die };

  // Siivous: automaatti pois päältä, ettei se laukea seuraavien
  // vartioiden aikana.
  for (let i = 0; i < 600 && ui.busy; i++) {
    await new Promise((r) => setTimeout(r, 10));
  }
  g.jatkaAutomaattisesti = false;
  g.phase = 'action';
  g.die = null;
  g.moves = null;
  g.player.pos = { type: 'city', city: 'ateena' };
  ui.movingPlayerId = null;
  ui.render();
  return tulos;
});
vaadi('10a siirto jäi reitin askelpisteeseen ja vuoro merkittiin jatkuvaksi',
  jatkuu.asema === 'edge' && jatkuu.vaihe === 'roll' && jatkuu.lippu === true,
  JSON.stringify(jatkuu));
vaadi('10b noppa pyörähti itsestään ilman napautusta',
  Number.isInteger(jatkuu.noppa) && jatkuu.noppa >= 1 && jatkuu.noppa <= 6,
  JSON.stringify(jatkuu));
vaadi('10c heitto tuli hengähdyksen jälkeen (0,4–2,5 s siirron lopusta)',
  jatkuu.viive > 400 && jatkuu.viive < 2500, JSON.stringify(jatkuu));

vaadi('6 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
