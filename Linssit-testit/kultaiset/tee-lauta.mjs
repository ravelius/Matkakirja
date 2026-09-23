// Laudan Miller-arkin muunnos (js/fokusmitat.js laudaltaAsteiksi). Käyttö: node tee-lauta.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const F = await import(join(juuri, 'js/fokusmitat.js'));
const K = await import(join(juuri, 'js/linssit/keksinnot.js'));
const pisteet = K.KEKSINNOT.map((t) => ({ x: t.x, y: t.y, lat: t.lat, lon: t.lon, a: F.laudaltaAsteiksi('maailmankartta', t.x, t.y) }));
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'lauta.json'), JSON.stringify({ pisteet }));
console.log('lauta.json', pisteet[0]);
