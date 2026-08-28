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
  kysymys: 'Mozartin viimeinen ooppera sai ensi-iltansa Wienin '
    + 'esikaupungin teatterissa eikä hovissa. Millä kielellä se '
    + 'laulettiin?',
  vaihtoehdot: [
    'Saksaksi',
    'Italiaksi',
    'Latinaksi',
  ],
  oikea: 0,
  fakta: 'Taikahuilun ensi-ilta oli 30. syyskuuta 1791 Emanuel '
    + 'Schikanederin teatterissa Wiedenin esikaupungissa. Schikaneder '
    + 'kirjoitti sanat itse ja näytteli linnustaja Papagenoa. Mozart '
    + 'kuoli kaksi kuukautta myöhemmin.',
};

const LIPIZZANI_VISA = {
  kysymys: 'Hofburgin ratsastuskoulun hevoset tunnetaan valkoisina. '
    + 'Minkä värisinä varsat syntyvät?',
  vaihtoehdot: [
    'Ruunikkoina tai mustina',
    'Valkoisina, kuten aikuisina',
    'Täplikkäinä',
  ],
  oikea: 0,
  fakta: 'Varsat vaalenevat vuosi vuodelta ja ovat valkoisia 6–10 '
    + 'vuoden iässä. Perinne vaatii, että tallissa on aina myös yksi '
    + 'ruunikko.',
};

export const FOKUSVIRTA_WIEN = {
  kaupunki: 'wien',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi seuraa merkinnän omia
     * faktoja: näyttely avattiin 1.5.1873 ja pörssi kaatui kahdeksan
     * päivää myöhemmin, joten isoisä oli Wienissä toukokuussa.
     */
    paikkarivi: 'Wien, toukokuussa 1873. Sadekuuroja; ilmanpuntari '
      + 'laskee aamusta.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Wien on rakentanut maailmannäyttelyn ja sen ylle kupolin, '
      + 'jota sanotaan maailman suurimmaksi. Kävelin Rotunden alla '
      + 'hattu kädessä. Kahdeksan päivää avajaisten jälkeen pörssi '
      + 'kaatui — näin rikkaita miehiä itkemässä kadulla, enkä unohda '
      + 'sitä koskaan.',
    /*
     * Luenta on sama teksti tunnetagein. Äänite generoidaan tästä
     * kentästä työnkulussa .github/workflows/generoi-luennat.yml
     * (tools/generoi-luennat.mjs wien), joka kirjoittaa täsmälleen
     * alla nimetyn tiedoston. Nimi on kirjoitettu etukäteen: kenttä on
     * kytkentä, ja ennen ajoa puuttuva mp3 jättää kaiuttimen vaiti
     * kaatamatta mitään (js/luenta.js playDiaryVoice).
     */
    luenta: '[curious] Wien on rakentanut maailmannäyttelyn ja sen ylle '
      + 'kupolin, jota sanotaan maailman suurimmaksi. Kävelin Rotunden '
      + 'alla hattu kädessä. [softly] Kahdeksan päivää avajaisten '
      + 'jälkeen pörssi kaatui — [whispers] näin rikkaita miehiä '
      + 'itkemässä kadulla, enkä unohda sitä koskaan.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-wien.mp3',
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
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
    maadoitus: 'Kääk. Hattu kädessä kupolin alla, ja kahdeksan päivää '
      + 'myöhemmin itkeviä miehiä kadulla — kyllä minä ymmärrän, ettei '
      + 'sellaista unohda. Sitten minä katson vuosilukua: siitä '
      + 'toukokuusta on yli sataviisikymmentä vuotta, ja koko kupoli '
      + 'paloi jo 1937. Raha kaatui silloin Wienissä, sitten '
      + 'Berliinissä ja syksyllä New Yorkissa asti. Ei se kenenkään '
      + 'itkua pienennä. Mut kyllä sen kestää lukea.',
    /*
     * Huomio viittaa herokuvan kohteeseen (valtionooppera). Faktat
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js): ooppera avasi 1869 Ringstrassen
     * loistorakennusten sarjan. Rotunden palo on takyt-wien.md:n täky
     * 2 — sama fakta kuin maadoituksessa, sanottuna toisesta suunnasta
     * (mitä jäi jäljelle).
     */
    teksti: 'Sitä kupolia ei ole enää olemassa, se paloi 1937. '
      + 'Ringstrassen talot sen sijaan seisovat yhä: tuo oopperatalo '
      + 'tuolla avattiin 1869, neljä vuotta ennen isoisäsi käyntiä, ja '
      + 'sen lavalla on esiinnytty melkein joka ilta siitä asti. Katso '
      + 'ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-wien-state-opera.jpg',
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
      /*
       * Commons 28.8.2026: 2832×2128, CC BY-SA 4.0, Icone5, kuvaus
       * "Dynamo Gramme N°14 built by Mignon and Rouart in 1873" —
       * juuri sen vuoden konetyyppi. Restrictions tyhjä.
       */
      kuva: {
        tiedosto: 'Machine Gramme.jpg',
        selite: 'Gramme-kone vuodelta 1873. Samanlainen laite pyörähti '
          + 'Wienin näyttelyssä maailman ensimmäiseksi kunnolliseksi '
          + 'sähkömoottoriksi.',
        lahde: 'Icone5, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mitä Gramme-koneelle tapahtui, kun siihen johdettiin '
          + 'sähköä sen sijaan että sillä olisi tuotettu sitä?',
        vaihtoehdot: [
          'Se alkoi pyöriä',
          'Se sammui',
          'Se alkoi kuumeta ja savuta',
        ],
        oikea: 0,
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
       * mitä pelissä EI vielä ole — 30 akveduktia, rakennuskorkeuden
       * raja ja Gabriellin prosentti. Etunimi on aineiston suosittelema
       * muoto Antonio.
       */
      id: 'vesijohto',
      nappi: 'Vesi, joka tuli vuorilta ilman ainuttakaan pumppua',
      otsikko: 'Ensimmäinen vuoristovesijohto',
      teksti: 'Isoisäsi käynnin aikaan kaupungissa kaivettiin jo '
        + 'toista ihmettä, joka valmistui vasta lokakuussa. Wienin '
        + 'ensimmäinen vuoristovesijohto avattiin 24. lokakuuta 1873. '
        + 'Se on 95 kilometriä pitkä ja kulkee kokonaan painovoiman '
        + 'varassa Rax- ja Schneeberg-vuorten lähteiltä kaupunkiin — '
        + 'juuri siksi Wienin rakennusjärjestykset rajoittivat talojen '
        + 'korkeuden noin kahteenkymmeneenviiteen metriin: sitä '
        + 'korkeammalle vesi ei olisi noussut itsestään. Matkalla on 30 '
        + 'akveduktia ja muuta laaksonylitystä, ja ne kaikki ovat '
        + 'nykyään suojeltuja. Rahoituksesta sovittiin poikkeuksellisesti: '
        + 'urakoitsija Antonio Gabrielli tarjoutui itse, että hänen '
        + 'palkkiostaan vähennettäisiin yksi prosentti, kunnes kasaan '
        + 'tulisi 100 000 guldenia — ja niillä rahoilla rakennettaisiin '
        + 'suihkulähde, joka avattaisiin samana päivänä kuin vesijohto. '
        + 'Niin syntyi Hochstrahlbrunnen. Vesijohto tuottaa yhä yli '
        + 'puolet kaupungin juomavedestä.',
      /*
       * Commons 28.8.2026: 4032×3024, CC BY-SA 4.0, Anna Saini,
       * kuvattu 19.9.2019, kuvaus "Teil der 1. Wiener
       * Hochquellenleitung". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on kadun ylittävä akvedukti, ei tunnistettavia
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Aquädukt Liesing- Teil der 1. Wiener Hochquellenleitung 1.jpg',
        selite: 'Ensimmäisen vuoristovesijohdon akvedukti Liesingissä. '
          + 'Vesi kulkee koko 95 kilometrin matkan painovoiman varassa.',
        lahde: 'Anna Saini, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi Wienissä ei saanut 1800-luvulla rakentaa noin '
          + 'kahtakymmentäviittä metriä korkeampia taloja?',
        vaihtoehdot: [
          'Vuoristovesi ei olisi noussut ylemmäs ilman pumppuja',
          'Palokunnan tikkaat eivät yltäneet ylemmäs',
          'Keisari halusi nähdä Stephansdomin joka kadulta',
        ],
        oikea: 0,
        fakta: 'Sama vesijohto tuo yhä yli puolet Wienin juomavedestä. '
          + 'Sen 30 akveduktia ovat nykyään suojeltuja rakennuksia.',
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
          'Siellä kasvaa ikivihreitä kasveja hautakivien ympärillä',
          'Siellä on hiljaisinta',
          'Siellä niitä ruokitaan',
        ],
        oikea: 0,
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
     * Commons 28.8.2026: 1404×1098, public domain, Wiener
     * Photographen-Association, 1873, kuvaus "Main Entrance of the
     * Rotunde with topping-out decoration, Expo 1873". Restrictions
     * tyhjä. SILMÄTARKISTUS tehty: portilla seisoo aikalaisia
     * kaukaisina hahmoina, kaikki 1873.
     */
    kuva: {
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
      otsikko: 'Keisari avasi maailmannäyttelyn — kahdeksan päivää '
        + 'myöhemmin poliisi sulki pörssin',
      lunastus: [
        'Keisari Franz Joseph avasi maailmannäyttelyn 1. toukokuuta 1873 '
          + 'sanoen, että Itävalta-Unkari on kaikin puolin ilahduttavassa '
          + 'nousussa. Kupla oli jo puhkeamassa: maan suurin pankki oli '
          + 'juuri irtisanonut pörssitalletukset ja myynyt 20 miljoonan '
          + 'guldenin arvosta arvopapereita.',
        'Yhdeksäntenä toukokuuta aamulla ilmoitti maksukyvyttömyydestään '
          + 'meklari Adolf Petschek, jota kutsuttiin meklarikaupan '
          + 'kuninkaaksi. Samana aamupäivänä kaatui 120 muuta pankkia, ja '
          + 'kello 13 poliisi sulki pörssin — päivä on Itävallan historian '
          + '"musta perjantai". Romahdus levisi Berliiniin ja syyskuussa '
          + 'New Yorkiin, jonka pörssi suljettiin ensimmäistä kertaa '
          + 'historiassaan kymmeneksi päiväksi. Näyttelylle odotettiin 20 '
          + 'miljoonaa kävijää; tuli 7,25 miljoonaa, ja tappiota kertyi '
          + 'noin 15 miljoonaa guldenia.',
      ],
      lahde: 'de-Wikipedia "Gründerkrach" ja "Weltausstellung 1873" sekä '
        + 'en-Wikipedia "Panic of 1873" (tarkistettu 25.8.2026 '
        + 'työaineistoon docs/mantereet-tyoaineisto/takynostot-itavalta.md, '
        + 'ehdokas 1).',
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
      kysymykset: [
        'Mitä maailmannäyttelyssä 1873 oli nähtävänä?',
        'Mikä aiheutti Wienin pörssiromahduksen?',
        'Miten romahdus levisi Wienistä New Yorkiin asti?',
      ],
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
      lahde: 'en-Wikipedia "Schönbrunn Zoo", osiot "Founding and early '
        + 'years" ja "In the 19th century" (tarkistettu 25.8.2026 '
        + 'työaineistoon docs/mantereet-tyoaineisto/takynostot-itavalta.md, '
        + 'ehdokas 4).',
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
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre:
   * Florentiner-timantti. Isoisän pyöristys "sata karaattia" on hänen
   * omaa puhettaan (kivi on noin 137 karaattia) ja kaanonissa
   * nimenomaan sallittu.
   */
  aarremerkinta: {
    teksti: 'Hovin mies lupasi näyttää keisarinnan timantin, jos '
      + 'odottaisin syksyyn. En odottanut — laivani lähti, ja '
      + 'kirjoitin luetteloon: keltainen kivi, sata karaattia, liian '
      + 'vartioitu.',
  },
};
