/*
 * NÄKYVÄT KAUPUNGIT — RANSKA (pilotti).
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 13) ====
 *
 * Sanatarkasti: *"kartalle olisi lisaksi hyva tuoda lisaa kaupunkeja
 * nakyviin, ainakin tarkeimmat ja sitten niita piirroksia
 * mahdollisesti myos."*
 *
 * Ranskan kartalla on tähän asti näkynyt kaksi kaupunkia: pelattavat
 * Pariisi ja Marseille. Tässä ovat seitsemän seuraavaksi suurinta
 * nimeä.
 *
 * === NÄMÄ EIVÄT OLE MATKAKOHTEITA ==================================
 *
 * Rivit EIVÄT ole laudan kaupunkeja (js/packs/maailmankartta.js
 * CITIES) eivätkä koske reitteihin, noppaan, bussiin tai Liiku-valikon
 * tarjontaan millään tavalla — pelin kulku on täsmälleen entisensä.
 * Ne ovat maan kohdemerkkejä (js/fokuskohteet.js KOHDE_MAAT), kuten
 * 135 muun maan ei-pelattavat kaupungit jo ovat.
 *
 * === KAUPUNKIKORTTI (PAATOKSET 16) =================================
 *
 * Edellinen erä merkitsi nämä rivit `vainNimi: true` -lipulla, koska
 * korttiin ei ollut tekstiä. Omistaja päätti 14.9.2026 (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 16) sanatarkasti: *"Yhdista nuo kaksi
 * ens. Vaihtoehtoa ja pyyda putkelta kuhunkin kaupunkiin hero kuva.
 * Esittelyn jalkeen voi siis tulla yksi nosto teksti. Jos useampi
 * olisi tarjolla niin jatetaan seuraavat kartalle omiksi
 * nostoikseen."*
 *
 * Lippu on siis poissa ja merkki ottaa napautuksen. Kortti on kolme
 * lohkoa, samassa lehden kehyksessä kuin tiivis kaupunkietusivu
 * (js/kaupunkinosto.js latoLisakaupunginKortti):
 *
 *   1. `herokuva` — kuvaputken toimittama hero. TOISTAISEKSI `null`,
 *      jolloin kortti piirtää oman paikkamerkkinsä (kartan seepiaruutu
 *      ja kaupungin nimi) EIKÄ HAE ULKOISTA KUVAA. Kun putki toimittaa
 *      kuvan, vaihto on tämä yksi rivi: `herokuva: '…media.matkakirja
 *      .app/…'`.
 *   2. `esittely` — 2–3 lauseen esittely. TOISTAISEKSI `null`, ja
 *      kortti jättää lohkon pois kokonaan. Luonnokset ovat Fablen
 *      hyväksyttävänä (docs/raportit/viesti-fable-kaupunkikortit-
 *      20260914.md luku 3); kirjoittamatonta tekstiä ei saa panna
 *      dataan, koska kortti on kaanonia heti kun se on näkyvissä.
 *   3. `korttiNosto` — YKSI kaupunkiin ankkuroitu maalehden nosto,
 *      viite samaan olioon jonka kartta piirtää (ei kopio). Loput
 *      jäävät kartalle omiksi nostoikseen, kuten omistaja sanoi.
 *
 * === MILLÄ KAUPUNGILLA ON NOSTO — MITATTU, EI ARVATTU ==============
 *
 * Jokaisen lisäkaupungin laudan piste mitattiin jokaista kahdeksaatoista
 * maalehtinoston ankkuria vastaan (js/packs/maalehtinostot-fra.js,
 * lauta `maailmankartta`). Vain YKSI osuu kaupunkiin:
 *
 *   Lyon        maalehti-cinematographe   0,3 yksikköä  → KORTILLE
 *   Bordeaux    maalehti-dune-du-pilat   23,1
 *   Nantes      maalehti-chandeleur      37,5
 *   Toulouse    maalehti-roquefort       53,5
 *   Nizza       maalehti-petanque        59,3
 *   Lille       maalehti-braille         81,6
 *   Strasbourg  maalehti-cinematographe 153,3
 *
 * Kuuden lähin nosto on eri paikan nosto (Dune du Pilat, Bretagne,
 * Roquefort-sur-Soulzon, La Ciotat, Pariisi), jolla on kartalla oma
 * merkkinsä. Sen siirtäminen kaupungin korttiin olisi uusi, keksitty
 * ankkuri — kielletty. Näillä kuudella kortti on siis kuva + esittely,
 * ja lohko puuttuu ilman tyhjää kehystä.
 *
 * === KOORDINAATIT ==================================================
 *
 * Kuusi seitsemästä on luettu pelin OMASTA tarkistetusta aineistosta
 * (js/packs/fokus-grc.js FOKUS_LISANIMET.FRA, jossa laudan luvut ja
 * asteet ovat rinnakkain). Nantes puuttui siitä listasta, ja sen
 * asteet on haettu en-Wikipediasta; laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`).
 */

import { MAALEHTINOSTOT_FRA } from './maalehtinostot-fra.js';

/**
 * Maalehden nosto tunnuksella — SAMA OLIO, EI KOPIO. Kortti lukee siis
 * otsikon ja tekstin samasta paikasta kuin kartan nostokortti, eikä
 * kahta versiota voi ajautua erilleen (sama rakenteellinen tae kuin
 * js/packs/maalehtinostot-fra.js:llä lehteen).
 */
const nosto = (id) => MAALEHTINOSTOT_FRA.find((n) => n.id === id) ?? null;

/** Ranskan kartalle tuodut ei-pelattavat kaupungit. */
export const NAKYVAT_KAUPUNGIT_FRA = [
  {
    id: 'nakyva-kaupunki-lyon',
    nimi: 'Lyon',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: nosto('maalehti-cinematographe'),
    // 4,8281 E / 45,772 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5994.3, y: 1569.8 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-bordeaux',
    nimi: 'Bordeaux',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // -0,597 E / 44,852 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5813.4, y: 1607.9 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-lille',
    nimi: 'Lille',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // 3,0781 E / 50,6519 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5935.9, y: 1361.7 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-strasbourg',
    nimi: 'Strasbourg',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // 7,75 E / 48,58 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 6091.7, y: 1451.5 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-nizza',
    // Suomenkielinen nimi, jota pelin oma teksti käyttää
    // (js/packs/saatiedot.js, js/packs/maastokohteet-nzl.js).
    nimi: 'Nizza',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // 7,2631 E / 43,717 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 6075.4, y: 1654.3 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-toulouse',
    nimi: 'Toulouse',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // 1,448 E / 43,6219 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5881.6, y: 1658.2 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-nantes',
    nimi: 'Nantes',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: null,
    esittely: null,
    korttiNosto: null,
    // -1,5528 E / 47,2181 N — en-Wikipedia "Nantes", prop=coordinates
    // (haettu 14.9.2026); laudan luvut tools/johda-maastokohteet.mjs
    laudat: { maailmankartta: { x: 5781.6, y: 1509.3 } },
    lahde: 'en-Wikipedia "Nantes", prop=coordinates (tarkistettu '
      + '14.9.2026).',
  },
];
