/*
 * ROOMAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-sofia.js:lle ja
 * js/packs/fokusvirta-ateena.js:lle. Rakenne, kenttien nimet ja kuusi
 * vaihetta ovat samat kuin siellä (Raamatun osio "Fokusmoodi",
 * ANNOSTELU), eikä moottoriin (js/fokusvirta.js) tarvinnut koskea: uusi
 * kaupunki on yksi tiedosto ja yksi rivi rekisterissä
 * (js/packs/fokusvirrat.js).
 *
 * KIIREELLISYYS: Raamattu, osio "Fokusmoodi", omistajan lisäys
 * 25.8.2026 — *"ITALIA/ROOMA jonoon KIIREELLISENÄ (kaverit
 * kiinnostuneita)"*, beta-tavoite noin 1.9.2026.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (Fable 25.8.2026): docs/mantereet-tyoaineisto/
 * fokusvirta-rooma-kaanon.md. Matkakirjan paikkarivi, teksti ja luenta,
 * pöllön huomio, aarremerkintä ja täkynostojen klikkiotsikot on
 * siirretty sieltä SELLAISINAAN — sanamuotoja ei ole muokattu. Kaanon
 * myös valitsi täyt (vatikaani, kissat, avaimenreika), kohdenoston
 * (Vesuvius) ja kohtaamispaikan (Aventinuksen avaimenreikä).
 *
 * FAKTAPOHJA syvennyksille: docs/mantereet-tyoaineisto/takyt-rooma.md
 * ja docs/mantereet-tyoaineisto/takynostot-italia.md, joiden jokainen
 * väite on tarkistettu en-Wikipediasta artikkeli ja kohta kerrallaan.
 * Täkyjen ja täkynostojen teksteissä EI ole yhtään faktaa noiden
 * raporttien ulkopuolelta. Oppitunti käyttää lisäksi pelin omaa, jo
 * hyväksyttyä Rooma-aineistoa (ks. oppitunnin oma kommentti).
 *
 * ── KOLME KAANONIN RAJAUSTA, JOTKA ON NOUDATETTU ───────────────────
 *
 * 1. EI SILMINNÄKIJÄHEITTOA. Kaanonin kohta 2 sanoo sen suoraan:
 *    Roomaan ei tule pöllön "olen katsellut tätä sata viisikymmentä
 *    vuotta" -heittoa lainkaan. Sitä ei ole tässä tiedostossa
 *    yhdessäkään tekstissä — ei pöllön huomiossa, ei täyissä eikä
 *    aarremerkinnän jälkeisessä kuittauksessa.
 *
 * 2. PÖLLÖN HUOMION TOINEN VIRKE VAIHTUI. Kaanonin ensisijainen muoto
 *    oli *"Ikkunasta katselu ei ainakaan lopu: nykyinen paavi tervehtii
 *    samasta ikkunasta joka sunnuntai"*, ja kaanon määräsi rakentajan
 *    tarkistamaan sen lähteestä. TARKISTUS 25.8.2026: takyt-rooma.md
 *    (täky 4) vahvistaa vuosiluvun 1929 sanatarkasti ("until the
 *    Lateran Treaty of 11 February 1929", "For the next 59 years"),
 *    mutta sunnuntai-ikkunasta EI ole raporteissa sanaakaan. Kaanon
 *    varautui tähän ja antoi korvaavan muodon — *"Ikkunat ovat yhä
 *    samat."* — ja juuri se on nyt tekstissä. Vahvistamatonta väitettä
 *    ei kirjoiteta peliin (Perustuslain totuudellisuuspilari).
 *
 * 3. LEHTITEHTÄVÄT KIERTÄVÄT LAATTAKYSYMYKSEN. Kaanonin kohta 7:
 *    *"älä käytä laattakysymyksen aihetta"*. Rooman laattakysymys
 *    (js/tyohuone-kehitys-data.js, KAARI_PAKETIT, id 'rooma') kysyy,
 *    mitä tarun mukaan tapahtuu, kun heittää kolikon Trevin lähteeseen
 *    olan yli. Kumpikaan alla olevista lehtivisoista ei koske Treviä
 *    eikä kolikkotapaa millään tavalla.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa ja Sofiassa: vastaus löytyy syvennystekstistä,
 * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan. Skeema on
 * lehden minitehtävän oma (js/ui.js piirraMinitehtava): kysymys,
 * vaihtoehdot, oikean indeksi ja faktarivi, joka näytetään vasta
 * vastauksen jälkeen.
 *
 * ── ELÄINTÄKY ──────────────────────────────────────────────────────
 *
 * Raamattu, osio "Fokusmoodi", ELÄINTÄYT (omistaja 25.8.2026):
 * *"Tavoite: joka maahan vähintään yksi eläinaihe"*. Italiassa se on
 * täky 'kissat' (Largo di Torre Argentinan kissapyhäkkö), ja sama aihe
 * kantaa myös täkynostopoolin ensimmäisenä nostona. LIVE-KAMERAA EI
 * OLE: takynostot-italia.md:n kameralistasta on tarkistettu vain se,
 * että osoite vastasi HTTP 200:lla, ja raportti kieltää sen käytön
 * suoraan — *"eikä yhtään näistä saa laittaa peliin pelkän tämän
 * listan nojalla"*. Sama ehto on Raamatussa: upotus ja CORS
 * selvitetään erikseen ennen lupaamista.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto tulee takyt-rooma.md:n tai
 * takynostot-italia.md:n omalta, tiedostotasolla tarkistetulta
 * listalta: olemassaolo, koko, lisenssi, tekijä ja kuvaus on kysytty
 * Commonsin imageinfo-rajapinnalta 25.8.2026 — ei arvattuja nimiä.
 * Kaikki ovat PD, CC0 tai CC BY / CC BY-SA, ja tekijä on `lahde`-
 * rivillä, koska CC BY vaatii maininnan.
 *
 * PÖLLÖN KUVA EI OLE HEROKUVA. Ateenassa vaihe 2 esittelee generoidun
 * herokuvan (`ampari`); Roomalla sellainen on olemassa
 * (js/packs/kulttuuri-kategoriat.js viittaa polkuihin
 * herokoe/hero-rooma-aamu|keskipaiva|ilta.png), mutta ne ovat lehden
 * kansikuvia eivätkä tämän vaiheen aihetta: pöllö puhuu Vatikaanin
 * muurista, ei kaupunkinäkymästä. Kenttä `tiedosto` toimii
 * `ampari`-kentän sijasta sellaisenaan (js/fokusvirta.js kuvanOsoite).
 */
import { itaFokuskohteet } from './fokuskohteet-ita.js';

/*
 * NASONEVISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Väite on lehden sivun 2 ("Arki ja vesi") oman noston
 * "Iso nenä joka kulmassa" tekstiä: Rooman kaduilla seisoo
 * valurautaisia pylväitä, joiden koukkuputkesta juoksee vettä yötä
 * päivää, ensimmäiset pystytettiin 1870-luvulla, roomalaiset ristivät
 * ne nasoneiksi eli isoiksi neniksi, ja niitä on kaupungissa yhä noin
 * 2 500.
 *
 * MIKSI TÄMÄ EIKÄ SIVUN AKVEDUKTINOSTO. Sivun toinen nosto ("Vesi
 * kulkee yhä") kertoo, että vesi liikkuu pelkällä painovoimalla — ja
 * juuri sitä kysyy Rooman kulttuurivisa (js/packs/europe-kulttuuri.js:
 * *"Miten Rooman akveduktit saivat veden liikkeelle?"*), joka on
 * fokusmoodissa sivun 1 AARTEEN AVAUS -tehtävä. Kaksi samaa vastausta
 * peräkkäisillä sivuilla olisi sama kysymys kahdesti.
 *
 * MIKSI EI LAATTAKYSYMYSTÄ LÄHELTÄ. Ks. tiedoston alku, rajaus 3:
 * nasonet eivät liity Treviin eivätkä kolikkotapaan mitenkään.
 *
 * SIVUN OMA TEHTÄVÄ VÄISTYY. Aihesivulla 'arki' on jo `tehtava`-kenttä
 * (miten nasonen vesi saadaan suihkuamaan ylöspäin). Nimetty tehtävä
 * syrjäyttää sen (js/fokustehtavat.js), jolloin sivulla on Raamatun
 * vaatima YKSI minitehtävä eikä kahta. Aihe säilyy — kysymyksen kulma
 * vain vaihtuu sormitempusta vuosilukuun, ja vuosiluku on se, joka
 * osuu isoisän omaan vuosikymmeneen.
 */
const NASONE_VISA = {
  kysymys: 'Rooman kaduilla on juomavesihanoja, joita sanotaan '
    + 'nasoneiksi. Milloin ensimmäiset niistä pystytettiin?',
  vaihtoehdot: [
    '1870-luvulla',
    '1600-luvulla, barokin aikaan',
    '1950-luvulla',
  ],
  oikea: 0,
  fakta: 'Nasone tarkoittaa isoa nenää, ja nimi tuli vasta myöhemmästä, '
    + 'yhdestä kaarevasta suusta. Turismo Roman ja Acean mukaan ensimmäiset '
    + 'tulivat vuonna 1874, joten isoisän matkavuonna 1873 niitä ei ehkä '
    + 'vielä ollut.',
};

/*
 * METROVISA — kevyen kulun JULISTE-tehtävä (sivu 3).
 *
 * SISÄLTÖ ON LEHDEN OMAA. Väite on "Matkailijan Rooma" -artikkelin
 * jakson "Perille ja liikkeelle" tekstiä (js/packs/
 * kulttuuri-kategoriat.js): Roomassa kuljetaan jalan, keskusta on tiheä
 * ja kadut kapeita, eikä metro auta paljon — linjoja on vain kolme,
 * koska joka kerta kun maata kaivetaan, vastaan tulee antiikin muureja
 * ja työ pysähtyy vuosiksi. Kysymys ei toista tuota lausetta
 * sellaisenaan.
 *
 * MIKSI SIVULLA 3 EIKÄ SILLÄ SIVULLA, JOLLA JAKSO ON: sama ratkaisu
 * kuin Ateenassa ja Sofiassa. Sivu 3 on Menovinkit, jonka sisältö on
 * koko maan yhteinen linkkilista (js/packs/maa-kategoriat.js, ITA) —
 * sillä ei ole omaa kaupunkifaktaa, josta visan voisi tehdä, ja lehden
 * jokaisella sivulla paitsi etusivulla on Raamatun mukaan oltava
 * kysymys.
 */
const METRO_VISA = {
  kysymys: 'Roomassa metroverkko on jäänyt hyvin pieneksi: linjoja on '
    + 'vain kolme. Mikä on syynä?',
  vaihtoehdot: [
    'Maata kaivettaessa vastaan tulee antiikin muureja ja työ pysähtyy',
    'Pehmeä savimaa ei kanna tunneleita',
    'Tiber tulvii tunneleihin joka kevät',
  ],
  oikea: 0,
  fakta: 'Siksi Roomassa kuljetaan jalan: keskusta on tiheä ja kadut '
    + 'kapeita. Katukiveys on nimeltään sanpietrini — pieniä mustia '
    + 'laavakiviä, jotka on ladottu viuhkakuvioon.',
};

export const FOKUSVIRTA_ROOMA = {
  kaupunki: 'rooma',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    /*
     * Isoisän kuva (omistaja 15.11.2026 klo 19.19 tekstin yhteydessä, kuvalinja 12.11. P-261112-29): Codexin havainnekuva Colosseumin
     * kitkennästä, vanhan valokuvan ilme, isoisää ei näytetä (tehtävä #2258, 1536×1024, SHA-256 aee54ee50b91a67455e2913df5a6f3ddd7290e772a4d3403e28b1e01ae8e3980,
     * postilaatikkohaara _review-isoisa-rooma-kitkenta-20261115/, commit 0682353882). Vanha Pantheon-kuva (r20260909-paper-v4) ja luentakuva2 pois.
     * KK:n silmä ja omistajan sana ennen yhdistämistä; kuva viedään ämpäriin kuten Pariisin isoisa-pariisi-valokuva-v2.png (JU/PT).
     */
    luentakuva: {
      osoite: "https://media.matkakirja.app/kuvat/kaupunki-intro-v3/isoisa-rooma-kitkenta-v1.png",
      lyhyt: "Rooma, noin 1871. Työmiehet kitkevät kasveja Colosseumin muurilta.",
      selite: 'Työmiehet köysissä kitkevät kasveja Colosseumin ulkomuurilta. Kasvillisuus poistettiin muureilta noin vuosina 1870–1871, ettei se rikkoisi kiveä.',
      lahde: "Matkakirjan havainnekuva",
      // Kitkennän ajankohta: Vistanet 22.12.2020 (1870, Pietro Rosa) ja en-Wikipedia Colosseum (1871); ks. docs/raportit/rooma-isoisa-pulu-luonnos-20261115.md.
      lahteet: [
        "https://www.vistanet.it/roma/2020/12/22/lo-sapevate-nel-colosseo-vivono-centinaia-di-specie-botaniche-esotiche-e-rare/",
        "https://en.wikipedia.org/wiki/Colosseum",
      ],
    },
    /* Kaanon, kohta 1 — paikkarivi ja teksti sellaisinaan. */
    paikkarivi: 'Rooma, lokakuussa 1873. Sadetta; katukivet kiiltävät; '
      + 'puntari matalalla.',
    /* KAANON: OMISTAJAN TEKSTI (omistaja 15.11.2026 klo 19.19 "kelpaa"; SK:n luonnos docs/raportit/rooma-isoisa-pulu-luonnos-20261115.md, PR 6815). Sanasta sanaan. 232 merkkiä. */
    teksti: "Colosseumin muureilla oli kasvanut yli neljäsataa kasvilajia. Pari vuotta sitten ne kitkettiin pois, etteivät juuret rikkoisi kiveä. Kysyin vartijalta, pysyvätkö ne poissa. Hän sanoi, että kasvit tietävät sen paremmin kuin kaupunki.",
    /*
     * Luenta ja äänite: kaanon, kohta 1. Teksti on sama kuin yllä —
     * vain tunnetagit on lisätty, samoin kuin Ateenassa ja Sofiassa.
     *
     * HUOM RAPORTTIIN: tiedosto assets/audio/
     * puhe-fokus-matkakirja-rooma.mp3 on generoitu, mutta se EI ole
     * tässä työpuussa eikä main-haarassa — ks. tämän paketin raportti.
     * Polku on kirjoitettu tähän kaanonin mukaisena, koska äänite on
     * olemassa; jos se puuttuu julkaisuhetkellä, kytkin jää soimatta
     * eikä mikään muu hajoa (js/fokusvirta.js lukee kentän vain
     * kytkintä varten).
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
     * Hiljaiset osuudet: "Rooma on nyt Italian pääkaupunki..."
     * (selittävä sivulause, pulu kuuntelee).
     */
    reaktiot: [
  {
    "id": "rooma.r1",
    "ankkuri": "neljäsataa kasvilajia",
    "tarkoitus": "myotailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 19.19) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "rooma.r2",
    "ankkuri": "kitkettiin pois",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 19.19) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "rooma.r3",
    "ankkuri": "pysyvätkö ne poissa",
    "tarkoitus": "epailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 19.19) sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "rooma.r4",
    "ankkuri": "kasvit tietävät sen paremmin kuin kaupunki",
    "tarkoitus": "huvittuu",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Uuden tekstin (omistaja 15.11.2026 19.19) sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: isoisän uusi ääni (kaupunki-intro-v3, ÄÄ otto, teksti ilman tageja, 15,62 s; JU vienyt 16.11.2026 11.09), ämpärin täysi osoite kuten Pariisissa, Lontoossa ja Wienissä. */
    luenta: "[curious] Colosseumin muureilla oli kasvanut yli neljäsataa kasvilajia. Pari vuotta sitten ne kitkettiin pois, etteivät juuret rikkoisi kiveä. Kysyin vartijalta, pysyvätkö ne poissa. [warmly] Hän sanoi, että kasvit tietävät sen paremmin kuin kaupunki.",
    aanite: 'https://media.matkakirja.app/aanet/kaupunki-intro-v3/isoisa-rooma.mp3',
    /*
     * KUVA: kaanonin ensisijainen valinta — Ludovico Tuminellon
     * valokuva Porta Pian murtumasta, otettu jo seuraavana päivänä
     * 21.9.1870. Takyt-rooma.md, täky 5: 2048×998, public domain.
     * Kun isoisä kolme vuotta myöhemmin käveli samaa katua, muurinaukko
     * oli kaupungin tuorein nähtävyys — merkintä ei mainitse sitä,
     * kuva mainitsee, ja juuri siitä syntyy vaiheen 2 jatko.
     */
    kuva: {
      tiedosto: 'Ludovico Tuminello - Veduta panoramica della breccia di Porta Pia scattata il 21 settembre 1870.jpg',
      lyhyt: 'Aukko Aurelianuksen muurissa Porta Pian vieressä; kuva otettiin päivä valtauksen jälkeen 21.9.1870.',
      selite: 'Aukko Aurelianuksen muurissa Porta Pian vieressä. '
        + 'Valokuva on otettu päivä valtauksen jälkeen, 21. syyskuuta '
        + '1870.',
      lahde: 'Ludovico Tuminello 1870, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio ----------
   * Kaanon, kohta 2. Ensimmäinen virke sellaisenaan; toinen virke on
   * kaanonin oma korvaava muoto, ks. tiedoston alku, rajaus 2.
   */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, pulu-cam-rooma-01-r20260909-14mm-text1-v2.jpg, tilaus
     * PULU-CAM-EUROOPPA-20260909-OHJAUS-01; omistaja: "ne voi hyvaksya
     * sellaisenaan suoraan peliin"). Kuvatekstit tekstisession sanasta
     * sanaan: lyhyt kuvan alle, pitka karuselliin. Lahteet on
     * tausta-aineisto (ei nay pelaajalle).
     */
    /*
     * PULUN KUVA (omistaja 16.11.2026 klo 09.09; PT): Codexin havainnekuva Colosseumin kasvit, tehtävä #2351 (fc28d28de2);
     * Commonsin valokuva (Adrian Farwell, CC BY 3.0) pois. Lähde: /Users/Shared/Claude/pulu-kuvaesikatselut/rooma-colosseum-codex-v2.jpg
     * (neliö 1254 px; rajaus = koko neliö ympyrään, ei `rajaus`-kenttää). Kuva viedään ämpäriin (JU/PT) osoitteeseen alla ennen
     * yhdistämistä. Lähderivi: Matkakirjan havainnekuva, ei valokuvaajaa. Kuvateksti uuden kuvan mukaan (KK 16.11. klo 09.17): muurin harja, kukkiva pensas ja saniainen. Faktat (kasvilajit) Caneva ym. 2002 ja Vistanet 22.12.2020, ks. docs/raportit/rooma-isoisa-pulu-luonnos-20261115.md.
     * `lyhyt` ja `selite` ovat KK:n sanelemat.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-rooma-colosseum-kasvit-codex-v2.jpg',
        lyhyt: 'Vihreää Colosseumin muurin harjalla.',
        selite: 'Kukkiva pensas ja saniainen kasvavat Colosseumin muurin raoissa. Colosseumilla kasvaa yhä yli kaksisataa kasvilajia.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://link.springer.com/article/10.1080/11263500212331351199',
          'https://www.vistanet.it/roma/2020/12/22/lo-sapevate-nel-colosseo-vivono-centinaia-di-specie-botaniche-esotiche-e-rare/',
        ],
      },
    ],
    /* Maadoitus poistettu 8.9.2026 (omistaja: yksi kupla per kaupunki); kupla alla. */
    /* KUPLA: OMISTAJAN TEKSTI (omistaja 15.11.2026 klo 19.19 "kelpaa"). Sanasta sanaan. 108 merkkiä. */
    kommentti: ["Vartija oli oikeassa! Colosseumilla kasvaa yhä yli kaksisataa lajia. Kitkijät eivät saaneet viimeistä sanaa."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'ilo', voimakkuus: 0.5 },
    teksti: 'Muurin sisällä pysyttiin viisikymmentäyhdeksän vuotta — vasta '
      + '1929 paavi astui taas Rooman puolelle. Ikkunat on yhä ihan '
      + 'samat.',
    /*
     * Takyt-rooma.md, täky 15: 3031×4592, CC0, Jebulon, 2013. Kuva on
     * nykypäivän Pietarinaukio — juuri se aukio, jolle päin antavalle
     * parvekkeelle paavit kieltäytyivät näyttäytymästä. Selite kertoo
     * obeliskista vain sen, minkä lähde kertoo.
     */
    kuva: {
      tiedosto: 'Obelisk Saint Peter square Vatican.jpg',
      lyhyt: 'Pietarinaukion obeliski Vatikaanissa on ainoa Rooman muinaisobeliskeista, joka ei koskaan kaatunut.',
      selite: 'Pietarinaukion obeliski Vatikaanissa. Se on ainoa Rooman '
        + 'muinaisobeliskeista, joka ei ole koskaan kaatunut.',
      lahde: 'Jebulon, Wikimedia Commons (CC0)',
    },
  },

  /* ---------- 3. Pöllön valinta ---------- */
  valinta: {
    kysymys: 'Mistä haluaisit kuulla ensin?',
    // Kaanon, kohta 3: vaadittuja 1.
    vaadittuja: 1,
    aarreNappi: 'Jatka aarteelle',
    aarreEste: 'Kuuntele ensin yksi tarina',
  },

  /*
   * ---------- 3b. Kohdenostot ----------
   * Kaanon, kohta 3: kohdenostoksi Vesuvius — *"purkaus 1872, vuosi
   * ennen isoisän matkaa"*. Kohde asuu maan omassa listassa
   * (js/packs/fokuskohteet-ita.js), koska kohde ei kuulu yhdelle
   * kaupungille — täällä on vain poiminta tunnuksella. Kohdenosto ei
   * ole täky: siitä ei tule minivisaa eikä palkkiota, eikä se avaa
   * aarreporttia.
   */
  kohteet: itaFokuskohteet(['vesuvius']),

  /* ---------- 4. Kolme täkypolkua ---------- */
  takyt: [
    {
      id: 'vatikaani',
      nappi: 'Mies, joka ei tullut ulos',
      otsikko: 'Vatikaanin vanki',
      /* Faktat: takyt-rooma.md, täyt 4 ja 5 (molemmat VARMOJA). */
      teksti: 'Rooman valtaus kesti yhden aamupäivän. Italian tykistö '
        + 'aloitti tulen kello viideltä 20. syyskuuta 1870, ja '
        + 'muutaman tunnin päästä Aurelianuksen muuriin oli ammuttu '
        + 'aukko Porta Pian viereen; siitä joukot virtasivat kaupunkiin, '
        + 'ja Pietarinkirkon kupoliin nostettiin valkoinen lippu. '
        + 'Paaville tarjottiin omaa pikkuvaltiota Vatikaanin kukkulalla, '
        + 'ja Pius IX kieltäytyi. Vuoden 1871 takuulaki olisi antanut '
        + 'hänelle kuninkaan arvoiset kunnianosoitukset ja oikeuden '
        + 'lähettää lähettiläitä, mutta hän ei hyväksynyt sitäkään: lain '
        + 'voisi kumota sama valta, joka sen antoi. Niinpä hän jäi '
        + 'Vatikaanin palatsiin eikä poistunut sieltä — ei hän eikä '
        + 'yksikään hänen seuraajistaan ennen vuotta 1929. '
        + 'Pietarinaukiolle päin antavalle parvekkeelle paavit '
        + 'kieltäytyivät näyttäytymästä, ja siunaukset annettiin '
        + 'sisäpihalle. Isoisäsi matkavuonna asia oli tuore ja päällä: '
        + 'Rooma oli ollut Italian pääkaupunki kaksi vuotta ja paavi '
        + 'Vatikaanin vanki kolme.',
      lahde: 'en-Wikipedia "Prisoner in the Vatican". Tarkistettu 1.9.2026.',
      /*
       * Takyt-rooma.md, täky 4: 3172×4000, public domain, Adolphe
       * Braun, kuvattu 13.5.1875 — valokuva paavista kaksi vuotta
       * isoisän matkan jälkeen.
       *
       * IKÄSOPIVUUS/SÄVY (raportin oma varoitus): aihe on
       * poliittis-uskonnollinen ja kerrotaan tapahtumana, ei kantana.
       * Raportin mainitsemat kuninkaan kirkonkirous ja Garibaldin
       * kärkevä sitaatti EIVÄT ole tässä. Uhriluvuista raportti antaa
       * kaksi eri lähdettä, joten lukua ei ole kirjoitettu lainkaan.
       */
      kuva: {
        tiedosto: 'Pius IX, by Adolphe Braun, 1875.jpg',
        selite: 'Pius IX vuonna 1875. Hän oli tuolloin ollut viisi '
          + 'vuotta poistumatta Vatikaanista.',
        lahde: 'Adolphe Braun 1875, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Vuoden 1871 takuulaki olisi antanut paaville kuninkaan '
          + 'arvoiset kunnianosoitukset. Miksi hän ei ottanut sitä '
          + 'vastaan?',
        vaihtoehdot: [
          'Laki olisi vienyt häneltä Pietarinkirkon',
          'Saman lain olisi voinut kumota se valta, joka sen antoi',
          'Laki olisi kieltänyt häntä lähettämästä lähettiläitä',
        ],
        oikea: 1,
        fakta: 'Yksikään paavi ei poistunut Vatikaanista ennen vuotta '
          + '1929. Siihen mennessä muurin sisällä oli oltu '
          + 'viisikymmentäyhdeksän vuotta.',
      },
    },
    {
      id: 'kissat',
      nappi: 'Kissat, jotka asuvat murhapaikalla',
      otsikko: 'Largo di Torre Argentinan kissapyhäkkö',
      /*
       * ELÄINTÄKY (Raamattu, ELÄINTÄYT-linjaus 25.8.2026). TEKSTI UUSITTU 17.11.2026 (Rooman 9 tarinapaikkaa, KK:n
       * DATA-SANA; SK:n data-luonnos docs/raportit/rooma-9-tarinapaikkaa-dataluonnos-20261116.md): vain väitteet,
       * jotka täyttävät kahden lähteen säännön. Kissojen lukumäärä on arvioiden mukaan, Caesarin
       * murhapaikasta sanotaan "perinteisen tunnistuksen mukaan". Sama teksti kuin täkynostolla 'kissat' ja
       * kohdekartan jutulla 'Torre Argentina' (yksi piste, kaksi nostoa).
       */
      teksti: 'Largo di Torre Argentina on Rooman keskustan aukio, jossa on '
        + 'kaivauskuoppa. Kun vanhaa korttelia purettiin vuosina '
        + '1926–1929, kuopasta paljastui neljä tasavallan ajan temppeliä. '
        + 'Temppeleitä merkitään kirjaimilla A, B, C ja D, koska ei '
        + 'tiedetä varmasti, mille jumalalle kukin kuului.'
        + '\n\n'
        + 'Temppeleiden takana on Pompeiuksen portiikin Curian eli '
        + 'senaatin kokoushuoneen kivijalka. Perinteisen tunnistuksen '
        + 'mukaan Julius Caesar murhattiin juuri tässä Curiassa vuonna 44 '
        + 'eaa.'
        + '\n\n'
        + 'Kaivausten jälkeen kuoppaan alkoi kerääntyä kulkukissoja. '
        + 'Näyttelijä Anna Magnani kuului roomalaisiin, jotka ruokkivat kissoja. Vuonna 1993 perustettiin '
        + 'vapaaehtoisten ylläpitämä kissasuoja, ja arvioiden mukaan siellä on noin 200 kissaa. Vuonna 2012 arkeologiviranomaiset '
        + 'vaativat suojan poistamista, koska se oli rakennettu ilman '
        + 'lupaa ja haittasi raunioiden säilymistä. NPR:n mukaan kissoja '
        + 'itseään ei kuitenkaan voitu häätää.'
        + '\n\n'
        + 'Isoisäsi matkavuonna 1873 temppelit olivat vielä talojen ja maan kätkössä. Paikalla oli tiivis kortteli, '
        + 'ja temppeli A:n sisään rakennettu San Nicola de\' Cesarini '
        + '-kirkko seisoi vielä; se purettiin vasta 1926–1929. Kissoja ei '
        + 'ollut vielä, ja kissasuoja tuli vasta 1993.',
      lahde: 'Matkakirjan oma teksti · lähteinä Sovrintendenza Capitolina, Turismo Roma, Treccani, Discover Magazine, History Blog, NPR ja Gatti di Roma',
      /*
       * Takyt-rooma.md, täky 1 (ja takynostot-italia.md, ehdokas 1):
       * 5760×3840, CC BY 2.0, Andy Rusch, 2015 — kissat raunioilla.
       */
      kuva: {
        tiedosto: 'Cat Sanctuary, Cats, Largo di Torre Argentina, Rome - 398 (19257774921).jpg',
        selite: 'Kissoja Largo di Torre Argentinan raunioilla. Kuopan '
          + 'pohjalla on neljä tasavallan ajan temppeliä.',
        lahde: 'Andy Rusch, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Mitä Largo di Torre Argentinan kuopasta paljastui, kun '
          + 'vanhaa korttelia purettiin vuosina 1926–1929?',
        vaihtoehdot: [
          'Neljä tasavallan ajan temppeliä',
          'Rooman suurin amfiteatteri',
          'Keisarin palatsin kellari',
        ],
        oikea: 0,
        fakta: 'Temppeleitä merkitään kirjaimilla A, B, C ja D, koska ei '
          + 'tiedetä varmasti, mille jumalalle kukin kuului.',
      },
    },
    {
      id: 'avaimenreika',
      nappi: 'Lukonreikä, josta näkyy toinen valtio',
      otsikko: 'Aventinuksen avaimenreikä',
      /*
       * Faktat: takyt-rooma.md, täky 12 (VARMA). LÄHDEHUOMIO, jonka
       * kaanon (kohta 3) määrää kirjattavaksi: omaa Wikipedia-
       * artikkelia "Aventine Keyhole" EI ole olemassa — haku palautti
       * *missing* — vaan tieto asuu artikkelin "Villa del Priorato di
       * Malta" osiossa "Keyhole". Tieto on siis varmennettu, mutta sitä
       * ei löydy siltä hakusanalta, jolla sitä ensin etsittiin.
       *
       * Tämä on myös koko täkytyypin esikuva: Raamattu käyttää juuri
       * tätä kuvaa täyn määritelmässä (*"tyyliä 'lukonreiästä näkyy
       * täydellisesti rajautuva rakennus'"*) — ja se on oikeasti
       * Roomassa.
       */
      teksti: 'Aventinuksen kukkulalla on pieni aukio, jonka toisella '
        + 'laidalla on Maltan ritarikunnan villa. Sen portin keskellä '
        + 'on avaimenreikä, ja kun siitä katsoo, näkee kolmen valtion '
        + 'läpi kerralla: heti reiän takana on ritarikunnan puutarha, '
        + 'jolla on Italiassa eksterritoriaalinen asema, puutarhan läpi '
        + 'kulkee sypressien rajaama käytävä, ja käytävän päässä '
        + 'täydellisesti rajautuneena Pietarinkirkon kupoli '
        + 'Vatikaanissa. Portin suunnitteli vuonna 1765 Giovanni '
        + 'Battista Piranesi, kuparipiirrostaiteilija, joka piti '
        + 'itseään ennen kaikkea arkkitehtina. Puutarha sai '
        + 'eksterritoriaalisen asemansa 1869 — neljä vuotta ennen kuin '
        + 'isoisäsi seisoi portin edessä.',
      lahde: 'en-Wikipedia "Villa del Priorato di Malta". Tarkistettu '
        + '1.9.2026.',
      /*
       * Takyt-rooma.md, täky 12: 1536×2150, CC0, Galen Crout, 2016 —
       * näkymä reiän läpi, eli tasan se, mistä teksti puhuu.
       */
      kuva: {
        tiedosto: 'Knights of Malta Keyhole, Aventine Hill, Rome (cropped).jpg',
        lyhyt: 'Näkymä Maltan ritarikunnan avaimenreiästä: sypressikäytävä ja Pietarinkirkon kupoli päässä.',
        selite: 'Näkymä Maltan ritarikunnan portin avaimenreiästä: '
          + 'sypressikäytävä ja sen päässä Pietarinkirkon kupoli.',
        lahde: 'Galen Crout, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Portin, jonka keskellä avaimenreikä on, suunnitteli '
          + 'mies, joka tunnetaan paremmin kuparipiirroksistaan. Kuka?',
        vaihtoehdot: [
          'Francesco Borromini',
          'Gian Lorenzo Bernini',
          'Giovanni Battista Piranesi',
        ],
        oikea: 2,
        fakta: 'Piranesin toteutuneita rakennussuunnitelmia on hyvin '
          + 'vähän, ja tämä on yksi niistä. Reiän takana oleva puutarha '
          + 'on ollut eksterritoriaalinen vuodesta 1869.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, rooma: *"Mitä tarun
   * mukaan tapahtuu, kun heittää kolikon Trevin suihkulähteeseen
   * olkapään yli?"* → palaat vielä Roomaan).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT OVAT PELIN OMASTA ROOMA-AINEISTOSTA: lähteen mitat, Salvin
   * vuodet ja merenjumalan kaksi hevosta (js/packs/nahtavyysjutut.js,
   * "Trevin suihkulähde"); Aqua Virgo ja Caritas-lahjoitus Rooman 9
   * tarinapaikan korjatuin tekstein (17.11.2026, nostot "Vesi kulkee
   * yhä" ja "Kolikko olan yli"). Mitään uutta faktaväitettä ei ole
   * lisätty.
   *
   * AKVEDUKTIN PAINOVOIMAA EI SELITETÄ TÄSSÄ: se on sivun 1
   * kulttuurivisan vastaus (ks. NASONE_VISAn kommentti).
   */
  oppitunti: {
    otsikko: 'Aqua Virgo — vesijohto, joka päättyy altaaseen',
    teksti: 'Trevin lähde ei ole muistomerkki vaan vesijohdon pää. Aqua '
      + 'Virgo valmistui vuonna 19 eaa., ja Frontinuksen mukaan se kulki '
      + 'suurimman osan noin 20 kilometrin matkastaan maan alla. Nimi '
      + 'Virgo tarkoittaa neitoa. Nykyinen allas on paljon '
      + 'uudempi. Arkkitehti Nicola Salvi aloitti sen 1732, ja se '
      + 'valmistui 1762, yksitoista vuotta hänen kuolemansa jälkeen. Keskellä ajaa merenjumala '
      + 'vaunuillaan, joita vetävät kaksi hevosta, toinen rauhallinen ja '
      + 'toinen villi. Altaan reunalla heitetään yhä kolikko olan yli. '
      + 'Tarinan mukaan se takaa paluun Roomaan. Vuonna 2022 altaasta '
      + 'kerättiin kolikoita yli 1,4 miljoonan euron arvosta, ja ne '
      + 'lahjoitetaan hyväntekeväisyyteen vähävaraisten auttamiseksi.',
    /*
     * Kuva on pelin oma, jo hyväksytty valinta (js/packs/
     * nahtavyysjutut.js, "Trevin suihkulähde"): käsin väritetty
     * photochrom Library of Congressin kokoelmasta, noin 1890-luvulta.
     * Aukio on siinä lähes tyhjä — lähin mahdollinen kuva siitä
     * Roomasta, jonka isoisä näki.
     */
    kuva: {
      tiedosto: 'Fountain of Trevi, Rome, Italy LOC 4755209370.jpg',
      selite: 'Trevin suihkulähde noin 1890-luvun photochromissa, aukio '
        + 'lähes tyhjänä.',
      lahde: 'Tuntematon (Library of Congress -kokoelma), Wikimedia '
        + 'Commons (public domain)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Kaanon, kohta 4: *"Rakentaja tarkistaa olemassa olevan hahmon ja
   * laattakysymyksen — EI vaihdeta."*
   *
   * TARKISTETTU 25.8.2026: js/packs/kohtaamiset.js:ssä EI ole Rooman
   * riviä. Rooman hahmo on silti olemassa ja pelissä käytössä:
   * tarinakaaren paketti js/tyohuone-kehitys-data.js (KAARI_PAKETIT,
   * id 'rooma') antaa hahmon JA sen kysymyksen, jonka game.actionQuiz
   * esittää laatalla (js/game.js kaariTarina); tämä paketti ei kosketa
   * kysymystä millään tavalla.
   *
   * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut. HENKILÖ VAIHTUI:
   * suihkulähteenhoitaja Enzo → pasunisti Nico (kuvaputken
   * tarinaehdotus 5.9.2026, Fablen päätös samana iltana klo 20:05 UTC:
   * *"Rooma (pasunisti Nico, Trevi, ilta, juhla kaupungilla)"*). Isältä
   * ja isoisältä peritty kolikonnosto ja huoltoluukun avaaminen ovat
   * poissa; kukaan ei tunne Horatiota eikä odota ketään.
   *
   * KOHTAAMISKUVA on kaaren paketissa (assets/kohtaamiset/
   * kohtaaminen-rooma.jpg) ja esittää yhä Enzoa — se vaihtuu, kun
   * kuvaputken uusi kuva on hyväksytty. Tähän pakettiin ei kirjoiteta
   * omaa kuvapolkua.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Nicon omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Pasunisti Nico',
    nappi: 'Tapaa Nico',
    teksti: 'Nico soittaa iltakeikkoja siellä, missä kaupungissa '
      + 'sattuu olemaan juhla: aukioilla, sivukaduilla, kerran '
      + 'hautajaisissakin väärän osoitteen takia. Nuotteja hän ei kanna '
      + 'mukanaan, koska ohjelmisto on päässä ja koska pasuunan kanssa '
      + 'on muutenkin tarpeeksi kannettavaa. Vanhat katusävelmät hän '
      + 'tunnistaa parista tahdista, ja siitä hän on hiljaisesti ylpeä. '
      + 'Turistien kysymyksiin hän vastaa kohteliaasti ja lyhyesti — '
      + 'tauko on kymmenen minuuttia. Vieraan kirjaa hän katsoo vasta '
      + 'sitten, kun tämä osaa sanoa, mitä altaaseen heitetty kolikko '
      + 'oikeastaan lupaa.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kentät kuin Ateenalla ja Sofialla. Raskas korttivirta ei lue
   * kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: TREVIN SUIHKULÄHDE (5.9.2026; ennen Aventinuksen
   * avaimenreikä), ei kaupungin laatta.
   *
   * SIIRRON SYY on Fablen päätös 5.9.2026 klo 20:05 UTC: *"Rooma
   * (pasunisti Nico, Trevi, ilta, juhla kaupungilla): fokusvirran
   * kohtaamispiste siirtyy Aventinuksen avaimenreiästä Trevin luo,
   * jotta kaupungissa on yksi kohtaamispaikka."* Kaaren kohtaaminen on
   * Trevin laidalla, joten kartan pisteen on osoitettava sinne.
   * Avaimenreikä ei katoa pelistä: se on yhä kaupungin oma
   * syvennystarina ja karttamerkki (js/packs/syvennyspaikat.js, rooma/
   * avaimenreika, sama koordinaatti 41,8836 / 12,4775).
   *
   * 12,48305556 E / 41,90083333 N — en-Wikipedia "Trevi Fountain",
   * prop=coordinates (haettu 5.9.2026).
   *
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla
   * (js/packs/fokuskohteet-ita.js): maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 -175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((12,48305556 − (−175)) mod 360) × (12000/360)
   *                     = 187,48305556 × 33,3333… = 6249,4
   *                   y = (millerY(76) − millerY(41,90083333)) × 12000/2π
   *                     = 1727,5
   *   europe          x = (12,48305556 + 11) × 19,2 = 450,9
   *                   y = (72 − 41,90083333) × 26,3 = 791,6
   *
   * TARKISTUS ROOMAN LAATTAA VASTEN: laatta on maailmankartalla
   * 6249,7 / 1728,1 (js/packs/maailmankartta.js) ja Euroopan laudalla
   * 451 / 792 (js/packs/europe.js). Trevi on laudalla siis alle puolen
   * yksikön päässä laatasta — juuri niin kuin pitääkin, sillä lähde on
   * keskustassa runsaan kilometrin päässä kaupungin keskipisteestä, ja
   * laudan yksikkö on maailmankartalla noin kolme kilometriä.
   * Piirtopuoli siirtää merkin laatan viereen itse (js/fokuspiste.js
   * PISTE_ERO_MIN = 14), kuten se teki avaimenreiällekin. Vanha piste
   * oli 6249,3 / 1728,2 ja 450,8 / 792,1 — siirtymä on laudalla alle
   * yhden yksikön, joten kartan yleisilme ei muutu.
   */
  kohtaamispiste: {
    nimi: 'Trevin suihkulähde',
    laudat: {
      maailmankartta: { x: 6249.4, y: 1727.5 },
      europe: { x: 450.9, y: 791.6 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS (sama perustelu kuin Ateenassa ja
   * Sofiassa). Rooman lehden sivupino rakentuu täsmälleen kuten
   * Sofian (js/lehti.js rakennaSivut), koska kaupungilla on samat kaksi
   * kulttuurikategoriaa ('kaupunki' ja 'arki') ja maalla on
   * Menovinkit-sivu (js/packs/maa-kategoriat.js, ITA): 0 = etusivu,
   * 1 = kaupunkisivu "Rooma", 2 = Arki ja vesi, 3 = Menovinkit.
   *
   * SISÄLTÖ ON LEHDEN OMAA. AARTEEN AVAUS on koottu sivun 2 omasta
   * nasone-nostosta (NASONE_VISA) ja JULISTE "Matkailijan Rooma"
   * -artikkelin liikkumisjaksosta (METRO_VISA) — ei yhtään uutta
   * faktaväitettä kummassakaan, eikä kumpikaan koske laattakysymyksen
   * aihetta.
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on Rooman
   * kulttuurivisa (js/packs/europe-kulttuuri.js, akveduktien
   * painovoima), jonka js/fokustehtavat.js pukee samaksi AARTEEN AVAUS
   * -laatikoksi ilman omaa riviään täällä. Kumpi tahansa aarteen
   * avaajista sytyttää pisteen, ja jälkimmäisestä saa enää rahaa.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: NASONE_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: METRO_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Italia) ----------
   *
   * Raamattu, osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: kun maan
   * aarre on löydetty, kartalta NOUSEE YKSI TÄKYNOSTO — *"lyhyt
   * KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali
   * tai uskomaton tositarina, lupaus lunastetaan faktalla) +
   * miniatyyrikuva perässä"*. Näytetään yksi kerrallaan; luetun tilalle
   * nousee poolista seuraava (js/fokusnosto.js lukee tämän kentän
   * suoraan, joten uusi maa ei vaadi riviä siihen tiedostoon).
   *
   * OTSIKKO ON KAANONIN OMA (fokusvirta-rooma-kaanon.md, kohta 6) —
   * sanamuotoa ei ole muutettu. `lunastus` on rakentajan kokoama lyhyt
   * fakta, joka pitää otsikon lupauksen (takynostot-italia.md, sääntö 1:
   * otsikon lupaus lunastetaan tai se on klikkihuijaus). `avaa` osoittaa
   * tämän tiedoston täkyyn.
   *
   * VAIN YKSI NOSTO PER MAA (omistaja 26.8.2026 ilta: *"Täkyjä josta
   * tulee puhekupla pitää olla vain yksi per maa. Kaikki muut
   * normaaleita."*). Poolissa oli kolme nostoa; jäljellä on kaanonin
   * ensimmäinen. Kumpikaan pudonneista ei tarvinnut uutta kohdetta,
   * koska niiden paikka on jo kartalla omana kohteenaan
   * (js/packs/fokuskohteet-ita.js): "pisan-torni" → kohde `pisa` ja
   * "pompeji" → kohde `pompeji`, molemmat samoilla Commons-kuvilla kuin
   * nostoissa. Kahta merkkiä samaan pisteeseen ei tehdä.
   *
   * LIVE-KAMERAA EI OLE MISSÄÄN NOSTOSSA. Ks. tiedoston alku:
   * takynostot-italia.md:n kameralistasta on tarkistettu vain
   * HTTP 200, ja raportti kieltää käytön sen nojalla.
   */
  takynostot: [
    {
      id: 'kissat',
      symboli: 'elain',
      // Kartan nimiö täkypisteen kylkeen (päätoimittaja 28.8.2026).
      nimio: 'Caesarin kissat',
      /*
       * TEKSTI UUSITTU 17.11.2026 (Rooman 9 tarinapaikkaa, KK:n DATA-SANA; SK:n data-luonnos
       * docs/raportit/rooma-9-tarinapaikkaa-dataluonnos-20261116.md). Sama teksti kuin
       * syvennyksellä 'kissat' ja kohdekartan jutulla 'Torre Argentina' (yksi piste, kaksi
       * nostoa). Vanhan version väitteet temppeli D:n kohdasta, laista 281/1991 ja
       * tappamattomuudesta eivät täyttäneet kahden lähteen sääntöä.
       */
      otsikko: 'Kissat asuvat paikassa, jossa Caesarin uskotaan tulleen '
        + 'murhatuksi',
      lunastus: [
        'Largo di Torre Argentina on Rooman keskustan aukio, jossa on '
          + 'kaivauskuoppa. Kun vanhaa korttelia purettiin vuosina '
          + '1926–1929, kuopasta paljastui neljä tasavallan ajan temppeliä. '
          + 'Temppeleitä merkitään kirjaimilla A, B, C ja D, koska ei '
          + 'tiedetä varmasti, mille jumalalle kukin kuului.',
        'Temppeleiden takana on Pompeiuksen portiikin Curian eli '
          + 'senaatin kokoushuoneen kivijalka. Perinteisen tunnistuksen '
          + 'mukaan Julius Caesar murhattiin juuri tässä Curiassa vuonna 44 '
          + 'eaa.',
        'Kaivausten jälkeen kuoppaan alkoi kerääntyä kulkukissoja. '
          + 'Näyttelijä Anna Magnani kuului roomalaisiin, jotka ruokkivat kissoja. Vuonna 1993 perustettiin '
          + 'vapaaehtoisten ylläpitämä kissasuoja, ja arvioiden mukaan siellä on noin 200 kissaa. Vuonna 2012 arkeologiviranomaiset '
          + 'vaativat suojan poistamista, koska se oli rakennettu ilman '
          + 'lupaa ja haittasi raunioiden säilymistä. NPR:n mukaan kissoja '
          + 'itseään ei kuitenkaan voitu häätää.',
        'Isoisäsi matkavuonna 1873 temppelit olivat vielä talojen ja maan kätkössä. Paikalla oli tiivis kortteli, '
          + 'ja temppeli A:n sisään rakennettu San Nicola de\' Cesarini '
          + '-kirkko seisoi vielä; se purettiin vasta 1926–1929. Kissoja ei '
          + 'ollut vielä, ja kissasuoja tuli vasta 1993.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Sovrintendenza Capitolina, Turismo Roma, Treccani, Discover Magazine, History Blog, NPR ja Gatti di Roma',
      avaa: 'kissat',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (28.8.2026, sama malli kuin Sofian
       * areenalla ja Kreikan kahdella nostolla): repon oma generoitu
       * havainnekuva, jolla ei ole Commons-nimeä eikä varareittiä,
       * joten kenttä on `osoite` eikä `tiedosto` (js/fokusnosto.js
       * asetaNostonKuva).
       *
       * Kuva on aukio tasavallan aikaan — samat neljä temppeliä, jotka
       * kuopasta 1926–1929 paljastuivat — ja portailla istuu kissoja, jotka
       * ovat noston toinen puoli.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-kissat-loistoaika.webp',
        selite: 'Largo di Torre Argentinan temppelit loistoaikanaan, '
          + 'kissoja portailla.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA on nyt entinen pääkuva — nykytila. Sama tarkistettu
       * tiedosto kuin täyllä 'kissat'; selite ja lähde ennallaan.
       */
      valokuva: {
        tiedosto: 'Cat Sanctuary, Cats, Largo di Torre Argentina, Rome - 398 (19257774921).jpg',
        selite: 'Kissoja Largo di Torre Argentinan raunioilla.',
        lahde: 'Andy Rusch, Wikimedia Commons (CC BY 2.0)',
      },
      /*
       * OMAT KOORDINAATIT, JOTTA MERKIN VOI POLTTAA LAATTAAN.
       *
       * Tämä on maan AINOA täkynosto, ja Italiassa on neljä
       * fokuskaupunkia (Venetsia, Firenze, Rooma, Sisilia). Ilman
       * `paikka`-kenttää merkki seurasi pelaajaa kaupungista toiseen
       * (js/fokusnosto.js nostonPaikka) — Caesarin kissat olisivat
       * istuneet Venetsiassa — eikä sellaista merkkiä voi polttaa: koko
       * maa jäi eläväksi (tools/fokuskartta/nostot.mjs, TÄKYN EHTO).
       * Kenttä ei muuta sisältöä, vaan naulaa merkin siihen aukioon,
       * josta nosto kertoo.
       *
       * 41,89527778 N / 12,47694444 E — en-Wikipedia "Largo di Torre
       * Argentina", prop=coordinates (haettu 31.8.2026). Sama kaava ja
       * samat vakiot kuin muillakin nostoilla (js/fokusnosto.js, PAIKKA
       * LAUDALLA): maailmankartta Millerin lieriönä, europe tasavälinä.
       */
      paikka: {
        nimi: 'Largo di Torre Argentina',
        laudat: {
          maailmankartta: { x: 6249.2, y: 1727.8 },
          europe: { x: 450.8, y: 791.8 },
        },
      },
    },
    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTAUUDISTUS, ERÄ 10 (13.9.2026): ROOMAN KAUPUNKILEHDEN SIVUT
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
     * (js/packs/kulttuuri-kategoriat.js, kaupunki `rooma`), ja `kuva` on
     * lehden oma kuvarivi kenttineen. Siirto on tehty ohjelmallisesti ja
     * todennettu ===-vertailulla
     * (tools/savukkeet/savuke-kaupunkien-nostot.mjs vartio 4b avaa jokaisen
     * kortin selaimessa ja vertaa merkki merkiltä).
     *
     * MINIKYSYMYKSET (erän 6 datamalli, kiintiö joka kolmas nosto):
     * `colosseumin-kellari`, `rooman-nasone`.
     * ══════════════════════════════════════════════════════════════
     */
    {
      id: 'rooman-kolikko',
      nimio: 'Kolikko olan yli',
      otsikko: 'Kolikko olan yli',
      symboli: 'historia',
      lunastus: [
        'Trevin suihkulähteestä kerrotaan tarina: kun heittää kolikon '
          + 'olan yli, palaa vielä Roomaan. Se on legenda, ei tosiasia. '
          + 'Kolikoita kertyy paljon, ja vuonna 2022 niitä kerättiin '
          + 'altaasta yli 1,4 miljoonan euron arvosta.',
        'Kolikot kerätään altaan pohjasta talteen ja lahjoitetaan '
          + 'Caritakselle, joka auttaa kaupungin vähävaraisia.',
        'Isoisäsi matkavuonna 1873 Trevin suihkulähde oli jo valmis, '
          + 'sillä se valmistui vuonna 1762, ja sen vesi tuli Aqua Virgo '
          + '-akveduktia pitkin. Siitä ei ole varmaa tietoa, oliko kolikon heittäminen silloin jo tapana.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Turismo Roma, ANSA, Reuters, QuiFinanza, Finestre sull\'Arte ja CoinsWeekly',
      kuva: {
        tiedosto: 'Trevi Fountain - Roma.jpg',
        lyhyt: 'Fontana di Trevi on Palazzo Poli -palatsin päätyseinä, jonka kaaren alla seisoo merenjumala Oceanus.',
        selite: 'Fontana di Trevi ei ole erillinen muistomerkki vaan Palazzo Poli '
          + '-palatsin päätyseinä, jonka kaaren alla seisoo meren jumala '
          + 'Oceanus.',
        lahde: 'NikonZ7II, Wikimedia Commons (CC BY-SA 4.0)',
      },
      /*
       * MUSIIKKI JA ÄÄNI KORTILLE (avoin kohta 11.1, 14.9.2026). Erässä 10
       * tämä nosto jäi lehden sivulle kaksoiskappaleeksi vain siksi, että
       * musiikkilinkille ja ääninäytteelle ei ollut paikkaa kortilla.
       * Kortti piirtää ne nyt SAMOILLA napeilla kuin lehti (js/ui.js
       * lisaaNostonNapit), joten sivulta jäänyt kaksoiskappale purkautui.
       */
      aani: 'https://archive.org/download/aporee_15080_17587/WalkingtoPantheonFountainRome.mp3',
      aaniLahde: '"Walking to Pantheon" — Rolf Yngve, radio aporee (public domain)',
      kysymykset: [
        'Miksi kolikko heitetään Trevin suihkulähteeseen olan yli?',
        'Kuinka paljon kolikoita Trevin altaasta kerättiin vuonna 2022?',
        'Mihin Trevin altaasta kerätyt kolikot lahjoitetaan?',
      ],
      paikka: {
        nimi: 'Kolikko olan yli',
        laudat: {
          maailmankartta: { x: 6249.4, y: 1727.5 },
          europe: { x: 450.9, y: 791.6 },
        },
      },
    },
    {
      id: 'colosseumin-kellari',
      nimio: 'Areenan kellari',
      otsikko: 'Leijona nousi lattian alta',
      symboli: 'historia',
      lunastus: [
        'Colosseumin areena oli puulattia, jonka päälle levitettiin '
          + 'hiekkaa.',
        'Lattian alla oli kaksikerroksinen kellari eli hypogeum, jossa '
          + 'oli käytäviä, häkkejä ja varastohuoneita. Kellarista johti areenalle kymmeniä pystykuiluja ja nostimia. Köysien ja '
          + 'vintturien avulla häkki nostettiin ylös, ja eläin ilmestyi '
          + 'areenalle luukusta.',
        'Isoisäsi matkavuonna 1873 kellari oli vielä hiekan ja maan '
          + 'peitossa. Kellaria kaivettiin esiin useaan otteeseen 1800-luvulla, muun muassa vuosina 1874–1875.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Cerone ym. (Colosseumin areenan lattia), The Collector ja Walks of Italy',
      kuva: {
        tiedosto: 'Hypogeum 1 (15005526662).jpg',
        lyhyt: 'Colosseumin puulattian alla oli kaksikerroksinen kellari hypogeum käytävineen.',
        selite: 'Colosseumin areenan puulattian alla oli kaksikerroksinen kellari '
          + 'eli hypogeum, jossa oli käytäviä, häkkejä ja kymmeniä pystykuiluja.',
        lahde: 'daryl_mitchell from Saskatoon, Saskatchewan, Canada, Wikimedia '
          + 'Commons (CC BY-SA 2.0)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Lehden noston
       * `galleria`-kuvat kulkivat erässä 10 kiertotietä kohdekartan jutun
       * `kuvat`-listaan, koska nostokortti ei tuntenut kenttää. Nyt
       * tuntee (js/fokusnosto.js piirraNostonKuvasarja), joten kuvat ovat
       * siellä missä noston muutkin kuvat — selitteineen ja lähteineen,
       * merkki merkiltä samoina. Kohdekartan jutun oma kuvalista jäi
       * ennalleen: sama sisältö kahdella pinnalla, kuten `kuva` jo oli.
       */
      galleria: [
        {
          tiedosto: 'Colosseum (8473462785).jpg',
          lyhyt: 'Osa areenan lattiaa on rakennettu takaisin; alkuperäinen puulattia peitti koko hypogeumin.',
          selite: 'Osa areenan lattiaa on rakennettu takaisin paikalleen; '
            + 'alkuperäinen puulattia peitti koko hypogeumin.',
          lahde: 'Edgar Jiménez from Porto, Portugal, Wikimedia Commons (CC BY-SA '
            + '2.0)',
        },
      ],
      kysymykset: [
        'Miten kaksikerroksinen kellari käytävineen rakennettiin areenan '
          + 'alle?',
        'Miksi puulattian päälle levitettiin hiekkaa?',
        'Mitä kaksikerroksisessa kellarissa oli?',
      ],
      visa: {
        kysymys: 'Colosseumin areenalla eläin saattoi ilmestyä luukusta. '
          + 'Miten se tehtiin?',
        vaihtoehdot: [
          'Häkki nostettiin köysien ja vintturien avulla ylös',
          'Eläin ajettiin sisään katsomon alta nousevaa ramppia pitkin',
          'Hiekkaan oli kaivettu kuoppa, jonka päällä oli matto',
        ],
        oikea: 0,
        fakta: 'Colosseumin areena oli puulattia, jonka päälle levitettiin '
          + 'hiekkaa.',
      },
      paikka: {
        nimi: 'Areenan kellari',
        laudat: {
          maailmankartta: { x: 6249.7, y: 1728 },
          europe: { x: 451.1, y: 791.9 },
        },
      },
    },
    {
      id: 'minervan-norsu',
      nimio: 'Norsu ja obeliski',
      otsikko: 'Norsu kantaa obeliskia',
      symboli: 'kulttuuri',
      lunastus: [
        'Piazza della Minervan aukiolla Rooman keskustassa seisoo '
          + 'norsupatsas, jonka selässä on punertava graniittiobeliski. '
          + 'Patsaan suunnitteli Gian Lorenzo Bernini, Ercole Ferrata '
          + 'veisti sen, ja se paljastettiin vuonna 1667. Paavi Aleksanteri '
          + 'VII kuoli ennen kuin patsas ehdittiin paljastaa. Obeliski on pieni, noin 5,5 metriä korkea. Turismo Roman '
          + 'mukaan obeliski löytyi vuonna 1665, kun dominikaanit '
          + 'rakensivat Santa Maria sopra Minerva -kirkon puutarhan muuria.',
        'Patsasta kutsuttiin ensin possuksi, "Porcino della Minerva", '
          + 'ja nimi vääntyi ääntämisen mukana muotoon "Pulcino della '
          + 'Minerva", tipu. Nimen kerrotaan johtuneen norsun tanakasta '
          + 'muodosta.',
        'Isoisäsi matkavuonna 1873 norsu oli seissyt aukiolla jo 206 '
          + 'vuotta.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Turismo Roma, Through Eternity, Romewise ja Rolf Gross (The Obelisks of Rome)',
      kuva: {
        tiedosto: 'Elephant and Obelisk.jpg',
        lyhyt: 'Norsupatsaan suunnitteli Gian Lorenzo Bernini ja veisti Ercole Ferrata, ja se paljastettiin 1667.',
        selite: 'Norsupatsaan suunnitteli Gian Lorenzo Bernini ja veisti Ercole '
          + 'Ferrata, ja se paljastettiin vuonna 1667.',
        lahde: 'Livioandronico2013, Wikimedia Commons (CC BY-SA 4.0)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Sama kuvasarja
       * kuin lehden nostolla, josta tämä kortti kirjoitettiin: erässä 10
       * se jäi siirtämättä, koska nostokortti ei tuntenut `galleria`-
       * kenttää. Nyt tuntee (js/fokusnosto.js piirraNostonKuvasarja).
       */
      galleria: [
        {
          otsikko: 'Koko muistomerkki',
          tiedosto: 'Elephant and Obelisk - Bernini.jpg',
          lyhyt: 'Norsun selässä oleva obeliski on yksi Rooman kolmentoista muinaisobeliskin pienimmistä.',
          selite: 'Norsun selässä oleva obeliski on yksi Rooman '
            + 'kolmentoista muinaisobeliskin pienimmistä, noin 5,5 metriä '
            + 'korkea.',
          lahde: 'Petar Milošević, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      kysymykset: [
        'Miten noin 5,5 metriä korkea obeliski nostettiin norsun selkään?',
        'Mistä Rooman muinaisobeliskit ovat alun perin peräisin?',
        'Miksi patsasta kutsuttiin ensin possuksi?',
      ],
      paikka: {
        nimi: 'Norsu ja obeliski',
        laudat: {
          maailmankartta: { x: 6249.3, y: 1727.7 },
          europe: { x: 450.8, y: 791.7 },
        },
      },
    },
    {
      id: 'aqua-virgo',
      wiki: 'Rooman akveduktit',
      nimio: 'Aqua Virgo',
      otsikko: 'Vesi kulkee yhä',
      symboli: 'tekniikka',
      lunastus: [
        'Roomaan rakennettiin aikojen kuluessa jopa yksitoista '
          + 'akveduktia eli vesijohtoa. Ne toimivat pelkällä painovoimalla, '
          + 'ja vesi virtasi loivasti alamäkeen. Aqua Marcia oli noin 91 '
          + 'kilometriä pitkä.',
        'Aqua Virgo valmistui vuonna 19 eaa., kun Agrippa rakennutti '
          + 'sen. Matkaa oli noin 20 kilometriä. Frontinuksen mukaan se '
          + 'kulki suurimman osan matkaa maan alla. Nimi Virgo tarkoittaa '
          + 'neitoa. Aqua Virgo syöttää yhä Trevin suihkulähdettä, ja se on '
          + 'Rooman antiikin akvedukteista ainoa, joka toimii yhä.',
        'Isoisäsi matkavuonna 1873 Aqua Virgo oli ollut olemassa yli 1 '
          + '800 vuotta, ja Trevin suihkulähde, joka valmistui vuonna 1762, '
          + 'sai vetensä siitä jo silloin.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä National Geographic, Engineering Rome, Frontinus (De aquaeductu), Encyclopaedia Romana ja Turismo Roma',
      kuva: {
        tiedosto: 'Aqueducts in Rome.jpg',
        lyhyt: 'Roomaan rakennettiin jopa yksitoista akveduktia, joissa vesi virtasi kourua pitkin painovoimalla.',
        selite: 'Roomaan rakennettiin jopa yksitoista akveduktia, ja vesi '
          + 'virtasi kaarien päällä kulkevassa kourussa pelkän painovoiman '
          + 'voimalla.',
        lahde: 'Livioandronico2013, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten vesi liikkui akveduktissa ilman pumppuja?',
        'Mikä Rooman antiikin akvedukteista toimii yhä?',
        'Mitä nimi Virgo tarkoittaa?',
      ],
      paikka: {
        nimi: 'Aqua Virgo',
        laudat: {
          maailmankartta: { x: 6249.4, y: 1727.5 },
          europe: { x: 450.9, y: 791.6 },
        },
      },
    },
    {
      id: 'rooman-nasone',
      nimio: 'Nasone',
      otsikko: 'Iso nenä joka kulmassa',
      symboli: 'tekniikka',
      lunastus: [
        'Rooman kaduilla on juomavesihanoja, joita sanotaan nasoneiksi, '
          + 'isoiksi neniksi. Alun perin ne olivat valurautaisia pylväitä, ja vesi '
          + 'virtaa niistä yleensä yötä päivää. Ensimmäiset nasonet '
          + 'pystytettiin 1870-luvulla. Alkuperäisessä mallissa oli kolme '
          + 'lohikäärmeen päätä, ja nimi nasone tuli vasta, kun myöhemmin '
          + 'tuli yksi kaareva suu, joka näyttää nenältä.',
        'Putken suun päällä on pieni reikä. Kun suun tukkii sormella, '
          + 'vesi suihkuaa reiästä ylöspäin. Rooman vesilaitos Acean mukaan '
          + 'vesi on samaa kuin kotien hanoissa. Nasoneja on kaupungissa '
          + 'noin 2 500, ja lohikäärmesuisia on yhä esimerkiksi Pantheonin '
          + 'edessä Piazza della Rotondalla.',
        'Isoisäsi matkavuonna 1873 nasoneja ei ehkä vielä ollut. '
          + 'Turismo Roman ja Acean mukaan ensimmäiset tulivat vuonna 1874, '
          + 'mutta yksi lähde antaa vuodeksi 1872.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Turismo Roma, Acea ja Engineering Rome',
      kuva: {
        tiedosto: 'Nasone in Trastevere, Rome.jpg',
        lyhyt: 'Ensimmäiset nasonet pystytettiin 1870-luvulla; Acean mukaan niiden vesi on samaa kuin kotien hanoissa.',
        selite: 'Ensimmäiset nasonet pystytettiin 1870-luvulla, ja Acean mukaan '
          + 'niiden vesi on samaa kuin roomalaisten kotien hanoissa.',
        lahde: 'Sotamies, Wikimedia Commons (CC BY-SA 4.0)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Lehden noston
       * `galleria`-kuvat kulkivat erässä 10 kiertotietä kohdekartan jutun
       * `kuvat`-listaan, koska nostokortti ei tuntenut kenttää. Nyt
       * tuntee (js/fokusnosto.js piirraNostonKuvasarja), joten kuvat ovat
       * siellä missä noston muutkin kuvat — selitteineen ja lähteineen,
       * merkki merkiltä samoina. Kohdekartan jutun oma kuvalista jäi
       * ennalleen: sama sisältö kahdella pinnalla, kuten `kuva` jo oli.
       */
      galleria: [
        {
          otsikko: 'Vanha nasone Pantheonin vieressä',
          tiedosto: 'Pigna-S Eustachio-Colonna - Nasone alla Rotonda.JPG',
          selite: 'Lohikäärmesuinen nasone seisoo yhä Pantheonin edessä Piazza '
            + 'della Rotondalla.',
          lahde: 'Lalupa, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      kysymykset: [
        'Miksi nasonea sanotaan isoksi nenäksi?',
        'Millainen alkuperäinen nasone oli?',
        'Milloin ensimmäiset nasonet pystytettiin?',
      ],
      visa: {
        kysymys: 'Rooman katupylvään eli nasonen putken päällä on pieni reikä. Mitä '
          + 'varten se on?',
        vaihtoehdot: [
          'Siitä pääsee ilma ulos, kun vesi kytketään päälle',
          'Kun putken suun tukkii sormella, vesi suihkuaa reiästä ylöspäin '
            + 'juotavaksi',
          'Siitä kaupunki mittaa pylvään vedenpaineen',
        ],
        oikea: 1,
        fakta: 'Niitä on kaupungissa noin 2 500, ja Acean mukaan vesi on samaa '
          + 'kuin kotien hanoissa.',
      },
      paikka: {
        nimi: 'Nasone',
        laudat: {
          maailmankartta: { x: 6249.2, y: 1727.6 },
          europe: { x: 450.8, y: 791.7 },
        },
      },
    },
  ],
};
