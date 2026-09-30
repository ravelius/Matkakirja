/*
 * MAASTOKOHTEET — SRB. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_SRB = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 2, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'belgradin-linnoitus',
    nimi: 'Belgradin linnoitus (Kalemegdan)',
    nimio: 'Kalemegdan',
    tyyppi: 'historia',
    kysymykset: [
      'Missä joet kohtaavat linnoituksen juurella?',
      'Kuinka kauan ottomaanit hallitsivat linnoitusta?',
    ],
    korostukset: ['vuoteen 1867|vuoteen 1867'],
    nappi: 'Linnoitus jokien yhtymäkohdassa',
    // 20.4503 E / 44.8233 N — en-Wikipedia "Belgrade Fortress"
    laudat: {
      maailmankartta: { x: 6515, y: 1609.1 },
    },
    teksti: 'Belgradin linnoitus eli Kalemegdan kohoaa 125,5 metriä korkealla harjanteella, jonka '
      + 'juurella Sava yhtyy Tonaviin. Alue on noin 66 hehtaarin laajuinen, ja siihen kuuluu '
      + 'Suuri ja Pieni Kalemegdanin puisto. Ottomaanit valloittivat linnoituksen vuonna '
      + '1521, ja se pysyi heidän hallinnassaan vuoteen 1867. Vuonna 1979 se sai Serbiassa '
      + 'erityisen tärkeän kulttuurimonumentin aseman. Nykyään linnoituksen alue on '
      + 'kaupunkilaisten suosima puisto.',
    lahde: 'en-Wikipedia "Belgrade Fortress" (tarkistettu 30.9.2026).',
  },
  {
    id: 'studenican-luostari',
    nimi: 'Studenican luostari',
    nimio: 'Studenica',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Millaista kiveä luostarin julkisivuissa on?',
      'Kuka perusti Studenican luostarin?',
    ],
    korostukset: ['1196|1196'],
    nappi: 'Marmorinen luostari Serbian vuorilla',
    // 20.5367 E / 43.4861 N — en-Wikipedia "Studenica Monastery", johdanto ja infolaatikko
    laudat: {
      maailmankartta: { x: 6517.9, y: 1663.7 },
    },
    teksti: 'Studenican luostari sijaitsee Keski-Serbiassa Kraljevon lähellä, ja Stefan Nemanja '
      + 'perusti sen 1100-luvun lopulla; ensimmäinen rakennusvaihe valmistui kevääksi 1196. '
      + 'Pääkirkko, Neitsyt Marian temppeli, on kupolillinen yksilaivainen basilika, jonka '
      + 'julkisivut ovat valkoista marmoria, ja tyylissä yhdistyvät romaaninen ja '
      + 'bysanttilainen rakennustaide. Seinillä on bysanttilaisia freskoja vuosilta '
      + '1208–1209, muun muassa tunnettu ristiinnaulitsemiskuva. Luostarin perustaja Nemanja '
      + 'on haudattu sinne. Studenica on ollut Unescon maailmanperintökohde vuodesta 1986.',
    lahde: 'en-Wikipedia "Studenica Monastery", johdanto ja infolaatikko (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'djavolja-varos',
    nimi: 'Đavolja varoš (Pirunkaupunki)',
    nimio: 'Pirunkaupunki',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä suojaa pylväitä kulumiselta?',
      'Mihin kansantarina selittää pylväiden synnyn?',
    ],
    korostukset: ['andesiittinen kansi|andesiittinen kansi'],
    nappi: 'Kivipylväät, jotka olivat häävieraita',
    // 21.4072 E / 42.9925 N — en-Wikipedia "Đavolja Varoš", johdanto, geologia, legenda ja suojelu
    laudat: {
      maailmankartta: { x: 6546.9, y: 1683.7 },
    },
    teksti: 'Đavolja varoš eli Pirunkaupunki sijaitsee Radan-vuorella Kuršumlijan kunnassa '
      + 'Toplican piirikunnassa, noin 700 metrin korkeudessa. Alueella on noin 202 '
      + 'maapylvästä, jotka ovat 2–15 metriä korkeita ja tyveltä 4–6 metriä leveitä. Ne ovat '
      + 'syntyneet tulivuoritoiminnan leimaamalla alueella eroosion kuluttaessa maaperää, ja '
      + 'useimpien pylväiden päällä on andesiittinen kansi, joka suojaa niitä kulumiselta. '
      + 'Nimeen liittyvän kansantarinan mukaan häävieraat muuttuivat kiveksi. Alueella on '
      + 'kaksi kivennäisrikasta lähdettä, ja valtio on suojellut kohdetta vuodesta 1959.',
    lahde: 'en-Wikipedia "Đavolja Varoš", johdanto, geologia, legenda ja suojelu (tarkistettu '
      + '30.9.2026).',
  },
];
