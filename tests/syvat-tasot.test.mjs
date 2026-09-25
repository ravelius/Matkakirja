/*
 * SYVÄT TASOT z9–z10 (Karttaseppä 23.9.2026): DEM-ikkuna, tasokatto,
 * luettelon syvä laatasto ja pelin tasokatto.
 *
 * DEM-ikkuna testataan keinotekoisella hakemistolla (onRuutu + korkeus),
 * joten verkkoa, NAS:ia eikä oikeita GeoTIFF-ruutuja tarvita.
 * Generaattori ajetaan oikeana prosessina `--vain-luettelo`/`--kuiva`-
 * tiloissa, jotka eivät tarvitse aineistoa eivätkä selainta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  mkdtempSync, readFileSync, writeFileSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  demIkkuna, demPaino, demVali, kuutiollinenKorkeus, DEM_KATTO, DEM_RAMPPI,
} from '../tools/maasto/dem-ikkuna.mjs';
import { demHakemisto } from '../tools/maasto/tee-maasto.mjs';
import { bilineaarinenKorkeus } from '../tools/fokuskartta/maastovarjo.js';
import { pelinLuettelo, PELIN_SYVIN_TASO } from '../js/laattapyramidi.js';
import { kirjoitaLuettelo } from '../tools/tee-pallolaatat.mjs';

const GENERAATTORI = fileURLToPath(new URL('../tools/generoi-laattapyramidi.mjs', import.meta.url));
const RANSKA = '-5.5,41,9.8,51.5';

/** 1′-ikkuna lon 5…8, lat 44…47 (rivi 0 pohjoisin), arvo f(lon, lat). */
function karkeaIkkuna(f) {
  const lon0 = 5; const lon1 = 8; const lat0 = 44; const lat1 = 47;
  const w = (lon1 - lon0) * 60 + 1; const h = (lat1 - lat0) * 60 + 1;
  const grid = new Int16Array(w * h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) grid[y * w + x] = Math.round(f(lon0 + x / 60, lat1 - y / 60));
  }
  return {
    w, h, lon0, lon1, lat0, lat1, grid,
  };
}

/** Keinotekoinen DEM: ruudut `ruudut` ("lat,lon"), korkeus g(lon, lat). */
function keinoDem(ruudut, g) {
  const joukko = new Set(ruudut);
  return {
    onRuutu: (lat, lon) => joukko.has(`${lat},${lon}`),
    korkeus: (lon, lat) => (joukko.has(`${Math.floor(lat)},${Math.floor(lon)}`) ? g(lon, lat) : 0),
  };
}

test('DEM-väli on tason pikseli, kattona 1″', () => {
  assert.equal(demVali(1920), 1 / 1920); // z10
  assert.equal(demVali(960), 1 / 960); // z9
  assert.equal(demVali(7680), DEM_KATTO); // tiheämpi kuin aineisto
});

test('DEM-ikkuna: väli on täsmälleen pyydetty, joten rinnevarjon askel d = väli', () => {
  const karkea = karkeaIkkuna(() => 100);
  const vali = 1 / 1920;
  const r = demIkkuna({
    karkea,
    laatikko: {
      lon0: 6, lon1: 6.5, lat0: 45.5, lat1: 46,
    },
    vali,
    dem: keinoDem(['45,6'], () => 500),
  });
  assert.equal(r.w, 961);
  assert.equal(r.h, 961);
  // Moottori laskee askeleen näin (maailmapiirto.js DLON/DLAT).
  assert.ok(Math.abs((r.lon1 - r.lon0) / (r.w - 1) - vali) < 1e-12);
  assert.ok(Math.abs((r.lat1 - r.lat0) / (r.h - 1) - vali) < 1e-12);
  assert.equal(r.grid.length, r.w * r.h);
  assert.ok(r.grid instanceof Int16Array);
});

test('DEM-ikkuna: puuttuva ruutu = 1′-arvo, ei 0 m; oma ruutu = DEM', () => {
  // 1′-maasto kaltevana tasona (kuutiollinen = bilineaarinen = tarkka).
  const f = (lon, lat) => 200 + (lon - 5) * 100 + (lat - 44) * 50;
  const karkea = karkeaIkkuna(f);
  const dem = keinoDem(['45,6'], () => 3000); // vain ruutu 45…46 N, 6…7 E
  const vali = 1 / 960;
  const laatikko = {
    lon0: 5.5, lon1: 7.5, lat0: 45.2, lat1: 46.4,
  };
  const r = demIkkuna({
    karkea, laatikko, vali, dem, ramppi: 0,
  });
  const arvo = (lon, lat) => r.grid[Math.round((r.lat1 - lat) / vali) * r.w + Math.round((lon - r.lon0) / vali)];
  // DEM-ruudun sisällä: DEM.
  assert.equal(arvo(6.5, 45.5), 3000);
  // Puuttuvassa ruudussa (46 N ja 7 E puuttuvat): 1′-arvo.
  assert.equal(arvo(7.25, 45.5), Math.round(f(7.25, 45.5)));
  assert.equal(arvo(6.5, 46.2), Math.round(f(6.5, 46.2)));
  assert.ok(r.dem.osuus > 0 && r.dem.osuus < 1);
});

test('DEM-ikkuna: ramppi häivyttää puuttuvan naapurin reunalla', () => {
  const karkea = karkeaIkkuna(() => 1000);
  const dem = keinoDem(['45,6'], () => 2000);
  const paino = demPaino(dem);
  assert.equal(paino(7.5, 45.5), 0); // puuttuva ruutu
  // Ruutu 45,6 on yksin: kaikki naapurit puuttuvat. Keskellä paino 1.
  assert.equal(paino(6.5, 45.5), 1);
  // Aivan reunalla ~0, puolessa rampissa ~0,5 (smoothstep).
  assert.ok(paino(6.9999, 45.5) < 0.01);
  const kx = Math.cos((45.5 * Math.PI) / 180);
  const puolivali = 7 - (DEM_RAMPPI / 2) / kx;
  assert.ok(Math.abs(paino(puolivali, 45.5) - 0.5) < 0.01);
  const r = demIkkuna({
    karkea,
    laatikko: {
      lon0: 6.9, lon1: 7, lat0: 45.5, lat1: 45.5,
    },
    vali: 1 / 960,
    dem,
  });
  // Rivi etenee DEM:stä (2000) kohti 1′:tä (1000) monotonisesti.
  const rivi = [...r.grid];
  assert.equal(rivi[0], 2000);
  assert.ok(Math.abs(rivi.at(-1) - 1000) <= 1);
  for (let i = 1; i < rivi.length; i += 1) assert.ok(rivi[i] <= rivi[i - 1]);
});

test('DEM-ikkuna: DEM:n meri (0 m) saa 1′-syvyyden, maa pysyy 0:ssa', () => {
  // Länsipuoli merta (−500 m), itäpuoli maata (+20 m) 1′-aineistossa.
  const karkea = karkeaIkkuna((lon) => (lon < 6.5 ? -500 : 20));
  const dem = keinoDem(['45,6'], () => 0);
  const r = demIkkuna({
    karkea,
    laatikko: {
      lon0: 6.2, lon1: 6.8, lat0: 45.5, lat1: 45.5,
    },
    vali: 1 / 60,
    dem,
    ramppi: 0,
  });
  assert.equal(r.grid[0], -500);
  assert.equal(r.grid.at(-1), 0);
});

test('Kuutiollinen vara on sileä solurajan yli ja tarkka solmuissa', () => {
  const karkea = karkeaIkkuna((lon, lat) => 1000 * Math.sin(lon * 3) * Math.cos(lat * 2));
  const K = {
    ...karkea,
    dlon: (karkea.lon1 - karkea.lon0) / (karkea.w - 1),
    dlat: (karkea.lat1 - karkea.lat0) / (karkea.h - 1),
  };
  // Solmussa sama kuin bilineaarinen (= solmun arvo).
  assert.ok(Math.abs(kuutiollinenKorkeus(K, 6, 45) - bilineaarinenKorkeus(K, 6, 45)) < 1e-6);
  // Derivaatta solurajan kummallakin puolella: kuutiollinen jatkuva,
  // bilineaarinen hyppää (juuri se näkyi porrasruudukkona).
  const e = 1e-6; const raja = 6 + 10 / 60; const lat = 45.3;
  const derivaatta = (fn, x) => (fn(K, x + e, lat) - fn(K, x - e, lat)) / (2 * e);
  const kHyppy = Math.abs(derivaatta(kuutiollinenKorkeus, raja - 1e-4) - derivaatta(kuutiollinenKorkeus, raja + 1e-4));
  const bHyppy = Math.abs(derivaatta(bilineaarinenKorkeus, raja - 1e-4) - derivaatta(bilineaarinenKorkeus, raja + 1e-4));
  assert.ok(kHyppy < bHyppy / 10, `kuutiollinen ${kHyppy}, bilineaarinen ${bHyppy}`);
});

test('demHakemisto.onRuutu: tiedostonimestä, avaamatta', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'dem-'));
  try {
    writeFileSync(join(kansio, 'Copernicus_DSM_COG_10_N45_00_E006_00_DEM.tif'), '');
    writeFileSync(join(kansio, 'Copernicus_DSM_COG_10_S05_00_W072_00_DEM.tif'), '');
    let avattu = 0;
    const dem = demHakemisto(kansio, () => { avattu += 1; return null; });
    assert.equal(dem.ruutuja, 2);
    assert.equal(dem.onRuutu(45, 6), true);
    assert.equal(dem.onRuutu(-5, -72), true);
    assert.equal(dem.onRuutu(45, 7), false);
    assert.equal(avattu, 0);
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});

/* ------------------------------------------------ generaattori */

const aja = (args) => spawnSync(process.execPath, [GENERAATTORI, ...args], { encoding: 'utf8' });

test('--tasoja: katto 11, ja 12 on virhe', () => {
  const k = mkdtempSync(join(tmpdir(), 'syva-'));
  try {
    const r = aja([k, '--tasoja', '12', '--kuiva']);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /1…11/);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('syvä taso ilman --syva-alue on virhe (ei hiljaista koko maailman z10:tä)', () => {
  const k = mkdtempSync(join(tmpdir(), 'syva-'));
  try {
    const r = aja([k, '--tasoja', '11', '--tasot', '10', '--vain-luettelo']);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /--syva-alue/);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('luettelo z0–z10: syvä laatasto vain alalta, merkkitasot enintään z8, DEM kirjattu', () => {
  const k = mkdtempSync(join(tmpdir(), 'syva-'));
  try {
    execFileSync(process.execPath, [GENERAATTORI, k, '--tasoja', '11', '--tasot', '0-10',
      '--versio', 'koe', '--syva-alue', RANSKA, '--dem', '/ei/kaytetty', '--vain-luettelo'], { stdio: 'pipe' });
    const j = JSON.parse(readFileSync(join(k, 'pyramidi.json'), 'utf8'));
    assert.deepEqual(j.tasot.map((t) => t.z), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const bitit = (b) => [...Buffer.from(b, 'base64')].reduce((s, x) => {
      let n = s; let v = x; while (v) { n += v & 1; v >>= 1; } return n;
    }, 0);
    for (const t of j.tasot) {
      if (t.z < 9) assert.equal(t.laatasto, null, `z${t.z}`);
      else {
        const n = bitit(t.laatasto);
        assert.ok(n > 0 && n < t.sarakkeita * t.riveja / 100, `z${t.z}: ${n}`);
        assert.equal(t.korkeusaineisto, 'Copernicus GLO-30');
      }
    }
    // z10 on nelinkertainen z9:ään nähden (±reunalaatat).
    const [z9, z10] = [9, 10].map((z) => bitit(j.tasot.find((t) => t.z === z).laatasto));
    assert.ok(z10 > 3 * z9 && z10 < 5 * z9, `${z9} / ${z10}`);
    assert.ok(j.nostotaso.tasot.every((z) => z <= 8));
    assert.ok(j.viivataso.tasot.every((z) => z <= 8));
    assert.deepEqual(j.korkeus.syvat.tasot, [9, 10]);
    assert.match(j.korkeus.syvat.lahdemaininta, /Copernicus/);
    // Pyramidin ala ei ole Ranska: syvä ala ei vuoda juuritasolle.
    assert.equal(j.alue, null);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

test('--dem ilman syviä tasoja ei muuta luetteloa tavuakaan', () => {
  const a = mkdtempSync(join(tmpdir(), 'syva-'));
  const b = mkdtempSync(join(tmpdir(), 'syva-'));
  try {
    const yhteiset = ['--tasoja', '9', '--tasot', '0-8', '--versio', 'koe', '--vain-luettelo'];
    execFileSync(process.execPath, [GENERAATTORI, a, ...yhteiset], { stdio: 'pipe' });
    execFileSync(process.execPath, [GENERAATTORI, b, ...yhteiset, '--dem', '/ei/kaytetty'], { stdio: 'pipe' });
    const ilman = JSON.parse(readFileSync(join(a, 'pyramidi.json'), 'utf8'));
    const kanssa = JSON.parse(readFileSync(join(b, 'pyramidi.json'), 'utf8'));
    // Eräkirjanpidossa on ajohetki; kaikki muu on oltava sama.
    delete ilman.erat; delete kanssa.erat;
    assert.deepEqual(kanssa, ilman);
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
});

test('--kuiva kertoo DEM-ikkunan koon syvälle kaistalle', () => {
  const k = mkdtempSync(join(tmpdir(), 'syva-'));
  try {
    const r = aja([k, '--tasoja', '11', '--tasot', '10', '--syva-alue', RANSKA,
      '--dem', '/ei/kaytetty', '--sarakkeet', '648-651', '--kuiva']);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /DEM-ikkuna\s+\d+ x \d+ \(väli 1\.875″/);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});

/* ------------------------------------------------ kuluttajat */

test('pelin luettelo: tasot yli PELIN_SYVIN_TASO:n jäävät pois', () => {
  assert.equal(PELIN_SYVIN_TASO, 8);
  const tasot = Array.from({ length: 11 }, (_, z) => ({ z, laatasto: z > 8 ? 'AA==' : null }));
  const j = { versio: 'v', tasot, nostotaso: { tasot: [5, 6, 7, 8] } };
  const p = pelinLuettelo(j);
  assert.deepEqual(p.tasot.map((t) => t.z), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(p.nostotaso, j.nostotaso);
  assert.equal(j.tasot.length, 11, 'alkuperäinen luettelo ei muutu');
  // Ilman syviä tasoja sama olio (tuotannon luettelo tavulleen ennallaan).
  const vanha = { versio: 'v', tasot: tasot.slice(0, 9) };
  assert.equal(pelinLuettelo(vanha), vanha);
});

test('pallon luettelo: alue kirjataan vain aluesarjalle', () => {
  const k = mkdtempSync(join(tmpdir(), 'pallo-'));
  try {
    const luettelo = { versio: 'v', tasot: [] };
    kirjoitaLuettelo(k, luettelo, {
      min: 9, max: 11, nostot: false, tunniste: 'syva', kansio: 'x/', alue: [-5.1, 41.4, 9.4, 51.1],
    });
    const a = JSON.parse(readFileSync(join(k, 'laatat.json'), 'utf8'));
    assert.deepEqual(a.alue, [-5.1, 41.4, 9.4, 51.1]);
    assert.deepEqual(a.tasot, { min: 9, max: 11 });
    kirjoitaLuettelo(k, luettelo, {
      min: 0, max: 8, nostot: false, tunniste: 'b', kansio: 'x/',
    });
    assert.equal('alue' in JSON.parse(readFileSync(join(k, 'laatat.json'), 'utf8')), false);
  } finally {
    rmSync(k, { recursive: true, force: true });
  }
});
