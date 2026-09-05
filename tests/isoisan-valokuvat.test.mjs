import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ISOISAN_VALOKUVAT, rajausTyyli, valokuvanKuvateksti } from '../js/isoisan-valokuvat.js';

test('jokaisella isoisän valokuvalla on osoite, selite ja kuvateksti "Isoisä, paikka, 1873"', () => {
  for (const [avain, kuva] of Object.entries(ISOISAN_VALOKUVAT)) {
    assert.match(kuva.osoite, /\/kohtaamiset\/isoisa\/isoisa-[a-z0-9-]+\.jpg$/, avain);
    assert.ok(kuva.selite.length > 20, `${avain}: selite`);
    assert.match(valokuvanKuvateksti(kuva), /^Isoisä, [A-ZÅÄÖ][a-zåäö]+, 1873$/, `${avain}: kuvateksti`);
    /*
     * Rajaus on VALINNAINEN (omistaja 5.9.2026 illalla): kuvaputken
     * uusissa kuvissa vinjetti ja paperin reunat ovat jo kuvassa, eikä
     * pahvireunusta ole leikattavaksi.
     */
    const r = kuva.rajaus;
    if (r) {
      assert.ok(r.x0 < r.x1 && r.y0 < r.y1, `${avain}: rajaus`);
      assert.match(rajausTyyli(kuva), /^--rx0:.*--rskaala:\d+\.\d{4}$/, `${avain}: rajaustyyli`);
    } else {
      assert.equal(rajausTyyli(kuva), '', `${avain}: ei rajausta → ei tyyliä`);
    }
  }
  assert.equal(valokuvanKuvateksti(null), '');
});

/*
 * ISOISÄ JÄÄ ARVOITUKSEKSI (Raamattu, omistaja 5.9.2026 ilta) ja
 * avauslennon kuva on yksi vaihdettava paikka (omistaja 5.9.2026 klo
 * 23.15: *"kohta pitäisi tulla isoisän uusia kuvia, niin käytä niitä
 * ennemmin"*).
 */
test('avauslennon kuva on taulun avain `lento`, eikä sen kuvateksti kuvaile isoisää', () => {
  const lento = ISOISAN_VALOKUVAT.lento;
  assert.ok(lento, 'ISOISAN_VALOKUVAT.lento puuttuu');
  // Omistaja 5.9.2026 illalla, sanasta sanaan.
  assert.equal(valokuvanKuvateksti(lento), 'Isoisä, Bombay, 1873');
  // Kuvaputken 5.9.2026 toimittama kuva, koko kuva ilman rajausta.
  assert.match(lento.osoite, /isoisa-bombay-aged-r20260905-v1\.jpg$/);
  assert.equal(lento.rajaus, undefined, 'uusi kuva ei tarvitse rajausta');
  assert.equal(rajausTyyli(lento), '');
  // Ei ulkonäköä kuvatekstissä eikä selitteessä (Raamattu: ISOISA JAA
  // ARVOITUKSEKSI).
  const sanat = /(hymy|parta|viikset|silmä|kasvo|näköinen|herrasmies|nuori mies|vuotias)/i;
  assert.doesNotMatch(valokuvanKuvateksti(lento), sanat);
  assert.doesNotMatch(lento.selite, sanat);
  // js/ui.js:n lentokohtaus lukee VAIN tätä avainta, jotta seuraava
  // kuvaputken kuva vaihdetaan yhdellä rivillä.
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  const kohtaus = ui.slice(ui.indexOf('async aloituslentoSisalla'));
  assert.match(kohtaus, /ISOISAN_VALOKUVAT\.lento\.osoite/);
  assert.doesNotMatch(kohtaus.slice(0, kohtaus.indexOf('naytaSaapumiskortti')), /ISOISAN_VALOKUVAT\.bombay/);
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
