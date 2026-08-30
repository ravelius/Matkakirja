/*
 * MAASTOKOHTEET — TZA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TZA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TZA.json. Työkalu laskee laudan
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
 * Tansanian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Tanganjikajärvi kulkee pelin symbolitaksonomiassa merenä (luonto-symboli; erillistä järvityyppiä ei ole).
 */
export const MAASTOKOHTEET_TZA = [
  {
    id: 'kilimandzaro',
    nimi: 'Kilimandžaro',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Kilimandžaron nimi tarkoittaa?',
      'Kuka eurooppalainen kertoi vuoresta ensimmäisenä?',
    ],
    nappi: 'Afrikan korkein vuori',
    // 37.3533 E / -3.0758 N — en-Wikipedia "Mount Kilimanjaro"
    laudat: {
      maailmankartta: { x: 7078.4, y: 3314.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kilimandžaro on uinuva tulivuori ja Afrikan korkein vuori: 5 895 metriä merenpinnasta '
      + 'ja lähes viisi kilometriä ympäröivältä ylängöltä, mikä tekee siitä maailman korkeimman '
      + 'vapaasti seisovan vuoren. Nimen alkuperää ei tunneta — se voi tarkoittaa suuruuden '
      + 'vuorta tai vuorta, jolle ei voi kiivetä. Saksalainen lähetyssaarnaaja Johannes Rebmann '
      + 'kertoi vuoresta eurooppalaisille ensimmäisenä vuonna 1848.',
    lahde: 'en-Wikipedia "Mount Kilimanjaro", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Intian valtameri on valtameristä nuorin?',
      'Kuinka syvä valtameri on keskimäärin?',
    ],
    nappi: 'Valtameristä nuorin',
    // 40.3 E / -6.9 N — ulappa Sansibarin ja Dar es Salaamin edustalla; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 7176.7, y: 3441.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman kolmanneksi suurin valtameri, jota rajaavat pohjoisessa '
      + 'Aasia, lännessä Afrikka ja idässä Australia. Geologisesti se on valtameristä nuorin: '
      + 'se syntyi muinaisen Tethysmeren pirstoutuessa vasta noin 20 miljoonaa vuotta sitten, '
      + 'ja siksi sen mannerjalustat ovat kapeita. Keskisyvyyttä valtamerellä on 3 741 metriä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tanganjikajarvi',
    nimi: 'Tanganjikajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä järvi on Tanganjikaakin syvempi?',
      'Mitä reittiä järven vedet päätyvät Atlanttiin?',
    ],
    nappi: 'Maailman pisin makeanveden järvi',
    // 29.5 E / -6.1 N — en-Wikipedia "Lake Tanganyika"
    laudat: {
      maailmankartta: { x: 6816.7, y: 3415.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanganjikajärvi on maailman pisin makeanveden järvi sekä tilavuudeltaan ja '
      + 'syvyydeltään toinen — molemmissa edellä on vain Siperian Baikal. Järvi jakautuu neljän '
      + 'maan kesken, ja Tansanialle siitä kuuluu suurin osuus, lähes puolet. Vedet laskevat '
      + 'Lukugajokea pitkin Kongon vesistöön ja päätyvät lopulta Atlanttiin.',
    lahde: 'en-Wikipedia "Lake Tanganyika", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

