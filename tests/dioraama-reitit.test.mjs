// Dioraaman kävelyreitit eivät kulje hahmojen, liekkien eikä esineiden läpi (Linnanrakentaja 2.10.2026; Päätoimittajan
// skin-videohavainnot: Muurinharjan vartija käveli soihtupadan ja seisovan talonpojan läpi). Etäisyys reitin janoista
// vaakatasossa (x, z), vain kohteet reitin korkeudella (dy −0,3…+1,8 m). Rajat: hahmot 0,7 m, liekit 0,6 m, esineet 0,5 m
// (lattiat, kannet, seinät, laatat, portaat ohitetaan). KESKEN-listan tilat korjataan, kun niiden hahmot vaihtuvat
// skinnatuiksi (omistaja 2.10. 18.0x) — poista tila listalta samalla, niin testi vartioi sen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';

const KANSIO = new URL('../js/dioraama/rakennukset/olavinlinna/', import.meta.url);
const KESKEN = new Set([]);
const OHITA = /lattia|kansi|matto|seina|laatta|lankku|porras|portaat|askelma/;
const jana = (p, a, b) => {
  const vx = b[0] - a[0], vz = b[2] - a[2], L = vx * vx + vz * vz;
  const u = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[2] - a[2]) * vz) / L)) : 0;
  return Math.hypot(p[0] - a[0] - u * vx, p[2] - a[2] - u * vz);
};
export function reitinOsumat(tila) {
  const osumat = [];
  for (const h of tila.hahmot ?? []) {
    const P = h.reitti?.pisteet; if (!P) continue;
    const etaisyys = (q) => Math.min(...P.slice(1).map((b, i) => {
      const dy = q[1] - P[i][1]; return dy > -0.3 && dy < 1.8 ? jana(q, P[i], b) : Infinity;
    }));
    const kohteet = [
      ...(tila.hahmot ?? []).filter((s) => s !== h && !s.reitti).map((s) => ['hahmo ' + s.id, s.paikka, 0.7]),
      ...(tila.liekit ?? []).map((l) => ['liekki ' + l.liekki, l.paikka, 0.6]),
      ...(tila.palikat ?? []).filter((p) => p.paikka && !OHITA.test(p.resepti ?? '')).map((p) => ['esine ' + p.resepti, p.paikka, 0.5]),
    ];
    for (const [nimi, q, raja] of kohteet) { const e = etaisyys(q); if (e < raja) osumat.push(`${h.id} ↔ ${nimi} ${e.toFixed(2)} m < ${raja}`); }
  }
  return osumat;
}
for (const f of readdirSync(KANSIO).filter((f) => f.endsWith('.js'))) {
  const id = f.replace(/\.js$/, '');
  test(`${id}: kävelyreitit eivät kulje hahmojen, liekkien eikä esineiden läpi`, { todo: KESKEN.has(id) ? 'korjataan hahmojen vaihdossa' : false }, async () => {
    const m = await import(new URL(f, KANSIO)); const tila = m.default ?? Object.values(m)[0];
    assert.deepEqual(reitinOsumat(tila), []);
  });
}
