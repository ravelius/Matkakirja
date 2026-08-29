/*
 * VARSOVAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4C.
 *
 * Sisartiedosto js/packs/fokusvirta-vilna.js:lle ja -sevilla.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js). Uusi
 * kaupunki on yksi tiedosto ja yksi rivi rekisterissä (js/packs/
 * fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ RIVIÄ eikä koske
 * sw.js:ään, savukkeisiin tai mihinkään muuhun tiedostoon: aallon 4C
 * kaupungit kokoaa integrointiagentti yhtenä nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi).
 * NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Rafaelin kadonnut muotokuva (js/packs/paikallisaarteet.js,
 * POL). PIENI AARRE: Krakovan obwarzanek-rinkeli (sama taulu).
 * MOLEMMAT OVAT KRAKOVAN OMIA, ja tämä paketti jättää ne Krakovalle:
 * Varsovan kaanoninen aarremerkintä ei nimeä yhtäkään esinettä vaan
 * puhuu koko tavasta ("aarre jota ei voi puolustaa, pitää piilottaa tai
 * lähettää matkalle"), ja tämän paketin sisältö kantaa juuri sitä.
 *
 * FAKTAPOHJA. Puolalle EI ole valmista takynostot-työaineistoa, joten
 * täyt, oppitunti ja lehtitehtävät on rakennettu kahdesta lähteestä ja
 * vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Varsovan kaupunkilehden osiot
 *      "Varsova" ja "Tiede ja keksinnöt" (js/packs/
 *      kulttuuri-kategoriat.js, varsova), Puolan maalehden osiot
 *      (js/packs/maa-kategoriat.js, POL/taide, POL/luonto ja
 *      POL/menovinkit), kaupungin juliste (js/packs/julisteet.js,
 *      varsova) ja maan aarretiedot (js/packs/paikallisaarteet.js,
 *      POL). Nämä on jo kertaalleen tarkistettu ja hyväksytty peliin —
 *      myös se herokuva, jonka tämä paketti lainaa sellaisenaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 30.8.2026 (action=query&
 *      prop=extracts, redirects=1, NODE_USE_ENV_PROXY=1) ja katsottu
 *      KAHDESTA riippumattomasta lähteestä. Ne on nimetty kunkin kohdan
 *      omassa kommentissa, samoin ne kohdat, joissa lähteet ovat eri
 *      mieltä (vedutasarjan koko, aseman pituus, turin säkäkorkeus) ja
 *      se yksi kohta, jolle löytyi vain yksi lähde (turin kallo
 *      Tukholmassa) — mitään näistä ei ole pyöristetty yhdeksi luvuksi.
 *
 * ── PAKETIN SELKÄRANKA ON KAANONIN OMA LAUSE ───────────────────────
 *
 * Aarremerkintä luettelee kolme asiaa: *"Kirjastot, sydämet, taulut —
 * kaikki tärkein on täällä liikkunut ja liikkuu vielä."* Paketti jakaa
 * ne kolmelle pinnalle eikä kerro yhtäkään kahdesti:
 *
 *   SYDÄMET  → Livian kanoninen huomio (Chopinin sydän). Ei toistu
 *              missään muualla tässä tiedostossa.
 *   TAULUT   → täky `canaletto`: Bellotton Varsova-vedutat.
 *   KIRJASTOT→ oppitunti: Załuskien kirjasto.
 *
 * Kolmas täky (`tur`) on sama tapa kolmannessa muodossa — kirjanpito
 * siitä, mikä katosi — ja toinen täky (`raideleveys`) on erän
 * kevennys ja mittausjuttu, jottei paketti soi yhdellä nuotilla.
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. LIVIAN KUVA ON KAUPUNKILEHDEN HEROKUVA (varsova/avauskuvat), ei
 *      uusi Commons-kuva.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA.
 *   5. TÄKYNOSTOJA EI OLE TÄSSÄ PAKETISSA. Puolan pooli kirjoitetaan
 *      aallon 4C Krakova-pakettiin, jotta maalle tulee yksi pooli eikä
 *      kahta rinnakkaista (js/fokusnosto.js nostoMaanPooli lukee
 *      kaupungin oman kentän ennen maan poolia, joten kaksi kaupunkia
 *      voisi huomaamatta ajautua eri sisältöihin). `kohteet`-kenttää ei
 *      myöskään ole: js/packs/fokuskohteet-pol.js:ää ei ole olemassa,
 *      eikä tämä paketti luo sitä.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan. OIKEAN VASTAUKSEN PAIKKA VAIHTELEE
 * (docs/moduulit/tarinakaari.md, luku 6 kohta 2): tämän paketin viisi
 * visaa antavat oikean vastauksen paikoiksi 1, 2, 0, 1 ja 2 — eikä
 * oikea ole yhdessäkään pisin vaihtoehto. Pituudet on mitattu käsin.
 *
 * ── SPOILERIT ──────────────────────────────────────────────────────
 *
 * Varsovan laattakysymykset (js/packs/europe-questions.js, `varsova`)
 * ovat: maan pääkaupunki, vanhankaupungin jälleenrakennus, Chopin
 * pianosäveltäjänä, Maria Skłodowska-Curien kaksi Nobelia ja pierogit.
 * Lisäksi kaupungilla on kulttuurivisa (js/packs/europe-kulttuuri.js),
 * joka kysyy Chopinin sydäntä ja jonka js/fokustehtavat.js pukee lehden
 * sivun 1 AARTEEN AVAUS -laatikoksi.
 *
 * Tämän paketin OMAT tekstit eivät kysy eivätkä vastaa yhteenkään
 * niistä. Kolme huomautusta, jotka kuuluvat Fablelle eivätkä minulle:
 *
 *   - MERENNEITOLEGENDAA EI SELITETÄ. Patsas mainitaan Livian kuvan
 *     selitteessä (se on lehden oma, jo hyväksytty tieto: kopio
 *     Konstanty Hegelin vuoden 1855 veistoksesta), mutta legendan
 *     sisältöä — kalastajat, joen mutka, käsky perustaa kaupunki — ei
 *     kerrota missään tässä tiedostossa.
 *   - KAANON KERTOO ITSE KAKSI VASTAUSTA. Livian kanoninen teksti
 *     nimeää Chopinin sydämen (kulttuurivisan vastaus) ja sanoo
 *     vanhankaupungin rakennetun uudelleen vanhojen kuvien mukaan
 *     (laattakysymyksen 2 vastaus). Kaanon on sanatarkka enkä koske
 *     siihen; havainto on raportissa.
 *   - TÄKY `canaletto` KERTOO SAMAN ASIAN TOISIN. Se ei käytä
 *     laattakysymyksen vastausriviä sellaisenaan vaan puhuu siitä,
 *     mitä maalauksille tapahtui ja miksi ne kelpasivat piirustuksiksi.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu —
 * sama kaava kuin aalloissa 3 ja 4B. Kenttä on moottorissa
 * valinnainen (js/ui.js), ja teksti ja luenta ovat sanasta sanaan
 * samat, joten luennan voi ajaa suoraan (generoi-luennat-työnkulku)
 * ilman että tekstiin kosketaan. Valmis äänite menisi polkuun
 * assets/audio/puhe-fokus-matkakirja-varsova.mp3.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Vilnassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Esperantokysymys on Varsovan lehden sivun 2
 * ("Tiede ja keksinnöt") oman noston "Kieli, jonka keksijä antoi pois"
 * tekstiä ja suolakaivoskysymys sivun 3 (Puolan Menovinkit) oman
 * kohteen "Google Arts & Culture — Wieliczkan museoreitti katunäkymänä"
 * tekstiä ja selitettä (js/packs/kulttuuri-kategoriat.js ja js/packs/
 * maa-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI LENTÄVÄÄ YLIOPISTOA: sivun 2 osiolla on jo oma tehtävänsä,
 * joka kysyy juuri sitä, miksi salaista yliopistoa sanottiin
 * lentäväksi. Nimetty tehtävä syrjäyttää sivun oman (js/fokustehtavat.js
 * piirraSivunTehtava), joten AARTEEN AVAUS ottaa saman sivun TOISEN
 * noston — Zamenhofin — eikä sivulla kysytä samaa asiaa kahdesti.
 *
 * MIKSI EI CHOPININ SYDÄNTÄ: se on kaupungin kulttuurivisa, jonka
 * js/fokustehtavat.js pukee sivun 1 AARTEEN AVAUS -laatikoksi ilman
 * omaa riviään täällä. Sivulle 1 ei siksi kirjoiteta nimettyä tehtävää:
 * sivulla olisi silloin kaksi kysymyslaatikkoa.
 */
const ESPERANTO_VISA = {
  kysymys: 'Varsovalainen silmälääkäri Ludwik Zamenhof julkaisi 1887 '
    + 'ohuen kirjan, jossa oli uuden kielen kielioppi 16 säännössä. '
    + 'Mistä kieli sai nimensä?',
  /*
   * PISIN VAIHTOEHTO ON VÄÄRÄ (tarinakaari, luku 6 kohta 2). Pituudet
   * ovat 41 / 23 / 48 merkkiä, ja oikea on keskimmäinen. Kumpikaan
   * väärä ei ole puolitosi: esperanto ei ole latinaa eikä kirjan
   * painopaikka ole missään lähteessä kielen nimen selitys.
   */
  vaihtoehdot: [
    'Latinan sanasta, joka tarkoittaa yhteistä',
    'Sen tekijän salanimestä',
    'Varsovan kaupunginosasta, jossa kirja painettiin',
  ],
  oikea: 1,
  fakta: 'Kirjan tekijän nimeä ei ollut kannessa, vain salanimi Doktoro '
    + 'Esperanto, toivova tohtori. Samassa kirjassa Zamenhof luopui '
    + 'kaikista oikeuksistaan kieleen: kuka tahansa sai käyttää sitä.',
};

const WIELICZKA_VISA = {
  kysymys: 'Wieliczkan suolakaivoksesta Krakovan kupeessa nostettiin '
    + 'ruokasuolaa satojen vuosien ajan. Mihin asti?',
  /*
   * VAIHTOEHDOT OVAT SAMANMITTAISET: kolme paljasta vuosilukua eivät
   * kerro mitään pituudellaan. Väärät ovat uskottavia mutta eivät
   * puolitosia — kaivos oli molempina vuosina täydessä toiminnassa.
   */
  vaihtoehdot: [
    'Vuoteen 1796',
    'Vuoteen 1896',
    'Vuoteen 1996',
  ],
  oikea: 2,
  fakta: 'Kaivosta on kaivettu 1200-luvulta lähtien. Käytäviä kertyi 287 '
    + 'kilometriä ja syvyyttä 327 metriä, ja museoreitin voi kävellä '
    + 'katunäkymänä verkossa.',
};

export const FOKUSVIRTA_VARSOVA = {
  kaupunki: 'varsova',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ilman lisäystä. */
    paikkarivi: 'Varsova, syyskuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki elää kahta elämää: kaduilla puhutaan puolaa ja '
      + 'virastoissa venäjää, eikä kumpikaan puoli teeskentele, ettei '
      + 'huomaisi. Vanhankaupungin torilla värit ovat kirkkaat ja kapakat '
      + 'täynnä, mutta laulut loppuvat kesken, kun univormu kävelee ohi. '
      + 'Kuulin pianistista, joka kuoli nuorena kaukana täältä ja jonka '
      + 'sydämen sisar toi kotiin salaa — tämä kaupunki säilyttää '
      + 'rakkaimpansa sinne, minne keisari ei näe.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: kolme tagia, alku ja loppu eri
     * sävyssä. Yksikään sana, välimerkki tai sanajärjestys ei muutu.
     */
    luenta: '[curious] Kaupunki elää kahta elämää: kaduilla puhutaan puolaa '
      + 'ja virastoissa venäjää, eikä kumpikaan puoli teeskentele, ettei '
      + 'huomaisi. [softly] Vanhankaupungin torilla värit ovat kirkkaat ja '
      + 'kapakat täynnä, mutta laulut loppuvat kesken, kun univormu kävelee '
      + 'ohi. [whispers] Kuulin pianistista, joka kuoli nuorena kaukana '
      + 'täältä ja jonka sydämen sisar toi kotiin salaa — tämä kaupunki '
      + 'säilyttää rakkaimpansa sinne, minne keisari ei näe.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen. tests/fokusvirta.test.mjs vaatii jokaiselta
     * fokuskaupungilta oman maadoituksen, joka on yli 120 merkkiä eikä
     * ole sama merkkijono kuin huomio.
     *
     * MIKSI EI JAETTU KAANONISTA (Vilnan kaava): Varsovan kaanoninen
     * Livia-teksti on kolme virkettä, ja sen ainoa luonteva jakoraja
     * jättäisi `teksti`-kenttään enää neljä sanaa. Maadoitus on siksi
     * kirjoitettu Sevillan kaavalla — omana tekstinään, jonka JOKAINEN
     * väite on pelin jo hyväksymää aineistoa:
     *   (1) Kierbedźin silta, 474 metriä, Varsovan ensimmäinen
     *       teräksinen jokisilta, avattu 22.11.1864 — js/packs/
     *       julisteet.js, varsova (kaupungin oma juliste, jonka pelaaja
     *       voi voittaa tämän paketin JULISTE-tehtävästä);
     *   (2) Praga sai kaupunkioikeudet 1648 — js/packs/
     *       kulttuuri-kategoriat.js, varsova, Matkailijan Varsova,
     *       jakso "Kaksi rantaa, kaksi kaupunkia";
     *   (3) Pragassa on yhä sotaa edeltäviä kadunvarsitaloja, joen
     *       länsipuolella ei juuri — sama jakso.
     *
     * MIKSI JUURI TÄMÄ HAVAINTO: kaanoninen huomio kuittaa merkinnän
     * LOPUN (pianisti), joten maadoitus kuittaa sen ALUN — kahden
     * elämän kaupungin — ja siirtää jaon nykypäivään, jossa se kulkee
     * joessa eikä virastojen ovissa. Sama kaupunki, eri raja.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1
     * PAINOPISTE REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja
     * lopussa ("mut"), keskellä sanat ovat auki. Ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Isoisäsi kuuli kaksi kieltä, ja kahta elämää tässä '
      + 'kaupungissa eletään yhä — mutta raja ei kulje enää virastojen '
      + 'ovissa vaan joessa. Hänen matkavuonnaan Veikselin yli mentiin '
      + 'Kierbedźin siltaa pitkin: 474 metriä ristikkoa ja Varsovan '
      + 'ensimmäinen teräksinen jokisilta, avattu marraskuussa 1864. Sen '
      + 'itäpäässä on Praga, joka sai kaupunkioikeutensa 1648 ja liitettiin '
      + 'Varsovaan vasta 1700-luvun lopulla, ja siellä seisoo yhä sotaa '
      + 'edeltäviä kadunvarsitaloja — mut sinne pitää osata mennä erikseen.',
    /* KAANON (Fable) — Livian nykypäivän huomio sellaisenaan. */
    teksti: 'Se pianisti oli Chopin, ja hänen sydämensä on tänäkin päivänä '
      + 'muurattuna varsovalaisen kirkon pylvääseen.. Vanhakaupunki jonka '
      + 'isoisäsi näki tuhoutui sodassa lähes kokonaan — ja rakennettiin '
      + 'uudelleen niin tarkasti vanhojen kuvien mukaan, että se pääsi '
      + 'maailmanperintölistalle jälleenrakennuksena. Värit ovat taas '
      + 'kirkkaat. Torille.',
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/
     * kulttuuri-kategoriat.js, varsova/avauskuvat, heroerä 31):
     * Vanhankaupungin tori. Juuri se tori, jonne kaanoninen huomio
     * päättyy ("Torille.") ja jonka värit isoisä kirjasi.
     *
     * SELITE ON LEHDEN OMASTA SELITTEESTÄ LYHENTÄEN, JA LYHENNYS ON
     * HARKITTU. Lehden selite kertoo myös vuosien 1949–1953
     * jälleenrakennuksen Bellotton maalausten avulla; se on jätetty pois
     * kahdesta syystä: kaanoninen huomio kertoo saman asian omin sanoin
     * heti tämän kuvan vieressä, ja täky `canaletto` on kokonaan siitä.
     * Merenneidosta kerrotaan vain se, mikä lehdessäkin lukee — patsas
     * on kopio Konstanty Hegelin vuoden 1855 veistoksesta — eikä
     * legendan sisältöä sanota (ks. SPOILERIT tiedoston alussa).
     */
    kuva: {
      ampari: 'herokoe/hero-varsova-vanhatori.jpg',
      selite: 'Vanhankaupungin tori kaavoitettiin 1200-luvun lopulla, ja sen '
        + 'keskellä seisova merenneito on kopio Konstanty Hegelin vuoden '
        + '1855 veistoksesta, jonka alkuperäinen on kaupunginmuseossa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä kirjasi, että Vanhankaupungin torilla
       * värit ovat kirkkaat. Tämä kertoo, kuka ne värit oli maalannut
       * muistiin sata vuotta ennen häntä — ja mihin niitä myöhemmin
       * tarvittiin. Se on kaanonin luettelon "taulut".
       *
       * FAKTAT (kaksi riippumatonta lähdettä, haettu 30.8.2026):
       *   - en-Wikipedia "Bernardo Bellotto": syntyi Venetsiassa
       *     30.1.1721, kuoli Varsovassa 17.11.1780; oli Giovanni
       *     Antonio Canalin eli Canaletton sisarenpoika ja oppilas ja
       *     käytti Saksassa ja Puolassa enonsa nimeä Canaletto;
       *     Dresdenissä 1747–1758, Wienissä 1758, Münchenissä 1761;
       *     lähti Dresdenistä hakemaan työtä Katariina Suuren hovista
       *     Pietarista, mutta otti matkalla vastaan juuri valitun
       *     Puolan kuninkaan Stanisław August Poniatowskin kutsun
       *     hovimaalariksi; maalasi kuninkaalle 26 Varsova-vedutaa
       *     vuosina 1770–1780 Kuninkaanlinnan Panoraamasaliin
       *     (myöhemmin Canaletton sali); maalaukset siirrettiin
       *     Venäjälle ja palautettiin Puolan hallitukselle 1921, ja
       *     niitä käytettiin kaupungin jälleenrakennuksessa; on
       *     uskottavaa, että Bellotto käytti camera obscuraa
       *     tarkkuuden saavuttamiseksi; haudattiin Miodowa-kadun
       *     kapusiinikirkkoon.
       *   - pl-Wikipedia "Bernardo Bellotto": sama syntymä- ja
       *     kuolinpäivä; pääteos on 30 Varsovan ja Wilanówin vedutan
       *     galleria omassa Sali Prospektowa -salissaan (Canaletton
       *     sali) Kuninkaanlinnassa, ja niistä on säilynyt 24;
       *     kasvot on maalattu niin tarkasti, että asiantuntijat
       *     tunnistavat niistä yksittäisiä ihmisiä, enimmäkseen
       *     Poniatowskin sukua; arkkitehtuurissa hän salli itselleen
       *     tiettyjä oikaisuja ja parannuksia; tarkkuus perustui
       *     camera obscuraan ja suurennuslaseihin, ja juuri sitä
       *     tarkkuutta käytettiin sodassa tuhoutuneen Varsovan
       *     jälleenrakennuksessa; hautaa ei ole säilynyt.
       *
       * SARJAN KOKO ON LÄHTEISSÄ ERI, EIKÄ SITÄ PYÖRISTETÄ. en sanoo
       * 26 vedutaa, pl 30 (Varsova ja Wilanów yhdessä) ja 24
       * säilynyttä. Teksti kertoo molemmat luvut eikä valitse toista
       * pois — sama käytäntö kuin Vilnan painokiellon alkuvuodella.
       *
       * MITÄ EI KERROTA: kaupungin tuhoa vuonna 1944 ei kuvata, vain
       * se, mitä maalauksille tapahtui ja mihin niitä käytettiin
       * (tarinakaari, luku 2: ei sotasisältöä).
       */
      id: 'canaletto',
      nappi: 'Maalaukset, joita luettiin kuin piirustuksia',
      otsikko: 'Kaupungin muotokuvamaalari',
      teksti: 'Isoisäsi kirjasi torin värit muistiin. Sata vuotta ennen '
        + 'häntä sen oli tehnyt eräs venetsialainen, ja huomattavasti '
        + 'tarkemmin. Bernardo Bellotto syntyi Venetsiassa 1721 ja oppi '
        + 'maalaamaan enonsa työhuoneessa; eno oli Giovanni Antonio Canal, '
        + 'jota koko Eurooppa sanoi Canalettoksi. Saksassa ja Puolassa '
        + 'Bellotto käytti samaa nimeä itsestään, ja sekaannus on jäänyt '
        + 'elämään: Varsovassa Canaletto tarkoittaa sisarenpoikaa eikä '
        + 'enoa. Hän oli matkalla Pietariin hakemaan paikkaa Katariina '
        + 'Suuren hovista, kun juuri valittu Puolan kuningas Stanisław '
        + 'August Poniatowski kutsui hänet omakseen. Hän ei jatkanut '
        + 'matkaa. Loput elämästään hän maalasi Varsovaa ja Wilanówia '
        + 'kuninkaalle omaan saliinsa Kuninkaanlinnaan — lähteet '
        + 'laskevat sarjan kooksi 26 tai 30, ja '
        + 'niistä on tallella 24. Tarkkuus oli koko työn ydin. Kasvot '
        + 'ovat niin tarkkoja, että asiantuntijat tunnistavat maalauksista '
        + 'yksittäisiä ihmisiä, enimmäkseen kuninkaan sukua, ja apuna '
        + 'olivat camera obscura ja suurennuslasit. Rakennusten kohdalla '
        + 'hän tosin salli itselleen pieniä oikaisuja ja parannuksia. '
        + 'Maalaukset vietiin aikanaan Venäjälle ja palasivat Puolaan '
        + 'vuonna 1921. Ja sitten kävi niin, että kaupunkia koottaessa '
        + 'takaisin niitä luettiin kuin piirustuksia: ikkunarivit, '
        + 'listat, kattojen kaltevuudet. Mies oli maalannut muotokuvan '
        + 'kaupungista tietämättä, että kaupunki tarvitsisi sitä.',
      /*
       * Commons 30.8.2026: 4000×3150, public domain, Bernardo Bellotto,
       * päiväys 1777, Google Art Project. Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (800 px): katunäkymä, palatsien rivi,
       * vaunuja ja hevosia, muurilla rivi myytäviä kuvia. Maalattuja
       * hahmoja, ei valokuvattuja ihmisiä.
       *
       * MIKSI JUURI MIODOWA: se on katu, jonka kirkkoon Bellotto itse
       * haudattiin, ja kuvassa näkyy juuri se, mistä täky puhuu —
       * yksittäisten talojen listat ja ikkunarivit siinä tarkkuudessa,
       * jossa niitä pystyi myöhemmin lukemaan.
       */
      kuva: {
        tiedosto: 'Bernardo Bellotto - Miodowa Street in Warsaw - Google Art Project.jpg',
        selite: 'Bellotton Miodowa-katu vuodelta 1777: sama katu, jonka '
          + 'kirkkoon maalari itse haudattiin kolme vuotta myöhemmin.',
        lahde: 'Bernardo Bellotto 1777, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi Bernardo Bellottoa sanotaan Puolassa Canalettoksi?',
        /*
         * Pituudet 55 / 48 / 52 merkkiä: oikea on lyhin, pisin on
         * väärä. Kumpikaan väärä ei ole puolitosi — camera obscura on
         * kyllä totta, mutta se ei liity nimeen mitenkään.
         */
        vaihtoehdot: [
          'Kuningas antoi nimen nimittäessään hänet hovimaalariksi',
          'Se oli hänen enonsa nimi, ja hän käytti sitä itse',
          'Nimi tulee camera obscurasta, jolla hän piirsi ääriviivat',
        ],
        oikea: 1,
        fakta: 'Eno oli venetsialainen Giovanni Antonio Canal, jota koko '
          + 'Eurooppa sanoi Canalettoksi. Sisarenpojan Varsova-sarjan '
          + 'kooksi lähteet laskevat 26 tai 30 maalausta, ja niistä on '
          + 'tallella 24.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä on kartanpiirtäjä, joka mittaa kaiken —
       * ja tämä on kaupunki, jossa mitta oli kahdenlainen. Täky on myös
       * erän kevennys ja sen ainoa kohta, jossa hahmon oma kummallisuus
       * (hevospelko) saa välähtää (tarinakaari, luku 4: välähdys, ei
       * numero joka kaupungissa).
       *
       * 1873-ANKKURI: Wienin radan toista raidetta rakennettiin
       * vuosina 1872–1881, eli isoisän käydessä työ oli kesken.
       *
       * FAKTAT (kaksi riippumatonta lähdettä, haettu 30.8.2026):
       *   - en-Wikipedia "Warsaw–Vienna railway": rata avattiin 1845
       *     Kongressi-Puolassa; päälinja Varsovasta Itävallan
       *     vastaiselle raja-asemalle 327,6 km ja 27 asemaa;
       *     ensimmäinen rata Kongressi-Puolassa ja toinen koko Venäjän
       *     keisarikunnassa Tsarskoje Selon 27 kilometrin pätkän
       *     (1837) jälkeen; rata rakennettiin eurooppalaiseen
       *     normaaliraideleveyteen 1435 mm toisin kuin kaikki muut
       *     keisarikunnan radat, jotka olivat leveää 1524 mm:n raidetta
       *     — se muodosti siis fyysisesti erillisen järjestelmän;
       *     ensimmäinen osuus Varsovasta Grodzisk Mazowieckiin (30 km)
       *     avattiin 14.6.1845 ja Itävallan raja saavutettiin
       *     1.4.1848; rata oli aluksi yksiraiteinen, ja toinen raide
       *     rakennettiin koko matkalle vähitellen vuosina 1872–1881;
       *     Varsovan pääteasema Dworzec Wiedeński (Enrico Marconi,
       *     avattu 1845) oli 166 metriä pitkä ja 18 leveä,
       *     kolmikerroksinen keskiosa ja kaksi 25-metristä tornia,
       *     joista läntisen ylimmässä kerroksessa oli optinen
       *     lennätinasema ja itäisessä kello.
       *   - pl-Wikipedia "Dworzec Wiedeński w Warszawie": asema
       *     rakennettiin 14.7.1844–14.6.1845 Henryk Marconin
       *     suunnitelmien mukaan Jerozolimskie-puistokadun ja
       *     Marszałkowskan kulmaan; se oli 160 metriä pitkä, sen ajan
       *     keskimittaisen junan mittainen, ja suunniteltu näyttämään
       *     kahdelta vastakkain tulevalta veturilta; läntisessä
       *     tornissa oli lennätin, itäisessä kello; sisällä ei ollut
       *     suurta hallia vaan erilliset lipputoimistot, odotushuoneet
       *     ja buffetit kolmelle luokalle, sotilaille sekä omat
       *     huoneet naisille ja korkea-arvoisille. 1800-luvun lopun
       *     uuden aseman suunnitelmaa ei hyväksytty muun muassa siksi,
       *     ettei se ottanut huomioon yhteyttä Veikselin oikean rannan
       *     yhtiöiden leveisiin raiteisiin.
       *   - pl-Wikipedia "Most Kierbedzia" (kolmas lähde sillalle):
       *     Varsovan ensimmäinen teräksinen Veiksel-silta, rakennettu
       *     1859–1864 Stanisław Kierbedzin suunnitelmien mukaan;
       *     alkuperäisen ajatuksen mukaan sen piti olla RAUTATIESILTA,
       *     joka yhdistää Pietarin aseman Wienin asemaan, ja se
       *     rakennettiin suoraan Varsova–Pietari-radan jatkeeksi;
       *     radan vetämisestä keskustan läpi kuitenkin luovuttiin ja
       *     silta valmistui pelkkänä maantiesiltana, ja rautatiesilta
       *     rakennettiin muutamaa vuotta myöhemmin pohjoisempaa
       *     Sitadellin kohdalta; sillalle laskettiin junaraiteiden
       *     sijasta hevosraitiovaunun kiskot, ja vaunuja varsovalaiset
       *     sanoivat sammakoiksi; venäläinen radan omistajayhtiö
       *     aloitti 1865 hevosraitiotien rakentamisen helpottamaan
       *     matkustajien siirtymistä Varsovan asemien välillä,
       *     kiskoja laskettiin 6,2 kilometriä raideleveydellä 1525 mm,
       *     ja joulukuussa 1866 avattu reitti kulki Pietarin asemalta
       *     Wienin asemalle; sillalla oli kesäkuukausina
       *     tupakointikielto; silta oli 474 metriä pitkä (toisten
       *     lähteiden mukaan 475 tai 476).
       *   - Pelin oma, jo hyväksytty aineisto: raitiovaunut aloittivat
       *     hevosvetoisina 1866 (js/packs/kulttuuri-kategoriat.js,
       *     varsova, "Perille ja liikkeelle"), ja Kierbedźin sillan
       *     mitta ja avajaispäivä (js/packs/julisteet.js, varsova).
       *
       * ASEMAN PITUUS ON LÄHTEISSÄ ERI (160 tai 166 metriä), joten
       * teksti sanoo "toista sataa metriä" ja kertoo sen mitan, josta
       * lähteet ovat yhtä mieltä: asema oli aikansa keskimittaisen
       * junan pituinen.
       */
      id: 'raideleveys',
      nappi: 'Kaksi rataa, jotka eivät sopineet yhteen',
      otsikko: 'Asema, jolta ei päässyt toiselle asemalle',
      teksti: 'Tässä kaupungissa mitta oli kahdenlainen, ja isoisäsi olisi '
        + 'pitänyt siitä enemmän kuin torin väreistä. Varsovasta lounaaseen '
        + 'lähtevä Wienin rata avattiin 14. kesäkuuta 1845, ensin '
        + 'kolmenkymmenen kilometrin pätkänä, ja se ylsi Itävallan rajalle '
        + 'huhtikuussa 1848: kaikkiaan runsaat 327 kilometriä ja 27 '
        + 'asemaa. Se oli '
        + 'ensimmäinen rata Kongressi-Puolassa ja toinen koko '
        + 'keisarikunnassa. Ja se oli rakennettu eurooppalaiseen mittaan, '
        + '1 435 millimetriä kiskosta kiskoon, kun kaikilla muilla '
        + 'keisarikunnan radoilla mitta oli leveämpi, 1 524. Kaksi rataa, kaksi '
        + 'mittaa, eikä yhtäkään vaunua voinut ajaa toiselta toiselle. '
        + 'Pietarin rata tuli Varsovaan 1862 ja pysähtyi joen toiselle '
        + 'rannalle. Kierbedźin silta oli alun perin suunniteltu juuri '
        + 'tähän — rautatiesillaksi, joka yhdistäisi kaksi asemaa — mutta '
        + 'radan vetämisestä keskustan läpi luovuttiin, ja silta '
        + 'valmistui 1864 pelkkänä maantiesiltana. Rautatiesilta '
        + 'rakennettiin vasta muutamaa vuotta myöhemmin, pohjoisempaa. '
        + 'Niinpä sillalle laskettiin junan kiskojen sijasta '
        + 'hevosraitiovaunun kiskot. Radan omistanut yhtiö rakensi 1865 '
        + 'runsaan kuuden kilometrin hevosraitiotien pelkästään sitä varten, että '
        + 'matkustaja pääsisi asemalta asemalle, ja reitti avattiin '
        + 'joulukuussa 1866. Varsovalaiset sanoivat vaunuja sammakoiksi. '
        + 'Sillalla oli kesäkuukausina tupakointikielto. Isoisäsi '
        + 'kävellessä kaupungissa Wienin radalle rakennettiin parhaillaan '
        + 'toista raidetta, työ kesti vuodesta 1872 vuoteen 1881, ja '
        + 'Wienin asemalla seisoi kaksi tornia: toisessa kello, toisessa '
        + 'lennätin. Asema oli toista sataa metriä pitkä, mitoitettu '
        + 'aikansa keskimittaisen junan mukaan. Kaikesta tästä seurasi '
        + 'yksi asia, jota mies, joka pelkäsi hevosia enemmän kuin '
        + 'myrskyjä, ei olisi halunnut kuulla: junasta junaan pääsi vain '
        + 'hevosen perässä.',
      /*
       * Commons 30.8.2026: 4234×3007, public domain, Konrad Brandel
       * (1838–1920), päiväys noin 1890, kuvaus "Warsaw. Vienna Railway
       * Station". Restrictions tyhjä. SILMÄTARKISTUS TEHTY (800 px):
       * aseman julkisivu, aukio, etualalla hevosraitiovaunu ja
       * ajureita. Ihmiset ovat kaukana ja kuva on 1890-luvulta, joten
       * tunnistettavia eläviä ihmisiä ei ole.
       *
       * MIKSI JUURI TÄMÄ KUVA: siinä on molemmat täyn asiat samassa
       * ruudussa — asema torneineen ja sen edessä juuri se
       * hevosraitiovaunu, joka oli olemassa siksi, etteivät kiskot
       * sopineet toisiinsa.
       */
      kuva: {
        tiedosto: 'Dworzec Wiedeński w Warszawie ok. 1890.jpg',
        selite: 'Wienin asema Varsovassa noin 1890: etualalla '
          + 'hevosraitiovaunu, joka kuljetti matkustajat radalta toiselle.',
        lahde: 'Konrad Brandel, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miten matkustaja siirtyi isoisän aikaan Varsovassa Wienin '
          + 'radalta Pietarin radalle?',
        /*
         * Pituudet 62 / 37 / 47 merkkiä: oikea on keskipituinen ja
         * pisin on väärä. Väärät eivät ole puolitosia — Veikselin ali
         * ei ole koskaan kaivettu junatunnelia, eikä asemien välillä
         * kulkenut jokilaivaa.
         */
        vaihtoehdot: [
          'Juna vietiin joen ali kaivettua tunnelia pitkin toiselle radalle',
          'Jokilaivalla, joka lähti aseman takaa',
          'Hevosraitiovaunulla sillan yli toiselle asemalle',
        ],
        oikea: 2,
        fakta: 'Radat olivat eri levyisiä: Wienin rata 1 435 millimetriä, '
          + 'muu keisarikunta 1 524. Hevosraitiotie avattiin joulukuussa '
          + '1866 pelkästään asemien väliä varten, ja sillalla oli '
          + 'kesäisin tupakointikielto.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) JA
       * ERÄN HENGÄHDYS. Ei kilpajuoksua, ei kätköä — metsä, kirjanpito
       * ja yksi kivi.
       *
       * MIKSI TÄMÄ TÄKY: kaanoninen aarremerkintä päättyy lauseeseen
       * "Kaikki ei ole palannut vieläkään". Tämä on sen vanhin
       * esimerkki, ja se on Varsovan omasta metsästä.
       *
       * FAKTAT (kaksi riippumatonta lähdettä, haettu 30.8.2026):
       *   - pl-Wikipedia "Tur leśny": Mazovia oli yksi hyvin harvoista
       *     paikoista, joissa turia eli vielä 1300-luvulla, ja
       *     metsästysoikeus oli yksin ruhtinailla; 1400-luvun alusta
       *     lähtien turien pääasiallinen tyyssija Jaktorówin metsä oli
       *     erikseen suojeltu ruhtinaiden sopimuksilla; tietoiset
       *     yritykset suojella turia uhanalaisena lajina olivat
       *     maailman ensimmäiset, vaikka ne epäonnistuivat;
       *     kuningas Jagiełło näki suojelun tarpeen ja hänen
       *     seuraajansa jatkoivat sitä; 1500-luvun jälkipuoliskolla
       *     Kozłowicen kylään metsän laitaan asetettiin kuusitoista
       *     metsänvartijaa perheineen, joiden ainoa tehtävä oli
       *     huolehtia tureista ja suojella niitä salametsästäjiltä, ja
       *     he saivat kuninkaallisena etuoikeutena maata viljeltäväksi
       *     ilman veroja; velvollisuutena oli "turia katsoa, heinät
       *     Jaktorówista alustalaisilta ottaa ja niillä heinillä turia
       *     talvella ruokkia, turien luku tietää ja starostalle joka
       *     neljännesvuosi ilmoittaa"; viimeisen lauman katoamisen
       *     syyksi arveltiin ensin lähistöllä laidunnetulta karjalta
       *     saatua tautia, mutta nykyään sanotaan yhä useammin, että
       *     tauti osui pieneen ja eristyneeseen kantaan, joka oli
       *     menettänyt mahdollisuuden risteytyä ja sopeutua.
       *   - pl-Wikipedia "Puszcza Jaktorowska": metsä on Mazovian
       *     voivodikunnassa; 1400-luvulla se oli noin 900 km² ja
       *     Mazovian ruhtinaiden ja sittemmin Puolan kuninkaiden
       *     suosikkimetsästysmaa, ja se yhtyi Kampinosin metsään;
       *     nykyään sitä on jäljellä noin 200 km²; siellä kuoli
       *     luonnollisista syistä vuonna 1627 lajin viimeinen naaras;
       *     tapahtumaa muistaa Jaktorówissa vuonna 1972 paljastettu
       *     muistomerkki.
       *   - en-Wikipedia "Aurochs" (luvut ja mitat): viimeisin
       *     tunnettu lauma eli Jaktorówin metsän soisessa
       *     metsämaastossa ja pieneni noin viidestäkymmenestä
       *     yksilöstä 1500-luvun puolivälissä neljään vuoteen 1601
       *     mennessä, ja viimeinen naaras kuoli 1627 luonnollisista
       *     syistä; sonnin säkäkorkeus oli enintään 1,8 metriä ja
       *     lehmän 1,55, ja sarvet enintään 80 cm. pl antaa sonnin
       *     säkäkorkeudeksi noin 1,6 ja enintään 1,9 metriä ja
       *     sarvien pituudeksi 70–80 cm mitattuna kaarta pitkin.
       *
       * SÄKÄKORKEUS ON LÄHTEISSÄ ERI, EIKÄ SITÄ PYÖRISTETÄ: teksti
       * sanoo molempien lukemien mahtuvan väliin 1,6–1,9 metriä.
       *
       * YKSI VÄITE, JOLLE LÖYTYI VAIN YKSI LÄHDE — JA SE ON MERKITTY:
       * en-Wikipedian artikkeli "Jaktorów" kertoo, että viimeisen
       * kirjatun yksilön kallo vietiin 1600-luvun sotavuosina Ruotsiin
       * ja on nykyään Tukholmassa Livrustkammarenissa. pl-lähteet
       * eivät mainitse asiaa. Se on tekstissä, koska se on kaanonin
       * viimeisen lauseen tarkin mahdollinen kaiku, mutta Fablen on
       * hyvä tietää, että se nojaa yhteen lähteeseen. Jos väite ei
       * kelpaa, leikattava kohta on tekstin viimeistä edellinen virke
       * eikä mikään muu.
       *
       * MITÄ EI KERROTA: kallo mainitaan matkanneena, ei ryöstettynä
       * eikä taistelun yhteydessä (tarinakaari, luku 2: ei
       * sotasisältöä). Sama muotoilun sääntö kuin pelin omassa
       * POL-aarretiedossa.
       */
      id: 'tur',
      nappi: 'Eläin, jonka katoamisesta pidettiin kirjaa',
      otsikko: 'Jaktorówin viimeinen tur',
      teksti: 'Vajaan neljänkymmenen kilometrin päässä Varsovasta on metsä, '
        + 'joka oli 1400-luvulla noin yhdeksänsataa neliökilometriä ja oli '
        + '1500-luvulle asti yhtä metsää Kampinosin kanssa. Nykyään sitä on '
        + 'jäljellä noin kaksisataa. Se oli Mazovian ruhtinaiden ja '
        + 'myöhemmin kuninkaiden metsästysmaa, ja siellä eli viimeinen '
        + 'lauma turia — villinaudan, josta kotieläinnaudat polveutuvat. '
        + 'Sonnin säkäkorkeus oli lähteestä riippuen 1,6–1,9 metriä, ja '
        + 'sarvet olivat pitkät ja eteenpäin kaartuvat. Sitten tapahtui '
        + 'jotain, mitä ei ollut '
        + 'ennen tapahtunut missään. Metsä otettiin 1400-luvun alusta '
        + 'lähtien erikseen suojelukseen, ja 1500-luvun jälkipuoliskolla '
        + 'metsän laitaan asetettiin kuusitoista metsänvartijaa '
        + 'perheineen, joiden ainoa työ oli huolehtia tureista. He saivat '
        + 'palkakseen maata ilman veroja, ja vastineeksi heidän piti '
        + 'kerätä kyläläisiltä heinät, ruokkia turit talvella, tietää '
        + 'eläinten lukumäärä ja ilmoittaa se starostalle joka '
        + 'neljännesvuosi. Se on maailman ensimmäinen tietoinen yritys '
        + 'suojella lajia — ja se epäonnistui. Laumassa oli 1500-luvun '
        + 'puolivälissä noin viisikymmentä eläintä, vuonna 1601 neljä, ja '
        + 'vuonna 1627 kuoli viimeinen naaras, luonnollisista syistä. '
        + 'Aikanaan syytettiin lähistöllä laidunnetulta karjalta saatua '
        + 'tautia; nykyään sanotaan, että tauti osui kantaan, joka oli jo '
        + 'liian pieni ja liian eristynyt sopeutuakseen mihinkään. '
        + 'Viimeisen kirjatun yksilön kallo lähti 1600-luvun sotavuosina '
        + 'Ruotsiin, ja se on Tukholmassa yhä. Metsään jäi vuonna 1972 '
        + 'kivi, johon on hakattu vuosiluku.',
      /*
       * Commons 30.8.2026: 800×600, CC BY-SA 3.0, Tomasz Kuran (alias
       * Meteor2017), kuvattu 1.5.2005, kuvaus nimeää muistomerkin
       * viimeiselle turille ja lainaa kiven tekstin. Restrictions
       * tyhjä. SILMÄTARKISTUS TEHTY (800 px): kivenlohkare betonisella
       * jalustalla, kiveen hakattu turin pää ja teksti, taustalla
       * metsää. Ei ihmisiä.
       *
       * KUVA ON PIENI (800×600, tiedoston oma koko). Se on tämän
       * muistomerkin ainoa kuva Commonsissa; sama huomautus kuin
       * Vilnan katedraalipuupiirroksella.
       */
      kuva: {
        tiedosto: 'Jaktorow pomnik tura.jpg',
        selite: 'Jaktorówin muistokivi kertoo, että tur eli tässä metsässä '
          + 'vuoteen 1627, ja kiveen on hakattu myös eläimen pää.',
        lahde: 'Tomasz Kuran, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Mitä Jaktorówin metsänvartijoiden oli ilmoitettava '
          + 'starostalle joka neljännesvuosi?',
        /*
         * Pituudet 26 / 40 / 44 merkkiä: oikea on lyhin. Väärät ovat
         * uskottavia — heinä ja salametsästys kuuluivat samaan
         * tehtävään — mutta neljännesvuosittain ilmoitettiin luku.
         */
        vaihtoehdot: [
          'Montako turia metsässä oli',
          'Kuinka paljon heinää oli jäljellä ladossa',
          'Ketkä kylän miehistä olivat käyneet metsässä',
        ],
        oikea: 0,
        fakta: 'Kuusitoista metsänvartijaa sai maata verotta, ja vastineeksi '
          + 'he ruokkivat turit talvella ja pitivät niistä lukua. Laumassa '
          + 'oli 1500-luvun puolivälissä noin viisikymmentä eläintä ja '
          + 'vuonna 1601 enää neljä.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa KOHTAAMISEN (Vilnan kaava, ei Sevillan): antikvaari
   * Halina haluaa tietää, tunteeko vieras sen, mitä tässä kaupungissa
   * on tapana tehdä kirjoille. Oppitunti kertoo, mitä niille on tehty.
   * Laattakysymystä se ei pohjusta — kaanoninen Livia-teksti pohjustaa
   * jo kaksi niistä, ja kolmas (Skłodowska-Curie) on kaupunkilehden
   * Tiede-sivun oma nosto. Oppitunti on siksi aihe, jota lehti ei
   * käsittele lainkaan.
   *
   * OPPITUNTI ON KAANONIN LUETTELON ENSIMMÄINEN SANA ("Kirjastot").
   *
   * MIKSI EI MAAN ISOA AARRETTA: Puolan iso aarre on Rafaelin kadonnut
   * muotokuva (js/packs/paikallisaarteet.js, POL), ja se on Krakovan
   * oma — aallon 4C kaanonissa juuri Krakovan aarremerkintä kuvaa sen
   * taulun. Varsova ei kerro sitä tarinaa etukäteen.
   *
   * FAKTAT (kaksi riippumatonta lähdettä, haettu 30.8.2026):
   *   - en-Wikipedia "Załuski Library": perustettiin Varsovaan 1747;
   *     perustajat veljekset Józef Andrzej ja Andrzej Stanisław
   *     Załuski, molemmat piispoja; ensimmäinen puolalainen julkinen
   *     kirjasto ja yksi Euroopan varhaisimmista; aluksi noin 200 000
   *     nidettä, 1780-luvun loppuun mennessä noin 400 000 painatetta,
   *     karttaa ja käsikirjoitusta; avoinna tiistaisin ja torstaisin
   *     kello 7–19, ja kävijöitä pyydettiin olemaan hiljaa ja
   *     lukemaan rukous veljesten puolesta; kirjoja lainattiin aluksi
   *     ulos, mutta varkauksien takia siitä luovuttiin, ja 1752 paavi
   *     Benedictus XIV antoi bullan, joka uhkasi kirkonkirouksella
   *     niitä, jotka veivät kirjoja pois — sekään ei poistanut
   *     ongelmaa kokonaan; 1794 Katariina II:n käskystä kokoelma
   *     tyhjennettiin ja lähetettiin Pietariin, jossa siitä tuli
   *     vuotta myöhemmin perustetun keisarillisen julkisen kirjaston
   *     perusta; historioitsija Joachim Lelewelin mukaan kirjoja sai
   *     Grodnossa ostaa korillisittain; osia kokoelmasta palasi
   *     Kongressi-Puolaan kahtena vuonna, 1842 ja 1863; 1920-luvulla
   *     Riian rauhan nojalla palautettiin noin 50 000 kohdetta, ja
   *     1928 perustettu kansalliskirjasto pitää itseään Załuskien
   *     kirjaston suorana jatkona ja vuotta 1747 perustamisvuotenaan;
   *     vuoden 1944 tuhossa säilyi enää 1 800 käsikirjoitusta ja
   *     30 000 painatetta; rakennus oli 1600-luvun Daniłowiczien
   *     palatsi, jonka katolla oli pieni torni ja siinä tähtitorni;
   *     ryöstön jälkeen taloa käytettiin vuodesta 1807 jauhovarastona
   *     ja 1821 se muutettiin vuokrataloksi; jälleenrakennuksen
   *     yhteydessä löytyivät Puolan hallitsijoiden rintakuvat, jotka
   *     olivat alun perin koristaneet kirjaston sisätiloja ja jotka
   *     oli piilotettu jakojen aikana, ja ne asetettiin julkisivulle —
   *     siitä talon nimi Dom pod Królami, Kuninkaiden talo.
   *   - pl-Wikipedia "Biblioteka Załuskich": avattiin yleisölle
   *     8.8.1747 Daniłowiczien palatsissa; vuodesta 1780 Puolan
   *     kansalliskirjasto; kokoelmat vietiin joulukuun 1794 ja
   *     tammikuun 1795 välillä Katariina II:n käskystä Pietariin;
   *     400 000 niteen, 20 000 käsikirjoituksen ja 40 000 grafiikan
   *     kokoelma kutistui kuljetuksessa, ja perille saapui vain
   *     260 000 nidettä, 11 000 käsikirjoitusta ja 24 500 grafiikkaa;
   *     kokoelmat palautettiin osittain 1921–1934 Riian rauhan
   *     nojalla ja liitettiin vuodesta 1928 kansalliskirjastoon;
   *     kirjasto oli avoinna kaksi päivää viikossa; kirjastoa johti
   *     Jan Daniel Janocki vuosina 1744–1786.
   *
   * KAKSI LUKUA KÄSIKIRJOITUKSISTA, JA NIISTÄ KÄYTETÄÄN VAIN SITÄ,
   * JOSTA LÄHTEET OVAT YHTÄ MIELTÄ. pl-artikkeli sanoo toisaalla
   * 20 000 ja toisaalla noin 12 000 käsikirjoitusta; teksti käyttää
   * siksi vain nide- ja grafiikkalukuja, joissa ristiriitaa ei ole.
   *
   * MITÄ EI KERROTA: vuoden 1944 tuhon tapahtumia ei kuvata, vain se,
   * paljonko jäi jäljelle (tarinakaari, luku 2).
   */
  oppitunti: {
    otsikko: 'Kirjasto, joka lähti kärryillä itään',
    teksti: 'Isoisäsi käveli tässä kaupungissa talon ohi, joka oli silloin '
      + 'vuokratalo ja oli sitä ennen ollut jauhovarasto. Sata vuotta '
      + 'aiemmin se oli ollut Euroopan hämmästyttävimpiä paikkoja. Kaksi '
      + 'veljestä, molemmat piispoja, avasi Daniłowiczien palatsissa '
      + '8. elokuuta 1747 kirjaston, johon sai tulla kuka tahansa. Se oli '
      + 'Puolan ensimmäinen julkinen kirjasto ja yksi Euroopan '
      + 'varhaisimmista: alussa noin kaksisataatuhatta nidettä, ja '
      + '1780-luvun lopulla neljäsataatuhatta painatetta, karttaa ja '
      + 'käsikirjoitusta. Ovet olivat auki kahtena päivänä viikossa, '
      + 'tiistaisin ja torstaisin, aamuseitsemästä iltaseitsemään, ja '
      + 'kävijöiltä pyydettiin kahta asiaa: hiljaisuutta ja rukousta '
      + 'veljesten puolesta. Kirjoja sai aluksi viedä kotiin. Siitä '
      + 'luovuttiin, koska niitä ei tuotu takaisin, ja vuonna 1752 paavi '
      + 'antoi asiasta bullan, joka uhkasi kirkonkirouksella jokaista, '
      + 'joka kantoi kirjan ulos ovesta. Sekään ei aivan riittänyt. '
      + 'Talvella 1794–1795 koko kokoelma pakattiin keisarinnan käskystä '
      + 'kärryihin ja vietiin Pietariin, jossa siitä tuli keisarillisen '
      + 'julkisen kirjaston perusta. Perille ei tullut kaikkea: 400 000 '
      + 'niteestä saapui 260 000 ja 40 000 grafiikanlehdestä 24 500. '
      + 'Eräs aikalainen kirjoitti, '
      + 'että Grodnossa kirjoja sai ostaa korillisittain. Osa palasi '
      + 'Varsovaan jo 1800-luvulla, kahtena eränä 1842 ja 1863 — ja kun '
      + 'isoisäsi käveli talon ohi, loput olivat siinä kaupungissa, jonka '
      + 'hän oli itse nähnyt saman vuoden kesäkuussa. Kirjoja palautettiin '
      + 'lisää 1920-luvulla, noin viisikymmentätuhatta, ja vuonna 1928 '
      + 'perustettu kansalliskirjasto laskee yhä perustamisvuodekseen '
      + '1747: väliin jäänyt aika on sen mielestä keskeytys eikä loppu. '
      + 'Vuoden 1944 jälkeen alkuperäisestä kokoelmasta oli jäljellä '
      + '1 800 käsikirjoitusta ja 30 000 painatetta. Ja talolle kävi '
      + 'näin: kun se rakennettiin sodan '
      + 'jälkeen takaisin, seinistä löytyivät Puolan kuninkaiden '
      + 'rintakuvat, jotka olivat koristaneet kirjaston saleja ja jotka '
      + 'joku oli piilottanut jakojen aikaan. Ne nostettiin julkisivulle. '
      + 'Talo tunnetaan siitä lähtien nimellä Kuninkaiden talo — kirjansa '
      + 'menettänyt kirjasto piti kuninkaansa, ja piti ne piilottamalla.',
    /*
     * Commons 30.8.2026: 5197×4087, public domain, tekijää ei nimetty,
     * päiväys 1861, lähde Przyjaciel Dzieci -viikkolehti (1861, nro 13,
     * s. 101) Mazovian digitaalisen kirjaston kautta. Restrictions
     * tyhjä. SILMÄTARKISTUS TEHTY (800 px): puupiirros rakennuksen
     * julkisivusta, katolla pieni lyhtytorni, päädyssä piispanvaakuna,
     * kuvatekstinä "Biblioteka Załuskich r. 1745". Ei ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on piirretty 1861, kaksitoista vuotta
     * ennen isoisän käyntiä, ja se esittää talon sellaisena kuin se oli
     * ENNEN kaikkea tätä — siis juuri sen, mitä isoisä ei nähnyt, kun
     * hän käveli vuokratalon ohi. Valokuvaa kirjastoajan talosta ei ole
     * olemassa.
     *
     * SELITE SANOO, ETTÄ KYSE ON PIIRROKSESTA. Kuva on puupiirros eikä
     * valokuva, ja se on kortin ainoa kuva; ilman mainintaa kortti
     * näyttäisi tarjoavan aikalaiskuvaa 1740-luvulta.
     */
    kuva: {
      tiedosto: 'Biblioteka Załuskich r. 1745 (43692).jpg',
      selite: 'Puupiirros vuodelta 1861 esittää Załuskien kirjaston talon '
        + 'sellaisena kuin se oli 1745; katon pienessä tornissa oli '
        + 'tähtitorni.',
      lahde: 'Przyjaciel Dzieci 1861, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Varsovalla ei ole riviä js/packs/kohtaamiset.js:ssä eikä
   * tarinakaaren pakettia (js/tyohuone-kehitys-data.js KAARI_PAKETIT),
   * joten tälle kaupungille ei ole valmista hahmoa: alla oleva Halina
   * on EHDOTUS, ei kaanonia. Kortti on esittely; VARSINAINEN KYSYMYS on
   * ennallaan laattamekaniikassa (game.actionQuiz lukee js/packs/
   * europe-questions.js, varsova), eikä tämä paketti kosketa sitä.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortissa on vain hahmo,
   * nappi, varmistus, vihjeOsio ja teksti.
   *
   * MIKSI ANTIKVAARI: kaanoninen aarremerkintä alkaa sanoilla
   * "Kirjakauppias sanoi", eli isoisän vuoden 1873 lähde tässä
   * kaupungissa oli kirjakauppias. Nykyhetken vartija on saman
   * ammatin jatke, ja kaiku on tietoinen — jos Fable pitää sitä
   * toistona, vaihto on yhden lohkon työ.
   *
   * ÄÄNIPROFIILI (tarinakaari, luku 3): PUHELIAS, ja lisäksi se, joka
   * HÄMMÄSTYY ITSEKIN — Halina vastaa kysymykseen kolmella, ja kesken
   * puheen hän tajuaa jotain, mitä ei ole ennen ajatellut. Vilnan Rasa
   * ja Sevillan Amparo ovat molemmat epäuskoisia, joten tämä paketti
   * ottaa toisen profiilin tarkoituksella.
   *
   * VARALLISUUSSÄÄNTÖ TARKISTETTU VIRKE VIRKKEELTÄ: isoisä ei maksa
   * mitään, ei tilaa mitään eikä käske ketään. Hänen tekonsa on yhden
   * iltapäivän mittainen — hän laski hyllyt ja kirjoitti summan
   * etulehdelle — ja suvun syy säilyttää kirja on suvun oma
   * ammattiylpeys. Vuosisataista ylläpidettyä perinnettä EI ole: lukua
   * ei ole jatkettu, ja juuri se on vitsi.
   *
   * LUPAUS, JONKA AARRETEKSTIN ON LUNASTETTAVA: Halina avaa kirjan
   * siltä lehdeltä, jossa on vieras käsiala.
   *
   * EI SPOILERIA: kortti ei mainitse Chopinia, sydäntä, jälleen-
   * rakennusta, Skłodowska-Curieta, pierogeja eikä merenneitoa.
   */
  kohtaaminen: {
    hahmo: 'Antikvaari Halina',
    nappi: 'Tapaa antikvaari',
    varmistus: 'Haluatko varmasti tavata Halinan juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * varsova): 'kaupunki' tai 'tiede'. Viidestä laattakysymyksestä
     * kolme — pääkaupunki, jälleenrakennus ja Chopin — saa tukea
     * kaupunkisivulta, jonka nostot kertovat sekä säveltäjästä että
     * siitä, miten kaupunki koottiin takaisin. Tiede-sivu tukisi vain
     * yhtä.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Halinan antikvariaatti on Kuninkaiden talon kulmalla, ja hän '
      + 'puhuu kolme asiaa siinä ajassa, jossa toinen ehtisi yhden: mistä '
      + 'kirja on tullut, kenen kädestä, ja miksi kukaan ei nykyään enää '
      + 'sido kirjoja kunnolla. Hyllyjen takana on yksi teos, jota hän ei '
      + 'myy. Sen etulehdellä on lyijykynällä kirjoitettu numerosarake ja '
      + 'sarakkeen alla summa vieraalla käsialalla: joku ulkomaalainen '
      + 'istui puodissa sadetta pakoon ja laski koko varaston, koska '
      + 'silloisen omistajan mielestä oli nöyryyttävää, ettei hän tiennyt '
      + 'kirjojensa lukumäärää. Sukupolvet ovat säilyttäneet kirjan siitä '
      + 'yksinkertaisesta syystä, että alaa arvostava ei heitä pois '
      + 'kirjanpitoa. Halina keskeyttää itsensä ja sanoo, ettei kukaan '
      + 'heistä ole jatkanut laskemista — ja näyttää siltä, ettei ole '
      + 'tullut ajatelleeksi sitä ennen tätä hetkeä. Kirjan hän kyllä '
      + 'ottaa esiin. Mutta ei ennen kuin vieras osoittaa tietävänsä '
      + 'jotain kaupungista, jossa puoti on.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Vilnalla ja Sevillalla.
   */

  /*
   * KOHTAAMISPAIKKA: KUNINKAIDEN TALO, entinen Załuskien kirjasto.
   * Halinan puoti on sen kulmalla, ja oppitunti kertoo juuri siitä
   * talosta — vihreä piste osoittaa siis paikkaa, jonka pelaaja on jo
   * tavannut tekstissä.
   *
   * 52,2454 N / 21,0075 E — en-Wikipedia "Załuski Library",
   * prop=coordinates (haettu 30.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * KAAVA ON TARKISTETTU AJAMALLA SE KAHDELLA VALMIILLA PAKETILLA: se
   * antaa Sevillan Torre del Orolle täsmälleen 5633,5 / 1904,6 ja
   * 96,1 / 910,4 ja Vilnan katedraaliaukiolle 6676,3 / 1180,3 ja
   * 696,7 / 455,4 — samat luvut, jotka niiden omissa kommenteissa
   * lukevat.
   *
   * LASKU:
   *   maailmankartta  x = ((21,0075 − (−175)) mod 360) × (12000/360)
   *                     = 196,0075 × 33,3333… = 6533,6
   *                   y = (millerY(76) − millerY(52,2454)) × 12000/2π
   *                     = 1291,2
   *   europe          x = (21,0075 + 11) × 19,2 = 614,5
   *                   y = (72 − 52,2454) × 26,3 = 519,5
   *
   * TARKISTUS VARSOVAN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 615 / 520 (js/packs/europe.js) ja maailmankartalla 6534,4 / 1291,9
   * (js/packs/maailmankartta.js), eli piste osuu molemmilla laudoilla
   * alle yhden yksikön päähän laatasta. Ero jää selvästi
   * js/fokuspiste.js:n PISTE_ERO_MIN-rajan (14) alle, joten peli
   * siirtää merkin laatan viereen aivan kuten muissakin kaupungeissa.
   * Poikkeamia ei ole eikä integroijalle jää tästä päätettävää.
   */
  kohtaamispiste: {
    nimi: 'Antikvariaatti Kuninkaiden talon kulmalla',
    laudat: {
      maailmankartta: { x: 6533.6, y: 1291.2 },
      europe: { x: 614.5, y: 519.5 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Varsovan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Varsova",
   * 2 = "Tiede ja keksinnöt", 3 = Menovinkit (Puolan maapaketista,
   * js/packs/maa-kategoriat.js POL). Kaupungilla on siis kaksi omaa
   * kategoriaa, ja maan Menovinkit-sivu tulee niiden perään.
   *
   * MIKSI 2 JA 3. Raamattu vaatii kysymyksen jokaiselle sivulle paitsi
   * etusivulle. Sivun 1 kysymys on Varsovan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä — nimetty
   * tehtävä samalle sivulle tekisi sivulle kaksi kysymyslaatikkoa.
   * Sivulla 2 on oma tehtävänsä (lentävä yliopisto), joka väistyy
   * nimetyn tieltä (js/fokustehtavat.js piirraSivunTehtava); siksi
   * AARTEEN AVAUS kysyy saman sivun TOISTA nostoa eikä samaa asiaa
   * kahdesti. Sivu 3 on tyhjä, ja JULISTE menee sinne kuten Vilnassa
   * ja Madridissa.
   *
   * SIVUN 2 OMA TEHTÄVÄ JÄÄ POIS PELISTÄ NÄIN. Se on datassa tallella
   * eikä tämä paketti koske siihen, mutta Fablen on hyvä tietää, että
   * lentävän yliopiston kysymys ei enää piirry, kun Varsova saa
   * fokusvirran. Sama vaikutus kuin Vilnassa (sivun 2 kirjankantajat).
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js, `varsova` —
   * "Varsova 1873", jonka selite kertoo Kierbedźin sillasta. Palkinto
   * lunastuu siis oikeasti, ja se osuu samaan siltaan, josta Livian
   * maadoitus ja täky `raideleveys` puhuvat.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: ESPERANTO_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: WIELICZKA_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Merkintä aukeaa, kun aarre
   * löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   *
   * MERKINTÄ EI NIMEÄ YHTÄKÄÄN ESINETTÄ, JA SE ON TARKOITUS: Puolan
   * iso aarre on Krakovan Rafael, ja Varsovan merkintä kuvaa tavan
   * eikä kohdetta. Tämän paketin täyt ja oppitunti ovat saman tavan
   * kolme esimerkkiä — taulut, kirjat ja yksi kallo — eikä yksikään
   * niistä ole se aarre, jota pelaaja etsii.
   */
  aarremerkinta: {
    teksti: 'Kirjakauppias sanoi: tämä kansa on oppinut, että aarre jota ei '
      + 'voi puolustaa, pitää piilottaa tai lähettää matkalle. Kirjastot, '
      + 'sydämet, taulut — kaikki tärkein on täällä liikkunut ja liikkuu '
      + 'vielä. Ruhtinaiden kokoelmatkin pakataan kärryihin, kun idästä '
      + 'tai lännestä kuuluu jyrinää. Kaikki ei ole palannut vieläkään.',
  },
};
