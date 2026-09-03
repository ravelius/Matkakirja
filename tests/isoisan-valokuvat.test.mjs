import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ISOISAN_VALOKUVAT, rajausTyyli, valokuvanKuvateksti } from '../js/isoisan-valokuvat.js';

test('jokaisella isoisän valokuvalla on osoite, rajaus, selite ja kuvateksti "Isoisä, paikka, 1873"', () => {
  for (const [avain, kuva] of Object.entries(ISOISAN_VALOKUVAT)) {
    assert.match(kuva.osoite, /\/kohtaamiset\/isoisa\/isoisa-[a-z]+-1873-[a-z0-9-]+\.jpg$/, avain);
    assert.ok(kuva.selite.length > 20, `${avain}: selite`);
    assert.match(valokuvanKuvateksti(kuva), /^Isoisä, [A-ZÅÄÖ][a-zåäö]+, 1873$/, `${avain}: kuvateksti`);
    const r = kuva.rajaus;
    assert.ok(r.x0 < r.x1 && r.y0 < r.y1, `${avain}: rajaus`);
    assert.match(rajausTyyli(kuva), /^--rx0:.*--rskaala:\d+\.\d{4}$/, `${avain}: rajaustyyli`);
  }
  assert.equal(valokuvanKuvateksti(null), '');
});

test('lennolla kortin alle piirretään kuvateksti ja etusivulla kuvaa ei enää ole (omistaja 3.9.2026)', () => {
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /html\('span', 'lento-valokuvateksti', lappu\)/);
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /id="intro-valokuva"/);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.lento-valokuva \.lento-valokuvateksti \{/);
  assert.doesNotMatch(css, /^\.intro-valokuva \{/m);
});
