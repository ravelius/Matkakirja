/*
 * ÄÄNIEN LISENSSIPORTTI (Fable 23.9.2026: pelistä tulee maksullinen, joten
 * NC- ja ND-ehtoinen aineisto ei saa olla käytössä). Sama sääntö kuin
 * kuvilla (js/lisenssi.js lisenssiKelpaa). Inventaario:
 * docs/raportit/lisenssi-inventaario-20260923.md (Siirtoseppä): 23 NC/ND-
 * äänitettä oletuskäytössä, lisenssi kirjattu `nimi`- tai
 * `musiikkiNayteNimi`-kenttään.
 *
 * Vartija kaatuu, jos
 *   - jokin pelissä oletuksena SOIVA ääni on NC/ND (portin läpi),
 *   - kolmannen osapuolen äänestä puuttuu kirjattu lisenssi,
 *   - (uusi NC/ND-äänite dataan: yhteinen laskuri tests/lisenssit.test.mjs,
 *     joka kattaa kaiken median nimetyllä listalla), tai
 *   - lähdeluettelo väittää NC-ääniä, kun niitä ei enää ole datassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { aaniLisenssiSallittu, aaniLisenssiTunnus, lisenssiKelpaa } from '../js/lisenssi.js';
import {
  EHDOKKAAT, KAUPUNKI_EHDOKKAAT, TYYPPI_EHDOKKAAT, aaniSallittu, kaupunkiKori, lisenssiEstetytAanet,
  maaKori, tyyppiKori, valittuTaiOletus,
} from '../js/aani-ehdokkaat.js';
import { EUROPE_KIELET, EUROPE_KIELET_KAIKKI } from '../js/packs/europe-kielet.js';

const juuri = new URL('../', import.meta.url);
const lue = (p) => readFileSync(new URL(p, juuri), 'utf8');

/** Kaikki kolmannen osapuolen äänirivit: [lähde, nimi, url]. */
function aanirivit() {
  const rivit = [];
  for (const [tyyppi, lista] of Object.entries(TYYPPI_EHDOKKAAT)) for (const e of lista) rivit.push([`tyyppi:${tyyppi}`, e.nimi, e.url]);
  for (const [osa, kaupungit] of Object.entries(KAUPUNKI_EHDOKKAAT)) {
    for (const [id, lista] of Object.entries(kaupungit)) for (const e of lista) rivit.push([`kaupunki:${osa}/${id}`, e.nimi, e.url]);
  }
  for (const [id, e] of Object.entries(EUROPE_KIELET_KAIKKI)) rivit.push([`kieli:${id}`, e.nimi, e.url]);
  for (const f of readdirSync(new URL('js/packs/', juuri))) {
    const s = lue(`js/packs/${f}`);
    for (const m of s.matchAll(/musiikkiNayteNimi:\s*'((?:[^'\\]|\\.)*)'/g)) rivit.push([`musiikki:${f}`, m[1], null]);
    const kenttia = (s.match(/musiikkiNayte:/g) ?? []).length;
    const nimia = (s.match(/musiikkiNayteNimi:/g) ?? []).length;
    assert.equal(nimia, kenttia, `${f}: jokaisella musiikkiNaytteellä on musiikkiNayteNimi (lisenssi)`);
  }
  return rivit;
}

test('äänen lisenssitunnus nimikentästä ja portti', () => {
  assert.equal(aaniLisenssiTunnus('Kaupungin yö (Kairo) — rucisko, CC BY-NC'), 'cc-by-nc');
  assert.equal(aaniLisenssiTunnus('Plaza (Granada) — Paz Tornero, CC BY-NC-ND'), 'cc-by-nc-nd');
  assert.equal(aaniLisenssiTunnus('Pipe band, Edinburgh Castle, CC BY-NC-SA 3.0'), 'cc-by-nc-sa');
  assert.equal(aaniLisenssiTunnus('Kahvila (Praha) — mkin, CC BY-SA'), 'cc-by-sa');
  assert.equal(aaniLisenssiTunnus('Tori — maciej, PD'), 'pd');
  assert.equal(aaniLisenssiTunnus('Matkustamo — FillSoko, CC0'), 'cc0');
  assert.equal(aaniLisenssiTunnus('Pelin oma raita'), null);
  for (const [nimi, ok] of [['x, CC BY-NC', false], ['x, CC BY-ND', false], ['x, CC BY-SA', true], ['x, CC BY 4.0', true], ['x, PD', true], ['oma', true]]) {
    assert.equal(aaniLisenssiSallittu(nimi), ok, nimi);
  }
  // Sama sääntö kuin kuvilla.
  assert.equal(lisenssiKelpaa('cc-by-nc-sa-3.0'), false);
  assert.equal(lisenssiKelpaa('cc-by-sa-4.0'), true);
});

test('jokaisella kolmannen osapuolen äänellä on kirjattu lisenssi', () => {
  const tuntemattomat = aanirivit().filter(([, nimi]) => aaniLisenssiTunnus(nimi) == null);
  assert.deepEqual(tuntemattomat.map(([l, n]) => `${l}: ${n}`), []);
});

/*
 * Uusien NC/ND-äänitteiden laskuri oli tässä (TUNNETUT_NC_RIVIT = 24). Se
 * siirtyi yhteiseksi kaikelle medialle: tests/lisenssit.test.mjs ja
 * tools/vienti/lisenssit-tunnetut.json (Fable 23.9.2026: ei kahta laskuria).
 * Nimetty lista on tiukempi kuin määrä: NC-äänitteen vaihto toiseen NC:hen
 * ei enää mene läpi.
 */

test('mikään oletuksena soiva ääni ei ole NC/ND (portti)', () => {
  const pura = (() => { globalThis.localStorage = { getItem: () => null, setItem: () => {} }; return () => { delete globalThis.localStorage; }; })();
  try {
    const estetyt = lisenssiEstetytAanet();
    const perus = (u) => String(u).split('#')[0];
    const soivat = [];
    // Maisematyyppien oletuskorit kaikilla laudoilla.
    for (const tyyppi of Object.keys(TYYPPI_EHDOKKAAT)) for (const lauta of ['europe', 'africa', 'maailmankartta']) soivat.push(...tyyppiKori(tyyppi, lauta).map((u) => [`tyyppiKori:${tyyppi}`, u]));
    // Kaupunki- ja maakorit.
    for (const [osa, kaupungit] of Object.entries(KAUPUNKI_EHDOKKAAT)) {
      for (const id of Object.keys(kaupungit)) soivat.push(...kaupunkiKori(osa, id).map((u) => [`kaupunkiKori:${osa}/${id}`, u]));
    }
    soivat.push(...maaKori('europe', 'marseille', { marseille: 'FRA', pariisi: 'FRA', lyon: 'FRA' }).map((u) => ['maaKori', u]));
    // Oletusvalinnat.
    for (const slot of Object.keys(EHDOKKAAT)) { const v = valittuTaiOletus(slot); if (v) soivat.push([`valinta:${slot}`, v]); }
    const rikkeet = soivat.filter(([, u]) => estetyt.has(perus(u)) || !aaniSallittu(u));
    assert.deepEqual(rikkeet, []);
    // Kielinäytteet ja musiikkinäytteet.
    for (const [id, e] of Object.entries(EUROPE_KIELET)) assert.ok(aaniLisenssiSallittu(e.nimi), `kieli ${id}: ${e.nimi}`);
    const ui = lue('js/ui.js');
    assert.match(ui, /const musiikkiNayte = nosto\.musiikkiNayte && aaniLisenssiSallittu\(nosto\.musiikkiNayteNimi\)/);
    assert.doesNotMatch(ui, /aani: nosto\.musiikkiNayte,/, 'nappi soittaa portin läpi tulleen näytteen');
  } finally { pura(); }
});

test('portti toimii: estetty ääni putoaa korista ja studiovalinnasta', () => {
  const estetyt = [...lisenssiEstetytAanet()];
  // Inventaarion tilanteessa estettyjä on; kun korvaukset tulevat, tämä testi ohittaa itsensä.
  if (!estetyt.length) return;
  const muisti = new Map([['matkakirja-aanivalinnat', JSON.stringify({ 'tausta:koe': estetyt[0] })]]);
  globalThis.localStorage = { getItem: (k) => muisti.get(k) ?? null, setItem: (k, v) => muisti.set(k, v) };
  try {
    assert.equal(aaniSallittu(`${estetyt[0]}#voima=0.5`), false, '#-merkinnät eivät ohita porttia');
    assert.equal(aaniSallittu('https://example.org/vapaa.mp3'), true);
  } finally { delete globalThis.localStorage; }
});

test('lähdeluettelo ei väitä NC-ääniä, kun niitä ei enää ole datassa', () => {
  const nc = aanirivit().filter(([, nimi]) => !aaniLisenssiSallittu(nimi));
  const lahteet = lue('js/lahteet.js');
  const vaite = /lisenssi:\s*'[^']*BY-NC/.test(lahteet);
  if (nc.length === 0) assert.equal(vaite, false, 'päivitä js/lahteet.js Äänet-osio: NC-äänitteet on korvattu');
});
