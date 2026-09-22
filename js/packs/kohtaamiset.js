/*
 * Tarinalliset kohtaamiset (omistajan toive 5.8.2026): "Etsi kätkö"
 * ei ole irrallinen tietovisa vaan kohtaaminen — kaupungissa on
 * nimetty paikallinen hahmo, jonka kautta aarretehtävä aukeaa.
 *
 * Rakenne per kaupunki (avain = kaupunki-id):
 *
 *   hahmo     — hahmon nimi (esim. laukun ja lokien riveille)
 *   nappi     — saapumiskortin napin teksti ("Etsi kätkö" tilalle)
 *   frame     — visakortin otsikkorivi ("<hahmo> ... ja kysyy")
 *   tervehdys — kohtaamisen avaus; kirjoitetaan kortille ennen
 *               kysymystä ENSIMMÄISELLÄ kerralla (ui muistaa session)
 *   loyto     — hahmon repliikki, kun kätköstä löytyy jotain
 *   tyhja     — repliikki, kun kätkö on tyhjä
 *   vaarin    — repliikki väärästä vastauksesta
 *
 * Tunnetagit (11.9.2026, docs/pulu-reaktiot.md E2 kohta 2):
 * tunneTervehdys, tunneLoyto, tunneTyhja ja tunneVaarin ovat muotoa
 * { tunne, voimakkuus } ja kertovat, miten Livia reagoi kuhunkin
 * repliikkiin (js/livia-tilanteet.js LIVIAN_TUNTEET). Rekisteri sallii
 * kenttien puuttua — oletus tulisi silloin koodista — mutta omistajan
 * linjaus 11.9.2026 ("Pulu valmiiksi kaikissa pelitilanteissa") on
 * täysi kattavuus, joten kaikki neljä kenttää on kirjoitettu jokaiselle
 * kaupungille. Perustelu on kunkin kaupungin kommentissa.
 *
 * Tämä on esityskerros: pelimoottori ei tunne kohtaamisia, joten
 * vanhat tallennukset ja muut kaupungit toimivat ennallaan. Muut
 * kysymysmuodot (väittämä, valokuvaaja, tullimies, portti) pitävät
 * omat kehyshahmonsa — kohtaaminen koskee tavallista visaa.
 *
 * Kaupunki ilman riviä saa entisen satunnaisen kysyjän (ASKERS).
 *
 * Mitat (omistajan tarkennus 7.8.2026: "pitää kirjoittaa
 * lyhyemmiksi"): tervehdys enintään ~280 merkkiä, repliikit
 * (loyto/tyhja/vaarin) enintään ~130. Hahmon ääni ja isoisäkoukku
 * säilyvät — sanahelinä ei. Dekkarisävyä (docs/isoisan-raamattu.md)
 * saa käyttää sinne, minne se istuu luontevasti, mutta kohtaaminen
 * on ennen kaikkea lämmin hetki paikallisen kanssa.
 *
 * ROOLI 8.8.2026 (lehtirakenteen muutos, Opuksen muistio
 * työlistassa): kohtaaminen on kaupunkilehden PÄÄTEPISTE — "Tapaa
 * henkilö" -nappi näkyy vasta lehden viimeisellä sivulla, eli
 * pelaaja on lukenut 3–4 sivua ennen tervehdystä. Siksi:
 *  - Tervehdys EI esittele kaupunkia (lehti teki sen jo) eikä
 *    kertaa maamerkkejä (ne on käsitelty kartassa, nähtävyys-
 *    jutuissa ja aihesivuilla — tervehdys olisi neljäs kerta).
 *  - Valitse kulma, jota lehti ei kata: ihminen, ammatti, hetki,
 *    mielipide. Tervehdys saa viitata luettuun ("olet nähnyt sen
 *    kartalla" on nyt totta).
 *  - Mitat eivät muutu — sama merkkimäärä, henkilökohtaisempi
 *    sisältö.
 *
 * Luennat (omistajan rajaus 7.8.2026: "riittää vain alkutarinan
 * luenta … sekä sitten kun aarre löytyy … lyhyt pelaajan ja sen
 * toisen henkilön sananvaihto"): kaupungilla voi olla
 * tervehdysLuenta ja loytoLuenta — lista { rooli, teksti }-osia,
 * jotka ElevenLabsin text-to-dialogue lukee peräkkäin eri äänillä
 * (tools/generoi-kohtaamiset.mjs; roolien äänet siellä). Roolit:
 * 'kertoja', 'hahmo' (kaupungin paikallinen) ja 'pelaaja' (nuori
 * Fogg). Tekstin on vastattava ruudun tekstiä sanasta sanaan
 * tunnetageja ja ajatusviivoja lukuun ottamatta — talon sääntö,
 * sama kuin saapumisluennoissa. Luennallinen tervehdys pidetään
 * lyhyenä: ~140 merkkiä (omistaja 7.8.2026: "puolet lyhyempi"),
 * löytödialogi samaa luokkaa.
 * Tyhjä/väärin-repliikkejä EI lueta: ne tulevat vastauksen jälkeen,
 * kun pelaaja haluaa jo eteenpäin. Ääni soi vain, jos mp3 on
 * generoitu (sisaltotaulut.js: KOHTAAMISLUENNAT).
 */
export const KOHTAAMISET = {
  /*
   * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
   *
   * LONTOO: NED KORVATTU LEILALLA (kuvaputken tarinaehdotus 5.9.2026,
   * Fablen päätös klo 19:05 UTC: *"Molemmat Ned-versiot (kaari + vanha
   * KOHTAAMISET) poistuvat; fokusvirran Ned-viittaukset ja luennat
   * synkronoidaan"*). Kaaren teksti on js/tyohuone-kehitys-data.js:ssä
   * (KAARI_PAKETIT, 'lontoo'); tämä rivi antaa napin, kehysrivin ja
   * kolme repliikkiä.
   *
   * LUENNAT: tervehdysLuenta ja loytoLuenta on kirjoitettu uusiksi
   * sanasta sanaan uuden ruututekstin mukaan, JA 'lontoo' on poistettu
   * js/sisaltotaulut.js:n KOHTAAMISLUENNAT-joukosta, jottei vanha mp3
   * soi uusilla sanoilla. Rivi palautetaan sinne, kun
   * tools/generoi-kohtaamiset.mjs on ajettu uudestaan.
   *
   * REPLIIKIT ON SIDOTTU PELIN KÄTKÖTULOKSEEN (js/visa.js: loyto vain
   * kun quiz.explore tai quiz.found, muuten tyhja; vaarin väärästä
   * vastauksesta). Tyhjä ja väärin eivät siis lupaa löytöä.
   */
  lontoo: {
    hahmo: 'muotialan opiskelija Leila',
    nappi: 'Tapaa Leila',
    frame: 'Leila nostaa katseensa vanhasta katukuvasta ja kysyy',
    tervehdys: 'Leila vertaa kirjaasi puhelimensa kuvaan: "Tämä on sama '
      + 'kulma. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän '
      + 'mistä suunnasta sitä katsotaan."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Leila vertaa kirjaasi puhelimensa '
        + 'kuvaan:' },
      { rooli: 'hahmo', teksti: '[curious] "Tämä on sama kulma. '
        + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
        + 'näytän mistä suunnasta sitä katsotaan."' },
    ],
    loyto: 'Leila kuvaa rasian ennen kuin ojentaa sen: "Minä etsin tähän '
      + 'valoa. Sinä löysit jotain muuta." — "Ja minä olen jo myöhässä!"',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Leila kuvaa rasian ennen kuin ojentaa '
        + 'sen:' },
      { rooli: 'hahmo', teksti: '[softly] "Minä etsin tähän valoa. Sinä '
        + 'löysit jotain muuta."' },
      { rooli: 'pelaaja', teksti: '[excited] "Ja minä olen jo '
        + 'myöhässä!"' },
    ],
    tyhja: 'Leila kurkistaa syvennykseen: "Tyhjä. Tässä kulmassa kulkee '
      + 'tuhat ihmistä tunnissa — joku ehti ensin."',
    vaarin: 'Leila kääntää puhelimen takaisin itseensä päin: "Ei vielä. '
      + 'Minäkin palasin tähän kolmesti ennen kuin sain valon oikein."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: Leila vertaa
     * kuvakulmia eikä kerro isoisästä: "Tämä on sama kulma" on
     * uteliaisuutta, ei lämpöä (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.55 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
   *
   * DUBROVNIK JA ODESSA SAAVAT ENSIMMÄISTÄ KERTAA OMAN RIVIN. Syy on
   * Fablen linjaus 5.9.2026 klo 19:05 UTC: *"löytörepliikit sidotaan
   * pelin kätkötulokseen (tyhjä ja väärä vastaus saavat omat
   * repliikkinsä ilman löytölupausta)"*. Moottori lukee juuri nämä
   * kentät (js/visa.js renderQuiz: loyto | tyhja | vaarin), eikä
   * tarinakaaren paketissa ole niille paikkaa — ilman riviä
   * kaupungeissa ei olisi lainkaan repliikkiä tyhjälle kätkölle eikä
   * väärälle vastaukselle.
   *
   * TERVEHDYS EI NÄY KAAREN KOHTAAMISESSA: kaarikaupungissa visakortin
   * avaustekstin omistaa KAARI_PAKETIT-paketin `kohtaaminen`
   * (js/visa.js: kaariTarina voittaa). Tämän rivin tervehdys on siis
   * kaupungin MYÖHEMPIEN tavallisten visojen avaus, samoin kuin
   * Lontoossa, Venetsiassa ja Berliinissä.
   *
   * LUENTOJA EI OLE eikä niitä pidä lisätä ennen generointia:
   * js/sisaltotaulut.js KOHTAAMISLUENNAT ei sisällä näitä kaupunkeja,
   * joten löytödialogia ei yritetä soittaa.
   */
  dubrovnik: {
    hahmo: 'merimelontaopas Mara',
    nappi: 'Tapaa Mara',
    frame: 'Mara pitää kajakin paikoillaan ja kysyy',
    tervehdys: 'Mara kiertää kajakin köyden ranteensa ympäri ja katsoo '
      + 'kirjaasi. "Se on piirretty mereltä. Näytä että tunnet maailmaa '
      + 'kuten piirtäjä — niin viedään sinut samaan kohtaan."',
    loyto: 'Mara nostaa rasian melansa varteen: "Luulin meidän etsivän '
      + 'vain rantaa."',
    tyhja: 'Mara kääntää kiven takaisin paikalleen: "Tyhjä. Meri siirtää '
      + 'täällä kaiken, mikä ei ole kiinni kalliossa."',
    vaarin: 'Mara työntää kajakin irti kivestä: "Ei tänään. Ranta on '
      + 'huomennakin samassa paikassa."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: "Se on piirretty
     * mereltä … niin viedään sinut samaan kohtaan" — mereltä piirretty kuva
     * ja käytännön ehdotus (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  odessa: {
    hahmo: 'torimyyjä Iryna',
    nappi: 'Tapaa Iryna',
    frame: 'Iryna vetää melonin turvaan ja kysyy',
    tervehdys: 'Iryna pyyhkii kätensä esiliinaan ja ottaa kirjan '
      + 'varovasti kuin munakennon. "Vanhaa paperia. Näytä että tunnet '
      + 'maailmaa kuten sen kirjoittaja — niin luen mitä tässä lukee."',
    loyto: 'Iryna työntää rasian tiskin yli: "Solomiia, kirjoita ylös. '
      + 'Tämä ei ole päivän oudoin kauppa, mutta lähellä."',
    tyhja: 'Iryna laskee kynnyskiven takaisin: "Tyhjä. Tori on vanha, ja '
      + 'täällä on siivottu monta kertaa."',
    vaarin: 'Iryna kääntää kuitin oikein päin: "Ei vielä. Paperi ei mene '
      + 'mihinkään, ja minä olen tässä huomennakin."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: "Vanhaa paperia" ja
     * kirja käsissä "varovasti kuin munakenno" — oletusarvo osuu (rekisterin
     * poikkeustaulukko vahvistaa sen).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  kairo: {
    hahmo: 'kirjakauppias Faruk',
    nappi: 'Tapaa kirjakauppias',
    frame: 'kirjakauppias Faruk kohentaa lasejaan ja kysyy',
    tervehdys: 'Khan el-Khalilin kujalla kirjakauppias laskee '
      + 'teelasinsa ja tuijottaa kirjaasi. "Tuo kirja on käynyt '
      + 'puodissamme ennenkin — isäni myi sen omistajalle kartan, '
      + 'jota ei ollut muilla. Näytä että tunnet maailmaa kuten hän, '
      + 'niin kerron minne kartta johti."',
    loyto: 'Faruk levittää kellastuneen kartan tiskille: "Isoisäsi '
      + 'merkitsi tämän itse — katso, mitä hän jätti sinulle."',
    tyhja: 'Faruk pudistaa päätään: "Joku on käynyt ennen sinua. '
      + 'Mutta basaarissa mikään ei katoa lopullisesti."',
    vaarin: 'Faruk sulkee kirjansa pehmeästi: "Ei vielä, ystäväni. '
      + 'Tee odottaa silloinkin."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: ainoa tervehdys,
     * joka nimeää isoisän kirjan ja "kartan, jota ei ollut muilla"
     * (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'jannitys', voimakkuus: 0.6 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  tukholma: {
    hahmo: 'höyrylaivan konemestari Elsa',
    nappi: 'Tapaa konemestari',
    frame: 'konemestari Elsa pyyhkii kätensä trasseliin ja kysyy',
    tervehdys: 'Strömkajenin höyrylaivan konehuoneesta nousee '
      + 'konemestari, joka katsoo kirjaasi ja nyökkää: "Tuon kirjan '
      + 'omistaja matkusti tällä laivalla. Isoisäni muisti hänet: '
      + 'mies kysyi koneesta enemmän kuin maisemasta. Näytä että '
      + 'tunnet maailmaa kuten hän — kerron, mihin saareen hän jäi."',
    loyto: 'Elsa nostaa penkin alta pellisen öljykannun: "Tämä on '
      + 'ollut laivalla kauemmin kuin minä. Katso, mitä pohjaan on '
      + 'raapustettu."',
    tyhja: 'Elsa katsoo tyhjää lokeroa: "Joku ehti ensin. Meri '
      + 'liikuttaa tavaraa, ei vain vettä — tule takaisin, kun laiva '
      + 'palaa."',
    vaarin: 'Elsa naurahtaa: "Ei vielä. Koneen kanssa on sama '
      + 'juttu: opettele ensin, painele vasta sitten."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: "mies kysyi koneesta
     * enemmän kuin maisemasta" — konemestari arvostaa asiantuntijaa
     * (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'ylpea', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * LUONNOS 5.9.2026, Fable tarkistaa.
   *
   * KAKSOISHENKILÖT PURETTU: MADRID JA VENETSIA. Molemmilla
   * kaupungeilla oli kaksi eri kohtaamishenkilöä — tässä tiedostossa
   * kirpputorikauppias Rosa ja gondolieeri Matteo, tarinakaaressa ja
   * fokusvirrassa kellomestari Pilar ja naamiontekijä Lucia. Fablen
   * päätös 5.9.2026 klo 20:05 UTC: *"Madridin (Rosa vs. Pilar) sekä
   * Venetsian (Matteo vs. Lucia) kaksoishenkilöt — kaaren henkilö
   * (Pilar, Lucia) voittaa."* Rivit on siis kirjoitettu uusiksi
   * kaaren henkilöille; Rosa ja Matteo poistuvat pelistä kokonaan.
   *
   * SAMALLA POISTUI KAKSI KAANONIRIKETTÄ. Rosan tervehdys väitti, että
   * kirjan omistaja osti hänen äidiltään messinkiavaimen, ja Matteon
   * tervehdys, että hänen isoisänsä souti Horatiota laguunin halki ja
   * puhui hänestä koko ikänsä. Kukaan nykyihminen ei tunnista
   * Horatiota eikä odota perillistä (docs/isoisan-raamattu.md).
   *
   * TERVEHDYS EI NÄY KAAREN KOHTAAMISESSA: kaarikaupungissa visakortin
   * avaustekstin omistaa KAARI_PAKETIT-paketin `kohtaaminen`
   * (js/visa.js: kaariTarina voittaa). Näiden rivien tervehdys on siis
   * kaupungin MYÖHEMPIEN tavallisten visojen avaus, ja repliikit
   * (loyto / tyhja / vaarin) luetaan tästä joka kerta.
   *
   * REPLIIKIT ON SIDOTTU PELIN KÄTKÖTULOKSEEN (js/visa.js: loyto vain
   * kun quiz.explore tai quiz.found, muuten tyhja; vaarin väärästä
   * vastauksesta). Tyhjä ja väärin eivät lupaa löytöä.
   *
   * LUENNAT: js/sisaltotaulut.js KOHTAAMISLUENNAT on tyhjä joukko,
   * eikä madridille tai venetsialle ole tervehdysLuenta- tai
   * loytoLuenta-kenttiä, joten vanhoja ääniä ei ole soimassa uusilla
   * sanoilla. Jos Fable tilaa näille luennat, tools/generoi-
   * kohtaamiset.mjs tarvitsee myös HAHMOT-rivin kummallekin (Pilar
   * ~55 v, Lucia ~45 v).
   */
  madrid: {
    hahmo: 'kellomestari Pilar',
    nappi: 'Tapaa Pilar',
    frame: 'Pilar nostaa katseensa kellokoneistosta ja kysyy',
    tervehdys: 'Pilar pyyhkii öljyn sormistaan ja nostaa kämmenensä '
      + 'pystyyn. "Odota. Ensin kerrot, mistä sait tuon kirjan. Näytä '
      + 'että tunnet maailmaa kuten sen piirtäjä — sitten puhutaan."',
    loyto: 'Pilar ojentaa rasian koneiston takaa: "Tämä on ollut täällä '
      + 'kauemmin kuin minä. Ja minä olen ollut kauan."',
    tyhja: 'Pilar sulkee huoltoluukun: "Tyhjä. Tässä tornissa käydään '
      + 'joka viikko, ja on käyty kauan."',
    vaarin: 'Pilar kääntyy takaisin koneiston puoleen: "Ei vielä. Kello '
      + 'ei kiirehdi, enkä minäkään."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: "Odota. Ensin
     * kerrot, mistä sait tuon kirjan." — epäluulo, ei lämpö (rekisterin
     * poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'miettiva', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  venetsia: {
    hahmo: 'naamiontekijä Lucia',
    nappi: 'Tapaa Lucia',
    frame: 'Lucia kääntyy naamioiden äärestä ja kysyy',
    tervehdys: 'Lucia laskee keskeneräisen naamion pöydälle ja pyyhkii '
      + 'liidun sormistaan. "Vieraita tulee yleensä vain karnevaaleina. '
      + 'Näytä että tunnet maailmaa kuten kirjasi piirtäjä — niin avaan '
      + 'tilauskirjan."',
    loyto: 'Lucia työntää rasian pöydän yli kahdella sormella: "Tämä '
      + 'palautettiin pajaan. Kukaan ei sanonut kenen se on."',
    tyhja: 'Lucia kääntää tyhjän laatikon ylösalaisin: "Ei mitään. Vesi '
      + 'käy täällä kaikessa, myös kätköissä."',
    vaarin: 'Lucia palaa naamionsa ääreen: "Ei tänään. Cartapesta kuivuu '
      + 'hitaasti, ja niin kuivuu tietokin."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: Venetsia on Livian
     * rakkauskohtaus; matalampi kuin albumissa, koska kohtaaminen on eri
     * hetki (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'rakkaus', voimakkuus: 0.55 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  berliini: {
    hahmo: 'posetiivari Otto',
    nappi: 'Tapaa posetiivari',
    frame: 'posetiivari Otto pysäyttää kammen ja kysyy',
    tervehdys: 'Hackescher Marktilla posetiivarin kampi pysähtyy, '
      + 'kun hän näkee kirjasi. "Isoisäni soitti tätä laatikkoa '
      + 'Unter den Lindenillä, ja muuan matkalainen tuon kirjan '
      + 'kanssa kuunteli rullan loppuun ja kysyi sitten tietä. Näytä '
      + 'että tunnet maailmaa kuten hän — kerron, minne häntä '
      + 'neuvottiin."',
    loyto: 'Otto avaa posetiivin takaa pienen nuottirullaluukun: '
      + '"Tämä on odottanut kauan. Isoisäsi jätti sen soittajan '
      + 'haltuun — katso itse."',
    tyhja: 'Otto sulkee luukun: "Tyhjä. Tätä kaupunkia on purettu '
      + 'ja rakennettu niin monesti, että kätköt vaihtavat paikkaa."',
    vaarin: 'Otto tarttuu kampeen: "Ei vielä, nuori ystävä. '
      + 'Laatikkokin oppi sävelensä rulla kerrallaan."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: posetiivi ja isoisän
     * muisto samassa repliikissä — lämpimin tervehdys (rekisterin poikkeus).
     *
     * Repliikkien tagit ovat rekisterin oletukset ja istuvat sanoihin: löytö
     * on pelin suuri hetki (ilo 0,7), "Tyhjä…" jää pohtimaan eikä moiti
     * oikeaa vastausta (miettiva 0,45) ja väärä vastaus saa lohduttavan "Ei
     * vielä" (hammentynyt 0,4).
     */
    tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.6 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Ateena ON tarinakaaren (KAARI_PAKETIT id
   * 'ateena') kaupunki, jonka kaaren kohtaaminen on eri hahmo,
   * marmorikonservaattori Dafni Akropoliin restaurointityömaalla
   * (js/packs/fokusvirta-ateena.js) — tämän rivin tervehdys on
   * kaupungin MYÖHEMPIEN visojen avaus, sama rakenne kuin Roomassa
   * (Enzo/Fabrizio). Vanha kilpaileva kuvakonsepti "Nikos" on
   * kanonisesti korvattu Dafnilla eikä kelpaa tähän riviin. 1873-
   * fakta: nykyinen marmorinen Panathinaikoksen stadion (Kallimarmaro)
   * valmistui vasta 1895-96 — isoisän aikaan 1873 paikalla oli vasta
   * Zillerin 1869-70 maastokaivaus (en-Wikipedia "Panathenaic
   * Stadium", "Zappas Olympics", tarkistettu 22.9.2026).
   */
  ateena: {
    hahmo: 'juoksuvalmentaja Iason',
    nappi: 'Tapaa Iason',
    frame: 'Iason pysäyttää sekuntikellon ja kysyy',
    tervehdys: 'Iason pysäyttää sekuntikellonsa portailla: "Isoisäsi '
      + 'aikaan täällä ei ollut edes marmoria, saati maalilinjaa. '
      + 'Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä '
      + 'hän ei vielä nähnyt."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Iason pysäyttää sekuntikellonsa '
        + 'portailla:' },
      { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan täällä ei '
        + 'ollut edes marmoria, saati maalilinjaa. [warmly] Näytä '
        + 'että tunnet maailmaa kuten piirtäjä — niin kerron, mitä '
        + 'hän ei vielä nähnyt."' },
    ],
    loyto: 'Iason nostaa rasian portaan raosta pysäyttämättä kelloa: '
      + '"Tämä on ollut täällä pidempään kuin ratani. Löytö voittaa '
      + 'hyvän ajan."',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Iason nostaa rasian portaan raosta '
        + 'pysäyttämättä kelloa:' },
      { rooli: 'hahmo', teksti: '[curious] "Tämä on ollut täällä '
        + 'pidempään kuin ratani. [excited] Löytö voittaa hyvän '
        + 'ajan."' },
    ],
    tyhja: 'Iason koputtaa porrasta kengällään: "Tyhjä. Nämä kivet on '
      + 'nostettu ja siirretty niin monesti, ettei mikään pysy '
      + 'paikoillaan."',
    vaarin: 'Iason katsoo kelloaan: "Ei vielä. Kierrä radan verran ja '
      + 'mieti uudestaan."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Kaikki neljä rekisterin
     * oletukset — Iason kiinnostuu vanhasta kirjasta kesken
     * harjoituksen, ei vielä lämmin.
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Kuva jo hyväksytty (js/kohtaamiskuvat-data.js
   * budapest-marta-kylpyla-a, tila 'tarkistettu', ei aktiivinen:false)
   * — toinen Budapest-rivi (aiti-tytar-smoothie) on aktiivinen:false
   * eikä käytössä. docs/kuvatuotanto-kohtaamiset.md:n taulukon "Márta
   * ja tytär Réka" on dokumentaatiovirhe (sekoittaa kaksi eri
   * konseptia) — korjattava. 1873-fakta: Budapest syntyi virallisesti
   * 17.11.1873 kun Buda, Pest ja Óbuda yhdistyivät — täsmälleen
   * isoisän matkavuosi (en-Wikipedia "Budapest", "History of
   * Budapest").
   */
  budapest: {
    hahmo: 'kylpylänvartija Márta',
    nappi: 'Tapaa Márta',
    frame: 'Márta nojaa kylpylän porttiin ja kysyy',
    tervehdys: 'Márta nojaa Széchenyin kylpylän porttiin '
      + 'sulkemisaikaan, kädet puuskassa: "Isoisäsi kirja puhuu '
      + 'varmaan Budasta ja Pestistä kahtena eri kaupunkina. Näytä '
      + 'että tunnet maailmaa kuten piirtäjä — niin kerron, milloin '
      + 'niistä tuli yksi."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Márta nojaa Széchenyin kylpylän '
        + 'porttiin sulkemisaikaan, kädet puuskassa:' },
      { rooli: 'hahmo', teksti: '[curious] "Isoisäsi kirja puhuu '
        + 'varmaan Budasta ja Pestistä kahtena eri kaupunkina. '
        + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
        + 'kerron, milloin niistä tuli yksi."' },
    ],
    loyto: 'Márta ojentaa rasian höyryn läpi: "Tämä lojui kylpylän '
      + 'kellarissa vuosikymmeniä. Kolme kaupunkia, yksi rasia — '
      + 'sopivaa, eikö?"',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Márta ojentaa rasian höyryn läpi:' },
      { rooli: 'hahmo', teksti: '[warmly] "Tämä lojui kylpylän '
        + 'kellarissa vuosikymmeniä. [excited] Kolme kaupunkia, yksi '
        + 'rasia — sopivaa, eikö?"' },
    ],
    tyhja: 'Márta pudistaa päätään altaan reunalla: "Tyhjä. Kylpylää '
      + 'on remontoitu niin monesti, ettei mikään pysy paikallaan."',
    vaarin: 'Márta virnistää ja ravistaa vettä käsistään: "Ei vielä. '
      + 'Höyry hämärtää näön — kokeile toista kulmaa."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: Márta testaa
     * tulijaa kädet puuskassa ja virnistäen — sama uteliaan haastava
     * rekisterin poikkeus kuin Leilalla/Colettella. Muut kolme
     * rekisterin oletukset.
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.55 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Ei aiempaa kuvamateriaalia — kokonaan uusi
   * hahmo, uusi Codex-tilaus. 1873-fakta: Firenze oli Italian
   * kuningaskunnan väliaikainen pääkaupunki 1865-1871 (Torinon
   * jälkeen), asema siirtyi Roomaan heinäkuussa 1871 kun Rooma oli
   * liitetty Italiaan syyskuussa 1870 — isoisän 1873-matka osui vain
   * kaksi vuotta muutoksen jälkeen (yleisesti tunnettu Italian
   * yhdistymishistorian fakta). Fablen korjaus 22.9.2026: tervehdys
   * ei väitä kaupunkia yhä pääkaupungiksi (väärin — se oli JO
   * menettänyt asemansa) ja käyttää vakiokaavaa "kuten piirtäjä".
   */
  firenze: {
    hahmo: 'kultaseppä Ilaria',
    nappi: 'Tapaa Ilaria',
    frame: 'Ilaria nostaa katseensa suurennuslasin takaa ja kysyy',
    tervehdys: 'Ilaria nostaa katseensa suurennuslasin takaa: '
      + '"Isoisäsi näki kaupungin, joka oli juuri menettänyt '
      + 'pääkaupungin arvonsa Roomalle — puoli kaupunkia oli vielä '
      + 'muutosta poissa tolaltaan. Näytä että tunnet maailmaa kuten '
      + 'piirtäjä — niin kerron, mikä ikkunan takana ei ole muuttunut."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Ilaria nostaa katseensa '
        + 'suurennuslasin takaa:' },
      { rooli: 'hahmo', teksti: '[curious] "Isoisäsi näki kaupungin, '
        + 'joka oli juuri menettänyt pääkaupungin arvonsa Roomalle — '
        + 'puoli kaupunkia oli vielä muutosta poissa tolaltaan. '
        + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
        + 'kerron, mikä ikkunan takana ei ole muuttunut."' },
    ],
    loyto: 'Ilaria pyyhkii rasian liinalla ennen kuin ojentaa sen: '
      + '"Tämä on ollut lukossa kauemmin kuin minä olen elänyt. Nyt '
      + 'se aukeaa!"',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Ilaria pyyhkii rasian liinalla '
        + 'ennen kuin ojentaa sen:' },
      { rooli: 'hahmo', teksti: '[softly] "Tämä on ollut lukossa '
        + 'kauemmin kuin minä olen elänyt. [excited] Nyt se aukeaa!"' },
    ],
    tyhja: 'Ilaria kääntää vanhan laatikon ylösalaisin: "Tyhjä. Tässä '
      + 'työpajassa on siivottu satakunta kertaa isoisäni jälkeen."',
    vaarin: 'Ilaria laskee suurennuslasin pöydälle: "Ei vielä. Kulta '
      + 'ei paljasta itseään kiireessä, eikä tämäkään."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Kaikki neljä rekisterin
     * oletukset — Ilaria on kiinnostunut kirjasta ja sen
     * vanhentuneesta tiedosta, ei vielä lämmin eikä varautunut.
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Kuva jo hyväksytty (js/kohtaamiskuvat-data.js
   * lissabon-ines-round2-r20260905-v1, tila 'tarkistettu' — vanhempi
   * lissabon-ines-laattapaja on aktiivinen:false). 1873-fakta:
   * Lissabonin ensimmäinen hevosraitiolinja (Carris) avattiin
   * 17.11.1873; pelin kaanon (fokusvirta-lissabon.js) sijoittaa
   * isoisän käynnin lokakuuhun 1873 eli ennen linjan avaamista
   * (en-Wikipedia "Trams in Lisbon", tarkistettu 22.9.2026).
   */
  lissabon: {
    hahmo: 'laattamaalari Inês',
    nappi: 'Tapaa Inês',
    frame: 'Inês nostaa laatan kuivaustelineeltä ja kysyy',
    tervehdys: 'Inês nostaa laatan kuivaustelineeltä ja vilkaisee '
      + 'kirjaasi. "Isoisäsi aikaan täällä kuljettiin vielä jalan — '
      + 'hevosraitiovaunu avattiin vasta saman syksyn marraskuussa. '
      + 'Näytä että tunnet maailmaa kuten piirtäjä, niin kerron mistä '
      + 'laatta löytyy."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Inês nostaa laatan '
        + 'kuivaustelineeltä ja vilkaisee kirjaasi:' },
      { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan täällä '
        + 'kuljettiin vielä jalan — hevosraitiovaunu avattiin vasta '
        + 'saman syksyn marraskuussa. [warmly] Näytä että tunnet '
        + 'maailmaa kuten piirtäjä, niin kerron mistä laatta löytyy."' },
    ],
    loyto: 'Inês nostaa rasian uunin vierestä: "Tämä oli laatan alla '
      + 'vuosia. Kukaan ei koskaan kysynyt, miksi se kuvio oli vino."',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Inês nostaa rasian uunin vierestä:' },
      { rooli: 'hahmo', teksti: '[softly] "Tämä oli laatan alla '
        + 'vuosia. [amused] Kukaan ei koskaan kysynyt, miksi se kuvio '
        + 'oli vino."' },
    ],
    tyhja: 'Inês pyyhkii hyllyn tyhjäksi: "Ei mitään. Pajaa on '
      + 'siirretty kahdesti tulipalon jälkeen."',
    vaarin: 'Inês kääntää laatan takaisin telineelle: "Ei vielä. Savi '
      + 'kuivuu hitaasti, ja niin kuivuu tietokin."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Kaikki neljä rekisterin
     * oletukset — Inês toteaa historiallisen faktan ja esittää
     * käytännön pyynnön mitattoman rauhallisesti.
     */
    tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Sofia ON tarinakaaren (KAARI_PAKETIT id
   * 'sofia') kaupunki, jonka kaaren hahmo on jo lähteenvartija Nadia
   * mineraalilähteellä (kuva sofia-nadia-mineraalilahde-v2.jpg, tila
   * 'tarkistettu') — koodikommentti js/kohtaamiskuvat-data.js:ssä
   * vahvistaa suoraan "pelin kohtaamiskortille menee Sofiassa Nadia".
   * Tämä rivi on siis SAMA hahmo (poikkeaa Rooma/Ateena-mallista,
   * koska kaupungilla ei ole erillistä toista kuvakonseptia) — kaupungin
   * MYÖHEMPIEN visojen avaus. 1873-fakta: Sofia oli 1873 yhä osaa
   * Osmanien valtakuntaa; kaupungin kuumat mineraalilähteet olivat jo
   * tuolloin arkikäytössä osmanien hamamissa (en-Wikipedia "Banya
   * Bashi Mosque", "Sofia Central Mineral Baths", tarkistettu
   * 22.9.2026) — neutraali, ei osmanikauden sortohuomautuksia.
   */
  sofia: {
    hahmo: 'lähteenvartija Nadia',
    nappi: 'Tapaa Nadia',
    frame: 'Nadia kääntyy lähteeltä kauhaa käsissään ja kysyy',
    tervehdys: 'Nadia laskee kauhansa altaan reunalle ja vilkaisee '
      + 'vanhaa vihkoasi. "Tämä vesi kupli täällä jo isoisäsi aikaan, '
      + 'kun kaupunki kuului vielä toiselle valtakunnalle. Näytä että '
      + 'tunnet maailmaa kuten piirtäjä — niin kerron, mitä lähde '
      + 'muistaa."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Nadia laskee kauhansa altaan '
        + 'reunalle ja vilkaisee vihkoasi:' },
      { rooli: 'hahmo', teksti: '[curious] "Tämä vesi kupli täällä jo '
        + 'isoisäsi aikaan, kun kaupunki kuului vielä toiselle '
        + 'valtakunnalle. [warmly] Näytä että tunnet maailmaa kuten '
        + 'piirtäjä — niin kerron, mitä lähde muistaa."' },
    ],
    loyto: 'Nadia nostaa rasian kauhan vierestä: "Tämä on täyttynyt '
      + 'höyryssä vuosia. Kukaan ei tullut hakemaan sitä."',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Nadia nostaa rasian kauhan '
        + 'vierestä:' },
      { rooli: 'hahmo', teksti: '[softly] "Tämä on täyttynyt höyryssä '
        + 'vuosia. [surprised] Kukaan ei tullut hakemaan sitä."' },
    ],
    tyhja: 'Nadia kääntää tyhjän kauhan ylösalaisin: "Ei mitään. '
      + 'Höyry vie täältä yhtä paljon kuin vesi tuo."',
    vaarin: 'Nadia täyttää kannun uudelleen: "Ei vielä. Lähde ei '
      + 'ehdy — voit tulla kysymään huomennakin."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: Nadia on
     * lämmin heti alusta, sama linja kuin kaaren omassa
     * tunneKohtaaminen-arvossa (jatkuvuus hahmon äänessä). Muut kolme
     * rekisterin oletukset.
     */
    tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.5 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
  /*
   * Erä C2 (22.9.2026). Ainoa olemassa oleva Kööpenhamina-kuva (Freja,
   * Tivolin karuselli) on jo hyväksytty kaupungin KAARI-kohtaamiseen
   * (js/packs/fokusvirta-kobenhavn.js) — tämä rivi on siis kokonaan
   * uusi hahmo ja paikka, ei Tivoli, uusi Codex-tilaus tarvitaan.
   * 1873-fakta: polkupyörä oli 1870-luvulla Euroopassa vielä
   * harvinainen, kallis muotivempain varakkaille nuorille miehille —
   * arkinen käyttö ja Kööpenhaminan maine pyöräilykaupunkina tulivat
   * vasta vuosikymmeniä myöhemmin (Cycling Embassy of Denmark
   * "Danish cycling history", tarkistettu 22.9.2026; ei löytynyt
   * tarkkaa vuotta polkupyörän saapumiselle kaupunkiin, joten fakta
   * on rajattu yleiseen 1870-luvun ilmiöön).
   */
  kobenhavn: {
    hahmo: 'pyörämekaanikko Sofie',
    nappi: 'Tapaa Sofie',
    frame: 'Sofie kääntää lastipyörän kyljelleen ja kysyy',
    tervehdys: 'Sofie pyyhkii rasvaiset kädet farkkuihin ja vilkaisee '
      + 'kirjaasi: "Isoisäsi aikaan tuollainen kahden pyörän härveli '
      + 'oli kallis muotileikki harvoille herroille. Nyt koko '
      + 'kaupunki kulkee näillä. Näytä että tunnet maailmaa kuten '
      + 'piirtäjä — niin katson mitä rungosta löytyy."',
    tervehdysLuenta: [
      { rooli: 'kertoja', teksti: 'Sofie pyyhkii rasvaiset kädet '
        + 'farkkuihin ja vilkaisee kirjaasi:' },
      { rooli: 'hahmo', teksti: '[amused] "Isoisäsi aikaan tuollainen '
        + 'kahden pyörän härveli oli kallis muotileikki harvoille '
        + 'herroille. [warmly] Nyt koko kaupunki kulkee näillä. '
        + '[curious] Näytä että tunnet maailmaa kuten piirtäjä — niin '
        + 'katson mitä rungosta löytyy."' },
    ],
    loyto: 'Sofie kaivaa rasian satulatuesta ja hymyilee: "Tämä on '
      + 'odottanut täällä kauemmin kuin yksikään rengas kestää."',
    loytoLuenta: [
      { rooli: 'kertoja', teksti: 'Sofie kaivaa rasian satulatuesta '
        + 'ja hymyilee:' },
      { rooli: 'hahmo', teksti: '[surprised] "Tämä on odottanut '
        + 'täällä kauemmin kuin yksikään rengas kestää."' },
    ],
    tyhja: 'Sofie koputtaa runkoa ja pudistaa päätään: "Tyhjä. Tätä '
      + 'pyörää on korjattu ja osista koottu niin monesti."',
    vaarin: 'Sofie kiristää pultin uudelleen: "Ei ihan. Minäkin '
      + 'arvasin väärin, ennen kuin opin katsomaan runkonumerosta."',
    /*
     * Tunnetagit (docs/pulu-reaktiot.md E2). Tervehdys: Sofie ei ole
     * vain utelias kirjasta vaan lämpimän huvittunut vanhan ja
     * nykyisen kontrastista — poikkeaa rekisterin oletuksesta samalla
     * tavalla kuin Kemal/Otto. Muut kolme rekisterin oletukset.
     */
    tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.55 },
    tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 },
    tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 },
    tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 },
  },
};
