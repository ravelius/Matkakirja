/*
 * MAASTOKOHTEET — MDA. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_MDA = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'sorokan-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-sorokan-linnoitus-6e893692.jpg',
      lyhyt: 'Sorokan pyöreistä torneista ja rintavarustuksista koostuva kivilinnoitus.',
      selite: 'Kuvassa on Sorokan linnoitus ulkoa: pyöreät kivitornit teräväkärkisine kattoineen ja muurit nurmikon takana.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fuerte_de_Soroca,_Soroca,_Moldavia,_2023-11-01,_DD_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Sorokan linnoitus',
    nimio: 'Soroca',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti linnoituksen ensimmäisen, puisen version?',
      'Kuinka monta bastionia kivilinnoituksessa on?',
    ],
    korostukset: ['viisi bastionia|viisi bastionia'],
    nappi: 'Pyöreä linna Dnestrin rannalla',
    // 28.3055 E / 48.1612 N — en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture"
    laudat: {
      maailmankartta: { x: 6776.8, y: 1469.4 },
    },
    teksti: 'Sorokan linnoitus on Moldovan Dnestr-joen rannalla sijaitseva pyöreä linnake, jonka '
      + 'alkuperäisen puisen varustuksen Tapani Suuri rakennutti vuonna 1499 suojaamaan joen '
      + 'kahlaamoa. Kivilinnoituksen Petru Rareș rakennutti vuosina 1543–1546, ja siinä on '
      + 'viisi bastionia tasaisin välein. Halkaisijaltaan linnoitus on noin 30 metriä, muurit '
      + 'ovat kolme metriä paksut ja tornit nelikerroksisia, joista alimmat kerrokset oli '
      + 'tarkoitettu tykeille. Restaurointi on valmis, ja linnoitus on Moldovan kansallisesti '
      + 'merkittävä historiallinen ja arkkitehtoninen muistomerkki.',
    lahde: 'en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture" (tarkistettu '
      + '30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'milestii-mici',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/mda-nosto-milestii-mici-55e1363a.jpg',
      lyhyt: 'Viinipulloilla täytetty maanalainen käytävä Mileștii Micissä.',
      selite: 'Kuvassa näkyy pitkä maanalainen käytävä, jonka seinillä on holvattuja koloja täynnä makaavia viinipulloja.',
      lahde: 'Valokuva: Z thomas, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Z thomas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mile%C8%99tii_Mici_20250406_1.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Mileștii Mici',
    tyyppi: 'ruoka',
    kysymykset: [
      'Kuinka pitkä on viinikellarin tunnelien verkosto?',
      'Miten viinit kerrotaan säilyneen, kun ne käskettiin tuhota?',
    ],
    korostukset: ['250 kilometriä|250 kilometriä'],
    nappi: 'Kaksi miljoonaa pulloa maan alla',
    // 28.7959 E / 46.9008 N — en-Wikipedia "Mileștii Mici", osiot "History" ja "Wine cellars"
    laudat: {
      maailmankartta: { x: 6793.2, y: 1522.7 },
    },
    teksti: 'Mileștii Mici on viinikellari Ialovenin piirikunnassa Moldovassa, noin 18 kilometrin '
      + 'päässä pääkaupungista Chișinăusta. Maanalainen käytäväverkosto on Wikipedian mukaan '
      + '250 kilometriä pitkä, mutta siitä on käytössä vain 120 kilometriä. Guinnessin '
      + 'ennätyskirja kirjasi kellareihin kaksi miljoonaa pulloa maailman suurimmaksi '
      + 'viinikokoelmaksi. Neuvostoaikana työntekijöiden kerrotaan tehneen salaoven, jonka '
      + 'taakse viinit kätkettiin, kun ne määrättiin tuhottaviksi.',
    lahde: 'en-Wikipedia "Mileștii Mici", osiot "History" ja "Wine cellars" (tarkistettu '
      + '30.9.2026).',
  },
];
