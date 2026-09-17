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
 * SIIRTYMISRIVI (PAATOKSET 34 kohta 1, *"jokainen kaupunki"*). Liuska
 * avautuu nyt myös muista kaupungeista kuin pelaajan omasta, ja
 * silloin kaupunkimerkin napautus ennen KÄYNNISTI siirron. Teko ei saa
 * kadota, joten se on liuskan rivi yläryhmän jatkona — ei yläryhmän
 * neljäs rivi (kohta 8 sanoo kolme), vaan oma lajinsa, joka on
 * olemassa vain silloin kun siirto on tarjolla.
 */
export const LIIKU_NIMIO = 'Liiku tänne';

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
 * NOSTON OMA DATAPAIKKA, ei ladottu paikka (PAATOKSET 34 kohta 4).
 *
 * Rivin `lat`/`lng` ovat se piste, johon merkki lopulta LADOTTIIN:
 * ankkurilevitys (PAATOKSET 32) siirtää merkkejä kymmeniä kilometrejä,
 * jotta ne eivät peitä toisiaan. Jäsenyys ei saa riippua siitä —
 * *"noston oma paikka"* on datan piste, jonka ladonta ottaa talteen
 * `omaLat`/`omaLng`-kenttiin (js/pallolauta/nostot.js `lisaa`).
 * Vanha rivi ilman kenttiä putoaa takaisin `lat`/`lng`:hen.
 */
export function nostonOmaPaikka(nosto) {
  if (!nosto) return null;
  const lat = Number.isFinite(nosto.omaLat) ? nosto.omaLat : nosto.lat;
  const lng = Number.isFinite(nosto.omaLng) ? nosto.omaLng : nosto.lng;
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

/** Nimet vertautuvat löyhästi: iso/pieni kirjain ja reunavälit eivät eroa. */
const nimiAvain = (s) => String(s ?? '').trim().toLocaleLowerCase('fi');

/**
 * ONKO NOSTO KAUPUNGIN SISÄLLÄ (PAATOKSET 34 kohdat 3-4).
 *
 * Ratkaisee noston OMA paikka, ei ankkurointi eikä ladottu piste:
 * *"raja: noston oma paikka on kaupungin ulkopuolella (ei pelkkä
 * kaupunkiin ankkurointi)"*. Versailles on ankkuroitu Pariisiin mutta
 * on 17 km päässä, joten se jää kartalle.
 *
 * TOINEN, DATAN OMA POLKU: jos noston paikkanimi ON kaupungin nimi
 * (pakkojen `paikka`-kenttä, esim. *"Pariisi"*), nosto on sisäinen
 * ilman mittausta — silloin data itse sanoo sen olevan kaupungissa
 * eikä arvioitu koordinaatti voi kiistää sitä.
 */
export function onKaupunginSisainen(nosto, kaupunki, sadeKm = KAUPUNGIN_SADE_KM) {
  if (!nosto || !kaupunki) return false;
  if (nosto.kaupunki || nosto.poltettu) return false;
  const kaupunginNimi = nimiAvain(kaupunki.nimi ?? kaupunki.name);
  if (kaupunginNimi && nimiAvain(nosto.paikkaNimi) === kaupunginNimi) return true;
  const oma = nostonOmaPaikka(nosto);
  if (!oma) return false;
  return etaisyysKm(oma, kaupunki) <= sadeKm;
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
  liiku = false,
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
  if (liiku) {
    rivit.push({
      laji: 'liiku', nimi: LIIKU_NIMIO, avain: 'ylaryhma:liiku', sisennys: 0,
    });
  }
  let ensimmainen = true;
  for (const k of kategoriat(nostot)) {
    const auki = avattuKategoria != null && k.aihe === avattuKategoria;
    rivit.push({
      // Hiusviiva erottaa yläryhmän kategorioista (kohta 8): se on
      // ensimmäisen kategoriarivin yläpuolella, ei oma rivinsä —
      // tyhjä rivi söisi liuskan pystytilaa turhaan.
      hiusviiva: ensimmainen,
      laji: 'kategoria',
      nimi: `${k.nimi} (${k.maara})`,
      aihe: k.aihe,
      maara: k.maara,
      auki,
      avain: `kategoria:${k.aihe}`,
      sisennys: 0,
    });
    ensimmainen = false;
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

/**
 * SUURIMMAN LIUSKAN RIVIMÄÄRÄ (PAATOKSET 34 kohta 10: *"kartta voisi
 * ajaa itsensa sellaiseen paikkaan missa nostot mahtuvat aukeamaan
 * hyvin"*).
 *
 * Kamera-ajo mitoitetaan sen mukaan, mikä liuska VOI olla — eli
 * yläryhmä + mahdollinen Liiku-rivi + kaikki kategoriarivit + SUURIN
 * kategoria avattuna. Pienemmät kategoriat mahtuvat silloin
 * itsestään, eikä kamera liiku uudestaan haitaria avattaessa (ajo
 * sulkisi juuri avatun liuskan, ks. VIUHKAN_LEPO_PX).
 */
export function liuskanSuurinRivimaara({ nostot = [], liiku = false, nahtavyyksia = true, opas = true } = {}) {
  const kat = kategoriat(nostot);
  let suurin = 0;
  for (const k of kat) suurin = Math.max(suurin, k.maara);
  return 1 + (nahtavyyksia ? 1 : 0) + (opas ? 1 : 0) + (liiku ? 1 : 0) + kat.length + suurin;
}

/** Montako yläryhmän riviä listassa on (savukkeiden vartio, kohta 8). */
export function ylaryhmanMaara(rivit) {
  return (rivit ?? []).filter((r) => r.laji === 'lehti' || r.laji === 'nahtavyydet'
    || r.laji === 'opas').length;
}

/** Kelausrivien nimiöt (ylös ja alas). */
export const KELAUS_YLOS_NIMIO = '▲ edelliset';
export const KELAUS_ALAS_NIMIO = '▼ lisää';

/**
 * LIUSKA KELAA SISÄISESTI, KUN RUUTU EI RIITÄ (PAATOKSET 32 kohta 5:
 * *"yksikään nimiö ei saa olla toisen nimiön, merkin, kaupungin nimen
 * tai pelinappulan päällä"*).
 *
 * Avattu kategoria voi olla pidempi kuin merkin alapuolelle jäävä
 * tila. Silloin liuska EI saa venyä ylöspäin kaupungin nimen päälle
 * eikä ruudun yli: se näyttää IKKUNAN riveistä ja tarjoaa kelausrivit.
 * Kelausrivi vie itse yhden rivin, joten ikkuna on sen verran pienempi
 * — laskenta on tässä mallissa, jotta se voidaan mitata ilman selainta.
 *
 * @param {Array<object>} rivit  koko lista (liuskanRivit)
 * @param {number} enintaan  montako riviä ruudulle mahtuu
 * @param {number} kelaus  ensimmäisen näytettävän rivin indeksi
 * @returns {{rivit: Array<object>, kelaus: number, kelattu: boolean}}
 */
export function kelattuLiuska(rivit = [], { enintaan = Infinity, kelaus = 0 } = {}) {
  const n = rivit.length;
  if (!Number.isFinite(enintaan) || enintaan >= n) {
    return { rivit, kelaus: 0, kelattu: false };
  }
  /*
   * Alle kolmen rivin ikkunaan ei mahdu sisältöä kelausrivien lisäksi;
   * silloin näytetään se, mikä mahtuu, ilman kelausta (ruutu on niin
   * pieni, ettei liuska ole enää lista).
   */
  if (enintaan < 3) {
    return { rivit: rivit.slice(0, Math.max(0, enintaan)), kelaus: 0, kelattu: false };
  }
  const alku = Math.max(0, Math.min(Math.round(kelaus) || 0, n - 1));
  const ylos = alku > 0;
  // Ikkunaan mahtuu `enintaan` riviä, joista kelausrivit vievät omansa.
  let tilaa = enintaan - (ylos ? 1 : 0);
  let loppu = Math.min(n, alku + tilaa);
  if (loppu < n) { tilaa -= 1; loppu = Math.min(n, alku + tilaa); }
  const ikkuna = [];
  if (ylos) {
    ikkuna.push({
      laji: 'kelaus', suunta: -1, nimi: KELAUS_YLOS_NIMIO, avain: 'kelaus:ylos', sisennys: 0,
    });
  }
  for (let i = alku; i < loppu; i += 1) ikkuna.push(rivit[i]);
  if (loppu < n) {
    ikkuna.push({
      laji: 'kelaus', suunta: 1, nimi: KELAUS_ALAS_NIMIO, avain: 'kelaus:alas', sisennys: 0,
    });
  }
  return { rivit: ikkuna, kelaus: alku, kelattu: true };
}

/**
 * Kelauksen uusi alkuindeksi, kun kelausriviä napautetaan. Askel on
 * ikkuna miinus kaksi riviä, jotta liittymäkohta näkyy molemmin puolin.
 */
export function kelauksenAskel({
  kelaus = 0, suunta = 1, enintaan = 0, maara = 0,
} = {}) {
  const askel = Math.max(1, enintaan - 2);
  return Math.max(0, Math.min(Math.max(0, maara - 1), (Math.round(kelaus) || 0) + suunta * askel));
}
