/*
 * FIRENZEN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4B.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ
 * RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4B kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonpaperi, osio
 * FIRENZE). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Caravaggion kadonnut maalaus — Italian aarre, sama kuin
 * Roomalla ja Venetsialla. Aarremerkintä alla on Firenzen oma merkintä
 * samasta maalauksesta, ei Rooman toisinto.
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `firenze`), ja tämän paketin sisältö
 * nojaa kahteen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kaupunkilehden omat nostot ja
 *      kuvatekstit (Ponte Vecchio, kupoli, floriini, bistecca,
 *      Botticelli, David, Vasarin käytävä) — nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin, ja MOLEMMAT lehtitehtävän
 *      visat on koottu niistä ilman yhtään uutta faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli kerrallaan, ja jokaisen kohdan
 *      oma kommentti nimeää artikkelin ja osion. Mitään ei ole
 *      päätelty, pyöristetty eikä muistettu. Missä kaksi kieliversiota
 *      antaa eri luvun, ristiriita on kirjattu näkyviin eikä sitä ole
 *      sovitettu (ks. TÄKY 1, härkäparit).
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (firenze/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi, varmistus, vihjeOsio ja teksti.
 *   5. TÄKYNOSTOJA EI OLE TÄSSÄ PAKETISSA (aallon 4B rajaus): Italian
 *      pooli asuu Rooman paketissa (js/fokusnosto.js NOSTO_MAAT.ITA),
 *      ja js/fokusnosto.js nostoMaanPooli lukee sen sieltä. Jos
 *      Firenzelle joskus kirjoitetaan oma pooli, se on OMA päätöksensä
 *      — silloin kaupungin oma `takynostot`-kenttä VOITTAISI Rooman
 *      poolin, eli firenzeläinen pelaaja ei enää näkisi Rooman nostoja.
 *
 * ── MINIVISAN SÄÄNTÖ, JA YKSI POIKKEUS TALON TAPAAN ────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan. POIKKEUS: aallossa 4B oikean vastauksen
 * PAIKKA VAIHTELEE (aallon tilaus) — muissa paketeissa oikea on aina
 * indeksi 0. Tässä tiedostossa indeksit ovat 1 (pääkaupunki), 2
 * (porcellino), 0 (toscanelli), 2 (AARTEEN AVAUS) ja 1 (JULISTE).
 * Moottori ei sekoita vaihtoehtoja, joten paikka on juuri se, mikä
 * datassa lukee. Lisäksi on käsin tarkistettu, ettei oikea vaihtoehto
 * ole pisin yhdessäkään visassa (docs/moduulit/tarinakaari.md, luku 6
 * kohta 2).
 *
 * ── LAATTAKYSYMYSTÄ EI SPOILATA ────────────────────────────────────
 *
 * Firenzen laattakysymykset ovat js/packs/europe-questions.js:n
 * `firenze`-lohkon viisi: maa, kupolin suunnittelija, Ponte Vecchion
 * kaupat vuodesta 1593, sanan uffizi merkitys ja Jumalaisen näytelmän
 * kirjoittaja. Kaupungilla EI ole tarinakaaren pakettia
 * (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten kohtaamisen takana
 * on juuri tuo laattakysymys.
 *
 * Oppitunti pohjustaa niistä VIIDENNEN (runoilija) — se on ainoa
 * viidestä, jota kaupunkilehti ei käsittele lainkaan: sanat "Dante" ja
 * "Commedia" eivät esiinny Firenzen lehden nostoissa, kuvateksteissä
 * eivätkä oppaan jaksoissa (haku 29.8.2026). Kumpikaan lehtitehtävä ei
 * koske yhtäkään viidestä.
 *
 * SPOILERIVAROVAISUUS PÖLLÖN KUVASSA. Karusellin kolmesta generoidusta
 * herosta aamun selite nimeää kupolin rakentajan ja keskipäivän selite
 * sillan kultasepät — kumpikin sanoo ääneen laattakysymyksen vastauksen
 * ennen kysymystä. Illan hero (Palazzo Vecchio) ei koske yhteenkään
 * viidestä, ja se on lisäksi juuri se talo, josta Livian maadoitus
 * kertoo. Siksi kuvaksi on valittu se.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD, CC0 tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä. JOKAINEN on lisäksi katsottu silmin 960 pikselin
 * esikatseluna, ja havainto on kirjattu kunkin kuvan kommenttiin.
 *
 * KAKSI KOLMESTA TÄKYKUVASTA ON PELIN JO KÄYTTÄMÄ TIEDOSTO (Firenzen
 * kuvaviittaukset on juuri peilattu, ks. inventaario): Monte alle
 * Crocin panoraama on kaupunkilehden ennenNyt-parin vanha puoli.
 * Kaksi kuvaa on uutta — Porcellinolle ja Toscanellin kartalle ei ole
 * pelissä vastinetta, eikä kummankaan aihetta voi kertoa toisen
 * kohteen kuvalla.
 *
 * LOISTOAIKAKUVIA EI OLE. Sama ratkaisu kuin Sevillassa ja
 * Tukholmassa: yksi kuva per kortti, `tiedosto`-kenttä. Aiheet on
 * kirjattu raporttiin.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-firenze.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Venus-kysymys on Firenzen lehden sivun 2
 * ("Kuvataide") oman noston "Jumalatar simpukan päällä" tekstiä ja
 * pihvikysymys sivun 1 noston "Pihvi, jota ei kysytä kypsäksi" tekstiä
 * (js/packs/kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole
 * kummassakaan.
 *
 * MIKSI EI VASARIN KÄYTÄVÄÄ, vaikka se on sivun 2 aihe: sivulla 2 on jo
 * lehden OMA minitehtävä juuri siitä (Vasarin käytävän päätepisteet), ja
 * nimetty tehtävä väistää sen tieltä (js/fokustehtavat.js). Jos AARTEEN
 * AVAUS kysyisi samasta käytävästä, sivun ainoa kysymys vaihtuisi
 * toiseksi kysymykseksi samasta asiasta — ja pelaaja menettäisi yhden
 * aiheen kokonaan. Nyt sivun kysymys vaihtuu aiheeltaan, ei pelkältä
 * sanamuodoltaan.
 */
const VENUS_VISA = {
  kysymys: 'Botticellin Venuksen syntymä poikkeaa aikansa suurista '
    + 'teoksista jo tekotavaltaan. Mille alustalle se on tehty?',
  vaihtoehdot: [
    'Märkään seinälaastiin freskona',
    'Kullatulle puupaneelille',
    'Kankaalle temperalla',
  ],
  oikea: 2,
  fakta: 'Sandro Botticelli maalasi teoksen noin 1485, ja Venuksen '
    + 'hiuksissa on aitoa kultaa. Maalaus on Uffizissa samassa salissa '
    + 'kuin Botticellin Kevät.',
};

const PIHVI_VISA = {
  kysymys: 'Firenzeläisessä ravintolassa bistecca alla fiorentina '
    + 'tuodaan pöytään ilman yhtä kysymystä, jonka muualla saa aina. '
    + 'Mikä se on?',
  vaihtoehdot: [
    'Kuinka paksuna se leikataan',
    'Kuinka kypsäksi se paistetaan',
    'Kuinka pitkään sen annetaan levätä',
  ],
  oikea: 1,
  fakta: 'Pihvi leikataan chianina-rodun naudasta vähintään kolmen '
    + 'sormen paksuiseksi ja paistetaan hiilillä ilman öljyä ja '
    + 'mausteita — suola tulee vasta lopuksi. Se punnitaan ennen '
    + 'paistamista ja hinta lasketaan kilon mukaan.',
};

export const FOKUSVIRTA_FIRENZE = {
  kaupunki: 'firenze',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Firenze, toukokuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Tämä kaupunki oli vielä äsken kuningaskunnan pääkaupunki, '
      + 'ja nyt hovi on muuttanut Roomaan ja jättänyt jälkeensä '
      + 'hiljaisuuden, joka sopii sille paremmin. Sillalla, jonka päälle '
      + 'on rakennettu puoteja, on käyty samaa kimaltavaa kauppaa '
      + 'neljäsataa vuotta. Signorian '
      + 'aukiolla seisoin Davidin edessä niin kauan, että kyyhkyset '
      + 'ehtivät vaihtaa vahtivuoroa — mutta patsas seisoi kauemmin. '
      + 'Sitä aiotaan kuulemma siirtää sisälle sateilta suojaan; toivon '
      + 'että se ehtii nähdä vielä yhden kesän. '
      + 'Joki on ruskea ja kärsimätön; '
      + 'sanotaan että se on ennenkin noussut kaduille ja nousee vielä.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[softly] Tämä kaupunki oli vielä äsken kuningaskunnan '
      + 'pääkaupunki, ja nyt hovi on muuttanut Roomaan ja jättänyt '
      + 'jälkeensä hiljaisuuden, joka sopii sille paremmin. [curious] '
      + 'Sillalla, jonka päälle on rakennettu puoteja, on käyty samaa '
      + 'kimaltavaa kauppaa neljäsataa vuotta. '
      + '[warmly] Signorian aukiolla seisoin Davidin edessä niin '
      + 'kauan, että kyyhkyset ehtivät vaihtaa vahtivuoroa — mutta '
      + 'patsas seisoi kauemmin. Sitä aiotaan kuulemma siirtää sisälle '
      + 'sateilta suojaan; toivon että se ehtii nähdä vielä yhden '
      + 'kesän. [whispers] Joki on ruskea ja kärsimätön; sanotaan '
      + 'että se on ennenkin noussut kaduille ja nousee vielä.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-firenze.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * PARIPERIAATE: merkintä on haikea muttei synkkä — kaupunki, josta
     * juhla lähti pois. Livia ei naljaile isoisälle vaan tekee sen,
     * minkä välittäjä tekee: antaa hiljaisuudelle mitan ja päivämäärän.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja lopussa
     * ("mut"), keskellä sanat ovat auki; pronominit kokonaisina; ei
     * huutomerkkejä.
     *
     * MIKSI PÄÄKAUPUNKIVUODET EIKÄ JOKI TAI DAVID: kanoninen `teksti`
     * alla hoitaa jo joen (1966) ja Davidin, eikä sama asia saa tulla
     * kahdesti samassa kuplassa. Merkinnän ensimmäinen virke — se, joka
     * peliruudulla lihavoidaan — on hovin lähdöstä, eikä siihen vastaa
     * kukaan muu.
     *
     * FAKTAKURI: viisi väitettä, kaikki it-Wikipedian artikkelista
     * "Firenze capitale" (johdanto ja osio "Storia"; haettu 29.8.2026).
     * (1) Firenze oli Italian pääkaupunki 3.2.1865–3.2.1871. (2) Kuningas
     * Vittorio Emanuele II matkusti Torinosta junalla ja saapui
     * Firenzeen 3.2.1865. (3) Palazzo Vecchion Cinquecenton sali oli
     * edustajainhuone, (4) Uffizin Teatro Mediceo senaatti ja Palazzo
     * Medici Riccardi pääministerin ja sisäministeriön talo. (5) Vuoden
     * 1865 alkukuukausina kaupunkiin muutti 30 000 uutta asukasta, kun
     * asukkaita oli 118 000.
     */
    maadoitus: 'Kääk. Se hovi oli täällä tasan kuusi vuotta: kolmantena '
      + 'helmikuuta 1865 kuningas tuli junalla Torinosta, ja kolmantena '
      + 'helmikuuta 1871 hallitus oli jo Roomassa. Ne vuodet asuivat '
      + 'vanhoissa taloissa niin kuin osasivat — kansanedustajat '
      + 'istuivat Palazzo Vecchion isossa salissa, senaatti Uffizin '
      + 'teatterissa ja pääministeri Medicien palatsissa. Pelkästään '
      + 'alkuvuonna 1865 tänne muutti kolmekymmentätuhatta ihmistä '
      + 'satakahdeksantoistatuhannen päälle, ja kuuden vuoden kuluttua '
      + 'sama väki pakkasi laukkunsa. Isoisäsi kuuli oikean '
      + 'hiljaisuuden — mut se oli vasta muuton jälkeinen hiljaisuus, '
      + 'ei vanha.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     */
    teksti: 'Isoisäsi osui oikeaan joen suhteen — vuonna 1966 Arno nousi '
      + 'ja vei mukanaan kirjastoja ja maalauksia, ja vapaaehtoiset '
      + 'ympäri maailmaa tulivat kaivamaan taidetta mudasta.. Heitä '
      + 'sanotaan mudan enkeleiksi. David seisoo edelleen, tosin '
      + 'nykyään sisällä suojassa, ja sillan puodit kimaltavat yhä — '
      + 'kohta näet keiden käsissä. '
      + 'Katsotaan mitä hän täältä kirjasi.',
    /*
     * Selite on lehden oman avauskuvan selite sellaisenaan (js/packs/
     * kulttuuri-kategoriat.js, firenze/avauskuvat, kolmas hero);
     * yksikään luku ei muutu. Ks. SPOILERIVAROVAISUUS tiedoston alussa:
     * tämä on ainoa kolmesta generoidusta herosta, jonka selite ei
     * kerro yhtäkään laattakysymyksen vastausta.
     */
    kuva: {
      ampari: 'herokoe/hero-firenze-ilta.png',
      selite: 'Palazzo Vecchio nousi 1299 alkaen kaupunkivaltion '
        + 'linnoitetuksi raatihuoneeksi, ja sen 94-metrinen torni '
        + 'hallitsee yhä Firenzen siluettia.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ensimmäinen virke on menetetystä
       * pääkaupungista. Tämä kertoo, mitä siitä jäi käteen — ei hovia
       * vaan bulevardit ja niiden lasku.
       *
       * FAKTAT (kaksi artikkelia, haettu 29.8.2026):
       *   - it-Wikipedia "Risanamento di Firenze" (johdanto ja osiot
       *     "Firenze capitale", "Il piano Poggi", "I viali di
       *     Circonvallazione", "Il viale dei Colli"): Poggin
       *     laajennussuunnitelma luovutettiin 18.2.1865; työt alkoivat
       *     toukokuussa 1865 ja päättyivät viisi vuotta myöhemmin;
       *     rahoitus haettiin kolmenkymmenen miljoonan liiran
       *     yleisellä lainalla, joka oli määrä kuolettaa
       *     viidessäkymmenessä vuodessa; suunnitelman osat olivat
       *     muurien purku Arnon pohjoispuolelta ja bulevardit niiden
       *     tilalle Pariisin malliin, viale dei Colli etelärannalle,
       *     Campo di Marte, uusi rautatieasema, uusi teurastamo ja
       *     kaasulaitos sekä uudet tulvasuojelutyöt; tulvat 1844 ja
       *     3.–4.11.1864 olivat tuoreessa muistissa; vanhojen porttien
       *     kohdalle tehtiin suuret aukiot.
       *   - it-Wikipedia "Piazzale Michelangelo" (osio "Storia e
       *     descrizione"): piazzale toteutettiin vuodesta 1869 Poggin
       *     piirustusten mukaan viale dei Collin päätteeksi; viale on
       *     8 kilometriä pitkä; piazzale on 104 metriä merenpinnasta;
       *     aukiolla on pronssiset jäljennökset Michelangelon
       *     teoksista, ja aikalaiskirjoittaja Yorick (Pietro Coccoluto
       *     Ferrigni) kertoi osan firenzeläisistä paheksuneen
       *     rakennustöiden "liiallista kulua".
       *
       * KIRJATTU RISTIRIITA, JOTA EI OLE SOVITETTU. It-Wikipedian
       * "Piazzale Michelangelo" sanoo, että muistomerkki vedettiin
       * kukkulalle yhdeksällä härkäparilla 25.6.1873; en-Wikipedian
       * "David (Michelangelo)" sanoo, että pronssijäljennös pystytettiin
       * piazzalelle 1875 Michelangelon syntymän neljänsadan vuoden
       * juhlaan. Molemmat voivat olla tosia (kuljetus ensin, paljastus
       * myöhemmin), mutta koska yksikään luettu lähde ei sano sitä
       * ääneen, TÄSSÄ KERROTAAN VAIN KULJETUS JA SEN PÄIVÄ. Vuosilukua
       * 1875 ei mainita missään kentässä. Ero on kirjattu raporttiin.
       *
       * MITÄ EI KERROTA: Torinon mellakat, joissa kuoli 52 ihmistä
       * (it-Wikipedia "Firenze capitale"). Ne ovat pääkaupungin siirron
       * taustaa, mutta 13+ ei tarkoita, että jokainen taustaluku
       * kuuluisi täkyyn.
       */
      id: 'paakaupunki',
      nappi: 'Kaupunki, joka purki muurinsa pääkaupungiksi',
      otsikko: 'Kuusi vuotta ja kolmekymmentä miljoonaa',
      teksti: 'Kun hovi tuli, kaupunki oli väärän kokoinen. Firenzen '
        + 'ympärillä seisoivat yhä keskiaikaiset muurit, sisällä oli '
        + 'kujia ja puutarhoja, ja ulkopuolella alkoi heti toinen '
        + 'kunta. Kaupunki tilasi arkkitehti Giuseppe Poggilta '
        + 'laajennussuunnitelman, ja hän luovutti sen 18. helmikuuta '
        + '1865 — kaksi viikkoa sen jälkeen, kun kuningas oli saapunut. '
        + 'Työt alkoivat saman vuoden toukokuussa ja kestivät viisi '
        + 'vuotta. Muurit purettiin joen pohjoispuolelta, ja niiden '
        + 'tilalle vedettiin leveät puurivistöiset bulevardit Pariisin '
        + 'malliin; vanhojen kaupunginporttien kohdille avattiin isot '
        + 'aukiot. Joen eteläpuolelle raivattiin kahdeksan kilometrin '
        + 'panoraamatie, viale dei Colli, ja sen päätteeksi kukkulalle '
        + 'tehtiin vuodesta 1869 alkaen terassi, jolta koko kaupunki '
        + 'näkyy yhdellä silmäyksellä. Samaan pakettiin kuuluivat uusi '
        + 'rautatieasema, uusi teurastamo, kaasulaitos ja uudet '
        + 'tulvapenkereet — vuoden 1844 tulva ja marraskuun 1864 tulva '
        + 'olivat tuoreessa muistissa. Kaikki tämä maksettiin velaksi: '
        + 'kolmenkymmenen miljoonan liiran laina, joka oli tarkoitus '
        + 'kuolettaa viidessäkymmenessä vuodessa. Sitten hovi lähti '
        + 'Roomaan, ja kaupungille jäivät bulevardit, terassi ja '
        + 'lyhennykset. Kesäkuun 25. päivänä 1873, kuukausi isoisäsi '
        + 'käynnin jälkeen, kukkulalle vedettiin yhdeksällä '
        + 'härkäparilla pronssinen jäljennös Davidista. Se seisoo '
        + 'siellä yhä ja katsoo kaupunkia, joka rakennettiin '
        + 'pääkaupungiksi kuudeksi vuodeksi.',
      /*
       * Commons 29.8.2026: 3456×2736, CC0, Rijksmuseum, päiväys "ca.
       * 1870 – ca. 1890", Restrictions tyhjä. SILMÄTARKISTUS tehty
       * 960 px:n esikatseluna: albumiinivedos, jonka etualalla on
       * Poggin juuri valmistunut terassi kaiteineen ja tyhjänä,
       * takana joki, sillat, kupoli, Palazzo Vecchion torni ja Santa
       * Croce. Ei yhtään ihmistä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on pelin omasta aineistosta
       * (js/packs/kulttuuri-kategoriat.js, firenze/ennenNyt, parin
       * vanha puoli) ja näyttää täsmälleen sen, mistä täky kertoo —
       * uuden terassin, jolta katsotaan vanhaa kaupunkia.
       */
      kuva: {
        tiedosto: 'Gezicht op Florence vanaf de Monte alle Croci FIRENZE Panorama preso dal Monte alle Croci. (titel op object), RP-F-F01093-AV.jpg',
        selite: 'Monte alle Crocin rinteelle vuodesta 1869 rakennettu '
          + 'terassi ja sen alla Firenze: joki, sillat, kupoli ja '
          + 'Palazzo Vecchion torni 1800-luvun lopun albumiinivedoksessa.',
        lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Firenze rakensi bulevardinsa ja uudet aukionsa '
          + 'velaksi. Miten laina oli tarkoitus hoitaa?',
        vaihtoehdot: [
          'Myymällä puretut muurikivet urakoitsijoille',
          'Kuolettamalla se viidessäkymmenessä vuodessa',
          'Perimällä maksu jokaiselta kaupunkiin muuttaneelta',
        ],
        oikea: 1,
        fakta: 'Laina oli kolmekymmentä miljoonaa liiraa. Suunnitelmaan '
          + 'kuuluivat myös uusi rautatieasema, teurastamo, kaasulaitos '
          + 'ja tulvapenkereet — tulvat 1844 ja 1864 olivat tuoreessa '
          + 'muistissa.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: merkinnässä isoisä katsoo kädentyötä sillalla.
       * Tämä on saman korttelin toinen kädentyö — pronssi, jota
       * tuhannet kädet ovat kuluttaneet toisin päin.
       *
       * FAKTAT (en-Wikipedia "Il Porcellino", johdanto sekä osio
       * kolikko- ja kuonoperinteestä; haettu 29.8.2026):
       *   - Porcellino ("porsas") on firenzeläinen lempinimi
       *     villisikaa esittävälle pronssiselle suihkulähteelle;
       *   - veistoksen teki Pietro Tacca (1577–1640) vähän ennen
       *     vuotta 1634, mallina marmorinen italialainen kopio
       *     hellenistisestä alkuperäisestä;
       *   - marmori löytyi Roomasta, ja Medicit toivat sen Firenzeen
       *     1500-luvun puolivälissä; se on nykyään Uffizin antiikin
       *     osastolla, ja se yhdistettiin löytymisestään lähtien
       *     kreikkalaisen taruston Kalydonian villisikaan;
       *   - pronssi oli alun perin tarkoitettu Bobolin puutarhaan,
       *     sitten se siirrettiin Mercato Nuovon loggiaan; se oli
       *     ensin itään päin via Calimalalla apteekin edessä, joka sai
       *     siitä nimen Farmacia del Cinghiale, ja siirrettiin
       *     myöhemmin etelänpuoleiselle sivulle, jotta markkinoilla
       *     olisi tilaa liikkua;
       *   - kävijät pudottavat kolikon eläimen auki olevaan kitaan ja
       *     antavat sen tipahtaa alla olevan ritilän läpi onnea
       *     tuomaan, ja hankaavat kuonoa varmistaakseen paluunsa
       *     Firenzeen; skotlantilainen matkakirjailija Tobias Smollett
       *     mainitsi tavan jo 1766;
       *   - juuri tämä on pitänyt kuonon kiiltävänä, kun muu ruho on
       *     patinoitunut tummanruskeanvihreäksi;
       *   - nykyinen patsas on Ferdinando Marinellin valimon vuonna
       *     1998 valama kopio, joka asetettiin paikalleen 2008;
       *     Taccan pronssi on suojassa Museo Stefano Bardinissa
       *     Palazzo Mozzissa.
       */
      id: 'porcellino',
      nappi: 'Villisika, jonka kuono ei tummu',
      otsikko: 'Mercato Nuovon porsas',
      teksti: 'Kultaseppien sillalta on muutaman minuutin kävely '
        + 'kauppahallin holvien alle, jossa istuu pronssinen villisika '
        + 'kitansa auki. Firenzeläiset sanovat sitä porsaaksi, vaikka '
        + 'se ei ole porsas. Pietro Tacca valoi sen vähän ennen vuotta '
        + '1634, ja mallina oli marmoripatsas, joka oli itsekin kopio '
        + '— roomalainen jäljennös hellenistisestä alkuperäisestä. Se '
        + 'marmori löytyi Roomasta, Medicit toivat sen Firenzeen '
        + '1500-luvun puolivälissä, ja jo silloin sitä sanottiin '
        + 'Kalydonian villisiaksi, tarujen pedoksi. Pronssi oli '
        + 'tarkoitettu Bobolin puutarhaan, mutta se päätyi '
        + 'kauppahallin kulmaan, ensin apteekin eteen — apteekki sai '
        + 'siitä nimekseen Villisian apteekki — ja myöhemmin sivummalle, '
        + 'jotta markkinoilla mahtui kulkemaan. Ja sitten alkoi se, '
        + 'mikä tekee tästä eläimestä kiinnostavan. Kulkijat '
        + 'pudottavat kolikon sen kitaan ja katsovat, meneekö se '
        + 'ritilän läpi, ja hankaavat kuonoa palatakseen vielä '
        + 'kaupunkiin. Tapa oli vanha jo silloin, kun skotlantilainen '
        + 'matkakirjailija Tobias Smollett kirjoitti siitä vuonna 1766 '
        + '— eli isoisäsi käydessä kuonoa oli hangattu jo yli sata '
        + 'vuotta. Siksi eläin on kahta väriä: ruho on patinoitunut '
        + 'tummanruskeanvihreäksi, kuono kiiltää kuin uusi. Holvin alla '
        + 'seisoo nykyään kopio, joka valettiin 1998 ja nostettiin '
        + 'paikalleen 2008; Taccan oma pronssi on suojassa museossa '
        + 'joen toisella puolella. Kopiota hangataan tarkalleen yhtä '
        + 'ahkerasti.',
      /*
       * Commons 29.8.2026: 1817×2726, CC BY-SA 2.5, tekijä Thermos,
       * kuvattu 9.6.2006, kuvaus nimeää Taccan ja kertoo veistoksen
       * olevan pronssikopio antiikin työstä. Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatseluna: lähikuva
       * villisian päästä, kuono kirkkaana ja muu pronssi tummana —
       * täsmälleen se, mistä teksti kertoo. Taustalla sumeita
       * markkinakojuja, ei tunnistettavia ihmisiä.
       */
      kuva: {
        tiedosto: 'PorcellinoFlorence.jpg',
        selite: 'Mercato Nuovon villisian kuono on hankaamisesta '
          + 'kirkas, vaikka muu pronssi on patinoitunut '
          + 'tummanruskeanvihreäksi.',
        lahde: 'Thermos, Wikimedia Commons (CC BY-SA 2.5)',
      },
      visa: {
        kysymys: 'Miksi Mercato Nuovon villisian kuono on kirkas, '
          + 'vaikka muu eläin on tumma?',
        vaihtoehdot: [
          'Kuono on valettu vaaleammasta metallista',
          'Se kiillotetaan joka aamu markkinoiden alkaessa',
          'Kulkijat hankaavat sitä kädellään',
        ],
        oikea: 2,
        fakta: 'Tapa on ollut tiedossa ainakin vuodesta 1766, jolloin '
          + 'Tobias Smollett kirjoitti siitä. Kolikko pudotetaan '
          + 'eläimen kitaan ja sen pitäisi mennä ritilän läpi.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä on kartanpiirtäjä, joka mittaa kaiken.
       * Tämä on kaupungin oma mittamies — ja se, mitä väärästä
       * mittauksesta seurasi.
       *
       * FAKTAT (kaksi artikkelia, haettu 29.8.2026):
       *   - en-Wikipedia "Paolo dal Pozzo Toscanelli" (johdanto sekä
       *     osiot "Cartography" ja "Astronomy"): Toscanelli (1397 –
       *     10.5.1482) oli firenzeläinen matemaatikko, tähtitieteilijä
       *     ja kosmografi; ystäväpiiriin kuuluivat Filippo
       *     Brunelleschi ja Leon Battista Alberti; vuonna 1474 hän
       *     lähetti kirjeen ja kartan Lissabonin tuomiokirkon papille
       *     Fernão Martinsille, joka vei sen kuningas Alfonso V:lle,
       *     ja kirjeen sekä kartan Toscanelli lähetti myöhemmin
       *     Kristoffer Kolumbukselle, joka piti ne mukanaan
       *     ensimmäisellä matkallaan; Toscanelli arvioi Aasian noin
       *     5 000 mailia todellista lähemmäs; hän kirjasi kuusi
       *     komeettaa (1433, 1449, 1456, kaksi vuonna 1457 ja 1472);
       *     vuonna 1475 hän puhkaisi tuomiokirkon kupoliin reiän ja
       *     teki gnomonin 91,05 metrin korkeuteen lattiasta
       *     meridiaaniviivaa varten; korkeuden takia lattialle mahtui
       *     vain noin kymmenen metrin pätkä viivaa pääalttarin ja
       *     poikkilaivan pohjoisseinän väliin, ja havaintoja voi tehdä
       *     noin 35 päivää kesäpäivänseisauksen molemmin puolin.
       *   - it-Wikipedia "Paolo dal Pozzo Toscanelli" (johdanto ja
       *     osio "Biografia"): sama syntymä- ja kuolinvuosi, sama
       *     ystävyys Brunelleschin ja Albertin kanssa; hänen
       *     komeettahavaintonsa ovat vanhimmat, joista on tieto; hänen
       *     tekemänsä gnomoni oli aikanaan korkein koskaan tehty; hän
       *     piirsi Ptolemaioksen Geografian pohjalta kadonneen
       *     kartan, joka näytti reitin Intiaan Atlantin yli ja jonka
       *     laskelma puolitti todellisen matkan.
       *
       * MITÄ EI KERROTA: mitä Kolumbuksen matkasta seurasi. Täky on
       * mittaustarina, ja piikki osoittaa mittaajaan (Perustuslaki,
       * pilari 3).
       */
      id: 'toscanelli',
      nappi: 'Reikä kupolissa ja kartta, joka oli väärin',
      otsikko: 'Toscanellin kaksi mittausta',
      teksti: 'Paolo dal Pozzo Toscanelli oli firenzeläinen '
        + 'matemaatikko, tähtitieteilijä ja kartanpiirtäjä, joka eli '
        + 'kahdeksankymmentäviisi vuotta ja tunsi kaikki: Brunelleschi '
        + 'oli hänen ystävänsä ja Leon Battista Alberti myös. Vuonna '
        + '1475 hän teki jotain, mitä kirkossa harvoin tehdään: '
        + 'puhkaisi reiän kupoliin. Reikä on 91 metriä lattian '
        + 'yläpuolella, ja siitä lankeava auringonkuva osuu keskipäivän '
        + 'aikaan lattiaan piirretylle viivalle. Se oli aikansa korkein '
        + 'gnomoni. Korkeus on samalla sen rajoitus: näin ylhäältä '
        + 'tuleva kuva vaeltaa niin nopeasti, että lattialle mahtuu '
        + 'vain kymmenkunta metriä viivaa pääalttarin ja poikkilaivan '
        + 'pohjoisseinän väliin — auringon paikkaa voi lukea vain noin '
        + '35 päivää kesäpäivänseisauksen molemmin puolin. Sama mies '
        + 'kirjasi kuusi komeettaa, ja ne ovat vanhimmat '
        + 'komeettahavainnot, joista meillä on tieto. Ja sitten hän '
        + 'teki toisen mittauksen. Vuonna 1474 hän lähetti Lissabonin '
        + 'tuomiokirkon papille kirjeen ja kartan, joissa hän esitti, '
        + 'että Aasiaan pääsee purjehtimalla länteen. Kartta vietiin '
        + 'Portugalin kuninkaalle, ja myöhemmin Toscanelli lähetti '
        + 'saman kartan Kristoffer Kolumbukselle, joka piti sitä '
        + 'mukanaan. Toscanelli oli laskenut Aasian noin viisituhatta '
        + 'mailia liian lähelle. Kaksi mittausta, sata vuotta '
        + 'käytännön kokemusta, ja toinen niistä pahasti pielessä — '
        + 'ja juuri se väärä oli se, jonka mukaan lähdettiin.',
      /*
       * Commons 29.8.2026: 1990×1215, public domain, tekijä John
       * George Bartholomew, päiväys 1884, kuvaus "The map of the
       * Atlantic Ocean according to Paolo dal Pozzo Toscanelli in
       * 1474, overlaid on top of a current map". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatseluna: painettu kartta,
       * jossa Toscanellin Cathay ja Cippangu ovat siellä, missä
       * Amerikka oikeasti on; oikea rannikko piirretty vaaleansinisenä
       * alle. Ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: virhe näkyy kuvassa itsessään — ei
       * tarvitse uskoa tekstiä, sen näkee. Kartanpiirtäjän
       * pojanpojalle sopii kartta.
       */
      kuva: {
        tiedosto: 'Atlantic Ocean, Toscanelli, 1474.jpg',
        selite: 'Toscanellin vuoden 1474 Atlantti nykyisen rannikon '
          + 'päälle asetettuna: Cathay ja Cippangu ovat siinä kohdassa, '
          + 'jossa on Amerikka.',
        lahde: 'John George Bartholomew 1884, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä varten Toscanelli puhkaisi vuonna 1475 reiän '
          + 'tuomiokirkon kupoliin?',
        vaihtoehdot: [
          'Auringon paikan mittaamista varten',
          'Jotta kupolin sisään saataisiin nostettua telineiden köydet',
          'Jotta kesän kuumuus pääsisi ulos holvin alta',
        ],
        oikea: 0,
        fakta: 'Reikä on 91 metrin korkeudella, ja se oli aikansa '
          + 'korkein gnomoni. Toscanellin kirjaamat kuusi komeettaa '
          + 'ovat vanhimmat komeettahavainnot, joista on tieto.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js, firenze[4]:
   * *"Kuka firenzeläinen runoilija kirjoitti Jumalaisen näytelmän?"*
   * Visasääntö täyttyy kahdesti yli: vastaus opitaan kokemuksesta,
   * mutta kysymyksen sanamuoto ei toistu tekstissä, EIKÄ VASTAUSRIVI
   * "Dante Alighieri" ESIINNY TÄSSÄ SELLAISENAAN — runoilijaa
   * puhutellaan koko oppitunnin ajan pelkällä etunimellä, ja runoelmasta
   * käytetään sen omaa nimeä Commedia. Sanan "jumalainen" alkuperä
   * kerrotaan, joten pelaaja osaa yhdistää sen suomalaiseen nimeen
   * itse — juuri sen verran työtä, että visa mittaa ymmärrystä eikä
   * lähimuistia (docs/moduulit/tarinakaari.md, luku 6 kohta 6).
   *
   * MIKSI OPPITUNTI ON KIELESTÄ JA HAUDASTA: kaupunkilehti ei käsittele
   * runoilijaa lainkaan (haku 29.8.2026: "Dante" ja "Commedia" eivät
   * esiinny Firenzen lehden yhdessäkään kentässä), joten oppitunti ei
   * ole lehden toisinto. Aihe kytkeytyy myös merkintään: pääkaupunki,
   * joka menetti hovin, sai sen ensimmäiseksi kansalliseksi juhlaksi
   * karkotetun runoilijan patsaan.
   *
   * FAKTAT (neljä artikkelia, kaikki haettu 29.8.2026):
   *   - en-Wikipedia "Dante Alighieri" (osiot "Exile from Florence"
   *     sekä "Death and burial"): runoilija oli kaksi kuukautta vuonna
   *     1300 Firenzen priori; maaliskuussa 1302 hänet tuomittiin
   *     kahden vuoden karkotukseen ja suureen sakkoon; hän ei
   *     maksanut, koska piti itseään syyttömänä ja koska hänen
   *     omaisuutensa oli takavarikoitu, ja tuomio muuttui ikuiseksi
   *     karkotukseksi — palaaminen sakkoa maksamatta olisi merkinnyt
   *     roviota; vuonna 1315 Firenze tarjosi armahdusta, mutta ehtona
   *     oli julkinen katumus ja korkea sakko, ja hän kieltäytyi;
   *     hän kuoli Ravennassa 14.9.1321 malariaan noin 56-vuotiaana ja
   *     haudattiin sinne; Firenze pyysi luita takaisin toistuvasti,
   *     Ravennan vartijat kieltäytyivät ja piilottivat ne kerran
   *     luostarin valeseinään; Firenze rakensi haudan Santa Croceen
   *     1829, ja se on ollut tyhjä siitä lähtien; haudan etureunassa
   *     lukee "Onorate l'altissimo poeta"; kesäkuussa 2008 Firenzen
   *     kaupunginvaltuusto kumosi tuomion.
   *   - en-Wikipedia "Divine Comedy" (johdanto ja nimeä koskeva
   *     kappale): runoelma aloitettiin noin 1308 ja saatiin valmiiksi
   *     noin 1321; se on kirjoitettu toscanaksi ja auttoi tekemään
   *     siitä italian yleiskielen; alkuperäinen nimi oli pelkkä
   *     Comedìa, myös ensimmäisessä painetussa laitoksessa 1472;
   *     varhaisin tunnettu "divina"-lisäys on Giovanni Boccaccion
   *     teoksessa Trattatello in laude di Dante (kirjoitettu
   *     1351–1355), ja ensimmäinen laitos, jonka nimessä luki Divina
   *     Comedia, oli Lodovico Dolcen 1555.
   *   - en-Wikipedia "Italian language" (osio "Contemporary times"):
   *     milanolainen Alessandro Manzoni kirjoitti Kihlautuneet
   *     firenzen kielellä ja kuvasi vuoden 1840 laitoksen esipuheessa
   *     valintaansa milanonsa "huuhtomiseksi Arnon vesissä"; Tullio
   *     De Mauro arvioi, että vuonna 1861 vain 2,5 prosenttia
   *     väestöstä osasi yleiskieltä kunnolla, Arrigo Castellani
   *     arvioi saman luvun kymmeneksi prosentiksi.
   *   - it-Wikipedia "Firenze capitale" (osio "Il risanamento di
   *     Firenze"): pääkaupunkikauden ensimmäinen kansallisesti
   *     merkittävä julkinen tilaisuus oli ravennalaisen kuvanveistäjä
   *     Enrico Pazzin tekemän muistomerkin paljastaminen Santa Crocen
   *     aukiolla runoilijan syntymän kuudensadan vuoden juhlana
   *     14.5.1865 kuningas Vittorio Emanuele II:n läsnä ollessa.
   */
  oppitunti: {
    otsikko: 'Hauta, joka on ollut tyhjä lähes kaksisataa vuotta',
    teksti: 'Santa Crocen kirkossa on hauta, jossa ei ole ketään. Se '
      + 'rakennettiin vuonna 1829 miehelle, jonka kaupunki oli itse '
      + 'ajanut pois. Dante oli vuonna 1300 kaksi kuukautta Firenzen '
      + 'priori, ja kaksi vuotta myöhemmin voittanut puolue tuomitsi '
      + 'hänet karkotukseen ja suureen sakkoon. Hän ei maksanut. '
      + 'Tuomio muuttui ikuiseksi: jos hän palaisi maksamatta, hänet '
      + 'poltettaisiin. Kun kaupunki vuonna 1315 tarjosi armahdusta, '
      + 'ehtona oli julkinen katumus, ja hän kieltäytyi siitäkin. Hän '
      + 'kuoli Ravennassa syyskuussa 1321 ja on siellä yhä: Firenze '
      + 'pyysi luita takaisin kerta toisensa jälkeen, ja Ravenna '
      + 'kieltäytyi niin päättäväisesti, että luut piilotettiin '
      + 'kerran luostarin valeseinään. Karkotusvuosinaan hän '
      + 'kirjoitti runoelman, jonka nimeksi hän pani vain Commedia. '
      + 'Sana "jumalainen" ei ole hänen: sen liitti nimeen ensimmäisen '
      + 'kerran Giovanni Boccaccio noin kolmekymmentä vuotta hänen '
      + 'kuolemansa jälkeen, ja vasta vuoden 1555 laitoksessa se '
      + 'painettiin kanteen asti. Tärkeämpää oli se, millä kielellä '
      + 'runoelma kirjoitettiin. Oppineet kirjoittivat latinaksi; hän '
      + 'kirjoitti sitä toscanaa, jota Firenzen kaduilla puhuttiin. '
      + 'Siitä puheenparresta tuli aikaa myöten koko maan kirjakieli. '
      + 'Milanolainen Alessandro Manzoni kirjoitti oman romaaninsa '
      + 'uusiksi firenzen kielellä ja sanoi vuoden 1840 esipuheessaan '
      + 'huuhtoneensa vaatteensa Arnon vesissä. Yhtenäistä maata '
      + 'kieli ei silti vielä tehnyt: kielitieteilijöiden arviot siitä, '
      + 'kuinka moni osasi vuonna 1861 yleiskieltä kunnolla, vaihtelevat '
      + 'kahdesta ja puolesta prosentista kymmeneen. Ja kun kaupunki '
      + 'sitten sai hovin ja pääkaupungin arvon, se järjesti '
      + 'ensimmäiseksi suureksi juhlakseen 14. toukokuuta 1865 '
      + 'karkotetun runoilijan patsaan paljastuksen Santa Crocen '
      + 'aukiolla, kuningas paikalla ja koko Italia lippuineen. '
      + 'Kuudessasadassa vuodessa ehtii moni asia kääntyä päinvastoin. '
      + 'Itse tuomion kaupunki kumosi vasta vuonna 2008.',
    /*
     * Commons 29.8.2026: 5477×4326, public domain, tekijä Domenico di
     * Michelino (Alesso Baldovinettin luonnoksen mukaan), päiväys
     * 1465, Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n
     * esikatseluna: maalaus, jossa runoilija seisoo avoin kirja
     * kädessä, oikealla Firenze kupoleineen ja muureineen, vasemmalla
     * helvetin portti ja keskellä kiirastulen vuori. Maalattuja
     * hahmoja, ei valokuvattuja ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: teos on tuomiokirkossa Firenzessä, eli
     * kaupunki ripusti karkotetun runoilijan seinälleen jo 1465 —
     * kaksi vuosisataa ennen tyhjää hautaa. Kuva kertoo saman asian
     * kuin oppitunti, mutta ilman sanoja.
     */
    kuva: {
      tiedosto: 'Michelino DanteAndHisPoem.jpg',
      selite: 'Domenico di Michelinon maalaus vuodelta 1465 Firenzen '
        + 'tuomiokirkossa: runoilija pitelee avointa runoelmaansa, '
        + 'oikealla oma kaupunki, vasemmalla helvetin portti.',
      lahde: 'Domenico di Michelino 1465, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Firenzellä ei ole tarinakaaren pakettia (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT) eikä riviä js/packs/kohtaamiset.js:ssä, joten tälle
   * kaupungille ei ole valmista hahmoa: alla oleva Ginevra on EHDOTUS,
   * ei kaanonia. Kortti on esittely; VARSINAINEN KYSYMYS on ennallaan
   * laattamekaniikassa (game.actionQuiz lukee js/packs/
   * europe-questions.js, firenze), eikä tämä paketti kosketa sitä.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortti rakennetaan ilman
   * kuvaa, joten kentät ovat hahmo, nappi, varmistus, vihjeOsio ja
   * teksti.
   *
   * KAAVA (aallon 4B tilaus): suvun jatkumo + epäusko +
   * portinvartijakysymys. Kolmesta osasta keskimmäinen on se, joka
   * pitää vartijakuoron hajallaan — Ginevra ei usko omaa perinnettään
   * mutta jatkaa sitä silti.
   *
   * MIKSI KULTASEPPÄ: merkinnän toinen virke on sillan puodeista, joissa
   * on käyty samaa kimaltavaa kauppaa neljäsataa vuotta. Kohtaamispiste
   * on sama silta, ja ammatti on ainoa Firenzessä, jonka jatkuvuudesta
   * isoisä itse kirjoittaa.
   *
   * AMMATIN SAA SANOA TÄSSÄ, JA JUURI TÄSSÄ. Fablen kaanonkorjaus
   * 29.8.2026 poisti sanan "kultaseppä" sekä merkinnästä että Livian
   * repliikistä, koska se antoi js/packs/europe-questions.js:n
   * `firenze`-lohkon kolmannen laattakysymyksen vastauksen
   * (*"Mitä Ponte Vecchion kaupoissa on myyty vuodesta 1593 lähtien?"*
   * → *kultasepäntöitä*) ennen kysymystä. KOHTAAMINEN ON KYSYMYKSEN
   * TAKANA — pelaaja on jo vastannut siihen päästessään tänne — joten
   * hahmon ammatti saa lukea kortissa. Livian repliikki päättyy
   * tarkoituksella vihjeeseen *"kohta näet keiden käsissä"*, joka
   * osoittaa juuri tähän korttiin.
   *
   * VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   * mitään, ei tilaa mitään eikä käske ketään. Suvun syy pitää kirjaa
   * on suvun oma: kesken jäänyt kauppa on kultasepälle pahempi kuin
   * turha rivi.
   *
   * HUOM FABLELLE: viimeinen yksityiskohta (nimetön rivi vieraalla
   * käsialalla) on tarkoituksella pieni ja poistettavissa yhdellä
   * virkkeellä. Se kaikuu Sofian korjattua mallia (tarinakaari, luku 2),
   * ja jos malli halutaan säästää Sofialle, virke lähtee ilman että
   * muu kortti muuttuu.
   */
  kohtaaminen: {
    hahmo: 'Kultaseppä Ginevra',
    nappi: 'Tapaa kultaseppä',
    varmistus: 'Haluatko varmasti tavata Ginevran juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * firenze): 'kaupunki' tai 'kuvataide'. Viidestä laattakysymyksestä
     * neljä koskee maata, kupolia, siltaa tai Uffizia, ja niistä
     * jokaiselle lähin tuki on kaupunkisivulla.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Ginevran verstas on sillan keskivaiheilla, ja hän tekee '
      + 'työtä samalla penkillä, jonka ääressä hänen isoäitinsä ja '
      + 'tämän isä tekivät ennen häntä. Perheellä on kulunut vihko, '
      + 'johon on merkitty jokainen tilaus, jota ei koskaan haettu '
      + 'pois: päiväys, paino ja tilaajan nimi, vanhimmat riveistä '
      + '1800-luvulta. Ginevra sanoo suoraan pitävänsä koko vihkoa '
      + 'taikauskona ja kirjoittavansa siihen silti, koska kesken '
      + 'jäänyt kauppa on hänen mielestään pahempi asia kuin turha '
      + 'rivi. Yhdessä rivissä ei ole nimeä lainkaan, ja käsiala on '
      + 'vieras. Ennen kuin hän näyttää sitä kenellekään, hän haluaa '
      + 'tietää, tunteeko tulija tästä kaupungista edes sen, minkä '
      + 'jokainen täkäläinen lapsi tietää.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin muillakin fokuskaupungeilla.
   */

  /*
   * KOHTAAMISPAIKKA: PONTE VECCHIO.
   *
   * 43,767989 N / 11,253192 E — it-Wikipedia "Ponte Vecchio",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((11,253192 − (−175)) mod 360) × (12000/360)
   *                     = 186,253192 × 33,3333… = 6208,4
   *                   y = (millerY(43,767989) − millerY(76)) × 12000/2π
   *                     = 1652,2
   *   europe          x = (11,253192 + 11) × 19,2 = 427,3
   *                   y = (72 − 43,767989) × 26,3 = 742,5
   *
   * TARKISTUS LAATTOJA VASTEN — JA POIKKEAMA, JOKA ON PAKKO KIRJATA.
   * Maailmankartalla Firenzen laatta on 6208,5 / 1652,1 (js/packs/
   * maailmankartta.js), eli piste osuu käytännössä laatan päälle, ja
   * js/fokuspiste.js siirtää sen koilliseen (PISTE_ERO_MIN = 14). Niin
   * pitääkin: silta on keskustassa.
   *
   * EUROOPAN LAUDALLA laatta on 412 / 746 (js/packs/europe.js), eli
   * laskettu piste jää siitä noin 16 yksikön päähän itäkoilliseen.
   * Poikkeama ei ole kaavassa vaan LAATAN OMASSA SIJAINNISSA: sama
   * kaava osuu muihin Italian kaupunkeihin pilkulleen (Rooma 451/792 ↔
   * laskettu 450,9/791,8; Venetsia 448/698 ↔ 448,0/698,5 — kummankin
   * koordinaatit it-Wikipediasta samalla haulla 29.8.2026), ja 412/746
   * vastaa pistettä 43,63 N / 10,46 E, joka on runsaat kuusikymmentä
   * kilometriä Firenzestä länsilounaaseen. Piste on tässä laskettu oikein
   * maastoa vasten, kuten muissakin paketeissa, eikä sitä ole vedetty
   * laatan mukaan; koska etäisyys ylittää PISTE_ERO_MIN-rajan, peli ei
   * myöskään siirrä sitä. Integroija päättää, siirretäänkö piste laatan
   * viereen vai korjataanko laatta — laatan korjaus on laudan asia eikä
   * tämän tiedoston. (Sama tilanne kuin Sevillassa, aalto 4A.)
   */
  kohtaamispiste: {
    nimi: 'Ponte Vecchio',
    laudat: {
      maailmankartta: { x: 6208.4, y: 1652.2 },
      europe: { x: 427.3, y: 742.5 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Firenzen sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Firenze",
   * 2 = Kuvataide, 3 = Menovinkit (Italian maapaketista, js/packs/
   * maa-kategoriat.js ITA). Sama pino kuin Roomalla ja Ateenalla:
   * kaksi kulttuurikategoriaa ja maan Menovinkit-sivu.
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on Firenzen
   * kulttuurivisa (js/packs/europe-kulttuuri.js, floriini), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä. Kumpi tahansa aarteen avaajista sytyttää
   * pisteen, ja jälkimmäisestä saa enää rahaa.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js:n `firenze` on
   * "Firenze 1887" (tuomiokirkon marmorijulkisivu), joten sivun 3
   * palkinto lunastaa lupauksensa ilman lisätyötä.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: VENUS_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PIHVI_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Caravaggion
   * kadonnut maalaus. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Taidekauppias kertoi minulle maalarista, joka pakeni miekka '
      + 'kädessä kaupungista toiseen ja jätti jälkeensä tauluja, joista '
      + 'kaikkia ei ole koskaan laskettu. Yksi niistä on hänen mukaansa '
      + 'yhä väärässä huoneessa, väärän nimen alla, eikä kukaan ole '
      + 'katsonut sitä kunnolla kahteensataan vuoteen. Pimeästä ne '
      + 'hänen taulunsa syntyivät — pimeään ne osaavat myös kadota.',
  },
};
