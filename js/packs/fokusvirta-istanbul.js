/*
 * ISTANBULIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-ateena.js:lle ja
 * js/packs/fokusvirta-sofia.js:lle. Rakenne, kenttien nimet ja kuusi
 * vaihetta ovat samat kuin siellä (Raamatun osio "Fokusmoodi",
 * ANNOSTELU), eikä moottoriin (js/fokusvirta.js) tarvinnut koskea: uusi
 * kaupunki on yksi tiedosto ja yksi rivi rekisterissä
 * (js/packs/fokusvirrat.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (Fable 25.8.2026): docs/mantereet-tyoaineisto/
 * fokusvirta-istanbul-kaanon.md. Matkakirjan paikkarivi, teksti ja
 * luenta, pöllön huomio, aarremerkintä ja täkynostojen klikkiotsikot on
 * siirretty sieltä SELLAISINAAN — sanamuotoja ei ole muokattu. Kaanon
 * myös valitsi täyt (kaarmepylvas, camondo, kissat), kohdenoston
 * (Troija) ja kohtaamispaikan (Käärmepylväs).
 *
 * YKSI POIKKEUS, JONKA KAANON ITSE MÄÄRÄSI: pöllön vuosiluku. Ks.
 * vaihe 2 alempana.
 *
 * FAKTAPOHJA syvennyksille, oppitunnille ja täkynostoille:
 * docs/mantereet-tyoaineisto/takyt-istanbul.md ja
 * docs/mantereet-tyoaineisto/takynostot-turkki.md, joiden jokainen
 * väite on tarkistettu en-Wikipediasta artikkeli ja kohta kerrallaan
 * 25.8.2026. Täkyjen syvennysteksteissä EI ole yhtään faktaa noiden
 * raporttien ulkopuolelta.
 *
 * OPPITUNTI ON POIKKEUS, JA SE ON TARKOITUS. Se käyttää pelin omaa, jo
 * hyväksyttyä Istanbul-aineistoa (js/packs/kulttuuri-kategoriat.js:
 * nostot "Medusa kannattelee pylvästä ylösalaisin" ja "Vesijohto, jonka
 * ali ajetaan autolla") sekä sitä Medusa-tarun lausetta, joka on jo
 * pelissä laattakysymyksen omassa faktarivissä
 * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, istanbul: *"Medusan
 * katseen sanottiin muuttavan ihmisen kiveksi"*). Sama ratkaisu kuin
 * Sofiassa: oppitunnin tehtävä on pohjustaa laattakysymys lehden ja
 * pelin omalla aineistolla, ei tuoda uutta väitettä.
 *
 * ── KOLME TÄKYÄ, EI NELJÄÄ ─────────────────────────────────────────
 *
 * Sofiaan lisättiin neljäs täky, koska omistaja tilasi 25.8.2026
 * täkyihin myös eläinjuttuja eikä kaanonissa ollut sellaista.
 * Istanbulin kaanonissa ELÄINTÄKY ON JO MUKANA (täky 3, kissat), joten
 * lisäystä ei tarvita: kaanonin kolme täkyä ovat sellaisinaan tässä.
 * `vaadittuja` on 1, kuten kaanon sanoo.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa ja Sofiassa: vastaus löytyy syvennystekstistä,
 * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan. Skeema on
 * lehden minitehtävän oma (js/ui.js piirraMinitehtava): kysymys,
 * vaihtoehdot, oikean indeksi ja faktarivi, joka näytetään vasta
 * vastauksen jälkeen.
 *
 * ── SÄVYRAJAUKSET, JOTKA RAPORTIT MÄÄRÄSIVÄT ───────────────────────
 *
 * 1. GLI-KISSAN TARINAA EI TOISTETA. Se on jo pelissä
 *    (kulttuuri-kategoriat.js, nosto "Kadun kissat ovat kaikkien
 *    kissoja": Gli, Obama, vesikuppi ja pahvilaatikko), ja molemmat
 *    raportit kieltävät toiston nimenomaisesti. Kissatäky kertoo
 *    ottomaaniajan ammatin, ei Gliä.
 * 2. KISSOJEN JOUKKOTAPPOKAMPANJAT EIVÄT OLE MUKANA missään muodossa.
 *    Ne ovat samassa lähdeartikkelissa ja tosia, mutta Perustuslain
 *    ikäsopivuuskohta rajaa ne pois — ja ne olisivat täysin väärä sävy
 *    lämpimälle eläintäylle (takyt-istanbul.md täky 16,
 *    IKÄSOPIVUUSRAJAUS).
 * 3. ABDÜLAZIZIN KUOLEMA 1876 EI OLE MUKANA. Täkynosto 2 kertoo
 *    läimäyksen 1868, ei sulttaanin loppua (takynostot-turkki.md,
 *    hylkylistan kohta 8).
 * 4. KÄÄRMEENPÄÄN IRTILYÖJÄÄ EI NIMETÄ VARMANA. Lähde itse kutsuu
 *    Mehmed II:n versiota "hyväksytyksi kertomukseksi" ja luettelee
 *    kolme muuta ehdokasta; täky sanoo "kerrotaan", kuten raportti
 *    vaatii (takyt-istanbul.md täky 1, Varmuus).
 * 5. CAMONDON PORTAIDEN AJOITUS ON VARAUKSELLINEN. Lähde antaa "circa
 *    1870–1880", mutta Camondo asui Pariisissa vuodesta 1869 ja kuoli
 *    1873. Teksti sanoo "1870-luvulla rakennetut" eikä väitä, että
 *    isoisä olisi nähnyt portaat (raportin oma ohje, täky 7).
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Kaikki paitsi yksi ovat raporttien omalta, Commonsin
 * imageinfo-rajapinnasta 25.8.2026 varmennetulta listalta (olemassaolo,
 * koko, lisenssi, tekijä, Restrictions) — ei arvattuja nimiä. Kaikki
 * ovat PD tai CC, ja tekijä on `lahde`-rivillä, koska CC BY vaatii
 * maininnan.
 *
 * YKSI KUVA ON HAETTU ERIKSEEN: matkakirjan aikalaispiirros. Kaanon
 * pyytää Käärmepylväästä *"vanhan valokuvan/piirroksen Commonsista
 * tarkistettuna"*, eikä täkyraportin varmennetulla listalla ollut
 * yhtään aikalaiskuvaa pylväästä — vain vuosien 2006 ja 2007 valokuvat.
 * Puuttuva kuva haettiin Commonsin hakurajapinnasta ja varmennettiin
 * imageinfosta samalla tavalla kuin raportit tekevät (tulos kirjattu
 * kuvan kohdalle).
 *
 * EI HEROKUVAA VAIHEESSA 2, VAIKKA SELLAINEN OLISI. Ateenassa vaihe 2
 * esittelee generoidun herokuvan (`ampari`), ja Istanbulille niitä on
 * kolme (kulttuuri-kategoriat.js: herokoe/hero-istanbul-aamu,
 * -keskipaiva, -ilta). Niitä ei silti käytetä täällä: pöllö puhuu
 * täsmälleen siitä käärmeenpäästä, joka makaa museossa, ja Hagia Sofian
 * tai Galatan tornin havainnekuva puhuisi eri asiasta. Kuvan on
 * vastattava tekstiä — se sääntö voittaa herokuvan.
 *
 * KUVIA EI OLE KATSOTTU SILMIN. Silmätarkistus on tehtävä ennen
 * julkaisua samalla käytännöllä kuin herokuville.
 */
import { turFokuskohteet } from './fokuskohteet-tur.js';

/*
 * VESIJOHTOVISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Väite on lehden sivun 2 ("Historia") oman noston
 * "Vesijohto, jonka ali ajetaan autolla" tekstiä: Valensin vesijohto
 * vihittiin 373, sitä on jäljellä 921 metriä, ja kaarien alta kulkee
 * nykyään vilkas Atatürk-bulevardi.
 *
 * MIKSI EI MEDUSA-KYSYMYSTÄ. Istanbulin laattakysymys (kohtaaminen, ks.
 * alempana) kysyy, miksi Medusan pää on säiliössä ylösalaisin. Jos
 * lehden aarteen avaava tehtävä kysyisi kivikasvoista tai säiliöstä,
 * aarrekysymys olisi ratkaistu ennen kuin Emineä on tavattu. Sivun
 * toinen nosto — vesijohto — on yhtä lailla sivun omaa aineistoa, ja se
 * pohjustaa laattaa vain sen verran, että vesi tulee kaupunkiin jostain
 * kauempaa.
 *
 * SIVUN OMA TEHTÄVÄ VÄISTYY. Aihesivulla 'historia' on jo
 * `tehtava`-kenttä (mehter-soittokunnan yhdeksän soitinta). Nimetty
 * tehtävä syrjäyttää sen (js/fokustehtavat.js), jolloin sivulla on
 * Raamatun vaatima YKSI minitehtävä eikä kahta.
 */
const VESIJOHTO_VISA = {
  kysymys: 'Fatihin kaupunginosassa kulkee kahdessa kerroksessa '
    + 'kivikaaria kukkulalta toiselle. Mitä niiden alla on nykyään?',
  vaihtoehdot: [
    'Vilkas bulevardi, jota pitkin ajetaan autolla',
    'Kaaret on muurattu umpeen kaupoiksi',
    'Kaupungin vanhin hautausmaa',
  ],
  oikea: 0,
  fakta: 'Valensin vesijohto vihittiin käyttöön vuonna 373, ja sitä on '
    + 'jäljellä 921 metriä. Vettä tuotiin lähteiltä yli sadan kilometrin '
    + 'päästä, ja kanavia kertyi kaikkiaan yli 250 kilometriä — antiikin '
    + 'pisin.',
};

/*
 * TÜNELVISA on YHDESSÄ PAIKASSA, yhdessä käytössä — mutta se on
 * vakiona samasta syystä kuin Ateenan NIKE_VISA ja Sofian
 * KATUKIVI_VISA: lehtitehtävien lista tiedoston lopussa lukee
 * kysymykset muuttujista, jolloin uuden käytön lisääminen ei koskaan
 * johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Tünel on "Matkailijan Istanbul" -artikkelin
 * oma jakso (js/packs/kulttuuri-kategoriat.js, jakso "Perille ja
 * liikkeelle"): 573 metrin köysirata Karaköystä Beyoğluun, vihitty
 * 17.1.1875, maailman toiseksi vanhin maanalainen kaupunkirata — vain
 * Lontoon metro on vanhempi. Kysymys ei toista tuota lausetta
 * sellaisenaan.
 *
 * MIKSI SIVULLA 3 EIKÄ SILLÄ SIVULLA, JOLLA JAKSO ON: sama ratkaisu
 * kuin Ateenassa ja Sofiassa. Sivu 3 on Menovinkit, jonka sisältö on
 * koko maan yhteinen linkkilista — sillä ei ole omaa kaupunkifaktaa,
 * josta visan voisi tehdä, ja lehden jokaisella sivulla paitsi
 * etusivulla on Raamatun mukaan oltava kysymys.
 */
const TUNEL_VISA = {
  kysymys: 'Karaköystä nousee Beyoğluun mäen sisällä 573 metrin '
    + 'köysirata. Vain yksi maanalainen kaupunkirata maailmassa on sitä '
    + 'vanhempi — mikä?',
  vaihtoehdot: [
    'Lontoon metro',
    'Pariisin metro',
    'New Yorkin maanalainen',
  ],
  oikea: 0,
  fakta: 'Tünel vihittiin käyttöön 17. tammikuuta 1875. Sulttaani '
    + 'Abdülaziz oli myöntänyt luvan 1869 ja työt alkoivat 1871 — isoisän '
    + 'matkan aikaan mäen sisällä vielä louhittiin.',
};

export const FOKUSVIRTA_ISTANBUL = {
  kaupunki: 'istanbul',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    /* Kaanon, kohta 1 — paikkarivi ja teksti sellaisinaan. */
    paikkarivi: 'Konstantinopoli, syyskuussa 1873. Sumua salmella; '
      + 'sarvet soivat.',
    teksti: 'Hippodromin laidalla seisoo pronssipylväs, jollaisen näin '
      + 'piirroksissa Delfoissa — keisari siirsi sen tänne puolitoista '
      + 'vuosituhatta sitten. Kolmen käärmeen päät ovat poissa. Vartija '
      + 'kohautti olkiaan: kaupunki ottaa mitä haluaa, ja pitää minkä '
      + 'ottaa.',
    /*
     * Luenta on kaanonin oma (kohta 1), tunnetageineen. Äänite on
     * generoitu samalla reseptillä kuin Ateenalle
     * (tools/generoi-luennat.mjs), ja kaanon nimeää tiedoston.
     */
    luenta: '[curious] Hippodromin laidalla seisoo pronssipylväs, '
      + 'jollaisen näin piirroksissa Delfoissa — keisari siirsi sen tänne '
      + 'puolitoista vuosituhatta sitten. [whispers] Kolmen käärmeen päät '
      + 'ovat poissa. [softly] Vartija kohautti olkiaan: kaupunki ottaa '
      + 'mitä haluaa, ja pitää minkä ottaa.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-istanbul.mp3',
    /*
     * AIKALAISPIIRROS, HAETTU JA VARMENNETTU ERIKSEEN (ks. tiedoston
     * alku). Commonsin imageinfo 25.8.2026: 800×591, public domain
     * (PD-Art / PD-old, CC-PD-Mark), tekijä Aubry de La Motraye,
     * ranskalainen matkaaja ja diplomaatti; kuvaus "1727 depiction of
     * the At Meydani square at the location of the Hippodrome of
     * Constantinople. Also displayed is the Serpent Column and Obelisk
     * of Theodosius"; Restrictions-kenttä tyhjä; kategoriat mm.
     * "Serpent Column in art". Lähde on La Motrayen matkakirja
     * "A. de La Motraye's travels through Europe, Asia, and into part of
     * Africa" — eli toisen matkaajan piirros toisen matkaajan kirjassa,
     * mikä sopii tähän merkintään paremmin kuin nykyvalokuva.
     *
     * SELITE SANOO VAIN SEN, MINKÄ LÄHDE SANOO: kuvausvuoden ja sen,
     * mitä aukiolla on. Kuvaa ei ole katsottu silmin, joten selite ei
     * väitä mitään päistä tai niiden puuttumisesta.
     */
    kuva: {
      tiedosto: 'At Meydani square, Hippodrome of Constantinople, Serpent Column, Obelisk of Theodosius - Aubry de la Mottraye, Constantinople, 1727.jpg',
      selite: 'At Meydanın aukio entisellä hippodromilla ranskalaisen '
        + 'matkaajan Aubry de La Motrayen kuvassa vuodelta 1727. Aukiolla '
        + 'näkyvät Käärmepylväs ja Theodosiuksen obeliski.',
      lahde: 'Aubry de La Motraye 1727, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio ----------
   * Kaanon, kohta 2. Kaanon merkitsee, että SILMINNÄKIJÄHEITTO on
   * käytetty tässä ("Minä satuin istumaan räystäällä sinä päivänä") —
   * sitä ei siis saa toistaa täkyjen eikä oppitunnin teksteissä.
   *
   * VUOSILUKU ON KORJATTU, JA KAANON KÄSKI KORJATA SEN. Kaanonin
   * repliikissä lukee 1848 ja sen oma huomautus sanoo: *"yläleuka/pää
   * löytyi 1855/1848 — RAKENTAJA TARKISTAA vuoden täkyraportista ja
   * korjaa repliikkiin oikean vuoden; jos raportissa ei ole vuotta,
   * pudota vuosi pois."*
   *
   * TARKISTUS: takyt-istanbul.md, täky 1 antaa VAIN yhden varmennetun
   * vuosiluvun, ja se koskee jalustaa eikä päätä — *"Vuonna 1855
   * pylvään jalusta kaivettiin esiin"* (en-Wikipedia "Serpent Column":
   * "The base of the column was excavated in 1855, under the
   * supervision of Charles Thomas Newton"). Museossa olevalle päälle
   * raportti ei anna vuotta lainkaan.
   *
   * SIKSI LAUSE ON KIRJOITETTU NIIN, ETTÄ VUOSI 1855 LIITTYY SIIHEN,
   * MIHIN LÄHDE SEN LIITTÄÄ. Kaanonin toinen vaihtoehto ("se kaivettiin
   * esiin viime vuosisadalla") olisi ollut suoraan väärin: 1855 on
   * TOISSA vuosisadalla, ja pöllö olisi valehdellut vuosisadan verran.
   * Muutos on siis kaanonin oman ohjeen toteutus, ei poikkeama siitä —
   * mutta se on kirjattu FABLEN TARKISTETTAVA -listaan, koska
   * lauserakenne muuttui.
   */
  pollo: {
    teksti: 'Pylväästä puuttuu kolme päätä, ja yksi niistä makaa '
      + 'parinsadan metrin päässä museossa. Pylvään jalusta kaivettiin '
      + 'esiin 1855. Minä satuin istumaan räystäällä sinä päivänä.',
    /*
     * Commons (takyt-istanbul.md, täky 1, varmennettu 25.8.2026):
     * 640×480, CC BY-SA 4.0, Gryffindor. Juuri se säilynyt käärmeenpää,
     * josta pöllö puhuu — ks. tiedoston alku siitä, miksi tässä ei ole
     * herokuvaa.
     */
    kuva: {
      tiedosto: 'Head serpent Hippodrome Istanbul Museum.JPG',
      selite: 'Käärmepylvään säilynyt käärmeenpää Istanbulin '
        + 'arkeologisessa museossa.',
      lahde: 'Gryffindor, Wikimedia Commons (CC BY-SA 4.0)',
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
   * Kaanon, kohta 3: kohdenostoksi Troija — *"Schliemannin kaivaus
   * käynnissä 1871–73, jatkumo Kreikan tarinaan; kohde maan listasta"*.
   * Kohde asuu maan omassa listassa (js/packs/fokuskohteet-tur.js),
   * koska kohde ei kuulu yhdelle kaupungille — täällä on vain poiminta
   * tunnuksella. Kohdenosto ei ole täky: siitä ei tule minivisaa eikä
   * palkkiota, eikä se avaa aarreporttia.
   */
  kohteet: turFokuskohteet(['troija']),

  /* ---------- 4. Kolme täkypolkua ---------- */
  takyt: [
    {
      id: 'kaarmepylvas',
      nappi: 'Pylväs, joka kannettiin tänne Delfoista',
      otsikko: 'Käärmepylväs ja kadonneet päät',
      /*
       * Faktat: takyt-istanbul.md, täky 1 (merkitty VARMAKSI).
       * Sanamuoto "kerrotaan" on raportin vaatimus: lähde kutsuu
       * Mehmed II:n versiota "hyväksytyksi kertomukseksi" ja nimeää
       * myös Selim II:n, Suleiman II:n ja Murad IV:n.
       */
      teksti: 'Isoisäsi näki oikein: pylväs ei ole tästä kaupungista. Se '
        + 'pystytettiin Delfoihin vuonna 478 eaa. voitonlahjaksi '
        + 'Apollonille sen jälkeen, kun kreikkalaiset kaupunkivaltiot '
        + 'olivat lyöneet persialaiset Plataian taistelussa. Konstantinus '
        + 'Suuri siirsi sen uuteen pääkaupunkiinsa vuonna 324. Kolme '
        + 'käärmeenpäätä pysyivät paikoillaan 1600-luvun loppuun asti, ja '
        + 'kerrotaan, että sulttaani Mehmed II löi yhden alaleuan irti '
        + 'nuijallaan voimannäytöksi — mutta ottomaanikirjoittajat '
        + 'nimeävät tekijäksi myös kolme muuta hallitsijaa, ja lopulta '
        + 'kaikki kolme päätä putosivat samana päivänä lokakuussa 1700. '
        + 'Vuonna 1855 pylvään jalusta kaivettiin esiin, ja kierteistä '
        + 'paljastui kaiverrus: kolmenkymmenenyhden kreikkalaisen '
        + 'kaupungin nimet.',
      /*
       * Commons (takyt-istanbul.md, täky 1, varmennettu 25.8.2026):
       * 1521×3061, public domain, Gryffindor. Pystykuva pylväästä
       * paikallaan Sultanahmetin aukiolla.
       */
      kuva: {
        tiedosto: 'Snake column Hippodrome Constantinople 2007.jpg',
        selite: 'Käärmepylväs Sultanahmetin aukiolla. Kiertyneistä '
          + 'pronssikäärmeistä tehty pylväs on seissyt kaupungissa '
          + 'vuodesta 324.',
        lahde: 'Gryffindor, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä pylvään kierteistä paljastui, kun jalusta '
          + 'kaivettiin esiin?',
        vaihtoehdot: [
          'Kolmenkymmenenyhden kaupungin nimet',
          'Konstantinuksen oma nimikirjoitus',
          'Apollonin ennustus persialaissodasta',
        ],
        oikea: 0,
        fakta: 'Pylväs oli alun perin Plataian voiton muisto Delfoissa '
          + 'vuodelta 478 eaa. Kaiverretut kaupungit ovat ne, jotka '
          + 'lähtivät sotaan.',
      },
    },
    {
      id: 'camondo',
      nappi: 'Pankkiiri, joka kuoli isoisän matkavuonna',
      otsikko: 'Kreivi Camondo ja köyhien koulu',
      /*
       * Faktat: takyt-istanbul.md, täky 7. Kuolinpäivä, hautajaispäivä,
       * koulu ja pannaan julistaminen on merkitty VARMOIKSI; portaiden
       * ajoitus on lähteessä ristiriitainen ("circa 1870–1880", vaikka
       * Camondo asui Pariisissa vuodesta 1869), joten teksti sanoo vain
       * "1870-luvulla" eikä väitä isoisän nähneen niitä.
       */
      teksti: 'Sinä vuonna, jona isoisäsi pakkasi matkalaukkunsa, tämä '
        + 'kaupunki hautasi rikkaimman pankkiirinsa. Kreivi Abraham '
        + 'Salomon Camondo oli Istanbulin juutalaisen yhteisön patriarkka '
        + 'ja ottomaanihallituksen pankkiiri jo ennen kuin Ottoman Bank '
        + 'oli olemassa. Vuonna 1858 hän perusti koulun Peri Paşaan, '
        + 'pääkaupungin köyhimpään ja tiheimmin asuttuun kaupunginosaan — '
        + 'ja osa rabbeista julisti hänet siitä hyvästä pannaan. Koulu '
        + 'toimi silti kolmekymmentäkaksi vuotta ja koulutti valtaosan '
        + 'valtakunnan juutalaisista virkamiehistä. Camondo kuoli '
        + '92-vuotiaana Pariisissa 30. maaliskuuta 1873, ja hänen '
        + 'toiveensa mukaan hänet tuotiin takaisin tänne: hautajaiset '
        + 'pidettiin 14. huhtikuuta Hasköyn juutalaisella hautausmaalla, '
        + 'ja ottomaanihallitus järjesti muistotilaisuuden. Galatassa '
        + 'nousevat yhä hänen mukaansa nimetyt, 1870-luvulla rakennetut '
        + 'portaat siltä kadulta, jolla hän asui, sille kadulle, jolla '
        + 'hän teki työnsä.',
      /*
       * Commons (takyt-istanbul.md, täky 7, varmennettu 25.8.2026):
       * 2565×2388, public domain, muotokuva noin vuodelta 1860 — eli
       * kolmisentoista vuotta ennen kuolemaa.
       */
      kuva: {
        tiedosto: 'Abraham Salomon de Camondo.jpg',
        selite: 'Kreivi Abraham Salomon Camondo noin vuonna 1860. Hän oli '
          + 'ottomaanihallituksen pankkiiri ja kaupungin juutalaisen '
          + 'yhteisön patriarkka.',
        lahde: 'Tuntematon tekijä n. 1860, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä Camondon teko sai osan rabbeista kääntymään häntä '
          + 'vastaan?',
        vaihtoehdot: [
          'Koulu, jonka hän perusti köyhimpään kaupunginosaan',
          'Rahalaina ottomaanihallitukselle',
          'Muutto Pariisiin vanhoilla päivillään',
        ],
        oikea: 0,
        fakta: 'Koulu perustettiin 1858 ja toimi kolmekymmentäkaksi '
          + 'vuotta. Camondo kuoli 30. maaliskuuta 1873 ja haudattiin '
          + 'Istanbuliin 14. huhtikuuta samana keväänä.',
      },
    },
    {
      id: 'kissat',
      nappi: 'Kaupunki, jossa kissojen ruokkiminen oli ammatti',
      otsikko: 'Istanbulin kissat ja mancacı',
      /*
       * ELÄINTÄKY. Faktat: takyt-istanbul.md, täky 16 ja
       * takynostot-turkki.md, ehdokas 4.
       *
       * ATTRIBUUTIO ON RAPORTIN VAATIMUS: väitteet on Wikipediassa
       * liitetty nimettyihin henkilöihin (mm. Istanbulin kissamuseon
       * perustaja), eivät akateemisiin lähteisiin — siksi "kerrotaan"
       * ja "kissamuseon mukaan".
       *
       * EI GLI-TARINAA (jo pelissä) EIKÄ JOUKKOTAPPOJA (ikäsopivuus).
       * Ks. tiedoston alku.
       */
      teksti: 'Katukissoja on tässä kaupungissa arvioiden mukaan '
        + 'sadastatuhannesta yli miljoonaan, eikä maassa saa ottaa niitä '
        + 'kiinni tai lopettaa niitä — laki on kategorinen, ja monelle '
        + 'kaupunkilaiselle kadun eläin ei ole irtolainen vaan korttelin '
        + 'yhteinen lemmikki. Ne eivät ole tulleet tänne sattumalta. '
        + 'Kissamuseon mukaan niitä tuotiin kauppalaivoilla jo '
        + 'foinikialaisaikaan pitämään jyrsijät kurissa, ja ottomaanien '
        + 'aikaan lähes kaikki kaupungin talot olivat puuta — se teki '
        + 'kissoista välttämättömiä. Rakkaus niihin synnytti lopulta '
        + 'kokonaisen ammatin: mancacı, kissanhoitaja, huolehti kaupungin '
        + 'kissojen ruokkimisesta, ja häneltä sai ostaa ruokaa myös '
        + 'syöttääkseen niitä itse. Sellainen mies käveli näillä kaduilla '
        + 'silloin, kun isoisäsi kulki tästä ohi. Nykyään jokaisella '
        + 'kunnalla on kissoille oma eläinlääkintäosastonsa ja ilmainen '
        + 'sterilointi, ja kun yksityisklinikka hoitaa katukissan '
        + 'alennushintaan, naapurit jakavat laskun keskenään.',
      /*
       * Commons (takyt-istanbul.md, täky 16, varmennettu 25.8.2026):
       * 4000×3000, CC BY-SA 4.0, Matti Blume, 2019. Saman kuvaajan
       * samasta sarjasta on jo pelissä `Kadikoey, Istanbul
       * (P1100156).jpg` (kulttuuri-kategoriat.js).
       */
      kuva: {
        tiedosto: 'Cats, Kadikoey, Istanbul (P1100168).jpg',
        selite: 'Katukissoja Kadıköyssä Istanbulin Aasian puolella.',
        lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi kissoista tuli ottomaaniajan Istanbulissa '
          + 'välttämättömiä?',
        vaihtoehdot: [
          'Kaupungin talot olivat lähes kaikki puuta',
          'Sulttaani määräsi jokaiseen taloon kissan',
          'Ne vartioivat basaarin kauppatavaraa öisin',
        ],
        oikea: 0,
        fakta: 'Puutalot antoivat suojan hiirille ja rotille. Kissojen '
          + 'ruokkimisesta tuli lopulta oma ammattinsa, mancacı, ja '
          + 'nykyään maassa on kategorinen kielto ottaa katukissoja '
          + 'kiinni tai lopettaa niitä.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, istanbul: *"Säiliön
   * pylvään alla lepää kivinen Medusan pää ylösalaisin. Miksi se tarun
   * mukaan käännettiin?"* → jotta kivettävä katse ei osuisi keneenkään).
   *
   * Visasääntö täyttyy: vastaus on pääteltävissä tekstistä, mutta
   * kysymyksen sanamuoto ei toistu siinä sellaisenaan — teksti ei sano
   * sanaakaan kääntämisen syystä, päinvastoin se toistaa lehden oman
   * lauseen "eikä kukaan tiedä miksi". Se, mitä teksti antaa, on tarun
   * puuttuva pala: mitä Medusan katse teki.
   *
   * FAKTAT OVAT PELIN OMASTA, JO HYVÄKSYTYSTÄ ISTANBUL-AINEISTOSTA:
   * 52 porrasta, Justinianus, 336 pylvästä à 9 metriä, unohdettu
   * vuosisadoiksi, 1500-luvun ranskalainen matkaaja, ämpärireiät
   * lattioissa ja niistä nousevat kalat, kaksi Medusa-kiveä
   * (kulttuuri-kategoriat.js, nosto "Medusa kannattelee pylvästä
   * ylösalaisin"); Valensin vesijohto 373 ja 921 metriä sekä yli sadan
   * kilometrin vesireitti (sama tiedosto, nosto "Vesijohto, jonka ali
   * ajetaan autolla"); Medusan katse (js/tyohuone-kehitys-data.js,
   * laattakysymyksen oma faktarivi). Mitään uutta faktaväitettä ei ole
   * lisätty.
   */
  oppitunti: {
    otsikko: 'Yerebatan — järvi kaupungin alla',
    teksti: 'Sultanahmetin aukion kupeesta laskeudutaan viisikymmentäkaksi '
      + 'porrasta maan alle. Alhaalla odottaa Yerebatan, keisari '
      + 'Justinianuksen 500-luvulla rakennuttama vesisäiliö: kolmesataa '
      + 'kolmekymmentäkuusi pylvästä, jokainen yhdeksän metriä korkea, '
      + 'mustassa vedessä. Vesi tuotiin tänne lähteiltä yli sadan '
      + 'kilometrin päästä pitkin Valensin vesijohtoa, joka vihittiin '
      + 'käyttöön vuonna 373 ja jonka kivikaaria kulkee yhä 921 metriä '
      + 'kukkulalta toiselle. Sitten kaupunki unohti koko säiliön '
      + 'vuosisadoiksi. Vasta 1500-luvulla eräs ranskalainen matkaaja '
      + 'ihmetteli, miksi talojen lattioissa on reikiä, joista lasketaan '
      + 'ämpäri — ja joistakin nousee kaloja. Kahden pylvään jalustaksi on '
      + 'pantu kivi, johon on veistetty Medusan kasvot. Toinen on '
      + 'kyljellään, toinen ylösalaisin, eikä kukaan tiedä miksi. '
      + 'Kreikkalaisessa tarussa Medusa oli olento, jonka silmiä ei '
      + 'kukaan kestänyt katsoa: joka kohtasi sen katseen, muuttui '
      + 'kiveksi.',
    /*
     * Sama tiedosto, joka on jo pelissä lehden omassa
     * Medusa-nostossa (kulttuuri-kategoriat.js) — eli tarkistettu ja
     * hyväksytty kuva juuri tästä kohteesta.
     */
    kuva: {
      tiedosto: 'Medusa Head at Basilica Cistern, Istanbul, Turkey (Ank Kumar) 06.jpg',
      selite: 'Medusan kasvot pylvään jalustana Yerebatanin '
        + 'vesisäiliössä.',
      lahde: 'Ank Kumar, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Kaanon, kohta 4: *"Rakentaja tarkistaa KAARI_PAKETIT/kohtaamiset:
   * onko Istanbulilla hahmo ja laattakysymys. Kysymystä EI vaihdeta."*
   *
   * TARKISTETTU 25.8.2026: js/packs/kohtaamiset.js:ssä EI ole
   * Istanbulin riviä. Hahmo on silti olemassa ja pelissä käytössä:
   * tarinakaaren paketti js/tyohuone-kehitys-data.js (KAARI_PAKETIT,
   * id 'istanbul') antaa hahmon (Vedenvartija Emine), kohtaamiskuvan
   * (assets/kohtaamiset/kohtaaminen-istanbul.jpg, tools/
   * generoi-kohtaamiskuvat.mjs) JA sen kysymyksen, jonka
   * game.actionQuiz esittää laatalla (js/game.js kaariTarina). Tämä
   * paketti ei kosketa kysymystä millään tavalla — sama suhde kuin
   * Ateenan Nikoksella ja Sofian Nadialla.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Eminen omaa repliikkiä (joka puhuu isoisoäidin
   * vedenmitoista) eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Vedenvartija Emine',
    nappi: 'Tapaa Emine',
    teksti: 'Emine mittaa säiliön vettä kuten hänen sukunsa on mitannut '
      + 'sulttaanien ajoista asti, ja tuntee pylväsmetsän niin hyvin, '
      + 'ettei tarvitse lyhtyä löytääkseen perille. Portaita on tullut '
      + 'alas matkailijoita satamäärin: useimmat laskevat pylväitä, '
      + 'valokuvaavat vettä ja nousevat takaisin. Herra Foggia hän ei '
      + 'päästä veneeseen heti. Ennen kuin airo koskee veteen, hän haluaa '
      + 'tietää, onko vieras pysähtynyt miettimään, miksi kivikasvot '
      + 'makaavat juuri siinä asennossa, jossa ne makaavat.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla ja Sofialla. Raskas korttivirta
   * ei lue kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: KÄÄRMEPYLVÄS, ei kaupungin laatta.
   * Kaanon, kohta 4, määrää paikan ja antaa koordinaatit
   * (41,0058 N / 28,9758 E, Hippodromi/Sultanahmet).
   *
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla
   * (js/packs/fokuskohteet-tur.js): maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 -175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((28,9758 − (−175)) mod 360) × (12000/360)
   *                     = 203,9758 × 33,3333… = 6799,2
   *                   y = (millerY(41,0058) − millerY(76)) × 12000/2π
   *                     = 1763,2
   *   europe          x = (28,9758 + 11) × 19,2 = 767,5
   *                   y = (72 − 41,0058) × 26,3 = 815,1
   *
   * TARKISTUS ISTANBULIN LAATTAA VASTEN. Laatta on maailmankartalla
   * 6796,5 / 1763 (js/packs/maailmankartta.js) ja Euroopan laudalla
   * 766 / 815 (js/packs/europe.js). Sama kaava antaa laatan omista
   * koordinaateista (28,955 E / 41,01361 N) pisteen 6798,5 / 1762,9 ja
   * 767,1 / 814,9 — eli laudan laatta itse on noin kaksi yksikköä
   * kaavan pisteestä lännessä. Käärmepylväs on kaavan mukaan 0,7
   * yksikköä laatan laskennallisesta keskipisteestä, mikä on oikein:
   * Sultanahmet on runsaan kilometrin päässä kaupungin keskipisteestä,
   * ja laudan yksikkö on maailmankartalla noin kolme kilometriä. Piste
   * piirtyy laatan viereen eikä salmen toiselle puolelle.
   */
  kohtaamispiste: {
    nimi: 'Käärmepylväs',
    laudat: {
      maailmankartta: { x: 6799.2, y: 1763.2 },
      europe: { x: 767.5, y: 815.1 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS (sama perustelu kuin Ateenassa ja
   * Sofiassa). Istanbulin lehden sivupino rakentuu täsmälleen kuten
   * Sofian (js/lehti.js rakennaSivut), koska kaupungilla on samat kaksi
   * kulttuurikategoriaa ('kaupunki' ja 'historia',
   * js/packs/kulttuuri-kategoriat.js) ja maalla on Menovinkit-sivu
   * (js/packs/maa-kategoriat.js, TUR): 0 = etusivu, 1 = kaupunkisivu
   * "Istanbul", 2 = Historia, 3 = Menovinkit.
   *
   * SISÄLTÖ ON LEHDEN OMAA. AARTEEN AVAUS on koottu sivun 2 omasta
   * vesijohtonostosta (VESIJOHTO_VISA) ja JULISTE "Matkailijan Istanbul"
   * -artikkelin Tünel-jaksosta (TUNEL_VISA) — ei yhtään uutta
   * faktaväitettä kummassakaan.
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on
   * Istanbulin kulttuurivisa (js/packs/europe-kulttuuri.js, obeliskin
   * veistovuosi), jonka js/fokustehtavat.js pukee samaksi AARTEEN AVAUS
   * -laatikoksi ilman omaa riviään täällä. Kumpi tahansa aarteen
   * avaajista sytyttää pisteen, ja jälkimmäisestä saa enää rahaa.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: VESIJOHTO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: TUNEL_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Turkki) ----------
   *
   * Raamattu, osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: kun maan
   * aarre on löydetty, kartalta NOUSEE YKSI TÄKYNOSTO — *"lyhyt
   * KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai
   * uskomaton tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva
   * perässä"*. Näytetään yksi kerrallaan; luetun tilalle nousee poolista
   * seuraava.
   *
   * OTSIKOT OVAT KAANONIN OMAT (fokusvirta-istanbul-kaanon.md, kohta 6)
   * — sanamuotoja ei ole muutettu. `lunastus` on rakentajan kokoama
   * lyhyt fakta takynostot-turkki.md:stä, ja se pitää otsikon lupauksen
   * (sääntö 1: otsikon lupaus lunastetaan tai se on klikkihuijaus).
   * `avaa` osoittaisi tämän tiedoston täkyyn, jos sellainen olisi —
   * yhdelläkään näistä kolmesta ei ole omaa täkyä, joten kenttä puuttuu
   * tarkoituksella ja lunastus kannattelee noston yksinään.
   *
   * KOLMAS NOSTO ON KIRJOITETTU MENNEESEEN AIKAMUOTOON, ja se on
   * raportin nimenomainen vaatimus: *"Wikipedia-artikkelia ei ole
   * päivitetty vuoden 2021 jälkeen... Älä väitä, että ystävyys jatkuu
   * vuonna 2026 — kirjoita menneessä aikamuodossa."* Otsikko on
   * kaanonin oma ja toimii sellaisenaan menneessä ("palasi").
   */
  takynostot: [
    {
      id: 'schliemann',
      otsikko: 'Troijan löytäjä tuhosi Troijan',
      /* Faktat: takynostot-turkki.md, ehdokas 6 (VARMA, useassa osiossa). */
      lunastus: 'Schliemann kaivoi Hisarlıkin kummulla ja päätti, että '
        + 'toinen kerros alhaalta oli Homeroksen Troija. Kaivaakseen sen '
        + 'kokonaan esiin hän tuhosi valtaosan sen päällä olleista '
        + 'kerroksista kirjaamatta niitä lainkaan — siitä häntä '
        + 'arvosteltiin jo hänen omana aikanaan. Ja hän oli väärässä: '
        + 'Troija II oli tuhat vuotta liian vanha. Wilhelm Dörpfeld '
        + 'osoitti myöhemmin Troija VI:n todennäköisemmäksi, ja '
        + 'Schliemann oli yksityisesti samaa mieltä. Hän ei koskaan '
        + 'julkaissut sitä.',
      /*
       * Commons (takynostot-turkki.md, ehdokas 6, varmennettu
       * 25.8.2026): 3226×4096, public domain, Library of Congress,
       * 1870 — kaivausten alkuvuodelta.
       */
      kuva: {
        tiedosto: 'Heinrich Schliemann, half-length portrait, facing front LCCN96516246.tif',
        selite: 'Heinrich Schliemann vuonna 1870, vuosi ennen Troijan '
          + 'kaivauskausien alkua.',
        lahde: 'Library of Congress 1870, Wikimedia Commons (public domain)',
      },
    },
    {
      id: 'laimays',
      otsikko: 'Sulttaanin äiti läimäytti Ranskan keisarinnaa',
      /*
       * Faktat: takynostot-turkki.md, ehdokas 1. LÄHDE ITSE VARAA ASIAN
       * sanalla "reportedly" ja antaa kaksi eri versiota — raportti
       * vaatii, että molemmat kerrotaan ja varaus näkyy. Ilman sitä
       * tämä olisi klikkihuijaus.
       */
      lunastus: 'Vuonna 1868 sulttaani Abdülaziz vei vieraansa, Ranskan '
        + 'keisarinna Eugénien, tapaamaan äitiään Dolmabahçen palatsiin. '
        + 'Pertevniyal Sultan piti vieraan naisen läsnäoloa omissa '
        + 'yksityisissä huoneissaan loukkauksena, ja hänen kerrotaan '
        + 'läimäisseen keisarinnaa kasvoihin — tilanne oli lähellä '
        + 'kansainvälistä selkkausta. Toisen kertomuksen mukaan hän '
        + 'suuttui siitä, että Eugénie tarttui hänen poikaansa '
        + 'käsivarresta, ja läimäisi tätä vatsaan muistutuksena siitä, '
        + 'ettei oltu Ranskassa. Hovista vuoti kaksi eri huhua siitä, '
        + 'mihin sulttaanin äiti löi.',
      /*
       * Commons (takynostot-turkki.md, ehdokas 1, varmennettu
       * 25.8.2026): 2481×3823, public domain, Franz Xaver Winterhalter,
       * 1852 — keisarinnan kuuluisin muotokuva.
       */
      kuva: {
        tiedosto: 'Franz Xaver Winterhalter Empress Eugenie.jpg',
        selite: 'Keisarinna Eugénie Franz Xaver Winterhalterin '
          + 'muotokuvassa vuodelta 1852.',
        lahde: 'Franz Xaver Winterhalter 1852, Wikimedia Commons (public domain)',
      },
    },
    {
      id: 'yaren',
      otsikko: 'Haikara palasi Afrikasta samalle kalastajalle — joka kevät',
      /* Faktat: takynostot-turkki.md, ehdokas 5 ja takyt-istanbul.md, täky 18. */
      lunastus: 'Uluabat-järven rannalla, 199 asukkaan Eskikaraağaçin '
        + 'kylässä Bursan maakunnassa, asuu kalastaja Adem Yılmaz. '
        + 'Vuodesta 2010 alkaen sama kattohaikara — kylässä sitä '
        + 'kutsuttiin nimellä Yaren — palasi Afrikan-muutolta joka '
        + 'maaliskuu samaan kylään ja laskeutui joka aamu hänen pieneen '
        + 'veneeseensä. Kalaan lähdettiin yhdessä, ja niin jatkui yli '
        + 'kymmenen vuoden ajan. Paikallinen valokuvaaja kuvasi '
        + 'ystävyyden ensi kerran 2016, siitä tehtiin palkittu '
        + 'dokumentti, ja kylän keskusaukiolle pystytettiin patsas '
        + 'kalastajasta ja haikarasta.',
      /*
       * KUVAVALINTA ON TIETOINEN VARMAN PUOLEN VALINTA. Tarinan oma
       * alkuperäiskuva on `Adem Amca ve Yaren Leylek 2020.jpg`
       * (5568×3480, CC BY-SA 4.0, Alpertuydes 6.3.2020) — sama
       * valokuvaaja, joka nimetään lähteessä, ja miniatyyrinä selvästi
       * parempi koukku. Molemmat raportit merkitsevät sen kohdalle
       * SILMÄTARKISTUS PAKOLLINEN, koska kuvassa on tunnistettava
       * henkilö. Sitä tarkistusta ei ole tehty (kuvia ei ole katsottu
       * silmin), joten tähän on valittu henkilötön kuva samasta
       * lajista ja samasta maasta. Kun silmätarkistus on tehty, kuvan
       * voi vaihtaa — teksti kantaa kumman tahansa kanssa.
       *
       * Commons (takyt-istanbul.md, täky 17, varmennettu 25.8.2026):
       * 4250×2833, CC BY-SA 4.0, Zeynel Cebeci, 2020.
       */
      kuva: {
        tiedosto: 'Ciconia ciconia - White Stork 09.jpg',
        selite: 'Kattohaikara Turkissa. Haikarat kiertävät Välimeren '
          + 'Bosporin kautta, koska nousuvirtauksia ei synny meren yllä.',
        lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * Kaanon, kohta 5 — teksti sellaisenaan. Isoisän merkintä, joka
   * aukeaa kun aarre löytyy. Kaanon merkitsee tämän MAAN 3
   * ENSIMMÄISEKSI VAANIJAVIHJEEKSI: merkintä ei enää kerro vain siitä,
   * että aarre jäi kaivamatta, vaan siitä, että joku muukin etsii.
   */
  aarremerkinta: {
    teksti: 'Basaarin kätköä en ehtinyt edes piirtää: mies, joka oli '
      + 'kysellyt minusta satamassa, seisoi jo sillalla. Jätin merkin '
      + 'luetteloon ja nousin yöjunaan — jos hän etsii samaa kuin minä, '
      + 'toivon että sinä ehdit ensin.',
  },
};
