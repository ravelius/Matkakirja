/*
 * SLOVENIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan, Ruotsin,
 * Suomen ja Romanian jälkeen Slovenia.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Romania
 * (js/packs/hahmotelma-rou.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa sl-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä) artikkelista omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva`
 * + `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä,
 * lisenssi ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta; kuvatekstit ilman lähdeviittauksia lukijalle).
 * PAATOKSET 51: noin joka kolmannella nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla (js/fokusnosto.js nostonVisa): vastaus löytyy
 * noston omasta tekstistä. Vuonna 1873 Slovenia on osa Itävalta-Unkarin
 * Itävallan puoliskoa (Krain, Steiermark, Küstenland; Prekmurje kuuluu
 * Unkarille); vuoden 1873 jälkeiset kohteet ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin tai sanoo
 * rehellisesti, että kohde tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET JA NÄIN VÄHÄN: Slovenialla ei ole pelikaupunkia eikä
 * aiempia nostoja, ja maa on vain noin 94 lautayksikköä leveä, joten lista
 * karsittiin 24:ään (Fablen päätös 19.9.2026): Bohinj on Triglavin tekstissä,
 * Logarska dolina Velika planinan tekstissä, Predjama Postojnan tekstissä ja
 * Štanjel Lipican (Karstin) tekstissä; Bledin linna ja Vintgarin rotko ovat
 * Bledin tekstissä. Kranjska Gora, Sečovlje, Radovljica ja Kropa jäivät pois
 * (liian lähellä toisia).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `svn-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/svn/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla (js/fokuskohteet.js
 * liittää rivit KOHDE_MAAT.SVN:ään). `lahi: true` on sama lähizoomiportti
 * kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Slovenian fokuslehden rajaukseen
 * (`osuuLehteen`) ja SVN-renkaan sisään.
 */

/** Slovenian hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_SVN = [
  {
    id: 'hahmotelma-triglav',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-triglav-fde5c160.jpg',
      lyhyt: 'Triglav ja Rjavina Julian Alppien karuissa vuoristomaisemissa.',
      selite: 'Kuvassa Triglav ja Rjavina Triglavin kansallispuistossa, otettuna Viševnikin '
        + 'huipulta. Harmaa kalliohuippu kohoaa vihreiden rinteiden takaa.',
      lahde: 'Valokuva: Jernej Furman from Slovenia, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Jernej Furman from Slovenia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_with_Triglav_and_Rjavina_from_the_summit_of_Visevnik_in_Triglav_national_park_in_Julian_Alps_in_Slovenia_(52340665948).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-triglav-c2e90016.jpg',
        lyhyt: 'Triglavin pohjoisseinämä Vratan laaksosta nähtynä.',
        selite: 'Vuoren valtava kalkkikiviseinämä kohoaa Vratan laakson yläpuolelle. Polku '
          + 'johtaa metsän läpi kohti seinämää.',
        lahde: 'Valokuva: MKrolik-WMF, Wikimedia Commons (CC0).',
        tekija: 'MKrolik-WMF',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Triglav_north_face.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-triglav-b3f72a9e.jpg',
        lyhyt: 'Bohinjinjärven ranta ja lumihuippuisia vuoria.',
        selite: 'Bohinjinjärvi sijaitsee Julian Alpeilla Triglavin kansallispuiston alueella. '
          + 'Rannalla näkyvät kivisilta ja kirkon torni.',
        lahde: 'Valokuva: Dmitry A. Mottl, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dmitry A. Mottl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bohinjsko_jezero_panorama.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Triglav',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Triglavin nimi tarkoittaa kirjaimellisesti "kolmipäistä"?',
      'Mitä lumottu vuorikauris Zlatorog vartioi vanhassa kansantarussa?',
    ],
    korostukset: ['Zlatorog|Zlatorog', 'Sigmund Zois|Sigmund Zoisin'],
    nappi: 'Ensinoususta 1778 on kulunut 95 vuotta; huipun Aljažin torni rakennetaan vasta '
      + 'vuonna 1895',
    // 13.8367 E / 46.3783 N — en-Wikipedia "Triglav"
    laudat: {
      maailmankartta: { x: 6294.6, y: 1544.6 },
      europe: { x: 476.9, y: 673.8 },
    },
    teksti: 'Triglav on Slovenian korkein vuori ja Julian Alppien korkein huippu, noin 2 864 '
      + 'metriä merenpinnan yläpuolella. Nimi tulee muodosta, joka tarkoittaa kolmipäistä, '
      + 'sillä vuori näyttää Ylä-Krainin suunnalta kolmihuippuiselta. Ensimmäinen tunnettu '
      + 'nousu huipulle tehtiin vuonna 1778 Sigmund Zoisin aloitteesta, ja Valentin Stanič '
      + 'mittasi vuoren korkeuden vuonna 1808. Triglav on Slovenian ainoan '
      + 'kansallispuiston, Triglavin kansallispuiston, keskus, ja sen tyylitelty hahmo on '
      + 'osa Slovenian vaakunaa ja lippua. Vanhassa kansantarussa metsästäjä etsii '
      + 'aarretta, jota vartioi lumottu, kultasarvinen vuorikauris Zlatorog.',
    lahde: 'en-Wikipedia "Triglav", johdanto-osa ja osiot "History", "Cultural significance" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Triglavin huipulle tehtiin ensimmäinen tunnettu nousu?',
      vaihtoehdot: [
        '1738',
        '1808',
        '1778',
        '1861',
      ],
      oikea: 2,
      fakta: 'Huipulla seisoo metallinen Aljažin torni, jonka pappi Jakob Aljaž kokosi '
        + 'työmiestensä kanssa vain viidessä tunnissa 7. elokuuta 1895. Hän oli ostanut '
        + 'itse huipun yhdellä floriinilla.',
    },
  },
  {
    id: 'hahmotelma-bled',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-bled-43f7d1d1.jpg',
      lyhyt: 'Bledin saari kirkkoineen ja taustalla Bledin linna.',
      selite: 'Saaren keskellä kohoaa Neitsyt Marian taivaaseenottamisen kirkko ja sen korkea '
        + 'torni. Taustalla vuorten edessä näkyy Bledin linna.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bled_Island_and_Bled_Castle,_Slovenia,_20240504_0908_8342.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-bled-8b3bf924.jpg',
        lyhyt: 'Pletna-soutuvene Bledinjärven rannassa.',
        selite: 'Pletna on perinteinen puuvene, jossa on värikäs katos. Taustalla näkyy Bledin '
          + 'saari kirkkoineen.',
        lahde: 'Valokuva: Ymon, Wikimedia Commons (CC0).',
        tekija: 'Ymon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pletna_at_Bled.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Bledinjärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi pletna-soutajan ammatti on yhä rajattu vain tietyille suvuille?',
      'Mitä perinteen mukaan sulhasen pitää tehdä Bledin saaren kirkon portailla häiden päivänä?',
    ],
    korostukset: ['pletna|pletna', 'Bledin linna|Bledin linna'],
    nappi: 'Saarelle soudetaan pletna-veneillä, ja pyhiinvaeltajien kuljetusoikeus on 22 '
      + 'perheellä jo vuodesta 1740',
    // 14.0947 E / 46.3644 N — en-Wikipedia "Lake Bled"
    laudat: {
      maailmankartta: { x: 6303.2, y: 1545.2 },
      europe: { x: 481.8, y: 674.2 },
    },
    teksti: 'Bledinjärvi on Julian Alppien Ylä-Krainissa, Luoteis-Slovenian Bledin kaupungin '
      + 'rannalla sijaitseva järvi, jonka syntyyn ovat vaikuttaneet sekä jäätiköt että '
      + 'maankuoren liikkeet. Sen keskellä on pieni saari, jolla on Neitsyt Marian '
      + 'taivaaseenottamisen pyhiinvaelluskirkko, nykymuodossaan 1600-luvun lopulta. '
      + 'Kirkolle johtaa 99 kiviporrasta, ja saarelle mennään perinteisesti '
      + 'pletna-nimisellä, seisten soudetulla puuveneellä. Soutajien ammatti juontuu '
      + 'vuodesta 1740, jolloin keisarinna Maria Teresia antoi 22 paikalliselle perheelle '
      + 'yksinoikeuden kuljettaa pyhiinvaeltajia. Järven pohjoisrannan yläpuolella kohoaa '
      + 'keskiaikainen Bledin linna, jonka keisari Henrik II rakennutti vuonna 1004.',
    lahde: 'en-Wikipedia "Lake Bled", johdanto-osa ja osiot "Geography and hydrology", '
      + '"History", "Bled Island" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-soca',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-soca-fe98bc71.jpg',
      lyhyt: 'Sočan turkoosi vesi kapeassa rotkossa vesiputouksen alla.',
      selite: 'Suuressa Sočan rotkossa joki virtaa kapeassa kalliokurussa. Pieni vesiputous '
        + 'putoaa smaragdinvihreään veteen.',
      lahde: 'Valokuva: Bojan Marušič, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bojan Marušič',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velika_korita_soče.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-soca-93bd2b21.jpg',
        lyhyt: 'Soča virtaa turkoosina metsäisten vuorten välissä Bovecin lähellä.',
        selite: 'Joen kirkas turkoosi vesi ja sora-ranta erottuvat vihreästä laaksosta. Kuva '
          + 'on otettu Luoteis-Sloveniassa Bovecin lähellä.',
        lahde: 'Valokuva: MarcusObal, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'MarcusObal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Soča_River_Panorama.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-soca-81f92435.jpg',
        lyhyt: 'Suuri Kozjakin putous kapeassa kalliokurussa.',
        selite: 'Kozjakin putouksen vesi kaatuu jyrkkien kallioseinämien välistä turkoosina '
          + 'hohtavaan altaaseen. Putous on yksi Sočan laakson nähtävyyksistä.',
        lahde: 'Valokuva: Ajznponar, Wikimedia Commons (CC0).',
        tekija: 'Ajznponar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Veliki_Kozjak_waterfall_03.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Soča',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mitä Sočan ja Isonzon nimi kertoo joen luonteesta?',
      'Miten maanvyörymä vuonna 585 muutti joen ja sen lähijokien kulkua?',
    ],
    korostukset: ['Isonzo|Isonzo', 'marmoripurotaimen|marmoripurotaimen'],
    nappi: 'Joki virtaa Itävalta-Unkarin ja Italian rajan tuntumassa; taistelut alkavat vasta '
      + 'vuonna 1915',
    // 13.6414 E / 45.9944 N — en-Wikipedia "Soča"
    laudat: {
      maailmankartta: { x: 6288, y: 1560.6 },
      europe: { x: 473.1, y: 683.9 },
    },
    teksti: 'Soča eli italiaksi Isonzo on 138-kilometrinen joki, joka virtaa Länsi-Slovenian '
      + 'halki ja päättyy Koillis-Italiassa Adrianmereen. Sen lähde on Trentan laaksossa '
      + 'Julian Alpeilla, ja matkalla joki kulkee Bovecin, Kobaridin ja Tolminin ohi. Vesi '
      + 'on kirkkaan smaragdinvihreää, minkä vuoksi jokea markkinoidaan nimellä '
      + 'Smaragdinen kaunotar. Tunnettuja nähtävyyksiä ovat Suuri ja Pieni Sočan rotko '
      + 'sekä Kozjakin putous, ja ylävirran erikoisuus on uhanalainen marmoripurotaimen. '
      + 'Ensimmäisessä maailmansodassa laakso oli Isonzon taistelujen näyttämö.',
    lahde: 'en-Wikipedia "Soča", johdanto-osa ja osiot "Name", "Attractions" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-velika-planina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-velika-planina-5039cc74.jpg',
      lyhyt: 'Velika Planinan paimenmajat vihreällä ylängöllä.',
      selite: 'Ylängöllä on puisia paimenmajoja niittyjen keskellä. Taustalla siintävät '
        + 'vuoret.',
      lahde: 'Valokuva: Aleš Krivec, Wikimedia Commons (CC0).',
      tekija: 'Aleš Krivec',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velika_planina_2014.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-velika-planina-e3377c15.jpg',
        lyhyt: 'Violetit kevätkukat ja paimenmajat Velika Planinan niityllä.',
        selite: 'Keväällä niitty täyttyy violeteista kukista. Taustalla erottuvat '
          + 'paimenmajojen loivat, lähes maahan ulottuvat katot.',
        lahde: 'Valokuva: Smihael, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Smihael',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velika_planina_spomladi.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Velika Planina',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi paimenmajojen soikeat katot ulottuvat lähes maahan asti?',
      'Mitä paimenmajojen kappelille tapahtui sodan aikana ja milloin uusi rakennettiin?',
    ],
    korostukset: ['Plečnik|Plečnikin', 'Marija Snežna|Marija Snežna'],
    nappi: 'Paimenkylä, jonka Plečnikin suunnitelmien mukainen kappeli valmistuu vasta '
      + '1930-luvun lopulla',
    // 14.6519 E / 46.2969 N — en-Wikipedia "Velika Planina"
    laudat: {
      maailmankartta: { x: 6321.7, y: 1548 },
      europe: { x: 492.5, y: 676 },
    },
    teksti: 'Velika Planina, eli suomeksi Suuri laidun, on Ylä-Krainissa Kamnikin Alppien '
      + 'karstiylängöllä sijaitseva hajanainen paimenkylä. Sen puiset majat ovat yhden '
      + 'huoneen asuntoja, joiden soikeat, päreillä katetut katot ulottuvat lähes maahan '
      + 'asti, joten katon alle jää suoja karjalle. Pysyviä asukkaita on vain vähän, mutta '
      + 'kesäisin ylängölle tuodaan yhä laumoja laiduntamaan. Kylä on yksi Euroopan '
      + 'harvoista näin laajoina säilyneistä paimenasutuksista. Paimenet rakensivat '
      + 'arkkitehti Jože Plečnikin suunnitelmien pohjalta Marija Snežna -kappelin, mutta '
      + 'sota-aikana kappeli ja sata muuta puurakennusta paloivat, ja uusi kappeli '
      + 'valmistui vuonna 1988.',
    lahde: 'en-Wikipedia "Velika Planina" ja sl-Wikipedia "Velika planina", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cerknica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-cerknica-5b70cbf9.jpg',
      lyhyt: 'Cerknican järven laaja vesialue ja metsäiset kukkulat.',
      selite: 'Kuvassa näkyy matalaa vettä, kaislikkoa ja metsäisiä kukkuloita. Järven pinta '
        + 'ja ala vaihtelevat vuodenaikojen ja sateiden mukaan.',
      lahde: 'Valokuva: Ajznponar, Wikimedia Commons (CC0).',
      tekija: 'Ajznponar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Lake_Cerknica_from_Dolenje_Jezero_01.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-cerknica-59e42992.jpg',
        lyhyt: 'Valvasorin 1600-luvun kuparipiirros Cerknican järvestä.',
        selite: 'Piirros esittää järven saarineen ja ympäröiviä kyliä ylhäältä nähtynä. Johann '
          + 'Weikhard von Valvasor kuvasi järven ilmiöitä 1600-luvun lopulla.',
        lahde: 'Valokuva: Janez Vajkard Valvasor, Wikimedia Commons (Public domain).',
        tekija: 'Janez Vajkard Valvasor',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Valvasor_-_Cerkniško_jezero_(1689).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-cerknica-6022526b.jpg',
        lyhyt: 'Tulvinut tienristeys Cerknican järven rannalla.',
        selite: 'Kun vettä on paljon, järvi nousee tielle ja peittää rantapolkuja. Kuvassa '
          + 'vesi peittää Pretržjen risteyksen.',
        lahde: 'Valokuva: Ajznponar, Wikimedia Commons (CC0).',
        tekija: 'Ajznponar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Cerknica,_flooded_Pretrzje_junction.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Cerknican järvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Minne Cerknican järven vesi katoaa kesäisin, ja mistä se palaa?',
      'Millä tavalla Valvasor ja Gruber yrittivät selittää järven arvoitusta?',
    ],
    korostukset: ['Valvasor|Valvasor', 'karstipolje|karstipoljen'],
    nappi: 'Järvi pysyi kuivana yli vuoden vielä 1834–35; sen toiminnan selitti tarkasti '
      + 'Gruber 1781',
    // 14.385 E / 45.7522 N — en-Wikipedia "Lake Cerknica"
    laudat: {
      maailmankartta: { x: 6312.8, y: 1570.7 },
      europe: { x: 487.4, y: 690.3 },
    },
    teksti: 'Cerknican järvi on Sisä-Krainissa, Cerknican karstipoljen eteläosassa sijaitseva '
      + 'ajoittain katoava järvi. Täynnä ollessaan se on Slovenian suurin järvi, ja '
      + 'pinta-ala vaihtelee yleensä noin 26–28 neliökilometrin välillä, mutta voi nousta '
      + 'jopa 38 neliökilometriin. Järvi on yhteydessä maanalaisiin onkaloihin: kesällä, '
      + 'kun sataa vähän, vesi valuu kokonaan alempiin luoliin ja pohja peittyy nopeasti '
      + 'rehevään kasvillisuuteen, ja syksyn sateiden myötä vesi purkautuu takaisin. '
      + 'Muutokset ovat epäsäännöllisiä, ja järvi oli kuivana yli vuoden vuosina 1834–35. '
      + 'Valvasor esitti järvestä oman selityksensä 1687, ja sen toiminnan kuvasi tarkasti '
      + 'ensimmäisenä Tobias Gruber vuonna 1781.',
    lahde: 'en-Wikipedia "Lake Cerknica", johdanto-osa ja osiot "Description", '
      + '"Intermittency", "Research history" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-skocjan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skocjan-da4a40ef.jpg',
      lyhyt: 'Valaistu kävelysilta ylittää luolakanjonin jyrkkien kallioseinämien välissä.',
      selite: 'Kävelysilta kulkee valaistun kalliokanjonin yli Škocjanin luolissa. '
        + 'Massiivisten seinämien rinnalla silta näyttää pieneltä, mikä antaa käsityksen '
        + 'luolan mittakaavasta.',
      lahde: 'Valokuva: TravelingOtter, Wikimedia Commons (CC BY 2.0).',
      tekija: 'TravelingOtter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bridge_Inside_Skocjan_Caves_-_Slovenia_(7451202474).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skocjan-26724128.jpg',
        lyhyt: 'Reka-joki syöksyy vesiputouksena kallioisen rotkon läpi.',
        selite: 'Reka-joen vesi vaahtoaa sammaleisten kalliojyrkänteiden välissä Škocjanin '
          + 'luolien alueella. Joki katoaa lopulta maan alle ja virtaa pitkän matkaa '
          + 'maanalaisessa kanjonissa.',
        lahde: 'Valokuva: Húsönd, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Húsönd',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%A0kocjanske_jame_river_Reka_1.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skocjan-6a41e20d.jpg',
        lyhyt: 'Suuren romahdusdolinan jyrkkä kalkkikiviseinämä kohoaa puiden yläpuolella.',
        selite: 'Velika dolina on Škocjanin luolapuiston suuri romahdusdoliini. Vaalea '
          + 'kalkkikiviseinämä nousee pystysuorana männikön ja lehtipuiden takaa.',
        lahde: 'Valokuva: Ajznponar, Wikimedia Commons (CC0).',
        tekija: 'Ajznponar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skocjan_Caves,_view_of_Velika_dolina%27s_western_wall_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Škocjanin luolat',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Reka-joki katoaa Škocjanissa maan alle, ja minne se sieltä päätyy?',
      'Mikä tekee Martelin salista niin poikkeuksellisen?',
    ],
    korostukset: ['Reka|Reka-joki', 'Martelin sali|Martelin sali'],
    nappi: 'Vieraskirja otettiin käyttöön jo 1819, mutta järjestelmällinen tutkimus alkaa '
      + 'vasta vuonna 1884',
    // 14 E / 45.6667 N — en-Wikipedia "Škocjan Caves"
    laudat: {
      maailmankartta: { x: 6300, y: 1574.2 },
      europe: { x: 480, y: 692.6 },
    },
    teksti: 'Škocjanin luolat ovat luolajärjestelmä Slovenian Karstilla, ja UNESCO otti ne '
      + 'maailmanperintölistalleen vuonna 1986. Reka-joki katoaa Suuren romahdusdolinan '
      + 'kohdalla maan alle, virtaa noin 3,5 kilometriä pitkässä ja jopa yli 140 metriä '
      + 'korkeassa maanalaisessa kanjonissa ja jatkaa sitten maan alla yhteensä noin 34 '
      + 'kilometriä, kunnes nousee pintaan Monfalconen lähellä. Kanjonin suurin tila, '
      + 'Martelin sali, on tilavuudeltaan 2,2 miljoonaa kuutiometriä, ja sitä pidetään '
      + 'Euroopan suurimpana tunnettuna maanalaisena salina. Alueelta on löytynyt yli '
      + 'kymmenentuhatta vuotta vanhoja asutuksen jälkiä. Nykyaikaisen matkailun katsotaan '
      + 'alkaneen 1. tammikuuta 1819, kun luoliin otettiin käyttöön vieraskirja.',
    lahde: 'en-Wikipedia "Škocjan Caves", johdanto-osa ja osiot "Description", "History", '
      + '"Archaeology" ja "Tourism" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-postojna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-postojna-55d9f2c0.jpg',
      lyhyt: 'Valaistut tippukivipylväät ja kävelypolku Postojnan luolassa.',
      selite: 'Luolan polku kulkee jättimäisten tippukivimuodostelmien välistä. Stalagmiitit, '
        + 'stalaktiitit ja muut kalkkikivimuodostelmat ovat luolan tunnetuinta antia.',
      lahde: 'Valokuva: Dragan Kikovic, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dragan Kikovic',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Postojna_Cave_-_Symbol_Brilliant.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-postojna-39709fe1.jpg',
        lyhyt: 'Vanha postikortti, jossa Adelsbergin luolan suuaukko ja puinen aitaus.',
        selite: 'Kortin saksankielinen teksti on "Gruss aus Adelsberg". Adelsberg on Postojnan '
          + 'saksalainen nimi, ja luolan sisäänkäynti tunnettiin nimellä Adelsberger '
          + 'Grotte.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Postcard_of_Postojna_Cave_1899.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-postojna-7244b258.jpg',
        lyhyt: 'Predjaman linna on rakennettu kallioseinämän suureen luolansuuhun.',
        selite: 'Valkoiset seinät ja tiilikatot nojaavat suoraan jyrkän kallion luolaan. '
          + 'Luolalinna on yksi Slovenian erikoisimmista rakennuksista.',
        lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Jakub Hałun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Predjama_Castle,_Slovenia,_20240502_0839_7445.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Postojnan luola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Postojnan luolasta tuli matkailukohde jo 1800-luvun alussa?',
      'Miten luolassa kuljettiin 1800-luvulla, kun sähkövaloja ei vielä ollut?',
    ],
    korostukset: ['Luka Čeč|Luka Čeč', 'Valvasor|Valvasor'],
    nappi: 'Luolassa kuljettiin jo kiskoilla, joita oppaat työnsivät käsin; sähkövalot '
      + 'tulevat vasta 1884',
    // 14.2037 E / 45.7827 N — en-Wikipedia "Postojna Cave"
    laudat: {
      maailmankartta: { x: 6306.8, y: 1569.4 },
      europe: { x: 483.9, y: 689.5 },
    },
    teksti: 'Postojnan luola on Pivka-joen kaivertama karstiluolasto Lounais-Sloveniassa, ja '
      + 'sen pituus on yli 24 kilometriä. Luolan sisällä on graffiti vuodelta 1213, ja '
      + 'Johann Weikhard von Valvasor kuvasi sen 1600-luvulla. Vuonna 1818 luolaa '
      + 'valmisteltiin keisari Frans I:n vierailua varten, ja silloin paikallinen '
      + 'lamppujen sytyttäjä Luka Čeč löysi sattumalta uuden osan. Luolasta tuli '
      + 'virallisesti matkailukohde vuonna 1819, ja Čeč toimi sen ensimmäisenä oppaana. '
      + 'Vuonna 1872 luolaan asennettiin kiskot ja ensimmäinen matkailijoiden luolajuna, '
      + 'jota oppaat aluksi työnsivät itse. Sähkövalot luolaan tulivat vuonna 1884, ennen '
      + 'kuin Krainin pääkaupunki Ljubljana sai omansa.',
    lahde: 'en-Wikipedia "Postojna Cave", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuka toimi Postojnan luolan ensimmäisenä virallisena oppaana?',
      vaihtoehdot: [
        'Luka Čeč',
        'Adolf Schmidl',
        'Johann Weikhard von Valvasor',
        'Arkkiherttua Ferdinand',
      ],
      oikea: 0,
      fakta: 'Luolassa elää olmi, maailman suurin luolissa elävä sammakkoeläin. Luolassa on '
        + 'myös maailman ensimmäinen ja ainoa maanalainen postitoimisto, joka avattiin '
        + 'vuonna 1899.',
    },
  },
  {
    id: 'hahmotelma-ptuj',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ptuj-1bf9ecbe.jpg',
      lyhyt: 'Ptujin linna ja vanhakaupunki kohoavat Draava-joen rannalla.',
      selite: 'Punakattoiset talot ja valkoinen linna sijaitsevat kukkulan rinteellä joen '
        + 'varrella. Ptuj on Slovenian vanhimmaksi kirjattu kaupunki.',
      lahde: 'Valokuva: focusonmore.com, Wikimedia Commons (CC BY 2.0).',
      tekija: 'focusonmore.com',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ptuj_Castle_and_Old_Town.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ptuj-a2f1fe47.jpg',
        lyhyt: 'Kurentit kulkevat Ptujin kadulla lampaantaljoissaan ja värikkäissä '
          + 'päähineissään.',
        selite: 'Kurentti on lampaantaljaan, kelloihin ja värikkäisiin nauhoihin pukeutunut '
          + 'hahmo. Perinteen mukaan kurentit karkottavat melullaan talven ja pahat '
          + 'henget.',
        lahde: 'Valokuva: Andrejj, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Andrejj',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kurenti_na_Ptuju.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ptuj-2975af11.jpg',
        lyhyt: 'Kaupungintorni ja kivinen Orfeuksen muistomerkki Ptujin vanhassa keskustassa.',
        selite: 'Kellolla varustettu kaupungintorni on Ptujin vanhankaupungin maamerkkejä. Sen '
          + 'juurella seisoo koristeltu kivimuistomerkki, ja tornin takana näkyy Pyhän '
          + 'Yrjön kirkko.',
        lahde: 'Valokuva: ModriDirkac, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ModriDirkac',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ptuj-Orfej_monument-Town_tower-St._George_church.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ptuj',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ptujia sanotaan Slovenian vanhimmaksi kaupungiksi?',
      'Mitä kurentit Kurentovanjessa tekevät, ja miksi he pukeutuvat lampaantaljoihin?',
    ],
    korostukset: ['Poetovio|Poetovio', 'Kurentovanje|Kurentovanjea'],
    nappi: 'Pettau: vanha roomalaiskaupunki, jonka merkitys hiipui, kun Etelärata kulki '
      + 'Marburgin kautta',
    // 15.8694 E / 46.4194 N — en-Wikipedia "Ptuj"
    laudat: {
      maailmankartta: { x: 6362.3, y: 1542.9 },
      europe: { x: 515.9, y: 672.8 },
    },
    teksti: 'Ptuj on Slovenian vanhimmaksi kirjattu kaupunki Steiermarkin alueella Draava-joen '
      + 'rannalla. Se kehittyi roomalaisesta sotilasleiristä nimeltä Poetovio, joka '
      + 'sijaitsi tärkeällä joenylityspaikalla muinaisella kauppareitillä Itämereltä '
      + 'Adrianmerelle. Vuonna 69 Tonavan legioonat julistivat Ptujissa Vespasianuksen '
      + 'keisariksi, ja kaupungissa oli noin 40 000 asukasta, kunnes hunnit ryöstivät sen '
      + 'vuonna 450. Keskiajalla kaupunki kuului Salzburgin arkkipiispalle, ja saksaksi '
      + 'sitä kutsuttiin Pettauksi. Joka kevät kaupungissa vietetään kymmenpäiväistä '
      + 'Kurentovanjea, jossa lampaantaljoihin ja kelloihin pukeutuneet kurentit kiertävät '
      + 'katuja karkottamassa talvea ja pahoja henkiä.',
    lahde: 'en-Wikipedia "Ptuj", johdanto-osa ja osiot "History" ja "Culture" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Millä nimellä Ptuj tunnettiin roomalaisaikana?',
      vaihtoehdot: [
        'Poetovio',
        'Emona',
        'Celeia',
        'Aquileia',
      ],
      oikea: 0,
      fakta: 'Kaupungin täysi antiikin nimi oli Colonia Ulpia Traiana Poetovio, ja se juontuu '
        + 'keisari Trajanuksesta, joka antoi asutukselle kaupunkioikeudet vuonna 103.',
    },
  },
  {
    id: 'hahmotelma-celje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-celje-01eeb796.jpg',
      lyhyt: 'Celjen linnan tornit ja muurit kohoavat metsäisellä kukkulalla vuorten edessä.',
      selite: 'Linna näkyy Pečovnikin kukkulan suunnalta katsottuna. Se oli Celjen kreivien '
        + 'asuinpaikka ja Slovenian alueen suurimpia linnoituksia.',
      lahde: 'Valokuva: Smihael, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Smihael',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Celjski_grad_s_Pe%C4%8Dovnika.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-celje-44d4b003.jpg',
        lyhyt: 'Maalaus Celjen linnan raunioista 1800-luvulla.',
        selite: 'Kuvassa ovat särkyneet tornit ja holvatut aukot, joiden kohdalla kasvaa '
          + 'puita, ja kävijät kulkevat vanhojen muurien välissä. Linna oli tuolloin '
          + 'rauniona.',
        lahde: 'Valokuva: Franz von Kurz zum Thurn und Goldenstein, Wikimedia Commons (Public domain).',
        tekija: 'Franz von Kurz zum Thurn und Goldenstein',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Celje_Castle_1867.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-celje-a1ac52db.jpg',
        lyhyt: 'Friderikin torni ja linnanpihan muurit iltavalossa.',
        selite: 'Nelikulmainen Friderikin torni kohoaa linnanpihan yllä. Torni lisättiin '
          + 'linnaan noin vuonna 1400.',
        lahde: 'Valokuva: Žiga (tekijätieto oletettu), Wikimedia Commons (Public domain).',
        tekija: 'Žiga (tekijätieto oletettu)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:CeljskiGrad1.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Celjen linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Celjen kreivit olivat niin vaikutusvaltaisia?',
      'Mitä linnalle tapahtui sen jälkeen, kun se oli menettänyt strategisen merkityksensä?',
    ],
    korostukset: ['Celjen kreivit|Celjen kreivien', 'Friderikin torni|Friderikin tornin'],
    nappi: 'Vuonna 1846 rauniot lahjoitettiin Steiermarkin säädyille, ja kiinnostus niihin '
      + 'heräsi 1871',
    // 15.2717 E / 46.2197 N — en-Wikipedia "Celje Castle"
    laudat: {
      maailmankartta: { x: 6342.4, y: 1551.2 },
      europe: { x: 504.4, y: 678 },
    },
    teksti: 'Celjen linna on rauniolinna Celjen kaakkoispuolella kolmen kukkulan päällä, ja se '
      + 'oli aikoinaan Celjen kreivien asuinpaikka. Se oli aikanaan Slovenian alueen '
      + 'suurin linnoitus. Ensimmäisen linnan rakensivat 1200-luvulla Heunburgin kreivit, '
      + 'ja vuonna 1333 se siirtyi Sanneckin herroille, joista tuli vuonna 1341 Celjen '
      + 'kreivejä. Kreivit muuttivat linnoituksen mukavaksi asuinpaikaksi ja lisäsivät '
      + 'noin vuonna 1400 nelikerroksisen Friderikin tornin. Kun linna menetti '
      + 'merkityksensä, se alkoi rappeutua: viimeiset asukkaat lähtivät vuonna 1795, ja '
      + 'vuonna 1803 talonpoika osti sen ja käytti louhoksena. Kunnostustyöt alkoivat '
      + 'vuonna 1882 museoyhdistyksen aloitteesta ja jatkuvat yhä.',
    lahde: 'en-Wikipedia "Celje Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-skofja-loka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skofja-loka-1b626e3b.jpg',
      lyhyt: 'Selca Sora -joki ja vanha kivisilta Škofja Lokan vanhankaupungin keskellä.',
      selite: 'Kapusiinisilta ylittää joen vanhojen talojen välissä. Se on Slovenian vanhin '
        + 'säilynyt silta, peräisin 1300-luvun puolivälistä.',
      lahde: 'Valokuva: Bernd Thaller from Graz, Austria, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Bernd Thaller from Graz, Austria',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%A0kofja_Loka_(29738019586).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skofja-loka-1c4b35e4.jpg',
        lyhyt: 'Loka-linna kohoaa Škofja Lokan yläpuolella tasanteella.',
        selite: 'Linnassa toimii nykyään Loka-museo. Linna oli aikoinaan Freisingin piispojen '
          + 'käskynhaltijan asuinpaikka.',
        lahde: 'Valokuva: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petar Milošević',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%A0kofja_Loka_Castle_(%C5%A0kofjelo%C5%A1ki_grad,_Slovenija).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-skofja-loka-71e7caa0.jpg',
        lyhyt: 'Matthäus Merianin vanha kaiverrus Škofja Lokasta muurien ja linnan '
          + 'ympäröimänä.',
        selite: 'Kaupunki ja linna näkyvät vuorten edessä, ja kuvan otsikko on "Lack". '
          + 'Kaupunkia ympäröi muuri.',
        lahde: 'Valokuva: Matthäus Merian, Wikimedia Commons (Public domain).',
        tekija: 'Matthäus Merian',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Merian_-_%C5%A0kofja_Loka.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Škofja Loka',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Škofja Lokan nimi tarkoittaa piispan niittyä, ja kenen piispoja he olivat?',
      'Mikä Škofja Lokan passiokulkue oli, ja miksi se on merkittävä?',
    ],
    korostukset: ['Freisingin piispat|Freisingin piispoille', 'passiokulkue|passiokulkue'],
    nappi: 'Freisingin piispojen entinen kaupunki, joka on kuulunut Itävallan Krainiin '
      + 'vuodesta 1803',
    // 14.303 E / 46.1672 N — en-Wikipedia "Škofja Loka"
    laudat: {
      maailmankartta: { x: 6310.1, y: 1553.4 },
      europe: { x: 485.8, y: 679.4 },
    },
    teksti: 'Škofja Loka on Ylä-Krainin kaupunki, jonka nimi tarkoittaa piispan kosteaa '
      + 'niittyä. Keisari Otto II lahjoitti alueen herruuden Freisingin piispoille vuonna '
      + '973, ja lähes tuhat vuotta kaupungin historia oli sidoksissa tähän kaukaiseen '
      + 'kirkolliseen ruhtinaskuntaan. Markkinaoikeudet mainitaan ensi kerran vuonna 1248 '
      + 'ja kaupunkioikeudet vuonna 1274, ja 1300-luvulla kaupunki ympäröitiin muurilla. '
      + 'Vuonna 1803 Saksan alueiden uudelleenjärjestelyissä Škofja Loka liitettiin '
      + 'Itävallan Krainin herttuakuntaan. Vanha keskusta on yksi Slovenian parhaiten '
      + 'säilyneistä keskiaikaisista kaupunkiytimistä. Kaupungissa syntyi myös '
      + 'sloveniankielisen näytelmäkirjallisuuden vanhin näytelmä, pitkäperjantain '
      + 'passiokulkue.',
    lahde: 'en-Wikipedia "Škofja Loka", johdanto-osa ja osiot "Name", "History" ja "Culture" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sticna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-sticna-ad2a5519.jpg',
      lyhyt: 'Stičnan luostarin kirkontorni ja rakennukset kylän keskellä.',
      selite: 'Luostarin kirkon torni kohoaa punakattoisten rakennusten yläpuolelle. Etualalla '
        + 'on niitty ja puinen rakennelma, taustalla metsäisiä kukkuloita.',
      lahde: 'Valokuva: Miha Peče, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Miha Peče',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sti%C4%8Dna_Abbey_2025_I.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-sticna-189430b2.jpg',
        lyhyt: 'Stičnan luostarin vanha prelatuuri, jossa toimii Kristinuskon museo.',
        selite: 'Valkoiset, kivikehyksin koristellut rakennukset ympäröivät luostarin pihaa. '
          + 'Slovenian kristinuskon museo toimii luostarin vanhassa '
          + 'prelatuurirakennuksessa.',
        lahde: 'Valokuva: Muzej Stična, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Muzej Stična',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Muzej_krscanstva_na_slovenskem.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-sticna-30083cc9.jpg',
        lyhyt: 'Stičnan luostari vanhassa kuparipiirroksessa.',
        selite: 'Ilmakuvan tapaan tehty piirros esittää luostarin rakennukset, kirkon tornin '
          + 'ja muurien ympäröimät puutarhat. Kuvan otsikkona on Kloster Sittich, '
          + 'luostarin saksankielinen nimi.',
        lahde: 'Valokuva: Valvasor (vanha piirros; tekijä ei näy Commonsin metatiedoissa), Wikimedia Commons (Public domain).',
        tekija: 'Valvasor (vanha piirros; tekijä ei näy Commonsin metatiedoissa)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samostan_Sti%C4%8Dna-Valvasor.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Stičnan luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä erikoista on Stičnan käsikirjoituksessa, joka syntyi luostarin kirjoitustuvassa?',
      'Mitä luostarille tapahtui vuonna 1784, ja miten se sai uuden alun?',
    ],
    korostukset: ['Jacobus Gallus|Jacobus Gallusin', 'Stičnan käsikirjoitus|Stičnan käsikirjoitus'],
    nappi: 'Luostari oli lakkautettu 1784; munkit palasivat vasta vuonna 1898',
    // 14.8059 E / 45.9383 N — en-Wikipedia "Stična Abbey"
    laudat: {
      maailmankartta: { x: 6326.9, y: 1562.9 },
      europe: { x: 495.5, y: 685.4 },
    },
    teksti: 'Stičnan luostari on Slovenian vanhin luostari ja maan ainoa edelleen toimiva '
      + 'sistersiläisluostari. Aquileian patriarkka Pellegrinus I antoi perustamiskirjan '
      + 'vuonna 1136, vaikka munkkielämä oli alkanut jo edellisenä vuonna. Luostarista '
      + 'tuli nopeasti tärkeä uskonnollinen, kulttuurinen ja taloudellinen keskus: sen '
      + 'kirjoitustuvassa tehtiin koristeltuja latinankielisiä käsikirjoituksia jo '
      + '1100-luvulla, ja sloveniankielinen Stičnan käsikirjoitus syntyi siellä '
      + '1400-luvulla. Luostarin koulussa uskotaan renessanssisäveltäjä Jacobus Gallusin '
      + 'saaneen ensimmäisen musiikkiopetuksensa. Osmanien ryöstöretket vaivasivat '
      + 'luostaria, ja keisari Joosef II lakkautti sen vuonna 1784; munkit palasivat vasta '
      + 'vuonna 1898.',
    lahde: 'en-Wikipedia "Stična Abbey", johdanto-osa ja osiot "History", "Stična manuscript" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kobarid',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kobarid-3eed66ee.jpg',
      lyhyt: 'Kobaridin katot ja kirkontorni Soča-laakson vuorten ympäröiminä.',
      selite: 'Punakattoisia taloja ja kirkon torni kylän reunalla. Taustalla näkyvät laakson '
        + 'vihreä pohja ja jyrkät metsäiset vuorenrinteet.',
      lahde: 'Valokuva: Stephen Colebourne, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Stephen Colebourne',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kobarid_town_view.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kobarid-06a540a4.jpg',
        lyhyt: 'Kobaridin museon rakennus kaupungin keskustassa.',
        selite: 'Museo esittelee ensimmäisen maailmansodan Isonzon rintaman tapahtumia, ja se '
          + 'on saanut Euroopan neuvoston palkinnon. Julkisivun edessä on vanha tykki.',
        lahde: 'Valokuva: Dani 7C3, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Dani 7C3',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kobariski_muzej.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kobarid-96802206.jpg',
        lyhyt: 'Napoleonin silta kalliorotkon yllä lähellä Kobaridia.',
        selite: 'Kaareva kivisilta ylittää jyrkän rotkon. Silta on tullut yhdeksi Kobaridin '
          + 'tunnetuimmista symboleista ja on suosittu matkailukohde.',
        lahde: 'Valokuva: Ajznponar, Wikimedia Commons (CC0).',
        tekija: 'Ajznponar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Napoleon_Bridge_near_Kobarid,_view_from_south_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Kobarid',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mistä Kobaridin nimen arvellaan tulevan?',
      'Miksi Kobaridista tuli ensimmäisen maailmansodan aikana tunnettu paikka?',
    ],
    korostukset: ['Caporeton taistelu|Caporeton taistelu', 'Tonocov Grad|Tonocov Gradin'],
    nappi: 'Itävallan alainen Soča-laakson kylä; Isonzon taistelut alkavat vasta vuonna 1915',
    // 13.578 E / 46.246 N — en-Wikipedia "Kobarid"
    laudat: {
      maailmankartta: { x: 6285.9, y: 1550.1 },
      europe: { x: 471.9, y: 677.3 },
    },
    teksti: 'Kobarid sijaitsee Sloveniassa Julian Alppien Ylä-Soča-laaksossa, Soča-joen ja '
      + 'Nadiža-joen yhtymäkohdassa lähellä Italian rajaa. Aluetta on asutettu '
      + 'esihistoriallisista ajoista, ja läheisestä Tonocov Gradin kohteesta on löytynyt '
      + 'roomalaisajan rakennusten jäänteitä. Paikka mainitaan kirjallisissa lähteissä '
      + 'ensimmäisen kerran vuonna 1184, ja Habsburgien maihin kuuluneena se pysyi '
      + 'Itävallan vallan alla vuoteen 1918. Ensimmäisen maailmansodan Isonzon '
      + 'taisteluissa kaupunki tuhoutui lähes kokonaan vuosina 1915–1917, ja vuoden 1917 '
      + 'Caporeton taistelu on sen tunnetuin tapahtuma. Taisteluita esittelee kaupungin '
      + 'keskustan museo, joka sai Euroopan neuvoston palkinnon vuonna 1993.',
    lahde: 'en-Wikipedia "Kobarid", johdanto-osa ja osiot "History", "Kobarid today" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ljubljansko-barje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ljubljansko-barje-a4f82112.jpg',
      lyhyt: 'Ljubljanan suon laaja tasanko Sveta Anan kukkulalta katsottuna.',
      selite: 'Pellot, niityt ja puurivit levittäytyvät tasaisena tasankona kaukaisten vuorten '
        + 'juurelle. Kuva on otettu Sveta Anan kukkulalta Podpečin lähellä.',
      lahde: 'Valokuva: Yerpo, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Yerpo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ljubljana_marsh_-_W.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ljubljansko-barje-4dcb7859.jpg',
        lyhyt: 'Maailman vanhimpana pidetty puinen pyörä akseleineen.',
        selite: 'Ljubljanan suosta löytynyt pyörä ja sen akseli on aseteltu '
          + 'näyttelyvitriiniin. Pyörä on noin 5 150 vuotta vanha.',
        lahde: 'Valokuva: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petar Milošević',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ljubljana_Marshes_Wheel_with_axle_(oldest_wooden_wheel_yet_discovered).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ljubljansko-barje-aaa65534.jpg',
        lyhyt: 'Nykyaikainen paalukylän jäljennös Ljubljanan suolla.',
        selite: 'Olkikattoisia mökkejä seisoo niityn laidalla puisen kävelysillan varrella. '
          + 'Rakennelma on rekonstruktio esihistoriallisesta paalukylästä.',
        lahde: 'Valokuva: Miha Peče, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Miha Peče',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pile-dwelling_at_Barje.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ljubljanan suo',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ljubljanan suolta on löytynyt niin paljon esihistoriallisia esineitä?',
      'Mitä paalukylä oli, ja miksi sellainen rakennettiin veden äärelle?',
    ],
    korostukset: ['paalukylä|paalukylä', 'Unesco|Unescon'],
    nappi: 'Ljubljanan eteläpuolinen suo, jonka halki kulki tie 1827; paalukylät löytyvät '
      + 'vasta 1875',
    // 14.4539 E / 45.9874 N — en-Wikipedia "Ljubljana Marsh"
    laudat: {
      maailmankartta: { x: 6315.1, y: 1560.9 },
      europe: { x: 488.7, y: 684.1 },
    },
    teksti: 'Ljubljanan suo eli Ljubljansko barje on Ljubljanan eteläpuolella sijaitseva '
      + 'Slovenian suurin suo, jonka pinta-ala on 163 neliökilometriä. Esihistoriallisena '
      + 'aikana alue oli matala järvi, jonka rannoille rakennettiin paalukyliä. Suosta on '
      + 'löytynyt myös noin 5 150 vuotta vanha puinen pyörä akseleineen, jota pidetään '
      + 'maailman vanhimpana. Ensimmäinen paalukylä löydettiin Igin läheltä vuonna 1875, '
      + 'ja kaksi Igin lähellä olevaa asuinpaikkaa liitettiin Unescon '
      + 'maailmanperintöluetteloon vuonna 2011. Ensimmäinen tie suon poikki, Ljubljanasta '
      + 'Igiin, aloitettiin vuonna 1825 ja valmistui 1827. Nykyisin suuri osa alueesta on '
      + 'suojeltu maisemapuistona.',
    lahde: 'en-Wikipedia "Ljubljana Marsh" ja sl-Wikipedia "Ljubljansko barje", johdanto-osat '
      + 'ja osiot "History" / "Arheološke najdbe" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä Ljubljanan suolta löytynyt esine on maailman vanhimpia omassa lajissaan?',
      vaihtoehdot: [
        'Pronssinen sirppi',
        'Kivinen kirvestera',
        'Savinen ruukku',
        'Puinen pyörä akseleineen',
      ],
      oikea: 3,
      fakta: 'Nimen Ljubljansko barje antoi kirjailija Fran Levstik 1800-luvun '
        + 'jälkipuoliskolla; sitä ennen suota kutsuttiin nimellä Ljubljansko močvirje. '
        + 'Ljubljanica-joen vähäisen kaltevuuden vuoksi suo tulvii säännöllisesti keväisin '
        + 'ja syksyisin.',
    },
  },
  {
    id: 'hahmotelma-kostanjevica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kostanjevica-bff369df.jpg',
      lyhyt: 'Krka-joki Kostanjevican kohdalla ja kirkon torni puiden takana.',
      selite: 'Joen rannalla kasvaa lehtipuita, ja niiden takaa nousee kirkon torni. '
        + 'Kostanjevican keskusta sijaitsee Krka-joen saarella.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kostanjevica_na_Krki.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kostanjevica-53b03700.jpg',
        lyhyt: 'Entinen luostari ylhäältä: sisäpihaa ympäröivät kaarikäytävät.',
        selite: 'Ilmakuvassa näkyvät luostarin punakattoinen rakennuskompleksi, kirkon torni '
          + 'ja kaarikäytävien ympäröimä laaja sisäpiha. Goottilainen kirkko ja '
          + 'barokkiluostari ovat merkittävä esimerkki Slovenian sakraaliarkkitehtuurista.',
        lahde: 'Valokuva: KAP Jasa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'KAP Jasa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Former_Kostanjevica_Cistercian_monastery_and_church_of_St._Mary_of_the_Annunciation.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-kostanjevica-745a30e4.jpg',
        lyhyt: 'Luostarin julkisivu ja Forma vivan veistoksia nurmikolla.',
        selite: 'Valkoisen luostarirakennuksen vieressä kohoaa kirkon julkisivu ja torni, ja '
          + 'nurmella seisoo metallisia veistoksia. Luostarissa toimii Božidar Jakacin '
          + 'galleria, jossa on myös veistospuisto.',
        lahde: 'Valokuva: G-Cup, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'G-Cup',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kostanjevica_na_Krki,_Galerija_Bo%C5%BEidarja_Jakca.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kostanjevica na Krki',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Kostanjevica na Krkia kutsutaan Ala-Krainin Venetsiaksi?',
      'Mitä entisessä sistersiläisluostarissa on nykyään?',
    ],
    korostukset: ['Bernhard von Spanheim|Bernhard von Spanheim', 'Božidar Jakacin galleria|Božidar Jakacin galleria'],
    nappi: 'Krka-joen saarella oleva maaseutukaupunki, jonka luostari oli lakkautettu 1785',
    // 15.4249 E / 45.8463 N — en-Wikipedia "Kostanjevica na Krki"
    laudat: {
      maailmankartta: { x: 6347.5, y: 1566.8 },
      europe: { x: 507.4, y: 687.8 },
    },
    teksti: 'Kostanjevica na Krki on pieni kaupunki Etelä-Slovenian historiallisessa '
      + 'Ala-Krainissa, Gorjancin kukkuloiden pohjoisjuurella lähellä Kroatian rajaa. '
      + 'Keskusta sijaitsee Krka-joen saarella, minkä vuoksi paikkaa mainostetaan nimellä '
      + '"Ala-Krainin Venetsia". Se mainittiin kaupunkina ensimmäisen kerran vuonna 1210, '
      + 'ja sitä pidetään alueen vanhimpana kaupunkina. 1200-luvun alussa herttua Bernhard '
      + 'von Spanheim perusti paikalle sistersiläisluostarin, jonka varhaisgoottilainen '
      + 'kirkko on rakennettu vuonna 1234. Luostari laajennettiin barokkityyliin '
      + '1700-luvun alussa, mutta keisari Joosef II lakkautti sen vuonna 1785. Nykyisin '
      + 'entisissä luostarirakennuksissa toimii Božidar Jakacin galleria, jossa on '
      + 'veistospuisto ja taiteilijan töiden pysyvä näyttely.',
    lahde: 'en-Wikipedia "Kostanjevica na Krki", johdanto-osa ja osiot "History", "Sights" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-piran',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-piran-c42c5352.jpg',
      lyhyt: 'Tartinin aukio ja Piranin punaiset tiilikatot kirkontornista katsottuna.',
      selite: 'Aukion keskellä on Tartinin patsas, taustalla näkyvät satama ja lahti. Aukio '
        + 'rakennettiin vuonna 1894 alueelle, jossa oli aiemmin kalastajien satama.',
      lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Isiwal',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Piran_Tartini_square_from_cathedral.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-piran-f91b780f.jpg',
        lyhyt: 'Giuseppe Tartinin pronssipatsas Piranin Tartinin aukiolla.',
        selite: 'Patsas esittää kaupungissa syntynyttä viulistia ja säveltäjää Giuseppe '
          + 'Tartinia korkealla jalustallaan aukiolla, joka on nimetty hänen mukaansa. '
          + 'Patsas nostettiin jalustalleen vuonna 1896.',
        lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Isiwal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Piran_Tartini_trg_monument_Tartini.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-piran-5381ea3e.jpg',
        lyhyt: 'Piranin kaupunginmuurin torneja ja muurinharjaa, taustalla lahti.',
        selite: 'Muurin tämä osa rakennettiin vuosina 1470–1534. Muurit rakennettiin '
          + 'suojaamaan kaupunkia ottomaanien hyökkäyksiltä.',
        lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Isiwal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Piran_city_walls_SW.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Piran',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Piranissa puhutaan sekä sloveenia että italiaa?',
      'Kuka oli Giuseppe Tartini, ja miksi hänen patsaansa seisoo Piranin pääaukiolla?',
    ],
    korostukset: ['Giuseppe Tartini|Tartini', 'Venetsian tasavalta|Venetsian tasavallalle'],
    nappi: 'Venetsian entinen kaupunki Itävallan alaisena; Tartinin patsas nousi aukiolle '
      + 'vasta 1896',
    // 13.5683 E / 45.5283 N — en-Wikipedia "Piran"
    laudat: {
      maailmankartta: { x: 6285.6, y: 1580 },
      europe: { x: 471.7, y: 696.2 },
    },
    teksti: 'Piran on Slovenian Istrian rannikolla Piranin lahden rannalla sijaitseva '
      + 'lomakaupunki, joka tunnetaan keskiaikaisesta rakennuskannastaan, kapeista '
      + 'kujistaan ja tiiviisti rakennetuista taloistaan. Kaupungissa puhutaan sekä '
      + 'sloveenia että italiaa. Piran kuului vuosina 1283–1797 Venetsian tasavallalle, ja '
      + 'venetsialainen vaikutus näkyy yhä sen rakennuksissa. Sen jälkeen kaupunki '
      + 'liitettiin Itävallan keisarikuntaan, ja 1800-luvun lopulla väestöstä noin 80 '
      + 'prosenttia oli kulttuuriltaan italialaisia. Kaupungin kuuluisin poika on viulisti '
      + 'ja säveltäjä Giuseppe Tartini, jonka mukaan pääaukio on nimetty. Keskiaikaisia '
      + 'kaupunginmuureja on säilynyt monin paikoin.',
    lahde: 'en-Wikipedia "Piran", johdanto-osa ja osiot "History", "Culture and education" ja '
      + '"Monuments" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä säveltäjän ja viulistin mukaan Piranin pääaukio on nimetty?',
      vaihtoehdot: [
        'Antonio Vivaldi',
        'Giuseppe Tartini',
        'Niccolò Paganini',
        'Claudio Monteverdi',
      ],
      oikea: 1,
      fakta: 'Piranin nimen arvellaan tulevan kreikan sanasta pyrrhos, "punainen", kaupungin '
        + 'seudulla yleisten punertavien flyysikivien mukaan. Ensimmäinen Slovenian '
        + 'johdinautolinja avattiin Piranissa 24. lokakuuta 1909.',
    },
  },
  {
    id: 'hahmotelma-maribor',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-maribor-8a1d6a2b.jpg',
      lyhyt: 'Maailman vanhimpana pidetty viiniköynnös Marburgin Lentissä.',
      selite: 'Žametovka-köynnös kasvaa talon seinustalla rautaristikon varassa. Se on yli '
        + '400-vuotias, ja se kirjattiin Guinnessin ennätyskirjaan vuonna 2004.',
      lahde: 'Valokuva: Janezdrilc, Wikimedia Commons (CC0).',
      tekija: 'Janezdrilc',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stara_trta_of_Maribor.JPG',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-maribor-3fcbafff.jpg',
        lyhyt: 'Vanhan köynnöksen talo Lentissä, seinustalla vihreää lehvistöä.',
        selite: 'Vanhan köynnöksen talon (Hiša stare trte) pitkää seinustaa peittää '
          + 'viiniköynnöksen lehvistö. Talo sijaitsee Lentin kaupunginosassa.',
        lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palickap',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maribor,_Stara_trta_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-maribor-a638fb81.jpg',
        lyhyt: 'Marburgin pääaukio, kaupungintalo ja ruttopatsas.',
        selite: 'Aukiolla kohoaa kultaisella hahmolla kruunattu ruttopatsas. Ensimmäinen '
          + 'pylväs pystytettiin vuonna 1681 kiitokseksi ruton päättymisestä, ja nykyinen '
          + 'tuli sen tilalle vuonna 1743; kaupungintalo on vuodelta 1515.',
        lahde: 'Valokuva: Jernej Furman from Maribor, Slovenia, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Jernej Furman from Maribor, Slovenia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maribor_Town_Hall_square_Slovenia_Europe._Maribor_Town_Hall_and_Plague_Column_on_the_central_square_(51785089714).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Maribor',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Marburgin Lentissä kasvavaa viiniköynnöstä pidetään ihmeenä?',
      'Mitä Lent-festivaalilla tapahtuu, ja mistä se on saanut nimensä?',
    ],
    korostukset: ['žametovka|žametovka', 'Marburg an der Drau|Marburg an der Drau'],
    nappi: 'Marburg an der Drau: rautatie tuli kaupunkiin 1846 ja piispanistuin siirtyi tänne '
      + '1859',
    // 15.6456 E / 46.5575 N — en-Wikipedia "Maribor"
    laudat: {
      maailmankartta: { x: 6354.9, y: 1537.1 },
      europe: { x: 511.6, y: 669.1 },
    },
    teksti: 'Maribor on Slovenian toiseksi suurin kaupunki ja Ala-Steiermarkin perinteisen '
      + 'alueen suurin. Linna mainitaan ensi kertaa vuonna 1164, kaupunkioikeudet saatiin '
      + '1254, ja alue kuului Habsburgien vallan alle vuoteen 1918 asti; saksaksi kaupunki '
      + 'on Marburg an der Drau. Joka kesäkuu Lentin ranta-alueella järjestetään kahden '
      + 'viikon Lent-festivaali. Kaupunki tunnetaan myös viinistään: Lentissä kasvaa '
      + 'žametovka-lajikkeen köynnös, joka on yli 400-vuotias ja kirjattiin vuonna 2004 '
      + 'Guinnessin ennätyskirjaan maailman vanhimpana viiniköynnöksenä. Vinagin '
      + 'viinikellari on kaksi kilometriä pitkä ja mahtuu 5,5 miljoonaa litraa viiniä.',
    lahde: 'en-Wikipedia "Maribor", johdanto-osa ja osiot "Modern period" ja "Culture" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä on Lentissä kasvavan žametovka-köynnöksen erikoisuus?',
      vaihtoehdot: [
        'Se on maailman vanhin viiniköynnös',
        'Se on maailman korkein viiniköynnös',
        'Se tuottaa maailman makeimmat rypäleet',
        'Se on Euroopan ensimmäinen viinitarha',
      ],
      oikea: 0,
      fakta: 'Sähköinsinööri Nikola Tesla asui Mariborissa 1878–1879 ja sai täällä '
        + 'ensimmäisen työpaikkansa. Kaupungin Linnantorille asennettiin vuonna 1883 '
        + 'ensimmäinen sähkövalo slovenialaisella alueella.',
    },
  },
  {
    id: 'hahmotelma-lipica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lipica-b6266fd8.jpg',
      lyhyt: 'Lipican hevosia laitumella syksyisten puiden alla.',
      selite: 'Valkoisia ja tummia hevosia laiduntaa nurmella. Lipizzanit syntyvät yleensä '
        + 'tummina ja vaalenevat vuosien mittaan, ja aikuisina useimmat ovat harmaita eli '
        + 'näyttävät valkoisilta.',
      lahde: 'Valokuva: Gorupka from Slovenia, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Gorupka from Slovenia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lipica_horses_(7198987762).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lipica-8ba6f912.jpg',
        lyhyt: 'Hovin hevoslauma Lipican laitumella, kuvitus vuodelta 1892.',
        selite: 'Julius von Blaasin piirros esittää hovin ratsutilan hevosia laitumella '
          + 'Lipicassa. Kuva julkaistiin vuonna 1892 Itävalta-Unkarin monarkiaa kuvaavassa '
          + 'kirjasarjassa.',
        lahde: 'Valokuva: Julius von Blaas, Wikimedia Commons (Public domain).',
        tekija: 'Julius von Blaas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Julius_von_Blaas_Lipica_%C3%A9s_a_lipicai_mez%C5%91n_legel%C5%91_m%C3%A9nes,_1892.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lipica-050c7615.jpg',
        lyhyt: 'Valkoinen lipizzan kohoaa takajaloilleen kouluttajan vieressä maneesissa.',
        selite: 'Kouluttaja työskentelee hevosen kanssa sisämaneesissa. Lipizzanit tunnetaan '
          + 'korkeakoulun ratsastuksen vaativista liikkeistä.',
        lahde: 'Valokuva: Keith Roper, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Keith Roper',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lipica_Stud_Farm,_Slovenia,_June_2012_(5).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Lipica',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi ratsutila perustettiin juuri Karstin alueelle?',
      'Mistä Lipican nimi tulee, ja mitä sillä on tekemistä varsojen kanssa?',
    ],
    korostukset: ['Kaarle II|Kaarle II', 'Štanjelin|Štanjelin'],
    nappi: 'Habsburgien ratsutila oli toiminut jo yli 290 vuotta: se perustettiin vuonna 1580',
    // 13.8828 E / 45.6669 N — en-Wikipedia "Lipica, Sežana"
    laudat: {
      maailmankartta: { x: 6296.1, y: 1574.2 },
      europe: { x: 477.7, y: 692.6 },
    },
    teksti: 'Lipica on kylä Sežanan kunnassa Slovenian Karstin alueella, aivan Italian rajan '
      + 'tuntumassa. Se tunnetaan Lipican ori- eli ratsutilasta, jonka mukaan '
      + 'lipizzanerhevonen on saanut nimensä. Arkkiherttua Kaarle II perusti tilan vuonna '
      + '1580, ja ensimmäiset hevoset ostettiin Espanjasta 1581, koska Karstin maaperä ja '
      + 'ilmasto muistuttavat Espanjan oloja. Nykyisen muotonsa rotu sai Maria Teresian '
      + 'aikana, ja sotien tieltä hevosia jouduttiin siirtämään pois Lipicasta useaan '
      + 'kertaan. Karstin tasangolla on myös muurin ympäröimä Štanjelin kylä, jonka linna '
      + 'sai nykyisen asunsa 1600-luvun lopulla.',
    lahde: 'en-Wikipedia "Lipica, Sežana", johdanto-osa ja osiot "Name", "History" ja "Lipica '
      + 'Stud Farm"; en-Wikipedia "Štanjel", johdanto-osa ja osio "Landmarks" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-ormoz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ormoz-6fcf30c3.jpg',
      lyhyt: 'Ormožin linnan valkoinen päärakennus ja kellotorni.',
      selite: 'Ptujin herrojen rakentamassa linnassa on nykyään museo.',
      lahde: 'Valokuva: Yerpo, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Yerpo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grad_Ormoz_-_front.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ormoz-cc8de604.jpg',
        lyhyt: 'Friedaun kaupunki ja linna, litografia vuodelta 1825.',
        selite: 'Joseph Franz Kaiserin litografia kuuluu Steiermarkin kaupunkeja, '
          + 'markkinapaikkoja ja linnoja esittelevään kokoelmaan, joka julkaistiin '
          + 'Grazissa vuonna 1825. Kuvassa näkyvät Friedaun eli Ormožin kaupunki ja linna.',
        lahde: 'Valokuva: Joseph Franz Kaiser, Wikimedia Commons (Public domain).',
        tekija: 'Joseph Franz Kaiser',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:049_Schlo%C3%9F_und_Stadt_Friedau_an_der_Drau_-_J.F.Kaiser_Lithografirte_Ansichten_der_Steiermark_1825.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ormoz-1440e2a8.jpg',
        lyhyt: 'Pyhän Jaakobin seurakuntakirkko Ormožissa valkoisine torneineen.',
        selite: 'Kirkko on omistettu pyhälle Jaakobille, ja se mainitaan ensi kerran vuonna '
          + '1271. Sitä on rakennettu uudelleen 1500–1700-luvuilla, ja sen sisällä on '
          + '1300- ja 1600-lukujen seinämaalauksia.',
        lahde: 'Valokuva: Nxr-at, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nxr-at',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%BDupnijska_cerkev_sv_Jakoba_Ormo%C5%BE_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ormož',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Ormožia kutsuttiin aiemmin nimellä Friedau?',
      'Mikä tekee entisen sokeritehtaan altaista tärkeän luontokohteen?',
    ],
    korostukset: ['Friedau|Friedau', 'Prlekija|Prlekijan'],
    nappi: 'Steiermarkin Friedau: Draavan varren kaupunki, jossa väestö oli tuolloin '
      + 'enimmäkseen saksankielistä',
    // 16.1475 E / 46.4086 N — en-Wikipedia "Ormož"
    laudat: {
      maailmankartta: { x: 6371.6, y: 1543.3 },
      europe: { x: 521.2, y: 673.1 },
    },
    teksti: 'Ormož on Draava-joen vasemmalla rannalla Itä-Slovenian Prlekijan alueella, aivan '
      + 'Kroatian rajan tuntumassa. Kaupunki sai markkinaoikeudet vuonna 1293 ja '
      + 'kaupunkioikeudet 1331, ja pitkään sen tunnetuin nimi oli saksalainen Friedau; '
      + 'vielä vuoteen 1919 asti väestö oli enimmäkseen saksankielistä. Ptujin herrojen '
      + 'rakentamassa linnassa on nykyään museo. Kaupungin pohjoispuolella kohoavalla '
      + 'mäkimaalla on metsiä ja viinitarhoja, ja Ormožin viinikellari tunnetaan '
      + 'korkealaatuisista viineistään. Kaakkoispuolella oleva tekojärvi ja entisen '
      + 'sokeritehtaan altaista syntynyt lintualue ovat tärkeitä muuttolintujen '
      + 'elinympäristöjä.',
    lahde: 'en-Wikipedia "Ormož" ja sl-Wikipedia "Ormož", johdanto-osat ja osiot "History" ja '
      + '"Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lendava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lendava-662ef3de.jpg',
      lyhyt: 'Lendavan linna kohoaa puiden takaa kaupungin yläpuolella.',
      selite: 'Pääosin 1700-luvulla rakennettu linna seisoo kukkulalla keskustan yläpuolella; '
        + 'kuva on otettu kaupungin uudemmalta puolelta. Linnassa on museo ja galleria.',
      lahde: 'Valokuva: Silverije, Wikimedia Commons (CC0).',
      tekija: 'Silverije',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lendava_-_stari_grad.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lendava-fc19d165.jpg',
        lyhyt: 'Viinitarha Lendavan kukkuloilla, taustalla Vinarium-torni.',
        selite: 'Tukikeppien varaan kasvatettuja viiniköynnöksiä Lendavan viinimäillä; '
          + 'horisontissa kohoaa Vinarium-torni.',
        lahde: 'Valokuva: Clemens Stockner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Clemens Stockner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lendavske_gorice_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-lendava-7246ac9b.jpg',
        lyhyt: 'Lendavan synagoga, yksi Slovenian kahdesta jäljellä olevasta.',
        selite: 'Synagoga muistuttaa Lendavan juutalaisyhteisöstä, joka oli tärkeä osa '
          + 'kaupungin taloutta: sen jäsenet olivat muun muassa kauppiaita, '
          + 'majatalonpitäjiä ja lääkäreitä.',
        lahde: 'Valokuva: Gibalec at sl.wikipedia, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Gibalec at sl.wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sinagoga_lendava_3.JPG',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5/si/deed.en',
      },
    ],
    nimi: 'Lendava',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Lendavassa on sloveenin lisäksi virallisena kielenä unkari?',
      'Mikä tekee Lendavan synagogasta erityisen Sloveniassa?',
    ],
    korostukset: ['Esterházy|Esterházyn', 'Alsólendva|Alsólendva'],
    nappi: 'Alsólendvan piiri kuului Unkarin kuningaskunnan Zalan komitaattiin, ei Itävaltaan',
    // 16.4519 E / 46.5631 N — en-Wikipedia "Lendava"
    laudat: {
      maailmankartta: { x: 6381.7, y: 1536.9 },
      europe: { x: 527.1, y: 669 },
    },
    teksti: 'Lendava on kaupunki Prekmurjen alueella, lähellä Unkarin ja Kroatian rajaa. Se on '
      + 'Slovenian unkarilaisvähemmistön keskus, ja kunnassa sekä sloveeni että unkari '
      + 'ovat virallisia kieliä. Kaupunki on saanut nimensä Ledava-joesta; unkariksi se on '
      + 'Lendva, aiemmin Alsólendva. Vuoteen 1918 asti Alsólendva oli Zalan komitaatin '
      + 'piiri Unkarin kuningaskunnassa. Kukkulalla keskustan yläpuolella seisoo pääosin '
      + '1700-luvulla rakennettu linna, entinen Esterházyn suvun omaisuus, jossa on '
      + 'nykyään museo ja galleria. Lendavassa on myös synagoga, yksi Slovenian kahdesta '
      + 'säilyneestä, ja ympäristössä on viinitarhoja.',
    lahde: 'en-Wikipedia "Lendava", johdanto-osa ja osiot "History", "Jewish community" ja '
      + '"Landmarks" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-idrija',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-idrija-dd904fce.jpg',
      lyhyt: 'Käytävä Antonin kuilussa: kaivostyöläisiä esittävät hahmot työntävät vaunua.',
      selite: 'Antonin kuilu (Antonijev rov) on Idrijan elohopeakaivoksen sisäänkäynti, jonka '
        + 'ylätasoilla kierretään opastetusti. Käytävissä on kaivostyöläisiä eri '
        + 'aikakausilta esittäviä hahmoja.',
      lahde: 'Valokuva: Jani Peternelj, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Jani Peternelj',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Antonijev_rov.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-idrija-51518b4a.jpg',
        lyhyt: 'Gewerkenegg-linna Idrijassa: pyöreitä torneja ja kellotorni.',
        selite: 'Kaivoksen omistajat rakennuttivat linnan vuosina 1522–1533 tukemaan '
          + 'kaivostoimintaa. Valkoisessa rakennuksessa on pyöreät kulmatornit ja kellolla '
          + 'varustettu torni.',
        lahde: 'Valokuva: Luka Peternel, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Luka Peternel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gewerkenegg-Castle-Idrija-1-2021-Luka-Peternel.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-idrija-e885df9e.jpg',
        lyhyt: 'Idrija vuoden 1845 piirroksessa: talot tiiviinä kaivoskaupungin laaksossa.',
        selite: 'Mustavalkoinen piirros Idrijasta vuodelta 1845, vajaat kolme vuosikymmentä '
          + 'ennen vuotta 1873. Talot ovat ahtautuneet jyrkkien rinteiden väliseen '
          + 'laaksoon.',
        lahde: 'Valokuva: Wagner, Wikimedia Commons (Public domain).',
        tekija: 'Wagner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Idrija_1845.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Idrija',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mihin elohopeaa tarvittiin hopea- ja kultakaivoksissa, ja miksi sitä kuljetettiin Idrijasta niin kauas?',
      'Mikä tekee Idrijan elohopeasta harvinaista koko maailmassa?',
    ],
    korostukset: ['elohopea|elohopeaa', 'sinooperi|sinooperi'],
    nappi: 'Krainin elohopeakaivoskaupunki, jonka kaivos oli ollut valtion hallussa jo '
      + 'vuodesta 1580',
    // 14.0275 E / 46.0025 N — en-Wikipedia "Idrija"
    laudat: {
      maailmankartta: { x: 6300.9, y: 1560.3 },
      europe: { x: 480.5, y: 683.7 },
    },
    teksti: 'Idrija on Länsi-Slovenian kaupunki Idrijca-joen laaksossa, joka tunnetaan '
      + 'elohopeakaivoksestaan. Legendan mukaan saavinvalmistaja huomasi lähteessä pisaran '
      + 'nestemäistä elohopeaa vuonna 1490. Idrija on yksi harvoista paikoista maailmassa, '
      + 'missä elohopeaa esiintyy sekä puhtaana että sinooperina eli '
      + 'elohopeasulfidimalmina. Kaivos ja sen rakennukset, kuten kaivostyöläisten '
      + 'asuinalueet ja kaivosteatteri, kuuluvat vuodesta 2012 UNESCOn maailmanperintöön '
      + 'yhdessä espanjalaisen Almadénin kanssa. Kaupunki on tunnettu myös idrijalaisesta '
      + 'nyplätystä pitsistä, joka on suojattu maantieteellisellä merkinnällä.',
    lahde: 'en-Wikipedia "Idrija", johdanto-osa ja osio "Legend" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä toisen maan elohopeakaivoksen kanssa Idrijan kaivos on yhdessä UNESCOn '
        + 'maailmanperintökohde?',
      vaihtoehdot: [
        'Perun Huancavelican kaivoksen',
        'Meksikon San Luis Potosín kaivoksen',
        'Saksan Freibergin kaivoksen',
        'Espanjan Almadénin kaivoksen',
      ],
      oikea: 3,
      fakta: 'Idrijasta on nimetty mineraali idrialiitti, joka löydettiin täältä vuonna 1832. '
        + 'Kaivoksen alimmat tasot ulottuvat lähes 400 metrin syvyyteen, eikä niitä enää '
        + 'louhita.',
    },
  },
  {
    id: 'hahmotelma-trbovlje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-trbovlje-67dc443c.jpg',
      lyhyt: 'Ilmakuva Trbovljesta: kaupunki laaksossa metsäisten kukkuloiden ympäröimänä.',
      selite: 'Punakattoisia taloja ja kerrostaloalueita mäkisessä maastossa; taustalla '
        + 'nousevat metsäiset harjanteet. Kaupunki kasvoi laaksoon hiilenlouhinnan mukana.',
      lahde: 'Valokuva: Viktar Palstsiuk, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Viktar Palstsiuk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Trbovlje,_Slovenia.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-trbovlje-f276f3cf.jpg',
        lyhyt: 'Kaivosmiehiä Terezija-kaivostunnelin suulla Trbovljessa.',
        selite: 'Vanha mustavalkoinen valokuva Trbovljen kaivoksen sisäänkäynnistä. Etualalla '
          + 'kaivosmies kantaa lamppua, ja taustalla toiset miehet tulevat ulos '
          + 'tunnelista.',
        lahde: 'Valokuva: Adolf Vizjak, Wikimedia Commons (Public domain).',
        tekija: 'Adolf Vizjak',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rudnik_Trbovlje_-_Terezija_rov.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-trbovlje-9044cd52.jpg',
        lyhyt: 'Dobrnan hiilen avolouhos Trbovljessa: veturit vetävät hiilivaunuja.',
        selite: 'Vanha valokuva hiilen avolouhoksesta, jossa pienet veturit vetävät hiilellä '
          + 'lastattuja vaunuja. Kuva on otettu ennen vuotta 1926.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dnevni_kop_Dobrna_v_Trbovljah.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Trbovlje',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi rautatieyhteys oli 1800-luvulla niin tärkeä hiilikaivospaikkakunnalle?',
      'Miten 360 metriä korkea savupiippu pysyy pystyssä, vaikka sen huippu heiluu tuulessa?',
    ],
    korostukset: ['Perkmandeljc|Perkmandeljc', 'Etelärata|Etelärataan'],
    nappi: 'Steiermarkin kaivospaikkakunta, jossa hiiltä oli louhittu vuodesta 1804 ja '
      + 'rautatie kulki vuodesta 1849',
    // 15.05 E / 46.15 N — en-Wikipedia "Trbovlje"
    laudat: {
      maailmankartta: { x: 6335, y: 1554.1 },
      europe: { x: 500.2, y: 679.9 },
    },
    teksti: 'Trbovlje on Slovenian Steiermarkin historiallisessa maakunnassa sijaitseva '
      + 'kaivoskaupunki, joka tunnetaan pitkästä hiilenlouhinnan historiastaan. Louhinta '
      + 'alkoi Bukova goran rinteellä kaupungin eteläpuolella vuonna 1804, ja vuonna 1849 '
      + 'kaupunki liitettiin Itävallan Etelärataan. Sen jälkeen 1800-luvun aikana '
      + 'Trbovljeen rakennettiin muun muassa sementtitehdas, sahalaitos ja voimalaitos. '
      + 'Paikallisen legendan mukaan kaivoksissa temppuili Perkmandeljc-niminen tonttu, '
      + 'joka varasti kaivosmiesten eväät. Nykyään Trbovljen voimalaitoksella on Euroopan '
      + 'unionin korkein savupiippu, 360 metriä.',
    lahde: 'en-Wikipedia "Trbovlje" ja sl-Wikipedia "Trbovlje", johdanto-osat ja '
      + 'historiaosiot (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna hiilenlouhinta alkoi Trbovljessa Bukova goran rinteellä?',
      vaihtoehdot: [
        'Vuonna 1786',
        'Vuonna 1804',
        'Vuonna 1849',
        'Vuonna 1875',
      ],
      oikea: 1,
      fakta: 'Voimalaitoksen piipun läpimitta on tyvellä 27,5 metriä ja huipulla 7,7 metriä, '
        + 'ja kovalla tuulella sen huippu heiluu lähes metrin.',
    },
  },
  {
    id: 'hahmotelma-rogaska',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-rogaska-40a29dfd.jpg',
      lyhyt: 'Rogaška Slatina eli Sauerbrunn 1840-luvun teräspiirroksessa.',
      selite: 'Teräspiirros 1840-luvulta: keskellä kylpyläsiivet vuoristomaisemassa, ympärillä '
        + 'pienempiä näkymiä puistosta ja paviljonkeista. Paikka tunnettiin tuolloin '
        + 'saksaksi nimellä Sauerbrunn.',
      lahde: 'Valokuva: C. Kreuzer, Wikimedia Commons (Public domain).',
      tekija: 'C. Kreuzer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rogaška_Slatina_1840-a.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-rogaska-1dbbd7b2.jpg',
        lyhyt: 'Tempel-paviljonki kylpyläpuistossa: pylväiden kannattama pyöreä katos.',
        selite: 'Uusklassinen Tempel-paviljonki valmistui vuonna 1819. Pyöreä katos lepää '
          + 'pylväillä, ja taustalla näkyy kylpylän rakennuksia.',
        lahde: 'Valokuva: Franc Solina, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Franc Solina',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rogaška_Slatina_2020.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Rogaška Slatina',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Rogaška Slatinan nimi tarkoittaa, ja mistä ihmiset ovat tulleet hakemaan sen vettä?',
      'Miksi lasiteollisuus ja kylpylä sopivat niin hyvin yhteen Rogaška Slatinassa?',
    ],
    korostukset: ['Donat Mg|Donat Mg', 'Tempel-paviljonki|Tempel-paviljonki'],
    nappi: 'Rohitsch-Sauerbrunn, Steiermarkin kylpylä, jonne eliitti matkusti jo 1800-luvun '
      + 'puolivälistä',
    // 15.6381 E / 46.2314 N — en-Wikipedia "Rogaška Slatina"
    laudat: {
      maailmankartta: { x: 6354.6, y: 1550.7 },
      europe: { x: 511.5, y: 677.7 },
    },
    teksti: 'Rogaška Slatina on Itä-Slovenian kylpyläkaupunki, joka tunnetaan parantavasta '
      + 'kivennäisvedestään, kylpylästään ja kristallilasistaan. Magnesiumpitoinen vesi '
      + 'tunnetaan nykyisin nimellä Donat Mg, ja se on vetänyt vieraita seudulle '
      + 'vuosisatojen ajan. Lähteen ympärille rakennettiin 1600-luvulla puuaita, ja '
      + 'linnanherra Peter de Curti perusti sinne majatalon vuonna 1676 ja otti lähteillä '
      + 'kävijöiltä maksun. Vettä pullotettiin jo silloin läheisessä lasitehtaassa '
      + 'tehtyihin pulloihin. Uusklassinen Tempel-paviljonki valmistui vuonna 1819, ja '
      + '1800-luvun puoliväliin mennessä kaupungista oli tullut Habsburgien monarkian '
      + 'eliitin muodikas kokoontumispaikka.',
    lahde: 'en-Wikipedia "Rogaška Slatina" ja sl-Wikipedia "Rogaška Slatina", johdanto-osat '
      + 'ja osio "Spa" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ravne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ravne-92921602.jpg',
      lyhyt: 'Entisen Ravnen rautatehtaan tiilipiippu ja pitkä tehdashalli.',
      selite: 'Vanhan rautatehtaan rakennuksia, joissa on aaltopeltikattoja ja tiilipiippuja. '
        + 'Tehdasalue muistuttaa seudun yli 400 vuotta vanhasta metalliteollisuudesta.',
      lahde: 'Valokuva: Neža Ferk, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Neža Ferk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:7752,_stara_železarna,_Ravne_na_Koroškem_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ravne-43fcb792.jpg',
        lyhyt: 'Postikortti vuodelta 1899: teräsvalimo Gutensteinin lähellä Kärntenissä.',
        selite: 'Vuoden 1899 postikortissa savuavat tehdaspiiput kohoavat niityn takaa. Kortin '
          + 'saksankielinen teksti on suunnilleen \'Terveiset Streitebenistä, teräsvalimo '
          + 'Gutensteinin luona Kärntenissä\'.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Postcard_of_Ravne_na_Koroškem_1899.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-ravne-da20d1c2.jpg',
        lyhyt: 'Ravne vuonna 1960: tehtaan hallit ja savuavat piiput talojen takana.',
        selite: 'Ylhäältä otettu talvinen valokuva vuodelta 1960: rautatehtaan hallit ja '
          + 'savuavat piiput kohoavat pientalojen takaa. Kuva näyttää, miten lähellä '
          + 'tehdas ja asutus olivat toisiaan.',
        lahde: 'Valokuva: Jože Gal, Wikimedia Commons (Public domain).',
        tekija: 'Jože Gal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panoramski_posnetek_Raven_na_Koroškem_1960.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Ravne na Koroškem',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä nimi Ravne tarkoittaa, ja miksi paikan vanha nimi Guštanj vaihtui?',
      'Miksi juuri tähän laaksoon syntyi terästeollisuus, ja mitä rautatie muutti?',
    ],
    korostukset: ['Guštanj|Guštanj', 'Kärntenin|Kärntenin'],
    nappi: 'Guštanj eli Gutenstein Kärntenissä; Thurnin kreivien rautatehtaat olivat '
      + 'kasvaneet vuodesta 1807 alkaen',
    // 14.9642 E / 46.5437 N — en-Wikipedia "Ravne na Koroškem"
    laudat: {
      maailmankartta: { x: 6332.1, y: 1537.7 },
      europe: { x: 498.5, y: 669.5 },
    },
    teksti: 'Ravne na Koroškem on Pohjois-Slovenian kaupunki Mežan laaksossa, Slovenian '
      + 'Kärntenin eli Koroškan alueen suurin kaupunki. Paikkaa kutsuttiin vuoteen 1952 '
      + 'asti nimellä Guštanj, saksaksi Gutenstein Kärntenissä, ja se mainitaan '
      + 'ensimmäisen kerran vuoden 1263 asiakirjassa. Alue kuului Kärntenin herttuakuntaan '
      + 'jo vuodesta 976. Raudanvalmistus alkoi seudulla 1600-luvun alussa, ja '
      + 'teräsvalmistuksella on kaupungissa yli 400 vuoden perinne. Rautatie yhdisti '
      + 'paikan maailmaan vuonna 1863, ja laadukasta ravnelaista terästä myytiin ennen '
      + 'ensimmäistä maailmansotaa aina Lähi-itään, Kaukoitään ja Venäjälle.',
    lahde: 'en-Wikipedia "Ravne na Koroškem" ja sl-Wikipedia "Ravne na Koroškem", '
      + 'johdanto-osat ja historiaosiot (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-velenje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-velenje-eae17e8b.jpg',
      lyhyt: 'Velenjen linna kohoaa rinteellä valkoisine seinineen ja punaisine kattoineen.',
      selite: 'Rinteellä kohoava valkoinen linna, jossa on pyöreitä torneja ja punaisia '
        + 'kattoja. Linna mainitaan ensimmäisen kerran vuonna 1270, ja nykyinen ilme on '
        + 'peräisin 1500-luvun alun kunnostuksesta.',
      lahde: 'Valokuva: romanm, Wikimedia Commons (Public domain).',
      tekija: 'romanm',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velenjski_grad.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-velenje-3cde0b54.jpg',
        lyhyt: 'Ilmakuva: Velenjen linna puiston ympäröimänä ja kaupunki taustalla.',
        selite: 'Linna seisoo metsäisellä mäellä, ja sen takana levittäytyy 1950-luvulta '
          + 'alkaen suunniteltu kaupunki kerrostaloineen. Kauempana kohoavat Šalekin '
          + 'laakson metsäiset kukkulat.',
        lahde: 'Valokuva: Tilky0808, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tilky0808',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velenjski_grad_iz_zraka.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svn-nosto-velenje-bf8f6306.jpg',
        lyhyt: 'Velenjen linna vuoden 1860 väripiirroksessa: linna mäellä, alla kylän kirkko.',
        selite: 'Vanha väripiirros vuodelta 1860: linna kohoaa metsäisellä kukkulalla, ja alla '
          + 'näkyvät kylän talot sekä kirkko lippuineen. Kuva on vain 13 vuotta ennen '
          + 'vuoden 1873 matkaa.',
        lahde: 'Valokuva: C. Reicher, Wikimedia Commons (Public domain).',
        tekija: 'C. Reicher',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Velenje_Castle_1860.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Velenje',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Velenjen kaupunki suunniteltiin ja rakennettiin lähes kokonaan uudelleen 1950-luvulla?',
      'Mitä tarkoittaa pitkäseinälouhinta, jonka vuoksi Velenjen hiilikaivos on tunnettu?',
    ],
    korostukset: ['ruskohiilikaivos|ruskohiilikaivos', 'Habsburgit|Habsburgit'],
    nappi: 'Hiilikaivos avataan vasta vuonna 1875; linnan juurella on vain pieni kauppala',
    // 15.1144 E / 46.3625 N — en-Wikipedia "Velenje"
    laudat: {
      maailmankartta: { x: 6337.1, y: 1545.2 },
      europe: { x: 501.4, y: 674.3 },
    },
    teksti: 'Velenje on Slovenian Steiermarkin kuudenneksi suurin kaupunki Šalekin laaksossa, '
      + 'jota reunustavat lännessä Kamnik–Savinja-Alpit ja idässä Pohorjen vuoret. '
      + 'Habsburgit omistivat seutua vuosisatojen ajan, ja siksi alueella on '
      + 'poikkeuksellisen runsaasti linnoja ja kartanoita. Vanha Velenje oli vielä vuonna '
      + '1889 pieni kauppala Velenjen linnan juurella, ja asukkaita oli vain 364. '
      + 'Ruskohiilikaivos avattiin vuonna 1875, ja se toimii yhä: siellä on louhittu yli '
      + '260 miljoonaa tonnia hiiltä. Nykyinen kaupunkikeskus suunniteltiin ja '
      + 'rakennettiin 1950-luvulla, ja se avattiin virallisesti 20. syyskuuta 1959.',
    lahde: 'en-Wikipedia "Velenje", johdanto-osa ja osio "Modern history" (tarkistettu '
      + '19.9.2026).',
  },
];
