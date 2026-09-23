// Tähtitaivaan kultaiset arvot (js/pallolauta/tahdet.js). Käyttö: node tee-tahdet.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const T = await import(join(juuri, 'js/pallolauta/tahdet.js'));
const arpa = T.siemenluvut(20260907);
const luvut = Array.from({ length: 50 }, () => arpa());
const joukot = T.tahtijoukot(undefined, undefined, 1.6).map((j) => ({
  tunnus: j.tunnus, koko: j.koko, n: j.pisteet.length, otos: j.pisteet.filter((_, i) => i % 97 === 0),
}));
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'tahdet.json'), JSON.stringify({ luvut, joukot }));
console.log('tahdet.json', joukot.map((j) => j.n));
