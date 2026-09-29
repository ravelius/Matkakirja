// OLAVINLINNA / keskushalli: pohjoissiiven väentupa Kello- ja Kirkkotornin välissä, y 0…5; eteläseinä poistettu, yläkerta (voudin asunto) massassa.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Keskushalli ja väentupa',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Keskushallin alakerrassa oli väentupa, sotaväen ruokasali; toisessa kerroksessa voudin asunto.', lahde: 'Kansallismuseo: Keskushalli' },
    { teksti: 'Vouti ja seurue söivät ylhäällä Kuninkaan salissa, sotilaat ja käsityöläiset Linnantuvassa.', lahde: 'Yle: Olavinlinnan keittiöhistoria' },
    { teksti: 'Linnaa lämmitettiin avotakoin; keittiön lämmin ilma nousi hormia pitkin Kuninkaan saliin.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6; Yle' },
  ],
};

export const TILA = {
  id: 'keskushalli',
  nimi: 'Keskushalli',
  kohdistettava: true,
  rajat: { min: [-22, 0, -18.5], max: [-7.5, 5, -9] },
  naapurit: ['massa', 'fatabuuri', 'muurinharja', 'kappeli', 'keittio'],
  kamera: { kohde: [-14.75, 1.5, -13.5], atsimuutti: 170, korkeus: 22, etaisyys: 20, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-14.75, -0.5, -13.5], atsimuutti: 172, korkeus: 24, etaisyys: 28, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-10, 0.8, -11], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'lankkulattia', paikka: [-14.75, 0, -13.75], suunta: 0, leveys: 14.5, syvyys: 9.5, paksuus: 0.3, siemen: 1500 },
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
