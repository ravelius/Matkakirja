/*
 * Erän 4 työpakettien poiminta: maa-kategoriat.js:n nostot, joiden
 * selite ylittää rajan. Tulostaa JSON-taulukon, jossa kullakin
 * kohteella on vakaa id (MAA/kategoria/#n) sekä selite JA teksti,
 * jotta ylimenevä asiasisältö voidaan siirtää leipätekstin loppuun.
 *
 * Käyttö: node tools/kuvateksti-poimi-e4.mjs [--raja=260] [--maat=CYP,YEM]
 */
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';

const RAJA = Number(process.argv.find((a) => a.startsWith('--raja='))?.slice(7) ?? 260);
const maatArg = process.argv.find((a) => a.startsWith('--maat='))?.slice(7);
const SUODATIN = maatArg ? new Set(maatArg.split(',')) : null;

const ulos = [];
for (const [maa, kategoriat] of Object.entries(MAA_KATEGORIAT)) {
  if (SUODATIN && !SUODATIN.has(maa)) continue;
  for (const kat of kategoriat ?? []) {
    const katId = kat.id ?? kat.nimi;
    (kat.nostot ?? []).forEach((n, i) => {
      if (typeof n.selite !== 'string' || n.selite.length <= RAJA) return;
      ulos.push({
        id: `${maa}/${katId}/${i}`,
        maa,
        kategoria: katId,
        otsikko: n.otsikko ?? '',
        tiedosto: n.tiedosto ?? '',
        lahde: n.lahde ?? '',
        selite: n.selite,
        selite_mrk: n.selite.length,
        teksti: n.teksti ?? '',
        teksti_mrk: (n.teksti ?? '').length,
      });
    });
  }
}

console.log(JSON.stringify(ulos, null, 2));
