#!/usr/bin/env node
/*
 * SATELLIITTIPINTA NATIIVIN LENTOTILAAN (Karttaseppä 24.9.2026, omistajan
 * tilauskortti Fablen kautta). Kaksi kerrosta samaan sarjaan:
 *
 *   bmng  NASA Blue Marble Next Generation (public domain, 500 m,
 *         kuukausimosaiikki) → Web Mercator Z0–Z7 koko maailma.
 *   s2    Sentinel-2 cloudless 2016 (EOX, CC BY 4.0) → Z8–Z11 vain
 *         pelin kaupunkien ympärillä (72 kaupunkia, säde 60 km).
 *
 * Ämpärin polut (Natiivisepän rajapinta 24.9.2026, versio = polttopäivä):
 *   julisteet/pallo/satelliitti/<versio>/bmng/{z}/{x}/{y}.jpg   Z0–Z7
 *   julisteet/pallo/satelliitti/<versio>/s2/{z}/{x}/{y}.jpg     Z8–Z11
 * XYZ (y alaspäin, OSM-järjestys), 256 px, jpg, kummassakin alikansiossa
 * oma laatat.json (ks. bmngLuettelo, s2Luettelo).
 *
 * KOMENNOT
 *   node tools/tee-satelliitti.mjs kaupungit --paketti <kaupungit.json> [--ulos tools/satelliitti-kaupungit.json]
 *   node tools/tee-satelliitti.mjs arvio [--kaupungit <json>] [--sade 60]
 *   node tools/tee-satelliitti.mjs bmng --lahde <kansio> --ulos <kansio>/bmng
 *        [--kuukausi 200408] [--muunnelma topo.bathy|topo] [--osat C1,B1]
 *        [--min 2] [--max 7] [--alue lon0,lat0,lon1,lat1] [--laatu 85] [--varit <json>]
 *   node tools/tee-satelliitti.mjs bmng-yla --ulos <kansio>/bmng        (Z1–Z0 Z2:sta)
 *   node tools/tee-satelliitti.mjs bmng-luettelo --ulos <kansio>/bmng --versio <pvm> [--kuukausi] [--muunnelma]
 *   node tools/tee-satelliitti.mjs s2 --ulos <kansio>/s2 [--raaka <kansio>] [--kaupungit <json>]
 *        [--vain pariisi,lontoo] [--min 8] [--max 11] [--sade 60]
 *        [--rinnakkain 2] [--vali 250] [--varit <json>] [--laatu 85] [--vuosi 2016]
 *   node tools/tee-satelliitti.mjs s2-luettelo --ulos <kansio>/s2 --versio <pvm> [--kaupungit] [--sade] [--varit] [--vuosi 2016] [--haettu pvm]
 *   node tools/tee-satelliitti.mjs tarkista --ulos <kansio>   (bmng/ ja s2/ luettelon mukaan)
 *   node tools/tee-satelliitti.mjs vertaa --bmng <kansio> --s2 <kansio> --kaupunki pariisi --ulos <kuva.png> [--json <sovitus.json>]
 *   node tools/tee-satelliitti.mjs varit --ulos <varit.json> <sovitus.json> …   (yhteinen käyrä, mediaani)
 *
 * Puhtaat osat (projektiomatematiikka, laattalistat, kaupunkien
 * laatikot, värisovitus) ovat vietyjä funktioita, joita
 * tests/satelliittisarja.test.mjs testaa ilman verkkoa ja ilman kuvia.
 * Kuvankäsittely on sharp-kirjastolla.
 */
import {
  readFileSync, writeFileSync, mkdirSync, existsSync, renameSync, statSync, readdirSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);
const RAD = Math.PI / 180;

/** Laatan koko pikseleinä (slippy map -vakio, sama kuin pallon muissa sarjoissa). */
export const LAATTA = 256;
/** JPEG-laatu (tilaus: noin 85). */
export const LAATU = 85;
/** Web Mercatorin leveysasteraja: atan(sinh(π)). */
export const MERC_RAJA = Math.atan(Math.sinh(Math.PI)) / RAD;
/** Maan keskisäde (km, IUGG), jolla kaupungin säde muunnetaan asteiksi. */
export const MAAN_SADE_KM = 6371.0088;
/** Kaupunkikerroksen oletussäde (tilaus: noin 60 km). */
export const SADE_KM = 60;
export const KAUPUNGIT_OLETUS = join(dirname(TAMA), 'satelliitti-kaupungit.json');

/*
 * LÄHTEET JA LISENSSIT (tarkistettu 24.9.2026, raportti
 * docs/raportit/satelliitti-lennon-pinta-20260924.md).
 *
 * BMNG: NASA Earth Observatory / Reto Stöckli, public domain.
 * Kuukauden kuva on kahdeksana 21600 × 21600 -osana (A–D = 90°:n
 * pituusastekaistat lännestä itään alkaen 180° W, 1 = pohjoinen
 * puolipallo, 2 = eteläinen), 240 px/aste eli ~463 m päiväntasaajalla.
 *
 * EOX: WMTS-taso s2cloudless_3857 on EOX:n oman palvelun kuvauksen
 * mukaan "Sentinel-2 cloudless layer for 2016" ja "released under
 * Creative Commons Attribution 4.0" (WMTSCapabilities.xml). Vuodet
 * 2018+ (s2cloudless-2018_3857 …) ovat CC BY-NC-SA 4.0 — EI KOSKAAN
 * niitä. Ruudukko on GoogleMapsCompatible, 256 px, rivi ylhäältä,
 * joten laatta on sellaisenaan meidän {z}/{x}/{y}.
 */
export const BMNG_OSOITE = 'https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng';
export const BMNG_KANSIO = { 'topo.bathy': 'bmng-topography-bathymetry', topo: 'bmng-topography' };
export const KUUKAUDET = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december'];
export const BMNG_OSAT = ['A1', 'B1', 'C1', 'D1', 'A2', 'B2', 'C2', 'D2'];
export const BMNG_OSAN_SIVU = 21600;

/*
 * CC BY 4.0 -VUODET. EOX:n WMTSCapabilities.xml (luettu 24.9.2026)
 * ilmoittaa CC BY 4.0:n vain tasoille s2cloudless_3857 (2016) ja
 * s2cloudless-2017_3857 (2017); 2018–2025 ovat CC BY-NC-SA 4.0.
 * Tilaus on 2016; 2017 on tässä vain omistajan päätöksen varalle
 * (raportti: 2017 on Pariisissa selvästi siistimpi). HUOM: EOX:n
 * lisenssisivu (cloudless.eox.at/license-non-commercial, 24.9.2026) ei
 * mainitse 2017:ää lainkaan, joten sen lisenssi on epäselvä — käytä vain
 * EOX:n kirjallisella vahvistuksella. Muita vuosia ei voi valita.
 */
export const EOX_CC_BY = { 2016: 's2cloudless_3857', 2017: 's2cloudless-2017_3857' };
/*
 * Datavuodet EOX:n virallisessa attribuutiossa. EOX:n lisenssisivu
 * (cloudless.eox.at/license-non-commercial, luettu 24.9.2026) antaa
 * 2016-tasolle muodon "Contains modified Copernicus Sentinel data
 * 2016 & 2017" — eteläisen pallonpuoliskon ja tropiikin kuvat ovat
 * vuoden 2017 alusta (EOX:n blogi 18.8.2017). WMTS-kuvauksessa lukee
 * pelkkä 2016; lisenssisivu on sitova.
 */
export const EOX_DATAVUODET = { 2016: '2016 & 2017', 2017: '2017' };
export function eoxTaso(vuosi = 2016) {
  const taso = EOX_CC_BY[vuosi];
  if (!taso) throw new Error(`EOX-vuosi ${vuosi} ei ole CC BY 4.0 (sallitut: ${Object.keys(EOX_CC_BY).join(', ')}); 2018+ on CC BY-NC-SA`);
  return {
    vuosi: Number(vuosi),
    taso,
    osoite: `https://tiles.maps.eox.at/wmts/1.0.0/${taso}/default/g/{z}/{y}/{x}.jpg`,
    attribuutio: `Contains modified Copernicus Sentinel data ${vuosi}, EOX IT Services`,
    attribuutioEox: `EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data ${EOX_DATAVUODET[vuosi]})`,
  };
}
export const EOX_TASO = eoxTaso(2016).taso;
export const EOX_OSOITE = eoxTaso(2016).osoite;
export const EOX_ATTRIBUUTIO = eoxTaso(2016).attribuutio;
export const EOX_ATTRIBUUTIO_EOX = eoxTaso(2016).attribuutioEox;
/*
 * KOHTELIAS NOUTO. EOX:n ilmainen palvelu rajoittaa kuormaa ("we had to
 * start applying rate limiting", maps.eox.at) ja ohjaa rajoitetun
 * pyynnön Heavy load -sivulle. Siksi: kaksi rinnakkaista pyyntöä,
 * vähintään 250 ms kahden pyynnön aloituksen välillä (≤ 4/s), projektin
 * tunnistava User-Agent, jokainen laatta noudetaan kerran raakavälimuistiin
 * (jatko ohittaa noudetut), ja rajoitus (429, 503 tai uudelleenohjaus)
 * pysäyttää ajon hetkeksi ja toistuessaan kokonaan.
 */
export const EOX_UA = 'Matkakirja-satelliitti/1.0 (+https://matkakirja.app; offline tiles for a Finnish educational game)';
export const NOUTOVALI_MS = 250;
export const RINNAKKAIN = 2;

// ---------------------------------------------------------------- matematiikka

/** Web Mercator: lon/lat → maailman pikseli tasolla Z (256·2^Z px leveä). */
export function maailmanPikseli(lon, lat, Z) {
  const n = LAATTA * 2 ** Z;
  const s = Math.sin(Math.max(-MERC_RAJA, Math.min(MERC_RAJA, lat)) * RAD);
  return [((lon + 180) / 360) * n, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n];
}

/** Maailman pikselirivin YLÄREUNAN (py kokonaisluku tai murto) leveysaste tasolla Z. */
export function pikselinLeveysaste(py, Z) {
  const n = LAATTA * 2 ** Z;
  return Math.atan(Math.sinh(Math.PI * (1 - (2 * py) / n))) / RAD;
}

/** Laatan (Z, X, Y) reunat asteina: { lansi, ita, pohjoinen, etela } (sama kuin tee-pallolaatat). */
export function laatanReunat(Z, X, Y) {
  const n = 2 ** Z;
  const lat = (y) => Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) / RAD;
  return {
    lansi: (X / n) * 360 - 180, ita: ((X + 1) / n) * 360 - 180, pohjoinen: lat(Y), etela: lat(Y + 1),
  };
}

/** BMNG-osan (esim. 'C1') rajat asteina: { lon0, lon1, lat0 (etelä), lat1 (pohjoinen) }. */
export function osanRajat(osa) {
  const m = /^([A-D])([12])$/.exec(osa);
  if (!m) throw new Error(`BMNG-osa A1…D2: ${osa}`);
  const lon0 = -180 + 90 * 'ABCD'.indexOf(m[1]);
  return m[2] === '1' ? { lon0, lon1: lon0 + 90, lat0: 0, lat1: 90 } : { lon0, lon1: lon0 + 90, lat0: -90, lat1: 0 };
}

/** BMNG-tiedoston nimi ja osoite. kuukausi '200408' → elokuu. */
export function bmngTiedosto(kuukausi, muunnelma, osa) {
  const etu = muunnelma === 'topo' ? 'world.topo' : 'world.topo.bathy';
  const nimi = `${etu}.${kuukausi}.3x21600x21600.${osa}.jpg`;
  const kk = KUUKAUDET[Number(kuukausi.slice(4, 6)) - 1];
  return { nimi, osoite: `${BMNG_OSOITE}/${BMNG_KANSIO[muunnelma]}/${kk}/${nimi}` };
}

/*
 * PYSTYSUUNNAN UUDELLEENNÄYTTEISTYS. Vaakasuunta on lineaarinen
 * (pituusaste = x), joten sharp skaalaa osan leveyden suoraan tason
 * leveydeksi. Pystysuunnassa Mercator-rivi kattaa lähteestä sitä
 * enemmän rivejä, mitä lähempänä päiväntasaajaa ollaan (Z7:ssä 2,6
 * lähderiviä päiväntasaajalla, 1,3 60°:ssa, alle yhden 70°:n yli).
 * rivinPainot antaa Mercator-rivin värin lähderivien painotettuna
 * keskiarvona: rivi kattaa lähteen jatkuvan välin [alku, loppu)
 * (lähderivin yksiköissä); jos väli on vähintään rivin pituinen,
 * paino on kunkin lähderivin peittämä osuus (pinta-alakeskiarvo), ja
 * lyhyemmällä välillä lineaarinen interpolointi välin keskeltä
 * (suurennus, ei portaita). Painot summautuvat yhteen.
 */
export function rivinPainot(alku, loppu, korkeus) {
  const pituus = loppu - alku;
  if (pituus >= 1) {
    const ulos = [];
    for (let r = Math.floor(alku); r < Math.ceil(loppu); r += 1) {
      const w = Math.min(loppu, r + 1) - Math.max(alku, r);
      if (w > 0) ulos.push([Math.max(0, Math.min(korkeus - 1, r)), w / pituus]);
    }
    return ulos;
  }
  const k = (alku + loppu) / 2 - 0.5;
  const r0 = Math.floor(k);
  const t = k - r0;
  const a = Math.max(0, Math.min(korkeus - 1, r0));
  const b = Math.max(0, Math.min(korkeus - 1, r0 + 1));
  return t === 0 || a === b ? [[a, 1]] : [[a, 1 - t], [b, t]];
}

/**
 * Osan pystysuuntainen kartoitus tasolle Z: Mercator-pikselirivit
 * [py0, py1) (maailman riveinä), joita osa kattaa, ja jokaisen rivin
 * lähdevälin [alku, loppu) osan riveinä. Osa 1 kattaa rivit napa-
 * rajalta päiväntasaajalle, osa 2 päiväntasaajalta alas; yli ±85,05°
 * jäävä lähde ei päädy mihinkään riviin (Mercatorin raja).
 */
export function osanRivit(osa, Z, korkeus = BMNG_OSAN_SIVU) {
  const { lat1 } = osanRajat(osa);
  const n = LAATTA * 2 ** Z;
  const pohjoinen = lat1 === 90;
  const py0 = pohjoinen ? 0 : n / 2;
  const py1 = pohjoinen ? n / 2 : n;
  const aste = korkeus / 90;
  const rivit = [];
  for (let py = py0; py < py1; py += 1) {
    const yla = pikselinLeveysaste(py, Z);
    const ala = pikselinLeveysaste(py + 1, Z);
    rivit.push([(lat1 - yla) * aste, (lat1 - ala) * aste]);
  }
  return { py0, py1, rivit };
}

// ---------------------------------------------------------------- kaupungit ja laattalistat

/**
 * Kaupungin rajauslaatikko [lon0, lat0, lon1, lat1] säteellä sadeKm:
 * leveyssuunnassa sade/R radiaaneina, pituussuunnassa sama jaettuna
 * cos(lat):lla (ympyrän ympäri piirretty laatikko). Pyöristys 4
 * desimaaliin (~10 m) — natiivi lukee luettelon luvut sellaisinaan,
 * joten sääntö lasketaan AINA näistä pyöristetyistä luvuista.
 */
export function kaupunginLaatikko(lon, lat, sadeKm = SADE_KM) {
  const dLat = (sadeKm / MAAN_SADE_KM) / RAD;
  const dLon = dLat / Math.cos(lat * RAD);
  const p = (v) => Math.round(v * 1e4) / 1e4;
  return [p(Math.max(-180, lon - dLon)), p(Math.max(-MERC_RAJA, lat - dLat)),
    p(Math.min(180, lon + dLon)), p(Math.min(MERC_RAJA, lat + dLat))];
}

/**
 * KATTAVUUSSÄÄNTÖ (natiivin laattapalvelin lukee tämän luettelosta):
 * s2-laatta (Z, X, Y), 8 ≤ Z ≤ 11, on olemassa TÄSMÄLLEEN silloin, kun
 * sen suorakulmio (laatanReunat) leikkaa positiivisella pinta-alalla
 * vähintään yhden kaupungin laatikon bbox = [lon0, lat0, lon1, lat1]:
 *   lansi < lon1 && ita > lon0 && etela < lat1 && pohjoinen > lat0.
 * Pelkkä reunan kosketus ei riitä. Koska vanhempi laatta sisältää
 * lapsensa, jokaisen olemassa olevan Z9–Z11-laatan Z8-esivanhempi on
 * laatat8-listassa; lista on sama sääntö valmiiksi laskettuna.
 */
export function leikkaa(reunat, bbox) {
  return reunat.lansi < bbox[2] && reunat.ita > bbox[0] && reunat.etela < bbox[3] && reunat.pohjoinen > bbox[1];
}

export const S2_SAANTO = 'Laatta (z, x, y), 8 <= z <= 11, on olemassa tasmalleen silloin, kun sen Web Mercator '
  + '-suorakulmio (lansi = x/2^z*360-180, ita = (x+1)/2^z*360-180, pohjoinen = atan(sinh(pi*(1-2*y/2^z))) asteina, '
  + 'etela = sama y+1:lla) leikkaa positiivisella pinta-alalla vahintaan yhden kaupungit[].bbox = [lon0, lat0, lon1, lat1] '
  + ':n: lansi < lon1 ja ita > lon0 ja etela < lat1 ja pohjoinen > lat0 (pelkka reunan kosketus ei riita). '
  + 'laatat8 on taman saannon z8-laatat valmiiksi laskettuina; z9-z11-laatan z8-esivanhempi on aina laatat8:ssa. '
  + 'Muut laatat: lapinakyva, ei verkkoa.';

/** Laatikon laatat tasolla Z: [[X, Y], …] sääntö `leikkaa` mukaan. */
export function laatikonLaatat(bbox, Z) {
  const [x0f, y1f] = maailmanPikseli(bbox[0], bbox[1], Z);
  const [x1f, y0f] = maailmanPikseli(bbox[2], bbox[3], Z);
  const n = 2 ** Z;
  const ulos = [];
  // Ehdokkaat yhden laatan varalla molemmin puolin; tarkka päätös leikkaa-säännöllä.
  for (let Y = Math.max(0, Math.floor(y0f / LAATTA) - 1); Y <= Math.min(n - 1, Math.floor(y1f / LAATTA) + 1); Y += 1) {
    for (let X = Math.max(0, Math.floor(x0f / LAATTA) - 1); X <= Math.min(n - 1, Math.floor(x1f / LAATTA) + 1); X += 1) {
      if (leikkaa(laatanReunat(Z, X, Y), bbox)) ulos.push([X, Y]);
    }
  }
  return ulos;
}

/** Kaupunkien laatat tasoittain ilman päällekkäisyyksiä: Map Z → [[X, Y], …] lajiteltuna. */
export function kaupunkienLaatat(kaupungit, min = 8, max = 11) {
  const tasot = new Map();
  for (let Z = min; Z <= max; Z += 1) {
    const joukko = new Map();
    for (const k of kaupungit) for (const [X, Y] of laatikonLaatat(k.bbox, Z)) joukko.set(`${X}/${Y}`, [X, Y]);
    tasot.set(Z, [...joukko.values()].sort((a, b) => a[0] - b[0] || a[1] - b[1]));
  }
  return tasot;
}

/** Onko laatta olemassa kattavuussäännön mukaan (natiivin vertailutoteutus). */
export function onS2Laatta(Z, X, Y, kaupungit) {
  if (Z < 8 || Z > 11) return false;
  const r = laatanReunat(Z, X, Y);
  return kaupungit.some((k) => leikkaa(r, k.bbox));
}

/** Kaupunkiluettelon rivit laatikkoineen luetteloon. */
export function kaupungitLaatikoin(lista, sadeKm = SADE_KM) {
  return lista.map((k) => ({
    id: k.id, nimi: k.nimi, lon: k.lon, lat: k.lat, sade_km: sadeKm, bbox: kaupunginLaatikko(k.lon, k.lat, sadeKm),
  }));
}

/** Koko maailman laattamäärä tasoilla min…max (Z0–Z7 = 21 845). */
export const maailmanLaatat = (min, max) => {
  let s = 0;
  for (let Z = min; Z <= max; Z += 1) s += 4 ** Z;
  return s;
};

/** BMNG-tason Z laatat, jotka osuvat alueeseen (tai kaikki). */
export function tasonLaatat(Z, alue = null) {
  const n = 2 ** Z;
  const ulos = [];
  for (let Y = 0; Y < n; Y += 1) {
    for (let X = 0; X < n; X += 1) {
      if (alue && !leikkaa(laatanReunat(Z, X, Y), alue)) continue;
      ulos.push([X, Y]);
    }
  }
  return ulos;
}

// ---------------------------------------------------------------- värisovitus

/*
 * VÄRISOVITUS (Z7 → Z8 -saumaan). Kanavakohtainen käyrä
 *   ulos = 255 · a · (sisään / 255)^g
 * sovitetaan kahden saman alueen kuvan KVANTIILIEN välille
 * (p5, p10, …, p95): log(ulos/255) = log a + g · log(sisään/255)
 * pienimmän neliösumman suoralla. Kvantiilit eivät vaadi pikselitason
 * kohdistusta (BMNG 500 m vs. Sentinel 10 m), ja potenssikäyrä pitää
 * mustan mustana ja sävyjärjestyksen ennallaan.
 */
export const GAMMA_RAJAT = [0.7, 1.4];

/** Vesipikseli (meri, järvi): sininen selvästi punaista suurempi eikä vihreää pienempi. */
export const onVesi = (r, g, b) => b > r + 15 && b >= g;

/**
 * Kaupunkikohtaisista sovituksista yksi yhteinen käyrä: kanavittain
 * a:n ja g:n mediaani. Yhteinen käyrä (ei kaupunkikohtainen) pitää
 * naapurikaupunkien laatat samansävyisinä ja sauman ennustettavana.
 */
export function yhdistaSovitukset(sovitukset) {
  const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  return [0, 1, 2].map((c) => ({
    a: Math.round(med(sovitukset.map((s) => s[c].a)) * 1e4) / 1e4,
    g: Math.round(med(sovitukset.map((s) => s[c].g)) * 1e4) / 1e4,
  }));
}

export function kvantiilit(arvot, pisteet = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95]) {
  const h = new Array(256).fill(0);
  for (const v of arvot) h[v] += 1;
  const n = arvot.length;
  return pisteet.map((p) => {
    const raja = (p / 100) * n;
    let s = 0;
    for (let v = 0; v < 256; v += 1) { s += h[v]; if (s >= raja) return v; }
    return 255;
  });
}

export function sovitaKayra(lahdeQ, kohdeQ) {
  const xs = []; const ys = [];
  for (let i = 0; i < lahdeQ.length; i += 1) {
    if (lahdeQ[i] < 2 || kohdeQ[i] < 2) continue;
    xs.push(Math.log(lahdeQ[i] / 255)); ys.push(Math.log(kohdeQ[i] / 255));
  }
  if (xs.length < 2) return { a: 1, g: 1 };
  const mx = xs.reduce((s, v) => s + v, 0) / xs.length;
  const my = ys.reduce((s, v) => s + v, 0) / ys.length;
  let sxy = 0; let sxx = 0;
  for (let i = 0; i < xs.length; i += 1) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  // Jyrkkyys rajataan (GAMMA_RAJAT): kapea kvantiilijakauma antaa muuten
  // villin käyrän (mitattu Roomasta 24.9.2026, sininen g 2,7 → violetti maa).
  const g = Math.max(GAMMA_RAJAT[0], Math.min(GAMMA_RAJAT[1], sxx > 0 ? sxy / sxx : 1));
  return { a: Math.exp(my - g * mx), g };
}

/** Käyrän hakutaulu 0…255. */
export function kayranTaulu({ a, g }) {
  const t = new Uint8Array(256);
  for (let v = 0; v < 256; v += 1) t[v] = Math.max(0, Math.min(255, Math.round(255 * a * (v / 255) ** g)));
  return t;
}

/** Värisovitustiedosto { kanavat: [{a,g},{a,g},{a,g}], kuvaus } → kolme hakutaulua (tai null). */
export function lueVarit(polku) {
  if (!polku) return null;
  const v = JSON.parse(readFileSync(polku, 'utf8'));
  return { tiedot: v, taulut: v.kanavat.map(kayranTaulu) };
}

// ---------------------------------------------------------------- apurit

function argumentit(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const s = argv[i];
    if (s.startsWith('--')) {
      const nimi = s.slice(2);
      const seur = argv[i + 1];
      if (seur === undefined || seur.startsWith('--')) a[nimi] = true;
      else { a[nimi] = seur; i += 1; }
    } else a._.push(s);
  }
  return a;
}

const lueAlue = (t) => (t ? t.split(',').map(Number) : null);

function kirjoitaAtomisesti(polku, data) {
  mkdirSync(dirname(polku), { recursive: true });
  const tmp = `${polku}.tmp`;
  writeFileSync(tmp, data);
  renameSync(tmp, polku);
}

async function lataaSharp() {
  const { default: sharp } = await import('sharp');
  sharp.concurrency(2);
  sharp.cache(false);
  return sharp;
}

function lueKaupungit(polku, vain) {
  const k = JSON.parse(readFileSync(polku ?? KAUPUNGIT_OLETUS, 'utf8')).kaupungit;
  if (!vain) return k;
  const ids = new Set(String(vain).split(','));
  const ulos = k.filter((c) => ids.has(c.id));
  if (ulos.length !== ids.size) throw new Error(`--vain: tuntematon kaupunki (${vain})`);
  return ulos;
}

const sov = (Z, X, Y) => `${Z}/${X}/${Y}.jpg`;

// ---------------------------------------------------------------- bmng

/*
 * YKSI OSA KERRALLAAN. Tasoilla Z ≥ 2 jokainen laatta on kokonaan yhden
 * osan sisällä (laatan reunat ovat 90°:n ja päiväntasaajan kohdalla),
 * joten osa käsitellään omana kaistanaan: (1) sharp purkaa osan ja
 * skaalaa VAIN leveyden Z7:n leveydeksi (32 laattaa = 8192 px,
 * lanczos3), (2) rivinPainot kokoaa Mercator-kaistan (8192 × 16384),
 * (3) Z7-laatat leikataan kaistasta, (4) kaista puolitetaan 2 × 2
 * -keskiarvolla tasoille 6…2. Z1 ja Z0 kootaan lopuksi Z2-laatoista
 * (bmng-yla), kun kaikki kahdeksan osaa on tehty.
 */
async function teeOsa(sharp, polku, osa, { min, max, alue, ulos, laatu, varit }) {
  const t0 = Date.now();
  const { lon0 } = osanRajat(osa);
  const leveysZ = (Z) => (LAATTA * 2 ** Z) / 4; // osan leveys tasolla Z
  const W = leveysZ(max);
  const { data, info } = await sharp(polku, { limitInputPixels: false })
    .resize(W, BMNG_OSAN_SIVU, { fit: 'fill', kernel: 'lanczos3' })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== W || info.channels !== 3) throw new Error(`${osa}: odottamaton koko ${info.width}×${info.height}×${info.channels}`);
  const { py0, rivit } = osanRivit(osa, max, info.height);
  const H = rivit.length;
  let kaista = Buffer.alloc(W * H * 3);
  const rivi = new Float64Array(W * 3);
  for (let y = 0; y < H; y += 1) {
    rivi.fill(0);
    for (const [r, w] of rivinPainot(rivit[y][0], rivit[y][1], info.height)) {
      const o = r * W * 3;
      for (let i = 0; i < W * 3; i += 1) rivi[i] += data[o + i] * w;
    }
    const o = y * W * 3;
    for (let i = 0; i < W * 3; i += 1) kaista[o + i] = Math.round(rivi[i]);
  }
  const t1 = Date.now();
  let laattoja = 0;
  let kaistaW = W; let kaistaH = H; let kaistaPy0 = py0;
  for (let Z = max; Z >= Math.max(2, min); Z -= 1) {
    const X0 = ((lon0 + 180) / 360) * 2 ** Z;
    const Y0 = kaistaPy0 / LAATTA;
    for (let ty = 0; ty < kaistaH / LAATTA; ty += 1) {
      for (let tx = 0; tx < kaistaW / LAATTA; tx += 1) {
        const X = X0 + tx; const Y = Y0 + ty;
        if (alue && !leikkaa(laatanReunat(Z, X, Y), alue)) continue;
        const rgb = Buffer.alloc(LAATTA * LAATTA * 3);
        for (let r = 0; r < LAATTA; r += 1) {
          const lahde = ((ty * LAATTA + r) * kaistaW + tx * LAATTA) * 3;
          kaista.copy(rgb, r * LAATTA * 3, lahde, lahde + LAATTA * 3);
        }
        if (varit) for (let i = 0; i < rgb.length; i += 1) rgb[i] = varit.taulut[i % 3][rgb[i]];
        const jpg = await sharp(rgb, { raw: { width: LAATTA, height: LAATTA, channels: 3 } }) // eslint-disable-line no-await-in-loop
          .jpeg({ quality: laatu, mozjpeg: true }).toBuffer();
        kirjoitaAtomisesti(join(ulos, sov(Z, X, Y)), jpg);
        laattoja += 1;
      }
    }
    if (Z > 2 && Z > min) {
      // Puolitus 2 × 2 -keskiarvolla seuraavalle tasolle.
      const w2 = kaistaW / 2; const h2 = kaistaH / 2;
      const pieni = Buffer.alloc(w2 * h2 * 3);
      for (let y = 0; y < h2; y += 1) {
        for (let x = 0; x < w2; x += 1) {
          for (let c = 0; c < 3; c += 1) {
            const a = ((2 * y) * kaistaW + 2 * x) * 3 + c;
            const b = a + kaistaW * 3;
            pieni[(y * w2 + x) * 3 + c] = (kaista[a] + kaista[a + 3] + kaista[b] + kaista[b + 3] + 2) >> 2;
          }
        }
      }
      kaista = pieni; kaistaW = w2; kaistaH = h2; kaistaPy0 /= 2;
    }
  }
  console.log(`${osa}: ${laattoja} laattaa, uudelleennäytteistys ${((t1 - t0) / 1000).toFixed(1)} s, laatat ${((Date.now() - t1) / 1000).toFixed(1)} s`);
  return laattoja;
}

async function bmng(a) {
  const sharp = await lataaSharp();
  const kuukausi = a.kuukausi ?? '200408';
  const muunnelma = a.muunnelma ?? 'topo.bathy';
  const min = Number(a.min ?? 2); const max = Number(a.max ?? 7);
  if (min < 2) throw new Error('bmng: --min vähintään 2 (Z1–Z0 kootaan bmng-yla-komennolla)');
  const alue = lueAlue(a.alue);
  const varit = lueVarit(a.varit);
  const osat = a.osat ? String(a.osat).split(',') : BMNG_OSAT;
  let yht = 0;
  for (const osa of osat) {
    const r = osanRajat(osa);
    if (alue && !(r.lon0 < alue[2] && r.lon1 > alue[0] && r.lat0 < alue[3] && r.lat1 > alue[1])) continue;
    const polku = join(a.lahde, bmngTiedosto(kuukausi, muunnelma, osa).nimi);
    if (!existsSync(polku)) throw new Error(`puuttuu ${polku} — lataa aja-bmng.sh:n lataa-vaiheella`);
    yht += await teeOsa(sharp, polku, osa, { // eslint-disable-line no-await-in-loop
      min, max, alue, ulos: a.ulos, laatu: Number(a.laatu ?? LAATU), varit,
    });
  }
  console.log(`bmng: ${yht} laattaa kansioon ${a.ulos}`);
}

/** Z1 ja Z0 neljästä lapsesta (2 × 2 -keskiarvo, sharp). */
async function bmngYla(a) {
  const sharp = await lataaSharp();
  for (const Z of [1, 0]) {
    for (let Y = 0; Y < 2 ** Z; Y += 1) {
      for (let X = 0; X < 2 ** Z; X += 1) {
        const lapset = [];
        for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
          const p = join(a.ulos, sov(Z + 1, 2 * X + dx, 2 * Y + dy));
          if (!existsSync(p)) throw new Error(`puuttuu ${p}`);
          lapset.push({ input: p, left: dx * LAATTA, top: dy * LAATTA });
        }
        const iso = await sharp({ create: { width: 512, height: 512, channels: 3, background: '#000' } }) // eslint-disable-line no-await-in-loop
          .composite(lapset).raw().toBuffer();
        const jpg = await sharp(iso, { raw: { width: 512, height: 512, channels: 3 } }) // eslint-disable-line no-await-in-loop
          .resize(LAATTA, LAATTA, { kernel: 'cubic' }).jpeg({ quality: Number(a.laatu ?? LAATU), mozjpeg: true }).toBuffer();
        kirjoitaAtomisesti(join(a.ulos, sov(Z, X, Y)), jpg);
      }
    }
  }
  console.log('bmng-yla: Z1 (4) ja Z0 (1) kirjoitettu');
}

export function bmngLuettelo({
  versio, kuukausi = '200408', muunnelma = 'topo.bathy', min = 0, max = 7, varit = null,
}) {
  const kk = Number(kuukausi.slice(4, 6));
  const lukumaarat = {};
  for (let Z = min; Z <= max; Z += 1) lukumaarat[Z] = 4 ** Z;
  return {
    sarja: 'satelliitti',
    kerros: 'bmng',
    versio,
    lahde: {
      nimi: 'NASA Blue Marble Next Generation',
      muunnelma: muunnelma === 'topo' ? 'world.topo (topografia, ei batymetriaa)' : 'world.topo.bathy (topografia ja batymetria)',
      kuukausi: `2004-${String(kk).padStart(2, '0')}`,
      resoluutio: '500 m (21600 x 21600 px / 90 astetta, kahdeksan osaa A1-D2)',
      osoite: `${BMNG_OSOITE}/${BMNG_KANSIO[muunnelma]}/${KUUKAUDET[kk - 1]}/`,
      sivu: 'https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/',
    },
    lisenssi: 'public domain (NASA)',
    // NASA:n BMNG-sivu (luettu 24.9.2026): "please credit NASA Earth Observatory".
    attribuutio: 'NASA Earth Observatory (Blue Marble Next Generation)',
    tekijat: 'Reto Stöckli, NASA Earth Observatory',
    kuukausi: kk,
    ...(varit ? { varisovitus: varit } : {}),
    tasot: { min, max },
    laatta: LAATTA,
    muoto: 'jpg',
    skeema: 'xyz',
    napa: `Web Mercator ${MERC_RAJA.toFixed(4)} astetta; lahteen tatakin korkeammat leveysasteet jaavat pois`,
    lukumaarat,
    yhteensa: Object.values(lukumaarat).reduce((s, v) => s + v, 0),
    tehty: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------- s2 (EOX)

let edellinenNouto = 0;
async function tahdita(vali) {
  const nyt = Date.now();
  const odota = Math.max(0, edellinenNouto + vali - nyt);
  edellinenNouto = nyt + odota;
  if (odota) await new Promise((r) => { setTimeout(r, odota); });
}

class Rajoitettu extends Error {}

async function noudaEox(Z, X, Y, vali, osoite = EOX_OSOITE, yrityksia = 6) {
  const url = osoite.replace('{z}', Z).replace('{y}', Y).replace('{x}', X);
  for (let k = 0; k < yrityksia; k += 1) {
    await tahdita(vali); // eslint-disable-line no-await-in-loop
    let v;
    try {
      v = await fetch(url, { headers: { 'User-Agent': EOX_UA }, redirect: 'manual', signal: AbortSignal.timeout(30000) }); // eslint-disable-line no-await-in-loop
    } catch (e) {
      await new Promise((r) => { setTimeout(r, 2000 * 2 ** k); }); // eslint-disable-line no-await-in-loop
      continue; // eslint-disable-line no-continue
    }
    if (v.status === 200) {
      const b = Buffer.from(await v.arrayBuffer()); // eslint-disable-line no-await-in-loop
      // Umpimeren laatta tulee yksivärisenä 1-bittisenä PNG:nä (mitattu
      // 24.9.2026: Tyrrhenanmeri Z11, väri 24,44,78); se muunnetaan JPEG:ksi.
      if ((b[0] === 0xff && b[1] === 0xd8) || (b[0] === 0x89 && b[1] === 0x50)) return b;
      throw new Error(`${url}: ei JPEG eikä PNG (${v.headers.get('content-type')})`);
    }
    if (v.status === 429 || v.status === 503 || (v.status >= 300 && v.status < 400)) {
      // Rajoitus: pitkä tauko, ja toistuessaan ajo pysähtyy (jatko myöhemmin samalla komennolla).
      if (k >= 2) throw new Rajoitettu(`EOX rajoittaa (HTTP ${v.status} ${v.headers.get('location') ?? ''})`);
      await new Promise((r) => { setTimeout(r, 60000); }); // eslint-disable-line no-await-in-loop
      continue; // eslint-disable-line no-continue
    }
    if (v.status >= 500) { await new Promise((r) => { setTimeout(r, 2000 * 2 ** k); }); continue; } // eslint-disable-line
    throw new Error(`${url}: HTTP ${v.status}`);
  }
  throw new Error(`${url}: ei onnistunut ${yrityksia} yrityksellä`);
}

async function s2(a) {
  const kaupungit = kaupungitLaatikoin(lueKaupungit(a.kaupungit, a.vain), Number(a.sade ?? SADE_KM));
  const min = Number(a.min ?? 8); const max = Number(a.max ?? 11);
  const tasot = kaupunkienLaatat(kaupungit, min, max);
  const eox = eoxTaso(a.vuosi ?? 2016);
  // Raakavälimuisti vuosittain: eri vuoden laatat eivät saa sekoittua.
  const raaka = a.raaka ?? `${a.ulos.replace(/\/$/, '')}-raaka-${eox.vuosi}`;
  const vali = Number(a.vali ?? NOUTOVALI_MS);
  const rinnakkain = Math.min(4, Number(a.rinnakkain ?? RINNAKKAIN));
  const varit = lueVarit(a.varit);
  const sharp = await lataaSharp();
  const laatu = Number(a.laatu ?? LAATU);
  const tyo = [];
  for (const [Z, lista] of tasot) for (const [X, Y] of lista) tyo.push([Z, X, Y]);
  console.log(`s2: ${kaupungit.length} kaupunkia, ${tyo.length} laattaa (${[...tasot].map(([Z, l]) => `Z${Z} ${l.length}`).join(', ')})`);
  let noudettu = 0; let valmiina = 0; let tehty = 0; let i = 0; let tavuja = 0; let pngeja = 0;
  const t0 = Date.now();
  async function tyolainen() {
    while (i < tyo.length) {
      const [Z, X, Y] = tyo[i]; i += 1;
      const rp = join(raaka, sov(Z, X, Y));
      const up = join(a.ulos, sov(Z, X, Y));
      let b;
      if (existsSync(rp) && statSync(rp).size > 0) { b = readFileSync(rp); valmiina += 1; } else {
        b = await noudaEox(Z, X, Y, vali, eox.osoite); // eslint-disable-line no-await-in-loop
        kirjoitaAtomisesti(rp, b); noudettu += 1;
      }
      tavuja += b.length;
      if (b[0] === 0x89) pngeja += 1;
      if (!existsSync(up)) {
        if (varit || b[0] === 0x89) {
          const { data, info } = await sharp(b).removeAlpha().raw().toBuffer({ resolveWithObject: true }); // eslint-disable-line no-await-in-loop
          if (varit) for (let j = 0; j < data.length; j += 1) data[j] = varit.taulut[j % 3][data[j]];
          kirjoitaAtomisesti(up, await sharp(data, { raw: info }).jpeg({ quality: laatu, mozjpeg: true }).toBuffer()); // eslint-disable-line no-await-in-loop
        } else kirjoitaAtomisesti(up, b); // Ilman värisovitusta EOX:n tavut sellaisinaan.
      }
      tehty += 1;
      if (tehty % 500 === 0) console.log(`  ${tehty}/${tyo.length} (noudettu ${noudettu}, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    }
  }
  try {
    await Promise.all(Array.from({ length: rinnakkain }, tyolainen));
  } catch (e) {
    if (e instanceof Rajoitettu) {
      console.error(`${e.message}: pysäytetty ${tehty}/${tyo.length}; jatka myöhemmin samalla komennolla (noudetut säilyvät ${raaka}).`);
      process.exit(3);
    }
    throw e;
  }
  console.log(`s2: ${tehty} laattaa (noudettu ${noudettu}, välimuistista ${valmiina}, umpimeri-PNG ${pngeja}), keskikoko ${(tavuja / Math.max(1, tehty) / 1024).toFixed(1)} kt, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

export function s2Luettelo({
  versio, kaupungit, min = 8, max = 11, sadeKm = SADE_KM, varit = null, haettu = null, vuosi = 2016,
}) {
  const eox = eoxTaso(vuosi);
  const tasot = kaupunkienLaatat(kaupungit, min, max);
  const lukumaarat = {};
  for (const [Z, l] of tasot) lukumaarat[Z] = l.length;
  return {
    sarja: 'satelliitti',
    kerros: 's2',
    versio,
    lahde: {
      nimi: `Sentinel-2 cloudless ${eox.vuosi} (EOxCloudless)`,
      tekija: 'EOX IT Services GmbH',
      vuosi: eox.vuosi,
      taso: eox.taso,
      osoite: eox.osoite,
      kuvaus: 'https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml',
      ...(haettu ? { haettu } : {}),
    },
    lisenssi: 'CC BY 4.0',
    lisenssiOsoite: 'https://creativecommons.org/licenses/by/4.0/',
    attribuutio: eox.attribuutio,
    attribuutioEox: eox.attribuutioEox,
    muutokset: varit
      ? 'Rajattu kaupunkien ympärille, värisävy sovitettu BMNG-pohjaan (ks. varisovitus), JPEG uudelleenpakattu.'
      : 'Rajattu kaupunkien ympärille; laatat muuttamattomina (umpimeren PNG-laatat muunnettu JPEG:ksi).',
    ...(varit ? { varisovitus: varit } : {}),
    tasot: { min, max },
    laatta: LAATTA,
    muoto: 'jpg',
    skeema: 'xyz',
    sade_km: sadeKm,
    kaupungit: kaupungit.map(({ id, nimi, lon, lat, sade_km: s, bbox }) => ({
      id, nimi, lon, lat, sade_km: s, bbox,
    })),
    saanto: S2_SAANTO,
    laatat8: tasot.get(8) ?? [],
    lukumaarat,
    yhteensa: Object.values(lukumaarat).reduce((s, v) => s + v, 0),
    tehty: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------- tarkistus ja vertailu

/** Kansion jpg-laatat joukkona 'Z/X/Y' (ohittaa macOS:n ._-tiedostot). */
export function kansionLaatat(kansio) {
  const ulos = new Set();
  if (!existsSync(kansio)) return ulos;
  for (const z of readdirSync(kansio)) {
    if (!/^\d+$/.test(z)) continue;
    for (const x of readdirSync(join(kansio, z))) {
      if (!/^\d+$/.test(x)) continue;
      for (const y of readdirSync(join(kansio, z, x))) {
        const m = /^(\d+)\.jpg$/.exec(y);
        if (m) ulos.add(`${z}/${x}/${m[1]}`);
      }
    }
  }
  return ulos;
}

/** Odotetut laatat luettelon perusteella (bmng: koko maailma, s2: sääntö). */
export function odotetutLaatat(luettelo) {
  const ulos = new Set();
  if (luettelo.kerros === 'bmng') {
    for (let Z = luettelo.tasot.min; Z <= luettelo.tasot.max; Z += 1) {
      for (let X = 0; X < 2 ** Z; X += 1) for (let Y = 0; Y < 2 ** Z; Y += 1) ulos.add(`${Z}/${X}/${Y}`);
    }
  } else {
    for (const [Z, l] of kaupunkienLaatat(luettelo.kaupungit, luettelo.tasot.min, luettelo.tasot.max)) {
      for (const [X, Y] of l) ulos.add(`${Z}/${X}/${Y}`);
    }
  }
  return ulos;
}

function tarkista(a) {
  let virheita = 0;
  for (const kerros of ['bmng', 's2']) {
    const kansio = join(a.ulos, kerros);
    const lp = join(kansio, 'laatat.json');
    if (!existsSync(lp)) { console.log(`${kerros}: ei laatat.json — ohitetaan`); continue; } // eslint-disable-line no-continue
    const l = JSON.parse(readFileSync(lp, 'utf8'));
    const odotetut = odotetutLaatat(l);
    const loydetyt = kansionLaatat(kansio);
    const puuttuu = [...odotetut].filter((k) => !loydetyt.has(k));
    const ylim = [...loydetyt].filter((k) => !odotetut.has(k));
    const summa = Object.values(l.lukumaarat).reduce((s, v) => s + v, 0);
    const ok = !puuttuu.length && !ylim.length && summa === odotetut.size && l.yhteensa === summa;
    console.log(`${kerros}: odotettu ${odotetut.size}, luettelo ${l.yhteensa}, kansiossa ${loydetyt.size}, puuttuu ${puuttuu.length}, ylimääräisiä ${ylim.length} → ${ok ? 'OK' : 'VIRHE'}`);
    if (puuttuu.length) console.log(`  esim. puuttuu ${puuttuu.slice(0, 5).join(' ')}`);
    if (ylim.length) console.log(`  esim. ylimääräinen ${ylim.slice(0, 5).join(' ')}`);
    if (!ok) virheita += 1;
  }
  if (virheita) process.exit(1);
}

/*
 * VERTAILUKUVA Z7 → Z8 -saumasta. Kaupungin keskeltä 3 × 3 Z8-laattaa:
 * vasemmalla BMNG (Z7-vanhempi suurennettuna, eli se mitä natiivi
 * näyttää ennen vaihtoa), keskellä EOX sellaisenaan, oikealla EOX
 * sovitettuna BMNG:hen (kvantiilikäyrä). Tulostaa kanavien keskiarvot
 * ja sovitetun käyrän (JSON), jota bmng/s2 --varit voi käyttää.
 */
async function vertaa(a) {
  const sharp = await lataaSharp();
  const k = kaupungitLaatikoin(lueKaupungit(a.kaupungit, a.kaupunki), Number(a.sade ?? SADE_KM))[0];
  const lista = laatikonLaatat(k.bbox, 8);
  const x0 = Math.min(...lista.map((l) => l[0])); const y0 = Math.min(...lista.map((l) => l[1]));
  const w = Math.max(...lista.map((l) => l[0])) - x0 + 1; const h = Math.max(...lista.map((l) => l[1])) - y0 + 1;
  const SW = w * LAATTA; const SH = h * LAATTA;
  const bmngPala = []; const s2Pala = [];
  for (const [X, Y] of lista) {
    const p7 = join(a.bmng, sov(7, X >> 1, Y >> 1));
    const p8 = join(a.s2, sov(8, X, Y));
    if (!existsSync(p7) || !existsSync(p8)) throw new Error(`puuttuu ${existsSync(p7) ? p8 : p7}`);
    const b = await sharp(p7).extract({ left: (X & 1) * 128, top: (Y & 1) * 128, width: 128, height: 128 }) // eslint-disable-line no-await-in-loop
      .resize(LAATTA, LAATTA, { kernel: 'cubic' }).toBuffer();
    bmngPala.push({ input: b, left: (X - x0) * LAATTA, top: (Y - y0) * LAATTA });
    s2Pala.push({ input: p8, left: (X - x0) * LAATTA, top: (Y - y0) * LAATTA });
  }
  const pohja = { create: { width: SW, height: SH, channels: 3, background: '#000' } };
  const B = await sharp(pohja).composite(bmngPala).removeAlpha().raw().toBuffer();
  const E = await sharp(pohja).composite(s2Pala).removeAlpha().raw().toBuffer();
  const S = SW; // leveys koosteelle
  // Vain maa: pikseli, joka ei ole vettä kummassakaan kuvassa ja jota
  // ei ole jätetty mustaksi (kattavuuden ulkopuoli koosteessa).
  const maa = [];
  for (let i = 0; i < E.length; i += 3) {
    if (E[i] + E[i + 1] + E[i + 2] === 0) continue; // eslint-disable-line no-continue
    if (!onVesi(B[i], B[i + 1], B[i + 2]) && !onVesi(E[i], E[i + 1], E[i + 2])) maa.push(i);
  }
  const kanava = (buf, c) => Uint8Array.from(maa, (i) => buf[i + c]);
  const kanavat = []; const keskiarvot = { bmng: [], s2: [], s2Sovitettu: [] };
  const K = Buffer.from(E);
  for (let c = 0; c < 3; c += 1) {
    const kb = kanava(B, c); const ke = kanava(E, c);
    const kayra = sovitaKayra(kvantiilit(ke), kvantiilit(kb));
    kanavat.push({ a: Math.round(kayra.a * 1e4) / 1e4, g: Math.round(kayra.g * 1e4) / 1e4 });
    const t = kayranTaulu(kayra);
    for (let i = c; i < K.length; i += 3) K[i] = t[K[i]];
    const ka = (u) => Math.round((u.reduce((s, v) => s + v, 0) / u.length) * 10) / 10;
    keskiarvot.bmng.push(ka(kb)); keskiarvot.s2.push(ka(ke)); keskiarvot.s2Sovitettu.push(ka(kanava(K, c)));
  }
  keskiarvot.maaOsuus = Math.round((maa.length / (E.length / 3)) * 1000) / 1000;
  const vali = 8;
  const raw = { width: SW, height: SH, channels: 3 };
  const kuva = await sharp({ create: { width: 3 * S + 2 * vali, height: SH, channels: 3, background: '#ffffff' } })
    .composite([
      { input: B, raw, left: 0, top: 0 },
      { input: E, raw, left: S + vali, top: 0 },
      { input: K, raw, left: 2 * (S + vali), top: 0 },
    ]).png().toBuffer();
  kirjoitaAtomisesti(a.ulos, kuva);
  const tulos = { kaupunki: k.id, z8: lista, keskiarvot, kanavat };
  if (a.json) kirjoitaAtomisesti(a.json, `${JSON.stringify(tulos, null, 1)}\n`);
  console.log(JSON.stringify(tulos));
}

// ---------------------------------------------------------------- kaupungit ja arvio

function kaupungit(a) {
  const k = JSON.parse(readFileSync(a.paketti, 'utf8'));
  const osoitin = a.osoitin ? JSON.parse(readFileSync(a.osoitin, 'utf8')) : null;
  const lista = k.alkiot.filter((c) => c.tyyppi === 'kaupunki')
    .map((c) => ({ id: c.id, nimi: c.nimi, maa: c.maa, lat: c.lat, lon: c.lon, sijaintiLahde: c.sijaintiLahde }));
  const ulos = {
    kuvaus: 'Satelliittisarjan s2-kerroksen kaupungit: sisältöpaketin kokoelma kaupungit, tyyppi "kaupunki" '
      + '(laudan ambience, js/packs/maailmankartta.js). 72 = 71 + Lontoo. lat/lon paketista: pallopiste '
      + '(Wikidata) tai laudalta laskettu, ks. sijaintiLahde. Tuotettu: node tools/tee-satelliitti.mjs kaupungit.',
    lahde: {
      kokoelma: 'kaupungit', suodatin: { tyyppi: 'kaupunki' },
      ...(osoitin ? { paketti: osoitin.polku, commit: osoitin.commit, julkaistu: osoitin.julkaistu } : {}),
    },
    kaupungit: lista,
  };
  kirjoitaAtomisesti(a.ulos ?? KAUPUNGIT_OLETUS, `${JSON.stringify(ulos, null, 1)}\n`);
  console.log(`${lista.length} kaupunkia → ${a.ulos ?? KAUPUNGIT_OLETUS}`);
}

function arvio(a) {
  const sade = Number(a.sade ?? SADE_KM);
  const kaupungit = kaupungitLaatikoin(lueKaupungit(a.kaupungit, a.vain), sade);
  const tasot = kaupunkienLaatat(kaupungit, 8, 11);
  let erikseen = 0;
  for (const k of kaupungit) for (let Z = 8; Z <= 11; Z += 1) erikseen += laatikonLaatat(k.bbox, Z).length;
  const yht = [...tasot.values()].reduce((s, l) => s + l.length, 0);
  console.log(JSON.stringify({
    bmng: Object.fromEntries(Array.from({ length: 8 }, (_, Z) => [Z, 4 ** Z])),
    bmngYhteensa: maailmanLaatat(0, 7),
    s2: Object.fromEntries([...tasot].map(([Z, l]) => [Z, l.length])),
    s2Yhteensa: yht,
    s2IlmanYhdistamista: erikseen,
    kaupunkeja: kaupungit.length,
    sadeKm: sade,
  }, null, 1));
}

async function paa() {
  const a = argumentit(process.argv.slice(2));
  const komento = a._[0];
  if (komento === 'kaupungit') return kaupungit(a);
  if (komento === 'arvio') return arvio(a);
  if (komento === 'bmng') return bmng(a);
  if (komento === 'bmng-yla') return bmngYla(a);
  if (komento === 'bmng-luettelo') {
    const l = bmngLuettelo({
      versio: a.versio, kuukausi: a.kuukausi, muunnelma: a.muunnelma, varit: a.varit ? lueVarit(a.varit).tiedot : null,
    });
    kirjoitaAtomisesti(join(a.ulos, 'laatat.json'), `${JSON.stringify(l, null, 1)}\n`);
    return console.log(`bmng laatat.json: ${l.yhteensa} laattaa`);
  }
  if (komento === 's2') return s2(a);
  if (komento === 's2-luettelo') {
    const l = s2Luettelo({
      versio: a.versio,
      kaupungit: kaupungitLaatikoin(lueKaupungit(a.kaupungit, a.vain), Number(a.sade ?? SADE_KM)),
      sadeKm: Number(a.sade ?? SADE_KM),
      varit: a.varit ? lueVarit(a.varit).tiedot : null,
      haettu: a.haettu ?? null,
      vuosi: a.vuosi ?? 2016,
    });
    kirjoitaAtomisesti(join(a.ulos, 'laatat.json'), `${JSON.stringify(l)}\n`);
    return console.log(`s2 laatat.json: ${l.yhteensa} laattaa, laatat8 ${l.laatat8.length}`);
  }
  if (komento === 'tarkista') return tarkista(a);
  if (komento === 'varit') {
    // node tools/tee-satelliitti.mjs varit --ulos varit.json sauma-*.json
    // Kaupunki, jonka Z8-alueesta alle 30 % on maata, ei sovita (meri vääristää kvantiilit).
    const kaikki = a._.slice(1).map((p) => JSON.parse(readFileSync(p, 'utf8')));
    const sov = kaikki.filter((s) => (s.keskiarvot?.maaOsuus ?? 1) >= 0.3);
    if (!sov.length) throw new Error('varit: ei yhtään kelvollista sovitusta');
    const v = {
      kuvaus: 'EOX s2 -> BMNG: ulos = 255 * a * (sisaan/255)^g kanavittain (R, G, B); kaupunkikohtaisten maa-sovitusten mediaani',
      kaupungit: sov.map((s) => s.kaupunki),
      ohitettu: kaikki.filter((s) => !sov.includes(s)).map((s) => s.kaupunki),
      kanavat: yhdistaSovitukset(sov.map((s) => s.kanavat)),
    };
    kirjoitaAtomisesti(a.ulos, `${JSON.stringify(v, null, 1)}\n`);
    return console.log(JSON.stringify(v));
  }
  if (komento === 'vertaa') return vertaa(a);
  throw new Error('komento: kaupungit | arvio | bmng | bmng-yla | bmng-luettelo | s2 | s2-luettelo | tarkista | vertaa | varit');
}

if (process.argv[1] === TAMA) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
