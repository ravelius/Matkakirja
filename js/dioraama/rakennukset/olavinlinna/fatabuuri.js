// OLAVINLINNA / fatabuuri: Kellotornin pohjakerros (torni [−30, 0, −20], sisäsäde 5,5), y 0…4,5; varastot.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Kellotornin fatabuuri',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Fatabuuri on suojainen, vaikeapääsyinen varastotila, jonka holvikatto näyttää muurareiden taidon.', lahde: 'Kansallismuseo: Kellotornin fatabuuri' },
    { teksti: 'Kalaa syötiin katolisen paaston vuoksi 229 päivänä vuodessa – suolakala tarvitsi varastotilaa.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Hämeen linnassa fatabuuria hoiti naispuolinen fatabuurinhoitaja, joka vastasi ruokavarastosta.', lahde: 'Ailio: Hämeen linnan asukkaista ja oloista (analogia)' },
  ],
};

export const TILA = {
  id: 'fatabuuri',
  nimi: 'Fatabuuri',
  kohdistettava: true,
  rajat: { min: [-35.5, 0, -25.5], max: [-24.5, 4.5, -14.5] },
  naapurit: ['massa', 'vartiotupa', 'kierreportaat', 'keskushalli'],
  kamera: { kohde: [-30, 1.5, -19.5], atsimuutti: 160, korkeus: 20, etaisyys: 18, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-30, 0, -19.5], atsimuutti: 160, korkeus: 24, etaisyys: 26, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-28, 0.5, -17], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'kivilattia', paikka: [-30, 0, -20], suunta: 0, leveys: 10, syvyys: 10, paksuus: 0.3, siemen: 1499 },
  ],
  hahmot: [],
  aanet: [],
  tehosteet: [],
  liekit: [],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'kohta', n: 1 },
    { tee: 'kohta', n: 2 },
  ],
};
