/*
 * GEO-APURI — d3-geo, d3-geo-projection ja topojson-client pelin
 * omalle laudalle.
 *
 * Omistajan päätös 5.9.2026 (kirjastokartoituksen TOP 6, kohta 3;
 * docs/raportit/valmiit-palikat-2026-09-04.md luku 2.1): *"jokainen
 * uusi linssi, joka tuo maailmandataa, joutuu projisoimaan sen
 * laudalle, ja tools/-putket joutuvat kääntämään julisteita
 * projektiosta toiseen"*. Tämä moduuli on se yksi paikka, jossa
 * käännös tehdään — ei näy pelaajalle mitenkään, mutta jokainen tuleva
 * karttalinssi halpenee sen verran, mitä GeoJSONin projisointi käsin
 * maksaisi.
 *
 * ── TÄMÄ MODUULI EI MUUTA YHTÄKÄÄN LUKEMAA ─────────────────────────
 *
 * Pelin oma projektio (js/fokusmitat.js projisoiLaudalle /
 * laudaltaAsteiksi) PYSYY totuutena. Tämä moduuli rakentaa d3:n
 * projektion, joka antaa TÄSMÄLLEEN samat luvut (mitattu ero 261
 * kaupungilla ja 5000 satunnaisella pisteellä: 3,6e-12 lautayksikköä,
 * tests/geo.test.mjs vartioi rajaa 0,01). Kirjastoa ei siis oteta
 * korvaamaan pelin kaavaa vaan piirtämään sillä kaavalla sellaista,
 * mitä käsin ei jaksa: polygoniketjuja, isokaaria ja ympyröitä.
 *
 * MIKSI SE VOI OLLA SAMA. Pelin "miller" on Millerin lieriö, jossa
 * y kasvaa alaspäin (millerY = −1,25·ln(tan(π/4 + 0,4φ))), koko kierros
 * on laudan leveys ja nollakohta on lon0 = −175°. d3:n geoMiller on
 * sama raakaprojektio ylöspäin kasvavalla y:llä, joten sama tulos
 * saadaan kolmella asetuksella:
 *
 *     rotate  [−(lon0 + 180), 0]   sauma laudan vasempaan reunaan
 *     scale   leveys / 2π          koko kierros = laudan leveys
 *     translate [leveys/2, sk·yP]  yP = 1,25·ln(tan(π/4 + 0,4·pohjoinen))
 *
 * Kierto on −(lon0+180) eikä −lon0, koska d3 kietoo pituusasteen välille
 * [−180°, 180°) ja lauta välille [0°, 360°): puolen kierroksen siirto
 * kierrossa ja sama puolikas takaisin translatessa vie sauman laudan
 * reunaan eikä keskelle.
 *
 * Tasavälinen lauta (europe) on d3:lle oma raakaprojektionsa, koska
 * siinä x:n ja y:n mittakaava EIVÄT ole samat (lonA 19,2 ja latA −26,3)
 * eikä d3-projektiolla ole kahta skaalaa. Suhde ajetaan sisään
 * raakaprojektioon (φ ↦ φ·r, r = −latA/lonA).
 *
 * ── KIRJASTO TULEE ÄMPÄRISTÄ, JA SEN SAA PUUTTUA ───────────────────
 *
 * Raamattu "VALMIIT KIRJASTOT: STPAGEFLIP ENSIN" (5.9.2026): kirjasto
 * ladataan R2:n vendor/-polusta laiskasti, ja sen puuttuminen ei kaada
 * peliä. Siksi JOKAINEN tämän moduulin funktio palauttaa null, jos
 * kirjastoa ei ole ladattu — kutsuja käyttää silloin vanhaa polkuaan
 * (esim. projisoiLaudalle piste kerrallaan). Yhden tiedoston versio
 * (dist/) jää ilman kirjastoa kuten se jää ilman linssejä, ja silloin
 * tämä moduuli on pelkkä nollarivi.
 *
 * Nodessa (tools/-putket ja testit) kirjasto tulee paketeista:
 *
 *     npm install --no-save d3-geo d3-geo-projection topojson-client
 *
 * eikä repon package.jsonin riippuvuuksiin lisätä mitään (sama linja
 * kuin sharpilla tee-pallolaatat-workflow'ssa). Ilman asennusta
 * lataaGeo() palauttaa null ja testit ohittavat itsensä.
 *
 * ── RAJAPINTA (ohjedokumentin sijaan tässä; ks. raportin loppu) ─────
 *
 *   await lataaGeo()          → { d3, topojson } tai null. Laiska,
 *                               muistettu, virhe ei kaada.
 *   geoKirjasto()             → sama olio synkronisesti tai null.
 *   laudanProjektio(lauta)    → d3-projektio, joka vastaa
 *                               projisoiLaudalle-funktiota (± 0,01).
 *                               `lauta` = laudan id tai projektiorivi.
 *   geojsonLaudalle(g, lauta, { rajaus }) → SVG-polkudata laudan
 *                               yksiköissä (d3.geoPath) tai null.
 *                               `rajaus` = [[x0,y0],[x1,y1]] leikkaa
 *                               tuloksen laudan suorakaiteeseen.
 *   topojsonLaudalle(topo, objekti, lauta, asetukset) → sama TopoJSONista.
 *   isokaari(a, b, n, lauta)  → { asteet: [[lon,lat]…],
 *                                 laudalla: [{x,y}…] | null }.
 *   etaisyysKm(a, b)          → isokaaren pituus kilometreinä.
 *   nakyvyysympyra(k, sadeKm) → GeoJSON-monikulmio (d3.geoCircle).
 *   pallolle(geojson)         → [{ pisteet: [[lat, lon]…] }] eli
 *                               Globe.gl:n pathsData siinä muodossa,
 *                               jota js/pallolauta/reitit.js käyttää.
 *
 * Piste kelpaa muodossa { lon, lat } tai [lon, lat] — sisäisesti
 * kaikki on d3:n järjestyksessä [pituus, leveys].
 */

import { FOKUS_LAUTAPROJEKTIOT } from './packs/fokus-grc.js';

const RAD = Math.PI / 180;

/**
 * Maapallon keskisäde kilometreinä (IUGG, R1). Sama luku, jolla d3:n
 * geoDistance (radiaaneja) muuttuu kilometreiksi. Mittajanan oma vakio
 * (js/fokusmitat.js KM_PITUUSASTEELLA 111,32 km/aste) on saman pallon
 * päiväntasaajakehä jaettuna 360:llä, joten luvut ovat sukua mutta eri
 * asioita: se mittaa laudan yksiköitä, tämä isokaarta.
 */
export const MAAPALLON_SADE_KM = 6371.0088;

const R2 = 'https://media.matkakirja.app/';

/**
 * Kirjastot ämpärin vendor/-polussa (workflow vie-vendor vie ne sinne
 * lisenssitiedostoineen). JÄRJESTYS ON EHTO: d3-geo-projection laajentaa
 * globaalia `d3`:tä, joten se ei voi latautua ennen d3-geo:ta.
 *
 * D3-ARRAY ON ENSIMMÄISENÄ EIKÄ YLIMÄÄRÄISENÄ. d3-geon ja
 * d3-geo-projectionin UMD-paketit EIVÄT sisällä sitä vaan vaativat sen
 * ulkoa (mitattu pakettien omasta otsikosta 5.9.2026:
 * `t(exports, require("d3-array"))`, AMD-riippuvuutena
 * `define(["exports","d3-array"],…)`). Ilman sitä d3-geo kaatuu heti
 * latauksessa — se rakentaa moduulitasolla `new Adder()` — ja globaali
 * `d3` jää puolitiehen. Kolmen kilotavun paketti on siis ehto, ei lisä.
 * topojson-client on omavarainen (`define(["exports"],…)`).
 */
export const GEO_KIRJASTOT = [
  `${R2}vendor/d3-array-3.2.4.min.js`,
  `${R2}vendor/d3-geo-3.1.1.min.js`,
  `${R2}vendor/d3-geo-projection-4.0.0.min.js`,
  `${R2}vendor/topojson-client-3.1.0.min.js`,
];

/** Samat paketit Nodessa (tools/-putket, testit). Sama järjestys. */
const GEO_PAKETIT = ['d3-geo', 'd3-geo-projection', 'topojson-client'];

let kirjasto = null;
let lupaus = null;

/** Ladattu kirjasto synkronisesti, tai null jos sitä ei ole. */
export function geoKirjasto() {
  return kirjasto;
}

/** Yksi UMD-skripti dokumenttiin; lupaus latauksesta. */
function skripti(doc, osoite) {
  return new Promise((ok, ei) => {
    const s = doc.createElement('script');
    s.src = osoite;
    s.async = false; // järjestys on ehto (ks. GEO_KIRJASTOT)
    s.addEventListener('load', () => ok(true));
    s.addEventListener('error', () => ei(new Error(`ei latautunut: ${osoite}`)));
    doc.head.appendChild(s);
  });
}

async function selaimesta(doc) {
  for (const osoite of GEO_KIRJASTOT) {
    // Peräkkäin eikä rinnan: ks. GEO_KIRJASTOT.
    await skripti(doc, osoite); // eslint-disable-line no-await-in-loop
  }
  const d3 = globalThis.d3;
  const topojson = globalThis.topojson;
  if (!d3?.geoPath || !d3?.geoMiller || !topojson?.feature) {
    throw new Error('geo-kirjastot latautuivat vajaina');
  }
  return { d3, topojson };
}

async function nodesta() {
  const [geo, proj, topo] = await Promise.all(GEO_PAKETIT.map((p) => import(p)));
  const d3 = { ...geo, ...proj };
  if (!d3.geoPath || !d3.geoMiller || !topo.feature) {
    throw new Error('geo-paketit puuttuvat');
  }
  return { d3, topojson: topo };
}

/**
 * Kirjaston laiska lataus. Palauttaa { d3, topojson } tai NULL — ei
 * koskaan hylkää, koska kutsujan on määrä pudota vanhaan polkuun eikä
 * kaatua (Raamatun kirjastosääntö 2, malli js/pallo.js
 * lataaPallokirjasto).
 *
 * Epäonnistunut lataus ei jää muistiin: seuraava kutsu yrittää
 * uudelleen, kun verkko on palannut. Onnistunut jää.
 */
export function lataaGeo(doc = (typeof document === 'undefined' ? null : document)) {
  if (kirjasto) return Promise.resolve(kirjasto);
  if (lupaus) return lupaus;
  lupaus = (doc ? selaimesta(doc) : nodesta())
    .then((k) => { kirjasto = k; return k; })
    .catch(() => { lupaus = null; return null; });
  return lupaus;
}

/** Vain testejä varten: unohda ladattu kirjasto. */
export function unohdaGeo() {
  kirjasto = null;
  lupaus = null;
}

/* ------------------------------------------------- laudan projektio */

/** Laudan projektiorivi id:stä tai valmiina oliona. */
function projektiorivi(lauta) {
  if (!lauta) return null;
  if (typeof lauta === 'string') return FOKUS_LAUTAPROJEKTIOT[lauta] ?? null;
  return lauta.tyyppi ? lauta : null;
}

/**
 * D3-PROJEKTIO, JOKA VASTAA PELIN OMAA KAAVAA.
 *
 * Tulos on sama kuin projisoiLaudalle(lauta, lon, lat) laudan
 * yksiköissä (mitattu ero 3,6e-12; vartioitu raja 0,01). Kaavan
 * johdatus on tiedoston alussa.
 *
 * Palauttaa null, jos kirjastoa ei ole ladattu tai lautaa ei tunneta —
 * kutsuja käyttää silloin projisoiLaudalle-funktiota pisteittäin.
 */
export function laudanProjektio(lauta) {
  const d3 = kirjasto?.d3;
  const p = projektiorivi(lauta);
  if (!d3 || !p) return null;
  if (p.tyyppi === 'miller') {
    const sk = p.leveys / (2 * Math.PI);
    // d3:n miller kasvaa ylöspäin, pelin alaspäin — siirto hoitaa eron.
    const yPohjoinen = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * p.pohjoinen * RAD));
    return d3.geoMiller()
      .rotate([-(p.lon0 + 180), 0])
      .scale(sk)
      .translate([p.leveys / 2, sk * yPohjoinen]);
  }
  if (p.tyyppi === 'tasavali') {
    /*
     * Tasavälinen lauta venytetään eri kertoimella pituus- ja
     * leveyssuunnassa (lonA 19,2 / latA −26,3), eikä d3-projektiolla ole
     * kahta skaalaa. Suhde r = −latA/lonA ajetaan raakaprojektioon, ja
     * yksi skaala hoitaa loput. Käänteisfunktio on pakko antaa, koska
     * ilman sitä projektiolla ei ole invertiä.
     */
    const r = -p.latA / p.lonA;
    const raaka = (lambda, phi) => [lambda, phi * r];
    raaka.invert = (x, y) => [x, y / r];
    return d3.geoProjection(raaka)
      .scale(p.lonA / RAD)
      .translate([p.lonB, p.latB]);
  }
  return null;
}

/* ------------------------------------------------------ aineistot */

/** Polkugeneraattori laudan yksiköissä, valinnainen suorakaiderajaus. */
function polkuGeneraattori(lauta, { rajaus } = {}) {
  const d3 = kirjasto?.d3;
  const pr = laudanProjektio(lauta);
  if (!d3 || !pr) return null;
  // clipExtent leikkaa TULOKSEN laudan suorakaiteeseen. Ilman sitä
  // esimerkiksi Etelämanner ja Ellesmeren saari jäävät laudan ulkopuolelle
  // (lauta kattaa 76° P … n. 57,6° E), mikä on oikein mutta harvoin
  // toivottua: linssi haluaa polun, joka mahtuu lautaan.
  if (rajaus) pr.clipExtent(rajaus);
  return d3.geoPath(pr);
}

/**
 * GeoJSON laudan pikseleiksi: SVG-polkudata (`d`-attribuutti) laudan
 * yksiköissä. Palauttaa null ilman kirjastoa ja tyhjän merkkijonon,
 * jos geometriasta ei jää mitään näkyviin.
 */
export function geojsonLaudalle(geojson, lauta, asetukset) {
  const polku = polkuGeneraattori(lauta, asetukset);
  if (!polku || !geojson) return null;
  return polku(geojson) ?? '';
}

/**
 * TopoJSON laudan pikseleiksi. `objekti` on topo.objects-avain tai
 * valmis objekti; topojson-client purkaa sen GeoJSONiksi (siinä on koko
 * paketin idea: sama aineisto vie murto-osan GeoJSONin koosta).
 */
export function topojsonLaudalle(topo, objekti, lauta, asetukset) {
  const topojson = kirjasto?.topojson;
  if (!topojson || !topo) return null;
  const kohde = typeof objekti === 'string' ? topo.objects?.[objekti] : objekti;
  if (!kohde) return null;
  return geojsonLaudalle(topojson.feature(topo, kohde), lauta, asetukset);
}

/** Piste d3:n järjestykseen [lon, lat]. */
function pisteeksi(p) {
  if (!p) return null;
  if (Array.isArray(p)) return [p[0], p[1]];
  const lon = p.lon ?? p.lng;
  if (!Number.isFinite(lon) || !Number.isFinite(p.lat)) return null;
  return [lon, p.lat];
}

/**
 * ISOKAARI kahden pisteen välillä: n + 1 pistettä asteina ja (jos lauta
 * annetaan) laudan yksiköissä.
 *
 * Tämä on se, mitä pelaaja lopulta näkee: Lontoosta Bombayhin kulkeva
 * reitti EI ole suora viiva kartalla vaan kaari, joka nousee pohjoiseen
 * — sama kaari, jota laiva ja kone oikeasti kulkivat.
 *
 * Laudan pisteitä laskettaessa sauman (lon0) ylittävä kaari hyppää
 * laudan reunasta toiseen; kiertävällä laudalla se on oikein (piirtäjä
 * toistaa kartan molemmin puolin), mutta katkos on kutsujan tiedettävä.
 */
export function isokaari(a, b, n = 64, lauta = null) {
  const d3 = kirjasto?.d3;
  const A = pisteeksi(a);
  const B = pisteeksi(b);
  if (!d3 || !A || !B || !(n >= 1)) return null;
  const valilla = d3.geoInterpolate(A, B);
  const asteet = [];
  for (let i = 0; i <= n; i += 1) asteet.push(valilla(i / n));
  const pr = lauta ? laudanProjektio(lauta) : null;
  return {
    asteet,
    laudalla: pr ? asteet.map((p) => { const [x, y] = pr(p); return { x, y }; }) : null,
  };
}

/** Isokaaren pituus kilometreinä (d3.geoDistance). */
export function etaisyysKm(a, b) {
  const d3 = kirjasto?.d3;
  const A = pisteeksi(a);
  const B = pisteeksi(b);
  if (!d3 || !A || !B) return null;
  return d3.geoDistance(A, B) * MAAPALLON_SADE_KM;
}

/**
 * NÄKYVYYSYMPYRÄ: monikulmio, jonka jokainen piste on `sadeKm`
 * päässä keskuksesta pallon pintaa pitkin. Tasokartalla se ei ole
 * ympyrä vaan projektion vääristämä muoto — juuri siksi se on
 * opettava (majakan kantama, höyrylaivan päivämatka, sähkeen kantomatka).
 */
export function nakyvyysympyra(keskus, sadeKm, tarkkuus = 2) {
  const d3 = kirjasto?.d3;
  const K = pisteeksi(keskus);
  if (!d3 || !K || !(sadeKm > 0)) return null;
  return d3.geoCircle()
    .center(K)
    .radius((sadeKm / MAAPALLON_SADE_KM) / RAD)
    .precision(tarkkuus)();
}

/* ----------------------------------------------------------- pallo */

/** Geometrian viivaketjut [[lon, lat], …] -taulukoiksi. */
function ketjut(geometria, ulos) {
  if (!geometria) return ulos;
  const t = geometria.type;
  const k = geometria.coordinates;
  if (t === 'LineString') ulos.push(k);
  else if (t === 'MultiLineString' || t === 'Polygon') ulos.push(...k);
  else if (t === 'MultiPolygon') for (const poly of k) ulos.push(...poly);
  else if (t === 'GeometryCollection') for (const g of geometria.geometries ?? []) ketjut(g, ulos);
  return ulos;
}

/**
 * GeoJSON pallolle SELLAISENAAN asteina: Globe.gl:n pathsData siinä
 * muodossa, jota pallolauta jo käyttää (js/pallolauta/reitit.js:
 * `pathPoints('pisteet')`, `pathPointLat(p => p[0])`), eli
 * [{ pisteet: [[lat, lon], …] }].
 *
 * Pallolla ei projisoida mitään — pallo ON pallo — joten tämä on vain
 * muodonvaihto. Se on silti täällä eikä kutsujassa, jotta laudan ja
 * pallon välinen käännös on yhdessä paikassa.
 */
export function pallolle(geojson) {
  if (!geojson) return null;
  const geometriat = [];
  if (geojson.type === 'FeatureCollection') {
    for (const f of geojson.features ?? []) geometriat.push(f.geometry);
  } else if (geojson.type === 'Feature') geometriat.push(geojson.geometry);
  else geometriat.push(geojson);
  const ulos = [];
  for (const g of geometriat) {
    for (const ketju of ketjut(g, [])) {
      const pisteet = ketju
        .filter((p) => Number.isFinite(p?.[0]) && Number.isFinite(p?.[1]))
        .map(([lon, lat]) => [lat, lon]);
      if (pisteet.length > 1) ulos.push({ pisteet });
    }
  }
  return ulos;
}
