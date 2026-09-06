/*
 * MAASTOKOHTEET — POL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs POL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/POL.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 3 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Puolassa oli viisi maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-pol.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * PUOLASSA ON KAKSI PELIKAUPUNKIA (Varsova ja Krakova), ja etäisyys
 * mitattiin molempiin. Lähin uusi merkki on Auschwitz-Birkenau 25,3
 * lautayksikön päässä Krakovasta — reilusti yli kaupungin kohdalla
 * -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js). Kaikki
 * kahdeksan ovat siis pääkartan merkkejä.
 *
 * MITÄ JÄTETTIIN POIS JA MIKSI (sääntö N3): Wieliczkan suolakaivos,
 * Toruń ja Wrocław ovat jo Krakovan fokusvirran nostoja omalla
 * karttapaikallaan (js/packs/fokusvirta-krakova.js), Wawel on
 * Krakovan kohdalla, ja Białowieża on maan eläintäyn paikka
 * (js/packs/elaintakyt.js POL). Malborkin linna on mukana, vaikka
 * maalehden nosto (js/packs/maakartat.js POL) mainitsee sen: kortti
 * kertoo ritarikunnan historian, lehti pinta-alaennätyksen.
 *
 * AUSCHWITZ ON ASIALLISENA MUISTOPAIKKANA. Kortti kertoo, mitä
 * tapahtui ja kuinka moni kuoli, lähteenä artikkelin johdanto — ei
 * kuvaa, ei nokkeluutta, ei matkailukieltä. Sen merkki jää Wieliczkan
 * nimiön alle (tools/tarkista-nimiolimitys.mjs, luokka "nimiö symbolin
 * päällä"); se on väistön oma sallittu tinkiminen eikä nimiö–nimiö-
 * limitys, joten portti menee läpi ja peli siirtää nimiön ajossa.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Puolan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_POL = [
  {
    id: 'rysy',
    nimi: 'Rysy',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Rysyllä on kolme huippua?',
      'Mikä on Puolan vuorten kruunu?',
    ],
    korostukset: ['Tatrat|Tatrojen'],
    nappi: 'Puolan korkein piste',
    // 20.0881 E / 49.1794 N — en-Wikipedia "Rysy"
    laudat: {
      maailmankartta: { x: 6502.9, y: 1425.7 },
      europe: { x: 596.9, y: 600.2 },
    },
    teksti: 'Rysy on Korkeiden Tatrojen harjanteella Puolan ja Slovakian rajalla. Sillä on kolme '
      + 'huippua: keskimmäinen 2 501 metriä, luoteinen 2 500 ja kaakkoinen 2 473. Luoteinen '
      + 'huippu on Puolan korkein piste ja kuuluu Puolan vuorten kruunuun; kaksi muuta ovat '
      + 'Slovakian puolella.',
    lahde: 'en-Wikipedia "Rysy", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'sniezka',
    nimi: 'Śnieżka',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorella on kaksi nimeä?',
      'Mitkä ovat Jättiläisvuoret?',
    ],
    nappi: 'Ala-Sleesian katto',
    // 15.7403 E / 50.7361 N — en-Wikipedia "Sněžka"
    laudat: {
      maailmankartta: { x: 6358, y: 1358 },
      europe: { x: 513.4, y: 559.2 },
    },
    teksti: 'Śnieżka eli tšekiksi Sněžka on Puolan ja Tšekin rajalla ja Jättiläisvuorten Sleesian '
      + 'harjanteen hallitsevin kohta. Sen 1 603 metrin huippu on Ala-Sleesian voivodikunnan '
      + 'korkein kohta ja koko Sudeettien katto. Rajan toisella puolella sama huippu on Tšekin '
      + 'korkein piste.',
    lahde: 'en-Wikipedia "Sněžka", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Itämerellä ei ole vuorovettä?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 17.5 E / 55.2 N — ulappa Puolan rannikon edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6416.7, y: 1156.5 },
      europe: { x: 547.2, y: 441.8 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Puolan rannalla on Gdańskinlahti, ja '
      + 'siihen laskee Veiksel, yksi meren suurista joista. Etelärannikon meripihka on ollut '
      + 'kauppatavaraa 1100-luvulta asti, ja Gdańskin, Gdynian ja Szczecinin telakat ovat '
      + 'meren suurimmat.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Subdivisions", "Middle Ages" ja "Economy"; laivan osalta "Vasa (ship)", johdanto-osa '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'veiksel',
    nimi: 'Veiksel',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Veikselin suu siirrettiin?',
      'Miksi Krakova ja Varsova ovat molemmat Veikselin varrella?',
    ],
    korostukset: ['Kuollut Veiksel|Kuolleeksi Veikseliksi'],
    nappi: 'Puolan pisin joki',
    // 18.6 E / 53.01 N — Toruń joen keskijuoksulla; artikkelin koordinaatti 18,952 / 54,362 on suistossa
    laudat: {
      maailmankartta: { x: 6453.3, y: 1256.8 },
      europe: { x: 568.3, y: 499.4 },
    },
    teksti: 'Veiksel vaihtoi suunsa kahdesti puolessa vuosisadassa. Vuonna 1840 jääpato nosti '
      + 'tulvan, joka mursi hiekan läpi uuden uoman mereen muutaman kilometrin päähän '
      + 'Danzigista itään; sitä alettiin kutsua Rohkeaksi Veikseliksi, ja vanha uoma menetti '
      + 'virtansa ja jäi Kuolleeksi Veikseliksi. Kun tulvat silti jatkuivat, Preussin hallitus '
      + 'kaivoi vuosina 1889—1895 kaksitoista kilometriä kaupungista itään suoran keinouoman, '
      + 'jotta joki huuhtoisi jäälauttansa suoraan Itämereen ennen kuin ne ehtivät padota. Se '
      + 'on nykyään joen pääsuu — ja se ohittaa Gdańskin kokonaan. Veiksel on Puolan pisin joki '
      + 'ja pisin Itämereen laskeva joki, 1 047 kilometriä, ja se kulkee sekä Krakovan että '
      + 'Varsovan halki.',
    lahde: 'en-Wikipedia "Vistula", johdanto-osa sekä osiot "Delta" ja "Channel changes" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'odra',
    nimi: 'Odra',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Oder–Neisse-linja on?',
      'Mikä on Odran suurin sivujoki?',
    ],
    korostukset: ['Oder–Neisse-linja|Oder–Neisse-linjan'],
    nappi: 'Joki, joka on myös raja',
    // 17.03 E / 51.11 N — Wrocław joen keskijuoksulla; artikkelin koordinaatti 14,524 / 53,672 on suistossa
    laudat: {
      maailmankartta: { x: 6401, y: 1341.6 },
      europe: { x: 538.2, y: 549.4 },
    },
    teksti: 'Odra eli saksaksi Oder on Puolan toiseksi pisin joki ja rajojensa sisällä kolmanneksi '
      + 'pisin Veikselin ja sen suurimman sivujoen Wartan jälkeen. Se nousee Tšekistä ja virtaa '
      + '742 kilometriä Länsi-Puolan halki, ja siitä 187 kilometriä on Puolan ja Saksan rajaa '
      + 'osana Oder–Neisse-linjan rajaa. Lopulta se laskee Szczecinin laguuniin ja kolmena '
      + 'haarana Itämeren Pommerinlahteen.',
    lahde: 'en-Wikipedia "Oder", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'malbork',
    nimi: 'Malborkin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Malborkin linnan?',
      'Miten linna päätyi Puolan kuninkaalle?',
    ],
    korostukset: ['Saksalainen ritarikunta|Saksalainen ritarikunta'],
    nappi: 'Maailman suurin linna, tehty tiilestä',
    // 19.0278 E / 54.0397 N — en-Wikipedia "Malbork Castle"
    laudat: {
      maailmankartta: { x: 6467.6, y: 1210 },
    },
    teksti: 'Malborkin linna on tiiligoottilainen linnakokonaisuus Malborkissa '
      + 'Pohjois-Puolassa; pinta-alaltaan se on maailman suurin linna. Sen rakensi '
      + 'Saksalainen ritarikunta, saksalainen ristiretkeläisten hengellinen ritarikunta, ja '
      + 'linna sai nimen Marienburg Neitsyt Marian mukaan. Rakentaminen alkoi Vanhan Preussin '
      + 'valloituksen jälkeen vahvistamaan ritarikunnan otetta alueesta, ja historioitsijat '
      + 'sijoittavat päätyön vuosiin 1274–1406; valmistuessaan 1406 se oli maailman suurin '
      + 'tiililinna. Vuonna 1457 kolmentoista vuoden sodan aikana böömiläiset palkkasoturit '
      + 'myivät linnan korvausten sijasta Puolan kuninkaalle Kasimir IV:lle, ja siitä tuli '
      + 'yksi Puolan kuninkaallisista asuinpaikoista ja virastojen sijoituspaikka Puolan '
      + 'ensimmäiseen jakoon 1772 asti. Sen jälkeen linna oli saksalaisen hallinnon alla yli '
      + '170 vuotta ja rapistui, kun sotatekniikan kehitys teki siitä pelkän nähtävyyden; '
      + 'maailmanperintökohteeksi se merkittiin joulukuussa 1997.',
    lahde: 'en-Wikipedia "Malbork Castle", johdanto-osa ja osio "Origins" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'auschwitz',
    nimi: 'Auschwitz-Birkenau',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Auschwitzissa tapahtui?',
      'Miksi 27. tammikuuta on muistopäivä?',
    ],
    korostukset: ['holokausti|holokaustin'],
    nappi: 'Muistopaikka, jota ei saa unohtaa',
    // 19.1783 E / 50.0358 N — en-Wikipedia "Auschwitz concentration camp"
    laudat: {
      maailmankartta: { x: 6472.6, y: 1388.6 },
    },
    teksti: 'Auschwitz — puolaksi Oświęcim — oli natsi-Saksan miehitetyssä Puolassa '
      + 'ylläpitämä yli neljänkymmenen keskitys- ja tuhoamisleirin kokonaisuus. Siihen '
      + 'kuuluivat pääleiri Auschwitz I Oświęcimissä, kaasukammioilla varustettu keskitys- ja '
      + 'tuhoamisleiri Auschwitz II-Birkenau, kemianyhtiö IG Farbenin työleiri Auschwitz '
      + 'III-Monowitz sekä kymmeniä sivuleirejä. Ensimmäiset vangit olivat lähes yksinomaan '
      + 'puolalaisia poliittisia pidätettyjä, ja kahtena ensimmäisenä vuotena enemmistö '
      + 'vangeista oli puolalaisia; vuodesta 1942 vuoden 1944 loppuun tavarajunat toivat '
      + 'juutalaisia kaikkialta saksalaismiehitetystä Euroopasta kaasukammioihin. Leirille '
      + 'lähetetystä 1,3 miljoonasta ihmisestä 1,1 miljoonaa murhattiin: 960 000 juutalaista, '
      + '74 000 ei-juutalaista puolalaista, 21 000 romania, 15 000 neuvostosotavankia ja '
      + 'jopa 15 000 muuta. Neuvostojoukot vapauttivat leirin 27. tammikuuta 1945, ja '
      + 'päivää on vietetty vuodesta 2005 kansainvälisenä holokaustin muistopäivänä; Puola '
      + 'perusti alueelle valtiollisen museon vuonna 1947, ja maailmanperintökohde siitä '
      + 'tuli 1979.',
    lahde: 'en-Wikipedia "Auschwitz concentration camp", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jasnagora',
    nimi: 'Jasna Góra',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Częstochowan Musta Madonna on?',
      'Mitä luostarissa tapahtui talvella 1655?',
    ],
    korostukset: ['Musta Madonna|Musta Madonna'],
    nappi: 'Puolan tärkein pyhiinvaelluskohde',
    // 19.0972 E / 50.8125 N — en-Wikipedia "Jasna Góra Monastery"
    laudat: {
      maailmankartta: { x: 6469.9, y: 1354.7 },
    },
    teksti: 'Jasna Góra eli Valoisa vuori on Neitsyt Marialle omistettu pyhäkkö Częstochowassa '
      + 'ja yksi Puolan tärkeimmistä pyhiinvaelluspaikoista. Sen kallisarvoisin aarre on '
      + 'Częstochowan Musta Madonna, ikoni, jolla uskotaan olevan ihmeitä tekeviä voimia. '
      + 'Luostarin perustivat vuonna 1382 Unkarista kutsutut pauliinimunkit, ja heille '
      + 'uskottiin heti tuo Jumalanäidin ja Kristus-lapsen ikoni; kirkko oli aluksi '
      + 'yksilaivainen ja laajennettiin noin 1463 kolmilaivaiseksi goottilaiseksi '
      + 'hallikirkoksi. Talvella 1655 Ruotsin armeija piiritti luostaria tuloksetta toisen '
      + 'pohjoisen sodan eli vedenpaisumuksen aikana, ja se sytytti puolalaisen vastarinnan: '
      + 'kuningas Jan Kazimierz vannoi 1. huhtikuuta 1656 Lvivin katedraalissa vihkivänsä '
      + 'maansa Jumalanäidin suojelukseen ja julisti tämän valtakuntansa kuningattareksi. '
      + 'Ruotsalaiset yrittivät uudestaan 1702, 1705 ja 1709 suuren Pohjan sodan aikana — '
      + 'yhtä huonolla menestyksellä.',
    lahde: 'en-Wikipedia "Jasna Góra Monastery", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'zamosc',
    nimi: 'Zamość',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti Zamośćin?',
      'Mistä kaupungin pohjakaava on peräisin?',
    ],
    korostukset: ['hetmani|hetmani'],
    nappi: 'Renessanssin ihannekaupunki tasangolla',
    // 23.2528 E / 50.7167 N — en-Wikipedia "Zamość"
    laudat: {
      maailmankartta: { x: 6608.4, y: 1358.9 },
    },
    teksti: 'Zamość on kaupunki Kaakkois-Puolassa Lublinin voivodikunnassa, noin 90 kilometriä '
      + 'Lublinista ja 247 kilometriä Varsovasta. Sen perusti vuonna 1580 Puolan suurkansleri '
      + 'ja hetmani Jan Zamoyski, joka halusi rakentaa ihannekaupungin kauppatielle, joka '
      + 'yhdisti Länsi- ja Pohjois-Euroopan Mustaanmereen. Padovalainen arkkitehti Bernardo '
      + 'Morando piirsi kaupungin italialaisten kauppakaupunkien malliin myöhäisrenessanssin '
      + 'aikaan, ja siitä on säilynyt alkuperäinen katuverkko, linnoitukset ja suuri määrä '
      + 'alkuperäisiä rakennuksia, joissa venetsialainen ja keskieurooppalainen perinne '
      + 'sekoittuvat. Historiallinen keskusta merkittiin maailmanperintöluetteloon vuonna '
      + '1992 ainutlaatuisena esimerkkinä keskieurooppalaisesta renessanssikaupungista. '
      + 'Zamoyski perusti kaupunkiin vuonna 1594 myös oman akatemiansa, ja kaupunki kesti '
      + 'sekä Bohdan Hmelnytskyin kasakkapiirityksen että ruotsalaisten piirityksen 1656 — '
      + 'vasta suuressa Pohjan sodassa se vallattiin.',
    lahde: 'en-Wikipedia "Zamość", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'westerplatte',
    nimi: 'Westerplatte',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Danzigin vapaakaupunki oli?',
      'Kuinka kauan puolustus kesti?',
    ],
    korostukset: ['vapaakaupunki|vapaakaupungin'],
    nappi: 'Niemi, jolla toinen maailmansota alkoi',
    // 18.6714 E / 54.4075 N — en-Wikipedia "Westerplatte"
    laudat: {
      maailmankartta: { x: 6455.7, y: 1193.1 },
    },
    teksti: 'Westerplatte on niemi Gdańskissa Itämeren rannalla Kuolleen Veikselin suulla, '
      + 'sataman väylän varrella. Vuosina 1926–1939 siellä oli Puolan sotilaskuljetusvarikko '
      + 'Danzigin vapaakaupungin alueella: Kansainliitto myönsi Puolalle vuonna 1921 oikeuden '
      + 'pitää ampumatarvikevarastoa ja varusväkeä lähellä Gdańskia, ja paikaksi sovittiin '
      + '1925 Westerplatte. Varikko valmistui marraskuussa 1925 ja aloitti toimintansa '
      + 'tammikuussa 1926; varusväen kooksi määrättiin 88 sotilasta, eikä Puola saanut '
      + 'rakentaa linnoituksia. Toisen maailmansodan ensimmäiset laukaukset ammuttiin täällä '
      + '1. syyskuuta 1939 kello 4.50, kun saksalainen ensimmäisen maailmansodan taistelulaiva '
      + 'SMS Schleswig-Holstein alkoi tulittaa puolalaista ampumatarvikevarastoa. Viikon '
      + 'kestäneen piirityksen jälkeen puolalainen varusväki antautui Puolaan hyökänneille '
      + 'saksalaisjoukoille.',
    lahde: 'en-Wikipedia "Westerplatte", johdanto-osa ja osio "Transit depot" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'gniezno',
    nimi: 'Gniezno',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Gniezno oli Puolan ensimmäinen pääkaupunki?',
      'Kuka oli tarun Lech?',
    ],
    korostukset: ['primas|primas'],
    nappi: 'Puolan ensimmäinen pääkaupunki',
    // 17.5958 E / 52.5358 N — en-Wikipedia "Gniezno"
    laudat: {
      maailmankartta: { x: 6419.9, y: 1278.1 },
    },
    teksti: 'Gniezno on kaupunki Keski-Länsi-Puolassa noin viidenkymmenen kilometrin päässä '
      + 'Poznańista. Se oli Piast-suvun päälinnoja ja Puolan ensimmäinen historiallinen '
      + 'pääkaupunki 900-luvulla ja 1000-luvun alussa. Kaupunki on maan vanhimman '
      + 'arkkihiippakunnan istuin — se perustettiin vuonna 1000 — ja sen arkkipiispa on '
      + 'Puolan primas, joten Gniezno on maan kirkollinen pääkaupunki. Kuten Rooma, Gniezno '
      + 'perustettiin seitsemälle kukkulalle; Lechin kukkulalla seisoo Gnieznon katedraali, '
      + 'ja ruhtinaan linnoitus rakennettiin sinne juuri ennen vuotta 940 paikalle, jossa oli '
      + 'aiemmin ollut slaavilaisen uskonnon pyhiä paikkoja. Puolalaisen tarun mukaan kolme '
      + 'veljestä lähti metsälle ja hajaantui: Rus itään, Čech länteen ja Lech pohjoiseen, '
      + 'missä hän kohtasi pesäänsä puolustavan valkoisen kotkan laskevaa aurinkoa vasten ja '
      + 'päätti asettua paikalle.',
    lahde: 'en-Wikipedia "Gniezno", johdanto-osa sekä osiot "Geography", "History" ja '
      + '"Legend of Lech, Czech and Rus" (tarkistettu 6.9.2026).',
  },
  {
    id: 'elblaginkanava',
    nimi: 'Elblągin kanava',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten alukset nousevat sata metriä ylös?',
      'Kuka kanavan suunnitteli?',
    ],
    korostukset: ['vinohissi|vinohissit'],
    nappi: 'Kanava, jolla alukset kulkevat kuivalla maalla',
    // 19.5978 E / 54.0244 N — en-Wikipedia "Elbląg Canal"
    laudat: {
      maailmankartta: { x: 6486.6, y: 1210.7 },
    },
    teksti: 'Elblągin kanava on 80,5 kilometriä pitkä kanava Varmian ja Masurian '
      + 'voivodikunnassa Puolassa: se kulkee etelään Drużno-järveltä Drwęca-joelle ja '
      + 'Jeziorak-järvelle ja kantaa enintään viidenkymmenen tonnin aluksia. Korkeusero on '
      + 'lähes sata metriä, ja se voitetaan sulkujen sekä järvien välisten vinohissien '
      + 'järjestelmällä. Preussin kuninkaan toimeksiannosta kanavan suunnitteli Georg Steenke '
      + 'vuosina 1825–1844, ja rakentaminen alkoi 1844; 9,5 kilometrin matkalla korkeusero '
      + 'oli tavallisille suluille liian suuri, joten tilalle otettiin Yhdysvaltain '
      + 'Morris-kanavan mallin mukaiset vinohissit. Kanava avattiin nimellä Oberländischer '
      + 'Kanal 29. lokakuuta 1860, ja rajojen muututtua toisen maailmansodan jälkeen se jäi '
      + 'Puolaan; sotavauriot korjattiin ja liikenne palasi 1948. Alkuperäisiä vinohissejä '
      + 'oli neljä — Buczyniec, Kąty, Oleśnica ja Jelenie — ja niiden nousut ovat 18,8–22 '
      + 'metriä; myöhemmin lisättiin viides, Całuny Nowe.',
    lahde: 'en-Wikipedia "Elbląg Canal", johdanto-osa sekä osiot "History" ja "The inclined '
      + 'planes" (tarkistettu 6.9.2026).',
  },
  {
    id: 'krzemionki',
    nimi: 'Krzemionki',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mitä Krzemionkista louhittiin?',
      'Kuinka kauas kirveet kulkivat?',
    ],
    korostukset: ['piikivi|piikivikaivosten'],
    nappi: 'Kivikauden kaivos ja sen kauppatiet',
    // 21.5023 E / 50.968 N — en-Wikipedia "Krzemionki"
    laudat: {
      maailmankartta: { x: 6550.1, y: 1347.8 },
    },
    teksti: 'Krzemionki on neoliittinen ja varhaisen pronssikauden piikivikaivosten '
      + 'kokonaisuus noin kahdeksan kilometriä Ostrowiec Świętokrzyskin kaupungista '
      + 'koilliseen. Se on Euroopan suurimpia esihistoriallisia piikivikaivoksia yhdessä '
      + 'Englannin Grime\'s Gravesin ja Belgian Spiennesin kanssa. Louhinta alkoi noin 3900 '
      + 'eaa. ja jatkui noin vuoteen 1600 eaa.: kaivosalue on 4,5 kilometriä pitkä ja '
      + '25–180 metriä leveä, ja tunnettuja kuiluja on yli 4 000, syvimmillään yhdeksän '
      + 'metriä. Raidallisesta piikivestä tehtiin ennen kaikkea kirveitä ja talttoja, ja '
      + 'niillä käytiin kauppaa jopa 660 kilometrin päähän kaivoksilta; vilkkain aika oli '
      + '2500–2000 eaa. Kohde merkittiin Unescon maailmanperintöluetteloon 6. heinäkuuta '
      + '2019.',
    lahde: 'en-Wikipedia "Krzemionki", johdanto-osa ja osio "History of mining" '
      + '(tarkistettu 6.9.2026).',
  },
];

