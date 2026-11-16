// Äänitysjonon tarkistus (tools/aanitysjono/tarkista.mjs): avain = natiivin Valmisluennat.Avain, kappalejako = Puhe.cs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { avain, luenta, katkaise, lueJono, JONO } from '../tools/aanitysjono/tarkista.mjs';

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
