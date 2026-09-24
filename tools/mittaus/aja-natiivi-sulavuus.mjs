#!/usr/bin/env node
/*
 * PYSYVÄ SULAVUUSPORTTI — NATIIVI (Laitetestaaja, Fable 23.9.2026).
 *
 * Ajaa 3D-selvittäjän komentotiedostoprotokollalla vakiokierroksen
 * (kaupunki, veto, heitto, nipistys, kamera-ajo/"lento") iPadilla ja
 * lisää yhden rivin lokiin docs/raportit/sulavuus-natiivi-loki.md
 * (pvm, proto-commit, p50/p95/max, tökkäysosuudet). Tarkoitus: ajaa
 * jokaisen natiivin VP:n (virstanpylväs) jälkeen samalla menetelmällä
 * kuin ensimmäinen vertailu (docs/raportit/sulavuus-natiivi-vs-web-20260923.md).
 *
 * MUISTUTUS: iPad on jaettu 3D-selvittäjän kanssa. Sovi "iPad vapaa?"
 * ennen ajoa ja ilmoita "iPad pois" jälkeen — tämä skripti EI hoida
 * sitä koordinaatiota (session-tason viestintä, ei skriptin vastuulla).
 *
 * Ääni: mykistetään ajon ajaksi (osascript), palautetaan lopuksi
 * (omistajan pysyvä sääntö 23.9.2026) — myös jos ajo epäonnistuu.
 *
 *   node tools/mittaus/aja-natiivi-sulavuus.mjs
 *       DEVICE=<UDID>            (oletus: iPad Pro 11" M5, jaettu)
 *       APP=<bundle-id>          (oletus: app.matkakirja.proto3d)
 *       PROTO_REPO=<polku>       (oletus: /Users/Shared/Claude/proto-3d/Matkakirja-proto)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DEVICE = process.env.DEVICE ?? '00008142-0019686E02F3801C';
const APP = process.env.APP ?? 'app.matkakirja.proto3d';
const PROTO_REPO = process.env.PROTO_REPO ?? '/Users/Shared/Claude/proto-3d/Matkakirja-proto';
const LOKI = join(JUURI, 'docs/raportit/sulavuus-natiivi-loki.md');
const NIMI = 'vakio';
const PIENI_TOKKAYS_MS = 12.5;
const ISO_TOKKAYS_MS = 33;

const aja = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const devicectl = (args) => aja('bash', ['-c', `xcrun devicectl ${args.map((a) => `'${a.replace(/'/g, `'\\''`)}'`).join(' ')}`]);

const VAKIOKIERROS = [
  'kaupunki pariisi',
  'odota 3',
  'mittaus alku vakio',
  'veto 0.5 0.35 0.35 0.75 0.7',
  'odota 1.5',
  'veto 0.35 0.75 0.2 0.9 0.25',
  'odota 2',
  'nipistys 0.5 0.5 0.2 0.6 0.8',
  'odota 2',
  'aja 48.8 4.5 8 1.5',
  'odota 2',
  'mittaus loppu vakio',
].join('\n') + '\n';

function mykista(paalla) {
  try { execFileSync('osascript', ['-e', `set volume output muted ${paalla ? 'true' : 'false'}`]); } catch { /* ei audiolaitetta: ei este */ }
}

function analysoi(polku) {
  const kehykset = readFileSync(polku, 'utf8').split('\n').map((r) => r.trim()).filter(Boolean).map(Number).filter(Number.isFinite);
  if (!kehykset.length) throw new Error(`Ei kehysaikoja: ${polku}`);
  const lajiteltu = [...kehykset].sort((a, b) => a - b);
  const p = (q) => lajiteltu[Math.min(lajiteltu.length - 1, Math.floor(q * lajiteltu.length))];
  const pienia = kehykset.filter((ms) => ms > PIENI_TOKKAYS_MS && ms <= ISO_TOKKAYS_MS).length;
  const isoja = kehykset.filter((ms) => ms > ISO_TOKKAYS_MS).length;
  return {
    kehyksia: kehykset.length, p50: +p(0.5).toFixed(2), p95: +p(0.95).toFixed(2), p99: +p(0.99).toFixed(2), max: +lajiteltu.at(-1).toFixed(2),
    pieniaOsuus: +(100 * pienia / kehykset.length).toFixed(2), isojaOsuus: +(100 * isoja / kehykset.length).toFixed(2),
  };
}

function protoCommit() {
  try { return aja('git', ['-C', PROTO_REPO, 'rev-parse', '--short', 'HEAD']).trim(); } catch { return '?'; }
}

function kirjaaLokiin(rivi) {
  const otsikko = '| Pvm | Proto-commit | Kehyksiä | p50 (ms) | p95 (ms) | p99 (ms) | max (ms) | Pieniä tökk. (>12,5ms) | Isoja tökk. (>33ms) |\n|---|---|---:|---:|---:|---:|---:|---:|---:|\n';
  if (!existsSync(LOKI)) {
    writeFileSync(LOKI, `# Natiivin sulavuusloki (pysyvä portti)\n\nAjetaan jokaisen VP:n jälkeen samalla vakiokierroksella (kaupunki Pariisi, veto, heitto, nipistys, kamera-ajo), 3D-selvittäjän KehysMittari.cs:n raakadatasta. Kynnykset 120 Hz -laitteelle: pieni tökkäys > 12,5 ms, iso > 33 ms. Ensimmäinen vertailu ja menetelmä: docs/raportit/sulavuus-natiivi-vs-web-20260923.md.\n\n${otsikko}`);
  }
  const nyt = new Date();
  const pvm = nyt.toISOString().slice(0, 10);
  const teksti = readFileSync(LOKI, 'utf8');
  writeFileSync(LOKI, `${teksti}| ${pvm} | ${rivi.commit} | ${rivi.kehyksia} | ${rivi.p50} | ${rivi.p95} | ${rivi.p99} | ${rivi.max} | ${rivi.pieniaOsuus} % | ${rivi.isojaOsuus} % |\n`);
}

const tmp = mkdtempSync(join(tmpdir(), 'natiivi-sulavuus-'));
const komentoPolku = join(tmp, 'komento.txt');
writeFileSync(komentoPolku, VAKIOKIERROS);

console.log('Mykistetään ääni...');
mykista(true);
try {
  console.log('Lähetetään komentotiedosto...');
  devicectl(['device', 'copy', 'to', '--device', DEVICE, '--domain-type', 'appDataContainer', '--domain-identifier', APP, '--source', komentoPolku, '--destination', 'Documents/komento.txt']);
  const odotusMs = 20000; // kierroksen odota-summat + puskuri
  console.log(`Odotetaan kierroksen suoritusta (${odotusMs / 1000} s)...`);
  execFileSync('sleep', [String(odotusMs / 1000)]);
  const tulosPolku = join(tmp, `mittaus-${NIMI}.txt`);
  console.log('Haetaan tulos...');
  devicectl(['device', 'copy', 'from', '--device', DEVICE, '--domain-type', 'appDataContainer', '--domain-identifier', APP, '--source', `Documents/mittaus-${NIMI}.txt`, '--destination', tulosPolku]);
  const tulos = analysoi(tulosPolku);
  const rivi = { ...tulos, commit: protoCommit() };
  kirjaaLokiin(rivi);
  console.log(JSON.stringify(rivi, null, 1));
  console.log(`Kirjattu: ${LOKI}`);
} finally {
  console.log('Palautetaan ääni...');
  mykista(false);
}
