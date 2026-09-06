/*
 * MAASTOKOHTEET — ECU. Ecuadorin maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Ecuadorilla ei ollut laskurin mukaan yhtäkään karttamerkkiä
 * (docs/moduulit/karttanostot-kattavuus.md, Etelä-Amerikka): nolla
 * kohdetta, nolla maastokohdetta, ei eläintäkyä eikä skandaalia. Tämä
 * tiedosto on maailman erän M17 Ecuadorin osuus: KAHDEKSAN KOHDETTA ja
 * KOLME MAASTOKOHDETTA, sama malli kuin erässä M4
 * (js/packs/maastokohteet-can.js).
 *
 * KAKSI PELIKAUPUNKIA, JOISTA TOINEN ON SAARIRYHMÄ. Laudalla ovat
 * Quito ja Galápagos. Uutta merkkiä ei saa panna pelikaupungin
 * kohdalle (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js), ja se
 * pudotti listasta Mitad del Mundon: päiväntasaajamonumentti on vain
 * 5,9 lautayksikön päässä Quitosta. Lähin listaan jäänyt merkki on
 * Otavalo 15,3 yksikön päässä Quitosta.
 *
 * GALÁPAGOS EI OLE TÄSSÄ LISTASSA, JA SYY ON LEHDEN RAJAUS.
 * Fokuslehden rajaus (js/packs/fokus-grc.js FOKUS_POHJAT.ECU, lauta
 * maailmankartta, x 3098,2–3360,5 / y 3125,0–3417,5) kattaa vain
 * mannermaan; saariryhmä on laudalla kohdassa x ≈ 2800 eli reilusti
 * rajauksen länsipuolella, joten saarille sijoitettu merkki kaataisi
 * savukkeen vartion 7a (tools/savukkeet/savuke-maastokohteet.mjs).
 * Vartiota EI ole muutettu: kohteet on valittu rajauksen sisältä.
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/ECU.json ei ole, joten kolme
 * maastokohdetta on valittu itse ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista).
 *
 * SÄÄNTÖ N3 (sama nimi kartalla vain kerran). Laudan oma nimitaulu
 * (js/packs/maailmankartta-nimet.js) kantaa jo Andit; sitä ei ole
 * täällä. Maastokolmikoksi valittiin Cotopaxi, Quilotoa ja Napo,
 * joita kartalla ei ole kertaakaan.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_ECU = [
  /* ================================================================
   * MAASTO — kolme kohdetta: tulivuori, kraatterijärvi ja joki.
   * ============================================================== */
  {
    id: 'cotopaxi',
    nimi: 'Cotopaxi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi jäätikkö on täällä harvinaisuus?',
      'Mikä on lahar?',
    ],
    korostukset: ['lahar|laharit', 'päiväntasaajan jäätikkö|päiväntasaajan jäätiköistä'],
    nappi: 'Melkein täydellinen kartio 5 897 metrissä',
    // -78.43778 E / -0.68056 N — en-Wikipedia "Cotopaxi"
    // Lähin pelikaupunki: Quito 16,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3218.7, y: 3234.2 },
    },
    teksti: 'Cotopaxi on toiminnassa oleva kerrostulivuori Andeilla noin 50 kilometriä '
      + 'Quitosta etelään ja Ecuadorin toiseksi korkein huippu Chimborazon jälkeen: 5 897 '
      + 'metriä. Se on maailman korkeimpia toimivia tulivuoria. Kartio on lähes '
      + 'täysin symmetrinen, nousee 3 800 metrin ylätasangolta ja on tyveltään noin 23 '
      + 'kilometriä leveä. Huipulla on 800 × 550 metrin kraatteri, joka on 250 metriä syvä, ja '
      + 'rinteellä yksi maailman harvoista päiväntasaajan jäätiköistä — se alkaa 5 000 metrin '
      + 'korkeudelta. Cotopaxin tiedetään purkautuneen 87 kertaa, ja purkausten laharit eli '
      + 'mutavirrat ovat muovanneet vuoren ympärille kokonaisen laaksojen verkoston. Uusin '
      + 'purkaus alkoi 21. lokakuuta 2022, ja helmikuuhun 2023 mennessä vuoressa oli mitattu '
      + 'noin 8 000 maanjäristystä.',
    lahde: 'en-Wikipedia "Cotopaxi", johdanto-osa ja osio "Description" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'quilotoa',
    nimi: 'Quilotoa',
    tyyppi: 'jarvi',
    kysymykset: [
      'Mistä järven vihreä väri johtuu?',
      'Kuinka kauas vuoden 1280 purkauksen tuhka levisi?',
    ],
    korostukset: ['kaldera|kaldera', 'fumaroli|fumaroleja'],
    nappi: 'Kolme kilometriä leveä vihreä silmä',
    // -78.9 E / -0.85 N — en-Wikipedia "Quilotoa"
    // Lähin pelikaupunki: Quito 26,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3203.3, y: 3239.8 },
    },
    teksti: 'Quilotoa on vedellä täyttynyt kraatterijärvi ja Ecuadorin Andien läntisin '
      + 'tulivuori. Kolme kilometriä leveä kaldera syntyi noin 800 vuotta sitten, kun '
      + 'dasiittivuori romahti valtavassa purkauksessa: pyroklastiset virrat ja laharit '
      + 'ylsivät Tyynellemerelle asti, ja tuhkaa levisi ilmateitse ympäri pohjoisia Andeja. '
      + 'Purkausta edelsi 14 000 vuoden hiljaisuus, ja se tunnetaan vuoden 1280 pliniaanisena '
      + 'purkauksena. Kalderaan on sen jälkeen kertynyt 250 metriä syvä järvi, jonka '
      + 'vihertävä väri tulee veteen liuenneista mineraaleista. Järven pohjalla on '
      + 'fumaroleja ja itärinteellä kuumia lähteitä. Kalderan reuna on epätasainen ja nousee '
      + 'korkeimmillaan 3 915 metriin kolmen laavakuvun kohdalla.',
    lahde: 'en-Wikipedia "Quilotoa", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'napo',
    nimi: 'Napo',
    tyyppi: 'joki',
    kysymykset: [
      'Miltä vuorilta Napo saa alkunsa?',
      'Mihin asti jokea voi kulkea veneellä?',
    ],
    korostukset: ['Curaray|Curarayn', 'Coca|Coca'],
    nappi: 'Amazonin sivujoki tulivuorten juurelta',
    // -77 E / -0.5 N (Coca, Orellana) — en-Wikipedia "Napo River"
    // Lähin pelikaupunki: Quito 50,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3266.7, y: 3228.2 },
    },
    teksti: 'Napo on Amazonin sivujoki, joka saa alkunsa Ecuadorissa itäisten Andien '
      + 'tulivuorten — Antisanan, Sincholaguan ja Cotopaxin — rinteiltä. Pituutta on 1 075 '
      + 'kilometriä, valuma-aluetta noin 103 000 neliökilometriä, ja Mazánin kohdalla '
      + 'keskivirtaama on 6 800 kuutiometriä sekunnissa. Pohjoisesta siihen yhtyy Coca, jonka '
      + 'latvat ovat Cayamben rotkoissa aivan päiväntasaajalla. Cocan haarasta Curarayn '
      + 'suulle joki on täynnä uppotukkeja ja liikkuvia hiekkasärkkiä ja hajoaa moneksi '
      + 'uomaksi viidakon peittämien saarten väliin; sadekaudella se paisuu leveäksi. '
      + 'Amazonilta ylöspäin jokea voi kulkea aluksella noin 348 kilometriä Curarayn haaraan '
      + 'asti, ja siitä eteenpäin vain kanootilla.',
    lahde: 'en-Wikipedia "Napo River", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  /* ================================================================
   * ERÄ M17, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'ingapirca',
    nimi: 'Ingapirca',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä asuivat paikalla ennen inkoja?',
      'Miten Aurinkotemppeli on suunnattu?',
    ],
    korostukset: ['cañari|cañarit', 'Aurinkotemppeli|Aurinkotemppeli'],
    nappi: 'Ecuadorin suurimmat inkarauniot',
    // -78.87188 E / -2.548588 N — en-Wikipedia "Ingapirca"
    // Lähin pelikaupunki: Quito 80,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3204.3, y: 3296.5 },
    },
    teksti: 'Ingapirca on kylä ja arkeologinen alue Cañarin maakunnassa Ecuadorissa, ja nimi '
      + 'tarkoittaa ketšuaksi inkamuuria. Ne ovat Ecuadorin suurimmat tunnetut inkarauniot. '
      + 'Seudulla asuivat cañarit, jotka kutsuivat paikkaa Hatun Cañariksi; kun inkojen '
      + 'Túpac Yupanqui yritti valloittaa heidät, se ei onnistunut sotimalla, ja hän nai '
      + 'lopulta cañariprinsessan. Kansat sopivat riitansa ja asuivat rinnakkain kumpikin '
      + 'omilla tavoillaan. Rakennuskokonaisuus on cañari-inkalaista alkuperää ja toimi sekä '
      + 'linnoituksena että varastona pohjoiseen matkaaville joukoille; alueella on myös '
      + 'monimutkainen maanalainen vesijohtojärjestelmä. Aurinkotemppeli on ladottu ilman '
      + 'laastia, ja se on suunnattu niin, että päivänseisauksina auringonvalo osuu '
      + 'täsmälleen huipun pienen kammion oviaukon keskeltä sisään.',
    lahde: 'en-Wikipedia "Ingapirca", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cuenca',
    nimi: 'Cuenca',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä kaupungin raunioille Cuenca perustettiin?',
      'Miksi sitä kutsutaan Ecuadorin Ateenaksi?',
    ],
    korostukset: ['Tomebamba|Tomebamban'],
    nappi: 'Neljän joen kaupunki 2 538 metrissä',
    // -79.00448 E / -2.89741 N — en-Wikipedia "Cuenca, Ecuador"
    // Lähin pelikaupunki: Quito 92,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3199.9, y: 3308.1 },
    },
    teksti: 'Cuenca — virallisesti Santa Ana de los Ríos de Cuenca — on Azuayn maakunnan '
      + 'pääkaupunki Etelä-Ecuadorin Andeilla. Sen halki virtaa neljä jokea: Tomebamba, '
      + 'Tarqui, Yanuncay ja Machángara. Kaupunki on 2 538 metrin korkeudessa, ja '
      + 'vuosikeskilämpötila on 16,3 astetta. Arkkitehtuurinsa ja kulttuurielämänsä takia '
      + 'sitä kutsutaan Andien Cuencaksi tai Ecuadorin Ateenaksi. Kaupunki perustettiin 12. '
      + 'huhtikuuta 1557 inkojen hallintokeskuksen Tomebamban ja cañarien Guapondeligin '
      + 'raunioille varakuninkaan käskystä. Vuoden 2022 laskennassa asukkaita oli 596 101, '
      + 'mikä tekee siitä maan kolmanneksi suurimman kaupungin Guayaquilin ja Quiton '
      + 'jälkeen. Historiallinen keskusta pääsi maailmanperintöluetteloon 1999.',
    lahde: 'en-Wikipedia "Cuenca, Ecuador", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'guayaquil',
    nimi: 'Guayaquil',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaupunki perustettiin juuri tähän?',
      'Milloin Guayaquil itsenäistyi Espanjasta?',
    ],
    korostukset: ['telakka|telakaksi', 'Guayas|Guayasjoen'],
    nappi: 'Ecuadorin suurin kaupunki ja pääsatama',
    // -79.8875 E / -2.19 N — en-Wikipedia "Guayaquil"
    // Lähin pelikaupunki: Quito 82,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3170.4, y: 3284.5 },
    },
    teksti: 'Guayaquil eli Santiago de Guayaquil on Guayasin maakunnan pääkaupunki, Ecuadorin '
      + 'suurin kaupunki sekä maan talouden keskus ja pääsatama. Se sijaitsee Guayasjoen '
      + 'länsirannalla; joki laskee Tyyneenmereen Guayaquilinlahdella. Asukkaita on 2 746 403, '
      + 'ja koko kaupunkiseudulla 3 618 450 — se on Etelä-Amerikan suurin kaupunki, joka ei '
      + 'ole pääkaupunki. Useiden epäonnistuneiden yritysten jälkeen kaupunki perustettiin '
      + 'lopullisesti 1547 Espanjan kruunun telakaksi ja kauppasatamaksi, ja siitä tuli '
      + 'siirtomaatalouden solmukohta. Guayaquil oli ensimmäinen ecuadorilainen kaupunki, joka '
      + 'saavutti itsenäisyyden Espanjasta pysyvästi vuonna 1820; se oli sen jälkeen Vapaan '
      + 'Guayaquilin maakunnan pääkaupunki, kunnes alue liitettiin Suur-Kolumbiaan.',
    lahde: 'en-Wikipedia "Guayaquil", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'yasuni',
    nimi: 'Yasuní',
    tyyppi: 'muu',
    kysymykset: [
      'Ketkä elävät puistossa eristyksissä?',
      'Mitä Yasuní-ITT-aloite lupasi?',
    ],
    korostukset: ['Tagaeri|Tagaeri', 'Yasuní-ITT|Yasuní-ITT-aloitteen'],
    nappi: 'Sademetsä miljardin tynnyrin päällä',
    // -75.91667 E / -1.08333 N — en-Wikipedia "Yasuní National Park"
    // Lähin pelikaupunki: Quito 90,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3302.8, y: 3247.6 },
    },
    teksti: 'Yasuní on noin 10 000 neliökilometrin suojelualue Napo- ja Curarayjokien välissä '
      + 'Ecuadorin Amazoniassa, pääosin sademetsää. Puisto on noin 250 kilometriä Quitosta, ja '
      + 'se nimettiin Unescon biosfäärialueeksi viereisen huaoranien alueen kanssa 1989. Alue '
      + 'on huaoranien esi-isien maata, ja siellä elää kaksi eristyksissä pysyttelevää '
      + 'kansaa, Tagaeri ja Taromenane. Puiston alla arvioidaan olevan 1,7 miljardia '
      + 'tynnyriä raakaöljyä eli 40 prosenttia Ecuadorin varannoista. Presidentti Rafael '
      + 'Correa käynnisti 2007 Yasuní-ITT-aloitteen, joka lupasi jättää öljyn maahan, jos '
      + 'kansainvälinen yhteisö korvaisi menetyksen; rahaa ei kertynyt tarpeeksi, ja pumppaus '
      + 'alkoi 2016 ja laajeni 2019.',
    lahde: 'en-Wikipedia "Yasuní National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'paholaisen-nena',
    nimi: 'Paholaisen nenä',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten juna nousee kallionnenän yli?',
      'Kuinka paljon rata nousee rannikolta Andeille?',
    ],
    korostukset: ['sahaus|sahaamalla', 'Alausí|Alausín'],
    nappi: 'Juna, joka kiipeää peruuttamalla',
    // -78.88333 E / -2.2 N (Sibambe) — en-Wikipedia "Empresa de Ferrocarriles Ecuatorianos"
    // Lähin pelikaupunki: Quito 68,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3203.9, y: 3284.8 },
    },
    teksti: 'Ecuadorin valtionrautatie rakennettiin yhdistämään Tyynenmeren rannikko Andien '
      + 'ylänköön. Rata on maan suurin yksittäinen rakennushanke, kaikkiaan 965,5 kilometriä '
      + 'ja raideleveydeltään 1 067 milliä. Eteläinen osuus alkaa Guayaquilin satamasta ja '
      + 'kääntyy itään vuorille, missä on noussut yli 2,5 kilometriä, ennen kuin juna saavuttaa '
      + 'Riobamban 2 754 metrissä. Suurin nousu tehdään Paholaisen nenällä eli Nariz del '
      + 'Diablolla, jossa juna kiipeää kallionnenää sahaamalla edestakaisin. Hanke aloitettiin '
      + 'presidentti Gabriel García Morenon aikana 1861, ensimmäinen osuus avattiin 1873, ja '
      + 'nousun Andeille vei läpi presidentti Eloy Alfaro. Kaikki liikenne loppui 2020, mutta '
      + 'Alausín ja Sibamben välinen pätkä on yksi niistä, jotka on avattu uudelleen.',
    lahde: 'en-Wikipedia "Empresa de Ferrocarriles Ecuatorianos", johdanto-osa sekä osiot '
      + '"Construction", "Operation" ja "Restoration" (tarkistettu 6.9.2026).',
  },
  {
    id: 'panamahattu',
    nimi: 'Panamahattu',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi ecuadorilaista hattua kutsutaan panamahatuksi?',
      'Mikä kasvi antaa oljen?',
    ],
    korostukset: ['toquilla|toquillaoljesta', 'Montecristi|Montecristin'],
    nappi: 'Hattu, joka ei ole Panamasta',
    // -80.667 E / -1.05 N (Montecristi) — en-Wikipedia "Panama hat"
    // Lähin pelikaupunki: Quito 78,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3144.4, y: 3246.5 },
    },
    teksti: 'Panamahattu on ecuadorilainen olkihattu, joka punotaan Carludovica palmata '
      + '-kasvin lehdistä eli toquillaoljesta. Espanjalaiset näkivät jo 1526 rannikon '
      + 'asukkailla lieriättömän hatun, joka oli punottu samasta kuidusta. 1600-luvun '
      + 'puoliväliin mennessä punonnasta oli tullut kotiteollisuutta rannikolla ja Andien '
      + 'pikkukaupungeissa. Nimi on harhaanjohtava: hatut lähetettiin ensin Panaman kannakselle '
      + 'ja vasta sieltä eteenpäin, joten ne saivat nimen myyntipaikkansa mukaan. Kysyntää '
      + 'kasvatti Kalifornian kultaryntäys, sillä meritietä matkanneet kullankaivajat '
      + 'tarvitsivat kannaksen ylityksellä hatun; 1850 vientiä oli jo 220 000 hattua vuodessa. '
      + 'Parhaat hatut ovat Montecristin superfinot, joissa on jopa 3 000 punosta '
      + 'neliötuumalla. Punonnan taito lisättiin Unescon aineettoman kulttuuriperinnön '
      + 'luetteloon 5. joulukuuta 2012.',
    lahde: 'en-Wikipedia "Panama hat", johdanto-osa sekä osiot "History" ja "Construction" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'valdivian-kulttuuri',
    nimi: 'Valdivian kulttuuri',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhaa Valdivian keramiikka on?',
      'Miten kylät oli rakennettu?',
    ],
    korostukset: ['keramiikka|keramiikkaa', 'Santa Elena|Santa Elenan'],
    nappi: 'Amerikan vanhimpia kyliä, 3500 eaa.',
    // -80.87 E / -1.8 N (Valdivia, Santa Elena) — en-Wikipedia "Valdivia culture"
    // Lähin pelikaupunki: Quito 96,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3137.7, y: 3271.5 },
    },
    teksti: 'Valdivian kulttuuri on yksi Amerikkojen vanhimmista tunnetuista '
      + 'paikallaanpysyvistä kulttuureista. Se kukoisti Santa Elenan niemimaan rannikolla '
      + 'Ecuadorissa vuosina 3500–1500 eaa., tuhat vuotta Las Vegas -kulttuurin jälkeen. '
      + 'Jäänteet löysi 1956 ecuadorilainen arkeologi Emilio Estrada, ja 1960-luvun alussa '
      + 'työhön liittyivät yhdysvaltalaiset Clifford Evans ja Betty Meggers. Valdivialaiset '
      + 'rakensivat talonsa ympyrään tai soikioon keskusaukion ympärille ja elivät '
      + 'suhteellisen tasa-arvoisessa yhteisössä pääosin kalastuksesta; he viljelivät myös '
      + 'maissia, papuja, kurpitsaa, kassavaa, chiliä ja puuvillaa, jota kehrättiin ja '
      + 'kudottiin vaatteiksi. Keramiikkaa on ajoitettu vuoteen 2700 eaa.: aluksi karkeaa ja '
      + 'käytännöllistä, myöhemmin hienoa ja suurta, tyypillisimmillään kiillotetun '
      + 'tummanpunaista.',
    lahde: 'en-Wikipedia "Valdivia culture", johdanto-osa ja osio "Culture" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'otavalo',
    nimi: 'Otavalo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Otavalon tori on kuuluisa?',
      'Miltä torin katokset näyttävät?',
    ],
    korostukset: ['Plaza de los Ponchos|Plaza de los Ponchos', 'tagua|taguapähkinästä'],
    nappi: 'Lauantaitori kolmen tulivuoren välissä',
    // -78.2625 E / 0.23028 N — en-Wikipedia "Otavalo (city)"
    // Lähin pelikaupunki: Quito 15,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3224.6, y: 3203.8 },
    },
    teksti: 'Otavalo on Imbaburan maakunnassa 2 532 metrin korkeudessa, ja sen asukkaista '
      + 'suuri osa kuuluu otavalojen alkuperäiskansaan. Kaupunkia ympäröivät Imbaburan, '
      + 'Cotacachin ja Mojandan tulivuoret. Otavalot ovat kuuluisia villakankaidensa '
      + 'kutomisesta, ja niitä myydään lauantaisin torilla, joka on koko maan tunnetuin; '
      + 'kauppaa käydään koko viikon Plaza de los Ponchosilla ja lukuisissa liikkeissä. '
      + 'Torin katokset ovat sienenmuotoisia betonivarjoja penkkeineen, ja ne suunnitteli '
      + '1970 hollantilainen arkkitehti Tonny Zwollo. Vilkkaimmillaan lähes kolmannes '
      + 'kaupungista täyttyy kojuista, joissa myydään kankaita, taguapähkinästä tehtyjä '
      + 'koruja, soittimia, nahkatuotteita, mausteita ja villakeriä. Vuoden 2022 laskennassa '
      + 'asukkaita oli 41 718.',
    lahde: 'en-Wikipedia "Otavalo (city)", johdanto-osa ja osio "The market" (tarkistettu '
      + '6.9.2026).',
  },
];
