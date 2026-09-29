// OLAVINLINNA / massa: koko linnan muoto yleisnäkymään (kohdistettava: false). Erä 3 muokkaa (kohta 0).
// Siirretty omaan tiedostoonsa erässä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md).

// ---------------------------------------------------------------------------
// TILA 'massa': koko linnan karkea muoto yleisnäkymään (kohdistettava: false).
// Sisältää myös perustan (vesi, kalliosaari), koska se on osa "koko linnan"
// yleisilmettä. Kolme pyöreää tornia pohjoislaidalla, kehämuurit, pihan
// rakennukset harjakatoin ja portaat. Eteläsivu (kameraa kohti) on
// aukileikattu: eteläiset muurinpätkät ovat matalampia ja niiden yläreuna
// käyttää leikkaus-roolia.
export const TILA = {
  id: 'massa',
  nimi: 'Olavinlinna (yleisnäkymä)',
  kohdistettava: false,
  rajat: { min: [-58, -10, -48], max: [58, 42, 36] },
  naapurit: ['laituri', 'vartiotupa', 'fatabuuri', 'kierreportaat', 'muurinharja', 'kappeli', 'keskushalli', 'keittio'],
  hahmot: [],
  // Massan äänisilmukat: tuuli linnan muureilla + järven laineet rannassa (era2 kohta 2 "AANET").
  aanet: [{ aani: 'linna-tuuli' }, { aani: 'jarvi-laineet' }],
  // Satunnaiset kertaäänet (era2 kohta 2 "AANET"): lokit ja kaukaiset kellot, harvakseltaan.
  tehosteet: [
    { aanet: ['lokit'], valit_s: [15, 30] },
    { aanet: ['kellot-kaukaa'], valit_s: [40, 80] },
  ],
  kasikirjoitus: [],
  palikat: [
    // --- Perusta ---
    { resepti: 'vesi', paikka: [0, -7, 0], suunta: 0, leveys: 400, syvyys: 400 },
    {
      resepti: 'kallio', paikka: [0, -0.5, -6], suunta: 0,
      leveys: 110, syvyys: 80, korkeus: 9, siemen: 1873, kohina: 0.4,
    },

    // --- Kolme pyöreää tornia (pohjoislaidalla rivissä) ---
    // Länsitorni.
    {
      resepti: 'torni', paikka: [-34, 0, -6], suunta: 0,
      sade: 7.5, korkeus: 28, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [-34, 28, -6], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },
    // Pohjoistorni (keskellä, taaimpana).
    {
      resepti: 'torni', paikka: [0, 0, -20], suunta: 0,
      sade: 6.5, korkeus: 32, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 28.5, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [0, 32, -20], suunta: 0, sade: 6.5, korkeus: 8, ylitys: 0.6, segmentit: 32 },
    // Itätorni.
    {
      resepti: 'torni', paikka: [32, 0, -4], suunta: 0,
      sade: 7.5, korkeus: 28, paksuus: 2, segmentit: 32, auki: null,
      vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [32, 28, -4], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },

    // --- Kehämuurit (~10 m, 3 m paksut). Pohjois-, länsi- ja itämuuri täyttä
    // korkeutta; eteläsivu matalampi ja leikattu (kameraa kohti). ---
    { resepti: 'seina', paikka: [-17, 0, -20], suunta: 0, pituus: 34, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [16, 0, -20], suunta: 0, pituus: 32, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [-34, 0, -3], suunta: 90, pituus: 34, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [32, 0, -3], suunta: 90, pituus: 34, korkeus: 10, paksuus: 3 },
    // Eteläsivu, aukileikattu: matalampi (4 m) ja yläreuna leikkaus-roolilla.
    // Väli x 8…20 jätetty auki keittiön oman eteläseinän (poistettu) kohdalle.
    {
      resepti: 'seina', paikka: [-13, 0, 14], suunta: 0, pituus: 42, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: false, oikea: false, yla: true },
    },
    {
      resepti: 'seina', paikka: [26, 0, 14], suunta: 0, pituus: 12, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: false, oikea: false, yla: true },
    },

    // --- Pihan rakennukset harjakatoin ---
    // Itäsali (ruokasali, konseptin kohta 5): pohjois- ja eteläseinä + harjakatto
    // (harjakatto-resepti tuottaa myös päätykolmiot, ks. speksin resepti-taulukko).
    { resepti: 'seina', paikka: [20, 0, -14], suunta: 0, pituus: 20, korkeus: 5, paksuus: 0.5 },
    { resepti: 'seina', paikka: [20, 0, -2], suunta: 0, pituus: 20, korkeus: 5, paksuus: 0.5 },
    { resepti: 'harjakatto', paikka: [20, 5, -8], suunta: 0, leveys: 20, syvyys: 12, korkeus: 3, ylitys: 0.4 },
    // Länsivarasto (konseptin kohta 3).
    { resepti: 'seina', paikka: [-24, 0, -14], suunta: 0, pituus: 18, korkeus: 4.5, paksuus: 0.5 },
    { resepti: 'seina', paikka: [-24, 0, 0], suunta: 0, pituus: 18, korkeus: 4.5, paksuus: 0.5 },
    { resepti: 'harjakatto', paikka: [-24, 4.5, -7], suunta: 0, leveys: 18, syvyys: 14, korkeus: 2.5, ylitys: 0.4 },

    // --- Portaat ---
    // Keittiön itäovelta pihakannelle (pihan lattia y 0, keittiön lattia y −4).
    { resepti: 'porras', paikka: [21, -4, 9.5], suunta: 0, leveys: 1.5, askelmat: 22, nousu: 0.18, etenema: 0.28 },
    // Pihalta länsivaraston edustalle nouseva lyhyt porras (maiseman rikastus).
    { resepti: 'porras', paikka: [-15, 0, -1], suunta: 0, leveys: 1.8, askelmat: 16, nousu: 0.18, etenema: 0.28 },
  ],
};
