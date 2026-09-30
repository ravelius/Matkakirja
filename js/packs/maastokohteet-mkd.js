/*
 * MAASTOKOHTEET — MKD. Maan nostot napautettaviksi.
 *
 * Päätoimittaja 30.9.2026: nostojen kattavuus Euroopassa
 * (docs/raportit/sisaltokirjuri-nostojen-kattavuus-eurooppa-20260930.md).
 * Maalla oli vain fokuslehden kaksi nostoa; tämä erä lisää kohteet,
 * joiden koordinaatit on luettu en-Wikipedian coordinates-tiedosta ja
 * laskettu koneella (tools/johda-maastokohteet.mjs laudat) ja joiden
 * tekstit on kirjoitettu käsin en-Wikipedian artikkeleista omin sanoin.
 * Lähderivi kertoo artikkelin ja osiot. Kuvaton erä: kortti kantaa
 * tekstin ja lähteen, kuva lisätään erikseen (Commons, lisenssi
 * tarkistettuna). Vain maailmankartan rivi (Euroopan erillislauta on
 * poistettu).
 */
export const MAASTOKOHTEET_MKD = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'ohridinjarvi',
    nimi: 'Ohridinjärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Kuinka vanha Ohridinjärvi on?',
      'Kuinka monta endeemistä lajia järvessä elää?',
    ],
    korostukset: ['endeemistä|endeemistä'],
    nappi: 'Miljoonia vuosia vanha vuoristojärvi',
    // 20.7167 E / 41.0333 N — en-Wikipedia "Lake Ohrid", osiot "Geography", "Origin", "Hydrology", "Fauna" ja "World Heritage Site"
    laudat: {
      maailmankartta: { x: 6523.9, y: 1762.1 },
    },
    teksti: 'Ohridinjärvi on Pohjois-Makedonian ja Albanian rajalla sijaitseva vuoristojärvi, '
      + 'jonka pinta-ala on 358 neliökilometriä ja suurin syvyys 288 metriä. Järven '
      + 'arvioidaan syntyneen 3–5 miljoonaa vuotta sitten, ja sen vesi tulee osin '
      + 'maanalaisten karstikanavien kautta Prespajärveltä. Siellä elää yli 200 endeemistä '
      + 'lajia, joita ei tavata muualla. Pohjois-Makedonian osuus on 69 prosenttia '
      + 'pinta-alasta, ja rannalla ovat Ohrid ja Struga. Albanian puolella sijaitsee '
      + 'Pogradec. Unescon maailmanperintökohteeksi järvi merkittiin vuonna 1979, ja Albanian '
      + 'puoli liitettiin siihen vuonna 2019.',
    lahde: 'en-Wikipedia "Lake Ohrid", osiot "Geography", "Origin", "Hydrology", "Fauna" ja '
      + '"World Heritage Site" (tarkistettu 30.9.2026).',
  },
  {
    id: 'matkan-kanjoni',
    nimi: 'Matkan kanjoni',
    nimio: 'Matka',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Matkan kanjonin luola oli mukana 77 luonnonihmeen ehdokkaan joukossa?',
      'Kuinka vanha on kanjonin Pyhän Andreaksen luostari?',
    ],
    korostukset: ['Vrelo-luola|Vrelo-luola'],
    nappi: 'Luolia ja luostareita Skopjen liepeillä',
    // 21.3 E / 41.94 N — en-Wikipedia "Matka Canyon", osiot "Geology", "Vrelo Cave", "Attractions" ja "Monasteries"
    laudat: {
      maailmankartta: { x: 6543.3, y: 1726 },
    },
    teksti: 'Matkan kanjoni on Skopjen länsipuolella Pohjois-Makedoniassa, ja sen läpi virtaa '
      + 'Treska-joki. Alue kattaa noin 5 000 hehtaaria, ja kanjonissa on kymmenen luolaa, '
      + 'joiden pituus vaihtelee 20 metristä 176 metriin. Vrelo-luola Treskan oikealla '
      + 'rannalla oli mukana New7Wonders of Nature -kilpailun 77 ehdokkaan joukossa, ja sen '
      + 'uskotaan olevan yksi Euroopan syvimmistä luolista. Rinteillä on kolme luostaria, '
      + 'joista Pyhän Andreaksen luostari perustettiin noin vuonna 1388. Kanjonilla '
      + 'vaelletaan ja melotaan.',
    lahde: 'en-Wikipedia "Matka Canyon", osiot "Geology", "Vrelo Cave", "Attractions" ja '
      + '"Monasteries" (tarkistettu 30.9.2026).',
  },
  {
    id: 'stobi',
    nimi: 'Stobi',
    tyyppi: 'historia',
    kysymykset: [
      'Missä joet Erigon ja Axios kohtaavat?',
      'Minkä uskonnon rakennuksen tilalle Stobin basilika rakennettiin?',
    ],
    korostukset: ['riikinkukkomosaiikki|riikinkukkomosaiikki'],
    nappi: 'Kaupunki jokien risteyksessä',
    // 21.975 E / 41.5517 N — en-Wikipedia "Stobi", osiot "History", "Ruins" ja "Excavations"
    laudat: {
      maailmankartta: { x: 6565.8, y: 1741.5 },
    },
    teksti: 'Stobi on antiikin kaupungin raunioita Pohjois-Makedoniassa Gradskon lähellä, '
      + 'kohdassa, jossa Erigon (Crna) ja Axios (Vardar) yhtyvät. Paikalle syntyi asutus jo '
      + 'arkaaisella kaudella, ja vuonna 69 eaa. Stobi sai Rooman valtakunnassa municipiumin '
      + 'aseman; myöhemmin se oli Macedonia Salutaris -provinssin pääkaupunki. Kaupungin '
      + 'monikulttuurisuudesta kertoo synagoga, jonka tilalle rakennettiin myöhemmin '
      + 'kristillinen basilika. Stobia koettelivat ostrogoottien ryöstö vuonna 479, '
      + 'maanjäristys 518 ja 500-luvun hyökkäykset. Nykyään paikka on arkeologinen kohde, ja '
      + 'piispanbasilikan riikinkukkomosaiikki on kuvattu Pohjois-Makedonian 10 denarin '
      + 'setelissä.',
    lahde: 'en-Wikipedia "Stobi", osiot "History", "Ruins" ja "Excavations" (tarkistettu '
      + '30.9.2026).',
  },
];
