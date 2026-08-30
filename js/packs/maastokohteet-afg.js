/*
 * MAASTOKOHTEET — AFG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AFG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AFG.json. Työkalu laskee laudan
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
 * Afganistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Merta maalla ei ole, joten vuoren rinnalla on kaksi jokea: rajajoki Amudarja ja maan oma pisin Helmand.
 */
export const MAASTOKOHTEET_AFG = [
  {
    id: 'noshaq',
    nimi: 'Noshaq',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Hindukuš on?',
      'Miksi Wakhanin käytävä on niin kapea?',
    ],
    korostukset: ['Hindukuš|Hindukušin'],
    nappi: 'Maailman läntisin 7 000 metrin huippu',
    // 71.8283 E / 36.4317 N — en-Wikipedia "Noshaq"
    laudat: {
      maailmankartta: { x: 8227.6, y: 1941.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Noshaq on Afganistanin korkein vuori: 7 492 metriä Hindukušin vuoristossa Pakistanin '
      + 'rajalla, maan koillisessa Wakhanin käytävässä. Koko Hindukušissa sen edelle kohoaa '
      + 'vain Tirich Mir. Samalla se on maailman läntisin seitsemän kilometrin korkeuteen '
      + 'yltävä huippu — siitä länteen yhtä korkeaa ei ole missään.',
    lahde: 'en-Wikipedia "Noshaq", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'amudarja',
    nimi: 'Amudarja',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Amudarja ei enää yllä Araljärveen?',
      'Mikä oli Turan?',
    ],
    korostukset: ['Oxus|Oxus'],
    nappi: 'Antiikin Oxus, Iranin ja Turanin raja',
    // 67 E / 37.3 N — joen Afganistanin-rajan osuus Termezin luona; artikkelin koordinaatti 59,68 / 44,11 on kuivuneessa suistossa Uzbekistanissa
    laudat: {
      maailmankartta: { x: 8066.7, y: 1907.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Amudarja, antiikin aikana Oxus, on Keski-Aasian suuria jokia: se syntyy Pamirin '
      + 'vuoristossa Vahšin ja Pandžin yhtyessä ja muodostaa yläjuoksullaan Afganistanin '
      + 'pohjoisrajan. Vanhassa historiassa sitä pidettiin Iranin ja Turanin eli '
      + 'paimentolaisten arojen rajana. Nykyään joki ei enää yllä Araljärveen asti, vaan sen '
      + 'suu on entisen järven kuivuneella pohjalla.',
    lahde: 'en-Wikipedia "Amu Darya", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'helmand',
    nimi: 'Helmand',
    tyyppi: 'joki',
    kysymykset: [
      'Minne joki päätyy, jos ei mereen?',
      'Mikä Sistanin allas on?',
    ],
    korostukset: ['Hamunjärvi|Hamunjärveen'],
    nappi: 'Joki, joka ei laske mereen',
    // 64.36 E / 31.59 N — keskijuoksu Lashkar Gahin kohdalla; artikkelilla ei ole jokea kuvaavaa keskipistettä
    laudat: {
      maailmankartta: { x: 7978.7, y: 2122.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Helmand on Afganistanin pisin joki. Se saa alkunsa Hindukušin Sanglakhin vuorilta '
      + 'Kabulin länsipuolelta ja virtaa maan kuivan lounaisosan halki. Mereen se ei laske '
      + 'koskaan: joki päättyy Hamunjärveen Iranin rajalle, sillä koko Sistanin allas on '
      + 'umpinainen — vesi poistuu sieltä vain haihtumalla.',
    lahde: 'en-Wikipedia "Helmand River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

