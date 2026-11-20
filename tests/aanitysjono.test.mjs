// Äänitysjonon tarkistus (tools/aanitysjono/tarkista.mjs): avain = natiivin Valmisluennat.Avain, kappalejako = Puhe.cs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { avain, luenta, katkaise, lueJono, JONO, kappaleet, NOPEUS } from '../tools/aanitysjono/tarkista.mjs';
import { FOKUSKOHTEET_FRA } from '../js/packs/fokuskohteet-fra.js';
import { HAHMOTELMA_FRA } from '../js/packs/hahmotelma-fra.js';

const W = 'oae6GCCzwoEbfc5FHdEu';

test('avain: sama kuin natiivin testivektori (NFC, nopeus kahdella desimaalilla, tyhjä tagi)', () => {
  const t = 'Pompeji. Vesuviuksen tuhka hautasi kaupungin vuonna 79.';
  assert.equal(avain(t, 'eleven_v4', W, 1.15, null), avain(t, 'eleven_v4', W, '1.150', ''));
  assert.notEqual(avain(t, 'eleven_v4', W, 1.15, '[pause]'), avain(t, 'eleven_v4', W, 1.15, ''));
  assert.equal(avain('Äiti', 'm', W, 1, ''), avain('Äiti', 'm', W, 1, ''));
});

test('luenta: otsikko liittyy seuraavaan kappaleeseen, tauot kappaleiden väliin', () => {
  const k1 = 'Ensimmäinen kappale kertoo jotain pitkää ja kiinnostavaa vanhasta kaupungista.';
  const k2 = 'Toinen kappale jatkaa tarinaa ja kertoo mitä tapahtui myöhemmin.';
  const [palat, tagit] = luenta(['Otsikko', k1, k2]);
  assert.deepEqual(palat, ['Otsikko. ' + k1, k2]);
  assert.deepEqual(tagit, ['[pause]', null]);
  assert.deepEqual(luenta(['Lyhyt.']), [[], []]);
});

test('katkaise: yli 2500 merkkiä katkeaa virkkeen loppuun', () => {
  const t = 'Sana sana sana. '.repeat(200);
  const k = katkaise(t);
  assert.ok(k.length <= 2500 && k.endsWith('.'));
});

test('jono: otsikkorivi ja 32-merkkiset avaimet', () => {
  assert.equal(readFileSync(JONO, 'utf8').split('\n')[0], 'avain\tkaupunki\tpaketti\tkohde\tpala\tpaiva');
  for (const r of lueJono()) assert.match(r.avain, /^[0-9a-f]{32}$/);
});

// L5-7 (KK 20.11.2026): jonon avaimet = pelin pyytämät palat. Peli (NostoJaksot.IlmanIsoisaa + nimijakso pois, NUI L5-1) lukee jaksoista
// vain leipätekstin: ei nimeä, esittelyä, isoisää eikä otsikkoa; jakso = yksi pala (Nostokortti.JaksoLuenta → LuennanPalatJaTagit).
const PARIISIN_JAKSOLLISET = ['tuileries', 'louvre', 'bastilji', 'eiffel-torni', 'sainte-chapelle', 'curie-1898', 'lumiere-1895',
  'lavoisier-1780', 'pasteur-1862', 'palais-garnier', 'hahmotelma-palais-orsay', 'hahmotelma-palais-industrie', 'hahmotelma-les-halles'];
const lahde = new Map([...FOKUSKOHTEET_FRA, ...HAHMOTELMA_FRA].map((x) => [x.id, x]));
const vienti = mkdtempSync(join(tmpdir(), 'aanitysjono-testi-'));
execFileSync(process.execPath, [join(import.meta.dirname, '../tools/vienti/vie-sisalto.mjs'), '--ulos', vienti], { stdio: 'ignore' });
const rivit = kappaleet(vienti);
rmSync(vienti, { recursive: true, force: true });
const MALLI = ['eleven_v4_turbo', W];
const pelinPalat = (x) => {
  const luettavat = x.jaksot.filter((j) => j.osa !== 'nimi' && j.osa !== 'esittely' && j.aani !== 'isoisa').map((j) => j.teksti.trim());
  const [palat, tagit] = luenta(luettavat);
  assert.equal(palat.length, luettavat.length, `${x.id}: jakso ei saa pilkkoutua eikä yhdistyä (pala = jakso)`);
  return palat.map((teksti, i) => ({ pala: i + 1, teksti, tagi: tagit[i] }));
};

test('jono: Pariisin 13 jaksollisen noston palat = pelin pyytämät (eroja 0), ei nimeä, esittelyä eikä isoisää', () => {
  assert.equal(PARIISIN_JAKSOLLISET.length, 13);
  let yht = 0;
  for (const id of PARIISIN_JAKSOLLISET) {
    const x = lahde.get(id);
    assert.ok(x && x.jaksot.length, `${id}: jaksot puuttuvat`);
    const odotus = pelinPalat(x).map((p) => avain(p.teksti, MALLI[0], MALLI[1], NOPEUS, p.tagi));
    const nyt = rivit.filter((r) => r.kohde === id && ['fokuskohteet', 'hahmotelma'].includes(r.paketti))
      .sort((a, b) => a.pala - b.pala).map((r) => avain(r.teksti, MALLI[0], MALLI[1], NOPEUS, r.tagi));
    assert.deepEqual(nyt, odotus, `${id}: jonon palat eroavat pelin pyytämistä`);
    yht += odotus.length;
    const kielletyt = x.jaksot.filter((j) => j.osa === 'nimi' || j.osa === 'esittely' || j.aani === 'isoisa').map((j) => j.teksti.trim());
    for (const r of rivit.filter((r) => r.kohde === id)) for (const k of kielletyt) assert.ok(!r.teksti.includes(k), `${id}: pala ${r.pala} sisältää nimi/esittely/isoisä-jakson "${k.slice(0, 30)}"`);
  }
  assert.ok(yht >= 13 * 3);
});

test('jono: jaksolla, jolla on oma äänite (aanikansio), ei ole jonoriviä', () => {
  const omat = rivit.filter((r) => r.oma);
  for (const r of omat) assert.ok(lahde.get(r.kohde).aanikansio, `${r.kohde}: oma ilman aanikansiota`);
  const jono = lueJono();
  for (const r of omat) assert.ok(!jono.some((j) => j.kohde === r.kohde && j.paketti === r.paketti && j.pala === String(r.pala)), `${r.kohde} pala ${r.pala}: oma äänite mutta jonossa`);
  for (const id of ['bastilji']) assert.ok(rivit.filter((r) => r.kohde === id).every((r) => r.oma) || !lahde.get(id).aanikansio);
});
