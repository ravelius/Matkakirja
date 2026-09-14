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
 * === MIKSI NÄILLÄ EI OLE KORTTIA ===================================
 *
 * Muiden maiden kaupunkikohteilla on tietoruutu ja sen teksti. Tässä
 * erässä tekstiä EI SAANUT KIRJOITTAA (tehtävänanto: *"Ei uutta
 * tekstiä eikä faktoja"*), eikä Ranskan aineistossa ole valmista,
 * tarkistettua kuvausta näistä seitsemästä kaupungista. Vaihtoehdot
 * olivat siis keksitty teksti tai tyhjä kortti; kumpikaan ei ole
 * hyväksyttävä.
 *
 * Siksi rivi on merkitty `vainNimi: true`, ja se tarkoittaa kahta
 * asiaa:
 *
 *   1. kartalla on merkki ja nimi, kuten omistaja pyysi;
 *   2. merkki EI OLE NAPAUTETTAVA — se ei siis ole "mustetta ilman
 *      korttia" vaan karttatypografiaa, samaa lajia kuin maan ja meren
 *      nimi kartalla.
 *
 * FABLELLE PÄÄTETTÄVÄKSI: jos kaupungit halutaan napautettaviksi, ne
 * tarvitsevat kortin tekstin — se on sisältöerä ja kirjoittajan työ,
 * ei tämän erän. Lippu on silloin yksi rivi pois.
 *
 * === KOORDINAATIT ==================================================
 *
 * Kuusi seitsemästä on luettu pelin OMASTA tarkistetusta aineistosta
 * (js/packs/fokus-grc.js FOKUS_LISANIMET.FRA, jossa laudan luvut ja
 * asteet ovat rinnakkain). Nantes puuttui siitä listasta, ja sen
 * asteet on haettu en-Wikipediasta; laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`).
 */

/** Ranskan kartalle tuodut ei-pelattavat kaupungit. */
export const NAKYVAT_KAUPUNGIT_FRA = [
  {
    id: 'nakyva-kaupunki-lyon',
    nimi: 'Lyon',
    tyyppi: 'kaupunki',
    vainNimi: true,
    // 4,8281 E / 45,772 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5994.3, y: 1569.8 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-bordeaux',
    nimi: 'Bordeaux',
    tyyppi: 'kaupunki',
    vainNimi: true,
    // -0,597 E / 44,852 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5813.4, y: 1607.9 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-lille',
    nimi: 'Lille',
    tyyppi: 'kaupunki',
    vainNimi: true,
    // 3,0781 E / 50,6519 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5935.9, y: 1361.7 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-strasbourg',
    nimi: 'Strasbourg',
    tyyppi: 'kaupunki',
    vainNimi: true,
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
    vainNimi: true,
    // 7,2631 E / 43,717 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 6075.4, y: 1654.3 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-toulouse',
    nimi: 'Toulouse',
    tyyppi: 'kaupunki',
    vainNimi: true,
    // 1,448 E / 43,6219 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5881.6, y: 1658.2 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-nantes',
    nimi: 'Nantes',
    tyyppi: 'kaupunki',
    vainNimi: true,
    // -1,5528 E / 47,2181 N — en-Wikipedia "Nantes", prop=coordinates
    // (haettu 14.9.2026); laudan luvut tools/johda-maastokohteet.mjs
    laudat: { maailmankartta: { x: 5781.6, y: 1509.3 } },
    lahde: 'en-Wikipedia "Nantes", prop=coordinates (tarkistettu '
      + '14.9.2026).',
  },
];
