/*
 * KARTAN PISTE ON HARMAA, VÄRI TULEE VIVUSTA (omistaja 22.9.2026,
 * sanatarkasti: *"Voisi kokeilla vaihtaa nostojen pisteet piirroksiksi
 * jo kaukonäkymässä tai sitten muuttaa piste pelkäksi harmaaksi
 * pisteeksi jossa itsessään ei ole väriä vaan väri tulisi vasta kun
 * nostoväri on laitettu vivusta päälle."*).
 *
 * Kolme vahtia:
 *
 *   1. KARTTA HARMAA, SELITE VÄRILLINEN. Sama piirtofunktio palvelee
 *      kahta eri tarkoitusta: kartalla kiekko on neutraali, mutta
 *      selitevalikon merkki on VÄRIAVAIN eikä saa haalistua sen mukana.
 *   2. HARMAA ON YHDESSÄ PAIKASSA. Node-ajo (laattapoltto) ei näe
 *      css/styles.css:ää, joten sävy on varataulussa — sama vahti kuin
 *      kategoriaväreillä (tests/nostoladonta.test.mjs).
 *   3. ?koe=symbolitkaukana nostaa tyyppimerkit kaikille zoomeille.
 *      Ilman lippua raja on ennallaan (z8, kerroin 4).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/* Pieni SVG-malli: js/mapart.js el() tarvitsee createElementNS:n. */
class Solmu {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.attributes = new Map();
  }

  setAttribute(nimi, arvo) { this.attributes.set(nimi, String(arvo)); }

  getAttribute(nimi) { return this.attributes.get(nimi) ?? null; }

  appendChild(lapsi) { this.children.push(lapsi); return lapsi; }
}
/*
 * `addEventListener` on mukana, koska js/fokuskohteet.js kytkee
 * moduulitasolla osoitinvahdin heti kun `document` on olemassa —
 * puolikas malli kaataisi tuonnin.
 */
globalThis.document = {
  createElementNS: (ns, tag) => new Solmu(tag),
  addEventListener() {},
  removeEventListener() {},
};

const {
  NOSTOSYM_PISTE_HARMAA, piirraNostosymMini,
} = await import('../js/fokusnosto-symbolit.js');
const {
  NOSTOJEN_TYYPPIMERKIN_KERROIN, tyyppimerkitKaytossa,
} = await import('../js/pallolauta/nostot.js');

/** Kiekon luokat piirretystä ryhmästä. */
function kiekonLuokat(harmaa) {
  const g = new Solmu('g');
  piirraNostosymMini(g, 'historia', null, harmaa ? { harmaa: true } : undefined);
  const kiekko = g.children.find((n) => (n.getAttribute('class') ?? '').includes('nostosym-mini-taytto'));
  return kiekko?.getAttribute('class') ?? '';
}

test('kartan kiekko on harmaa, selitteen kiekko pitää kategoriavärinsä', () => {
  assert.match(kiekonLuokat(true), /nostosym-mini-harmaa/, 'kartta: neutraali kiekko');
  assert.doesNotMatch(kiekonLuokat(true), /nostosym-mini-historia/);
  // Selitevalikko (js/karttaselite.js) kutsuu ilman valintaa: väri jää.
  assert.match(kiekonLuokat(false), /nostosym-mini-historia/, 'selite: väriavain');
});

test('harmaa on sama varataulussa ja css/styles.css:ssä', () => {
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  const muuttuja = /--sym-piste-harmaa:\s*(#[0-9a-fA-F]{3,8})/.exec(css);
  assert.ok(muuttuja, 'css: --sym-piste-harmaa puuttuu');
  assert.equal(NOSTOSYM_PISTE_HARMAA.toLowerCase(), muuttuja[1].toLowerCase());
  assert.match(css, /\.nostosym-mini-harmaa\s*\{[^}]*var\(--sym-piste-harmaa\)/);
});

test('tyyppimerkit: ilman lippua raja z8, lipulla kaikilla zoomeilla', async () => {
  assert.equal(tyyppimerkitKaytossa(1), false, 'kaukana piste');
  assert.equal(tyyppimerkitKaytossa(NOSTOJEN_TYYPPIMERKIN_KERROIN), true, 'z8 ja lähempänä merkki');
  /*
   * Lippu luetaan moduulin latauksessa, joten koe vaatii oman
   * latauksensa: kyselymerkkijono tekee siitä eri moduulin.
   */
  globalThis.location = { search: '?koe=symbolitkaukana' };
  try {
    const koe = await import('../js/pallolauta/nostot.js?koe=symbolitkaukana');
    assert.equal(koe.tyyppimerkitKaytossa(1), true, 'lipulla merkki myös kaukana');
    assert.equal(koe.tyyppimerkitKaytossa(0.5), true);
  } finally {
    delete globalThis.location;
  }
});
