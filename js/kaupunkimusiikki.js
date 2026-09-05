/*
 * ══════════════════════════════════════════════════════════════════
 * KAUPUNKIRAIDAT — kaupungin oma kappale pohjavireen tilalla
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 5.9.2026 klo 00.35, sanatarkasti: *"ateenaan
 * saavuttaessa voisi vaihtua kappale. generoi sinne oma musiikki."*
 *
 * Pelissä soi kaikkialla sama harva pohjavire (musa-pohja,
 * js/ambience-stream.js POHJA_MUSIIKKI). Kaupunkiraita on sen
 * PAIKALLINEN SIJAINEN: kun pelaaja saapuu kaupunkiin, jolla on oma
 * raita, pohjavire ristihäivytetään kaupungin kappaleeseen, ja kun
 * kaupungista lähdetään, pohjavire palaa samalla häivytyksellä.
 * Kaupunkiraita soi siis samassa paikassa sekoituksessa kuin
 * pohjavire — saman väistön (pöllö, kertoja, lukija) ja saman
 * kehittäjäkertoimen ('musiikki') alla, ambienssiäänten ALLA.
 *
 * TÄSSÄ MODUULISSA ON VAIN TAULUKKO JA NIMISÄÄNTÖ. Koko soittokoneisto
 * on js/ambience-stream.js:ssä pohjavireen rinnalla, koska se on
 * kirjaimellisesti sama soitin: kaksi koneistoa samalle paikalle
 * sekoituksessa olisi kaksi paikkaa, joissa väistö, taustatauko ja
 * puuttuvan raidan sietäminen pitäisi muistaa yhtä aikaa.
 *
 * ------------------------------------------------------------------
 * MITEN UUSI KAUPUNKI LISÄTÄÄN (Fablen työ)
 * ------------------------------------------------------------------
 *
 * 1. Lisää rivi alle KAUPUNKIRAIDAT-tauluun: avain on laudan
 *    kaupungin id (js/packs/europe.js `id: 'ateena'`), arvo lyhyt
 *    kuvaus siitä, mitä raidalta kuullaan.
 * 2. Lisää sama avain tools/generoi-musiikki.mjs:n RAIDAT-tauluun
 *    (`laji: 'kaupunki'`, `kaupunki: '<id>'`) omine prompteineen.
 *    Tiedostonimi tulee molemmissa samasta säännöstä
 *    (`musa-kaupunki-<id>.mp3`), ja tests/kaupunkimusiikki.test.mjs
 *    kaatuu, jos taulut eroavat.
 * 3. Aja työnkulku "Generoi musiikki" (raidat: `<id>` tai
 *    `kaupungit`), kuuntele raita PR:ssä ja merge — vie-aanet.yml vie
 *    sen ämpärin audio/-kansioon, jota peli hakee.
 *
 * Puuttuva raita ei riko mitään: jos tiedostoa ei ole ämpärissä (404),
 * pohjavire jatkaa soimistaan eikä pelaaja huomaa mitään.
 *
 * ------------------------------------------------------------------
 * ALUERAIDAT — KAUPUNGIN OMA RAITA ON POIKKEUS, ALUE ON SÄÄNTÖ
 * ------------------------------------------------------------------
 *
 * Omistajan tilaus 5.9.2026 yöllä, sanatarkasti: *"generoi musiikkeja
 * kaikkiin kohtiin peliä, ne tuovat paljon lisää tunnelmaa."* Euroopan
 * laudalla on 44 kaupunkia, eikä jokaiselle tehdä omaa kappaletta:
 * kaupunkien välinen ero kuuluu jo äänimaisemassa (basaari, satama,
 * metsä), ja 44 raitaa maksaisi 44 kutsua eikä toisi 44 tunnelmaa.
 *
 * Siksi raidalla on KAKSI TASOA: kaupungin oma kappale, jos sellainen
 * on tilattu (Ateena), ja muuten ALUEEN raita — Välimeri, Pohjola,
 * Keski-Eurooppa, Balkan, Itä-Eurooppa, Britteinsaaret. Alue johdetaan
 * pelin omasta maatiedosta (pakan `map.cityCountry`, sama taulu jolla
 * äänimaiseman maakori arvotaan), ei uudesta kaupunkiluettelosta:
 * uusi kaupunki saa raitansa ilman että tätä tiedostoa muokataan, kun
 * sen maa on tunnettu. Kaupunkikohtainen poikkeus (KAUPUNGIN_ALUE) on
 * vain niille, joiden maa vetäisi väärään suuntaan — Marseille on
 * Välimeri, ei Keski-Eurooppa.
 *
 * Ketju on siis kaupunki → alue → pohjavire, ja js/musiikkivalitsin.js
 * jatkaa sitä ylöspäin tiloilla (lehti, matkalaukku, etusivu).
 */
import { musaPolku } from './media.js';

/**
 * Kaupunkiraidan tunnus tiedostonimeä varten: `ateena` →
 * `musa-kaupunki-ateena`. Sääntö on tässä yhdessä paikassa, koska
 * sekä peli (musaPolku) että generointityökalu
 * (tools/generoi-musiikki.mjs) kirjoittavat saman nimen — ja
 * moottoripäätteen (-lyria) liittää perään js/media.js:n
 * MUSIIKIN_PAATE-kytkin, jota tämä moduuli ei ohita.
 */
export const kaupunkiraidanTunnus = (cityId) => `musa-kaupunki-${cityId}`;

/**
 * Kaupungit, joilla on oma kappale. AVAIN ON LAUDAN KAUPUNGIN ID.
 *
 * Sama id kelpaa kaikilla laudoilla, joilla kaupunki esiintyy
 * (europe.js ja maailma.js käyttävät molemmat 'ateena'), joten raita
 * seuraa kaupunkia eikä lautaa.
 */
export const KAUPUNKIRAIDAT = {
  ateena: {
    kuvaus: 'Ateenaan saapuminen iltapäivällä: bouzouki ja kitara hillitysti, '
      + 'Välimeren ilta pohjaäänimaiseman alla.',
  },
};

/**
 * Kaupungin oman raidan polku, tai null jos kaupungilla ei ole omaa
 * kappaletta. Kutsuja (js/ambience-stream.js) päättää, soiko se —
 * tämä ei tiedä pelin tilasta mitään.
 */
export function kaupunginMusiikki(cityId) {
  if (!cityId || !Object.hasOwn(KAUPUNKIRAIDAT, cityId)) return null;
  return musaPolku(kaupunkiraidanTunnus(cityId));
}

/*
 * ══════════════════════════════════════════════════════════════════
 * ALUERAIDAT
 * ══════════════════════════════════════════════════════════════════
 *
 * Avain on alueen tunnus ja samalla tiedostonimen loppuosa
 * (`musa-kaupunki-valimeri`) — sama nimisääntö kuin kaupungeilla,
 * koska peliä varten ne ovat sama asia: pohjavireen sijainen. Kuvaus
 * näkyy työhuoneen Musiikki-lehdessä.
 */
export const ALUERAIDAT = {
  britteinsaaret: {
    kuvaus: 'Britteinsaaret: sumuinen viulu ja harppu hillitysti, '
      + 'kivikaupunkien vihmasade pohjaäänimaiseman alla.',
  },
  pohjola: {
    kuvaus: 'Pohjola: hidas ja avara, kantele ja jouset, '
      + 'valoisa yö pohjaäänimaiseman alla.',
  },
  'keski-eurooppa': {
    kuvaus: 'Keski-Eurooppa: kamarisoitinten kohtelias sävy, '
      + 'piano ja jouset, salonki pohjaäänimaiseman alla.',
  },
  valimeri: {
    kuvaus: 'Välimeri: lämmin kitara ja mandoliini, '
      + 'iltapäivän valo pohjaäänimaiseman alla.',
  },
  balkan: {
    kuvaus: 'Balkan: kaval-huilu ja näppäilty tambura, '
      + 'vuorten ja basaarin väli pohjaäänimaiseman alla.',
  },
  'ita-eurooppa': {
    kuvaus: 'Itä-Eurooppa: matalat jouset ja cimbalom, '
      + 'leveä tasanko pohjaäänimaiseman alla.',
  },
};

/**
 * Maa (ISO-3) → alue. TÄMÄ ON KOKO KYTKENTÄ KAUPUNKEIHIN: pelin pakka
 * kertoo kaupungin maan (`map.cityCountry`, js/packs/europe-countries.js),
 * ja alue luetaan siitä. Uusi kaupunki tunnettuun maahan saa raitansa
 * ilman muutoksia tänne; uusi maa lisätään tähän yhdellä rivillä
 * (tests/musiikkivalitsin.test.mjs kaatuu, jos Euroopan laudalta jää
 * maa ilman aluetta).
 *
 * Jako on 1873:n matkailijan jako eikä nykyinen valtiojako: Itävalta ja
 * Unkari ovat samaa Keski-Eurooppaa, ja Osmanivaltakunnan Istanbul
 * kuuluu Balkanille, jonka kautta sinne matkustetaan.
 */
export const ALUEEN_MAAT = {
  GBR: 'britteinsaaret',
  IRL: 'britteinsaaret',
  NOR: 'pohjola',
  SWE: 'pohjola',
  DNK: 'pohjola',
  FIN: 'pohjola',
  ISL: 'pohjola',
  FRA: 'keski-eurooppa',
  NLD: 'keski-eurooppa',
  DEU: 'keski-eurooppa',
  CZE: 'keski-eurooppa',
  AUT: 'keski-eurooppa',
  CHE: 'keski-eurooppa',
  POL: 'keski-eurooppa',
  HUN: 'keski-eurooppa',
  ESP: 'valimeri',
  PRT: 'valimeri',
  ITA: 'valimeri',
  GRC: 'valimeri',
  HRV: 'balkan',
  BIH: 'balkan',
  BGR: 'balkan',
  ROU: 'balkan',
  TUR: 'balkan',
  RUS: 'ita-eurooppa',
  UKR: 'ita-eurooppa',
  EST: 'ita-eurooppa',
  LVA: 'ita-eurooppa',
  LTU: 'ita-eurooppa',
};

/**
 * Kaupunkikohtaiset poikkeukset maajakoon. Vain silloin, kun maa
 * vetäisi kuultavasti väärään suuntaan — Marseille on Välimeren
 * satama eikä Pariisin salonki.
 */
export const KAUPUNGIN_ALUE = {
  marseille: 'valimeri',
};

/**
 * Kaupungin alue, tai null jos sitä ei tiedetä (vieras lauta, virtuaali-
 * paikka kuten 'etusivu' tai 'merimatka', tuntematon maa).
 *
 * @param {?string} cityId laudan kaupungin id
 * @param {?string} maa kaupungin ISO-3-maakoodi pakan cityCountry-taulusta
 */
export function kaupunginAlue(cityId, maa = null) {
  if (cityId && Object.hasOwn(KAUPUNGIN_ALUE, cityId)) return KAUPUNGIN_ALUE[cityId];
  if (maa && Object.hasOwn(ALUEEN_MAAT, maa)) return ALUEEN_MAAT[maa];
  return null;
}

/** Alueen raidan polku, tai null jos aluetta tai raitaa ei ole. */
export function alueenMusiikki(alue) {
  if (!alue || !Object.hasOwn(ALUERAIDAT, alue)) return null;
  return musaPolku(kaupunkiraidanTunnus(alue));
}

/**
 * Paikan raidat parhaasta alkaen: kaupungin oma kappale ensin, alueen
 * raita perään. Tyhjä lista tarkoittaa, ettei paikalla ole omaa
 * musiikkia — silloin soi pohjavire (js/musiikkivalitsin.js).
 */
export function kaupunginRaidat(cityId, maa = null) {
  return [kaupunginMusiikki(cityId), alueenMusiikki(kaupunginAlue(cityId, maa))]
    .filter(Boolean);
}
