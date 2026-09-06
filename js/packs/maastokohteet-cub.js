/*
 * MAASTOKOHTEET — CUB. Kuuban maasto ja kahdeksan kohdetta kartalle.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Kuuballa ei ollut yhtäkään karttamerkkiä pääkartalla
 * (docs/moduulit/karttanostot-kattavuus.md, Pohjois-Amerikka): nolla
 * kohdetta, nolla maastokohdetta, pelkkä eläintäky. Tämä on maailman
 * erän M4 Kuuban osuus: kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA
 * samalla mallilla kuin Euroopan erissä (js/packs/maastokohteet-isl.js).
 *
 * EI AINEISTOTIEDOSTOA. tools/maastoaineisto/CUB.json-tiedostoa ei ole,
 * joten kolme maastokohdetta on valittu käsin (maan korkein huippu,
 * pisin joki ja suurin sivusaari) ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian artikkelista).
 *
 * KUUBA ON YLEISELLÄ REITILLÄ (tools/fokuskartta/maat.mjs): lehdelle ei
 * ole poltettu yhtään maastonimeä, joten merkin nimiö on maastonimen
 * ainoa esiintymä kartalla. Yksikään nimi ei myöskään ole laudan omassa
 * nimitaulussa (js/packs/maailmankartta-nimet.js), joten sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Kuuballa rajaus on olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.CUB),
 * joten vartio pätee, ja jokainen alla oleva piste on tarkistettu sitä
 * vasten ennen kirjoittamista. Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Kuuban ainoa pelikaupunki on
 * Havanna, ja etäisyys on mitattu jokaiseen js/packs/maailmankartta.js
 * CITIES-kaupunkiin. Lähin uusi merkki on Viñalesin laakso 41,4
 * lautayksikön päässä Havannasta — raja KAUPUNGIN_KOHDALLA_SADE on 7
 * (js/fokuskohteet.js). Lähin kaupunki on kirjattu jokaisen kohteen
 * koordinaattirivin viereen.
 *
 * VAIN MAAILMANKARTAN RIVI (erillislaudasta luovuttu, Raamattu
 * 30.8.2026). KUVATON ERÄ: kortti kantaa tekstin ja lähteen. Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_CUB = [
  /* ================================================================
   * MAASTO — huippu, joki ja saari.
   * ============================================================== */
  {
    id: 'pico-turquino',
    nimi: 'Pico Turquino',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin Kuubassa on viimeksi satanut lunta?',
      'Mistä huipun nimi tulee?',
    ],
    korostukset: ['Sierra Maestra|Sierra Maestran'],
    nappi: 'Ainoa paikka Kuubassa, jossa on satanut lunta',
    // -76.8342 E / 19.9892 N — en-Wikipedia "Pico Turquino"
    // Lähin pelikaupunki: Havanna 270,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3272.2, y: 2536.4 },
    },
    teksti: 'Pico Turquino on Kuuban korkein kohta ja sijaitsee saaren kaakkoisosassa Sierra '
      + 'Maestran vuoristossa Guamán kunnassa Santiago de Cuban maakunnassa. Se on ainoa '
      + 'paikka Kuubassa, josta on virallisesti kirjattu lumisade — viimeksi helmikuussa '
      + '1900. Nimen uskotaan olevan väännös sanasta turquesa, turkoosi: rinteet näyttävät '
      + 'tietyistä suunnista katsottuna sinertäviltä.',
    lahde: 'en-Wikipedia "Pico Turquino", johdanto-osa ja osio "Etymology" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'cauto',
    nimi: 'Cauto',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka pitkä osa joesta on kuljettavissa veneellä?',
      'Mihin mereen Cauto laskee?',
    ],
    korostukset: ['Karibianmereen|Karibianmereen'],
    nappi: 'Karibian pisin joki',
    // -77.25 E / 20.55 N (suisto Manzanillon pohjoispuolella) — en-Wikipedia "Cauto River"
    // Lähin pelikaupunki: Havanna 252,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3258.3, y: 2516.9 },
    },
    teksti: 'Cauto on Kuuban ja koko Karibian pisin joki. Se virtaa 343 kilometriä Sierra '
      + 'Maestrasta länteen ja luoteeseen ja laskee Karibianmereen Manzanillon pohjoispuolella. '
      + 'Kuljettavaa vesitietä siitä on kuitenkin vain 110 kilometriä; Cauto on toinen Kuuban '
      + 'kahdesta purjehduskelpoisesta joesta, toinen on Sagua la Grande. Joki kulkee Santiago '
      + 'de Cuban, Holguínin ja Granman maakuntien halki, ja sen varren pelloilla kasvatetaan '
      + 'riisiä, sokeriruokoa ja tupakkaa. Vuoden 2013 kuubalaistutkimus luokitteli sen veden '
      + 'puhtaasta kohtalaisen likaantuneeseen.',
    lahde: 'en-Wikipedia "Cauto River", johdanto-osa ja osio "Overview" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nuorisonsaari',
    nimi: 'Nuorisonsaari',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi saari vaihtoi nimensä vuonna 1978?',
      'Mikä kirja saattaa perustua tähän saareen?',
    ],
    korostukset: ['Aarresaari|Aarresaari'],
    nappi: 'Saari, joka oli Pinjojen saari ja Aarteiden saari',
    // -82.8 E / 21.7 N — en-Wikipedia "Isla de la Juventud"
    // Lähin pelikaupunki: Havanna 63,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3073.3, y: 2476.8 },
    },
    teksti: 'Isla de la Juventud eli Nuorisonsaari on Kuuban toiseksi suurin saari ja '
      + 'Länsi-Intian seitsemänneksi suurin. Vuoteen 1978 asti se oli Isla de Pinos, '
      + 'Pinjojen saari, ja historiansa aikana sitä on kutsuttu myös Papukaijojen saareksi ja '
      + 'Aarteiden saareksi. Eurooppalaisista sen näki ensimmäisenä Kolumbus toisella '
      + 'matkallaan 1494 ja nimesi sen La Evangelistaksi. Merirosvot pitivät saarta '
      + 'tukikohtanaan, ja jälki näkyy englantilaisessa kirjallisuudessa: sekä Robert Louis '
      + 'Stevensonin Aarresaari että J. M. Barrien Peter Pan ammentavat kertomuksista saaresta '
      + 'ja sen asukkaista. Punta del Esten luolissa on 235 alkuperäisväestön, guanahatabeyien, '
      + 'tekemää kalliopiirrosta, joista länsimaissa kerrottiin ensi kerran vasta 1904.',
    lahde: 'en-Wikipedia "Isla de la Juventud", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ M4, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'trinidad-cuba',
    nimi: 'Trinidad',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä Trinidadin vauraus tuli?',
      'Kuka värväsi täältä miehiä retkikuntaansa 1518?',
    ],
    korostukset: ['Valle de los Ingenios|Valle de los Ingenios'],
    nappi: 'Sokerikaupunki, joka jäi paikoilleen',
    // -79.9836 E / 21.8014 N — en-Wikipedia "Trinidad, Cuba"
    // Lähin pelikaupunki: Havanna 157,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3167.2, y: 2473.3 },
    },
    teksti: 'Trinidad Sancti Spíritusin maakunnassa on ollut Unescon maailmanperintökohde '
      + 'vuodesta 1988 yhdessä viereisen Valle de los Ingeniosin kanssa. Peruste on sokeri: '
      + 'kaupunki oli 1700- ja 1800-luvuilla sokerikaupan keskus, ja se on Karibian '
      + 'parhaiten säilyneitä kaupunkeja siltä ajalta. Diego Velázquez de Cuéllar perusti sen '
      + '23. joulukuuta 1514 nimellä Villa de la Santísima Trinidad. Vuonna 1518 Hernán Cortés '
      + 'värväsi täältä miehiä retkikuntaansa — mukaan lähti muun muassa Pedro de Alvarado '
      + 'viiden veljensä kanssa — ja purjehti kymmenen päivän kuluttua, vaikka paikallinen '
      + 'alcayde yritti Diego Velázquezin käskystä estää lähdön.',
    lahde: 'en-Wikipedia "Trinidad, Cuba", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'vinalesin-laakso',
    nimi: 'Viñalesin laakso',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä mogote on?',
      'Miksi tupakka viljellään täällä käsin?',
    ],
    korostukset: ['karsti|karstipainanne'],
    nappi: 'Laakso, jossa tupakka tehdään yhä käsin',
    // -83.7167 E / 22.6167 N — en-Wikipedia "Viñales Valley"
    // Lähin pelikaupunki: Havanna 41,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3042.8, y: 2444.8 },
    },
    teksti: 'Viñalesin laakso on 132 neliökilometrin karstipainanne Sierra de los Órganosin '
      + 'vuoristossa Pinar del Ríon maakunnassa. Unesco otti sen maailmanperintöluetteloon '
      + '1999 sekä luonnon- että kulttuurimaisemana, ja perusteena oli nimenomaan '
      + 'perinteinen tupakanviljely. Laakson pohjalla kasvatetaan tupakkaa ja muita kasveja '
      + 'menetelmillä, jotka ovat olleet käytössä vuosisatoja; työvaltaisen käsityön sanotaan '
      + 'tuottavan parempaa tupakkaa kuin koneellisen. Laaksoa pilkkovat pienet maatilat ja '
      + 'kylät, joissa on asuttu valloittajien ajoista asti, ja kulttuuri on sekoitus '
      + 'alkuperäisväestön, orjuutettujen afrikkalaisten ja heidän vapaiden jälkeläistensä '
      + 'sekä espanjalaisten ja myöhempien eurooppalaisten perintöä.',
    lahde: 'en-Wikipedia "Viñales Valley", johdanto-osa ja osio "Overview" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'san-pedro-de-la-roca',
    nimi: 'San Pedro de la Roca',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnoitus rakennettiin terasseille?',
      'Kuinka kauan sitadellin rakentaminen kesti?',
    ],
    korostukset: ['bastioni|bastionia'],
    nappi: 'Merirosvojen varalta, 62 vuotta rakenteilla',
    // -75.8722 E / 19.9683 N — en-Wikipedia "Castillo de San Pedro de la Roca"
    // Lähin pelikaupunki: Havanna 301,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3304.3, y: 2537.1 },
    },
    teksti: 'Castillo de San Pedro de la Roca, tutummin Castillo del Morro, vartioi Santiago '
      + 'de Cuban lahden suuta noin kymmenen kilometriä keskustasta lounaaseen. Unesco '
      + 'nimesi sen maailmanperintökohteeksi 1997 espanjalais-amerikkalaisen '
      + 'sotilasarkkitehtuurin parhaiten säilyneenä ja täydellisimpänä esimerkkinä. Paikalle '
      + 'rakennettiin ravelinni ja patteri jo 1590–1610, ja varsinaisen linnoituksen '
      + 'suunnitteli 1600-luvun alussa milanolaisesta sotilasinsinöörisuvusta polveutuva '
      + 'Battista Antonelli kaupungin kuvernöörin Pedro de la Roca de Borjan toimeksiannosta '
      + '— suojaksi merirosvoja vastaan. Jyrkkä niemi pakotti rakentamaan terasseille: neljä '
      + 'päätasoa ja kolme suurta bastionia tykeille, kallioon louhittu varasto ja ylimpänä '
      + 'sitadelli, jonka rakentaminen kesti vuodesta 1638 vuoteen 1700.',
    lahde: 'en-Wikipedia "Castillo de San Pedro de la Roca", johdanto-osa ja osio "Initial '
      + 'design" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cienfuegos',
    nimi: 'Cienfuegos',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä kaupungin nimi oikeasti tulee?',
      'Miksi Unesco valitsi juuri Cienfuegosin?',
    ],
    korostukset: ['valistus|valistusajan'],
    nappi: 'Etelän helmi — sata tulta, jotka eivät ole tulia',
    // -80.4358 E / 22.1461 N — en-Wikipedia "Cienfuegos"
    // Lähin pelikaupunki: Havanna 142,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3152.1, y: 2461.2 },
    },
    teksti: 'Cienfuegos on Kuuban eteläisen rannikon kaupunki noin 250 kilometriä Havannasta '
      + 'ja lempinimeltään La Perla del Sur, etelän helmi. Nimi tarkoittaa kirjaimellisesti '
      + '"sataa tulta", mutta se ei viittaa voimalaitoksiin vaan Kuuban kenraalikuvernööriin '
      + 'José Cienfuegos Jovellanosiin. 1800- ja 1900-luvun vaihteessa kaupunkiin muutti '
      + 'runsaasti espanjalaisia, etenkin katalaaneja ja asturialaisia, jotka rikastuivat '
      + 'muun muassa sokeriteollisuudessa ja rakennuttivat kaupungin tunnetuimmat rakennukset. '
      + 'Unesco otti historiallisen keskustan luetteloonsa 2005 parhaana säilyneenä '
      + 'esimerkkinä espanjalaisen valistusajan vaikutuksesta kaupunkisuunnitteluun: '
      + 'keskustassa on kuusi rakennusta vuosilta 1819–1850, 327 vuosilta 1851–1900 ja 1 188 '
      + '1900-luvulta.',
    lahde: 'en-Wikipedia "Cienfuegos", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'camaguey',
    nimi: 'Camagüey',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaupunki suunniteltiin sokkeloksi?',
      'Mikä on tinajón?',
    ],
    korostukset: ['tinajón|tinajón'],
    nappi: 'Sokkelo Henry Morgania vastaan',
    // -77.9169 E / 21.3808 N — en-Wikipedia "Camagüey"
    // Lähin pelikaupunki: Havanna 226,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3236.1, y: 2488 },
    },
    teksti: 'Camagüey on Kuuban kolmanneksi suurin kaupunki ja yksi seitsemästä espanjalaisten '
      + 'ensimmäisestä kaupungista saarella. Se perustettiin 1514 pohjoisrannikolle nimellä '
      + 'Santa María del Puerto del Príncipe ja siirrettiin 1528 sisämaahan taínojen kylän '
      + 'Camagüeyn paikalle. Kun merirosvo Henry Morgan poltti kaupungin 1600-luvulla, se '
      + 'rakennettiin uudelleen sokkeloksi, jotta hyökkääjien olisi vaikea liikkua sen sisällä. '
      + 'Kaupungin tunnus on tinajón, suuri saviruukku, jolla kerätään ja säilytetään '
      + 'sadevettä. Unesco otti vanhankaupungin luetteloonsa heinäkuussa 2008 juuri sen '
      + 'epäsäännöllisen sokkelokaavan, varhaisen siirtomaahistorian ja monivaikutteisen '
      + 'arkkitehtuurin vuoksi.',
    lahde: 'en-Wikipedia "Camagüey", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'baracoa',
    nimi: 'Baracoa',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Baracoaa kutsutaan nimellä Ciudad Primada?',
      'Miksi kaupunki jäi eristyksiin?',
    ],
    korostukset: ['Ciudad Primada|Ciudad Primada'],
    nappi: 'Kuuban ensimmäinen kaupunki ja ensimmäinen pääkaupunki',
    // -74.4958 E / 20.3467 N — en-Wikipedia "Baracoa"
    // Lähin pelikaupunki: Havanna 401,5 lautayksikköä (San Juan 279,9 on Puerto Ricossa).
    laudat: {
      maailmankartta: { x: 3350.1, y: 2524 },
    },
    teksti: 'Baracoa Guantánamon maakunnassa saaren itäkärjessä on Kuuban vanhin '
      + 'espanjalainen asutus ja sen ensimmäinen pääkaupunki — siitä lempinimi Ciudad Primada. '
      + 'Kolumbus kävi paikalla 27. marraskuuta 1492, ja Kuuban ensimmäinen kuvernööri Diego '
      + 'Velázquez de Cuéllar perusti kaupungin 15. elokuuta 1511. Nimen arvellaan tulevan '
      + 'taínojen kielestä ja tarkoittavan meren läsnäoloa. Kaupunki sijaitsee Hunajanlahden '
      + 'rannalla, ja sitä ympäröi laaja vuoristo, muun muassa Sierra del Purial; siksi se on '
      + 'jäänyt hyvin eristyneeksi, ja 1960-luvulla rakennettu vuoristotie on yhä ainoa '
      + 'maayhteys. Ilmasto on trooppinen sademetsäilmasto ilman varsinaista kuivaa kautta.',
    lahde: 'en-Wikipedia "Baracoa", johdanto-osa ja osio "Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hersheyn-sahkorata',
    nimi: 'Hersheyn rata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi suklaayhtiö rakensi rautatien Kuubaan?',
      'Mistä radan nykyiset vaunut ovat kotoisin?',
    ],
    korostukset: ['interurban|interurban-rata'],
    nappi: 'Suklaayhtiön sähkörata, joka kulkee yhä',
    // -81.9967 E / 23.0233 N (Hershey eli Camilo Cienfuegos) — en-Wikipedia "Hershey Electric Railway"
    // Lähin pelikaupunki: Havanna 98,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3100.1, y: 2430.5 },
    },
    teksti: 'Hersheyn sähkörata on 92 kilometrin interurban-rata Havannan Casablancasta '
      + 'Matanzasiin, ja se on Kuuban ainoa jäljellä oleva sähköistetty rautatie. Sen '
      + 'rakennutti noin 1916 suklaayhtiö The Hershey Company kuljettaakseen sokeria '
      + 'tehtaaltaan Havannan satamaan. Havannan pääradanpitäjä United Railways kieltäytyi '
      + 'päästämästä junaa raiteilleen, joten radalle rakennettiin oma pääteasema '
      + 'Casablancaan — lahden toiselle puolelle vanhastakaupungista, lautan päähän. Radan '
      + 'puolivälissä on Hersheyn tehdaskylä, nykyiseltä nimeltään Camilo Cienfuegos. '
      + 'Alkuperäiset J. G. Brillin vaunut korvattiin 1990-luvulla kuusikymmentä vuotta '
      + 'vanhoilla vaunuilla Kataloniasta, ja matka päästä päähän kestää noin kolme ja puoli '
      + 'tuntia.',
    lahde: 'en-Wikipedia "Hershey Electric Railway", johdanto-osa ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bayamo',
    nimi: 'Bayamo',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi Bayamo rikastui salakuljetuksella?',
      'Mikä katkaisi kaupungin yhteyden merelle 1616?',
    ],
    korostukset: ['salakuljetus|salakuljetuskauppaa'],
    nappi: 'Kaupunki, jonka rikkaus tuli laittomasta kaupasta',
    // -76.6433 E / 20.3792 N — en-Wikipedia "Bayamo"
    // Lähin pelikaupunki: Havanna 273,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3278.6, y: 2522.8 },
    },
    teksti: 'Bayamo on Granman maakunnan pääkaupunki ja Diego Velázquez de Cuéllarin toinen '
      + 'perustama kaupunki Kuubassa, vuodelta 1513. Sisämaan sijainti suojasi sitä '
      + 'merirosvoilta, ja Santiagon onnettomuudet olivat Bayamon onni: Cauto-jokea myöten, '
      + 'joka oli tuolloin auki 200 tonnin aluksille, ja Manzanillon kautta kaupunki kävi '
      + 'vilkasta salakuljetuskauppaa ja oli 1600-luvun alussa Kuuban johtava kaupunki. '
      + 'Vuoden 1616 suurtulva tukki joen puilla ja hylyillä ja katkaisi suoran yhteyden '
      + 'merelle, mutta laiton kauppa Curaçaon ja Jamaikan kanssa jatkui vielä kaksi '
      + 'vuosisataa. Nykyään Bayamo on jalankulkijoiden kaupunki: YK:n selvityksen mukaan vain '
      + 'noin 15 prosenttia asukkaista käyttää moottoriajoneuvoa, kun 39 prosenttia liikkuu '
      + 'noin viidelläsadalla luvanvaraisella hevosvaunulla, jotka ajavat kiinteitä reittejä.',
    lahde: 'en-Wikipedia "Bayamo", osiot "History" ja "Transportation" (tarkistettu 6.9.2026).',
  },
];
