/*
 * Etelä-Amerikan maiden rajat pelin karttaprojektioon.
 *
 *   node tools/southamerica-countries.mjs BRA ARG CHL
 *   node tools/southamerica-countries.mjs --tarkista      (pelkkä sovitusraportti)
 *
 * Sisarteos tools/northamerica-countries.mjs:lle: lukee Natural Earthin
 * 50m-maapolygonit (public domain) ja tulostaa `renkaat`-listat, jotka
 * liitetään js/packs/southamerica-countries.js:ään.
 *
 * PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU — EIKÄ SE OLE LINEAARINEN.
 *
 * Sama oppi kuin Pohjois-Amerikassa. southamerica.js:n oma alkukommentti
 * kertoo, että lauta on Lambertin konformisessa kartioprojektiossa
 * (standardileveyspiirit 5° ja 45° etelää, keskimeridiaani 60° läntistä),
 * ja tools/project.mjs on se ohjelma, jolla laudan pisteet on tuotettu
 * tools/mapdata/southamerica.json:sta. Kartioprojektiossa pituuspiirit
 * kaartuvat, joten suora sovitus ei osu sekä Karibialle että Kap Horniin.
 *
 * Siksi projektio johdetaan laudasta samasta lähdeaineistosta ja samalla
 * kaavalla kuin lauta itse:
 *
 *     lambertConic(mapdata.projection)  +  fitToBoard(kaikki laudan pisteet)
 *
 * Sovitus tarkistetaan joka ajolla laudan omia kaupunkeja vasten
 * (tarkistaSovitus alla). Tulos 23.8.2026:
 *
 *     38 kohdetta, suurin jäännös 0,65 yksikköä (Rio de Janeiro) =
 *     0,065 % laudan leveydestä, kun kaksi laudalla TAHALLAAN siirrettyä
 *     kohdetta jätetään pois. Siirretyt ovat:
 *       - Montevideo 32,2 yksikköä. Oikealta paikaltaan (578,9, 681,4)
 *         se jäisi 25 yksikön päähän Buenos Airesista, kun laudan
 *         minCityDistance on 50; laudalla se on siirretty itään ja
 *         pohjoiseen Uruguayn rannikkoa pitkin kohtaan (606, 664),
 *         jolloin väli on 55.
 *       - Asunción 20,3 yksikköä. Oikealta paikaltaan (565,9, 554,3)
 *         se jäisi 38 yksikön päähän Iguazústa; laudalla (550, 567)
 *         väli on 53. Molemmat pisteet ovat yhä Paraguayn sisällä.
 *     Ouro Preto EI ole tässä listassa, vaikka southamerica.js kertoo
 *     sen olevan noin 170 km todellista paikkaansa pohjoisessa: siirto
 *     on tehty jo lähdeaineistoon (mapdata cities.ouropreto on
 *     -43,69 / -18,88), joten laudan ja tämän työkalun välillä ei ole
 *     eroa. Sama koskee kaikkia muita 35 kohdetta, jotka osuvat alle
 *     0,66 yksikön tarkkuudella — jäännös on käytännössä pelkkää laudan
 *     pyöristystä kokonaisiin yksiköihin.
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
 * RENKAIDEN KARSINTA on kolmiportainen, sama kuin Pohjois-Amerikassa:
 *   1. IKKUNA — maantieteellinen laatikko. Karsii Ranskan Guayanan
 *      emämaan ja Chilen Tyynenmeren kaukosaaret (Pääsiäissaari,
 *      Sala y Gómez), jotka projisoituisivat laudan ulkopuolelle tai
 *      pahimmillaan mielivaltaiseen paikkaan.
 *   2. NÄKYVYYS — rengas kelpaa vain jos se leikkaa laudan piirretyn
 *      rannikon (map.outlines). Pelin maasävy rajataan joka tapauksessa
 *      ui.js:n maa-rajaus-clipPathilla noihin samoihin ääriviivoihin,
 *      joten mikä tahansa niiden ulkopuolinen rengas on näkymätön paino
 *      tiedostossa. Käytännössä se pudottaa Chilen ja Argentiinan
 *      Tulimaan eteläisimmät sirpaleet, Brasilian Atlantin pikkusaaret
 *      ja Ecuadorin mannerrannikon saaret.
 *   3. MIN_KOKO — sirpaleiden karsinta, oletuksena 12 yksikköä.
 *      Ecuadorille on nimetty oma raja 3 aivan kuten Bermudalle
 *      Pohjois-Amerikassa ja Bahrainille Lähi-idässä: Galápagos on
 *      laudalla kokonaisuudessaan 36 yksikköä leveä, mutta sen saaret
 *      ovat erikseen 4–14 yksikköä, joten yleisellä rajalla saaristosta
 *      jäisi jäljelle vain Isabela — ja laudan Galápagos-kohde (105,
 *      271) osuu itäisemmille saarille, jotka putoaisivat pois.
 *      Falkland ei tarvitse omaa rajaa: sen kaksi pääsaarta ovat
 *      laudalla 15 ja 17 yksikköä leveitä.
 *
 *      KOLME LAUDAN SAARTA JÄÄ TAHALLAAN ILMAN RENGASTA. Robinson
 *      Crusoe (2 yksikköä), Kap Horn (5) ja San Ambrosio (3) ovat
 *      Chilen alueita, mutta liian pieniä sirpalerajalle — ja San
 *      Ambrosion Desventuradas-saaria ei ole Natural Earthin 50m-
 *      aineistossa lainkaan. Chilen rajan laskeminen kolmeen nostaisi
 *      renkaiden määrän kuudesta kuuteentoista pelkkien Patagonian
 *      vuonokallioiden takia. Kohteet osoittavat silti Chileen
 *      cityCountryssa, aivan kuten Havaiji osoittaa USA:han ilman
 *      muotoa Pohjois-Amerikan laudalla.
 *
 * KESKUS on renkaiden yhteinen rajauslaatikon keskipiste. Se on vain
 * vertailutilan maakyltin paikka (js/vertailu.js), ja osalle maista
 * automaattinen piste osuu huonosti (Chilellä kapean maan laatikon
 * keskipiste jää Argentiinan puolelle, Ecuadorilla Galápagos vetää sen
 * merelle). Ne on siirretty käsin pakettitiedostossa, ja jokaisen
 * kohdalla lukee miksi.
 */
import fs from 'node:fs';
import { SOUTHAMERICA } from '../js/packs/southamerica.js';

const LAHDE = process.env.NE_GEOJSON ?? 'ne50.geojson';
const LAUTADATA = 'tools/mapdata/southamerica.json';

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
 * ei mapdatan projisoituja pisteitä vasten. Sama clipPath, jota peli käyttää
 * maasävyn rajaamiseen, on tehty juuri näistä ääriviivoista — joten tämä on
 * se raja, joka ratkaisee mikä oikeasti näkyy.
 */
const AARIVIIVAT = SOUTHAMERICA.map.outlines;

// Laudan maantieteellinen ikkuna, hieman reunojen yli. Tärkeimmät tehtävät
// ovat Ranskan Guayanan emämaan ja Chilen Tyynenmeren kaukosaarten
// (Pääsiäissaari lon -109, Sala y Gómez lon -105) pudottaminen.
const IKKUNA = {
  lonMin: -95, lonMax: -33, latMin: -57, latMax: 14,
};
const MIN_PISTEITA = 4;
const MIN_KOKO = 12;

/*
 * Maakohtainen kokoraja, sama periaate kuin Pohjois-Amerikan Bermudalla
 * ja Lähi-idän Bahrainilla. Falklandinsaaret ja Galápagos ovat laudalla
 * pikkuruisia saaristoja, joiden yksittäiset saaret jäävät yleisen rajan
 * alle — mutta ne ovat koko maa tai koko laudan kohde, eivät sirpale.
 */
const OMA_MIN_KOKO = { ECU: 3 };

/*
 * Natural Earthin admin-0-aineistossa Ranskan Guayana EI ole oma
 * kohteensa: se on yksi Ranskan MultiPolygonin osista (lon -54,6…-51,7,
 * lat 2,1…5,8). Siksi GUF haetaan Ranskan kohteesta, ja IKKUNA tekee
 * loput — Guadeloupe (lat 16), Martinique (lat 14,4) ja emämaa jäävät
 * kaikki ikkunan ulkopuolelle, joten jäljelle jää täsmälleen Guayana.
 * Tunnus GUF on silti oikea ISO-3166-1 alpha-3 -koodi ja sama, jota
 * laudan cityCountry ja tools/mannerten-rajat.mjs käyttävät.
 */
const LAHDEKOODI = { GUF: 'FRA' };

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
 * Galápagos ja Falkland on piirretty muutamalla pisteellä, ja Natural
 * Earthin tarkat saaret voivat osua kokonaan niiden väliin. Siksi
 * kysytään myös toisin päin: onko laudan ääriviivan piste renkaan sisällä.
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
 * Sovituksen tarkistus laudan omia kohteita vasten. Tämä on se portti,
 * joka kertoo onko projektio yhä laudan projektio: jos joku muuttaa
 * project.mjs:ää tai mapdataa, jäännös kasvaa ja se näkyy tässä heti.
 */
function tarkistaSovitus() {
  const laudalla = Object.fromEntries(SOUTHAMERICA.cities.map((c) => [c.id, [c.x, c.y]]));
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
    console.error('Anna maakoodit, esim. node tools/southamerica-countries.mjs BRA ARG');
    process.exit(1);
  }
  // Kaksi laudalla tahallaan siirrettyä kohdetta pois, ks. tiedoston alku.
  const siirretyt = new Set(['montevideo', 'asuncion']);
  const puhtaat = jaannokset.filter(([n]) => !siirretyt.has(n));
  console.error(`suurin jäännös siirretyt pois lukien: ${puhtaat[0][1].toFixed(2)} (${puhtaat[0][0]})`);
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(LAHDE, 'utf8'));

for (const koodi of koodit) {
  const haettava = LAHDEKOODI[koodi] ?? koodi;
  const maa = data.features.find((f) => (f.properties.ADM0_A3 ?? f.properties.ISO_A3) === haettava);
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
     * Harvennuksen sietoraja on sama kaava kuin Pohjois-Amerikassa
     * (koko / 110, katto 2,4, lattia 0,5, mutta lattia enintään
     * kahdeskymmenesosa renkaasta). Kiinteä 0,5 söisi pienimmät saaret
     * kahdeksi pisteeksi, ja MIN_PISTEITA pudottaisi ne sen jälkeen
     * äänettömästi. Vähintään 10 yksikön renkailla tämä on täsmälleen
     * sama kuin mallissa.
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
