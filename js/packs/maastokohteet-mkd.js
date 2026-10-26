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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-ohridinjarvi-1240f347.jpg',
      lyhyt: 'Ohridinjärven turkoosi vesi, kalliorantaa ja Ohridin kaupunki taustalla.',
      selite: 'Kuvassa näkyy Ohridinjärven kirkkaan turkoosi vesi, etualalla kalliorantaa ja vastarannalla Ohridin kaupunki vuorten edessä.',
      lahde: 'Valokuva: Elen Schurova, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Elen Schurova',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:29_1_%D0%B2%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%BE%D1%82_%D0%9A%D0%B0%D0%BD%D0%B5%D0%BE.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-matkan-kanjoni-e46fcbe7.jpg',
      lyhyt: 'Jyrkät kalliot ja vihreä metsä nousevat Matkan kanjonin tyynen veden yllä.',
      selite: 'Kuvassa näkyy Matkan kanjonin tyyni vesi ja jyrkät, metsän peittämät kalliot.',
      lahde: 'Valokuva: Geoff, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Geoff',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Matka_Canyon_01.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-stobi-91e0fade.jpg',
      lyhyt: 'Stobin suuren kylpylän tiili- ja kivimuurit avoimella kaivausalueella.',
      selite: 'Kuvassa on Stobin antiikkikaupungin suuren kylpylän raunioita: punatiilisiä ja kivisiä muureja ja laattalattia.',
      lahde: 'Valokuva: Ajta, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ajta',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Large_bath_at_Stobi.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
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
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ B, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'herakleia-lynkestis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-herakleia-lynkestis-29638901.jpg',
      lyhyt: 'Herakleia Lynkestiksen kylpylän kiviraunioita vuoristomaisemassa.',
      selite: 'Kuvassa on antiikin kylpylän kivi- ja tiilimuureja, joiden takana näkyy pylväitä ja vuoria.',
      lahde: 'Valokuva: Marcin Konsek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Marcin Konsek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2011_Bitola,_Heraclea_Lyncestis_(01).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Herakleia Lynkestis',
    nimio: 'Herakleia',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka perusti Herakleia Lynkestiksen?',
      'Minkä antiikin tien varrella kaupunki sijaitsi?',
    ],
    korostukset: ['Via Egnatian|Via Egnatian'],
    nappi: 'Via Egnatian varren mosaiikkikaupunki',
    // 21.3425 E / 41.0108 N — en-Wikipedia "Heraclea Lyncestis", osiot "History" ja "Archaeology"
    laudat: {
      maailmankartta: { x: 6544.8, y: 1763 },
    },
    teksti: 'Herakleia Lynkestis on antiikin kaupungin arkeologinen kohde noin kaksi kilometriä '
      + 'Bitolan keskustasta etelään Pohjois-Makedoniassa. Makedonian kuningas Filippos II '
      + 'perusti kaupungin 300-luvun eaa. puolivälissä, ja se nimettiin Heraklesin mukaan. '
      + 'Roomalaisaikana kaupunki menestyi Via Egnatian varrella, joka yhdisti Bysantionin ja '
      + 'Adrianmeren rannikon. Kohteessa on teatteri sekä pieni ja suuri basilika, ja suuren '
      + 'basilikan narteksin lattiamosaiikki on 500-luvulta, mutta kaupunki autioitui '
      + 'vähitellen vuoden 518 maanjäristyksen ja noin vuoden 585 slaavien hyökkäysten '
      + 'jälkeen.',
    lahde: 'en-Wikipedia "Heraclea Lyncestis", osiot "History" ja "Archaeology" (tarkistettu '
      + '30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ C, 30.9.2026 — 2 KOHDETTA.
   * ============================================================== */
  {
    id: 'mavrovon-jarvi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-mavrovon-jarvi-9e3ba21b.jpg',
      lyhyt: 'Puoliksi veden peitossa oleva kirkko Mavrovon järvessä, taustalla rinteen taloja.',
      selite: 'Kuvassa kirkon katto ja kellotorni nousevat tyynestä järvestä, ja veteen heijastuvat rannan rinteelle rakennetut talot.',
      lahde: 'Valokuva: Ggia, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Ggia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20090714_Mavrovo_lake_church_summer.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    nimi: 'Mavrovon järvi ja Pyhän Nikolain kirkko',
    nimio: 'Mavrovo',
    tyyppi: 'jarvi',
    kysymykset: [
      'Kuinka syvä Mavrovon järvi on enimmillään?',
      'Mikä kirkko on järvessä puoliksi veden peitossa?',
    ],
    korostukset: ['Pyhän Nikolain kirkko|Pyhän Nikolain kirkko'],
    nappi: 'Kirkko, joka seisoo järvessä',
    // 20.75 E / 41.68 N — en-Wikipedia "Mavrovo Lake", johdanto ja infolaatikko
    laudat: {
      maailmankartta: { x: 6525, y: 1736.4 },
    },
    teksti: 'Mavrovon järvi on tekojärvi Pohjois-Makedonian länsiosassa, alle sadan kilometrin '
      + 'päässä Skopjesta. Sen pinta-ala on 1 370 hehtaaria, pisimmillään järvi on noin 10 '
      + 'kilometriä ja syvimmillään 50 metriä. Pohjoisessa kohoavat Šar-vuoret ja etelässä '
      + 'Bistran vuoret, joiden huiput ylittävät 2 500 metriä. Rannan tunnetuin nähtävyys on '
      + 'Pyhän Nikolain kirkko, joka seisoo järvessä vain puoliksi veden peitossa. Alue on '
      + 'kuulunut Mavrovon kansallispuistoon vuodesta 1952, ja kesällä järvellä uidaan, '
      + 'soudetaan ja kalastetaan taimenia.',
    lahde: 'en-Wikipedia "Mavrovo Lake", johdanto ja infolaatikko (tarkistettu 30.9.2026).',
  },
  {
    id: 'kokinon-observatorio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mkd-nosto-kokinon-observatorio-47e48a75.jpg',
      lyhyt: 'Kivinen harjanne Kokinon huipulla, polku kallioiden välissä.',
      selite: 'Kuvassa nousee jäkälän peittämä kallioharjanne, jonka lomassa kulkee polku, ja huipulla näkyy muutama kävijä.',
      lahde: 'Valokuva: BrankaVV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'BrankaVV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_observatory_Kokino,_Macedonia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Kokino',
    nimio: 'Kokino',
    tyyppi: 'historia',
    kysymykset: [
      'Miltä ajalta Kokinon löydöt ovat?',
      'Miksi observatoriotulkinta on kiistanalainen?',
    ],
    korostukset: ['aurinko-observatorioksi|aurinko-observatorioksi'],
    nappi: 'Aurinko-observatorio vai sattumaa?',
    // 21.9539 E / 42.2631 N — en-Wikipedia "Kokino", johdanto ja infolaatikko
    laudat: {
      maailmankartta: { x: 6565.1, y: 1713 },
    },
    teksti: 'Kokino on pronssikautinen arkeologinen kohde Tatićev Kamen -huipulla '
      + 'Pohjois-Makedoniassa, noin 30 kilometrin päässä Kumanovosta. Alue sijaitsee 1 010–1 '
      + '030 metrin korkeudessa, ja löydöt ulottuvat 1800-luvulta eaa. aina 600-luvulle eaa. '
      + 'Kahdella tasanteella sijaitseva kalliokohde tulkitaan pronssikautiseksi '
      + 'aurinko-observatorioksi, ja alemmalla tasanteella on neljä kiviistuinta. Tulkinta on '
      + 'kuitenkin kiistanalainen: asiantuntijoiden mukaan tähtäyspisteitä ja merkkejä on '
      + 'niin paljon, että suuntaukset voivat olla sattumaa.',
    lahde: 'en-Wikipedia "Kokino", johdanto ja infolaatikko (tarkistettu 30.9.2026).',
  },
];
