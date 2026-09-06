/*
 * MAASTOKOHTEET JA KOHTEET — VNM (Vietnam). Erä M8, Aasia 2, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Vietnamilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-vnm.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/VNM.json-tiedostoa
 * ei ole): Fansipan, Punainenjoki ja Hạ Longin lahti — vuori, joki ja
 * meri. Kaikki kolme osuvat maan fokuslehden rajaukseen
 * (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a), joka on
 * Vietnamilla x 9170,0…9549,7 ja y 2324,1…3014,6.
 *
 * NIMISÄÄNTÖ N3 KARSI KAKSI EHDOKASTA. Mekong on jo nimiönä kartalla
 * (js/packs/maailmankartta-nimet.js) ja Etelä-Kiinan meri on Kiinan
 * oma nosto (js/packs/maastokohteet-chn.js), joten Vietnamin joeksi
 * valittiin Punainenjoki ja mereksi Hạ Longin lahti. Sa Pa jäi pois
 * kolmannesta syystä: se on yhdeksän kilometrin päässä Fansipanista
 * eli kartalla kahden lautayksikön päässä, eikä kahta nimiölaatikkoa
 * saa siihen mahtumaan.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
 * Hoa Lư 25,2 lautayksikön päässä Hanoista, ja raja
 * KAUPUNGIN_KOHDALLA_SADE on 7. Juuri tästä säännöstä jäi pois Cổ Loan
 * linnoitus, joka on 4,9 yksikön päässä Hanoi-laatasta. Hanoin oma
 * kohdekartta (js/packs/maakartat.js hanoi, lat 21,0225–21,049 ja lon
 * 105,828–105,865) kattaa Vanhankaupungin ja keisarilinnan, ja sen
 * ruutuun osuva nosto kuuluu kohdekartan pisteelle eikä pääkartalle
 * (tests/nostot-kartalla.test.mjs) — sinne jäävät siis Long Biênin
 * silta, Thăng Longin keisarilinna ja Yhden pilarin pagodi.
 *
 * HERKÄT AIHEET (docs/aasia-tyoaineisto/spec-asia.md, SITOVA).
 * Vietnamin sodista kerrotaan asiallisesti ja vain lähteen katteessa:
 * Điện Biên Phủ on ensimmäisen Indokiinan sodan ratkaisutaistelu 1954
 * ja Mỹ Sơnin kortti mainitsee pommitusvaurion samalla tarkkuudella
 * kuin en-Wikipedian artikkeli. Nykypolitiikkaa ei ole yhdelläkään
 * kortilla.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_VNM = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'hoi-an',
    nimi: 'Hội An',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka monta vanhaa taloa on säilynyt?',
      'Milloin kaupunki oli kauppapaikkana tärkein?',
    ],
    korostukset: ['Japanilainen silta|Japanilainen silta'],
    nappi: 'Kauppasatama, joka ei muuttunut',
    // 108.33333 E / 15.88333 N — en-Wikipedia "Hoi An Old Town"
    laudat: {
      maailmankartta: { x: 9444.4, y: 2677.7 },
    },
    teksti: 'Hội Anin vanhakaupunki on Keski-Vietnamin rannikolla ja oli '
      + '1400-luvulta 1800-luvulle tärkeä kauppapaikka ulkomaisille '
      + 'kauppiaille. Vanhaankaupunkiin kuuluu 1 360 muinaista ja '
      + 'ainutlaatuista muistomerkkiä ja perintökohdetta, joista 1 068 on '
      + 'säilyneitä asuintaloja. Tunnetuin yksittäinen rakennus on '
      + 'Japanilainen silta. Kaupunki menetti asemansa satamana, kun laivat '
      + 'siirtyivät muualle, ja juuri siksi sen vanha rakennuskanta säilyi '
      + 'lähes koskemattomana. Alue liitettiin Unescon '
      + 'maailmanperintöluetteloon 12. joulukuuta 1999.',
    lahde: 'en-Wikipedia "Hoi An Old Town", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'huen-keisarikaupunki',
    nimi: 'Huế',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti keisarikaupungin ja milloin?',
      'Mitä Đại Nội tarkoittaa?',
    ],
    korostukset: ['Nguyễn|Nguyễn'],
    nappi: 'Keisarien suljettu piha',
    // 107.57778 E / 16.46972 N — en-Wikipedia "Imperial City of Huế"
    laudat: {
      maailmankartta: { x: 9419.3, y: 2657.6 },
    },
    teksti: 'Huến keisarikaupunki eli Đại Nội on muurien ympäröimä '
      + 'kuninkaallinen alue Huến kaupungissa, joka oli Vietnamin '
      + 'keisarillinen pääkaupunki Nguyễn-dynastian aikana. Sen sisällä ovat '
      + 'keisariperheen palatsit, pyhäköt, puutarhat ja mandariinien virastot. '
      + 'Keisari Gia Long rakennutti alueen 1804 uudeksi pääkaupungiksi, ja '
      + 'se laajennettiin nykyiseen mittaansa 1833. Ranskan siirtomaakaudella '
      + 'se toimi lähinnä seremoniallisena keskuksena ja keisarin asuntona. '
      + 'Monarkian päätyttyä 1945 alue kärsi pahoja vaurioita ja rappeutui '
      + 'Indokiinan sotien aikana 1980-luvulle asti; Unesco liitti sen '
      + 'maailmanperintöluetteloon 1993 osana Huến muistomerkkien '
      + 'kokonaisuutta, ja kunnostus on yhä kesken.',
    lahde: 'en-Wikipedia "Imperial City of Huế", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'my-son',
    nimi: 'Mỹ Sơn',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä temppelit rakensivat?',
      'Kuinka monta temppeliä laaksossa oli enimmillään?',
    ],
    korostukset: ['Champan|Champan'],
    nappi: 'Champan kuninkaiden laakso',
    // 108.11667 E / 15.76667 N — en-Wikipedia "Mỹ Sơn"
    laudat: {
      maailmankartta: { x: 9437.2, y: 2681.6 },
    },
    teksti: 'Mỹ Sơn on hylättyjen ja osin raunioituneiden shivalaisten '
      + 'temppelien ryhmä Keski-Vietnamissa. Champan kuninkaat rakensivat ne '
      + '300- ja 1200-lukujen välillä, ja ne on omistettu Shivalle, jota '
      + 'palvottiin siellä useilla paikallisilla nimillä — tärkein niistä oli '
      + 'Bhadreshvara. Temppelit ovat noin kaksi kilometriä leveässä laaksossa '
      + 'kahden vuorijonon välissä, 36 kilometriä Hội Anista etelään. Laakso '
      + 'oli Champan hallitsijasukujen uskonnollinen seremoniapaikka ja '
      + 'kuninkaallisten hautapaikka, ja enimmillään siinä oli yli 70 '
      + 'temppeliä sekä lukuisia sanskritin- ja tšaminkielisiä kivikirjoituksia. '
      + 'Mỹ Sơn lienee Kaakkois-Aasian mantereen pisimpään asuttu arkeologinen '
      + 'kohde, mutta suurin osa sen rakennuksista tuhoutui Yhdysvaltain '
      + 'pommituksissa yhden viikon aikana Vietnamin sodassa.',
    lahde: 'en-Wikipedia "Mỹ Sơn", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'phong-nha',
    nimi: 'Phong Nha',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka monta luolaa puistossa on?',
      'Mikä on maailman suurin luola?',
    ],
    korostukset: ['karsti|karsti'],
    nappi: 'Kolmesataa luolaa kalkkikivessä',
    // 106.15139 E / 17.53722 N — en-Wikipedia "Phong Nha–Kẻ Bàng National Park"
    laudat: {
      maailmankartta: { x: 9371.7, y: 2621 },
    },
    teksti: 'Phong Nha–Kẻ Bàng on kansallispuisto ja maailmanperintökohde '
      + 'Keski-Vietnamin rannikkoseudulla noin 500 kilometriä Hanoista '
      + 'etelään. Puisto on 2 000 neliökilometrin kalkkikivialueella, ja '
      + 'rajan takana Laosissa jatkuu toinen samankokoinen kalkkikivialue. '
      + 'Ydinalue on 857,54 neliökilometriä ja suojavyöhyke 1 954. Puisto '
      + 'perustettiin suojelemaan yhtä maailman kahdesta suurimmasta '
      + 'karstialueesta, jossa on 300 luolaa ja luolastoa; vuoden 2009 '
      + 'kartoituksessa luolastojen yhteenlasketuksi tunnetuksi pituudeksi '
      + 'tuli noin 126 kilometriä, ja suuri osa on yhä tutkimatta. Samana '
      + 'vuonna brittiläiset ja vietnamilaiset tutkijat löysivät Sơn Đoòngin, '
      + 'jota pidetään maailman suurimpana luolana.',
    lahde: 'en-Wikipedia "Phong Nha–Kẻ Bàng National Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'dien-bien-phu',
    nimi: 'Điện Biên Phủ',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi ranskalaiset valitsivat juuri tämän laakson?',
      'Mihin taistelu johti?',
    ],
    korostukset: ['tykistön|tykistön'],
    nappi: 'Laakso, joka päätti sodan',
    // 103.01556 E / 21.38694 N — en-Wikipedia "Battle of Điện Biên Phủ"
    laudat: {
      maailmankartta: { x: 9267.2, y: 2487.8 },
    },
    teksti: 'Điện Biên Phủ on laakso Luoteis-Vietnamissa, ja siellä käytiin '
      + '13. maaliskuuta – 7. toukokuuta 1954 ensimmäisen Indokiinan sodan '
      + 'ratkaisutaistelu. Ranskan unionin joukot linnoittautuivat eristettyyn '
      + 'leiriin, jota oli määrä huoltaa ilmateitse: tarkoitus oli katkaista '
      + 'huoltoreitit Laosiin ja pakottaa Viet Minh suureen taisteluun. '
      + 'Suunnitelma nojasi oletukseen, ettei vastustajalla ollut '
      + 'ilmatorjuntaa. Kenraali Võ Nguyên Giápin johdolla Viet Minh kuitenkin '
      + 'saartoi leirin ja raahasi raskaan tykistön vaikeakulkuisen maaston '
      + 'läpi vuorten takarinteille sekä kaivoi tunnelit, joista tykit '
      + 'vedettiin ampumaan ja takaisin suojaan. Kahden kuukauden piirityksen '
      + 'jälkeen varuskunta antautui, ja tappio johti Ranskan vetäytymiseen '
      + 'Indokiinasta vuoden 1954 Geneven sopimuksissa.',
    lahde: 'en-Wikipedia "Battle of Điện Biên Phủ", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ho-linnoitus',
    nimi: 'Hồ-linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuria kivilohkareet ovat?',
      'Milloin linnoitus rakennettiin?',
    ],
    korostukset: ['Tây Đô|Tây Đô'],
    nappi: 'Läntinen pääkaupunki kivestä',
    // 105.60472 E / 20.07806 N — en-Wikipedia "Citadel of the Hồ Dynasty"
    laudat: {
      maailmankartta: { x: 9353.5, y: 2533.3 },
    },
    teksti: 'Hồ-dynastian linnoitus on 1300-luvun lopun kivilinnoitus Thanh '
      + 'Hóan maakunnassa, ja sitä kutsutaan myös nimellä Tây Đô eli läntinen '
      + 'pääkaupunki. Se toimi Hồ-dynastian pääkaupunkina 1398–1407 ja pysyi '
      + 'tärkeänä hallinnon, talouden ja kulttuurin keskuksena 1500-luvulta '
      + '1700-luvulle. Linnoitus on suorakaide, jonka pohjois–eteläsivu on '
      + '870,5 metriä ja itä–länsisivu 883,5 metriä, ja siinä on neljä porttia '
      + 'ilmansuuntien mukaan. Muurit on ladottu kivilohkareista, joista '
      + 'kukin on keskimäärin kaksi metriä pitkä, metrin leveä ja 0,7 metriä '
      + 'paksu. Rakennustyö tehtiin 1397 feng shuin periaatteiden mukaan, ja '
      + 'porttien lisäksi linnoitus on nykyään enimmäkseen raunioina. Unesco '
      + 'liitti sen maailmanperintöluetteloon 27. kesäkuuta 2011.',
    lahde: 'en-Wikipedia "Citadel of the Hồ Dynasty", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hoa-lu',
    nimi: 'Hoa Lư',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka kauan Hoa Lư oli pääkaupunki?',
      'Minne pääkaupunki siirrettiin 1010?',
    ],
    korostukset: ['Đại Cồ Việt|Đại Cồ Việt'],
    nappi: 'Kalkkikivivuorten pääkaupunki',
    // 105.90667 E / 20.28611 N — en-Wikipedia "Hoa Lư Ancient Capital"
    laudat: {
      maailmankartta: { x: 9363.6, y: 2526.1 },
    },
    teksti: 'Hoa Lư oli Vietnamin pääkaupunki vuosina 968–1010. Se sijaitsee '
      + 'Ninh Bìnhin maakunnassa noin 90 kilometriä Hanoista etelään '
      + 'riisipeltojen keskellä, joita kalkkikivivuoret katkovat. Se oli '
      + 'itsenäisen Đại Cồ Việt -valtion talouden, politiikan ja kulttuurin '
      + 'keskus; valtion perusti 968 paikallinen sotapäällikkö Đinh Bộ Lĩnh '
      + 'sisällissodan ja Kiinan eteläisen Han-dynastian vastaisen kapinan '
      + 'jälkeen. Pääkaupunki kattoi noin 300 hehtaaria sisä- ja '
      + 'ulkolinnoituksineen: siihen kuului maavalleja, palatseja, temppeleitä '
      + 'ja pyhäkköjä, ja kalkkikivivuoret suojasivat sitä. Kun Lý Công Uẩn '
      + 'siirsi 1010 pääkaupungin Thăng Longiin eli nykyiseen Hanoihin, Hoa '
      + 'Lư jäi vanhaksi pääkaupungiksi; itse linnoitusta ei ole enää jäljellä.',
    lahde: 'en-Wikipedia "Hoa Lư Ancient Capital", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'po-nagar',
    nimi: 'Po Nagar',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenelle temppeli on omistettu?',
      'Mitä kultapatsaalle tapahtui 950?',
    ],
    korostukset: ['mukhalinga|mukhalinga'],
    nappi: 'Maan jumalattaren torni',
    // 109.19556 E / 12.26528 N — en-Wikipedia "Po Nagar"
    laudat: {
      maailmankartta: { x: 9473.2, y: 2800.6 },
    },
    teksti: 'Po Nagar on tšamien temppelitorni lähellä nykyistä Nha Trangia, '
      + 'ja se perustettiin joskus ennen vuotta 781 keskiaikaisessa Kautharan '
      + 'ruhtinaskunnassa. Temppeli on omistettu maan jumalattarelle Yan Po '
      + 'Nagarille, joka samastettiin hindujumalattariin Bhagavatiin ja '
      + 'Haritiin ja jota vietnamiksi kutsutaan nimellä Thiên Y Thánh Mẫu. '
      + 'Vuoden 781 kivikirjoituksen mukaan kuningas Satyavarman palautti '
      + 'valtansa alueelle ja kunnosti tuhotun temppelin: laivoilla saapuneet '
      + 'ryöstäjät olivat vieneet korut ja rikkoneet pyhäkön mukhalinga-kiven, '
      + 'ja aarre menetettiin lopullisesti. Kuningas Indravarman III käski '
      + '918 tehdä jumalattarelle kultapatsaan, mutta khmerien Rajendravarman '
      + 'II ryösti sen 950, ja 965 Jaya Indravarman I korvasi sen '
      + 'kivipatsaalla.',
    lahde: 'en-Wikipedia "Po Nagar", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'fansipan',
    nimi: 'Fansipan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorta kutsutaan Indokiinan katoksi?',
      'Miten korkeuslukema on muuttunut?',
    ],
    korostukset: ['Hoang Lien Son|Hoang Lien Son'],
    nappi: 'Indokiinan katto',
    // 103.775 E / 22.30333 N — en-Wikipedia "Fansipan"
    laudat: {
      maailmankartta: { x: 9292.5, y: 2455.7 },
    },
    teksti: 'Fansipan eli vietnamiksi Phan Xi Păng on Lào Cain maakunnan '
      + 'vuori Luoteis-Vietnamissa, yhdeksän kilometriä Sa Pasta lounaaseen '
      + 'Hoang Lien Sonin vuoristossa. Sen korkeus mitattiin ensimmäisen '
      + 'kerran 1909, jolloin lukemaksi tuli 3 143 metriä; myöhemmin lukema '
      + 'tarkennettiin 3 147,3 metriin. Vuori on koko Indokiinan niemimaan '
      + 'korkein kohta — Vietnamin, Laosin ja Kambodžan alueella ei ole '
      + 'korkeampaa — ja siitä tulee sen lisänimi Indokiinan katto. '
      + 'Hallinnollisesti huippu on Lai Châun Tam Đườngin piirin ja Sa Pan '
      + 'kaupungin rajalla.',
    lahde: 'en-Wikipedia "Fansipan", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'punainenjoki',
    nimi: 'Punainenjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki on punaruskea?',
      'Mistä joki alkaa?',
    ],
    korostukset: ['siirroksen|siirroksen'],
    nappi: 'Punaisen liejun joki',
    // 106.58889 E / 20.24528 N — en-Wikipedia "Red River (Asia)"
    laudat: {
      maailmankartta: { x: 9386.3, y: 2527.5 },
    },
    teksti: 'Punainenjoki eli Hồng-joki on 1 149 kilometriä pitkä joki, joka '
      + 'virtaa Kiinan Yunnanista Pohjois-Vietnamin halki Tonkininlahteen. Se '
      + 'on suhteellisen matala ja kuljettaa mukanaan runsaasti punertavaa '
      + 'lietettä, mistä sen punaruskea väri ja nimi tulevat. Kiinassa nimeen '
      + 'liittyy myös perinteinen ilmansuuntien värijärjestelmä, jossa '
      + 'punainen vastaa etelää. Jokeen liittyvä Punaisenjoen siirroksen '
      + 'vyöhyke oli C. Michael Hoganin mukaan osallisena koko Etelä-Kiinan '
      + 'meren synnyssä jo ainakin 37 miljoonaa vuotta sitten.',
    lahde: 'en-Wikipedia "Red River (Asia)", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ha-long',
    nimi: 'Hạ Longin lahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mitä nimi Hạ Long tarkoittaa?',
      'Kuinka monta saarta lahdessa on?',
    ],
    korostukset: ['laskeutuva lohikäärme|laskeutuva lohikäärme'],
    nappi: 'Laskeutuvan lohikäärmeen lahti',
    // 107.2 E / 20.9 N — en-Wikipedia "Hạ Long Bay"
    laudat: {
      maailmankartta: { x: 9406.7, y: 2504.7 },
    },
    teksti: 'Hạ Longin lahti on Koillis-Vietnamin rannikolla, ja nimi '
      + 'tarkoittaa laskeutuva lohikäärme. Lahdessa on tuhansia eri kokoisia '
      + 'ja muotoisia kalkkikivikarsteja ja luotoja, ja se on '
      + 'maailmanperintökohde. Pinta-alaa on noin 1 553 neliökilometriä ja '
      + 'saaria 1 969, joista useimmat ovat kalkkikiveä; ydinalueella on 334 '
      + 'neliökilometrillä 775 luotoa. Lahden kalkkikivi on muotoutunut 500 '
      + 'miljoonan vuoden aikana vaihtelevissa oloissa, ja karstin kehitys '
      + 'trooppisen kostean ilmaston vaikutuksesta on kestänyt 20 miljoonaa '
      + 'vuotta. Alueella elää 14 kotoperäistä kasvilajia ja 60 kotoperäistä '
      + 'eläinlajia.',
    lahde: 'en-Wikipedia "Hạ Long Bay", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
