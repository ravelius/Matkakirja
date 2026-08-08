/*
 * Isoisän kaari: suorat sitaatit visaan ja aarteeseen.
 *
 * Omistajan päätökset 8.8.2026 illalla:
 *  - isoisä pois saapumisista (ellei todella hyvää syytä) ja sisään
 *    kysymys- ja aarrehetkiin
 *  - "matkakirja siteeraisi suoraan pelkkää isoisän tarinaa" — tekstit
 *    ovat PUHDASTA isoisää (minä-muoto, 1873), kehyksen kertoo
 *    käyttöliittymän nimiö "Isoisän matkakirjasta, 1873"
 *  - luennat isoisän omalla äänellä (pilotissa omistajan valitsema
 *    voice id R3XXDwKMU2YHwBcuYUH3)
 *
 * visa  = sitaatti tietovisan yllä; sitoo kysymyksen kaupunkiin ja
 *         siihen ihmiseen, jonka nuori herra kohtasi saapumisessa.
 * aarre = sitaatti kätkön paljastuessa; SULKEE SAMAN KUVAN, jonka
 *         saapuminen avasi (sääntö: ei viittauksia kuviin, joita
 *         teksteissä ei enää ole).
 * luennat = true kun äänitiedostot on generoitu:
 *         assets/audio/puhe-europe-visa-<id>.mp3 ja
 *         assets/audio/puhe-europe-aarre-<id>.mp3.
 *
 * PILOTTI: Edinburgh ja Pietari (omistajan tilaus 8.8.: "tee kaksi
 * kokonaista kaupunkia kaikkine lukuäänineen"). Loput kaupungit
 * kirjoitetaan, kun omistaja on kuullut pilotin.
 *
 * Vain Fable kirjoittaa tähän tiedostoon (tarinallinen aines).
 */
export const EUROPE_KAARI = {
  edinburgh: {
    visa: 'Tässä kaupungissa oikea vastaus on avain. Kadut ovat '
      + 'päällekkäin kuin kirjan sivut — ja väärä kerros vie '
      + 'väärälle vuosisadalle.',
    visaLuenta: '[softly] Tässä kaupungissa oikea vastaus on avain. '
      + 'Kadut ovat päällekkäin kuin kirjan sivut — [whispers] ja '
      + 'väärä kerros vie väärälle vuosisadalle.',
    aarre: 'Yövartija saattoi minutkin kerran oikealle sivulle. Jos '
      + 'löysit tämän, hän näytti tietä sinullekin — kiitä häntä '
      + 'puolestani.',
    aarreLuenta: '[warmly] Yövartija saattoi minutkin kerran '
      + 'oikealle sivulle. [softly] Jos löysit tämän, hän näytti '
      + 'tietä sinullekin — kiitä häntä puolestani.',
    luennat: true,
  },
  pietari: {
    visa: 'Eremitaasissa älä seuraa opasta vaan kissaa. Se vie '
      + 'oikean taulun luo — jos osaat vastata sen katseeseen.',
    visaLuenta: '[softly] Eremitaasissa älä seuraa opasta vaan '
      + 'kissaa. [whispers] Se vie oikean taulun luo — jos osaat '
      + 'vastata sen katseeseen.',
    aarre: 'Minutkin johdatti tänne kissa. Luota aina virkamieheen, '
      + 'jolla on viikset.',
    aarreLuenta: '[warmly] Minutkin johdatti tänne kissa. [softly] '
      + 'Luota aina virkamieheen, jolla on viikset.',
    luennat: true,
  },
};
