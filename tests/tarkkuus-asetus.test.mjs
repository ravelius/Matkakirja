/*
 * TARKKUUS LIIKKEESSÄ (js/tarkkuus-asetus.js, omistaja 22.9.2026): kolme
 * arvoa, pikselisuhde ja antialias niistä, muisti ja ilmoitus.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  TARKKUUDET, TARKKUUS_AVAIN, antialiasTarkkuudella, asetaTarkkuusLiikkeessa,
  pikselisuhdeTarkkuudella, tarkkuusLiikkeessa, unohdaTarkkuus,
} from '../js/tarkkuus-asetus.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('pikselisuhde: terävä ja kokeellinen 3 aina, tasainen 2 liikkeessä ja 3 levossa, dpr rajaa', () => {
  assert.equal(pikselisuhdeTarkkuudella('terava', 3, false), 3);
  assert.equal(pikselisuhdeTarkkuudella('terava', 3, true), 3);
  assert.equal(pikselisuhdeTarkkuudella('kokeellinen', 3, false), 3);
  assert.equal(pikselisuhdeTarkkuudella('tasainen', 3, false), 2);
  assert.equal(pikselisuhdeTarkkuudella('tasainen', 3, true), 3);
  assert.equal(pikselisuhdeTarkkuudella('tasainen', 2, true), 2);
  assert.equal(pikselisuhdeTarkkuudella('terava', 4, true), 3, 'dpr yli 3 ei kasvata puskuria');
  assert.equal(pikselisuhdeTarkkuudella('terava', NaN, true), 1);
});

test('antialias vain kokeellisessa pois', () => {
  assert.equal(antialiasTarkkuudella('terava'), true);
  assert.equal(antialiasTarkkuudella('tasainen'), true);
  assert.equal(antialiasTarkkuudella('kokeellinen'), false);
});

test('asetus muistiin, tapahtuma, ja lataustarve vain kun antialias vaihtuu', () => {
  const muisti = new Map();
  const tapahtumat = [];
  const win = {
    location: { search: '' },
    localStorage: { getItem: (k) => muisti.get(k) ?? null, setItem: (k, v) => muisti.set(k, v) },
    dispatchEvent: (e) => { tapahtumat.push(e.detail); return true; },
  };
  globalThis.CustomEvent ??= class { constructor(t, o) { this.type = t; this.detail = o?.detail; } };
  unohdaTarkkuus();
  assert.equal(tarkkuusLiikkeessa(win), 'terava', 'oletus');
  assert.equal(asetaTarkkuusLiikkeessa('tasainen', win), false, 'ei latausta');
  assert.equal(muisti.get(TARKKUUS_AVAIN), 'tasainen');
  assert.equal(tarkkuusLiikkeessa(win), 'tasainen');
  assert.equal(asetaTarkkuusLiikkeessa('kokeellinen', win), true, 'antialias vaihtuu → lataus');
  assert.equal(asetaTarkkuusLiikkeessa('roska', win), true, 'kelvoton → oletus (ja antialias palaa)');
  assert.equal(tarkkuusLiikkeessa(win), 'terava');
  assert.deepEqual(tapahtumat.map((t) => t.tarkkuus), ['tasainen', 'kokeellinen', 'terava']);
  // ?tarkkuus= voittaa muistin (mittaus).
  unohdaTarkkuus();
  muisti.set(TARKKUUS_AVAIN, 'tasainen');
  assert.equal(tarkkuusLiikkeessa({ ...win, location: { search: '?tarkkuus=kokeellinen' } }), 'kokeellinen');
  unohdaTarkkuus();
  assert.deepEqual([...TARKKUUDET], ['terava', 'tasainen', 'kokeellinen']);
});

test('pallo lukee asetuksen: antialias renderer-luonnissa, pikselisuhde kerroksen kanssa, taso levon suhteella', () => {
  const pallo = lue('../js/pallo.js');
  /*
   * Antialias luetaan yhä asetuksesta renderer-luonnissa; 22.9.2026
   * rinnalle tuli koelippu `?koe=alpha0`, joka antaa rendererConfigiin
   * itse luodun alfattoman kankaan ja kontekstin. Reunanpehmennys tulee
   * molemmissa poluissa samasta asetuksesta.
   */
  assert.match(pallo, /antialias: antialiasTarkkuudella\(tarkkuusLiikkeessa\(\)\),/);
  assert.match(pallo, /const alfaton = eiAlfaa \? luoAlfatonKonteksti\(kotelo, antialiasTarkkuudella\(tarkkuusLiikkeessa\(\)\)\)/);
  assert.match(pallo, /\.backgroundColor\(eiAlfaa \? kankaanTausta\(kotelo\) : 'rgba\(0,0,0,0\)'\)/);
  assert.match(pallo, /if \(kerrosKaytossa\) \{ tahdistaPikselisuhde\(lepoon\); return; \}/);
  assert.match(pallo, /pikselisuhdeTarkkuudella\(tarkkuusLiikkeessa\(ikkuna\), dpr, lepoon \|\| aina\(\)\)/);
  assert.match(pallo, /lepoSuhde: Math\.min\(ikkuna\.devicePixelRatio \|\| 1, LAATU_PIKSELISUHDE_LEPO\),/);
  const laatat = lue('../js/pallolaatat.js');
  assert.match(laatat, /const suhde = lepoSuhde \?\? mitat\.suhde;/);
  const main = lue('../js/main.js');
  assert.match(main, /Tarkkuus liikkeessä/);
  assert.match(main, /Reunanpehmennys vaihtuu seuraavassa latauksessa\./);
});
