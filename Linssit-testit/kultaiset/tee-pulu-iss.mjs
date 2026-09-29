// Pulun ISS-tervetulon (A1–A2, omistaja 29.9.2026: B ja C pois, ei kuplia) kultaiset arvot: repliikit, äänitteet, kestot,
// jakso ja vakiot (js/livia.js LIVIAN_ISS, js/liviapuhe.js, js/linssit/pulu-tervetulo.js ja pulu-iss.js, PR #3575).
// Käyttö: node tee-pulu-iss.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const P = await import(join(juuri, 'js/liviapuhe.js'));
const T = await import(join(juuri, 'js/linssit/pulu-tervetulo.js'));
const I = await import(join(juuri, 'js/linssit/pulu-iss.js'));
const jakso = T.PULUN_TERVETULON_JAKSO.map((r) => {
  const rep = I.pulunIssRepliikki(r.ryhma, r.indeksi);
  return {
    avain: rep.avain, lahde: rep.lahde, indeksi: rep.indeksi, teksti: rep.teksti, kestoMs: rep.kestoMs,
    aani: P.LIVIAN_VERSIOIDUT_AANET[rep.avain],
  };
});
const vakiot = {
  talle: T.PULUN_TERVETULO_TALLE, viiveMs: T.PULUN_TERVETULON_VIIVE_MS, kyselyMs: T.PULUN_TERVETULON_KYSELY_MS,
  kattoMs: T.PULUN_TERVETULON_KATTO_MS, hengahdysMs: I.PULUN_ISS_HENGAHDYS_MS, varaMs: I.PULUN_ISS_VARA_MS,
};
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'pulu-iss.json'), JSON.stringify({ jakso, vakiot }, null, 1));
console.log('pulu-iss.json:', jakso.length, 'repliikkiä');
