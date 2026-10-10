/*
 * KAUPUNKI OMAN MAANSA SISÄLLÄ (PT 10.10.2026, Karttasepän erä).
 *
 * Laudan x/y on käsin sommiteltu eikä muutu (PT 7.9.2026: reitit, via-pisteet
 * ja minCityDistance nojaavat siihen); pallo ja vienti näyttävät kaupungin sen
 * omassa pallopisteessä (js/packs/maailmankartta-pallopisteet.js, Wikidata).
 * Siksi tarkistetaan PALLOPISTE: sen pitää olla kaupungin cityCountry-maan
 * rajojen (countryShapes) sisällä tai enintään RANTAVARA yksikön päässä niistä
 * — rannikkokaupungit osuvat karkean 50m-rantaviivan ulkopuolelle muutaman
 * yksikön. Toisen maan sisällä se ei saa olla.
 *
 * Kaikki maat -projektin uudet rajat paljastivat tasokartan vanhoja
 * sijoitteluja (Kano Nigerissä, Riika Liettuassa); pallopisteillä ne ovat
 * oikein, ja tämä testi pitää ne oikeina.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { PALLON_KAUPUNKIPISTEET } from '../js/packs/maailmankartta-pallopisteet.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';

const RANTAVARA = 5;

/*
 * Poikkeukset perusteluineen. Lista saa vain lyhentyä.
 */
const POIKKEUKSET = {
  // Merentakaiset alueet: emämaan countryShape ei sisällä niitä.
  noumea: 'Uusi-Kaledonia (FRA), ei Ranskan muodossa',
  cayenne: 'Ranskan Guayana (FRA), ei Ranskan muodossa',
  bermuda: 'Bermuda (GBR), ei Britannian muodossa',
  falkland: 'Falklandinsaaret (GBR), ei Britannian muodossa',
  sanambrosio: 'Desventuradas-saaret (CHL), pudonneet pienet saaret',
  // Aluemerkit ja luontokohteet: laudan oma piste, ei asutusta (7.9.2026 linjaus).
  alpit: 'Alpit, aluemerkki Sveitsin ja Ranskan rajalla',
  titicaca: 'Titicaca, Perun ja Bolivian rajajärvi',
  sthelena: 'Saint Helena, muodossa vain pääsaari (sade 200)',
  sahalin: 'Sahalin, saaren aluemerkki salmen puolella',
  borneo: 'Borneo, saaren aluemerkki',
  hawaii: 'Havaiji, saariston aluemerkki',
  sansibar: 'Sansibar, saari Tansanian muodon ulkopuolella',
  rashafun: 'Ras Hafun, niemi pudonneena muodosta',
  caphorn: 'Kap Horn, saari pudonneena Chilen muodosta',
  // Ei maata pelin datassa tarkoituksella (PT 10.10.2026).
  jerusalem: 'ilman maata, ei kannanottoa',
};

const W = MAAILMANKARTTA.map.width;
const muodot = MAAILMANKARTTA.map.countryShapes;
const maa = MAAILMANKARTTA.map.cityCountry;

const sisalla = ([px, py], r) => {
  let o = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i];
    const [xj, yj] = r[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) o = !o;
  }
  return o;
};
const janaan = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const kierrokset = ([x, y]) => [[x, y], [x - W, y], [x + W, y]];
const muodossa = (p, m) => m.renkaat.some((r) => kierrokset(p).some((q) => sisalla(q, r)));
const rajaan = (p, m) => Math.min(...m.renkaat.flatMap((r) => r.slice(1).flatMap((b, i) => kierrokset(p).map((q) => janaan(q, r[i], b)))));

function pallopiste(c) {
  const p = c.pallo ?? PALLON_KAUPUNKIPISTEET[c.id];
  if (!p) return [c.x, c.y];
  const l = projisoiLaudalle('maailmankartta', p.lon, p.lat);
  return [l.x, l.y];
}

test('kaupungin pallopiste on oman maansa sisällä tai rannikolla (PT 10.10.2026)', () => {
  const vialliset = [];
  for (const c of MAAILMANKARTTA.cities) {
    if (POIKKEUKSET[c.id]) continue;
    const iso = maa[c.id];
    const m = muodot[iso];
    if (!m) { vialliset.push(`${c.id}: maata ${iso} ei ole laudalla`); continue; }
    const p = pallopiste(c);
    const muu = Object.entries(muodot).find(([j, t]) => j !== iso && muodossa(p, t))?.[0];
    if (muu && !muodossa(p, m)) { vialliset.push(`${c.id}: ${iso}-kaupunki on maan ${muu} sisällä`); continue; }
    if (!muodossa(p, m)) {
      const d = rajaan(p, m);
      if (d > RANTAVARA) vialliset.push(`${c.id}: ${d.toFixed(1)} yks maan ${iso} ulkopuolella`);
    }
  }
  assert.deepEqual(vialliset, []);
});

test('poikkeuslistalla on vain laudan kaupunkeja, jotka todella poikkeavat', () => {
  const idt = new Set(MAAILMANKARTTA.cities.map((c) => c.id));
  for (const id of Object.keys(POIKKEUKSET)) {
    assert.ok(idt.has(id), `${id} ei ole laudalla`);
    const c = MAAILMANKARTTA.cities.find((k) => k.id === id);
    const m = muodot[maa[id]];
    if (!m) continue;
    const p = pallopiste(c);
    assert.ok(!muodossa(p, m) || Object.entries(muodot).some(([j, t]) => j !== maa[id] && muodossa(p, t)),
      `${id} on jo oman maansa sisällä — poista poikkeuslistalta`);
  }
});

test('Islannin muoto on Natural Earthin paikalla (Reykjavík rannalla, 10.10.2026)', () => {
  const isl = muodot.ISL;
  const r = projisoiLaudalle('maailmankartta', -21.94, 64.15);
  assert.ok(rajaan([r.x, r.y], isl) < RANTAVARA || muodossa([r.x, r.y], isl));
  assert.ok(isl.leveys > 300, `Islannin leveys ${isl.leveys}`);
});
