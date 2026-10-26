// Testit etsintäresepteille sinettisormus ja kaiverrus (voudin sinetti, 29.9.2026).
// Testataan RESEPTIT-taulun funktioita suoraan paikallisessa kehyksessä (u, y, w).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESEPTIT, OLETUSPINNAT } from '../tools/dioraama/reseptit-etsinta.mjs';
import { RESEPTIT as KAIKKI, OLETUSPINNAT as KAIKKI_PINNAT, sijoita } from '../tools/dioraama/reseptit.mjs';
import { PINNAT } from '../js/dioraama/pankit/pinnat.js';

const NIMET = ['kaiverrus', 'sinettisormus'];

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

test('molemmat reseptit tuottavat kolmioita: ei NaN, ei degeneroituneita, rooli tunnettu ja pinta olemassa', () => {
  for (const nimi of NIMET) {
    const kolmiot = RESEPTIT[nimi]({});
    assert.ok(kolmiot.length >= 12 && kolmiot.length <= 400, `${nimi}: ${kolmiot.length} kolmiota`);
    for (const t of kolmiot) {
      assert.equal(t.p.length, 3);
      for (const p of t.p) for (const x of p) assert.ok(Number.isFinite(x), `${nimi}: ei-äärellinen kärki`);
      assert.ok(ala2x(t) > 1e-14, `${nimi}: degeneroitunut kolmio`);
      assert.ok(t.rooli in OLETUSPINNAT[nimi], `${nimi}: rooli '${t.rooli}' puuttuu OLETUSPINNAT:sta`);
      assert.ok(Object.hasOwn(PINNAT, OLETUSPINNAT[nimi][t.rooli]), `${nimi}: pinta puuttuu PINNAT-pankista`);
    }
  }
});

test('rekisteröity reseptit.mjs:ään ja sijoita() toimii', () => {
  for (const nimi of NIMET) {
    assert.ok(nimi in KAIKKI && nimi in KAIKKI_PINNAT, `${nimi}: ei rekisteröity`);
    const maailma = sijoita({ resepti: nimi, paikka: [1, 2, 3], suunta: 90 });
    assert.ok(maailma.length > 0 && maailma.every((t) => typeof t.pinta === 'string'));
  }
  const kulta = sijoita({ resepti: 'sinettisormus', paikka: [0, 0, 0] });
  assert.ok(kulta.every((t) => t.pinta === 'kulta'));
});

test('sinettisormus: mitat parametrien mukaiset (leveys 2·sade, korkeus ≥ 2·sade, sinettilaatta yläreunassa)', () => {
  for (const sade of [0.008, 0.011, 0.015]) {
    const b = bbox(RESEPTIT.sinettisormus({ sade }));
    assert.ok(lähellä(b.koko[0], 2 * sade, 1e-6), `sade ${sade}: leveys ${b.koko[0]}`);
    assert.ok(lähellä(b.min[1], 0, 1e-6), `sade ${sade}: pohja y = ${b.min[1]}`);
    assert.ok(b.max[1] >= 2 * sade && b.max[1] <= 2 * sade + 0.004, `sade ${sade}: korkeus ${b.max[1]}`);
    assert.ok(b.koko[2] <= 2 * sade, `sade ${sade}: syvyys ${b.koko[2]}`);
  }
  const ohut = bbox(RESEPTIT.sinettisormus({ paksuus: 0.002 })), paksu = bbox(RESEPTIT.sinettisormus({ paksuus: 0.005 }));
  assert.ok(paksu.koko[2] > ohut.koko[2] - 1e-9 && paksu.koko[1] >= ohut.koko[1], 'paksuus ei vaikuta');
});

test('sinettisormus: segmentit muuttaa kolmiomäärää; rooleina metalli ja koho', () => {
  const vahan = RESEPTIT.sinettisormus({ segmentit: 8 }), paljon = RESEPTIT.sinettisormus({ segmentit: 24 });
  assert.ok(paljon.length > vahan.length);
  const roolit = new Set(RESEPTIT.sinettisormus({}).map((t) => t.rooli));
  assert.deepEqual([...roolit].sort(), ['koho', 'metalli']);
  assert.equal(OLETUSPINNAT.sinettisormus.metalli, 'kulta');
});

test('kaiverrus: leveys parametrin mukainen, kuvio ohut (w-paksuus ≤ 2 mm), +w pinnan normaali', () => {
  for (const leveys of [0.08, 0.12, 0.2]) {
    const b = bbox(RESEPTIT.kaiverrus({ leveys }));
    assert.ok(b.koko[0] <= leveys + 1e-9 && b.koko[0] >= 0.99 * leveys, `leveys ${leveys}: ${b.koko[0]}`);
    assert.ok(b.koko[2] <= 0.002, `w-paksuus ${b.koko[2]}`);
    assert.ok(lähellä(b.min[2], 0, 1e-9) && lähellä(b.max[2], 0.0005, 1e-9), 'kuvio 0..0,5 mm pinnasta ulos');
    assert.ok(b.koko[1] > 0 && b.koko[1] < leveys, 'korkeus järkevä');
  }
  const kaikki = RESEPTIT.kaiverrus({});
  assert.ok(kaikki.every((t) => t.rooli === 'kaiverrus') && OLETUSPINNAT.kaiverrus.kaiverrus === 'aukko');
  // Kansitasot (w = 0,5 mm) osoittavat +w:hen.
  const kansi = kaikki.filter((t) => t.p.every((p) => Math.abs(p[2] - 0.0005) < 1e-12));
  assert.ok(kansi.length > 10);
  for (const t of kansi) {
    const [a, b, c] = t.p;
    assert.ok((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0, 'kansi ei osoita +w');
  }
});

test('kaiverrus: naarmu = false jättää naarmun pois (vähemmän kolmioita, avain koko leveydelle)', () => {
  const on = RESEPTIT.kaiverrus({ naarmu: true }), pois = RESEPTIT.kaiverrus({ naarmu: false });
  assert.ok(on.length > pois.length);
  const b = bbox(pois);
  assert.ok(lähellä(b.koko[0], 0.12, 1e-4), `avain ilman naarmua: leveys ${b.koko[0]}`);
  // Naarmu on avaimen oikealla puolella: mukana ollessaan oikea reuna ulottuu naarmuun asti.
  assert.ok(bbox(on).max[0] >= 0.059);
});
