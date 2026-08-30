/*
 * KRAKOVAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-vilna.js:lle ja -sevilla.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 * Aalto 4C, Puola.
 *
 * TÄMÄ PAKETTI EI KIRJOITA REKISTERIRIVIÄ (js/packs/fokusvirrat.js)
 * eikä koske sw.js:ään tai mihinkään muuhun tiedostoon — aallon 4C
 * kaupungit kokoaa integrointiagentti yhtenä nostona, kuten 4A:ssa ja
 * 4B:ssä.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi, osio
 * KRAKOVA). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti (jaettuna kahteen kenttään, ks.
 * pollo-lohko) ja aarremerkinta.teksti. Niitä ei ole lyhennetty,
 * täydennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * KAANONISSA ON YKSI PUHEKIELINEN MUOTO, JOTA EI OLE KORJATTU. Livian
 * repliikissä lukee "mut halli on sama" (ei "mutta"). Se on
 * päätoimittajan teksti ja kopioidaan sellaisenaan; jos se on
 * lyöntivirhe eikä Livian puhekieltä, korjaus kuuluu Fablelle. Asia on
 * kirjattu myös raporttiin.
 *
 * ISO AARRE: Rafaelin kadonnut muotokuva (js/packs/paikallisaarteet.js,
 * POL). PIENI AARRE: Krakovan obwarzanek-rinkeli (sama taulu).
 *
 * FAKTAPOHJA. Puolalle EI ole valmista takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Krakovan kaupunkilehden nostot ja
 *      Matkailijan Krakova -artikkeli (js/packs/kulttuuri-kategoriat.js,
 *      krakova/kaupunki ja krakova/arki), Puolan maalehti
 *      (js/packs/maa-kategoriat.js, POL/taide, POL/luonto ja
 *      POL/menovinkit), Krakovan nähtävyysjutut
 *      (js/packs/nahtavyysjutut.js), Krakovan juliste
 *      (js/packs/julisteet.js) sekä maan aarretiedot
 *      (js/packs/paikallisaarteet.js, POL). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden KUVAT, jotka tämä
 *      paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 30.8.2026
 *      (action=query&prop=extracts, redirects=1, NODE_USE_ENV_PROXY=1)
 *      artikkeli kerrallaan, ja kunkin kohdan oma kommentti nimeää
 *      artikkelin. Mitään ei ole päätelty, pyöristetty eikä muistettu.
 *
 * ── SPOILERIKIELTO, JOKA MUOVAA TÄMÄN TIEDOSTON ENITEN ─────────────
 *
 * Krakovan laattakysymyksistä (js/packs/europe-questions.js, `krakova`)
 * kolmas kysyy, MIKSI Mariankirkon torvisävelmä katkeaa kesken — ja
 * sama kysymys on kaupungin kulttuurivisana (js/packs/
 * europe-kulttuuri.js). Aallon 4C kaanonpaperin spoilerikieltolista
 * sitoo tämän paketin kaikkia ennen visaa näkyviä kenttiä: KATKEAMISEN
 * SYYTÄ EI KERROTA MISSÄÄN täkytekstissä, minivisassa, oppitunnissa
 * eikä kohtaamisessa. Kielto on tiukempi kuin miltä näyttää: se koskee
 * myös lähteiden vaihtoehtoisia selityksiä, ei vain nuolilegendaa —
 * siksi hejnał-täky kertoo torvesta kaiken muun (ks. sen oma kommentti,
 * jossa lukee myös mitä juuri siitä syystä on jätetty pois).
 *
 * Kielto sopii yhteen kaanonin kanssa eikä ole sen kanssa ristiriidassa:
 * Livian oma repliikki sanoo "syyn saat selvittää itse". Vastaus löytyy
 * kaupunkilehden sivulta 1 (nosto "Torvisoitto, joka katkeaa kesken"),
 * ja juuri sinne kohtaamisen vihjelinkki osoittaa.
 *
 * ── KAANONTÖRMÄYS, JONKA FABLE ON RATKAISSUT ──────────────────────
 *
 * Paketin ensin saama aarremerkintä kertoi isoisän nähneen Rafaelin
 * muotokuvan "ruhtinaan kokoelmassa" kesäkuussa 1873 — mutta
 * Czartoryskien kokoelma saapui Krakovaan vasta 1876, ja sama
 * vuosiluku on jo pelin omassa hyväksytyssä maalehdessä
 * (js/packs/maa-kategoriat.js POL/taide, nosto "Kärppä, joka on
 * sanaleikki": "Krakovaan se tuotiin 1876"). Törmäys oli siis
 * pelidatassa, ei vain tässä paketissa.
 *
 * FABLE KIRJOITTI MERKINNÄN UUDESTAAN aallon 4C kaanonpaperissa
 * 30.8.2026: nyt merkintä sanoo suoraan, että kokoelma on paennut
 * sotaa Pariisiin ja että isoisä näki taulun SIELLÄ keväällä, ja että
 * Krakovassa odotetaan kokoelman palaavan pian kotiin. Se osuu
 * tarkistettuihin vuosilukuihin: kokoelma oli 1830-luvulta asti
 * Pariisissa Hôtel Lambertissa, ruhtinas Władysław päätti 1870 tuoda
 * sen Krakovaan, ja perillä oltiin 1876. Oppitunti kertoo saman
 * ketjun vuosilukuineen, eikä merkintä ole enää sen kanssa
 * ristiriidassa. Tämä tiedosto seuraa korjattua kaanonia sanatarkasti.
 *
 * ── VIISI OMISTAJAN LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ─────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. LIVIAN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (krakova/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA.
 *   5. TÄKYNOSTOILLA EI OLE KIINTIÖTÄ (Raamattu): määrä seuraa maan
 *      sisältörikkautta. Tässä on KOLME, jotta pooli voi vuorotella.
 *
 * ── MINIVISAN SÄÄNTÖ JA OIKEAN VASTAUKSEN PAIKKA ───────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan (docs/moduulit/tarinakaari.md, luku 6
 * kohta 6).
 *
 * OIKEAN VASTAUKSEN PAIKKA VAIHTELEE, KUTEN VILNASSA. Rekisterin
 * enemmistö (Riika, Tallinna, Bergen, København, Sevilla) kirjoittaa
 * oikean aina indeksiin 0, mutta moottori ei sekoita vaihtoehtoja —
 * jolloin indeksi itse on juuri sellainen MUOTO, josta oikean tunnistaa
 * tuntematta aihetta (tarinakaari, luku 6 kohta 2). Vilna (aalto 4B)
 * rikkoi tavan tarkoituksella, ja tämä paketti seuraa sitä: viisi visaa
 * antavat oikean vastauksen paikoiksi 0, 2, 1, 1 ja 2. Yhdessäkään
 * oikea ei ole pisin vaihtoehto — pituudet on mitattu käsin ja kirjattu
 * kunkin visan kommenttiin. Jos Fable haluaa paketin talon tapaan,
 * muutos on viisi riviä eikä koske yhteenkään tekstiin.
 *
 * ── KOHDENOSTOJA EI OLE ────────────────────────────────────────────
 *
 * Kohdenostot tulevat maan omasta luettelosta (esim. js/packs/
 * fokuskohteet-grc.js). Puolalle sellaista tiedostoa ei ole, eikä tämä
 * paketti luo sitä — `kohteet`-kenttä jää siis pois.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-krakova.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Obwarzanek-kysymys on Krakovan lehden sivun 2
 * ("Arki ja tavat") oman noston "Rinkeli, joka keitetään ennen
 * paistamista" tekstiä (js/packs/kulttuuri-kategoriat.js) ja
 * psalttarikysymys sivun 3 (Puolan Menovinkit) oman noston "Polona —
 * Puolan kansalliskirjaston digitaalinen kokoelma" tekstiä ja selitettä
 * (js/packs/maa-kategoriat.js). Uusia faktaväitteitä ei ole
 * kummassakaan; obwarzanekin alkuperämerkintä tulee maan aarretiedosta
 * (js/packs/paikallisaarteet.js, POL/pieniAarre).
 *
 * MIKSI EI SZOPKA-KYSYMYSTÄ, vaikka se on saman sivun toinen nosto:
 * sivun 2 osiolla on JO oma tehtävänsä, joka kysyy juuri sitä, ketkä
 * alkoivat rakentaa szopka-seimiä (kulttuuri-kategoriat.js,
 * krakova/arki `tehtava`). Sama sivu ei saa kysyä samaa asiaa kahdesti.
 *
 * MIKSI EI WIELICZKA-KYSYMYSTÄ, vaikka se on sivun 3 näyttävin nosto:
 * suolakaivos on tämän paketin ensimmäinen täkynosto, ja lisäksi se on
 * Krakovan viides laattakysymys (js/packs/europe-questions.js). Kolmas
 * esiintymä samasta aiheesta samalla käynnillä olisi liikaa.
 *
 * Sivun 1 kysymys on Krakovan kulttuurivisa (js/packs/
 * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
 * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
 */
const OBWARZANEK_VISA = {
  kysymys: 'Krakovan kaduilla myydään obwarzanek-rinkeleitä sinisistä '
    + 'kärryistä. Kuinka monta niitä menee päivässä?',
  /*
   * PALJAAT LUVUT, EI SELITTÄVIÄ SIVULAUSEITA (tarinakaari, luku 6
   * kohta 2). Pituudet ovat 11 / 13 / 15 merkkiä, ja oikea on
   * keskimmäinen sekä paikaltaan että pituudeltaan. Kumpikaan väärä ei
   * ole puolitosi: ne ovat vain väärän kokoluokan arvauksia.
   */
  vaihtoehdot: [
    'Noin 15 000',
    'Lähes 150 000',
    'Runsaat 500 000',
  ],
  oikea: 1,
  fakta: 'Nimi kertoo valmistustavan: obwarzać tarkoittaa keittämistä, ja '
    + 'taikina keitetään ennen uuniin panoa. Vanhin maininta on kuningatar '
    + 'Jadwigan hovin tilikirjassa 2. maaliskuuta 1394, kärryjä on kaduilla '
    + '170–180, ja EU on suojannut nimen alkuperämerkinnällä.',
};

const PSALTTARI_VISA = {
  kysymys: 'Polonassa on luettavissa noin vuonna 1400 kirjoitettu Florianin '
    + 'psalttari. Se on kirjoitettu kolmella kielellä — millä?',
  /*
   * KOLME SAMANMITTAISTA KIELIKOLMIKKOA (32 / 33 / 31 merkkiä), joten
   * pituus ei kerro mitään. Väärät eivät ole puolitosia: psalttarissa ei
   * ole tšekkiä, unkaria, kreikkaa eikä hepreaa.
   */
  vaihtoehdot: [
    'Latinaksi, tšekiksi ja unkariksi',
    'Latinaksi, kreikaksi ja hepreaksi',
    'Latinaksi, puolaksi ja saksaksi',
  ],
  oikea: 2,
  fakta: 'Käsikirjoituksen puolankielinen osuus on vanhin tunnettu psalmien '
    + 'käännös puolan kielelle. Polona on Puolan kansalliskirjaston '
    + 'digitaalinen kokoelma ja maan suurin, eikä se vaadi kirjautumista '
    + 'eikä maksua.',
};

export const FOKUSVIRTA_KRAKOVA = {
  kaupunki: 'krakova',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ilman lisäystä. */
    paikkarivi: 'Krakova, kesäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Torin laidalla kangashalli on täynnä kauppiaita kuin '
      + 'neljäsataa vuotta sitten, ja tasatunnein tornista soi torvi, '
      + 'jonka sävelmä loppuu kesken — kysyin syytä kolmelta mieheltä ja '
      + 'sain kolme eri tarinaa. Wawelin kukkulalla kuninkaat nukkuvat '
      + 'kirkon lattian alla. Tämä kaupunki kuuluu nyt keisarille Wienissä, '
      + 'mutta se muistaa olleensa kuningasten kaupunki, ja muisti on '
      + 'täällä pitkävihaisempi kuin missään.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: kolme tagia, alku ja loppu eri
     * sävyssä. Yksikään sana, välimerkki tai sanajärjestys ei muutu.
     */
    luenta: '[curious] Torin laidalla kangashalli on täynnä kauppiaita kuin '
      + 'neljäsataa vuotta sitten, ja tasatunnein tornista soi torvi, '
      + 'jonka sävelmä loppuu kesken — kysyin syytä kolmelta mieheltä ja '
      + 'sain kolme eri tarinaa. [softly] Wawelin kukkulalla kuninkaat '
      + 'nukkuvat kirkon lattian alla. [whispers] Tämä kaupunki kuuluu nyt '
      + 'keisarille Wienissä, mutta se muistaa olleensa kuningasten '
      + 'kaupunki, ja muisti on täällä pitkävihaisempi kuin missään.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-krakova.mp3',
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
     * merkkiä, ei ole sama merkkijono kuin huomio eikä sisällä
     * huutomerkkiä.
     *
     * JAKO KULKEE KAANONIN OMAA KAKSOISPISTETAUKOA PITKIN — sitä
     * kaksoispistettä, jonka päätoimittaja on kirjoittanut jokaisen
     * Livia-repliikin taitekohtaan. Maadoitus on 181 merkkiä eli
     * turvallisesti yli rajan, ja se on myös sisällöllisesti oikea
     * kohta: maadoitus kuittaa merkinnän torviosuuden ja jättää syyn
     * auki, ja `teksti` kääntää katseen kangashalliin ja torille.
     * Peräkkäin luettuna teksti on sanasta sanaan Fablen kaanonteksti.
     */
    maadoitus: 'Se torvi soi edelleen joka tunti, neljään ilmansuuntaan, ja '
      + 'sävelmä katkeaa edelleen samalla tavalla — syyn saat selvittää '
      + 'itse, ja huomaat että tarinoita on yhä useampi kuin yksi..',
    teksti: 'Kangashallissa myydään nykyään meripihkaa ja matkamuistoja, mut '
      + 'halli on sama. Torille siis.',
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, krakova/avauskuvat, generoitu heroerä 15):
     * Sukiennice keskiaikaisen torin keskellä. Juuri se halli ja se
     * tori, joihin Livian teksti päättyy ("Torille siis"). Selite on
     * lehden omasta selitteestä lyhentäen, ja kaikki sen luvut ovat
     * lehden aineistoa.
     *
     * MIKSI EI MARIACKI-HEROA: lehdessä on myös hero-krakova-keskipaiva,
     * jossa on Mariankirkon tornit. Se jätetään pois, koska torni on jo
     * hejnał-täyn kuvan aihe — eikä sen selite mahtuisi tähän
     * spoilaamatta laattakysymystä.
     */
    kuva: {
      ampari: 'herokoe/hero-krakova-ilta.png',
      selite: 'Sukiennice seisoo lähes neljän hehtaarin keskiaikaisen torin '
        + 'keskellä, ja renessanssiasunsa se sai 1555 palon jälkeen.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on tämän kaupungin oma 1873-ankkuri
       * (docs/moduulit/tarinakaari.md, luku 3). Merkinnän ensimmäinen
       * virke on kangashallista, joka on täynnä kauppiaita "kuin
       * neljäsataa vuotta sitten" — ja juuri isoisän käyntivuosina
       * hallia oltiin panemassa uusiksi. Hän näki sen viimeisinä
       * vuosinaan vanhassa asussaan.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, krakova/kaupunki,
       * nosto "Kauppahalli keskellä toria" ja avauskuvan selite (jo
       * hyväksyttyä pelidataa) — halli on seissyt torin keskellä
       * keskiajalta, Krakova oli Hansan ja idän karavaanireittien
       * risteyskohta, halliin tuotiin mausteita, silkkiä ja nahkaa ja
       * täältä lähti kangasta, lyijyä ja suolaa, yläkerta on nykyään
       * 1800-luvun puolalaisen taiteen museo, renessanssiasu on 1555
       * palon jäljiltä ja räystäslistaa reunustavat kiviset irvinaamat.
       *
       * LISÄTIEDOT (EI PELIDATASSA — en-Wikipedia "Kraków Cloth Hall",
       * haettu 30.8.2026):
       *   - halli oli aikanaan kansainvälisen kaupan keskus, ja
       *     kiertelevät kauppiaat tapasivat siellä; 1400-luvun
       *     kukoistuskaudella idästä tuotiin mausteita, silkkiä, nahkaa
       *     ja vahaa, ja Krakova vei kangasta, lyijyä ja Wieliczkan
       *     kaivoksen suolaa;
       *   - hallin välittömässä läheisyydessä oli Iso ja Pieni vaakatalo
       *     1800-luvulle asti;
       *   - vastaavia kangashalleja on ollut myös Ypresissä,
       *     Braunschweigissa ja Leedsissä;
       *   - kaupungin alamäki alkoi, kun pääkaupunki siirtyi Varsovaan
       *     1500-luvun lopulla; kun hallin kunnostusta ehdotettiin
       *     vuonna 1870 Itävallan vallan aikana, suuri osa historiallista
       *     keskustaa oli rapistunut;
       *   - Galitsian ja Lodomerian kuningaskunnan käänne — oma
       *     maapäivä eli Sejm — toi elpymisen, ja hallin onnistunut
       *     kunnostus Tomasz Prylińskin suunnitelman mukaan ja
       *     pormestari, maapäivien marsalkka Mikołaj Zyblikiewiczin
       *     valvonnassa oli kauden näkyvimpiä saavutuksia;
       *   - yläkerran 1800-luvun puolalaisen taiteen galleria avautui
       *     7. lokakuuta 1879;
       *   - historiallinen keskusta on ollut Unescon
       *     maailmanperintöluettelossa vuodesta 1978.
       *
       * MITÄ EI KERROTA: hallissa pidettiin tanssiaisia sen jälkeen kun
       * ruhtinas Józef Poniatowski oli lyhyeksi aikaa vapauttanut
       * kaupungin itävaltalaisilta 1809. Sotasisältöä ei kirjoiteta
       * (tarinakaari, luku 2), eikä täky tarvitse sitä.
       */
      id: 'sukiennice',
      nappi: 'Halli, jota isoisäsi ehti nähdä vanhana',
      otsikko: 'Kangashalli torin keskellä',
      teksti: 'Isoisäsi näki kangashallin täynnä kauppiaita ja arvasi ajan '
        + 'oikein: Sukiennice on seissyt torin keskellä keskiajalta asti. '
        + 'Krakova oli Hansan ja idän karavaanireittien risteyskohta, ja '
        + 'halli oli kansainvälisen kaupan keskus, jossa kiertelevät '
        + 'kauppiaat tapasivat toisensa. 1400-luvun kukoistuskaudella '
        + 'idästä tuotiin mausteita, silkkiä, nahkaa ja vahaa; ulos lähti '
        + 'kangasta, lyijyä ja Wieliczkan kaivoksen suolaa. Aivan hallin '
        + 'vieressä seisoivat Iso ja Pieni vaakatalo, joita ei enää ole. '
        + 'Nykyisen renessanssiasunsa halli sai 1555 palon jälkeen, ja '
        + 'räystäslistaa reunustavat kiviset irvinaamat. Samanlaisia '
        + 'kangashalleja on ollut muuallakin Euroopassa — Ypresissä, '
        + 'Braunschweigissa ja Leedsissä. Mutta yksi asia isoisältäsi jäi '
        + 'näkemättä täpärästi. Kun pääkaupunki oli siirtynyt Varsovaan '
        + '1500-luvun lopulla, kaupunki alkoi hiipua, ja 1800-luvulle '
        + 'tultaessa suuri osa vanhaakaupunkia oli rapistunut. Hallin '
        + 'kunnostusta ehdotettiin vuonna 1870, ja työ tehtiin lopulta '
        + 'Tomasz Prylińskin suunnitelman mukaan pormestari Mikołaj '
        + 'Zyblikiewiczin valvonnassa. Siitä ovat peräisin ne kaarikäytävät '
        + 'ja se ilme, jonka kuka tahansa nykyään tunnistaa Krakovan '
        + 'kuvaksi. Yläkertaan avattiin 7. lokakuuta 1879 puolalaisen '
        + '1800-luvun taiteen galleria, joka on siellä yhä. Isoisäsi käveli '
        + 'siis hallin ohi kuusi vuotta liian aikaisin — ja näki sen '
        + 'sellaisena kuin sitä ei enää voi nähdä kukaan.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto krakova/ennenNyt,
       * js/packs/kulttuuri-kategoriat.js) — siis jo kertaalleen
       * tarkistettu ja hyväksytty. Commons 30.8.2026: 3376×2170, public
       * domain, tekijä tuntematon, kuvaus kertoo postikortiksi, jonka on
       * julkaissut Wydawn. sal. mal. polsk. Krakovassa 1910.
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): postikortti
       * torilta, hallin kaarikäytävä ja Mariankirkko, etualalla muutama
       * hyvin pieni ihmishahmo — ei tunnistettavia kasvoja.
       *
       * MIKSI JUURI TÄMÄ KUVA JA MIKSI SELITE SANOO VUODEN: kortti on
       * vuodelta 1910, eli se näyttää nimenomaan sen hallin, jota täky
       * kertoo isoisän jääneen näkemättä — kunnostuksen jäljiltä. Jos
       * selite vaikenisi vuodesta, kortti näyttäisi todistavan sen mitä
       * isoisä näki, ja se olisi juuri päinvastoin.
       */
      kuva: {
        tiedosto: 'Krakow - Kosciol Maryacki i Sukiennice. 1910 (69699690).jpg',
        selite: 'Postikortti vuodelta 1910 näyttää kangashallin 1870-luvun '
          + 'kunnostuksen jäljiltä: kaarikäytävä ja räystäslinja ovat siitä '
          + 'työstä.',
        lahde: 'Tuntematon tekijä, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Kenen suunnitelman mukaan kangashalli kunnostettiin '
          + '1870-luvulla?',
        /*
         * PITUUDET 27 / 31 / 19 MERKKIÄ: oikea on keskimmäinen pituus,
         * eikä pisin (tarinakaari, luku 6 kohta 2). Kumpikaan väärä ei
         * ole puolitosi — Zyblikiewicz valvoi työtä muttei suunnitellut
         * sitä, ja Wit Stwosz veisti Mariankirkon alttarin nelisensataa
         * vuotta aikaisemmin.
         */
        vaihtoehdot: [
          'Arkkitehti Tomasz Pryliński',
          'Pormestari Mikołaj Zyblikiewicz',
          'Veistäjä Wit Stwosz',
        ],
        oikea: 0,
        fakta: 'Kunnostusta ehdotettiin 1870, ja se oli Galitsian oman '
          + 'maapäivän kauden näkyvimpiä saavutuksia. Hallin yläkerrassa '
          + 'avattiin 7. lokakuuta 1879 puolalaisen 1800-luvun taiteen '
          + 'galleria, joka on siellä yhä.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän toinen havainto on torvi, jonka
       * sävelmä loppuu kesken, ja Livia sanoo suoraan, että syyn saa
       * selvittää itse. Täky antaa torvesta kaiken muun — ja se on
       * paljon: kuusisataa vuotta, yksi unkarilainen sana, neljä porttia
       * ja kolme sukupolvea samaa perhettä.
       *
       * *** SPOILERIKIELTO — LUE ENNEN KUIN MUOKKAAT TÄTÄ TÄKYÄ. ***
       * Katkeamisen syytä EI kerrota. Lähde (en-Wikipedia "St. Mary's
       * Trumpet Call") tarjoaa siihen kolme eri selitystä, ja NIISTÄ
       * KAIKKI KOLME on jätetty tästä pois tarkoituksella:
       *   1. nuolilegenda ja sen kirjallinen alkuperä (Eric P. Kellyn
       *      kirja 1928) — tämä on suoraan laattakysymyksen vastaus;
       *   2. arvelu, että katkos oli alun perin merkki toiselle
       *      torvensoittajalle portilla — tämä on vaihtoehtoinen
       *      vastaus samaan kysymykseen;
       *   3. maininta, että tornista varoitettiin myös tulipaloista ja
       *      muista vaaroista — tämä johdattaa suoraan legendan
       *      juonelle.
       * Kohta 3 on rajatapaus, mutta se jätetään silti pois: kaanonin
       * Livia lupaa, että tarinoita on useampi kuin yksi, ja jokainen
       * poisjätetty rivi on yksi tarina, jonka pelaaja saa löytää itse.
       *
       * FAKTAT: js/packs/kulttuuri-kategoriat.js, krakova/kaupunki,
       * nosto "Torvisoitto, joka katkeaa kesken" ja avauskuvan selite
       * (jo hyväksyttyä pelidataa) — soitto joka tunti neljään
       * ilmansuuntaan, tornissa päivystetään ympäri vuorokauden,
       * keskipäivän soitto kuullaan radiossa koko Puolassa, korkeampi
       * torni nousee 80 metriin vartiotorniksi.
       *
       * LISÄTIEDOT (EI PELIDATASSA — en-Wikipedia "St. Mary's Trumpet
       * Call", haettu 30.8.2026):
       *   - varhaisin kirjallinen maininta on kaupungin
       *     palkkakirjanpidossa vuodelta 1392;
       *   - sana hejnał tulee unkarin sanasta hajnal, aamunkoitto,
       *     mikä sopii syntyyn kuningas Ludvig Unkarilaisen (Puolan
       *     kuninkaana 1370–1382) tai hänen tyttärensä kuningatar
       *     Jadwigan (1384–1399) aikaan;
       *   - torvimerkeillä ilmoitettiin monessa Euroopan kaupungissa
       *     porttien avaaminen ja sulkeminen aamulla ja illalla;
       *   - ne neljä ilmansuuntaa vastaavat suunnilleen Krakovan neljää
       *     pääporttia, joista kolme purettiin 1800-luvulla;
       *   - soitto on lakkautettu ja aloitettu uudelleen useita
       *     kertoja, ja erityisen pitkä tauko edelsi sen palauttamista
       *     1810;
       *   - 1800-luvulta lähtien soittajat ovat olleet palokunnan
       *     palveluksessa, ja torni on heille myös tähystyspaikka;
       *     soittajia on vähintään neljä ja he ovat vuoroissa;
       *   - keskipäivän soittoa on lähetetty suorana Polskie Radiossa
       *     vuodesta 1927;
       *   - pisimpään palvellut soittaja oli Adolf Śmietana, joka
       *     soitti 36 vuotta vuodesta 1926; Kołtonin perhe on soittanut
       *     kolmessa sukupolvessa, ja Jan Kołton jäi eläkkeelle
       *     lokakuussa 2004 palveltuaan tornissa 33 vuotta, hänen
       *     isänsä oli soittanut sitä ennen 35 vuotta ja hänen poikansa
       *     on yksi nykyisistä soittajista;
       *   - 11. kesäkuuta 2000 sävelmä pääsi Guinnessin kirjaan, kun
       *     sen soitti lähes kaksituhatta torvensoittajaa eri puolilta
       *     maailmaa; nuorin oli kahdeksanvuotias ja vanhin 79.
       */
      id: 'hejnal',
      nappi: 'Torvi, jota on soitettu kuudensadan vuoden ajan',
      otsikko: 'Hejnał',
      teksti: 'Isoisäsi kysyi syytä kolmelta mieheltä ja sai kolme eri '
        + 'tarinaa. Sitä kysymystä ei ratkaista tässä — mutta kaikki muu '
        + 'torvesta kannattaa tietää, koska se on vanhempi kuin arvaisi. '
        + 'Varhaisin kirjallinen maininta hejnałista on kaupungin '
        + 'palkkakirjanpidossa vuodelta 1392, eli soitosta maksettiin '
        + 'palkkaa jo silloin. Nimikin on lainaa: hejnał tulee unkarin '
        + 'sanasta hajnal, aamunkoitto, mikä sopisi hyvin kuningas Ludvig '
        + 'Unkarilaisen tai hänen tyttärensä kuningatar Jadwigan aikaan. '
        + 'Torvimerkeillä ilmoitettiin monessa Euroopan kaupungissa '
        + 'porttien avaaminen aamulla ja sulkeminen illalla, ja ne neljä '
        + 'ilmansuuntaa, joihin soitto yhä suunnataan, vastaavat suunnilleen '
        + 'kaupungin neljää pääporttia — joista kolme purettiin 1800-luvulla. '
        + 'Soitto on välillä lakannut ja alkanut uudelleen useita kertoja, ja '
        + 'erityisen pitkä tauko edelsi sen palauttamista vuonna 1810; '
        + 'isoisäsi kuuli siis perinnettä, joka oli tuolloin ollut takaisin '
        + 'reilut kuusi vuosikymmentä. Soittajat ovat 1800-luvulta lähtien '
        + 'olleet palokunnan palveluksessa, ja torni on heille samalla '
        + 'tähystyspaikka: siellä päivystetään ympäri vuorokauden ja '
        + 'vuoroja hoitaa vähintään neljä soittajaa. Keskipäivän soittoa on '
        + 'lähetetty suorana radiossa vuodesta 1927. Työ on sellaista, että '
        + 'siihen jäädään: Adolf Śmietana soitti tornissa 36 vuotta vuodesta '
        + '1926, ja Kołtonin perheessä torvea on puhaltanut kolme '
        + 'sukupolvea — Jan Kołton jäi eläkkeelle lokakuussa 2004 '
        + 'kolmenkymmenenkolmen vuoden jälkeen, hänen isänsä oli ehtinyt '
        + 'sitä ennen soittaa kolmekymmentäviisi vuotta, ja hänen poikansa '
        + 'on yksi nykyisistä soittajista. Kerran sävelmä pääsi myös '
        + 'Guinnessin kirjaan: 11. kesäkuuta 2000 sen soitti yhtä aikaa '
        + 'lähes kaksituhatta torvensoittajaa eri puolilta maailmaa, nuorin '
        + 'kahdeksanvuotias ja vanhin 79.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto krakova/kaupunki,
       * js/packs/kulttuuri-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 30.8.2026: 1200×899, CC BY-SA 3.0, Jadwiga,
       * kuvattu 23.10.2004, kuvaus "Bugler playing the Hejnał mariacki at
       * the higher tower of the St. Mary's Church of Kraków".
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): tornin
       * yläosa alaviistosta ja ikkuna-aukossa soittaja torvineen niin
       * kaukana, ettei kasvoja erota.
       *
       * SELITE EI SANO, MIKSI SÄVELMÄ KATKEAA. Selite on kortin ainoa
       * kuvateksti ja näkyy ennen visaa, joten se kuuluu spoilerikiellon
       * piiriin siinä missä leipätekstikin.
       */
      kuva: {
        tiedosto: 'Hejnalista krakowski.jpg',
        selite: 'Hejnał soitetaan Mariankirkon korkeammasta, 80 metrin '
          + 'tornista joka tunti neljään ilmansuuntaan, ympäri vuorokauden.',
        lahde: 'Jadwiga, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        /*
         * VISA EI KOSKE KATKEAMISTA. Kysymys nousee kohtauksesta
         * (tarinakaari, luku 6 kohta 1) mutta osoittaa eri suuntaan kuin
         * laattakysymys, joka odottaa kohtaamisen jälkeen.
         *
         * PITUUDET 27 / 43 / 25 MERKKIÄ: pisin on väärä, ja oikea on
         * viimeisenä. Väärät eivät ole puolitosia — tornissa eivät soita
         * kirkon omat muusikot eivätkä konservatorion oppilaat.
         */
        kysymys: 'Ketkä soittavat hejnałin Mariankirkon tornissa nykyään?',
        vaihtoehdot: [
          'Kirkon kanttorit ja urkurit',
          'Krakovan konservatorion oppilaat vuorollaan',
          'Kaupungin palokuntalaiset',
        ],
        oikea: 2,
        fakta: 'Torni on palokunnalle myös tähystyspaikka, ja siellä '
          + 'päivystetään ympäri vuorokauden. Työhön jäädään pitkäksi aikaa: '
          + 'Adolf Śmietana soitti 36 vuotta vuodesta 1926, ja Kołtonin '
          + 'perheessä torvea on puhaltanut kolme sukupolvea.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän kolmas ja neljäs havainto ovat
       * Wawelin kuninkaat kirkon lattian alla ja se, että kaupunki kuuluu
       * nyt keisarille Wienissä mutta muistaa olleensa kuningasten
       * kaupunki. Tämä on juuri se kohta, jossa nuo kaksi ovat samalla
       * kukkulalla: kuninkaiden hautakirkko ja sotilaskasarmi, päällekkäin.
       * Loppu on erän hengähdys ja lämpö — kukkula ostettiin takaisin
       * tiili kerrallaan, ja lahjoittajien nimet ovat yhä luettavissa.
       *
       * FAKTAT: js/packs/julisteet.js, krakova (jo hyväksyttyä pelidataa)
       * — isoisän matkavuonna Wawel oli itävaltalainen kasarmi, ja
       * keisari Frans Joosef käski sotaväen pois vasta 1905. Lisäksi
       * js/packs/kulttuuri-kategoriat.js, krakova/avauskuvat: Wawelin
       * kukkula on jurakautista kalkkikiveä, katedraali vihittiin 1364 ja
       * siellä kruunattiin kuninkaat vuoteen 1764 asti.
       *
       * LISÄTIEDOT (EI PELIDATASSA — en-Wikipedia "Wawel Castle", haettu
       * 30.8.2026):
       *   - kukkula on horsti, joka syntyi mioseenikaudella, ja sen
       *     jurakautinen kalkkikivi on voimakkaasti karstiutunut ja
       *     täynnä luolia, muun muassa Smocza Jama eli lohikäärmeluola;
       *   - linna seisoo 228 metrissä merenpinnan yläpuolella
       *     Veikselin vasemmalla rannalla, ja katedraalissa kruunattiin
       *     ja haudattiin Puolan hallitsijat;
       *   - pääkaupunki siirtyi Varsovaan 1596;
       *   - kolmannen jaon jälkeen 1795 Wawel joutui Itävallan
       *     hallintaan, ja sotilaat muuttivat kukkulan kasarmiksi:
       *     sisäpihan renessanssikaarikäytävät muurattiin umpeen,
       *     sisätiloja muutettiin ja rakennuksia purettiin, muun muassa
       *     pyhien Mikaelin ja Yrjön kirkot;
       *   - 1800-luvun jälkipuoliskolla itävaltalaiset rakensivat
       *     puolustusmuurit uudelleen osaksi Krakovan linnoitusjärjestelmää;
       *   - vuonna 1905 keisari Frans Joosef I käski Galitsian ja
       *     Lodomerian kuninkaan ominaisuudessa joukkonsa pois
       *     Wawelista, minkä jälkeen alkoi kunnostus Zygmunt Hendelin ja
       *     Adolf Szyszko-Bohuszin johdolla; sen aikana löytyi Neitsyt
       *     Marian rotunda;
       *   - kunnostus rahoitettiin yleisellä keräyksellä, ja
       *     lahjoittajien nimet kaiverrettiin tiiliin, joista muurattiin
       *     muuri linnan pohjoisen portin lähelle; samaan aikaan
       *     rakennettiin Vaakunaportti ja lähelle sijoitettiin Tadeusz
       *     Kościuszkon patsas;
       *   - Wawel julistettiin 1978 osana Krakovan historiallista
       *     keskustaa ensimmäiseksi maailmanperintökohteeksi;
       *   - kävijöitä oli 2025 yli 3,47 miljoonaa, mikä tekee siitä
       *     Puolan vierailluimman taidemuseon.
       *
       * MITÄ EI KERROTA: kukkulan piirityksiä ja kapinoita, joista lähde
       * kertoo useita. Sotasisältöä ei kirjoiteta (tarinakaari, luku 2),
       * eikä täky tarvitse sitä: sen aihe on kasarmi, umpeen muurattu
       * kaarikäytävä ja keräyslista.
       */
      id: 'wawel',
      nappi: 'Linna, joka ostettiin takaisin tiili kerrallaan',
      otsikko: 'Wawelin kukkula',
      teksti: 'Isoisäsi kirjasi, että kuninkaat nukkuvat kirkon lattian alla '
        + 'ja että kaupunki kuuluu nyt keisarille. Molemmat pitivät '
        + 'paikkansa yhtä aikaa, ja juuri se oli kukkulan kipeä kohta. '
        + 'Wawel on jurakautista kalkkikiveä, karstiutunut ja luolia täynnä '
        + '— yksi niistä on lohikäärmeluola — ja linna seisoo 228 metrissä '
        + 'Veikselin rannalla. Katedraalissa kruunattiin ja haudattiin '
        + 'Puolan hallitsijat, vaikka pääkaupunki siirtyi Varsovaan jo '
        + '1596. Sitten kukkula vaihtoi omistajaa. Vuoden 1795 jaon jälkeen '
        + 'Wawel joutui Itävallalle, ja sotilaat muuttivat sen kasarmiksi: '
        + 'sisäpihan renessanssikaarikäytävät muurattiin umpeen, sisätiloja '
        + 'muutettiin ja rakennuksia purettiin, kahden kirkon verran. '
        + '1800-luvun jälkipuoliskolla muurit rakennettiin uudelleen osaksi '
        + 'kaupungin linnoitusjärjestelmää — sitä työtä isoisäsi katseli '
        + 'kesällä 1873, vaikka luuli katsovansa kuninkaiden linnaa. Vasta '
        + 'vuonna 1905 keisari Frans Joosef käski joukkonsa pois, ja hän '
        + 'teki sen Galitsian ja Lodomerian kuninkaan ominaisuudessa eikä '
        + 'keisarina. Silloin alkoi kunnostus Zygmunt Hendelin ja Adolf '
        + 'Szyszko-Bohuszin johdolla, ja töiden aikana kukkulan alta löytyi '
        + 'Neitsyt Marian rotunda, jota kukaan ei ollut osannut odottaa. '
        + 'Rahat kerättiin yleisellä keräyksellä, eikä siitä jäänyt pelkkä '
        + 'tilikirja: lahjoittajien nimet kaiverrettiin tiiliin, ja tiilistä '
        + 'muurattiin muuri pohjoisen portin lähelle. Ne ovat siellä yhä ja '
        + 'niitä voi lukea. Kukkula on nykyään Puolan vierailluin taidemuseo '
        + '— yli kolme ja puoli miljoonaa kävijää vuonna 2025 — ja se '
        + 'pääsi 1978 osana vanhaakaupunkia ensimmäiseen erään Unescon '
        + 'maailmanperintöluetteloa.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto
       * krakova/avauskuvat, js/packs/kulttuuri-kategoriat.js) — jo
       * kertaalleen tarkistettu ja hyväksytty. Commons 30.8.2026:
       * 5677×3874, CC BY-SA 4.0, Ingo Mehling, kuvattu 17.10.2019,
       * kuvaus "Krakow - Wawel, Old Town from captive balloon".
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): ilmakuva
       * kukkulalta vanhaankaupunkiin, ihmiset kaukana ja pistemäisinä,
       * ei tunnistettavia kasvoja.
       *
       * MIKSI ILMAKUVA EIKÄ JULKISIVU: täyn aihe on koko kukkula
       * muureineen ja porttiineen, ei katedraalin etusivu. Lehden
       * kansikuva 'Wawel Cathedral Front.jpg' näyttäisi vain kirkon
       * oven, eikä siitä näkisi sitä muuria, jonka tiilistä täky kertoo.
       */
      kuva: {
        tiedosto: 'Krakow - Wawel and Old Town from balloon.jpg',
        selite: 'Wawelin kukkula kohoaa Veikselin rannalla vanhankaupungin '
          + 'eteläpuolella, ja se oli isoisän matkavuonna itävaltalainen '
          + 'kasarmi.',
        lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        /*
         * PITUUDET 32 / 30 / 34 MERKKIÄ eli käytännössä samat, joten
         * pituus ei kerro mitään ja oikea on keskellä. Väärät eivät ole
         * puolitosia: kasarmin sotilaita ei muistettu tiilissä, eikä
         * kuninkaita haudattu muuriin vaan katedraalin lattian alle.
         */
        kysymys: 'Wawelin muurissa pohjoisen portin lähellä on tiiliä, joihin '
          + 'on kaiverrettu nimiä. Keiden nimiä?',
        vaihtoehdot: [
          'Linnassa palvelleiden sotilaiden',
          'Kunnostukseen rahaa antaneiden',
          'Kukkulalle haudattujen kuninkaiden',
        ],
        oikea: 1,
        fakta: 'Kunnostus rahoitettiin yleisellä keräyksellä sen jälkeen kun '
          + 'keisari Frans Joosef oli 1905 käskenyt joukkonsa pois kukkulalta. '
          + 'Töiden aikana löytyi myös Neitsyt Marian rotunda.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen: szopkanrakentaja Halina haluaa tietää,
   * osaako vieras katsoa kaupunkia sen omalla tavalla. Visasääntö
   * täyttyy — kysymyksen sanamuotoa ei ole kirjoitettu tähän.
   *
   * OPPITUNTI KERTOO MAAN ISON AARTEEN KOKONAAN (omistajan aallon 4B
   * tilaus, joka jatkuu 4C:ssä): Rafaelin muotokuva saa tässä koko
   * kaarensa nykypäivään asti. AARREMERKINTÄ EI SAA SITÄ — merkintä on
   * isoisän ääni vuodelta 1873, ja hän aavistaa vain, että tauluilla on
   * tapana lähteä liikkeelle. Ero on tarkoitettu.
   *
   * *** AJOITUSKYSYMYS — RATKAISTU KAANONIN PUOLELLA. ***
   *
   * Merkinnän ensimmäinen versio sanoi isoisän nähneen taulun
   * "ruhtinaan kokoelmassa" Krakovassa kesäkuussa 1873, mikä ei sopinut
   * tarkistettuihin vuosilukuihin: Czartoryskien kokoelma oli 1830-luvun
   * jälkeen Pariisissa Hôtel Lambertissa, ruhtinas Władysław pakkasi ja
   * piilotti sen 1871, Krakovan kaupunki tarjosi hänelle museotilaksi
   * vanhan asevaraston 1874, kokoelma saapui Krakovaan 1876 ja museo
   * avattiin 1878. Sama vuosiluku 1876 on JO pelin omassa hyväksytyssä
   * maalehdessä (js/packs/maa-kategoriat.js, POL/taide, nosto "Kärppä,
   * joka on sanaleikki": "Krakovaan se tuotiin 1876").
   *
   * FABLE KIRJOITTI MERKINNÄN UUDESTAAN 30.8.2026: isoisä näkee taulun
   * Pariisissa keväällä, kokoelma on siellä evakossa, ja Krakovassa
   * kerrotaan sen palaavan pian kotiin. Merkintä ja tämä oppitunti
   * kertovat nyt saman ketjun, eikä totuudellisuuspilarin tarvitse
   * vaieta yhdestäkään vuosiluvusta. Merkintä ei silti nimeä taulua
   * eikä kerro sen kohtaloa — sen tekee vain oppitunti.
   *
   * FAKTAT: js/packs/paikallisaarteet.js, POL/isoAarre (jo hyväksyttyä
   * pelidataa) — Rafaelin Nuoren miehen muotokuva kuului Krakovassa
   * Czartoryskien kokoelmaan, miehittäjät veivät sen 1939, teos nähtiin
   * viimeksi kenraalikuvernööri Hans Frankin hallussa, jälki katkeaa
   * sodan loppuun 1945, sitä pidetään merkittävimpänä kadonneena
   * taideteoksena ja se on yhä Puolan etsintälistan kärjessä. Lisäksi
   * js/packs/maa-kategoriat.js, POL/taide — ruhtinas Czartoryski osti
   * Nainen ja kärppä -taulun Italiasta 1798 ja se tuotiin Krakovaan
   * 1876.
   *
   * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 30.8.2026 kahdesta
   * riippumattomasta artikkelista):
   *   - en-Wikipedia "Czartoryski Museum": kokoelma syntyi 1796
   *     Puławyssa ruhtinatar Izabela Czartoryskan perustamana, ja hänen
   *     tunnuslauseensa oli "Menneisyys tulevaisuudelle"; ensimmäiset
   *     esineet olivat Wienin voiton muistoesineitä vuodelta 1683; 1798
   *     hänen poikansa Adam Jerzy matkusti Italiaan ja hankki Leonardon
   *     Nainen ja kärppä -teoksen, Rafaelin Nuoren miehen muotokuvan ja
   *     joukon roomalaisia antiikkiesineitä; vuoden 1830 kapinan
   *     jälkeen osa Puławyn kokoelmasta tuhoutui ja omaisuus
   *     takavarikoitiin, mutta suurin osa pelastettiin ja siirrettiin
   *     Pariisiin, jossa se oli Hôtel Lambertissa; Władysław päätti
   *     1870 siirtää kokoelmat Krakovaan; 1871 hän pakkasi ja piilotti
   *     kaiken; 1874 kaupunki tarjosi hänelle museotilaksi vanhan
   *     asevaraston, jonka kunnostuksen Viollet-le-Duc siirsi
   *     vävylleen Maurice Ouradoulle; kokoelma saapui Krakovaan 1876 ja
   *     museo avattiin 1878; museo on nykyään Krakovan
   *     kansallismuseon osasto ja se avattiin uudelleen kunnostuksen
   *     jälkeen joulukuussa 2019.
   *   - en-Wikipedia "Portrait of a Young Man (Raphael)": maalaus on
   *     öljyä puulevylle, todennäköisesti vuosilta 1513–1514; monet
   *     tutkijat ovat pitäneet sitä Rafaelin omakuvana, mutta kohteen
   *     henkilöllisyys on vahvistamatta; syksyllä 1939 suvun päämies
   *     ruhtinas Augustyn Józef Czartoryski pelasti museosta useita
   *     teoksia, muun muassa tämän, Leonardon Nainen ja kärppä
   *     -teoksen ja Rembrandtin Maisema ja laupias samarialainen
   *     -teoksen; kokoelma piilotettiin Sieniawaan, mutta se löydettiin;
   *     kolme maalausta koristivat Hans Frankin asuntoa Krakovassa,
   *     minkä jälkeen ne lähetettiin Berliiniin ja Dresdeniin;
   *     tammikuussa 1945 Frank toi maalaukset takaisin Krakovaan
   *     Wawelin linnaan, ja siellä Nuoren miehen muotokuva nähtiin
   *     viimeisen kerran; Leonardo ja Rembrandt löytyivät 1945 ja
   *     palautettiin, mutta Rafael ja 843 muuta esinettä puuttuivat;
   *     monet historioitsijat pitävät sitä merkittävimpänä toisen
   *     maailmansodan jälkeen kadoksissa olevana maalauksena; Puolan
   *     ulkoministeriön mukaan on tiedetty jo vuosia, että teos
   *     selvisi sodasta; vuonna 2012 tiedotusvälineissä levinnyt tieto
   *     sen löytymisestä oli perätön; kokoelma siirtyi 2016 Puolan
   *     valtion omistukseen, ja maalauksen alkuperäinen tyhjä kehys
   *     riippuu Krakovan kansallismuseossa.
   *
   * MITÄ EI KERROTA: sotatapahtumia, miehityshallinnon rakennetta eikä
   * Frankin myöhempiä vaiheita. Peliin ei kirjoiteta sotasisältöä
   * (tarinakaari, luku 2). Oppitunnin aihe on taulun matka ja tyhjä
   * kehys, ja se kerrotaan niin.
   */
  oppitunti: {
    otsikko: 'Taulu, joka ei ole palannut',
    teksti: 'Isoisäsi arvasi oikein, että tauluilla on tapana lähteä '
      + 'liikkeelle. Sen taulun matka alkoi kuitenkin jo ennen häntä ja '
      + 'jatkuu yhä. Ruhtinatar Izabela Czartoryska perusti kokoelmansa '
      + '1796 Puławyssa, ja hänen tunnuslauseensa oli menneisyys '
      + 'tulevaisuudelle. Vuonna 1798 hänen poikansa Adam Jerzy matkusti '
      + 'Italiaan ja toi sieltä kolme asiaa, joista kaksi ovat maailman '
      + 'tunnetuimpia maalauksia: Leonardon Naisen ja kärpän, Rafaelin '
      + 'Nuoren miehen muotokuvan ja joukon roomalaista antiikkia. Vuoden '
      + '1830 kapinan jälkeen suvun omaisuus takavarikoitiin ja osa '
      + 'kokoelmaa tuhoutui, mutta pääosa pelastettiin ja vietiin '
      + 'Pariisiin, missä se oli esillä Hôtel Lambertissa. Ruhtinas '
      + 'Władysław päätti 1870 tuoda kokoelmat Krakovaan, pakkasi ja '
      + 'piilotti ne 1871, ja 1874 kaupunki tarjosi hänelle museotilaksi '
      + 'vanhaa asevarastoa vanhan muurin kupeessa. Kokoelma saapui '
      + 'Krakovaan 1876 ja museo avattiin 1878. Sitten se taulu, joka oli '
      + 'kestänyt kaksi maanpakoa, jäi kolmanteen. Syksyllä 1939 suvun '
      + 'päämies Augustyn Józef Czartoryski pelasti museosta parhaat '
      + 'teokset — Rafaelin, Leonardon ja Rembrandtin Laupiaan '
      + 'samarialaisen — ja piilotti ne Sieniawaan, mutta kätkö löydettiin. '
      + 'Kolme maalausta ripustettiin kenraalikuvernööri Hans Frankin '
      + 'asuntoon Krakovaan, sitten ne kulkivat Berliiniin ja Dresdeniin, '
      + 'ja tammikuussa 1945 Frank toi ne takaisin Krakovaan Wawelin '
      + 'linnaan. Siellä Nuoren miehen muotokuva nähtiin viimeisen kerran. '
      + 'Leonardo ja Rembrandt löytyivät saman vuoden aikana ja '
      + 'palautettiin. Rafael ei — eikä 843 muuta kokoelman esinettä. '
      + 'Maalausta pidetään merkittävimpänä kadoksissa olevana '
      + 'taideteoksena, ja Puolan ulkoministeriön mukaan on tiedetty jo '
      + 'vuosia, että teos selvisi sodasta; missä se on, sitä ei tiedä '
      + 'kukaan, ja vuonna 2012 levinnyt tieto sen löytymisestä osoittautui '
      + 'perättömäksi. Kokoelma siirtyi 2016 Puolan valtion omistukseen. '
      + 'Kansallismuseossa Krakovassa riippuu edelleen taulun oma tyhjä '
      + 'kehys. Se on siellä sitä varten, että jos taulu joskus palaa, '
      + 'paikka on valmiina.',
    /*
     * Kuva on UUSI Commons-haku (ei pelidatassa aiemmin). Commons
     * 30.8.2026: 2004×2419, public domain, tekijä Raffaello Sanzio,
     * ajoitus "Around 1513–1514", kuvaus "Archival photograph of
     * Raphael's lost painting Portrait of a Young Man, digitally
     * restored to remove photographic artifacts, dust, and scratches".
     * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): mustavalkoinen
     * valokuva maalauksesta, nuori mies turkiskauluksessa, taustalla
     * ikkuna ja maisema. Ei nykyihmisiä.
     *
     * KUVA ON MUSTAVALKOINEN, JA SE ON KOKO PISTE. Maalausta ei ole
     * nähty vuoden 1945 jälkeen, joten siitä ei ole olemassa muuta kuin
     * vanhoja valokuvia. Selite sanoo sen suoraan — jos se vaikenisi
     * asiasta, kortti näyttäisi tarjoavan kuvaa teoksesta, joka olisi
     * jossain katsottavissa.
     */
    kuva: {
      tiedosto: 'Portrait of a Young Man by Raphael - Cleaned Archival Scan.jpg',
      selite: 'Rafaelin Nuoren miehen muotokuva tunnetaan nykyään vain '
        + 'valokuvista: maalaus katosi vuonna 1945 eikä sitä ole nähty sen '
        + 'jälkeen.',
      lahde: 'Raffaello Sanzio, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * Krakovalla on pelin vanhassa polussa saapumisteksti mutta ei
   * kohtaamista (js/packs/kohtaamiset.js ei tunne kaupunkia), joten
   * tässä ei ole mitään toistettavaa eikä mitään rikottavaa — ja siksi
   * tämä on EHDOTUS eikä vientiä. Hahmo, sävy ja lupaus ovat
   * kirjoitettavissa yli; kortti on tässä muodossa, jotta se voidaan
   * lukea sellaisena kuin pelaaja sen näkisi. VARSINAINEN KYSYMYS ei ole
   * tässä eikä kuulu tähän tiedostoon: se on laattamekaniikan puolella.
   *
   * KUVAA EI OLE (omistajan linjaus). Moottori piirtää kohtaamiskortin
   * ilman kuvaa aivan kuten Tallinnassa, Tukholmassa, Riiassa ja
   * Vilnassa.
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luku 3 ja 5):
   *   - ÄÄNIPROFIILI on HÄMMÄSTYVÄ — Halina on pitänyt lippua isänsä
   *     kepposena eikä ole koskaan tarkistanut lukua. Vilnan Rasa oli
   *     epäuskoinen ja Sofian Nadia juhlava, joten erän neljäs ääni on
   *     tässä se, joka yllättyy itse kesken oman tarinansa.
   *   - VARALLISUUSSÄÄNTÖ: isoisä ei maksanut mitään eikä käskenyt
   *     ketään. Hän kiipesi torniin, laski portaat ja mittasi korkeuden,
   *     ja jätti luvut talon väelle — pieni teko, ei järjestely. Suvun
   *     oma syy szopkan säilyttämiseen on ammattiylpeys: sama suku on
   *     rakentanut seimen joka talvi, koska se on suvun työ.
   *   - EI VUOSISATAISTA YLLÄPIDETTYÄ PERINNETTÄ FOGGIN TOIVOMUKSESTA.
   *     Szopkan rakentaminen alkoi 1800-luvulla muurareista ja
   *     kirvesmiehistä, joilla ei ollut talvella töitä (pelin oma,
   *     hyväksytty tieto), ja se on suvun oma syy alusta loppuun.
   *   - LUPAUS, JONKA AARREVAIHEEN ON LUNASTETTAVA: Halina nostaa
   *     seimen tornin katon ja näyttää lipun.
   *   - EI SPOILERIA: kortti ei kerro, miksi sävelmä katkeaa. Se
   *     osoittaa kysymykseen ja jättää sen auki, kuten Livia lupasi.
   */
  kohtaaminen: {
    hahmo: 'Szopkanrakentaja Halina',
    nappi: 'Tapaa szopkanrakentaja',
    varmistus: 'Haluatko varmasti tavata Halinan juuri nyt?',
    /*
     * VIHJELINKIN OSIO: kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js). Krakovan lehdessä on kaksi osiota,
     * 'kaupunki' ("Krakova") ja 'arki' ("Arki ja tavat"). Halinan
     * kysymys koskee sitä, mitä tornin ikkunassa tapahtuu joka tunti,
     * ja tuki sille on Kaupunki-osiossa: sen oma nosto "Torvisoitto,
     * joka katkeaa kesken" on juuri se paikka, jonka Livia lupasi
     * pelaajan löytävän itse.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Halinan verstas on kellarikerroksessa Florianinkadun puolella, '
      + 'ja pöydällä odottaa keskeneräinen szopka: pahvia, hopeafoliota ja '
      + 'kolme tornia, joista yksi on vielä ilman kattoa. Suvussa on '
      + 'rakennettu seimi joka talvi niin kauan kuin kukaan muistaa — tapa '
      + 'alkoi muurareista ja kirvesmiehistä, joilla ei ollut talvella '
      + 'töitä, ja Halina sanoo tekevänsä sitä samasta syystä: se on '
      + 'perheen työ, ei kenenkään toivomus. Vanhimman seimen Mariacki-'
      + 'tornin sisään on liimattu keltainen paperiliuska, jossa lukee '
      + 'vieraalla käsialalla tornin korkeus jalkoina ja portaiden '
      + 'lukumäärä, ja alla kaksi sanaa: mitattu kahdesti. Halina on '
      + 'pitänyt lippua isoisänsä kepposena. Kun hän kertoo tämän ja '
      + 'kuulee itse, kuinka tarkka luku on, hän vaikenee hetkeksi. Katon '
      + 'hän kyllä nostaa. Mutta ei ennen kuin vieras osoittaa tietävänsä, '
      + 'mitä tornin ikkunassa tapahtuu joka tunti — ja miksi se päättyy '
      + 'niin kuin päättyy.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: KRAKOVAN VANHAKAUPUNKI. Halinan verstas on siellä,
   * ja kaupunkilehden molemmat osiot osoittavat samaan kortteliin.
   *
   * KOORDINAATIT OVAT SUURTORIN OMAT, EIVÄT LAATAN LAINAA — JA NE
   * OSUVAT SILTI LAATAN PÄÄLLE. Rynek Główny on 50,0616 N / 19,9373 E,
   * ja Euroopan laudan kaavalla (x = (lon + 11) × 19,2, y =
   * (72 − lat) × 26,3) se on 594,0 / 577,0. Krakovan LAATTA on
   * täsmälleen samassa pisteessä 594 / 577 (js/packs/europe.js), koska
   * Krakovaa ei ole jouduttu siirtämään laudan vähimmäisetäisyyden takia
   * — toisin kuin Baltian kaupunkeja, joissa Tallinna, Riika ja Vilna
   * joutuivat ottamaan laattapaikan projektion sijaan. Sama pätee
   * maailmankartalla: Millerin lieriö (LEVEYS 12000 / LON0 −175 /
   * POHJOINEN 76) antaa torille 6497,9 / 1387,5 ja laatta on
   * 6497,9 / 1387,5 (js/packs/maailmankartta.js).
   *
   * Piirtopuoli siirtää pisteen laatan vierestä koilliseen, koska ero
   * jää alle PISTE_ERO_MINin (js/fokuspiste.js) — täsmälleen niin kuin
   * kuuluukin, sillä verstas on kaupungin keskellä eikä missään muualla.
   */
  kohtaamispiste: {
    nimi: 'Szopkanrakentajan verstas vanhassakaupungissa',
    laudat: {
      maailmankartta: { x: 6497.9, y: 1387.5 },
      europe: { x: 594, y: 577 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Krakovan sivupino (js/lehti.js
   * rakennaSivut) on Vilnan mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Krakova", 2 = "Arki ja tavat", 3 = Menovinkit.
   * (Puolan maalehden muut osiot, Taide ja Luonto, kuuluvat maalehteen
   * eivätkä kaupunkilehden pinoon — vain Menovinkit lainataan
   * molempiin, ks. js/lehti.js.)
   *
   * Sivun 1 kysymys on Krakovan kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: OBWARZANEK_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PSALTTARI_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Puola) ----------
   *
   * UUSI POOLI, EI SIIRTO. Puola ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KOLME NOSTOA, JOTTA POOLI VOI VUOROTELLA (omistajan pelitestipalaute
   * v1234: luetun täyn tilalle pitää syttyä uusi). Ensimmäinen on maan
   * KUPLATÄKY eli poolin kärki.
   *
   * MIKSI EI BIAŁOWIEŻAN VISENTTEJÄ, vaikka ne olisivat ilmeisin
   * Puola-nosto: aihe on pelissä jo KAHDESTI. Se on maan eläintäky
   * (js/packs/elaintakyt.js, POL: visentinvasa, "Metsän palannut
   * jättiläinen") ja Puolan maalehden Menovinkit-nosto (js/packs/
   * maa-kategoriat.js, POL/menovinkit, visenttien sukukirja). Kolmas
   * esiintymä samalla käynnillä tekisi maasta yhden asian maan.
   *
   * WIELICZKA ON TIETOINEN JA RAJATTU PÄÄLLEKKÄISYYS. Suolakaivos on
   * Puolan maalehden Menovinkit-nosto ja lisäksi Krakovan viides
   * laattakysymys ("Mikä kuuluisa suolakaivos sijaitsee Krakovan
   * naapurissa?", js/packs/europe-questions.js). Se otetaan silti
   * poolin kärjeksi kolmesta syystä: kaivos on kaupungin oma naapuri ja
   * juuri se paikka, josta kangashallin suola tuli; laattakysymyksen
   * vastaus on jo valmiiksi pelaajan luettavissa maalehdessä, joten
   * tämä nosto ei paljasta mitään uutta; ja nosto kertoo kaivoksesta
   * aivan muuta kuin kysymys kysyy. Jos Fable pitää päällekkäisyyttä
   * liiallisena, tämän noston voi vaihtaa ilman että mikään muu tässä
   * tiedostossa liikkuu.
   *
   * KAIKKI KOLME PISTETTÄ OVAT TODELLISESSA PROJEKTIOSSAAN. Suunnat
   * ovat toisiinsa nähden oikein: Wieliczka piirtyy laatasta
   * kaakkoon aivan viereen, Toruń luoteeseen ja Wrocław länsiluoteeseen.
   *
   * KOLME MITATTUA ETÄISYYTTÄ, JOTKA KANNATTAA TIETÄÄ:
   *   - WIELICZKA jää Krakovan laatasta vain 3,2 yksikön päähän. Se on
   *     selvästi alle PISTE_ERO_MINin (14), eikä se ole virhe vaan
   *     maantiede: kaivos on runsaan kymmenen kilometrin päässä
   *     kaupungista. Piste ei jää laatan päälle, koska kerros piirtää
   *     sen aina jonkin kartan kohdesymbolin päälle (js/fokusnosto.js,
   *     osio "PISTE SIIHEN KOHTAAN KARTTAA" ja js/fokusnosto-symbolit.js).
   *     Tämä on poolin ainoa piste, jonka sijoittelua kannattaa katsoa
   *     pelissä silmällä.
   *   - TORUŃ jää lähimmästä vieraasta laatasta, Varsovasta, 50,9
   *     yksikön päähän.
   *   - WROCŁAW jää Prahan laatasta 56,8 ja Krakovan laatasta 62,2
   *     yksikön päähän.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * MIKSI WIELICZKA: isoisän merkintä alkaa kangashallista täynnä
       * kauppiaita. Tämä on se paikka, josta hallin arvokkain tavara
       * tuli — ja se on maan alla, kaupungin naapurissa, ja siellä on
       * kirkkosali, joka on veistetty siitä mitä louhittiin pois.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, POL/menovinkit, nosto
       * "Google Arts & Culture — Wieliczkan museoreitti katunäkymänä"
       * (jo hyväksyttyä pelidataa) — kaivosta on kaivettu 1200-luvulta
       * lähtien, suolaa nostettiin vuoteen 1996, käytäviä kertyi 287
       * kilometriä ja syvyyttä 327 metriä.
       *
       * LISÄTIEDOT (EI PELIDATASSA — en-Wikipedia "Wieliczka Salt
       * Mine", haettu 30.8.2026):
       *   - neoliittiselta ajalta lähtien paikalla on otettu talteen
       *     maasta nousevaa suolavettä ja keitetty siitä suolaa;
       *   - vanhin asiakirja on vuodelta 1044, jolloin Kasimir I antoi
       *     kaivokselle etuoikeuden;
       *   - kaivosta johti kuninkaallinen Żupy Krakowskie -yhtiö;
       *   - Kasimir III Suuri antoi kaivokselle etuoikeuksia ja otti
       *     kaivosmiehet suojelukseensa sekä perusti kaivoksen viereen
       *     sairaalan 1363; hänestä sanotaan, että hän muutti puisen
       *     Puolan kiviseksi, koska naapurimetsien puuta kului
       *     tukirakenteisiin valtavasti, ja tulot valtiolle olivat
       *     suuret;
       *   - suolakivi on luonnostaan eri sävyistä harmaata ja
       *     muistuttaa kiillottamatonta graniittia eikä valkoista
       *     kiteikköä;
       *   - vuoteen 1871 mennessä kaivosta pidettiin yhtenä maailman
       *     tuottoisimmista, ja Scientific American erotti siihen
       *     aikaan kolme suolalaatua: vihreä suola oli savista ja
       *     läpinäkymätöntä, spiza hiekkaista ja kiteistä, ja szybik
       *     puhtainta ja kiteisintä;
       *   - kaupallinen louhinta lopetettiin 1996 suolan hinnan laskun
       *     ja kaivoksen vettymisen takia;
       *   - maan alla on järvi, neljä kappelia ja kaivosmiesten
       *     veistämiä patsaita; matkailureitti on 3,5 kilometriä eli
       *     alle kaksi prosenttia käytävistä, ja kävijöitä on noin
       *     1,2 miljoonaa vuodessa;
       *   - kaivos otettiin 1978 Unescon maailmanperintöluettelon
       *     ensimmäiseen erään, ja se oli vaarantuneiden kohteiden
       *     listalla 1989–1998, koska 1800-luvun lopulla käyttöön otetun
       *     koneellisen ilmanvaihdon tuoma kosteus uhkasi veistoksia;
       *   - kaivoksessa ovat käyneet muun muassa Kopernikus, Goethe,
       *     Alexander von Humboldt, Chopin ja Mendelejev; Bolesław
       *     Prus kävi siellä 1878, kirjoitti käynnistä kolme
       *     lehtijuttua, ja hänen romaaninsa Faarao labyrinttikohtaukset
       *     syntyivät niistä vaikutelmista.
       *
       * MITÄ EI KERROTA: kaivoksen käyttöä miehityksen aikana. Peliin
       * ei kirjoiteta sotasisältöä (tarinakaari, luku 2), eikä nosto
       * tarvitse sitä: sen aihe on suola, kappeli ja kaksi prosenttia.
       */
      id: 'wieliczka',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Wieliczka',
      otsikko: 'Kaivos, jonka pohjalle veistettiin kirkkosali siitä, mikä '
        + 'louhittiin pois',
      lunastus: [
        'Runsaan kymmenen kilometrin päässä Krakovasta on kaivos, jota on '
          + 'kaivettu 1200-luvulta lähtien — ja jo sitä ennen paikalla '
          + 'otettiin talteen maasta nousevaa suolavettä ja keitettiin siitä '
          + 'suolaa. Vanhin asiakirja on vuodelta 1044. Kaivosta johti '
          + 'kuninkaallinen Żupy Krakowskie, ja Kasimir III Suuri antoi sille '
          + 'etuoikeuksia, otti kaivosmiehet suojelukseensa ja perusti '
          + 'kaivoksen viereen sairaalan vuonna 1363. Hänestä sanotaan, että '
          + 'hän muutti puisen Puolan kiviseksi — osaksi siksi, että '
          + 'naapurimetsien puu meni kaivoksen tukirakenteisiin ja tulot '
          + 'olivat sen mukaiset. Juuri tämä suola kulki Krakovan '
          + 'kangashallin läpi maailmalle. Se ei muuten ole valkoista: '
          + 'suolakivi on eri sävyistä harmaata ja muistuttaa enemmän '
          + 'kiillottamatonta graniittia kuin sitä, mitä pöydällä on.',
        'Isoisäsi kävi maan päällä juuri silloin, kun kaivos oli parhaimmillaan: '
          + 'vuoteen 1871 mennessä sitä pidettiin yhtenä maailman '
          + 'tuottoisimmista, ja Scientific American erotti siihen aikaan '
          + 'kolme laatua — savinen ja läpinäkymätön vihreä suola, hiekkainen '
          + 'ja kiteinen spiza sekä puhtain szybik. Louhinta jatkui '
          + 'yhtäjaksoisesti vuoteen 1996, jolloin suolan hinnan lasku ja '
          + 'veden nousu lopettivat sen. Jäljelle jäi 287 kilometriä '
          + 'käytävää, 327 metriä syvyyttä, järvi maan alla, neljä kappelia '
          + 'ja kaivosmiesten veistämiä patsaita — kaikki samasta aineesta, '
          + 'jota käytiin hakemassa pois. Matkailureitti on 3,5 kilometriä '
          + 'eli alle kaksi prosenttia käytävistä, ja kävijöitä on noin '
          + '1,2 miljoonaa vuodessa. Kaivos pääsi 1978 Unescon '
          + 'maailmanperintöluettelon ensimmäiseen erään ja oli '
          + 'vaarantuneiden kohteiden listalla 1989–1998, koska koneellisen '
          + 'ilmanvaihdon tuoma kosteus söi veistoksia. Kävijöitä on ollut '
          + 'muitakin: Kopernikus, Goethe, Humboldt, Chopin ja Mendelejev — '
          + 'ja Bolesław Prus, joka laskeutui sinne 1878 ja teki näkemästään '
          + 'romaaninsa Faarao maanalaisen labyrintin.',
      ],
      lahde: 'en-Wikipedia "Wieliczka Salt Mine"; käytävien pituus, syvyys ja '
        + 'lopetusvuosi myös pelin omasta POL-maalehdestä; tarkistettu '
        + '30.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto POL/menovinkit,
       * js/packs/maa-kategoriat.js) — jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 30.8.2026: 4080×3072, CC BY-SA 4.0, Андрей
       * Романенко, kuvaus "Saint Kinga Chapel in Wieliczka Salt Mine".
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): maanalainen
       * sali portaikon päältä, kattokruunut, reliefit seinissä, ei
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Saint Kinga Chapel in Wieliczka Salt Mine.jpg',
        selite: 'Pyhän Kingan kappeli on louhittu Wieliczkan kaivokseen, ja '
          + 'sen seinäreliefit, patsaat ja kattokruunut on tehty '
          + 'suolakivestä.',
        lahde: 'Андрей Романенко, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi suolasta kannatti kaivaa vuori tyhjäksi?',
        'Miten kappelin voi veistää siitä, mikä louhitaan pois?',
        'Mitä kaivokselle tapahtuu, kun sen tavara loppuu kaupasta?',
      ],
      /*
       * 49,97916667 N / 20,06388889 E — en-Wikipedia "Wieliczka Salt
       * Mine", prop=coordinates (haettu 30.8.2026). Muunnos on sama
       * kaava ja samat vakiot kuin fokuskohteilla: maailmankartalla
       * Millerin lieriö LEVEYS 12000 / LON0 −175 / POHJOINEN 76
       * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
       * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3. Kaava on
       * tarkistettu ajamalla sillä Vilnan paketin kaikki kolme nostoa:
       * se antaa niille täsmälleen samat luvut, jotka niissä lukevat.
       */
      paikka: {
        nimi: 'Wieliczkan suolakaivos',
        laudat: {
          maailmankartta: { x: 6502.1, y: 1391.1 },
          europe: { x: 596.4, y: 579.1 },
        },
      },
    },
    {
      /*
       * MIKSI TORUŃ: isoisän merkintä on kaupungista, joka muistaa
       * pitkään. Tämä on saman muistin makuinen pää — resepti, jota on
       * varjeltu kuudensadan vuoden ajan, ja puinen muotti, joka kertoo
       * kenelle leivottiin. Nosto on myös poolin hengähdys: ei kätköä,
       * ei kilpajuoksua, vain hunajaa ja mausteita.
       *
       * FAKTAT (EI PELIDATASSA — en-Wikipedia "Toruń gingerbread",
       * haettu 30.8.2026):
       *   - piparkakkuja on tehty Toruńissa keskiajalta lähtien, ja
       *     ammatin laajeneminen alkoi 1200-luvulla;
       *   - sijainti oli hyvä: hyvä maaperä antoi vehnän, lähikylät
       *     hunajan, ja mausteet tulivat kaukaa, pääosin Intiasta
       *     Mustanmeren ja Lvivin kautta tai meritse Gdańskin satamaan;
       *   - varhaisin maininta on vuodelta 1380 ja koskee paikallista
       *     leipuria nimeltä Niclos Czana;
       *   - Toruń ja Nürnberg varjelivat reseptejään toisiltaan, kunnes
       *     ne tekivät 1556 sopimuksen, jonka mukaan kumpikin kaupunki
       *     sai leipoa toisen erikoisuuksia;
       *   - 1500-luvulla lähistön sistersiläisluostari vaurastui
       *     pääosin tällä työllä ja myi tuotettaan ulkomaille asti;
       *     1600-luvulla tunnettiin Grauerin perheen verstas;
       *     kaupungin johto tuki kauppaa myöntämällä leipurikilloille
       *     verohelpotuksia mausteiden tuontiin ja vientiin;
       *   - 1700- ja 1800-luvulla käsityö hiipui, ja vuonna 1825
       *     leipureita oli jäljellä enää kolme; sitten tuli
       *     tehdastuotanto;
       *   - suurin tehdas oli Gustav Weesen, ja perinne juontui vuoteen
       *     1763, jolloin Johann Weese alkoi leipoa piparkakkuja;
       *     Gustav Traugott Weese peri isältään Andreakselta pienen
       *     verstaan 1824 ja teki siitä suuren yrityksen;
       *   - uudenvuodenaattona 1875 Gazeta Toruńska kirjoitti, että
       *     kysyntä oli niin kovaa, että tuotetta myytiin Afrikassa
       *     asti; muita vientikohteita olivat muun muassa Turkki,
       *     Japani, Kiina ja Honolulu;
       *   - yritys on yhä olemassa ja on Puolan vanhin
       *     makeisvalmistaja ja yksi maailman vanhimmista;
       *   - säilyneissä leivontamuoteissa on kuninkaiden ja
       *     kuningattarien kuvia sekä kaupungin vaakuna, ja kaupunki on
       *     antanut piparkakkuja lahjaksi vieraille Napoleonista Jan
       *     Matejkoon ja Artur Rubinsteiniin;
       *   - viisitoistavuotias Chopin poikkesi Toruńissa matkalla
       *     Szafarniaan, mieltyi piparkakkuun niin, että kirjoitti
       *     siitä kirjeen ystävilleen ja lähetti niitä Varsovaan;
       *   - kaupungissa vietetään vuosittain piparkakkujuhlaa Święto
       *     Piernika.
       *
       * KAKSI YRITYSTÄ, JOTKA EIVÄT OLE SAMA ASIA. Weesen tehdas on
       * nykyisin Kopernik-niminen, ja sen rinnalla toimii toinen,
       * leipureiden perustama Toruńin leipomo. Teksti puhuu vain
       * vanhemmasta eikä väitä, että niitä olisi yksi.
       */
      id: 'torun-piparkakut',
      nimio: 'Toruń',
      otsikko: 'Piparkakku, jonka reseptiä kaksi kaupunkia vahti toisiltaan '
        + 'kaksisataa vuotta',
      lunastus: [
        'Veikselin varrella Krakovasta alavirtaan on kaupunki, jonka ammatti '
          + 'on piparkakku. Työ laajeni siellä 1200-luvulta lähtien, ja syy '
          + 'oli sijainti: hyvä maaperä antoi vehnän, lähikylät hunajan, ja '
          + 'mausteet tulivat kaukaa — pääosin Intiasta Mustanmeren ja Lvivin '
          + 'kautta tai meritse Gdańskin satamaan. Varhaisin maininta on '
          + 'vuodelta 1380 ja koskee leipuria nimeltä Niclos Czana. Maine '
          + 'levisi nopeasti, ja se johti asetelmaan, joka kuulostaa '
          + 'nykyaikaiselta: Toruń ja Nürnberg varjelivat reseptejään '
          + 'toisiltaan niin kauan, että lopulta ne tekivät vuonna 1556 '
          + 'sopimuksen, jonka mukaan kumpikin sai leipoa toisen '
          + 'erikoisuuksia. Kaupunki tuki kauppaa verohelpotuksilla, ja '
          + '1500-luvulla lähistön sistersiläisluostari vaurastui pääosin '
          + 'tällä yhdellä työllä.',
        'Sitten se melkein loppui. 1700- ja 1800-luvulla käsityö hiipui, ja '
          + 'vuonna 1825 koko kaupungissa oli jäljellä kolme leipuria. Mitä '
          + 'seurasi, oli tehdas: Gustav Traugott Weese peri isältään pienen '
          + 'verstaan 1824 ja kasvatti siitä suuren yrityksen perinteelle, '
          + 'joka juontui vuoteen 1763. Isoisäsi matkan aikoihin se oli jo '
          + 'menossa lujaa — uudenvuodenaattona 1875 Gazeta Toruńska '
          + 'kirjoitti, että kysyntä oli niin kovaa, että piparkakkua myytiin '
          + 'Afrikassa asti, ja muita vientikohteita olivat Turkki, Japani, '
          + 'Kiina ja Honolulu. Sama yritys on yhä olemassa ja on Puolan '
          + 'vanhin makeisvalmistaja. Vanhoista puisista leivontamuoteista '
          + 'näkee, kenelle leivottiin: niissä on kuninkaiden ja '
          + 'kuningattarien kuvia ja kaupungin vaakuna. Ja yksi asiakas '
          + 'kirjoitti arvostelunsa itse: viisitoistavuotias Chopin poikkesi '
          + 'kaupungissa, mieltyi niin että kirjoitti siitä kirjeen '
          + 'ystävilleen ja lähetti niitä Varsovaan.',
      ],
      lahde: 'en-Wikipedia "Toruń gingerbread"; tarkistettu 30.8.2026.',
      /*
       * Kuva on UUSI Commons-haku (ei pelidatassa aiemmin). Commons
       * 30.8.2026: 2384×4088, CC0 (Creative Commons Zero, Public Domain
       * Dedication), tekijä "Anonymous (Toruń)", ajoitus 1600-luku.
       * Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px): puinen
       * leivontamuotti, jonka syvennykseen on veistetty enkeli ja
       * kaupunginportti sekä ylhäällä kotka; ei ihmisiä.
       *
       * MIKSI MUOTTI EIKÄ VALMIS PIPARKAKKU: noston loppu on siinä,
       * mitä muotti kertoo asiakkaasta. Valmis leivos näyttäisi
       * miltä tahansa leivokselta.
       */
      kuva: {
        tiedosto: "Toruń Gingerbread baking mould with city's coat of arms.jpg",
        selite: 'Toruńin piparkakkumuotteihin veistettiin kaupungin vaakuna ja '
          + 'hallitsijoiden kuvia; tämä muotti on 1600-luvulta.',
        lahde: 'Tuntematon tekijä (Toruń), Wikimedia Commons (CC0)',
      },
      kysymykset: [
        'Miksi mausteleivonnasta tuli juuri yhden kaupungin ammatti?',
        'Miten resepti pidetään salassa kokonaisen kaupungin kokoisena?',
        'Mitä leivontamuotti kertoo siitä, kenelle leivottiin?',
      ],
      /*
       * 53,02222222 N / 18,61111111 E — en-Wikipedia "Toruń",
       * prop=coordinates (haettu 30.8.2026). Sama kaava kuin edellä.
       */
      paikka: {
        nimi: 'Toruń',
        laudat: {
          maailmankartta: { x: 6453.7, y: 1256.2 },
          europe: { x: 568.5, y: 499.1 },
        },
      },
    },
    {
      /*
       * MIKSI WROCŁAW: isoisä kirjasi, että muisti on täällä
       * pitkävihaisempi kuin missään. Tämä on saman maan toinen tapa
       * muistaa — muistomerkki, joka on kaksikymmentä senttiä korkea ja
       * jota pitää etsiä polvillaan. Nosto on poolin huumoriannos ja
       * ainoa kohta, jossa kaupunki muistaa nauramalla.
       *
       * FAKTAT (EI PELIDATASSA — en-Wikipedia "Wrocław Dwarfs", haettu
       * 30.8.2026):
       *   - krasnale ovat 20–30 senttiä korkeita hahmoja, joita on
       *     ilmestynyt Wrocławin kaduille vuodesta 2005; kaupunki on
       *     Puolan kolmanneksi suurin;
       *   - vuonna 2001 Świdnickan kadulle pystytettiin kääpiöpatsas
       *     muistomerkiksi Pomarańczowa Alternatywa -liikkeelle, jonka
       *     tunnus kääpiö oli;
       *   - 2003 kaupunginjohtaja paljasti pienen laatan polven
       *     korkeudelle Jaś-nimisen vanhan porvaristalon seinään torin
       *     ja Pyhän Elisabetin kirkon välissä;
       *   - ensimmäiset viisi pientä hahmoa olivat Wrocławin
       *     taideakatemiasta valmistuneen Tomasz Moczekin tekemiä ja ne
       *     asetettiin elokuussa 2005: Miekkailija yliopiston lähelle,
       *     Teurastaja Stare Jatkin holvikäytävään, kaksi Sisyfosta
       *     Świdnickan kadulle ja Odranpesijä Piasekin sillan viereen;
       *   - määrä on kasvanut siitä lähtien: vuonna 2024 hahmoja oli yli
       *     800, ja niistä kuusi on kaupungin ulkopuolella LG:n
       *     tehtaalla Biskupice Podgórnessa; vuoden 2026 arvio on noin
       *     1 040;
       *   - 18. kesäkuuta 2008 paljastettiin Świdnickan kadulla kaksi
       *     hahmoa, Kuuromykkä ja Sokea, osana Wrocław ilman esteitä
       *     -kampanjaa; viisi päivää myöhemmin pystytettiin
       *     lastenhematologian ja -onkologian klinikalle kolmas hahmo,
       *     Marzenka, jonka muotoilu perustui Mam marzenie
       *     -hyväntekeväisyysjärjestön tunnukseen;
       *   - kääpiöfestivaali järjestetään joka syyskuu;
       *   - ystävyyden merkiksi kääpiöpatsaita on pystytetty myös
       *     Berliiniin, Kaunasiin, Oxfordiin ja Lviviin;
       *   - matkailijat kulkevat kaupungilla kartta kädessä ja
       *     yrittävät löytää ne kaikki.
       */
      id: 'wroclawin-kaapiot',
      nimio: 'Wrocław',
      otsikko: 'Kaupunki, jonka muistomerkkejä on yli tuhat — ja jokainen on '
        + 'polven korkeudella',
      lunastus: [
        'Wrocławissa, Puolan kolmanneksi suurimmassa kaupungissa, on '
          + 'muistomerkki, jota ei näe jos katsoo eteenpäin. Kadunkulmissa, '
          + 'ikkunalaudoilla ja portaiden kaiteissa istuu pieniä '
          + 'pronssihahmoja, kaksikymmentä tai kolmekymmentä senttiä '
          + 'korkeita: krasnale, kääpiöt. Ensimmäinen niistä ei ollut leikkiä. '
          + 'Vuonna 2001 Świdnickan kadulle pystytettiin kääpiöpatsas '
          + 'muistomerkiksi Pomarańczowa Alternatywa -liikkeelle, jonka '
          + 'tunnus kääpiö oli, ja kaksi vuotta myöhemmin kaupunginjohtaja '
          + 'paljasti polven korkeudelle pienen laatan vanhan porvaristalon '
          + 'seinään torin ja Pyhän Elisabetin kirkon välissä. Sitten tuli '
          + 'kuvanveistäjä. Wrocławin taideakatemiasta valmistuneen Tomasz '
          + 'Moczekin viisi ensimmäistä hahmoa asetettiin paikoilleen '
          + 'elokuussa 2005: Miekkailija yliopiston lähelle, Teurastaja '
          + 'Stare Jatkin holvikäytävään, kaksi Sisyfosta Świdnickan kadulle '
          + 'ja Odranpesijä Piasekin sillan kupeeseen. Isoisäsi ei nähnyt '
          + 'yhtäkään.',
        'Ne lisääntyivät. Vuonna 2024 hahmoja oli yli kahdeksansataa, ja '
          + 'niistä kuusi asuu kaupungin ulkopuolella tehtaan pihalla; '
          + 'vuoden 2026 arvio on noin tuhat neljäkymmentä. Kaikki eivät ole '
          + 'vitsejä. Kesäkuussa 2008 paljastettiin kaksi hahmoa, Kuuromykkä '
          + 'ja Sokea, osana Wrocław ilman esteitä -kampanjaa, ja viisi '
          + 'päivää myöhemmin lastenklinikalle pystytettiin kolmas, Marzenka, '
          + 'jonka muotoilu perustui erään toivomuksia toteuttavan järjestön '
          + 'tunnukseen. Syyskuussa kaupungissa on kääpiöfestivaali, ja '
          + 'ystävyyden merkiksi samanlaisia hahmoja seisoo myös '
          + 'Berliinissä, Kaunasissa, Oxfordissa ja Lvivissä. Matkailijat '
          + 'kulkevat kaupungilla kartta kädessä ja yrittävät löytää ne '
          + 'kaikki, mikä ei onnistu — se on muistomerkki, joka ei ole '
          + 'valmis eikä pysy paikallaan lukumääränä.',
      ],
      lahde: 'en-Wikipedia "Wrocław Dwarfs"; tarkistettu 30.8.2026.',
      /*
       * Kuva on UUSI Commons-haku (ei pelidatassa aiemmin). Commons
       * 30.8.2026: 3456×4608, CC BY-SA 4.0, Matti Blume, kuvattu
       * 26.4.2024, kuvaus "European krasnale (dwarfs) in Widok Street,
       * Wrocław". Restrictions tyhjä. SILMÄTARKISTUS TEHTY (900 px):
       * kaksi pronssikääpiötä ikkunalaudalla sateenvarjon alla,
       * hahmoihin on sidottu sininen nauha; ei ihmisiä.
       *
       * SELITE KERTOO KOHTEESTA EIKÄ KUVASTA (Raamattu, omistajan
       * linjaus 22.8.2026), joten se ei selitä nauhaa: nauha on jonkun
       * kadulla lisäämä koriste eikä osa hahmoja.
       */
      kuva: {
        tiedosto: 'Dwarfs, Wroclaw (P1180307).jpg',
        selite: 'Wrocławin krasnale ovat 20–30 senttiä korkeita '
          + 'pronssihahmoja, ja niitä on kaupungin kaduilla yli 800.',
        lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi kaupunki muistaa kääpiöillä eikä patsailla?',
        'Kuinka monta hahmoa kaupunkiin mahtuu?',
        'Voiko muistomerkki olla piiloleikki?',
      ],
      /*
       * 51,11 N / 17,0325 E — en-Wikipedia "Wrocław", prop=coordinates
       * (haettu 30.8.2026). Sama kaava kuin edellä.
       */
      paikka: {
        nimi: 'Wrocław',
        laudat: {
          maailmankartta: { x: 6401.1, y: 1341.6 },
          europe: { x: 538.2, y: 549.4 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Rafaelin kadonnut
   * muotokuva (js/packs/paikallisaarteet.js, POL). Merkintä aukeaa, kun
   * aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   *
   * MERKINTÄ EI NIMEÄ TAULUA EIKÄ KERRO SEN KOHTALOA, JA SE ON
   * TARKOITUS. Isoisä kirjoittaa vuonna 1873 eikä voi tietää vuodesta
   * 1945; oppitunti kertoo koko tarinan, merkintä aavistaa vain.
   * Merkinnän ajoituksesta ks. oppituntilohkon "AJOITUSKYSYMYS".
   */
  aarremerkinta: {
    teksti: 'Ruhtinaan kokoelma on paennut viime sotaa Pariisiin, ja '
      + 'siellä näin keväällä muotokuvan, jonka edessä unohdin '
      + 'hengittää: nuori mies turkiskauluksessa, ja katse joka seuraa '
      + 'huoneen poikki. Mestarin käsialaa Roomasta, sanoi hoitaja, eikä '
      + 'maailmassa ole montaa sen vertaista. Täällä sanotaan, että '
      + 'kokoelma palaa pian kotiin. Kirjoitan tämän muistiin siksi, '
      + 'että sellaisilla tauluilla on tapana lähteä liikkeelle, kun '
      + 'ajat huononevat — ja pysyä kateissa kauan.',
  },
};
