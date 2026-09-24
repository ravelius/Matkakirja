// Ihmisen matkan nostojen korttikentät verkkopelin koodista (js/linssit/ihmisen-matka-kortti.js
// kokoaNostot + lyhytAjoitus, js/linssit/ihmisen-matka.js ihmisenMatkanPysakit) sekä
// tiedeliitteen kuvat (js/tiedeliite.js tiedeliitteenKuvat, onTiedeliitteenSivu).
// C#-testi (TutkimusTestit) vaatii samat arvot IhmisenMatkaAineistolta.
//
// Käyttö: node Linssit-testit/kultaiset/tee-nostot.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = process.argv[2] ?? '/Users/Shared/Claude/wt/linssiseppa-webmain';
const tuo = (nimi) => import(pathToFileURL(join(JUURI, nimi)).href);

const K = await tuo('js/linssit/ihmisen-matka-kortti.js');
const M = await tuo('js/linssit/ihmisen-matka.js');
const D = await tuo('js/linssit/ihmisen-matka-data.js');
const T = await tuo('js/tiedeliite.js');

const pysakit = M.ihmisenMatkanPysakit();
const nostot = K.kokoaNostot(pysakit, D.IHMISEN_MATKA_LISANOSTOT ?? []).map((n) => ({
  tunnus: n.tunnus, laji: n.laji, indeksi: n.indeksi, otsikko: n.otsikko,
  teksti: n.teksti, kuva: n.kuva, kuvaSelite: n.kuvaSelite, esine: n.esine, esineSelite: n.esineSelite,
  kuvaAito: n.kuvaAito, kuvaAitoSelite: n.kuvaAitoSelite, tekija: n.kuvaAitoTiedot?.tekija ?? null,
  lahde: n.lahde, juttu: n.juttu, lyhytAjoitus: K.lyhytAjoitus(n),
}));
const sivut = pysakit.map((t, i) => {
  const { kasvot, ilmiot } = T.tiedeliitteenKuvat(t);
  const os = (k) => (typeof k === 'string' ? k : k?.osoite ?? null);
  return { i, sivu: T.onTiedeliitteenSivu(t), kasvot: kasvot.map(os), vara: t.kuva?.vara ?? null, ilmiot: ilmiot.map(os) };
});
writeFileSync(join(TAMA, 'nostot.json'), JSON.stringify({ nostot, sivut }, null, 1) + '\n');
console.log(`nostot.json: ${nostot.length} nostoa, ${sivut.filter((s) => s.sivu).length} sivua`);
