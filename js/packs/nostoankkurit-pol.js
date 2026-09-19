/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: POL (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso POL --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa POL): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_POL = {
  'nosto:auschwitz': { lat: 50.036326, lng: 19.178000 },
  'nosto:elblaginkanava': { lat: 54.024490, lng: 19.598000 },
  'nosto:gniezno': { lat: 52.536759, lng: 17.597000 },
  'nosto:hahmotelma-bialowieza': { lat: 52.750398, lng: 23.951000 },
  'nosto:hahmotelma-biebrza': { lat: 53.467172, lng: 22.661000 },
  'nosto:hahmotelma-biskupin': { lat: 52.788170, lng: 17.744000 },
  'nosto:hahmotelma-bochnia': { lat: 49.969683, lng: 20.417000 },
  'nosto:hahmotelma-boleslawiec': { lat: 51.267749, lng: 15.566000 },
  'nosto:hahmotelma-ciechocinek': { lat: 52.883983, lng: 18.803312 },
  'nosto:hahmotelma-dunajec-gorge': { lat: 49.413841, lng: 20.429000 },
  'nosto:hahmotelma-frombork': { lat: 54.349538, lng: 19.682000 },
  'nosto:hahmotelma-grunwald': { lat: 53.486989, lng: 20.126000 },
  'nosto:hahmotelma-kalwaria': { lat: 49.801940, lng: 19.683357 },
  'nosto:hahmotelma-kartuzy': { lat: 54.334299, lng: 18.200000 },
  'nosto:hahmotelma-kazimierz': { lat: 51.322059, lng: 21.947000 },
  'nosto:hahmotelma-kornik': { lat: 52.244302, lng: 17.090000 },
  'nosto:hahmotelma-lancut': { lat: 50.068480, lng: 22.235000 },
  'nosto:hahmotelma-legnica': { lat: 51.145422, lng: 16.223000 },
  'nosto:hahmotelma-lodz': { lat: 51.777742, lng: 19.454000 },
  'nosto:hahmotelma-lowicz': { lat: 52.100424, lng: 19.865744 },
  'nosto:hahmotelma-pszczyna': { lat: 49.969245, lng: 18.941323 },
  'nosto:hahmotelma-sandomierz': { lat: 50.683940, lng: 21.749000 },
  'nosto:hahmotelma-slowinski': { lat: 54.831641, lng: 17.295380 },
  'nosto:hahmotelma-sniardwy': { lat: 53.766082, lng: 21.749000 },
  'nosto:hahmotelma-szczeliniec': { lat: 50.483094, lng: 16.343000 },
  'nosto:hahmotelma-tarnica': { lat: 49.068395, lng: 22.739000 },
  'nosto:hahmotelma-tarnowskie-gory': { lat: 50.444239, lng: 18.857000 },
  'nosto:hahmotelma-wolin': { lat: 53.932614, lng: 14.450000 },
  'nosto:hahmotelma-zakopane': { lat: 49.320367, lng: 19.948700 },
  'nosto:hahmotelma-zywiec': { lat: 49.632524, lng: 19.206552 },
  'nosto:itameri': { lat: 55.200196, lng: 17.501000 },
  'nosto:jasnagora': { lat: 50.811501, lng: 19.097000 },
  'nosto:krzemionki': { lat: 50.968407, lng: 21.503000 },
  'nosto:malbork': { lat: 54.039792, lng: 19.028000 },
  'nosto:nosto-torun-piparkakut': { lat: 53.070799, lng: 18.653925 },
  'nosto:nosto-wieliczka': { lat: 50.061591, lng: 19.656200 },
  'nosto:nosto-wroclawin-kaapiot': { lat: 51.109142, lng: 17.033000 },
  'nosto:odra': { lat: 51.109142, lng: 17.030000 },
  'nosto:rysy': { lat: 49.179829, lng: 20.087000 },
  'nosto:skandaali-walbrzychin-kultajuna': { lat: 50.822200, lng: 16.306700 },
  'nosto:sniezka': { lat: 50.736355, lng: 15.740000 },
  'nosto:syvennys-varsova-tur': { lat: 52.090600, lng: 20.546900 },
  'nosto:veiksel': { lat: 52.962436, lng: 18.556075 },
  'nosto:westerplatte': { lat: 54.408290, lng: 18.671000 },
  'nosto:zamosc': { lat: 50.715849, lng: 23.252000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_POL_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
