/*
 * VALIKON SIIVOUS (omistaja 22.9.2026 klo 22.30 Fablen kautta): "Poista
 * kaikki ylimääräiset vivut valikosta niin löydän testattavat vaihtoehdot
 * paremmin." Kartta-osioon jäävät vain Pieni liike, Piirtokoe ja Näytä
 * kehysprofiili. Vartija: valikossa ei ole vedon seurannan eikä
 * tarkkuuden rivejä, ja niiden aiempi tallennus nollataan käynnistyksessä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { POISTETUT_VALINTA_AVAIMET, unohdaPoistetutValinnat } from '../js/piirtokoe-asetus.js';
import { VEDON_SEURANTA_AVAIN } from '../js/vedon-seuranta.js';
import { TARKKUUS_AVAIN } from '../js/tarkkuus-asetus.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
/** index.html ilman kommentteja: vain oikeat elementit ratkaisevat. */
const html = () => lue('../index.html').replace(/<!--[\s\S]*?-->/g, '');

test('Kartta-osiossa vain Pieni liike; kokeet rattaan kehittäjäryhmässä Mittaus', () => {
  const h = html();
  const a = h.indexOf('<p class="valikko-otsikko">Kartta</p>');
  assert.ok(a > 0, 'Kartta-osio löytyy');
  const kartta = h.slice(a, h.indexOf('</div>\n', a + 1));
  assert.deepEqual([...kartta.matchAll(/id="([^"]+)"/g)].map((m) => m[1]), ['kartta-valikko'],
    'hampurilaisen Kartta-osiossa vain pelaajan Pieni liike');
  /*
   * KOKEET RATTAASEEN, VAIN KEHITTÄJÄLLE (omistaja 23.9.2026): Syötekoe,
   * kerrokset, kehysprofiili ja Suoraan kartalle (kehysprofiili-valikon
   * rivit) ovat rattaan .kehittaja-ryhmässä, jonka js/main.js piilottaa
   * ilman kehittäjätilaa.
   */
  const r = h.indexOf('id="kehittaja-mittaus"');
  assert.ok(r > h.indexOf('id="kehittaja-valikko"') && r < h.indexOf('id="paavalikko"'), 'Mittaus on ratasvalikossa');
  assert.match(h.slice(h.lastIndexOf('<div', r), r + 80), /class="kehittaja-ryhma" hidden/);
  const mittaus = h.slice(r, h.indexOf('id="kehittaja-tyohuone"'));
  assert.deepEqual([...mittaus.matchAll(/id="([^"]+)"/g)].map((m) => m[1]), ['kehittaja-mittaus', 'piirtokoe-otsikko',
    'piirtokoe-valikko', 'piirtokoe-vihje', 'paljaat-kerrokset-otsikko', 'paljaat-kerrokset-valikko', 'kehysprofiili-valikko']);
  assert.match(lue('../js/main.js'), /const kehittajaRyhmat = \[\.\.\.document\.querySelectorAll\('\.kehittaja-ryhma'\)\];/);
  assert.match(lue('../js/main.js'), /for \(const ryhma of kehittajaRyhmat\) ryhma\.hidden = !kehittajaTilaPaalla\(\);/);
  assert.doesNotMatch(h, /vedon-seuranta/, 'ei vedon seurannan rivejä');
  assert.doesNotMatch(h, /tarkkuus-valikko/, 'ei tarkkuuden rivejä');
});

test('main.js ei rakenna vedon seurannan eikä tarkkuuden rivejä', () => {
  const main = lue('../js/main.js');
  for (const kielletty of ['vedon-seuranta-valikko', 'VEDON_SEURANNAN_TAVAT', 'asetaVedonSeuranta',
    'tarkkuus-valikko', 'TARKKUUKSIEN_NIMET', 'asetaTarkkuusLiikkeessa', "'Tarkkuus liikkeessä'"]) {
    assert.ok(!main.includes(kielletty), `main.js: ${kielletty}`);
  }
  // Nollaus ajetaan moduulin alussa, ennen kuin lauta lukee asetukset.
  const nollaus = main.indexOf('if (unohdaPoistetutValinnat()) unohdaTarkkuus();');
  assert.ok(nollaus > 0 && nollaus < main.indexOf('const karttaValikko'), 'nollaus ennen valikkoa ja lautaa');
});

test('aiempi tallennus nollataan: avaimet samat kuin moduuleissa', () => {
  assert.deepEqual([...POISTETUT_VALINTA_AVAIMET].sort(), [TARKKUUS_AVAIN, VEDON_SEURANTA_AVAIN].sort());
  const muisti = new Map([[VEDON_SEURANTA_AVAIN, 'jousi'], [TARKKUUS_AVAIN, 'tasainen'], ['matkakirja-piirtokoe', 'syotetouch']]);
  const varasto = { getItem: (k) => muisti.get(k) ?? null, removeItem: (k) => muisti.delete(k), setItem: (k, v) => muisti.set(k, v) };
  assert.equal(unohdaPoistetutValinnat(varasto), 2);
  assert.deepEqual([...muisti.entries()], [['matkakirja-piirtokoe', 'syotetouch']], 'valikossa oleva koe säilyy');
  assert.equal(unohdaPoistetutValinnat(varasto), 0, 'toinen kerta ei tee mitään');
  // Valikosta poistettu koe (dpr15, alpha0, vahemmandc; omistaja 22.9.2026 klo 23.08) → Normaali.
  for (const poistettu of ['dpr15', 'alpha0', 'vahemmandc', 'eipuskuri', 'eivienti', 'eihaivevedossa']) {
    muisti.set('matkakirja-piirtokoe', poistettu);
    assert.equal(unohdaPoistetutValinnat(varasto), 1);
    assert.equal(muisti.get('matkakirja-piirtokoe'), 'normaali', poistettu);
  }
  assert.equal(unohdaPoistetutValinnat(null), 0, 'ilman muistia ei kaadu');
});
