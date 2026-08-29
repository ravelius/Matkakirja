/*
 * BERGENIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-helsinki.js:lle ja
 * -tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Aalto 4A, Norja.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026): matkakirjan paikkarivi ja
 * teksti, Livian kuplateksti (`pollo.teksti`) ja aarremerkinnän teksti
 * ovat SANATARKASTI hänen kirjoittamansa — niitä ei ole lyhennetty,
 * yhdistetty eikä sanajärjestystä muutettu. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: viikinkien hopeakätkö (aarremerkintä). Sama pari on
 * kirjattu maan paikallisaarteisiin (js/packs/paikallisaarteet.js, NOR),
 * jotta löytökortissa lukee sama nimi kuin merkinnässä.
 *
 * FAKTAPOHJA. Bergenillä on valmis työaineisto — docs/mantereet-
 * tyoaineisto/faktapohja-bergen.md ja sen riippumaton tarkistus
 * tarkistus-bergen.md — ja se on ollut tämän paketin ensisijainen
 * lähde. Sen lisäksi käytössä on kaksi lähdettä ja vain ne:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Norjan maalehden nostot
 *      (js/packs/maa-kategoriat.js, NOR/luonto ja NOR/historia) ja
 *      Bergenin kaupunkilehden omat nostot (js/packs/
 *      kulttuuri-kategoriat.js, bergen). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden KUVAT, jotka
 *      tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa tai
 *      faktapohjassa ei ole, on haettu Wikipedian rajapinnasta
 *      29.8.2026 ja katsottu KAHDESTA riippumattomasta lähteestä. Ne on
 *      nimetty kunkin kohdan omassa kommentissa. Mitään ei ole
 *      päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS ON TIETOINEN JA RAJATTU. Kaikki kolme täkyä ja
 * molemmat täkynostot ovat NORJAN MAALEHDEN puolelta (sauvakirkko,
 * myskihärkä, Geirangervuono, Amundsen, Ekofisk). Bergenin oman
 * kaupunkilehden kolmeen sivuun — niihin, jotka pelaaja lukee samassa
 * kulussa — ei ole päällekkäisyyttä yhdessäkään täyssä: Bryggen,
 * Håkonshallen, riimusauvat, tulipalot, hansakontori, tuomiokirkko,
 * Ole Bull ja Grieg jäävät kokonaan lehden puolelle. Lehden nimetyt
 * tehtävät ovat sen sijaan tarkoituksella lehden omaa sisältöä (ks.
 * LEHDEN NIMETTYJEN TEHTÄVIEN VISAT).
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellista.
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOJA EI OLE ────────────────────────────────────────────
 *
 * `kohteet`-kenttä lukee koko maan yhteisestä listasta (esim.
 * js/packs/fokuskohteet-grc.js), eikä Norjalle ole sellaista tiedostoa.
 * Kenttä jätetään siis pois kokonaan, kuten aallon 3 pohjoismaissa
 * (Helsinki, Tukholma, København, Tallinna). Maan omat kartalle
 * osoittavat nostot tulevat `takynostot`-kentästä alempana.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Aallon 3 kaava: luenta on kirjoitettu valmiiksi, mutta sitä EI ole
 * vielä generoitu, joten `matkakirja.aanite` puuttuu. Teksti ja luenta
 * ovat sanasta sanaan samat, joten luennan voi ajaa suoraan
 * (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan. Kun
 * äänite on generoitu, riville tulee
 * `aanite: 'assets/audio/puhe-fokus-matkakirja-bergen.mp3'`.
 *
 * ── KUVIEN TARKISTUS ───────────────────────────────────────────────
 *
 * LISENSSI, TEKIJÄ, KOKO JA RAJOITUKSET on luettu Commonsin
 * rajapinnan `extmetadata`-kentistä 29.8.2026 KAIKISTA seitsemästä
 * kuvasta. Yhtään nimeä ei ole arvattu, ja jokaisen Restrictions-kenttä
 * oli tyhjä.
 *
 * SILMÄTARKISTUS 960 px:n esikatselusta on tehty KAIKISTA seitsemästä,
 * ja havainto on kirjattu kunkin kuvan omaan kommenttiin. Yhdessäkään
 * ei ole tunnistettavia nykyihmisiä; ainoat ihmishahmot ovat
 * Amundsenin vuoden 1911 valokuvassa, jossa neljä turkkeihin
 * pukeutunutta retkeläistä seisoo kaukana teltan vieressä.
 *
 * HUOMIO TYÖKALUSTA (QA:lle ja seuraaville kirjoittajille):
 * upload.wikimedia.org palauttaa 400:n, jos esikatselun leveydeksi
 * pyytää muuta kuin vakiokokoa — 640 px ja 900 px kaatuivat, 960 px
 * toimi. Virhe näyttää helposti nopeusrajoitukselta, vaikka kyse on
 * väärästä leveydestä; rajapinnan `iiurlwidth`-vastauksen antamaa
 * thumburlia kannattaa käyttää sellaisenaan.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Sääntökysymys on Bergenin lehden sivun 2
 * ("Historia") oman noston "Kauppahuone, jolla oli oma laki" tekstiä ja
 * Chopin-kysymys sivun 3 ("Musiikki") oman noston "Poika, joka soitti
 * ensiviulua yhdeksänvuotiaana" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * KUMPIKAAN EI KYSY SIVUN OMAA TEHTÄVÄÄ. Historia-sivun oma tehtävä
 * kysyy tuomiokirkon seinään jäänyttä tykinkuulaa ja Musiikki-sivun oma
 * sitä, kuka suostutteli Griegin vanhemmat — nimetty tehtävä väistää
 * molemmat, jottei sama sivu kysy samaa asiaa kahdesti, jos sivun oma
 * tehtävä joskus palaa näkyviin.
 *
 * KUMPIKAAN EI MYÖSKÄÄN KYSY LAATTAKYSYMYSTEN VASTAUKSIA
 * (js/packs/europe-questions.js, bergen: Norja, Bryggen, kuivattu
 * turska, pääkaupunkiasema ja "seitsemän vuoren kaupunki"). Jos lehden
 * aarteen avaava tehtävä kysyisi jotakin näistä, aarrekysymys olisi
 * ratkaistu ennen kuin Solveigia on tavattu.
 */
const HANSASAANTO_VISA = {
  kysymys: 'Hansakauppiaiden kontorilla oli Bryggenissä oma säännöstönsä. '
    + 'Mitä sille tehtiin kerran vuodessa?',
  vaihtoehdot: [
    'Se luettiin ääneen koko kauppiasyhteisölle',
    'Se käännettiin norjaksi kaupunginvaltuustoa varten',
    'Se suljettiin takaisin lukittuun arkkuun',
  ],
  oikea: 0,
  fakta: 'Kontor oli oikeushenkilö: sillä oli oma kassa, oma sinetti ja '
    + 'valta panna säännöt täytäntöön asukkaidensa keskuudessa. Säännöstö '
    + 'oli kirjoitettu keskisaksaksi, ja sisäistä johtoa hoitivat '
    + 'aldermannit.',
};

const CHOPIN_VISA = {
  kysymys: 'Ole Bull asui nuorena vuoden 1832 Pariisissa. Kenen kanssa hän '
    + 'jakoi siellä asunnon?',
  vaihtoehdot: [
    'Frédéric Chopinin',
    'Franz Lisztin',
    'Hector Berliozin',
  ],
  oikea: 0,
  fakta: 'Bullin isä olisi halunnut pojasta papin. Yhdeksänvuotiaana Bull '
    + 'soitti jo ensiviulua Bergenin teatterin orkesterissa, ja aikuisena '
    + 'hän antoi pelkästään Englannissa 274 konserttia vuonna 1837.',
};

export const FOKUSVIRTA_BERGEN = {
  kaupunki: 'bergen',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan. */
    paikkarivi: 'Bergen, kesäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Sataa. Kirjoitan tämän kapakan ikkunapöydässä, koska laiturilla '
      + 'ei pysy paperi kuivana. Saksalaisten vanha kauppalaituri seisoo yhä, '
      + 'puutalot kylki kyljessä kuin sillit tynnyrissä — ja silliltä täällä '
      + 'myös tuoksuu, sillä kapakala on tämän kaupungin kulta. Sitä riippuu '
      + 'telineillä tuhansittain, kuivana ja kovana kuin lauta, ja sillä on '
      + 'ostettu nämä talot, kirkot ja puolet Norjan purjeista.',
    /*
     * LUENTA = sama teksti, vain tunnetagit lisätty (Raamattu,
     * luentaprosessi): kolme tagia, alku ja loppu eri sävyssä.
     */
    luenta: '[softly] Sataa. Kirjoitan tämän kapakan ikkunapöydässä, koska '
      + 'laiturilla ei pysy paperi kuivana. [curious] Saksalaisten vanha '
      + 'kauppalaituri seisoo yhä, puutalot kylki kyljessä kuin sillit '
      + 'tynnyrissä — ja silliltä täällä myös tuoksuu, sillä kapakala on '
      + 'tämän kaupungin kulta. [warmly] Sitä riippuu telineillä '
      + 'tuhansittain, kuivana ja kovana kuin lauta, ja sillä on ostettu '
      + 'nämä talot, kirkot ja puolet Norjan purjeista.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden avauskuva) ----- */
  pollo: {
    /*
     * LIVIAN MAADOITUS — NALJAILUOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä on kevyt ja arkinen — sade,
     * kapakan ikkunapöytä, märkä paperi — joten pariperiaate sallii
     * naljailun eikä vaadi pehmennystä. Piikki osoittaa isoisään, kuten
     * kuuluu: hän haistoi sillin siellä, missä telineillä riippui turskaa.
     *
     * FAKTAKURI: yksi väite, kaksi lähdettä. Sana "torsk" tulee
     * muinaisnorjan muodosta turskr, joka on lyhentymä sanasta turrfiskr,
     * "kuiva kala" — no-Wikipedia "Tørrfisk", johdanto (*"ordet «torsk»
     * kommer av det gammelnorske turskr som betyr turrfiskr «tørrfisk»"*),
     * ja sama etymologia en-Wikipedian "Stockfish"-artikkelin
     * Etymology-osiossa, joka johtaa myös sanan stockfish kuivaustelineen
     * puihin. Tarkistettu 29.8.2026. Kapakala tehdään turskasta —
     * en-Wikipedia "Stockfish", johdanto; fi-Wikipedia "Kapakala".
     *
     * MIKSI ETYMOLOGIA EIKÄ KAUPPA: oppitunti kertoo kapakalan kaupan ja
     * kuivauksen, eikä maadoitus saa syödä sitä etukäteen. Tähän jää siis
     * vain se, mikä on isoisän oman virheen vastaus.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("No niin", "Mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'No niin, sataa. Siitä yhdestä asiasta täällä ollaan aina '
      + 'oltu samaa mieltä.. Mut se haju ei ollut silliä. Telineillä '
      + 'riippuva kala on turskaa, ja koko kala on nimetty sen mukaan mitä '
      + 'sille tehdään: sana torsk tulee muinaisnorjan sanasta turskr, joka '
      + 'on lyhentynyt sanasta turrfiskr, kuiva kala. Isoisäsi haistoi siis '
      + 'oikean rikkauden ja väärän kalan. Se on hänelle aika hyvä tulos.',
    /* KAANON (Fable) — kuplateksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Bergenissä sataa noin puolet vuoden päivistä, joten isoisäsi '
      + 'osui tavalliseen päivään.. Se kauppalaituri on yhä pystyssä, '
      + 'vinossa mutta pystyssä, ja se on nykyään maailmanperintöä. '
      + 'Kapakalasta täällä ei enää eletä, mutta sen haju on jäänyt '
      + 'lankkuihin. Aloitetaan siitä.',
    /*
     * KUVA ON KAUPUNKILEHDEN AVAUSKARUSELLISTA (omistajan korjaus 2),
     * mutta EI generoitu hero vaan karusellin oma Commons-valokuva
     * (js/packs/kulttuuri-kategoriat.js, bergen/avauskuvat).
     *
     * PERUSTELU FABLELLE: Livian kuplateksti on kaanonia eikä sitä saa
     * muuttaa, ja se osoittaa nimenomaan kauppalaituriin — *"Se
     * kauppalaituri on yhä pystyssä … Aloitetaan siitä."* Bergenin kolme
     * generoitua heroa esittävät Johanneksen kirkkoa, Fløibanenia ja
     * Grieghallenia; yksikään ei näytä Bryggeniä, joten hero riitelisi
     * tekstin kanssa. Sama karuselli tarjoaa Bryggenin kuvan, ja kuva ja
     * teksti puhuvat silloin samasta asiasta.
     *
     * Commons 29.8.2026: 3756×2353, CC BY-SA 3.0, Anna Anichkova, kuvaus
     * "The harbour of the city of Bergen, Norway". Restrictions tyhjä.
     * SILMÄTARKISTUS tehty 900 px:n esikatselusta: Bryggenin päätyrivistö
     * vedeltä katsottuna, taustalla vuoret; ei tunnistettavia kasvoja.
     */
    kuva: {
      tiedosto: 'Bergen Bryggen 1017.jpg',
      selite: 'Bryggen on Vågenin itärannan vanha laituri, jonka ympärillä '
        + 'hansakauppa Bergenissä käytiin.',
      lahde: 'Anna Anichkova, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä kirjoittaa sateesta ja puutaloista, jotka
       * seisovat kylki kyljessä. Tämä on saman maan vastaus siihen
       * kysymykseen, jonka hän jätti kysymättä — miten puu kestää sateen
       * kahdeksansataa vuotta.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, NOR/historia, nosto "Kirkko,
       * joka seisoo tolppien varassa" (jo hyväksyttyä pelidataa) —
       * pystytolpat, seinälaudat maata koskematta, Borgund, säilynyt lähes
       * muuttumattomana, keskiajalla yli tuhat kirkkoa ja nyt 28,
       * lohikäärmeenpäät katonharjalla kuin viikinkilaivan keulassa,
       * tervaus ja siitä tuleva musta väri.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Borgund Stave Church" (infobox ja johdanto):
       *     rakennettu noin vuonna 1200 Borgundin kyläkirkoksi Lærdalin
       *     kunnassa Vestlandissa; toimi seurakuntakirkkona vuoteen 1868,
       *     jolloin tehtävät siirtyivät viereen rakennettuun uuteen
       *     kirkkoon; vanha kirkko kunnostettiin ja siitä tehtiin museo,
       *     jota ylläpitää muinaismuistoyhdistys; kirkkomaalla seisoo
       *     Norjan ainoa säilynyt sauvarakenteinen vapaasti seisova
       *     kellotapuli.
       *   - en-Wikipedia "Stave church", osio Construction: varhaisimmissa
       *     puukirkoissa tolpat upotettiin maahan ja lahosivat kosteudesta;
       *     seuraavassa vaiheessa tolpat nostettiin isojen kivien päälle,
       *     mikä pidensi niiden ikää selvästi, ja lopullisessa muodossaan
       *     tolpat seisovat kivijalan päälle ladotun alusparrukehikon
       *     varassa; sana sauva tulee muinaisnorjan sanasta stafr.
       *
       * RISTIRIITA, JOKA SANOTAAN ÄÄNEEN: pelin oma nosto ajoittaa
       * Borgundin vuoteen 1180 leipätekstissä ja "noin vuoteen 1200"
       * kuvatekstissään. en-Wikipedian artikkeli sanoo molemmissa
       * paikoissa (infobox ja johdanto) noin 1200. Tämä täky käyttää
       * vuotta 1200 ja jättää tarkan vuosiluvun väljäksi.
       */
      id: 'sauvakirkko',
      nappi: 'Kirkko, joka ei koske maahan',
      otsikko: 'Borgundin sauvakirkko',
      teksti: 'Sauvakirkko on rakennettu pystytolppien varaan — sauva on '
        + 'muinaisnorjan stafr — ja koko rakennus on pohjimmiltaan vastaus '
        + 'samaan ongelmaan, jota isoisäsi juuri katseli ikkunasta: mitä '
        + 'sade tekee puulle. Varhaisimmissa puukirkoissa tolpat upotettiin '
        + 'maahan, ja ne lahosivat. Sitten tolpat nostettiin isojen kivien '
        + 'päälle, ja lopulta koko kirkko alettiin ladata kivijalan päälle '
        + 'asetetun alusparrukehikon varaan. Siinä muodossa seinälaudat '
        + 'seisovat pystyssä koskematta maahan, eikä puu enää ime kosteutta '
        + 'alta. Borgundin kirkko Lærdalissa rakennettiin noin vuonna 1200 '
        + 'kylän seurakuntakirkoksi ja se palveli sellaisena vuoteen 1868, '
        + 'jolloin tehtävät siirtyivät viereen nousseeseen uuteen kirkkoon. '
        + 'Vanha jäi seisomaan, kunnostettiin ja muutettiin museoksi. '
        + 'Katonharjoilla kaartuu lohikäärmeenpäitä samaan tapaan kuin '
        + 'viikinkilaivojen keulassa, ja puu on suojattu tervaamalla — '
        + 'siitä tulee sen musta väri. Keskiajalla tällaisia kirkkoja oli '
        + 'Norjassa yli tuhat. Nyt niitä on 28.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NOR/historia,
       * js/packs/maa-kategoriat.js) — siis jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: 2260×3500, CC BY-SA 3.0, Ximonic
       * (Simo Räsänen), kuvaus "Borgund Stave Church in Lærdalen …".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: musta tervattu
       * puukirkko kirkkomaan keskellä, katonharjalla erottuu
       * lohikäärmeenpää ja takana vihreä vuorenrinne; ei ihmisiä. Kuva
       * näyttää siis täsmälleen ne kaksi asiaa, jotka teksti nimeää.
       */
      kuva: {
        tiedosto: 'Borgund Stave Church in Lærdalen, 2013 June.jpg',
        selite: 'Borgundin sauvakirkko rakennettiin noin vuonna 1200 kylän '
          + 'seurakuntakirkoksi, ja se toimi sellaisena vuoteen 1868.',
        lahde: 'Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miksi sauvakirkon puu on kestänyt lähes kahdeksansataa '
          + 'vuotta?',
        vaihtoehdot: [
          'Tolpat ja seinälaudat eivät kosketa maata',
          'Kirkko puretaan ja kootaan uudelleen sadan vuoden välein',
          'Puu keitettiin ennen pystytystä suolavedessä',
        ],
        oikea: 0,
        fakta: 'Vanhimmissa puukirkoissa tolpat upotettiin maahan ja ne '
          + 'lahosivat. Ratkaisu löytyi kahdessa vaiheessa: ensin tolpat '
          + 'nostettiin kivien päälle, sitten koko kirkko kivijalan päälle '
          + 'ladotun alusparrukehikon varaan.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: isoisän Bergen elää siitä, mitä laivat tuovat ja
       * vievät. Tämä on saman maan eläin, joka itse tuotiin laivalla — ja
       * tuotiin takaisin sinne, mistä se oli aikanaan hävinnyt.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, NOR/luonto, nosto "Myskihärkä
       * tuotiin laivalla" (jo hyväksyttyä pelidataa) — eli Norjassa
       * jääkaudella ja katosi tuhansia vuosia sitten; eläimiä tuotiin
       * 1900-luvulla laivalla Grönlannista ja nykyinen kanta polveutuu
       * vuoden 1947 kuljetuksesta; Dovrefjellillä reilut parisataa
       * eläintä; ei härkiä vaan lampaiden ja vuohien sukulaisia;
       * alusvilla maailman lämpimimpiä; retkeilijöitä kehotetaan pysymään
       * kahdensadan metrin päässä, koska eläin on rauhallinen mutta nopea
       * suuttumaan; inuktitutinkielinen nimi tarkoittaa parrakasta.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Muskox", johdanto ja osio Taxonomy: laji kuuluu
       *     Caprini-heimoryhmään ja on siis lähempänä lampaita ja vuohia
       *     kuin nautoja; oma sukunsa Ovibos tarkoittaa latinaksi
       *     lammas-härkää; inuktitutin umingmak tarkoittaa "parrakasta";
       *     nuorimmat luonnolliset eurooppalais-aasialaiset löydöt ovat
       *     noin 2 700 vuoden takaa; Norjaan istutetusta kannasta osa on
       *     siirtynyt Ruotsin puolelle, jossa elää nykyään pieni kanta.
       *   - Pelin oma, jo hyväksytty kuvateksti (js/packs/maa-kategoriat.js,
       *     NOR/luonto), joka kertoo samasta suhteesta lampaisiin ja
       *     vuohiin sekä nimen merkityksestä.
       */
      id: 'myskiharka',
      nappi: 'Eläin, joka tuotiin takaisin laivalla',
      otsikko: 'Dovrefjellin myskihärät',
      teksti: 'Myskihärkä eli Norjassa jääkauden aikaan ja katosi sitten: '
        + 'nuorimmat luonnolliset löydöt koko Euroopan ja Aasian alueelta '
        + 'ovat noin 2 700 vuoden takaa. 1900-luvulla eläimiä tuotiin '
        + 'laivalla takaisin Grönlannista, ja koko nykyinen norjalaiskanta '
        + 'polveutuu vuoden 1947 kuljetuksesta. Dovrefjellin tuntureilla '
        + 'laumassa on nykyään reilut parisataa eläintä, ja osa niistä on '
        + 'sittemmin kävellyt rajan yli Ruotsiin, jossa elää nyt oma pieni '
        + 'kantansa. Nimi johtaa harhaan kahdesti. Eläin ei ole härkä vaan '
        + 'lampaiden ja vuohien lähisukulainen — sen suvun latinankielinen '
        + 'nimi Ovibos tarkoittaa kirjaimellisesti lammas-härkää — ja se '
        + 'tuoksuu vain uroksena kiima-aikaan. Inuktitutiksi sen nimi on '
        + 'umingmak, parrakas. Alusvilla on maailman lämpimimpiä, mutta '
        + 'sitä ei kannata mennä koettelemaan: retkeilijöitä kehotetaan '
        + 'pysymään kahdensadan metrin päässä, koska eläin on rauhallinen '
        + 'mutta nopea suuttumaan.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NOR/luonto).
       * Commons 29.8.2026: 4322×2882, CC BY-SA 4.0, Charles J. Sharp,
       * kuvaus "Muskox (Ovibos moschatus) male, Dovrefjell National Park,
       * Norway". Restrictions tyhjä. SILMÄTARKISTUS tehty: yksittäinen
       * uros makaa tunturikankaalla, turkki karvanvaihdossa ja sarvet
       * selvästi näkyvissä; ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Muskox (Ovibos moschatus) male Dovrefjell 1.jpg',
        selite: 'Myskihärkä on arktinen sorkkaeläin, joka tunnetaan '
          + 'paksusta turkistaan; inuktitutiksi sen nimi tarkoittaa '
          + 'parrakasta.',
        lahde: 'Charles J. Sharp, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Minkä eläinten lähisukulainen myskihärkä on?',
        vaihtoehdot: [
          'Lampaiden ja vuohien',
          'Nautojen ja biisonien',
          'Hirvien ja poroja lähellä olevien peurojen',
        ],
        oikea: 0,
        fakta: 'Suvun latinankielinen nimi Ovibos tarkoittaa lammas-härkää. '
          + 'Nykyinen norjalaiskanta polveutuu vuoden 1947 kuljetuksesta '
          + 'Grönlannista, ja osa laumasta on kävellyt sittemmin Ruotsin '
          + 'puolelle.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä saapui Bergeniin mereltä, koska Norjaan
       * on helpompi purjehtia kuin ajaa. Tämä on se maastonmuoto, joka
       * tekee siitä totta — ja samalla se sana, jota merkintä ei vielä
       * käytä mutta jonka pelaaja kuulee myöhemmin uudestaan.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, NOR/luonto, nosto "Meri nousi
       * laakson pohjalle" (jo hyväksyttyä pelidataa) — jäätikkö hioi
       * laaksosta U-kirjaimen muotoisen uoman kalliota myöten, meri
       * työntyi sisään jään sulaessa, seinät nousevat pystysuorina
       * vedestä, Geirangervuono maailmanperintöluetteloon 2005, rinteillä
       * vanhoja vuoritiloja joihin päästiin vain veneellä ja
       * köysitikkaita pitkin, lapset köydessä kiinni.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Geirangerfjord" (infobox ja osio The fjord):
       *     15 kilometriä pitkä ja noin 1,5 kilometriä leveä haara
       *     Sunnylvsfjordenista, joka itse on Storfjordenin haara;
       *     maailmanperintökohde vuodesta 2005 yhdessä Nærøyvuonon kanssa
       *     nimellä "Länsi-Norjan vuonot"; rinteillä hylättyjä tiloja,
       *     joista tunnetuimmat Skageflå, Knivsflå ja Blomberg, ja joita
       *     Storfjordens venner -yhdistys on kunnostanut; Skageflåhon
       *     pääsee jalan Geirangerista, muihin vain veneellä; vastarannoilla
       *     ovat vesiputoukset De syv søstrene (Seitsemän sisarta) ja
       *     Friaren (Kosija), jonka sanotaan kosiskelevan sisaria.
       *   - Sama artikkeli lainaa Magdalene Thoresenia, Henrik Ibsenin
       *     anoppia, joka kuvasi vuonoa: rinteillä on muutama vuoritila,
       *     joille pääsee vain jyrkänteitä kiertäviä polkuja ja siltoja
       *     pitkin, jotka on kiinnitetty vuoreen rautapulteilla ja
       *     -renkailla.
       *
       * MITÄ EI KERROTA: Åkernesetin vuorisortumariski ja siitä uhkaava
       * hyökyaalto. Se on nykyhetken katastrofivaroitus, ei tämän kaaren
       * asia (Raamattu, sisältölinjaus).
       */
      id: 'vuono',
      nappi: 'Laakso, johon meri muutti sisään',
      otsikko: 'Geirangervuono',
      teksti: 'Vuono syntyi jääkaudella: paksu jäätikkö hioi laaksosta '
        + 'U-kirjaimen muotoisen uoman kalliota myöten, ja kun jää suli, '
        + 'meri työntyi tyhjään laaksoon sisämaahan asti. Siksi seinät '
        + 'nousevat pystysuorina suoraan vedestä. Geirangervuono on '
        + 'viidentoista kilometrin pituinen ja noin puolentoista kilometrin '
        + 'levyinen haara Sunnylvsfjordenista, joka on itse Storfjordenin '
        + 'haara, ja se otettiin maailmanperintöluetteloon vuonna 2005 '
        + 'yhdessä Nærøyvuonon kanssa. Rinteillä on vanhoja vuoritiloja, '
        + 'joihin päästiin ennen vain veneellä ja köysitikkaita pitkin — '
        + 'lasten kerrotaan olleen köydessä kiinni, jotta he eivät '
        + 'putoaisi. Henrik Ibsenin anoppi Magdalene Thoresen kuvasi '
        + 'polkuja, jotka kiertävät jyrkänteitä, ja siltoja, jotka on '
        + 'kiinnitetty vuoreen rautapulteilla ja -renkailla. Tilat ovat nyt '
        + 'tyhjillään; tunnetuimmat niistä ovat Skageflå, Knivsflå ja '
        + 'Blomberg, ja niitä on kunnostettu talkoilla. Vastarannoilla '
        + 'putoaa kaksi koskea vastakkain: Seitsemän sisarta ja sitä vastapäätä '
        + 'Kosija, jonka sanotaan kosiskelevan sisaria siinä onnistumatta.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NOR/luonto).
       * Commons 29.8.2026: 6520×3660, CC BY-SA 3.0, Ximonic (Simo
       * Räsänen), kuvaus "A view to Geirangerfjord from Ørnesvingen …".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: laaja näkymä vuonon
       * mutkaan, seinät nousevat suoraan vedestä ja pohjukassa näkyy
       * pieni alus kaukana; ei tunnistettavia ihmisiä.
       */
      kuva: {
        tiedosto: 'Geirangerfjord from Ørnesvingen, 2013 June.jpg',
        selite: 'Geirangervuono on 15 kilometrin pituinen '
          + 'Sunnylvsfjordenin haara Møre og Romsdalissa, ja sen '
          + 'pohjukassa on Geirangerin kylä.',
        lahde: 'Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miten Geirangervuonon rinnetiloille päästiin ennen?',
        vaihtoehdot: [
          'Veneellä ja köysitikkaita pitkin',
          'Talvella jäätä myöten',
          'Vuonon yli vedettyä vaijeria pitkin korissa',
        ],
        oikea: 0,
        fakta: 'Tilat ovat nykyään tyhjillään, ja tunnetuimmat niistä ovat '
          + 'Skageflå, Knivsflå ja Blomberg. Vuono otettiin '
          + 'maailmanperintöluetteloon 2005 yhdessä Nærøyvuonon kanssa.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen js/packs/europe-questions.js, bergen[2]:
   * mikä oli Bergenin tärkein vientitavara keskiajalla. Visasääntö
   * täyttyy — vastaus löytyy tekstistä, mutta kysymyksen sanamuoto ei
   * toistu siinä sellaisenaan.
   *
   * OPPITUNTI EI KERTAA KAUPUNKILEHTEÄ. Lehden Historia-sivu kertoo
   * hansakontorin lainkäytön, etuoikeudet ja tulipalot; tämä kertoo
   * KALAN — miten se tehdään, miksi juuri se kelpasi kaukokaupaksi ja
   * mitä sillä ostettiin. Yhtään lehden noston väitettä ei toisteta.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Stockfish" (johdanto sekä osiot Importance ja
   *     Manufacturing and usage): kapakala on suolaamatonta kalaa,
   *     useimmiten turskaa, joka kuivataan kylmässä ilmassa ja tuulessa
   *     puisilla telineillä, joita Norjassa sanotaan hjelleiksi;
   *     kuivaaminen on maailman vanhin tunnettu säilöntätapa ja kuivattu
   *     kala säilyy vuosia; suolaaminen ei ollut taloudellisesti
   *     järkevää ennen 1600-lukua, jolloin Etelä-Euroopan halpa suola
   *     tuli pohjoisen merenkulkumaiden ulottuville; kala kypsyy
   *     käymisprosessissa, jossa kylmään sopeutuneet bakteerit kypsyttävät
   *     sen juuston tapaan; kala ripustetaan telineille helmikuusta
   *     toukokuuhun, ja paras sää on hieman nollan yläpuolella ilman
   *     suurta sademäärää, sillä liika pakkanen rikkoo kalan syyt; kolmen
   *     telinekuukauden jälkeen kala jälkikypsyy vielä kaksi tai kolme
   *     kuukautta kuivassa ja ilmavassa sisätilassa; kapakala mainitaan
   *     kauppatavarana ensi kerran Egilin saagassa, jossa päällikkö
   *     Torolv Kveldulvinpoika lähettää vuonna 875 kapakalaa Helgelandista
   *     Britanniaan; tuote toi Norjalle suurimman osan sen kauppatuloista
   *     viikinkiajalta keskiajan loppuun; kapakala on erityisen suosittua
   *     katolisissa Välimeren maissa, ennen kaikkea Italiassa.
   *   - no-Wikipedia "Tørrfisk" (johdanto sekä osiot Fremgangsmåte og
   *     bruk, Vraking og kvalitetsortering ja Historie): kala ripustetaan
   *     telineille lumen ollessa vielä maassa, ja lumi suojaa hyönteisiltä;
   *     liiasta pakkasesta tulee kelvotonta fosfiskiä; kala roikkuu noin
   *     kolme kuukautta ja jälkikypsyy sitten kaksi tai kolme kuukautta
   *     sisällä; nykyään kalaa on liotettava vähintään viikko viileässä
   *     vedessä päivittäin vaihtaen, ennen kuin sitä voi käyttää ruoaksi;
   *     jo 1000-luvulla kapakala oli Norjan tärkein vientitavara ja
   *     1300-luvulla se oli yksin yli 80 prosenttia maan viennistä;
   *     kysyntä johtui katolisesta paastosta, jonka aikana liha oli
   *     kielletty; kuningas Sverre matkasi pohjoiseen vuonna 1177 ja
   *     kohtasi viisikymmentä kauppalaivaa matkalla etelään kapakalalastissa
   *     Lofooteilta; vuoden 1444 kuninkaallinen määräys julkisesta
   *     kapakalan tarkastuksesta on vanhin tunnettu viranomaissäädös
   *     pakollisesta kalan laaduntarkastuksesta; hansakauppiaat luokittelivat
   *     turskakapakalan 24 laatuluokkaan, joista paras oli
   *     hollender-rundfisk ja huonoin utskudd-rundfisk, joka oli pilaantunut
   *     päästä mutta muuten käyttökelpoinen eikä sitä viety maasta vaan
   *     myytiin paikallisille; vaihdossa tuotiin viljaa, jauhoja, suolaa,
   *     sokeria, kankaita ja rautatavaraa sekä ylellisyystavaraa kuten
   *     silkkiä, lasia ja mausteita; kapakalaa käytettiin paikallisesti
   *     myös maksuvälineenä; Bergen säilyi kapakalakaupan keskuksena lähes
   *     kahdeksansataa vuotta.
   *
   * MITÄ EI KERROTA, JA MIKSI:
   *   - Pohjois-Norjan kauppamonopolin päättymisvuosi. Lähteet ovat
   *     ristiriidassa (en-Wikipedia "Bergen": 1789; no-Wikipedia
   *     "Tørrfisk": 1715), ja pelin oma lehti käyttää lukua 1789. Vuosi
   *     jätetään kokonaan pois tästä tekstistä.
   *   - Vuosi 1217 ja pääkaupunkiasema. Se on toisen laattakysymyksen
   *     (bergen[3]) oma vastaus, eikä sitä anneta tässä ilmaiseksi.
   *   - Kuivauksessa haihtuvan veden osuus. en-Wikipedia sanoo noin 80
   *     prosenttia, no-Wikipedia noin 70; teksti sanoo vain, että vettä
   *     lähtee niin paljon, että kala kovettuu.
   */
  oppitunti: {
    otsikko: 'Kala, joka maksoi laiturin',
    teksti: 'Isoisäsi kirjoitti, että telineillä riippuva kala on kovaa kuin '
      + 'lauta. Juuri se on koko idea. Kapakala on suolaamatonta kalaa, '
      + 'useimmiten turskaa, joka kuivataan pelkässä kylmässä ilmassa ja '
      + 'tuulessa puisilla telineillä — norjaksi hjell. Kala ripustetaan '
      + 'helmikuusta toukokuuhun, lumen ollessa vielä maassa, koska lumi '
      + 'pitää hyönteiset loitolla. Paras sää on hieman nollan yläpuolella '
      + 'eikä sada: liika pakkanen rikkoo kalan syyt, ja silloin siitä ei '
      + 'tule ruokaa vaan roskaa. Telineillä mennään noin kolme kuukautta, '
      + 'sitten kala jälkikypsyy vielä kaksi tai kolme kuukautta sisällä '
      + 'kuivassa ja ilmavassa tilassa, ja bakteerit tekevät sille suunnilleen '
      + 'saman kuin juustolle. Vettä lähtee matkalla niin paljon, että '
      + 'lopputulos kolisee. Se säilyy vuosia, kestää laivamatkan eikä vaadi '
      + 'suolaa — mikä oli tärkeää, koska suola oli keskiajalla kallista, ja '
      + 'suolakalasta tuli järkevää vasta 1600-luvulla, kun Etelä-Euroopan '
      + 'halpa suola tuli pohjoiseen. Siksi juuri tämä kala kelpasi '
      + 'kaukokaupaksi. Kirjallinen jälki alkaa Egilin saagasta: päällikkö '
      + 'Torolv Kveldulvinpoika purjehti vuonna 875 kuivatun kalan lastilla '
      + 'Britanniaan. Kuningas Sverre matkasi pohjoiseen 1177 ja kohtasi '
      + 'viisikymmentä kauppalaivaa, jotka toivat kalaa Lofooteilta etelään. '
      + '1300-luvulla kuivattu turska oli yksin yli kahdeksankymmentä '
      + 'prosenttia koko maan viennistä, ja ostajat olivat katolisessa '
      + 'Euroopassa, jossa paasto kielsi lihan mutta salli kalan. Kauppa oli '
      + 'niin tarkkaa, että vuonna 1444 annettiin kuninkaallinen määräys '
      + 'kalan julkisesta tarkastuksesta — vanhin tunnettu viranomaissäädös '
      + 'pakollisesta kalan laaduntarkastuksesta. Hansakauppiaat lajittelivat '
      + 'turskan 24 laatuluokkaan. Paras oli nimeltään hollender-rundfisk. '
      + 'Huonoin oli utskudd-rundfisk, pilaantunut päästä mutta muuten '
      + 'syötävä; sitä ei viety maasta vaan myytiin paikallisille. Vaihdossa '
      + 'tuli laivoilla viljaa, jauhoja, suolaa, sokeria, kangasta ja rautaa '
      + '— ja silkkiä, lasia ja mausteita niille, joilla oli varaa. Kalalla '
      + 'myös maksettiin: se kelpasi rahan sijasta. Bergen pysyi tämän kaupan '
      + 'keskuksena lähes kahdeksansataa vuotta, ja sillä on maksettu se '
      + 'laituri, jota isoisäsi katseli sateessa.',
    /*
     * UUSI KUVA (ei pelidatassa ennestään). Commons 29.8.2026:
     * 2816×2112, public domain, Sondrekv, kuvaus "A fish-drying rack in
     * Moskenes, Lofoten, Norway", päiväys 17.7.2007. Restrictions tyhjä.
     * SILMÄTARKISTUS tehty 960 px:n esikatselusta: kalatelineet täynnä
     * kuivuvaa turskaa, takana kalastajakylä ja vuono; ei ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: oppitunnin ydin on teline. Isoisä näki
     * kalan Bergenissä valmiina; kuva näyttää sen paikan, jossa se
     * tehdään, ja siksi kuva ja teksti kertovat saman asian eri päistä.
     */
    kuva: {
      tiedosto: 'Tørrfisk.jpg',
      selite: 'Turska kuivuu telineillä, joita Norjassa sanotaan '
        + 'hjelleiksi; kuvan telineet ovat Moskenesissa Lofooteilla.',
      lahde: 'Sondrekv, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos. Bergenillä ei ole riviä
   * js/packs/kohtaamiset.js:ssä eikä tarinakaaren paketeissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT), joten hahmoa ei ole
   * ennestään olemassa — tämä on EHDOTUS, ei kaanon. Nimi, ammatti ja
   * sävy ovat vaihdettavissa; kortti ei kertaa hahmon repliikkiä eikä
   * paljasta laattakysymyksen vastausta.
   *
   * PERUSTELUT EHDOTUKSELLE:
   *   - AMMATTI ON TODELLINEN. Kapakalan vrakaus eli laaduntarkastus on
   *     yhä erikoistunut käsityö, jota opitaan ohjauksessa ja
   *     harjoittelemalla (no-Wikipedia "Tørrfisk", osio Vraking og
   *     kvalitetsortering). Vartija tekee siis työtä, joka sitoo vuoden
   *     1873 tähän päivään ilman että kenenkään tarvitsee ylläpitää
   *     mitään vuosisataista järjestelyä.
   *   - VARALLISUUSSÄÄNTÖ PITÄÄ. Isoisä ei maksa mitään eikä käske
   *     ketään: laiturilla on vain vanha lajittelukirja, jossa on yksi
   *     rivi vierasta käsialaa. Odotuksen syy on suvun oma
   *     ammattiylpeys.
   *   - ÄÄNIPROFIILI: epäuskoinen. Solveig pitää suvun tarinoita satuina
   *     mutta kirja on tallessa — tarinakaaren ohjeen mukainen "sukuni
   *     tarina on minusta satua, mutta vihko on tässä".
   *   - EI KUVAA. Tehtävänannon rajaus (aalto 4A): kohtaamiseen ei tule
   *     kuvaa, ja kuvat kuuluvat kaupunkilehteen.
   *
   * VIHJEOSIO: 'kaupunki'. Bergenin lehden sivupinossa kaupunkisivu
   * kantaa sekä Bryggenin että vuorten ja laiturin aineiston, ja sen
   * matkailijaosuus puhuu vuorista nimeltä. Rivi kertoo mistä päin
   * lehteä ratkaisu löytyy, ei sitä mikä vastaus on.
   */
  kohtaaminen: {
    hahmo: 'Kalanvrakari Solveig',
    nappi: 'Tapaa vrakari',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119). Lause on
     * datassa eikä koodissa, koska suomen genetiivi ei taivu koneellisesti
     * jokaisesta nimestä (js/fokusvirta.js varmistusLause).
     */
    varmistus: 'Haluatko varmasti tavata Solveigin juuri nyt?',
    vihjeOsio: 'kaupunki',
    teksti: 'Solveig lajittelee kuivattua kalaa katseella ennen kuin koskee '
      + 'siihen: väri, paksuus ja se ääni, jonka kova kala antaa kun sitä '
      + 'koputtaa. Hänen sukunsa on tehnyt tätä samalla laiturilla useamman '
      + 'polven kuin kukaan viitsii laskea. Suvun omia tarinoita hän pitää '
      + 'satuina — mutta vanhassa lajittelukirjassa on yksi rivi vierasta '
      + 'käsialaa, ja ennen kuin hän näyttää sen, hän haluaa tietää, '
      + 'ymmärtääkö vieras, millä tämä laituri on maksettu.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: BRYGGEN. Isoisän merkintä on kirjoitettu laiturin
   * äärellä, Livian kuplateksti osoittaa samaan laituriin ja Solveig
   * työskentelee siellä — kolme tekstiä, yksi paikka.
   *
   * 60,39722222 N / 5,32305556 E — en-Wikipedia "Bryggen",
   * prop=coordinates (haettu 29.8.2026; sama koordinaatti kuin
   * docs/mantereet-tyoaineisto/faktapohja-bergen.md osiossa 4).
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla:
   * maailmankartalla Millerin lieriö LEVEYS 12000 / LON0 −175 /
   * POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio), Euroopan
   * laudalla x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((5,32305556 − (−175)) mod 360) × (12000/360)
   *                     = 180,32305556 × 33,3333… = 6010,8
   *                   y = millerY-erotus pohjoisreunaan 76° = 905,9
   *   europe          x = (5,32305556 + 11) × 19,2 = 313,4
   *                   y = (72 − 60,39722222) × 26,3 = 305,2
   *
   * TARKISTUS LAATTAA VASTEN: Bergenin laatta on Euroopan laudalla
   * 313 / 305 (js/packs/europe.js) ja maailmankartalla 6011,0 / 906,3.
   * Piste osuu siis käytännössä laatan päälle — niin pitääkin, sillä
   * Bryggen on kaupungin ytimessä alle kilometrin päässä laatasta.
   * Piirtopuoli hoitaa erotuksen itse: alle 14 yksikön päässä laatasta
   * piste siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Bryggenin laituri',
    laudat: {
      maailmankartta: { x: 6010.8, y: 905.9 },
      europe: { x: 313.4, y: 305.2 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Bergenin sivupino (js/lehti.js
   * rakennaSivut) syntyy kaupungin kolmesta kulttuurikategoriasta
   * (js/packs/kulttuuri-kategoriat.js, bergen): 0 = etusivu,
   * 1 = kaupunkisivu "Bergen", 2 = Historia, 3 = Musiikki.
   *
   * HUOMIO FABLELLE: Bergenillä EI ole omaa kulttuurivisaa
   * (js/packs/europe-kulttuuri.js ei tunne kaupunkia), joten sivun 1
   * AARTEEN AVAUS -laatikkoa ei synny niin kuin Ateenassa ja
   * Helsingissä. Aarteen avaa siis sivun 2 nimetty tehtävä. Tämä
   * paketti ei korjaa puutetta, koska kulttuurivisan data ei asu täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: HANSASAANTO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: CHOPIN_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Norja) ----------
   *
   * UUSI POOLI, EI SIIRTO. Norja ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * KAKSI NOSTOA (tehtävänannon mitoitus: Norja on keskitasoa, 2–3).
   * Poolin kärki on Amundsen, koska sen ankkuri on isoisän oma vuosi;
   * Ekofisk on toinen, koska se on saman maan toinen kertomus siitä,
   * millä maa on maksettu — ja ne ovat kartalla mahdollisimman kaukana
   * toisistaan, Oslonlahden pohjukassa ja keskellä Pohjanmerta.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen katsomattomaan.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * MIKSI TÄMÄ NOSTO: isoisä kirjoitti merkintänsä kesäkuussa 1873.
       * Silloin Norjassa oli yksitoista kuukautta vanha poika, josta
       * tuli ensimmäinen ihminen etelänavalla. Aito historia on paras
       * ihmetys, ja tämä on laudan 1873-ankkuri.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, NOR/historia, nosto
       * "Etelänavalle koirien vetämänä" (jo hyväksyttyä pelidataa) —
       * etelänapa 14.12.1911 neljän miehen ja koiravaljakoiden kanssa,
       * koirat kestivät pakkasta ja söivät samaa ruokaa kuin miehet,
       * Scott 34 päivää myöhemmin, Norjan lippu ja kirje, Scottin
       * retkikunta menehtyi paluumatkalla, Luoteisväylä ensimmäisenä ja
       * myöhemmin ilmalaivalento pohjoisnavan yli.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Roald Amundsen" (johdanto ja osio Early life):
       *     syntyi 16.7.1872 Borgessa Fredrikstadin ja Sarpsborgin
       *     välillä laivanvarustajien ja kapteenien sukuun, neljäntenä
       *     poikana; äiti toivoi hänestä lääkäriä, ja hän piti lupauksensa
       *     äidin kuolemaan asti ollessaan 21, minkä jälkeen hän jätti
       *     yliopiston ja lähti merille; viisitoistavuotiaana hän luki
       *     John Franklinin kertomukset arktisista retkistä ja kirjoitti
       *     myöhemmin lukeneensa ne palolla, joka muovasi hänen koko
       *     elämänsä suunnan; aloitti perämiehenä belgialaisella
       *     etelämannerretkellä 1897–1899; johti ensimmäistä Luoteisväylän
       *     läpäissyttä retkeä 1903–1906 Gjøa-aluksella; lähti Norjasta
       *     kesäkuussa 1910 Fram-laivalla ja saapui Etelämantereelle
       *     tammikuussa 1911; viiden hengen ryhmä saavutti navan
       *     14.12.1911; 12.5.1926 hän ja viisitoista muuta miestä
       *     saavuttivat Norge-ilmalaivalla ensimmäisinä varmistetusti
       *     pohjoisnavan; katosi kesäkuussa 1928 lentäessään
       *     pelastustehtävällä Italia-ilmalaivan vuoksi, jäänteitä ei ole
       *     löydetty ja etsinnät lopetettiin saman vuoden syyskuussa.
       *   - en-Wikipedia "Fram Museum": Fram-museo Bygdøyn niemellä
       *     Oslossa vihittiin 20.5.1936, ja se kertoo Fridtjof Nansenin,
       *     Otto Sverdrupin ja Roald Amundsenin retkistä; Fram itse on
       *     museon keskus ja sisätilat ovat alkuperäiset; myös Gjøa on
       *     siellä omassa rakennuksessaan.
       *
       * IKÄSOPIVUUS (13+): Scottin retkikunnan kohtalo ja Amundsenin
       * katoaminen kerrotaan tapahtumina ilman yksityiskohtia, kuten
       * pelin oma nosto tekee.
       */
      id: 'amundsen',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Amundsenin koti',
      otsikko: 'Kun isoisäsi kirjoitti Bergenissä, tässä talossa oli '
        + 'yksitoistakuukautinen poika — hänestä tuli ensimmäinen ihminen '
        + 'etelänavalla',
      lunastus: [
        'Roald Amundsen syntyi 16. heinäkuuta 1872 Borgessa, Fredrikstadin '
          + 'ja Sarpsborgin välillä, laivanvarustajien ja kapteenien sukuun '
          + 'neljäntenä poikana. Kun isoisäsi istui vuotta myöhemmin '
          + 'bergeniläisen kapakan ikkunapöydässä, tämä poika oli '
          + 'yksitoistakuukautinen. Äiti toivoi hänestä lääkäriä, ja hän '
          + 'piti lupauksensa siihen asti kunnes äiti kuoli — silloin hän '
          + 'oli 21, ja hän jätti yliopiston ja lähti merille samana '
          + 'vuonna. Viisitoistavuotiaana hän oli lukenut John Franklinin '
          + 'kertomukset arktisilta retkiltä ja kirjoitti myöhemmin '
          + 'lukeneensa ne palolla, joka muovasi hänen koko elämänsä '
          + 'suunnan. Ensimmäinen työ jäillä oli perämiehen paikka '
          + 'belgialaisella etelämannerretkellä 1897–1899. Sitten hän vei '
          + 'pienen Gjøan Luoteisväylän läpi 1903–1906, ensimmäisenä, ja se '
          + 'kesti kolme vuotta.',
        'Etelänapa oli suunniteltu tarkasti. Amundsen lähti Norjasta '
          + 'kesäkuussa 1910 Fram-laivalla, saapui Etelämantereelle '
          + 'tammikuussa 1911, pystytti leirin Valaslahdelle ja perusti '
          + 'ketjun ruokavarastoja ennen kuin lähti liikkeelle lokakuussa. '
          + 'Viiden hengen ryhmä saavutti navan 14. joulukuuta 1911. '
          + 'Ratkaisu oli koirissa: ne kestivät pakkasta, vetivät kuormaa '
          + 'ja söivät samaa ruokaa kuin miehet. Britti Robert Scott saapui '
          + 'samaan paikkaan 34 päivää myöhemmin ja löysi sieltä Norjan '
          + 'lipun ja Amundsenin jättämän kirjeen; Scottin retkikunta '
          + 'menehtyi paluumatkalla. Vuonna 1926 Amundsen ja viisitoista '
          + 'muuta miestä lensivät Norge-ilmalaivalla ensimmäisinä '
          + 'varmistetusti pohjoisnavan yli. Kaksi vuotta myöhemmin, '
          + 'kesäkuussa 1928, hän katosi lennolla, joka etsi toista '
          + 'ilmalaivaa. Häntä ei löydetty, ja etsinnät lopetettiin saman '
          + 'vuoden syyskuussa. Molemmat hänen laivansa ovat yhä olemassa: '
          + 'Fram ja Gjøa seisovat Bygdøyn museossa Oslossa, joka avattiin '
          + 'vuonna 1936.',
      ],
      lahde: 'en-Wikipedia "Roald Amundsen", johdanto ja osio Early life, '
        + 'sekä en-Wikipedia "Fram Museum"; pelin oma nosto '
        + 'js/packs/maa-kategoriat.js (NOR/historia). Tarkistettu 29.8.2026.',
      /*
       * PÄÄKUVA on pelin omasta aineistosta (sama tiedosto NOR/historia,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 1372×981, public domain, Olav Bjaaland
       * (1863–1961), päiväys 17.12.1911, kuvaus "Amundsen Expedition at
       * the South Pole (from left to right): Roald Amundsen, Helmer
       * Hanssen, Sverre Hassel and Oscar Wisting". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: rakeinen aikalaisvalokuva lumikentältä,
       * neljä turkkeihin pukeutunutta hahmoa kaukana teltan vieressä ja
       * teltan päällä Norjan lippu — kasvoja ei erota, eikä kuvassa ole
       * nykyihmisiä. Lippu on sama yksityiskohta, jonka pelin oma nosto
       * mainitsee.
       *
       * LOISTOAIKAKUVAA EI VIELÄ OLE: tämän erän generoidut kuvat ovat
       * vasta promptinipussa, joten pääkuvaksi jää valokuva. Kun kuva
       * on generoitu, se tulee `osoite`-kenttään ja tämä valokuva
       * siirtyy `valokuva`-kenttään — sama kaava kuin Helsingin ja
       * Tukholman nostoilla (v1333).
       */
      kuva: {
        tiedosto: 'Amundsen Expedition at South Pole.jpg',
        selite: 'Amundsenin retkikunta etelänavalla joulukuussa 1911: '
          + 'Roald Amundsen, Helmer Hanssen, Sverre Hassel ja Oscar '
          + 'Wisting. Kuvan otti viides mies, Olav Bjaaland.',
        lahde: 'Olav Bjaaland, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi koirat ratkaisivat matkan etelänavalle?',
        'Mitä Scott löysi navalta?',
        'Miten Amundsen katosi?',
      ],
      /*
       * 59,2278 N / 11,0433 E — en-Wikipedia "Borge, Østfold",
       * prop=coordinates (haettu 29.8.2026). Sama kaava ja samat vakiot
       * kuin kohtaamispisteellä yllä.
       *
       * TARKISTUS LAATTAA VASTEN: lähin laatta on Oslo (Euroopan laudalla
       * 418 / 318), ja Borge jää siitä 18,6 yksikköä kaakkoon — yli
       * PISTE_ERO_MINin, joten piste piirtyy omalle paikalleen eikä
       * siirry. Niin pitääkin: Borge on Oslonlahden itärannalla, ei
       * Oslossa.
       */
      paikka: {
        nimi: 'Borge, Fredrikstad',
        laudat: {
          maailmankartta: { x: 6201.4, y: 963.9 },
          europe: { x: 423.2, y: 335.9 },
        },
      },
    },
    {
      /*
       * MIKSI TÄMÄ NOSTO: isoisä laski, että laituri, kirkot ja puolet
       * maan purjeista oli ostettu kuivatulla kalalla. Tämä on saman
       * maan seuraava lasku, sata vuotta myöhemmin ja mereltä sekin.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, NOR/historia, nosto "Kaivo,
       * joka muutti maan" (jo hyväksyttyä pelidataa) — Norja oli
       * 1960-luvulla Euroopan köyhempiä maita, Pohjanmereltä oli etsitty
       * öljyä vuosia tuloksetta, juuri ennen joulua 1969 varmistui
       * Ekofiskin löytö, tulot ohjattiin rahastoon tulevia sukupolvia
       * varten ja siitä kasvoi maailman suurin valtiollinen
       * sijoitusrahasto.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Ekofisk oil field" (johdanto ja infobox):
       *     kenttä on Norjan sektorin lohkossa 2/4 noin 320 kilometriä
       *     Stavangerista lounaaseen; Phillips Petroleum löysi sen 1969;
       *     se oli ensimmäinen öljylöytö sen jälkeen kun Pohjanmerelle
       *     oli porattu yli 200 koereikää; tuotanto alkoi 1971 suoraan
       *     tankkereihin neljästä merenpohjan kaivosta; koko kompleksissa
       *     on 29 lauttaa ja se toimii solmukohtana myös ympäröiville
       *     kentille; öljy kulkee Norpipe-putkea pitkin Teessiden
       *     jalostamolle Englantiin; tuotannon on suunniteltu jatkuvan
       *     vuoteen 2048.
       *   - Pelin oma, jo hyväksytty kuvateksti (js/packs/maa-kategoriat.js,
       *     NOR/historia), joka kertoo saman löytövuoden, saman etäisyyden
       *     Stavangerista ja saman yli 200 koereiän luvun.
       *
       * SISÄLTÖLINJAUS: kerrotaan toteavasti, ei kannanottona. Rahaston
       * koko ja öljyn loppuminen sanotaan pelin oman noston sanoin, eikä
       * tekstissä oteta kantaa nykypolitiikkaan.
       */
      id: 'ekofisk',
      nimio: 'Ekofisk',
      otsikko: 'Pohjanmereen porattiin yli kaksisataa tyhjää reikää — ja '
        + 'sitten yksi osui juuri ennen joulua',
      lunastus: [
        'Norja oli 1960-luvulla Euroopan köyhempiä maita. Pohjanmereltä oli '
          + 'etsitty öljyä vuosia, ja koereikiä oli porattu yli '
          + 'kaksisataa ilman että yksikään olisi osunut. Juuri ennen '
          + 'joulua 1969 varmistui, että Ekofiskin kentältä löytyi öljyä — '
          + 'ja paljon. Kenttä on Norjan sektorissa noin 320 kilometriä '
          + 'Stavangerista lounaaseen, keskellä avomerta, eikä sinne pääse '
          + 'kuin helikopterilla tai laivalla. Tuotanto alkoi jo 1971, '
          + 'aluksi suoraan tankkereihin neljästä merenpohjan kaivosta. '
          + 'Sittemmin paikalle on kasvanut kokonainen kaupunki: 29 '
          + 'lauttaa, jotka toimivat myös naapurikenttien solmukohtana, ja '
          + 'putki nimeltä Norpipe, jota pitkin öljy kulkee Englantiin '
          + 'Teessiden jalostamolle asti.',
        'Löytö olisi voinut valua nopeasti käsien läpi, mutta maa teki '
          + 'poikkeuksellisen päätöksen: tulot eivät menneet suoraan '
          + 'käyttöön vaan rahastoon, jonka on tarkoitus riittää myös '
          + 'tuleville sukupolville. Siitä kasvoi maailman suurin '
          + 'valtiollinen sijoitusrahasto. Öljyn ansiosta Norjasta tuli '
          + 'rikas nopeasti, ja nyt maa miettii, mitä tehdään kun öljy '
          + 'loppuu — Ekofiskin tuotannon on suunniteltu jatkuvan vuoteen '
          + '2048, eli lähes kahdeksankymmentä vuotta ensimmäisestä '
          + 'kaivosta. Isoisäsi laski Bergenissä, että laituri, kirkot ja '
          + 'puolet maan purjeista oli maksettu kuivatulla kalalla. Sata '
          + 'vuotta myöhemmin sama maa laskettiin uudelleen, ja lasku tuli '
          + 'taas mereltä.',
      ],
      lahde: 'en-Wikipedia "Ekofisk oil field", johdanto ja infobox; pelin '
        + 'oma nosto js/packs/maa-kategoriat.js (NOR/historia). Tarkistettu '
        + '29.8.2026.',
      /*
       * PÄÄKUVA on pelin omasta aineistosta (sama tiedosto NOR/historia).
       * Commons 29.8.2026: 640×432, CC BY-SA 4.0, Telemuseet, päiväys
       * 1976, kuvaus "Fra Ekofisk-feltet". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: aikalaisvalokuva kentältä, ei
       * tunnistettavia kasvoja. Kuva on pieni (640 px), mutta se on sama
       * tiedosto, joka on jo pelissä maalehden nostona.
       */
      kuva: {
        tiedosto: 'Ekofisk (TELE.1990-2-438).jpg',
        selite: 'Ekofiskin öljykenttä löydettiin 1969 Stavangerista 320 '
          + 'kilometriä lounaaseen, ja se oli ensimmäinen öljylöytö '
          + 'Pohjanmerellä yli 200 koereiän jälkeen.',
        lahde: 'Telemuseet, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Kuinka monta reikää porattiin ennen kuin osui?',
        'Miksi öljytulot pantiin rahastoon?',
        'Mihin Ekofiskin öljy putkitetaan?',
      ],
      /*
       * 56,54919722 N / 3,20998611 E — en-Wikipedia "Ekofisk oil field",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin yllä.
       *
       * TARKISTUS LAATTAA VASTEN: piste jää keskelle Pohjanmerta, kauas
       * jokaisesta laudan laatasta — lähin on Bergen (313 / 305), jonka
       * etäisyys on yli sata yksikköä. Piirtopuolen siirtoa ei tarvita,
       * ja piste kertoo itsestään sen, mikä on olennaista: kohde ei ole
       * missään kaupungissa.
       */
      paikka: {
        nimi: 'Ekofiskin kenttä',
        laudat: {
          maailmankartta: { x: 5940.3, y: 1093.2 },
          europe: { x: 272.8, y: 406.4 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: viikinkien
   * hopeakätkö. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Vuonon suulla asuva vanhus vannoi, että hänen sukunsa mailta on '
      + 'kynnetty esiin hopeaa, jonka viikingit kätkivät ja unohtivat — '
      + 'käätyjä, rahoja, katkottuja harkkoja. Maa muistaa pidempään kuin '
      + 'suku. Jossain aura ei ole vielä osunut oikeaan vakoon.',
  },
};
