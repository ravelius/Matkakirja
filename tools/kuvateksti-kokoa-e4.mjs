/*
 * Kokoaa erän 4 toimittajatulosteista kuvateksti-kohdista.mjs:n
 * syötteen. VANHA teksti otetaan AINA poimitusta kohdejoukosta id:n
 * perusteella — toimittaja ei koskaan toista vanhaa tekstiä, joten
 * korjaus ei voi osua väärään kenttään.
 *
 * Käyttö: node tools/kuvateksti-kokoa-e4.mjs <kaikki.json> <tiedosto.js> <ulos1.json> [ulos2.json …]
 *         > muutokset.json
 */
import { readFileSync } from 'node:fs';

const [kaikkiPolku, kohdeTiedosto, ...ulosPolut] = process.argv.slice(2);
const kaikki = JSON.parse(readFileSync(kaikkiPolku, 'utf8'));
const kartta = new Map(kaikki.map((k) => [k.id, k]));

const muutokset = [];
const ohitetut = [];

for (const p of ulosPolut) {
  for (const v of JSON.parse(readFileSync(p, 'utf8'))) {
    const k = kartta.get(v.id);
    if (!k) { ohitetut.push(`tuntematon id ${v.id}`); continue; }
    if (v.uusi_selite && v.uusi_selite !== k.selite) {
      muutokset.push({
        tiedosto: kohdeTiedosto,
        kentta: 'selite',
        vanha: k.selite,
        uusi: v.uusi_selite,
      });
    }
    if (v.uusi_teksti && v.uusi_teksti !== k.teksti) {
      muutokset.push({
        tiedosto: kohdeTiedosto,
        kentta: 'teksti',
        vanha: k.teksti,
        uusi: v.uusi_teksti,
      });
    }
  }
}

if (ohitetut.length) {
  console.error(`OHITETTU: ${ohitetut.length}`);
  for (const o of ohitetut) console.error('  ' + o);
}
console.error(`Muutoksia: ${muutokset.length}`);
console.log(JSON.stringify(muutokset, null, 2));
