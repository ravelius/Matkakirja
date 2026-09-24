/*
 * PYRAMIDIN SYVÄT TASOT: KORKEUSIKKUNA COPERNICUS GLO-30:STA
 * (Karttaseppä 23.9.2026, natiivipelin z9–z10 ja pallon Z9–Z11).
 *
 * Laattapyramidin rinnevarjo lasketaan korkeusruudukosta, jonka
 * generaattori kokoaa kerran ja lähettää piirtosivulle `korkeus.bin`-
 * tiedostona (tools/generoi-laattapyramidi.mjs). Tasoille z0–z8 ruudukko
 * on ETOPO1:n 1′ (1,85 km) — z10:llä yksi solu olisi 32 kuvapikseliä, ja
 * vuoret olisivat pehmeitä kumpuja. Tämä moduuli kokoaa SAMAN MUOTOISEN
 * ruudukon (Int16, rivi 0 pohjoisin, tasaväli asteina) 30 metrin
 * Copernicus-aineistosta, joten piirtomoottoriin ei kosketa lainkaan:
 * moottori johtaa rinnevarjon askeleen `d` ruudukon omasta välistä
 * (maailmapiirto.js DLON = (lon1 − lon0)/(w − 1)), joten tiheämpi
 * ruudukko antaa automaattisesti tiheämmän varjon.
 *
 * VÄLI = TASON PIKSELI, KATTONA 1″. z10 on 1920 px/pituusaste eli
 * 1,875″, z9 960 px/aste eli 3,75″. Tiheämpi ruudukko ei toisi
 * näkyvää yksityiskohtaa (bilineaarinen näyte pikseliä kohti) vaan
 * pelkkää muistia; harvempi pehmentäisi. Katto 1″ on aineiston oma
 * tarkkuus — sitä tiheämpi ruudukko olisi interpolointia.
 *
 * SOLMUT OVAT MAAILMANHILASSA. Ikkunan kulma on generaattorin 1′-hilaan
 * napsautettu, ja 1′ on välin monikerta (z10: 32 väliä, z9: 16), joten
 * saman pituus- ja leveysasteen näyte on sama jokaisessa shardissa.
 * Ilman sitä naapurikaistojen laattojen raja voisi näkyä.
 *
 * PUUTTUVA RUUTU EI OLE MERENPINTA. DEM-kansiossa on vain maa-alueen
 * 1°-ruudut, ja Euroopan laajennus latautuu yhä samaan kansioon. Jos
 * ruutua ei ole, näyte otetaan vanhasta 1′-ikkunasta, jolloin meri,
 * ulkomaat ja lataamattomat alueet ovat samaa aineistoa kuin tänään.
 *
 * VARA-ARVO ON KUUTIOLLINEN (Catmull–Rom), EI BILINEAARINEN. Mitattu
 * koevedoksessa 23.9.2026 (reuna-z9-1min-vs-dem.png): bilineaarinen
 * pinta on solun rajalla taitteinen, ja kun varjon askel on 1″-luokkaa
 * eikä enää 1′-solun kokoinen, jokainen 1′-solu (16 px z9:llä, 32 px
 * z10:llä) piirtyy omana tasaisesti varjostettuna laattanaan —
 * porrasmainen ruudukko rampissa ja DEM:ttömällä maalla. Kuutiollinen
 * pinta on sileä solurajan yli (jatkuva derivaatta), joten varjo
 * jatkuu pehmeänä kuten 1′-aineiston kuuluukin.
 *
 * SAUMA HÄIVYTETÄÄN (RAMPPI). DEM:n ja 1′:n rinnevarjo eroavat
 * luonteeltaan: 1′ on pehmeä, 30 m terävä. Kova raja 1°-ruudun reunalla
 * olisi suora viiva keskellä maastoa (esim. 10° E Alppien itäpuolella
 * ennen kuin Italian ruudut ovat kansiossa). Siksi korkeus on
 * painotettu keskiarvo h = w · DEM + (1 − w) · 1′, jossa w nousee
 * nollasta ykköseen RAMPIN matkalla puuttuvan naapuriruudun reunasta
 * (smoothstep). Rampin kaltevuuslisä on (DEM − 1′)/RAMPPI: satojen
 * metrien erolla 5,5 km:n matkalla se on muutama prosentti ennen
 * liioittelua — alle sen, mitä silmä erottaa varjona.
 *
 * VALON SUUNTA, KORKEUSKULMA JA LIIOITTELU PYSYVÄT ENNALLAAN
 * (maastovarjo.js VALO: 315°, 42°, 2,6). Syy: syvät tasot jatkavat
 * z8:aa, ja saman kartan pitää näyttää samalta valaistukselta joka
 * tasolla — vain yksityiskohta kasvaa. Liioittelu 2,6 on valittu 1′- ja
 * 3′-aineistolle, jonka rinteet ovat keskiarvoistuneita; 30 metrin
 * rinteet ovat todellisia ja siksi jyrkempiä, joten vuoristo tummuu
 * syvillä tasoilla selvästi (ks. koevedos
 * docs/raportit/syvat-tasot-dem-20260923.md). Jos se on liikaa, säätö
 * on omistajan päätös eikä tämän erän.
 *
 * MERI: Copernicus antaa avomerelle 0 m. Pelkkänä se nostaisi
 * rannikkoruudun meren pohjan pintaan ja syvyysvyöhykkeet katoaisivat
 * ruudun alalta suorakaiteena. Siksi DEM:n arvo ≤ 0 korvataan
 * min(arvo, 1′-arvo): maalla 1′-arvo on yleensä ≥ 0 ja tulos 0 m,
 * merellä ETOPOn syvyys. Maa ja meri erotetaan joka tapauksessa
 * vektoreista (maailmapiirto.js "VEKTORI ON AUKTORITEETTI").
 */

import { bilineaarinenKorkeus } from '../fokuskartta/maastovarjo.js';

/** Aineiston oma tarkkuus asteina (1″); ruudukko ei ole tätä tiheämpi. */
export const DEM_KATTO = 1 / 3600;
/** Häivytyksen leveys asteina puuttuvan naapuriruudun reunasta (≈ 5,5 km). */
export const DEM_RAMPPI = 0.05;

/**
 * Ruudukon väli tasolle: tason pikseli pituusasteina, kattona 1″.
 * @param {number} pxAsteelle tason kuvapikseliä yhtä pituusastetta kohti
 */
export function demVali(pxAsteelle, katto = DEM_KATTO) {
  return Math.max(katto, 1 / pxAsteelle);
}

const smoothstep = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

/**
 * DEM:n paino pisteessä (0…1): 0 puuttuvassa ruudussa, 1 kun lähin
 * puuttuva naapuriruutu on vähintään RAMPIN päässä. Etäisyys lasketaan
 * kilometreinä (pituusaste kertaa cos lat), jotta ramppi on joka
 * suuntaan saman levyinen.
 *
 * @param {{ onRuutu(lat: number, lon: number): boolean }} dem
 */
export function demPaino(dem, ramppi = DEM_RAMPPI) {
  const maskit = new Map();
  /* Naapurien puuttumisbitit (8 suuntaa), -1 = ruutu itse puuttuu. */
  const maski = (ilat, ilon) => {
    const k = (ilat + 90) * 1000 + (ilon + 360);
    let m = maskit.get(k);
    if (m !== undefined) return m;
    if (!dem.onRuutu(ilat, ilon)) m = -1;
    else {
      m = 0; let b = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (!dx && !dy) continue;
          if (!dem.onRuutu(ilat + dy, ilon + dx)) m |= 1 << b;
          b += 1;
        }
      }
    }
    maskit.set(k, m);
    return m;
  };
  return (lon, lat) => {
    const ilat = Math.floor(lat); const ilon = Math.floor(lon);
    const m = maski(ilat, ilon);
    if (m < 0) return 0;
    if (m === 0 || ramppi <= 0) return 1;
    const kx = Math.cos((lat * Math.PI) / 180);
    let lahin = Infinity; let b = 0;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (!dx && !dy) continue;
        if (m & (1 << b)) {
          const ex = dx < 0 ? lon - ilon : dx > 0 ? ilon + 1 - lon : 0;
          const ey = dy < 0 ? lat - ilat : dy > 0 ? ilat + 1 - lat : 0;
          lahin = Math.min(lahin, Math.hypot(ex * kx, ey));
        }
        b += 1;
      }
    }
    return smoothstep(lahin / ramppi);
  };
}

/** Catmull–Rom-painot neljälle solmulle osuudella t ∈ [0, 1). */
function catmullRom(t, p) {
  const t2 = t * t; const t3 = t2 * t;
  p[0] = 0.5 * (-t3 + 2 * t2 - t);
  p[1] = 0.5 * (3 * t3 - 5 * t2 + 2);
  p[2] = 0.5 * (-3 * t3 + 4 * t2 + t);
  p[3] = 0.5 * (t3 - t2);
}

/**
 * Kuutiollinen (Catmull–Rom) korkeus tasavälisestä ruudukosta; reunoilla
 * solmut rajataan ruudukkoon. Muoto kuin maastovarjo.js
 * bilineaarinenKorkeus: `lat1` on pohjoisin rivi. NaN ruudukon ulkopuolella.
 */
export function kuutiollinenKorkeus(K, lon, lat) {
  const fx = (lon - K.lon0) / K.dlon;
  const fy = (K.lat1 - lat) / K.dlat;
  if (fx < 0 || fy < 0 || fx > K.w - 1 || fy > K.h - 1) return NaN;
  const x0 = Math.floor(fx); const y0 = Math.floor(fy);
  const px = [0, 0, 0, 0]; const py = [0, 0, 0, 0];
  catmullRom(fx - x0, px);
  catmullRom(fy - y0, py);
  let v = 0;
  for (let j = 0; j < 4; j += 1) {
    const y = Math.max(0, Math.min(K.h - 1, y0 - 1 + j));
    let rivi = 0;
    for (let i = 0; i < 4; i += 1) {
      const x = Math.max(0, Math.min(K.w - 1, x0 - 1 + i));
      rivi += px[i] * K.grid[y * K.w + x];
    }
    v += py[j] * rivi;
  }
  return v;
}

/**
 * Tiheä korkeusikkuna DEM:stä, 1′-ikkuna varalla.
 *
 * @param {object} p
 * @param {{w,h,lon0,lon1,lat0,lat1,grid}} p.karkea  generaattorin 1′-ikkuna
 *        (maailma.mjs korkeusruudukko); kattaa `laatikon`.
 * @param {{lon0,lon1,lat0,lat1}} p.laatikko  ikkunan ala; lon0 ja lat1
 *        ovat solmuja (napsautettu hilaan), lon1/lat0 pyöristyvät alas
 *        viimeiseen solmuun.
 * @param {number} p.vali  ruudukon väli asteina (demVali)
 * @param {{ onRuutu, korkeus(lon, lat, vali) }} p.dem  demHakemisto
 * @returns ruudukko samassa muodossa kuin `karkea`, lisäksi
 *          `dem: { vali, osuus }` (DEM:n osuus soluista, paino > 0).
 */
export function demIkkuna({
  karkea, laatikko, vali, dem, ramppi = DEM_RAMPPI,
}) {
  const w = Math.floor((laatikko.lon1 - laatikko.lon0) / vali + 1e-6) + 1;
  const h = Math.floor((laatikko.lat1 - laatikko.lat0) / vali + 1e-6) + 1;
  const lon0 = laatikko.lon0;
  const lat1 = laatikko.lat1;
  const K = {
    grid: karkea.grid,
    w: karkea.w,
    h: karkea.h,
    lon0: karkea.lon0,
    lat1: karkea.lat1,
    dlon: (karkea.lon1 - karkea.lon0) / (karkea.w - 1),
    dlat: (karkea.lat1 - karkea.lat0) / (karkea.h - 1),
  };
  const paino = demPaino(dem, ramppi);
  const grid = new Int16Array(w * h);
  let demSoluja = 0;
  for (let y = 0; y < h; y += 1) {
    const lat = lat1 - y * vali;
    for (let x = 0; x < w; x += 1) {
      const lon = lon0 + x * vali;
      let v = kuutiollinenKorkeus(K, lon, lat);
      /*
       * MERELLÄ BILINEAARINEN: syvyysvyöhykkeet ja isobaatit luetaan
       * korkeudesta, ja z8 piirtää ne bilineaarisesta 1′:stä. Sama
       * arvo syvillä tasoilla pitää käyrät samoilla paikoilla tasolta
       * toiselle (koevedos nizza-ranta-z10: kuutiollisena lenkit
       * siirtyivät). Varjo lasketaan vain maalle, joten kuutiollista
       * tarvitaan vain siellä.
       */
      const b = bilineaarinenKorkeus(K, lon, lat);
      if (b < 0 && v < 0) v = b;
      if (!Number.isFinite(v)) v = 0;
      const p = paino(lon, lat);
      if (p > 0) {
        let d = dem.korkeus(lon, lat, vali);
        if (!(d > 0)) d = Math.min(d, v);
        v = p * d + (1 - p) * v;
        demSoluja += 1;
      }
      grid[y * w + x] = Math.max(-32000, Math.min(32000, Math.round(v)));
    }
  }
  return {
    w,
    h,
    lon0,
    lon1: lon0 + (w - 1) * vali,
    lat0: lat1 - (h - 1) * vali,
    lat1,
    grid,
    lahteet: karkea.lahteet,
    dem: { vali, osuus: demSoluja / (w * h) },
  };
}
