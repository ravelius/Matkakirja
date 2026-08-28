/*
 * ATEENAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Lähde: docs/mantereet-tyoaineisto/matkakirja-ateena-luonnos.md
 * (vaiheet 1–3) ja docs/mantereet-tyoaineisto/fokusvirta-ateena.md
 * (vaiheet 4–6, Fablen hyväksymä paketti 24.8.2026 päätöksineen).
 * Tekstit on siirretty sellaisinaan; mitään faktaa ei ole lisätty
 * eikä muotoiltu uusiksi. Rakenteen lukee js/fokusvirta.js.
 *
 * KUUSI VAIHETTA (Raamatun osio "Fokusmoodi", ANNOSTELU):
 *   1 matkakirja — muutama lause isoisän äänellä + VANHA kuva
 *   2 pöllö      — nykypäivän huomio + UUSI kuva (herokuva)
 *   3 valinta    — 2–3 täkypainiketta
 *   4 täky       — syvennys + kuva + MINIVISA (palkkio: raha, juliste)
 *   5 oppitunti  — nosto, joka pohjustaa varsinaista kysymystä
 *   6 kohtaaminen— paikallinen esittelee itsensä ja kysyy (laatta)
 *
 * KUVAT. Jokainen Commons-tiedosto on tarkistettu rajapinnasta
 * 24.8.2026 (lisenssi, tekijä, kuvaus, koko) — nimiä ei ole arvattu.
 * Kentät ovat samat kuin muissakin pelin kuvarivissä: `tiedosto` on
 * Commons-nimi (js/packs/africa-valokuvat.js valokuvaUrl) ja `ampari`
 * pelin oman painotuotteen polku (js/media.js julisteUrl).
 *
 * MINIVISAN SKEEMA (Fablen päätös 5: "päätetään toteutuspaketissa 3"):
 * sama kuin lehden minitehtävällä (js/ui.js piirraMinitehtava) —
 * kysymys, vaihtoehdot, oikean indeksi ja faktarivi, joka näytetään
 * VASTA vastauksen jälkeen. Erillistä hint-kenttää ei ole: minivisa on
 * lämmittely, ei laattakysymys.
 *
 * KOHDENOSTOT (omistajan tilaus 24.8.2026) eivät ole täkyjä eivätkä asu
 * tässä tiedostossa: ne ovat koko maan yhteisiä ja tulevat listasta
 * js/packs/fokuskohteet-grc.js. Täällä on vain poiminta tunnuksilla,
 * jotta seuraavan kohteen tarjoaminen Ateenassa on yhden sanan lisäys.
 */
import { fokuskohteet } from './fokuskohteet-grc.js';

/*
 * ATHENA NIKEN MINIVISA on YHDESSÄ PAIKASSA, kahdessa käytössä. Se on
 * täyn 'nike' visa raskaassa korttivirrassa ja kevyen kulun kokeilussa
 * kaupunkilehden sivun 3 JULISTE-tehtävä (ks. lehtitehtavat alempana).
 * Kaksi kopiota samasta kysymyksestä ajautuisi erilleen ensimmäisellä
 * korjauksella, joten teksti on tässä vakiona ja molemmat viittaavat
 * siihen.
 */
const NIKE_VISA = {
  kysymys: 'Miksi Athena Niken patsaalta oli myöhempien '
    + 'ateenalaisten selityksen mukaan riisuttu siivet?',
  vaihtoehdot: [
    'Jotta Voitto ei voisi koskaan lentää pois kaupungista',
    'Kuvanveistäjä ei ehtinyt tehdä niitä ajoissa',
    'Patsas kuvasi alun perin miestä eikä jumalatarta',
  ],
  oikea: 0,
  fakta: 'Athena Niken temppeli on Akropoliin pienin — ja ainoa, '
    + 'jonka patsaalta puuttuvat siivet tarkoituksella, tarinan mukaan.',
};

/*
 * PNYXIN MINIVISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Jokainen väite on Pnyx-oppitunnin omasta, jo
 * hyväksytystä tekstistä (ks. `oppitunti` alempana): korokkeen nimi on
 * béma, sille sai nousta "kuka tahansa vapaa kansalainen, ei vain
 * ylimys tai sotapäällikkö", ja sieltä puhuivat Perikles ja
 * Demosthenes. Väärät vaihtoehdot ovat tekstin oma vastakohtapari.
 *
 * MIKSI EI DEMOKRATIA-KYSYMYSTÄ. Oppitunti pohjustaa laattakysymyksen
 * (EUROPE_QUESTIONS.ateena: "Mikä hallintomuoto sai alkunsa antiikin
 * Ateenasta?"), ja jos lehden tehtävä kysyisi saman, aarrekysymys
 * olisi ratkaistu ennen kuin Nikosta on tavattu. Visasääntö pätee yhä:
 * vastaus löytyy tekstistä, mutta kysymyksen sanamuoto ei toistu siinä
 * sellaisenaan.
 */
const PNYX_VISA = {
  kysymys: 'Kuka sai antiikin Ateenassa nousta Pnyxin kallioon '
    + 'veistetylle puhujankorokkeelle vaatimaan puheenvuoroa?',
  vaihtoehdot: [
    'Kuka tahansa vapaa kansalainen',
    'Vain sotapäälliköt',
    'Vain ylimyssukujen päämiehet',
  ],
  oikea: 0,
  fakta: 'Koroketta kutsuttiin bémaksi. Pnyxiltä puhuivat muun muassa '
    + 'Perikles ja myöhemmin Demosthenes.',
};

export const FOKUSVIRTA_ATEENA = {
  kaupunki: 'ateena',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    paikkarivi: 'Ateena, heinäkuussa 1873. Seesteistä; ilmanpuntari 762 mmHg.',
    teksti: 'Torilla ei tänään tingitty oliiveista — siellä puhuttiin '
      + 'miehestä, joka löysi kesäkuussa Troijan kullan. Puoli toria piti '
      + 'häntä valehtelijana, toinen puoli nerona, eikä yksikään ollut '
      + 'nähnyt kultaa omin silmin. Kirjoitan tämän muistiin siksi, että '
      + 'molemmat puolet saattavat olla oikeassa yhtä aikaa.',
    /*
     * Luenta generoitu 25.8.2026 samalla reseptillä kuin
     * tools/generoi-luennat.mjs (Viisas Kertoja, eleven_v3,
     * stability 0.5, lopputauko). Teksti on sama kuin yllä —
     * vain tunnetagit lisätty. Äänite:
     * assets/audio/puhe-fokus-matkakirja-ateena.mp3 (~23 s).
     */
    luenta: '[curious] Torilla ei tänään tingitty oliiveista — siellä '
      + 'puhuttiin miehestä, joka löysi kesäkuussa Troijan kullan. '
      + 'Puoli toria piti häntä valehtelijana, toinen puoli nerona, '
      + '[whispers] eikä yksikään ollut nähnyt kultaa omin silmin. '
      + '[softly] Kirjoitan tämän muistiin siksi, että molemmat puolet '
      + 'saattavat olla oikeassa yhtä aikaa.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-ateena.mp3',
    /*
     * Fablen päätös 4: Sophia Schliemann koruineen. Commonsin
     * rajapinta 24.8.2026: 1093×1273, public domain, tekijä tuntematon,
     * päiväys "circa 1873" — eli täsmälleen isoisän matkan vuosi.
     */
    kuva: {
      tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
      selite: 'Sophia Schliemann kantaa "Priamoksen aarteen" koruja. '
        + 'Kuva otettiin pian löydön jälkeen, ja juuri se teki '
        + 'kullasta puheenaiheen kaikkialla Euroopassa.',
      lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio (+ herokuva) ----------
   *
   * TEKSTI ON LYHENNETTY (päätoimittaja 24.8.2026, omistajan
   * pelitestipalaute v1092/v1093: *"myös teksti pitäisi olla
   * lyhyempi"*). Vaihe esitetään nyt puhekuplana, joka lähtee
   * kelluvasta pöllönapista (js/fokusvirta.js piirraKupla), eikä
   * kuplaan mahdu — eikä siihen kuulu — korttimittainen kappale.
   * Yksikään faktaväite ei muuttunut: kulta oli aitoa mutta ei
   * Priamoksen, löytäjä rakensi palatsinsa kadun varteen, ja sen
   * friisissä hän kaivaa yhä.
   */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Fablen kaanon 27.8.2026, TUURAAJA-KEHYS).
     *
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo). Ateena on se kaupunki,
     * jossa ISOISÄ OSOITTAUTUU OIKEAKSI ja Livia myöntää sen
     * vastahakoisen kunnioittavasti — kaanon vaatii vähintään yhden
     * tällaisen kuudesta, ettei hahmosta tule besserwisseriä.
     *
     * EI FAKTAVÄITTEITÄ: maadoitus koskee vain merkinnän SÄVYÄ
     * (toriuutisesta tehty elämänohje), eikä se paljasta kullan
     * kohtaloa — se on seuraavan kappaleen asia, ja järjestys on
     * tarkoituksellinen: myönnytys ensin, palkinto perässä.
     */
    maadoitus: '"Molemmat puolet saattavat olla oikeassa yhtä aikaa." No, '
      + 'isoisälläsi oli tapana tehdä toriuutisesta elämänohje, ja yleensä '
      + 'minä kutistan sellaisen takaisin sen torin kokoiseksi. Mut en tällä '
      + 'kertaa. Hän osui, ja se harmittaa minua just sen verran kun '
      + 'kohtuullista on.',
    teksti: 'Isoisäsi ei koskaan saanut tietää, miten sen kullan kävi. '
      + 'Aitoa se oli — mut ei Priamoksen. Ja löytäjä rakensi palatsinsa '
      + 'tuonne kadun varteen; sen friisissä se kaivaa vieläkin. Katso '
      + 'ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-ateena-aamu.png',
      selite: 'Parthenon aamuvalossa. Temppeli rakennettiin Athena '
        + 'Parthenoksen pyhäköksi vuosina 447–438 eaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Pöllön valinta ---------- */
  valinta: {
    kysymys: 'Mistä haluaisit kuulla ensin?',
    // Portti aarrekysymykselle (Raamatun ETENEMINEN): vähintään yksi
    // täky on tehtävä. Luku on datassa, jotta muut kaupungit voivat
    // annostella eri tahtiin ilman koodimuutosta.
    vaadittuja: 1,
    aarreNappi: 'Jatka aarteelle',
    aarreEste: 'Kuuntele ensin yksi tarina',
  },

  /*
   * ---------- 3b. Kohdenostot ----------
   * Vapaaehtoinen NELJÄS valinta valintakuplassa. Ei minivisaa eikä
   * palkkiota: kohdenosto kääntää katseen pois kaupungista, ja siitä
   * jää muistoksi vinjetti kartalle kohteen omaan paikkaan. Se EI
   * avaa aarreporttia (ks. js/fokusvirta.js) — portin mitta on täky.
   */
  kohteet: fokuskohteet(['korintin-kanava']),

  /* ---------- 4. Kolme täkypolkua ---------- */
  takyt: [
    {
      id: 'nike',
      nappi: 'Temppeli, jolta leikattiin siivet',
      otsikko: 'Athena Niken pyhäkkö',
      teksti: 'Kiipeä Propylaian ohi Akropoliin lounaiskulmaan, niin '
        + 'löydät pienimmän mutta ehkä ovelimman temppelin: Athena Niken '
        + 'pyhäkön. Sen kaidetta koristi aikoinaan marmoripatsas '
        + 'voitonjumalattaresta — mutta kuvanveistäjä oli jättänyt siltä '
        + 'siivet pois. Myöhemmät ateenalaiset selittivät asian omalla '
        + 'tavallaan: Voitto ei koskaan saisi lentää pois heidän '
        + 'kaupungistaan, joten sen siivet piti riisua. Isoisäsi ei taida '
        + 'mainita tätä matkakirjassaan — hän kirjoitti enemmän toreista '
        + 'kuin temppeleistä — mutta veikkaan, että hänkin pysähtyi tähän '
        + 'kulmaan hetkeksi.',
      /*
       * Commons 24.8.2026: 3450×2405, CC BY-SA 3.0, Joanbanjo,
       * kategoria "Temple of Athena Nike (Athens)". Tiedoston oma nimi
       * käyttää temppelin toista nimeä Nike Àptera — "siivetön Nike" —
       * eli kuva ja syvennysteksti puhuvat samasta asiasta.
       */
      kuva: {
        tiedosto: "Acròpoli d'Atenes - Temple de Nike Àptera.JPG",
        selite: 'Athena Niken temppeli Akropoliin lounaiskulmassa. '
          + 'Toinen nimi Nike Aptera tarkoittaa siivetöntä Voittoa.',
        lahde: 'Joanbanjo, Wikimedia Commons (CC BY-SA 3.0)',
      },
      // Sama visa palvelee kevyen kulun JULISTE-tehtävää (ks. NIKE_VISA).
      visa: NIKE_VISA,
    },
    {
      id: 'diogenes',
      nappi: 'Filosofi, joka asui ruukussa',
      otsikko: 'Diogenes ja hänen astiansa',
      teksti: 'Kävele Agoran laidalle ja kuvittele vanha saviastia — '
        + 'pithos, sellainen jossa säilytettiin viljaa. Filosofi Diogenes '
        + 'majaili juuri sellaisessa talvisin, koska ei välittänyt '
        + 'mukavuuksista eikä katoista. Kun eräs nuorukainen kerran rikkoi '
        + 'hänen astiansa, ateenalaiset eivät suuttuneet vaan hankkivat '
        + 'uuden tilalle — omituista kunnioitusta miehelle, joka kulki '
        + 'päivällä lyhty kädessä ja väitti etsivänsä "rehellistä '
        + 'ihmistä", ikään kuin kirkkainkaan valo ei siihen riittäisi. '
        + 'Isoisäsi mainitsee torin tingittyine oliiveineen — hänkin olisi '
        + 'kävellyt Diogeneen astian ohi tietämättään.',
      /*
       * Fablen päätös 1: ohutta Category:Diogenes -pääkategoriaa EI
       * käytetä, vaan aito pithos-astia. Commons 24.8.2026: 4640×6960,
       * CC BY-SA 4.0, Mike Peel, kuvaus "Storage jar (Pithos) of the
       * late Roman period". Kuvateksti sanoo suoraan, että astia on
       * Diogeneen astian kaltainen eikä se itse — kuva ei saa väittää
       * enempää kuin lähde kertoo.
       */
      kuva: {
        tiedosto: 'At Wikimedia Hackathon Athens (MP) 2023 365.jpg',
        selite: 'Tällaisessa viljanastiassa Diogenes majaili: '
          + 'myöhäisroomalainen pithos Ateenasta. Astia on samaa lajia '
          + 'kuin filosofin asumus, ei se itse.',
        lahde: 'Mike Peel, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mitä Diogenes kantoi mukanaan kierrellessään torilla '
          + 'kirkkaassa päivänvalossa?',
        vaihtoehdot: [
          'Palavaa lyhtyä',
          'Filosofian kirjaa',
          'Puista paimensauvaa',
        ],
        oikea: 0,
        fakta: 'Diogenes väitti etsivänsä lyhdyllään "rehellistä ihmistä" '
          + '— vihjaten, ettei sellaista löytynyt edes kirkkaassa '
          + 'päivänvalossa.',
      },
    },
    {
      id: 'schliemann',
      nappi: 'Kullanetsijän palatsi',
      otsikko: 'Iliou Melathron',
      teksti: 'Muistatko isoisäsi torikohtauksen — puheet miehestä, joka '
        + 'löysi Troijan kullan? Se mies oli Heinrich Schliemann. '
        + 'Kesäkuussa 1873, kaivauksen viimeisenä päivänä, hän löysi '
        + 'Hisarlikin kummulta kultaa, jonka uskoi kuningas Priamoksen '
        + 'aarteeksi. Muutamaa vuotta myöhemmin hän rakennutti tänne kadun '
        + 'varteen komean palatsin, Iliou Melathronin — Troijan palatsin. '
        + 'Se seisoo paikallaan yhä: nykyään talossa lasketaan vanhoja '
        + 'kolikoita, sillä se on numismaattinen museo, ja sen friisissä '
        + 'Schliemann kaivaa ikuisesti, lapio kädessä.',
      /*
       * Commons 24.8.2026: 1920×3166, CC0, athenswalk, kuvaus "The main
       * entrance of archaeologist and entrepreneur Heinrich Schliemann's
       * house. Today it is a coin museum." — sanasta sanaan sama asia
       * kuin syvennystekstin loppu. Fablen päätös 2: ajallinen
       * ennakointi raukesi, koska A3 kirjoitettiin nykypäivän ääneen,
       * joten nykyinen valokuva on täsmälleen oikea.
       */
      kuva: {
        tiedosto: "Heinrich Schliemann's house..tif",
        selite: 'Iliou Melathronin pääsisäänkäynti. Schliemannin '
          + 'kotipalatsissa toimii nykyään Ateenan numismaattinen museo.',
        lahde: 'athenswalk, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Missä rakennuksessa Ateenassa Schliemannin oma '
          + 'kaivaustyö on yhä nähtävissä kuvattuna seinäkoristeissa?',
        vaihtoehdot: [
          'Hänen entisessä kotipalatsissaan, nykyisessä numismaattisessa museossa',
          'Ateenan yliopiston pääjuhlasalissa',
          'Kansalliskirjaston lukusalissa',
        ],
        oikea: 0,
        fakta: 'Iliou Melathron toimii nykyään numismaattisena museona, '
          + 'ja sen friisissä Schliemann on kuvattuna itse kaivamassa.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen EUROPE_QUESTIONS.ateena[1] ("Mikä
   * hallintomuoto sai alkunsa antiikin Ateenasta?" → demokratia).
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   */
  oppitunti: {
    otsikko: 'Pnyx — kukkula, jolta puhuttiin',
    teksti: 'Vähän alle kilometrin Akropoliksesta länteen kohoaa '
      + 'vaatimaton kalliokukkula, Pnyx. Sen kylkeen on veistetty tasainen '
      + 'kiviaskelma, béma — puhujankoroke. Sille sai nousta kuka tahansa '
      + 'vapaa kansalainen, ei vain ylimys tai sotapäällikkö, ja vaatia '
      + 'puheenvuoroa koko kaupungin kokoontuneelta kansalta. Täältä '
      + 'puhuivat muun muassa Perikles ja myöhemmin Demosthenes. '
      + '500-luvulta eaa. lähtien juuri tällä paljaalla kalliolla '
      + 'harjoiteltiin ideaa, jolle ei vielä ollut montaa esikuvaa: että '
      + 'valta kuuluisi kansalle itselleen, ei vain harvoille. Kreikan '
      + 'kielessä sille annettiin oma nimi — demokratia, kansanvalta — ja '
      + 'Pnyx on yksi maailman vanhimmista paikoista, jossa sitä '
      + 'käytännössä kokeiltiin.',
    /*
     * Commons 24.8.2026: 2800×1658, CC BY-SA 4.0, GeorgeKokkos, kuvaus
     * "The podium where speakers used to stand to address the body of
     * the assembly of the citizens of Athens" — juuri béma.
     */
    kuva: {
      tiedosto: 'Bema, Pnyx.jpg',
      selite: 'Pnyxin béma: kallioon veistetty koroke, jolta puhuja '
        + 'kääntyi koko kansankokouksen puoleen.',
      lahde: 'GeorgeKokkos, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Fablen päätös 3: Nikos HYVÄKSYTTY. Esittely on tämän kortin oma
   * sisältö; VARSINAINEN KYSYMYS on ennallaan laattamekaniikassa
   * (game.actionQuiz), eikä tämä paketti kosketa sitä.
   */
  kohtaaminen: {
    hahmo: 'Vartija Nikos',
    nappi: 'Tapaa Nikos',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119). Lause on
     * datassa eikä koodissa, koska suomen genetiivi ei taivu
     * koneellisesti jokaisesta nimestä — ilman omaa lausetta kortti
     * käyttää pronominia (js/fokusvirta.js varmistusLause).
     */
    varmistus: 'Haluatko varmasti tavata Nikoksen juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13:
     * rivi kertoo *"MISTÄ PÄIN LEHTEÄ pulman ratkaisu löytyy,
     * vastausta paljastamatta"* ja avaa lehden siihen osioon).
     *
     * Tunnus on kaupunkilehden osion id (js/packs/kulttuuri-
     * kategoriat.js): Ateenan lehdessä on kaksi osiota, 'kaupunki'
     * ("Ateena") ja 'arki' ("Arki ja tavat"). Nikoksen kysymys koskee
     * Athenen lahjaa, ja lähin tuki sille on Ateena-osiossa —
     * artikkeli "Palkintona oksa puusta" kertoo, minkä puun oksa on
     * kaupungin oma palkinto. Vastausta se ei anna, vaan nyökkää
     * siihen suuntaan.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Vartija Nikos on kiertänyt Akropoliin ja Agoran kujia jo '
      + 'kaksikymmentä vuotta, ja hän on nähnyt tarpeeksi ulkomaalaisia, '
      + 'jotka haaveilevat löytävänsä oman Priamoksensa jo ensimmäisellä '
      + 'kaivauksella. Hän ei naura herra Foggille vasten kasvoja, mutta '
      + 'hänen katseessaan on huvittunut kärsivällisyys, kun nuori '
      + 'matkustaja jo vilkuilee seuraavaa kiveä kääntääkseen. Ennen kuin '
      + 'Nikos suostuu kertomaan mitään todella hyödyllistä, hän haluaa '
      + 'varmistaa, että vieras on oikeasti katsonut ympärilleen — ei vain '
      + 'etsinyt kultaa.',
  },

  /*
   * ---------- KEVYT KULKU -KOKEILU (omistaja 24.8.2026, ilta) --------
   *
   * Kaksi kenttää, jotka palvelevat vain kevyttä kulkua. Raskas
   * korttivirta ei lue kumpaakaan, joten liput voi kääntää suuntaan tai
   * toiseen ilman että tämä tiedosto muuttuu.
   */

  /*
   * KOHTAAMISPAIKKA: AKROPOLIS, ei kaupungin laatta.
   *
   * Raamattu (KEVYT KULKU -KOKEILU): *"Kohtaamisen paikan voi sitoa
   * muuhunkin kuin kaupunkipisteeseen (kehyskertomus)."* Vartija Nikos
   * on kiertänyt Akropoliin ja Agoran kujia kaksikymmentä vuotta, joten
   * hänet tavataan siellä missä hän työskentelee.
   *
   * 23,72573 E / 37,97154 N — en-Wikipedia "Acropolis of Athens".
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla
   * (js/packs/fokuskohteet-grc.js): maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 -175 / POHJOINEN 76, Euroopan laudalla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * TARKISTUS ATEENAN LAATTAA VASTEN: kaupungin laatta on
   * maailmankartalla 6624,7 / 1882 ja Euroopan laudalla 667 / 895.
   * Akropolis on laudalla siis noin puolen yksikön päässä laatasta —
   * juuri niin kuin pitääkin, sillä kukkula on Ateenan keskustassa
   * runsaan kilometrin päässä Syntagmasta, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä. Piste piirtyy laatan
   * viereen eikä toiseen kaupunkiin.
   */
  kohtaamispiste: {
    nimi: 'Akropolis',
    laudat: {
      maailmankartta: { x: 6624.2, y: 1881.9 },
      europe: { x: 666.7, y: 894.9 },
    },
  },

  /*
   * ISOISÄN AARREMERKINTÄ — matkakirjan myöhempi sivu (omistaja
   * 25.8.2026).
   *
   * Kun MAAN AARRE LÖYTYY, tämä teksti aukeaa SAMAAN perinteiseen
   * matkakirjakorttiin kuin saapumismerkintä, ja vasta sen jälkeen
   * pöllö kuittaa löydön (js/fokusvirta.js, ks. AARREMERKINTÄ).
   * Paikkarivi tulee koodista muodossa "Isoisän merkintä · Ateena":
   * tämä ei ole saapumispäivän havainto eikä siinä siksi ole
   * päivämäärää eikä ilmanpuntaria.
   *
   * TEKSTI ON KAANONIA EIKÄ SITÄ SAA MUOTOILLA UUSIKSI (Fable
   * 25.8.2026). Se sitoo Ateenan kaaren umpeen: saapumismerkinnässä
   * isoisä kuuli torilla miehestä, joka löysi kullan mutta jota kukaan
   * ei nähnyt kaivamassa — tässä hän myöntää seisseensa itse saman
   * kysymyksen äärellä ja jättäneensä kaivamatta.
   */
  aarremerkinta: 'Seisoin samalla kalliolla enkä uskaltanut kaivaa '
    + 'vartijan nähden — piirsin vain ristin luettelon reunaan. Jos sinä '
    + 'pitelet nyt sitä, mitä minä vain katselin, olemme molemmat '
    + 'löytäneet omamme.',

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * Raamattu (KEVYT KULKU -KOKEILU): *"Lehden sivuilla 2 ja 3 on
   * KUMMALLAKIN YKSI minitehtävä, erikseen nimettyinä: toinen AARTEEN
   * AVAUS -tehtävä ja toinen JULISTE-tehtävä."*
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Omistaja puhuu sivuista, ja
   * lehden sivupino rakennetaan aineistosta (js/lehti.js rakennaSivut):
   * Ateenassa 0 = etusivu, 1 = kaupunkisivu ("Ateena"), 2 = Arki ja
   * tavat, 3 = Menovinkit. Numero kestää sisällön muutokset paremmin
   * kuin aihetunnus kestäisi sivujärjestyksen muutokset — ja jos sivua
   * ei ole, tehtävä jää yksinkertaisesti näkymättä.
   *
   * SISÄLTÖ ON JO TARKISTETTUA. Kumpikin visa on tämän tiedoston omaa,
   * Fablen hyväksymää aineistoa: JULISTE saa täyn 'nike' visan
   * sellaisenaan (NIKE_VISA) ja AARTEEN AVAUS on koottu Pnyx-oppitunnin
   * omasta tekstistä (PNYX_VISA) — ei yhtään uutta faktaväitettä.
   *
   * PALKINNOT: 'piste' sytyttää kartalle vihreän kohtaamispisteen
   * (js/fokuspiste.js), 'juliste' myöntää kaupungin aikakausjulisteen
   * kuten lehden tavallinen minitehtävä. Kumpikin maksaa lisäksi saman
   * pienen rahapalkkion (js/fokustehtavat.js).
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA (omistaja 25.8.2026: *"jos
   * kysymyksellä EI ole julistepalkintoa, se AVAA AARTEEN — myös vanha
   * kulttuurivisa"*). Sivun 1 kysymys on Ateenan kulttuurivisa
   * (js/packs/europe-kulttuuri.js), joka kuuluu järjestelmään ilman
   * omaa riviään täällä — js/fokustehtavat.js pukee sen samaksi
   * AARTEEN AVAUS -laatikoksi. Ateenan lehden neljä sivua ovat siis
   * etusivu ilman kysymystä ja kolme kysymyssivua: visa, tämä
   * 'aarre' ja 'juliste'. KUMPI TAHANSA aarteen avaajista sytyttää
   * pisteen, ja jälkimmäisestä saa enää rahaa.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: PNYX_VISA },
    /*
     * TEHTÄVÄKOHTAINEN JULISTE (omistajan tilaus v1119, kohta 21):
     * Athena Nike -tehtävä antaa oman vedoksensa eikä kaupungin
     * yleisjulistetta. Avain on js/packs/julisteet.js:n taulussa;
     * ilman kenttää palkinto olisi yhä 'ateena' eli kaupungin oletus.
     */
    {
      id: 'juliste',
      sivu: 3,
      otsake: 'JULISTE',
      palkinto: 'juliste',
      juliste: 'ateena-nike',
      visa: NIKE_VISA,
    },
  ],
};
