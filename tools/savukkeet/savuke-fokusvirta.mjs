/*
 * Savuke: fokusmoodin annosteluvirta Ateenassa (js/fokusvirta.js).
 *
 * Yksikkötestit (tests/fokusvirta.test.mjs) vahtivat tilakoneen, mutta
 * eivät sitä, että virta oikeasti piirtyy selaimessa oikeille pinnoille
 * ja vie pelaajan vaiheesta toiseen. Juuri se on tämän paketin riski:
 * virta piirtyy kolmelle eri pinnalle oman moduulinsa kautta eikä
 * ui.js:n renderin läpi.
 *
 * KOLME PINTAA (omistajan tarkennukset 24.8.2026, ks. js/fokusvirta.js
 * "KOLME PINTAA, EI YHTÄ"):
 *   1. ylävasen matkakirjakortti (.fact-card) — isoisän merkintä
 *   2. pöllön puhekupla (.fokusvirta-kupla) — pöllön huomio ja valinta
 *   3. annostelukortti (.fokusvirta-kortti) — syvennys ja oppitunti
 * ja niiden lisäksi kartan kuvavinjetit (.fokuskuva-pinni).
 *
 * Vartiot:
 *   1. LEHTILUKKO — Tutki-nappi ei avaa saapumiskorttia niin kauan kuin
 *      laatta on kääntämättä.
 *   2. VAIHE 1 EI OLE OMA KORTTINSA: merkintä on ylävasemmassa
 *      matkakirjakortissa vanhoine valokuvineen, kuuntelunappi on
 *      piilossa (luennat tehdään erikseen), eikä virran omaa pintaa ole.
 *   3. Merkinnän jälkeen pöllö puhuu KUPLASTA, joka on ankkuroitu
 *      kelluvaan pöllönappiin: kuplan kärki osoittaa nappiin, kupla on
 *      napin yläpuolella eikä valu ruudun ulkopuolelle.
 *   4. Valintavaihe on samassa kuplassa painikkeineen; portti on kiinni
 *      ennen ensimmäistä täkyä ja aukeaa sen jälkeen (Raamattu,
 *      ETENEMINEN).
 *   5. Täky on KORTTI: kuvaviite, minivisa ja raha oikeasta vastauksesta.
 *      Kortti ei yllä matkakirjakortin päälle.
 *   6. Leipäteksti on lukukirjasimella, ei kirjoituskoneella
 *      (omistajan palaute: *"fontti saisi olla luettavampi"*).
 *   7. Kartan kuvavinjetit ilmestyvät Ateenan ylle, kertyvät virran
 *      mukana, pysyvät samankokoisina zoomista riippumatta ja avaavat
 *      napautuksesta pelin katselimen.
 *   8. Tila säilyy: kuplan sulku napautuksella ja uusi avaus jatkavat
 *      samasta vaiheesta eivätkä ala alusta.
 *   9. Saapuminen avaa virran itsestään (ANNOSTELU-poikkeus "mikään ei
 *      ponnahda" -sääntöön).
 *
 * Peli istutetaan valmiiksi Ateenaan pelitallenteen kautta: Ateena on
 * Euroopan laudalla, eikä savuke voi lentää sinne maailmankartalta.
 *
 * LIIKE VÄHENNETTYNÄ (reducedMotion): kirjoituskone kirjoittaa
 * merkinnän kerralla, joten vaiheen 1 automaattinen kuittaus tapahtuu
 * tunnetussa ajassa eikä savuke joudu arvaamaan konekirjoituksen
 * kestoa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MERKINNAN_TAUKO_MS } from '../../js/fokusvirta.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

/* Valmis peli: Herra Fogg seisoo Ateenassa, laatta kääntämättä. */
const peli = new Game({
  players: [{ name: 'Herra Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('europe'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 },
  reducedMotion: 'reduce',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Fokusmoodi on oletuksena päällä; varmistetaan silti, ettei
    // kehittäjän kytkin ole jäänyt profiiliin pois päältä.
    localStorage.removeItem('matkakirja-fokusmoodi');
  } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
}, tallenne);
const sivu = await ctx.newPage();
/*
 * KUVAPALVELIN KORVATAAN PIKSELILLÄ. Kontin selain ei pääse ämpäriin
 * eikä Commonsiin, ja fokusvirta poistaa kartalta vinjetin, jonka kuvaa
 * ei saada (tyhjä kehys olisi pahempi kuin ei kehystä lainkaan). Ilman
 * korvausta savuke mittaisi verkkoyhteyttä eikä virtaa. Osoitteet
 * tarkistetaan erikseen (tools/tarkista-kuvatiedostot.mjs).
 */
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
  status: 200, contentType: 'image/png', body: PIKSELI,
}));
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

/** Virran näkyvä pinta: kortti tai kupla, kumpi niistä on ruudulla. */
const kortti = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
  if (!el) return null;
  const laatikko = el.getBoundingClientRect();
  const leipa = el.querySelector('.fokusvirta-teksti p');
  return {
    kupla: el.classList.contains('fokusvirta-kupla'),
    ylarivi: el.querySelector('.fokusvirta-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokusvirta-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokusvirta-teksti')?.textContent ?? '',
    leipafontti: leipa ? getComputedStyle(leipa).fontFamily : '',
    leipakoko: leipa ? parseFloat(getComputedStyle(leipa).fontSize) : 0,
    kuvia: el.querySelectorAll('.fokusvirta-kuva img').length,
    napit: [...el.querySelectorAll('.fokusvirta-napit button')]
      .map((b) => ({ teksti: b.textContent, pois: b.disabled })),
    vaihtoehdot: [...el.querySelectorAll('.fokusvirta-vaihtoehdot button')]
      .map((b) => b.textContent),
    tulos: el.querySelector('.fokusvirta-visa-tulos')?.textContent ?? '',
    karttapinnassa: Boolean(el.closest('.map-pane')),
    dialogissa: Boolean(el.closest('dialog')),
    laatikko: {
      ylin: Math.round(laatikko.top),
      alin: Math.round(laatikko.bottom),
      vasen: Math.round(laatikko.left),
      oikea: Math.round(laatikko.right),
    },
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
    vaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
    rahat: window.matkakirja.game.player.money,
  };
});

/** Ylävasemman matkakirjakortin tilanne. */
const matkakirja = () => sivu.evaluate(() => {
  const kortti = document.querySelector('.fact-card');
  if (!kortti || kortti.hidden) return null;
  const kuva = document.getElementById('fact-valokuva');
  return {
    nurkka: kortti.dataset.corner ?? '',
    aani: document.getElementById('fact-voice')?.textContent ?? '',
    paikka: document.getElementById('fact-place')?.textContent ?? '',
    teksti: document.getElementById('fact-text')?.textContent ?? '',
    kuvaNakyy: Boolean(kuva && !kuva.hidden),
    kuvaOsoite: document.getElementById('fact-valokuva-kuva')?.src ?? '',
    kuunteluPiilossa: document.getElementById('fact-kuuntele')?.hidden ?? null,
    ylin: Math.round(kortti.getBoundingClientRect().top),
    alin: Math.round(kortti.getBoundingClientRect().bottom),
  };
});

/** Kartan kuvavinjetit: määrä, koko ruudulla ja paikka laattaan nähden. */
const vinjetit = () => sivu.evaluate(() => {
  const pinnit = [...document.querySelectorAll('.fokuskuva-pinni')];
  const kerros = document.querySelector('.fokuskuvat');
  return {
    maara: pinnit.length,
    suodattimia: pinnit.filter((p) => p.querySelector('[filter]') || p.getAttribute('filter')).length,
    kerroksenMuunnos: kerros?.getAttribute('transform') ?? '',
    koot: pinnit.map((p) => {
      const r = p.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.bottom) };
    }),
  };
});

/** Painaa virran pinnalta napin, jonka teksti täsmää. */
const paina = async (osuma, mista = '.fokusvirta-napit') => {
  await sivu.evaluate(([teksti, valitsin]) => {
    const juuri = document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla');
    const napit = [...(juuri?.querySelectorAll(`${valitsin} button`) ?? [])];
    napit.find((b) => b.textContent.includes(teksti))?.click();
  }, [osuma, mista]);
  await sivu.waitForTimeout(350);
};

/* --- 1: Tutki avaa virran, ei saapumiskorttia --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(500);
const lehtiAuki = await sivu.evaluate(() => document.getElementById('arrival-dialog').open);
vaadi('lehtilukko: saapumiskortti pysyy kiinni', !lehtiAuki);

/* --- 2: vaihe 1 on ylävasen matkakirjakortti, ei virran oma kortti --- */
// Tutki kuittasi merkinnän jo luetuksi, joten tila palautetaan alkuun.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  delete ui.game.fokusvirrat['europe:ateena'];
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  ui.factKey = null;
  ui.render();
});
await sivu.waitForTimeout(500);
let kirja = await matkakirja();
let tila = await kortti();
vaadi('vaihe 1: merkintä on ylävasemmassa matkakirjakortissa',
  kirja?.nurkka === 'tl' && kirja.aani.includes('Matkapäiväkirjasta')
  && kirja.paikka.includes('1873') && kirja.teksti.includes('Troijan kullan'),
  JSON.stringify(kirja));
vaadi('vaihe 1: vanha valokuva on kortin kyljessä',
  kirja?.kuvaNakyy === true && /sophia[-_ ]schliemann/i.test(kirja.kuvaOsoite),
  JSON.stringify(kirja?.kuvaOsoite));
vaadi('vaihe 1: saapumisluenta on vaiennettu (kuuntelunappi piilossa)',
  kirja?.kuunteluPiilossa === true, JSON.stringify(kirja?.kuunteluPiilossa));
vaadi('vaihe 1: virralla ei ole omaa korttia — vain yksi matkakirja',
  tila === null, JSON.stringify(tila));

/* --- 3: merkinnän jälkeen pöllö puhuu kuplasta --- */
await sivu.waitForTimeout(MERKINNAN_TAUKO_MS + 900);
tila = await kortti();
const pollonappi = await sivu.evaluate(() => {
  const r = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
  return r ? { ylin: Math.round(r.top), keski: Math.round(r.left + r.width / 2) } : null;
});
const karki = await sivu.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kupla');
  if (!el) return null;
  const arvo = getComputedStyle(el).getPropertyValue('--kupla-karki');
  return { arvo, vasen: el.getBoundingClientRect().left };
});
vaadi('vaihe 2 on pöllön huomio KUPLASSA, ei kortissa',
  tila?.vaihe === 'pollo' && tila.kupla === true && tila.ylarivi.includes('Pöllö'),
  JSON.stringify(tila));
vaadi('pöllön teksti on lyhennetty päätoimittajan versioon',
  tila?.teksti.startsWith('Isoisäsi ei koskaan saanut tietää, miten kullan kävi.')
  && tila.teksti.includes('Katso ensin tuonne ylös.') && tila.teksti.length < 260,
  JSON.stringify(tila?.teksti));
vaadi('kupla on pöllönapin yläpuolella eikä peitä sitä',
  Boolean(pollonappi) && tila?.laatikko.alin <= pollonappi.ylin,
  JSON.stringify({ kupla: tila?.laatikko, nappi: pollonappi }));
vaadi('kupla pysyy ruudun sisällä',
  tila?.laatikko.vasen >= 0 && tila.laatikko.oikea <= tila.ikkuna.w
  && tila.laatikko.ylin >= 0, JSON.stringify(tila?.laatikko));
vaadi('kuplan kärki osoittaa pöllönappiin',
  Boolean(karki) && Math.abs((karki.vasen + parseFloat(karki.arvo)) - pollonappi.keski) <= 3,
  JSON.stringify({ karki, nappi: pollonappi }));
vaadi('kuplassa ei ole isoa kuvaa — herokuva on kartalla',
  tila?.kuvia === 0, JSON.stringify(tila?.kuvia));
vaadi('leipäteksti on lukukirjasimella eikä kirjoituskoneella',
  /Iowan|Charter|Palatino|Georgia|Times|serif/i.test(tila?.leipafontti ?? '')
  && !/Typewriter|Courier/i.test(tila?.leipafontti ?? '') && tila.leipakoko >= 15,
  JSON.stringify({ fontti: tila?.leipafontti, koko: tila?.leipakoko }));
vaadi('matkakirjakortti pysyy ylävasemmalla kuplan aikana',
  (await matkakirja())?.nurkka === 'tl');

/* --- 4: kartan kuvavinjetit --- */
let kuvat = await vinjetit();
vaadi('herokuva ilmestyy vinjettinä kartalle',
  kuvat.maara === 1 && kuvat.kerroksenMuunnos.includes('scale'), JSON.stringify(kuvat));
vaadi('vinjetissä ei ole suodattimia (iOS-sääntö)', kuvat.suodattimia === 0);

/* --- 5: valintavaihe samassa kuplassa + portti --- */
await paina('Jatka');
tila = await kortti();
const aarreNappi = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('vaihe 3 on valintakupla, jossa kolme täkyä ja aarrenappi',
  tila?.vaihe === 'valinta' && tila.kupla === true && tila.napit.length === 4,
  JSON.stringify(tila));
vaadi('portti kiinni: aarteelle ei pääse ilman täkyä',
  aarreNappi?.pois === true, JSON.stringify(tila?.napit));

/* --- 6: täky on kortti kuvaviitteineen ja minivisoineen --- */
const rahatEnnen = tila.rahat;
await paina('Filosofi');
tila = await kortti();
kirja = await matkakirja();
vaadi('vaihe 4 on KORTTI kuvaviitteineen ja minivisoineen',
  tila?.vaihe === 'taky' && tila.kupla === false && tila.karttapinnassa === true
  && tila.dialogissa === false && tila.kuvia === 1 && tila.vaihtoehdot.length === 3,
  JSON.stringify(tila));
vaadi('kortti ei peitä ylävasenta matkakirjakorttia',
  Boolean(kirja) && tila?.laatikko.ylin > kirja.alin,
  JSON.stringify({ kortti: tila?.laatikko, kirja }));
vaadi('täyn kuva liittyi kartan viuhkaan', (await vinjetit()).maara === 2);

await paina('lyhty', '.fokusvirta-vaihtoehdot');
tila = await kortti();
vaadi('oikea vastaus palkitaan rahalla',
  tila?.tulos.startsWith('Oikein!') && tila.rahat > rahatEnnen,
  JSON.stringify({ tulos: tila?.tulos, ennen: rahatEnnen, nyt: tila?.rahat }));

/* --- 7: vinjetti pysyy samankokoisena zoomatessa --- */
// Vertailukoko otetaan VASTA TÄSSÄ: viuhkassa on nyt kaksi kallistettua
// pinniä, ja kallistus kasvattaa ympäröivää laatikkoa. Sama viuhka
// molemmilla puolilla, tai mitattaisiin kallistusta eikä zoomia.
const kokoEnnenZoomia = (await vinjetit()).koot[0];
const skaalaEnnen = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(1);
});
// Zoomiliuku on animaatio; vinjettien mittakaava lasketaan vasta kun
// näkymä on asettunut (ui.paivitaMaastonimet), joten odotetaan loppuun.
await sivu.waitForTimeout(3000);
const skaalaNyt = await sivu.evaluate(() => window.matkakirja.ui.nakyvaAlue().skaala);
kuvat = await vinjetit();
vaadi('zoomi todella muuttui', Math.abs(skaalaNyt - skaalaEnnen) > 0.01,
  JSON.stringify({ ennen: skaalaEnnen, nyt: skaalaNyt }));
vaadi('vinjetti on kiinteän kokoinen ruudulla zoomista riippumatta',
  kuvat.koot.length > 0 && kokoEnnenZoomia
  && Math.abs(kuvat.koot[0].w - kokoEnnenZoomia.w) <= 2,
  JSON.stringify({ ennen: kokoEnnenZoomia, nyt: kuvat.koot[0] }));

/* --- 8: vinjetin napautus avaa katselimen --- */
await sivu.evaluate(() => document.querySelector('.fokuskuva-pinni')?.dispatchEvent(
  new MouseEvent('click', { bubbles: true }),
));
await sivu.waitForTimeout(500);
const katselin = await sivu.evaluate(() => ({
  auki: Boolean(document.querySelector('.lightbox')),
  kuvia: document.querySelector('.lightbox-counter')?.textContent ?? '',
}));
vaadi('vinjetin napautus avaa pelin katselimen', katselin.auki === true, JSON.stringify(katselin));
vaadi('katselimessa voi selata koko viuhkan', katselin.kuvia.includes('/'), JSON.stringify(katselin));
await sivu.evaluate(() => document.querySelector('.lightbox-close')?.click());
await sivu.waitForTimeout(300);

/* --- 9: portti aukeaa --- */
await paina('Takaisin');
tila = await kortti();
const aarreNyt = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('portti aukeaa yhdestä täystä', aarreNyt?.pois === false, JSON.stringify(tila?.napit));
vaadi('tehtyä täkyä ei tarjota uudelleen',
  !tila?.napit.some((n) => n.teksti.includes('Filosofi')), JSON.stringify(tila?.napit));

/* --- 10: kuplan napautus sulkee, tila säilyy --- */
await sivu.evaluate(() => {
  const kupla = document.querySelector('.fokusvirta-kupla');
  kupla?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
});
await sivu.waitForTimeout(300);
vaadi('napautus kuplaan sulkee sen', (await kortti()) === null);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(400);
tila = await kortti();
vaadi('uusi avaus jatkaa samasta vaiheesta, ei alusta',
  tila?.vaihe === 'valinta', JSON.stringify(tila));

/* --- 11: saapuminen avaa virran itsestään --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  // Saapumisen merkki on sama kuin Tutki-napin sykkeellä; istunnon
  // avausmuisti nollataan, jotta laukaisin saa toimia uudestaan.
  ui.fokusvirtaAvattu = new Set();
  ui.lehtitila.tutkiSyke = 'europe:ateena';
  ui.render();
});
await sivu.waitForTimeout(600);
tila = await kortti();
vaadi('saapuminen avaa virran ilman nappia', Boolean(tila), JSON.stringify(tila));

/* --- vaiheet 5–6 ja luovutus laattamekaniikalle --- */
await paina('aarteelle');
tila = await kortti();
vaadi('vaihe 5 on oppituntikortti, joka pohjustaa laattakysymystä',
  tila?.vaihe === 'oppitunti' && tila.kupla === false && tila.teksti.includes('demokratia'),
  JSON.stringify(tila?.vaihe));
vaadi('oppitunnin kuva liittyi kartan viuhkaan', (await vinjetit()).maara === 3);

await paina('Nikos');
tila = await kortti();
vaadi('vaihe 6 esittelee paikallisen',
  tila?.vaihe === 'kohtaaminen' && tila.otsikko.includes('Nikos'), JSON.stringify(tila?.vaihe));

await paina('Tapaa Nikos');
await sivu.waitForTimeout(900);
const luovutus = await sivu.evaluate(() => ({
  kortti: Boolean(document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla')),
  vaihe: window.matkakirja.game.phase,
  visa: Boolean(window.matkakirja.game.quiz),
  virranVaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
}));
vaadi('virta luovuttaa nykyiselle laattamekaniikalle',
  luovutus.vaihe === 'quiz' && luovutus.visa && !luovutus.kortti
  && luovutus.virranVaihe === 'valmis', JSON.stringify(luovutus));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
