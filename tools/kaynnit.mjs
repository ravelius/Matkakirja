#!/usr/bin/env node
/**
 * Kävijälaskurin luku (tools/pollo/kaynnit.js) Postivahdille ja omistajalle.
 *
 *   POLLO_KEHITTAJAKOODI=… node tools/kaynnit.mjs [päiviä, oletus 14] [--json]
 *
 * Tulostaa päivittäiset ulkopuoliset kävijät maittain ja alustoittain sekä
 * apurahakortin avaukset ja esittelylinssit. Rivi "ULKOPUOLISIA KÄVIJÖITÄ"
 * kertoo, onko jaksolla ollut yksikään ulkopuolinen (Postivahti ilmoittaa
 * ensimmäisestä Päätoimittajalle). Koodi luetaan vain ympäristöstä, eikä
 * sitä tulosteta.
 */
import { POLLOPALVELIN } from '../js/packs/pollo-asetukset.js';

const koodi = process.env.POLLO_KEHITTAJAKOODI;
if (!koodi) { console.error('POLLO_KEHITTAJAKOODI puuttuu ympäristöstä'); process.exit(2); }
const paivia = Number.parseInt(process.argv.find((a) => /^\d+$/.test(a)) ?? '14', 10);
const v = await fetch(POLLOPALVELIN, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-pollo-kehittaja': koodi },
  body: JSON.stringify({ tehtava: 'kaynnit', paivia }),
});
if (!v.ok) { console.error(`luku epäonnistui: ${v.status}`); process.exit(1); }
const { paivat } = await v.json();
if (process.argv.includes('--json')) { console.log(JSON.stringify(paivat, null, 2)); process.exit(0); }
let yht = 0;
for (const p of paivat) {
  yht += p.kavijoita;
  if (!p.kavijoita) continue;
  const maat = Object.entries(p.maat).map(([m, n]) => `${m} ${n}`).join(', ');
  const alustat = Object.entries(p.alustat).map(([a, n]) => `${a} ${n}`).join(', ');
  console.log(`${p.pvm}: ${p.kavijoita} kävijää (${alustat}; ${maat}), apurahakortti ${p.apuraha}, esittelylinssit ${p.esittelylinssit}, ensimmäinen ${p.ensimmainen} UTC`);
}
console.log(`ULKOPUOLISIA KÄVIJÖITÄ ${paivia} päivässä: ${yht}`);
