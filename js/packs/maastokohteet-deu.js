/*
 * MAASTOKOHTEET — DEU. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_DEU = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'schwerinin-linna',
    nimi: 'Schwerinin linna',
    nimio: 'Schwerin',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä ranskalaisten linnojen mukaan Schwerinin linna on muotoiltu?',
      'Mikä toimii nykyään linnassa?',
    ],
    korostukset: ['Chambord|Chambord'],
    nappi: 'Satulinna järven saarella',
    // 11.4189 E / 53.6242 N — en-Wikipedia "Schwerin Castle", johdanto, historia ja arkkitehtuuri
    laudat: {
      maailmankartta: { x: 6214, y: 1229 },
    },
    teksti: 'Schwerinin linna sijaitsee saarella Schwerinin järvessä, ja paikalla mainitaan '
      + 'slaavilainen linnake jo vuonna 973. Henrik Leijona valtasi sen vuonna 1160 ja '
      + 'vakiinnutti näin saksalaisen vallan. Nykyinen linna rakennettiin vuosina 1845–1857, '
      + 'ja vain harvat osat sitä vanhemmasta linnasta ovat säilyneet. Sen suunnitteluun '
      + 'osallistuivat muun muassa Gottfried Semper ja Friedrich August Stüler, ja esikuvina '
      + 'olivat Loiren renessanssilinnat, kuten Chambord. Linnassa toimii '
      + 'Mecklenburg-Vorpommernin osavaltion maapäivä sekä museo, ja se kuuluu vuonna 2024 '
      + 'maailmanperintölistalle otettuun Schwerinin residenssikokonaisuuteen.',
    lahde: 'en-Wikipedia "Schwerin Castle", johdanto, historia ja arkkitehtuuri (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'bambergin-vanhakaupunki',
    nimi: 'Bambergin vanhakaupunki',
    nimio: 'Bamberg',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten Bambergin raatihuoneeseen pääsee keskelle jokea?',
      'Kuka keisari on haudattu Bambergin tuomiokirkkoon?',
    ],
    korostukset: ['Vanha raatihuone|Vanha raatihuone'],
    nappi: 'Raatihuone keskellä jokea',
    // 10.8869 E / 49.8914 N — en-Wikipedia "Bamberg", osiot UNESCO, tuomiokirkko, Vanha raatihuone ja olut
    laudat: {
      maailmankartta: { x: 6196.2, y: 1394.9 },
    },
    teksti: 'Bambergin vanhakaupunki Baijerissa on ollut Unescon maailmanperintökohde vuodesta '
      + '1993 keskiaikaisen kaupunkirakenteensa ja hyvin säilyneiden historiallisten '
      + 'rakennustensa vuoksi. Keisari Henrik II perusti tuomiokirkon vuonna 1002, ja se '
      + 'vihittiin käyttöön 6. toukokuuta 1012; Henrik on haudattu sinne puolisonsa viereen. '
      + 'Vanha raatihuone rakennettiin vuonna 1386 keskelle Regnitz-jokea, ja sinne pääsee '
      + 'kahta siltaa pitkin. Nykyinen rakennus on peräisin vuosien 1744–1756 '
      + 'uudelleenrakennuksesta. Kaupunki tunnetaan myös savustetusta rauchbier-oluesta.',
    lahde: 'en-Wikipedia "Bamberg", osiot UNESCO, tuomiokirkko, Vanha raatihuone ja olut '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'naumburgin-tuomiokirkko',
    nimi: 'Naumburgin tuomiokirkko',
    nimio: 'Naumburg',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Milloin Naumburgin tuomiokirkon rakentaminen alkoi?',
      'Keitä Naumburgin lahjoittajahahmot esittävät?',
    ],
    korostukset: ['lahjoittajahahmoa|lahjoittajahahmoa'],
    nappi: 'Uta ja kahdentoista lahjoittajan patsaat',
    // 11.8039 E / 51.1547 N — en-Wikipedia "Naumburg Cathedral", osiot "History", "Description" ja "Today"
    laudat: {
      maailmankartta: { x: 6226.8, y: 1339.6 },
    },
    teksti: 'Naumburgin tuomiokirkko on Saksi-Anhaltin Naumburgissa sijaitseva kaksikuorinen '
      + 'basilika, jonka rakentaminen alkoi keväällä 1029 ja joka vihittiin käyttöön 1044. '
      + 'Varhaisgoottilainen länsikuoro lisättiin 1200-luvun puolivälissä. Kirkon tunnetuin '
      + 'taideteos on Naumburgin mestarin kaksitoista luonnollisen kokoista '
      + 'lahjoittajahahmoa, kahdeksan miestä ja neljä naista, jotka esittävät kirkon '
      + 'perustajiin kuuluneita aatelisia. Heidän joukossaan ovat markkraavi Ekkehard II ja '
      + 'tämän puoliso Uta von Ballenstedt. Kirkko liitettiin Unescon '
      + 'maailmanperintöluetteloon vuonna 2018 osana Saale- ja Unstrut-jokien '
      + 'kulttuurimaisemaa, ja se on edelleen protestanttinen seurakuntakirkko.',
    lahde: 'en-Wikipedia "Naumburg Cathedral", osiot "History", "Description" ja "Today" '
      + '(tarkistettu 30.9.2026).',
  },
];
