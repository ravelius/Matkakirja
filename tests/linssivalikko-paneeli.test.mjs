// Linssin hampurilainen PANEELI (LASI) -pohjalla (Natiivi-UI 1.10.2026, 2. erä): vain ulkoasu, järjestys ennallaan.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const VALIKKO = lue('../js/aikajana-valikko.js');
const CSS = pohjatCss();

test('kotelo saa pohjan luokat lipun takana; erotin toimintojen ja kytkinten välissä; järjestys ennallaan', () => {
  assert.match(VALIKKO, /kotelo\.classList\.add\('tk-paneeli-linssivalikko', `tk-teema-\$\{teema\}`\);/);
  const poistu = VALIKKO.indexOf("komento('aikajana-valikko-poistu'");
  const alusta = VALIKKO.indexOf("komento('aikajana-valikko-alusta'");
  const erotin = VALIKKO.indexOf("solmu('div', 'tk-paneeli__erotin')");
  const kertoja = VALIKKO.indexOf("kytkin('aikajana-valikko-kertoja'");
  const musiikki = VALIKKO.indexOf("kytkin('aikajana-valikko-musiikki'");
  assert.ok(poistu < alusta && alusta < erotin && erotin < kertoja && kertoja < musiikki);
});

test('LASI-asu tokeneista: nappi 38 (osuma 44), rivit 38 leipää, kytkimen tila kapiteelina', () => {
  assert.match(CSS, /\.tk-paneeli-linssivalikko \.aikajana-valikko \{[\s\S]*?background: var\(--tk-pinta\);/);
  assert.match(CSS, /\.tk-paneeli-linssivalikko \.aikajana-valikko-kohta \{[\s\S]*?min-height: var\(--tk-nappi-korkeus\);[\s\S]*?font-size: var\(--tk-koko-leipa\);/);
  assert.match(CSS, /\.tk-paneeli-linssivalikko \.aikajana-valikko-kytkin\.valittu \.aikajana-valikko-tila \{ color: var\(--tk-korostus\);/);
});
