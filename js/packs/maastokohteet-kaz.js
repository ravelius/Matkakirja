/*
 * MAASTOKOHTEET — KAZ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KAZ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KAZ.json. Työkalu laskee laudan
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
 * Kazakstanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kaspianmeri on annettu IRN:lle, joten Kazakstanin 'meri' on Araljärvi — jonka koko tarina on juuri se, ettei merta enää ole.
 */
export const MAASTOKOHTEET_KAZ = [
  {
    id: 'khantengri',
    nimi: 'Khan Tengri',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipun korkeus riippuu jäästä?',
      'Mikä Tian Shan on?',
    ],
    korostukset: ['Tian Shan|Tian Shanin'],
    nappi: 'Taivaiden valtias kolmen maan rajalla',
    // 80.175 E / 42.2108 N — en-Wikipedia "Khan Tengri"
    laudat: {
      maailmankartta: { x: 8505.8, y: 1715.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Khan Tengri, "taivaiden valtias", kohoaa Tian Shanin vuoristossa täsmälleen '
      + 'Kazakstanin, Kirgisian ja Kiinan rajojen yhtymäkohdassa, ja se on Kazakstanin korkein '
      + 'kohta. Kalliohuippu on 6 995 metrissä, mutta laen jääkupu nostaa vuoren 7 010 metriin '
      + '— siksi vuorikiipeilijät laskevat sen seitsemäntuhantisten joukkoon. Koko Tian '
      + 'Shanissa sen ylittää vain Jengish Chokusu.',
    lahde: 'en-Wikipedia "Khan Tengri", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'araljarvi',
    nimi: 'Araljärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Minne Araljärven vesi meni?',
      'Mitä \'saarten meri\' tarkoittaa?',
    ],
    korostukset: ['puuvilla|puuvillapelloille'],
    nappi: 'Meri, joka katosi ihmisen käsissä',
    // 60 E / 45 N — en-Wikipedia "Aral Sea" — entisen järven keskipiste
    laudat: {
      maailmankartta: { x: 7833.3, y: 1601.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Araljärvi oli vielä 1900-luvun puolivälissä maailman kolmanneksi suurin järvi, 68 000 '
      + 'neliökilometriä suolaista vettä Kazakstanin ja Uzbekistanin välissä — nimi tarkoittaa '
      + 'saarten merta, sillä saaria oli yli tuhat. Kun Neuvostoliitto käänsi sitä ruokkivat '
      + 'joet puuvillapelloille 1960-luvulta alkaen, järvi alkoi kutistua, ja vuoteen 2007 '
      + 'mennessä jäljellä oli kymmenesosa. Entinen pohja on nykyään aavikkoa, ja vain '
      + 'pohjoinen allas Kazakstanin puolella on saatu osin elvytettyä.',
    lahde: 'en-Wikipedia "Aral Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'irtys',
    nimi: 'Irtyš',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Irtyš on \'vain\' sivujoki?',
      'Minkä kolmen maan läpi joki virtaa?',
    ],
    korostukset: ['Ob|Obiin'],
    nappi: 'Maailman pisin sivujoki',
    // 80.25 E / 50.42 N — Semein kohdalla Itä-Kazakstanissa; artikkelin koordinaatti 68,83 / 61,08 on alajuoksulla Venäjällä
    laudat: {
      maailmankartta: { x: 8508.3, y: 1371.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Irtyš alkaa Mongolian Altailta Kiinan puolelta, virtaa Kazakstanin itäosan halki ja '
      + 'jatkaa Venäjälle, missä se laskee Obiin. Se on maailman pisin sivujoki — pidempi kuin '
      + 'pääjokensa siihen asti, missä ne kohtaavat. Yhdessä Ob ja Irtyš muodostavat '
      + 'jokijärjestelmän, joka kokoaa vedet suurimmasta osasta Länsi-Siperiaa ja Altain '
      + 'vuoristoa.',
    lahde: 'en-Wikipedia "Irtysh", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M10, AASIA 3, 6.9.2026 ───────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Kazakstanilla oli ennen tätä erää kolme maastokohdetta mutta ei
   * yhtäkään kohdetta, eläintäkyä eikä skandaalia. Tavoite maata kohti
   * on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 7137,5…8989,2 ja y 1018,6…1884,3).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Saryarka 81,0 lautayksikön päässä Astana-laatasta ja kaukaisin
   * Baikonur 279,8 yksikön päässä Samarkandista. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, joten Kazakstanin kokoisessa maassa
   * se ei rajannut yhtäkään ehdokasta.
   *
   * OTRAR JÄI POIS NIMIÖLIMITYKSEN TAKIA: Silkkitien kaupungin rauniot
   * ovat 18,0 lautayksikön päässä Turkistanin mausoleumista, ja kahden
   * nimiön laatikot osuisivat päällekkäin. Tilalle tuli Saryarkan
   * arojärvien maailmanperintökohde, joka tuo merkin myös maan
   * pohjoisosaan.
   *
   * ARALJÄRVI ON JO MAAN OMA MAASTOKOHDE tässä tiedostossa, joten sitä
   * ei ole toistettu; järven kuivumisesta kertoo maan skandaalikortti
   * (js/packs/skandaalit.js, KAZ) Aralskin kaupungin kohdalla 92,9
   * yksikön päässä järven merkistä.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'yasawin-mausoleumi',
    nimi: 'Yasawin mausoleumi',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennuksen tilasi ja miksi?',
      'Miksi mausoleumi jäi keskeneräiseksi?',
    ],
    korostukset: ['Timur|Timur'],
    nappi: 'Keskeneräinen mestariteos Turkistanissa',
    // 68.27083 E / 43.29778 N — en-Wikipedia "Mausoleum of Khoja Ahmed Yasawi"
    laudat: {
      maailmankartta: { x: 8109, y: 1671.3 },
    },
    teksti: 'Khoja Ahmed Yasawin mausoleumi on hautarakennus Turkistanin kaupungissa '
      + 'Etelä-Kazakstanissa. Timur tilasi sen 1389 korvaamaan pienemmän 1100-luvun '
      + 'hautamuistomerkin, joka oli pystytetty turkkilaiselle runoilijalle ja '
      + 'sufimystikolle Khoja Ahmed Yasawille (1093–1166), mutta rakennustyö keskeytyi '
      + 'Timurin kuolemaan 1405. Keskeneräisyydestään huolimatta mausoleumi on parhaiten '
      + 'säilynyt kaikista timuridirakennuksista, ja se aloitti kokonaisen '
      + 'rakennustyylin: kokeilevat tilaratkaisut, uudet holvi- ja kupolirakenteet sekä '
      + 'lasitetuilla laatoilla tehty koristelu levisivät siitä ympäri valtakuntaa ja sen '
      + 'ulkopuolelle. Pyhiinvaeltajia tulee yhä koko Keski-Aasiasta. Unesco kirjasi sen '
      + '2003 Kazakstanin ensimmäiseksi maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Mausoleum of Khoja Ahmed Yasawi", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tamgaly',
    nimi: 'Tamgaly',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka vanhoja kalliokuvat ovat?',
      'Kuinka monta kuvaa alueella on?',
    ],
    korostukset: ['saka|sakojen'],
    nappi: 'Viisituhatta kalliokuvaa kanjonissa',
    // 75.535 E / 43.80333 N — en-Wikipedia "Tanbaly"
    laudat: {
      maailmankartta: { x: 8351.2, y: 1650.8 },
    },
    teksti: 'Tamgaly on kalliopiirroskohde Zhetysun alueella Kazakstanissa, noin 170 '
      + 'kilometriä Almatysta luoteeseen. Vanhimmat piirrokset ovat pronssikaudelta noin '
      + 'kolmentuhannen vuoden takaa, jolloin seutua asuttivat sakojen eli skyyttien '
      + 'edeltäjät, ja nuorimmat ovat 1700- tai 1800-luvulta. Kaikkiaan piirroksia on noin '
      + '5 000 ja ne jakautuvat 48 paikkaan; viidellä tärkeimmällä paikalla, jotka ovat '
      + 'kaikki pienessä Tamgalyn kanjonissa, on niistä noin 3 000. Arvokkaimpina pidetään '
      + 'keskipronssikauden kuvia: ne ovat tavallisesti 25–30 senttimetriä korkeita, '
      + 'suurimmat metrin, ja ne on hakattu kiveen kolmen–viiden millimetrin syvyyteen. '
      + 'Kohde on ollut maailmanperintöluettelossa vuodesta 2004.',
    lahde: 'en-Wikipedia "Tanbaly", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'baikonur',
    nimi: 'Baikonur',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä Baikonurista on laukaistu?',
      'Miksi laukaisualusta on nimetty Gagarinin mukaan?',
    ],
    korostukset: ['Sputnik 1|Sputnik 1'],
    nappi: 'Arolla avaruuteen',
    // 63.305 E / 45.965 N — en-Wikipedia "Baikonur Cosmodrome"
    laudat: {
      maailmankartta: { x: 7943.5, y: 1561.8 },
    },
    teksti: 'Baikonurin kosmodromi on avaruussatama Kazakstanin arolla, ja pinta-alaltaan '
      + 'se on maailman suurin käytössä oleva laukaisupaikka. Se sijaitsee noin 90 metriä '
      + 'merenpinnan yläpuolella, 200 kilometriä Araljärvestä itään ja 33 kilometriä Syr '
      + 'Darjasta pohjoiseen, lähellä Töretamin asemaa Trans-Aralin radan varrella. '
      + 'Neuvostoliiton puolustusministeriö perusti sen 1955 avaruusohjelmansa '
      + 'päätukikohdaksi. Baikonurista laukaistiin sekä Sputnik 1 että Vostok 1, ja '
      + 'molempien käyttämä alusta nimettiin Gagarinin lähdöksi kosmonautti Juri Gagarinin '
      + 'mukaan — hän lensi Vostok 1:llä ja oli ensimmäinen ihminen avaruudessa. Venäjä on '
      + 'hallinnoinut laitosta vuodesta 1991, ja vuonna 2005 ratifioitu sopimus Kazakstanin '
      + 'kanssa antaa sen vuokrata avaruussatamaa vuoteen 2050 asti.',
    lahde: 'en-Wikipedia "Baikonur Cosmodrome", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'charynin-kanjoni',
    nimi: 'Charynin kanjoni',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka syvä kanjoni on?',
      'Mikä on Linnojen laakso?',
    ],
    korostukset: ['Linnojen laakso|Linnojen laakso'],
    nappi: 'Sata neljäkymmentä kilometriä kalliota',
    // 79.0925 E / 43.3581 N — en-Wikipedia "Charyn Canyon"
    laudat: {
      maailmankartta: { x: 8469.7, y: 1668.9 },
    },
    teksti: 'Charynin kanjoni on Charyn-joen uurtama kanjoni noin 200 kilometriä Almatysta '
      + 'itään, lähellä Kazakstanin ja Kiinan rajaa. Se on kaikkiaan noin 154 kilometriä '
      + 'pitkä ja kuuluu 23. helmikuuta 2004 perustettuun Charynin kansallispuistoon. '
      + 'Muodot ovat syntyneet sedimenttikiven rapautuessa, ja paikoin kanjoni on 150–300 '
      + 'metriä syvä. Vaikka se on Grand Canyonia paljon pienempi, sitä on sanottu yhtä '
      + 'vaikuttavaksi. Charynin kanjoni koostuu viidestä eri kanjonista, joista suosituin '
      + 'on Linnojen laakso; muut ovat Temirlikin, Keltainen, Punainen ja Bestamakin '
      + 'kanjoni. Joki itse saa alkunsa Tian Shanin vuorilta ja on 393 kilometriä pitkä.',
    lahde: 'en-Wikipedia "Charyn Canyon", johdanto-osa ja osio "Features" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'altyn-emel',
    nimi: 'Altyn-Emel',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi dyyni laulaa?',
      'Mikä on Besshatyrin hautakenttä?',
    ],
    korostukset: ['Laulava dyyni|Laulavat dyynit'],
    nappi: 'Dyyni, joka soi kuin urut',
    // 78.43333 E / 44.33333 N — en-Wikipedia "Altyn-Emel National Park"
    laudat: {
      maailmankartta: { x: 8447.8, y: 1629.2 },
    },
    teksti: 'Altyn-Emel on Kazakstanin suurin luonnonsuojelualue: 10. huhtikuuta 1996 '
      + 'perustettu kansallispuisto, joka kattaa noin 4 600 neliökilometriä Ili-joen ja '
      + 'Aqtaun vuorijonon välissä ja koostuu enimmäkseen hiekka- ja kivierämaasta. '
      + 'Puiston tunnetuin nähtävyys ovat Laulavat dyynit: puolikuun muotoinen '
      + 'barkaanidyyni on 1,5 kilometriä pitkä ja 120 metriä korkea, ja lännestä puhaltava '
      + 'tuuli saa hiekan jyrisemään kuin urut. Ilmiön syytä ei tiedetä varmasti, mutta '
      + 'tutkijoiden arvelun mukaan kuuma ja kuiva hiekka sähköistyy kitkasta ja alkaa '
      + 'väristä. Puiston alueella on myös Besshatyrin hautakenttä, rautakautisia '
      + 'sakakumpuja, joista on löytynyt kullattuja valjaita, kultakoruja, astioita, aseita '
      + 'ja haarniskoita, sekä Aktaun vuoret, joita väriensä takia kutsutaan '
      + 'kuuvuoriksi.',
    lahde: 'en-Wikipedia "Altyn-Emel National Park", johdanto-osa sekä osiot "Features" '
      + 'ja "The Singing Dunes" (tarkistettu 6.9.2026).',
  },
  {
    id: 'issykin-kurgaani',
    nimi: 'Issykin kurgaani',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka oli Kultainen mies?',
      'Mitä haudasta löytyi?',
    ],
    korostukset: ['Kultainen mies|Kultaiseksi mieheksi'],
    nappi: 'Neljätuhatta kultakoristetta haudassa',
    // 77.61861 E / 43.33 N — en-Wikipedia "Issyk kurgan"
    laudat: {
      maailmankartta: { x: 8420.6, y: 1670 },
    },
    teksti: 'Issykin kurgaani on Kaakkois-Kazakstanissa sijaitseva hautakumpu, joka '
      + 'löydettiin 1969. Se on kuusi metriä korkea ja ympärysmitaltaan 60 metriä, ja se '
      + 'on ajoitettu 300- tai 200-luvulle eaa. Kumpu kuuluu 45 suuren kuninkaallisen '
      + 'kummun hautakenttään, ja sen löysi arkeologi Kemal Akishevin johtama pieni '
      + 'neuvostotutkijoiden ryhmä. Haudassa oli luuranko, soturin varusteet ja '
      + 'hauta-antimia, joukossa 4 000 kultakorua — niin runsas löytö, että vainajaa '
      + 'alettiin kutsua Kultaiseksi mieheksi. Luuranko lienee ollut noin 18-vuotias saka- '
      + 'eli skyyttiruhtinas tai -ruhtinatar; sukupuoli on jäänyt epävarmaksi. Löydöissä on '
      + 'myös hopeamalja, jonka kaiverrusta sanotaan Issykin kirjoitukseksi. Aarteet ovat '
      + 'esillä Astanassa.',
    lahde: 'en-Wikipedia "Issyk kurgan", johdanto-osa ja osio "Golden man" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'aisha-bibi',
    nimi: 'Aisha Bibi',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenelle mausoleumi rakennettiin?',
      'Mistä julkisivun pitsimäisyys syntyy?',
    ],
    korostukset: ['terrakotta|terrakottalaatoilla'],
    nappi: 'Pitsiä poltetusta savesta',
    // 71.21028 E / 42.83361 N — en-Wikipedia "Aisha Bibi"
    laudat: {
      maailmankartta: { x: 8207, y: 1690.1 },
    },
    teksti: 'Aisha-Bibi on 1000- tai 1100-luvulta peräisin oleva mausoleumi, joka '
      + 'rakennettiin ylhäiselle naiselle. Se seisoo samannimisessä kylässä 18 kilometriä '
      + 'Tarazista länteen vanhan Silkkitien varrella, ja paikallisesti sitä pidetään '
      + 'rakkauden ja uskollisuuden muistomerkkinä. Tarinan mukaan karahanidihallitsija '
      + 'rakennutti sen kauniille kihlatulleen Aisha-Bibille, sufirunoilija Khakim-Atan '
      + 'tyttärelle. Rakennus on kokonaan peitetty kaiverretuilla terrakottalaatoilla, '
      + 'joissa on 60 erilaista kasvi- ja geometrista kuviota sekä tyyliteltyä '
      + 'kalligrafiaa — muodot ja koristelu tuovat mieleen hienon pitsin. Tyylillisesti se '
      + 'polveutuu suoraan Buharan samanidimausoleumista. Kymmenen metrin päässä on toinen '
      + 'hautarakennus, Babaji Khatun eli "viisas kuningatar".',
    lahde: 'en-Wikipedia "Aisha Bibi", johdanto-osa sekä osiot "Design", "Site" ja '
      + '"Typology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'saryarka',
    nimi: 'Saryarka',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Saryarka tarkoittaa?',
      'Miksi kosteikot ovat linnuille tärkeitä?',
    ],
    korostukset: ['Korgalzhyn|Korgalzhynin'],
    nappi: 'Kuusitoista miljoonaa muuttolintua',
    // 69.18889 E / 50.43333 N — en-Wikipedia "Saryarka – Steppe and Lakes of
    // Northern Kazakhstan"
    laudat: {
      maailmankartta: { x: 8139.6, y: 1371.3 },
    },
    teksti: 'Saryarka eli keltainen selänne on osa Kazakstanin ylänköä, ja se kirjattiin '
      + 'maailmanperintöluetteloon 7. heinäkuuta 2008. Kohde koostuu kahdesta '
      + 'luonnonsuojelualueesta: Naurzumista Kostanain alueella ja Korgalzhynista Aqmolan '
      + 'alueella. Molemmilla on kosteikkoja, jotka ovat tärkeitä levähdyspaikkoja '
      + 'Afrikasta, Euroopasta ja Etelä-Aasiasta muuttaville linnuille — arviolta 15–16 '
      + 'miljoonaa lintua käyttää aluetta ruokailumaanaan, ja joukossa on monta '
      + 'uhanalaista lajia. Korgalzhynin vaaleanpunaiset flamingot ovat suojelualueen '
      + 'kuuluisin näky, ja se on Kazakstanin suosituimpia lintujen tarkkailupaikkoja. '
      + 'Alueella elävät myös aron omat eläimet: murmelit, sudet ja uhanalainen saiga.',
    lahde: 'en-Wikipedia "Saryarka – Steppe and Lakes of Northern Kazakhstan", '
      + 'johdanto-osa (tarkistettu 6.9.2026).',
  },
];
