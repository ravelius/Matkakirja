/*
 * GL-kerroksen rasterilähde (js/pallolauta/nimiorasterit.js): nimen ja
 * pisteen rasterointi (koekanvas), avaimet, noston reseptit samasta
 * funktiosta kuin SVG-polku, katon muuttujat ja lähteen LRU/tilaajat.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  NIMIORASTERIEN_KATTO, luoRasterilahde, nimenAvain, nostonKatto, nostonReseptit, rasteroiNimi, rasteroiPiste,
} from '../js/pallolauta/nimiorasterit.js';
import { nostosymRasterinAvain, nostosymReseptit } from '../js/fokusnosto-symbolit.js';

/** Koekanvas: tallentaa kutsut, mittaa 7 px per merkki. */
const luoKangas = (w, h) => {
  const kutsut = [];
  const ctx = {
    font: '', textBaseline: '', textAlign: '', lineJoin: '', fillStyle: '', strokeStyle: '', lineWidth: 0,
    measureText: (m) => ({ width: 7 * [...m].length }),
    fillText: (m, x, y) => kutsut.push(['fill', m, x, y]),
    strokeText: (m, x, y) => kutsut.push(['stroke', m, x, y]),
    beginPath: () => kutsut.push(['beginPath']), arc: (...a) => kutsut.push(['arc', ...a]), fill: () => kutsut.push(['fillArc']), stroke: () => kutsut.push(['strokeArc']),
  };
  return { width: w, height: h, kutsut, getContext: () => ctx };
};

test('nimen rasteri: mitat kirjaimista ja välistä, ankkuri text-anchorin mukaan, halo ennen mustetta, laitepikselit', () => {
  const asu = { kirjasin: 'Palatino', muste: 'rgba(1,2,3,0.9)', halo: 'rgba(240,228,200,0.9)', haloLeveys: 2, tyyli: 'normal' };
  const r = rasteroiNimi({ teksti: 'Nizza', koko: 13.5, ank: 'middle', vali: 1 }, asu, 2, luoKangas);
  // 5 merkkiä × 7 px + 4 väliä × 2 px = 43; pehmuste (3 + 2) × 2 = 10 per puoli.
  assert.equal(r.w, 63);
  assert.equal(r.ankkuriX, 10 + 43 / 2);
  assert.equal(r.ankkuriY, r.h / 2);
  assert.equal(r.skaala, 0.5);
  assert.equal(r.katto, null);
  const lajit = r.kuva.kutsut.map((k) => k[0]);
  assert.deepEqual(lajit.slice(0, 5), ['stroke', 'stroke', 'stroke', 'stroke', 'stroke'], 'halo ensin');
  assert.equal(lajit.filter((l) => l === 'fill').length, 5);
  const alku = rasteroiNimi({ teksti: 'Nizza', koko: 13.5, ank: 'start' }, { ...asu, halo: null, haloLeveys: 0 }, 1, luoKangas);
  assert.equal(alku.ankkuriX, 3, 'start: ankkuri pehmusteen jälkeen');
  assert.ok(!alku.kuva.kutsut.some((k) => k[0] === 'stroke'), 'ilman haloa ei strokea');
  assert.equal(r.kuva.getContext().font, '27px Palatino', 'kirjasin laitepikseleinä (13,5 × 2)');
});

test('nimen avain: teksti, koko, ankkuri, tyylitys, väli ja dpr', () => {
  assert.equal(nimenAvain({ teksti: 'Marseille', koko: 13.5, ank: 'middle', tyylitys: 'small-caps', vali: 1.89 }, 2), 'nimi|Marseille|13.50|middle|small-caps|1.89|2');
  assert.notEqual(nimenAvain({ teksti: 'A', koko: 13 }, 1), nimenAvain({ teksti: 'A', koko: 13 }, 2));
});

test('pisteen rasteri: kiekko keskellä, säde laitepikseleinä', () => {
  const r = rasteroiPiste({ sadePx: 4.5, vari: '#8c6d4e', reuna: '#000' }, 2, luoKangas);
  assert.equal(r.w, 24);
  assert.equal(r.ankkuriX, 12);
  const arc = r.kuva.kutsut.find((k) => k[0] === 'arc');
  assert.deepEqual(arc.slice(1, 4), [12, 12, 9]);
  assert.ok(r.kuva.kutsut.some((k) => k[0] === 'strokeArc'));
});

test('noston reseptit tulevat samasta funktiosta kuin SVG-polku, ja katto lasketaan kuten --nimio-a/-b', () => {
  const d = { kategoria: 'kaupunki', symLaji: 'kaupunki', nimi: 'Nizza', puoli: 'vasen', taso: 2, mitta: 1.2, mittaRaaka: 1.8 };
  const r = nostonReseptit(d);
  const odotus = nostosymReseptit('kaupunki', 'Nizza', 'kaupunki', 'vasen', { kuvamerkki: null, ruutuKerroin: 1, tumma: false });
  assert.equal(r.ikoni.teksti, '');
  assert.equal(r.ikoni.ilmanIkonia, false);
  assert.equal(r.nimio.teksti, odotus.nimio.teksti);
  assert.equal(r.nimio.ilmanIkonia, true);
  assert.equal(r.nimio.puoli, odotus.nimio.puoli);
  assert.equal(nostosymRasterinAvain(r.nimio, 3), nostosymRasterinAvain(odotus.nimio, 3));
  assert.equal(nostonReseptit({ ...d, nimi: null }).nimio, null);
  assert.deepEqual(nostonKatto(d, 1.4545), { a: 1.5, b: 1.4545 / 1.2 });
  assert.equal(nostonKatto(d, Infinity), null);
});

test('rasterilähde: hae palauttaa ensin keskeneräisen ja tilaajalle avaimen, sitten valmiin; LRU sulkee vanhimman', async () => {
  const suljetut = [];
  const luo = (w, h) => ({ ...luoKangas(w, h), close: () => suljetut.push(w) });
  const kotelo = { style: { getPropertyValue: (n) => (n === '--nimiokerroin' ? '1.0234' : '') } };
  const lahde = luoRasterilahde({ kotelo, dpr: 1, doc: null, luoKangas: luo, bitmap: false });
  const avaimet = [];
  lahde.tilaaRasterit((a) => avaimet.push(a));
  assert.equal(lahde.kuorenKerroin(), 1.0234);
  const [eka] = lahde.hae({ laji: 'piste', sadePx: 3, vari: '#000' });
  assert.equal(eka.valmis, false);
  assert.equal(eka.osa, 'piste');
  await new Promise((r) => setTimeout(r, 10));
  assert.deepEqual(avaimet, [eka.avain]);
  const [toka] = lahde.hae({ laji: 'piste', sadePx: 3, vari: '#000' });
  assert.equal(toka.valmis, true);
  assert.equal(toka.w, 9);
  assert.equal(lahde.tila().valmiita, 1);
  // Nimi ilman dokumenttia: fontit "valmiit" (doc null) → rasteroituu koekankaalla.
  const [nimi] = lahde.hae({ laji: 'nimi', teksti: 'Aix', koko: 12, ank: 'start' });
  assert.equal(nimi.valmis, false);
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(lahde.hae({ laji: 'nimi', teksti: 'Aix', koko: 12, ank: 'start' })[0].valmis, true);
  // LRU: yli katon menevät suljetaan vanhin ensin.
  for (let i = 0; i < NIMIORASTERIEN_KATTO; i += 1) lahde.hae({ laji: 'piste', sadePx: 1 + i / 100, vari: '#111' });
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(lahde.tila().valmiita, NIMIORASTERIEN_KATTO);
  assert.ok(suljetut.length >= 2, 'vanhimmat suljettu');
  lahde.pura();
  assert.equal(lahde.tila().valmiita, 0);
});

test('noston mitta ja katto luetaan joka haulla datumista, ei rasterin välimuistista (21.9.2026 Camargue)', () => {
  const kotelo = { style: { getPropertyValue: () => '' } };
  const lahde = luoRasterilahde({ kotelo, dpr: 1, doc: null, luoKangas, bitmap: false, katto: 1.4545 });
  const d = { laji: 'nosto', kategoria: 'kaupunki', symLaji: 'kaupunki', nimi: 'Arles', puoli: 'oikea', taso: 2, mitta: 1.2, mittaRaaka: 1.8 };
  const [ikoni1, nimio1] = lahde.hae(d);
  // Sama nosto sisemmällä zoomilla: sama rasteriavain, uusi mitta.
  const [ikoni2, nimio2] = lahde.hae({ ...d, mitta: 1.4545, mittaRaaka: 2.4 });
  assert.equal(ikoni1.avain, ikoni2.avain);
  assert.equal(nimio1.avain, nimio2.avain);
  assert.ok(ikoni2.skaala > ikoni1.skaala, 'skaala seuraa datumin mittaa');
  assert.equal(ikoni2.skaala / ikoni1.skaala, nimio2.skaala / nimio1.skaala);
  assert.deepEqual(nimio1.katto, { a: 1.5, b: 1.4545 / 1.2 });
  assert.deepEqual(nimio2.katto, { a: 2.4 / 1.4545, b: 1 });
  // Toinen saman kategorian nosto isommalla kertoimella: sama ikonikuva, oma koko.
  const [ikoni3] = lahde.hae({ ...d, nimi: 'Nîmes', mitta: 1.2 * 1.3, mittaRaaka: 1.8 * 1.3 });
  assert.equal(ikoni3.avain, ikoni1.avain);
  assert.ok(Math.abs(ikoni3.skaala / ikoni1.skaala - 1.3) < 1e-9);
});

test('sw.js kantaa rasterilähteen', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.match(sw, /'\.\/js\/pallolauta\/nimiorasterit\.js'/);
});
