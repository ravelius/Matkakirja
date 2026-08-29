/*
 * YLEISLEHTI: koko pelilaudan kattava 1873-atlaksen lehti kaukozoomiin.
 *
 *   node tools/tee-yleislehti.mjs /polku/kohdekansioon \
 *        [--data <raaka-aineiston kansio>] [--leveys 6400] [--laatu 0.9]
 *        [--ruutu 0.05] [--png] [--esikatselu]
 *
 * Tuottaa kohdekansioon kaksi tiedostoa:
 *
 *   MAAILMA.webp   yksi yhtenäinen kartta koko laudalta: opaakki paperi,
 *                  meren syvyysporrastus, akvarellihypsometria,
 *                  rannikko, isot järvet, harva asteverkko ja muutama
 *                  valtameren nimi
 *   MAAILMA.json   kuvan paikka LAUDAN koordinaateissa
 *
 * Molemmat viedään ämpäriin samaan kansioon kuin maalehdet (`fokus/`),
 * ja peli lataa ne js/fokuskartta.js:n kautta (js/packs/fokus-grc.js
 * YLEISLEHTI). Repoon ei tule kumpaakaan.
 *
 * === MIKSI TÄMÄ LEHTI ON OLEMASSA ===
 *
 * Omistajan havainto 26.8.2026: uloszoomattu maailmankartta näyttää
 * TILKKUTÄKILTÄ. Syy on rakenteellinen eikä korjattavissa maalehtiä
 * säätämällä: jokainen maalehti korostaa omaa maataan ja piirtää
 * naapurit haaleampina, joten vierekkäiset lehdet esittävät saman
 * rajaseudun kahdella eri voimakkuudella. Lähikuvassa se on juuri se,
 * mitä fokusmoodilta halutaan; kaukaa katsottuna se on tilkkutäkki.
 *
 * Vastaus on YKSI lehti, jossa ei ole kohdemaata lainkaan — kaikki maat
 * samalla voimalla, ei kartuutsia, ei kaupunkinimiä. Peli näyttää sen
 * kaukozoomissa ja purkaa maalehdet siksi aikaa pois (js/fokuskartta.js
 * KAUKOZOOMIN RAJA), mikä on samalla iso muistivoitto: yhden lehden
 * sijasta kartalla on kaukaa katsottuna neljä tai viisi.
 *
 * === KUVAN KOKO ===
 *
 * 6400 pikseliä koko laudan leveydelle on 0,056 astetta pikseliä kohti.
 * Se kuulostaa karkealta mutta on tarkalleen se, mitä kaukozoomi
 * tarvitsee: peli vaihtaa yleislehden maalehtiin heti kun näkymä on
 * kapeampi kuin noin 2600 lautayksikköä, ja siinä kohtaa yleislehteä
 * katsotaan noin 1:1 (2600 yksikköä = 1387 kuvapikseliä, ruudulla
 * tuhatkunta pistettä). Sitä isompi kuva olisi muistia ilman yhtään
 * näkyvää pikseliä — ja MUISTI on tässä koko jutun ydin: 6400 x 2880 on
 * purettuna 74 megatavua, jonka pelin oma muistipienennyspolku
 * (js/fokuskartta.js "LEHTI PIENENNETÄÄN JO PURUSSA") kutistaa
 * puhelimessa 3200 x 1440:een eli 18 megatavuun.
 *
 * === TASAUS ===
 *
 * Kuva ei ole kuvitusta vaan karttaa: se liimataan laudalle
 * pikselilleen, ja bbox on koko lauta (0, 0, leveys, korkeus). Projektio
 * on laudan oma Millerin lieriö samasta kaavasta kuin maalehdillä
 * (tools/fokuskartta/piirto.js laudanProjektio), ja tasaus todennetaan
 * joka ajossa laudan omilla kaupungeilla — ks. tarkistaProjektio().
 *
 * Aineisto: tools/fokuskartta/maailma.mjs.
 * Piirtomoottori (ajetaan selaimessa): tools/fokuskartta/maailmapiirto.js.
 */
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { keraaMaailma } from './fokuskartta/maailma.mjs';
import { laudanProjektio } from './fokuskartta/piirto.js';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');

/*
 * LAUTA JA SEN PROJEKTIO.
 *
 * Luvut ovat tools/tee-maailmankartta.mjs:n vakioita (LEVEYS 12000,
 * LON0 −175, POHJOINEN 76) ja kaava sen käyttämä Millerin lieriö. Ne
 * ovat pelin koko koordinaatiston perusta, eikä niitä muuteta: y = 0 on
 * 76. leveyspiiri kaikelle, mitä laudalle on esilaskettu.
 *
 * LEVEYS luetaan laudasta itsestään (12 000), koska kiertävällä laudalla
 * lehden on oltava tasan yhden kierroksen levyinen. KORKEUTTA ei lueta:
 * laudan 5399 yksikköä on vain se pala, jolla pelataan, ja lehti
 * piirretään sitä korkeammalle alalle (ks. KARTTA_ALA).
 */
const LAUTA = {
  id: 'maailmankartta',
  moduuli: './js/packs/maailmankartta.js',
  vienti: 'MAAILMANKARTTA',
  projektio: {
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  },
};

/*
 * TASAUKSEN TARKISTUSPISTEET: laudan kaupunkitunnus ja kaupungin
 * todellinen sijainti asteina (Wikipedia / Natural Earth).
 *
 * ANKKURIT ovat ne, joiden on osuttava ehdottomasti: laudan Euroopan ja
 * Lähi-idän laatat on aseteltu tarkasti, ja niillä mitataan KAAVA. Muut
 * pisteet ovat mukana kertomassa, kuinka paljon laudan omia laattoja on
 * siirretty käsin muualla maailmassa — Kapkaupunki on 42 lautayksikköä
 * eli reilun asteen todellisesta paikastaan, ja se on laudan käsityötä
 * eikä projektiovirhe. Ne eivät siis saa kaataa ajoa, mutta ne
 * kirjataan JSONiin, koska yleislehti on koko maailman kartta ja sen
 * päälle piirtyvät juuri nuo laatat.
 */
const TARKISTUSPISTEET = {
  lontoo: { nimi: 'Lontoo', lon: -0.1276, lat: 51.5072, ankkuri: true },
  rooma: { nimi: 'Rooma', lon: 12.4964, lat: 41.9028, ankkuri: true },
  ateena: { nimi: 'Ateena', lon: 23.7275, lat: 37.9838, ankkuri: true },
  kairo: { nimi: 'Kairo', lon: 31.2357, lat: 30.0444, ankkuri: true },
  /*
   * Istanbul EI ole ankkuri: laatta on laudalla 0,08 astetta (2,8
   * yksikköä) todellisesta paikastaan länteen. Poikkeus on kirjattu jo
   * maalehtien työkaluun (tools/tee-fokuskartta.mjs LAATTAPOIKKEUKSET)
   * ja se on laudan käsityötä eikä projektiota.
   */
  istanbul: { nimi: 'Istanbul', lon: 28.9784, lat: 41.0082 },
  tokio: { nimi: 'Tokio', lon: 139.6917, lat: 35.6895 },
  newyork: { nimi: 'New York', lon: -74.006, lat: 40.7128 },
  sanfrancisco: { nimi: 'San Francisco', lon: -122.4194, lat: 37.7749 },
  buenosaires: { nimi: 'Buenos Aires', lon: -58.3816, lat: -34.6037 },
  lima: { nimi: 'Lima', lon: -77.0428, lat: -12.0464 },
  sydney: { nimi: 'Sydney', lon: 151.2093, lat: -33.8688 },
  kapkaupunki: { nimi: 'Kapkaupunki', lon: 18.4241, lat: -33.9249 },
};
/** Ankkurin suurin sallittu ero lautayksikköinä (sama raja kuin maalehdillä). */
const ANKKURIN_RAJA = 2;
/*
 * ...ja kaikkien pisteiden mediaanille väljempi raja, koska laudan
 * laattoja on siirretty käsin. Väärä KAAVA siirtäisi jokaista pistettä
 * satoja yksiköitä, joten 20 erottaa käsityön projektiovirheestä.
 */
const MEDIAANIN_RAJA = 20;

/*
 * VALTAMERTEN NIMET.
 *
 * Karttatypografiaa eikä paikkatietoa: nimi menee sinne, missä ulappaa
 * riittää. Tyynimeri on kahdesti, koska lauta alkaa pituusasteelta −175
 * ja Tyynimeri jää sen molemmille laidoille — juuri niin kuin
 * aikakauden kartoissa, joissa sama valtameri ladottiin kahdesti.
 *
 * Nimet ovat suomeksi (sama sääntö kuin maalehtien merillä,
 * tools/fokuskartta/maat.mjs). JÄÄMERI JA ETELÄINEN JÄÄMERI TULIVAT
 * MUKAAN VASTA KARTTA-ALAN LAAJENNUKSESSA (ks. KARTTA_ALA): 76.
 * leveyspiirillä päättyneellä lehdellä kummallekaan ei ollut ulappaa,
 * mutta 84 °N…66 °S:n lehdessä on — Siperian pohjoispuolinen selkä ja
 * eteläkärkien alapuolinen vyö ovat molemmat aukkoa vailla rantaa.
 */
const MERET = [
  { nimi: 'TYYNIMERI', lon: -142, lat: 4, koko: 26 },
  { nimi: 'TYYNIMERI', lon: 163, lat: 18, koko: 26 },
  { nimi: 'ATLANTIN VALTAMERI', lon: -38, lat: 26, koko: 22 },
  { nimi: 'ETELÄINEN ATLANTTI', lon: -18, lat: -30, koko: 19 },
  { nimi: 'INTIAN VALTAMERI', lon: 78, lat: -28, koko: 22 },
  { nimi: 'JÄÄMERI', lon: 110, lat: 80.5, koko: 20 },
  { nimi: 'ETELÄINEN JÄÄMERI', lon: 60, lat: -61.5, koko: 18 },
];

/*
 * ATLASKEHYS (omistajan tilaus 29.8.2026: *"ei näy sitä kartan
 * reunapaperia ja lisämerkintöjä?"*).
 *
 * Uloimmalla zoomtasolla kartan pitää maata paperilla kuten oikean
 * atlaksen lehti. Marginaali on VAIN ylhäällä ja alhaalla — lauta on
 * kiertävä, eikä sillä ole vaakasuunnassa reunaa lainkaan (perustelu
 * kokonaisuudessaan tools/fokuskartta/maailmapiirto.js johdannossa).
 *
 * MITAT OVAT KUVAPIKSELEITÄ 6400 PIKSELIN LEHDELLÄ, ja ne on valittu
 * pelin näkymästä eikä silmämääräisesti:
 *
 *   1 kuvapikseli = 12000 / 6400 = 1,875 lautayksikköä
 *   ylämarginaali 232 px = 435 yksikköä, alamarginaali 240 px = 450
 *
 * Uloimmassa zoomissa näkyvä leveys on laudan leveys (js/kartta.js
 * rajaaSkaala), joten 16:9-ruudulla näkyvä korkeus on 6547 yksikköä ja
 * laudan (5399) ylä- ja alapuolelle jää 574 yksikköä. Marginaali mahtuu
 * siis näkyviin juuri siellä missä sen kuuluu — ja koska lähemmäs
 * zoomattaessa näkymä kapenee, se katoaa ruudulta itsestään.
 *
 * Alamarginaali on ylempää korkeampi, kuten painetuissa lehdissä: sinne
 * mahtuvat sekä mittakaavajana että painajanrivi.
 */
/*
 * ============ KARTTA-ALAN LEVEYSPIIRIT (omistaja 29.8.2026 ilta) =====
 *
 * *"alhaalta ja varsinkin ylhäältä leikkautuu liikaa karttaa pois"* —
 * atlaskehyksen reunaviiva viilsi Grönlannin poikki ja jätti
 * Huippuvuoret kokonaan lehden ulkopuolelle.
 *
 * SYY EI OLLUT KEHYKSESSÄ VAAN SIINÄ, ETTÄ LEHTI OLI TASAN LAUDAN
 * KOKOINEN. Lauta on 12 000 x 5399 yksikköä, ja sen korkeus vastaa
 * Millerin lieriössä leveyspiirejä 76 °N…58 °S — juuri Grönlannin
 * (pohjoisin kärki 83,7 °N), Huippuvuorten (80,8 °N) ja Etelämantereen
 * niemimaan (63 °S) yli. Kartta-ala irrotettiin siksi laudan mitasta:
 * lehti piirretään NÄILLE leveyspiireille, ja laudan yläpuoli on kuvassa
 * negatiivista y:tä aivan kuten paperimarginaali jo oli (KEHYS).
 *
 * MIKSI TÄMÄ EI RIKO YHTÄÄN KOORDINAATTIA. Projektion vakiot (LEVEYS
 * 12000, LON0 −175, POHJOINEN 76) pysyvät koskemattomina, joten y = 0 on
 * yhä 76. leveyspiiri ja jokainen laudalle esilaskettu piste — kaupungit,
 * fokuskohteet, eläintäyt, kohtaamispisteet — on täsmälleen entisellä
 * paikallaan. Miller jatkuu luonnollisesti nollan yläpuolelle; vain
 * KUVAN laatikko kasvaa. Vaihtoehto (POHJOINEN-vakion muuttaminen) olisi
 * siirtänyt jokaisen esilasketun luvun sadoilla yksiköillä.
 *
 * RAJAT: 84 °N ottaa mukaan koko Grönlannin ja Huippuvuoret mutta jättää
 * varsinaisen napa-alueen pois (Miller venyttää sitä kohti ääretöntä);
 * 66 °S vie eteläkärkien — Kap Hornin, Etelä-Georgian — ohi
 * Etelämantereen niemimaan tyveen asti.
 */
const KARTTA_ALA = { pohjoinen: 84, etela: -66 };

const KEHYS = {
  yla: 232,
  ala: 240,
  otsikko: 'MATKAKIRJA',
  alaotsikko: 'Unohdettu aarre',
  painaja: 'Painettu Matkakirjan kustantamossa MDCCCLXXIII',
  oikeudet: '© Matkakirja',
};

/*
 * KOMPASSIRUUSU eteläiselle Tyynellemerelle.
 *
 * Paikka on laudan suurin yhtenäinen tyhjä vesi: ei kaupunkeja, ei
 * laattoja, ei valtameren nimeä (lähin on TYYNIMERI 33 astetta
 * pohjoisempana). Ruusu on kartan sisällä eikä marginaalissa, kuten
 * aikakauden atlaksissa.
 */
const KOMPASSI = { lon: -132, lat: -38, sade: 132 };

/* ------------------------------------------------------------ argumentit */

const argv = process.argv.slice(2);
const kohdekansio = argv[0];
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);

if (!kohdekansio || kohdekansio.startsWith('--')) {
  console.error('Käyttö: node tools/tee-yleislehti.mjs <kohdekansio> '
    + '[--data <kansio>] [--leveys 6400] [--laatu 0.9] [--ruutu 0.05] '
    + '[--png] [--esikatselu]');
  process.exit(1);
}

const dataKansio = resolve(valitsin('data',
  process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta')));
const MUOTO = lippu('png') ? 'png' : 'webp';
const LAATU = Number(valitsin('laatu', 0.9));
const kuvaLeveys = Number(valitsin('leveys', 6400));
/* Korkeusruudukon askel asteina; 0,05 on hae-korkeusruudukko.mjs:n oma. */
const RUUTU = Number(valitsin('ruutu', 0.05));

/* ------------------------------------------------------------ lauta */

const moduuli = await import(LAUTA.moduuli.replace('./', `${JUURI}/`));
const pack = moduuli[LAUTA.vienti];
if (!pack?.map?.width || !pack?.map?.height) {
  throw new Error(`Laudan ${LAUTA.id} mittoja ei löytynyt.`);
}

const { projektio } = LAUTA;
const kaava = laudanProjektio(projektio);

/*
 * KAKSI LAATIKKOA: KARTTA-ALA JA KOKO ARKKI.
 *
 * `laudanBbox` on kartta-ala (ks. KARTTA_ALA). Sen mukaan lasketaan
 * aineiston laatikko asteina ja se kirjataan JSONiin `rajaus`-kenttänä
 * (kameran ikkuna, sama kenttä kuin maalehdillä).
 *
 * `arkinBbox` on koko painettu arkki: kartta-ala ja sen ylä- ja
 * alapuolella atlaskehyksen paperimarginaali (KEHYS). Se on kuvan
 * paikka laudalla, ja juuri se menee JSONin `bbox`-kenttään ja pelin
 * pakkaan (js/packs/fokus-grc.js YLEISLEHTI) — peli venyttää kuvan
 * siihen laatikkoon sellaisenaan, joten marginaali asettuu laudan ylä-
 * ja alapuolelle pergamentin päälle.
 *
 * LEVEYS ON MOLEMMILLA SAMA. Marginaalia ei ole sivuilla, koska
 * kiertävällä laudalla ei ole sivureunaa (ks. KEHYS).
 */
const laudanBbox = {
  x: 0,
  y: Math.round(kaava.lautaY(KARTTA_ALA.pohjoinen)),
  w: pack.map.width,
  h: Math.round(kaava.lautaY(KARTTA_ALA.etela))
    - Math.round(kaava.lautaY(KARTTA_ALA.pohjoinen)),
};
/** Lautayksikköä yhtä kuvapikseliä kohti valmiissa lehdessä. */
const YKSIKKOA_PER_PIKSELI = laudanBbox.w / 6400;
const kehyksenYla = KEHYS.yla * YKSIKKOA_PER_PIKSELI;
const kehyksenAla = KEHYS.ala * YKSIKKOA_PER_PIKSELI;
const arkinBbox = {
  x: 0,
  y: laudanBbox.y - kehyksenYla,
  w: laudanBbox.w,
  h: laudanBbox.h + kehyksenYla + kehyksenAla,
};

/*
 * Aineiston laatikko asteina. Reunoille puoli astetta väljyyttä, jotta
 * ruudukko kattaa varmasti jokaisen kuvapikselin — ruudukon ulkopuoli
 * luetaan avomereksi, ja se näkyisi tasaisena kaistaleena lehden
 * reunassa. Kulmat pyöristetään ruudun monikertaan, jotta ruudukon
 * pisteet osuvat lähdeaineiston omiin pisteisiin.
 */
const snap = (v, alas) => (alas ? Math.floor(v / RUUTU) : Math.ceil(v / RUUTU)) * RUUTU;
const laatikko = {
  lon0: snap(kaava.lautaLon(0) - 0.5, true),
  lon1: snap(kaava.lautaLon(laudanBbox.w) + 0.5, false),
  lat0: snap(kaava.lautaLat(laudanBbox.y + laudanBbox.h) - 0.5, true),
  lat1: snap(kaava.lautaLat(laudanBbox.y) + 0.5, false),
};

/* ------------------------------------------------------------ tasaus */

/**
 * Todistaa, että laudan kaupungit osuvat samaan paikkaan kuin projektio
 * laskee. Palauttaa rivit raporttiin ja kaataa ajon, jos ankkuri on
 * sivussa tai koko laudan mediaani karkaa.
 */
function tarkistaProjektio() {
  const rivit = [];
  for (const kaupunki of pack.cities) {
    const piste = TARKISTUSPISTEET[kaupunki.id];
    if (!piste) continue;
    const x = kaava.lautaX(piste.lon);
    const y = kaava.lautaY(piste.lat);
    const ero = Math.hypot(x - kaupunki.x, y - kaupunki.y);
    rivit.push({
      id: kaupunki.id,
      nimi: piste.nimi,
      ankkuri: Boolean(piste.ankkuri),
      lauta: [kaupunki.x, kaupunki.y],
      projektio: [Math.round(x * 10) / 10, Math.round(y * 10) / 10],
      ero: Math.round(ero * 100) / 100,
    });
  }
  if (rivit.length < 6) throw new Error('Tarkistuspisteitä löytyi laudalta liian vähän.');
  for (const r of rivit.filter((v) => v.ankkuri)) {
    if (r.ero > ANKKURIN_RAJA) {
      throw new Error(`Tasaus pettää: ${r.nimi} on ${r.ero} lautayksikköä sivussa `
        + `(raja ${ANKKURIN_RAJA}). Kuva ei osuisi lautaan.`);
    }
  }
  const erot = rivit.map((r) => r.ero).sort((a, b) => a - b);
  const mediaani = erot[Math.floor(erot.length / 2)];
  if (mediaani > MEDIAANIN_RAJA) {
    throw new Error(`Tasaus pettää: erojen mediaani ${mediaani} lautayksikköä `
      + `(raja ${MEDIAANIN_RAJA}). Projektio ei vastaa laudan kaavaa.`);
  }
  return { rivit, mediaani };
}

const tasaus = tarkistaProjektio();

/* ------------------------------------------------------------ aineisto */

const alkoi = Date.now();
console.log(`Yleislehti — lauta ${LAUTA.id}`);
console.log(`  kartta-ala      x ${laudanBbox.x} y ${laudanBbox.y} `
  + `w ${laudanBbox.w} h ${laudanBbox.h}`);
console.log(`  arkki laudalla  x ${arkinBbox.x} y ${arkinBbox.y} `
  + `w ${arkinBbox.w} h ${arkinBbox.h} `
  + `(atlaskehys ${KEHYS.yla}+${KEHYS.ala} px)`);
console.log(`  asteina         lon ${laatikko.lon0}..${laatikko.lon1} `
  + `lat ${laatikko.lat0}..${laatikko.lat1}`);
console.log(`  aineisto        ${dataKansio}`);

const aineisto = await keraaMaailma({ kansio: dataKansio, laatikko, ruutu: RUUTU });
const rannikkoPisteita = aineisto.rannikot.reduce((s, v) => s + v.length, 0);
console.log(`  korkeusruudukko ${aineisto.korkeus.w} x ${aineisto.korkeus.h} (${RUUTU}°)`);
console.log(`  meren ala       ${aineisto.meri
  ? 'ne_10m_ocean.geojson (maa ja meri erotettu)'
  : 'EI AINEISTOA — meri päätellään pelkästä korkeudesta'}`);
console.log(`  rannikko        ${aineisto.rannikot.length} viivaa, `
  + `${rannikkoPisteita} pistettä · järvet ${aineisto.jarvet.length}`);
for (const r of tasaus.rivit) {
  console.log(`  tasaus ${r.nimi.padEnd(14)} lauta ${r.lauta.join(',')} `
    + `→ projektio ${r.projektio.join(',')} (ero ${r.ero})`
    + (r.ankkuri ? '  ← ankkuri, ehdoton raja' : ''));
}

/* ------------------------------------------------------------ piirto */

/*
 * RUUDUKOT KULKEVAT SELAIMEEN BINÄÄRINÄ, EIVÄT JSONISSA.
 *
 * Maalehdillä ruudukko on base64-merkkijonona aineiston sisällä, ja se
 * on siellä ihan hyvä: yhden maan ruudukko on satoja kilotavuja.
 * Yleislehden ruudukko on 19 miljoonaa pistettä eli 39 megatavua, ja
 * base64 kasvattaisi sen 52 megatavun merkkijonoksi, joka pitäisi vielä
 * purkaa selaimessa merkki kerrallaan. ArrayBuffer menee sellaisenaan.
 */
const tyokansio = join(tmpdir(), `yleislehti-${process.pid}`);
mkdirSync(tyokansio, { recursive: true });
const { grid, ...korkeudenMitat } = aineisto.korkeus;
writeFileSync(join(tyokansio, 'korkeus.bin'), Buffer.from(grid.buffer, grid.byteOffset, grid.byteLength));
if (aineisto.meri) writeFileSync(join(tyokansio, 'meri.bin'), Buffer.from(aineisto.meri.buffer));
writeFileSync(join(tyokansio, 'aineisto.json'), JSON.stringify({
  korkeus: korkeudenMitat,
  meri: Boolean(aineisto.meri),
  rannikot: aineisto.rannikot,
  jarvet: aineisto.jarvet,
}));

const SIVU = `<!doctype html><meta charset="utf-8"><title>yleislehti</title>
<body style="margin:0;background:#333"><canvas id="k"></canvas>
<script type="module">
  import { piirraMaailma } from './maailmapiirto.js';
  const aineisto = await (await fetch('./aineisto.json')).json();
  const asetukset = await (await fetch('./asetukset.json')).json();
  aineisto.korkeus.grid = new Int16Array(await (await fetch('./korkeus.bin')).arrayBuffer());
  aineisto.meri = aineisto.meri
    ? new Uint8Array(await (await fetch('./meri.bin')).arrayBuffer()) : null;
  const mitat = piirraMaailma(document.getElementById('k'), aineisto, asetukset);
  window.__mitat = mitat;
  document.body.dataset.valmis = '1';
</script>`;

const TYYPIT = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.bin': 'application/octet-stream',
};
const palvelin = createServer((req, res) => {
  const polku = decodeURIComponent(req.url.split('?')[0]);
  if (polku === '/' || polku === '/index.html') {
    res.writeHead(200, { 'content-type': TYYPIT['.html'] });
    res.end(SIVU);
    return;
  }
  if (polku === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const lahteet = {
    '/maailmapiirto.js': join(TAALLA, 'fokuskartta', 'maailmapiirto.js'),
    '/piirto.js': join(TAALLA, 'fokuskartta', 'piirto.js'),
    '/aineisto.json': join(tyokansio, 'aineisto.json'),
    '/asetukset.json': join(tyokansio, 'asetukset.json'),
    '/korkeus.bin': join(tyokansio, 'korkeus.bin'),
    '/meri.bin': join(tyokansio, 'meri.bin'),
  };
  const tiedosto = lahteet[polku];
  if (!tiedosto) { res.writeHead(404); res.end('ei'); return; }
  const pate = polku.slice(polku.lastIndexOf('.'));
  res.writeHead(200, {
    'content-type': TYYPIT[pate] ?? 'application/octet-stream',
    // Asetukset vaihtuvat saman ajon aikana (esikatselukuva).
    'cache-control': 'no-store',
  });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

// Playwright repon node_modulesista, muuten kontin globaalista (sama
// kaava kuin tools/savukkeet/README.md kuvaa).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});

/** Yksi renderöinti; palauttaa kuvapuskurin ja kuvan mitat. */
async function renderoi(asetukset) {
  writeFileSync(join(tyokansio, 'asetukset.json'), JSON.stringify(asetukset));
  const sivu = await selain.newPage({ viewport: { width: 400, height: 300 } });
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });
  await sivu.goto(`${osoite}?ajo=${Date.now()}`, { waitUntil: 'load' });
  await sivu.waitForSelector('body[data-valmis="1"]', { timeout: 900000 })
    .catch(() => { throw new Error(`Piirto ei valmistunut: ${virheet.join(' | ') || 'aikakatkaisu'}`); });
  const data = await sivu.evaluate(
    ([tyyppi, laatu]) => document.getElementById('k').toDataURL(tyyppi, laatu),
    [`image/${MUOTO}`, LAATU],
  );
  const mitat = await sivu.evaluate(() => window.__mitat);
  await sivu.close();
  if (virheet.length) throw new Error(`Piirto virheili: ${virheet.join(' | ')}`);
  return { puskuri: Buffer.from(data.split(',')[1], 'base64'), mitat };
}

mkdirSync(kohdekansio, { recursive: true });

const TYYLI = { meret: MERET, kehys: KEHYS, kompassi: KOMPASSI };

const { puskuri, mitat } = await renderoi({
  bbox: arkinBbox,
  projektio,
  leveys: kuvaLeveys,
  tyyli: TYYLI,
});
const kuvaPolku = join(kohdekansio, `MAAILMA.${MUOTO}`);
writeFileSync(kuvaPolku, puskuri);

const jsonPolku = join(kohdekansio, 'MAAILMA.json');
writeFileSync(jsonPolku, `${JSON.stringify({
  id: 'MAAILMA',
  lauta: LAUTA.id,
  // Kuvan paikka LAUDAN koordinaateissa: peli asettaa <image>-elementin
  // tähän laatikkoon sellaisenaan. Yleislehdellä se on lauta ja sen
  // ylä- ja alapuolelle ulottuva atlaskehyksen paperimarginaali, joten
  // laatikko alkaa laudan yläpuolelta (y on negatiivinen).
  bbox: arkinBbox,
  // Kameran ikkuna on kartta-ala eli tasan lauta — marginaaliin ei ajeta.
  rajaus: laudanBbox,
  kehys: KEHYS,
  kompassi: KOMPASSI,
  kuva: mitat,
  tiedosto: `MAAILMA.${MUOTO}`,
  tehty: new Date().toISOString().slice(0, 10),
  laatikko,
  ruutu: RUUTU,
  korkeusruudukko: { w: aineisto.korkeus.w, h: aineisto.korkeus.h },
  meret: MERET.map((m) => m.nimi),
  tasaus: tasaus.rivit,
  tasauksenMediaani: Math.round(tasaus.mediaani * 100) / 100,
  lahteet: [
    'Natural Earth 10m (Kelso & Patterson) — public domain',
    'ETOPO1 Global Relief (NOAA, Amante & Eakins 2009) — public domain',
  ],
}, null, 2)}\n`);

if (lippu('esikatselu')) {
  // Sama kuva pergamentin päällä: häivytetty reuna näyttää katselimessa
  // mustalta, eikä kuvaa voi sillä taustalla arvioida.
  const { puskuri: e } = await renderoi({
    bbox: arkinBbox,
    projektio,
    leveys: kuvaLeveys,
    tyyli: TYYLI,
    esikatseluTausta: '#e9d8b0',
  });
  writeFileSync(join(kohdekansio, `MAAILMA-esikatselu.${MUOTO}`), e);
  console.log(`  esikatselu      ${join(kohdekansio, `MAAILMA-esikatselu.${MUOTO}`)}`);
}

await selain.close();
palvelin.close();

const mt = (p) => `${(statSync(p).size / 1e6).toFixed(2)} Mt`;
console.log(`  kuva            ${kuvaPolku} — ${mitat.w}x${mitat.h}, ${mt(kuvaPolku)}`);
console.log(`  paikka          ${jsonPolku}`);
console.log(`  kesto           ${((Date.now() - alkoi) / 1000).toFixed(1)} s`);
console.log('\nVie ämpäriin kansioon fokus/ (fokus/MAAILMA.webp ja fokus/MAAILMA.json).');
