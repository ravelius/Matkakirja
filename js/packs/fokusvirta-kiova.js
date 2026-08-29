/*
 * KIOVAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-vilna.js:lle ja -sevilla.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 * Aalto 4C, Ukraina. TÄMÄ PAKETTI EI KIRJOITA RIVIÄ REKISTERIIN
 * (js/packs/fokusvirrat.js) eikä koske sw.js:ään tai mihinkään muuhun
 * tiedostoon: aallon kaupungit kokoaa integrointiagentti yhtenä nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi, osio
 * KIOVA). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, Livian kaanonteksti ja aarremerkinta.teksti. Niitä
 * ei ole lyhennetty, täydennetty eikä sanajärjestystä muutettu. Luenta
 * on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * MAADOITUS ON JAETTU KAANONTEKSTISTÄ, EI KIRJOITETTU. Kaanoni antaa
 * Livialle yhden tekstin, ja Livian ääni on päätoimittajan — uusia
 * Livia-sanoja ei tässä paketissa ole yhtäkään. Teksti on jaettu
 * VIRKKEEN RAJALTA kenttiin `maadoitus` ja `teksti` (Vilnan ja Riian
 * kaava, ks. pollo-lohkon oma kommentti), koska
 * tests/fokusvirta.test.mjs vaatii jokaiselta fokuskaupungilta oman
 * maadoituksen. Peräkkäin luettuna kuplateksti on sanasta sanaan sama.
 *
 * ISO AARRE: hetmani Polubotokin kultakätkö (js/packs/
 * paikallisaarteet.js, UKR). PIENI AARRE: purkki hunajaa (sama taulu) —
 * ja juuri siitä purkista kasvoi tämän paketin kolmas täky.
 *
 * FAKTAPOHJA. Ukrainalle EI ole valmista takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kiovan kaupunkilehden nostot ja
 *      Matkailijan Kiova -artikkeli (js/packs/kulttuuri-kategoriat.js,
 *      kiova/kaupunki ja kiova/musiikki), Ukrainan maalehti (js/packs/
 *      maa-kategoriat.js, UKR/menovinkit), maan aarretiedot (js/packs/
 *      paikallisaarteet.js, UKR) sekä kaupungin tarinakaaripaketti
 *      (js/tyohuone-kehitys-data.js KAARI_PAKETIT, kiova). Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin — myös niiden
 *      KUVAT, joista tämä paketti lainaa Livian heron sellaisenaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 30.8.2026
 *      (action=query&prop=extracts|coordinates, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli kerrallaan, ja kunkin kohdan oma
 *      kommentti nimeää artikkelin. Mitään ei ole päätelty, pyöristetty
 *      eikä muistettu.
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois:
 *      kuvat kuuluvat kaupunkilehteen.
 *   2. LIVIAN KUVA ON KAUPUNKILEHDEN HEROKUVA (kiova/avauskuvat), ei
 *      uusi Commons-kuva.
 *   3. VALINTA-ASKELTA EI OLE: `valinta`-kenttää ei kirjoiteta.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA.
 *   5. ÄÄNITETTÄ EI OLE: luentaa ei ole vielä generoitu, joten
 *      `matkakirja.aanite` puuttuu (sama kaava kuin aalloissa 3, 4A ja
 *      4B). Kenttä on moottorissa valinnainen (js/ui.js), ja teksti ja
 *      luenta ovat sanasta sanaan samat, joten luennan voi ajaa
 *      suoraan tekstiin koskematta. Valmis äänite menisi polkuun
 *      assets/audio/puhe-fokus-matkakirja-kiova.mp3.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan. OIKEAN VASTAUKSEN PAIKKA VAIHTELEE
 * (docs/moduulit/tarinakaari.md, luku 6 kohta 2): tämän paketin viisi
 * visaa antavat oikean vastauksen paikoiksi 1, 0, 2, 1 ja 2, eikä oikea
 * ole yhdessäkään pisin vaihtoehto. Molemmat on tarkistettu käsin.
 *
 * ── LAATTAKYSYMYSTÄ EI SPOILATA ────────────────────────────────────
 *
 * Kiovalla ON tarinakaaren paketti (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, id 'kiova'), joten kohtaamisen takana EI ole
 * js/packs/europe-questions.js:n laattakysymys vaan paketin oma:
 * *"Kiovan Kultainen portti rakennettiin lähes tuhat vuotta sitten.
 * Mikä sen tehtävä oli?"* Sama suhde kuin Bukarestin Analla — hahmo ja
 * kysymys tulevat kaaripaketista, eikä tämä tiedosto kosketa
 * kumpaakaan.
 *
 * OPPITUNTI POHJUSTAA JUURI SEN KYSYMYKSEN (Bukarestin kaava). Vastaus
 * on tekstissä, mutta kysymyksen sanamuoto ei toistu siinä
 * sellaisenaan: teksti ei kysy portin tehtävää eikä sano vastausriviä,
 * vaan kertoo muurista, sen kolmesta sisäänkäynnistä ja siitä, mitä
 * holvin läpi tehtiin. Kohtaamiskortti puolestaan ei mainitse porttia
 * sanallakaan — se olisi spoileri.
 *
 * MUITA SPOILEREITA VÄLTETÄÄN NIIN PITKÄLLE KUIN KAANONI SALLII.
 * Kiovan viisi laattakysymystä (europe-questions.js) koskevat maan
 * pääkaupunkia, mustaa multaa, Dnepriä, luolaluostaria ja Kiovan
 * Rusia. Kaksi näistä on jo kaanonitekstissä: isoisä kirjaa munkkien
 * käytävät ja mustan maan, ja Livia nimeää mustamullan. Tämän paketin
 * mustamultatäky ei siis avaa uutta ovea — se syventää kaanonin oman
 * lauseen — eikä yksikään täky nimeä luolaluostaria, Dnepriä tai
 * Kiovan Rusia vastausrivin muodossa.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 30.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD tai CC, ja tekijä on `lahde`-rivillä,
 * koska CC vaatii maininnan. JOKAINEN on lisäksi katsottu silmin 960
 * pikselin esikatseluna: yhdessäkään ei ole tunnistettavia eläviä
 * ihmisiä. Kolme ehdokasta hylättiin juuri tuossa katselmuksessa
 * (Ukrainan maaperäkartta dollarimerkkeineen, Trypillian museon
 * sekalainen esinetaulu ja Kultaisen portin punaisessa museovalossa
 * kuvattu holvi) — ne on kirjattu raporttiin, jottei niitä valita
 * uudestaan nimen perusteella.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, valokuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Yksi kuva per
 * kortti, `tiedosto`-kenttä; aiheet on kirjattu raporttiin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Vilnassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Kobzarikysymys on Kiovan lehden sivun 2
 * (Musiikki) oman noston "Kobzari lauloi, ja sali vaikeni" tekstiä ja
 * pektoraalikysymys sivun 3 (Ukrainan Menovinkit) oman kohteen
 * "Pektoraali — skyyttalainen kulta-aarre verkkonäyttelynä" tekstiä ja
 * selitettä (js/packs/kulttuuri-kategoriat.js ja js/packs/
 * maa-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI KOBZARI EIKÄ ŠTŠEDRYK: musiikkisivulla on jo OMA tehtävänsä,
 * joka kysyy Štšedrykistä syntynyttä joululaulua. Sama sivu ei saa
 * kysyä samaa asiaa kahdesti, joten AARTEEN AVAUS ottaa saman sivun
 * TOISEN noston — kobzari Ostap Veresain, joka sattuu olemaan myös
 * kaupungin oma 1873-ankkuri. (Nimetty tehtävä syrjäyttää sivun oman
 * tehtävän, js/fokustehtavat.js; se on tietoinen vaihtokauppa ja
 * kirjattu raporttiin.)
 *
 * MIKSI EI ARSENALNAA: sivun 1 kysymys on Kiovan kulttuurivisa
 * (js/packs/europe-kulttuuri.js), joka kysyy juuri metroaseman
 * syvyyden syytä, ja js/fokustehtavat.js pukee sen samaksi AARTEEN
 * AVAUS -laatikoksi ilman omaa riviään täällä.
 */
const KOBZARI_VISA = {
  kysymys: 'Sokea kobzari Ostap Veresai kutsuttiin Kiovaan vuonna 1873 '
    + 'laulamaan dumia. Kuka hänet kutsui?',
  /*
   * VÄÄRÄT EIVÄT OLE PUOLITOSIA: Veresai lauloi seuraavana vuonna
   * Kiovan arkeologisessa kongressissa, joten tieteellinen kokous on
   * uskottava vaihtoehto — mutta kauppiaskilta ja ylioppilastanssiaiset
   * eivät ole lehden tekstissä eivätkä lähteessä. Oikea vaihtoehto (35
   * merkkiä) ei ole pisin.
   */
  vaihtoehdot: [
    'Kaupungin kauppiaiden kilta vuosijuhlaansa',
    'Maantieteellinen seura kokoukseensa',
    'Yliopiston ylioppilaat tanssiaisiinsa',
  ],
  oikea: 1,
  fakta: 'Kuulijoina oli 28 seuran jäsentä ja 60 kutsuvierasta. Seuraavana '
    + 'vuonna Veresai lauloi Kiovan arkeologisessa kongressissa, ja '
    + 'lontoolainen Athenaeum-lehti vertasi häntä antiikin Kreikan '
    + 'runonlaulajiin.',
};

const PEKTORAALI_VISA = {
  kysymys: 'Ukrainan historian museon verkkonäyttely kertoo skyyttalaisesta '
    + 'kultaisesta rintakorusta. Mistä se löytyi vuonna 1971?',
  vaihtoehdot: [
    'Dneprin pohjasta, sukeltajien nostamana',
    'Krimin luolakaupungin varastokammiosta',
    'Tovsta Mohylan hautakummusta',
  ],
  oikea: 2,
  fakta: 'Pektoraalin kaivoi esiin arkeologi Borys Mozolevskyi. '
    + 'Verkkonäyttelyssä on videokierroksia ja kaivauspäiväkirjan sivuja.',
};

export const FOKUSVIRTA_KIOVA = {
  kaupunki: 'kiova',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ilman lisäystä. */
    paikkarivi: 'Kiova, toukokuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki nousee joen törmältä kultaisina kupoleina, ja sen '
      + 'alla on toinen kaupunki: munkit ovat kaivaneet käytäviä maan '
      + 'sisään kahdeksansataa vuotta, ja kynttilä kädessä siellä kulkee '
      + 'pyhiinvaeltajia enemmän kuin kaduilla väkeä. Ostin torilta '
      + 'hunajaa miehiltä, jotka tulivat myymään sitä veneellä satojen '
      + 'virstojen päästä. Tämä maa on musta ja antelias — sen näkee '
      + 'leivästä.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: neljä tagia, alku ja loppu eri
     * sävyssä. Yksikään sana, välimerkki tai sanajärjestys ei muutu.
     */
    luenta: '[curious] Kaupunki nousee joen törmältä kultaisina kupoleina, '
      + 'ja sen alla on toinen kaupunki: [whispers] munkit ovat kaivaneet '
      + 'käytäviä maan sisään kahdeksansataa vuotta, ja kynttilä kädessä '
      + 'siellä kulkee pyhiinvaeltajia enemmän kuin kaduilla väkeä. '
      + '[warmly] Ostin torilta hunajaa miehiltä, jotka tulivat myymään '
      + 'sitä veneellä satojen virstojen päästä. [softly] Tämä maa on '
      + 'musta ja antelias — sen näkee leivästä.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANONTEKSTI ON JAETTU KAHTEEN KENTTÄÄN, EI MUUTETTU.
     *
     * Kaanonissa Livialla on yksi teksti, mutta kortti lukee kaksi
     * kenttää (js/fokusvirta.js piirraPollo): `maadoitus` piirtyy kuplan
     * ensimmäiseksi kappaleeksi heti isoisän merkinnän perään ja
     * `teksti` sen jälkeen. tests/fokusvirta.test.mjs vaatii lisäksi
     * jokaiselta fokuskaupungilta oman maadoituksen, joka on yli 120
     * merkkiä eikä ole sama merkkijono kuin huomio.
     *
     * JAKO KULKEE ENSIMMÄISEN VIRKKEEN RAJALTA, ja se riittää:
     * maadoitus on 131 merkkiä eli selvästi rajan yli. Kohta on myös
     * sisällöllisesti oikea — maadoitus vastaa merkinnän avaukseen
     * (maanalaiset käytävät) ja `teksti` vie mustaan multaan, hunajaan
     * ja seuraavaan askeleeseen. Yhtäkään sanaa, välimerkkiä tai
     * järjestystä ei ole muutettu: peräkkäin luettuna teksti on sanasta
     * sanaan Fablen kaanonteksti.
     */
    maadoitus: 'Ne käytävät ovat edelleen olemassa ja niissä kävellään '
      + 'edelleen kynttilä kädessä — sähkövaloa sinne ei ole viety '
      + 'tänäkään päivänä..',
    teksti: 'Ja se musta antelias maa on sama josta tämä maa tunnetaan '
      + 'nykyäänkin: Ukrainan mustamulta ruokkii ison osan maailmaa. '
      + 'Hunajaa myydään yhä toreilla. Mennään törmälle.',
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/
     * kulttuuri-kategoriat.js, kiova/avauskuvat): luolaluostari. Juuri
     * se paikka, josta Livian maadoitus puhuu. Selite on lehden oma
     * selite sellaisenaan, eikä yksikään luku muutu.
     *
     * MIKSI EI KATEDRAALIHEROA: karusellissa on myös hero-kiova-aamu
     * (Pyhän Sofian katedraali). Se jätetään tästä pois, koska
     * täkynostoissa on Sofian Oranta-mosaiikki — kahta saman kirkon
     * kuvaa peräkkäin ei anneta.
     */
    kuva: {
      ampari: 'herokoe/hero-kiova-keskipaiva.jpg',
      selite: 'Kiovan luolaluostarin perusti kronikoiden mukaan '
        + 'Athos-vuorelta palannut munkki Antoni vuonna 1051, ja '
        + 'maanalaisista käytävistä kasvanut lavra on ollut Unescon '
        + 'maailmanperintöluettelossa vuodesta 1990.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä osti hunajaa miehiltä, jotka tulivat
       * veneellä satojen virstojen päästä. Tämä on saman kaupan toinen
       * puoli — se, miten tavara liikkui silloin kun jokea ei ollut, ja
       * miksi juuri hänen käyntinsä vuosikymmen oli sen tavan viimeinen.
       *
       * FAKTAT (en-Wikipedia "Chumak", johdanto ja osio "Influence on
       * Ukrainian culture"; haettu 30.8.2026):
       *   - tšumakit olivat vankkurikauppiaiden ammattikunta myöhäisestä
       *     keskiajasta uuden ajan alkuun; he kuljettivat suolaa, kalaa,
       *     viljaa ja muuta tavaraa pitkiä matkoja myytäväksi;
       *   - suola tuli Halytšynasta sekä Mustanmeren ja Asovanmeren
       *     rannikoilta; vankkureita veti kaksi härkää ikeessä, usein
       *     bessarabialaista rotua;
       *   - kauppa kukoisti 1800-luvun loppuun asti, jolloin rautateiden
       *     kilpailu teki pitkistä reiteistä kannattamattomia;
       *   - ukrainan kielessä Linnunradan nimi on Tšumakkien tie;
       *   - tšumakit ovat Taras Ševtšenkon (1814–1861) ja Ivan
       *     Aivazovskin (1817–1900) töissä ja kansanperinteessä; myös
       *     sukunimi Tšumak on olemassa.
       *
       * MITÄ EI KERROTA: lähde nimeää kauppareittien poliittiset rajat
       * ja kasakka-ajan valtapiirit. Se jää pois — nosto pärjää ilman,
       * ja peliin ei kirjoiteta sotasisältöä (tarinakaari, luku 2).
       */
      id: 'tsumakit',
      nappi: 'Tie, jota pitkin suola tuli',
      otsikko: 'Tšumakit ja Linnunrata',
      teksti: 'Isoisäsi hunaja tuli jokea pitkin, mutta kaikki muu tuli '
        + 'maata pitkin, ja siitä huolehti oma ammattikuntansa. Tšumakit '
        + 'olivat vankkurikauppiaita: he ajoivat kuormansa kahden härän '
        + 'ikeessä, usein bessarabialaista rotua, ja kuljettivat suolaa, '
        + 'kalaa ja viljaa satojen kilometrien päähän. Suola oli tärkein. '
        + 'Sitä haettiin Halytšynasta ja Mustanmeren ja Asovanmeren '
        + 'rannikolta, ja se vietiin pohjoiseen sinne, missä suolaa ei '
        + 'ollut. Matkat olivat viikkojen mittaisia, ja niistä jäi '
        + 'kieleen jotain, mikä kuuluu siellä tänäkin päivänä: kun '
        + 'ukrainalainen katsoo yötaivaalle ja näkee vaalean juovan, hän '
        + 'ei sano sitä maitotieksi. Sen nimi on Tšumakkien tie — se, '
        + 'jota pitkin kuormat kulkivat, nostettuna taivaalle. Ammatti '
        + 'kukoisti vielä isoisäsi käydessä, mutta hiipui vuosisadan '
        + 'loppuun mennessä: rautatie vei saman tavaran halvemmalla, ja '
        + 'pitkät reitit kävivät kannattamattomiksi. Tšumakit jäivät '
        + 'kansanperinteeseen, Taras Ševtšenkon teoksiin ja Ivan '
        + 'Aivazovskin maalauksiin — ja Linnunradan nimeen, joka ei ole '
        + 'muuttunut.',
      /*
       * Commons 30.8.2026: 2064×1300, public domain, Ivan Aivazovsky,
       * päiväys 1885, Restrictions tyhjä. SILMÄTARKISTUS TEHTY (960 px):
       * maalaus, jossa vankkurit, härkiä ja pieniä hahmoja nuotion
       * ääressä kaukana — ei valokuvattuja eikä tunnistettavia ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: en-Wikipedian oma Chumak-artikkeli
       * nimeää Aivazovskin yhdeksi niistä, joiden töissä tšumakit
       * elävät. Kuva näyttää täsmälleen sen, mistä täky kertoo:
       * yöpymisen aron laidalla kuormien vieressä.
       */
      kuva: {
        tiedosto: 'Aivasovsky Ivan Constantinovich - Chumaks leisure.jpg',
        selite: 'Tšumakkien kuormasto yöpyy aron laidalla: härkävankkurit '
          + 'seisovat piirissä, ja tavara odottaa aamua nuotion vieressä.',
        lahde: 'Ivan Aivazovsky 1885, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä teki tšumakkien pitkistä kuormareiteistä '
          + 'kannattamattomia 1800-luvun lopulla?',
        vaihtoehdot: [
          'Suola loppui Mustanmeren rannikon altaista',
          'Rautatie vei saman tavaran halvemmalla',
          'Härkävankkurit kiellettiin maanteillä',
        ],
        oikea: 1,
        fakta: 'Ammattikunta ehti silti jättää jälkensä kieleen: ukrainaksi '
          + 'Linnunrata on Tšumakkien tie. Vankkuria veti kaksi härkää '
          + 'ikeessä, ja tärkein kuorma oli suola.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän viimeinen virke on *"Tämä maa on
       * musta ja antelias — sen näkee leivästä."* Isoisä siis mittasi
       * maaperän leivällä. Tiede teki saman kymmenen vuotta myöhemmin
       * ja tarvitsi siihen lapion — mutta nimen se otti niiltä, jotka
       * tiesivät ennestään.
       *
       * FAKTAT (en-Wikipedia "Chernozem", johdanto ja osiot
       * "Etymology", "Distribution" ja "Theories of chernozem origin",
       * sekä "Vasily Dokuchaev", johdanto ja osio "Overview"; haettu
       * 30.8.2026):
       *   - mustamulta sisältää humusta 4–16 prosenttia sekä runsaasti
       *     fosfori- ja ammoniakkiyhdisteitä; se pidättää kosteutta ja
       *     tuottaa suuria satoja, mutta köyhtyy jatkuvassa viljelyssä;
       *   - nimi tulee venäjän sanoista musta ja maa;
       *   - kerroksen paksuus vaihtelee muutamasta senttimetristä 1,5
       *     metriin, ja juuri Ukrainassa se on paksuimmillaan;
       *   - mustamultaa on maailmassa noin 230 miljoonaa hehtaaria
       *     kahdessa vyöhykkeessä: Euraasian aro Slavoniasta Siperiaan
       *     ja Pohjois-Amerikan preeriat Manitobasta Kansasiin;
       *   - geologi Vasili Dokutšajev (1846–1903) tutki Poltavan alueen
       *     aromaita 1883 ja huomasi, että talonpojat nimesivät kaikki
       *     maalajit värin mukaan — hän otti nimet käyttöön sellaisinaan;
       *   - hän kuvasi ensimmäisenä keisarikunnan eurooppalaisen osan
       *     mustamullan ja sen viljavuuden; teos Russian Chernozem
       *     ilmestyi 1883;
       *   - hänen työnsä myötä kansainväliseen maaperätieteen sanastoon
       *     jäivät sanat tšernozem, podsoli, gley ja solonets;
       *   - Dokutšajevin ajatus oli, että maaperä ei ole kuollutta
       *     kiviainesta vaan oma luonnonkappaleensa, jolla on synty ja
       *     historia; hän esitti ensimmäisen maaperäluokituksen ja viisi
       *     maannostumisen tekijää.
       */
      id: 'mustamulta',
      nappi: 'Maa, joka sai nimensä talonpojilta',
      otsikko: 'Mustamulta',
      teksti: 'Isoisäsi luki maaperän leivästä, ja se on tarkempi mittari '
        + 'kuin miltä kuulostaa. Mustamullassa on humusta neljästä '
        + 'kuuteentoista prosenttiin, ja se pidättää kosteutta '
        + 'poikkeuksellisen hyvin — siitä sen sadot. Kerros on Ukrainassa '
        + 'paksuimmillaan puolitoista metriä: siinä on mustaa maata '
        + 'syvemmälle kuin lapio ylettyy. Maailmassa sitä on noin 230 '
        + 'miljoonaa hehtaaria kahdessa vyöhykkeessä — toinen kulkee '
        + 'Euraasian aroa myöten Slavoniasta Siperiaan, toinen Kanadan '
        + 'preerioilta Kansasiin asti. Kymmenen vuotta isoisäsi käynnin '
        + 'jälkeen geologi Vasili Dokutšajev kaivoi näitä maita auki '
        + 'Poltavan seudulla ja huomasi jotain, mikä ei ollut kuoppien '
        + 'pohjalla vaan puheessa: talonpojat nimesivät jokaisen maalajin '
        + 'sen värin mukaan. Hän otti nimet sellaisinaan tieteen '
        + 'käyttöön, ja niin maailman maaperäsanastoon jäivät tšernozem, '
        + 'podsoli, gley ja solonets. Samana vuonna 1883 ilmestyi hänen '
        + 'kirjansa mustasta mullasta, ja sen mukana ajatus, joka '
        + 'käänsi koko alan: maaperä ei ole kuollutta kiviainesta vaan '
        + 'oma luonnonkappaleensa, jolla on synty ja historia. Hän '
        + 'nimesi, mistä se syntyy — ilmastosta, kasvillisuudesta, '
        + 'kalliosta, maanpinnan muodosta ja ajasta. Viisi tekijää, ja '
        + 'yksi niistä on pelkkää kärsivällisyyttä.',
      /*
       * Commons 30.8.2026: 802×3008, CC BY-SA 3.0, Rockwurm, kuvattu
       * 2.11.2012, kuvaus "Soil profile of a Chernozem". Restrictions
       * tyhjä. SILMÄTARKISTUS TEHTY (960 px): museoon pystytetty
       * maaprofiilin monoliitti mustasta pinnasta vaaleaan pohjaan, ei
       * ihmisiä.
       *
       * KUVA ON KAPEA JA KORKEA (1:3,75), ja se on tässä tarkoitus:
       * juuri pystysuunta näyttää sen, mistä teksti puhuu — kuinka
       * syvälle musta ulottuu.
       */
      kuva: {
        tiedosto: 'Chernozem.JPG',
        selite: 'Mustamullan pystyleikkaus näyttää humuskerroksen '
          + 'paksuuden: Ukrainassa mustaa maata on paikoin puolitoista '
          + 'metriä ennen kuin vaaleampi pohja alkaa.',
        lahde: 'Rockwurm, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Vasili Dokutšajev vei aromaiden nimet tieteen sanastoon '
          + '1880-luvulla. Mistä hän otti ne?',
        vaihtoehdot: [
          'Talonpojilta, jotka nimesivät maat väreillä',
          'Latinasta, kuten kasvien ja eläinten tieteelliset nimet',
          'Keisarikunnan vanhoista verokirjoista',
        ],
        oikea: 0,
        fakta: 'Niin kansainväliseen maaperätieteeseen jäivät sanat '
          + 'tšernozem, podsoli, gley ja solonets. Mustamullassa on '
          + 'humusta 4–16 prosenttia, ja Ukrainassa kerros voi olla '
          + 'puolentoista metrin paksuinen.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: isoisä osti torilta hunajaa, ja se hunaja on
       * pelin oma pieni aarre tässä maassa (js/packs/paikallisaarteet.js,
       * UKR). Täky kertoo, kuka teki siitä kaupan, jossa mehiläisten ei
       * tarvitse kuolla.
       *
       * FAKTAT: js/packs/paikallisaarteet.js, UKR/pieniAarre (jo
       * hyväksyttyä pelidataa) — Ukraina on Euroopan suurimpia hunajan
       * tuottajia ja maailman suurimpia viejiä, nykyaikaisen kehyspesän
       * kehitti Petro Prokopovytš 1814, ja hän perusti myös ensimmäisen
       * mehiläishoidon koulun.
       *
       * LISÄTIEDOT (EI PELIDATASSA — en-Wikipedia "Petro Prokopovych",
       * johdanto ja osio "Biography"; haettu 30.8.2026):
       *   - Prokopovytš syntyi 29.6.1775 Myttšenkyn kylässä Baturynin
       *     lähellä ja opiskeli yksitoistavuotiaasta kahdeksan vuotta
       *     Kiovan Mohylan akatemiassa;
       *   - hän erosi upseerintehtävistä 1798 ja aloitti veljensä
       *     mehiläistarhalla; vuoteen 1808 mennessä hänellä oli 580
       *     pesää ja myöhemmin 6 600 yhdyskuntaa;
       *   - tavoite oli häiritä ja vahingoittaa mehiläisiä
       *     mahdollisimman vähän; siitä syntyi 1814 maailman
       *     ensimmäinen kehyspesä, josta hunajan sai irti ilman että
       *     pesä tuhottiin — aiemmin yhdyskunta tapettiin savulla ennen
       *     hunajan ottamista;
       *   - hän keksi myös väliseinän, jonka aukoista mahtuivat vain
       *     työmehiläiset (nykyinen emonsulkuristikko), jolloin
       *     kehyksistä saatiin puhdasta hunajaa;
       *   - hän kirjoitti yli kuusikymmentä artikkelia ja piti koulua,
       *     joka koulutti yli 700 mehiläishoitajaa 53 toimintavuotensa
       *     aikana; koulu oli Paltšykyn kylässä nykyisessä Tšernihivin
       *     alueessa, jonne hänet myös haudattiin — kylässä on hänen
       *     muistomerkkinsä, ja Ukrainan mehiläishoidon tutkimuslaitos
       *     on nimetty hänen mukaansa.
       */
      id: 'mehilaiset',
      nappi: 'Pesä, jonka saattoi avata',
      otsikko: 'Prokopovytšin kehyspesä',
      teksti: 'Se hunajapurkki, jonka isoisäsi osti torilta, on '
        + 'vanhempaa kauppaa kuin miltä näyttää — mutta tapa, jolla se '
        + 'oli kerätty, oli hänen mittapuullaan uusi. Vielä 1800-luvun '
        + 'alussa hunajan ottaminen tarkoitti useimmiten yhdyskunnan '
        + 'tappamista savulla: pesää ei saanut auki muuten. Petro '
        + 'Prokopovytš, joka syntyi 1775 Myttšenkyn kylässä Baturynin '
        + 'lähellä ja opiskeli kahdeksan vuotta Kiovan Mohylan '
        + 'akatemiassa, ei hyväksynyt sitä. Hän jätti upseerin uran 1798, '
        + 'meni veljensä mehiläistarhalle ja alkoi tutkia, miten pesää '
        + 'voisi hoitaa häiritsemättä sen asukkaita. Vuonna 1808 hänellä '
        + 'oli jo 580 pesää. Vuonna 1814 hän rakensi maailman '
        + 'ensimmäisen kehyspesän: kehykset saattoi nostaa ulos yksi '
        + 'kerrallaan, katsoa ja panna takaisin, ja hunajan sai irti '
        + 'ilman että yhdyskunta tuhottiin. Toinen keksintö oli '
        + 'väliseinä, jonka rei’istä pääsivät läpi vain työmehiläiset — '
        + 'niin hunajakehyksiin tuli vain hunajaa. Lopulta hänellä oli '
        + '6 600 yhdyskuntaa. Suurimman jäljen hän jätti kuitenkin '
        + 'opettamalla: hänen koulunsa toimi 53 vuotta ja päästi yli '
        + 'seitsemänsataa mehiläishoitajaa maailmalle. Koulu oli '
        + 'Paltšykyn kylässä nykyisen Tšernihivin alueella, ja sinne '
        + 'hänet myös haudattiin. Kylässä seisoo hänen muistomerkkinsä, '
        + 'ja Ukrainan mehiläishoidon tutkimuslaitos kantaa hänen '
        + 'nimeään.',
      /*
       * Commons 30.8.2026: 861×684, public domain, tekijä L. Moll,
       * kuvaus "Sorte de ruche de la fin du 19e siècle", tiedostonimi
       * "Ruche Prokopowitsh". Restrictions tyhjä. SILMÄTARKISTUS TEHTY
       * (960 px): 1800-luvun mehiläishoidon oppikirjan puupiirros
       * pesästä, jonka kehykset näkyvät avatun etuseinän takaa — ei
       * ihmisiä.
       *
       * SELITE EI VÄITÄ ENEMPÄÄ KUIN LÄHDE: kuva on aikalaisen
       * oppikirjan kuva Prokopovytšin pesästä, ei valokuva alkuperäisestä
       * esineestä.
       */
      kuva: {
        tiedosto: 'Ruche Prokopowitsh.jpg',
        selite: 'Prokopovytšin kehyspesä 1800-luvun mehiläishoidon '
          + 'oppikirjan kuvassa: kehykset nostetaan ulos yksitellen, '
          + 'jolloin pesää ei tarvitse rikkoa.',
        lahde: 'L. Moll, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä Prokopovytšin vuoden 1814 keksintö muutti '
          + 'mehiläishoidossa?',
        vaihtoehdot: [
          'Pesät voitiin siirtää talveksi lämpimään suojaan',
          'Mehiläiset saatiin tuottamaan hunajaa kahdesti kesässä',
          'Hunajan sai irti tappamatta yhdyskuntaa',
        ],
        oikea: 2,
        fakta: 'Ennen kehyspesää yhdyskunta tapettiin useimmiten savulla, '
          + 'koska pesää ei saanut auki muuten. Prokopovytšin koulu '
          + 'koulutti 53 vuodessa yli 700 mehiläishoitajaa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa kysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, kiova: *"Kiovan
   * Kultainen portti rakennettiin lähes tuhat vuotta sitten. Mikä sen
   * tehtävä oli?"*).
   *
   * Visasääntö täyttyy: vastaus on tekstissä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan — teksti ei kysy portin
   * tehtävää eikä käytä kaaripaketin vastausriviä, vaan kertoo muurin
   * mitan, kolme sisäänkäyntiä ja sen, mitä holvin läpi tehtiin.
   *
   * MIKSI KAKSI PORTTIA: koska toinen niistä liittyy isoisän omaan
   * vuoteen. Se on myös oppitunnin oma yllätys eikä toisinto lehdestä:
   * kaupunkilehti kertoo Kultaisesta portista vain kansikuvan
   * selitteessä (1982, jälleenrakennus on arvaus) eikä mainitse
   * Hartmannia eikä Musorgskia lainkaan.
   *
   * FAKTAT (en-Wikipedia "Golden Gate, Kyiv", johdanto sekä osiot
   * "History" ja "Description"; haettu 30.8.2026):
   *   - portti oli Kiovan 1000-luvun linnoituslaitteiden pääportti;
   *     nykyhistoria pitää sitä yhtenä Jaroslav Viisaan kolmesta
   *     portista, ja se rakennettiin 1017–1024 samoihin aikoihin kuin
   *     Pyhän Sofian katedraali;
   *   - alkuperäinen nimi oli yksinkertaisesti Eteläinen portti, ja se
   *     oli yksi kolmesta pääsisäänkäynnistä muurin ympäröimään
   *     kaupunkiin Ladskin ja Žydivskin porttien rinnalla; kaksi muuta
   *     eivät ole säilyneet; kivilinnoitusta oli vain 3,5 kilometriä;
   *   - myöhemmin sitä sanottiin Kiovan Suureksi portiksi; kun portin
   *     viereen rakennettiin Ilmestyskirkko, sen kullatut kupolit
   *     näkyivät kauas kaupungin ulkopuolelle, ja siitä lähtien
   *     puhuttiin Kultaisesta portista;
   *   - holvikäytävä oli noin 12 metriä korkea ja 6 metriä leveä, ja
   *     lähes puolen vuosituhannen ajan portti toimi kaupungin
   *     riemukaarena ja tunnuksena;
   *   - portti rappeutui vähitellen raunioksi; 1832 metropoliitta
   *     Eugenius kaivatti rauniot esiin ja teetti ensimmäisen
   *     kartoituksen niiden suojelemiseksi; 1970-luvulla viereen tuli
   *     paviljonki ja museo;
   *   - 1982 portti rakennettiin kokonaan uudelleen Kiovan 1500-vuotis-
   *     juhlaan, vaikka alkuperäisestä ei ole säilynyt yhtään kuvaa;
   *     ratkaisusta on kiistelty kiivaasti, ja osa taidehistorioitsijoista
   *     on vaatinut jälleenrakennuksen purkamista, jotta rauniot
   *     näkyisivät;
   *   - aidot jäänteet ovat kaksi muurinpätkää, 24 ja 13 metriä pitkät,
   *     roomalaista tiiltä ja kiveä; ne ovat jälleenrakennuksen sisällä;
   *   - portin päällä ollut kirkko mainitaan kronikassa ja metropoliitta
   *     Ilarionin kirjoituksessa; jälleenrakennetun kirkon lattian
   *     mosaiikin kuvio noudattaa Pyhän Sofian katedraalin vanhaa
   *     lattiakuviota.
   *
   * FAKTAT (en-Wikipedia "Pictures at an Exhibition", johdanto sekä
   * osiot "Composition history" ja "10. The Bogatyr Gates (In the
   * Capital in Kiev)"; haettu 30.8.2026):
   *   - arkkitehti ja taiteilija Viktor Hartmann kuoli äkillisesti
   *     4.8.1873 aneurysmaan 39-vuotiaana;
   *   - Vladimir Stasov järjesti muistonäyttelyn, jossa oli yli 400
   *     Hartmannin työtä, Pietarin taideakatemiassa helmi–maaliskuussa
   *     1874; Musorgski kävi näyttelyssä;
   *   - Musorgski sävelsi Näyttelykuvat kolmessa viikossa 2.–22.6.1874;
   *   - sarjan päättävä osa on Hartmannin suunnitelma Kiovan
   *     kaupunginportista; Hartmann piti sitä parhaana työnään ja voitti
   *     suunnittelukilpailun, mutta rakentaminen peruttiin;
   *   - Stasovin ohjelmateksti kuvaa luonnoksen portiksi, jonka kupoli
   *     on slaavilaisen kypärän muotoinen.
   *
   * MITÄ EI KERROTA: portin osittainen tuhoutuminen 1240 ja
   * kilpailun taustalla ollut attentaatti. Sotasisältöä ja ihmisten
   * julmuutta ei kirjoiteta (tarinakaari, luku 2), eikä oppitunti
   * tarvitse kumpaakaan.
   */
  oppitunti: {
    otsikko: 'Kaksi porttia, joista kumpikaan ei ole aivan olemassa',
    teksti: 'Kiovan kivimuuria oli aikanaan vain kolme ja puoli '
      + 'kilometriä, ja sen läpi pääsi kolmesta kohdasta. Kaksi noista '
      + 'sisäänkäynneistä on kadonnut jäljettömiin; kolmas rakennettiin '
      + '1017–1024, samoihin aikoihin kuin Pyhän Sofian katedraali, ja '
      + 'sitä sanottiin aluksi yksinkertaisesti Eteläiseksi portiksi. '
      + 'Holvi oli kaksitoista metriä korkea ja kuusi leveä, ja sen läpi '
      + 'kuljettiin sisään ja ulos lähes puolen vuosituhannen ajan — '
      + 'juhlasaatot, ruhtinaat, kuormat ja vieraat samasta aukosta. '
      + 'Kun holvin päälle nousi kirkko, sen kullatut kupolit näkyivät '
      + 'kauas kaupungin ulkopuolelle, ja nimi vaihtui sen mukaan. '
      + 'Sitten portti rappeutui. Vuonna 1832 metropoliitta Eugenius '
      + 'kaivatti rauniot esiin ja teetti niistä ensimmäisen '
      + 'kartoituksen; raunioina ne olivat vielä isoisäsi aikaan. '
      + 'Vuonna 1982 '
      + 'koko portti rakennettiin uudelleen Kiovan 1500-vuotisjuhlaan, '
      + 'vaikka alkuperäisestä ei ole säilynyt yhtään kuvaa — ei '
      + 'piirrosta, ei luonnosta, ei mitään. Siitä kiistellään yhä, ja '
      + 'osa taidehistorioitsijoista haluaisi jälleenrakennuksen pois, '
      + 'jotta aidot jäänteet näkyisivät: kaksi muurinpätkää, '
      + 'kaksikymmentäneljä ja kolmetoista metriä, roomalaista tiiltä ja '
      + 'kiveä. Ne ovat yhä siellä, uuden portin sisällä. Ja sitten on '
      + 'se toinen portti. Arkkitehti Viktor Hartmann voitti kilpailun '
      + 'Kiovan uudesta kaupunginportista ja piti suunnitelmaansa '
      + 'parhaana työnään, mutta rakentaminen peruttiin. Hartmann kuoli '
      + 'äkillisesti 4. elokuuta 1873, kolmenkymmenenyhdeksän vuoden '
      + 'ikäisenä — sinä samana kesänä, jona isoisäsi oli matkalla. '
      + 'Seuraavana keväänä hänen ystävänsä ripustivat Pietarin '
      + 'taideakatemiaan muistonäyttelyn, yli neljäsataa työtä, ja yksi '
      + 'kävijöistä oli säveltäjä Modest Musorgski. Hän kirjoitti '
      + 'näkemästään sarjan kolmessa viikossa kesäkuussa 1874, ja sen '
      + 'viimeinen osa on juuri se portti, jota ei rakennettu. Se '
      + 'seisoo siis vain konserttisaleissa — ja on sillä tavalla '
      + 'kestänyt paremmin kuin moni muurattu.',
    /*
     * Commons 30.8.2026: 5350×3600, public domain, George Chernilevsky,
     * kuvattu 12.5.2018, kuvaus "Top part of the Golden Gates of Kiev,
     * Ukraine". Restrictions tyhjä. SILMÄTARKISTUS TEHTY (960 px):
     * porttikirkon yläosa ja kullattu kupoli sinistä taivasta vasten, ei
     * ihmisiä.
     *
     * MIKSI EI LEHDEN KANSIKUVAA: kaupunkilehden kansikuvana on saman
     * kuvaajan koko portin näkymä ('Golden Gate Kiev 2018 G1.jpg',
     * js/packs/kulttuuri-kategoriat.js). Sama kuva kahdessa paikassa
     * olisi toisinto, joten tähän on otettu se osa rakennelmaa, josta
     * teksti puhuu — holvin päälle noussut kirkko ja sen kullattu
     * kupoli.
     */
    kuva: {
      tiedosto: 'Golden Gate Kiev top 2018 G1.jpg',
      selite: 'Portin holvin päälle rakennetun kirkon kullatut kupolit '
        + 'näkyivät aikanaan kauas kaupungin ulkopuolelle; nykyinen '
        + 'rakennelma on vuoden 1982 jälleenrakennus.',
      lahde: 'George Chernilevsky, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * HAHMO JA KYSYMYS OVAT KAANONIA, ESITTELYTEKSTI ON LUONNOS. Kiovalla
   * on tarinakaaren paketti (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * id 'kiova'), joka antaa sekä hahmon — portinvartija Oksana, joka
   * pitää Kultaisen portin avaimia ja tuntee holvin jokaisen
   * kaiverruksen sormenpäillään — että kysymyksen, jonka game.actionQuiz
   * esittää laatalla (js/game.js kaariTarina). Kumpaakaan ei kosketa
   * täällä. Alla oleva `teksti` on VAIN kortin esittely, ja se on
   * ehdotus: se on kirjoitettu niin, ettei se kertaa Oksanan omaa
   * repliikkiä eikä paljasta vastausta.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortissa on hahmo,
   * nappi, varmistus, vihjeOsio ja teksti.
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luvut 3 ja 5):
   *   - ÄÄNIPROFIILI on HÄMMÄSTYY ITSEKIN. Vilnan Rasa ja Sevillan
   *     Amparo ovat epäuskoisia, joten tälle erälle tarvitaan toinen
   *     ääni: Oksana uskoo sukunsa tarinan täysin, mutta ei ole
   *     koskaan tiennyt, kuka viivat veisti — ja myöntää sen ääneen.
   *   - VARALLISUUSSÄÄNTÖ: isoisä ei maksa mitään, ei tilaa mitään eikä
   *     käske ketään. Suvun syy pitää huolta holvista on suvun oma:
   *     avaimet ovat kulkeneet perheessä, ja kaiverrusten pyyhkiminen
   *     on osa työtä, jota kukaan ei ole käskenyt tekemään.
   *   - LUPAUS, JONKA AARRETEKSTIN ON LUNASTETTAVA: Oksana painaa
   *     vieraan käden kaiverrukselle, ja se luetaan sormilla.
   *   - EI SPOILERIA: kortti ei mainitse porttia, sen tehtävää eikä
   *     ikää — vain holvin, kiven ja avaimet.
   */
  kohtaaminen: {
    hahmo: 'Portinvartija Oksana',
    nappi: 'Tapaa portinvartija',
    varmistus: 'Haluatko varmasti tavata Oksanan juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js, kiova):
     * 'kaupunki' tai 'musiikki'. Oksanan kysymys koskee holvia ja
     * muureja, ja lähin tuki on kaupunkisivulla, jonka kansikuvan selite
     * kertoo, mitä porttitornista on aitoa ja mitä ei.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Oksanalla on avaimet, ja avaimet ovat vanhempia kuin lukot, '
      + 'joihin ne sopivat: perheessä on hoidettu tätä holvia niin '
      + 'kauan, ettei kukaan enää muista, kuka aloitti. Työhön kuuluu '
      + 'pyyhkiä pöly kaiverruksista, ja sen hän tekee kämmenellä eikä '
      + 'harjalla, koska harja ei tunne mitään. Vieraita hän on '
      + 'opastanut satoja, ja useimmat kysyvät samaa: kuka nämä viivat '
      + 'on veistänyt. Oksana sanoo suoraan, ettei tiedä, ja että se '
      + 'harmittaa häntä enemmän kuin hän kehtaa myöntää — hän on '
      + 'lukenut ne tuhat kertaa sormillaan eikä ole päässyt riviäkään '
      + 'pidemmälle. Kiveen hän ei kuitenkaan päästä ketään koskemaan '
      + 'ennen kuin tulija osoittaa tietävänsä, mitä varten se '
      + 'aikoinaan pystytettiin.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin muillakin fokuskaupungeilla.
   */

  /*
   * KOHTAAMISPAIKKA: KULTAINEN PORTTI, jonka holvissa Oksana seisoo.
   *
   * 50,44888889 N / 30,51333333 E — en-Wikipedia "Golden Gate, Kyiv",
   * prop=coordinates (haettu 30.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö LEVEYS
   * 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((30,51333333 − (−175)) mod 360) × (12000/360)
   *                     = 205,51333 × 33,3333… = 6850,4
   *                   y = (millerY(50,44888889) − millerY(76)) × 12000/2π
   *                     = 1370,6
   *   europe          x = (30,51333333 + 11) × 19,2 = 797,1
   *                   y = (72 − 50,44888889) × 26,3 = 566,8
   *
   * KAAVA ON TARKISTETTU KIOVAN LAATTAA VASTEN: kaupungin oma piste
   * (50,45 N / 30,5233 E) antaa samalla kaavalla 797,2 / 566,8, ja
   * laatta on js/packs/europe.js:ssä kohdassa 797 / 567 ja
   * js/packs/maailmankartta.js:ssä 6850,3 / 1370,9. Ero on alle
   * yksikön, eli kaava osuu.
   *
   * PISTE OSUU KÄYTÄNNÖSSÄ LAATAN PÄÄLLE (0,2 yksikköä), ja se on
   * oikein: portti on kaupungin ytimessä. Piirtopuoli siirtää merkin
   * laatan viereen itse (js/fokuspiste.js PISTE_ERO_MIN = 14), joten
   * pistettä ei ole vedetty käsin sivuun.
   */
  kohtaamispiste: {
    nimi: 'Kultainen portti',
    laudat: {
      maailmankartta: { x: 6850.4, y: 1370.6 },
      europe: { x: 797.1, y: 566.8 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Kiovan sivupino (js/lehti.js
   * rakennaSivut) on Vilnan mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Kiova", 2 = Musiikki, 3 = Menovinkit (Ukrainan
   * maapaketista, js/packs/maa-kategoriat.js UKR).
   *
   * Sivun 1 kysymys on Kiovan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js:ssä on `kiova`-rivi
   * (Kiova 1892, sähköraitiotie), joten palkinto lunastuu oikeasti.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: KOBZARI_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PEKTORAALI_VISA,
    },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Ukraina) ----------
   *
   * UUSI POOLI, EI SIIRTO. Ukraina ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KOLME NOSTOA, JOTTA POOLI VOI VUOROTELLA (omistajan pelitestipalaute
   * v1234: luetun täyn tilalle pitää syttyä uusi). Ensimmäinen on maan
   * KUPLATÄKY eli poolin kärki: Livia huomauttaa tuikkivista pisteistä
   * kerran (js/fokusnosto.js, LIVIAN HUOMAUTUS), ja huomio osuu poolin
   * ensimmäiseen katsomattomaan. Järjestys on siksi harkittu.
   *
   * AIHEET EIVÄT TOISTA LEHTEÄ. Kaupunkilehden kolme nostoa ovat
   * Arsenalnan metroasema, Pyhän Sofian seinien raapustukset ja
   * Isänmaa-äidin kilpi; maalehden Menovinkit nimeää Sofian
   * virtuaalikierroksen ja skyyttalaisen pektoraalin. Sofia esiintyy
   * siis lehdessä kahdesti, mutta kummallakaan kerralla ei puhuta
   * mosaiikeista eikä siitä, mitä seinien päällä oli isoisän aikaan —
   * ja juuri se on kolmannen noston aihe.
   *
   * ETÄISYYS, JOKA ON MITATTU JA JOKA KANNATTAA TIETÄÄ: Trypillian
   * kylä jää Kiovan laatasta 10,0 yksikön päähän eli alle
   * PISTE_ERO_MINin (14), joten piirtopuoli siirtää merkin laatan
   * vierestä. Se on oikein — kylä on runsaan neljänkymmenen kilometrin
   * päässä kaupungista — mutta jos Fable haluaa nostojen väljentämistä,
   * tämä on se piste, joka kannattaa katsoa ensin. Dneprin kosket jäävät
   * lähimmästä vieraasta laatasta (Odessa) 96,7 yksikön päähän, eli
   * niiden kanssa ei ole törmäyksen vaaraa.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * MIKSI TRYPILLIA: isoisä kirjasi, että maa on musta ja antelias.
       * Tämä on sen maan ensimmäinen tunnettu sato — ja se löytyi
       * vasta hänen jälkeensä, neljänkymmenen kilometrin päästä siitä
       * torilta, jolta hän osti hunajansa.
       *
       * FAKTAT (en-Wikipedia "Cucuteni–Trypillia culture", johdanto
       * sekä osiot "Nomenclature" ja "Geography", ja "Trypillia",
       * johdanto ja osio "History"; haettu 30.8.2026):
       *   - kulttuuri ajoittuu noin vuosiin 5050–2950 eaa. ja ulottui
       *     Karpaateilta Dnesterin ja Dneprin seuduille, noin 350 000
       *     neliökilometrin alueelle;
       *   - keskikaudella (n. 4100–3500 eaa.) sen asutukset olivat
       *     Euraasian suurimpia: osassa oli jopa kolmetuhatta
       *     rakennusta ja mahdollisesti 20 000–46 000 asukasta;
       *     väkiluku huipussaan saattoi ylittää miljoonan;
       *   - keramiikka poltettiin kehittyneissä uuneissa, ja alueelta
       *     on löytynyt maailman vanhin tunnettu savenvalajan pyörä
       *     (5. vuosituhannen puolivälistä eaa.) sekä vanhimmat
       *     tunnetut pienoismallit pyörällisistä ajoneuvoista;
       *   - tunnusomaisin piirre on asutusten säännöllinen polttaminen:
       *     yksi asuinvaihe kesti noin 60–80 vuotta, minkä jälkeen kylä
       *     paloi ja rakennettiin usein uudelleen samaan kohtaan samassa
       *     muodossa ja suunnassa; syystä kiistellään yhä;
       *   - kulttuuri nimettiin ensin Romanian Cucutenin mukaan 1884;
       *     ukrainalaiset kohteet löysi tšekkiläissyntyinen arkeologi
       *     Vikentij Hvojka Kiovassa, ja hän esitteli löytönsä
       *     arkeologien 11. kongressissa 1897 — sitä pidetään
       *     virallisena löytövuotena; samana vuonna vastaavia esineitä
       *     löytyi Trypillian kylästä Kiovan alueelta, ja kylä antoi
       *     kulttuurille sen ukrainalaisen nimen;
       *   - Trypillia on Obuhivin piirissä noin 40 kilometriä Kiovasta
       *     etelään Dneprin varrella.
       *
       * KAKSI LÖYTÖVUOTTA, JA MOLEMMAT OVAT LÄHTEISSÄ. Hvojkan
       * ensimmäisten kaivausten vuodeksi mainitaan 1893, 1896 ja 1887;
       * virallisena pidetään kongressivuotta 1897. Teksti kertoo tämän
       * eikä valitse toista pois.
       *
       * MITÄ EI KERROTA: kylän myöhemmät taistelut ja vuoden 1919
       * välikohtaus. Sotasisältöä ei kirjoiteta (tarinakaari, luku 2).
       */
      id: 'trypillia',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Trypillia',
      otsikko: 'Euroopan suurimmat kylät rakennettiin kuusituhatta vuotta '
        + 'sitten — ja poltettiin joka kolmas sukupolvi',
      lunastus: [
        'Neljänkymmenen kilometrin päässä Kiovasta, Dneprin varrella, on '
          + 'kylä nimeltä Trypillia. Sen mukaan on nimetty kulttuuri, '
          + 'joka eli näillä main noin vuosina 5050–2950 ennen '
          + 'ajanlaskua ja levisi Karpaateilta Dnesterille ja Dneprille, '
          + 'noin 350 000 neliökilometrin alalle. Keskikaudellaan, '
          + 'runsaat neljätuhatta vuotta ennen ajanlaskua, sen asutukset '
          + 'olivat Euraasian suurimpia: isoimmissa oli jopa '
          + 'kolmetuhatta rakennusta ja arvioiden mukaan '
          + 'kahdestakymmenestä neljäänkymmeneenkuuteen tuhanteen '
          + 'asukasta. Se on kaupungin kokoinen luku aikana, jolta ei '
          + 'tunneta kaupunkeja. Saviastiat poltettiin kehittyneissä '
          + 'uuneissa, ja samalta alueelta on löytynyt maailman vanhin '
          + 'tunnettu savenvalajan pyörä ja vanhimmat pienoismallit '
          + 'pyörällisistä ajoneuvoista.',
        'Ja sitten se piirre, jota kukaan ei osaa selittää: kylät '
          + 'poltettiin. Yksi asuinvaihe kesti noin kuusikymmentä tai '
          + 'kahdeksankymmentä vuotta, minkä jälkeen koko kylä paloi — ja '
          + 'usein se rakennettiin uudelleen samaan kohtaan, samaan '
          + 'muotoon ja samaan suuntaan kuin ennen. Oliko se juhla, '
          + 'siivous, perintöoikeus vai jotain muuta, siitä kiistellään '
          + 'yhä. Kaikki tämä oli isoisäsi aikaan vielä maan alla. '
          + 'Kulttuuri nimettiin ensin romanialaisen Cucutenin mukaan '
          + '1884, ja ukrainalaiset kohteet löysi arkeologi Vikentij '
          + 'Hvojka Kiovassa — hänen ensimmäisten kaivaustensa vuodeksi '
          + 'mainitaan lähteissä 1887, 1893 ja 1896, mutta virallinen '
          + 'löytövuosi on 1897, jolloin hän esitteli löytönsä '
          + 'arkeologien kongressissa. Samana vuonna esineitä löytyi '
          + 'Trypillian kylästä, ja kylä antoi kulttuurille sen nimen. '
          + 'Isoisäsi käveli kaupungissa neljännesvuosisata liian '
          + 'aikaisin.',
      ],
      lahde: 'en-Wikipedia "Cucuteni–Trypillia culture" (johdanto sekä '
        + 'osiot Nomenclature ja Geography) ja "Trypillia" (johdanto ja '
        + 'History); tarkistettu 30.8.2026.',
      /*
       * Commons 30.8.2026: 1920×1251, CC BY-SA 3.0, Silar, kuvattu
       * 5.4.2013, kuvaus "Die bemalte Keramik des dritten Jahrtausends
       * von der Cicuteni-Kultur beim Dorfe Biltsche-Solote".
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (960 px): maalattuja
       * saviastioita vitriinissä, ei ihmisiä.
       */
      kuva: {
        tiedosto: '02013 Der "bemalten Keramik" vom Trypillja-Typus am Anfang des 30.Jhs.v. Chr. beim Dorfe Biltsche-Solote, B5.JPG',
        selite: 'Trypillian kulttuurin maalattua keramiikkaa Biltše-Zolotesta: '
          + 'astiat poltettiin kehittyneissä uuneissa jo ennen '
          + 'savenvalajan pyörän yleistymistä muualla.',
        lahde: 'Silar, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi kokonainen kylä poltettiin parin sukupolven välein?',
        'Voiko kuusituhatta vuotta vanhaa asutusta sanoa kaupungiksi?',
        'Miten arkeologi löytää kylän, josta ei ole mitään maan päällä?',
      ],
      /*
       * 50,115 N / 30,77638889 E — en-Wikipedia "Trypillia",
       * prop=coordinates (haettu 30.8.2026). Sama kaava ja samat vakiot
       * kuin kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Trypillian kylä',
        laudat: {
          maailmankartta: { x: 6859.2, y: 1385.2 },
          europe: { x: 802.1, y: 575.6 },
        },
      },
    },
    {
      /*
       * MIKSI DNEPRIN KOSKET: isoisän hunajakauppiaat tulivat veneellä
       * satojen virstojen päästä. Tämä kertoo, mitä siellä alavirrassa
       * oli — ja miksi vene ei päässyt sen pidemmälle.
       *
       * FAKTAT (en-Wikipedia "Dnieper rapids", johdanto sekä osiot
       * "Historical mentions" ja "Names of the major rapids"; haettu
       * 30.8.2026):
       *   - kosket syntyivät Ukrainan kilven graniitti- ja
       *     gneissipaljastumista; ne alkoivat nykyisen Dniprovin
       *     kaupungin alapuolelta ja päättyivät ennen nykyistä
       *     Zaporižžjaa, jonka nimi tarkoittaa koskien takaista;
       *   - joki putosi 66 kilometrin matkalla 50 metriä;
       *   - suuria koskia oli yhdeksän, pienempiä 30–40 ja saaria ja
       *     luotoja kuusikymmentä; kosket estivät laivaliikenteen lähes
       *     kokonaan;
       *   - suurin ja vaarallisin oli Nenasytets, "Kyltymätön", jota
       *     sanottiin myös Ryövääväksi ja paikallisesti Helvetiksi: 2,4
       *     kilometriä pitkä ja yli kilometrin levyinen, ja sen kohina
       *     kuului useiden kilometrien päähän;
       *   - kosket ovat osa varjagien ja kreikkalaisten välistä reittiä,
       *     joka mainitaan Nestorin kronikassa; matkalaiset joutuivat
       *     kantamaan aluksensa maitse seitsemän kosken ohi;
       *   - ranskalainen sotilasinsinööri Guillaume Le Vasseur de
       *     Beauplan valitti teoksessaan Description d'Ukranie (1651,
       *     1660), että maa tuottaa viljaa yli tarpeen mutta ei saa sitä
       *     vietyä, koska joki ei ole purjehduskelpoinen Kiovan
       *     alapuolella putoustensa takia;
       *   - kosket jäivät Dneprin vesivoimalaitoksen tekoaltaan alle,
       *     kun laitos valmistui Zaporižžjaan 1932.
       *
       * MITÄ EI KERROTA: koskilla käydyt taistelut ja ruhtinaiden
       * kohtalot, jotka lähde luettelee. Sotasisältöä ei kirjoiteta
       * (tarinakaari, luku 2), ja nosto pärjää ilman: sen aihe on kivi,
       * vesi ja se, mikä katosi veden alle.
       */
      id: 'dneprin-kosket',
      nimio: 'Dneprin kosket',
      otsikko: 'Yhdeksän koskea, joiden kohina kuului kilometrien päähän '
        + '— ja jotka ovat nyt järven pohjassa',
      lunastus: [
        'Kiovan alapuolella Dnepr näyttää leveältä ja rauhalliselta, ja '
          + 'niin se on — kolmesataa kilometriä. Sitten tuli kalliota. '
          + 'Ukrainan kilven graniitti ja gneissi työntyivät joen '
          + 'uomaan, ja kuudenkymmenenkuuden kilometrin matkalla vesi '
          + 'putosi viisikymmentä metriä. Suuria koskia oli yhdeksän, '
          + 'pienempiä kolmestakymmenestä neljäänkymmeneen ja saaria ja '
          + 'luotoja kuusikymmentä. Laivaliikenne loppui käytännössä '
          + 'siihen. Suurin niistä oli Nenasytets, Kyltymätön: kaksi ja '
          + 'puoli kilometriä pitkä, yli kilometrin levyinen, ja sen '
          + 'kohina kuului useiden kilometrien päähän. Paikalliset '
          + 'sanoivat sitä Helvetiksi. Alavirran kaupungin nimi '
          + 'Zaporižžja tarkoittaa yksinkertaisesti koskien takaista — '
          + 'nimi kertoo, kummalta puolen sitä katsottiin.',
        'Kosket näkyvät kirjoitetussa historiassa niin kauas kuin sitä '
          + 'on. Ne ovat Nestorin kronikan reitillä varjageilta '
          + 'kreikkalaisille, ja matkalaiset kantoivat veneensä maitse '
          + 'seitsemän kosken ohi. Ranskalainen sotilasinsinööri '
          + 'Guillaume Le Vasseur de Beauplan kirjoitti 1651, että maa '
          + 'tuottaa viljaa enemmän kuin kukaan tarvitsee mutta ettei '
          + 'sitä saada mihinkään, koska joki ei kulje Kiovan '
          + 'alapuolella. Sama valitus kuului vielä isoisäsi aikaan, ja '
          + 'siksi tavara nousi jokea ylös eikä laskenut sitä alas. '
          + 'Ratkaisu tuli vasta 1932, ja se oli lopullinen: '
          + 'Zaporižžjaan valmistui vesivoimalaitos, jonka tekoallas '
          + 'nosti pinnan koskien yli. Ne ovat yhä siellä, kilometrin '
          + 'levyinen Kyltymätön muiden mukana — vain hiljaa ja veden '
          + 'alla.',
      ],
      lahde: 'en-Wikipedia "Dnieper rapids", johdanto sekä osiot '
        + 'Historical mentions ja Names of the major rapids; tarkistettu '
        + '30.8.2026.',
      /*
       * Commons 30.8.2026: 1005×626, public domain, kuva on Mykola
       * Arkasin teoksesta Istorija Ukrajiny-Rusy (1912), kuvaus
       * "Дніпровий поріг ненаситець". Restrictions tyhjä.
       * SILMÄTARKISTUS TEHTY (960 px): kaiverrus kalliosta ja
       * kuohuvasta vedestä, oikeassa alakulmassa kaksi pientä
       * venehahmoa — piirros, ei tunnistettavia kasvoja.
       *
       * MIKSI JUURI TÄMÄ KUVA: koskia ei ole enää olemassa, joten
       * ainoat kuvat ovat aikalaisia. Tämä on painettu kaksikymmentä
       * vuotta ennen kuin allas peitti ne.
       */
      kuva: {
        tiedosto: 'Історія України-Русі. 1912. Дніпровий поріг ненаситець.jpg',
        selite: 'Nenasytets eli Kyltymätön oli koskista suurin: kaksi ja '
          + 'puoli kilometriä pitkä kivikko, jonka kohina kuului '
          + 'useiden kilometrien päähän.',
        lahde: 'Mykola Arkas, Istorija Ukrajiny-Rusy 1912, Wikimedia '
          + 'Commons (public domain)',
      },
      kysymykset: [
        'Miten vene vietiin kosken ohi ennen kanavia?',
        'Mitä tapahtuu maisemalle, kun tekoallas nousee sen päälle?',
        'Miksi joki putoaa juuri tietyissä kohdissa jyrkästi?',
      ],
      /*
       * 48,18333333 N / 35,18888889 E — en-Wikipedia "Dnieper rapids",
       * prop=coordinates (haettu 30.8.2026). Sama kaava kuin edellä.
       */
      paikka: {
        nimi: 'Dneprin kosket',
        laudat: {
          maailmankartta: { x: 7006.3, y: 1468.4 },
          europe: { x: 886.8, y: 626.4 },
        },
      },
    },
    {
      /*
       * MIKSI SOFIAN MOSAIIKIT: isoisä näki kaupungin kultaisina
       * kupoleina ulkoa päin. Sisällä ei ollut mitään kultaista
       * nähtävänä — ja se on tämän noston kärki.
       *
       * FAKTAT (en-Wikipedia "Saint Sophia Cathedral, Kyiv", osiot
       * "Interior decoration", "Mosaics" ja "Frescoes"; haettu
       * 30.8.2026):
       *   - kirkossa on maailman suurin säilynyt 1000-luvun alkupuolen
       *     mosaiikki- ja freskokokonaisuus: mosaiikkia 260
       *     neliömetriä, freskoa 3 000 neliömetriä;
       *   - mosaiikit ja freskot oli kalkittu umpeen vuoteen 1701
       *     mennessä;
       *   - freskot löysi uudelleen taidehistorioitsija Fedor Solntsev
       *     vuosien 1843–1853 korjaustöissä, ja ne maalattiin luvan
       *     saatuaan öljyväreillä yli;
       *   - mosaiikit löysi uudelleen ja tutki taidehistorioitsija ja
       *     arkeologi Adrian Prahov vuonna 1884, mistä alkoi niiden
       *     entistäminen;
       *   - smaltin latomistavasta päätellen seinämosaiikkeja teki
       *     kahdeksan hengen ryhmä; jokaisella mosaiikilla on
       *     keskiaikaisella kreikalla kirjoitettu selitys;
       *   - pohja on kultainen, päävärit sinistä, harmaanvalkoista ja
       *     purppuraa; värien määrä kertoo lasimestarien taidosta,
       *     eivätkä nykytutkijat ole pystyneet toistamaan sävyjä;
       *   - keskusapsidia ja koko sisätilaa hallitsee kuusimetrinen
       *     rukoileva Neitsyt, Oranta; kupolin laessa on Kristus
       *     Pantokrator ja sen ympärillä neljä arkkienkeliä, joista
       *     yksi on ehjä ja kolme maalasi öljyväreillä yli Mihail
       *     Vrubel vuonna 1884;
       *   - tornien freskoissa on maallisia aiheita, joita oli
       *     tarkoitettu vain harvojen nähtäviksi: hoviaiheita,
       *     metsästystä, soittajia, akrobaatteja ja tanssijoita — ja
       *     eteläisessä tornissa ainoa tunnettu urkukuva koko Kiovan
       *     Rusin taiteessa.
       *
       * MITÄ EI KERROTA: kirkon ryöstöt ja piiritykset, joita lähde
       * luettelee. Sotasisältöä ei kirjoiteta (tarinakaari, luku 2).
       *
       * PÄÄLLEKKÄISYYS LEHDEN KANSSA ON TARKISTETTU: kaupunkilehden oma
       * Sofia-nosto kertoo seinien 7 000 raapustuksesta ja maalehden
       * Menovinkit linkittää virtuaalikierrokseen. Kumpikaan ei kerro
       * mosaiikeista, kalkituksesta eikä siitä, mitä seinillä oli
       * isoisän aikaan näkyvissä.
       */
      id: 'sofian-mosaiikit',
      nimio: 'Sofian mosaiikit',
      otsikko: 'Kun isoisäsi kävi kaupungissa, maailman suurin varhainen '
        + 'mosaiikkikokoelma oli kalkittu piiloon',
      lunastus: [
        'Pyhän Sofian katedraalin seinillä on jotain, mitä ei ole '
          + 'missään muualla samassa mitassa: 1000-luvun alkupuolen '
          + 'mosaiikkia 260 neliömetriä ja freskoa kolmetuhatta '
          + 'neliömetriä, samasta vuosisadasta kuin talo itse. Pohja on '
          + 'kultainen, päävärit sinistä, harmaanvalkoista ja purppuraa, '
          + 'ja sävyjä on niin monta, ettei niitä ole pystytty '
          + 'toistamaan nykykeinoin. Smaltin latomistavasta on '
          + 'päätelty, että seinät teki kahdeksan miehen ryhmä, ja '
          + 'jokaisen kuvan vieressä on selitys keskiaikaisella kreikalla. '
          + 'Keskusapsidia hallitsee kuusimetrinen rukoileva Neitsyt, '
          + 'jota sanotaan Orantaksi, ja kupolin laesta katsoo alas '
          + 'Kristus neljän arkkienkelin ympäröimänä.',
        'Isoisäsi ei nähnyt niistä yhtäkään. Koko sisustus oli kalkittu '
          + 'umpeen vuoteen 1701 mennessä, ja valkoista se oli vielä '
          + 'silloin kun hän seisoi kaupungissa. Freskot olivat kyllä '
          + 'tulleet esiin vuosien 1843–1853 korjauksissa, mutta ne '
          + 'maalattiin luvan kanssa öljyväreillä yli. Mosaiikit löysi '
          + 'uudelleen taidehistorioitsija Adrian Prahov vuonna 1884 — '
          + 'yksitoista vuotta liian myöhään yhtä matkustajaa varten. '
          + 'Samana vuonna Mihail Vrubel maalasi öljyllä yli kolme '
          + 'kupolin neljästä arkkienkelistä; yksi jäi koskematta, ja '
          + 'sitä katsomalla näkee, mitä muut olivat. Tornien portaissa '
          + 'on vielä toinen yllätys: siellä aiheet eivät ole pyhiä vaan '
          + 'maallisia — soittajia, akrobaatteja, metsästystä, ja '
          + 'eteläisessä tornissa ainoa tunnettu kuva uruista koko Kiovan '
          + 'Rusin taiteessa.',
      ],
      lahde: 'en-Wikipedia "Saint Sophia Cathedral, Kyiv", osiot Interior '
        + 'decoration, Mosaics ja Frescoes; tarkistettu 30.8.2026.',
      /*
       * Commons 30.8.2026: 3131×4324, public domain, 1000-luku, kuvaus
       * kertoo mosaiikin korkeudeksi 6 metriä ja arvioi siihen menneen
       * noin kaksi miljoonaa palaa. Restrictions tyhjä. SILMÄTARKISTUS
       * TEHTY (960 px): mosaiikki apsidissa, ei valokuvattuja ihmisiä.
       */
      kuva: {
        tiedosto: 'Oranta-Kyiv.jpg',
        selite: 'Oranta eli rukoileva Neitsyt on kuusi metriä korkea ja '
          + 'täyttää Pyhän Sofian keskusapsidin kultaisella pohjallaan.',
        lahde: 'Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirkon seinät kalkittiin umpeen?',
        'Miten kalkin alle jäänyt mosaiikki saadaan esiin ehjänä?',
        'Miksi nykytutkijat eivät osaa toistaa vanhoja lasivärejä?',
      ],
      /*
       * PAIKKAA EI OLE, JA SE ON TIETOINEN VALINTA: katedraali on
       * Kiovassa eli kaupungissa, jossa pelaaja jo seisoo (50,4528 N /
       * 30,5144 E antaisi käytännössä laatan oman paikan). Ilman
       * `paikka`-kenttää piste ottaa paikakseen kaupungin ja hakeutuu
       * lähimmän kohdesymbolin päälle (nostonPaikka, js/fokusnosto-
       * symbolit.js) — juuri se varapolku, jota varten kenttä on
       * valinnainen.
       */
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: hetmani Polubotokin kultakätkö (js/packs/paikallisaarteet.js,
   * UKR). Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta), samaan matkakirjakorttiin kuin
   * saapumismerkintä.
   */
  aarremerkinta: {
    teksti: 'Vanha kirjuri kertoi hetmanista, joka vei aikoinaan '
      + 'tynnyrillisen kultaa turvaan vieraan maan pankkiin ja kuoli '
      + 'vankilassa kertomatta kuittia kenellekään. Suku on hakenut sitä '
      + 'siitä asti. Pankki ei myönnä eikä kiellä — ja juuri niin, sanoi '
      + 'kirjuri, tekee pankki jolla on jotain holvissaan.',
  },
};
