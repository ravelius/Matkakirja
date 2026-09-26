/*
 * MAAKUNNAN SALAISUUDET — KREIKKA (14 maakuntaa). Omistajan päätös
 * 26.9.2026 (ELÄVÄ KARTTA, docs/raportit/elava-kartta-suunnitelma-
 * 20260926.md kohta 3); hakemisto js/packs/maakuntasalaisuudet.js.
 *
 * Valintaperiaate: kohde EI ole jo nosto (nostoankkurit-grc.js,
 * fokuskohteet-grc.js, hahmotelma-grc.js), skandaali eikä fokusvirran
 * aihe, ja se on iso, harvinainen ja harvan tuntema. Maakuntien
 * pulukysymykset (maakunnat-pulu.js) on myös vältetty: Dadia, Eupalinoksen
 * tunneli, Kserkseen kanava, Euripoksen salmi ja Dodona ovat jo siellä.
 *
 * Tekstit on kirjoitettu omin sanoin en-Wikipedian artikkeleista (haettu
 * 26.9.2026, artikkelit `lahde`-kentässä); koordinaatit ovat en-Wikipedian
 * coordinates-rajapinnasta (Keroksen, Alonnisoksen ja Abderan piste on
 * artikkelin karkea piste, ei tarkka kohde). `lyhyt` on Livian
 * (nykyaika) ääni, `nappi` 1873-näkökulman alaotsikko kuten
 * hahmotelma-grc.js:ssä.
 *
 * PIKKUKUVA (Sisältökirjuri 26.9.2026, Fablen tilaus löydös 158:n
 * yhteydessä, PR #3307:n skeema 1.49): yksi aito Wikimedia Commons
 * -valokuva kohdekohtaisesti (ei maakunnan yleiskuva), lisenssi
 * tarkistettu Commonsin API:sta ennen latausta, suurennettu enintään
 * 1600 px:iin, viety ämpäriin karttanostot/20260926/. Vain PD/CC0/
 * CC BY/CC BY-SA. Lähteet (tarkistettu 26.9.2026):
 *   deinokrateen-vuori — File:Mt._Athos_(3939757657).jpg (Dave Proffer, CC BY 2.0;
 *     kuvattu kaukaa, ei luostareita lähikuvassa)
 *   eleusiin-mysteerit — File:General_view_of_sanctuary_of_Demeter_and_Kore_and_
 *     the_Telesterion_(Initiation_Hall),_center_for_the_Eleusinian_Mysteries,_
 *     Eleusis_(8191841684).jpg (Carole Raddato, CC BY-SA 2.0)
 *   nekromanteion — File:Nekromanteion_Main_Sanctuary.jpg (Evilemperorzorg, CC BY-SA 3.0)
 *   keros — File:Idol_fragment_Keros_Hoard,_MCA_ET16_081005.jpg (Zde, CC BY-SA 3.0;
 *     Keroksen aarteen idolinkatkelma, Kykladisen taiteen museo)
 *   abdera — File:Abdera.JPG (Papatrexas, public domain)
 *   melissani — File:Melissani_Cave,_Kefalonia_1.jpg (Matt Sims, CC BY 2.0)
 *   gla — File:Citadel_of_Gla,_central_Greece.jpg (Kjn1961, CC BY-SA 3.0)
 *   kastan-kumpu — File:Kasta_tumulus_-_view_from_Amphipolis.jpg (Neptuul, CC BY-SA 4.0)
 *   gortynin-laki — File:The_Law_Code_of_Gortyn_dated_to_the_early_5th_century_BC,_
 *     Gortyn.jpg (Carole Raddato, CC BY-SA 2.0)
 *   chlemoutsi — File:Chlemoutsi1.JPG (Roman Klementschitz, CC BY-SA 3.0)
 *   dispilio — File:Kastoria,_the_prehistoric_lakeside_settlement_of_Dispilio.jpg
 *     (Efthimios Tsilikidis, CC BY-SA 4.0)
 *   pavlopetri — File:Pounta_beach_(view_from_Elafonisos_ferry_boat).jpg (annagkai,
 *     CC BY-SA 4.0; vedenalaista PD/CC-kuvaa ei löytynyt, sama ranta-alue jonka
 *     edustalla vedenalainen kaupunki sijaitsee)
 *   poliokhni — File:Poliochne.jpg (ale3andro, CC BY-SA 2.0)
 *   munkkihylkeet — File:Monachus_monachus_DSC_0274.jpg (Marinko Babić, CC BY-SA 4.0;
 *     lajikuva Pulasta, Kroatiasta — Alonnisokselta ei löytynyt sopivalla
 *     lisenssillä olevaa kuvaa)
 */
export const MAAKUNTASALAISUUDET_GRC = {
  'nosto:salaisuus-deinokrateen-vuori': {
    maakunta: 'Ayion Oros',
    nimi: 'Deinokrateen vuoripatsas',
    nimio: 'Athos-jättiläinen',
    tyyppi: 'vuori',
    // en-Wikipedia "Mount Athos"
    lat: 40.158333,
    lng: 24.327222,
    lyhyt: 'Tästä vuoresta piti tulla jättiläinen, jolla on kaupunki kämmenellä! '
      + 'Liidän huipun ohi ja yritän kuvitella sen kasvot.',
    teksti: 'Athos-vuori nousee niemimaan kärjessä jyrkkinä, metsäisinä rinteinä 2033 '
      + 'metrin korkeuteen. Roomalainen arkkitehti Vitruvius kertoo tarinan, jonka todenperäisyys on epävarma: Aleksanteri Suuren '
      + 'arkkitehti Deinokrates olisi ehdottanut koko vuoren veistämistä valtavaksi miehen hahmoksi: '
      + 'toisessa kädessä olisi kaupunki ja toisesta virtaisi joki mereen. Aleksanteri '
      + 'olisi hylännyt ajatuksen, koska Deinokrates ei ollut miettinyt, mistä kaupungin asukkaat '
      + 'saisivat ruokansa, ja kaupunki perustettiin sen sijaan Niilin hedelmälliseen '
      + 'suistoon – siitä tuli Aleksandria. Vuorella kasvaa ainakin 35 kasvilajia, joita ei '
      + 'ole missään muualla, ja useimmat niistä huipun tuntumassa.',
    nappi: 'Vuori, josta Aleksanteri Suuren arkkitehti halusi veistää jättiläisen',
    lahde: 'en-Wikipedia "Mount Athos" (osiot Geography ja History) ja "Dinocrates" '
      + '(osiot City proposal of Mount Athos ja Plan of Alexandria), haettu 26.9.2026.',
    miksiSalaisuus: 'Athoksen tavallinen nosto kertoo luostareista; harva tietää, että koko '
      + 'vuori oli vähällä muuttua jättiläispatsaaksi.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-deinokrateen-vuori-e1daa824.jpg',
      lahde: 'Dave Proffer, Wikimedia Commons (CC BY 2.0)',
      tekija: 'Dave Proffer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mt._Athos_(3939757657).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
    },
  },

  'nosto:salaisuus-eleusiin-mysteerit': {
    maakunta: 'Attiki',
    nimi: 'Eleusiin mysteerit',
    nimio: 'Eleusiin mysteerit',
    tyyppi: 'historia',
    // en-Wikipedia "Telesterion"
    lat: 38.0408,
    lng: 23.5386,
    lyhyt: 'Eleusiin pyhäkkö on nyt keskellä Elefsinan kaupunkia. Lähes kaksituhatta '
      + 'vuotta kukaan ei kertonut, mitä sen salissa tapahtui!',
    teksti: 'Eleusis oli Demeterin ja Persefoneen pyhäkkö Ateenan länsipuolella, ja sen '
      + 'vihkimysmenot olivat antiikin Kreikan kuuluisimpia salaisia riittejä. Joka syksy '
      + 'kulkue vaelsi Ateenasta Pyhää tietä pitkin Eleusiiseen, ja vihittävät astuivat '
      + 'Telesterion-saliin, johon mahtui tuhansia ihmisiä. Menojen ydintä ei saanut '
      + 'paljastaa kenellekään, ja rangaistus oli kuolema – siksi niistä tiedetään yhä hyvin '
      + 'vähän. Mysteerejä vietettiin lähes kaksituhatta vuotta, kunnes keisari Theodosius I '
      + 'lakkautti ne 392 jaa. ja goottikuningas Alarikin joukot hävittivät pyhäkön 396.',
    nappi: 'Salaisten menojen kylä, jonka löydöille rakennetaan museo vasta 1890',
    lahde: 'en-Wikipedia "Eleusinian Mysteries", "Telesterion" ja "Archaeological Museum '
      + 'of Eleusis", haettu 26.9.2026.',
    miksiSalaisuus: 'Antiikin tunnetuin salaisuus: tuhannet vihityt vaikenivat vuosisadasta '
      + 'toiseen, eikä menojen ydintä tunneta vieläkään.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-eleusiin-mysteerit-78480493.jpg',
      lahde: 'Carole Raddato, Wikimedia Commons (CC BY-SA 2.0)',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:General_view_of_sanctuary_of_Demeter_and_Kore_and_the_Telesterion_(Initiation_Hall),_center_for_the_Eleusinian_Mysteries,_Eleusis_(8191841684).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
  },

  'nosto:salaisuus-nekromanteion': {
    maakunta: 'Ipeiros',
    nimi: 'Kuolleiden oraakkeli Akheronin rannalla',
    nimio: 'Nekromanteion',
    tyyppi: 'historia',
    // en-Wikipedia "Necromanteion of Acheron"
    lat: 39.2362,
    lng: 20.5345,
    lyhyt: 'Tätä kukkulaa pidettiin portiksi manalaan. Nyt tutkijat epäilevät, että se '
      + 'olikin linnoitettu maatila – vähän pettymys, vähän helpotus!',
    teksti: 'Muinaiset kreikkalaiset uskoivat, että Epeiroksessa Akheron-joen rannalla oli '
      + 'kuolleiden oraakkeli, Nekromanteion, jossa saattoi puhutella vainajia. Herodotoksen '
      + 'mukaan Korintin tyranni Periandros lähetti sinne viestinviejiä kysymään neuvoa '
      + 'kuolleelta vaimoltaan Melissalta, ja Homeroksen Odysseiassa paikka on portti, jonka '
      + 'kautta Odysseus laskeutui manalaan. Vuonna 1958 arkeologi Sotirios Dakaris tunnisti '
      + 'Mesopotamoksen kylän kukkulalta löytyneen rakennuksen oraakkeliksi. Tulkinta on '
      + 'sittemmin kyseenalaistettu: rauniot ovat vasta 300-luvun lopulta eaa., ja '
      + 'pronssiosat, joita Dakaris piti näyttämönosturin osina, osoittautuivat katapulttien '
      + 'osiksi, joten rakennus saattoi olla linnoitettu maatila.',
    nappi: 'Joki, jota pitkin Odysseus tarun mukaan laskeutui manalaan',
    lahde: 'en-Wikipedia "Necromanteion of Acheron", haettu 26.9.2026.',
    miksiSalaisuus: 'Harva tietää, että tarujen tuonelan portti on merkitty oikealle '
      + 'kartalle – ja että tiede on kyseenalaistanut koko löydön.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-nekromanteion-32c8f571.jpg',
      lahde: 'Evilemperorzorg, Wikimedia Commons (CC BY-SA 3.0)',
      tekija: 'Evilemperorzorg',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nekromanteion_Main_Sanctuary.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  },

  'nosto:salaisuus-keros': {
    maakunta: 'Notio Aigaio',
    nimi: 'Keros ja rikotut marmorihahmot',
    nimio: 'Keros',
    tyyppi: 'saari',
    // en-Wikipedia "Keros" (saaren karkea piste)
    lat: 36.89,
    lng: 25.65,
    lyhyt: 'Keros on autio, eikä sille saa edes nousta maihin. Kierrän sitä ilmasta ja '
      + 'arvuuttelen, miksi joku toi tänne särjettyjä marmorihahmoja.',
    teksti: 'Keros on asumaton Kykladien saari noin kymmenen kilometriä Naxoksesta '
      + 'kaakkoon, ja sille on nykyään kielletty nousemasta maihin. Noin 2500 eaa. se oli '
      + 'kykladisen kulttuurin tärkeä paikka: saaren länsirannan Kavoksen seudulta on '
      + 'peräisin niin sanottu Keroksen aarre, valtava kasa kykladisia marmorihahmoja. '
      + 'Cambridgen yliopiston kaivauksissa 2006–2008 selvisi, että hahmot ja marmoriastiat '
      + 'oli rikottu jo muualla ja tuotu saarelle tarkoituksella, eikä joukosta löydy '
      + 'toisiinsa sopivia palasia. Viereisellä Dhaskalion luodolla, joka oli ennen kiinni '
      + 'Keroksessa, on Kykladien laajin varhaispronssikautinen asuinpaikka, ja sen rinteet '
      + 'oli muurattu mahtaviksi terasseiksi.',
    nappi: 'Autio saari, jonka marmorisalaisuutta ryhdytään tutkimaan vasta 1900-luvulla',
    lahde: 'en-Wikipedia "Keros" (osiot Keros hoard ja Daskalio), haettu 26.9.2026.',
    miksiSalaisuus: 'Saarelle ei saa nousta, eikä kukaan tiedä varmasti, miksi '
      + 'pronssikauden ihmiset kuljettivat sinne tahallaan rikottuja veistoksia.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-keros-8e165a82.jpg',
      lahde: 'Zde, Wikimedia Commons (CC BY-SA 3.0)',
      tekija: 'Zde',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Idol_fragment_Keros_Hoard,_MCA_ET16_081005.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  },

  'nosto:salaisuus-abdera': {
    maakunta: 'Anatoliki Makedonia kai Thraki',
    nimi: 'Abdera, hölmöjen ja atomien kaupunki',
    nimio: 'Abdera',
    tyyppi: 'historia',
    // en-Wikipedia "Abdera, Thrace"
    lat: 40.933333,
    lng: 24.966667,
    lyhyt: 'Abderasta vitsailtiin antiikissa kuin hölmöläisistä. Silti täältä tuli '
      + 'atomiteorian isä – nokka pystyyn, abderalaiset!',
    teksti: 'Abdera oli antiikin kaupunki Traakian rannikolla vastapäätä Thasoksen saarta. '
      + 'Ensimmäinen siirtokunta epäonnistui, mutta 544 eaa. suurin osa Teoksen asukkaista '
      + 'muutti tänne pakoon persialaisia. Myöhemmin abderalaisista tuli vitsien aihe: Cicero '
      + 'käytti kaupungin nimeä tyhmyyden vertauskuvana, ja antiikin vitsikirjassa '
      + 'Philogeloksessa on kokonainen luku abderalaisvitsejä. Silti kaupungista tulivat '
      + 'filosofit Demokritos, joka muistetaan atomiteoriastaan, ja Protagoras, jonka lause '
      + '"ihminen on kaiken mitta" tunnetaan yhä.',
    nappi: 'Kaupunki, jota antiikissa pilkattiin hölmöläisten pesäksi',
    lahde: 'en-Wikipedia "Abdera, Thrace", "Democritus" ja "Protagoras", haettu 26.9.2026.',
    miksiSalaisuus: 'Harva tietää, että atomiteorian isä tuli kaupungista, jota koko '
      + 'antiikki piti vitsinä.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-abdera-b714c1a0.jpg',
      lahde: 'Papatrexas, Wikimedia Commons (public domain)',
      tekija: 'Papatrexas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Abdera.JPG',
      lisenssi: 'Public domain',
    },
  },

  'nosto:salaisuus-melissani': {
    maakunta: 'Ionioi Nisoi',
    nimi: 'Melissanin luolajärvi ja kadonnut meri',
    nimio: 'Melissani',
    tyyppi: 'luonto',
    // en-Wikipedia "Melissani Cave"
    lat: 38.257,
    lng: 20.6236,
    lyhyt: 'Melissanin luolassa vene näyttää leijuvan ilmassa, niin kirkasta vesi on. Ja '
      + 'osa vedestä on kulkenut maan alla saaren toiselta puolelta!',
    teksti: 'Melissani on luolajärvi Kefalonian saarella Samin luoteispuolella: kalkkikiven '
      + 'sortuminen avasi luolan katon ja paljasti pohjaveden. Järveä kierretään '
      + 'pienellä veneellä, ja sen vesi on murtovettä, jossa sisämaan makea vesi ja saaren '
      + 'alle tunkeutunut merivesi sekoittuvat. Tarustossa luolaa pidettiin nymfien luolana. '
      + 'Saaren toisella puolella Argostolin lähellä merivesi valuu katavothres-nieluihin, '
      + 'kulkee saaren ali Melissanin kautta ja purkautuu noin kahden viikon päästä Samin '
      + 'seudulla – ja virtauksen voimalla pyöritettiin jo 1835 myllyä.',
    nappi: 'Argostolin merimylly, jota maan alle katoava meri pyörittää',
    lahde: 'en-Wikipedia "Melissani Cave" ja "Argostoli", haettu 26.9.2026.',
    miksiSalaisuus: 'Meri, joka katoaa maan alle ja tulee kahden viikon päästä esiin saaren '
      + 'toisella puolella, on ilmiö, jonka harva matkailija huomaa.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-melissani-ab2ab4fd.jpg',
      lahde: 'Matt Sims, Wikimedia Commons (CC BY 2.0)',
      tekija: 'Matt Sims',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Melissani_Cave,_Kefalonia_1.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
    },
  },

  'nosto:salaisuus-gla': {
    maakunta: 'Stereá Elláda',
    nimi: 'Gla, kuivatun järven linnoitus',
    nimio: 'Glan linnoitus',
    tyyppi: 'historia',
    // en-Wikipedia "Gla"
    lat: 38.483333,
    lng: 23.182222,
    lyhyt: 'Glan muureilta näkyy pelkkää peltoa, mutta täällä oli ennen järvi! Linnoitus '
      + 'on valtava, eikä kukaan tiedä sen oikeaa nimeä.',
    teksti: 'Gla on mykeneläinen linnoitus Boiotiassa kalkkikivikummulla, joka pisti '
      + 'aikoinaan esiin Kopaisjärvestä tai oli sen saari. Noin 1300 eaa. rakennetut, lähes '
      + 'kolme kilometriä pitkät kyklooppimuurit ympäröivät lähes 20 hehtaarin alueen, noin '
      + 'kymmenen kertaa enemmän kuin Ateenan tai Tirynsin mykeneläiset linnavuoret. Paikan '
      + 'antiikin nimeä ei tunneta, eikä sitä ole pystytty yhdistämään yhteenkään Iliaan '
      + 'paikannimeen. Samoihin aikoihin mykeneläiset kuivattivat osan järvestä padoilla ja '
      + 'kanavilla – yksi esihistoriallisen insinööritaidon hämmästyttävimmistä '
      + 'saavutuksista – mutta järjestelmä romahti ja järvi palasi.',
    nappi: 'Järvi, jonka ranskalainen kuivatusyhtiö menee konkurssiin juuri 1873',
    lahde: 'en-Wikipedia "Gla" ja "Lake Copais" (osio Drainage), haettu 26.9.2026.',
    miksiSalaisuus: 'Linnoitus on kymmenen kertaa Tirynsiä suurempi, mutta sen nimi on '
      + 'kadonnut eikä Homeros mainitse sitä, joten harva on kuullut siitä.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-gla-23e954a6.jpg',
      lahde: 'Kjn1961, Wikimedia Commons (CC BY-SA 3.0)',
      tekija: 'Kjn1961',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Citadel_of_Gla,_central_Greece.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  },

  'nosto:salaisuus-kastan-kumpu': {
    maakunta: 'Kentriki Makedonia',
    nimi: 'Kastan kumpu Amfipoliissa',
    nimio: 'Kastan kumpu',
    tyyppi: 'historia',
    // en-Wikipedia "Kasta Tomb"
    lat: 40.839722,
    lng: 23.863333,
    lyhyt: 'Kastan kummun lattiaan tehtiin mosaiikki, jota kenenkään ei pitänyt nähdä. '
      + 'Nyt sitä ihaillaan, ja haudan omistajasta kiistellään yhä!',
    teksti: 'Kastan kumpu muinaisen Amfipoliin lähellä on suurin Kreikasta koskaan löydetty '
      + 'antiikin hautakumpu, paljon suurempi kuin Filippos II:n kumpu Verginassa. Se on '
      + '300-luvun viimeiseltä neljännekseltä eaa., ja sitä kiertää 158 metrin läpimittainen '
      + 'muuri, jonka kalkkikivi on verhottu Thasoksen marmorilla. Sisähauta löytyi vasta '
      + '2012: sisäänkäyntiä vartioivat sfinksit, kaksi karyatidia kannattelee seuraavan '
      + 'kammion oven palkkia, ja '
      + 'lattiamosaiikissa Hades ryöstää Persefoneen. Haudasta löytyi viiden ihmisen '
      + 'jäänteet, mutta kenelle se rakennettiin, on yhä kiistanalaista – kaivausryhmän '
      + 'mukaan Aleksanteri Suuren ystävälle Hefaistionille, toisten mukaan Aleksanterin '
      + 'äidille Olympiakselle.',
    nappi: 'Amfipoliin kukkula, jonka sisällä hauta odottaa vuoteen 2012',
    lahde: 'en-Wikipedia "Kasta Tomb", haettu 26.9.2026.',
    miksiSalaisuus: 'Kreikan suurin antiikin hautakumpu löytyi vasta 2012, eikä kukaan '
      + 'tiedä varmasti, kuka sinne haudattiin.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-kastan-kumpu-70ebcbcf.jpg',
      lahde: 'Neptuul, Wikimedia Commons (CC BY-SA 4.0)',
      tekija: 'Neptuul',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kasta_tumulus_-_view_from_Amphipolis.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },

  'nosto:salaisuus-gortynin-laki': {
    maakunta: 'Kriti',
    nimi: 'Gortynin lakikivi',
    nimio: 'Gortynin lakikivi',
    tyyppi: 'historia',
    // en-Wikipedia "Gortyn code"
    lat: 35.063221,
    lng: 24.946919,
    lyhyt: 'Gortynissa näkee lähes 2500 vuotta vanhan lain hakattuna muuriin. Rivit '
      + 'kulkevat vuorotellen oikealle ja vasemmalle kuin härkä kyntäisi!',
    teksti: 'Gortynin laki on Etelä-Kreetalla sijainneen antiikin Gortynin kaupunkivaltion '
      + 'siviililakien kokoelma, joka hakattiin 400-luvun alkupuoliskolla eaa. pyöreän '
      + 'julkisen rakennuksen seinään. Säilyneet kaksitoista tekstipalstaa ovat yhteensä noin '
      + 'kymmenen metriä pitkiä ja sisältävät noin 600 riviä, jotka luetaan vuororiveittäin '
      + 'eri suuntiin. Se on yhtä poikkeusta lukuun ottamatta pisin säilynyt antiikin '
      + 'kreikkalainen kirjoitus, ja se säätelee muun muassa avioeroa, perintöä, adoptiota ja '
      + 'orjien asemaa: eronneella naisella oli oikeus omaisuuteen, jonka hän oli tuonut '
      + 'avioliittoon. Suurin osa kivistä oli myöhemmin käytetty roomalaisen odeionin '
      + 'perustuksiin.',
    nappi: 'Muuri, josta tunnetaan vasta yksi katkelma – loput löytyvät myllyn luota 1884',
    lahde: 'en-Wikipedia "Gortyn code", haettu 26.9.2026.',
    miksiSalaisuus: 'Harva Kreetan matkaaja tietää, että muurissa on pisin säilynyt '
      + 'antiikin kreikkalainen lakiteksti tavallisten ihmisten oikeuksista.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-gortynin-laki-9362c70f.jpg',
      lahde: 'Carole Raddato, Wikimedia Commons (CC BY-SA 2.0)',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Law_Code_of_Gortyn_dated_to_the_early_5th_century_BC,_Gortyn.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
  },

  'nosto:salaisuus-chlemoutsi': {
    maakunta: 'Dytiki Ellada',
    nimi: 'Chlemoutsin ristiretkilinna',
    nimio: 'Chlemoutsin linna',
    tyyppi: 'historia',
    // en-Wikipedia "Chlemoutsi"
    lat: 37.8901,
    lng: 21.141,
    lyhyt: 'Chlemoutsin kuusikulmainen linna on yhä lähes sellainen kuin ranskalaiset '
      + 'ritarit sen jättivät. Ja täällä he pitivät arvovankejaan!',
    teksti: 'Chlemoutsi eli Clermont on keskiaikainen linna Elisissä Peloponnesoksen '
      + 'luoteiskulmassa, 226 metrin korkeudella pienellä ylätasangolla. Sen rakennutti '
      + '1220–1223 Akhaian ruhtinaskunnan ristiretkeläishallitsija Geoffroi I de Villehardouin, '
      + 'joka takavarikoi kirkon omaisuutta, kun papisto kieltäytyi antamasta lisävaroja maan '
      + 'puolustukseen. Linnan ydin on sisäpihan ympärille rakennettu kuusikulmainen '
      + 'päälinna, ja se on säilynyt suurelta osin 1200-luvun asussaan. Ruhtinaskunnan aikana '
      + 'linnaa ei kertaakaan piiritetty, vaan se toimi arvovankien vankilana; italialaisten '
      + 'käyttämä nimi Castel Tornese syntyi ilmeisesti sekaannuksesta läheisen Glarentzan '
      + 'rahapajan kanssa, jossa lyötiin tornese-hopearahoja.',
    nappi: 'Autio ristiretkeläislinna, jonka muuria Ibrahim-pasan tykit murtivat 1825',
    lahde: 'en-Wikipedia "Chlemoutsi" (johdanto, osiot History ja Architecture), haettu '
      + '26.9.2026.',
    miksiSalaisuus: 'Yksi Kreikan parhaiten säilyneistä linnoista on ranskalaisten '
      + 'ristiretkeläisten jälki, jota harva Kreikan-matkaaja osaa etsiä.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-chlemoutsi-7cf7ee80.jpg',
      lahde: 'Roman Klementschitz, Wikimedia Commons (CC BY-SA 3.0)',
      tekija: 'Roman Klementschitz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chlemoutsi1.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
  },

  'nosto:salaisuus-dispilio': {
    maakunta: 'Dytiki Makedonia',
    nimi: 'Dispilion paalukylä ja puulaatta',
    nimio: 'Dispilion paalut',
    tyyppi: 'historia',
    // en-Wikipedia "Dispilio"
    lat: 40.480556,
    lng: 21.2875,
    lyhyt: 'Dispilion rannan paalukylä on rekonstruktio, mutta oikea salaisuus on '
      + 'puulaatta, jonka viivoista kiistellään yhä!',
    teksti: 'Dispilion kylän lähellä Kastorianjärven rannalla on kivikautisen paalukylän '
      + 'jäänteet; asutus oli tekosaarella rantavedessä. Paalut paljastuivat 1932, kun '
      + 'järven pinta oli poikkeuksellisen matalalla, ja kaivaukset alkoivat 1992 professori '
      + 'Georgios Hourmouziadisin johdolla. Myöhäisneoliittiset rakennusvaiheet on ajoitettu '
      + 'vuosiin 5328–5140 eaa., ja märässä maassa ovat säilyneet puu, siemenet ja jopa '
      + 'huilut, joista osa on tehty ihmisen luusta. Suurimman huomion sai 1993 löydetty '
      + 'puulaatta, jonka viivamerkintöjä jotkut ovat pitäneet varhaisena kirjoituksena: se '
      + 'löytyi kaivausojaan tulleen veden pinnalta kellumasta, eikä sitä ole vieläkään '
      + 'julkaistu kokonaan tieteellisesti.',
    nappi: 'Järven pohjan paalut, jotka tulevat esiin vasta kuivana talvena 1932',
    lahde: 'en-Wikipedia "Dispilio" ja "Dispilio Tablet", haettu 26.9.2026.',
    miksiSalaisuus: 'Yli 7000 vuotta vanha kylä ja arvoituksellinen puulaatta ovat Kastorian '
      + 'kupeessa, mutta harva kävijä tietää niistä.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-dispilio-f0c1b413.jpg',
      lahde: 'Efthimios Tsilikidis, Wikimedia Commons (CC BY-SA 4.0)',
      tekija: 'Efthimios Tsilikidis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kastoria,_the_prehistoric_lakeside_settlement_of_Dispilio.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },

  'nosto:salaisuus-pavlopetri': {
    maakunta: 'Peloponnisos',
    nimi: 'Pavlopetri, meren alle vajonnut kaupunki',
    nimio: 'Pavlopetri',
    tyyppi: 'meri',
    // en-Wikipedia "Pavlopetri"
    lat: 36.516,
    lng: 22.988,
    lyhyt: 'Pavlopetrin talot ovat vain 3–4 metrin syvyydessä rannan edustalla. Kyyhkyt '
      + 'eivät sukella, joten tämä salaisuus jää minulta pinnan alle!',
    teksti: 'Pavlopetri on muinainen kaupunki Vatikan lahdella Lakonian etelärannikolla, '
      + 'Elafonisoksen saaren ja mantereen välissä. Noin 5000 vuotta vanhana sitä pidetään '
      + 'maailman vanhimpana tunnettuna veden alle vajonneena kaupunkina, ja siitä on '
      + 'säilynyt lähes koko asemakaava katuineen, rakennuksineen ja hautoineen. Muurit '
      + 'mainittiin ensimmäisen kerran 1904, mutta kaupunki löydettiin uudelleen 1967 ja '
      + 'kartoitettiin seuraavana vuonna. Maanjäristykset ja noussut merenpinta upottivat sen, '
      + 'ja koska paikalle ei rakennettu uudestaan eikä sitä viljelty, pohjapiirros erottuu '
      + 'yhä merenpohjassa.',
    nappi: 'Lahti, jonka pohjassa odottaa kaupunki, jota kukaan ei ole vielä huomannut',
    lahde: 'en-Wikipedia "Pavlopetri", haettu 26.9.2026.',
    miksiSalaisuus: 'Maailman vanhin tunnettu vedenalainen kaupunki on pienen lahden '
      + 'pohjassa, ja sen näkee vain pinnan alle katsomalla.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-pavlopetri-d7d7f491.jpg',
      lahde: 'annagkai, Wikimedia Commons (CC BY-SA 4.0)',
      tekija: 'annagkai',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pounta_beach_(view_from_Elafonisos_ferry_boat).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },

  'nosto:salaisuus-poliokhni': {
    maakunta: 'Voreio Aigaio',
    nimi: 'Poliokhni, Troijaa vanhempi kaupunki',
    nimio: 'Poliokhni',
    tyyppi: 'historia',
    // en-Wikipedia "Poliochni"
    lat: 39.854167,
    lng: 25.343611,
    lyhyt: 'Limnoksen itärannalla on kaupunki, joka oli olemassa ennen Troijaa. Talot '
      + 'nojaavat toisiinsa yhteisin seinin – ihan kuin kyyhkyslakassa!',
    teksti: 'Poliokhni oli asutus Limnoksen saaren itärannikolla, ja sitä pidetään yhtenä '
      + 'Euroopan vanhimmista kaupungeista – se on vanhempi kuin Troijan varhaisin kerros. '
      + 'Talot oli rakennettu tiiviisti kiinni toisiinsa yhteisten seinien varaan, ja '
      + 'myöhemmin kaupunkia suojasi puolustusmuuri. Italialaiset arkeologit alkoivat kaivaa '
      + 'paikkaa 1930, ja kaivausten johtaja Luigi Bernabò Brea nimesi myöhemmin seitsemän '
      + 'asutusvaihetta väreillä, kuten musta, sininen ja keltainen. Keltaisen kauden '
      + 'kerroksista löytyi runsaasti kultakoruja, samaan tapaan kuin Troijasta, jonka '
      + 'arvellaan olleen Poliokhnin tärkein kilpailija kaupassa.',
    nappi: 'Kaupunki, jonka kulta on yhä maan alla, kun Schliemann kaivaa Troijaa 1873',
    lahde: 'en-Wikipedia "Poliochni" ja "Priam\'s Treasure", haettu 26.9.2026.',
    miksiSalaisuus: 'Kaikki tuntevat Troijan, mutta harva tietää, että sen vanhempi '
      + 'kilpailija on Limnoksen rannalla.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-poliokhni-067bdbfe.jpg',
      lahde: 'ale3andro, Wikimedia Commons (CC BY-SA 2.0)',
      tekija: 'ale3andro',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poliochne.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
  },

  'nosto:salaisuus-munkkihylkeet': {
    maakunta: 'Thessalia',
    nimi: 'Alonnisoksen munkkihylkeet',
    nimio: 'Munkkihylkeet',
    tyyppi: 'elain',
    // en-Wikipedia "Alonissos" (saaren karkea piste)
    lat: 39.15,
    lng: 23.833333,
    lyhyt: 'Alonnisoksen vesillä ui maailman harvinaisin hylje. Jos näet pään pinnalla, '
      + 'pidä etäisyyttä – munkkihylje on arka!',
    teksti: 'Välimerenmunkkihyljettä pidetään maailman harvinaisimpana hyljelajina: '
      + 'arvioiden mukaan sitä on jäljellä noin 800–1000 yksilöä, etenkin Egeanmerellä. '
      + 'Pohjoisten Sporadien Alonnisoksen ympärille perustettiin 1992 meripuisto juuri sen ja '
      + 'muiden merieläinten suojelemiseksi. Hylkeet ovat ihmisten häirinnän vuoksi '
      + 'siirtyneet synnyttämään rantaluoliin, joihin on vaikea päästä, vaikka myrskyt tekevät '
      + 'luolista vaarallisia vastasyntyneille. 1900-luvulla kalastajat hävittivät hylkeitä, '
      + 'koska ne rikkoivat verkkoja; nykyään Kreikan laki suojelee lajia tiukasti.',
    nappi: 'Saari, joka sai 1838 erehdyksessä antiikin nimen Alonnisos',
    lahde: 'en-Wikipedia "Mediterranean monk seal" ja "Alonnisos", haettu 26.9.2026.',
    miksiSalaisuus: 'Maailman harvinaisimman hylkeen näkee vain onnekas – se pysyy '
      + 'piilossa rantaluolissa.',
    pikkukuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260926/grc-salaisuus-munkkihylkeet-1685bc39.jpg',
      lahde: 'Marinko Babić, Wikimedia Commons (CC BY-SA 4.0)',
      tekija: 'Marinko Babić',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Monachus_monachus_DSC_0274.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
};
