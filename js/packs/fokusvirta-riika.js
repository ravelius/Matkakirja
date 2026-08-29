/*
 * RIIAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-tallinna.js:lle ja
 * -tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Aalto 4A, Latvia.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aalto 4A): matkakirjan
 * paikkarivi ja teksti, Livian teksti ja aarremerkinnän teksti ovat
 * SANATARKASTI hänen kirjoittamansa — niitä ei ole lyhennetty,
 * täydennetty eikä sanajärjestystä muutettu. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * MAADOITUS ON JAETTU KAANONTEKSTISTÄ, EI KIRJOITETTU. Kaanoni antaa
 * Livialle yhden tekstin, ja Livian ääni on päätoimittajan — uusia
 * Livia-sanoja ei siis ole tässä paketissa yhtäkään. Integroinnissa
 * teksti on jaettu virkkeen rajaa pitkin kenttiin `maadoitus` ja
 * `teksti` (Edinburghin kaava, ks. pollo-lohkon oma kommentti), koska
 * tests/fokusvirta.test.mjs vaatii jokaiselta fokuskaupungilta oman
 * maadoituksen. Peräkkäin luettuna kuplateksti on sanasta sanaan sama.
 *
 * ISO AARRE: Kuramaan herttuan aarre — herttua Jaakob Kettlerin
 * kadonnut kassa (js/packs/paikallisaarteet.js, LVA). PIENI AARRE:
 * pullo Riian mustaa balsamia (sama taulu).
 *
 * FAKTAPOHJA. Latvialle EI ole valmista takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Latvian maalehden nostot
 *      (js/packs/maa-kategoriat.js, LVA/luonto ja LVA/tavat), Riian
 *      kaupunkilehden omat nostot ja Matkailijan Riika -artikkeli
 *      (js/packs/kulttuuri-kategoriat.js, riika) sekä maan
 *      aarretiedot (js/packs/paikallisaarteet.js, LVA). Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin — myös niiden
 *      KUVAT, jotka tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa, samoin ne kaksi kohtaa, joissa lähteet ovat eri
 *      mieltä (putouksen leveys, Tobagon vuosiluku) — kumpaakaan ei ole
 *      pyöristetty yhdeksi luvuksi.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Yksi täky (musta balsami) on
 * kaupunkilehden puolelta, koska KAANON vaatii sen: isoisän merkinnän
 * koko loppuosa on siitä juomasta, ja maan pieni aarre on sen pullo.
 * Kaksi muuta täkyä ovat maalehdestä. Kaupunkilehden sivun 1 oma visa
 * (zeppelin-hallit, js/packs/europe-kulttuuri.js) ja sivun 2 oma
 * tehtävä (Kissatalon kissat, js/packs/kulttuuri-kategoriat.js) EIVÄT
 * esiinny täkyinä eivätkä alla nimetyissä lehtitehtävissä, joten sama
 * kysymys ei tule vastaan kahdesti.
 *
 * ── OMISTAJAN KOLME KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, riika/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOJA EI OLE ────────────────────────────────────────────
 *
 * Kohdenostot tulevat maan omasta luettelosta (esim. js/packs/
 * fokuskohteet-grc.js). Latvialle sellaista tiedostoa ei ole, eikä
 * tämä paketti luo sitä — `kohteet`-kenttä jää siis pois. Jos Fable
 * haluaa Riikaan kohdenoston, se on oma työnsä ja oma tiedostonsa.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu —
 * sama kaava kuin aallossa 3 (Tallinna, Tukholma, Helsinki, København).
 * Kenttä on moottorissa valinnainen (js/ui.js), ja teksti ja luenta ovat
 * sanasta sanaan samat, joten luennan voi ajaa suoraan
 * (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan. Valmis
 * äänite menisi polkuun assets/audio/puhe-fokus-matkakirja-riika.mp3.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Joulukuusikysymys on Riian lehden sivun 2
 * ("Vanhakaupunki") oman noston "Talo, jossa juhlivat naimattomat
 * kauppiaat" tekstiä ja piirakkakysymys sivun 1 ("Riika") oman noston
 * "Ruispohja, porkkanaa ja kuminaa" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KISSATALOA: sivun 2 osiolla on jo oma tehtävänsä, joka kysyy
 * juuri Kissatalon kissoista. Sama sivu ei saa kysyä samaa asiaa
 * kahdesti, joten AARTEEN AVAUS ottaa saman sivun toisen noston.
 *
 * MIKSI EI ZEPPELIN-HALLEJA: sivun 1 kysymys on Riian kulttuurivisa
 * (js/packs/europe-kulttuuri.js), joka kysyy juuri keskustorin
 * hallien alkuperää, ja js/fokustehtavat.js pukee sen samaksi AARTEEN
 * AVAUS -laatikoksi ilman omaa riviään täällä.
 */
const JOULUKUUSI_VISA = {
  kysymys: 'Mustapäiden talo on Riian vanhankaupungin tunnetuin '
    + 'julkisivu. Miltä vuodelta on ensimmäinen kertomus sen edustalle '
    + 'pystytetystä koristellusta joulukuusesta?',
  /*
   * VAIHTOEHDOT OVAT SAMANMITTAISET (docs/moduulit/tarinakaari.md, luku
   * 6 kohta 2: oikea vastaus ei saa erottua muodosta). Kolme paljasta
   * vuosilukua eivät kerro mitään pituudellaan, eikä kumpikaan väärä ole
   * puolitosi: talo tuhoutui 1941 ja muurattiin uudelleen 1990-luvulla,
   * joten kumpikaan vuosi ei liity joulukuuseen.
   */
  vaihtoehdot: [
    'Vuodelta 1510',
    'Vuodelta 1918',
    'Vuodelta 1998',
  ],
  oikea: 0,
  fakta: 'Talo rakennettiin vuonna 1334 varastoksi ja kokoontumispaikaksi, '
    + 'ja Mustapäiden veljeskuntaan kuuluivat kaupungin naimattomat '
    + 'kauppiaat ja ulkomaalaiset. Nykyinen talo muurattiin uudelleen '
    + '1990-luvulla vanhojen piirustusten ja valokuvien mukaan.',
};

const SKLANDRAUSIS_VISA = {
  kysymys: 'Sklandrausis on kämmenen kokoinen avoin piirakka, jonka '
    + 'täytteenä on perunaa ja porkkanaa kuminan kanssa. Mistä sen pohja '
    + 'tehdään?',
  vaihtoehdot: [
    'Ruistaikinasta',
    'Voitaikinasta',
    'Perunataikinasta',
  ],
  oikea: 0,
  fakta: 'Sklandrausis on kotoisin Kuurinmaalta Latvian länsiosasta, ja '
    + 'EU myönsi sille aidon perinteisen tuotteen merkin vuonna 2013.',
};

export const FOKUSVIRTA_RIIKA = {
  kaupunki: 'riika',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ilman lisäystä. */
    paikkarivi: 'Riika, heinäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Väinäjoen rannassa lastataan pellavaa ja lankkuja niin '
      + 'pitkälle kuin silmä kantaa — tämä on keisarikunnan kolmas satama, '
      + 'vaikka kaupunki puhuu saksaa, käy kauppaa kuin hansa ja rukoilee '
      + 'kuin luterilainen. Apteekkari kaatoi minulle ryypyn mustaa juomaa, '
      + 'joka maistui tervalta, yrteiltä ja erehdykseltä. Hän vannoi sen '
      + 'parantavan kaiken. Kirjoitan tämän varmuuden vuoksi ylös, jos se '
      + 'paikkansa pitää.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: neljä tagia, alku ja loppu eri
     * sävyssä. Yksikään sana, välimerkki tai sanajärjestys ei muutu.
     */
    luenta: '[curious] Väinäjoen rannassa lastataan pellavaa ja lankkuja '
      + 'niin pitkälle kuin silmä kantaa — tämä on keisarikunnan kolmas '
      + 'satama, vaikka kaupunki puhuu saksaa, käy kauppaa kuin hansa ja '
      + 'rukoilee kuin luterilainen. [excited] Apteekkari kaatoi minulle '
      + 'ryypyn mustaa juomaa, joka maistui tervalta, yrteiltä ja '
      + 'erehdykseltä. [softly] Hän vannoi sen parantavan kaiken. '
      + '[whispers] Kirjoitan tämän varmuuden vuoksi ylös, jos se '
      + 'paikkansa pitää.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAANONTEKSTI ON JAETTU KAHTEEN KENTTÄÄN, EI MUUTETTU.
     *
     * Kaanonissa Livialla on yksi teksti, mutta kortti lukee kaksi
     * kenttää (js/fokusvirta.js piirraPollo): `maadoitus` piirtyy
     * kuplan ensimmäiseksi kappaleeksi heti isoisän merkinnän perään ja
     * `teksti` sen jälkeen. tests/fokusvirta.test.mjs vaatii lisäksi
     * jokaiselta fokuskaupungilta oman maadoituksen, joka ei ole sama
     * merkkijono kuin huomio. Jako kulkee VIRKKEEN RAJAA pitkin
     * (Edinburghin kaava): ensimmäinen virke kuittaa merkinnän mustan
     * juoman, loput vievät vanhaankaupunkiin ja merkintään. Yhtäkään
     * sanaa, välimerkkiä tai järjestystä ei ole muutettu — peräkkäin
     * luettuna teksti on sanasta sanaan Fablen kaanonteksti.
     */
    maadoitus: 'Sitä mustaa juomaa myydään Riiassa edelleen, '
      + 'savipulloissa, ja paikalliset vannovat sen nimeen edelleen — ja '
      + 'turistit katuvat edelleen..',
    teksti: 'Vanha kaupunki on säilynyt niin ehjänä, että keskiaika '
      + 'tulee vastaan ihan kulman takaa. Isoisäsi haistoi täällä pellavan; '
      + 'nykyään täällä tuoksuu kahvi. Katsotaan hänen merkintänsä.',
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, riika/avauskuvat, heroerä 31): vanhankaupungin
     * siluetti Väinäjoen yli. Juuri se vanhakaupunki, josta Livian
     * teksti puhuu. Selite on lehden omasta selitteestä lyhentäen, ja
     * kaikki sen luvut ovat lehden aineistoa.
     */
    kuva: {
      ampari: 'herokoe/hero-riika-vanhakaupunki.jpg',
      selite: 'Riian vanhankaupungin siluetin muodostavat kolme tornia: '
        + '123-metrinen Pyhän Pietarin kirkko, vuonna 1211 perustettu '
        + 'tuomiokirkko ja Pyhän Jaakobin katedraali.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän loppu on kokonaan siitä mustasta
       * juomasta, ja maan PIENI AARRE on sen pullo. Tämä on ainoa täky,
       * joka on kaupunkilehden puolelta, ja se on siellä kaanonin takia.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, riika/kaupunki,
       * Matkailijan Riika -artikkelin jakso "Apteekkarin resepti vuodelta
       * 1752" (jo hyväksyttyä pelidataa) — Abraham Kunze 1752,
       * ensimmäinen lehti-ilmoitus joulukuussa 1762, Katariina Suuri
       * -kertomus on legenda eikä todennettu tapahtuma, nykyresepti 24
       * ainesosaa joista 17 kasviperäisiä, tumma keraaminen pullo vasta
       * 1969. Pullon tehtävä (suojaa valolta ja lämmöltä) on maan oman
       * aarretiedon tekstiä (js/packs/paikallisaarteet.js, LVA).
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Riga Black Balsam": klassisen version vahvuus
       *     45 tilavuusprosenttia; 24 ainesosasta 17 on kasveja, muun
       *     muassa mustikkaa, vadelmaa, koivunsilmuja, piparminttua,
       *     inkivääriä ja valeriaanan juurta; keramiikkapullon
       *     suunnitteli 1969 Latvijas Keramikan ja Riian teknillisen
       *     korkeakoulun yhteinen ryhmä; Katariina Suuri -kertomus
       *     esitetään artikkelissa nimenomaan legendana.
       *   - Pelin oma, jo hyväksytty aineisto (kaksi eri tiedostoa:
       *     kulttuuri-kategoriat.js ja paikallisaarteet.js), jotka
       *     kertovat samat vuosiluvut ja saman varauksen legendasta.
       */
      id: 'balsami',
      nappi: 'Juoma, joka maistui tervalta ja erehdykseltä',
      otsikko: 'Riian musta balsami',
      teksti: 'Isoisäsi maistoi juomaa, jonka resepti oli hänen käyntinsä '
        + 'aikaan jo yli satakaksikymmentä vuotta vanha. Apteekkari Abraham '
        + 'Kunze '
        + 'laati sen vuonna 1752, ja lehdessä sitä mainostettiin ensi kerran '
        + 'joulukuussa 1762. Nykyisessä ohjeessa on kaksikymmentäneljä '
        + 'ainesosaa, joista seitsemäntoista on kasveja: mustikkaa, '
        + 'vadelmaa, koivunsilmuja, piparminttua, inkivääriä, valeriaanan '
        + 'juurta. Vahvuus on neljäkymmentäviisi tilavuusprosenttia, mikä '
        + 'selittää sen kolmannen maun, jonka hän kirjasi ylös. Sitten se '
        + 'pullo. Läpinäkymätön keramiikka ei ole koristetta vaan '
        + 'säilytystä: valo ja lämpö pilaavat juoman, ja umpinainen savi '
        + 'pitää molemmat ulkona. Pullo on kuitenkin paljon reseptiä '
        + 'nuorempi — sen suunnitteli vasta vuonna 1969 Latvijas Keramikan '
        + 'ja Riian teknillisen korkeakoulun yhteinen ryhmä, joten isoisäsi '
        + 'sai ryyppynsä jostakin ihan muusta astiasta kuin siitä, jonka '
        + 'sinä näet kaupan hyllyllä. Ja yksi tarina kannattaa osata kertoa '
        + 'oikein päin. Sen mukaan Katariina Suuri sairastui Riiassa ja '
        + 'parani balsamista, minkä jälkeen juoma tuli kuuluisaksi koko '
        + 'Euroopassa. Se on legenda eikä todennettu tapahtuma — ja juuri '
        + 'sellaiset tarinat myyvät pulloja vielä kahden ja puolen '
        + 'vuosisadan päästä.',
      /*
       * Commons 29.8.2026: 2852×4279, CC BY-SA 2.5, Fanny Schertzer,
       * kuvaus "Herbal liquor of Latvia", otettu elokuussa 2009.
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY: pullo pöydällä
       * vaaleaa seinää vasten, ei ihmisiä; etiketissä lukee vuosiluku
       * 1752. HUOM: kuvan pullo on TUMMAA LASIA, ei sitä keraamista
       * pulloa, joten selite ei väitä pullosta mitään — se kertoo
       * reseptistä ja etiketin vuosiluvusta, jotka kuvassa näkyvät.
       */
      kuva: {
        tiedosto: 'Riga Black Balsam.jpg',
        selite: 'Riian musta balsami on apteekkari Abraham Kunzen vuonna '
          + '1752 laatima yrttiuute, ja sama vuosiluku on yhä sen '
          + 'etiketissä.',
        lahde: 'Fanny Schertzer, Wikimedia Commons (CC BY-SA 2.5)',
      },
      visa: {
        kysymys: 'Miksi balsamia myydään läpinäkymättömässä '
          + 'keramiikkapullossa?',
        vaihtoehdot: [
          'Se suojaa juomaa valolta ja lämmöltä',
          'Se on apteekin alkuperäinen pakkaus 1700-luvulta',
          'Savi antaa juomaan osan sen mausta',
        ],
        oikea: 0,
        fakta: 'Pullo on paljon reseptiä nuorempi: sen suunnitteli vasta '
          + 'vuonna 1969 Latvijas Keramikan ja Riian teknillisen '
          + 'korkeakoulun yhteinen ryhmä. Reseptissä on 24 ainesosaa, '
          + 'joista 17 on kasveja.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on tämän kaupungin oma 1873-ankkuri
       * (docs/moduulit/tarinakaari.md, luku 3). Isoisä saapui
       * heinäkuussa 1873 satamaan, jossa lastattiin pellavaa — ja
       * kaupunki oli laulanut edellisen kuun lopussa jotain, mikä
       * muutti maata enemmän kuin yksikään lasti.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LVA/tavat, nosto
       * "Kolmekymmentätuhatta laulajaa yhdellä lavalla" (jo hyväksyttyä
       * pelidataa) — ensimmäiset laulujuhlat 1873, sen jälkeen viiden
       * vuoden välein, kuorot harjoittelevat vuosia, lavalla
       * kymmeniätuhansia laulajia kansallispuvuissa, neuvostoaikana
       * juhlista tuli hiljainen mielenosoitus.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - lv-Wikipedia "Vispārējie latviešu dziesmu un deju svētki":
       *     ensimmäiset juhlat pidettiin 26.–29. kesäkuuta 1873 Riiassa,
       *     järjestäjänä Rīgas Latviešu biedrība eli Riian latvialainen
       *     seura; laulajia 1003 ja orkesterisoittajia 30; yleisöä
       *     arviolta kaksikymmentätuhatta.
       *   - en-Wikipedia "Latvian Song and Dance Festival": sama
       *     osanottajaluku (1003 laulajaa, 30 orkesterisoittajaa), sama
       *     vuosi 1873 ja sama viiden vuoden väli.
       *
       * KAKSI UNESCO-VUOTTA, JA MOLEMMAT OVAT OIKEIN. Pelin oma nosto
       * sanoo 2003 ja saman noston selite 2008; en-Wikipedia antaa
       * luettelointivuodeksi 2008. Kyse on kahdesta eri päätöksestä
       * (tunnustus 2003, luetteloon liittäminen 2008), joten teksti
       * sanoo molemmat eikä valitse.
       */
      id: 'laulujuhlat',
      nappi: 'Tuhat laulajaa samana kesänä',
      otsikko: 'Ensimmäiset laulujuhlat',
      teksti: 'Isoisäsi tuli Riikaan heinäkuussa 1873. Kaupunki oli '
        + 'laulanut kesäkuun lopussa: kesäkuun 26. ja 29. päivän välillä '
        + 'pidettiin ensimmäiset yleiset latvialaiset laulujuhlat, ja niiden '
        + 'järjestäjä oli Riian latvialainen seura. Lavalla oli tuhat kolme '
        + 'laulajaa ja kolmekymmentä orkesterisoittajaa, ja yleisöä oli '
        + 'arviolta kaksikymmentätuhatta. Luvut eivät ole tässä se pointti. '
        + 'Se on kieli: isoisäsi merkinnän mukaan kaupunki puhui saksaa — '
        + 'ja nyt kaksikymmentätuhatta ihmistä oli tullut kuulemaan '
        + 'latviankielistä laulua, ensimmäistä kertaa yhdessä ja isolla '
        + 'lavalla. Siitä lähtien juhlat on pidetty viiden vuoden '
        + 'välein. Kuorot harjoittelevat vuosia päästäkseen mukaan, ja '
        + 'lavalla seisoo nykyään kymmeniätuhansia laulajia yhtä aikaa '
        + 'kansallispuvuissa. Neuvostoaikana juhlista tuli hiljainen '
        + 'mielenosoitus: kun ihmiset lauloivat kiellettyjä kansanlauluja '
        + 'yhdessä, ketään ei voitu pidättää. Unesco tunnusti Baltian '
        + 'laulujuhlat vuonna 2003 ja liitti ne aineettoman '
        + 'kulttuuriperinnön luetteloon 2008.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LVA/tavat,
       * js/packs/maa-kategoriat.js) — siis jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: public domain, tekijä tuntematon,
       * kuvaus "Latvia. Riga. IX Latvian Song Festival. 1938", 854×570.
       * SILMÄTARKISTUS TEHTY: yleiskuva laulujuhlakentästä, ei
       * tunnistettavia kasvoja.
       *
       * SELITE KERTOO OIKEAN VUODEN. Kuva on yhdeksänsistä juhlista
       * vuodelta 1938 eikä ensimmäisistä, eikä kuvatekstin anneta antaa
       * ymmärtää muuta — vuoden 1873 juhlista ei ole Commonsissa kuvaa.
       */
      kuva: {
        tiedosto: 'Riga. IX Latvian Song Celebration. 1938.png',
        selite: 'Yhdeksänsiä laulujuhlia vietettiin Riiassa vuonna 1938; '
          + 'ensimmäiset oli pidetty samassa kaupungissa 65 vuotta '
          + 'aiemmin.',
        lahde: 'Tuntematon valokuvaaja, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Kuka järjesti ensimmäiset latvialaiset laulujuhlat '
          + 'Riiassa vuonna 1873?',
        vaihtoehdot: [
          'Riian latvialainen seura',
          'Kaupungin saksankielinen raati',
          'Keisarikunnan koulutoimi',
        ],
        oikea: 0,
        fakta: 'Laulajia oli 1003 ja orkesterisoittajia 30, ja yleisöä '
          + 'arviolta kaksikymmentätuhatta. Juhlat on sen jälkeen pidetty '
          + 'viiden vuoden välein.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä katsoo alas laituriin ja lastiin.
       * Tämä kääntää katseen ylös samassa kaupungissa — ja kertoo
       * kerroksen, jota isoisä ei voinut nähdä, koska sitä ei ollut
       * vielä rakennettu. Se on myös erän ainoa kevyt loppuvitsi.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, LVA/tavat, nosto "Talot,
       * joissa on kasvot" (jo hyväksyttyä pelidataa) — Riiassa enemmän
       * jugendtaloja kuin missään muussa kaupungissa, keskustan
       * rakennuksista noin kolmasosa, valtaosa valmistui vuosina
       * 1904–1914, julkisivuissa kivisiä kasvoja, leijonia, käärmeitä ja
       * kasviköynnöksiä sekä parvekkeita kannattelevia naishahmoja,
       * monet suunnitteli Mihail Eisenstein, jonka poika Sergei tuli
       * kuuluisaksi elokuvaohjaajana.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Mikhail Eisenstein": hän oli tieosaston
       *     insinööri, joka suunnitteli arkkitehtina noin kaksikymmentä
       *     taloa Riikaan; tunnetuimmat valmistuivat vuosina 1901–1906;
       *     useat niistä ovat Alberta-kadulla; poika Sergei Eisenstein
       *     tuli tunnetuksi elokuvaohjaajana.
       *   - Pelin oma, jo hyväksytty nosto ja sen selite (maa-
       *     kategoriat.js, LVA/tavat), jotka kertovat saman osuuden,
       *     samat vuodet 1904–1914 ja saman isä–poika-tiedon.
       */
      id: 'jugend',
      nappi: 'Talot, jotka katsovat takaisin',
      otsikko: 'Riian jugend',
      teksti: 'Kun olet vanhassakaupungissa katsonut tarpeeksi alas '
        + 'mukulakiviä, kävele korttelin verran ulos ja katso ylös. Riian '
        + 'keskustan rakennuksista noin kolmasosa on jugendia, enemmän kuin '
        + 'missään muussa kaupungissa, ja valtaosa niistä nousi '
        + 'talouskasvun vuosina 1904–1914 — siis kolmisenkymmentä vuotta '
        + 'isoisäsi käynnin jälkeen. Hän käveli täällä ennen kuin nämä '
        + 'seinät olivat olemassa. Julkisivuissa on kivisiä kasvoja, '
        + 'leijonia, käärmeitä ja kasviköynnöksiä, ja parvekkeita '
        + 'kannattelevat naishahmot, jotka katsovat kadulle silmät auki. '
        + 'Monet niistä suunnitteli Mihail Eisenstein, joka oli ammatiltaan '
        + 'tieosaston insinööri ja arkkitehti vasta sivutyökseen: hänen '
        + 'nimissään on Riiassa parikymmentä taloa, ja tunnetuimmat '
        + 'valmistuivat vuosina 1901–1906 Alberta-kadun varteen. Hänen '
        + 'poikansa Sergei Eisenstein tuli maailmalla kuuluisaksi '
        + 'elokuvaohjaajana. Isä teki kadulle kasvoja, jotka eivät '
        + 'liikahda; poika teki kuvia, jotka eivät tee mitään muuta.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto LVA/tavat,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: CC BY 2.0, Jean-Pierre Dalbéra.
       * SILMÄTARKISTUS TEHTY: jugendjulkisivu alaviistosta, ei
       * tunnistettavia kasvoja kadulla.
       */
      kuva: {
        tiedosto: 'Immeuble art nouveau (Riga) (7561800214).jpg',
        selite: 'Jugend on noin kolmasosassa Riian keskustan '
          + 'rakennuksista, ja valtaosa niistä valmistui talouskasvun '
          + 'vuosina 1904–1914.',
        lahde: 'Jean-Pierre Dalbéra, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Kuinka suuri osa Riian keskustan rakennuksista on '
          + 'jugendtyylisiä?',
        vaihtoehdot: [
          'Noin kolmasosa',
          'Noin joka kymmenes',
          'Lähes kaikki',
        ],
        oikea: 0,
        fakta: 'Mihail Eisenstein oli ammatiltaan tieosaston insinööri ja '
          + 'suunnitteli sivutyönään parikymmentä taloa, tunnetuimmat '
          + 'vuosina 1901–1906. Hänen poikansa Sergei tuli kuuluisaksi '
          + 'elokuvaohjaajana.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen: apteekkari Ilze haluaa tietää, tunteeko
   * vieras sen, mitä pieni maa kerran omisti. Visasääntö täyttyy —
   * vastaus on tekstissä, mutta kysymyksen sanamuotoa ei ole kirjoitettu
   * tähän sellaisenaan. Oppitunti myös pohjustaa MAAN ISON AARTEEN
   * (Kuramaan herttuan aarre) siltä osin kuin pelin oma aarretieto sen
   * sallii: kassaa ei ole löytynyt, ja se sanotaan suoraan.
   *
   * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
   * riippumattomasta lähteestä):
   *   - en-Wikipedia "Jacob Kettler": hallitsi 17. elokuuta 1642 – 1.
   *     tammikuuta 1682; lähetti 1651 laivaston rakentamaan Jaakobin
   *     linnakkeen Gambiajoelle; valtasi Tobagon 1654 ja nimesi sen
   *     nimellä Neu Kurland; ruotsalaiset pitivät häntä vankina
   *     1658–1660 ensin Riiassa ja sitten Ivangorodissa; sinä aikana
   *     siirtokunnat menetettiin ja laivasto tuhoutui; kuoli Mitaussa
   *     eli Jelgavassa 1. tammikuuta 1682.
   *   - en-Wikipedia "Duchy of Courland and Semigallia": herttuakunnan
   *     kauppalaivaston pääsatamat olivat Ventspils ja Liepāja;
   *     ensimmäinen siirtokunta Afrikassa oli 1651 Pyhän Andreaan saari
   *     Gambiajoella ja siellä Jaakobin linnake; Tobagon siirtokunta
   *     perustettiin artikkelin mukaan 1652; vankeusaikana hollantilaiset
   *     ottivat molemmat siirtokunnat, joilta puuttui tavaraa ja väkeä.
   *   - Aarteen sanamuoto on pelin omaa, jo hyväksyttyä aineistoa
   *     (js/packs/paikallisaarteet.js, LVA/isoAarre): *"tarina kätketystä
   *     herttuan kassasta on elänyt siitä asti. Kassasta ei ole löytynyt
   *     jälkeäkään."*
   *
   * MITÄ EI KERROTA YHTENÄ VUOSILUKUNA: Tobagon vuosi. Lähteet antavat
   * 1652 ja 1654, joten teksti sanoo "1650-luvun alussa" eikä valitse
   * kumpaakaan. Tämä on tarkoituksellinen, ei epähuomiossa jäänyt aukko.
   */
  oppitunti: {
    otsikko: 'Pieni maa, jolla oli siirtomaita',
    teksti: 'Isoisäsi kirjoitti, että Riika käy kauppaa kuin hansa. Hän ei '
      + 'aavistanut, kuinka kauas se kauppa oli kerran yltänyt. Kaupungin '
      + 'lounaispuolella oli 1600-luvulla Kuramaan ja Semgallian '
      + 'herttuakunta, joka mahtui kokonaisuudessaan nykyisen Latvian '
      + 'länsi- ja eteläosaan — ja jolla oli siirtomaita kahdella '
      + 'mantereella. '
      + 'Herttua Jaakob Kettler hallitsi elokuun 17. päivästä 1642 aina '
      + 'vuoden 1682 ensimmäiseen päivään. Hän rakennutti herttuakunnalle '
      + 'oman kauppalaivaston, jonka pääsatamat olivat Ventspils ja '
      + 'Liepāja. Vuonna 1651 hänen laivansa purjehtivat Gambiajoelle ja '
      + 'pystyttivät Pyhän Andreaan saarelle Jaakobin linnakkeen, ja '
      + '1650-luvun alussa kuurinmaalaiset asettuivat Tobagoon '
      + 'Karibianmerellä ja antoivat saarelle nimen Uusi Kuurinmaa. '
      + 'Se kaikki kesti alle kymmenen vuotta. Vuonna 1658 ruotsalaiset ottivat '
      + 'herttuan vangiksi ja pitivät häntä kaksi vuotta, ensin Riiassa ja '
      + 'sitten Ivangorodissa; sinä aikana hollantilaiset ottivat molemmat '
      + 'siirtokunnat, joilta puuttui yhtä lailla väkeä ja tavaraa, ja '
      + 'laivasto tuhoutui. Herttua palasi vapaaksi 1660, mutta '
      + 'herttuakunta ei enää noussut entiselleen. Hän kuoli Jelgavassa '
      + 'uudenvuodenpäivänä 1682. Ja tässä on se kohta, joka pitää tarinan '
      + 'hengissä: siitä, mitä laivoihin ehdittiin lastata ennen vuotta '
      + '1658, ei ole täydellistä kirjanpitoa. Kertomus herttuan kätketystä '
      + 'kassasta on elänyt siitä asti, eikä kassasta ole löytynyt '
      + 'jälkeäkään.',
    /*
     * Commons 29.8.2026: 528×606, public domain (aikalaismuotokuva),
     * kuvaus "Jacob Kettler, 1642-1682 Duchy of Courland", tiedosto on
     * Amano1:n johdannainen vanhemmasta Commons-tiedostosta.
     * Restrictions tyhjä. SILMÄTARKISTUS TEHTY: 1600-luvun muotokuva,
     * mies pitsikauluksessa, ei nykyihmisiä.
     *
     * KUVA ON PIENI (528×606). Se on tämän herttuan paras Commonsissa
     * oleva aikalaiskuva; jos kortti tarvitsee ison kuvan, vaihtoehto on
     * saman miehen puupiirros 1648 tai 1670 — molemmat myös public
     * domain, mutta kumpikaan ei ole väri- eikä muotokuva.
     */
    kuva: {
      tiedosto: 'Jakob Kettler.jpg',
      selite: 'Herttua Jaakob Kettler hallitsi Kuramaata vuodesta 1642 '
        + 'kuolemaansa 1682, ja hänen aikanaan pieni herttuakunta piti '
        + 'siirtokuntia Tobagossa ja Gambiajoella.',
      lahde: 'Tuntematon maalari, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Riialla ei ole kohtaamista pelin vanhassakaan polussa
   * (js/packs/kohtaamiset.js eikä js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT tunne kaupunkia), joten tässä ei ole mitään
   * toistettavaa eikä mitään rikottavaa — ja siksi tämä on EHDOTUS eikä
   * vientiä. Hahmo, sävy ja lupaus ovat kirjoitettavissa yli; kortti on
   * tässä muodossa, jotta se voidaan lukea sellaisena kuin pelaaja sen
   * näkisi. VARSINAINEN KYSYMYS ei ole tässä eikä kuulu tähän
   * tiedostoon: se on laattamekaniikan puolella.
   *
   * KUVAA EI OLE (ohjeen mukaisesti). Moottori piirtää kohtaamiskortin
   * ilman kuvaa aivan kuten Tallinnassa ja Tukholmassa.
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luku 3 ja 5):
   *   - ÄÄNIPROFIILI on EPÄUSKOINEN — Ilze pitää sukunsa tarinaa satuna
   *     mutta vihko on hänen kädessään. Erässä ei ole toista tällaista.
   *   - VARALLISUUSSÄÄNTÖ: isoisä ei maksanut mitään eikä käskenyt
   *     ketään. Hän kirjasi yhden yön lukemat, koska talon väki valvoi
   *     sairaan lapsen vieressä. Suvun oma syy vihkon säilyttämiseen on
   *     ammattiylpeys, ei Foggin toivomus.
   *   - LUPAUS, JONKA AARRETEKSTIN ON LUNASTETTAVA: vihko avataan.
   *   - EI SPOILERIA: kortti ei mainitse herttuaa, siirtomaita eikä
   *     kassaa, vaikka oppitunti on juuri niistä.
   */
  kohtaaminen: {
    hahmo: 'Apteekkari Ilze',
    nappi: 'Tapaa apteekkari',
    varmistus: 'Haluatko varmasti tavata Ilzen juuri nyt?',
    /*
     * VIHJELINKIN OSIO: kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js). Riian lehdessä on kaksi osiota,
     * 'kaupunki' ("Riika") ja 'vanhakaupunki'. Ilzen kysymys koskee
     * pientä maata, joka omisti kaukana, ja lähin tuki sille on
     * Riika-osiossa: sen sklandrausis-juttu nimeää Kuurinmaan ja
     * Matkailijan Riika kertoo hansasta ja kauppateistä. Vastausta ne
     * eivät anna, vaan nyökkäävät suuntaan.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Ilzen apteekki on vanhassakaupungissa, ja tiskin takana '
      + 'seisoo rivi tummia pulloja, joita hän ei itse juo. Suvussa on '
      + 'säilynyt käsin kirjoitettu vihko: mitä sekoitettiin, kenelle ja '
      + 'minä päivänä, sukupolvien verran samaa siistiä käsialaa. Yhdellä '
      + 'aukeamalla käsiala vaihtuu. Ilze sanoo suoraan, että hän pitää '
      + 'sukunsa tarinaa satuna — jonkun ulkomaalaisen kerrotaan '
      + 'kirjanneen sinä yönä sivun reunaan ilmanpaineen ja lämpötilan '
      + 'tunti tunnilta, kun talon väki valvoi sairaan lapsen vieressä, '
      + 'eikä kukaan enää tiedä kuka hän oli. Vihkon hän '
      + 'kyllä ottaa esiin. Mutta ei ennen kuin vieras osoittaa tuntevansa '
      + 'tämän maan mittasuhteet: kuinka pieni maa voi olla ja silti '
      + 'omistaa jotain meren takaa.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: RIIAN VANHAKAUPUNKI. Ilzen apteekki on siellä, ja
   * kaupunkilehden oma vanhakaupunki-osio osoittaa saman paikan.
   *
   * KOORDINAATIT LUETAAN LAUDALTA EIKÄ PROJEKTIOSTA — SAMA PERUSTELTU
   * POIKKEUS KUIN TALLINNASSA. Riian todellinen paikka on 56,94888889 N
   * / 24,10638889 E, joka Euroopan laudan kaavalla (x = (lon + 11) ×
   * 19,2, y = (72 − lat) × 26,3) osuisi pisteeseen 674,0 / 395,8 ja
   * maailmankartalla (Millerin lieriö, LEVEYS 12000 / LON0 −175 /
   * POHJOINEN 76) pisteeseen 6636,9 / 1074,3. Riian LAATTA on kuitenkin
   * Euroopan laudalla kohdassa 648 / 434 (js/packs/europe.js) ja
   * maailmankartalla 6543,7 / 1142,6 (js/packs/maailmankartta.js), koska
   * Baltian kaupungit on siirretty lounaaseen laudan
   * vähimmäisetäisyyden takia.
   *
   * Projektiopiste veisi vihreän pisteen 45 yksikköä laatasta koilliseen
   * — lähemmäs Tallinnan laattaa (684 / 374) kuin Riian omaa. Piste
   * ottaa siksi kaupungin laattapaikan, ja piirtopuoli siirtää sen
   * koilliseen laatan vierestä (js/fokuspiste.js PISTE_ERO_MIN).
   * Vanhakaupunki on kaupungin keskellä, joten laattapaikka on tässä
   * nimenomaan oikeampi kuin tarkka koordinaatti.
   */
  kohtaamispiste: {
    nimi: 'Vanhankaupungin apteekki',
    laudat: {
      maailmankartta: { x: 6543.7, y: 1142.6 },
      europe: { x: 648, y: 434 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Riian sivupino (js/lehti.js
   * rakennaSivut) on Tallinnan mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Riika", 2 = Vanhakaupunki, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Riian kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: JOULUKUUSI_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SKLANDRAUSIS_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Latvia) ----------
   *
   * UUSI POOLI, EI SIIRTO. Latvia ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KAKSI NOSTOA, JOTTA POOLI VOI VUOROTELLA (omistajan pelitestipalaute
   * v1234: luetun täyn tilalle pitää syttyä uusi). Ensimmäinen on maan
   * KUPLATÄKY eli poolin kärki.
   *
   * MOLEMMAT PISTEET OVAT TODELLISESSA PROJEKTIOSSAAN, kuten Viron
   * Kaali-nosto (js/packs/fokusvirta-tallinna.js). Koska Riian laatta on
   * siirretty lounaaseen (ks. kohtaamispiste yllä), molemmat nostot
   * piirtyvät laatasta pohjoiseen: Kuldīga luoteeseen ja Kolka suoraan
   * pohjoiseen. Suunnat ovat toisiinsa nähden oikein, ja lähin vieras
   * laatta (Tallinna 684 / 374) jää kummastakin yli kolmenkymmenen
   * yksikön päähän.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * MIKSI KULDĪGA: oppitunti kertoo herttuakunnasta, jonka laivat
       * purjehtivat Tobagoon. Tämä on saman herttuan toinen puoli —
       * kotoinen, konkreettinen ja hieman naurettava: mies, joka
       * järjesti kalan pyytämisen ilmasta. Kohde on myös oikea paikka
       * kartalla (Kuldīga, Kuurinmaa).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Venta Rapid": putous on Euroopan levein;
       *     korkeus vaihtelee 1,80–2,20 metrin välillä; sammet katosivat
       *     vuoteen 1892 mennessä ja nykyään pyydetään enimmäkseen
       *     vimpaa, kutuaikana rajoituksin.
       *   - en-Wikipedia "Kuldīga": putous on "Euroopan levein" ja
       *     keväällä voi katsella kalojen hyppyjä kynnyksen yli, mistä
       *     Kuldīga tunnettiin paikkana, "jossa lohi pyydetään ilmasta";
       *     vanha tiilisilta rakennettiin 1874 ja se on lajinsa pisin
       *     Euroopassa, 164 metriä; vanhakaupunki liitettiin Unescon
       *     maailmanperintöluetteloon 2023.
       *   - lv-Wikipedia "Kuldīga": herttua Jaakobin hallituskaudella
       *     1642–1682 kaupunki koki taloudellisen nousun ja sinne
       *     rakennettiin telakoita, salpietari- ja tiilitehtaita; silta
       *     1874; Unesco 2023.
       *
       * LEVEYS ON RIITAINEN, JA SE SANOTAAN ÄÄNEEN. en-Wikipedia antaa
       * leveydeksi 249 metriä (tulvassa 275), lv-Wikipedia 100–110
       * metriä (tulvassa jopa 270). Kyse on siitä, mitataanko koko
       * kynnys vai virtaava osa. Teksti kertoo molemmat luvut eikä
       * valitse, koska kumpaakaan ei voi todeta vääräksi.
       *
       * YHDEN LÄHTEEN TIETO, JA SE ON MERKITTY TEKSTIIN: punotut korit
       * ja kallioon hakatut kalapadot herttua Jaakobin ajalta ovat vain
       * en-Wikipedian "Venta Rapid" -artikkelissa (noin 1640, noin sata
       * suurta pajukoria). Siksi teksti sanoo "kerrotaan" — sitä ei
       * esitetä varmana, ja jos Fable haluaa sen pois, se on yksi virke.
       */
      id: 'ventas-rumba',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Ventas rumba',
      otsikko: 'Euroopan levein vesiputous on kahden metrin korkuinen — ja '
        + 'siitä pyydettiin lohta ilmasta',
      lunastus: [
        'Kuldīgassa Venta-joki valuu kallioportaan yli koko leveydeltään. '
          + 'Putousta sanotaan Euroopan leveimmäksi, ja leveys riippuu '
          + 'siitä, mitä mitataan: lähteet antavat virtaavalle osalle '
          + 'runsaat sata metriä ja koko kynnykselle noin kaksisataa'
          + 'viisikymmentä, tulva-aikaan lähes kolmesataa. Korkeutta on '
          + 'kaikkiaan kaksi metriä. Se on juuri sopiva este: kutuaikaan '
          + 'kalat yrittävät sen yli hypäten, ja Kuldīga tunnettiin '
          + 'kaupunkina, jossa lohi pyydetään ilmasta. Herttua Jaakobin '
          + 'ajalta kerrotaan, että kallioon hakattiin patoja ja putouksen '
          + 'juurelle asetettiin toista sataa suurta pajukoria: se, joka ei '
          + 'jaksanut yli, tuli alas koriin. Sammet katosivat joesta '
          + 'vuoteen 1892 mennessä, ja nykyään pyydetään enimmäkseen '
          + 'vimpaa, kutuaikana rajoituksin.',
        'Kaupunki itse on samaa tarinaa. Herttua Jaakobin hallituskaudella '
          + '1642–1682 Kuldīgaan rakennettiin telakoita, salpietaritehdas '
          + 'ja tiilitehtaita — samat telakat, joilta lähdettiin '
          + 'Gambiajoelle ja Tobagoon. Tiilistä tuli myöhemmin kaupungin '
          + 'tunnetuin rakennus: vuonna 1874 Ventan yli muurattiin '
          + 'tiilisilta, joka on 164 metriä pitkä ja yhä lajissaan '
          + 'Euroopan pisin. Isoisäsi kävi Riiassa vuotta aikaisemmin, '
          + 'joten sitä siltaa ei ollut vielä olemassa hänen matkallaan. '
          + 'Kuldīgan vanhakaupunki liitettiin Unescon '
          + 'maailmanperintöluetteloon vuonna 2023.',
      ],
      lahde: 'en-Wikipedia "Venta Rapid" ja "Kuldīga" sekä lv-Wikipedia '
        + '"Kuldīga"; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 3648×2736, CC BY-SA 4.0, Ymblanter, kuvaus
       * "Venta Rapid in Kuldiga, taken from the left bank of the Venta",
       * otettu 6.8.2018. Restrictions tyhjä. SILMÄTARKISTUS TEHTY: leveä
       * matala putous joen poikki, metsäinen ranta, ei tunnistettavia
       * ihmisiä.
       *
       * LOISTOAIKAKUVAA EI VIELÄ OLE: putous kutuaikaan ja tiilisilta
       * ovat vasta promptinipussa, joten pääkuvaksi jää valokuva.
       * Kun kuva on generoitu, se tulee `osoite`-kenttään ja tämä
       * valokuva siirtyy `valokuva`-kenttään — sama kaava kuin
       * Tallinnan ja Tukholman nostoilla (v1333).
       */
      kuva: {
        tiedosto: 'Venta Rapid from the left bank.jpg',
        selite: 'Ventas rumba on vain parin metrin korkuinen mutta '
          + 'leveimmillään satojen metrien levyinen, ja sitä sanotaan '
          + 'Euroopan leveimmäksi vesiputoukseksi.',
        lahde: 'Ymblanter, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten kala voi hypätä vesiputouksen yli?',
        'Miksi juuri Kuldīgaan rakennettiin telakoita?',
        'Miksi tiilisilta on yhä pystyssä sadanviidenkymmenen vuoden '
          + 'jälkeen?',
      ],
      /*
       * 56,96805556 N / 21,97888889 E — lv-Wikipedia "Ventas rumba",
       * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
       * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin
       * lieriö LEVEYS 12000 / LON0 −175 / POHJOINEN 76
       * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
       * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
       */
      paikka: {
        nimi: 'Kuldīga',
        laudat: {
          maailmankartta: { x: 6566.0, y: 1073.3 },
          europe: { x: 633.2, y: 395.3 },
        },
      },
    },
    {
      /*
       * MIKSI KOLKASRAGS: ensimmäinen nosto on herttuasta ja kaupasta.
       * Tämä on saman rannikon toinen pää — paikka, jossa ei omisteta
       * mitään ja jossa katoaminen on ollut hidasta eikä äkillistä.
       * Se on myös laudan hengähdyskohta: ei kilpajuoksua, ei kätköä.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Cape Kolka": niemi on Kuurinmaan niemimaan
       *     luoteiskärjessä Slīteren kansallispuistossa, ja siinä
       *     kohtaavat Riianlahti, Itämeri ja Irbenin salmi; niemi on
       *     Riianlahden luoteisin piste; hiekkaa kulkeutuu niemeä kohti
       *     700 000–800 000 kuutiometriä vuodessa, josta noin 90
       *     prosenttia kasautuu heti niemen pohjoispuolelle ja vain noin
       *     50 000 kuutiometriä jatkaa Riianlahteen; niemen edustan
       *     rantatasanko jatkuu noin 70 kilometriä rannikkoa pitkin ja on
       *     paikoin kymmenen kilometriä leveä; rannikon kylät Vaide,
       *     Saunags, Pitrags, Košrags ja Sīkrags kuuluvat suojeltuun
       *     Liivinrantaan.
       *   - en-Wikipedia "Livonian language": liivi on uralilainen kieli
       *     ja itämerensuomalaisten kielten eteläinen haara; sitä
       *     puhuttiin aikanaan noin kolmasosassa nykyisen Latvian
       *     aluetta; viimeinen syntyperäinen puhuja Grizelda Kristiņa
       *     kuoli 2. kesäkuuta 2013 103-vuotiaana; nykyään noin 40
       *     ihmistä osaa kieltä B1-tasolla tai paremmin ja noin 210
       *     jonkin verran; Latvian yliopiston liiviläisinstituutti
       *     perustettiin 2018; vuonna 2020 syntyi lapsi, jonka
       *     ensikieleksi liivi opetettiin.
       *
       * MITÄ EI SANOTA: hylkyjä eikä haaksirikkoja. Niemen maine on
       * niissä, mutta lähde ei käsittele niitä, joten teksti ei väitä
       * niistä mitään.
       */
      id: 'kolkasrags',
      nimio: 'Kolkasrags',
      otsikko: 'Niemi, jossa kaksi merta lyö vastakkain — ja kieli, jolla '
        + 'oli lopulta enää yksi puhuja',
      lunastus: [
        'Kuurinmaan niemimaan luoteiskärjessä, Slīteren kansallispuistossa, '
          + 'on hiekkaniemi, jonka toisella puolella on Itämeri ja toisella '
          + 'Riianlahti. Aallot tulevat kahdesta suunnasta ja lyövät '
          + 'vastakkain kärjen kohdalla, ja veden alla niemi jatkuu '
          + 'matalikkona pitkälle ulapalle. Hiekka on liikkeessä: sitä '
          + 'kulkeutuu niemeä kohti vuodessa seitsemän–kahdeksansataatuhatta '
          + 'kuutiometriä, mutta noin yhdeksän kymmenesosaa '
          + 'kasautuu heti niemen pohjoispuolelle ja vain viisikymmentä'
          + 'tuhatta kuutiota jatkaa lahden puolelle. Kärki siis rakentaa '
          + 'itseään koko ajan, mutta hitaammin kuin näyttää. Rantatasanko '
          + 'jatkuu noin seitsemänkymmentä kilometriä rannikkoa pitkin ja '
          + 'on paikoin kymmenen kilometriä leveä.',
        'Rannalla on kylärivi, jonka nimet eivät ole latviaa: Vaide, '
          + 'Saunags, Pitrags, Košrags, Sīkrags. Ne kuuluvat suojeltuun '
          + 'Liivinrantaan, ja niissä puhuttiin liiviä — uralilaista '
          + 'kieltä, itämerensuomalaisten kielten eteläisintä haaraa, siis '
          + 'suomen ja viron sukua. Aikoinaan sitä puhuttiin noin '
          + 'kolmasosassa nykyisen Latvian aluetta. Viimeinen syntyperäinen '
          + 'puhuja Grizelda Kristiņa kuoli kesäkuun toisena päivänä 2013 '
          + '103-vuotiaana. Tarina olisi tähän valmis, mutta se ei ole. '
          + 'Nykyään noin neljäkymmentä ihmistä osaa liiviä B1-tasolla tai '
          + 'paremmin ja parisataa jonkin verran; Latvian yliopistoon '
          + 'perustettiin 2018 liiviläisinstituutti; ja vuonna 2020 syntyi '
          + 'lapsi, jolle liivi opetettiin ensimmäiseksi kieleksi. Kieli '
          + 'menetti viimeisen puhujansa ja sai sitten uuden.',
      ],
      lahde: 'en-Wikipedia "Cape Kolka" ja "Livonian language", johdannot '
        + 'sekä osiot rannikon kylistä ja kielen elvytyksestä; tarkistettu '
        + '29.8.2026.',
      /*
       * Commons 29.8.2026: 3600×2208, CC BY 4.0, acediscovery, kuvaus
       * "Aerial photograph of Cape Kolka in Latvia, photographed in June
       * 2011". Restrictions tyhjä. SILMÄTARKISTUS TEHTY: ilmakuva
       * niemenkärjestä ja sen jatkeena olevasta matalikosta, ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: ilmasta näkyy se, mitä rannalta ei voi
       * nähdä — että niemi jatkuu veden alla. Se on nostoluvun ydin.
       */
      kuva: {
        tiedosto: 'Cape Kolka aerial photograph.jpg',
        selite: 'Kolkan niemellä kohtaavat Itämeri ja Riianlahti, ja niemi '
          + 'jatkuu veden alla matalikkona kauas ulapalle.',
        lahde: 'acediscovery, Wikimedia Commons (CC BY 4.0)',
      },
      kysymykset: [
        'Miksi aallot tulevat Kolkan kärjessä kahdesta suunnasta?',
        'Mille kielille liivi on sukua?',
        'Voiko kielen elvyttää sen jälkeen, kun viimeinen puhuja on '
          + 'kuollut?',
      ],
      /*
       * 57,75894444 N / 22,60475 E — en-Wikipedia "Cape Kolka",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin edellä.
       */
      paikka: {
        nimi: 'Kolkasrags',
        laudat: {
          maailmankartta: { x: 6586.8, y: 1035.5 },
          europe: { x: 645.2, y: 374.5 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Kuramaan herttuan
   * aarre eli herttua Jaakob Kettlerin kadonnut kassa
   * (js/packs/paikallisaarteet.js, LVA). Merkintä aukeaa, kun aarre
   * löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Täkäläiset kertovat herttuasta, jolla oli kerran oma laivasto '
      + 'ja siirtomaita saarilla asti — pieni maa, jolla oli suuret '
      + 'purjeet. Herttuan rikkauksista puhutaan yhä: mitä laivoihin '
      + 'lastattiin, kaikki ei ole kirjanpidossa. Pienen herttuakunnan '
      + 'suuri aarre on juuri sellainen, jonka historia hukkaa mielellään.',
  },
};
