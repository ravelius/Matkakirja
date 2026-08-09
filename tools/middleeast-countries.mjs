/*
 * Lähi-idän maiden rajat pelin karttaprojektioon.
 *
 *   node tools/middleeast-countries.mjs TUR IRN SAU
 *
 * Sisarteos tools/europe-countries.mjs:lle: lukee Natural Earthin
 * 50m-maapolygonit (public domain) ja tulostaa `renkaat`-listat, jotka
 * liitetään js/packs/middleeast-countries.js:ään.
 *
 * PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU. middleeast.js ei kerro
 * kaavaansa missään, joten se sovitettiin pienimmän neliösumman
 * suoralla laudan 29 kaupungin x/y-arvoista ja niiden todellisista
 * koordinaateista:
 *
 *   X = (lon - 24) * 25        Y = (44.1 - lat) * 29.28
 *
 * Sovituksen jäännökset ovat alle 16 lautayksikköä eli 1,6 % laudan
 * leveydestä, ja kolme suurinta ovat juuri niitä kohteita, joita on
 * tyylitelty tai joilla ei ole tarkkaa keskipistettä: Jerusalem
 * (siirretty erilleen), Petra ja Rub al-Khali (aavikkoalue). Muut 26
 * kaupunkia osuvat muutaman yksikön tarkkuudella.
 *
 * MIN_KOKO on pienempi kuin Euroopassa (15 vs 25), koska Qatar on
 * laudalla vain noin 22 yksikköä leveä ja putoaisi muuten pois.
 *
 * Merentakaiset ja laudan ulkopuoliset renkaat karsitaan ikkunalla —
 * esimerkiksi Turkin ja Egyptin polygoneihin kuuluu paloja, jotka eivät
 * ole tällä laudalla.
 */
import fs from 'node:fs';

const LAHDE = process.env.NE_GEOJSON ?? 'ne50.geojson';
const X = (lon) => (lon - 24) * 25;
const Y = (lat) => (44.1 - lat) * 29.28;
// Laudan ikkuna maantieteellisinä asteina, hieman reunojen yli.
const IKKUNA = { lonMin: 21, lonMax: 65, latMin: 9, latMax: 45 };
const MIN_PISTEITA = 4;
const MIN_KOKO = 15;

/*
 * Laudan ulkopuoliset saaret, jotka osuvat ikkunaan mutta eivät ole
 * laudalla. Kokorajalla näitä ei saa pois: Sokotra on 30 yksikköä
 * leveä eli isompi kuin Omanin Musandam (9), joka taas on oikea ja
 * tarpeellinen pala Hormuzinsalmen suulla. Siksi poisto on nimetty.
 *
 * Ilman tätä Sokotra piirtyi irralliseksi läiskäksi avomerelle
 * Jemenin väreissä, satoja yksiköitä laudan rannikosta — sama vika
 * jonka Euroopan työkalu hoitaa ikkunarajauksella (Guayana,
 * Kanariansaaret). Rengas pudotetaan, jos sen keskipiste osuu
 * laatikkoon.
 */
const POIS = [
  { nimi: 'Sokotra (Jemen)', lonMin: 53, lonMax: 55, latMin: 12, latMax: 13 },
];

const data = JSON.parse(fs.readFileSync(LAHDE, 'utf8'));
const koodit = process.argv.slice(2);
if (!koodit.length) {
  console.error('Anna maakoodit, esim. node tools/middleeast-countries.mjs TUR IRN');
  process.exit(1);
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

for (const koodi of koodit) {
  const maa = data.features.find((f) => (f.properties.ADM0_A3 ?? f.properties.ISO_A3) === koodi);
  if (!maa) { console.error('ei löytynyt:', koodi); continue; }
  const monet = maa.geometry.type === 'MultiPolygon'
    ? maa.geometry.coordinates
    : [maa.geometry.coordinates];
  const renkaat = [];
  for (const polygoni of monet) {
    // Vain ulkokehä (polygoni[0]); reiät eivät näy pelin mittakaavassa.
    const keha = polygoni[0];
    const ikkunassa = keha.some(([lon, lat]) => lon >= IKKUNA.lonMin && lon <= IKKUNA.lonMax
      && lat >= IKKUNA.latMin && lat <= IKKUNA.latMax);
    if (!ikkunassa) continue;
    let pisteet = keha.map(([lon, lat]) => [X(lon), Y(lat)]);
    // GeoJSON toistaa ensimmäisen pisteen lopussa; polku suljetaan Z:lla.
    if (pisteet.length > 1
      && pisteet[0][0] === pisteet[pisteet.length - 1][0]
      && pisteet[0][1] === pisteet[pisteet.length - 1][1]) pisteet.pop();
    const xs = pisteet.map((p) => p[0]);
    const ys = pisteet.map((p) => p[1]);
    const koko = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    if (koko < MIN_KOKO) continue;
    const kLon = ((Math.min(...xs) + Math.max(...xs)) / 2) / 25 + 24;
    const kLat = 44.1 - ((Math.min(...ys) + Math.max(...ys)) / 2) / 29.28;
    const pois = POIS.find((p) => kLon >= p.lonMin && kLon <= p.lonMax
      && kLat >= p.latMin && kLat <= p.latMax);
    if (pois) { console.error(`  ${koodi}: pudotettu laudan ulkopuolinen ${pois.nimi}`); continue; }
    pisteet = harvenna(pisteet, Math.max(0.5, Math.min(2.4, koko / 110)));
    if (pisteet.length < MIN_PISTEITA) continue;
    renkaat.push(pisteet);
  }
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
