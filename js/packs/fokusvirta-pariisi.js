/*
 * PARIISIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: kruununjalokivien safiiri (aarremerkintä).
 *
 * FAKTAPOHJA täyille: docs/mantereet-tyoaineisto/takyt-pariisi.md,
 * jonka jokainen väite on tarkistettu Wikipedian rajapinnasta
 * artikkeli ja osio kerrallaan (täyt 4, 8 ja 17). Oppitunti käyttää
 * pelin omaa, jo hyväksyttyä Pariisi-aineistoa (js/packs/
 * kulttuuri-kategoriat.js Seine-jakso ja js/packs/maa-kategoriat.js
 * FRA-nosto "Seinen vihreät kirjalaatikot") sekä tarinakaaren omaa
 * faktariviä sanan bouquin merkityksestä (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, pariisi) — se on tarkoitus, koska oppitunnin tehtävä
 * on pohjustaa laattakysymys lehden omalla aineistolla.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Pöllön kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, pariisi/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 28.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions) — ei arvattuja nimiä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Piaf-kysymys on Pariisin lehden sivun 2
 * ("Musiikki") oman noston "Édith Piaf lauloi ensin kadulla" tekstiä
 * ja metrokysymys sivun 1 ("Pariisi") oman noston "Metron sisäänkäynti
 * koottiin palasista" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KIRJALAATIKKOKYSYMYSTÄ: Pariisin laattakysymys
 * (kohtaaminen, ks. alempana) kysyy, mistä Seinen kirjakauppiaiden
 * nimi tulee. Jos lehden aarteen avaava tehtävä kysyisi samoista
 * laatikoista, aarrekysymys olisi ratkaistu ennen kuin Colettea on
 * tavattu.
 */
const PIAF_VISA = {
  kysymys: 'Yökerhon omistaja kuuli Édith Piafin laulavan kadulla '
    + 'vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf. Minkä '
    + 'linnun mukaan?',
  vaihtoehdot: [
    'Varpusen',
    'Kyyhkyn',
    'Satakielen',
  ],
  oikea: 0,
  fakta: 'Piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. '
    + 'Laulaja oli 142 senttiä pitkä, ja tunnetuimman laulunsa La Vie '
    + 'en rose sanat hän kirjoitti itse.',
};

const GUIMARD_VISA = {
  kysymys: 'Pariisin metron valurautaiset sisäänkäynnit suunnitteli '
    + 'Hector Guimard. Miten hän sai työn?',
  vaihtoehdot: [
    'Hän voitti arkkitehtikilpailun ylivoimaisesti',
    'Hän ei ollut edes osallistunut arkkitehtikilpailuun',
    'Hän oli kaupungin oma arkkitehti',
  ],
  oikea: 1,
  fakta: 'Kilpailun 21 ehdotuksesta yksikään ei kelvannut. Guimard '
    + 'piirsi vakio-osia, jotka sopivat yhteen kuin rakennussarja: '
    + 'sisäänkäyntejä tehtiin 167, ja jäljellä olevat 86 rauhoitettiin '
    + 'vuonna 1978.',
};

export const FOKUSVIRTA_PARIISI = {
  kaupunki: 'pariisi',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi on työaineiston
     * mukainen: docs/mantereet-tyoaineisto/takyt-pariisi.md, täky 8
     * ajoittaa isoisän Louvren ohi kulkemisen lokakuulle 1873.
     */
    paikkarivi: 'Pariisi, lokakuussa 1873. Sateen jälkeen kirkasta; '
      + 'kastanjat pudonneet.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Pariisi paikkaa vielä haavojaan: Tuileriat ovat mustana '
      + 'raunioina, mutta bulevardeilla nauretaan jo. Tämä kaupunki '
      + 'nousee aina. Louvren vartija vannoi, että kruununjalokivet '
      + 'ovat tallessa — hänen äänensä sanoi muuta.',
    /*
     * Luenta on sama teksti tunnetagein. Äänite generoidaan tästä
     * kentästä työnkulussa .github/workflows/generoi-luennat.yml
     * (tools/generoi-luennat.mjs pariisi), joka kirjoittaa täsmälleen
     * alla nimetyn tiedoston. Nimi on kirjoitettu etukäteen: kenttä on
     * kytkentä, ja ennen ajoa puuttuva mp3 jättää kaiuttimen vaiti
     * kaatamatta mitään (js/luenta.js playDiaryVoice).
     */
    luenta: '[curious] Pariisi paikkaa vielä haavojaan: Tuileriat ovat '
      + 'mustana raunioina, mutta bulevardeilla nauretaan jo. [warmly] '
      + 'Tämä kaupunki nousee aina. [whispers] Louvren vartija vannoi, '
      + 'että kruununjalokivet ovat tallessa — [softly] hänen äänensä '
      + 'sanoi muuta.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-pariisi.mp3',
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — MYÖNNYTYS (Raamattu, TUURAAJA-KEHYS: kaanon
     * vaatii vähintään yhden kaupungin, jossa isoisä osoittautuu
     * oikeaksi eikä Livia kutista sitä). Pariisi on toinen sellainen
     * Ateenan rinnalle, ja syy on merkinnässä itsessään: *"Tämä
     * kaupunki nousee aina"* on ennuste, jonka historia lunasti.
     *
     * FAKTAKURI: kaksi väitettä, molemmat tarkistettavia ja pelin omaa
     * aineistoa. (1) Eiffel-torni rakennettiin vuoden 1889
     * maailmannäyttelyyn, siis kuusitoista vuotta merkinnän jälkeen.
     * (2) Se oli maailman korkein rakennelma neljän vuosikymmenen ajan
     * (js/packs/kulttuuri-kategoriat.js, pariisin avauskuvan selite).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla, keskellä sanat auki.
     */
    maadoitus: 'Kääk. Nyt minä myönnän jotain, ja tämä sattuu: hän oli '
      + 'oikeassa. Kaupungin keskellä seisoi poltettu palatsi, ja hän '
      + 'kirjoitti silti, että tämä paikka nousee aina. Kuusitoista '
      + 'vuotta myöhemmin samaan kaupunkiin nousi maailman korkein '
      + 'rakennelma, ja se pysyi korkeimpana neljäkymmentä vuotta. Mut '
      + 'älä kerro hänelle, että sanoin näin.',
    /*
     * Huomio viittaa herokuvan kohteeseen (Eiffel-torni). Faktat:
     * torni rakennettiin vuoden 1889 maailmannäyttelyyn väliaikaiseksi
     * (lehden oma avauskuvan selite), rauniot purettiin helmikuun ja
     * syyskuun välillä 1883 eli kymmenen vuotta isoisän käynnin
     * jälkeen (takyt-pariisi.md, täky 8).
     */
    teksti: 'Tuo torni tuolla nousi vuoden 1889 näyttelyyn ja se oli '
      + 'tarkoitettu väliaikaiseksi. Sitä ei purettu. Ne rauniot, jotka '
      + 'isoisäsi näki, purettiin sen sijaan kymmenen vuotta hänen '
      + 'käyntinsä jälkeen. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-pariisi-eiffel.jpg',
      selite: 'Eiffel-torni rakennettiin vuoden 1889 maailmannäyttelyyn '
        + 'väliaikaiseksi, ja siitä tuli maailman korkein rakennelma '
        + 'neljäksi vuosikymmeneksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * Faktat: takyt-pariisi.md, täky 8 (VARMA, en-Wikipedia
       * "Tuileries Palace", osiot "Destruction" ja "Demolition").
       * IKÄSOPIVUUS (13+): sytyttäminen kerrotaan tapahtumana, ei
       * kuvauksena; uhreista lähde ei puhu eikä täky keksi niitä.
       *
       * ── AVAUS KIRJOITETTU UUSIKSI 1.9.2026 (nostojen sisältöaudit) ─
       *
       * Sama palatsi, sama vuoden 1871 palo ja sama piste kartalla oli
       * kahdessa kortissa: tässä ja fokuskohteessa `tuileries`
       * (js/packs/fokuskohteet-fra.js). Kumpaakaan ei poistettu, vaan
       * TYÖNJAKO SELVITETTIIN:
       *
       *   fokuskohde `tuileries` = PALATSI. Mikä se oli: Katariina de
       *     Medicin rakennuttama 1564, 266 metrin julkisivu,
       *     hallitsijoiden koti, ja miten se poltettiin. Ei muutettu —
       *     sen oma kysymysrivi ja kadonneen ihmeen kortti nojaavat
       *     siihen tekstiin.
       *   tämä syvennys = RAUNIO. Se yksitoista vuotta, jotka isoisä
       *     näki, ja se mihin palatsi lopulta hajosi. Palon reseptiä
       *     (petroli, terva, tärpätti, 48 tuntia) ei enää toisteta
       *     täällä, koska se on kohteen kortissa.
       *
       * UUTTA AINEISTOA EI HAETTU MUUALTA: kaikki lisätty on samasta
       * artikkelista, osiot vain luettiin loppuun asti (en-Wikipedia
       * "Tuileries Palace", osiot "Destruction during the Paris
       * Commune", "Demolition" ja "Proposed reconstruction"; haettu
       * 1.9.2026):
       *   - kommunardien polttamia muita muistomerkkejä, kuten
       *     kaupungintalo, rakennettiin uudelleen jo 1870-luvulla;
       *   - purkupäätöksen teki 1882 kolmas tasavalta, joka oli
       *     armahtanut maanpakoon lähteneet kommunardit; vastaan
       *     olivat Georges-Eugène Haussmann ja historioitsijat;
       *   - keskuspaviljongin päätykolmio on Pariisin Square Georges
       *     Cainissa, muita paloja Louvressa, Trocadéron puutarhassa,
       *     Berliinin Schwanenwerderissä, Italian Bordigherassa ja
       *     Quiton Palacio de Carondeletissa;
       *   - huonekalut ja maalaukset oli viety varastoon sodan
       *     alkaessa 1870, ja vuonna 2003 perustettiin komitea, joka
       *     esittää palatsin rakentamista takaisin.
       */
      id: 'tuileriat',
      nappi: 'Palatsi, joka jäi seisomaan poltettuna',
      otsikko: 'Tuileriain rauniot',
      teksti: 'Se rauniorivi, jonka ohi sinä kävelit, olisi voitu '
        + 'korjata. Palo oli vienyt katon ja koko sisustan, mutta '
        + 'kivimuurit seisoivat ehjinä — ja kaupungintalo, jonka '
        + 'kommunardit polttivat niin ikään, rakennettiin uudelleen jo '
        + '1870-luvulla. Tuileriat jäivät sen sijaan paikoilleen '
        + 'Louvren länsipäähän yksitoista vuotta, ja isoisäsi näki '
        + 'tyhjät ikkuna-aukot taivasta vasten. Purkupäätöksen teki '
        + '1882 kolmas tasavalta, sama joka oli armahtanut maanpakoon '
        + 'lähteneet kommunardit; vastaan olivat muun muassa '
        + 'Georges-Eugène Haussmann ja joukko historioitsijoita. Purku '
        + 'alkoi helmikuussa 1883 ja päättyi 30. syyskuuta samana '
        + 'vuonna. Sitten palatsi levisi ympäri maailman: yrittäjä '
        + 'Achille Picart myi kiviä ja marmoria matkamuistoina, ja '
        + 'osista rakennettiin Korsikalle Ajaccion lähelle kokonainen '
        + 'palatsi, Château de la Punta. Keskuspaviljongin päätykolmio '
        + 'seisoo Pariisissa Square Georges Cainissa, ja paloja on '
        + 'Louvressa, Trocadéron puutarhassa, Berliinissä, Italian '
        + 'Bordigherassa ja Quiton presidentinpalatsissa asti. '
        + 'Huonekalut ja maalaukset olivat koko ajan tallessa: ne oli '
        + 'viety varastoon, kun sota alkoi 1870. Vuonna 2003 '
        + 'perustettiin komitea, joka esittää palatsin rakentamista '
        + 'takaisin.',
      /*
       * PÄÄKUVAKSI HAVAINNEKUVA (29.8.2026, aalto 1). Sama malli kuin
       * täkynostoilla v1307:stä alkaen: repon oma generoitu kuva, jolla
       * ei ole Commons-nimeä eikä varareittiä, joten kenttä on `osoite`
       * eikä `tiedosto` (js/fokusvirta.js kuvanOsoite).
       *
       * LÄHDERIVI ON SOVITETTU, KOSKA KUVASSA EI OLE LOISTOAIKAA (sama
       * ratkaisu kuin v1307:n draculalla ja v1312:n Szegedillä):
       * palatsin loisto oli ohi 1871, ja koko täkyn juttu on nimenomaan
       * se, että raunio jäi seisomaan yksitoista vuotta. Kuva on siis
       * se, mitä isoisä näki: katoton kivirunko lauta-aidan takana ja
       * pariisilaisia jatkamassa elämäänsä sen edessä.
       *
       * SILMÄTARKISTUS 29.8.2026: ei tekstiä, ei nykyaikaa; raunio +
       * 1873 asuinen kävelijäjoukko on juuri oikein tähän täkyyn.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-tuileriat-loistoaika.webp',
        selite: 'Tuileriain palatsin palanut runko puutarhan puolelta: '
          + 'katto poissa, kivimuurit ehjät, lauta-aita raunion edessä '
          + 'ja kaupunkilaisia altaan äärellä.',
        lahde: 'Matkakirjan havainnekuva: rauniot isoisän matkavuonna',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 28.8.2026: 3000×2285, CC0, Henri Emile Cimarosa
       * Godefroy, kuvattu 1871–1883, kuvaus "Vue des Tuileries après
       * l'incendie de 1871". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on raunio aidan takana, ei tunnistettavia ihmisiä.
       * Tämä on juuri se näkymä, jonka isoisä näki.
       */
      valokuva: {
        tiedosto: "Vue des Tuileries après l'incendie de 1871, PH83415.jpg",
        selite: 'Tuileriain palatsi palon jälkeen. Valokuva on samalta '
          + 'ajalta, jona rauniot seisoivat kaupungin keskellä.',
        // Tekijän nimi Commonsin omassa muodossa (tools/
        // tarkista-tekijat.mjs vertaa merkintää suoraan siihen).
        lahde: 'Godefroy, Henri Emile Cimarosa, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mihin poltetun palatsin kivet päätyivät purkamisen '
          + 'jälkeen?',
        vaihtoehdot: [
          'Seinen rantamuureihin',
          'Uuden oopperatalon perustuksiin',
          'Matkamuistoiksi ja Korsikalle rakennettuun palatsiin',
        ],
        oikea: 2,
        /*
         * FAKTARIVI PÄIVITETTY 1.9.2026: vanha rivi ("rauniot seisoivat
         * yksitoista vuotta, kunnostaminen olisi ollut mahdollista")
         * toistaa nyt sanasta sanaan syvennystekstin avauksen, koska
         * teksti kirjoitettiin uusiksi juuri siitä näkökulmasta. Tilalla
         * on saman artikkelin osion "Proposed reconstruction" tieto,
         * jota teksti ei sano loppuun asti.
         */
        fakta: 'Uudelleenrakentamista esittävät vetoavat yhä siihen, '
          + 'että suuri osa palatsin alkuperäisistä huonekaluista ja '
          + 'maalauksista on tallella: ne vietiin varastoon, kun sota '
          + 'alkoi 1870, eivätkä ne olleet talossa palon aikaan.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) — ja
       * Livian oman suvun ammatti, joten pöllö saa tässä kuivan
       * ylpeyden hetken samaan tapaan kuin Sofian pöllöpatsaalla.
       * Faktat: takyt-pariisi.md, täky 4 (VARMA, en-Wikipedia "René
       * Dagron" ja "Pigeon post"). Aineiston kielto noudatettu: sama
       * lähde kumoaa väitteen haavoittuneiden kuljettamisesta
       * palloilla, eikä sitä sekoiteta tähän.
       */
      id: 'kyyhkyposti',
      nappi: 'Kyyhkyt, jotka kantoivat kokonaisen kaupungin postin',
      otsikko: 'Piiritetyn Pariisin kyyhkyposti',
      teksti: 'Sallitko, että kerron erään sukuni työsuorituksen. Kun '
        + 'preussilaiset sulkivat Pariisin syyskuussa 1870, viimeiset '
        + 'lennätinlangat katkaistiin 19. päivä ja Seinen pohjassa '
        + 'kulkenut salakaapeli löydettiin ja katkaistiin 27. päivä. '
        + 'Kaupunkiin päin ainoa toimiva reitti oli kirjekyyhky. Kyyhkyt '
        + 'vietiin ulos kuumailmapalloilla, ja valokuvaaja René Dagron '
        + '— mikrofilmin patentin haltija vuodesta 1859 — tarjoutui '
        + 'pienentämään viestit. Sopimus allekirjoitettiin 11. '
        + 'marraskuuta 1870: viisitoista frangia tuhatta merkkiä kohti. '
        + 'Dagron sai kuvat pienenemään yli nelikymmenkertaisesti; yksi '
        + 'filmi painoi noin viisi sadasosagrammaa, ja yksi kyyhky '
        + 'kantoi niitä jopa kaksikymmentä pyrstösulkiin sidotussa '
        + 'putkessa. Perillä filmi asetettiin kahden lasilevyn väliin ja '
        + 'heijastettiin taikalyhdyllä seinälle, josta viestit '
        + 'kirjoitettiin puhtaaksi. Saksalaiset kouluttivat haukkoja '
        + 'pysäyttämään kyyhkyjä. Minulla ei ole tähän mitään '
        + 'lisättävää.',
      /*
       * Commons 28.8.2026: 5047×8008, CC0, René Dagron, kuvattu
       * 1870–1871, kuvaus "Pellicule montée" — Dagronin oma
       * mikrofilmi piiritysajalta. Restrictions tyhjä.
       */
      kuva: {
        tiedosto: 'Pellicule du Journal Pigeons Voyageurs, Souvenir du Siège de Paris, 1870-1871. PH20110 (15 of 20).jpg',
        selite: 'René Dagronin mikrofilmi piiritetystä Pariisista. '
          + 'Filmin koko on noin viisi senttiä kolme senttiä.',
        // Tekijän nimi Commonsin omassa muodossa (ks. yllä).
        lahde: 'Dagron, Prudent René-Patrice, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Miten kokonaisten sanomalehtien verran viestejä '
          + 'saatiin yhden kyyhkyn kannettavaksi?',
        vaihtoehdot: [
          'Ne kirjoitettiin silkkipaperille lyijykynällä',
          'Ne kuvattiin mikrofilmille',
          'Ne lyhennettiin salakielisiksi numeroiksi',
        ],
        oikea: 1,
        fakta: 'Perillä filmi heijastettiin taikalyhdyllä seinälle ja '
          + 'viestit kirjoitettiin puhtaaksi. Saksalaiset yrittivät '
          + 'pysäyttää kyyhkyt koulutetuilla haukoilla.',
      },
    },
    {
      /*
       * Faktat: takyt-pariisi.md, täky 17 (VARMA yhdistyksen
       * perustamisesta ja näyttelystä, en-Wikipedia "Impressionism").
       * Aineiston varaus noudatettu: Nadarin ateljeen KATUOSOITE ei ole
       * lähteessä, joten sitä ei kirjoiteta. Myöskään Nadarin
       * kuumailmapalloja ei yhdistetä tähän, koska sitä yhteyttä ei
       * vahvistettu.
       *
       * MIKSI TÄMÄ TÄKY: isoisän merkintä päättyy Louvren vartijaan, ja
       * juuri Louvren Salon oli se ovi, jonka nämä maalarit kiersivät.
       */
      id: 'impressionistit',
      nappi: 'Kolmekymmentä taiteilijaa, jotka perustivat oman näyttelynsä',
      otsikko: 'Nimi, joka oli alun perin pilkkaa',
      teksti: 'Kun sinä kävelit Pariisissa, ranskalaista taide-elämää '
        + 'hallitsi yhä Salon: sen valitsematta jäänyt maalari jäi '
        + 'näkymättömäksi. Omaa näyttelyä hylätyille oli anottu turhaan '
        + '1867 ja uudelleen 1872. Joulukuussa 1873 — kaksi kuukautta '
        + 'isoisäsi käynnin jälkeen — Monet, Renoir, Pissarro, Sisley, '
        + 'Cézanne, Berthe Morisot, Degas ja joukko muita perustivat '
        + 'oman yhdistyksen esittääkseen työnsä itse, ja jäseneksi '
        + 'liittyvän piti luopua Salonista kokonaan. Ensimmäinen '
        + 'näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin '
        + 'ateljeessa, ja mukana oli kolmekymmentä taiteilijaa. '
        + 'Kriitikko Louis Leroy ivasi Monet’n maalausta Impression, '
        + 'soleil levant ja otsikoi juttunsa "Impressionistien '
        + 'näyttely". Pilkkanimi jäi — ja taiteilijat ottivat sen itse '
        + 'käyttöön.',
      /*
       * Commons 28.8.2026: 5773×4478, public domain, Claude Monet,
       * päiväys 1872. Restrictions tyhjä. Maalaus on siis tehty ennen
       * isoisän matkaa ja asetettiin näytteille vasta sen jälkeen.
       */
      kuva: {
        tiedosto: 'Monet - Impression, Sunrise.jpg',
        selite: 'Claude Monet’n Impression, soleil levant vuodelta '
          + '1872. Kriitikko teki sen nimestä pilkkanimen koko '
          + 'ryhmälle.',
        lahde: 'Claude Monet 1872, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mistä impressionistit saivat nimensä?',
        vaihtoehdot: [
          'Nadarin ateljeen kyltistä',
          'Yhdistyksensä virallisesta nimestä',
          'Kriitikon pilkkaavasta otsikosta',
        ],
        oikea: 2,
        fakta: 'Yhdistyksen oikea nimi oli pitkä ja virallinen. '
          + 'Ensimmäiseen näyttelyyn huhtikuussa 1874 osallistui '
          + 'kolmekymmentä taiteilijaa, ja jokainen heistä oli luvannut '
          + 'pysyä poissa Salonista.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, pariisi: *"Seinen
   * rannalla kirjoja on myyty laatikoista vuosisatoja. Mistä myyjien
   * nimi bukinisti tulee?"* → vanhaa kirjaa tarkoittavasta sanasta).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT ovat pelin omasta, jo hyväksytystä aineistosta:
   * ammattikunta 1500-luvulta, parisensataa kauppiasta ja laatikoiden
   * määrä (js/packs/kulttuuri-kategoriat.js, pariisin Seine-jakso),
   * kahdeksan metrin kaidepätkä, neljän laatikon katto, neljä päivää
   * viikossa, vaunuvihreä maali ja vuoden 2024 peruttu purkupäätös
   * (js/packs/maa-kategoriat.js, FRA "Seinen vihreät kirjalaatikot").
   * Sanan bouquin merkitys on tarinakaaren oma faktarivi.
   */
  oppitunti: {
    otsikko: 'Joki, joka virtaa kahden kirjahyllyn välissä',
    teksti: 'Seinen kaiteisiin on pultattu vihreitä peltilaatikoita, ja '
      + 'niistä myydään käytettyjä kirjoja, vanhoja lehtiä ja '
      + 'julisteita. Ammattikunta on ollut rannoilla 1500-luvulta asti. '
      + 'Kauppiaita on runsaat kaksisataa ja laatikoita lähes '
      + 'yhdeksänsataa kolmen kilometrin matkalla, ja kaupunki päättää '
      + 'säännöt: yksi myyjä saa kahdeksan metriä kaidetta ja enintään '
      + 'neljä laatikkoa, ne on avattava vähintään neljänä päivänä '
      + 'viikossa, ja maali on aina sama vaunuvihreä kuin ensimmäisen '
      + 'metron kylteissä. Kauppiaiden nimi on vanha ja se kertoo, mitä '
      + 'laatikoissa on: ranskan sana bouquin tarkoittaa vanhaa kirjaa. '
      + 'Kesällä 2024 laatikot piti purkaa olympialaisten avajaisten '
      + 'tieltä, mutta päätös peruttiin ja ne saivat jäädä. '
      + 'Myyntipaikat periytyvät jonossa, jota odotetaan vuosia.',
    /*
     * Kuva on pelin omasta Seine-jaksosta (js/packs/
     * kulttuuri-kategoriat.js) eikä uusi tuonti: Commons 28.8.2026
     * 5472×3648, CC BY 2.0, Guilhem Vellut, kuvattu 5.5.2016,
     * Restrictions tyhjä.
     */
    kuva: {
      tiedosto: 'Quai Saint-Michel, Paris 5 May 2016.jpg',
      selite: 'Bukinistien vihreät laatikot Seinen rantamuurilla. '
        + 'Ammattikunta on ollut joen varrella 1500-luvulta asti.',
      lahde: 'Guilhem Vellut, Wikimedia Commons (CC BY 2.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja laattakysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'pariisi'):
   * bukinisti Colette myy vanhoja kirjoja Seinen rannalla samasta
   * laatikosta kuin isoisoisänsä, ja game.actionQuiz esittää hänen
   * kysymyksensä laatalla. Tämä kortti ei kertaa Coletten omaa
   * repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Bukinisti Colette',
    nappi: 'Tapaa bukinisti',
    teksti: 'Coletten laatikot ovat samassa kahdeksan metrin pätkässä '
      + 'kaidetta, jossa hänen sukunsa on seissyt neljä sukupolvea. Hän '
      + 'avaa ne säällä kuin säällä ja tuntee ostajan kädestä: '
      + 'selailija painaa peukalon selkämykseen, ostaja avaa kirjan '
      + 'keskeltä. Matkustajaa hän ei kiirehdi. Ennen kuin hän nostaa '
      + 'kannen kokonaan auki, hän haluaa tietää, tietääkö vieras, '
      + 'millaisia kirjoja hänen ammattinsa nimi lupaa.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: QUAI DE MONTEBELLON KIRJALAATIKOT — Seinen
   * vasemmalla rannalla vastapäätä Île de la Citéä, sama ranta, jonka
   * laatikot ovat pelin omissa kuvissa (js/packs/
   * kulttuuri-kategoriat.js, maa-kategoriat.js).
   *
   * 48,8518329 N / 2,3493746 E — fr-Wikipedia "Quai de Montebello",
   * prop=coordinates (haettu 28.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((2,3493746 − (−175)) mod 360) × (12000/360)
   *                     = 177,3493746 × 33,3333… = 5911,6
   *                   y = (millerY(48,8518329) − millerY(76)) × 12000/2π
   *                     = 1439,8
   *   europe          x = (2,3493746 + 11) × 19,2 = 256,3
   *                   y = (72 − 48,8518329) × 26,3 = 608,8
   *
   * TARKISTUS PARIISIN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 256 / 609, eli piste on sen vieressä. Niin pitääkin — ranta on
   * kaupungin keskellä, ja laudan yksikkö on maailmankartalla noin
   * kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Quai de Montebellon kirjalaatikot',
    laudat: {
      maailmankartta: { x: 5911.6, y: 1439.8 },
      europe: { x: 256.3, y: 608.8 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Pariisin sivupino (js/lehti.js
   * rakennaSivut) on Sofian mittainen: 0 = etusivu, 1 = kaupunkisivu
   * "Pariisi", 2 = Musiikki, 3 = Menovinkit. Sivun 2 oma tehtävä
   * (Djangon asuntovaunun palo) väistyy nimetyn tieltä, joten sivulla
   * on Raamatun vaatima yksi minitehtävä eikä kahta.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: PIAF_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: GUIMARD_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Ranska) ----------
   *
   * SIIRRETTY TÄNNE v1297:n maapoolista (js/fokusnosto.js NOSTO_MAAT,
   * avain FRA) sanasta sanaan: otsikot, lunastukset, lähteet, kuvat,
   * kysymykset ja koordinaatit ovat bitilleen samat, vain sijainti
   * vaihtui. Kahta kopiota ei ole — js/fokusnosto.js lukee FRA-poolin
   * tästä kentästä, jotta Ranskan muut kaupungit (Marseille) näkevät
   * samat täyt kuin ennenkin.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Järjestys on siksi säilytetty muuttumattomana.
   *
   * TEKIJÄTARKISTIN HUOMAUTTAA KIRAHVIKUVASTA, EIKÄ SITÄ KORJATA:
   * tools/tarkista-tekijat.mjs vertaa merkintää Commonsin omaan
   * Artist-kenttään, ja siellä lukee "Nicolas Hüet, the Younger" kun
   * paketissa on suomennos "Nicolas Hüet nuorempi". Sama nimi, eri
   * kieli — ja rivi on siirretty maapoolista sanasta sanaan, joten
   * sitä ei muuteta täällä.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * takynostot-ranska.md, ehdokas 2 (VARMA). Aineiston sanamuoto
       * noudatettu: lähde ei anna toiselle yritykselle kuukautta, joten
       * teksti sanoo "samana vuonna".
       *
       * VALOKUVAA EI OLE. Aineiston ainoa tarkistettu tiedosto on
       * Lustigin pidätyskuva, ja aineisto jättää sen käytön
       * nimenomaisesti päätoimittajan ratkaistavaksi (*"Fablen on
       * päätettävä, sopiiko poliisikuva pelin sävyyn"*). Sitä päätöstä
       * ei tehdä tässä — 28.8.2026 lisätty pääkuva on repon oma
       * havainnekuva eikä koske poliisikuvaan mitenkään, joten tämä
       * nosto jää ainoaksi ilman `valokuva`-kakkoskuvaa.
       */
      id: 'lustig-eiffel',
      nimio: 'Torni romuraudaksi',
      otsikko: 'Mies myi Eiffel-tornin romuraudaksi — ja palasi samana '
        + 'vuonna myymään sen uudelleen',
      lunastus: [
        'Huijari Victor Lustig luki Pariisissa 1925 lehtijutun siitä, kuinka '
          + 'kallista Eiffel-tornin kunnossapito on. Hän palkkasi '
          + 'väärentäjän tekemään valtion kirjelomakkeita, kutsui joukon '
          + 'romukauppiaita luottamukselliseen kokoukseen kalliiseen '
          + 'hotelliin ja esittäytyi posti- ja lennätinministeriön '
          + 'varapääjohtajana: valtio aikoo myydä tornin romuksi, mutta asia '
          + 'on arkaluontoinen eikä siitä saa puhua.',
        'Uhrikseen hän valitsi André Poissonin, joka halusi nousta Pariisin '
          + 'liike-elämän sisäpiiriin, ja sai tältä sekä lahjuksen että '
          + 'kauppasumman — noin 70 000 frangia. Sitten hän pakeni '
          + 'Itävaltaan ja luki lehtiä: Poisson ei ollut ilmoittanut '
          + 'poliisille, koska häpesi. Niinpä Lustig palasi Pariisiin saman '
          + 'vuoden puolella tekemään saman tempun uudestaan. Tällä kertaa '
          + 'joku ilmoitti, ja hän pakeni Yhdysvaltoihin.',
      ],
      lahde: 'en-Wikipedia "Victor Lustig", osio Eiffel-tornin huijauksesta '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-ranska.md, ehdokas 2).',
      /*
       * PÄÄKUVA (28.8.2026, sama malli kuin Sofian areenalla ja
       * v1307:n neljällä nostolla): repon oma generoitu havainnekuva,
       * jolla ei ole Commons-nimeä eikä varareittiä, joten kenttä on
       * `osoite` eikä `tiedosto` (js/fokusnosto.js asetaNostonKuva).
       *
       * Kuva ei esitä tornia vaan HETKEN, jossa se myytiin: hotellin
       * salonki, väärennetyt kirjelomakkeet pöydällä ja torni vain
       * ikkunan takana. Lähderivi sanoo sen itse, jottei kukaan lue
       * kuvaa valokuvaksi tapahtumasta.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-lustig-eiffel-loistoaika.webp',
        selite: 'Hotellin salonki: väärennetyt asiakirjat pöydällä, '
          + 'romukauppiaat kuuntelemassa ja torni ikkunan takana.',
        lahde: 'Matkakirjan havainnekuva: hetki, jona torni myytiin',
      },
      kysymykset: [
        'Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta?',
        'Miksi huijauksen uhri ei ilmoittanut poliisille?',
        'Oliko Eiffel-tornin purkamisesta oikeasti puhetta?',
      ],
      // 48,85822222 N / 2,2945 E — en-Wikipedia "Eiffel Tower".
      paikka: {
        nimi: 'Eiffel-torni',
        laudat: {
          maailmankartta: { x: 5909.8, y: 1439.5 },
          europe: { x: 255.3, y: 608.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-ranska.md, ehdokas 3 (VARMA). Aineiston
       * nimikielto noudatettu: nimeä "Zarafa" ei käytetä, koska se
       * annettiin vasta 1985 — aikalaisten nimi kerrotaan sen sijaan.
       *
       * LÄHETYSVUOTTA EI MAINITA. Aineistossa lukee sekä "lähetti 1827"
       * että "saapui Marseilleen 31.10.1826"; kumpaakaan ei ole
       * muutettu, vaan tekstiin on otettu vain se päivämäärä, jonka
       * lähde antaa täsmällisenä.
       */
      id: 'kirahvin-kavelymatka',
      nimio: 'Kirahvin kävelymatka',
      otsikko: 'Kirahvi käveli 900 kilometriä Marseillesta Pariisiin — '
        + 'takki päällä ja kengät jalassa',
      lunastus: [
        'Egyptin varakuningas lähetti kirahvin Ranskan kuninkaalle '
          + 'Kaarle X:lle. Eläin saapui laivalla Marseilleen 31. lokakuuta '
          + '1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos. '
          + 'Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten '
          + 'päätettiin, että kirahvi kävelee Pariisiin. Luonnontieteilijä '
          + 'Étienne Geoffroy Saint-Hilaire, 55, käveli mukana ja teetti '
          + 'eläimelle kaksiosaisen keltaisen takin ja kengät.',
        'Matka kesti 41 päivää. Lyonissa vastassa oli 30 000 ihmistä, ja '
          + 'Pariisissa kirahvia kävi katsomassa yli 100 000 — joka '
          + 'kahdeksas kaupunkilainen. Hiukset kammattiin torneiksi, '
          + 'kankaisiin ilmestyi täpliä ja väri nimeltä "kirahvin vatsa" myi '
          + 'kaiken. Aikalaiset kutsuivat eläintä nimellä la Belle '
          + 'Africaine, ja se eli Jardin des Plantes\'ssa 18 vuotta.',
      ],
      lahde: 'en-Wikipedia "Zarafa (giraffe)", osiot matkasta ja '
        + 'vastaanotosta (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-ranska.md, ehdokas 3).',
      /*
       * PÄÄKUVAKSI HAVAINNEKUVA (28.8.2026, sama malli kuin yllä):
       * repon oma generoitu kuva, joten kenttä on `osoite` eikä
       * `tiedosto`.
       *
       * Kuva ei esitä paikkaa vaan MATKAA, josta nosto kertoo:
       * kirahvi takki päällä maantiellä, saattue mukana ja kyläläiset
       * tien vierellä. Lähderivi sanoo sen itse.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-kirahvin-kavelymatka-loistoaika.webp',
        selite: 'Kirahvi kävelemässä maantietä takki päällä, saattajat '
          + 'rinnalla ja kyläläiset tien vierellä katsomassa.',
        lahde: 'Matkakirjan havainnekuva: hetki kirahvin kävelymatkalta',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 25.8.2026: 4793×6392, public domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Nicolas Hüet, the Younger - Study of the Giraffe Given to Charles X by the Viceroy of Egypt - Google Art Project.jpg',
        selite: 'Sama kirahvi Nicolas Hüet nuoremman tutkielmassa vuodelta '
          + '1827.',
        lahde: 'Nicolas Hüet nuorempi 1827, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirahvi käveli Marseillesta Pariisiin eikä matkustanut meritse?',
        'Miten eläin selvisi 900 kilometrin kävelystä?',
        'Mitä muuta Jardin des Plantes\'n eläintarhassa oli 1800-luvulla?',
      ],
      // 48,8447 N / 2,3597 E — en-Wikipedia "Ménagerie du Jardin des
      // plantes" (takyt-pariisi.md, täky 2).
      paikka: {
        nimi: 'Jardin des Plantes',
        laudat: {
          maailmankartta: { x: 5912, y: 1440.1 },
          europe: { x: 256.5, y: 609 },
        },
      },
    },
    {
      /*
       * ── SIIRRETTY ESPANJASTA (1.9.2026, nostojen sisältöaudit) ────
       *
       * Tämä nosto asui 29.8.2026 alkaen Sevillan paketissa
       * (js/packs/fokusvirta-sevilla.js) ja oli auditin ainoa
       * vahvistettu väärän maan tarina: jokainen kortin tapahtuma on
       * Pariisissa, ja Sevilla on vain se kaupunki, johon ooppera
       * sijoittuu. Tunnus, Commons-kuva ja aihe ovat samat; TEKSTI ON
       * KIRJOITETTU UUDELLEEN Ranska-kontekstiin, koska kortin
       * näkökulma vaihtui teoksen tapahtumapaikasta sen ensi-illan
       * taloon. Sevilla mainitaan yhä — siinä roolissa, joka sille
       * kuuluu.
       *
       * KOLMANTENA EIKÄ ENSIMMÄISENÄ: poolin kärki on maan kuplatäky
       * (ks. lohkon alku), eikä sitä siirretä uuden rivin takia.
       *
       * FAKTAT (haettu 1.9.2026 en-Wikipedian rajapinnasta artikkeli
       * ja osio kerrallaan):
       *   - "Carmen (opera)", johdanto: kantaesitys Opéra-Comiquessa
       *     Pariisissa 3.3.1875; sopimusten rikkominen järkytti
       *     ensiyleisöä; Bizet kuoli 33. esityksen jälkeen; Pariisissa
       *     teos otettiin uudelleen ohjelmistoon vasta 1883;
       *   - sama artikkeli, osio "Background": talon kaksi johtajaa
       *     riitautuivat teoksesta, ja Adolphe de Leuven vastusti
       *     jyrkästi *"niin uskaliaan tarinan"* esittämistä talossa,
       *     jota hän piti perheteatterina; hänelle luvattiin, että
       *     Carmenin luonnetta pehmennetään, romanihahmot esitetään
       *     koomisina ja lopun kuolema jää kulkueiden, balettien ja
       *     riemufanfaarien varjoon; de Leuven erosi silti
       *     alkuvuodesta 1874. Sävellystyö alkoi tammikuun tienoilla
       *     1873, ja ensimmäinen näytös oli valmis kesään mennessä;
       *   - osio nimiroolin etsimisestä: Marie Roze kieltäytyi
       *     roolista kuultuaan, että hänen olisi kuoltava lavalla;
       *     rooli meni Célestine Galli-Mariélle;
       *   - osio ensi-illasta ja vastaanotosta: salissa olivat mm.
       *     Massenet, Offenbach, Delibes ja Gounod; ensimmäinen näytös
       *     otettiin hyvin vastaan, toreadorin laulun jälkeen tuli
       *     libretisti Halévyn muistiinpanon mukaan "kylmyys" ja
       *     viimeinen näytös oli "jäinen ensimmäisestä viimeiseen";
       *     seuraavan päivän arviot vaihtelivat pettymyksestä raivoon,
       *     ja yksi kriitikko kutsui Galli-Marién tulkintaa "paheen
       *     ruumiillistumaksi"; taloa ei saatu täyteen edes jakamalla
       *     lippuja ilmaiseksi;
       *   - sama osio: Bizet kuoli 3. kesäkuuta 1875 sydäntautiin
       *     36-vuotiaana, hääpäivänsä vuosipäivänä, ja sen illan
       *     esitys peruttiin;
       *   - osio myöhemmästä esityshistoriasta: Wien 1875, Bryssel
       *     1876, Lontoo 1878, New York 23.10.1878 — maine syntyi
       *     Ranskan ulkopuolella;
       *   - "Salle Favart", osio "Background": ensi-illan talo oli
       *     toinen Salle Favart (avattu 16.5.1840), joka paloi
       *     25.5.1887; nykyinen kolmas talo rakennettiin 1893–1898
       *     samalle paikalle Place Boïeldieun varrelle.
       *
       * IKÄSOPIVUUS (13+): oopperan juonen väkivaltaa ei kuvata, vaan
       * kortti kertoo siitä, mitä lavalla tapahtuvasta kuolemasta
       * SANOTTIIN — se on koko skandaalin ydin.
       */
      id: 'carmenin-ensi-ilta',
      nimio: 'Carmenin ensi-ilta',
      otsikko: 'Teatterin johtaja vastusti oopperaa niin kiivaasti, '
        + 'että erosi — ja ensi-illan jälkeen näytti siltä, että hän '
        + 'oli ollut oikeassa',
      lunastus: [
        'Georges Bizet aloitti Carmenin säveltämisen tammikuun tienoilla '
          + '1873, ja ensimmäinen näytös oli valmis siihen kesään '
          + 'mennessä, jona isoisäsi oli matkalla. Sitten työ pysähtyi. '
          + 'Opéra-Comique oli valtion rahoittama talo, johon vietiin '
          + 'perhe, ja sen kahdesta johtajasta Adolphe de Leuven '
          + 'vastusti koko ajatusta: näin uskaliasta tarinaa ei esitetä '
          + 'täällä, yleisö pelästyy pois. Hänelle luvattiin, että '
          + 'nimihenkilön luonnetta pehmennetään, että romanihahmot '
          + 'esitetään koomisina ja että lopun kuolema jää kulkueiden, '
          + 'balettien ja riemufanfaarien varjoon. Lupaukset eivät '
          + 'riittäneet, ja de Leuven erosi teatterista alkuvuodesta '
          + '1874. Nimiroolikin oli vaikea täyttää: Marie Roze '
          + 'kieltäytyi kuultuaan, että hänen olisi kuoltava lavalla.',
        'Ensi-ilta oli 3. maaliskuuta 1875, ja salissa istui puoli '
          + 'musiikki-Pariisia — Massenet, Offenbach, Delibes, Gounod. '
          + 'Ensimmäinen näytös meni hyvin. Toreadorin laulun jälkeen '
          + 'tuli kylmyys, ja viimeinen näytös oli libretisti Halévyn '
          + 'sanoin jäinen ensimmäisestä viimeiseen. Seuraavan päivän '
          + 'arviot vaihtelivat pettymyksestä raivoon: nimihenkilö oli '
          + 'hyveellisen naisen sijaan moraaliton viettelijä, ja yksi '
          + 'kriitikko kutsui pääosan tulkintaa paheen '
          + 'ruumiillistumaksi. Taloa ei saatu täyteen edes jakamalla '
          + 'lippuja ilmaiseksi. Bizet kuoli 3. kesäkuuta 1875, '
          + 'kolmannenkymmenennenkolmannen esityksen jälkeen, '
          + '36-vuotiaana ja hääpäivänsä vuosipäivänä. Maine tuli '
          + 'muualta: Wien 1875, Bryssel 1876, Lontoo ja New York 1878 '
          + '— Pariisiin ooppera palasi vasta 1883. Se sijoittuu '
          + 'Sevillaan, mutta kaikki tämä tapahtui täällä, Place '
          + 'Boïeldieun varrella. Sekin sali paloi 1887; paikalla '
          + 'seisoo nyt kolmas samanniminen teatteri.',
      ],
      lahde: 'en-Wikipedia "Carmen (opera)" (johdanto sekä osiot '
        + 'taustasta, nimiroolin etsimisestä, ensi-illasta ja '
        + 'vastaanotosta sekä myöhemmästä esityshistoriasta), '
        + '"Georges Bizet" (osiot Carmenista sekä sairaudesta ja '
        + 'kuolemasta) ja "Salle Favart" (osio "Background"); '
        + 'tarkistettu 1.9.2026.',
      /*
       * Commons 29.8.2026: 6536×8944, public domain, Prudent-Louis Leray
       * (1820–1879), restaurointi Adam Cuerden, päiväys 1875, kuvaus
       * "1875 lithographic poster for the première of Georges Bizet's
       * Carmen". Restrictions tyhjä. SILMÄTARKISTUS tehty: litografoitu
       * juliste, ei valokuvattuja ihmisiä. Rivi on siirretty Sevillan
       * paketista sanasta sanaan.
       */
      kuva: {
        tiedosto: "Prudent-Louis Leray - Poster for the première of Georges Bizet's Carmen.jpg",
        selite: 'Prudent-Louis Lerayn litografia on Carmenin ensi-illan '
          + 'juliste vuodelta 1875 — samasta esityksestä, jonka '
          + 'säveltäjä uskoi epäonnistuneen.',
        lahde: 'Prudent-Louis Leray 1875, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi Opéra-Comiquen johto piti Carmenia sopimattomana?',
        'Miten ooppera nousi epäonnistumisesta maailmanmaineeseen?',
        'Millainen oopperatalo Opéra-Comique oli 1870-luvulla?',
      ],
      /*
       * OMAT KOORDINAATIT, JOTTA MERKKI ON OIKEASSA MAASSA JA MAAN VOI
       * YHÄ POLTTAA. Espanjassa nostolla ei ollut `paikka`-kenttää
       * lainkaan, joten merkki seurasi pelaajaa kaupungista toiseen
       * (js/fokusnosto.js nostonPaikka) — juuri se vika, jonka audit
       * nosti esiin.
       *
       * 48,8709 N / 2,3378 E — en-Wikipedia "Salle Favart",
       * prop=coordinates (haettu 1.9.2026). Piste on TONTTI eikä
       * rakennus: ensi-illan talo paloi 1887, ja nykyinen kolmas
       * Salle Favart seisoo samalla paikalla, joten koordinaatti on
       * oikea kummallekin. Sama kaava ja samat vakiot kuin muillakin
       * nostoilla (js/fokusnosto.js, PAIKKA LAUDALLA): maailmankartta
       * Millerin lieriönä, europe tasavälinä.
       */
      paikka: {
        nimi: 'Opéra-Comique',
        laudat: {
          maailmankartta: { x: 5911.3, y: 1439 },
          europe: { x: 256.1, y: 608.3 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: kruununjalokivien
   * safiiri.
   */
  aarremerkinta: {
    teksti: 'Näin kruunun safiirin lasin läpi ja piirsin sen ääriviivat '
      + 'luetteloon. Vartija katsoi minua niin pitkään, että jätin '
      + 'lyijykynänkin taskuun ja tulin ulos hitaasti kuin syytön mies.',
  },
};
