/*
 * TALLINNAN FOKUSVIRTA — annostelun sisältö dataksi.
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
 * ISO AARRE: hansakauppiaan hopeakätkö seinän sisässä (aarremerkintä).
 *
 * FAKTAPOHJA. Aallon 3 maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Viron maalehden nostot
 *      (js/packs/maa-kategoriat.js, EST/arki) ja Tallinnan
 *      kaupunkilehden omat nostot (js/packs/kulttuuri-kategoriat.js,
 *      tallinna). Nämä on jo kertaalleen tarkistettu ja hyväksytty
 *      peliin — myös niiden KUVAT, jotka tämä paketti lainaa
 *      sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN, RAJATTU JA TÄSSÄ MAASSA VÄLTTÄMÄTÖN.
 * Viron maalehdessä on vain kaksi nostoa (kama ja henkilökortti), joten
 * kolmas täky on pakko ottaa kaupunkilehden puolelta. Se on
 * "Epäluulon torni" sivulta 2, ja se on valittu tarkoituksella:
 * sivun 2 nimetty lehtitehtävä kysyy saman sivun TOISESTA nostosta
 * (Olevisten salamat), joten sama sivu ei tule luetuksi kahdesti samasta
 * kohdasta.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, tallinna/avauskuvat).
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
 * SISÄLTÖ ON LEHDEN OMAA. Salamakysymys on Tallinnan lehden sivun 2
 * ("Vanha kaupunki") oman noston "Salama löytää saman tornin yhä
 * uudestaan" tekstiä ja laulujuhlakysymys sivun 1 ("Tallinna") oman
 * noston "Laulukaari täyttyy viiden vuoden välein" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI TUULIVIIRIKYSYMYSTÄ: kaupungin laattakysymys koskee Vana
 * Toomasin tarua (js/tyohuone-kehitys-data.js KAARI_PAKETIT, tallinna).
 * Jos lehden aarteen avaava tehtävä kysyisi samasta, kysymys olisi
 * ratkaistu ennen kuin Kristjan on tavattu.
 */
const SALAMA_VISA = {
  kysymys: 'Olevisten kirkon torni on Viron korkein kirkontorni. Mistä se '
    + 'on kaupungissa erityisen tunnettu?',
  vaihtoehdot: [
    'Salama on sytyttänyt tai vaurioittanut sitä ainakin yhdeksän kertaa',
    'Se kallistuu vuosi vuodelta enemmän länteen',
    'Sen kello on käynyt pysähtymättä 1600-luvulta asti',
  ],
  oikea: 0,
  fakta: 'Kesäkuun yönä 1820 palo kesti neljä tuntia ja söi koko '
    + 'sisustuksen. Loimun kerrotaan näkyneen Helsinkiin asti, ja uusi '
    + 'torninhuippu valmistui vasta 20 vuotta myöhemmin.',
};

const LAULUJUHLA_VISA = {
  kysymys: 'Syyskuussa 1988 Tallinnan laulukentälle kokoontui arviolta '
    + '300 000 ihmistä laulamaan lauluja, joita ei silloin saanut laulaa '
    + 'julkisesti. Minkä nimen tapahtumaketju sai?',
  vaihtoehdot: [
    'Laulava vallankumous',
    'Suuri kuorojuhla',
    'Kentän yö',
  ],
  oikea: 0,
  fakta: 'Viron laulujuhlia on pidetty vuodesta 1869, ja laulukentälle '
    + 'kokoonnutaan viiden vuoden välein. Laulukaaren lavalle mahtuu noin '
    + '15 000 laulajaa ja kentälle jopa 100 000 kuulijaa.',
};

export const FOKUSVIRTA_TALLINNA = {
  kaupunki: 'tallinna',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Rautatie on merkinnän oma aihe:
     * Tallinna–Pietari-rata avattiin 1870, kolme vuotta ennen isoisän
     * käyntiä (päätoimittajan historia-ankkuri tähän erään).
     */
    paikkarivi: 'Reval, syksyllä 1873. Satamasta asemalle on lyhyempi matka '
      + 'kuin kolme vuotta sitten uskoi kukaan.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Revalissa laiva purki lastinsa aamulla, ja juna vei sen '
      + 'Pietariin ennen iltaa — uusi rata on tehnyt vanhasta '
      + 'hansakaupungista taas portin. Yläkaupungin muurit muistavat '
      + 'vanhemmat kauppiaat.',
    luenta: '[curious] Revalissa laiva purki lastinsa aamulla, ja juna vei '
      + 'sen Pietariin ennen iltaa — [softly] uusi rata on tehnyt vanhasta '
      + 'hansakaupungista taas portin. [whispers] Yläkaupungin muurit '
      + 'muistavat vanhemmat kauppiaat.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — VÄLITTÄJÄOTE JA SUKUYLPEYS (Raamattu, "LIVIA
     * AIKASIIRTYMÄN VÄLITTÄJÄNÄ" ja "LIVIA TUURAAJANA"). Merkintä on
     * kevyt ja teknistä ihmettelyä täynnä, joten pariperiaate sallii
     * kevyemmän otteen: Livia ottaa nopeuden omakseen, koska nopeus on
     * hänen sukunsa ammatti.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1)
     * Tallinna–Pietari-rata avattiin 1870, kolme vuotta ennen isoisän
     * käyntiä (päätoimittajan historia-ankkuri). (2) Viro oli vuonna
     * 2005 maailman ensimmäinen maa, jossa sai äänestää vaaleissa
     * internetissä (pelidata: js/packs/maa-kategoriat.js, EST/arki).
     * (3) Vuoden 2023 parlamenttivaaleissa yli puolet äänistä annettiin
     * verkossa (sama nosto).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kuule", "mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kuule, tämä on nyt sellainen kohta, jossa minun täytyy '
      + 'sanoa jotain suvun puolesta. Se rata avattiin vuonna 1870, kolme '
      + 'vuotta ennen isoisäsi käyntiä, ja siitä hetkestä alkaen lasti oli '
      + 'aamulla laiturilla ja illalla Pietarissa. Ennen sitä nopein tapa '
      + 'saada viesti perille oli minun sukuni. Nyt sama matka tehdään '
      + 'ilman että kukaan lähtee mihinkään: Viro oli vuonna 2005 '
      + 'maailman ensimmäinen maa, jossa sai äänestää vaaleissa '
      + 'internetissä, ja vuonna 2023 yli puolet äänistä annettiin '
      + 'verkossa. Meiltä vietiin ensin työ ja sitten koko ammatti. Mut '
      + 'kyllä minä sen kestän.',
    /*
     * Huomio viittaa herokuvan kohteeseen (kaupunginmuuri). Faktat ovat
     * lehden oman avauskuvan selitteestä (js/packs/kulttuuri-kategoriat.js,
     * tallinna/avauskuvat): muuria oli parhaimmillaan 2,4 kilometriä ja
     * siinä 46 tornia; nykyään muuria on jäljellä noin 1,9 kilometriä ja
     * torneista pystyssä 20.
     *
     * TÄMÄ POHJUSTAA AARREMERKINNÄN: merkintä puhuu muurista, joka
     * muistaa vanhemmat kauppiaat, ja aarre on seinän sisässä.
     */
    teksti: 'Katso ensin tonne muurin suuntaan. Sitä oli parhaimmillaan '
      + 'kaksi ja puoli kilometriä ja siinä oli neljäkymmentäkuusi tornia; '
      + 'nykyään muuria on jäljellä noin yhdeksäntoista sadan metrin verran '
      + 'ja torneja kaksikymmentä. Se on Pohjois-Euroopan parhaiten '
      + 'säilyneitä keskiaikaisia kaupunginmuureja — eikä se ole jäänyt '
      + 'pystyyn vahingossa. Muuri on paksu siksi, että sen sisällä oli '
      + 'jotain, mikä kannatti pitää tallessa.',
    kuva: {
      ampari: 'herokoe/hero-tallinna-kaupunginmuuri.jpg',
      selite: 'Tallinnan kaupunginmuuria oli parhaimmillaan 2,4 kilometriä '
        + 'ja siinä 46 tornia; nykyään muuria on jäljellä noin 1,9 '
        + 'kilometriä ja torneista pystyssä 20.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä on lastista, joka liikkuu nopeasti.
       * Tämä on saman maan eväs, joka on tehty liikkumista varten — ruoka,
       * joka on valmis minuutissa eikä pilaannu matkalla.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, EST/arki, nosto "Kamaa ei
       * keitetä ollenkaan" (jo hyväksyttyä pelidataa) — paahdettua
       * ohraa, ruista, kauraa ja hernettä; ei kypsennetä lainkaan; jauho
       * vatkataan piimään ja päälle marjoja; säilyi kuukausia; pellolle ja
       * merimatkalle sopiva eväs; nykyään myös jälkiruokavaahtoa.
       *
       * LISÄTIETO (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä): kama on Baltian ruokalaji eikä vain
       * virolainen, ja sen pohja on paahdetuista viljoista jauhettu seos,
       * joka sekoitetaan kypsentämättä maitoon tai piimään. Lähteinä pelin
       * oma, jo hyväksytty kuvateksti (js/packs/maa-kategoriat.js, EST) ja
       * et-Wikipedian artikkeli "Kama", jotka kertovat saman.
       */
      id: 'kama',
      nappi: 'Aamiainen, jota ei kypsennetä lainkaan',
      otsikko: 'Kama',
      teksti: 'Kamajauho on sekoitus paahdettua ohraa, ruista, kauraa ja '
        + 'hernettä, ja sen koko idea on siinä, mitä sille EI tehdä: sitä '
        + 'ei kypsennetä lainkaan. Jauho vatkataan piimään, päälle pannaan '
        + 'marjoja, ja aamiainen on valmis minuutissa. Tämä ei ole '
        + 'laiskuutta vaan vanhaa logistiikkaa. Paahdettu jauho säilyi '
        + 'ennen kuukausia pilaantumatta, joten se oli juuri se eväs, joka '
        + 'kesti pellolla koko päivän ja laivassa koko matkan — kevyt '
        + 'kantaa, ei tarvitse tulta, ei mene hapoille. Kama on Baltian '
        + 'ruokalaji eikä vain virolainen, ja sen suku ulottuu meren yli '
        + 'moneen suuntaan. Nykyään siitä vatkataan myös jälkiruokavaahtoa, '
        + 'mikä on saman aineen toinen ura: eväästä tuli jälkiruoka, kun '
        + 'kukaan ei enää tarvinnut evästä.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto EST/arki,
       * js/packs/maa-kategoriat.js). Commons 29.8.2026: CC BY-SA 3.0,
       * Mmh. SILMÄTARKISTUS tehty: kulhollinen kamaa, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Kama.jpg',
        selite: 'Kama on Baltian ruokalaji, jonka pohjana on paahdetuista '
          + 'ohrasta, rukiista ja kaurasta jauhettu seos ja joka '
          + 'sekoitetaan kypsentämättä maitoon tai piimään.',
        lahde: 'Mmh, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miksi paahdettu kamajauho oli hyvä eväs merimatkalle?',
        vaihtoehdot: [
          'Se säilyi kuukausia pilaantumatta eikä vaatinut tulta',
          'Se ei painanut mitään kastuneenakaan',
          'Se pysyi kylmänä kuumassakin ruumassa',
        ],
        oikea: 0,
        fakta: 'Jauho vatkataan piimään ja päälle pannaan marjoja, joten '
          + 'aamiainen on valmis minuutissa. Nykyään kamasta vatkataan myös '
          + 'jälkiruokavaahtoa.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ydin on nopeus — lasti aamulla,
       * Pietari illalla. Tämä on saman idean nykyinen pää: valtio, jonka
       * asiointi kulkee kortilla eikä laivalla.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, EST/arki, nosto "Valtio
       * mahtuu muovikorttiin" (jo hyväksyttyä pelidataa) — vuonna 2005
       * maailman ensimmäinen maa, jossa sai äänestää vaaleissa
       * internetissä; tunnistautuminen sirullisella henkilökortilla;
       * vuoden 2023 parlamenttivaaleissa yli puolet äänistä verkossa;
       * samalla kortilla resepti, sopimus ja yrityksen perustaminen;
       * kortti pakollinen 15 ikävuodesta alkaen.
       *
       * LISÄTIETO (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä): e-residenttiohjelma alkoi 1.
       * joulukuuta 2014 ja antaa ulkomaalaisille sirukortin, jolla voi
       * allekirjoittaa asiakirjoja ja perustaa yrityksen. Lähteinä pelin
       * oma, jo hyväksytty kuvateksti (js/packs/maa-kategoriat.js, EST) ja
       * en-Wikipedian artikkeli "e-Residency of Estonia", jotka kertovat
       * saman.
       */
      id: 'e-valtio',
      nappi: 'Valtio, joka mahtuu muovikorttiin',
      otsikko: 'Sirukortti ja ääni',
      teksti: 'Viro oli vuonna 2005 maailman ensimmäinen maa, jossa sai '
        + 'äänestää vaaleissa internetissä. Äänestäjä tunnistautuu '
        + 'sirullisella henkilökortilla, joka on pakollinen jokaiselle '
        + 'virolaiselle viidestätoista ikävuodesta alkaen. Vuoden 2023 '
        + 'parlamenttivaaleissa yli puolet äänistä annettiin verkossa. '
        + 'Sama kortti ei ole vain äänestyskortti: sillä haetaan resepti '
        + 'apteekista, allekirjoitetaan sopimus ja perustetaan yritys. '
        + 'Ja sitten on vielä yksi kerros. Joulukuun ensimmäisenä päivänä '
        + '2014 alkoi e-residenttiohjelma, joka antaa saman sirukortin '
        + 'myös ulkomaalaiselle, joka ei asu maassa lainkaan — hän voi '
        + 'allekirjoittaa asiakirjoja ja perustaa yrityksen käymättä '
        + 'koskaan paikalla. Se on sama vanha hansa-ajatus uudessa '
        + 'muodossa: kaupankäynti ei vaadi läsnäoloa, se vaatii vain '
        + 'luotettavan tavan todistaa, kuka olet.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto EST).
       * Commons 29.8.2026: CC BY 2.0, Masayuki (Yuki) Kawagishi.
       * SILMÄTARKISTUS tehty: kortti pöydällä, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'E-Residency card.jpg',
        selite: 'Viron e-residenttiohjelma alkoi 1. joulukuuta 2014, ja se '
          + 'antaa ulkomaalaisille sirukortin, jolla voi allekirjoittaa '
          + 'asiakirjoja ja perustaa yrityksen.',
        lahde: 'Masayuki (Yuki) Kawagishi, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Missä vaaleissa Viro oli maailman ensimmäinen maa, jossa '
          + 'sai äänestää internetissä?',
        vaihtoehdot: [
          'Vuoden 2005 vaaleissa',
          'Vuoden 1991 vaaleissa',
          'Vuoden 2014 vaaleissa',
        ],
        oikea: 0,
        fakta: 'Vuoden 2023 parlamenttivaaleissa yli puolet äänistä '
          + 'annettiin verkossa. Sirullinen henkilökortti on pakollinen '
          + 'jokaiselle virolaiselle 15 ikävuodesta alkaen.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkintä sanoo "yläkaupungin muurit muistavat".
       * Tämä kertoo, ketä vastaan ne muistivat — ja se on kaupungin oma
       * sisäinen raja, ei ulkoinen vihollinen.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, tallinna/historia,
       * nosto "Epäluulon torni tähtää ylämäkeen" (jo hyväksyttyä
       * pelidataa) — kaksi kaupunkia, Toompea herroineen ja lakeineen,
       * alhaalla kauppiaiden kaupunki raateineen, yhdistettiin vasta 1878,
       * ylös pääsi vain Pitkää jalkaa ja Lyhyttä jalkaa, kummankin päässä
       * porttitorni, Lyhyen jalan torniin hakattiin 1400-luvulla
       * ampuma-aukkoja jotka osoittavat ylös, ontuva kaupunki.
       *
       * PÄÄLLEKKÄISYYS ON PERUSTELTU (ks. tiedoston alku): Viron
       * maalehdessä on vain kaksi nostoa, joten kolmas täky on otettava
       * kaupunkilehden puolelta.
       */
      id: 'kaksi-kaupunkia',
      nappi: 'Torni, joka tähtää omaan kaupunkiin',
      otsikko: 'Pitkä jalka ja lyhyt jalka',
      teksti: 'Tallinna oli vuosisatoja kaksi kaupunkia. Mäen päällä oli '
        + 'Toompea omine herroineen ja lakeineen, alhaalla kauppiaiden '
        + 'kaupunki omine raateineen — ja ne yhdistettiin vasta vuonna '
        + '1878, viisi vuotta isoisäsi käynnin JÄLKEEN. Hän käveli siis '
        + 'kahdessa kaupungissa luullen kävelevänsä yhdessä. Ylös pääsi '
        + 'vain kahta katua, Pitkää jalkaa ja Lyhyttä jalkaa, ja kummankin '
        + 'päässä oli porttitorni. Ja tässä on se kohta, joka kertoo '
        + 'suhteesta enemmän kuin yksikään asiakirja: Lyhyen jalan torniin '
        + 'hakattiin 1400-luvulla ampuma-aukkoja, jotka osoittavat YLÖS '
        + 'Toompealle. Ne eivät siis ole vihollista vaan naapuria varten. '
        + 'Tornia on siksi kutsuttu Epäluulon torniksi. Kahden eripituisen '
        + 'jalan takia Tallinnaa sanotaan leikillään ontuvaksi '
        + 'kaupungiksi.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto
       * tallinna/historia). Commons 29.8.2026: CC BY-SA 3.0, NOSSER.
       * SILMÄTARKISTUS tehty: porttitorni kadun päässä, ei
       * tunnistettavia kasvoja.
       */
      kuva: {
        tiedosto: 'Lühikese Jala värav.JPG',
        selite: 'Lyhyen jalan porttitorniin hakattiin 1400-luvulla '
          + 'ampuma-aukkoja, jotka osoittavat ylös Toompealle — siksi sitä '
          + 'on kutsuttu Epäluulon torniksi.',
        lahde: 'NOSSER, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Mihin suuntaan Lyhyen jalan porttitornin ampuma-aukot '
          + 'osoittavat?',
        vaihtoehdot: [
          'Ylös Toompealle, siis omaan kaupunkiin',
          'Merelle, satamaan päin',
          'Alas kauppiaiden torille',
        ],
        oikea: 0,
        fakta: 'Yläkaupunki Toompea ja alakaupunki yhdistettiin vasta '
          + 'vuonna 1878. Kahden eripituisen kadun takia Tallinnaa '
          + 'sanotaan leikillään ontuvaksi kaupungiksi.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, tallinna): minkä kilpailun nuori Toomas tarun mukaan
   * voitti. Visasääntö täyttyy — vastaus on tekstissä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT: js/packs/kulttuuri-kategoriat.js, tallinna/kaupunki, nosto
   * "Sama vartija on kääntynyt tuulessa vuodesta 1530" (jo hyväksyttyä
   * pelidataa) — kaupungin tilikirjan merkintä vuodelta 1530, maalari
   * Joachim sai palkkion raadin tuuliviirin kultaamisesta, sotilaaksi
   * puettu hahmo 64 metrin korkeudessa, vuoden 1944 pommituksessa
   * vaurioitui, vaskiseppä Vello Rooveerin vuonna 1996 takoma kopio,
   * alkuperäinen museossa.
   *
   * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
   * riippumattomasta lähteestä):
   *   - et-Wikipedia "Vana Toomas": tuuliviiri on ollut raatihuoneen
   *     tornin huipulla vuodesta 1530; siihen liittyvä taru kertoo
   *     köyhästä esikaupungin pojasta, joka osui kevätjuhlan
   *     jousiammuntakilpailussa tankoon asetettuun puiseen papukaijaan
   *     ennen kaupungin herrasmiehiä; palkintoa hän ei saanut, koska hän
   *     ei ollut kilpailun jäsen, mutta hänet otettiin kaupungin
   *     palvelukseen vartijaksi.
   *   - en-Wikipedia "Tallinn Town Hall" -artikkelin torniosio, joka
   *     toistaa saman vuosiluvun 1530 ja saman hahmon nimen.
   *
   * MITÄ EI KERROTA FAKTANA: itse taru. Se sanotaan taruksi joka kerta,
   * koska lähdekin sanoo sen taruksi.
   */
  oppitunti: {
    otsikko: 'Vartija, joka ei ole koskaan poistunut paikaltaan',
    teksti: 'Isoisäsi sanoi, että muurit muistavat. Yksi kaupungin muistoista '
      + 'seisoo ylhäällä ja kääntyy tuulen mukana. Raatihuoneen tornin '
      + 'huipulla on tuuliviiri, jota kutsutaan nimellä Vana Toomas, ja sen '
      + 'ikä tiedetään tarkasti, koska se on kirjanpidossa: kaupungin '
      + 'tilikirjassa on merkintä vuodelta 1530, jossa maalari Joachim saa '
      + 'palkkion raadin tuuliviirin kultaamisesta. Siitä asti sotilaaksi '
      + 'puettu hahmo on kääntynyt tuulen mukana kuudenkymmenenneljän metrin '
      + 'korkeudessa. Nimi tulee tarusta. Sen mukaan kaupungin herrasmiehet '
      + 'pitivät joka kevät kilpailun, jossa ammuttiin jousella tankoon '
      + 'asetettua puista papukaijaa — ja eräänä keväänä osuman teki ennen '
      + 'kaikkia muita köyhä esikaupungin poika nimeltä Toomas. Palkintoa '
      + 'hän ei saanut, koska hän ei ollut kilpailun jäsen. Sen sijaan hänet '
      + 'otettiin kaupungin palvelukseen vartijaksi, ja siinä työssä hän '
      + 'tarun mukaan pysyi loppuun asti. Tuuliviiri sai hänen nimensä. '
      + 'Vuoden 1944 pommituksessa se vaurioitui, ja tornissa kääntyy nyt '
      + 'vaskiseppä Vello Rooveerin vuonna 1996 takoma kopio; alkuperäinen '
      + 'seisoo museossa sisällä, ensimmäistä kertaa viiteensataan vuoteen '
      + 'paikallaan.',
    /*
     * Kuva on pelin omasta aineistosta (sama tiedosto
     * tallinna/kaupunki). Commons 29.8.2026: CC BY-SA 4.0, Kynnap.
     * SILMÄTARKISTUS tehty: tuuliviirihahmo museossa, ei ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se näyttää alkuperäisen, joka on nyt
     * sisällä — sama asia, jonka oppitunnin viimeinen lause kertoo.
     */
    kuva: {
      tiedosto: 'Vana Toomas (anno 1530) Tallinna raekojas (2013).jpg',
      selite: 'Alkuperäinen Vana Toomas vaurioitui vuoden 1944 '
        + 'pommituksessa, ja raatihuoneen tornissa kääntyy nyt vuonna 1996 '
        + 'taottu kopio.',
      lahde: 'Kynnap, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'tallinna'):
   * tornimestari Kristjan rasvaa Vana Toomasin laakerit ja nousee
   * torniin joka myrskyn jälkeen. Tämä kortti ei kertaa Kristjanin
   * repliikkiä eikä paljasta vastausta.
   *
   * TALLINNAN VANHA KOHTAAMINEN JÄÄ ENNALLEEN (js/packs/kohtaamiset.js):
   * sama Kristjan kahdella pinnalla, ei kahta lupausta samasta ovesta.
   */
  kohtaaminen: {
    hahmo: 'Tornimestari Kristjan',
    nappi: 'Tapaa tornimestari',
    teksti: 'Kristjan nousee torniin joka myrskyn jälkeen katsomaan, että '
      + 'vartija kääntyy yhä. Hän kantaa öljykannua ja tietää portaiden '
      + 'määrän ulkoa, koska on laskenut ne kerran eikä ole nähnyt syytä '
      + 'laskea uudelleen. Kaupungin kirjanpito on hänelle tuttua lukemista: '
      + 'siellä on merkitty myös ne päivät, joina tuuli teki jotain, mitä '
      + 'sen ei olisi pitänyt tehdä. Ennen kuin hän avaa kirjauksen, hän '
      + 'haluaa tietää, tunteeko vieras tornin oman tarun.',
    vihjeOsio: 'kaupunki',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: RAATIHUONEEN TORNI. Kaaren teksti asettaa
   * Kristjanin tornin portaisiin, ja pelin oma Tallinna-aineisto
   * osoittaa saman paikan (js/packs/kulttuuri-kategoriat.js,
   * tallinna/kaupunki).
   *
   * KOORDINAATIT LUETAAN LAUDALTA EIKÄ PROJEKTIOSTA — POIKKEUS, JOKA
   * PITÄÄ PERUSTELLA. Raatihuoneen todellinen paikka on 59,43709167 N /
   * 24,74546944 E, joka Euroopan laudan kaavalla (x = (lon + 11) × 19,2,
   * y = (72 − lat) × 26,3) osuisi pisteeseen 686,3 / 330,4. Tallinnan
   * LAATTA on kuitenkin laudalla kohdassa 684 / 374, koska kaupunki on
   * siirretty etelämmäksi Helsingin (688 / 303) tieltä — Euroopan lauta
   * vaatii kaupunkien väliksi 60 pikseliä (minCityDistance), ja
   * tosipaikallaan Tallinna olisi 27 pikselin päässä Helsingistä. Sama
   * siirto on maailmankartalla (laatta 6654,2 / 1034,5, projektio
   * 6658,2 / 953,6).
   *
   * Projektiokoordinaatti veisi siis vihreän pisteen 44 yksikköä laatasta
   * pohjoiseen — keskelle Suomenlahtea, lähemmäs Helsinkiä kuin
   * Tallinnaa. Piste ottaa siksi kaupungin oman laattapaikan, ja
   * piirtopuoli siirtää sen koilliseen laatan vierestä (js/fokuspiste.js
   * PISTE_ERO_MIN). Raatihuone on kaupungin keskellä, joten laattapaikka
   * on tässä nimenomaan oikeampi kuin tarkka koordinaatti.
   */
  kohtaamispiste: {
    nimi: 'Raatihuoneen torni',
    laudat: {
      maailmankartta: { x: 6654.2, y: 1034.5 },
      europe: { x: 684, y: 374 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Tallinnan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Tallinna",
   * 2 = Vanha kaupunki, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Tallinnan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: SALAMA_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: LAULUJUHLA_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Viro) ----------
   *
   * UUSI POOLI, EI SIIRTO. Viro ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia.
   *
   * MIKSI KAALI: aarremerkintä kertoo hopeasta, joka on piilotettu
   * seinään, ja isoisä jättää sen rauhaan. Tämä on saman maan
   * vastakohta — kohde, jota kukaan ei piilottanut ja jonka syntyä
   * katsottiin: taivaalta tullut kraatteri asutulla alueella. Kohde on
   * myös oikea paikka kartalla (Saarenmaa).
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Kaali crater" (johdanto ja osiot "Formation",
       *     "Effects", "Kaali as a cult site"): Saarenmaan Kaalin kylässä
       *     on yhdeksän törmäyskraatteria; kyseessä on yksi harvoista
       *     törmäyksistä, jotka ovat osuneet ASUTULLE alueelle; meteori
       *     hajosi viiden ja kymmenen kilometrin korkeudella ja putosi
       *     palasina, joista suurin teki 110 metriä leveän ja 22 metriä
       *     syvän kraatterin; kahdeksan pienempää kraatteria on
       *     halkaisijaltaan 12–40 metriä ja syvyydeltään 1–4 metriä, ja
       *     ne ovat kaikki kilometrin säteellä; törmäysenergia oli noin
       *     80 terajoulea eli suunnilleen Hiroshiman pommin luokkaa, ja
       *     metsä paloi kuuden kilometrin säteellä; iso kraatteri on nyt
       *     järvi; meteoriittinen alkuperä osoitettiin lopullisesti vasta
       *     Ivan Reinvaldin tutkimuksissa 1928, 1933 ja 1937 — sitä ennen
       *     syntyä selitettiin tulivuoritoiminnalla ja karstilla.
       *   - et-Wikipedia "Kaali kraater", prop=coordinates ja artikkelin
       *     omat mitat, jotka toistavat saman kraatterin koon ja
       *     sijainnin.
       *
       * MITÄ EI KERROTA FAKTANA: törmäyksen tarkka ikä. Lähde antaa
       * arviot, jotka poikkeavat toisistaan tuhansia vuosia, joten se
       * sanotaan arvioksi eikä vuosiluvuksi.
       */
      id: 'kaali',
      nimio: 'Kaalin kraatteri',
      otsikko: 'Taivaalta tuli kivi asutun kylän päälle, ja kesti '
        + 'kaksisataa vuotta ennen kuin kukaan uskoi sen',
      lunastus: [
        'Saarenmaan Kaalissa on kuoppa, joka on täynnä vettä. Se on 110 '
          + 'metriä leveä ja 22 metriä syvä, ja sen ympärillä on kahdeksan '
          + 'pienempää, halkaisijaltaan kahdestatoista neljäänkymmeneen '
          + 'metriin — kaikki kilometrin säteellä. Ne syntyivät samana '
          + 'hetkenä. Meteori hajosi viiden ja kymmenen kilometrin '
          + 'korkeudella ja putosi palasina, ja törmäysenergia oli noin '
          + 'kahdeksankymmentä terajoulea eli suunnilleen sitä luokkaa kuin '
          + 'Hiroshiman pommi. Metsä paloi kuuden kilometrin säteellä.',
        'Poikkeuksellista ei ole kraatteri vaan yleisö. Useimmat '
          + 'törmäykset osuvat aavikolle, merelle tai jäätikölle; tämä osui '
          + 'alueelle, jolla asuttiin. Joku näki sen, ja jotkut selvisivät. '
          + 'Ajankohdan arviot vaihtelevat tuhansia vuosia, joten sitä ei '
          + 'kannata sanoa vuosilukuna — mutta paikka on ollut pitkään '
          + 'pyhä, ja kraatterin ympäriltä on kaivettu merkkejä siitä, että '
          + 'sinne tultiin. Tiede tuli perässä hitaasti: vielä 1900-luvun '
          + 'alussa syntyä selitettiin tulivuorilla ja kalkkikiven '
          + 'liukenemisella, ja meteoriittinen alkuperä osoitettiin '
          + 'lopullisesti vasta Ivan Reinvaldin tutkimuksissa vuosina 1928, '
          + '1933 ja 1937.',
      ],
      lahde: 'en-Wikipedia "Kaali crater", johdanto sekä osiot syntymästä, '
        + 'vaikutuksista ja kulttipaikasta; tarkistettu 29.8.2026.',
      /*
       * PÄÄKUVA. Virolla ei ole pelidatassa kraatterikuvaa, joten
       * nostolle jää maan oma, jo hyväksytty kartta-aineisto: Joan
       * Blaeun vuoden 1667 Livonia-kartta, joka näyttää saman saaren
       * siihen aikaan, kun kraatteria pidettiin vielä järvenä.
       * Commons 29.8.2026: public domain, Joan Blaeu. SILMÄTARKISTUS
       * tehty: vanha kartta, ei ihmisiä.
       *
       * LOISTOAIKAKUVAA EI VIELÄ OLE (ks. sama huomautus Tukholmassa):
       * kraatterijärvi ja palanut metsä ovat promptinipussa.
       */
      kuva: {
        tiedosto: 'Livonia, Vulgo Lyefland - Atlas Maior, vol 2, map 10 - Joan Blaeu, 1667 - BL 114.h(star).2.(10).jpg',
        selite: 'Joan Blaeun vuoden 1667 kartta Liivinmaasta: Saarenmaa on '
          + 'siinä jo tarkasti piirretty, mutta kraatterijärvi on vain '
          + 'järvi muiden joukossa.',
        lahde: 'Joan Blaeu, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi Kaalin kraatteri on poikkeuksellinen?',
        'Miten meteoriitin törmäys voidaan tunnistaa jälkeenpäin?',
        'Miksi kraatterin ikää ei tiedetä tarkasti?',
      ],
      /*
       * 58,372778 N / 22,669444 E — et-Wikipedia "Kaali kraater",
       * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
       * samat vakiot kuin fokuskohteilla.
       */
      paikka: {
        nimi: 'Kaali',
        laudat: {
          maailmankartta: { x: 6589.0, y: 1005.8 },
          europe: { x: 646.5, y: 358.4 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: hansakauppiaan
   * hopeakätkö seinän sisässä. Merkintä aukeaa, kun aarre löytyy
   * (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Raatihuoneen vahtimestari kertoi, että vanhoista taloista '
      + 'löytyy yhä hopeaa seinien sisästä — hansakauppias ei luottanut '
      + 'pankkiin vaan muuriin. Koputin yhtä seinää ja jätin sen rauhaan: '
      + 'kätkön suoja on talo, eikä taloa pureta uteliaan takia.',
  },
};
