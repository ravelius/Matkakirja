/*
 * KEKSINNÖT EUROOPASSA 1769–1928 — ensimmäinen aikajanalinssi.
 *
 * Omistajan tilaus 2.9.2026 ilta: *"Linssin idea on tekniikan
 * innovaatiot. Siinä etenisi aikajana automaattisesti vuosia eteenpäin,
 * ja aina jokaisen vuoden kohdalla, kun on tehty joku merkittävä
 * innovaatio, niin kartalle syttyisi valo siihen kaupunkiin, missä se
 * on tehty, ja samalla näkyisi pieni kuva keksijästä ja lyhyt selite.
 * Pelaaja voisi pysäyttää aikajanan halutessaan ja klikata kuvasta
 * jutun isommaksi nostoksi."*
 *
 * Tämä tiedosto on KAARI JA DATA. Kello, valot, filminauha ja
 * ilmiöpaneeli ovat yhteistä moottoria (js/aikajana.js), joka lukee
 * täältä kentän `aikajana`. Linssi on kerrokseton (kerros: false):
 * se ei piirrä pysyvää karttakerrosta vaan käynnistää ajon, kuten
 * maailmanradio vaihtaa kartan tilan.
 *
 * ── KAARI ─────────────────────────────────────────────────────────
 *
 * Wattin lauhduttimesta (1769) Flemingin penisilliiniin (1928): 25
 * pysäkkiä ja yksi merkkipaalu, isoisän matkavuosi 1873. Kaari on
 * Euroopan kartalla, joten se kertoo REHELLISESTI vain Euroopasta:
 * puhelin (Bell), hehkulamppu (Edison) ja lentokone (Wrightit)
 * syntyivät Atlantin takana, ja loppusanat sanovat sen ääneen.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 * Pysäkillä on kolme kuvakenttää, ja jokaisella on oma tehtävänsä:
 *
 *   `kuva`        keksijän KUVAPUTKEN GENEROIMA studiomuotokuva —
 *                 pelin ensisijainen henkilökuva (kortti ja
 *                 ilmiöpaneelin henkilörivi). Omistajan tilaus
 *                 3.9.2026: yhtenäiset, pelkistetyt mutta
 *                 karaktääriset rintakuvat (toimitettu ja hyväksytty
 *                 mustavalkoisina), sama tausta ja valo kaikissa.
 *                 Kansio `muotokuva/` ämpärissä. Kuvateksti (`selite`)
 *                 on LYHYT LUONNEKUVA henkilöstä eikä saa nimetä
 *                 kuvaputkea; `lahde` on 'Matkakirjan havainnekuva'
 *                 kuten ilmiökuvissa.
 *   `kuvaToinen`  saman pysäkin toinen keksijä samassa muodossa.
 *                 Kolmella pysäkillä on kaksi tekijää (Montgolfier'n
 *                 veljekset, Cooke ja Wheatstone, Lumière'n
 *                 veljekset), ja moottori piirtää heidät vierekkäin
 *                 pienempinä — ei koskaan päällekkäin.
 *   `kuvaAito`    AITO Commons-kuva (PD, tarkistettu 2.9.2026):
 *                 maalaus, kaiverrus tai valokuva henkilöstä. Se ei
 *                 enää näy kortissa vaan odottaa datassa keksijän
 *                 omaa Tiedeliite-sivua; lisenssitiedot pysyvät
 *                 tallessa täällä. Kolme viimeistä puuttunutta (Otto,
 *                 Siemens, Benz) tarkistettiin Commonsista 3.9.2026,
 *                 joten kaikilla 25 pysäkillä on nyt aito kuva.
 *   `ilmio`       keksintöä selittävä generoitu kuva ilmiöpaneelissa.
 *
 * Kaikki 25 pysäkkiä on kytketty sekä generoituun muotokuvaan (28
 * kuvaa, kaksoispysäkit mukaan lukien) että generoituun ilmiökuvaan;
 * merkkipaalu 1873 sai 4.9.2026 isoisän hassuttelevan muotokuvan ja
 * ilmiökuvaksi Kantonin teehuonekuvan (ei Tiedeliitettä).
 *
 * ── HENKILÖJUTTU ──────────────────────────────────────────────────
 *
 * `henkilojuttu` on Tiedeliitteen oma teksti: kaksi kappaletta
 * keksijästä IHMISENÄ, ei keksinnöstä — syntymä ja tausta, luonne ja
 * työtapa, elämän käänteet, ja LOPUKSI SIDOS VUOTEEN 1873 (mitä
 * keksinnölle tai keksijälle oli isoisän matkavuoteen mennessä
 * tapahtunut). Wattin pysäkki on tyylin pilotti (omistajan tilaus
 * 3.9.2026); loput 24 kirjoitettiin samaan muotoon 3.9.2026, faktat
 * `lahde`-kentän Wikipedia-artikkeleista. Kappaleet erotetaan
 * '\n\n':llä, kuten `juttu`-kentässä.
 *
 * Blériot'n kohdassa on kaksi hyväksyttyä ilmiökuvaa: laaja `ilmio`
 * (kone ja Kanaali) ja lähikuva `ilmioLisa` (lentäjän jännitys).
 * Moottori (js/aikajana.js) piirtää toistaiseksi vain `ilmio`-kentän,
 * joten lähikuva odottaa datassa piirtotukea.
 *
 * ── PAIKAT ────────────────────────────────────────────────────────
 *
 * `x`/`y` ovat maailmankartan laudan koordinaatit, laskettu
 * js/fokusmitat.js projisoiLaudalle -kaavalla asteista (`lat`/`lon`
 * jätetty näkyviin tarkistusta varten; tests/aikajana.test.mjs
 * vertaa). Ilmoitettu paikka on se, missä työ tehtiin — Watt
 * Glasgow'ssa, Röntgen Würzburgissa — ei henkilön syntymäkaupunki.
 *
 * Lähde jokaiselle tapahtumalle: englanninkielinen Wikipedia,
 * artikkeli mainittu `lahde`-kentässä (tarkistettu 2.9.2026).
 */

/**
 * Kuvaputken generoitujen kuvien juuri ämpärissä. Ilmiökuvat ovat
 * juuressa ja keksijöiden muotokuvat sen alikansiossa `muotokuva/`
 * (28 hyväksyttyä pystykuvaa, vienti
 * .github/workflows/vie-hyvaksytyt-28-keksijamuotokuvaa-2026-09-03.yml
 * 3.9.2026). Generoitu kuva
 * kulkee `osoite`-kenttänä (valmis osoite, ei Commons-thumb-putkea)
 * kuten historian hetkien kuvat (js/packs/historian-hetket.js
 * HETKI_KUVAJUURI); Commons-kuva kulkee yhä `tiedosto`-kenttänä.
 * Ensimmäiset viisi (Watt, Montgolfier, Jenner, Volta, Jacquard)
 * omistaja hyväksyi 2.9.2026 ja kuvaputki varmensi ne R2:ssa
 * (posti/kuvatoimitus.md 2.9.2026 23:28 UTC). Loput 21 — kaaren
 * kaikki muut pysäkit sekä Blériot'n toinen kuva — omistaja hyväksyi
 * 3.9.2026 ja kuvaputki varmensi ne samaan kansioon
 * (posti/kuvatoimitus.md 3.9.2026). Kuvatekstit ovat
 * kuvaputken lopulliset, ihminen edellä -linjan mukaiset, ja ne on
 * kopioitu kuittauksesta sanasta sanaan.
 */
export const KEKSINTO_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/aikajana/keksinnot';

/** Euroopan alue laudalla — kamera sovitetaan tähän (js/aikajana.js). */
const EUROOPPA = { x: 5560, y: 830, w: 1700, h: 1000 };

export const KEKSINNOT = [
  {
    vuosi: 1769, paikka: 'Glasgow', lat: 55.8642, lon: -4.2518, x: 5691.6, y: 1125.5,
    henkilo: 'James Watt', otsikko: 'Höyrykoneen lauhdutin',
    selite: 'Watt patentoi erillisen lauhduttimen, joka teki höyrykoneesta '
      + 'monta kertaa tehokkaamman. Siitä alkoi teollinen vallankumous.',
    juttu: 'James Watt korjasi Glasgow\'n yliopiston kojeita, kun hänen käsiinsä '
      + 'tuli Newcomenin höyrykoneen pienoismalli. Kone tuhlasi höyryä, koska '
      + 'sylinteri jäähdytettiin joka iskulla. Watt keksi jäähdyttää höyryn '
      + 'erillisessä lauhduttimessa ja pitää sylinterin kuumana — ja patentoi '
      + 'ratkaisun vuonna 1769.'
      + '\n\n'
      + 'Yhdessä tehtailija Matthew Boultonin kanssa Watt rakensi koneita '
      + 'kaivoksiin, myllyihin ja tehtaisiin. Tehon yksikkö watti on nimetty '
      + 'hänen mukaansa, ja hevosvoima on hänen keksimänsä vertailuluku.',
    /*
     * HENKILÖTEKSTI (omistajan tilaus 3.9.2026, Tiedeliitteen pilotti):
     * keksijä ihmisenä, ei keksintö. Faktat en-Wikipedia "James Watt".
     */
    henkilojuttu: 'James Watt (1736–1819) syntyi Greenockissa Skotlannin '
      + 'länsirannikolla laivanrakentajan poikana. Hän oli sairaalloinen '
      + 'lapsi, joka opiskeli kotona ja rakasti matematiikkaa ja työkaluja; '
      + 'Lontoossa hän opetteli kojeenrakentajan ammatin vuodessa, vaikka '
      + 'oppiaika oli tavallisesti seitsemän. Glasgow\'n yliopisto antoi '
      + 'hänelle työpajan, kun ammattikunta ei hyväksynyt häntä jäsenekseen.'
      + '\n\n'
      + 'Watt oli perusteellinen ja usein masentunut: hän pelkäsi '
      + 'epäonnistumista ja jätti työt kesken, kunnes Boultonin '
      + 'liikevaisto ja rohkaisu veivät koneet tehtaisiin. Vanhoilla '
      + 'päivillään hän kokeili kaikkea kopiokoneesta veistoksia '
      + 'jäljentävään koneeseen ja kirjoitti, ettei ollut koskaan tuntenut '
      + 'itseään keksijäksi vaan parantelijaksi. Foggin isoisän matkatessa '
      + 'vuonna 1873 Wattin patentin vanhenemisesta oli kulunut 73 vuotta, '
      + 'ja hänen koneensa jälkeläiset vetivät jo junia ja laivoja koko '
      + 'Euroopassa.',
    /*
     * MUOTOKUVAN KUVATEKSTI (omistaja 3.9.2026 ilta, Tiedeliitteen pilotti:
     * "tässä pitäisi kuvailla hieman hänen persoonaa ja lopussa vain
     * 'matkakirjan havainnekuva'"): selite on lyhyt luonnekuva, lähde
     * sama alleviivattu maininta kuin ilmiökuvissa (avaa havainnekuvan
     * selityksen). Fable kirjoittaa henkilojuttu-tekstin pohjalta.
     */
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1769-james-watt.jpg`,
      selite: 'James Watt oli hiljainen ja perusteellinen mies, joka pelkäsi '
        + 'epäonnistumista ja hioi jokaista yksityiskohtaa vuosikausia. Hän ei '
        + 'pitänyt itseään keksijänä vaan parantelijana.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Watt James von Breda.jpg', selite: 'James Watt, Carl Frederik von Bredan maalaus 1792.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1769-watt.jpg`,
      selite: 'Wattin työpajan käsityöläinen kuuntelee, lakkaako sylinteri '
        + 'vihdoin jäähtymästä jokaisella iskulla — pieni muutos voisi '
        + 'tarkoittaa, ettei hiiltä enää lapioida hukkaan. Erillinen '
        + 'lauhdutin tekee höyrykoneesta paljon taloudellisemman ja antaa '
        + 'Wattin ajatukselle voiman lähteä laboratoriosta kaivoksiin ja '
        + 'tehtaisiin.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "James Watt"',
  },
  {
    vuosi: 1783, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Montgolfier-veljekset', otsikko: 'Kuumailmapallo',
    selite: 'Marraskuussa 1783 ihminen nousi ensimmäistä kertaa ilmaan: '
      + 'Montgolfierin pallo lensi Pariisin yli 25 minuuttia.',
    juttu: 'Paperitehtailijat Joseph ja Étienne Montgolfier huomasivat, että '
      + 'kuuma ilma nostaa kankaisen pussin. Kesäkuussa 1783 he näyttivät '
      + 'miehittämättömän pallon kotikaupungissaan Annonayssa, ja syksyllä '
      + 'koe siirtyi Pariisiin, jossa kuningas seurasi lentoja.'
      + '\n\n'
      + 'Marraskuun 21. päivänä 1783 Pilâtre de Rozier ja markiisi d\'Arlandes '
      + 'nousivat pallolla Pariisin yli — ensimmäinen vapaa miehitetty lento '
      + 'ihmiskunnan historiassa. Matkaa kertyi noin yhdeksän kilometriä.',
    henkilojuttu: 'Joseph-Michel (1740–1810) ja Jacques-Étienne (1745–1799) '
      + 'Montgolfier syntyivät Annonayssa paperitehtailijan perheeseen, '
      + 'jossa oli kuusitoista lasta. Joseph oli järjestyksessä '
      + 'kahdestoista: haaveilija, joka hyppäsi kotitalon katolta itse '
      + 'tekemällään laskuvarjolla ja pärjäsi huonosti liikeasioissa. '
      + 'Étienne, viidestoista lapsi, opiskeli Pariisissa arkkitehdiksi '
      + 'ja kutsuttiin kotiin johtamaan tehdasta, kun vanhin veli kuoli '
      + '1772. Kun kokeet siirtyivät Pariisiin, hovin eteen meni Étienne; '
      + 'Joseph jäi Annonayhin, koska piti itseään liian ujona ja '
      + 'huolittelemattomana.'
      + '\n\n'
      + 'Étienne kuoli 1799 matkalla Lyonista Annonayhin, Joseph 1810 '
      + 'kylpyläkaupungissa Balaruc-les-Bainsissa keksittyään sitä ennen '
      + 'itsetoimivan hydraulisen vesipumpun. Perheen paperitehdas jatkoi '
      + 'toimintaansa nimellä Canson-Montgolfier. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, tehdas valmisti yhä paperia Annonayssa — '
      + 'ja pallosta oli tullut sodan väline: kolme vuotta aiemmin '
      + 'piiritetystä Pariisista oli noussut noin 66 ilmapalloa, jotka '
      + 'veivät postia ja sotaministeri Léon Gambettan saksalaisten '
      + 'linjojen yli.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1783-joseph-montgolfier.jpg`,
      selite: 'Joseph Montgolfier oli haaveilija, joka hyppäsi kotitalon '
        + 'katolta omatekoisella laskuvarjolla mutta ei osannut hoitaa '
        + 'liikeasioita. Ujoutensa vuoksi hän jätti Pariisin näytökset '
        + 'veljelleen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaToinen: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1783-etienne-montgolfier.jpg`,
      selite: 'Étienne Montgolfier oli veljeksistä tyyni ja järjestelmällinen: '
        + 'koulutettu arkkitehti, joka johti perheen paperitehdasta ja '
        + 'hoiti pallokokeiden esittelyt hovissa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Joseph-montgolfier.jpg', selite: 'Joseph Montgolfier, tuntemattoman taiteilijan maalaus 1700-luvulta.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1783-montgolfier.jpg`,
      selite: 'Pilâtre de Rozier ja markiisi d\'Arlandes seisovat avonaisella '
        + 'parvekkeella suoraan paperisen pallon tulen yläpuolella; mukana '
        + 'on märkiä sieniä, jos kipinät sytyttävät kuoren. Kun köydet '
        + 'irtoavat La Muettessa, heidän 25 minuutin lentonsa muuttaa '
        + 'mahdottomalta tuntuneen haaveen kahden ihmisen hyvin todelliseksi '
        + 'riskiksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Montgolfier brothers"',
  },
  {
    vuosi: 1796, paikka: 'Berkeley', lat: 51.69, lon: -2.457, x: 5751.4, y: 1315.9,
    henkilo: 'Edward Jenner', otsikko: 'Rokotus',
    selite: 'Maalaislääkäri Jenner rokotti pojan lehmärokolla ja osoitti, '
      + 'että se suojaa isorokolta. Sana rokotus tulee tästä kokeesta.',
    juttu: 'Gloucestershiressä tiedettiin, että lehmärokon sairastaneet '
      + 'lypsäjät eivät saaneet isorokkoa. Edward Jenner testasi uskomuksen '
      + 'toukokuussa 1796: hän siirsi lehmärokkoa kahdeksanvuotiaan James '
      + 'Phippsin käsivarteen ja altisti pojan myöhemmin isorokolle. Poika '
      + 'pysyi terveenä.'
      + '\n\n'
      + 'Jenner julkaisi tulokset 1798, ja menetelmä levisi muutamassa '
      + 'vuodessa ympäri Eurooppaa. Isorokko julistettiin hävitetyksi koko '
      + 'maailmasta vuonna 1980 — ainoa ihmisen tauti, jolle näin on käynyt.',
    henkilojuttu: 'Edward Jenner (1749–1823) syntyi Berkeleyn kirkkoherran '
      + 'kahdeksantena lapsena. Kouluikäisenä hänet rokotettiin isorokkoa '
      + 'vastaan vanhalla ja vaarallisella variloinnilla, ja se rasitti '
      + 'hänen terveyttään koko elämän ajan. Kolmentoista vanhana hän '
      + 'meni seitsemäksi vuodeksi kirurgin oppiin ja opiskeli sitten '
      + 'Lontoossa John Hunterin johdolla; Hunterilta hän sai ohjeen "älä '
      + 'arvaile, kokeile", josta tuli hänen työtapansa.'
      + '\n\n'
      + 'Jenner palasi maaseudulle kyläläisten lääkäriksi eikä lähtenyt '
      + 'sieltä enää. Hän tutki myös lintuja ja kuvasi ensimmäisenä '
      + 'tarkasti, miten vastakuoriutunut käenpoikanen työntää '
      + 'isäntälinnun munat pesästä. Vaimo Catherine kuoli tuberkuloosiin '
      + '1815, esikoispoika jo 1810. Kun Foggin isoisä matkusti vuonna '
      + '1873, rokotus oli Britanniassa lakisääteinen pakko: vuoden 1871 '
      + 'laki asetti jokaiseen piiriin rokotusvirkailijan ja sakot '
      + 'laiminlyönnistä, ja pakko oli synnyttänyt äänekkään '
      + 'vastustusliikkeen.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1796-edward-jenner.jpg`,
      selite: 'Edward Jenner pysyi koko ikänsä maaseudun lääkärinä ja '
        + 'innokkaana luonnontutkijana. Opettajaltaan hän oli oppinut '
        + 'ohjeen "älä arvaile, kokeile" — ja tunsi lapsena itse vanhan '
        + 'rokotustavan vaarat.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Portrait of Edward Jenner M.D (4672926).jpg', selite: 'Edward Jenner, William Ridleyn kaiverrus 1804.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1796-jenner.jpg`,
      selite: 'Kahdeksanvuotias puutarhurin poika James Phipps tutkii sidottua '
        + 'käsivarttaan tietämättä, että heinäkuussa Jenner altistaa hänet '
        + 'vielä isorokolle kokeen varmistamiseksi. Poika selviää, mutta '
        + 'hetki muistuttaa myös siitä, kuinka kaukana 1700-luvun '
        + 'lääketieteellinen koe on nykyisestä suostumuksesta ja lapsen '
        + 'suojasta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Edward Jenner"',
  },
  {
    vuosi: 1800, paikka: 'Pavia', lat: 45.1847, lon: 9.1582, x: 6138.6, y: 1594.2,
    henkilo: 'Alessandro Volta', otsikko: 'Sähköparisto',
    selite: 'Volta pinosi sinkki- ja kuparilevyjä suolaveteen kastettujen '
      + 'kiekkojen väliin — ja sai ensimmäisen tasaisen sähkövirran.',
    juttu: 'Pavian yliopiston professori Alessandro Volta kiisteli Luigi '
      + 'Galvanin kanssa siitä, tuliko sammakon jalan nykäys eläimestä vai '
      + 'metalleista. Volta osoitti, että kaksi eri metallia ja kostea väliaine '
      + 'riittävät: hän rakensi pinon sinkki- ja kuparilevyistä ja ilmoitti '
      + 'keksinnöstään Lontoon Royal Societylle maaliskuussa 1800.'
      + '\n\n'
      + 'Voltan patsas oli ensimmäinen sähkölähde, joka antoi jatkuvaa '
      + 'virtaa. Sen avulla veden hajotettiin vedyksi ja hapeksi samana '
      + 'vuonna, ja jännitteen yksikkö voltti nimettiin keksijän mukaan.',
    henkilojuttu: 'Alessandro Volta (1745–1827) syntyi Comossa aatelisperheeseen, '
      + 'joka odotti hänestä pappia. Hän valitsi luonnontieteet: 1774 '
      + 'hänestä tuli fysiikan opettaja Comon kouluun ja 1779 Pavian '
      + 'yliopiston kokeellisen fysiikan professori, virka jota hän '
      + 'hoiti lähes neljäkymmentä vuotta. Luennot olivat niin täynnä, että '
      + 'keisari Joosef II rakennutti niitä varten oman salin. Volta '
      + 'eristi myös metaanin, jonka hän löysi Maggiorejärven soilta.'
      + '\n\n'
      + 'Volta oli kiistoissa itsepäinen mutta yksityiselämässään '
      + 'kotiinsa vetäytyvä: hän meni naimisiin 49-vuotiaana, sai kolme '
      + 'poikaa ja siirtyi vanhoilla päivillään Camnagon tilalleen pois '
      + 'julkisuudesta. Napoleon teki hänestä kreivin 1810. Kun Foggin '
      + 'isoisä matkusti vuonna 1873, Voltan pinon jälkeläiset eli '
      + 'kemialliset paristot antoivat virran Euroopan lennätinasemille — '
      + 'mutta niiden yksinvalta oli päättymässä, sillä Zénobe Gramme oli '
      + 'esitellyt Pariisin tiedeakatemialle 1871 dynamon, joka tekee '
      + 'sähköä koneellisesti.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1800-alessandro-volta.jpg`,
      selite: 'Alessandro Volta oli kiistakumppanina itsepäinen ja '
        + 'luennoitsijana niin suosittu, että hänelle rakennettiin oma '
        + 'sali. Yksityiselämässään hän vetäytyi kotiinsa ja meni naimisiin '
        + 'vasta 49-vuotiaana.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Alessandro Volta. Gaetano Bonatti inc.jpg', selite: 'Alessandro Volta, Gaetano Bonattin kaiverrus 1837.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1800-volta.jpg`,
      selite: 'Pavian laboratoriossa avustaja säpsähtää, kun metallikiekkojen '
        + 'pino antaa tasaisen sähköärsykkeen eikä vain yhtä staattista '
        + 'kipinää. Volta käyttää omaa kehoaan mittalaitteena ja avaa tien '
        + 'kokeille, joissa sähköä voidaan ensimmäistä kertaa tuottaa yhä '
        + 'uudelleen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Alessandro Volta"',
  },
  {
    vuosi: 1804, paikka: 'Lyon', lat: 45.764, lon: 4.8357, x: 5994.5, y: 1570.2,
    henkilo: 'Joseph Marie Jacquard', otsikko: 'Reikäkorttikangaspuut',
    selite: 'Jacquardin kangaspuut kutoivat kuvion reikäkorteista. Sama idea '
      + 'ohjasi sata vuotta myöhemmin ensimmäisiä tietokoneita.',
    juttu: 'Lyonin silkkikutojat tarvitsivat jokaiseen kuvioon apulaisen, joka '
      + 'nosti loimilankoja käsin. Joseph Marie Jacquard rakensi laitteen, '
      + 'jossa reikäkorttien ketju kertoo puille lanka kerrallaan, mitä '
      + 'nostetaan. Koneen valmis muoto oli käytössä vuodesta 1804.'
      + '\n\n'
      + 'Kutojat pelkäsivät työnsä puolesta ja rikkoivat koneita, mutta '
      + 'kymmenessä vuodessa Lyonissa oli tuhansia Jacquardin puita. Charles '
      + 'Babbage lainasi reikäkortit laskukoneeseensa, ja niistä tuli '
      + 'tietojenkäsittelyn ensimmäinen ohjelmointitapa.',
    henkilojuttu: 'Joseph Marie Charles, lisänimeltään Jacquard (1752–1834), syntyi '
      + 'Lyonissa silkkikutojan perheeseen. Yhdeksästä sisaruksesta vain '
      + 'hän ja sisar Clémence elivät aikuisiksi. Koulua hän ei käynyt ja '
      + 'oli lukutaidoton kolmetoistavuotiaaksi; lukemaan hänet opetti '
      + 'lanko, joka piti kirjapainoa ja kirjakauppaa. Isän kangaspuut '
      + 'olivat pojalle liian raskaat, joten hänestä tehtiin ensin '
      + 'kirjansitojan ja sitten kirjasinvalajan oppipoika.'
      + '\n\n'
      + 'Perimänsä talon, kangaspuut ja viinitarhan Jacquard menetti '
      + 'velkoihin ja joutui käyttämään myös vaimonsa myötäjäiset. Vasta '
      + 'lähes viisikymppisenä hän alkoi keksiä koneita. Lyonin kutojat '
      + 'vastustivat konetta rajusti, ja kaupunki nousi kutojakapinaan '
      + 'vielä 1831 ja 1834, Jacquardin kuolinvuonna. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, Lyon oli yhä Euroopan silkkikaupunki ja '
      + 'reikäkorttiketju sen arkinen työkalu; keksijälle oli pystytetty '
      + 'patsas kotikaupunkiin jo 1840.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1804-joseph-marie-jacquard.jpg`,
      selite: 'Joseph Marie Jacquard oli lukutaidoton 13-vuotiaaksi ja '
        + 'epäonnistui sekä kauppiaana että perintönsä hoitajana. Vasta '
        + 'lähes viisikymppisenä hän löysi taitonsa: koneiden rakentamisen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Joseph Marie Jacquard.jpg', selite: 'Joseph Marie Jacquard, kaiverrus 1800-luvulta.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1804-jacquard.jpg`,
      selite: 'Lyonin nuori apulainen lukee rei\'itettyä korttia kuin käskyä: '
        + 'yksi aukko voi nostaa juuri ne loimilangat, joista kukka syntyy. '
        + 'Korttiketju vapauttaa kuvion piirtäjän käsistä, mutta työpajan '
        + 'väki ymmärtää samalla, että kone voi tehdä osan heidän taidostaan '
        + 'ilman heitä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Jacquard machine" ja "Joseph Marie Jacquard"',
  },
  {
    vuosi: 1825, paikka: 'Darlington', lat: 54.5236, lon: -1.559, x: 5781.4, y: 1187.8,
    henkilo: 'George Stephenson', otsikko: 'Rautatie',
    selite: 'Stocktonin ja Darlingtonin rata avattiin syyskuussa 1825. '
      + 'Stephensonin Locomotion veti ensimmäisen julkisen höyryjunan.',
    juttu: 'Kaivosmekaanikko George Stephenson oli rakentanut vetureita '
      + 'hiilikaivoksille jo vuosia, kun Stocktonin ja Darlingtonin rata '
      + 'tilasi häneltä koneen. Syyskuun 27. päivänä 1825 Locomotion No. 1 '
      + 'veti vaunuja ja satoja matkustajia radan päästä päähän.'
      + '\n\n'
      + 'Neljä vuotta myöhemmin Stephensonin Rocket voitti Rainhillin '
      + 'veturikilpailun, ja Liverpoolin ja Manchesterin välinen rata aloitti '
      + 'aikataulun mukaisen matkustajaliikenteen. Stephensonin raideleveys, '
      + '1 435 millimetriä, on yhä maailman yleisin.',
    henkilojuttu: 'George Stephenson (1781–1848) syntyi Wylamissa kaivoksen '
      + 'lämmittäjän poikana. Kumpikaan vanhemmista ei osannut lukea eikä '
      + 'koulunkäyntiin ollut varaa: Stephenson oli lukutaidoton '
      + 'kahdeksaantoista ikävuoteensa asti ja maksoi itse iltakoulusta, '
      + 'jossa opetteli lukemaan, kirjoittamaan ja laskemaan. Vaimo '
      + 'Frances kuoli tuberkuloosiin 1806 ja tytär jo vauvana, ja isä '
      + 'sokeutui kaivosonnettomuudessa. Lisätienestit Stephenson hankki '
      + 'korjaamalla kelloja ja tekemällä kenkiä.'
      + '\n\n'
      + 'Hän puhui leveää northumberlandilaista murretta, jota Lontoossa '
      + 'pidettiin sivistymättömänä, ja lähetti poikansa Robertin '
      + 'yksityiskouluun oppimaan hienoa puhetapaa. Kun Stephenson '
      + 'kehitti kaivoslampun samaan aikaan kuin Humphry Davy, häntä '
      + 'syytettiin idean varastamisesta — ja hän kantoi loppuikänsä '
      + 'epäluuloa teoreettisia oppineita kohtaan. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, Stephenson oli ollut kuolleena 25 vuotta, '
      + 'Newcastleen oli pystytetty muistomerkki 1862 ja hänen '
      + 'valitsemansa raideleveys oli tulossa maailman standardiksi.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1825-george-stephenson.jpg`,
      selite: 'George Stephenson oli lukutaidoton 18-vuotiaaksi ja maksoi itse '
        + 'iltakoulunsa. Hän ei koskaan päässyt eroon epäluulostaan Lontoon '
        + 'oppineita kohtaan, jotka pitivät häntä sivistymättömänä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'George Stephenson.jpg', selite: 'George Stephenson, John Lucasin maalaus.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1825-stephenson.jpg`,
      selite: 'Avovaunuun ahtautunut kaivosmies puristaa laitaa, kun '
        + 'Locomotion No. 1 alkaa vetää väkijoukkoa nopeammin kuin '
        + 'tuttu hevonen. Stockton–Darlingtonin avajaisjunan '
        + 'matkustajille rautatien uusi aika tuntuu ensin savuna '
        + 'silmissä, metallin iskuina ja kysymyksenä siitä, kestääkö '
        + 'kone koko matkan.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Stockton and Darlington Railway" ja "George Stephenson"',
  },
  {
    vuosi: 1837, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'Cooke ja Wheatstone', otsikko: 'Sähkölennätin',
    selite: 'William Cooke ja Charles Wheatstone patentoivat lennättimen ja '
      + 'kokeilivat sitä Lontoon rautatiellä. Viesti kulki hetkessä.',
    juttu: 'Charles Wheatstone tutki sähköä King\'s Collegessa, kun '
      + 'liikemies William Cooke ehdotti yhteistyötä. Kesällä 1837 he '
      + 'patentoivat lennättimen, jossa neulat osoittivat kirjaimia '
      + 'taululla, ja kokeilivat sitä Eustonin ja Camden Townin välillä.'
      + '\n\n'
      + 'Rautatiet ottivat laitteen käyttöön junien ohjaamiseen. Vuonna 1845 '
      + 'lennätin auttoi pidättämään murhaajan, joka oli paennut junalla — ja '
      + 'siitä alkoi laitteen maine. Isoisän matkan aikaan 1873 lennätinkaapelit '
      + 'ylittivät jo Atlantin.',
    henkilojuttu: 'William Fothergill Cooke (1806–1879) oli kirurgin poika, joka '
      + 'palveli viisi vuotta Intian armeijassa ja opiskeli sen jälkeen '
      + 'lääketiedettä Pariisissa ja Heidelbergissä. Siellä hän näki 1836 '
      + 'luennolla lennätinlaitteen, hylkäsi lääkärinuran ja päätti myydä '
      + 'keksinnön rautateille. Charles Wheatstone (1802–1875) taas oli '
      + 'soitinkauppiaan poika, arka ja hiljainen: hän osti '
      + 'taskurahoillaan ranskankielisen kirjan Voltan kokeista, säästi '
      + 'vielä sanakirjaan ja rakensi pariston isänsä talon '
      + 'takakeittiössä pennyistä.'
      + '\n\n'
      + 'Yhteistyö kesti, riita kesti kauemmin: patenttien omistuksesta '
      + 'sovittiin välimiesmenettelyllä 1843, eivätkä miehet koskaan '
      + 'päässeet yksimielisyyteen siitä, kumman keksintö lennätin oli. '
      + 'Wheatstone kammosi esiintymistä niin, että hänen ensimmäinen '
      + 'luentosarjansa King\'s Collegessa epäonnistui täysin. Kun Foggin '
      + 'isoisä matkusti vuonna 1873, molemmat elivät ja olivat '
      + 'ritareita: Wheatstone valittiin sinä vuonna Ranskan '
      + 'tiedeakatemian ulkojäseneksi ja sai Ampère-mitalin, ja Cookelle '
      + 'oli myönnetty 1871 valtion eläke, sillä hänen rahansa olivat '
      + 'menneet.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1837-william-fothergill-cooke.jpg`,
      selite: 'William Fothergill Cooke oli entinen upseeri ja lääketieteen '
        + 'opiskelija, joka näki lennättimen luennolla ja vaihtoi alaa '
        + 'saman tien. Hän hoiti parivaljakon liikeasiat ja kiisti loppuun '
        + 'asti toverinsa osuudesta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaToinen: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1837-charles-wheatstone.jpg`,
      selite: 'Charles Wheatstone oli lapsena niin ujo, että pakeni ullakolle '
        + 'omien ajatustensa seuraan. Yleisön edessä hän mumisi seinälle '
        + 'päin, mutta laboratoriossa hän oli kotonaan.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Wheatstone Charles drawing 1868.jpg', selite: 'Charles Wheatstone, Samuel Laurencen piirros 1868.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1837-wheatstone.jpg`,
      selite: 'Eustonin nuori virkailija ei kuule Camden Townista '
        + 'ääntäkään: kaksi neulaa vain kääntyy ja osoittaa kirjaimen. '
        + 'Vuoden 1837 kokeessa sähköinen viesti ehtii perille ennen '
        + 'radan junaa, mutta ensimmäiselle käyttäjälle ihme on '
        + 'henkilökohtainen — joku näkymättömissä vastasi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Cooke and Wheatstone telegraph", "William Fothergill Cooke" ja "Charles Wheatstone"',
  },
  {
    vuosi: 1839, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Louis Daguerre', otsikko: 'Valokuva',
    selite: 'Ranskan tiedeakatemia julkisti dagerrotypian elokuussa 1839 '
      + 'ja antoi sen koko maailmalle lahjaksi. Valokuvaus oli syntynyt.',
    juttu: 'Teatterimaalari Louis Daguerre jatkoi Nicéphore Niépcen '
      + 'kokeita ja löysi tavan kiinnittää kuva hopeoidulle kuparilevylle '
      + 'jodihöyryn ja elohopean avulla. Kuva oli tarkka kuin peili, mutta '
      + 'jokainen levy oli ainoa kappale.'
      + '\n\n'
      + 'Ranskan valtio osti keksinnön ja julkisti sen 19. elokuuta 1839 '
      + 'vapaasti kaikkien käyttöön. Muutamassa kuukaudessa Pariisissa '
      + 'myytiin kameroita ja levyjä, ja ensimmäiset muotokuvaamot avattiin '
      + 'seuraavana vuonna.',
    henkilojuttu: 'Louis Daguerre (1787–1851) oli koulutukseltaan teatteri- ja '
      + 'panoraamamaalari. Hän avasi Pariisiin 1822 dioraaman: valtavan '
      + 'läpikuultavan kankaan, jota valaistiin vuoroin edestä ja takaa '
      + 'niin että maisema muuttui katsojan silmissä. Sali pyöri, kankaat '
      + 'pysyivät paikoillaan, ja näytökset tuottivat parhaimmillaan 200 '
      + '000 frangia vuodessa. Valokuvaan Daguerre päätyi kumppaninsa '
      + 'Nicéphore Niépcen kautta ja jatkoi yksin, kun Niépce kuoli 1833.'
      + '\n\n'
      + 'Illuusioiden ammattilainen puhui myös keksinnöstään näyttämön '
      + 'sanoin: "Olen siepannut valon — olen pysäyttänyt sen lennon." '
      + 'Maaliskuussa 1839 dioraamateatteri paloi, ja Daguerre kehotti '
      + 'palomiehiä pelastamaan viidennen kerroksen, jossa olivat hänen '
      + 'levynsä ja muistiinpanonsa. Kun Foggin isoisä matkusti vuonna '
      + '1873, dagerrotypia oli jo mennyttä aikaa: märkälevymenetelmä oli '
      + 'syrjäyttänyt sen 1850-luvulla, ja jo 1860 harva valokuvaaja '
      + 'käytti enää Daguerren hopealevyjä.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1839-louis-daguerre.jpg`,
      selite: 'Louis Daguerre oli ammatiltaan teatterimaalari ja illuusioiden '
        + 'mestari, joka rakensi Pariisiin muuttuvien maisemien dioraaman. '
        + 'Keksinnöstäänkin hän puhui kuin näyttämöltä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Louis Daguerre 2.jpg', selite: 'Louis Daguerre dagerrotypiassa 1844.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1839-daguerre.jpg`,
      selite: 'Hopeoitu kuparilevy on peili, josta ateljeeapulainen etsii '
        + 'pienintäkin virhettä tietäen, ettei valotusta voi kopioida. '
        + 'Vuonna 1839 dagerrotypia tekee jokaisesta kuvasta '
        + 'ainutkertaisen esineen, vaikka elohopeahöyryjen vaarasta '
        + 'kuvia valmistavat ihmiset tietävät vielä liian vähän.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Louis Daguerre"',
  },
  {
    vuosi: 1856, paikka: 'Sheffield', lat: 53.3811, lon: -1.4701, x: 5784.3, y: 1240.0,
    henkilo: 'Henry Bessemer', otsikko: 'Halpa teräs',
    selite: 'Bessemer puhalsi ilmaa sulan raudan läpi ja sai terästä '
      + 'minuuteissa. Rautatiet, sillat ja laivat rakennettiin sen varaan.',
    juttu: 'Terästä oli osattu tehdä vuosisatoja, mutta pieniä määriä ja '
      + 'kalliisti. Henry Bessemer esitteli vuonna 1856 menetelmän, jossa '
      + 'ilmaa puhalletaan sulan raudan läpi: hiili palaa pois, ja sula '
      + 'kuumenee itsestään. Yksi panos valmistui noin kahdessakymmenessä '
      + 'minuutissa.'
      + '\n\n'
      + 'Bessemer perusti oman terästehtaan Sheffieldiin, josta tuli '
      + 'maailman teräskaupunki. Halpa teräs teki mahdolliseksi kiskot, '
      + 'pilvenpiirtäjät ja Eiffel-tornin kaltaiset rakenteet.',
    henkilojuttu: 'Henry Bessemer (1813–1898) syntyi Hertfordshiressä keksijän '
      + 'poikana; isä oli joutunut pakenemaan Pariisista Ranskan '
      + 'vallankumouksen aikana. Ensimmäisen omaisuutensa poika teki '
      + 'pronssijauheella: hän purki Nürnbergissä käsin tehdyn kalliin '
      + 'tuotteen osiin, rakensi kuusi höyrykonetta sen valmistamiseen ja '
      + 'pudotti hinnan murto-osaan entisestä. Salaisuutta varjeltiin '
      + 'niin, että tehtaaseen pääsivät vain perheenjäsenet.'
      + '\n\n'
      + 'Bessemer patentoi elämänsä aikana ainakin 129 keksintöä ja — '
      + 'toisin kuin useimmat keksijät — rikastui itse omillaan. Kun '
      + 'teräksentekijät kieltäytyivät ostamasta lisenssiä, hän perusti '
      + 'Sheffieldiin oman tehtaan ja alkoi alihinnoitella heidät. '
      + 'Robert Mushet, jonka keksintö korjasi menetelmän viimeisen '
      + 'virheen, jäi puille paljaille; eläkettä Bessemer alkoi maksaa '
      + 'vasta kun Mushetin 16-vuotias tytär tuli yksin Lontooseen '
      + 'vaatimaan sitä. Kun Foggin isoisä matkusti vuonna 1873, Bessemer '
      + 'oli Iron and Steel Instituten puheenjohtaja, virassa 1871–1873.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1856-henry-bessemer.jpg`,
      selite: 'Henry Bessemer oli sarjakeksijä ja kylmä liikemies, joka toisin '
        + 'kuin useimmat keksijät rikastui omilla patenteillaan. '
        + 'Kieltäytyville teollisuusmiehille hän vastasi hinnalla.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Henry Bessemer.jpg', selite: 'Henry Bessemer.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1856-bessemer.jpg`,
      selite: 'Sheffieldin terästyöläinen kääntää kasvonsa, mutta ei voi '
        + 'irrottaa kättään vivusta, kun konvertterin valkea virta '
        + 'täyttää kauhan. Bessemerin prosessi lupaa halvempaa terästä; '
        + 'miehelle muutos tuntuu ensin kuumuutena, meluna ja uutena '
        + 'työnä, jossa yksi virhe voi tappaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Bessemer process" ja "Henry Bessemer"',
  },
  {
    vuosi: 1867, paikka: 'Tukholma', lat: 59.3293, lon: 18.0686, x: 6435.6, y: 958.9,
    henkilo: 'Alfred Nobel', otsikko: 'Dynamiitti',
    selite: 'Nobel imeytti räjähdysherkän nitroglyseriinin piimaahan ja '
      + 'sai turvallisesti käsiteltävän räjähteen. Tunnelit ja kanavat avautuivat.',
    juttu: 'Nitroglyseriini räjähti pienestäkin tärähdyksestä, ja Nobelin '
      + 'oma tehdas Tukholman Helenborgissa lensi ilmaan 1864 — hänen '
      + 'veljensä kuoli onnettomuudessa. Nobel etsi tapaa kesyttää aine ja '
      + 'löysi sen: piimaahan imeytettynä nitroglyseriiniä voi muotoilla '
      + 'ja kuljettaa. Patentti myönnettiin 1867.'
      + '\n\n'
      + 'Dynamiitti teki Nobelista yhden Euroopan rikkaimmista miehistä. '
      + 'Testamentissaan hän määräsi omaisuutensa palkintoihin, joita on '
      + 'jaettu Tukholmassa vuodesta 1901.',
    henkilojuttu: 'Alfred Nobel (1833–1896) kasvoi Tukholmassa ja Pietarissa '
      + 'insinööri-isän perheessä, joka ehti sekä rikastua että mennä '
      + 'konkurssiin. Koulua hän kävi yhteensä puolitoista vuotta, mutta '
      + 'oppi kotiopettajilta kuusi kieltä ja kirjoitti runoja '
      + 'englanniksi. Nitroglyseriini vei häneltä nuoremman veljen '
      + 'Emilin: Heleneborgin vaja räjähti 1864 ja tappoi viisi ihmistä, '
      + 'minkä jälkeen Nobel menetti luvan valmistaa räjähteitä '
      + 'Tukholmassa.'
      + '\n\n'
      + 'Nobel oli yksinäinen, masennukseen taipuvainen ja jatkuvasti '
      + 'kivuilta kärsivä mies. Hän ei mennyt naimisiin, ja tehtaitaan '
      + 'hän johti kirjeitse ympäri Eurooppaa. Kun Foggin isoisä matkusti '
      + 'vuonna 1873, Nobel muutti Hampurin liepeiltä Krümmelistä '
      + 'Pariisiin Avenue de Malakoffin varrelle ja asui siellä vuoteen '
      + '1891. Dynamiitti oli silloin kuuden vuoden ikäinen; palkinnoista '
      + 'hän määräsi vasta testamentissaan 1895.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1867-alfred-nobel.jpg`,
      selite: 'Alfred Nobel oli yksinäinen ja masennukseen taipuvainen mies, '
        + 'joka kirjoitti runoja englanniksi ja johti tehtaitaan kirjeitse. '
        + 'Nuoremman veljensä hän menetti räjähdyksessä 1864.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'AlfredNobel adjusted.jpg', selite: 'Alfred Nobel, Gösta Flormanin valokuva.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1867-nobel.jpg`,
      selite: 'Vintervikenin työntekijä katsoo paperipatruunoita '
        + 'muistamatta unohtaa Heleneborgin räjähdyksessä kuolleita — '
        + 'yksi heistä oli Alfred Nobelin veli Emil. Kiselguuri tekee '
        + 'nitroglyseriinistä käsiteltävämpää, mutta vuoden 1867 '
        + 'turvallisempi räjähde ei tee työpäivästä vaaratonta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Alfred Nobel"',
  },
  {
    vuosi: 1869, paikka: 'Pietari', lat: 59.9343, lon: 30.3351, x: 6844.5, y: 929.0,
    henkilo: 'Dmitri Mendelejev', otsikko: 'Jaksollinen järjestelmä',
    selite: 'Mendelejev järjesti alkuaineet taulukoksi ja jätti aukot '
      + 'aineille, joita ei vielä tuntenut. Ne löydettiin hänen ennustamiltaan paikoilta.',
    juttu: 'Pietarin yliopiston professori Dmitri Mendelejev kirjoitti '
      + 'kemian oppikirjaa ja etsi alkuaineille järjestystä. Hän kirjoitti '
      + 'jokaisen aineen kortille ja latoi kortteja atomipainon mukaan, '
      + 'kunnes samankaltaiset aineet osuivat allekkain. Taulukko '
      + 'julkaistiin maaliskuussa 1869.'
      + '\n\n'
      + 'Rohkeinta oli jättää aukkoja: Mendelejev ennusti tuntemattomien '
      + 'aineiden ominaisuudet. Gallium (1875), skandium (1879) ja germanium '
      + '(1886) löytyivät ennusteiden mukaisina, ja taulukko on yhä kemian '
      + 'seinällä jokaisessa koulussa.',
    henkilojuttu: 'Dmitri Mendelejev (1834–1907) syntyi Siperiassa Tobolskin '
      + 'lähellä perheen nuorimpana; sisaruksia oli seitsemäntoista. Isä '
      + 'sokeutui ja menetti opettajanpaikkansa, ja äiti käynnisti suvun '
      + 'lasitehtaan uudelleen elättääkseen perheen. Kun isä oli kuollut '
      + 'ja tehdas palanut, äiti vei pojan halki Venäjän ensin Moskovaan '
      + 'ja sitten Pietariin, jotta tämä pääsisi opiskelemaan. '
      + 'Valmistuttuaan Mendelejev sairastui tuberkuloosiin ja toipui '
      + 'vasta Krimillä.'
      + '\n\n'
      + 'Mendelejev oli äkkipikainen ja riitaisa. Hän uhkasi itsemurhalla '
      + 'saadakseen toisen vaimonsa suostumaan, ja avioerosta noussut '
      + 'kohu maksoi hänelle paikan Venäjän tiedeakatemiassa. Kemian '
      + 'ohella hän tutki öljyä, mittayksiköitä ja Jäämerta. Kun Foggin '
      + 'isoisä matkusti vuonna 1873, jaksollinen järjestelmä oli neljän '
      + 'vuoden ikäinen ja yhä pelkkä väite: ensimmäinen Mendelejevin '
      + 'ennustama alkuaine, gallium, löytyi vasta 1875 ja skandium ja '
      + 'germanium sen jälkeen.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1869-dmitri-mendeleev.jpg`,
      selite: 'Dmitri Mendelejev oli äkkipikainen ja riitaisa mies, joka ajoi '
        + 'asiansa läpi hinnalla millä hyvänsä. Siperialaisen lapsuutensa '
        + 'jälkeen hänet vietiin opiskelemaan tuhansien kilometrien päähän.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'DIMendeleevCab.jpg', selite: 'Dmitri Mendelejev työhuoneessaan 1897.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1869-mendelejev.jpg`,
      selite: 'Taulukkoon jäävä tyhjä kohta vaivaa Mendelejeviä enemmän '
        + 'kuin väärä vastaus: jos järjestys on oikea, tuntemattoman '
        + 'alkuaineen pitäisi vielä ilmestyä siihen. Vuonna 1869 hän '
        + 'uskaltaa julkaista aukot ja ennustaa niiden aineiden '
        + 'ominaisuuksia — gallium, skandium ja germanium löydetään '
        + 'myöhemmin hämmästyttävän läheltä hänen arvioitaan.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Dmitri Mendeleev"',
  },
  {
    vuosi: 1873, paalu: true, paikka: 'Lontoo', x: 5829.1, y: 1324.0,
    henkilo: 'Isoisä lähtee matkaan', otsikko: 'Matkakirjan vuosi',
    selite: 'Isoisä kirjoitti päiväkirjaansa maailmassa, jossa oli jo '
      + 'rautatie, lennätin ja valokuva — mutta ei vielä puhelinta, autoa eikä sähkövaloa.',
    /*
     * KARUSELLIKORTIN MUOTOKUVA: kuvaputken hassutteleva studiomuotokuva
     * (omistaja hyväksyi 4.9.2026, R2 10:52 UTC). Kuvateksti on
     * kuvaputken kuittauksesta (4.9. 07:35 UTC) sanasta sanaan. Paalu
     * ei ole henkilöjuttu, joten Tiedeliite ei avaudu; kortti ja
     * karuselli näyttävät kuvan samalla kehyksellä kuin keksijöillä.
     * Luennan tiedostonimi EI seuraa mukana: merkkipaalun runko
     * ladotaan aina vuodesta ja otsikosta (js/linssipuhe.js
     * luennanRunko), joten valmis 1873-matkakirjan-vuosi.mp3 pysyy
     * paikallaan vaikka paalu sai kasvot.
     */
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1873-isoisa.jpg`,
      selite: 'Isoisä kallistaa hattunsa vinoon ja puristaa matkakirjaa '
        + 'rintaansa — seikkailu näyttää olevan hänelle vakava asia vain '
        + 'hetken kerrallaan.',
      lahde: 'Kuvaputken generoitu valokuva',
    },
    /*
     * HAVAINNEKUVA KARTAN PÄÄLLE TEKSTILAATIKON TILALLE (omistaja
     * 4.9.2026 iltapäivä: "sen tilalle voisi laittaa kuvan isoisästä,
     * kun hän istuu jonkun paikallisen kanssa pöydässä. Tällainen kuva on
     * jo generoitu"): isoisän Kantonin teehuonekuva (js/isoisan-
     * valokuvat.js). Kuva asuu oman kansionsa ulkopuolella eikä sillä
     * ole pieni/-variantteja, joten `ulkoinen: true` ohittaa pieni-putken
     * (js/aikajana.js asetaAmpariKuva, tools/tee-pienet-kuvat.mjs) ja
     * `rajaus` leikkaa cabinet cardin valkoisen reunuksen pois.
     */
    ilmio: {
      osoite: 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/isoisa/isoisa-kanton-1873-kulunut-v1.jpg',
      rajaus: { x0: 0.054, y0: 0.032, x1: 0.943, y1: 0.956 },
      ulkoinen: true,
      selite: 'Isoisä teehuoneen pöydässä Kantonissa 1873. Kulunut cabinet card '
        + 'isoisän matkalaukusta.',
      lahde: 'Kuvaputken generoitu valokuva',
    },
    /*
     * KUVAKIERTO (omistaja 4.9.2026 iltapäivä: *"ne itseasiassa voisivat
     * hitaasti vaihtua keskenään ja siihen voisi generoida kolme muuta
     * kuvaa lisäksi"*): havainnekuvapaneeli vaihtaa merkkipaalulla
     * hitaasti ilmion ja tämän sarjan kuvien välillä (js/aikajana.js
     * aloitaKuvakierto). Charing Crossin junakuva siirtyi tänne
     * välinäytöksen kortista, joka poistui. Kolme uutta kuvaa (höyry-
     * laiva, lennätin, rautatie) on tilattu kuvaputkelta 4.9. 14:55 UTC
     * ilman pohjuketta, ja Kantonin kuva vaihtuu pohjukkeettomaan
     * versioon, kun se on R2:ssa.
     */
    ilmioSarja: [
      {
        osoite: 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/isoisa/isoisa-lahto-1873-kulunut-v1.jpg',
        ulkoinen: true,
        // Kuvaputken kuvateksti sanasta sanaan (toimitus 4.9.2026 08:48 UTC).
        selite: 'Isoisä nousee Charing Crossilla maailmanympärimatkansa ensimmäiseen '
          + 'junaan ja vilkuttaa vielä kameralle, ennen kuin tuttu laituri jää '
          + 'höyryn taakse.',
        lahde: 'Kuvaputken generoitu valokuva',
      },
    ],
    /*
     * VÄLINÄYTÖS (omistajan tilaus 4.9.2026 aamu, sanatarkasti:
     * *"Kertoja voisi myös kertoa vähän pidemmin isoisän kohdalla mihin
     * pulu sitten vain kommentoisi. Aika voisi pysähtyä siinä kohtaa
     * automaattisesti. Kertoja voisi isoisän kohdalla myös summata jo
     * nähtyä ja suunnata myös tulevaan. Nämä voisivat tulla kartan
     * keskelle myös tekstimuodossa yhdessä isoisän jonkun kuvan
     * kanssa. … Animaatio jatkuisi vasta popup tekstin alla olevasta
     * napista. Näin pitkään animaatioon tulee pieni hengähdys tauko."*).
     *
     * Kello pysähtyy tähän itsestään, kertojan teksti ladotaan rivi
     * kerrallaan suoraan kartan päälle luennan tahdissa ja ajo jatkuu
     * yläpalkin hehkuvasta Jatka-napista (js/aikajana.js
     * avaaValinaytos; kortti poistui 4.9.2026 iltapäivällä). Luvut ovat kaaren omat: 1873 mennessä on
     * syttynyt 11 valoa (1769–1869) ja edessä on 14 (1876–1928).
     */
    valinaytos: {
      // Ilman vuosilukua (omistaja 4.9.2026: "tulee muuten toistoa" — ensimmäinen rivi on "Vuosi 1873.").
      otsikko: 'Isoisä lähtee matkaan.',
      kertoja: 'Vuosi 1873. Kartalla palaa yksitoista valoa: höyry vetää junia, '
        + 'lennätin vie sanan meren yli, ja valokuva pysäyttää hetken. Isoisä '
        + 'lähtee matkaan. Edessä on neljätoista valoa lisää, eikä hän tiedä '
        + 'niistä yhtään.',
      /*
       * Pulun kommentti kertojan jälkeen (omistaja: *"Pulu voi
       * kommentoida isoisän kohdalla jotain siitä mitä hänen aikana oli
       * ja mitä puuttui ja tämä jotenkin nasevasti pulun tyylillä."*).
       * Kaksi osaa, jotka tulevat kuplapinoon peräkkäin.
       */
      pulu: [
        'Kääk, tässä kohtaa isoisä pakkaa arkkunsa. Junat kulkevat jo, lennätin '
          + 'naputtaa ja valokuvakin osataan ottaa. Mutta puhelinta ei ole, ei '
          + 'hehkulamppua, ei autoa, ei edes polkupyörää sellaisena kuin sinä sen tunnet.',
        'Isoisä luuli lähtevänsä valmiiseen maailmaan. Kello näyttää, että se oli '
          + 'vasta puolivälissä.',
      ],
    },
  },
  {
    vuosi: 1876, paikka: 'Köln', lat: 50.9375, lon: 6.9603, x: 6065.3, y: 1349.2,
    henkilo: 'Nikolaus Otto', otsikko: 'Nelitahtimoottori',
    selite: 'Otton moottori puristi kaasuseoksen ennen sytytystä. Sama '
      + 'nelitahtinen kierto pyörii yhä lähes jokaisessa polttomoottorissa.',
    juttu: 'Kauppamatkustaja Nikolaus Otto kiinnostui kaasumoottoreista ja '
      + 'perusti Kölnin Deutziin tehtaan, jossa työskentelivät myös '
      + 'Gottlieb Daimler ja Wilhelm Maybach. Vuonna 1876 Otto sai '
      + 'toimimaan moottorin, jossa seos imetään, puristetaan, sytytetään ja '
      + 'poistetaan — neljä tahtia.'
      + '\n\n'
      + 'Puristus teki moottorista tehokkaan ja hiljaisen. Daimler ja Maybach '
      + 'kehittivät siitä muutamassa vuodessa bensiinikäyttöisen version, '
      + 'joka oli riittävän kevyt ajoneuvoon.',
    henkilojuttu: 'Nikolaus August Otto (1832–1891) syntyi Holzhausenissa '
      + 'kuusilapsisen perheen nuorimpana, ja isä kuoli hänen '
      + 'syntymävuonnaan. Koulun jälkeen hänestä tuli kauppa-apulainen: '
      + 'hän kiersi Länsi-Saksaa myymässä kahvia, teetä, riisiä ja '
      + 'sokeria. Insinöörikoulutusta hän ei saanut koskaan. Kuultuaan '
      + '1860 Lenoirin kaasumoottorista hän rakensi veljensä kanssa siitä '
      + 'kopion ja alkoi parannella sitä.'
      + '\n\n'
      + 'Otto oli itsepäinen mutta ei yksin: nelitahtisen kaasumoottorin '
      + 'sai lopulta toimimaan hänen yhtiönsä insinööripari Franz Rings '
      + 'ja Herman Schumm. Myöhemmin Otto menetti tärkeimmän patenttinsa, '
      + 'kun hänen entinen työnjohtajansa Gottlieb Daimler löysi '
      + 'vanhemman ranskalaisen patentin samaan ajatukseen. Kun Foggin '
      + 'isoisä matkusti vuonna 1873, Otton ja Eugen Langenin yhtiö oli '
      + 'juuri muuttanut Kölnin Deutziin ja ottanut nimen '
      + 'Gasmotoren-Fabrik Deutz — mutta myytävä kone oli yhä äänekäs '
      + 'ilmakehämoottori, ja nelitahtiseen oli kolme vuotta.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1876-nikolaus-otto.jpg`,
      selite: 'Nikolaus Otto oli koulutukseltaan kauppamies, joka myi kahvia ja '
        + 'sokeria ennen kuin ryhtyi moottoreihin. Hän ei opiskellut '
        + 'koskaan insinööriksi eikä lakannut parantelemasta samaa konetta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Nikolaus August Otto.png', selite: 'Nikolaus August Otto, tuntemattoman kuvaajan muotokuva noin 1868.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1876-otto.jpg`,
      selite: 'Kun suuri vauhtipyörä ei pysähdy, Otton vieressä seisova '
        + 'mekaanikko uskaltaa viimein hellittää otettaan säätövivusta. '
        + 'Toukokuussa 1876 Kölnissä uusi moottori puristaa '
        + 'kaasuseoksen ennen sytytystä ja käy neljässä tahdissa — noin '
        + 'kolme hevosvoimaa riittää todistamaan, että vuosien '
        + 'epäonnistumiset eivät menneet hukkaan.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Nikolaus Otto"',
  },
  {
    vuosi: 1879, paikka: 'Berliini', lat: 52.52, lon: 13.405, x: 6280.2, y: 1278.9,
    henkilo: 'Werner von Siemens', otsikko: 'Sähköveturi',
    selite: 'Berliinin teollisuusnäyttelyssä 1879 pieni sähköveturi kuljetti '
      + 'yleisöä 300 metrin radalla. Neljä vuotta myöhemmin kulki ensimmäinen raitiovaunu.',
    juttu: 'Siemens & Halske rakensi näyttelyyn veturin, joka sai virran '
      + 'kiskojen välisestä kolmannesta kiskosta. Kone veti kolmea vaunua ja '
      + 'kuljetti kesän aikana lähes 90 000 matkustajaa.'
      + '\n\n'
      + 'Vuonna 1881 Siemens avasi Berliinin Lichterfeldeen maailman '
      + 'ensimmäisen sähköraitiotien. Sähkövoima teki mahdolliseksi '
      + 'maanalaiset radat, joissa höyryveturin savu olisi ollut '
      + 'tukahduttava.',
    henkilojuttu: 'Werner Siemens (1816–1892) oli vuokraviljelijän neljästätoista '
      + 'lapsesta kolmas. Rakennusakatemiaan ei ollut varaa, joten hän '
      + 'meni Preussin tykistö- ja insinöörikouluun ja palveli upseerina; '
      + 'sotilaana hän oli mukana kehittämässä sähköllä laukaistavia '
      + 'merimiinoja Kielin puolustukseen. Palattuaan sodasta hän päätti '
      + 'keskittyä parantelemaan jo olemassa olevia tekniikoita, myi '
      + 'ensimmäisen keksintönsä oikeudet 1843 englantilaiselle yhtiölle '
      + 'ja perusti 1847 Johann Halskeen kanssa lennätinpajan Berliiniin.'
      + '\n\n'
      + 'Siemens oli yhtä paljon järjestäjä kuin keksijä: yhtiö '
      + 'kansainvälistyi heti, ja veljet hoitivat Lontoon ja Pietarin. '
      + 'Hän kannatti avoimesti työväen aseman parantamista ja kirjoitti, '
      + 'ettei päämääränä saa olla tehdas, jossa "työn orjat" raatavat '
      + 'rikkaiden käsissä. Kun Foggin isoisä matkusti vuonna 1873, '
      + 'Siemens & Halske oli jo rakentanut yli 11 000 kilometrin '
      + 'lennätinlinjan Lontoosta Kalkuttaan, mutta sähköveturiin oli '
      + 'kuusi vuotta ja aatelisarvoonsa viisitoista.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1879-werner-von-siemens.jpg`,
      selite: 'Werner von Siemens oli upseeri ja yritysjohtaja yhtä paljon kuin '
        + 'keksijä. Hän puolusti avoimesti työväen asemaa ja varoitti '
        + 'tehtaista, joissa raatavat "työn orjat".',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Wvs 1885.jpg', selite: 'Werner von Siemens, valokuva noin 1885.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1879-siemens.jpg`,
      selite: 'Kuusipaikkaisen avovaunun poika kuuntelee, mistä veturin '
        + 'ääni tulee: savupiippua, hevosta tai höyryä ei ole. '
        + 'Berliinin teollisuusnäyttelyn pieni Siemens & Halsken rata '
        + 'kuljettaa vuonna 1879 yleisöä noin seitsemän kilometrin '
        + 'tuntinopeudella ja tekee sähköisestä liikkeestä ensi kertaa '
        + 'monelle ruumiillisen kokemuksen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Werner von Siemens"',
  },
  {
    vuosi: 1885, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Louis Pasteur', otsikko: 'Raivotautirokote',
    selite: 'Heinäkuussa 1885 Pasteur rokotti koiran pureman pojan. Poika '
      + 'jäi henkiin, ja tartuntatautien hoito muuttui.',
    juttu: 'Louis Pasteur oli osoittanut, että käyminen ja monet taudit '
      + 'johtuvat mikrobeista. Hän heikensi raivotaudin taudinaiheuttajaa '
      + 'kanien selkäytimessä ja sai rokotteen, joka toimi eläimillä.'
      + '\n\n'
      + 'Kun yhdeksänvuotias Joseph Meister tuotiin Pariisiin raivotautisen '
      + 'koiran puremana, Pasteur uskalsi kokeilla rokotetta ihmiseen. Poika '
      + 'parani, ja Pariisiin perustettiin Pasteur-instituutti vuonna 1888. '
      + 'Suomalainen Albert Edelfelt maalasi Pasteurin laboratoriossaan samana '
      + 'vuonna kuin rokote syntyi.',
    henkilojuttu: 'Louis Pasteur (1822–1895) oli köyhän nahkurin poika Jurasta ja '
      + 'keskinkertainen koulupoika, joka piirsi mieluummin muotokuvia '
      + 'kuin luki; hän oli luki- ja kirjoitushäiriöinen ja reputti '
      + 'ensimmäisen pääsykokeensa École Normaleen. Esimiehenä hän oli '
      + 'ankara: koulun johtajana hän määräsi opiskelijoiden hylkäämän '
      + 'lampaanmuhennoksen tarjolle joka maanantai ja uhkasi erottaa '
      + 'tupakoivat, minkä jälkeen 80 opiskelijasta 73 erosi itse.'
      + '\n\n'
      + 'Elämä koetteli. Viidestä lapsesta kolme kuoli lavantautiin. '
      + 'Vuonna 1868 Pasteur sai aivohalvauksen, joka halvaannutti hänen '
      + 'vasemman puolensa; sen jälkeen kokeet tekivät hänen ohjeidensa '
      + 'mukaan avustajat Émile Roux ja Charles Chamberland. Kun Foggin '
      + 'isoisä matkusti vuonna 1873, halvauksesta toipunut 50-vuotias '
      + 'Pasteur valittiin Ranskan lääketieteen akatemian jäseneksi — '
      + 'raivotautirokotteeseen oli vielä kaksitoista vuotta.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1885-louis-pasteur.jpg`,
      selite: 'Louis Pasteur oli keskinkertainen koulupoika ja armoton esimies, '
        + 'joka ei antanut kiistoissa periksi. Halvaus vei häneltä kätten '
        + 'työn mutta ei työtä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Albert Edelfelt - Louis Pasteur - 1885.jpg', selite: 'Louis Pasteur laboratoriossaan, Albert Edelfeltin maalaus 1885.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1885-pasteur.jpg`,
      selite: 'Avustaja merkitsee pullon päivämäärän tietäen, että '
        + 'kuivumisaika ratkaisee näytteen voiman: liian virulentti voi '
        + 'tappaa, liian heikko ei suojaa. Pasteurin ryhmä heikentää '
        + 'raivotautia kuivattamalla tartunnan saaneiden kaniinien '
        + 'selkäydintä; kesällä 1885 menetelmää käytetään Joseph '
        + 'Meisteriin, jonka puremat olisivat muuten olleet lähes '
        + 'varmasti kohtalokkaat.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Louis Pasteur"',
  },
  {
    vuosi: 1886, paikka: 'Mannheim', lat: 49.4875, lon: 8.466, x: 6115.5, y: 1412.4,
    henkilo: 'Carl Benz', otsikko: 'Auto',
    selite: 'Benzin kolmipyöräinen Patent-Motorwagen sai patentin '
      + 'tammikuussa 1886. Se oli ensimmäinen polttomoottorilla kulkeva auto.',
    juttu: 'Carl Benz rakensi Mannheimissa kevyen bensiinimoottorin ja '
      + 'asensi sen kolmipyöräiseen vaunuun. Keisarillinen patenttivirasto '
      + 'myönsi patentin numero 37435 tammikuun 29. päivänä 1886, ja Benz ajoi '
      + 'ensimmäiset julkiset ajot kesällä.'
      + '\n\n'
      + 'Vuonna 1888 hänen vaimonsa Bertha Benz ajoi auton kahden poikansa '
      + 'kanssa Mannheimista Pforzheimiin, yli sata kilometriä, kertomatta '
      + 'miehelleen. Matka osoitti, että auto kestää pitkän ajon — ja toi '
      + 'tehtaalle ensimmäiset tilaukset.',
    henkilojuttu: 'Carl Benz (1844–1929) syntyi Karlsruhen laidalla '
      + 'veturinkuljettajan pojaksi, ja isä kuoli keuhkokuumeeseen pojan '
      + 'ollessa kaksivuotias. Köyhyydestä huolimatta äiti piti huolen '
      + 'koulusta: Benz pääsi 15-vuotiaana Karlsruhen polyteknilliseen '
      + 'kouluun ja valmistui 19-vuotiaana. Sen jälkeen tuli seitsemän '
      + 'vuotta töitä, joihin hän ei sopeutunut — konepaja, vaakatehdas, '
      + 'siltatehdas ja lopulta wieniläinen rautarakennusliike.'
      + '\n\n'
      + 'Benzin pelasti kahdesti hänen vaimonsa Bertha. Kun ensimmäisen '
      + 'oman pajan työkalut ulosmitattiin, Bertha osti myötäjäisillään '
      + 'pois epäluotettavan yhtiökumppanin. Kun auto ei mennyt kaupaksi, '
      + 'hän ajoi 1888 poikiensa kanssa 104 kilometriä Mannheimista '
      + 'Pforzheimiin miehelleen kertomatta ja keksi matkalla jarrupalat. '
      + 'Kun Foggin isoisä matkusti vuonna 1873, Benz oli 28-vuotias '
      + 'vastavihitty konepajanpitäjä, jonka yritys oli kaatumassa; '
      + 'esikoispoika Eugen syntyi samana vuonna, ja autoon oli '
      + 'kolmetoista vuotta.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1886-carl-benz.jpg`,
      selite: 'Carl Benz ei sopeutunut yhteenkään palkkatyöhön ja menetti kaksi '
        + 'yritystä ennen menestystä. Vaimo Bertha pelasti sekä pajan että '
        + 'auton.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Carl Benz circa 1920.jpg', selite: 'Carl Benz noin 1920.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1886-benz.jpg`,
      selite: 'Kadun poika odottaa hevosen ilmestyvän, mutta ääni tulee '
        + 'penkin takana tärisevästä yksisylinterisestä moottorista. '
        + 'Carl Benzin vuonna 1886 patentoitu kolmipyöräinen kulkee '
        + 'alle yhden hevosvoiman varassa; epävarma koeajo näyttää, '
        + 'että ajoneuvo voi kantaa sekä oman voimanlähteensä että '
        + 'ohjaajansa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Benz Patent-Motorwagen" ja "Carl Benz"',
  },
  {
    vuosi: 1888, paikka: 'Karlsruhe', lat: 49.0069, lon: 8.4037, x: 6113.5, y: 1433.1,
    henkilo: 'Heinrich Hertz', otsikko: 'Radioaallot',
    selite: 'Hertz tuotti ja mittasi sähkömagneettisia aaltoja '
      + 'laboratoriossaan. Hän ei uskonut niistä olevan mitään hyötyä.',
    juttu: 'Karlsruhen teknillisen korkeakoulun professori Heinrich Hertz '
      + 'halusi todistaa James Clerk Maxwellin teorian: sähkö ja valo ovat '
      + 'samaa aaltoliikettä. Vuosina 1886–1888 hän synnytti kipinällä '
      + 'aaltoja, jotka vastaanotin toisella puolella huonetta tunnisti.'
      + '\n\n'
      + 'Kun opiskelija kysyi, mihin aaltoja voisi käyttää, Hertz vastasi: '
      + '"Ei mihinkään." Seitsemän vuotta myöhemmin Marconi lähetti niillä '
      + 'viestin. Taajuuden yksikkö hertsi on nimetty hänen mukaansa.',
    henkilojuttu: 'Heinrich Hertz (1857–1894) syntyi Hampurissa asianajajan ja '
      + 'poliitikon poikana. Koulussa hän oli hyvä sekä luonnontieteissä '
      + 'että kielissä ja opetteli huvikseen arabiaa. Hän opiskeli '
      + 'Dresdenissä, Münchenissä ja Berliinissä, jossa hänen '
      + 'opettajikseen tulivat Gustav Kirchhoff ja Hermann von Helmholtz. '
      + 'Helmholtz ehdotti hänelle jo 1879 Maxwellin teorian '
      + 'koettelemista, mutta Hertz piti tehtävää liian vaikeana ja '
      + 'siirsi sen syrjään lähes seitsemäksi vuodeksi.'
      + '\n\n'
      + 'Kun koe lopulta onnistui, Hertz ei nähnyt sille mitään käyttöä: '
      + 'kyse oli hänen mukaansa vain siitä, että Maxwell oli ollut '
      + 'oikeassa. Hän kuoli 36-vuotiaana leikkauksen jälkitautiin. Kun '
      + 'Foggin isoisä matkusti vuonna 1873, Hertz oli 16-vuotias '
      + 'koululainen Hampurissa — ja samana vuonna ilmestyi James Clerk '
      + 'Maxwellin teos A Treatise on Electricity and Magnetism, jonka '
      + 'ennustuksen Hertz viisitoista vuotta myöhemmin todisti todeksi.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1888-heinrich-hertz.jpg`,
      selite: 'Heinrich Hertz oli lahjakas myös kielissä ja opetteli '
        + 'koululaisena arabiaa. Todistettuaan radioaallot olemassa '
        + 'oleviksi hän sanoi, ettei niistä ole mitään hyötyä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Heinrich Rudolf Hertz.jpg', selite: 'Heinrich Hertz, Robert Krewaldtin valokuva.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1888-hertz.jpg`,
      selite: 'Avustaja peittää kädellään lampun hajavalon ja odottaa '
        + 'kipinää, jota tuskin näkee. Kun renkaan pieni kipinä vastaa '
        + 'lähettimen kipinään ilman johtoa, sähkömagneettinen aalto '
        + 'muuttuu laskusta havaittavaksi ilmiöksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Heinrich Hertz"',
  },
  {
    vuosi: 1895, paikka: 'Bologna', lat: 44.4949, lon: 11.3426, x: 6211.4, y: 1622.5,
    henkilo: 'Guglielmo Marconi', otsikko: 'Radio',
    selite: 'Parikymppinen Marconi lähetti kotitilallaan Bolognan lähellä '
      + 'radiosignaalin mäen yli. Vuonna 1901 signaali ylitti Atlantin.',
    juttu: 'Guglielmo Marconi luki Hertzin kokeista ja rakensi Villa '
      + 'Griffonen ullakolle lähettimen. Kesällä 1895 hänen veljensä '
      + 'ampui haulikolla merkiksi, kun signaali oli kulkenut mäen taakse, '
      + 'noin kahden kilometrin päähän.'
      + '\n\n'
      + 'Italian posti ei kiinnostunut, joten Marconi muutti Lontooseen ja '
      + 'sai patentin 1896. Joulukuussa 1901 hänen asemansa Cornwallissa '
      + 'lähetti kirjaimen S Atlantin yli Newfoundlandiin. Marconi sai fysiikan '
      + 'Nobelin 1909.',
    henkilojuttu: 'Guglielmo Marconi (1874–1937) syntyi Bolognassa italialaisen '
      + 'maanomistajan ja irlantilaisen Annie Jamesonin poikana; äiti oli '
      + 'viskitehtailijasuvun tyttärentytär. Koulua Marconi ei käynyt '
      + 'lainkaan vaan sai kotiopettajia, joista tärkein oli '
      + 'livornolainen fysiikanopettaja Vincenzo Rosa. Kaksikymppisenä '
      + 'hän kokosi laitteensa Villa Griffonen ullakolle huoneeseen, '
      + 'jossa oli aiemmin kasvatettu silkkiäistoukkia.'
      + '\n\n'
      + 'Marconi oli ennen muuta yrittäjä: hän ei keksinyt radioaaltoja '
      + 'vaan teki niistä liiketoiminnan, ja hänen yhtiönsä sähköttäjät '
      + 'olivat Titanicin radiohuoneessa 1912. Fysiikan Nobelin hän sai '
      + '1909 yhdessä Ferdinand Braunin kanssa. Vuonna 1923 hän liittyi '
      + 'Italian fasistiseen puolueeseen ja nousi sen aikana maan '
      + 'tiedeakatemian johtoon. Kun Foggin isoisä matkusti vuonna 1873, '
      + 'Marconia ei ollut vielä olemassa — hän syntyi seuraavana '
      + 'keväänä, eikä kukaan ollut vielä osoittanut radioaaltojen olevan '
      + 'olemassa.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1895-guglielmo-marconi.jpg`,
      selite: 'Guglielmo Marconi ei käynyt päivääkään koulua vaan opiskeli '
        + 'kotiopettajien johdolla. Hän oli yhtä paljon liikemies kuin '
        + 'keksijä — ja liittyi 1923 Italian fasistiseen puolueeseen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Guglielmo Marconi.jpg', selite: 'Guglielmo Marconi 1908, Pach Brothers.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1895-marconi.jpg`,
      selite: 'Villa Griffonen ullakolla nuori apulainen tuijottaa '
        + 'paperinauhaa ja odottaa mäen takaa kiväärinlaukausta. Ääni '
        + 'tarkoittaisi, että näkymätön viesti on kulkenut ensimmäisen '
        + 'kerran esteen läpi — ja ettei kuukausien rakentelu ollut '
        + 'turhaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Guglielmo Marconi"',
  },
  {
    vuosi: 1895, paikka: 'Würzburg', lat: 49.7913, lon: 9.9534, x: 6165.1, y: 1399.3,
    henkilo: 'Wilhelm Röntgen', otsikko: 'Röntgensäteet',
    selite: 'Marraskuussa 1895 Röntgen huomasi säteilyn, joka näkee lihan '
      + 'läpi. Ensimmäinen röntgenkuva oli hänen vaimonsa käsi.',
    juttu: 'Würzburgin yliopiston fysiikan professori Wilhelm Röntgen tutki '
      + 'katodisädeputkea pimennetyssä huoneessa, kun läheinen '
      + 'fluoresoiva levy alkoi hohtaa. Säteily kulki paperin, puun ja lihan '
      + 'läpi mutta ei luun eikä metallin. Röntgen nimesi sen X-säteiksi.'
      + '\n\n'
      + 'Joulukuun 22. päivänä 1895 hän kuvasi vaimonsa Anna Berthan käden. '
      + '"Olen nähnyt kuolemani", vaimo sanoi. Kuukaudessa säteitä käytettiin '
      + 'jo sairaaloissa, ja Röntgen sai ensimmäisen fysiikan Nobel-palkinnon 1901.',
    henkilojuttu: 'Wilhelm Röntgen (1845–1923) syntyi Lennepissä kangaskauppiaan '
      + 'ainoana lapsena ja muutti kolmivuotiaana Alankomaihin, minkä '
      + 'vuoksi hän oli neljäkymmentä vuotta vailla kansalaisuutta. '
      + 'Utrechtin teknillisestä koulusta hänet erotettiin 1865 '
      + 'syyttömänä: hänen katsottiin piirtäneen opettajasta pilakuvan, '
      + 'jonka oli tehnyt joku toinen. Ilman päästötodistusta yliopisto '
      + 'oli kiinni, kunnes Zürichin polyteknikko otti hänet pelkän '
      + 'pääsykokeen perusteella.'
      + '\n\n'
      + 'Röntgen oli sulkeutunut mies, joka ei halunnut julkisuutta: hän '
      + 'kieltäytyi pitämästä Nobel-luentoa ja määräsi kirjeenvaihtonsa '
      + 'hävitettäväksi kuolemansa jälkeen. Patenttia hän ei ottanut, '
      + 'koska halusi löydön kaikkien käyttöön. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, Röntgen oli 28-vuotias apulainen, joka '
      + 'seurasi opettajaansa August Kundtia Würzburgista Strasbourgiin; '
      + 'vaimo Anna Bertha oli naitu vuotta aiemmin, eikä rahaa juuri '
      + 'ollut.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1895-wilhelm-rontgen.jpg`,
      selite: 'Wilhelm Röntgen oli sulkeutunut ja julkisuutta kaihtava mies: '
        + 'hän kieltäytyi pitämästä Nobel-luentoa, ei ottanut löydöstään '
        + 'patenttia ja määräsi kirjeenvaihtonsa hävitettäväksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Roentgen2.jpg', selite: 'Wilhelm Röntgen noin 1900.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1895-rontgen.jpg`,
      selite: 'Avustaja pitää oikean kätensä liikkumatta ja vertaa sitä '
        + 'erillisellä hohtavalla levyllä näkyvään luiseen varjoon. '
        + 'Sormus vahvistaa, että kuva kuuluu hänelle; säteilyn '
        + 'tulevista hyödyistä tai vaaroista huoneessa ei vielä tiedetä '
        + 'juuri mitään.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Wilhelm Röntgen"',
  },
  {
    vuosi: 1895, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Lumière-veljekset', otsikko: 'Elokuva',
    selite: 'Joulukuussa 1895 Lumièret näyttivät Pariisin Grand Caféssa '
      + 'liikkuvia kuvia maksavalle yleisölle. Elokuvateatteri oli syntynyt.',
    juttu: 'Auguste ja Louis Lumière valmistivat Lyonissa valokuvauslevyjä. '
      + 'He rakensivat kinematografin, joka oli samalla kamera, kopiokone '
      + 'ja projektori, ja kuvasivat sillä työläisten poistumisen omasta '
      + 'tehtaastaan.'
      + '\n\n'
      + 'Joulukuun 28. päivänä 1895 Pariisin Grand Cafén kellarissa esitettiin '
      + 'kymmenen lyhytfilmiä. Juna, joka saapuu asemalle, sai tarinan mukaan '
      + 'katsojat säikähtämään. Vuoden päästä kinematografeja kiersi jo '
      + 'ympäri maailmaa.',
    henkilojuttu: 'Auguste (1862–1954) ja Louis (1864–1948) Lumière syntyivät '
      + 'Besançonissa, jossa heidän isänsä piti pientä '
      + 'valokuvausateljeeta. Perhe muutti Lyoniin 1870, ja pojat kävivät '
      + 'kaupungin suurimman teknillisen koulun La Martinièren. Työ oli '
      + 'perheyritystä alusta asti: veljekset patentoivat filmin '
      + 'reikäperforoinnin, joka kuljettaa kuvanauhaa tasaisesti kameran '
      + 'ja projektorin läpi, ja kehittivät kinematografin: yhden '
      + 'laitteen, joka sekä kuvasi, kopioi että heijasti elokuvan.'
      + '\n\n'
      + 'Elokuva ei ollut heille tulevaisuus vaan uutuus. He '
      + 'kieltäytyivät myymästä kameraansa Georges Mélièsille, kutsuivat '
      + 'elokuvaa keksinnöksi ilman tulevaisuutta ja vetäytyivät alalta '
      + '1905 keskittyäkseen väriin; heidän autochrome-menetelmänsä tuli '
      + 'markkinoille 1907. Kymmenessä vuodessa yhtiön kuvaajat olivat '
      + 'silti ehtineet tehdä yli tuhat lyhyttä elokuvaa arjesta ja '
      + 'työstä. Kun Foggin isoisä matkusti vuonna 1873, '
      + 'Auguste oli kymmenen ja Louis kahdeksan vuoden ikäinen '
      + 'koulupoika Lyonissa, ja heidän isänsä otti muotokuvia '
      + 'lasilevyille.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1895-auguste-lumiere.jpg`,
      selite: 'Auguste Lumière oli veljeksistä vanhempi ja johti perheen '
        + 'valokuvatehdasta yhdessä veljensä kanssa. Elokuva oli heille '
        + 'uutuustuote, josta he luopuivat jo 1905.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaToinen: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1895-louis-lumiere.jpg`,
      selite: 'Louis Lumière tuli Pariisiin esittelemään värivalokuvausta ja '
        + 'hämmästyi, että liikkuvat mustavalkokuvat kiinnostivat yleisöä '
        + 'enemmän. Veljekset pitivät elokuvaa keksintönä ilman '
        + 'tulevaisuutta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Fratelli Lumiere.jpg', selite: 'Auguste ja Louis Lumière noin 1895.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1895-lumiere.jpg`,
      selite: 'Eturivin katsoja kääntyy hetkeksi katsomaan vierustoveriaan: '
        + 'liikkuivatko tehtaan portista todella ihmiset vai huijasiko '
        + 'silmä? Salon indienin 33 maksavaa vierasta joutuvat '
        + 'keksimään kokemukselle sanat samalla, kun käsikammen '
        + 'tasainen rytmi pitää valokuvat liikkeessä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Auguste and Louis Lumière"',
  },
  {
    vuosi: 1897, paikka: 'Augsburg', lat: 48.3705, lon: 10.8978, x: 6196.6, y: 1460.4,
    henkilo: 'Rudolf Diesel', otsikko: 'Dieselmoottori',
    selite: 'Dieselin moottori sytytti polttoaineen pelkällä puristuksella. '
      + 'Ensimmäinen toimiva kone käynnistyi Augsburgissa 1897.',
    juttu: 'Rudolf Diesel halusi moottorin, joka hukkaisi mahdollisimman '
      + 'vähän lämpöä. Hänen ratkaisussaan ilma puristetaan niin kuumaksi, '
      + 'että ruiskutettu polttoaine syttyy itsestään. Patentti myönnettiin '
      + '1893, ja Augsburgin konetehdas rakensi ensimmäisen käyttökelpoisen '
      + 'moottorin vuonna 1897.'
      + '\n\n'
      + 'Dieselin kone oli raskas mutta säästeliäs, ja se valtasi laivat, '
      + 'veturit ja kuorma-autot. Diesel itse katosi Englannin kanaalilla '
      + 'matkustajalaivalta vuonna 1913.',
    henkilojuttu: 'Rudolf Diesel (1858–1913) syntyi Pariisissa baijerilaisten '
      + 'siirtolaisten poikana ja vietti ensimmäiset yhdeksän kuukauttaan '
      + 'sijaisperheessä maalla. Isä valmisti nahkatavaraa, ja poika '
      + 'kuljetti tilaukset asiakkaille kärryillä. Ranskan ja Preussin '
      + 'sodan syttyessä 1870 perhe karkotettiin Lontooseen, ja äiti '
      + 'lähetti 12-vuotiaan Rudolfin yksin Augsburgiin sukulaisten luo '
      + 'oppimaan saksaa.'
      + '\n\n'
      + 'Diesel oli poikkeuksellisen kunnianhimoinen ja teki työnsä '
      + 'hengenvaarassa: höyryllä toiminut koemoottori räjähti ja oli '
      + 'tappaa hänet, ja toinen räjähdys vei häneltä kuukausia '
      + 'sairaalassa sekä osan näöstä. Vuonna 1913 hän katosi yöllä '
      + 'laivasta matkalla Antwerpenistä Lontooseen; pankkitilit olivat '
      + 'tyhjät, ja kuolinsyy on yhä avoin. Kun Foggin isoisä matkusti '
      + 'vuonna 1873, Diesel päätti peruskoulunsa luokkansa parhaana ja '
      + 'kirjoittautui Augsburgin vasta perustettuun teollisuuskouluun.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1897-rudolf-diesel.jpg`,
      selite: 'Rudolf Diesel oli pakolaislapsi, joka ilmoitti 14-vuotiaana '
        + 'kirjeellä vanhemmilleen ryhtyvänsä insinööriksi. Kaksi '
        + 'räjähdystä oli vähällä tappaa hänet työn ääressä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Rudolf Diesel.jpg', selite: 'Rudolf Diesel.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1897-diesel.jpg`,
      selite: 'Mekaanikko hellittää säätövivusta vasta, kun vauhtipyörän '
        + 'rytmi ei enää horju. Neljän vuoden rikkoutumisten jälkeen '
        + 'vuoden 1897 moottori käy, mutta mies kuuntelee yhä jokaista '
        + 'metallista iskua kuin seuraava voisi olla viimeinen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Rudolf Diesel"',
  },
  {
    vuosi: 1898, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Marie Curie', otsikko: 'Radium',
    selite: 'Marie ja Pierre Curie erottivat pikiuraanista kaksi uutta '
      + 'alkuainetta, poloniumin ja radiumin, ja antoivat nimen radioaktiivisuudelle.',
    juttu: 'Puolasta Pariisiin tullut Maria Skłodowska tutki Becquerelin '
      + 'löytämää uraanin säteilyä. Hän havaitsi, että pikiuraani säteilee '
      + 'enemmän kuin sen sisältämä uraani — malmissa oli jotain '
      + 'tuntematonta.'
      + '\n\n'
      + 'Vuonna 1898 Curiet ilmoittivat kahdesta uudesta alkuaineesta: '
      + 'polonium sai nimensä Marien kotimaasta, radium säteilystään. '
      + 'Marie Curie sai Nobelin fysiikassa 1903 ja kemiassa 1911 — ainoana '
      + 'ihmisenä kahdessa eri tieteessä.',
    henkilojuttu: 'Maria Skłodowska (1867–1934) syntyi Varsovassa Venäjän vallan '
      + 'alla kahden opettajan nuorimpana lapsena. Kun venäläiset '
      + 'kielsivät laboratorio-opetuksen puolalaisissa kouluissa, isä toi '
      + 'välineet kotiin ja opetti lapsensa käyttämään niitä. Äiti kuoli '
      + 'tuberkuloosiin ja vanhin sisar lavantautiin; Maria oli silloin '
      + 'kymmenvuotias. Naisena hän ei päässyt yliopistoon, joten hän '
      + 'opiskeli salaisessa "lentävässä yliopistossa" ja työskenteli '
      + 'kotiopettajattarena.'
      + '\n\n'
      + 'Sisarusten sopimus vei hänet eteenpäin: ensin Maria elätti '
      + 'sisarensa lääketieteen opinnot Pariisissa, sitten sisar hänen '
      + 'omansa. Latinalaiskorttelin ullakolla hän paleli, unohti syödä '
      + 'ja suoritti kaksi tutkintoa. Kotimaahan hän olisi halunnut '
      + 'jäädä, mutta Krakovan yliopisto ei ottanut naista töihin, ja '
      + 'Pierre Curien kirje käänsi hänet takaisin Pariisiin. Kun '
      + 'Foggin isoisä matkusti vuonna '
      + '1873, Maria oli viisivuotias Varsovassa eikä radioaktiivisuutta '
      + 'tunnettu lainkaan — koko sanan hän keksi itse vasta '
      + 'neljännesvuosisataa myöhemmin.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1898-marie-curie.jpg`,
      selite: 'Marie Curie opiskeli salaisessa "lentävässä yliopistossa", koska '
        + 'naisia ei otettu Varsovan yliopistoon. Pariisissa hän paleli '
        + 'ullakollaan ja unohti syödä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Marie Curie c. 1898.jpg', selite: 'Marie Curie noin 1898.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1898-curie.jpg`,
      selite: 'Marie Curie kiertää raskasta rautatankoa padassa, josta '
        + 'nousevat happamat höyryt tarttuvat vaatteisiin ja ihoon. '
        + 'Tuhansien kilojen jäännöksestä tavoitellaan jotakin, jota '
        + 'mittari paljastaa mutta silmä ei — eikä kukaan työtilassa '
        + 'vielä osaa arvioida säteilyn hintaa heidän terveydelleen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Marie Curie"',
  },
  {
    vuosi: 1900, paikka: 'Friedrichshafen', lat: 47.6543, lon: 9.4791, x: 6149.3, y: 1490.9,
    henkilo: 'Ferdinand von Zeppelin', otsikko: 'Ilmalaiva',
    selite: 'Heinäkuussa 1900 kreivi Zeppelinin 128-metrinen LZ 1 nousi '
      + 'Bodenjärveltä. Jäykkärunkoinen ilmalaiva oli syntynyt.',
    juttu: 'Eläkkeelle jäänyt ratsuväenkenraali Ferdinand von Zeppelin '
      + 'suunnitteli ilmalaivan, jossa alumiinirunko pitää kaasusäiliöt '
      + 'muodossaan. LZ 1 rakennettiin kelluvaan halliin Bodenjärvelle ja '
      + 'lensi ensimmäisen kerran 2. heinäkuuta 1900, 18 minuuttia.'
      + '\n\n'
      + 'Ensimmäiset laivat tuhoutuivat ja rahat loppuivat, mutta '
      + 'saksalaiset keräsivät kreiville uuden alun. Vuodesta 1910 zeppeliinit '
      + 'kuljettivat matkustajia, ja 1930-luvulla ne lensivät säännöllisesti '
      + 'Atlantin yli.',
    henkilojuttu: 'Kreivi Ferdinand von Zeppelin (1838–1917) kasvoi Konstanzin '
      + 'lähellä sukukartanossa ja sai kotiopetusta. Hän valitsi upseerin '
      + 'uran Württembergin armeijassa mutta otti toistuvasti '
      + 'virkavapaata opiskellakseen tekniikkaa ja kemiaa. Vuonna 1863 '
      + 'hän lähti tarkkailijaksi Yhdysvaltain sisällissotaan ja matkasi '
      + 'sieltä oppaiden kanssa kanooteilla Ylä-Mississippille; St. '
      + 'Paulissa hän nousi ensimmäisen kerran ilmapalloon ja mainitsi '
      + 'myöhemmin sen hetken ilmalaiva-ajatuksensa alkuna.'
      + '\n\n'
      + 'Zeppelin oli itsepäinen ja hankala: hänet pakotettiin eroamaan '
      + 'armeijasta 52-vuotiaana huonosti sujuneiden sotaharjoitusten '
      + 'jälkeen, hän erotti ensimmäisen insinöörinsä ja kiinnitti '
      + 'lopulta vaimonsa maat lainan vakuudeksi. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, Zeppelin ylennettiin toukokuussa majuriksi '
      + '— ja vasta seuraavan vuoden maaliskuussa hän kirjoitti '
      + 'päiväkirjaansa ensimmäisen kuvauksen jäykkärunkoisesta '
      + 'ilmalaivasta, jonka sisällä olisi useita erillisiä kaasusäkkejä.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1900-ferdinand-von-zeppelin.jpg`,
      selite: 'Ferdinand von Zeppelin oli itsepäinen upseeri, joka pakotettiin '
        + 'eroamaan armeijasta ja pani lopulta vaimonsa maat pantiksi '
        + 'ilmalaivojensa vuoksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Ferdinand von Zeppelin.jpg', selite: 'Ferdinand von Zeppelin.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1900-zeppelin.jpg`,
      selite: 'Köydestä vetävä palomies tuntee 128-metrisen rungon nosteen '
        + 'käsivarsissaan ennen kuin ilmalaiva on kunnolla irti '
        + 'vedestä. Kun LZ 1 kohoaa kelluvan hallin edessä, hänen '
        + 'tehtävänsä on päästää irti juuri oikealla hetkellä — koneen '
        + 'kyky palata on vielä todistamatta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "LZ 1" ja "Ferdinand von Zeppelin"',
  },
  {
    vuosi: 1909, paikka: 'Calais', lat: 50.9513, lon: 1.8587, x: 5895.3, y: 1348.6,
    henkilo: 'Louis Blériot', otsikko: 'Lento kanaalin yli',
    selite: 'Heinäkuussa 1909 Blériot lensi yksitasollaan Calais\'sta '
      + 'Doveriin 37 minuutissa. Meri ei enää suojannut ketään.',
    juttu: 'Wrightin veljekset olivat lentäneet Yhdysvalloissa vuodesta 1903, '
      + 'mutta Euroopassa lentokoneet olivat yhä sirkusnumero. Lontoolainen '
      + 'Daily Mail lupasi tuhat puntaa ensimmäiselle, joka ylittää '
      + 'Englannin kanaalin.'
      + '\n\n'
      + 'Louis Blériot lähti 25. heinäkuuta 1909 aamunkoitteessa Calais\'n '
      + 'läheltä ilman kompassia ja laskeutui Doverin linnan viereen 37 '
      + 'minuuttia myöhemmin. Blériot XI -koneita tilattiin sadoittain, ja '
      + 'lentokoneesta tuli Euroopassa vakavasti otettava kulkuneuvo.',
    henkilojuttu: 'Louis Blériot (1872–1936) syntyi Cambraissa viisilapsisen '
      + 'perheen esikoisena ja pärjäsi koulussa erityisen hyvin '
      + 'konepiirustuksessa. Hän läpäisi pääsykokeen Pariisin '
      + 'arvostettuun École Centraleen ja valmistui insinööriksi. Rahansa '
      + 'hän teki auton valonheittimillä: hänen asetyleenilamppunsa '
      + 'olivat maailman ensimmäiset käyttökelpoiset, ja Renault ja '
      + 'Panhard ostivat niitä. Voitot menivät lentokoneisiin.'
      + '\n\n'
      + 'Blériot rikkoi koneen toisensa jälkeen ja selvisi joka kerta. '
      + 'Kerran hän kiipesi syöksykierteessä istuimeltaan kohti pyrstöä '
      + 'saadakseen koneen nokan ylös. Douaissa pakoputken eriste irtosi '
      + 'ja poltti hänen kenkänsä puhki, mutta hän lensi lentonsa '
      + 'loppuun; kolmannen asteen palovammat paranivat yli kaksi '
      + 'kuukautta. Kun Foggin isoisä matkusti vuonna 1873, Blériot oli '
      + 'vuoden ikäinen lapsi Cambraissa, eikä yksikään ihminen ollut '
      + 'vielä lentänyt moottorikoneella.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1909-louis-bleriot.jpg`,
      selite: 'Louis Blériot rahoitti lentokoneensa myymällä '
        + 'autonvalonheittimiä ja rikkoi konetta toisensa jälkeen. Kerran '
        + 'hän lensi lentonsa loppuun kenkä palaen jalassa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Louis Bleriot.jpg', selite: 'Louis Blériot.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1909-bleriot.jpg`,
      selite: 'Kolme alusta jää pieniksi pisteiksi Kanaalille, eikä '
        + 'Blériot\'lla ole kompassia kertomassa, kuinka kauas tuuli on '
        + 'vienyt. Kun Doverin valkoiset kalliot viimein erottuvat '
        + 'usvasta, koko hauras puu- ja kangaskone näyttää hetken '
        + 'mahdolliselta eikä pelkältä uhkapeliltä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    ilmioLisa: {
      osoite: `${KEKSINTO_KUVAJUURI}/1909-bleriot-close.jpg`,
      selite: 'Kylmä ilmavirta on kastellut Blériot\'n silmät ja moottorin '
        + 'öljy tarttuu kasvoihin, mutta hän ei uskalla irrottaa otetta '
        + 'ohjaimesta. Kallioiden löytyminen sumusta ei vielä ole '
        + 'voitonjuhla — se on ensimmäinen helpotuksen välähdys ennen '
        + 'kovaa laskua Englannin maaperälle.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Louis Blériot"',
  },
  {
    vuosi: 1926, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'John Logie Baird', otsikko: 'Televisio',
    selite: 'Tammikuussa 1926 Baird näytti Sohon ullakolla liikkuvat kasvot '
      + 'sähköisesti. Se oli ensimmäinen julkinen televisioesitys.',
    juttu: 'Skotlantilainen John Logie Baird rakensi vastaanottimensa '
      + 'hattulaatikoista, polkupyörän lampuista ja neulomalangasta. Kuvan '
      + 'pilkkoi pyörivä reikälevy, ja ensimmäinen kasvokuva oli '
      + 'nukkepää nimeltä Stooky Bill.'
      + '\n\n'
      + 'Tammikuun 26. päivänä 1926 Baird esitti laitteen Royal Institutionin '
      + 'jäsenille Frith Streetillä. Kuvassa oli 30 juovaa ja se välkkyi, '
      + 'mutta kasvot liikkuivat. BBC aloitti säännölliset lähetykset '
      + 'Bairdin järjestelmällä 1932.',
    henkilojuttu: 'John Logie Baird (1888–1946) syntyi Helensburghissa kirkkoherran '
      + 'nuorimpana lapsena. Glasgow\'n teollisuuskaupungin '
      + 'harjoittelupaikat tekivät hänestä sosialistin ja veivät hänen '
      + 'terveytensä; opinnot katkesivat maailmansotaan eikä hän koskaan '
      + 'valmistunut. Ennen televisiota hän yritti tehdä timantteja '
      + 'grafiitista, lasisen partaveitsen ja ilmatäytteiset kengät. '
      + 'Menestys tuli vasta lämpösukasta.'
      + '\n\n'
      + 'Sairaana ja rahattomana Baird muutti 1923 Hastingsiin ja rakensi '
      + 'ensimmäisen toimivan televisionsa hatturasiasta, saksista, '
      + 'parsinneuloista, polkupyörän lampunlinsseistä, teelaatikosta ja '
      + 'sinettivahasta. Kun hän tuli esittelemään laitettaan Daily '
      + 'Expressin toimitukseen, uutispäällikkö pyysi hankkiutumaan eroon '
      + '"hullusta, jolla on kone langattomaan näkemiseen". Kun Foggin '
      + 'isoisä matkusti vuonna 1873, Bairdia ei ollut syntynyt — mutta '
      + 'helmikuussa 1873 Willoughby Smith kertoi Lontoon '
      + 'lennätininsinööreille, että valo muuttaa seleenin '
      + 'sähkönjohtavuutta. Siitä havainnosta alkoi tie televisioon.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1926-john-logie-baird.jpg`,
      selite: 'John Logie Baird oli sinnikäs epäonnistuja: lasinen partaveitsi, '
        + 'ilmatäytteiset kengät, timantit grafiitista. Ensimmäisen '
        + 'televisionsa hän kokosi hatturasiasta ja parsinneuloista.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'John Logie Baird in 1917.jpg', selite: 'John Logie Baird 1917.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1926-baird.jpg`,
      selite: 'Skeptinen todistaja kumartuu niin lähelle pientä '
        + 'vastaanotinta, että näkee kuvan hajoavan valopisteiksi. Kun '
        + 'kasvojen suu kuitenkin liikkuu samassa hetkessä kuin '
        + 'viereisessä huoneessa, kömpelö välke lakkaa olemasta temppu '
        + 'ja muuttuu televisioksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "John Logie Baird"',
  },
  {
    vuosi: 1928, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'Alexander Fleming', otsikko: 'Penisilliini',
    selite: 'Syyskuussa 1928 Fleming palasi lomalta ja huomasi homeen '
      + 'tappaneen bakteerit maljalta. Antibioottien aika alkoi.',
    juttu: 'Alexander Fleming tutki St Mary\'s Hospitalissa stafylokokkeja '
      + 'ja jätti maljat pöydälle lomansa ajaksi. Palattuaan hän näki, että '
      + 'yhdelle maljalle kasvanut Penicillium-home oli tappanut bakteerit '
      + 'ympäriltään. Hän nimesi vaikuttavan aineen penisilliiniksi.'
      + '\n\n'
      + 'Fleming ei saanut ainetta eristettyä, ja lääke jäi odottamaan yli '
      + 'kymmenen vuotta. Oxfordissa Howard Florey ja Ernst Chain '
      + 'puhdistivat sen 1940, ja toisen maailmansodan aikana penisilliiniä '
      + 'tuotettiin miljoonille. Kolmikko sai Nobelin 1945.',
    henkilojuttu: 'Alexander Fleming (1881–1955) syntyi Ayrshiren maatilalla ja '
      + 'menetti isänsä seitsenvuotiaana. Hän työskenteli neljä vuotta '
      + 'laivayhtiön konttorissa, kunnes sedän perintö ja isoveljen '
      + 'esimerkki veivät hänet 20-vuotiaana lääketieteen opintoihin '
      + 'Lontooseen. Tutkijaksi hänet houkutteli osittain ampumaseura: '
      + 'kerhon kapteeni halusi pitää hyvän ampujan talossa ja järjesti '
      + 'hänelle paikan sairaalan rokotusosastolta.'
      + '\n\n'
      + 'Fleming oli tunnetusti epäjärjestelmällinen laboratoriossa, ja '
      + 'hänen apulaisensa piti juuri sitä molempien suurten löytöjen '
      + 'syynä. Ensimmäisen maailmansodan kenttäsairaaloissa hän '
      + 'havaitsi, että antiseptiset aineet tappoivat haavoittuneita '
      + 'enemmän kuin itse tulehdus, ja osoitti sen kokeella 1917 — mutta '
      + 'armeijan lääkärit jatkoivat entiseen tapaan. Kun Foggin isoisä '
      + 'matkusti vuonna 1873, tulehtuneelle haavalle ei ollut mitään '
      + 'tehtävissä: Joseph Lister oli tuonut karbolihapon leikkaussaliin '
      + 'vasta 1860-luvun puolivälissä, eikä bakteereja tappavia '
      + 'lääkkeitä ollut olemassa.',
    kuva: {
      osoite: `${KEKSINTO_KUVAJUURI}/muotokuva/1928-alexander-fleming.jpg`,
      selite: 'Alexander Fleming oli tunnetusti epäjärjestelmällinen tutkija, '
        + 'ja hänen apulaisensa piti juuri sitä hänen löytöjensä syynä. '
        + 'Tutkijaksi hänet houkutteli ampumaseuran kapteeni.',
      lahde: 'Matkakirjan havainnekuva',
    },
    kuvaAito: { tiedosto: 'Synthetic Production of Penicillin TR1468.jpg', selite: 'Alexander Fleming laboratoriossaan 1943.' },
    ilmio: {
      osoite: `${KEKSINTO_KUVAJUURI}/1928-fleming.jpg`,
      selite: 'Fleming on vähällä siirtää sotkuisen viljelymaljan syrjään, '
        + 'kun homepesäkkeen ympärillä oleva kirkas kehä pysäyttää '
        + 'hänet. Kukaan ei hurraa: hänen edessään ei ole vielä lääke '
        + 'vaan outo paikka, jossa stafylokokit eivät kasva.',
      lahde: 'Matkakirjan havainnekuva',
    },
    lahde: 'en-Wikipedia "Alexander Fleming"',
  },
];

export const LINSSI = {
  tunnus: 'keksinnot',
  jarjestys: 25,
  kerros: false,
  nimi: 'Keksintölinssi',
  lyhyt: 'Keksinnöt Euroopassa 1769–1928: kello juoksee, valot syttyvät.',
  ikoni: '<circle cx="12" cy="12" r="7.5"/><path d="M12 7.5V12l3 2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2"/>',
  valokuva: false,
  laudat: ['maailmankartta'],
  lahde: {
    aineisto: 'Wikipedia (englanninkieliset artikkelit, tarkistettu 2.9.2026); kuvat Wikimedia Commons, PD',
    lisenssi: 'CC BY-SA 4.0 (tekstit), PD (kuvat)',
    osoite: 'https://en.wikipedia.org/wiki/Timeline_of_historic_inventions',
    haettu: '2026-09-02',
  },
  aikajana: {
    otsikko: 'Keksinnöt Euroopassa',
    /*
     * Kaaren oma musiikki (omistajan tilaus 2.9.2026 ilta: *"Generoi
     * linssille oma musiikki"*). Nimi on musiikkimoduulin laji
     * (js/siirtymamusiikki.js RAIDAT.keksinnot → ämpärin
     * aanet/linssi-keksinnot.mp3); moottori soittaa sen koko ajon
     * ajan. Ilman tätä kenttää ajo olisi hiljainen.
     */
    musiikki: 'keksinnot',
    /*
     * AVAUSJAKSON ESITTELY (omistajan tilaus 4.9.2026 aamu: *"keskelle
     * voisi tulla otsikko ja pieni selite siitä, mitä seuraavaksi
     * pelaajalle havainnollistetaan"*). Musta ruutu, tämä laatikko ja
     * Käynnistä-nappi; moottori (js/aikajana.js avaaAvausjakso) lukee
     * kentän eikä kovakoodaa sanoja — teksti on kaaren omaa sisältöä.
     */
    esittely: {
      otsikko: 'Keksinnöt Euroopassa 1765–1928',
      /*
       * Hiottu omistajan kanssa 4.9.2026 (viides versio): alkaa "Tulet
       * seuraavaksi näkemään", historiallinen kaari ilman yksittäisiä
       * keksintöjä tai nimiä, leijumaan jäävä kysymys, ei isoisälausetta.
       * Luetaan myös kertojan äänellä (linssiluennat), kun teksti on
       * hyväksytty.
       */
      teksti: 'Tulet seuraavaksi näkemään, miten Eurooppa muuttui puolessatoista '
        + 'vuosisadassa enemmän kuin edellisessä tuhannessa vuodessa. Etäisyydet '
        + 'kutistuivat, työ siirtyi käsistä koneille, ja tieto alkoi kulkea '
        + 'nopeammin kuin ihminen. Mutta kuka sen kaiken oikeastaan pani '
        + 'liikkeelle, ja missä?',
    },
    alku: 1765,
    loppu: 1928,
    alue: EUROOPPA,
    tapahtumat: KEKSINNOT,
    loppusanat: {
      otsikko: 'Kaari päättyy 1928',
      teksti: 'Kartalla palavat nyt kaikki kaaren valot Glasgow\'sta Pietariin. Kaari on '
        + 'Euroopan: puhelin (Bell 1876), hehkulamppu (Edison 1879) ja '
        + 'lentokone (Wrightin veljekset 1903) syntyivät samaan aikaan '
        + 'Atlantin takana. Napauta valoa tai korttia, niin juttu aukeaa.',
      kuva: null,
    },
  },
};
