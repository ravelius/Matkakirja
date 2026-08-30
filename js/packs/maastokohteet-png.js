/*
 * MAASTOKOHTEET — PNG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PNG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PNG.json. Työkalu laskee laudan
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
 * Papua-Uuden-Guinean maastokohteet. Faktat en-Wikipediasta 30.8.2026; suomalainen nimiasu Bismarckinmeri fi-Wikipediasta, ja joki on fi-Wikipediassa Sepik (pelissä kartalle luettavampi Sepikjoki). Sepikin merkki on joen suulla ja Bismarckinmeren merkki ulapalla saaren pohjoispuolella, koska merellä ei ole artikkelissa keskipistettä.
 */
export const MAASTOKOHTEET_PNG = [
  {
    id: 'mountwilhelm',
    nimi: 'Mount Wilhelm',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi päiväntasaajan lähellä voi sataa lunta?',
      'Miksi huiput nimettiin saksalaisten mukaan?',
    ],
    korostukset: ['Bismarckin vuoristo|Bismarckin vuoristossa'],
    nappi: 'Oseanian korkein kohta',
    // 145.0333 E / -5.8 N — en-Wikipedia "Mount Wilhelm"
    laudat: {
      maailmankartta: { x: 10667.8, y: 3405 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Wilhelm on Papua-Uuden-Guinean korkein vuori, 4 509 metriä. Se kohoaa Bismarckin '
      + 'vuoristossa kolmen maakunnan — Chimbun, Jiwakan ja Madangin — kohtauspisteessä. '
      + 'Saksalainen kirjeenvaihtaja Hugo Zöller nimesi vuoriston huiput vuonna 1888 Otto von '
      + 'Bismarckin ja tämän lasten mukaan; kuman kielellä huippu on Enduwa Kombuglu eli '
      + 'Kombugl’o Dimbin. Päiväntasaajan läheisyydestä huolimatta laella on nähty lunta. '
      + 'Ensimmäisen kirjatun nousun teki Leigh Vial elokuussa 1938, ja nousuun kuluu reitistä '
      + 'riippuen yhdeksästä kahteenkymmeneenneljään tuntia. Poliittisin rajoin laskettuna '
      + 'vuori on Oseanian korkein kohta.',
    lahde: 'en-Wikipedia "Mount Wilhelm", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'bismarckinmeri',
    nimi: 'Bismarckinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi meren alla järisee niin usein?',
      'Mikä on Bismarckin saaristo?',
    ],
    korostukset: ['laatta|laattaa'],
    nappi: 'Tuliperäinen reunameri',
    // 148 E / -4.2 N — ulappa Uuden-Guinean pohjoispuolella; artikkelissa ei ole meren keskipistettä
    laudat: {
      maailmankartta: { x: 10766.7, y: 3351.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bismarckinmeri on Tyynenmeren reunameri Uuden-Guinean koillispuolella. Sitä rajaa '
      + 'Bismarckin saaristo: pohjoisessa Admiraliteettisaaret, idässä ja etelässä '
      + 'Uusi-Britannia ja Uusi-Irlanti. Pinta-alaa on 250 400 neliökilometriä, ja '
      + 'Vitiazinsalmi yhdistää meren etelässä Salomoninmereen. Pohjan alla liikkuu kaksi omaa '
      + 'laattaa, eteläinen ja pohjoinen Bismarckin laatta, ja ne selittävät Melanesian '
      + 'tulivuorikaaren ja meren alla jyskyttävät maanjäristykset. Maaliskuussa 1943 näillä '
      + 'vesillä käytiin Bismarckinmeren taistelu, joka päättyi japanilaisten raskaaseen '
      + 'tappioon.',
    lahde: 'en-Wikipedia "Bismarck Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sepikjoki',
    nimi: 'Sepikjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on juoluajärvi?',
      'Millaista taidetta Sepikin varrella tehdään?',
    ],
    korostukset: ['tulvatasanko|tulvatasankoa'],
    nappi: 'Suuri joki ilman suistoa',
    // 144.5417 E / -3.8417 N — joen suu Bismarckinmerellä; en-Wikipedia "Sepik River" tietolaatikko (3°50′30″S 144°32′30″E)
    laudat: {
      maailmankartta: { x: 10651.4, y: 3339.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sepikjoki on Uuden-Guinean suurimpia jokia: 1 126 kilometriä pitkä, ja sen valuma-alue '
      + 'kattaa 80 321 neliökilometriä. Erikoisuus on suisto, jota ei ole — joki laskee suoraan '
      + 'mereen noin sadan kilometrin päässä Wewakista itään. Mutkitteleva uoma on kaivertanut '
      + 'jopa 70 kilometriä leveää tulvatasankoa, jossa on laajoja soita ja noin 1 500 '
      + 'juoluajärveä. Kokonaisuus on ehkä koko Aasian ja Tyynenmeren alueen laajin saastumaton '
      + 'makean veden kosteikko. Sepikin kylät tunnetaan puuveistoksistaan, savikeramiikastaan '
      + 'ja ontoista puunrungoista veistetyistä garamut-rummuista.',
    lahde: 'en-Wikipedia "Sepik River", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
];

