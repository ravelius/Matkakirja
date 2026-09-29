// OLAVINLINNA / vartiotupa: portinvartijoiden tupa lounaiskulmassa portin vieressä (tulkinta); eteläseinä poistettu kuten keittiössä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Vartiotupa (tulkinta)',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Linnasta vartioitiin kriisin aikana saarilla: Vahtisaari ja Vartijasaari valvoivat reittejä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Hämeen linnan palvelusväkeen kuului portinvartija, joka vahti ulkoporttia ja päästi väkeä sisään.', lahde: 'Ailio: Hämeen linnan asukkaista ja oloista (analogia)' },
    { teksti: 'Keskushallin alakerran väentupa oli sotaväen ruoka- ja oleskelutila – lähin dokumentoitu vartiotupa.', lahde: 'Kansallismuseo: Keskushalli' },
  ],
};

export const TILA = {
  id: 'vartiotupa',
  nimi: 'Vartiotupa',
  kohdistettava: true,
  rajat: { min: [-32, 0, 5], max: [-22, 3.6, 12.5] },
  naapurit: ['massa', 'laituri', 'fatabuuri'],
  kamera: { kohde: [-27, 1.2, 8.6], atsimuutti: 172, korkeus: 22, etaisyys: 16, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-27, -0.8, 8.4], atsimuutti: 174, korkeus: 24, etaisyys: 24, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-24.5, 0.8, 10.5], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'kivilattia', paikka: [-27, 0, 8.75], suunta: 0, leveys: 10, syvyys: 7.5, paksuus: 0.3, siemen: 1495 },
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
