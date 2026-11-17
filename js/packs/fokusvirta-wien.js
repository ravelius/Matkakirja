/*
 * WIENIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -sofia.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Florentiner-timantti (aarremerkintä).
 *
 * FAKTAPOHJA täyille ja oppitunnille: docs/mantereet-tyoaineisto/
 * takyt-wien.md, jonka jokainen väite on tarkistettu Wikipedian
 * rajapinnasta artikkeli ja osio kerrallaan (täyt 1, 2, 5, 12 ja 15).
 * Syvennysteksteissä ei ole yhtään faktaa tuon raportin ulkopuolelta.
 *
 * ── WIEN PILOTOI UUTTA PELITEHTÄVÄTYYPPIÄ: ISOISÄN PULMA ───────────
 *
 * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta): *"PELITEHTÄVÄN
 * AIHE RATKAISEE, EI MEKANIIKKA … isoisän väittämä- ja pulmatyypit
 * kylvetään suoraan saman kaupungin merkintään, jossa merkintä väittää
 * jotain tai jättää pulman auki ja kohtaaminen lunastaa sen. Uudet
 * tyypit pilotoidaan Wienissä (maailmannäyttelymerkintä jättää pulman
 * ilmaan)."*
 *
 * Merkintä sanoo: *"Kahdeksan päivää avajaisten jälkeen pörssi
 * kaatui"* — päivien LUKUMÄÄRÄ mutta ei päivämäärää. Kohtaamisen
 * kysymys (js/tyohuone-kehitys-data.js KAARI_PAKETIT, wien) kysyy
 * juuri sitä päivämäärää, ja puuttuva pala — avajaispäivä 1.5.1873 —
 * on tämän tiedoston oppitunnissa. Pelaaja siis LASKEE vastauksen
 * kahdesta pelissä olevasta tiedosta sen sijaan että muistaisi sen.
 * Siksi oppitunti EI sano romahduspäivää, vaikka se on osa samaa
 * tarinaa: se olisi vastauksen antamista ennen kysymystä.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Pöllön kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, wien/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta, ja
 *      moottori lukee sen kaikkialla varovasti.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 28.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions) — ei arvattuja nimiä. Ihmisiä sisältävät kuvat on
 * katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Taikahuilu-kysymys on Wienin lehden sivun 2
 * ("Musiikki") oman noston "Taikahuilu tehtiin esikaupungin
 * teatteriin" tekstiä ja lipizzanikysymys sivun 1 ("Wien") oman
 * noston "Valkoiset hevoset syntyvät tummina" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI NÄYTTELYKYSYMYSTÄ: kaupungin laattakysymys on isoisän
 * pulma maailmannäyttelystä (ks. tiedoston alku). Jos lehden aarteen
 * avaava tehtävä kysyisi samasta näyttelystä, pulma olisi ratkaistu
 * ennen kuin Antonia on tavattu.
 */
const TAIKAHUILU_VISA = {
  kysymys: 'Taikahuilu sai ensi-iltansa Wienin esikaupungin teatterissa '
    + 'eikä hovissa. Kuka kirjoitti oopperan sanat ja esitti itse '
    + 'linnustaja Papagenoa?',
  vaihtoehdot: [
    'Emanuel Schikaneder',
    'Lorenzo Da Ponte',
    'Antonio Salieri',
  ],
  oikea: 0,
  fakta: 'Taikahuilun ensi-ilta oli 30. syyskuuta 1791 Freihaustheaterissa '
    + 'Wiedenin esikaupungissa. Mozart kuoli 5. joulukuuta 1791, kaksi '
    + 'kuukautta ensi-illan jälkeen.',
};

const LIPIZZANI_VISA = {
  kysymys: 'Hofburgin ratsastuskoulun hevoset tunnetaan valkoisina. '
    + 'Minkä värisinä lipizzanit syntyvät?',
  vaihtoehdot: [
    'Tummina',
    'Valkoisina, kuten aikuisina',
    'Täplikkäinä',
  ],
  oikea: 0,
  fakta: 'Lipizzanit syntyvät tummina ja vaalenevat vuosien kuluessa; '
    + 'noin kymmenvuotiaina ne ovat yleensä valkoisia. Ratsastuskoulun oman '
    + 'sivun mukaan perinteeseen kuuluu, että tallissa on aina vähintään yksi '
    + 'ruunikko.',
};

export const FOKUSVIRTA_WIEN = {
  kaupunki: 'wien',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* Hyväksytty lopullinen paperikuva; toimitus 10.9.2026, SHA-256 272aba9c4904bb61e5462b54ade8fad9e64a627cec32eb8440f785e3a3f45028. */
    /* Isoisällä yksi kuva (omistaja 12.11.): kahvilakuva (entinen luentakuva2, pörssin uutinen) jää; painokonekuva pois uuden tekstin takia (SK 15.11.2026). */
    luentakuva: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-wien-r20260911-paper2-v1.jpg",
      lyhyt: "Wien, 1873. Lehti pieneni pöydällä, uutinen ei.",
      selite: 'Kahvilan herra taitteli lehteä yhä pienemmäksi, kun kahvi laskettiin hänen eteensä. Pörssin uutinen ei suostunut samaan temppuun.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://sammlung.wienmuseum.at/en/object/59815-weltausstellung-1873-rotunde-der-ring-vor-der-hebung-nr-3a/"],
    },
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi seuraa merkinnän omia
     * faktoja: näyttely avattiin 1.5.1873 ja pörssi kaatui kahdeksan
     * päivää myöhemmin, joten isoisä oli Wienissä toukokuussa.
     */
    paikkarivi: "Wien, toukokuussa 1873. Koneiden kolinaa; levottomia uutisia.",
    /* KAANON: OMISTAJAN TEKSTI (omistaja 15.11.2026 klo 18.58 "kelpaa"; SK:n luonnos docs/raportit/wien-isoisa-pulu-luonnos-20261115.md, PR 6814). Sanasta sanaan. 243 merkkiä. */
    teksti: "Maailmannäyttely oli ollut auki kahdeksan päivää, kun poliisi sulki Wienin pörssin. Menin kahvilaan ja tilasin kupin. Tarjoilija kysyi, maksanko heti, koska huomisesta ei tiedä. Maksoin heti. Hän kumarsi syvemmin kuin kenellekään sinä päivänä.",
    /*
     * Luenta on sama teksti tunnetagein. Äänite generoidaan tästä
     * kentästä työnkulussa .github/workflows/generoi-luennat.yml
     * (tools/generoi-luennat.mjs wien), joka kirjoittaa täsmälleen
     * alla nimetyn tiedoston. Nimi on kirjoitettu etukäteen: kenttä on
     * kytkentä, ja ennen ajoa puuttuva mp3 jättää kaiuttimen vaiti
     * kaatamatta mitään (js/luenta.js playDiaryVoice).
     */
    /*
     * TEKSTIN SISÄISET REAKTIOT (omistaja 11.9.2026, Raamattu PULU REAGOI
     * TEKSTIN SISALLA; docs/pulu-reaktiot.md "Luentareaktiot"; Marseillen
     * pilotin laajennus). Ankkuri on katkelma luentatekstistä sanasta
     * sanaan ja osuu tekstiin tasan kerran; hetki lasketaan äänitteen
     * sanakohtaisista aikaleimoista (forced alignment), ei merkkimäärästä.
     * Tarkoitus: myotailee | epailee | torjuu | huvittuu | hammastyy |
     * vakavoituu. siirtyma = ms ankkurin viimeisen sanan lopusta; 0, koska
     * reaktio kuuluu juuri ankkurinsa kohtaan eikä viimeiselle sanalle saa
     * antaa positiivista siirtymää (luonnollinen loppu hoitaa sen).
     * Hiljaiset osuudet: "Rotunden kupoli peitti taivaan rautaisella
     * hatulla" (kuva, pulu kuuntelee).
     */
    reaktiot: [
  {
    "id": "wien.r1",
    "ankkuri": "poliisi sulki Wienin pörssin",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 18.58) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "wien.r2",
    "ankkuri": "maksanko heti",
    "tarkoitus": "huvittuu",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 18.58) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "wien.r3",
    "ankkuri": "Maksoin heti",
    "tarkoitus": "hammastyy",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 18.58) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "wien.r4",
    "ankkuri": "kumarsi syvemmin",
    "tarkoitus": "huvittuu",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 18.58) sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: isoisän uusi ääni (kaupunki-intro-v3, ÄÄ otto, teksti ilman tageja, 17,03 s; JU vienyt 16.11.2026 11.09), ämpärin täysi osoite kuten Pariisissa ja Lontoossa. */
    luenta: "[curious] Maailmannäyttely oli ollut auki kahdeksan päivää, kun poliisi sulki Wienin pörssin. Menin kahvilaan ja tilasin kupin. [warmly] Tarjoilija kysyi, maksanko heti, koska huomisesta ei tiedä. Maksoin heti. Hän kumarsi syvemmin kuin kenellekään sinä päivänä.",
    aanite: 'https://media.matkakirja.app/aanet/kaupunki-intro-v3/isoisa-wien.mp3',
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era02; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-wien-01-r20260909-euv1-v1.jpg.
     */
    /*
     * PULUN KUVA (omistaja 16.11.2026 klo 09.21, KK:n välittämänä; PT): Codexin havainnekuva #2372 (varpunen kahvilan tuolilla ja
     * kahvikuppi marmoripöydällä); Commonsin valokuva (Geolina163, CC BY-SA 4.0) pois. Lähde: Codexin commit a6e95281db
     * (claude/postilaatikko), _review-pulu-wien-cafe-landtmann-20261116/v2/pulu-wien-cafe-landtmann-v2.jpg, SHA256 5d5bea34…
     * (kopio /Users/Shared/Claude/pulu-kuvaesikatselut/wien-cafe-landtmann-codex-v2.jpg; neliö 1254 px; rajaus = koko neliö ympyrään,
     * ei `rajaus`-kenttää). Kuva viedään ämpäriin osoitteeseen alla ennen yhdistämistä. Lähderivi: Matkakirjan havainnekuva.
     * `lyhyt` ja `selite` tehty kuvan mukaan (varpunen ja kahvi); fakta Café Landtmann, avattu 1.10.1873 (docs/raportit/
     * shakki-wien-1873-faktat-20261012.md rivi 28). SK:n luonnos, KK tarkistaa.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-wien-cafe-landtmann-codex-v2.jpg',
        lyhyt: 'Varpunen kahvilan tuolilla Wienissä.',
        selite: 'Varpunen istuu kahvilan tuolin selkänojalla, ja marmoripöydällä on kahvikuppi. Wienin Café Landtmann avattiin 1.10.1873.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://www.landtmann.at/en/the-landtmann/the-landtmann-story.html',
          'https://en.wikipedia.org/wiki/Caf%C3%A9_Landtmann',
        ],
      },
    ],
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE. Yksi kupla per saapuminen.
     * Merkintä päättyy itkeviin miehiin, joten kupla ei alota
     * naljasta: myötätunto ensin, sitten etäisyys.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1) Toukokuu
     * 1873 on yli 150 vuoden takana. (2) Rotunde paloi syyskuussa
     * 1937 (takyt-wien.md, täky 2). (3) Romahdus levisi Berliiniin ja
     * syyskuussa New Yorkiin (takynostot-itavalta.md, ehdokas 1).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki.
     */
    /*
     * KAUPUNGIN KULKU: PULU — LUENTA — PULU (Raamattu, omistaja 7.9.2026).
     *
     * Kaksi kenttää, kaksi hetkeä, ja jokainen kupla on oma
     * äänitiedostonsa (js/liviapuhe.js LIVIAN_KAUPUNKILAHTEET):
     *
     *   huudahdus  enintään yksi lyhyt välihuuto LUENNAN AIKANA, tarkasti
     *              siinä kohdassa, jonka `kohta` nimeää (kohdan on
     *              esiinnyttävä matkakirjan tekstissä tasan kerran). Se
     *              soi kertojan päälle hiljempaa eikä kertoja väisty.
     *   kommentti  1-2 kuplaa luennan jälkeen.
     *
     * ALUSTUS ON POISTETTU (omistaja 8.9.2026, sanatarkasti: *"ota
     * kaikki pulun alustukset pois."*). Isoisän luenta alkaa nyt heti
     * saapumisesta, ja pulu puhuu vasta luennan aikana ja sen jälkeen.
     * Ateena on ainoa kaupunki, jossa pulu puhuu ennen luentaa
     * (pollo.maadoitus).
     *
     * KUVIA EI NÄYTETÄ eikä repliikeissä viitata kuviin: kuvat kuuluvat
     * kaupunkilehteen. Tekstit ovat omistajan sanatarkasti hyväksymiä
     * (7.9.2026), eikä niitä muotoilla uusiksi.
     */
    // Huudahdus poistettu 8.9.2026 (omistaja: puolet välihuomautuksista pois).
    /* KUPLA: OMISTAJAN TEKSTI (omistaja 15.11.2026 klo 18.58 "kelpaa"). Sanasta sanaan. 156 merkkiä. */
    kommentti: ["Arvaa, mitä Wien teki romahduksen jälkeen? Avasi kahvilan! Café Landtmann aloitti Ringillä samana syksynä. Täällä kahviin luotetaan enemmän kuin pankkeihin."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'ilo', voimakkuus: 0.5 },
    /*
     * Huomio viittaa herokuvan kohteeseen (valtionooppera). Faktat
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js): ooppera avasi 1869 Ringstrassen
     * loistorakennusten sarjan. Rotunden palo on takyt-wien.md:n täky
     * 2 — sama fakta kuin maadoituksessa, sanottuna toisesta suunnasta
     * (mitä jäi jäljelle).
     */
    kuva: {
      ampari: 'herokoe/hero-wien-state-opera.jpg',
      lyhyt: 'Valtionooppera avasi 1869; lavalla esiinnytty joka ilta tauolla vain vuonna 1945.',
      selite: 'Valtionooppera avasi 1869 Ringstrassen loistorakennusten '
        + 'sarjan, ja sen lavalla on esiinnytty joka ilta pommituksista '
        + '1945 vain kymmenen vuoden tauolla.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * Faktat: takyt-wien.md, täky 5 (VARMA). Aineiston huomautus
       * noudatettu: Wien-kytkös tulee Fontaine-artikkelista, koska
       * Gramme-artikkeli sanoo vain "in 1873" ilman paikkaa — teksti
       * nojaa siis siihen, mitä Fontaine teki näyttelyssä.
       *
       * MIKSI TÄMÄ TÄKY: isoisä käveli konehallin läpi ja kirjoitti
       * ylös kupolin. Sama halli teki maailmalle sähkömoottorin, eikä
       * kukaan huomannut sitä siinä hetkessä.
       */
      id: 'sahko',
      nappi: 'Kone, joka kytkettiin vahingossa väärin päin',
      otsikko: 'Näyttelyn konehalli',
      teksti: 'Sen kupolin alla, jonka alla sinä seisoit hattu kädessä, '
        + 'oli 800 metriä pitkä konehalli. Belgialainen Zénobe Gramme '
        + 'oli rakentanut parannellun tasavirtageneraattorin, ja hänen '
        + 'yhtiökumppaninsa, ranskalainen insinööri Hippolyte Fontaine, '
        + 'toi koneen Wieniin. Siellä he huomasivat vahingossa, että '
        + 'laite toimii myös toisin päin: kun siihen johdettiin '
        + 'tasavirtaa, se ei tuottanut sähköä vaan alkoi pyöriä. Niin '
        + 'syntyi ensimmäinen teollisesti käyttökelpoinen sähkömoottori '
        + '— sitä ennen sähkömoottorit olivat leluja ja laboratorion '
        + 'kuriositeetteja. Samalla näyttelyllä Fontaine osoitti, että '
        + 'sähkön voi siirtää kahden kilometrin päähän kuparijohtoa '
        + 'pitkin. Kaksi vuotta myöhemmin nuori Nikola Tesla näki '
        + 'saman koneen Grazin teknillisessä korkeakoulussa.',
      lahde: 'en-Wikipedia "Hippolyte Fontaine". Tarkistettu 1.9.2026.',
      /*
       * Commons 28.8.2026: 2832×2128, CC BY-SA 4.0, Icone5, kuvaus
       * "Dynamo Gramme N°14 built by Mignon and Rouart in 1873" —
       * juuri sen vuoden konetyyppi. Restrictions tyhjä.
       */
      kuva: {
        tiedosto: 'Machine Gramme.jpg',
        lyhyt: 'Gramme-kone vuodelta 1873; samanlainen pyörähti Wienin näyttelyssä ensimmäiseksi sähkömoottoriksi.',
        selite: 'Gramme-kone vuodelta 1873. Samanlainen laite pyörähti '
          + 'Wienin näyttelyssä maailman ensimmäiseksi kunnolliseksi '
          + 'sähkömoottoriksi.',
        lahde: 'Icone5, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mitä Gramme-koneelle tapahtui, kun siihen johdettiin '
          + 'sähköä sen sijaan että sillä olisi tuotettu sitä?',
        vaihtoehdot: [
          'Se sammui',
          'Se alkoi pyöriä',
          'Se alkoi kuumeta ja savuta',
        ],
        oikea: 1,
        fakta: 'Löytö oli vahinko, mutta se muutti tehtaat: ennen sitä '
          + 'sähkömoottori oli lelu. Näyttelyssä osoitettiin myös, että '
          + 'sähkö kulkee kuparijohtoa kahden kilometrin päähän.',
      },
    },
    {
      /*
       * Faktat: takyt-wien.md, täky 15 (VARMA). Aineiston
       * päällekkäisyysvaroitus noudatettu: vesijohto 1873 on jo
       * pelissä (js/packs/europe-saapumiset.js ja
       * js/packs/europe-questions.js), joten tässä kerrotaan vain se,
       * mitä pelissä EI vielä ole — akveduktit ja Gabriellin prosentti
       * (teksti uusittu 17.11.2026, KK:n Wienin data-PR).
       * Etunimi on aineiston suosittelema muoto Antonio.
       */
      id: 'vesijohto',
      nappi: 'Vesi, joka tuli vuorilta ilman ainuttakaan pumppua',
      otsikko: 'Ensimmäinen vuoristovesijohto',
      teksti: 'Wienin ensimmäinen vuoristovesijohto avattiin 24. lokakuuta 1873, ja '
        + 'samana päivänä alkoi toimia Hochstrahlbrunnen-suihkulähde '
        + 'Schwarzenbergplatzilla. Vesi tulee Rax- ja Schneeberg-vuorten lähteiltä '
        + 'kaupunkiin kokonaan painovoiman avulla, ilman yhtäkään pumppua. Matkalla '
        + 'on noin 30 akveduktia.'
        + '\n\n'
        + 'Vesijohdon rakensi urakoitsija Antonio Gabrielli Lontoosta. Hän tarjoutui '
        + 'itse, että yksi prosentti hänen tuloistaan pidätettäisiin, kunnes summa '
        + 'olisi 100 000 guldenia. Vesijohto on yhä käytössä.'
        + '\n\n'
        + 'Isoisäsi matkavuonna 1873 vesijohto oli vasta valmistumassa. Se avattiin '
        + '24. lokakuuta, kun maailmannäyttely Praterissa oli lopuillaan, joten jos '
        + 'isoisäsi kävi Wienissä aiemmin vuonna, vesijohtoa ei ollut vielä avattu.',
      lahde: 'Matkakirjan oma teksti · lähteinä Wiener Wasser (MA 31), Wien Geschichte Wiki, Wienbibliothek digital ja Wien Tourismus',
      /*
       * Commons 28.8.2026: 4032×3024, CC BY-SA 4.0, Anna Saini,
       * kuvattu 19.9.2019, kuvaus "Teil der 1. Wiener
       * Hochquellenleitung". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on kadun ylittävä akvedukti, ei tunnistettavia
       * ihmisiä. Kuvateksti ilman pituusväitettä (KK 17.11.2026).
       */
      kuva: {
        tiedosto: 'Aquädukt Liesing- Teil der 1. Wiener Hochquellenleitung 1.jpg',
        lyhyt: 'Ensimmäisen vuoristovesijohdon akvedukti Liesingissä, vesi kulkee painovoimalla.',
        selite: 'Ensimmäisen vuoristovesijohdon akvedukti Liesingissä. '
          + 'Vesi kulkee koko matkan painovoiman varassa.',
        lahde: 'Anna Saini, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miten vesi kulkee Wienin ensimmäisessä vuoristovesijohdossa '
          + 'vuorilta kaupunkiin?',
        vaihtoehdot: [
          'Höyrypumppujen työntämänä',
          'Kokonaan painovoiman avulla',
          'Hevosvetoisilla vesivaunuilla',
        ],
        oikea: 1,
        fakta: 'Johto avattiin 24. lokakuuta 1873, ja matkalla on noin 30 '
          + 'akveduktia. Vesijohto on yhä käytössä.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       * Faktat: takyt-wien.md, täky 12 (VARMA). Aineiston ikäsopivuus-
       * ohje noudatettu: hautausmaa kerrotaan luontoalueena ja
       * kaupungin osana, ei kuoleman kuvauksena, eikä uhrilukuja tai
       * vandalismikohtia oteta mukaan.
       */
      id: 'kauriit',
      nappi: 'Hautausmaa, jolla asuu kaksikymmentä kaurista',
      otsikko: 'Keskushautausmaan asukkaat',
      teksti: 'Wienin keskushautausmaa on kaksi ja puoli neliökilometriä '
        + 'ja siihen on haudattu noin kolme miljoonaa ihmistä — enemmän '
        + 'kuin kaupungissa nykyään asuu. Koon ja tiheän puuston takia '
        + 'se on myös luontoalue. Näkyvimpiä asukkaita ovat oravat, '
        + 'joita wieniläiset kutsuvat nimellä Hansi ja jotka ovat '
        + 'tottuneet vierailijoiden pähkinöihin. Suurimpia ovat '
        + 'kuitenkin noin kaksikymmentä kaurista, jotka viihtyvät '
        + 'mieluiten vanhan juutalaisen hautausmaan alueella, koska '
        + 'vanhojen hautakivien ympärillä kasvaa ikivihreitä kasveja — '
        + 'luotettava ravinnonlähde kylmään aikaan. Lisäksi alueella '
        + 'elää tuulihaukkoja, peltohamstereita, mäyriä, näätiä ja '
        + 'sammakoita. 1980-luvun puoliväliin asti hautausmaa oli '
        + 'virallinen metsästysalue ja riistakantaa hoiti palkattu '
        + 'metsästäjä; nykyään tasapainoa pidetään ilman aseita, ja osa '
        + 'alueesta jätetään tarkoituksella villiintymään.',
      lahde: 'de-Wikipedia "Wiener Zentralfriedhof". Tarkistettu 1.9.2026.',
      /*
       * Commons 28.8.2026: 5822×3881, CC BY-SA 4.0, Uoaei1, kuvattu
       * 21.10.2022, kuvaus "Roe deer in the old Israelite section of
       * Central Cemetery, Vienna". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: kuvassa on neljä kaurista nurmella, ei ihmisiä eikä
       * luettavia nimiä hautakivissä.
       */
      kuva: {
        tiedosto: 'Capreolus capreolus Wien Zentralfriedhof 20221021 01.jpg',
        selite: 'Kauriita Wienin keskushautausmaan vanhalla '
          + 'juutalaisella osalla, jossa ne viihtyvät parhaiten.',
        lahde: 'Uoaei1, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi kauriit pysyttelevät mieluiten hautausmaan '
          + 'vanhimmalla osalla?',
        vaihtoehdot: [
          'Siellä niitä ruokitaan',
          'Siellä on hiljaisinta',
          'Siellä kasvaa ikivihreitä kasveja hautakivien ympärillä',
        ],
        oikea: 2,
        fakta: 'Hautausmaa oli virallinen metsästysalue 1980-luvun '
          + 'puoliväliin asti. Nykyään osa alueesta jätetään '
          + 'tarkoituksella villiintymään.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen ISOISÄN PULMAN (ks. tiedoston alku):
   * merkintä antaa päivien lukumäärän, oppitunti avajaispäivän, ja
   * pelaaja laskee niistä romahduspäivän.
   *
   * OPPITUNTI EI SANO ROMAHDUSPÄIVÄÄ. Se on kysymyksen vastaus, ja
   * pulman idea on juuri laskeminen — päivämäärän kirjoittaminen tähän
   * tekisi kohtaamisesta muistikokeen.
   *
   * FAKTAT: takyt-wien.md, täyt 1 ja 2 (molemmat VARMOJA, de-Wikipedia
   * "Rotunde (Wien)" ja "Weltausstellung 1873"). Pantheonin kupolin
   * mitta on samasta lähteestä ja täsmää pelin omaan Rooma-aineistoon
   * (js/packs/nahtavyysjutut.js).
   */
  oppitunti: {
    otsikko: 'Rotunde — kupoli, joka avattiin ensimmäisenä toukokuuta',
    teksti: 'Keisari Franz Joseph avasi maailmannäyttelyn Praterissa 1. '
      + 'toukokuuta 1873. Näyttelyn tunnukseksi nousi Rotunde, pyöreä '
      + 'kupolirakennus, jonka halkaisija oli 108 metriä ja korkeus 84 '
      + 'metriä. Se oli aikanaan ylivoimaisesti maailman suurin kupoli: '
      + 'Rooman Pantheon, jonka se päihitti, on halkaisijaltaan 43,4 '
      + 'metriä, ja Rotunden ennätys kesti 84 vuotta — sen ylitti vasta '
      + '1957 eräs messuhalli Belgradissa. Kupoli lepäsi 32 '
      + 'rautapylvään varassa, ja sen huipulla oli kullattu, kivin '
      + 'koristeltu neljä metriä korkea jäljennös Itävallan '
      + 'keisarinkruunusta, joka näkyi koko näyttelyalueelle. '
      + 'Ensimmäiset piirustukset teki skotlantilainen '
      + 'laivanrakennusinsinööri John Scott Russell. Rakennusta ei '
      + 'purettu näyttelyn jälkeen: siitä tuli kaupungin oma maamerkki, '
      + 'jossa pidettiin sirkusnäytöksiä, sähkönäyttely ja vuoden 1898 '
      + 'autonäyttely. Se paloi 17. syyskuuta 1937: kupolissa oli 400 '
      + 'tonnia puuta, sammutusmiehistö vedettiin ulos sortumisvaaran '
      + 'takia, ja kolme minuuttia myöhemmin kupoli romahti. Seuraavan '
      + 'päivän lehden otsikko kuului: Wienillä ei ole enää Rotundea.',
    /*
     * PÄÄKUVAKSI LOISTOAIKA (29.8.2026, aalto 1). Sama malli kuin
     * täkynostoilla v1307:stä alkaen: repon oma generoitu havainnekuva,
     * jolla ei ole Commons-nimeä eikä varareittiä, joten kenttä on
     * `osoite` eikä `tiedosto` (js/fokusvirta.js kuvanOsoite).
     *
     * EI PÄÄLLEKKÄINEN TÄMÄN TIEDOSTON NOSTOKUVAN KANSSA. Noston
     * maailmannayttely-1873 pääkuva näyttää alueen ULKOA (Rotunde,
     * lippurivit ja paviljongit hiekkakäytävineen); tämä on kupolin
     * SISUS, eli juuri se, mistä oppitunti kertoo — 108 metrin
     * halkaisija ja rautapylväiden varassa lepäävä katto.
     *
     * SILMÄTARKISTUS 29.8.2026: ei tekstiä, ei nykyaikaa; liput ovat
     * pelkkiä värikenttiä ilman kirjaimia, asut ja osastot 1870-lukua.
     */
    kuva: {
      osoite: 'assets/kartat/nostot/nosto-rotunde-loistoaika.webp',
      lyhyt: 'Rotunden sisus näyttelyssä: rautakupoli valoaukkoineen ja osastot suihkulähteen ympärillä.',
      selite: 'Rotunden sisus näyttelyn ollessa auki: rautarakenteinen '
        + 'kupoli valoaukkoineen, lippurivit ja näytteilleasettajien '
        + 'osastot keskussuihkulähteen ympärillä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
    },
    /*
     * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
     * ja lähde ennallaan.
     *
     * Commons 28.8.2026: 1404×1098, public domain, Wiener
     * Photographen-Association, 1873, kuvaus "Main Entrance of the
     * Rotunde with topping-out decoration, Expo 1873". Restrictions
     * tyhjä. SILMÄTARKISTUS tehty: portilla seisoo aikalaisia
     * kaukaisina hahmoina, kaikki 1873.
     */
    valokuva: {
      tiedosto: 'Rotunde Weltausstellung 1873.jpg',
      selite: 'Rotunden pääsisäänkäynti harjannostajaisköynnöksin '
        + 'vuonna 1873. Kupolin halkaisija oli 108 metriä.',
      lahde: 'Wiener Photographen-Association 1873, Wikimedia Commons '
        + '(public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'wien'): suntio
   * Anton hoitaa holvien kynttilöitä ja saattajien kirjaa, johon
   * isoisä on jättänyt kysymyksen. Kysymys on v1301:ssä vaihdettu
   * ISOISÄN PULMAKSI (ks. tiedoston alku) — tämä kortti ei kertaa
   * Antonin omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Suntio Anton',
    nappi: 'Tapaa suntio',
    teksti: 'Anton on kantanut kynttilänsammutinta holvien portailla '
      + 'niin kauan, että tunnistaa vieraan askelista, kuinka pitkälle '
      + 'tämä aikoo laskeutua. Saattajien kirjaa hänen sukunsa on '
      + 'pitänyt kolmessa polvessa, ja siinä on nimiä, joiden vieressä '
      + 'lukee vain kellonaika. Hän ei kysele matkasta. Ennen kuin hän '
      + 'kääntää sivun, hän haluaa tietää, onko vieras lukenut isoisänsä '
      + 'merkinnän tarkkaan vai vain kauniisti.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: STEPHANSDOMIN KATAKOMBIT. Tarinakaaren teksti
   * vie isoisän kirkon alle luukammioihin, ja pelin oma Wien-aineisto
   * (js/packs/nahtavyysjutut.js, Stephansdom) kertoo saman: kirkon
   * alla kiemurtelevissa katakombeissa lepää yli 11 000 ihmisen
   * jäännökset.
   *
   * 48,2085 N / 16,373 E — en-Wikipedia "St. Stephen's Cathedral,
   * Vienna", prop=coordinates (haettu 28.8.2026). Muunnos on sama
   * kaava ja samat vakiot kuin fokuskohteilla: maailmankartalla
   * Millerin lieriö LEVEYS 12000 / LON0 −175 / POHJOINEN 76
   * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((16,373 − (−175)) mod 360) × (12000/360)
   *                     = 191,373 × 33,3333… = 6379,1
   *                   y = (millerY(48,2085) − millerY(76)) × 12000/2π
   *                     = 1467,3
   *   europe          x = (16,373 + 11) × 19,2 = 525,6
   *                   y = (72 − 48,2085) × 26,3 = 625,7
   *
   * TARKISTUS WIENIN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 526 / 626, eli piste on sen vieressä. Niin pitääkin — tuomiokirkko
   * seisoo vanhankaupungin keskellä, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Stephansdomin katakombit',
    laudat: {
      maailmankartta: { x: 6379.1, y: 1467.3 },
      europe: { x: 525.6, y: 625.7 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Wienin sivupino (js/lehti.js
   * rakennaSivut) on täsmälleen Sofian mittainen, koska kaupungilla on
   * kaksi kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Wien", 2 = Musiikki, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Tonava kaunoinen) väistyy nimetyn tieltä,
   * joten sivulla on Raamatun vaatima yksi minitehtävä eikä kahta.
   * Sivun 1 kysymys on Wienin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: TAIKAHUILU_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: LIPIZZANI_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Itävalta) ----------
   *
   * SIIRRETTY TÄNNE v1297:n maapoolista (js/fokusnosto.js NOSTO_MAAT,
   * avain AUT) sanasta sanaan: otsikot, lunastukset, lähteet, kuvat,
   * kysymykset ja koordinaatit ovat bitilleen samat, vain sijainti
   * vaihtui. Kahta kopiota ei ole — js/fokusnosto.js lukee AUT-poolin
   * tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Järjestys on siksi säilytetty muuttumattomana.
   *
   * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU: ensimmäinen nosto kertoo
   * näyttelyn avajaisista ja pörssiromahduksesta, tämän tiedoston
   * oppitunti taas rakennuksesta ja sen kohtalosta. Sama viikko, eri
   * juttu — eikä oppitunti toista romahduspäivää, koska se on
   * kohtaamisen pulman vastaus.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * takynostot-itavalta.md, ehdokas 1 (VARMA). Aineiston rajaus
       * noudatettu sanatarkasti: romahdusta seurannutta
       * antisemitististä aaltoa EI oteta otsikkoon eikä lunastukseen.
       *
       * ISOISÄN MATKAVUOSI MAINITAAN VAIN LUKUNA. Kaanoni antaa Wienin
       * 1873-ankkuriksi vuoristovesijohdon (docs/isoisan-raamattu.md:
       * *"Wien (hengähdys: kahvila, vesijohto 1873)"*), joten näyttelyä
       * ei sidota isoisän omaan matkaan — vuosiluku riittää, ja pelaaja
       * tunnistaa sen päiväkirjan vuodeksi itse.
       */
      id: 'maailmannayttely-1873',
      nimio: 'Näyttely ja pörssi',
      symboli: 'kauppa',
      /*
       * KAUPUNKIKATOSTA VAPAA (js/fokuskohteet.js, osio KATTOVAPAA):
       * näyttelyalue oli Praterissa, joka jää Wienin kohdekartan
       * lepotilan näkymän (itäraja 16,404) itäpuolelle, joten merkki
       * kuuluu pääkartalle.
       */
      kattoVapaa: true,
      // Sääntö 11 (SK 17.11.2026): vain kahden lähteen väitteet. Pois jäivät keisarin puhe (yksi lähde), "maan suurin pankki",
      // meklari Petschekin nimi ja titteli (vain Rieder), "120 pankkia" (lähteet sanovat 120 maksukyvyttömyyttä/yritystä),
      // poliisin sulkema pörssi kello 13 (vain WGW ja Austria-Forum/de-Wikipedia), Berliini ja New York, 7,25 miljoonaa ja 15 miljoonan tappio.
      otsikko: 'Maailmannäyttely avattiin, ja kahdeksan päivää myöhemmin '
        + 'pörssi romahti',
      lunastus: [
        'Keisari Franz Joseph avasi Wienin maailmannäyttelyn 1. toukokuuta '
          + '1873. Huhtikuun lopussa Creditanstalt oli myynyt arvopapereita '
          + '20 miljoonan guldenin arvosta.',
        'Perjantaina 9. toukokuuta 1873 eräs arvostettu wieniläinen '
          + 'kommissiotalo ilmoitti maksukyvyttömyydestään, ja pörssin kurssit '
          + 'romahtivat. Samana päivänä maksukyvyttömyyksiä oli '
          + 'Itävalta-Unkarissa 120. Päivä tunnetaan Itävallan historiassa '
          + 'nimellä ”musta perjantai”. Näyttelylle odotettiin 20 miljoonaa '
          + 'kävijää, mutta niitä tuli noin seitsemän miljoonaa, ja näyttely '
          + 'jätti valtion talouteen suuren aukon.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Wien Tourismus, Wien Geschichte Wiki, '
        + 'Saksan historian museo (DHM) ja Austria-Forum. Tarkistettu 17.11.2026.',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (28.8.2026, sama malli kuin Sofian
       * areenalla ja v1307:n neljällä nostolla): repon oma generoitu
       * havainnekuva, jolla ei ole Commons-nimeä eikä varareittiä,
       * joten kenttä on `osoite` eikä `tiedosto` (js/fokusnosto.js
       * asetaNostonKuva).
       *
       * Kuva on näyttely auki: Rotunde, lippurivit ja kävijöitä — se
       * loisto, jonka rinnalla noston toinen puoli (pörssin sulkeminen
       * kahdeksan päivää myöhemmin) tekee vaikutuksensa.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-maailmannayttely-1873-loistoaika.webp',
        selite: 'Maailmannäyttelyn Rotunde Praterissa: lippurivit, '
          + 'paviljongit ja kävijöitä hiekkakäytävillä.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 25.8.2026: 2166×1503, public domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Weltausstellungsgelände-Wien-1873.jpg',
        selite: 'Maailmannäyttelyn alue Praterissa vuonna 1873.',
        lahde: 'Historisches Museum der Stadt Wien 1873, Wikimedia Commons '
          + '(public domain)',
      },
      /*
       * ISOISÄN KARTTALIITE — PILOTTI (Raamattu, osio "Fokusmoodi":
       * *"1800-luvun kaiverrettu ... kartta ... ikään kuin isoisä olisi
       * taittanut sen matkakirjan väliin"*, omistajan linjaus
       * 29.8.2026).
       *
       * KUVATYYPPIEN ROOLIJAKO on Raamatun oma: valokuva = nykyhetki,
       * loistoaikakuva = mennyt elävänä, KAIVERRUSKARTTA = paikka
       * sellaisena kuin isoisä sen tunsi. Tämän noston kolme kuvaa ovat
       * juuri ne kolme roolia, tässä järjestyksessä.
       *
       * AITO AIKALAISKARTTA, EI GENEROITU (linjauksen ensisijaisuus).
       * Commons 29.8.2026: "Montage Plan Weltausstellung 1873.jpg",
       * 3920×2812, public domain (PD-old, tekijä tuntematon, teos 1873),
       * Restrictions tyhjä. Lehti on koko näyttelyalueen virallinen
       * kartta: ylälaidassa keisarin mitalikuva ja Rotunden julkisivu,
       * alla Prater vyöhykkeineen — ja arkin poikki kulkevat taitteet,
       * jotka tekevät fiktion itsestään selväksi.
       *
       * KENTTÄ ON `osoite` EIKÄ `tiedosto`: kartta on repossa omana
       * webp-liitteenään (assets/kartat/karttaliitteet/), koska sitä
       * luetaan suurentaen — verkon varassa oleva Commons-thumb jättäisi
       * lentokoneessa kortin kolmannen kuvan tyhjäksi.
       */
      kartta: {
        osoite: 'assets/kartat/karttaliitteet/liite-maailmannayttely-1873.webp',
        lyhyt: 'Näyttelyalueen kartta 1873: Rotunde keskellä, teollisuuspalatsin siivet ja oma rautatieasema.',
        selite: 'Näyttelyalueen kartta vuodelta 1873: Rotunde keskellä, '
          + 'teollisuuspalatsin siivet itään ja länteen, sisäänkäynnit '
          + 'Hauptalleelta ja oma rautatieasema pohjoisessa.',
        lahde: '"Weltausstellung Wien im Jahre 1873", tuntematon tekijä '
          + '1873, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Mitä maailmannäyttelyssä 1873 oli nähtävänä?',
        'Mikä aiheutti Wienin pörssiromahduksen?',
        'Kuinka monta kävijää maailmannäyttelylle odotettiin?',
      ],
      visa: {
        kysymys: 'Montako kävijää Wienin maailmannäyttelylle odotettiin?',
        vaihtoehdot: [
          'Noin 7 miljoonaa',
          '20 miljoonaa',
          '120 miljoonaa',
        ],
        oikea: 1,
        fakta: 'Näyttelylle odotettiin 20 miljoonaa kävijää, mutta niitä tuli noin seitsemän miljoonaa.',
      },
      // 48,21222222 N / 16,40944444 E — de-Wikipedia "Rotunde (Wien)",
      // näyttelyn tunnusrakennus Praterin alueella.
      paikka: {
        nimi: 'Prater',
        laudat: {
          maailmankartta: { x: 6380.3, y: 1467.2 },
          europe: { x: 526.3, y: 625.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-itavalta.md, ehdokas 4 (VARMA).
       * Aineiston huomautus noudatettu: eläintarhan ikää ja
       * Kaiserpavillonia ei toisteta, koska ne ovat jo pelissä
       * (js/packs/kulttuuri-kategoriat.js) — tästä kerrotaan vain se,
       * mitä kirahvi sai aikaan.
       */
      id: 'kirahvimuoti',
      nimio: 'Kirahvi ja muoti',
      symboli: 'kulttuuri',
      /*
       * KAUPUNKIKATOSTA VAPAA (js/fokuskohteet.js, osio KATTOVAPAA):
       * Schönbrunnin eläintarha on kaupunkilehden kohdekartan
       * länsipuolella, joten merkki kuuluu pääkartalle.
       */
      kattoVapaa: true,
      otsikko: 'Yksi kirahvi muutti koko kaupungin muodin — kampaukset, '
        + 'hajuveden ja näytelmän',
      lunastus: [
        'Schönbrunnin eläintarha sai ensimmäisen kirahvinsa vuonna 1828 '
          + 'lahjaksi Egyptin varakuninkaalta. Eläin herätti sellaisen '
          + 'innostuksen, että se levisi muotiin, käsitöihin ja '
          + 'seuraelämään.',
        'Kirahvikuvioita ilmestyi vaatteisiin, kenkiin ja käyttöesineisiin, '
          + 'ja kirahvin innoittamina keksittiin uusia kampauksia, hajuvesi, '
          + 'näytelmä ja kaksi sävellystä. Tarha itse oli tuolloin yhä '
          + 'keisariperheen yksityisomaisuutta, ja se pysyi sellaisena aina '
          + 'Itävalta-Unkarin hajoamiseen 1918 asti.',
      ],
      lahde: 'en-Wikipedia "Schönbrunn Zoo", osiot "Founding and early years" ja "In '
        + 'the 19th century" (tarkistettu 25.8.2026).',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (28.8.2026, sama malli kuin yllä): repon
       * oma generoitu havainnekuva, joten kenttä on `osoite` eikä
       * `tiedosto`.
       *
       * Kuva kertoo noston molemmat puolet yhdellä kertaa: eläin
       * aitauksessaan JA yleisö, jonka kampauksiin ja huiveihin
       * kirahvi on jo ehtinyt.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-kirahvimuoti-loistoaika.webp',
        selite: 'Schönbrunnin kirahvi aitauksessaan ja yleisö, jonka '
          + 'kampaukset ja huivit ovat jo kirahvin mukaisia.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 25.8.2026: 3702×2718, public domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Eduard Gurk - Die erste Giraffe im Schönbrunner Tiergarten - 1828.jpeg',
        selite: 'Schönbrunnin ensimmäinen kirahvi Eduard Gurkin maalauksessa '
          + 'samalta vuodelta, jona se saapui.',
        lahde: 'Eduard Gurk 1828, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirahvi oli 1800-luvun Euroopassa niin suuri uutinen?',
        'Miten eläimiä kuljetettiin Egyptistä Wieniin?',
        'Millainen paikka Schönbrunnin eläintarha oli 1800-luvulla?',
      ],
      visa: {
        kysymys: 'Keneltä Schönbrunnin eläintarha sai ensimmäisen kirahvinsa vuonna 1828?',
        vaihtoehdot: [
          'Egyptin varakuninkaalta',
          'Ranskan kuninkaalta',
          'Venetsian doogelta',
        ],
        oikea: 0,
        fakta: 'Kirahvi tuli lahjaksi Egyptin varakuninkaalta, ja kirahvi-innostus levisi muotiin, käsitöihin ja seuraelämään.',
      },
      // 48,1845 N / 16,3119 E — takyt-wien.md, täky 10
      // (Tiergarten Schönbrunn).
      paikka: {
        nimi: 'Schönbrunn',
        laudat: {
          maailmankartta: { x: 6377.1, y: 1468.4 },
          europe: { x: 524.4, y: 626.3 },
        },
      },
    },
    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTAUUDISTUS, ERÄ 10 (13.9.2026): WIENIN KAUPUNKILEHDEN SIVUT
     * NOSTOIKSI.
     *
     * Sama jako kuin Pariisissa erässä 5
     * (docs/raportit/viesti-fable-karttauudistus-era5-20260913.md,
     * suunnitelman luku 4.7): lehden aihesivujen nostot ovat nyt
     * klikattavia karttapaloja kaupungin kohdekartalla. Kaikki tämän erän
     * nostot ovat KOHDEKARTALLA, eivät pääkartalla — omistajan sääntö
     * 2.9.2026 (tests/nostot-kartalla.test.mjs).
     *
     * TEKSTIÄ EI OLE KIRJOITETTU UUDESTAAN. Jokainen `lunastus`-kappale on
     * lehden oman noston `teksti` SANATARKASTI
     * (js/packs/kulttuuri-kategoriat.js, kaupunki `wien`), ja `kuva` on
     * lehden oma kuvarivi kenttineen. Siirto on tehty ohjelmallisesti ja
     * todennettu ===-vertailulla
     * (tools/savukkeet/savuke-kaupunkien-nostot.mjs vartio 4b avaa jokaisen
     * kortin selaimessa ja vertaa merkki merkiltä).
     *
     * MINIKYSYMYKSET (erän 6 datamalli, kiintiö joka kolmas nosto):
     * `praterin-ratas`, `taikahuilu-wiedenissa`.
     * ══════════════════════════════════════════════════════════════
     */
    {
      id: 'praterin-ratas',
      nimio: 'Praterin jättiratas',
      otsikko: 'Ratas, joka kulkee kävelyä hitaammin',
      symboli: 'historia',
      lunastus: [
        'Praterin jättiratas valmistui 1897, ja se rakennettiin keisari Frans Joosefin 50-vuotishallitsijajuhlan kunniaksi. Rattaassa oli alun perin 30 '
          + 'vaunua. Vuonna 1944 ratas paloi pahoin, ja vaunut tuhoutuivat. Kun ratas '
          + 'avattiin uudelleen 1947, vaunuja ripustettiin takaisin 15. Vuonna 2016 '
          + 'vaunut uusittiin alkuperäisten piirustusten mukaan, ja jokaisen sivulla on kuusi ikkunaa, kuten ennen paloa. Ratas kulkee enintään 2,7 kilometriä tunnissa.',
        'Isoisäsi matkavuonna 1873 jättiratasta ei vielä ollut, sillä se valmistui '
          + 'vasta 1897. Praterissa seisoi silloin maailmannäyttelyn Rotunde, 108 '
          + 'metriä leveä kupolirakennus, jota pidettiin aikansa suurimpana. Rotunde '
          + 'paloi 1937.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Wiener Riesenrad, Wien Geschichte Wiki, AEIOU, Wien Tourismus ja ORF Wien',
      kuva: {
        tiedosto: 'Riesenrad Wiener Prater 2020-07-12 d.jpg',
        lyhyt: 'Praterin jättiratas vuonna 2020; ratas kulkee enintään 2,7 kilometriä tunnissa.',
        selite: 'Praterin jättiratas vuonna 2020. Vaunut uusittiin 2016, ja ratas '
          + 'kulkee enintään 2,7 kilometriä tunnissa.',
        lahde: 'Manfred Werner (Tsui), Wikimedia Commons (CC BY-SA 4.0)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Sama kuvasarja
       * kuin lehden nostolla, josta tämä kortti kirjoitettiin: erässä 10
       * se jäi siirtämättä, koska nostokortti ei tuntenut `galleria`-
       * kenttää. Nyt tuntee (js/fokusnosto.js piirraNostonKuvasarja).
       */
      galleria: [
        {
          otsikko: 'Koko ratas kerralla',
          tiedosto: 'Wiener Riesenrad DSC02378.JPG',
          lyhyt: 'Praterin jättiratas kokonaisuudessaan; vaunut uusittiin 2016.',
          selite: 'Praterin jättiratas kokonaisuudessaan. Vuonna 2016 vaunut '
            + 'uusittiin alkuperäisten piirustusten mukaan.',
          lahde: 'David Monniaux, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      kysymykset: [
        'Miksi Praterin jättiratas rakennettiin?',
        'Mitä rattaalle tapahtui vuonna 1944?',
        'Millainen oli Rotunde, joka seisoi Praterissa isoisän matkavuonna 1873?',
      ],
      visa: {
        kysymys: 'Milloin Praterin jättiratas valmistui?',
        vaihtoehdot: [
          '1873',
          '1897',
          '1937',
        ],
        oikea: 1,
        fakta: 'Vuonna 1873 Praterissa seisoi maailmannäyttelyn Rotunde. '
          + 'Ratas kulkee enintään 2,7 kilometriä tunnissa.',
      },
      paikka: {
        nimi: 'Praterin jättiratas',
        laudat: {
          maailmankartta: { x: 6379.9, y: 1467 },
          europe: { x: 526, y: 625.5 },
        },
      },
    },
    {
      id: 'lipizzanit',
      nimio: 'Lipizzanit',
      otsikko: 'Valkoiset hevoset syntyvät tummina',
      symboli: 'historia',
      lunastus: [
        'Espanjalainen ratsastuskoulu toimii Hofburgin palatsissa Wienissä salissa, '
          + 'joka rakennettiin 1729 ja 1735 välillä keisari Kaarle VI:n aikana. Salia koristaa yhä hallitsijan ratsastusmuotokuva.',
        'Lipizzanit syntyvät tummina ja vaalenevat vuosien kuluessa, ja noin '
          + 'kymmenvuotiaina ne ovat yleensä valkoisia. Ratsastuskoulun oman sivun '
          + 'mukaan perinteeseen kuuluu, että tallissa on aina vähintään yksi ruunikko, '
          + 'onnea tuomaan. Nykyään nuoret oriit tulevat Piberin siitostallista '
          + 'Steiermarkista, ja ratsastuskoulun mukaan ne siirtyvät noin nelivuotiaina '
          + 'koulutukseen Heldenbergiin tai Wieniin.',
        'Isoisäsi matkavuonna 1873 koulu toimi hovin ratsastuskouluna samassa '
          + 'salissa, mutta hevoset eivät vielä tulleet Piberistä: Piberin siitostila oli perustettu jo 1798, mutta lipizzanien kasvatus siirtyi sinne vasta 1920. Ratsastuskoulun mukaan hevoset tulivat ennen Lipizzan '
          + 'hovitallista nykyisessä Sloveniassa.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Spanische Hofreitschule, Wien Geschichte Wiki, Austria Tourismus, Wien Tourismus ja AEIOU',
      kuva: {
        tiedosto: 'Kawecan.jpg',
        lyhyt: 'Aikuinen lipizzaniori; lipizzanit syntyvät tummina ja vaalenevat vuosien kuluessa.',
        selite: 'Aikuinen lipizzaniori. Lipizzanit syntyvät tummina ja vaalenevat '
          + 'vuosien kuluessa; noin kymmenvuotiaina ne ovat yleensä valkoisia.',
        lahde: 'Eerschay, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Mistä lipizzanit tulivat Wieniin ennen vuotta 1920?',
        'Miten lipizzanien väri muuttuu vuosien kuluessa?',
        'Milloin ratsastuskoulun talvikoulu valmistui?',
      ],
      visa: {
        kysymys: 'Minkä väriset lipizzanit ovat syntyessään?',
        vaihtoehdot: [
          'Valkoiset',
          'Kirjavat',
          'Tummat',
        ],
        oikea: 2,
        fakta: 'Lipizzanit syntyvät tummina ja vaalenevat vuosien kuluessa, ja noin kymmenvuotiaina ne ovat yleensä valkoisia.',
      },
      paikka: {
        nimi: 'Lipizzanit',
        laudat: {
          maailmankartta: { x: 6378.9, y: 1467.4 },
          europe: { x: 525.4, y: 625.8 },
        },
      },
    },
    {
      id: 'taikahuilu-wiedenissa',
      wiki: 'Taikahuilu',
      nimio: 'Taikahuilu',
      otsikko: 'Taikahuilu tehtiin esikaupungin teatteriin',
      symboli: 'kulttuuri',
      lunastus: [
        'Taikahuilu sai ensi-iltansa 30. syyskuuta 1791 Freihaustheaterissa '
          + 'Wiedenin esikaupungissa. Emanuel '
          + 'Schikaneder johti teatteria 1789 alkaen, kirjoitti oopperan sanat ja '
          + 'esitti itse linnustaja Papagenoa. Ooppera ei syntynyt hovia varten: '
          + 'Schikaneder pyysi Mozartilta kansanomaista oopperaa omaan teatteriinsa. Se '
          + 'kuuluu saksalaiseen Singspiel-perinteeseen, jossa yleisön piti ymmärtää '
          + 'teksti. Mozart kuoli 5. joulukuuta 1791, kaksi kuukautta ensi-illan '
          + 'jälkeen.',
        'Schikaneder rakennutti uuden teatterin, ja Theater an '
          + 'der Wien avattiin 13. kesäkuuta 1801. Sen portin päällä on veistos, joka '
          + 'muistuttaa Schikanederista: hän on Papagenon asussa ja soittaa huilua.',
        'Isoisäsi matkavuonna 1873 Taikahuilun teatteri ei ollut enää käytössä, '
          + 'sillä Freihaustheaterin viimeinen esitys oli ollut 1801. Theater an der '
          + 'Wienissä sai ensi-iltansa juuri 1873 Johann Strauss nuoremman operetti '
          + 'Carneval in Rom, ja Papageno-veistos oli jo portin päällä. '
          + 'Wienin kaupungin historiasivuston mukaan Freihaus-kortteli seisoi yhä, koska sen purkaminen estyi vuoden 1873 pörssiromahduksessa.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Wien Geschichte Wiki, habsburger.net ja Bezirksmuseum Mariahilf',
      kuva: {
        tiedosto: 'Karl Friedrich Schinkel - Die Sternenhalle der Königin der Nacht (ca. 1815).jpg',
        lyhyt: 'Karl Friedrich Schinkelin lavastusluonnos Yön kuningattaren tähtisalista, noin 1815.',
        selite: 'Karl Friedrich Schinkel maalasi noin 1815 Yön kuningattaren tähtisalin '
          + 'lavastuksen Taikahuilun Berliinin tuotantoon.',
        lahde: 'Karl Friedrich Schinkel, Wikimedia Commons (PD)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Sama kuvasarja
       * kuin lehden nostolla, josta tämä kortti kirjoitettiin: erässä 10
       * se jäi siirtämättä, koska nostokortti ei tuntenut `galleria`-
       * kenttää. Nyt tuntee (js/fokusnosto.js piirraNostonKuvasarja).
       */
      galleria: [
        {
          otsikko: 'Papagenon portti',
          tiedosto: 'Theater an der Wien.jpg',
          lyhyt: 'Theater an der Wienin portin päällä oleva veistos muistuttaa Schikanederista Papagenon asussa.',
          selite: 'Theater an der Wienin portin päällä oleva veistos muistuttaa '
            + 'Schikanederista: hän on Papagenon asussa ja soittaa huilua.',
          lahde: 'Yair Haklai, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      /*
       * MUSIIKKI JA ÄÄNI KORTILLE (avoin kohta 11.1, 14.9.2026). Erässä 10
       * tämä nosto jäi lehden sivulle kaksoiskappaleeksi vain siksi, että
       * musiikkilinkille ja ääninäytteelle ei ollut paikkaa kortilla.
       * Kortti piirtää ne nyt SAMOILLA napeilla kuin lehti (js/ui.js
       * lisaaNostonNapit), joten sivulta jäänyt kaksoiskappale purkautui.
       */
      musiikki: 'https://music.apple.com/fi/search?term=Mozart%20Zauberfl%C3%B6te%20K%C3%B6nigin%20der%20Nacht',
      musiikkiNimi: 'Taikahuilu Apple Musicissa',
      musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/de/W._A._Mozart_-_Die_Zauberfl%C3%B6te_-_18._Der_H%C3%B6lle_Rache_kocht_in_meinem_Herzen_%28Ferenc_Fricsay%2C_1953%29.ogg/W._A._Mozart_-_Die_Zauberfl%C3%B6te_-_18._Der_H%C3%B6lle_Rache_kocht_in_meinem_Herzen_%28Ferenc_Fricsay%2C_1953%29.ogg.mp3',
      musiikkiNayteNimi: 'Mozart: Yön kuningattaren aaria — johtaa Ferenc Fricsay, äänitetty 1953 (PD)',
      kysymykset: [
        'Missä Taikahuilu sai ensi-iltansa 1791?',
        'Milloin Theater an der Wien avattiin?',
        'Mitä Theater an der Wienin portin päällä oleva veistos esittää?',
      ],
      visa: {
        kysymys: 'Kuka kirjoitti Taikahuilun sanat ja esitti ensi-illassa linnustaja Papagenoa?',
        vaihtoehdot: [
          'Lorenzo Da Ponte',
          'Antonio Salieri',
          'Emanuel Schikaneder',
        ],
        oikea: 2,
        fakta: 'Schikaneder johti Freihaustheateria 1789 alkaen. Mozart kuoli 5. joulukuuta 1791, kaksi kuukautta ensi-illan jälkeen.',
      },
      paikka: {
        nimi: 'Taikahuilu',
        laudat: {
          maailmankartta: { x: 6378.8, y: 1467.8 },
          europe: { x: 525.4, y: 626 },
        },
      },
    },
    {
      id: 'tonava-kaunoinen',
      wiki: 'Johann Strauss nuorempi',
      nimio: 'Tonava kaunoinen',
      otsikko: 'Kaupunki sävelsi oman jokensa',
      symboli: 'kulttuuri',
      lunastus: [
        'Johann Strauss nuoremman valssi Tonava kaunoinen kantaesitettiin Wienissä '
          + '15. helmikuuta 1867 Dianabadissa. Dianabad oli uimalaitos Leopoldstadtin '
          + 'kaupunginosassa. Talvella uimahalli muutettiin tanssi- ja '
          + 'konserttisaliksi, jota kutsuttiin Dianasaliksi.',
        'Valssin ensimmäinen versio oli mieskuorolle, ja Wienin Männergesang-Verein '
          + 'lauloi sen karnevaaliaikaan. Strauss ei ollut itse paikalla johtamassa. '
          + 'Vasta myöhemmin valssi esitettiin pelkän orkesterin soittamana, ja samana vuonna '
          + 'se kuultiin myös Pariisin maailmannäyttelyssä.',
        'Alkuperäinen Dianabad on kadonnut: rakennus purettiin 1913, ja uusi '
          + 'Dianabad valmistui 1917. Isoisäsi matkavuonna 1873 valssi oli ollut '
          + 'maailmalla jo kuusi vuotta, ja vanha Dianabad seisoi vielä paikallaan.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Wien Geschichte Wiki, Johann Strauss Society, AEIOU, ORF Wien, vienna.at ja Wikidata',
      kuva: {
        tiedosto: 'Johann Strauss II by Fritz Luckhardt.jpg',
        lyhyt: 'Johann Strauss nuorempi Fritz Luckhardtin valokuvassa 1899.',
        selite: 'Johann Strauss nuorempi Fritz Luckhardtin valokuvassa vuodelta 1899. '
          + 'Strauss kuoli samana vuonna.',
        lahde: 'Fritz Luckhardt, Wikimedia Commons (PD)',
      },
      /*
       * MUSIIKKI JA ÄÄNI KORTILLE (avoin kohta 11.1, 14.9.2026). Erässä 10
       * tämä nosto jäi lehden sivulle kaksoiskappaleeksi vain siksi, että
       * musiikkilinkille ja ääninäytteelle ei ollut paikkaa kortilla.
       * Kortti piirtää ne nyt SAMOILLA napeilla kuin lehti (js/ui.js
       * lisaaNostonNapit), joten sivulta jäänyt kaksoiskappale purkautui.
       */
      musiikki: 'https://music.apple.com/fi/search?term=Johann%20Strauss%20Donauwalzer',
      musiikkiNimi: 'Tonava kaunoinen Apple Musicissa',
      musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/d/de/%22An_der_sch%C3%B6nen%2C_blauen_Donau%22%2C_performed_by_the_US_Marine_Band.mp3',
      musiikkiNayteNimi: 'Strauss: Tonava kaunoinen — United States Marine Band (PD)',
      kysymykset: [
        'Missä Tonava kaunoinen kantaesitettiin 1867?',
        'Millainen valssin ensimmäinen versio oli ja kuka sen lauloi?',
        'Mitä vanhalle Dianabadille tapahtui?',
      ],
      visa: {
        kysymys: 'Missä Tonava kaunoinen kantaesitettiin vuonna 1867?',
        vaihtoehdot: [
          'Wienin oopperassa',
          'Dianabadissa',
          'Schönbrunnin linnassa',
        ],
        oikea: 1,
        fakta: 'Valssi kantaesitettiin Dianabadissa, uimalaitoksessa, joka talvella muutettiin tanssi- ja konserttisaliksi.',
      },
      // 48,2135 N / 16,3768 E — Dianabadin paikka, Obere Donaustraße 93 (WGW ja Wikidata Q1208912; KK 16.11.2026).
      paikka: {
        nimi: 'Tonava kaunoinen',
        laudat: {
          maailmankartta: { x: 6379.3, y: 1467.5 },
          europe: { x: 525.7, y: 625.8 },
        },
      },
    },
  ],
};
