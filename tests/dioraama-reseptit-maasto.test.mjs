// Testit dioraaman maastoresepteille (Linnanrakentaja 29.9.2026, ali-agentti C2).
// Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 2, 3b.
// Testataan RESEPTIT-taulukon funktioita suoraan (paikallinen kehys u, y, w), ei sijoita():n
// kautta — reseptit.mjs kokoaa myös sisarmoduulit (reseptit-rakenne.mjs, reseptit-kalusteet.mjs),
// joiden valmistumista ei tarvitse odottaa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESEPTIT, OLETUSPINNAT, kartiokatto, harjakatto, kallio, vesi } from '../tools/dioraama/reseptit-maasto.mjs';

/** Kolmion geometrinen normaali (b − a) × (c − a), normalisoitu. */
function normaali(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** 2× kolmion pinta-ala (ristitulon pituus) — 0 = degeneroitunut. */
function ala2x(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  return Math.hypot(n[0], n[1], n[2]);
}

const ESIMERKIT = {
  kartiokatto: { sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },
  harjakatto: { leveys: 20, syvyys: 12, korkeus: 3, ylitys: 0.4 },
  kallio: { leveys: 110, syvyys: 80, korkeus: 9, siemen: 1873, kohina: 0.4 },
  vesi: { leveys: 400, syvyys: 400 },
};

test('RESEPTIT ja OLETUSPINNAT sisältävät neljä maastoreseptiä', () => {
  assert.deepEqual(Object.keys(RESEPTIT).sort(), ['harjakatto', 'kallio', 'kartiokatto', 'vesi']);
  assert.deepEqual(OLETUSPINNAT.kartiokatto, { katto: 'katto' });
  assert.deepEqual(OLETUSPINNAT.harjakatto, { lappe: 'katto', paaty: 'kivi', ala: 'puu' });
  assert.deepEqual(OLETUSPINNAT.kallio, { kallio: 'kallio' });
  assert.deepEqual(OLETUSPINNAT.vesi, { vesi: 'vesi' });
});

test('jokainen resepti: vähintään 1 kolmio, ei degeneroituneita, rooli asetettu', () => {
  for (const [nimi, param] of Object.entries(ESIMERKIT)) {
    const kolmiot = RESEPTIT[nimi](param);
    assert.ok(kolmiot.length >= 1, `${nimi}: odotettiin vähintään 1 kolmio`);
    for (const t of kolmiot) {
      assert.ok(ala2x(t) > 1e-9, `${nimi}: degeneroitunut kolmio ${JSON.stringify(t.p)}`);
      assert.ok(typeof t.rooli === 'string' && t.rooli.length > 0, `${nimi}: kolmiolta puuttuu rooli`);
      if (t.n) {
        for (const nv of t.n) {
          assert.ok(Math.abs(Math.hypot(nv[0], nv[1], nv[2]) - 1) < 1e-6, `${nimi}: normaali ei ole yksikköpituinen`);
        }
      }
    }
  }
});

test('kartiokatto: pintakolmiot osoittavat ulos/ylös, huippu y = korkeus', () => {
  const param = ESIMERKIT.kartiokatto;
  const kolmiot = kartiokatto(param);
  let huippuLoytyi = false;
  let pintakolmioita = 0;
  for (const t of kolmiot) {
    const ys = t.p.map((p) => p[1]);
    const maxY = Math.max(...ys);
    const onPintakolmio = maxY > 1e-6; // erottaa kartion vaipan räystään alapinnasta (kokonaan y = 0:ssa)
    if (!onPintakolmio) continue;
    pintakolmioita++;
    const n = normaali(t);
    assert.ok(n[1] > 0, `kattopinnan normaalin y tulee olla > 0, oli ${n[1]}`);
    if (Math.abs(maxY - param.korkeus) < 1e-9) huippuLoytyi = true;
  }
  assert.ok(pintakolmioita > 0, 'kartion vaipan pintakolmioita löydyttävä');
  assert.ok(huippuLoytyi, 'jonkin kolmion tulee ulottua huipulle y = korkeus');
});

test('kartiokatto: räystään alapinta rooliin katto, osoittaa alaspäin', () => {
  const param = ESIMERKIT.kartiokatto;
  const kolmiot = kartiokatto(param);
  const alapinta = kolmiot.filter((t) => t.p.every((p) => Math.abs(p[1]) < 1e-9));
  assert.ok(alapinta.length > 0, 'räystään alapinnan kolmioita löydyttävä (kaikki y = 0)');
  for (const t of alapinta) {
    assert.equal(t.rooli, 'katto');
    assert.ok(normaali(t)[1] < 0, 'räystään alapinnan tulee osoittaa alaspäin');
    for (const p of t.p) {
      const r = Math.hypot(p[0], p[2]);
      assert.ok(r >= param.sade - 1e-6 && r <= param.sade + param.ylitys + 1e-6, `säde ${r} kehän ulkopuolella`);
    }
  }
});

test('harjakatto: lappeiden normaalit ylös ja poispäin keskeltä, päädyt oikeilla puolilla', () => {
  const param = ESIMERKIT.harjakatto;
  const kolmiot = harjakatto(param);
  const roolit = new Set(kolmiot.map((t) => t.rooli));
  assert.deepEqual(roolit, new Set(['lappe', 'ala', 'paaty']));

  for (const t of kolmiot.filter((t) => t.rooli === 'lappe')) {
    const n = normaali(t);
    assert.ok(n[1] > 0, 'lappeen normaalin y-komponentin tulee olla > 0 (ylös)');
    const wKeski = (t.p[0][2] + t.p[1][2] + t.p[2][2]) / 3;
    if (Math.abs(wKeski) > 1e-6) {
      assert.equal(Math.sign(n[2]), Math.sign(wKeski), 'lappeen normaalin tulee osoittaa poispäin keskeltä (w)');
    }
  }

  for (const t of kolmiot.filter((t) => t.rooli === 'paaty')) {
    const us = t.p.map((p) => p[0]);
    assert.ok(us.every((uv) => Math.abs(uv - us[0]) < 1e-9), 'päätykolmion tulee olla tasossa u = vakio');
    const u0 = us[0];
    assert.ok(Math.abs(Math.abs(u0) - param.leveys / 2) < 1e-9, 'päädyn tulee olla alkuperäisen leveyden kohdalla (ei ylityksen)');
    const n = normaali(t);
    assert.equal(Math.sign(n[0]), Math.sign(u0), 'päädyn normaalin tulee osoittaa omalle puolelleen (±u)');
  }
});

test('kallio: deterministinen — sama siemen antaa saman tuloksen', () => {
  const param = ESIMERKIT.kallio;
  const a = kallio({ ...param });
  const b = kallio({ ...param });
  assert.equal(a.length, b.length);
  for (let i = 0; i < a.length; i++) {
    assert.deepEqual(a[i].p, b[i].p, `kolmio ${i} eroaa samalla siemenellä`);
  }
});

test('kallio: eri siemen antaa eri tuloksen', () => {
  const param = ESIMERKIT.kallio;
  const a = kallio({ ...param, siemen: 1873 });
  const b = kallio({ ...param, siemen: 42 });
  assert.equal(a.length, b.length, 'eri siemen ei saa muuttaa kolmiomäärää (sama ruudukko)');
  let erilainen = false;
  for (let i = 0; i < a.length && !erilainen; i++) {
    if (JSON.stringify(a[i].p) !== JSON.stringify(b[i].p)) erilainen = true;
  }
  assert.ok(erilainen, 'eri siemenen tulisi tuottaa geometrisesti erilainen kalliosaari');
});

test('kallio: rajat (u, w vaakasuunnassa pullistuksen verran, y −korkeus…~0) ja kolmiomäärä ≤ 6000', () => {
  const param = ESIMERKIT.kallio;
  const kolmiot = kallio(param);
  assert.ok(kolmiot.length <= 6000, `liikaa kolmioita: ${kolmiot.length}`);
  const pullistus = param.kohina * param.leveys * 0.03;
  const uRaja = param.leveys / 2 + pullistus + 1e-6;
  const wRaja = param.syvyys / 2 + pullistus + 1e-6;
  const yYla = param.kohina * 0.6 + 1e-6;
  const yAla = -param.korkeus - 1e-6;
  for (const t of kolmiot) {
    for (const p of t.p) {
      assert.ok(Math.abs(p[0]) <= uRaja, `u ${p[0]} ylitti rajan ${uRaja}`);
      assert.ok(Math.abs(p[2]) <= wRaja, `w ${p[2]} ylitti rajan ${wRaja}`);
      assert.ok(p[1] >= yAla, `y ${p[1]} alle −korkeus`);
      assert.ok(p[1] <= yYla, `y ${p[1]} liikaa yli 0:n`);
    }
  }
});

test('vesi: yksi taso y = 0, normaali +y', () => {
  const kolmiot = vesi(ESIMERKIT.vesi);
  assert.ok(kolmiot.length >= 1);
  for (const t of kolmiot) {
    assert.equal(t.rooli, 'vesi');
    for (const p of t.p) assert.equal(p[1], 0);
    const n = normaali(t);
    assert.ok(n[1] > 0.999, `veden normaalin tulee osoittaa ylös, oli ${n}`);
  }
});
