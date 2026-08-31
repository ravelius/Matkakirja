/*
 * MAAPOLYGONIT PELILAUDAN KOORDINAATISTOON — assets/data/maapolygonit.json.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/generoi-maapolygonit.mjs
 *   node tools/generoi-maapolygonit.mjs --tarkista   (pelkkä todennus)
 *
 * Aineisto on maatummennuksen (js/maatummennus.js) ainoa syöte: kun
 * pelaaja on maansa lähikuvassa, MUUT MAAT tummennetaan hienovaraisesti
 * ja NYKYISEN maan ääriviiva piirretään paksummalla. Kumpikin tarvitsee
 * maan todellisen muodon laudan koordinaateissa — pelin oma
 * `countryShapes` on karkea sävytysrengas eikä kelpaa ääriviivaksi, ja
 * laattoihin poltettu rannikko ei ole DOMissa.
 *
 * AINEISTO ON KOKO TUMMENNETTAVA JOUKKO, EI VAIN OMA MAA (omistajan
 * kaappaus 31.8.2026 yöllä: *"Merta ei tarvitse tummentaa"*). Varjo
 * maalataan naapureiden polygoneihin eikä arkinlevyisenä suorakaiteena,
 * joten maa, jota tässä tiedostossa ei ole, jää kartalla tummentamatta
 * ja lukee merenä. Lista on pelin oma `countryShapes` (134 maata), eli
 * pelin ulkopuoliset valtiot (Benin, Malta, Andorra…) ovat tietoisesti
 * ulkona: jos joskus halutaan koko maailma, kasvatetaan tätä listaa
 * eikä piirtäjää.
 *
 * === LÄHDE =========================================================
 *
 * Natural Earth admin-0 countries, 50m (public domain):
 *   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/
 *     master/geojson/ne_50m_admin_0_countries.geojson
 *
 * Sama aineisto on jo repossa (ne50.geojson), ja sitä käytetään jos se
 * löytyy — verkkohaku on vain varareitti tyhjälle työkopiolle. Muut
 * maatyökalut (tools/asia-countries.mjs, tools/africa-borders.mjs)
 * lukevat saman tiedoston, joten maiden muodot ovat kaikkialla samat.
 *
 * === PROJEKTIO EI OLE OMA — SE TUODAAN ============================
 *
 * Maailmankartan lauta on Millerin lieriössä (LEVEYS 12000, LON0 -175,
 * POHJOINEN 76), ja kaava asuu YHDESSÄ paikassa:
 * tools/fokuskartta/piirto.js `laudanProjektio`. Sama funktio piirtää
 * laudan fokuslehdet ja sama kaava on käsin laskettu nostopaikkoihin
 * (js/fokusnosto.js). Sitä ei kirjoiteta tähän uudestaan: kopio
 * eriytyisi ensimmäisessä korjauksessa, ja ääriviiva, joka on
 * puolikkaan asteen sivussa rannikosta, on pahempi kuin ei ääriviivaa
 * lainkaan.
 *
 * TODENNUS ON OSA AJOA (todennaProjektio). Kaksi pelin omaa, käsin
 * laskettua pistettä — Ateenan Iliou Melathron ja Delfoi
 * (js/fokusnosto.js NOSTO_MAAT.GRC) — projisoidaan uudelleen ja
 * verrataan pelin lukuihin. Ero saa olla korkeintaan 0,05
 * lautayksikköä. Jos projektio joskus vaihtuu, ajo pysähtyy tähän eikä
 * kirjoita väärää aineistoa.
 *
 * === PÄIVÄMÄÄRÄNRAJA ===============================================
 *
 * Laudan sauma ei ole 180. asteella vaan LON0:ssa eli 175. läntisellä,
 * keskellä Beringinmerta. Natural Earthin renkaat on katkaistu ±180
 * asteeseen, joten sauman yli menevät renkaat (Tšukotka, Alaskan
 * Aleutit, Fidži, Uusi-Seelanti) hyppäisivät laudan laidasta toiseen.
 * `puraRengas` purkaa hypyt: peräkkäisten pisteiden ero pidetään alle
 * puolen laudan, ja valmis rengas siirretään kokonaisluvulla laudan
 * leveyksiä niin, että sen keskipiste osuu välille [0, leveys).
 * Renkaat, jotka silti ulottuvat välin ulkopuolelle, monistaa piirtäjä
 * (js/maatummennus.js) — se on sen tieto, ei aineiston.
 *
 * === YKSINKERTAISTUS JA KOKO ======================================
 *
 * Douglas–Peucker toleranssilla TOLERANSSI lautayksikköä (1 yksikkö on
 * noin 3,3 km päiväntasaajalla). Monipolygonit säilyvät — saaristomaa
 * ilman saariaan olisi väärä muoto — mutta alle MIN_KOKO yksikön
 * sirpaleet putoavat: ne ovat laudalla alle piirtoviivan paksuisia.
 *
 * Luvut talletetaan KOKONAISLUKUINA kymmenesosayksiköissä ja
 * DELTAKOODATTUINA (ensimmäinen piste absoluuttisena, loput erotuksina).
 * Erotukset ovat pieniä lukuja, joten JSON pysyy murto-osassa siitä,
 * mitä absoluuttiset desimaaliluvut veisivät — ja purku on yksi
 * silmukka (js/maatummennus.js `puraMaa`).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { laudanProjektio } from './fokuskartta/piirto.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

const LAHDE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector'
  + '/master/geojson/ne_50m_admin_0_countries.geojson';
const PAIKALLINEN = new URL('../ne50.geojson', import.meta.url);
const KOHDE = new URL('../assets/data/maapolygonit.json', import.meta.url);

const LEVEYS = MAAILMANKARTTA.map.width;
const KORKEUS = MAAILMANKARTTA.map.height;
const PROJEKTIO = { tyyppi: 'miller', leveys: LEVEYS, lon0: -175, pohjoinen: 76 };

/** Douglas–Peuckerin toleranssi lautayksikköinä (~3,3 km/yksikkö). */
const TOLERANSSI = 1;
/** Tätä pienemmät saaret pudotetaan (rajauslaatikon suurempi sivu). */
const MIN_KOKO = 3;
/** Talletustarkkuus: kymmenesosa lautayksikköä eli noin 330 metriä. */
const TARKKUUS = 10;

/*
 * Pelin maatunnus, jota Natural Earth ei tunne samalla nimellä.
 * Etelä-Sudan on pelissä SDS (sama tunnus kuin lehdissä ja lipuissa),
 * Natural Earthissa ISO-standardin SSD.
 */
const NIMIVASTAAVUUS = { SDS: 'SSD' };

/* ------------------------------------------------------- projektion todennus */

/*
 * Pelin omat, käsin lasketut lautakoordinaatit (js/fokusnosto.js
 * NOSTO_MAAT.GRC): asteet ovat en-Wikipediasta, lautaluvut pelistä.
 */
const TODENNUS = [
  { nimi: 'Ateena (Iliou Melathron)', lon: 23.7342, lat: 37.9814, x: 6624.5, y: 1881.6 },
  { nimi: 'Delfoi', lon: 22.5009, lat: 38.4824, x: 6583.4, y: 1862.2 },
];

function todennaProjektio(p) {
  let pahin = 0;
  for (const t of TODENNUS) {
    const dx = Math.abs(p.lautaX(t.lon) - t.x);
    const dy = Math.abs(p.lautaY(t.lat) - t.y);
    pahin = Math.max(pahin, dx, dy);
    console.log(`  ${t.nimi.padEnd(26)} ${p.lautaX(t.lon).toFixed(2)} / `
      + `${p.lautaY(t.lat).toFixed(2)}  (peli ${t.x} / ${t.y})  ero ${Math.max(dx, dy).toFixed(3)}`);
  }
  if (pahin > 0.05) {
    console.error(`\nPROJEKTIO EI TÄSMÄÄ: suurin ero ${pahin.toFixed(3)} lautayksikköä.`);
    process.exit(1);
  }
  console.log(`  suurin ero ${pahin.toFixed(3)} lautayksikköä — projektio täsmää.\n`);
}

/* ---------------------------------------------------------------- aineisto */

async function lueLahde() {
  if (existsSync(PAIKALLINEN)) {
    console.log(`Lähde: ${PAIKALLINEN.pathname} (repon oma kopio)`);
    return JSON.parse(readFileSync(PAIKALLINEN, 'utf8'));
  }
  console.log(`Lähde: ${LAHDE}`);
  const vastaus = await fetch(LAHDE);
  if (!vastaus.ok) throw new Error(`Natural Earth ${vastaus.status}`);
  const data = await vastaus.json();
  writeFileSync(PAIKALLINEN, JSON.stringify(data));
  return data;
}

/** ISO3 → GeoJSON-piirre. Ensisijaisesti ISO_A3, sitten hallinnolliset. */
function hakemisto(geojson) {
  const kartta = new Map();
  const avaimet = ['ISO_A3', 'ISO_A3_EH', 'ADM0_A3', 'SOV_A3', 'GU_A3', 'SU_A3'];
  for (const avain of avaimet) {
    for (const f of geojson.features) {
      const v = f.properties[avain];
      if (v && v !== '-99' && !kartta.has(v)) kartta.set(v, f);
    }
  }
  return kartta;
}

/* -------------------------------------------------------------- geometria */

/** GeoJSONin ulkokehät (reiät jätetään: tummennus ei tarvitse järviä). */
function ulkokehat(geometry) {
  if (geometry.type === 'Polygon') return [geometry.coordinates[0]];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.map((p) => p[0]);
  return [];
}

/**
 * Asteet laudalle ja päivämääränrajan hyppy pois.
 *
 * Sauma on LON0:ssa (175 W), ei 180. asteella, joten Natural Earthin
 * ±180-katkaisu ei riitä. Hyppy tunnistetaan puolen laudan erosta ja
 * korjataan lisäämällä tai vähentämällä laudan leveys; lopuksi koko
 * rengas siirretään niin, että sen keskipiste on laudalla.
 */
function puraRengas(rengas, p) {
  const ulos = [];
  let edellinenX = null;
  for (const [lon, lat] of rengas) {
    let x = p.lautaX(lon);
    if (edellinenX !== null) {
      while (x - edellinenX > LEVEYS / 2) x -= LEVEYS;
      while (edellinenX - x > LEVEYS / 2) x += LEVEYS;
    }
    edellinenX = x;
    ulos.push([x, p.lautaY(lat)]);
  }
  const keski = ulos.reduce((a, q) => a + q[0], 0) / ulos.length;
  const siirto = -Math.floor(keski / LEVEYS) * LEVEYS;
  if (siirto) for (const q of ulos) q[0] += siirto;
  return ulos;
}

/** Pisteen etäisyys janasta a–b. */
function etaisyys(pi, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const pituus2 = dx * dx + dy * dy;
  if (!pituus2) return Math.hypot(pi[0] - a[0], pi[1] - a[1]);
  let t = ((pi[0] - a[0]) * dx + (pi[1] - a[1]) * dy) / pituus2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(pi[0] - (a[0] + t * dx), pi[1] - (a[1] + t * dy));
}

/** Douglas–Peucker, silmukkana ettei syvä rannikko kaada pinoa. */
function yksinkertaista(pisteet, toleranssi) {
  if (pisteet.length < 3) return pisteet.slice();
  const pidetaan = new Uint8Array(pisteet.length);
  pidetaan[0] = 1;
  pidetaan[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [alku, loppu] = pino.pop();
    let pahin = 0;
    let indeksi = -1;
    for (let i = alku + 1; i < loppu; i++) {
      const d = etaisyys(pisteet[i], pisteet[alku], pisteet[loppu]);
      if (d > pahin) { pahin = d; indeksi = i; }
    }
    if (indeksi > 0 && pahin > toleranssi) {
      pidetaan[indeksi] = 1;
      pino.push([alku, indeksi], [indeksi, loppu]);
    }
  }
  return pisteet.filter((_, i) => pidetaan[i]);
}

/** Rajauslaatikon suurempi sivu lautayksikköinä. */
function koko(rengas) {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [x, y] of rengas) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return Math.max(x1 - x0, y1 - y0);
}

/**
 * Renkaan pinta-ala etumerkillä (kenkänauhakaava).
 * Positiivinen = laudan koordinaateissa myötäpäivään.
 */
function pinta(rengas) {
  let a = 0;
  for (let i = 0; i < rengas.length; i++) {
    const p = rengas[i];
    const q = rengas[(i + 1) % rengas.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/**
 * KAIKKI RENKAAT SAMAAN KIERTOSUUNTAAN — aineiston takuu, ei kosmetiikkaa.
 *
 * Tummennus täyttää kaikkien MUIDEN maiden renkaat yhtenä polkuna
 * `fill-rule: nonzero` -säännöllä (js/maatummennus.js `muidenPolku`),
 * ja se on oikein vain jos renkaat kiertävät samaan suuntaan.
 * Vastakkain kiertävä naapuri KUMOAISI toisen juuri siinä kaistaleessa,
 * jossa erikseen yksinkertaistetut rajat menevät päällekkäin: jokainen
 * maaraja saisi vaalean raon. Natural Earthin ulkokehät ovat jo
 * yhtenäisiä (kaikki 1233 rengasta samansuuntaisia), mutta ehtoa ei
 * jätetä lähteen varaan — se maksaa yhden silmukan ja sitä vartioi
 * tests/maapolygonit.test.mjs.
 */
function suunnista(rengas) {
  return pinta(rengas) < 0 ? rengas.slice().reverse() : rengas;
}

/**
 * Rengas talletusmuotoon: kymmenesosayksiköitä, deltakoodattuna.
 * [x0, y0, dx1, dy1, dx2, dy2, …] — purku js/maatummennus.js puraMaa.
 */
function koodaa(rengas) {
  const ulos = [];
  let ex = 0;
  let ey = 0;
  for (const [x, y] of rengas) {
    const kx = Math.round(x * TARKKUUS);
    const ky = Math.round(y * TARKKUUS);
    ulos.push(ulos.length ? kx - ex : kx, ulos.length ? ky - ey : ky);
    ex = kx;
    ey = ky;
  }
  return ulos;
}

/* -------------------------------------------------------------------- ajo */

const vainTarkistus = process.argv.includes('--tarkista');

const projektio = laudanProjektio(PROJEKTIO);
console.log('PROJEKTION TODENNUS (js/fokusnosto.js NOSTO_MAAT.GRC):');
todennaProjektio(projektio);
if (vainTarkistus) process.exit(0);

const geojson = await lueLahde();
const haku = hakemisto(geojson);
const pelimaat = Object.keys(MAAILMANKARTTA.map.countryShapes);

const maat = {};
let renkaita = 0;
let pisteita = 0;
let pudonneet = 0;
const puuttuvat = [];

for (const iso of pelimaat) {
  const piirre = haku.get(NIMIVASTAAVUUS[iso] ?? iso) ?? haku.get(iso);
  if (!piirre) { puuttuvat.push(iso); continue; }
  const renkaat = [];
  for (const kehä of ulkokehat(piirre.geometry)) {
    const laudalla = puraRengas(kehä, projektio);
    if (koko(laudalla) < MIN_KOKO) { pudonneet++; continue; }
    const kevyt = yksinkertaista(laudalla, TOLERANSSI);
    // Kolmiota pienempi jäännös ei ole muoto vaan viiva.
    if (kevyt.length < 4) { pudonneet++; continue; }
    renkaat.push(koodaa(suunnista(kevyt)));
    renkaita++;
    pisteita += kevyt.length;
  }
  if (renkaat.length) maat[iso] = renkaat;
}

const ulos = {
  /*
   * Nämä kentät ovat lukijalle JA piirtäjälle: js/maatummennus.js
   * tarkistaa tarkkuuden ja laudan mitat aineistosta eikä oleta niitä.
   */
  lahde: 'Natural Earth 50m admin-0 countries (public domain)',
  komento: 'node tools/generoi-maapolygonit.mjs',
  projektio: PROJEKTIO,
  tarkkuus: TARKKUUS,
  lauta: { leveys: LEVEYS, korkeus: KORKEUS },
  maat,
};

writeFileSync(KOHDE, JSON.stringify(ulos));
const kt = Math.round(readFileSync(KOHDE).length / 1024);
console.log(`Maita ${Object.keys(maat).length} / ${pelimaat.length}`
  + `, renkaita ${renkaita}, pisteitä ${pisteita}, pudotettuja sirpaleita ${pudonneet}`);
if (puuttuvat.length) console.log(`EI LÖYTYNYT: ${puuttuvat.join(' ')}`);
console.log(`Kirjoitettu ${KOHDE.pathname} — ${kt} kt`);
