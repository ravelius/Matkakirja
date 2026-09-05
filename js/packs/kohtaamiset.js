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
   * LUONNOS 5.9.2026, Fable tarkistaa.
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
  },
  /*
   * LUONNOS 5.9.2026, Fable tarkistaa.
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
  },
  madrid: {
    hahmo: 'kirpputorikauppias Rosa',
    nappi: 'Tapaa kirpputorikauppias',
    frame: 'kirpputorikauppias Rosa pyyhkii pölyt kämmeneensä ja kysyy',
    tervehdys: 'El Rastron tungoksessa Rosa levittää huovalleen '
      + 'kelloja ja avaimia. Hän näkee kirjasi ja hymyilee: "Sen '
      + 'kirjan omistaja seisoi tässä. Osti äidiltäni '
      + 'messinkiavaimen eikä kertonut mihin oveen. Näytä että '
      + 'tunnet maailmaa kuten hän — kerron, mitä hän jätti tänne."',
    loyto: 'Rosa kaivaa huovan alta kuluneen postikortin: "Tämä '
      + 'jäi tänne. Katso, mitä kääntöpuolelle on kirjoitettu."',
    tyhja: 'Rosa kohauttaa harteitaan: "Joku ehti ennen sinua. '
      + 'Rastro tyhjenee ja täyttyy joka sunnuntai — tule takaisin."',
    vaarin: 'Rosa naurahtaa: "Ei vielä, hija. Täällä ei ole '
      + 'kiire — palaa kun tiedät enemmän."',
  },
  venetsia: {
    hahmo: 'gondolieeri Matteo',
    nappi: 'Tapaa gondolieeri',
    frame: 'gondolieeri Matteo nojaa airoonsa ja kysyy',
    tervehdys: 'Rialton laiturilla harmaantunut gondolieeri laskee '
      + 'aironsa nähdessään kirjasi. "Isoisäni souti tuon kirjan '
      + 'omistajaa halki laguunin ja puhui hänestä koko ikänsä. '
      + 'Näytä että tunnet maailmaa kuten hän — soudan sinut '
      + 'paikkaan, jota ei löydy kartoista."',
    loyto: 'Matteo ohjaa gondolin hiljaiselle syrjäkanavalle ja '
      + 'osoittaa airollaan: "Tässä. Isoisäsi jälki päättyy tähän — '
      + 'ja sinun alkaa."',
    tyhja: 'Matteo tutkii tyhjää kätköä ja hymähtää: "Joku ehti '
      + 'ensin. Mutta laguuni pitää monta salaisuutta — jatka '
      + 'matkaa."',
    vaarin: 'Matteo työntää gondolin takaisin virtaan: "Ei tänään, '
      + 'ystäväni. Palaa, kun tunnet maailman paremmin."',
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
  },
};
