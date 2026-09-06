/*
 * MAASTOKOHTEET — VEN. Venezuelan maasto ja kahdeksan kohdetta.
 *
 * ── MAAILMAN ERÄ M18 (6.9.2026) ───────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Venezuelalla ei ollut ennen tätä erää yhtäkään karttamerkkiä, ei
 * eläintäkyä eikä skandaalia (docs/moduulit/karttanostot-kattavuus.md,
 * Etelä-Amerikka). Kiintiö on kahdeksan KOHDETTA, kolme MAASTOKOHDETTA,
 * yksi eläintäky ja kaksi skandaalia; kaksi jälkimmäistä asuvat omissa
 * pakeissaan (js/packs/elaintakyt.js, js/packs/skandaalit.js).
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Paikat on johdettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * en-Wikipedian coordinates-propin asteista. Vain maailmankartan rivi
 * (Euroopan erillislaudasta on luovuttu, Raamattu 30.8.2026).
 *
 * ORINOCO EI OLE TÄSSÄ LISTASSA (N3). Orinoco on jo laudan oma jokinimi
 * (js/packs/maailmankartta-nimet.js), joten maaston kiintiö täyttyy
 * tepuilla, järvellä ja saaristolla. Samasta syystä Angel Falls on
 * kirjoitettu kohteeksi tyypillä `muu`: vesiputous ei ole maaston
 * tyyppi, ja Canaiman kansallispuisto kerrotaan sen kortissa, koska
 * puiston oma koordinaatti (−62,5 / 6,17) on vain seitsemän
 * lautayksikön päässä putouksesta.
 *
 * KAKSI EHDOKASTA KAATUI MERKKIEN PÄÄLLEKKÄISYYTEEN. Catatumbon
 * salamat (−71,71 / 9,34) osuisivat 16,6 lautayksikön päähän
 * Maracaibojärven merkistä, joten ilmiö kerrotaan järven kortissa;
 * Margaritan saari puolestaan osuisi kuuden yksikön päähän Cubaguan
 * skandaalista (Nueva Cádiz). Médanos de Coro jäi pois, koska se on
 * käytännössä Coron kohdalla.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Venezuelalla rajaus on olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.VEN, x 3305,5…3920,9, y 2732,4…3259,2), joten vartio
 * PÄTEE ja jokainen alla oleva piste on tarkistettu sen sisään.
 * Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin. Maan lähin merkki on
 * Colonia Tovar 14,6 lautayksikön päässä Caracasista; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Kaikki yksitoista
 * ovat siis pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja `lahde`-rivi kertoo artikkelin ja sen osan.
 */
export const MAASTOKOHTEET_VEN = [
  /* ================================================================
   * MAASTOKOHTEET — tepui, järvi ja saaristo.
   * ============================================================== */
  {
    id: 'roraima',
    nimi: 'Roraima',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä tepui on?',
      'Minkä kolmen maan rajalla Roraima on?',
    ],
    korostukset: ['tepui|tepuista'],
    nappi: 'Pöytävuori kolmen maan rajalla',
    // -60.7625 E / 5.1433 N — en-Wikipedia "Mount Roraima"
    // lähin pelikaupunki: Boa Vista 77,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3807.9, y: 3039.9 },
    },
    teksti: 'Roraima on korkein Etelä-Amerikan Pacaraiman ketjun tepuista eli '
      + 'pöytävuorista. Se on Brasilian, Guyanan ja Venezuelan rajalla, ja sitä ympäröivät '
      + '400–1 000 metriä korkeat jyrkänteet. Korkein kohta on jyrkänteen eteläreunalla '
      + '2 810 metrissä Venezuelan puolella; pohjoisempi 2 772 metrin kohouma kolmen maan '
      + 'rajapisteessä on Guyanan korkein kohta. Nimi tulee pemon-kansan kielestä: roroi '
      + 'tarkoittaa sinivihreää ja ma suurta. Rankkasateiden huuhtoutuminen on muovannut '
      + 'laen omalaatuisen pinnanmuodon, ja eristyneisyys on synnyttänyt runsaasti '
      + 'kotoperäisiä lajeja. Brittiläinen retkikunta nousi vuorelle ensimmäisenä 1884.',
    lahde: 'en-Wikipedia "Mount Roraima", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'maracaibojarvi',
    nimi: 'Maracaibojärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi Maracaibo ei ole aivan tavallinen järvi?',
      'Mitä Catatumbon salamat ovat?',
    ],
    korostukset: ['estuaari|estuaariksi', 'salama|salamointi'],
    nappi: 'Vanha vesi, öljy ja ikuinen ukkonen',
    // -71.5567 E / 9.8158 N — en-Wikipedia "Lake Maracaibo"
    // lähin pelikaupunki: Caracas 155,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3448.1, y: 2883.3 },
    },
    teksti: 'Maracaibojärvi on Luoteis-Venezuelassa Zulian, Trujillon ja Méridan osavaltioiden '
      + 'välissä. Sitä sanotaan tavallisesti järveksi, mutta vesitieteellisesti se sopisi '
      + 'paremmin estuaariksi tai puoliksi suljetuksi lahdeksi, sillä kapea salmi yhdistää '
      + 'sen pohjoisessa Venezuelanlahteen ja vesi on murtovettä. Pinta-alaltaan 13 512 '
      + 'neliökilometriä se olisi järveksi laskettuna Etelä-Amerikan suurin, Titicacaa '
      + 'suurempi, ja samalla yksi maailman vanhimmista: se syntyi 36 miljoonaa vuotta '
      + 'sitten, kun siirrokset romahtivat Andien kohotessa. Pohjoisosa on rikas öljystä ja '
      + 'kaasusta, ja alue on Venezuelan tärkein öljyntuotantoseutu; öljyn aiheuttama '
      + 'rehevöityminen on sen suurin ympäristöongelma. Järven ympärillä asuu neljännes '
      + 'maan väestöstä, ja siellä salamoi useammin kuin missään muualla maailmassa — '
      + 'Catatumbon salamointi valaisee öisin jopa merenkulkua.',
    lahde: 'en-Wikipedia "Lake Maracaibo", johdanto-osa ja osio "Geology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'losroques',
    nimi: 'Los Roques',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka monta saarta ja luotoa Los Roquesissa on?',
      'Ketkä asettuivat saarille pysyvästi?',
    ],
    korostukset: ['koralliriutta|koralliriutta'],
    nappi: 'Kolmesataaviisikymmentä luotoa Karibialla',
    // -66.7575 E / 11.8575 N — en-Wikipedia "Los Roques Archipelago"
    // lähin pelikaupunki: Caracas 56,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3608.1, y: 2814.4 },
    },
    teksti: 'Los Roquesin saaristo on Venezuelan liittovaltion alue, johon kuuluu noin 350 '
      + 'saarta, luotoa ja riuttaa yhteensä 40,61 neliökilometrin alalla. Se on Karibianmerellä '
      + '128 kilometriä La Guairan satamasta pohjoiseen. Koskematon koralliriutta houkuttelee '
      + 'kävijöitä, jotka saapuvat usein omilla purjeveneillään sisemmän riuttavyöhykkeen '
      + 'suojaisiin matalikkoihin; rakentamista ja matkailua säädellään. Ensimmäiset kävijät '
      + 'olivat Karibian alkuperäiskansoja, jotka keräsivät saarilta suuria kotiloita, '
      + 'kalastivat, pyydystivät kilpikonnia ja ottivat suolaa; suola-altaiden patoja, '
      + 'kivipolkuja ja talonjäänteitä on yhä jäljellä. Pysyvä asutus syntyi vasta, kun '
      + 'Margaritan saaren kalastajat toivat perheensä saarille.',
    lahde: 'en-Wikipedia "Los Roques Archipelago", johdanto-osa sekä osiot "Prehistory" ja '
      + '"Spanish colony" (tarkistettu 6.9.2026).',
  },

  /* ================================================================
   * KOHTEET — historia, tekniikka, kulttuuri, kaupunki ja muu.
   * ============================================================== */
  {
    id: 'saltoangel',
    nimi: 'Salto Ángel',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka korkea maailman korkein vesiputous on?',
      'Kenen mukaan putous on nimetty?',
    ],
    korostukset: ['Auyán-tepui|Auyán-tepuin'],
    nappi: 'Maailman korkein yhtenäinen vesiputous',
    // -62.5356 E / 5.9675 N — en-Wikipedia "Angel Falls"
    // lähin pelikaupunki: Boa Vista 122,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3748.8, y: 3012.3 },
    },
    teksti: 'Salto Ángel eli Angel Falls on maailman korkein katkeamaton vesiputous: '
      + 'kokonaiskorkeus on 979 metriä ja yhtenäinen vapaa pudotus 807 metriä. Vesi syöksyy '
      + 'Auyán-tepuin reunalta Canaiman kansallispuistossa Gran Sabanan alueella Bolívarin '
      + 'osavaltiossa; puisto on Unescon maailmanperintökohde. Korkeuslukuun sisältyy '
      + 'pääpudotuksen lisäksi noin 400 metriä kaltevaa kaskadia ja koskea sekä 30 metrin '
      + 'pudotus niiden alapuolella. Putous on Körepajoen haarassa, joka virtaa Churúniin, '
      + 'sieltä Carraoon ja lopulta Orinocoon. Nimi tulee yhdysvaltalaisesta lentäjästä '
      + 'Jimmie Angelista, joka lensi putouksen yli ensimmäisenä 16. marraskuuta 1933; '
      + 'hänen tuhkansa siroteltiin putoukselle 2. heinäkuuta 1960. Onko putous maailman '
      + 'korkein, ei ole aivan varmaa: mittaukset on tehty kaukaa, ja Etelä-Afrikan '
      + 'Tugela Falls on toinen ehdokas.',
    lahde: 'en-Wikipedia "Angel Falls", johdanto-osa ja osio "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'coro',
    nimi: 'Coro',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Coroa kutsuttiin nimellä Neu-Augsburg?',
      'Miksi Coro on maailmanperintöluettelossa?',
    ],
    korostukset: ['Welser|Welserien'],
    nappi: 'Venezuelan toiseksi vanhin kaupunki',
    // -69.67 E / 11.417 N — en-Wikipedia "Coro, Venezuela"
    // lähin pelikaupunki: Caracas 101,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3511, y: 2829.3 },
    },
    teksti: 'Coro on Falcónin osavaltion pääkaupunki ja Cumanán jälkeen Venezuelan toiseksi '
      + 'vanhin kaupunki: Juan de Ampíes perusti sen 26. heinäkuuta 1527 nimellä Santa Ana '
      + 'de Coro. Vuosina 1528–1546 se tunnettiin nimellä Neu-Augsburg, sillä se oli '
      + 'augsburgilaisen Welserien pankkiirisuvun hallussa ja siten Amerikan ensimmäinen '
      + 'saksalainen siirtokunta. Sen jälkeen Coro oli Venezuelan kenraalikapteenikunnan '
      + 'ensimmäinen pääkaupunki 1546–1578 ja Etelä-Amerikan ensimmäisen 1531 perustetun '
      + 'hiippakunnan istuin. Kaupunki on Paraguanán niemimaan eteläpuolella rannikkotasangolla, '
      + 'ja sen satama La Vela de Coro on muutaman kilometrin päässä Karibianmeren rannalla. '
      + 'Hyvin säilyneen siirtomaa-arkkitehtuurin ansiosta "Coro ja sen satama La Vela" '
      + 'liitettiin maailmanperintöluetteloon 1993; vuodesta 2005 kohde on ollut '
      + 'vaarantuneiden maailmanperintökohteiden listalla.',
    lahde: 'en-Wikipedia "Coro, Venezuela", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ciudadbolivar',
    nimi: 'Ciudad Bolívar',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä nimi Angostura tarkoittaa ja mihin se viittaa?',
      'Miksi kaupunkia jouduttiin siirtämään kolme kertaa?',
    ],
    korostukset: ['Angostura|Angosturan'],
    nappi: 'Kaupunki Orinocon kapeikossa',
    // -63.5483 E / 8.1379 N — en-Wikipedia "Ciudad Bolívar"
    // lähin pelikaupunki: Caracas 131,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3715.1, y: 2939.6 },
    },
    teksti: 'Ciudad Bolívar on Bolívarin osavaltion pääkaupunki Kaakkois-Venezuelassa, ja se '
      + 'tunnettiin aiemmin niminä Angostura ja Santo Tomé de Guayana. Kaupunki on kohdassa, '
      + 'jossa Orinoco kapenee noin puolentoista kilometrin levyiseksi; siihen rakennettiin '
      + 'joen ensimmäinen silta, ja se on Itä-Venezuelan tärkeä jokisatama. Angosturan nimi '
      + 'elää Angosturan kongressissa, angosturapuussa ja angosturakatkerossa. Espanjalainen '
      + 'asutus jouduttiin siirtämään kolmesti, koska kariibit sekä hollantilaiset ja '
      + 'englantilaiset kilpailijat hyökkäsivät sen kimppuun jatkuvasti: hollantilaiset '
      + 'tuhosivat 1576 perustetun ensimmäisen asutuksen 1579, ja Walter Raleighin retkikunta '
      + 'ryösti 1595 perustetun toisen 1617 — samassa yhteydessä kuoli Raleighin poika Watt. '
      + 'Nykyisen kaupungin historiallinen keskusta on hyvin säilynyt.',
    lahde: 'en-Wikipedia "Ciudad Bolívar", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'guacharonluola',
    nimi: 'Guácharon luola',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä lintu luolassa asuu?',
      'Kuka tutki luolan vuonna 1799?',
    ],
    korostukset: ['rasvakehrääjä|rasvakehrääjistä'],
    nappi: 'Venezuelan pisin luola ja sen linnut',
    // -63.6397 E / 10.1999 N — en-Wikipedia "Cueva del Guácharo National Park"
    // lähin pelikaupunki: Caracas 108,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3712, y: 2870.3 },
    },
    teksti: 'Guácharon luolan kansallispuisto on 12 kilometrin päässä Caripen kylästä '
      + 'Monagasin osavaltiossa Venezuelassa. Sen keskus on suuri kalkkikiviluola, Venezuelan '
      + 'pisin: yli kymmenen kilometriä käytävää, useita suuria saleja ja kivimuodostumia. '
      + 'Lämpötila pysyy lähellä 19:ää astetta ja ilmankosteus sadassa prosentissa. Luola on '
      + 'kuuluisa tuhansista guácharoista eli rasvakehrääjistä, joiden mukaan sekä luola että '
      + 'puisto on nimetty. Chaima-kansalle paikka oli pyhä, ja vain luolan ensimmäiseen '
      + 'osaan mentiin, koska siellä linnut pesivät; linnuista kerättiin vuosittain rasvaa, '
      + 'jota riitti koko vuodeksi, ja myöhemmin Caripen kapusiinit käyttivät sitä '
      + 'ruoanlaitossa. Alexander von Humboldt kävi luolassa 1799 Amerikan-tutkimusmatkallaan, '
      + 'ja hänen muistiinpanonsa ovat sen ensimmäinen kattava kuvaus.',
    lahde: 'en-Wikipedia "Cueva del Guácharo National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'meridankoysirata',
    nimi: 'Méridan köysirata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka korkealle köysirata nousee?',
      'Kuinka pitkä rata on ja monessako osassa?',
    ],
    korostukset: ['köysirata|köysirata'],
    nappi: 'Maailman korkein köysirata',
    // -71.0636 E / 8.5292 N — en-Wikipedia "Mérida cable car"
    // lähin pelikaupunki: Caracas 149,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3464.5, y: 2926.5 },
    },
    teksti: 'Méridan köysirata on venezuelalainen köysiratajärjestelmä, jonka alaasema on '
      + 'Méridan kaupungissa 1 577 metrin korkeudella ja pääteasema Pico Espejolla 4 765 '
      + 'metrissä. Se on maailman korkein ja toiseksi pisin köysirata. Rata avattiin '
      + 'yleisölle 1960, suljettiin 2008 peruskorjausta varten ja avattiin uudelleen '
      + 'lokakuussa 2016. Järjestelmä koostuu neljästä peräkkäisestä osuudesta, jotka '
      + 'kattavat 12,5 kilometriä vaikeakulkuista maastoa; jokaisella osuudella on kaksi '
      + 'kaistaa ja kummallakin kaistalla vaunu, johon mahtuu 36 matkustajaa. Vauhti on '
      + 'viisi metriä sekunnissa. Hanke syntyi Venezuelan vuoristokerhon aloitteesta 1952, '
      + 'jotta Sierra Nevada de Méridalle olisi helpompi nousta, ja rakentaminen alkoi 1955.',
    lahde: 'en-Wikipedia "Mérida cable car", johdanto-osa sekä osiot "Structure" ja '
      + '"History and administration" (tarkistettu 6.9.2026).',
  },
  {
    id: 'coloniatovar',
    nimi: 'Colonia Tovar',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Colonia Tovarin perustajat tulivat?',
      'Miksi juuri tämä paikka valittiin siirtokunnalle?',
    ],
    korostukset: ['Baden|Badenin'],
    nappi: 'Badenilainen kylä vuorten päällä',
    // -67.2894 E / 10.4056 N — en-Wikipedia "Colonia Tovar"
    // lähin pelikaupunki: Caracas 14,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3590.4, y: 2863.4 },
    },
    teksti: 'Colonia Tovar on vuoristokaupunki Araguan osavaltiossa noin 65 kilometriä '
      + 'Caracasista länteen. Sen perusti 8. huhtikuuta 1843 kolmesataayhdeksänkymmentä '
      + 'siirtolaista, jotka tulivat silloin itsenäisestä Badenin suurherttuakunnasta; '
      + 'lähtömaan kulttuurin jälki näkyy niin selvästi, että kaupunkia kutsutaan Karibian '
      + 'Saksaksi. Siirtokuntayhtiön perustivat eversti Agostino Codazzi ja Ramón Díaz, ja '
      + 'takaajana oli Tovarin kreivi Martín Tovar y Ponte. Codazzi otti yhteyttä Badenin '
      + 'Kaiserstuhlin asukkaisiin ja valitsi alueen, jonka maasto ja ilmasto muistuttivat '
      + 'lähtöseutua; maan lahjoitti kreivin veljenpoika Manuel Felipe Tovar. Talous nojaa '
      + 'maatalouteen ja matkailuun, ja viileän ilmaston ansiosta siellä kasvatetaan '
      + 'persikoita, mansikoita, kukkakaalia, porkkanaa ja perunaa.',
    lahde: 'en-Wikipedia "Colonia Tovar", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'morrocoy',
    nimi: 'Morrocoy',
    tyyppi: 'muu',
    kysymykset: [
      'Millaisista osista Morrocoyn puisto koostuu?',
      'Mikä puistoa uhkaa?',
    ],
    korostukset: ['mangrove|mangrovemetsää'],
    nappi: 'Mangroveja, luotoja ja koralleja',
    // -68.306 E / 10.856 N — en-Wikipedia "Morrocoy National Park"
    // lähin pelikaupunki: Caracas 51,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 3556.5, y: 2848.2 },
    },
    teksti: 'Morrocoyn kansallispuisto on Falcónin osavaltion itärannikolla Golfo Tristen '
      + 'pohjoispuolella Venezuelan luoteisrannikolla. Se julistettiin kansallispuistoksi '
      + '26. toukokuuta 1974, ja sen pinta-ala on 32 090 hehtaaria sekä maalla että vedessä. '
      + 'Puistossa on mangrovemetsää ja lukuisia luotoja, muun muassa Borracho, Muerto, '
      + 'Sombrero, Sal, Las Animas ja Peraza, ja luodoilla valkohiekkaisia rantoja. Lahdet, '
      + 'mangrovet ja saaret ovat Chichirivichen kukkuloiden juurella; puiston korkein kohta '
      + 'on 285-metrinen Chichirivichen kukkula, ja kallioperä on tertiäärikauden '
      + 'korallialkuperää olevaa kalkkikiveä. Ilmasto on lämmin ja koillispasaatin '
      + 'leimaama, ja sademäärä on vähäinen. Ihmisen toiminta on verottanut puiston '
      + 'luontoa, ja korallilajien määrä on viime vuosina laskenut selvästi.',
    lahde: 'en-Wikipedia "Morrocoy National Park", johdanto-osa sekä osiot "Geography" ja '
      + '"Climate" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ciudadguayana',
    nimi: 'Ciudad Guayana',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten Ciudad Guayana syntyi?',
      'Miksi kaupunki näyttää erilaiselta kuin muut Etelä-Amerikan kaupungit?',
    ],
    korostukset: ['Caroní|Caroní'],
    nappi: 'Suunnittelupöydällä syntynyt terästen kaupunki',
    // -62.65 E / 8.3667 N — en-Wikipedia "Ciudad Guayana"
    // lähin pelikaupunki: Caracas 154,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3745, y: 2932 },
    },
    teksti: 'Ciudad Guayana on kaupunki Bolívarin osavaltiossa Venezuelassa. Se levittäytyy '
      + '40 kilometrin matkalle Orinocon etelärannalle kohtaan, jossa siihen yhtyy '
      + 'pääsivujoki Caroní; Caroní jakaa kaupungin kahtia vanhaan San Félixiin idässä ja '
      + 'uudempaan Puerto Ordaziin lännessä. Kaupunki perustettiin virallisesti 1961 '
      + 'yhdistämällä kaksi vanhempaa asutusta, mutta San Félixin historia ulottuu '
      + '1700-luvulle. Rajojen sisällä ovat Cachamayn ja Lloviznan vesiputoukset, ja '
      + 'Caroníin on rakennettu kolme siltaa sekä Orinocon yli 2006 vihitty Orinoquían '
      + 'silta. Rauta-, teräs-, alumiini- ja vesivoimateollisuus ovat tehneet siitä '
      + 'Venezuelan nopeimmin kasvavan kaupungin. Suunniteltu syntytapa näkyy katukuvassa: '
      + '1960- ja 1970-luvuilla alueella toimi yhdysvaltalainen US Steel, joka rakensi '
      + 'omille työntekijöilleen asuinalueet, ja ne muistuttavat aikansa yhdysvaltalaisia '
      + 'lähiöitä.',
    lahde: 'en-Wikipedia "Ciudad Guayana", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
