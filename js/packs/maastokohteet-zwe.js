/*
 * MAASTOKOHTEET — ZWE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ZWE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ZWE.json. Työkalu laskee laudan
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
 * Zimbabwen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Sisämaavaltion vedet ovat kaksi suurta rajajokea; Sambesin merkki on Victorian putousten kohdalla, joka on joen kuuluisin paikka ja Zimbabwen rajalla. Maalla on jo fokuskohde (Suuri Zimbabwe), jota ei toisteta täällä.
 */
export const MAASTOKOHTEET_ZWE = [
  {
    id: 'mountnyangani',
    nimi: 'Mount Nyangani',
    tyyppi: 'vuori',
    kysymykset: [
      'Millainen on Nyanganin lakitasanko?',
      'Miksi itärinteet ovat metsäisemmät kuin läntiset?',
    ],
    nappi: 'Zimbabwen korkein vuori',
    // 32.8417 E / -18.3 N — en-Wikipedia "Mount Nyangani"
    laudat: {
      maailmankartta: { x: 6928.1, y: 3828.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Nyangani on Zimbabwen korkein vuori: 2 592 metriä Nyangan kansallispuistossa '
      + 'maan itäosassa. Varsinainen huippu on vain nelisenkymmentä metriä ympäristöään '
      + 'korkeampi kalliopaljastuma laajan, kumpuilevan ylätasangon laella. Kosteammilla '
      + 'itärinteillä kasvaa ikivihreää metsää, lännempänä avautuu heinämaata.',
    lahde: 'en-Wikipedia "Mount Nyangani", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sambesi',
    nimi: 'Sambesi',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka leveät Victorian putoukset ovat?',
      'Mitä tarkoittaa Mosi-oa-Tunya?',
    ],
    korostukset: ['Victorian putoukset|Victorian putouksiin'],
    nappi: 'Joki joka syöksyy Victorian putouksiin',
    // 25.8567 E / -17.9244 N — Victorian putoukset Zimbabwen ja Sambian rajalla (en-Wikipedia "Victoria Falls"); joen artikkelin koordinaatti 36,470 / -18,571 on suistossa Mosambikissa
    laudat: {
      maailmankartta: { x: 6695.2, y: 3815.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sambesi on Afrikan neljänneksi pisin joki ja suurin Intian valtamereen laskevista: 2 '
      + '574 kilometriä Sambiasta Mosambikin rannikolle. Zimbabwen ja Sambian rajalla se '
      + 'syöksyy Victorian putouksiin, yhteen maailman suurimmista vesiputouksista, jonka '
      + 'leveys on 1 708 metriä. Putousten paikallinen lozinkielinen nimi Mosi-oa-Tunya '
      + 'tarkoittaa jylisevää savua.',
    lahde: 'en-Wikipedia "Zambezi" ja "Victoria Falls", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'limpopo',
    nimi: 'Limpopo',
    tyyppi: 'joki',
    kysymykset: [
      'Kuka eurooppalainen näki joen ensimmäisenä?',
      'Kuinka pitkän matkan Limpopo on rajajokena?',
    ],
    nappi: 'Rajajoki Intian valtamereen',
    // 30 E / -22.21 N — Beitbridgen tienoo Etelä-Afrikan vastaisella rajalla; artikkelin koordinaatti 33,511 / -25,206 on suulla Mosambikissa
    laudat: {
      maailmankartta: { x: 6833.3, y: 3964 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Limpopo saa alkunsa Etelä-Afrikasta ja virtaa noin 1 750 kilometriä suuressa kaaressa '
      + 'Mosambikin läpi Intian valtamereen; noin 640 kilometrin matkalla se erottaa '
      + 'Etelä-Afrikan Botswanasta ja Zimbabwesta. Se on Sambesin jälkeen toiseksi suurin '
      + 'Intian valtamereen laskeva Afrikan joki. Ensimmäinen joen nähnyt eurooppalainen oli '
      + 'Vasco da Gama, joka ankkuroi sen suulle vuonna 1498.',
    lahde: 'en-Wikipedia "Limpopo River", johdanto ja osa Course (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (7) — ERÄ M13, ETELÄINEN AFRIKKA, 6.9.2026 ─────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Zimbabwella oli ennen tätä erää kolme maastokohdetta ja YKSI kohde
   * — Suuri Zimbabwe, joka asuu maan omassa pakissa
   * js/packs/fokuskohteet-zwe.js. Sitä EI ole toistettu täällä, joten
   * kahdeksan kohteen tavoitteesta puuttui seitsemän. Eläintäkyä eikä
   * skandaalia ei ollut lainkaan.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 6627,0…6981,7 ja y 3694,6…4013,4).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Mutare 68,1 lautayksikön päässä Mosambik-laatasta ja Hwange 114,3
   * yksikön päässä Viktorian putouksista. Raja KAUPUNGIN_KOHDALLA_SADE
   * on 7. VIKTORIAN PUTOUKSET ON PELIKAUPUNKI, joten putoukset eivät
   * ole kohteena eikä putousten sillasta ole omaa merkkiä.
   *
   * KHAMI JÄI POIS NIMIÖLIMITYKSEN TAKIA. Maailmanperintökohde on vain
   * 14,4 lautayksikön päässä Matobon kukkuloista, ja kahdesta mahtui
   * kartalle yksi; Matobo valittiin, koska sen kortti kantaa sekä
   * kalliotaiteen että suojelualueen. Naletale kertoo saman
   * kivimuuriperinteen tarinan 37 yksikön päässä Khamista.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'matobo',
    nimi: 'Matobo',
    tyyppi: 'muu',
    kysymykset: [
      'Miten pyöreät graniittikummut syntyivät?',
      'Miksi leopardeja on täällä niin paljon?',
    ],
    korostukset: ['valaanselkädwala|valaanselkädwaloita'],
    nappi: 'Kaljujen päiden kukkulat',
    // 28.508 E / -20.55 N — en-Wikipedia "Matobo National Park"
    laudat: {
      maailmankartta: { x: 6783.6, y: 3906.1 },
    },
    teksti: 'Matobon kansallispuisto on Matobon eli Matoposin kukkuloiden ydin, graniittisten '
      + 'kummuiden ja metsäisten laaksojen alue, joka alkaa noin 35 kilometriä Bulawayosta '
      + 'etelään. Kukkulat syntyivät yli kaksi miljardia vuotta sitten, kun graniitti työntyi '
      + 'pintaan; eroosio on hionut siitä sileitä "valaanselkädwaloita" ja rikkonaisia, '
      + 'lohkareiden peittämiä kumpuja. Erään perimätiedon mukaan kuningas Mzilikazi Khumalo '
      + 'vastasi paikallisten sanaan madombo puoliksi leikillään "kutsutaan niitä matoboksi" '
      + '— ndebelen kielen sanaleikki kaljuista päistä. Kukkulat kattavat noin 3 100 '
      + 'neliökilometriä, josta 424 on kansallispuistoa. Puistossa on 175 lintu-, 88 '
      + 'nisäkäs-, 39 käärme- ja 16 kalalajia, ja alue on maailman tihein leopardikanta, '
      + 'koska tamaanit muodostavat puolet niiden ravinnosta. Unesco kirjasi Matobon '
      + 'kukkulat kulttuuriperintökohteeksi 2003.',
    lahde: 'en-Wikipedia "Matobo National Park", johdanto-osa ja osio "Fauna" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'mana-pools',
    nimi: 'Mana Pools',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi eläimet kerääntyvät tänne kuivalla kaudella?',
      'Mitä kävi puiston sarvikuonoille?',
    ],
    korostukset: ['tulvatasanko|tulvatasanko'],
    nappi: 'Sambesin kuivuvat lammet',
    // 29.33333 E / -15.75 N — en-Wikipedia "Mana Pools National Park"
    laudat: {
      maailmankartta: { x: 6811.1, y: 3740.8 },
    },
    teksti: 'Mana Pools on 2 196 neliökilometrin kansallispuisto Pohjois-Zimbabwessa alemman '
      + 'Sambesin varrella. Sadekauden jälkeen tulvatasanko muuttuu laajaksi järvien '
      + 'sarjaksi, ja kun lammet vähitellen kuivuvat ja vetäytyvät, ne vetävät puoleensa '
      + 'suuria eläimiä vedenhakuun — siksi alue on yksi Afrikan tunnetuimmista '
      + 'eläintenkatselualueista. Puisto kirjattiin maailmanperintöluetteloon 1984 yhdessä '
      + 'Sapin ja Cheworen riistaeläinalueiden kanssa, yhteensä 6 766 neliökilometriä, ja '
      + 'Ramsar-kosteikoksi 2013. Kirjaamisen aikaan se oli yksi Afrikan tärkeimmistä '
      + 'itäisen mustan sarvikuonon turvapaikoista noin 500 eläimellä; vuoteen 1994 mennessä '
      + 'salametsästys oli vähentänyt kannan kymmeneen yksilöön, jotka siirrettiin muualle '
      + 'suojaan.',
    lahde: 'en-Wikipedia "Mana Pools National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'hwange',
    nimi: 'Hwange',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri puisto on?',
      'Mitä juottopaikoilla tapahtui 2013?',
    ],
    korostukset: ['salametsästys|salametsästys'],
    nappi: 'Zimbabwen suurin suojelualue',
    // 26.955 E / -18.735 N — en-Wikipedia "Hwange National Park"
    laudat: {
      maailmankartta: { x: 6731.8, y: 3843.2 },
    },
    teksti: 'Hwangen kansallispuisto, entinen Wankie Game Reserve, on Zimbabwen suurin '
      + 'luonnonsuojelualue: noin 14 600 neliökilometriä maan luoteisosassa Bulawayon ja '
      + 'Viktorian putousten välisen päätien varrella. Puisto perustettiin 1928, ja lähin '
      + 'taajama on Dete. Sitä harkitaan osaksi viiden maan Kavango–Zambezin rajat ylittävää '
      + 'suojelualuetta. Salametsästys on ollut toistuva ongelma: lokakuussa 2013 paljastui, '
      + 'että salametsästäjät olivat myrkyttäneet juottopaikan syanidilla ja tappaneet suuren '
      + 'määrän afrikannorsuja — suojelijoiden mukaan eteläisen Afrikan suurin laiton '
      + 'eläintappo 25 vuoteen.',
    lahde: 'en-Wikipedia "Hwange National Park", johdanto-osa ja osio "Poaching incidents" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chinhoyin-luolat',
    nimi: 'Chinhoyin luolat',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Chirorodziva tarkoittaa?',
      'Miksi luolien metsästä ei saanut kaataa puita?',
    ],
    korostukset: ['dolomiitti|dolomiittiin'],
    nappi: 'Pudonneiden lampi',
    // 30.125 E / -17.35 N — en-Wikipedia "Chinhoyi Caves"
    laudat: {
      maailmankartta: { x: 6837.5, y: 3795.6 },
    },
    teksti: 'Chinhoyin luolat, entiseltä nimeltään Sinoian luolat, ovat kalkkikiveen ja '
      + 'dolomiittiin syöpynyt luolasto Pohjois-Keski-Zimbabwessa noin yhdeksän kilometriä '
      + 'Chinhoyin kaupungista luoteeseen. Alue julistettiin kansallispuistoksi 1955, ja se on '
      + 'Zimbabwen laajin yleisölle avoin luolasto. Luolan altaan paikallinen nimi '
      + 'Chirorodziva tarkoittaa "pudonneiden lampea": nimi juontuu vuoden 1830 tapahtumasta, '
      + 'jossa angoni-heimon soturit hyökkäsivät paikallisten kimppuun ja heittivät uhrinsa '
      + 'luolaan. Luolat kuvasi ensimmäisenä Frederick Courtney Selous 1888. Paikalla on '
      + 'tärkeä sija afrikkalaisessa perinneuskonnossa: luolissa tehtiin sadetta pyytäviä '
      + 'rituaaleja, ja niitä ympäröi pyhä metsä, josta ei saanut kaataa puita.',
    lahde: 'en-Wikipedia "Chinhoyi Caves", johdanto-osa sekä osiot "History" ja "Religion" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'naletale',
    nimi: 'Naletale',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Naletalen muurit?',
      'Mikä oli Torwan valtio?',
    ],
    korostukset: ['rozvi|rozvien'],
    nappi: 'Butuan kuningaskunnan pääkaupunki',
    // 29.53056 E / -19.88111 N — en-Wikipedia "Naletale"
    laudat: {
      maailmankartta: { x: 6817.7, y: 3882.9 },
    },
    teksti: 'Naletalen rauniot ovat Matabelemaan eteläosassa noin 25 kilometriä Shanganista '
      + 'itään ja Danangomben raunioiden itäpuolella. Rauniot luetaan kalangojen Torwan '
      + 'valtion perinnöksi, ja niiden arvellaan olevan 1600-luvulta; paikka oli asuttu vielä '
      + '1700- ja 1800-luvuilla rozvien hallitessa aluetta. Kyse on Butuan kuningaskunnan '
      + 'Torwa-dynastian pääkaupungin jäänteistä. Naletale julistettiin kansalliseksi '
      + 'muistomerkiksi 1960.',
    lahde: 'en-Wikipedia "Naletale", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'birchenough-bridge',
    nimi: 'Birchenough Bridge',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä toista siltaa tämä muistuttaa ja miksi?',
      'Kuka lepää sillan alla?',
    ],
    korostukset: ['riippusilta|riippusilta'],
    nappi: 'Sydneyn sillan pikkuveli Savella',
    // 32.34306 E / -19.96306 N — en-Wikipedia "Birchenough Bridge"
    laudat: {
      maailmankartta: { x: 6911.4, y: 3885.7 },
    },
    teksti: 'Birchenough Bridge on silta Save-joen yli Manicalandin maakunnassa Zimbabwessa, '
      + 'ja se yhdistää Chipingen ja Buheran. Sillan rahoitti Beit Trust, jonka '
      + 'puheenjohtajana toimi sir Henry Birchenough — silta on nimetty hänen mukaansa, ja '
      + 'hänen tuhkansa on haudattu rakenteen alle. Hinnaksi tuli 145 000 puntaa. Suunnittelija '
      + 'Ralph Freeman oli myös Sydneyn satamasillan rakennesuunnittelija, ja sillat '
      + 'muistuttavat siksi toisiaan, vaikka Birchenough on vain kaksi kolmasosaa australialaisen '
      + 'sillan pituudesta. Dorman Long rakensi sen valmiiksi 1935; 329 metrin kaarena se oli '
      + 'silloin maailman kolmanneksi pisin yhden kaaren riippusilta. Sillan viereen kasvoi '
      + 'kylä, josta tuli pienviljelyalueen keskus.',
    lahde: 'en-Wikipedia "Birchenough Bridge", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'mutare',
    nimi: 'Mutare',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaupunki siirrettiin kolmesti?',
      'Mitä sana mutare tarkoittaa?',
    ],
    korostukset: ['Beira|Beiran'],
    nappi: 'Kaupunki, joka muutti radan perässä',
    // 32.63333 E / -18.96667 N — en-Wikipedia "Mutare"
    laudat: {
      maailmankartta: { x: 6921.1, y: 3851.2 },
    },
    teksti: 'Mutare, vuoteen 1982 Umtali, on Manicalandin maakunnan pääkaupunki ja Zimbabwen '
      + 'kolmanneksi suurin kaupunki. Se perustettiin 1897 linnakkeeksi kahdeksan kilometrin '
      + 'päähän Mosambikin rajasta, ja Beiran satamaan on vain 290 kilometriä — siitä '
      + 'lisänimi "Zimbabwen portti merelle". Nimi tulee sanasta utare, joka tarkoittaa '
      + 'rautaa tai mahdollisesti kultaa, ja se annettiin luultavasti joelle, jonka varren '
      + 'Penhalongan laaksosta löydettiin kultaa. Kaupunki on liikkunut kartalla kolmesti: '
      + 'ensimmäinen Fort Umtali perustettiin 1890 Tsamben ja Mutaren jokien väliin, 1891 '
      + 'paikka siirrettiin nykyiselle Old Mutaren kohdalle 14 kilometriä pohjoisemmaksi, ja '
      + 'kun Beiran ja Bulawayon välistä rautatietä alettiin rakentaa 1896, kaupunki '
      + 'siirrettiin kolmannen kerran lähemmäs rataa — Britannian Etelä-Afrikan yhtiö maksoi '
      + 'asukkaille muuton kustannukset.',
    lahde: 'en-Wikipedia "Mutare", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
];

