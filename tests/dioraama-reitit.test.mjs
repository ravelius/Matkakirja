// Dioraaman kävelyreitit eivät kulje hahmojen, liekkien eikä esineiden läpi (Linnanrakentaja 2.10.2026; Päätoimittajan
// skin-videohavainnot: Muurinharjan vartija käveli soihtupadan ja seisovan talonpojan läpi). Etäisyys reitin janoista
// vaakatasossa (x, z), vain kohteet reitin korkeudella (dy −0,3…+1,8 m). Rajat: hahmot ja liekit 1,0 m keskipisteestä (erä 1b: 0,75 m:llä vartalot sisäkkäin, 0,8 m:llä vartija 'tulessa'; kynttilät 0,4),
// laatikkoesineet (leveys+syvyys) 0,35 m reunasta, pyöreät (sade) 0,35 m reunasta, muut esineet 0,5 m
// (lattiat, kannet, seinät, laatat, portaat ohitetaan). KESKEN-listan tilat korjataan, kun niiden hahmot vaihtuvat
// skinnatuiksi (omistaja 2.10. 18.0x) — poista tila listalta samalla, niin testi vartioi sen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';

const KANSIO = new URL('../js/dioraama/rakennukset/olavinlinna/', import.meta.url);
const KESKEN = new Set([]);
const OHITA = /lattia|kansi|matto|seina|laatta|lankku|porras|portaat|askelma|kiekko/;
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
    // Reitti 5 cm:n näytteinä (kääntöpisteet mukana): suorakulmaiset esineet mitataan reunasta, pyöreät säteen yli.
    const naytteet = P.slice(1).flatMap((b, i) => {
      const n = Math.max(1, Math.ceil(jana(b, P[i], P[i]) / 0.05));
      return Array.from({ length: n + 1 }, (_, j) => P[i].map((v, k) => v + (b[k] - v) * j / n));
    });
    const laatikolle = (p) => (q) => {
      const s = (p.suunta || 0) * Math.PI / 180, dx = q[0] - p.paikka[0], dz = q[2] - p.paikka[2];
      const u = dx * Math.cos(s) + dz * Math.sin(s), w = dx * Math.sin(s) - dz * Math.cos(s);
      return Math.hypot(Math.max(Math.abs(u) - p.leveys / 2, 0), Math.max(Math.abs(w) - p.syvyys / 2, 0));
    };
    const reunaan = (p, f, yla = 1.8) => Math.min(...naytteet.filter((q) => { const dy = p.paikka[1] - q[1]; return dy > -0.3 && dy < yla; }).map(f));
    const vaaka = (p) => (q) => Math.hypot(q[0] - p[0], q[2] - p[2]);
    const kohteet = [
      ...(tila.hahmot ?? []).filter((s) => s !== h && !s.reitti).map((s) => ['hahmo ' + s.id, etaisyys(s.paikka), 1.0]),
      // Liekit vartalon korkeudella (dy < 1,4 m): tulikorit, tulisijat ja soihdut ≥ 1,0 m (erä 1b: vartija kääntyi 0,8 m:n
      // päässä tulikorista ja näytti seisovan tulessa), pöytäkynttilät ≥ 0,4 m. Ylempänä seinällä olevat soihdut ohitetaan.
      ...(tila.liekit ?? []).map((l) => ['liekki ' + l.liekki, reunaan({ paikka: l.paikka }, vaaka(l.paikka), 1.4), l.liekki === 'kynttila' ? 0.4 : 1.0]),
      ...(tila.palikat ?? []).filter((p) => p.paikka && !OHITA.test(p.resepti ?? '')).map((p) =>
        p.leveys && p.syvyys ? ['esine ' + p.resepti + ' (reuna)', reunaan(p, laatikolle(p)), 0.35]
          : p.sade ? ['esine ' + p.resepti + ' (säde ' + p.sade + ')', etaisyys(p.paikka) - p.sade, 0.35]
            : ['esine ' + p.resepti, etaisyys(p.paikka), 0.5]),
    ];
    // Kaksi kävelijää samassa tilassa: reitit eivät saa tulla 1,0 m:ää lähemmäs toisiaan (ajoitus ei ole sama webissä ja natiivissa).
    for (const k of (tila.hahmot ?? []).filter((s) => s !== h && s.reitti?.pisteet)) {
      const Q = k.reitti.pisteet;
      const e = Math.min(...Q.slice(1).flatMap((b, i) => Array.from({ length: 21 }, (_, j) => etaisyys(Q[i].map((v, n) => v + (b[n] - v) * j / 20)))));
      if (e < 1.0) osumat.push(`${h.id} ↔ kävelijä ${k.id} ${e.toFixed(2)} m < 1`);
    }
    for (const [nimi, e, raja] of kohteet) { if (e < raja) osumat.push(`${h.id} ↔ ${nimi} ${e.toFixed(2)} m < ${raja}`); }
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
