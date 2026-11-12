#!/usr/bin/env node
/*
 * VANHA OVI, SULJETTU (KK 12.11.2026 klo 17.30, vanhan js:n poisto vaihe 1: "yksi ovi"). Vanha päätösloki
 * docs/raamattu-loki/ on luettavaa historiaa (node tools/loki-hae.mjs). Uusi päätös kirjataan:
 *   node tools/kirjaa.mjs paatos <aihe> --klo HH.MM --kuka KK|PT "<omistajan sanat>"
 * Aihe löytyy: node tools/kirjaa.mjs hae "<sanat>".
 */
console.error('tools/raamattu-kirjaa.mjs on suljettu. Kirjaa päätös:\n'
  + '  node tools/kirjaa.mjs paatos <aihe> --klo HH.MM --kuka KK|PT "<omistajan sanat>"\n'
  + 'Aihe: node tools/kirjaa.mjs hae "<sanat>". Vanha loki: node tools/loki-hae.mjs.');
process.exit(2);
