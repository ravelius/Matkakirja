/*
 * EDINBURGHIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-lontoo.js:lle ja -tukholma.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4A kaanonpaketti):
 * matkakirjan paikkarivi ja teksti, Livian kuplateksti sekä
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamiaan — niitä
 * ei ole lyhennetty, järjestetty uusiksi eikä täydennetty. Luenta on
 * sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Skotlannin kruununkalleudet (aarremerkintä). GBR:n
 * paikallisaarrepari on jo Lontoon käytössä (kuningas Juhanan
 * jalokivet, js/packs/fokusvirta-lontoo.js), joten Edinburghin
 * merkintä viittaa kruunuun, joka muurattiin arkkuun ja löytyi vasta
 * 1818 omasta linnastaan. Tämä paketti EI kerro sitä tarinaa
 * uudestaan missään muussa kentässä: kaanonteksti hoitaa sen yksin,
 * eikä yksikään täky, oppitunti tai täkynosto koske kruunuun.
 *
 * LIVIALLE EI OLE KIRJOITETTU YHTÄÄN UUTTA RIVIÄ. Kupla on muissa
 * kaupungeissa kaksiosainen (`maadoitus` + `teksti`), ja aallon 4A
 * kaanonissa Livian teksti tekee molemmat työt kerralla: se kuittaa
 * isoisän merkinnän ja vie eteenpäin. Kaanonteksti on siksi JAETTU
 * kahteen kenttään virkkeen rajaa pitkin sanoja muuttamatta (ks. oma
 * kommenttinsa `pollo`-kentän kohdalla) — uutta Livian repliikkiä ei
 * kirjoiteta tänne, sillä hahmon ääni on päätoimittajan kynässä.
 *
 * FAKTAPOHJA. Aallon 4A maille EI ole takynostot-työaineistoa, ja
 * Edinburghille ei ollut valmista faktapohjaa lainkaan, joten täyt,
 * oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Edinburghin kaupunkilehden omat
 *      kategoriat ja nostot (js/packs/kulttuuri-kategoriat.js,
 *      edinburgh: 'kaupunki' ja 'tiede') sekä kaupungin kulttuurivisa
 *      (js/packs/europe-kulttuuri.js). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden kuvat.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei
 *      ole, on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu
 *      KAHDESTA riippumattomasta lähteestä. Ne on nimetty kunkin
 *      kohdan omassa kommentissa. Mitään ei ole päätelty eikä
 *      pyöristetty.
 *
 * PÄÄLLEKKÄISYYS LEHDEN KANSSA ON RAJATTU KAHTEEN LEHTITEHTÄVÄÄN.
 * Kumpikin nimetty minitehtävä on kaupunkilehden omaa, jo hyväksyttyä
 * aineistoa (Simpsonin kloroformi-ilta sivulta 2, linnankallion kaivo
 * sivulta 1) — juuri niin kuin Lontoossa ja Tukholmassa. TÄYT eivät
 * sen sijaan kertaa lehden juttuja lainkaan: kaikki kolme ovat uutta,
 * lehteen kuulumatonta aineistoa, ja siihen on tässä kaupungissa
 * erityinen syy — aarrekysymyksen vastaus kaivetaan oppitunnista, ja
 * lehden sivut ovat pelaajan käsissä samaan aikaan.
 *
 * ── KOHDENOSTOJA EI OLE (tietoinen valinta) ────────────────────────
 *
 * `kohteet`-kenttä jää pois. Britannian kohdeluettelo
 * (js/packs/fokuskohteet-gbr.js) sisältää kolme kohdetta, ja kaikki
 * kolme ovat Lontoosta: St Paulin katedraali, Crystal Palace ja vanha
 * London Bridge. Yksikään ei ole Edinburghista eikä Skotlannista,
 * joten kohdenosto kääntäisi katseen väärään kaupunkiin. Skotlannin
 * omat kohteet kulkevat tässä paketissa täkynostoina, joilla on oma
 * paikka kartalla (ks. TÄKYNOSTOPOOLI alempana).
 *
 * ── KOHTAAMINEN ON LUONNOS ─────────────────────────────────────────
 *
 * Kohtaamisen teksti on EHDOTUS päätoimittajalle, ei valmis kaanon
 * (ks. oma kommenttinsa kentän kohdalla). Kuvaa siinä ei ole.
 *
 * ── YKSI AJALLINEN HUOMIO PÄÄTOIMITTAJALLE ─────────────────────────
 *
 * Merkinnässä isoisä kirjoittaa elokuussa 1873, että kaupunki pystytti
 * koiralle patsaan. Greyfriars Bobbyn juomakaivo paljastettiin 15.
 * marraskuuta 1873, eli kolme kuukautta myöhemmin; pronssi oli tosin
 * jo valettu, sillä lady Burdett-Coutts tilasi sen ennen koiran
 * kuolemaa. Kaanonia ei ole korjattu eikä sen sanoja ole koskettu:
 * Bobby-täky kertoo päivämäärän suoraan ja tekee kolmen kuukauden
 * erosta oman pienen huomionsa. Jos merkintää halutaan joskus
 * hienosäätää, tieto on täältä.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu.
 * Teksti ja luenta ovat sanasta sanaan samat, joten luennan voi ajaa
 * suoraan (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä). Kaikki ovat PD tai CC, ja tekijä on
 * `lahde`-rivillä. Ihmisiä mahdollisesti sisältävät kuvat on katsottu
 * silmin; havainto on kirjattu kuvan omaan kommenttiin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Kloroformikysymys on Edinburghin lehden
 * sivun 2 ("Tiede") oman noston "Kolme lääkäriä nukahti pöydän alle"
 * tekstiä ja kaivokysymys sivun 1 ("Edinburgh") oman noston "Linna
 * seisoo tulivuoren tulpalla" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI TYKKIKYSYMYSTÄ: kaupungin aarrekysymys koskee yhden lyönnin
 * tykkiä (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'edinburgh'). Jos
 * lehden aarteen avaava tehtävä kysyisi samasta tykistä, kysymys olisi
 * ratkaistu ennen kuin Ewania on tavattu.
 *
 * MIKSI EI DOLLY-KYSYMYSTÄ: Tiede-sivulla on jo oma tehtävänsä
 * kloonilampaan nimestä, ja nimetty tehtävä syrjäyttää sen (js/
 * fokustehtavat.js). Sama kysymys kahdesti samalla sivulla olisi
 * pelaajalle sama kysymys kahdesti — siksi nimetty tehtävä ottaa
 * saman sivun TOISEN noston.
 */
const KLOROFORMI_VISA = {
  kysymys: 'Lääkäri James Young Simpson haisteli ystävineen joka ilta '
    + 'uusia aineita ruokapöytänsä ääressä. Miten koe päättyi 4. '
    + 'marraskuuta 1847?',
  vaihtoehdot: [
    'Kaikki kolme heräsivät aamulla lattialta',
    'Pullo kaatui ja sytytti pöydällä palaneen kynttilän, ja koe keskeytyi',
    'Kukaan seurueesta ei tuntenut koko iltana yhtään mitään',
  ],
  oikea: 0,
  fakta: 'Aine oli kloroformi. Ensin kolmikko tuli hyvälle tuulelle, '
    + 'sitten kaikki kaatuivat, ja Simpson tiesi heti löytäneensä sen, '
    + 'jolla leikkaus ja synnytys voitiin tehdä nukkuvalle potilaalle.',
};

const LINNANKAIVO_VISA = {
  kysymys: 'Edinburghin linnan kallioon hakattiin 34 metriä syvä kaivo. '
    + 'Mikä siinä oli vika?',
  vaihtoehdot: [
    'Se ehtyi juuri piiritysten aikana',
    'Sen vesi maistui suolaiselta merituulen takia',
    'Se jäätyi talvisin pohjaa myöten umpeen',
  ],
  oikea: 0,
  fakta: 'Kallio on tulivuoren kurkku, joka jähmettyi noin 350 miljoonaa '
    + 'vuotta sitten poikkeuksellisen kovaksi. Jäätikkö ei pystynyt '
    + 'sille vaan kaivoi maan sen ympäriltä ja jätti taakseen pitkän '
    + 'loivan hännän — sitä häntää pitkin laskeutuu Royal Mile, ja '
    + 'siksi linnaan pääsee kävellen vain idästä.',
};

export const FOKUSVIRTA_EDINBURGH = {
  kaupunki: 'edinburgh',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, loppupiste lisätty. */
    paikkarivi: 'Edinburgh, elokuussa 1873.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki kiipeää kalliolle kuin sammal, ja sen yllä istuu '
      + 'linna, jota ei ole koskaan vallattu rynnäköllä — nälällä '
      + 'kylläkin. Vanhassa kaupungissa talot ovat kymmenkerroksisia, '
      + 'köyhät ylhäällä ja rikkaat alhaalla, mikä on nurinkurisin '
      + 'järjestys minkä olen nähnyt. Kirkkomaan portilla makasi pieni '
      + 'koira, jonka sanotaan vartioineen isäntänsä hautaa neljätoista '
      + 'vuotta. Se kuoli viime vuonna. Kaupunki pystytti sille patsaan '
      + 'ennen kuin pystytti sellaisen monelle ihmiselle.',
    /*
     * LUENTA: sama teksti, vain tunnetagit lisätty (Raamattu,
     * luentaprosessi: ruututeksti = luentateksti sanasta sanaan).
     * Kolme tagia, alku ja loppu eri sävyssä.
     */
    luenta: '[curious] Kaupunki kiipeää kalliolle kuin sammal, ja sen '
      + 'yllä istuu linna, jota ei ole koskaan vallattu rynnäköllä — '
      + 'nälällä kylläkin. Vanhassa kaupungissa talot ovat '
      + 'kymmenkerroksisia, köyhät ylhäällä ja rikkaat alhaalla, '
      + 'mikä on nurinkurisin järjestys minkä olen nähnyt. '
      + '[softly] Kirkkomaan portilla makasi pieni koira, jonka sanotaan '
      + 'vartioineen isäntänsä hautaa neljätoista vuotta. Se kuoli viime '
      + 'vuonna. [whispers] Kaupunki pystytti sille patsaan ennen kuin '
      + 'pystytti sellaisen monelle ihmiselle.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANONTEKSTI ON JAETTU KAHTEEN KENTTÄÄN, EI MUUTETTU. Aallon 4A
     * kaanonpaketti antaa Livialle YHDEN tekstin, mutta kortti lukee
     * kaksi kenttää: `maadoitus` piirtyy kuplan ensimmäiseksi
     * kappaleeksi heti isoisän merkinnän perään ja `teksti` sen jälkeen
     * (js/fokusvirta.js piirraPollo). Lisäksi tests/fokusvirta.test.mjs
     * vaatii jokaiselta fokuskaupungilta oman maadoituksen, joka ei ole
     * sama merkkijono kuin huomio.
     *
     * JAKO KULKEE VIRKKEEN RAJAA PITKIN, eikä yhtäkään sanaa,
     * välimerkkiä tai järjestystä ole muutettu: ensimmäiset kaksi
     * virkettä kuittaavat isoisän merkinnän (patsas, valtaamaton
     * linna), loput selittävät nurinkurisen järjestyksen ja vievät
     * eteenpäin. Luettuna peräkkäin teksti on sanasta sanaan
     * kaanonpaketin teksti.
     *
     * PÄÄTOIMITTAJALLE: jos kupla halutaan yhtenä kappaleena,
     * maadoitukseen kirjoitetaan oma repliikkinsä ja koko kaanonteksti
     * palautetaan `teksti`-kenttään yhtenä pötkönä. Kumpikin muoto
     * kelpaa moottorille.
     */
    maadoitus: 'Se pikkukoiran patsas on Edinburghissa edelleen, ja sen '
      + 'kuonoa hierotaan onnen takia niin että se kiiltää.. Linna on '
      + 'yhä valtaamaton, paitsi turistien toimesta.',
    teksti: 'Ja se isoisäsi ihmettelemä järjestys — köyhät ylhäällä — '
      + 'johtui savusta: mitä alempana asuit, sitä vähemmän piippuja '
      + 'savusi sun ikkunan alla. Mennään vanhaan kaupunkiin.',
    /*
     * HEROKUVA on kaupunkilehden avauskarusellin generoitu hero
     * (js/packs/kulttuuri-kategoriat.js, edinburgh/avauskuvat) ja
     * selite on sen oma, sanasta sanaan. Kolmesta herosta on valittu
     * KESKIPÄIVÄ, koska Livian kupla päättyy vanhaan kaupunkiin: St
     * Gilesin kruunutorni seisoo Royal Milen varrella, kun taas
     * aamu-hero on linnasta ja ilta-hero Calton Hillin monumentista.
     */
    kuva: {
      ampari: 'herokoe/hero-edinburgh-keskipaiva.png',
      selite: 'St Gilesin katedraalin kruunutorni on kannatellut kivistä '
        + 'kruunuaan 1400-luvulta asti, ja kirkko on Skotlannin '
        + 'reformaation pääkirkko — John Knox saarnasi täällä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: isoisän merkinnän viimeinen kolmannes on
       * koirasta, joka kuoli "viime vuonna", ja Livia jatkaa siitä
       * kiillotettuun kuonoon. Täky on se, mitä kumpikaan ei kerro:
       * mistä patsas tuli, kuka sen maksoi ja miksi tarinasta
       * kiistellään yhä.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Greyfriars Bobby" (johdanto, osiot
       *     "Traditional view", "John Gray" ja "Dispute over
       *     accuracy"): elinvuodet 4.5.1855–14.1.1872; skyenterrieri
       *     tai dandiedinmontinterrieri; isäntä John Gray haudattiin
       *     Greyfriarsin kirkkomaalle; koiran kerrotaan istuneen
       *     haudalla neljätoista vuotta; vuonna 1867 Edinburghin lord
       *     provost Sir William Chambers maksoi koiraveron ja antoi
       *     koiralle kaulapannan, joka on nykyään Museum of
       *     Edinburghissa; Bobby haudattiin aivan kirkkomaan portin
       *     sisäpuolelle; tarinan paikkansapitävyydestä on kiistelty
       *     toistuvasti, ja kiistan kaksi tunnettua kohtaa ovat kaksi
       *     eri John Grayta (yövartija ja maanviljelijä) sekä Jan
       *     Bondesonin tulkinta, jonka mukaan 1800-luvun Euroopasta
       *     tunnetaan yli kuusikymmentä dokumentoitua hautausmaakoiraa
       *     ja Bobby olisi vaihdettu nuorempaan koiraan 1867.
       *   - en-Wikipedia "Greyfriars Bobby Fountain" (johdanto ja osiot
       *     "History and design" sekä "Rubbing the nose"): graniittinen
       *     suihkulähde, jonka päällä on luonnollisen kokoinen
       *     pronssipatsas; sijaitsee George IV Bridgen eteläpäässä
       *     Greyfriarsin kirkkomaan itäpuolella; paljastettiin 15.
       *     marraskuuta 1873; Edinburghin pienin suojeltu rakennus;
       *     lady Burdett-Coutts tilasi muistomerkin vähän ennen koiran
       *     kuolemaa ja William Brodie veisti pronssin elävästä
       *     mallista; kolmen jalan korkuinen kiillotettu graniittipylväs
       *     ja sen alla juoma-allas sekä kahdeksankulmainen juottokaukalo
       *     maan tasalla; alun perin kaksi pronssimukia ketjussa; veden
       *     tulo katkaistiin 1957 ja monumentti kunnostettiin 1985;
       *     kaupunki kehottaa olemaan hieromatta kuonoa, koska hierominen
       *     kuluttaa sitä.
       *
       * AJALLINEN TARKKUUS: suihkulähde paljastettiin kolme kuukautta
       * isoisän elokuisen käynnin JÄLKEEN, ja täky sanoo sen suoraan
       * eikä korjaa merkintää. Patsas oli tuolloin jo valettu (Brodien
       * työ on vuodelta 1872), joten mitään ristiriitaa faktan kanssa
       * ei jää — vain kolmen kuukauden ero, joka on itsessään hyvä
       * yksityiskohta. PÄÄTOIMITTAJALLE TIEDOKSI, jos merkintää
       * halutaan joskus hienosäätää.
       */
      id: 'bobby',
      nappi: 'Koira, jonka kuono kiillotettiin puhki',
      otsikko: 'Greyfriars Bobby',
      teksti: 'Se koira oli oikea, ja sillä oli nimi: Bobby. Se kuoli 14. '
        + 'tammikuuta 1872, puolitoista vuotta ennen kuin isoisäsi käveli '
        + 'kirkkomaan portista ohi, ja se haudattiin aivan portin '
        + 'sisäpuolelle — ihmisten hautausmaalle. Vuonna 1867 kaupungin '
        + 'pormestari Sir William Chambers oli maksanut sen koiraveron ja '
        + 'antanut sille kaulapannan, joka on nyt kaupunginmuseossa; '
        + 'pannan ansiosta se ei ollut kenenkään silmissä isännätön. '
        + 'Patsas, jonka isoisäsi mainitsee, on '
        + 'oikeastaan juomakaivo: lady Burdett-Coutts tilasi sen vähän '
        + 'ennen koiran kuolemaa, kuvanveistäjä William Brodie veisti '
        + 'pronssin elävästä mallista, ja koko laite paljastettiin 15. '
        + 'marraskuuta 1873 — kolme kuukautta isoisäsi käynnin jälkeen. '
        + 'Hän ehti siis kirjata patsaan, jota ei vielä ollut pystytetty. '
        + 'Ja tässä on se osa, jonka matkailuoppaat kertovat harvemmin: '
        + 'tarinasta on kiistelty koko sen iän. Kaksi eri John Grayta käy '
        + 'isännästä, ja yksi tutkija on laskenut, että 1800-luvun '
        + 'Euroopasta tunnetaan yli kuusikymmentä hautausmaakoiraa — '
        + 'kulkukoiria, joita kävijät ruokkivat niin kauan, että ne '
        + 'jäivät. Vesi kaivosta katkaistiin 1957. Kuono kiiltää, koska '
        + 'sitä hierotaan, ja kaupunki pyytää lakkaamaan, koska '
        + 'hierominen syö pronssia.',
      /*
       * Commons 29.8.2026: 319×426, public domain, National Galleries
       * of Scotland, kuvaus "about 1865 ... Medium: albumen print,
       * Original size: 9.1 x 5.9 cm". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on pelkkä pieni takkuinen terrieri
       * studiopöydällä, ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on valokuva itse koirasta noin
       * kahdeksan vuotta ennen isoisän käyntiä — ei patsaasta, jota
       * hänen aikanaan ei vielä ollut pystyssä.
       */
      kuva: {
        tiedosto: 'Greyfriars Bobby (cropped).jpg',
        selite: 'Bobby noin vuonna 1865 otetussa albumiinivedoksessa. '
          + 'Koira kuoli tammikuussa 1872, ja sen muistoksi pystytetty '
          + 'juomakaivo paljastettiin marraskuussa 1873.',
        lahde: 'National Galleries of Scotland, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Bobbyn pronssipatsas seisoo graniittipylväällä George IV '
          + 'Bridgen päässä. Mitä varten pylväs alun perin pystytettiin?',
        vaihtoehdot: [
          'Juomakaivoksi',
          'Kaasulyhdyn jalustaksi',
          'Kirkkomaan porttipylvääksi',
        ],
        oikea: 0,
        fakta: 'Lady Burdett-Coutts tilasi muistomerkin jo ennen koiran '
          + 'kuolemaa, ja William Brodie veisti pronssin elävästä '
          + 'mallista. Maan tasalla on kahdeksankulmainen juottokaukalo, ja '
          + 'pylvääseen oli ketjutettu kaksi juomamukia. Vesi katkaistiin '
          + 'vuonna 1957.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: koko peli on luettelo kätköistä, joita joku on
       * joskus piilottanut. Tämä on Edinburghin oma kätkö, joka
       * löydettiin, mutta jota kukaan ei ole osannut selittää — aarre
       * ilman aarretta. Sävel on arvoitus, ja se on tarkoituksellinen
       * vastapari Bobby-täyn lämmölle.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Arthur's Seat coffins" (tietolaatikko sekä
       *     osiot "Discovery", "Description", "Dating", "Provenance" ja
       *     "Interpretations"): löytöpäivä 25.6.1836, Arthur's Seatin
       *     koillisrinne; The Scotsmanin mukaan pojat etsivät
       *     kaniininkoloja ja huomasivat aukon, jonka suulla oli kolme
       *     liuskekiveä; kolossa oli seitsemäntoista pikkuarkkua
       *     kolmessa kerroksessa (kahdeksan, kahdeksan ja yksi); arkut
       *     ovat 95–104 mm pitkiä, 18–30 mm leveitä ja 20–26 mm korkeita
       *     ja kukin veistetty yhdestä metsämännyn kappaleesta; kannet
       *     kiinnitetty messinkinauloilla; koristeet ovat tinattua
       *     rautaa, tunnistettu 1700–1800-luvun kenkäsolkien
       *     kiinnikkeiksi; sisällä olevat nuket ovat entisiä
       *     leikkisotilaita, 81–86 mm, osalla ommellut vaatteet; ajoitus
       *     1830-luvulle perustuu ompelulankaan (puuvillalanka syrjäytti
       *     pellavan Skotlannissa noin 1800, ja kolmisäikeinen lanka
       *     ilmestyi vasta 1812); osa arkuista tuhoutui heti, kun pojat
       *     heittelivät niitä toisiaan kohti; kokoelma myytiin
       *     huutokaupassa 1845 eränä 300 hintaan neljä puntaa
       *     kahdeksan shillinkiä; Christina Couper lahjoitti kahdeksan
       *     arkkua Skotlannin kansallismuseoon 1901; selityksiä on
       *     tarjottu useita (noituus, merimiesten sijaishautaus,
       *     saksalais-saksilainen tapa) eikä yksikään ole todistettu.
       *   - Commonsin imageinfo alla olevasta kuvasta (Kim Traynor,
       *     kuvattu 10.4.2011 Chambers Streetillä): samat arkut ovat
       *     Skotlannin kansallismuseon vitriinissä, eli lahjoitus- ja
       *     sijaintitieto vahvistuu toisesta lähteestä.
       *
       * MITÄ EI KERROTA FAKTANA: Menefeen ja Simpsonin tulkinta, jonka
       * mukaan nuket esittäisivät West Portin murhien seitsemäätoista
       * uhria, on lähteessä nimenomaan arvaus, ja Mike Dash on osoittanut
       * siitä aukon (uhreista kaksitoista oli naisia, nuket kaikki
       * miehiä). Se mainitaan siis selityksenä muiden joukossa eikä
       * ratkaisuna, ja väkivalta jää yhteen sivulauseeseen.
       */
      id: 'arkut',
      nappi: 'Seitsemäntoista arkkua kalliokolossa',
      otsikko: 'Arthur’s Seatin pikkuarkut',
      teksti: 'Kesäkuun 25. päivänä 1836 muutama poika etsi kaniininkoloja '
        + 'Arthur’s Seatin koillisrinteeltä ja huomasi kalliossa '
        + 'aukon, jonka suulle oli asetettu kolme liuskekiveä suojaksi '
        + 'säältä. Kivien takana oli kolo, ja kolossa seitsemäntoista '
        + 'pikkuarkkua kolmessa kerroksessa: kahdeksan alimmaisena, '
        + 'kahdeksan keskellä ja yksi ainoa päällimmäisenä. Jokainen '
        + 'arkku on kymmenisen senttiä pitkä ja veistetty yhdestä '
        + 'metsämännyn kappaleesta, kannet on kiinnitetty '
        + 'messinkinauloilla, ja kylkiä koristavat pienet tinatut '
        + 'rautaneliöt, jotka on myöhemmin tunnistettu kenkäsolkien '
        + 'kiinnikkeiksi — arkut on siis tehnyt joku, jolla oli suutarin '
        + 'romua käsillä. Sisällä makaa kussakin puinen nukke, entinen '
        + 'leikkisotilas, kahdeksan sentin mittainen, ja osalle on '
        + 'ommeltu vaatteet. Juuri ompelulanka paljastaa iän: '
        + 'puuvillalanka syrjäytti pellavan Skotlannissa noin vuonna '
        + '1800, ja kolmisäikeinen lanka ilmestyi vasta 1812, joten '
        + 'arkut on pantu kallioon 1830-luvulla. Kukaan ei tiedä miksi. '
        + 'Selityksiä on tarjottu noituudesta merimiesten tapaan jättää '
        + 'itsestään kuva kotiin sen varalta, että meri veisi heidät, ja '
        + 'yksi tunnettu arvaus yhdistää luvun seitsemäntoista '
        + 'kaupungin 1820-luvun lopun rikossarjan uhrien määrään — mutta '
        + 'sekin ontuu, sillä uhreista suurin osa oli naisia ja kaikki '
        + 'nuket ovat miehiä. Pojat itse tuhosivat osan arkuista '
        + 'heittelemällä niitä toisiaan kohti. Kahdeksan on jäljellä, ja '
        + 'ne ovat Skotlannin kansallismuseossa Chambers Streetillä — '
        + 'saman korttelin kulmalla kuin se juomakaivo, jolla koira '
        + 'seisoo.',
      /*
       * Commons 29.8.2026: 640×464, CC BY-SA 2.0, kim traynor, kuvattu
       * 10.4.2011, kuvaus "Arthur's Seat coffins, Chambers Street".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on kolme
       * arkkua kansineen ja nukkeineen museon vitriinissä, ei ihmisiä.
       */
      kuva: {
        tiedosto: "Arthur's Seat coffins, Chambers Street - geograph.org.uk - 2517081 - normalized.jpg",
        selite: 'Pikkuarkkuja nukkeineen Skotlannin kansallismuseossa. '
          + 'Arkkuja oli alun perin seitsemäntoista, ja niistä on '
          + 'jäljellä kahdeksan.',
        lahde: 'Kim Traynor, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Mistä pikkuarkuissa maanneet nuket oli tehty?',
        vaihtoehdot: [
          'Leikkisotilaista',
          'Pähkinänkuorista ja kankaasta',
          'Vahasta, joka oli sittemmin sulanut yhteen',
        ],
        oikea: 0,
        fakta: 'Arkut ajoitettiin 1830-luvulle nukkien vaatteiden '
          + 'ompelulangasta. Kahdeksan seitsemästätoista arkusta on '
          + 'jäljellä, eikä yksikään tarjottu selitys ole toistaiseksi '
          + 'kestänyt tarkastelua.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä mittaa kaiken, ja tämä on Edinburghin
       * mitattavin rakennus — torni, jonka portaat voi laskea. Se on
       * myös hengähdys kahden edellisen jälkeen: ei koiraa, ei arkkuja,
       * vaan mies joka voitti kilpailun väärällä nimellä. Ja se seisoi
       * pystyssä jo 1873, joten isoisä on voinut nousta sen portaat.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Scott Monument" (tietolaatikko sekä osiot
       *     rakenteesta, rakentamisesta ja kilpailusta): korkeus 61,11
       *     metriä eli 200 jalkaa 6 tuumaa; ylimmälle näköalatasanteelle
       *     nousee 287 porrasta; kivi on Binnyn hiekkakiveä
       *     Länsi-Lothianista; maailman toiseksi suurin kirjailijan
       *     muistomerkki Havannan José Martí -monumentin jälkeen;
       *     peruskivi laskettiin 15.8.1840, rakentaminen alkoi 1841 ja
       *     torni valmistui syksyllä 1844, jolloin Kempin poika asetti
       *     huipun paikalleen; kokonaiskustannus runsaat 16 154 puntaa;
       *     vihkiäiset 15.8.1846; monumentissa on 68 patsasta Scottin ja
       *     tämän Maida-koiran lisäksi; kilpailun voitti nimimerkki
       *     "John Morvo", joka osoittautui 45-vuotiaaksi puusepäksi ja
       *     piirtäjäksi George Meikle Kempiksi, ja hän sai urakan 1838;
       *     Kemp putosi Unionin kanavaan kävellessään työmaalta kotiin
       *     sumuisena iltana ja hukkui 6.3.1844; aikalaishavainnon
       *     mukaan kiven hakkaaminen suljetuissa vajoissa altisti
       *     kivipölylle ja tappoi hakkaajia.
       *   - en-Wikipedia "George Meikle Kemp": sama nimimerkki, sama
       *     ammatti, sama kilpailu ja sama kuolinpäivä.
       *
       * MITÄ EI KERROTA FAKTANA: kivipölyyn kuolleiden lukumäärä. Lähde
       * merkitsee sen aikalaisen väitteeksi ("one contemporary observer
       * says"), joten teksti kertoo ilmiön muttei lukua.
       */
      id: 'scott-monumentti',
      nappi: 'Torni, jonka voitti väärä nimi',
      otsikko: 'Scott-monumentti',
      teksti: 'Princes Streetin puistossa seisoo goottilainen torni, joka '
        + 'näyttää kirkolta jolta on unohtunut kirkko: kuusikymmentäyksi '
        + 'metriä korkea, 287 porrasta ylimmälle tasanteelle, 68 pientä '
        + 'kivipatsasta kirjojen henkilöitä. Se on maailman toiseksi '
        + 'suurin kirjailijan muistomerkki, ja isoisäsi olisi voinut '
        + 'nousta sen portaat, sillä torni oli seissyt jo lähes '
        + 'kolmekymmentä vuotta hänen tullessaan. Muistomerkkikilpailu '
        + 'järjestettiin Walter Scottin kuoltua 1832, ja sen voitti '
        + 'ehdotus, jonka lähettäjä oli allekirjoittanut nimellä "John '
        + 'Morvo" — Melrosen luostarin keskiaikaisen rakentajan mukaan. '
        + 'Nimimerkin takana oli 45-vuotias George Meikle Kemp, '
        + 'puuseppä ja piirtäjä ilman arkkitehdin koulutusta, joka '
        + 'pelkäsi että hänen nimensä hylättäisiin heti kuoreen '
        + 'katsomatta. Hän sai urakan 1838, peruskivi laskettiin 15. '
        + 'elokuuta 1840, ja torni valmistui syksyllä 1844. Kemp ei ollut '
        + 'sitä katsomassa. Hän oli kävellyt työmaalta kotiin sumuisena '
        + 'maaliskuun iltana samana vuonna, pudonnut Unionin kanavaan ja '
        + 'hukkunut; huipun asetti paikalleen hänen poikansa. Vihkiäisiä '
        + 'vietettiin 1846, ja hinta oli hieman yli 16 000 puntaa. Kivi '
        + 'tuli Binnyn louhoksesta lännestä, ja se oli niin kovaa, että '
        + 'sen hakkaaminen suljetuissa vajoissa täytti ilman pölyllä — '
        + 'moni hakkaaja sairastui keuhkoistaan, ja aikalaiset '
        + 'kirjoittivat siitä syyttävään sävyyn. Torni on siis '
        + 'kirjailijan muistomerkki, jonka jokainen yksityiskohta '
        + 'muistuttaa jostakusta muusta.',
      /*
       * Commons 29.8.2026: 2472×4465, CC BY-SA 3.0, Daniel Kraft,
       * kuvattu 19.10.2021, kuvaus "The Scott monument in Edinburgh,
       * Scotland, from the east. The statue in front of it is a
       * memorial to David Livingstone." Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on torni, sen holvissa valkoinen
       * Scottin marmoripatsas ja edessä Livingstonen pronssi; taustalla
       * penkeillä muutama tunnistamaton ihminen kaukana. Selite ei väitä
       * etualan patsasta Scottiksi.
       */
      kuva: {
        tiedosto: 'Edinburgh Scott Monument 20211019.jpg',
        selite: 'Scott-monumentti idästä nähtynä. Holvin alla istuu '
          + 'Walter Scottin marmoripatsas; etualan pronssi on '
          + 'tutkimusmatkailija David Livingstonen muistomerkki.',
        lahde: 'Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Scott-monumentin suunnittelukilpailun voitti ehdotus, '
          + 'jonka tekijä käytti salanimeä. Mikä hän oli ammatiltaan?',
        vaihtoehdot: [
          'Kirkkoarkkitehti Lontoosta',
          'Itseoppinut puuseppä',
          'Kaupungin oma maanmittari',
        ],
        oikea: 1,
        fakta: 'George Meikle Kemp oli 45-vuotias puuseppä ja piirtäjä, '
          + 'joka lähetti työnsä nimimerkillä "John Morvo". Torni '
          + 'valmistui syksyllä 1844, mutta hän ei nähnyt sitä: hän oli '
          + 'hukkunut Unionin kanavaan saman vuoden maaliskuussa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, 'edinburgh'): kenelle linnan yhden lyönnin laukaus
   * alun perin ammuttiin. Visasääntö täyttyy — vastaus on tekstissä,
   * mutta kysymyksen eikä oikean vaihtoehdon sanamuoto ei toistu siinä
   * sellaisenaan.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Edinburgh Castle", osio "One O'Clock Gun" (jonne
   *     hakusana One O'Clock Gun ohjaa): tykki ammutaan joka päivä
   *     tasan kello 13 lukuun ottamatta sunnuntaita, pitkäperjantaita
   *     ja joulupäivää; aikamerkki perustettiin 1861 Leithin sataman ja
   *     Forthin lahden laivoille noin kahden mailin päähän; se
   *     täydensi Nelson-monumentin aikapalloa, joka oli sumussa
   *     hyödytön; koska ääni kulkee hitaasti, noin 343 metriä
   *     sekunnissa, vuonna 1861 painettiin kartta, joka näytti milloin
   *     laukaus kuuluu missäkin päin kaupunkia; alkuperäinen tykki oli
   *     18 naulan suustaladattava, jonka lataamiseen tarvittiin neljä
   *     miestä, ja se ammuttiin Half Moon -patterilta; se vaihtui 1913
   *     32 naulan takaaladattavaan ja toukokuussa 1952 25 naulan
   *     haupitsiin; nykyinen tykki otettiin käyttöön 30.11.2001; tykki
   *     ammutaan nykyään Mill's Mountin patterilta linnan
   *     pohjoisrinteellä.
   *   - en-Wikipedia "Nelson Monument, Edinburgh", johdanto ja osio
   *     "Time ball": aikapallo asennettiin torniin 1853 ja se otettiin
   *     käyttöön maaliskuussa 1854 aikamerkiksi Leithin sataman
   *     laivoille ja Leith Roadsin ankkuripaikalle, jotta laivat
   *     saattoivat asettaa kronometrinsä; pallo oli Skotlannin
   *     kuninkaallisen tähtitieteilijän Charles Piazzi Smythin ajatus,
   *     ja sen laukaisi alun perin kaupungin observatorion kello
   *     maanalaisen johdon kautta; koneiston teki Maudslay, Sons &
   *     Field, joka oli tehnyt myös Greenwichin vastaavan; puinen ja
   *     sinkillä päällystetty pallo painoi noin 90 kiloa, ja usein
   *     toistettu 762 kilon luku on Piazzi Smythin liioittelusta
   *     syntynyt myytti; pallo nostetaan juuri ennen yhtä ja pudotetaan
   *     tasan yhdeltä; vuonna 1861 lisättiin tykki kuuluvaksi
   *     merkiksi, kun sumu peitti pallon.
   *
   * KAHDEN LÄHTEEN RISTIRIITA on kirjattu tekstiin sellaisena kuin se
   * on: linna-artikkelin johdantorivi sanoo aikapallon vuodeksi 1852,
   * monumentin oma artikkeli 1853 ja käyttöönotoksi maaliskuun 1854.
   * Teksti seuraa tarkempaa lähdettä (kohteen omaa artikkelia) eikä
   * väitä vuosilukua kiistattomaksi.
   */
  oppitunti: {
    otsikko: 'Yksi laukaus, koko kaupungin kello',
    teksti: 'Merenkulussa tarkka aika ei ollut mukavuus vaan ehto: '
      + 'pituuspiirinsä sai selville vain se laivuri, jonka kronometri '
      + 'kävi oikein, ja kronometri piti asettaa maissa ennen lähtöä. '
      + 'Siksi Calton Hillin Nelson-monumentin mastoon asennettiin '
      + '1850-luvun alussa iso puinen, sinkillä päällystetty pallo, joka '
      + 'nostettiin juuri ennen yhtä ja pudotettiin tasan yhdeltä. Sen '
      + 'keksi Skotlannin kuninkaallinen tähtitieteilijä Charles Piazzi '
      + 'Smyth, ja sen laukaisi kaupungin observatorion kello '
      + 'maanalaista johtoa pitkin. Pallo otettiin käyttöön maaliskuussa '
      + '1854, ja se näkyi Leithin satamaan ja lahdelle ankkuroituneille '
      + 'aluksille asti — paitsi sumulla, jolloin se ei näkynyt yhtään '
      + 'mihinkään, ja sumua on tällä rannikolla runsaasti. Niinpä '
      + 'vuonna 1861 pallon rinnalle otettiin merkki, joka kuuluu '
      + 'silloinkin kun ei näy: tykki. Se ammuttiin linnan Half Moon '
      + '-patterilta, ja alkuperäinen kahdeksantoista naulan '
      + 'suustaladattava vaati neljä miestä latautuakseen. Kahden '
      + 'mailin eli runsaan kolmen kilometrin päähän satamaan ääni ei '
      + 'kuitenkaan ehtinyt hetkessä, sillä ääni matkaa vain noin 343 '
      + 'metriä sekunnissa. Siksi samana '
      + 'vuonna painettiin kartta, joka kertoi kaupunginosa '
      + 'kaupunginosalta, kuinka monta sekuntia laukaus oli myöhässä '
      + 'siellä, missä sen kuuli. Tykki oli siis mittalaite, jonka omaa '
      + 'virhettä kaupunki mittasi erikseen — ja jonka lukema oli '
      + 'tarkoitettu ennen kaikkea niille, jotka lähtivät merelle. '
      + 'Tykki on vaihtunut kolmesti sen jälkeen, viimeksi vuonna 2001, '
      + 'ja se ammutaan yhä joka päivä paitsi sunnuntaisin, '
      + 'pitkäperjantaina ja jouluna. Aikapallo putoaa edelleen samalla '
      + 'sekunnilla — nykyään käsin, tykin mukaan.',
    /*
     * Commons 29.8.2026: 3008×2000, public domain, User:Jcfrye, kuvaus
     * "One O'Clock Gun Firing at Edinburgh Castle on June 25, 2007".
     * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa tykki laukeaa
     * linnan valleilta, taustalla Forthin lahti, tykkimies seisoo
     * kaukaisena hahmona selin — tunnistettavia kasvoja ei ole.
     *
     * MIKSI JUURI TÄMÄ KUVA: siinä näkyy sama asia kuin oppitunnin
     * ytimessä — laukaus ja se vesi, jonne se oli tarkoitettu.
     */
    kuva: {
      tiedosto: 'One OClock Gun.JPG',
      selite: 'Yhden lyönnin tykki laukeaa linnan valleilta. Takana '
        + 'aukeaa Forthin lahti, jonne aikamerkki alun perin '
        + 'tarkoitettiin.',
      lahde: 'Jcfrye, Wikimedia Commons (public domain)',
    },
  },

  /* FABLE KATSELMOI: kohtaamisluonnos */

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * TÄMÄ TEKSTI ON EHDOTUS, EI KAANON. Aallon 4A kaanonpaketti antaa
   * Edinburghille matkakirjan, Livian kuplan ja aarremerkinnän, muttei
   * kohtaamiskorttia, ja tarinatekstit ovat päätoimittajan kynässä
   * (docs/moduulit/tarinakaari.md, työnjako). Luonnos on kirjoitettu
   * Lontoon ja Tukholman kortin mitassa, jotta se voidaan ottaa
   * käyttöön sellaisenaan tai korvata rivillä ilman muita muutoksia.
   *
   * KUVAA EI OLE (omistajan linjaus aallosta 4A: kohtaaminen ilman
   * kuvaa). Kenttä `kuva` puuttuu tarkoituksella.
   *
   * MITÄ LUONNOS EI TEE: se ei toista Ewanin repliikkiä eikä paljasta
   * vastausta. Hahmo, kohtaamiskuva ja VARSINAINEN KYSYMYS ovat
   * tarinakaaren paketissa (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * id 'edinburgh'): tykkimestari Ewan lataa linnan yhden lyönnin tykin
   * joka päivä, kuten isoisänsä ennen häntä, ja kysyy kenelle laukaus
   * alun perin ammuttiin. Tämä kortti vain esittelee miehen.
   *
   * VARALLISUUSSÄÄNTÖ TARKISTETTU: isoisä ei maksa mitään eikä käske
   * sukua mihinkään. Ewanin suvun syy jatkaa on ammattiylpeys ja
   * sekunnin mittainen erimielisyys, joka jäi kesken.
   *
   * VIHJEOSIO: kaupunkilehden osion id (js/packs/kulttuuri-
   * kategoriat.js). Edinburghin lehdessä on kaksi osiota, 'kaupunki'
   * ("Edinburgh") ja 'tiede' ("Tiede"). Ewanin kysymys koskee aikaa ja
   * merta, ja lähin tuki sille on kaupunkiosiossa — se nyökkää
   * suuntaan paljastamatta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Tykkimestari Ewan',
    nappi: 'Tapaa tykkimestari',
    varmistus: 'Haluatko varmasti tavata Ewanin juuri nyt?',
    vihjeOsio: 'kaupunki',
    teksti: 'Ewan tulee vallille kaksikymmentä minuuttia ennen aikaa, '
      + 'koska hänen isoisänsä tuli kaksikymmentäviisi ja hän pitää sitä '
      + 'liioitteluna. Työ on kolme minuuttia pitkä ja sata vuotta '
      + 'vanha: panos sisään, kello silmällä, käsi ylhäällä, ja alas '
      + 'juuri niin että laukaus lähtee sekunnilla eikä sekunnin '
      + 'jälkeen. Hän puhuu vähän ja katsoo enemmän lahdelle kuin '
      + 'katsojiin, jotka odottavat pamausta puhelin ojossa. Suvussa '
      + 'kerrotaan yhä siitä ulkomaalaisesta, joka seisoi vallilla oma '
      + 'kello kädessä ja väitti sen käyvän tarkemmin kuin linnan tykki '
      + '— eikä kukaan ehtinyt todistaa asiaa suuntaan tai toiseen, '
      + 'ennen kuin mies oli mennyt. Ewan ei aio jatkaa sitä riitaa '
      + 'kenen tahansa kanssa. Ensin hän haluaa tietää, ymmärtääkö '
      + 'vieras lainkaan, ketä varten laukaus alun perin ammuttiin.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: EDINBURGHIN LINNA. Kohtaaminen on tykkimestarin
   * kanssa vallilla, ja tykki ammutaan linnan pohjoisrinteen Mill's
   * Mount -patterilta (en-Wikipedia "Edinburgh Castle", osio One
   * O'Clock Gun) — piste osoittaa siis miehen työpaikkaa.
   *
   * 55,94861111 N / −3,20083333 E — en-Wikipedia "Edinburgh Castle",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−3,20083333 − (−175)) mod 360) × (12000/360)
   *                     = 171,79916667 × 33,3333… = 5726,6
   *                   y = (millerY(76) − millerY(55,94861111)) × 12000/2π
   *                     = 1121,5
   *   europe          x = (−3,20083333 + 11) × 19,2 = 149,7
   *                   y = (72 − 55,94861111) × 26,3 = 422,2
   *
   * TARKISTUS LAATTAA VASTEN: Edinburghin laatta on Euroopan laudalla
   * 150 / 422 (js/packs/europe.js) ja maailmankartalla 5727,1 / 1121,3,
   * eli piste osuu käytännössä laatan päälle. Niin pitääkin — linna on
   * kaupungin keskellä. Piirtopuoli hoitaa erotuksen itse: alle 14
   * yksikön päässä laatasta piste siirretään koilliseen
   * (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Edinburghin linnan valli',
    laudat: {
      maailmankartta: { x: 5726.6, y: 1121.5 },
      europe: { x: 149.7, y: 422.2 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Edinburghin sivupino (js/
   * lehti.js rakennaSivut) on Lontoon mittainen, koska kaupungilla on
   * kaksi kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Edinburgh", 2 = Tiede, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Dollyn nimi) väistyy nimetyn tieltä, joten
   * sivulla on Raamatun vaatima yksi minitehtävä eikä kahta. Sivun 1
   * kysymys on Edinburghin kulttuurivisa Fringe-festivaalista
   * (js/packs/europe-kulttuuri.js), jonka js/fokustehtavat.js pukee
   * samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: KLOROFORMI_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: LINNANKAIVO_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Skotlanti) ----------
   *
   * NELJÄ NOSTOA, NELJÄ ERI KOLKKAA. js/fokusnosto.js nostoMaanPooli
   * lukee kaupungin oman `takynostot`-kentän ENNEN maapoolia, joten
   * Edinburghissa näkyvät nämä neljä. Britannia ei ole NOSTO_MAAT
   * -taulussa, ja Lontoolla on oma yhden noston poolinsa (Sutton Hoo,
   * js/packs/fokusvirta-lontoo.js) — kaupungit eivät siis jaa poolia.
   * PÄÄTOIMITTAJALLE TIEDOKSI: jos GBR halutaan joskus yhdeksi
   * pooliksi, se tehdään NOSTO_MAAT-rivillä, ei kopioimalla nostoja
   * tiedostosta toiseen.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Kärjeksi on valittu Skara Brae, koska se on koko
   * pelin idea pienoiskoossa — luettelo kätköistä, jonka myrsky avasi.
   *
   * PAIKAT OVAT KAUKANA TOISISTAAN JA KAUPUNGISTA (sama sääntö kuin
   * Kreikan poolissa: "eikä kaksi pistettä osu samaan paikkaan").
   * Orkney pohjoisessa, Ulko-Hebridit lännessä, Sisä-Hebridit
   * lounaassa ja Bell Rock idässä merellä. Forth-siltaa harkittiin
   * viidenneksi, mutta se osuisi Euroopan laudalla neljän yksikön
   * päähän Edinburghin laatasta eli käytännössä kaupungin päälle.
   *
   * LOISTOAIKAKUVIA EI VIELÄ OLE. Aallon 2 nostoilla pääkuva on repon
   * oma generoitu havainnekuva; tämän erän kuvia ei ole generoitu,
   * joten pääkuvana on tarkistettu Commons-kuva. Kahdella nostolla se
   * on aikalaiskuva (Turnerin akvarelli 1819, photochrom 1890-luvulta),
   * mikä ajaa saman asian kuin loistoaikakuva.
   *
   * KOORDINAATIT: sama kaava ja samat vakiot kuin kohtaamispisteellä
   * yllä; lähtöarvot prop=coordinates-kyselystä 29.8.2026.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Skara Brae" (tietolaatikko sekä osiot
       *     löytymisestä, rakennuksista ja ajoituksesta): kivinen
       *     neoliittinen kylä Skaillin lahden rannalla Orkneyn
       *     Mainlandilla; talvella 1850 Skotlantiin iskenyt ankara
       *     myrsky, joka aiheutti laajaa tuhoa ja yli kahdensadan
       *     ihmisen kuoleman, riisui mullan ison epäsäännöllisen kummun
       *     päältä, ja kyläläiset löysivät katottomien talojen ääriviivat;
       *     Skaill Housen William Graham Watt, paikallisen lairdin poika
       *     ja itseoppinut geologi, aloitti kaivauksen, mutta työ
       *     lopetettiin neljän talon jälkeen 1868; paikka ryöstettiin
       *     yhden viikonlopun aikana 1913; uusi myrsky vei osan yhdestä
       *     talosta 1924, minkä jälkeen Edinburghin yliopiston
       *     professori V. Gordon Childe aloitti tutkimukset 1927; taloja
       *     ja käytäviä on näkyvissä kymmenen ja neljä; jokaisessa
       *     talossa on keskellä liesi, vuoteet sen molemmin puolin ja
       *     ovea vastapäätä kivinen hylly; asutus alkoi noin 3180 eaa.
       *     ja jatkui noin 2500 eaa. asti; se on Euroopan ehjin
       *     neoliittinen kylä.
       *   - en-Wikipedia "Heart of Neolithic Orkney": Unesco julisti
       *     kohteet maailmanperinnöksi 2.12.1999, ja Skara Brae on yksi
       *     neljästä; kuvateksti nimeää sen Euroopan ehjimmäksi
       *     neoliittiseksi kyläksi.
       *
       * MIKSI TÄMÄ NOSTO: aarremerkintä puhuu kätköstä, joka unohtui
       * niin perusteellisesti, että se löytyi vasta sadan vuoden
       * päästä. Tämä on saman maan äärimmäinen versio — kylä, joka
       * unohtui neljäksituhanneksi vuodeksi ja jonka avasi sää eikä
       * ihminen. Ajoitus osuu myös isoisän matkan viereen: kaivaukset
       * olivat pysähtyneet viisi vuotta ennen hänen tuloaan.
       */
      id: 'skara-brae',
      nimio: 'Skara Brae',
      otsikko: 'Myrsky riisui hiekan kummun päältä, ja alta tuli esiin '
        + 'kylä, jonka viimeinen asukas lähti neljätuhatta vuotta sitten',
      lunastus: [
        'Talvella 1850 Skotlantiin iski myrsky, joka tappoi yli kaksisataa '
          + 'ihmistä ja repi rannikkoa auki. Orkneyn Mainlandilla, '
          + 'Skaillin lahden rannalla, se riisui mullan ison '
          + 'epäsäännöllisen kummun päältä, ja kun sää tyyntyi, kyläläiset '
          + 'löysivät hiekasta katottomien kivitalojen ääriviivat. '
          + 'Skaill Housen William Graham Watt, lairdin poika ja '
          + 'itseoppinut geologi, alkoi kaivaa. Neljä taloa tuli esiin, ja '
          + 'sitten työ jäi kesken vuonna 1868 — viisi vuotta ennen kuin '
          + 'isoisäsi käveli Edinburghin katuja.',
        'Paikka sai olla rauhassa vuoteen 1913, jolloin joukko lapioita '
          + 'kantavia miehiä ryösti sitä yhden viikonlopun ajan, eikä '
          + 'kukaan tiedä mitä he veivät. Vuonna 1924 uusi myrsky vei '
          + 'osan yhdestä talosta, ja silloin ymmärrettiin, että kohde on '
          + 'suojattava ja tutkittava kunnolla. Työ annettiin Edinburghin '
          + 'yliopiston professorille V. Gordon Childelle, joka saapui '
          + 'ensi kerran 1927. Näkyvissä on nyt kymmenen rakennusta ja '
          + 'neljä käytävää. Jokaisessa talossa on sama järjestys: liesi '
          + 'keskellä, vuoteet molemmin puolin ja ovea vastapäätä kivinen '
          + 'hylly, joka on ensimmäinen asia jonka sisääntulija näkee. '
          + 'Kylässä asuttiin noin vuodesta 3180 eaa. noin vuoteen 2500 '
          + 'eaa., ja se on Euroopan ehjin neoliittinen kylä. Unesco '
          + 'liitti sen maailmanperintöluetteloon 2. joulukuuta 1999.',
      ],
      lahde: 'en-Wikipedia "Skara Brae", johdanto sekä osiot löytymisestä, '
        + 'rakennuksista ja ajoituksesta, ja en-Wikipedia "Heart of '
        + 'Neolithic Orkney"; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 800×533, CC BY-SA 3.0, Dr. John F. Burka,
       * kuvattu 24.8.2002, kuvaus "Neolithic excavations at Skara Brae
       * on Orkney in Scotland". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: kuvassa on yksi kaivettu talo ylhäältä nähtynä, liesi
       * keskellä ja kivikalusteet paikoillaan; ylälaidassa vilahtaa
       * kaukaisia kävijöitä, joista ei erotu kasvoja.
       */
      kuva: {
        tiedosto: 'Orkney Skara Brae.jpg',
        selite: 'Yksi Skara Braen kaivetuista taloista. Keskellä on '
          + 'liesi, ja seinustan kivikalusteet ovat yhä paikoillaan.',
        lahde: 'Dr. John F. Burka, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi Skara Braen talot säilyivät niin hyvin?',
        'Mitä Skara Braen asukkaat söivät?',
        'Miksi kylä hylättiin?',
      ],
      /*
       * 59,0487138 N / −3,3417499 E — en-Wikipedia "Skara Brae",
       * prop=coordinates (haettu 29.8.2026).
       *   maailmankartta  x = 5721,9  y = 972,8
       *   europe          x = 147,0   y = 340,6
       */
      paikka: {
        nimi: 'Skara Brae',
        laudat: {
          maailmankartta: { x: 5721.9, y: 972.8 },
          europe: { x: 147.0, y: 340.6 },
        },
      },
    },
    {
      /*
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Bell Rock Lighthouse" (johdanto ja osiot
       *     nimestä, taustasta ja rakentamisesta): maailman vanhin
       *     säilynyt merenhuuhtoma majakka; rakennettiin 1807–1810
       *     Robert Stevensonin johdolla Bell Rockille eli Inchcapelle,
       *     yksitoista mailia Tayn suulta itään; korkeus 35 metriä ja
       *     valo näkyy 35 mailin päähän; kallio on muutamaa tuntia
       *     lukuun ottamatta veden alla, ja korkealla vedellä sen päällä
       *     on jopa neljä metriä vettä; ennen majakkaa tavallisena
       *     talvena arvioitiin haaksirikkoutuvan kuusi laivaa; Leithin
       *     Trinity Housen mestarit päättivät 1799 rakennuttaa valon;
       *     Stevenson palkkasi 1807 kuusikymmentä miestä, mukaan lukien
       *     sepän, jotta hakut voitiin teroittaa paikan päällä; miehet
       *     asuivat aluksi mailin päässä ankkuroidulla laivalla ja
       *     joutuivat soutamaan kalliolle joka päivä, joten ensimmäinen
       *     työ oli rakentaa jaloilla seisova majakkamaja, jossa oli
       *     tilaa viidelletoista miehelle; toisena kautena kalliolla
       *     ehdittiin tehdä työtä vain kahdeksankymmentä tuntia; kivet
       *     olivat Cairngallin graniittia, niitä käytettiin noin 2500,
       *     ja niitä veti yksi ainoa hevonen, Bassey; legendan mukaan
       *     kallio sai nimensä Arbroathin apotin sinne asettamasta
       *     varoituskellosta, jonka hollantilainen merirosvo varasti
       *     vuotta myöhemmin; hanke ylitti 42 000 punnan arvionsa
       *     puolella.
       *   - en-Wikipedia "Robert Stevenson (civil engineer)": Bell Rock
       *     oli hänen elämäntyönsä tärkein kohde, rakennettu 1807–1810
       *     hänen ollessaan kolmenkymmenen puolivälissä; rakenne
       *     perustui Smeatonin Eddystonen majakkaan; Northern Lighthouse
       *     Board antoi kunnian Stevensonille, kuten historioitsijatkin
       *     sittemmin.
       *
       * MIKSI TÄMÄ NOSTO: oppitunti kertoo, miksi merelle lähtevä
       * tarvitsi tarkan ajan. Tämä kertoo saman rannikon toisen puolen:
       * mitä tapahtui niille, jotka eivät nähneet mitään. Ja se on
       * isoisän mieleen — rakennus, jonka kaikki mitat on pakko tietää.
       */
      id: 'bell-rock',
      nimio: 'Bell Rock',
      otsikko: 'Majakka, jonka perustus on veden alla kaksikymmentä tuntia '
        + 'vuorokaudessa — ja joka on seissyt siinä yli kaksisataa vuotta',
      lunastus: [
        'Yksitoista mailia Tayn suulta itään on kallio, joka ei näy. '
          + 'Muutamaa tuntia päivässä lukuun ottamatta se on juuri veden '
          + 'pinnan alla, ja korkealla vedellä sen päällä on lähes neljä '
          + 'metriä merta. Tavallisena talvena sille arvioitiin murskautuvan '
          + 'kuusi laivaa. Legenda kertoo, että Arbroathin apotti asetti '
          + 'kalliolle varoituskellon 1300-luvulla ja hollantilainen '
          + 'merirosvo varasti sen vuotta myöhemmin; siitä nimi Bell '
          + 'Rock. Leithin Trinity Housen mestarit päättivät 1799, että '
          + 'kalliolle on saatava valo, ja työ annettiin lopulta Robert '
          + 'Stevensonille — saman suvun miehelle, josta polveutuu myös '
          + 'kirjailija Robert Louis Stevenson.',
        'Vuonna 1807 Stevenson palkkasi kuusikymmentä miestä ja otti '
          + 'mukaan sepän, jotta hakut voitiin teroittaa paikan päällä. '
          + 'Aluksi miehet asuivat mailin päässä ankkuroidulla laivalla '
          + 'ja soutivat kalliolle joka aamu, joten ensimmäinen rakennus '
          + 'oli jaloilla seisova maja, jossa nukkui viisitoista miestä '
          + 'meren yllä. Toisena kesänä kalliolla ehdittiin tehdä työtä '
          + 'kaikkiaan kahdeksankymmentä tuntia — muun ajan siellä oli '
          + 'vettä. Kivet hakattiin Cairngallin graniitista, niitä oli '
          + 'noin kaksituhattaviisisataa, ja niitä veti yksi ainoa '
          + 'hevonen nimeltä Bassey. Majakka valmistui 1810, se on '
          + 'kolmekymmentäviisi metriä korkea, ja sen valo näkyy '
          + 'kolmenkymmenenviiden mailin päähän. Se on maailman vanhin '
          + 'säilynyt merenhuuhtoma majakka, ja se seisoo yhä siellä, '
          + 'missä kallio ei näy.',
      ],
      lahde: 'en-Wikipedia "Bell Rock Lighthouse", johdanto sekä osiot '
        + 'nimestä ja rakentamisesta, ja en-Wikipedia "Robert Stevenson '
        + '(civil engineer)"; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 4001×2640, public domain, J. M. W. Turner,
       * päiväys 1819, Google Art Project -digitointi. Restrictions
       * tyhjä. SILMÄTARKISTUS tehty: akvarellissa on majakka aallokossa
       * ja kaukana purjevene, ei tunnistettavia ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on maalattu yhdeksän vuotta majakan
       * valmistumisen jälkeen ja näyttää juuri sen, mitä teksti kuvaa —
       * torni ilman saarta, pelkkää merta ympärillä.
       */
      kuva: {
        tiedosto: 'Joseph Mallord William Turner - Bell Rock Lighthouse - Google Art Project.jpg',
        selite: 'Bell Rockin majakka myrskyssä. J. M. W. Turner maalasi '
          + 'akvarellin 1819, yhdeksän vuotta majakan valmistuttua.',
        lahde: 'J. M. W. Turner 1819, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miten majakka rakennettiin kalliolle, joka on veden alla?',
        'Kuka oli Robert Stevenson?',
        'Miksi juuri Bell Rock oli niin vaarallinen?',
      ],
      /*
       * 56,4342 N / −2,38726667 E — en-Wikipedia "Inchcape" (Bell
       * Rockin oma artikkeli), prop=coordinates (haettu 29.8.2026).
       *   maailmankartta  x = 5753,8  y = 1098,7
       *   europe          x = 165,4   y = 409,4
       */
      paikka: {
        nimi: 'Bell Rock',
        laudat: {
          maailmankartta: { x: 5753.8, y: 1098.7 },
          europe: { x: 165.4, y: 409.4 },
        },
      },
    },
    {
      /*
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "St Kilda, Scotland" (johdanto ja osiot
       *     maantieteestä sekä väestöstä): saaristo 35 meripeninkulmaa
       *     North Uistista länsiluoteeseen, Ulko-Hebridien läntisin
       *     kolkka; suurin saari on Hirta, jonka merikalliot ovat
       *     Britannian korkeimmat; Conachairin pohjoisseinämä on
       *     pystysuoraa kalliota jopa 427 metriä; Stac an Armin ja Stac
       *     Lee ovat Britannian korkeimmat merikarit; saarilla on 1 260
       *     cleitiä eli kivistä kuivausvarastoa Hirtalla ja 170 muilla
       *     saarilla; kaksi vanhaa lammasrotua on säilynyt, neoliittinen
       *     soay ja rautakautinen boreray; saaret ovat suulan, lunnin ja
       *     myrskylinnun pesimäalue; väkiluku ei luultavasti koskaan
       *     ylittänyt 180:tä; vuonna 1852 kolmekymmentäkuusi saarelaista
       *     lähti siirtolaisiksi Australiaan ja heistä kahdeksantoista
       *     kuoli matkalla tai karanteenissa; saaristo on ollut
       *     maailmanperintökohde vuodesta 1986 ja on harvoja kohteita,
       *     joilla on kaksoisstatus sekä luonnon että kulttuurin
       *     perusteella; koko saaristo on National Trust for Scotlandin
       *     omistuksessa.
       *   - en-Wikipedia "Hirta": saarella asuttiin 29. elokuuta 1930
       *     asti, jolloin viimeiset kolmekymmentäkuusi asukasta
       *     siirrettiin mantereelle Lochalineen heidän omasta
       *     pyynnöstään; väkiluku oli 112 vuonna 1851.
       *
       * MIKSI TÄMÄ NOSTO: koko peli kysyy, mitä ihmiset jättävät
       * jälkeensä. Tässä jäi kokonainen kylä, tuhat kaksisataa
       * kivivarastoa ja kaksi lammasrotua — ja lähtö oli asukkaiden oma
       * päätös, ei kenenkään muun.
       *
       * IKÄSOPIVUUS (13+): tyhjennys kerrotaan asukkaiden omana
       * pyyntönä, ei kohtalona, eikä kuolleiden lukuja luetella muualta
       * kuin siirtolaislaivan osalta, jossa se on syy koko myöhempään
       * kehitykseen.
       */
      id: 'st-kilda',
      nimio: 'St Kilda',
      otsikko: 'Kolmekymmentäkuusi ihmistä pyysi itse pois saareltaan, ja '
        + 'jälkeen jäi tuhat kaksisataa kivivarastoa',
      lunastus: [
        'Kolmekymmentäviisi meripeninkulmaa North Uistista länsiluoteeseen '
          + 'on saaristo, jonka kalliot ovat Britannian korkeimmat: '
          + 'Hirtan Conachair putoaa mereen pystysuorana neljäsataa '
          + 'kaksikymmentäseitsemän metriä, ja Stac an Armin ja Stac Lee '
          + 'ovat maan korkeimmat merikarit. Siellä asuttiin kahden '
          + 'vuosituhannen ajan. Väkeä ei luultavasti ollut koskaan '
          + 'enempää kuin satakahdeksankymmentä, eikä puuta ollut lainkaan, '
          + 'joten kaikki rakennettiin kivestä ja ruoka kuivattiin '
          + 'tuulessa: saarilla on tuhat kaksisataakuusikymmentä cleitiä '
          + 'eli kivivarastoa Hirtalla ja sataseitsemänkymmentä muilla '
          + 'saarilla. Elanto tuli merilinnuista — suulista, lunneista ja '
          + 'myrskylinnuista — ja miehet laskeutuivat kallioita köysillä '
          + 'niitä hakemaan.',
        'Väki hupeni vähitellen. Vuonna 1852 kolmekymmentäkuusi '
          + 'saarelaista lähti siirtolaisiksi Australiaan, ja heistä '
          + 'kahdeksantoista kuoli matkalla tai karanteenissa; saari ei '
          + 'toipunut siitä koskaan. Elokuun 29. päivänä 1930 viimeiset '
          + 'kolmekymmentäkuusi asukasta siirrettiin mantereelle '
          + 'Lochalineen — omasta pyynnöstään, koska tarpeeksi monta '
          + 'työkykyistä ei enää ollut jäljellä. Saarille jäivät talot, '
          + 'kivivarastot ja kaksi vanhaa lammasrotua, jotka elävät siellä '
          + 'yhä: neoliittinen soay ja rautakautinen boreray. St Kilda on '
          + 'ollut maailmanperintökohde vuodesta 1986, ja se on yksi '
          + 'harvoista paikoista maailmassa, joka on luettelossa sekä '
          + 'luontonsa että kulttuurinsa vuoksi.',
      ],
      lahde: 'en-Wikipedia "St Kilda, Scotland", johdanto sekä osiot '
        + 'maantieteestä ja väestöstä, ja en-Wikipedia "Hirta"; '
        + 'tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 775×473, CC BY-SA 3.0, käyttäjä Otter,
       * kuvattu 11.6.2009, kuvaus "Village Bay, Hirta, Saint Kilda,
       * Scotland". Restrictions tyhjä. SILMÄTARKISTUS tehty: kuva on
       * otettu rinteeltä alas lahdelle, ja siinä näkyvät kylän talorivi
       * ja merikarit; ihmisiä ei erotu.
       */
      kuva: {
        tiedosto: 'Saint Kilda 20090611 Hirta - Village Bay overview.jpg',
        selite: 'Village Bay Hirtalla. Kylän talorivi ja rinteiden '
          + 'kivivarastot ovat paikoillaan, vaikka asukkaat lähtivät '
          + 'vuonna 1930.',
        lahde: 'Otter, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Mitä cleit tarkoittaa?',
        'Miten St Kildan asukkaat saivat ruokansa?',
        'Miksi saarelta lähdettiin vuonna 1930?',
      ],
      /*
       * 57,815 N / −8,5875 E — en-Wikipedia "St Kilda, Scotland",
       * prop=coordinates (haettu 29.8.2026).
       *   maailmankartta  x = 5547,1  y = 1032,8
       *   europe          x = 46,3    y = 373,1
       */
      paikka: {
        nimi: 'St Kilda',
        laudat: {
          maailmankartta: { x: 5547.1, y: 1032.8 },
          europe: { x: 46.3, y: 373.1 },
        },
      },
    },
    {
      /*
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Fingal's Cave" (johdanto ja osiot geologiasta,
       *     historiasta ja vierailijoista): merikalliolla oleva luola
       *     asumattomalla Staffan saarella Sisä-Hebrideillä, tunnettu
       *     luonnollisesta akustiikastaan; muodostunut kokonaan
       *     kuusikulmaisesti halkeilleesta pylväsbasaltista paleoseenin
       *     laavavirrassa ja rakenteeltaan samanlainen kuin
       *     Pohjois-Irlannin Giant's Causeway; laava jäähtyi ylhäältä ja
       *     alhaalta, kutistui ja halkeili ensin nelikulmaiseen ja
       *     sitten säännölliseen kuusikulmaiseen kuvioon; luolan
       *     englanninkielisen maailman tietoisuuteen toi luonnontutkija
       *     Sir Joseph Banks 1772; nimi tulee James Macphersonin
       *     Ossian-runojen sankarista; luolan täyttää meri, ja
       *     tyynellä säällä murtuneiden pylväiden rivi toimii
       *     kävelytienä vedenpinnan yläpuolella; sisältä katsottuna
       *     aukko kehystää Ionan saaren; Felix Mendelssohn kävi 1829 ja
       *     kirjoitti alkusoiton Hebridit, jonka jälkeen luolasta tuli
       *     matkailukohde; muita 1800-luvun vierailijoita olivat Jules
       *     Verne, William Wordsworth, John Keats, Alfred Tennyson,
       *     J. M. W. Turner (maalasi Staffan 1832) ja kuningatar
       *     Victoria.
       *   - en-Wikipedia "Staffa": saaren nimi tulee muinaisnorjan
       *     pylvästä tarkoittavasta sanasta, koska viikingeistä basaltti
       *     muistutti heidän pystytukeista rakennettuja talojaan; luola
       *     on noin kaksikymmentä metriä korkea ja seitsemänkymmentäviisi
       *     metriä syvä; pylväissä on kolmesta kahdeksaan sivua,
       *     useimmiten kuusi; alkuperäinen gaelinkielinen nimi An Uamh
       *     Bhinn tarkoittaa soivaa luolaa; Mendelssohnin alkusoitto
       *     kantaesitettiin Lontoossa 1832.
       *
       * MIKSI TÄMÄ NOSTO: hengähdys poolin loppuun. Ei kätköä, ei
       * katoamista, ei kuollutta kylää — pelkkä paikka, joka on
       * kuulostanut samalta yhtä kauan kuin se on ollut olemassa. Ja
       * isoisän aikaan tänne tultiin höyrylaivalla joka kesä.
       */
      id: 'fingalin-luola',
      nimio: 'Fingalin luola',
      otsikko: 'Luola, jonka basalttipylväät ovat kuusikulmaisia — ja '
        + 'jonka nimi gaeliksi tarkoittaa soivaa',
      lunastus: [
        'Sisä-Hebrideillä on asumaton saari nimeltä Staffa. Viikingit '
          + 'antoivat sille nimen, joka tarkoittaa pylvästä, koska saaren '
          + 'kylki näytti heidän omilta pystytukista rakennetuilta '
          + 'taloiltaan. Kylki on pylväsbasalttia: paleoseenikautinen '
          + 'laavavirta jäähtyi ylhäältä ja alhaalta, kutisti ja halkesi '
          + 'ensin nelikulmaiseen ja lopulta säännölliseen '
          + 'kuusikulmaiseen kuvioon, ja meri on sittemmin syönyt siitä '
          + 'poikkileikkauksen näkyviin. Sama ilmiö on Pohjois-Irlannin '
          + 'Giant’s Causewaylla. Pylväissä on kolmesta kahdeksaan '
          + 'sivua, useimmiten kuusi.',
        'Saaren eteläkärjessä on merenpinnan tasolle avautuva luola, '
          + 'kaksikymmentä metriä korkea ja seitsemänkymmentäviisi metriä '
          + 'syvä, jonka sisään meri lyö. Gaeliksi se on An Uamh Bhinn, '
          + 'soiva luola, ja se pitää oikeasti ääntä: aallot kaikuvat '
          + 'pylväiden välissä. Luonnontutkija Joseph Banks toi paikan '
          + 'muun maailman tietoon 1772 ja antoi luolalle nimen '
          + 'Macphersonin Ossian-runojen sankarin mukaan. Vuonna 1829 '
          + 'siellä kävi Felix Mendelssohn, joka kirjoitti kuulemastaan '
          + 'alkusoiton Hebridit; se kantaesitettiin Lontoossa 1832, ja '
          + 'sen jälkeen luolaan tultiin höyrylaivalla joka kesä. '
          + 'Kävijöiden joukossa olivat muun muassa Turner, Wordsworth, '
          + 'Keats, Tennyson, Jules Verne ja kuningatar Victoria. '
          + 'Tyynellä säällä murtuneiden pylväiden rivi toimii yhä '
          + 'kävelytienä sisään — ja kun kääntyy takaisin, aukko kehystää '
          + 'Ionan saaren.',
      ],
      lahde: 'en-Wikipedia "Fingal’s Cave", johdanto sekä osiot '
        + 'geologiasta ja vierailijoista, ja en-Wikipedia "Staffa"; '
        + 'tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 3553×2626, public domain, tekijä tuntematon,
       * päiväys "between 1890 and 1905", kuvaus "Fingal's Cave, Island
       * of Staffa, Scotland" (photochrom-vedos). Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on luolan suu, pylväsrivi ja meri,
       * ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on isoisän matkaa lähinnä oleva
       * väritetty kuva paikasta, ja siinä näkyy juuri se pylväsrivi,
       * jota pitkin luolaan kävellään.
       */
      kuva: {
        tiedosto: 'Scotland-Staffa-Fingals-Cave-1900.jpg',
        selite: 'Fingalin luolan suu Staffan saarella. Murtuneiden '
          + 'basalttipylväiden rivi toimii kävelytienä luolaan.',
        lahde: 'Tuntematon tekijä n. 1890–1905, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi basaltti halkeaa kuusikulmaisiksi pylväiksi?',
        'Miltä Fingalin luolassa kuulostaa?',
        'Kuka oli Fingal?',
      ],
      /*
       * 56,43388889 N / −6,33611111 E — en-Wikipedia "Fingal's Cave",
       * prop=coordinates (haettu 29.8.2026).
       *   maailmankartta  x = 5622,1  y = 1098,8
       *   europe          x = 89,5    y = 409,4
       */
      paikka: {
        nimi: 'Fingalin luola',
        laudat: {
          maailmankartta: { x: 5622.1, y: 1098.8 },
          europe: { x: 89.5, y: 409.4 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Skotlannin
   * kruununkalleudet, jotka muurattiin arkkuun ja löytyivät 1818.
   * Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Täällä kerrotaan kruunusta, joka muurattiin arkkuun sodan '
      + 'jaloissa ja unohdettiin niin perusteellisesti, että se löytyi '
      + 'vasta sadan vuoden päästä omasta linnastaan. Kirjailija löysi '
      + 'sen, ei sotilas. Aarni sanoisi: parhaat kätköt eivät ole '
      + 'kaukana — ne ovat paikoissa, joista kaikki luulevat jo '
      + 'tietävänsä kaiken.',
  },
};
