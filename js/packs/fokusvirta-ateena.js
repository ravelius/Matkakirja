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
    teksti: 'Isoisäsi ei koskaan saanut tietää, miten kullan kävi. Se oli '
      + 'aitoa — mutta ei Priamoksen. Ja löytäjä rakensi palatsinsa tuonne '
      + 'kadun varteen; sen friisissä hän kaivaa yhä. Katso ensin tuonne ylös.',
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
      visa: {
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
      },
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
};
