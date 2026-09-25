/*
 * MAAMASKI: ONKO PISTE MAALLA VAI MERELLÄ (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 17 a: *"lukittu ankkuri ei saa olla meressä"*).
 * ══════════════════════════════════════════════════════════════════
 *
 * MIKSI TÄMÄ ON OLEMASSA. Nostojen lukitut kartta-ankkurit
 * (js/packs/nostoankkurit-<iso>.js) syntyvät levityksestä, joka
 * työntää merkkejä vapaasti erilleen — *"oikea maantieteellinen paikka
 * ei ole vaatimus, selkeys on"* (PAATOKSET 32 kohta 2). Levitys ei
 * kuitenkaan tiedä rannasta mitään, joten se saattoi työntää merkin
 * merelle: v1941:ssä *Camarguen hevoset* -nimiö oli Välimeren päällä.
 * Omistajan sääntö on, että ankkuri on maalla.
 *
 * MISTÄ MAA TULEE. `ne50.geojson` on Natural Earth 1:50M -aineisto.
 * SE EI OLE SAMA KUIN PIIRRON LÄHDE (korjattu 20.9.2026, mittaus
 * docs/raportit/viesti-fable-maalehti-viivat-20260920.md): pelin
 * rantaviiva piirtyy `ne_10m_ocean`ista (js/pallovektorit.js,
 * tools/tee-pallovektorit.mjs) ja maan ääriviivat
 * `ne_10m_admin_0_countries`ista (js/maanaariviivat.js,
 * assets/data/maapolygonit.json). Tämä mittari on siis KARKEAMPI kuin
 * se ranta, jonka pelaaja näkee, ja sitä käytetään vain ankkurin
 * maalla-olon tarkistukseen — siksi VARA_ASTETTA alla.
 *
 * MITÄ TÄMÄ EI OLE: tarkka rantakartta. 1:50M yleistää rannan, joten
 * aivan rantaviivan päällä oleva piste voi mennä kumpaan tahansa.
 * Siksi siirto (`lahinMaapiste`) ei jätä pistettä rajalle vaan työntää
 * sen VARA_ASTETTA sisämaahan päin.
 */
import { readFileSync } from 'node:fs';

const JUURI = new URL('..', import.meta.url).pathname;

/** Kuinka syvälle maalle siirretty ankkuri työnnetään (astetta). */
export const MAALLE_VARA_ASTETTA = 0.05;

const rengasSisaltaa = (lng, lat, rengas) => {
  let sisalla = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > lat) !== (yj > lat)
      && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) sisalla = !sisalla;
  }
  return sisalla;
};

/** Yhden polygonin renkaat: [ulkoreuna, ...reiät]. */
const polygonSisaltaa = (lng, lat, polygoni) => {
  if (!polygoni.length || !rengasSisaltaa(lng, lat, polygoni[0])) return false;
  for (let i = 1; i < polygoni.length; i += 1) {
    if (rengasSisaltaa(lng, lat, polygoni[i])) return false; // reikä = järvi
  }
  return true;
};

let polygonit = null;
/** Kaikki maapolygonit laatikoineen; luetaan kerran. */
function maaPolygonit() {
  if (polygonit) return polygonit;
  const data = JSON.parse(readFileSync(new URL('ne50.geojson', `file://${JUURI}`), 'utf8'));
  polygonit = [];
  for (const piirre of data.features ?? []) {
    const g = piirre.geometry;
    if (!g) continue;
    const osat = g.type === 'Polygon' ? [g.coordinates]
      : (g.type === 'MultiPolygon' ? g.coordinates : []);
    for (const osa of osat) {
      const ulko = osa[0] ?? [];
      if (ulko.length < 4) continue;
      let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
      for (const [x, y] of ulko) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
      polygonit.push({ osa, x0, y0, x1, y1 });
    }
  }
  return polygonit;
}

/** Onko lat/lng maalla (ei merellä, ei järvessä)? */
export function onMaalla(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  for (const p of maaPolygonit()) {
    if (lng < p.x0 || lng > p.x1 || lat < p.y0 || lat > p.y1) continue;
    if (polygonSisaltaa(lng, lat, p.osa)) return true;
  }
  return false;
}

const etaisyys2 = (aLat, aLng, bLat, bLng) => {
  const dLat = aLat - bLat;
  const dLng = (aLng - bLng) * Math.cos((aLat * Math.PI) / 180);
  return dLat * dLat + dLng * dLng;
};

/**
 * LÄHIN MAAPISTE annetulle merellä olevalle pisteelle.
 *
 * Haku on kaksivaiheinen, koska aineiston kärkipisteet ovat rannalla
 * eikä rannalla oleva piste kelpaa (ks. yllä): ensin etsitään lähin
 * rannan kärkipiste, sitten siitä työnnetään sisämaahan päin
 * MAALLE_VARA_ASTETTA kerrallaan, kunnes `onMaalla` sanoo maata.
 * Sisämaan suunta arvioidaan kärkipisteen naapureista: rannan
 * normaali, jonka kumpi puoli on maata, ratkaistaan kokeilemalla.
 *
 * @returns {?{lat:number, lng:number, siirtoKm:number}}
 */
export function lahinMaapiste(lat, lng, { sade = 3 } = {}) {
  if (onMaalla(lat, lng)) return { lat, lng, siirtoKm: 0 };
  /*
   * HAKU ON RENGAS ALKUPERÄISEN PISTEEN YMPÄRILLÄ, EI RANNAN
   * KÄRKIPISTE. Ensimmäinen yritys haki lähimmän polygonin
   * kärkipisteen ja työnsi siitä "sisämaahan päin" — mutta suunta on
   * arvaus, ja Bonifaciossa (Korsikan eteläkärki) se osoitti merelle,
   * jolloin maapistettä ei löytynyt lainkaan. Rengashaku ei arvaa
   * suuntaa: se kokeilee kaikkia ja ottaa lähimmän osuman, joten
   * tulos on aina TODELLA maalla ja aina lähin sellainen.
   */
  for (let r = MAALLE_VARA_ASTETTA; r <= sade; r += MAALLE_VARA_ASTETTA) {
    const askelia = Math.max(16, Math.round((2 * Math.PI * r) / MAALLE_VARA_ASTETTA));
    let paras = null;
    for (let i = 0; i < askelia; i += 1) {
      const kulma = (2 * Math.PI * i) / askelia;
      const ehdokas = {
        lat: lat + r * Math.sin(kulma),
        lng: lng + (r * Math.cos(kulma)) / Math.max(0.2, Math.cos((lat * Math.PI) / 180)),
      };
      if (!onMaalla(ehdokas.lat, ehdokas.lng)) continue;
      const d = etaisyys2(lat, lng, ehdokas.lat, ehdokas.lng);
      if (!paras || d < paras.d) paras = { d, ...ehdokas };
    }
    if (paras) {
      return {
        lat: Number(paras.lat.toFixed(6)),
        lng: Number(paras.lng.toFixed(6)),
        siirtoKm: Math.round(Math.sqrt(paras.d) * 111),
      };
    }
  }
  return null;
}
