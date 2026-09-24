#!/usr/bin/env node
/*
 * ANALYSOI NATIIVI-SULAVUUS — laskee p50/p95/p99/max ja tökkäysosuudet
 * 3D-selvittäjän KehysMittari.cs:n raakadatasta (Documents/mittaus-<nimi>.txt,
 * yksi kehysaika millisekunteina per rivi).
 *
 * Kynnykset 120 Hz -laitteelle (Fable/omistaja 23.9.2026): pieni tökkäys
 * > 12,5 ms (1,5× 8,33 ms tavoite), iso tökkäys > 33 ms.
 *
 *   node tools/mittaus/analysoi-natiivi-sulavuus.mjs <tiedosto.txt> [nimi]
 */
import { readFileSync } from 'node:fs';

const [, , polku, nimiArg] = process.argv;
if (!polku) {
  console.error('Käyttö: node tools/mittaus/analysoi-natiivi-sulavuus.mjs <mittaus-nimi.txt> [nimi]');
  process.exit(1);
}
const nimi = nimiArg ?? polku.replace(/.*mittaus-/, '').replace(/\.txt$/, '');
const PIENI_TOKKAYS_MS = 12.5;
const ISO_TOKKAYS_MS = 33;

const rivit = readFileSync(polku, 'utf8').split('\n').map((r) => r.trim()).filter(Boolean);
const kehykset = rivit.map(Number).filter((n) => Number.isFinite(n));
if (kehykset.length === 0) {
  console.error(`Ei kelvollisia kehysaikoja tiedostossa ${polku}`);
  process.exit(1);
}
const lajiteltu = [...kehykset].sort((a, b) => a - b);
const p = (q) => lajiteltu[Math.min(lajiteltu.length - 1, Math.floor(q * lajiteltu.length))];
const pienia = kehykset.filter((ms) => ms > PIENI_TOKKAYS_MS && ms <= ISO_TOKKAYS_MS).length;
const isoja = kehykset.filter((ms) => ms > ISO_TOKKAYS_MS).length;

const tulos = {
  nimi,
  kehyksia: kehykset.length,
  p50: +p(0.5).toFixed(2),
  p95: +p(0.95).toFixed(2),
  p99: +p(0.99).toFixed(2),
  max: +lajiteltu.at(-1).toFixed(2),
  pieniaTokkayksia: pienia,
  pieniaOsuus: +(100 * pienia / kehykset.length).toFixed(2),
  isojaTokkayksia: isoja,
  isojaOsuus: +(100 * isoja / kehykset.length).toFixed(2),
};
console.log(JSON.stringify(tulos, null, 1));
