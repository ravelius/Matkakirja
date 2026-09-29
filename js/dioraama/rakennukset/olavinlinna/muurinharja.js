// OLAVINLINNA / muurinharja: pohjoismuurin puolustuskäytävä Kello- ja Kirkkotornin välissä, lankkukansi y 13, sakarat pohjoisreunalla.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Muurinharja',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Tornin neljännessä kerroksessa oli avoin puolustuskäytävä, ylhäällä muurin harjalla.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Ennen tuliaseita linnaa puolustettiin nuolilta, kivenheitolta ja piiritysportailta – harja ratkaisi.', lahde: 'Tiedetuubi: Linnarakennustekninen balladi Olavinlinnasta' },
    { teksti: 'Vuonna 1495 vouti Kylliäinen torjui hyökkäyksen 150 miehen ja talonpojan voimin.', lahde: 'Wikipedia: Olavinlinna; Pietari Niilonpoika Kylliäinen' },
  ],
};

export const TILA = {
  id: 'muurinharja',
  nimi: 'Muurinharja',
  kohdistettava: true,
  rajat: { min: [-22, 13, -22], max: [-7.5, 16, -18] },
  naapurit: ['massa', 'kierreportaat', 'kappeli', 'keskushalli'],
  kamera: { kohde: [-15, 14, -20], atsimuutti: 165, korkeus: 24, etaisyys: 22, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-15, 13, -20], atsimuutti: 165, korkeus: 26, etaisyys: 30, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-12, 13.4, -19], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'laatta', paikka: [-14.75, 13.1, -20], suunta: 0, leveys: 14.5, syvyys: 3, paksuus: 0.1 },
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
