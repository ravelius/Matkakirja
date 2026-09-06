/*
 * MAASTOKOHTEET — NZL. Uuden-Seelannin kohteet ja maasto napautettaviksi.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Uudella-Seelannilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Oseania). Erä M2 antaa
 * maalle kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA; eläintäky (kiivi)
 * oli jo olemassa, ja kaksi skandaalia asuu js/packs/skandaalit.js:ssä.
 *
 * Tiedoston paikka, reitti, projektio ja kuvattomuus on perusteltu
 * sisarpakissa js/packs/maastokohteet-aus.js — sama erä, sama ratkaisu.
 * Lyhyesti: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon, jonka lähtöaineisto on
 * ämpärissä; tämä hakemiston kautta liitetty lista on kartalla heti.
 *
 * LEHDEN RAJAUS TARKISTETTU. Vartio 7a (tools/savukkeet/
 * savuke-maastokohteet.mjs) vaatii, että kohde osuu maan fokuslehden
 * rajaukseen, ja Uudella-Seelannilla rajaus on olemassa
 * (FOKUS_POHJAT.NZL: x 11285,14…11872,54, y 4272,17…5300,21). Kaikki
 * yksitoista riviä on mitattu sen sisään. Chathamsaaret jäisivät
 * rajauksen itäpuolelle, joten niitä ei ole valittu.
 *
 * YKSIKÄÄN EI OLE PELIKAUPUNGIN KOHDALLA. Maan viisi pelikaupunkia ovat
 * Auckland, Wellington, Christchurch, Milford Sound ja Dunedin
 * (js/packs/maailmankartta.js CITIES). Lähin uusi merkki on Waikato
 * 18,3 lautayksikön päässä Aucklandista; raja KAUPUNGIN_KOHDALLA_SADE
 * on 7 (js/fokuskohteet.js). Kunkin kohteen lähin kaupunki on kirjattu
 * sen koordinaattirivin viereen.
 *
 * AORAKI JÄTETTIIN POIS (sääntö N3). Maan korkein huippu on jo
 * maailmankartan nimiö: js/packs/maailmankartta-nimet.js -rivi
 * "Uuden-Seelannin Alpit" kantaa huippunaan Aorakin. Vuorikohteeksi
 * valittiin siksi Ruapehu, Pohjoissaaren korkein kohta ja maan suurin
 * aktiivinen tulivuori.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_NZL = [
  /* ================================================================
   * K2-ERÄ M2, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'waitangin-sopimuspaikka',
    nimi: 'Waitangi',
    tyyppi: 'historia',
    kysymykset: [
      'Mitkä kaksi asiakirjaa Waitangissa allekirjoitettiin?',
      'Mitä nimi Waitangi tarkoittaa?',
    ],
    korostukset: ['Waitangin sopimus|Waitangin sopimus'],
    nappi: 'Kaksi asiakirjaa, joista maa alkaa',
    // 174.08 E / -35.2661 N — en-Wikipedia "Waitangi, Northland".
    // Lähin pelikaupunki Auckland, 66,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11636, y: 4437.6 },
    },
    teksti: 'Waitangi on paikkakunta Saarten lahdella Pohjoissaaren pohjoisosassa, ja siellä '
      + 'allekirjoitettiin kaksi Uuden-Seelannin historian käännekohtaa: itsenäisyysjulistus '
      + '28. lokakuuta 1835 ja Waitangin sopimus 6. helmikuuta 1840. Sopimuskokous alkoi '
      + '5. helmikuuta James Busbyn talon edustalla, missä varakuvernööri Hobson luki '
      + 'ehdotuksen noin kolmellesadalle paikalla olleelle maorille ja eurooppalaiselle. Moni '
      + 'päällikkö puhui aluksi kruunun ehdotusta vastaan, mutta osa alkoi kannattaa sitä, ja '
      + 'kun kokous piti jatkua vasta 7. päivänä, päälliköt vaativat allekirjoitusta aiemmin. '
      + 'Nimi tarkoittaa maoriksi meluavia tai itkeviä vesiä.',
    lahde: 'en-Wikipedia "Waitangi, Northland", johdanto-osa sekä osiot "Etymology" ja '
      + '"Signing of Treaty of Waitangi" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ruapekapekan-pa',
    nimi: 'Ruapekapeka',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Ruapekapeka tarkoittaa?',
      'Miksi paaluaidat päällystettiin pellavalla?',
    ],
    korostukset: ['pūriri|pūriri-paalut'],
    nappi: 'Lepakon pesä, joka rakennettiin tykkejä vastaan',
    // 174.2333 E / -35.4333 N — pā noin 20 km Kawakawasta kaakkoon
    // (en-Wikipedia "Battle of Ruapekapeka", osio "Ruapekapeka pā");
    // artikkelilla ei ole koordinaattia, piste on valittu sen kohdalle.
    // Lähin pelikaupunki Auckland, 58,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11641.1, y: 4444 },
    },
    teksti: 'Ruapekapeka oli yksi Uuden-Seelannin suurimmista ja monimutkaisimmista '
      + 'linnoituksista, ja se rakennettiin nimenomaan kestämään brittitykistön tulta. Sen '
      + 'suunnittelivat Te Ruki Kawiti liittolaisineen vuonna 1845 hyvään puolustusasemaan '
      + 'alueelle, jolla ei ollut strategista arvoa ja joka oli kaukana siviileistä — se oli '
      + 'haaste brittivallalle. Nimi tarkoittaa lepakon pesää ja viittaa syviin kuoppiin, '
      + 'joihin päästiin kapeista pyöreistä aukoista ja joissa 15–20 hengen ryhmä oli suojassa '
      + 'pommituksen ajan. Kolmimetriset pūriri-paalut päällystettiin pellavan lehdillä, jotka '
      + 'hidastivat musketinluodin niin tehokkaasti, että aidasta tuli käytännössä '
      + 'luodinkestävä. Taistelu käytiin joulukuun 1845 lopusta tammikuun 1846 puoliväliin.',
    lahde: 'en-Wikipedia "Battle of Ruapekapeka", johdanto-osa ja osio "Ruapekapeka pā" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'cape-reinga',
    nimi: 'Cape Reinga',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Te Rerenga Wairua tarkoittaa?',
      'Mitkä kaksi merta kohtaavat niemen edustalla?',
    ],
    korostukset: ['Te Rerenga Wairua|Te Rerenga Wairua'],
    nappi: 'Paikka, josta henget hyppäävät',
    // 172.6797 E / -34.4214 N — en-Wikipedia "Cape Reinga".
    // Lähin pelikaupunki Auckland, 117,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11589.3, y: 4405.8 },
    },
    teksti: 'Cape Reinga eli Te Rerenga Wairua on Aupōurin niemimaan luoteisin kärki '
      + 'Pohjoissaaren pohjoispäässä. Maorin kielessä nimi tarkoittaa henkien hyppäyspaikkaa, '
      + 'ja reinga on manalan nimi: uskomuksen mukaan juuri täältä kuolleiden henget astuvat '
      + 'tuonpuoleiseen. Niemeä pidetään myös Tasmaninmeren ja Tyynenmeren rajana, ja '
      + 'majakalta voi katsoa vuorovesivirtaa, jossa kaksi merta törmäävät ja vesi käy '
      + 'levottomaksi. Maorit kutsuvat kohtaamista Rehuan meren ja Whitirean meren '
      + 'kohtaamiseksi. Niemeä luullaan usein Pohjoissaaren pohjoisimmaksi kohdaksi, mutta '
      + 'North Capen Surville-jyrkänteet kolmenkymmenen kilometrin päässä idässä ovat kolme '
      + 'kilometriä pohjoisempana.',
    lahde: 'en-Wikipedia "Cape Reinga", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'whakarewarewa',
    nimi: 'Whakarewarewa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten geysirit saatiin palaamaan?',
      'Mihin laakson maaperän lämpöä käytetään?',
    ],
    korostukset: ['Pōhutu|Pōhutu'],
    nappi: 'Kylä, joka keittää ruokansa maasta',
    // 176.2564 E / -38.1622 N — en-Wikipedia "Whakarewarewa".
    // Lähin pelikaupunki Auckland, 68,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11708.5, y: 4548.4 },
    },
    teksti: 'Whakarewarewa on geoterminen laakso Rotoruassa, ja sen paikalla oli noin vuodesta '
      + '1325 maorilinnoitus Te Puia, jota ei kerrottu koskaan vallatun taistelussa. Maorit '
      + 'ovat asuneet siellä siitä lähtien ja käyttäneet maan lämpöä lämmitykseen ja '
      + 'ruoanlaittoon. Laaksossa on noin viisisataa lähdettä ja ainakin 65 geysirin aukkoa, '
      + 'joilla jokaisella on oma nimensä; seitsemän geysiriä on nykyään aktiivisia, ja niistä '
      + 'Pōhutu purkautuu noin tunnin välein jopa kolmenkymmenen metrin korkeuteen. Geysirit '
      + 'olivat vähällä kadota, kun rotorualaiset porasivat matalia kuumavesikaivoja: '
      + 'vuosina 1987–1988 sementoitiin umpeen 106 kaivoa 1,5 kilometrin säteellä Pōhutusta, '
      + 'ja lähteet ovat sen jälkeen selvästi toipuneet.',
    lahde: 'en-Wikipedia "Whakarewarewa", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'waitomon-kiiltomatoluola',
    nimi: 'Waitomon luola',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä valo luolan katossa hohtaa?',
      'Kuka johdatti tutkijat luolaan?',
    ],
    korostukset: ['Arachnocampa luminosa|Arachnocampa luminosa'],
    nappi: 'Katto, joka on täynnä tähtiä',
    // 175.1036 E / -38.2608 N — en-Wikipedia "Waitomo Glowworm Cave".
    // Lähin pelikaupunki Auckland, 53,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11670.1, y: 4552.2 },
    },
    teksti: 'Waitomon luola on Pohjoissaarella sijaitseva monisalinen luola, joka tunnetaan '
      + 'kiiltomatokannastaan: Arachnocampa luminosa elää vain Uudessa-Seelannissa. Nimi tulee '
      + 'maorin sanoista wai eli vesi ja tomo eli kuilu. Paikallinen maori Tane Tinorau näytti '
      + 'luolan suun maanmittareille vuonna 1884, ja joulukuussa 1887 hän ja Fred Mace '
      + 'rakensivat lautan ja menivät sisään kynttilänvalossa — heti matkan alussa he '
      + 'tulivat kiiltomatogrottoon ja hämmästyivät katosta tuikkivaa valoa. Tinorau löysi '
      + 'itse myöhemmin luolan ylemmän suun, joka on nykyään kävijöiden sisäänkäynti, ja '
      + 'vuoteen 1889 mennessä hän ja hänen vaimonsa Huti opastivat siellä vieraita. Vuonna '
      + '2013 luolaa kutsuttiin maailman vierailluimmaksi kiiltomatokohteeksi.',
    lahde: 'en-Wikipedia "Waitomo Glowworm Cave", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'napierin-art-deco',
    nimi: 'Napier',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Napier on kokonaan 1930-luvun tyyliä?',
      'Mitä Napierin satamasta viedään?',
    ],
    korostukset: ['art deco|art deco'],
    nappi: 'Kaupunki, joka rakennettiin kerralla uudestaan',
    // 176.9178 E / -39.4903 N — en-Wikipedia "Napier, New Zealand".
    // Lähin pelikaupunki Wellington, 92,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11730.6, y: 4600.1 },
    },
    teksti: 'Napier on rantakaupunki Hawke\'s Bayn alueella Pohjoissaaren itärannikolla, ja '
      + 'sen maorinkielinen nimi on Ahuriri. Kaupunkia sanotaan joskus Tyynenmeren Nizzaksi: '
      + 'aurinkoisen ilmaston, Norfolkinmäntyjen reunustaman rantabulevardin ja laajan art '
      + 'deco -arkkitehtuurin takia. Talot ovat samaa ikäluokkaa, koska suuri osa kaupungista '
      + 'tuhoutui Hawke\'s Bayn maanjäristyksessä vuonna 1931 ja rakennettiin uudelleen '
      + 'kerralla — mukana on myös Spanish Mission -tyyliä. Napier on Etelänpuoliskon '
      + 'suurimman villakeskuksen solmukohta, ja sen satamasta viedään maan koillisosan '
      + 'omenat, päärynät ja kivihedelmät sekä villaa, pakastelihaa ja puuta.',
    lahde: 'en-Wikipedia "Napier, New Zealand", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'arrowtown',
    nimi: 'Arrowtown',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi kullan Arrow-joesta?',
      'Missä kiinalaiset kaivosmiehet joutuivat asumaan?',
    ],
    korostukset: ['Bush Creek|Bush Creekin'],
    nappi: 'Kahdeksansataa kaivajaa yhdessä kuukaudessa',
    // 168.8358 E / -44.9425 N — en-Wikipedia "Arrowtown".
    // Lähin pelikaupunki Milford Sound, 46,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11461.2, y: 4818.8 },
    },
    teksti: 'Arrowtown on Otagon kultakaivoskaupunki Eteläsaarella Arrow-joen rannalla; '
      + 'maorin kielellä se on Kā-muriwai. Elokuussa 1862 Jack Tewa, joka tunnettiin nimellä '
      + 'Maori Jack, löysi joesta kultaa, ja paikalle syntyi nopeasti kahdeksansadan '
      + 'kaivosmiehen kylä. Poliiseja oli koko piirissä vain tusina tuhansia kaivajia kohti, '
      + 'ja laittomuus jatkui, kunnes kaupunkiin rakennettiin poliisileiri ja valvojan '
      + 'toimisto. Huipussaan kaupungin väkiluku nousi yli seitsemääntuhanteen. '
      + '1870-luvulla saapuneet kiinalaiset asukkaat pakotettiin asumaan majoissa Bush Creekin '
      + 'varrella, ja kaupungissa on yhä hyvin säilyneitä kaivosajan rakennuksia.',
    lahde: 'en-Wikipedia "Arrowtown", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'dennistonin-kaltevuus',
    nimi: 'Denniston',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten hiili tuli ylängöltä alas?',
      'Kuinka moni asuu ylängöllä nykyään?',
    ],
    korostukset: ['Denniston Incline|Denniston Incline'],
    nappi: 'Hiilirata, joka veti itsensä alas',
    // 171.8 E / -41.7333 N — en-Wikipedia "Denniston, New Zealand".
    // Lähin pelikaupunki Christchurch, 87,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11560, y: 4688.7 },
    },
    teksti: 'Denniston on pieni asutus Eteläsaaren länsirannikolla, kuudensadan metrin '
      + 'korkeudessa Papahauan vuoriston Dennistonin ylängöllä. Se on nimetty R. B. Dennistonin '
      + 'mukaan, joka johti länsirannikon ensimmäistä suurta kaivosta 1870-luvulla. '
      + '1900-luvun alkuvuosikymmeninä ylängön kylissä asui jopa 1 400 ihmistä, ja koko '
      + 'asutus oli olemassa vain hiiltä varten. Hiili laskettiin rautatievaunuissa alas '
      + 'Denniston Incline -kaltevuusrataa myöten Conns Creekiin, josta veturit veivät sen '
      + 'Westportin satamaan. Rata suljettiin 16. elokuuta 1967, ja nykyään ylängöllä asuu '
      + 'alle kymmenen ihmistä; rakennuksista ei ole juuri mitään jäljellä, mutta jäänteitä on '
      + 'siellä täällä pensaikossa.',
    lahde: 'en-Wikipedia "Denniston, New Zealand", johdanto-osa ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * MAASTOKOHTEET — kolme kappaletta, tyypit vuori, meri ja joki.
   * ============================================================== */
  {
    id: 'ruapehu',
    nimi: 'Ruapehu',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Ruapehu tarkoittaa?',
      'Mikä on Te Wai ā-moe?',
    ],
    korostukset: ['Te Wai ā-moe|Te Wai ā-moe'],
    nappi: 'Meluava kuoppa Pohjoissaaren katolla',
    // 175.57 E / -39.28 N — en-Wikipedia "Mount Ruapehu".
    // Lähin pelikaupunki Wellington, 78,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11685.7, y: 4591.9 },
    },
    teksti: 'Ruapehu on aktiivinen kerrostulivuori Taupōn vulkaanisen vyöhykkeen eteläpäässä '
      + 'Tongarion kansallispuistossa. Se on Uuden-Seelannin suurin aktiivinen tulivuori ja '
      + 'Pohjoissaaren korkein kohta, ja sillä on kolme päähuippua: Tahurangi 2 797 metriä, '
      + 'Te Heuheu 2 755 metriä ja Paretetaitonga 2 751 metriä. Huippujen välissä on syvä '
      + 'aktiivinen kraatteri, joka täyttyy vedellä purkausten välillä ja tunnetaan nimellä '
      + 'Te Wai ā-moe eli kraatterijärvi. Nimi Ruapehu tarkoittaa maoriksi meluavaa tai '
      + 'räjähtävää kuoppaa. Vuoren rinteillä ovat Pohjoissaaren merkittävimmät hiihtokeskukset '
      + 'ja saaren ainoat jäätiköt.',
    lahde: 'en-Wikipedia "Mount Ruapehu", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'taupojarvi',
    nimi: 'Taupojärvi',
    /*
     * TYYPPI ON 'meri' EIKÄ 'jarvi', ja syy on koko perheen sopimus:
     * KOHDE_TYYPPISYMBOLIT (js/fokuskohteet.js) tuntee vain neljä
     * luonnon tyyppiä — vuori, meri, saari ja joki — ja tyyppi 'jarvi'
     * jättäisi merkin ilman symbolia ja nimiötä. Sama ratkaisu ja sama
     * perustelu kuin Voltajärvellä (js/packs/maastokohteet-gha.js).
     */
    tyyppi: 'meri',
    kysymykset: [
      'Millainen kuoppa järven alla on?',
      'Mikä joki laskee järvestä?',
    ],
    korostukset: ['kaldera|kalderassa'],
    nappi: 'Järvi supertulivuoren kuopassa',
    // 175.9078 E / -38.8069 N — en-Wikipedia "Lake Taupō".
    // Lähin pelikaupunki Auckland, 82,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11696.9, y: 4573.4 },
    },
    teksti: 'Taupojärvi on Pohjoissaaren kraatterijärvi Taupōn tulivuoren kalderassa. Sen '
      + 'pinta-ala on 616 neliökilometriä, mikä tekee siitä Uuden-Seelannin suurimman järven '
      + 'ja Oseanian toiseksi suurimman makean veden järven Papua-Uuden-Guinean Murrayjärven '
      + 'jälkeen. Rantaviivaa on noin 193 kilometriä ja syvyyttä enimmillään 186 metriä. '
      + 'Kaldera syntyi pääosin supertulivuoren purkauksessa noin 25 600 vuotta sitten, ja '
      + 'geologisten tietojen mukaan tulivuori on purkautunut 29 kertaa viimeisten '
      + 'kolmenkymmenentuhannen vuoden aikana. Järvestä laskee Waikato, maan pisin joki, ja '
      + 'sen pintaa säädellään vuosina 1940–41 rakennetuilla luukuilla.',
    lahde: 'en-Wikipedia "Lake Taupō", johdanto-osa sekä osiot "Geography" ja "Lake formation '
      + 'and volcanism" (tarkistettu 6.9.2026).',
  },
  {
    id: 'waikato',
    nimi: 'Waikato',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joki alkaa?',
      'Mitä nimi Waikato tarkoittaa?',
    ],
    korostukset: ['Tūrangawaewae|Tūrangawaewae'],
    nappi: 'Virtaava vesi, joka on myös mana',
    // 174.708 E / -37.3694 N — en-Wikipedia "Waikato River".
    // Lähin pelikaupunki Auckland, 18,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11656.9, y: 4517.8 },
    },
    teksti: 'Waikato on Uuden-Seelannin pisin joki, 425 kilometriä Pohjoissaaren halki. Se '
      + 'alkaa Ruapehun itärinteiltä, yhtyy Tongarion vesistöön ja virtaa Taupojärven läpi; '
      + 'järven koillislaidalta se jatkaa Hukan putouksina ja edelleen luoteeseen Waikaton '
      + 'tasangoille, kunnes laskee Tasmaninmereen Aucklandin eteläpuolella. Nykyinen uoma '
      + 'muotoutui pääpiirteissään noin 17 000 vuotta sitten. Nimi tarkoittaa maoriksi '
      + 'virtaavaa vettä. Joki on hengellisesti tärkeä useille maoriheimoille, ja etenkin '
      + 'suuri Tainui pitää sitä manansa eli ylpeytensä lähteenä; Tūrangawaewaen arvostettu '
      + 'marae on sen rannalla Ngāruawāhiassa.',
    lahde: 'en-Wikipedia "Waikato River", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
