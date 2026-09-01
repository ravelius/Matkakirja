/*
 * MAASTOKOHTEET — MLI. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MLI --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MLI.json. Työkalu laskee laudan
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
 * Malin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mali on sisämaavaltio ilman suurta pysyvää järveä, joten meret-lista on tyhjä ja jokia on kaksi. Vuoren nimi on paikallinen Hombori Tondo (en "Mount Hombori"); fi-Wikipedia tuntee vuorijonon nimellä Homborivuoret.
 */
export const MAASTOKOHTEET_MLI = [
  {
    id: 'homboritondo',
    nimi: 'Hombori Tondo',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi ylätasangolla kasvaa enemmän kuin ympäröivällä tasangolla?',
      'Mitä Hombori Tondon luolista on löydetty?',
    ],
    korostukset: ['Homborivuoret|Homborivuorten'],
    nappi: 'Malin korkein kohta',
    // -1.6689 E / 15.2572 N — en-Wikipedia "Mount Hombori"
    laudat: {
      maailmankartta: { x: 5777.7, y: 2699 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kahden neliökilometrin kokoisella ylätasangolla kasvaa 150 kasvilajia; sen ympärillä '
      + 'leviävällä kymmenentuhannen neliökilometrin tasangolla vain noin kaksisataa. Ero on '
      + 'Hombori Tondon jyrkänteiden ansiota: Malin korkeinta kohtaa, 1 155 metriä, ympäröivät '
      + 'joka puolelta pystysuorat seinämät, eivätkä karjalaumat pääse laelle laiduntamaan. '
      + 'Niin ylätasangosta on tullut turvapaikka, jossa monen eteläisen lajin — muun muassa '
      + 'Bombax costatum -puun — levinneisyys yltää pohjoisimmilleen. Kalliokoloissa elää '
      + 'kalliotamaaneja ja oliivipaviaaneja. Homborivuorten luolissa on lisäksi asuttu yli '
      + 'kaksituhatta vuotta sitten, ja ne ovat Sahelin merkittäviä arkeologisia kohteita.',
    lahde: 'en-Wikipedia "Mount Hombori", johdanto-osa sekä osiot "Biodiversity" ja "Archaeology" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'niger',
    nimi: 'Niger',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki virtaa puolikuun muotoisen kaaren?',
      'Mikä on Nigerin sisämaasuisto?',
    ],
    korostukset: ['Guinean ylänkö|Guinean ylängöltä'],
    nappi: 'Länsi-Afrikan valtasuoni',
    // -4.2 E / 14.5 N — Moptin kohta joen sisämaasuistossa; en-Wikipedia "Niger River" antaa koordinaatiksi Nigerian suiston 6,47 / 5,32
    laudat: {
      maailmankartta: { x: 5693.3, y: 2724.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niger on Länsi-Afrikan pääjoki ja Afrikan kolmanneksi pisin — vain Niili ja Kongo ovat '
      + 'pidempiä. Se alkaa Guinean ylängöltä läheltä Sierra Leonen rajaa ja piirtää noin 4 180 '
      + 'kilometrin mittaisen puolikuun: ensin koilliseen kohti Saharaa Malin halki, sitten '
      + 'kaakkoon Nigerin ja Nigerian läpi, kunnes se laskee Guineanlahteen valtavan suistonsa '
      + 'kautta.',
    lahde: 'en-Wikipedia "Niger River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'senegal',
    nimi: 'Senegal',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea ei juuri käytetä kuljetuksiin?',
      'Mikä on OMVS?',
    ],
    nappi: 'Malin tie merelle?',
    // -10.83 E / 13.8 N — yläjuoksu Bafoulabén seudulla Malissa; en-Wikipedia "Senegal River" antaa koordinaatiksi suun -16,53 / 15,79
    laudat: {
      maailmankartta: { x: 5472.3, y: 2748.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Senegal on 1 086 kilometrin pituinen Länsi-Afrikan joki, jonka pitkä keskijuoksu '
      + 'piirtää Senegalin ja Mauritanian rajan. Sen yläjuoksu patoineen on Malissa, ja neljä '
      + 'valtiota hoitaa jokea yhdessä OMVS-järjestön kautta. Järjestö on tutkinut '
      + 'laivakelpoisen kanavan rakentamista Malin Ambidédistä merelle asti — se antaisi '
      + 'sisämaavaltio Malille suoran reitin Atlantille.',
    lahde: 'en-Wikipedia "Senegal River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

