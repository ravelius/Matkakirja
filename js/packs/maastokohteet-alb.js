/*
 * MAASTOKOHTEET — ALB. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_ALB = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 3 KOHDETTA.
   * ============================================================== */
  {
    id: 'rozafan-linna',
    nimi: 'Rozafan linna',
    nimio: 'Rozafa',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka muurattiin Rozafan linnan seinään?',
      'Mitä kalkkikivestä valuva maito on tarun mukaan?',
    ],
    korostukset: ['Rozafa|Rozafa'],
    nappi: 'Muurin sisään muurattu äiti',
    // 19.4935 E / 42.0465 N — en-Wikipedia "Rozafa Castle", osiot "Legend", "History" ja "Present"
    laudat: {
      maailmankartta: { x: 6483.1, y: 1721.7 },
    },
    teksti: 'Rozafan linna kohoaa Shkodërin kaupungissa Luoteis-Albaniassa kalliokukkulalla, joka '
      + 'nousee 130 metriä merenpinnan yläpuolelle Bunan ja Drinin jokien väliin. Vanhimmat '
      + 'linnoitusmuurit ovat antiikin ajalta, mutta nykyiset rakenteet ovat pääosin '
      + 'venetsialaisia. Paikan tunnetuin taru kertoo kolmesta veljestä, joiden rakentama '
      + 'muuri sortui yhä uudelleen, kunnes nuorimman veljen vaimo Rozafa muurattiin elävänä '
      + 'seinään. Hän pyysi jättämään auki aukot silmälle, kädelle, jalalle ja rinnalle, '
      + 'jotta voisi hoivata vauvaansa. Tarun mukaan kalkkikivestä valuva maito on Rozafan '
      + 'maitoa. Linna on nykyisin avoin arkeologinen puisto ja museo.',
    lahde: 'en-Wikipedia "Rozafa Castle", osiot "Legend", "History" ja "Present" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'beratin-vanhakaupunki',
    nimi: 'Beratin vanhakaupunki',
    nimio: 'Berat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi Beratia sanotaan tuhannen ikkunan kaupungiksi?',
      'Kuinka monta kirkkoa Beratin linnassa oli aikoinaan?',
    ],
    korostukset: ['tuhannen ikkunan kaupungiksi|tuhannen ikkunan kaupungiksi'],
    nappi: 'Tuhannen ikkunan kaupunki',
    // 19.9583 E / 40.7022 N — en-Wikipedia "Berat" ja "Historic Centres of Berat and Gjirokastra"
    laudat: {
      maailmankartta: { x: 6498.6, y: 1775.2 },
    },
    teksti: 'Berat on Etelä-Albanian kaupunki Osum-joen rannalla, ja sitä kutsutaan tuhannen '
      + 'ikkunan kaupungiksi, koska vanhojen ottomaanikautisten talojen suuret ikkunat '
      + 'katsovat rinteeltä alas kaupunkiin. Vanhakaupunki jakautuu kolmeen osaan: linnamäen '
      + 'Kalajaan, sen juurella olevaan Mangalemiin ja joen toisella puolella olevaan '
      + 'Goricaan. Linnan muureja vahvistettiin 400-luvulla Bysantin keisari Theodosios II:n '
      + 'aikana, ja niitä rakennettiin uudelleen 500- ja 1200-luvuilla. Linnan sisällä oli '
      + 'aikoinaan noin 20 kirkkoa ja yksi moskeija, ja useimmat kirkoista olivat '
      + '1200-luvulta. Berat liitettiin Unescon maailmanperintöluetteloon Gjirokastërin '
      + 'rinnalle vuonna 2008.',
    lahde: 'en-Wikipedia "Berat" ja "Historic Centres of Berat and Gjirokastra" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'valbonan-laakso',
    nimi: 'Valbonan laakso',
    nimio: 'Valbona',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea on laakson ylin huippu Maja Jezercë?',
      'Mistä Valbona-joki saa alkunsa?',
    ],
    korostukset: ['Maja Jezercë|Maja Jezercë'],
    nappi: 'Albanian Alppien jäätikkölaakso',
    // 19.8878 E / 42.4533 N — en-Wikipedia "Valbona Valley National Park", osiot "Geography", "Fauna" ja "Settlements"
    laudat: {
      maailmankartta: { x: 6496.3, y: 1705.4 },
    },
    teksti: 'Valbonan laakso on Pohjois-Albanian Kukësin alueella sijaitseva jäätikön muovaama '
      + 'U-muotoinen laakso, jonka ympärille perustettiin 80 neliökilometrin kansallispuisto '
      + 'tammikuussa 1996. Alue kuuluu Albanian Alppeihin, ja sen korkein huippu Maja Jezercë '
      + 'nousee 2 694 metriin. Valbona-joki on lähes 51 kilometriä pitkä ja saa alkunsa '
      + 'Jezercën lähellä olevista karstilähteistä. Metsät peittävät puiston pinta-alasta 89 '
      + 'prosenttia, ja siellä elää ruskeakarhuja, susia, ilveksiä ja gemssejä. Laaksossa on '
      + 'neljä kylää, joista Valbonë on yksi.',
    lahde: 'en-Wikipedia "Valbona Valley National Park", osiot "Geography", "Fauna" ja '
      + '"Settlements" (tarkistettu 30.9.2026).',
  },
];
