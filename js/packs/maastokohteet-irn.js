/*
 * MAASTOKOHTEET — IRN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRN.json. Työkalu laskee laudan
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
 * Iranin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Persianlahti on annettu ARE:lle, joten Iranin meri on Kaspianmeri.
 */
export const MAASTOKOHTEET_IRN = [
  {
    id: 'damavand',
    nimi: 'Damavand',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Damavand on persialaisten tarujen vuori?',
      'Voiko uinuva tulivuori herätä?',
    ],
    korostukset: ['Alborz|Alborzin'],
    nappi: 'Aasian korkein tulivuori',
    // 52.109 E / 35.951 N — en-Wikipedia "Mount Damavand"
    laudat: {
      maailmankartta: { x: 7570.3, y: 1959.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Damavand on uinuva kerrostulivuori Alborzin vuoristossa, vain 66 kilometriä '
      + 'Teheranista koilliseen ja lähellä Kaspianmeren etelärantaa. Sen 5 610 metriä tekevät '
      + 'siitä Iranin ja koko Länsi-Aasian korkeimman huipun — ja samalla Aasian korkeimman '
      + 'tulivuoren. Persialaisessa mytologiassa vuorella on aivan oma sijansa: taruissa sen '
      + 'uumeniin on kahlittu hirviöitä maailmanloppua odottamaan.',
    lahde: 'en-Wikipedia "Mount Damavand", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kaspianmeri',
    nimi: 'Kaspianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Onko Kaspianmeri järvi vai meri?',
      'Keitä olivat kaspit?',
    ],
    korostukset: ['kaspit|kaspien'],
    nappi: 'Maailman suurin järvi — vai meri?',
    // 51.5 E / 37.6 N — ulappa Iranin pohjoisrannikon edustalla; artikkelin oma keskipiste 50,5 / 42 on keskiallasta pohjoisempana
    laudat: {
      maailmankartta: { x: 7550, y: 1896.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kaspianmeri on maailman suurin sisävesi: pinta-alaa 371 000 neliökilometriä eli '
      + 'suunnilleen Japanin verran. Nimestään huolimatta se on umpinainen allas, josta ei ole '
      + 'yhteyttä valtameriin, ja siksi sitä kutsutaan myös maailman suurimmaksi järveksi — '
      + 'vaikka vesi on suolaista, noin kolmanneksen valtameren suolaisuudesta. Rantavaltioita '
      + 'on viisi, ja nimi tulee muinaiselta iranilaiskansalta, kaspeilta.',
    lahde: 'en-Wikipedia "Caspian Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'karun',
    nimi: 'Karun',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi vain yhtä Iranin jokea voi purjehtia?',
      'Minne Karunin vesi lopulta päätyy?',
    ],
    korostukset: ['Zagros|Zagrosin'],
    nappi: 'Iranin ainoa laivakelpoinen joki',
    // 48.67 E / 31.33 N — Ahvazin kohdalla; artikkelin koordinaatti 48,17 / 30,43 on joen suulla Shatt al-Arabissa
    laudat: {
      maailmankartta: { x: 7455.7, y: 2132.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Karun on Iranin vesirikkain joki ja maan ainoa, jota laivat voivat kulkea. Se saa '
      + 'alkunsa Zagrosin vuoriston Zard Kuhilta ja virtaa 950 kilometriä Khuzestanin maakunnan '
      + 'pääkaupungin Ahvazin kautta, kunnes laskee Shatt al-Arabiin ja sitä pitkin '
      + 'Persianlahteen. Antiikin kreikkalaiset tunsivat sen nimellä Eulaios.',
    lahde: 'en-Wikipedia "Karun", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

