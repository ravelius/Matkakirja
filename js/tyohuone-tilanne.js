/*
 * Rakennustyön tilannetaulu työhuoneen etusivulle (omistajan toive
 * 8.8.2026: "yhteenveto, joka päivittyy, siitä missä tämänhetkinen
 * rakennustyö on menossa").
 *
 * TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE aina, kun sessioilta saapuu
 * raportti tai työjono muuttuu — muut sessiot eivät kirjoita tähän.
 * Työhuone näyttää taulun etusivun kärjessä. Tilat: 'tyossa',
 * 'valmis', 'odottaa' (selväkielinen selite riville).
 */

export const TILANNE = {
  paivitetty: '15.8.2026 — suururakkapäivä (v679–v697)',
  tavoite: 'Vuorokauden sato: kuvatekstiurakka KOKONAAN valmis '
    + '(3 627 selitettä, ylitykset 569 → 0), Siperian kahdeksan '
    + 'kaupunkia mainissa, neljä zoomattavaa reunuskarttaa '
    + '(Berliini, Lontoo, Pariisi, Helsinki) satelliitteineen, '
    + 'lukijan automoodi + otsikkotauot + taustan väistö, '
    + 'taustaäänet tasattu (-33 LUFS), ElevenLabs-äänitteet takaisin '
    + 'ajantasaisiin merkintöihin, etukäteispuskurit, ja Raamattu + '
    + 'Tilannelehti luettavina pelissä. Matkakirjatekstien uudistus '
    + 'odottaa Raamatun avointen osioiden läpikäyntiä omistajan '
    + 'kanssa.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'päätoimittaja',
      tila: 'tyossa',
      tehtava: 'Koordinoi työsessiot (perustamisprompteilla — '
        + 'herätteet eivät toimi), mergeää PR:t pistokokeineen '
        + '(vertaa-sisaltodiff), julkaisee omat lukija-, ääni- ja '
        + 'integraatiotyöt. Valvontajärjestelmä: sisältöpistokoe + '
        + 'konetestit (äänimittaus, dokumenttikartta).',
      seuraavaksi: 'Opus 17:n nähtävyysjuttujen merge; sitten '
        + 'värikartan kytkentä ja miniatyyripilotti omistajan '
        + 'palettipäätöksen jälkeen.',
    },
    {
      tekija: 'Opus 17',
      rooli: 'nähtävyysjutut',
      tila: 'tyossa',
      tehtava: 'Neljä uutta nähtävyysjuttua (Panthéon, Luxembourgin '
        + 'puisto, Kallion kirkko, Linnanmäki) v693:n uusille '
        + 'kartakohteille — laatu ensin, Commons-kuvat tarkistuksin.',
      seuraavaksi: 'PR → Fablen sisältöpistokoe (kaikki 4 juttua '
        + 'luetaan kokonaan) → merge → sessio arkistoidaan.',
    },
  ],
  odottaaPaatosta: [
    'Värikarttapaletti (Berliinin näyte toimitettu 15.8.): '
      + 'kytketäänkö togglen taakse satelliitin tilalle + '
      + 'miniatyyripilotti klikkausmallilla.',
    'Zoom- ja reunuskarttojen skaalaus lopuille ~49 kaupungille.',
    'Raamatun luonnososioiden läpikäynti yhdessä — sen jälkeen '
      + 'kaikki matkakirjatekstit uusiksi ja luennat uudelleen.',
    'Suomenlinnan kainalon suuntateksti satelliittinäkymään (3 '
      + 'vaihtoehtoa Opus 13:n raportissa) — vai jätetään.',
    'v685: taustan pieni aaltoliike jatkuvan luennan '
      + 'sivunvaihdossa — pidetäänkö väistö pohjassa sivujen yli?',
    'v692: muutama luonnostaan ylikuuma taustaraita jäi ~3 dB '
      + 'tavoitteen yli (kerroinraja) — vaihdetaanko raidat?',
    'Balladiääni ja lukunopeuden tuntuma — omistajan kuuntelu.',
  ],
};

/**
 * Testattavaa juuri nyt: uusimmat ominaisuudet ja mistä ne löytää.
 * Fable päivittää tätä julkaisujen tahdissa — Testaa-välilehti
 * näyttää listan pelilinkkien vieressä. Uusin ensin. Vanhat rivit
 * siivotaan pois kun ne on katsottu tai ne vanhenevat.
 */
export const TESTATTAVAA = [
  {
    otsikko: 'Kehittäjän liitteet: Raamattu ja Tilannelehti pelissä (v697)',
    ohje: 'Kytke kehittäjätila ja avaa pelin hampurilaisvalikko: '
      + 'uudesta Kehittäjä-osiosta aukeavat Raamattu ja '
      + 'Tilannelehti luettavina lehtinä — sivunkäännöt, sisällys, '
      + 'lukija ja puskurit toimivat kuten muissakin lehdissä. '
      + 'Työhuone integroidaan jatkossa peliin tätä reittiä.',
  },
  {
    otsikko: 'ElevenLabs-äänitteet palasivat ajantasaisiin merkintöihin (v694)',
    ohje: 'Saavu kaupunkiin, jonka matkakirjateksti ei ole muuttunut '
      + '(esim. useimmat Euroopan ja Afrikan kaupungit): merkinnän '
      + 'lukee taas Viisas Kertoja -äänite. Muuttuneet tekstit '
      + '(Madrid, Berliini, Tukholma) ja äänitteettömät kaupungit '
      + 'striimataan lukijaäänellä kuten ennen. 39/42 äänitettä oli '
      + 'ajan tasalla. Uusia äänitteitä ei generoida ennen '
      + 'matkakirjatekstien uudistusta.',
  },
  {
    otsikko: 'Taustaäänet tasattu (v692)',
    ohje: 'Kierrä muutamaa kaupunkia ja kuuntele taustaääniä: tasot '
      + 'mitattiin K-painotetulla LUFS-mittarilla ja kaikki 125 raitaa '
      + 'ajettiin -33 LUFSin tavoitteeseen — hajonta oli 35 dB, nyt '
      + '4 dB. Kova raita ei enää huuda eikä hiljainen huku puheen '
      + 'väistön alle. Etusivun lähtöaula soi entisellä tasollaan. '
      + 'Venäjän kaupungeissa radio kuuluu taas (v691).',
  },
  {
    otsikko: 'Otsikkotauko ja yläotsikko sivunvaihdossa (v687)',
    ohje: 'Kuuntele sivu, jolla on väliotsikoita: ennen otsikolla '
      + 'alkavaa kohtaa lukija pitää nyt selvästi pidemmän tauon '
      + '(~1 s) kuin tavallisten kappaleiden välissä. Jatkuvassa '
      + 'luennassa sivunvaihdon jälkeen luetaan ensin sivun '
      + 'yläotsikko (esim. "Historia") — käsin käynnistetty luenta '
      + 'alkaa yhä suoraan leipätekstistä, ja masto/lehden nimi jää '
      + 'lukematta kummassakin.',
  },
  {
    otsikko: 'Taustan väistö luennan alla (v685)',
    ohje: 'Käynnistä lehden luenta äänimaiseman soidessa: taustan '
      + 'pitäisi laskea pehmeällä 650 ms feidillä selvästi puheen alle '
      + 'ja nousta samaa liukua takaisin, kun luenta loppuu tai '
      + 'pysäytetään. Sama väistö koskee nyt kaikkia luentapolkuja — '
      + 'myös kaiuttimen sivuluentaa ja pöllön striimattua vastausta, '
      + 'jotka eivät aiemmin väistäneet lainkaan. Jatkuvassa luennassa '
      + 'tausta kohoaa hetkeksi sivunvaihdon hengähdyksen ajaksi — '
      + 'sano, jos se häiritsee.',
  },
];