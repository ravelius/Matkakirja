/*
 * MAASTOKOHTEET — TWN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TWN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TWN.json. Työkalu laskee laudan
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
 * Taiwanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Saari on kapea, joten kaksi kohdetta riittää: korkein huippu ja salmi, joka erottaa saaren mantereesta.
 */
export const MAASTOKOHTEET_TWN = [
  {
    id: 'yushan',
    nimi: 'Yu Shan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten meren pohja päätyy vuoren huipuksi?',
      'Miksi vuorella on ollut monta nimeä?',
    ],
    korostukset: ['Jadevuori'],
    nappi: 'Merestä noussut huippu',
    // 120.9572 E / 23.47 N — en-Wikipedia "Yushan (mountain)"
    laudat: {
      maailmankartta: { x: 9865.2, y: 2414.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yu Shan, Jadevuori, on Taiwanin korkein vuori: 3 952 metriä, mikä tekee Taiwanista '
      + 'maailman neljänneksi korkeimman saaren. Seutu oli aikoinaan merta — huippu on noussut '
      + 'nykyiseen korkeuteensa, kun Euraasian laatta työntyy Filippiinienmeren laatan yli. '
      + 'Japanin vallan aikana vuori tunnettiin nimellä Niitaka ja sitä ennen Morrisonina; '
      + 'nykyään sitä suojelee Yushanin kansallispuisto.',
    lahde: 'en-Wikipedia "Yushan (mountain)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'taiwaninsalmi',
    nimi: 'Taiwaninsalmi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi salmea kutsuttiin Mustaksi ojaksi?',
      'Kuka oli Koxinga?',
    ],
    korostukset: ['Koxinga|Koxinga'],
    nappi: 'Salmi kahden rannan välissä',
    // 119.9283 E / 24.8111 N — en-Wikipedia "Taiwan Strait"
    laudat: {
      maailmankartta: { x: 9830.9, y: 2367.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Salmen vanhin nimi on Musta oja. Se on käännös hokkien- ja hakkankielisestä nimestä, '
      + 'ja se kertoo enemmän kuin nykyinen: 180 kilometriä leveä vesi erotti vuosituhansien '
      + 'ajan mantereen han-kulttuurin Taiwanin alkuperäiskansoista, vaikka hakka- ja '
      + 'hoklo-kauppiaat kulkivat sen yli. Kapeimmillaan salmi on 126 kilometriä. '
      + 'Portugalilaiset, espanjalaiset ja hollantilaiset perustivat sen rannoille tukikohtia '
      + 'Ming-kaudella sekä kauppaa että ryöstöretkiä varten, ja hollantilaiset karkotti sieltä '
      + 'Zheng Chenggong eli Koxinga, joka perusti 1661 Tungningin kuningaskunnan. Hänen '
      + 'pojanpoikansa antautui Qing-dynastialle, kun amiraali hävisi Penghun taistelun '
      + 'keskellä salmea vuonna 1683. Pohjoisessa salmi yhtyy Itä-Kiinan mereen, etelässä '
      + 'Etelä-Kiinan mereen.',
    lahde: 'en-Wikipedia "Taiwan Strait", johdanto-osa sekä osiot "Names" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
  /* ───── KOHTEET (8) JA YKSI MAASTOKOHDE — ERÄ M10, AASIA 3, 6.9.2026
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Taiwanilla oli ennen tätä erää kaksi maastokohdetta eikä yhtäkään
   * kohdetta. Tavoite maata kohti on kahdeksan KOHDETTA ja kolme
   * MAASTOKOHDETTA, joten tästä erästä tuli kahdeksan kohdetta ja
   * kolmas maastokohde, Penghun saaristo.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 9753,6…9922,5 ja y 2328,8…2490,9).
   *
   * SAARI ON AHDAS. Koko Taiwan mahtuu laudalla noin 170 × 160
   * lautayksikön ruutuun, ja Taipei-laatta on siinä keskellä, joten
   * KAUPUNGIN_KOHDALLA_SADE (7) ja nimiöiden keskinäinen limitys
   * karsivat ehdokkaita enemmän kuin lähdeaineisto. Kaksi kaatunutta
   * ehdokasta on mitattu: Sun Moon Lake on 6,0 lautayksikön päässä
   * Taipei-laatasta eli kaupungin kohdalla, ja Alishan on 5,4 yksikön
   * päässä maan omasta Yu Shan -merkistä. Lähin uusi merkki on Taroko
   * 12,6 yksikön päässä Taipeista.
   *
   * TAIWANIN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/spec-asia.md):
   * hallinnollinen asema neutraalina tosiasiana, ei suvereniteetti-
   * kysymystä kummankaan kehyksellä. Siksi kortit kertovat 1600–1900-
   * luvun Formosasta, kaupasta, kansoista ja tekniikasta; Kinmen
   * jätettiin pois kokonaan, koska sen artikkeli on nykyisen
   * salmikiistan varassa.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'taroko',
    nimi: 'Taroko',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä tekee rotkosta harvinaisen?',
      'Milloin puisto perustettiin?',
    ],
    korostukset: ['marmori|marmorin'],
    nappi: 'Rotko puhtaan marmorin läpi',
    // 121.33333 E / 24.16667 N — en-Wikipedia "Taroko National Park"
    laudat: {
      maailmankartta: { x: 9877.8, y: 2390.2 },
    },
    teksti: 'Taroko on yksi Taiwanin yhdeksästä kansallispuistosta, ja se on saanut nimensä '
      + 'Tarokon rotkosta, jonka Liwu-joki on uurtanut. Rotko on yksi maailman kolmesta '
      + 'joen kaivertamasta rotkosta, joka kulkee kokonaan puhtaan marmorin läpi — kaksi '
      + 'muuta ovat Bhedaghat Intiassa ja Trigrad Bulgariassa. Puisto perustettiin 12. '
      + 'joulukuuta 1937 nimellä Tsugitaka-Taroko, kun Taiwan kuului Japanin '
      + 'keisarikuntaan; se lakkautettiin 1945 ja perustettiin uudelleen 28. marraskuuta '
      + '1986. Nykyinen puisto on 92 000 hehtaaria, ja sen alueella tai sen ympärillä on '
      + '27 yli kolmen kilometrin korkuista huippua sekä Qingshuin jyrkänne.',
    lahde: 'en-Wikipedia "Taroko National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'santo-domingo',
    nimi: 'Santo Domingo',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnaketta sanotaan punatukkaisten linnaksi?',
      'Kuka linnakkeessa asui 1800-luvulla?',
    ],
    korostukset: ['Âng-mn̂g-siâⁿ|Âng-mn̂g-siâⁿ'],
    nappi: 'Punatukkaisten linna Tamsuissa',
    // 121.4332 E / 25.1753 N — en-Wikipedia "Fort Santo Domingo"
    laudat: {
      maailmankartta: { x: 9881.1, y: 2354.5 },
    },
    teksti: 'Santo Domingo on linnake Tamsuissa Pohjois-Taiwanissa. Manilasta käsin toiminut '
      + 'Espanjan siirtomaahallinto rakensi sen 1628 aluksi puusta ja uusi sen kivestä, '
      + 'mutta käski purkaa sen 1637 alkaen säästösyistä; hollantilainen Itä-Intian '
      + 'kauppakomppania sai sen tietää, hyökkäsi 1641 ja voitti 1642. Hollantilaiset '
      + 'rakensivat linnakkeen uudelleen 1644 ja nimesivät sen Fort Antonioksi. Koska '
      + 'han-siirtolaiset kutsuivat hollantilaisia punatukkaisiksi, linnake sai '
      + 'lisänimen Âng-mn̂g-siâⁿ, punatukkaisten linna. Qing-hallinto korjasi sen '
      + '1724 ja rakensi ympärysmuurin neljine portteineen. Vuodesta 1868 linnake oli '
      + 'vuokrattuna Britannian konsulaatiksi, ja viereen nousi kaksikerroksinen '
      + 'englantilaistyylinen konsulinasunto; konsulaattina se toimi aina vuoteen 1972.',
    lahde: 'en-Wikipedia "Fort Santo Domingo", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jiufen',
    nimi: 'Jiufen',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kylän nimi tulee?',
      'Miten kulta löytyi?',
    ],
    korostukset: ['yhdeksän osaa|yhdeksän osaa'],
    nappi: 'Kultakylä portaiden varrella',
    // 121.843 E / 25.107 N — en-Wikipedia "Jiufen"
    laudat: {
      maailmankartta: { x: 9894.8, y: 2356.9 },
    },
    teksti: 'Jiufen on entinen kultakaivoskylä Ruifangin alueella Pohjois-Taiwanissa, ja se '
      + 'tunnetaan kapeasta, mutkittelevasta vanhastakadustaan, jonka varrella on '
      + 'puoteja, teehuoneita ja ravintoloita. Nimi on peräisin Qing-kauden alusta: '
      + 'eristyneessä kylässä asui yhdeksän perhettä, ja kun tavaraa tuotiin kaupungista, '
      + 'kylä pyysi aina yhdeksän osaa. Taiwanin kullasta on mainintoja jo vuodelta 1430, '
      + 'ja sitä löysivät vuoroin saaren asukkaat, japanilaiset vierailijat, '
      + 'hollantilaiset ja Koxingan miehet, mutta vasta Qing-kauden lopulla ymmärrettiin, '
      + 'kuinka rikkaita saaren kultakentät olivat. Vuonna 1890 rautatietyömiehet löysivät '
      + 'kultahippuja, ja siitä alkoi kylän nousu. Nykyisin Jiufenissa asuu noin 1 600 '
      + 'ihmistä.',
    lahde: 'en-Wikipedia "Jiufen", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'lukang',
    nimi: 'Lukang',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä kaupungin nimi tarkoittaa?',
      'Miksi kaupunki taantui?',
    ],
    korostukset: ['peurasatama|peurasatama'],
    nappi: 'Peurasatama, joka kieltäytyi radasta',
    // 120.43333 E / 24.05 N — en-Wikipedia "Lukang"
    laudat: {
      maailmankartta: { x: 9847.8, y: 2394.3 },
    },
    teksti: 'Lukang on kunta Changhuan piirikunnan luoteisosassa Taiwanin länsirannikolla, '
      + 'vastapäätä Taiwaninsalmea. Nimi tarkoittaa peurasatamaa ja tulee hollantilaiskauden '
      + 'peurannahkakaupasta. Kukoistuskaudellaan 1785–1845 kaupunki oli tärkeä satama, ja '
      + 'sen väkiluku nousi 20 000:een: se oli Taiwanin toiseksi suurin kaupunki Tainanin '
      + 'jälkeen ja suurempi kuin silloinen kolmossija Bangka, joka on nykyään osa Taipeita. '
      + 'Riisikauppa toi vaurautta, ja 1800-luvun lopulla mahtavimmat suvut olivat Huang ja '
      + 'Koo. Sitten sataman suu liettyi umpeen, ja kun kaupunki vielä kieltäytyi '
      + 'päästämästä rautatietä alueensa läpi, se menetti asemansa. Vuonna 2012 Lukang '
      + 'nimettiin yhdeksi Taiwanin kymmenestä parhaasta pikkukaupungista matkailijalle.',
    lahde: 'en-Wikipedia "Lukang", johdanto-osa sekä osiot "Name" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chaotian',
    nimi: 'Chaotian',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka on Mazu?',
      'Mistä temppelin jumalankuva tuotiin?',
    ],
    korostukset: ['Mazu|Mazulle'],
    nappi: 'Merenjumalattaren temppeli Beigangissa',
    // 120.30444 E / 23.56778 N — en-Wikipedia "Chaotian Temple"
    laudat: {
      maailmankartta: { x: 9843.5, y: 2411.3 },
    },
    teksti: 'Chaotianin temppeli Beigangissa Yunlinin piirikunnassa on pyhitetty Mazulle, '
      + 'merenkulkijoiden jumalattarelle, joka on keskiajan Fujianissa eläneen Lin '
      + 'Moniangin jumalallistettu hahmo. Temppeli rakennettiin 1700, ja siitä tuli yksi '
      + 'Taiwanin tärkeimmistä Mazu-temppeleistä; se tunnetaan ylenpalttisen koristeellisesta '
      + 'arkkitehtuuristaan, ja sinne saapuu vuosittain yli miljoona pyhiinvaeltajaa. '
      + 'Vuonna 1694 munkki Shubi pyysi, että Mazun kuva tuotaisiin Beigangiin jumalattaren '
      + 'kotiseudulta Meizhousta Fujianista; vuonna 1700 Chen Li-Shun lahjoitti tontin ja '
      + 'keräsi varat rakennukseen. Beigang oli 1600-luvulla yksi Taiwanin tärkeimmistä '
      + 'satamista, ja temppeli kasvoi kaupungin ja sen talouden mukana.',
    lahde: 'en-Wikipedia "Chaotian Temple", johdanto-osa sekä osiot "Mazuism" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fort-zeelandia',
    nimi: 'Fort Zeelandia',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka linnoituksen rakensi ja milloin?',
      'Miksi Formosa oli hollantilaisille tärkeä?',
    ],
    korostukset: ['Anping|Anpingissa'],
    nappi: 'Kymmenen vuoden linnoitus Anpingissa',
    // 120.160919 E / 23.001747 N — en-Wikipedia "Fort Zeelandia (Taiwan)"
    laudat: {
      maailmankartta: { x: 9838.7, y: 2431.2 },
    },
    teksti: 'Fort Zeelandia oli linnoitus, jonka hollantilainen Itä-Intian kauppakomppania '
      + 'rakensi kymmenessä vuodessa 1624–1634 Anpingissa, nykyisessä Tainanissa, '
      + 'kolmenkymmenenkahdeksan vuotta kestäneen Formosan-valtansa aikana. Paikka on '
      + 'kantanut monta nimeä: Fort Orange, Fort Anping ja Taiwanin kaupunki, ja sen '
      + 'nykyinen kiinankielinen nimi tarkoittaa Anpingin vanhaa linnaketta. 1600-luvulla, '
      + 'kun eurooppalaiset purjehtivat Aasiaan kaupan perässä, Formosasta tuli yksi '
      + 'Itä-Aasian tärkeimmistä kauttakulkupaikoista ja Zeelandiasta kansainvälinen '
      + 'kauppakeskus. Saaren arvo hollantilaisille oli ennen muuta strateginen: '
      + 'linnoituksesta lähtevä laiva pääsi pohjoiseen Japaniin, länteen Fujianiin tai '
      + 'etelään Vietnamiin, Thaimaahan, Indonesiaan, Kambodžaan, Intiaan, Iraniin tai '
      + 'Eurooppaan.',
    lahde: 'en-Wikipedia "Fort Zeelandia (Taiwan)", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'wushantou',
    nimi: 'Wushantou',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuka tekoaltaan suunnitteli?',
      'Miksi allasta kutsutaan korallilammeksi?',
    ],
    korostukset: ['Yoichi Hatta|Yoichi Hatta'],
    nappi: 'Aasian suurin tekoallas 1930',
    // 120.39024 E / 23.20569 N — en-Wikipedia "Wushantou Reservoir"
    laudat: {
      maailmankartta: { x: 9846.3, y: 2424.1 },
    },
    teksti: 'Wushantoun tekoallas Tainanissa on saanut lempinimekseen korallilampi, koska '
      + 'sen rantaviiva mutkittelee kuin koralli. Altaan suunnitteli insinööri Yoichi '
      + 'Hatta, ja valmistuessaan 1930 se oli Aasian suurin ja maailman kolmanneksi suurin '
      + 'tekoallas. Rakentaminen alkoi 1920, ja tavoite oli kastella yli sadantuhannen '
      + 'hehtaarin peltoala Chiananin tasangolla; altaan valmistuttua tasangosta tuli '
      + 'merkittävä riisintuottaja ja sadot saatiin korjatuksi kolmesti vuodessa. Allas '
      + 'rakennettiin yhdessä samaisen Hattan suunnitteleman Chiananin kanavan kanssa, ja '
      + 'padossa käytettiin harvinaista puolihydraulista täyttötapaa, jossa hienojakoinen '
      + 'aines huuhdotaan vesisuihkuilla paikoilleen penkereen päähän. Kohde on ollut '
      + 'vuodesta 2009 maailmanperintöehdokas.',
    lahde: 'en-Wikipedia "Wushantou Reservoir", johdanto-osa ja osio "Engineering" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sanxiantai',
    nimi: 'Sanxiantai',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi tarkoittaa?',
      'Millainen silta saarelle vie?',
    ],
    korostukset: ['kolmen kuolemattoman|kolmen kuolemattoman'],
    nappi: 'Merilohikäärmeen muotoinen silta',
    // 121.41652 E / 23.12477 N — en-Wikipedia "Sanxiantai"
    laudat: {
      maailmankartta: { x: 9880.6, y: 2426.9 },
    },
    teksti: 'Sanxiantai on ranta-alue saarineen Chenggongin kunnassa Taitungin '
      + 'piirikunnassa Taiwanin itärannikolla. Ranta on kymmenen kilometriä pitkä. Nimi '
      + 'tarkoittaa kolmen kuolemattoman tasannetta, ja se viittaa saaren kolmeen '
      + 'jättimäiseen kallioon. Paikka tunnetaan parhaiten pitkästä jalankulkusillasta, '
      + 'joka on muotoiltu merilohikäärmeeksi ja joka yhdistää mantereen rannan '
      + 'suurimpaan saareen. Vuoden 1755 kartalla alue esiintyy nimellä Sansana.',
    lahde: 'en-Wikipedia "Sanxiantai", johdanto-osa ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'penghu',
    nimi: 'Penghu',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka monta saarta saaristossa on?',
      'Milloin saaristo tuli ensi kerran kirjoihin?',
    ],
    korostukset: ['Magong|Magong'],
    nappi: 'Yhdeksänkymmentä saarta salmen keskellä',
    // 119.5775 E / 23.5675 N — en-Wikipedia "Penghu"
    laudat: {
      maailmankartta: { x: 9819.3, y: 2411.3 },
    },
    teksti: 'Penghu eli Pescadores on 90 saaren ja luodon saaristo keskellä Taiwaninsalmea, '
      + 'noin viidenkymmenen kilometrin päässä Taiwanin pääsaaresta Penghun salmen takana. '
      + 'Maata on kaikkiaan 141 neliökilometriä, ja suurin kaupunki on Magong suurimmalla '
      + 'saarella. Saaristo tulee historian kirjoihin Tang-dynastian aikana, ja Song-kaudella '
      + 'siellä asui jo kiinalaisia; hallinnollisena yksikkönä se liitettiin Kiinaan 1281. '
      + 'Sen jälkeen saaria hallitsi keisarillinen Kiina, ja välissä olivat lyhyet '
      + 'eurooppalaisjaksot: hollantilaiset 1622–1624 ja ranskalaiset 1885. Vuonna 1895 '
      + 'saaristo luovutettiin Japanille, jonka valta päättyi 1945.',
    lahde: 'en-Wikipedia "Penghu", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
