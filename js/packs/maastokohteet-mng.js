/*
 * MAASTOKOHTEET — MNG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MNG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MNG.json. Työkalu laskee laudan
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
 * Mongolian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Gobi on maan tunnusmaasto, joten se on mukana aavikkona: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — vuori- tai meriotsake olisi väärin.
 */
export const MAASTOKOHTEET_MNG = [
  {
    id: 'huitenorgil',
    nimi: 'Hüiten orgil',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko valtioiden raja kulkea vuoren huipun yli?',
      'Missä kolmen valtakunnan kolmiopiste on?',
    ],
    korostukset: ['Altai|Altain', 'Tavan Bogd|Tavan Bogdin'],
    nappi: 'Mongolian kylmä katto',
    // 87.8189 E / 49.1458 N — en-Wikipedia "Khüiten Peak"
    laudat: {
      maailmankartta: { x: 8760.6, y: 1427.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hüiten orgil, "Kylmä huippu", kohoaa 4 356 metriin ja on sekä Mongolian että koko '
      + 'Altain vuoriston korkein kohta. Mongolian ja Kiinan raja kulkee suoraan sen huipun '
      + 'yli, ja lumi ei sula siltä koskaan. Huippu on yksi Tavan Bogdin viidestä huipusta; '
      + 'parin kilometrin päässä toinen niistä merkitsee Venäjän, Mongolian ja Kiinan '
      + 'kolmiopistettä.',
    lahde: 'en-Wikipedia "Khüiten Peak", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'gobi',
    nimi: 'Gobi',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä mongolin sana gov\' tarkoittaa?',
      'Miksi Gobista löytyy dinosauruksen munia?',
    ],
    korostukset: ['gov\''],
    nappi: 'Kylmä aavikko',
    // 103.43 E / 42.59 N — en-Wikipedia "Gobi Desert"
    laudat: {
      maailmankartta: { x: 9281, y: 1699.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mongolialaiselle gobi ei ole aavikko vaan laiduntyyppi: maa, jossa kasvaa niin ohutta '
      + 'ruohoa, että se sopii kamelille muttei lehmälle — hevoset, lampaat ja vuohet '
      + 'pärjäävät, jos lauma pidetään pienenä ja sitä siirretään usein. Sana gov\' tarkoittaa '
      + 'vedetöntä seutua, ja kiinan vastine gēbì viittaa juuri kiviseen puoliaavikkoon eikä '
      + 'hiekkaan. Ruoho antaa makua: villisipuli taana on karjan pääravintoa, ja mongolien '
      + 'mukaan juuri se tuo kamelinmaidosta käytetyn airagin hasselpähkinäisen vivahteen. '
      + 'Fossiileja Gobi on antanut enemmän kuin useimmat paikat maailmassa — muun muassa '
      + 'ensimmäiset tunnetut dinosauruksenmunat, joita löytyi vuonna 1923 kaksikymmentäkuusi '
      + 'kappaletta, kukin noin 23 senttimetriä pitkä.',
    lahde: 'en-Wikipedia "Gobi Desert", johdanto-osa sekä osiot "Conservation, ecology, and '
      + 'economy" ja "Ecoregions" (tarkistettu 1.9.2026).',
  },
  {
    id: 'orhon',
    nimi: 'Orhon',
    tyyppi: 'joki',
    kysymykset: [
      'Minne Mongolian joet laskevat?',
      'Mikä kaupunki Orhonin laaksossa sijaitsi?',
    ],
    korostukset: ['Selenga|Selengaan', 'Baikaljärvi|Baikaljärveen'],
    nappi: 'Mongolian pisin joki',
    // 102.75 E / 47.35 N — joen yläjuoksun laakso Harhorinin luona; artikkelin koordinaatti 106,14 / 50,25 on joen suulla Selengan yhtymäkohdassa
    laudat: {
      maailmankartta: { x: 9258.3, y: 1503.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Orhon on Mongolian pisin joki. Se saa alkunsa Hangain vuoristosta, virtaa Harhorinin '
      + 'ohi ja kääntyy pohjoiseen, kunnes yhtyy Selengaan lähellä Venäjän rajaa. Selenga '
      + 'jatkaa siitä Venäjälle ja laskee Baikaljärveen — Mongolian sydänmaiden vesi päätyy '
      + 'siis Siperiaan asti. Yläjuoksulla joen tuntumassa on kymmenen metriä leveä ja '
      + 'kaksikymmentä metriä korkea Ulaan Tsutgalanin vesiputous.',
    lahde: 'en-Wikipedia "Orkhon River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (7) JA YKSI MAASTOKOHDE — ERÄ M10, AASIA 3, 6.9.2026
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Mongolialla oli ennen tätä erää kaksi maastokohdetta (Hüiten orgil
   * ja Orhon) sekä yksi kohde (Gobi, tyyppi `muu`) eikä eläintäkyä tai
   * skandaalia lainkaan. Tavoite maata kohti on kahdeksan KOHDETTA ja
   * kolme MAASTOKOHDETTA, joten tästä erästä tuli seitsemän kohdetta ja
   * kolmas maastokohde, Hövsgölin järvi.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 8564,8…10023,3 ja y 1210,6…1815,1).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Tšingisin ratsastajapatsas 43,7 lautayksikön päässä Ulan
   * Bator -laatasta ja kaukaisin peurakivet 187,8 yksikön päässä siitä.
   * Raja KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * KARAKORUM JA ERDENE ZUU JÄIVÄT POIS, ja syy on mitattu: maan oma
   * Orhon-merkki on Harhorinin kohdalla (x 9258,3 / y 1503,8), ja
   * Karakorumin nimiö osuisi 6,9 lautayksikön päähän siitä eli suoraan
   * sen päälle. Orhonin laakson kohteista mahtui mukaan Tövhön, joka on
   * 21,8 yksikön päässä joen merkistä. Mongolian Altain kalliopiirros-
   * kohteesta ei ole en-Wikipedian artikkelia lainkaan, joten sitä ei
   * kirjoitettu; sen sijalle tuli Tsagaan aguin luola.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'amarbayasgalant',
    nimi: 'Amarbayasgalant',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka luostarin rakennutti?',
      'Mistä luostari sai nimensä?',
    ],
    korostukset: ['Zanabazar|Zanabazarin'],
    nappi: 'Kahden pojan mukaan nimetty luostari',
    // 105.085 E / 49.48 N — en-Wikipedia "Amarbayasgalant Monastery"
    laudat: {
      maailmankartta: { x: 9336.2, y: 1412.7 },
    },
    teksti: 'Amarbayasgalant on yksi Mongolian kolmesta suurimmasta buddhalaisesta '
      + 'luostarikeskuksesta. Se sijaitsee Ivenin laaksossa lähellä Selenga-jokea '
      + 'Büren-Khaanin vuoren juurella Pohjois-Mongoliassa; lähin kaupunki on noin 120 '
      + 'kilometrin päässä oleva Erdenet. Luostari rakennettiin Qing-Kiinan '
      + 'Yongzheng-keisarin käskystä ja kustannuksella ja valmistui hänen seuraajansa '
      + 'Qianlongin aikana; sen tarkoitus oli olla Zanabazarin (1635–1723) viimeinen '
      + 'leposija. Zanabazar oli ensimmäinen Jebtsundamba-khutuktu eli Khalkha-mongolien '
      + 'tiibetinbuddhalaisuuden hengellinen johtaja ja molempien keisarien esi-isän '
      + 'Kangxin hengellinen opettaja. Perimätiedon mukaan sopivaa paikkaa etsinyt '
      + 'retkikunta kohtasi arolla kaksi leikkivää poikaa, Amurin ja Bayasqulangtun, ja '
      + 'päätti rakentaa luostarin juuri siihen ja nimetä sen lasten mukaan.',
    lahde: 'en-Wikipedia "Amarbayasgalant Monastery", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'bayanzag',
    nimi: 'Bayanzag',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä löytö teki paikan kuuluisaksi?',
      'Kuka antoi kallioille niiden lisänimen?',
    ],
    korostukset: ['Roy Chapman Andrews|Roy Chapman Andrews'],
    nappi: 'Ensimmäiset dinosauruksenmunat',
    // 103.72778 E / 44.13852 N — en-Wikipedia "Flaming Cliffs"
    laudat: {
      maailmankartta: { x: 9290.9, y: 1637.1 },
    },
    teksti: 'Bayanzag eli Liekehtivät kalliot on Gobin autiomaan alue Ömnögovin '
      + 'maakunnassa, ja siellä on tehty merkittäviä fossiililöytöjä. Lisänimen antoi '
      + 'yhdysvaltalainen paleontologi Roy Chapman Andrews, joka kävi paikalla 1920-luvulla '
      + 'ja tarkoitti sillä hiekkakivijyrkänteiden punaista tai oranssia väriä, joka hehkuu '
      + 'erityisesti auringonlaskussa. Mongoliankielinen nimi Bayanzag tarkoittaa '
      + '"saksaulista rikasta", ja toinen mongoliankielinen nimi on Ulaan Ereg, punaiset '
      + 'kalliot. Kuuluisimman löytönsä paikka teki, kun sieltä löydettiin ensimmäisen '
      + 'kerran dinosauruksenmunia; sen jälkeen alueelta on kaivettu esiin muun muassa '
      + 'velociraptoreja ja varhaisia nisäkkäitä. Fossiilien vieminen alueelta ilman lupaa '
      + 'on laitonta.',
    lahde: 'en-Wikipedia "Flaming Cliffs", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'hustain-nuruu',
    nimi: 'Hustain nuruu',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on tahi?',
      'Milloin puisto perustettiin?',
    ],
    korostukset: ['tahi|tahin'],
    nappi: 'Villihevonen palasi kotiin',
    // 105.87833 E / 47.765 N — en-Wikipedia "Hustai National Park"
    laudat: {
      maailmankartta: { x: 9362.6, y: 1486.2 },
    },
    teksti: 'Hustain nuruun kansallispuisto Töv-aimakin Hustain-vuorilla on 506 '
      + 'neliökilometriä laaja, ja Tuul-joki virtaa sen läpi. Mongolian hallitus julisti '
      + 'alueen erityisesti suojelluksi 1993, vuosi sen jälkeen kun tahin eli '
      + 'przewalskinhevosen palautushanke oli alkanut siellä. Puisto ulottuu Hentein '
      + 'vuorille ja Mongolian aron länsireunalle noin sadan kilometrin päähän '
      + 'Ulan Batorista länteen. Unescon Ihminen ja biosfääri -ohjelma hyväksyi sen 2002 '
      + 'maailman biosfäärialueiden verkostoon. Puistossa kasvaa 459 putkilokasvilajia, ja '
      + 'nisäkkäitä on kirjattu 44 lajia — muun muassa altainhirvi, mongoliangaselli, '
      + 'metsäkauris, villisika, argali, siperianmurmeli, susi, ilves ja arokissa.',
    lahde: 'en-Wikipedia "Hustai National Park", johdanto-osa sekä osiot "History" ja '
      + '"Wildlife" (tarkistettu 6.9.2026).',
  },
  {
    id: 'peurakivet',
    nimi: 'Peurakivet',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä kiviin on kaiverrettu?',
      'Kuinka vanhoja kivet ovat?',
    ],
    korostukset: ['khirigsuur|khirigsuur-hautakummut'],
    nappi: 'Lentävät peurat kivessä',
    // 101.37153 E / 47.75074 N — en-Wikipedia "Deer stones culture"
    laudat: {
      maailmankartta: { x: 9212.4, y: 1486.8 },
    },
    teksti: 'Peurakivet ovat muinaisia kaiverrettuja kivipaaseja, joita on ennen kaikkea '
      + 'Mongoliassa ja vähemmässä määrin naapurialueilla Siperiassa: tähän mennessä '
      + 'löydetyistä 1 500 kivestä 1 300 on Mongoliassa. Nimi tulee kiviin kaiverretuista '
      + 'lentävistä peuroista. Kivet kuuluvat paimentolaisperinteeseen, johon kuuluvat myös '
      + 'niiden naapureina seisovat khirigsuur-hautakummut ja muut monumentaaliset '
      + 'kivirakennelmat, joita Mongoliassa alettiin pystyttää pronssikaudella noin '
      + '3000–700 eaa. Peurakivet itse ovat tuon perinteen myöhäisimpiä muotoja, noin '
      + 'vuosilta 1400–700 eaa. eli myöhäiseltä pronssikaudelta ja varhaiselta '
      + 'rautakaudelta.',
    lahde: 'en-Wikipedia "Deer stones culture", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tovhon',
    nimi: 'Tövhön',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka luostarin perusti ja minkä ikäisenä?',
      'Mikä on soyombo-kirjaimisto?',
    ],
    korostukset: ['soyombo|soyombo-kirjaimiston'],
    nappi: 'Onnellinen syrjäinen paikka',
    // 102.255 E / 47.0122 N — en-Wikipedia "Tövkhön Monastery"
    laudat: {
      maailmankartta: { x: 9241.8, y: 1518 },
    },
    teksti: 'Tövhön on yksi Mongolian vanhimmista buddhalaisluostareista, ja se on '
      + 'Övörhangain aimakissa noin 47 kilometriä Harhorinista lounaaseen. Sen perusti '
      + '1648 tuolloin 14-vuotias Zanabazar, joka piti Shireet Ulaan Uulin vuorta 2 600 '
      + 'metrin korkeudessa suotuisana paikkana; ensimmäiset rakennukset nousivat, kun hän '
      + 'palasi opinnoistaan Tiibetistä 1653. Zanabazar oli lahjakas kuvanveistäjä, '
      + 'maalari ja muusikko, ja hän käytti luostaria kolmenkymmenen vuoden ajan omana '
      + 'erakkomajanaan — sen alkuperäinen nimi oli Bayasgalant Aglag Oron, onnellinen '
      + 'syrjäinen paikka. Siellä syntyivät monet hänen tunnetuimmista teoksistaan ja '
      + 'siellä hän kehitti soyombo-kirjaimiston. Oiraatit tuhosivat luostarin 1688, se '
      + 'kunnostettiin 1773, ja 1930-luvun lopun vainot vahingoittivat sitä pahoin.',
    lahde: 'en-Wikipedia "Tövkhön Monastery", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tsagaan-agui',
    nimi: 'Tsagaan agui',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhoja luolan löydöt ovat?',
      'Milloin luola löydettiin?',
    ],
    korostukset: ['kalsiumkarbonaatti|kalsiumkarbonaattikiteiden'],
    nappi: 'Kidekammio Gobin reunalla',
    // 101.17039 E / 44.71203 N — en-Wikipedia "Tsagaan Agui", osio
    // "Geographical location" (artikkelissa ei ole koordinaattipropia)
    laudat: {
      maailmankartta: { x: 9205.7, y: 1613.6 },
    },
    teksti: 'Tsagaan agui eli valkoinen luola on kerroksellinen paleoliittinen '
      + 'asuinpaikkaluola Lounais-Mongolian Gobissa, ja sen sisäkammion seinät ovat '
      + 'kalsiumkarbonaattikiteiden peitossa. Luolasta on kaivettu runsaasti '
      + 'arkeologista aineistoa, josta osa saattaa olla jopa noin 700 000 vuotta vanhaa. '
      + 'Luola on Bayanhongorin aimakissa Gobi-Altain eteläisillä juurilla, noin 40 '
      + 'kilometriä Bayan Ligin kuntakeskuksesta koilliseen. Mongolialaiset arkeologit '
      + 'löysivät sen 1972, ja neuvostoliittolais-mongolialainen retkikunta tutki sitä '
      + 'ensimmäisen kerran 1987; vuosina 1995–2000 kaivauksia teki '
      + 'mongolialais-venäläis-yhdysvaltalainen retkikunta. Buddhalaiset ovat käyttäneet '
      + 'luolaa ajoittain pyhiinvaelluskohteena, ja Mongolian valtio on suojellut sitä '
      + 'vuodesta 1988.',
    lahde: 'en-Wikipedia "Tsagaan Agui", johdanto-osa sekä osiot "Geographical location" '
      + 'ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tsingisin-patsas',
    nimi: 'Tšingisin patsas',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka korkea patsas on?',
      'Mitä 36 pylvästä tarkoittavat?',
    ],
    korostukset: ['Tsonjin Boldog|Tsonjin Boldogissa'],
    nappi: 'Neljäkymmentä metriä ruostumatonta terästä',
    // 107.52975 E / 47.80806 N — en-Wikipedia "Equestrian statue of Genghis Khan"
    laudat: {
      maailmankartta: { x: 9417.7, y: 1484.4 },
    },
    teksti: 'Tšingis-kaanin ratsastajapatsas on 40 metriä korkea ruostumattomasta teräksestä '
      + 'tehty veistos ja maailman korkein ratsastajapatsas. Se seisoo Tsonjin Boldogissa '
      + 'noin puolentoista kilometrin päässä Tuul-joesta ja 54 kilometriä Ulan Batorista '
      + 'itään — paikassa, josta Tšingis tarun mukaan löysi kultaisen ruoskan. Patsas on '
      + 'kymmenmetrisen vierailukeskuksen päällä, ja keskuksessa on 36 pylvästä, yksi '
      + 'kutakin kaania kohti Tšingisistä Ligdan-kaaniin. Sen suunnittelivat kuvanveistäjä '
      + 'D. Erdenebileg ja arkkitehti J. Enkhjargal, ja se avattiin 2008 mongolivaltakunnan '
      + 'perustamisen 800-vuotisjuhlaan. Kävijät nousevat hevosen rinnan ja kaulan läpi sen '
      + 'pään kohdalle, josta avautuu näköala joka suuntaan.',
    lahde: 'en-Wikipedia "Equestrian statue of Genghis Khan", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hovsgol',
    nimi: 'Hövsgöl',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi järveä kutsutaan Äitimereksi?',
      'Minne järven vedet päätyvät?',
    ],
    korostukset: ['Egiin gol|Egiin gol'],
    nappi: 'Mongolian makean veden varasto',
    // 100.5 E / 51.1 N — en-Wikipedia "Lake Khövsgöl"
    laudat: {
      maailmankartta: { x: 9183.3, y: 1342 },
    },
    teksti: 'Hövsgöl on tilavuudeltaan Mongolian suurin makean veden järvi ja pinta-alaltaan '
      + 'toiseksi suurin Uvs nuurin jälkeen; mongoliaksi sitä kutsutaan Äitimereksi. Järvi '
      + 'on maan luoteisosassa lähellä Venäjän rajaa itäisten Sajanien juurella, 1 645 '
      + 'metriä merenpinnan yläpuolella, 136 kilometriä pitkä ja 262 metriä syvä. Se on '
      + 'Aasian toiseksi vetisin makean veden järvi ja sisältää lähes 70 prosenttia '
      + 'Mongolian makeasta vedestä ja 0,4 prosenttia koko maailman makeasta vedestä. '
      + 'Järveen laskee vain pieniä sivujokia, ja se laskee etelästä Egiin gol -jokeen, '
      + 'joka yhtyy Selengaan ja päätyy lopulta Baikaljärveen: matkaa kertyy yli tuhat '
      + 'kilometriä ja pudotusta 1 169 metriä, vaikka järvien välinen suora on vain noin '
      + '200 kilometriä. Eteläpäässä on Hatgalin kylä.',
    lahde: 'en-Wikipedia "Lake Khövsgöl", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
];
