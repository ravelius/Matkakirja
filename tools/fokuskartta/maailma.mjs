/*
 * YLEISLEHDEN RAAKA-AINEISTO — koko pelilauta yhtenä karttana.
 *
 * Tämä on tools/tee-yleislehti.mjs:n moduuli, ei oma työkalunsa. Sisar
 * on tools/fokuskartta/aineisto.mjs, joka kokoaa YHDEN MAAN ympäristön;
 * tässä kootaan se, mitä koko maailman kattava lehti tarvitsee:
 *
 *   korkeus    Int16-ruudukko laudan alueelta, y = 0 pohjoisin rivi
 *   meri       sama ruudukko bittimaskina (Natural Earth ne_10m_ocean)
 *   rannikot   rantaviiva polyviivoina (sama ne_10m_ocean)
 *   jarvet     isot järvet renkaina (ne_10m_lakes)
 *
 * === KOLME ASIAA, JOTKA OVAT TOISIN KUIN MAALEHDESSÄ ===
 *
 * 1. KORKEUSAINEISTO TULEE VALMIILTA MAAILMANRUUDUKOLTA. Maalehtien
 *    ETOPO-levy (etopo.mjs, haku hae-etopo-eurooppa.mjs) on yhden
 *    kaariminuutin tarkkuudessa ja Euroopan kokoinen — koko maailma
 *    samalla tarkkuudella olisi 933 miljoonaa pistettä eikä sitä
 *    tarvita: yleislehti on 6400 pikseliä leveä, jolloin yksi
 *    kuvapikseli on 0,056 astetta. Pelissä on jo koko maailman ruudukko
 *    juuri tähän mittaluokkaan (tools/hae-korkeusruudukko.mjs, 0,05° eli
 *    kolme kaariminuuttia, haettu kahden kaariminuutin näytteistä
 *    keskiarvona), ja se haetaan samalta ERDDAP-palvelimelta samasta
 *    ETOPO1:stä kuin maalehtienkin levy. Uutta hakijaa ei siis tehty:
 *    olemassa oleva levyformaatti jää maalehdille koskemattomaksi ja
 *    yleislehti lainaa sen työkalun, joka on tehty juuri koko maailmalle.
 *
 * 2. RUUDUKKO KIERTÄÄ PÄIVÄMÄÄRÄNRAJAN YLI. Lauta alkaa pituusasteelta
 *    −175 ja päättyy asteelle +185 (js/packs/maailmankartta.js,
 *    tools/tee-maailmankartta.mjs LON0), joten sen itälaita on
 *    lännempää kuin sen länsilaita. Lähdeaineisto on −180…180, ja
 *    ruudukko kootaan siitä KIERTÄEN: sarake haetaan asteelta
 *    ((lon + 180) mod 360) − 180. Ilman tätä lehteen jäisi 175. asteen
 *    kohdalle tyhjä kaistale — juuri se sauma, jonka omistaja pyysi
 *    tarkistamaan.
 *
 * 3. RANNIKKO ON OMANA VEKTORINAAN. Maalehdessä rantaviivan piirtää
 *    kohdemaan oma monikulmio; yleislehdessä ei ole kohdemaata, joten
 *    viiva tulee meren alan reunasta. Meren monikulmion reunaan kuuluu
 *    myös KARTAN KEHYS (pituusasteet ±180 ja navat), joka ei ole
 *    rannikkoa lainkaan — ne osuudet karsitaan, tai lehteen piirtyisi
 *    musta pystyviiva keskelle Tyyntämerta.
 *
 * Lähteet: Natural Earth 10m (Kelso & Patterson) — public domain;
 * ETOPO1 Global Relief (NOAA, Amante & Eakins 2009) — public domain.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { meriMaski } from './aineisto.mjs';
import { haeKorkeusruudukko } from '../hae-korkeusruudukko.mjs';

/** Pyöristys neljään desimaaliin: noin 11 metriä, aivan riittävä. */
const pyorista = (n) => Math.round(n * 1e4) / 1e4;

function lue(kansio, nimi) {
  const polku = join(kansio, nimi);
  if (!existsSync(polku)) {
    throw new Error(`Aineisto puuttuu: ${polku}\n`
      + 'Lataa Natural Earth 10m -tiedostot tähän kansioon '
      + '(ks. tools/fokuskartta/aineisto.mjs tiedoston alku).');
  }
  return JSON.parse(readFileSync(polku, 'utf8'));
}

/**
 * Laudan alueen korkeusruudukko maailmanruudukosta.
 *
 * Palautus on sama olio kuin maalehdillä (`aineisto.korkeus`) paitsi
 * että ruudukko on Int16Array eikä base64: yleislehden ruudukko on
 * kymmeniä megatavuja, ja se kulkee selaimeen omana binääritiedostonaan
 * (ks. tools/tee-yleislehti.mjs) eikä JSONiin ahdettuna merkkijonona.
 */
export async function korkeusruudukko({ laatikko, ruutu = 0.05, hiljaa = false }) {
  const maailma = await haeKorkeusruudukko({ ruutu, hiljaa });
  const w = Math.round((laatikko.lon1 - laatikko.lon0) / ruutu) + 1;
  const h = Math.round((laatikko.lat1 - laatikko.lat0) / ruutu) + 1;
  const grid = new Int16Array(w * h);
  // Lähdesarake jokaiselle kohdesarakkeelle kerran: kierto on sama
  // jokaisella rivillä, eikä sitä kannata laskea 19 miljoonaa kertaa.
  const lahdeX = new Int32Array(w);
  for (let x = 0; x < w; x++) {
    const lon = laatikko.lon0 + x * ruutu;
    const kierretty = ((((lon + 180) % 360) + 360) % 360) - 180;
    lahdeX[x] = Math.min(maailma.leveys - 1,
      Math.max(0, Math.round((kierretty + 180) / ruutu)));
  }
  for (let y = 0; y < h; y++) {
    // Kohteessa y = 0 on POHJOISIN rivi, lähteessä y = 0 on etelänapa.
    const lat = laatikko.lat1 - y * ruutu;
    const ly = Math.min(maailma.korkeus - 1,
      Math.max(0, Math.round((lat + 90) / ruutu)));
    const rivi = ly * maailma.leveys;
    for (let x = 0; x < w; x++) {
      const v = maailma.z[rivi + lahdeX[x]];
      grid[y * w + x] = Math.max(-32000, Math.min(32000, Math.round(v)));
    }
  }
  return {
    w,
    h,
    lon0: laatikko.lon0,
    lon1: laatikko.lon1,
    lat0: laatikko.lat0,
    lat1: laatikko.lat1,
    grid,
    lahteet: maailma.lahteet,
  };
}

/*
 * KEHYS EI OLE RANNIKKOA.
 *
 * Natural Earthin meren monikulmio on suljettu, joten sen reunaan
 * kuuluu maailmankartan kehys: pystysuorat pituusasteilla ±180 ja
 * vaakasuorat navoilla. Ne ovat aineiston reunaa eivätkä rantaa, ja
 * piirrettyinä ne olisivat suoria mustia viivoja keskellä ulappaa.
 *
 * Raja on 179,99 eikä 180, koska aineistossa on pisteitä kuten
 * 179,999999 — pyöristyksen jälkiä, jotka ovat samaa kehystä.
 */
const kehyspiste = ([lon, lat]) => Math.abs(lon) >= 179.99
  || lat >= 89.99 || lat <= -89.99;

/**
 * Rantaviiva polyviivoina meren alan reunasta.
 *
 * `harvennus` on pienin sallittu askel asteina: peräkkäiset pisteet,
 * jotka ovat sitä lähempänä toisiaan, jäävät pois. Yleislehdellä yksi
 * kuvapikseli on 0,056 astetta, joten kymmenesosan pikselin tarkkuus
 * riittää moninkertaisesti — ja aineisto kutistuu murto-osaan, mikä on
 * koko ero sen välillä, että selaimelle siirretään kymmenen vai sata
 * megatavua.
 *
 * Ulkopuolinen ei tarvitse tietää, mikä rengas on mikin: paluu on
 * pelkkä lista viivoja, ja piirtomoottori katkaisee ne vielä kerran
 * päivämääränrajalla (maailmapiirto.js).
 */
export function rannikot(kansio, { laatikko, harvennus = 0.006 }) {
  const ulos = [];
  const lisaaRengas = (rengas) => {
    let nykyinen = null;
    let edellinen = null;
    const paata = () => {
      if (nykyinen && nykyinen.length > 1) ulos.push(nykyinen);
      nykyinen = null;
      edellinen = null;
    };
    for (const piste of rengas) {
      const [lon, lat] = piste;
      // Kehyksen osuudet katkaisevat viivan; rannikko jatkuu niiden
      // toisella puolella omana pätkänään.
      if (kehyspiste(piste)) { paata(); continue; }
      if (lat < laatikko.lat0 - 1 || lat > laatikko.lat1 + 1) { paata(); continue; }
      if (edellinen
        && Math.abs(lon - edellinen[0]) < harvennus
        && Math.abs(lat - edellinen[1]) < harvennus) continue;
      if (!nykyinen) nykyinen = [];
      nykyinen.push([pyorista(lon), pyorista(lat)]);
      edellinen = [lon, lat];
    }
    paata();
  };
  const lisaa = (geom) => {
    if (geom.type === 'Polygon') for (const r of geom.coordinates) lisaaRengas(r);
    else if (geom.type === 'MultiPolygon') {
      for (const p of geom.coordinates) for (const r of p) lisaaRengas(r);
    }
  };
  for (const f of lue(kansio, 'ne_10m_ocean.geojson').features) lisaa(f.geometry);
  return ulos;
}

/**
 * Isot järvet renkaina.
 *
 * PIENET JÄTETÄÄN POIS. Aineistossa on tuhansia järviä, joista suurin
 * osa on yleislehdellä alle kuvapikselin kokoisia: ne eivät piirtyisi
 * vedeksi vaan tummiksi pisteiksi maastoon. `vahinKoko` on järven
 * laatikon pidempi sivu asteina.
 *
 * Kaspianmeri ei ole tässä listassa vaan meren alassa (ne_10m_ocean),
 * kuten maalehdilläkin — ks. aineisto.mjs.
 */
export function jarvet(kansio, { vahinKoko = 0.4, harvennus = 0.006 } = {}) {
  const ulos = [];
  for (const f of lue(kansio, 'ne_10m_lakes.geojson').features) {
    const renkaat = [];
    const lisaa = (poly) => {
      for (const rengas of poly) {
        let lon0 = Infinity; let lon1 = -Infinity;
        let lat0 = Infinity; let lat1 = -Infinity;
        const harva = [];
        let edellinen = null;
        for (const [lon, lat] of rengas) {
          if (lon < lon0) lon0 = lon;
          if (lon > lon1) lon1 = lon;
          if (lat < lat0) lat0 = lat;
          if (lat > lat1) lat1 = lat;
          if (edellinen
            && Math.abs(lon - edellinen[0]) < harvennus
            && Math.abs(lat - edellinen[1]) < harvennus) continue;
          harva.push([pyorista(lon), pyorista(lat)]);
          edellinen = [lon, lat];
        }
        if (Math.max(lon1 - lon0, lat1 - lat0) < vahinKoko) continue;
        if (harva.length > 2) renkaat.push(harva);
      }
    };
    if (f.geometry.type === 'Polygon') lisaa(f.geometry.coordinates);
    else if (f.geometry.type === 'MultiPolygon') {
      for (const p of f.geometry.coordinates) lisaa(p);
    }
    if (renkaat.length) ulos.push({ nimi: f.properties.name ?? '', renkaat });
  }
  return ulos;
}

/**
 * Kokoaa yleislehden aineiston.
 *
 * Palauttaa `{ korkeus, meri, rannikot, jarvet }`, jossa `korkeus.grid`
 * on Int16Array ja `meri` Uint8Array-bittimaski samassa ruudukossa.
 * Kumpikin siirretään selaimeen binäärinä (tee-yleislehti.mjs), joten
 * ne EIVÄT ole base64:nä kuten maalehdillä.
 */
export async function keraaMaailma({ kansio, laatikko, ruutu = 0.05 }) {
  const korkeus = await korkeusruudukko({ laatikko, ruutu });
  /*
   * Laajennus yhdellä ruudulla eikä kahdella: yleislehdellä ruudukko ja
   * kuvapikseli ovat samaa kokoluokkaa (0,05° vs. 0,056°), joten
   * maalehtien kahden ruudun dilaatio työntäisi merta turhan pitkälle
   * kuivan painanteen puolelle.
   */
  const meri = meriMaski(kansio, korkeus, { laajennus: 1 });
  return {
    korkeus,
    meri,
    rannikot: rannikot(kansio, { laatikko }),
    jarvet: jarvet(kansio),
  };
}
