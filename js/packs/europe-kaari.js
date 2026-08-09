/*
 * Isoisän kaari: sitaatit visaan ja aarteeseen.
 *
 * Omistajan päätökset 8.–9.8.2026:
 *  - isoisä pois saapumisista; hän puhuu visan ja aarteen hetkissä
 *  - "kaksi eri lukijan ääntä ei toimi" — SAMA kertojaääni lukee
 *    kaiken, ja puhuja selviää TEKSTISTÄ: lainausmerkit, vanha
 *    tyyli, vuosiluku tai nuoren herran kommentti lopussa kertovat
 *    kumpi puhuu. "Isoisä kirjoitti" -muotoa vältetään, mutta sitä
 *    saa käyttää jos se on jossain tekstissä paras.
 *
 * visa  = isoisän rivi lainausmerkeissä + Reginaldin lyhyt reaktio;
 *         näkyy tietovisan yllä nimiöllä "Matkakirjasta".
 * aarre = isoisän rivi + Reginaldin kuittaus kätkön paljastuessa;
 *         SULKEE SAMAN KUVAN, jonka saapuminen avasi.
 * luennat = true kun äänitiedostot on generoitu:
 *         assets/audio/puhe-europe-visa-<id>.mp3 ja
 *         assets/audio/puhe-europe-aarre-<id>.mp3 — kaikki samalla
 *         kertojaäänellä kuin saapumiset.
 *
 * PILOTTI: Edinburgh, Pariisi, Ateena ja Pietari (omistajan tilaus
 * 9.8.: "tee neljä kaupunkia kokonaan uusiksi ja generoi niin
 * kuuntelen"). Loput kaupungit vasta kuuntelun jälkeen.
 *
 * Vain Fable kirjoittaa tähän tiedostoon (tarinallinen aines).
 */
export const EUROPE_KAARI = {
  edinburgh: {
    visa: '"Tässä kaupungissa oikea vastaus on avain. Kadut ovat '
      + 'päällekkäin kuin kirjan sivut — väärä kerros vie väärälle '
      + 'vuosisadalle." Käsiala oli haalistunutta mutta varmaa. '
      + 'Vastasin kuin koe olisi hänen.',
    visaLuenta: '[softly] "Tässä kaupungissa oikea vastaus on '
      + 'avain. Kadut ovat päällekkäin kuin kirjan sivut — '
      + '[whispers] väärä kerros vie väärälle vuosisadalle." '
      + '[curious] Käsiala oli haalistunutta mutta varmaa. Vastasin '
      + 'kuin koe olisi hänen.',
    aarre: '"Yövartija saattoi minutkin kerran oikealle sivulle. '
      + 'Kiitä häntä puolestani." Kujan päässä lyhty heilahti kuin '
      + 'lakki.',
    aarreLuenta: '[softly] "Yövartija saattoi minutkin kerran '
      + 'oikealle sivulle. Kiitä häntä puolestani." [warmly] Kujan '
      + 'päässä lyhty heilahti kuin lakki.',
    luennat: true,
  },
  pariisi: {
    visa: '"Löytötavaratoimiston tiskillä ei kysytä nimeä vaan '
      + 'asiaa. Jos laukkuni on yhä siellä, vastaa niin kuin minä '
      + 'vastaisin." Merkintä oli tehty viisikymmentä vuotta sitten '
      + '— ja silti se tiesi, että seisoisin tässä.',
    visaLuenta: '[softly] "Löytötavaratoimiston tiskillä ei kysytä '
      + 'nimeä vaan asiaa. Jos laukkuni on yhä siellä, vastaa niin '
      + 'kuin minä vastaisin." [curious] Merkintä oli tehty '
      + 'viisikymmentä vuotta sitten — [whispers] ja silti se '
      + 'tiesi, että seisoisin tässä.',
    aarre: '"Jätin laukkuun valokuvan pöydästä seitsemän. Tilaa '
      + 'kaakao ja jää istumaan — joku tulee aina." Tilasin.',
    aarreLuenta: '[softly] "Jätin laukkuun valokuvan pöydästä '
      + 'seitsemän. Tilaa kaakao ja jää istumaan — joku tulee '
      + 'aina." [warmly] Tilasin.',
    luennat: true,
  },
  ateena: {
    visa: '"Torin kauppias kysyy kaikilta saman kysymyksen. Vastaa '
      + 'oikein, niin saat neljännen maun — sitä ei myydä rahalla." '
      + 'Vuoden 1873 mustetta, mutta kauppias nyökkäsi kuin ohje '
      + 'olisi eilinen.',
    visaLuenta: '[softly] "Torin kauppias kysyy kaikilta saman '
      + 'kysymyksen. Vastaa oikein, niin saat neljännen maun — '
      + '[whispers] sitä ei myydä rahalla." [curious] Vuoden 1873 '
      + 'mustetta, mutta kauppias nyökkäsi kuin ohje olisi eilinen.',
    aarre: '"Kätkin ruukun oliivipuun juurelle. Vanhinta ei etsitä '
      + 'museosta — tämä puu ehti nähdä Sokrateen." Ja nyt minut, '
      + 'lisäsin mielessäni.',
    aarreLuenta: '[softly] "Kätkin ruukun oliivipuun juurelle. '
      + 'Vanhinta ei etsitä museosta — tämä puu ehti nähdä '
      + 'Sokrateen." [warmly] Ja nyt minut, lisäsin mielessäni.',
    luennat: true,
  },
  pietari: {
    visa: '"Eremitaasissa älä seuraa opasta vaan kissaa. Se vie '
      + 'oikean taulun luo, jos osaat vastata sen katseeseen." En '
      + 'tiennyt kumpaa katsoa tarkemmin: riviä vai kissaa, joka jo '
      + 'odotti ovella.',
    visaLuenta: '[softly] "Eremitaasissa älä seuraa opasta vaan '
      + 'kissaa. Se vie oikean taulun luo, jos osaat vastata sen '
      + 'katseeseen." [curious] En tiennyt kumpaa katsoa tarkemmin: '
      + 'riviä vai kissaa, joka jo odotti ovella.',
    aarre: '"Minutkin johdatti tänne kissa. Luota aina '
      + 'virkamieheen, jolla on viikset." Kissa nuolaisi '
      + 'käpäläänsä kuin kuittaukseksi.',
    aarreLuenta: '[softly] "Minutkin johdatti tänne kissa. Luota '
      + 'aina virkamieheen, jolla on viikset." [warmly] Kissa '
      + 'nuolaisi käpäläänsä kuin kuittaukseksi.',
    luennat: true,
  },
};
