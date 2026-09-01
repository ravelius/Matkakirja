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
      'Mitä nimi Sonedech tarkoittaa?',
      'Mikä Langue de Barbarie on?',
    ],
    korostukset: ['Langue de Barbarie|Langue de Barbarie'],
    nappi: 'Rajajoki Saharan reunalla',
    // -16.5289 E / 15.7881 N — en-Wikipedia "Senegal River" — koordinaatti on suistossa Saint-Louisin kohdalla
    laudat: {
      maailmankartta: { x: 5282.4, y: 2680.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yhdellä joella oli kerran kymmenen nimeä. Portugalilaiset kutsuivat sitä Zenegaksi, '
      + 'wolofit Dengueh\'ksi, toucouleurit Mayoksi, soninket Colleksi — ja João de Barrosin '
      + 'mukaan alkuperäinen wolofinkielinen nimi oli Ovedech, tämä joki, tai Sonedech, meidän '
      + 'jokemme. 1400-luvun purjehtija Alvise Cadamosto uskoi vielä, että Senegal ja Egyptin '
      + 'Niili ovat saman Eedenistä lähtevän virran haaroja. Joki on 1 086 kilometriä pitkä, ja '
      + 'suuri osa sen juoksusta on Senegalin ja Mauritanian raja. Kaédin jälkeen se jakautuu '
      + 'kahdeksi rinnakkaiseksi haaraksi, jotka yhtyvät vasta kahdensadan kilometrin päässä '
      + 'Podorin alapuolella, ja laskee Atlanttiin Saint-Louis\'n saarikaupungin ohitse — '
      + 'merestä sen erottaa ohut hiekkakieleke, Langue de Barbarie.',
    lahde: 'en-Wikipedia "Senegal River", johdanto-osa sekä osiot "Geography", "European contact" '
      + 'ja "Etymology" (tarkistettu 1.9.2026).',
  },
  {
    id: 'gambiajoki',
    nimi: 'Gambiajoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Gambian valtio on joen muotoinen?',
      'Mikä James Island on?',
    ],
    korostukset: ['Fouta Djallon|Fouta Djallonin'],
    nappi: 'Joki jonka ympärille piirtyi valtio',
    // -12.85 E / 13 N — joen yläjuoksu Kaakkois-Senegalissa; artikkelin koordinaatti -16,567 / 13,467 on suulla Banjulissa
    laudat: {
      maailmankartta: { x: 5405, y: 2775.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gambian valtio on joen muotoinen, ja siihen on tarkka syy. Vuoden 1889 Britannian ja '
      + 'Ranskan sopimus veti rajan kymmenen kilometriä joen molemmin puolin niin kauas '
      + 'sisämaahan kuin merialukset pääsivät — Yarbutendaan asti, nykyisen Koinan tienoille. '
      + 'Britannialle jäi siis täsmälleen se osa joesta, joka kannatti laivoja. Rajaa pidettiin '
      + 'tuolloin väliaikaisena; se ei ole muuttunut sen jälkeen. Joki alkaa Guinean Fouta '
      + 'Djallonin ylängöltä, kulkee 1 120 kilometriä Senegalin halki ja laskee Atlanttiin '
      + 'Banjulissa, ja purjehduskelpoista siitä on noin puolet. Suullaan se levenee yli '
      + 'kymmenen kilometrin levyiseksi. Sen varrella olivat vanhat kauppapaikat Albreda, '
      + 'Juffure ja James Island, joka on nykyään maailmanperintökohde.',
    lahde: 'en-Wikipedia "Gambia River", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
];

