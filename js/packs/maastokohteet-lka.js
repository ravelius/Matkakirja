/*
 * MAASTOKOHTEET JA KOHTEET — LKA (Sri Lanka). Erä M3, Aasia, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Sri Lankalla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-lka.js:ssä — sama syy kuin
 * K2-erissä 1–4: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon (js/packs/fokus-grc.js),
 * jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/LKA.json-tiedostoa
 * ei ole): Sri Pada, Mahaweli ja Palkinlahti — vuori, joki ja meri.
 * Kaikki kolme osuvat maan fokuslehden rajaukseen
 * (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a), joka on
 * Sri Lankalla ahdas: lon 79,06…82,49 ja lat 5,22…10,53. Juuri siksi
 * Mannarinlahti jäi pois — sen artikkelikoordinaatti (79,0 E) on
 * ikkunan länsireunan ulkopuolella, ja ikkunan taakse jäävä merkki
 * olisi olemassa mutta pelaajan ulottumattomissa.
 *
 * EI PELIKAUPUNGIN KOHDALLA — MUTTA VÄHÄN JÄI VARAA. Laudan
 * Colombo-laatta (js/packs/maailmankartta.js CITIES) ei ole rannikolla
 * vaan saaren keskellä kohdassa 8516,7 / 2961, joten koko Keski-Sri
 * Lanka on sen ympärillä. Lähin uusi merkki on Kandyn hammastemppeli
 * 8,4 lautayksikön päässä, eli yli KAUPUNGIN_KOHDALLA_SADE-rajan (7) ja
 * yli kaupunkikaton säteen (8). Matale ja Kurunegala pudotettiin
 * ehdokkaista juuri tästä syystä: molemmat ovat 4–5 yksikön päässä
 * laatasta. js/packs/maakartat.js:ään ei ole koskettu.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_LKA = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'sigiriya',
    nimi: 'Sigiriya',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä nimi Sinhagiri tulee?',
      'Mikä inselberg on?',
    ],
    korostukset: ['inselberg|inselberg'],
    nappi: 'Leijonakallion palatsi',
    // 80.75972 E / 7.95694 N — en-Wikipedia "Sigiriya"
    laudat: {
      maailmankartta: { x: 8525.3, y: 2945.7 },
    },
    teksti: 'Sigiriya on muinainen kalliolinnoitus Matalen piirikunnassa: noin '
      + '180 metriä korkea graniittipatsas, joka nousee jyrkästi tasangolta. '
      + 'Cūḷavaṃsa-kronikan mukaan kuningas Kashyapa (477–495) valitsi kallion '
      + 'uudeksi pääkaupungikseen, rakensi huipulle palatsinsa ja koristi seinät '
      + 'värikkäillä freskoilla. Puolimatkassa olevalle tasanteelle hän rakensi '
      + 'portin jättimäisen leijonan muotoon — siitä nimi Sinhagiri eli '
      + 'Leijonakallio. Kuninkaan kuoltua pääkaupunki hylättiin ja paikka toimi '
      + 'buddhalaisluostarina 1300-luvulle asti. Geologisesti kyseessä on '
      + 'inselberg, muinaisen tulivuoren jähmettynyt magmatulppa.',
    lahde: 'en-Wikipedia "Sigiriya", johdanto ja osio "Geology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'anuradhapura',
    nimi: 'Anuradhapura',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Jaya Sri Maha Bodhi on?',
      'Kuinka kauan kaupunki oli pääkaupunki?',
    ],
    korostukset: ['theravadabuddhalaisuuden|theravadabuddhalaisuuden'],
    nappi: 'Tuhat viisisataa vuotta pääkaupunkina',
    // 80.41083 E / 8.335 N — en-Wikipedia "Anuradhapura"
    laudat: {
      maailmankartta: { x: 8513.7, y: 2933 },
    },
    teksti: 'Anuradhapura on Sri Lankan pohjoisen keskitasangon kaupunki '
      + 'Malwathu Oya -joen rannalla, 205 kilometriä Colombosta pohjoiseen. '
      + 'Mahāvaṃsan mukaan se perustettiin 437 eaa., mutta paikka on ollut '
      + 'asuttuna paljon kauemmin, ja se oli maan pääkaupunkina 1 500 vuotta. '
      + 'Kaupunki oli theravadabuddhalaisuuden keskus ja sinhalilaisen '
      + 'kastelujärjestelmäkulttuurin kehto. Sen tunnetuin pyhäkkö on Jaya Sri '
      + 'Maha Bodhi, maailman vanhin dokumentoidusti istutettu yhä elävä puu, '
      + 'jonka uskotaan kasvaneen Bodh Gayān alkuperäisen bodhipuun oksasta. '
      + 'Kaupunki tuhoutui ja autioitui pääosin vuoden 993 jälkeen.',
    lahde: 'en-Wikipedia "Anuradhapura", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'polonnaruwa',
    nimi: 'Polonnaruwa',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä nimi Jananathamangalam tulee?',
      'Mikä Siva Devale on?',
    ],
    korostukset: ['Cholat|Cholat'],
    nappi: 'Toinen kuningaskunta',
    // 81 E / 7.93333 N — en-Wikipedia "Polonnaruwa"
    laudat: {
      maailmankartta: { x: 8533.3, y: 2946.5 },
    },
    teksti: 'Polonnaruwa on Sri Lankan toiseksi vanhin kuningaskunta ja alkoi '
      + 'sinhalilaisen valtakunnan sotilastukikohtana. Kun Cholat valtasivat '
      + 'Anuradhapuran 900-luvulla, he nimesivät paikan Jananathamangalamiksi. '
      + 'Raja Raja Chola I rakennutti sinne kuningattarensa mukaan nimetyn '
      + 'Shiva-temppelin, joka tunnetaan nykyään nimellä Siva Devale ja jossa oli '
      + 'muun muassa Ganeshan ja Parvatin pronssipatsaat. Myöhemmin kaupunki '
      + 'tunnettiin nimellä Vijayarajapuram Vijayabahu I:n mukaan. Muinaiskaupunki '
      + 'on maailmanperintökohde, ja nykyinen kaupunki tunnetaan Uutena '
      + 'kaupunkina.',
    lahde: 'en-Wikipedia "Polonnaruwa", johdanto sekä osiot "Etymology" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'yapahuwa',
    nimi: 'Yapahuwa',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi portaat nousevat 70 asteen kulmassa?',
      'Mitä hammasreliikille tapahtui 1284?',
    ],
    korostukset: ['hammasreliikin|hammasreliikin'],
    nappi: 'Yhdentoista vuoden pääkaupunki',
    // 80.310746 E / 7.816784 N — en-Wikipedia "Yapahuwa"
    laudat: {
      maailmankartta: { x: 8510.4, y: 2950.4 },
    },
    teksti: 'Yapahuwa oli yksi keskiaikaisen Sri Lankan lyhytikäisistä '
      + 'pääkaupungeista: linnoitus rakennettiin lähes sadan metrin korkuisen '
      + 'graniittikallion ympärille Kurunegalan ja Anuradhapuran puoliväliin. '
      + 'Kuningas Bhuvanekabahu I siirsi hovin sinne 1272 Etelä-Intiasta tulevien '
      + 'hyökkäysten takia ja toi mukanaan pyhän hammasreliikin. Linnoituksen '
      + 'ylpeys on koristeellinen porrasrakennelma, jonka noin sata askelmaa '
      + 'nousevat 70 asteen kulmassa — jyrkkyys oli tarkoituksellinen, jotta '
      + 'puolustajilla olisi etu. Kuninkaan kuoltua 1284 pandyat valtasivat '
      + 'reliikin, ja Yapahuwa jäi lähinnä munkkien asuttamaksi.',
    lahde: 'en-Wikipedia "Yapahuwa", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hammastemppeli',
    nimi: 'Kandyn hammastemppeli',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi reliikillä on ollut poliittista merkitystä?',
      'Mikä Nanumura Mangallaya on?',
    ],
    korostukset: ['reliikki|reliikki'],
    nappi: 'Buddhan hammas kuninkaan pihalla',
    // 80.6414 E / 7.2936 N — en-Wikipedia "Temple of the Tooth"
    laudat: {
      maailmankartta: { x: 8521.4, y: 2968 },
    },
    teksti: 'Sri Dalada Maligawa eli hammastemppeli on buddhalainen temppeli '
      + 'Kandyssa entisen kuningaskunnan palatsialueella, ja siellä säilytetään '
      + 'Buddhan hammasreliikkiä. Reliikillä on ollut poliittinen merkitys '
      + 'vanhoista ajoista asti, koska sen haltijan on uskottu hallitsevan maata. '
      + 'Malwathun ja Asgirin luostarikuntien munkit hoitavat päivittäiset '
      + 'seremoniat kolmesti päivässä, aamunkoitteessa, keskipäivällä ja illalla. '
      + 'Keskiviikkoisin reliikki kylvetään vertauskuvallisesti tuoksuvedellä ja '
      + 'kukilla — Nanumura Mangallaya — ja vesi jaetaan paikalla oleville. '
      + 'Vuosittainen Kandy Esala Perahera -kulkue on omistettu reliikille.',
    lahde: 'en-Wikipedia "Temple of the Tooth", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'gallen-linnoitus',
    nimi: 'Gallen linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä linnoittivat kaupungin ja milloin?',
      'Millä nimellä Ibn Battuta tunsi kaupungin?',
    ],
    korostukset: ['bastioneineen|bastioneineen'],
    nappi: 'Aasian suurin eurooppalaislinnoitus',
    // 80.21556 E / 6.03278 N — en-Wikipedia "Galle"
    laudat: {
      maailmankartta: { x: 8507.2, y: 3010.2 },
    },
    teksti: 'Galle on kaupunki Sri Lankan lounaiskärjessä, 119 kilometriä '
      + 'Colombosta etelään. Ennen portugalilaisten tuloa 1500-luvulla se '
      + 'tunnettiin nimellä Gimhathiththa ja oli saaren tärkein satama; '
      + 'marokkolainen matkailija Ibn Battuta kutsui sitä 1300-luvulla nimellä '
      + 'Qali. Portugalilaiset rakensivat linnoituksen, ja hollantilaiset '
      + 'laajensivat sitä bastioneineen vuodesta 1649 alkaen. Galle saavutti '
      + 'huippunsa 1700-luvulla hollantilaiskaudella, ja linnoitus on '
      + 'maailmanperintökohde sekä Aasian suurin säilynyt eurooppalaisten '
      + 'rakentama linnake. Kaupunkiin kuuluu myös luonnonsatama, merimuseo ja '
      + 'jesuiittojen perustama Pyhän Marian katedraali.',
    lahde: 'en-Wikipedia "Galle", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'nuwara-eliya',
    nimi: 'Nuwara Eliya',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka perusti kaupungin ja milloin?',
      'Miksi sitä kutsuttiin Pikku-Englanniksi?',
    ],
    korostukset: ['vuoristoasema|vuoristoasema'],
    nappi: 'Pikku-Englanti 1 868 metrissä',
    // 80.76667 E / 6.96667 N — en-Wikipedia "Nuwara Eliya"
    laudat: {
      maailmankartta: { x: 8525.6, y: 2978.9 },
    },
    teksti: 'Nuwara Eliya on kaupunki Sri Lankan vuoristossa 1 868 metrin '
      + 'korkeudessa, ja sen nimi tarkoittaa tasangon kaupunkia tai valon '
      + 'kaupunkia. Sen perusti 1846 Samuel Baker, sama tutkimusmatkailija joka '
      + 'kartoitti Albertjärven ja Ylä-Niilin. Viileä ilmasto teki paikasta '
      + 'brittiläisten virkamiesten ja plantaasinomistajien vuoristoaseman, ja '
      + 'sitä kutsuttiin Pikku-Englanniksi: siellä harrastettiin kettujahtia, '
      + 'poolo, golfia ja krikettiä. Monissa rakennuksissa on yhä siirtomaa-ajan '
      + 'piirteet — Queen\'s Cottage, Grand Hotel, Hill Club, postitalo — ja '
      + 'vuotuinen keskilämpötila on 16 astetta, maan alhaisin. Kaupunki on '
      + 'Sri Lankan tärkein teenviljelyalue, ja sen yllä kohoaa Pidurutalagala, '
      + 'saaren korkein vuori.',
    lahde: 'en-Wikipedia "Nuwara Eliya", johdanto sekä osiot "History" ja '
      + '"Climate" (tarkistettu 6.9.2026).',
  },
  {
    id: 'yhdeksan-kaaren-silta',
    nimi: 'Yhdeksän kaaren silta',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä huhu teräksettömästä sillasta syntyi?',
      'Kuka suunnitteli sillan?',
    ],
    korostukset: ['viadukti|viadukti'],
    nappi: 'Silta taivaalla',
    // 81.061111 E / 6.876667 N — en-Wikipedia "Nine Arch Bridge"
    laudat: {
      maailmankartta: { x: 8535.4, y: 2981.9 },
    },
    teksti: 'Yhdeksän kaaren silta on viadukti Demodarassa Ellan ja Demodaran '
      + 'asemien välillä, ja se on maan tunnetuin esimerkki siirtomaa-ajan '
      + 'rautatierakentamisesta. Silta jouduttiin sovittamaan yhdeksän asteen '
      + 'kaarteeseen ja jyrkkään nousuun, ja se valmistui 1919; kaaret tukeutuvat '
      + 'betonisiin gesimsilohkoihin ja pinta on paikallista hiekkasementtitiiltä. '
      + 'Sen suunnitteli Ceylonin valtionrautateiden Harold Cuthbert Marwood, ja '
      + 'koko vuoristoradan pääsuunnittelija oli ceyloninlainen insinööri '
      + 'D. J. Wimalasurendra. Rakennustyö osui ensimmäisen maailmansodan alkuun, '
      + 'ja siitä syntyi sitkeä huhu: teräs oli muka viety sotatarpeisiin ja '
      + 'paikalliset rakensivat sillan kivestä ja sementistä ilman terästä.',
    lahde: 'en-Wikipedia "Nine Arch Bridge", johdanto sekä osiot "Location" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'sri-pada',
    nimi: 'Sri Pada',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka moni uskonto pitää jalanjälkeä pyhänä?',
      'Mitä nimi Samanthakūta tarkoittaa?',
    ],
    korostukset: ['jalanjälki|jalanjälki'],
    nappi: 'Neljän uskonnon jalanjälki',
    // 80.4997 E / 6.8094 N — en-Wikipedia "Adam's Peak"
    laudat: {
      maailmankartta: { x: 8516.7, y: 2984.2 },
    },
    teksti: 'Sri Pada eli Adamin huippu on 2 243 metriä korkea kartiomainen '
      + 'pyhä vuori Keski-Sri Lankassa. Nimi tulee huipun lähellä olevasta '
      + '1,8 metrin kalliomuodostumasta, joka muistuttaa jalanjälkeä. '
      + 'Buddhalaisessa perinteessä se on Buddhan jalanjälki, hindulaisessa '
      + 'Hanumanin tai Shivan — tamiliksi vuori on Sivanolipaathamalai, Shivan '
      + 'valon vuori — ja joissakin islamilaisissa ja kristillisissä perinteissä '
      + 'Aadamin tai apostoli Tuomaan. Vuori tunnetaan myös jumaluus Samanin '
      + 'asuinpaikkana, mistä nimi Samanthakūta. Ympärillä ei ole toista '
      + 'samankokoista vuorta, ja alue on luonnonsuojelualuetta.',
    lahde: 'en-Wikipedia "Adam\'s Peak", johdanto ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mahaweli',
    nimi: 'Mahaweli',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joki saa alkunsa?',
      'Miksi Trincomaleen lahti on poikkeuksellinen satama?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Suuri hiekkajoki',
    // 81.22944 E / 8.45944 N — en-Wikipedia "Mahaweli River"
    laudat: {
      maailmankartta: { x: 8541, y: 2928.9 },
    },
    teksti: 'Mahaweli on Sri Lankan pisin joki, 335 kilometriä, ja sen '
      + 'valuma-alue on 10 448 neliökilometriä eli lähes viidesosa koko saaresta. '
      + 'Nimi tarkoittaa suurta hiekkajokea. Vastoin yleistä käsitystä joki ei '
      + 'ala Sri Padan rinteiltä vaan Horton Plainsin ylängöltä Kirigalpoththan ja '
      + 'Thotupolan seudulta. Se laskee Bengalinlahteen Trincomaleen lahden '
      + 'lounaispuolella, ja lahdessa on vedenalainen kanjoni, mikä tekee '
      + 'Trincomaleesta yhden maailman parhaista luonnonsyväsatamista. Mahaweli '
      + 'on padottu useasta kohdasta: kastelu ulottuu lähes tuhannelle '
      + 'neliökilometrille ja kuusi voimalaitosta tuottaa yli 40 prosenttia maan '
      + 'sähköstä.',
    lahde: 'en-Wikipedia "Mahaweli River", johdanto ja osio "Starting of '
      + 'Mahaweli" (tarkistettu 6.9.2026).',
  },
  {
    id: 'palkinlahti',
    nimi: 'Palkinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä lahti on?',
      'Kenen mukaan lahti on nimetty?',
    ],
    korostukset: ['Adamin silta|Adamin silta'],
    nappi: 'Kolmentoista metrin meri',
    // 79.25 E / 9.5 N — en-Wikipedia "Palk Bay"
    laudat: {
      maailmankartta: { x: 8475, y: 2893.9 },
    },
    teksti: 'Palkinlahti on matala, puoliksi suljettu merialue Intian '
      + 'kaakkoisrannikon ja Sri Lankan välissä; syvimmilläänkin vettä on vain '
      + 'noin kolmetoista metriä. Lahti on 57–107 kilometriä leveä ja noin 150 '
      + 'kilometriä pitkä, ja se on Mannarinlahden ohella alueen tärkein '
      + 'sedimenttiallas: jokien tuoma aines laskeutuu sinne rantavirtojen '
      + 'kuljettamana. Koillisessa se avautuu matalan Palkinsalmen kautta '
      + 'Bengalinlahdelle, ja etelässä Adamin silta erottaa sen Mannarinlahdesta. '
      + 'Lahti on nimetty Robert Palkin mukaan, joka oli Madrasin presidenttikunnan '
      + 'kuvernööri.',
    lahde: 'en-Wikipedia "Palk Bay", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
