/*
 * MAASTOKOHTEET — AGO. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AGO --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AGO.json. Työkalu laskee laudan
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
 * Angolan maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 *
 * MAAILMAN ERÄ M5 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * M’banza-Kongo, São Miguelin linnoitus, Kalandulan putoukset, Quiçaman
 * puisto, Ionan puisto, Moçâmedes, Benguelan rata ja Cuito Cuanavale.
 * Lähin uusi merkki on Benguelan rata 27,8 lautayksikön päässä
 * Angola-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat
 * pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_AGO = [
  {
    id: 'morrodemoco',
    nimi: 'Morro de Moco',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on kansainvälisesti tärkeä lintualue?',
      'Miksi Morro de Mocon metsä on uhattuna?',
    ],
    korostukset: ['Huambo|Huambon'],
    nappi: 'Angolan korkein vuori',
    // 15.1667 E / -12.4667 N — en-Wikipedia "Mount Moco"
    laudat: {
      maailmankartta: { x: 6338.9, y: 3629.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Angolan korkeimmalla vuorella on laskettu 233 lintulajia, ja osaa niistä ei tapaa '
      + 'mistään muualta maailmasta. Morro de Moco kohoaa 2 620 metriin Huambon maakunnassa '
      + 'seitsemänkymmentä kilometriä kaupungista länteen, ja BirdLife International on '
      + 'nimennyt sen kansainvälisesti tärkeäksi lintualueeksi osana Länsi-Angolan '
      + 'kotoperäisten lintujen aluetta; siellä elävät muun muassa uhanalainen Swierstran pyy '
      + 'ja angolanluolarastas. Vuoren afrovuoristometsä on silti kutistumassa, kun puuta '
      + 'kaadetaan rakentamiseen ja polttopuuksi. Kasvitieteilijöitä paikalla on käynyt hyvin '
      + 'vähän — proteakukat aukeavat vasta heinä—syyskuussa, kun ruohomaan kulot ovat '
      + 'sammuneet. Vuonna 2014 Moco nimettiin yhdeksi Angolan seitsemästä ihmeestä.',
    lahde: 'en-Wikipedia "Mount Moco", johdanto-osa sekä osiot "Flora", "Birdlife" ja '
      + '"Conservation" (tarkistettu 1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Etelä-Atlantti on lämmin ympäri vuoden?',
      'Mitä \'vanha\' ja \'uusi maailma\' tarkoittavat?',
    ],
    nappi: 'Maailman toiseksi suurin valtameri',
    // 12 E / -10.5 N — ulappa Angolan rannikon edustalla Luandan eteläpuolella; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 6233.3, y: 3562.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri: se peittää noin 17 prosenttia '
      + 'maapallon pinnasta. Löytöretkien aikana sen ajateltiin erottavan Amerikan \'uuden '
      + 'maailman\' Afrikan, Aasian ja Euroopan \'vanhasta maailmasta\'. Angolan kohdalla '
      + 'levittäytyvä Etelä-Atlantti pysyy lämpimänä ympäri vuoden, sillä sitä reunustavat maat '
      + 'ovat tropiikissa.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cuanza',
    nimi: 'Cuanza',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Angolan valuutta on nimeltään kwanza?',
      'Kuinka pitkälle jokea pääsee veneellä?',
    ],
    korostukset: ['Luanda|Luandan'],
    nappi: 'Angolan pisin joki',
    // 14.4 E / -9.7 N — keskijuoksu Dondon seudulla; en-Wikipedia "Cuanza River" antaa suistolle 13,15 / -9,35
    laudat: {
      maailmankartta: { x: 6313.3, y: 3535.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Angolan raha on nimetty tämän joen mukaan, ja niin oli aikanaan myös valloituksen '
      + 'reitti. Cuanza on maan pisin joki ja laskee Atlanttiin kuusikymmentä kilometriä '
      + 'Luandan eteläpuolella; sen alajuoksu on veneellä kuljettavissa noin 240 kilometrin '
      + 'matkalta, ja juuri sitä pitkin portugalilaiset tunkeutuivat Pohjois-Angolaan. Nykyään '
      + 'joki tekee toista työtä: Capandan pato valmistui 2004, ja sen lisäksi virtaa '
      + 'padottavat Cambambe ja Laúca. Jokea on tutkittu vasta vähän — Angolan ensimmäinen '
      + 'Cuanzan monimuotoisuuslaskenta on löytänyt viisikymmentä kalalajia, ja geenitestit '
      + 'saattavat paljastaa niistä uusia lajeja tieteelle.',
    lahde: 'en-Wikipedia "Cuanza River", johdanto-osa sekä osiot "Geography", "History", '
      + '"Wildlife" ja "Legacy" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M5, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Angolalla
   * oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki kahdeksan
   * ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on M’banza-Kongo 64,4 lautayksikön päässä Kongo-laatasta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'mbanza-kongo',
    nimi: 'M’banza-Kongo',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä valtakunnan pääkaupunki M’banza-Kongo oli?',
      'Mihin portugalilaislähettiläs vertasi kaupungin kokoa?',
    ],
    korostukset: ['manikongo|manikongo'],
    nappi: 'Kongon kuningaskunnan pääkaupunki',
    // 14.2481 E / -6.2678 N — en-Wikipedia "M'banza-Kongo"
    // Lähin pelikaupunki: Kongo 64,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6308.3, y: 3420.7 },
    },
    teksti: 'M’banza-Kongo on Luoteis-Angolan Zairen maakunnan pääkaupunki. Se oli Kongon '
      + 'kuningaskunnan pääkaupunki jo ennen portugalilaisten tuloa 1483 aina kuningaskunnan '
      + 'lakkauttamiseen 1915 asti — vuosina 1570–1976 sen nimi oli portugaliksi São '
      + 'Salvador. Kaupungin perusti ensimmäinen manikongo Lukeni suurten kauppateiden '
      + 'risteykseen, ja laajimmillaan valtakunta ulottui Atlantin rannikolta Nkisi-joelle. '
      + 'Kun portugalilaiset saapuivat 1491, paikka oli jo suuri kaupunki, ehkä '
      + 'päiväntasaajan eteläpuolisen Afrikan suurin: Lissaboniin lähetetyssä kirjeessä '
      + 'lähettiläs vertasi sen muurien sisäistä osaa Portugalin Évoraan. Unescon '
      + 'maailmanperintökohde M’banza-Kongo on ollut vuodesta 2017.',
    lahde: 'en-Wikipedia "M\'banza-Kongo", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sao-miguelin-linnoitus',
    nimi: 'São Miguelin linnoitus',
    nimio: 'São Miguel',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin linnoitus rakennettiin ja kenen käskystä?',
      'Miksi hollantilaiset kutsuivat sitä Aardenburghiksi?',
    ],
    korostukset: ['kaakelit|kaakelit'],
    nappi: 'Luandan linnoitus vuodelta 1576',
    // 13.2234 E / -8.8083 N — en-Wikipedia "Fortress of São Miguel"
    // Lähin pelikaupunki: Kongo 134,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6274.1, y: 3505.8 },
    },
    teksti: 'Fortaleza de São Miguel on portugalilaisten 1576 rakentama linnoitus Luandan '
      + 'Ingombotan kaupunginosassa; rakennuttaja oli kaupungin perustaja Paulo Dias de '
      + 'Novais. Vuonna 1627 siitä tuli siirtomaan hallinnollinen keskus, ja se oli myös '
      + 'Brasiliaan suuntautuneen orjakaupan tärkeimpiä paikkoja. Hollantilaisten '
      + 'valtakaudella 1641–1648 linnoitus tunnettiin nimellä Fort Aardenburgh. Vuosien '
      + 'saatossa se oli käytännössä oma kaupunkinsa paksujen, tykein varustettujen muurien '
      + 'sisällä. Sisäpihalla seisovat Portugalin ensimmäisen kuninkaan sekä Diogo Cãon ja '
      + 'Vasco da Gaman patsaat, ja seinien kaakelit kertovat Angolan varhaisvaiheita. '
      + 'Vuoteen 1975 asti linnoitus oli Portugalin asevoimien Angolan-päämaja; nykyään se on '
      + 'sotahistorian museo.',
    lahde: 'en-Wikipedia "Fortress of São Miguel", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kalandulan-putoukset',
    nimi: 'Kalandulan putoukset',
    nimio: 'Kalandula',
    tyyppi: 'muu',
    kysymykset: [
      'Missä joessa putoukset ovat?',
      'Millä nimellä ne tunnettiin ennen?',
    ],
    korostukset: ['virtaama|virtaamaltaan'],
    nappi: 'Sadan metrin putous Lucalassa',
    // 16.0033 E / -9.0758 N — en-Wikipedia "Kalandula Falls"
    // Lähin pelikaupunki: Angola 98,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6366.8, y: 3514.8 },
    },
    teksti: 'Kalandulan putoukset ovat Lucala-joessa Kalandulan kunnassa Malanjen '
      + 'maakunnassa. Putouskorkeutta on 105 metriä ja leveyttä 400 metriä. Ne ovat '
      + 'virtaamaltaan Afrikan suurimpia vesiputouksia. Aiemmin ne tunnettiin nimellä Duque '
      + 'de Bragança, ja Luandasta niille on matkaa 360 kilometriä.',
    lahde: 'en-Wikipedia "Kalandula Falls", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'quicaman-kansallispuisto',
    nimi: 'Quiçaman puisto',
    nimio: 'Quiçama',
    tyyppi: 'elain',
    kysymykset: [
      'Mitkä joet rajaavat puistoa pohjoisessa ja etelässä?',
      'Mitä Nooan arkki -operaatiossa tehtiin?',
    ],
    korostukset: ['salametsästys|salametsästys'],
    nappi: 'Puisto, johon norsut tuotiin takaisin',
    // 13.5833 E / -9.75 N — en-Wikipedia "Quiçama National Park"
    // Lähin pelikaupunki: Angola 110,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6286.1, y: 3537.5 },
    },
    teksti: 'Quiçaman kansallispuisto on Luoteis-Angolassa noin 70 kilometriä Luandasta, ja '
      + 'se on maan ainoa toimiva kansallispuisto — muut ovat rappiolla sisällissodan '
      + 'jäljiltä. Puistoa rajaa lännessä 120 kilometriä Atlantin rannikkoa, pohjoisessa '
      + 'Cuanza-joki ja etelässä Longa-joki, ja pinta-alaa on noin 12 000 neliökilometriä. '
      + 'Alue rauhoitettiin riistamaaksi 1938, ja Portugalin siirtomaahallinto julisti sen '
      + 'kansallispuistoksi tammikuussa 1957. Aikoinaan siellä eli runsaasti suurriistaa, '
      + 'muun muassa norsuja ja jättiläisseeprantilooppeja, mutta laaja salametsästys 25 '
      + 'sisällissotavuoden aikana hävitti kannat lähes kokonaan. Vuonna 2001 Kissama-säätiö '
      + 'aloitti Nooan arkki -operaation, jossa eläimiä — etenkin norsuja — siirrettiin '
      + 'puistoon Botswanan ja Etelä-Afrikan ylikansoitetuista puistoista; se oli '
      + 'suurin laatuaan tehty eläinsiirto.',
    lahde: 'en-Wikipedia "Quiçama National Park", johdanto-osa sekä osiot "Geography" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ionan-kansallispuisto',
    nimi: 'Ionan puisto',
    nimio: 'Iona',
    tyyppi: 'elain',
    kysymykset: [
      'Milloin Ionasta tuli suojelualue?',
      'Miten sademäärä muuttuu rannikolta itään?',
    ],
    korostukset: ['dyyni|dyynit'],
    nappi: 'Angolan vanhin ja suurin puisto',
    // 12.33 E / -16.67 N — en-Wikipedia "Iona National Park"
    // Lähin pelikaupunki: Angola 200,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6244.3, y: 3772.2 },
    },
    teksti: 'Iona on Angolan suurin ja vanhin kansallispuisto maan lounaisnurkassa Namiben '
      + 'maakunnassa. Sitä rajaavat lännessä Atlantti, idässä sisämaan ylängön '
      + 'reunajyrkänne, '
      + 'pohjoisessa Curoca-joki ja etelässä Kunene; pinta-alaa on noin 15 200 '
      + 'neliökilometriä. Maisemassa vuorottelevat vaeltavat dyynit, laajat tasangot sekä '
      + 'karut vuoret ja jyrkänteet, ja sade vaihtelee rannikon sadasta millimetristä '
      + 'itärajan kolmeensataan tai enempään. Alue rauhoitettiin 1937 ja korotettiin '
      + 'kansallispuistoksi 1964 sen sisällä olevan Ionan kylän mukaan. Sisällissota koetteli '
      + 'puistoa pahoin — salametsästys ja tuhoutunut infrastruktuuri veivät siltä paljon — '
      + 'ja vuodesta 2009 alkaen sitä on kunnostettu hankkeilla, joiden toivotaan tuovan '
      + 'matkailijat takaisin.',
    lahde: 'en-Wikipedia "Iona National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'mocamedes',
    nimi: 'Moçâmedes',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaupungin nimi vaihtui 1985 ja takaisin 2016?',
      'Mistä 1850-luvun uudisasukkaat tulivat?',
    ],
    korostukset: ['aavikko|aavikon'],
    nappi: 'Kalastussatama Namibin laidalla',
    // 12.1508 E / -15.1953 N — en-Wikipedia "Moçâmedes"
    // Lähin pelikaupunki: Angola 168,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6238.4, y: 3721.8 },
    },
    teksti: 'Moçâmedes on Lounais-Angolan kaupunki ja Namiben maakunnan pääkaupunki, jossa '
      + 'asuu vuoden 2024 laskennan mukaan lähes 346 000 ihmistä. Ilmasto on viileä ja kuiva '
      + 'ja kasvillisuus aavikon omaa, sillä kaupunki on Namibin laidalla. Portugalilaiset '
      + 'tutkivat seudun 1785, ja lahti nimettiin Angolan kenraalikuvernöörin, paroni '
      + 'Moçâmedesin mukaan; kaupunki perustettiin virallisesti 1840 lahdelle, jota '
      + 'portugalilaiset olivat kutsuneet nimellä Angra do Negro. Samana vuonna sinne tuli '
      + 'kauppahuone ja Ponta Negraan linnake. Uudisasukkaat olivat enimmäkseen Madeiralta ja '
      + 'Brasiliasta, ja 1850-luvulla Portugalin hallitus maksoi laivamatkan myös suurelle '
      + 'joukolle saksalaisia. Kalastussatamana kaupunki kasvoi niin, että 1960-luvulla '
      + 'sillä oli 143 kalastusalusta ja useita kalanjalostamoja. Vuosina 1985–2016 kaupungin '
      + 'nimi oli Namibe.',
    lahde: 'en-Wikipedia "Moçâmedes", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'benguelan-rata',
    nimi: 'Benguelan rata',
    nimio: 'Benguelan rata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mihin satamaan rata päättyy lännessä?',
      'Miksi Portugali alkoi rakentaa rataa 1899?',
    ],
    korostukset: ['raideleveys|raideleveys'],
    nappi: 'Rata Atlantilta kuparivyöhykkeelle',
    // 15.7347 E / -12.7767 N (Huambo, radan ylängön asema) — en-Wikipedia
    // "Huambo"; radan oma artikkeli ei anna koordinaatteja.
    // Lähin pelikaupunki: Angola 27,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6357.8, y: 3639.7 },
    },
    teksti: 'Benguelan rata kulkee Angolan halki lännestä itään ja on maan suurin ja tärkein '
      + 'rautatie. Se päättyy lännessä Lobiton satamaan Atlantin rannalla, ja idässä se '
      + 'jatkuu Kongon demokraattisen tasavallan puolelle Tenkeen sekä sieltä Kapkaupungin ja '
      + 'Kairon radalle. Sataman kautta viedään muun muassa kuparivyöhykkeen malmeja, '
      + 'ruokaa, teollisuuden osia ja karjaa. Raideleveys on eteläisessä Afrikassa yleinen '
      + '1 067 millimetriä, suurin suunnittelunopeus 90 kilometriä tunnissa, asemia on 67 ja '
      + 'siltoja 42; korkein kohta on 1 854 metrissä. Rata seuraa karkeasti vanhoja '
      + 'kauppareittejä Benguelan ja Bién ylängön välillä, ja Portugalin hallitus käynnisti '
      + 'sen rakentamisen 1899 päästäkseen käsiksi Keski-Angolan ylänköön ja silloisen '
      + 'Kongon '
      + 'vapaavaltion malmivaroihin.',
    lahde: 'en-Wikipedia "Benguela railway", johdanto-osa sekä osiot "Specifications" ja '
      + '"History"; sijainti en-Wikipedia "Huambo", tietolaatikko (tarkistettu 6.9.2026).',
  },
  {
    id: 'cuito-cuanavale',
    nimi: 'Cuito Cuanavale',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin taistelu käytiin?',
      'Mihin sopimukseen taistelua seurannut rauhanneuvottelu johti?',
    ],
    korostukset: ['ilmaherruus|ilmaherruuden'],
    nappi: 'Afrikan suurin taistelu sitten 1945',
    // 19.1731 E / -15.1639 N — en-Wikipedia "Battle of Cuito Cuanavale"
    // Lähin pelikaupunki: Angola 150,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6472.4, y: 3720.8 },
    },
    teksti: 'Cuito Cuanavalen taistelu käytiin katkonaisesti 14. elokuuta 1987 ja 23. '
      + 'maaliskuuta 1988 välillä kaupungin eteläpuolella ja itäpuolella. Vastakkain olivat '
      + 'Angolan hallituksen joukot FAPLA ja Kuuba sekä toisaalta Etelä-Afrikka ja UNITA. Se '
      + 'oli Angolan konfliktin suurin yhteenotto ja Afrikan mantereen suurin tavanomainen '
      + 'taistelu sitten toisen maailmansodan. FAPLAn suurhyökkäys kohti Mavingaa pysäytettiin '
      + 'Lomba-joella syksyllä 1987, ja sitä seurannut vastahyökkäys Tumpo-joen suunnassa '
      + 'katkaisi etenemisen mutta ei tuhonnut kaikkia asemia. Kuuban ja Angolan '
      + 'neuvostoliittolainen ilmatorjunta ja hävittäjäkalusto veivät Etelä-Afrikalta sen '
      + 'vuosia kestäneen ilmaherruuden, millä oli ratkaiseva merkitys maataistelun kululle. '
      + 'Yhdysvaltain välittämät neuvottelut jatkuivat taistelujen jälkeen ja johtivat 22. '
      + 'joulukuuta 1988 New Yorkissa allekirjoitettuun sopimukseen, joka vei vieraat joukot '
      + 'pois Angolasta ja Namibian itsenäisyyteen.',
    lahde: 'en-Wikipedia "Battle of Cuito Cuanavale", johdanto-osa ja osio "Aftermath" '
      + '(tarkistettu 6.9.2026).',
  },
];

