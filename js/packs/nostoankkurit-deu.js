/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: DEU (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso DEU --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa DEU): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_DEU = {
  'nosto:bodensee': { lat: 47.599792, lng: 9.350000 },
  'nosto:brocken': { lat: 51.800235, lng: 10.616000 },
  'nosto:dresden': { lat: 51.050153, lng: 13.736000 },
  'nosto:elbe': { lat: 53.049852, lng: 11.750000 },
  'nosto:feldberg': { lat: 47.873311, lng: 8.006000 },
  'nosto:grosser-arber': { lat: 49.112521, lng: 13.136000 },
  'nosto:hahmotelma-ansbach': { lat: 49.300389, lng: 10.583000 },
  'nosto:hahmotelma-bad-ems': { lat: 50.339011, lng: 7.712000 },
  'nosto:hahmotelma-bayreuth': { lat: 49.960486, lng: 11.579000 },
  'nosto:hahmotelma-bernkastel': { lat: 49.916791, lng: 7.070000 },
  'nosto:hahmotelma-chiemsee': { lat: 47.889790, lng: 12.470000 },
  'nosto:hahmotelma-externsteine': { lat: 51.785799, lng: 8.863989 },
  'nosto:hahmotelma-freiberg': { lat: 50.823021, lng: 13.399897 },
  'nosto:hahmotelma-hambach': { lat: 49.325871, lng: 8.117000 },
  'nosto:hahmotelma-hameln': { lat: 52.098937, lng: 9.248725 },
  'nosto:hahmotelma-helgoland': { lat: 54.181734, lng: 7.886000 },
  'nosto:hahmotelma-hermannsdenkmal': { lat: 51.994814, lng: 8.803435 },
  'nosto:hahmotelma-hohenzollern': { lat: 48.323871, lng: 8.957461 },
  'nosto:hahmotelma-jena': { lat: 50.927479, lng: 11.525175 },
  'nosto:hahmotelma-lueneburger-heide': { lat: 53.169315, lng: 9.941000 },
  'nosto:hahmotelma-maulbronn': { lat: 49.001001, lng: 8.813000 },
  'nosto:hahmotelma-meissen': { lat: 51.287071, lng: 13.488786 },
  'nosto:hahmotelma-muengsten': { lat: 51.161290, lng: 7.133000 },
  'nosto:hahmotelma-oberammergau': { lat: 47.526207, lng: 11.051449 },
  'nosto:hahmotelma-quedlinburg': { lat: 51.790618, lng: 11.155894 },
  'nosto:hahmotelma-rammelsberg': { lat: 51.996286, lng: 10.524262 },
  'nosto:hahmotelma-rothenburg': { lat: 49.383756, lng: 10.184000 },
  'nosto:hahmotelma-ruedesheim': { lat: 49.983475, lng: 7.931000 },
  'nosto:hahmotelma-ruegen': { lat: 54.573422, lng: 13.577742 },
  'nosto:hahmotelma-saalburg': { lat: 50.270314, lng: 8.567000 },
  'nosto:hahmotelma-saechsische-schweiz': { lat: 50.930426, lng: 14.373306 },
  'nosto:hahmotelma-spreewald': { lat: 51.914850, lng: 13.925000 },
  'nosto:hahmotelma-sylt': { lat: 54.900435, lng: 8.333000 },
  'nosto:hahmotelma-triberg': { lat: 48.131922, lng: 8.231000 },
  'nosto:hahmotelma-voelklingen': { lat: 49.244766, lng: 6.851000 },
  'nosto:hampuri': { lat: 53.550808, lng: 9.995000 },
  'nosto:hetki-gutenberg-paino-1454': { lat: 49.999400, lng: 8.273600 },
  'nosto:hetki-luther-wittenberg-1517': { lat: 51.866400, lng: 12.637800 },
  'nosto:hetki-rontgen-kasi-1895': { lat: 49.859195, lng: 9.919136 },
  'nosto:itameri': { lat: 54.900435, lng: 12.599000 },
  'nosto:kolnin-tuomiokirkko': { lat: 50.941140, lng: 6.959000 },
  'nosto:munchen': { lat: 48.136617, lng: 11.576000 },
  'nosto:nosto-kopenickin-kapteeni': { lat: 52.532302, lng: 13.095200 },
  'nosto:nosto-neuschwanstein': { lat: 47.557276, lng: 10.748000 },
  'nosto:oder': { lat: 52.349353, lng: 14.549000 },
  'nosto:pohjanmeri': { lat: 54.399589, lng: 6.401000 },
  'nosto:rein': { lat: 50.139636, lng: 7.727000 },
  'nosto:ruhrin-alue': { lat: 51.455417, lng: 7.013000 },
  'nosto:sanssouci': { lat: 52.400710, lng: 13.040000 },
  'nosto:skandaali-beringerin-valhekivet': { lat: 49.725754, lng: 9.949464 },
  'nosto:skandaali-hitlerin-paivakirjat': { lat: 53.510905, lng: 9.914743 },
  'nosto:skandaali-kopenickin-kapteeni': { lat: 52.532302, lng: 13.656800 },
  'nosto:tonava': { lat: 48.469347, lng: 10.235000 },
  'nosto:wartburg': { lat: 50.966135, lng: 10.307000 },
  'nosto:watzmann': { lat: 47.554914, lng: 12.923000 },
  'nosto:weser': { lat: 51.815976, lng: 9.401000 },
  'nosto:zugspitze': { lat: 47.420145, lng: 10.985000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_DEU_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
