/*
 * Oseanian maiden rajat pelin karttaprojektioon.
 *
 *   node tools/oceania-countries.mjs AUS PNG NZL
 *   node tools/oceania-countries.mjs --tarkista      (pelkkä sovitusraportti)
 *
 * Sisarteos tools/northamerica-countries.mjs:lle ja
 * tools/middleeast-countries.mjs:lle: lukee Natural Earthin 50m-maapolygonit
 * (public domain) ja tulostaa `renkaat`-listat, jotka liitetään
 * js/packs/oceania-countries.js:ään.
 *
 * PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU — EIKÄ SE OLE LINEAARINEN.
 *
 * Sama oppi kuin Pohjois-Amerikassa: oceania.js:n oma alkukommentti kertoo,
 * että lauta on Lambertin konformisessa kartioprojektiossa (standardileveys-
 * piirit 10° ja 40° etelää, keskimeridiaani 145° itäistä), ja
 * tools/project.mjs on se ohjelma, jolla laudan pisteet on tuotettu
 * tools/mapdata/oceania.json:sta. Kartiossa pituuspiirit kaartuvat, joten
 * suora sovitus ei voi osua sekä Baliin että Fidžiin.
 *
 * Siksi projektio johdetaan laudasta samasta lähdeaineistosta ja samalla
 * kaavalla kuin lauta itse:
 *
 *     lambertConic(mapdata.projection)  +  fitToBoard(kaikki laudan pisteet)
 *
 * Sovitus tarkistetaan joka ajolla laudan omia kaupunkeja vasten
 * (tarkistaSovitus alla). Tulos 23.8.2026:
 *
 *     33 kohdetta, suurin jäännös 0,64 yksikköä (Norfolk) = 0,06 %
 *     laudan leveydestä. Yhtään kohdetta ei ole laudalla tahallaan
 *     siirretty: kaikki 33 osuvat alle 0,7 yksikön tarkkuudella, joten
 *     poikkeuslistaa ei tarvita (Pohjois-Amerikassa Havaiji ja Havanna
 *     oli siirretty käsin, tällä laudalla ei mitään).
 *
 * 180. PITUUSPIIRI RATKAISTAAN EKSPLISIITTISESTI.
 *
 * Tämä on Oseanian oma pulma, jota millään aiemmalla laudalla ei ollut.
 * Lauta ulottuu Balista (115° itäistä) Fidžille, joka on päivämääränrajan
 * MOLEMMIN PUOLIN: Viti Levu on 177…180° itäistä, mutta Vanua Levun ja
 * Taveunin itäpuoliset saaret ovat Natural Earthissa arvoilla −180…−178.
 * Jos ne syötettäisiin sellaisenaan, theta = n * (lon − 145) heittäisi ne
 * lähes koko kartion yli ja renkaat piirtyisivät vaakaviivoina halki
 * kartan.
 *
 * Korjaus on yksi rivi, normalisoiLon alla: pituusaste kierretään samalle
 * kierrokselle keskimeridiaanin kanssa, eli välille (lon0 − 180, lon0 + 180]
 * = (−35°, 325°]. Käytännössä kaikki negatiiviset arvot saavat +360, jolloin
 * −179,8 → 180,2 ja Fidžin itäpuoli jatkuu saumattomasti länsipuolesta.
 * Sama tehdään ikkunatestissä, jotta rajan takaiset renkaat eivät putoa
 * pois vertailussa. Tarkistettu ajossa: Fidžin renkaat osuvat laudan
 * fijiPoints-ääriviivan päälle (x 952…982), eivät kartan poikki.
 *
 * Natural Earth katkaisee polygonit rajalle, joten yhdenkään renkaan
 * sisällä ei ole hyppyä; työkalu varmistaa sen ja huutaa jos joskus on
 * (LEVEIN_RENGAS alla).
 *
 * MIKSI PROJEKTIOFUNKTIOT ON KOPIOITU TÄHÄN eikä tuotu project.mjs:stä:
 * project.mjs on komentorivityökalu, joka lukee process.argv[2]:n ja
 * tulostaa koko laudan heti moduulia ladattaessa — import saastuttaisi
 * tämän työkalun tulosteen ja kaatuisi ilman lauta-argumenttia. Kopiot
 * ovat sanasta sanaan samat, ja tarkistaSovitus paljastaa heti jos ne
 * joskus eroavat: jäännös kasvaisi.
 *
 * RENKAIDEN KARSINTA on kolmiportainen, kuten Pohjois-Amerikassa:
 *   1. IKKUNA — maantieteellinen laatikko normalisoiduissa pituusasteissa.
 *   2. NÄKYVYYS — rengas kelpaa vain jos se leikkaa laudan piirrettyä
 *      rannikkoa (map.outlines). Pelin maasävy rajataan joka tapauksessa
 *      ui.js:n maa-rajaus-clipPathilla noihin samoihin ääriviivoihin,
 *      joten mikä tahansa niiden ulkopuolinen rengas on näkymätön paino
 *      tiedostossa. Tällä laudalla se pudottaa mm. Indonesian sadat
 *      saaret Balin ja Länsi-Timorin ulkopuolelta, Australian pikkuluodot
 *      sekä Uuden-Seelannin Chathamin ja subantarktiset saaret.
 *   3. MIN_KOKO — sirpaleiden karsinta, oletuksena 12 yksikköä.
 *
 * MIKSI PIKKUVALTIOILLA ON OMA KOKORAJA. Oseania on saarimanner, ja moni
 * laudan maa on kokonaisuudessaan pienempi kuin yleinen 12 yksikön raja
 * (1 lautayksikkö ≈ 8 km). Efate, jolla Port Vila on, on 6 yksikköä leveä;
 * Norfolkinsaari on 1,4. Yleinen raja pudottaisi ne kokonaan, eli maalta
 * katoaisi muoto vaikka kohde on laudalla. Siksi neljälle saarivaltiolle
 * on nimetty oma raja aivan kuten Bermudalle Pohjois-Amerikassa ja
 * Bahrainille Lähi-idässä.
 */
import fs from 'node:fs';
import { OCEANIA } from '../js/packs/oceania.js';

const LAHDE = process.env.NE_GEOJSON ?? 'ne50.geojson';
const LAUTADATA = 'tools/mapdata/oceania.json';

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
const { lon0 } = lauta.projection;

/**
 * Pituusaste samalle kierrokselle keskimeridiaanin kanssa, välille
 * (lon0 − 180, lon0 + 180]. Tämä on 180. pituuspiirin ratkaisu:
 * ilman sitä Fidžin itäpuoli (−179,8°) menisi kartion väärälle laidalle.
 * Laudan omat pisteet ovat jo valmiiksi tällä välillä (115…178,2),
 * joten funktio ei muuta niitä lainkaan.
 */
const normalisoiLon = (lon) => {
  let l = lon;
  while (l <= lon0 - 180) l += 360;
  while (l > lon0 + 180) l -= 360;
  return l;
};

const project = lambertConic(lauta.projection);
// Sama sovitusjoukko kuin project.mjs:llä: ääriviivat, kaupungit ja
// merireittien välipisteet. Jos joukko olisi eri, mittakaava eroaisi.
const fit = fitToBoard([
  ...Object.values(lauta.outlines).map((r) => r.map(([lo, la]) => project(lo, la))),
  Object.values(lauta.cities).map((c) => project(...c)),
  ...Object.values(lauta.routes ?? {}).map((r) => r.map(([lo, la]) => project(lo, la))),
]);
/** Maantieteellinen piste laudan koordinaatistoon. */
const P = (lon, lat) => fit(project(normalisoiLon(lon), lat));

/*
 * Näkyvyystesti tehdään LAUDAN OMIA ÄÄRIVIIVOJA vasten (pack.map.outlines).
 * Sama clipPath, jota peli käyttää maasävyn rajaamiseen, on tehty juuri
 * näistä ääriviivoista — joten tämä on se raja, joka ratkaisee mikä
 * oikeasti näkyy.
 */
const AARIVIIVAT = OCEANIA.map.outlines;

// Laudan maantieteellinen ikkuna normalisoiduissa pituusasteissa, hieman
// reunojen yli. Bali on 115° ja Fidžin itäisin saari 182° (= −178°).
const IKKUNA = {
  lonMin: 108, lonMax: 190, latMin: -50, latMax: 2,
};
const MIN_PISTEITA = 4;
const MIN_KOKO = 12;

/*
 * Maakohtainen kokoraja, sama periaate kuin Pohjois-Amerikan Bermudalla.
 * Nämä neljä ovat saarivaltioita, joiden KOKO MAA jää yleisen rajan alle
 * tai lähelle sitä — raja lasketaan vain nimetyille mailta, jottei
 * Australian ja Indonesian tuhannet luodot pääse takaisin.
 *   VUT  Efate (Port Vila) on 6 yksikköä, Espiritu Santo 14
 *   FJI  Viti Levu on 18, Vanua Levu 15, muut alle 5
 *   NCL  Grande Terre on 47, Loyautén saaret 5…9
 *   NFK  koko Norfolkinsaari on 1,4 yksikköä leveä
 */
const OMA_MIN_KOKO = {
  VUT: 3, FJI: 3, NCL: 4, NFK: 0.8,
};

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
 * sisällä" riittää isoille maille, mutta kaatuu pienimpiin: laudan
 * Norfolk on viisikulmio, jonka sisään Natural Earthin saaren pisteet
 * eivät kaikki mahdu. Siksi kysytään myös toisin päin: onko laudan
 * ääriviivan piste renkaan sisällä.
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
  const laudalla = Object.fromEntries(OCEANIA.cities.map((c) => [c.id, [c.x, c.y]]));
  const rivit = [];
  for (const [nimi, [lon, lat]] of Object.entries(lauta.cities)) {
    if (!laudalla[nimi]) continue;
    const [x, y] = P(lon, lat);
    rivit.push([nimi, Math.hypot(x - laudalla[nimi][0], y - laudalla[nimi][1])]);
  }
  rivit.sort((a, b) => b[1] - a[1]);
  console.error(`sovitus: ${rivit.length} kohdetta`);
  for (const [nimi, j] of rivit.slice(0, 4)) {
    console.error(`  suurimmat jäännökset: ${nimi} ${j.toFixed(2)}`);
  }
  return rivit;
}

const jaannokset = tarkistaSovitus();
if (vainTarkistus || !koodit.length) {
  if (!vainTarkistus) {
    console.error('Anna maakoodit, esim. node tools/oceania-countries.mjs AUS NZL');
    process.exit(1);
  }
  console.error(`suurin jäännös: ${jaannokset[0][1].toFixed(2)} (${jaannokset[0][0]})`);
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(LAHDE, 'utf8'));

// Jos yksi rengas leviäisi tätä leveämmäksi, se olisi merkki siitä että
// päivämääränraja on jäänyt kiertämättä: rengas piirtyisi viivana halki
// laudan. Lauta on 1000 yksikköä leveä, ja levein oikea muoto (Australia)
// on 560 — 700 on siis reilusti yli kaiken oikean.
const LEVEIN_RENGAS = 700;

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
    const ikkunassa = keha.some(([lon, lat]) => {
      const l = normalisoiLon(lon);
      return l >= IKKUNA.lonMin && l <= IKKUNA.lonMax
        && lat >= IKKUNA.latMin && lat <= IKKUNA.latMax;
    });
    if (!ikkunassa) continue;
    let pisteet = keha.map(([lon, lat]) => P(lon, lat));
    // GeoJSON toistaa ensimmäisen pisteen lopussa; polku suljetaan Z:lla.
    if (pisteet.length > 1
      && pisteet[0][0] === pisteet[pisteet.length - 1][0]
      && pisteet[0][1] === pisteet[pisteet.length - 1][1]) pisteet.pop();
    const xs = pisteet.map((p) => p[0]);
    const ys = pisteet.map((p) => p[1]);
    const leveys = Math.max(...xs) - Math.min(...xs);
    const koko = Math.max(leveys, Math.max(...ys) - Math.min(...ys));
    if (leveys > LEVEIN_RENGAS) {
      console.error(`  ${koodi}: RENGAS LEVIÄÄ ${Math.round(leveys)} YKSIKKÖÄ — `
        + 'päivämääränraja kiertämättä, tarkista normalisoiLon');
    }
    if (koko < (OMA_MIN_KOKO[koodi] ?? MIN_KOKO)) continue;
    if (!nakyy(pisteet)) { piiloon += 1; continue; }
    /*
     * Harvennuksen sietoraja on Pohjois-Amerikan kaava: koko / 110, katto
     * 2,4, lattia 0,5 — mutta lattia ei saa olla isompi kuin kahdes-
     * kymmenesosa renkaasta, ettei pikkusaari tiivisty kahdeksi pisteeksi
     * ja putoa MIN_PISTEITA-rajaan. Oseaniassa tämä on tärkeämpää kuin
     * missään aiemmin: Efate on 6 yksikköä ja Norfolk 1,4.
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
