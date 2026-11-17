/*
 * ETUSIVU = PELIN ESITTELY (KK 17.11.2026 klo 11.57). index.html on esittelysivu, peli on pelaa.html.
 *   - etusivulla ei linkkiä peliin (pelaa.html) eikä noindexia (omistaja 09.23: web-peli ei ole vielä tarjolla);
 *   - jokainen sivusto/kuvat/-viittaus löytyy levyltä ja on pages.yml:n julkaisemaa tyyppiä (jpg, webp, png);
 *   - jos englanninkielinen en/index.html on olemassa: hreflang-pari fi ↔ en ja en-sivun polut alkavat ../.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const lue = (p) => readFileSync(join(JUURI, p), 'utf8');
const INDEX = lue('index.html');
const EN = existsSync(join(JUURI, 'en/index.html')) ? lue('en/index.html') : null;
const ilmanKommentteja = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

test('etusivulla ei linkkiä peliin eikä noindexia', () => {
  for (const [nimi, html] of [['index.html', INDEX], ...(EN ? [['en/index.html', EN]] : [])]) {
    const koodi = ilmanKommentteja(html);
    assert.doesNotMatch(koodi, /href\s*=\s*["'][^"']*pelaa\.html/i, `${nimi}: linkki pelaa.html:ään`);
    assert.doesNotMatch(koodi, /noindex/i, `${nimi}: noindex`);
  }
});

test('peli on pelaa.html ja se on noindex', () => {
  const peli = lue('pelaa.html');
  assert.match(peli, /<meta name="robots" content="noindex"/);
  assert.match(peli, /<script type="module" src="js\/main\.js">/);
});

test('jokainen sivusto/kuvat/-viittaus löytyy levyltä ja julkaistaan', () => {
  const lahteet = { 'index.html': INDEX, 'sivusto/sivusto.css': lue('sivusto/sivusto.css'), 'sivusto/sivusto.js': lue('sivusto/sivusto.js') };
  if (EN) lahteet['en/index.html'] = EN;
  let viittauksia = 0;
  for (const [nimi, teksti] of Object.entries(lahteet)) {
    for (const m of teksti.matchAll(/(?:\.\.\/|https:\/\/matkakirja\.app\/)?(sivusto\/kuvat\/[^"'\s)?#,]+)/g)) {
      viittauksia += 1;
      const polku = m[1];
      assert.ok(existsSync(join(JUURI, polku)), `${nimi}: ${polku} puuttuu levyltä`);
      assert.match(polku, /\.(jpg|webp|png)$/, `${nimi}: ${polku} ei ole julkaistavaa tyyppiä (pages.yml)`);
    }
  }
  assert.ok(viittauksia > 10, `liian vähän kuvaviittauksia (${viittauksia}) — muuttuiko polku?`);
});

test('pages.yml julkaisee etusivun, pelin ja sivusto/:n', () => {
  const yml = lue('.github/workflows/pages.yml');
  assert.match(yml, /cp index\.html pelaa\.html /);
  assert.match(yml, /cp sivusto\/sivusto\.css sivusto\/sivusto\.js _site\/sivusto\//);
  assert.match(yml, /find sivusto\/kuvat .*'\*\.jpg'.*'\*\.webp'.*'\*\.png'/);
});

test('en/index.html (jos on): hreflang-pari fi ↔ en ja polut alkavat ../', { skip: !EN && 'en/index.html puuttuu' }, () => {
  const hreflang = (html, kieli) => new RegExp(`<link[^>]+hreflang="${kieli}"`).test(html);
  assert.ok(hreflang(INDEX, 'en'), 'index.html: hreflang="en" puuttuu');
  assert.ok(hreflang(INDEX, 'fi'), 'index.html: hreflang="fi" puuttuu');
  assert.ok(hreflang(EN, 'fi'), 'en/index.html: hreflang="fi" puuttuu');
  assert.ok(hreflang(EN, 'en'), 'en/index.html: hreflang="en" puuttuu');
  const koodi = ilmanKommentteja(EN);
  for (const m of koodi.matchAll(/(?:src|href|data-suurenna)\s*=\s*"((?:sivusto|assets|js|css)\/[^"]*)"/g)) {
    assert.fail(`en/index.html: polku ${m[1]} ei ala ../`);
  }
});
