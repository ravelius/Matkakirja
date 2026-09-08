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
  const kupla = Array.isArray(p.kommentti) ? p.kommentti.join(' | ') : (p.kommentti ?? '');
  console.log(`## ${c.id} — ${c.name ?? ''}`);
  console.log(`Paikkarivi: ${m.paikkarivi ?? '(puuttuu)'}`);
  console.log(`Teksti: ${m.teksti ?? '(puuttuu)'}`);
  if (p.huudahdus) console.log(`Huudahdus: "${p.huudahdus.teksti}" kohdassa "${p.huudahdus.kohta}"`);
  console.log(`Pulu (${kupla.length} merkkiä): ${kupla}\n`);
}
