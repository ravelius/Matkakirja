// Ihmisen matkan kertomus, kohteet ja kertomusmanifesti testeille.
// Manifesti: curl -o kertomus-manifesti.json https://media.matkakirja.app/aikajana/ihmisen-matka/puhe/kertomus-manifesti.json
// Käyttö: node tee-ihmisen-matka.mjs [pelin checkout]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const K = await import(join(juuri, 'js/linssit/ihmisen-matka-kertomus.js'));
const D = await import(join(juuri, 'js/linssit/ihmisen-matka-data.js'));
const E = await import(join(juuri, 'js/linssit/ihmisen-matka-esitys.js'));
const L = await import(join(juuri, 'js/linssit/ihmisen-matka-luenta.js'));
const manifesti = JSON.parse(readFileSync(join(tama, 'kertomus-manifesti.json'), 'utf8'));
const kertomus = K.IHMISEN_MATKA_KERTOMUS.map((j) => ({
  id: j.id, vaihe: j.vaihe, kohde: j.kohde ?? null, hiljaiset: j.hiljaiset ?? [], alue: j.alue ?? null,
  vuosia: j.vuosia ?? null, teksti: j.teksti ?? '', pulu: j.pulu ?? null,
  tunne: j.tunne?.tunne ?? null, voimakkuus: j.tunne?.voimakkuus ?? 0, maisema: j.maisema ?? null,
}));
const kohteet = Object.fromEntries(D.IHMISEN_MATKA.map((t) => [t.tunnus, [t.lat, t.lon]]));
const leimat = L.jaksojenAikaleimat ? Object.fromEntries(L.jaksojenAikaleimat(manifesti)) : null;
const avaus = manifesti.jaksot[0];
const sana = E.sananHetki(K.IHMISEN_MATKA_KERTOMUS[0].teksti, E.AVAUKSEN_SANA,
  leimat.avaus.kesto, L.jaksonAikaleimat(leimat.avaus));
const vaiheet = E.avauksenVaiheet({ lauseet: L.jaksonAikaleimat(leimat.avaus).lauseet, sana, kesto: leimat.avaus.kesto });
writeFileSync(join(tama, 'ihmisen-matka.json'), JSON.stringify({ kertomus, kohteet, leimat, avauksenSana: sana, avauksenVaiheet: vaiheet }));
console.log('ihmisen-matka.json:', kertomus.length, 'jaksoa,', Object.keys(kohteet).length, 'kohdetta, sana', sana, vaiheet);
