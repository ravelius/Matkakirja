/*
 * Savuke: fokusmoodin maakohtainen topografiapohja (paketti 2,
 * js/fokuskartta.js + js/kartta.js kamera-ajo).
 *
 * Kuvat asuvat ämpärissä eikä repossa, joten savuke ei lataa mitään
 * verkosta: se korvaa `fokus/`-polun omalla vastauksellaan. Kaksi ajoa,
 * ja juuri se on koko testin idea:
 *
 *  1. PUUTTUVA POHJA (404). Kerroksen on jäätävä tyhjäksi ja pelin
 *     toimittava täsmälleen kuten ennen pakettia 2 — laatta, nimi ja
 *     kartta paikoillaan. Tämä on se polku, jolla peli on kaikissa
 *     muissa maissa kuin Kreikassa.
 *  2. OLEMASSA OLEVA POHJA. Kuva ilmestyy laudan koordinaatteihin
 *     TÄSMÄLLEEN FOKUS_POHJAT-taulun rajaukseen, ja maasta toiseen
 *     siirryttäessä kamera ajaa LEHDEN IKKUNAAN pehmeästi. Ele
 *     keskeyttää ajon eikä kartta hyppää maaliin.
 *
 * === MIKÄ MUUTTUI OMISTAJAN PELITESTIN JÄLKEEN (v1095) ===
 *
 * Kuva on nyt kokonainen OPAAKKI atlaksen lehti, ja sen mukana lähti
 * kolme asiaa, joita savuke ennen vaati:
 *
 *   - REITTIVÄITE POISTUI. Ennen savuke vaati, että rajaukseen osuvat
 *     reitit piirretään uudelleen kuvan päälle. Omistaja halusi
 *     pisteet ja katkoviivat pois näkyvistä, joten nyt vaaditaan
 *     päinvastoin: kuvan päällä EI ole reittikerrosta.
 *   - KAKSI LAATIKKOA. Kuva asetetaan `bbox`iin, mutta kamera ajaa
 *     `rajaus`-ikkunaan; ne eivät ole sama laatikko, ja vuoto niiden
 *     välissä on koko sauman esto.
 *   - PUNAINEN KOROSTUS JA MAASTONIMET POIS. Uudet väitteet 2f ja 2g.
 *
 * === MIKÄ MUUTTUI OMISTAJAN PELITESTIN JÄLKEEN (v1097) ===
 *
 * *"Ota pallot pois"*: lehden päällä ei saa olla laudan pyöreitä
 * pelimerkkejä. Osio 6 on kokonaan uusi eikä kumoa yhtään vanhaa
 * väitettä — 1c ja 5b tarkistavat, että laatta on OLEMASSA (peli ei
 * hajonnut), eivät että se näkyy, joten ne pätevät ennallaan.
 *
 * === MIKÄ MUUTTUI JATKUVAN PINNAN MYÖTÄ (v1099) ===
 *
 * Omistajan tilaus 25.8.2026 (Raamatun osio "JATKUVA KARTTA JA
 * DYNAAMISET MITAT") purki "lehden" kahtia:
 *
 *   KUVASTA LÄHTIVÄT KALUSTEET. Kehysviiva, KREIKKA-kartuutsi,
 *   "200 km" -mittajana ja asteverkon reunalukemat eivät ole enää
 *   esirenderöidyssä kuvassa (tools/fokuskartta/piirto.js `jatkuva`).
 *   Savuke EI siis enää saa vaatia kuvalta mitään kehykseen liittyvää
 *   — ja koska kuva on tässä testissä yhden pikselin PNG, sen sisältöä
 *   ei voi eikä tarvitse tutkia. Vanhoista väitteistä yksikään ei
 *   koskenut kehystä, joten mikään ei kumoutunut; sanasto vain
 *   muuttui: "lehti" on nyt IKKUNA (rajaus) jatkuvalla pinnalla.
 *
 *   PELI PIIRTÄÄ MITAT (uusi osio 7). Mittajana ja maan kartuutsi ovat
 *   ruutuun ankkuroituja HTML-elementtejä (js/fokusmitat.js), ja juuri
 *   siksi niistä voi vaatia asioita, joita poltetusta kuvasta ei voisi:
 *   janan pituus on 15–25 % ruudusta, se MUUTTUU zoomatessa, kartuutsi
 *   kertoo maan nimen ja sen oman nimen, se avaa liukuvan maataulun, ja
 *   oikean yläkulman maakyltti väistyy sen tieltä.
 * === MIKÄ MUUTTUI OMISTAJAN PELITESTIN JÄLKEEN (v1099:n jälkeen) ===
 *
 * *"Laatta takaisin, mutta paljon pienempänä"* ja *"Tutki pois
 * alariviltä"*. NYKYISEN kaupungin laatta on lehden päällä AINA — pieni
 * ja ruudulla lähes vakiokokoinen — ja se on samalla fokusnäkymän
 * Tutki-nappi. Kaksi seurausta tälle savukkeelle:
 *
 *   - OSION 6 PIILOTUSVÄITTEET KOSKEVAT NYT MUITA KAUPUNKEJA (6b, 6e).
 *     Oma laatta rajataan mittauksesta pois, koska sen kuuluukin näkyä.
 *   - UUSI OSIO 7 mittaa laatan RUUTUKOON, napautusalueen sormimitan ja
 *     alarivin (vain Liiku), sekä sen että napautus avaa virran.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
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

// Kreikan oikeat laatikot pelilaudalla (tools/tee-fokuskartta.mjs,
// GRC.json 24.8.2026 v2 — maailmankartta, Millerin lieriö).
// Täsmälleen js/packs/fokus-grc.js FOKUS_POHJAT.GRC — rajaus luetaan
// nykyään reposta, ei ämpärin JSONista (CORS-korjaus 24.8.2026), joten
// savukkeen on verrattava samoihin lukuihin.
const BBOX = {
  x: 6329.2, y: 1681.71, w: 608.26, h: 380.16,
};
// Lehden ikkuna: tähän kamera ajaa, tämä on pelaajan näkymä.
const RAJAUS = {
  x: 6399.39, y: 1725.58, w: 467.89, h: 292.43,
};
// Pienin mahdollinen kelvollinen PNG: savuke tutkii sijoittelua, ei
// kuvan sisältöä.
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());

/** Fokuspohjan vastaus: 'puuttuu' | 'ok' | 'vaara-lauta'. */
let vaihe = 'puuttuu';
await sivu.route('**/fokus/**', (route) => {
  const url = route.request().url();
  if (vaihe === 'puuttuu') { route.fulfill({ status: 404, body: 'ei' }); return; }
  if (url.endsWith('.json')) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        iso: 'GRC',
        // Väärän laudan rajaus on samannäköinen mutta toisen
        // projektion koordinaateissa: peli ei saa käyttää sitä.
        lauta: vaihe === 'vaara-lauta' ? 'europe' : 'maailmankartta',
        bbox: BBOX,
        rajaus: RAJAUS,
        tiedosto: 'GRC.png',
      }),
    });
    return;
  }
  route.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
});

/** Peli käyntiin Ateenaan (Kreikka on pilottimaa). */
async function peliAteenaan() {
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1200);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
    window.matkakirja.ui.render();
  });
  await sivu.waitForTimeout(1500);
}

/* ---------------------------------------------------------- 1. puuttuva */

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);
await peliAteenaan();
await sivu.waitForTimeout(800);

const ilman = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    maa: ui.game.pack.map.cityCountry[ui.game.cityOf().id],
    kerros: Boolean(ui.fokuskarttaKerros),
    lapsia: ui.fokuskarttaKerros?.childElementCount ?? -1,
    laatta: Boolean(document.querySelector('#board .city')),
    nimia: document.querySelectorAll('#board .city-label').length,
  };
});
vaadi('1a fokuskerros on olemassa', ilman.kerros);
vaadi('1a pelaaja on Kreikassa', ilman.maa === 'GRC', `maa ${ilman.maa}`);
vaadi('1b puuttuva pohja jättää kerroksen tyhjäksi', ilman.lapsia === 0,
  `lapsia ${ilman.lapsia}`);
vaadi('1c lauta piirtyy silti', ilman.laatta && ilman.nimia > 0,
  `laatta ${ilman.laatta}, nimiä ${ilman.nimia}`);

/* ----------------------------------------------------------- 2. pohja */

vaihe = 'ok';
// Uusi lataus: moduulin muisti puuttuvasta pohjasta nollautuu, ja peli
// jatkuu tallennuksesta samasta kaupungista.
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(1500);

const kuva = await sivu.evaluate(() => {
  const im = document.querySelector('#board .fokuskartta-kuva');
  if (!im) return null;
  return {
    x: Number(im.getAttribute('x')),
    y: Number(im.getAttribute('y')),
    w: Number(im.getAttribute('width')),
    h: Number(im.getAttribute('height')),
    suodatin: im.getAttribute('filter'),
    reitteja: document.querySelectorAll('#board .fokuskartta-reitit .route').length,
    // Kerrosjärjestys: kuvan on oltava kaupunkien ALLA.
    ennenKaupunkeja: Boolean(document.querySelector('#board .fokuskartta')
      ?.compareDocumentPosition(document.querySelector('#board .cities'))
      & Node.DOCUMENT_POSITION_FOLLOWING),
    // Punainen maan ääriviiva ja laudan maastonimet pois lehden päältä.
    korostusNakyy: [...document.querySelectorAll('#board .country-korostus')]
      .some((p) => getComputedStyle(p).display !== 'none'),
    pohjaLuokka: document.body.classList.contains('fokuspohja'),
    // Kohderenkaat ovat liikkumisen ainoa kartalta tehtävä valinta:
    // niiden kerros ei saa kadota lehden mukana.
    kohdekerros: Boolean(document.querySelector('#board .targets')),
  };
});
vaadi('2a kuva ilmestyy laudalle', Boolean(kuva));
if (kuva) {
  const osuu = Math.abs(kuva.x - BBOX.x) < 0.01 && Math.abs(kuva.y - BBOX.y) < 0.01
    && Math.abs(kuva.w - BBOX.w) < 0.01 && Math.abs(kuva.h - BBOX.h) < 0.01;
  vaadi('2b kuva on täsmälleen JSONin rajauksessa', osuu, JSON.stringify(kuva));
  vaadi('2c reittejä EI piirretä kuvan päälle', kuva.reitteja === 0,
    `${kuva.reitteja} reittiä`);
  vaadi('2d kuvalla ei ole suodatinta (iOS)', !kuva.suodatin, String(kuva.suodatin));
  vaadi('2e kuva on kaupunkikerroksen alla', kuva.ennenKaupunkeja);
  vaadi('2f punainen maan korostus on piilossa lehden päältä',
    kuva.pohjaLuokka && !kuva.korostusNakyy,
    `luokka ${kuva.pohjaLuokka}, korostus näkyy ${kuva.korostusNakyy}`);
  vaadi('2g kohderenkaiden kerros on tallella', kuva.kohdekerros);
}

/* ------------------------------------------------- 3. kamera-ajo maahan */

// Saapuminen toisesta maasta: kerros luulee tulevansa Italiasta, jolloin
// päivitys on saapuminen eikä laudan ensimmäinen piirto.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(-1);
  ui.fokuskarttaAvain = 'ITA';
  ui.paivitaFokusKerros();
});
await sivu.waitForTimeout(300);
const kesken = await sivu.evaluate(() => window.matkakirja.ui.kartta.kameraAjossa());
vaadi('3a kamera lähtee ajoon', kesken);
await sivu.waitForTimeout(2600);
const perilla = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const n = ui.nakyvaAlue();
  return {
    ajossa: ui.kartta.kameraAjossa(),
    keskiX: n.x + n.w / 2,
    keskiY: n.y + n.h / 2,
    x: n.x,
    leveys: n.w,
    muunnos: ui.svg.style.transform,
  };
});
vaadi('3b ajo päättyy', !perilla.ajossa);
vaadi('3c näkymä keskittyy lehden ikkunaan',
  Math.abs(perilla.keskiX - (RAJAUS.x + RAJAUS.w / 2)) < RAJAUS.w * 0.2
  && Math.abs(perilla.keskiY - (RAJAUS.y + RAJAUS.h / 2)) < RAJAUS.h * 0.25,
  `keski ${perilla.keskiX.toFixed(0)},${perilla.keskiY.toFixed(0)}`);
vaadi('3d lehden ikkuna mahtuu näkymään', perilla.leveys >= RAJAUS.w * 0.99,
  `näkyvä leveys ${perilla.leveys.toFixed(0)}`);
/*
 * SAUMA EI SAA NÄKYÄ: kamera näyttää lehden ikkunan ja kuvasuhteen
 * vaatiman ylimäärän, ja sen ylimäärän on mahduttava kuvan sisään.
 * Juuri tätä varten kuvassa on vuotoa (js/packs/fokus-grc.js).
 */
vaadi('3f näkyvä alue pysyy kuvan sisällä (ei saumaa)',
  perilla.x >= BBOX.x - 0.5 && perilla.x + perilla.leveys <= BBOX.x + BBOX.w + 0.5,
  `näkyvä x ${perilla.x.toFixed(0)}..${(perilla.x + perilla.leveys).toFixed(0)}, `
  + `kuva ${BBOX.x}..${(BBOX.x + BBOX.w).toFixed(0)}`);
vaadi('3e ajon muunnos on siivottu', !/scale/.test(perilla.muunnos), perilla.muunnos);

/*
 * Laudan omat maastonimet (Balkanvuoret ym.) eivät saa jäädä lehden
 * päälle kellumaan: lehdessä on omat nimensä omalla kirjasimellaan
 * (omistaja 24.8.2026). Testi tehdään VASTA KAMERA-AJON JÄLKEEN, koska
 * maastonimet piirretään vain näkyvälle alueelle ja riittävällä
 * zoomilla — yleiskuvassa niitä ei ole olemassa yhtään.
 */
await sivu.evaluate(() => window.matkakirja.ui.paivitaMaastonimet());
await sivu.waitForTimeout(400);
const nimet = await sivu.evaluate((b) => {
  const kaikki = [...document.querySelectorAll('.maastonimi')];
  const laatikossa = kaikki.filter((n) => {
    const x = Number(n.dataset.x); const y = Number(n.dataset.y);
    return Number.isFinite(x) && Number.isFinite(y)
      && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
  });
  return {
    kaikki: kaikki.length,
    laatikossa: laatikossa.length,
    nakyvia: laatikossa.filter((n) => getComputedStyle(n).display !== 'none').length,
  };
}, BBOX);
console.log(`      (maastonimiä ${nimet.kaikki}, lehden alueella ${nimet.laatikossa})`);
vaadi('3g laudan maastonimet eivät näy lehden alueella', nimet.nakyvia === 0,
  `${nimet.nakyvia} näkyvissä (${nimet.laatikossa} lehden alueella, `
  + `${nimet.kaikki} kaikkiaan)`);

/* --------------------------------------------------- 4. ele keskeyttää */

const ele = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(-1);
  const alku = ui.nakyvaAlue();
  ui.kartta.ajaKamera({
    bbox: {
      x: 6488.9, y: 1722.8, w: 241.9, h: 285,
    },
  });
  await new Promise((r) => setTimeout(r, 260));
  const kesken = ui.nakyvaAlue();
  // Sormi kartalle: kaappausvaiheen kuuntelija pysäyttää ajon.
  const pane = ui.svg.parentElement;
  pane.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true, pointerId: 1, clientX: 400, clientY: 500,
  }));
  await new Promise((r) => setTimeout(r, 500));
  const jalkeen = ui.nakyvaAlue();
  return {
    ajossa: ui.kartta.kameraAjossa(),
    alkuLeveys: alku.w,
    keskenLeveys: kesken.w,
    jalkeenLeveys: jalkeen.w,
  };
});
vaadi('4a ele pysäyttää ajon', !ele.ajossa);
vaadi('4b kartta jää siihen mihin ajo ehti, ei hyppää maaliin',
  ele.jalkeenLeveys < ele.alkuLeveys && ele.jalkeenLeveys > RAJAUS.w * 1.05,
  `alku ${ele.alkuLeveys.toFixed(0)} → kesken ${ele.keskenLeveys.toFixed(0)} `
  + `→ jäi ${ele.jalkeenLeveys.toFixed(0)}`);

/* ------------------------------------------------- 5. väärä lauta pois */

/*
 * Rajaus luetaan nykyään repon FOKUS_POHJAT-taulusta, jossa on
 * lauta-kenttä ('maailmankartta'). Väärä lauta simuloidaan vaihtamalla
 * pelin pack.id hetkeksi: haePohja saa lauta-arvon sieltä, ja
 * FOKUS_POHJAT.GRC.lauta ei täsmää → kuvaa ei saa käyttää, koska
 * rajaus on toisen projektion koordinaateissa.
 */
const vaara = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const oikeaId = ui.game.pack.id;
  ui.game.pack.id = 'europe';
  ui.fokuskarttaAvain = null;
  if (ui.fokuskarttaKerros) ui.fokuskarttaKerros.textContent = '';
  ui.render();
  await new Promise((s) => setTimeout(s, 800));
  const tulos = {
    kuvia: document.querySelectorAll('#board .fokuskartta-kuva').length,
    laatta: Boolean(document.querySelector('#board .city')),
  };
  ui.game.pack.id = oikeaId;
  ui.fokuskarttaAvain = null;
  return tulos;
});
vaadi('5a toisen laudan rajausta ei käytetä', vaara.kuvia === 0, `${vaara.kuvia} kuvaa`);
vaadi('5b peli toimii silti', vaara.laatta);

/* ------------------------------------------- 6. pallot pois lehdeltä */

/*
 * OMISTAJAN PELITESTIPALAUTE v1097 (iPad): *"Ota pallot pois"*.
 *
 * Lehden päällä näkyivät Ateenan laatta ja pelaajan nappula
 * päällekkäin sekä Kreetan valkoinen rengas — pyöreää pelilautaa
 * keskellä 1873-atlaksen sivua. MITKÄ VÄITTEET MUUTTUIVAT: mikään
 * vanha väite ei kääntynyt päinvastaiseksi (1c ja 5b tarkistavat vain
 * että laatta on OLEMASSA, eivät että se näkyy), vaan tämä on kokonaan
 * uusi osio. Se on tässä eikä osiossa 2, koska kamera-ajo (3) tuo
 * lehden ruudulle ja tekee mittauksesta samalla realistisen.
 *
 * Neljä väitettä: piilotus, nimien säilyminen, kehittäjänapautuksen
 * elossapysyminen ja paluu matkustusvalinnan sekä aarrevaiheen aikana.
 */
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.render();
  await new Promise((s) => setTimeout(s, 600));
});

/** Yhden mittauksen apuri selaimessa: mikä lehden päällä näkyy? */
const mittaaPallot = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const nakyy = (osa) => getComputedStyle(osa).display !== 'none';
  const oma = ui.game.cityOf()?.id;
  const osat = [...document.querySelectorAll('#board .cities [data-kaupunki]')];
  const lehdella = osat.filter((osa) => ui.fokusPohjanAlla(
    Number(osa.getAttribute('cx') ?? osa.getAttribute('x')),
    Number(osa.getAttribute('cy') ?? osa.getAttribute('y')),
  ));
  /*
   * NYKYISEN KAUPUNGIN LAATTA ON OMA TAPAUKSENSA (omistajan pelitesti
   * 24.8.2026): se jää lehden päälle aina, pienennettynä. Piilotus
   * koskee siis MUIDEN kaupunkien pisteitä, ja oma laatta mitataan
   * erikseen (osio 7).
   */
  const pisteet = lehdella.filter((osa) => !osa.classList.contains('city-label')
    && osa.dataset.kaupunki !== oma);
  /*
   * NIMISTÄ MITATAAN VAIN KÄYDYN MAAN NIMET. Lehden laatikkoon osuu
   * myös naapurimaiden kaupunkeja, ja niiden koko datakerros — nimi
   * mukaan lukien — on piilossa jo fokusmoodin vanhalla säännöllä
   * (.fokus-piilossa). Se on oikein eikä liity palloihin, joten
   * mittaus rajataan niihin nimiin, joiden kuuluukin näkyä.
   */
  const nimet = lehdella.filter((osa) => osa.classList.contains('city-label')
    && !osa.classList.contains('fokus-piilossa'));
  const renkaat = [...document.querySelectorAll('#board .targets .target-ring')];
  return {
    pohja: Boolean(ui.fokusPohjaBbox),
    pisteita: pisteet.length,
    nakyviaPisteita: pisteet.filter(nakyy).length,
    nimia: nimet.length,
    nakyviaNimia: nimet.filter(nakyy).length,
    // Yksikään nimi ei saa saada pallonpiilotuksen luokkaa.
    pallotettujaNimia: lehdella.filter((osa) => osa.classList.contains('city-label')
      && osa.classList.contains('fokus-lehden-alla')).length,
    nappuloita: [...document.querySelectorAll('#board .pawns .pawn')].length,
    nakyviaNappuloita: [...document.querySelectorAll('#board .pawns .pawn')].filter(nakyy).length,
    renkaita: renkaat.length,
    nakyviaRenkaita: renkaat.filter(nakyy).length,
    osumaAlueita: [...document.querySelectorAll('#board .targets .target-hit')].length,
    nakyviaOsumaAlueita: [...document.querySelectorAll('#board .targets .target-hit')]
      .filter(nakyy).length,
  };
});

const piilossa = await mittaaPallot();
vaadi('6a lehti on yhä paikallaan mittausta varten', piilossa.pohja);
vaadi('6b MUIDEN kaupunkien pisteet ja laatat ovat piilossa lehden päältä',
  piilossa.pisteita > 0 && piilossa.nakyviaPisteita === 0,
  `${piilossa.nakyviaPisteita}/${piilossa.pisteita} näkyvissä`);
vaadi('6c kaupunkien nimet JÄÄVÄT lehteen (ATEENA, Kreeta)',
  piilossa.nimia > 0 && piilossa.nakyviaNimia === piilossa.nimia
  && piilossa.pallotettujaNimia === 0,
  `${piilossa.nakyviaNimia}/${piilossa.nimia} näkyvissä, `
  + `${piilossa.pallotettujaNimia} pallotettuna`);
vaadi('6d pelinappula on piilossa ennen aarrevaihetta',
  piilossa.nappuloita > 0 && piilossa.nakyviaNappuloita === 0,
  `${piilossa.nakyviaNappuloita}/${piilossa.nappuloita} näkyvissä`);

/*
 * KEHITTÄJÄTILAN NAPAUTUS EI SAA LAKATA TOIMIMASTA: näkymätön
 * osuma-alue (.target-hit) on eri asia kuin piilotettu laatta, ja
 * dev-siirron on onnistuttava vaikka laatta on lehden alla.
 */
const dev = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.kehittajaTila = true;
  ui.render();
  await new Promise((s) => setTimeout(s, 400));
  const nakyy = (osa) => getComputedStyle(osa).display !== 'none';
  const alueet = [...document.querySelectorAll('#board .targets .target-hit')];
  const oma = ui.game.cityOf()?.id;
  const laatat = [...document.querySelectorAll('#board .cities [data-kaupunki]')]
    .filter((osa) => !osa.classList.contains('city-label')
      && osa.dataset.kaupunki !== oma
      && ui.fokusPohjanAlla(
        Number(osa.getAttribute('cx') ?? osa.getAttribute('x')),
        Number(osa.getAttribute('cy') ?? osa.getAttribute('y')),
      ));
  const tulos = {
    alueita: alueet.length,
    nakyviaAlueita: alueet.filter(nakyy).length,
    laattojaLehdella: laatat.length,
    nakyviaLaattoja: laatat.filter(nakyy).length,
  };
  ui.kehittajaTila = false;
  ui.render();
  await new Promise((s) => setTimeout(s, 300));
  return tulos;
});
vaadi('6e kehittäjätilan napautusalueet ovat elossa piilotetun laatan päällä',
  dev.alueita > 0 && dev.nakyviaAlueita === dev.alueita && dev.nakyviaLaattoja === 0,
  JSON.stringify(dev));

/*
 * MATKUSTUSVALINTA TUO KOHTEET TAKAISIN. Valinta avataan samalla
 * lipulla kuin Liiku-nappi (ui.travelExpanded), ja mittari on nappula:
 * se palaa kartalle valinnan ajaksi, jotta pelaaja näkee mistä
 * lähdetään.
 */
const valinta = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const vaihe = ui.game.phase;
  ui.game.phase = 'action';
  ui.travelExpanded = true;
  ui.render();
  await new Promise((s) => setTimeout(s, 400));
  const nakyy = (osa) => getComputedStyle(osa).display !== 'none';
  const renkaat = [...document.querySelectorAll('#board .targets .target-ring')];
  const tulos = {
    auki: ui.fokusMatkavalintaAuki(),
    renkaita: renkaat.length,
    piilotettujaRenkaita: renkaat.filter((r) => !nakyy(r)).length,
    nakyviaNappuloita: [...document.querySelectorAll('#board .pawns .pawn')].filter(nakyy).length,
  };
  ui.travelExpanded = false;
  ui.game.phase = vaihe;
  ui.render();
  await new Promise((s) => setTimeout(s, 300));
  return tulos;
});
vaadi('6f matkustusvalinta tuo kohderenkaat ja nappulan takaisin',
  valinta.auki === true && valinta.piilotettujaRenkaita === 0
  && valinta.nakyviaNappuloita > 0, JSON.stringify(valinta));

const suljettu = await mittaaPallot();
vaadi('6g valinnan sulkeuduttua pallot katoavat taas',
  suljettu.nakyviaPisteita === 0 && suljettu.nakyviaNappuloita === 0,
  JSON.stringify(suljettu));

/*
 * AARREVAIHE TUO LAATAN. Fokusvirta kirjataan kohtaamisvaiheeseen
 * ("Tapaa Nikos" → varsinainen laattakysymys) samalla avaimella kuin
 * peli sen tallentaa, ja laatan on ilmestyttävä.
 */
const aarre = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const kaupunki = ui.game.cityOf();
  const avain = `${ui.game.pack.id}:${kaupunki.id}`;
  (ui.game.fokusvirrat ??= {})[avain] = {
    vaihe: 'kohtaaminen', taky: null, tehdyt: [], kohde: null, kohteet: [],
  };
  ui.render();
  await new Promise((s) => setTimeout(s, 400));
  const nakyy = (osa) => getComputedStyle(osa).display !== 'none';
  const omat = [...document.querySelectorAll(`#board .cities [data-kaupunki="${kaupunki.id}"]`)]
    .filter((osa) => !osa.classList.contains('city-label'));
  const muut = [...document.querySelectorAll('#board .cities [data-kaupunki]')]
    .filter((osa) => !osa.classList.contains('city-label')
      && osa.dataset.kaupunki !== kaupunki.id
      && ui.fokusPohjanAlla(
        Number(osa.getAttribute('cx') ?? osa.getAttribute('x')),
        Number(osa.getAttribute('cy') ?? osa.getAttribute('y')),
      ));
  return {
    kaupunki: kaupunki.id,
    omia: omat.length,
    nakyviaOmia: omat.filter(nakyy).length,
    huomioele: omat.some((osa) => osa.classList.contains('fokus-laatta-esiin')),
    muitaLehdella: muut.length,
    nakyviaMuita: muut.filter(nakyy).length,
    nakyviaNappuloita: [...document.querySelectorAll('#board .pawns .pawn')].filter(nakyy).length,
  };
});
vaadi('6h aarrevaihe tuo nykyisen kaupungin laatan takaisin',
  aarre.omia > 0 && aarre.nakyviaOmia === aarre.omia && aarre.nakyviaNappuloita > 0,
  JSON.stringify(aarre));
vaadi('6i pöllön huomioele on laatan päällä', aarre.huomioele, JSON.stringify(aarre));
vaadi('6j muiden kaupunkien pallot pysyvät piilossa',
  aarre.muitaLehdella > 0 && aarre.nakyviaMuita === 0, JSON.stringify(aarre));

/* ------------------------------- 7. dynaamiset mitat (v1099) */

/*
 * MITTAJANA JA KARTUUTSI OVAT PELIN PIIRTÄMIÄ (js/fokusmitat.js).
 *
 * Nämä väitteet korvaavat sen, mitä ennen ei voinut testata lainkaan:
 * kuvaan poltettu mittajana oli osa bittikarttaa, ja sen ainoa
 * "tarkistus" oli silmä. Nyt jana on DOM:issa, ja siitä voi vaatia
 * kolme asiaa, joita poltettu jana ei olisi koskaan täyttänyt:
 * järkevä koko ruudulla, vakiosarjan pyöreä pituus ja se, että luku
 * MUUTTUU kun karttaa zoomataan.
 */

// Sarja on js/fokusmitat.js PITUUDET. Muu luku olisi merkki siitä,
// että jana laskee vapaita kilometrejä eikä valitse siistiä pituutta.
const SALLITUT_KM = new Set([
  0.5, 1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000,
]);

/** Yksi mittaus: kartuutsin ja janan tila ruudulla. */
const mittaaMitat = () => sivu.evaluate(() => {
  const nakyy = (osa) => osa && getComputedStyle(osa).display !== 'none'
    && getComputedStyle(osa).visibility !== 'hidden';
  const kartuutsi = document.querySelector('.fokus-kartuutsi');
  const jana = document.querySelector('.fokus-jana');
  const palkki = document.querySelector('.fokus-jana-palkki');
  const pilleri = document.querySelector('.maa-pilleri');
  const pane = document.querySelector('.map-pane');
  const laatikko = (osa) => {
    if (!osa) return null;
    const r = osa.getBoundingClientRect();
    return {
      x: r.x, y: r.y, w: r.width, h: r.height, oikea: r.right, ala: r.bottom,
    };
  };
  return {
    sailio: nakyy(document.querySelector('.fokusmitat')),
    kartuutsiNakyy: nakyy(kartuutsi),
    nimi: document.querySelector('.fokus-kartuutsi-nimi')?.textContent ?? '',
    paikallinen: document.querySelector('.fokus-kartuutsi-paikallinen')?.textContent ?? '',
    aika: document.querySelector('.fokus-kartuutsi-aika')?.textContent ?? '',
    kartuutsiLaatikko: laatikko(kartuutsi),
    janaNakyy: nakyy(jana),
    km: Number(jana?.dataset.km),
    janaTeksti: document.querySelector('.fokus-jana-maksimi')?.textContent ?? '',
    janaLeveys: palkki?.getBoundingClientRect().width ?? 0,
    paneLeveys: pane?.getBoundingClientRect().width ?? 0,
    pilleriNakyy: nakyy(pilleri),
    pohjaLuokka: document.body.classList.contains('fokuspohja'),
    // Alanapit ja kelluva pöllö: mitat eivät saa osua niiden päälle.
    napit: laatikko(document.querySelector('.turn-card')),
    pollo: laatikko(document.querySelector('.pollo-nappi.pollo-kelluu')),
    tauluAuki: document.querySelector('.fokus-maataulu')?.classList.contains('auki') ?? null,
  };
});

// Näkymä takaisin lehden ikkunaan, jotta mittaus tehdään siinä
// tilassa, jossa pelaaja lehteä katsoo.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.ajaKamera({ bbox: ui.fokusPohjaBbox, marginaali: 0 });
});
await sivu.waitForTimeout(2600);
await sivu.evaluate(() => window.matkakirja.ui.paivitaMaastonimet());
await sivu.waitForTimeout(300);

const mitat = await mittaaMitat();
vaadi('7a mitat näkyvät fokuspohjan päällä', mitat.sailio && mitat.pohjaLuokka,
  JSON.stringify({ sailio: mitat.sailio, pohja: mitat.pohjaLuokka }));
vaadi('7b kartuutsissa on maan nimi suomeksi', mitat.nimi === 'KREIKKA', mitat.nimi);
vaadi('7c kartuutsin alarivi on maan oma nimi (1873-asussa)',
  mitat.paikallinen.includes('ΕΛΛΑΣ') && /kuningaskunta/.test(mitat.aika),
  `${mitat.paikallinen} | ${mitat.aika}`);
/*
 * ISOISÄN RIVI EI OLE MISSÄÄN (omistaja 25.8.2026): kartta on
 * sisällöltään nykyaikainen, vaikka tyyliltään aikakauden mukainen.
 */
const isoisaRivi = await sivu.evaluate(() => document.body.innerText.includes('isoisän matkakirjan mukaan'));
vaadi('7d "isoisän matkakirjan mukaan · 1873" ei ole näkyvissä', !isoisaRivi);

vaadi('7e mittajana näkyy', mitat.janaNakyy && mitat.janaLeveys > 0,
  `leveys ${mitat.janaLeveys}`);
vaadi('7f janan pituus on vakiosarjasta', SALLITUT_KM.has(mitat.km), `${mitat.km} km`);
const osuus = mitat.paneLeveys ? (mitat.janaLeveys / mitat.paneLeveys) * 100 : 0;
vaadi('7g jana on 15–25 % kartan leveydestä', osuus >= 15 && osuus <= 25,
  `${osuus.toFixed(1)} % (${mitat.janaTeksti})`);

/*
 * MAAKYLTTI VÄISTYY: kartuutsi kertoo maan nimen, joten oikean
 * yläkulman pilleri olisi sama tieto kahdesti.
 */
vaadi('7h oikean yläkulman maakyltti on piilossa lehden päällä', !mitat.pilleriNakyy);

// Mitat eivät saa peittää alanappeja eivätkä kelluvaa pöllöä.
const osuvat = (a, b) => Boolean(a && b)
  && a.x < b.oikea && a.oikea > b.x && a.y < b.ala && a.ala > b.y;
const janaLaatikko = await sivu.evaluate(() => {
  const r = document.querySelector('.fokus-jana')?.getBoundingClientRect();
  return r ? {
    x: r.x, y: r.y, oikea: r.right, ala: r.bottom,
  } : null;
});
vaadi('7i kartuutsi ja jana eivät peitä alanappeja',
  !osuvat(mitat.kartuutsiLaatikko, mitat.napit) && !osuvat(janaLaatikko, mitat.napit),
  JSON.stringify({ kartuutsi: mitat.kartuutsiLaatikko, jana: janaLaatikko, napit: mitat.napit }));
vaadi('7j kartuutsi ja jana eivät peitä kelluvaa pöllöä',
  !mitat.pollo
  || (!osuvat(mitat.kartuutsiLaatikko, mitat.pollo) && !osuvat(janaLaatikko, mitat.pollo)),
  JSON.stringify({ pollo: mitat.pollo }));

/*
 * DYNAAMISUUS: zoomaus lyhentää janan kilometrimäärää. Tämä on koko
 * muutoksen ydin — poltettu jana väitti 200 km millä tahansa zoomilla.
 */
await sivu.evaluate(() => {
  window.matkakirja.ui.kartta.zoomaaPainikkeella(1);
  window.matkakirja.ui.kartta.zoomaaPainikkeella(1);
});
await sivu.waitForTimeout(1100);
await sivu.evaluate(() => window.matkakirja.ui.paivitaMaastonimet());
await sivu.waitForTimeout(300);
const lahella = await mittaaMitat();
vaadi('7k jana lyhenee kilometreissä kun karttaa lähennetään',
  lahella.km > 0 && lahella.km < mitat.km,
  `${mitat.km} km → ${lahella.km} km`);
vaadi('7l lähennettykin jana pysyy vakiosarjassa ja järkevän kokoisena',
  SALLITUT_KM.has(lahella.km)
  && (lahella.janaLeveys / lahella.paneLeveys) * 100 >= 15
  && (lahella.janaLeveys / lahella.paneLeveys) * 100 <= 25,
  `${lahella.km} km, ${((lahella.janaLeveys / lahella.paneLeveys) * 100).toFixed(1)} %`);

/* ------------------------------- 8. liukuva maataulu (v1099) */

/*
 * Kartuutsin kertapainallus nostaa alhaalta liukuvan taulun, jossa
 * ovat maan perustiedot SAMASTA lähteestä kuin maalehdessä
 * (MAATIEDOT) ja plus-nappi itse lehteen. Sulku: X, Esc tai napautus
 * taulun ulkopuolelle.
 */
const auki = await sivu.evaluate(async () => {
  document.querySelector('.fokus-kartuutsi').click();
  await new Promise((r) => setTimeout(r, 450));
  const taulu = document.querySelector('.fokus-maataulu');
  const pane = document.querySelector('.map-pane').getBoundingClientRect();
  const r = taulu.getBoundingClientRect();
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect() ?? null;
  const otsikot = [...taulu.querySelectorAll('.fokus-maataulu-otsikko')].map((e) => e.textContent);
  return {
    auki: taulu.classList.contains('auki'),
    nakyy: getComputedStyle(taulu).visibility === 'visible',
    lapinakyva: getComputedStyle(taulu).backgroundColor,
    // Kartta jää näkyviin: taulu ei täytä koko karttaruutua.
    korkeusOsuus: r.height / pane.height,
    // Alanapit jäävät taulun alapuolelle kokonaan.
    nappienPaalla: Boolean(napit) && r.bottom > napit.top,
    otsikot,
    vakiluku: taulu.querySelector('.fokus-maataulu-arvo')?.textContent ?? '',
    kielia: taulu.querySelectorAll('.fokus-maataulu-kielet .tervehdys').length,
    lippuja: taulu.querySelectorAll('.fokus-maataulu-kielet img').length,
    // Vieritys ei saa vuotaa kartan panorointiin.
    kosketus: getComputedStyle(taulu).touchAction,
    plus: Boolean(taulu.querySelector('.fokus-maataulu-lehti')),
    aria: document.querySelector('.fokus-kartuutsi').getAttribute('aria-expanded'),
  };
});
vaadi('8a kartuutsin painallus avaa maataulun', auki.auki && auki.nakyy, JSON.stringify(auki));
vaadi('8b taulu on läpikuultava ja kartta jää näkyviin',
  /rgba\(/.test(auki.lapinakyva) && auki.korkeusOsuus < 0.6,
  `${auki.lapinakyva}, korkeus ${(auki.korkeusOsuus * 100).toFixed(0)} % kartasta`);
vaadi('8c taulu ei peitä alanappeja', !auki.nappienPaalla);
vaadi('8d taulussa ovat maalehden omat luvut',
  auki.otsikot.includes('Väkiluku') && auki.otsikot.includes('Pinta-ala')
  && /milj\./.test(auki.vakiluku),
  JSON.stringify(auki.otsikot));
vaadi('8e taulussa ovat maan kielet lippuineen',
  auki.kielia >= 2 && auki.lippuja >= 1, `${auki.kielia} kieltä, ${auki.lippuja} lippua`);
vaadi('8f taulun vieritys ei panoroi karttaa (touch-action)',
  auki.kosketus === 'pan-y', auki.kosketus);
vaadi('8g plus-nappi maalehteen on olemassa ja aria kertoo tilan',
  auki.plus && auki.aria === 'true', JSON.stringify({ plus: auki.plus, aria: auki.aria }));

// Esc sulkee.
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(450);
const escJalkeen = await mittaaMitat();
vaadi('8h Esc sulkee taulun', escJalkeen.tauluAuki === false, String(escJalkeen.tauluAuki));

// Napautus taulun ulkopuolelle sulkee.
const ulkoa = await sivu.evaluate(async () => {
  document.querySelector('.fokus-kartuutsi').click();
  await new Promise((r) => setTimeout(r, 400));
  const kesken = document.querySelector('.fokus-maataulu').classList.contains('auki');
  document.querySelector('.map-pane').dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true, pointerId: 7, clientX: 20, clientY: 20,
  }));
  await new Promise((r) => setTimeout(r, 400));
  return { kesken, jalkeen: document.querySelector('.fokus-maataulu').classList.contains('auki') };
});
vaadi('8i napautus taulun ulkopuolelle sulkee sen',
  ulkoa.kesken && !ulkoa.jalkeen, JSON.stringify(ulkoa));
/* ------------------------------- 7. laatta on fokusnäkymän Tutki-nappi */

/*
 * OMISTAJAN PELITESTITILAUS 24.8.2026 (v1099:n jälkeen), kolme väitettä
 * samasta muutoksesta:
 *
 *   1. NYKYISEN KAUPUNGIN LAATTA NÄKYY LEHDELLÄ AINA — mutta pienenä ja
 *      ruudulla lähes vakiokokoisena (js/ui.js FOKUS_LAATTA_PX = 26).
 *      Mitta otetaan RUUDULTA (getBoundingClientRect), koska juuri se on
 *      luvattu: laudan yksiköissä sama laatta on eri kokoinen joka
 *      zoomilla.
 *   2. NAPAUTUSALUE ON SORMENKOKOINEN vaikka laatta piirtyy pienenä
 *      (.fokuslaatta-osuma, vähintään 44 px).
 *   3. ALARIVILLÄ ON VAIN LIIKU: Tutki-nappia ei ole, ja sen toiminto
 *      tulee laatan napautuksesta.
 *
 * Aarrevaiheen tila jäi osiosta 6 voimaan, joten napautuksen kuuluu
 * avata fokusvirta eikä saapumiskorttia (lehtilukko).
 *
 * MITTAUS TEHDÄÄN FOKUSNÄKYMÄSSÄ, EI YLEISKUVASSA. Osio 4 jätti kartan
 * puoliväliin keskeytettyä ajoa, ja siinä zoomissa lehti on vain osa
 * ruutua — laatta on jo luonnostaan pieni eikä kutistus tee mitään.
 * Kamera ajetaan siksi ensin lehden ikkunaan (sama ajo kuin osiossa 3),
 * jolloin mitataan se näkymä, josta omistajan palaute tuli.
 */
await sivu.evaluate((b) => window.matkakirja.ui.kartta.ajaKamera({ bbox: b }), RAJAUS);
await sivu.waitForTimeout(2600);

const laatta = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.game.phase = 'action';
  ui.render();
  await new Promise((s) => setTimeout(s, 400));
  const city = ui.game.cityOf();
  const laattaOsa = document.querySelector(
    `#board .cities .city[data-kaupunki="${city.id}"], `
    + `#board .cities .city-start[data-kaupunki="${city.id}"]`,
  );
  const osuma = document.querySelector('#board .fokuslaatta-osuma');
  const rivi = document.querySelector('.toimintorivi');
  const napit = [...(rivi?.querySelectorAll('.toimintorivi-perus button') ?? [])]
    .map((b) => b.getAttribute('aria-label'));
  const kuva = laattaOsa?.getBoundingClientRect();
  return {
    kaupunki: city.id,
    skaala: Number((ui.nakyvaAlue()?.skaala ?? 0).toFixed(3)),
    rx: Number(laattaOsa?.getAttribute('rx')),
    osumaR: Number(osuma?.getAttribute('r')),
    lehdella: ui.fokusPohjanAlla(city.x, city.y),
    laattaNakyy: laattaOsa ? getComputedStyle(laattaOsa).display !== 'none' : false,
    halkaisija: kuva ? Math.round(Math.max(kuva.width, kuva.height)) : -1,
    osumaLeveys: osuma ? Math.round(osuma.getBoundingClientRect().width) : -1,
    napit,
    yksiRivi: Boolean(rivi?.classList.contains('rivi-yksi')),
  };
});
console.log(`      (zoom ${laatta.skaala} px/yksikkö, laatan rx ${laatta.rx?.toFixed(1)} `
  + `→ ruudulla ${laatta.halkaisija} px, osuma-alue ${laatta.osumaLeveys} px)`);
vaadi('7a nykyisen kaupungin laatta NÄKYY lehden päällä',
  laatta.lehdella === true && laatta.laattaNakyy === true, JSON.stringify(laatta));
vaadi('7b laatta on ruudulla pieni (24–32 px, varaa mittaan)',
  laatta.halkaisija >= 20 && laatta.halkaisija <= 40,
  `halkaisija ${laatta.halkaisija} px`);
vaadi('7c napautusalue on sormenkokoinen (≥ 44 px)',
  laatta.osumaLeveys >= 44, `${laatta.osumaLeveys} px — ${JSON.stringify(laatta)}`);
vaadi('7d alarivillä on vain Liiku — Tutki muutti laattaan',
  laatta.yksiRivi === true && laatta.napit.length === 1
  && laatta.napit[0] === 'Liiku', JSON.stringify(laatta.napit));

const napautus = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  document.querySelector('#board .fokuslaatta-osuma').dispatchEvent(
    new MouseEvent('click', { bubbles: true }),
  );
  await new Promise((s) => setTimeout(s, 700));
  return {
    virta: Boolean(document.querySelector('.fokusvirta-kortti, .fokusvirta-kupla')),
    saapuminen: document.getElementById('arrival-dialog')?.open === true,
  };
});
vaadi('7e laatan napautus avaa fokusvirran (ei saapumiskorttia)',
  napautus.virta === true && napautus.saapuminen === false, JSON.stringify(napautus));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
