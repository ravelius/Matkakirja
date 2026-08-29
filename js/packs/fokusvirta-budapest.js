/*
 * BUDAPESTIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Attilan hauta-aarre (aarremerkintä).
 *
 * FAKTAPOHJA. Aalto 2:n maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä: pelin omasta kuratoidusta aineistosta
 * (js/packs/kulttuuri-kategoriat.js budapest, js/packs/
 * maa-kategoriat.js HUN, js/packs/nahtavyysjutut.js budapest,
 * js/packs/fokuskohteet-hun.js) sekä Wikipedian rajapinnasta
 * 29.8.2026 haetuista lisätiedoista, joista jokainen on katsottu
 * KAHDESTA riippumattomasta lähteestä. Lähteet on nimetty kunkin
 * kohdan omassa kommentissa.
 *
 * ── BUDAPEST ON KAUPUNKI, JOKA SYNTYI ISOISÄN MATKAVUONNA ──────────
 *
 * Buda, Óbuda ja Pest yhdistettiin 17. marraskuuta 1873 — sinä samana
 * vuonna, jolta koko matkapäiväkirja on. Kaanoninen merkintä nojaa
 * juuri siihen (*"Saavuin kaupunkiin, jota ei vielä eilen ollut"*),
 * joten päivämäärä on tämän paketin selkäranka: se määrää paikkarivin
 * kuukauden, oppitunnin aiheen ja kohtaamisen kysymyksen.
 *
 * ── ELÄINTÄKYÄ EI OLE, JA SE ON HARKITTU ───────────────────────────
 *
 * Raamattu toivoo täkyihin myös eläinjuttuja. Budapestin luontevin
 * eläinaihe olisi Tiszan päivänkorento, mutta se on jo pelissä
 * kokonaisena nostona (js/packs/maa-kategoriat.js, HUN/luonto, "Joki
 * kukkii kesäkuussa"), ja sama juttu kahdessa paikassa lukisi
 * huonommin kuin uusi. Aallon 2 eläintäyt ovat siksi Lontoossa
 * (Richmond Parkin hirvet), Dubrovnikissa (Lokrumin riikinkukot) ja
 * Prahassa (Przewalskin hevoset).
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero.
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ÄÄNITE: luenta generoitiin 29.8.2026 ja matkakirja.aanite osoittaa
 * siihen. Teksti ja luenta sanasta sanaan samat — tekstimuutos vaatii
 * uuden generoinnin.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions). Ihmisiä sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Tanssitalokysymys on Budapestin lehden
 * sivun 2 ("Musiikki") oman noston "Tanssitalo alkoi yhdestä illasta"
 * tekstiä ja Anonymus-kysymys sivun 1 ("Budapest") oman noston
 * "Patsas, jolle ei tehty kasvoja" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SILTAKYSYMYSTÄ: kaupungin laattakysymys koskee Ketjusiltaa
 * (ks. KOHTAAMINEN alempana). Jos lehden aarteen avaava tehtävä
 * kysyisi samasta sillasta, aarrekysymys olisi ratkaistu ennen kuin
 * Márta on tavattu.
 */
const TANSSITALO_VISA = {
  kysymys: 'Vuonna 1972 muutama budapestilainen soittaja järjesti illan, '
    + 'jossa kansantanssia ei katsottu lavalta vaan tanssittiin itse. '
    + 'Miten liikettä alettiin kutsua?',
  vaihtoehdot: [
    'Táncház eli tanssitalo',
    'Csárdás eli kapakkatanssi',
    'Cimbalom eli soittolava',
  ],
  oikea: 0,
  fakta: 'Soittajat istuvat nurkassa, opettaja näyttää askeleet ja loput '
    + 'opitaan kädestä pitäen. Sävelmät oli kerätty kyliin, joissa vanhat '
    + 'soittajat vielä muistivat ne ulkoa. Unesco nosti liikkeen '
    + 'mallikelpoisten suojelutapojen luetteloon vuonna 2011.',
};

const ANONYMUS_VISA = {
  kysymys: 'Budapestin Anonymus-patsaan kasvot jäivät tahallaan hupun '
    + 'varjoon. Miksi?',
  vaihtoehdot: [
    'Kukaan ei tiedä, kuka kronikan kirjoitti',
    'Kuvanveistäjä kuoli kesken työn',
    'Patsas oli tarkoitettu peitettäväksi talveksi',
  ],
  oikea: 0,
  fakta: 'Unkarin vanhimman kronikan kirjoittaja kutsui itseään vain '
    + 'kirjaimella P. ja kuninkaan notaariksi. Miklós Ligeti veisti '
    + 'patsaan 1903, ja sen kynä on kulunut kiiltäväksi, koska sitä '
    + 'käydään koskettamassa onnen toivossa.',
};

export const FOKUSVIRTA_BUDAPEST = {
  kaupunki: 'budapest',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi seuraa merkinnän omaa
     * faktaa: kaupunkia "ei vielä eilen ollut", ja yhdistyminen astui
     * voimaan 17. marraskuuta 1873 (ks. oppitunti). Sääkommentti on
     * isoisän havainto, ei mitattu väite.
     */
    paikkarivi: 'Budapest, marraskuussa 1873. Harmaata; joelta nousee '
      + 'kylmä tuuli.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Saavuin kaupunkiin, jota ei vielä eilen ollut: Buda, Óbuda '
      + 'ja Pest liitettiin yhteen, ja nimi on nyt Budapest. '
      + 'Kartantekijöille riittää töitä. Tonavan rannalla vanha mies '
      + 'sanoi, että uusi nimi tai ei — joki muistaa kaiken.',
    luenta: '[curious] Saavuin kaupunkiin, jota ei vielä eilen ollut: '
      + 'Buda, Óbuda ja Pest liitettiin yhteen, ja nimi on nyt Budapest. '
      + '[laughs] Kartantekijöille riittää töitä. [softly] Tonavan '
      + 'rannalla vanha mies sanoi, että uusi nimi tai ei — [whispers] '
      + 'joki muistaa kaiken.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-budapest.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — PARIPERIAATE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ"): merkintä on kevyt ja utelias, ei synkkä, joten
     * Livia saa naljailla ja mainita herkun. Kirjekyyhkylle
     * kaupunginnimen vaihtuminen on ammattiasia, ja siitä syntyy vitsi.
     *
     * FAKTAKURI: neljä väitettä, kaikki tarkistettavia. (1) Yhdistetyn
     * kaupungin neuvosto kokoontui ensimmäisen kerran 17. marraskuuta
     * 1873 (hu-Wikipedia "Budapest"; en-Wikipedia "Budapest",
     * tietolaatikko). (2) Uusi kaupunki jaettiin kymmeneen
     * kaupunginosaan (en-Wikipedia "Budapest"). (3) Marraskuusta 1873
     * on yli sataviisikymmentä vuotta. (4) Kürtőskalács kiertää vartaan
     * ympäri — pelin omaa Livia-aineistoa (js/fokusvirta.js
     * LIVIAN_SAAPUMISET, budapest).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Kolme kaupunkia yhdeksi yhdessä päivässä — tiedätkö '
      + 'sinä, mitä se tarkoittaa minun ammatissani. Kirjeeseen oli '
      + 'ennen valittava Buda tai Pest tai Óbuda, ja nyt osoite on yksi. '
      + 'Se tapahtui seitsemästoista marraskuuta 1873, ja uusi kaupunki '
      + 'jaettiin kymmeneen kaupunginosaan samalla istumalla. Siitä on '
      + 'nyt yli sataviisikymmentä vuotta, eikä kukaan enää muista '
      + 'kysyä kumpi ranta. Mut kürtőskalács kiertää yhä vartaan '
      + 'ympäri, ja siitä minä muistan tämän kaupungin.',
    /*
     * Huomio viittaa herokuvan kohteeseen (parlamenttitalo). Faktat
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js, budapest/avauskuvat): Imre Steindlin
     * piirustukset, valmistui 1904, 268 metriä pitkä, kupoli tasan 96
     * metriä muistuttamassa vuoden 896 maahantulosta. Talo on
     * nimenomaan isoisän jälkeen rakennettu, ja juuri siksi se sopii
     * merkintään kaupungista, jota ei eilen ollut.
     */
    teksti: 'Tuota taloa isoisäsi ei nähnyt: parlamentti valmistui vasta '
      + '1904, kolmekymmentä vuotta hänen käyntinsä jälkeen. Imre '
      + 'Steindl piirsi siitä 268 metriä pitkän, ja kupoli nousee tasan '
      + '96 metriin — luku muistuttaa vuodesta 896, jolloin unkarilaiset '
      + 'tulivat vuorten yli. Uusi kaupunki halusi heti talon, joka '
      + 'näkyy joelle. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-budapest-parliament.jpg',
      selite: 'Unkarin parlamenttitalo valmistui 1904 Imre Steindlin '
        + 'piirustuksin: uusgoottilainen palatsi on 268 metriä pitkä, ja '
        + 'sen kupoli nousee tasan 96 metriin.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä luettelee kolme nimeä, ja Óbuda on
       * niistä se, jota kukaan ei tunne. Täky kertoo, mikä Óbuda oli
       * ennen kuin se oli Óbuda — ja vastaa samalla vanhan miehen
       * väitteeseen siitä, että joki muistaa kaiken.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Aquincum" (johdanto ja osio "History"):
       *     kaupunki Pannonian koillisrajalla, rauniot nykyisen
       *     Budapestin Óbudan kaupunginosassa; alun perin kelttiläisen
       *     eravisci-heimon asuinpaikka; noin 41–54 jaa. saapui 500
       *     miehen ratsuväkiosasto ja vuoteen 89 mennessä paikalla oli
       *     legioona (Legio II Adiutrix, 6 000 miestä); Pannonian
       *     uudelleenjärjestelyn jälkeen vuonna 103 Aquincumista tuli
       *     Pannonia Inferiorin pääkaupunki; kaupungissa oli
       *     keskuslämmitys, julkiset kylpylät ja kaksi amfiteatteria;
       *     kaupunki tuhoutui suurelta osin vuoteen 350 mennessä;
       *     Marcus Aureliuksen uskotaan kirjoittaneen osan
       *     Itsetutkisteluistaan täällä.
       *   - en-Wikipedia "Pipe organ" (osio soittimen historiasta,
       *     lähteenä Randel): noin 400 osaa vuoden 228 hydrauliksesta
       *     löytyi Aquincumin kaivauksissa 1931.
       *   - hu-Wikipedia "Aquincumi víziorgona": löytäjä Nagy Lajos
       *     1931, 400 metalliosaa palokunnan talon kellarista eteläisen
       *     kaupunginportin kaivauksessa; pronssilaatan tekstin mukaan
       *     soittimen lahjoitti palokunnan päällikkö Gaius Iulius
       *     Viatorinus omalla kustannuksellaan vuonna 228; soittimessa
       *     oli 52 pilliä neljässä rivissä; toisen maailmansodan aikana
       *     osa katosi, jäljellä on noin 300 osaa.
       *
       * MITÄ EI VÄITETÄ: soittimen toimintatapa on lähteessä yhä
       * kiistanalainen (vesi vai ilma), joten sitä ei sanota.
       */
      id: 'aquincum',
      nappi: 'Kaupunki, joka oli täällä ennen kaupunkia',
      otsikko: 'Aquincum Óbudan alla',
      teksti: 'Niistä kolmesta nimestä Óbuda on vanhin — ja vanhempi kuin '
        + 'isoisäsi arvasi. Sen alla on roomalainen kaupunki Aquincum, '
        + 'joka seisoi valtakunnan koillisrajalla. Paikalla asui ensin '
        + 'kelttiläinen eravisci-heimo; noin vuonna 41 saapui '
        + 'viidensadan miehen ratsuväkiosasto, ja vuoteen 89 mennessä '
        + 'täällä oli kokonainen legioona, kuusituhatta miestä. Kun '
        + 'Pannonia järjestettiin uudelleen vuonna 103, Aquincumista '
        + 'tuli maakunnan pääkaupunki: keskuslämmitys taloissa, julkiset '
        + 'kylpylät ja kaksi amfiteatteria. Vuonna 1931 kaivettiin '
        + 'esiin eteläinen kaupunginportti, ja palokunnan talon '
        + 'kellarista tuli neljäsataa metalliosaa. Ne olivat vesiurut. '
        + 'Mukana oli pronssilaatta, jossa luki, kuka soittimen '
        + 'lahjoitti: palokunnan päällikkö Gaius Iulius Viatorinus, '
        + 'omalla kustannuksellaan, vuonna 228. Pillejä oli '
        + 'kaksikymmentäviisisataa vuotta myöhemmin laskettuna '
        + 'viisikymmentäkaksi, neljässä rivissä. Osa katosi toisessa '
        + 'maailmansodassa; noin kolmesataa osaa on yhä tallella.',
      /*
       * Commons 29.8.2026: 3488×2616, CC BY-SA 2.0, Jerzy Kociatkiewicz,
       * kuvattu 20.8.2007, kuvaus kertoo suoraan kuvan olevan
       * REKONSTRUKTIO. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on soitin vitriinissä, ei ihmisiä. Selite sanoo
       * rekonstruktion ääneen, koska kuva ei saa väittää olevansa
       * alkuperäinen esine.
       */
      kuva: {
        tiedosto: 'Roman pipe organ Aquincum.jpg',
        selite: 'Aquincumin vesiurkujen rekonstruktio museossa. '
          + 'Alkuperäisestä soittimesta on jäljellä noin kolmesataa '
          + 'metalliosaa.',
        lahde: 'Jerzy Kociatkiewicz, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Kenen talon kellarista Aquincumin urkujen osat '
          + 'löytyivät vuonna 1931?',
        vaihtoehdot: [
          'Palokunnan',
          'Maaherran',
          'Amfiteatterin vahtimestarin',
        ],
        oikea: 0,
        fakta: 'Pronssilaatta kertoo lahjoittajan nimen ja vuoden 228: '
          + 'palokunnan päällikkö Gaius Iulius Viatorinus maksoi urut '
          + 'omasta pussistaan.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: kohtaamisen hahmo on kylpymestari, ja tämä on
       * se, mistä hänen lämpimä vetensä tulee. Täky vastaa myös
       * merkinnän vanhan miehen väitteeseen: joki ei ole ainoa vesi,
       * joka muistaa.
       *
       * FAKTAT:
       *   - en-Wikipedia "Tourism in Hungary", Budapestin luolia
       *     käsittelevä kohta (lähteinä Hebbert, The Rough Guide to
       *     Budapest, 2002, s. 66–68): Budapestin alla tunnetaan
       *     kaksisataa luolaa; Budan kukkuloiden luolat ovat
       *     poikkeuksellisia, koska ne ovat syntyneet alhaalta nousevasta
       *     lämpimästä vedestä eivätkä sadevedestä; Pál-völgyin
       *     tippukiviluola on alueen suurin ja se löydettiin 1900-luvun
       *     alussa; Szemlőhegyin luolassa ei ole tippukiviä vaan seinät
       *     ovat lämpimän veden saostamaa kuorta, ilma on hyvin puhdasta
       *     ja luolan alin taso on käytössä hengityssairaiden
       *     hoitopaikkana.
       *   - Unescon maailmanperinnön aielistan kohde "Caves of the Buda
       *     Thermal Karst System" (viitattu samassa artikkelissa;
       *     tarkistettu en-Wikipedia "List of World Heritage Sites in
       *     Hungary").
       *   - Gellértinvuoren kristalliluola on pelin omaa, jo hyväksyttyä
       *     aineistoa (js/packs/nahtavyysjutut.js, "Gellértinvuori"):
       *     löytyi 2007 ja on syntynyt 300 000–500 000 vuotta sitten.
       */
      id: 'luolat',
      nappi: 'Kaksisataa luolaa kaupungin alla',
      otsikko: 'Lämpimän veden kaivamat käytävät',
      teksti: 'Kylpylöiden lämmin vesi ei tule kaupunkiin — se tulee '
        + 'kaupungin alta, ja matkalla se on tehnyt työtä. Budapestin '
        + 'alla tunnetaan kaksisataa luolaa, ja Budan kukkuloiden luolat '
        + 'ovat maailmanlaajuisesti harvinaisia: useimmat luolat syntyvät '
        + 'ylhäältä valuvasta sadevedestä, nämä alhaalta nousevasta '
        + 'lämpimästä vedestä. Suurin niistä on Pál-völgyin '
        + 'tippukiviluola, avara sokkelo, joka löydettiin 1900-luvun '
        + 'alussa. Szemlőhegyin luolassa taas ei ole tippukiviä lainkaan: '
        + 'sen seinät ovat lämpimän veden saostamaa kuorta, joka '
        + 'kimaltaa lampun valossa. Ilma siellä on niin puhdasta, että '
        + 'luolan alinta tasoa käytetään hengityssairaiden hoitopaikkana. '
        + 'Gellértinvuoren sisältä löytyi vielä 2007 kokonainen '
        + 'kristallien peittämä luola, joka on syntynyt 300 000–500 000 '
        + 'vuotta sitten — kauan ennen kuin kukaan asettui joen rannalle '
        + 'kiistelemään kaupungin nimestä.',
      /*
       * Commons 29.8.2026: 1200×798, CC BY-SA 3.0, VinceB, kuvattu
       * 10.4.2012, kuvaus "Pál-völgy Cave, Budapest, Hungary".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * kalkkikiviholvi ja tippukiviä, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Pál-völgy Cave.JPG',
        selite: 'Pál-völgyin luola Budan kukkuloiden sisällä. Käytävät '
          + 'ovat syntyneet alhaalta nousseesta lämpimästä vedestä.',
        lahde: 'VinceB, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Mikä tekee Budan kukkuloiden luolista harvinaisia?',
        vaihtoehdot: [
          'Ne ovat syntyneet alhaalta nousevasta lämpimästä vedestä',
          'Ne on kaivettu käsin keskiajalla',
          'Ne ovat kokonaan jään sisällä',
        ],
        oikea: 0,
        fakta: 'Szemlőhegyin luolan ilma on niin puhdasta, että sen '
          + 'alinta tasoa käytetään hengityssairaiden hoitopaikkana. '
          + 'Gellértinvuoresta löytyi 2007 kristallien peittämä luola.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä ihmettelee kaupunkia, jota ei eilen
       * ollut. Tämä on se, mitä uusi kaupunki teki seuraavaksi — ja
       * sattumalta myös Lontoon vastapari, koska isoisä oli nähnyt
       * maailman ensimmäisen metron (js/packs/maa-kategoriat.js,
       * GBR/historia).
       *
       * FAKTAT (EI PELIDATASSA muuten kuin yhtenä sivulauseena
       * js/packs/nahtavyysjutut.js:n Sankarien aukiossa — tarkistettu
       * 29.8.2026 kahdesta riippumattomasta lähteestä):
       *   - en-Wikipedia "Metro Line M1 (Budapest Metro)" (johdanto ja
       *     osio "The original line in 1896"): rakennettiin 1894–1896;
       *     Manner-Euroopan ensimmäinen sähköistetty maanalainen ja
       *     maailman toiseksi vanhin Lontoon jälkeen; keisari Franz
       *     Joseph vihki radan toukokuussa 1896, millenniumivuonna;
       *     valtiopäivät hyväksyivät suunnitelman jo 1870; rakentajaksi
       *     tuli Siemens & Halsken unkarilainen tytäryhtiö; kaksituhatta
       *     työmiestä sai radan valmiiksi alle kahdessa vuodessa; tunneli
       *     tehtiin kokonaan pinnasta kaivamalla; rata kulkee
       *     Andrássy-kadun alla kaupungin keskustasta Városligetiin;
       *     pituus 4,4 kilometriä, yksitoista asemaa.
       *   - Unescon maailmanperintöluettelo: Andrássy-katu ja
       *     millenniumin maanalainen ovat kohteessa vuodesta 2002
       *     (js/packs/nahtavyysjutut.js, "Sankarien aukio", jo hyväksyttyä
       *     pelidataa).
       *
       * PÄIVÄMÄÄRÄSTÄ: lähdeartikkeli antaa vihkiäisille kaksi päivää
       * (2. ja 3. toukokuuta 1896), joten teksti sanoo vain kuukauden.
       */
      id: 'kisfoldalatti',
      nappi: 'Metro, joka kaivettiin kadun pinnasta',
      otsikko: 'Millenniumin maanalainen',
      teksti: 'Kaupunki, jota ei ollut isoisäsi tullessa, kasvoi '
        + 'nopeammin kuin yksikään toinen Euroopassa — ja kahdenkymmenen '
        + 'vuoden päästä se rakensi jotain, mitä oli ennen nähty vain '
        + 'Lontoossa. Millenniumin maanalainen valmistui 1896, ja se oli '
        + 'Manner-Euroopan ensimmäinen sähköistetty maanalainen rata; '
        + 'maailmassa vanhempi oli vain Lontoon metro, jonka isoisäsi '
        + 'ehti nähdä. Valtiopäivät olivat hyväksyneet suunnitelman jo '
        + '1870, mutta työ alkoi vasta 1894, ja Siemens & Halsken '
        + 'unkarilainen tytäryhtiö sai sen valmiiksi alle kahdessa '
        + 'vuodessa kahdentuhannen miehen voimin. Tunnelia ei porattu '
        + 'syvälle: se kaivettiin kadun pinnasta auki ja katettiin '
        + 'takaisin, ja siksi rata kulkee aivan jalkakäytävän alla. '
        + 'Syy oli kohtelias — Andrássy-kadulle haluttiin reitti '
        + 'kaupunginmetsään ilman että kadun ulkonäköä pilattaisiin '
        + 'raiteilla. Keisari Franz Joseph vihki radan toukokuussa 1896. '
        + 'Sama neljän ja puolen kilometrin rata yhdentoista asemineen '
        + 'kulkee yhä.',
      /*
       * Commons 29.8.2026: 1021×799, public domain, tekijä tuntematon,
       * vuosi 1896, kuvaus "Andrássy út in Budapest, Hungary, showing an
       * intersection of the street with the Millenium Underground Rail
       * (Metro line 1) beneath street level". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: aikalaispiirros kadun poikkileikkauksesta;
       * hahmot ovat pieniä aikalaisia.
       */
      kuva: {
        tiedosto: 'Budapest, M1 metró (kisföldalatti), Andrássy út.png',
        selite: 'Aikalaispiirros vuodelta 1896 näyttää, kuinka matalalla '
          + 'millenniumin maanalainen kulkee Andrássy-kadun alla.',
        lahde: 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi Budapestin ensimmäinen metro kaivettiin aivan '
          + 'kadun pinnan alle?',
        vaihtoehdot: [
          'Andrássy-kadun ulkonäköä ei haluttu pilata raiteilla',
          'Syvemmällä oli pohjavettä',
          'Vaunut eivät olisi mahtuneet syvempään tunneliin',
        ],
        oikea: 0,
        fakta: 'Rata rakennettiin 1894–1896 ja se oli Manner-Euroopan '
          + 'ensimmäinen sähköistetty maanalainen. Vanhempi oli vain '
          + 'Lontoon metro.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, budapest): mikä yhdisti Budan ja Pestin jo ennen
   * kuin niistä tehtiin yksi nimi. Visasääntö täyttyy — vastaus on
   * tekstissä, mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT:
   *   - en-Wikipedia "Budapest", tietolaatikko ja osio "Etymology":
   *     Budan, Pestin ja Óbudan yhdistyminen 17. marraskuuta 1873;
   *     yhdistetyllä kaupungilla oli aluksi kymmenen kaupunginosaa.
   *   - hu-Wikipedia "Budapest", historia: 17. marraskuuta 1873
   *     yhdistetyn kaupungin neuvosto kokoontui ensimmäisen kerran ja
   *     otti asiat edeltäjäkaupunkien neuvostoilta; kunnallisvaalit oli
   *     pidetty jo syyskuussa ja ylipormestari sekä pormestari valittu
   *     lokakuussa; Budapestista tuli Euroopan nopeimmin kasvava
   *     kaupunki, ja väkiluku kaksinkertaistui kahdessakymmenessä
   *     vuodessa lähes kolmeenneljäsosamiljoonaan vuosisadan vaihteeseen
   *     mennessä.
   *   - Ketjusillan tiedot ovat pelin omasta, jo hyväksytystä
   *     aineistosta (js/packs/nahtavyysjutut.js, "Ketjusilta"): ennen
   *     vuotta 1849 Budan ja Pestin välillä ei ollut yhtään pysyvää
   *     siltaa; kreivi István Széchenyi tilasi sen englantilaiselta
   *     William Tierney Clarkilta; silta valmistui 375 metrin
   *     pituisena; János Marschalkó veisti neljä kivileijonaa 1852.
   */
  oppitunti: {
    otsikko: 'Seitsemästoista marraskuuta 1873 — kolmesta yksi',
    teksti: 'Isoisäsi ei liioitellut. Buda, Óbuda ja Pest olivat kolme '
      + 'eri kaupunkia, joilla oli omat neuvostonsa ja omat kirjansa, ja '
      + '17. marraskuuta 1873 yhdistetyn kaupungin neuvosto kokoontui '
      + 'ensimmäistä kertaa ja otti asiat haltuunsa. Valmistelu oli '
      + 'tehty huolella: kunnallisvaalit oli pidetty jo syyskuussa ja '
      + 'ylipormestari sekä pormestari valittu lokakuussa. Uusi kaupunki '
      + 'jaettiin kymmeneen kaupunginosaan. Mutta yhdistäminen paperilla '
      + 'oli mahdollista vain siksi, että joen yli päästiin: vielä '
      + 'vuoteen 1849 asti Budan ja Pestin välillä ei ollut yhtään '
      + 'pysyvää siltaa, ja talvella ihmiset odottivat jäätä tai '
      + 'ylittivät veneellä. Kreivi István Széchenyi tilasi ratkaisun '
      + 'englantilaiselta insinööriltä William Tierney Clarkilta, ja '
      + 'silta valmistui 375 metrin pituisena. Kolme vuotta myöhemmin '
      + 'János Marschalkó veisti sen päihin neljä kivileijonaa. Kun '
      + 'kaupungeista tehtiin yksi, se silta oli ollut käytössä '
      + 'neljäkolmatta vuotta. Sen jälkeen kaikki kävi nopeasti: '
      + 'Budapestista tuli Euroopan nopeimmin kasvava kaupunki, ja '
      + 'väkiluku kaksinkertaistui kahdessakymmenessä vuodessa lähes '
      + 'kolmeenneljäsosamiljoonaan.',
    /*
     * Commons 29.8.2026: 5694×4730, public domain, FOTO:Fortepan /
     * Budapest Főváros Levéltára (ID 82081), kuvaus "Lánchíd a budai
     * hídfőtől nézve. A felvétel 1873-1880 között készült."
     * Restrictions tyhjä. SILMÄTARKISTUS tehty: aikalaisvalokuva
     * sillasta; ihmiset ovat kaukaisia hahmoja.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on otettu aikaisintaan samana vuonna
     * kuin isoisä kävi, ja siinä on juuri se silta, jota oppitunti
     * käsittelee.
     */
    kuva: {
      tiedosto: 'Budapest, Lánchíd a budai hídfőtől nézve, 1873-1880 között. - Fortepan 82081.jpg',
      selite: 'Ketjusilta Budan puoleiselta sillanpäältä kuvattuna '
        + 'vuosien 1873 ja 1880 välillä — isoisän matkavuonna tai aivan '
        + 'sen jälkeen.',
      lahde: 'Fortepan / Budapest Főváros Levéltára, Wikimedia Commons '
        + '(public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'budapest'):
   * kylpymestari Márta on kylpylän vanhin kylvettäjä, ja hänen
   * isoisoäitinsä tunsi isoisän. Kysymys on v1308:ssa vaihdettu
   * Ketjusiltaan (ks. paketin oma kommentti), jotta aarretehtävän AIHE
   * kytkeytyy merkintään ja oppituntiin. Tämä kortti ei kertaa Mártan
   * repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Kylpymestari Márta',
    nappi: 'Tapaa kylpymestari',
    teksti: 'Márta on kylpylän vanhin kylvettäjä ja tuntee veden '
      + 'lämpötilan kämmenselällä tarkemmin kuin mittari. Hän on '
      + 'nähnyt altaan reunalla shakinpelaajia, kihlauksia ja '
      + 'sovintoja, eikä hämmästy enää mistään. Kirjaa hän kuitenkin '
      + 'katsoo tarkasti: hänen suvussaan on kerrottu siitä kolmessa '
      + 'polvessa. Ennen kuin hän avaa oven höyryyn, hän haluaa tietää, '
      + 'onko vieras ymmärtänyt, mikä tämän kaupungin puoliskot yhdisti '
      + 'jo kauan ennen nimeä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: RUDASIN KYLPYLÄ. Kaaren teksti asettaa Mártan
   * kylpylän ovelle, ja Rudas on niitä harvoja, jotka olivat pystyssä
   * jo isoisän käydessä — ottomaanien ajan kylpylä Budan puolella
   * joen rannassa. Széchenyi ei kelpaa: se avattiin vasta 1913
   * (js/packs/kulttuuri-kategoriat.js, budapest).
   *
   * 47,48909167 N / 19,04786667 E — en-Wikipedia "Rudas Baths",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((19,04786667 − (−175)) mod 360) × (12000/360)
   *                     = 194,04786667 × 33,3333… = 6468,3
   *                   y = (millerY(76) − millerY(47,48909167)) × 12000/2π
   *                     = 1497,9
   *   europe          x = (19,04786667 + 11) × 19,2 = 576,9
   *                   y = (72 − 47,48909167) × 26,3 = 644,6
   *
   * TARKISTUS LAATTAA VASTEN: Budapestin laatta on Euroopan laudalla
   * 591 / 658 ja maailmankartalla 6492,7 / 1519,3 — eli laatta itse on
   * siirretty laudalla noin neljätoista yksikköä oikealle ja alas
   * kaupungin todellisesta paikasta (nimiön tieltä; sama siirto
   * molemmilla laudoilla). Kohtaamispiste lasketaan todellisesta
   * koordinaatista, joten se osuu laatan vasemmalle yläpuolelle. Ero on
   * noin puolitoista prosenttia laudan leveydestä eli ruudulla
   * muutaman kuvapisteen — piste lukeutuu laatan omaksi, kuten pitää.
   */
  kohtaamispiste: {
    nimi: 'Rudasin kylpylä',
    laudat: {
      maailmankartta: { x: 6468.3, y: 1497.9 },
      europe: { x: 576.9, y: 644.6 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Budapestin sivupino (js/lehti.js
   * rakennaSivut) on Wienin mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Budapest", 2 = Musiikki, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (cimbalomin vasarat) väistyy nimetyn tieltä,
   * joten sivulla on Raamatun vaatima yksi minitehtävä eikä kahta.
   * Sivun 1 kysymys on Budapestin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: TANSSITALO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: ANONYMUS_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Unkari) ----------
   *
   * UUSI POOLI, EI SIIRTO. Unkari ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa; js/fokusnosto.js nostoMaanPooli lukee
   * kaupungin oman `takynostot`-kentän ennen maapoolia, joten uusi maa
   * ei vaadi riviä moottoriin.
   *
   * MIKSI SZEGED: aarremerkintä sanoo, että Attilan hautaa vartioi
   * virta itse, ja merkinnässä vanha mies sanoo joen muistavan kaiken.
   * Szeged on sama joki toisesta suunnasta — se, mitä Tisza teki
   * kuusi vuotta isoisän käynnin jälkeen. Nosto EI kerro aarteesta
   * mitään.
   *
   * PISTE OSUU SZEGEDIN FOKUSKOHTEEN PÄÄLLE, ja se on tietoista: sama
   * kaupunki, kaksi eri sisältöä (js/packs/fokuskohteet-hun.js, szeged).
   * Koordinaatit on otettu sieltä bitilleen samoina, jotta merkit eivät
   * eksy toisistaan pikselin päähän.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT:
       *   - js/packs/fokuskohteet-hun.js, szeged (jo hyväksyttyä
       *     pelidataa): maaliskuussa 1879 — kuusi vuotta isoisän matkan
       *     jälkeen — Tisza mursi patonsa ja vei lähes koko kaupungin;
       *     pystyyn jäi muutama sata taloa; Szeged rakennettiin
       *     uudelleen kokonaan uuden kaavan mukaan, ja avun antaneet
       *     Euroopan suurkaupungit muistetaan yhä kehäkatujen nimissä:
       *     Wien, Bryssel, Rooma, Pariisi ja Lontoo.
       *   - en-Wikipedia "Szeged", osio historiasta (tarkistettu
       *     29.8.2026): vuoden 1879 suurtulvassa 5 723 talosta jäi
       *     jäljelle 265 ja 165 ihmistä kuoli; keisari Franz Joseph
       *     kävi kaupungissa ja lupasi, että Szegedistä tulee kauniimpi
       *     kuin se oli; lupaus pidettiin, ja raunioille nousi uusi
       *     kaupunki leveine katuineen.
       *   - js/packs/fokuskohteet-hun.js, tisza (jo hyväksyttyä
       *     pelidataa): isoisän matkan aikaan käynnissä olivat Euroopan
       *     suurimmat säännöstelytyöt, joissa yli sata mutkaa
       *     katkaistiin oikoteillä ja joki lyheni satoja kilometrejä.
       *
       * IKÄSOPIVUUS (13+): uhriluku kerrotaan kertaalleen lukuna eikä
       * kuvauksena, koska se on syy, jonka takia kaupunki rakennettiin
       * kokonaan uusiksi.
       */
      id: 'szegedin-tulva',
      nimio: 'Szegedin tulva',
      otsikko: 'Joki vei kaupungin yhdessä yössä — ja Eurooppa rakensi '
        + 'sen takaisin katu kerrallaan',
      lunastus: [
        'Isoisän matkan aikaan Tiszalla tehtiin Euroopan suurimpia '
          + 'säännöstelytöitä: yli sata mutkaa katkaistiin läpikaivetuilla '
          + 'oikoteillä, joki lyheni satoja kilometrejä ja suot '
          + 'kuivattiin pelloiksi. Kuusi vuotta myöhemmin, maaliskuussa '
          + '1879, sama joki mursi patonsa Szegedin kohdalla ja vei '
          + 'lähes koko kaupungin. Viidestätuhannesta '
          + 'seitsemästäsadasta kahdestakymmenestäkolmesta talosta jäi '
          + 'pystyyn 265, ja 165 ihmistä kuoli.',
        'Keisari Franz Joseph tuli katsomaan raunioita ja lupasi, että '
          + 'Szegedistä tulee kauniimpi kuin se oli. Lupaus pidettiin: '
          + 'kaupunki rakennettiin uudelleen kokonaan uuden kaavan mukaan '
          + 'leveine katuineen ja kehäteineen. Apua tuli ympäri '
          + 'Eurooppaa, ja Szeged kiitti siitä tavalla, joka on yhä '
          + 'kartalla — kehäkadut nimettiin auttajien mukaan, ja niitä '
          + 'ovat Wien, Bryssel, Rooma, Pariisi ja Lontoo.',
      ],
      lahde: 'js/packs/fokuskohteet-hun.js (szeged ja tisza, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Szeged", osio '
        + 'historiasta (tarkistettu 29.8.2026).',
      /* Commons 29.8.2026: 3072×2304, CC BY-SA 3.0, maalaus Pál Vágó,
       * kuvaus "Pál Vágó: In 1879 the great flood in Szeged (Painting)".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: aikalaismaalaus
       * tulvasta; ihmiset ovat pieniä hahmoja veneissä. */
      valokuva: {
        tiedosto: 'Vágó Szegedi nagyárviz (1879)SF 020.jpg',
        selite: 'Pál Vágón maalaus vuoden 1879 suurtulvasta Szegedissä.',
        lahde: 'Pál Vágó, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi Tiszaa oikaistiin 1800-luvulla?',
        'Miten tuhoutunut kaupunki rakennetaan uudelleen?',
        'Mistä Szegedin kehäkadut ovat saaneet nimensä?',
      ],
      // 46,2529 N / 20,1406 E — js/packs/fokuskohteet-hun.js, szeged.
      // Koordinaatit kopioitu sieltä sellaisinaan (lukemat ovat samat
      // molemmilla laudoilla, eli piste osuu Szegedin fokuskohteen
      // päälle; ks. yllä).
      paikka: {
        nimi: 'Szeged',
        laudat: {
          maailmankartta: { x: 6504.7, y: 1549.8 },
          europe: { x: 597.9, y: 677.1 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Attilan
   * hauta-aarre. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Tarun mukaan Attila haudattiin kolmessa arkussa joen uoman '
      + 'alle, ja joki päästettiin takaisin päälle. Seisoin Tiszan '
      + 'rannalla ja ymmärsin: hautaa ei vartioi kukaan, koska '
      + 'vartijaksi pantiin virta itse.',
  },
};
