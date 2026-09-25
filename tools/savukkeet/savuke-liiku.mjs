/*
 * Savuke: LIIKU-NAPPI JA NELJÄ KULKUTAPAA (karttauudistus erä 8).
 *
 * Omistajan tilaus 13.9.2026 (Raamattu, osio Kaupungit, KARTTAUUDISTUS,
 * sanatarkasti): *"Alareunassa onkin kokojan nakyvilla pieni 'liiku'
 * nappi. Liikkumiseen tulee nelja vaihtoehtoa: liftaus (ilmainen),
 * bussi kahden vierekkaisen kaupungin valilla (50p), laiva ja lento
 * entisellaan. kartta zoomautuu automaattisesti vanhaan tapaan
 * kauemmas riippuen siita mika liikkumisvaihtoehto on valittuna."*
 *
 * Ja PAATOKSET 1 kohta 4: *"liftaus tarkoittaa nopalla liikkumista…
 * siina kuluu saman verran aikaa. siirtyminen tosin muutetaan
 * animaatiossa ei hyppivaksi pelinapiksi, vaan kuin autokyydiksi joka
 * kiihdyttaa alussa ja jarruttaa lopussa ja liikutaan nopan antaman
 * matkan verran."*
 *
 * VARTIOT:
 *   1. NELJÄ TAPAA. Liiku-napin liu'ussa on neljä matkanappia
 *      (liftaus, bussi, laiva, lento), ja monitoiminapin nimi on
 *      "Liiku".
 *   2. HINNAT JA AIKA. Jokainen tapa ajetaan kerran ja mitataan
 *      `money` sekä kulunut aika ennen ja jälkeen: liftaus 0 p / 6 h,
 *      bussi 50 p / 0 h, laiva 100 p / 6 h, lento 300 p / 6 h.
 *   3. KARTTA RAJAUTUU TAVAN MUKAAN JA PALAA. Kameran näkyvä leveys
 *      (lautayksikköä) kasvaa matkan ajaksi ja palaa saapumisen
 *      jälkeen maan rajaukseen.
 *   4. AUTOKYYTI EI HYPI. Liftauksen nappulan nopeusprofiili kolmesta
 *      kohdasta: alku < keski > loppu (kiihdytys ja jarrutus), ja
 *      nappulan pystykorkeus pysyy nollassa koko matkan.
 *   5. AUTOMAATTINEN NOPANHEITTO SÄILYY (Raamattu KARTTAUUDISTUKSEN
 *      PAATOKSET 5, omistaja 13.9.2026). Sisämaan vuoro alkaa
 *      automaattisella heitolla vaikka rahaa on bussiin, ja bussi on
 *      yhä valittavissa Liiku-napista ennen heittoa; laivareitillä
 *      heitto on niin ikään automaattinen.
 *
 * VASTAKOKEET (kaikki ajetaan ja kirjataan):
 *   A. ILMAN RAHAA bussi ja laiva eivät ole valittavissa — napit ovat
 *      estettyjä ja kertovat hinnan.
 *   B. VAIHEKÄYRÄ RIISUTTUNA (`kyyti: false` eli entinen hyppyketju)
 *      nopeusprofiiliväite KAATUU: kiihdytystä ja jarrutusta ei ole,
 *      ja nappula hyppii (pystykorkeus > 0).
 *   C. ERÄN 8 VANHA EHTO (`modes.length === 1` bussi mukaan luettuna)
 *      antaisi samassa sisämaan kaupungissa EI-automaattisen heiton —
 *      punainen, eli vartio 5 erottelee vanhan ja uuden säännön.
 *
 * MIKSI VARTIO: jokainen takeista katoaa hiljaa. Vaihekäyrä on yksi
 * valinnainen kenttä (`{ vaihe }`), jonka unohtuminen palauttaa
 * hyppivän nappulan ilman että mikään kaatuu; bussin hinta on yksi
 * vähennys; aikakulu on yksi `aikaKuluu: false`; ja kulkutapakohtainen
 * rajaus on yksi haara ennakkozoomissa.
 *
 *   node tools/savukkeet/savuke-liiku.mjs [kansio] [--dpr N]
 *
 * Pallotila tarvitsee ämpärin (Globe.gl ja laatat) — se reititetään
 * selaimelle Noden fetchin kautta (NODE_USE_ENV_PROXY=1, malli
 * savuke-siirtokoreografia.mjs), ja peli aloitetaan tallenteesta
 * Ateenassa: sieltä lähtee sekä maa- että meritie ja siellä on
 * lentokenttä, joten kaikki neljä tapaa mahtuvat yhteen kaupunkiin.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
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

/* Ämpäri Noden kautta (malli savuke-siirtokoreografia.mjs). */
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

/* Tallenne pallotilaan: Fogg Ateenassa, aarre löydetty (Liiku näkyvissä). */
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

/*
 * KUVAKAAPPAUS RAPORTTIIN: kartan valokuvamainen pinta tekee 390 × 844
 * png:stä yli 400 kt, ja raporttikuvien katto on 400 kt. Kaappaus
 * pienennetään siksi selaimen omalla kankaalla — sama kuva, pienempi
 * tiedosto; lukuja ei mitata kuvasta vaan DOMista, joten mittakaava ei
 * vaikuta mihinkään.
 */
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
    return kangas.toDataURL('image/png').split(',')[1];
  }, [png, skaala]);
  writeFileSync(join(ULOS, nimi), Buffer.from(pieni, 'base64'));
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: DPR,
  serviceWorkers: 'block',
  isMobile: true,
  hasTouch: true,
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen tila */ }
}, TALLENNE);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(e.message));
// Luentapalvelin katkaistaan: savuke ei kuluta generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
/*
 * ÄMPÄRI NODEN KAUTTA (kontin selain ei osaa välityspalvelinta):
 * Globe.gl-kirjasto ja laatat reititetään täältä. Äänet ja videot
 * torjutaan — ne eivät kuulu mittaukseen, ja ilman torjuntaa sivun
 * `load` ei koskaan valmistu kontissa (pyynnöt jäävät roikkumaan).
 */
await sivu.route(/media\.matkakirja\.app\//, async (route) => {
  const url = route.request().url();
  if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
});
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
await sivu.waitForTimeout(3000);

const alku = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 1500));
  return { kaupunki: game.cityOf()?.id, pallo: ui.pallolautaPaalla(), tavat: game.travelModes() };
});
vaadi('pallo on lauta ja Ateenasta lähtee kaikki neljä tapaa',
  alku.pallo && alku.kaupunki === 'ateena'
  && ['land', 'bus', 'sea', 'fly'].every((t) => alku.tavat.includes(t)),
  JSON.stringify(alku));

/* ---- 1. Liiku-napin liuku: neljä matkanappia ---------------------- */

const napit = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'ateena' };
  game.phase = 'action';
  game.player.money = 300;
  ui.liukuAuki = true;
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
  const rivi = document.querySelector('.toimintorivi');
  const monitoimi = rivi?.querySelector('.monitoimi-nappi');
  const liuku = [...(rivi?.querySelectorAll('.toimintorivi-liuku > button') ?? [])];
  const kuori = rivi?.querySelector('.toimintorivi-liuku');
  return {
    liikuNimi: monitoimi?.getAttribute('aria-label') ?? null,
    nimet: liuku.map((b) => b.getAttribute('aria-label')),
    estetyt: liuku.filter((b) => b.disabled).map((b) => b.getAttribute('aria-label')),
    leveydet: liuku.map((b) => Math.round(b.getBoundingClientRect().width)),
    korkeudet: liuku.map((b) => Math.round(b.getBoundingClientRect().height)),
    liukuLeveys: kuori ? Math.round(kuori.getBoundingClientRect().width) : 0,
  };
});
vaadi('monitoiminapin nimi on Liiku', napit.liikuNimi === 'Liiku', String(napit.liikuNimi));
vaadi('liu\'ussa on neljä kulkutapaa', napit.nimet.length === 4, JSON.stringify(napit.nimet));
vaadi('kulkutavat ovat liftaus, bussi, laiva ja lento',
  ['Liftaus', 'Bussilla', 'Laivalla', 'Lentäen'].every((n, i) => (napit.nimet[i] ?? '').startsWith(n)),
  JSON.stringify(napit.nimet));
vaadi('rahoilla mikään neljästä ei ole estettynä', napit.estetyt.length === 0, JSON.stringify(napit.estetyt));
vaadi('390 px: napit mahtuvat riviin eivätkä kutistu kosketusalan alle',
  napit.leveydet.every((w) => w >= 44) && napit.korkeudet.every((h) => h >= 44)
  && napit.leveydet.reduce((a, b) => a + b, 0) <= napit.liukuLeveys + 4,
  JSON.stringify(napit));

/* ---- 1b. neljäs nappi ei peitä Pulua eikä sen kuplia -------------- */

/*
 * PULU ON KELLUVA SIVUELEMENTTI kartan päällä (js/pollo.js), ja sen
 * kuplapino nousee napin yläpuolelle. Neljäs matkanappi leventää riviä
 * oikealle, joten 390 px:n ruudulla on mitattava, ettei rivi mene
 * pulun napin tai kuplan päälle. Mitataan laatikoiden leikkaus.
 */
const pulu = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { polloVihje } = await import('./js/pollo.js');
  ui.liukuAuki = true;
  ui.render();
  polloVihje('Minne matka? Liftaus on ilmainen, bussi vie perille nopeammin.');
  await new Promise((r) => setTimeout(r, 900));
  const laatikko = (el) => {
    const r = el?.getBoundingClientRect();
    return r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null;
  };
  const leikkaus = (a, b) => {
    if (!a || !b) return 0;
    const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return w > 0 && h > 0 ? Math.round(w * h) : 0;
  };
  const napit = [...document.querySelectorAll('.toimintorivi-liuku > button')].map(laatikko);
  const nappi = laatikko(document.querySelector('.pollo-nappi'));
  const kupla = laatikko(document.querySelector('.pollo-kuplapino'))
    ?? laatikko(document.querySelector('.pollo-vihje'));
  // Vertailu: nopanheiton liuku (kaksi nappia) samassa rivissä.
  const g = window.matkakirja.game;
  const pos = { ...g.player.pos };
  g.actionTravel('land');
  ui.liukuAuki = true;
  ui.render();
  await new Promise((r) => setTimeout(r, 400));
  const vertailunNapit = [...document.querySelectorAll('.toimintorivi-liuku > button')]
    .map(laatikko);
  const vertailu = {
    maara: vertailunNapit.length,
    napinPaalla: vertailunNapit.reduce((s, n) => s + leikkaus(n, nappi), 0),
  };
  g.actionCancelTravel();
  g.player.pos = pos;
  g.phase = 'action';
  ui.liukuAuki = true;
  ui.render();
  await new Promise((r) => setTimeout(r, 400));
  return {
    napit,
    nappi,
    kupla,
    vertailu,
    napinPaalla: napit.reduce((s, n) => s + leikkaus(n, nappi), 0),
    kuplanPaalla: napit.reduce((s, n) => s + leikkaus(n, kupla), 0),
  };
});
vaadi('Pulun nappi ja kupla löytyivät mittaukseen',
  Boolean(pulu.nappi) && Boolean(pulu.kupla), JSON.stringify(pulu));
/*
 * PULUN NAPPI ON AINA RIVIN OIKEAN REUNAN PÄÄLLÄ — MYÖS ENNEN TÄTÄ
 * ERÄÄ. Liuku on `position: absolute; left: 0; right: 0`, joten rivin
 * oikea reuna on sama oli nappeja kaksi, kolme tai neljä; pulun
 * kelluva nappi lepää sen kulmalla. Vartio mittaa siksi EI nollaa vaan
 * sen, ettei neljäs nappi tee leikkauksesta pahempaa kuin kahden napin
 * rivillä (nopanheiton liuku) — ja että ikonista jää selvästi yli
 * puolet vapaaksi.
 */
vaadi('neljäs nappi ei kasvata Pulun napin päällekkäisyyttä',
  pulu.napinPaalla <= pulu.vertailu.napinPaalla + 1,
  `neljällä ${pulu.napinPaalla} px², kahdella ${pulu.vertailu.napinPaalla} px²`);
vaadi('uloimmasta matkanapista jää yli puolet vapaaksi',
  pulu.napinPaalla < (pulu.napit.at(-1).w * pulu.napit.at(-1).h) / 2,
  `leikkaus ${pulu.napinPaalla} px², nappi `
  + `${Math.round(pulu.napit.at(-1).w)}×${Math.round(pulu.napit.at(-1).h)} px`);
vaadi('neljä matkanappia ei peitä Pulun kuplaa',
  pulu.kuplanPaalla === 0, `leikkaus ${pulu.kuplanPaalla} px²`);
await kaappaa(sivu, 'karttauudistus-8-pulu-390.png');
await sivu.evaluate(async () => {
  const { polloVihjePois } = await import('./js/pollo.js');
  polloVihjePois();
  await new Promise((r) => setTimeout(r, 300));
});

/* ---- VASTAKOE A: ilman rahaa bussi ja laiva harmaina -------------- */

const koyha = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'ateena' };
  game.phase = 'action';
  game.player.money = 0;
  ui.liukuAuki = true;
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
  const liuku = [...document.querySelectorAll('.toimintorivi-liuku > button')];
  const tila = liuku.map((b) => ({
    nimi: (b.getAttribute('aria-label') ?? '').split(' — ')[0],
    estetty: b.disabled,
    syy: (b.getAttribute('aria-label') ?? '').split(' — ')[1] ?? null,
  }));
  const tavat = game.travelModes();
  game.player.money = 300;
  ui.render();
  return { tila, tavat };
});
const kaytettavissa = (nimi) => koyha.tila.find((t) => t.nimi === nimi);
vaadi('VASTAKOE A: ilman rahaa bussi ei ole valittavissa',
  kaytettavissa('Bussilla')?.estetty === true && !koyha.tavat.includes('bus'),
  JSON.stringify(koyha));
vaadi('VASTAKOE A: ilman rahaa laiva ei ole valittavissa',
  kaytettavissa('Laivalla')?.estetty === true && !koyha.tavat.includes('sea'),
  JSON.stringify(koyha));
vaadi('VASTAKOE A: liftaus on yhä valittavissa (ilmainen)',
  kaytettavissa('Liftaus')?.estetty === false && koyha.tavat.includes('land'),
  JSON.stringify(koyha));

/* ---- 5. automaattinen nopanheitto: bussi ei estä sitä ------------- */

/*
 * OMISTAJA 13.9.2026 (Raamattu KARTTAUUDISTUKSEN PAATOKSET 5,
 * sanatarkasti): *"Bussilippu vie aina suoraan seuraavaan kaupunkiin
 * ilman nopanheittoa, joten automaattinen nopanheitto on edelleen
 * voimassa, koska se koskee ainoastaan vain liftausta. Kaikissa
 * tapauksissa paitsi laivareitillä."* ja *"Ja laiva  reitilläkään ei
 * taas ole muuta vaihtoehtoa kuin laiva, niin siellekin on
 * automaattinen nopanheitto."*
 *
 * Mitattava asia on VUORON ALKU: sisämaan kaupungissa, jossa rahat
 * riittävät bussilippuun, vuoro alkaa silti suoraan nopanheitosta
 * (vaihe 'roll', travelMode 'land') — ja bussi on yhä valittavissa
 * Liiku-napista, koska noppaa ei ole heitetty. Laivareitillä sama.
 *
 * VASTAKOE C ajetaan samoista luvuista: erän 8 (v1845) ehto
 * `modes.length === 1` laskee bussin noppatavaksi ja antaisi
 * EI-automaattisen heiton — se on punainen tässä tilanteessa.
 */
const automaatti = await sivu.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  const alkuperainen = { ...g.player.pos };
  g.player.money = 300;

  /*
   * TUTKITTAVA VAIMENNETAAN mittauksen ajaksi: 'stay' on aito valinta
   * (liikkua vai jäädä vastaamaan) ja esti automaattisen heiton jo
   * ennen erää 8. Mitattava asia on BUSSIN vaikutus, joten kaupungin
   * aarre/tehtävä ei saa sotkea lukemaa. Palautetaan lopuksi.
   */
  const tehtavaEnnallaan = g.tehtavaTarjolla.bind(g);
  g.tehtavaTarjolla = () => false;

  // Sisämaan kaupunki: vain liftaus ja bussi (ei satamaa, ei kenttää) —
  // juuri se tilanne, jossa erä 8 pysäytti vuoron.
  let sisamaa = null;
  let sisamaanTavat = null;
  for (const id of g.board.cityById.keys()) {
    g.player.pos = { type: 'city', city: id };
    g.phase = 'action';
    const tavat = g.travelModes().slice().sort();
    if (tavat.join(',') === 'bus,land') { sisamaa = id; sisamaanTavat = tavat; break; }
  }
  const mittaa = () => {
    g.phase = 'action';
    const tavat = g.travelModes().slice().sort();
    g.beginTurn();
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    return {
      tavat,
      vaihe: g.phase,
      tapa: g.travelMode,
      auto: g.autoTravel,
      muitaTapoja: g.muitaTapojaTarjolla(),
      peruuOnnistuu: null,
    };
  };

  let maalla = null;
  if (sisamaa) {
    g.player.pos = { type: 'city', city: sisamaa };
    maalla = mittaa();
    maalla.peruuOnnistuu = g.actionCancelTravel().ok;
    maalla.vaiheParuun = g.phase;
    maalla.tavatParuun = g.travelModes().slice().sort();
  }

  // Laivareitti: nappula meren kaaren askelpisteessä.
  let meri = null;
  for (const e of g.board.edgeById.values()) {
    if (e.type !== 'sea' || e.steps < 2) continue;
    g.player.pos = { type: 'edge', edge: e.id, idx: 1 };
    meri = mittaa();
    meri.kaari = e.id;
    break;
  }

  g.tehtavaTarjolla = tehtavaEnnallaan;
  g.jatkaAutomaattisesti = false;
  g.player.pos = alkuperainen;
  g.phase = 'action';
  g.travelMode = null;
  g.autoTravel = false;
  ui.render();
  return { sisamaa, sisamaanTavat, maalla, meri };
});

vaadi('sisämaan kaupunki (liftaus + bussi) löytyi mittaukseen',
  Boolean(automaatti.maalla), JSON.stringify(automaatti));
if (automaatti.maalla) {
  const m = automaatti.maalla;
  vaadi(`sisämaan vuoro alkaa automaattisella heitolla vaikka rahaa on bussiin (${automaatti.sisamaa})`,
    m.auto === true && m.vaihe === 'roll' && m.tapa === 'land' && m.tavat.includes('bus'),
    JSON.stringify(m));
  vaadi('bussi on yhä valittavissa Liiku-napista ennen heittoa',
    m.muitaTapoja === true && m.peruuOnnistuu === true
      && m.vaiheParuun === 'action' && m.tavatParuun.includes('bus'),
    JSON.stringify(m));
  /*
   * VASTAKOE C: erän 8 ehto samoilla luvuilla. Jos bussi lasketaan
   * noppatavaksi, `modes.length === 1` on epätosi ja vuoro jäisi
   * odottamaan napinpainallusta — väite kaatuu, eli vastakoe erottelee.
   */
  const vanhaEhto = m.tavat.length === 1 && m.tavat[0] !== 'stay';
  vaadi('VASTAKOE C: erän 8 ehto (bussi estää automaattisen) EI antaisi heittoa → punainen',
    vanhaEhto === false,
    `vanha ehto antoi ${vanhaEhto} tavoilla ${m.tavat.join(',')}`);
}
vaadi('laivareitillä vuoro alkaa automaattisella heitolla',
  Boolean(automaatti.meri) && automaatti.meri.auto === true
    && automaatti.meri.vaihe === 'roll' && automaatti.meri.tapa === 'sea',
  JSON.stringify(automaatti.meri));
vaadi('laivareitillä ei ole muuta valittavaa (bussi ei ulotu merelle)',
  Boolean(automaatti.meri) && automaatti.meri.muitaTapoja === false,
  JSON.stringify(automaatti.meri));

/* ---- 2.–3. neljä matkaa: raha, aika ja kameran etäisyys ----------- */

/**
 * Yksi mitattu matka. `tapa` on liftaus | bussi | laiva | lento.
 * Kaikki alkaa Ateenasta ja 300 punnasta, jotta lukemat ovat vertailu-
 * kelpoisia; aika luetaan game.elapsedHours()istä eikä kellosta.
 */
const matka = (tapa) => sivu.evaluate(async (mikaTapa) => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  g.player.money = 300;
  g.autoTravel = false;
  g.travelMode = null;
  ui.suljeMatkavalikko();
  ui.render();
  await new Promise((r) => setTimeout(r, 700));

  const kam = ui.kamera();
  const leveys = () => kam.kameranTila()?.leveys ?? NaN;
  /*
   * LÄHTÖTILANNE ON AINA MAAN RAJAUS. Ilman tätä "ennen" olisi se,
   * mihin edellinen mitattu matka jätti kameran, eikä kulkutavan
   * rajauksen vertailukohta olisi mikään.
   */
  kam.pysaytaKameraAjo?.();
  await ui.pallolauta.saavu({ kesto: 0 });
  await new Promise((r) => setTimeout(r, 700));
  const ennen = { money: g.player.money, tunnit: g.elapsedHours(), leveys: leveys() };
  const lahtoPos = { ...g.player.pos };
  let matkanLevein = ennen.leveys;
  let kaynnissa = true;
  const seuraa = () => {
    matkanLevein = Math.max(matkanLevein, leveys());
    if (kaynnissa) requestAnimationFrame(seuraa);
  };
  requestAnimationFrame(seuraa);

  if (mikaTapa === 'liftaus') {
    if (!g.actionTravel('land').ok) return { virhe: 'ei maareittiä' };
    g.die = 4;
    g.phase = 'move';
    g.moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
    const parit = [...g.moves.entries()]
      .sort((a, b) => (Number(b[1].pos.type === 'city') - Number(a[1].pos.type === 'city'))
        || (b[1].path.length - a[1].path.length));
    if (!parit.length) return { virhe: 'ei siirtoja' };
    ui.doMove(parit[0][0]);
  } else if (mikaTapa === 'bussi') {
    const kohde = g.busDestinations()[0];
    if (!kohde) return { virhe: 'ei bussikohdetta' };
    ui.doBus(kohde);
  } else if (mikaTapa === 'laiva') {
    if (!g.actionTravel('sea').ok) return { virhe: 'ei merireittiä' };
    g.die = 3;
    g.phase = 'move';
    g.moves = findMoves(g.board, g.player.pos, 3, { mode: 'sea' });
    const parit = [...g.moves.entries()]
      .sort((a, b) => (Number(b[1].pos.type === 'city') - Number(a[1].pos.type === 'city'))
        || (b[1].path.length - a[1].path.length));
    if (!parit.length) return { virhe: 'ei merisiirtoja' };
    ui.doMove(parit[0][0]);
  } else {
    const kohde = g.airportDestinations()[0];
    if (!kohde) return { virhe: 'ei lentokohdetta' };
    ui.doFly(kohde);
  }

  // Odotetaan matkan loppuun: nappula pois laudalta ja kamera paikalleen.
  let nahtiin = false;
  const alkuhetki = performance.now();
  for (;;) {
    const laudalla = Boolean(document.querySelector('.pawn-moving'));
    if (laudalla) nahtiin = true;
    if (nahtiin && !laudalla) break;
    if (performance.now() - alkuhetki > 25000) break;
    await new Promise((r) => setTimeout(r, 30));
  }
  for (let i = 0; i < 120; i += 1) {
    if (!kam.kameraAjossa()) break;
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 600));
  kaynnissa = false;
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;

  const jalkeen = { money: g.player.money, tunnit: g.elapsedHours(), leveys: leveys() };
  /*
   * MATKAN OMA LAAJUUS lautayksikköinä ruudun leveydellä: lähdön ja
   * määränpään laatikko, korkeusehto muutettuna leveydeksi kuvasuhteella
   * (sama kaava kuin kameran kameranKohde). Tätä vasten mitataan, näkyikö
   * KOKO matka ruudulla sen ajan.
   */
  const { pixelOf } = await import('./js/rules.js');
  const pa = pixelOf(g.board, lahtoPos);
  const pb = pixelOf(g.board, g.player.pos);
  const kotelo = document.querySelector('.pallo-kotelo') ?? document.body;
  const matkanLaajuus = Math.max(
    Math.abs(pb.x - pa.x),
    (Math.abs(pb.y - pa.y) * kotelo.clientWidth) / Math.max(1, kotelo.clientHeight),
  );
  /*
   * MAAN RAJAUS VERTAILUKOHDAKSI: ajetaan sama saapumisrajaus kerran
   * lisää nollakestolla ja katsotaan, oliko kamera jo siinä. Näin
   * väite *"kartta palaa maan rajaukseen"* mitataan itse rajauksesta
   * eikä siitä, meneekö luku vain johonkin suuntaan.
   */
  await ui.pallolauta.saavu({ kesto: 0 });
  await new Promise((r) => setTimeout(r, 500));
  const maanRajaus = leveys();
  return {
    ennen, jalkeen, matkanLevein, maanRajaus, matkanLaajuus, kaupunki: g.cityOf()?.id ?? null,
  };
}, tapa);

const HINNAT = { liftaus: 0, bussi: 50, laiva: 100, lento: 300 };
const AIKA = { liftaus: 6, bussi: 0, laiva: 6, lento: 6 };
const mitatut = {};
for (const tapa of ['liftaus', 'bussi', 'laiva', 'lento']) {
  /* eslint-disable no-await-in-loop */
  const tulos = await matka(tapa);
  mitatut[tapa] = tulos;
  if (tulos.virhe) {
    vaadi(`${tapa}: matka onnistuu`, false, tulos.virhe);
    continue;
  }
  const maksoi = tulos.ennen.money - tulos.jalkeen.money;
  const aika = tulos.jalkeen.tunnit - tulos.ennen.tunnit;
  vaadi(`${tapa}: hinta ${maksoi} p (odotus ${HINNAT[tapa]} p)`, maksoi === HINNAT[tapa],
    JSON.stringify(tulos));
  vaadi(`${tapa}: aikaa kului ${aika} h (odotus ${AIKA[tapa]} h)`, aika === AIKA[tapa],
    JSON.stringify(tulos));
  vaadi(`${tapa}: koko matka näkyi ruudulla matkan ajan`,
    tulos.matkanLevein >= tulos.matkanLaajuus,
    `näkyvä ${Math.round(tulos.matkanLevein)} < matkan laajuus ${Math.round(tulos.matkanLaajuus)}`);
  const ero = Math.abs(tulos.jalkeen.leveys - tulos.maanRajaus) / Math.max(1, tulos.maanRajaus);
  vaadi(`${tapa}: kartta palasi saapumisen jälkeen maan rajaukseen`,
    tulos.kaupunki ? ero < 0.12 : true,
    `perillä ${Math.round(tulos.jalkeen.leveys)}, maan rajaus ${Math.round(tulos.maanRajaus)}`);
}

/* ---- 3b. kulkutapa ratkaisee rajauksen samalla kaarella ----------- */

/*
 * Sama lähtö ja sama määränpää, eri kulkutapa: laiva saa suuremman
 * marginaalin kuin liftaus ja bussi (MATKARAJAUKSEN_MARGINAALI), ja
 * tuntematon tapa ei rajaa lainkaan (silloin ennakkozoomi on entinen).
 * Mitataan suoraan rajausfunktiosta, jotta väite ei jää reittien
 * sattuman varaan.
 */
const rajaukset = await sivu.evaluate(() => {
  const { ui, game: g } = window.matkakirja;
  g.player.pos = { type: 'city', city: 'ateena' };
  const polku = [{ type: 'city', city: 'sofia' }];
  const laske = (tapa) => ui.matkarajaus(tapa, g.player.pos, polku);
  const koko = (r) => (r ? r.bbox.w * (1 + 2 * r.marginaali) : null);
  return {
    land: koko(laske('land')),
    bus: koko(laske('bus')),
    sea: koko(laske('sea')),
    fly: laske('fly'),
    tyhja: laske(null),
  };
});
vaadi('laiva rajaa väljemmin kuin liftaus samalla kaarella',
  rajaukset.sea > rajaukset.land * 1.1, JSON.stringify(rajaukset));
vaadi('bussi rajaa kuten liftaus (sama kaari, sama marginaali)',
  Math.abs(rajaukset.bus - rajaukset.land) < 0.5, JSON.stringify(rajaukset));
vaadi('lento ja tuntematon tapa eivät rajaa tästä (lennolla oma rajaus)',
  rajaukset.fly === null && rajaukset.tyhja === null, JSON.stringify(rajaukset));

/* ---- 4. nappulan nopeusprofiili: kiihdytys ja jarrutus ------------ */

/**
 * Nappulan ruutuliike ilman saattavaa kameraa (`saatto: false`), jotta
 * mitattu nopeus on NAPPULAN eikä kameran. `kyyti: false` on vastakoe
 * B: sama matka entisellä hyppyketjulla ja ilman vaihekäyrää.
 */
const profiili = (kyyti) => sivu.evaluate(async (kyytiPaalla) => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  g.player.money = 300;
  ui.render();
  /*
   * KAMERA PAIKALLEEN ENNEN MITTAUSTA. Nappulan ruutupaikka lasketaan
   * pallon pinnasta joka kehys, joten liikkuva kamera näkyisi
   * nappulan nopeudessa — ja juuri se on tämän mittauksen kohde.
   */
  const kam = ui.kamera();
  kam.pysaytaKameraAjo?.();
  await ui.pallolauta.saavu({ kesto: 0 });
  for (let i = 0; i < 60; i += 1) {
    if (!kam.kameraAjossa()) break;
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 1200));

  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  if (!parit.length) return { virhe: 'ei siirtoja' };
  if (parit[0][1].path.length < 3) return { virhe: 'liian lyhyt matka profiiliin' };
  const polku = parit[0][1].path;
  const player = g.player;
  const from = player.pos;

  const naytteet = [];
  let kaynnissa = true;
  const kehys = () => {
    const el = document.querySelector('.pawn-moving');
    if (el) {
      const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform);
      const hahmo = el.querySelector('.pawn-hahmo');
      const h = /translate\(0,([-\d.]+)\)/.exec(hahmo?.getAttribute('transform') ?? '');
      if (m) {
        naytteet.push({
          t: performance.now(),
          x: Number(m[1]),
          y: Number(m[2]),
          korkeus: h ? Math.abs(Number(h[1])) : 0,
        });
      }
    }
    if (kaynnissa) requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);

  await ui.animatePawn(player, from, polku, autokyydinAskel(polku.length), {
    saatto: false, maitse: true, kyyti: kyytiPaalla, tapa: 'land',
  });
  kaynnissa = false;
  player.pos = from;
  ui.render();

  // Nopeus kolmessa kohdassa: matkan alku-, keski- ja loppukolmannes.
  const n = naytteet.length;
  if (n < 12) return { virhe: `liian vähän näytteitä (${n})` };
  const kolmannes = (a, b) => {
    let matkaPx = 0;
    for (let i = a + 1; i < b; i += 1) {
      matkaPx += Math.hypot(naytteet[i].x - naytteet[i - 1].x, naytteet[i].y - naytteet[i - 1].y);
    }
    const kesto = naytteet[b - 1].t - naytteet[a].t;
    return kesto > 0 ? matkaPx / kesto : 0;
  };
  return {
    naytteita: n,
    alku: kolmannes(0, Math.floor(n / 3)),
    keski: kolmannes(Math.floor(n / 3), Math.floor((2 * n) / 3)),
    loppu: kolmannes(Math.floor((2 * n) / 3), n),
    korkein: Math.max(...naytteet.map((s) => s.korkeus)),
  };
}, kyyti);

const kyydilla = await profiili(true);
vaadi('liftauksen nopeusprofiili mitattiin', !kyydilla.virhe, JSON.stringify(kyydilla));
const luvut = (p) => `alku ${p.alku?.toFixed(3)} · keski ${p.keski?.toFixed(3)} · loppu ${p.loppu?.toFixed(3)} px/ms`;
if (!kyydilla.virhe) {
  vaadi(`autokyyti kiihtyy alussa (${luvut(kyydilla)})`,
    kyydilla.keski > kyydilla.alku * 1.5, luvut(kyydilla));
  vaadi(`autokyyti jarruttaa lopussa (${luvut(kyydilla)})`,
    kyydilla.keski > kyydilla.loppu * 1.5, luvut(kyydilla));
  vaadi(`autokyyti ei hypi: nappulan pystykorkeus ${kyydilla.korkein.toFixed(2)} px`,
    kyydilla.korkein < 0.01, String(kyydilla.korkein));
}

/* ---- VASTAKOE B: vaihekäyrä riisuttuna sama väite kaatuu ---------- */

const ilman = await profiili(false);
vaadi('VASTAKOE B: hyppyketju mitattiin', !ilman.virhe, JSON.stringify(ilman));
if (!ilman.virhe) {
  const kiihtyy = ilman.keski > ilman.alku * 1.5;
  const jarruttaa = ilman.keski > ilman.loppu * 1.5;
  const hyppii = ilman.korkein > 0.01;
  vaadi(`VASTAKOE B: ilman vaihekäyrää profiiliväite EI pidä (${luvut(ilman)})`,
    !(kiihtyy && jarruttaa), `vastakoe ei erottele: ${luvut(ilman)}`);
  vaadi(`VASTAKOE B: ilman vaihekäyrää nappula hyppii (${ilman.korkein.toFixed(2)} px)`,
    hyppii, `pystykorkeus ${ilman.korkein}`);
}

/* ---- kuvakaappaus ja yhteenveto ---------------------------------- */

await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'ateena' };
  game.phase = 'action';
  game.player.money = 300;
  ui.liukuAuki = true;
  ui.render();
  await new Promise((r) => setTimeout(r, 600));
});
await kaappaa(sivu, 'karttauudistus-8-liiku-390.png');

vaadi('sivuvirheitä ei tullut', virheet.length === 0, virheet.join(' | '));

const taulu = ['tapa       raha     aika    leveys ennen → matkalla → perillä (lautayksikköä)'];
for (const [tapa, t] of Object.entries(mitatut)) {
  if (t.virhe) { taulu.push(`${tapa.padEnd(10)} VIRHE ${t.virhe}`); continue; }
  taulu.push(`${tapa.padEnd(10)} ${String(t.ennen.money - t.jalkeen.money).padStart(4)} p `
    + `${String(t.jalkeen.tunnit - t.ennen.tunnit).padStart(3)} h  `
    + `${Math.round(t.ennen.leveys)} → ${Math.round(t.matkanLevein)} → ${Math.round(t.jalkeen.leveys)}`
    + `  (matkan laajuus ${Math.round(t.matkanLaajuus)}, maan rajaus ${Math.round(t.maanRajaus)}, `
    + `perillä ${t.kaupunki ?? 'reitillä'})`);
}
taulu.push('');
taulu.push(`pulun napin päällekkäisyys: neljällä napilla ${pulu.napinPaalla} px², `
  + `vertailu ${pulu.vertailu.maara} napilla ${pulu.vertailu.napinPaalla} px²; `
  + `kuplan päällä ${pulu.kuplanPaalla} px²`);
taulu.push(`nopeusprofiili, autokyyti: ${luvut(kyydilla)} · korkein ${kyydilla.korkein?.toFixed(2)} px`);
taulu.push(`nopeusprofiili, hyppyketju: ${luvut(ilman)} · korkein ${ilman.korkein?.toFixed(2)} px`);
taulu.push('');
taulu.push(...rivit);
writeFileSync(join(ULOS, 'savuke-liiku.txt'), `${taulu.join('\n')}\n`);
console.log(`\n${taulu.slice(0, 8).join('\n')}`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
