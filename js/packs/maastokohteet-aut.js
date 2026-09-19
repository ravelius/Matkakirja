/*
 * MAASTOKOHTEET — AUT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AUT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AUT.json. Työkalu laskee laudan
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
 * Itävallan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Itävalta oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja
 * kaksitoista karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md).
 * Tavoite on kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne
 * ovat — sama malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-aut.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Carnuntum)
 * on 15,9 lautayksikön päässä Wienistä, eli reilusti yli kaupungin
 * kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js).
 * Yksikään ei siis kuulu kohdekartalle, vaan kaikki ovat pääkartan
 * merkkejä.
 *
 * KUVAT LISÄTTY 20.9.2026 (ent. kuvaton erä): kortti kantaa nyt kaksi tarkistettua
 * Commons-kuvaa. Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_AUT = [
  {
    id: 'groglockner',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-groglockner-b8fd003e.jpg',
      lyhyt: 'Großglockner kohoaa lumisten ja jäätikköisten rinteiden yläpuolelle.',
      selite: 'Itävallan korkein vuori lounaasta katsottuna. Kolmiomainen huippu ja sitä ympäröivät jäätiköt erottuvat kirkasta taivasta vasten.',
      lahde: 'Valokuva: Michael Schmid, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Michael Schmid',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grossglockner_from_SW.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/at',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-groglockner-8b705f03.jpg',
        lyhyt: 'Pilvien lomasta pilkistää Großglocknerin lumihuippu.',
        selite: 'Vuoristolaakson metsien ja pilvivyöhykkeen yllä kohoaa Alppien korkeimpiin kuuluva lumipeitteinen huippu.',
        lahde: 'Valokuva: Dimitry Anikin, Wikimedia Commons (CC0).',
        tekija: 'Dimitry Anikin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gro%C3%9Fglockner.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Großglockner',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Pasterze on?',
      'Miksi korkeus mitataan Adrianmerestä?',
    ],
    korostukset: ['Hohe Tauern|Hohe Tauernin'],
    nappi: 'Itävallan korkein huippu',
    // 12.6953 E / 47.0749 N — en-Wikipedia "Grossglockner"
    laudat: {
      maailmankartta: { x: 6256.5, y: 1515.4 },
      europe: { x: 454.9, y: 655.5 },
    },
    teksti: 'Großglockner on 3 798 metriä Adrianmeren pinnasta ja siten Itävallan korkein vuori '
      + 'sekä Alppien korkein Brennerin solan itäpuolella. Se kuuluu Hohe Tauernin vuoriston '
      + 'Glockner-ryhmään Keski-Itäalppien pääharjanteella. Sen itärinteellä lepää Pasterze, '
      + 'Itävallan laajin jäätikkö.',
    lahde: 'en-Wikipedia "Grossglockner", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'wildspitze',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-wildspitze-2925002c.jpg',
      lyhyt: 'Wildspitze kohoaa jäätikköjen ja kallioharjanteiden yllä Tirolissa.',
      selite: 'Ötztalin Alppien korkein huippu lumipeitteisine rinteineen ja jäätikkökieleineen etualalla.',
      lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Tiia Monto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wildspitze_2.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-wildspitze-63b1bf3d.jpg',
        lyhyt: 'Lähikuva Wildspitzen tummasta kalliohuipusta ja lumikentistä.',
        selite: 'Jyrkkä kallioinen huippu ja sen vieressä lumen peittämä rinne erottuvat sinistä taivasta vasten.',
        lahde: 'Valokuva: Whgler, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Whgler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wildspitze_vom_Brunnenkogel.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Wildspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren korkein huippu vaihtui?',
      'Kuka oli Leander Klotz?',
    ],
    korostukset: ['Ötztalin Alpit|Ötztalin Alppien'],
    nappi: 'Ötztalin Alppien katto',
    // 10.8672 E / 46.8853 N — en-Wikipedia "Wildspitze"
    laudat: {
      maailmankartta: { x: 6195.6, y: 1523.3 },
      europe: { x: 419.9, y: 660.5 },
    },
    teksti: 'Wildspitzellä on kaksi huippua, ja se kumpi niistä on korkeampi, on vaihtunut kesken '
      + 'kaiken. Kalliosta koostuva eteläinen huippu nousee 3 768 metriin, ja pohjoinen oli '
      + 'pitkään sitä korkeampi — 1800-luvulla se mitattiin 11 947 wieniläisen jalan '
      + 'korkuiseksi. Mutta pohjoinen huippu on lunta ja jäätä, ja sulaminen madalsi sen '
      + '1900-luvun loppuun mennessä noin 3 765 metriin. Niinpä korkein kohta on nykyään '
      + 'etelässä, ja samalla ensinousun vuodeksi vaihtui 1848, jolloin Rofenin laakson '
      + 'karjatilallinen ja opas Leander Klotz nousi sinne nimettömän naapurinsa kanssa. Vuori '
      + 'on Ötztalin Alppien ja Pohjois-Tirolin korkein sekä Itävallan toiseksi korkein '
      + 'Großglocknerin jälkeen.',
    lahde: 'en-Wikipedia "Wildspitze", johdanto-osa sekä osiot "Location" ja "Early ascents" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'tonava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-tonava-be5a05bd.jpg',
      lyhyt: 'Tonava virtaa leveänä metsäisten rinteiden välissä Wachaun laaksossa.',
      selite: 'Leveä Tonava Melkin lähellä Wachaun laaksossa. Vastarannalla kohoaa metsäinen kukkula ja vasemmalla näkyy laituri.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Danube_near_Melk,_20210728_1605_0892.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-tonava-405fa06b.jpg',
        lyhyt: 'Hevosia kuljetetaan lautalla Tonavan yli.',
        selite: 'Vanha maalaus, jossa vetohevosia siirretään lautalla joen yli Wachaun alueella. Taustalla häämöttää vastaranta iltapilvien alla.',
        lahde: 'Maalaus: Alexander von Bensa, Wikimedia Commons (public domain).',
        tekija: 'Alexander von Bensa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alexander_von_Bensa_%C3%9Cberfuhr_von_Treidelpferden_in_der_Wachau.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka monen pääkaupungin läpi Tonava virtaa?',
      'Mikä Wachaun laakso on?',
    ],
    korostukset: ['Rooman valtakunta|Rooman valtakunnan'],
    nappi: 'Euroopan toiseksi pisin joki',
    // 15.42 E / 48.37 N — Wachaun laakso Itävallan puolella; artikkelin koordinaatti 29,761 / 45,218 on suistossa Romaniassa
    laudat: {
      maailmankartta: { x: 6347.3, y: 1460.4 },
      europe: { x: 507.3, y: 621.5 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan toiseksi pisin joki: 2 850 kilometriä Saksan '
      + 'Schwarzwaldista Mustallemerelle. Se yhdistää nykyisin kymmenen Euroopan maata ja oli '
      + 'aikoinaan Rooman valtakunnan rajajoki. Sen varrella on neljä pääkaupunkia — Wien, '
      + 'Bratislava, Budapest ja Belgrad — ja valuma-alue on 817 000 neliökilometriä.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'inn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-inn-57295f63.jpg',
      lyhyt: 'Inn virtaa Innsbruckin vanhan kaupungin talojen ohi.',
      selite: 'Vihertävä Inn-joki ja sen rannan värikkäät talot sekä kirkon vihreäkupuiset tornit Innsbruckissa. Taustalla näkyy lumihuippuinen vuori.',
      lahde: 'Valokuva: Nicholas Hartmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nicholas Hartmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2007_Austria_Innsbruck_Inn_river_&_Altstadt.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-inn-f90eddd2.jpg',
        lyhyt: 'Ilmakuva Innin ja Salzachin yhtymäkohdasta.',
        selite: 'Kaksi eri värisenä virtaavaa jokea kohtaa metsäisessä, tasaisessa maisemassa. Ilmakuvassa erottuvat jokien rannat ja niiden välinen niemeke.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_confluence_of_the_Inn_and_Salzach_(view_from_the_west).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Inn',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Engadin on?',
      'Miksi Inn on niin vetinen?',
    ],
    nappi: 'Tonavan kolmanneksi suurin sivujoki',
    // 11.75 E / 47.3 N — Innin laakso Innsbruckin alapuolella; artikkelin koordinaatti 13,477 / 48,574 on yhtymäkohdassa Passaussa
    laudat: {
      maailmankartta: { x: 6225, y: 1505.9 },
      europe: { x: 436.8, y: 649.6 },
    },
    teksti: 'Inn on 518 kilometrin pituinen joki Sveitsissä, Itävallassa ja Saksassa ja '
      + 'virtaamaltaan Tonavan kolmanneksi suurin sivujoki. Sen valuma-alueen korkein kohta on '
      + 'Piz Berninan huippu 4 049 metrissä. Engadin, joen laakso Sveitsin puolella, on maan '
      + 'ainoa laakso, jonka vedet päätyvät Mustallemerelle.',
    lahde: 'en-Wikipedia "Inn (river)", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'hallstatt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hallstatt-8496f795.jpg',
      lyhyt: 'Hallstatt nojaa vuorenrinteeseen Hallstätter Seen rannalla.',
      selite: 'Kylän talot ja kirkon korkea torni heijastuvat tyyneen järveen. Jyrkkä kalliovuori kohoaa kylän takana.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hallstatt_-_Zentrum_.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hallstatt-db2871a8.jpg',
        lyhyt: 'Kukilla ja köynnöksillä koristeltuja taloja Hallstattin torin laidalla.',
        selite: 'Puuparvekkeilla ja punaisilla pelargonioilla koristellut talot reunustavat Hallstattin toria. Talojen takana kohoaa metsäinen rinne.',
        lahde: 'Valokuva: Andrew Bossi, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Andrew Bossi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1126_-_Hallstatt_-_Marktplatz.jpg',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
    ],
    nimi: 'Hallstatt',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaivoksesta löytyy tuhansia vuosia vanhoja kenkiä?',
      'Mikä Hallstattin kulttuuri on?',
    ],
    korostukset: ['Hallstattin kulttuuri|Hallstattin kulttuurille'],
    nappi: 'Suola, joka säilytti rautakauden',
    // 13.649 E / 47.562 N — en-Wikipedia "Hallstatt"
    laudat: {
      maailmankartta: { x: 6288.3, y: 1494.8 },
      europe: { x: 473.3, y: 642.7 },
    },
    teksti: 'Hallstatt on pieni kaupunki Ylä-Itävallassa, Hallstätter Seen lounaisrannan ja '
      + 'Dachstein-massiivin jyrkkien rinteiden välissä Salzkammergutin alueella.\n\n'
      + 'Kaupunki tunnetaan suolantuotannostaan, joka ulottuu esihistoriaan asti, ja se on '
      + 'antanut nimen Hallstattin kulttuurille — varhaisen rautakauden arkeologiselle '
      + 'kulttuurille, joka liitetään esikelttiläisiin ja varhaisiin keltteihin noin '
      + '800–450 eaa. Pronssikaudella suolantuotanto oli jokapäiväistä kauppaa ja '
      + 'ilmeisen järjestäytynyttä, ja sen tuoma vauraus näkyy kaupungin '
      + 'esihistoriallisissa kalmistoissa.\n\n'
      + 'Vuonna 1846 Johann Georg Ramsauer löysi Salzbergin kaivosten läheltä suuren '
      + 'esihistoriallisen kalmiston ja kaivoi sitä 1800-luvun jälkipuoliskon ajan. '
      + 'Kaivauksista tuli lopulta 1 045 hautaa, vaikka itse asuinpaikkaa ei ole vieläkään '
      + 'löydetty — se saattaa olla myöhemmän kylän alla.\n\n'
      + 'Kaivoskäytävissä suola on säilyttänyt orgaanista ainesta, jota ei tavallisesti jää '
      + 'jäljelle: tekstiilejä, puuta ja nahkaa. Hyväkuntoisina ovat säilyneet muun muassa '
      + 'kengät, kangaspalat, työkalut ja kaivosmiesten reput. Hallstatt kuuluu vuonna 1997 '
      + 'maailmanperintöluetteloon merkittyyn Hallstatt–Dachsteinin kulttuurimaisemaan.',
    lahde: 'en-Wikipedia "Hallstatt", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'melkin-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-melkin-luostari-0ba9598e.jpg',
      lyhyt: 'Melkin barokkiluostari kohoaa kalliokukkulalla.',
      selite: 'Keltaraidallinen barokkiluostari ja sen kaksi kellotornia sekä vihreä kupoli kohoavat kukkulan huipulla sinistä taivasta vasten.',
      lahde: 'Valokuva: Thomas Ledl, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Thomas Ledl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stift_Melk,_Westansicht.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-melkin-luostari-e9d0e86c.jpg',
        lyhyt: 'Ilmakuva Melkin luostarista ja sen alla olevasta kaupungista.',
        selite: 'Luostarin laajat punakattoiset rakennukset ja sisäpiha kohoavat Melkin kaupungin yläpuolella. Vasemmalla näkyy joki.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Melk_Abbey_(view_from_the_southwest).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Melkin luostari',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi Melk säästyi lakkauttamiselta?',
      'Kuka on Melkin Adso?',
    ],
    korostukset: ['Melkin reformi|Melkin reformin'],
    nappi: 'Kirjasto kallion päällä',
    // 15.3339 E / 48.2281 N — en-Wikipedia "Melk Abbey"
    laudat: {
      maailmankartta: { x: 6344.5, y: 1466.5 },
      europe: { x: 505.6, y: 625.2 },
    },
    teksti: 'Melkin luostari on benediktiiniluostari Melkin kaupungin yläpuolella '
      + 'kalliokielekkeellä, joka kohoaa Tonavan yllä Wachaun laakson kupeessa. Kirkossa on '
      + 'pyhän Kolomanin hauta ja useiden Babenbergien — Itävallan ensimmäisen '
      + 'hallitsijasuvun — jäännökset.\n\n'
      + 'Luostari perustettiin 1089, kun Itävallan rajakreivi Leopold II antoi yhden '
      + 'linnoistaan Lambachin benediktiinimunkeille. Luostarikoulu perustettiin '
      + '1100-luvulla, ja kirjasto tuli pian kuuluisaksi laajasta '
      + 'käsikirjoituskokoelmastaan ja käsikirjoitusten valmistuksesta. 1400-luvulla '
      + 'luostarista tuli Melkin reformin keskus, joka uudisti Itävallan ja Etelä-Saksan '
      + 'luostarielämää.\n\n'
      + 'Nykyinen barokkiluostari rakennettiin 1702–1736 Jakob Prandtauerin suunnitelmien '
      + 'mukaan; kirkon freskot ovat Johann Michael Rottmayrin ja Paul Trogerin. '
      + '1700-luvun lopulla Melk oli valistusajattelun keskus, ja luostarissa toimi jopa '
      + 'vapaamuurariloosi.\n\n'
      + 'Maineensa ja oppineisuutensa ansiosta Melk vältti lakkauttamisen keisari Joosef '
      + 'II:n aikana, vaikka monet muut Itävallan luostarit takavarikoitiin ja lakkautettiin '
      + '1780–1790. Umberto Eco nimesi Ruusun nimen kertojan Melkin Adsoksi kunnianosoituksena '
      + 'luostarille.',
    lahde: 'en-Wikipedia "Melk Abbey", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hohensalzburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hohensalzburg-5bff5ff5.jpg',
      lyhyt: 'Hohensalzburgin valkoiset linnoitusmuurit ja tornit kohoavat metsäisen kukkulan päällä.',
      selite: 'Salzburgin keskiaikainen linnoitus koillisesta katsottuna. Pyöreät tornit ja jyrkät muurit hallitsevat vuorenhuippua.',
      lahde: 'Valokuva: Andreas Stiasny, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Andreas Stiasny',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Festung_Hohensalzburg_von_Nordost.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hohensalzburg-0132a2ed.jpg',
        lyhyt: 'Ilmakuva Hohensalzburgin linnoituksesta.',
        selite: 'Linnoituksen muurit, pihat ja rakennukset ylhäältä katsottuna. Ympärillä on metsää, ja vasemmassa yläkulmassa näkyy Salzburgin vanhaakaupunkia.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Hohensalzburg_Fortress_(view_from_the_southwest).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hohensalzburgin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Reisszug on?',
      'Milloin linnoitusta piiritettiin?',
    ],
    korostukset: ['Reisszug|Reisszugin'],
    nappi: 'Maailman vanhin rautatie linnan kyljessä',
    // 13.0472 E / 47.795 N — en-Wikipedia "Hohensalzburg Fortress"
    laudat: {
      maailmankartta: { x: 6268.2, y: 1484.9 },
      europe: { x: 461.7, y: 636.6 },
    },
    teksti: 'Hohensalzburgin linnoitus on suuri keskiaikainen linnoitus Salzburgin '
      + 'kaupungissa. Se seisoo Festungsbergin päällä 506 metrin korkeudessa, ja sen '
      + 'rakennuttivat Salzburgin ruhtinasarkkipiispat. Linnoitus on 250 metriä pitkä ja '
      + '150 metriä leveä, mikä tekee siitä yhden Euroopan suurimmista keskiaikaisista '
      + 'linnoista.\n\n'
      + 'Rakentaminen alkoi 1077 arkkipiispa Gebhard von Helfensteinin aikana. '
      + 'Alkuperäinen suunnitelma oli yksinkertainen puumuurinen esilinna. Helfensteinin '
      + 'riita keisari Henrik IV:n kanssa investituurakiistassa vauhditti laajennuksia: '
      + 'arkkipiispa asettui paavi Gregorius VII:n puolelle.\n\n'
      + 'Vuonna 1515 koadjutori Matthäus Lang von Wellenburg kuvasi Reisszugin, hyvin '
      + 'varhaisen ja alkeellisen köysiradan, joka toi tavaraa linnan ylemmälle pihalle. '
      + 'Rata on yhä olemassa uudistettuna, ja se on todennäköisesti maailman vanhin '
      + 'toiminnassa oleva rautatie.\n\n'
      + 'Ainoa kerta, kun linnoitus joutui todella piiritetyksi, oli Saksan '
      + 'talonpoikaissota vuonna 1525: kaivosmiesten, talonpoikien ja kaupunkilaisten '
      + 'joukko yritti syöstä ruhtinasarkkipiispa Matthäus Langin vallasta mutta ei saanut '
      + 'linnoitusta haltuunsa.',
    lahde: 'en-Wikipedia "Hohensalzburg Fortress", johdanto-osa ja osio "Early history" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'semmeringin-rata',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-semmeringin-rata-c3ebbc7c.jpg',
      lyhyt: 'Juna ylittää Krausel-Klausen kaarisillan Semmeringin radalla.',
      selite: 'Kivinen ratasilta jatkuu vuoren kupeeseen ja punainen juna ajaa sillan yli. Metsäiset rinteet ympäröivät rataa.',
      lahde: 'Valokuva: Haeferl, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Haeferl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Breitenstein_-_Semmeringbahn_-_Krausel-Klause-Viadukt_-_2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-semmeringin-rata-976013fa.jpg',
        lyhyt: 'Semmeringin metsäiset vuoret ja kalliot, joiden halki rata kulkee.',
        selite: 'Syksyn värittämä metsä ja valkoiset kalliojyrkänteet Semmeringin laaksossa. Taustalla kohoaa kaukainen vuorijono.',
        lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'C.Stadler/Bwag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Semmering_-_Adlitzgr%C3%A4ben_mit_Semmeringbahn.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Semmeringin rata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi radalle piti kehittää oma veturityyppi?',
      'Kuinka paljon rata nousee?',
    ],
    korostukset: ['Carl von Ghega|Carl von Ghega'],
    nappi: 'Euroopan ensimmäinen vuoristorata',
    // 15.831 E / 47.643 N — en-Wikipedia "Semmering railway"
    laudat: {
      maailmankartta: { x: 6361, y: 1491.4 },
      europe: { x: 515.2, y: 640.6 },
    },
    teksti: 'Semmeringin rata alkaa Gloggnitzista ja kulkee Semmeringin yli '
      + 'Mürzzuschlagiin. Se oli Euroopan ensimmäinen normaaliraiteinen vuoristorata, ja '
      + 'sitä pidetään yleisesti maailman ensimmäisenä varsinaisena vuoristoratana — sekä '
      + 'maasto että korkeusero olivat siihen asti näkemättömän vaikeita.\n\n'
      + 'Rata rakennettiin 1848–1854. Työssä oli noin 20 000 ihmistä, ja hanketta johti sen '
      + 'suunnittelija Carl von Ghega. Radalla on neljätoista tunnelia, joista pisin on '
      + 'huipputunneli 1 431 metriä, kuusitoista viaduktia ja yli sata kiviholvisiltaa. '
      + 'Asemat ja työnjohtajien rakennukset tehtiin usein suoraan tunneleista louhitusta '
      + 'kivestä.\n\n'
      + 'Neljänkymmenenyhden kilometrin matkalla rata voittaa 460 metrin korkeuseron. '
      + 'Kuudellakymmenellä prosentilla matkasta nousu on 2,0–2,5 prosenttia, ja '
      + 'kuudellatoista prosentilla kaarresäde on vain 190 metriä. Rakennusaikana oli '
      + 'kehitettävä uudet mittausvälineet ja -menetelmät, ja Engerth-veturit otettiin '
      + 'käyttöön siksi, etteivät ajan tavalliset veturityypit selvinneet näin jyrkistä '
      + 'nousuista ja tiukoista kaarteista.\n\n'
      + 'Rata on yhä täydessä käytössä osana Eteläistä rataa yli 160 vuotta '
      + 'valmistumisensa jälkeen.',
    lahde: 'en-Wikipedia "Semmering railway", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mauthausen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mauthausen-75900a7d.jpg',
      lyhyt: 'Mauthausenin muistopaikan kivinen sisäänkäyntirakennus ja valkoinen muistomerkki.',
      selite: 'Graniittikivestä rakennetut tornimaiset porttirakennukset ja niiden edessä valkoinen muistokivi aukiolla. Mauthausen on nykyisin muistopaikka ja museo.',
      lahde: 'Valokuva: Dnalor 01, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Dnalor 01',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eingangsgeb%C3%A4ude_KZ_Mauthausen_2014.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mauthausen-29be8719.jpg',
        lyhyt: 'Mauthausenin muistopaikan graniittimuurit ja sisäänkäynti ylhäältä nähtynä.',
        selite: 'Kukkulalla sijaitseva muistopaikka on rakennettu louhitusta graniitista. Paksu kivimuuri ja porttirakennus erottuvat vihreän nurmikkorinteen takana.',
        lahde: 'Valokuva: Philipp7423, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Philipp7423',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:KZ_Mauthausen_2017-01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mauthausen',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi leiri perustettiin juuri tähän paikkaan?',
      'Kuinka moni vangeista kuoli?',
    ],
    korostukset: ['graniittilouhos|graniittilouhoksen'],
    nappi: 'Louhos, jonka takia leiri rakennettiin',
    // 14.5011 E / 48.2569 N — en-Wikipedia "Mauthausen concentration camp"
    laudat: {
      maailmankartta: { x: 6316.7, y: 1465.3 },
      europe: { x: 489.6, y: 624.4 },
    },
    teksti: 'Mauthausen oli kansallissosialistien keskitysleiri kukkulalla Mauthausenin '
      + 'kauppalan yllä Ylä-Itävallassa, noin kaksikymmentä kilometriä Linzistä itään. Se '
      + 'oli pääleiri ryhmälle, johon kuului lähes sata alaleiriä eri puolilla Itävaltaa ja '
      + 'Etelä-Saksaa.\n\n'
      + 'Pääleiri toimi 8. elokuuta 1938 alkaen — muutama kuukausi Itävallan liittämisen '
      + 'jälkeen — 5. toukokuuta 1945 asti, jolloin Yhdysvaltain armeija vapautti sen. '
      + 'Tammikuussa 1945 leireillä oli noin 85 000 vankia.\n\n'
      + 'Paikka valittiin läheisen graniittilouhoksen ja Linzin läheisyyden takia. Vaikka '
      + 'leiri oli alusta asti Saksan valtion hallinnassa, sen perusti yksityinen yhtiö '
      + 'taloudellisena hankkeena. Vangit pakotettiin orjatyöhön louhoksissa, kaivoksissa, '
      + 'ammustehtaissa ja asetehtaissa oloissa, jotka tappoivat.\n\n'
      + 'Mauthausenin olot olivat ankarammat kuin useimmissa muissa leireissä: sen ja '
      + 'alaleiriensä 190 000 vangista puolet kuoli. Se oli yksi ensimmäisistä suurista '
      + 'keskitysleirikokonaisuuksista ja viimeinen, jonka liittoutuneet vapauttivat. '
      + 'Pääleiri on nykyään museo.',
    lahde: 'en-Wikipedia "Mauthausen concentration camp", johdanto-osa ja osio '
      + '"Establishment of the main camp" (tarkistettu 6.9.2026).',
  },
  {
    id: 'durnstein',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-durnstein-56b71ced.jpg',
      lyhyt: 'Dürnsteinin sininen kirkontorni kohoaa Tonavan rannalla.',
      selite: 'Luostarikirkon sinivalkoinen torni ja punakattoiset rakennukset Tonavan rannalla. Kukkulan päällä näkyy linnanraunio.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stift_D%C3%BCrnstein,_20210728_1223_0745.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-durnstein-ec3ea478.jpg',
        lyhyt: 'Dürnsteinin linnanraunio kohoaa kalliolla syksyisen metsän yllä.',
        selite: 'Linnan rauniot seisovat kalliokielekkeellä syksyn värjäämän metsän yllä. Alarinteessä erottuu viinitarhan terasseja.',
        lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Uoaei1',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:D%C3%BCrnstein_Burgruine_20211024_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dürnstein',
    tyyppi: 'sana',
    kysymykset: [
      'Miksi Leopold vangitsi Rikhardin?',
      'Mistä nimi Dürnstein tulee?',
    ],
    korostukset: ['Rikhard Leijonamieli|Rikhard Leijonamieli'],
    nappi: 'Linna, jossa Leijonamieltä pidettiin',
    // 15.5203 E / 48.3956 N — en-Wikipedia "Dürnstein"
    laudat: {
      maailmankartta: { x: 6350.7, y: 1459.4 },
      europe: { x: 509.2, y: 620.8 },
    },
    teksti: 'Dürnstein on pieni kaupunki Tonavan rannalla Ala-Itävallassa. Se on Wachaun '
      + 'alueen käydyimpiä matkakohteita ja tunnettu viinialue.\n\n'
      + 'Nimi tulee keskiaikaisesta Dürnsteinin linnasta, joka kohosi kaupungin yllä. '
      + 'Linnan nimi taas tulee saksan sanoista dürr, kuiva, ja Stein, kivi: kivilinna oli '
      + 'kuiva, koska se seisoi kalliokummulla korkealla Tonavan kostean rannan '
      + 'yläpuolella. Nykyinen kaupunki on linnan ja joen välissä.\n\n'
      + 'Dürnstein mainitaan ensi kerran vuonna 1192, kun Englannin kuningas Rikhard I oli '
      + 'kaupungin yläpuolisessa linnassa Itävallan herttuan Leopold V:n vankina. Rikhard '
      + 'Leijonamieli oli loukannut Leopoldia heittämällä tämän lipun alas muureilta Akkonin '
      + 'valtauksen jälkeen, ja herttua epäili kuninkaan määränneen serkkunsa Konrad '
      + 'Montferratilaisen murhan Jerusalemissa. Paavi Kölestinus III julisti Leopoldin '
      + 'pannaan ristiretkeläistoverin vangitsemisesta.\n\n'
      + 'Lopulta herttua luovutti kuninkaan keisari Henrik VI:lle, joka vangitsi hänet '
      + 'Trifelsin linnaan. Dürnsteinin linnan itsensä tuhosivat lähes kokonaan Ruotsin '
      + 'joukot sotamarsalkka Lennart Torstenssonin johdolla vuonna 1645.',
    lahde: 'en-Wikipedia "Dürnstein", osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'carnuntum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-carnuntum-c7b1733d.jpg',
      lyhyt: 'Rekonstruoitu roomalaisen kylpylän suuri sali Carnuntumissa.',
      selite: 'Kylpylärakennuksen sisätila on maalattu roomalaistyyliin: kuviolliset katot, kaarevat ikkunat ja marmorinen allas. Seinillä on vaatekoukkuja ja huoneessa penkkejä.',
      lahde: 'Valokuva: Barnos, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Barnos',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilica_thermarum_Carnuntum.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-carnuntum-c60d27a4.jpg',
        lyhyt: 'Roomalaisen kylpylän lattian alle rakennetut tiilipylväät Carnuntumissa.',
        selite: 'Lattian alla näkyvät pienet tiilipylväät kuuluivat kylpylän lämmitysjärjestelmään. Laatat lepäävät pylväiden päällä.',
        lahde: 'Valokuva: Tobias Kleinlercher, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tobias Kleinlercher',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carnuntum_in_2026_by_TheTokl_-_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Carnuntum',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka suuri Carnuntum oli?',
      'Mikä meripihkatie oli?',
    ],
    korostukset: ['meripihkatie|meripihkatien'],
    nappi: '50 000 asukasta Tonavan rajalla',
    // 16.8614 E / 48.1133 N — en-Wikipedia "Carnuntum"
    laudat: {
      maailmankartta: { x: 6395.4, y: 1471.4 },
      europe: { x: 534.9, y: 628.2 },
    },
    teksti: 'Carnuntum oli roomalainen legioonalinnoitus ja Pannonian laivaston päämaja '
      + 'vuodesta 50 jaa. Ensimmäisen vuosisadan jälkeen siitä tuli Pannonia Superior '
      + '-provinssin pääkaupunki, ja se kasvoi noin viidenkymmenentuhannen asukkaan '
      + 'suurkaupungiksi.\n\n'
      + 'Rauniot ovat Tonavan varrella Ala-Itävallassa puolimatkassa Wienin ja Bratislavan '
      + 'välillä. Arkeologinen puisto kattaa kymmenen neliökilometriä Petronell-Carnuntumin '
      + 'ja Bad Deutsch-Altenburgin kylien liepeillä.\n\n'
      + 'Carnuntum tulee historiaan Augustuksen aikana vuonna 6 jaa., kun Tiberius teki '
      + 'siitä tukikohtansa sotaretkillään Maroboduusta vastaan. Legio XV Apollinaris '
      + 'sijoitettiin sinne varuskunnaksi ennen vuotta 14, ja paikasta tuli Tonavan '
      + 'varustusketjun keskus Vindobonasta eli Wienistä Brigetioon. Vuosina 117–118 '
      + 'Carnuntumista tuli Legio XIV Geminan pysyvä sijoituspaikka, ja legioona pysyi '
      + 'siellä kolme vuosisataa, kunnes raja romahti vuonna 430.\n\n'
      + 'Kaupunki oli myös meripihkan suuri kauppapaikka: pohjoisesta tuotua meripihkaa '
      + 'myytiin täällä kauppiaille, jotka veivät sen Italiaan, ja meripihkatien päähaara '
      + 'ylitti Tonavan juuri Carnuntumin kohdalla.',
    lahde: 'en-Wikipedia "Carnuntum", johdanto-osa sekä osiot "Military history" ja '
      + '"History of the city" (tarkistettu 6.9.2026).',
  },
  {
    id: 'eisriesenwelt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-eisriesenwelt-96fade9c.jpg',
      lyhyt: 'Eisriesenweltin luolan suuaukko avautuu jyrkässä vuorenrinteessä.',
      selite: 'Kalkkikivirinne, luolan suuaukko ja kulkusilta vuoren kyljessä. Vasemmalla näkyy syvä laakso ja pilvinen taivas.',
      lahde: 'Valokuva: Wolfgang Kritzinger, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Wolfgang Kritzinger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eingang_Eisriesenwelt.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-eisriesenwelt-793cd1df.jpg',
        lyhyt: 'Luolan sisältä avautuu näkymä lumisille Alpeille.',
        selite: 'Kallioportti kehystää näkymän laaksoon ja kaukaisiin lumihuippuisiin vuoriin. Alhaalla kiemurtelee kulkupolku kaiteineen.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eisriesenwelt,_Macizos_de_Tennen,_Austria,_2019-05-18,_DD_58.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Eisriesenwelt',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi jää ei sula kesällä?',
      'Miksi paikalliset eivät menneet luolaan?',
    ],
    korostukset: ['jääluola|jääluola'],
    nappi: 'Maailman suurin jääluola',
    // 13.1903 E / 47.5029 N — en-Wikipedia "Eisriesenwelt"
    laudat: {
      maailmankartta: { x: 6273, y: 1497.3 },
      europe: { x: 464.5, y: 644.3 },
    },
    teksti: 'Eisriesenwelt — saksaksi jääjättiläisten maailma — on kalkkikivestä ja jäästä '
      + 'muodostuva luola Werfenissä, noin neljäkymmentä kilometriä Salzburgista etelään. '
      + 'Se on Hochkogel-vuoren sisässä Tennengebirgessä ja on maailman suurin jääluola: '
      + 'yli 42 kilometriä pitkä ja noin 200 000 kävijää vuodessa.\n\n'
      + 'Vaikka luola on 42 kilometriä pitkä, vain ensimmäinen kilometri — juuri se osa, '
      + 'johon matkailijat pääsevät — on jään peitossa. Loppu on paljasta kalkkikiveä. '
      + 'Luolan kaiversi Salzach-joki, ja jäämuodostelmat syntyivät sulavasta lumesta, '
      + 'joka valui luolaan ja jäätyi talvella.\n\n'
      + 'Jää säilyy, koska sisäänkäynti on auki ympäri vuoden. Talvella kylmä tuuli '
      + 'puhaltaa sisään ja jäädyttää lumen, ja kesällä kylmä ilmavirta puhaltaa luolasta '
      + 'ulos päin eikä päästä lämpimää sisään sulattamaan muodostelmia.\n\n'
      + 'Luonnontieteilijä Anton Posselt löysi luolan virallisesti 1879, mutta hän tutki '
      + 'siitä vain ensimmäiset kaksisataa metriä. Paikalliset tunsivat luolan jo ennestään '
      + 'mutta kieltäytyivät menemästä sisään: he uskoivat sen olevan helvetin portti.',
    lahde: 'en-Wikipedia "Eisriesenwelt", johdanto-osa sekä osiot "Geology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — KOLME KOHDETTA LISÄÄ. Omistaja 11.9.2026:
   * *"Agentit voisivat tarkastaa myös muut Euroopan maat että
   * kaikissa tarpeeksi nostoja."* Tavoite on vähintään 20 pääkartan
   * nostoa per Euroopan maa; Itävalta oli 17:ssä.
   *
   * Kaikki kolme ovat kaukana Wienin laatasta (lähinkin Erzberg 58
   * lautayksikköä), joten ne ovat pääkartan merkkejä. Kuvat lisätty 20.9.2026 (ent. kuvaton erä);
   * faktat en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'erzberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-erzberg-ebd73b0e.jpg',
      lyhyt: 'Erzberg kohoaa Eisenerzin yllä porrastettuna avolouhoksena.',
      selite: 'Iltavalo värjää rautamalmivuoren ruskeankeltaiseksi. Louhoksen tasanteet erottuvat vuoren rinteessä, ja edessä on metsää ja talo.',
      lahde: 'Valokuva: Duke of W4, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Duke of W4',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Der_Erzberg_(Steiermark).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-erzberg-f5948e97.jpg',
        lyhyt: 'Erzbergin louhostasanteilla työskentelee kaivinkone ja kuorma-auto.',
        selite: 'Lähikuva avolouhoksen kerroksellisista kallioseinämistä. Pienet työkoneet erottuvat jättimäisillä tasanteilla.',
        lahde: 'Valokuva: Haeferl, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Haeferl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eisenerz_-_Erzbergstufen.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Erzberg',
    tyyppi: 'kauppa',
    kysymykset: [
      'Kuinka kauan vuorta on louhittu?',
      'Miten malmi saatiin ennen laaksoon?',
    ],
    korostukset: ['sideriitti|sideriitti'],
    nappi: 'Rautavuori, jota on louhittu yli 1 300 vuotta',
    // 14.8878 E / 47.5333 N — Eisenerz, Steiermark;
    // en-Wikipedia "Erzberg mine"
    laudat: {
      maailmankartta: { x: 6329.6, y: 1496.0 },
    },
    teksti: 'Erzberg on suuri avolouhos Eisenerzissä Steiermarkissa, '
      + 'kuusikymmentä kilometriä Grazista luoteeseen. Se on Itävallan suurin '
      + 'rautamalmiesiintymä: varantoja arvioidaan olevan 235 miljoonaa tonnia, '
      + 'ja kaivos tuottaa noin 3,2 miljoonaa tonnia puhdasta rautamalmia '
      + 'vuodessa. Malmin päämineraalit ovat sideriitti, ankeriitti ja '
      + 'rautapitoinen dolomiitti, ja rautapitoisuus on keskimäärin 21 '
      + 'prosenttia.\n\n'
      + 'Rautaa on louhittu täällä yli 1 300 vuotta. Eisenerzin '
      + 'Oswaldikirchessä oli asiakirja, jonka mukaan louhinta alkoi vuonna '
      + '712, mutta tietoa ei ole vahvistettu. Aluksi malmia otettiin pinnasta: '
      + '1100-luvulla louhittiin lähellä pintaa ollutta limoniittia, ja se '
      + 'sulatettiin pienissä ahjoissa kuoppien vieressä. Kaivosmiesten '
      + 'toimeentulo oli vaatimatonta.\n\n'
      + 'Maanalainen louhinta alkoi 1500-luvulla keisarin käskystä, ja työ '
      + 'tehtiin vasaralla ja hakulla. Yläosaa louhivat Vordernbergin ja '
      + 'alaosaa Innerbergin — nykyisen Eisenerzin — asukkaat. Laaksoon '
      + 'rakennettiin Radwerk-ahjoja, joissa vesirattaat käyttivät palkeita, ja '
      + 'asutus kasvoi niiden ympärille. Vuorella kokeiltiin mustaa ruutia '
      + '1720 ja dynamiittia 1870, ja vuodesta 1876 räjähdysnallit sytytettiin '
      + 'sähköjohdoilla.\n\n'
      + 'Malmi kannettiin aluksi käsin ja vedettiin laaksoon kelkoilla, joita '
      + 'kutsuttiin nimellä Sackzug; naiset olivat työssä mukana, ennen kuin '
      + 'hevosia ja kärryjä oli saatavilla. Vuosina 1810–1870 käytäviin tuli '
      + 'kiskot ja kaivoskärryt, 1951 ensimmäiset kuorma-autot, ja 1963 '
      + 'mennessä ne olivat korvanneet kiskot. Vuorella ajetaan nykyään myös '
      + 'vuotuista Erzberg Rodeo -enduroajoa.',
    lahde: 'en-Wikipedia "Erzberg mine", johdanto-osa sekä osiot "Geology" ja '
      + '"History" (tarkistettu 11.9.2026).',
  },
  {
    id: 'bregenzin-jarvinayttamo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bregenzin-jarvinayttamo-83b6f66f.jpg',
      lyhyt: 'Ilmakuva Bregenzin festivaalitalosta ja Bodenjärvellä kelluvasta näyttämöstä.',
      selite: 'Kelluva järvinäyttämö lavasteineen sijaitsee Bodenjärven rannalla festivaalirakennuksen vieressä. Kuva on otettu ilmasta.',
      lahde: 'Valokuva: Edda Praefcke, Wikimedia Commons (CC BY 2.5).',
      tekija: 'Edda Praefcke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bregenz_Festspielhaus_Tosca.jpg',
      lisenssi: 'CC BY 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bregenzin-jarvinayttamo-efd41cfe.jpg',
        lyhyt: 'Bregenzin järvinäyttämön katsomo vesirajassa.',
        selite: 'Vihreät ja siniset katsomon istuimet nousevat porrastettuina festivaalirakennuksen edessä. Oikealla näkyy järven vesi.',
        lahde: 'Valokuva: Olaf Kosinsky, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Olaf Kosinsky',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carmen_Festspiele_Bregenz_2017_by_Olaf_Kosinsky-17.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de',
      },
    ],
    nimi: 'Bregenzin järvinäyttämö',
    nimio: 'Bregenz',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä ensimmäiset näyttämöt rakennettiin?',
      'Mikä elokuva kuvattiin näyttämöllä 2008?',
    ],
    korostukset: ['proomu|proomuista'],
    nappi: 'Oopperalava keskellä Bodenjärveä',
    // 9.7333 E / 47.5069 N — Seebühne, Bregenz;
    // en-Wikipedia "Bregenz Festival"
    laudat: {
      maailmankartta: { x: 6157.8, y: 1497.1 },
    },
    teksti: 'Bregenzer Festspiele on esittävän taiteen festivaali, joka '
      + 'järjestetään joka heinä- ja elokuu Bregenzissä Vorarlbergissä. Sen '
      + 'tunnus on suuri kelluva näyttämö Bodenjärvellä.\n\n'
      + 'Kansainvälinen tapahtuma siitä tuli heti ensimmäisenä vuonna 1946, '
      + 'vuosi toisen maailmansodan päättymisen jälkeen: väkeä tuli Saksasta, '
      + 'Sveitsistä ja Ranskasta. Kaksi näyttämöä rakennettiin kelluvista '
      + 'proomuista, toinen Wienin sinfoniaorkesterille ja toinen lavasteille. '
      + 'Orkesteri on ollut festivaalin suurin tekijä ja esiintynyt siellä joka '
      + 'vuosi alusta asti.\n\n'
      + 'Vuonna 2001 ohjelmaan tuli nykytaiteen tapahtumia yhteistyössä '
      + 'Kunsthaus Bregenzin kanssa, ja sen rinnalle on kasvanut lastenfestivaali '
      + 'sekä ooppera- ja orkesterityöpajoja. Taiteellisena johtajana toimi '
      + 'joulukuusta 2003 vuoteen 2014 David Pountney, ja 2015 hänen jälkeensä '
      + 'aloitti Elisabeth Sobotka, joka perusti myös nuorille laulajille '
      + 'tarkoitetun oopperastudion.\n\n'
      + 'Näyttämö on näkynyt muuallakin kuin oopperayleisölle. Huhti–toukokuussa '
      + '2008 siellä kuvattiin kohtauksia James Bond -elokuvaan Quantum of '
      + 'Solace kesken Tosca-esityksen, ja saman vuoden kesäkuussa saksalainen '
      + 'ZDF piti kelluvalla lavalla jalkapallon EM-kisojen lähetysstudiotaan. '
      + 'Vuonna 2010 festivaalilla oli noin sata esitystä ja lähes 200 000 '
      + 'katsojaa; vuoden 2015 kaudella yleisöä oli noin 257 000.',
    lahde: 'en-Wikipedia "Bregenz Festival", johdanto-osa ja osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'krimmlin-vesiputoukset',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-krimmlin-vesiputoukset-53ad9d1b.jpg',
      lyhyt: 'Krimmlin vesiputous syöksyy kalliolta metsäiseen laaksoon.',
      selite: 'Valkoinen vesimassa putoaa kallioseinämää alas ja sumu leijuu laaksossa. Etualalla näkyy joen uoma ja pieniä kävelijöitä.',
      lahde: 'Valokuva: Andrew Bossi, Wikimedia Commons (CC BY-SA 2.5).',
      tekija: 'Andrew Bossi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1424_-_Nationalpark_Hohe_Tauern_-_Krimmler_Wasserf%C3%A4lle.JPG',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-krimmlin-vesiputoukset-67048bae.jpg',
        lyhyt: 'Krimmlin putouksen vesi vaahtoaa kallioiden välissä.',
        selite: 'Lähikuva putouksen alaosasta: vaahtoava vesi ja sumu nousevat tummien kallioiden ja metsän edessä.',
        lahde: 'Valokuva: Andrew Bossi, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Andrew Bossi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:1437_-_Nationalpark_Hohe_Tauern_-_Krimmler_Wasserf%C3%A4lle.JPG',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
    ],
    nimi: 'Krimmlin vesiputoukset',
    nimio: 'Krimml',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka paljon virtaama vaihtelee vuodenajan mukaan?',
      'Minne putouksen vesi lopulta päätyy?',
    ],
    korostukset: ['sammal|sammalille'],
    nappi: 'Itävallan korkein putous kolmessa portaassa',
    // 12.1728 E / 47.2075 N — en-Wikipedia "Krimml Waterfalls"
    laudat: {
      maailmankartta: { x: 6239.1, y: 1509.8 },
    },
    teksti: 'Krimmlin vesiputoukset ovat kokonaiskorkeudeltaan 380 metriä ja '
      + 'Itävallan korkeimmat. Ne ovat Krimmler Ache -joessa Krimmlin kylän '
      + 'lähellä Korkean Tauernin kansallispuistossa Salzburgin osavaltiossa. '
      + 'Vesi laskee kolmessa portaassa: ylin pudotus on 140 metriä, '
      + 'keskimmäinen 100 ja alin 140. Putouksen korkein kohta on 1 470 metriä '
      + 'merenpinnan yläpuolella.\n\n'
      + 'Krimmler Ache on jäätikköpuro, ja sen virtaama vaihtelee rajusti '
      + 'vuodenajan mukaan. Kesä- ja heinäkuussa se on 5,6 kuutiometriä '
      + 'sekunnissa, helmikuussa vain 0,14. Suurin mitattu virtaama oli 25. '
      + 'elokuuta 1987, jolloin se nousi 166,7 kuutiometriin sekunnissa. '
      + 'Putousten jälkeen joki yhtyy Salzachiin, joka vie veden Inniin, sieltä '
      + 'Tonavaan ja lopulta Mustaanmereen.\n\n'
      + 'Jotta putouksen näkisi vaivatta, Ignaz von Kürsinger Mittersillistä '
      + 'rakennutti polun sen yläosaan, ja Itävallan alppikerho paransi tietä '
      + '1879 näköalojen vuoksi. Kävijöitä on noin 400 000 vuodessa.\n\n'
      + 'Putouksen usva luo kasvuolot sadoille sammalille, jäkälille ja '
      + 'saniaisille, ja ympäristössä elää 62 lintulajia. Pienelle kylälle '
      + 'suosio on myös rasite: liikennettä on paljon ja tie kuluu.',
    lahde: 'en-Wikipedia "Krimml Waterfalls", johdanto-osa sekä osiot "Falls", '
      + '"Flow" ja "Tourism" (tarkistettu 11.9.2026).',
  },
];
