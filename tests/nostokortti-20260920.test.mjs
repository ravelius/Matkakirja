/*
 * NOSTOKORTTI-ERÄ (omistaja 20.9.2026): lähderivi pois, karuselli
 * kohdekortille, "Havainnekuva"-merkki, kuvan koko LISÄÄ-tilassa,
 * pyyhkäisy ja nuolinäppäimet. Selainpuoli: tools/savukkeet/
 * savuke-nostokortti.mjs. Tässä puhtaat säännöt ja lähdemuoto.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { onHavainnekuva, HAVAINNEKUVA_LAHDE_RE } from '../js/havainnekuva.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('havainnekuva tunnistetaan lähderivin alusta, ei polusta', () => {
  assert.ok(onHavainnekuva({ lahde: 'Tekoälyllä tuotettu havainnekuva. Viitteet: …' }));
  assert.ok(onHavainnekuva({ lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa' }));
  assert.ok(!onHavainnekuva({ lahde: 'Valokuva: Jean-Marc Rosier, Wikimedia Commons (CC BY-SA 3.0).' }));
  // /karttanostot/-polku EI ole merkki (Fable 20.9.2026): aitoja Commons-kuvia.
  assert.ok(!onHavainnekuva({ osoite: 'https://media.matkakirja.app/karttanostot/20260918/x.jpg', lahde: 'Valokuva: X, Wikimedia Commons (CC0).' }));
  assert.ok(!onHavainnekuva(null));
  assert.ok(HAVAINNEKUVA_LAHDE_RE.test('  Tekoälyllä tuotettu havainnekuva. '));
  assert.ok(!HAVAINNEKUVA_LAHDE_RE.test('Viitteet: Tekoälyllä tuotettu havainnekuva.'));
});

test('kortin työpolkulähderivi ei enää piirry, kuvan tekijärivi säilyy', () => {
  const fokusnosto = lue('../js/fokusnosto.js');
  assert.ok(!/taytaLahderivi\)\(\s*html\('p', 'fokusnosto-lahde'\)/.test(fokusnosto));
  assert.match(fokusnosto, /KUVAN_TEKIJARIVI\.test\(nosto\.lahde\) && Boolean\(nosto\.kuva \|\| nosto\.tiedosto\)/);
  assert.match(fokusnosto, /kortinKuvalahde\(html\('p', 'fokusnosto-lahde'\), nosto\.lahde, nosto\)/);
  for (const p of ['../js/elaintaky.js', '../js/tiedeliite.js']) {
    assert.ok(!/taytaLahderivi\(html\('p', 'fokusnosto-lahde'\)/.test(lue(p)), `${p}: lähderivi piirtyy yhä`);
  }
});

test('kuvasarja on yhteinen moduuli: nosto, skandaali ja kohdekortti', () => {
  const kuvasarja = lue('../js/kuvasarja.js');
  assert.match(kuvasarja, /export function piirraKuvasarja/);
  assert.match(kuvasarja, /nayta\(!valmisKehys\)/);
  // Pyyhkäisy ja nuolinäppäimet asuvat sarjassa itsessään.
  assert.match(kuvasarja, /addEventListener\('pointerdown'/);
  assert.match(kuvasarja, /e\.key !== 'ArrowLeft' && e\.key !== 'ArrowRight'/);
  assert.match(lue('../js/fokusnosto.js'), /return piirraKuvasarja\(ui, sailio, kuvat, \{/);
  const kohteet = lue('../js/fokuskohteet.js');
  assert.match(kohteet, /if \(kuvat\.length >= 2\) \{\s*\n\s*piirraKuvasarja\(ui, sisalto, kuvat, \{/);
  assert.match(kohteet, /lataa: asetaKohdeKuva,/);
  // Offline-kuori tuntee uuden moduulin.
  assert.match(lue('../sw.js'), /'\.\/js\/kuvasarja\.js'/);
});

test('LISÄÄ-tila ei kutista lukittua kuvaa sarjassa (css)', () => {
  const css = lue('../css/nostokuva.css');
  assert.match(css, /\.nostokuva-kortti \.nostokuva-kehys\.fokusnosto-kuva \.nostokuva-img \{\s*\n\s*max-height: none;/);
});
