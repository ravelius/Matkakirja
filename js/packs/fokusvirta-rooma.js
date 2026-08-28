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
  kysymys: 'Rooman kadunkulmissa juoksee vettä valurautaisista '
    + 'pylväistä yötä päivää. Milloin ensimmäiset niistä pystytettiin?',
  vaihtoehdot: [
    '1870-luvulla',
    '1600-luvulla, barokin aikaan',
    '1950-luvulla',
  ],
  oikea: 0,
  fakta: 'Roomalaiset ristivät pylväät nasoneiksi eli isoiksi neniksi '
    + 'kaarevan putkensa takia. Niitä on kaupungissa yhä noin 2 500, ja '
    + 'vesi on samaa kuin kotihanoissa — isoisän matkavuonna ne olivat '
    + 'siis aivan uusi asia.',
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
    /* Kaanon, kohta 1 — paikkarivi ja teksti sellaisinaan. */
    paikkarivi: 'Rooma, lokakuussa 1873. Sadetta; katukivet kiiltävät.',
    teksti: 'Koko kaupunki puhuu miehestä, joka ei suostu tulemaan '
      + 'ulos: paavi ei ole kolmeen vuoteen ylittänyt Vatikaanin '
      + 'muuria. Kadulla sanotaan, että hän katselee Roomaansa vain '
      + 'ikkunoista. Seisoin muurin alla ja mietin, kumpi meistä on '
      + 'vanki.',
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
    luenta: '[curious] Koko kaupunki puhuu miehestä, joka ei suostu '
      + 'tulemaan ulos: paavi ei ole kolmeen vuoteen ylittänyt '
      + 'Vatikaanin muuria. [whispers] Kadulla sanotaan, että hän '
      + 'katselee Roomaansa vain ikkunoista. [softly] Seisoin muurin '
      + 'alla ja mietin, kumpi meistä on vanki.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-rooma.mp3',
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
     * LIVIAN MAADOITUS (Fablen kaanon 27.8.2026, TUURAAJA-KEHYS).
     *
     * Rooman merkintä päättyy koko kuuden kaupungin ylevimpään
     * lauseeseen ("mietin, kumpi meistä on vanki"), joten maadoitus on
     * täällä suorin: nuori matkaaja tekee itsestään vertaisen paaville
     * seisomalla sateessa muurin alla. Livia purkaa vertauksen — ja
     * vain vertauksen.
     *
     * FAKTAKURI: paavin vetäytymiseen, vuoteen 1929 tai muurin
     * tapahtumiin ei kosketa; ne ovat seuraavassa kappaleessa ja
     * täyissä. Muurin sisäpuolen elämä on Livian omaa postiperimätietoa
     * ("meikäläisillä on siitä muistiinpanoja") eikä nimeä yhtäkään
     * laitosta, vuosilukua tai postijärjestelmää — kaanonin sääntö 2
     * on tässä nimenomaan siksi, ettei Vatikaanin postista väitetä
     * mitään tarkistamatonta.
     */
    maadoitus: '"Kumpi meistä on vanki." Kaunis kysymys, ja siihen on tylsä '
      + 'vastaus: ei kumpikaan. Isoisäsi käveli muurin alta pois heti kun '
      + 'sade yltyi. Ja muurin sisäpuolella oli puutarha, palvelusväkeä ja '
      + 'posti, joka kulki portista niin kuin ennenkin — meikäläisillä on '
      + 'siitä muistiinpanoja, koska sitäkin postia kannettiin. Sellanen '
      + 'vankeus, jonka voi itse valita ja jonka ohi kulkee kirjeposti, on '
      + 'kyl vähän eri sana kun vankeus.',
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
          'Saman lain olisi voinut kumota se valta, joka sen antoi',
          'Laki olisi vienyt häneltä Pietarinkirkon',
          'Laki olisi kieltänyt häntä lähettämästä lähettiläitä',
        ],
        oikea: 0,
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
       * ELÄINTÄKY (Raamattu, ELÄINTÄYT-linjaus 25.8.2026). Faktat:
       * takyt-rooma.md, täky 1, ja takynostot-italia.md, ehdokas 1 —
       * molemmat merkitty VARMOIKSI.
       *
       * KAKSI RAPORTIN RAJAUSTA NOUDATETTU: kissojen lukumäärää ei
       * kirjoiteta (en-artikkelit sanovat 350 ja 150), ja Caesarin
       * murhapaikasta sanotaan "uskotaan", koska lähde itse sanoo "is
       * believed to have been".
       */
      teksti: 'Kun Roomaa rakennettiin uusiksi Italian yhdistymisen '
        + 'jälkeen ja korttelia purettiin vuonna 1927, maasta tuli '
        + 'esiin jättiläispatsaan pää ja käsivarret. Alta löytyi neljä '
        + 'tasavallan ajan temppeliä ja pala Pompeiuksen teatteria — ja '
        + 'juuri se paikka, jossa Julius Caesarin uskotaan tulleen '
        + 'murhatuksi. Kaivauskuoppaan alkoi kerääntyä kulkukissoja. Ne '
        + 'asuvat siellä yhä: temppeli D:n kohdalla toimii kissasuoja, '
        + 'jota on 1950-luvulta lähtien pidetty yllä avaimella, joka on '
        + 'kulkenut näyttelijältä toiselle — mukana muun muassa Anna '
        + 'Magnani. Vuodesta 1993 se on ollut virallinen, tappamaton '
        + 'suoja. Vuonna 2012 arkeologiviranomaiset vaativat suojan '
        + 'häätöä raunioiden suojelemiseksi; vetoomukseen kerättiin yli '
        + '30 000 nimeä, ja kissat jäivät.',
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
        kysymys: 'Miten kissasuojan hoito siirtyi 1950-luvulta lähtien '
          + 'ihmiseltä toiselle?',
        vaihtoehdot: [
          'Avain kulki näyttelijältä toiselle',
          'Kaupunki nimitti hoitajan joka vuosi',
          'Tehtävä kuului aina raunioiden vartijalle',
        ],
        oikea: 0,
        fakta: 'Suoja toimii temppeli D:n kohdalla ja on vuodesta 1993 '
          + 'ollut virallinen, tappamaton suoja. Kissojen määrästä '
          + 'lähteet ovat eri mieltä, joten lukua ei kannata uskoa '
          + 'yhdeltäkään kyltiltä.',
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
      /*
       * Takyt-rooma.md, täky 12: 1536×2150, CC0, Galen Crout, 2016 —
       * näkymä reiän läpi, eli tasan se, mistä teksti puhuu.
       */
      kuva: {
        tiedosto: 'Knights of Malta Keyhole, Aventine Hill, Rome (cropped).jpg',
        selite: 'Näkymä Maltan ritarikunnan portin avaimenreiästä: '
          + 'sypressikäytävä ja sen päässä Pietarinkirkon kupoli.',
        lahde: 'Galen Crout, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Portin, jonka keskellä avaimenreikä on, suunnitteli '
          + 'mies, joka tunnetaan paremmin kuparipiirroksistaan. Kuka?',
        vaihtoehdot: [
          'Giovanni Battista Piranesi',
          'Gian Lorenzo Bernini',
          'Francesco Borromini',
        ],
        oikea: 0,
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
   * FAKTAT OVAT PELIN OMASTA, JO HYVÄKSYTYSTÄ ROOMA-AINEISTOSTA:
   * Aqua Virgo vuodelta 19 eaa. ja sen 22 kilometriä maan alla sekä
   * lähteen mitat, Salvin vuodet ja merenjumalan kaksi hevosta
   * (js/packs/nahtavyysjutut.js, "Trevin suihkulähde"); nimen merkitys
   * ja tarina janoisista sotilaista (js/packs/kulttuuri-kategoriat.js,
   * nosto "Vesi kulkee yhä"); kolikkotapa, kolmentuhannen euron
   * päiväsumma, Caritas-lahjoitus ja noukkimiskielto (sama tiedosto,
   * nosto "Kolikko olan yli"). Mitään uutta faktaväitettä ei ole
   * lisätty.
   *
   * AKVEDUKTIN PAINOVOIMAA EI SELITETÄ TÄSSÄ: se on sivun 1
   * kulttuurivisan vastaus (ks. NASONE_VISAn kommentti).
   */
  oppitunti: {
    otsikko: 'Aqua Virgo — vesijohto, joka päättyy altaaseen',
    teksti: 'Trevin lähde ei ole muistomerkki vaan vesijohdon pää. Aqua '
      + 'Virgo valmistui vuonna 19 eaa. ja kulkee melkein koko matkansa '
      + 'maan alla, kaksikymmentäkaksi kilometriä. Nimi tarkoittaa '
      + 'neitoa: tarun mukaan nuori tyttö näytti janoisille sotilaille '
      + 'sen lähteen, josta vesi otettiin. Nykyinen allas on paljon '
      + 'uudempi. Arkkitehti Nicola Salvi aloitti sen 1732, ja se '
      + 'valmistui 1762, yksitoista vuotta hänen kuolemansa jälkeen — '
      + 'maailman suurin barokkilähde, kaksikymmentäkuusi metriä korkea '
      + 'ja lähes viisikymmentä metriä leveä. Keskellä ajaa merenjumala '
      + 'vaunuillaan, joita vetävät kaksi hevosta, toinen rauhallinen ja '
      + 'toinen villi. Altaan reunalla tehdään yhä sama liike: kolikko '
      + 'oikeasta kädestä vasemman olan yli. Tarinan mukaan se takaa '
      + 'paluun Roomaan. Kolikoita putoaa veteen noin kolmentuhannen '
      + 'euron edestä joka päivä, ja ne kerätään pohjasta talteen ja '
      + 'lahjoitetaan hyväntekeväisyyteen — ruoka-apuun kaupungin '
      + 'vähävaraisille. Omaa kolikkoa ei saa noukkia takaisin: se on '
      + 'kiellettyä, ja yrittäjiä jää säännöllisesti kiinni.',
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
   * riviä (tiedostossa on kuusi kaupunkia: Lontoo, Kairo, Tukholma,
   * Madrid, Venetsia, Berliini). Rooman hahmo on silti olemassa ja
   * pelissä käytössä: tarinakaaren paketti js/tyohuone-kehitys-data.js
   * (KAARI_PAKETIT, id 'rooma') antaa hahmon JA sen kysymyksen, jonka
   * game.actionQuiz esittää laatalla (js/game.js kaariTarina). Hahmo on
   * siis Suihkulähteenhoitaja Enzo, eikä tämä paketti kosketa
   * kysymystä millään tavalla — sama suhde kuin Ateenan Nikoksella ja
   * Sofian Nadialla.
   *
   * KOHTAAMISKUVAA EI OLE. Ateenalla ja Sofialla on generoitu kuva
   * (assets/kohtaamiset/kohtaaminen-*.jpg); Roomalle sellaista ei ole
   * kansiossa, eikä tänne kirjoiteta polkua, jota ei ole.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Enzon omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Suihkulähteenhoitaja Enzo',
    nappi: 'Tapaa Enzo',
    teksti: 'Enzo nostaa Trevin kolikot talteen joka viikko, kuten '
      + 'hänen isänsä ja isoisänsä nostivat ennen häntä. Hansikas '
      + 'kädessä hän tunnistaa kolikon maan ja vuoden pelkästä reunasta, '
      + 'ja hän on nähnyt altaan pohjalta kaiken, mitä ihminen voi '
      + 'pudottaa. Herra Foggia hän ei kiirehdi. Ennen kuin hän avaa '
      + 'huoltoluukun, hän haluaa tietää, ymmärtääkö vieras miksi '
      + 'kolikko ylipäänsä heitetään: tavan tuntee jokainen tulija, '
      + 'mutta harva osaa sanoa, mitä se lupaa.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kentät kuin Ateenalla ja Sofialla. Raskas korttivirta ei lue
   * kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: AVENTINUKSEN AVAIMENREIKÄ, ei kaupungin laatta.
   * Kaanon, kohta 4, määrää paikan.
   *
   * 12,4775 E / 41,8836 N — en-Wikipedia "Villa del Priorato di Malta"
   * (takyt-rooma.md, täky 12). Kaanon antoi luvut muistinvaraisesti
   * hitusen toisin (41,8827 N / 12,4783 E) ja käski rakentajan
   * tarkistaa: raportin tarkistetut luvut ovat nämä, ja ero on laudalla
   * alle kymmenesosayksikkö — kumpi tahansa piirtyisi samaan pisteeseen.
   *
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla
   * (js/packs/fokuskohteet-ita.js): maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 -175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((12,4775 − (−175)) mod 360) × (12000/360)
   *                     = 187,4775 × 33,3333… = 6249,3
   *                   y = (millerY(41,8836) − millerY(76)) × 12000/2π
   *                     = 1728,2
   *   europe          x = (12,4775 + 11) × 19,2 = 450,8
   *                   y = (72 − 41,8836) × 26,3 = 792,1
   *
   * TARKISTUS ROOMAN LAATTAA VASTEN: laatta on maailmankartalla
   * 6249,7 / 1728,1 (js/packs/maailmankartta.js) ja Euroopan laudalla
   * 451 / 792 (js/packs/europe.js). Avaimenreikä on laudalla siis
   * alle puolen yksikön päässä laatasta — juuri niin kuin pitääkin,
   * sillä Aventinus on keskustan kukkuloita runsaan parin kilometrin
   * päässä kaupungin keskipisteestä, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä. Piste piirtyy laatan
   * viereen eikä naapurimaahan.
   */
  kohtaamispiste: {
    nimi: 'Aventinuksen avaimenreikä',
    laudat: {
      maailmankartta: { x: 6249.3, y: 1728.2 },
      europe: { x: 450.8, y: 792.1 },
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
      // Kartan nimiö täkypisteen kylkeen (päätoimittaja 28.8.2026).
      nimio: 'Caesarin kissat',
      /* Kaanon, kohta 6, nosto 1 (eläin). */
      otsikko: 'Kissat asuvat paikassa, jossa Caesar murhattiin — ja '
        + 'arkeologit yrittivät häätää ne',
      /* Faktat: takynostot-italia.md, ehdokas 1 (VARMA). */
      lunastus: 'Vuoden 1927 purkutöissä Largo di Torre Argentinasta '
        + 'paljastui neljä tasavallan ajan temppeliä ja se paikka, jossa '
        + 'Caesarin uskotaan tulleen murhatuksi — ja kuoppaan muutti '
        + 'kissalauma. Vuonna 2012 arkeologiviranomaiset vaativat '
        + 'kissasuojan häätöä; vetoomukseen kerättiin yli 30 000 nimeä, '
        + 'ja kissat jäivät.',
      avaa: 'kissat',
      // Sama tarkistettu tiedosto kuin täyllä 'kissat'.
      kuva: {
        tiedosto: 'Cat Sanctuary, Cats, Largo di Torre Argentina, Rome - 398 (19257774921).jpg',
        selite: 'Kissoja Largo di Torre Argentinan raunioilla.',
        lahde: 'Andy Rusch, Wikimedia Commons (CC BY 2.0)',
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * Kaanon, kohta 5 — teksti sellaisenaan. Isoisän merkintä, joka
   * aukeaa kun aarre löytyy.
   *
   * TWIST-SIEMEN: merkintä EI paljasta, miksi isoisä käänsi ympäri.
   * Se on kaaren avoin kysymys nro 4 (jättikö hän aarteita
   * tarkoituksella), ja kaanon kieltää vastaamasta siihen tässä.
   * "Kupoli avaimenreiästä" on todellinen näkymä (takyt-rooma.md,
   * täky 12) ja sama paikka kuin kohtaamispiste yllä.
   */
  aarremerkinta: {
    teksti: 'Rooman aarre oli ainoa, jota en yrittänytkään. Seisoin '
      + 'avaimenreiän edessä, näin kupolin rajautuvan lehtien väliin — '
      + 'ja käänsin ympäri. Jonain päivänä ymmärrät miksi.',
  },
};
