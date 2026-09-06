/*
 * MAASTOKOHTEET — ZAF. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ZAF --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ZAF.json. Työkalu laskee laudan
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
 * Etelä-Afrikan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kaksi vuorta: Mafadi on maan korkein kohta, mutta Pöytävuori on sen tunnetuin — molemmat mahtuvat neljän kohteen kiintiöön.
 */
export const MAASTOKOHTEET_ZAF = [
  {
    id: 'mafadi',
    nimi: 'Mafadi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Mafadi ei ole itsenäinen vuorenhuippu?',
      'Missä on koko eteläisen Afrikan korkein piste?',
    ],
    korostukset: ['Drakensberg|Drakensbergin'],
    nappi: 'Etelä-Afrikan korkein kohta',
    // 29.3571 E / -29.2023 N — en-Wikipedia "Mafadi"
    laudat: {
      maailmankartta: { x: 6811.9, y: 4213.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etelä-Afrikan korkein kohta ei erään määritelmän mukaan ole vuori lainkaan. Mafadi on '
      + '3 446 metriä ja sijaitsee Lesothon rajalla, mutta himalajalaisen säännön mukaan — '
      + 'huipun on kohottava vähintään seitsemän prosenttia omasta korkeudestaan ympäristönsä '
      + 'yläpuolelle — se on vain Lesothon Makhekan sivuhuippu. Sillä mitalla Etelä-Afrikan '
      + 'korkein todellinen vuorenhuippu on Champagne Castle, vaikka maan korkein piste on '
      + 'kiistatta Mafadi. Koko eteläisen Afrikan katto on kuitenkin rajan takana: Lesothon '
      + 'Thabana Ntlenyana, 3 482 metriä. Mafadille noustaan Njesuthin leiripaikalta, ja pelkkä '
      + 'Drakensbergin jyrkänteen juurelle pääsy vie tavallisesti kaksi päivää.',
    lahde: 'en-Wikipedia "Mafadi", johdanto-osa ja osio "Ascent" (tarkistettu 1.9.2026).',
  },
  {
    id: 'poytavuori',
    nimi: 'Pöytävuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten tasaiselle laelle pääsee?',
      'Mikä on fynbos?',
    ],
    korostukset: ['fynbos|fynbosia'],
    nappi: 'Kapkaupungin tasalakinen maamerkki',
    // 18.4099 E / -33.9622 N — en-Wikipedia "Table Mountain"; korkeus on Maclearin kivimerkin kohdalta
    laudat: {
      maailmankartta: { x: 6447, y: 4388.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pöytävuori on Kapkaupungin ylle kohoava tasalakinen maamerkki, jonka korkein kohta, '
      + 'Maclearin kivimerkki vuodelta 1865, on 1 086 metrissä. Laelle pääsee köysiradalla tai '
      + 'jalan, ja vuorella kasvaa 2 285 kasvilajia, joista noin neljä viidesosaa on seudulle '
      + 'omaleimaista fynbosia. Pöytävuoren kansallispuisto on Etelä-Afrikan vierailluin.',
    lahde: 'en-Wikipedia "Table Mountain", johdanto-osa ja osa Maclear\'s Beacon (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä Afrikan suurjoet laskevat tähän valtamereen?',
      'Kuinka suuri valtameri on?',
    ],
    korostukset: ['latimeria|Latimeria'],
    nappi: 'Valtameri maan itärannalla',
    // 31.6 E / -30.6 N — ulappa Durbanin edustalla; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 6886.7, y: 4264 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: '1930-luvulla Etelä-Afrikan rannikolta nousi vedestä kala, jonka lahkon oli luultu '
      + 'kuolleen sukupuuttoon 66 miljoonaa vuotta sitten. Latimeria kuuluu varsieväkaloihin, '
      + 'jotka tunnetaan jo 410 miljoonan vuoden takaa, ja juuri Intian valtameri oli '
      + 'piilottanut sen. Valtameri on maailman kolmanneksi suurin — yli 70 miljoonaa '
      + 'neliökilometriä eli noin viidennes maapallon vesipinnasta — ja kaikista lämpimin. Sen '
      + 'länsiraja on piirretty tähän maahan: 20. itäinen pituuspiiri Agulhasniemeltä etelään '
      + 'erottaa sen Atlantista. Etelä-Afrikan itäranta avautuu valtamerelle, ja suurimmat '
      + 'siihen laskevat Afrikan joet ovat Sambesi ja Limpopo.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa sekä osiot "Extent and data" ja "Marine '
      + 'life", sekä "Limpopo River", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'oranjejoki',
    nimi: 'Oranjejoki',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Oranje saa alkunsa?',
      'Miksi joki ei kulje suurten kaupunkien kautta?',
    ],
    nappi: 'Etelä-Afrikan pisin joki',
    // 21.25 E / -28.45 N — Upington joen keskijuoksulla; artikkelin koordinaatti 16,452 / -28,633 on suulla
    laudat: {
      maailmankartta: { x: 6541.7, y: 4185.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Oranjejoki on Etelä-Afrikan pisin joki: 2 432 kilometriä Lesothon Drakensbergin '
      + 'vuorilta länteen Atlanttiin. Matkallaan se muodostaa osia Lesothon ja Namibian '
      + 'vastaisista rajoista sekä useista maakuntarajoista, mutta Upingtonia lukuun ottamatta '
      + 'se ei kulje yhdenkään suuren kaupungin kautta.',
    lahde: 'en-Wikipedia "Orange River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M13, ETELÄINEN AFRIKKA, 6.9.2026 ─────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Etelä-Afrikalla oli ennen tätä erää neljä maastokohdetta ja
   * eläintäky (afrikanpingviini) mutta ei yhtäkään kohdetta eikä
   * skandaalia. Tavoite maata kohti on kahdeksan KOHDETTA ja kolme
   * MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 6283,8…7028,3 ja y 3881,5…4507,8).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Stellenbosch 32,4 lautayksikön päässä Kapkaupunki-laatasta ja
   * kaukaisin iSimangaliso 262,6 yksikön päässä Kimberleystä. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7. KIMBERLEY JA KAPKAUPUNKI OVAT
   * PELIKAUPUNKEJA, joten Big Hole ei ole kohteena lainkaan;
   * timanttikuumeen kertoo maan skandaalikortti Hopetownin kohdalla.
   *
   * KAKSI EHDOKASTA KAATUI NIMIÖLIMITYKSEEN: Robben Island on 5,9
   * lautayksikön päässä maan omasta Pöytävuori-merkistä ja Blyde
   * River 10,9 yksikön päässä Pilgrim's Restistä. Graaff-Reinet
   * jätettiin pois toisesta syystä: sen artikkelin nykytila on
   * helmikuussa 2026 tehty nimenmuutos eli päivänpolitiikkaa
   * (Raamattu: nykypolitiikka pois).
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'sterkfonteinin-luolat',
    nimi: 'Sterkfonteinin luolat',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka oli rouva Ples?',
      'Miksi Little Footia on kaivettu esiin vuosikymmeniä?',
    ],
    korostukset: ['australopithecus|australopithecus'],
    nappi: 'Ihmiskunnan kehdon luolat',
    // 27.7346 E / -26.0157 N — en-Wikipedia "Sterkfontein"
    laudat: {
      maailmankartta: { x: 6757.8, y: 4098.4 },
    },
    teksti: 'Sterkfontein — afrikaansiksi "vahva lähde" — on kalkkikiviluolasto Gautengissa '
      + 'noin 40 kilometriä Johannesburgista luoteeseen, ja se on maailman rikkaimpia '
      + 'varhaisten ihmisen sukulaisten löytöpaikkoja. Alue tunnetaan nimellä Cradle of '
      + 'Humankind, ihmiskunnan kehto, ja se on ollut maailmanperintökohde vuodesta 2000. '
      + 'Professori Raymond Dartin oppilaat ja tohtori Robert Broom aloittivat järjestelmälliset '
      + 'kaivaukset 1936, ja luolista löytyi ensimmäinen aikuinen australopithecus, mikä '
      + 'vahvisti Dartin väitteen Taungin lapsen sukulaisuudesta ihmiseen. Vuonna 1947 Broom '
      + 'löysi lähes kokonaisen aikuisen Australopithecus africanus -kallon, joka tunnetaan '
      + 'lempinimellä rouva Ples. Vuonna 1997 Ronald J. Clarke löysi toisen lajin lähes '
      + 'täydellisen luurangon, Little Footin, jota on irrotettu ympäröivästä breksiasta yhä; '
      + 'löytöjä on kertynyt noin 500.',
    lahde: 'en-Wikipedia "Sterkfontein", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'kruger',
    nimi: 'Kruger',
    tyyppi: 'muu',
    kysymykset: [
      'Milloin alue rauhoitettiin ensimmäisen kerran?',
      'Kuinka pitkä puisto on pohjoisesta etelään?',
    ],
    korostukset: ['biosfäärialue|biosfäärialueeseen'],
    nappi: 'Etelä-Afrikan ensimmäinen kansallispuisto',
    // 31.5 E / -24 N — en-Wikipedia "Kruger National Park"
    laudat: {
      maailmankartta: { x: 6883.3, y: 4026.9 },
    },
    teksti: 'Krugerin kansallispuisto kattaa 19 623 neliökilometriä Limpopon ja Mpumalangan '
      + 'maakunnissa Etelä-Afrikan koillisosassa. Se ulottuu 360 kilometriä pohjoisesta '
      + 'etelään ja 65 kilometriä idästä länteen, ja hallinto on Skukuzassa. Etelä-Afrikan '
      + 'tasavallan edeltäjä, Etelä-Afrikan tasavalta eli Transvaal, rauhoitti osia alueesta '
      + 'ensimmäisen kerran 1898, ja kansallispuisto siitä tuli 1926 — maan ensimmäinen. '
      + 'Puiston perustajana pidetään presidentti Paul Krugeria, jonka mukaan se on nimetty. '
      + 'Alue kuuluu Kruger to Canyons -biosfäärialueeseen, ja se on maan tärkeimpiä '
      + 'matkailukohteita: kävijöitä oli 2024 lähes kaksi miljoonaa.',
    lahde: 'en-Wikipedia "Kruger National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'isandlwana',
    nimi: 'Isandlwana',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi aseiden ylivoima ei ratkaissut?',
      'Mikä on "puhvelin sarvet ja rinta"?',
    ],
    korostukset: ['assegai|assegai-keihäin'],
    nappi: 'Päivä, jolloin keihäät voittivat kiväärit',
    // 30.6525 E / -28.35639 N — en-Wikipedia "Battle of Isandlwana"
    laudat: {
      maailmankartta: { x: 6855.1, y: 4182.4 },
    },
    teksti: 'Isandlwanan taistelu käytiin 22. tammikuuta 1879 ja oli Britannian ja '
      + 'zulukuningaskunnan sodan toinen suuri yhteenotto. Yksitoista päivää sen jälkeen kun '
      + 'britit olivat hyökänneet zulukuningaskuntaan, noin 20 000 zulusoturia kävi osan '
      + 'brittien pääkolonnan kimppuun; kolonnassa oli noin 1 800 brittiläistä, siirtomaa- ja '
      + 'paikallissotilasta sekä noin 350 siviiliä. Zulut oli aseistettu pääosin '
      + 'assegai-keihäin ja lehmännahkakilvin, joskin heillä oli myös musketteja ja vanhoja '
      + 'kivääreitä; briteillä oli nykyaikaiset Martini–Henry-takaaladattavat kiväärit, kaksi '
      + 'seitsemän naulan vuoristotykkiä ja Hale-rakettipatteri. Aseiden ero ei ratkaissut: '
      + 'zulut liikkuivat nopeasti, hyökkäsivät sivustoille perinteisessä "puhvelin sarvet ja '
      + 'rinta" -muodostelmassa ja lopulta murtivat brittien rivit. Yli 1 300 sotilasta kuoli, '
      + 'ja zulujen tappioiksi arvioidaan 1 000–3 000.',
    lahde: 'en-Wikipedia "Battle of Isandlwana", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'cape-agulhas',
    nimi: 'Cape Agulhas',
    tyyppi: 'muu',
    kysymykset: [
      'Missä Atlantti ja Intian valtameri kohtaavat?',
      'Miksi niemi on saanut nimen "neulojen niemi"?',
    ],
    korostukset: ['klipperireitti|klipperireitin'],
    nappi: 'Afrikan eteläisin kärki',
    // 20 E / -34.83322 N — en-Wikipedia "Cape Agulhas"
    laudat: {
      maailmankartta: { x: 6500, y: 4421.3 },
    },
    teksti: 'Cape Agulhas on kallioinen niemi Länsi-Kapissa: Etelä-Afrikan eteläisin kohta ja '
      + 'samalla koko Afrikan maantieteellinen eteläkärki. Kansainvälisen merikartoitusjärjestön '
      + 'mukaan siitä alkaa perinteinen raja Atlantin ja Intian valtameren välillä. Niemi on '
      + 'noin puoli leveysastetta eli 55 kilometriä etelämpänä kuin Hyväntoivonniemi, jota '
      + 'usein luullaan mantereen kärjeksi. Portugalilaiset antoivat nimen Cabo das Agulhas, '
      + '"neulojen niemi". Merenkulkijoille se on ollut klipperireitin vaarallinen kohta, ja '
      + 'se lasketaan toisinaan suurten niemien joukkoon. Niemi on Overbergin alueella 170 '
      + 'kilometriä Kapkaupungista kaakkoon, ja sen vieressä on L\'Agulhasin pikkukaupunki.',
    lahde: 'en-Wikipedia "Cape Agulhas", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'stellenbosch',
    nimi: 'Stellenbosch',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka istutti kaupungin tammet?',
      'Kuinka vanha kaupunki on?',
    ],
    korostukset: ['Simon van der Stel|Simon van der Stel'],
    nappi: 'Tammien kaupunki',
    // 18.86139 E / -33.93667 N — en-Wikipedia "Stellenbosch"
    laudat: {
      maailmankartta: { x: 6462, y: 4387.6 },
    },
    teksti: 'Stellenbosch on kaupunki Länsi-Kapin maakunnassa noin 50 kilometriä '
      + 'Kapkaupungista itään, Eerste-joen rannalla Stellenboschin vuoren juurella. Sitä '
      + 'kutsutaan tammien kaupungiksi — afrikaansiksi Eikestad — niiden lukuisten tammien '
      + 'takia, joita kaupungin perustaja Simon van der Stel istutti kaduille ja pihoille. '
      + 'Stellenbosch on Etelä-Afrikan toiseksi vanhin kaupunki: se perustettiin 1679, vain '
      + 'Kapkaupunki on vanhempi. Sen historia tekee siitä suositun matkailukohteen.',
    lahde: 'en-Wikipedia "Stellenbosch", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'pilgrims-rest',
    nimi: 'Pilgrim\'s Rest',
    tyyppi: 'historia',
    kysymykset: [
      'Miten salaisuus muuttui kultaryntäykseksi?',
      'Miksi kaupunki ei ole juuri muuttunut?',
    ],
    korostukset: ['kultakenttä|kultakentäksi'],
    nappi: 'Vuoden 1873 kultaryntäys',
    // 30.75667 E / -24.90778 N — en-Wikipedia "Pilgrim's Rest, South Africa"
    laudat: {
      maailmankartta: { x: 6858.6, y: 4059 },
    },
    teksti: 'Pilgrim\'s Rest on pieni museokaupunki Mpumalangassa, ja se on suojeltu '
      + 'maakunnallisena kulttuuriperintökohteena. Se oli Transvaalin toinen kultakenttä ja '
      + 'veti puoleensa kullankaivajien ryntäyksen 1873, pian sen jälkeen kun viiden '
      + 'kilometrin päässä sijainneet MacMacin kaivuut olivat alkaneet. Huuhdontakullan löysi '
      + 'kaivosmies Alec Patterson, joka huuhtoi puroa MacMacin väentungoksesta väsyneenä ja '
      + 'piti löytönsä salassa — ryntäys syntyi vasta kun toinen kaivaja, William Trafford, '
      + 'rekisteröi valtauksensa kultakomissaarille. Kun alue julistettiin virallisesti '
      + 'kultakentäksi syyskuussa 1873, kaupunkiin kertyi äkkiä 1 500 asukasta. Pintakulta '
      + 'ehtyi 1880-luvulla, valtaukset ostettiin yhtiöille ja siirryttiin syvempään '
      + 'malmilouhintaan; 1970-luvulla lähes muuttumaton kaupunki muuttui matkailukohteeksi.',
    lahde: 'en-Wikipedia "Pilgrim\'s Rest, South Africa", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vredefortin-kraatteri',
    nimi: 'Vredefortin kraatteri',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri kraatteri oli syntyessään?',
      'Mikä todisti törmäyksen 1961?',
    ],
    korostukset: ['iskukartio|iskukartioita'],
    nappi: 'Maan vanhimpia törmäysjälkiä',
    // 27.5 E / -27 N — en-Wikipedia "Vredefort impact structure"
    laudat: {
      maailmankartta: { x: 6750, y: 4133.6 },
    },
    teksti: 'Vredefortin törmäysrakenne on yksi Maan suurimmista. Alkuperäisen kraatterin '
      + 'läpimitaksi on arvioitu 170–300 kilometriä, mutta itse kraatteri on kulunut pois: '
      + 'jäljellä on vain vääntynyt peruskallio Vapaavaltion maakunnassa, ja sen keskikohouma '
      + 'tunnetaan noin 100–120 kilometrin levyisenä Vredefortin kupuna. Törmäys tapahtui '
      + 'paleoproterotsooisella kaudella 2,023 miljardia (± 4 miljoonaa) vuotta sitten, mikä '
      + 'tekee siitä yhden vanhimmista tunnetuista törmäysrakenteista Maan päällä. '
      + 'Ulkoavaruudesta tulleen syyn todistivat 1961 amerikkalaisgeologit Robert S. Dietz ja '
      + 'Robert B. Hargraves löytämällä kalliosta iskukartioita, vaikka törmäystä oli '
      + 'ehdotettu jo 1937. Unesco lisäsi kuvun maailmanperintöluetteloon 2005.',
    lahde: 'en-Wikipedia "Vredefort impact structure", johdanto-osa ja osio "Age" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'isimangaliso',
    nimi: 'iSimangaliso',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi iSimangaliso tarkoittaa?',
      'Kuinka pitkälle rannikolle puisto ulottuu?',
    ],
    korostukset: ['kosteikko|kosteikkopuisto'],
    nappi: 'Ihme Lucia-järven rannoilla',
    // 32.56667 E / -27.65 N — en-Wikipedia "iSimangaliso Wetland Park"
    laudat: {
      maailmankartta: { x: 6918.9, y: 4156.9 },
    },
    teksti: 'iSimangaliso on kosteikkopuisto KwaZulu-Natalin itärannikolla noin 235 kilometriä '
      + 'Durbanista pohjoiseen, ja se on Etelä-Afrikan kolmanneksi suurin suojelualue. Puisto '
      + 'ulottuu 280 kilometrin matkalle rannikkoa Mosambikin rajalta Lucia-järven suiston '
      + 'eteläpuolelle, ja siihen kuuluu noin 3 280 neliökilometriä luonnontilaisia '
      + 'ekosysteemejä. Sen aiempi nimi oli Greater St. Lucia Wetland Park, ja nykyinen nimi '
      + 'otettiin käyttöön 1. marraskuuta 2007: zulun sana isimangaliso tarkoittaa ihmettä. '
      + 'Nimi juontuu kertomuksesta, jossa Shakan alamainen lähetettiin tsongien maahan ja '
      + 'palatessaan kuvasi näkemäänsä kauneutta ihmeeksi. Alue on ollut Ramsar-kosteikko '
      + 'vuodesta 1986.',
    lahde: 'en-Wikipedia "iSimangaliso Wetland Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

