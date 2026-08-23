/*
 * Pohjois-Amerikan maiden rajat pelin karttaprojektioon.
 *
 *   node tools/northamerica-countries.mjs USA CAN MEX
 *   node tools/northamerica-countries.mjs --tarkista      (pelkkä sovitusraportti)
 *
 * Sisarteos tools/middleeast-countries.mjs:lle ja
 * tools/europe-countries.mjs:lle: lukee Natural Earthin 50m-maapolygonit
 * (public domain) ja tulostaa `renkaat`-listat, jotka liitetään
 * js/packs/northamerica-countries.js:ään.
 *
 * PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU — MUTTA SE EI OLE LINEAARINEN.
 *
 * Lähi-idässä ja Euroopassa projektio sovitettiin pienimmän neliösumman
 * suoralla laudan kaupunkien x/y-arvoista. Tälle laudalle se EI KELPAA.
 * Suora sovitus laudan 38 kaupungista antaa
 *
 *     X = lon * 6,7396 + 1302,34      Y = lat * -11,5955 + 981,33
 *
 * ja sen suurin jäännös on 137 lautayksikköä eli 13,7 % laudan
 * leveydestä — moninkertaisesti yli sen 3 %:n rajan, jonka jälkeen
 * lineaarista mallia ei saa käyttää. Syy on tiedossa eikä arvattu:
 * northamerica.js:n oma kommentti kertoo, että lauta on Lambertin
 * konformisessa kartioprojektiossa (standardileveyspiirit 20° ja 60°,
 * keskimeridiaani 100° läntistä), ja tools/project.mjs on se ohjelma,
 * jolla laudan pisteet on tuotettu tools/mapdata/northamerica.json:sta.
 * Kartioprojektiossa pituuspiirit kaartuvat, joten mikään suora ei voi
 * osua sekä Alaskaan että Panamaan.
 *
 * Siksi projektio johdetaan laudasta VAHVEMMIN kuin mallissa: samasta
 * lähdeaineistosta ja samalla kaavalla kuin lauta itse.
 *
 *     lambertConic(mapdata.projection)  +  fitToBoard(kaikki laudan pisteet)
 *
 * Sovitus tarkistetaan joka ajolla laudan omia kaupunkeja vasten
 * (tarkistaSovitus alla). Tulos 23.8.2026:
 *
 *     38 kaupunkia, suurin jäännös 1,97 yksikköä (Houston) = 0,2 %
 *     laudan leveydestä, kun kaksi laudalla TAHALLAAN siirrettyä
 *     kohdetta jätetään pois:
 *       - Havaiji 155,5 yksikköä (laudalla siirretty idemmäs ja
 *         etelämmäs, jotta saari mahtuu ruutuun; myös hawaiiPoints
 *         on siirretty samalla kädellä)
 *       - Havanna 26,7 yksikköä (siirretty Kuuban ääriviivan sisällä)
 *     Muut 36 kaupunkia osuvat alle 2 yksikön tarkkuudella, 34 niistä
 *     alle yhden.
 *
 * Kaava on siis laudan oma kaava, ei approksimaatio siitä.
 *
 * MIKSI PROJEKTIOFUNKTIOT ON KOPIOITU TÄHÄN eikä tuotu project.mjs:stä:
 * project.mjs on komentorivityökalu, joka lukee process.argv[2]:n ja
 * tulostaa koko laudan heti moduulia ladattaessa — import saastuttaisi
 * tämän työkalun tulosteen ja kaatuisi ilman lauta-argumenttia.
 * Kopiot ovat sanasta sanaan samat, ja tarkistaSovitus paljastaa heti
 * jos ne joskus eroavat: jäännös kasvaisi.
 *
 * RENKAIDEN KARSINTA on kolmiportainen:
 *   1. IKKUNA — maantieteellinen laatikko. Karsii ennen kaikkea
 *      päivämääränrajan takaiset Aleutit (lon +172…180), jotka
 *      kartioprojektiossa lentäisivät mielivaltaiseen paikkaan.
 *   2. NÄKYVYYS — rengas kelpaa vain jos ainakin yksi sen piste osuu
 *      laudan piirretyn rannikon (map.outlines) sisään. Tämä on
 *      vahvempi ja rehellisempi rajaus kuin mallin nimetty POIS-lista:
 *      pelin maasävy rajataan joka tapauksessa ui.js:n maa-rajaus-
 *      clipPathilla noihin samoihin ääriviivoihin, joten mikä tahansa
 *      niiden ulkopuolinen rengas on näkymätön paino tiedostossa.
 *      Käytännössä se pudottaa Kanadan arktisen saariston (Ellesmere,
 *      Baffinin pohjoispuoli — lauta ei piirrä niitä lainkaan),
 *      Grönlannin irtosaaret sekä Havaijin OIKEALLA paikallaan olevan
 *      renkaan: lauta piirtää Havaijin 150 yksikköä idempänä, joten
 *      tosipaikan rengas jäisi keskelle Tyyntämerta.
 *   3. MIN_KOKO — sirpaleiden karsinta, oletuksena 12 yksikköä.
 *      Bermuda on laudalla kokonaisuudessaan 1,9 yksikköä leveä, eli
 *      koko maa jäisi rajan alle; sille on nimetty oma raja aivan
 *      kuten Bahrainille Lähi-idän työkalussa.
 *
 * KESKUS on renkaiden yhteinen rajauslaatikon keskipiste. Se on vain
 * vertailutilan maakyltin paikka (js/vertailu.js), ja kolmelle maalle
 * automaattinen piste osuu huonosti (USA:lla Alaska vetää sen Kanadaan,
 * Kanadalla se osuu Churchillin nimeen, Grönlannilla laudan ulkopuolelle
 * pohjoiseen). Ne on siirretty käsin pakettitiedostossa, ja jokaisen
 * kohdalla lukee miksi.
 */
import fs from 'node:fs';
import { NORTHAMERICA } from '../js/packs/northamerica.js';

const LAHDE = process.env.NE_GEOJSON ?? 'ne50.geojson';
const LAUTADATA = 'tools/mapdata/northamerica.json';

const RAD = Math.PI / 180;

/**
 * Lambertin konforminen kartioprojektio pallolle.
 * Sanatarkka kopio tools/project.mjs:n funktiosta (ks. tiedoston alku).
 */
function lambertConic({ lat1, lat2, lon0 }) {
  const t = (lat) => Math.tan(Math.PI / 4 + (lat * RAD) / 2);
  const n = Math.log(Math.cos(lat1 * RAD) / Math.cos(lat2 * RAD))
    / Math.log(t(lat2) / t(lat1));
  const f = (Math.cos(lat1 * RAD) * t(lat1) ** n) / n;
  return (lon, lat) => {
    const rho = f / t(lat) ** n;
    const theta = n * (lon - lon0) * RAD;
    return [rho * Math.sin(theta), rho * Math.cos(theta)];
  };
}

/**
 * Sovittaa projisoidut pisteet laudalle.
 * Sanatarkka kopio tools/project.mjs:n funktiosta, paitsi että tulosta
 * ei pyöristetä desimaaliin: renkaat pyöristetään vasta tulostuksessa.
 */
function fitToBoard(groups, { size = 1000, margin = 18 } = {}) {
  const all = groups.flat();
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const minX = Math.min(...xs); const maxX = Math.max(...xs);
  const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const usable = size - 2 * margin;
  const scale = Math.min(usable / (maxX - minX), usable / (maxY - minY));
  const offX = margin + (usable - (maxX - minX) * scale) / 2;
  const offY = margin + (usable - (maxY - minY) * scale) / 2;
  return ([x, y]) => [(x - minX) * scale + offX, (y - minY) * scale + offY];
}

const lauta = JSON.parse(fs.readFileSync(LAUTADATA, 'utf8'));
const project = lambertConic(lauta.projection);
// Sama sovitusjoukko kuin project.mjs:llä: ääriviivat, kaupungit ja
// merireittien välipisteet. Jos joukko olisi eri, mittakaava eroaisi.
const fit = fitToBoard([
  ...Object.values(lauta.outlines).map((r) => r.map(([lo, la]) => project(lo, la))),
  Object.values(lauta.cities).map((c) => project(...c)),
  ...Object.values(lauta.routes ?? {}).map((r) => r.map(([lo, la]) => project(lo, la))),
]);
/** Maantieteellinen piste laudan koordinaatistoon. */
const P = (lon, lat) => fit(project(lon, lat));

/*
 * Näkyvyystesti tehdään LAUDAN OMIA ÄÄRIVIIVOJA vasten (pack.map.outlines),
 * ei mapdatan projisoituja pisteitä vasten. Ero on olennainen: laudalla
 * Havaijin saariketju on käsin siirretty lähemmäs mannerta (x 168…197,
 * northamerica.js:n oma kommentti "tuotu lähemmäs mannerta, jotta lauta
 * rajautuu tiiviisti"), kun mapdatan tosipaikka projisoituu kohtaan
 * x 18…47. Sama clipPath, jota peli käyttää maasävyn rajaamiseen, on
 * tehty juuri näistä ääriviivoista — joten tämä on se raja, joka
 * ratkaisee mikä oikeasti näkyy.
 */
const AARIVIIVAT = NORTHAMERICA.map.outlines;

// Laudan maantieteellinen ikkuna, hieman reunojen yli. Tärkein tehtävä on
// pudottaa päivämääränrajan takaiset Aleutit (positiiviset pituusasteet).
const IKKUNA = { lonMin: -180, lonMax: -10, latMin: 4, latMax: 84 };
const MIN_PISTEITA = 4;
const MIN_KOKO = 12;

/*
 * Maakohtainen kokoraja, sama periaate kuin Lähi-idän Bahrainilla.
 * Bermuda on laudalla 1,9 × 1,5 yksikköä — koko maa, ei sirpale.
 * Yleisen rajan pudottaminen 2:een päästäisi takaisin kymmenet
 * Meksikon ja Kuuban kalliot, joten raja lasketaan vain nimetylle
 * maalle.
 */
const OMA_MIN_KOKO = { BMU: 1.5 };

const argumentit = process.argv.slice(2);
const vainTarkistus = argumentit.includes('--tarkista');
const koodit = argumentit.filter((a) => !a.startsWith('--'));

/** Osuuko piste monikulmion sisään (ray casting). */
function sisalla([x, y], monikulmio) {
  let osuu = false;
  for (let i = 0, j = monikulmio.length - 1; i < monikulmio.length; j = i, i += 1) {
    const [xi, yi] = monikulmio[i];
    const [xj, yj] = monikulmio[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
}

/**
 * Näkyykö rengas laudalla eli leikkaako se piirretyn rannikon?
 *
 * Testi on molempiin suuntiin. Pelkkä "onko renkaan piste ääriviivan
 * sisällä" riittää isoille maille, mutta kaatuu pienimpiin: Bermuda on
 * laudalla 1,9 yksikköä leveä, ja sen kahdeksan Natural Earth -pistettä
 * osuvat kaikki laudan viisikulmaisen Bermuda-ääriviivan ULKOPUOLELLE,
 * vaikka muodot ovat päällekkäin. Siksi kysytään myös toisin päin:
 * onko laudan ääriviivan piste renkaan sisällä.
 */
function nakyy(pisteet) {
  if (pisteet.some((p) => AARIVIIVAT.some((a) => sisalla(p, a)))) return true;
  return AARIVIIVAT.some((a) => a.some((p) => sisalla(p, pisteet)));
}

/** Ramer–Douglas–Peucker: karsii pisteitä säilyttäen muodon. */
function harvenna(pisteet, siedatty) {
  if (pisteet.length < 3) return pisteet;
  let maxD = 0;
  let jako = 0;
  const [ax, ay] = pisteet[0];
  const [bx, by] = pisteet[pisteet.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const pit = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pisteet.length - 1; i += 1) {
    const [px, py] = pisteet[i];
    const d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / pit;
    if (d > maxD) { maxD = d; jako = i; }
  }
  if (maxD <= siedatty) return [pisteet[0], pisteet[pisteet.length - 1]];
  return [
    ...harvenna(pisteet.slice(0, jako + 1), siedatty).slice(0, -1),
    ...harvenna(pisteet.slice(jako), siedatty),
  ];
}

/**
 * Sovituksen tarkistus laudan omia kaupunkeja vasten. Tämä on se portti,
 * joka kertoo onko projektio yhä laudan projektio: jos joku muuttaa
 * project.mjs:ää tai mapdataa, jäännös kasvaa ja se näkyy tässä heti.
 */
function tarkistaSovitus() {
  const laudalla = Object.fromEntries(NORTHAMERICA.cities.map((c) => [c.id, [c.x, c.y]]));
  const rivit = [];
  for (const [nimi, [lon, lat]] of Object.entries(lauta.cities)) {
    if (!laudalla[nimi]) continue;
    const [x, y] = P(lon, lat);
    rivit.push([nimi, Math.hypot(x - laudalla[nimi][0], y - laudalla[nimi][1])]);
  }
  rivit.sort((a, b) => b[1] - a[1]);
  console.error(`sovitus: ${rivit.length} kaupunkia`);
  for (const [nimi, j] of rivit.slice(0, 4)) {
    console.error(`  suurimmat jäännökset: ${nimi} ${j.toFixed(2)}`);
  }
  return rivit;
}

const jaannokset = tarkistaSovitus();
if (vainTarkistus || !koodit.length) {
  if (!vainTarkistus) {
    console.error('Anna maakoodit, esim. node tools/northamerica-countries.mjs USA CAN');
    process.exit(1);
  }
  // Kaksi laudalla tahallaan siirrettyä kohdetta pois, ks. tiedoston alku.
  const siirretyt = new Set(['hawaii', 'havanna']);
  const puhtaat = jaannokset.filter(([n]) => !siirretyt.has(n));
  console.error(`suurin jäännös siirretyt pois lukien: ${puhtaat[0][1].toFixed(2)} (${puhtaat[0][0]})`);
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(LAHDE, 'utf8'));

for (const koodi of koodit) {
  const maa = data.features.find((f) => (f.properties.ADM0_A3 ?? f.properties.ISO_A3) === koodi);
  if (!maa) { console.error('ei löytynyt:', koodi); continue; }
  const monet = maa.geometry.type === 'MultiPolygon'
    ? maa.geometry.coordinates
    : [maa.geometry.coordinates];
  const renkaat = [];
  let piiloon = 0;
  for (const polygoni of monet) {
    // Vain ulkokehä (polygoni[0]); reiät eivät näy pelin mittakaavassa.
    const keha = polygoni[0];
    const ikkunassa = keha.some(([lon, lat]) => lon >= IKKUNA.lonMin && lon <= IKKUNA.lonMax
      && lat >= IKKUNA.latMin && lat <= IKKUNA.latMax);
    if (!ikkunassa) continue;
    let pisteet = keha.map(([lon, lat]) => P(lon, lat));
    // GeoJSON toistaa ensimmäisen pisteen lopussa; polku suljetaan Z:lla.
    if (pisteet.length > 1
      && pisteet[0][0] === pisteet[pisteet.length - 1][0]
      && pisteet[0][1] === pisteet[pisteet.length - 1][1]) pisteet.pop();
    const xs = pisteet.map((p) => p[0]);
    const ys = pisteet.map((p) => p[1]);
    const koko = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    if (koko < (OMA_MIN_KOKO[koodi] ?? MIN_KOKO)) continue;
    if (!nakyy(pisteet)) { piiloon += 1; continue; }
    /*
     * Harvennuksen sietoraja on mallin kaava (koko / 110, katto 2,4,
     * lattia 0,5) yhdellä lisäyksellä: lattia ei saa olla isompi kuin
     * kahdeskymmenesosa renkaasta. Mallin kiinteä 0,5 söi Bermudan
     * kokonaan — koko maa on laudalla 1,9 yksikköä, joten puolen
     * yksikön sietoraja tiivisti sen kahdeksi pisteeksi ja MIN_PISTEITA
     * pudotti sen sen jälkeen äänettömästi. Kaikilla vähintään 10
     * yksikön renkailla tämä on täsmälleen sama kuin mallissa.
     */
    const siedatty = Math.min(2.4, Math.max(koko / 110, Math.min(0.5, koko / 20)));
    pisteet = harvenna(pisteet, siedatty);
    if (pisteet.length < MIN_PISTEITA) continue;
    renkaat.push(pisteet);
  }
  if (piiloon) console.error(`  ${koodi}: ${piiloon} rengasta laudan rannikon ulkopuolella, pudotettu`);
  if (!renkaat.length) { console.error('ei renkaita ikkunassa:', koodi); continue; }
  renkaat.sort((a, b) => b.length - a.length);
  const kaikki = renkaat.flat();
  const xs = kaikki.map((p) => p[0]);
  const ys = kaikki.map((p) => p[1]);
  const keskus = [
    ((Math.min(...xs) + Math.max(...xs)) / 2).toFixed(1),
    ((Math.min(...ys) + Math.max(...ys)) / 2).toFixed(1),
  ];
  const leveys = Math.round(Math.max(...xs) - Math.min(...xs));
  console.log(`// ${koodi}: ${renkaat.length} rengasta, ${kaikki.length} pistettä`);
  console.log(`    keskus: [${keskus.join(', ')}],`);
  console.log(`    leveys: ${leveys},`);
  console.log('    renkaat: [');
  for (const r of renkaat) {
    console.log(`      [${r.map(([x, y]) => `[${x.toFixed(1)}, ${y.toFixed(1)}]`).join(', ')}],`);
  }
  console.log('    ],');
}
