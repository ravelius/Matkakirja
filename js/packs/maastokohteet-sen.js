/*
 * MAASTOKOHTEET — SEN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SEN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SEN.json. Työkalu laskee laudan
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
 * Senegalin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maan korkein kohta on nimeltä ja korkeudelta vaatimaton Baunezin harjanne (648 m, en-Wikipedia "Geography of Senegal"), joten listalla ei ole vuorta — valtameri ja kaksi suurta jokea ovat maaston tärkeimmät.
 */
export const MAASTOKOHTEET_SEN = [
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on Afrikan mantereen läntisin kohta?',
      'Miksi Cap-Vert ja Kap Verde eivät ole sama paikka?',
    ],
    korostukset: ['Cap-Vert|Cap-Vertin'],
    nappi: 'Manner-Afrikan läntisin ranta',
    // -17.9 E / 14.5 N — ulappa Dakarin ja Cap-Vertin niemen edustalla; valtameriartikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5236.7, y: 2724.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Senegalin rannikolla se kohtaa koko '
      + 'Afro-Euraasian mantereen läntisimmän kohdan: Cap-Vertin niemen, jolla Dakar sijaitsee. '
      + 'Portugalilaiset löytöretkeilijät nimesivät niemen vihreäksi — 570 kilometriä '
      + 'lännempänä sijaitseva Kap Verden saarivaltio on saanut nimensä juuri tästä niemestä.',
    lahde: 'en-Wikipedia "Atlantic Ocean" ja "Cap-Vert", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'senegaljoki',
    nimi: 'Senegaljoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki jakautuu kahdeksi rinnakkaiseksi haaraksi?',
      'Mitä serer-kielen nimi Seen o Gal tarkoittaa?',
    ],
    nappi: 'Rajajoki Saharan reunalla',
    // -16.5289 E / 15.7881 N — en-Wikipedia "Senegal River" — koordinaatti on suistossa Saint-Louisin kohdalla
    laudat: {
      maailmankartta: { x: 5282.4, y: 2680.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Senegaljoki virtaa 1 086 kilometriä Länsi-Afrikan halki, ja suuri osa siitä muodostaa '
      + 'Senegalin ja Mauritanian välisen rajan. Kaédin alapuolella joki jakautuu kahdeksi: '
      + 'Doué-haara kulkee pääuoman rinnalla parisataa kilometriä ennen kuin uomat yhtyvät '
      + 'uudelleen. Merkki on suistossa Saint-Louisin kohdalla, jossa joki laskee Atlanttiin.',
    lahde: 'en-Wikipedia "Senegal River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'gambiajoki',
    nimi: 'Gambiajoki',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Gambiajoki saa alkunsa?',
      'Miksi Gambian valtio on joen muotoinen?',
    ],
    nappi: 'Joki jonka ympärille piirtyi valtio',
    // -12.85 E / 13 N — joen yläjuoksu Kaakkois-Senegalissa; artikkelin koordinaatti -16,567 / 13,467 on suulla Banjulissa
    laudat: {
      maailmankartta: { x: 5405, y: 2775.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gambiajoki virtaa 1 120 kilometriä Guinean Fouta Djallonin ylängöltä Senegalin kautta '
      + 'Atlanttiin, johon se laskee Banjulin kohdalla. Sen alajuoksun molemmat rannat kuuluvat '
      + 'Gambialle, Manner-Afrikan pienimmälle valtiolle, joka on käytännössä joen levyinen. '
      + 'Merkki on Senegalin kaakkoisosassa, jossa joki virtaa maan halki kohti merta.',
    lahde: 'en-Wikipedia "Gambia River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

