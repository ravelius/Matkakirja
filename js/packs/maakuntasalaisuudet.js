/*
 * MAAKUNNAN SALAISUUDET — HAKEMISTO (omistajan päätös 26.9.2026, ELÄVÄ
 * KARTTA, docs/raportit/elava-kartta-suunnitelma-20260926.md kohta 3).
 *
 * Kun pelaaja on löytänyt kaikki maakunnan nostot, ilmestyy piilotettu
 * "maakunnan salaisuus" -nosto: iso, harvinainen ja palkitseva paikka,
 * esine tai tarina, jota maakunnan tavalliset nostot eivät kata.
 *
 * Avain on "<ISO3>:<maakunta-avain>", jossa maakunta-avain on TÄSMÄLLEEN
 * js/packs/maakunnat-nimet.js:n MAAKUNNAT_KAIKKI[ISO3]:n avain. Arvo on
 * salaisuusnoston tunnus; sisältö on maakohtaisessa pakassa
 * (js/packs/maakuntasalaisuudet-<iso>.js). Testi
 * tests/maakuntasalaisuudet.test.mjs vartioi avaimet ja ristiviittaukset.
 * Skeeman kenttä (Siirtoseppä, 1.45) lukee tämän taulun. Maat lisätään
 * tähän samaan tiedostoon yksi kerrallaan: GRC ensin.
 */
export const MAAKUNTASALAISUUDET = {
  'GRC:Ayion Oros': 'nosto:salaisuus-deinokrateen-vuori',
  'GRC:Attiki': 'nosto:salaisuus-eleusiin-mysteerit',
  'GRC:Ipeiros': 'nosto:salaisuus-nekromanteion',
  'GRC:Notio Aigaio': 'nosto:salaisuus-keros',
  'GRC:Anatoliki Makedonia kai Thraki': 'nosto:salaisuus-abdera',
  'GRC:Ionioi Nisoi': 'nosto:salaisuus-melissani',
  'GRC:Stereá Elláda': 'nosto:salaisuus-gla',
  'GRC:Kentriki Makedonia': 'nosto:salaisuus-kastan-kumpu',
  'GRC:Kriti': 'nosto:salaisuus-gortynin-laki',
  'GRC:Dytiki Ellada': 'nosto:salaisuus-chlemoutsi',
  'GRC:Dytiki Makedonia': 'nosto:salaisuus-dispilio',
  'GRC:Peloponnisos': 'nosto:salaisuus-pavlopetri',
  'GRC:Voreio Aigaio': 'nosto:salaisuus-poliokhni',
  'GRC:Thessalia': 'nosto:salaisuus-munkkihylkeet',
};
