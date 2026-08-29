/*
 * DUBLININ FOKUSVIRTA — annostelun sisältö dataksi (aalto 4A).
 *
 * Sisartiedosto js/packs/fokusvirta-tukholma.js:lle ja
 * js/packs/fokusvirta-lontoo.js:lle: samat kentät, sama järjestys, sama
 * moottori (js/fokusvirta.js). Aallon 3 muoto sellaisenaan — ei
 * `valinta`-askelta, ei `kohteet`-poimintaa, matkakirjassa ei kuvaa.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aalto 4A): matkakirjan
 * paikkarivi ja teksti, Livian kuplateksti ja aarremerkinnän teksti ovat
 * SANATARKASTI hänen kirjoittamiaan. Niitä ei ole lyhennetty, jaettu
 * eikä sanajärjestystä muutettu. Luenta on sama teksti tunnetagein;
 * yksikään sana ei vaihdu.
 *
 * ISO AARRE: Irlannin kruununjalokivet (js/packs/paikallisaarteet.js,
 * IRL isoAarre). PIENI AARRE: korillinen turvetta (sama tiedosto) —
 * täkynosto "Suovoi" on kirjoitettu juuri sen pariksi.
 *
 * VUOSILUKUKURI — TÄMÄN KAUPUNGIN TÄRKEIN YKSITTÄINEN SÄÄNTÖ.
 * Kruununjalokivet varastettiin Dublinin linnasta heinäkuussa 1907,
 * eli KOLMEKYMMENTÄNELJÄ VUOTTA isoisän käynnin jälkeen. Isoisän
 * 1873-tekstit eivät siksi saa viitata varkauteen millään tavalla —
 * aarremerkinnässä hän vain näkee jalokivet lasin takana ja panee
 * muistiin vartijan huolettoman lauseen. Nykyajan äänet (Livia,
 * täkytekstit, oppitunti) saavat kertoa varkaudesta vapaasti. Tässä
 * tiedostossa varkaus mainitaan tasan kerran ja vain Livian omassa
 * vihjeessä, joka on kaanonia: *"kohta ymmärrät miksi se ei ole ihan
 * väärä vaisto tässä maassa"*. Itse varkauskertomus kuuluu aarteen
 * löytymiseen (paikallisaarteet.js fakta), eikä yksikään täky kerro
 * sitä ennakkoon — sama sääntö kuin Tukholmassa sähkeen vastauksella.
 *
 * FAKTAPOHJA. Aallon 4A maille EI ollut valmista työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Dublinin kaupunkilehden nostot ja
 *      avauskuvat (js/packs/kulttuuri-kategoriat.js, dublin/kaupunki ja
 *      dublin/tiede), Irlannin maalehden nostot (js/packs/
 *      maa-kategoriat.js, IRL/historia ja IRL/luonto), Dublinin
 *      tarinakaari (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'dublin')
 *      ja paikallisaarteet (js/packs/paikallisaarteet.js, IRL). Nämä on
 *      jo kertaalleen tarkistettu ja hyväksytty peliin — myös niiden
 *      KUVAT, jotka tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä (kaksi eri artikkelia tai kaksi eri
 *      kieliversiota). Ne on nimetty kunkin kohdan omassa kommentissa.
 *      Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON RAJATTU. Täyt (Kellsin kirja, panimon vuokrakirja,
 * Dublinin leijona) EIVÄT ole kaupunkilehden eivätkä maalehden aiheita,
 * joten pelaaja ei lue samaa kahdesti. Lehtitehtävien visat sen sijaan
 * ovat TÄYSIN kaupunkilehden omaa, jo hyväksyttyä aineistoa (Hamilton
 * sivulta "Tiede", Joyce sivulta "Dublin") eivätkä sisällä yhtään uutta
 * faktaväitettä — sama ratkaisu kuin Tukholmassa.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä), ja jokainen on lisäksi KATSOTTU SILMIN
 * pikkukuvana. Kaikki ovat PD tai CC, ja tekijä on merkitty
 * `lahde`-kenttään siinä muodossa kuin Commons sen ilmoittaa.
 * MATKAKIRJAAN EI TULE KUVAA (omistajan linjaus 28.8.2026: kuvat
 * kuuluvat kaupunkilehteen), ja Livian kuva on kaupunkilehden oman
 * avauskarusellin generoitu hero.
 *
 * ── KOHDENOSTOT ────────────────────────────────────────────────────
 *
 * `kohteet`-kenttää EI ole. Kohdenostot tulevat maan omasta listasta
 * (js/packs/fokuskohteet-<maa>.js), eikä Irlannille ole sellaista
 * tiedostoa — eikä yksikään aallon 2–3 kaupunki (Lontoo, Budapest,
 * Praha, Kööpenhamina, Tallinna, Helsinki, Tukholma) enää käytä kenttää.
 * Luontevaa kohdenostoa ei siis ollut tarjolla ilman uutta maatiedostoa,
 * ja rajaus kieltää koskemasta muihin tiedostoihin.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu —
 * sama ratkaisu kuin Tukholmassa. Kenttä on kytkin, ei koriste:
 * js/ui.js näyttää kaiutinnapin heti kun kenttä on olemassa, joten
 * olemattomaan tiedostoon osoittava polku antaisi pelaajalle mykän
 * napin. Työkalu kirjoittaa äänitteen polkuun
 * `assets/audio/puhe-fokus-matkakirja-dublin.mp3`
 * (tools/generoi-luennat.mjs kohdeTiedosto), ja juuri se rivi lisätään
 * `aanite`-kentäksi, kun generointi on ajettu. Teksti ja luenta ovat
 * sanasta sanaan samat, joten luennan voi ajaa koskematta tekstiin.
 *
 * ── KYTKENTÄ PELIIN ────────────────────────────────────────────────
 *
 * Tätä tiedostoa EI ole vielä liitetty mihinkään (aallon 4A rajaus:
 * vain tämä tiedosto, jotta rinnakkaiset kaupunkihaarat eivät törmää
 * samoihin riveihin). Integroija lisää KOLME riviä, ja vasta ne
 * herättävät paketin:
 *
 *   1. js/packs/fokusvirrat.js — import ja taulurivi 'dublin'.
 *   2. sw.js SHELL-lista — './js/packs/fokusvirta-dublin.js'.
 *      Ilman tätä offline-tila hajoaisi (tests/sw.test.mjs).
 *   3. tools/build-standalone.mjs MODULES-lista — sama polku.
 *      Ilman tätä yhden tiedoston versio jäisi vajaaksi
 *      (tests/sw.test.mjs).
 *
 * Kohdat 2 ja 3 ovat testattuja vaatimuksia, joten `npm test` näyttää
 * tällä haaralla kaksi punaista sw-testiä siihen asti kun rivit on
 * lisätty. Molemmat nimeävät korjauksen suoraan virheviestissään.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Hamilton-kysymys on Dublinin lehden sivun 2
 * ("Tiede") oman noston "Kaava, joka raapustettiin sillan kiveen"
 * tekstiä ja Joyce-kysymys sivun 1 ("Dublin") oman noston "Romaani,
 * joka kestää yhden päivän" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SCHRÖDINGER-KYSYMYSTÄ: Tiede-sivulla on jo oma
 * `tehtava`-kenttä, joka kysyy Schrödingerin luentosarjasta. Nimetty
 * tehtävä syrjäyttää sivun oman (js/fokustehtavat.js), joten sama
 * kysymys kahdesti olisi ollut vain hukattu sivu.
 *
 * MIKSI EI SILTAKYSYMYSTÄ: kohtaamisen varsinainen kysymys on Mollyn
 * kysymys siitä, minkä silta korvasi (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'dublin'). Jos lehden aarteen avaava tehtävä kysyisi
 * samasta sillasta, vastaus olisi taskussa ennen kuin Mollya on tavattu.
 */

/*
 * =====================================================================
 * OIKEAN VASTAUKSEN PAIKKA VAIHTELEE — TIETOINEN POIKKEUS
 * =====================================================================
 *
 * Tämän kaupungin viidessä visassa oikea vastaus on indekseissä
 * 0, 2, 1, 2 ja 0. Sisarpaketeissa (Ateena, Tukholma, Lontoo…) se on
 * joka kerta 0, ja vaihtoehdot piirretään DATAN JÄRJESTYKSESSÄ — mitään
 * sekoitusta ei tehdä (js/fokusvirta.js piirtää `visa.vaihtoehdot`
 * forEachillä ja vertaa `i === visa.oikea`). Tarkkaavainen pelaaja voi
 * siis oppia valitsemaan aina ylimmän lukematta kysymystä, mikä on
 * täsmälleen se metastrategia, jonka docs/moduulit/tarinakaari.md luku 6
 * kieltää ("oikea vastaus ei saa erottua muodosta").
 *
 * PITUUSJAKAUMA ON MITATTU ERIKSEEN, koska pelkkä paikan vaihtaminen ei
 * riitä: jos oikea olisi joka kerta lyhin (tai pisin), pelaaja oppisi
 * saman tempun toisesta päästä. Viiden visan jakauma on pisin, lyhin,
 * keskimmäinen, lyhin, keskimmäinen — ja jonkin VÄÄRÄN vaihtoehdon
 * kuuluu olla pisin kolmessa viidestä, kuten sapluuna vaatii.
 *
 * HAVAINTO KUULUU FABLELLE: sama vinouma on kaikissa aiemmissa
 * fokusvirtapaketeissa, eikä tämä tiedosto korjaa niitä (rajaus).
 * Korjaus on halpa — pelkkä `oikea`-luku ja vaihtoehtojen järjestys —
 * mutta se kuuluu omaan erikseen sovittuun erään.
 */
const HAMILTON_VISA = {
  kysymys: 'William Rowan Hamilton ratkaisi 16. lokakuuta 1843 kesken '
    + 'kävelyn pulman, jota oli miettinyt vuosia. Mihin hän kaiversi '
    + 'kaavan taskuveitsellään?',
  vaihtoehdot: [
    'Dunsinkin observatorion oveen',
    'Kanavan puomiin, jonka ohi hän juuri käveli',
    'Broom Bridgen kiveen',
  ],
  oikea: 2,
  fakta: 'Kaava kuvaa kvaternioita, ja niillä käännellään nykyään esineitä '
    + 'kolmiulotteisesti: peliruudulla, roboteissa ja satelliiteissa. Joka '
    + '16. lokakuuta sama matka kävellään uudestaan Dunsinkin '
    + 'observatoriolta samalle sillalle.',
};

const JOYCE_VISA = {
  kysymys: 'Irlannin radio luki vuonna 1982 James Joycen Odysseuksen '
    + 'yhteen menoon alusta loppuun. Kauanko siihen meni?',
  vaihtoehdot: [
    '8 tuntia',
    '30 tuntia',
    '3 vuorokautta',
  ],
  oikea: 1,
  fakta: 'Romaani kertoo yhden ainoan päivän: torstain 16. kesäkuuta 1904. '
    + 'Joka vuosi samana päivänä dublinilaiset pukeutuvat vuoden 1904 '
    + 'vaatteisiin ja kulkevat kirjan reitit läpi. Ensimmäinen sellainen '
    + 'retki tehtiin 1954 hevosvaunuilla, ja se jäi kesken.',
};

export const FOKUSVIRTA_DUBLIN = {
  kaupunki: 'dublin',

  /* ---------- 1. Matkakirja (isoisän ääni, ei kuvaa) ---------- */
  matkakirja: {
    /* KAANON (Fable 29.8.2026) — paikkarivi sellaisenaan. */
    paikkarivi: 'Dublin, syyskuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Liffeyn rannalla tuoksuu mallas: panimo on täällä kokonainen '
      + 'kaupunginosa, ja sen tummaa juomaa lastataan proomuihin kuin '
      + 'kivihiiltä. Collegen kirjastossa näytettiin minulle kirjaa, jonka '
      + 'munkit maalasivat tuhat vuotta sitten — sen sivuilla kiemurtelevat '
      + 'kuviot ovat hienommat kuin yhdenkään kultasepän työ. Vahtimestari '
      + 'käänsi sivua valkoisin käsinein ja katsoi minua kuin varasta.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md
     * luku 7). Vain tunnetagit on lisätty, neljä kappaletta, alku ja
     * loppu eri sävyssä: ihmettely → lämpö → hiljaisuus → kuiskaus.
     * Viimeinen tagi on kohdassa, jossa merkintä kääntyy epäilyksi —
     * juuri se lause kantaa koko kaupungin sävyn.
     */
    luenta: '[curious] Liffeyn rannalla tuoksuu mallas: panimo on täällä '
      + 'kokonainen kaupunginosa, ja sen tummaa juomaa lastataan proomuihin '
      + 'kuin kivihiiltä. [warmly] Collegen kirjastossa näytettiin minulle '
      + 'kirjaa, jonka munkit maalasivat tuhat vuotta sitten — sen sivuilla '
      + 'kiemurtelevat kuviot ovat hienommat kuin yhdenkään kultasepän työ. '
      + '[softly] Vahtimestari käänsi sivua valkoisin käsinein [whispers] ja '
      + 'katsoi minua kuin varasta.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANON (Fable) — Livian kuplateksti sellaisenaan. Aallon 4A
     * kaanonissa Livialle on kirjoitettu YKSI teksti, joka tekee sekä
     * maadoituksen että huomion: se vastaa isoisän merkintään kohta
     * kohdalta (panimo, kirja, vahtimestari) ja kääntyy lopussa
     * eteenpäin. Erillistä `maadoitus`-kenttää ei siksi ole — kahtia
     * jakaminen olisi ollut kaanontekstin muokkaamista.
     *
     * VIIMEINEN LAUSE ON AARTEEN LUPAUS EIKÄ SEN PALJASTUS. Livia
     * sanoo, että vartijan epäluulo ei ole tässä maassa väärä vaisto —
     * muttei sano mitään siitä, mitä Dublinin linnasta vietiin eikä
     * milloin. Vastaus on aarteen omassa faktarivissä
     * (js/packs/paikallisaarteet.js, IRL isoAarre), ja se on tarkoitus:
     * lupaus ensin, palkinto vasta löydön yhteydessä.
     */
    teksti: 'Dublinissa se panimo toimii edelleen, ja se tuhatvuotinen kirja '
      + 'on edelleen näytillä — sivu käännetään nykyään harvemmin kuin '
      + 'isoisäsi aikaan, se kuluu.. Vahtimestarit katsovat kaikkia edelleen '
      + 'kuin varkaita, ja kohta ymmärrät miksi se ei ole ihan väärä vaisto '
      + 'tässä maassa..',
    /*
     * HERO ON LEHDEN OMASTA AVAUSKARUSELLISTA (js/packs/
     * kulttuuri-kategoriat.js, dublin/avauskuvat): Trinity Collegen
     * kellotorni. Valinta on kuplatekstin oma — se puhuu kirjasta, joka
     * on yhä näytillä, ja kirja on juuri tuon tornin takana. Selite on
     * lyhennetty lehden omasta selitteestä eikä lisää yhtään väitettä.
     */
    kuva: {
      ampari: 'herokoe/hero-dublin-aamu.png',
      selite: 'Trinity Collegen kellotorni valmistui 1853 Charles Lanyonin '
        + 'suunnitelmien mukaan, ja sen takana Vanhassa kirjastossa '
        + 'säilytetään Kellsin kirjaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkinnän toinen puolisko on kirja,
       * jonka sivua käännetään valkoisin käsinein ja jonka äärellä
       * vierasta katsotaan kuin varasta. Tämä kertoo, miksi sitä
       * katsotaan niin — kirjan kannet vietiin kerran oikeasti.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Book of Kells" (johdanto sekä osiot History
       *     ja Display): tehty noin vuonna 800 kolumbalaisessa
       *     luostarissa Irlannissa tai Skotlannissa; 340 lehteä eli 680
       *     sivua vasikannahkapergamenttia; kymmenen kokosivun kuvaa;
       *     Ulsterin annaalien vuoden 1007 merkintä kertoo, että
       *     "Columkillen suuri evankeliumikirja, läntisen maailman
       *     päämuistoesine, varastettiin yöllä ilkeästi Cenannasin
       *     suuren kivikirkon läntisestä sakaristosta sen taotun
       *     kotelon tähden"; kirja löytyi muutamaa kuukautta myöhemmin
       *     turpeen alta ilman kultaista ja jalokivistä kansiotaan;
       *     noin 30 lehteä puuttuu, ja ne saattoivat irrota kannen
       *     mukana; Henry Jones lahjoitti kirjan Trinity Collegelle
       *     1661; yleisölle se on ollut näytillä Vanhassa kirjastossa
       *     1800-luvulta lähtien; kirjansitoja Roger Powell sitoi sen
       *     1953 neljäksi niteeksi, joista yksi on kerrallaan esillä,
       *     kaksi sivua näkyvissä ja sivut vaihdetaan kahdentoista
       *     viikon välein.
       *   - en-Wikipedia "Cumdach" (kirjakotelot): Kellsin kirjan
       *     kotelo mainitaan ryöstetyksi Ulsterin vuoden 1007
       *     annaaleissa, ja artikkeli kertoo saman ilmiön yleisemmin —
       *     jalometallikoteloita varastettiin, kirjat jäivät.
       *   - Ydintiedot (n. 800, 340 lehteä, noin 30 kateissa, Trinity
       *     College) vahvistettu myös fi-Wikipedian artikkelista
       *     "Kellsin kirja".
       *
       * MITÄ EI SANOTA: kirjan tekopaikkaa ei väitetä varmaksi. Lähde
       * pitää sitä kiistanalaisena (Iona, Kells tai molemmat), ja niin
       * sanotaan tässäkin.
       */
      id: 'kellsinkirja',
      nappi: 'Kirja, jolta varastettiin kannet',
      otsikko: 'Kellsin kirja',
      teksti: 'Se kirja, jota isoisäsi katseli, tehtiin noin vuonna 800 '
        + 'kolumbalaisessa luostarissa — Ionan saarella, Kellsissä tai '
        + 'osittain molemmissa, siitä kiistellään yhä. Siinä on 340 lehteä '
        + 'vasikannahkaa ja kymmenen kokosivun kuvaa. Vuonna 1007 Ulsterin '
        + 'annaaleihin kirjattiin, että "Columkillen suuri evankeliumikirja, '
        + 'läntisen maailman päämuistoesine" varastettiin yöllä kivikirkon '
        + 'läntisestä sakaristosta — ja syy sanotaan merkinnässä suoraan: '
        + 'sen taotun kotelon tähden. Kirja löytyi muutamaa kuukautta '
        + 'myöhemmin turpeen alta. Kotelo oli poissa, kulta ja jalokivet '
        + 'sen mukana, ja noin kolmekymmentä lehteä puuttuu yhä — ne '
        + 'saattoivat repeytyä irti, kun kirja kiskottiin kansistaan. '
        + 'Varkaat veivät siis sen, mikä oli kallista, ja jättivät sen, '
        + 'mikä oli arvokasta. Trinity Collegeen kirja tuli 1661, ja '
        + 'yleisölle se on ollut esillä 1800-luvulta asti — isoisäsi näki '
        + 'sen siis aivan laillisesti, vaikka häntä katsottiinkin nurjasti. '
        + 'Nykyään esillä on yksi nide neljästä, kaksi sivua kerrallaan, ja '
        + 'sivu käännetään noin kahdentoista viikon välein.',
      /*
       * Commons 29.8.2026: 1123×1558, public domain, Restrictions tyhjä.
       * Folio 34r eli khi-rho-monogrammi, kirjan tunnetuin sivu.
       * SILMÄTARKISTUS tehty: käsinkirjoitettu ja maalattu pergamenttisivu
       * kiemuroineen, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'KellsFol034rChiRhoMonogram.jpg',
        selite: 'Kellsin kirjan tunnetuin aukeama on folio 34r, jossa yksi '
          + 'ainoa kirjainyhdistelmä täyttää koko sivun kiemuroineen.',
        lahde: 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi Kellsin kirja varastettiin Ulsterin annaalien '
          + 'mukaan vuonna 1007?',
        vaihtoehdot: [
          'Sen kultaisen ja jalokivisen kotelon takia',
          'Varkaat tarvitsivat sen pergamentin',
          'Se kertoi luostarin kätköjen paikat',
        ],
        oikea: 0,
        fakta: 'Kirja löytyi muutamaa kuukautta myöhemmin turpeen alta ilman '
          + 'kultaista ja jalokivistä kansiotaan. Noin kolmekymmentä lehteä '
          + 'puuttuu yhä.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ensimmäinen puolisko on mallas ja
       * proomut. Tämä kertoo, mikä se panimo oli isoisän seistessä
       * rannalla — ja vastaa siihen, miksi se oli kokonainen
       * kaupunginosa eikä talo.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Guinness Brewery" (= St. James's Gate
       *     Brewery, johdanto ja historiaosio): Arthur Guinness vuokrasi
       *     31. joulukuuta 1759 käyttämättömän panimon 9 000 vuodeksi
       *     45 punnan vuosivuokralla; alkuperäinen tontti oli neljä
       *     eekkeriä; Benjamin Lee Guinnessin kuollessa 1868 yritys oli
       *     yli miljoonan punnan arvoinen ja panimotontti oli kasvanut
       *     yli 64 eekkeriin; panimo oli maailman suurin vuoteen 1886
       *     mennessä, vuosituotanto 1,2 miljoonaa tynnyriä; vuokra ei
       *     ole enää voimassa, koska yhtiö osti maan omakseen.
       *   - en-Wikipedia "Guinness" (oma artikkelinsa, historiaosio):
       *     sama vuokrapäivä ja -ehto; myynti nousi 350 000 tynnyristä
       *     vuonna 1868 aina 779 000 tynnyriin vuonna 1876; yhtiöllä oli
       *     oma laivasto, proomut mukaan lukien.
       *   - Ydintiedot (1759, St James's Gate) vahvistettu myös
       *     fi-Wikipedian artikkelista "Guinness".
       *
       * MIKSI 1873 ON TÄSSÄ TÄRKEÄ VUOSI: myyntiluvut 1868 ja 1876
       * asettuvat isoisän käynnin molemmin puolin, eli hän seisoi
       * rannalla keskellä kaksinkertaistumista. Sitä ei sanota
       * arviona vaan kahtena mitattuna lukuna vuosiluvuilleen.
       */
      id: 'vuokrakirja',
      nappi: 'Yhdeksäntuhannen vuoden vuokrasopimus',
      otsikko: 'St James’s Gaten vuokrakirja',
      teksti: 'Uudenvuodenaattona 1759 Arthur Guinness allekirjoitti '
        + 'vuokrasopimuksen käyttämättömästä panimosta St James’s Gaten '
        + 'portin luona. Vuokra oli 45 puntaa vuodessa, tontti neljä '
        + 'eekkeriä ja sopimuskausi yhdeksäntuhatta vuotta. Se ei ole '
        + 'kirjoitusvirhe: laske itse, niin päädyt vuoteen 10 759. Kun '
        + 'Benjamin Lee '
        + 'Guinness kuoli 1868, sama tontti oli kasvanut yli '
        + 'kuudenkymmenenneljän eekkerin laajuiseksi ja yritys oli yli '
        + 'miljoonan punnan arvoinen. Ja juuri niihin vuosiin isoisäsi '
        + 'osui: panimo myi vuonna 1868 kolmesataaviisikymmentätuhatta '
        + 'tynnyriä ja vuonna 1876 jo seitsemänsataaseitsemänkymmentä'
        + 'yhdeksäntuhatta. Isoisäsi seisoi rannalla näiden kahden luvun '
        + 'välissä, ja juuri sen hän merkitsi muistiin: proomuja. '
        + 'Vuoteen 1886 '
        + 'mennessä se oli maailman suurin panimo, 1,2 miljoonaa tynnyriä '
        + 'vuodessa. Yhdeksäntuhatta vuotta ei kuitenkaan tullut '
        + 'täyteen: yhtiö osti tontin lopulta omakseen, ja sopimus '
        + 'raukesi. Se on epäromanttisin mahdollinen tapa päättää '
        + 'yhdeksäntuhannen vuoden sopimus.',
      /*
       * Commons 29.8.2026: 4896×3264, CC BY 2.0, Metro Centric, kuvaus
       * "Guinness brewery, Dublin". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: toimiva panimolaitos, höyryä ja kattoja, ei ihmisiä.
       * Kuva on nykypäivästä eikä esitä isoisän aikaa — selite sanoo sen
       * suoraan.
       */
      kuva: {
        tiedosto: 'Guinness brewery, Dublin.jpg',
        selite: 'Panimo toimii yhä samalla tontilla St James’s Gaten '
          + 'portin luona, jonka Arthur Guinness vuokrasi vuonna 1759.',
        lahde: 'Metro Centric, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Kuinka pitkäksi ajaksi Arthur Guinness vuokrasi '
          + 'panimotontin vuonna 1759?',
        vaihtoehdot: [
          'Sadaksi vuodeksi kerrallaan uusittavana',
          'Kolmeksi sukupolveksi eteenpäin',
          'Yhdeksäksituhanneksi vuodeksi',
        ],
        oikea: 2,
        fakta: 'Vuokra oli 45 puntaa vuodessa neljän eekkerin tontista. '
          + 'Vuoteen 1868 mennessä tontti oli yli kuusikymmentäneljä '
          + 'eekkeriä, ja lopulta yhtiö osti maan omakseen — jolloin '
          + 'yhdeksäntuhannen vuoden sopimus raukesi kesken.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) ja
       * erän ainoa kevyt polku. Kaksi ensimmäistä täkyä ovat kirjasta ja
       * rahasta; tämä on siitä, mitä Phoenix Parkissa asui.
       *
       * MIKSI TÄHÄN KAUPUNKIIN: isoisän merkintä on kaupungista, joka
       * vartioi aarteitaan. Tämä on saman kaupungin vientituote, jota
       * kukaan ei vartioinut — se lähti Amerikkaan ja jäi sinne.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Dublin Zoo" (osio History, 1800-luku ja
       *     1900-luku): seura perustettiin 10. toukokuuta 1830 ja
       *     eläintarha avattiin yleisölle 1. syyskuuta 1831; ensimmäinen
       *     leijonapari ostettiin 1855 ja se sai poikasia ensimmäisen
       *     kerran 1857; Dublinin leijonat olivat 1800-luvulla
       *     maailmankuuluja ja niitä käytiin katsomassa; Slats-niminen
       *     leijona syntyi tarhassa 20. maaliskuuta 1919 ja päätyi
       *     Metro-Goldwyn-Mayerin tunnukseksi.
       *   - en-Wikipedia "Leo the Lion (MGM)" (osio Slats): Slats
       *     syntyi Dublinin eläintarhassa 20.3.1919 ja sai alun perin
       *     nimen Cairbre, iiriksi vaunumies; kouluttaja oli Volney
       *     Phifer; Slats oli vastaperustetun yhtiön ensimmäinen
       *     tunnusleijona ja näkyi kaikissa MGM:n mustavalkoisissa
       *     elokuvissa vuosina 1924–1928; toisin kuin seuraajansa hän ei
       *     tunnuksessa tehnyt muuta kuin katseli ympärilleen, eli hän on
       *     ainoa MGM-leijona joka ei karjaise; hän kuoli 1936
       *     17-vuotiaana, ja Phifer hautasi hänet tilalleen tavallisen
       *     graniittilohkareen alle.
       *
       * MITÄ EI SANOTA SYYNÄ: karjaisemattomuuden syytä ei väitetä.
       * Lähde toteaa vain, ettei Slats karjaissut; teksti kertoo
       * erikseen sen tarkistettavan asian, että hänen kautensa osui
       * mykkäelokuvan aikaan, eikä yhdistä näitä syyksi ja seuraukseksi.
       */
      id: 'leijona',
      nappi: 'Leijona, joka ei karjaissut koskaan',
      otsikko: 'Dublinin leijona Hollywoodissa',
      teksti: 'Phoenix Parkin eläintarha avattiin yleisölle 1. syyskuuta '
        + '1831. Ensimmäinen leijonapari ostettiin 1855 ja se sai poikasia '
        + '1857. Siitä alkoi maine: Dublinin leijonat olivat 1800-luvulla '
        + 'maailmankuuluja, ja niitä tultiin katsomaan kaukaa — myös '
        + 'isoisäsi aikaan. '
        + 'Maaliskuun 20. päivänä 1919 siellä syntyi poikanen, jolle '
        + 'annettiin nimeksi Cairbre, iiriksi vaunumies. Amerikassa hänet '
        + 'nimettiin uudestaan Slatsiksi, ja hänestä tuli vastaperustetun '
        + 'Metro-Goldwyn-Mayerin ensimmäinen tunnusleijona: hän katsoo '
        + 'kehyksestään kaikissa yhtiön mustavalkoisissa elokuvissa '
        + 'vuosina 1924–1928. Hänen kautensa osui mykkäelokuvan aikaan, ja '
        + 'toisin kuin yksikään seuraajansa hän ei tunnuksessa tee muuta '
        + 'kuin katselee ympärilleen. Hän on ainoa MGM-leijona, joka ei '
        + 'karjaise. Slats kuoli 1936 seitsemäntoistavuotiaana, ja hänen '
        + 'kouluttajansa hautasi hänet omalle tilalleen tavallisen '
        + 'graniittilohkareen alle — ilman nimeä, ilman vuosilukuja.',
      /*
       * Commons 29.8.2026: 1432×1078, public domain, tekijä
       * Metro-Goldwyn-Mayer, kuvaus "1080p quality screencap of 1926
       * film Battling Butler with Metro-Goldwyn-Mayer logo featuring
       * Slats the Lion". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * mustavalkoinen elokuvatunnus, jonka kehyksessä on leijonan pää.
       *
       * FABLE PÄÄTTÄÄ: kuvassa on toimiva yritystunnus, ja siinä lukee
       * TRADE MARK. Tekijänoikeudellisesti tiedosto on Commonsissa
       * public domain (Yhdysvaltain 1920-luvun elokuva), eikä
       * Restrictions-kentässä ole mitään — pelin sääntö (vain PD/CC,
       * tarkistettuna Commonsista) siis täyttyy. Jos tavaramerkki
       * kuitenkin halutaan pois, korvaava kuva on mikä tahansa
       * leijonavalokuva, ja selite on silloin kirjoitettava
       * rehellisesti: kuva ei esitä Slatsia vaan lajitoveria.
       */
      kuva: {
        tiedosto: 'Metro-Goldwyn-Mayer — Slats the Lion (1926).png',
        selite: 'Dublinissa syntynyt Slats katsoo MGM:n tunnuksesta vuoden '
          + '1926 elokuvassa. Hän ei karjaise siinä eikä missään muussa.',
        lahde: 'Metro-Goldwyn-Mayer 1926, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä erotti Dublinissa syntyneen Slatsin kaikista '
          + 'myöhemmistä MGM:n tunnusleijonista?',
        vaihtoehdot: [
          'Se oli piirros eikä elävä eläin',
          'Se ei karjaissut tunnuksessa kertaakaan',
          'Sitä käytettiin vain yhdessä ainoassa elokuvassa',
        ],
        oikea: 1,
        fakta: 'Slats syntyi Dublinin eläintarhassa 20. maaliskuuta 1919 ja '
          + 'sai nimen Cairbre, iiriksi vaunumies. Hän näkyi kaikissa '
          + 'MGM:n mustavalkoisissa elokuvissa vuosina 1924–1928.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * POHJUSTAA KOHTAAMISEN VARSINAISEN KYSYMYKSEN. Dublinin laattakysymys
   * on tarinakaaren oma (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * 'dublin'): *"Dublinin rautainen kävelysilta korvasi aikanaan
   * jotakin. Minkä?"* — oikea vastaus on lauttamiehet. Oppitunti kertoo
   * juuri sen taustan, kuten Ateenassa Pnyx pohjusti demokratiaa.
   *
   * VISASÄÄNTÖ 6 TÄYTTYY (Isfahan-sääntö): vastaus löytyy tekstistä,
   * mutta yhtään vastausvaihtoehtoa ei toisteta sanatarkasti — kaaren
   * rivi on "Lauttamiehet, jotka soutivat väkeä joen yli", ja tässä
   * puhutaan seitsemästä lautasta ja niiden omistajasta. Otsikossa ei
   * ole vastausta lainkaan.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Ha'penny Bridge" (johdanto sekä osiot Name ja
   *     History): ennen siltaa Liffeyn yli kulki seitsemän lauttaa,
   *     joita liikennöi William Walsh; lautat olivat huonossa kunnossa,
   *     ja Walshille sanottiin, että hänen on joko korjattava ne tai
   *     rakennettava silta; silta avattiin toukokuussa 1816, ja Walsh
   *     sai oikeuden periä puolen pennin maksun jokaiselta ylittäjältä
   *     sadan vuoden ajan; maksun suuruutta ei laskettu rakennus-
   *     kustannuksista vaan se asetettiin samaksi kuin lauttojen maksu;
   *     ehtona oli lisäksi, että jos kaupunkilaiset pitäisivät siltaa
   *     tai sen maksua vastenmielisenä ensimmäisen vuoden aikana, se
   *     olisi purettava ilman kaupungille koituvia kuluja; sillan
   *     päissä oli portit; maksu nousi aikanaan puoleentoista penniin
   *     ja poistui vasta 1919; valurautakaari valmistettiin
   *     kahdeksassatoista osassa Coalbrookdalen tehtaalla Englannissa
   *     malmista, joka oli louhittu Leitrimin kreivikunnan Sliabh an
   *     Iarainnilta, ja pystytystä valvoi tehtaan työnjohtaja John
   *     Windsor; virallinen nimi on Liffey Bridge.
   *   - Pelin oma aineisto (js/packs/kulttuuri-kategoriat.js,
   *     dublin/avauskuvat sekä KAARI_PAKETIT 'dublin' faktarivi):
   *     avattu 1816, 43 metrin valurautakaari valettiin
   *     Coalbrookdalessa, nimi tulee puolen pennin maksusta, jota
   *     perittiin vuoteen 1919, ja lauttojen omistaja sai luvan
   *     rakentaa sillan.
   *
   * MITÄ EI KERROTA: sillan pituutta ei toisteta, koska se on jo lehden
   * avauskuvan selitteessä — oppitunnin on kerrottava se, mitä lehti ei
   * kerro.
   */
  oppitunti: {
    otsikko: 'Seitsemän venettä ja yksi ehdotus',
    teksti: 'Ennen siltaa Liffeyn yli päästiin soutamalla. Ylityksiä hoiti '
      + 'seitsemällä veneellä William Walsh, ja veneet olivat päässeet '
      + 'niin huonoon kuntoon, että hänelle esitettiin valinta: korjaa ne '
      + 'tai rakenna silta. Hän valitsi sillan. Se avattiin toukokuussa '
      + '1816, ja Walsh sai oikeuden periä ylittäjiltä puolen pennin '
      + 'maksun sadan vuoden ajan. Huomaa, mistä se summa tuli: sitä ei '
      + 'laskettu sillan hinnasta lainkaan, vaan se asetettiin täsmälleen '
      + 'samaksi kuin se, mitä veneistä oli aina peritty. Ehtoja oli '
      + 'toinenkin, ja se on niistä kahdesta se hätkähdyttävämpi: jos '
      + 'dublinilaiset pitäisivät siltaa tai sen maksua vastenmielisenä '
      + 'ensimmäisen vuoden kuluessa, se olisi purettava pois — eikä '
      + 'kaupunki maksaisi purkamisesta penniäkään. Silta jäi. Kaari '
      + 'valettiin Englannissa Coalbrookdalen tehtaalla kahdeksaantoista '
      + 'osaan malmista, joka louhittiin Leitrimin kreivikunnassa, ja '
      + 'pystytystä valvoi tehtaan työnjohtaja John Windsor. Molemmissa '
      + 'päissä seisoi kääntöportti, jonka läpi ei päässyt maksamatta. '
      + 'Maksu nousi välillä puoleentoista penniin ja poistui '
      + 'lopullisesti vasta 1919 — isoisäsi ehti siis maksaa omansa. '
      + 'Virallinen '
      + 'nimi on Liffey Bridge, mutta sitä ei käytä kukaan.',
    /*
     * Commons 29.8.2026: 7803×5256, public domain, tekijä Samuel
     * Frederick Brocas. Restrictions tyhjä. SILMÄTARKISTUS tehty:
     * akvarellinäkymä sillasta, rantakadut, soutuveneitä joella,
     * hevosvaunuja — ei tunnistettavia nykyihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: Brocasin kaksitoista Dublin-näkymää ovat
     * vuodelta 1817 ja ne painettiin sarjana Select views of Dublin
     * vuosina 1818–1829 (en-Wikipedia "Samuel Frederick Brocas",
     * osio Career) — eli kuva on sillan ensimmäisiltä vuosilta, maksun
     * ollessa voimassa. Joella soutaa yhä veneitä: kuvassa näkyy sekä
     * silta että se, minkä se korvasi.
     */
    kuva: {
      /*
       * TIEDOSTONIMESSÄ ON SUORA HEITTOMERKKI (U+0027), kuten Commonsissa
       * — ei typografista. Nimi on avain kuvan osoitteeseen (js/media.js),
       * ja tyylitelty heittomerkki antaisi 404:n. Siksi merkkijono on
       * lainausmerkeissä eikä heittomerkeissä.
       */
      tiedosto: "The Ha'Penny Bridge Dublin - Samuel Frederick Brocas.jpg",
      selite: 'Samuel Frederick Brocasin näkymä sillasta sen ensimmäisiltä '
        + 'vuosilta: maksu oli silloin voimassa ja joella soudettiin yhä.',
      lahde: 'Samuel Frederick Brocas, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Tämä teksti on EHDOTUS eikä kaanonia. Aallon 4A kaanonipaketti ei
   * sisältänyt kohtaamista, ja kohtaamiset ovat tarinatekstiä, joka
   * kuuluu päätoimittajalle — Opus ei kirjoita tarinakaareen
   * (docs/moduulit/tarinakaari.md luku 9). Luonnos on tässä siksi, että
   * kaupunki toimisi kokonaisena kokeiltavaksi, ja se korvataan sellai-
   * senaan sillä, mitä Fable kirjoittaa. Rakenne on kevyen kulun vakio
   * (vrt. js/packs/fokusvirta-kobenhavn.js): kortti ESITTELEE henkilön,
   * ja VARSINAINEN KYSYMYS pysyy laattamekaniikassa (game.actionQuiz,
   * KAARI_PAKETIT 'dublin') — tämä paketti ei kosketa sitä.
   *
   * KUVAA EI OLE (aallon 4A rajaus). Kaaren oma kohtaamiskuva
   * (assets/kohtaamiset/) on eri asia eikä kuulu tähän kenttään.
   *
   * KETÄ TAVATAAN JA MIKSI JUURI HÄNTÄ: henkilön on oltava sama kuin
   * tarinakaaren henkilö, koska kysymys tulee kaaresta — Ateenassa
   * kohdataan Nikos, Dublinissa siis sillanvartija Molly. Kaaren oma
   * rivi kuuluu: *"Sillanvartija Molly kerää puolen pennin lantit samaan
   * nahkakukkaroon kuin isoisoisänsä aikanaan."*
   *
   * ÄÄNIPROFIILI: EPÄUSKOINEN (docs/moduulit/tarinakaari.md luku 3:
   * *"sukuni tarina on minusta satua — mutta vihko on tässä"*). Erän
   * muut äänet ovat Livian kuiva huomio ja oppitunnin asiaääni, joten
   * vartijan oma epäusko on tässä se puuttuva sävy.
   *
   * VARALLISUUSSÄÄNTÖ TARKISTETTU: Molly ei odota ketään isoisän
   * maksusta eikä pyynnöstä. Hän seisoo sillalla, koska hänen sukunsa on
   * aina seissyt, ja lantti vaivaa häntä siksi, ettei hän saa sitä itse
   * selitetyksi. Yhtään maksettua järjestelyä ei ole.
   *
   * LUPAUS LUNASTUU AARRETEKSTISSÄ: kortti päättyy kukkaron avaamiseen,
   * ja kaaren aarreteksti alkaa sanoilla *"Lantin alta, kukkaron
   * saumasta, löytyi taitettu kätkö"*. Sama käsi, sama liike.
   *
   * VIHJEOSIO: 'kaupunki'. Dublinin lehdessä on kaksi osiota,
   * 'kaupunki' ("Dublin") ja 'tiede' ("Tiede") (js/packs/
   * kulttuuri-kategoriat.js). Sillan tarina on kaupunkisivun
   * avauskuvien selitteissä, joten vihje osoittaa sinne — se nyökkää
   * suuntaan antamatta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Sillanvartija Molly',
    nappi: 'Tapaa Molly',
    /* FABLE KATSELMOI: kohtaamisluonnos */
    teksti: 'Sillan korvassa seisoo Molly, jolla ei ole enää mitään '
      + 'kerättävää: maksu poistui vuonna 1919 ja portit vietiin pois. '
      + 'Silti hän on täällä joka päivä samalla kohdalla kuin '
      + 'isoisoisänsä, kukkaro vyöllä ja vastaus valmiina siihen ainoaan '
      + 'kysymykseen, jonka jokainen ohikulkija ehtii esittää. Sukunsa '
      + 'tarinaa hän ei usko. "Se on satua", hän sanoo ja kääntelee '
      + 'kukkaroa kämmenellään, "mutta kukkaro on tässä, ja siinä on yksi '
      + 'lantti, jota en ole neljäänkymmeneen vuoteen saanut käytettyä. '
      + 'Selitä sinä se, jos osaat." Ennen kuin hän avaa '
      + 'kukkaron, hän haluaa tietää, tunteeko vieras tämän joen siltä '
      + 'ajalta, jolloin siltaa ei vielä ollut.',
    vihjeOsio: 'kaupunki',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: HA’PENNY BRIDGE. Kohtaamisen henkilö on
   * sillanvartija, oppitunti kertoo sillasta ja isoisän kaarimerkintä
   * alkaa sen ylittämisestä — piste kuuluu siis sillalle eikä
   * kaupunkilaatan päälle. Pelin oma Dublin-aineisto osoittaa saman
   * paikan (js/packs/kulttuuri-kategoriat.js, dublin/avauskuvat,
   * hero-dublin-hapenny).
   *
   * TÄMÄ KENTTÄ ON PAKOLLINEN AARTEEN AVAUKSELLE. js/fokustehtavat.js
   * aarteenAvausMahdollista vaatii sekä `kohtaaminen`-kentän että
   * `kohtaamispiste.laudat[pack.id]`-koordinaatit; ilman niitä
   * kaupungin kulttuurivisa ei pukeutuisi AARTEEN AVAUS -laatikoksi
   * eikä vihreä piste syttyisi mistään.
   *
   * 53,3461 N / −6,2630 E — en-Wikipedia "Ha'penny Bridge",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−6,2630 − (−175)) mod 360) × (12000/360)
   *                     = 168,7370 × 33,3333… = 5624,6
   *                   y = (millerY(53,3461) − millerY(76)) × 12000/2π
   *                     = 1241,6
   *   europe          x = (−6,2630 + 11) × 19,2 = 91,0
   *                   y = (72 − 53,3461) × 26,3 = 490,6
   *
   * TARKISTUS LAATTAA VASTEN: Dublinin laatta on Euroopan laudalla
   * 91 / 490 (js/packs/europe.js) ja maailmankartalla 5624,7 / 1241,4,
   * eli piste osuu käytännössä laatan päälle. Niin pitääkin — silta on
   * keskustassa muutaman sadan metrin päässä laatan paikasta, ja laudan
   * yksikkö on maailmankartalla noin kolme kilometriä. Piirtopuoli
   * hoitaa erotuksen itse: alle 14 yksikön päässä laatasta piste
   * siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Ha’penny Bridge',
    laudat: {
      maailmankartta: { x: 5624.6, y: 1241.6 },
      europe: { x: 91.0, y: 490.6 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Dublinin sivupino (js/lehti.js
   * rakennaSivut) on Tukholman mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Dublin", 2 = Tiede, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Dublinin kulttuurivisa (js/packs/
   * europe-kulttuuri.js: uilleann-pillin palje), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä. Kumpi tahansa aarteen avaajista sytyttää
   * pisteen, ja jälkimmäisestä saa enää rahaa.
   *
   * JULISTEPALKINTO ON KAUPUNGIN OLETUS. `juliste`-kenttää ei ole,
   * joten tehtävä antaa Dublinin yleisjulisteen (js/packs/julisteet.js,
   * dublin → tuotanto/tuot-dublin.png). Tehtäväkohtaista vedosta ei
   * keksitä tässä: uusi julisteavain vaatisi rivin julisteet.js:ään,
   * mihin aallon 4A rajaus ei ulotu.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: HAMILTON_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: JOYCE_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Irlanti) ----------
   *
   * UUSI POOLI, EI SIIRTO. Irlanti ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KOLME NOSTOA (Irlanti keskitasolla). Pooli tarvitsee vähintään
   * kolme, jotta piste voi vuorotella: uusi piste tuikkii vasta kun
   * edellinen on katsottu, eikä yhden mittainen pooli vuorottele
   * lainkaan. Maan kuplatäky on poolin kärki — Livia huomauttaa
   * tuikkivista pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan.
   *
   * KOLME AIHETTA, KOLME ERI PÄÄTÄ SAMASTA TEEMASTA. Kaupungin oma
   * kaari kysyy, ketä aarre lopulta hyödyttää; nostot vastaavat siihen
   * kolmella tavalla ilman että yksikään kertoo kruununjalokivistä:
   * kuka löytää (maljat), kuka tiesi ensin (Newgrange) ja mikä säilyy
   * (suovoi). Maantieteellisesti ne hajautuvat lounaaseen, pohjoiseen
   * ja keskelle, joten kartalle ei synny kasaa.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * MIKSI TÄMÄ NOSTO: Irlannin iso aarre on kadonnut eikä sitä ole
       * löydetty. Tämä on saman maan vastakohta kahdesti — kaksi
       * kätköä, jotka LÖYTYIVÄT, ja kaksi täysin erilaista loppua
       * löytäjilleen. Ensimmäinen löytö on vuodelta 1868, eli VIISI
       * VUOTTA ennen isoisän käyntiä: joku ehti ensin, ja se on tämän
       * pelin paras beat.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Ardagh Hoard" (johdanto sekä osiot Find ja
       *     Chalice): kätkö löytyi syyskuun lopulla 1868, kun kaksi
       *     poikaa, Jim Quin ja Paddy Flanagan, kaivoivat perunapellossa
       *     Reerasta-nimisen rengaslinnakkeen lounaisreunalla Ardaghin
       *     kylän vieressä Limerickin kreivikunnassa; kätkö on maljan
       *     lisäksi paljon koruttomampi jalallinen kuppi ja neljä
       *     solkea; malja piti sisällään muut esineet ja päällä oli vain
       *     kivilaatta, eli tavarat oli haudattu kiireessä ja
       *     luultavasti tilapäisesti; malja on koottu 354 erillisestä
       *     osasta ja siihen on kaiverrettu apostolien nimet; Quinin
       *     äiti myi löydön Limerickin katoliselle piispalle George
       *     Butlerille; Flanagan on haudattu Newcastle Westin
       *     vaivaishautausmaalle ja Quin kuoli Melbournessa 1934.
       *   - en-Wikipedia "Derrynaflan Chalice" (johdanto ja osio
       *     Discovery): Derrynaflanin kätkö löytyi 17. helmikuuta 1980
       *     Killenaulen lähellä Tipperaryn kreivikunnassa, kun Michael
       *     Webb ja hänen samanniminen poikansa tutkivat vanhaa
       *     luostarialuetta metallinilmaisimella; heillä oli maanomista-
       *     jien hiljainen lupa käydä paikalla mutta ei lupaa kaivaa,
       *     ja alue oli suojeltu vuoden 1930 muinaismuistolailla;
       *     löytö pidettiin salassa kolme viikkoa; lähes seitsemän
       *     vuoden oikeudenkäynnit päättyivät korkeimpaan oikeuteen,
       *     jossa Webbit vaativat löydöstä yli viittä miljoonaa puntaa
       *     tuloksetta; tapaus johti siihen, että Irlannin vanha
       *     aarrelöytöoikeus korvattiin vuoden 1994 muinaismuistolain
       *     muutoksella; kätkössä oli maljan lisäksi hopeinen pateeni,
       *     sen jalusta, siivilä ja pronssinen malja, joka oli käännetty
       *     muiden päälle.
       */
      id: 'maljat',
      nimio: 'Ardaghin kätkö',
      otsikko: 'Kaksi poikaa nosti perunapellosta Irlannin hienoimman '
        + 'maljan — sata vuotta myöhemmin toinen samanlainen löytö '
        + 'muutti koko maan lain',
      lunastus: [
        'Syyskuun lopulla 1868 Jim Quin ja Paddy Flanagan kaivoivat '
          + 'perunapellossa Reerasta-nimisen rengaslinnakkeen '
          + 'lounaisreunalla, Ardaghin kylän vieressä Limerickin '
          + 'kreivikunnassa. Maasta tuli esiin kivilaatta ja sen alta '
          + 'malja, joka piti sisällään muut esineet: koruttomamman '
          + 'jalallisen kupin ja neljä solkea. Pelkkä laatta päällä '
          + 'tarkoittaa, että tavarat oli pantu maahan kiireessä ja '
          + 'luultavasti tilapäisesti — joku aikoi hakea ne takaisin '
          + 'eikä hakenut. Malja on koottu 354 erillisestä osasta, ja '
          + 'sen kupin ympäri kiertää kaiverrettuna apostolien nimet. '
          + 'Quinin äiti myi löydön Limerickin piispalle. Poikien tiet '
          + 'erosivat: Quin muutti Australiaan ja kuoli Melbournessa '
          + '1934, Flanagan jäi kotiin ja on haudattu Newcastle Westin '
          + 'vaivaishautausmaalle. Isoisäsi kävi Dublinissa viisi vuotta '
          + 'löydön jälkeen. Joku oli siis ehtinyt ensin.',
        'Toinen puolisko tapahtui 17. helmikuuta 1980. Michael Webb ja '
          + 'hänen samanniminen poikansa tutkivat metallinilmaisimella '
          + 'Derrynaflanin vanhaa luostarialuetta Tipperaryn '
          + 'kreivikunnassa. Heillä oli maanomistajien hiljainen lupa '
          + 'käydä paikalla mutta ei lupaa kaivaa, ja alue oli suojeltu. '
          + 'Maasta nousi viisi esinettä: malja, hopeinen pateeni, sen '
          + 'jalusta, siivilä ja pronssimalja, joka oli käännetty '
          + 'kumolleen muiden päälle kuin kansi. Löytö pidettiin salassa '
          + 'kolme viikkoa. Sitten alkoi lähes seitsemän vuoden '
          + 'oikeudenkäynti, joka päättyi korkeimpaan oikeuteen: Webbit '
          + 'vaativat löydöstä yli viittä miljoonaa puntaa eivätkä '
          + 'saaneet sitä. Riita johti siihen, että vanha aarrelöytö'
          + 'oikeus korvattiin uudella lailla vuonna 1994. Sama maa, '
          + 'sama savi, sama kirkonhopea — ja sata vuotta myöhemmin '
          + 'löytäjä ei enää saanut piispan maksua vaan haasteen.',
      ],
      lahde: 'en-Wikipedia "Ardagh Hoard" (johdanto sekä osiot Find ja '
        + 'Chalice) ja "Derrynaflan Chalice" (johdanto ja osio '
        + 'Discovery); tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 3000×4000, CC BY-SA 3.0, Johnbod, kuvaus
       * "Ardagh Hoard". Restrictions tyhjä. SILMÄTARKISTUS tehty: koko
       * kätkö museovitriinissä — malja, koruttomampi kuppi ja neljä
       * solkea. Reunassa erottuu hämärästi museovieraan käsi, ei kasvoja.
       *
       * MIKSI KOKO KÄTKÖ EIKÄ PELKKÄ MALJA: lunastusteksti puhuu siitä,
       * mitä maljan sisältä löytyi, ja tämä kuva näyttää juuri sen.
       * Vaihtoehtoinen tiedosto "Calice di bronzo, da reerasta…" esittää
       * kätkön TOISTA, koruttomampaa kuppia eikä kuuluisaa maljaa —
       * sitä ei siis voi käyttää maljan kuvana.
       */
      kuva: {
        tiedosto: 'Ardagh Hoard.jpg',
        selite: 'Ardaghin kätkö Irlannin kansallismuseossa: malja piti '
          + 'sisällään koruttomamman kupin ja neljä solkea.',
        lahde: 'Johnbod, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Mitä Ardaghin maljan sisältä löytyi?',
        'Miksi Derrynaflanin löydöstä käräjöitiin seitsemän vuotta?',
        'Kuka omistaa Irlannissa maasta löytyvän aarteen?',
      ],
      /*
       * 52,49412 N / −9,06372 E — en-Wikipedia "Ardagh, County
       * Limerick", prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       *
       * LASKU:
       *   maailmankartta  x = ((−9,06372 + 175) mod 360) × 33,3333… = 5531,2
       *                   y = (millerY(52,49412) − millerY(76)) × 12000/2π
       *                     = 1280,0
       *   europe          x = (−9,06372 + 11) × 19,2 = 37,2
       *                   y = (72 − 52,49412) × 26,3 = 513,0
       *
       * Piste on lounaassa noin 54 yksikön päässä Dublinin laatasta,
       * eli reilusti erossa siitä ja kahdesta muusta nostosta.
       */
      paikka: {
        nimi: 'Ardagh, Limerick',
        laudat: {
          maailmankartta: { x: 5531.2, y: 1280.0 },
          europe: { x: 37.2, y: 513.0 },
        },
      },
    },
    {
      /*
       * MIKSI TÄMÄ NOSTO: kaupungin kaari kertoo vartijasta, joka ei
       * usko sukunsa tarinaa. Tämä on saman maan tositapaus siitä, että
       * vartijat olivat oikeassa ja tiede kysyi vasta myöhemmin.
       *
       * FAKTAT (PELIDATASSA): js/packs/maa-kategoriat.js, IRL/historia,
       * nosto "Aurinko käy sisällä kerran vuodessa" (jo hyväksyttyä
       * pelidataa) — Boynen laakso, yli 18 metrin käytävä, rakennettu
       * noin 3200 eaa., kattolaatikko sisäänkäynnin yläpuolella,
       * talvipäivänseisauksen valo noin seitsemäntoista minuuttia,
       * katsojat arvotaan sisään.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Newgrange" (osiot antikvarismista 1600- ja
       *     1700-luvulla sekä konservoinnista ja kaivauksista): vuonna
       *     1699 paikallinen maanomistaja Charles Campbell käski
       *     työmiestensä kaivaa auki osan siitä, mikä näytti pelkältä
       *     multakummulta, saadakseen sieltä rakennuskiveä; 1800-luvun
       *     alussa kummun taakse rakennettiin huvimaja Newgrangesta
       *     otetuista kivistä; Annie ja Bob Hickey hoitivat kohdetta
       *     vartijoina ja oppaina noin vuodesta 1890 kuudenkymmenen
       *     vuoden ajan ja kertoivat huomanneensa, että
       *     talvipäivänseisauksen aikaan sisälle osuu valojuova, joka
       *     osuu tiettyyn kiveen; ensimmäisen perusteellisen kaivauksen
       *     teki arkeologi Michael J. O'Kelly vuosina 1962–1975, ja hän
       *     oli 21. joulukuuta 1967 ensimmäinen ihminen nykyaikana, joka
       *     näki ilmiön itse; valo tulee sisään sisäänkäynnin
       *     yläpuolisesta kattolaatikosta ja yltää kammion lattialle
       *     noin seitsemäntoista minuutin ajan; talvipäivänseisauksen
       *     aamun paikat arvotaan Brú na Bóinnen opastuskeskuksessa.
       *   - fi-Wikipedia "Newgrange": sijainti 40 kilometriä Dublinista
       *     pohjoiseen ja sama seitsemäntoista minuutin kesto.
       *
       * MITÄ EI SANOTA: että Hickeyt olisivat "keksineet" ilmiön tai
       * että heitä ei olisi uskottu. Lähde kertoo vain, että he
       * puhuivat siitä. Teksti sanoo saman eikä enempää — ja siitä
       * riittää se, mikä on totta: vuosiluvut ovat 1890 ja 1967.
       */
      id: 'newgrange',
      nimio: 'Newgrange',
      otsikko: 'Kumpu kaivettiin auki rakennuskiven takia — ja sisällä oli '
        + 'huone, johon aurinko osuu kerran vuodessa',
      lunastus: [
        'Vuonna 1699 Boynen laaksossa seisoi multakumpu, jota kukaan ei '
          + 'pitänyt minään. Paikallinen maanomistaja Charles Campbell '
          + 'käski työmiestensä kaivaa siitä rakennuskiveä. Kivien '
          + 'sijasta aukeni sisäänkäynti ja sen takaa yli '
          + 'kahdeksantoista metriä pitkä käytävä kammioon, joka oli '
          + 'ollut suljettuna noin 3200 eaa. asti — vanhempi kuin '
          + 'Egyptin pyramidit ja Stonehenge. Kunnioitus tuli hitaasti: '
          + '1800-luvun alussa kummun taakse rakennettiin huvimaja '
          + 'kivistä, jotka oli otettu Newgrangesta itsestään.',
        'Annie ja Bob Hickey hoitivat kohdetta vartijoina ja oppaina '
          + 'noin vuodesta 1890 alkaen kuudenkymmenen vuoden ajan. He '
          + 'kertoivat kävijöille, että talvipäivänseisauksen aikaan '
          + 'sisälle tulee valojuova, joka osuu tiettyyn kiveen. '
          + 'Arkeologi Michael J. O’Kelly kaivoi paikkaa vuosina '
          + '1962–1975, ja 21. joulukuuta 1967 hän seisoi itse kammiossa '
          + 'ja näki sen: valo tulee sisään sisäänkäynnin yläpuolisesta '
          + 'kattolaatikosta ja yltää lattialle noin seitsemäntoista '
          + 'minuutiksi. Kaksi vartijaa oli siis puhunut siitä '
          + 'seitsemänkymmentä vuotta ennen kuin kukaan meni katsomaan '
          + 'oikeana aamuna. Nykyään paikat sisälle arvotaan.',
      ],
      lahde: 'en-Wikipedia "Newgrange", osiot antikvarismista 1600- ja '
        + '1700-luvulla sekä konservoinnista, kaivauksista ja '
        + 'talvipäivänseisauksesta; ydintiedot myös fi-Wikipedian '
        + 'artikkelista "Newgrange" ja pelin omasta Irlanti-aineistosta '
        + '(js/packs/maa-kategoriat.js, IRL/historia); tarkistettu '
        + '29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto IRL/historia,
       * js/packs/maa-kategoriat.js) — siis jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 2040×3048, CC BY 2.0, jemartin03.
       * Restrictions tyhjä. SILMÄTARKISTUSTA EI TARVITTU UUDESTAAN:
       * tiedosto on jo pelin lehdessä samalla selitteellä.
       */
      kuva: {
        tiedosto: 'Entrance to Newgrange passage tomb.jpg',
        selite: 'Newgrangen sisäänkäynnin yläpuolella on aukko, '
          + 'kattolaatikko, jonka läpi talvipäivänseisauksen aurinko '
          + 'yltää käytävää pitkin kammioon.',
        lahde: 'jemartin03, Wikimedia Commons (CC BY 2.0)',
      },
      kysymykset: [
        'Mitä Newgrangen sisältä on löydetty?',
        'Miten kattolaatikko osaa osua juuri oikeaan aamuun?',
        'Miten talvipäivänseisauksen paikat arvotaan?',
      ],
      /*
       * 53,6947251 N / −6,4755655 E — en-Wikipedia "Newgrange",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       *
       * LASKU:
       *   maailmankartta  x = ((−6,4755655 + 175) mod 360) × 33,3333… = 5617,5
       *                   y = (millerY(53,6947251) − millerY(76)) × 12000/2π
       *                     = 1225,8
       *   europe          x = (−6,4755655 + 11) × 19,2 = 86,9
       *                   y = (72 − 53,6947251) × 26,3 = 481,4
       *
       * HUOM ETÄISYYS: piste on Euroopan laudalla noin kymmenen yksikön
       * päässä Dublinin laatasta (91 / 490) — se on maantieteellisesti
       * oikein (Boynen laakso on 40 km kaupungista pohjoiseen), ja
       * piirtopuoli erottelee lähekkäiset merkit itse
       * (js/fokusnosto-symbolit.js nippuMerkit).
       */
      paikka: {
        nimi: 'Newgrange',
        laudat: {
          maailmankartta: { x: 5617.5, y: 1225.8 },
          europe: { x: 86.9, y: 481.4 },
        },
      },
    },
    {
      /*
       * MIKSI TÄMÄ NOSTO: Irlannin PIENI aarre on korillinen turvetta
       * (js/packs/paikallisaarteet.js, IRL pieniAarre), ja sen faktarivi
       * lupaa jo, että suo säilöö mitä sinne joutuu — myös puuastioissa
       * olevaa suovoita. Tämä nosto lunastaa sen lupauksen: pienin aarre
       * on se, joka on yhä syötävää. Poolin kevein pää, ja tarkoituksella
       * — kaksi muuta nostoa ovat hopeasta ja hämärästä.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Bog butter" (johdanto ja osio History):
       *     suovoita löytyy haudattuna puuastiasta — sangosta, tynnyristä
       *     tai kirnusta — ja astia oli usein vuorattu lisäksi
       *     hirvennahalla tai kasvikuiduilla; Irlannissa tapa ulottuu
       *     ensimmäiselle vuosisadalle jaa.; suo on kylmä, vähähappinen
       *     ja hapan, mikä säilöö; vasta vuonna 2003 Bristolin
       *     yliopiston tutkijat osoittivat, että osa näytteistä on
       *     maitopohjaisia ja osa eläinrasvaa; 28. huhtikuuta 2011
       *     uutisoitiin noin 50 kilon löydöstä Tullamoressa Offalyn
       *     kreivikunnassa: koverrettu puuastia, halkaisija 30
       *     senttimetriä, korkeus 60 senttimetriä, 2,3 metrin syvyydessä,
       *     ja astiassa oli yhä heikko maidon haju; nykykokeissa tehdyn
       *     suovoin makua on kuvailtu sanoilla eläimellinen, riistainen,
       *     sammalinen ja salamimainen, ja sitä käytetään keittiössä
       *     samaan tapaan kuin kypsytettyä ghee-voita.
       *   - Pelin oma aineisto (js/packs/paikallisaarteet.js, IRL
       *     pieniAarre): irlantilaisista soista on löytynyt puuastioissa
       *     suovoita, jonka vanhimmat löydöt ovat tuhansia vuosia
       *     vanhoja ja yhä tunnistettavaa rasvaa.
       */
      id: 'suovoi',
      nimio: 'Suovoi',
      otsikko: 'Suosta nostettiin viisikymmentä kiloa voita, joka haisi '
        + 'yhä maidolta',
      lunastus: [
        'Irlannissa on ensimmäiseltä vuosisadalta jaa. alkaen '
          + 'haudattu voita suohon. Se pakattiin puuastiaan — sankoon, '
          + 'tynnyriin tai kirnuun — ja astia vuorattiin usein vielä '
          + 'hirvennahalla tai kasvikuiduilla ennen kuin se painettiin '
          + 'turpeeseen. Syytä ei tiedetä varmasti. Suo on kylmä, '
          + 'vähähappinen ja hapan, eli se on käytännössä pakastin, joka '
          + 'ei tarvitse virtaa; toisen selityksen mukaan tarkoitus ei '
          + 'ollut säilöä vaan muuttaa makua. Vasta vuonna 2003 '
          + 'Bristolin yliopistossa selvitettiin, mistä aine oikeastaan '
          + 'on: osa näytteistä on maitopohjaisia ja osa eläinrasvaa.',
        'Huhtikuun 28. päivänä 2011 uutisoitiin löydöstä Tullamoren '
          + 'lähellä Offalyn kreivikunnassa. Koverretussa puuastiassa, '
          + 'joka oli kolmekymmentä senttiä leveä ja kuusikymmentä '
          + 'korkea, oli noin viisikymmentä kiloa suovoita, ja astia '
          + 'makasi 2,3 metrin syvyydessä. Astiassa haisi yhä heikosti '
          + 'maito. Nykykokeissa valmistettua suovoita maistaneet ovat '
          + 'kuvailleet sitä sanoilla eläimellinen, riistainen, '
          + 'sammalinen ja salamimainen — eikä se ole moite: keittiössä '
          + 'sitä käytetään kuten kypsytettyä ghee-voita. Isoisäsi '
          + 'luettelon pienin irlantilainen aarre on korillinen '
          + 'turvetta, ja tämä on syy siihen: turve ei ole vain '
          + 'polttoainetta, vaan kansi jonkin päällä.',
      ],
      lahde: 'en-Wikipedia "Bog butter", johdanto ja osio History; '
        + 'pelin oma Irlanti-aineisto js/packs/paikallisaarteet.js '
        + '(IRL, pieni aarre); tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 2848×3591, CC BY-SA 3.0, Bazonka, kuvaus
       * "Bog butter in wooden vessel. 15th -16th century. Found near
       * Portadown … In the Ulster Museum". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kaksikorvainen puuastia museovitriinissä,
       * ja sen suusta pullistuu vaalea rasvamöykky. Ei ihmisiä.
       *
       * SELITE EI TOISTA KREIVIKUNTAA: Commonsin kuvaus sanoo
       * "near Portadown, County Fermanagh", mutta Portadown on Armaghin
       * kreivikunnassa — kuvaus on siis itsensä kanssa ristiriidassa.
       * Selite kertoo siksi vain sen, mikä on varmaa: astia ja museo.
       */
      kuva: {
        tiedosto: 'Bog butter in wooden vessel.JPG',
        selite: 'Suovoita puuastiassaan Ulsterin museossa: rasva '
          + 'pullistuu yhä astian suusta ulos.',
        lahde: 'Bazonka, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi voita haudattiin suohon?',
        'Miltä suovoi maistuu nykyään?',
        'Mitä muuta irlantilaisista soista on löytynyt?',
      ],
      /*
       * 53,2667 N / −7,5000 E — en-Wikipedia "Tullamore",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       *
       * LASKU:
       *   maailmankartta  x = ((−7,5 + 175) mod 360) × 33,3333… = 5583,3
       *                   y = (millerY(53,2667) − millerY(76)) × 12000/2π
       *                     = 1245,2
       *   europe          x = (−7,5 + 11) × 19,2 = 67,2
       *                   y = (72 − 53,2667) × 26,3 = 492,7
       *
       * Piste on Irlannin keskellä, noin 24 yksikköä Dublinin laatasta
       * länteen — omassa rauhassaan kahden muun nostopisteen välissä.
       */
      paikka: {
        nimi: 'Tullamore',
        laudat: {
          maailmankartta: { x: 5583.3, y: 1245.2 },
          europe: { x: 67.2, y: 492.7 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable 29.8.2026) — teksti sellaisenaan. Iso aarre: Irlannin
   * kruununjalokivet. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta).
   *
   * VUOSILUKUKURI (ks. tiedoston alku): isoisä on Dublinissa vuonna
   * 1873 ja jalokivet varastetaan vasta heinäkuussa 1907. Merkintä ei
   * siksi tiedä varkaudesta mitään — se panee muistiin vartijan
   * huolettoman lauseen ja toteaa, etteivät sellaiset lauseet vanhene
   * hyvin. Varkaus kerrotaan pelaajalle vasta aarteen omassa
   * faktarivissä (js/packs/paikallisaarteet.js, IRL isoAarre), eli
   * täsmälleen silloin kun merkinnän viimeinen virke lunastuu.
   */
  aarremerkinta: {
    teksti: 'Linnassa säilytetään jalokiviä, joilla ritarikunta '
      + 'koristautuu juhlissaan. Näin ne lasin takana: tähti ja käädyt, '
      + 'timantteja ja smaragdeja. Vartija kehui, ettei niitä vahdi öisin '
      + 'kukaan, sillä kuka nyt linnasta varastaisi. Kirjoitan tämän '
      + 'muistiin, koska sellainen lause ei yleensä vanhene hyvin.',
  },
};
