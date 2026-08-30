/*
 * MAASTOKOHTEET — GHA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GHA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GHA.json. Työkalu laskee laudan
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
 * Ghanan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Vuoreksi on valittu Afadja, Ghanan tunnetuin vuori: artikkeli kertoo, että huippu ilmoitetaan usein 885-metriseksi mutta on todellisuudessa 587 m, ja että maan korkein huippu on viereinen Leklata — Leklatalla ei ole omaa artikkelia, joten kohteeksi sopii vain Afadja. Korkeuskentässä on artikkelin tietolaatikon 885 m, ja tarina kerrotaan tekstissä.
 */
export const MAASTOKOHTEET_GHA = [
  {
    id: 'afadja',
    nimi: 'Afadja',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea Afadja oikeasti on?',
      'Mikä on Ghanan korkein huippu?',
    ],
    korostukset: ['Togo|Togon'],
    nappi: 'Vuori, jota maine kasvattaa',
    // 0.6033 E / 7.0269 N — en-Wikipedia "Mount Afadja"
    laudat: {
      maailmankartta: { x: 5853.4, y: 2976.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Afadja, ewen kielellä Afadjato, on Ghanan kuuluisimpia vuoria. Se kohoaa Voltan '
      + 'alueella Togon rajan tuntumassa, noin 178 kilometrin päässä sekä Accrasta että '
      + 'Lomésta. Huipun korkeudeksi ilmoitetaan usein 885 metriä, mutta todellisuudessa se '
      + 'yltää vain 587 metriin — ja Ghanan korkein huippu on sitä paitsi viereinen Leklata '
      + 'muutaman kilometrin päässä idässä.',
    lahde: 'en-Wikipedia "Mount Afadja", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä ihmeen Null Island?',
      'Mitkä suuret joet laskevat Guineanlahteen?',
    ],
    korostukset: ['päiväntasaaja|päiväntasaaja'],
    nappi: 'Lahti, jossa nolla kohtaa nollan',
    // -0.5 E / 5.2 N — ulappa Accran edustalla; en-Wikipedia "Gulf of Guinea" antaa keskipisteeksi 0 / 0
    laudat: {
      maailmankartta: { x: 5816.7, y: 3038 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa, ja Ghanan koko rannikko on sen '
      + 'rantaa. Lahdella sijaitsee maapallon koordinaattien nollapiste: kohta, jossa '
      + 'päiväntasaaja ja Greenwichin nollameridiaani leikkaavat, on saanut kartantekijöiltä '
      + 'leikillisen nimen Null Island. Lahteen laskevat monet suuret joet, muun muassa Niger '
      + 'ja Ghanan oma Volta.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'voltajarvi',
    nimi: 'Voltajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä pato synnytti Voltajärven?',
      'Mistä Ghanan sähkö tulee?',
    ],
    nappi: 'Maailman suurin tekojärvi',
    // 0 E / 6.5 N — en-Wikipedia "Lake Volta" (0 / 6,5)
    laudat: {
      maailmankartta: { x: 5833.3, y: 2994.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Voltajärvi on pinta-alaltaan maailman suurin tekojärvi: 8 502 neliökilometriä, '
      + 'kokonaan Ghanan sisällä. Se patoutui Akosombon padon taakse, joka tuottaa huomattavan '
      + 'osan Ghanan sähköstä, ja ulottuu etelän Akosombosta maan pohjoisosaan Tamalen '
      + 'lounaispuolelle asti.',
    lahde: 'en-Wikipedia "Lake Volta", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

