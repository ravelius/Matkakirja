// Linssien esittelyt ja havainnekuvat webin rekisteristä (js/linssit/rekisteri.js: avattujen linssien LINSSI.esittely ja
// LINSSI.havainnekuva, Sisältökirjuri #3611). Käyttö: node tee-linssi-esittelyt.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const { LINSSIT } = await import(join(juuri, 'js/linssit/rekisteri.js'));
const linssit = {};
for (const { tunnus, tuo } of LINSSIT) {
  if (typeof tuo !== 'function') continue;
  const { LINSSI } = await tuo();
  linssit[tunnus] = { esittely: LINSSI?.esittely ?? null, havainnekuva: LINSSI?.havainnekuva ?? null };
}
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'linssi-esittelyt.json'), `${JSON.stringify({ linssit }, null, 1)}\n`);
console.log('linssi-esittelyt.json:', Object.keys(linssit).length, 'avattua linssiä');
