/*
 * FOKUSKOHTEET — ITALIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-bgr.js:lle ja
 * js/packs/fokuskohteet-grc.js:lle, ja niiden rakenne on kopioitu tähän
 * sellaisenaan: SAMA LISTA palvelee kahta pintaa, kohdenostoa
 * fokusvirrassa (js/fokusvirta.js poimii kohteita tunnuksilla, pöllö
 * puhuu `teksti`-kentän kuplasta, painikkeen lupaus on `nappi`) ja
 * kartan klikattavaa pop-upia (js/fokuskohteet.js lukee `nimi`,
 * `tyyppi`, `kuva`, `teksti` ja `lahde`). Kentät ja niiden perustelut on
 * selitetty Kreikan tiedoston alussa; tässä on vain se, mikä Italiassa
 * on toisin.
 *
 * KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026) on nekin
 * kuvattu Kreikan tiedoston alussa: `kysymykset` on kaksi valmista,
 * pelaajan äänellä kirjoitettua kysymystä kartan tietoruudun loppuun,
 * ja `korostukset` on lista sanoista, jotka alleviivataan
 * leipätekstistä ja joista pöllö kertoo lisää ('perusmuoto|näkyvä
 * muoto', jos taivutus eroaa). Italiassa pätee sama sääntö kuin
 * muualla: kysymys ei toista sitä, minkä teksti jo kertoo.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-italia.md, kohteet 1–14
 * samassa järjestyksessä kuin aineistossa. Aineiston pop-up-tekstit on
 * siirretty tänne sellaisinaan: yhtään faktaa ei ole lisätty eikä
 * muutettu. Ajatusviivat on kirjoitettu talon tapaan pitkinä (—), mikä
 * ei kosketa yhtäkään väitettä.
 *
 * AINEISTON OMAT RAJAUKSET ON NOUDATETTU KOHDITTAIN:
 *   - Napoli (kohde 3): artikkeli sanoo kahdessa kohdassa eri asian
 *     ("oldest opera house in Italy" / "oldest working theatre in
 *     Europe"); tekstissä on aineiston määräämä turvallinen muoto.
 *   - Pompeji (kohde 2): ikäsopivuus. Teksti kertoo menetelmästä ja
 *     tutkijasta, ei kuolinhetkistä, ja kuvaksi on valittu Forum eikä
 *     uhrivalu — aineiston oma ohje.
 *   - Capri (kohde 5): Tiberiukseen liitetyt antiikin huhut EIVÄT ole
 *     mukana (aineiston ikäsopivuusrajaus).
 *   - Sardinia (kohde 14): nuraghejen tarkkaa lukumäärää ei ole
 *     tarkistettu, joten tekstissä lukee "kivitorneja ympäri saarta".
 *   - Pisa (kohde 4): Galileon kanuunankuulakoe on lähteen mukaan
 *     perimätietoa, joten sitä EI ole tekstissä lainkaan.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Italia oli isoisän matkavuonna 1873 kaksitoista vuotta vanha valtio,
 * ja Rooma oli ollut sen pääkaupunki vasta kaksi vuotta. Aineisto
 * merkitsee kolme kohtaa, joissa vuosiluku osuu päiväkirjan vuoteen tai
 * sen viereen: Vesuvius purkautui 1872, Pompejin oma museo rakennettiin
 * 1873–1874, ja Torinon Mole Antonelliana oli 1873 vielä työmaa. Nämä
 * ovat aineiston omia havaintoja, ja ne on säilytetty teksteissä.
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Sama kaksi kaavaa ja samat vakiot kuin Bulgariassa ja Kreikassa,
 * koska Rooma on pelattavissa kummallakin laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *     Tarkistus: Rooma 12,4964 E / 41,9028 N → 6249,9 / 1727,5, ja
 *     laudalla laatta on kohdassa 6249,7 / 1728,1 (js/packs/
 *     maailmankartta.js) — 0,6 yksikön osumatarkkuus, sama luokka kuin
 *     Bulgarian tarkistuksessa.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Rooma → 451,1 / 791,6, laudalla
 *     451 / 792.
 *
 * KARKEAT YLEISPISTEET (aineiston omat merkinnät) on merkitty
 * kohteittain: Sardinian koordinaatti on saaren likimääräinen
 * keskipiste, Po osoittaa joen suulle Adrianmerellä eikä koko uomalle,
 * Dolomiittien ja Cinque Terren luvut ovat alueen keskipisteitä, ja
 * Materan koordinaatti on otettu Sassi di Matera -artikkelista, koska
 * kaupungin omaa koordinaattia ei saatu rajapinnasta. Kartalla nämä
 * ovat oikeita paikkoja alueen nimeämiselle; täsmäpaikkoja niistä ei
 * saa tehdä.
 *
 * ETNALLA ON JO MERKKI LAUDALLA. js/packs/europe.js piirtää
 * tulivuorimerkin kohtaan (498, 924) Sisilian kaakkoispuolelle, ja
 * aineisto (kohde 9) huomauttaa, että merkki ja kohde on syytä sitoa
 * yhteen, ettei synny kahta eri Etnaa. Tämän kohteen europe-piste on
 * (499,1 / 900,6) eli saman vuoren oma koordinaatti — merkin viereen,
 * ei toiseen paikkaan. Laudan oman merkin siirtäminen kuuluu europe.js:n
 * omistajalle, ei tähän pakettiin.
 *
 * ── TYYPIT ─────────────────────────────────────────────────────────
 *
 * js/fokuskohteet.js tuntee kuusi tyyppiä (kaupunki, vuori, meri,
 * saari, joki, muu), eikä tämä paketti saanut koskea siihen tiedostoon.
 * Siksi kaksi tyyppiä on jouduttu sovittamaan: tulivuoret (Vesuvius,
 * Etna) ovat 'vuori', ja Comojärvi, Pompeji ja Cinque Terre ovat 'muu'
 * eli tietoruudun ylärivillä "Kartalla". Järvityyppi olisi oma
 * lisäyksensä js/fokuskohteet.js:ään — ks. tiedoston raportti.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, ja jokainen niistä on aineiston itsensä
 * TIEDOSTOTASOLLA tarkistama: olemassaolo, koko, lisenssi ja tekijä on
 * kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (aineiston osio
 * "Tarkistustapa") — ei arvattuja nimiä. Kaikki ovat PD, CC0 tai CC BY /
 * CC BY-SA, ja tekijä on `lahde`-rivillä, koska CC BY vaatii maininnan.
 * Tässä paketissa ei ole yhtään kuvaa, jota aineisto ei nimeä.
 */

/**
 * Italian fokuskohteet: aineiston 14 kohdetta samassa järjestyksessä
 * kuin docs/mantereet-tyoaineisto/fokuskohteet-italia.md.
 *
 * Yksikään ei ole pelilaatta: Venetsia, Firenze, Rooma ja Sisilia
 * puuttuvat listalta tarkoituksella (aineiston osio "Italian pelilaatat
 * — mitä kartalla JO on"). Etna on mukana omanaan, koska se on eri asia
 * kuin Sisilia-laatta.
 *
 * Aineiston 14 kohteen perässä on 15. kohde omana eränään: Forum
 * Romanum, Matkakirjan ihmeiden Euroopan erä 27.8.2026. Sillä on oma
 * kommenttinsa listan sisällä, ja se noudattaa pelilaattasääntöä
 * samalla tavalla kuin Etna — nimetty paikka kaupungin sisällä, ei
 * kaupunkilaatta.
 */
export const FOKUSKOHTEET_ITA = [
  {
    id: 'vesuvius',
    nimi: 'Vesuvius',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren juurella asutaan yhä?',
      'Mistä laulu Funiculì, Funiculà kertoo?',
    ],
    korostukset: ['köysirata|köysirata'],
    /* Valintakuplan painike. Lupaus on isoisän oma vuosi. */
    nappi: 'Vuori, joka purkautui vuosi ennen isoisää',
    // 14,4261 E / 40,8214 N — en-Wikipedia "Mount Vesuvius".
    laudat: {
      maailmankartta: { x: 6314.2, y: 1770.5 },
      europe: { x: 488.2, y: 820.0 },
    },
    teksti: 'Vesuvius on purkautunut monta kertaa vuoden 79 jaa. tuhon '
      + 'jälkeen: vuonna 1631 laava hautasi kyliä ja tappoi noin 3 000 '
      + 'ihmistä, ja 1800-luvulla purkauksia oli kahdeksan. Niistä '
      + 'viimeinen ennen isoisän matkaa oli vuonna 1872 — vuosi ennen '
      + 'kuin hän tuli katsomaan vuorta. Huipulle rakennettiin vuonna '
      + '1880 köysirata, jonka avajaisiksi sepitettiin laulu "Funiculì, '
      + 'Funiculà". Viimeksi vuori purkautui 1944.',
    lahde: 'en-Wikipedia "Mount Vesuvius", johdanto ja osiot '
      + 'purkaushistoriasta sekä "Funicular" (tarkistettu 25.8.2026); '
      + 'virke isoisän matkavuodesta on aineiston koostajan '
      + 'ajoituspäätelmä, ei suora lainaus.',
    // Aineiston tarkistama tiedosto (4329×3004): kraaterin reuna.
    kuva: {
      tiedosto: 'Crater rim volcano Vesuvius - Campania - Italy - July 9th 2013 - 08.jpg',
      selite: 'Vesuviuksen kraaterin reunaa. Vuori purkautui viimeksi '
        + 'vuonna 1944.',
      lahde: 'Norbert Nagel, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'pompeji',
    nimi: 'Pompeji',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä kaivauksissa on löytynyt talojen sisältä?',
      'Kaivetaanko Pompejia vielä nykyään?',
    ],
    korostukset: ['muotti|muotteja', 'insula|korttelit'],
    /* Valintakuplan painike. Lupaus on menetelmä, ei tuho. */
    nappi: 'Kaupunki, joka alkoi puhua vasta 1800-luvulla',
    // 14,4861 E / 40,75 N — en-Wikipedia "Pompeii".
    laudat: {
      maailmankartta: { x: 6316.2, y: 1773.3 },
      europe: { x: 489.3, y: 821.9 },
    },
    teksti: 'Tuhkan alle jäänyt kaupunki alkoi puhua vasta 1800-luvulla. '
      + 'Kun Giuseppe Fiorelli otti kaivaukset johtoonsa 1863, hän '
      + 'tajusi, mitä tuhkakerroksen tyhjät onkalot olivat: hajonneiden '
      + 'ruumiiden jättämiä muotteja. Hän kehitti tavan valaa niihin '
      + 'kipsiä, ja niin uhrit saivat jälleen hahmon. Fiorelli myös '
      + 'numeroi korttelit ja ovet ja rakensi kaivauksen oman museon '
      + 'vuosina 1873–1874 — juuri isoisän matkavuonna.',
    lahde: 'en-Wikipedia "Pompeii", osio kaivaushistoriasta ja osio '
      + 'Antiquariumista (tarkistettu 25.8.2026).',
    /*
     * Aineiston valinta ja sen perustelu: EI uhrivalua vaan Forum ja
     * Vesuvius samassa kuvassa, eli kohteet 1 ja 2 yhdellä silmäyksellä
     * (8308×5486).
     */
    kuva: {
      tiedosto: 'Forum (Pompeii) and the Vesuvio.jpg',
      selite: 'Pompejin Forum ja sen takana Vesuvius. Kaivaukset saivat '
        + 'nykyisen tapansa Giuseppe Fiorellilta 1860-luvulla.',
      lahde: 'Commonists, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'napoli',
    nimi: 'Napoli',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä Kahden Sisilian kuningaskunta oli?',
      'Millainen on oikea napolilainen pizza?',
    ],
    korostukset: ['Neápolis', 'Parthenope'],
    /* Valintakuplan painike. Lupaus on nimen merkitys. */
    nappi: 'Kaupunki, jonka nimi tarkoittaa uutta',
    // 14,2486 E / 40,8358 N — en-Wikipedia "Naples".
    laudat: {
      maailmankartta: { x: 6308.3, y: 1769.9 },
      europe: { x: 484.8, y: 819.6 },
    },
    teksti: 'Napolin perustivat kreikkalaiset: ensin Parthenope '
      + '700-luvulla eaa., sitten uudelleen nimellä Neápolis, "uusi '
      + 'kaupunki". Se oli oman valtakuntansa pääkaupunki lähes '
      + 'yhtäjaksoisesti 1200-luvulta vuoteen 1861 asti, jolloin Kahden '
      + 'Sisilian kuningaskunta liitettiin Italiaan — isoisän matkasta '
      + 'vain kaksitoista vuotta taaksepäin. Teatro di San Carlo '
      + 'vuodelta 1737 on Euroopan vanhin yhä toimiva oopperatalo, ja '
      + 'kaupunkia pidetään pizzan kotina.',
    lahde: 'en-Wikipedia "Naples", johdanto sekä osiot nähtävyyksistä ja '
      + 'ruoasta (tarkistettu 25.8.2026). Oopperatalon muoto on '
      + 'aineiston valitsema turvallinen sanamuoto: artikkeli sanoo '
      + 'kahdessa kohdassa hieman eri asian.',
    // Aineiston tarkistama tiedosto (7360×4912).
    kuva: {
      tiedosto: 'Naples from the Castello Sant Elmo with Abbazia San Martino the port and the Vesuv.jpg',
      selite: 'Napoli, sen satama ja Vesuvius Castel Sant\'Elmon '
        + 'kukkulalta nähtynä.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'pisa',
    nimi: 'Pisa',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi tornia ei suoristettu kokonaan?',
      'Mitä muuta samalla aukiolla on?',
    ],
    korostukset: ['kellotorni|kellotorni'],
    /* Valintakuplan painike. Lupaus on pelastustyö, ei kallistuma. */
    nappi: 'Torni, joka kaivettiin takaisin pystyyn',
    // 10,4 E / 43,7167 N — en-Wikipedia "Pisa".
    laudat: {
      maailmankartta: { x: 6180.0, y: 1654.3 },
      europe: { x: 410.9, y: 743.9 },
    },
    teksti: 'Pisan tuomiokirkon kellotorni alkoi kallistua jo '
      + 'rakennusaikana 1100-luvulla, koska maaperä ei kantanut sen '
      + 'painoa, ja kallistuma paheni 1300-luvulle asti. Vuonna 1990 se '
      + 'oli 5,5 astetta, ja torni suljettiin. Pelastustyö kesti '
      + 'vuodesta 1993 vuoteen 2001: alta kaivettiin pois 38 '
      + 'kuutiometriä maata korkeammalta puolelta, ja torni palautui '
      + 'vuoden 1838 asentoonsa, 3,97 asteeseen. Sen sanotaan kestävän '
      + 'nyt ainakin 300 vuotta.',
    lahde: 'en-Wikipedia "Leaning Tower of Pisa", johdanto ja osio '
      + 'vakauttamisesta (tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (10153×6087) — koko Piazza dei
    // Miracoli, ei pelkkä torni.
    kuva: {
      tiedosto: 'Piazza dei Miracoli (Pisa) 2023.jpg',
      selite: 'Piazza dei Miracoli Pisassa: tuomiokirkko, kastekappeli '
        + 'ja kalteva kellotorni.',
      lahde: 'PaestumPaestum, Wikimedia Commons (CC BY 4.0)',
    },
  },
  {
    id: 'capri',
    nimi: 'Capri ja Sininen luola',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Capri',
    tyyppi: 'saari',
    kysymykset: [
      'Miten luolaan pääsee sisään?',
      'Miksi keisari halusi asua saarella?',
    ],
    korostukset: ['Villa Jovis', 'Grotta Azzurra'],
    /* Valintakuplan painike. Lupaus on valo, ei keisari. */
    nappi: 'Luola, jossa vesi hehkuu sinisenä',
    /*
     * 14,2333 E / 40,55 N — en-Wikipedia "Capri". Sinisellä luolalla on
     * oma koordinaattinsa (14,2057 E / 40,561 N, laudalla 6306,9 /
     * 1780,8 ja 483,9 / 826,8), mutta kartalla ne olisivat käytännössä
     * sama piste: kohde on yksi, ja piste on saaren oma.
     */
    laudat: {
      maailmankartta: { x: 6307.8, y: 1781.2 },
      europe: { x: 484.5, y: 827.1 },
    },
    teksti: 'Keisari Tiberius muutti Caprille pysyvästi vuonna 27 jaa. '
      + 'ja hallitsi Rooman valtakuntaa saarelta kuolemaansa asti; '
      + 'Villa Jovis on yhä Italian parhaiten säilyneitä keisariajan '
      + 'huviloita. Saaren kuuluisin nähtävyys on kuitenkin '
      + 'merenalainen: Sininen luola, jonka vedenalaisesta aukosta '
      + 'tuleva valo heijastuu ylöspäin ja saa veden hehkumaan '
      + 'siniseltä. Saksalainen August Kopisch löysi luolan uudelleen '
      + '1826, ja siitä tuli saaren maine.',
    lahde: 'en-Wikipedia "Capri", osiot antiikin historiasta ja '
      + '1800-luvusta, sekä en-Wikipedia "Blue Grotto (Capri)", '
      + 'johdanto (tarkistettu 25.8.2026). Suomenkielinen nimi Grotta '
      + 'Azzurra on fi-Wikipedian artikkelin nimi, jolle "Sininen luola" '
      + 'ohjautuu.',
    /*
     * AINEISTON VAHVIN AJOITUSOSUMA (1800×1436): Albert Bierstadtin
     * maalaus luolasta vuosilta 1857–1860, eli noin viisitoista vuotta
     * ennen isoisän matkaa. Pelaaja näkee sen näkymän, joka 1873 oli
     * muodissa.
     */
    kuva: {
      tiedosto: 'Albert Bierstadt - The Blue Grotto, Capri - Walters 371565.jpg',
      selite: 'Sininen luola Caprilla, maalattuna 1850-luvun lopulla — '
        + 'runsaat kymmenen vuotta ennen isoisän matkaa.',
      lahde: 'Albert Bierstadt, Walters Art Museum, Wikimedia Commons '
        + '(public domain)',
    },
  },
  {
    id: 'cinque-terre',
    nimi: 'Cinque Terre',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä terasseilla kasvatetaan?',
      'Miten kylät ovat säilyneet ennallaan?',
    ],
    korostukset: ['terassi|terasseja'],
    /* Valintakuplan painike. Lupaus on nimen käännös. */
    nappi: 'Viisi maata jyrkällä rannalla',
    /*
     * 9,7167 E / 44,1194 N — en-Wikipedia "Cinque Terre". KARKEA KOKO
     * ALUEEN KESKIPISTE: aineisto ristiintarkisti sen kahdella kylällä
     * (Vernazza ja Monterosso al Mare ovat samalla rannikolla).
     */
    laudat: {
      maailmankartta: { x: 6157.2, y: 1637.9 },
      europe: { x: 397.8, y: 733.3 },
    },
    teksti: '"Viisi maata" on viisi kylää Ligurian jyrkällä rannikolla: '
      + 'Monterosso al Mare, Vernazza, Corniglia, Manarola ja '
      + 'Riomaggiore. Vuosisatojen ajan ihmiset ovat rakentaneet '
      + 'rinteisiin terasseja aivan merenrannan kallioille asti. Kyliin '
      + 'pääsee polkuja, junalla ja veneellä — autolla vain vaivoin, '
      + 'kapeita ja huteria vuoristoteitä pitkin. Alue on Unescon '
      + 'maailmanperintökohde ja kansallispuisto.',
    lahde: 'en-Wikipedia "Cinque Terre", johdanto (tarkistettu '
      + '25.8.2026).',
    // Aineiston tarkistama tiedosto (4500×2676).
    kuva: {
      tiedosto: 'Vernazza dal Sentiero Azzurro.jpg',
      selite: 'Vernazza, yksi Cinque Terren viidestä kylästä, '
        + 'rannikkopolulta nähtynä.',
      lahde: 'СССР, Wikimedia Commons (CC BY-SA 2.5)',
    },
  },
  {
    id: 'matera',
    nimi: 'Matera',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Missä luolakotien asukkaat asuvat nykyään?',
      'Asutaanko Sasseissa enää lainkaan?',
    ],
    korostukset: ['Sassit|Sassit', 'ylätasanko|ylätasangolla'],
    /* Valintakuplan painike. Lupaus on rakennustapa. */
    nappi: 'Kaupunki, joka on kaiverrettu kallioon',
    /*
     * 16,6083 E / 40,6667 N — en-Wikipedia "Sassi di Matera". HUOM:
     * Matera-artikkeli EI palauta koordinaatteja koordinaatti-
     * rajapinnasta (aineisto kokeili kahdesti), joten luku on otettu
     * saman kaupungin vanhasta ytimestä.
     */
    laudat: {
      maailmankartta: { x: 6386.9, y: 1776.6 },
      europe: { x: 530.1, y: 824.1 },
    },
    teksti: 'Materan vanhin osa on kaiverrettu kallioon: Sassit ovat '
      + 'noin kahdellatoista tasolla kiemurtelevia luolakoteja, portaita '
      + 'ja pihoja rotkon reunalla. Asutus jatkuu esihistoriasta asti, '
      + 'ja 1700-luvun lopulla kaupunki oli jakautunut kahtia — köyhät '
      + 'Sassien luolissa, varakkaat ylätasangolla. 1950-luvulla luolat '
      + 'julistettiin kelvottomiksi asua ja asukkaat siirrettiin pois; '
      + '1993 Sassit nimettiin maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Matera", johdanto (tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (6637×3238).
    kuva: {
      tiedosto: 'View of Sassi di Matera, Matera, Italy (PPL2-Enhanced) julesvernex2.jpg',
      selite: 'Materan Sassit rotkon reunalla. Luolakodit nousevat '
        + 'kalliossa noin kahdellatoista tasolla.',
      lahde: 'Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'dolomiitit',
    nimi: 'Dolomiitit',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä dolomiittikivi oikeastaan on?',
      'Milloin vuorten punainen hehku näkyy parhaiten?',
    ],
    korostukset: ['Monti Pallidi', 'karbonaattikallio|karbonaattikallio'],
    /* Valintakuplan painike. Lupaus on vanha paikallinen nimi. */
    nappi: 'Kalpeat vuoret, jotka hehkuvat illalla',
    /*
     * 11,85 E / 46,4333 N — en-Wikipedia "Dolomites". KARKEA KOKO
     * VUORISTON KESKIPISTE, ei täsmäpaikka.
     */
    laudat: {
      maailmankartta: { x: 6228.3, y: 1542.3 },
      europe: { x: 438.7, y: 672.4 },
    },
    teksti: 'Koillis-Italian vuorijono on saanut nimensä kivilajistaan, '
      + 'ja kivilaji puolestaan ranskalaiselta mineralogilta: Déodat '
      + 'Gratet de Dolomieu (1750–1801) kuvasi mineraalin ensimmäisenä. '
      + 'Sitä ennen paikalliset kutsuivat vuoria nimellä Monti Pallidi, '
      + '"kalpeat vuoret", koska karbonaattikallio heijastaa '
      + 'auringonlaskussa punertavan ja purppuraisen hehkun. Dolomiitit '
      + 'ovat olleet Unescon maailmanperintökohde vuodesta 2009.',
    lahde: 'en-Wikipedia "Dolomites", johdanto ja osio "Etymology" '
      + '(tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (8256×5504).
    kuva: {
      tiedosto: 'Drei Zinnen Tre Cime di Lavaredo Dolomites.jpg',
      selite: 'Tre Cime di Lavaredon kolme huippua Dolomiiteilla.',
      lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'etna',
    nimi: 'Etna',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka usein Etna purkautuu?',
      'Miten vuoren rinteillä uskalletaan viljellä?',
    ],
    korostukset: ['tuhka|tuhkasta'],
    /* Valintakuplan painike. Lupaus on koko, ei tuho. */
    nappi: 'Vuori, jonka korkeus vaihtuu',
    // 14,995 E / 37,755 N — en-Wikipedia "Mount Etna". Ks. tiedoston
    // alku: laudalla on jo tulivuorimerkki tässä kohdassa.
    laudat: {
      maailmankartta: { x: 6333.2, y: 1890.3 },
      europe: { x: 499.1, y: 900.6 },
    },
    teksti: 'Etna on Italian neljästä aktiivisesta tulivuoresta '
      + 'ylivoimaisesti suurin: noin kaksi ja puoli kertaa Vesuviuksen '
      + 'korkuinen ja lähes 1 200 neliökilometrin laajuinen. Se on lähes '
      + 'jatkuvasti liikkeessä, ja sen korkeus muuttuu purkausten '
      + 'mukana — syyskuussa 2024 huippu oli 3 403 metriä. Tuhkasta '
      + 'syntyy hedelmällistä multaa, ja rinteet ovat täynnä '
      + 'viinitarhoja ja hedelmätarhoja.',
    lahde: 'en-Wikipedia "Mount Etna", johdanto (tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (1542×1330).
    kuva: {
      tiedosto: 'Mount Etna snow-toppd.jpg',
      selite: 'Lumihuippuinen Etna Sisiliassa. Vuoren korkeus muuttuu '
        + 'purkausten mukana.',
      lahde: 'Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'milano',
    nimi: 'Milano',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä kelttiheimo kaupungin perusti?',
      'Miksi renessanssi tarvitsi rahoittajia?',
    ],
    korostukset: ['Mediolanum', 'herttuakunta|herttuakunta'],
    /* Valintakuplan painike. Lupaus on aikakausi, ei muoti. */
    nappi: 'Kaupunki, joka oli kerran Rooman pääkaupunki',
    // 9,19 E / 45,4669 N — en-Wikipedia "Milan".
    laudat: {
      maailmankartta: { x: 6139.7, y: 1582.5 },
      europe: { x: 387.6, y: 697.8 },
    },
    teksti: 'Milanon perusti kelttiheimo noin 590 eaa., ja roomalaiset '
      + 'valloittivat sen 222 eaa. ja latinalaistivat nimen muotoon '
      + 'Mediolanum. Vuosina 284–402 jaa. kaupunki oli Rooman '
      + 'valtakunnan läntisen puoliskon pääkaupunki. Keskiajan lopulla '
      + 'Milanon herttuakunta oli yksi renessanssin suurista '
      + 'rahoittajista, ja 1800-luvulta lähtien kaupunki on vetänyt '
      + 'Italian teollisuutta ja rahaa.',
    lahde: 'en-Wikipedia "Milan", johdanto (tarkistettu 25.8.2026).',
    /*
     * Aineiston tarkistama tiedosto (3048×1786). HUOM aineiston oma
     * huomautus: pelissä on jo Milano-kysymys ("Milano ei ole koskaan
     * ollut Italian pääkaupunki", js/packs/europe.js). Ristiriitaa ei
     * ole — läntisen Rooman valtakunnan pääkaupunki on eri asia kuin
     * Italian pääkaupunki — mutta ero on tekstissä sanottu ääneen.
     */
    kuva: {
      tiedosto: 'Milano, Duomo with Milan Cathedral and Galleria Vittorio Emanuele II, 2016.jpg',
      selite: 'Milanon Duomo ja Galleria Vittorio Emanuele II '
        + 'tuomiokirkon aukiolla.',
      lahde: 'Steffen Schmitz, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'torino',
    nimi: 'Torino',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi pääkaupunki siirrettiin pois Torinosta?',
      'Kuka Mole Antonellianan suunnitteli?',
    ],
    korostukset: ['Savoiji|Savoijin', 'synagoga|synagogaksi'],
    /* Valintakuplan painike. Lupaus on isoisän oma vuosi. */
    nappi: 'Kaupunki, jonka maamerkki oli 1873 työmaa',
    // 7,6761 E / 45,0792 N — en-Wikipedia "Turin".
    laudat: {
      maailmankartta: { x: 6089.2, y: 1598.5 },
      europe: { x: 358.6, y: 708.0 },
    },
    teksti: 'Torino oli yhdistyneen Italian ensimmäinen pääkaupunki '
      + 'vuosina 1861–1865 — sitä ennen Savoijin herttuakunnan ja '
      + 'Sardinian kuningaskunnan keskus, ja siksi sitä on kutsuttu '
      + 'Italian vapauden kehdoksi. Kaupungin tunnus, Mole '
      + 'Antonelliana, oli isoisän matkavuonna vasta työmaa: se '
      + 'aloitettiin 1863 synagogaksi ja valmistui vasta 1889, '
      + 'arkkitehtinsa kuoltua. Nykyään siinä toimii elokuvamuseo.',
    lahde: 'en-Wikipedia "Turin", johdanto, ja en-Wikipedia "Mole '
      + 'Antonelliana", johdanto (tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (5202×6135).
    kuva: {
      tiedosto: 'Mole Antonelliana in Turin.jpg',
      selite: 'Mole Antonelliana Torinossa. Rakennus aloitettiin 1863 ja '
        + 'valmistui vasta 1889.',
      lahde: 'Wikibusters, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'comojarvi',
    nimi: 'Comojärvi',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä Adda-jäätikkö oli?',
      'Mihin silkkiteollisuus järveltä katosi?',
    ],
    korostukset: ['Lario', 'silkkiteollisuus|silkkiteollisuudesta'],
    /* Valintakuplan painike. Lupaus on järven muoto. */
    nappi: 'Järvi, jonka jäätikkö kaiversi Y:ksi',
    // 9,2667 E / 46 N — en-Wikipedia "Lake Como".
    laudat: {
      maailmankartta: { x: 6142.2, y: 1560.4 },
      europe: { x: 389.1, y: 683.8 },
    },
    teksti: 'Comojärvi on jääkauden työtä: Adda-jäätikkö törmäsi '
      + 'vuoristoon, haarautui ja kaiversi järvelle sen tunnusomaisen '
      + 'Y-muodon. Se on Italian kolmanneksi suurin järvi ja yli 400 '
      + 'metriä syvä, siis Euroopan syvimpiä. Rannat ovat olleet '
      + 'varakkaiden lepopaikka roomalaisajoista asti, ja huviloita '
      + 'reunustaa yhä. 1800-luvulla seutu rikastui '
      + 'silkkiteollisuudesta.',
    lahde: 'en-Wikipedia "Lake Como", johdanto (tarkistettu 25.8.2026). '
      + 'Suomenkielinen nimi on fi-Wikipedian artikkelin nimi, jolle '
      + '"Como-järvi" ohjautuu.',
    // Aineiston tarkistama tiedosto (5760×3840). Bellagio on juuri
    // siinä kohdassa, jossa Y haarautuu.
    kuva: {
      tiedosto: 'Town of Bellagio (Lake Como) seen from the lake (36722979021).jpg',
      selite: 'Bellagion kylä Comojärvellä, juuri siinä kohdassa jossa '
        + 'järven Y-muoto haarautuu.',
      lahde: 'Ray Swi-hymn, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'po',
    nimi: 'Po',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä navigli-kanavat ovat?',
      'Miksi joki tulvii yhä nykyään?',
    ],
    korostukset: ['Monviso', 'penger|penkereiden'],
    /* Valintakuplan painike. Lupaus on pituus, ei maantiede. */
    nappi: 'Italian pisin joki',
    /*
     * 12,4319 E / 44,9525 N — en-Wikipedia "Po (river)". HUOM: tämä on
     * JOEN SUU Adrianmerellä, EI koko uoman keskipiste (aineiston oma
     * merkintä). Piste kelpaa joen nimeämiseen kartalla; täsmäpaikkaa
     * siitä ei saa tehdä.
     */
    laudat: {
      maailmankartta: { x: 6247.7, y: 1603.7 },
      europe: { x: 449.9, y: 711.3 },
    },
    teksti: 'Po on Italian pisin joki, 652 kilometriä. Se alkaa Cottian '
      + 'Alpeilla kivisestä rinteestä pulppuavana lähteenä '
      + 'Monviso-vuoren alta ja päätyy leveään suistoon Adrianmerellä. '
      + 'Vesimäärältään se on Rhônen ja Niilin ohella Välimeren '
      + 'suurimpia jokia — ja siksi myös tulvii, minkä takia yli puolet '
      + 'uomasta on penkereiden välissä. Milanoon Po on yhdistetty '
      + 'kanavaverkolla, jonka suunnittelussa Leonardo da Vinci oli '
      + 'mukana.',
    lahde: 'en-Wikipedia "Po (river)", johdanto (tarkistettu 25.8.2026).',
    // Aineiston tarkistama tiedosto (4284×5712) — juuri se suisto,
    // jonka kohdalle koordinaatti osoittaa.
    kuva: {
      tiedosto: 'Po River Delta aerial 1.jpg',
      selite: 'Pon suisto Adrianmerellä ilmasta kuvattuna.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'sardinia',
    nimi: 'Sardinia',
    tyyppi: 'saari',
    kysymykset: [
      'Ketkä nuraghe-tornit rakensivat?',
      'Miten sardin kieli eroaa italiasta?',
    ],
    korostukset: ['nuraghe|nuraghe-kulttuurin', 'mikromanner|mikromantereeksi'],
    /* Valintakuplan painike. Lupaus on aineiston oma vertauskuva. */
    nappi: 'Saari, jota sanotaan mikromantereeksi',
    /*
     * 9 E / 40 N — en-Wikipedia "Sardinia". PYÖREÄ ASTEKOORDINAATTI eli
     * saaren likimääräinen keskipiste, ei täsmäpaikka (aineiston oma
     * varaus).
     */
    laudat: {
      maailmankartta: { x: 6133.3, y: 1802.9 },
      europe: { x: 384.0, y: 841.6 },
    },
    teksti: 'Sardinia on Sisilian jälkeen Välimeren toiseksi suurin '
      + 'saari, ja sitä on kuvattu mikromantereeksi: vuoria, metsiä, '
      + 'tasankoja, kallioisia rantoja ja pitkiä hiekkarantoja samassa '
      + 'paikassa. Saarella puhutaan omaa kieltä, sardia, joka on '
      + 'Italian lain tunnustama vähemmistökieli. Maisemassa seisoo yhä '
      + 'esihistoriallisen nuraghe-kulttuurin kivitorneja ympäri '
      + 'saarta.',
    lahde: 'en-Wikipedia "Sardinia", johdanto (tarkistettu 25.8.2026). '
      + 'Tornien lukumäärää EI ole tarkistettu, joten sitä ei väitetä '
      + '(aineiston oma rajaus).',
    // Aineiston tarkistama tiedosto (6760×4512) — Baruminin Su Nuraxi
    // on nuraghe-torneista tunnetuin.
    kuva: {
      tiedosto: 'Nuraghe Su Nuraxi - Barumini - Sardinia - Italy - 07.jpg',
      selite: 'Su Nuraxin nuraghe Baruminissa. Kivitorneja seisoo yhä '
        + 'ympäri Sardiniaa.',
      lahde: 'Norbert Nagel, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN EUROOPAN ERÄ (27.8.2026) ────────────────
   *
   * FORUM ROMANUM, listan 15. kohde. Aineiston 14 kohdetta yllä ovat
   * ennallaan; tämä on niiden perässä omana eränään samaan tapaan kuin
   * Kreikan tiedostossa Akropolis ja symbolierä.
   *
   * ROOMA ON PELILAATTA, FORUM EI OLE. Tiedoston alun sääntö sanoo,
   * ettei listalla ole yhtään pelilaattaa — Venetsia, Firenze, Rooma ja
   * Sisilia puuttuvat tarkoituksella. Forum Romanum ei riko sääntöä
   * vaan noudattaa sitä samalla tavalla kuin Etna: kohde on yksi
   * nimetty paikka kaupungin sisällä, ei kaupunkilaatta. Sen kohdalla
   * kartalla on siis Forumin merkki eikä toista Roomaa.
   *
   * ESITYSTAPA ON "YHÄ OLEMASSA" (`kadonnut: false`). Forumin rauniot
   * ovat paikallaan ja niissä käy vuosittain miljoonia ihmisiä, joten
   * kartalla säilyy kohteen oma merkki ja pääkuvana on nykytilan
   * valokuva; ihmekuva aukeaa sen alta "Koe ihme" -napista. Tähti
   * kuuluu vain kohteille, joita ei ole enää lainkaan.
   *
   * KUVAPARI ON SAMASTA IKKUNASTA. Valokuva on otettu Palazzo
   * Senatorion ikkunasta Capitoliumilta, ja ihmekuva katsoo samalta
   * suunnalta samaa laaksoa: vasemmalla Septimius Severuksen
   * riemukaari, keskellä Forumin aukio, taustalla Colosseum. Sama
   * näkymä kahdessa ajassa on juuri se, mitä Raamattu ihmeeltä pyytää.
   *
   * 12,4852 E / 41,8922 N — en-Wikipedia "Roman Forum". Piste osuu
   * ITA-lehden rajaukseen (x 5982–6522, y 1426–2055) ja on Rooman oman
   * laatan vieressä, ei sen päällä (laatta 6249,7 / 1728,1).
   */
  {
    id: 'forum-romanum',
    nimi: 'Forum Romanum',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi Forum jäi lopulta autioksi?',
      'Mitä Forumin aukiolla tehtiin tavallisena päivänä?',
    ],
    korostukset: ['Curia Julia|Curia Julian', 'basilika|basilikat'],
    /* Valintakuplan painike. */
    nappi: 'Aukio, jota on sanottu maailman kuuluisimmaksi',
    laudat: {
      maailmankartta: { x: 6249.5, y: 1727.9 },
      europe: { x: 450.9, y: 791.8 },
    },
    teksti: 'Forum Romanum on suorakaiteen muotoinen aukio Palatinuksen '
      + 'ja Capitoliumin välisessä notkossa, ja se oli vuosisatoja '
      + 'Rooman jokapäiväisen elämän keskus: täällä kuljettiin '
      + 'voittokulkueissa, äänestettiin, pidettiin puheita ja '
      + 'oikeudenkäyntejä, hoidettiin kaupat ja pystytettiin patsaat '
      + 'kaupungin johtajille. Vanhimmat pyhäköt ovat aukion '
      + 'kaakkoisreunalla — kuninkaanasunto Regia ja Vestan temppeli '
      + 'ovat peräisin 700-luvulta eaa. Oikeudenkäynnit siirtyivät '
      + 'vuonna 179 eaa. valmistuneeseen Basilica Aemiliaan, ja noin '
      + '130 vuotta myöhemmin Julius Caesar rakensi Basilica Julian ja '
      + 'uuden senaatintalon Curia Julian. Nykyään paikka on laaja '
      + 'raunioalue, jolla käy vuosittain yli 4,5 miljoonaa kävijää.',
    lahde: 'en-Wikipedia "Roman Forum", johdanto-osa ja tietolaatikko '
      + '(tarkistettu 27.8.2026).',
    /*
     * Tarkistettu Commonsin imageinfo-rajapinnalla 27.8.2026
     * (2848×2134, CC BY-SA 3.0, Blackcat): näkymä Palazzo Senatorion
     * ikkunasta, sama suunta kuin ihmekuvassa.
     */
    kuva: {
      tiedosto: '2012-02-17 Foro Romano da Palazzo Senatorio 1.jpg',
      selite: 'Forum Capitoliumilta katsottuna: vasemmalla Septimius '
        + 'Severuksen riemukaari, taustalla Colosseum.',
      lahde: 'Blackcat, Wikimedia Commons (CC BY-SA 3.0)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`,
     * joten kartalla säilyy historian pylväs ja "Koe ihme" -nappi tulee
     * yllä olevan valokuvan alle.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-forum-romanum.webp',
      kadonnut: false,
      selite: 'Forum oli valtakunnan sydän: temppeleitä, riemukaaria ja '
        + 'kaksi valtavaa basilikaa, joiden pylväskäytävissä hoidettiin '
        + 'Rooman kaupat ja oikeusjutut. Marmori oli maalattua ja '
        + 'kullattua, ja aukio oli täynnä patsaita. Samassa notkossa '
        + 'Palatinuksen ja Capitoliumin välissä on nyt raunioalue '
        + 'keskellä nykyistä Roomaa.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN VÄLIMEREN ERÄ (27.8.2026) ───────────────
   *
   * COLOSSEUM, listan 16. kohde. Sama ennakkotapaus kuin Forum
   * Romanumilla yllä: ROOMA ON PELILAATTA, COLOSSEUM EI OLE, joten
   * tiedoston alun sääntö (listalla ei ole yhtään pelilaattaa) pysyy
   * voimassa — kohde on yksi nimetty paikka kaupungin sisällä, ei
   * toinen Rooma. Kartalla on siis Colosseumin merkki eikä toista
   * kaupunkilaattaa.
   *
   * MERKKI ON KOLMANTENA SAMASSA RYPPÄÄSSÄ. Rooman laatta on
   * 6249,7 / 1728,1 ja Forum Romanum 6249,5 / 1727,9; Colosseum on
   * 6249,7 / 1728,0 eli käytännössä samassa pisteessä. Se on maasto
   * eikä virhe — Forumin ja Colosseumin väli on 500 metriä ja laudan
   * yksikkö on kymmeniä kilometrejä. Niputuspassi (js/fokusniput.js)
   * kasaa päällekkäin osuvat merkit ESITYKSESSÄ erilleen, ja ahtaassa
   * ryppäässä nimiö väistyy (v1211); dataan ei kosketa.
   *
   * ESITYSTAPA ON "YHÄ OLEMASSA" (`kadonnut: false`). Colosseum on
   * maailman suurin pystyssä oleva amfiteatteri ja yksi Rooman
   * käydyimmistä kohteista, joten kartalla säilyy kohteen oma merkki
   * ja pääkuvana on nykytilan valokuva; ihmekuva aukeaa sen alta
   * "Koe ihme" -napista. Tähti kuuluu vain kohteille, joita ei ole
   * enää lainkaan.
   *
   * KUVAPARI KATSOO SAMAA SIVUA. Valokuva on otettu luoteesta, ja
   * siinä näkyy juuri se raja, josta ihmekuva kertoo: vasemmalla
   * säilynyt ulkomuuri kolmine kaarikerroksineen, oikealla paljaaksi
   * riisuttu sisämuuri. Ihmekuva katsoo samaa sivua ehjänä.
   *
   * 12,492222 E / 41,890278 N — en-Wikipedia "Colosseum". Artikkelin
   * tietolaatikko lukee koordinaatit Wikidatasta (Q10285, P625:
   * 41°53′25″N 12°29′32″E), joten ne on haettu sieltä. Piste osuu
   * ITA-lehden rajaukseen (x 5982–6522, y 1426–2055).
   */
  {
    id: 'colosseum',
    nimi: 'Colosseum',
    tyyppi: 'muu',
    symboli: 'urheilu',
    kysymykset: [
      'Kuka maksoi Colosseumin rakentamisen?',
      'Miksi rakennusta alettiin kutsua Colosseumiksi?',
    ],
    korostukset: ['velarium|velariumia', 'hypogeum|hypogeum'],
    /* Valintakuplan painike. */
    nappi: 'Areena, jonka päälle vedettiin purjekangaskatto',
    laudat: {
      maailmankartta: { x: 6249.7, y: 1728.0 },
      europe: { x: 451.1, y: 791.9 },
    },
    teksti: 'Colosseum eli Flaviusten amfiteatteri rakennettiin Neron '
      + 'tekojärven paikalle keskelle Roomaa: Vespasianus aloitti työn '
      + 'vuonna 72 ja Titus vihki rakennuksen vuonna 80. Se on suurin '
      + 'koskaan rakennettu antiikin amfiteatteri — soikio, joka on 189 '
      + 'metriä pitkä ja 156 metriä leveä ja jonka ulkomuuri on 48 '
      + 'metriä korkea. Katsomoon mahtui arvioiden mukaan '
      + '50 000–80 000 katsojaa, ja sisään päästiin kahdeksastakymmenestä '
      + 'numeroidusta portista. Areenan alla oli kaksikerroksinen '
      + 'käytävä- ja häkkiverkosto hypogeum, jossa hissit ja väkipyörät '
      + 'nostivat eläimiä ja lavasteita hiekalle. Ylimmän kerroksen 240 '
      + 'mastonpidikettä kannattivat velariumia, köysiverkon varassa '
      + 'lepäävää purjekangaskatosta, joka piti auringon ja sateen '
      + 'poissa yleisön päältä. Keskiajalla holveissa asuttiin ja '
      + 'tehtiin työtä, ja vuoden 1349 maanjäristys kaatoi eteläisen '
      + 'ulkomuurin: sen kivet kannettiin muualle Roomaan ja marmori '
      + 'poltettiin kalkiksi.',
    lahde: 'en-Wikipedia "Colosseum", johdanto sekä osiot '
      + '"Construction, inauguration, and Roman renovations", '
      + '"Medieval", "Exterior", "Interior seating" ja "Arena and '
      + 'hypogeum"; kolossin vaiheet artikkelista "Colossus of Nero" '
      + '(tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (12051×8442, CC BY-SA 4.0, käyttäjä FeaturedPics,
     * kuvattu 28.10.2020) ja katsottu silmin: aamuvalossa lähes tyhjä
     * aukio, ainoat ihmiset kolme etäistä hahmoa istumassa kivellä
     * aitauksen takana — kukaan ei ole tunnistettavissa kortin
     * kuvakoossa eikä kukaan ole etualalla. Sävy ja vuorokaudenaika
     * ovat lähellä ihmekuvaa, joten pari toimii.
     */
    kuva: {
      tiedosto: 'Colosseo 2020.jpg',
      selite: 'Colosseumin luoteissivu: vasemmalla säilynyt ulkomuuri, '
        + 'oikealla paljaaksi riisuttu sisämuuri.',
      lahde: 'FeaturedPics, Wikimedia Commons (CC BY-SA 4.0)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`,
     * joten "Koe ihme" -nappi tulee yllä olevan valokuvan alle.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-colosseum.webp',
      kadonnut: false,
      selite: 'Colosseumin ulkokehä oli valmiina yhtenäinen '
        + 'nelikerroksinen muuri, jonka kaarissa seisoi patsaita ja '
        + 'jonka yli merimiehet vetivät purjekangaskatoksen varjoksi. '
        + 'Sisään mahtui noin 50 000 katsojaa, jotka pääsivät ilmaiseksi '
        + 'mutta säädyn mukaan: pääsymerkki ohjasi senaattorit alimmille '
        + 'riveille ja naiset ylimmille. Aamupäivä kului '
        + 'eläintaisteluissa, iltapäivä gladiaattoreissa. '
        + 'Vieressä kohosi Neron '
        + 'kullattu pronssikolossi, jonka mukaan rakennus lopulta sai '
        + 'nimensä. Kolossista on viimeinen varma maininta 300-luvulta '
        + 'eikä sen jäljistä ole muuta kuin jalustan perustus; '
        + 'eteläinen ulkomuuri kaatui vuoden 1349 maanjäristyksessä ja '
        + 'sisus louhittiin '
        + 'kiveksi ja kalkiksi. Pohjoinen ulkomuuri seisoo silti yhä, '
        + 'ja rakennus on maailman suurin pystyssä oleva amfiteatteri.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];

const ITA_TUNNUKSITTAIN = new Map(FOKUSKOHTEET_ITA.map((k) => [k.id, k]));

/**
 * Poimii Italian kohteet tunnuksilla siinä järjestyksessä kuin ne on
 * pyydetty. Tuntematon tunnus jätetään pois hiljaa — sama sääntö ja
 * sama syy kuin Kreikassa ja Bulgariassa: kirjoitusvirhe listassa ei saa
 * kaataa koko kaupungin virtaa.
 *
 * NIMI ON PREFIKSOITU (itaFokuskohteet), koska yhden tiedoston versio
 * ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: paljas
 * `fokuskohteet` olisi niputuksessa uudelleenjulistus Kreikan
 * vastaavan kanssa (tools/tarkista-niputus.mjs).
 */
export function itaFokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => ITA_TUNNUKSITTAIN.get(id)).filter(Boolean);
}
