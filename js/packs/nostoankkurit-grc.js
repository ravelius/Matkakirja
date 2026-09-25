/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: GRC (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso GRC --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa GRC): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_GRC = {
  'nosto:aliakmonas': { lat: 39.969311, lng: 21.695000 },
  'nosto:antikythera': { lat: 35.866244, lng: 23.300000 },
  'nosto:delfoi': { lat: 38.473824, lng: 22.484998 },
  'nosto:egeanmeri': { lat: 39.000786, lng: 25.001000 },
  'nosto:epidauros': { lat: 37.596658, lng: 23.075000 },
  'nosto:ermoupoli': { lat: 37.432999, lng: 24.917000 },
  'nosto:evros': { lat: 41.676616, lng: 26.477000 },
  'nosto:hahmotelma-arta': { lat: 39.152087, lng: 20.975000 },
  'nosto:hahmotelma-athos': { lat: 40.192828, lng: 24.279740 },
  'nosto:hahmotelma-bassae': { lat: 37.354331, lng: 21.900599 },
  'nosto:hahmotelma-chios': { lat: 38.378170, lng: 26.066000 },
  'nosto:hahmotelma-delos': { lat: 37.429356, lng: 25.315501 },
  'nosto:hahmotelma-kalavryta': { lat: 38.034611, lng: 22.118000 },
  'nosto:hahmotelma-kastoria': { lat: 40.517673, lng: 21.266000 },
  'nosto:hahmotelma-kerkini': { lat: 41.217011, lng: 23.084000 },
  'nosto:hahmotelma-korfu': { lat: 39.599718, lng: 19.871000 },
  'nosto:hahmotelma-lavrio': { lat: 37.842799, lng: 24.014059 },
  'nosto:hahmotelma-meteora': { lat: 39.714546, lng: 21.632000 },
  'nosto:hahmotelma-metsovo': { lat: 39.770643, lng: 21.185000 },
  'nosto:hahmotelma-milos': { lat: 36.687334, lng: 24.431000 },
  'nosto:hahmotelma-missolonghi': { lat: 38.370431, lng: 21.428000 },
  'nosto:hahmotelma-monemvasia': { lat: 36.737334, lng: 23.057000 },
  'nosto:hahmotelma-naoussa': { lat: 40.633488, lng: 21.997594 },
  'nosto:hahmotelma-navagio': { lat: 37.858581, lng: 20.624000 },
  'nosto:hahmotelma-navarino': { lat: 36.985158, lng: 21.672633 },
  'nosto:hahmotelma-pelion': { lat: 39.438769, lng: 23.045000 },
  'nosto:hahmotelma-pella': { lat: 40.504395, lng: 22.544529 },
  'nosto:hahmotelma-philippi': { lat: 41.012965, lng: 24.287000 },
  'nosto:hahmotelma-prespa': { lat: 40.899444, lng: 21.032000 },
  'nosto:hahmotelma-samaria': { lat: 35.270152, lng: 23.960000 },
  'nosto:hahmotelma-samothrace': { lat: 40.449272, lng: 25.586000 },
  'nosto:hahmotelma-sounion': { lat: 37.691736, lng: 24.003886 },
  'nosto:hahmotelma-thermopylae': { lat: 38.805603, lng: 22.562000 },
  'nosto:hahmotelma-vergina': { lat: 40.318361, lng: 22.303926 },
  'nosto:hahmotelma-vikos': { lat: 39.969311, lng: 20.729000 },
  'nosto:hahmotelma-zagori': { lat: 39.867472, lng: 20.699000 },
  'nosto:ioannina': { lat: 39.663526, lng: 20.852000 },
  'nosto:iraklion': { lat: 35.341508, lng: 25.133000 },
  'nosto:joonianmeri': { lat: 38.000978, lng: 19.001000 },
  'nosto:kalamata': { lat: 37.037252, lng: 22.112000 },
  'nosto:knossos': { lat: 35.293942, lng: 25.023200 },
  'nosto:korintin-kanava': { lat: 37.933684, lng: 22.985000 },
  'nosto:kreetanmeri': { lat: 35.900451, lng: 24.599000 },
  'nosto:marathon': { lat: 38.153546, lng: 23.963000 },
  'nosto:nafplio': { lat: 37.615502, lng: 22.799000 },
  'nosto:nosto-sofia-korut': { lat: 37.728986, lng: 22.757000 },
  'nosto:olympia': { lat: 37.638188, lng: 21.629000 },
  'nosto:olympos': { lat: 40.086313, lng: 22.358000 },
  'nosto:parnassos': { lat: 38.542894, lng: 22.642002 },
  'nosto:patras': { lat: 38.249126, lng: 21.734000 },
  'nosto:pikkupollo': { lat: 37.749730, lng: 26.834000 },
  'nosto:pindos': { lat: 39.500109, lng: 21.350000 },
  'nosto:psiloritis': { lat: 35.230494, lng: 24.770000 },
  'nosto:reunuskilpikonna': { lat: 38.499345, lng: 23.999000 },
  'nosto:rodoksen-kolossi': { lat: 36.383434, lng: 28.217000 },
  'nosto:santorini': { lat: 36.415092, lng: 25.433000 },
  'nosto:skandaali-simonides-kasikirjoitusvaarentaja': { lat: 36.615800, lng: 27.838800 },
  'nosto:smolikas': { lat: 40.088855, lng: 20.915000 },
  'nosto:strymonas': { lat: 41.801856, lng: 23.165000 },
  'nosto:taygetos': { lat: 36.953778, lng: 22.352000 },
  'nosto:thessaloniki': { lat: 40.639171, lng: 22.937000 },
  'nosto:traakianmeri': { lat: 40.401114, lng: 25.049000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_GRC_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
