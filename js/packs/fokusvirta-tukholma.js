/*
 * TUKHOLMAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-lontoo.js:lle: samat kentät, sama
 * järjestys, sama moottori (js/fokusvirta.js). YHTÄ POIKKEUSTA LUKUUN
 * OTTAMATTA — tämä kaupunki pilotoi PÖLLÖN SÄHKETEHTÄVÄN kohtaamisen
 * sijasta (ks. SÄHKETEHTÄVÄ alempana).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa — niitä
 * ei ole lyhennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Kronan-laivan kultakolikot. Kronan upposi 1676 Öölannin
 * edustalla (aarremerkintä).
 *
 * FAKTAPOHJA. Aallon 3 maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Ruotsin maalehden nostot
 *      (js/packs/maa-kategoriat.js, SWE/historia ja SWE/elaimet) ja
 *      Tukholman kaupunkilehden omat nostot (js/packs/
 *      kulttuuri-kategoriat.js, tukholma). Nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin — myös niiden KUVAT, jotka
 *      tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu KAHDESTA
 *      riippumattomasta lähteestä. Ne on nimetty kunkin kohdan omassa
 *      kommentissa. Mitään ei ole päätelty eikä pyöristetty.
 *
 * PÄÄLLEKKÄISYYS MAALEHDEN KANSSA ON TIETOINEN JA RAJATTU. Kaikki kolme
 * täkyä nostavat saman aiheen kuin Ruotsin maalehti (Spillings, Norrströmin
 * lohi, Vädersolstavlan), koska juuri ne kytkeytyvät isoisän merkintään ja
 * aarteeseen. KAUPUNKILEHDEN sivuihin — niihin, jotka pelaaja lukee samassa
 * kulussa — EI ole päällekkäisyyttä lainkaan, ja siihen on tässä kaupungissa
 * erityinen syy: sähketehtävän vastaus KAIVETAAN kaupunkilehdestä, eikä
 * yksikään täky saa antaa sitä valmiina.
 *
 * ── SIVU NELJÄTOISTA ON SULJETTU PARI ──────────────────────────────
 *
 * Merkinnän kadonnut sivu 14 on Tukholma↔Venetsia-parin oma motiivi
 * (päätoimittajan linjaus 29.8.2026): kierrätys on tarkoituksellinen,
 * eikä uusia sivu 14 -viittauksia kirjoiteta muualle. Täällä siihen
 * viitataan kerran, Livian maadoituksessa, eikä yksikään täky rakennu
 * sen varaan.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, tukholma/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luentaa EI ole vielä generoitu, joten `matkakirja.aanite` puuttuu.
 * Teksti ja luenta ovat sanasta sanaan samat, joten luennan voi ajaa
 * suoraan (generoi-luennat-tyonkulku) ilman että tekstiin kosketaan.
 */

/*
 * =====================================================================
 * SÄHKETEHTÄVÄ — TUKHOLMA ON PILOTTI (Raamattu, PÖLLÖN SÄHKETEHTÄVÄ)
 * =====================================================================
 *
 * Kaupungissa EI ole `kohtaaminen`-kenttää lainkaan. Sen tilalla on
 * `sahketehtava`: pöllö on jo selvittänyt aarteen paikan ja sähköttää
 * Livialle, mutta ei kerro paikkaa ennen kuin saa takaisin tunnussanan,
 * joka on KAIVETTAVA Ruotsin omista peliaineistoista.
 *
 * VASTAUSMUOTO ON SÄHKELOMAKE (omistajan päätös 29.8.2026): kaksi
 * aukkoa, KOHDE ja VUOSI. Kohde poimitaan KOKO RUOTSIN
 * SISÄLTÖHAKEMISTOSTA — aakkostettu lista kaikista maan pelisisällön
 * juttujen otsikoista, 31 riviä, rakennettu ajonaikaisesti pelidatasta
 * (js/fokusvirta.js sisaltohakemisto) — ja vuosi kirjoitetaan lukuna.
 * Yhdistelmiä on satoja, joten arvaaminen ei kannata; lehdestä
 * löytäneelle täyttö on sekuntien työ.
 *
 * MIKSI JUURI TÄMÄ VASTAUS. Aarremerkintä sanoo merestä: *"meri pitää
 * sen minkä ottaa — kunnes joku kysyy oikein"*. Vastaus on saman
 * lauseen toinen puoli: Ruotsissa meri kerran ANTOI takaisin. Kohde on
 * Tukholman kaupunkilehden sivun 1 juttu "Laiva, joka upposi ja nousi"
 * ja vuosi 1961, jolloin Vasa nostettiin. Molemmat lukevat lehdessä,
 * jonka pelaaja on juuri saanut käteensä — tämä on käänteistä
 * oppimista, ei muistikoetta.
 *
 * KAKSI OTSIKKOA KELPAA, JA SE ON TARKOITUS. Sama laiva on myös Ruotsin
 * maalehden Historia-sivulla otsikolla "Laiva, joka kaatui tuhannen
 * metrin jälkeen", ja sisältöhakemistossa ovat molemmat. Pelaajaa ei
 * rangaista siitä, että hän luki maalehden eikä kaupunkilehteä: kumpikin
 * otsikko hyväksytään, koska kumpikin kertoo saman laivan.
 *
 * VÄÄRÄ YRITYS EI RIKO MITÄÄN. Yrityksiä ei rajata eikä aarre lukitu
 * koskaan; pöllö sähköttää takaisin ja kertoo kumpi aukko on pielessä,
 * palkkio pienenee neljänneksellä joka ohilyönnistä (lattia 0), ja
 * kahden ohilyönnin jälkeen Livia sanoo lähteen suoraan.
 */
const SAHKE_TUKHOLMA = {
  /*
   * TEHTÄVÄN TUNNUS on vapaan vastauksen (vaihe 2) avain: peli lähettää
   * VAIN tämän tunnuksen ja pelaajan tekstin välityspalvelimelle, joka
   * tietää oikean vastauksen (tools/pollo/rajat.js SAHKE_VASTAUKSET).
   * Tunnus ja taulu pidetään synkassa yksikkötestillä.
   */
  id: 'tukholma-vasa',

  hahmo: 'Pöllöltä, meren yli',

  /*
   * SÄHKEEN TYYLI on pelin oma sähkemotiivi (Raamattu, SÄHKEJÄRJESTELMÄ:
   * *"valmispohjaiset sähkeet … STOP"*): lyhyet rivit, ei sivulauseita,
   * jokainen rivi päättyy STOPiin. Rivinvaihto on rivi, ja kortti
   * versaloi ne itse (css/fokusvirta.css .fokusvirta-sahkerivi).
   *
   * SÄHKE KERTOO MINKÄ TYYPPISESTÄ AINEISTOSTA RATKAISU LÖYTYY —
   * "lehdistä jotka hän on jo saanut käteensä" — muttei sitä, mikä
   * vastaus on. Juuri se raja tekee tehtävästä kaivamista eikä
   * arvaamista.
   */
  sahke: 'LIVIALLE STOP\n'
    + 'PAIKKA ON SELVILLÄ STOP\n'
    + 'EN SÄHKÖTÄ SITÄ ILMAAN KOSKA LINJALLA KUUNNELLAAN STOP\n'
    + 'VIERAASI VASTATKOON TUNNUSSANALLA STOP\n'
    + 'MERI OTTI RUOTSISSA KERRAN JA ANTOI TAKAISIN STOP\n'
    + 'NIMETKÖÖN SEN KOHTEEN JA VUODEN JOLLOIN SE NOUSI STOP\n'
    + 'MOLEMMAT LUKEVAT LEHDISSÄ JOTKA HÄN ON JO SAANUT KÄTEENSÄ STOP\n'
    + 'PÖLLÖ STOP',

  /*
   * LIVIAN SAATE. Puhekielisäännöt (Raamattu, LIVIAN PUHEKIELI):
   * lyhentymät reunoilla ("No niin", "mut"), keskellä sanat auki,
   * pronominit kokonaisina, ei huutomerkkejä.
   */
  johdanto: 'No niin. Pöllö on löytänyt paikan eikä kerro sitä ennen kuin '
    + 'se saa tunnussanan takaisin — se on aina ollut tarkka siitä, kuka '
    + 'kuulee mitäkin. Minä täytän lomakkeen ja lennän, sinä kaivat '
    + 'vastauksen.\n\n'
    + 'Kaksi aukkoa: yksi kohde Ruotsin luettelosta ja yksi vuosiluku. '
    + 'Kumpikin lukee siinä lehdessä, jonka sinä juuri sait käteesi. '
    + 'Väärä vastaus ei sulje mitään — mut se syö palkkiota, ja minä '
    + 'joudun lentämään turhaan.',

  /* Sisältöhakemisto rakennetaan tämän maan pelidatasta ajonaikaisesti. */
  hakemistoMaa: 'SWE',

  aukot: [
    {
      id: 'kohde',
      otsake: 'KOHDE',
      sahkeSana: 'KOHDE',
      tyyppi: 'hakemisto',
      vihje: '— valitse Ruotsin luettelosta —',
      /*
       * Molemmat otsikot kertovat Vasasta (ks. KAKSI OTSIKKOA KELPAA
       * yllä). Ensimmäinen on Tukholman kaupunkilehden sivulta 1, toinen
       * Ruotsin maalehden Historia-sivulta.
       */
      oikeat: ['Laiva, joka upposi ja nousi', 'Laiva, joka kaatui tuhannen metrin jälkeen'],
      /*
       * VAPAAN TEKSTIN TUNNETUT KIRJOITUSASUT (vaihe 2). Nämä ovat
       * pelin ILMAINEN oikopolku: jos pelaajan omin sanoin kirjoitettu
       * vastaus sisältää jonkin näistä ja oikean vuosiluvun, se
       * hyväksytään paikallisesti eikä Livian tarvitse lentää.
       * Lista saa olla suppea — kaikki muu menee pöllön tulkittavaksi,
       * eikä siitä siis seuraa hylkäys.
       */
      vapaat: ['Vasa', 'Wasa', 'Vaasa', 'Vasan', 'Vasaa'],
    },
    {
      id: 'vuosi',
      otsake: 'VUOSI',
      sahkeSana: 'VUOSILUKU',
      tyyppi: 'luku',
      vihje: '____',
      pienin: 1000,
      suurin: 2100,
      // Vasa nostettiin 1961 (pelidata: kaupunkilehden nosto "Laiva, joka
      // upposi ja nousi" ja sen kuva "Vasa 14 maj 1961.jpg").
      oikea: 1961,
    },
  ],

  laheta: 'Lähetä sähke pöllölle',
  /* Vapaan vastauksen kenttä ja sen oma nappi (vaihe 2). */
  vapaaOtsake: 'Tai kirjoita vastaus omin sanoin',
  vapaaVihje: 'Esimerkiksi: se laiva joka nostettiin merestä, ja vuosi',
  lahetaVapaa: 'Lähetä omin sanoin',
  vaarinSahke: 'EI TÄSMÄÄ STOP TARKISTA KOHDE JA VUOSILUKU STOP',

  /* Kahden ohilyönnin jälkeen Livia sanoo lähteen suoraan. */
  vinkki: 'Kato, minä sanon sen nyt suoraan: kaupunkilehden ensimmäisellä '
    + 'sivulla on juttu laivasta, joka upposi ja nousi. Vuosiluku on samassa '
    + 'kappaleessa.',

  vastaussahke: 'PÖLLÖLLE STOP\nTUNNUSSANA TÄSMÄÄ STOP\nLIVIA TULEE STOP',
  oikein: 'Se on se. Kolmesataakolmekymmentäkolme vuotta pohjassa ja sitten '
    + 'ylös — meri ei syönyt sitä, se vain piti sitä. Minä vien tämän '
    + 'pöllölle nyt heti. Älä sinä jää seisomaan tähän, minä palaan kyllä.',
  /*
   * FAKTARIVI on pelidatasta (kaupunkilehden nosto): Itämeren
   * vähäsuolainen vesi piti laivamadot loitolla, ja siksi puu säilyi.
   */
  fakta: 'Itämeri on niin vähäsuolainen, ettei laivamato elä siinä. Siksi '
    + 'puu säilyy sen pohjassa — ja siksi isoisäsi luettelossa on merkintöjä, '
    + 'jotka ovat yhä olemassa.',
  lento: 'Anna Livian mennä',

  /* Pisteen napautus lennon aikana: kortti kertoo tilanteen. */
  lahetetty: 'SÄHKE LÄHETETTY STOP\nODOTA VASTAUSTA STOP',
  odotus: 'Livia on matkalla. Se palaa kun se palaa — ja sillä välin sinä '
    + 'saat tehdä mitä huvittaa.',

  paluu: 'Perillä oltiin. Pöllö luki tunnussanan kahdesti, sanoi jotain '
    + 'kohteliaisuudesta ja antoi paikan. Se on tässä, sinun jalkojesi alla '
    + '— katso alas.',
};

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Sulkukysymys on Tukholman lehden sivun 2
 * ("Kadut ja sulut") oman noston "Polhem sai sulkutyön 83-vuotiaana"
 * tekstiä ja Martin-kysymys sivun 1 ("Tukholma") oman noston "Martin
 * piirsi Tukholman ennen valokuvaa" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI VASA-KYSYMYSTÄ: sähketehtävän vastaus on juuri Vasan juttu ja
 * sen nostovuosi. Jos lehden aarteen avaava tehtävä kysyisi samasta
 * laivasta, se antaisi tunnussanan ennen kuin sähke on edes luettu.
 */
const POLHEM_VISA = {
  kysymys: 'Tukholman sulkutyö annettiin vuonna 1744 Christopher Polhemille. '
    + 'Kuinka vanha hän silloin oli?',
  vaihtoehdot: [
    '83-vuotias',
    '38-vuotias',
    '53-vuotias',
  ],
  oikea: 0,
  fakta: 'Mälaren on järvi, jonka pinta on merenpintaa korkeammalla, ja '
    + 'Tukholma seisoo juuri siinä kohdassa, jossa vesi purkautuu '
    + 'Itämereen. Polhem kuoli kesken hankkeen, ja hänen poikansa Gabriel '
    + 'sai sulun valmiiksi 1755.',
};

const MARTIN_VISA = {
  kysymys: 'Elias Martin asui kaksitoista vuotta Lontoossa ja toi sieltä '
    + 'kotiin taidon, jolla kuparilevystä saa vesivärimäisen sävyn. Mikä '
    + 'tekniikka se oli?',
  vaihtoehdot: [
    'Akvatinta',
    'Litografia',
    'Puupiirros',
  ],
  oikea: 0,
  fakta: 'Kotiin palattuaan 1780 Martin kääntyi kaupunkiin, jota kukaan ei '
    + 'ollut piirtänyt sellaisenaan: satamaan, toreille ja työn ääreen. '
    + 'Veli Johan Fredrik kaiversi kuvat levyiksi, ja niitä myytiin '
    + 'sarjoina. Ne ovat tarkin näkymä Tukholmaan ennen valokuvaa.',
};

export const FOKUSVIRTA_TUKHOLMA = {
  kaupunki: 'tukholma',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi seuraa oppitunnin faktoja:
     * Oscar II kruunattiin Storkyrkanissa 12. toukokuuta 1873 (sv-Wikipedia
     * "Oscar II av Sverige", osio Kröningen; ks. oppitunti).
     */
    paikkarivi: 'Tukholma, toukokuussa 1873. Liputus joka ikkunassa ja '
      + 'tungos, jossa taskuun ylettyy kuka tahansa.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Osuin Tukholmaan keskelle kruunajaisia: Oscar II sai kruununsa, '
      + 'ja tungos vei minulta kaksi nappia ja sivun neljätoista. Sivulla oli '
      + 'puolikas kartta. Kirjoitan tämän muistiin siltä varalta, että joku '
      + 'vielä kysyy.',
    luenta: '[curious] Osuin Tukholmaan keskelle kruunajaisia: Oscar II sai '
      + 'kruununsa, ja tungos vei minulta kaksi nappia ja sivun neljätoista. '
      + '[softly] Sivulla oli puolikas kartta. [whispers] Kirjoitan tämän '
      + 'muistiin siltä varalta, että joku vielä kysyy.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — NALJAILUOTE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ — PARIPERIAATE"). Merkintä on kevyt ja arkinen —
     * taskuvaras kruunajaisissa — joten pariperiaate sallii naljailun
     * eikä vaadi pehmennystä. Livia asettuu isoisän puolelle ja tekee
     * saman havainnon toisin päin: samana päivänä yksi menetti puolikkaan
     * kartan ja toinen sai kokonaisen kruunun.
     *
     * FAKTAKURI: kaksi väitettä, molemmat tarkistettavia. (1) Oscar II
     * kruunattiin Storkyrkanissa 12. toukokuuta 1873. (2) Hän jäi Ruotsin
     * viimeiseksi kruunatuksi kuninkaaksi. Molemmat: sv-Wikipedia "Oscar II
     * av Sverige", osio "Kröningen" (*"Den 12 maj 1873 kröntes Oscar II i
     * Storkyrkan i Stockholm. Han skulle komma att bli den sista kungen som
     * kröntes i Sverige."*), ja sama tieto en-Wikipedian "Oscar II"
     * -artikkelin kruunajaisosiossa; tarkistettu 29.8.2026.
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "mut"), keskellä
     * sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Kaksi nappia ja sivu neljätoista — meidän suvussa '
      + 'sanotaan, että väkijoukko on ainoa paikka, jossa kirje katoaa ilman '
      + 'että kukaan varastaa sitä. Se päivä oli kyllä iso: Oscar II '
      + 'kruunattiin Storkyrkanissa kahdentenatoista toukokuuta, ja hän jäi '
      + 'Ruotsin viimeiseksi kruunatuksi kuninkaaksi. Kukaan ei ole sen '
      + 'jälkeen nostanut sitä kruunua päähänsä. Saman päivän aikana yksi '
      + 'sai kokonaisen kruunun ja toinen menetti puolikkaan kartan. Mut '
      + 'kuule, se puolikas on yhä jossain.',
    /*
     * Huomio viittaa herokuvan kohteeseen. Faktat ovat lehden oman
     * avauskuvan selitteestä (js/packs/kulttuuri-kategoriat.js,
     * tukholma/avauskuvat): kaupunki on rakennettu neljälletoista
     * saarelle siihen kohtaan, jossa makea Mälaren purkautuu suolaiseen
     * Itämereen. Vähäsuolaisuus ja laivamato ovat saman lehden noston
     * "Laiva, joka upposi ja nousi" faktoja.
     *
     * TÄMÄ POHJUSTAA SÄHKETEHTÄVÄN AIHEEN muttei sen vastausta: kuplassa
     * ei ole laivan nimeä eikä yhtään vuosilukua.
     */
    teksti: 'Katso ensin tonne alas. Koko kaupunki seisoo neljällätoista '
      + 'saarella siinä kohdassa, jossa makean Mälarenin vesi purkautuu '
      + 'suolaiseen Itämereen. Ja juuri se sekoitus on tämän paikan onni: '
      + 'Itämeri on niin vähäsuolainen, ettei laivamato viihdy siinä, joten '
      + 'sen pohjassa säilyy puu, joka missä tahansa muualla olisi syöty. '
      + 'Tämän kaupungin alla on enemmän tavaraa kuin sen päällä.',
    kuva: {
      ampari: 'herokoe/hero-tukholma-gamlastan.jpg',
      selite: 'Tukholma on rakennettu neljälletoista saarelle siihen '
        + 'kohtaan, jossa makea Mälaren purkautuu suolaiseen Itämereen.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: aarremerkintä kertoo aarteesta, jonka meri otti
       * eikä anna. Tämä on saman maan vastakohta — aarre, jonka maa otti
       * ja antoi takaisin tuhannen vuoden päästä.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, SWE/historia, nosto "Maailman
       * suurin viikinkihopea" (jo hyväksyttyä pelidataa) — 67 kiloa,
       * noin neljätoistatuhatta kolikkoa, useimmat islamilaisista maista
       * Bagdadista Samarkandiin, metallinilmaisin, vuosi 1999, kynnetty
       * pelto Gotlannin Spillingsissä.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - sv-Wikipedia "Spillingsskatten" (johdanto ja osio
       *     bronsdepån): löytöpäivä perjantai 16.7.1999, paikka Othemin
       *     pitäjä Sliten luoteispuolella; hopea oli KAHTENA kätkönä (27
       *     ja 40 kiloa) noin kolmen metrin päässä toisistaan
       *     viikinkiaikaisen talon lattialankkujen alla; nuorin kolikko
       *     lyöty vuonna 871; lähes 60 prosenttia löydöstä on
       *     rannerenkaita; samasta paikasta löytyi lisäksi pronssikätkö,
       *     jossa oli yli viisisataa esinettä; löytöpalkkio oli
       *     1 263 200 kruunua.
       *   - Gotlands Museumin oma esinetieto, luettuna Commonsin
       *     imageinfosta alla olevan kuvan kuvauksesta: sama kätkö, sama
       *     museo Visbyssä.
       */
      id: 'hopeakatko',
      nappi: 'Kuusikymmentäseitsemän kiloa hopeaa pellon alla',
      otsikko: 'Spillingsin kätkö',
      teksti: 'Gotlannin Spillingsissä eräs maanviljelijä oli kyntänyt '
        + 'vuosikymmeniä pellon yli, jonka alla makasi maailman suurin '
        + 'tunnettu viikinkiaikainen hopeakätkö. Se löytyi perjantaina 16. '
        + 'heinäkuuta 1999 metallinilmaisimella, ja maasta nousi 67 kiloa '
        + 'hopeaa: rannerenkaita, tankoja ja noin neljätoistatuhatta '
        + 'kolikkoa. Suurin osa kolikoista oli lyöty islamilaisissa maissa '
        + 'Bagdadista Samarkandiin — gotlantilaiset kävivät siis kauppaa '
        + 'Venäjän jokia pitkin aina Kaspianmerelle saakka ja toivat '
        + 'turkiksista hopeaa. Kätkö oli oikeastaan kaksi: kaksikymmentä'
        + 'seitsemän kiloa ja neljäkymmentä kiloa, kolmen metrin päässä '
        + 'toisistaan viikinkiaikaisen talon lattialankkujen alla. Lähes '
        + 'kuusi kymmenesosaa siitä on rannerenkaita. Nuorin kolikko on '
        + 'lyöty vuonna 871, joten hopea pantiin maahan joskus sen jälkeen '
        + '— eikä sitä koskaan haettu pois. Löytäjät saivat palkkioksi '
        + 'miljoona kaksisataakuusikymmentäkolmetuhatta kruunua, ja se on '
        + 'löydön arvosta se pienin puoli.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto SWE/historia,
       * js/packs/maa-kategoriat.js) — siis jo kertaalleen tarkistettu ja
       * hyväksytty. Commons 29.8.2026: CC BY-SA 4.0, W.carter.
       * SILMÄTARKISTUS tehty: kuvassa on hopeasykkyrä museopöydällä, ei
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Silver tangle Spillings Hoard 1.jpg',
        selite: 'Spillingsin aarre on maailman suurin viikinkiaikainen '
          + 'hopealöytö: se painoi 67 kiloa ja sisälsi 14 295 kolikkoa, '
          + 'joista useimmat islamilaisia.',
        lahde: 'W.carter, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miten maailman suurin viikinkihopea lopulta löytyi '
          + 'gotlantilaisen pellon alta?',
        vaihtoehdot: [
          'Metallinilmaisimella',
          'Auran terä nosti sen esiin kesken kynnön',
          'Sukeltaja löysi sen rannan edustalta',
        ],
        oikea: 0,
        fakta: 'Nuorin kolikko on lyöty vuonna 871, joten hopea pantiin '
          + 'maahan joskus sen jälkeen. Kätköjä oli kaksi, kolmen metrin '
          + 'päässä toisistaan, viikinkiaikaisen talon lattialankkujen alla.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * FAKTAT: js/packs/maa-kategoriat.js, SWE/elaimet, nosto "Lohi ui
       * eduskuntatalon ohi" (jo hyväksyttyä pelidataa). Aineiston luvut
       * sellaisinaan: Norrström eduskuntatalon vierestä, satoja lohia ja
       * meritaimenia vuodessa, vuoden 2000 lohi lähes 22 kiloa, noin
       * kolmekymmentä kalalajia, istutukset 1970-luvulta, vuoden 1850
       * sulku muutettiin kalatieksi 2024.
       *
       * MIKSI TÄMÄ TÄKY TÄHÄN KAUPUNKIIN: Livian huomio kertoi makean ja
       * suolaisen veden kohtaamisesta. Tämä on sama kohta kalan kannalta
       * — ja aarremerkinnän kalastaja on tämän kalastajan kaukainen
       * sukulainen.
       */
      id: 'lohi',
      nappi: 'Lohi nousee virtaan eduskuntatalon vierestä',
      otsikko: 'Norrströmin lohet',
      teksti: 'Se kohta, jossa makea vesi purkautuu suolaiseen, on kalalle '
        + 'portti. Norrström on virta, jota pitkin Mälarenin vesi syöksyy '
        + 'mereen aivan eduskuntatalon vierestä, ja siitä nostetaan joka '
        + 'vuosi satoja lohia ja meritaimenia: vuonna 2000 saatiin lohi, '
        + 'joka painoi lähes kaksikymmentäkaksi kiloa. Vedessä elää noin '
        + 'kolmekymmentä kalalajia, enemmän kuin missään muualla Tukholman '
        + 'seudun vesissä. Aina ei ollut näin. Kalat palasivat vasta '
        + '1970-luvulla aloitettujen istutusten myötä, ja vuonna 2024 vanha '
        + 'vuoden 1850 sulku muutettiin kalatieksi, jota myöten kalat '
        + 'pääsevät nousemaan järveen asti. Keskellä miljoonakaupunkia '
        + 'seisoo siis mies onki kädessä siinä samassa virrassa, jonka '
        + 'yli parlamentti katsoo ikkunastaan.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto SWE/elaimet).
       * Commons 29.8.2026: CC BY 3.0, Bengt Nyman. SILMÄTARKISTUS tehty:
       * kuvassa onkija virran rannalla kaukaisena hahmona, ei
       * tunnistettavia kasvoja.
       */
      kuva: {
        tiedosto: 'Fishing in Strömmen, Stockholm - panoramio.jpg',
        selite: 'Tukholman Strömmenissä saa onkia keskellä kaupunkia, ja '
          + 'lohi nousee virtaan aivan vanhankaupungin kupeeseen.',
        lahde: 'Bengt Nyman, Wikimedia Commons (CC BY 3.0)',
      },
      visa: {
        kysymys: 'Mitä Tukholman keskustan vanhalle vuoden 1850 sululle '
          + 'tehtiin vuonna 2024?',
        vaihtoehdot: [
          'Se muutettiin kalatieksi',
          'Se purettiin ja korvattiin sillalla',
          'Se suljettiin kokonaan',
        ],
        oikea: 0,
        fakta: 'Norrströmistä nostetaan vuosittain satoja lohia ja '
          + 'meritaimenia, ja vedessä elää noin kolmekymmentä kalalajia. '
          + 'Kalat palasivat 1970-luvulla aloitettujen istutusten myötä.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisältä katosi sivu, jolla oli puolikas kartta,
       * eikä sitä ole enää olemassa. Tämä on saman kaupungin oma
       * vastine — vanhin tunnettu kuva Tukholmasta, jonka alkuperäinen on
       * kadonnut ja josta on jäljellä vain kopio. Motiivi ei laajene:
       * sivua neljätoista ei mainita täällä.
       *
       * FAKTAT: js/packs/maa-kategoriat.js, SWE/historia, nosto "Taivaalla
       * paloi kuusi aurinkoa" (jo hyväksyttyä pelidataa) — 20.4.1535,
       * halo, Storkyrkan, vuoden 1636 kopio, alkuperäinen kadonnut.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - sv-Wikipedia "Vädersolstavlan" (johdanto ja osio "Datering"):
       *     öljymaalaus puupaneelille, 163 × 110 senttimetriä; tauluun on
       *     kirjoitettu vuosi 1535 ja renovointivuosi 1636; vuoden 1999
       *     tutkimus osoitti, että Storkyrkanissa riippuva taulu on tehty
       *     1636 tai vähän sitä ennen ja että "renovointi" oli
       *     tosiasiassa kopiointi, jonka teki Jacob Heinrich Elbfas;
       *     alkuperäisen kohtalo on tuntematon.
       *   - sv-Wikipedia "Storkyrkan" -artikkelin taideluettelo, joka
       *     nimeää saman taulun samoin tiedoin.
       *
       * MITÄ EI KERROTA FAKTANA: taulun tilaaja. Pelin oma nosto sanoo
       * pappi Olaus Petrin teettäneen sen, mutta lähde merkitsee
       * attribuution perimätiedoksi ja kiistanalaiseksi, joten se
       * sanotaan tässä perimätietona.
       */
      id: 'aurinkotaulu',
      nappi: 'Kuusi aurinkoa ja kadonnut alkuperäinen',
      otsikko: 'Vädersolstavlan',
      teksti: 'Huhtikuun 20. päivänä 1535 tukholmalaiset näkivät '
        + 'aamutaivaalla valkoisia renkaita ja niiden kehällä useita '
        + 'hehkuvia auringonkuvia. Kyse oli halosta: ilmassa leijuvat '
        + 'jääkiteet taittavat auringonvaloa kuin lasiprismat. Näky '
        + 'pelotti, ja siitä teetettiin maalaus — perimätiedon mukaan '
        + 'pappi Olaus Petrin toimesta. Samalla syntyi vanhin tunnettu '
        + 'värikuva Tukholmasta: kaupunki muureineen, kirkontorneineen ja '
        + 'ympäröivine hirsiaitoineen. Ja tässä on se kohta, joka '
        + 'isoisääsi kiinnostaisi. Taulu, joka Storkyrkanissa riippuu, on '
        + 'öljymaalaus puupaneelille, 163 senttiä leveä ja 110 korkea, ja '
        + 'siihen on kirjoitettu kaksi vuosilukua: 1535 ja "renovoitu '
        + '1636". Vuonna 1999 taulu tutkittiin, ja se osoittautui '
        + 'kokonaan 1600-luvun työksi: renovointi olikin kopiointi, jonka '
        + 'teki Jacob Heinrich Elbfas. Alkuperäinen on kadonnut, eikä '
        + 'kukaan tiedä minne. Kaupungin vanhin kuva on siis kuva '
        + 'kuvasta, jota ei enää ole.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto SWE/historia).
       * Commons 29.8.2026: public domain. SILMÄTARKISTUS tehty: maalaus,
       * jossa kaupunki ja taivaan halorenkaat.
       */
      kuva: {
        tiedosto: 'Vädersolstavlan 1535.jpg',
        selite: 'Vädersolstavlan kuvaa Tukholman yllä 20. huhtikuuta 1535 '
          + 'nähtyä halo-ilmiötä, ja se on vanhin värillinen kuva '
          + 'kaupungista.',
        lahde: 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mitä vuoden 1999 tutkimus paljasti Storkyrkanissa '
          + 'riippuvasta Vädersolstavlanista?',
        vaihtoehdot: [
          'Se on 1600-luvulla tehty kopio kadonneesta alkuperäisestä',
          'Se on maalattu vasta 1800-luvulla matkamuistoksi',
          'Se on alkuperäinen, eikä siihen ole koskaan koskettu',
        ],
        oikea: 0,
        fakta: 'Kopion teki Jacob Heinrich Elbfas vuonna 1636 tai vähän '
          + 'sitä ennen. Taivaan ilmiö oli halo: ilmassa leijuvat '
          + 'jääkiteet taittavat auringonvaloa kuin lasiprismat.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa isoisän merkinnän: mitä kruunajaisissa oikeasti tapahtui ja
   * miksi juuri se päivä oli viimeinen laatuaan. Oppitunti EI koske
   * sähketehtävän vastausta millään tavalla — se on tarkoituksella toinen
   * aihe, jottei tunnussana tule ilmaiseksi.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - sv-Wikipedia "Oscar II av Sverige", osio "Kröningen": kruunajaiset
   *     Storkyrkanissa 12.5.1873; Oscar II jäi Ruotsin viimeiseksi
   *     kruunatuksi kuninkaaksi; sateinen ja muutaman plusasteen sää,
   *     tuhansia ihmisiä koolla; sairastellut kuningatar Sofia tuotiin
   *     vaunuilla, Oscar tuli kävellen kenraalinunivormussaan ja kantoi
   *     viimeisen kerran herttuankruunuaan; kolme vanhinta poikaa kulki
   *     hänen takanaan; hän polvistui alttarilla, vannoi kuninkaanvalan
   *     kolme sormea Raamatulla, ja arkkipiispa Anton Niklas Sundberg
   *     sekä pääministeri Axel Adlercreutz asettivat kruunun hänen
   *     päähänsä; hän istuutui kuningatar Kristiinan hopeavaltaistuimelle
   *     ja otti vastaan valtakunnanregaliat; lopuksi ammuttiin 42
   *     kunnialaukausta Skeppsholmenilta ja 42 Kastellholmenilta; sama
   *     kuningas kruunattiin 18.7.1873 uudelleen Nidarosin tuomiokirkossa
   *     Trondheimissa Norjan kuninkaaksi.
   *   - en-Wikipedia "Oscar II" -artikkelin kruunajais- ja hallitsijatiedot,
   *     jotka toistavat päivämäärän, paikan ja sen, ettei Ruotsissa ole
   *     sen jälkeen kruunattu ketään.
   *
   * IKÄSOPIVUUS (13+): tapahtuma kerrotaan seremoniana eikä juhlapuheena,
   * ja se päättyy siihen, mikä siinä oli oikeasti kiinnostavaa — että
   * kyseessä oli viimeinen kerta.
   */
  oppitunti: {
    otsikko: 'Viimeiset kruunajaiset',
    teksti: 'Se päivä, jona isoisäsi menetti kaksi nappia, oli Ruotsin '
      + 'viimeinen kruunajaispäivä. Oscar II kruunattiin Storkyrkanissa '
      + '12. toukokuuta 1873, ja sen jälkeen yksikään Ruotsin kuningas ei '
      + 'ole enää ottanut kruunua päähänsä. Sää oli sateinen ja muutaman '
      + 'plusasteen, mutta väkeä oli tuhansia. Kuningatar Sofia oli '
      + 'sairaana ja tuotiin kirkkoon vaunuilla; Oscar tuli kävellen '
      + 'kenraalinunivormussaan ja kantoi päässään viimeisen kerran '
      + 'herttuankruunuaan, ja hänen kolme vanhinta poikaansa kulkivat '
      + 'perässä. Kirkossa hän polvistui alttarille ja vannoi kuninkaanvalan '
      + 'kolme sormea Raamatulla. Arkkipiispa Anton Niklas Sundberg ja '
      + 'pääministeri Axel Adlercreutz asettivat kruunun hänen päähänsä, ja '
      + 'sitten hän istuutui kuningatar Kristiinan hopeavaltaistuimelle ja '
      + 'otti vastaan valtakunnan regaliat yksi kerrallaan: valtikan, '
      + 'valtakunnanomenan, valtakunnanavaimen ja miekan. Lopuksi ammuttiin '
      + 'neljäkymmentäkaksi kunnialaukausta Skeppsholmenilta ja '
      + 'neljäkymmentäkaksi Kastellholmenilta — kahdeksankymmentäneljä '
      + 'pamausta yhden kaupungin yllä. Ei ihme, että tungoksessa mahtui '
      + 'katoamaan yksi sivu. Sama mies kruunattiin vielä toisen kerran '
      + 'saman vuoden heinäkuussa Nidarosin tuomiokirkossa Trondheimissa, '
      + 'koska hän oli myös Norjan kuningas.',
    /*
     * Commons 29.8.2026: 2403×1600, public domain, tekijä tuntematon,
     * kuvaus "King Oscar II and Queen Sofia of Sweden and Norway at their
     * Swedish coronation". Restrictions tyhjä. SILMÄTARKISTUS tehty:
     * aikalaispainokuva kruunajaisista, ei tunnistettavia nykyihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se näyttää saman hetken, jonka isoisä näki
     * kadulta — hänen merkintänsä on tungoksesta, tämä on siitä, mitä
     * tungoksen sisällä tapahtui.
     */
    kuva: {
      tiedosto: 'Oscar II of Sweden & Sofia of Sweden coronation 1873.jpg',
      selite: 'Oscar II ja kuningatar Sofia kruunajaisissaan vuonna 1873. '
        + 'Ne jäivät Ruotsin viimeisiksi kruunajaisiksi.',
      lahde: 'Tuntematon tekijä, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Sähketehtävä kohtaamisen sijasta ----------
   * Sisältö on tiedoston alussa (SAHKE_TUKHOLMA). `kohtaaminen`-kenttää
   * EI ole: js/fokusvirta.js piirtää sähkekortin, kun tämä kenttä on
   * olemassa, ja tests/fokusvirta.test.mjs vahtii, ettei kaupungilla ole
   * molempia.
   *
   * TUKHOLMAN VANHA KOHTAAMINEN JÄÄ ENNALLEEN. js/packs/kohtaamiset.js ja
   * tarinakaaren paketti (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
   * 'tukholma') antavat Tukholmalle lyhdynsytyttäjä Astridin, ja se rivi
   * on pelin vanhan polun kohtaaminen (js/visa.js). Sähke ei kosketa sitä
   * — pilotti vaihtaa vain sen, mitä KEVYEN KULUN vihreän pisteen takaa
   * löytyy.
   */
  sahketehtava: SAHKE_TUKHOLMA,

  /*
   * ---------- KEVYT KULKU ----------
   *
   * SÄHKEEN VASTAANOTTOPAIKKA: SKEPPSBRON. Merkintä on satamakaupungista,
   * sähke tulee mereltä, ja Skeppsbron on se laituri, jolla tavara ja
   * tieto ovat aina nousseet Tukholmaan maihin — pelin oma Tukholma-aineisto
   * osoittaa saman paikan (js/packs/kulttuuri-kategoriat.js, Elias Martinin
   * kaiverrus "The steps on Skeppsbro").
   *
   * 59,32361111 N / 18,07527778 E — sv-Wikipedia "Skeppsbron, Stockholm",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((18,07527778 − (−175)) mod 360) × (12000/360)
   *                     = 193,07527778 × 33,3333… = 6435,8
   *                   y = (millerY(76) − millerY(59,32361111)) × 12000/2π
   *                     = 959,2
   *   europe          x = (18,07527778 + 11) × 19,2 = 558,2
   *                   y = (72 − 59,32361111) × 26,3 = 333,4
   *
   * TARKISTUS LAATTAA VASTEN: Tukholman laatta on Euroopan laudalla
   * 558 / 333 ja maailmankartalla 6435,4 / 958,5, eli piste osuu
   * käytännössä laatan päälle. Niin pitääkin — laituri on vanhankaupungin
   * kyljessä. Piirtopuoli hoitaa erotuksen itse: alle 14 yksikön päässä
   * laatasta piste siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Skeppsbronin laituri',
    laudat: {
      maailmankartta: { x: 6435.8, y: 959.2 },
      europe: { x: 558.2, y: 333.4 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Tukholman sivupino (js/lehti.js
   * rakennaSivut) on Lontoon mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Tukholma", 2 = Kadut ja sulut, 3 = Menovinkit.
   *
   * Sivun 1 kysymys on Tukholman kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: POLHEM_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: MARTIN_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Ruotsi) ----------
   *
   * UUSI POOLI, EI SIIRTO. Ruotsi ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen katsomattomaan.
   *
   * MIKSI VASALOPPET: isoisän merkintä on kruunajaisista — päivästä, jona
   * kruunu pantiin päähän. Tämä on saman maan toinen kuninkaantarina
   * päinvastaisesta päästä: pakomatka, jonka varrella ei ollut kruunua
   * eikä tungosta, ja josta tuli sata vuotta myöhemmin urheilukilpailu.
   * Kohde on myös oikea paikka kartalla (Mora, Taalainmaa).
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT: js/packs/maa-kategoriat.js, SWE/historia, nosto "Kuninkaan
       * pakoreitti hiihdetään joka vuosi" (jo hyväksyttyä pelidataa) —
       * Kustaa Eriksson, Taalainmaa, Moran epäröivät miehet, kaksi
       * hiihtäjää perässä, kuninkuus kolme vuotta myöhemmin, vuodesta 1922
       * 90 kilometriä Säleniltä Moraan, lehden ehdotus, 119 hiihtäjää.
       *
       * LISÄTIEDOT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - sv-Wikipedia "Vasaloppet" (johdanto ja osiot "Första året",
       *     "1920- och 1930-talen", "Sent 1900-tal"): kisa hiihdetään
       *     maaliskuun ensimmäisenä sunnuntaina; se on maailman vanhin ja
       *     osanottajamäärältään suurin pitkän matkan hiihtokilpailu; idea
       *     julkaistiin Westmanlands Läns Tidningissä 10.2.1922, Anders
       *     Persin kirjoittamana, ja Dagens Nyheter tuki kisaa tuhannella
       *     kruunulla; ensimmäinen kisa hiihdettiin 19.3.1922, ilmoittautuneita
       *     139, lähtijöitä 119 kello 06.04 ja maaliin pääsi 117; voittaja
       *     oli 22-vuotias Ernst Alm ajalla 7.32.49; ensimmäinen nainen
       *     Margit Nordin hiihti 1923 ajalla 10.09.42, minkä jälkeen naiset
       *     kiellettiin kisasta seuraavana vuonna; kuningas Carl XVI Gustaf
       *     osallistui 1977 nimellä Carl Bernadotte ja sijoittui
       *     5708:nneksi.
       *   - sv-Wikipedia "Vasaloppet 1922" -artikkelin omat luvut
       *     lähtijöistä, maaliin päässeistä ja voittoajasta.
       */
      id: 'vasaloppet',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Vasaloppet',
      otsikko: 'Kuningas pakeni suksilla, ja neljäsataa vuotta myöhemmin '
        + 'satatuhatta ihmistä lähti perään',
      lunastus: [
        'Talvella 1520–1521 nuori Kustaa Eriksson pakeni tanskalaisia '
          + 'Taalainmaalle ja yritti saada talonpojat kapinaan. Moran '
          + 'miehet epäröivät, ja hän jatkoi suksilla kohti Norjaa. Kun '
          + 'tieto Tukholman verilöylystä levisi, kaksi hiihtäjää '
          + 'lähetettiin hänen peräänsä — he saivat hänet kiinni ja '
          + 'käänsivät takaisin. Kolme vuotta myöhemmin hänestä tuli '
          + 'kuningas Kustaa Vaasa.',
        'Neljäsataa vuotta myöhemmin, helmikuussa 1922, moralainen Anders '
          + 'Pers kirjoitti lehteen ehdotuksen: hiihdettäisiin sama matka '
          + 'toisin päin. Dagens Nyheter antoi tuhat kruunua, ja '
          + 'maaliskuun 19. päivänä samana vuonna 119 miestä lähti kello '
          + '06.04 Säleniltä kohti Moraa. Perille pääsi 117. Voittaja oli '
          + '22-vuotias Ernst Alm ajalla seitsemän tuntia 32 minuuttia ja '
          + '49 sekuntia. Seuraavana vuonna Margit Nordin hiihti matkan '
          + 'ensimmäisenä naisena, ja sen jälkeen naiset kiellettiin '
          + 'kisasta — kielto purkautui vasta 1979. Vuonna 1977 mukana '
          + 'hiihti kuningas Carl XVI Gustaf nimellä Carl Bernadotte ja '
          + 'sijoittui viisituhatta seitsemänsataa kahdeksanneksi. '
          + 'Nykyään Vasaloppet on maailman vanhin ja osanottajamäärältään '
          + 'suurin pitkän matkan hiihtokilpailu, 90 kilometriä maaliskuun '
          + 'ensimmäisenä sunnuntaina.',
      ],
      lahde: 'sv-Wikipedia "Vasaloppet", johdanto sekä osiot ensimmäisestä '
        + 'kisasta ja 1900-luvun lopusta; tarkistettu 29.8.2026.',
      /*
       * PÄÄKUVAKSI LOISTOAIKA (29.8.2026, sama malli kuin Sofian
       * areenalla ja v1307/v1312:n nostoilla): repon oma generoitu
       * havainnekuva, jolla ei ole Commons-nimeä eikä varareittiä,
       * joten kenttä on `osoite` eikä `tiedosto` (js/fokusnosto.js
       * asetaNostonKuva).
       *
       * Kuva näyttää kisan varhaisilta vuosilta: joukkolähtö puusuksilla
       * ja arkivaatteissa, lähettäjä lippu kädessä. Loistoaika on se,
       * kun kisasta tuli kansanjuhla — ei nykyinen suurtapahtuma.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-vasaloppet-loistoaika.webp',
        selite: 'Vasaloppetin joukkolähtö kisan varhaisvuosina: puusukset, '
          + 'arkivaatteet ja lähettäjän lippu.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva — pelin omasta
       * aineistosta (sama tiedosto SWE/historia,
       * js/packs/maa-kategoriat.js). Tiedosto, selite ja lähde
       * ennallaan. Commons 29.8.2026: CC BY 3.0, Vasaloppet/Nisse
       * Schmidt. SILMÄTARKISTUS tehty: hiihtäjä ladulla, yksi
       * tunnistettava kilpailija julkisessa urheilutapahtumassa.
       */
      valokuva: {
        tiedosto: 'Jørgen Aukland Vasaloppet 2013 002.jpg',
        selite: 'Vasaloppet hiihdetään maaliskuun ensimmäisenä sunnuntaina '
          + 'Bergasta Moraan, ja 90 kilometrin kisa on maailman vanhin ja '
          + 'osanottajamäärältään suurin hiihtokilpailu.',
        lahde: 'Vasaloppet/Nisse Schmidt, Wikimedia Commons (CC BY 3.0)',
      },
      kysymykset: [
        'Miksi Kustaa Vaasa pakeni Taalainmaalle?',
        'Kuinka moni hiihtää Vasaloppetin nykyään?',
        'Miksi naiset kiellettiin Vasaloppetista vuonna 1924?',
      ],
      /*
       * 61,00972222 N / 14,56361111 E — sv-Wikipedia "Mora",
       * prop=coordinates (haettu 29.8.2026). Sama kaava kuin
       * kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Mora',
        laudat: {
          maailmankartta: { x: 6318.8, y: 875.0 },
          europe: { x: 490.8, y: 289.0 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Kronan-laivan
   * kultakolikot; Kronan upposi 1676 Öölannin edustalla. Merkintä
   * aukeaa, kun aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Kalastaja Öölannin edustalla vannoi, että Kronanin kulta makaa '
      + 'hänen verkkojensa alla, eikä suostunut näyttämään paikkaa edes '
      + 'rahasta. Kirjoitin luetteloon: meri pitää sen minkä ottaa — kunnes '
      + 'joku kysyy oikein.',
  },
};
