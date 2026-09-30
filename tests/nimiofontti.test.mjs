// Polton fontti rekisteröidään repon tiedostoista, ja puuttuva fontti pysäyttää polton (Fable 24.9.2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const lahde = readFileSync(new URL('../tools/generoi-laattapyramidi.mjs', import.meta.url), 'utf8');
const kansio = new URL('../tools/fokuskartta/fontit/', import.meta.url);

test('Liberation Serif -tiedostot ja OFL-lisenssi ovat repossa, SHA-256 kuten LAHDE.txt', () => {
  const lahdeTxt = readFileSync(new URL('LAHDE.txt', kansio), 'utf8');
  for (const f of ['LiberationSerif-Regular.ttf', 'LiberationSerif-Italic.ttf']) {
    const b = readFileSync(new URL(f, kansio));
    assert.ok(lahdeTxt.includes(`${createHash('sha256').update(b).digest('hex')}  ${f}`), f);
  }
  assert.match(readFileSync(new URL('OFL.txt', kansio), 'utf8'), /SIL OPEN FONT LICENSE Version 1\.1/);
  assert.ok(statSync(new URL('LiberationSerif-Regular.ttf', kansio)).size > 100000);
});

test('polton sivu rekisteröi fontin ja pysähtyy, jos se puuttuu', () => {
  assert.match(lahde, /@font-face \{ font-family: "Liberation Serif"; font-style: normal;.*LiberationSerif-Regular\.ttf/);
  assert.match(lahde, /@font-face \{ font-family: "Liberation Serif"; font-style: italic;.*LiberationSerif-Italic\.ttf/);
  assert.match(lahde, /'\/fontit\/LiberationSerif-Regular\.ttf': join\(TAALLA, 'fokuskartta', 'fontit'/);
  assert.match(lahde, /FONTTI PUUTTUU/);
  // Valmis-lippu vain fonttitarkistuksen jälkeen.
  assert.ok(lahde.indexOf('FONTTI PUUTTUU') < lahde.indexOf("document.body.dataset.valmis = '1'"));
});
