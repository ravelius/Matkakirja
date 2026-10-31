/*
 * Kohdekartan piirrosten tasaus (Karttaseppä 31.10.2026; omistaja 09.31 "Kaikki pitää olla samalla kontrastilla",
 * 09.33 sama musta- ja valkopiste, keskikontrasti yhteneväksi, saturaatiota alas tarvittaessa, 09.34 monistettava).
 * Mittaus tehdään tools/tasaa-kohdekartan-piirrokset.mjs:ssä (CI:ssä ei ole kuvakirjastoa); testi tarkistaa, että
 * kirjatut mitat ovat tavoitteessa ja että kirjaus vastaa tiedostoja ja web-taulua.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { KOHDEKARTAN_PIIRROKSET } from '../js/packs/kohdekartan-piirrokset.js';
import { MINIATYYRIT } from '../js/packs/miniatyyrit.js';

const lue = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const { tavoite, toleranssi, hyväksytyt_poikkeamat: poikkeamat = [] } = lue('tools/piirrostasaus.json');
/** Asetukseen perusteltuna kirjattu poikkeama (kohde + mitta) saa poiketa enintään oman rajansa verran. */
const raja = (kohde, mitta) => poikkeamat.find((p) => p.kohde === kohde && p.mitta === mitta)?.enintään ?? toleranssi[mitta];
/** Gamma tai kylläisyyden nosto rajallaan (tools/piirrostasaus.json toleranssi.rajalla_kuvaus, Karttaseppä 31.10.2026). */
const gammaRajalla = (k) => k && (k.gamma <= tavoite.gamma_min + 1e-3 || k.gamma >= tavoite.gamma_max - 1e-3);
const nostoKatossa = (k) => k && k['kylläisyys'] >= tavoite['kylläisyys_katto'] - 1e-3;
const TULOKSET = lue('tools/piirrostasaus-tulokset.json');

test('jokainen tasattu piirros on yhteisessä musta- ja valkopisteessä, keskisävyssä ja kylläisyydessä', () => {
  const poikkeavat = [];
  for (const [kaupunki, kohteet] of Object.entries(TULOKSET)) {
    for (const [nimi, t] of Object.entries(kohteet)) {
      const j = t.jalkeen;
      for (const k of ['musta', 'valko', 'keski']) {
        const r = k === 'keski' && gammaRajalla(t.kertoimet)
          ? Math.max(toleranssi.keski_rajalla, raja(`${kaupunki}/${nimi}`, k)) : raja(`${kaupunki}/${nimi}`, k);
        if (Math.abs(j[k] - tavoite[k]) > r) poikkeavat.push(`${kaupunki}/${nimi}: ${k} ${j[k]} (tavoite ${tavoite[k]})`);
      }
      if (j.kroma > tavoite.kroma + toleranssi.kroma_yli
        || (j.kroma < tavoite.kroma - toleranssi.kroma_ali && !nostoKatossa(t.kertoimet))) {
        poikkeavat.push(`${kaupunki}/${nimi}: kroma ${j.kroma} (tavoite ${tavoite.kroma})`);
      }
    }
  }
  assert.deepEqual(poikkeavat, []);
});

test('kirjaus vastaa tiedostoja ja web-taulua', () => {
  for (const [kaupunki, kohteet] of Object.entries(TULOKSET)) {
    for (const [nimi, t] of Object.entries(kohteet)) {
      const polku = new URL(`../${t.kuva}`, import.meta.url);
      assert.ok(existsSync(polku), t.kuva);
      assert.equal(createHash('sha256').update(readFileSync(polku)).digest('hex').slice(0, 16), t.sha,
        `${t.kuva}: aja node tools/tasaa-kohdekartan-piirrokset.mjs ${kaupunki}`);
      assert.equal(KOHDEKARTAN_PIIRROKSET[kaupunki]?.[nimi], t.kuva, `${kaupunki}/${nimi}`);
      assert.equal(MINIATYYRIT[kaupunki]?.[nimi], t.lahde, `${kaupunki}/${nimi}: alkuperäinen vaihtunut, tasaa uudelleen`);
    }
  }
});

test('tasaus ei muuta kangasta eikä alfaa: mitat ja alfakanava = alkuperäinen (PT 31.10.)', () => {
  const eroavat = [];
  for (const [kaupunki, kohteet] of Object.entries(TULOKSET)) {
    for (const [nimi, t] of Object.entries(kohteet)) {
      const k = t.kangas;
      if (!k) { eroavat.push(`${kaupunki}/${nimi}: kangas kirjaamatta`); continue; }
      const a = k['alkuperäinen'], b = k.tasattu;
      if (a.leveys !== b.leveys || a.korkeus !== b.korkeus || a.alfa !== b.alfa) eroavat.push(`${kaupunki}/${nimi}`);
    }
  }
  assert.deepEqual(eroavat, []);
});
