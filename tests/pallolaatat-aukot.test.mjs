import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * LAATTA EI JÄÄ AUKOKSI (omistaja 27.9.2026 klo 23.5x, iPad web): pallon laatta,
 * jonka yhden kerroksen kuva ei tullut, koottiin ilman sitä ja merkittiin valmiiksi
 * (pysyvä pergamenttiruutu), ja virheeseen jäänyttä laattaa ei haettu enää koskaan
 * (karkea taso näkyi läpi). Vartija lukee lataus- ja jonopolun lähdekoodista kuten
 * tests/pallolaatat.test.mjs.
 */
const LAATAT = readFileSync(new URL('../js/pallolaatat.js', import.meta.url), 'utf8');

test('pudonnut kerros (olemassa mutta ei tullut) tekee laatasta virheen, ei vajaata valmista', () => {
  assert.match(LAATAT, /const pudonnut = kerrostasot\.some\(\(k, i\) => !k\.reliefi && !kuvat\[i\]\s*&& pyramidinLaattaOlemassa\(k, t\.sarake, t\.rivi\)\);/);
  const kohta = LAATAT.indexOf('const pudonnut =');
  const kokoaminen = LAATAT.indexOf('const reliefiKohta =');
  assert.ok(kohta > 0 && kohta < kokoaminen, 'tarkistus ennen laatan kokoamista');
  assert.match(LAATAT.slice(kohta, kokoaminen), /merkitseVirhe\(t\);\s*return;/);
});

test('virhe uusitaan kasvavalla viiveellä, näkymätön virhelaatta puretaan', () => {
  assert.match(LAATAT, /const VIRHEEN_UUSINTA_MS = 1500;/);
  assert.match(LAATAT, /Math\.min\(VIRHEEN_UUSINTA_KATTO_MS, VIRHEEN_UUSINTA_MS \* 3 \*\* \(t\.virheita - 1\)\)/);
  const uusi = LAATAT.slice(LAATAT.indexOf('const uusiVirhe = '), LAATAT.indexOf('const uusiKaikkiVirheet'));
  assert.match(uusi, /if \(!t\.nakyva && !t\.pito\) \{ poista\(t\); return; \}/);
  assert.match(uusi, /t\.tila = 'ladataan';\s*t\.aloitettu = false;/);
  assert.match(LAATAT, /\.catch\(\(syy\) => \{ merkitseVirhe\(t\);/, 'kaatunut lataus uusitaan myös');
});

test('paluu näkyviin, sivun palautus ja verkon paluu uusivat virheet heti; purku irrottaa kuuntelijat', () => {
  for (const tapahtuma of ['visibilitychange', 'pageshow', 'online']) {
    assert.match(LAATAT, new RegExp(`addEventListener\\?\\.\\('${tapahtuma}', uusiKaikkiVirheet\\)`), tapahtuma);
    assert.match(LAATAT, new RegExp(`removeEventListener\\?\\.\\('${tapahtuma}', uusiKaikkiVirheet\\)`), `${tapahtuma} purussa`);
  }
});
