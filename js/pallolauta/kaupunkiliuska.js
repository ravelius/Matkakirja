/**
 * KAUPUNKILIUSKA: "matkakirjan välilehti" kaupunkimerkin vieressä
 * (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34).
 *
 * Omistajan päätös: KAUPUNKI ON YKSI PISTE. Kaupunkimerkin napautus
 * avaa kapean paperiliuskan, jonka yläryhmässä on kolme riviä
 * (kaupungin oma rivi = kaupunkilehti, "Nähtävyydet" = entinen
 * "Kaupunki kartalla", "Turistiopas" = entinen Turisti-info), sitten
 * hiusviiva ja sen alla nostokategoriat lukumäärineen ("Historia (5)").
 * Kategorian napautus avaa sen nostot sisennettyinä rivin alle
 * (haitari): toisen kategorian avaus sulkee edellisen.
 *
 * TÄMÄ MODUULI ON PELKKÄ MALLI, EI PIIRTOA. Rivien lista lasketaan
 * samoista riveistä, jotka nostokerros (js/pallolauta/nostot.js) muutenkin
 * latoo, jotta sama laskenta voidaan mitata ilman selainta. Piirto ja
 * osumatesti kuuluvat nostokerrokselle ja aihemerkkien listapohjalle
 * (js/pallolauta/aihemerkit.js viuhkanAsemat / listanPohja), jota
 * PAATOKSET 34 nimeää liuskan lähtökohdaksi.
 */

import { aiheenNimi } from './aihemerkit.js';

/** Yläryhmän kiinteät nimet (PAATOKSET 34 kohta 8, omistajan sanat). */
export const NAHTAVYYDET_NIMIO = 'Nähtävyydet';
export const TURISTIOPPAAN_NIMIO = 'Turistiopas';

/**
 * KAUPUNGIN SÄDE: näin lähellä kaupungin omaa pistettä oleva nosto on
 * "kaupungin sisällä" (PAATOKSET 34 kohta 4: *"raja: noston oma paikka
 * on kaupungin ulkopuolella (ei pelkkä kaupunkiin ankkurointi)"*).
 *
 * Luku on Pariisin mitalla: kaupungin oma rakennettu ala ulottuu noin
 * 10 km keskustasta (Boulogne–Vincennes), Versailles on 17 km,
 * Chartres 80 km ja Chambord 170 km päässä. 12 km jättää siis
 * kaupungin omat kohteet liuskaan ja päätöksessä nimetyt kolme
 * kartalle. Mitta on MAANTIETEELLINEN eikä ruutupikseleitä, joten
 * jäsenyys on sama kaikilla zoomeilla (vrt. PAATOKSET 32 kohta 1).
 */
export const KAUPUNGIN_SADE_KM = 12;

const RAD = Math.PI / 180;
const MAAN_SADE_KM = 6371;

/** Kahden asteparin etäisyys kilometreinä (haversine). */
export function etaisyysKm(a, b) {
  if (!Number.isFinite(a?.lat) || !Number.isFinite(a?.lng)
    || !Number.isFinite(b?.lat) || !Number.isFinite(b?.lng)) return Infinity;
  const dLat = (b.lat - a.lat) * RAD;
  const dLon = (b.lng - a.lng) * RAD;
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * Math.sin(dLon / 2) ** 2;
  return 2 * MAAN_SADE_KM * Math.asin(Math.min(1, Math.sqrt(s)));
}

/**
 * ONKO NOSTO KAUPUNGIN SISÄLLÄ (PAATOKSET 34 kohdat 3-4).
 *
 * Kaksi ehtoa, molemmat vaaditaan: nosto on ankkuroitu tähän
 * kaupunkiin (`kaupunkiAvain`, js/fokuskohteet.js nostonKaupunkiAvain)
 * TAI sen oma paikka on kaupungin säteen sisällä. Ankkurointi yksin ei
 * riitä sisäisyyteen — juuri sen omistaja kielsi: Versailles on
 * ankkuroitu Pariisiin mutta *"aidosti ei ole juuri Pariisissa"*.
 */
export function onKaupunginSisainen(nosto, kaupunki, sadeKm = KAUPUNGIN_SADE_KM) {
  if (!nosto || !kaupunki) return false;
  if (nosto.kaupunki || nosto.poltettu) return false;
  return etaisyysKm(nosto, kaupunki) <= sadeKm;
}

/** Kaupungin sisäiset nostot annetuista riveistä, ladontajärjestyksessä. */
export function kaupunginNostot(rivit, kaupunki, sadeKm = KAUPUNGIN_SADE_KM) {
  return (rivit ?? [])
    .filter((r) => r.perhe === 'nosto' && !r.vainNimi && typeof r.avaa === 'function'
      && onKaupunginSisainen(r, kaupunki, sadeKm))
    .sort((a, b) => (a.ladontaNro ?? 0) - (b.ladontaNro ?? 0));
}

/**
 * KATEGORIAT LUKUMÄÄRINEEN. Ryhmittely on sama aihe kuin aihenostoilla
 * (PAATOKSET 27), jonka kartalta poistuminen on juuri se, mitä
 * PAATOKSET 34 kohta 3 sanoo: *"aihenostot poistuvat kartalta ja
 * niiden aiheet ovat listan otsikoita"*.
 *
 * Järjestys on ensiesiintymän järjestys, jotta lista ei vaihda
 * järjestystä ladonnasta toiseen (sama peruste kuin aihenoston
 * nimiöllä, js/pallolauta/nostot.js TÄRKEIN ON PAKETIN ENSIMMÄINEN).
 */
export function kategoriat(nostot) {
  const jarjestys = [];
  const kasat = new Map();
  for (const n of nostot ?? []) {
    const aihe = n.aihe ?? '';
    if (!kasat.has(aihe)) { kasat.set(aihe, []); jarjestys.push(aihe); }
    kasat.get(aihe).push(n);
  }
  return jarjestys.map((aihe) => ({
    aihe,
    nimi: aiheenNimi(aihe) || 'Muut',
    jasenet: kasat.get(aihe),
    maara: kasat.get(aihe).length,
  }));
}

/**
 * LIUSKAN RIVIT YHTENÄ LISTANA (haitari auki `avattuKategoria`:n
 * kohdalta). Rivi on se, mitä piirto ja osumatesti tarvitsevat:
 *
 *   { laji, nimi, aihe?, maara?, sisennys, avain, nosto? }
 *
 * `laji` on 'lehti' | 'nahtavyydet' | 'opas' | 'kategoria' | 'kohde'.
 * Yläryhmä on aina kolme riviä (kohta 8) — myös kaupungilla, jolla ei
 * ole yhtään nostoa (silloin kategoriarivejä ei tule, kohta 9).
 * `nahtavyyksia`/`opas` kertovat, onko sisältöä; ilman sisältöä rivi
 * jätetään pois, jottei liuskasta aukea tyhjää korttia.
 */
export function liuskanRivit({
  kaupunki, nostot = [], avattuKategoria = null, nahtavyyksia = true, opas = true,
} = {}) {
  const rivit = [];
  const nimi = kaupunki?.nimi ?? kaupunki?.name ?? '';
  if (nimi) {
    rivit.push({
      laji: 'lehti', nimi, avain: 'ylaryhma:lehti', sisennys: 0,
    });
  }
  if (nahtavyyksia) {
    rivit.push({
      laji: 'nahtavyydet', nimi: NAHTAVYYDET_NIMIO, avain: 'ylaryhma:nahtavyydet', sisennys: 0,
    });
  }
  if (opas) {
    rivit.push({
      laji: 'opas', nimi: TURISTIOPPAAN_NIMIO, avain: 'ylaryhma:opas', sisennys: 0,
    });
  }
  for (const k of kategoriat(nostot)) {
    const auki = avattuKategoria != null && k.aihe === avattuKategoria;
    rivit.push({
      laji: 'kategoria',
      nimi: `${k.nimi} (${k.maara})`,
      aihe: k.aihe,
      maara: k.maara,
      auki,
      avain: `kategoria:${k.aihe}`,
      sisennys: 0,
    });
    if (!auki) continue;
    for (const n of k.jasenet) {
      rivit.push({
        laji: 'kohde',
        nimi: n.nimi ?? '',
        aihe: k.aihe,
        avain: `kohde:${n.avain}`,
        nosto: n,
        sisennys: 1,
      });
    }
  }
  return rivit;
}

/** Montako yläryhmän riviä listassa on (savukkeiden vartio, kohta 8). */
export function ylaryhmanMaara(rivit) {
  return (rivit ?? []).filter((r) => r.laji === 'lehti' || r.laji === 'nahtavyydet'
    || r.laji === 'opas').length;
}
