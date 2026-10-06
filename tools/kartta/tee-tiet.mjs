#!/usr/bin/env node
/*
 * KAUPUNGIN TIET YÖVALOILLE (Linssiseppä 6.10.2026, Päätoimittajan tilaus "kaupungin yövalot v4"): OpenStreetMapin
 * highway-viivat r metrin säteeltä esilaskettuna tiedostona, ei ajonaikaisia Overpass-kyselyjä.
 *   kartta/tiet-v1/<id>.json = { keskus: [lat, lon], r, tiet: [{ t, p: [[lat, lon], …] }], krediitit: ['osm'] }
 * Viivat Douglas–Peucker 2 m, koordinaatit 5 desimaalia. Jos tiedosto ylittää KATTO_T, residential/living_street/
 * pedestrian rajataan PIENI_R-säteelle. Id kuten /opas/aineistot (aineistot.js).
 * Käyttö: node tools/kartta/tee-tiet.mjs --id pariisi --lat 48.8566 --lon 2.3522 [--r 4000] --ulos <paketti> [--valimuisti <kansio>]
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const arg = (n, o = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : o; };
const UA = 'Matkakirja-kartta/1.0 (https://matkakirja.app; peli@matkakirja.app)';
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'];
// Linssiseppä 6.10.: isoille kaupungeille r 6 000 (Eiffel 4,2 km Pariisin keskustasta); pienet kadut 3 km:iin, jos yli 2,5 Mt.
const KATTO_T = 2_500_000, PIENI_R = 3000;
const PIENET = new Set(['residential', 'living_street', 'pedestrian', 'unclassified']);
const odota = (ms) => new Promise((r) => setTimeout(r, ms));

async function overpass(kysely, valimuisti) {
  if (valimuisti && existsSync(valimuisti)) return JSON.parse(readFileSync(valimuisti, 'utf8'));
  for (let yritys = 0; yritys < 9; yritys += 1) {
    const palvelin = OVERPASS[yritys % OVERPASS.length];
    try {
      const v = await fetch(palvelin, { method: 'POST', headers: { 'user-agent': UA, 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(kysely)}` });
      if (v.ok) { const d = await v.json(); if (valimuisti) writeFileSync(valimuisti, JSON.stringify(d)); return d; }
      console.error(`  Overpass ${new URL(palvelin).host} ${v.status}`);
    } catch (virhe) { console.error(`  Overpass ${new URL(palvelin).host} ${virhe.message}`); }
    await odota(10000 * (Math.floor(yritys / OVERPASS.length) + 1));
  }
  throw new Error('Overpass ei vastannut');
}

/** Douglas–Peucker metreissä (paikallinen tasoprojektio). */
export function yksinkertaista(p, tol = 2) {
  if (p.length < 3) return p;
  const k = Math.cos((p[0][0] * Math.PI) / 180) * 111320, m = 111320;
  const xy = p.map(([la, lo]) => [lo * k, la * m]);
  const pida = new Uint8Array(p.length); pida[0] = pida[p.length - 1] = 1;
  const pino = [[0, p.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop(); let paras = -1, i0 = -1;
    const [x1, y1] = xy[a], [x2, y2] = xy[b], dx = x2 - x1, dy = y2 - y1, l2 = dx * dx + dy * dy || 1e-9;
    for (let i = a + 1; i < b; i += 1) {
      const t = Math.max(0, Math.min(1, ((xy[i][0] - x1) * dx + (xy[i][1] - y1) * dy) / l2));
      const d = Math.hypot(xy[i][0] - (x1 + t * dx), xy[i][1] - (y1 + t * dy));
      if (d > paras) { paras = d; i0 = i; }
    }
    if (paras > tol) { pida[i0] = 1; pino.push([a, i0], [i0, b]); }
  }
  return p.filter((_, i) => pida[i]);
}

export async function teeTiet({ lat, lon, r = 4000, valimuisti = null }) {
  const kysely = `[out:json][timeout:180];way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street|pedestrian)(_link)?$"](around:${r},${lat},${lon});out geom tags qt;`;
  const d = await overpass(kysely, valimuisti);
  const etaisyys = ([la, lo]) => Math.hypot((la - lat) * 111320, (lo - lon) * 111320 * Math.cos((lat * Math.PI) / 180));
  const tee = (raja) => (d.elements ?? []).filter((e) => e.type === 'way' && e.geometry?.length > 1).map((e) => {
    const t = String(e.tags.highway).replace(/_link$/, '');
    const p = yksinkertaista(e.geometry.map((g) => [Number(g.lat.toFixed(5)), Number(g.lon.toFixed(5))]));
    return PIENET.has(t) && p.every((x) => etaisyys(x) > raja) ? null : { t, p };
  }).filter(Boolean);
  let tiet = tee(r);
  const koko = (x) => JSON.stringify(x).length;
  if (koko(tiet) > KATTO_T) tiet = tee(PIENI_R);
  return { keskus: [lat, lon], r, tiet, krediitit: ['osm'] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const id = arg('id'), ulos = arg('ulos');
  if (!id || !ulos) { console.error('käyttö: --id <id> --lat <lat> --lon <lon> [--r 4000] --ulos <paketti>'); process.exit(1); }
  const vm = arg('valimuisti'); if (vm) mkdirSync(vm, { recursive: true });
  const t = await teeTiet({ lat: Number(arg('lat')), lon: Number(arg('lon')), r: Number(arg('r', '4000')), valimuisti: vm ? join(vm, `tiet-${id}-r${arg('r', '4000')}.json`) : null });
  const kansio = join(ulos, 'kartta', 'tiet-v1'); mkdirSync(kansio, { recursive: true });
  writeFileSync(join(kansio, `${id}.json`), JSON.stringify(t));
  const lkm = {}; for (const x of t.tiet) lkm[x.t] = (lkm[x.t] ?? 0) + 1;
  console.log(`${id}: ${t.tiet.length} viivaa, ${(JSON.stringify(t).length / 1e6).toFixed(2)} Mt`, lkm);
}
