/*
 * MAASTOKOHTEET — JOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs JOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/JOR.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Jordanian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kuollutmeri on annettu Jordanialle (rantavaltioista pelin oma maa).
 */
export const MAASTOKOHTEET_JOR = [
  {
    id: 'jabalummaddami',
    nimi: 'Jabal Umm ad Dami',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Wadi Rum on?',
      'Miten korkeus varmistettiin?',
    ],
    korostukset: ['Wadi Rum|Wadi Rumin'],
    nappi: 'Jordanian korkein, Wadi Rumin perukoilla',
    // 35.4292 E / 29.3083 N — en-Wikipedia "Jabal Umm ad Dami"
    laudat: {
      maailmankartta: { x: 7014.3, y: 2206.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jabal Umm ad Dami on Jordanian korkein vuori: 1 854 metriä Wadi Rumin autiomaassa maan '
      + 'eteläkärjessä, aivan Saudi-Arabian rajan tuntumassa. Pitkään maan korkeimpana '
      + 'pidettiin muita Wadi Rumin huippuja, kunnes satelliittimittaukset vahvistivat tämän '
      + 'syrjäisen huipun lukeman. Kirkkaalla säällä laelta näkee Punaisellemerelle asti.',
    lahde: 'en-Wikipedia "Jabal Umm ad Dami", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kuollutmeri',
    nimi: 'Kuollutmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi vedessä ei voi upota?',
      'Mistä nimi Kuollutmeri tulee?',
    ],
    korostukset: ['Jordanin hautavajoama|Jordanin hautavajoamassa'],
    nappi: 'Maapallon matalin ranta',
    // 35.5 E / 31.5 N — järven keskiallas; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 7016.7, y: 2125.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kuollutmeri on suolajärvi Jordanin hautavajoamassa Jordanian ja sen länsinaapureiden '
      + 'välissä, ja sen ranta on maapallon matalin kuiva kohta: pinta on vajonnut jo lähes 440 '
      + 'metriä merenpinnan alapuolelle. Vesi on noin kymmenen kertaa valtamerta suolaisempaa '
      + 'ja niin tiheää, että uimari kelluu siinä kuin korkki. Suola tekee elämän lähes '
      + 'mahdottomaksi — siitä järven nimi.',
    lahde: 'en-Wikipedia "Dead Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jordan',
    nimi: 'Jordan',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä järvien läpi ja mihin joki virtaa?',
      'Miksi joki on pyhä kolmelle uskonnolle?',
    ],
    korostukset: ['Kuollutmeri|Kuolleeseenmereen'],
    nappi: 'Joki, jolta maa sai nimensä',
    // 35.55 E / 32.2 N — Jordanin laakso Galileanjärven eteläpuolella; artikkelin koordinaatti 35,62 / 33,19 on latvoilla lehden ikkunan ulkopuolella
    laudat: {
      maailmankartta: { x: 7018.3, y: 2100.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jordan on 251 kilometrin mittainen joki, joka virtaa pohjoisesta etelään '
      + 'Galileanjärven läpi ja laskee Kuolleeseenmereen — valtamereen sen vedet eivät koskaan '
      + 'pääse. Sekä Jordanian valtio että Länsiranta ovat saaneet nimensä tästä joesta. '
      + 'Juutalaisuudelle, kristinuskolle ja islamille se on pyhä virta: Raamatun mukaan '
      + 'israelilaiset ylittivät sen luvattuun maahan ja Johannes Kastaja kastoi siinä '
      + 'Jeesuksen.',
    lahde: 'en-Wikipedia "Jordan River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

