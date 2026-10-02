/**
 * UI-POHJIEN TYYLITIEDOSTOT KIINTEÄSSÄ LATAUSJÄRJESTYKSESSÄ (Natiivi-UI 2.10.2026: jako pohjittain, jotta rinnakkaiset
 * pinta-PR:t eivät kirjoita samaan tiedostoon). Tokenit ovat css/styles.css:n TYYLIKIRJA-lohkossa; sitten pohjat
 * (css/pohjat/<pohja>.css, nimet tyylikirja.json:n pohjien mukaan) ja lopuksi puetut pinnat (css/pohjat/pinnat/).
 *
 * Sama lista on sw.js:n SHELLissä, tools/build-standalone.mjs:n STYLES-listalla ja tyylikirja.html:n <link>-riveissä;
 * tests/pohjat-tyylit.test.mjs vahtii, että ne pysyvät samoina. Uusi pinta = uusi tiedosto listan loppuun.
 */
export const POHJAT_TYYLIT = [
  'css/pohjat/perus.css',
  'css/pohjat/nostokortti.css',
  'css/pohjat/kortti.css',
  'css/pohjat/paneeli.css',
  'css/pohjat/kentta.css',
  'css/pohjat/auto.css',
  'css/pohjat/esikatselu.css',
  'css/pohjat/pinnat/dialogit.css',
  'css/pohjat/pinnat/pillerivalikko.css',
  'css/pohjat/pinnat/visa.css',
  'css/pohjat/pinnat/karttaselite.css',
  'css/pohjat/pinnat/linssin-valikko.css',
  'css/pohjat/pinnat/linssivalitsin.css',
  'css/pohjat/pinnat/ajattelija.css',
];
