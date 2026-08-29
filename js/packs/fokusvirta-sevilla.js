/*
 * SEVILLAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4A.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle: samat kentät, sama
 * järjestys, sama moottori (js/fokusvirta.js). Uusi kaupunki on yksi
 * tiedosto ja yksi rivi rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ
 * PAKETTI EI KIRJOITA SITÄ RIVIÄ eikä koske sw.js:ään, savukkeisiin
 * tai mihinkään muuhun tiedostoon: aallon 4A seitsemän kaupunkia kokoaa
 * integrointiagentti yhtenä nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4A kaanonpaperi).
 * NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Vigon lahden hopealasti — sama Espanjan aarre kuin
 * Madridilla (aarremerkintä alla on Sevillan oma merkintä samasta
 * lastista, ei Madridin toisinto).
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `sevilla`), ja sen takana on kaksi
 * työaineistoa: docs/mantereet-tyoaineisto/faktapohja-sevilla.md ja sen
 * riippumaton ristiintarkistus tarkistus-sevilla.md. Tämän paketin
 * sisältö nojaa kolmeen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Lehden omat nostot (Trianan silta,
 *      tupakkatehdas, Torre del Oro, katkera appelsiini) — nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin, ja kaksi
 *      lehtitehtävän visaa on koottu niistä ilman yhtään uutta
 *      faktaväitettä.
 *   2. TYÖAINEISTON JO TARKISTETUT NOSTOT. Täkynosto `iberianilves` on
 *      docs/mantereet-tyoaineisto/takynostot-espanja.md:n ehdokas 10
 *      (VARMA, kuva imageinfo-tarkistettu jo siellä).
 *   3. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli ja osio kerrallaan, ja jokaisen
 *      kohdan oma kommentti nimeää artikkelin. Mitään ei ole päätelty,
 *      pyöristetty eikä muistettu.
 *
 * ── VIISI OMISTAJAN LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ─────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen. Kortti piirtyy ilman
 *      kuvaa (js/ui.js naytaFactValokuva saa nullin).
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (sevilla/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`), joten portin mitta on
 *      oletus (yksi täky) ja kuplan otsikko moottorin oma.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA (omistajan tuore
 *      linjaus). Kohtaamisessa on siis vain hahmo, nappi ja teksti.
 *   5. TÄKYNOSTOILLA EI OLE KIINTIÖTÄ (Raamattu): määrä seuraa maan
 *      sisältörikkautta. Espanja on rikas, joten tässä on VIISI (ks.
 *      TÄKYNOSTOPOOLI alempana ja sen tärkeä huomautus ESP-poolista).
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa, Sofiassa ja Madridissa: vastaus löytyy
 * syvennystekstistä, mutta kysymyksen sanamuoto ei toistu siinä
 * sellaisenaan. Oikea vaihtoehto on aina indeksi 0 (talon tapa, koko
 * rekisteri kirjoittaa niin, eikä moottori sekoita vaihtoehtoja) —
 * mutta oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston
 * visassa. Se on tarinakaaren mittausvaatimus (docs/moduulit/
 * tarinakaari.md, luku 6 kohta 2), ja se on tarkistettu käsin.
 *
 * ── LAATTAKYSYMYSTÄ EI SPOILATA ────────────────────────────────────
 *
 * Sevillan laattakysymykset ovat js/packs/europe-questions.js:n
 * `sevilla`-lohkon viisi: Guadalquivir, roomalaisnimi Hispalis,
 * oliiviöljyn vienti amforoissa, Amerikan-kaupan yksinoikeus ja
 * katedraalin kellotorni. Kaupungilla EI ole tarinakaaren pakettia
 * (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten kohtaamisen takana
 * on juuri tuo laattakysymys.
 *
 * Oppitunti pohjustaa niistä KOLMANNEN (oliiviöljy amforoissa) — se on
 * ainoa viidestä, jota kaupunkilehti ei käsittele lainkaan, ja
 * tarkistusraportin mukaan juuri "oliiviöljy/amfora" ei esiinny lehden
 * nostoteksteissä. Kumpikaan lehtitehtävä ei koske yhtäkään viidestä:
 * AARTEEN AVAUS kysyy venesillasta ja JULISTE katkerasta appelsiinista.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 600–800 pikselin esikatseluna: yhdessäkään ei ole
 * tunnistettavia eläviä ihmisiä (faktapohjan osion 6 erityisehto).
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Tukholmassa: yksi kuva per kortti, `tiedosto`-kenttä. Aiheet on
 * kirjattu raporttiin.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu. `matkakirja.aanite` on silti
 * kirjoitettu etukäteen (sama ratkaisu kuin Roomassa ja Madridissa):
 * kenttä on KYTKENTÄ eikä lupaus tiedoston olemassaolosta. Ennen
 * generointiajoa mp3 puuttuu, jolloin kortin kaiutin näkyy mutta jää
 * soimatta — js/luenta.js playDiaryVoice kokeilee ämpärin jälkeen repon
 * polun ja vaikenee siististi. Työnkulku .github/workflows/
 * generoi-luennat.yml kirjoittaa täsmälleen alla nimetyn tiedoston.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa ja Madridissa:
 * lista tiedoston lopussa lukee ne muuttujista, jolloin uusi käyttö ei
 * koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Venesiltakysymys on Sevillan lehden sivun 1
 * ("Sevilla") oman noston "Silta joka korvasi seitsemän vuosisadan
 * venesillan" tekstiä ja appelsiinikysymys saman sivun noston
 * "Katupuiden hedelmät, jotka päätyvät mämmiin" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI TORRE DEL ORO -KYSYMYSTÄ, vaikka lehdessä on siitä nosto:
 * Livian kanoninen repliikki sanoo tornin nimestä *"joko auringosta tai
 * kullasta, eikä kukaan ole ihan varma kummasta"*, ja lehden nosto
 * sanoo saman asian yksiselitteisesti (laastin, kalkin ja heinän
 * kultainen hohde). Visa pakottaisi valitsemaan kannan Livian
 * epävarmuutta vastaan. Ero on kirjattu raporttiin Fablelle; tässä
 * tiedostossa kumpaakaan ei muuteta.
 */
const VENESILTA_VISA = {
  kysymys: 'Sevillan ja Trianan välillä oli lähes seitsemän vuosisadan '
    + 'ajan kulkuyhteys, jonka kiinteä silta korvasi vasta 1852. '
    + 'Millainen se oli?',
  vaihtoehdot: [
    'Ankkuroitujen veneiden päälle rakennettu kansi',
    'Roomalaisten kivisilta, jota korjattiin yhä uudestaan',
    'Köyttä pitkin kulkenut lautta, jota vedettiin käsin',
  ],
  oikea: 0,
  fakta: 'Venesilta rakennettiin 1171 kalifi Abu Yaqub Yusufin aikana. '
    + 'Sen korvannut Puente de Isabel II on 149 metriä pitkä ja '
    + 'kaupungin ensimmäinen pysyvä silta.',
};

const APPELSIINI_VISA = {
  kysymys: 'Sevillan katupuiden appelsiinit kerätään kerran vuodessa ja '
    + 'laivataan pois. Mihin ne menevät?',
  vaihtoehdot: [
    'Britanniaan marmeladiksi',
    'Ranskaan, jossa niistä tislataan hajuvettä',
    'Italiaan, jossa niistä keitetään likööriä',
  ],
  oikea: 0,
  fakta: 'Katkerassa appelsiinissa on enemmän pektiiniä kuin makeassa, '
    + 'joten hillo hyytyy paremmin. Varhaisin tunnettu resepti '
    + '"marmelet of oranges" on vuodelta 1677 — ja saman hedelmän kuorta '
    + 'jauhetaan suomalaiseen mämmiin.',
};

export const FOKUSVIRTA_SEVILLA = {
  kaupunki: 'sevilla',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Sevilla, huhtikuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Guadalquivir tuo meren hajun kolmekymmentä peninkulmaa '
      + 'sisämaahan, ja sen rannalla seisoo kultainen torni, jonka nimi '
      + 'on suurempi kuin sen kunto. Tupakkatehtaassa työskentelee '
      + 'tuhansia naisia — heidän sormensa kääntävät lehtiä nopeammin '
      + 'kuin pankkiirin sormet seteleitä. Espanja on tänä keväänä '
      + 'tasavalta, eikä kukaan osaa sanoa, kuinka kauan. Appelsiinipuut '
      + 'kukkivat siitä huolimatta.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[curious] Guadalquivir tuo meren hajun kolmekymmentä '
      + 'peninkulmaa sisämaahan, ja sen rannalla seisoo kultainen torni, '
      + 'jonka nimi on suurempi kuin sen kunto. [excited] '
      + 'Tupakkatehtaassa työskentelee tuhansia naisia — heidän sormensa '
      + 'kääntävät lehtiä nopeammin kuin pankkiirin sormet seteleitä. '
      + '[softly] Espanja on tänä keväänä tasavalta, eikä kukaan osaa '
      + 'sanoa, kuinka kauan. [whispers] Appelsiinipuut kukkivat siitä '
      + 'huolimatta.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-sevilla.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja lopussa
     * ("mut"), keskellä sanat ovat auki; pronominit kokonaisina; ei
     * huutomerkkejä.
     *
     * MIKSI TEHDAS EIKÄ TASAVALTA: Madridin Livia laskee jo tasavallan
     * neljä johtajaa yhdentoista kuukauden sisään (js/packs/
     * fokusvirta-madrid.js), ja sama havainto kahdessa saman maan
     * kaupungissa olisi kaava. Tämä maadoitus vastaa siihen isoisän
     * lauseeseen, jota Madrid ei koske: naisten sormiin.
     *
     * FAKTAKURI: kolme väitettä, kaikki pelin omasta jo hyväksytystä
     * Sevilla-aineistosta (js/packs/kulttuuri-kategoriat.js, nosto
     * "Tehdas, jossa vauvat nukkuivat työpöytien vieressä" ja sen
     * selite). (1) Rakennus oli Espanjan toiseksi suurin El Escorialin
     * jälkeen. (2) Sikarintyö siirtyi naisille vuoden 1811 sulkemisen
     * jälkeen, ja 1880-luvun huipussaan siellä työskenteli noin 6 000
     * naista. (3) Talossa toimii nykyään Sevillan yliopisto.
     */
    maadoitus: 'Kääk. Isoisäsi katsoi oikeaan suuntaan: se tehdas oli '
      + 'niin iso, että Espanjassa vain Escorial voitti sen, ja '
      + 'sikarintyö oli siellä kokonaan naisten. Parhaimmillaan '
      + '1880-luvulla samassa talossa käänsi lehtiä noin kuusituhatta '
      + 'naista yhtä aikaa. Nyt siinä on yliopisto, eli riveissä '
      + 'istutaan yhä — mut nykyään kaikki katsovat samaan suuntaan.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     *
     * HUOM KUVAN JA TEKSTIN SUHTEESTA. Repliikki nimeää kultaisen
     * tornin, mutta lehden avauskarusellin ensimmäinen hero on Giralda
     * (js/packs/kulttuuri-kategoriat.js, sevilla/avauskuvat) — Torre del
     * Orosta ei ole generoitua heroa. Omistajan linjaus sanoo, että
     * pöllön kuva on LEHDEN hero, ja kaanon on sanatarkka, joten
     * kumpaakaan ei ole väännetty toisensa mukaan: kuvaksi on otettu
     * karusellin ensimmäinen hero ja ero on kirjattu raporttiin. Jos
     * Torre del Oro -hero generoidaan myöhemmin, vaihto on tässä yhden
     * rivin työ.
     */
    teksti: 'Sevillassa tuoksuu edelleen appelsiininkukka, keväällä ihan '
      + 'tosissaan.. Se kultainen torni on saanut nimensä joko '
      + 'auringosta tai kullasta, eikä kukaan ole ihan varma kummasta. '
      + 'Isoisäsi aikaan täällä kääriltiin puolet Euroopan sikareista. '
      + 'Katsotaan mitä hän täältä merkitsi muistiin..',
    kuva: {
      ampari: 'herokoe/hero-sevilla-aamu.png',
      /* Selite on lehden oman avauskuvan selite lyhennettynä yhdeksi
       * virkkeeksi; yksikään luku ei muutu. */
      selite: 'Sevillan Giralda rakennettiin almohadien minareetiksi '
        + '1184–1198, ja sen huipulle nostettiin 1568 nelimetrinen, '
        + '1 500 kilon pronssinen tuuliviiri Giraldillo.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkintä alkaa joesta, joka tuo meren
       * hajun sisämaahan. Tämä on sama joki toisin päin — reitti, jota
       * pitkin lähdettiin merelle, ja ainoa retki, joka palasi
       * kalenteri väärässä.
       *
       * FAKTAT (en-Wikipedia "Magellan expedition", johdanto sekä osiot
       * lähdöstä, Kap Verden pysähdyksestä, paluusta ja seurauksista;
       * haettu 29.8.2026):
       *   - viisi laivaa lähti Sevillasta 10.8.1519 ja laskeutui
       *     Guadalquiviria Sanlúcar de Barramedaan; purjeet nostettiin
       *     20.9.1519, mukana noin 270 miestä;
       *   - Magalhães kuoli Filippiineillä huhtikuussa 1521, ja Juan
       *     Sebastián Elcano toi Victorian kotiin;
       *   - Kap Verdellä 9.7.1522 miehistö kuuli, että paikallinen
       *     päiväys oli 10. heinäkuuta — päivä enemmän kuin heidän omat
       *     tarkat kirjanpitonsa; portugalilaiset pidättivät 13 miestä,
       *     kun selvisi että lastina oli idän mausteita;
       *   - Victoria pääsi karkuun 26 tonnin mauste- eli neilikka- ja
       *     kanelilastin kanssa ja saapui Sanlúcariin 6.9.1522, mistä
       *     purjehdittiin jokea ylös Sevillaan; kannella oli 18 miestä
       *     alkuperäisestä 270:stä;
       *   - päivä oli hävinnyt, koska matka kiersi maapallon länteen eli
       *     samaan suuntaan kuin aurinko näyttää kulkevan. Kardinaali
       *     Gasparo Contarini selitti ilmiön ensimmäisenä Euroopassa.
       *
       * MITÄ EI KERROTA: kapinat, teloitukset ja Filippiinien taistelu.
       * 13+ sallii vaaran, mutta tämä täky on mittaustarina.
       */
      id: 'victoria',
      nappi: 'Laivue, joka palasi päivän myöhässä',
      otsikko: 'Victorian kadonnut päivä',
      teksti: 'Elokuun 10. päivänä 1519 viisi laivaa irrotti köydet tässä '
        + 'kaupungissa ja laskeutui Guadalquiviria alas Sanlúcariin, joen '
        + 'suulle. Purjeet nostettiin vasta syyskuun 20. päivänä, ja '
        + 'mukana oli noin 270 miestä. Kolmen vuoden päästä palasi yksi '
        + 'laiva, Victoria, ja sen kannella kahdeksantoista miestä. '
        + 'Matkan varrella oli kuollut myös retkikunnan johtaja. Mutta '
        + 'tässä on se kohta, joka isoisääsi kiinnostaisi kaikkein '
        + 'eniten. Kap Verdellä miehet nousivat maihin ostamaan ruokaa ja '
        + 'kuulivat, että päivä oli kymmenes heinäkuuta. Heidän omassa '
        + 'kirjanpidossaan oli yhdeksäs. He olivat merkinneet joka ikisen '
        + 'päivän kolmen vuoden ajan, eikä yhtäkään ollut jäänyt '
        + 'kirjaamatta — ja silti yksi puuttui. Portugalilaiset '
        + 'pidättivät kolmetoista miestä, kun selvisi mitä ruumassa oli, '
        + 'mutta Victoria pääsi pakoon kaksikymmentäkuusi tonnia '
        + 'neilikkaa ja kanelia kyydissään ja purjehti syyskuussa 1522 '
        + 'jokea ylös samaan satamaan, josta oli lähtenyt. Päivä oli '
        + 'kadonnut siksi, että laiva oli kiertänyt maapallon länteen, '
        + 'samaan suuntaan kuin aurinko näyttää kulkevan taivaalla. Sitä '
        + 'ei ollut osannut odottaa kukaan.',
      /*
       * Commons 29.8.2026: 4001×2771, public domain, Abraham Ortelius,
       * päiväys 1589, Restrictions tyhjä. SILMÄTARKISTUS tehty: painettu
       * kartta, ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: Victoriasta ei ole aikalaiskuvaa, mutta
       * Orteliuksen Tyynenmeren kartta piirtää laivan keskelle merta
       * ja on ensimmäinen painettu kartta tuosta merestä. Kartanpiirtäjän
       * pojanpojalle sopii kartta paremmin kuin muotokuva.
       */
      kuva: {
        tiedosto: 'Ortelius - Maris Pacifici 1589.jpg',
        selite: 'Abraham Orteliuksen Maris Pacifici vuodelta 1589 on '
          + 'ensimmäinen painettu kartta Tyynestämerestä, ja sen keskellä '
          + 'purjehtii Victoria.',
        lahde: 'Abraham Ortelius 1589, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä Victorian miehistö huomasi Kap Verdellä, kun se '
          + 'nousi maihin ostamaan ruokaa?',
        vaihtoehdot: [
          'Kalenteri oli päivän jäljessä',
          'Laivan nimi oli poistettu Sevillan satamarekisteristä',
          'Espanjassa oli sillä välin vaihtunut kuningas',
        ],
        oikea: 0,
        fakta: 'Länteen kiertänyt matka kadottaa yhden päivän, ja juuri '
          + 'tämä havainto johti aikanaan päivämäärärajan '
          + 'sopimiseen. Lähtijöitä oli noin 270, palaajia kahdeksantoista.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: merkintä sanoo, että joki tuo meren hajun
       * kolmekymmentä peninkulmaa sisämaahan. Tämä kertoo, miksi:
       * kaupungin ja Atlantin välissä ei ole rannikkoa vaan suisto, joka
       * oli kerran merenlahti.
       *
       * FAKTAT (en-Wikipedia "Doñana National Park", johdanto sekä osiot
       * geologiasta, historiasta, dyyneistä, linnuista ja nisäkkäistä;
       * haettu 29.8.2026):
       *   - puisto on Andalusiassa Huelvan, Cádizin ja SEVILLAN
       *     maakuntien alueella, pinta-ala 543 km²;
       *   - alue on Las Marismas, Guadalquivirin suisto; merenpinnan
       *     nousun huipulla 6 500–7 000 vuotta sitten sinne muodostui
       *     laguuni, jota roomalaiset kutsuivat nimellä Lacus
       *     Ligustinus, ja se on täyttynyt sedimentillä viimeiset 6 000
       *     vuotta;
       *   - talvella alueella on tyypillisesti jopa 200 000 muuttavaa
       *     vesilintua ja vuodessa yli 300 lintulajia;
       *   - liikkuvat dyynit (transdunes) syntyvät lounaistuulesta ja
       *     hautaavat puita, jotka kuolevat pystyyn — alueen tunnetuin
       *     ilmiö;
       *   - Alfonso X perusti alueelle kuninkaallisen metsästysmaan
       *     1262; nimi tulee Ana de Silva y Mendozasta, 7. Medina
       *     Sidonian herttuan puolisosta;
       *   - kansallispuisto perustettiin 1969, kun WWF ja Espanjan
       *     valtio ostivat osan suoalueesta; Unescon maailmanperintöä
       *     1994; nisäkkäitä on kirjattu 38 lajia, joukossa iberianilves.
       */
      id: 'donana',
      nappi: 'Joen suu, joka oli kerran merenlahti',
      otsikko: 'Doñana ja Las Marismas',
      teksti: 'Sevillasta alavirtaan joki ei kapene vaan leviää. Siellä '
        + 'missä Guadalquivir tapaa Atlantin, on suisto nimeltä Las '
        + 'Marismas, ja sen ympärillä Doñana: 543 neliökilometriä suota, '
        + 'matalia uomia ja hiekkadyynejä Huelvan, Cádizin ja Sevillan '
        + 'maakuntien alueella. Kuusi ja puoli tuhatta vuotta sitten '
        + 'siinä kohdassa ei ollut suota vaan iso merenlahti, ja '
        + 'roomalaiset tunsivat sen nimellä Lacus Ligustinus. Lahti on '
        + 'täyttynyt hiekasta ja liejusta siitä lähtien — se sama '
        + 'täyttyminen, joka aikanaan matalsi joen laivoille. Nyt siellä '
        + 'talvehtii parhaimmillaan kaksisataatuhatta vesilintua, ja '
        + 'vuoden mittaan alueella nähdään yli kolmesataa lintulajia. '
        + 'Rannalla tapahtuu jotain, mitä muualla Iberiassa ei juuri näe: '
        + 'lounaistuuli työntää dyynejä hitaasti sisämaahan, ja ne '
        + 'hautaavat mäntymetsää alleen. Puut kuolevat pystyyn ja '
        + 'katoavat hiekkaan latvasta alkaen. Alfonso X otti alueen '
        + 'kuninkaalliseksi metsästysmaaksi jo 1262, ja se pysyi '
        + 'herrasväen mailla vuosisatoja; kansallispuisto siitä tuli '
        + 'vasta 1969. Sen suojissa elää yhä yksi Euroopan '
        + 'harvinaisimmista kissaeläimistä.',
      /*
       * Commons 29.8.2026: 4896×2760, CC BY-SA 4.0, tekijä "Birding In
       * Spain", kuvattu 26.10.2018, kuvaus "Coto Doñana marshes after
       * spring rains". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * tulvinut suoniitty ja puuaita, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Coto Doñana marshes.jpg',
        selite: 'Doñanan suot kevätsateiden jälkeen: Guadalquivirin '
          + 'suisto täyttyy vedellä, ja talvella alueella voi olla '
          + 'kaksisataatuhatta vesilintua yhtä aikaa.',
        lahde: 'Birding In Spain, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mikä oli Lacus Ligustinus, jonka roomalaiset tunsivat '
          + 'Guadalquivirin suulla?',
        vaihtoehdot: [
          'Merenlahti, joka on sittemmin täyttynyt',
          'Sevillan muurien sisään rakennettu vesiallas',
          'Roomalaisten kaivama kanava kohti Cádizia',
        ],
        oikea: 0,
        fakta: 'Doñanan liikkuvat dyynit hautaavat rannan mäntymetsää '
          + 'alleen, ja alueella on kirjattu 38 nisäkäslajia. '
          + 'Kansallispuisto perustettiin 1969.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä on huhtikuulta, ja Sevillan huhtikuu
       * on ollut vuodesta 1847 lähtien yhden juhlan nimissä. Täky ei
       * väitä, että isoisä olisi nähnyt sen — hän ei kirjoita siitä
       * sanaakaan, ja se on tässä täkyn oma kärki.
       *
       * FAKTAT (en-Wikipedia "Seville Fair", osiot "History" ja
       * "Location"; haettu 29.8.2026):
       *   - juhla juontuu vuoteen 1846, jolloin kaksi Pohjois-Espanjassa
       *     syntynyttä kaupunginvaltuutettua, baski José María Ybarra ja
       *     katalaani Narciso Bonaplata, esittivät karjamessuja;
       *   - kuningatar Isabel II hyväksyi ehdotuksen, ja ensimmäinen
       *     feria pidettiin 18.4.1847 Prado de San Sebastiánilla
       *     kaupungin laidalla;
       *   - vuodessa luonne muuttui juhlaksi, kun syntyivät kolme
       *     ensimmäistä casetaa: Montpensier'n herttuaparin, kaupungin
       *     ja Sevillan kasinon;
       *   - 1920-luvulla juhla sai nykyisen mittansa;
       *   - vuodesta 1973 se on ollut Real de la Ferialla, 24 korttelia
       *     ja 450 000 neliömetriä; vuonna 2012 casetoja oli 1 048;
       *   - portada eli pääportti rakennetaan kuukausia etukäteen, ja
       *     paikan siivoamiseen menee viikkoja.
       *
       * RAJAUS: härkätaisteluista ei kirjoiteta tässä mitään, vaikka
       * ferian päiväohjelma liittyy niihin (Perustuslaki, pilari 3:
       * ilmiö ilman ihannointia ja ilman tuomitsemista — helpoin tapa
       * noudattaa sitä yhden täkyn mitassa on jättää aihe pois).
       */
      id: 'feria',
      nappi: 'Kaupungin oma juhla alkoi karjamessuina',
      otsikko: 'Huhtikuun feria',
      teksti: 'Jos jokin on Sevillassa sevillalaista, se on huhtikuun '
        + 'feria — ja sen keksi kaksi miestä, jotka eivät olleet '
        + 'kotoisin täältä. Vuonna 1846 kaksi kaupunginvaltuutettua, '
        + 'baski José María Ybarra ja katalaani Narciso Bonaplata, '
        + 'esittivät kaupungille karjamessuja. Kuningatar Isabel II '
        + 'hyväksyi ehdotuksen, ja ensimmäiset messut pidettiin 18. '
        + 'huhtikuuta 1847 Prado de San Sebastiánilla, silloisen '
        + 'kaupungin laidalla. Ne olivat markkinat: hevosia, härkiä, '
        + 'kauppaa ja kättenlyöntejä. Yksi vuosi riitti kääntämään koko '
        + 'asian, sillä seuraavaan feriaan ilmestyivät kolme '
        + 'ensimmäistä casetaa eli juhlatelttaa — Montpensier’n '
        + 'herttuaparin, kaupungin ja Sevillan kasinon — ja sen jälkeen '
        + 'niitä on tullut lisää joka vuosi. Nykyään ferialla on oma '
        + 'kaupunginosansa: neljäkolmatta korttelia, 450 000 '
        + 'neliömetriä, ja vuonna 2012 laskettiin 1 048 casetaa. '
        + 'Pääportti rakennetaan kuukausia etukäteen ja puretaan '
        + 'viikoissa. Isoisäsi käveli täällä huhtikuussa, kun messut '
        + 'olivat jo kuudenkolmatta vuoden ikäiset, eikä kirjoittanut '
        + 'niistä riviäkään. Hän katsoi tehdasta ja tornia.',
      /*
       * Commons 29.8.2026: 4500×3583, public domain, Andrés Cortés y
       * Aguilar (1810–1879), päiväys "1800-luvun puoliväli", omistaja
       * Sevillan kaupunki. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * maalaus, jossa telttoja, hevosia ja väkeä kaukana; taustalla
       * katedraali ja Giralda sekä Puerta de San Fernando, joka
       * purettiin 1868. Ei valokuvattuja ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on ferian aikalaiskuva noin isoisän
       * vuosikymmeniltä ja näyttää juuri sen, mistä täky kertoo —
       * markkinat, joista tuli juhla.
       */
      kuva: {
        tiedosto: 'La feria de Sevilla, de Andrés Cortés y Aguilar (Ayuntamiento de Sevilla).jpg',
        selite: 'Andrés Cortés y Aguilarin maalaus Sevillan feriasta '
          + '1800-luvun puolivälistä: taustalla katedraali, Giralda ja '
          + 'vuonna 1868 purettu Puerta de San Fernando.',
        lahde: 'Andrés Cortés y Aguilar, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Millaiseksi tapahtumaksi Sevillan huhtikuun juhla '
          + 'alun perin perustettiin?',
        vaihtoehdot: [
          'Karjamessuiksi',
          'Kuningattaren vierailun kunniajuhlaksi',
          'Sadonkorjuun päätöstä juhlivaksi kulkueeksi',
        ],
        oikea: 0,
        fakta: 'Ehdotuksen tekivät baski José María Ybarra ja katalaani '
          + 'Narciso Bonaplata vuonna 1846. Ensimmäiset messut pidettiin '
          + '18. huhtikuuta 1847, ja vuotta myöhemmin pystytettiin kolme '
          + 'ensimmäistä casetaa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js, sevilla[2]:
   * *"Mitä Sevillasta vietiin roomalaisaikana Roomaan amforoissa?"*
   * → oliiviöljyä. Visasääntö täyttyy: vastaus löytyy tekstistä, mutta
   * kysymyksen sanamuoto ei toistu siinä sellaisenaan — teksti ei puhu
   * viennistä Sevillasta vaan siitä, mitä Roomaan jäi jäljelle.
   *
   * MIKSI OPPITUNTI ON ROOMASSA EIKÄ SEVILLASSA: koska todiste on
   * siellä. Kaupunkilehti kertoo joen ja kaupungin, tämä kertoo
   * määränpään — ja kaupunkilehti ei käsittele amforoita lainkaan
   * (tarkistus-sevilla.md: "oliiviöljy/amfora eivät esiinny
   * nostoteksteissä"), joten oppitunti ei ole lehden toisinto.
   *
   * FAKTAT (en-Wikipedia "Monte Testaccio", johdanto sekä osiot
   * "Structure and purpose" ja "Tituli picti"; haettu 29.8.2026):
   *   - keinotekoinen kukkula Rooman Testacciossa, lähes yksinomaan
   *     rikottuja amforoita; pohjan pinta-ala 2 hehtaaria, tilavuus n.
   *     580 000 kuutiometriä, ympärysmitta lähes kilometri, korkeus 35
   *     metriä, arviolta 53 miljoonan amforan sirpaleet;
   *   - suurin osa on Baetican eli nykyisen Guadalquivirin seudun
   *     70-litraisia Dressel 20 -ruukkuja; mukana pienempiä määriä
   *     Tripolitaniasta ja Byzacenasta, kaikki öljyruukkuja;
   *   - tuonnin huippu oli 100-luvun lopulla, jolloin kukkulalle
   *     päätyi jopa 130 000 amforaa vuodessa, eli vähintään 7,5
   *     miljoonaa litraa öljyä vuosittain;
   *   - kukkula ei ole kaatopaikka vaan rakennettu: vuoden 1991
   *     kaivaukset osoittivat tasaiset terassit ja tukimuurit lähes
   *     ehjistä amforoista; tyhjät ruukut vietiin ylös aasien selässä
   *     ja rikottiin paikan päällä; sirpaleiden päälle siroteltiin
   *     kalkkia härskiintyneen öljyn hajun takia;
   *   - Dressel 20 hajosi isoiksi kaareviksi paloiksi, joita ei saanut
   *     hienoksi, ja rasvainen savi ei kelvannut opus signinum
   *     -betoniin, koska öljy ja kalkki muodostavat saippuaa — siksi
   *     juuri öljyruukkuja ei kierrätetty;
   *   - ruukkuihin maalattiin tituli picti: tyhjän ruukun paino,
   *     viejän nimi, öljyn paino, punnitsijoiden nimikirjoitukset ja
   *     tilan sijainti; ruukuntekijä leimasi usein korvan.
   */
  oppitunti: {
    otsikko: 'Kukkula, joka on tehty rikotuista ruukuista',
    teksti: 'Roomassa on kukkula, joka ei ole maata. Monte Testaccio on '
      + '35 metriä korkea, sen ympärysmitta on lähes kilometri, ja se on '
      + 'tehty kokonaan rikotuista saviruukuista — arviolta '
      + 'viidenkymmenenkolmen miljoonan amforan sirpaleista. Melkein '
      + 'kaikki niistä olivat oliiviöljyruukkuja, ja melkein kaikki '
      + 'tulivat Baeticasta eli tämän joen laaksosta. Ruukku oli '
      + 'seitsemänkymmenen litran pallo, ja niitä purettiin Rooman '
      + 'satamassa 100-luvun lopulla parhaimmillaan satakolmekymmentä '
      + 'tuhatta vuodessa. Kukkula ei syntynyt sotkusta vaan '
      + 'järjestyksestä: vuoden 1991 kaivaukset paljastivat, että se on '
      + 'ladottu tasaisiksi terasseiksi, joiden tukimuureina on lähes '
      + 'ehjiä ruukkuja täytettynä sirpaleilla. Tyhjät amforat kannettiin '
      + 'ylös aasien selässä, rikottiin paikan päällä, ja päälle '
      + 'siroteltiin kalkkia, ettei härskiintynyt öljy haisisi. Miksi '
      + 'juuri öljyruukut heitettiin pois? Koska ne olivat ainoat, joita '
      + 'ei voinut käyttää uudestaan: ne hajosivat isoiksi kaareviksi '
      + 'paloiksi, ja rasvainen savi pilasi betonin, sillä öljy ja kalkki '
      + 'tekevät yhdessä saippuaa. Ja tässä on se kohta, jonka isoisäsi '
      + 'olisi kirjoittanut ylös: jokainen ruukku punnittiin tyhjänä ja '
      + 'täytenä, ja kylkeen maalattiin tyhjän paino, viejän nimi, öljyn '
      + 'paino, punnitsijoiden nimet ja tilan sijainti. Kukkula on siis '
      + 'kirjanpitoa. Se on suurin säilynyt merkintävihko, jonka kukaan '
      + 'ei tarkoittanut säilyvän.',
    /*
     * Commons 29.8.2026: 2592×1944, CC BY-SA 4.0, Flazaza, kuvattu
     * 3.10.2015, kuvaus "Layers of shards of amphoras settled at
     * Testaccio hill in Rome". Restrictions tyhjä. SILMÄTARKISTUS
     * tehty: sirpalekerroksia ja kasvillisuutta, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Monte Testaccio Particolare.jpg',
      selite: 'Monte Testaccion kylki: kerros kerroksen päälle ladottuja '
        + 'amforan sirpaleita, joista kukkula on kokonaan tehty.',
      lahde: 'Flazaza, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Sevillalla ei ole tarinakaaren pakettia (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT) eikä riviä js/packs/kohtaamiset.js:ssä, joten tälle
   * kaupungille ei ole valmista hahmoa: alla oleva Amparo on EHDOTUS,
   * ei kaanonia. Kortti on esittely; VARSINAINEN KYSYMYS on ennallaan
   * laattamekaniikassa (game.actionQuiz lukee js/packs/
   * europe-questions.js, sevilla), eikä tämä paketti kosketa sitä.
   *
   * KUVAA EI OLE (omistajan tuore linjaus): kohtaamiskortti rakennetaan
   * ilman kuvaa, joten kentät ovat hahmo, nappi, varmistus, vihjeOsio ja
   * teksti.
   *
   * MIKSI JOKILUOTSI: aarremerkinnässä isoisälle puhuu satamassa vanha
   * luotsi, ja kohtaamispiste on Torre del Oro — torni, joka rakennettiin
   * 1220–1221 valvomaan jokea pitkin tulevaa liikennettä ja jossa on
   * nykyään merenkulun museo (js/packs/kulttuuri-kategoriat.js, nosto
   * "Torni, jonka kulta oli laastia"). Sama ammatti kahdessa päässä
   * kaaria on tietoinen kaiku, ei vahinko — jos Fable pitää sitä
   * toistona, vaihto on tässä yhden lohkon työ.
   *
   * ÄÄNIPROFIILI (tarinakaari, luku 3): Amparo on niitä, jotka eivät
   * usko sukunsa tarinaa mutta säilyttävät sen silti. Varallisuussääntö
   * tarkistettu virke virkkeeltä: isoisä ei maksa mitään, ei tilaa
   * mitään eikä käske ketään — suvun syy pitää kirjaa on suvun oma
   * ammattiylpeys.
   */
  kohtaaminen: {
    hahmo: 'Jokiluotsi Amparo',
    nappi: 'Tapaa jokiluotsi',
    varmistus: 'Haluatko varmasti tavata Amparon juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * sevilla): 'kaupunki', 'historia' tai 'musiikki'. Kaikki viisi
     * laattakysymystä koskevat jokea, roomalaisaikaa, kauppaa tai
     * kellotornia, ja niistä lähin tuki on kaupunkisivulla, jonka
     * johdanto nimeää sekä joen että roomalaisten Hispaliksen.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Amparo tuo laivoja jokea ylös samaa mutkaa, jota hänen '
      + 'isoäitinsä ja tämän isä toivat, ja hän tietää ulkoa, missä '
      + 'kohdassa pohja nousee keväällä ja missä syksyllä. Perheellä on '
      + 'vihko, johon syvyydet on kirjattu niin kauas taakse, ettei '
      + 'kukaan enää muista aloittajaa; Amparo sanoo suoraan pitävänsä '
      + 'koko tapaa vanhanaikaisena ja jatkavansa sitä silti, koska '
      + 'kesken jätetty sarja on hänen mielestään pahempi kuin turha '
      + 'sarja. Vieraita hän on nähnyt monta, ja useimmat kysyvät '
      + 'ensin kullasta. Ennen kuin hän kertoo mitään omastaan, hän '
      + 'haluaa tietää, tunteeko tulija tämän joen edes nimeltä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Sofialla ja Madridilla.
   */

  /*
   * KOHTAAMISPAIKKA: TORRE DEL ORO, joen ranta.
   *
   * 37,38244167 N / −5,99646667 E — en-Wikipedia "Torre del Oro",
   * prop=coordinates (haettu 29.8.2026; sama luku neljän desimaalin
   * tarkkuudella kuin docs/mantereet-tyoaineisto/tarkistus-sevilla.md:n
   * koordinaattitaulussa). Muunnos on sama kaava ja samat vakiot kuin
   * fokuskohteilla: maailmankartalla Millerin lieriö LEVEYS 12000 /
   * LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−5,99646667 − (−175)) mod 360) × (12000/360)
   *                     = 169,00353 × 33,3333… = 5633,5
   *                   y = (millerY(37,38244167) − millerY(76)) × 12000/2π
   *                     = 1904,6
   *   europe          x = (−5,99646667 + 11) × 19,2 = 96,1
   *                   y = (72 − 37,38244167) × 26,3 = 910,4
   *
   * TARKISTUS SEVILLAN LAATTAA VASTEN — JA POIKKEAMA, JOKA ON PAKKO
   * KIRJATA. Sevillan laatta on Euroopan laudalla 81 / 917 (js/packs/
   * europe.js), eli piste jää siitä noin 16 yksikön päähän luoteeseen.
   * Muissa Espanjan kaupungeissa sama kaava osuu laattaan pilkulleen
   * (Madrid 140/831 ↔ laskettu 140,1/830,6; Granada 142/916 ↔ 142,1/
   * 915,8; Lissabon 36/875 ↔ 35,7/875,2), joten poikkeama ei ole
   * kaavassa vaan LAATAN OMASSA SIJAINNISSA: 81/917 vastaa pistettä
   * 37,13 N / −6,78 E, joka on kolmisenkymmentä kilometriä Sevillasta
   * lounaaseen. Piste on tässä laskettu oikein maastoa vasten, kuten
   * muissakin paketeissa, eikä sitä ole vedetty laatan mukaan; koska
   * etäisyys ylittää js/fokuspiste.js:n PISTE_ERO_MIN-rajan (14), peli
   * ei myöskään siirrä sitä. Integroija päättää, siirretäänkö piste
   * laatan viereen vai korjataanko laatta — laatan korjaus on laudan
   * asia eikä tämän tiedoston.
   */
  kohtaamispiste: {
    nimi: 'Torre del Oro',
    laudat: {
      maailmankartta: { x: 5633.5, y: 1904.6 },
      europe: { x: 96.1, y: 910.4 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Sevillan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Sevilla",
   * 2 = Historia, 3 = Musiikki, 4 = Menovinkit (Espanjan maapaketista,
   * js/packs/maa-kategoriat.js ESP).
   *
   * MIKSI 1 JA 4. Raamattu vaatii kysymyksen jokaiselle sivulle paitsi
   * etusivulle. Sivuilla 2 ja 3 on jo lehden OMA minitehtävä
   * (js/packs/kulttuuri-kategoriat.js, sevilla: historiasivulla
   * "Sultan Don Bidru", musiikkisivulla flamencon syntykaupunginosa),
   * joten ne ovat täynnä. Sivu 1 on tyhjä, koska Sevillalla EI ole
   * kulttuurivisaa (js/packs/europe-kulttuuri.js:ssä ei ole
   * `sevilla`-riviä) — muissa fokuskaupungeissa juuri se visa hoitaa
   * sivun 1 AARTEEN AVAUS -laatikon. Tässä sen paikan ottaa oma
   * tehtävä, ja JULISTE menee Menovinkit-sivulle kuten Madridissa.
   *
   * JULISTETTA EI OLE VIELÄ OLEMASSA. js/packs/julisteet.js:ssä ei ole
   * `sevilla`-riviä, joten kaupunginJuliste palauttaa nullin ja
   * palkinnosta jää tällä erää käteen vain rahapalkkio. Tämä on
   * kirjattu raporttiin: juliste on lisättävä ennen kuin sivun 4
   * tehtävä lunastaa lupauksensa. Riviä ei kirjoiteta tässä, koska
   * julisteet.js on tämän tehtävän rajauksen ulkopuolella.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 1, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: VENESILTA_VISA,
    },
    {
      id: 'juliste', sivu: 4, otsake: 'JULISTE', palkinto: 'juliste', visa: APPELSIINI_VISA,
    },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Sevilla) ----------
   *
   * VIISI NOSTOA, EI KIINTIÖTÄ (Raamattu; omistajan linjaus: määrä
   * seuraa maan sisältörikkautta, ja Espanja on rikas). Aiheet on
   * valittu niin, ettei yksikään toista Madridin poolia (Altamira,
   * munkkiaratit, Cartagenan kantoni) eikä Sevillan kaupunkilehden
   * kahtatoista nostoa.
   *
   * TÄRKEÄ HUOMAUTUS INTEGROIJALLE — ESP-POOLI. js/fokusnosto.js
   * nostoMaanPooli lukee KAUPUNGIN oman `takynostot`-kentän ENNEN maan
   * poolia, ja NOSTO_MAAT.ESP osoittaa Madridin pakettiin. Tämän kentän
   * myötä Sevillassa näkyvät siis nämä viisi eivätkä Madridin kolme.
   * Se on tietoinen valinta (Sevillan pelaajalle andalusialainen pooli),
   * mutta se on omistajan/Fablen päätettävä asia: jos halutaan koko
   * Espanjan yhteinen kahdeksan noston pooli, ratkaisu on yksi rivi
   * js/fokusnosto.js:ssä eikä tässä tiedostossa. Tunnukset on valittu
   * niin, ettei yhdistäminen tuota törmäystä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran (js/fokusnosto.js, LIVIAN HUOMAUTUS), ja huomio
   * osuu poolin ensimmäiseen katsomattomaan — siis tähän ensimmäiseen
   * riviin. Järjestys on siksi harkittu.
   *
   * VAIN KUOLLEITA (takynostot-espanja.md, sääntö 2): jokainen nimetty
   * henkilö on kuollut. Vuoden 2024 DNA-tutkimuksen tekijöitä ei nimetä
   * juuri siksi.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT (en-Wikipedia "Tomb of Christopher Columbus", johdanto ja
       * osiot Valladolidista, Cartujasta, Santo Domingosta, Havannan
       * siirrosta ja vuoden 2024 vahvistuksesta; haettu 29.8.2026):
       *   - Kolumbus kuoli Valladolidissa 20.5.1506 ja haudattiin
       *     kaupungin San Franciscon luostariin;
       *   - poika Diego siirsi jäänteet Sevillan Cartujaan, jonne ne
       *     luovutettiin 11.4.1509;
       *   - siirto Santo Domingoon on lähteissä epävarma: vuosi 1536 on
       *     kyseenalaistettu, ja artikkeli pitää mahdollisena vuoden
       *     1544 laivastoa; jäänteet olivat siellä vuoteen 1795;
       *   - Espanja luovutti Hispaniolan osansa Ranskalle 22.7.1795, ja
       *     jäänteet kaivettiin ylös 20.12.1795 ja vietiin Havannaan;
       *   - hauta on ollut Sevillan katedraalissa vuodesta 1899;
       *   - lokakuussa 2024 Granadan yliopiston tutkijat ilmoittivat
       *     vahvistaneensa, että katedraalin luut ovat Kolumbuksen;
       *     vertailu tehtiin pojan Fernandon ja veljen Diegon
       *     jäänteisiin, ja se tuki jo vuosien 2003–2005 tutkimusta;
       *     tutkimusryhmä piti mahdollisena, että osa luista on myös
       *     Dominikaanisessa tasavallassa, jonka viranomaiset ovat
       *     vaatineet riippumatonta testausta.
       *
       * MIKSI TÄMÄ ON SEVILLAN NOSTO EIKÄ MADRIDIN: hauta on täällä, ja
       * 1873 se ei ollut. Se on koko noston kärki.
       */
      id: 'kolumbuksen-luut',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Kolumbuksen luut',
      otsikko: 'Hän kuoli 1506 — ja matkusti sen jälkeen valtameren yli '
        + 'kolmesti',
      lunastus: [
        'Kolumbus kuoli Valladolidissa 20. toukokuuta 1506 ja haudattiin '
          + 'kaupungin luostariin. Kolme vuotta myöhemmin poika Diego '
          + 'siirsi jäänteet Sevillaan, ja ne luovutettiin Cartujan '
          + 'kartusiaanien haltuun 11. huhtikuuta 1509. Siitä alkoi '
          + 'matka, jota kukaan ei suunnitellut: 1500-luvulla arkku '
          + 'purjehti Atlantin yli Santo Domingoon — tarkkaa vuotta ei '
          + 'tiedetä, sillä lähteiden 1536 on kyseenalaistettu ja '
          + 'todennäköisempänä pidetään myöhempää laivastoa. Siellä '
          + 'jäänteet olivat kaksi ja puoli vuosisataa.',
        'Kun Espanja luovutti osansa Hispaniolasta Ranskalle heinäkuussa '
          + '1795, luut kaivettiin ylös 20. joulukuuta samana vuonna ja '
          + 'vietiin Havannaan. Sevillan katedraaliin ne saapuivat vasta '
          + '1899 — eli kun isoisäsi seisoi tässä kaupungissa vuonna '
          + '1873, kuuluisinta hautaa ei ollut vielä olemassa. Kiista ei '
          + 'ole ohi. Lokakuussa 2024 Granadan yliopiston tutkijat '
          + 'ilmoittivat vahvistaneensa vertailulla pojan ja veljen '
          + 'jäänteisiin, että katedraalin luut ovat Kolumbuksen, mutta '
          + 'sanoivat myös, että osa hänestä saattaa yhä olla '
          + 'Dominikaanisessa tasavallassa. Sielläkin näytetään hautaa.',
      ],
      lahde: 'en-Wikipedia "Tomb of Christopher Columbus", johdanto sekä '
        + 'osiot Valladolidista, Cartujasta, Santo Domingosta, Havannan '
        + 'siirrosta ja vuoden 2024 vahvistuksesta; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 2048×3072, CC BY-SA 3.0, José Luiz, kuvattu
       * 6.2.2013, kuvaus "El sepulcro de Cristóbal Colón, en el brazo
       * sur del crucero de la catedral de Sevilla". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: neljä pronssista airutta kantaa arkkua,
       * etualalla köysiaita — ei yhtään ihmistä.
       */
      kuva: {
        tiedosto: 'Tomb of Christopher Columbus - Cathedral of Seville.JPG',
        selite: 'Sevillan katedraalin hautamonumentissa neljä airutta '
          + 'kantaa arkkua olkapäillään; hauta on ollut kaupungissa '
          + 'vuodesta 1899.',
        lahde: 'José Luiz, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi Kolumbuksen jäänteitä siirrettiin niin monta kertaa?',
        'Miten vanhoista luista voidaan tunnistaa yksi ihminen?',
        'Kuka Kolumbus oikeastaan oli?',
      ],
      /*
       * PAIKKAA EI OLE, JA SE ON TIETOINEN VALINTA: hauta on Sevillan
       * katedraalissa eli kaupungissa, jossa pelaaja jo seisoo. Ilman
       * `paikka`-kenttää piste ottaa paikakseen kaupungin ja hakeutuu
       * lähimmän kohdesymbolin päälle (nostonPaikka, js/fokusnosto-
       * symbolit.js) — juuri se varapolku, jota varten kenttä on
       * valinnainen.
       */
    },
    {
      /*
       * FAKTAT (en-Wikipedia "Italica", johdanto sekä osiot
       * perustamisesta, myöhemmästä historiasta ja amfiteatterista;
       * haettu 29.8.2026):
       *   - Italica sijaitsee nykyisen Santiponcen kupeessa Sevillan
       *     maakunnassa; Scipio perusti sen 206 eaa. italialaisille
       *     veteraaneilleen ja nimesi sen Italian mukaan;
       *   - se oli ensimmäinen roomalainen asutus Hispaniassa, ja
       *     keisarit Trajanus ja Hadrianus syntyivät siellä;
       *   - amfiteatteri oli aikanaan valtakunnan kolmanneksi suurin ja
       *     veti 25 000 katsojaa, vaikka kaupungin väkiluvuksi
       *     arvioidaan vain 8 000 — paikallinen yläluokka rahoitti
       *     kisoja asemansa vuoksi;
       *   - raunioita louhittiin rakennusaineeksi vuosisatoja: 1740
       *     Sevillan kaupunki määräsi amfiteatterin muurit purettaviksi
       *     Guadalquiviriin rakennettavaa patoa varten, ja 1796 vanhaa
       *     kaupunkia käytettiin Extremaduran Camino Realiin;
       *   - ensimmäinen suojelulaki tuli voimaan 1810 Napoleonin
       *     miehityksen aikana: se palautti nimen Italica ja myönsi
       *     vuosittaisen kaivausmäärärahan.
       */
      id: 'italica-amfiteatteri',
      nimio: 'Itálican amfiteatteri',
      otsikko: 'Kaupunki purki roomalaisen amfiteatterin muurit ja '
        + 'rakensi niistä padon jokeen',
      lunastus: [
        'Yhdeksän kilometrin päässä Sevillasta seisoo Itálica, jonka '
          + 'Scipio perusti vuonna 206 eaa. haavoittuneille '
          + 'veteraaneilleen ja nimesi Italian mukaan. Se oli '
          + 'ensimmäinen roomalainen asutus koko Hispaniassa, ja siellä '
          + 'syntyi kaksi Rooman keisaria, Trajanus ja Hadrianus. '
          + 'Kaupungin amfiteatteri oli aikanaan valtakunnan '
          + 'kolmanneksi suurin: siihen mahtui 25 000 katsojaa, vaikka '
          + 'kaupungissa asui arviolta 8 000 ihmistä. Paikkoja oli '
          + 'siis kolminkertaisesti asukaslukuun nähden, ja syy oli '
          + 'yksinkertainen — kisat maksoi paikallinen yläluokka, ja '
          + 'niillä ostettiin asemaa paljon Itálicaa laajemmalta.',
        'Sitten tuli hitaampi tuho kuin mikään sota. Raunioita '
          + 'louhittiin rakennusaineeksi vuosisatoja, ja vuonna 1740 '
          + 'Sevillan kaupunki määräsi amfiteatterin muurit '
          + 'purettaviksi: kiviä tarvittiin Guadalquiviriin '
          + 'rakennettavaan patoon. Vuonna 1796 vanhan kaupungin '
          + 'jäänteitä käytettiin Extremaduran maantiehen. Ensimmäinen '
          + 'suojelulaki tuli voimaan vasta 1810 Napoleonin miehityksen '
          + 'aikana — se palautti paikalle nimen Itálica ja myönsi '
          + 'vuosittaisen määrärahan kaivauksiin. Ne kaarevat '
          + 'tiiliseinät, jotka nyt näkyvät, ovat siis se osa, jota '
          + 'kukaan ei ehtinyt viedä pois.',
      ],
      lahde: 'en-Wikipedia "Italica", johdanto sekä osiot perustamisesta, '
        + 'myöhemmästä historiasta ja amfiteatterista; tarkistettu '
        + '29.8.2026.',
      /*
       * Commons 29.8.2026: 3072×4608, CC BY-SA 2.0, Emilio J. Rodríguez
       * Posada, kuvattu 17.2.2017 Santiponcessa. Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: katsomon alarakenteiden tiili- ja
       * kivipilareita, taustalla areena — ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Anfiteatro de Itálica (32833418441).jpg',
        selite: 'Itálican amfiteatterin katsomorakenteita Santiponcessa: '
          + 'jäljellä on se osa, jota ei louhittu rakennuskiveksi.',
        lahde: 'Emilio J. Rodríguez Posada, Wikimedia Commons (CC BY-SA 2.0)',
      },
      kysymykset: [
        'Miksi pienessä Itálicassa oli niin valtava amfiteatteri?',
        'Keitä olivat Trajanus ja Hadrianus?',
        'Miksi roomalaisia raunioita purettiin rakennusaineeksi?',
      ],
      /*
       * 37,44388889 N / −6,04666667 E — en-Wikipedia "Italica",
       * prop=coordinates (haettu 29.8.2026). Sama kaava ja samat vakiot
       * kuin kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Itálica',
        laudat: {
          maailmankartta: { x: 5631.8, y: 1902.3 },
          europe: { x: 95.1, y: 908.8 },
        },
      },
    },
    {
      /*
       * FAKTAT (en-Wikipedia "Carmen (opera)" johdanto ja
       * "Georges Bizet" osiot Carmenista, sairaudesta ja kuolemasta;
       * haettu 29.8.2026):
       *   - Bizet aloitti Carmenin säveltämisen kesällä 1873, ja työ
       *     keskeytyi, koska Opéra-Comiquen johto piti aihetta
       *     sopimattomana talolle;
       *   - ensi-ilta oli Opéra-Comiquessa 3.3.1875; arvostelut olivat
       *     enimmäkseen kielteisiä ja yleisö välinpitämätön, ja Bizet
       *     oli vakuuttunut epäonnistumisesta;
       *   - hän oli sairastellut kurkkuvaivoja vuosia, sairastui
       *     uudelleen toukokuussa, sai 1. kesäkuuta kuumeen ja
       *     ilmeisen sydänkohtauksen ja kuoli aamuyöllä 3. kesäkuuta
       *     1875, hääpäivänsä vuosipäivänä, 36-vuotiaana;
       *   - kuolema tuli 33. esityksen jälkeen; sen illan esitys
       *     peruttiin, koska nimiroolin laulaja Galli-Marié ei kyennyt
       *     esiintymään, ja tilalle vaihdettiin toinen ooppera;
       *   - hautajaisissa 5. kesäkuuta oli yli 4 000 ihmistä; saman
       *     illan erikoisesityksen jälkeen lehdistö, joka oli kolme
       *     kuukautta aiemmin tuominnut teoksen, julisti Bizet'n
       *     mestariksi;
       *   - Pariisissa Carmen otettiin uudelleen ohjelmistoon vasta
       *     1883; siitä on tullut yksi maailman esitetyimmistä
       *     oopperoista.
       *
       * MIKSI TÄMÄ ON SEVILLAN NOSTO: Carmen sijoittuu tähän kaupunkiin
       * ja sen nimihenkilö tekee työtä siinä tupakkatehtaassa, jonka
       * isoisä näki. Kaupunkilehti kertoo tehtaan ja mainitsee oopperan;
       * tämä nosto kertoo sen, mitä lehti ei kerro — miten säveltäjän
       * kävi.
       */
      id: 'carmenin-ensi-ilta',
      nimio: 'Carmenin ensi-ilta',
      otsikko: 'Säveltäjä kuoli kolme kuukautta ensi-illan jälkeen '
        + 'uskoen kirjoittaneensa epäonnistuneen oopperan',
      lunastus: [
        'Georges Bizet aloitti Carmenin säveltämisen kesällä 1873, samana '
          + 'vuonna kun isoisäsi käveli Sevillassa. Työ takkusi heti: '
          + 'Opéra-Comique oli talo, johon vietiin perheitä, eikä sen '
          + 'johto pitänyt tarinaa sopivana. Ensi-ilta tuli lopulta 3. '
          + 'maaliskuuta 1875. Arvostelut olivat enimmäkseen kielteisiä '
          + 'ja yleisö välinpitämätön, ja Bizet oli vakuuttunut siitä, '
          + 'että hän oli epäonnistunut. Ooppera sijoittuu Sevillaan, ja '
          + 'sen nimihenkilö tekee sikareita siinä samassa tehtaassa, '
          + 'jonka ohi isoisäsi käveli.',
        'Bizet oli sairastellut kurkkuaan vuosia. Hän sairastui '
          + 'uudelleen toukokuussa, sai ensimmäisenä kesäkuuta korkean '
          + 'kuumeen ja sydänkohtauksen ja kuoli aamuyöllä kolmantena '
          + 'kesäkuuta 1875 — hääpäivänsä vuosipäivänä, 36-vuotiaana. '
          + 'Kuolema tuli oopperan kolmannenkymmenennenkolmannen '
          + 'esityksen jälkeen. Sen illan esitys peruttiin, koska '
          + 'nimiroolin laulaja ei kyennyt nousemaan lavalle. '
          + 'Hautajaisiin tuli yli neljätuhatta ihmistä, ja saman illan '
          + 'erikoisesityksen jälkeen sama lehdistö, joka oli '
          + 'kolme kuukautta aiemmin tyrmännyt teoksen, julisti Bizet’n '
          + 'mestariksi. Pariisiin Carmen palasi ohjelmistoon vasta '
          + '1883. Siitä tuli yksi maailman esitetyimmistä oopperoista, '
          + 'eikä sen tekijä ehtinyt kuulla siitä sanaakaan.',
      ],
      lahde: 'en-Wikipedia "Carmen (opera)" (johdanto) ja "Georges Bizet" '
        + '(osiot Carmenista sekä sairaudesta ja kuolemasta); tarkistettu '
        + '29.8.2026.',
      /*
       * Commons 29.8.2026: 6536×8944, public domain, Prudent-Louis Leray
       * (1820–1879), restaurointi Adam Cuerden, päiväys 1875, kuvaus
       * "1875 lithographic poster for the première of Georges Bizet's
       * Carmen". Restrictions tyhjä. SILMÄTARKISTUS tehty: litografoitu
       * juliste, ei valokuvattuja ihmisiä.
       */
      kuva: {
        tiedosto: "Prudent-Louis Leray - Poster for the première of Georges Bizet's Carmen.jpg",
        selite: 'Prudent-Louis Lerayn litografia on Carmenin ensi-illan '
          + 'juliste vuodelta 1875 — samasta esityksestä, jonka '
          + 'säveltäjä uskoi epäonnistuneen.',
        lahde: 'Prudent-Louis Leray 1875, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi Carmenia pidettiin ensi-illassaan sopimattomana?',
        'Miten ooppera nousi epäonnistumisesta maailmanmaineeseen?',
        'Millainen kaupunki Sevilla oli oopperoiden tapahtumapaikkana?',
      ],
      /*
       * PAIKKAA EI OLE: ensi-ilta oli Pariisissa, mutta nosto kertoo
       * Sevillaan sijoittuvasta oopperasta, ja pisteen paikka on siksi
       * kaupunki, jossa pelaaja seisoo (nostonPaikka). Pariisin piste
       * veisi kartalla huomion väärään maahan.
       */
    },
    {
      /*
       * ELÄINNOSTO (Raamattu, ELÄINTÄYT-linjaus).
       *
       * Tämä on docs/mantereet-tyoaineisto/takynostot-espanja.md:n
       * ehdokas 10 (VARMA), joka jäi Madridin poolista pois — ja se on
       * oikeampi Sevillassa kuin Madridissa, koska laji elää juuri
       * tämän joen suistossa. Aineiston ehto noudatettu sanatarkasti:
       * VUOSILUVUT KIRJOITETAAN NÄKYVIIN, koska luvut vanhenevat, eikä
       * lukijaa jätetä suruun — käänne kerrotaan heti perään.
       *
       * FAKTAT (en-Wikipedia "Iberian lynx", johdanto ja osio
       * "Taxonomy"; tarkistettu uudelleen 29.8.2026):
       *   - iberianilves elää vain Iberian niemimaalla, ja fossiilien
       *     perusteella se on ollut siellä noin miljoona vuotta;
       *   - kanta romahti 1900-luvulla liikametsästyksen,
       *     salametsästyksen, elinympäristöjen pirstoutumisen ja
       *     pääravinnon eli villikanin katoamisen takia (myksomatoosi
       *     ja kaniinien verenvuotokuume);
       *   - vuonna 2002 jäljellä oli 94 yksilöä kahdessa toisistaan
       *     erillisessä osapopulaatiossa Andalusiassa;
       *   - 2012–2024 kanta nousi 326 yksilöstä noin 2 021:een, ja IUCN
       *     alensi luokituksen vaarantuneeksi;
       *   - nimen antoi Coenraad Jacob Temminck 1827 nahoista, jotka oli
       *     otettu Tajon varrelta Portugalista ja myyty Pariisissa ja
       *     Lontoossa.
       */
      id: 'iberianilves',
      nimio: 'Iberianilves',
      otsikko: 'Maailman uhanalaisinta kissaeläintä oli jäljellä 94 '
        + 'yksilöä — ja sitten laskuri kääntyi',
      lunastus: [
        'Iberianilves elää vain Iberian niemimaalla, ja fossiilien '
          + 'perusteella se on ollut siellä noin miljoona vuotta. '
          + '1900-luvulla kaikki meni pieleen yhtä aikaa: liikametsästys, '
          + 'salametsästys ja elinympäristöjen pirstoutuminen veivät '
          + 'tilan, ja sitten katosi ruoka. Ilveksen pääravinto on '
          + 'villikani, ja kanikannat romahtivat myksomatoosiin ja '
          + 'kaniinien verenvuotokuumeeseen. Vuonna 2002 laskettiin '
          + 'yhdeksänkymmentäneljä yksilöä kahdessa erillisessä '
          + 'osapopulaatiossa Andalusiassa. Kaksi joukkoa, jotka eivät '
          + 'kohdanneet toisiaan.',
        'Sitten alkoi työ: elinympäristöjen kunnostus, kanien istutus, '
          + 'eläinten siirto uusille alueille ja seuranta. Vuosien 2012 '
          + 'ja 2024 välillä kanta nousi 326 yksilöstä noin '
          + 'kahteentuhanteen — ja kansainvälinen luonnonsuojeluliitto '
          + 'alensi lajin luokituksen erittäin uhanalaisesta '
          + 'vaarantuneeksi. Lajin nimesi hollantilainen Coenraad Jacob '
          + 'Temminck vuonna 1827, eikä hän ollut nähnyt yhtään elävää '
          + 'ilvestä: hän kuvaili lajin nahoista, jotka oli otettu Tajon '
          + 'varrelta ja myyty Pariisissa ja Lontoossa. Sadassa '
          + 'yhdeksässäkymmenessä vuodessa laji ehti kadota melkein '
          + 'kokonaan ja tulla takaisin.',
      ],
      lahde: 'en-Wikipedia "Iberian lynx", johdanto ja osio "Taxonomy" '
        + '(tarkistettu 29.8.2026; sama aineisto docs/'
        + 'mantereet-tyoaineisto/takynostot-espanja.md, ehdokas 10).',
      /*
       * Commons 29.8.2026: 3888×2592, CC BY-SA 4.0, Fernando Diz,
       * kuvattu 12.5.2018, kuvaus "Un lince fotografiado en el Parque
       * Nacional de Doñana". Restrictions tyhjä. Sama tiedosto, jonka
       * työaineisto oli jo tarkistanut. SILMÄTARKISTUS: pelkkä eläin,
       * ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Lince iberico.jpg',
        selite: 'Iberianilves Doñanan kansallispuistossa: laji elää vain '
          + 'Iberian niemimaalla, ja vuonna 2002 niitä oli jäljellä 94.',
        lahde: 'Fernando Diz, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi iberianilves oli kadota kokonaan?',
        'Miten uhanalaisen lajin kanta saadaan nousuun?',
        'Millainen eläin iberianilves on?',
      ],
      /*
       * 37 N / −6,5 E — en-Wikipedia "Doñana National Park",
       * prop=coordinates (haettu 29.8.2026). Rajapinta antaa puistolle
       * karkean keskipisteen, mikä riittää: piste hakeutuu joka
       * tapauksessa lähimmän kohdesymbolin päälle (js/fokusnosto-
       * symbolit.js). Sama kaava kuin muillakin.
       */
      paikka: {
        nimi: 'Doñana',
        laudat: {
          maailmankartta: { x: 5616.7, y: 1919.3 },
          europe: { x: 86.4, y: 920.5 },
        },
      },
    },
    {
      /*
       * FAKTAT (en-Wikipedia "Diego Velázquez", osiot syntymästä,
       * oppivuosista, varhaisista töistä ja hovimaalariksi
       * pääsemisestä; haettu 29.8.2026):
       *   - Velázquez kastettiin Sevillan Pyhän Pietarin kirkossa
       *     sunnuntaina 6.6.1599; perhe eli vaatimattomasti;
       *   - oppisopimus Francisco Pachecon kanssa allekirjoitettiin
       *     17.9.1611 ja takautui 10.12.1610; kuusi vuotta;
       *   - 23.4.1618 hän nai opettajansa tyttären Juana Pachecon;
       *   - varhaisimmat työt ovat bodegoneja eli keittiökuvia; Vanha
       *     nainen paistaa munia on vuodelta 1618, ja Sevillan
       *     vedenmyyjää (1618–1622) on kutsuttu hänen bodegoniensa
       *     huipuksi;
       *   - hän matkusti Madridiin huhtikuussa 1622 ja palasi Sevillaan
       *     tammikuussa 1623; joulukuussa 1622 kuoli hovin
       *     suosikkimaalari Rodrigo de Villandrando, ja kreivi-herttua
       *     Olivares kutsui Velázquezin hoviin;
       *   - Filip IV istui hänelle 30.8.1623, muotokuva miellytti, ja
       *     Olivares määräsi Velázquezin muuttamaan Madridiin luvaten,
       *     ettei kukaan muu maalaa kuningasta ja että aiemmat
       *     muotokuvat vedetään pois;
       *   - vuonna 1624 hän sai kuninkaalta 300 dukaattia perheen muuton
       *     kuluihin, ja Madridista tuli hänen kotinsa loppuiäkseen.
       *
       * MIKSI TÄMÄ ON SEVILLAN NOSTO: isoisä seisoi Madridissa
       * Velázquezin edessä yksin, ja se oli hänen matkansa hiljaisin
       * tunti (js/packs/fokusvirta-madrid.js, kaanoninen merkintä).
       * Tämä nosto kertoo, mistä se mies tuli.
       */
      id: 'velazquezin-oppivuodet',
      nimio: 'Velázquezin oppivuodet',
      otsikko: 'Kaupungin poika maalasi vedenmyyjiä ja keittiöpiikoja — '
        + 'sitten hänestä tehtiin ainoa, joka sai maalata kuninkaan',
      lunastus: [
        'Diego Velázquez kastettiin Sevillan Pyhän Pietarin kirkossa '
          + 'sunnuntaina 6. kesäkuuta 1599, ja perhe eli vaatimattomasti. '
          + 'Yksitoistavuotiaana hänet pantiin oppiin maalari Francisco '
          + 'Pachecon pajaan: sopimus allekirjoitettiin syyskuussa 1611 '
          + 'ja takautui edellisen vuoden joulukuuhun, kuudeksi '
          + 'vuodeksi. Huhtikuussa 1618 hän nai opettajansa tyttären '
          + 'Juanan. Ne työt, jotka hän tuolloin teki, eivät olleet '
          + 'kuninkaita eivätkä pyhimyksiä vaan keittiöitä: vanha nainen '
          + 'paistamassa munia, poika kantamassa vesiruukkua. Sevillan '
          + 'vedenmyyjää on kutsuttu hänen keittiökuviensa huipuksi, ja '
          + 'siinä maalataan lasi, savi ja vesipisara niin tarkasti, '
          + 'että ne tunnistaa kädellä.',
        'Sitten sattui kaksi asiaa peräkkäin. Velázquez kävi Madridissa '
          + 'huhtikuussa 1622 eikä päässyt maalaamaan kuningasta, vaan '
          + 'palasi kotiin tammikuussa 1623. Mutta joulukuussa 1622 oli '
          + 'kuollut hovin suosikkimaalari, ja kreivi-herttua Olivares '
          + 'kutsui sevillalaisen takaisin. Filip IV istui hänelle 30. '
          + 'elokuuta 1623. Muotokuva miellytti, ja Olivares antoi '
          + 'määräyksen, joka olisi nykyään käsittämätön: Velázquez '
          + 'muuttaa Madridiin, kukaan muu ei enää maalaa kuningasta, ja '
          + 'aiemmat muotokuvat vedetään pois. Seuraavana vuonna hän sai '
          + 'kuninkaalta kolmesataa dukaattia muuttokuluihin. Sevillaan '
          + 'hän ei enää palannut asumaan.',
      ],
      lahde: 'en-Wikipedia "Diego Velázquez", osiot syntymästä, '
        + 'oppivuosista, varhaisista töistä ja hovimaalariksi '
        + 'pääsemisestä; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 2371×3200, public domain, Diego Velázquez,
       * päiväys "circa 1620". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * maalaus, ei valokuvattuja ihmisiä.
       */
      kuva: {
        tiedosto: 'El aguador de Sevilla, por Diego Velázquez.jpg',
        selite: 'Sevillan vedenmyyjä on Velázquezin sevillalaiskauden '
          + 'keittiökuvien huippu: savi, lasi ja vesipisara maalattuina '
          + 'ennen kuin tekijä oli täyttänyt kahtakymmentäviittä.',
        lahde: 'Diego Velázquez n. 1620, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Mikä on bodegón eli keittiökuva?',
        'Miksi kuningas halusi vain yhden maalarin?',
        'Mitä Velázquez maalasi Madridissa?',
      ],
      /*
       * PAIKKAA EI OLE: syntymä- ja oppivuodet ovat tässä kaupungissa,
       * joten piste ottaa paikakseen kaupungin (nostonPaikka).
       */
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
    teksti: 'Satamassa vanha luotsi kertoi, että lahden pohjassa '
      + 'pohjoisessa lepää laivasto, joka upposi hopea lasteinaan. Moni '
      + 'on sukeltanut, kukaan ei ole noussut rikkaana. Hopea odottaa '
      + 'sitä, joka tietää mihin katsoa — ei sitä, joka kaivaa '
      + 'kovimmin.',
  },
};
