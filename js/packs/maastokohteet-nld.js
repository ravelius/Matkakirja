/*
 * MAASTOKOHTEET — NLD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NLD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NLD.json. Työkalu laskee laudan
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
 * Alankomaissa oli kolme maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-nld.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähin uusi merkki on
 * Domtoren 15,2 lautayksikön päässä Amsterdamista, eli yli kaupungin
 * kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js) ja
 * yli kaupunkikaton säteen (KAUPUNKIKATON_SADE 8). Kaikki kahdeksan
 * ovat siis pääkartan merkkejä.
 *
 * MITÄ JÄTETTIIN POIS JA MIKSI (sääntö N3, sama nimi kartalla vain
 * kerran): Afsluitdijk, Delft, Alkmaar ja Loevesteinin linna ovat jo
 * Amsterdamin fokusvirran nostoja omalla karttapaikallaan
 * (js/packs/fokusvirta-amsterdam.js), ja Schokland on maalehden oma
 * nosto (js/packs/maakartat.js NLD). Zaanse Schans jäi pois, koska se
 * on Amsterdamin kohdalla. Kinderdijkin tuulimyllyt olisivat olleet
 * ilmeisin valinta, mutta niiden nimiö osui Van Meegeren -skandaalin
 * nimiön päälle Rotterdamissa (tools/tarkista-nimiolimitys.mjs), joten
 * vesitekniikan paikan sai Woudagemaal.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Alankomaiden maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_NLD = [
  {
    id: 'vaalserberg',
    nimi: 'Vaalserberg',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Saba on?',
      'Mitä NAP tarkoittaa?',
    ],
    korostukset: ['Limburg|Limburgin'],
    nappi: 'Maan korkein kohta — 322 metriä',
    // 6.0208 E / 50.7547 N — en-Wikipedia "Vaalserberg"
    laudat: {
      maailmankartta: { x: 6034, y: 1357.2 },
      europe: { x: 326.8, y: 558.8 },
    },
    teksti: 'Vaalserberg on 322,4 metriä NAP-tason yläpuolella ja Alankomaiden Euroopan-puoleisen '
      + 'osan korkein kohta. Se on Limburgin maakunnassa maan kaakkoisimmassa kolkassa lähellä '
      + 'Vaalsin kaupunkia, jonka mukaan se on nimetty. Se oli koko kuningaskunnan korkein '
      + 'kohta aina vuoteen 2010, jolloin Karibian Saba 887-metrisine tulivuorineen liitettiin '
      + 'maahan erityiskuntana.',
    lahde: 'en-Wikipedia "Vaalserberg", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miten hollantilaiset ovat vallanneet maata mereltä?',
      'Miksi Pohjanmeri on niin matala?',
    ],
    nappi: 'Meri, jolta maa on otettu',
    // 4.2 E / 53.4 N — ulappa Alankomaiden rannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 5973.3, y: 1239.1 },
      europe: { x: 291.8, y: 489.2 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Pituutta sillä on yli 970 kilometriä, '
      + 'leveyttä 580 ja pinta-alaa 570 000 neliökilometriä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'maas',
    nimi: 'Maas',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Rein–Maas–Schelde-suisto on?',
      'Missä Maas saa alkunsa?',
    ],
    korostukset: ['suisto|suistosta'],
    nappi: 'Joki kolmen maan läpi',
    // 6.17 E / 51.37 N — Venlo joen Alankomaiden-puoleisella osuudella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 6039, y: 1330.1 },
      europe: { x: 329.7, y: 542.6 },
    },
    teksti: 'Maas eli ranskaksi Meuse on 925 kilometrin pituinen joki, joka nousee Ranskasta ja '
      + 'virtaa Belgian ja Alankomaiden läpi. Se laskee Pohjanmereen '
      + 'Rein–Maas–Schelde-suistosta, samasta suistosta kuin Reinkin. Alankomaissa se on Reinin '
      + 'ohella maan kaksi suurta vesireittiä.',
    lahde: 'en-Wikipedia "Meuse", johdanto-osa (tarkistettu 29.8.2026).',
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
    id: 'woudagemaal',
    nimi: 'Woudagemaal',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mikä pumppaamo on?',
      'Miksi höyrykone on yhä käytössä?',
    ],
    korostukset: ['höyrypumppaamo|höyrypumppaamo'],
    nappi: 'Maailman suurin toimiva höyrypumppaamo',
    // 5.67889 E / 52.84583 N — en-Wikipedia "Wouda pumping station"
    laudat: {
      maailmankartta: { x: 6022.6, y: 1264.2 },
    },
    teksti: 'Woudagemaal on pumppaamo Frieslandissa Pohjois-Alankomaissa ja maailman suurin '
      + 'yhä toimiva höyrypumppaamo. Kuningatar Vilhelmiina avasi sen 7. lokakuuta 1920, ja '
      + 'sen tehtävä oli pumpata ylimääräinen vesi pois maakunnasta; teho on 4 000 '
      + 'kuutiometriä minuutissa. Rakennuksen suunnitteli maakunnan vesilaitoksen '
      + 'pääinsinööri D. F. Wouda, jonka mukaan asema on nimetty; ukonilma iski '
      + 'rakennusaikana vasta valmistuneeseen suojaamattomaan savupiippuun, joka jouduttiin '
      + 'tekemään kokonaan uudestaan. Koneistona on neljä 500 hevosvoiman '
      + 'höyrykonetta ja kahdeksan keskipakopumppua; hiilikattilat muutettiin vuonna 1967 '
      + 'raskaalle polttoöljylle. Asemaa käytetään nykyään noin kerran vuodessa, kun '
      + 'Frieslandin vedenpinta nousee poikkeuksellisen korkealle, ja se on ollut '
      + 'maailmanperintökohde vuodesta 1998.',
    lahde: 'en-Wikipedia "Wouda pumping station", johdanto-osa sekä osiot "History", "Power '
      + 'and engines" ja "Operation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'deltatyot',
    nimi: 'Deltatyöt',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mikä vuoden 1953 Pohjanmeren tulva oli?',
      'Miksi Oosterscheldea ei suljettu kokonaan?',
    ],
    korostukset: ['myrskypuomi|myrskypuomiksi'],
    nappi: 'Padot, jotka lyhensivät rannikkoa',
    // 3.72 E / 51.65 N — en-Wikipedia "Delta Works", artikkelin oma koordinaatti
    laudat: {
      maailmankartta: { x: 5957.3, y: 1317.7 },
    },
    teksti: 'Deltatyöt on sarja rakennushankkeita Lounais-Alankomaissa: ne suojaavat Reinin, '
      + 'Maasin ja Schelden suiston seutua mereltä. Ne tehtiin vuosina 1954–1997, ja niihin '
      + 'kuuluu patoja, sulkuja, penkereitä ja myrskypuomeja Etelä-Hollannin ja Zeelandin '
      + 'maakunnissa; ajatus oli lyhentää maan rannikkoviivaa, jolloin korotettavia patoja '
      + 'tarvitaan vähemmän. Työ alkoi vuoden 1953 Pohjanmeren tulvan jälkeen asetetun '
      + 'komission selvityksestä, joka määritti hyväksyttävän tulvariskin alueittain — '
      + 'Pohjois- ja Etelä-Hollannille yksi tulva kymmenessätuhannessa vuodessa. Alun perin '
      + 'Oosterschelden suu oli tarkoitus padota kokonaan, mutta se olisi tappanut koko '
      + 'suolaisen veden eliöstön ja ostereiden pyynnin, joten ympäristöväki ja kalastajat '
      + 'saivat parlamentin muuttamaan suunnitelman myrskypuomiksi. Puomi suljetaan vasta '
      + 'kun meren odotetaan nousevan kolme metriä keskiveden yläpuolelle; muina aikoina '
      + 'suisto on auki ja vuorovesi kulkee siitä läpi.',
    lahde: 'en-Wikipedia "Delta Works", johdanto-osa sekä osiot "Delta law and conceptual '
      + 'framework" ja "The storm-surge barrier" (tarkistettu 6.9.2026).',
  },
  {
    id: 'vredespaleis',
    nimi: 'Vredespaleis',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä pysyvä välitystuomioistuin on?',
      'Kuka maksoi rauhanpalatsin?',
    ],
    korostukset: ['välitystuomioistuin|välitystuomioistuimelle'],
    nappi: 'Talo, joka rakennettiin sotien lopettamiseksi',
    // 4.2955 E / 52.0866 N — en-Wikipedia "Peace Palace"
    laudat: {
      maailmankartta: { x: 5976.5, y: 1298.2 },
    },
    teksti: 'Vredespaleis eli Rauhanpalatsi on kansainvälinen oikeustalo Haagissa. Se avattiin '
      + '28. elokuuta 1913 taloksi pysyvälle välitystuomioistuimelle, joka oli perustettu '
      + 'vuoden 1899 Haagin sopimuksella lopettamaan sodat. Taustalla oli 1800-luvun lopun '
      + 'varustelukilpa: Venäjän tsaari Nikolai II ehdotti kokousta, jossa kehitettäisiin '
      + 'rauhanomaisia keinoja valtioiden riitojen ratkaisuun, ja Haagiin saapui 26 valtion '
      + 'lähetystöt Euroopasta, osmanien valtakunnasta, Yhdysvalloista, Meksikosta, Kiinasta, '
      + 'Japanista, Siamista ja Persiasta. Talon 1,5 miljoonan dollarin rakennusrahat hankki '
      + 'yhdysvaltalainen diplomaatti Andrew Dickson White skotlantilaissyntyiseltä '
      + 'teräsmagnaatilta Andrew Carnegieltä. Palatsissa istuu vuodesta 1946 myös '
      + 'kansainvälinen tuomioistuin, Yhdistyneiden kansakuntien tärkein oikeuselin.',
    lahde: 'en-Wikipedia "Peace Palace", johdanto-osa ja osio "Background" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'domtoren',
    nimi: 'Domtoren',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi Domtoren seisoo yksin?',
      'Kuka vastusti tornin rakentamista?',
    ],
    korostukset: ['karillon|soittokellon'],
    nappi: 'Alankomaiden korkein kirkontorni',
    // 5.1214 E / 52.09065 N — en-Wikipedia "Dom Tower of Utrecht"
    laudat: {
      maailmankartta: { x: 6004, y: 1298.1 },
    },
    teksti: 'Domtoren on 112,3 metrillään Alankomaiden korkein kirkontorni ja Utrechtin tunnus. '
      + 'Se rakennettiin vuosina 1321–1382 osaksi Pyhän Martinuksen katedraalia eli Domin '
      + 'kirkkoa, ja piirustukset teki John of Hainaut; katedraali jäi rahapulan takia '
      + 'kokonaan valmistumatta. Kun keskeneräinen keskilaiva romahti vuonna 1674, torni jäi '
      + 'seisomaan erilleen — ja se seisoo siinä kohdassa, jossa Utrecht sai alkunsa lähes '
      + 'kaksituhatta vuotta sitten. Saarnaaja Geert Groote paheksui hanketta aikanaan '
      + 'turhamaisena: liian korkea, liian kallis eikä edes kaunis. Tornissa on '
      + 'neljäntoista soittokellon sarja, painoltaan yhteensä 32 tonnia, ja kelloja soittaa '
      + 'yhä käsin Utrechtin kellonsoittajien kilta.',
    lahde: 'en-Wikipedia "Dom Tower of Utrecht", johdanto-osa sekä osiot "Design and '
      + 'construction" ja "Ringing Bells" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bourtange',
    nimi: 'Bourtange',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä tähtilinnoitus on?',
      'Miksi linnoitus rakennettiin juuri tähän?',
    ],
    korostukset: ['tähtilinnoitus|tähtilinnoitus'],
    nappi: 'Tähtilinnoitus suon keskellä',
    // 7.192 E / 53.0066 N — en-Wikipedia "Bourtange"
    laudat: {
      maailmankartta: { x: 6073.1, y: 1257 },
    },
    teksti: 'Bourtange on 430 asukkaan kylä Groningenin maakunnan itälaidalla lähellä Saksan '
      + 'rajaa. Linnoitus rakennettiin vuonna 1593 Alankomaiden kapinan aikana, kun Oranian '
      + 'Vilhelm halusi hallita Saksan ja espanjalaisten pitämän Groningenin välistä päätietä. '
      + 'Tie kulki hiekkaharjannetta pitkin Bourtangen suon halki, ja juuri harjanne antoi '
      + 'paikalle nimen: hollannin tange tarkoittaa hiekkaharjua. Vuodesta 1594 Bourtange '
      + 'kuului pohjoisten maakuntien ja Saksan välisen rajan linnoitusketjuun, ja '
      + 'linnoituksesta luovuttiin vasta 1851, jolloin siitä tuli tavallinen kylä. Vuosina '
      + '1967–1992 tähtilinnoitus palautettiin vaihe vaiheelta 1740-luvun asuunsa, ja '
      + 'nykyään se on ulkoilmamuseo.',
    lahde: 'en-Wikipedia "Bourtange", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'giethoorn',
    nimi: 'Giethoorn',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi kylässä ei ollut katuja?',
      'Mistä kylän järvet syntyivät?',
    ],
    korostukset: ['turpeennosto|turpeennostosta'],
    nappi: 'Kylä, jossa liikutaan veneellä',
    // 6.0781 E / 52.7389 N — en-Wikipedia "Giethoorn"
    laudat: {
      maailmankartta: { x: 6035.9, y: 1269 },
    },
    teksti: 'Giethoorn on noin 2 800 asukkaan kylä Overijsselin maakunnassa, ja sitä kutsutaan '
      + 'usein Alankomaiden Venetsiaksi. Vanhassa kyläosassa ei ollut lainkaan teitä, vaan '
      + 'kaikki liikkuminen tapahtui vesitse kanavia pitkin; myöhemmin sinne vedettiin '
      + 'pyörätie. Kylän järvet eivät ole jääkauden vaan ihmisen tekemiä: ne syntyivät '
      + 'turpeennostosta. Siltoja on 176, ja matkailu on kylän tärkein elinkeino. Kylä tuli '
      + 'laajemmin tunnetuksi vuonna 1958, kun ohjaaja Bert Haanstra kuvasi siellä '
      + 'komediansa Fanfare.',
    lahde: 'en-Wikipedia "Giethoorn", johdanto-osa sekä osiot "History" ja "Tourism" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'krollermuller',
    nimi: 'Kröller-Müllerin museo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenen kokoelmasta museo syntyi?',
      'Kuinka suuri veistospuutarha on?',
    ],
    korostukset: ['veistospuutarha|veistospuutarha'],
    nappi: 'Toiseksi suurin Van Gogh -kokoelma',
    // 5.8169 E / 52.0958 N — en-Wikipedia "Kröller-Müller Museum"
    laudat: {
      maailmankartta: { x: 6027.2, y: 1297.8 },
    },
    teksti: 'Kröller-Müllerin museo on valtiollinen taidemuseo Hoge Veluwen kansallispuistossa '
      + 'Otterlossa. Sen perusti taiteenkerääjä Helene Kröller-Müller, joka oli '
      + 'neuvonantajansa H. P. Bremmerin opastuksella ensimmäisiä Vincent van Goghin arvon '
      + 'tunnistajia; vuonna 1935 hän lahjoitti koko kokoelmansa Alankomaiden valtiolle, ja '
      + 'Henry van de Velden suunnittelema museo avattiin yleisölle 1938. Museossa on '
      + 'maailman toiseksi suurin Van Gogh -maalausten kokoelma heti Amsterdamin Van Gogh '
      + '-museon jälkeen, ja lisäksi töitä muun muassa Mondrianilta, Seurat’lta, Gauguinilta '
      + 'ja Picassolta. Metsän keskellä oleva veistospuutarha lisättiin vuonna 1961, ja se on '
      + 'yli kolmenkymmenen hehtaarin alallaan yksi Euroopan suurimmista. Puutarha toteuttaa '
      + 'perustajansa ajatusta taiteen, arkkitehtuurin ja luonnon yhteiselosta.',
    lahde: 'en-Wikipedia "Kröller-Müller Museum", johdanto-osa sekä osiot "History", '
      + '"Collection" ja "Sculpture garden" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nijmegen',
    nimi: 'Nijmegen',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Nijmegen on Alankomaiden vanhimpia kaupunkeja?',
      'Mistä kaupungin nimi tulee?',
    ],
    korostukset: ['Noviomagus|Noviomagus'],
    nappi: 'Kaupunki, joka täytti kaksituhatta vuotta',
    // 5.8625 E / 51.8475 N — en-Wikipedia "Nijmegen"
    laudat: {
      maailmankartta: { x: 6028.8, y: 1308.9 },
    },
    teksti: 'Nijmegen on Gelderlandin suurin kaupunki Waalin rannalla lähellä Saksan rajaa, ja '
      + 'se on Alankomaiden vanhimpia kaupunkeja: vuonna 2005 siellä juhlittiin kahdentuhannen '
      + 'vuoden ikää. Roomalaiset rakensivat paikalle sotilasleirin ennen ajanlaskun alkua, '
      + 'koska ympäröiviltä kukkuloilta näki hyvin Waalin ja Reinin laaksoon. Vuonna 98 se oli '
      + 'ensimmäinen paikka nykyisten Alankomaiden alueella, joka sai roomalaiset '
      + 'kaupunkioikeudet, ja keisari Traianus antoi sille vuonna 104 nimen Ulpia Noviomagus '
      + 'Batavorum — lyhyemmin Noviomagus, josta nykyinen nimi on kulunut. Kaarle Suuri piti '
      + 'kaupungissa palatsiaan vuonna 777, ja vuonna 1230 siitä tuli vapaa valtakunnankaupunki. '
      + 'Keskiajalla se kuului Hansaliittoon, ja vuodesta 1923 se on ollut yliopistokaupunki.',
    lahde: 'en-Wikipedia "Nijmegen", johdanto-osa sekä osiot "Antiquity" ja "Middle Ages" '
      + '(tarkistettu 6.9.2026).',
  },
];

