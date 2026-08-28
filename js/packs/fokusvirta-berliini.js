/*
 * BERLIININ FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle, -wien.js:lle ja
 * -pariisi.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Nibelungein aarre (aarremerkintä).
 *
 * FAKTAPOHJA täyille: docs/mantereet-tyoaineisto/takyt-berliini.md,
 * jonka jokainen väite on tarkistettu Wikipedian rajapinnasta
 * artikkeli ja osio kerrallaan (täyt 1, 5 ja 11). Oppitunti käyttää
 * pelin omaa, jo hyväksyttyä Berliini-aineistoa (js/packs/
 * europe-valokuvat.js, vanhan tähtitornin kuvaselite) ja tarinakaaren
 * omaa faktariviä (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
 * berliini) sekä en-Wikipedian artikkelia "Berlin Observatory"
 * (haettu 28.8.2026).
 *
 * ── AARRETEHTÄVÄN AIHE KYTKEYTYY TARINAVERKKOON ────────────────────
 *
 * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta): *"PELITEHTÄVÄN
 * AIHE RATKAISEE, EI MEKANIIKKA … aarretehtävän aihe kytketään aina
 * kaupungin muuhun tarinaverkkoon."* Berliinin laattakysymys on
 * planeetta, joka löydettiin ensin laskemalla ja vasta sitten
 * kaukoputkella. Kytkös on kolminkertainen: tarinakaaren saapuminen vie
 * isoisän tähtitornin kupolin alle, kohtaamishahmo on saman tornin
 * hoitaja, ja tämän tiedoston oppitunti kertoo talosta ja sen
 * löydöstä. Kysymystä itseään ei ole muutettu.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Pöllön kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, berliini/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 28.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions) — ei arvattuja nimiä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Tv-tornikysymys on Berliinin lehden sivun 2
 * ("Tornit ja torit") oman noston "Aurinko piirsi torniin ristin"
 * tekstiä ja Ampelmännchen-kysymys sivun 1 ("Berliini") oman noston
 * "Hattupäinen ukkeli sai jäädä" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI TÄHTITIEDETTÄ: kaupungin laattakysymys (kohtaaminen, ks.
 * alempana) kysyy planeettaa, joka löydettiin ensin laskemalla. Jos
 * lehden aarteen avaava tehtävä kysyisi samasta tornista tai samasta
 * löydöstä, aarrekysymys olisi ratkaistu ennen kuin Lottea on
 * tavattu.
 */
const TVTORNI_VISA = {
  kysymys: 'Itä-Berliinin televisiotornin kiiltävä pallo tekee '
    + 'auringonpaisteessa jotain, mitä kukaan ei ollut piirtänyt '
    + 'suunnitelmiin. Minkä lempinimen ilmiö sai lännessä?',
  vaihtoehdot: [
    'Paavin kosto',
    'Berliinin majakka',
    'Tähtitornin silmä',
  ],
  oikea: 0,
  fakta: 'Kun aurinko osuu palloon, heijastus muodostaa ristin. '
    + 'Valtio oli virallisesti uskonnoton, ja nimi jäi elämään. Torni '
    + 'vihittiin käyttöön 3. lokakuuta 1969.',
};

const AMPELMANN_VISA = {
  kysymys: 'Miksi Itä-Saksan jalankulkuvalon hahmo piirrettiin '
    + 'leveäksi ja hattupäiseksi?',
  vaihtoehdot: [
    'Leveä hahmo erottuu kauas, koska valopintaa on paljon',
    'Hattu oli suunnittelijan oma tavaramerkki',
    'Lasi oli halvempaa valmistaa pyöreänä',
  ],
  oikea: 0,
  fakta: 'Liikennepsykologi Karl Peglau piirsi hahmon 1961, ja '
    + 'ensimmäiset valot syttyivät Itä-Berliinissä 1969. Kun ukkelia '
    + 'alettiin yhdistymisen jälkeen vaihtaa lännen tikku-ukkoon, '
    + 'kansalaiskampanja "Pelastakaa Ampelmännchen" nousi vastaan ja '
    + 'voitti.',
};

export const FOKUSVIRTA_BERLIINI = {
  kaupunki: 'berliini',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma; sääkommentti on isoisän havainto
     * eikä mitattu väite. Kuukausi sopii merkinnän työmaakuvaan:
     * viemärien pääputkien rakentaminen alkoi 1873 (takyt-berliini.md,
     * täky 5).
     */
    paikkarivi: 'Berliini, syyskuussa 1873. Pilvistä; laastin ja '
      + 'kivipölyn haju.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Berliini on nuoren keisarikunnan työmaa: joka kadulla '
      + 'lyödään perustuksia ja puhutaan rahasta. Vanha kirjastonhoitaja '
      + 'luki minulle Nibelungein laulua ja sanoi: aarre on Reinissä, '
      + 'herra, mutta Rein ei kerro missä.',
    /* Luenta on sama teksti tunnetagein; äänitettä ei ole vielä. */
    luenta: '[curious] Berliini on nuoren keisarikunnan työmaa: joka '
      + 'kadulla lyödään perustuksia ja puhutaan rahasta. [softly] '
      + 'Vanha kirjastonhoitaja luki minulle Nibelungein laulua ja '
      + 'sanoi: [whispers] aarre on Reinissä, herra, mutta Rein ei '
      + 'kerro missä.',
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE. Yksi kupla per saapuminen.
     *
     * FAKTAKURI: kaksi väitettä, molemmat tarkistettavia.
     * (1) Wienin toukokuinen romahdus levisi Berliiniin
     * (docs/mantereet-tyoaineisto/takynostot-itavalta.md, ehdokas 1;
     * sama tapaus on takyt-berliini.md:n täkynä 2).
     * (2) Viemärien pääputkien rakentaminen alkoi 1873 ja viimeinen
     * valmistui 1893 (takyt-berliini.md, täky 5).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki — kaivettiin, kaksikymmentä, kirjastonhoitaja.
     */
    maadoitus: 'Kääk. Isoisäsi kuuli puhuttavan rahasta, ja siinä hän '
      + 'oli oikeaan aikaan: raha oli kaatunut keväällä Wienissä ja '
      + 'romahdus tuli Berliiniin perässä. Silti kaupunki kaivoi. '
      + 'Viemärien pääputkia alettiin rakentaa juuri sinä vuonna, ja '
      + 'viimeinen niistä valmistui vasta kahdenkymmenen vuoden '
      + 'päästä. Siitä aarteesta minä en tiedä mitään. Mut se joki on '
      + 'kyllä yhä siellä.',
    /*
     * Huomio viittaa herokuvan kohteeseen (valtiopäivätalo). Faktat
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js, berliini/avauskuvat): talo valmistui
     * 1894 ja lasikupoli nousi katolle 1999.
     */
    teksti: 'Se työmaa ei loppunut isoisäsi käyntiin. Tuo '
      + 'valtiopäivätalo tuolla valmistui vasta 1894, yli kaksikymmentä '
      + 'vuotta myöhemmin, ja lasikupoli nousi sen katolle vasta 1999 — '
      + 'kävijät kiertävät spiraalirampilla istuntosalin yläpuolella. '
      + 'Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-berliini-keskipaiva.png',
      selite: 'Valtiopäivätalo valmistui 1894, ja Norman Fosterin '
        + 'lasikupoli nousi sen katolle 1999 — kävijät kiertävät '
        + 'spiraaliramppia istuntosalin yläpuolella.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * Faktat: takyt-berliini.md, täky 1 (VARMA, en-Wikipedia "Berlin
       * Victory Column"). Aineiston kaksi ohjetta noudatettu:
       * (1) päällekkäisyys — vihkiäisvuosi on jo pelissä lehden
       * avauskuvan selitteessä (js/packs/kulttuuri-kategoriat.js),
       * joten täky kertoo sen, mitä pelissä EI ole: lempinimen, uuden
       * merkityksen ja siirron; (2) herkkyys — siirrosta sanotaan vain,
       * että keskustaa suunniteltiin uusiksi.
       */
      id: 'kultaliisa',
      nappi: 'Patsas, jolle kaupunki antoi oman nimen',
      otsikko: 'Kulta-Liisa',
      teksti: 'Heinrich Strack suunnitteli pylvään vuoden 1864 jälkeen '
        + 'muistoksi voitosta Tanskasta. Ennen kuin se ehdittiin '
        + 'vihkiä, Preussi oli voittanut myös Itävallan ja Ranskan, ja '
        + 'pylväs sai uuden merkityksen: harjalle lisättiin 8,3 metriä '
        + 'korkea pronssinen Victoria, jota alkuperäisissä '
        + 'suunnitelmissa ei ollut lainkaan. Vihkiäiset pidettiin 2. '
        + 'syyskuuta 1873, isoisäsi matkavuonna. Berliiniläiset eivät '
        + 'jääneet juhlapuheiden varaan vaan antoivat patsaalle '
        + 'lempinimen Goldelse, Kulta-Liisa, vuonna 1866 ilmestyneen '
        + 'romaanin sankarittaren mukaan. Pylväs ei ole enää siinä, '
        + 'missä se silloin seisoi: se nousi Königsplatzille, ja '
        + 'vuosina 1938–39 se siirrettiin Großer Sternille ja '
        + 'korotettiin samalla kuudella ja puolella metrillä, kun '
        + 'keskustaa suunniteltiin uusiksi.',
      /*
       * Commons 28.8.2026: 1000×1435, public domain, tekijä
       * tuntematon, päiväys 2.9.1873 — aikalaiskuva tasan
       * vihkiäispäivältä. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * aikalaispiirros, jossa juhlaväkeä ja ratsastajia, kaikki 1873.
       */
      kuva: {
        tiedosto: 'Einweihung Siegessaeule Berlin.jpg',
        selite: 'Voitonpylvään vihkiäiset 2. syyskuuta 1873. Kuvassa '
          + 'pylväs seisoo vielä alkuperäisellä paikallaan '
          + 'Königsplatzilla.',
        lahde: 'Tuntematon tekijä 1873, Wikimedia Commons (public '
          + 'domain)',
      },
      visa: {
        kysymys: 'Mistä Voitonpylvään lempinimi Kulta-Liisa on '
          + 'peräisin?',
        vaihtoehdot: [
          'Vuonna 1866 ilmestyneen romaanin sankarittaresta',
          'Patsaan mallina olleesta näyttelijättärestä',
          'Pylvään rakennuttaneesta kauppahuoneesta',
        ],
        oikea: 0,
        fakta: 'Pylväs suunniteltiin muistoksi yhdestä voitosta, mutta '
          + 'ennen vihkiäisiä niitä oli tullut kolme. Kullattu '
          + 'Victoria lisättiin harjalle vasta silloin.',
      },
    },
    {
      /*
       * Faktat: takyt-berliini.md, täky 5 (VARMA, en-Wikipedia "James
       * Hobrecht"). Aineiston varaus noudatettu: lähde ei kuvaa
       * katukuvaa ennen työmaata, joten teksti sanoo vain, ettei
       * viemäriä vielä ollut — mitään ei maalailla.
       *
       * MIKSI TÄMÄ TÄKY: isoisän merkintä alkaa perustuksista, ja tämä
       * on se perustus, joka jäi näkymättömiin.
       */
      id: 'viemarit',
      nappi: 'Työmaa, joka alkoi juuri sinä vuonna',
      otsikko: 'Hobrechtin putket',
      teksti: 'Ne perustukset, joita kaduilla lyötiin, olivat osaksi '
        + 'viemäriä: Berliinillä ei sellaista vielä ollut. James '
        + 'Hobrecht oli laatinut kaupungin laajenemissuunnitelman jo '
        + '1862, mutta hänet oli erotettu ennen kuin se valmistui, ja '
        + 'hän lähti Stettiniin rakentamaan vesijohtoa ja viemäriä. '
        + 'Vuonna 1869 hän palasi tehtävänään koko Berliinin '
        + 'viemäröinti. Kaksi liittolaista teki sen mahdolliseksi: '
        + 'hänen veljensä Arthur Hobrecht, josta tuli kaupungin '
        + 'ylipormestari 1872, ja lääkäri-poliitikko Rudolf Virchow. '
        + 'Hobrecht suunnitteli kahdentoista pääsuunnan säteittäisen '
        + 'järjestelmän, joka johti jätevedet kaupungin laidalle '
        + 'sadetuskentille. Pääputkien rakentaminen alkoi 1873 ja '
        + 'viimeinen valmistui 1893. Samalta mieheltä tilattiin sen '
        + 'jälkeen viemärit kolmeenkymmeneen saksalaiseen kaupunkiin '
        + 'sekä Moskovaan, Tokioon ja Kairoon.',
      /*
       * Commons 28.8.2026: 3600×2945, public domain, James Hobrecht,
       * 1884, kuvaus: lehti 10 Berliinin viemäröinnin atlaksesta,
       * berliiniläisen vuokratalon viemäröinnin mallikuva.
       * Restrictions tyhjä. Piirustus, ei valokuva — ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Canalisation von Berlin. Blatt 10.png',
        selite: 'Lehti Hobrechtin omasta viemäriatlaksesta vuodelta '
          + '1884: mallikuva berliiniläisen vuokratalon viemäröinnistä.',
        lahde: 'James Hobrecht 1884, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mihin kolmeen Saksan ulkopuoliseen kaupunkiin '
          + 'Berliinin viemärien suunnittelija kutsuttiin?',
        vaihtoehdot: [
          'Moskovaan, Tokioon ja Kairoon',
          'Lontooseen, Pariisiin ja Wieniin',
          'New Yorkiin, Chicagoon ja Bostoniin',
        ],
        oikea: 0,
        fakta: 'Pääputkien rakentaminen alkoi 1873 ja viimeinen '
          + 'valmistui 1893. Työn mahdollistivat suunnittelijan oma '
          + 'veli, kaupungin ylipormestari, ja lääkäri Rudolf Virchow.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       * Faktat: takyt-berliini.md, täky 11 (VARMA de-lähteen osalta,
       * de-Wikipedia "Berliner Bär"). Aineiston kaksi ohjetta
       * noudatettu: (1) etymologiasta sanotaan "tutkijoiden
       * pääsääntöinen käsitys", koska lähde itse varaa sanansa;
       * (2) tarhan loppu kerrotaan rehellisesti, ei mässäillen.
       *
       * PÄÄLLEKKÄISYYS: peli sanoo jo Berliinistä "suolle rakennettu
       * kaupunki" (js/packs/kulttuuri-kategoriat.js). Uutta on karhun
       * ja suon yhteys — juuri se on tämän täyn ydin.
       */
      id: 'karhu',
      nappi: 'Vaakunaeläin, jota pidettiin elävänä',
      otsikko: 'Berliinin karhu',
      teksti: 'Berliinin sinetissä on ollut karhu yhtäjaksoisesti 22. '
        + 'maaliskuuta 1280 lähtien: ensimmäinen todistettu sinetti on '
        + 'turkkurien kiltakirjeessä, ja siinä lukee "olen Berliinin '
        + 'porvarien sinetti". Vitsi on siinä, ettei karhulla '
        + 'todennäköisesti ole kaupungin nimen kanssa mitään tekemistä: '
        + 'tutkijoiden pääsääntöisen käsityksen mukaan paikannimi on '
        + 'slaavilaista perua sanasta berl, suo, ja karhu on '
        + 'kansanetymologiaa — puhuva vaakuna. Kaupunki otti asian '
        + 'silti kirjaimellisesti. 17. elokuuta 1939 se sai neljä '
        + 'elävää karhua, jotka asetettiin Köllnischer Parkiin '
        + 'lämmitettävään tiiliseen tarhaan vallihautoineen. Sinne '
        + 'muutti karhusukupolvi toisensa jälkeen: Nante ja Jette, joka '
        + 'synnytti 33 pentua ja jonka poikasille berliiniläiset lapset '
        + 'saivat ehdottaa nimiä vuodesta 1949, sitten Taps ja Schnute. '
        + 'Viimeinen kaupunginkarhu Schnute lopetettiin vaikean '
        + 'nivelrikon takia lokakuussa 2015, ja tarhasta tehtiin 2017 '
        + 'taidetila.',
      /*
       * Commons 28.8.2026: 6000×4000, CC0, Singlespeedfahrer, kuvattu
       * 21.8.2022, kuvaus "Bear sculpture in Köllnischer Park in
       * Berlin-Mitte". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * puinen karhuveistos hiekalla, ei ihmisiä. Selite sanoo
       * suoraan, että kyseessä on veistos eikä karhutarhan asukas —
       * kuva ei saa väittää enempää kuin se on.
       */
      kuva: {
        tiedosto: 'Sculpture bear Köllnischer Park Berlin-Mitte.jpg',
        selite: 'Puinen karhuveistos Köllnischer Parkissa, samassa '
          + 'puistossa jossa kaupungin elävät karhut asuivat.',
        lahde: 'Singlespeedfahrer, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mitä tutkijoiden pääsääntöisen käsityksen mukaan '
          + 'kaupungin nimi tarkoittaa?',
        vaihtoehdot: [
          'Suota',
          'Karhunpentua',
          'Kahlaamoa',
        ],
        oikea: 0,
        fakta: 'Karhu on siis puhuva vaakuna: kuva, joka selittää '
          + 'nimen väärin mutta ymmärrettävästi. Sinetissä se on ollut '
          + 'vuodesta 1280.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, berliini: *"Yksi
   * planeetta löydettiin ensin kynällä ja paperilla — ja vasta sitten
   * kaukoputkella, juuri Berliinissä. Mikä?"* → Neptunus).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan — teksti ei puhu kynästä
   * eikä paperista.
   *
   * FAKTAT: löytö, Le Verrier'n laskema paikka ja talon purkaminen
   * 1913 ovat pelin omasta, jo hyväksytystä kuvaselitteestä
   * (js/packs/europe-valokuvat.js, berliini); Enckestä ja Humboldtista
   * en-Wikipedia "Berlin Observatory" (haettu 28.8.2026); Uranuksen
   * radan heilahdukset tarinakaaren omasta faktarivistä.
   */
  oppitunti: {
    otsikko: 'Talo, jossa laskelma osoittautui oikeaksi',
    teksti: 'Berliinin kuninkaallinen tähtitorni sai nykyisen talonsa, '
      + 'kun Johann Franz Encke oli nimitetty johtajaksi 1825 ja '
      + 'Alexander von Humboldt sai kuninkaan rahoittamaan kunnollisen '
      + 'observatorion. Kupolin alla oli kaukoputki, ja sillä tehtiin '
      + 'syyskuussa 1846 työ, jota tähtitieteessä yhä muistellaan. '
      + 'Uranuksen rata heilahteli tavalla, jota mikään tunnettu '
      + 'kappale ei selittänyt, ja ranskalainen Urbain Le Verrier '
      + 'laski paperilla, missä tuntemattoman planeetan täytyisi olla. '
      + 'Johann Gottfried Galle käänsi putken siihen kohtaan ja löysi '
      + 'Neptunuksen alle asteen päästä lasketusta paikasta. Talo itse '
      + 'ei kestänyt kaupunkia: '
      + 'Berliini kasvoi sen ympärille ja valot söivät taivaan, joten '
      + 'tähtitorni siirrettiin 1913 Babelsbergin puistoon ja vanha '
      + 'rakennus purettiin. Isoisäsi aikaan se seisoi vielä '
      + 'paikallaan.',
    /*
     * Kuva on pelin omasta kuvastosta (js/packs/europe-valokuvat.js,
     * berliini) eikä uusi tuonti: Commons 28.8.2026 3200×4817, public
     * domain, Trigonometrische Abteilung der Landesaufnahme, 1880,
     * kuvaus "Royal Observatory in Berlin, Mean sea level benchmark
     * 1879". Restrictions tyhjä.
     */
    kuva: {
      tiedosto: 'NHP 1879 Berlin Sternwarte Nordseite Tafel VI.jpg',
      selite: 'Berliinin kuninkaallinen tähtitorni pohjoisesta '
        + 'nähtynä, piirros isoisän ajoilta. Talo purettiin 1913.',
      lahde: 'Trigonometrische Abteilung der Landesaufnahme 1880, '
        + 'Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja laattakysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'berliini'):
   * tähtitornin hoitaja Lotte kirjaa joka yön havainnot kirjaan, jota
   * hänen sukunsa on pitänyt observatorion alusta asti, ja
   * game.actionQuiz esittää hänen kysymyksensä laatalla. Tämä kortti
   * ei kertaa Lotten omaa repliikkiä eikä paljasta vastausta.
   *
   * BERLIININ VANHA KOHTAAMINEN JÄÄ ENNALLEEN. js/packs/kohtaamiset.js
   * antaa Berliinille posetiivari Oton, ja se rivi on pelin vanhan
   * polun kohtaaminen (js/visa.js: KOHTAAMISET näytetään, kun kysymys
   * ei ole kaarikysymys). Hahmoa ei ole poistettu eikä muutettu:
   * fokusmoodin kohtaaminen on kaaren oma hahmo, koska juuri hän
   * esittää aarrekysymyksen.
   */
  kohtaaminen: {
    hahmo: 'Tähtitornin hoitaja Lotte',
    nappi: 'Tapaa tähtitornin hoitaja',
    teksti: 'Lotte avaa kupolin raon myös pilvisinä öinä, koska '
      + 'havaintokirjaan merkitään sekin, mitä ei näy. Sukunsa '
      + 'käsialaa hän lukee sivu sivulta niin kuin muut lukevat '
      + 'kirjeitä, ja vieraita hän on tottunut mittaamaan yhdellä '
      + 'kysymyksellä. Matkustajaa hän ei kiirehdi. Ennen kuin hän '
      + 'kääntää putken sen vanhan merkinnän kohtaan, hän haluaa '
      + 'tietää, ymmärtääkö vieras, mitä tässä talossa oikeastaan '
      + 'tehtiin.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: VANHA BERLIININ TÄHTITORNI. Tarinakaaren
   * saapuminen ja kohtaaminen tapahtuvat kaukoputken äärellä, ja
   * isoisän aikaan torni oli Friedrichstadtissa, nykyisen Kreuzbergin
   * alueella — sieltä se siirrettiin 1913 Babelsbergiin.
   *
   * 52,50388889 N / 13,39416667 E — en-Wikipedia "Berlin Observatory",
   * prop=coordinates (haettu 28.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((13,39416667 − (−175)) mod 360) × (12000/360)
   *                     = 188,39416667 × 33,3333… = 6279,8
   *                   y = (millerY(52,50388889) − millerY(76)) × 12000/2π
   *                     = 1279,6
   *   europe          x = (13,39416667 + 11) × 19,2 = 468,4
   *                   y = (72 − 52,50388889) × 26,3 = 512,7
   *
   * TARKISTUS BERLIININ LAATTAA VASTEN: laatta on Euroopan laudalla
   * 468 / 512, eli piste on sen vieressä. Niin pitääkin — torni
   * seisoi keskustassa, ja laudan yksikkö on maailmankartalla noin
   * kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Vanha tähtitorni',
    laudat: {
      maailmankartta: { x: 6279.8, y: 1279.6 },
      europe: { x: 468.4, y: 512.7 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Berliinin sivupino (js/lehti.js
   * rakennaSivut) on Sofian mittainen: 0 = etusivu, 1 = kaupunkisivu
   * "Berliini", 2 = Tornit ja torit, 3 = Menovinkit. Sivun 2 oma
   * tehtävä (maailmankellon paikannimet) väistyy nimetyn tieltä, joten
   * sivulla on Raamatun vaatima yksi minitehtävä eikä kahta.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: TVTORNI_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: AMPELMANN_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Saksa) ----------
   *
   * SIIRRETTY TÄNNE v1297:n maapoolista (js/fokusnosto.js NOSTO_MAAT,
   * avain DEU) sanasta sanaan: otsikot, lunastukset, lähteet, kuvat,
   * kysymykset ja koordinaatit ovat bitilleen samat, vain sijainti
   * vaihtui. Kahta kopiota ei ole — js/fokusnosto.js lukee DEU-poolin
   * tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Järjestys on siksi säilytetty muuttumattomana.
   *
   * TEKIJÄTARKISTIN HUOMAUTTAA VOIGTIN KUVASTA, EIKÄ SITÄ KORJATA:
   * tools/tarkista-tekijat.mjs vertaa merkintää Commonsin omaan
   * Artist-kenttään ("Preussische Polizei"), kun paketissa on
   * suomennos "Preussin poliisi". Sama tekijä, eri kieli — ja rivi on
   * siirretty maapoolista sanasta sanaan, joten sitä ei muuteta.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       * takynostot-saksa.md, ehdokas 1 (VARMA). Henkilö kuollut 1922.
       */
      id: 'kopenickin-kapteeni',
      nimio: 'Köpenickin kapteeni',
      otsikko: 'Suutari osti univormun palasina ja valtasi kaupungintalon '
        + '— keisari armahti hänet',
      lunastus: [
        'Wilhelm Voigt oli istunut elämänsä aikana yhteensä 25 vuoden '
          + 'edestä tuomioita ja päässyt vapaaksi helmikuussa 1906. '
          + 'Elokuussa Berliinin poliisi karkotti hänet kaupungista '
          + 'pelkästään siksi, että hän oli entinen vanki. Lokakuun 16. '
          + 'päivänä hän puki ylleen preussilaisen kaartinkapteenin '
          + 'univormun, jonka oli ostanut palasina eri kaupoista ja jonka '
          + 'vaikutusta sotilaisiin hän oli ensin koekäyttänyt.',
        'Hän pysäytti kadulla neljä krenatööriä ja kersantin, otti kuusi '
          + 'lisää ampumaradalta, vei joukkonsa junalla Köpenickiin, '
          + 'miehitti kaupungintalon, käski poliisin huolehtia '
          + 'järjestyksestä ja estää puhelut Berliiniin tunnin ajaksi, '
          + 'pidätytti pormestarin ja rahastonhoitajan ja takavarikoi '
          + 'kassasta 4 002 markkaa ja 37 penniä — antaen kuitin, jonka '
          + 'allekirjoitti entisen vanginvartijansa nimellä. Kiinni '
          + 'jäätyään hänet tuomittiin neljäksi vuodeksi, mutta keisari '
          + 'Wilhelm II armahti hänet 1908. Neljä päivää vapautumisensa '
          + 'jälkeen hän oli jo vahakabinetissa Unter den Lindenillä '
          + 'signeeraamassa kuviaan.',
      ],
      lahde: 'en-Wikipedia "Wilhelm Voigt", johdanto ja osiot "Early life", '
        + '"Captain of Köpenick", "Unraveling and capture" ja "Aftermath" '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-saksa.md, ehdokas 1).',
      /* Commons 25.8.2026: 562×856, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Wilhelm Voigt 1906 10 26.jpg',
        selite: 'Wilhelm Voigt poliisin kuvassa kymmenen päivää tempun '
          + 'jälkeen.',
        lahde: 'Preussin poliisi 1906, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi sotilaat tottelivat vierasta miestä univormussa?',
        'Miksi keisari armahti Köpenickin kapteenin?',
        'Mitä univormu merkitsi keisarillisessa Saksassa?',
      ],
      // 52,44583333 N / 13,57722222 E — en-Wikipedia "Köpenick"
      // (takynostot-saksa.md, ehdokas 1: Rathaus Köpenick).
      paikka: {
        nimi: 'Köpenick',
        laudat: {
          maailmankartta: { x: 6285.9, y: 1282.2 },
          europe: { x: 471.9, y: 514.3 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-saksa.md, ehdokas 2 (VARMA lehmän,
       * hinnan ja rahoittajan osalta). Aineiston kielto noudatettu:
       * LÖYTÖVUOTTA EI MAINITA kummassakaan kappaleessa, koska
       * en-Wikipedian kaksi artikkelia antavat sille eri vuoden.
       */
      id: 'archaeopteryx',
      nimio: 'Lehmän hinnalla',
      otsikko: 'Maanviljelijä myi maailman kuuluisimman fossiilin — hinta '
        + 'oli yksi lehmä',
      lunastus: [
        'Berliinin luonnontieteellisessä museossa on lasin alla kivilaatta, '
          + 'jossa näkyy pieni hampaallinen olento siipineen, kynsineen ja '
          + 'pitkine liskomaisine häntineen — ja höyhenten painaumat '
          + 'kivessä. Se on Archaeopteryxin Berliinin yksilö, lajin '
          + 'kahdestatoista löydetystä yksilöstä täydellisin ja ensimmäinen, '
          + 'jolla on kokonainen pää.',
        'Löytäjä oli maanviljelijä Jakob Niemeyer Eichstättin lähellä. '
          + 'Vuonna 1876 hän myi fossiilin majatalonpitäjä Johann Dörrille '
          + '— saadakseen rahat lehmän ostoon. Dörr myi sen eteenpäin, ja '
          + 'vuosina 1877–1881 fossiili oli myynnissä; ostajaehdokkaisiin '
          + 'kuului Yalen O. C. Marsh. Lopulta Berliinin museo osti sen '
          + '20 000 kultamarkalla, ja kaupan rahoitti Ernst Werner von '
          + 'Siemens — sama mies, jonka yhtiö oli rakentanut Berliinin '
          + 'putkipostin.',
      ],
      lahde: 'en-Wikipedia "Archaeopteryx", osio yksilöistä (tarkistettu '
        + '25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-saksa.md, ehdokas 2).',
      /* Commons 25.8.2026: 3926×4691, CC BY-SA 4.0, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Berlin Archaeopteryx.jpg',
        selite: 'Archaeopteryxin Berliinin yksilö: höyhenten painaumat '
          + 'näkyvät kivessä.',
        lahde: 'Emily Willoughby, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Archaeopteryx on niin kuuluisa fossiili?',
        'Miten höyhenet voivat säilyä kivessä?',
        'Paljonko 20 000 kultamarkkaa oli 1800-luvulla?',
      ],
      // 52,53 N / 13,37944444 E — en-Wikipedia "Museum für Naturkunde"
      // (takynostot-saksa.md, ehdokas 2).
      paikka: {
        nimi: 'Luonnontieteellinen museo',
        laudat: {
          maailmankartta: { x: 6279.3, y: 1278.4 },
          europe: { x: 468.1, y: 512.1 },
        },
      },
    },
    {
      /*
       * takynostot-saksa.md, ehdokas 7 (VARMA). Aineiston
       * IKÄSOPIVUUSRAJAUS noudatettu sanatarkasti: kuninkaan viimeiset
       * päivät, hallitsemiskyvyttömäksi julistaminen ja kuolema
       * Starnberginjärvessä ovat oma kiistelty aihepiirinsä, jota
       * aineistossa EI tarkistettu — nosto ei koske sitä eikä vihjaa
       * siihen, vaan siihen että linna maksettiin omista rahoista ja
       * avattiin yleisölle heti.
       */
      id: 'neuschwanstein',
      nimio: 'Velkojen linna',
      otsikko: 'Kuningas rakensi satulinnan omilla rahoillaan ja veloillaan '
        + '— ovet avattiin yleisölle heti hänen kuoltuaan',
      lunastus: [
        'Baijerin kuningas Ludwig II halusi pois Münchenin hovin '
          + 'rajoituksista ja rakennutti Alppien reunalle linnan, joka '
          + 'näyttää keskiaikaiselta ritarilinnalta mutta on 1800-luvun '
          + 'työtä ja rakennettu kunnianosoituksena Richard Wagnerille. '
          + 'Peruskivi laskettiin 5. syyskuuta 1869. Vuonna 1872 kellari '
          + 'oli valmis, 1876 kaikki ensimmäiseen kerrokseen asti, 1880 '
          + 'vietettiin harjannostajaisia, ja vasta 1884 kuningas muutti '
          + 'sisään.',
        'Hän maksoi kaiken omista varoistaan ja laajalla lainanotolla, ei '
          + 'Baijerin julkisista varoista. Linna oli tarkoitettu kuninkaan '
          + 'yksityiseksi asunnoksi — mutta hän kuoli 1886, ja se avattiin '
          + 'yleisölle pian sen jälkeen. Sen jälkeen siellä on käynyt yli '
          + '61 miljoonaa ihmistä.',
      ],
      lahde: 'en-Wikipedia "Neuschwanstein Castle", johdanto ja osio '
        + '"Construction" (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-saksa.md, ehdokas 7).',
      /* Commons 25.8.2026: 2024×1443, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Johannes Bernhard Neuschwanstein Baustelle 1882-85 (01).jpg',
        selite: 'Linna työmaana 1880-luvun alussa, telineet vielä pystyssä.',
        lahde: 'Johannes Bernhard 1882–85, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi 1800-luvulla rakennettiin keskiaikaisen näköisiä linnoja?',
        'Mistä Ludwig II sai rahat rakennustöihin?',
        'Mitä Neuschwansteinista oli valmiina 1870-luvulla?',
      ],
      // 47,5575 N / 10,74944444 E — en-Wikipedia "Neuschwanstein Castle"
      // (fokuskohteet-saksa.md, kohde 2).
      paikka: {
        nimi: 'Neuschwanstein',
        laudat: {
          maailmankartta: { x: 6191.6, y: 1495 },
          europe: { x: 417.6, y: 642.8 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Nibelungein
   * aarre.
   */
  aarremerkinta: {
    teksti: 'Seurasin laulun jälkiä Wormsiin asti ja seisoin Reinin '
      + 'rannalla kartta kädessä. Joki oli leveä ja välinpitämätön — '
      + 'kirjoitin: tämä aarre ei odota löytäjää, se odottaa uskojaa.',
  },
};
