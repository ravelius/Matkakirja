/*
 * MAASTOKOHTEET — PHL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PHL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PHL.json. Työkalu laskee laudan
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
 * Filippiinien maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mayonin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 2 462 m). Filippiinienmeren merkki on ulapalla Samarin itäpuolella, jotta se pysyy lehden ikkunassa — artikkelin oma keskipiste 130 / 20 jää rajauksen ulkopuolelle.
 */
export const MAASTOKOHTEET_PHL = [
  {
    id: 'apo',
    nimi: 'Mount Apo',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli Datu Manig?',
      'Mitä nimi Apo Sandawa tarkoittaa?',
    ],
    korostukset: ['Mindanao|Mindanaon'],
    nappi: 'Filippiinien korkein',
    // 125.2708 E / 6.9875 N — en-Wikipedia "Mount Apo"
    laudat: {
      maailmankartta: { x: 10009, y: 2978.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ennen kuin Mindanaon korkeimmalle huipulle sai nousta, oli kysyttävä lupa. Kaksi '
      + 'retkikuntaa oli jo epäonnistunut — José Oyanguren 1852 ja Señor Real 1870 — kun Don '
      + 'Joaquín Rajal kääntyi bagobo-päällikkö Datu Manigin puoleen. Kerrotaan, että päällikkö '
      + 'vaati ihmisuhria vuoren jumalalle Mandaranganille mutta luopui lopulta vaatimuksesta; '
      + 'nousu alkoi 6. lokakuuta 1880 ja onnistui viisi päivää myöhemmin. Vuoren nimi kertoo '
      + 'saman kunnioituksen. Apo on lumad-kansojen kielissä arvonimi, kunnioitettu vanhus, ja '
      + 'täydempi muoto Apo Sandawa tarkoittaa vuoren henkeä — Sandawa-isoisää, jota '
      + 'lähirinteiden manobo- ja kalagan-heimot pitävät esi-isänään. Huippu on 2 954 metriä, '
      + 'sammunut kerrostulivuori, jonka laella on kahdensadan metrin levyinen kraatteri ja '
      + 'pieni järvi.',
    lahde: 'en-Wikipedia "Mount Apo", osiot "Hiking activity", "Etymology and indigenous peoples" '
      + 'ja "Geology" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mayon',
    nimi: 'Mayon',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi tulivuoresta kasvaa täydellinen kartio?',
      'Miten aktiivista tulivuorta vahditaan?',
    ],
    korostukset: ['kartio|kartiostaan'],
    nappi: 'Täydellinen kartio',
    // 123.685 E / 13.2567 N — en-Wikipedia "Mayon"
    laudat: {
      maailmankartta: { x: 9956.2, y: 2767.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mayon on aktiivinen kerrostulivuori Albayn maakunnassa Luzonin saaren '
      + 'kaakkoiskärjessä, ja se on kuuluisa lähes täydellisen symmetrisestä kartiostaan. Se on '
      + 'Filippiinien aktiivisin tulivuori, jota tarkkaillaan jatkuvasti parinkymmenen '
      + 'kilometrin päästä. Vuori ympäristöineen julistettiin maan ensimmäiseksi '
      + 'kansallispuistoksi jo 1938, ja filippiiniläisessä mytologiassa se on pyhä.',
    lahde: 'en-Wikipedia "Mayon", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'filippiinienmeri',
    nimi: 'Filippiinienmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on maailman suurin meri?',
      'Mikä Mariaanien hauta on?',
    ],
    korostukset: ['Mariaanien hauta|Mariaanien hauta'],
    nappi: 'Maailman suurin meri',
    // 126.6 E / 13.5 N — ulappa Samarin itäpuolella; artikkelin oma keskipiste 130 / 20 jää lehden ikkunan ulkopuolelle
    laudat: {
      maailmankartta: { x: 10053.3, y: 2758.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Maailman suurimman meren pohjassa on maailman syvin kohta. Filippiinienmeri peittää '
      + 'noin viisi miljoonaa neliökilometriä Tyynenmeren länsilaidalla, ja sen pohjan '
      + 'muodostaa oma mannerlaattansa, joka työntyy Filippiinien liikkuvan vyöhykkeen alle. '
      + 'Painumasta syntyy hautoja: Filippiinienhauta ja Mariaanien hauta, jonka pohjalla on '
      + 'koko planeetan syvin piste. Pinnalla meri on yhtä levoton, sillä se on läntisen '
      + 'Tyynenmeren trooppisten myrskyjen synnyinallas — idästä tulevat taifuunit repivät '
      + 'koralliriuttoja, joiden varassa kalastajayhteisöt elävät. Samalla merellä käytiin '
      + '19.—20. kesäkuuta 1944 historian suurin lentotukialusten välinen taistelu.',
    lahde: 'en-Wikipedia "Philippine Sea", johdanto-osa sekä osiot "Geology", "Marine '
      + 'biodiversity" ja "Battle of the Philippine Sea" (tarkistettu 1.9.2026).',
  },
  {
    id: 'cagayan',
    nimi: 'Cagayan',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokilaakso on saaren vilja-aitta?',
      'Mikä taifuuni Vamco oli?',
    ],
    korostukset: ['Luzon|Luzonin'],
    nappi: 'Luzonin suuri virta',
    // 121.6167 E / 18.3667 N — en-Wikipedia "Cagayan River" (koordinaatti on joen suulla)
    laudat: {
      maailmankartta: { x: 9887.2, y: 2592.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Luzonin pohjoisosassa aukeava Cagayanin laakso saa etelävuoriltaan jopa kolme metriä '
      + 'sadetta vuodessa, ja kaikki se vesi valuu yhtä uomaa pitkin. Filippiinien pisin ja '
      + 'vesirikkain joki alkaa Caraballo-vuorilta noin 1 524 metrin korkeudesta ja virtaa 505 '
      + 'kilometriä pohjoiseen Babuyaninsalmeen Aparrin kohdalla. Laakso on kuitenkin laaja ja '
      + 'loiva ja uoma mutkittelee, joten vesi lähtee vuorilta hitaasti ja jää seisomaan '
      + 'tasangolle. Tulvia tulee monsuunikaudella touko—marraskuussa vuodesta toiseen, ja '
      + 'marraskuussa 2020 taifuuni Vamco nosti joen historiansa korkeimpaan lukemaan — myös '
      + 'Magatin padon tulvaluukut jouduttiin avaamaan. Siksi joen varrella on nykyään '
      + 'tulvavaroitusasemien ketju.',
    lahde: 'en-Wikipedia "Cagayan River", osiot "Topography" ja "Flooding" (tarkistettu 1.9.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M14, AASIA 4, 6.9.2026 ──────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Filippiineillä oli ennen tätä erää neljä maastokohdetta (Mount Apo,
   * Mayon, Filippiinienmeri, Cagayan) eikä yhtäkään kohdetta,
   * eläintäkyä tai skandaalia. Maastokiintiö oli siis yli täyden ja
   * koko vaje kohteissa: tästä erästä tuli kahdeksan kohdetta.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)`; lon/lat on luettu en-Wikipedian
   * coordinates-propista tai — kun prop on tyhjä — artikkelin oman
   * infolaatikon {{coord}}-mallista, ja kumpi kulloinkin, se lukee
   * kohteen koordinaattirivillä. Jokainen piste osuu maan fokuslehden
   * rajaukseen (x 9673,9…10111,9 ja y 2393,0…3155,1).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Corregidor 40,6 lautayksikön päässä Manilasta, ja raja
   * KAUPUNGIN_KOHDALLA_SADE on 7. Intramuros jätettiin pois juuri
   * tästä säännöstä: se on Manilan laatan kohdalla.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'banauen-riisiterassit',
    nimi: 'Banaue',
    tyyppi: 'historia',
    kysymykset: [
      'Miten terassit saavat vetensä?',
      'Miksi terassit kuluvat nykyään?',
    ],
    korostukset: ['ifugao|ifugaojen'],
    nappi: 'Portaat vuoren kylkeen, käsin veistetyt',
    // 121.05 E / 16.9 N — en-Wikipedia "Banaue Rice Terraces"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Manila 47,8
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 9868.3, y: 2642.9 },
    },
    teksti: 'Banauen riisiterassit on veistetty Ifugaon maakunnan vuorenrinteisiin igorotien '
      + 'esi-isien käsin ja vähäisin välinein. Ne ovat noin 1 500 metrin korkeudessa, ja '
      + 'niitä ruokkii vanha kastelujärjestelmä, joka tuo veden terassien yläpuolisista '
      + 'sademetsistä. Antropologi Otley Beyer arvioi terassit yli 2 000 vuotta vanhoiksi, '
      + 'mutta osa tutkijoista pitää niitä paljon nuorempina. Ifugaojen koko kulttuuri '
      + 'kiertää riisin ympärillä: sadonkorjuuseen kuuluu kiitosjuhlia, ja päättävän '
      + 'korjuun jälkeen vietetään lepopäivää, jolloin maatyöt ovat ehdottomasti kiellettyjä. '
      + 'Terasseilla kasvatetaan yhä riisiä ja vihanneksia, mutta portaat kuluvat: yhä '
      + 'harvempi nuori jää maanviljelijäksi, ja seinämät vaativat jatkuvaa korjausta.',
    lahde: 'en-Wikipedia "Banaue Rice Terraces", johdanto-osa ja osio "Ifugao rice culture" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vigan',
    nimi: 'Vigan',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä kaupungin nimi tulee?',
      'Millainen on bahay na bato -talo?',
    ],
    korostukset: ['bahay na bato|bahay na bato'],
    nappi: 'Espanjalainen kaupunki, joka jäi pystyyn',
    // 120.38694 E / 17.57472 N — en-Wikipedia "Vigan"
    // (coordinates-prop). Lähin pelikaupunki Manila 73,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9846.2, y: 2619.7 },
    },
    teksti: 'Vigan on Luzonin länsirannikolla Etelä-Kiinan merta vasten, ja se on Unescon '
      + 'maailmanperintökohde vuodesta 1999. Se on yksi harvoista Filippiinien '
      + 'espanjalaisajan kaupungeista, joiden vanha rakennuskanta on säilynyt lähes '
      + 'ehjänä: mukulakivikadut, bahay na bato -talot ja maanjäristysbarokkinen kirkko '
      + 'yhdistävät filippiiniläistä ja itämaista rakennustapaa siirtomaa-ajan espanjalaiseen '
      + 'arkkitehtuuriin. Nimi on esikolonialistinen ja tulee ilokanon sanasta bigàan, '
      + 'paikka jossa kasvaa runsaasti biga-kasvia eli jättitaaromia. Mestizo-joen liettyminen '
      + 'on liittänyt kaupungin mantereeseen; saari se ei enää ole. Koko kaupunki on '
      + 'merkitty Unescon maailmanperintökaupungiksi.',
    lahde: 'en-Wikipedia "Vigan", johdanto sekä osiot "Etymology" ja "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chocolate-hills',
    nimi: 'Chocolate Hills',
    // Kumpuja ei lasketa vuoriksi eikä maastokiintiössä ole tilaa:
    // tyyppi 'muu' + symboli 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi kummut muuttuvat ruskeiksi?',
      'Mistä kummut ovat syntyneet?',
    ],
    korostukset: ['karsti|karstia'],
    nappi: 'Yli tuhat kartiota, jotka ruskettuvat kuivalla kaudella',
    // 124.1667 E / 9.9167 N — en-Wikipedia "Chocolate Hills"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Manila 216,6
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 9972.2, y: 2879.9 },
    },
    teksti: 'Chocolate Hills on geologinen muodostuma Boholin maakunnassa: vähintään 1 260 '
      + 'ja mahdollisesti yli 1 776 kumpua yli 50 neliökilometrin alueella. Ne ovat '
      + 'heinän peitossa, ja kuivalla kaudella heinä kuivuu suklaanruskeaksi — siitä nimi. '
      + 'Kummut ovat kartiomaista karstia, ohut- tai keskipaksukerroksista merellistä '
      + 'kalkkikiveä myöhäiseltä plioseenilta ja varhaiselta pleistoseenilta, ja niissä on '
      + 'runsaasti matalan meren fossiileja. Muoto syntyi, kun sadevesi, pintavesi ja '
      + 'pohjavesi liuottivat kalkkikiveä ja purot kuluttivat kohonnutta ja repeillyttä '
      + 'kalliota. Korkeutta kummuilla on 30–50 metriä, suurimmalla 120. Tulivuoriteoriat '
      + 'eivät päde: alueelta ei löydy lainkaan vulkaanista kiveä.',
    lahde: 'en-Wikipedia "Chocolate Hills", johdanto sekä osiot "Description" ja "Origin" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tubbataha',
    nimi: 'Tubbataha',
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Tubbataha tarkoittaa?',
      'Miten atolli on syntynyt?',
    ],
    korostukset: ['atolli|atollia'],
    nappi: 'Kaksi atollia keskellä Sulunmerta',
    // 119.8675 E / 8.9533 N — en-Wikipedia "Tubbataha Reef" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Manila 224,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9828.9, y: 2912.3 },
    },
    teksti: 'Tubbatahan luonnonpuisto on suojelualue keskellä Sulunmerta, 150 kilometriä '
      + 'Puerto Princesasta kaakkoon. Siihen kuuluu kaksi suurta atollia ja pienempi '
      + 'Jessie Beazleyn riutta, yhteensä 97 030 hehtaaria asumattomia saaria ja riuttoja. '
      + 'Unesco merkitsi sen maailmanperintöluetteloon 1993 poikkeuksellisena esimerkkinä '
      + 'atolliriutasta, jonka lajitiheys on hyvin suuri ja jonka pohjoissaari on lintujen '
      + 'ja merikilpikonnien pesimäpaikka; riutalla on sadan metrin pystysuora seinämä ja '
      + 'laajat laguunit. Nimi on kahdesta sama-bajau-sanasta, tubba ja taha, ja tarkoittaa '
      + 'pitkää riuttaa, joka paljastuu laskuveden aikaan. Tutkijat ovat laskeneet alueelta '
      + 'ainakin 600 kalalajia ja 360 korallilajia.',
    lahde: 'en-Wikipedia "Tubbataha Reef", johdanto sekä osiot "Geography", "Geology" ja '
      + '"Etymology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'puerto-princesan-joki',
    nimi: 'Maanalainen joki',
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi luolan syvimpiin osiin ei pääse?',
      'Mitä luolasta löytyi vuonna 2010?',
    ],
    korostukset: ['maanalainen|maanalainen'],
    nappi: 'Joki, joka virtaa vuoren sisällä',
    // 118.9167 E / 10.1667 N — en-Wikipedia "Puerto Princesa
    // Subterranean River National Park" (artikkelin infolaatikon coord).
    // Lähin pelikaupunki Manila 193,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9797.2, y: 2871.5 },
    },
    teksti: 'Puerto Princesan maanalaisen joen kansallispuisto on Saint Paulin vuoristossa '
      + 'Palawanin länsirannikolla, noin 80 kilometriä Puerto Princesan kaupungista '
      + 'pohjoiseen, ja kaupunki on hoitanut sitä vuodesta 1992. Puistossa virtaa '
      + 'maanalainen joki kalkkikiviluolan läpi. Unescon maailmanperintökohde siitä tuli '
      + '1999, uudeksi luonnonihmeeksi se valittiin 2012 ja Ramsar-kosteikoksi samana '
      + 'vuonna. Vuonna 2010 ympäristöasiantuntijat ja geologit havaitsivat, että joella on '
      + 'toinen kerros pienine vesiputouksineen; he löysivät myös 300 metriä joen yläpuolella '
      + 'olevan luolaholvin, syvän vesikuopan ja uusia käytäviä. Syvimpiin osiin ei pääse, '
      + 'koska niissä ei ole tarpeeksi happea. Puistoon tullaan yleensä Sabangin '
      + 'rantakylästä veneellä.',
    lahde: 'en-Wikipedia "Puerto Princesa Subterranean River National Park", johdanto-osa ja '
      + 'osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'callaon-luola',
    nimi: 'Callaon luola',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen luut luolasta löytyivät?',
      'Miten luolan kammioihin tulee valoa?',
    ],
    korostukset: ['Homo luzonensis|Homo luzonensis'],
    nappi: 'Luola, josta löytyi uusi ihmislaji',
    // 121.8237 E / 17.7033 N — en-Wikipedia "Callao Cave" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Manila 80,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9894.1, y: 2615.3 },
    },
    teksti: 'Callaon luola on yksi noin 300 kalkkikiviluolasta Peñablancan kunnassa '
      + 'Cagayanin maakunnassa Luzonilla, Pohjoisen Sierra Madren länsirinteillä. Se '
      + 'kaivettiin ensimmäisen kerran 1980, ja siinä on seitsemän kammiota, joiden '
      + 'kattoaukoista lankeaa valoa sisään; ensimmäinen ja suurin on 50 metriä leveä ja 36 '
      + 'metriä korkea, ja paikalliset ovat tehneet siitä kappelin. Vuonna 2007 Filippiinien '
      + 'yliopiston Armand Salvador Mijaresin johtama ryhmä löysi luolasta myöhäispleistoseenin '
      + 'aikaisia ihmisen luita, ja 2019 varmistui, että ne kuuluvat aiemmin tuntemattomalle, '
      + 'sittemmin sukupuuttoon kuolleelle lajille Homo luzonensis. Vuonna 2020 luola '
      + 'julistettiin Filippiinien tärkeäksi kulttuuriomaisuudeksi.',
    lahde: 'en-Wikipedia "Callao Cave", johdanto-osa ja osio "Features" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'paoayn-kirkko',
    nimi: 'Paoayn kirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi kirkon kyljissä on jättimäiset tukipilarit?',
      'Milloin kirkko valmistui?',
    ],
    korostukset: ['tukipilarit|tukipilarit'],
    nappi: 'Maanjäristysbarokkia Ilocosissa',
    // 120.5215 E / 18.0615 N — en-Wikipedia "Paoay Church" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Manila 89,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9850.7, y: 2603 },
    },
    teksti: 'Pyhän Augustinuksen kirkko eli Paoayn kirkko on Ilocos Norten maakunnassa '
      + 'Luzonin luoteisosassa. Augustinolaisveli Antonio Estavillo aloitti rakentamisen '
      + '1694, ja kirkko valmistui 1710; se vihittiin uudelleen 1896. Kuuluisimpia ovat sen '
      + 'valtavat tukipilarit, jotka kannattavat sivuseiniä ja takaseinää — juuri sitä '
      + 'rakennustapaa kutsutaan maanjäristysbarokiksi. Vuosien 1865 ja 1885 järistykset '
      + 'vaurioittivat osia kirkosta, ja ne korjattiin myöhemmin. Filippiinien hallitus '
      + 'julisti kirkon kansallisaarteeksi 1973, ja Unesco merkitsi sen '
      + 'maailmanperintöluetteloon 1993 osana Filippiinien barokkikirkkojen ryhmää.',
    lahde: 'en-Wikipedia "Paoay Church", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'corregidor',
    nimi: 'Corregidor',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä saaren nimi tulee?',
      'Milloin saaren majakka sytytettiin?',
    ],
    korostukset: ['corregir|corregir'],
    nappi: 'Saari, jolla paperit tarkastettiin',
    // 120.5731 E / 14.3856 N — en-Wikipedia "Corregidor" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Manila 40,6 lautayksikköä;
    // koko erän lähin merkki.
    laudat: {
      maailmankartta: { x: 9852.4, y: 2728.7 },
    },
    teksti: 'Corregidor on saari Manilanlahden suulla Luzonin lounaisosassa, 48 kilometriä '
      + 'Manilasta länteen. Nimi tulee espanjan sanasta corregir, korjata: erään selityksen '
      + 'mukaan lahdelle tulevien laivojen piti pysähtyä saarelle ja antaa paperinsa '
      + 'tarkastettaviksi ja korjattaviksi, toisen mukaan saarella oli espanjalaisten '
      + 'rangaistuslaitos. Espanjan vallan aikana saari oli linnoitus, vankila, tullin '
      + 'tarkastusasema ja merkinantopaikka, joka varoitti Manilaa lähestyvistä vihollisen '
      + 'laivoista. Corregidorin majakka sytytettiin 18. tammikuuta 1853 saaren korkeimmalle '
      + 'kohdalle 195 metriin, ja sen valo näkyi 20 mailin päähän. Amerikkalaisajalla saari '
      + 'linnoitettiin rannikkotykistöllä Fort Millsiksi; nykyään saari on sotamuistomerkki '
      + 'ja yksi maan käydyimmistä matkailukohteista.',
    lahde: 'en-Wikipedia "Corregidor", johdanto-osa ja osio "Spanish colonial era" '
      + '(tarkistettu 6.9.2026).',
  },
];
