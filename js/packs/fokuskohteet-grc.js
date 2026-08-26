/*
 * FOKUSKOHTEET — KREIKKA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Omistajan tilaus 24.8.2026 (kohdekorostusidean henki, Raamatun osio
 * "Fokusmoodi", kohta KOHDEKOROSTUS): fokusnäkymän kartalla on
 * pelilaatan lisäksi muitakin paikkoja, ja niistä pitää voida kertoa.
 * KOHDENOSTO on tämän kevyin muoto: pöllö puhuu kuplasta jostakin
 * MUUSTA kuin kaupungista, ja kartalle kasvaa vinjettikuva KOHTEEN
 * OMAAN SIJAINTIIN — ei kaupungin viuhkaan.
 *
 * ── KAKSI PINTAA, YKSI LISTA ───────────────────────────────────────
 *
 * Sama lista palvelee nyt kahta pintaa, ja siksi kentät ovat sellaisia
 * kuin ovat:
 *
 *   1. KOHDENOSTO fokusvirrassa (js/fokusvirta.js): kaupungin virta
 *      poimii kohteita tunnuksilla, ja pöllö puhuu `teksti`-kentän
 *      kuplasta. Valintapainikkeen lupaus on `nappi`; ilman sitä
 *      painikkeessa lukee kohteen nimi.
 *   2. KARTAN POP-UP (js/fokuskohteet.js, omistajan tilaus 24.8.2026:
 *      *"Tee kartalla näkyvistä kohteista klikattava pop up infoja"*):
 *      fokuslehden päällä jokaisella kohteella on klikattava merkki,
 *      ja napautus avaa `nimi`, `tyyppi`, `kuva`, `teksti` ja `lahde`
 *      -kentistä pienen tietoruudun.
 *
 * ── KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026) ───────
 *
 * Kartan tietoruudun lopussa on kaksi valmista kysymystä, ja sen
 * leipätekstissä voi olla alleviivattuja sanoja, joista pöllö kertoo
 * lisää. Kummatkin ovat DATAA — koodi (js/fokuskohteet.js) ei tiedä
 * yhdestäkään kohteesta mitään:
 *
 *   kysymykset: ['...', '...']  Enintään kaksi, PELAAJAN ÄÄNELLÄ ja
 *     neutraalina — pöllön karaktääri koskee vastausta, joka syntyy
 *     workerissa, ei kysymystä. Kysymykset on laadittu kohteen oman
 *     pop-up-tekstin pohjalta niin, että ne vievät ETEENPÄIN siitä:
 *     tekstissä jo vastattua ei kysytä uudestaan.
 *
 *   korostukset: ['sana', 'perusmuoto|näkyvä muoto']  Sanat, jotka
 *     alleviivataan leipätekstissä pisteviivalla. Näkyvän muodon on
 *     löydyttävä tekstistä sellaisenaan; perusmuoto on se, jolla
 *     pöllöltä kysytään ("Kerro lisää: minolainen kulttuuri"). Sama
 *     putkimerkintä kuin pöllölinkeissä (js/pollo.js puraPutki).
 *     1–2 kohteille, joissa on luonteva syventävä termi; kohde ilman
 *     kenttää toimii ennallaan.
 *
 * ÄÄNI ON SIKSI NEUTRAALI kaikissa paitsi Korintin kanavassa, joka on
 * jo poimittu Ateenan virtaan ja kirjoitettu pöllön puhuteltavaksi.
 * Kartan tietoruutu ei ole kenenkään puhetta vaan lehden reunahuomio;
 * kun Fable nostaa kohteen jonkin kaupungin virtaan, sen `teksti` saa
 * samalla pöllön äänen ja `nappi`-rivin.
 *
 * ── MIKSI OMA LISTA EIKÄ RIVI KAUPUNGIN VIRRASSA ───────────────────
 *
 * Kohde ei kuulu yhdelle kaupungille. Korintin kanava on Ateenan
 * naapurissa, mutta Thessaloniki tai Delfoi voi nousta kolmen eri
 * kaupungin virrassa, ja fokuskohteet-kreikka.md:n kohteet ovat yhtä
 * lailla koko maan omaisuutta. Lista asuu siis maakohtaisesti, ja
 * kaupungin virta poimii siitä tunnuksella (fokuskohteet):
 * uusi kohde on yksi olio tähän ja yksi id virran `kohteet`-riville.
 *
 * ── KOORDINAATIT ON LASKETTU KERRAN, LAUTAA KOHTI ──────────────────
 *
 * Sama ratkaisu kuin fokusnäkymän lisänimillä (js/packs/fokus-grc.js):
 * pelissä EI ole projektiokoodia, vaan asteet on muunnettu laudan
 * yksiköiksi valmiiksi ja asteet jätetty kommenttiin, jotta luvut voi
 * laskea uudelleen jos lauta vaihtaa projektiota. Erona on, että
 * kohteet on annettava KAHDELLE laudalle: Ateena on pelattavissa sekä
 * Euroopan laudalla että maailmankartalla, ja sama paikka on niillä
 * eri kohdassa.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/tee-fokuskartta.mjs, laudanProjektio).
 *     Tarkistus: Ateena 23,7275 E / 37,9838 N → 6624,3 / 1881,5,
 *     ja laudalla laatta on kohdassa 6624,7 / 1882 — 0,7 yksikön
 *     osumatarkkuus, sama kuin fokus-grc.js:llä.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Ateena → 666,8 / 894,6, laudalla
 *     667 / 895.
 *
 * Lauta, jota rivillä ei ole, ei saa kohdetta kartalle — kupla toimii
 * silti. Se on tarkoituksellinen porras: väärään paikkaan piirretty
 * vinjetti olisi pahempi kuin piirtämättä jäänyt.
 *
 * MERTEN PISTEET OVAT KESKIPISTEITÄ, EIVÄT TÄSMÄPAIKKOJA (aineiston
 * huomio 2): Egeanmeren ja Joonianmeren koordinaatit ovat Wikipedian
 * antamat pyöreät asteluvut, eli koko meren likimääräinen keskipiste.
 * Kartalla se on juuri oikea paikka nimikilvelle ja sen viereen
 * asettuvalle merkille; tarkkaa rannikkopistettä siitä ei saa tehdä.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md, jonka
 * pop-up-tekstit on varmennettu en-Wikipediasta 24.8.2026 artikkeli ja
 * alaotsikko kerrallaan. Teksti on tässä aineiston omaa tekstiä; siitä
 * on paikoin lyhennetty, muttei lisätty eikä muutettu yhtään faktaa.
 * Kaksi tietoista rajausta aineiston omien huomioiden mukaan:
 * Ali-pashan julmuudet ja Taygetoksen antiikin legenda on jätetty pois
 * (Perustuslain ikäsopivuuskohta), ja Joonianmeren teksti nojaa vain
 * siihen, minkä artikkeli itse sanoo (Io ui meren yli) — Zeus- ja
 * Hera-tausta on aineiston huomion 5 mukaisesti jätetty pois.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, valittu Commonsin rajapinnalla
 * (categorymembers + imageinfo) aineistossa TARKISTETUISTA
 * kategorioista 24.8.2026 — ei arvattuja tiedostonimiä, ja jokaisen
 * valitun nimen olemassaolo, koko, lisenssi ja tekijä on kysytty
 * erikseen imageinfolla. Kategorianimi on aineiston tarkistama silloin
 * kun se eroaa artikkelin otsikosta (Nafplion, Taygetos, Pindus,
 * Ancient Delphi). Iraklionilla ei ole omaa kuvakategoriaa lainkaan
 * (aineiston huomio 3: Category:Heraklion on olemassa mutta tyhjä),
 * joten kuva on aineiston itsensä ehdottamalta varareitiltä
 * Category:Knossos — sama paikka, josta kohteen teksti kertoo.
 *
 * Lisenssit ovat PD tai CC, ja tekijä on kuvan `lahde`-rivillä, koska
 * CC BY vaatii maininnan.
 */

/**
 * Kreikan fokuskohteet: aineiston kaikki 14 kohdetta samassa
 * järjestyksessä kuin docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md,
 * niiden perässä Akropolis ja Akropolis-museo (v1119–v1121),
 * symbolitaksonomian ensimmäinen sisältöerä (kuusi kohdetta) ja
 * täkypoolista siirretyt kaksi eläinkohdetta — kummallakin erällä on
 * oma kommenttinsa listan sisällä.
 */
export const FOKUSKOHTEET_GRC = [
  {
    id: 'thessaloniki',
    nimi: 'Thessaloniki',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi juutalaisyhteisö kasvoi täällä niin suureksi?',
      'Millainen hallitsija Kassandros oli?',
    ],
    korostukset: ['Bysantti|Bysantin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kaupunki, joka sai nimensä vaimolta',
    // 22,9356 E / 40,6403 N — en-Wikipedia "Thessaloniki".
    laudat: {
      maailmankartta: { x: 6597.9, y: 1777.7 },
      europe: { x: 651.6, y: 824.8 },
    },
    teksti: 'Kaupungin perusti makedonialainen kuningas Kassandros vuonna '
      + '315 eaa. ja nimesi sen vaimonsa Thessaloniken mukaan — tämä oli '
      + 'Aleksanteri Suuren sisarpuoli. Bysantin aikana kaupunkia '
      + 'kutsuttiin "kanssapääkaupungiksi" (Symprotevousa) Konstantinopolin '
      + 'rinnalla. Ottomaanivallan 1430–1912 aikana täällä asui rinnakkain '
      + 'kristittyjä, muslimeja ja juutalaisia, ja 1500–1900-luvuilla se oli '
      + 'Euroopan ainoa juutalaisenemmistöinen kaupunki.',
    lahde: 'en-Wikipedia "Thessaloniki", johdanto-osa (tarkistettu 24.8.2026).',
    /*
     * Category:Thessaloniki (104 tiedostoa). Kuva kertoo juuri sen mistä
     * tekstikin: Rotunda on 300-luvun rakennus, jonka viereen ottomaanit
     * pystyttivät minareetin — kaupungin monta kerrosta yhdessä kuvassa.
     */
    kuva: {
      tiedosto: 'Rotunda mit Minarett, Thessaloniki 1995.jpg',
      selite: 'Thessalonikin Rotunda ja sen viereen ottomaanien aikana '
        + 'pystytetty minareetti, kuvattuna 1995.',
      lahde: 'Fleur de Sel, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'patras',
    nimi: 'Patras',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kapina alkoi juuri Patrasista?',
      'Mistä Patras elää nykyään?',
    ],
    korostukset: ['ruutukaava|ruutukaavan'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kaupunki, joka rakennettiin uudelleen',
    // 21,73333 E / 38,25 N — en-Wikipedia "Patras".
    laudat: {
      maailmankartta: { x: 6557.8, y: 1871.2 },
      europe: { x: 628.5, y: 887.6 },
    },
    teksti: 'Patras oli yksi ensimmäisistä kaupungeista, joissa Kreikan '
      + 'itsenäisyyssota syttyi vuonna 1821 — ottomaanien varuskunta '
      + 'linnoituksessa piti kuitenkin pintansa aina vuoteen 1828 asti. '
      + 'Sodan jälkeen suuri osa kaupungista makasi raunioina, ja se '
      + 'rakennettiin uudelleen ruutukaavan mukaan vuoden 1858 '
      + 'kaupunkisuunnitelmalla. Isoisän vieraillessa 1873 katukuva oli siis '
      + 'vain reilun kymmenen vuoden ikäinen.',
    lahde: 'en-Wikipedia "Patras", osiot "Modern era" ja "Urban landscape" '
      + '(tarkistettu 24.8.2026).',
    // Category:Patras (38 tiedostoa). Laïki eli katutori juuri sillä
    // ruutukaava-alueella, josta teksti puhuu.
    kuva: {
      tiedosto: 'Marché à Patras.jpg',
      selite: 'Laïki eli katutori Agiou Nikolaoun kadulla Patrasissa.',
      lahde: 'Hélène Arnault, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'ioannina',
    nimi: 'Ioánnina',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miten Ali-pasha nousi niin mahtavaksi?',
      'Näkyykö hänen aikansa kaupungissa yhä?',
    ],
    korostukset: ['kreikkalainen valistus'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Ruhtinas järven rannalla',
    // 20,85222 E / 39,66361 N — en-Wikipedia "Ioannina".
    laudat: {
      maailmankartta: { x: 6528.4, y: 1816.1 },
      europe: { x: 611.6, y: 850.4 },
    },
    /*
     * IKÄSOPIVUUSRAJAUS (aineiston huomio 1, Perustuslaki): artikkeli
     * kertoo myös Ali-pashan julmuuksista kaupungin kreikkalaisväestöä
     * kohtaan. Ne on jätetty pois; kohteen ydintarina ei kärsi siitä.
     */
    teksti: 'Vuosina 1788–1822 kaupunkia hallitsi ottomaani-albaanialainen '
      + 'ruhtinas Ali-pasha, jonka hovi houkutteli aikansa vaikutusvaltaisia '
      + 'hahmoja ja jonka kaudella kaupungissa kukoisti sekä kauppa että '
      + 'kreikkalainen valistus. Kun hän yritti irtautua sulttaanin vallasta, '
      + 'Istanbul julisti hänet petturiksi: sulttaanin joukot piirittivät '
      + 'kaupunkia, ja Ali-pasha salamurhattiin 1822 järven saaren '
      + 'luostarissa, jonne hän oli paennut odottamaan armahdusta.',
    lahde: 'en-Wikipedia "Ioannina", osio "Ali Pasha\'s rule (1788–1822)" '
      + '(tarkistettu 24.8.2026).',
    // Category:Ioannina (51 tiedostoa).
    kuva: {
      tiedosto: 'Ioannina, Greece.jpg',
      selite: 'Ali-pashan entinen palatsi Ioánninassa.',
      lahde: 'DJ Manos, Wikimedia Commons (CC BY 3.0)',
    },
  },
  {
    id: 'nafplio',
    nimi: 'Náfplio',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi pääkaupunki siirrettiin Ateenaan?',
      'Mistä kuningas Otto tuli Kreikkaan?',
    ],
    korostukset: ['Ioannis Kapodistrias'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kreikan ensimmäinen pääkaupunki',
    // 22,8 E / 37,56583 N — en-Wikipedia "Nafplio".
    laudat: {
      maailmankartta: { x: 6593.3, y: 1897.6 },
      europe: { x: 649.0, y: 905.6 },
    },
    teksti: 'Nafpliosta tuli itsenäistyneen Kreikan ensimmäinen virallinen '
      + 'pääkaupunki vuonna 1829. Maan ensimmäinen valtionpäämies, kreivi '
      + 'Ioannis Kapodistrias, astui Kreikan mantereelle juuri täällä 1828 — '
      + 'ja hänet murhattiin Pyhän Spyridonin kirkon portailla 1831. '
      + 'Pääkaupunki siirtyi Ateenaan 1834, kun kuningas Otto niin päätti, '
      + 'mutta 1873 isoisä olisi yhä nähnyt kaupungin entisen aseman jäljet '
      + 'sen linnoituksissa ja kirkoissa.',
    lahde: 'en-Wikipedia "Nafplio", osio "19th century: Independence and '
      + 'first capital" (tarkistettu 24.8.2026).',
    /*
     * Category:Nafplion — huomaa n-kirjain lopussa; "Category:Nafplio"
     * ei ole olemassa (aineiston huomio 4). Kuva on 1840-luvun
     * matkakirjasta, eli tasan isoisän maailmasta: Kapodistriaksen talo
     * Tirynsin muurien alla.
     */
    kuva: {
      tiedosto: 'Maison de Capo d\'Istria sous les murs de Tirynthe Nauplie dans le golfe d\'Argos - Rey Etienne - 1867.jpg',
      selite: 'Kapodistriaksen talo Tirynsin muurien alla Nafplion luona. '
        + 'Kuvalaatta Étienne Reyn matkakirjasta, joka kertoo vuosien '
        + '1843–1844 matkasta.',
      lahde: 'Étienne Rey 1867, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'iraklion',
    nimi: 'Iraklion',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Millainen kansa minolaiset olivat?',
      'Miten Knossoksen rauniot löydettiin?',
    ],
    korostukset: ['Knossos|Knossoksen', 'minolainen kulttuuri|minolaisen kulttuurin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Euroopan vanhin kaupunki?',
    // 25,1344 E / 35,3403 N — en-Wikipedia "Heraklion".
    laudat: {
      maailmankartta: { x: 6671.1, y: 1982.5 },
      europe: { x: 693.8, y: 964.2 },
    },
    teksti: 'Iraklionin seutua on asutettu yhtäjaksoisesti ainakin vuodesta '
      + '7000 eaa., mikä tekee siitä yhden Euroopan pisimpään asuttuja '
      + 'alueita. Kaupungin kupeessa sijaitsee Knossoksen palatsi, '
      + 'minolaisen kulttuurin keskus noin vuosilta 2000–1350 eaa. ja usein '
      + 'Euroopan vanhimpana kaupunkina pidetty paikka — nykyään Kreikan '
      + 'toiseksi suosituin nähtävyys Parthenonin jälkeen.',
    lahde: 'en-Wikipedia "Heraklion", johdanto-osa (tarkistettu 24.8.2026).',
    /*
     * Kaupungilla EI OLE omaa kuvakategoriaa (aineiston huomio 3):
     * Category:Heraklion on olemassa mutta täysin tyhjä. Kuva on siksi
     * aineiston itsensä ehdottamalta varareitiltä Category:Knossos
     * (133 tiedostoa) — sama palatsi, josta teksti kertoo.
     */
    kuva: {
      tiedosto: 'Armon Knossos P1050997.JPG',
      selite: 'Knossoksen minolaisen palatsin raunioita Kreetalla, '
        + 'Iraklionin kupeessa.',
      lahde: 'Deror avi, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'olympos',
    nimi: 'Ólympos',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka kiipesi Olympokselle ensimmäisenä?',
      'Miksi juuri Olympos oli jumalten koti?',
    ],
    korostukset: ['Mytikas|Mytikakseen'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Jumalten koti',
    // 22,35861 E / 40,08556 N — en-Wikipedia "Mount Olympus".
    laudat: {
      maailmankartta: { x: 6578.6, y: 1799.5 },
      europe: { x: 640.5, y: 839.3 },
    },
    teksti: 'Kreikkalaisessa mytologiassa Olympos oli jumalten koti, ja '
      + '52-huippuinen vuoristo kohoaa yhä Kreikan korkeimpaan pisteeseensä, '
      + 'Mytikakseen (2 917,7 m). Vuoresta tuli maan ensimmäinen '
      + 'kansallispuisto 1938, ja heinäkuussa 2026 koko alue otettiin '
      + 'Unescon maailmanperintölistalle sekä luonnostaan että '
      + 'kulttuuriperinnöstään. Suosituin nousureitti alkaa yhä Litohoron '
      + 'kylästä vuoren juurelta.',
    lahde: 'en-Wikipedia "Mount Olympus", johdanto-osa (tarkistettu '
      + '24.8.2026; Unesco-merkintä on nykypäivän tieto, ei 1873-fakta).',
    // Category:Mount Olympus (194 tiedostoa).
    kuva: {
      tiedosto: 'Around the summit, Mount Olympus.jpg',
      selite: 'Olympoksen huippualuetta. Massiivissa on 52 huippua, joista '
        + 'korkein on Mytikas.',
      lahde: 'Dimitrios Smyrnaios, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'parnassos',
    nimi: 'Parnassós',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten Dionysoksen juhlia vietettiin?',
      'Mitä Homeros kertoo Parnassoksesta?',
    ],
    korostukset: ['bauksiitti|bauksiittia'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vuori kahdelle jumalalle',
    // 22,62417 E / 38,53583 N — en-Wikipedia "Mount Parnassus".
    laudat: {
      maailmankartta: { x: 6587.5, y: 1860.1 },
      europe: { x: 645.6, y: 880.1 },
    },
    teksti: 'Muinaiset kreikkalaiset pyhittivät Parnassoksen kahdelle '
      + 'jumalalle kerralla: Apollonille, jonka oraakkeli sijaitsi vuoren '
      + 'eteläisellä rinteellä Delfoissa, ja Dionysokselle, jonka '
      + 'riemujuhlia vietettiin vuoren huipuilla. Homeroksen Iliaassa '
      + 'mainitaan useita vuoren kylistä, ja sen kalkkikivessä on myös '
      + 'bauksiittia — alumiinimalmia, jota louhitaan yhä. Talvella samat '
      + 'rinteet täyttyvät hiihtäjistä.',
    lahde: 'en-Wikipedia "Mount Parnassus", johdanto-osa (tarkistettu '
      + '24.8.2026).',
    // Category:Mount Parnassus (79 tiedostoa).
    kuva: {
      tiedosto: 'Mount Parnassus from Chalaxidi.JPG',
      selite: 'Parnassos Galaxidin suunnasta katsottuna.',
      lahde: 'Matthiasberlin, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'taygetos',
    nimi: 'Taÿ́getos',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli Taygete?',
      'Millaista elämä on vuoren kylissä nykyään?',
    ],
    korostukset: ['Pentadaktylos'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vuori Odysseiasta',
    // 22,35222 E / 36,95389 N — en-Wikipedia "Taygetus".
    laudat: {
      maailmankartta: { x: 6578.4, y: 1921.1 },
      europe: { x: 640.4, y: 921.7 },
    },
    /*
     * IKÄSOPIVUUSRAJAUS (aineiston huomio 1, Perustuslaki): artikkelin
     * antiikin legenda vastasyntyneiden hylkäämisestä vuorelta on
     * jätetty pois.
     */
    teksti: 'Taygetos on yksi Euroopan vanhimmista muistiin merkityistä '
      + 'paikannimistä — se mainitaan jo Homeroksen Odysseiassa, ja '
      + 'kreikkalaisen taruston mukaan vuori on nimetty Taygete-nymfin '
      + 'mukaan. Bysantin ajalta 1800-luvulle asti sitä kutsuttiin myös '
      + 'nimellä Pentadaktylos, "viisisormi". Korkein huippu, Profitis Ilias '
      + '(2 405 m), on koko Peloponnesoksen korkein kohta, ja vuori hallitsee '
      + 'yhä Spartan ja Kalamatan kaupunkien taivasrajaa.',
    lahde: 'en-Wikipedia "Taygetus", johdanto-osa sekä osiot '
      + '"Geography/Physical" ja "Political" (tarkistettu 24.8.2026).',
    /*
     * Category:Taygetos — EI "Category:Taygetus", joka puuttuu (aineiston
     * huomio 4). Kuva on Ranskan Morea-retkikunnan julkaisusta 1831:
     * juuri se näkymä Spartasta, jonka teksti mainitsee.
     */
    kuva: {
      tiedosto: 'Mont Taygète Vue prise de Sparte - Blouet Guillaume-abel - 1831.jpg',
      selite: 'Taygetos Spartasta katsottuna. Kuvalaatta Ranskan '
        + 'Morea-retkikunnan julkaisusta (1831–1838).',
      lahde: 'Guillaume Abel Blouet 1831, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'pindos',
    nimi: 'Píndos',
    tyyppi: 'vuori',
    kysymykset: [
      'Asuuko vuoristossa yhä ihmisiä?',
      'Miksi Epeiros jäi muusta Kreikasta erilleen?',
    ],
    korostukset: ['Dinaariset Alpit|Dinaaristen Alppien'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kreikan selkäranka',
    // 20,92528 E / 40,08889 N — en-Wikipedia "Pindus".
    laudat: {
      maailmankartta: { x: 6530.8, y: 1799.4 },
      europe: { x: 613.0, y: 839.3 },
    },
    teksti: 'Noin 160 kilometrin pituinen Pindos kulkee pohjoisesta etelään '
      + 'pitkin Kreikan mannerta ja tunnetaan puhekielessä "Kreikan '
      + 'selkärankana". Vuoristo on geologisesti Dinaaristen Alppien jatke '
      + 'ja ulottuu Albanian rajalta aina Peloponnesoksen pohjoisosiin asti. '
      + 'Korkein huippu on Smolikas (2 637 m), ja vuoristo erottaa '
      + 'perinteisesti Epeiroksen alueen muusta Kreikan mantereesta.',
    lahde: 'en-Wikipedia "Pindus", johdanto-osa (tarkistettu 24.8.2026).',
    // Category:Pindus — ei "Category:Pindos" (aineiston huomio 4);
    // 55 tiedostoa.
    kuva: {
      tiedosto: 'Southern Pindus IMG 3592.jpg',
      selite: 'Eteläisen Pindoksen harjanteita Katafidin huipulta '
        + 'Tzoumerkassa nähtynä.',
      lahde: 'Deyan Vasilev (Dido3), Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'egeanmeri',
    nimi: 'Egeanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Theseus unohti vaihtaa purjeet?',
      'Miksi Egeanmerellä on niin paljon saaria?',
    ],
    korostukset: ['Minotauros|Minotaurosta'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Meri, joka sai nimen kuninkaalta',
    // 25 E / 39 N — en-Wikipedia "Aegean Sea". KOKO MEREN KESKIPISTE,
    // ei täsmäpaikka (ks. tiedoston alku).
    laudat: {
      maailmankartta: { x: 6666.7, y: 1842.0 },
      europe: { x: 691.2, y: 867.9 },
    },
    teksti: 'Vanhan tarun mukaan Egeanmeri sai nimensä kuningas Aigeuksesta, '
      + 'Theseuksen isästä. Theseus lähti tappamaan Minotaurosta ja lupasi '
      + 'nostaa valkoiset purjeet onnistuessaan — mutta unohti sen. Kun '
      + 'Aigeus näki laivan palaavan mustin purjein, hän uskoi poikansa '
      + 'kuolleen ja heittäytyi mereen. Legenda selittää yhä, miksi tämä '
      + 'Kreikan ja Vähän-Aasian välinen meri kantaa hänen nimeään.',
    lahde: 'en-Wikipedia "Aegean Sea", osio "Etymology" (tarkistettu '
      + '24.8.2026).',
    // Category:Aegean Sea (112 tiedostoa).
    kuva: {
      tiedosto: 'BoatGreecewaters.JPG',
      selite: 'Egeanmerta laivan kannelta katsottuna.',
      lahde: 'CuteHappyBrute, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'joonianmeri',
    nimi: 'Joonianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka oli Aiskhylos?',
      'Miksi meri järisee juuri täällä?',
    ],
    korostukset: ['Kalypson syvänne'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Välimeren syvin kohta',
    // 19 E / 38 N — en-Wikipedia "Ionian Sea". KOKO MEREN KESKIPISTE.
    laudat: {
      maailmankartta: { x: 6466.7, y: 1880.8 },
      europe: { x: 576.0, y: 894.2 },
    },
    /*
     * LÄHDETARKKUUS (aineiston huomio 5): Zeus- ja Hera-tausta on
     * yleistunnettua mytologiaa, ei tämän artikkelin tekstiä. Teksti
     * nojaa siksi vain siihen, minkä artikkeli itse sanoo — nimi
     * yhdistettiin Io-nymfiin, joka ui meren yli.
     */
    teksti: 'Joonianmeren nimen alkuperä on hämärän peitossa, mutta antiikin '
      + 'kirjailijat — etenkin Aiskhylos — yhdistivät sen Io-nymfin taruun: '
      + 'Io ui tämän meren yli, ja siitä meri sai nimensä. Meri on yksi '
      + 'Välimeren seismisesti aktiivisimmista alueista, ja sen syvin kohta, '
      + 'Kalypson syvänne (5 109 m), on koko Välimeren syvin paikka.',
    lahde: 'en-Wikipedia "Ionian Sea", osio "Etymology" ja johdanto-osa '
      + '(tarkistettu 24.8.2026).',
    // Category:Ionian Sea (125 tiedostoa). Maalaus on isoisän vuosisadalta.
    kuva: {
      tiedosto: 'Emil Jakob Schindler - Das Ionische Meer bei Korfu - 4020 - Österreichische Galerie Belvedere.jpg',
      selite: 'Emil Jakob Schindlerin maalaus Joonianmerestä Korfun luona '
        + '(1888).',
      lahde: 'Emil Jakob Schindler 1888, Österreichische Galerie Belvedere, '
        + 'Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'korintin-kanava',
    nimi: 'Korintin kanava',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'tekniikka',
    tyyppi: 'muu',
    kysymykset: [
      'Kuljetaanko kanavan läpi vielä nykyään?',
      'Miksi kaivaminen onnistui vasta 1800-luvulla?',
    ],
    korostukset: ['Periandros', 'vetotie|vetotien'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei maantiede. */
    nappi: 'Kanava, jota ei vielä ollut',
    // 22,98389 E / 37,93472 N — en-Wikipedia "Corinth Canal".
    laudat: {
      maailmankartta: { x: 6599.5, y: 1883.4 },
      europe: { x: 652.5, y: 895.9 },
    },
    /*
     * Pöllön repliikki. Aineiston varmennettu pop-up-teksti
     * (fokuskohteet-kreikka.md, kohta 12) sellaisenaan, paitsi että
     * koostajan "HUOM 1873:" -tunniste on kirjoitettu auki omaksi
     * lauseekseen — juuri niin kuin dokumentti itse ehdottaa — ja
     * pöllö puhuttelee herra Foggia. Faktat: Periandros 600-luvulla
     * eaa. ja vetotie, kolme roomalaishallitsijaa ja heidän loppunsa,
     * Neron kuokka 67 jaa., valmistuminen 1881–1893.
     */
    teksti: 'Katso Ateenasta länteen, Korintin kannakselle. Isoisäsi '
      + 'matkan aikaan siellä ei ollut kanavaa. Tyranni Periandros '
      + 'harkitsi sitä jo 600-luvulla eaa., mutta rakensi sen sijaan '
      + 'laivoille kivetyn vetotien. Kolme roomalaishallitsijaa halusi '
      + 'kanavan ja kuoli kaikki väkivaltaisesti: Caesar ja Caligula '
      + 'ennen kuin pääsivät edes alkuun, Nero pian sen jälkeen, kun oli '
      + '67 jaa. itse lyönyt kuokalla ensimmäisen kuopan. Kanava '
      + 'valmistui vasta 1881–1893, isoisäsi matkan jälkeen.',
    lahde: 'en-Wikipedia "Corinth Canal", johdanto-osa ja osio '
      + '"History/Ancient attempts" (tarkistettu 24.8.2026).',
    /*
     * Commonsin rajapinta 24.8.2026 (categorymembers + imageinfo,
     * Category:Corinth Canal — 60 tiedostoa, tarkistettu, ei arvattu):
     * 2560×1920, CC BY-SA 4.0, tekijä JTE Dimandix, kuvattu 13.4.2019,
     * kuvaus "The narrow waterway of Corinth and a bridge in the
     * middle." Vaakakuva, joten se istuu vinjetin kehykseen ilman
     * rajausta; selite ei väitä kuvasta enempää kuin lähde kertoo.
     */
    kuva: {
      tiedosto: 'Corinth Canal in 2019.jpg',
      selite: 'Korintin kanavan kapea vesitie ja sen yli kaartuva silta. '
        + 'Kannaksen läpi kaivettu ura on kuusi kilometriä pitkä.',
      lahde: 'JTE Dimandix, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'santorini',
    nimi: 'Santoríni',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka laajalle purkauksen tuhka levisi?',
      'Miksi Atlantis-tarua yhdistetään Santoriniin?',
    ],
    korostukset: ['Akrotiri|Akrotirin', 'kaldera|kalderan'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Saari, joka räjähti',
    // 25,4325 E / 36,415 N — en-Wikipedia "Santorini".
    laudat: {
      maailmankartta: { x: 6681.1, y: 1941.7 },
      europe: { x: 699.5, y: 935.9 },
    },
    teksti: 'Noin 3 600 vuotta sitten Santorini räjähti yhdessä historian '
      + 'suurimmista tulivuorenpurkauksista, joka hautasi minolaisen '
      + 'kaupungin Akrotirin tuhkaan — ja loi saaren keskelle avautuvan, yhä '
      + 'näkyvän kalderan. Purkausta on esitetty myös kadonneen Atlantiksen '
      + 'tarun innoittajaksi. Akrotirin kaivauksissa 1967 alkaen on löytynyt '
      + 'kolmikerroksisia taloja ja hyvin säilyneitä freskoja, jotka '
      + 'paljastavat yllättävän vauraan yhteisön.',
    lahde: 'en-Wikipedia "Santorini", osio "History/Minoan Akrotiri" '
      + '(tarkistettu 24.8.2026).',
    // Category:Santorini (53 tiedostoa). Satelliittikuvassa näkyy juuri
    // se kaldera, jonka teksti mainitsee.
    kuva: {
      tiedosto: 'Santorini (Thira), site of the Minoan eruption, Greece - 7 January 2023 - Flickr - SentinelHub.jpg',
      selite: 'Santorini ylhäältä: purkauksen jättämä kaldera avautuu '
        + 'saariryhmän keskellä. Satelliittikuva 7.1.2023.',
      lahde: 'Sentinel Hub / Copernicus Sentinel -aineisto, Wikimedia '
        + 'Commons (CC BY 2.0)',
    },
  },
  {
    id: 'delfoi',
    nimi: 'Delfoi',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi oraakkelin vastaukset olivat niin moniselitteisiä?',
      'Kuka sai tulla kysymään neuvoa Delfoista?',
    ],
    korostukset: ['omfalos|Omfalos', 'Pythia'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Maailman napa',
    // 22,5013 E / 38,4823 N — en-Wikipedia "Delphi".
    laudat: {
      maailmankartta: { x: 6583.4, y: 1862.2 },
      europe: { x: 643.2, y: 881.5 },
    },
    teksti: 'Muinaiset kreikkalaiset pitivät Delfoita koko maailman '
      + 'keskipisteenä — paikkaa merkitsi Omfalos-kivi, "maailman napa". '
      + 'Täällä toimi Pythia, oraakkeli, jota kysyttiin tärkeistä '
      + 'päätöksistä kaikkialta antiikin maailmasta. Legendan mukaan nimi '
      + 'juontuu käärmeolento Delfynestä, jonka jumala Apollon surmasi. '
      + 'Pyhäkkö sijaitsee Parnassos-vuoren lounaisrinteellä ja on nykyään '
      + 'Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Delphi", johdanto-osa (tarkistettu 24.8.2026).',
    /*
     * Category:Ancient Delphi (80 tiedostoa) — paljas "Category:Delphi"
     * on olemassa mutta tyhjä (aineiston huomio 4).
     */
    kuva: {
      tiedosto: '"Als Mittelpunkt der Welt" galt Delphi für die Menschen der Antike. 01.jpg',
      selite: 'Delfoin pyhäkköalueen raunioita Parnassoksen rinteellä.',
      lahde: 'Holger Uwe Schmitt, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  /*
   * AKROPOLIS (omistajan tilaus v1119, kohta 19).
   *
   * ACROPOLISVIRTUALTOUR.GR JÄI POIS (omistajan päätös 26.8.2026):
   * Kreikan kulttuuriministeriön käyttöehdot (kohta 8) kieltävät
   * ministeriön sivujen lataamisen muiden sivustojen kehyksiin, vaikka
   * palvelin ei estä otsakkeilla — ja omistaja linjasi, ettei
   * kierrosta oteta, jos se ei aukea pelin sisällä. Pelin sisään
   * upotettavat kierrokset ovat Akropolis-museon kohteella alempana.
   *
   * 23,7261 E / 37,9715 N — en-Wikipedia "Acropolis of Athens"
   * (37°58′17″N 23°43′34″E). Sama piste kuin Ateenan kohtaamispisteellä
   * (js/packs/fokusvirta-ateena.js): Nikos työskentelee siellä.
   */
  {
    id: 'akropolis',
    nimi: 'Akropolis',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Parthenon rakennettiin juuri kalliolle?',
      'Mitä Akropoliilla tehtiin ennen temppeleitä?',
    ],
    korostukset: ['Parthenon|Parthenonin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kalliolinna, jonka voi kiertää itse',
    /*
     * Samat luvut kuin Ateenan kohtaamispisteellä
     * (js/packs/fokusvirta-ateena.js kohtaamispiste): sama kallio, sama
     * mittaus. Yksi paikka, ei kahta pyöristystä.
     */
    laudat: {
      maailmankartta: { x: 6624.2, y: 1881.9 },
      europe: { x: 666.7, y: 894.9 },
    },
    teksti: 'Akropolis on kalliolinna keskellä Ateenaa: 156 metrin '
      + 'kalkkikivikallio, jonka päällä seisovat Parthenonin, '
      + 'Erekhtheionin ja Athena Niken temppelit sekä Propylaia-portti. '
      + 'Nykyiset rakennukset pystytettiin 400-luvulla eaa. Perikleen '
      + 'aikana, mutta kalliolla oli asuttu ja rakennettu jo tuhansia '
      + 'vuosia aiemmin.',
    lahde: 'en-Wikipedia "Acropolis of Athens", johdanto-osa '
      + '(tarkistettu 26.8.2026).',
    kuva: {
      tiedosto: 'The Parthenon in Athens.jpg',
      selite: 'Parthenon Akropoliin kalliolla — temppeli valmistui '
        + 'vuonna 432 eaa.',
      lahde: 'Steve Swayne, Wikimedia Commons (CC BY 2.0)',
    },
    /*
     * PARTHENON LOISTOSSAAN (omistajan tilaus 26.8.2026, sarja
     * "loistoaika"). Valkoinen marmoriraunio on se, minkä pelaaja
     * tuntee; valmis temppeli oli katettu ja MAALATTU — "the decorative
     * stonework was originally coloured" (en-Wikipedia "Parthenon").
     * Havainnekuva näyttää sen. Vain kuvat-lista koskettaa tätä
     * lohkoa: koordinaatteihin EI saa koskea (rinnakkainen tutkinta).
     */
    kuvat: [
      {
        osoite: 'assets/kartat/ihmeet/parthenon-loistossaan.webp',
        selite: 'Havainnekuva: Parthenon ehjänä ja väreissään pian '
          + 'valmistumisensa jälkeen 432 eaa. Temppelin koristeveistokset '
          + 'olivat alun perin maalattuja — nykyinen valkoinen marmori on '
          + 'kahdenkymmenenviiden vuosisadan jälki.',
        lahde: 'Matkakirjan havainnekuva',
      },
    ],
  },
  /*
   * AKROPOLIS-MUSEO — MULTIMEDIAKOHDE KOLMELLA UPOTETTAVALLA
   * KIERROKSELLA (omistajan päätös 26.8.2026: acropolisvirtualtour.gr
   * jäi pois, koska sitä ei saa avata pelin sisällä; tilalle nämä
   * kolme, jotka saa).
   *
   * UPOTUS ON SEKÄ SALLITTU ETTÄ TARKOITETTU: osoitteet ovat Google
   * Arts & Culturen virallisia embed-päätepisteitä
   * (embed.culturalspot.org), jotka Akropolis-museo itse julkaisee
   * iframe-koodina omilla sivuillaan. Tekninen tarkistus 26.8.2026:
   * ei X-Frame-Options-otsaketta, CSP ilman frame-ancestorsia.
   * Museon OMA sivusto sen sijaan estää kehyksen (XFO: SAMEORIGIN),
   * siksi ulkoinen-linkit osoittavat sinne mutta upotus ei.
   *
   * Useampi kierros yhdellä kohteella: kenttä `kierrokset` (lista) —
   * js/fokuskohteet.js kohteenKierrokset piirtää napin jokaiselle.
   *
   * 23,7283 E / 37,9691 N — en-Wikipedia "Acropolis Museum". Museo on
   * Makrygiannin korttelissa kallion kaakkoispuolella, joten merkki
   * osuu Akropoliin merkin viereen — esityssiirto erottaa ne
   * (js/fokuskohteet.js eritteleKohdeRyhmat).
   */
  {
    id: 'akropolis-museo',
    nimi: 'Akropolis-museo',
    // multimedia -> kulttuuri 26.8.2026: kierrokset poistuivat (ks.
    // alempana), joten silmän "katsottavaa muualla" -lupaus poistui.
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi museon ylin kerros on vinossa muihin nähden?',
      'Mitä museon lattian lasin alta näkyy?',
    ],
    korostukset: ['Parthenon|Parthenonin'],
    nappi: 'Museo, jonka läpi näkee',
    laudat: {
      maailmankartta: { x: 6624.3, y: 1882.0 },
      europe: { x: 666.7, y: 895.0 },
    },
    teksti: 'Akropolis-museo avattiin vuonna 2009 kallion '
      + 'kaakkoispuolelle, ja se rakennettiin kokoamaan yhteen kaikki '
      + 'Akropoliilta ja sen rinteiltä löytynyt — yli 4 250 esinettä '
      + 'pronssikaudelta Bysantin aikaan. Rakennus seisoo pilarien '
      + 'varassa antiikin kaupunginosan raunioiden päällä, ja kaivaus '
      + 'näkyy lasilattioiden läpi. Ylin kerros on käännetty vinoon '
      + 'muuhun rakennukseen nähden: se seuraa Parthenonin suuntaa, ja '
      + 'temppelin veistokset on aseteltu saliin samaan järjestykseen '
      + 'ja samoin päin kuin ne olivat itse temppelissä, lasiseinien '
      + 'läpi tulevassa luonnonvalossa.',
    lahde: 'en-Wikipedia "Acropolis Museum" (johdanto ja osio "The '
      + 'building") — tarkistettu 26.8.2026.',
    /*
     * Commons 26.8.2026: 3254×4914, CC BY-SA 2.0, Carole Raddato,
     * Restrictions tyhjä. Katsottu silmin: Erekhtheionin alkuperäisiä
     * karyatideja museon salissa, ei ihmisiä. Aihe on antiikin
     * veistos, ei museon moderni rakennus (Kreikassa ei ole
     * panoraamavapautta uudelle arkkitehtuurille).
     */
    kuva: {
      tiedosto: 'Caryatids from the Erechtheion on the Acropolis, Acropolis Museum, Athens (13889706087).jpg',
      selite: 'Erekhtheionin alkuperäisiä karyatideja Akropolis-museon '
        + 'salissa.',
      lahde: 'Carole Raddato, Wikimedia Commons (CC BY-SA 2.0)',
    },
    /*
     * KIERROKSET POISTETTU (omistaja 26.8.2026 ilta: "Jos ei
     * mahdollista niin otetaan pois pelistä"): Google Arts &
     * Culture -upotukset eivät latautuneet pelin sisällä oikealla
     * iPadilla (varapolku laukesi joka kerta), vaikka palvelin
     * sallii kehystämisen — pelkkä ulos vievä linkki ei ansaitse
     * silmäsymbolin lupausta. Kierros-ikkuna (avaaKierros) jää
     * koodiin tulevia toimivia upotuksia ja livekameroita varten.
     * Poistetut osoitteet ovat git-historiassa (v1154).
     */
  },
  /*
   * ── SYMBOLITAKSONOMIAN ENSIMMÄINEN SISÄLTÖERÄ (omistaja 26.8.2026,
   *    Raamatun osio "Fokusmoodi", kohta SYMBOLITAKSONOMIA) ───────────
   *
   * Tästä alaspäin jokaisella kohteella on UUSI KENTTÄ `symboli`, jonka
   * arvo on taksonomian kategoria (urheilu, ruoka, merenkulku,
   * kulttuuri, sana, tekniikka…). Rinnakkainen työ piirtää symbolit
   * yhteiseen kirjastoon; tämä tiedosto kirjaa vain datan, ja ilman
   * piirtäjää kohde näkyy entiseen tapaan pisteenä (js/fokuskohteet.js
   * ei kaadu tuntemattomaan kenttään). Vanhoille kohteille kenttää EI
   * ole lisätty tässä erässä — se on oma, koko datan kattava päätös.
   *
   * Faktapohja: en-Wikipedia raakatekstinä (index.php?action=raw)
   * artikkeli kerrallaan 26.8.2026 — ei aiempaa työaineistoa, joten
   * lähderivit osoittavat suoraan artikkeleihin. Koordinaatit on
   * laskettu tiedoston alussa kuvatuilla kaavoilla, ja kaavat
   * VALIDOITIIN ennen käyttöä kahdella tässä tiedostossa jo olevalla
   * kohteella (Thessaloniki ja Santorini: lasketut luvut vastasivat
   * kirjattuja 0,1 yksikön tarkkuudella). Kuvat on valittu Commonsin
   * rajapinnalla (imageinfo: lisenssi, tekijä, Restrictions tyhjä) ja
   * katsottu silmin ~480 px:n leveydellä ennen kirjaamista.
   */
  {
    id: 'olympia',
    nimi: 'Olympia',
    tyyppi: 'muu',
    symboli: 'urheilu',
    kysymykset: [
      'Mitä lajeja antiikin kisoissa kilpailtiin?',
      'Miksi kisat aikanaan loppuivat?',
    ],
    korostukset: ['stadion'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei urheiluhistoria. */
    nappi: 'Kisat, jotka odottivat kaivajiaan',
    // 21,63 E / 37,63833 N — en-Wikipedia "Olympia, Greece" (37°38′18″N
    // 21°37′48″E).
    laudat: {
      maailmankartta: { x: 6554.3, y: 1894.8 },
      europe: { x: 626.5, y: 903.7 },
    },
    teksti: 'Antiikin olympialaiset käytiin Olympian pyhäkköalueella joka '
      + 'neljäs vuosi Zeuksen kunniaksi 700-luvulta eaa. aina 300-luvulle '
      + 'jaa., ja hänen temppelissään seisoi Feidiaan kullasta ja '
      + 'norsunluusta veistämä Zeus-patsas, yksi antiikin seitsemästä '
      + 'ihmeestä. Stadionin kentän pituudesta tuli kreikkalaisten '
      + 'matkamitta, stadion. Isoisän matkan aikaan rauniot olivat vielä '
      + 'suurelta osin kaivamatta: saksalaisten suurkaivaus alkoi 1875 ja '
      + 'kirjasi kaikkiaan 14 000 esinettä. Kisojen aate herätettiin '
      + 'henkiin 1894.',
    lahde: 'en-Wikipedia "Olympia, Greece", johdanto ja osio "1875–1881" '
      + '(tarkistettu 26.8.2026).',
    /*
     * Category:Stadium of Olympia. Commons 26.8.2026: 6240×4160,
     * CC BY 2.0, dronepicr, Restrictions tyhjä. Katsottu silmin:
     * stadionin kenttä lähtöviivoineen, ei ihmisiä, ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Ancient Olympia Stadium in Greece (51224128585).jpg',
      selite: 'Olympian antiikin stadion. Kentän pituudesta tuli '
        + 'mittayksikkö stadion.',
      lahde: 'dronepicr, Wikimedia Commons (CC BY 2.0)',
    },
    /*
     * ZEUKSEN PATSAS — KADONNUT IHME HAVAINNEKUVANA (omistajan tilaus
     * 26.8.2026: "peliin voisi generoida kaikki antiikin kadonneet
     * ihmeet"). Patsaasta ei ole yhtään kuvaa eikä kappaletta: sen
     * muoto tunnetaan vain antiikin kuvauksista ja kolikoista
     * (en-Wikipedia "Statue of Zeus at Olympia"). Kuva on siis pelin
     * OMA havainnekuva eikä valokuva mistään, ja selite sanoo sen
     * suoraan. Tiedosto syntyy .github/workflows/generoi-ihmeet.yml
     * -ajossa; siihen asti kuvapaikka jää tyhjänä pois (js/
     * fokuskohteet.js piirraKohdeKuva poistaa kehyksen).
     */
    kuvat: [
      {
        osoite: 'assets/kartat/ihmeet/zeuksen-patsas.webp',
        selite: 'Havainnekuva: Feidiaan Zeus-patsas temppelissään noin '
          + '435 eaa. Patsas oli 12,4 metriä korkea, kullasta ja '
          + 'norsunluusta, eikä siitä ole säilynyt palaakaan — muoto '
          + 'tunnetaan vain antiikin kuvauksista ja kolikoista.',
        lahde: 'Matkakirjan havainnekuva',
      },
    ],
  },
  {
    id: 'kalamata',
    nimi: 'Kalamata',
    tyyppi: 'kaupunki',
    symboli: 'ruoka',
    kysymykset: [
      'Kuinka vanhaksi oliivipuu voi elää?',
      'Miksi tuore oliivi ei kelpaa syötäväksi?',
    ],
    korostukset: ['Kalamon'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Oliivi, joka poimitaan käsin',
    // 22,11111 E / 37,03778 N — en-Wikipedia "Kalamata" (37°02′16″N
    // 22°06′40″E).
    laudat: {
      maailmankartta: { x: 6570.4, y: 1917.9 },
      europe: { x: 635.7, y: 919.5 },
    },
    teksti: 'Kalamata on antanut nimensä suurelle, tummanvioletille ja '
      + 'mantelinmuotoiselle pöytäoliiville, jota säilötään perinteisesti '
      + 'viinietikassa tai oliiviöljyssä. Lajiketta viljeltiin alun perin '
      + 'kaupungin ympäristössä Messeniassa ja naapurissa Lakoniassa. '
      + 'Kalamata-oliivia ei voi korjata vihreänä, ja se poimitaan käsin, '
      + 'jotta hedelmä ei kolhiinnu. EU:ssa nimi on suojattu: Kalamataksi '
      + 'saa kutsua vain seudun omia oliiveja, ja muualla kasvatetut '
      + 'myydään nimellä Kalamon.',
    lahde: 'en-Wikipedia "Kalamata olive", johdanto ja osiot "Description" '
      + 'ja "Preparation" (tarkistettu 26.8.2026).',
    /*
     * Category:Aceitunas Kalamata. Commons 26.8.2026: 3072×2304,
     * CC BY-SA 2.0, Michael Fielitz, Restrictions tyhjä. Katsottu
     * silmin: kulho Kalamata-oliiveja, ei ihmisiä, ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Kalamataolives.jpg',
      selite: 'Kalamata-oliiveja. Tummanvioletti hedelmä poimitaan '
        + 'käsin, jotta se ei kolhiinnu.',
      lahde: 'Michael Fielitz, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'ermoupoli',
    nimi: 'Ermoupoli',
    tyyppi: 'kaupunki',
    symboli: 'merenkulku',
    kysymykset: [
      'Mistä saarille paenneet ihmiset tulivat?',
      'Mitä telakoilla rakennetaan nykyään?',
    ],
    korostukset: ['Pireus'],
    /* Valintakuplan painike. Lupaus on 1873-kulma: satama oli tuolloin maan ykkönen. */
    nappi: 'Satama ennen Pireusta',
    // 24,91667 E / 37,43333 N — en-Wikipedia "Ermoupoli" (37°26′N 24°55′E).
    laudat: {
      maailmankartta: { x: 6663.9, y: 1902.7 },
      europe: { x: 689.6, y: 909.1 },
    },
    teksti: 'Hermeksen kaupungiksi nimetty Ermoupoli perustettiin Syroksen '
      + 'saarelle 1820-luvulla, kun vapaussodan pakolaiset muilta saarilta '
      + 'asettuivat sinne. Siitä kasvoi nopeasti Kreikan johtava kauppa- '
      + 'ja teollisuuskaupunki ja maan pääsatama: Kreikan höyrylaivayhtiö '
      + 'perustettiin täällä 1856, ja Syroksen telakoilta laskettiin '
      + 'vesille tuhansia laivoja. Vasta 1800-luvun lopulla Pireus ajoi '
      + 'kaupungin ohi, ja Ermoupoli jäi Kykladien hallintokeskukseksi.',
    lahde: 'en-Wikipedia "Ermoupoli", johdanto ja osio "History" '
      + '(tarkistettu 26.8.2026).',
    /*
     * Category:Ermoupoli. Commons 26.8.2026: 3888×2592, CC BY-SA 3.0,
     * Hans Peter Schaefer, Restrictions tyhjä. Katsottu silmin:
     * 1800-luvun kaupunki nousee satamasta rinteelle; rannassa vain
     * etäisiä, tunnistamattomia hahmoja, ei vesileimaa.
     */
    kuva: {
      tiedosto: 'Syros ermoupolis 140707.jpg',
      selite: 'Ermoupoli nousee satamasta rinteelle Syroksen saarella. '
        + 'Kaupunki oli 1800-luvulla Kreikan pääsatama.',
      lahde: 'Hans Peter Schaefer, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'epidauros',
    nimi: 'Epidauros',
    tyyppi: 'muu',
    symboli: 'kulttuuri',
    kysymykset: [
      'Miten sairaita hoidettiin Asklepioksen pyhäkössä?',
      'Mitä näytelmiä teatterissa esitetään nykyään?',
    ],
    korostukset: ['Asklepios|Asklepioksen'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Teatteri 14 000 kuulijalle',
    // 23,07444 E / 37,59778 N — en-Wikipedia "Epidaurus" (37°35′52″N
    // 23°04′28″E).
    laudat: {
      maailmankartta: { x: 6602.5, y: 1896.4 },
      europe: { x: 654.2, y: 904.8 },
    },
    teksti: 'Epidauroksen teatteri rakennettiin 300-luvulla eaa. '
      + 'parantajajumala Asklepioksen pyhäkön vaurastuttua, ja Polykleitos '
      + 'nuoremman suunnittelemaan katsomoon mahtuu jopa 14 000 katsojaa. '
      + 'Teatteri on kuulu akustiikastaan, jolle on mitattu selityskin: '
      + 'kalkkikiviset istuinrivit suodattavat yleisön matalaa huminaa ja '
      + 'vahvistavat näyttämön korkeita ääniä. Roomalaiset jatkoivat '
      + 'katsomoa 21 rivillä, ja antiikin näytelmiä esitetään samoilla '
      + 'penkeillä yhä.',
    lahde: 'en-Wikipedia "Epidaurus", johdanto ja osio "The great theatre" '
      + '(tarkistettu 26.8.2026).',
    /*
     * Category:Theatre of Epidaurus. Commons 26.8.2026: 2816×2112,
     * CC BY-SA 4.0, Nicholas Hartmann, Restrictions tyhjä. Katsottu
     * silmin: koko katsomo ylhäältä; kentällä vain etäisiä,
     * tunnistamattomia hahmoja, ei vesileimaa.
     */
    kuva: {
      tiedosto: '2007 Greece Epidavros theater.jpg',
      selite: 'Epidauroksen teatterin katsomo. Kalkkikiviset istuinrivit '
        + 'ovat osa sen kuuluisaa akustiikkaa.',
      lahde: 'Nicholas Hartmann, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'marathon',
    nimi: 'Marathon',
    tyyppi: 'kaupunki',
    symboli: 'sana',
    kysymykset: [
      'Kuinka pitkä nykyinen maratonmatka on ja miksi?',
      'Miten alivoimainen armeija voitti?',
    ],
    korostukset: ['fenkoli|fenkolia'],
    /* Valintakuplan painike. Lupaus on sanan tarina. */
    nappi: 'Juoksu, josta laji sai nimen',
    // 23,96194 E / 38,15333 N — en-Wikipedia "Marathon, Greece"
    // (38°9′12″N 23°57′43″E).
    laudat: {
      maailmankartta: { x: 6632.1, y: 1874.9 },
      europe: { x: 671.3, y: 890.2 },
    },
    teksti: 'Marathonin tasangolla Ateenan alivoimainen armeija löi '
      + 'Persian suurvallan joukot 490 eaa. Tarun mukaan airut '
      + 'Feidippides juoksi taistelukentältä Ateenaan asti ilmoittamaan '
      + 'voitosta — ja tästä legendasta maratonjuoksu sai uudella ajalla '
      + 'nimensä. Itse paikannimi on arkisempi: se tulee fenkolia '
      + 'tarkoittavasta kreikan sanasta ja merkitsee "fenkolien paikkaa". '
      + 'Tasangolla kohoaa yhä Soros, kumpuhauta taistelussa kaatuneille '
      + '192 ateenalaiselle.',
    lahde: 'en-Wikipedia "Marathon, Greece", johdanto, osio "History" ja '
      + 'kohta "Points of interest" (tarkistettu 26.8.2026).',
    /*
     * Category:Soros. Commons 26.8.2026: 4000×3000, CC BY-SA 4.0,
     * Tomisti, Restrictions tyhjä. Katsottu silmin: kumpu selvästi
     * keskellä kuvaa avoimella tasangolla, ei ihmisiä, ei vesileimaa.
     * Saman kuvaajan kaksi muuta kumpukuvaa hylättiin, koska niissä
     * kumpu jää puiden taakse.
     */
    kuva: {
      tiedosto: 'Marathon Tomb of the Athenians 1.jpg',
      selite: 'Soros, kaatuneiden ateenalaisten kumpuhauta Marathonin '
        + 'tasangolla.',
      lahde: 'Tomisti, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'antikythera',
    nimi: 'Antikythera',
    tyyppi: 'saari',
    symboli: 'tekniikka',
    kysymykset: [
      'Kuka laitteen rakensi ja missä?',
      'Mitä muuta hylystä nostettiin?',
    ],
    korostukset: ['analogiatietokone'],
    /* Valintakuplan painike. Lupaus on koneen mahdottomuus omaan aikaansa. */
    nappi: 'Kone väärältä vuosituhannelta',
    // 23,3 E / 35,86667 N — en-Wikipedia "Antikythera" (35°52′N 23°18′E).
    laudat: {
      maailmankartta: { x: 6610.0, y: 1962.6 },
      europe: { x: 658.6, y: 950.3 },
    },
    /*
     * AJOITUS ON KOHTEEN YDIN: isoisän matkan aikaan 1873 hylkyä ei
     * ollut löydetty — Symin sienisukeltajat osuivat siihen vasta 1900.
     * Teksti sanoo tämän itse, jottei kohde vihjaa isoisän tienneen
     * asiasta mitään.
     */
    teksti: 'Symin sienisukeltajat löysivät Antikytheran edustalta '
      + 'roomalaisen rahtilaivan hylyn vuonna 1900 — isoisän aikaan meri '
      + 'piti salaisuutensa vielä visusti. Nostetun lastin joukosta '
      + 'paljastui pronssinen laite, Antikytheran mekanismi: 100-luvulla '
      + 'eaa. rakennettu käsikäyttöinen taivaankoneisto ja vanhin tunnettu '
      + 'analogiatietokone, joka ennusti taivaankappaleiden asemat ja '
      + 'pimennykset vuosikymmeniksi eteenpäin. Suurimmassa rattaassa oli '
      + '223 hammasta. Yhtä monimutkaisia koneita tehtiin seuraavan '
      + 'kerran vasta 1300-luvun Euroopassa.',
    lahde: 'en-Wikipedia "Antikythera mechanism", johdanto ja osio '
      + '"Discovery"; saaren koordinaatit en-Wikipedia "Antikythera" '
      + '(tarkistettu 26.8.2026).',
    /*
     * Category:Antikythera mechanism in the National Archaeological
     * Museum of Athens. Commons 26.8.2026: 4478×2985, CC BY-SA 4.0,
     * Zde (sama kuvaaja kuin Varnan kulta-aarteessa), Restrictions
     * tyhjä. Katsottu silmin: mekanismin kappale vitriinissä ja
     * hammasratas näkyvissä, ei ihmisiä, ei vesileimaa. Selite ei
     * väitä kappaletta suurimmaksi — kuvaajan oma kuvaus ei kerro,
     * mikä 82 kappaleesta on kyseessä.
     */
    kuva: {
      tiedosto: 'Mechanism of Antikythera, 150-100 BC, NAMA, 191434.jpg',
      selite: 'Antikytheran mekanismin kappaleita Ateenan kansallisessa '
        + 'arkeologisessa museossa.',
      lahde: 'Zde, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  /*
   * ── ENTISET TÄKYNOSTOT NORMAALEINA KOHTEINA (omistaja 26.8.2026
   *    ilta: *"Täkyjä josta tulee puhekupla pitää olla vain yksi per
   *    maa. Kaikki muut normaaleita. … Kreikassa vielä useampi."*) ────
   *
   * Kreikan täkypoolissa oli viisi nostoa, joista kartalle nousi kupla
   * ja neljä täkysymbolia. Poolissa on nyt tasan yksi (js/fokusnosto.js
   * NOSTO_MAAT.GRC), ja loput ovat tässä kartan tavallisina kohteina.
   *
   * MITÄÄN EI OLE KIRJOITETTU UUDELLEEN. Otsikko, leipäteksti, kuva,
   * kuvan lähde, lähderivi, symbolikategoria ja laudan koordinaatit ovat
   * sanasta sanaan ne, jotka nostoilla oli — vain kenttien nimet
   * vaihtuivat noston muodosta kohteen muotoon (`otsikko` → `nappi`,
   * `paikka.laudat` → `laudat`). Perustelut valinnoista, kuvien
   * Commons-tarkistukset ja paikkojen asteluvut olivat noston omissa
   * kommenteissa, ja ne ovat mukana tässä.
   *
   * KAKSI NOSTOA JÄI POIS KOKONAAN, koska niiden paikalla on jo kartan
   * oma kohde eikä kahta merkkiä samaan pisteeseen tehdä:
   *   - "Kokonainen kylä istui oraakkelin päällä" osoitti kentällään
   *     `kohde: 'delfoi'` suoraan tämän tiedoston kohteeseen `delfoi`;
   *   - Antikytheran sukeltajanosto oli täsmälleen samassa pisteessä
   *     (6610,0 / 1962,6) kuin tämän tiedoston kohde `antikythera`,
   *     ja sillä oli sama tunnuskin.
   * Kummankin lunastusteksti on tallessa git-historiassa (v1143:n
   * js/fokusnosto.js) siltä varalta, että päätoimittaja haluaa sulattaa
   * niistä jotain olemassa olevien kohteiden teksteihin.
   */
  {
    /*
     * ELÄINTÄKY 1 — PIKKUPÖLLÖ (entinen nosto `pikkupollo`).
     *
     * Faktat en-Wikipediasta, ei yhtään väitettä sen yli: laji elää
     * Kreikassa (mm. alalaji A. n. indigena), pöllö oli Ateenan
     * hopearahan kuva, ja sanonta pöllöjen viemisestä Ateenaan
     * tarkoitti nimenomaan sitä kolikkoa. Akropoliin nykyesiintymistä
     * EI väitetä mitään — sellaista lähdettä ei ole.
     *
     * PÖLLÖN OMA HEITTO on tekstin viimeinen lause. Se on noston omaa,
     * hyväksyttyä tekstiä eikä sitä ole muutettu tässä siirrossa; jos
     * kartan tietoruudun neutraali ääni (ks. tiedoston alku) vaatii sen
     * pois, poisto on päätoimittajan tekstipäätös eikä siirron.
     */
    id: 'pikkupollo',
    nimi: 'Pikkupöllö',
    tyyppi: 'muu',
    symboli: 'elain',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Ateena löi tunnuksensa hopeaan — mallina 22-senttinen lintu, '
      + 'joka tuijottaa yhä takaisin',
    /*
     * Samos, 26,83333 E / 37,75 N — en-Wikipedia "Samos". Kuvan lintu
     * on juuri sieltä (Commonsin oma tiedostokuvaus), ja saari on
     * lehden ikkunan sisällä, 104 yksikön päässä Ateenasta.
     */
    laudat: {
      maailmankartta: { x: 6727.8, y: 1890.5 },
      europe: { x: 726.4, y: 900.8 },
    },
    teksti: 'Athenen pyhä lintu ei ole vertauskuva vaan laji. Pikkupöllö '
      + '(Athene noctua) on noin 22 senttiä pitkä, siipiväli 56 senttiä ja '
      + 'paino noin 180 grammaa; keltaiset silmät ja valkeat kulmajuovat '
      + 'antavat sille ainaisen tuiman ilmeen. Suku sai nimensä '
      + 'jumalattaresta ja lajinimi noctua Minervalle pyhitetystä pöllöstä. '
      + 'Lintu on osittain päiväaktiivinen ja istuu usein näkyvällä paikalla '
      + 'keskellä päivää; se viihtyy raunioiden, louhosten ja '
      + 'kalliopaljastumien liepeillä, ja kanta on yhä elinvoimainen.\n\n'
      + 'Kaupunki teki linnusta rahansa. Vuoden 500 eaa. tetradrakmassa '
      + 'pöllö istuu oliivinoksa vierellään, ja 510 eaa. jälkeen pöllöstä '
      + 'tuli Ateenan hopearahan vakiokuva; kolikkoa kutsuttiin antiikin '
      + 'maailmassa yksinkertaisesti nimellä glaux, pikkupöllö. Aristofanes '
      + 'pani Linnuissa ja Lysistratessa merkille, kuinka paljon näitä '
      + 'lintuja seudulla oli. Sanonta pöllöjen viemisestä Ateenaan '
      + 'tarkoitti kolikkoa ja oli turhan työn vertaus — sama kuin hiilien '
      + 'kantaminen Newcastleen. Kopio samasta kolikosta on nykyisin '
      + 'Kreikan yhden euron rahassa.\n\n'
      + 'Kahdessatuhannessa vuodessa laji ei ole muuttanut ilmettään '
      + 'senttiäkään. En sano tästä enempää, jottei kukaan luulisi minun '
      + 'kehuvan sukuani.',
    lahde: 'en-Wikipedia "Little owl" (osiot "Taxonomy", "Description", '
      + '"Distribution and habitat", "Status" ja "In human culture"), '
      + '"Owl of Athena" (osio "Ancient Greece") ja "Owls to Athens" '
      + '(osio "Title") — tarkistettu 26.8.2026.',
    /*
     * Commons 26.8.2026: 2613×1742, CC0, Hobbyfotowiki, kuvattu
     * 19.9.2024, kuvaus "little owl (Athene noctua), Greece, island of
     * Samos", Restrictions tyhjä. Katsottu silmin: terävä, edestä
     * kuvattu villi lintu kivirakenteen aukossa, ei rengasta, ei
     * häkkiä, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Little owl (Athene noctua),.jpg',
      selite: 'Pikkupöllö Samoksella. Laji on osittain päiväaktiivinen ja '
        + 'istuu usein näkyvillä keskellä päivää.',
      lahde: 'Hobbyfotowiki, Wikimedia Commons (CC0)',
    },
  },
  {
    /*
     * ELÄINTÄKY 2 — REUNUSKILPIKONNA (entinen nosto `reunuskilpikonna`).
     *
     * Alkuperäinen tilaus oli Filopappoksen kukkula, mutta lähdettä
     * lajin esiintymiselle juuri sillä kukkulalla ei ole: en-Wikipedia
     * kertoo levinneisyyden maan tasolla (Peloponnesokselta
     * Olympokselle) eikä Filopappos-artikkeli mainitse lajia
     * lainkaan. Teksti pysyy siksi siinä, minkä lähde kattaa, ja
     * paikka on se saari, jolla kuvan yksilö kohdattiin.
     */
    id: 'reunuskilpikonna',
    nimi: 'Reunuskilpikonna',
    tyyppi: 'muu',
    symboli: 'elain',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Maa oli liian kova pesäkuopalle — naaras kasteli sen itse ja '
      + 'polki jäljet umpeen',
    /*
     * Euboia (Evia), 24,0 E / 38,5 N — en-Wikipedia "Euboea". Saari on
     * 22 yksikön päässä Ateenasta eli suunnilleen yhtä kaukana kuin
     * Korintin kanavan oma merkki, ja kuvan kilpikonna tavattiin
     * siellä.
     */
    laudat: {
      maailmankartta: { x: 6633.3, y: 1861.5 },
      europe: { x: 672.0, y: 881.1 },
    },
    teksti: 'Euroopan suurin kilpikonna on kreikkalainen. Reunuskilpikonna '
      + '(Testudo marginata) kasvaa 35-senttiseksi ja viisikiloiseksi, ja se '
      + 'on kotoperäinen Kreikassa, Italiassa ja Balkanilla. Luontainen '
      + 'levinneisyys kulkee Etelä-Kreikassa Peloponnesokselta '
      + 'Olympokselle, ja vuorilla laji nousee jopa 1 600 metriin. Nimensä '
      + 'se on saanut kilven takareunasta, joka levenee ulospäin kuin '
      + 'kellon helma.\n\n'
      + 'Aikuisen kilpi on lähes musta, ja vuoristossa se on etu: tumma '
      + 'pinta imee lämmön nopeasti. Aamulla kilpikonna paistattelee '
      + 'auringossa nostaakseen ruumiinlämpönsä ja lähtee vasta sitten '
      + 'ruokailemaan; keskipäivän kuumuudeksi se vetäytyy suojaan ja tulee '
      + 'ulos taas iltapäivällä.\n\n'
      + 'Munat tulevat touko–kesäkuussa kuoppaan, jonka naaras kaivaa '
      + 'takajaloillaan vuorotellen ja jonka syvyyden määrää jalkojen '
      + 'pituus. Jos maa on kaivettavaksi liian kovaa, naaras pehmittää sen '
      + 'peräaukkorauhasensa vedellä. Lopuksi hän tallaa kuopan suun '
      + 'umpeen, kunnes maa on yhtä kovaa kuin ennenkin — pesää ei löydä '
      + 'kukaan. Munia on kerralla noin viisitoista, ja kuoriutumiseen '
      + 'menee luonnossa noin sata päivää.',
    lahde: 'en-Wikipedia "Marginated tortoise", osiot "Description", '
      + '"Distribution and habitat" ja "Reproduction" (tarkistettu '
      + '26.8.2026).',
    /*
     * Commons 26.8.2026: 2816×2112, CC BY-SA 4.0, kernpanik, kuvattu
     * 16.4.2017, kuvaus "Testudo marginata on Evia (Euboea) island,
     * Greece", Restrictions tyhjä. Katsottu silmin: villi yksilö
     * maastossa, lähikuva päästä ja etujaloista, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Testudo marginata on Evia (Euboea) island, Greece.jpg',
      selite: 'Reunuskilpikonna Euboian saarella. Raajojen etupuolta '
        + 'peittävät suuret suomut, ja aikuisen kilpi on lähes musta.',
      lahde: 'kernpanik, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  /*
   * ── KADONNEET IHMEET JA LOISTOAIKA (omistajan tilaus 26.8.2026:
   *    "peliin voisi generoida kaikki antiikin kadonneet ihmeet sekä
   *    jos on muita vastaavia kadonneita, niin generoidaan ne kaikki"
   *    + Hefaistoksen temppelistä: "tämäkin olisi mielenkiintoinen
   *    nähdä generoituna") ────────────────────────────────────────────
   *
   * Näiden kohteiden ainoa kuva on PELIN OMA HAVAINNEKUVA
   * (assets/kartat/ihmeet/, generointi .github/workflows/
   * generoi-ihmeet.yml). Se on tietoinen poikkeus talon kuvasääntöön:
   * kohteesta ei ole valokuvaa, koska kohdetta ei ole. Kaksi ehtoa,
   * joista kumpaakaan ei saa purkaa:
   *
   *   1. SELITE SANOO SEN AINA. Jokainen selite alkaa sanalla
   *      "Havainnekuva" ja kertoo, mihin muoto perustuu — kolikkoon,
   *      kaivauspiirrokseen, antiikin kuvaukseen. Pelaaja ei saa
   *      luulla katsovansa valokuvaa.
   *   2. LÄHDERIVI ON 'Matkakirjan havainnekuva'. Ei tekijää, ei
   *      lisenssiä, koska kuva ei ole kenenkään muun.
   *
   * Kuvakenttä on `osoite` eikä `tiedosto`: polku on repossa eikä
   * Commonsissa (js/fokuskohteet.js kohdeKuvaOsoite). Ennen
   * kuvaerän ajoa tiedostoa ei ole, ja kohde toimii silti — puuttuva
   * kuva poistaa vain kuvapaikan.
   *
   * NÄITÄ EI OLE NOSTETTU YHDENKÄÄN KAUPUNGIN VIRTAAN. Jos joku
   * nostetaan, `nappi`-rivi on valmiina — mutta fokusvirran pinnikuva
   * lukee yhä `kuva.tiedosto`-kenttää (js/fokusvirta.js piirraPinni),
   * joten `osoite`-tuki on lisättävä sinne samalla.
   */
  {
    /*
     * RODOKSEN KOLOSSI. 28,2167 E / 36,4333 N — en-Wikipedia
     * "Rhodes (city)" (36°26′N 28°13′E). Patsaan oma paikka on
     * kiistanalainen ("the actual location of the original monument
     * remains in dispute"), joten merkki on kaupungissa eikä
     * satamansuulla: väärään kohtaan piirretty täsmäpiste väittäisi
     * enemmän kuin lähde.
     */
    id: 'rodoksen-kolossi',
    nimi: 'Rodoksen kolossi',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miten noin iso pronssipatsas ylipäätään rakennettiin?',
      'Miksi rodoslaiset eivät rakentaneet sitä uudelleen?',
    ],
    korostukset: ['Helios|Helioksesta', 'Delfoin oraakkeli|Delfoin oraakkelin'],
    nappi: 'Jättiläinen, joka seisoi vain 54 vuotta',
    laudat: {
      maailmankartta: { x: 6773.9, y: 1941.0 },
      europe: { x: 753.0, y: 935.4 },
    },
    teksti: 'Rodoksen kaupunkiin pystytettiin vuonna 280 eaa. pronssinen '
      + 'patsas auringonjumala Helioksesta. Sen teki Khares Lindoslainen '
      + 'juhlistamaan sitä, että saari oli kestänyt Demetrios '
      + 'Makedonialaisen vuoden mittaisen piirityksen. Patsas oli noin 33 '
      + 'metriä korkea — antiikin maailman korkein — ja se kuului '
      + 'seitsemään ihmeeseen. Maanjäristys kaatoi sen jo 226 eaa., ja '
      + 'Delfoin oraakkelin neuvosta rodoslaiset jättivät sen '
      + 'rakentamatta uudelleen. Palaset makasivat maassa vuosisatoja, '
      + 'kunnes ne vuonna 653 myytiin pois. Patsaan tarkasta paikasta '
      + 'kiistellään yhä.',
    lahde: 'en-Wikipedia "Colossus of Rhodes", johdanto-osa (tarkistettu '
      + '26.8.2026); koordinaatit en-Wikipedia "Rhodes (city)".',
    kuva: {
      osoite: 'assets/kartat/ihmeet/rodoksen-kolossi.webp',
      selite: 'Havainnekuva: Helioksen pronssipatsas Rodoksen sataman '
        + 'yllä 200-luvulla eaa. Patsaasta ei ole säilynyt palaakaan '
        + 'eikä yhtään aikalaiskuvaa — koko, aihe ja seppelekruunu '
        + 'ovat antiikin kirjoittajien kuvauksista.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
  {
    /*
     * KNOSSOS. 25,16306 E / 35,29806 N — en-Wikipedia "Knossos"
     * (35°17′53″N 25°9′47″E). Kohde on 1,6 lautayksikön päässä
     * Iraklionin kohteesta (6671,1 / 1982,5), eli merkit menevät
     * päällekkäin ja esityssiirto erottaa ne (js/fokuskohteet.js
     * eritteleKohdeRyhmat) — data pysyy oikeassa paikassa.
     * Iraklionin kohde kertoo kaupungista ja mainitsee palatsin; tämä
     * kertoo itse palatsista ja siitä, miltä se näytti käytössä.
     */
    id: 'knossos',
    nimi: 'Knossoksen palatsi',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Mihin palatsin valtavia saviruukkuja käytettiin?',
      'Miksi palatsi tuhoutui?',
    ],
    korostukset: ['minolainen|minolaisen', 'pithos|pithos-ruukkuja'],
    nappi: 'Palatsi, joka nukkui maan alla isoisän ohi',
    laudat: {
      maailmankartta: { x: 6672.1, y: 1984.1 },
      europe: { x: 694.3, y: 965.3 },
    },
    teksti: 'Knossos on minolaisen kulttuurin suurin keskus ja usein '
      + 'Euroopan vanhimmaksi kaupungiksi kutsuttu paikka: kukkulaa on '
      + 'asuttu noin vuodesta 7000 eaa., ensimmäinen palatsi nousi noin '
      + '1900 eaa. ja lopullinen tuhoutui noin 1350 eaa. Palatsi oli '
      + 'noin 14 000 neliömetriä — sokkeloinen rypäs pihoja, portaikkoja '
      + 'ja varastoja, joissa seisoi ihmisen kokoisia pithos-ruukkuja. '
      + 'Isoisäsi matkan aikaan siitä ei näkynyt maan päälle mitään: '
      + 'ensimmäiset kaivaukset teki iraklionilainen kauppias ja '
      + 'muinaistutkija Minos Kalokairinos vasta 1878–1879 omalla '
      + 'maallaan.',
    lahde: 'en-Wikipedia "Knossos", johdanto, tietolaatikko ja osio '
      + '"Excavation" (tarkistettu 26.8.2026).',
    kuva: {
      osoite: 'assets/kartat/ihmeet/knossos-loistossaan.webp',
      selite: 'Havainnekuva: Knossoksen palatsin keskuspiha käytössä '
        + 'noin 1500 eaa. Punaiset ylöspäin levenevät pylväät ja '
        + 'seinämaalaukset tunnetaan kaivausten löydöistä; katot ja '
        + 'yläkerrat ovat tulkintaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
  {
    /*
     * ANTIIKIN AGORA. 23,7225 E / 23°43′21″E, 37,975 N / 37°58′30″N —
     * en-Wikipedia "Ancient Agora of Athens". Merkki osuu Akropoliin
     * ja Akropolis-museon viereen (kaikki kolme samassa 0,3
     * lautayksikön ryppäässä); esityssiirto erottaa ne.
     *
     * HUOM: akropolis-lohkon koordinaatteihin EI ole koskettu.
     */
    id: 'antiikin-agora',
    nimi: 'Antiikin agora',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Mitä agoralla tehtiin tavallisena päivänä?',
      'Miksi juuri Hefaistoksen temppeli säilyi näin ehjänä?',
    ],
    korostukset: ['agora', 'Hefaistoksen temppeli'],
    nappi: 'Tori, jonka päällä asuttiin vielä 1873',
    laudat: {
      maailmankartta: { x: 6624.1, y: 1881.8 },
      europe: { x: 666.7, y: 894.9 },
    },
    teksti: 'Akropoliin luoteispuolella, Areiopagin ja Agoraios Kolonos '
      + '-kukkulan välissä, oli antiikin Ateenan agora: kaupungin tori, '
      + 'kokouspaikka ja sydän 500-luvulta eaa. alkaen. Kukkulan päällä '
      + 'seisoo Hefaistoksen temppeli, joka valmistui 449–415 eaa. ja on '
      + 'säilynyt lähes ehjänä — syy on sen katkeamaton käyttö: 600-luvulta '
      + 'vuoteen 1834 se oli Pyhän Yrjön kreikkalaiskatolinen kirkko. '
      + 'Isoisäsi matkan aikaan agoran päällä oli tavallinen ateenalainen '
      + 'asuinkortteli; alue kaivettiin esiin vasta vuodesta 1931 alkaen.',
    lahde: 'en-Wikipedia "Ancient Agora of Athens" (johdanto ja '
      + 'tietolaatikko) sekä "Temple of Hephaestus" (johdanto ja '
      + 'tietolaatikko) — tarkistettu 26.8.2026.',
    kuva: {
      osoite: 'assets/kartat/ihmeet/hefaistoksen-temppeli.webp',
      selite: 'Havainnekuva: Hefaistoksen temppeli maalattuna loistonsa '
        + 'aikaan 400-luvulla eaa. Doorilainen marmoritemppeli seisoo yhä '
        + 'agoran laidalla, mutta värit ovat kuluneet pois — nämä '
        + 'noudattavat antiikin temppelien tunnettua väritystapaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
];

const TUNNUKSITTAIN = new Map(FOKUSKOHTEET_GRC.map((k) => [k.id, k]));

/**
 * Poimii kohteet tunnuksilla siinä järjestyksessä kuin ne on pyydetty.
 * Tuntematon tunnus jätetään pois hiljaa — kirjoitusvirhe listassa ei
 * saa kaataa koko kaupungin virtaa.
 */
export function fokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => TUNNUKSITTAIN.get(id)).filter(Boolean);
}
