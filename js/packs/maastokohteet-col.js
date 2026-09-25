/*
 * MAASTOKOHTEET — COL. Kolumbian maasto ja kohteet napautettaviksi.
 *
 * ── MAAILMAN ERÄ M1 (6.9.2026): ETELÄ-AMERIKKA ────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erän perustelut, kiintiö ja työtapa on kirjattu kokonaisuudessaan
 * sisartiedostoon js/packs/maastokohteet-arg.js.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN
 * (tools/johda-maastokohteet.mjs `laudat`, asteet en-Wikipedian
 * coordinates-propista). Vain maailmankartan rivi.
 *
 * VARTIO 7a. tools/maastoaineisto/COL.json -tiedostoa ei ole, joten
 * kohteet on valittu käsin; fokuslehden rajaus on olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.COL, x 3020,1…3693,3 ja
 * y 2646,8…3460,1), ja savukkeen vartio 7a pätee tähän erään: jokainen
 * alla oleva piste on tarkistettu rajauksen sisään.
 *
 * MIKÄ JÄTETTIIN POIS. Magdalena ja Orinoco ovat jo maailmankartan
 * jokinimiä (js/packs/maailmankartta-nimet.js), joten Kolumbian
 * jokimaastokohteeksi valittiin Caño Cristales. Zipaquirán
 * suolakatedraali putosi, koska sen nimiö olisi tullut Guatavitan
 * laguunin nimiön päälle: pisteiden väli on vain 7,6 lautayksikköä.
 * Bogotá on ainoa kolumbialainen pelikaupunki, ja lähin uusi merkki on
 * Guatavita 13,3 yksikön päässä siitä — yli KAUPUNGIN_KOHDALLA_SADEn
 * (7, js/fokuskohteet.js). Kaikki yksitoista ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_COL = [
  /* ================================================================
   * MAASTOKOHTEET — vuori, joki, meri.
   * ============================================================== */
  {
    id: 'cristobalcolon',
    nimi: 'Pico Cristóbal Colón',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipun korkeudesta ei olla varmoja?',
      'Miksi vuorelle ei päässyt 1990-luvulla?',
    ],
    korostukset: ['Sierra Nevada de Santa Marta|Sierra Nevada de Santa Martan'],
    nappi: 'Andien ulkopuolinen jättiläinen',
    // -73.6864 E / 10.8386 N — en-Wikipedia "Pico Cristóbal Colón"
    // lähin pelikaupunki: Bogotá 206,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3377.1, y: 2848.8 },
    },
    teksti: 'Pico Cristóbal Colón on mahdollisesti Kolumbian korkein vuori: ilmoitettu '
      + 'korkeus on 5 775 metriä. Se ja naapurihuippu Pico Simón Bolívar ovat lähes '
      + 'täsmälleen yhtä korkeat, eikä ole varmaa kumpi on korkeampi; toinen niistä on '
      + 'maailman viidenneksi topografisesti hallitsevin huippu. Molemmat kuuluvat '
      + 'Sierra Nevada de Santa Martan vuoristoon, jossa on pysyvä lumipeite, ja Colón on '
      + 'Etelä-Amerikan korkein kohta Andien ulkopuolella. Lähin korkeampi huippu on '
      + 'Cayambe 1 288 kilometrin päässä. Ensimmäisen nousun tekivät 1939 Walter Wood, '
      + 'Anderson Bakewell ja E. Praolini, mutta 1990-luvun alusta alkaen alueelle ei '
      + 'juuri päässyt; vasta John Biggarin retkikunta nousi huipulle joulukuussa 2015.',
    lahde: 'en-Wikipedia "Pico Cristóbal Colón", johdanto-osa ja osio "Climbing '
      + 'history" (tarkistettu 6.9.2026).',
  },
  {
    id: 'canocristales',
    nimi: 'Caño Cristales',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä tekee joesta punaisen?',
      'Milloin värit näkyvät?',
    ],
    korostukset: ['Macarenia clavigera|Macarenia clavigera'],
    nappi: 'Viiden värin joki',
    // -73.7942 E / 2.2664 N — en-Wikipedia "Caño Cristales"
    // lähin pelikaupunki: Bogotá 82,0 lautayksikköä
    laudat: {
      maailmankartta: { x: 3373.5, y: 3135.9 },
    },
    teksti: 'Caño Cristales virtaa Serranía de la Macarenassa, eristyneessä vuoristossa '
      + 'Metan departementissa, ja laskee Guayaberojokeen eli Orinocon vesistöön. '
      + 'Karjankasvattajat löysivät sen 1969, ja sitä kutsutaan viiden värin joeksi tai '
      + 'nestemäiseksi sateenkaareksi: heinäkuun lopusta marraskuuhun uoma hohtaa '
      + 'keltaisena, vihreänä, sinisenä, mustana ja ennen kaikkea punaisena. Punaisen '
      + 'tekee pohjassa kasvava vesikasvi Macarenia clavigera. Joki on nopeavirtainen ja '
      + 'täynnä koskia ja putouksia, ja uomassa on hiidenkirnuja: kovemman kiven kappale '
      + 'putoaa kuoppaan, virta pyörittää sitä ja se kaivertaa kuoppaa suuremmaksi. '
      + 'Vuoriston kvartsiittikalliot syntyivät noin 1,2 miljardia vuotta sitten, ja ne '
      + 'ovat Guayanan kilven läntinen jatke.',
    lahde: 'en-Wikipedia "Caño Cristales", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'karibianmericol',
    nimi: 'Karibianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Missä on Karibianmeren syvin kohta?',
      'Kuinka pitkä Mesoamerikan riutta on?',
    ],
    korostukset: ['Caymanin hauta|Caymanin hauta'],
    nappi: 'Meri, jonka pohjassa on riutta ja hauta',
    // -75.0 E / 11.5 N — en-Wikipedia "Caribbean Sea" (Kolumbian rannikon edusta)
    // lähin pelikaupunki: Panama 174,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3333.3, y: 2826.5 },
    },
    teksti: 'Karibianmeri on Pohjois-Atlantin sivumeri läntisen pallonpuoliskon '
      + 'tropiikissa. Sitä rajaavat pohjoisessa Suuret Antillit Kuubasta Puerto Ricoon, '
      + 'idässä Pienet Antillit, etelässä Venezuelan ja Kolumbian rannikko sekä lännessä '
      + 'Väli-Amerikka ja Jukatan. Se on yksi maailman suurimmista meristä, noin '
      + '2 754 000 neliökilometriä, ja syvin kohta on Caymanin hauta Caymansaarten ja '
      + 'Jamaikan välissä, 7 686 metriä pinnan alapuolella. Rannikkoa reunustavat lukuisat '
      + 'lahdet — Darién, Venezuela, Honduras — ja meressä on maailman toiseksi suurin '
      + 'valliriutta, tuhannen kilometrin mittainen Mesoamerikan riutta, joka kulkee '
      + 'Meksikon, Belizen, Guatemalan ja Hondurasin rannikoilla.',
    lahde: 'en-Wikipedia "Caribbean Sea", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M1 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'ciudadperdida',
    nimi: 'Ciudad Perdida',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Kadonneen kaupungin?',
      'Miten kaupunki löydettiin uudelleen?',
    ],
    korostukset: ['tairona|tairona'],
    nappi: 'Machu Picchua vanhempi kaupunki',
    // -73.9281 E / 11.0381 N — en-Wikipedia "Ciudad Perdida"
    // lähin pelikaupunki: Panama 202,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3369.1, y: 2842.1 },
    },
    teksti: 'Ciudad Perdida eli Kadonnut kaupunki on muinaisen kaupungin '
      + 'arkeologinen kohde Sierra Nevada de Santa Martassa. Sen uskotaan syntyneen noin '
      + 'vuonna 800, jolloin se olisi noin 650 vuotta Machu Picchua vanhempi; '
      + 'rakentajakansa oli tairona. Kaupunki on 169 vuorenrinteeseen hakattua terassia, '
      + 'kivetty tieverkko ja joukko pieniä pyöreitä aukioita, ja sinne pääsee vain '
      + 'nousemalla 1 200 kiviporrasta tiheän viidakon läpi. Aarteenetsijäperhe löysi '
      + 'paikan uudelleen 1972; kun kultaesineitä ja keramiikkauurnia alkoi ilmestyä '
      + 'paikallisille pimeille markkinoille, arkeologit huolestuivat, ja Kolumbian '
      + 'antropologisen instituutin johtajan ryhmä pääsi kohteelle 1976. Paikka '
      + 'kunnostettiin vuosina 1976–1982.',
    lahde: 'en-Wikipedia "Ciudad Perdida", johdanto-osa ja osio "Modern discovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sanagustin',
    nimi: 'San Agustín',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka kuvasi patsaat ensimmäisenä kirjallisesti?',
      'Kuinka vanhoja patsaat ovat?',
    ],
    korostukset: ['megaliitti|megaliittisten'],
    nappi: 'Maailman suurin muinaishautausmaa',
    // -76.2833 E / 1.8833 N — en-Wikipedia "San Agustín Archaeological Park"
    // lähin pelikaupunki: Quito 100,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3290.6, y: 3148.7 },
    },
    teksti: 'San Agustínin arkeologinen puisto on laaja muinaisjäännösalue Huilan '
      + 'departementissa Etelä-Kolumbiassa, ja se on ollut maailmanperintökohde vuodesta '
      + '1995. Siellä on Latinalaisen Amerikan suurin kokoelma uskonnollisia monumentteja '
      + 'ja megaliittisten veistosten ryhmiä, ja sitä pidetään maailman suurimpana '
      + 'muinaisena hautausmaana. Patsaiden ikä on epävarma, mutta niiden arvellaan '
      + 'syntyneen vuosien 5 ja 400 välillä; veistäjien alkuperä on yhä arvoitus, koska '
      + 'suurinta osaa alueesta ei ole kaivettu. Ensimmäisenä patsaat kuvasi '
      + 'kirjallisesti espanjalainen munkki Juan de Santa Gertrudis, joka kulki paikan '
      + 'kautta vuoden 1756 puolivälissä ja kirjoitti niistä neliosaisessa teoksessaan. '
      + 'Puisto on Magdalenajoen yläjuoksulla Kolumbian vuorisolmun itärinteillä.',
    lahde: 'en-Wikipedia "San Agustín Archaeological Park", johdanto-osa sekä osiot '
      + '"History" ja "Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tierradentro',
    nimi: 'Tierradentro',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä hypogeum on?',
      'Miten haudat on koristeltu?',
    ],
    korostukset: ['hypogeum|hypogeumissa'],
    nappi: 'Kierreportaat kalliohautaan',
    // -76.05 E / 2.5833 N — en-Wikipedia "Tierradentro"
    // lähin pelikaupunki: Bogotá 96,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 3298.3, y: 3125.4 },
    },
    teksti: 'Tierradentro tarkoittaa espanjaksi maan sisällä, ja nimi viittaa juuri '
      + 'siihen, mistä tämä esikolumbiaaninen kulttuuri tunnetaan: tiheään joukkoon '
      + 'huolellisesti kaiverrettuja kalliohautoja. Kulttuuri alkoi kukoistaa noin 200 '
      + 'eaa. Lounais-Kolumbian vuorilla ja jatkui 1600-luvulle asti; sitä pidetään osana '
      + 'San Agustínin kulttuuria eikä erillisenä. Tyypillisessä hypogeumissa on '
      + 'länteen avautuva sisäänkäynti, kierreportaat ja päähautakammio viidestä '
      + 'kahdeksaan metriä maanpinnan alla, ja sen ympärillä pienempiä kammioita, joissa '
      + 'kussakin on vainaja. Seinät on maalattu punaisin, mustin ja valkoisin '
      + 'geometrisin sekä ihmis- ja eläinaiheisin kuvioin. Kaivauksissa on löydetty 162 '
      + 'hautaa, ja ne muodostavat nykyään Inzán kunnassa sijaitsevan '
      + 'arkeologisen kansallispuiston.',
    lahde: 'en-Wikipedia "Tierradentro", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'cartagenacol',
    nimi: 'Cartagena de Indias',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Cartagena piti linnoittaa?',
      'Mitä kaupungin kautta kuljetettiin?',
    ],
    korostukset: ['asiento|asiento-järjestelmässä'],
    nappi: 'Muurikaupunki merirosvoja vastaan',
    // -75.5144 E / 10.3997 N — en-Wikipedia "Cartagena, Colombia"
    // lähin pelikaupunki: Panama 145,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3316.2, y: 2863.6 },
    },
    teksti: 'Cartagena — siirtomaa-aikana Cartagena de Indias — on satamakaupunki '
      + 'Kolumbian Karibian rannikolla. Se perustettiin 1. kesäkuuta 1533 ja on siten '
      + 'yksi Etelä-Amerikan vanhimmista siirtomaakaupungeista, vaikka Cartagenan lahden '
      + 'seudulla on asuttu jo 4000 eaa. Kaupunki oli Espanjan imperiumin hallinnon, '
      + 'kirkon ja talouden keskuksia ja avainsatama kahteen suuntaan: sen kautta vietiin '
      + 'Bolivian hopeaa Espanjaan ja tuotiin orjuutettuja afrikkalaisia '
      + 'asiento-järjestelmässä. Sijainti Magdalena- ja Sinú-jokien välissä avasi tien '
      + 'Uuden Granadan sisämaahan. Karibialla riehuneiden merirosvojen takia kaupunki oli '
      + 'rakennettava puolustettavaksi, ja sen muurien ympäröimä vanhakaupunki '
      + 'liitettiin maailmanperintöluetteloon 1984.',
    lahde: 'en-Wikipedia "Cartagena, Colombia", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'mompox',
    nimi: 'Mompox',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä oli Mompoxin tunnuslause 1810?',
      'Miksi kaupunki oli aikanaan rikas?',
    ],
    korostukset: ['kultasepät|kultasepistään'],
    nappi: 'Ensimmäisenä irti Espanjasta',
    // -74.4258 E / 9.2417 N — en-Wikipedia "Santa Cruz de Mompox"
    // lähin pelikaupunki: Bogotá 152,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3352.5, y: 2902.6 },
    },
    teksti: 'Mompox eli virallisesti Santa Cruz de Mompós on pikkukaupunki Bolívarin '
      + 'departementissa Pohjois-Kolumbiassa. Se kasvoi Magdalenajoen varrella ja on '
      + 'säilyttänyt siirtomaa-ajan luonteensa niin hyvin, että historiallinen keskusta '
      + 'liitettiin maailmanperintöluetteloon 1995. Nimi tulee malibu-kulttuurin '
      + 'päälliköltä Mampolta ja tarkoittaa Mampon maata; Alonso de Heredia perusti '
      + 'kaupungin 3. toukokuuta 1537 turvasatamaksi joen varrelle. Mompoxista tuli '
      + 'vauras tavaraliikenteen välietappi sisämaahan, sinne perustettiin '
      + 'kuninkaallinen rahapaja ja se tunnettiin kultasepistään. Kolumbian kaupungeista '
      + 'se julisti ensimmäisenä itsenäisyytensä Espanjasta 6. elokuuta 1810 tunnuslauseella '
      + '"olkaamme vapaita tai kuolkaamme".',
    lahde: 'en-Wikipedia "Santa Cruz de Mompox", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'guatavita',
    nimi: 'Guatavitan laguuni',
    tyyppi: 'sana',
    kysymykset: [
      'Mistä El Dorado -taru syntyi?',
      'Miten järvi on syntynyt?',
    ],
    korostukset: ['El Dorado|El Doradon'],
    nappi: 'Järvi, joka synnytti kultatarun',
    // -73.7756 E / 4.9789 N — en-Wikipedia "Lake Guatavita"
    // lähin pelikaupunki: Bogotá 13,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3374.1, y: 3045.4 },
    },
    teksti: 'Guatavitan laguuni on pyöreä järvi Kolumbian Andien itäisessä '
      + 'vuorijonossa Sesquilén kunnassa, 57 kilometriä Bogotásta koilliseen; pinta-alaa '
      + 'on 19,8 hehtaaria. Vanhat selitykset meteoriitista tai tulivuoresta on hylätty, '
      + 'ja todennäköisin syy on maanalaisten suolakerrostumien liukeneminen eli eräänlainen '
      + 'vajoama. Järvi on El Doradon eli kultaisen miehen tarun alkulähde. Muiscojen '
      + 'rituaalissa heidän hallitsijansa zipa peitettiin kultapölyllä, hänet vietiin '
      + 'kaislalautalla järvelle ja hän sukelsi veteen, jolloin kulta huuhtoutui pois; '
      + 'palvojat heittivät veteen koruja ja muita uhrilahjoja. Espanjalaiset tiesivät '
      + 'pyhästä järvestä mahdollisesti jo 1531, mutta ensimmäisenä paikalle pääsi '
      + 'Gonzalo Jiménez de Quesada kesäkuussa 1537. Yritykset kuivattaa järvi tai nostaa '
      + 'sen kulta eivät ole tuottaneet juuri muuta kuin muutaman esineen.',
    lahde: 'en-Wikipedia "Lake Guatavita", johdanto-osa sekä osiot "Etymology" ja '
      + '"Muisca mythology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'barranquillankarnevaali',
    nimi: 'Barranquillan karnevaali',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Millä karnevaali alkaa ja millä se päättyy?',
      'Mikä cumbia on?',
    ],
    korostukset: ['cumbia|cumbia'],
    nappi: 'Neljä päivää, joina kaupunki pysähtyy',
    // -74.8 E / 10.9639 N — en-Wikipedia "Barranquilla Carnival"
    // lähin pelikaupunki: Panama 173,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 3340, y: 2844.6 },
    },
    teksti: 'Barranquillan karnevaali on Kolumbian tärkeimpiä kansanjuhlia ja yksi '
      + 'maailman suurimmista karnevaaleista; perinteet ulottuvat 1800-luvulle. Neljä '
      + 'päivää ennen paastonaikaa kaupunki laittautuu kuntoon, tavallinen arki '
      + 'keskeytyy, ja tilalle tulevat katutanssit sekä musiikki- ja naamiaiskulkueet. '
      + 'Tanssien joukossa ovat espanjalainen paloteo, afrikkalainen congo ja '
      + 'alkuperäiskansojen mico y micas, ja soitetuin musiikkityyli on cumbia rumpuineen '
      + 'ja puhaltimineen. Karnevaali alkaa tuhkakeskiviikkoa edeltävänä lauantaina '
      + 'Kukkien taistelusta, jatkuu sunnuntain ja maanantain Suurella kulkueella ja '
      + 'orkesterifestivaalilla ja päättyy tiistaina, kun Joselito Carnaval haudataan ja '
      + 'kaikki surevat häntä. Kolumbian kongressi julisti karnevaalin kansakunnan '
      + 'kulttuuriseksi mestariteokseksi 2002 ja Unesco aineettoman perinnön '
      + 'mestariteokseksi 7. marraskuuta 2003.',
    lahde: 'en-Wikipedia "Barranquilla Carnival", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kahvimaisema',
    nimi: 'Kahvimaisema',
    tyyppi: 'ruoka',
    kysymykset: [
      'Miksi kahvia vastustettiin aluksi?',
      'Missä Kolumbian kahviakseli kulkee?',
    ],
    korostukset: ['Eje Cafetero|Eje Cafetero'],
    nappi: 'Vuoristo, joka kasvaa kahvia',
    // -75.7 E / 4.8 N — en-Wikipedia "Colombian coffee growing axis"
    // lähin pelikaupunki: Bogotá 54,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 3310, y: 3051.4 },
    },
    teksti: 'Kolumbian kahviakseli eli Eje Cafetero on maantieteellinen, kulttuurinen ja '
      + 'taloudellinen alue Caldasin, Risaraldan ja Quindíon departementeissa sekä '
      + 'Toliman, Valle del Caucan ja Antioquian reunoilla; sen kaupunkeja ovat '
      + 'Manizales, Pereira, Armenia ja Ibagué. Kahvia alettiin viljellä kaupallisesti '
      + 'Salazar de las Palmasissa Santanderin pohjoisosassa, ja 1900-luvun kuluessa '
      + 'siitä tuli maan tärkein vientituote. Alkuun viljelijät vastustivat sitä, sillä '
      + 'ensimmäistä satoa saa odottaa noin viisi vuotta. Vuonna 1999 kahvi toi 3,7 '
      + 'prosenttia bruttokansantuotteesta ja työllisti 37 prosenttia maatalouden väestä. '
      + 'Kasvuolot syntyvät yhdistelmästä: lämpötila 8–24 astetta, Andien sademetsä ja '
      + 'alueen geologia. Sama seutu koki 25. tammikuuta 1999 voimakkaan maanjäristyksen, '
      + 'mutta toipui nopeasti.',
    lahde: 'en-Wikipedia "Colombian coffee growing axis", johdanto-osa sekä osiot '
      + '"History of coffee" ja "Overview" (tarkistettu 6.9.2026).',
  },
];
