// OLAVINLINNA / kappeli: Kirkkotornin 3. kerros (torni [0, 0, −20], sisäsäde 5), y 9…13,5: alttari, 12 vihkimisristiä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Kirkkotornin kappeli',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Kappeli mainitaan jo 1499; seinää kiertää 12 vihkimisristiä, apostolien merkkinä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Viereisestä hagioskooppikammiosta rikolliset ja sairaat seurasivat messua pienestä aukosta.', lahde: 'Wikipedia: Olavinlinna; Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Holvikaton maalauksista näkyy vielä lehti- ja kukka-aiheita sekä vaakunoita.', lahde: 'Kansallismuseo: Pyhä Olavi' },
  ],
};

export const TILA = {
  id: 'kappeli',
  nimi: 'Kappeli',
  kohdistettava: true,
  rajat: { min: [-5, 9, -25], max: [5, 13.5, -15] },
  naapurit: ['massa', 'muurinharja', 'keskushalli'],
  kamera: { kohde: [0, 10.8, -20], atsimuutti: 165, korkeus: 16, etaisyys: 20, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [0, 9.8, -20], atsimuutti: 165, korkeus: 18, etaisyys: 28, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [2.5, 9.3, -17], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'kivilattia', paikka: [0, 9.3, -20], suunta: 0, leveys: 9, syvyys: 9, paksuus: 0.3, siemen: 1499 },
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
