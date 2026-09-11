import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { ilmoitaKohtaamisenTunne, kohtaamisenTunnetagi } from '../js/visa.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';

test('kohtaamisen fixture-tagit välittyvät muuttumatta', () => {
  const kohtaaminen = {
    tunneTervehdys: { tunne: 'utelias', voimakkuus: .51 },
    tunneLoyto: { tunne: 'ylpea', voimakkuus: .71 },
    tunneTyhja: { tunne: 'surullinen', voimakkuus: .42 },
    tunneVaarin: { tunne: 'jannitys', voimakkuus: .39 },
  };
  assert.deepEqual(kohtaamisenTunnetagi('tervehdys', { kohtaaminen }), kohtaaminen.tunneTervehdys);
  assert.deepEqual(kohtaamisenTunnetagi('loyto', { kohtaaminen }), kohtaaminen.tunneLoyto);
  assert.deepEqual(kohtaamisenTunnetagi('tyhja', { kohtaaminen }), kohtaaminen.tunneTyhja);
  assert.deepEqual(kohtaamisenTunnetagi('vaarin', { kohtaaminen }), kohtaaminen.tunneVaarin);
});

test('kaarikohtaamisen ja aarteen fixture-tagit ovat erilliset', () => {
  const kaariTarina = {
    tunneKohtaaminen: { tunne: 'vakava', voimakkuus: .55 },
    tunneAarre: { tunne: 'ilo', voimakkuus: .77 },
  };
  assert.deepEqual(kohtaamisenTunnetagi('tervehdys', { kaariTarina }), kaariTarina.tunneKohtaaminen);
  assert.deepEqual(kohtaamisenTunnetagi('aarre', { kaariTarina }), kaariTarina.tunneAarre);
});

test('nykyinen tagiton sisältö saa E2-oletukset', () => {
  assert.deepEqual(kohtaamisenTunnetagi('tervehdys', { kohtaaminen: {} }), { tunne: 'lammin', voimakkuus: .5 });
  assert.deepEqual(kohtaamisenTunnetagi('loyto', { kohtaaminen: {} }), { tunne: 'ilo', voimakkuus: .7 });
  assert.deepEqual(kohtaamisenTunnetagi('tyhja', { kohtaaminen: {} }), { tunne: 'miettiva', voimakkuus: .45 });
  assert.deepEqual(kohtaamisenTunnetagi('vaarin', { kohtaaminen: {} }), { tunne: 'hammentynyt', voimakkuus: .4 });
  assert.deepEqual(kohtaamisenTunnetagi('aarre', { kaariTarina: {} }), { tunne: 'ilo', voimakkuus: .7 });
});

test('triggerit säilyttävät dedupen ja prioriteetit', () => {
  const js = readFileSync(new URL('../js/visa.js', import.meta.url), 'utf8');
  assert.match(js, /tervehdysEnsiKerta && !viimeinenYritys/,
    'viimeisen yrityksen pitää voittaa tervehdys');
  assert.match(js, /if\(!quiz\|\|ui\?\.dead\|\|quiz\.aarreLukittui\)return null/,
    'lukon pitää voittaa tulostagi');
  assert.match(js, /if\(laji==='loyto'&&quiz\.found\)return null/,
    'pääpaljastuksen pitää omistaa löytöilo');
  assert.match(js, /const avain=`kohtaaminen:\$\{laji\}`;[\s\S]*?ilmoitetut\.has\(avain\)/,
    'tuloksen pitää dedupoitua visaolio+laji');
  assert.match(js, /const tervehdysAvain = `\$\{game\.pack\.id\}:\$\{quiz\.cityId\}`/,
    'tervehdyksen pitää dedupoitua pakka+kaupunki');
  assert.match(js, /if \(!kaariTarina\) \{\s*ilmoitaKohtaamisenTunne/,
    'kaari ei saa saada tavallisen kohtaamisen tulostagia');
});

test('outcome emittoituu kerran oikealla metadatalla', () => {
  const tapahtumat = [];
  const lopeta = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push({ laji, ...tiedot }));
  try {
    const quiz = { cityId: 'koekaupunki', right: false, found: null };
    const tagi = { tunneVaarin: { tunne: 'jannitys', voimakkuus: .39 } };
    assert.ok(ilmoitaKohtaamisenTunne({}, quiz, 'vaarin', { kohtaaminen: tagi }));
    assert.equal(ilmoitaKohtaamisenTunne({}, quiz, 'vaarin', { kohtaaminen: tagi }), null);
    assert.deepEqual(tapahtumat, [{
      laji: 'emotion', lahde: 'visa', tunnus: 'kohtaaminen.koekaupunki.vaarin',
      tunne: 'jannitys', voimakkuus: .39, ele: 'doubleTake',
    }]);
  } finally {
    lopeta();
  }
});

test('lukko ja pääpaljastus estävät kohtaamisen rinnakkaistunteen', () => {
  const tapahtumat = [];
  const lopeta = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push({ laji, ...tiedot }));
  try {
    assert.equal(ilmoitaKohtaamisenTunne({}, {
      cityId: 'lukko', right: false, aarreLukittui: true,
    }, 'vaarin', { kohtaaminen: {} }), null);
    assert.equal(ilmoitaKohtaamisenTunne({}, {
      cityId: 'paljastus', right: true, found: 'ruby',
    }, 'loyto', { kohtaaminen: {} }), null);
    assert.deepEqual(tapahtumat, []);
  } finally {
    lopeta();
  }
});
