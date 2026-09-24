/*
 * Sähkepinnan tilannekuva liuskoiksi (js/sahke.js sahkeTilastaJono,
 * sahkeJasenNimet). Omistajan päätös 23.9.2026 (sama kuin natiivissa):
 *   1. lähettäjä, kysyjä ja vastaaja näytetään nimimerkkinä
 *      retkikunnan jäsenlistasta, ei jäsentunnuksena;
 *   2. omat sähkeet ja omat apupyynnöt merkitään nähdyiksi mutta eivät
 *      palaa itselle (worker hylkäisi vastauksen omaan pyyntöön, 409).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { sahkeJasenNimet, sahkeTilastaJono } from '../js/sahke.js';

const TILA = {
  jasenet: [
    { jasenId: 'j-oma', nimimerkki: 'Utelias Ilves' },
    { jasenId: 'j-muu', nimimerkki: 'Viisas Naali' },
  ],
  sahkeet: [
    { id: 's1', lahettaja: 'j-muu', pohjaId: 'saavuin', paikkaId: 'oslo', aika: '2026-09-23T10:00:00.000Z' },
    { id: 's2', lahettaja: 'j-oma', pohjaId: 'aarre-loytyi', paikkaId: 'oslo' },
    { id: 's3', lahettaja: 'j-tuntematon', pohjaId: 'saavuin', paikkaId: 'rooma' },
    { id: 's4', pohjaId: 'saavuin', paikkaId: 'rooma' },
    { id: 's5', lahettaja: 'j-muu', pohjaId: 'tuntematon-pohja', paikkaId: 'rooma' },
  ],
  apupyynnot: [
    { apuId: 'a1', kysyja: 'j-oma', kysymys: 'Oma?', vaihtoehdot: ['A', 'B'] },
    { apuId: 'a2', kysyja: 'j-muu', kysymys: 'Kaverin?', vaihtoehdot: ['A', 'B'] },
    { apuId: 'a3', kysymys: 'Nimetön?', vaihtoehdot: ['A', 'B'] },
  ],
};

const aja = (oma, nahdyt = new Set()) => sahkeTilastaJono(TILA, { nahdyt, oma, saate: () => 'saate' });

test('lähettäjä ja kysyjä nimimerkkinä, tuntematon tunnus sellaisenaan, puuttuva oletuksella', () => {
  const { jono } = aja('j-oma');
  const sahkeet = jono.filter((v) => v.laji === 'sahke');
  assert.deepEqual(sahkeet.map((v) => v.lahettaja), ['Viisas Naali', 'j-tuntematon', '']);
  const pyynnot = jono.filter((v) => v.laji === 'apupyynto');
  assert.deepEqual(pyynnot.map((v) => v.kysyja), ['Viisas Naali', 'Retkikunta']);
});

test('omat sähkeet ja apupyynnöt merkitään nähdyiksi mutta eivät palaa itselle', () => {
  const { jono, uudet } = aja('j-oma');
  assert.ok(!jono.some((v) => v.laji === 'sahke' && v.pohjaId === 'aarre-loytyi'), 'oma sähke ei jonossa');
  assert.ok(!jono.some((v) => v.apuId === 'a1'), 'oma apupyyntö ei jonossa');
  assert.deepEqual(uudet, ['s1', 's2', 's3', 's4', 's5', 'apu:a1', 'apu:a2', 'apu:a3']);
});

test('ilman omaa tunnusta mitään ei suodateta, ja nähdyt ohitetaan', () => {
  assert.equal(aja(null).jono.length, 7);
  const { jono, uudet } = aja('j-oma', new Set(['s1', 'apu:a2']));
  assert.deepEqual(jono.map((v) => v.pohjaId ?? v.apuId), ['saavuin', 'saavuin', 'a3']);
  assert.ok(!uudet.includes('s1') && !uudet.includes('apu:a2'));
});

test('vastaajan nimi jäsenlistasta (kaveriavun veikkaus)', () => {
  const nimi = sahkeJasenNimet(TILA);
  assert.equal(nimi('j-muu', 'Retkikunta'), 'Viisas Naali');
  assert.equal(nimi(undefined, 'Retkikunta'), 'Retkikunta');
  assert.equal(sahkeJasenNimet({ jasenet: 'rikki' })('j-x', 'R'), 'j-x');
});
