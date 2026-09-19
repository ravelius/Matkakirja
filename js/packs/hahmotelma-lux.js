/*
 * LUXEMBURGIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin, Unkarin, Tanskan, Irlannin, Kroatian, Bulgarian ja Slovakian
 * jälkeen Luxemburg.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä edellisten maiden pakat: jokaisella nostolla on
 * valmis sisältö — `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Luxemburg on suurherttuakunta
 * Hollannin kuninkaan (Vilhelm III) henkilöunionissa; Lontoon sopimus 1867
 * julisti maan puolueettomaksi ja määräsi Luxemburgin linnoituksen
 * purettavaksi (purku kestää 16 vuotta, käynnissä 1873); rautateollisuus
 * alkaa Eschissä 1850-luvun malmilöydöstä; Schengenin sopimus 1985 on
 * vasta tulevaisuudessa. Kohteita käsitellään ilman Ardennien taistelun
 * 1944 aiheita (Wiltz, Clervaux, Diekirch, Vianden): teksti pysyy
 * linnoissa, luostareissa ja kaupungeissa. Luxemburgissa ei ole
 * pelikaupunkia eikä nykyisiä LUX-nostoja: kaupunkikohteet (Luxembourgin
 * kaupunki, Esch, Diekirch) ovat siksi sallittuja. Vuoden 1873 jälkeiset
 * asiat (Clervaux'n luostari 1909–10, Beaufortin kunnostus 1893, Viandenin
 * kunnostus 1977–90, Schengenin museo 2010) ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `lux-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/lux/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: Luxemburgissa ei ole
 * pelikaupunkia eikä muita nostoja, joten rivit liitetään
 * KOHDE_MAAT.LUX:iin js/fokuskohteet.js:ssä. Luxemburg on laudalla vain
 * noin 26 × 28 yksikköä, joten nostot on harvennettu keskenään vähintään
 * 3,1 lautayksikön päähän (tarvittaessa nimiölimitys ratkaistaan
 * `nimio`-kentällä). `lahi: true` on sama lähizoomiportti kuin Ranskan
 * hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen (Clervaux'n piste on luostarin artikkelista).
 * Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Luxemburgin fokuslehden rajaukseen
 * (`osuuLehteen`). Vianden, Schengen ja Grevenmacher ovat pelin karkean
 * maailmankartan LUX-renkaan hieman ULKOPUOLELLA (0,2–0,4 lautayksikköä),
 * koska rengas on yksinkertaistettu; koordinaatit ovat Wikipedian
 * todelliset. Wiltz on 6,8 lautayksikköä Belgian Bastogne-nostosta (eri
 * maa, hyväksytty).
 */

/** Luxemburgin hahmotelmanostot: sisällölliset kohteet, ei pelikaupunkia. */
export const HAHMOTELMA_LUX = [
  {
    id: 'hahmotelma-clervaux',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-clervaux-dda676c5.jpg',
      lyhyt: 'Clervaux\'n luostarin kirkko ja kahdeksankulmainen kellotorni portin takaa.',
      selite: 'Clervaux\'n benediktiiniluostarin kivinen kellotorni, kirkko ja luostarirakennus kohoavat tiilikattoisen porttiholvin ja kivimuurin takana. Torni on rakennettu romaaniseen tyyliin.',
      lahde: 'Valokuva: MMFE, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'MMFE',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Abbaye_de_Clervaux_01.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-clervaux-acfacfac.jpg',
        lyhyt: 'Clervaux\'n linnan valkoiset pyöreät tornit kukkulan rinteellä.',
        selite: 'Clervaux\'n keskiaikainen linna näkyy alhaalta päin: valkoiset seinät, kartiokattoiset pyöreät tornit ja liuskekatot kohoavat vehreän rinteen yllä.',
        lahde: 'Valokuva: Asurnipal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Asurnipal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg-Clervaux-Castle-03ASD.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Clervaux',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuinka suuren osan Luxemburgin pinta-alasta Ösling kattaa?',
      'Minä vuonna Clervaux’n kaupungin vaakuna myönnettiin?',
    ],
    korostukset: ['Ösling|Öslingin'],
    nappi: 'Ösling-kukkuloiden linnakaupunki; benediktiiniluostari rakennetaan vasta 1900-luvun alussa',
    // 6.0293 E / 50.0544 N — en-Wikipedia "Clervaux Abbey"
    laudat: {
      maailmankartta: { x: 6034.3, y: 1387.8 },
      europe: { x: 327, y: 577.2 },
    },
    teksti: 'Clervaux on kaupunki Pohjois-Luxemburgissa Éislekin eli Öslingin alueella, joka '
      + 'kattaa 32 prosenttia maasta ja jossa on lähes kaikki Luxemburgin korkeimmat '
      + 'kukkulat, laajoja lehtimetsiä ja kauniita jokilaaksoja. Kylä syntyi Clervaux’n '
      + 'linnan ympärille: linnan vanhimmat osat ovat 1100-luvulta, ja niiden rakennutti '
      + 'Sponheimin kreivi Gerard, Viandenin kreivin veli, kun taas suuri palatsi ja pyöreät '
      + 'tornit ovat luultavasti vuoden 1400 tienoilta. Kaupungin vaakuna, jossa on kolme '
      + 'mustarastasta kultaisella pohjalla, myönnettiin vuonna 1896. Vuosina 1909–1910 '
      + 'kaupunkiin rakennettiin uusromaaninen Pyhän Mauritiuksen ja Pyhän Maurin '
      + 'benediktiiniluostari, jonka munkit olivat joutuneet lähtemään Ranskasta vuonna 1901. '
      + 'Clervaux’n linnassa on nykyään Edward Steichenin kokoaman valokuvanäyttelyn Ihmisen '
      + 'perhe pysyvä esillepano.',
    lahde: 'en-Wikipedia "Clervaux Abbey", "Clervaux" ja "Éislek", johdanto-osat ja osiot '
      + '"History" ja "Sights" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-wiltz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-wiltz-892d0d30.jpg',
      lyhyt: 'Wiltzin linnan vaalea julkisivu, liuskekatot ja punaruskeat ikkunakehykset.',
      selite: 'Wiltzin linnan päärakennus edestä katsottuna: vaalea rappaus, punertavat hiekkakiviset ikkunakehykset ja jyrkät liuskekatot.',
      lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Zinneke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wiltz_castle_2012-07.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-wiltz-f656972a.jpg',
        lyhyt: 'Vanha piirros Wiltzin linnasta rinteen laella.',
        selite: 'Piirroksessa Wiltzin linna kohoaa metsäisen kukkulan laella, tornirakennus vasemmalla ja piippuiset päärakennukset oikealla.',
        lahde: 'Piirros: Nicolas Liez, Wikimedia Commons (public domain).',
        tekija: 'Nicolas Liez',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:N-Liez_vue-du-chateau-de-wiltz.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Wiltz',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna Wiltzin linna valmistui?',
      'Millä alalla Wiltzin teollistuminen kiihtyi 1800-luvun lopulla?',
    ],
    korostukset: ['linna|linnansa'],
    nappi: 'Wiltzin kreivien linna, jossa toimii tyttökoulu; nahkateollisuus kasvaa',
    // 5.9325 E / 49.9661 N — en-Wikipedia "Wiltz"
    laudat: {
      maailmankartta: { x: 6031.1, y: 1391.7 },
      europe: { x: 325.1, y: 579.5 },
    },
    teksti: 'Wiltz on kaupunki Luoteis-Luxemburgissa Wiltz-joen rannalla; asukkaita on 6 145. '
      + 'Nimi tulee kelttiläisestä sanasta, joka tarkoittaa puron varrella, ja paikka '
      + 'mainitaan ensi kerran vuonna 764; kaupunkioikeudet se sai vuonna 1240. Wiltzin '
      + 'kreivit kuuluvat Luxemburgin vanhimpiin, ja kaupungin tunnetuin nähtävyys on heidän '
      + 'Wiltzin linnansa, joka valmistui vuonna 1727 ja jonka viimeinen kreivi kuoli 1793. '
      + 'Linna oli yksityinen tyttökoulu vuosina 1851–1950 ja sen jälkeen vanhainkoti. '
      + '1800-luvun lopulla ja 1900-luvun alussa Wiltzin teollistumista vauhditti '
      + 'nahkateollisuus, erityisesti IDÉAL-parkitsemo.',
    lahde: 'en-Wikipedia "Wiltz", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vianden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-vianden-e2d6759b.jpg',
      lyhyt: 'Viandenin linna kohoaa metsäisen rinteen laella.',
      selite: 'Viandenin linnan harmaat kivimuurit, liuskekatot, pyöreät tornit ja kapea kirkontornin kaltainen huippu näkyvät metsäisen kukkulan päällä.',
      lahde: 'Valokuva: Jeff Croisé, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jeff Croisé',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Vianden,_Luxemburg.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-vianden-e9b6f4d7.jpg',
        lyhyt: 'Viandenin linnan kappelin holvikaaret ja punaharmaat pylväät.',
        selite: 'Linnan kappelin kattoholvin punertavat kaaret ja harmaat, keltareunaiset pylväät nousevat kohti kattoa.',
        lahde: 'Valokuva: John Samuel, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'John Samuel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chapel_of_Vianden_castle_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-vianden-0b88dac4.jpg',
        lyhyt: 'Victor Hugon talo Viandenissa: vaalea julkisivu ja liuskekatto.',
        selite: 'Vaalea kolmikerroksinen talo punaruskeine hiekkakivikehyksineen ja liuskekattoineen. Ranskalainen kirjailija Victor Hugo asui talossa kesällä 1871.',
        lahde: 'Valokuva: Michail Jungierek (Michail at de.wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Michail Jungierek (Michail at de.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vianden_Viktor_Hugo_Haus.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Viandenin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka myi Viandenin linnan vuonna 1820?',
      'Kuinka kauan Victor Hugo asui Viandenissa vuonna 1871?',
    ],
    korostukset: ['rauniot|raunioina'],
    nappi: 'Suuri linna raunioina: se myytiin ja purettiin pala palalta vuonna 1820; Victor Hugo asui kaupungissa 1871',
    // 6.20222222 E / 49.935 N — en-Wikipedia "Vianden Castle"
    laudat: {
      maailmankartta: { x: 6040.1, y: 1393 },
      europe: { x: 330.3, y: 580.3 },
    },
    teksti: 'Viandenin linna Luxemburgin pohjoisosassa on yksi Reinin länsipuolen suurimmista '
      + 'linnoitetuista linnoista. Se seisoo kallionkielekkeellä 310 metrin korkeudessa '
      + 'Our-joen yläpuolella, ja linna rakennettiin romaaniseen tyyliin 1000–1300-luvuilla, '
      + 'minkä jälkeen siihen lisättiin goottilaisia piirteitä; 1600-luvulla sen viereen '
      + 'rakennettiin renessanssityylinen Nassaun kartano. Vuonna 1820 kuningas Vilhelm I myi '
      + 'linnan Wenzel Costerille, joka alkoi purkaa sitä ja myi katon tiilet, seinäpaneelit, '
      + 'ovet ja ikkunat pala palalta, minkä jälkeen linna oli raunioina. Vuonna 1827 '
      + 'kuningas osti raunion takaisin, ja vuonna 1851 Alankomaiden prinssi Henrik '
      + 'rakennutti kappelin uudelleen omalla kustannuksellaan; Victor Hugo vietti '
      + 'Viandenissa kolme kuukautta vuonna 1871. Linna on sittemmin kunnostettu kokonaan, ja '
      + 'työt valmistuivat vuonna 1990.',
    lahde: 'en-Wikipedia "Vianden Castle" ja "Vianden", johdanto-osat ja osiot "History" ja '
      + '"Restoration" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna kuningas Vilhelm I myi Viandenin linnan?',
      vaihtoehdot: [
        '1720',
        '1770',
        '1820',
        '1870',
      ],
      oikea: 2,
      fakta: 'Ostaja alkoi purkaa linnaa ja myi sen osat pala palalta.',
    },
  },
  {
    id: 'hahmotelma-echternach',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-echternach-fa280b60.jpg',
      lyhyt: 'Pyhän Willibrordin basilikan tornit ja hiekkakivipäädyt Echternachissa.',
      selite: 'Echternachin Pyhän Willibrordin basilikan neljä kartiokattoista tornia ja kirkon pääty kohoavat kivimuurin takaa. Basilika kuuluu entiseen benediktiiniluostariin.',
      lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Marc Ryckaert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Echternach_St_Willibrord_Basilika_R01.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-echternach-0d8d9b69.jpg',
        lyhyt: 'Dënzelt-rakennus Echternachin torilla: holvikaaret, patsaat ja tornikoristeet.',
        selite: 'Entinen oikeustalo Dënzelt seisoo Marktin torin laidalla. Alakerrassa on neljä suippokaarta, seinillä kivipatsaita ja katolla kaksi liuskakattoista kulmatornia.',
        lahde: 'Valokuva: Heinrich Stürzl, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Heinrich Stürzl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Echternach_Denzelt_von_S.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-echternach-6986fcce.jpg',
        lyhyt: 'Basilikan kuori: värilliset lasimaalaukset ja alttari.',
        selite: 'Basilikan sisällä romaaniset kaaret kehystävät kuorin kolmea lasimaalausikkunaa ja alttaria.',
        lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Marc Ryckaert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Echternach_St_Willibrord_Basilika_R05.JPG',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Echternach',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Pyhä Willibrord perusti Echternachin luostarin?',
      'Minä päivänä Echternachin hyppelykulkue järjestetään?',
    ],
    korostukset: ['hyppelykulkue|hyppelykulkue'],
    nappi: 'Luxemburgin vanhin kaupunki; luostarissa toimii posliinitehdas',
    // 6.4216667 E / 49.81166667 N — en-Wikipedia "Echternach"
    laudat: {
      maailmankartta: { x: 6047.4, y: 1398.4 },
      europe: { x: 334.5, y: 583.6 },
    },
    teksti: 'Echternach on Itä-Luxemburgin kaupunki lähellä Saksan rajaa, ja se on Luxemburgin '
      + 'vanhin kaupunki. Se kasvoi Echternachin luostarin ympärille, jonka englantilainen '
      + 'munkki Pyhä Willibrord perusti vuonna 698; hänen kunniakseen järjestetään joka vuosi '
      + 'helluntaitiistaina hyppelykulkue. Romaaninen basilika, jonka krypta sisältää '
      + 'Willibrordin haudan, on säilynyt luostarista, ja luostarin kirjasto ja kirjoittamo '
      + 'olivat tunnettuja koko Euroopassa; kaupunki sai kaupunkioikeudet vuonna 1236. '
      + 'Luostari uudistettiin barokkityyliin vuonna 1737, mutta vuonna 1794 kirkko '
      + 'ryöstettiin ja luostari muutettiin posliinitehtaaksi, ja munkit hajotettiin 1797; '
      + 'kaupunki taantui, kunnes rautatie toi mukanaan uutta elämää ja matkailijoita. Seutu '
      + 'tunnetaan Pikku-Sveitsinä eli Müllerthalina: se kattaa seitsemän prosenttia maasta '
      + 'ja on rosoista, metsäistä ja luolien halkomaa, ja sen ainoa keskikokoinen asutus on '
      + 'Echternach.',
    lahde: 'en-Wikipedia "Echternach" ja "Little Switzerland (Luxembourg)", johdanto-osat ja '
      + 'osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Echternachin luostarin vuonna 698?',
      vaihtoehdot: [
        'Willibrord',
        'Kaarle Suuri',
        'Benedictus',
        'Pippin Lyhyt',
      ],
      oikea: 0,
      fakta: 'Hyppelykulkue järjestetään Willibrordin kunniaksi helluntaitiistaina.',
    },
  },
  {
    id: 'hahmotelma-beaufort',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-beaufort-2b8dc34a.jpg',
      lyhyt: 'Beaufortin linnan keskiaikaiset rauniot, pyöreät tornit ja muurit nurmikentän takana.',
      selite: 'Beaufortin vanhan linnan hiekkakivirauniot: pyöreät tornit, ikkunoin rei\'itetty päärakennus ja oikealla erillinen raunioitunut torni. Ympärillä on vehreä metsäinen Müllerthalin seutu.',
      lahde: 'Valokuva: Marc Ryckaert, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Marc Ryckaert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Beaufort_Castle_Luxembourg_R02.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-beaufort-8a16a236.jpg',
        lyhyt: 'Beaufortin renessanssilinna kohoaa rinteen päällä sinistä taivasta vasten.',
        selite: 'Beaufortin uusi renessanssilinna rakennettiin 1640-luvulla maaherra Jean de Beckille. Hiekkakivinen päärakennus ja nelikulmainen liuskekattoinen torni näkyvät rinteen alta.',
        lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0 lu).',
        tekija: 'Zinneke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:17th_century_castle_Beaufort_Luxembourg_2013-08_--2.JPG',
        lisenssi: 'CC BY-SA 3.0 lu',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/lu/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-beaufort-62a4bdf2.jpg',
        lyhyt: 'Vanha piirros Beaufortin linnan raunioista ja renessanssilinnasta.',
        selite: 'Vanhassa piirroksessa Beaufortin linnan pyöreät tornit ja muurit kohoavat metsäisessä maisemassa, vasemmalla renessanssilinna. Etualalla kulkee muutama hahmo.',
        lahde: 'Piirros: Nicolas Liez, Wikimedia Commons (public domain).',
        tekija: 'Nicolas Liez',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:F-Clement_N-Liez_ruines-du-chateau-de-beaufort.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Beaufortin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna valtio julisti linnan kansallismuistomerkiksi?',
      'Mihin linnan rauniota käytettiin 1800-luvun alussa?',
    ],
    korostukset: ['kansallismuistomerkki|kansallismuistomerkiksi'],
    nappi: 'Müllerthalin linnan rauniot: valtio julisti sen kansallismuistomerkiksi vuonna 1850',
    // 6.28555556 E / 49.83388889 N — en-Wikipedia "Beaufort Castle, Luxembourg"
    laudat: {
      maailmankartta: { x: 6042.9, y: 1397.4 },
      europe: { x: 331.9, y: 583 },
    },
    teksti: 'Beaufortin linna Itä-Luxemburgissa koostuu keskiaikaisen linnoituksen raunioista ja '
      + '1600-luvun asuinrakennuksesta. Linna alkoi luultavasti 1000-luvulla pienenä '
      + 'nelikulmaisena linnakkeena suuren kallion päällä, ja ensimmäinen tunnettu herra, '
      + 'Wauthier de Wiltz et Beaufort, mainitaan vuonna 1192. Kuvernööri Johann Baron von '
      + 'Beck osti suurimman osan omaisuudesta vuonna 1639 ja aloitti uuden asuinrakennuksen '
      + 'rakentamisen vuonna 1643, ja rakennus valmistui 1649. Linna hylättiin ja se '
      + 'rappeutui, ja 1800-luvun alussa sitä käytettiin jopa louhoksena; valtio julisti sen '
      + 'kansallismuistomerkiksi vuonna 1850. Uusi omistaja Henri Even kunnosti '
      + 'asuinrakennuksen vuonna 1893, ja Beaufort kuuluu Pikku-Sveitsin eli Müllerthalin '
      + 'alueeseen.',
    lahde: 'en-Wikipedia "Beaufort Castle, Luxembourg", johdanto-osa ja osio "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bourscheid',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-bourscheid-edd26428.jpg',
      lyhyt: 'Bourscheidin linna kohoaa metsäisen rinteen keskellä.',
      selite: 'Linnan tornit ja muurit erottuvat tiheän lehti- ja havumetsän keskeltä Luxemburgin pohjoisosassa.',
      lahde: 'Valokuva: Photodudau, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Photodudau',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bourscheid_Castle_in_Luxembourg.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-bourscheid-92d00de3.jpg',
        lyhyt: 'Bourscheidin linnan pyöreä muurinosa ja suippokattoiset tornit.',
        selite: 'Paksut kiviseinät ja kartiomaiset tornikatot nousevat nurmikkoisen kalliopohjan päälle; edustalla liehuvat liput.',
        lahde: 'Valokuva: LBM1948, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'LBM1948',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bourscheid,_castillo_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-bourscheid-782abf70.jpg',
        lyhyt: 'Näkymä Bourscheidin linnan tornista metsäiseen laaksoon.',
        selite: 'Suippokattoinen kiviseinäinen torni ja muurin harjanne; taustalla kumpuilevat metsärinteet ja laakson niityt.',
        lahde: 'Valokuva: CV1958 (Colin Viney), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'CV1958 (Colin Viney)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_Bourscheid_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bourscheidin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka korkealla Sûre-joen yläpuolella Bourscheidin linna on?',
      'Kuinka monta vartiotornia linnaa ympäröivässä muurissa on?',
    ],
    korostukset: ['Sûre|Sûre-joen'],
    nappi: 'Sûre-joen yllä kohoava linna, jonka kappeli romahtaa ja jonka purkamisesta puhutaan',
    // 6.07972222 E / 49.90527778 N — en-Wikipedia "Bourscheid Castle"
    laudat: {
      maailmankartta: { x: 6036, y: 1394.3 },
      europe: { x: 327.9, y: 581.1 },
    },
    teksti: 'Bourscheidin linna sijaitsee Koillis-Luxemburgissa Bourscheidin kylän lähellä. '
      + 'Keskiaikaisen linnan paikalla on jäänteitä roomalaisen ajan rakennelmista, ja se '
      + 'kohoaa noin 150 metriä Sûre-joen yläpuolelle; sitä ympäröi pyöreä muuri, jossa on 11 '
      + 'vartiotornia. Linna mainitaan ensi kerran vuonna 1095, vaikka se näyttää rakennetun '
      + 'noin vuonna 1000 aiempien perustusten päälle, ja sitä laajennettiin useita kertoja: '
      + 'ulkomuuri on vuodelta 1350, Stolzembourgin talo vuodelta 1384 ja piha vuodelta 1477. '
      + 'Vuodesta 1626 linnan omisti Metternichin suku, kunnes Ranskan vallankumous päätti '
      + 'sen feodaalivallan; 1800-luvulla kappelin romahdettua puhuttiin linnan purkamisesta, '
      + 'mutta vuonna 1936 se suojeltiin ja vuonna 1972 valtio osti sen.',
    lahde: 'en-Wikipedia "Bourscheid Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-luxembourg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-luxembourg-b0bf8a6f.jpg',
      lyhyt: 'Luxemburgin Grundin alakaupunki ja Alzette-joki Cornichen näkötieltä.',
      selite: 'Alzette virtaa vanhojen muurien, kallion ja alakaupungin talojen ohi; vasemmalla kallion päällä on linnoituksen pyöreä torni.',
      lahde: 'Valokuva: Cayambe, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Cayambe',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_City_-_Grund_from_Corniche.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-luxembourg-d27facc9.jpg',
        lyhyt: 'Adolphen silta kaartuu Pétrussen laakson yli.',
        selite: 'Kivinen kaarisilta rakennettiin vuosina 1900–1903 ja yhdistää vanhankaupungin ja asema-alueen; sillan takana näkyvät kaupungin talot ja katedraalin tornit.',
        lahde: 'Valokuva: Cayambe, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Cayambe',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_Adolphe_Bridge_over_Petrusse_valley.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-luxembourg-36d63310.jpg',
        lyhyt: 'Luxemburgin alakaupunki ja vanhakaupunki Bockin kasemattien kalliolta.',
        selite: 'Oikealla on louhikkoinen hiekkakivijyrkänne, vasemmalla suippotornillinen kirkko ja taustalla vanhankaupungin talot ja kaksi suippotornia.',
        lahde: 'Valokuva: P. Hughes, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'P. Hughes',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_City_from_the_Bock_Casements.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Luxembourgin kaupunki',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka hankki Lucilinburhucin linnakkeen vuonna 963?',
      'Kuinka pitkään linnoituksen purkaminen kesti?',
    ],
    korostukset: ['Lontoon sopimus|Lontoon sopimus'],
    nappi: 'Pohjoisen Gibraltar: Lontoon sopimus vuonna 1867 määrää linnoituksen purettavaksi',
    // 6.13 E / 49.61138889 N — en-Wikipedia "Luxembourg City"
    laudat: {
      maailmankartta: { x: 6037.7, y: 1407.1 },
      europe: { x: 328.9, y: 588.8 },
    },
    teksti: 'Luxembourgin kaupunki on Luxemburgin pääkaupunki Alzette- ja Pétrusse-jokien '
      + 'yhtymäkohdassa maan eteläosassa. Kaupunki syntyi, kun Ardennien Siegfried I hankki '
      + 'vuonna 963 Lucilinburhuc-linnakkeen ja alkoi rakentaa linnaa Bock-kalliolle; asutus '
      + 'kasvoi Kalatorin ympärille, ja kaupunki oli sijaintinsa vuoksi vuosisatojen ajan '
      + 'strategisesti tärkeä. Ranskalainen sotilasinsinööri Lazare Carnot kutsui sen '
      + 'linnoitusta maailman parhaaksi linnoitukseksi Gibraltaria lukuun ottamatta, mistä '
      + 'kaupunki sai lempinimen Pohjoisen Gibraltar. Vuoden 1867 Lontoon sopimus vaati '
      + 'Luxemburgia purkamaan kaupungin linnoitukset: purku, jonka piti avata kaupunki, '
      + 'kesti kuusitoista vuotta, maksoi 1,5 miljoonaa kultafrangia ja tuhosi yli 24 '
      + 'kilometriä maanalaisia puolustusrakenteita, ja Preussin varuskunta vetäytyi. Joet '
      + 'ovat kaivaneet 70 metriä syviä rotkoja, joita ylittävät monet sillat, esimerkiksi '
      + 'Adolphe-silta.',
    lahde: 'en-Wikipedia "Luxembourg City", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Lontoon sopimus määräsi linnoituksen purettavaksi?',
      vaihtoehdot: [
        '1817',
        '1867',
        '1887',
        '1847',
      ],
      oikea: 1,
      fakta: 'Purkutyö kesti kuusitoista vuotta.',
    },
  },
  {
    id: 'hahmotelma-larochette',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-larochette-21cff9e6.jpg',
      lyhyt: 'Larochetten linnan rauniot kalliolla kaupungin yläpuolella.',
      selite: 'Kalliolla seisovat korkea kivitorni ja muurinjäänteet; edustalla on vaaleaseinäinen liuskekattoinen Roeben linna.',
      lahde: 'Valokuva: LBM1948, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'LBM1948',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Larochette_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-larochette-1a3fa9dd.jpg',
        lyhyt: 'Larochetten kaupunki ja kirkko linnanraunioilta katsottuna.',
        selite: 'Etualalla on linnan muurinjäänteitä, taustalla kaupungin kattoja, kirkontorni ja metsäisiä kukkuloita.',
        lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zinneke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Larochette_castle_and_town_2016-07.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-larochette-64ebd12a.jpg',
        lyhyt: 'Larochetten linnan rauniot ylhäältä katsottuna.',
        selite: 'Kivimuurien jäänteet ja sisäpihat kalliolla, oikealla liuskekattoinen linnarakennus.',
        lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zinneke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Larochette_castle_ruins_2016-07.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Larochette',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä joella Larochette sijaitsee?',
      'Millä alalla Larochette oli teollinen keskus 1700-luvun lopulta 1930-luvulle?',
    ],
    korostukset: ['Larochetten linna|Larochetten linna'],
    nappi: 'Valkoisen Ernzin laakson linnanrauniot ja kaupungin kutomot',
    // 6.219444 E / 49.783611 N — en-Wikipedia "Larochette"
    laudat: {
      maailmankartta: { x: 6040.6, y: 1399.6 },
      europe: { x: 330.6, y: 584.3 },
    },
    teksti: 'Larochette, luxemburgiksi Fiels, on kaupunki Keski-Luxemburgissa Valkoisen Ernz-joen '
      + 'laaksossa, ja sitä hallitsee osittain raunioitunut Larochetten linna. Linna, jonka '
      + 'varhaisimmat maininnat ovat 1000-luvun lopulta ja 1100-luvulta, kohoaa '
      + 'kallionkielekkeellä noin 150 metriä joen yläpuolella; sen rakennuttivat Larochetten '
      + 'herrat, Luxemburgin kreivien lippumiehet. Suku laajeni, ja linnan viereen '
      + 'rakennettiin viisi erillistä kartanoa, joista Homburgin kartano (1350) ja Créhangen '
      + 'kartano (1385) on kunnostettu; linna tuhoutui tulipalossa 1500-luvun lopulla. '
      + 'Kaupunki oli 1700-luvun lopulta 1930-luvulle kutomoteollisuuden keskus, ja linnan '
      + 'kaivosta kerrotaan legendoja.',
    lahde: 'en-Wikipedia "Larochette" ja "Larochette Castle", johdanto-osat ja osiot "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-useldange',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-useldange-18cd3604.jpg',
      lyhyt: 'Useldangen linnan rauniot: pyöreä torni, nelikulmainen torni ja muurinjäänteet.',
      selite: 'Nurmikkokukkulan takana kohoavat linnan tornit ja ikkunaaukkoinen muuri; edustalla on patsas ja oikealla kaupungin taloja.',
      lahde: 'Valokuva: Philip Wenger, Wikimedia Commons (CC BY-SA 3.0 LU).',
      tekija: 'Philip Wenger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chateau_d\'Useldange,_Useldange,_Luxembourg.jpg',
      lisenssi: 'CC BY-SA 3.0 LU',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/lu/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-useldange-def7ca83.jpg',
        lyhyt: 'Useldangen linnan pyöreä ja nelikulmainen torni muurin takaa.',
        selite: 'Kivimuurissa on kaarevia ikkunaaukkoja, ja muurin vieressä kasvaa punamarjainen pihlaja.',
        lahde: 'Valokuva: Cédric Bousmanne, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Cédric Bousmanne',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Useldange_castle_-_50340635346.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Useldangen linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka korkea Useldangen linnan päätorni on?',
      'Minä vuonna linnan kappeli tuhoutui?',
    ],
    korostukset: ['päätorni|päätorni'],
    nappi: 'Attert-joen kukkulan linna, jota ei ole enää asuttu',
    // 5.9803 E / 49.76825 N — en-Wikipedia "Useldange Castle"
    laudat: {
      maailmankartta: { x: 6032.7, y: 1400.3 },
      europe: { x: 326, y: 584.7 },
    },
    teksti: 'Useldangen linna on keskiaikainen, nykyään pääosin raunioitunut linna Useldangen '
      + 'kylässä Länsi-Luxemburgissa. Se seisoo pienellä kukkulalla kylän keskustassa '
      + 'Attert-joen yllä, ja rauniot antavat hyvän kuvan keskiaikaisesta linnasta, etenkin '
      + 'ulkomuuri ja yksi pyöreistä torneista; keskellä kohoaa 25 metriä korkea päätorni. '
      + 'Linna näyttää olevan 1100-luvulta, jolloin Useldangen herrakunta perustettiin. '
      + 'Burgundin ja Ranskan välisen sodan seurauksena linna ja sen kappeli vaurioituivat '
      + 'pahoin, ja linna rappeutui; kappeli tuhoutui vuonna 1903. Vuonna 1924 Yhdysvalloista '
      + 'palannut Emma Kuhn osti raunion, ja linnan palatsin raunioiden päälle rakennettiin '
      + 'moderni rakennus, joka toimii nykyään kaupungintalona.',
    lahde: 'en-Wikipedia "Useldange Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-schengen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-schengen-4c58311a.jpg',
      lyhyt: 'Schengenin kylä Moselin rinteillä syksyisten viinipeltojen keskellä.',
      selite: 'Kellertävät viinipellot peittävät rinteen; kylän talojen seassa erottuvat kirkontorni ja kartiokattoinen torni.',
      lahde: 'Valokuva: Dr. Kerbusch, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dr. Kerbusch',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schengen_Autumn_in_the_Vineyards.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-schengen-0906959e.jpg',
        lyhyt: 'Schengenin kylä ja Moselin laakso viinipeltojen reunalta.',
        selite: 'Etualalla on viinipeltoa ja kylän kattoja, keskellä joki ja silta sekä taustalla metsäisiä kukkuloita kolmen valtion rajapisteen tuntumassa.',
        lahde: 'Valokuva: Cayambe, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Cayambe',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_Schengen_from_Markusberg_a.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-schengen-2089763b.jpg',
        lyhyt: 'Schengenin linna ja sen muotoiltu puutarha.',
        selite: 'Vaaleankeltainen linnarakennus ja pyöreä torni; edustalla leikattuja pensaskuvioita.',
        lahde: 'Valokuva: Cornischong, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Cornischong',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schengener_Schlass.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Schengen',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Schengenin sopimus allekirjoitettiin?',
      'Minkä kolmen maan rajat kohtaavat kunnan alueella?',
    ],
    korostukset: ['Schengenin sopimus|Schengenin sopimus'],
    nappi: 'Moselin viinikylä kolmen maan rajalla; sopimus tehdään siellä vasta vuonna 1985',
    // 6.35888889 E / 49.46944444 N — en-Wikipedia "Schengen, Luxembourg"
    laudat: {
      maailmankartta: { x: 6045.3, y: 1413.2 },
      europe: { x: 333.3, y: 592.6 },
    },
    teksti: 'Schengen on viininviljelykylä ja kunta Kaakkois-Luxemburgissa Moselin länsirannalla. '
      + 'Kunnan rajalla on Saksan, Ranskan ja Luxemburgin rajojen kolmenkohta. Kunnan nimi '
      + 'vaihdettiin vuonna 2006 hyödyntämään Schengenin nimen tunnettuutta sen jälkeen, kun '
      + 'Schengenin sopimus allekirjoitettiin siellä vuonna 1985; kylässä itsessään oli 704 '
      + 'asukasta vuonna 2025. Schengenin linna on vuodelta 1390, mutta se rakennettiin '
      + '1800-luvulla lähes kokonaan uudelleen. Vuonna 2010 kylään avattiin Euroopan museo, '
      + 'joka esittelee Schengenin sopimusten historiaa ja merkitystä.',
    lahde: 'en-Wikipedia "Schengen, Luxembourg", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-diekirch',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-diekirch-863e0630.jpg',
      lyhyt: 'Diekirchin Pyhän Laurentiuksen kaksitorninen kirkko aukion laidalla.',
      selite: 'Punertavasta hiekkakivestä rakennetun kirkon kaksi kapeaa huippua nousevat metsäisen rinteen edestä. Aukiolla liehuu Luxemburgin lippuja.',
      lahde: 'Valokuva: Michielverbeek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michielverbeek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Diekirch,_église_Décanale_Saint_Laurent_foto3_2014-06-09_13.49.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-diekirch-c98118d8.jpg',
        lyhyt: 'Diekirchin vanha Pyhän Laurentiuksen kirkko kapean kujan päässä.',
        selite: 'Valkoiseksi rapattu vanha kirkko kohoaa kujan päässä terävä liuskekattoinen torni edellä. Tornin huipulla on pieni metallinen viiri.',
        lahde: 'Valokuva: Palauenc05, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palauenc05',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Diekirch_Old_Laurentius.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-diekirch-1f9858f2.jpg',
        lyhyt: 'Sûre-joki virtaa Diekirchin halki aamuhämärässä.',
        selite: 'Joen rannalla kasvaa puita ja puistopolku kulkee talojen ohi. Taustalla kohoaa metsäinen rinne.',
        lahde: 'Valokuva: frozgard, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'frozgard',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Sauer_in_Diekirch_early_in_the_morning.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Diekirch',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Diekirch tarkoittaa?',
      'Kuka linnoitti kaupungin 1300-luvulla?',
    ],
    korostukset: ['panimo|panimo'],
    nappi: 'Sûren vanha muurikaupunki; ranskalaiset ovat purkaneet muurit 1800-luvun alussa',
    // 6.1567 E / 49.8681 N — en-Wikipedia "Diekirch"
    laudat: {
      maailmankartta: { x: 6038.6, y: 1395.9 },
      europe: { x: 329.4, y: 582.1 },
    },
    teksti: 'Diekirch on kaupunki Koillis-Luxemburgissa Sauer-joen eli Sûren rannalla; nimi tulee '
      + 'sanoista Diet-Kirch eli kansan kirkko. Tarinan mukaan Kaarle Suuri asutti alueelle '
      + 'sakseja 700-luvun lopulla, ja heidän kääntämisekseen kristinuskoon rakennettiin '
      + 'kirkko, joka antoi asutukselle nimen. 1300-luvulla Böömin kuningas ja Luxemburgin '
      + 'kreivi Juhana Sokea linnoitti kaupungin muurilla ja vallihaudalla, ja se säilyi '
      + 'jokseenkin linnoitettuna 1800-luvun alkuun, jolloin ranskalaiset purkivat muurit ja '
      + 'korvasivat ne puuistutuksilla. Kaivauksissa on todettu, että Pyhän Laurentiuksen '
      + 'kirkko on roomalainen rakennus, ja kaupungissa sijaitsi suuri roomalainen huvila, '
      + 'joka hylättiin 400-luvun alussa. Diekirchissä on kansallisesti merkittävä, kaupungin '
      + 'nimeä kantava panimo.',
    lahde: 'en-Wikipedia "Diekirch", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-remich',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-remich-507d2fbd.jpg',
      lyhyt: 'Remichin ranta ja Esplanade-hotelli Moselin tyynen veden takana.',
      selite: 'Moselin vastarannalla kohoavat liuskekattoiset talot ja hotelli Esplanade. Vasemmalla kaartuu joen ylittävä silta.',
      lahde: 'Valokuva: Henk Monster, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Henk Monster',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Remich_with_hotel_Esplanade_along_the_Mosel_river_in_the_morning_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-remich-8eefaa8e.jpg',
        lyhyt: 'Bacchus-suihkukaivo Remichin Esplanadella Moselin rannalla.',
        selite: 'Tynnyrillä istuvaa Bacchusta esittävä patsas seisoo suihkulähteen altaassa. Taustalla jokivarren puut hehkuvat syysväreissä.',
        lahde: 'Valokuva: Denise Hastert, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Denise Hastert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Esplanade,Remich.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Remich',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minä vuonna Remichiin rakennettiin ensimmäinen silta Moselin yli?',
      'Kuka purki kaupungin linnoitukset vuonna 1687?',
    ],
    korostukset: ['viininviljely|viininviljely'],
    nappi: 'Moselin viinikaupunki; ensimmäinen silta joen yli on rakennettu vasta seitsemän vuotta sitten (1866)',
    // 6.3667 E / 49.5444 N — en-Wikipedia "Remich"
    laudat: {
      maailmankartta: { x: 6045.6, y: 1410 },
      europe: { x: 333.4, y: 590.6 },
    },
    teksti: 'Remich on Kaakkois-Luxemburgin kaupunki Moselin vasemmalla rannalla; asukkaita on 4 '
      + '101, ja se on pinta-alaltaan Luxemburgin pienin kunta. Moselin laaksossa '
      + 'viininviljely hallitsee, ja Remich on yksi sen kauneimmista ja matkailijoiden '
      + 'vilkkaimmin käyttämistä pikkukaupungeista. Roomalaisen Remacumin asutuksesta '
      + 'kehittyi Remich; kaupungin keskiaikaisten linnoitusten jäännöksiä, kuten Pyhän '
      + 'Nikolauksen portti, on yhä näkyvissä, ja Ludvig XIV:n armeija purki linnoitukset '
      + 'vuonna 1687. Kuningas Vilhelm II vieraili kaupungissa vuonna 1844 ja hänen poikansa '
      + 'Vilhelm III vuonna 1855; vuonna 1866 Moselin yli rakennettiin ensimmäinen silta. '
      + 'Moselin kanavoinnin jälkeen vuonna 1964 laivat ovat voineet kulkea joella ympäri '
      + 'vuoden.',
    lahde: 'en-Wikipedia "Remich", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Remichiin rakennettiin ensimmäinen silta Moselin yli?',
      vaihtoehdot: [
        '1866',
        '1766',
        '1966',
        '1916',
      ],
      oikea: 0,
      fakta: 'Nykyinen silta on vuodelta 1958.',
    },
  },
  {
    id: 'hahmotelma-grevenmacher',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-grevenmacher-b0d8b060.jpg',
      lyhyt: 'Näkymä viinirinteeltä Grevenmacherin kaupunkiin ja Moseliin.',
      selite: 'Viiniköynnösrivit rinteellä laskeutuvat kohti kaupungin taloja. Moselin joki ja sen ylittävä silta erottuvat taustalla.',
      lahde: 'Valokuva: Hejnjahns, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hejnjahns',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_Gréiwemaacher_from_Hougeriicht.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-grevenmacher-bb475ebb.jpg',
        lyhyt: 'Valkoinen kaarisilta ylittää Moselin Grevenmacherin kohdalla.',
        selite: 'Moselin yli Wellenin ja Grevenmacherin välillä kulkeva silta kaartuu leveän joen yllä. Vastarannalla näkyy taloja ja metsäistä rinnettä.',
        lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Dguendel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grevenmacher,_die_Moselbrücke_Wellen-Grevenmacher.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Grevenmacher',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä joen rannalla Grevenmacher sijaitsee?',
      'Minkä nimen mukaan kantoni on nimetty?',
    ],
    korostukset: ['viininviljely|viininviljelyalueella'],
    nappi: 'Moselin viinialueen kaupunki lähellä Saksan rajaa',
    // 6.4417 E / 49.6806 N — en-Wikipedia "Grevenmacher"
    laudat: {
      maailmankartta: { x: 6048.1, y: 1404.1 },
      europe: { x: 334.9, y: 587 },
    },
    teksti: 'Grevenmacher on kaupunki Itä-Luxemburgissa lähellä Saksan rajaa, ja sen mukaan on '
      + 'nimetty samanniminen kantoni ja vuoteen 2015 asti piiri. Kaupunki sijaitsee Moselin '
      + 'vasemmalla rannalla viininviljelyalueella. Kunnassa on 5 276 asukasta (2025). '
      + 'Kaupungin tunnettuihin henkilöihin kuuluu impressionistimaalari Frantz Seimetz '
      + '(1858–1934).',
    lahde: 'en-Wikipedia "Grevenmacher", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-esch',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-esch-230c1222.jpg',
      lyhyt: 'Belvalin masuuni B ja ruosteiset kuumailmauunit talvipäivän valossa.',
      selite: 'Entisen terästehtaan masuunin torni ja sen vieressä seisovat sylinterinmuotoiset kuumailmauunit nousevat taivasta vasten. Pitkä savupiippu kohoaa vasemmalla.',
      lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Zinneke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blast_furnace_B_Belval_2015-12.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-esch-69cc2860.jpg',
        lyhyt: 'Rue de l\'Alzette on Esch-sur-Alzetten kävelykatu, jonka varrella on liikkeitä.',
        selite: 'Kävelykadun molemmin puolin kohoaa korkeita liike- ja asuinrakennuksia. Kadun päälle on pystytetty korkeita koristetankoja.',
        lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zinneke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Esch-sur-Alzette_Rue_de_l\'Alzette_2022-05.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-esch-7b85db93.jpg',
        lyhyt: 'Valaistut Belvalin masuunit yötaivasta vasten.',
        selite: 'Masuunin teräsrakenteet ja kuumailmauunit hohtavat valokeiloissa pimeän taivaan alla. Vasemmalla näkyy rakennusnosturi.',
        lahde: 'Valokuva: Zinneke, Wikimedia Commons (CC BY-SA 3.0 lu).',
        tekija: 'Zinneke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Belval_illuminated_blast_furnaces_2014-07-04_--2.JPG',
        lisenssi: 'CC BY-SA 3.0 lu',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/lu/deed.en',
      },
    ],
    nimi: 'Esch-sur-Alzette',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Milloin alueelta löytyi runsaasti rautamalmia?',
      'Minä vuonna Belvalin viimeinen masuuni lopetti toimintansa?',
    ],
    korostukset: ['rautamalmi|rautamalmia'],
    nappi: 'Alzette-laakson maalaiskylä, jonka teollistuminen alkaa 1850-luvun rautamalmilöydöstä',
    // 5.9806 E / 49.4969 N — en-Wikipedia "Esch-sur-Alzette"
    laudat: {
      maailmankartta: { x: 6032.7, y: 1412 },
      europe: { x: 326, y: 591.8 },
    },
    teksti: 'Esch-sur-Alzette on Luxemburgin toiseksi väkirikkain kaupunki (37 922 asukasta) maan '
      + 'lounaisosassa Ranskan rajalla Alzette-joen laaksossa. Kaupunki mainitaan ensi kerran '
      + '12. huhtikuuta 1128 paavi Honorius II:lle osoitetussa viestissä, ja pitkään se oli '
      + 'pieni maalaiskylä, kunnes alueelta löytyi 1850-luvulla runsaasti rautamalmia. '
      + 'Kaivosten ja terästeollisuuden kehittyessä kaupungin väkiluku kymmenkertaistui '
      + 'muutamassa vuosikymmenessä, ja teollisuus toi Luxemburgille jatkuvaa talouskasvua '
      + '1800-luvun jälkipuoliskolla. Terästehdas ARBED perustettiin vuonna 1911, ja Belvalin '
      + 'viimeinen masuuni lopetti toimintansa vuonna 1997; vanhojen masuunien alue on '
      + 'muutettu uudeksi kaupunginosaksi. Esch valittiin vuoden 2022 Euroopan '
      + 'kulttuuripääkaupungiksi.',
    lahde: 'en-Wikipedia "Esch-sur-Alzette", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Milloin Eschin seudulta löytyi runsaasti rautamalmia?',
      vaihtoehdot: [
        '1750-luvulla',
        '1800-luvun alussa',
        '1850-luvulla',
        '1900-luvun alussa',
      ],
      oikea: 2,
      fakta: 'Kaupungin väkiluku kymmenkertaistui parissa vuosikymmenessä.',
    },
  },
  {
    id: 'hahmotelma-mondorf',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-mondorf-a7f55d1a.jpg',
      lyhyt: 'Mondorf-les-Bainsin kylpyläpuiston vanha kylpylärakennus ja silta pienen vesiuoman yllä.',
      selite: 'Kapea vesiuoma kulkee puiston halki, ja sen yli johtaa koristeellinen rautakaiteinen silta. Vesiuoman takana kohoaa vaalea, harmaakattoinen kylpylärakennus.',
      lahde: 'Valokuva: PlayMistyForMe at Luxembourgish Wikipedia, Wikimedia Commons (CC BY-SA 3.0 lu).',
      tekija: 'PlayMistyForMe at Luxembourgish Wikipedia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kurpark_Munneref_Al_Thermen.jpg',
      lisenssi: 'CC BY-SA 3.0 lu',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/lu/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-mondorf-716f5dfc.jpg',
        lyhyt: 'Oranssiri ja ranskalainen puutarha Mondorf-les-Bainsin kylpyläpuistossa.',
        selite: 'Leikatut pensasaidat ja kartionmuotoiset puksipuut reunustavat pitkää oranssiriarakennusta. Rakennuksen edessä kukkii vaaleanpunainen puu.',
        lahde: 'Valokuva: Christian Ries, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Christian Ries',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_Mondorf_Orangerie_French-garden.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lux-nosto-mondorf-b890d673.jpg',
        lyhyt: 'Ruusutarha Mondorf-les-Bainsin kylpyläpuistossa.',
        selite: 'Hiekkapolku kiertää kukkivien ruusukaarien ja lammen ohi. Taustalla kohoavat puiston suuret lehti- ja havupuut.',
        lahde: 'Valokuva: Wilrooij, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Wilrooij',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mondorf-les-Bains_Domaine_Thermal_-_La_Roseraie.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mondorf-les-Bains',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna Mondorfin kylpylä vihittiin käyttöön?',
      'Miksi ranskalaisvieraiden virta katkesi vuonna 1871?',
    ],
    korostukset: ['kylpylä|kylpylän'],
    nappi: 'Mondorfin kylpylä toimii vuodesta 1847; ranskalaisvieraiden virta katkeaa vuonna 1871',
    // 6.2806 E / 49.5069 N — en-Wikipedia "Mondorf-les-Bains"
    laudat: {
      maailmankartta: { x: 6042.7, y: 1411.6 },
      europe: { x: 331.8, y: 591.6 },
    },
    teksti: 'Mondorf-les-Bains on kylpyläkaupunki Kaakkois-Luxemburgissa, ja siellä on '
      + 'Luxemburgin ainoa kasino; kunnassa on noin 5 000 asukasta. Lämpövedet löydettiin '
      + '1840-luvulla, kun paikalta porattiin suolaa etsien ennätyssyvyyteen, 736 metriin; '
      + 'vesi ei kelvannut suolan valmistukseen sen runsaan rautapitoisuuden vuoksi, mutta '
      + 'paikallinen notaari J.-P. Ledure perusti kylpylän, ja arkkitehti Charles Eydtin '
      + 'rakentama kylpylälaitos vihittiin käyttöön 20. kesäkuuta 1847. Kylpylän menestys toi '
      + 'kylään ylellisiä hotelleja ja rikkaita ranskalaisvieraita, mutta vieraiden virta '
      + 'Ranskasta katkesi vuonna 1871, kun saksalaiset miehittivät Alsacen ja Lorrainen, ja '
      + 'kylpylä taantui vuosikymmeniä. Vasta kun valtio otti laitokset haltuunsa 21. '
      + 'huhtikuuta 1886, tilanne parani.',
    lahde: 'en-Wikipedia "Mondorf-les-Bains", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Mondorfin kylpylä vihittiin käyttöön?',
      vaihtoehdot: [
        '1797',
        '1747',
        '1897',
        '1847',
      ],
      oikea: 3,
      fakta: 'Lämpölähteet löytyivät 1840-luvulla suolaa etsittäessä.',
    },
  },
];
