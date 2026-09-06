import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as moduuli from '../js/isoisan-valokuvat.js';

const { ISOISAN_VALOKUVAT, rajausTyyli, valokuvanKuvateksti } = moduuli;

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
 * ══════════════════════════════════════════════════════════════════
 * ISOISÄN KUVA POIS ENSIMMÄISELTÄ LENNOLTA (omistaja 6.9.2026 ilta)
 * ══════════════════════════════════════════════════════════════════
 *
 * Sanatarkasti: *"ens. lentokohtauksesta, ota isoisän kuva pois."*
 *
 * Taulun rivi `lento` jää tänne valintoineen ja luminanssimittauksineen
 * — jos kortti joskus palaa, se palaa siihen avaimeen — mutta KYTKENNÄN
 * on oltava poissa: ei elementtiä js/ui.js:ssä, ei tyyliä css:ssä, ei
 * viivettä. Tämä vartio kumoaa aiemman "avauslennon kuva on taulun
 * avain lento" -vartion samasta kohdasta.
 */
test('avauslennolla ei ole isoisän valokuvaa (omistaja 6.9.2026 ilta)', () => {
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  const kohtaus = ui.slice(ui.indexOf('async aloituslentoSisalla'));
  const runko = kohtaus.slice(0, kohtaus.indexOf('naytaSaapumiskortti'));
  assert.doesNotMatch(runko, /ISOISAN_VALOKUVAT/, 'lentokohtaus lukee yhä isoisän taulua');
  assert.doesNotMatch(runko, /html\('button', 'lento-valokuva'\)/, 'kortti on palannut lennolle');
  assert.doesNotMatch(ui, /LENNON_VALOKUVAN_VIIVE_MS/, 'kortin viive on palannut');
  assert.doesNotMatch(ui, /from '\.\/isoisan-valokuvat\.js'/,
    'ui.js tuo yhä isoisän valokuvataulun');
  // Tyylit lähtivät kortin mukana; .isoisa-rajattu jää aikajanalle.
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /^\.lento-valokuva[\s.,:{]/m, 'kortin tyylit ovat palanneet');
  assert.match(css, /^\.isoisa-rajattu \{/m, 'aikajanan rajaus katosi kortin mukana');
  // Viive ei ole enää moduulin sana.
  assert.equal(moduuli.LENNON_VALOKUVAN_VIIVE_MS, undefined);
  // Taulun rivi on tallessa mittauksineen (mahdollisimman vaalea kuva,
  // omistaja 6.9.2026 aamu) — vain näyttäminen jäi pois.
  const lento = ISOISAN_VALOKUVAT.lento;
  assert.ok(lento, 'ISOISAN_VALOKUVAT.lento puuttuu');
  assert.equal(valokuvanKuvateksti(lento), 'Isoisä, Giza, 1873');
  assert.match(lento.osoite, /isoisa-giza-aged-r20260905-v1\.jpg$/);
  assert.equal(lento.rajaus, undefined, 'uusi kuva ei tarvitse rajausta');
  assert.equal(rajausTyyli(lento), '');
  // Ei ulkonäköä kuvatekstissä eikä selitteessä (Raamattu: ISOISA JAA
  // ARVOITUKSEKSI).
  const sanat = /(hymy|parta|viikset|silmä|kasvo|näköinen|herrasmies|nuori mies|vuotias)/i;
  assert.doesNotMatch(valokuvanKuvateksti(lento), sanat);
  assert.doesNotMatch(lento.selite, sanat);
});

test('etusivulla ei ole isoisän kuvaa (omistaja 3.9.2026)', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /id="intro-valokuva"/);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /^\.intro-valokuva \{/m);
});
