/*
 * FOKUSKOHTEET — KROATIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-bih.js:lle. Rakenne on Kreikan tiedoston rakenne
 * sellaisenaan: SAMA LISTA palvelee kahta pintaa, kohdenostoa
 * fokusvirrassa (pöllö puhuu `teksti`-kentän kuplasta, painikkeen
 * lupaus on `nappi`) ja kartan klikattavaa pop-upia (js/fokuskohteet.js
 * lukee `nimi`, `tyyppi`, `symboli`, `kuva`, `teksti` ja `lahde`).
 * Kentät ja niiden perustelut on selitetty Kreikan tiedoston alussa;
 * tässä on vain se, mikä Kroatiassa on toisin.
 *
 * ── LISTA JA LEHTI ON TEHTY YHDESSÄ ────────────────────────────────
 *
 * Tämä on ensimmäinen maa, jonka fokuslehti ja kohdelista on
 * suunniteltu SAMALLA KERTAA (tools/fokuskartta/maat.mjs FOKUSMAAT.HRV,
 * renderöity 27.8.2026). Kreikassa järjestys oli toinen: lehti
 * renderöitiin ensin, ja kun omistaja huomasi kartalta nimiä, joita ei
 * voinut napauttaa, kytkimet ja puuttuvat kohteet lisättiin
 * jälkikäteen kolmessa erässä (v1210, v1214, kolmikkoerä).
 *
 * KLIKATTAVUUSLINJA ON SIIS TÄSSÄ TIEDOSTOSSA RAKENTEELLINEN EIKÄ
 * KORJAUS. Kaikki, mikä Kroatian lehdellä on nimetty, on tässä
 * listassa, ja kaikki, mikä tässä listassa on, on lehdellä
 * napautettavissa:
 *
 *   MERI, VUORET JA JOET saavat nimensä NIMIÖSTÄ eivätkä kuvasta
 *   (maat.mjs HRV `poltetutNimet`: kaikki kolme lajia false). Yhdenkään
 *   niistä nimeä ei ole poltettu kuvaan, joten nimiö ei voi joutua
 *   toisinnon viereen. Vuorista kuvaan jää hachure-kolmio ja
 *   korkeuslukema — kartan omaa merkintää, ei nimeämistä.
 *
 *   VIISI KAUPUNKIA on poltettu kuvaan (maat.mjs HRV `kaupungit`:
 *   Zagreb, Split, Rijeka, Zadar, Osijek), ja jokaisella niistä on
 *   tässä kohde SAMASSA PISTEESSÄ. Kohde on tyypiltään `kaupunki`,
 *   joten se ei lado omaa nimiötään poltetun nimen viereen
 *   (js/fokuskohteet.js kohteenNimio) — ja poltettu nimi on silti
 *   napautettavissa, koska peli laskee sille näkymättömän
 *   osuma-alueen js/packs/fokus-grc.js:n FOKUS_LISANIMET.HRV-taulusta.
 *
 *   PISTEKOHTEITA EI OLE. Jokaisella tämän listan kohteella on
 *   `tyyppi` tai `symboli`, joka antaa sille kategoriamerkin — ja vain
 *   symbolimerkki saa nimiön (js/fokuskohteet.js: *"Pistekohteet ovat
 *   kartan yleismerkkejä ilman kategoriaa, ja niiden musteympyrä on
 *   tarkoituksella mykkä"*). Mykkä merkki olisi tällä lehdellä juuri
 *   se nimetön kohde, jota linja ei salli.
 *
 * ── DUBROVNIK PUUTTUU LISTASTA, JA SE ON TARKOITUS ─────────────────
 *
 * Dubrovnik on PELILAATTA (js/packs/maailmankartta.js: 6438,9 /
 * 1694,6), jonka nimen peli piirtää itse ja jonka napautus vie
 * kaupunkiin. Sama sääntö kuin Kreikassa, jossa Ateenalla ei ole
 * kohdetta: laatan päälle asetettu kohdemerkki kilpailisi laatan omasta
 * napautuksesta, eikä kortti ole se, mitä pelaaja laatalta odottaa.
 *
 * DUBROVNIKIN SEUTU ON SILTI MUKANA kahdella kohteella, jotka eivät
 * ole laatan päällä: Stonin muurit (42,84 N — Ragusan tasavallan
 * suolapannujen muuri, 30 km luoteeseen) ja Mljet (42,75 N —
 * tasavallan oma saari, 40 km länteen). Kumpikin on lehdellä omassa
 * pisteessään, ja kumpikin kertoo Dubrovnikista sen kaupungin ulkoa
 * katsottuna.
 *
 * ── LAUTAKOORDINAATIT ──────────────────────────────────────────────
 *
 * Sama kaksi kaavaa kuin Bosnian ja Bulgarian tiedostoissa:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * KAAVA ON TARKISTETTU TUNNETULLA PISTEELLÄ: Wien 16,3725 E /
 * 48,2083 N antaa maailmankartalla 6379,1 / 1467,3, ja Wienin laatta on
 * 6379,9 / 1467,8 — 0,89 lautayksikön ero (tools/tee-fokuskartta.mjs
 * tasaustarkistus, HRV-ajo 27.8.2026). Kroatiassa itsessään ei ole
 * yhtään tarkistuspistettä, ja työkalu sanoo sen ääneen; Wien on
 * lähin, joka lehden ikkunaan osuu.
 *
 * KAIKKI KOHTEET OVAT LEHDEN IKKUNAN SISÄLLÄ. FOKUS_POHJAT.HRV rajaa
 * kameran laatikkoon x 6224,26…6539,07 ja y 1524,82…1721,57; listan
 * äärimmäiset pisteet ovat Pula 6295,0 lännessä, Osijek 6456,5 idässä,
 * Drava 1564,3 pohjoisessa ja Ston 1689,9 etelässä — jokainen mahtuu
 * reilusti, eikä yksikään merkki jää ikkunan ulkopuolelle.
 *
 * ── KARKEAT YLEISPISTEET ───────────────────────────────────────────
 *
 * Neljä kohdetta on ALUEEN piste eikä täsmäpaikka, ja se on merkitty
 * kohteittain:
 *
 *   Adrianmeri  — nimen paikka ulapalla (sama piste kuin maat.mjs
 *                 HRV.meret), ei meren keskus.
 *   Sava, Drava — piste uoman Kroatian-osuudella, ei joen lähde
 *                 eikä suu. Koordinaatit on poimittu SAMASTA
 *                 aineistosta, josta uomat piirretään (Natural Earth
 *                 10m rivers), jotta merkki istuu piirretyn viivan
 *                 päällä eikä sen vieressä.
 *   Hvar, Korčula, Mljet — saaren piste, ei kaupungin.
 *
 * Kartalla nämä ovat oikeita paikkoja alueen nimeämiselle;
 * täsmäpaikkoja niistä ei saa tehdä.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Vuonna 1873 Kroatiaa ei ollut yhtenä maana. Kroatia-Slavonian
 * kuningaskunta oli Unkarin kruunun alainen (Unkarin–Kroatian
 * sopimus 1868), Dalmatia ja Istria olivat Itävallan puolella, ja
 * Rijeka oli Unkariin suoraan liitetty erillisalue (corpus separatum).
 * Kaikki kolme kuuluivat Itävalta-Unkariin, jonka isoisä olisi
 * matkallaan ylittänyt yhtenä valtakuntana. Tekstit eivät väitä
 * mitään kansallisvaltiosta, ja siellä missä 1873 on merkityksellinen,
 * se sanotaan ääneen (Rijeka, Zadar, Osijek).
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti. Jokainen on tarkistettu Commonsin
 * imageinfo-rajapinnasta 27.8.2026 (olemassaolo, koko, mime, lisenssi,
 * tekijä, kuvaus, kategoriat) — ei arvattuja tiedostonimiä eikä
 * luottamista toisen käden merkintään. Kaikki ovat CC0, CC BY tai
 * CC BY-SA, ja tekijä on `lahde`-rivillä, koska CC BY vaatii
 * maininnan.
 *
 * KOLME KUVAA EI ESITÄ SITÄ, MITÄ NIMI LUPAA, ja selite sanoo sen:
 * Risnjakin kuvassa on kansallispuiston Ćunina glava (1158 m) eikä
 * Risnjakin huippu, Sveti Juren huipulla on nykyinen lähetinmasto, ja
 * Adrianmeren kuva on Kornatien saaristosta. Vaihtoehto olisi ollut
 * jättää kuva pois; rehellinen selite on parempi.
 */

/**
 * Kroatian fokuskohteet: yhdeksäntoista kohdetta, joista viisi
 * kaupunkia, viisi vuorta, meri, kaksi jokea, kolme saarta ja kolme
 * muuta.
 *
 * JÄRJESTYS ON MERKITSEVÄ. Nimiöiden väistö käy listan läpi datan
 * järjestyksessä ja ensimmäisenä listattu voittaa (js/fokuskohteet.js
 * paivitaKohdeNimiot), joten lehden pääkohteet ovat ensin: kaupungit,
 * sitten vuoret ja vedet, sitten saaret ja loput.
 */
export const FOKUSKOHTEET_HRV = [
  /* ==================== KAUPUNGIT ==================== */
  {
    id: 'zagreb',
    nimi: 'Zagreb',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaksi kaupunkia riiteli sillasta?',
      'Kuka oli ban?',
    ],
    korostukset: ['Gradec', 'Kaptol', 'Verinen silta|Verisen sillan'],
    nappi: 'Kaupunki, joka oli kauan kaksi kaupunkia',
    /* 45,8144 N / 15,9772 E — en-Wikipedia "Zagreb". */
    laudat: {
      maailmankartta: { x: 6365.9, y: 1568.1 },
      europe: { x: 518, y: 688.7 },
    },
    teksti: 'Zagreb kasvoi kahdesta kukkulasta, jotka olivat vuosisatoja '
      + 'eri kaupunkeja: Gradec oli porvarien ja Kaptol piispan. Niiden '
      + 'välissä virtasi puro, ja sen yli vievä silta oli niin usein '
      + 'tappelupaikka, että kadun nimi on yhä Krvavi most, Verinen '
      + 'silta. Kaupungit yhdistettiin yhdeksi vasta 1850 — kaksikymmentä '
      + 'vuotta ennen isoisän matkaa. Vuonna 1873 Zagreb oli '
      + 'Kroatia-Slavonian kuningaskunnan pääkaupunki Unkarin kruunun '
      + 'alaisuudessa.',
    lahde: 'en-Wikipedia "Zagreb", osiot "History" ja "Name"; '
      + 'en-Wikipedia "Krvavi Most" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 3982x2645, CC BY-SA 3.0, Isiwal, 19.5.2011,
    // kuvaus nimeää Josip Jelačićin patsaan ja aukion.
    // Category:Jelačić Square (Zagreb).
    kuva: {
      tiedosto: 'Zagreb Trg Ban Jelacic market.jpg',
      selite: 'Ban Josip Jelačićin aukio ja hänen ratsastajapatsaansa '
        + 'Zagrebin keskustassa.',
      lahde: 'Isiwal, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'split',
    nimi: 'Split',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka oli Diocletianus?',
      'Miltä tuntuisi asua palatsin sisällä?',
    ],
    korostukset: ['Diocletianuksen palatsi|Diocletianuksen palatsin', 'Salona'],
    nappi: 'Kaupunki keisarin palatsin sisällä',
    /* 43,5081 N / 16,4402 E — en-Wikipedia "Split, Croatia". */
    laudat: {
      maailmankartta: { x: 6381.3, y: 1662.8 },
      europe: { x: 526.9, y: 749.3 },
    },
    teksti: 'Split ei ole kaupunki, jossa on palatsi, vaan kaupunki, joka '
      + 'on palatsin sisällä. Keisari Diocletianus rakennutti tänne noin '
      + 'vuosina 295–305 valtavan linnoitetun eläkeasunnon, ja kun '
      + 'läheinen Salona tuhoutui 600-luvulla, pakolaiset muuttivat '
      + 'muurien suojaan. He eivät koskaan lähteneet. Palatsin sisällä on '
      + 'yhä katuja, kauppoja ja koteja — siellä asuu tuhansia ihmisiä, '
      + 'ja keisarin mausoleumista tehtiin katedraali.',
    lahde: 'en-Wikipedia "Diocletian\'s Palace", johdanto ja osio '
      + '"History"; en-Wikipedia "Split, Croatia" (tarkistettu '
      + '27.8.2026).',
    // Commons 27.8.2026: 6000x4000, CC BY 2.0, TimeTravelRome,
    // 18.8.2021. Category:Peristil (Split).
    kuva: {
      tiedosto: 'Peristyle of Diocletian\'s Palace - Split - 51389330950.jpg',
      selite: 'Peristyyli, Diocletianuksen palatsin pylväiköity '
        + 'keskuspiha, jonka ympärillä kaupunki yhä elää.',
      lahde: 'TimeTravelRome, Wikimedia Commons (CC BY 2.0)',
    },
  },
  {
    id: 'rijeka',
    nimi: 'Rijeka',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miten torpedo toimi?',
      'Mikä oli corpus separatum?',
    ],
    korostukset: ['torpedo', 'corpus separatum'],
    nappi: 'Satama, jossa keksittiin torpedo',
    /* 45,3271 N / 14,4422 E — en-Wikipedia "Rijeka". */
    laudat: {
      maailmankartta: { x: 6314.7, y: 1588.3 },
      europe: { x: 488.5, y: 701.5 },
    },
    teksti: 'Rijeka oli isoisän matkan aikaan Unkarin oma meritie: '
      + 'kaupunki oli liitetty suoraan Unkarin kruunuun erillisalueena, '
      + 'corpus separatum, eikä se kuulunut Kroatiaan sen ympärillä. '
      + 'Samassa satamassa syntyi 1866 maailman ensimmäinen käyttökelpoinen '
      + 'itseliikkuva torpedo: itävaltalainen upseeri Giovanni Luppis oli '
      + 'piirtänyt idean, ja englantilainen insinööri Robert Whitehead '
      + 'sai sen kulkemaan paineilmalla suoraa linjaa veden alla.',
    lahde: 'en-Wikipedia "Rijeka", osio "History"; en-Wikipedia '
      + '"Whitehead torpedo", johdanto ja osio "Development" '
      + '(tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 4000x2412, CC BY-SA 4.0, RijekaPhotos,
    // 3.12.2017, kuvattu Veprinacista. Category:Views to Rijeka.
    kuva: {
      tiedosto: 'View over Rijeka city.jpg',
      selite: 'Rijeka ja Kvarnerinlahti ylhäältä Veprinacista '
        + 'katsottuna.',
      lahde: 'RijekaPhotos, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'zadar',
    nimi: 'Zadar',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli forum?',
      'Mistä maraskino tehdään?',
    ],
    korostukset: ['forum', 'maraskino', 'Pyhän Donatuksen kirkko|Pyhän Donatuksen kirkon'],
    nappi: 'Kaupunki, joka rakennettiin roomalaisen torin päälle',
    /* 44,1194 N / 15,2314 E — en-Wikipedia "Zadar". */
    laudat: {
      maailmankartta: { x: 6341, y: 1637.9 },
      europe: { x: 503.6, y: 733.3 },
    },
    teksti: 'Zadarin keskellä on yhä avoinna Adrianmeren itärannan suurin '
      + 'roomalainen forum, rakennettu ensimmäisen vuosisadan eaa. ja '
      + 'kolmannen vuosisadan välillä. Sen kivistä pystytettiin 800-luvulla '
      + 'pyöreä Pyhän Donatuksen kirkko, jonka seinistä voi yhä lukea '
      + 'roomalaisia kirjoituksia ylösalaisin. Kaupungista tuli myös '
      + 'maraskinon koti: kirsikkalikööriä valmistettiin täällä '
      + 'tehdasmaisesti vuodesta 1821, ja se oli isoisän matkan aikaan '
      + 'Zadarin tunnetuin vientitavara.',
    lahde: 'en-Wikipedia "Zadar", osiot "History" ja "Economy"; '
      + 'en-Wikipedia "Maraschino", osio "History" (tarkistettu '
      + '27.8.2026).',
    // Commons 27.8.2026: 4490x2940, CC BY-SA 4.0, Matti Blume,
    // 27.5.2019, Wiki Loves Monuments 2019.
    // Category:Roman forum in Zadar (Croatia).
    kuva: {
      tiedosto: 'Roman forum, Zadar (P1080975).jpg',
      selite: 'Zadarin roomalainen forum ja sen takana pyöreä Pyhän '
        + 'Donatuksen kirkko.',
      lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'osijek',
    nimi: 'Osijek',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miten kahdeksan kilometrin puusilta rakennettiin?',
      'Mitä varten Tvrđa rakennettiin?',
    ],
    korostukset: ['Tvrđa', 'Suleimanin silta|Suleimanin sillan'],
    nappi: 'Silta, jota kutsuttiin maailman kahdeksanneksi ihmeeksi',
    /* 45,5550 N / 18,6955 E — en-Wikipedia "Osijek". */
    laudat: {
      maailmankartta: { x: 6456.5, y: 1578.8 },
      europe: { x: 570.2, y: 695.5 },
    },
    teksti: 'Osijekin kohdalla Drava levittäytyy soiksi, joiden yli ei '
      + 'päässyt. Sulttaani Suleiman Suuren insinöörit rakensivat 1566 '
      + 'niiden poikki puisen sillan ja pengertien, jonka pituudeksi '
      + 'kerrotaan noin kahdeksan kilometriä; aikalaiset kutsuivat sitä '
      + 'maailman kahdeksanneksi ihmeeksi. Silta paloi sotien mukana, ja '
      + 'kun itävaltalaiset olivat ajaneet osmanit pois, he pystyttivät '
      + 'joen rannalle barokkilinnoituksen Tvrđan, joka seisoo yhä.',
    lahde: 'en-Wikipedia "Osijek", osio "History"; en-Wikipedia '
      + '"Suleiman Bridge (Osijek)" ja "Tvrđa" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 4008x2672, CC BY-SA 4.0, Pudelek (Marcin
    // Szala), 20.8.2020, Wiki Loves Monuments 2020. Category:Tvrđa.
    kuva: {
      tiedosto: 'Tvrđa, Osijek 02.jpg',
      selite: 'Tvrđa, Osijekin barokkilinnoitus Dravan rannalla.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ==================== VUORET ==================== */
  {
    id: 'dinara',
    nimi: 'Dinara',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä karsti tarkoittaa?',
      'Miksi kokonainen vuoristo on nimetty yhden huipun mukaan?',
    ],
    korostukset: ['karsti|karstia', 'Dinaariset alpit'],
    nappi: 'Vuori, joka antoi nimen koko vuoristolle',
    /* 44,0575 N / 16,3853 E — en-Wikipedia "Dinara". */
    laudat: {
      maailmankartta: { x: 6379.5, y: 1640.4 },
      europe: { x: 525.8, y: 734.9 },
    },
    teksti: 'Dinaran huippu Sinjal on 1831 metriä ja Kroatian korkein '
      + 'kohta. Vuori on kuitenkin tunnetumpi siitä, mille se antoi '
      + 'nimensä: koko Adrianmeren itärantaa Sloveniasta Albaniaan '
      + 'seuraava vuoristo on Dinaariset alpit. Kalkkikivi liukenee '
      + 'sadeveteen, joten pinta on karstia — rotkoja, kuiluja ja '
      + 'luolia, ja joet katoavat maan alle keskellä matkaansa.',
    lahde: 'en-Wikipedia "Dinara", johdanto; en-Wikipedia "Dinaric Alps" '
      + '(tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 2048x1536, CC BY-SA 4.0, Ponor, 28.8.2010,
    // kuvaus: vuoristoretkeilijöitä lähestymässä Dinaran huippua.
    // Category:Dinara.
    kuva: {
      tiedosto: 'Mountaineering at Dinara -Croatia- in 2010.jpg',
      selite: 'Retkeilijöitä nousemassa Dinaran huipulle.',
      lahde: 'Ponor, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'sveti-jure',
    nimi: 'Sveti Jure',
    tyyppi: 'vuori',
    kysymykset: [
      'Miltä näyttää, kun vuori nousee suoraan merestä?',
      'Kuka oli pyhä Yrjö?',
    ],
    korostukset: ['Biokovo', 'Makarska'],
    nappi: 'Vuori, joka nousee merestä pystysuoraan',
    /* 43,3306 N / 17,0578 E — en-Wikipedia "Sveti Jure". */
    laudat: {
      maailmankartta: { x: 6401.9, y: 1670 },
      europe: { x: 538.7, y: 754 },
    },
    teksti: 'Biokovon vuorijono nousee Makarskan rantakaistalta niin '
      + 'jyrkästi, että sen korkein huippu Sveti Jure — 1762 metriä — on '
      + 'vain muutaman kilometrin päässä aallonmurtajasta. Rannalla '
      + 'kasvaa viikunoita ja huipulla on lunta huhtikuussa. Vuori on '
      + 'saanut nimensä huipulle rakennetusta pyhän Yrjön kappelista, ja '
      + 'selkeällä säällä sieltä näkyy Italian rannikko toiselle puolelle '
      + 'Adrianmerta.',
    lahde: 'en-Wikipedia "Sveti Jure" ja "Biokovo", johdannot '
      + '(tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 5158x3356, CC BY-SA 4.0, SKas, 26.6.2019,
    // Wiki Loves Earth 2020. Kuvauksen mukaan huipulla on TV-masto —
    // selite sanoo sen, jottei kuva väitä 1873-maisemaa.
    // Category:Sveti Jure.
    kuva: {
      tiedosto: 'The highest peak Sv Jure (1762 m) in Biokovo Nature Park.jpg',
      selite: 'Sveti Juren huippu Biokovolla. Kalliolla seisova masto on '
        + 'nykyinen lähetinasema.',
      lahde: 'SKas, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'vaganski-vrh',
    nimi: 'Vaganski vrh',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on bura?',
      'Miksi vuorijono erottaa rannikon sisämaasta?',
    ],
    korostukset: ['Velebit', 'bura'],
    nappi: 'Muuri meren ja sisämaan välissä',
    /* 44,3506 N / 15,5153 E — en-Wikipedia "Vaganski vrh". */
    laudat: {
      maailmankartta: { x: 6350.5, y: 1628.4 },
      europe: { x: 509.1, y: 727.2 },
    },
    teksti: 'Velebit on Kroatian pisin vuorijono, noin 145 kilometriä '
      + 'rannikon suuntaisena muurina, ja Vaganski vrh on sen korkein '
      + 'huippu 1757 metrissä. Muurilla on kaksi puolta: meren puoli on '
      + 'paljasta kiveä ja sisämaan puoli metsää. Talvella jonon yli '
      + 'syöksyy bura, kylmä laskutuuli, joka kiihtyy solissa niin '
      + 'kovaksi, että se kaataa kuormia ja pysäyttää lautat.',
    lahde: 'en-Wikipedia "Vaganski vrh" ja "Velebit", johdannot ja osio '
      + '"Climate"; en-Wikipedia "Bora (wind)" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 3719x2250, CC BY-SA 3.0, Javier Sánchez
    // Portero, 9.7.2013, kuvaus: näkymä etelästä Paklenican majalta.
    // Category:Vaganski vrh.
    kuva: {
      tiedosto: 'Vaganski vrh.jpg',
      selite: 'Vaganski vrh etelästä nähtynä Paklenican kansallispuiston '
        + 'majalta.',
      lahde: 'Javier Sánchez Portero, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'risnjak',
    nimi: 'Risnjak',
    tyyppi: 'vuori',
    kysymykset: [
      'Eläkö Euroopassa yhä ilveksiä?',
      'Miksi metsä muuttuu korkeuden mukaan?',
    ],
    korostukset: ['ilves|ilveksen', 'Gorski kotar'],
    nappi: 'Vuori, joka on nimetty ilveksen mukaan',
    /* 45,4239 N / 14,7539 E — en-Wikipedia "Risnjak". */
    laudat: {
      maailmankartta: { x: 6325.1, y: 1584.3 },
      europe: { x: 494.5, y: 699 },
    },
    teksti: 'Risnjak on 1528 metriä ja kohoaa Gorski kotarin metsien '
      + 'keskeltä siinä kohdassa, missä Alpit, Dinaariset alpit ja '
      + 'Pannonian tasanko kohtaavat. Nimi tulee sanasta ris, ilves: '
      + 'näissä metsissä eli isoisän matkan aikaan ilveskanta, joka '
      + 'sittemmin hävisi ja palautettiin 1970-luvulla. Rinteillä metsä '
      + 'vaihtuu korkeuden mukaan pyökistä kuuseen ja lopulta '
      + 'vuorimännyn pensaikoksi.',
    lahde: 'en-Wikipedia "Risnjak" ja "Risnjak National Park", johdannot '
      + 'ja osio "Flora and fauna" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 5230x3648, CC BY-SA 4.0, Michal Klajban,
    // 29.8.2018. HUOM: kuvassa on puiston Ćunina glava (1158 m) eikä
    // Risnjakin huippu — selite sanoo sen. Category:Risnjak.
    kuva: {
      tiedosto: 'Ćunina glava, Risnjak National Park, Croatia.jpg',
      selite: 'Ćunina glavan huippu Risnjakin kansallispuistossa; '
        + 'Risnjak itse on saman metsäselänteen takana.',
      lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'vojak',
    nimi: 'Vojak',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Istrian niemellä kasvaa?',
      'Miksi vuorelle rakennetaan näkötorni?',
    ],
    korostukset: ['Učka', 'Istria|Istrian'],
    nappi: 'Istrian korkein kohta',
    /* 45,2894 N / 14,2019 E — en-Wikipedia "Učka". */
    laudat: {
      maailmankartta: { x: 6306.7, y: 1589.8 },
      europe: { x: 483.9, y: 702.5 },
    },
    teksti: 'Vojak on Učkan vuoriston ja koko Istrian niemen korkein '
      + 'kohta, 1401 metriä. Vuori erottaa niemen vihreän sisäosan '
      + 'Kvarnerinlahden rannikosta, ja huipulta näkyy selkeällä säällä '
      + 'Venetsian lahdelle asti — samalle merelle, jota pitkin Istrian '
      + 'kivi ja tammi kulkivat vuosisatoja Venetsian '
      + 'rakennustyömaille. Huipulla seisoo kivinen näkötorni, joka '
      + 'pystytettiin 1911.',
    lahde: 'en-Wikipedia "Učka", johdanto ja osio "Vojak"; en-Wikipedia '
      + '"Istria" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 2551x1701, CC BY 3.0, Dguendel, 16.5.2015.
    // Category:Vojak (mountain), Category:Views to Rijeka.
    kuva: {
      tiedosto: 'Vojak (mountain), view to Rijeka.jpg',
      selite: 'Näkymä Vojakin huipulta itään Rijekaa ja '
        + 'Kvarnerinlahtea kohti.',
      lahde: 'Dguendel, Wikimedia Commons (CC BY 3.0)',
    },
  },

  /* ==================== MERI JA JOET ==================== */
  {
    id: 'adrianmeri',
    nimi: 'Adrianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Kroatian rannikolla on niin paljon saaria?',
      'Mihin Adrianmeri johtaa?',
    ],
    korostukset: ['Adrianmeri|Adrianmeren', 'Kornatit'],
    nappi: 'Meri, jossa on yli tuhat saarta',
    /*
     * KARKEA YLEISPISTE: 43,40 N / 14,60 E on nimen paikka ulapalla,
     * sama kuin tools/fokuskartta/maat.mjs HRV.meret. Piste on
     * Zadarin ja Italian rannikon puolivälissä, missä lehdellä on
     * eniten yhtenäistä vettä — ei meren keskus.
     */
    laudat: {
      maailmankartta: { x: 6320, y: 1667.2 },
      europe: { x: 491.5, y: 752.2 },
    },
    teksti: 'Adrianmeri on Välimeren pohjoisin haara, noin 800 kilometriä '
      + 'pitkä kuja Italian ja Balkanin välissä. Sen kaksi rantaa ovat '
      + 'kuin eri meriä: lännen italialainen ranta on suoraa hiekkaa, '
      + 'idän kroatialainen ranta rikkoutunutta kalkkikiveä, jossa '
      + 'vedenpinnan nousu on hukuttanut kokonaisia laaksoja. Siksi '
      + 'täällä on yli tuhat saarta, luotoa ja karia — enemmän kuin '
      + 'missään muualla Välimerellä.',
    lahde: 'en-Wikipedia "Adriatic Sea", johdanto ja osio "Islands"; '
      + 'en-Wikipedia "List of islands of Croatia" (tarkistettu '
      + '27.8.2026).',
    // Commons 27.8.2026: 3072x1728, CC BY-SA 4.0, Miroslav.vajdic,
    // 2.9.2008. HUOM: kuva on Kornatien saaristosta eikä avomereltä —
    // selite sanoo sen. Category:Kornati.
    kuva: {
      tiedosto: 'Nacionalni park Kornati 3.jpg',
      selite: 'Kornatien saaristo — paljasta kalkkikiveä keskellä '
        + 'Adrianmerta.',
      lahde: 'Miroslav.vajdic, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'sava',
    nimi: 'Sava',
    tyyppi: 'joki',
    kysymykset: [
      'Mihin Sava laskee?',
      'Miksi tulvametsä on hyväksi?',
    ],
    korostukset: ['Sava|Savan', 'tulvametsä|tulvametsät'],
    nappi: 'Joki, joka tulvii tahallaan',
    /*
     * KARKEA YLEISPISTE: 45,1420 N / 17,4958 E on piste uoman
     * Kroatian-osuudella Slavonski Brodin seudulla, ei joen lähde
     * eikä suu. Koordinaatti on poimittu Natural Earth 10m
     * -jokiaineistosta, samasta, josta lehden uoma piirretään.
     */
    laudat: {
      maailmankartta: { x: 6416.5, y: 1595.9 },
      europe: { x: 547.1, y: 706.4 },
    },
    teksti: 'Sava alkaa Slovenian Alpeilta, kulkee Zagrebin läpi ja '
      + 'laskee lopulta Tonavaan Belgradin kohdalla — noin 990 '
      + 'kilometriä, ja vettä se tuo Tonavaan enemmän kuin yksikään '
      + 'toinen sivujoki. Kroatian puolella joki saa yhä levitä: Lonjsko '
      + 'poljen tulvatasangolla vesi nousee joka kevät metsiin ja '
      + 'laitumiin, ja juuri se tekee alueesta yhden Euroopan '
      + 'suurimmista säilyneistä tulvametsistä.',
    lahde: 'en-Wikipedia "Sava", johdanto ja osio "Course"; '
      + 'en-Wikipedia "Lonjsko Polje" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 8000x5760, CC BY-SA 4.0, Petar Milošević,
    // 12.4.2025. Category:Sava in Slavonski Brod.
    kuva: {
      // Rivi on pitkä tahallaan: tiedostonimi on kirjoitettava yhdelle
      // riville, tai peilaustyökalu poimii siitä vain ensimmäisen palan
      // (tests/media.test.mjs).
      tiedosto: 'Sava River at Brod - Slavonski Brod (Republika Srpska - Croatia border).jpg',
      selite: 'Sava Slavonski Brodin kohdalla, jossa joki on Kroatian '
        + 'ja Bosnian raja.',
      lahde: 'Petar Milošević, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'drava',
    nimi: 'Drava',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä Drava saa alkunsa?',
      'Miksi joki kelpaa rajaksi?',
    ],
    korostukset: ['Drava|Dravan', 'sorasärkkä|sorasärkkiä'],
    nappi: 'Joki, joka tuli Alpeilta rajaksi',
    /*
     * KARKEA YLEISPISTE: 45,9060 N / 17,4937 E on piste uoman
     * Kroatian ja Unkarin väliseltä osuudelta, ei joen lähde eikä suu.
     * Koordinaatti on Natural Earth 10m -jokiaineistosta.
     */
    laudat: {
      maailmankartta: { x: 6416.5, y: 1564.3 },
      europe: { x: 547.1, y: 686.3 },
    },
    teksti: 'Drava alkaa Etelä-Tirolin vuorilta Italiasta, virtaa '
      + 'Itävallan ja Slovenian läpi ja laskee Tonavaan Osijekin '
      + 'alapuolella — noin 710 kilometriä. Kroatian pohjoisreunalla se '
      + 'on ollut vuosisatoja raja Unkariin. Joki tuo Alpeilta soraa ja '
      + 'hiekkaa ja kasaa niistä särkkiä, jotka siirtyvät tulvien mukana '
      + 'paikasta toiseen; niiden päällä pesivät linnut, joita ei muualla '
      + 'Kroatiassa ole.',
    lahde: 'en-Wikipedia "Drava", johdanto ja osiot "Course" ja '
      + '"Ecology" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 2272x1704, CC BY-SA 4.0, Plamen, 29.5.2016,
    // kuvattu Donji Miholjacin rajanylityspaikan lähellä.
    // Category:Drava in Croatia.
    kuva: {
      tiedosto: 'Drava, Donji Miholjac 04.jpg',
      selite: 'Drava Donji Miholjacin kohdalla Kroatian ja Unkarin '
        + 'rajalla.',
      lahde: 'Plamen, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ==================== SAARET ==================== */
  {
    id: 'hvar',
    nimi: 'Hvar',
    tyyppi: 'saari',
    kysymykset: [
      'Keitä olivat Paroksen siirtolaiset?',
      'Miksi pellot jaettiin suorakaiteisiin?',
    ],
    korostukset: ['Stari Gradin tasanko|Stari Gradin tasangon', 'khora'],
    nappi: 'Pelto, jota on kynnetty samoin 2400 vuotta',
    /*
     * KARKEA YLEISPISTE: 43,1667 N / 16,6667 E on saaren piste, ei
     * kaupungin. Stari Gradin tasanko on tästä muutaman kilometrin
     * luoteeseen.
     */
    laudat: {
      maailmankartta: { x: 6388.9, y: 1676.6 },
      europe: { x: 531.2, y: 758.3 },
    },
    teksti: 'Kun kreikkalaiset siirtolaiset Paroksen saarelta perustivat '
      + 'Hvarille kaupungin 384 eaa., he jakoivat sen takana olevan '
      + 'tasangon suorakaiteisiin peltoihin ja merkitsivät rajat '
      + 'kuivamuureilla. Jako on yhä paikallaan. Samat kivimuurit, samat '
      + 'polut ja samat viljelykaistat ovat käytössä lähes 2400 vuotta '
      + 'myöhemmin — se on parhaiten säilynyt antiikin Kreikan '
      + 'peltojako koko Välimerellä.',
    lahde: 'en-Wikipedia "Stari Grad Plain", johdanto ja osio "History"; '
      + 'en-Wikipedia "Hvar" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 5700x2960, CC BY-SA 4.0, Carsten Steger,
    // 13.6.2025, ilmakuva lounaasta. Category:Stari Grad Plain.
    kuva: {
      tiedosto: 'Aerial image of the Stari Grad Plain (view from the southwest).jpg',
      selite: 'Stari Gradin tasanko Hvarilla — kreikkalaisten '
        + 'siirtolaisten peltojako yhä näkyvissä.',
      lahde: 'Carsten Steger, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'korcula',
    nimi: 'Korčula',
    tyyppi: 'saari',
    kysymykset: [
      'Syntyikö Marco Polo oikeasti täällä?',
      'Mikä on moreška?',
    ],
    korostukset: ['moreška|moreškaa', 'Marco Polo'],
    nappi: 'Saari, joka väittää synnyttäneensä Marco Polon',
    /*
     * KARKEA YLEISPISTE: 42,95 N / 16,9167 E on saaren piste;
     * Korčulan kaupunki on saaren itäkärjessä.
     */
    laudat: {
      maailmankartta: { x: 6397.2, y: 1685.4 },
      europe: { x: 536, y: 764 },
    },
    teksti: 'Korčulan kaupunki on rakennettu niemelle kalanruodon '
      + 'muotoon: yksi pääkatu keskellä ja sivukadut vinosti siitä, '
      + 'jotta bura pääsee ulos muttei suoraan sisään. Saarelaiset ovat '
      + 'pitäneet vuosisatoja kiinni väitteestä, että Marco Polo syntyi '
      + 'täällä — todisteita ei ole, ja Venetsia on eri mieltä. '
      + 'Varmempaa on moreška, miekkatanssi kahden armeijan taistelusta, '
      + 'jota on esitetty Korčulassa 1500-luvulta asti.',
    lahde: 'en-Wikipedia "Korčula" ja "Korčula (town)", osiot "History" '
      + 'ja "Culture"; en-Wikipedia "Moreška" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 7261x5594, CC BY 4.0, Quintin Soloviev,
    // 10.9.2024, ilmakuva vanhastakaupungista.
    kuva: {
      tiedosto: 'Korčula Old Town, Croatia (2024).jpg',
      selite: 'Korčulan vanhakaupunki niemellään — kadut haarautuvat '
        + 'pääkadusta kalanruodon tapaan.',
      lahde: 'Quintin Soloviev, Wikimedia Commons (CC BY 4.0)',
    },
  },
  {
    id: 'mljet',
    nimi: 'Mljet',
    tyyppi: 'saari',
    kysymykset: [
      'Miten meri pääsee saaren sisälle järveksi?',
      'Kuka oli Kalypso?',
    ],
    korostukset: ['suolajärvi|suolajärveä', 'benediktiiniluostari'],
    nappi: 'Saari, jonka sisällä on kaksi merta',
    /*
     * KARKEA YLEISPISTE: 42,75 N / 17,50 E on saaren piste. Järvet ja
     * luostari ovat saaren länsipäässä.
     */
    laudat: {
      maailmankartta: { x: 6416.7, y: 1693.5 },
      europe: { x: 547.2, y: 769.3 },
    },
    teksti: 'Mljetin länsipäässä on kaksi järveä, jotka eivät ole '
      + 'makeavetisiä: kapea kanava päästää Adrianmeren sisään, joten '
      + 'Veliko ja Malo jezero ovat suolajärviä, joissa vuorovesi '
      + 'kääntää virran suuntaa. Ison järven saarekkeella seisoo '
      + '1100-luvulla perustettu benediktiiniluostari. Antiikin '
      + 'kirjoittajista lähtien on esitetty, että juuri Mljet olisi '
      + 'Homeroksen Ogygia, saari jolla nymfi Kalypso piti Odysseusta '
      + 'seitsemän vuotta.',
    lahde: 'en-Wikipedia "Mljet" ja "Mljet National Park", johdannot ja '
      + 'osiot "Geography" ja "History" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 5453x3635, CC BY 2.0, dronepicr, 29.7.2019,
    // ilmakuva Veliko ja Malo jezerosta.
    kuva: {
      // Rivi on pitkä tahallaan: tiedostonimi on kirjoitettava yhdelle
      // riville, tai peilaustyökalu poimii siitä vain ensimmäisen palan
      // (tests/media.test.mjs).
      tiedosto: 'Aerial view of the lakes Veliko Jezero and Malo Jezero on Mljet, Croatia (48612923586).jpg',
      selite: 'Veliko ja Malo jezero Mljetin länsipäässä — merivettä '
        + 'saaren sisällä.',
      lahde: 'dronepicr, Wikimedia Commons (CC BY 2.0)',
    },
  },

  /* ==================== MUUT ==================== */
  {
    id: 'plitvicen-jarvet',
    nimi: 'Plitvicen järvet',
    tyyppi: 'muu',
    /*
     * Symboli kuratoitu: tyyppi `muu` jättäisi merkin ilman kategoriaa
     * ja siten ilman nimiötä (js/fokuskohteet.js kohteenSymboli), ja
     * tällä lehdellä jokainen kohde nimetään.
     */
    symboli: 'luonto',
    kysymykset: [
      'Miten vesi voi rakentaa padon?',
      'Kuinka nopeasti travertiini kasvaa?',
    ],
    korostukset: ['travertiini|travertiinia', 'sammal|sammalet'],
    nappi: 'Järvet, joiden padot kasvavat itsestään',
    /* 44,8654 N / 15,5820 E — en-Wikipedia "Plitvice Lakes National Park". */
    laudat: {
      maailmankartta: { x: 6352.7, y: 1607.3 },
      europe: { x: 510.4, y: 713.6 },
    },
    teksti: 'Plitvicellä on kuusitoista järveä portaina toistensa alla, '
      + 'ja niitä erottavat padot ovat elävää työtä. Vesi tuo mukanaan '
      + 'kalkkia, ja kun se putoaa sammalten ja levien yli, kalkki '
      + 'saostuu niiden pinnalle travertiiniksi. Pato kasvaa noin '
      + 'sentin vuodessa — hitaasti, mutta lakkaamatta, joten järvien '
      + 'muoto muuttuu koko ajan ja vanhat putoukset kuivuvat uusien '
      + 'syntyessä.',
    lahde: 'en-Wikipedia "Plitvice Lakes National Park", johdanto ja '
      + 'osiot "Geology" ja "Lakes" (tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 4363x3376, CC BY 2.0, Naval S, 23.7.2018.
    // Category:Velike Kaskade.
    kuva: {
      tiedosto: 'Plitvice lakes waterfalls from top.jpg',
      selite: 'Plitvicen järvien putouksia ylhäältä katsottuna.',
      lahde: 'Naval S, Wikimedia Commons (CC BY 2.0)',
    },
  },
  {
    id: 'pulan-areena',
    nimi: 'Pulan areena',
    tyyppi: 'historia',
    kysymykset: [
      'Miten amfiteatteri rakennettiin?',
      'Miksi Venetsia halusi purkaa sen?',
    ],
    korostukset: ['amfiteatteri|amfiteatterin', 'Venetsian senaatti'],
    nappi: 'Areena, jonka Venetsia melkein varasti',
    /* 44,8731 N / 13,8503 E — en-Wikipedia "Pula Arena". */
    laudat: {
      maailmankartta: { x: 6295, y: 1607 },
      europe: { x: 477.1, y: 713.4 },
    },
    teksti: 'Pulan amfiteatteri rakennettiin vuosien 27 eaa. ja 68 jaa. '
      + 'välillä, ja se on säilyneistä roomalaisista areenoista harvoja, '
      + 'joissa koko ulkomuuri on yhä pystyssä — ainoa, jossa on '
      + 'tallella kaikki neljä sivutornia. Katsojia mahtui '
      + 'kymmeniätuhansia. Vuonna 1583 Venetsian senaatti käsitteli '
      + 'ehdotusta, että areena purettaisiin ja siirrettäisiin kivi '
      + 'kerrallaan Venetsiaan. Äänestys hävisi, ja rakennus jäi '
      + 'paikalleen.',
    lahde: 'en-Wikipedia "Pula Arena", johdanto ja osio "History" '
      + '(tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 7398x4184, CC BY-SA 4.0, Diego Delso,
    // 17.4.2017, Featured pictures of Croatia.
    kuva: {
      tiedosto: 'Anfiteatro de Pula, Croacia, 2017-04-17, DD 13-18 HDR PAN.jpg',
      selite: 'Pulan areena ulkoa — koko kolmikerroksinen ulkomuuri on '
        + 'yhä pystyssä.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'stonin-muurit',
    nimi: 'Stonin muurit',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi suola oli niin arvokasta?',
      'Mikä oli Ragusan tasavalta?',
    ],
    korostukset: ['suolapannu|suolapannuja', 'Ragusan tasavalta'],
    nappi: 'Viiden kilometrin muuri suolan ympärillä',
    /* 42,8375 N / 17,6928 E — en-Wikipedia "Ston". */
    laudat: {
      maailmankartta: { x: 6423.1, y: 1689.9 },
      europe: { x: 550.9, y: 767 },
    },
    teksti: 'Ragusan tasavalta — Dubrovnikin kaupunkivaltio — alkoi 1358 '
      + 'rakentaa Stonin kannakselle muuria, joka nousee vuorten yli ja '
      + 'laskeutuu toiselle rannalle. Sitä on jäljellä useita '
      + 'kilometrejä, ja se on Euroopan pisimpiä säilyneitä '
      + 'linnoitusmuureja. Suojeltavana ei ollut kaupunki vaan '
      + 'suolapannut: merivesi haihdutettiin altaissa suolaksi, ja '
      + 'suola oli tasavallan varmimpia tulonlähteitä. Samoja altaita '
      + 'käytetään yhä.',
    lahde: 'en-Wikipedia "Walls of Ston" ja "Ston", johdannot ja osiot '
      + '"History" ja "Saltworks"; en-Wikipedia "Republic of Ragusa" '
      + '(tarkistettu 27.8.2026).',
    // Commons 27.8.2026: 6000x4000, CC BY-SA 2.0, Dennis G. Jarvis,
    // 9.6.2013. Category:City walls of Ston.
    kuva: {
      tiedosto: 'Croatia-02147 - Walls of Ston (10091720635).jpg',
      selite: 'Stonin muuri nousemassa rinnettä ylös kannaksen poikki.',
      lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
];
