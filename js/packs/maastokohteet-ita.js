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
 *
 * Messinansalmi lisättiin 25.9.2026 omistajan löydöksestä 108 ("Välimeri ja
 * Messinansalmi klikattaviksi nostoiksi kuvineen ja teksteineen"); sen
 * koordinaattirivi on myös tools/maastoaineisto/ITA.json:ssa.
 */
export const MAASTOKOHTEET_ITA = [
  {
    id: 'adrianmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ita-nosto-adrianmeri-979e3c47.jpg',
      lyhyt: 'Adrianmeren aava Miramaren linnan puutarhasta katsottuna.',
      selite: 'Tyyni harmaansininen meri jatkuu horisonttiin asti, etualalla koristeellinen valurautalyhty.',
      lahde: 'Valokuva: Máté Bányi, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Máté Bányi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_from_Miramare_Castle_-_Sea.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
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
    visa: {
      kysymys: 'Mistä salmesta Adrianmeri ulottuu Pon laaksoon asti?',
      vaihtoehdot: [
        'Otranton salmesta',
        'Gibraltarin salmesta',
        'Messinan salmesta',
        'Bosporin salmesta',
      ],
      oikea: 0,
      fakta: 'Adrianmeri ulottuu Otranton salmesta luoteeseen Pon laaksoon asti.',
    },
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
  {
    id: 'messinansalmi',
    kuva: {
      tiedosto: 'Strait of Messina from Dinnammare.jpg',
      lyhyt: 'Messinansalmi Dinnammare-vuorelta: edessä Messina, salmen takana Calabria.',
      selite: 'Näkymä Peloritani-vuorten Dinnammarelta salmen yli: etualalla Messina ja sen '
        + 'sirpinmuotoinen satamaniemi, vasemmalla Torre Faron niemen pylväs ja veden takana '
        + 'Calabrian rannikko.',
      lahde: 'Valokuva: Edd48, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Edd48',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Strait_of_Messina_from_Dinnammare.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        tiedosto: 'Scilla - Vista da via Cristoforo Colombo - 5.jpg',
        lyhyt: 'Scillan kallio, jonka kreikkalaiset tunsivat hirviö Skyllan kotina.',
        selite: 'Jyrkkä kallioniemeke kohoaa Calabrian Scillan rannan yllä, ja sen laella seisoo '
          + 'Ruffon linna; tarun mukaan kalliossa asui merihirviö Skylla.',
        lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Benjamin Smith',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Scilla_-_Vista_da_via_Cristoforo_Colombo_-_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        tiedosto: 'Feluca in the strait of Messina.JPG',
        lyhyt: 'Miekkakalaa pyytävä felukka-vene Messinansalmessa.',
        selite: 'Sininen felukka ja sen korkea tähystysmasto, jonka huipulla istuu kalastaja; '
          + 'taustalla Torre Faron punavalkoinen pylväs ja Calabrian vuoret.',
        lahde: 'Valokuva: Shifegu, Wikimedia Commons (CC0).',
        tekija: 'Shifegu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Feluca_in_the_strait_of_Messina.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        tiedosto: 'Comerio, Luca (1878-1940) - Il Lungomare dopo il terremoto di Messina (dicembre 1908).jpg',
        lyhyt: 'Messinan rantakatu veden vallassa vuoden 1908 maanjäristyksen jälkeen.',
        selite: 'Messinan rantabulevardi joulukuussa 1908: kiveys on haljennut ja painunut, vesi '
          + 'on noussut kadulle, lyhtypylväs on kallellaan ja tynnyrit lojuvat palatsirivin edessä.',
        lahde: 'Valokuva: Luca Comerio, 1908, Wikimedia Commons (public domain).',
        tekija: 'Luca Comerio',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Comerio,_Luca_(1878-1940)_-_Il_Lungomare_dopo_il_terremoto_di_Messina_(dicembre_1908).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Messinansalmi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli Kharybdis?',
      'Miksi salmen yli ei vieläkään kulje siltaa?',
    ],
    korostukset: ['Kharybdis|Kharybdis'],
    nappi: 'Skyllan ja Kharybdiksen salmi',
    // 15.61 E / 38.2 N — en-Wikipedia "Strait of Messina" — salmen keskikohta Messinan ja
    // Calabrian rannan välissä (laskettu: node tools/johda-maastokohteet.mjs ITA)
    laudat: {
      maailmankartta: { x: 6353.7, y: 1873.1 },
      europe: { x: 510.9, y: 888.9 },
    },
    teksti: 'Sisilian ja Calabrian välinen Messinansalmi on kapeimmillaan vain 3,1 kilometriä '
      + 'leveä. Se yhdistää Tyrrhenanmeren Joonianmereen, ja vuorovesivirrat ovat niin '
      + 'voimakkaita, että syvänmeren kaloja huuhtoutuu joskus aamulla rannalle. Kreikkalaiset '
      + 'sijoittivat tänne Homeroksen merihirviöt: Skylla oli Calabrian puoleinen kallio, '
      + 'Kharybdis pyörre Sisilian edustalla. Joulukuussa 1908 salmen alla järisi magnitudilla '
      + '7,1. Messina ja Reggio Calabria tuhoutuivat lähes kokonaan, ja noin 120 000 ihmistä '
      + 'kuoli — Euroopan historian kuolettavin maanjäristys. Salmen ylittävä silta sai '
      + 'hallituksen hyväksynnän elokuussa 2025, mutta tilintarkastustuomioistuin kaatoi '
      + 'päätöksen jo lokakuussa. Joskus salmen yllä näkyy Fata Morgana -kangastus, ja sen '
      + 'vesillä pyydetään yhä miekkakalaa harppuunalla.',
    lahde: 'en-Wikipedia "Strait of Messina", johdanto-osa ja osio "Marine life"; '
      + '"1908 Messina earthquake"; "Strait of Messina Bridge", johdanto-osa; "Between Scylla '
      + 'and Charybdis"; "Fata Morgana (mirage)"; "Bagnara Calabra", osio "Economy" '
      + '(tarkistettu 25.9.2026).',
    visa: {
      kysymys: 'Kuinka leveä Messinansalmi on kapeimmillaan?',
      vaihtoehdot: [
        '3,1 kilometriä',
        '14 kilometriä',
        '33 kilometriä',
        '0,7 kilometriä',
      ],
      oikea: 0,
      fakta: 'Messinansalmi on kapeimmillaan vain 3,1 kilometriä leveä.',
    },
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 3, 30.9.2026 — 2 KOHDETTA.
   * ============================================================== */
  {
    id: 'aquileia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-aquileia-fb6febcd.jpg',
      lyhyt: 'Aquileian patriarkaalisen basilikan kellotorni ja sypressit nurmikon takana.',
      selite: 'Kuvassa näkyy Aquileian basilikan kivinen ulkopuoli, korkea kellotorni ja rivi sypressejä.',
      lahde: 'Valokuva: ThePhotografer, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ThePhotografer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilica_Patriarcale_(Aquileia)_-_Exterior.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Aquileia',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi pikkukaupungissa on niin suuri basilika?',
      'Milloin roomalaiset perustivat Aquileian?',
    ],
    korostukset: ['mosaiikkilattia|mosaiikkilattia'],
    nappi: 'Roomalainen suurkaupunki ja mosaiikit',
    // 13.3712 E / 45.7697 N — en-Wikipedia "Aquileia", johdanto ja osiot "History", "Demographics" ja "Basilica"
    laudat: {
      maailmankartta: { x: 6279, y: 1569.9 },
    },
    teksti: 'Aquileia on Koillis-Italian Friuli-Venezia Giulian pikkukaupunki, jonka roomalaiset '
      + 'perustivat sotilassiirtokunnaksi vuosina 180–181 eaa. Toisella vuosisadalla jKr. '
      + 'siellä asui arviolta noin 100 000 ihmistä, kun nykyään asukkaita on runsaat 3 300. '
      + 'Patriarkka Poppo rakennutti nykyisen basilikan, Santa Maria Assunta, vuonna 1031, ja '
      + 'patriarkka Marquard of Randeck uudisti sen goottilaiseen tyyliin vuosina 1365–1381. '
      + 'Basilikassa on varhaiskristillinen mosaiikkilattia. Aquileian patriarkaatti '
      + 'lakkautettiin 1751. Unesco kirjasi alueen maailmanperintöön vuonna 1998.',
    lahde: 'en-Wikipedia "Aquileia", johdanto ja osiot "History", "Demographics" ja "Basilica" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'amalfin-rannikko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-amalfin-rannikko-33112cec.jpg',
      lyhyt: 'Amalfin kaupunki ja jyrkkä vuoristorannikko näkyvät mereltä katsottuna.',
      selite: 'Kuvassa näkyy Amalfin valkoisten talojen ryhmä jyrkän, terassoidun rinteen juurella sekä rannikon jatkuminen kaukaisuuteen.',
      lahde: 'Valokuva: Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Wolfgang Moroder',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amalfi_vista_dal_mare_2_Campania.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    nimi: 'Amalfin rannikko',
    nimio: 'Amalfi',
    tyyppi: 'meri',
    kysymykset: [
      'Mistä limoncellon sitruunat tulevat?',
      'Kuka ryösti Amalfin vuonna 1137?',
    ],
    korostukset: ['sitruunoita|sitruunoita'],
    nappi: 'Sitruunaterassit meren yllä',
    // 14.6 E / 40.65 N — en-Wikipedia "Amalfi Coast", johdanto ja osiot "Geography", "History" ja "Agriculture"
    laudat: {
      maailmankartta: { x: 6320, y: 1777.3 },
    },
    teksti: 'Amalfin rannikko on noin 40 kilometrin pituinen Tyrrhenanmeren rantavyöhyke Salernon '
      + 'maakunnassa Campaniassa. Alueeseen kuuluu 13 kuntaa, muun muassa Amalfi, Positano, '
      + 'Ravello ja Vietri sul Mare. Unesco kirjasi rannikon maailmanperintöön vuonna 1997, '
      + 'ja suojeltu alue on 11 231 hehtaaria. Terassipuutarhoissa viljellään sfusato '
      + 'amalfitano -sitruunoita, joista valmistetaan limoncelloa. Amalfin herttuakunta oli '
      + 'vaikutusvaltainen 900- ja 1000-luvuilla, kunnes pisalaiset ryöstivät kaupungin 1137.',
    lahde: 'en-Wikipedia "Amalfi Coast", johdanto ja osiot "Geography", "History" ja '
      + '"Agriculture" (tarkistettu 30.9.2026).',
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 2 ERÄ C, 30.9.2026 — 4 KOHDETTA.
   * ============================================================== */
  {
    id: 'tropea',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-tropea-abe039c8.jpg',
      lyhyt: 'Santa Maria dell\'Isola kohoaa kalliolla meren edessä.',
      selite: 'Vaalea, raidallinen kirkkorakennus kellotorneineen seisoo kalliolla ja puiden reunustamana. Taustalla levittäytyy tyyni sininen meri.',
      lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Benjamin Smith',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tropea_-_Santa_Maria_dell\'Isola_-_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Tropea',
    nimio: 'Tropea',
    tyyppi: 'meri',
    kysymykset: [
      'Millä rannikolla Tropea sijaitsee?',
      'Millaisella kalliolla Santa Maria dell\'Isola on?',
    ],
    korostukset: ['Santa Maria dell\'Isola|Santa Maria dell\'Isola'],
    nappi: 'Kirkko melkein saarella meren äärellä',
    // 15.8948 E / 38.6754 N — en-Wikipedia "Tropea", osiot "Main sights" ja "Beaches"
    laudat: {
      maailmankartta: { x: 6363.2, y: 1854.7 },
    },
    teksti: 'Tropea on noin 5 700 asukkaan kaupunki Calabrian Tyrrhenanmeren rannikolla, '
      + 'Sant\'Eufemian lahden reunalla. Sen tunnetuin näkymä on Santa Maria dell\'Isola, '
      + 'kirkko ja luostari kallionkielekkeellä, joka näyttää melkein saarelta. Paikka '
      + 'liitetään benediktiiniläisiin, ja kirkolle pääsee kaupungin korkealta rannikolta. '
      + 'Kaupungin muita nähtävyyksiä ovat tuomiokirkko ja 1600–1700-lukujen palatsit. Tropea '
      + 'valittiin vuonna 2021 Italian kauneimmaksi kyläksi, ja se kuuluu Italian kauneimpien '
      + 'kylien yhdistykseen.',
    lahde: 'en-Wikipedia "Tropea", osiot "Main sights" ja "Beaches" (tarkistettu 30.9.2026).',
  },
  {
    id: 'gerace',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-gerace-b09010cb.jpg',
      lyhyt: 'Geracen tuomiokirkon keskilaiva pylväsriveineen.',
      selite: 'Pitkän laivan molemmin puolin kulkee kaaria kannattavia pylväitä, ja katossa näkyvät tummat puupalkit.',
      lahde: 'Valokuva: Jacopo Werther, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jacopo Werther',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cattedrale_di_Gerace_(Reggio_Calabria)_-_Italy_-_6_June_2009.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Gerace',
    nimio: 'Gerace',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Geracen tuomiokirkon 13 pylvästä on peräisin?',
      'Minkä valloittajan käsiin kaupunki joutui vuonna 1059?',
    ],
    korostukset: ['tuomiokirkko|tuomiokirkko'],
    nappi: 'Vuoristokaupunki ja antiikin pylväät',
    // 16.217 E / 38.267 N — en-Wikipedia "Gerace", osiot "History" ja "Main sights"
    laudat: {
      maailmankartta: { x: 6373.9, y: 1870.5 },
    },
    teksti: 'Gerace on Calabrian vuoristokaupunki noin 500 metrin korkeudessa, kymmenisen '
      + 'kilometriä sisämaahan Locrista. Perimätiedon mukaan rannikon asukkaat pakenivat '
      + 'vuonna 915 saraseenien hyökkäyksiä vuorille, ja haukka johdatti heidät paikalle. '
      + 'Normannit valloittivat kaupungin vuonna 1059. Kaupungin tunnetuin rakennus on '
      + 'normannityylinen tuomiokirkko, joka kuuluu Calabrian suurimpiin uskonnollisiin '
      + 'rakennuksiin. Sen laivaa jakavat 13 pylvästä, jotka on tuotu Locrin muinaisista '
      + 'temppeleistä. Kirkon kryptaan pääsee alas, ja vuonna 1996 perustettu museo täydentää '
      + 'kokonaisuutta.',
    lahde: 'en-Wikipedia "Gerace", osiot "History" ja "Main sights" (tarkistettu 30.9.2026).',
  },
  {
    id: 'saepinum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-saepinum-b00de52a.jpg',
      lyhyt: 'Porta Bojanon kaari Saepinumin muurissa.',
      selite: 'Kiviverhoiltu kaari avautuu muurissa, ja sen läpi jatkuu kivetty tie.',
      lahde: 'Valokuva: Stapinium, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Stapinium',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PortaBoiano(Saepinum-Altilia)outside.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Saepinum (Altilia)',
    nimio: 'Saepinum',
    tyyppi: 'historia',
    kysymykset: [
      'Minä vuonna roomalaiset valtasivat Saepinumin?',
      'Millä tekniikalla Saepinumin alakaupungin muurit rakennettiin?',
    ],
    korostukset: ['Porta Bojano|Porta Bojano'],
    nappi: 'Roomalaiskaupunki Molisen sisämaassa',
    // 14.6167 E / 41.4333 N — en-Wikipedia "Saepinum", osiot "History", "City walls" ja "Excavations"
    laudat: {
      maailmankartta: { x: 6320.6, y: 1746.2 },
    },
    teksti: 'Saepinum on muinainen roomalainen kaupunki Molisessa, noin 15 kilometriä '
      + 'Campobassosta etelään lähellä nykyistä Sepinon kylää. Roomalaiset valtasivat paikan '
      + 'vuonna 293 eaa., ja alakaupungin muurit rakennettiin opus reticulatum -tekniikalla '
      + 'vuosien 2 eaa. ja 4 jaa. välillä. Muuri ympäröi noin 12 hehtaaria, ja siinä on 19 '
      + 'säilynyttä pyöreää tornia sekä neljä porttia, kuten Porta Bojano. Kaupunkiin kuului '
      + 'muun muassa teatteri ja foorumi.',
    lahde: 'en-Wikipedia "Saepinum", osiot "History", "City walls" ja "Excavations" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'termolin-linna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/ita-nosto-termolin-linna-99e0dd87.jpg',
      lyhyt: 'Termolin linnan kivimuurit ja kellotorni sinistä taivasta vasten.',
      selite: 'Alhaalta kuvattu linna nousee jyrkkään kaltevana kivimuurina, ja sen päällä on kellolla varustettu torni.',
      lahde: 'Valokuva: C.lapia, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.lapia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castello_Svevo_di_Termoli.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Termolin linna',
    nimio: 'Termolin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti linnan 1000-luvulla?',
      'Mikä vahingoitti linnaa ennen vuoden 1240 kunnostusta?',
    ],
    korostukset: ['Castello Svevo|Castello Svevo'],
    nappi: 'Adrianmeren rannan vanha linna',
    // 14.9833 E / 42 N — en-Wikipedia "Termoli", osiot "History" ja "Main sights"
    laudat: {
      maailmankartta: { x: 6332.8, y: 1723.6 },
    },
    teksti: 'Termolin linna eli Castello Svevo hallitsee Adrianmeren rannalla sijaitsevan '
      + 'Termolin vanhaa kaupunkia. Normannikauden linnan rakennutti 1000-luvulla Loritellon '
      + 'kreivi Robert I. Fredrik II:n aikana linnaa kunnostettiin vuonna 1240 sen jälkeen, '
      + 'kun venetsialaisten laivasto oli vahingoittanut sitä. Kaupungin ympäri kulki '
      + 'aikanaan muuri, ja siitä on jäljellä yksi torni. Kaupunki koki vuonna 1566 '
      + 'turkkilaisten ryöstön. Vanha kaupunki on kunnostettu, ja sen talot on maalattu '
      + 'värikkäiksi, mutta linna on yhä sen näkyvin maamerkki.',
    lahde: 'en-Wikipedia "Termoli", osiot "History" ja "Main sights" (tarkistettu 30.9.2026).',
  },
];

