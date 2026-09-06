/*
 * KOKEILUAINEISTO: rantaviivat ja maiden rajat vektoreina pallolle
 * (Fablemax 6.9.2026, Raamattu "VEKTORIT SAMALLA").
 *
 *   node tools/kokeilut/pallon-vektorit/tee-aineisto.mjs --ne=<kansio> --ulos=<kansio>
 *        [--solu=10] [--lodit=0.1,0.03,0.008,0.004,0]
 *
 * Lukee SAMAN lähteen kuin laattapyramidin poltettu rantaviiva
 * (tools/fokuskartta/maailma.mjs meriRenkaat: ne_10m_ocean, harvennus
 * 0,006°, pyöristys 4 desimaaliin) ja saman rajaviivaston kuin
 * viivataso (tools/fokuskartta/rajat.mjs, rajat-nykyiset.json.gz), ja
 * kirjoittaa niistä tasoittain yksinkertaistetut (Douglas–Peucker) ja
 * soluihin (solu° × solu°) leikatut viivat:
 *
 *   <ulos>/luettelo.json                     tasot, solut, mitat
 *   <ulos>/<laji>/l<k>/<sarake>_<rivi>.bin   Float32 [n, lon, lat, …] × viivat
 *
 * LOD-taso k on toleranssi asteina (0 = harventamaton lähde). Solu on
 * asteina; tasoilla, joiden toleranssi ≥ 0,03°, koko maailma on YKSI
 * solu (kaukotasot ladataan kerralla). Tulostaa mittaustaulukon:
 * pisteet, viivat, tavut raakana ja gzipattuna sekä int16-deltakoodattuna
 * (tuotantomuodon arvio). Kokeilua varten — ei pelin koodia.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..', '..', '..');
const { meriRenkaat, rannikotRenkaista } = await import(join(JUURI, 'tools/fokuskartta/maailma.mjs'));
const { lueRajaviivasto } = await import(join(JUURI, 'tools/fokuskartta/rajat.mjs'));

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const NE = arg('ne', null);
const ULOS = arg('ulos', join(process.env.TMPDIR ?? '/tmp', 'pallon-vektorit-aineisto'));
const SOLU = Number(arg('solu', 10));
const LODIT = arg('lodit', '0.1,0.03,0.008,0.004,0').split(',').map(Number);
/** Toleranssista ylöspäin koko maailma on yksi solu. */
const YKSI_SOLU_RAJA = Number(arg('yksisolu', 0.03));
if (!NE) { console.error('anna --ne=<kansio, jossa ne_10m_ocean.geojson>'); process.exit(1); }

/* ---------------- Douglas–Peucker (asteet, tasokoordinaatit) ------- */
function dp(pisteet, tol) {
  if (tol <= 0 || pisteet.length < 3) return pisteet;
  const pida = new Uint8Array(pisteet.length);
  pida[0] = 1; pida[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  const t2 = tol * tol;
  while (pino.length) {
    const [a, b] = pino.pop();
    if (b - a < 2) continue;
    const [ax, ay] = pisteet[a]; const [bx, by] = pisteet[b];
    const dx = bx - ax; const dy = by - ay;
    const l2 = dx * dx + dy * dy;
    let paras = -1; let parasD = -1;
    for (let i = a + 1; i < b; i += 1) {
      const [px, py] = pisteet[i];
      let d;
      if (l2 === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
        d = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2;
      }
      if (d > parasD) { parasD = d; paras = i; }
    }
    if (parasD > t2) { pida[paras] = 1; pino.push([a, paras], [paras, b]); }
  }
  return pisteet.filter((_, i) => pida[i]);
}

/* ---------------- lähteet ------------------------------------------ */
const t0 = Date.now();
const renkaat = meriRenkaat(NE, { harvennus: 0.006 });
// Kehyksen (±180, navat) osuudet katkaisevat viivan: rannikko on polyviivoja.
const rannikko = rannikotRenkaista(renkaat, { laatikko: { lat0: -90, lat1: 90 } });
const rajat = lueRajaviivasto('nykyiset').viivat.map((v) => v.map(([lon, lat]) => [lon, lat]));
const laske = (viivat) => viivat.reduce((s, v) => s + v.length, 0);
console.log(`lähteet ${((Date.now() - t0) / 1000).toFixed(1)} s: rannikko ${rannikko.length} viivaa / ${laske(rannikko)} pistettä (0,006°-harvennus), `
  + `rajat ${rajat.length} viivaa / ${laske(rajat)} pistettä`);

/* ---------------- solut --------------------------------------------- */
const soluAvain = (lon, lat, solu) => {
  const s = Math.min(Math.floor((lon + 180) / solu), Math.ceil(360 / solu) - 1);
  const r = Math.min(Math.floor((90 - lat) / solu), Math.ceil(180 / solu) - 1);
  return `${s}_${r}`;
};
/** Leikkaa viivat soluihin: solun vaihtuessa katkaistaan ja rajapiste kuuluu molempiin. */
function soluihin(viivat, solu) {
  const solut = new Map();
  const lisaa = (avain, osa) => {
    if (osa.length < 2) return;
    if (!solut.has(avain)) solut.set(avain, []);
    solut.get(avain).push(osa);
  };
  for (const viiva of viivat) {
    let osa = [];
    let avain = null;
    for (const p of viiva) {
      const a = soluAvain(p[0], p[1], solu);
      if (avain !== null && a !== avain) { osa.push(p); lisaa(avain, osa); osa = [osa[osa.length - 1]]; }
      osa.push(p);
      avain = a;
    }
    lisaa(avain, osa);
  }
  return solut;
}

/* ---------------- kirjoitus ja mitat ------------------------------- */
const kirjoita = (viivat) => {
  const n = viivat.reduce((s, v) => s + 1 + v.length * 2, 0);
  const f = new Float32Array(n);
  let i = 0;
  for (const v of viivat) { f[i++] = v.length; for (const [lon, lat] of v) { f[i++] = lon; f[i++] = lat; } }
  return Buffer.from(f.buffer);
};
/** Tuotantomuodon arvio: int16-delta 1e-4°-yksikköä, viivan alku int32. */
const deltakoodaa = (viivat) => {
  const osat = [];
  for (const v of viivat) {
    const b = Buffer.alloc(4 + 8 + (v.length - 1) * 4);
    b.writeInt32LE(v.length, 0);
    let x = Math.round(v[0][0] * 1e4); let y = Math.round(v[0][1] * 1e4);
    b.writeInt32LE(x, 4); b.writeInt32LE(y, 8);
    let o = 12;
    for (let i = 1; i < v.length; i += 1) {
      const nx = Math.round(v[i][0] * 1e4); const ny = Math.round(v[i][1] * 1e4);
      const dx = Math.max(-32768, Math.min(32767, nx - x)); const dy = Math.max(-32768, Math.min(32767, ny - y));
      b.writeInt16LE(dx, o); b.writeInt16LE(dy, o + 2); o += 4;
      x += dx; y += dy;
    }
    osat.push(b);
  }
  return Buffer.concat(osat);
};

mkdirSync(ULOS, { recursive: true });
const luettelo = { solu: SOLU, yksiSoluRaja: YKSI_SOLU_RAJA, lodit: [], lajit: {} };
const taulukko = [];
for (const laji of ['rannikko', 'rajat']) {
  const lahde = laji === 'rannikko' ? rannikko : rajat;
  luettelo.lajit[laji] = { tasot: [] };
  LODIT.forEach((tol, k) => {
    const harva = lahde.map((v) => dp(v, tol)).filter((v) => v.length > 1);
    const solu = tol >= YKSI_SOLU_RAJA ? 360 : SOLU;
    const solut = soluihin(harva, solu);
    const kansio = join(ULOS, laji, `l${k}`);
    mkdirSync(kansio, { recursive: true });
    const tiedostot = {};
    let raaka = 0; let gz = 0; let delta = 0; let deltaGz = 0;
    for (const [avain, viivat] of solut) {
      const buf = kirjoita(viivat);
      writeFileSync(join(kansio, `${avain}.bin`), buf);
      const d = deltakoodaa(viivat);
      const g = gzipSync(buf).length; const dg = gzipSync(d).length;
      raaka += buf.length; gz += g; delta += d.length; deltaGz += dg;
      tiedostot[avain] = { tavua: buf.length, viivoja: viivat.length, pisteita: laske(viivat) };
    }
    const pisteita = laske(harva);
    luettelo.lajit[laji].tasot.push({ k, tol, solu, soluja: solut.size, viivoja: harva.length, pisteita, tiedostot });
    taulukko.push({ laji, k, tol, solu, soluja: solut.size, viivoja: harva.length, pisteita, raakaKt: Math.round(raaka / 1024), gzKt: Math.round(gz / 1024), deltaKt: Math.round(delta / 1024), deltaGzKt: Math.round(deltaGz / 1024) });
  });
}
luettelo.lodit = LODIT;
writeFileSync(join(ULOS, 'luettelo.json'), JSON.stringify(luettelo));
console.table(taulukko);
writeFileSync(join(ULOS, 'mitat.json'), JSON.stringify(taulukko, null, 1));
console.log(`kirjoitettu ${ULOS} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
