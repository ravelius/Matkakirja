/*
 * Dioraamamoottorin AO-leivonnan testit (Linnanrakentaja, ali-agentti B3).
 * Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 3, 3b.
 *
 * Kolmiot rakennetaan tässä suoraan Float32Array-muotoon eikä sijoita():n
 * kautta — reseptit.mjs on toisen ali-agentin (B2) vastuulla, eikä sen
 * valmistumista tarvitse odottaa: tools/dioraama/ao.mjs on itsenäinen
 * moduuli (BVH + säde/kolmio + AO + lämpö), joten myös nämä testit ovat.
 *
 * Raa'an voiman säde/kolmio-testi kirjoitetaan tässä UUDELLEEN itsenäisesti
 * (ei tuoda ao.mjs:n sisäistä toteutusta), jotta BVH vs. raaka voima -testi
 * oikeasti validoi BVH:n LÄPIKÄYNNIN (rajaus, pino, lapset) eikä vain
 * vertaa samaa funktiota itseensä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { luoBvh, leivoAO, lampo, sadeOsuma } from '../tools/dioraama/ao.mjs';
import { mulberry32 } from '../js/game.js';

/* ==================== Pienet apurit kolmioiden rakentamiseen ==================== */

/** Suorakulmio (2 kolmiota) kulmapisteestä kahden reunavektorin ja niiden pituuksien mukaan. */
function suorakulmioKolmiot(origo, ux, uz, leveys, syvyys) {
  const p00 = origo;
  const p10 = [origo[0] + ux[0] * leveys, origo[1] + ux[1] * leveys, origo[2] + ux[2] * leveys];
  const p11 = [
    origo[0] + ux[0] * leveys + uz[0] * syvyys,
    origo[1] + ux[1] * leveys + uz[1] * syvyys,
    origo[2] + ux[2] * leveys + uz[2] * syvyys,
  ];
  const p01 = [origo[0] + uz[0] * syvyys, origo[1] + uz[1] * syvyys, origo[2] + uz[2] * syvyys];
  return [...p00, ...p10, ...p11, ...p00, ...p11, ...p01];
}

/** Suljettu laatikko (6 sivua, 12 kolmiota) keskipisteen ja puolisivujen mukaan. */
function laatikkoKolmiot(keski, hx, hy, hz) {
  const [cx, cy, cz] = keski;
  const k = [
    [cx - hx, cy - hy, cz - hz], [cx + hx, cy - hy, cz - hz],
    [cx + hx, cy + hy, cz - hz], [cx - hx, cy + hy, cz - hz],
    [cx - hx, cy - hy, cz + hz], [cx + hx, cy - hy, cz + hz],
    [cx + hx, cy + hy, cz + hz], [cx - hx, cy + hy, cz + hz],
  ];
  const tri = [
    [0, 1, 2], [0, 2, 3], [5, 4, 7], [5, 7, 6], [4, 0, 3], [4, 3, 7],
    [1, 5, 6], [1, 6, 2], [4, 5, 1], [4, 1, 0], [3, 2, 6], [3, 6, 7],
  ];
  const flat = [];
  for (const [a, b, c] of tri) flat.push(...k[a], ...k[b], ...k[c]);
  return flat;
}

function kolmioTaulukko(...osat) {
  const n = osat.reduce((s, o) => s + o.length, 0);
  const out = new Float32Array(n);
  let o = 0;
  for (const osa of osat) { out.set(osa, o); o += osa.length; }
  return out;
}

/** Itsenäinen Möller–Trumbore raa'an voiman vertailua varten (EI ao.mjs:stä). */
function leikkaaRaaka(kolmiot, triIdx, ox, oy, oz, dx, dy, dz) {
  const b = triIdx * 9;
  const v0x = kolmiot[b]; const v0y = kolmiot[b + 1]; const v0z = kolmiot[b + 2];
  const e1x = kolmiot[b + 3] - v0x; const e1y = kolmiot[b + 4] - v0y; const e1z = kolmiot[b + 5] - v0z;
  const e2x = kolmiot[b + 6] - v0x; const e2y = kolmiot[b + 7] - v0y; const e2z = kolmiot[b + 8] - v0z;
  const hx = dy * e2z - dz * e2y; const hy = dz * e2x - dx * e2z; const hz = dx * e2y - dy * e2x;
  const a = e1x * hx + e1y * hy + e1z * hz;
  if (Math.abs(a) < 1e-12) return null;
  const f = 1 / a;
  const sx = ox - v0x; const sy = oy - v0y; const sz = oz - v0z;
  const u = f * (sx * hx + sy * hy + sz * hz);
  if (u < 0 || u > 1) return null;
  const qx = sy * e1z - sz * e1y; const qy = sz * e1x - sx * e1z; const qz = sx * e1y - sy * e1x;
  const v = f * (dx * qx + dy * qy + dz * qz);
  if (v < 0 || u + v > 1) return null;
  return f * (e2x * qx + e2y * qy + e2z * qz);
}

function raaanVoimanLahin(kolmiot, triCount, ox, oy, oz, dx, dy, dz) {
  let paras = Infinity;
  for (let i = 0; i < triCount; i++) {
    const t = leikkaaRaaka(kolmiot, i, ox, oy, oz, dx, dy, dz);
    if (t !== null && t > 1e-4 && t < paras) paras = t;
  }
  return paras;
}

/* ==================== 1–3: AO:n perustapaukset ==================== */

test('avoin taso: AO on lähellä yhtä keskellä laattaa', () => {
  const lattia = suorakulmioKolmiot([-50, 0, -50], [1, 0, 0], [0, 0, 1], 100, 100);
  const bvh = luoBvh(kolmioTaulukko(lattia));
  const ao = leivoAO(bvh, new Float32Array([0, 0, 0]), new Float32Array([0, 1, 0]), { saateita: 48, max: 3 });
  assert.ok(ao[0] > 0.99, `avoimen tason AO oli ${ao[0]}, odotettiin > 0.99`);
});

test('nurkka: AO on pienempi seinän vieressä kuin keskellä avointa lattiaa', () => {
  const lattia = suorakulmioKolmiot([0, 0, 0], [1, 0, 0], [0, 0, 1], 10, 10);
  const seina = suorakulmioKolmiot([0, 0, 0], [1, 0, 0], [0, 1, 0], 10, 3); // pystysuora taso z=0:ssa
  const bvh = luoBvh(kolmioTaulukko(lattia, seina));
  const pisteet = new Float32Array([5, 0, 0.3, 5, 0, 9.5]); // lähellä seinää / kaukana seinästä
  const normaalit = new Float32Array([0, 1, 0, 0, 1, 0]);
  const ao = leivoAO(bvh, pisteet, normaalit, { saateita: 48, max: 3 });
  assert.ok(ao[1] > 0.95, `kaukana seinästä AO oli ${ao[1]}, odotettiin > 0.95`);
  assert.ok(ao[0] < ao[1] - 0.05, `nurkan AO (${ao[0]}) ei ollut selvästi pienempi kuin avoimen (${ao[1]})`);
});

test('suljettu laatikko sisältä: AO on lähellä nollaa', () => {
  const kolmiot = new Float32Array(laatikkoKolmiot([0, 0, 0], 0.15, 0.15, 0.15));
  const bvh = luoBvh(kolmiot);
  // Piste +Y-sisäpinnan keskellä, normaali osoittaa laatikon sisään.
  const ao = leivoAO(bvh, new Float32Array([0, 0.15, 0]), new Float32Array([0, -1, 0]), { saateita: 48, max: 3 });
  assert.ok(ao[0] >= 0 && ao[0] <= 1, `AO (${ao[0]}) ei ollut välillä [0,1]`);
  assert.ok(ao[0] < 0.2, `suljetun laatikon sisäpinnan AO oli ${ao[0]}, odotettiin < 0.2`);
});

/* ==================== 4: BVH vs. raaka voima (siemen) ==================== */

test('BVH antaa saman lähimmän osuman kuin raaka voiman läpikäynti (satunnaiset säteet, siemen)', () => {
  const rng = mulberry32(20260929);
  const triCount = 400;
  const kolmiot = new Float32Array(triCount * 9);
  for (let i = 0; i < triCount; i++) {
    // Satunnaisen kokoinen kolmio satunnaisen keskipisteen ympärillä 20×20×20-tilavuudessa,
    // jotta puu joutuu oikeasti tasapainottamaan eri kokoisia/limittyviä kolmioita.
    const cx0 = (rng() - 0.5) * 20; const cy0 = (rng() - 0.5) * 20; const cz0 = (rng() - 0.5) * 20;
    for (let k = 0; k < 3; k++) {
      kolmiot[i * 9 + k * 3] = cx0 + (rng() - 0.5) * 2;
      kolmiot[i * 9 + k * 3 + 1] = cy0 + (rng() - 0.5) * 2;
      kolmiot[i * 9 + k * 3 + 2] = cz0 + (rng() - 0.5) * 2;
    }
  }
  const bvh = luoBvh(kolmiot);

  let osumia = 0;
  const NAYTTEITA = 400;
  for (let s = 0; s < NAYTTEITA; s++) {
    // Origo satunnaisesti hieman kolmiopilveä suuremmasta tilavuudesta, mutta
    // suunta tähtää KOHTI toista satunnaispistettä 20×20×20-pilven sisällä
    // (satunnainen jänne pilven läpi) — täysin satunnainen suunta harvasta
    // origosta osuisi lähes aina ohi, koska kolmiopilvi on pieni ja harva.
    const ox = (rng() - 0.5) * 30; const oy = (rng() - 0.5) * 30; const oz = (rng() - 0.5) * 30;
    const tx = (rng() - 0.5) * 20; const ty = (rng() - 0.5) * 20; const tz = (rng() - 0.5) * 20;
    let dx = tx - ox; let dy = ty - oy; let dz = tz - oz;
    const dl = Math.hypot(dx, dy, dz) || 1;
    dx /= dl; dy /= dl; dz /= dl;
    const odotettu = raaanVoimanLahin(kolmiot, triCount, ox, oy, oz, dx, dy, dz);
    const saatu = sadeOsuma(bvh, [ox, oy, oz], [dx, dy, dz]);
    if (!Number.isFinite(odotettu)) {
      assert.equal(saatu, Infinity, `säde ${s}: raaka voima ei osunut mihinkään, BVH löysi ${saatu}`);
    } else {
      osumia += 1;
      assert.ok(Number.isFinite(saatu), `säde ${s}: raa'an voiman mukaan osuma ${odotettu}, BVH ei löytänyt mitään`);
      assert.ok(Math.abs(saatu - odotettu) < 1e-3, `säde ${s}: raaka=${odotettu}, bvh=${saatu}`);
    }
  }
  // Sanity-tarkistus, ettei testidata ollut niin harva että kaikki säteet menisivät ohi.
  assert.ok(osumia > NAYTTEITA * 0.2, `vain ${osumia}/${NAYTTEITA} sädettä osui mihinkään — testidata liian harva`);
});

/* ==================== 5: lämpö ==================== */

test('lampo: nolla säteen ulkopuolella, kasvaa valoa kohti, rajattu [0,1]:een', () => {
  const valot = [{ paikka: [0, 0, 0], sade: 5, voima: 1 }];
  const pisteet = new Float32Array([
    0, 0, 0, // valon paikassa
    2, 0, 0, // lähellä
    4.9, 0, 0, // juuri säteen sisällä
    5.1, 0, 0, // juuri säteen ulkopuolella
    10, 0, 0, // kaukana
  ]);
  const l = lampo(pisteet, valot);
  assert.ok(Math.abs(l[0] - 1) < 1e-6, `valon paikassa lämmön pitäisi olla tasan 1, oli ${l[0]}`);
  assert.ok(l[0] > l[1] && l[1] > l[2], 'lämmön pitää pienentyä etäisyyden kasvaessa säteen sisällä');
  assert.equal(l[3], 0, 'säteen ulkopuolella lämpö on 0');
  assert.equal(l[4], 0, 'kaukana lämpö on 0');
  for (const v of l) assert.ok(v >= 0 && v <= 1, `lämpöarvo ${v} ei ole välillä [0,1]`);
});

test('lampo: useamman valon summa rajataan ylhäältä yhteen', () => {
  const valot = [
    { paikka: [0, 0, 0], sade: 5, voima: 2 },
    { paikka: [0.1, 0, 0], sade: 5, voima: 2 },
  ];
  const l = lampo(new Float32Array([0, 0, 0]), valot);
  assert.equal(l[0], 1);
});

test('lampo: tyhjä valolista antaa nollat eikä kaadu', () => {
  const l = lampo(new Float32Array([0, 0, 0, 1, 1, 1]), []);
  assert.deepEqual(Array.from(l), [0, 0]);
});

/* ==================== 6: suorituskyky (mitataan ja raportoidaan) ==================== */

/**
 * Aaltoileva maasto-ruudukko: N×N kärkeä (~50 000 kun N=224), (N-1)²·2
 * kolmiota (~99 458 kun N=224) — lähellä speksin "100 k kolmiota / 50 k
 * kärkeä" -mittaluokkaa realistisella (ei-rappeutuneella) geometrialla.
 * Normaali lasketaan analyyttisesti korkeusfunktion gradientista.
 */
function teeMaastoruudukko(n) {
  const askel = 40 / (n - 1);
  const korkeus = (x, z) => 0.6 * Math.sin(x * 0.7) + 0.4 * Math.cos(z * 0.5) + 0.3 * Math.sin((x + z) * 0.33);
  const dhdx = (x, z) => 0.42 * Math.cos(x * 0.7) + 0.099 * Math.cos((x + z) * 0.33);
  const dhdz = (x, z) => -0.2 * Math.sin(z * 0.5) + 0.099 * Math.cos((x + z) * 0.33);
  const pisteet = new Float32Array(n * n * 3);
  const normaalit = new Float32Array(n * n * 3);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const x = i * askel - 20; const z = j * askel - 20;
      const idx = (j * n + i) * 3;
      pisteet[idx] = x; pisteet[idx + 1] = korkeus(x, z); pisteet[idx + 2] = z;
      const gx = dhdx(x, z); const gz = dhdz(x, z);
      const nl = Math.hypot(gx, 1, gz);
      normaalit[idx] = -gx / nl; normaalit[idx + 1] = 1 / nl; normaalit[idx + 2] = -gz / nl;
    }
  }
  const triCount = (n - 1) * (n - 1) * 2;
  const kolmiot = new Float32Array(triCount * 9);
  const kopioiKarki = (out, o, i, j) => {
    const idx = (j * n + i) * 3;
    out[o] = pisteet[idx]; out[o + 1] = pisteet[idx + 1]; out[o + 2] = pisteet[idx + 2];
  };
  let o = 0;
  for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < n - 1; i++) {
      kopioiKarki(kolmiot, o, i, j); kopioiKarki(kolmiot, o + 3, i + 1, j); kopioiKarki(kolmiot, o + 6, i + 1, j + 1);
      o += 9;
      kopioiKarki(kolmiot, o, i, j); kopioiKarki(kolmiot, o + 3, i + 1, j + 1); kopioiKarki(kolmiot, o + 6, i, j + 1);
      o += 9;
    }
  }
  return {
    pisteet, normaalit, kolmiot, vertexCount: n * n, triCount,
  };
}

test('suorituskyky: ~100 000 kolmion BVH + ~50 000 kärjen AO alle ~30 s (raportoitu, ei hauras raja)', { timeout: 180_000 }, () => {
  const N = 224; // 224² = 50 176 kärkeä, 223²·2 = 99 458 kolmiota
  const { pisteet, normaalit, kolmiot, vertexCount, triCount } = teeMaastoruudukko(N);

  const t0 = performance.now();
  const bvh = luoBvh(kolmiot);
  const t1 = performance.now();
  const ao = leivoAO(bvh, pisteet, normaalit, { saateita: 48, max: 3 });
  const t2 = performance.now();

  const bvhMs = t1 - t0; const aoMs = t2 - t1; const yhtMs = t2 - t0;
  console.log(
    `[suorituskyky] ${triCount} kolmiota / ${vertexCount} kärkeä × 48 sädettä: `
    + `BVH ${bvhMs.toFixed(0)} ms, AO ${aoMs.toFixed(0)} ms, yhteensä ${yhtMs.toFixed(0)} ms `
    + `(tavoite speksissä ~30000 ms)`,
  );

  let minAo = Infinity; let maxAo = -Infinity;
  for (let i = 0; i < ao.length; i++) {
    assert.ok(ao[i] >= 0 && ao[i] <= 1, `AO[${i}] = ${ao[i]} ei ole välillä [0,1]`);
    if (ao[i] < minAo) minAo = ao[i];
    if (ao[i] > maxAo) maxAo = ao[i];
  }
  assert.ok(maxAo > minAo, 'aaltoilevalla maastolla AO:n pitäisi vaihdella (ei kaikki sama arvo)');

  // Speksin tavoite on ~30 s; raja tässä on tarkoituksella reilusti löysempi
  // (ei hauras hitaammalla/kuormitetulla koneella), mutta silti aito
  // regressiovahti — mitattu luku raportoidaan aina yllä.
  assert.ok(yhtMs < 90_000, `BVH+AO kesti yhteensä ${yhtMs.toFixed(0)} ms, turvaraja 90000 ms`);
});
