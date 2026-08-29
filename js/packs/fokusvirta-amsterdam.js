/*
 * AMSTERDAMIN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4A.
 *
 * Sisartiedosto js/packs/fokusvirta-dubrovnik.js:lle ja
 * js/packs/fokusvirta-tukholma.js:lle: samat kentät, sama järjestys,
 * sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4A kaanontekstit):
 * matkakirjan paikkarivi, matkakirjan teksti, LIVIAN HUOMIO
 * (`pollo.teksti`) ja aarremerkinnän teksti ovat SANATARKASTI hänen
 * kirjoittamansa — sanajärjestystä ei ole muutettu eikä tekstiä
 * lyhennetty. Luenta on sama teksti tunnetagein; yksikään sana ei
 * vaihdu. Kaikki muu tässä tiedostossa on tämän paketin omaa työtä.
 *
 * ISO AARRE: VOC-kauppalaivan hopealasti. PIENI AARRE: kori
 * tulppaanisipuleita (js/packs/paikallisaarteet.js, NLD) — molemmat
 * saavat tässä paketissa oman vastineensa: hopealastin täky
 * 'voc-hylky' ja tulppaanisipulien täkynosto 'tulppaanimania'.
 *
 * FAKTAPOHJA. Aallon 4A maille EI ole valmista takynostot-työaineistoa,
 * joten täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu
 * kahdesta lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Amsterdamin kaupunkilehti
 *      (js/packs/kulttuuri-kategoriat.js, amsterdam: osiot 'kaupunki'
 *      ja 'taide' sekä avauskuvat) ja Alankomaiden maalehti
 *      (js/packs/maa-kategoriat.js, NLD: historia, luonto, keksinnöt,
 *      arki). Nämä on jo kertaalleen tarkistettu ja hyväksytty peliin
 *      — myös niiden KUVAT, joita tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu
 *      KAHDESTA riippumattomasta lähteestä. Ne on nimetty kunkin
 *      kohdan omassa kommentissa. Mitään ei ole päätelty eikä
 *      pyöristetty.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, amsterdam/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOT PUUTTUVAT, JA SE ON TIETOINEN ──────────────────────
 *
 * `kohteet`-kenttä lukee maan fokuskohdelistan (esim. js/packs/
 * fokuskohteet-hrv.js). Alankomaille sellaista tiedostoa ei ole, eikä
 * tämä paketti luo sitä — rajaus on yhden tiedoston kokoinen. Kun
 * NLD-lista joskus syntyy, kohdenostot ovat tänne yhden rivin lisäys.
 *
 * ── KOHTAAMINEN ON LUONNOS ─────────────────────────────────────────
 *
 * Kohtaamisen teksti on EHDOTUS päätoimittajalle (ks. FABLE KATSELMOI
 * alempana), ei kaanonia. Kuvaa siinä ei ole. Hahmo ja laattakysymys
 * tulevat tarinakaaren paketista (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'amsterdam'): siltavahti Willem ja kysymys
 * kanavatalojen päädyissä olevasta koukusta.
 *
 * ── ÄÄNITE ODOTTAA GENEROINTIA ─────────────────────────────────────
 *
 * `matkakirja.luenta` on valmis ja `matkakirja.aanite` osoittaa aallon
 * kaavan mukaiseen polkuun (assets/audio/puhe-fokus-matkakirja-
 * amsterdam.mp3). TIEDOSTOA EI OLE VIELÄ REPOSSA: se syntyy aallon
 * yhteisessä luentaerässä (tools/generoi-luennat.mjs). Ennen sitä
 * kytkin osoittaa puuttuvaan tiedostoon, joten julkaisijan on joko
 * ajettava generointi tai kommentoitava rivi pois.
 *
 * ── REKISTERÖINTI ──────────────────────────────────────────────────
 *
 * Tätä tiedostoa EI ole kytketty rekisteriin (js/packs/fokusvirrat.js);
 * kytkentä on integroijan yhden rivin työ, ja se tehdään vasta kun
 * kohtaamisen sanamuoto on katselmoitu.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä) — ei arvattuja nimiä. Kaikki ovat PD, CC0,
 * CC BY tai CC BY-SA, ja tekijä on `lahde`-rivillä. Ihmisiä
 * sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Yövartio-kysymys on Amsterdamin lehden sivun
 * 2 ("Taide") oman noston "Yövartiosta sahattiin palat pois" tekstiä ja
 * paalukysymys sivun 1 ("Amsterdam") oman noston "Koko kaupunki seisoo
 * puutukkien päällä" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI NOSTOKOUKKUKYSYMYSTÄ: kaupungin laattakysymys koskee
 * kanavatalon päädyssä olevaa koukkua (ks. KOHTAAMINEN alempana). Jos
 * lehden aarteen avaava tehtävä kysyisi samasta koukusta, aarrekysymys
 * olisi ratkaistu ennen kuin Willemiä on tavattu.
 *
 * HUOM. SIVUN 1 KULTTUURIVISA on Amsterdamin oma kysymys kapeista
 * kanavataloista (js/packs/europe-kulttuuri.js), ja js/fokustehtavat.js
 * pukee sen samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään
 * täällä. Se sivuaa oppitunnin aihetta muttei vastaa laattakysymykseen:
 * kapeuden syy on vero, koukun syy on portaat.
 */
const YOVARTIO_VISA = {
  kysymys: 'Rembrandtin Yövartiota leikattiin vuonna 1715 joka '
    + 'reunalta. Miksi?',
  vaihtoehdot: [
    'Reunat olivat vaurioituneet kosteudessa',
    'Taulu ei mahtunut sille varatulle seinälle',
    'Tilaajat maksoivat vain kuvassa näkyvistä miehistä',
  ],
  oikea: 1,
  fakta: 'Vasemmalta katosi kaksi miestä, alta askelman reuna ja '
    + 'ylhäältä holvikaaren huippu, eikä palasia ole löydetty. Se, '
    + 'miltä taulu näytti ennen leikkausta, tiedetään vain Gerrit '
    + 'Lundensin pienoiskopiosta.',
};

const PAALU_VISA = {
  kysymys: 'Damin aukion palatsi avattiin kaupungintaloksi vuonna 1655. '
    + 'Kuinka monen puupaalun varaan se pystytettiin?',
  vaihtoehdot: [
    '13 659 paalun',
    '54 300 paalun',
    '2 137 paalun',
  ],
  oikea: 0,
  fakta: 'Paalu kestää täsmälleen niin kauan kuin se pysyy veden alla. '
    + 'Jos pohjavesi laskee, puu alkaa lahota ja talo nojaa '
    + 'naapuriinsa.',
};

export const FOKUSVIRTA_AMSTERDAM = {
  kaupunki: 'amsterdam',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, vain piste lisätty. */
    paikkarivi: 'Amsterdam, toukokuussa 1873.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Tämä kaupunki on rakennettu veteen lyötyjen paalujen '
      + 'varaan, ja minusta tuntuu, että myös sen omaisuus seisoo '
      + 'samalla tavalla — ilmaan luotetun arvon päällä. Kanavat '
      + 'kiertävät kehinä kuin puun vuosirenkaat. Timanttihiomoissa '
      + 'juutalaiset mestarit halkovat kiviä, jotka kulkevat täältä '
      + 'kaikkien kruunupäiden sormiin. Vanhat miehet puhuvat yhä '
      + 'Kompaniasta, jonka laivat toivat idän rikkaudet — ja veivät '
      + 'monta miestä, jotka eivät palanneet.',
    /*
     * LUENTA = sama teksti tunnetagein (Raamattu, luentaprosessi):
     * neljä tagia, alku ja loppu eri sävyssä, yksikään sana ei vaihdu.
     */
    luenta: '[curious] Tämä kaupunki on rakennettu veteen lyötyjen '
      + 'paalujen varaan, ja minusta tuntuu, että myös sen omaisuus '
      + 'seisoo samalla tavalla — ilmaan luotetun arvon päällä. '
      + '[softly] Kanavat kiertävät kehinä kuin puun vuosirenkaat. '
      + 'Timanttihiomoissa juutalaiset mestarit halkovat kiviä, jotka '
      + 'kulkevat täältä kaikkien kruunupäiden sormiin. [curious] '
      + 'Vanhat miehet puhuvat yhä Kompaniasta, jonka laivat toivat '
      + 'idän rikkaudet — [whispers] ja veivät monta miestä, jotka '
      + 'eivät palanneet.',
    // ÄÄNITETTÄ EI OLE VIELÄ GENEROITU, ks. tiedoston alku.
    aanite: 'assets/audio/puhe-fokus-matkakirja-amsterdam.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — TÄMÄN PAKETIN OMA TEKSTI (ei kaanonia).
     * Piirtyy kuplan ensimmäiseksi kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo).
     *
     * PARIPERIAATE (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ"):
     * merkintä on tyyni ja pohtiva, joten Livia saa tarttua sen
     * vertaukseen — eikä nalja osu isoisään vaan siihen, että hänen
     * kielikuvansa on kirjaimellisesti totta.
     *
     * FAKTAKURI: kolme väitettä, kaikki pelin omasta, jo hyväksytystä
     * aineistosta (js/packs/kulttuuri-kategoriat.js, amsterdam-osion
     * nosto "Koko kaupunki seisoo puutukkien päällä"): maaperä on
     * suota ja löysää hiekkaa, Damin palatsi lepää 13 659 paalun
     * päällä, ja paalu kestää vain veden alla — pohjaveden laskiessa
     * puu lahoaa. EI YHTÄÄN UUTTA FAKTAVÄITETTÄ.
     *
     * PUHEKIELIPASSI (Raamattu, LIVIAN PUHEKIELI): lyhentymät vain
     * reunoilla ("Kääk", "mut"), keskellä sanat auki, pronominit
     * kokonaisina, ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Se vertaus ilmaan luotetusta arvosta on paljon '
      + 'kirjaimellisempi kuin isoisäsi ehti tietää: tämän kaupungin '
      + 'alla ei ole kalliota vaan suota ja löysää hiekkaa, ja jokainen '
      + 'talo seisoo maahan lyötyjen puupaalujen varassa. Damin aukion '
      + 'palatsin alla niitä on kolmetoistatuhatta kuusisataa'
      + 'viisikymmentäyhdeksän. Ja paalu kestää täsmälleen niin kauan '
      + 'kuin se pysyy veden alla — jos pohjavesi laskee, puu lahoaa ja '
      + 'talo alkaa nojata naapuriinsa. Koko kaupunki on siis sopimus '
      + 'siitä, että vesi jätetään paikalleen. Mut se sopimus on '
      + 'pitänyt neljäsataa vuotta, eikä sitä voi sanoa kovin monesta '
      + 'sopimuksesta.',
    /* KAANON (Fable) — Livian huomio sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Amsterdamissa on enemmän siltoja kuin Venetsiassa, mut '
      + 'siitä ei pidetä täällä isoa ääntä.. Ne kanavakehät näkyvät '
      + 'lentokoneesta kuin vuosirenkaat, ihan niin kuin isoisäsi '
      + 'kirjoitti — hän vaan ei tiennyt, että joku joskus näkisi ne '
      + 'ylhäältä. Kompanian laivoista osa makaa yhä merenpohjassa. '
      + 'Muista se kohta.',
    /*
     * HEROKUVA on kaupunkilehden oman avauskarusellin generoitu kuva
     * (js/packs/kulttuuri-kategoriat.js, amsterdam/avauskuvat) — sama
     * kuva, jonka pelaaja näkee lehden kannessa. Se on juuri
     * kanaalikehä, josta Livian huomio puhuu. Selite on lyhennetty
     * saman kuvan omasta selitteestä; yhtään uutta lukua ei ole
     * lisätty.
     */
    kuva: {
      ampari: 'herokoe/hero-amsterdam-kanaalikeha.jpg',
      selite: 'Kanaalikehän kaivaminen alkoi 1613 kaupungin '
        + 'suunniteltuna laajennuksena, ja 1600-luvun kehä pääsi '
        + 'Unescon maailmanperintöluetteloon 2010.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän kolmas virke on timanttihiomoista.
       * Isoisä osui kaupunkiin keskellä sen timanttialan suurinta
       * nousukautta eikä tiennyt sitä — täky kertoo, mihin hän oli
       * kävellyt sisään toukokuussa 1873.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - nl-Wikipedia "Algemene Nederlandse Diamantbewerkersbond",
       *     osio "De Amsterdamse diamantindustrie": Amsterdam oli
       *     1800-luvun lopulla ja 1900-luvun alussa maailman tärkein
       *     timanttikeskus; juuret ovat 1500-luvulla, kun Portugalista
       *     tulleet sefardijuutalaiset asettuivat kaupunkiin; hionta
       *     tehtiin aluksi kotona; ala oli yksi harvoista, joihin ei
       *     tarvinnut kuulua kiltaan, eikä juutalaisia päästetty
       *     kiltoihin; noin vuodesta 1820 hiomapyöriä pyöritettiin
       *     hevosvoimalla ja noin 1850 alkaen höyryllä; työntekijöitä
       *     oli 1 000 vuonna 1848 ja 1 400 vuonna 1860; vuosina
       *     1870–1873 Etelä-Afrikan löydöt ("Kaapse tijd") nostivat
       *     alan jyrkkään kasvuun, ja vuodesta 1875 kehitys pysähtyi
       *     lännen talouskriisiin; huippuvuosina alalla oli yli 10 000
       *     työntekijää, joista noin 70 prosenttia juutalaisia;
       *     työpäivä oli vähintään kaksitoista tuntia ilman taukoja
       *     hämärissä huoneissa, ja silmät ja keuhkot kärsivät;
       *     ammattikunta oli tarkasti porrastettu, ylimpänä halkojat
       *     ja hiojat; ANDB perustettiin 1894 Henri Polakin ja Jan van
       *     Zutphenin johdolla, ja se oli Alankomaiden ensimmäinen
       *     suuri hyvin järjestäytynyt ammattiliitto.
       *   - nl-Wikipedia "Diamantslijperij Boas" (johdanto ja osio
       *     "Geschiedenis"): veljekset Israël, Marcus ja Hartog Boas
       *     perustivat hiomon 1870 Nieuwe Keizersgracht 16:een, jossa
       *     hiomapyöriä pyörittivät hevoset; "Kaapse tijd" (1870–1876)
       *     seurasi Kimberleyn löydöistä Etelä-Afrikassa; kasvun takia
       *     veljekset päättivät 1878 rakentaa höyrykäyttöisen tehtaan
       *     Uilenburgerstraatille, ja se valmistui 1879; avatessaan se
       *     oli Amsterdamin ja Euroopan suurin timanttihiomo, joidenkin
       *     lähteiden mukaan koko maailman; rakennus on ollut
       *     rijksmonument vuodesta 1996, ja siinä toimii vuodesta 1990
       *     Gassan Diamonds.
       *
       * MITÄ EI KERROTA FAKTANA: "Kaapin ajan" päättymisvuosi. Lähteet
       * antavat eri luvun (1873 / 1876), joten teksti sanoo vain, mistä
       * nousu alkoi ja milloin se pysähtyi kriisiin.
       */
      id: 'timantit',
      nappi: 'Kivet, jotka lähtivät täältä kruunuihin',
      otsikko: 'Timanttikaupunki juuri sinä keväänä',
      teksti: 'Isoisäsi käveli hiomoiden ohi kaupungin parhaana '
        + 'timanttivuotena eikä tiennyt sitä. Amsterdam oli tuolloin '
        + 'maailman tärkein timanttikeskus, ja ala oli päätynyt sinne '
        + 'kiertotietä: 1500-luvulla Portugalista tulleet '
        + 'sefardijuutalaiset toivat mukanaan kauppasuhteet, ja hionta '
        + 'oli yksi niistä harvoista ammateista, joihin ei tarvinnut '
        + 'kuulua kiltaan — kiltoihin heitä ei olisi otettu. Työ tehtiin '
        + 'aluksi kotona. Noin 1820 alkaen hiomapyöriä pyörittivät '
        + 'hevoset, noin 1850 alkaen höyry, ja pienet verstaat väistyivät '
        + 'tehtaiden tieltä. Ala oli silti pitkään pieni: tuhat '
        + 'työntekijää vuonna 1848, tuhat neljäsataa vuonna 1860. Sitten '
        + 'Etelä-Afrikan Kimberleystä alkoi vuonna 1870 nousta raakaa '
        + 'timanttia enemmän kuin kukaan osasi odottaa, ja Amsterdamiin '
        + 'tuli kausi, jota täällä sanotaan yhä Kaapin ajaksi. Veljekset '
        + 'Boas olivat aloittaneet samana vuonna hiomon Nieuwe '
        + 'Keizersgrachtilla hevoskierron voimalla; kahdeksan vuotta '
        + 'myöhemmin he tilasivat höyrytehtaan, joka valmistui 1879 ja '
        + 'oli avatessaan Euroopan suurin. Nousu ei kestänyt: vuodesta '
        + '1875 länsimaiden talouskriisi pysäytti sen, ja luksuskivi on '
        + 'juuri sellainen tavara, joka jää ensimmäisenä myymättä. '
        + 'Huippuaikoina alalla oli yli kymmenentuhatta työntekijää, '
        + 'noin seitsemän kymmenestä juutalaisia, ja työ oli sitä mitä '
        + 'kimalluksesta ei näy: kaksitoistatuntisia päiviä ilman taukoja '
        + 'hämärissä huoneissa, ja silmät ja keuhkot maksoivat siitä. '
        + 'Vuonna 1894 juuri nämä työläiset perustivat maan ensimmäisen '
        + 'suuren ammattiliiton. Boasin tehdas seisoo yhä '
        + 'Uilenburgerstraatilla, ja siellä hiotaan edelleen timantteja.',
      /*
       * Commons 29.8.2026: 2629×2029, CC0, Willem van de Poll, kuvattu
       * 1.1.1932, kuvaus "Slijpen van de diamant bij Van Moppes in
       * Amsterdam" (Fotocollectie Van de Poll, reportaasi
       * "Diamanthandel, slijperijen, -beurs"). Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on hioja työpöytänsä ääressä,
       * edessä vaakatasossa pyörivä hiomatahko; taustalla toinen
       * työntekijä. Arkistokuva työn ääressä, ei yksityishenkilön
       * kuvaa.
       *
       * KUVA ON VUODELTA 1932 EIKÄ 1873, ja selite sanoo sen ääneen —
       * kuva ei saa väittää olevansa isoisän ajalta.
       */
      kuva: {
        tiedosto: 'Slijpen van de diamant bij Van Moppes in Amsterdam, Bestanddeelnr 252-0343.jpg',
        selite: 'Timantin hionta amsterdamilaisessa hiomossa vuonna '
          + '1932: kivi painetaan vaakatasossa pyörivää tahkoa vasten, '
          + 'ja tahkoon on hierottu timanttipölyä.',
        lahde: 'Willem van de Poll, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Miksi timanttien hionta oli Amsterdamissa '
          + 'vuosisatojen ajan erityisen usein juutalaisten työtä?',
        /*
         * PITUUSJAKAUMA (Raamattu, kysymyssääntö 2): oikea vaihtoehto
         * ei ole lyhin eikä pisin, ja väärillä on omat sivulauseensa.
         */
        vaihtoehdot: [
          'Kaupunki myönsi hiojille erioikeuden',
          'Raakatimantteja sai tuoda vain Portugalista',
          'Kiltajäsenyys ei ollut alalla pakollinen',
        ],
        oikea: 2,
        fakta: 'Kiltoihin juutalaisia ei otettu, ja timanttityö oli '
          + 'yksi harvoista ammateista, joka ei kiltaa vaatinut. Työ '
          + 'alkoi kotona ja siirtyi verstaisiin vasta, kun '
          + 'hiomapyöriä alettiin pyörittää ensin hevosilla ja sitten '
          + 'höyryllä.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: merkintä ja Livian huomio ovat molemmat
       * vedestä ja kanavista. Tämä on saman veden nykyinen asukas —
       * ja tarina siitä, miten sata vuotta muutti linnun ja ihmisen
       * välimatkan.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Grey heron", osio "City life": harmaahaikara
       *     kykenee elämään kaupungeissa, joissa on sopivaa
       *     elinympäristöä ja pesäpaikkoja; Alankomaissa laji on
       *     asettunut viime vuosikymmeninä kaupunkeihin suurin määrin;
       *     Amsterdamin kaltaisissa kaupungeissa haikarat ovat
       *     jatkuvasti läsnä ja sopeutuneet nykyiseen kaupunkielämään;
       *     ne saalistavat tavalliseen tapaan mutta käyvät myös
       *     katutoreilla ja pikaruokakojuilla, jotkut yksilöt käyttävät
       *     hyväkseen ihmisiä, jotka ruokkivat niitä kotonaan, tai
       *     jakavat vapaa-ajankalastajien saalista; vastaavaa on
       *     havaittu pienemmässä mitassa Irlannissa.
       *   - nl-Wikipedia "Blauwe reiger", osiot "Blauwe reiger en de
       *     mens" ja "Bescherming": 2000-luvun alun Amsterdamissa osa
       *     harmaahaikaroista on täysin sopeutunut kaupunkielämään,
       *     niillä on vakituinen kojunsa, jolla ne ruokailevat, tai
       *     niitä ruokitaan säännöllisinä aikoina; laji rauhoitettiin
       *     Alankomaissa täysin vuonna 1963, mikä johti sopeutumiseen
       *     ihmiseen; ruokinnan takia linnut kestävät kovia talvia
       *     paremmin ja pesivät yhä aikaisemmin — kaupungeissa joskus
       *     jo tammikuun lopussa; ennen rauhoitusta, Jac. P. Thijssen
       *     aikaan noin 1900, haikarat pysyttelivät aina etäällä,
       *     näkivät jokaisessa liikkuvassa olennossa vihollisen,
       *     pesivät korkeimpien puiden latvoissa tai luoksepääsemättömien
       *     soiden ruovikoissa ja lensivät saalistusmailleen satojen
       *     metrien korkeudessa poissa laukausten ulottuvilta; pesät
       *     ovat suuria ja litteitä oksarakennelmia.
       */
      id: 'haikarat',
      nappi: 'Lintu, joka jonottaa kalakojulla',
      otsikko: 'Amsterdamin harmaahaikarat',
      teksti: 'Jos seisot kanavan sillalla tarpeeksi kauan, huomaat '
        + 'seuralaisen: harmaahaikaran, joka seisoo kaiteella kädenmitan '
        + 'päässä eikä ole tietääkseenkään. Sata vuotta sitten se olisi '
        + 'ollut mahdotonta. Lintutieteilijä Jac. P. Thijsse kirjoitti '
        + 'noin vuonna 1900, että haikara pitää aina etäisyyttä ja näkee '
        + 'jokaisessa liikkuvassa olennossa vihollisen: se pesii '
        + 'korkeimpien puiden latvoissa tai soiden ruovikoissa, lentää '
        + 'saalistusmailleen satojen metrien korkeudessa ja jähmettyy '
        + 'liikkumattomaksi puoleksi tunniksi, jos jokin epäilyttää. '
        + 'Alankomaissa laji rauhoitettiin täysin vuonna 1963, ja '
        + 'muutamassa sukupolvessa lintu vaihtoi mielensä. Nykyään '
        + 'Amsterdamin haikarat ovat kaupunkilaisia siinä missä muutkin: '
        + 'ne saalistavat kanavissa tavalliseen tapaan, mutta käyvät '
        + 'myös torikojuilla ja pikaruokapaikoilla, tuntevat omat '
        + 'ruokkijansa kellonaikoineen ja odottavat vapaa-ajankalastajan '
        + 'vieressä osuuttaan. Ruoan varmuus näkyy myös kalenterissa: '
        + 'kaupungissa haikarat aloittavat pesinnän joskus jo tammikuun '
        + 'lopussa, kun luonnossa on vielä talvi. Pesä on iso ja litteä '
        + 'risukasa puun latvassa, ja se on siellä koko vuoden — sama '
        + 'lintu, joka isoisäsi aikaan väisti ihmistä puolen '
        + 'peninkulman päähän, katsoo nyt hänen jälkeläistään silmiin '
        + 'sillankaiteelta.',
      /*
       * Commons 29.8.2026: 2048×1536, CC BY-SA 3.0, Apus apus, kuvattu
       * 21.11.2010, kuvaus "Grey heron (Ardea cinerea) on an Amsterdam
       * bridge". Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * haikara kaiteella jäätyvän kanavan rannassa, taustalla taloja,
       * asuntolaivoja ja raitiovaunu — ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Ardea cinerea - Amsterdam.jpg',
        selite: 'Harmaahaikara seisoo sillan kaiteella amsterdamilaisen '
          + 'kanavan yllä; kaupungin haikarat elävät ihmisten seassa '
          + 'ympäri vuoden.',
        lahde: 'Apus apus, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Mikä muutti harmaahaikaran ja ihmisen välimatkan '
          + 'Alankomaissa vuonna 1963?',
        vaihtoehdot: [
          'Kaupungit alkoivat maksaa palkkiota pesistä',
          'Laji rauhoitettiin Alankomaissa täysin',
          'Kanavat puhdistettiin, ja kalat palasivat',
        ],
        oikea: 1,
        fakta: 'Rauhoituksen jälkeen linnut alkoivat myös hyötyä '
          + 'ruokinnasta: ne kestävät kovat talvet paremmin ja pesivät '
          + 'kaupungeissa joskus jo tammikuun lopussa.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän viimeinen virke on Kompanian
       * laivoista, jotka eivät palanneet, ja Livia sanoo suoraan, että
       * osa niistä makaa yhä merenpohjassa. Tämä on yksi niistä
       * laivoista — se, joka ei päässyt edes Kanaalin yli.
       *
       * TÄKY EI PALJASTA AARRETTA. Aarremerkintä (tiedoston lopussa)
       * aukeaa vasta löydön jälkeen, ja se puhuu satamakonttorin
       * listasta eikä tästä hylystä. Pohjustus on tarkoituksellinen ja
       * hiljainen, samaan tapaan kuin Dubrovnikin Sponza-täky.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - nl-Wikipedia "Amsterdam (schip, 1748)" (johdanto sekä osiot
       *     "Eerste reis", "Ondergang", "Archeologisch erfgoed" ja
       *     "Replica"): VOC:n spiegelretourschip, rakennettu 1748
       *     yhtiön omalla telakalla Amsterdamissa; lähti Texelin
       *     redeltä ensimmäiselle matkalleen 8.1.1749 kohti Bataviaa;
       *     mukana 203 miehistön jäsentä, kapteenina 33-vuotias Willem
       *     Klump, 127 sotilasta ja 5 matkustajaa; lastina
       *     kauppatavaraa (kangasta ja viiniä), painolastia
       *     (rakennuskiveä ja tykkejä), yhtiön omaan käyttöön menevää
       *     tavaraa (paperia, kyniä, työkaluja) ja muonaa sekä 27
       *     arkkua hopeaa, arvoltaan noin 300 000 guldenia; lounaismyrsky
       *     esti Atlantille pääsyn, laiva osui hiekkasärkkään ja menetti
       *     peräsimensä Hastingsin edustalla, ja 26. tammikuuta kapteeni
       *     ajoi sen rantaan pelastaakseen laivan ja miehistön;
       *     miehistö pääsi maihin ja sai suurimman osan hopeasta
       *     mukaansa, minkä jälkeen ryöstelijät kävivät laivaan käsiksi,
       *     kunnes englantilaiset joukot palauttivat järjestyksen; VOC
       *     yritti kolme viikkoa pelastaa laivaa mutta luopui
       *     11.3.1749, ja laiva vajosi saveen, jossa se on yhä;
       *     hylky löytyi uudelleen, kun se paljastui poikkeuksellisen
       *     matalan veden aikaan vuonna 1969; osa esineistä on
       *     Hastingsin haaksirikkomuseossa; replika rakennettiin
       *     1982–1990 neljänsadan vapaaehtoisen voimin, ja se on ollut
       *     vuodesta 1990 merimuseon laiturissa Amsterdamissa.
       *   - en-Wikipedia "Amsterdam (1748 ship)" (johdanto ja osiot
       *     "Ship", "Maiden voyage"): samat luvut miehistöstä,
       *     sotilaista, matkustajista ja 27 hopea-arkusta; hylky
       *     löydettiin 1969 Bulverhythen lahdelta Hastingsin luota ja
       *     se näkyy toisinaan matalan veden aikaan; kohde on Historic
       *     Englandin suojelema hylky; menomatkalla nämä laivat veivät
       *     tykkejä ja tiiliä sekä hopea- ja kultarahaa, joilla
       *     aasialainen tavara maksettiin, ja paluumatkalla mausteita,
       *     kankaita ja posliinia.
       */
      id: 'voc-hylky',
      nappi: 'Laiva, joka ei päässyt edes Kanaalin yli',
      otsikko: 'Amsterdam makaa Englannin hiekassa',
      teksti: 'Kompanian laivat menivät itään hopea lastinaan ja '
        + 'palasivat mausteet, kankaat ja posliini ruumassaan — se oli '
        + 'koko liikeidea. Yksi niistä ei ehtinyt edes alkuun. Amsterdam '
        + 'rakennettiin 1748 yhtiön omalla telakalla, ja se lähti '
        + 'ensimmäiselle matkalleen Texelin redeltä 8. tammikuuta 1749 '
        + 'kohti Bataviaa. Kannen alla oli 203 merimiestä, 127 sotilasta '
        + 'ja viisi matkustajaa, kapteenina 33-vuotias Willem Klump. '
        + 'Lastina oli kangasta, viiniä, rakennuskiveä, tykkejä, '
        + 'paperia, kyniä ja työkaluja — ja kaksikymmentäseitsemän '
        + 'arkkua hopeaa, arvoltaan noin kolmesataatuhatta guldenia. '
        + 'Lounaismyrsky ei antanut periksi. Laiva ei päässyt '
        + 'Atlantille, osui hiekkasärkkään, menetti peräsimensä, ja '
        + 'tammikuun 26. päivänä kapteeni teki ainoan jäljellä olevan '
        + 'ratkaisun: ajoi laivan rantaan Hastingsin kupeeseen. '
        + 'Miehistö pääsi maihin ja sai suurimman osan hopeasta '
        + 'mukanaan, loput veivät rannalle ryntäneet ryöstelijät. Kolme '
        + 'viikkoa yhtiö yritti saada laivaa irti, ja 11. maaliskuuta '
        + 'se luovutti. Amsterdam vajosi saveen ja jäi sinne. Kaksisataa '
        + 'kaksikymmentä vuotta myöhemmin, vuonna 1969, vesi laski '
        + 'poikkeuksellisen matalalle ja paljasti sen: runko oli '
        + 'tallella, koska savi ei päästä happea puuhun. Nykyään hylky '
        + 'on suojeltu, sen kylkiluut näkyvät rannalla vain harvoina '
        + 'päivinä vuodessa, ja siitä nostetut esineet ovat Hastingsin '
        + 'haaksirikkomuseossa. Amsterdamissa on lisäksi laiva itse — '
        + 'tai sen kokoinen kopio, jonka neljäsataa vapaaehtoista '
        + 'rakensi vuosina 1982–1990. Se on merimuseon laiturissa, ja '
        + 'sinne pääsee kävelemään kuivin jaloin.',
      /*
       * Commons 29.8.2026: 5027×3352, CC BY-SA 2.0, Adrian Diack
       * (geograph.org.uk), kuvaus "The wreck of the Amsterdam in the
       * fossil forest at Bulverhythe". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on laskuveden paljastama rannan
       * hiekka, hylyn tummat kaaret ja etualalla muinaismetsän kantoja;
       * hylyn ympärillä seisoo kaukainen ryhmä katsojia, joista ketään
       * ei voi tunnistaa.
       */
      kuva: {
        tiedosto: 'The wreck of the Amsterdam in the fossil forest at Bulverhythe - geograph.org.uk - 8295766.jpg',
        selite: 'Amsterdam-laivan runko paljastuu Bulverhythen rannalla '
          + 'vain poikkeuksellisen matalan veden aikaan; etualalla '
          + 'näkyy muinaismetsän kantoja.',
        lahde: 'Adrian Diack, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Miten Amsterdam-laivan hylky löytyi uudelleen vuonna '
          + '1969?',
        vaihtoehdot: [
          'Sukeltajat etsivät sitä kymmenen vuoden ajan vanhojen '
            + 'merikorttien avulla',
          'Se nostettiin telakalle Hastingsissa',
          'Vesi laski poikkeuksellisen matalalle ja paljasti sen',
        ],
        oikea: 2,
        fakta: 'Runko säilyi, koska savi ei päästä happea puuhun. Hylky '
          + 'on nykyään suojeltu, ja siitä nostetut esineet ovat '
          + 'Hastingsin haaksirikkomuseossa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, amsterdam: *"Amsterdamin vanhojen talojen päädyssä
   * on melkein aina koukku katonrajassa. Mitä varten?"*). Visasääntö
   * täyttyy: vastaus on tekstissä, mutta kysymyksen sanamuoto ei toistu
   * siinä sellaisenaan — teksti puhuu verosta, ullakoista ja
   * nostoluukuista eikä lausu vastausriviä ääneen.
   *
   * FAKTAT:
   *   - js/packs/kulttuuri-kategoriat.js, amsterdam-osion nostot
   *     "Verotettiin julkisivun leveydestä" ja "Koko kaupunki seisoo
   *     puutukkien päällä" (pelin omaa tarkistettua aineistoa):
   *     1600-luvulla kiinteistövero laskettiin julkisivun leveydestä;
   *     kapein talo Oude Hoogstraat 22 on 2,02 metriä leveä ja kuusi
   *     metriä syvä; portaat ovat jyrkät kuin tikkaat; päätykolmion
   *     alta työntyy nostopuu, hijsbalk, jonka koukusta huonekalut
   *     vedetään köydellä ikkunasta sisään; talot rakennettiin hieman
   *     eteenpäin kallelleen, jottei nostettava tavara kolhisi
   *     julkisivua.
   *   - nl-Wikipedia "Hijsbalk" ja "Grachtenpand" (tarkistettu
   *     29.8.2026): nostopuu on palkki, joka työntyy rakennuksen
   *     päätykolmion läpi ja jolla tavaraa nostetaan köydellä ja
   *     taljalla; tekniikka syntyi tarpeesta varastoida kauppatavaraa
   *     ullakoille, koska Amsterdam oli 1600-luvulla maan tärkein
   *     tavaranvälitysmarkkina; ensin varastoitiin kellareihin ja
   *     asuintalojen kerroksiin, ja useimmissa kauppiaiden
   *     kanavataloissa on yksi tai kaksi tavaraullakkoa, jotka
   *     tunnistaa suuremmasta keskimmäisestä ikkunasta, jossa on ollut
   *     nostoluukut, ja usein sen yläpuolella on yhä nostorulla;
   *     nostopuu jäi asuintaloihin senkin jälkeen kun kauppatavara
   *     siirtyi makasiineihin, ja siellä sitä käytetään enää
   *     muutoissa; kanavatalot ovat korkeita, kapeita ja syviä juuri
   *     siksi, että vero perittiin julkisivun leveydestä, ja tulvien
   *     takia ulko-ovi on usein korotetulla kerroksella.
   *
   * TÄMÄ EI TOISTA LEHTEÄ VAAN SELITTÄÄ SEN. Sivun 1 nosto kertoo
   * verosta ja kapeudesta; oppitunti kertoo, mitä kapeus tarkoitti
   * talon sisällä ja miksi tavara kulki ikkunasta.
   */
  oppitunti: {
    otsikko: 'Miksi tavara kulkee ikkunasta',
    teksti: 'Isoisäsi kirjoitti paaluista, mutta yhtä hyvin hän olisi '
      + 'voinut kirjoittaa verottajasta. 1600-luvun Amsterdamissa '
      + 'kiinteistövero laskettiin julkisivun leveydestä, joten '
      + 'rakentaja otti tontista kaiken irti kahteen muuhun suuntaan: '
      + 'talot tehtiin kapeiksi, syviksi ja korkeiksi. Kapein niistä, '
      + 'Oude Hoogstraat 22, on kaksi metriä kaksi senttiä leveä ja '
      + 'kuusi metriä syvä. Kapea talo tarkoittaa kapeaa porrasta, ja '
      + 'amsterdamilainen porras on jyrkkä kuin tikkaat — sitä pitkin '
      + 'nousee ihminen, ei arkku. Ja arkkuja oli. Kaupunki oli '
      + '1600-luvulla koko maan tavaranvälitysmarkkina, ja tavara '
      + 'varastoitiin kellareihin ja ullakoille: useimmissa kauppiaiden '
      + 'kanavataloissa on yksi tai kaksi tavaraullakkoa. Ne tunnistaa '
      + 'yhä ulkoa, sillä ullakon keskimmäinen ikkuna on muita suurempi '
      + '— siinä on ollut leveät luukut, ja niiden yläpuolella on usein '
      + 'vieläkin pieni rulla, jonka yli köysi kulki. Köyden toinen pää '
      + 'kulki päätykolmion alta ulos työntyvän puisen palkin nokassa '
      + 'olevan koukun kautta. Palkkia sanotaan nostopuuksi, hijsbalk, '
      + 'ja se on syy siihen, että monet vanhat talot näyttävät '
      + 'kaatuvan kadulle päin: ne rakennettiin tahallaan hieman '
      + 'etunojaan, jottei nostettava kuorma kolhisi julkisivua. Kun '
      + 'kauppatavara aikanaan siirtyi omiin makasiineihinsa, palkki '
      + 'jäi asuintaloihin. Se ei ole koriste. Sitä käytetään yhä, ja '
      + 'jokainen muuttopäivä kertoo miksi.',
    /*
     * KUVA ON PELIN OMASTA AINEISTOSTA (sama tiedosto kaupunkilehden
     * nostossa "Verotettiin julkisivun leveydestä", js/packs/
     * kulttuuri-kategoriat.js) — siis jo kertaalleen tarkistettu ja
     * hyväksytty. TOISTO ON TIETOINEN: oppitunti selittää täsmälleen
     * sen esineen, jonka pelaaja on juuri nähnyt lehdessä, ja kuva on
     * ainoa hyväksytyssä aineistossa oleva, jossa nostopuu näkyy
     * lähietäisyydeltä.
     *
     * Commons 29.8.2026: 3543×2372, CC BY-SA 4.0, René Gerritsen
     * (Rijksdienst voor het Cultureel Erfgoed), kuvaus "Hijsbalk:
     * Detail van de top van de voorgevel, een klokgevel, met hijsbalk".
     * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on julkisivun
     * yläosa ja nostopuu, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Detail van de top van de voorgevel, een klokgevel, met hijsbalk - Amsterdam - 20528909 - RCE.jpg',
      selite: 'Kellopäädyn alta työntyvä hijsbalk-nostopuu on yhä '
        + 'käytössä, ja talot rakennettiin hieman eteenpäin kallelleen, '
        + 'jottei nostettava tavara kolhisi julkisivua.',
      lahde: 'René Gerritsen, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* FABLE KATSELMOI: kohtaamisluonnos */

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * TÄMÄ TEKSTI ON EHDOTUS EIKÄ KAANONIA. Hahmo, laattakysymys ja
   * kohtaamisen oma repliikki ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'amsterdam'):
   * siltavahti Willem kääntää kammella auki saman kääntösillan, jota
   * hänen sukunsa on avannut purjeille sukupolvien ajan, ja hänen
   * kirjaansa on merkitty jokainen vene, jolle silta on avattu.
   *
   * MITÄ LUONNOS EI TEE: se ei kertaa Willemin repliikkiä, ei toista
   * hänen kirjansa yksityiskohtaa isoisän veneestä eikä paljasta
   * laattakysymyksen vastausta. Viimeinen virke on kehotus katsoa
   * ylös — se on vihje, ei vastaus, ja lunastuu vasta visassa.
   *
   * KUVAA EI OLE (omistajan rajaus aallolle 4A).
   */
  kohtaaminen: {
    hahmo: 'Siltavahti Willem',
    nappi: 'Tapaa siltavahti',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119): lause on
     * datassa, koska suomen genetiivi ei taivu koneellisesti jokaisesta
     * nimestä.
     */
    varmistus: 'Haluatko varmasti tavata Willemin juuri nyt?',
    /*
     * VIHJELINKIN OSIO on kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js): Amsterdamin lehdessä on kaksi osiota,
     * 'kaupunki' ("Amsterdam") ja 'taide' ("Taide"). Willemin kysymys
     * koskee kanavatalon päätyä, ja lähin tuki sille on Amsterdam-osion
     * nosto "Verotettiin julkisivun leveydestä". Se ei anna vastausta,
     * vaan nyökkää siihen suuntaan.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Willem seisoo kääntösillan kammen vieressä niin kuin hänen '
      + 'isänsä ja isoisänsä seisoivat: avaa, odottaa, sulkee, merkitsee '
      + 'rivin. Työ on tylsää kymmenen kertaa päivässä ja tarkkaa '
      + 'yhdennellätoista, ja hän tekee sen samalla ilmeellä. Vieraita '
      + 'hän ei karta eikä hae; hän vastaa kysymyksiin lyhyesti ja '
      + 'palaa kampeen. Mutta kirjaa hän ei avaa kenelle tahansa. Ennen '
      + 'kuin hän kääntää sivun vieraan nähden, hän haluaa tietää, onko '
      + 'tulija katsonut kertaakaan ylös — sinne, missä kanavatalojen '
      + 'päädyt ovat.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: MAGERE BRUG. Willem on siltavahti, ja tämä on
   * kaupungin tunnetuin käsin kammettava kääntösilta — pelin oma
   * Amsterdam-aineisto nimeää sen (js/packs/kulttuuri-kategoriat.js,
   * amsterdam/avauskuvat: *"Laiha silta eli Magere Brug on Amstelin yli
   * johtava valkoinen puinen kääntösilta"*).
   *
   * 52,36361111 N / 4,9025 E — nl-Wikipedia "Magere Brug",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((4,9025 − (−175)) mod 360) × (12000/360)
   *                     = 179,9025 × 33,3333… = 5996,8
   *                   y = (millerY(76) − millerY(52,36361111)) × 12000/2π
   *                     = 1285,9
   *   europe          x = (4,9025 + 11) × 19,2 = 305,3
   *                   y = (72 − 52,36361111) × 26,3 = 516,4
   *
   * TARKISTUS LAATTAA VASTEN: Amsterdamin laatta on Euroopan laudalla
   * 305 / 516 (js/packs/europe.js) ja maailmankartalla 5996,8 / 1285,7,
   * eli piste osuu käytännössä laatan päälle. Niin pitääkin — silta on
   * keskustassa runsaan kilometrin päässä Damista, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä. Piirtopuoli hoitaa erotuksen
   * itse: alle 14 yksikön päässä laatasta piste siirretään koilliseen
   * (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Magere Brug',
    laudat: {
      maailmankartta: { x: 5996.8, y: 1285.9 },
      europe: { x: 305.3, y: 516.4 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Amsterdamin sivupino (js/lehti.js
   * rakennaSivut) on Dubrovnikin mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Amsterdam", 2 = Taide, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Vermeerin peittämät esineet) väistyy nimetyn
   * tieltä, joten sivulla on Raamatun vaatima yksi minitehtävä eikä
   * kahta. Sivun 1 kysymys on Amsterdamin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: YOVARTIO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PAALU_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Alankomaat) ----------
   *
   * UUSI POOLI, EI SIIRTO. Alankomaat ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen katsomattomaan.
   * Kärjeksi on valittu tulppaanimania, koska se on maan PIENEN AARTEEN
   * (kori tulppaanisipuleita) oma tarina.
   *
   * NELJÄ NOSTOA, KOSKA MAA ON SISÄLTÖRIKAS: raha, vesi, tiede ja yksi
   * pako. Aiheet on valittu niin, ettei kaksi peräkkäistä ole samasta
   * maailmasta.
   *
   * PISTEET OVAT LÄHELLÄ TOISIAAN, ja se on maantiedettä eikä
   * huolimattomuutta: Alankomaat mahtuu Euroopan laudalla noin
   * kahdenkymmenen yksikön ruutuun. Kaukaisin (Afsluitdijk) on
   * kaupungista noin 17 yksikköä pohjoiseen, lähin (Alkmaar) noin 7.
   *
   * LOISTOAIKAKUVIA EI VIELÄ OLE. Aallon 2 ja 3 nostoilla pääkuva on
   * repon oma generoitu havainnekuva (`kuva.osoite`); tämän erän kuvat
   * eivät ole vielä generoituja, joten pääkuvaksi jää valokuva tai
   * aikalaisteos kunnes generointi on ajettu. Aihe on kirjattu
   * raporttiin.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/historia, nosto "Yhdestä
       *     kukkasipulista maksettiin talon hinta" (jo hyväksyttyä
       *     pelidataa): tulppaani tuotiin 1500-luvulla Osmanien
       *     valtakunnasta; kalleimpia olivat sipulit, joiden kukkiin
       *     ilmestyi valkoista ja punaista raitaa; raidat olivat
       *     virustaudin jälkiä, mikä selvisi vasta 1928; talvella
       *     1636–37 sipuleilla käytiin kauppaa kapakoissa ja ne myytiin
       *     vielä maan alla kasvavina; Alkmaarin huutokaupassa
       *     5.2.1637 yhdestä sipulista tarjottiin 4 200 guldenia, ja
       *     samalla rahalla sai kanavatalon; kaksi päivää aiemmin
       *     kauppa oli Haarlemissa jo pysähtynyt.
       *   - en-Wikipedia "Tulip mania" (johdanto ja osio romahduksesta,
       *     tarkistettu 29.8.2026): kiihtyminen alkoi 1634 ja romahdus
       *     tuli helmikuussa 1637; huipulla eräistä sipuleista
       *     maksettiin yli kymmenkertaisesti ammattitaitoisen
       *     käsityöläisen vuositulot; kalleimmasta lajikkeesta Semper
       *     Augustuksesta maksettiin huipulla 10 000 guldenia;
       *     kauppaa sanottiin nimellä windhandel, tuulikauppa, koska
       *     yksikään sipuli ei vaihtanut omistajaa; aikalaissatiirin
       *     mukaan romahdus alkoi 3. helmikuuta 1637 Haarlemissa, kun
       *     huutokauppias ei löytänyt ostajaa vaikka laski pyyntihintaa
       *     useaan kertaan; 7. helmikuuta kasvattajat kokoontuivat
       *     Utrechtissa valitsemaan edustajia Amsterdamin
       *     kokoukseen; tapausta pidetään ensimmäisenä kirjattuna
       *     hintakuplana.
       */
      id: 'tulppaanimania',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Alkmaarin huutokauppa',
      otsikko: 'Yhdestä sipulista maksettiin kanavatalon hinta, ja '
        + 'kaksi päivää myöhemmin siitä ei maksettu mitään',
      lunastus: [
        'Tulppaani tuli Alankomaihin 1500-luvulla Osmanien '
          + 'valtakunnasta, ja pian sitä haluttiin joka puutarhaan. '
          + 'Kalleimpia olivat sipulit, joiden kukkiin ilmestyi '
          + 'valkoista ja punaista liekkikuviota — kukaan ei tiennyt '
          + 'miksi, ja sitä pidettiin lajikkeen ansiona. Talvella '
          + '1636–37 sipuleilla käytiin kauppaa kapakoissa, ja ne '
          + 'myytiin vielä maan alla kasvavina: ostaja ei ollut nähnyt '
          + 'kukkaa eikä saanut sipulia käteensä. Hollantilaiset '
          + 'sanoivat sitä tuulikaupaksi. Huipulla eräistä sipuleista '
          + 'maksettiin yli kymmenkertaisesti se, minkä taitava '
          + 'käsityöläinen ansaitsi vuodessa, ja kalleimmasta '
          + 'lajikkeesta Semper Augustuksesta jopa kymmenentuhatta '
          + 'guldenia. Alkmaarin huutokaupassa 5. helmikuuta 1637 '
          + 'yhdestä sipulista tarjottiin 4 200 guldenia — samalla '
          + 'rahalla sai kanavatalon.',
        'Kaksi päivää ennen sitä huutokauppaa kauppa oli jo pysähtynyt. '
          + 'Aikalaissatiirin mukaan romahdus alkoi 3. helmikuuta '
          + 'Haarlemissa, kun huutokauppias laski pyyntihintaa kerta '
          + 'toisensa jälkeen eikä yksikään käsi noussut. Viikossa '
          + 'sopimushinnat romahtivat, ja seitsemäntenä päivänä '
          + 'kasvattajat kokoontuivat Utrechtiin valitsemaan edustajia '
          + 'Amsterdamin kokoukseen — riita koski sopimuksia, joita '
          + 'kukaan ei enää halunnut kunnioittaa ja joita ei voinut '
          + 'panna täytäntöön. Yhtään sipulia ei koskaan toimitettu. '
          + 'Tapausta pidetään ensimmäisenä kirjattuna hintakuplana, ja '
          + 'sen kaunein yksityiskohta selvisi vasta kolmesataa vuotta '
          + 'myöhemmin: liekkikuvio, josta koko maailma maksoi, oli '
          + 'kasvitauti. Aiheuttaja tunnistettiin virukseksi vuonna '
          + '1928.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/historia, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Tulip mania", '
        + 'johdanto ja osio romahduksesta; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 1182×1829, public domain, tuntematon tekijä,
       * ajoitus "before 1640". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: aikalaisakvarelli yhdestä tulppaanista, ei ihmisiä.
       *
       * MIKSI TÄMÄ EIKÄ LEHDEN KUKKA-ASETELMA: maalehden nostossa on
       * jo Bollongierin asetelma, ja tässä on nimenomaan se lajike,
       * josta maksettiin eniten.
       */
      kuva: {
        tiedosto: 'Semper Augustus Tulip 17th century.jpg',
        selite: 'Semper Augustus oli tulppaanimanian kallein lajike, ja '
          + 'sen valko-punainen liekkikuvio oli kasvitaudin merkki.',
        lahde: 'Tuntematon tekijä ennen vuotta 1640, Wikimedia Commons '
          + '(public domain)',
      },
      kysymykset: [
        'Mistä tulppaanin liekkikuviot johtuivat?',
        'Miksi sipuleilla kaupattiin maan alla kasvavina?',
        'Mitä sopimuksille tehtiin romahduksen jälkeen?',
      ],
      /*
       * 52,632 N / 4,751 E — nl-Wikipedia "Alkmaar", prop=coordinates
       * (haettu 29.8.2026). Sama kaava kuin kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Alkmaar',
        laudat: {
          maailmankartta: { x: 5991.7, y: 1273.8 },
          europe: { x: 302.4, y: 509.4 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/luonto, nosto "Meri
       *     suljettiin, ja se lakkasi olemasta meri" (jo hyväksyttyä
       *     pelidataa): Zuiderzee oli matala merenlahti, joka tulvi
       *     rantakyliin; insinööri Cornelis Lely piirsi suunnitelman
       *     sen sulkemisesta jo 1891; työ alkoi tammikuussa 1927; patoa
       *     rakennettiin neljästä suunnasta yhtä aikaa, ja perustaksi
       *     upotettiin pajunoksista punottuja mattoja, joiden päälle
       *     ladottiin kiveä.
       *   - nl-Wikipedia "Afsluitdijk" (johdanto ja osio "Aanleg
       *     Amsteldiepdijk en Afsluitdijk", tarkistettu 29.8.2026):
       *     pato on 32,5 kilometriä pitkä, josta vettä pidättävää osaa
       *     30 kilometriä; työ alkoi tammikuussa 1927 ja sitä tehtiin
       *     neljästä paikasta — molemmilta rannoilta ja kahdelta
       *     varta vasten rakennetulta työsaarelta (Breezand ja
       *     Kornwerderzand); ensimmäistä kertaa käytettiin
       *     rakennusaineena moreenisavea, joka osoittautui sitkeämmäksi
       *     kuin hiekka tai savi ja jota saatiin ruopattua padon
       *     läheltä; viimeinen sulkuaukko, Vlieter, suljettiin vuonna
       *     1932 ja sen kohdalle pystytettiin muistomerkki; vuotta
       *     myöhemmin pato avattiin autoliikenteelle; molemmissa päissä
       *     on sulut (Stevinsluizen Pohjois-Hollannin puolella,
       *     Lorentzsluizen Kornwerderzandissa); vuoden 1937 myrsky
       *     osoitti harjan liian matalaksi, ja se nostettiin 7,4
       *     metriin.
       */
      id: 'afsluitdijk',
      nimio: 'Afsluitdijk',
      otsikko: 'Meri suljettiin kuin ovi, ja siitä tuli järvi',
      lunastus: [
        'Zuiderzee oli matala merenlahti, joka nousi tulvina '
          + 'rantakyliin niin kauan kuin kukaan muisti. Insinööri '
          + 'Cornelis Lely piirsi sen sulkemisesta suunnitelman jo '
          + 'vuonna 1891, ja työ alkoi tammikuussa 1927. Patoa '
          + 'rakennettiin neljästä suunnasta yhtä aikaa: molemmilta '
          + 'rannoilta ja kahdelta varta vasten kasatulta työsaarelta. '
          + 'Pohjaksi upotettiin pajunoksista punottuja mattoja, joiden '
          + 'päälle ladottiin kiveä, ja rakennusaineena kokeiltiin '
          + 'ensimmäistä kertaa moreenisavea — se osoittautui '
          + 'sitkeämmäksi kuin hiekka tai savi, ja sitä sattui olemaan '
          + 'juuri siinä missä patoa tarvittiin.',
        'Viimeinen aukko, jota sanottiin Vlieteriksi, suljettiin vuonna '
          + '1932. Sen kohdalle pystytettiin muistomerkki, ja seuraavana '
          + 'vuonna padon yli avattiin maantie. Valmis pato on 32,5 '
          + 'kilometriä pitkä, ja siitä vettä pidättää kolmekymmentä; '
          + 'molemmissa päissä on sulut, joista laivat pääsevät läpi ja '
          + 'joista ylimääräinen vesi lasketaan ulos. Suolainen '
          + 'merenlahti muuttui makeaksi järveksi, ja rannikkokylistä '
          + 'tuli sisämaata. Työ ei ollut sillä valmis: vuoden 1937 '
          + 'myrsky osoitti harjan liian matalaksi, ja se nostettiin '
          + 'yli seitsemään metriin. Meren kanssa ei tehdä sopimusta '
          + 'kerran.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/luonto, pelin omaa '
        + 'tarkistettua aineistoa) sekä nl-Wikipedia "Afsluitdijk", '
        + 'johdanto ja rakentamista käsittelevä osio; tarkistettu '
        + '29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/luonto,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 4591×3310, CC BY-SA 4.0, C messier, kuvattu
       * 26.8.2016. Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * pato, tie ja vettä molemmin puolin, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Afsluitdijk 1031.jpg',
        selite: 'Afsluitdijk erottaa Vattimeren ja makean IJsselmeerin: '
          + 'pato on 32,5 kilometriä pitkä ja sen yli kulkee maantie.',
        lahde: 'C messier, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Zuiderzee haluttiin sulkea?',
        'Miten patoa rakennettiin keskelle merta?',
        'Mitä suljetulle merelle tapahtui sen jälkeen?',
      ],
      /*
       * 53,0 N / 5,16666667 E — nl-Wikipedia "Afsluitdijk",
       * prop=coordinates (haettu 29.8.2026); piste on padon puolivälissä.
       */
      paikka: {
        nimi: 'Afsluitdijk',
        laudat: {
          maailmankartta: { x: 6005.6, y: 1257.3 },
          europe: { x: 310.4, y: 499.7 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/keksinnöt, nosto
       *     "Kangaskauppias näki eläimiä, joita kukaan ei uskonut" (jo
       *     hyväksyttyä pelidataa): Antoni van Leeuwenhoek myi
       *     Delftissä kangasta ja tarkasti langan tiheyttä
       *     suurennuslasilla; hän opetteli itse sulattamaan lasista
       *     pieniä pallolinssejä ja puristi yhden linssin kahden
       *     metallilevyn väliin; säilyneistä kappaleista tehokkain
       *     suurentaa 270-kertaisesti; vuodesta 1674 hän kirjoitti
       *     Lontooseen kirjeitä pikkuolennoista, joita ui sadevedessä;
       *     niitä ei uskottu, joten Lontoosta lähetettiin miehiä
       *     katsomaan; samanlaisia löytyi myös hänen omista
       *     hampaistaan; linssien hiontatavan hän vei mukanaan hautaan.
       *   - en-Wikipedia "Antonie van Leeuwenhoek" (johdanto sekä osiot
       *     varhaisvuosista ja mikroskoopeista, tarkistettu 29.8.2026):
       *     syntyi Delftissä 24.10.1632 ja kuoli 26.8.1723; toimi
       *     nuorena kankaankauppiaana ja perusti oman kauppansa 1654;
       *     kutsutaan mikrobiologian isäksi; ei kirjoittanut yhtään
       *     kirjaa vaan kuvasi löytönsä sekavissa kirjeissä Royal
       *     Societylle, joka julkaisi niistä monet; hän piti
       *     linssinvalmistuksen yksityiskohdat itsellään koko
       *     elämänsä; vuonna 1953 julkaistiin menetelmä toimivan
       *     jäljennöksen tekemiseksi, ja toukokuussa 2021 hollantilaiset
       *     tutkijat kuvasivat alkuperäisiä mikroskooppeja
       *     neutronitomografialla ja näkivät pallolinssin, jossa oli
       *     lyhyt varsi — jäänne siitä lasilangasta, josta linssi oli
       *     sulatettu.
       */
      id: 'leeuwenhoek',
      nimio: 'Delftin linssit',
      otsikko: 'Salaisuus, jonka hän vei hautaan, luettiin neutroneilla '
        + 'kolmesataa vuotta myöhemmin',
      lunastus: [
        'Antoni van Leeuwenhoek myi Delftissä kangasta ja tarkasti '
          + 'langan tiheyttä suurennuslasilla — siitä kaikki alkoi. Hän '
          + 'ei ollut oppinut mies eikä kuulunut yliopistoon, mutta hän '
          + 'opetteli sulattamaan lasista pikkuruisia pallolinssejä ja '
          + 'puristamaan yhden niistä kahden metallilevyn väliin. Laite '
          + 'ei ollut putki vaan kämmenelle mahtuva levy, jota '
          + 'katsottiin silmä kiinni linssissä. Säilyneistä kappaleista '
          + 'tehokkain suurentaa 270-kertaisesti. Vuodesta 1674 hän '
          + 'kirjoitti Lontooseen kirjeitä olennoista, joita ui '
          + 'sadevedessä ja joita kukaan muu ei ollut nähnyt. Niitä ei '
          + 'uskottu, joten Lontoosta lähetettiin miehiä katsomaan '
          + 'omin silmin. Samanlaisia löytyi myös hänen omista '
          + 'hampaistaan.',
        'Kirjaa hän ei kirjoittanut yhtäkään; kaikki on sekavissa '
          + 'kirjeissä, joita Royal Society julkaisi vuosikymmenten '
          + 'ajan. Yhden asian hän jätti kertomatta: miten linssit '
          + 'tehtiin. Sen hän sanoi pitävänsä itsellään, ja niin hän '
          + 'teki. Vasta vuonna 1953 julkaistiin tapa rakentaa toimiva '
          + 'jäljennös, ja toukokuussa 2021 hollantilaiset tutkijat '
          + 'kuvasivat hänen alkuperäisiä mikroskooppejaan '
          + 'neutroneilla — säteillä, jotka läpäisevät metallin. '
          + 'Kuvassa näkyi pallolinssi, jonka kyljessä oli lyhyt varsi: '
          + 'jäänne siitä lasilangasta, jonka päästä linssi oli '
          + 'sulatettu. Kolmesataa vuotta vaiettu työtapa luettiin '
          + 'lopulta suoraan esineestä.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/keksinnöt, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Antonie van '
        + 'Leeuwenhoek", johdanto ja mikroskooppeja käsittelevä osio; '
        + 'tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/keksinnöt,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 2874×4728, CC BY-SA 4.0, Hnapel, kuvattu
       * 18.7.2015. Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * museovitriinissä oleva pieni mikroskooppi, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Leiden Museum Boerhaave single lens microscope 071815 06.jpg',
        selite: 'Leeuwenhoekin mikroskooppi on kämmenelle mahtuva levy, '
          + 'jonka sisään on puristettu yksi itse sulatettu pallolinssi.',
        lahde: 'Hnapel, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten yhden linssin mikroskooppia käytettiin?',
        'Miksi Lontoossa ei uskottu Leeuwenhoekia?',
        'Mitä neutronikuvaus paljasti vuonna 2021?',
      ],
      /*
       * 52,01111111 N / 4,3575 E — nl-Wikipedia "Delft",
       * prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Delft',
        laudat: {
          maailmankartta: { x: 5978.6, y: 1301.6 },
          europe: { x: 294.9, y: 525.7 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/historia, nosto "Vanki
       *     kannettiin ulos kirja-arkussa" (jo hyväksyttyä pelidataa):
       *     oikeusoppinut Hugo de Groot istui elinkautista Loevesteinin
       *     linnassa; hän sai vankilassa lukea, ja kirjat tuotiin
       *     isossa arkussa, joka soudettiin joen yli; aluksi arkku
       *     tarkastettiin, mutta ajan mittaan vartijat kyllästyivät
       *     siihen; De Groot harjoitteli makaamaan liikkumatta kaksi
       *     tuntia — juuri niin kauan kuin venematka kesti;
       *     22.3.1621 palvelustyttö Elsje van Houweningen saatteli
       *     arkun ulos linnasta markkinapäivänä, eikä kukaan avannut
       *     sitä; toisella rannalla De Groot pukeutui muurariksi ja
       *     käveli tiehensä. Arkku on Rijksmuseumin kokoelmassa.
       *   - en-Wikipedia "Hugo Grotius" (johdanto, tarkistettu
       *     29.8.2026): syntyi Delftissä 10.4.1583 ja kuoli 28.8.1645;
       *     oli teini-ikäinen ihmelapsi ja opiskeli Leidenin
       *     yliopistossa; vangittiin Loevesteinin linnaan osallisuudesta
       *     tasavallan uskontopolitiikan kiistoihin; pakeni piiloutuneena
       *     kirja-arkkuun, jota hänelle tuotiin säännöllisesti, ja arkku
       *     kuljetettiin Gorinchemiin; kirjoitti pääteoksensa
       *     maanpaossa Ranskassa; kahdesta vaikutusvaltaisimmasta
       *     kirjasta toinen on Mare Liberum, vapaa meri, ja niiden takia
       *     häntä sanotaan kansainvälisen oikeuden isäksi.
       */
      id: 'kirja-arkku',
      nimio: 'Loevesteinin arkku',
      otsikko: 'Vanki harjoitteli makaamaan liikkumatta kaksi tuntia — '
        + 'juuri niin kauan kuin venematka kesti',
      lunastus: [
        'Oikeusoppinut Hugo de Groot tuomittiin elinkautiseen '
          + 'Loevesteinin linnaan tasavallan uskontokiistojen takia. '
          + 'Yksi oikeus hänelle jäi: hän sai lukea. Kirjat tuotiin '
          + 'isossa arkussa, joka soudettiin joen yli ja kannettiin '
          + 'portista sisään, ja aluksi vartijat avasivat arkun joka '
          + 'kerta. Vuosien mittaan he kyllästyivät. Sen huomasi myös '
          + 'vanki, ja hän alkoi harjoitella: maata liikkumatta kaksi '
          + 'tuntia, juuri niin kauan kuin venematka kesti.',
        'Maaliskuun 22. päivänä 1621, markkinapäivänä, palvelustyttö '
          + 'Elsje van Houweningen saatteli arkun ulos linnasta. Kukaan '
          + 'ei avannut sitä. Toisella rannalla De Groot nousi arkusta, '
          + 'pukeutui muurariksi ja käveli tiehensä. Hän pakeni '
          + 'Ranskaan ja kirjoitti siellä pääteoksensa; toinen niistä, '
          + 'Mare Liberum, esitti ettei meri voi kuulua kenellekään, ja '
          + 'niiden takia häntä sanotaan yhä kansainvälisen oikeuden '
          + 'isäksi. Arkku on Rijksmuseumin kokoelmassa, ja se on '
          + 'yllättävän tavallisen näköinen — juuri niin kuin parhaan '
          + 'piilon kuuluukin.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/historia, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Hugo Grotius", '
        + 'johdanto; tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/historia,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 8176×6132, CC0, Rijksmuseum, esineen ajoitus
       * "ca. 1600 – ca. 1615". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: kuvassa on puinen arkku valkoista taustaa vasten, ei
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Boekenkist van Hugo de Groot, NG-KOG-1208.jpg',
        selite: 'Kirja-arkku Rijksmuseumin kokoelmassa: tällaisessa '
          + 'arkussa Hugo de Groot kannettiin ulos Loevesteinin '
          + 'linnasta vuonna 1621.',
        lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
      },
      kysymykset: [
        'Miksi Hugo de Groot oli vankina?',
        'Miten arkku pääsi ulos linnasta tarkastamatta?',
        'Mitä hän kirjoitti paettuaan?',
      ],
      /*
       * 51,81638889 N / 5,02138889 E — nl-Wikipedia "Slot Loevestein",
       * prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Loevesteinin linna',
        laudat: {
          maailmankartta: { x: 6000.7, y: 1310.3 },
          europe: { x: 307.6, y: 530.8 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: VOC-kauppalaivan hopealasti. Merkintä aukeaa, kun aarre
   * löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Satamakonttorin seinällä on lista laivoista, jotka eivät '
      + 'koskaan palanneet. Yhden kohdalle joku on piirtänyt ristin ja '
      + 'sanan "hopea". Konttoristi sanoi, että meri on Kompanian '
      + 'suurin holvi — ja sen ovi on auki sille, joka löytää oikean '
      + 'hylyn.',
  },
};
