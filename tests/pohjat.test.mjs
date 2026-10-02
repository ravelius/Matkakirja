// UI-pohjat webissä (omistaja 1.10.2026): KorttiData-malli, kuvasäännöt ja pohjasäännön vahti (css/pohjat/
// käyttää vain tyylikirjan tokeneita; uusi väri tai koko pohjien ulkopuolelta → punainen, UI-pohjat kohta 8).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tarkistaKorttiData, pohjaKuvienRoolit } from '../js/pohjat/korttidata.js';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const CSS = pohjatCss();
const POHJAT = lue('../js/pohjat/pohjat.js');

test('kuvasäännöt: 1 hero, 2 hero + upotus, 3+ hero + galleria', () => {
  assert.deepEqual(pohjaKuvienRoolit(0), []);
  assert.deepEqual(pohjaKuvienRoolit(1), ['hero']);
  assert.deepEqual(pohjaKuvienRoolit(2), ['hero', 'upotus']);
  assert.deepEqual(pohjaKuvienRoolit(4), ['hero', 'galleria', 'galleria', 'galleria']);
});

test('KorttiData siistitään: tyhjä hylätään, teksti kappaleeksi, napit tyypitetään, rajaus tarkistetaan', () => {
  assert.equal(tarkistaKorttiData(null), null);
  assert.equal(tarkistaKorttiData({ otsikko: '  ' }), null);
  const d = tarkistaKorttiData({
    otsikko: ' Akropolis ',
    teksti: 'Kalliolinna.',
    kuvat: [{ url: 'a.jpg', rajaus: '50% 20%' }, { url: 'b.jpg', rajaus: 'keskeltä' }, { url: '' }],
    napit: [{ teksti: 'Lehti', tyyppi: 'ensisijainen', toiminto: 'lehti' }, { teksti: 'Kysy', tyyppi: 'outo' }, { teksti: '' }],
    teema: 'tumma',
  });
  assert.equal(d.otsikko, 'Akropolis');
  assert.deepEqual(d.kappaleet, [{ otsikko: '', teksti: 'Kalliolinna.', korostus: false, lista: [] }]);
  assert.deepEqual(d.kuvat.map((k) => [k.rooli, k.rajaus]), [['hero', '50% 20%'], ['upotus', '']]);
  assert.deepEqual(d.napit.map((n) => n.tyyppi), ['ensisijainen', 'toiminto']);
  assert.equal(d.teema, 'tumma');
  assert.equal(tarkistaKorttiData({ otsikko: 'x', teema: 'neon' }).teema, 'paperi');
});

test('pohjasäännön vahti: css/pohjat/*.css ilman omia värejä, kokoja tai kestoja', () => {
  const ilmanKommentteja = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/#[0-9a-f]{3,8}\b/i.test(ilmanKommentteja), 'heksaväri pohjissa: lisää se tyylikirja.json:iin');
  assert.ok(!/rgba?\(/i.test(ilmanKommentteja), 'rgb-väri pohjissa: lisää se tyylikirja.json:iin');
  // Fonttikoot ja kestot vain tokeneista (0 ja 1px viivat sallittu, samoin kahvan 36×4 ja 6 px:n marginaali).
  for (const m of ilmanKommentteja.matchAll(/font-size:\s*([^;]+);/g)) {
    assert.match(m[1], /var\(--tk-koko-/, `font-size ${m[1]}`);
  }
  for (const m of ilmanKommentteja.matchAll(/(\d+)ms/g)) assert.fail(`kesto ${m[0]} ilman tokenia`);
  // Animaatiot ≤ 250 ms (kohta 6): pohjat käyttävät vain avaus- ja sulkukestoa.
  assert.ok(!/--tk-kesto-liuku|--tk-kesto-maksimi/.test(ilmanKommentteja));
});

test('NOSTOKORTTI ilman ✕:ää, sulku Esc + veto + ohinapautus; KORTTI modaali vain napeista', () => {
  const k = POHJAT.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  // ✕ kielletty vain NOSTOKORTILTA (löydös 133); KUVANÄKYMÄN sulku on ✕ (tyylikirja.json).
  const nosto = k.slice(k.indexOf('export function luoPohjaNostokortti'), k.indexOf('export function luoPohjaKortti'));
  assert.ok(nosto.length > 200 && !/'✕'|"✕"/.test(nosto), 'nostokortissa ei ✕:ää (löydös 133)');
  const kuva = k.slice(k.indexOf('export function luoPohjaKuvanakyma'));
  assert.match(kuva, /tk-kuvanakyma__sulku tk-teema-\$\{ohjainteema\}`, '✕'/, 'KUVANÄKYMÄn ✕ on LASI-teemaa');
  assert.match(k, /e\.key !== 'Escape'/);
  assert.match(k, /if \(ylin\.modaali\) return;/);
  assert.match(k, /if \(!modaali\) tausta\.addEventListener\('click'/);
  assert.match(k, /POHJA_VETO_PX = 40/);
});

test('pohjat on kytketty sivuun, välimuistiin ja nippuun', () => {
  // Tyylitiedostojen lista (js/pohjat/tyylit.js) tarkistetaan tests/pohjat-tyylit.test.mjs:ssä.
  assert.match(lue('../sw.js'), /'\.\/css\/pohjat\/perus\.css'/);
  assert.match(lue('../tools/build-standalone.mjs'), /'css\/pohjat\/perus\.css'/);
  assert.match(lue('../tyylikirja.html'), /js\/pohjat\/tyylikirja-sivu\.js/);
});

test('puuttuva kuva poistaa kuvapaikan (omistaja 2.10. klo 13.53: Bobovacin harmaa laatikko)', () => {
  const lahde = readFileSync(new URL('../js/pohjat/pohjat.js', import.meta.url), 'utf8');
  assert.match(lahde, /img\.addEventListener\('error', \(\) => \{ poistui\?\.\(kehys\); kehys\.remove\(\); \}, \{ once: true \}\);\n  img\.src = kuva\.url;/);
  assert.match(lahde, /kehys\.before\(pohjaSolmu\('hr', 'tk-viiva'\)\)/);
  assert.match(lahde, /img\.addEventListener\('error', \(\) => \{ b\.remove\(\); if \(!nauha\.children\.length\) nauha\.remove\(\); \}/);
});
