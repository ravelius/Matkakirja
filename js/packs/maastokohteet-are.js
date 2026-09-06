/*
 * MAASTOKOHTEET — ARE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ARE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ARE.json. Työkalu laskee laudan
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
 * Arabiemiraattien maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maan tunnusmaasto on Rub al-Khalin hiekka-aavikko, ja se on mukana aavikkona: tyyppi 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js), kuten SAU:n Rub al-Khalissa ja MNG:n Gobissa. Merkki on Liwan keitaan dyyneillä Abu Dhabin emiraatissa — aavikon ARE-osuudessa, ei SAU:n merkin päällä.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Arabiemiirikunnilla oli kolme karttamerkkiä ja yksi kohde (Rub
 * al-Khali). Erä tuo seitsemän uutta KOHDETTA ja kolmannen
 * MAASTOKOHTEEN (Sir Bani Yas). Koordinaatit koneella (`import { laudat
 * } from tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista), tekstit käsin raakatekstistä. Kuvaton erä,
 * vain maailmankartan rivi.
 *
 * KAUPUNKIETÄISYYS. Maan ainoa pelikaupunki on Dubai, ja etäisyys
 * mitattiin sen lisäksi jokaiseen muuhun js/packs/maailmankartta.js
 * CITIES-kaupunkiin. Lähin uusi merkki on Mleiha 23,4 lautayksikön
 * päässä Dubaista — selvästi yli KAUPUNGIN_KOHDALLA_SADE-rajan (7) ja
 * kaupunkikaton säteen (8). Tästä säännöstä jäivät pois Al Shindagha ja
 * Al Fahidi, jotka ovat Dubain kohdalla ja kuuluvat kaupungin
 * kohdekartalle.
 *
 * KAKSI EHDOKASTA KARSIUTUI NIMIÖTILAN TAKIA: Al Ainin keidas on 0,9
 * lautayksikön päässä Hilin merkistä ja Dhayah'n linnake 4,6 yksikön
 * päässä Jebel Jaisista, joten kummankin nimiö olisi jäänyt naapurin
 * alle (`node tools/tarkista-nimiolimitys.mjs`). Yksikään lisätty nimi
 * ei ole laudan omassa nimitaulussa (js/packs/maailmankartta-nimet.js),
 * joten sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * ARE:lla rajaus on olemassa, joten vartio pätee ja jokainen piste on
 * tarkistettu sitä vasten. Vartiota ei ole muutettu.
 */
export const MAASTOKOHTEET_ARE = [
  {
    id: 'rubalkhali',
    nimi: 'Rub al-Khali',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Keitä Liwan keitailla asui ennen öljyä?',
      'Kuinka korkeaksi dyyni voi kasvaa?',
    ],
    korostukset: ['Liwa|Liwan'],
    nappi: 'Tyhjän neljänneksen reuna',
    // 53.78 E / 23 N — Liwan keitaan dyynit; en-Wikipedia "Liwa Oasis" keskipiste 23°08′N 53°46′E, merkki keitaan kaaren eteläpuolen hiekalla
    laudat: {
      maailmankartta: { x: 7626, y: 2431.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rub al-Khali, Tyhjä neljännes, on noin 650 000 neliökilometrin hiekka-aavikko '
      + 'Saudi-Arabian, Omanin, Arabiemiraattien ja Jemenin alueella, ja sen dyynit kasvavat '
      + 'jopa 250-metrisiksi. Arabiemiraattien osuus on Abu Dhabin emiraatin etelää, jossa '
      + 'hiekan pohjoisreunaa seuraa Liwan keitaiden satakilometrinen kaari — Abu Dhabin ja '
      + 'Dubain hallitsijasukujen synnyinseutu, jonka Bani Yas -heimo eli taatelitarhoista ja '
      + 'kausittaisesta helmenpyynnistä. Liwan laidalla kohoaa noin 300-metrinen Moreebin '
      + 'dyyni.',
    lahde: 'en-Wikipedia "Rub\' al Khali" ja "Liwa Oasis", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'jebeljais',
    nimi: 'Jebel Jais',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta ei ole huippu?',
      'Mikä Hajarin vuoristo on?',
    ],
    korostukset: ['Hajar|Hajarin'],
    nappi: 'Korkein kohta — mutta ei huippu',
    // 56.1842 E / 25.9531 N — en-Wikipedia "Jebel Jais"
    laudat: {
      maailmankartta: { x: 7706.1, y: 2326.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jebel Jais on Hajarin vuoriston vuori Ras al-Khaimahin emiraatin ja Omanin rajalla. '
      + 'Sen varsinainen huippu, 1 934 metriä, on Omanin puolella — Arabiemiraattien korkein '
      + 'kohta on saman vuoren rinteellä 1 892 metrissä, kohouma jolla on vain kymmenisen '
      + 'metriä omaa korkeutta. Korkein kokonaan maan puolella oleva huippu on viereinen Jabal '
      + 'ar Rahrah, 1 691 metriä.',
    lahde: 'en-Wikipedia "Jebel Jais", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Hormuzinsalmi on?',
      'Miksi lahden rannoilla sukellettiin helmiä?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmen'],
    nappi: 'Matala meri helmien ja öljyn päällä',
    // 53 E / 25.3 N — ulappa Abu Dhabin edustalla; artikkelin oma keskipiste 52 / 26 on lähellä
    laudat: {
      maailmankartta: { x: 7600, y: 2350.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Arabian niemimaan ja Iranin välinen sisämeri, Arabianmeren ja Intian '
      + 'valtameren jatke. Avomerelle siitä pääsee vain idästä, kapean Hormuzinsalmen kautta '
      + 'Omaninlahteen, ja luoteisrannan muodostaa Shatt al-Arabin suisto. Lähes koko '
      + 'Arabiemiraattien rannikko ja kaikki sen suuret kaupungit ovat tämän lahden rannalla.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — seitsemän kohdetta ja Sir Bani Yas.
   * ============================================================== */
  {
    id: 'sirbaniyas',
    nimi: 'Sir Bani Yas',
    tyyppi: 'saari',
    kysymykset: [
      'Mikä on suolakupoli?',
      'Kuka oli Gasparo Balbi?',
    ],
    korostukset: ['suolakupolin|suolakupolin'],
    nappi: 'Saari, jolta löytyi luostari',
    // 52.6 E / 24.33333 N — en-Wikipedia "Sir Bani Yas"
    // Lähin pelikaupunki: Doha 49,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7586.7, y: 2384.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sir Bani Yas on Arabiemiirikuntien suurin luonnonsaari, 17,5 kilometriä pitkä ja '
      + 'yhdeksän leveä, sataseitsemänkymmentä kilometriä Abu Dhabista lounaaseen. Se on '
      + 'miljoonia vuosia sitten kohonneen suolakupolin harja. Saarelta tunnetaan '
      + 'kolmekymmentäkuusi muinaisjäännöstä: pronssikautinen Dilmun-kauppapaikka noin 1800 eaa. '
      + 'ja itäisen kristillisen kirkon luostari noin vuodelta 600 jaa. — ensimmäinen '
      + 'islamia edeltävä kristillinen kohde koko maassa. Luostari löydettiin 1992, ja '
      + 'nestoriolaiset käyttivät sitä noin vuoteen 750 asti. Eurooppalaisessa kirjallisuudessa '
      + 'saari mainittiin ensi kerran noin 1590, kun venetsialainen jalokivikauppias Gasparo '
      + 'Balbi luetteli sen nimellä Sirbeniast saareksi, jonka ympäriltä löytyi usein helmiä.',
    lahde: 'en-Wikipedia "Sir Bani Yas", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hili',
    nimi: 'Hili',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on falaj?',
      'Milloin taatelipalmua alettiin viljellä Arabiassa?',
    ],
    korostukset: ['Umm al-Nar|Umm al-Narin'],
    nappi: 'Vanhin keidasviljely ja sormenjäljet',
    // 55.78991 E / 24.29288 N — en-Wikipedia "Hili Archaeological Park"
    // Lähin pelikaupunki: Dubai 24,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7693, y: 2385.7 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Hili on Arabiemiirikuntien suurin pronssikautinen kohde ja ajoittuu kolmannelle '
      + 'vuosituhannelle eaa. Kunnostettu Hilin suurhauta on kahdentoista metrin läpimittainen '
      + 'torni ja kuuluu Umm al-Narin kulttuuriin. Vanhin asuinpaikka Hili 8 on noin vuodelta '
      + '3000 eaa., ja siitä on löydetty Kaakkois-Arabian varhaisimmat todisteet keidas'
      + 'viljelystä: vehnää, ohraa ja taatelipalmua. Ensimmäisellä vuosituhannella eaa. kaivetut '
      + 'falaj-vesikanavat ovat vanhimpia tunnettuja esimerkkejä tästä vesitekniikasta. Vuonna '
      + '2019 Hili II:n muurista löytyi noin kolmetuhatta vuotta vanhat sormenjäljet, ilmeisesti '
      + 'muurin rakentajien. Unesco liitti Hilin luetteloonsa 2011 osana Al Ainin kulttuurikohteita '
      + '— maan ensimmäisenä maailmanperintökohteena.',
    lahde: 'en-Wikipedia "Hili Archaeological Park", johdanto-osa sekä osiot "Description and '
      + 'history" ja "World Heritage status" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jebelhafeet',
    nimi: 'Jebel Hafeet',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kokonainen aikakausi on nimetty vuoren mukaan?',
      'Mikä on mehiläispesähauta?',
    ],
    korostukset: ['Hafit|Hafit-kautena'],
    nappi: 'Vuori, joka antoi nimen aikakaudelle',
    // 55.7775 E / 24.05861 N — en-Wikipedia "Jebel Hafeet"
    // Lähin pelikaupunki: Dubai 30,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7692.6, y: 2394 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Jebel Hafeet on Abu Dhabin emiraatin ainoa vuori ja yksi maan korkeimmista. Sen juurella '
      + 'olevien mehiläispesähautojen ryhmä on niin merkittävä löytö, että koko pronssikauden '
      + 'varhaisvaihe 3200–2600 eaa. tunnetaan Hafit-kautena. Vuori sai kansallispuiston aseman '
      + '2017 ja liitettiin sheikki Zayedin suojelualueverkostoon 2018. Sadetta tulee keskimäärin '
      + '77 millimetriä vuodessa ja keskilämpötila on 27,1 astetta, mutta lokakuusta maaliskuuhun '
      + 'on viileää — yleensä alle kaksikymmentäviisi astetta.',
    lahde: 'en-Wikipedia "Jebel Hafeet", johdanto-osa ja osio "Climate" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fujairahinlinna',
    nimi: 'Fujairahin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnan muoto on epäsäännöllinen?',
      'Miksi brittilaivasto ampui linnaa 1925?',
    ],
    korostukset: ['vartiotorni|vartiotorni'],
    nappi: 'Maan vanhimpia linnoja',
    // 56.33444 E / 25.12222 N — Fujairahin kaupunki, en-Wikipedia "Fujairah Fort"
    // Lähin pelikaupunki: Dubai 37,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7711.1, y: 2356.4 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Fujairahin linna on 1500-luvulta ja siten maan vanhimpia ja suurimpia linnoja. Se '
      + 'seisoo kahdenkymmenen metrin korkuisella kalliokumpareella parin kilometrin päässä '
      + 'nykyisestä keskustasta ja kilometrin päässä rannasta. Kolme pyöreää ja yksi neliömäinen '
      + 'vartiotorni on yhdistetty muureilla, ja rakennuksen epäsäännöllinen muoto johtuu kallion '
      + 'epätasaisesta pinnasta; materiaalina ovat paikalliset kivet, sora, muta, heinä ja '
      + 'rappaus. Linnaa käytettiin vankilana 1900-luvun alkuun asti. Vuonna 1925 brittilaivaston '
      + 'HMIS Lawrence tuhosi kolme sen tornia orjakaupan vastaisen politiikan nimissä, minkä '
      + 'jälkeen linna jäi autioksi vuoteen 1997, jolloin se kunnostettiin alkuperäisillä '
      + 'materiaaleilla.',
    lahde: 'en-Wikipedia "Fujairah Fort", johdanto-osa sekä osiot "Location", "Architecture", '
      + '"History" ja "Restoration and Role Today" (tarkistettu 6.9.2026).',
  },
  {
    id: 'albidyanmoskeija',
    nimi: 'Al Bidyan moskeija',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi rakennuksen ikää ei voi mitata radiohiilellä?',
      'Miten neljä kupolia lepää yhden pilarin varassa?',
    ],
    korostukset: ['mihrab|mihrab'],
    nappi: 'Maan vanhin moskeija',
    // 56.35391 E / 25.43907 N — en-Wikipedia "Al Bidya Mosque"
    // Lähin pelikaupunki: Dubai 42,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7711.8, y: 2345.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Al Bidyan moskeija Fujairahin emiraatissa on maan vanhin moskeija, noin viisisataa '
      + 'vuotta vanha. Ikää ei voi mitata radiohiilellä, koska mudasta ja kivestä muurattu '
      + 'rakennus ei sisällä lainkaan puuta; Fujairahin muinaismuistoviranomainen ja Sydneyn '
      + 'yliopisto tutkivat kohdetta 1997–1998 ja päätyivät rakennusvuoteen 1446. Neliömäinen '
      + 'rakennus on vain 53 neliömetriä, ja sen neljä matalaa kierteistä kupolia lepäävät yhden '
      + 'keskipilarin varassa. Rukoushuoneessa on pieni mihrab, yksinkertainen saarnatuoli ja '
      + 'paksuihin seiniin veistettyjä kuutiomaisia syvennyksiä kirjoja varten. Moskeijassa '
      + 'rukoillaan yhä päivittäin.',
    lahde: 'en-Wikipedia "Al Bidya Mosque", johdanto-osa sekä osiot "History" ja "Structure" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mleiha',
    nimi: 'Mleiha',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhoja Fayan kivityökalut ovat?',
      'Mikä oli Mleihan kausi?',
    ],
    korostukset: ['Faya|Faya-1'],
    nappi: 'Työkaluja 130 000 vuoden takaa',
    // 55.87861 E / 25.12306 N — en-Wikipedia "Mleiha"
    // Lähin pelikaupunki: Dubai 23,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7696, y: 2356.3 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Mleiha on Sharjahin emiraatissa oleva kylä, jonka ympäriltä on löydetty jälkiä '
      + 'ihmisestä paleoliittiselta kaudelta asti. Tübingenin yliopiston tutkijat löysivät '
      + 'Faya-1:n kohdalta kivityökaluja, jotka on ajoitettu optisesti stimuloidulla '
      + 'luminesenssilla vähintään 125 000–130 000 vuoden ikäisiksi. Neoliittisia yhteisöjä on '
      + 'tunnistettu 11 000 vuoden takaa, ja pronssikaudelta löytyi Umm al-Narin tyylinen hauta. '
      + 'Myöhemmin seudulle tuli maanalainen falaj-kastelu ja taatelinviljely. 1990-luvun lopulla '
      + 'löydetty laaja linnoitettu Mleihan linnake saattaa olla eteläarabialaisen kuningaskunnan '
      + 'istuin 300-luvulta eaa., ja koko ajanjaksoa kutsutaan Mleihan kaudeksi. Mleiha on '
      + 'Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Mleiha", johdanto-osa sekä osiot "History of Mleiha" ja "The \'Mleiha '
      + 'period\'" (tarkistettu 6.9.2026).',
  },
  {
    id: 'eddur',
    nimi: 'Ed Dur',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Omana?',
      'Mitä alabasteri-ikkunat kertovat rakentajista?',
    ],
    korostukset: ['Omana|Omana'],
    nappi: 'Kadonnut satamakaupunki',
    // 55.62611 E / 25.52222 N — en-Wikipedia "Ed Dur"
    // Lähin pelikaupunki: Dubai 28,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7687.5, y: 2342.2 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Ed Dur Umm Al Quwainissa on viiden neliökilometrin laajuinen muinaiskaupunki, jota on '
      + 'kutsuttu yhdeksi Arabian merkittävimmistä kadonneista kaupungeista. Irakilainen '
      + 'retkikunta löysi sen 1973, mutta järjestelmällinen tutkimus alkoi vasta 1989. Paikalla '
      + 'arvellaan olevan noin kaksikymmentätuhatta hautaa, joista viitisensataa on kaivettu; '
      + 'löytöinä on roomalaista lasia, koruja, aseita ja norsunluuta. Ed Duria pidetään Pliniuksen '
      + 'ja Strabonin mainitsemana Omanana, jota Periplus kuvaa Persianlahden tärkeimmäksi '
      + 'satamaksi ensimmäisellä vuosisadalla jaa. Vientitavaroiksi kreikkalaiset käsikirjoitukset '
      + 'luettelevat helmiä, purppuraväriä, vaatteita, viiniä, kultaa, orjia ja suuria määriä '
      + 'taateleita. Paikalta tunnetaan myös Arabian niemimaan ensimmäiset alabasteri-ikkunat.',
    lahde: 'en-Wikipedia "Ed Dur", johdanto-osa sekä osiot "Discovery" ja "Graeco-Roman links" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'julfar',
    nimi: 'Julfar',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi satama siirtyi Kushista Julfariin?',
      'Mikä on Wadi Sur?',
    ],
    korostukset: ['Julfar-keramiikka|Julfar-keramiikkaa'],
    nappi: 'Satama, joka edelsi Ras al-Khaimaa',
    // 55.95 E / 25.76667 N — en-Wikipedia "Ras Al Khaimah" (Julfarin sijainti)
    // Lähin pelikaupunki: Dubai 41,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7698.3, y: 2333.5 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Julfar oli islamilaisen ajan satama ja kauppapaikka, joka kukoisti noin 1300–1650 ja '
      + 'josta myöhempi Ras al-Khaima kasvoi. Sen edeltäjä oli linnoitettu Kushin satama, mutta '
      + 'väylä sinne liettyi umpeen, joten asutus siirtyi rannalle. Varhaisimmat rakennukset '
      + 'olivat palmunlehvistä tehtyjä majoja; 1300-luvun lopulta alkaen tilalle tuli mutatiiltä '
      + 'ja kiveä, katuja ja pihataloja. Kaupunkia suojasi maan puolelta puolentoista metrin '
      + 'paksuinen muuri, ja viljelysmaat kiersi seitsemän kilometrin Wadi Sur -muuri '
      + 'vartiotorneineen, joka päättyi 1000-luvun Shimalin linnakkeeseen — paikalliselta '
      + 'nimeltään Saban palatsiin. Julfar-keramiikkaa on löydetty ympäri Persianlahtea ja '
      + 'läntistä Intian valtamerta.',
    lahde: 'en-Wikipedia "Julfar", johdanto-osa ja osio "Foundation and early years" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'qasralhosn',
    nimi: 'Qasr al-Hosn',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi torni rakennettiin juuri tähän?',
      'Miksi linna on valkoinen?',
    ],
    korostukset: ['Shakhbut bin Dhiyab|Shakhbut bin Dhiyab'],
    nappi: 'Torni yhden kaivon vartijana',
    // 54.35482 E / 24.48239 N — en-Wikipedia "Qasr Al Hosn" (tietolaatikko)
    // Lähin pelikaupunki: Dubai 32,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7645.2, y: 2379 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Qasr al-Hosn on Abu Dhabin vanhin kivirakennus. Se pystytettiin 1761 kartiomaiseksi '
      + 'vartiotorniksi puolustamaan saaren ainoaa makean veden kaivoa, ja rakennustyötä valvoi '
      + 'Mohammed Al Bastaki. Vuonna 1793 hallitsija Shakhbut bin Dhiyab Al Nahyan laajensi tornin '
      + 'pieneksi linnakkeeksi, josta tuli hallitsijasuvun pysyvä asuinpaikka. Nykyisen muotonsa '
      + 'rakennus sai 1930-luvun lopun suurlaajennuksessa, joka rahoitettiin Abu Dhabin '
      + 'ensimmäisestä öljylupamaksusta, ja se pysyi emiirin palatsina ja hallituksen istuimena '
      + 'vuoteen 1966. Valkoiseksi se maalattiin vasta vuosien 1976–1983 kunnostuksessa; museona '
      + 'se avattiin uudelleen 2018.',
    lahde: 'en-Wikipedia "Qasr Al Hosn", johdanto-osa sekä osiot "History" ja "Current use" '
      + '(tarkistettu 6.9.2026).',
  },
];

