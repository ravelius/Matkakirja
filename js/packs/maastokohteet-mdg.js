/*
 * MAASTOKOHTEET — MDG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MDG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MDG.json. Työkalu laskee laudan
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
 * Madagaskarin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mangokylle ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia); Maromokotro ja Mosambikin kanaali ovat fi-Wikipedian asuja.
 */
export const MAASTOKOHTEET_MDG = [
  {
    id: 'maromokotro',
    nimi: 'Maromokotro',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipulle on yli kahden päivän matka?',
      'Mikä on Tsaratananan massiivi?',
    ],
    korostukset: ['Tsaratanana|Tsaratananan'],
    nappi: 'Saaren korkein huippu',
    // 48.9658 E / -14.0233 N — en-Wikipedia "Maromokotro"
    laudat: {
      maailmankartta: { x: 7465.5, y: 3682 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Madagaskarin korkeimmalle huipulle on lähimmästä kaupungista yli kahden päivän matka — '
      + 'eikä se ole retkeilijän valinta vaan kartan tosiasia. Maromokotro, 2 876 metriä, '
      + 'kohoaa saaren pohjoisosassa Tsaratananan massiivissa luonnonsuojelualueen sisällä, ja '
      + 'sitä lähimmät isommat asutukset, Bealanana ja Ambanja, ovat kumpikin useamman '
      + 'päivämarssin päässä. Huippu on sammunut tulivuori. Saaren korkein kohta ei siis ole '
      + 'nähtävyys, jonka luo ajetaan, vaan paikka, jonne pitää lähteä.',
    lahde: 'en-Wikipedia "Maromokotro" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mosambikinkanaali',
    nimi: 'Mosambikin kanaali',
    tyyppi: 'meri',
    kysymykset: [
      'Minne Mosambikvirta kuljettaa lämmintä vettä?',
      'Kenelle kanaalin pikkusaaret kuuluvat?',
    ],
    korostukset: ['Mosambikvirta|Mosambikvirta'],
    nappi: 'Salmi, joka erottaa saaren Afrikasta',
    // 43.5 E / -18 N — ulappa Madagaskarin länsirannikon edustalla; en-Wikipedia "Mozambique Channel" antaa keskipisteeksi 41 / -18
    laudat: {
      maailmankartta: { x: 7283.3, y: 3817.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mosambikin kanaalissa on neljä saarta, joiden omistajasta kiistellään yhä. Glorieuses, '
      + 'Juan de Nova, Europa ja Bassas da India ovat Ranskan hallussa, ja Madagaskar vaatii '
      + 'niitä kaikkia itselleen. Vesi niiden ympärillä on 1 700 kilometriä pitkä ja '
      + 'kapeimmillaankin 419 kilometriä leveä Intian valtameren haara Madagaskarin ja '
      + 'Mosambikin välissä; syvimmillään siinä on 3 292 metriä, noin 230 kilometriä Mosambikin '
      + 'rannikolta. Kanaalin läpi kulkee etelään lämmin Mosambikvirta, joka jatkuu eteläisen '
      + 'Afrikan itärannikolla Agulhasvirtana. Marraskuussa 1939 samoilla vesillä saksalainen '
      + 'taskutaistelulaiva Admiral Graf Spee pysäytti brittitankkeri Africa Shellin ja otti '
      + 'sen kapteenin vangiksi.',
    lahde: 'en-Wikipedia "Mozambique Channel", johdanto-osa sekä osiot "Islands in the channel" ja '
      + '"History" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mangoky',
    nimi: 'Mangoky',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joessa on niin paljon hiekkasärkkiä?',
      'Mitä kaskeaminen tekee joelle?',
    ],
    nappi: 'Hiekkasärkkien joki',
    // 44.5 E / -21.7 N — keskijuoksu ylänköjen ja rannikon välissä; en-Wikipedia "Mangoky River" antaa suistolle 43,53 / -21,32
    laudat: {
      maailmankartta: { x: 7316.7, y: 3946.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mangoky on 564 kilometrin pituinen joki, joka syntyy Mananantananan ja Matsiatran '
      + 'yhtyessä ja virtaa Madagaskarin keskiylängöiltä länteen Mosambikin kanaaliin. Saaren '
      + 'metsiä on hakattu ja kaskettu rajusti viime vuosikymmeninä, ja eroosion irrottama maa '
      + 'näkyy joessa: uomaa täplittävät lukemattomat hiekkasärkät, ja suiston pohjoisosaa '
      + 'reunustavat mangrovemetsät.',
    lahde: 'en-Wikipedia "Mangoky River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M13, ETELÄINEN AFRIKKA, 6.9.2026 ─────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Madagaskarilla oli ennen tätä erää kolme maastokohdetta ja
   * eläintäky (sifaka) mutta ei yhtäkään kohdetta eikä skandaalia.
   * Tavoite maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 7218,6…7572,3 ja y 3528,6…4171,6).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Andasibe-Mantadia 23,4 lautayksikön päässä Madagaskar-laatasta ja
   * kaukaisin Antsiranana 241,9 yksikön päässä Sansibarista. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, joten yksikään ehdokas ei kaatunut
   * siihen.
   *
   * TÔLANARO JÄI POIS NIMIÖLIMITYKSEN TAKIA: Fort Dauphin on 22,7
   * lautayksikön päässä maan oman sifaka-eläintäyn merkistä, ja
   * nimiöiden laatikot osuisivat päällekkäin. Tilalle tuli
   * Antsiranana, joka tuo merkin saaren pohjoiskärkeen.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'ambohimanga',
    nimi: 'Ambohimanga',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kukkulalle on neljätoista porttia?',
      'Miten kaupunki voi olla henkinen pääkaupunki?',
    ],
    korostukset: ['merina|merinojen', 'rova|rova'],
    nappi: 'Merinojen pyhä kuninkaankukkula',
    // 47.56278 E / -18.75917 N — en-Wikipedia "Ambohimanga"
    laudat: {
      maailmankartta: { x: 7418.8, y: 3844.1 },
    },
    teksti: 'Ambohimanga on kukkula ja linnoitettu kuninkaallinen asuinpaikka eli rova noin 24 '
      + 'kilometriä Antananarivosta koilliseen. Se on merinojen kulttuuri-identiteetin tärkein '
      + 'tunnus ja parhaiten säilynyt esikoloniaalisen Merinan kuningaskunnan muistomerkki: '
      + 'muurien sisällä on useiden hallitsijoiden asuintaloja ja hautoja. Kukkulan '
      + 'kuninkaallista aluetta kiertävät puolustusojat ja kivimuurit, ja sisään pääsee '
      + 'neljäntoista portin kautta, joista monet suljettiin kivikiekoilla. Kuningas '
      + 'Andrianampoinimerina päätti täältä käsin 77 vuotta kestäneen sisällissodan ja yhdisti '
      + 'Imerinan valtaansa vuoteen 1793 mennessä; hän siirsi hovin takaisin Antananarivoon '
      + 'mutta julisti kaupungit yhtä tärkeiksi, Ambohimangan kuningaskunnan henkiseksi '
      + 'pääkaupungiksi. Rituaaleja jatkettiin täällä Ranskan valloitukseen ja kuningasperheen '
      + 'karkotukseen 1897 asti, ja paikka on yhä pyhiinvaelluskohde.',
    lahde: 'en-Wikipedia "Ambohimanga", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tsingy-de-bemaraha',
    nimi: 'Tsingy de Bemaraha',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä sana tsingy tarkoittaa?',
      'Miksi kiviaavikon läpi ei voi kävellä?',
    ],
    korostukset: ['tsingy|tsingy'],
    nappi: 'Kivimetsä, jonka läpi ei kuljeta',
    // 44.75 E / -18.66667 N — en-Wikipedia "Tsingy de Bemaraha Strict Nature Reserve"
    laudat: {
      maailmankartta: { x: 7325, y: 3840.9 },
    },
    teksti: 'Tsingy de Bemaraha on luonnonpuisto Madagaskarin länsirannikon lähellä Melakyn '
      + 'alueella. Unesco kirjasi sen maailmanperintöluetteloon 1990 sen ainutlaatuisen '
      + 'maaperämuodostuman, säilyneiden mangrovemetsien sekä lintu- ja lemurikantojen takia. '
      + 'Maisema on neulanmuotoista kalkkikiveä, joka kohoaa Manambolo-joen jyrkänteiden '
      + 'yläpuolelle. Kivi on niin terävää, että se leikkaa varusteet ja ihon, ja siksi '
      + 'muodostumien yli kulkeminen on äärimmäisen vaikeaa: sana tsingy tulee paikallisesta '
      + 'ilmauksesta, joka tarkoittaa "paikkaa, jossa ei voi kävellä paljain jaloin". '
      + 'Suojelualueen eteläosasta tehtiin 1997 kansallispuisto, pohjoisosa on yhä tiukka '
      + 'luonnonpuisto.',
    lahde: 'en-Wikipedia "Tsingy de Bemaraha Strict Nature Reserve", johdanto-osa ja osio '
      + '"National Park" (tarkistettu 6.9.2026).',
  },
  {
    id: 'baobabien-kuja',
    nimi: 'Baobabien kuja',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi puut seisovat yksinään keskellä aukeaa?',
      'Mitä renala tarkoittaa?',
    ],
    korostukset: ['renala|renala'],
    nappi: 'Kadonneen metsän viimeiset puut',
    // 44.41944 E / -20.25 N — en-Wikipedia "Avenue of the Baobabs"
    laudat: {
      maailmankartta: { x: 7314, y: 3895.7 },
    },
    teksti: 'Baobabien kuja on ryhmä Grandidierin baobabeja (Adansonia grandidieri) '
      + 'päällystämättömän maantien varressa Morondavan ja Belon\'i Tsiribihinan välillä '
      + 'Menaben alueella Länsi-Madagaskarilla. Tien 260 metrin pätkällä kasvaa 20–25 puuta, '
      + 'ja lisäksi noin 25 saman lajin puuta seisoo läheisillä riisipelloilla ja niityillä '
      + 'neljän hehtaarin alalla. Paikallisesti puita kutsutaan nimellä renala, malagassiksi '
      + '"metsän äiti". Ne eivät alun perin kohonneet yksinään: ne olivat osa tiheää '
      + 'trooppista metsää, joka raivattiin pelloiksi väestön kasvaessa, ja vain baobabit '
      + 'jätettiin pystyyn ruoan ja rakennusaineen takia. Ympäristöministeriö antoi paikalle '
      + 'väliaikaisen suojelun heinäkuussa 2007.',
    lahde: 'en-Wikipedia "Avenue of the Baobabs", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'isalo',
    nimi: 'Isalo',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on syövyttänyt kanjonit hiekkakiveen?',
      'Ketkä hautaavat vainajansa näihin kallioihin?',
    ],
    korostukset: ['bara|barat'],
    nappi: 'Hiekkakiven kanjonit ja hautakalliot',
    // 45.4 E / -22.55833 N — en-Wikipedia "Isalo National Park"
    laudat: {
      maailmankartta: { x: 7346.7, y: 3976.2 },
    },
    teksti: 'Isalon kansallispuisto on Ihorombessa Lounais-Madagaskarilla, lähimpänä '
      + 'kaupunkina Ranohira. Se on hiekkakivimaisema, jonka tuuli ja vesi ovat pilkkoneet '
      + 'kalliokieleiksi, ylätasangoiksi, laajoiksi tasangoiksi ja jopa 200 metriä syviksi '
      + 'kanjoneiksi; korkeus vaihtelee 510 ja 1 268 metrin välillä, ja alueella on sekä '
      + 'pysyviä jokia että kausiuomia. Puisto perustettiin 1962, ja Madagascar National '
      + 'Parks on hoitanut sitä vuodesta 1997. Seutua ovat perinteisesti asuttaneet barat, '
      + 'sebukarjasta elävä paimentolaiskansa, ja kallioilla on sekä baran hautapaikkoja '
      + 'että niitä vanhempia sakalavojen hautoja.',
    lahde: 'en-Wikipedia "Isalo National Park", johdanto-osa ja osio "History and '
      + 'significance" (tarkistettu 6.9.2026).',
  },
  {
    id: 'andasibe-mantadia',
    nimi: 'Andasibe-Mantadia',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä eläin on indri?',
      'Miksi puistosta on tullut saareke?',
    ],
    korostukset: ['indri|indri'],
    nappi: 'Indrin sademetsä',
    // 48.41472 E / -18.93583 N — en-Wikipedia "Andasibe-Mantadia National Park"
    laudat: {
      maailmankartta: { x: 7447.2, y: 3850.2 },
    },
    teksti: 'Andasibe-Mantadia on 155 neliökilometrin suojelualue noin 150 kilometriä '
      + 'Antananarivosta itään, ja se on pääosin koskematonta ensimetsää. Puisto nousee 800 '
      + 'metristä 1 260 metriin, sadetta tulee keskimäärin 1 700 millimetriä ja sataa 210 '
      + 'päivänä vuodessa. Sademetsässä elää yksitoista lemurilajia. Puisto koostuu kahdesta '
      + 'osasta: Mantadian kansallispuistosta ja Analamazoatran suojelualueesta, joka '
      + 'tunnetaan Madagaskarin suurimman lemurin indrin kannasta. Alue ehdotettiin 2007 '
      + 'osaksi Atsinananan sademetsien maailmanperintökohdetta. Suurin uhka tulee puiston '
      + 'ulkopuolelta: hakkuut ja raivaus ovat eristäneet sen naapurimetsistä.',
    lahde: 'en-Wikipedia "Andasibe-Mantadia National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ranomafana',
    nimi: 'Ranomafana',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä lemuri löydettiin täältä tieteelle uutena?',
      'Mistä puiston nimi tulee?',
    ],
    korostukset: ['kultabamburilemuri|kultabamburilemurin'],
    nappi: 'Kuuman veden metsä',
    // 47.43 E / -21.22 N — en-Wikipedia "Ranomafana National Park"
    laudat: {
      maailmankartta: { x: 7414.3, y: 3929.4 },
    },
    teksti: 'Ranomafanan kansallispuisto perustettiin 1991 Madagaskarin neljänneksi '
      + 'kansallispuistoksi kahden lemurilöydön jälkeen: iso bamburilemuri (Hapalemur simus) '
      + 'löydettiin uudelleen, ja primatologi Patricia Wright löysi tieteelle uuden '
      + 'kultabamburilemurin (Hapalemur aureus). Puisto suojelee yli 41 600 hehtaaria '
      + 'trooppista sademetsää 800–1 200 metrin korkeudella Haute Matsiatran ja Vatovavyn '
      + 'alueilla. Korkeusero synnyttää monenlaista metsää alavasta sademetsästä sumumetsään. '
      + 'Nimi tulee malagassin sanoista rano mafana, "kuuma vesi", lähikylän kuumien lähteiden '
      + 'mukaan.',
    lahde: 'en-Wikipedia "Ranomafana National Park", johdanto-osa ja osio "Flora and fauna" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'merirosvojen-hautausmaa',
    nimi: 'Merirosvojen hautausmaa',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi merirosvot valitsivat juuri tämän saaren?',
      'Mitä kävi vuonna 2015 löydetylle harkolle?',
    ],
    korostukset: ['Nosy Boraha|Nosy Boraha'],
    nappi: 'Saari, jonne merirosvot jäivät',
    // 49.86667 E / -16.96667 N — en-Wikipedia "Nosy Boraha"
    laudat: {
      maailmankartta: { x: 7495.6, y: 3782.4 },
    },
    teksti: 'Nosy Boraha eli Sainte-Marie on saari Madagaskarin itärannikon edustalla, ja se '
      + 'oli merirosvojen tukikohta 1600- ja 1700-luvuilla — Adam Baldridgestä 1691 John '
      + 'Prohon 1719. Paikka oli hyvä: se on lähellä Itä-Intiasta lastit täynnä palaavien '
      + 'laivojen reittejä, ja saarella on myrskyiltä suojaavia lahtia, hedelmiä ja tyyntä '
      + 'vettä. William Kidd, Robert Culliford, Olivier Levasseur, Henry Every, Abraham '
      + 'Samuel ja Thomas Tew asuivat île aux Forbans -saarella pääkylän Ambodifotatran '
      + 'lahdella, ja monet heistä haudattiin saaren hautausmaille — jäänteitä ei ole '
      + 'kuitenkaan koskaan tunnistettu. Vuonna 2015 saaren rannikolta nostettiin 55 kilon '
      + 'harkko, jota pidettiin hopeana ja osana Kiddin aarretta; Unescon tutkimus totesi sen '
      + '95-prosenttisesti lyijyksi ja "katkenneeksi osaksi Sainte-Marien satamarakenteita".',
    lahde: 'en-Wikipedia "Nosy Boraha", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'antsiranana',
    nimi: 'Antsiranana',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Ranska halusi juuri tämän lahden?',
      'Mistä nimi Diego Suarez tuli?',
    ],
    korostukset: ['hiiliasema|hiiliasemaksi'],
    nappi: 'Lahti, joka maksettiin rauhasta',
    // 49.28333 E / -12.3 N — en-Wikipedia "Antsiranana"
    laudat: {
      maailmankartta: { x: 7476.1, y: 3623.5 },
    },
    teksti: 'Antsiranana on kaupunki Madagaskarin pohjoiskärjessä; vuoteen 1975 se oli '
      + 'nimeltään Diego-Suarez. Nimi syntyi helmikuussa 1506, kun amiraali Fernão Soares '
      + 'tunnisti paikan: siihen yhdistettiin kapteeni Diogo Soaresin etunimi ja amiraalin '
      + 'sukunimi. Vuonna 1635 ranskalainen luotsi Berthelot merkitsi lahden ensimmäisen '
      + 'kerran tällä nimellä karttaansa. 1880-luvulla Ranska havitteli lahtea höyrylaivojen '
      + 'hiiliasemaksi, ja ensimmäisen Ranskan–hovan sodan jälkeen kuningatar Ranavalona III '
      + 'allekirjoitti 17. joulukuuta 1885 sopimuksen, joka antoi Ranskalle protektoraatin '
      + 'lahdesta ja sen ympäristöstä sekä Nosy Bestä ja Sainte-Mariesta. Fregattikapteeni '
      + 'Caillet sai uuden siirtokunnan komentoonsa ja perusti kaupungin; vuonna 1900 sinne '
      + 'rakennettiin Decauville-kapearaiteinen rata.',
    lahde: 'en-Wikipedia "Antsiranana", osio "History" (tarkistettu 6.9.2026).',
  },
];

