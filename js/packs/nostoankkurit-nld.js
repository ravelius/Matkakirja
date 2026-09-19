/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: NLD (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso NLD --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa NLD): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_NLD = {
  'nosto:afsluitdijk': { lat: 53.033269, lng: 5.278929 },
  'nosto:bourtange': { lat: 53.005561, lng: 7.193000 },
  'nosto:deltatyot': { lat: 51.699416, lng: 3.719000 },
  'nosto:domtoren': { lat: 52.089829, lng: 5.120000 },
  'nosto:giethoorn': { lat: 52.739285, lng: 6.077000 },
  'nosto:hahmotelma-biesbosch': { lat: 51.728183, lng: 4.751012 },
  'nosto:hahmotelma-borger': { lat: 52.916902, lng: 6.800000 },
  'nosto:hahmotelma-cruquius': { lat: 52.329361, lng: 4.667415 },
  'nosto:hahmotelma-dokkum': { lat: 53.326060, lng: 6.005986 },
  'nosto:hahmotelma-dwingelderveld': { lat: 52.803718, lng: 6.398000 },
  'nosto:hahmotelma-edam': { lat: 52.516701, lng: 5.051000 },
  'nosto:hahmotelma-elburg': { lat: 52.407306, lng: 5.842557 },
  'nosto:hahmotelma-enkhuizen': { lat: 52.711630, lng: 5.300133 },
  'nosto:hahmotelma-franeker': { lat: 53.156317, lng: 5.533509 },
  'nosto:hahmotelma-gouda': { lat: 51.980346, lng: 4.769411 },
  'nosto:hahmotelma-het-loo': { lat: 52.233118, lng: 5.945000 },
  'nosto:hahmotelma-hindeloopen': { lat: 52.953498, lng: 5.399047 },
  'nosto:hahmotelma-hoorn': { lat: 52.637969, lng: 5.065943 },
  'nosto:hahmotelma-kampen': { lat: 52.558324, lng: 5.923641 },
  'nosto:hahmotelma-keukenhof': { lat: 52.278891, lng: 4.527071 },
  'nosto:hahmotelma-kinderdijk': { lat: 51.837282, lng: 4.658791 },
  'nosto:hahmotelma-leiden': { lat: 52.154815, lng: 4.498912 },
  'nosto:hahmotelma-naarden': { lat: 52.295727, lng: 5.162000 },
  'nosto:hahmotelma-nuenen': { lat: 51.473483, lng: 5.546000 },
  'nosto:hahmotelma-oostvaardersplassen': { lat: 52.484075, lng: 5.366402 },
  'nosto:hahmotelma-orvelte': { lat: 52.843684, lng: 6.659000 },
  'nosto:hahmotelma-oudewater': { lat: 52.054397, lng: 4.880559 },
  'nosto:hahmotelma-schiermonnikoog': { lat: 53.489190, lng: 6.224000 },
  'nosto:hahmotelma-sneek': { lat: 53.032139, lng: 5.660000 },
  'nosto:hahmotelma-terschelling': { lat: 53.401080, lng: 5.318000 },
  'nosto:hahmotelma-texel': { lat: 53.057184, lng: 4.798982 },
  'nosto:hahmotelma-thorn': { lat: 51.165823, lng: 5.834000 },
  'nosto:hahmotelma-urk': { lat: 52.663677, lng: 5.600000 },
  'nosto:hahmotelma-vlieland': { lat: 53.299630, lng: 5.066000 },
  'nosto:krollermuller': { lat: 52.096551, lng: 5.816000 },
  'nosto:maas': { lat: 51.369550, lng: 6.170000 },
  'nosto:maastricht': { lat: 50.850187, lng: 5.684000 },
  'nosto:nijmegen': { lat: 51.847449, lng: 5.864000 },
  'nosto:nosto-afsluitdijk': { lat: 52.989838, lng: 5.156071 },
  'nosto:nosto-kirja-arkku': { lat: 51.815976, lng: 5.021000 },
  'nosto:nosto-leeuwenhoek': { lat: 51.933571, lng: 4.241357 },
  'nosto:nosto-tulppaanimania': { lat: 52.632523, lng: 4.751000 },
  'nosto:pohjanmeri': { lat: 53.401080, lng: 4.199000 },
  'nosto:skandaali-naundorff-delftin-valekuningas': { lat: 52.045412, lng: 4.429378 },
  'nosto:skandaali-oera-linda-kasikirjoitus': { lat: 53.203500, lng: 5.790300 },
  'nosto:skandaali-van-meegerenin-vermeerit': { lat: 51.945981, lng: 4.486336 },
  'nosto:vaalserberg': { lat: 50.754579, lng: 6.020000 },
  'nosto:vredespaleis': { lat: 52.069379, lng: 4.231093 },
  'nosto:woudagemaal': { lat: 52.845903, lng: 5.678000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_NLD_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
