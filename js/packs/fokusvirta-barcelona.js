/*
 * BARCELONAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4B.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-madrid.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA
 * SITÄ RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4B kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonpaperi).
 * NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, Livian repliikki ja aarremerkinta.teksti. Niitä ei
 * ole lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * LIVIAN REPLIIKKI ON JAETTU KAHTEEN KENTTÄÄN SANOJA MUUTTAMATTA.
 * tests/fokusvirta.test.mjs vaatii jokaiselta fokuskaupungilta oman
 * `pollo.maadoitus`-kentän (yli 120 merkkiä, eri teksti kuin
 * `pollo.teksti`), joten kanoninen repliikki on katkaistu VIRKERAJALTA:
 * ensimmäinen virke on maadoitus, loput kolme ovat vaiheen huomio.
 * Sanajärjestys, välimerkit ja kaksoispisteet ovat ennallaan, eikä
 * yhtään sanaa ole lisätty kumpaankaan puoliskoon.
 *
 * ISO AARRE: Vigon lahden hopealasti — sama Espanjan aarre kuin
 * Madridilla ja Sevillalla (aarremerkintä alla on Barcelonan oma
 * merkintä samasta lastista, ei toisinto kummastakaan).
 *
 * FAKTAPOHJA. Barcelonan kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `barcelona`), ja tämän paketin sisältö
 * nojaa kahteen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kaupunkilehden omat nostot
 *      (sardana ja cobla, ihmistornit, Cerdàn ruudukko, matkailijan
 *      opas) sekä js/packs/julisteet.js:n `barcelona`-rivi — nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin, ja MOLEMMAT
 *      lehtitehtävän visat on koottu niistä ilman yhtään uutta
 *      faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts,
 *      NODE_USE_ENV_PROXY=1) artikkeli ja osio kerrallaan, ja jokaisen
 *      kohdan oma kommentti nimeää artikkelin. Mitään ei ole päätelty,
 *      pyöristetty eikä muistettu.
 *
 * ── VIISI OMISTAJAN LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ─────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen. Kortti piirtyy ilman
 *      kuvaa (js/ui.js naytaFactValokuva saa nullin).
 *   2. LIVIAN KUVA ON KAUPUNKILEHDEN AVAUSKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan avauskuvaan (barcelona/
 *      avauskuvat), ei uuteen Commons-hakuun. Valinta on perusteltu
 *      kentän omassa kommentissa.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`), joten portin mitta on
 *      oletus (yksi täky) ja kuplan otsikko moottorin oma.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi ja teksti.
 *   5. TÄKYNOSTOJA EI OLE TÄSSÄ TIEDOSTOSSA (aallon 4B rajaus). Espanjan
 *      poolissa on jo Madridin kolme ja Sevillan viisi, eikä tämä paketti
 *      kirjoita `takynostot`-kenttää lainkaan — jolloin js/fokusnosto.js
 *      nostoMaanPooli putoaa NOSTO_MAAT.ESP:hen eli Madridin pakettiin
 *      niin kuin ennenkin. Pooliin ei kosketa.
 *
 * ── MINIVISAN SÄÄNTÖ — JA TIETOINEN POIKKEUS TALON TAVASTA ─────────
 *
 * Sama kuin Ateenassa, Sofiassa, Madridissa ja Sevillassa: vastaus
 * löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei toistu siinä
 * sellaisenaan.
 *
 * POIKKEUS: kolmen täyn minivisassa OIKEAN VASTAUKSEN PAIKKA VAIHTELEE
 * (indeksit 1, 2 ja 0 tässä järjestyksessä). Muu rekisteri kirjoittaa
 * oikean aina indeksiin 0, koska moottori ei sekoita vaihtoehtoja —
 * ja juuri siksi tarkkaavainen pelaaja oppii ennen pitkää valitsemaan
 * ensimmäisen lukematta kysymystä. Tämä paketti purkaa sen kaavan
 * omalta osaltaan (tilaus aallon 4B työlistassa). Lehden nimetyissä
 * tehtävissä oikea on yhä indeksissä 0, jotta ero on yhdessä paikassa
 * eikä kahdessa. Kummassakaan visassa oikea EI ole pisin vaihtoehto —
 * se on tarinakaaren mittausvaatimus (docs/moduulit/tarinakaari.md,
 * luku 6 kohta 2), ja se on tarkistettu käsin.
 *
 * ── LAATTAKYSYMYKSIÄ EI SPOILATA (yhtä poikkeusta lukuun ottamatta) ─
 *
 * Barcelonan laattakysymykset ovat js/packs/europe-questions.js:n
 * `barcelona`-lohkon viisi: Sagrada Famílian arkkitehti, katalaani
 * espanjan rinnalla, Välimeri, Eixamplen korttelien viistetyt kulmat ja
 * vuoden 1992 olympialaiset. Kaupungilla EI ole tarinakaaren pakettia
 * (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten kohtaamisen takana
 * on juuri tuo laattakysymys.
 *
 * Oppitunti pohjustaa niistä KOLMANNEN (Välimeri) — se on ainoa
 * viidestä, jota kaupunkilehti ei käsittele lainkaan: sana "Välimeri"
 * ei esiinny Barcelonan lehtiaineistossa kertaakaan, kun taas Gaudí,
 * katalaani, Eixamplen viiste ja vuoden 1992 olympialaiset esiintyvät
 * siellä kaikki. Kumpikaan lehtitehtävä ei koske yhtäkään viidestä:
 * AARTEEN AVAUS kysyy sardanan coblasta ja JULISTE vuoden 1888
 * maailmannäyttelystä.
 *
 * POIKKEUS, JOKA ON PAKKO KIRJATA: KANONINEN Livian repliikki sanoo
 * *"sen kulmat on viistetty jotta hevoskärryt mahtuivat kääntymään"*,
 * eli se antaa laattakysymyksen barcelona[3] vastauksen ennen kysymystä.
 * Kaanoniin ei kosketa tässä tiedostossa; asia on raportoitu Fablelle.
 * Vaihtoehtoja on kaksi ja molemmat ovat hänen tai omistajan: joko
 * repliikki jää sellaisenaan (kysymys muuttuu kertaukseksi) tai
 * laattakysymys vaihdetaan. Tämä paketti ei tee kumpaakaan.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD, CC0 tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 960 pikselin esikatseluna. Yhdessäkään ei ole
 * tunnistettavia eläviä ihmisiä: kolmessa ei ole ihmisiä lainkaan, ja
 * Ramblan valokuva on vuodelta 1889.
 *
 * HYLÄTTY KUVA JA SEN SYY: `La Rambla Barcelona bird stall 1991.jpg`
 * (CC BY-SA 4.0, JopkeB) on täsmälleen se lintukoju, josta ensimmäinen
 * täky kertoo — mutta kuvassa on lähikuvassa tunnistettavia nykyihmisiä,
 * joten se jätettiin pois ja tilalle otettiin vuoden 1889 katunäkymä.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Tukholmassa ja Sevillassa: yksi kuva per kortti.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu
 * kokonaan (sama ratkaisu kuin Tukholmassa; aallon 4B rajaus). Teksti
 * ja luenta ovat sanasta sanaan samat, joten luennan voi ajaa milloin
 * tahansa työnkululla .github/workflows/generoi-luennat.yml, ja
 * äänitekenttä lisätään silloin yhdellä rivillä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON PELIN OMAA. Sardanakysymys on Barcelonan lehden sivun 1
 * ("Barcelona") oman noston "Sardanassa askeleet lasketaan" tekstiä
 * (js/packs/kulttuuri-kategoriat.js) ja näyttelykysymys js/packs/
 * julisteet.js:n `barcelona`-rivin selitettä — sitä samaa julistetta,
 * jonka pelaaja tästä tehtävästä voittaa. Uusia faktaväitteitä ei ole
 * kummassakaan.
 */
const SARDANA_VISA = {
  kysymys: 'Sardanaa säestävässä coblassa on yksitoista soittajaa mutta '
    + 'kaksitoista soitinta. Miten se on mahdollista?',
  vaihtoehdot: [
    'Yksi soittaja pitää huolta kahdesta soittimesta',
    'Kahdestoista soitin soi tuulessa ilman soittajaa',
    'Kahdestoista soitin kiertää tanssijoiden käsissä piirin ympäri',
  ],
  oikea: 0,
  fakta: 'Flabiol-huilun soittajalla on käsivarteen sidottu pikkurumpu, '
    + 'jota hän lyö soittaessaan. Samassa piirissä lasketaan myös '
    + 'askeleet: jokaisessa sävelmässä on oma määränsä lyhyitä ja pitkiä, '
    + 'eikä määrä ole aina sama.',
};

const NAYTTELY_VISA = {
  kysymys: 'Ciutadellan puiston tiiliportti Arc de Triomf ja Ramblan '
    + 'päähän pystytetty Kolumbuksen pylväs rakennettiin samaa '
    + 'tilaisuutta varten. Mitä?',
  vaihtoehdot: [
    'Maailmannäyttelyä',
    'Kuningashuoneen vierailua',
    'Kaupunginmuurien purkamisen muistojuhlaa',
  ],
  oikea: 0,
  fakta: 'Barcelonan maailmannäyttely avattiin 8. huhtikuuta 1888 '
    + 'Ciutadellan puistossa, ja sitä varten nousivat sekä Arc de Triomf '
    + 'että Kolumbuksen pylväs. Sama vuosi on kaupungin julisteessa.',
};

export const FOKUSVIRTA_BARCELONA = {
  kaupunki: 'barcelona',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Barcelona, maaliskuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki purkaa muurejaan ja rakentaa itseään uusiksi '
      + 'ruutuihin, joilla on insinöörin nimi ja suunnitelma suurempi '
      + 'kuin yhdenkään kuninkaan. Ramblalla myydään lintuja häkeissä ja '
      + 'vettä laseittain. Satamassa lastataan korkkia ja viiniä, ja '
      + 'jokainen jonka tapaan puhuu kahta kieltä — toista minulle, '
      + 'toista toisilleen. Espanja on tasavalta tänä keväänä, mutta '
      + 'täällä sanotaan: Katalonia tekee työt.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[curious] Kaupunki purkaa muurejaan ja rakentaa itseään '
      + 'uusiksi ruutuihin, joilla on insinöörin nimi ja suunnitelma '
      + 'suurempi kuin yhdenkään kuninkaan. [excited] Ramblalla myydään '
      + 'lintuja häkeissä ja vettä laseittain. Satamassa lastataan '
      + 'korkkia ja viiniä, ja jokainen jonka tapaan puhuu kahta kieltä '
      + '— toista minulle, toista toisilleen. [softly] Espanja on '
      + 'tasavalta tänä keväänä, mutta täällä sanotaan: [whispers] '
      + 'Katalonia tekee työt.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden avauskuva) ----- */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); `teksti` seuraa sen
     * jälkeen.
     *
     * TÄMÄ ON KAANONIA, EI OMAA TEKSTIÄ. Kanoninen repliikki on jaettu
     * virkerajalta kahtia (ks. tiedoston alun perustelu): tässä on sen
     * ensimmäinen virke sellaisenaan, kaksoispisteineen ja kahden
     * pisteen taukoineen. Yhtään sanaa ei ole lisätty eikä poistettu.
     */
    maadoitus: 'Se insinöörin ruudukko on nykyään nimeltään Eixample, ja '
      + 'sen kulmissa on erikoisuus, jonka syyn annan sun päätellä ihan '
      + 'kohta itse — sen verran vihjaan, että nykyään niissä viisteissä '
      + 'parkkeeraa skoottereita..',
    /*
     * KAANON (Fable) — repliikin loput kolme virkettä sellaisenaan.
     */
    teksti: 'Ramblalla ei enää myydä lintuja, mut vesi maksaa edelleen. '
      + 'Ja se kaksikielisyys jonka isoisäsi huomasi — se ei ole '
      + 'kadonnut mihinkään. Aloitetaan kävely.',
    /*
     * KUVAKSI RUUDUKKO EIKÄ KIRKKO. Omistajan linjaus sanoo, että
     * Livian kuva on kaupunkilehden avauskuva. Barcelonan
     * avauskarusellissa (js/packs/kulttuuri-kategoriat.js,
     * barcelona/avauskuvat) on kuusi kuvaa: kolme generoitua heroa
     * (Sagrada Família, Casa Batlló, Palau Nacional) ja kolme
     * Commons-valokuvaa. Repliikki puhuu ruudukosta, ja karusellin
     * kuudes kuva on juuri se — koko Cerdàn ruudukko kukkulalta
     * katsottuna. Siksi kuva on tämä eikä ensimmäinen hero: sekä
     * omistajan linjaus että kuvan ja tekstin vastaavuus toteutuvat
     * samalla rivillä. Selite on lehden oma selite lyhentämättä.
     */
    kuva: {
      tiedosto: 'Barcelona desde El Carmelo.JPG',
      selite: 'Cerdàn ruudukon korttelit ovat 113 metriä sivultaan, ja '
        + 'sen laidalla on vuodesta 1882 rakenteilla ollut Sagrada '
        + 'Família.',
      lahde: 'Jcca76, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkinnässä Ramblalla myydään kahta
       * asiaa, lintuja ja vettä. Tämä täky kertoo, mitä molemmille
       * tapahtui — ja Livian kanoninen repliikki nimeää lopputuloksen
       * ("ei enää myydä lintuja, mut vesi maksaa edelleen"), muttei
       * kertaakaan syytä eikä vuosilukua. Täky on siis vastaus, ei
       * toisinto.
       *
       * EI PÄÄLLEKKÄISYYTTÄ LEHDEN KANSSA: kaupunkilehden kansikuvan
       * selite kertoo Ramblan nimen alkuperän (arabian ramla) ja
       * sadevesiuoman. Tämä täky ei toista kumpaakaan vaan jatkaa
       * siitä eteenpäin: puut, linnut ja lähde.
       *
       * FAKTAT (en-Wikipedia "La Rambla, Barcelona", osio "History"
       * sekä johdanto; haettu 29.8.2026):
       *   - katu oli alun perin puro, joka johdettiin vuonna 1440
       *     uusien muurien ulkopuolelle, minkä jälkeen siitä alkoi
       *     tulla katu (muurien laajennus alkoi 1377);
       *   - ensimmäiset puut istutettiin 1703: 280 koivua, jotka
       *     korvattiin myöhemmin jalavilla; 1832 istutettiin akaasioita
       *     ja vuodesta 1859 plataani on ollut kadun tavallinen puu;
       *   - Rambla dels Estudisilla oli häkkilintujen ja muiden
       *     pikkueläinten ulkoilmatori vuoteen 2010 asti; eläinsuojelua
       *     koskeva lainsäädäntö teki jatkamisesta mahdotonta, ja
       *     vuosien vastustelun jälkeen tori jouduttiin sulkemaan.
       *
       * FAKTAT (ca-Wikipedia "Font de Canaletes", johdanto ja osio
       * "Història i descripció"; haettu 29.8.2026):
       *   - nimi tulee 1500-luvun lähteestä, jossa vesi valui
       *     kanaaleja (canaletes) pitkin juottokaukaloon; vesi tuli
       *     Collserolan kaivostunneleista ja kulki kaupunkiin Portal de
       *     l'Àngelin kautta keramiikkakourua myöten muurin viertä;
       *   - Estudis Generalsin rakennus purettiin 1843, ja Ramblalle
       *     asetettiin uusi lähde, jonka vesi tuli Montcadan
       *     kaivoksesta;
       *   - nykyinen lähde on valurautaa, siinä on neljä suihkua ja
       *     nelilamppuinen lyhty, ja yhdessä kulmassa on pieni kaukalo
       *     koirille; se on kaupunginarkkitehti Pere Falquésin vuonna
       *     1889 luoma "font fanal" -malli, valanut Foneria Colomer;
       *   - legenda kuuluu: joka juo Canaletesista, palaa kaupunkiin.
       *
       * MITÄ EI KERROTA: Ramblan uskonnollisten rakennusten palot ja
       * vuoden 2017 isku. 13+ sallii vaaran, mutta tämä täky on kadun
       * kahden kaupan tarina, ei väkivallan.
       */
      id: 'rambla',
      nappi: 'Katu, jolla myytiin lintuja ja vettä',
      otsikko: 'Ramblan puut, häkit ja lähde',
      teksti: 'Ramblalla oli isoisäsi aikaan kaksi kauppaa, ja kumpikin '
        + 'oli vanhempi kuin katu. Kadun kohdalla virtasi ennen puro, '
        + 'joka johdettiin vuonna 1440 uusien muurien ulkopuolelle — '
        + 'vasta sen jälkeen uomasta alkoi tulla kulkuväylä. Puut ovat '
        + 'paljon nuorempia kuin ne näyttävät. Ensimmäiset istutettiin '
        + '1703, ja niitä oli kaksisataakahdeksankymmentä koivua; koivut '
        + 'korvattiin jalavilla, 1832 istutettiin akaasioita ja vuodesta '
        + '1859 kadun puu on ollut plataani. Isoisäsi käveli siis '
        + 'neljätoistavuotiaiden puiden alla ja piti niitä varmasti '
        + 'ikimuistoisina. Lintutori oli Rambla dels Estudisilla, ja se '
        + 'kesti vuoteen 2010. Sitä ei lopettanut kilpailu eikä vuokra '
        + 'vaan eläinsuojelu: elävien eläinten myynti kadulla kävi '
        + 'säädösten kanssa mahdottomaksi, ja vuosien vastustelun '
        + 'jälkeen kojut suljettiin. Toinen kauppa on yhä paikallaan, '
        + 'eikä se maksa enää mitään. Canaletesin lähde on saanut '
        + 'nimensä kanaaleista, joita pitkin vesi valui 1500-luvulla '
        + 'juottokaukaloon; se tuli Collserolan kaivostunneleista ja '
        + 'kulki kaupunkiin muurin viertä keramiikkakourua myöten. Kun '
        + 'vanha Estudis Generalsin rakennus purettiin 1843, Ramblalle '
        + 'nostettiin uusi lähde ja siihen vesi Montcadan kaivoksesta — '
        + 'juuri se, jonka isoisäsi ehti nähdä. Nykyinen valurautainen '
        + 'nelisuihkuinen lähde nelilamppuisine lyhtyineen on vasta '
        + 'vuodelta 1889, kaupunginarkkitehti Pere Falquésin malli, ja '
        + 'sen kulmassa on pieni kaukalo koirille. Siitä lähtee myös se '
        + 'lupaus, jota kukaan ei ole kumonnut: joka juo Canaletesista, '
        + 'palaa kaupunkiin.',
      /*
       * Commons 29.8.2026: 3966×2948, CC0, Rijksmuseum, päiväys 1889,
       * kuvaus "Straatgezicht op de Rambla de las flores te Barcelona",
       * albumilehti, jonka reunassa on valokuvaamon merkintä
       * "Barña Gran Rambla de las flores. J. E. Puig. Escudillers, 89".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: talvinen katunäkymä,
       * plataanit lehdettöminä, väkijoukko — vuoden 1889 ihmisiä, ei
       * tunnistettavia nykyihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se näyttää täsmälleen sen, mistä täky
       * kertoo — kolmekymmentä vuotta aiemmin istutetut plataanit ja
       * kadun, joka oli jo silloin kaupungin olohuone.
       */
      kuva: {
        tiedosto: 'Straatgezicht op de Rambla de las flores te Barcelona, RP-F-F01157-AY.jpg',
        selite: 'Rambla de las Flores vuonna 1889: vuodesta 1859 '
          + 'istutetut plataanit ovat kolmenkymmenen vuoden ikäisiä ja '
          + 'katu on jo kaupungin olohuone.',
        lahde: 'Valokuvaamo J. E. Puig 1889, Rijksmuseum / Wikimedia '
          + 'Commons (CC0)',
      },
      visa: {
        kysymys: 'Ramblan lintukojut pitivät pintansa vuoteen 2010 asti. '
          + 'Mikä lopulta sulki ne?',
        vaihtoehdot: [
          'Vuokrien nousu kadun parhaalla paikalla',
          'Eläinten katumyyntiä koskevat säädökset',
          'Kaupungin päätös istuttaa kojujen tilalle uudet plataanit',
        ],
        /* Oikea on keskimmäinen JA lyhyempi kuin viimeinen väärä. */
        oikea: 1,
        fakta: 'Tori oli Rambla dels Estudisilla. Saman kadun puusto on '
          + 'vaihtunut neljästi: koivut 1703, sitten jalavat, akaasiat '
          + '1832 ja plataanit vuodesta 1859.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) — tässä
       * eläin on puolentoista millimetrin kirva.
       *
       * MIKSI TÄMÄ TÄKY: merkinnässä satamassa lastataan viiniä. Täky
       * kertoo, miksi juuri sinä keväänä oli niin paljon lastattavaa —
       * ja mitä siitä kuudessa vuodessa seurasi.
       *
       * FAKTAT (en-Wikipedia "Great French Wine Blight", johdanto ja
       * osiot "Journey to Europe", "Initial appearance", "Damage" ja
       * "Solution"; haettu 29.8.2026):
       *   - tuholainen on Pohjois-Amerikasta tullut viiniköynnöskirva
       *     (Daktulosphaira vitifoliae), joka imee köynnöksen juuria;
       *   - ensimmäinen dokumentoitu hyökkäys Ranskassa oli Pujaut'n
       *     kylässä Gardin departementissa vuonna 1863;
       *   - yli 40 prosenttia Ranskan viiniköynnöksistä tuhoutui
       *     viidentoista vuoden aikana 1850-luvun lopulta 1870-luvun
       *     puoliväliin;
       *   - ratkaisuksi vakiintui eurooppalaisen köynnöksen varttaminen
       *     kirvaa kestävään amerikkalaiseen juureen; ensimmäiset
       *     ranskalaiset varttivat 1871.
       *
       * FAKTAT (ca-Wikipedia "Fil·loxera de la vinya", osio Katalonian
       * tilanteesta, aikajana ja osio "Conseqüències econòmiques i
       * demogràfiques a Catalunya"; haettu 29.8.2026):
       *   - kirva on 0,5–1,5 millimetriä pitkä ja kirvojen sukua;
       *   - niiden vuosien aikana, jolloin Ranskan tarhat olivat
       *     tuhoutuneet mutta kirva ei ollut vielä tullut, Katalonia vei
       *     paljon viiniä hyvään hintaan;
       *   - kirva tavattiin Rabós d'Empordàssa vuonna 1879;
       *     Itä-Pyreneille perustettiin kolmenkymmenen kilometrin
       *     turvavyöhyke, jolla saastuneet tarhat poltettiin;
       *   - Empordàn löydön jälkeen perustettiin Gironaan
       *     fil·loxeran torjuntakomissio;
       *   - uudelleenistutuksen myötä syntyi uusi tuote, cava;
       *   - vuodesta 1981 Sant Sadurní d'Anoiassa päästetään 7.
       *     syyskuuta fil·loxeretes kaduille, ja seuraavana päivänä
       *     kirkkoaukiolla vietetään Fil·loxeran juhlaa jättiläisineen,
       *     isopäineen ja tulipetoineen.
       *
       * FAKTAT (en-Wikipedia "Cava (Spanish wine)", osio "History";
       * haettu 29.8.2026): katalonialaista kuohuviiniä tehtiin jo 1851,
       * ja Codorníun Josep Raventós teki oman ensimmäisen kuohuviininsä
       * 1872. (Saman artikkelin väite siitä, että Penedèsin tarhat
       * olisivat olleet jo tuolloin fil·loxeran tuhoamat, on jätetty
       * pois: se on ristiriidassa ca-artikkelin aikajanan kanssa, jonka
       * mukaan kirva tuli Kataloniaan vasta 1879. Ristiriita on
       * raportoitu, eikä kumpaakaan lukua käytetä tässä syy-yhteytenä.)
       */
      id: 'filloksera',
      nappi: 'Kirva, joka rikastutti Katalonian',
      otsikko: 'Fil·loxera',
      teksti: 'Sinä keväänä, jona isoisäsi katseli satamassa viinilastia, '
        + 'Katalonia eli parasta viinivuosikymmentään — ja syy oli '
        + 'korkeintaan puolentoista millimetrin mittainen kirva. '
        + 'Pohjois-Amerikasta tullut fil·loxera imee viiniköynnöksen '
        + 'juuria, ja se havaittiin Ranskassa ensimmäisen kerran '
        + 'Pujaut\'n kylässä vuonna 1863. Viidessätoista vuodessa se '
        + 'tappoi yli neljäkymmentä prosenttia Ranskan '
        + 'viiniköynnöksistä. Niinä vuosina, joina Ranskan tarhat olivat '
        + 'tuhoutuneet mutta kirva ei ollut vielä tullut rajan yli, '
        + 'Katalonia myi viiniään enemmän ja kalliimmalla kuin koskaan. '
        + 'Kukaan ei ehtinyt tottua siihen. Vuonna 1879 kirva tavattiin '
        + 'Rabós d\'Empordàssa, ja rajan tuntumaan raivattiin '
        + 'kolmenkymmenen kilometrin turvavyöhyke, jolla jokainen '
        + 'saastunut tarha poltettiin. Se ei riittänyt. Ratkaisu oli '
        + 'lopulta sama kuin Ranskassa: eurooppalainen köynnös '
        + 'vartetaan amerikkalaisen köynnöksen juureen, joka kestää '
        + 'kirvan. Uudelleen istutettaessa moni tila vaihtoi rypäleensä, '
        + 'ja siitä kasvoi aikanaan aivan uusi tuote — cava. '
        + 'Katalonialaista kuohuviiniä oli tehty jo 1851, ja Codorníun '
        + 'Josep Raventós teki omansa 1872, vuotta ennen kuin isoisäsi '
        + 'kirjoitti tämän sivun. Sant Sadurní d\'Anoiassa kirvaa '
        + 'juhlitaan yhä: seitsemäntenä syyskuuta fil·loxeretes '
        + 'päästetään kaduille, ja seuraavana päivänä kirkkoaukiolla on '
        + 'Fil·loxeran juhla jättiläisineen ja tulipetoineen. Kylä '
        + 'juhlii tuholaista, joka pakotti sen keksimään itsensä '
        + 'uudelleen.',
      /*
       * Commons 29.8.2026: 893×830, public domain, tekijä tuntematon,
       * päiväys 1890, kuvaus "Sketch of phylloxera (Dactylosphaera
       * vitifolii); the individual pictures represent: phylloxera
       * unwinged, phylloxera winged, phylloxera sucking. a suction trunk
       * of phylloxera. Greatly enlarged.", lähdekokoelma Puolan
       * kansalliskirjasto. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kaiverrettu tietosanakirjataulu, ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on samalta vuosikymmeneltä kuin
       * torjuntatyö, ja siinä näkyy juuri se, mistä täky kertoo —
       * imukärsä, jolla eläin tyhjentää juuren.
       */
      kuva: {
        tiedosto: 'Dactylosphaera vitifolii MKL Bd. 13 1890 (128905688).jpg',
        selite: 'Vuoden 1890 kuvataulu esittää fil·loxeran siivekkäänä '
          + 'ja siivettömänä sekä imukärsän, jolla eläin tyhjentää '
          + 'viiniköynnöksen juuren — kaikki voimakkaasti suurennettuina.',
        lahde: 'Meyers Konversations-Lexikon 1890 (Puolan '
          + 'kansalliskirjasto), Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi katalonialainen viini kävi 1870-luvulla '
          + 'poikkeuksellisen hyvin kaupaksi?',
        vaihtoehdot: [
          'Barcelonan satama sai silloin ensimmäiset höyrylaivalinjansa',
          'Tasavallan hallitus poisti viiniltä vientiveron',
          'Ranskan tarhat olivat tuholaisen tuhoamia',
        ],
        /* Oikea on viimeinen JA lyhyin — pisin vaihtoehto on väärä. */
        oikea: 2,
        fakta: 'Kirva tuli Kataloniaan 1879 Rabós d\'Empordàhan. '
          + 'Köynnökset pelastettiin varttamalla ne amerikkalaisiin '
          + 'juuriin, ja uudelleenistutus loi pohjan cavalle.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ensimmäinen virke sanoo, että
       * kaupunki rakentaa itseään ruutuihin, joilla on insinöörin nimi.
       * Tämä täky kertoo sen, mitä isoisä ei voinut kadulta nähdä:
       * kaupunki ei valinnut sitä ruudukkoa itse.
       *
       * EI PÄÄLLEKKÄISYYTTÄ LEHDEN KANSSA: kaupunkilehden nosto "Joka
       * kulmasta leikattiin pala pois" kertoo Cerdàn ruudukon mitat ja
       * viisteet. Tämä täky ei toista niistä kumpaakaan — ei
       * korttelimittaa eikä viistettä — vaan kertoo kilpailun.
       * Viistekysymys on lisäksi laattakysymys, eikä sitä spoilata
       * täällä.
       *
       * FAKTAT (en-Wikipedia "Cerdà Plan", johdanto ja osiot "Barcelona
       * in the 19th century", "Down with the walls", "The preparation of
       * the Expansion Project" ja "Municipal contest"; haettu 29.8.2026):
       *   - muurien sisällä oli runsaat 2 km², ja siitä 40 % oli
       *     7 kasarmia, 11 sairaalaa, 40 luostaria ja 27 kirkkoa;
       *     asukkaita oli 115 000 (1802), 140 000 (1821) ja 187 000
       *     (1850);
       *   - elinajanodote oli rikkaalla 36 ja köyhällä päivätyöläisellä
       *     23 vuotta;
       *   - muurien purkumääräys annettiin 9. elokuuta 1854;
       *   - Cerdà sai 2. helmikuuta 1859 keskushallinnolta tehtävän
       *     laatia laajennussuunnitelma vuodessa; kaupunki vastasi
       *     kutsumalla 15. huhtikuuta oman julkisen kilpailunsa;
       *   - keskushallinto hyväksyi Cerdàn kaavan kuninkaallisella
       *     määräyksellä 9. kesäkuuta 1859;
       *   - kaupungin kilpailuun tuli kolmetoista ehdotusta, ja
       *     10. lokakuuta 1859 voittajaksi valittiin yksimielisesti
       *     Antoni Rovira i Trias, jonka tunnuslause kuului: kaupungin
       *     kaava on enemmän ajan kuin arkkitehdin työtä;
       *   - asia ratkesi 8. heinäkuuta 1860, kun ministeriö määräsi
       *     Cerdàn kaavan toteutettavaksi;
       *   - Cerdà julkaisi teoriansa (Teoría General de la Urbanización)
       *     vuonna 1867.
       *
       * FAKTAT (en-Wikipedia "Antoni Rovira i Trias"; haettu
       * 29.8.2026): Rovira (1816–1889) suunnitteli Barcelonetan (1873),
       * El Bornin (1876), Sant Antonin (1879) ja La Concepciónin (1885)
       * katetut torit ja oli mukana purkamassa Ciutadellan linnoitusta.
       */
      id: 'kilpailu',
      nappi: 'Kilpailu, jonka voittaja jäi paperille',
      otsikko: 'Kaksi kaavaa, yksi kaupunki',
      teksti: 'Se ruudukko ei ollut kaupungin oma valinta. Muurien '
        + 'sisällä asui vuonna 1850 satakahdeksankymmentäseitsemäntuhatta '
        + 'ihmistä runsaan kahden neliökilometrin alalla, ja siitä '
        + 'alasta neljäkymmentä prosenttia oli kasarmeja, sairaaloita, '
        + 'luostareita ja kirkkoja: seitsemän kasarmia, yksitoista '
        + 'sairaalaa, neljäkymmentä luostaria ja kaksikymmentäseitsemän '
        + 'kirkkoa. Varakas eli keskimäärin kolmeenkymmeneenkuuteen '
        + 'ikävuoteen, päivätyöläinen kahteenkymmeneenkolmeen. Muurit '
        + 'määrättiin purettaviksi elokuussa 1854, ja niiden takana '
        + 'odotti tyhjä kenttä. Sitten tuli kaksi kaavaa. Insinööri '
        + 'Ildefons Cerdà sai helmikuussa 1859 Madridin hallitukselta '
        + 'tehtäväkseen laatia laajennuksen vuodessa, ja kaupunki vastasi '
        + 'huhtikuussa kutsumalla oman kilpailunsa. Kesäkuun 9. päivänä '
        + 'hallitus hyväksyi Cerdàn kaavan kuninkaallisella '
        + 'määräyksellä — neljä kuukautta ennen kuin kaupungin oma '
        + 'kilpailu edes ratkesi. Lokakuun 10. päivänä kolmestatoista '
        + 'ehdotuksesta valittiin yksimielisesti voittajaksi arkkitehti '
        + 'Antoni Rovira i Trias, jonka kaava levisi vanhastakaupungista '
        + 'säteittäin kuin viuhka ja jonka tunnuslause kuului: kaupungin '
        + 'kaava on enemmän ajan kuin arkkitehdin työtä. Heinäkuussa '
        + '1860 ministeriö päätti asian ja määräsi rakennettavaksi '
        + 'Cerdàn. Rovira ei jäänyt toimettomaksi: hän suunnitteli '
        + 'kaupungille sen katetut torit — Barcelonetan 1873, El Bornin '
        + '1876, Sant Antonin 1879 — ja oli mukana purkamassa '
        + 'Ciutadellan linnoitusta. Isoisäsi käveli siis mahdollisesti '
        + 'juuri valmistuneen torin ohi tietämättä, että sen tekijä oli '
        + 'mies, jonka kaupunki oli valinnut ja jonka valtio oli '
        + 'sivuuttanut.',
      /*
       * Commons 29.8.2026: 1548×1038, public domain, tekijä Antoni
       * Rovira, päiväys 1859, kuvaus "Eixample map of Barcelona. Map
       * from Antoni Rovira i Trias; winner of the Barcelona's eixample
       * bid which was finally assigned to the Plan Cerdà 1859",
       * alkuperäinen Museu d'Història de la Ciutat. Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: käsin väritetty kaavakartta, jossa
       * lukee "PLANO DEL PROYECTO DE ENSANCHE DE LA CIUDAD DE
       * BARCELONA" ja meren kohdalla "MAR MEDITERRANEO" — ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on se kaupunki, jota ei rakennettu.
       * Cerdàn ruudukon näkee ikkunasta; Roviran viuhkan vain tästä.
       */
      kuva: {
        tiedosto: 'EixampleBCN-projecteRovira.jpg',
        selite: 'Antoni Rovira i Triasin voittanut kilpailuehdotus '
          + 'vuodelta 1859: vanhastakaupungista säteittäin avautuva '
          + 'viuhka, jota ei koskaan rakennettu.',
        lahde: 'Antoni Rovira i Trias 1859, Museu d\'Història de la '
          + 'Ciutat / Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Kuka lopulta ratkaisi, kumman kaavan mukaan Barcelona '
          + 'rakennettaisiin?',
        vaihtoehdot: [
          'Madridin keskushallinto',
          'Kaupungin oma kilpailulautakunta',
          'Maanomistajat, jotka omistivat kentän muurien takana',
        ],
        /* Oikea on ensimmäinen JA lyhyin — pisin vaihtoehto on väärä. */
        oikea: 0,
        fakta: 'Kaupungin kilpailun voitti yksimielisesti Antoni Rovira '
          + 'i Trias 10. lokakuuta 1859, mutta hallitus oli hyväksynyt '
          + 'Cerdàn kaavan jo kesäkuussa, ja ministeriö määräsi sen '
          + 'toteutettavaksi heinäkuussa 1860.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js,
   * barcelona[2]: *"Minkä meren rannalla Barcelona sijaitsee?"*
   * → Välimeren. Visasääntö täyttyy: vastaus löytyy tekstistä, mutta
   * kysymyksen sanamuoto ei toistu siinä sellaisenaan — teksti ei kysy
   * eikä kerro, minkä meren rannalla kaupunki on, vaan mitä sille
   * merelle on tapahtunut.
   *
   * MIKSI JUURI TÄMÄ VIIDESTÄ: se on ainoa, jota kaupunkilehti ei
   * käsittele lainkaan (sana "Välimeri" ei esiinny Barcelonan
   * lehtiaineistossa kertaakaan). Kysymys on laudan helpoimpia
   * (level 1), joten oppitunti ei tee siitä vaikeaa vaan tekee siitä
   * kiinnostavan: helppo kysymys saa palkinnokseen sen, mitä kukaan ei
   * arvaa vastausta valitessaan.
   *
   * FAKTAT (en-Wikipedia "Messinian salinity crisis", johdanto sekä
   * osiot "Naming and first evidence", "Further evidence and
   * confirmation" ja "Chronology"; haettu 29.8.2026):
   *   - Välimeri kuivui osittain tai lähes kokonaan Messinian-kauden
   *     lopulla 5,96–5,33 miljoonaa vuotta sitten;
   *   - Gibraltarin salmen edeltäjä sulkeutui noin 5,96 Ma, ja kun
   *     salmi sulkeutui viimeisen kerran noin 5,6 Ma, allas kuivui
   *     lähes kokonaan tuhannessa vuodessa;
   *   - jäljelle jäi 3–5 kilometriä merenpinnan alapuolelle ulottuva
   *     kuiva allas ja muutama Kuolleenmeren kaltainen suolalampi;
   *   - ilman Atlantin sisäänvirtausta haihtuminen vie noin 3 300
   *     kuutiokilometriä vuodessa, ja altaassa on 3,7 miljoonaa
   *     kuutiokilometriä vettä; kuivuminen nostaisi maailman
   *     merenpintaa noin 12 metriä;
   *   - sveitsiläinen geologi Karl Mayer-Eymar (1826–1907) nimesi
   *     kauden 1867 Sisilian Messinan mukaan tutkittuaan fossiileja
   *     kipsipitoisten kerrosten välissä;
   *   - kesällä 1970 Glomar Challenger -aluksen geologit nostivat
   *     Välimeren pohjasta poranäytteitä, joissa oli kipsiä, vuorisuolaa
   *     ja muita haihtumismineraaleja sekä tuulen kuljettamaa pölyä;
   *   - kriisi päättyi 5,33 Ma Zanclean-tulvaan.
   *
   * FAKTAT (en-Wikipedia "Zanclean flood", johdanto sekä osiot "Event",
   * "Timing" ja "Consequences"; haettu 29.8.2026):
   *   - Atlantti täytti altaan takaisin nykyisen Gibraltarin salmen
   *     kautta 5,33 Ma;
   *   - yhdeksänkymmentä prosenttia täyttymisestä tapahtui äkillisesti
   *     arviolta muutamassa kuukaudessa tai enintään kahdessa vuodessa;
   *   - pinta saattoi nousta yli kymmenen metriä vuorokaudessa; vesi
   *     laski yli tuhannen metrin pudotuksen, ja huippuvirtaamaksi on
   *     arvioitu noin 100 miljoonaa kuutiometriä sekunnissa eli noin
   *     450-kertaisesti Amazonin virtaama;
   *   - vesi ei syössyt vesiputouksena vaan kaiversi loivasti laskevan
   *     uoman, joka näkyy salmen pohjan rakenteissa;
   *   - se, tapahtuiko täyttyminen katastrofaalisesti vai vähitellen,
   *     on yhä kiistanalaista, vaikka geologisella mittapuulla se oli
   *     joka tapauksessa hetkessä ohi.
   */
  oppitunti: {
    otsikko: 'Meri, joka kerran kuivui',
    teksti: 'Se meri, jonka rannalla tämä kaupunki seisoo, on ollut '
      + 'nykyisenlaisena olemassa lyhyemmän ajan kuin useimmat luulevat. '
      + 'Välimeri haihtuu enemmän kuin siihen sataa ja virtaa: ilman '
      + 'Atlantin sisäänvirtausta se menettäisi noin kolmetuhatta '
      + 'kolmesataa kuutiokilometriä vettä vuodessa, ja koko altaassa '
      + 'sitä on 3,7 miljoonaa kuutiokilometriä. Laskutoimitus on julma. '
      + 'Kun Gibraltarin salmen edeltäjä sulkeutui noin kuusi miljoonaa '
      + 'vuotta sitten ja lopulta lukkiutui kokonaan, meri kuivui '
      + 'runsaassa tuhannessa vuodessa lähes olemattomiin: jäljelle jäi '
      + 'kolmesta viiteen kilometriä merenpinnan alapuolelle ulottuva '
      + 'kuiva allas ja sen pohjalla muutama Kuolleenmeren kaltainen '
      + 'suolalampi. Nimen tälle ajanjaksolle antoi sveitsiläinen '
      + 'geologi Karl Mayer-Eymar vuonna 1867, kuusi vuotta ennen '
      + 'isoisäsi matkaa; hän nimesi sen Sisilian Messinan mukaan '
      + 'tietämättä, mitä nimi lopulta tarkoittaisi. Todiste nostettiin '
      + 'pohjasta vasta kesällä 1970, kun poraukset toivat pintaan '
      + 'kipsiä, vuorisuolaa ja tuulen kuljettamaa pölyä sieltä, missä '
      + 'nyt on kaksi kilometriä vettä yläpuolella. Ja sitten este '
      + 'petti. Vallitsevan mallin mukaan Atlantti täytti altaan '
      + 'takaisin niin nopeasti, että yhdeksänkymmentä prosenttia '
      + 'tapahtui muutamassa kuukaudessa tai enintään parissa vuodessa: '
      + 'vesi laski yli tuhannen metrin pudotuksen, virtaama oli '
      + 'suurimmillaan arviolta noin 450 kertaa Amazonin virtaama, ja '
      + 'pinta saattoi nousta kymmenen metriä vuorokaudessa. Vesi ei '
      + 'silti syössyt vesiputouksena vaan kaiversi loivan uoman, joka '
      + 'näkyy yhä salmen pohjan alla. Osa tutkijoista pitää '
      + 'täyttymistä hitaampana, ja siitä kiistellään edelleen. Mutta '
      + 'yhdestä asiasta ollaan yhtä mieltä: Barcelonan ranta katsoo '
      + 'mereen, joka on kerran ollut kuiva — ja salmi, joka päästää '
      + 'sen sisään, on nuorempi kuin meri itse.',
    /*
     * Commons 29.8.2026: 2048×1280, CC BY-SA 4.0, Axelspace
     * Corporation, kuvattu 30.6.2016, kuvaus "Strait of Gibraltar, as
     * viewed from Hodoyoshi-1 satellite". Restrictions tyhjä.
     * SILMÄTARKISTUS tehty: satelliittikuva salmesta, laivoja
     * valkoisina viiruina, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Strait of Gibraltar (satellite view).jpg',
      selite: 'Gibraltarin salmi satelliitista: tämän kapeikon '
        + 'sulkeutuminen kuivatti Välimeren ja sen avautuminen täytti '
        + 'sen takaisin.',
      lahde: 'Axelspace Corporation 2016, Wikimedia Commons '
        + '(CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Barcelonalla ei ole tarinakaaren pakettia (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT) eikä riviä js/packs/kohtaamiset.js:ssä, joten tälle
   * kaupungille ei ole valmista hahmoa: alla oleva Roser on EHDOTUS,
   * ei kaanonia. Kortti on esittely; VARSINAINEN KYSYMYS on ennallaan
   * laattamekaniikassa (game.actionQuiz lukee js/packs/
   * europe-questions.js, barcelona), eikä tämä paketti kosketa sitä.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortti rakennetaan ilman
   * kuvaa, joten kentät ovat hahmo, nappi, varmistus, vihjeOsio ja
   * teksti.
   *
   * KAAVA ON AALLON 4A HYVÄKSYTTY: suvun jatkumo, epäusko omaan
   * tarinaan ja portinvartijakysymys. Suvun jatkumon syy on suvun oma
   * (työn kahteen kertaan tekemisen välttäminen), eikä isoisä maksa,
   * tilaa tai käske mitään — varallisuussääntö on tarkistettu virke
   * virkkeeltä.
   *
   * MIKSI LÄHTEENHOITAJA: isoisän merkinnässä Ramblalla myydään vettä
   * laseittain ja Livian kanoninen repliikki sanoo, että vesi maksaa
   * yhä. Kohtaamispiste on Canaletesin lähde, kadun yläpäässä — se
   * vesi, joka ei maksa. Ammatti on siis merkinnän oma, ei uusi keksintö.
   */
  kohtaaminen: {
    hahmo: 'Lähteenhoitaja Roser',
    nappi: 'Tapaa lähteenhoitaja',
    varmistus: 'Haluatko varmasti tavata Roserin juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * barcelona): 'kaupunki' tai 'talot'. Barcelonan viidestä
     * laattakysymyksestä neljä koskee kaupunkia, kieltä, merta ja
     * ruudukkoa, ja niiden tuki on kaupunkisivulla; vain Sagrada
     * Família olisi lähempänä Talot-sivua.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Roser huoltaa kaupungin valurautaisia lähteitä, ja '
      + 'Canaletes on niistä se, jonka ääressä hän joutuu seisomaan '
      + 'pisimpään: matkailijat juovat siitä ja odottavat sanovansa '
      + 'jotakin, joka toteutuu. Hänen isoäitinsä isä hoiti samoja '
      + 'suihkuja, ja perheellä on vihko, johon on merkitty mikä suihku '
      + 'tukkeutuu minäkin kuukautena — ei siksi että joku olisi '
      + 'käskenyt, vaan siksi että ilman vihkoa sama työ tehdään '
      + 'kahdesti. Roser sanoo suoraan pitävänsä koko taikauskoa '
      + 'tyhjänä: vesi on vettä ja paluu on lippu. Silti hän puhdistaa '
      + 'suuttimet ennen kuin kukaan ehtii katsoa niitä. Vieraita hän on '
      + 'nähnyt monta, ja useimmat kysyvät ensin, mistä vesi tulee. '
      + 'Ennen kuin hän kertoo mitään omastaan, hän haluaa tietää, '
      + 'tunteeko tulija tätä kaupunkia enempää kuin nimeltä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Sofialla, Madridilla ja
   * Sevillalla.
   */

  /*
   * KOHTAAMISPAIKKA: CANALETESIN LÄHDE, Ramblan yläpää.
   *
   * 41,38528 N / 2,17014 E — ca-Wikipedia "Font de Canaletes",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin muilla fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU (ajettu Noden kanssa samalla funktiolla, jolla Madridin
   * paketin luvut tarkistuvat pilkulleen):
   *   maailmankartta  x = ((2,17014 − (−175)) mod 360) × (12000/360)
   *                     = 177,17014 × 33,3333… = 5905,7
   *                   y = (millerY(41,38528) − millerY(76)) × 12000/2π
   *                     = 1748,1
   *   europe          x = (2,17014 + 11) × 19,2 = 252,9
   *                   y = (72 − 41,38528) × 26,3 = 805,2
   *
   * TARKISTUS BARCELONAN LAATTAA VASTEN. Euroopan laudalla laatta on
   * 244 / 800 (js/packs/europe.js), eli piste jää siitä noin kymmenen
   * yksikön päähän kaakkoon — alle js/fokuspiste.js:n PISTE_ERO_MIN
   * -rajan (14), joten peli siirtää pisteen itse koilliseen. Niin
   * pitääkin: lähde on kaupungin keskustassa. Maailmankartalla laatta
   * on 5890,3 / 1740,3 (js/packs/maailmankartta.js), jolloin ero on
   * noin seitsemäntoista yksikköä eli rajan yli, ja piste jää siihen,
   * mihin se laskettiin. Kumpaakaan laattaa ei siirretä.
   */
  kohtaamispiste: {
    nimi: 'Canaletesin lähde',
    laudat: {
      maailmankartta: { x: 5905.7, y: 1748.1 },
      europe: { x: 252.9, y: 805.2 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Barcelonan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Barcelona",
   * 2 = Talot, 3 = Menovinkit (Espanjan maapaketista, js/packs/
   * maa-kategoriat.js ESP).
   *
   * MIKSI 2 JA 3. Raamattu vaatii kysymyksen jokaiselle sivulle paitsi
   * etusivulle. Sivun 1 kysymys on Barcelonan kulttuurivisa (js/packs/
   * europe-kulttuuri.js, ihmistornin enxaneta), jonka js/fokustehtavat.js
   * pukee samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   * Sivu 3 (Menovinkit) on tyhjä, joten JULISTE menee sinne kuten
   * Madridissa ja Sevillassa.
   *
   * SIVU 2 ON AINOA PAIKKA AARTEEN TOISELLE AVAAJALLE — JA SE MAKSAA
   * JOTAKIN. Talot-sivulla on jo lehden OMA minitehtävä (Palau de la
   * Música Catalanan sali, joka ei tarvitse sähkövaloa), ja
   * js/fokustehtavat.js piirraSivunTehtava antaa nimetyn tehtävän
   * voittaa sivun oman. Tämän rivin myötä Palau-kysymys jää siis
   * piiloon niin kauan kuin fokusvirta on Barcelonassa päällä. Sama
   * ratkaisu on jo Tukholmassa (aarre sivulla 2, jolla on oma tehtävä),
   * mutta se on tietoinen ja se on raportoitu: jos Fable tai omistaja
   * haluaa Palaun takaisin, tämä yksi rivi poistetaan — sivun 1
   * kulttuurivisa avaa aarteen yksinäänkin, eikä mitään muuta tarvitse
   * muuttaa.
   *
   * PALKINNOT: 'piste' sytyttää kartalle vihreän kohtaamispisteen
   * (js/fokuspiste.js), 'juliste' myöntää kaupungin aikakausjulisteen.
   * Barcelonan juliste ON olemassa (js/packs/julisteet.js, `barcelona`:
   * "Barcelona 1888"), joten JULISTE-tehtävä lunastaa lupauksensa heti
   * eikä jää pelkäksi rahapalkkioksi.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: SARDANA_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: NAYTTELY_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: Vigon lahden hopealasti. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta), samaan matkakirja-
   * korttiin kuin saapumismerkintä.
   */
  aarremerkinta: {
    teksti: 'Satamakapakassa laulettiin laulua lahdesta pohjoisessa, '
      + 'jonne upposi laivasto hopeaa lasteinaan — ja joka mies vannoi '
      + 'tietävänsä jonkun, joka melkein nosti sen. Melkein on tässä '
      + 'maassa raskain sana. Kirjoitan laulun säkeen muistiin: "hopea '
      + 'makaa Vigossa, kärsivällisyys sen perii."',
  },
};
