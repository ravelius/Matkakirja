// Testit aittaresepteille kangaspakka, vaatepino ja vaateorsi (fatabuuri vaateaitaksi, 29.9.2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESEPTIT, OLETUSPINNAT } from '../tools/dioraama/reseptit-aitta.mjs';
import { RESEPTIT as KAIKKI, OLETUSPINNAT as KAIKKI_PINNAT, sijoita } from '../tools/dioraama/reseptit.mjs';
import { PINNAT } from '../js/dioraama/pankit/pinnat.js';

const NIMET = ['kangaspakka', 'vaatepino', 'vaateorsi'];
const ROOLIT = {
  kangaspakka: ['kangas', 'reuna'], vaatepino: ['kangas', 'kangas2'], vaateorsi: ['puu', 'kangas', 'kangas2'],
};

function bbox(kolmiot) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const t of kolmiot) for (const p of t.p) for (let i = 0; i < 3; i++) {
    min[i] = Math.min(min[i], p[i]); max[i] = Math.max(max[i], p[i]);
  }
  return { min, max, koko: max.map((x, i) => x - min[i]) };
}
function ala2x(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  return Math.hypot(e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]);
}
const lähellä = (a, b, tol) => Math.abs(a - b) <= tol;

test('kolmioita, ei NaN, ei degeneroituneita, roolit tunnettuja ja pinnat olemassa (eri siemenillä)', () => {
  for (const nimi of NIMET) for (const siemen of [1, 7, 123]) {
    const kolmiot = RESEPTIT[nimi]({ siemen });
    assert.ok(kolmiot.length >= 12 && kolmiot.length <= 400, `${nimi}: ${kolmiot.length} kolmiota`);
    for (const t of kolmiot) {
      assert.equal(t.p.length, 3);
      for (const p of t.p) for (const x of p) assert.ok(Number.isFinite(x), `${nimi}: ei-äärellinen kärki`);
      assert.ok(ala2x(t) > 1e-12, `${nimi}: degeneroitunut kolmio`);
      assert.ok(t.rooli in OLETUSPINNAT[nimi], `${nimi}: rooli '${t.rooli}' puuttuu OLETUSPINNAT:sta`);
      assert.ok(Object.hasOwn(PINNAT, OLETUSPINNAT[nimi][t.rooli]), `${nimi}: pinta puuttuu PINNAT-pankista`);
    }
    const nahdyt = new Set(kolmiot.map((t) => t.rooli));
    for (const r of ROOLIT[nimi]) if (nimi !== 'vaateorsi' || siemen) assert.ok(nahdyt.has(r), `${nimi}: rooli ${r} puuttuu`);
  }
});

test('rekisteröity reseptit.mjs:ään ja sijoita() toimii', () => {
  for (const nimi of NIMET) {
    assert.ok(nimi in KAIKKI && nimi in KAIKKI_PINNAT, `${nimi}: ei rekisteröity`);
    const maailma = sijoita({ resepti: nimi, paikka: [1, 2, 3], suunta: 90 });
    assert.ok(maailma.length > 0 && maailma.every((t) => typeof t.pinta === 'string'));
  }
});

test('kangaspakka: u-akselin suuntainen, pituus ja säde parametrien mukaiset, pohja y = 0', () => {
  for (const [pituus, sade] of [[0.9, 0.09], [0.6, 0.06], [1.2, 0.12]]) for (const siemen of [1, 5, 9]) {
    const b = bbox(RESEPTIT.kangaspakka({ pituus, sade, siemen }));
    assert.ok(lähellä(b.koko[0], pituus, 1e-9), `pituus ${pituus}: ${b.koko[0]}`);
    assert.ok(lähellä(b.min[1], 0, 1e-9), `pohja ${b.min[1]}`);
    assert.ok(b.koko[1] >= 2 * sade * 0.85 && b.koko[1] <= 2 * sade * 1.07, `korkeus ${b.koko[1]}`);
    assert.ok(b.koko[2] >= 2 * sade * 0.93 && b.koko[2] <= 2 * sade * 1.07, `syvyys ${b.koko[2]}`);
    assert.ok(lähellä(b.min[0], -pituus / 2, 1e-9) && lähellä(b.max[0], pituus / 2, 1e-9));
  }
});

test('kangaspakka: päädyissä sisennetty kierre (reuna-kolmioita myös päätytason sisäpuolella)', () => {
  const k = RESEPTIT.kangaspakka({});
  const reuna = k.filter((t) => t.rooli === 'reuna');
  assert.ok(reuna.length > 40);
  const uArvot = new Set(reuna.flatMap((t) => t.p.map((p) => p[0].toFixed(4))));
  assert.ok(uArvot.size >= 6, `u-tasoja ${uArvot.size}`);
  assert.ok(k.some((t) => t.rooli === 'kangas'));
});

test('vaatepino: mahtuu leveys × syvyys -alaan, pohja y = 0, korkeus kerrosten mukaan', () => {
  for (const kerroksia of [3, 4, 5]) for (const siemen of [1, 4, 11]) {
    const b = bbox(RESEPTIT.vaatepino({ kerroksia, siemen }));
    assert.ok(b.koko[0] <= 0.45 + 1e-9 && b.koko[0] >= 0.45 * 0.8, `leveys ${b.koko[0]}`);
    assert.ok(b.koko[2] <= 0.35 + 1e-9 && b.koko[2] >= 0.35 * 0.8, `syvyys ${b.koko[2]}`);
    assert.ok(lähellä(b.min[1], 0, 1e-9));
    assert.ok(b.max[1] >= kerroksia * 0.038 && b.max[1] <= kerroksia * 0.058 + 1e-9, `korkeus ${b.max[1]}`);
  }
  const iso = bbox(RESEPTIT.vaatepino({ leveys: 0.8, syvyys: 0.6 }));
  assert.ok(iso.koko[0] <= 0.8 + 1e-9 && iso.koko[2] <= 0.6 + 1e-9 && iso.koko[0] > 0.6);
});

test('vaatepino: siemen muuttaa kierrot, mutta sama siemen antaa saman tuloksen', () => {
  const a = JSON.stringify(RESEPTIT.vaatepino({ siemen: 3 })), b = JSON.stringify(RESEPTIT.vaatepino({ siemen: 3 }));
  assert.equal(a, b);
  assert.notEqual(a, JSON.stringify(RESEPTIT.vaatepino({ siemen: 4 })));
});

test('vaateorsi: roikkuva (origon alapuolella y ≤ 0,05), pituus parametrin mukainen, vaatteet orren alla', () => {
  for (const [pituus, vaatteita, pituusVaate] of [[1.4, 4, 0.9], [1.0, 3, 0.6], [2.0, 6, 1.1]]) {
    const k = RESEPTIT.vaateorsi({ pituus, vaatteita, pituusVaate });
    const b = bbox(k);
    assert.ok(b.max[1] <= 0.05, `max y ${b.max[1]}`);
    assert.ok(lähellä(b.koko[0], pituus, 1e-9), `pituus ${b.koko[0]}`);
    assert.ok(b.min[1] <= -pituusVaate * 0.9 && b.min[1] >= -(pituusVaate + 0.03), `alaraja ${b.min[1]}`);
    const kangas = bbox(k.filter((t) => t.rooli !== 'puu'));
    assert.ok(kangas.max[1] <= -0.02 + 1e-9 && kangas.min[0] >= -pituus / 2 && kangas.max[0] <= pituus / 2);
    assert.ok(new Set(k.map((t) => t.rooli)).has('kangas2'));
  }
});

test('vaateorsi: vaatteita 3–6, useampi vaate lisää kolmioita; syvyys w pysyy ohuena (poimut)', () => {
  const kolmio = (n) => RESEPTIT.vaateorsi({ vaatteita: n }).length;
  assert.ok(kolmio(6) > kolmio(3));
  assert.equal(kolmio(1), kolmio(3));
  assert.equal(kolmio(9), kolmio(6));
  const b = bbox(RESEPTIT.vaateorsi({}));
  assert.ok(b.koko[2] <= 0.06 && b.koko[2] >= 0.03, `syvyys ${b.koko[2]}`);
});
