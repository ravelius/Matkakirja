// Euroopan 45 kaupungin matkakirja- ja pulutekstit perkausta varten
// (Fable 8.9.2026). Lukee js/packs/fokusvirta-*.js ja js/packs/europe.js.
// Ajo: node tools/dumppaa-eurooppa.mjs [kaupunki-id ...]
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { EUROPE } from '../js/packs/europe.js';
const ids = process.argv.slice(2);
const cities = EUROPE.cities.filter((c) => !ids.length || ids.includes(c.id));
for (const c of cities) {
  const v = FOKUSVIRRAT[c.id];
  if (!v) { console.log(`## ${c.id} — EI PAKKIA\n`); continue; }
  const m = v.matkakirja ?? {};
  const p = v.pollo ?? {};
  // Jokainen kupla erikseen omine pituuksineen (yläraja 125, Raamattu:
  // PULUN KUPLASSA PULUN NAKOKULMA, RAJA 125). Toinen kupla on kuittaus
  // isoisälle niissä kaupungeissa, joissa se on.
  const kuplat = Array.isArray(p.kommentti) ? p.kommentti : [p.kommentti ?? ''];
  console.log(`## ${c.id} — ${c.name ?? ''}`);
  console.log(`Paikkarivi: ${m.paikkarivi ?? '(puuttuu)'}`);
  console.log(`Teksti (${(m.teksti ?? '').length} merkkiä, yläraja 400): ${m.teksti ?? '(puuttuu)'}`);
  if (p.huudahdus) console.log(`Huudahdus: "${p.huudahdus.teksti}" kohdassa "${p.huudahdus.kohta}"`);
  kuplat.forEach((kupla, i) => {
    // Venetsia on kuuden kuplan poikkeus eikä sen kakkonen ole kuittaus.
    const nimi = (i === 1 && kuplat.length === 2) ? 'Pulu 2, kuittaus' : `Pulu ${i + 1}`;
    console.log(`${nimi} (${kupla.length} merkkiä): ${kupla}`);
  });
  console.log('');
}
