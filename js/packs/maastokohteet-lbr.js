/*
 * MAASTOKOHTEET — LBR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LBR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LBR.json. Työkalu laskee laudan
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
 * Liberian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Wuteven korkeutta ei kerrota artikkelin johdannossa; tietolaatikko antaa 1 447 m (lähteenä CIA World Factbook), ja sitä käytetään.
 *
 * MAAILMAN ERÄ M12 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Providence Island, Sapon puisto, Yekepa, Harper, Robertsport,
 * Buchanan, Gbarnga ja Bopolu. Lähin uusi merkki on Harper 29,4
 * lautayksikön päässä Kap Palmas -laatasta (KAUPUNGIN_KOHDALLA_SADE 7),
 * joten kaikki ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen
 * kohteen lähin pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_LBR = [
  {
    id: 'mountwuteve',
    nimi: 'Mount Wuteve',
    tyyppi: 'vuori',
    kysymykset: [
      'Millä toisella nimellä vuori tunnetaan?',
      'Miksi vuoren korkeus muuttui?',
    ],
    korostukset: ['Guinean ylänkö|Guinean ylängöllä'],
    nappi: 'Liberian korkein kohta',
    // -9.925 E / 8.1458 N — en-Wikipedia "Mount Wuteve"
    laudat: {
      maailmankartta: { x: 5502.5, y: 2939.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Liberian korkein kohta kasvoi 67 metriä ilman että kivi liikkui. Mount Wuteve eli '
      + 'Wologizi tunnettiin pitkään 1 380 metrin korkuisena, kunnes avaruussukkulan '
      + 'tutkakartoitus mittasi sen uudelleen: nykyinen lukema on 1 447 metriä. Vuori on '
      + 'Guinean ylängöllä, ja sen harjanne jatkuu kaksikymmentäkaksi kilometriä '
      + 'sivuhaaroineen; rinteet ovat jyrkät ja paikoin sadan metrin pystysuoria '
      + 'kallioseinämiä. Alarinteillä kasvaa avointa sademetsää, ja tuhannen metrin yläpuolella '
      + 'puut kääpiöityvät. BirdLife International on nimennyt massiivin kansainvälisesti '
      + 'tärkeäksi lintualueeksi, ja sen metsissä liikkuu myös metsänorsuja ja länsimaisia '
      + 'simpansseja.',
    lahde: 'en-Wikipedia "Mount Wuteve", osiot "Geography" ja "Environment" (tarkistettu '
      + '1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli kolumbiaaninen vaihto?',
      'Miksi Atlantin ylitys muutti maailman?',
    ],
    nappi: 'Valtameri, joka yhdisti ja erotti',
    // -11.2 E / 5.9 N — ulappa Monrovian edustalla; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 5460, y: 3014.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Liberian koko rannikko avautuu sen '
      + 'trooppiselle ulapalle. Valtameri on muovannut ihmiskunnan historiaa rajummin kuin '
      + 'mikään muu meri: 1500-luvulta 1800-luvulle se oli sekä Atlantin orjakaupan että niin '
      + 'sanotun kolumbiaanisen vaihdon näyttämö, jossa ihmiset, kasvit, eläimet ja taudit '
      + 'siirtyivät mantereelta toiselle.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cavalla',
    nimi: 'Cavalla',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä kala antoi joelle nimen?',
      'Minkä kahden maan rajaa joki piirtää?',
    ],
    korostukset: ['Mont Nimba|Mont Nimban'],
    nappi: 'Joki, joka nimettiin kalasta',
    // -7.9 E / 4.9 N — alajuoksu Liberian ja Norsunluurannikon rajalla; en-Wikipedia "Cavalla River" antaa suulle -7,53 / 4,37
    laudat: {
      maailmankartta: { x: 5570, y: 3048 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Liberian pisin joki on nimetty kalan mukaan, joka ei ui siinä vaan sen suulla. Cavalla '
      + 'sai nimensä suistossa tavattavasta cavalla-piikkimakrillista, ja sitä kutsutaan myös '
      + 'nimillä Cavally, Youbou ja Diougou. Joki alkaa Guineassa Mont Nimban pohjoispuolelta, '
      + 'kiertää Norsunluurannikon kautta takaisin rajalle ja laskee Guineanlahteen '
      + 'kaksikymmentäyksi kilometriä Harperista itään. Sen 515 kilometristä suurin osa on '
      + 'kartalla viiva: se muodostaa Liberian ja Norsunluurannikon välisen rajan kahdesta '
      + 'kolmasosasta eteläisimmän. Joessa elää oma kotoperäinen kalansa, Chiloglanis normani, '
      + 'jota ei tunneta muualta.',
    lahde: 'en-Wikipedia "Cavalla River" (tarkistettu 1.9.2026).',
  },
  /*
   * ── MAAILMAN ERÄ M12 (LÄNSI-AFRIKKA) 6.9.2026 ────────────────────
   *
   * Kahdeksan KOHDETTA Liberiaan. Yksikään ei ole pelikaupungin
   * kohdalla: lähin uusi merkki on Harper 29,4 lautayksikön päässä
   * Kap Palmas -laatasta (KAUPUNGIN_KOHDALLA_SADE 7), ja jokaisen
   * kohteen lähin pelikaupunki on kirjattu koordinaattirivin viereen.
   * Erä on kuvaton, ja jokainen väite on en-Wikipedian raakatekstin
   * katteessa.
   *
   * MOUNT NIMBAN LUONNONPUISTO JÄI POIS, KOSKA SE EI OLE LIBERIASSA:
   * en-Wikipedian "Mount Nimba Strict Nature Reserve" on Guinean ja
   * Norsunluurannikon puolella, ja sen koordinaatti veisi merkin
   * naapurimaahan. Nimban vuoriston liberialainen puoli on kartalla
   * Yekepan kaivoskaupunkina. Harbel jäi pois kohteista, koska
   * Firestonen sopimus kerrotaan saman erän skandaalina siellä
   * (js/packs/skandaalit.js).
   */
  {
    id: 'providence-island',
    nimi: 'Providence Island',
    nimio: 'Providence',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä järjestö lähetti ensimmäiset uudisasukkaat saarelle?',
      'Millä nimellä saari tunnettiin ennen Providencea?',
    ],
    korostukset: ['Ducor|Ducoriksi'],
    nappi: 'Liberian ensimmäinen asutus',
    // 10.802 W / 6.32 N — en-Wikipedia "Providence Island, Liberia"
    // Lähin pelikaupunki: Sierra Leone 104,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5473.3, y: 3000.6 },
    },
    teksti: 'Providence Island oli paikka, johon American Colonization Society sai ensimmäisenä '
      + 'pysyvästi asutetuksi Yhdysvalloista tuodut vapautetut mustat siirtolaiset. Useiden '
      + 'epäonnistuneiden yritysten jälkeen seura lähetti Robert F. Stocktonin ja Eli Ayersin '
      + 'neuvottelemaan päälliköiden kanssa, ja kokous pidettiin Cape Mesuradolla, jota '
      + 'paikalliset kutsuivat Ducoriksi. Niin sanotulla Ducorin sopimuksella seura sai '
      + 'alueen, jota rajasivat pohjoisessa ja lännessä Atlantti ja etelässä ja idässä '
      + 'Mesuradojoki — mukaan lukien lahden Dozoan saari. Sopimuksen pitävyyden vuoksi Ayers '
      + 'ja Stockton huolehtivat siitä, että kaikki ympäröivät päälliköt allekirjoittivat sen: '
      + 'gola-, dei- ja kru-päälliköt kukin puolestaan. Saari nimettiin ensin Perseveranceksi '
      + 'ja sitten Providenceksi, ja Liberia esitti sitä 2017 maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Providence Island, Liberia", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sapon-puisto',
    nimi: 'Sapon puisto',
    nimio: 'Sapo',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri Sapon kansallispuisto oli perustettaessa?',
      'Minkä kansan mukaan puisto on nimetty?',
    ],
    korostukset: ['Ylä-Guinean metsä|Ylä-Guinean metsä'],
    nappi: 'Liberian ensimmäinen kansallispuisto',
    // 8.4146 W / 5.4111 N — en-Wikipedia "Sapo National Park"
    // Lähin pelikaupunki: Kap Palmas 53,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5552.8, y: 3031 },
    },
    teksti: 'Sapo Sinoen maakunnassa on Liberian ensimmäinen kansallispuisto ja maan suurin '
      + 'suojeltu sademetsä. Se on Länsi-Afrikan toiseksi laajin koskematon trooppinen '
      + 'sademetsä heti naapurin Taïn kansallispuiston jälkeen, ja se kuuluu Ylä-Guinean '
      + 'metsä -ekosysteemiin, jolla on Conservation Internationalin mukaan maailman suurin '
      + 'nisäkäslajien monimuotoisuus. Puistossa on kielletty maanviljely, rakentaminen, '
      + 'kalastus, metsästys, asuminen ja hakkuu. Liberian metsähallitus perustettiin 1976 ja '
      + 'luonnonvarayksikkö 1977 Alexander Pealin johdolla; seitsemästä ehdotetusta '
      + 'suojelualueesta vain Sapo — nimensä mukaan paikallisen sapo- eli sao-kansan '
      + 'puisto — sai muodollisen aseman 1983. Rajat vedettiin yhdessä WWF:n, '
      + 'Maailman luonnonsuojeluliiton ja rauhanjoukkojen kanssa, ja puisto oli tuolloin '
      + '1 308 neliökilometriä.',
    lahde: 'en-Wikipedia "Sapo National Park", johdanto-osa ja osio "Designation and early '
      + 'history" (tarkistettu 6.9.2026).',
  },
  {
    id: 'yekepa',
    nimi: 'Yekepa',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Minkä yhtiön kaivoskaupunki Yekepa oli?',
      'Mikä korkea paikka on Yekepan vieressä?',
    ],
    korostukset: ['rautamalmi|rautamalmin'],
    nappi: 'Nimban rautamalmin kaivoskaupunki',
    // 8.5378 W / 7.5794 N — en-Wikipedia "Yekepa"
    // Lähin pelikaupunki: Kap Palmas 107,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5548.7, y: 2958.4 },
    },
    teksti: 'Yekepa on kaupunki Pohjois-Liberian Nimban maakunnassa lähellä Guinean rajaa. Se '
      + 'oli Lamco-yhtiön rautamalmin louhinnan tukikohta, kunnes ensimmäinen sisällissota '
      + '1989–1997 tuhosi sen. Viereinen Guesthouse Hill on maan korkeimpia kohtia, ja '
      + 'kaupungissa toimii African Bible College University. Teräsyhtiö ArcelorMittal sai '
      + 'toukokuussa 2007 luvan kunnostaa kerran vauraan kaivoskaupungin, ja suunnitelmiin '
      + 'kuuluivat sairaala, koulut ja muut palvelut. Maailmanmarkkinoiden rautahinnat '
      + 'heilahtivat, suuri osa uudistuksesta jäi tekemättä, ja alle vuosikymmenessä paikka '
      + 'oli suureksi osaksi taas hylätty.',
    lahde: 'en-Wikipedia "Yekepa", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'harper',
    nimi: 'Harper',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä tasavallan pääkaupunki Harper oli?',
      'Kuka ehdotti nimeä Liberia?',
    ],
    korostukset: ['amerikanliberialainen|amerikanliberialaisten'],
    nappi: 'Marylandin tasavallan pääkaupunki',
    // 7.7167 W / 4.3667 N — en-Wikipedia "Harper, Liberia"
    // Lähin pelikaupunki: Kap Palmas 29,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5576.1, y: 3065.8 },
    },
    teksti: 'Harper on Marylandin maakunnan pääkaupunki Liberian kaakkoiskulmassa, Atlantin '
      + 'ja Hoffmanjoen välissä. Se on nimetty yhdysvaltalaisen poliitikon ja American '
      + 'Colonization Societyn jäsenen Robert Goodloe Harperin mukaan — juuri hän ehdotti '
      + 'nimeä Liberia seuran afrikkalaiselle siirtokunnalle. Harper oli lyhytikäisen '
      + 'Marylandin tasavallan (1834–1857) pääkaupunki; tasavalta oli viimeinen osa, joka '
      + 'liitettiin nykyiseen Liberiaan. Seutu on amerikanliberialaisten perinteisiä '
      + 'kotiseutuja, ja abolitionisti John Brown Russwurm on haudattu sinne. Vanhimmat '
      + 'kaupunginosat rakennettiin Yhdysvaltain etelävaltioiden plantaasitalojen malliin, ja '
      + 'niitä on verrattu New Orleansiin; nähtävyyksiä ovat presidentti William Tubmanin '
      + 'rauniomainen kartano ja hänen rakennuttamansa vapaamuurarien loosin runko.',
    lahde: 'en-Wikipedia "Harper, Liberia", johdanto-osa sekä osiot "Name", "Geography" ja '
      + '"Americo-Liberian period" (tarkistettu 6.9.2026).',
  },
  {
    id: 'robertsport',
    nimi: 'Robertsport',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka portugalilainen nimesi Cape Mountin?',
      'Mikä laji on tuonut kaupunkiin uusia kävijöitä?',
    ],
    korostukset: ['vai|vai-kansan'],
    nappi: 'Kalastajakylä Cape Mountin niemellä',
    // 11.3667 W / 6.75 N — en-Wikipedia "Robertsport"
    // Lähin pelikaupunki: Sierra Leone 80,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5454.4, y: 2986.2 },
    },
    teksti: 'Robertsport on Läntisen Liberian kaupunki noin kuudentoista kilometrin päässä '
      + 'Sierra Leonen rajasta, ja se on nimetty maan ensimmäisen presidentin Joseph Jenkins '
      + 'Robertsin mukaan. Se sijaitsee Cape Mountin niemellä, joka erottaa murtovetisen '
      + 'Piso-laguunin Atlantista. Portugalilainen merenkulkija Pedro de Sintra saapui '
      + '1400-luvun puolivälissä tuhat jalkaa korkealle graniittiniemelle ja nimesi sen Cabo do '
      + 'Monteksi. Hollantilaisten kauppapaikka jäi paikalla puolustuskyvyttömäksi eikä '
      + 'koskaan tullut omavaraiseksi. Liberian hallitus teki 1849 sopimuksen vai-kansan '
      + 'kanssa ja sai Cape Mountin alueen, ja Robertsport perustettiin 1856. Nykyään kylä '
      + 'elää kalastuksesta, mutta vuoden 2003 jälkeen sinne on syntynyt surffauskeskus: '
      + 'amerikkalaiset vieraat opettivat paikallisen Robert Lomaxin surffaamaan, ja hän '
      + 'opetti muita.',
    lahde: 'en-Wikipedia "Robertsport", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'buchanan',
    nimi: 'Buchanan',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä siirtokunta oli Buchananin paikalla 1832?',
      'Mistä Buchananin satamaan tulee rautamalmi?',
    ],
    korostukset: ['kveekari|kveekarit'],
    nappi: 'Rautamalmiradan pääte',
    // 10.0467 W / 5.8808 N — en-Wikipedia "Buchanan, Liberia"
    // Lähin pelikaupunki: Kap Palmas 109,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5498.4, y: 3015.2 },
    },
    teksti: 'Buchanan on Liberian kolmanneksi suurin kaupunki Waterhouse Bayn rannalla, '
      + 'Grand Bassan maakunnan pääkaupunki ja Saint Johnin joen suun tuntumassa. Nimi tulee '
      + 'Thomas Buchananista, Yhdysvaltain presidentin James Buchananin serkusta ja Liberian '
      + 'toisesta kuvernööristä. Joulukuussa 1832 paikalle perustivat mustat kveekarit '
      + 'New Yorkin ja Pennsylvanian siirtokuntaseuroista Port Cressonin siirtokunnan, jonka '
      + 'bassa-kansa hävitti 10. kesäkuuta 1835 kymmenen ihmisen kuollessa. Kuukautta '
      + 'myöhemmin perustettiin uusi siirtokunta Bassa Cove, joka liitettiin Liberiaan 1839. '
      + '1850-luvulla väkiluku ei kasvanut lainkaan omin voimin, sillä kuolemia oli enemmän '
      + 'kuin syntymiä. Kaupunki on 250 kilometriä pitkän radan pääte: rata tuo rautamalmia '
      + 'Nimban maakunnan Yekepan kaivoksilta.',
    lahde: 'en-Wikipedia "Buchanan, Liberia", johdanto-osa sekä osiot "History" ja "Economy" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'gbarnga',
    nimi: 'Gbarnga',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä yliopisto on Gbarngan lähellä?',
      'Milloin Bongin vuoriston rautamalmia louhittiin?',
    ],
    korostukset: ['Bong|Bongin'],
    nappi: 'Bongin maakunnan keskus',
    // 9.4751 W / 7.0005 N — en-Wikipedia "Gbarnga"
    // Lähin pelikaupunki: Kap Palmas 111,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5517.5, y: 2977.8 },
    },
    teksti: 'Gbarnga on Bongin maakunnan pääkaupunki Keski-Liberiassa Monroviasta koilliseen. '
      + 'Se on maakunnan hallinnollinen, kaupallinen ja koulutuksellinen keskus, ja aivan sen '
      + 'lähellä toimii Cuttingtonin yliopisto, episkopaalisen kirkon ylläpitämä yksityinen '
      + 'korkeakoulu. Vuoden 2022 väestölaskennan mukaan Bongin maakunnan kaupunkiväestö oli '
      + '149 772 henkeä, ja koko maakunnassa asui 467 561 ihmistä, mikä tekee siitä Liberian '
      + 'kolmanneksi väkirikkaimman. Kaupunki itse ei ole kaivoskaupunki, mutta maakunnassa '
      + 'on louhittu rautamalmia: Bongin vuoriston esiintymiä louhi Bong Mining Company '
      + 'vuosina 1965–1990, ja China Union Investment teki myöhemmin 25 vuoden '
      + 'kaivossopimuksen.',
    lahde: 'en-Wikipedia "Gbarnga", johdanto-osa sekä osiot "Demographics" ja "Economy and '
      + 'infrastructure" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bopolu',
    nimi: 'Bopolu',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä liiton keskus Bopolu oli?',
      'Mitä Bopolusta vaihdettiin suolaan ja kankaaseen?',
    ],
    korostukset: ['Kondo|Kondon'],
    nappi: 'Kondon liiton vanha keskus',
    // 10.4875 W / 7.0667 N — en-Wikipedia "Bopolu"
    // Lähin pelikaupunki: Sierra Leone 95,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5483.8, y: 2975.6 },
    },
    teksti: 'Bopolu on Gbarpolun maakunnan pääkaupunki sata kilometriä Monroviasta pohjoiseen. '
      + 'Vuoden 2008 laskennassa siellä asui 2 908 ihmistä. Kaupunki oli aikanaan Kondon '
      + 'liiton keskus, johon kuuluivat dei-, gola-, lorma- ja vai-kansat, ja seutu oli '
      + 'mahtavimmillaan kuningas Bosanin aikana. Kauppiaat lähettivät sieltä vaille ja '
      + 'deille orjia, norsunluuta, kultaa ja punapuuta ja saivat vastineeksi suolaa, '
      + 'tupakkaa, kiväärejä ja eurooppalaista kangasta. Nykyään Bopolun pääelinkeino on '
      + 'riisin ja kassavan viljely.',
    lahde: 'en-Wikipedia "Bopolu", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
