/*
 * Aasian maiden rajat pelin karttaprojektioon.
 *
 *   node tools/asia-countries.mjs CHN IND RUS
 *   node tools/asia-countries.mjs --tarkista      (pelkkä sovitusraportti)
 *
 * Sisarteos tools/northamerica-countries.mjs:lle: lukee Natural Earthin
 * 50m-maapolygonit (public domain) ja tulostaa `renkaat`-listat, jotka
 * liitetään js/packs/asia-countries.js:ään.
 *
 * PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU — EIKÄ SE OLE LINEAARINEN.
 *
 * Lähi-idässä ja Euroopassa projektio sovitettiin pienimmän neliösumman
 * suoralla laudan kaupunkien x/y-arvoista. Tälle laudalle se EI KELPAA,
 * ja syy on tiedossa eikä arvattu: asia.js:n oma alkukommentti kertoo,
 * että lauta on Lambertin konformisessa kartioprojektiossa (standardi-
 * leveyspiirit 20° ja 60°, keskimeridiaani 105° itäistä), ja
 * tools/project.mjs on se ohjelma, jolla laudan pisteet on tuotettu
 * tools/mapdata/asia.json:sta. Kartioprojektiossa pituuspiirit
 * kaartuvat, joten mikään suora ei osu sekä Teheraniin että Magadaniin:
 * laudan 41 kaupungin paras suora sovitus
 *
 *     X = lon * 7,4377 - 143,20      Y = lat * -11,2982 + 850,79
 *
 * jättää suurimmaksi jäännökseksi 101,5 lautayksikköä (Teheran) eli
 * 10,1 % laudan leveydestä — moninkertaisesti yli sen 3 %:n rajan, jonka
 * jälkeen lineaarista mallia ei saa käyttää.
 *
 * Siksi projektio johdetaan laudasta samasta lähdeaineistosta ja samalla
 * kaavalla kuin lauta itse:
 *
 *     lambertConic(mapdata.projection)  +  fitToBoard(kaikki laudan pisteet)
 *
 * Sovitus tarkistetaan joka ajolla laudan omia kaupunkeja vasten
 * (tarkistaSovitus alla). Tulos 23.8.2026:
 *
 *     41 kaupunkia, suurin jäännös 0,74 yksikköä (Delhi) = 0,07 %
 *     laudan leveydestä. Yksikään kohde ei jää yli 0,75 yksikön päähän,
 *     ja ero on kokonaan siitä, että laudan x/y on pyöristetty
 *     kokonaisluvuiksi. Poikkeuslistaa ei tarvita.
 *
 * LAUDALLA TAHALLAAN SIIRRETYT KOHTEET eivät näy jäännöksinä, koska
 * siirto on tehty jo mapdataan eikä vasta lautaan: Kioto (mapdata
 * 133,7 E — noin 200 km todellisesta lounaaseen, jotta Tokio mahtuu
 * viereen), Varanasi (81,15 E — noin 250 km lounaaseen Kathmandun
 * tieltä) ja Kanton (111,31 E, 26,98 N — siirretty sisämaahan, koska
 * Hongkong on laudan mittakaavassa saman pisteen päällä). Kaikki kolme
 * osuvat silti oman maansa renkaan sisään; se on tarkistettu piste-
 * monikulmiotestillä.
 *
 * MIKSI PROJEKTIOFUNKTIOT ON KOPIOITU TÄHÄN eikä tuotu project.mjs:stä:
 * project.mjs on komentorivityökalu, joka lukee process.argv[2]:n ja
 * tulostaa koko laudan heti moduulia ladattaessa — import saastuttaisi
 * tämän työkalun tulosteen ja kaatuisi ilman lauta-argumenttia.
 * Kopiot ovat sanasta sanaan samat, ja tarkistaSovitus paljastaa heti
 * jos ne joskus eroavat: jäännös kasvaisi.
 *
 * RENKAIDEN KARSINTA on kolmiportainen, sama kuin Pohjois-Amerikassa:
 *   1. IKKUNA — maantieteellinen laatikko. Tärkein tehtävä on pudottaa
 *      päivämääränrajan takainen Tšukotka ja Wrangelinsaari (Natural
 *      Earth antaa niille negatiiviset pituusasteet -180…-169), jotka
 *      kartioprojektiossa lentäisivät laudan vastakkaiseen laitaan.
 *      Laudan oma aineisto päättyy tasan 180 asteeseen.
 *   2. NÄKYVYYS — rengas kelpaa vain jos se leikkaa laudan piirretyn
 *      rannikon (map.outlines). Pelin maasävy rajataan joka tapauksessa
 *      ui.js:n maa-rajaus-clipPathilla noihin samoihin ääriviivoihin,
 *      joten mikä tahansa niiden ulkopuolinen rengas on näkymätön paino
 *      tiedostossa. Käytännössä se pudottaa Indonesian ja Filippiinien
 *      sadat pikkusaaret sekä Japanin eteläiset saariketjut, joita lauta
 *      ei piirrä lainkaan.
 *   3. MIN_KOKO — sirpaleiden karsinta, oletuksena 12 yksikköä.
 *      Singapore ja Hongkong ovat laudalla kumpikin noin 4 yksikköä
 *      leveitä, eli koko maa jäisi rajan alle; niille on nimetty oma
 *      raja aivan kuten Bermudalle Pohjois-Amerikassa ja Bahrainille
 *      Lähi-idässä. Singaporella on lisäksi nimetty poikkeus
 *      näkyvyystestiin (OMA_NAKYVYYS, ks. perustelu sen kohdalla).
 *
 * KESKUS on renkaiden yhteinen rajauslaatikon keskipiste. Se on vain
 * vertailutilan maakyltin paikka (js/vertailu.js), ja osalle maista
 * automaattinen piste osuu huonosti (Venäjällä rengas ulottuu
 * Kaliningradista Tšukotkaan, joten keskipiste jää laudan ulkopuolelle
 * länteen). Ne on siirretty käsin pakettitiedostossa, ja jokaisen
 * kohdalla lukee miksi.
 */
import fs from 'node:fs';
import { ASIA } from '../js/packs/asia.js';

const LAHDE = process.env.NE_GEOJSON ?? 'ne50.geojson';
const LAUTADATA = 'tools/mapdata/asia.json';

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
 * Näkyvyystesti tehdään LAUDAN OMIA ÄÄRIVIIVOJA vasten (pack.map.outlines).
 * Sama clipPath, jota peli käyttää maasävyn rajaamiseen, on tehty juuri
 * näistä ääriviivoista — joten tämä on se raja, joka ratkaisee mikä
 * oikeasti näkyy pelaajalle.
 */
const AARIVIIVAT = ASIA.map.outlines;

// Laudan maantieteellinen ikkuna, hieman reunojen yli. Tärkein tehtävä on
// pudottaa päivämääränrajan takainen Tšukotka (negatiiviset pituusasteet).
const IKKUNA = {
  lonMin: 30, lonMax: 180, latMin: -12, latMax: 80,
};
const MIN_PISTEITA = 4;
const MIN_KOKO = 12;

/*
 * Maakohtainen kokoraja, sama periaate kuin Pohjois-Amerikan Bermudalla
 * ja Lähi-idän Bahrainilla. Singapore on laudalla 4,4 × 2,3 yksikköä ja
 * Hongkong 4,3 × 2,8 — kummallakin koko maa, ei sirpale. Yleisen rajan
 * pudottaminen päästäisi takaisin Indonesian ja Filippiinien sadat
 * kalliot, joten raja lasketaan vain nimetyille maille.
 */
const OMA_MIN_KOKO = { SGP: 1, HKG: 3 };

/*
 * NÄKYVYYSTESTIN NIMETTY POIKKEUS.
 *
 * Singaporen saari projisoituu kohtaan x 634,6…639,0, y 855,2…857,5, ja
 * laudan piirretyn niemimaan eteläkärki loppuu pisteeseen (632,8, 854,5)
 * — eli rengas jää 2,7 yksikköä kärjen kaakkoispuolelle, ulos piirretystä
 * rannikosta. Kumpikaan näkyvyystestin suunta ei siis osu, vaikka
 * kohde itse (Singapore, laudalla 634, 851) on aivan vieressä.
 *
 * Rengas otetaan silti mukaan, koska sillä on kaksi käyttöä, jotka eivät
 * kulje maa-rajaus-clipPathin kautta: saapumiskortin minikartta
 * (ui.js piirraMaakartta piirtää renkaat sellaisenaan, ja ilman niitä
 * kartta jää Singaporelta kokonaan pois) ja vertailutilan maavalinta.
 * Laudan maasävyyn se ei tuo mitään — clipPath leikkaa sen pois — mutta
 * ei myöskään mitään väärää.
 */
const OMA_NAKYVYYS = new Set(['SGP']);

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
 * sisällä" riittää isoille maille, mutta kaatuu pienimpiin: Singaporen
 * ja Hongkongin muutama piste voi osua laudan karkean rannikkoviivan
 * ulkopuolelle, vaikka muodot ovat päällekkäin. Siksi kysytään myös
 * toisin päin: onko laudan ääriviivan piste renkaan sisällä.
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
  const laudalla = Object.fromEntries(ASIA.cities.map((c) => [c.id, [c.x, c.y]]));
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
    console.error('Anna maakoodit, esim. node tools/asia-countries.mjs CHN IND');
    process.exit(1);
  }
  console.error(`suurin jäännös: ${jaannokset[0][1].toFixed(2)} (${jaannokset[0][0]})`);
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
    if (!OMA_NAKYVYYS.has(koodi) && !nakyy(pisteet)) { piiloon += 1; continue; }
    /*
     * Harvennuksen sietoraja on sama kaava kuin Pohjois-Amerikassa
     * (koko / 110, katto 2,4, lattia 0,5 mutta enintään kahdeskymmenes-
     * osa renkaasta). Lattian katto on Singaporea ja Hongkongia varten:
     * kiinteä 0,5 tiivistäisi ne muutamaksi pisteeksi, ja MIN_PISTEITA
     * pudottaisi ne sen jälkeen äänettömästi.
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
