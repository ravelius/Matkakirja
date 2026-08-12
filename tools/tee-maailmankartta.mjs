/*
 * Kokoaa maailmankartan js/packs/maailmankartta.js.
 *
 *   NE_LAND=ne_10m_land.geojson node tools/tee-maailmankartta.mjs
 *
 * Koko ketju on
 *
 *   1. NE_LAND=... node tools/tee-maailmankartta.mjs
 *   2. node tools/satamat-rannalle.mjs maailmankartta
 *   3. node tools/korjaa-merireitit.mjs maailmankartta
 *
 * Vaiheet 2-3 kirjoittavat tuotokseen koostajan jälkeen, joten pelkkä
 * vaihe 1 pyyhkii ne. Sama ansa laukesi jo vanhalla maailmalla, jonka
 * otsikko kehotti ajamaan koostajan uudelleen — ja uudelleenajo hävitti
 * neljä saarta ja siirsi kaksi satamaa pois rannalta.
 *
 * --- miten tämä eroaa vanhasta maailmasta ---
 *
 * Vanha maailma on pala palloa: sillä on läntisin ja itäisin reuna, ja
 * laudan leveys on se, mihin ne sattuvat osumaan. Maailmankartalla ei
 * ole reunoja lainkaan. Kartta kiertää ympäri, ja siksi
 *
 *   1. leveys tarkoittaa aina tarkalleen 360 astetta (sovitaMaailma).
 *      Jos se olisi sisällön mukainen, sauma ei kohtaisi itseään.
 *   2. rannikot ja reitit saavat mennä laudan reunan yli. Se on
 *      tarkoitus: piirtäjä toistaa kartan molemmin puolin, jolloin
 *      ylivuoto osuu naapurikopioon. Vain KAUPUNGIT pidetään tiukasti
 *      välillä [0, leveys) — niiden paikkaa käytetään osumatestaukseen.
 *
 * --- valtameriylitykset ---
 *
 * Kolme reittiverkkoa (vanha maailma 143, Amerikat 73, Oseania 32)
 * eivät ole koskaan olleet yhteydessä toisiinsa: yhteys on ollut
 * lautahyppy, jota yhdellä kartalla ei ole. Ilman ylityksiä Amerikat
 * olisivat saari, jonne ei pääse mistään.
 *
 * Ylitykset ovat historiallisia eivätkä keksittyjä, ja yksi niistä on
 * Vernen omalta reitiltä: Yokohama-San Francisco vuonna 1873.
 *
 * SISÄLTÖÄ EI KOPIOIDA. Kysymykset, tiedot, pulmat ja kaksintaistelut
 * tuodaan seitsemästä lähdepaketista, jotta korjaus vanhaan kysymykseen
 * näkyy myös täällä eikä sisältö pääse eriytymään.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  miller, sovitaMaailma, rannikot, kaupungit, reitit, lahdepaketit, KOKO_MAAILMA,
} from './vanha-maailma.mjs';
import { sijoita } from './nimien-paikat.mjs';
import { isOnLand } from '../js/mapart.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const luku = (n) => Number(n.toFixed(1));

/*
 * Laudan leveys yksikköinä täydelle kierrokselle.
 *
 * 12000 antaa 33.3 yksikköä asteelle. Vanhalla maailmalla on 7200
 * yksikköä noin 215 asteelle eli 33.5 — käytännössä sama tiheys, joten
 * kaupungit ovat yhtä kaukana toisistaan kuin siellä ja sama
 * minCityDistance kelpaa sellaisenaan.
 */
const LEVEYS = 12000;

/*
 * Missä kartta katkeaa.
 *
 * Kiertävällä kartalla saumaa ei näe, joten valinta on vain
 * lähtönäkymän asia — paitsi yhdessä kohdassa: sauman yli kulkeva
 * merireitti pitää antaa käsin, koska reitinhaun ruudukko ei kierrä
 * ympäri. Siksi sauma pannaan sinne, missä kaupunkeja on vähiten:
 * Tyynenmeren tyhjimpään kohtaan Uuden-Seelannin ja Alaskan väliin.
 *
 * Sivutuote on tuttu maailmankartan asettelu: Amerikat vasemmalla,
 * Atlantti keskellä, Aasia oikealla.
 */
const LON0 = -175;

/* Pohjoisin ja eteläisin piirretty leveysaste. Miller venyttää navat
 * äärettömiin, eikä 80. leveysasteella ole yhtään kaupunkia. */
const POHJOINEN = 76;
const ETELA = -58;

/*
 * Valtameriylitykset. Jokainen on todellinen 1800-luvun yhteys.
 *
 * `kaari` kertoo, kuinka reitti kaartaa: merireitin välipisteet
 * lasketaan isoympyrää pitkin, koska suora viiva Millerin kartalla
 * kulkisi aivan eri paikassa kuin laiva. Pohjois-Atlantin ylitys
 * kaartaa Grönlannin puolelle juuri niin kuin oikeakin.
 */
const YLITYKSET = [
  { a: 'islanti', b: 'nuuk', steps: 4, miksi: 'pohjoinen saariketju' },
  { a: 'dublin', b: 'stjohns', steps: 5, miksi: 'lyhin Atlantin ylitys, lennätinkaapeli 1866' },
  { a: 'lissabon', b: 'newyork', steps: 6, miksi: 'valtamerilinjojen pääreitti' },
  { a: 'dakar', b: 'joaopessoa', steps: 5, miksi: 'Atlantin kapein kohta' },
  { a: 'tokio', b: 'sanfrancisco', steps: 7, miksi: 'Vernen reitti 1873' },
  { a: 'bali', b: 'darwin', steps: 3, miksi: 'Aasia kiinni Australiaan' },
  { a: 'suva', b: 'panama', steps: 7, miksi: 'Panama–Sydney-postilinja 1866' },
];

const geo = JSON.parse(readFileSync(process.env.NE_LAND ?? 'ne_10m_land.geojson', 'utf8'));
const PACKS = await lahdepaketit(KOKO_MAAILMA);
const { kaupungit: kaup, paallekkaiset } = await kaupungit(KOKO_MAAILMA);
const tiet = await reitit(KOKO_MAAILMA);

const sovitus = sovitaMaailma({ leveys: LEVEYS, lon0: LON0, etela: ETELA, pohjoinen: POHJOINEN });
const { muunna, muunnaViiva, korkeus } = sovitus;

// --- rannikot -----------------------------------------------------------------
//
// Koko maapallo: aluerajaus ottaa kaiken. Kaupungilliset saaret
// säilyvät vaikka olisivat kuinka pieniä — muuten kaupunki jäisi
// seisomaan tyhjän meren päälle.
const viivat = rannikot(geo, {
  lon0: -180, lon1: 180, lat0: ETELA - 4, lat1: POHJOINEN + 4,
}, { pakolliset: kaup.map((c) => [c.lon, c.lat]) })
  // rannikot() palauttaa Milleriin projisoidut pisteet; maailmankartalla
  // tarvitaan lon/lat, jotta sauman ylitys osataan pitää yhtenäisenä.
  .map((v) => muunnaViiva(v.map(([x, y]) => miller.taakse(x, y))));

const ALKUKARTTA = { outlines: viivat };

// --- kaupungit ----------------------------------------------------------------

const lahdeKaupunki = new Map();
for (const id of KOKO_MAAILMA) {
  for (const c of PACKS.find((p) => p.id === id).cities) {
    if (!lahdeKaupunki.has(c.id)) lahdeKaupunki.set(c.id, c);
  }
}

/* Rannikkokaupunki osuu helposti veden puolelle: satama ON rannalla, ja
 * tarkka rannikkoviiva kulkee sen läpi. Peli vaatii kaupungin olevan
 * maalla, joten siirretään lähimpään maakohtaan. */
function maalle([x, y]) {
  if (isOnLand([x, y], ALKUKARTTA)) return [x, y];
  for (let sade = 4; sade <= 40; sade += 4) {
    for (let a = 0; a < 24; a++) {
      const kulma = (a / 24) * Math.PI * 2;
      const nx = x + Math.cos(kulma) * sade;
      const ny = y + Math.sin(kulma) * sade;
      if (isOnLand([nx, ny], ALKUKARTTA)) return [nx, ny];
    }
  }
  return [x, y];
}

let siirretty = 0;
const kaikkiPisteet = kaup.map((c) => {
  const alkuperainen = muunna([c.lon, c.lat]);
  const [x, y] = maalle(alkuperainen);
  if (x !== alkuperainen[0] || y !== alkuperainen[1]) siirretty += 1;
  // Kaupunki pidetään laudalla: sen paikkaa käytetään osumatestaukseen.
  return { ...c, x: luku(((x % LEVEYS) + LEVEYS) % LEVEYS), y: luku(y) };
});

/* Liian lähekkäiset pudotetaan, ei siirretä: siirtäminen veisi
 * kaupungin väärään paikkaan, ja se on opetuspelissä pahempi virhe kuin
 * yksi kaupunki vähemmän. Etäisyys mitataan kiertäen. */
const MIN_ETAISYYS = 60;
const vaakaEro = (a, b) => {
  const d = Math.abs(a - b);
  return Math.min(d, LEVEYS - d);
};
const pisteet = [];
const pudotetut = [];
for (const c of kaikkiPisteet) {
  const liianLahella = pisteet.find(
    (o) => Math.hypot(vaakaEro(o.x, c.x), o.y - c.y) < MIN_ETAISYYS,
  );
  if (liianLahella) { pudotetut.push([c.nimi, liianLahella.nimi]); continue; }
  pisteet.push(c);
}

const paikkaKartta = new Map(pisteet.map((c) => [c.id, c]));

// --- reitit --------------------------------------------------------------------
//
// Ylitykset lisätään vasta tässä, jotta ne näkyvät myös nimien
// törmäyshaussa: nimi ei saa asettua reittiviivan päälle.

/* Isoympyrän välipisteet kahden paikan välille. Suora viiva Millerin
 * kartalla kulkisi aivan muualla kuin laiva. */
function isoympyra(a, b, paloja) {
  const RAD = Math.PI / 180;
  const [la1, fi1] = [a.lat * RAD, a.lon * RAD];
  const [la2, fi2] = [b.lat * RAD, b.lon * RAD];
  const d = 2 * Math.asin(Math.sqrt(
    Math.sin((la2 - la1) / 2) ** 2
    + Math.cos(la1) * Math.cos(la2) * Math.sin((fi2 - fi1) / 2) ** 2,
  ));
  const ulos = [];
  for (let i = 1; i < paloja; i++) {
    const f = i / paloja;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(la1) * Math.cos(fi1) + B * Math.cos(la2) * Math.cos(fi2);
    const y = A * Math.cos(la1) * Math.sin(fi1) + B * Math.cos(la2) * Math.sin(fi2);
    const z = A * Math.sin(la1) + B * Math.sin(la2);
    ulos.push([
      Math.atan2(y, x) / RAD,
      Math.atan2(z, Math.hypot(x, y)) / RAD,
    ]);
  }
  return ulos;
}

const lonlat = new Map(kaup.map((c) => [c.id, c]));
const ylitykset = [];
const puuttuvat = [];
for (const y of YLITYKSET) {
  const a = lonlat.get(y.a);
  const b = lonlat.get(y.b);
  if (!a || !b || !paikkaKartta.has(y.a) || !paikkaKartta.has(y.b)) {
    puuttuvat.push(`${y.a}-${y.b}`);
    continue;
  }
  ylitykset.push({
    a: y.a, b: y.b, tyyppi: 'sea', askeleet: y.steps,
    // Välipisteet isoympyrää pitkin; muunnaViiva pitää sauman ylityksen
    // yhtenäisenä, jolloin viiva jatkuu laudan reunan yli.
    via: isoympyra(a, b, 8),
    ylitys: true,
  });
}
const kaikkiTiet = [...tiet, ...ylitykset];

// Nimien paikat samalla hakualgoritmilla kuin vanhalla maailmalla.
const janat = [];
for (const t of kaikkiTiet) {
  const a = paikkaKartta.get(t.a);
  const b = paikkaKartta.get(t.b);
  if (!a || !b) continue;
  const kohdat = [a, ...(t.via ?? []).map((p) => {
    const [x, y] = muunna(p);
    return { x, y };
  }), b];
  for (let i = 1; i < kohdat.length; i++) janat.push([kohdat[i - 1], kohdat[i]]);
}

const { avaaSelain } = await import('./mittaa-selaimessa.mjs');
const { sivu, sulje } = await avaaSelain();
const mitat = await sivu.evaluate((nimet) => {
  const kangas = document.createElement('canvas').getContext('2d');
  const ulos = {};
  for (const [id, nimi] of Object.entries(nimet)) {
    kangas.font = '600 18px "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';
    ulos[id] = kangas.measureText(nimi).width + 0.04 * 18 * nimi.length;
  }
  return ulos;
}, Object.fromEntries(pisteet.map((c) => [c.id, c.nimi])));
await sulje();
const { paikat: nimiPaikat, pulmat } = sijoita(pisteet, new Map(Object.entries(mitat)), janat);

/*
 * Paluuportit maailmankartan valintaruudulle.
 *
 * Tämä lauta ON koko maapallo, joten mihinkään ei tarvitse hypätä
 * jatkaakseen matkaa. Paluuportit tarvitaan silti kahdesta syystä:
 * pelaajan pitää päästä takaisin valitsemaan toinen lauta, ja linkin
 * on oltava vastavuoroinen — vanhalta maailmalta tullaan näihin
 * samoihin kaupunkeihin, joten niistä on päästävä myös takaisin.
 */
const PALUUPORTIT = new Set([
  'lontoo', 'kairo', 'mumbai', 'peking', 'tokio', 'singapore',
  'moskova', 'ateena', 'kapkaupunki', 'tanger',
  // New York, Los Angeles, Rio ja Sydney veivät ennen suoraan vanhalle
  // mannerlaudalle eivätkä tänne, joten paluuporttia ei tarvittu. Nyt
  // kaikki neljätoista valintaruudun porttia tulevat tälle laudalle, ja
  // linkin on oltava vastavuoroinen.
  'newyork', 'losangeles', 'rio', 'sydney',
]);
const cities = pisteet.map((c) => {
  const lahde = lahdeKaupunki.get(c.id) ?? {};
  const p = nimiPaikat.get(c.id);
  return {
    id: c.id,
    name: c.nimi,
    ...(lahde.wiki ? { wiki: lahde.wiki } : {}),
    ...(lahde.ambience ? { ambience: lahde.ambience } : {}),
    x: c.x,
    y: c.y,
    ...(lahde.start ? { start: true } : {}),
    /*
     * Paluu valintaruudulle. Linkin on oltava vastavuoroinen: kaikki
     * kymmenen valintaruudun porttikaupunkia osoittavat tänne, joten
     * jokaisesta on myös päästävä takaisin.
     */
    ...(PALUUPORTIT.has(c.id)
      ? { links: [{ pack: 'maailma', city: c.id, label: 'Valitse toinen lauta' }] } : {}),
    ...(lahde.airport || lahde.start ? { airport: true } : {}),
    la: p.la,
    lx: p.lx,
    ly: p.ly,
  };
});

/*
 * Merireitit: välipisteet projisoidaan, mutta niitä EI lasketa
 * uudelleen veden kautta tässä.
 *
 * Syy on sauma. Reitinhaun vesiruudukko on suorakaide, joka ei kierrä
 * ympäri, joten sauman yli kulkeva reitti ei löytäisi polkua lainkaan.
 * Reitit korjataan erillisellä työkalulla ketjun vaiheessa 3, ja
 * ylitysten välipisteet on jo laskettu isoympyrää pitkin.
 */
const edges = kaikkiTiet.map((t) => {
  const perus = {
    a: t.a,
    b: t.b,
    ...(t.tyyppi && t.tyyppi !== 'land' ? { type: t.tyyppi } : {}),
    steps: t.askeleet ?? 3,
  };
  if (!t.via?.length) return perus;
  // muunnaViiva pitää sauman ylittävän reitin yhtenäisenä. Alku- ja
  // loppupiste otetaan mukaan laskuun ja pudotetaan pois, jotta
  // välipisteet ovat samalla puolella saumaa kuin kaupungit.
  const a = lonlat.get(t.a);
  const b = lonlat.get(t.b);
  const koko = muunnaViiva([[a.lon, a.lat], ...t.via, [b.lon, b.lat]]);
  return { ...perus, via: koko.slice(1, -1).map(([x, y]) => [Math.round(x), Math.round(y)]) };
}).filter((e) => paikkaKartta.has(e.a) && paikkaKartta.has(e.b));

// Saari on kaupunki, johon pääsee vain laivalla. Sen näkee reiteistä.
const islands = pisteet
  .filter((c) => {
    const omat = edges.filter((e) => e.a === c.id || e.b === c.id);
    return omat.length > 0 && omat.every((e) => e.type === 'sea');
  })
  .map((c) => c.id);

/* Laattamäärä suhteutettuna kaupunkien määrään; tähtiä yksi. */
const laattaKaupunkeja = cities.filter((c) => !c.start).length;
const OSUUDET = { horseshoe: 0.05, robber: 0.08, ruby: 0.13, emerald: 0.16, topaz: 0.21 };
const counts = { star: 1 };
let jaljella = laattaKaupunkeja - 1;
for (const [laji, osuus] of Object.entries(OSUUDET)) {
  counts[laji] = Math.round(laattaKaupunkeja * osuus);
  jaljella -= counts[laji];
}
counts.empty = jaljella;

/*
 * Maatunnukset lähteistä. Vanha maailma on mukana siksi, että sen
 * tunnukset on jo kertaalleen ratkaistu Wikidatasta — sitä työtä ei
 * kannata teettää uudelleen.
 */
const cityCountry = {};
{
  const { VANHA_MAAILMA } = await import('../js/packs/vanhamaailma.js');
  const lahteet = [...PACKS.map((p) => p.map?.cityCountry ?? {}), VANHA_MAAILMA.map?.cityCountry ?? {}];
  for (const c of pisteet) {
    for (const taulu of lahteet) {
      if (taulu[c.id]) { cityCountry[c.id] = taulu[c.id]; break; }
    }
  }
}

// --- tiedosto ------------------------------------------------------------------

const pisteLista = (pts, sisennys = '    ') => {
  const rivit = [];
  for (let i = 0; i < pts.length; i += 6) {
    rivit.push(sisennys + pts.slice(i, i + 6)
      .map(([x, y]) => `[${luku(x)}, ${luku(y)}]`).join(', ') + ',');
  }
  return rivit.join('\n');
};

const TUONNIT = KOKO_MAAILMA.map((id) => {
  const nimet = {
    europe: 'EUROPE', africa: 'AFRICA', middleeast: 'MIDDLE_EAST', asia: 'ASIA',
    northamerica: 'NORTHAMERICA', southamerica: 'SOUTHAMERICA', oceania: 'OCEANIA',
  };
  return { vienti: nimet[id], tiedosto: `./${id}.js` };
});

const teksti = `// Maailmankartta: koko maapallo yhtenä kiertävänä karttana.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin.
//
// MUTTA ÄLÄ MYÖSKÄÄN aja pelkkää koostajaa: se pyyhkii kaksi jälkivaihetta.
// Koko ketju on
//
//   1. NE_LAND=... node tools/tee-maailmankartta.mjs
//   2. node tools/satamat-rannalle.mjs maailmankartta
//   3. node tools/korjaa-merireitit.mjs maailmankartta
//
// Koordinaatisto on ${LEVEYS} x ${korkeus} yksikköä Millerin
// lieriöprojektiossa, ja leveys tarkoittaa tarkalleen 360 astetta.
// Se on kiertämisen ehto: jos leveys olisi sisällön mukainen, kartan
// sauma ei kohtaisi itseään.
//
// Nollakohta on ${LON0}° eli Tyynenmeren tyhjin kohta. Kiertävällä
// kartalla saumaa ei näe, joten valinta on lähtönäkymän asia — ja
// sivutuotteena tuttu asettelu: Amerikat vasemmalla, Aasia oikealla.
//
// Rannikot ja reitit SAAVAT mennä laudan reunan yli; piirtäjä toistaa
// kartan molemmin puolin, jolloin ylivuoto osuu naapurikopioon. Vain
// kaupungit pidetään tiukasti välillä [0, ${LEVEYS}).
//
// SISÄLTÖÄ EI KOPIOIDA. Kysymykset, tiedot, pulmat ja kaksintaistelut
// tuodaan seitsemästä lähdepaketista, jotta korjaus vanhaan kysymykseen
// näkyy myös täällä eikä sisältö pääse eriytymään.

${TUONNIT.map((t) => `import { ${t.vienti} } from '${t.tiedosto}';`).join('\n')}
import { themedTokenTypes } from '../tokens.js';
import { MAAILMANKARTAN_MAASTO } from './maailmankartta-maasto.js';

const LAHDEPAKAT = [${TUONNIT.map((t) => t.vienti).join(', ')}];

/*
 * Yhdistää lähdepakettien kysymyskorit lajeittain.
 *
 * Kaksoiskappaleet karsitaan kysymystekstin perusteella KAIKKIEN lajien
 * yli, ei lajin sisällä: saumakaupunkien (Istanbul, Kairo, Teheran,
 * Panama) kysymyksiä on kahdella laudalla, ja sama kysymys voi olla
 * yhden laudan yleiskorissa ja toisen kaupunkikorissa.
 *
 * Kaupunkikori voittaa yleiskorin: kysymys on arvokkaampi siellä, missä
 * se liittyy paikkaan jossa ollaan.
 */
function yhdistaKysymykset() {
  const ulos = {};
  const nahdyt = new Set();
  const lisaa = (laji, lista) => {
    const kori = (ulos[laji] ??= []);
    for (const kysymys of lista) {
      const avain = kysymys.q ?? kysymys.text ?? JSON.stringify(kysymys);
      if (nahdyt.has(avain)) continue;
      nahdyt.add(avain);
      kori.push(kysymys);
    }
  };
  for (const pack of LAHDEPAKAT) {
    for (const [laji, lista] of Object.entries(pack.questions ?? {})) {
      if (laji === 'general') continue;
      lisaa(laji, lista);
    }
  }
  for (const pack of LAHDEPAKAT) lisaa('general', pack.questions?.general ?? []);
  return ulos;
}

/** Poistaa kaksoiskappaleet kysymystekstin perusteella. */
function yksilolliset(lista) {
  const nahdyt = new Set();
  return lista.filter((x) => {
    const avain = x.q ?? x.text ?? JSON.stringify(x);
    if (nahdyt.has(avain)) return false;
    nahdyt.add(avain);
    return true;
  });
}

/** Yhdistää paikkakohtaiset tiedot; kaupunkitunnus on avain. */
function yhdistaTiedot(kentta) {
  return Object.assign({}, ...LAHDEPAKAT.map((p) => p[kentta] ?? {}));
}

const OUTLINES = [
${viivat.map((v) => `  [\n${pisteLista(v)}\n  ],`).join('\n')}
];

const CITIES = [
${cities.map((c) => `  ${JSON.stringify(c)},`).join('\n')}
];

/*
 * Kaupungin maatunnus. Ratkaisee, näkyykö Tutki-ikkunan oikea palsta:
 * maan nimi, lippu, tunnusluvut, tervehdykset ja radio.
 *
 * Siemenenä lähdelautojen ja vanhan maailman jo ratkaistut tunnukset;
 * loput haetaan Wikidatasta työkalulla tools/hae-maatunnukset.mjs.
 */
const CITY_COUNTRY = ${JSON.stringify(cityCountry)};

const EDGES = [
${edges.map((e) => `  ${JSON.stringify(e)},`).join('\n')}
];

export const MAAILMANKARTTA = {
  id: 'maailmankartta',
  name: 'Maailmankartta',
  boardLabel: 'Maailma',
  tagline: 'Yksi matka maapallon ympäri — itään niin kauan että tulee takaisin.',
  ariaLabel: 'Koko maailman aarrekartta',

  /*
   * kiertava: kartta jatkuu reunan yli. Piirtäjä toistaa sen molemmin
   * puolin ja vieritys kiertää ympäri; loitonnus rajataan niin, ettei
   * sama paikka voi näkyä kahdessa kohdassa yhtä aikaa.
   */
  kiertava: true,

  map: {
    width: ${LEVEYS}, height: ${korkeus}, outlines: OUTLINES, kiertava: true,
    cityCountry: CITY_COUNTRY,
    maasto: MAAILMANKARTAN_MAASTO,
  },
  cities: CITIES,
  edges: EDGES,
  airRoutes: LAHDEPAKAT.flatMap((p) => p.airRoutes ?? []),
  islands: ${JSON.stringify(islands)},
  minCityDistance: 60,

  tokens: {
    types: themedTokenTypes({}),
    // Laattamäärä suhteutettu kaupunkien määrään (${cities.length}).
    counts: ${JSON.stringify(counts)},
  },

  questions: yhdistaKysymykset(),
  placeFacts: yhdistaTiedot('placeFacts'),
  duels: yksilolliset(LAHDEPAKAT.flatMap((p) => p.duels ?? [])),
  puzzles: yksilolliset(LAHDEPAKAT.flatMap((p) => p.puzzles ?? [])),
  texts: EUROPE.texts,

  decor: {
    mapLabel: 'MAAILMA',
    mapLabelPos: { x: 700, y: 300 },
    compass: { x: 700, y: ${Math.round(korkeus * 0.84)}, r: 90 },
    waveSkip: [{ x: 700, y: 300, r: 260 }, { x: 700, y: ${Math.round(korkeus * 0.84)}, r: 150 }],
    landmarks: [],
    dieSpot: { x: 0.06, y: 0.5 },
    dieSpotAlt: { x: 0.94, y: 0.5 },
    terrainBands: [
      { maxY: ${Math.round(korkeus * 0.3)}, kind: 'trees' },
      { maxY: ${Math.round(korkeus * 0.46)}, kind: 'mountains' },
      { maxY: ${Math.round(korkeus * 0.66)}, kind: 'dunes' },
      { maxY: ${korkeus}, kind: 'trees' },
    ],
  },
};
`;

const ulos = join(JUURI, 'js/packs/maailmankartta.js');
writeFileSync(ulos, teksti);

console.log(`lauta ${LEVEYS} x ${korkeus}, nollakohta ${LON0}°`);
console.log(`rannikkoja ${viivat.length}, pisteitä ${viivat.reduce((s, v) => s + v.length, 0)}`);
console.log(`kaupunkeja ${cities.length}, siirretty maalle ${siirretty}`);
console.log(`saumakaupunkeja yhdistetty ${paallekkaiset.length}: `
  + paallekkaiset.map(([id]) => id).join(', '));
console.log(`reittejä ${edges.length}, joista meritse ${edges.filter((e) => e.type === 'sea').length}`);
console.log(`valtameriylityksiä ${ylitykset.length}/${YLITYKSET.length}`
  + (puuttuvat.length ? ` — puuttuu: ${puuttuvat.join(', ')}` : ''));
console.log(`saaria ${islands.length}`);
console.log(`maatunnuksia ${Object.keys(cityCountry).length}/${cities.length}`);
console.log(`laattoja ${Object.values(counts).reduce((a, b) => a + b, 0)} `
  + `/ kaupunkeja ilman aloitusta ${laattaKaupunkeja}`);
if (pudotetut.length) {
  console.log(`liian lähekkäin, pudotettu ${pudotetut.length}: `
    + pudotetut.map(([a, b]) => `${a} (lähellä ${b})`).join(', '));
}
console.log(`nimien törmäyksiä ${pulmat.length}`);
console.log(`kirjoitettu ${ulos} (${Math.round(teksti.length / 1024)} kt)`);
