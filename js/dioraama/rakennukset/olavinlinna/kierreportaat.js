// OLAVINLINNA / kierreportaat: Kellotornin 2.–4. kerros, y 4,5…18: kierreportaat seinän vierellä, avoin kuilu (tulkinta).
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Tornin kierreportaat (tulkinta)',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Kellotornissa oli viisi kerrosta; ylin asuttu oli kolmas, neljäs avoin puolustuskäytävä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { teksti: 'Kapeat kierreportaat suosivat oikeakätistä puolustajaa hyökkääjää vastaan.', lahde: 'yleinen linnatieto (tulkinta)' },
    { teksti: 'Kehämuurit ja esilinnan muurit kohosivat 13 metrin korkeuteen.', lahde: 'Savon historia: Olavinlinnan suojassa' },
  ],
};

export const TILA = {
  id: 'kierreportaat',
  nimi: 'Kierreportaat',
  kohdistettava: true,
  rajat: { min: [-35.5, 4.5, -25.5], max: [-24.5, 18, -14.5] },
  naapurit: ['massa', 'fatabuuri', 'muurinharja'],
  kamera: { kohde: [-30, 11, -20], atsimuutti: 160, korkeus: 14, etaisyys: 30, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-30, 10, -20], atsimuutti: 160, korkeus: 16, etaisyys: 38, fov: 40, aukko: 0.8 },
  pulu: { laskeutuminen: [-28, 13.6, -16], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'laatta', paikka: [-28, 13.5, -16], suunta: 0, leveys: 3, syvyys: 3, paksuus: 0.3 },
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
