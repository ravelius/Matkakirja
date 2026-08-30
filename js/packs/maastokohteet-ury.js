/*
 * MAASTOKOHTEET — URY. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs URY --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/URY.json. Työkalu laskee laudan
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
 * Uruguayn maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Río de la Plata sellaisenaan (suom. Hopeajoki), Cerro Catedral espanjankielisenä erisnimenä. Estuaari on tarkoituksella myös Argentiinan pakissa — se on maiden yhteinen raja — mutta piste, nappi, kysymykset ja teksti ovat eri: Argentiinassa katsotaan estuaarin mittoja, täällä sen rantoja.
 */
export const MAASTOKOHTEET_URY = [
  {
    id: 'cerrocatedral',
    nimi: 'Cerro Catedral',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko 514 metriä olla koko maan korkein kohta?',
      'Mistä kukkula sai tuomiokirkon nimen?',
    ],
    nappi: 'Uruguayn korkein kohta',
    // -54.6744 E / -34.3822 N — en-Wikipedia "Cerro Catedral (Uruguay)" (-54,674 / -34,382)
    laudat: {
      maailmankartta: { x: 4010.9, y: 4404.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cerro Catedral eli Tuomiokirkkokukkula on Uruguayn korkein kohta, 513,66 metriä. Se '
      + 'sijaitsee Maldonadon departementin pohjoisosassa Aiguán kunnassa, Sierra Carapén '
      + 'kukkulajonossa, joka puolestaan kuuluu laajempaan Cuchilla Grandeen. Toinen nimi '
      + 'kukkulalle on Cerro Cordillera. Nimi tulee huipun kallioiden omalaatuisista muodoista, '
      + 'joita tavataan yleisesti maan eteläosassa. Uruguay on niin loivapiirteistä '
      + 'ruohotasankoa, ettei koko maassa ole yhtään varsinaista vuorta — puolen kilometrin '
      + 'kukkula riittää kruunuksi.',
    lahde: 'en-Wikipedia "Cerro Catedral (Uruguay)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'riodelaplata',
    nimi: 'Río de la Plata',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on estuaari?',
      'Mitä yhteistä on Montevideolla ja Buenos Airesilla?',
    ],
    korostukset: ['estuaari|estuaari'],
    nappi: 'Montevideon edustan hopeavesi',
    // -56.2 E / -34.95 N — estuaarin Uruguayn-puoleinen selkä Montevideon edustalla; en-Wikipedia "Río de la Plata" antaa keskipisteeksi -55,78 / -35,67
    laudat: {
      maailmankartta: { x: 3960, y: 4425.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Río de la Plata on estuaari, joka syntyy Uruguayjoen ja Paranájoen yhtyessä ja laskee '
      + 'Atlantin valtamereen. Se muodostaa osan Uruguayn ja Argentiinan rajasta, ja sen '
      + 'pohjoisrannalla on Uruguayn pääkaupunki Montevideo. Nimeä käytetään myös estuaarin '
      + 'väestä: molemmilla rannoilla puhutaan rioplatensen espanjaa ja sieltä on lähtöisin '
      + 'tangon kulttuuri. Rannat ovat sekä Uruguayn että Argentiinan tiheimmin asuttua seutua. '
      + 'Nimi tarkoittaa hopeajokea, ja suomeksi estuaarista käytetäänkin joskus asua '
      + 'Hopeajoki.',
    lahde: 'en-Wikipedia "Río de la Plata", johdanto-osa (tarkistettu 30.8.2026); suomenkielinen '
      + 'asu Hopeajoki fi-Wikipedia "Río de la Plata".',
  },
];

