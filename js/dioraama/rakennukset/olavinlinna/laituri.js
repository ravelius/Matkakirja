// OLAVINLINNA / laituri: kavassisatama saaren etelärannalla (sijainti tulkinta): lankkulaituri paaluilla, kansi y −6,2, vene kiinni itäkyljessä.
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
// RUNKO: täytetään (palikat, valot, hahmot, liekit, äänet, käsikirjoitus) erä 3:n tila-agentilla.

const TAULU = {
  otsikko: 'Laituri ja kavassit',
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Riihisaarta sanottiin 1550-luvulla Kavassisaareksi; linnan kavassisatama oli sen tuntumassa.', lahde: 'Suomen meriarkeologinen seura: Sisävesihylyt' },
    { teksti: 'Linnalla oli 1550-luvulla peräti yhdeksän suurta kuljetusvenettä, kavassia.', lahde: 'Suomen meriarkeologinen seura: Sisävesihylyt' },
    { teksti: 'Rakennusaikana proomuja suojasi 12–15 haarniskaan ja miekkoihin varustautunutta miestä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
  ],
};

export const TILA = {
  id: 'laituri',
  nimi: 'Laituri',
  kohdistettava: true,
  // Ulkotila (erä 3): kohdistettuna aurinko ja taivas pysyvät täysinä (ei valaistus.sisalla-himmennystä).
  ulkona: true,
  rajat: { min: [-27, -7.5, 33], max: [-11, -3, 47] },
  naapurit: ['massa', 'vartiotupa'],
  kamera: { kohde: [-19, -5.5, 40], atsimuutti: 200, korkeus: 24, etaisyys: 22, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-19, -6.5, 40], atsimuutti: 200, korkeus: 26, etaisyys: 30, fov: 38, aukko: 0.8 },
  pulu: { laskeutuminen: [-22, -6, 36], taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [],
  palikat: [
    { resepti: 'laatta', paikka: [-22, -6.2, 40], suunta: 0, leveys: 4, syvyys: 12, paksuus: 0.2 },
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
