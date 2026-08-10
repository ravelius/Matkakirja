/*
 * Karsii jo haetuista ehdokaslistoista ne, jotka uusi seula hylkää.
 *
 *   node tools/siivoa-vuoriehdokkaat.mjs
 *
 * Seula (tools/hae-vuorikuvat.mjs: kelpaaKuva) tarkentuu sitä mukaa
 * kuin silmätarkistus paljastaa uusia roskaluokkia — arkistojen
 * albumiaukeamia, karttalehtiä. Ilman tätä koko haku pitäisi ajaa
 * uudelleen, ja se veisi tunnin. Tämä ottaa saman seulan ja ajaa sen
 * valmiiden listojen yli.
 *
 * Kohteet, joista on JO valittu kuvat peliin, EIVÄT muutu tästä:
 * valinta on tehty tiedostonimellä, ei järjestysnumerolla.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { kelpaaKuva } from './hae-vuorikuvat.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kansio = join(JUURI, 'tools', 'vuorikuva-aineisto');

let poistettu = 0;
for (const nimi of readdirSync(kansio).filter((f) => f.endsWith('.json'))) {
  const polku = join(kansio, nimi);
  const ennen = JSON.parse(readFileSync(polku, 'utf8'));
  const jalkeen = ennen.filter((t) => kelpaaKuva(t.tiedosto));
  if (jalkeen.length === ennen.length) continue;
  poistettu += ennen.length - jalkeen.length;
  console.log(`${nimi.replace('.json', '').padEnd(28)} ${ennen.length} → ${jalkeen.length}`);
  writeFileSync(polku, `${JSON.stringify(jalkeen, null, 1)}\n`);
}
console.log(`\npoistettu yhteensä ${poistettu} ehdokasta`);
