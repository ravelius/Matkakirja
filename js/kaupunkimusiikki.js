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
