/*
 * MAASTOKOHTEET — CMR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CMR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CMR.json. Työkalu laskee laudan
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
 * Kamerunin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kamerunvuoren korkeudeksi ilmoitetaan usein 4 095 m, mutta artikkelin tietolaatikko antaa 4 040 m ja huomauttaa, ettei suurempi lukema sovi SRTM-korkeusaineistoon — tekstissä käytetään tietolaatikon lukemaa.
 *
 * MAAILMAN ERÄ M5 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA — Foumbanin
 * palatsi, Djan luonnonpuisto, Bimbia, Rhumsiki, Wazan kansallispuisto,
 * Kribi, Korupin kansallispuisto ja Ngaoundéré. Lähin uusi merkki on
 * Kribi 26,2 lautayksikön päässä Kamerun-laatasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä. Erä
 * on kuvaton, ja jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_CMR = [
  {
    id: 'kamerunvuori',
    nimi: 'Kamerunvuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin Kamerunvuori purkautui viimeksi?',
      'Mitä paikallinen nimi Mongo ma Ndemi tarkoittaa?',
    ],
    korostukset: ['Guineanlahti|Guineanlahden'],
    nappi: 'Aktiivinen tulivuori meren äärellä',
    // 9.1725 E / 4.2167 N — en-Wikipedia "Mount Cameroon"
    laudat: {
      maailmankartta: { x: 6139.1, y: 3070.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kamerunvuori on aktiivinen kerrostulivuori Lounais-Kamerunissa, Buean kaupungin '
      + 'vieressä lähellä Guineanlahden rantaa. Sen korkeudeksi annetaan 4 040 metriä, joskin '
      + 'lähteet kiistelevät lukemasta. Paikallisilta kieliltä vuori tunnetaan nimillä Fako ja '
      + 'Mongo ma Ndemi, ja se on maailman huippujen joukossa sijalla 22, kun ne pannaan '
      + 'järjestykseen sen mukaan, kuinka kaukana lähin korkeampi maasto on.',
    lahde: 'en-Wikipedia "Mount Cameroon", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä Bonnynlahti ja Beninlahti ovat?',
      'Mistä Guineanlahden öljy pumpataan?',
    ],
    nappi: 'Tropiikin suuri lahti',
    // 8.7 E / 3 N — ulappa Kamerunin rannikon edustalla; en-Wikipedia "Gulf of Guinea" antaa keskipisteeksi 0 / 0
    laudat: {
      maailmankartta: { x: 6123.3, y: 3111.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa: se ulottuu Gabonin Cape Lopezista '
      + 'pohjoiseen ja länteen aina Liberian Cape Palmasiin asti. Lahteen laskee monta suurta '
      + 'jokea, muun muassa Niger ja Volta, ja sen rannikkoon kuuluvat Beninlahti sekä '
      + 'Kamerunin edustalla aukeava Bonnynlahti.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sanaga',
    nimi: 'Sanaga',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Sanaga saa alkunsa?',
      'Miten padot vaikuttavat kalojen vaellukseen?',
    ],
    korostukset: ['Adamawan ylänkö|Adamawan ylängöltä'],
    nappi: 'Kamerunin suurin joki',
    // 11 E / 4.2 N — keskijuoksu Edéan yläpuolella; en-Wikipedia "Sanaga River" antaa suulle 9,65 / 3,56
    laudat: {
      maailmankartta: { x: 6200, y: 3071.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sanaga halkaisee Kamerunin rannikon jokseenkin kahtia — sen leveä suisto avautuu '
      + 'mereen viisikymmentä kilometriä Doualasta etelään. Joki syntyy Adamawan ylängöltä, '
      + 'missä Djérem ja Lom yhtyvät, ja siitä eteenpäin sitä on runsaat 600 kilometriä; koko '
      + 'vesistö latvoineen on yli tuhat kilometriä pitkä. Se on Keski-Afrikan lajirikkaimpia '
      + 'jokia, ja sen altaassa elää kalalajeja, joita ei tunneta mistään muualta. Vesi on myös '
      + 'Kamerunin sähkö: Edéan, Song Louloun, Lom Pangarin ja Nachtigalin padot tuottavat '
      + 'suuren osan maan tuotannosta, mutta samalla ne katkovat kalojen vaellusreittejä ja '
      + 'pysäyttävät liettä. Edéassa joen ylittää Camrailin rautatiesilta.',
    lahde: 'en-Wikipedia "Sanaga River", johdanto-osa sekä osiot "Course", "Transport" ja '
      + '"Biodiversity and conservation" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M5, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Kamerunilla
   * oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki kahdeksan
   * ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Bimbia 64,8 lautayksikön päässä Kamerun-laatasta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'foumbanin-palatsi',
    nimi: 'Foumbanin palatsi',
    nimio: 'Foumban',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä sulttaani Njoya keksi?',
      'Milloin bamounien hallitsijasuku sai alkunsa?',
    ],
    korostukset: ['kirjaimisto|kirjaimiston'],
    nappi: 'Sulttaanin palatsi ja oma kirjaimisto',
    // 10.9167 E / 5.7167 N — en-Wikipedia "Foumban"
    // Lähin pelikaupunki: Kamerun 105,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6197.2, y: 3020.7 },
    },
    teksti: 'Foumban on Länsi-Kamerunin kaupunki Bafoussamista koilliseen ja bamoun-kansan '
      + 'keskus. Sen hallitsijasuvun perusti 1394 Mfon Nshare Yen, ja nykyinen hallitsija eli '
      + 'sulttaani johtaa sukunsa samaan vuoteen. Kaupungin ylpeys on Palais Royal, 1917 '
      + 'valmistunut palatsi, joka muistuttaa keskiaikaista linnaa ja jonka museossa on '
      + 'kuninkaallisia pukuja, aseita, soittimia, koruja, naamioita sekä helmillä peitettyjä '
      + 'valtaistuimia, jotka on veistetty niillä istuneiden miesten muotoisiksi. Palatsin '
      + 'museo kertoo myös sulttaani Ibrahim Njoyasta, joka keksi bamun-kirjaimiston ja '
      + 'keinotekoisen shümom-kielen. Muutaman sadan metrin päässä on Musée des Arts et des '
      + 'Traditions Bamoun, ja museoita yhdistävän Rue des Artisansin varrella työskentelevät '
      + 'kuvanveistäjät, korintekijät, kutojat ja kirjojat.',
    lahde: 'en-Wikipedia "Foumban", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'dja',
    nimi: 'Djan luonnonpuisto',
    nimio: 'Dja',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä rajaa puistoa lähes joka puolelta?',
      'Ketkä asuvat puiston sisällä?',
    ],
    korostukset: ['kädelliset|kädellisistä'],
    nappi: 'Joen ympäröimä sademetsä',
    // 13.0 E / 3.0 N — en-Wikipedia "Dja Faunal Reserve"
    // Lähin pelikaupunki: Kamerun 81,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6266.7, y: 3111.5 },
    },
    teksti: 'Djan luonnonpuisto Kaakkois-Kamerunissa on ollut Unescon maailmanperintökohde '
      + 'vuodesta 1987. Dja-joki kiertää sen lähes kokonaan ja muodostaa luonnollisen rajan '
      + '5 260 neliökilometrin alueelle. Puisto perustettiin 1950, ja se on yksi Afrikan '
      + 'suurimmista ja parhaiten suojelluista sademetsäalueista: noin 90 prosenttia siitä on '
      + 'yhä koskematonta. Erityisen tunnettu se on kädellisistään — valkokaulusmangabeista, '
      + 'mandrilleista, drilleistä, länsigorilloista ja simpansseista — ja sen 1 500 '
      + 'kasvilajin, yli 107 nisäkäslajin ja yli 320 lintulajin joukossa elävät myös '
      + 'metsänorsu ja leopardi. Puiston alueella asuu perinteiseen tapaan baka-kansaa.',
    lahde: 'en-Wikipedia "Dja Faunal Reserve", johdanto-osa sekä osiot "Geology", "History" '
      + 'ja "Fauna" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bimbia',
    nimi: 'Bimbia',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä isubut kävivät kauppaa eurooppalaisten kanssa?',
      'Mitä kuningas William allekirjoitti 1844 ja 1848?',
    ],
    korostukset: ['välittäjä|välittäjien'],
    nappi: 'Isubujen satama Wourin suulla',
    // 9.245 E / 3.9539 N — en-Wikipedia "Bimbia"
    // Lähin pelikaupunki: Kamerun 64,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6141.5, y: 3079.6 },
    },
    teksti: 'Bimbia oli isubu-kansan itsenäinen valtio Kamerunvuoren eteläpuolella, Wourin '
      + 'suiston länsipuolella; Saksan keisarikunta liitti sen siirtomaahansa 1884. '
      + 'Portugalilaiset kauppiaat saapuivat Wourin suistoon 1472, ja isubut ottivat '
      + 'itselleen välittäjien roolin: he toivat sisämaasta norsunluuta, kolapähkinöitä ja '
      + 'pippuria, mutta suurin kauppatavara olivat orjat, joista useimmat vietiin '
      + 'lähisaarten — Annobónin, Fernando Póon, Príncipen ja São Tomén — viljelmille. '
      + '1500-luvulla isubut olivat kaupassa toiseksi suurin kansa dualojen jälkeen, ja '
      + 'Bimbiasta kasvoi nopeasti heidän tärkein satamansa. Britannian kauppiaat nousivat '
      + '1800-luvun puoliväliin mennessä alueen johtavaksi voimaksi, ja kruunu käytti heitä '
      + 'orjakaupan lakkauttamiseen: kuningas William allekirjoitti orjuudenvastaiset '
      + 'sopimukset 1844 ja 1848.',
    lahde: 'en-Wikipedia "Bimbia", johdanto-osa sekä osiot "Origins", "Early European '
      + 'contacts" ja "British influence" (tarkistettu 6.9.2026).',
  },
  {
    id: 'rhumsiki',
    nimi: 'Rhumsiki',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä Rhumsikin maisema syntyy?',
      'Miten kylän ennustaja lukee tulevaisuuden?',
    ],
    korostukset: ['tulpat|tulpat'],
    nappi: 'Tulivuorten tulpat Mandaran vuorilla',
    // 13.6 E / 10.4833 N — en-Wikipedia "Rhumsiki"
    // Lähin pelikaupunki: Tšad-järvi 118,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6286.7, y: 2860.8 },
    },
    teksti: 'Rhumsiki on kylä Kamerunin pohjoisimmassa maakunnassa Mandaran vuorilla, 55 '
      + 'kilometriä Mokolosta ja kolme kilometriä Nigerian rajasta. Kapsiki-kansan asukkaat '
      + 'elävät paikallisesta kivestä muuratuissa, olkikattoisissa taloissa, jotka ovat '
      + 'hajallaan kylässä ja sen ympärysten laaksossa. Maisema tekee paikasta yhden '
      + 'Kamerunin suosituimmista nähtävyyksistä: sammuneiden tulivuorten kovettuneet tulpat '
      + 'ja basalttipaljastumat kohoavat tasangolta, ja suurin niistä on 1 224 metrin '
      + 'Kapsikin huippu. André Gide kutsui seutua yhdeksi maailman kauneimmista maisemista. '
      + 'Kylässä käyvät myös sepät, savenvalajat ja kutojat sekä féticheur, ennustaja, '
      + 'joka '
      + 'lukee tulevaisuuden siitä, miten rapu siirtelee puunpaloja.',
    lahde: 'en-Wikipedia "Rhumsiki", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'waza',
    nimi: 'Wazan kansallispuisto',
    nimio: 'Waza',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä puisto oli ennen vuotta 1968?',
      'Millä kasvillisuusvyöhykkeellä puisto on?',
    ],
    korostukset: ['biosfäärialue|biosfäärialueeksi'],
    nappi: 'Sahelin ja savannin rajalla',
    // 14.7333 E / 11.3333 N — en-Wikipedia "Waza National Park"
    // Lähin pelikaupunki: Tšad-järvi 78,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6324.4, y: 2832.1 },
    },
    teksti: 'Wazan kansallispuisto on Kamerunin pohjoisimmassa maakunnassa lähellä Tšadin ja '
      + 'Nigerian rajaa. Se perustettiin 1934 metsästysalueeksi, sai kansallispuiston aseman '
      + '1968 ja nimettiin Unescon biosfäärialueeksi 1979; pinta-alaa on 1 700 '
      + 'neliökilometriä. Puisto on Sahelin ja Sudanin savannin vaihettumisvyöhykkeellä, ja '
      + 'sen kasvillisuus on akasiaa ja avointa yaéré-savannia; itäpuolella on tulva-alue, '
      + 'joka täyttyy sadekaudella. Puistossa elää leijona, afrikannorsu, hyeena, '
      + 'hevosantilooppi, kob, gaselli ja länsiafrikankirahvi, ja linnuista siellä on '
      + 'nähty muun muassa pelikaaneja, haikaroita ja strutseja. Puiston sisällä asuneet '
      + 'kylät siirrettiin sen perustamisen jälkeen rajojen ulkopuolelle.',
    lahde: 'en-Wikipedia "Waza National Park", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kribi',
    nimi: 'Kribi',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä joen suulla Kribi on?',
      'Mikä putkilinja päättyy kaupungin lähelle?',
    ],
    korostukset: ['öljyputki|öljyputken'],
    nappi: 'Rantakaupunki Guineanlahden rannalla',
    // 9.91 E / 2.935 N — en-Wikipedia "Kribi"
    // Lähin pelikaupunki: Kamerun 26,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6163.7, y: 3113.6 },
    },
    teksti: 'Kribi on rantakaupunki ja merisatama Guineanlahden rannalla Kienké-joen suulla, '
      + 'noin 150 kilometriä Doualasta etelään. Asukkaita on arviolta 55 000, ja kaupunki '
      + 'palvelee Guineanlahden meriliikennettä. Se on myös Tšadin ja Kamerunin öljyputken '
      + 'päätepisteen tuntumassa, ja lähistöllä ovat Lobén putoukset. Sisämaahan johtaa tie '
      + 'ikivihreän rannikkometsän halki Bipindiin ja Lolodorfiin, joiden seudulla asuu '
      + 'pygmiyhteisöjä. Mpolongwen kylään noin kymmenen kilometriä keskustasta pohjoiseen '
      + 'valmistui 2013 maakaasulla toimiva 216 megawatin voimalaitos.',
    lahde: 'en-Wikipedia "Kribi", osiot "Location", "Overview" ja "Kribi Power Station" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'korup',
    nimi: 'Korupin kansallispuisto',
    nimio: 'Korup',
    tyyppi: 'elain',
    kysymykset: [
      'Minkä maan puistoon Korup rajautuu lännessä?',
      'Milloin metsästä tuli kansallispuisto?',
    ],
    korostukset: ['aarniometsä|aarniometsää'],
    nappi: 'Afrikan vanhimpia sademetsiä',
    // 8.8333 E / 5.0833 N — en-Wikipedia "Korup National Park"
    // Lähin pelikaupunki: Lagos 62,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6127.8, y: 3041.9 },
    },
    teksti: 'Korupin kansallispuisto Lounais-Kamerunissa kattaa 1 260 neliökilometriä '
      + 'enimmäkseen koskematonta aarniometsää, ja sitä pidetään yhtenä Afrikan vanhimmista '
      + 'ja lajirikkaimmista trooppisista metsistä. Se on maan helpoimmin saavutettava '
      + 'sademetsäpuisto: siellä on perusmajoitus ja laaja polkuverkosto. Puisto on suosittu '
      + 'lintujen tarkkailupaikka ja tunnettu kädellisistään, joihin kuuluvat drilli, '
      + 'Preussinpunakolobus, punakorvamarakatti ja Nigerian simpanssi. Länsirajallaan puisto '
      + 'koskettaa noin viidentoista kilometrin matkalta Nigerian Cross Riverin '
      + 'kansallispuiston Obanin osaa. Metsä suojeltiin 1937, ja kansallispuisto siitä tuli '
      + 'presidentin asetuksella 1986; tutkijat ovat tehneet siellä työtä yli kolme '
      + 'vuosikymmentä.',
    lahde: 'en-Wikipedia "Korup National Park", johdanto-osa sekä osiot "Location" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ngaoundere',
    nimi: 'Ngaoundéré',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä kaupungin nimi tarkoittaa mbumin kielellä?',
      'Kuka perusti kaupungin 1830-luvulla?',
    ],
    korostukset: ['lamido|lamidon'],
    nappi: 'Radan pohjoinen pää Adamawan ylängöllä',
    // 13.5667 E / 7.3381 N — en-Wikipedia "Ngaoundéré"
    // Lähin pelikaupunki: Kamerun 187,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6285.6, y: 2966.5 },
    },
    teksti: 'Ngaoundéré on Kamerunin Adamawan alueen pääkaupunki ja Yaoundéen johtavan radan '
      + 'pohjoinen pääteasema. Kaupungin nähtävyyksiä ovat lamidon palatsi ja lamidon suuri '
      + 'moskeija. Nimi tulee viereisestä vuoresta: mbumin kielellä ngaou on vuori ja ndare '
      + 'napa, joten nimi tarkoittaa napavuorta. Nykyisen kaupungin paikalla oli aiemmin '
      + 'mbumien pääpaikka, mutta kaupunki itse syntyi noin 1835, kun fulanijohtaja Ardo '
      + 'Njobdi perusti sen; fulanit pitivät seutua hallussaan koko 1800-luvun. Saksalainen '
      + 'tutkimusmatkailija Robert Flegel vieraili siellä 1882, ja Ardo Muhammadu Abbo '
      + 'solmi suojelusopimuksen Siegfried Passargen kanssa 1894.',
    lahde: 'en-Wikipedia "Ngaoundéré", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
];

