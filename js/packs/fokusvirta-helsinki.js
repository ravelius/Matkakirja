/*
 * HELSINGIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-lontoo.js:lle ja
 * -tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa — niitä
 * ei ole lyhennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Ivalojoen kultahippu (aarremerkintä). Sama pari on
 * kirjattu maan paikallisaarteisiin (js/packs/paikallisaarteet.js, FIN),
 * jotta löytökortissa lukee sama nimi kuin merkinnässä.
 *
 * FAKTAPOHJA. Aallon 3 maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Suomen maalehden nostot
 *      (js/packs/maa-kategoriat.js, FIN/arki ja FIN/savel) ja Helsingin
 *      kaupunkilehden omat nostot (js/packs/kulttuuri-kategoriat.js,
 *      helsinki). Nämä on jo kertaalleen tarkistettu ja hyväksytty
 *      peliin — myös niiden KUVAT, jotka tämä paketti lainaa
 *      sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Kaikki kolme täkyä ovat SUOMEN
 * maalehden puolelta (sauna, kantele, Finlandia); kaupunkilehden omiin
 * sivuihin — niihin, jotka pelaaja lukee samassa kulussa — ei ole
 * päällekkäisyyttä lainkaan.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, helsinki/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu.
 * Teksti ja luenta ovat sanasta sanaan samat, joten luennan voi ajaa
 * suoraan (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Majakkakysymys on Helsingin lehden sivun 2
 * ("Historia") oman noston "Linnoituksen majakka vilkuttaa H-kirjainta"
 * tekstiä ja kivimieskysymys sivun 1 ("Helsinki") oman noston "Aseman
 * kivimiehet ovat neljä kertaa sama mies" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI SAARIKYSYMYSTÄ: kaupungin laattakysymys kysyy, kuinka
 * monelle saarelle Suomenlinna rakennettiin (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, helsinki). Jos lehden aarteen avaava tehtävä kysyisi
 * samasta, kysymys olisi ratkaistu ennen kuin Aino on tavattu — vaikka
 * majakka onkin samassa linnoituksessa, se on eri kysymys.
 */
const MAJAKKA_VISA = {
  kysymys: 'Suomenlinnan kirkontornin majakka välähtää neljä lyhyttä '
    + 'kertaa. Mitä se tarkoittaa?',
  vaihtoehdot: [
    'Se on morseaakkosten H niin kuin Helsinki',
    'Se laskee tunnit keskiyöhön',
    'Se varoittaa neljästä karista',
  ],
  oikea: 0,
  fakta: 'Suomenlinna on Unescon maailmanperintökohde vuodesta 1991 ja '
    + 'samalla tavallinen kaupunginosa: lautta Kauppatorilta kuuluu '
    + 'joukkoliikenteeseen ja kulkee ympäri vuoden.',
};

const KIVIMIES_VISA = {
  kysymys: 'Helsingin päärautatieaseman pääovea vartioi neljä '
    + 'graniittimiestä pallolamppu käsissään. Mitä niistä on kerrottu?',
  vaihtoehdot: [
    'Kaikki neljä tehtiin saman kipsimallin mukaan, joten ne ovat sama mies',
    'Jokainen esittää eri vuodenaikaa',
    'Ne veistettiin neljästä eri kivilajista',
  ],
  oikea: 0,
  fakta: 'Emil Wikström veisti miehet vuonna 1914 Eliel Saarisen '
    + 'piirtämään asemaan. VR:n mainoskampanja teki hahmoista 2000-luvulla '
    + 'Kivimiehet, ja niille on puettu jääkiekkomaajoukkueen pelipaidat, '
    + 'kasvomaskit ja Käärijän vihreä bolero.',
};

export const FOKUSVIRTA_HELSINKI = {
  kaupunki: 'helsinki',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Se seuraa merkinnän omaa
     * havaintopaikkaa — laivan kannelta katsottu kaupunki ja satama,
     * jossa tervaa lastataan.
     */
    paikkarivi: 'Helsingfors, kesällä 1873. Tulin mereltä, ja kaupunki '
      + 'näytti isommalta kuin se maalta katsottuna on.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Helsingfors näyttää mereltä suuremmalta kuin maalta, ja '
      + 'valkoinen kirkko seisoo kukkulallaan kuin keisarin allekirjoitus. '
      + 'Satamassa tuoksui terva — sitä lastattiin laivoihin kuin kultaa, '
      + 'ja tavallaan se sitä olikin.',
    luenta: '[curious] Helsingfors näyttää mereltä suuremmalta kuin maalta, '
      + 'ja valkoinen kirkko seisoo kukkulallaan kuin keisarin '
      + 'allekirjoitus. [softly] Satamassa tuoksui terva — sitä lastattiin '
      + 'laivoihin kuin kultaa, [whispers] ja tavallaan se sitä olikin.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä ei ole synkkä vaan tarkka:
     * isoisä tekee havainnon ja päättää sen oikein ("tavallaan se sitä
     * olikin"). Livia asettuu havainnon puolelle ja lisää siihen sen
     * puolen, jota isoisä ei laivan kannelta voinut nähdä.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1) Terva oli
     * pitkään Suomen tärkein tai toiseksi tärkein vientitavara
     * (fi-Wikipedia "Terva", johdanto ja osio Historia). (2) Vuoteen 1765
     * asti pohjalaisten oli vietävä tervansa Tukholmaan, koska
     * tervakauppa oli Tukholman porvarien yksinoikeus (sama artikkeli,
     * osio Historia; en-Wikipedia "Tar" ei kata tätä, joten toinen lähde
     * on fi-Wikipedian "Oulu", osio kaupungin historiasta ja
     * tervakaupasta). (3) Kirkko oli isoisän aikaan nimeltään
     * Nikolainkirkko ja valmistui 1852 (pelidata: js/packs/
     * kulttuuri-kategoriat.js, helsinki/avauskuvat ja saman lehden vanha
     * photochrom-kuvateksti).
     *
     * ISOISÄ OSOITTAUTUU OIKEAKSI: hän sanoi tervasta "tavallaan se sitä
     * olikin", ja Livia vahvistaa sen luvuilla.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kato", "mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kato, siinä isoisäsi oli oikeassa, ja enemmän kuin hän '
      + 'tiesi. Terva oli pitkään Suomen tärkein vientitavara, ja koko '
      + 'Pohjanmaan vauraus rakennettiin sen päälle. Vielä kaksisataa '
      + 'vuotta ennen hänen käyntiään pohjalaisten oli pakko viedä '
      + 'tervansa Tukholmaan, koska tervakauppa oli siellä muutaman '
      + 'porvarin yksinoikeus — se purettiin vasta vuonna 1765. Ja se '
      + 'valkoinen kirkko oli hänen käydessään nimeltään Nikolainkirkko; '
      + 'nykyään se on tuomiokirkko, ja sama torni näkyy mereltä yhä '
      + 'ensimmäisenä. Mut se tervan tuoksu on kyllä poissa.',
    /*
     * Huomio viittaa herokuvan kohteeseen (tuomiokirkko Senaatintorilla)
     * — juuri se valkoinen kirkko, jonka isoisä näki mereltä. Faktat ovat
     * lehden oman avauskuvan selitteestä (js/packs/kulttuuri-kategoriat.js,
     * helsinki/avauskuvat): Carl Ludvig Engelin piirtämä kirkko valmistui
     * 1852 ja siitä tuli merelle näkyvä tunnus jo purjelaivojen aikana.
     */
    teksti: 'Katso ensin tonne ylös kukkulalle. Se valkoinen kirkko on Carl '
      + 'Ludvig Engelin piirtämä, se valmistui 1852 — kaksikymmentäyksi '
      + 'vuotta ennen isoisäsi käyntiä — ja siitä tuli merelle näkyvä '
      + 'Helsingin tunnus jo purjelaivojen aikana. Se on siis rakennettu '
      + 'nimenomaan katsottavaksi kaukaa, ja juuri siksi kaupunki näyttää '
      + 'mereltä suuremmalta kuin maalta. Koko torin sommitelma on saman '
      + 'miehen käsialaa: kirkko, yliopisto ja senaatintalo yhtenä '
      + 'kuvana.',
    kuva: {
      ampari: 'herokoe/hero-helsinki-senaatintori.jpg',
      selite: 'Carl Ludvig Engelin piirtämä Tuomiokirkko valmistui 1852, ja '
        + 'siitä tuli merelle näkyvä Helsingin tunnus jo purjelaivojen '
        + 'aikana.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkintä on tuoksusta ja lämmöstä
       * satamassa. Tämä on saman maan toinen tuoksu ja lämpö — ja se ei
       * ole kadonnut minnekään.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, FIN/arki, nostot "Kolme
       * miljoonaa saunaa" ja "Jäähän mennään löylyn jälkeen" (jo
       * hyväksyttyä pelidataa) — noin kolme miljoonaa saunaa ja 5,6
       * miljoonaa asukasta, Unesco 2020, Kallion yleiset saunat, kadulle
       * jäähtymään; avanto sahataan neliöksi, vesi nollan ja neljän
       * asteen välillä, uinti harvoin minuuttia pidempi, harrastajia yli
       * satatuhatta.
       *
       * LISÄTIETO (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä): Kotiharjun sauna avattiin 1928 ja on
       * Helsingin viimeinen alkuperäisessä käytössä säilynyt
       * puulämmitteinen yleinen sauna. Lähteinä pelin oma, jo hyväksytty
       * kuvateksti (js/packs/maa-kategoriat.js, FIN) ja fi-Wikipedian
       * artikkeli "Kotiharjun sauna", jotka kertovat saman.
       */
      id: 'sauna',
      nappi: 'Kolme miljoonaa saunaa ja avanto perässä',
      otsikko: 'Löyly ja avanto',
      teksti: 'Suomessa on noin kolme miljoonaa saunaa ja 5,6 miljoonaa '
        + 'asukasta — löylyt kuuluvat kerrostaloasuntoonkin, ja luku '
        + 'tarkoittaa käytännössä sitä, että saunoja on enemmän kuin '
        + 'autoja. Unesco lisäsi suomalaisen saunomisen ihmiskunnan '
        + 'aineettoman kulttuuriperinnön luetteloon vuonna 2020. '
        + 'Helsingin Kalliossa on yhä yleisiä saunoja, joihin ostetaan '
        + 'lippu kuin elokuviin ja joissa istutaan vieretysten '
        + 'tuntemattomien kanssa; vanhin niistä, Kotiharjun sauna, '
        + 'avattiin 1928 ja on kaupungin viimeinen alkuperäisessä '
        + 'käytössä säilynyt puulämmitteinen yleinen sauna. Löylyn '
        + 'jälkeen mennään kadulle jäähtymään pyyhe päällä, kesät '
        + 'talvet. Talvella osa menee pidemmälle: jäähän sahataan '
        + 'neliön muotoinen aukko, avanto, ja siihen laskeudutaan '
        + 'portaita pitkin. Vesi on silloin nollan ja neljän asteen '
        + 'välillä, ja uinti kestää harvoin minuuttia kauempaa — '
        + 'tarkoitus ei ole uida vaan kääntyä ympäri ja nousta ylös. '
        + 'Harrastajia on yli satatuhatta.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto FIN/arki,
       * js/packs/maa-kategoriat.js). Commons 29.8.2026: CC BY-SA 4.0,
       * Paasikivi. SILMÄTARKISTUS tehty: saunarakennuksen julkisivu
       * kadulta, ei tunnistettavia kasvoja.
       */
      kuva: {
        tiedosto: 'Kotiharjun yleinen sauna (Kotiharju public sauna in Helsinki) Helsingin Torkkelinmäellä Kalliossa 01.jpg',
        selite: 'Vuonna 1928 avattu Kotiharjun sauna on Helsingin viimeinen '
          + 'alkuperäisessä käytössä säilynyt puulämmitteinen yleinen '
          + 'sauna.',
        lahde: 'Paasikivi, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Milloin suomalainen saunomiskulttuuri lisättiin Unescon '
          + 'aineettoman kulttuuriperinnön luetteloon?',
        vaihtoehdot: [
          'Vuonna 2020',
          'Vuonna 1928',
          'Vuonna 1991',
        ],
        oikea: 0,
        fakta: 'Saunoja on noin kolme miljoonaa ja asukkaita 5,6 miljoonaa. '
          + 'Avannossa vesi on nollan ja neljän asteen välillä, ja uinti '
          + 'kestää harvoin minuuttia kauempaa.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) — tai
       * ainakin sen lähin sukulainen: soitin, jonka runo sanoo syntyneen
       * kalasta ja hevosesta.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, FIN/savel, nosto "Soitin,
       * joka syntyi kalasta" (jo hyväksyttyä pelidataa) — puinen
       * kaikukoppa ja pingotetut kielet, sormin näppäillen, Kalevalan
       * Väinämöinen ja hauen leukaluu, hevosen jouhet, vanhimmissa viisi
       * kieltä yhdestä puukappaleesta, konserttikanteleessa 39 kieltä ja
       * vivut, viisikielinen kouluissa.
       *
       * LISÄTIETO (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä): kantele kuuluu Baltian psalttereiden
       * perheeseen yhdessä viron kandlen, latvian kokleen ja liettuan
       * kanklėsin kanssa. Lähteinä pelin oma, jo hyväksytty kuvateksti
       * (js/packs/maa-kategoriat.js, FIN) ja fi-Wikipedian artikkeli
       * "Kantele", jotka kertovat saman.
       */
      id: 'kantele',
      nappi: 'Soitin, joka runon mukaan tehtiin hauen leukaluusta',
      otsikko: 'Kantele',
      teksti: 'Kantele on Suomen vanhin oma soitin: puinen kaikukoppa, '
        + 'jonka yli on pingotettu kieliä, ja jota soitetaan sormin '
        + 'näppäillen. Kalevalan mukaan Väinämöinen teki ensimmäisen '
        + 'kanteleen hauen leukaluusta ja kielet hevosen jouhista — se on '
        + 'runoa eikä arkeologiaa, mutta se kertoo, mitä soittimesta '
        + 'ajateltiin: että se on tehty siitä, mitä on. Vanhimmissa '
        + 'kanteleissa oli viisi kieltä ja ne veistettiin yhdestä '
        + 'puukappaleesta. Nykyisessä konserttikanteleessa on 39 kieltä '
        + 'ja vipuja, joilla sävelkorkeutta muutetaan kesken soiton, ja '
        + 'pienintä viisikielistä opetellaan kouluissa. Soitin ei '
        + 'myöskään ole yksin: se kuuluu Baltian psalttereiden perheeseen '
        + 'yhdessä viron kandlen, latvian kokleen ja liettuan kanklėsin '
        + 'kanssa. Meren toisella puolella soi siis sama soitin toisella '
        + 'nimellä.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto FIN/savel).
       * Commons 29.8.2026: CC BY-SA 4.0, R.o.t. SILMÄTARKISTUS tehty:
       * soittaja kanteleen ääressä, julkinen esiintymistilanne.
       */
      kuva: {
        tiedosto: 'Musician Rauno Esa Nieminen with Saarijärven kantele (Saarijärvi zither).jpg',
        selite: 'Kantele kuuluu Baltian psalttereiden perheeseen yhdessä '
          + 'viron kandlen, latvian kokleen ja liettuan kanklėsin kanssa.',
        lahde: 'R.o.t, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Montako kieltä on nykyisessä konserttikanteleessa?',
        vaihtoehdot: [
          '39',
          '5',
          '88',
        ],
        oikea: 0,
        fakta: 'Vanhimmissa kanteleissa oli viisi kieltä ja ne veistettiin '
          + 'yhdestä puukappaleesta. Konserttikanteleessa on lisäksi '
          + 'vipuja, joilla sävelkorkeutta muutetaan kesken soiton.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä kirjoittaa keisarin allekirjoituksesta
       * kukkulalla. Tämä on sama vuosisata toisesta suunnasta — teos,
       * joka piti nimetä uudelleen, jotta sen sai soittaa.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, FIN/savel, nosto "Teos, jota
       * soitettiin salanimillä" (jo hyväksyttyä pelidataa) — marraskuu
       * 1899, sanomalehtien juhla vastalauseeksi sortotoimille,
       * Ruotsalainen teatteri, kuvaelmia Suomen historiasta, Sibelius
       * johti viimeisen osan nimeltä Suomi herää, vaihtuvat nimet,
       * Impromptu, nimi Finlandia vasta 1900, kesto noin kahdeksan
       * minuuttia.
       *
       * LISÄTIETO (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä): Sibelius eli vuosina 1865–1957, ja
       * hänen musiikkinsa vahvisti kansallista identiteettiä
       * venäläistämiskausien aikana. Lähteinä pelin oma, jo hyväksytty
       * kuvateksti (js/packs/maa-kategoriat.js, FIN) ja fi-Wikipedian
       * artikkeli "Jean Sibelius", jotka kertovat saman.
       *
       * AIKASUHDE SANOTAAN ÄÄNEEN: tämä tapahtui 26 vuotta isoisän
       * käynnin JÄLKEEN, eli hän ei voinut sitä nähdä.
       */
      id: 'finlandia',
      nappi: 'Teos, jota soitettiin väärillä nimillä',
      otsikko: 'Finlandia',
      teksti: 'Isoisäsi näki kukkulalla keisarin allekirjoituksen. '
        + 'Kaksikymmentäkuusi vuotta hänen käyntinsä jälkeen samassa '
        + 'kaupungissa tehtiin allekirjoitus toiseen suuntaan. '
        + 'Marraskuussa 1899 Helsingissä järjestettiin sanomalehtien juhla '
        + 'vastalauseeksi Venäjän sortotoimille. Ruotsalaisessa teatterissa '
        + 'esitettiin kuvaelmia Suomen historiasta, ja Jean Sibelius johti '
        + 'itse viimeisen osan, jonka nimi oli Suomi herää. Se kiihotti '
        + 'kuulijoita niin, että kappaletta soitettiin sen jälkeen '
        + 'vaihtuvilla nimillä — yksi niistä oli pelkkä Impromptu, joka '
        + 'tarkoittaa suunnilleen "jotain, mitä nyt sattui syntymään". '
        + 'Nimen Finlandia teos sai vasta vuonna 1900. Se kestää noin '
        + 'kahdeksan minuuttia, ja siinä ajassa se ehti tehdä sen, mitä '
        + 'yksikään puhe ei olisi saanut tehdä ääneen.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto FIN/savel).
       * Commons 29.8.2026: public domain. SILMÄTARKISTUS tehty:
       * aikalaisvalokuva säveltäjästä pianon ääressä.
       */
      kuva: {
        tiedosto: 'Jean-Sibelius-at-the-piano.jpg',
        selite: 'Jean Sibelius (1865–1957) on Suomen tunnetuin säveltäjä, '
          + 'ja hänen musiikkinsa vahvisti kansallista identiteettiä '
          + 'venäläistämiskausien aikana.',
        lahde: 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi Finlandiaa soitettiin ensimmäisinä vuosinaan '
          + 'vaihtuvilla nimillä?',
        vaihtoehdot: [
          'Teos oli kiihottava, ja nimen vaihtaminen kiersi kiellot',
          'Säveltäjä ei osannut päättää nimeä',
          'Jokainen orkesteri sai keksiä teokselle oman nimensä',
        ],
        oikea: 0,
        fakta: 'Teos syntyi marraskuussa 1899 sanomalehtien juhlaan '
          + 'vastalauseeksi sortotoimille, ja sen alkuperäinen nimi oli '
          + 'Suomi herää. Nimen Finlandia se sai vasta vuonna 1900.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, helsinki): kuinka monelle saarelle Suomenlinna
   * rakennettiin. Visasääntö täyttyy — vastaus on tekstissä, mutta
   * kysymyksen sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT: js/packs/kulttuuri-kategoriat.js, helsinki/historia, nosto
   * "Linnoituksen majakka vilkuttaa H-kirjainta" (jo hyväksyttyä
   * pelidataa) — rakentaminen alkoi 1748 Augustin Ehrensvärdin
   * johdolla, kuusi saarta, nimi Viapori vuoteen 1918, Unescon
   * maailmanperintökohde 1991, lautta osana joukkoliikennettä.
   *
   * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
   * riippumattomasta lähteestä):
   *   - fi-Wikipedia "Suomenlinna" (johdanto ja osiot rakentamisesta ja
   *     nimestä): linnoitus rakennettiin Ruotsin vallan aikana Venäjän
   *     uhkaa vastaan; ruotsinkielinen nimi oli Sveaborg ja suomeksi
   *     Viapori; linnoitus antautui Venäjälle 1808 Suomen sodassa
   *     taistelutta; nimi Suomenlinna otettiin käyttöön 1918; saarilla on
   *     nykyään noin 800 asukasta ja se on Helsingin kaupunginosa.
   *   - en-Wikipedia "Suomenlinna" (johdanto ja Unesco-tieto): sama
   *     rakentamisvuosi 1748, sama Ehrensvärd, sama antautuminen 1808,
   *     ja kohde on ollut Unescon maailmanperintöluettelossa vuodesta
   *     1991.
   *
   * IKÄSOPIVUUS (13+): antautuminen kerrotaan tosiasiana ja sen
   * merkitys avataan, koska juuri se on kohteen kiinnostavin kohta.
   */
  oppitunti: {
    otsikko: 'Linnoitus, joka ei koskaan taistellut',
    teksti: 'Se kaupunki, joka näytti isoisällesi mereltä suuremmalta kuin '
      + 'maalta, on rakennettu meren ehdoilla — ja sen edustalla on syy. '
      + 'Ruotsi alkoi vuonna 1748 rakentaa Helsingin edustan saarille '
      + 'merilinnoitusta Augustin Ehrensvärdin johdolla. Se levittäytyi '
      + 'kuudelle saarelle: muurit, tykit ja kuivatelakka yhtenä '
      + 'järjestelmänä, joka oli tarkoitettu suojaamaan koko valtakunnan '
      + 'itäistä puolta. Ruotsiksi paikka oli Sveaborg, suomeksi Viapori. '
      + 'Rakentaminen kesti vuosikymmeniä ja maksoi enemmän kuin oli '
      + 'suunniteltu, ja sitten tapahtui se, mitä yksikään piirustus ei '
      + 'ollut ottanut huomioon: vuoden 1808 sodassa linnoitus antautui '
      + 'Venäjälle taistelutta. Suurin puolustuslaitos, jonka Ruotsi '
      + 'koskaan rakensi, vaihtoi omistajaa ilman piiritystä. Nimi vaihtui '
      + 'Suomenlinnaksi vasta 1918. Nykyään se on kahta asiaa yhtä aikaa: '
      + 'Unescon maailmanperintökohde vuodesta 1991 ja aivan tavallinen '
      + 'kaupunginosa, jossa asuu noin kahdeksansataa ihmistä. '
      + 'Kauppatorilta lähtevä lautta kuuluu joukkoliikenteeseen ja kulkee '
      + 'ympäri vuoden — sama matka, jonka isoisäsi teki laivan kannelta '
      + 'kaupunkiin päin.',
    /*
     * Kuva on pelin omasta aineistosta (sama tiedosto helsinki/historia).
     * Commons 29.8.2026: CC0, Leonhard Lenz. SILMÄTARKISTUS tehty:
     * rannikkotykit kalliolla, ei ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: tykit ovat se osa, joka ei koskaan
     * ampunut — sama asia, jonka oppitunti kertoo.
     */
    kuva: {
      tiedosto: 'Cannons on Kustaanmiekka Suomenlinna 2022-09-17 02.jpg',
      selite: 'Kustaanmiekan rannikkotykit kuuluvat Suomenlinnaan, jota '
        + 'kutsuttiin vuoteen 1918 asti Viaporiksi.',
      lahde: 'Leonhard Lenz, Wikimedia Commons (CC0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'helsinki'): luotsi
   * Aino ohjaa laivat linnoituksen salmien läpi ja tuntee jokaisen
   * karin. Tämä kortti ei kertaa Ainon repliikkiä eikä paljasta
   * vastausta.
   *
   * HELSINGIN VANHA KOHTAAMINEN JÄÄ ENNALLEEN (js/packs/kohtaamiset.js):
   * sama Aino kahdella pinnalla, ei kahta lupausta samasta ovesta.
   */
  kohtaaminen: {
    hahmo: 'Luotsi Aino',
    nappi: 'Tapaa luotsi',
    teksti: 'Aino lukee vettä kuin karttaa: hän tietää mistä kohtaa salmea '
      + 'pääsee ja missä pohja nousee vastaan, myös siellä missä merikartta '
      + 'vaikenee. Suvussa on luotsattu samoja väyliä niin kauan, ettei '
      + 'kukaan enää muista aloittajaa. Kiirettä hän ei pidä, koska meri ei '
      + 'pidä. Ennen kuin hän irrottaa köyden, hän haluaa tietää, onko '
      + 'vieras ymmärtänyt, mikä noiden saarten päälle rakennettiin.',
    vihjeOsio: 'historia',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: SUOMENLINNA. Kaaren teksti asettaa Ainon
   * linnoituksen salmiin, ja pelin oma Helsinki-aineisto osoittaa saman
   * paikan (js/packs/kulttuuri-kategoriat.js, helsinki/historia).
   *
   * 60,14722222 N / 24,98638889 E — fi-Wikipedia "Suomenlinna",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((24,98638889 − (−175)) mod 360) × (12000/360)
   *                     = 199,98638889 × 33,3333… = 6666,2
   *                   y = (millerY(76) − millerY(60,14722222)) × 12000/2π
   *                     = 918,4
   *   europe          x = (24,98638889 + 11) × 19,2 = 690,9
   *                   y = (72 − 60,14722222) × 26,3 = 311,7
   *
   * TARKISTUS LAATTAA VASTEN: Helsingin laatta on Euroopan laudalla
   * 688 / 303 ja maailmankartalla 6661,1 / 901,8. Piste jää siis
   * laatasta etelään ja itään — juuri niin kuin saarten kuuluukin olla
   * kaupungin edustalla — ja Euroopan laudalla ero on alle
   * PISTE_ERO_MIN, joten piirtopuoli siirtää pisteen vielä koilliseen
   * (js/fokuspiste.js).
   */
  kohtaamispiste: {
    nimi: 'Suomenlinnan salmi',
    laudat: {
      maailmankartta: { x: 6666.2, y: 918.4 },
      europe: { x: 690.9, y: 311.7 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Helsingin sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Helsinki",
   * 2 = Historia, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Helsingin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: MAJAKKA_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: KIVIMIES_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Suomi) ----------
   *
   * UUSI POOLI, EI SIIRTO. Suomi ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia.
   *
   * MIKSI OULU JA TERVA: isoisän merkintä päättyy tervaan ja siihen,
   * että se oli tavallaan kultaa. Nosto lunastaa juuri sen lauseen — ja
   * se on myös maan PIENEN paikallisaarteen pari (js/packs/
   * paikallisaarteet.js, FIN: tervatynnyrin pohjalta löytynyt hopeariksi).
   * Ison aarteen kultaa nosto EI koske: Ivalojoki on aarremerkinnän oma,
   * eikä sitä kerrota etukäteen.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - fi-Wikipedia "Terva" (johdanto ja osio "Historia"): terva on
       *     pihkaisesta männystä hapettomassa ja kuumassa poltettu
       *     hiilivety-yhdiste, joka hylkii vettä ja suojaa puuta
       *     kosteudelta; vientiä oli 1300-luvulta alkaen ja 1600-luvun
       *     alussa Euroopassa syntyi kysyntä laivojen puuosien ja
       *     köysistön suojaamiseen; 1600-luvun lopulla terva oli Suomen
       *     tärkein vientituote; polttoalueet olivat vesistöjen varsilla,
       *     koska painavien tynnyreiden kuljetus maateitse oli
       *     käytännössä mahdotonta; vuonna 1617 ulkomaankauppa sallittiin
       *     vain tapulikaupungeille, ja muiden oli vietävä tervansa
       *     Tukholmaan, jonka porvareilla oli tervakaupan yksinoikeus;
       *     monopoli kumottiin vuonna 1765, ja siihen vaikutti
       *     kokkolalainen valtiopäivämies Anders Chydenius (1729–1803);
       *     1800-luvulla tervan hinta laski ja polton painopiste siirtyi
       *     pohjoisemmaksi, jolloin Oulusta tuli tärkein satama; nykyään
       *     Suomessa tehdään tervaa alle 50 000 litraa vuodessa, mikä ei
       *     riitä edes vanhojen kirkkojen ja tapulien kattoihin, ja
       *     entisestä vientimaasta on tullut tuoja.
       *   - fi-Wikipedia "Oulu", osio kaupungin historiasta: sama
       *     tervakauppa, sama siirtymä pohjoiseen ja sama satama.
       */
      id: 'tervakauppa',
      nimio: 'Oulun terva',
      otsikko: 'Maailman laivat pysyivät kuivina suomalaisella tervalla — '
        + 'ja tynnyrit oli pakko soutaa Tukholmaan',
      lunastus: [
        'Terva on pihkaista mäntyä, joka poltetaan hapettomassa ja '
          + 'riittävän kuumassa haudassa. Lopputulos hylkii vettä, ja siksi '
          + 'sillä suojattiin laivojen puuosat ja köysistö. Kun Euroopan '
          + 'omat metsät oli hakattu, tervaa kannatti tuoda kaukaa, ja '
          + '1600-luvun lopulla se oli Suomen tärkein vientituote. '
          + 'Polttopaikat olivat aina vesistön varrella — painavia '
          + 'tynnyreitä ei yksinkertaisesti saanut liikkumaan maateitse, '
          + 'joten ne laskettiin jokea alas tervaveneillä.',
        'Kauppa ei ollut vapaata. Vuoden 1617 järjestelmässä ulkomaankauppa '
          + 'sallittiin vain tapulikaupungeille, ja muiden oli vietävä '
          + 'tervansa Tukholmaan, jonka porvareilla oli tervakaupan '
          + 'yksinoikeus. Pohjalaisia se suututti, ja monopoli kumottiin '
          + 'vasta vuonna 1765 — siihen vaikutti kokkolalainen '
          + 'valtiopäivämies Anders Chydenius, joka kannatti vapaakauppaa. '
          + 'Sen jälkeen tervaraha jäi kotiin, ja Pohjanmaan kaupunkeihin '
          + 'nousi kokonainen tervaporvarien kulttuuri. 1800-luvulla hinta '
          + 'laski ja polton painopiste siirtyi pohjoisemmaksi, jolloin '
          + 'Oulusta tuli tärkein satama — se on se satama, jonka lastia '
          + 'isoisäsi haistoi Helsingissä. Nykyään tervaa tehdään Suomessa '
          + 'alle viisikymmentätuhatta litraa vuodessa, mikä ei riitä edes '
          + 'vanhojen kirkkojen ja tapulien kattoihin: entisestä '
          + 'vientimaasta on tullut tuoja.',
      ],
      lahde: 'fi-Wikipedia "Terva", johdanto ja osio Historia sekä '
        + 'fi-Wikipedia "Oulu", osio kaupungin historiasta; tarkistettu '
        + '29.8.2026.',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (29.8.2026, sama malli kuin Sofian
       * areenalla ja v1307/v1312:n nostoilla): repon oma generoitu
       * havainnekuva, jolla ei ole Commons-nimeä eikä varareittiä,
       * joten kenttä on `osoite` eikä `tiedosto` (js/fokusnosto.js
       * asetaNostonKuva).
       *
       * Kuva näyttää juuri sen, mistä nosto kertoo: tervavene
       * tynnyrilastissa Oulun tervahovin rannassa, tynnyrit
       * kaupattavina laiturilla.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-tervakauppa-loistoaika.webp',
        selite: 'Tervavene tulee Oulujokea alas täydessä lastissa, ja '
          + 'tynnyrit nostetaan tervahovin rantaan punnittaviksi.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva — pelin omasta
       * aineistosta (sama tiedosto FIN, js/packs/maa-kategoriat.js).
       * Tiedosto, selite ja lähde ennallaan. Commons 29.8.2026:
       * CC BY 4.0, tekijä tuntematon, Helsingin kaupunginmuseon
       * kokoelma. SILMÄTARKISTUS tehty: aikalaisvalokuva
       * satamatorista, ihmiset kaukaisina hahmoina.
       */
      valokuva: {
        tiedosto: 'Kauppatori, syys- eli silakkamarkkinat - G30676 - hkm.HKMS000005-km0000pheu.jpg',
        selite: 'Eteläsataman rantaan purjehdittiin lasteineen kauan ennen '
          + 'höyrylaivoja; samoja laitureita myöten kulki myös terva.',
        lahde: 'Tuntematon tekijä, Helsingin kaupunginmuseo, Wikimedia '
          + 'Commons (CC BY 4.0)',
      },
      kysymykset: [
        'Miksi terva suojaa puuta vedeltä?',
        'Miksi tervatynnyrit piti kuljettaa jokea pitkin?',
        'Mitä Suomessa tehdään tervalla nykyään?',
      ],
      /*
       * 65,01666667 N / 25,46666667 E — fi-Wikipedia "Oulu",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Oulu',
        laudat: {
          maailmankartta: { x: 6682.2, y: 665.3 },
          europe: { x: 700.2, y: 183.7 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Ivalojoen
   * kultahippu. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Kuulin Ivalojoen kullasta jo laivalla: kolme vuotta sitten '
      + 'joelta alkoi löytyä hippuja, ja pohjoiseen kulkee nyt miehiä lapio '
      + 'selässä. Lappi oli minulle liian kaukana — merkitsin joen '
      + 'luetteloon ja jätin sen sinulle.',
  },
};
