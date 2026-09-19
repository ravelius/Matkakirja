/*
 * MAASTOKOHTEET — ITA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ITA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ITA.json. Työkalu laskee laudan
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
 * Italian maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-ita.js (Vesuvius, Etna, Dolomiitit, Po, Sardinia), joten tässä ovat vain puuttuvat rantameret. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_ITA = [
  {
    id: 'adrianmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-adrianmeri-975193f4.jpg',
      lyhyt: 'Sirolon hiekkaranta ja turkoosi Adrianmeri mäntyjen välistä nähtynä.',
      selite: 'Männiköstä avautuu näkymä Conero-vuoren rannikon vaalealle rannalle ja kirkkaanvihreänsiniselle merelle.',
      lahde: 'Valokuva: Cinnich, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Cinnich',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Riviera_del_Conero,_Sirolo_beach.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-adrianmeri-979e3c47.jpg',
        lyhyt: 'Adrianmeren aava Miramaren linnan puutarhasta katsottuna.',
        selite: 'Tyyni harmaansininen meri jatkuu horisonttiin asti, etualalla koristeellinen valurautalyhty.',
        lahde: 'Valokuva: Máté Bányi, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Máté Bányi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_from_Miramare_Castle_-_Sea.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Adrianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Venetsia rakennettiin juuri tänne?',
      'Mikä Otranton salmi on?',
    ],
    korostukset: ['Otranton salmi|Otranton salmesta'],
    nappi: 'Välimeren pohjoisin haara',
    // 15 E / 43 N — en-Wikipedia "Adriatic Sea" — koko meren likimääräinen keskipiste, ei täsmäpaikka
    laudat: {
      maailmankartta: { x: 6333.3, y: 1683.4 },
      europe: { x: 499.2, y: 762.7 },
    },
    teksti: 'Adrianmeri erottaa Apenniinien niemimaan Balkanin niemimaasta. Se on Välimeren '
      + 'pohjoisin haara ja ulottuu Otranton salmesta luoteeseen Pon laaksoon asti. Rantaa '
      + 'sillä on kuudella maalla: Albanialla, Bosnia ja Hertsegovinalla, Kroatialla, '
      + 'Italialla, Montenegrolla ja Slovenialla.',
    lahde: 'en-Wikipedia "Adriatic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tyrrhenanmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-tyrrhenanmeri-d5c36a2b.jpg',
      lyhyt: 'Tyyni Tyrrhenanmeri ja pilviä taivaalla.',
      selite: 'Sininen meri on aivan tyven, ja horisontin yllä leijuu kumpupilviä.',
      lahde: 'Valokuva: Patrick Nouhailler, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Patrick Nouhailler',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Tyrrhenian_Sea_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-tyrrhenanmeri-8309d129.jpg',
        lyhyt: 'Amalfin rannikon jyrkät kalliot Tyrrhenanmereltä katsottuna.',
        selite: 'Rannikon kalliot kohoavat turkoosin meren yllä, ja rinteellä näkyy valkoisia taloja.',
        lahde: 'Valokuva: Daniel Ventura, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Daniel Ventura',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amalfi_Coast_viewed_from_the_Tyrrhenian_Sea_55.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Tyrrhenanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Keitä tyrrhenialaiset olivat?',
      'Miksi meren pohjassa on tulivuoria?',
    ],
    korostukset: ['etruskit|etruskeihin'],
    nappi: 'Meri, joka on nimetty etruskien mukaan',
    // 12 E / 40 N — en-Wikipedia "Tyrrhenian Sea" — meren keskipiste
    laudat: {
      maailmankartta: { x: 6233.3, y: 1802.9 },
      europe: { x: 441.6, y: 841.6 },
    },
    teksti: 'Italian länsirannikon merellä on omat vuorensa, ja osa niistä on yhä tulessa. '
      + 'Tyrrhenanmeri makaa siinä, missä Afrikan ja Euraasian mannerlaatat kohtaavat: pohjassa '
      + 'kulkee vuorijonoja ja niiden seassa toimivia tulivuoria, kuten Marsili, ja pinnan '
      + 'yläpuolelle niistä yltävät Aiolian saaret ja Stromboli. Syvintä merta on 3 785 metriä. '
      + 'Nimi tulee tyrrhenialaisista, jotka on samastettu etruskeihin — meri kantaa siis '
      + 'kadonneen kansan nimeä ja jää Apenniinien niemimaan, Sardinian, Korsikan ja Sisilian '
      + 'väliin. Tuhannen metrin syvyydessä avautuvasta Caprera-kanjonista on löytynyt '
      + 'harvinaisia sieni- ja korallikasvustoja, ja samalla on todettu, että pohjatroolaus ja '
      + 'liikenteen päästöt uhkaavat niitä eikä kanjoni ole suojeltu.',
    lahde: 'en-Wikipedia "Tyrrhenian Sea", johdanto-osa sekä osiot "Geography", "Caprera Canyon" '
      + 'ja "Geology" (tarkistettu 1.9.2026).',
  },
  {
    id: 'ligurianmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-ligurianmeri-862c0a99.jpg',
      lyhyt: 'Turkoosi Ligurianmeri ja Cinque Terren jyrkkä rannikko.',
      selite: 'Vuorinen rannikko laskeutuu mereen, ja alhaalla vasemmalla näkyy Vernazzan pieni kylä; merellä on purjeveneitä.',
      lahde: 'Valokuva: Micael Widell, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Micael Widell',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Looking_south_on_the_mountainous_Ligurian_coast_from_north_of_Vernazza.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-ligurianmeri-1eb6bbc7.jpg',
        lyhyt: 'Ligurianmeren rannikon vihreät vuoret ja tummansininen meri.',
        selite: 'Metsäiset kukkulat kohoavat meren yllä, ja kylä on rinteessä veden äärellä.',
        lahde: 'Valokuva: Antonina Dattola, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Antonina Dattola',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vernazza_-_Panoramica_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ligurianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Keitä liguurit olivat?',
      'Mikä Välimeren valassuojelualue on?',
    ],
    korostukset: ['liguurit|liguureista'],
    nappi: 'Meri, joka muistaa muinaisen kansan',
    // 9 E / 43.5 N — en-Wikipedia "Ligurian Sea" — meren keskipiste
    laudat: {
      maailmankartta: { x: 6133.3, y: 1663.1 },
      europe: { x: 384, y: 749.6 },
    },
    teksti: 'Genovan edustan meri on ollut vuodesta 1999 valaiden turvapaikka. Ligurianmeri on '
      + 'Välimeren haara Italian rivieran ja Korsikan välissä, ja siihen perustettiin '
      + 'kansainvälinen valassuojelualue, joka kattaa 84 000 neliökilometriä — sekä '
      + 'rantavaltioiden aluevedet että avomeren. Suojeltavaa riittää, sillä samoilla vesillä '
      + 'liikkuvat myös Genovan sataman laivat; Genova on alueen suurin kaupunki, ja sen '
      + 'kallioinen rannikko rajaa meren pohjoislaitaa. Meren nimen uskotaan tulevan '
      + 'liguureista, jotka asuivat näillä rannoilla ennen roomalaisia. Syvimmillään merta on '
      + 'yli 2 800 metriä Korsikan luoteispuolella.',
    lahde: 'en-Wikipedia "Ligurian Sea", osiot "Geography" ja "Conservation" (tarkistettu '
      + '1.9.2026).',
  },
];

