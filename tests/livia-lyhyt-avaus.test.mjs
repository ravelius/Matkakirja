import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * KERRAN + OHITA (omistaja 27.9.2026 klo 17.2x): Livian koko
 * avausesittely näytetään laitteella kerran; seuraavilla uusilla
 * matkoilla yksi lyhyt kupla, ele ja Ohita-nappi.
 */

const muisti = new Map();
globalThis.localStorage = {
  getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
  setItem: (k, v) => muisti.set(k, String(v)),
  removeItem: (k) => muisti.delete(k),
};

const {
  LIVIAN_UUSI_MATKA, LIVIA_UUSI_MATKA_TALLE, LIVIA_AVAUS_TALLE,
  livianUudenMatkanRepliikki, naytaLivianAvaus, peruLivianAvaus,
} = await import('../js/livia.js');
const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('lyhyet repliikit: vähintään kaksi, kukin ≤ 85 merkkiä (Livian katto)', () => {
  assert.ok(LIVIAN_UUSI_MATKA.length >= 2);
  for (const t of LIVIAN_UUSI_MATKA) assert.ok(t.length <= 85, `${t.length}: ${t}`);
});

test('lyhyet repliikit kiertävät: sama ei toistu peräkkäin, kierros palaa alkuun', () => {
  muisti.delete(LIVIA_UUSI_MATKA_TALLE);
  const saadut = LIVIAN_UUSI_MATKA.map(() => livianUudenMatkanRepliikki().indeksi);
  assert.deepEqual(saadut, LIVIAN_UUSI_MATKA.map((_, i) => i));
  assert.equal(livianUudenMatkanRepliikki().indeksi, 0);
});

test('nähty esittely → lyhyt tervehdys alkaa (ei koko sarjaa); nähty ei → koko sarja', () => {
  const ui = { game: { phase: 'pickstart' }, reducedMotion: true };
  muisti.set(LIVIA_AVAUS_TALLE, '1');
  assert.equal(naytaLivianAvaus(ui), true, 'lyhyt tervehdys alkaa nähdyllä laitteella');
  assert.equal(naytaLivianAvaus(ui), false, 'ei kahta päällekkäin');
  peruLivianAvaus();
  const livia = lue('../js/livia.js');
  assert.match(livia, /if \(livianAvausNahty\(\)\) return naytaLivianLyhytAvaus\(ui\);/);
  assert.match(livia, /ohita: true,/);
});

test('Ohita-nappi: naytaAvauskupla({ ohita }) lisää napin, joka kuittaa kerran', () => {
  const pollo = lue('../js/pollo.js');
  assert.match(pollo, /lennahda = false, kuittaus = null, muotokuva = false, ohita = false,/);
  assert.match(pollo, /polloElementti\('button', 'pollo-vihje-ohita', 'Ohita'\)/);
  assert.match(lue('../css/styles.css'), /\.pollo-vihje-ohita \{[^}]*min-height: 2rem;/);
});
