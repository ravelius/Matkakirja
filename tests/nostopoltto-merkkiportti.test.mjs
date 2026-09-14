/*
 * POLTTOVELKA NOLLAAN: POLTTOKETJU AJAA MERKIT MERKKIPORTIN LÄPI.
 *
 * Erä v1867 antoi elävälle kerrokselle pääkartan merkkirajan
 * (js/pallolauta/nostot.js `merkkiPortti`): uloimmalla zoomilla piirtyy
 * enintään PAAKARTAN_MERKKIKATTO tärkeintä merkkiä maata kohti ja
 * `lahi: true` -kohteet eivät lainkaan. Polttoketju (tools/fokuskartta/
 * nostot.mjs) EI tuntenut porttia, ja siitä jäi POLTTOVELKA:
 * docs/raportit/viesti-fable-merkkirajat-20260914.md luku 7 mittasi
 * seitsemän maata, joiden laatoissa on mustetta, jota kerros ei voi
 * piilottaa — *"raja näkyy tänään vain Espanjassa"*.
 *
 * Tämä testi vartioi luvun 7 askelta 1: sama portti, sama järjestys ja
 * sama katto molemmissa päissä. Neljä väitettä:
 *
 *   1. yksikään maa ei polta yli katon merkkiä;
 *   2. portin läpi päässeet ovat TÄSMÄLLEEN ne, jotka elävä kerros
 *      päästäisi uloimmalla zoomilla (sama funktio, ei omaa kopiota);
 *   3. `lahi: true` ei koskaan pala;
 *   4. LADONTA EI MUUTU: portti karsii vasta valmiista ladonnasta,
 *      joten jokaisen poltetun merkin paikka ja tiiviste ovat samat
 *      kuin ennen porttia (Raamattu: yksi ladonta, yksi lähde).
 *
 * Testi ei käytä selainta, verkkoa eikä laattoja: ladonta on puhdas
 * funktio laudan datasta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { maanKohdemerkit } from '../js/fokuskohteet.js';
import { PAAKARTAN_MERKKIKATTO, merkkiPortti } from '../js/pallolauta/nostot.js';

const pack = packById('maailmankartta');
const { merkit, luettelo, tilasto } = keraaNostot(pack);

/** Maan poltettavat nostot (eläintäyt ovat oma perheensä, ks. nostot.mjs). */
const maittain = new Map();
for (const m of merkit) {
  if (m.perhe !== 'nosto') continue;
  if (!maittain.has(m.iso)) maittain.set(m.iso, []);
  maittain.get(m.iso).push(m);
}

test('yksikään maa ei polta yli pääkartan merkkikaton', () => {
  const yli = [];
  for (const [iso, ms] of maittain) {
    const poltettavia = ms.filter((m) => m.poltettava).length;
    if (poltettavia > PAAKARTAN_MERKKIKATTO) yli.push(`${iso} ${poltettavia}`);
  }
  assert.deepEqual(yli, [], `yli katon ${PAAKARTAN_MERKKIKATTO}: ${yli.join(', ')}`);
  // Vartio toiseen suuntaan: maita on tarpeeksi, jotta väite mittaa jotain.
  assert.ok(maittain.size > 100, `maita ${maittain.size}`);
});

test('poltettavat ovat täsmälleen ne, jotka elävä portti päästäisi', () => {
  /*
   * ELÄVÄ PÄÄ, EI POLTTOKETJUN OMA: rivit haetaan pelin omalta
   * funktiolta (js/fokuskohteet.js `maanKohdemerkit`) ja ajetaan
   * portin läpi täsmälleen kuten js/pallolauta/nostot.js `keraa`
   * uloimmalla zoomilla. Jos polttoketju ja kerros ajautuvat eri
   * vastauksiin, tämä väite kaatuu.
   */
  let karsittuja = 0;
  for (const [iso, ms] of maittain) {
    const pohja = FOKUS_POHJAT[iso];
    const elavat = maanKohdemerkit(pack, iso, pohja, () => false);
    const portti = merkkiPortti(elavat, false, (m) => m.kohde ?? null);
    const paastetyt = new Set(portti.merkit.map((m) => m.id));
    for (const m of ms) {
      /*
       * Täkyestetyssä maassa ja monen maan tunnuksella EI polteta
       * mitään muistakaan syistä (ks. nostot.mjs) — portti on tässä
       * VÄLTTÄMÄTÖN muttei riittävä ehto.
       */
      if (m.poltettava) {
        assert.ok(paastetyt.has(m.tunnus),
          `${iso}/${m.tunnus} palaa, vaikka elävä portti piilottaisi sen`);
      } else if (!paastetyt.has(m.tunnus)) karsittuja += 1;
    }
  }
  /*
   * MITATTU 14.9.2026, kaksi lukemaa:
   *   ilman Ranskan sisältöpilottia  32 (GRC 12, TUR 8, DEU 7, HRV 2,
   *                                     ITA 1, RUS 1, ESP 1)
   *   pilotin kanssa                 73 (edelliset + FRA 41)
   *
   * KIINTEÄ LUKU EI OLLUT VÄITE VAAN PÄIVÄMÄÄRÄ. Luku 32 oli mitattu
   * silloisesta aineistosta, ja kun Ranskan pilotti (18 maalehtinostoa
   * `lahi`-portin takana ja seitsemän lisäkaupunkia) tuli mukaan, se
   * kaatui — vaikka mikään ei ollut vialla. Mitattu vastakokeella: luku
   * on 73 riippumatta siitä, ovatko lisäkaupungit kaupunkikortteja vai
   * vanhoja `vainNimi`-nimikylttejä, joten kyse on sisällön määrästä
   * eikä tämän erän muutoksesta.
   *
   * VÄITE ON NYT SE, JONKA VIESTI JO SANOI: polttoketjun oma tilasto ja
   * tässä testissä tehty riippumaton mittaus kertovat SAMAN luvun. Se
   * on aineistosta riippumaton invariantti ja kaatuu heti, jos ketjut
   * ajautuvat erilleen. Alaraja pitää väitteen mittaamassa jotain.
   */
  assert.ok(karsittuja >= 30, `portti karsii ${karsittuja} merkkiä (odotettu ≥ 30)`);
  assert.equal(tilasto.porttiPiiloon, karsittuja,
    'tilasto kertoo saman luvun kuin mittaus');
});

test('lähizoomin kohde (lahi: true) ei pala koskaan', () => {
  /*
   * AINEISTOSSA EI OLE VIELÄ YHTÄÄN `lahi`-KOHDETTA (mitattu 14.9.2026:
   * kenttä on portin sopimus, ei vielä sisältöä), joten pelkkä
   * datasilmukka olisi tyhjä väite. Portti ajetaan siksi myös
   * TEKOSYÖTTEELLÄ: yksi lahi-kohde katon alla oleval maalla. Jos
   * portti päästäisi sen, laatta polttaisi sisältöä, joka kuuluu vain
   * lähikuvaan.
   */
  const koe = [
    { id: 'a', kohde: { tyyppi: 'kaupunki' } },
    { id: 'b', kohde: { lahi: true } },
    { id: 'c', kohde: {} },
  ];
  const portti = merkkiPortti(koe, false, (m) => m.kohde);
  assert.deepEqual(portti.merkit.map((m) => m.id), ['a', 'c']);
  assert.deepEqual(portti.piiloon, ['b']);
  assert.deepEqual(merkkiPortti(koe, true, (m) => m.kohde).merkit.map((m) => m.id),
    ['a', 'b', 'c'], 'lähizoomilla kaikki');

  for (const [iso, ms] of maittain) {
    for (const m of ms) {
      if (m.kohde?.lahi) {
        assert.equal(m.poltettava, false, `${iso}/${m.tunnus} on lahi-kohde mutta palaa`);
      }
    }
  }
});

test('portti ei siirrä ladontaa: poltetun merkin tiiviste on luettelossa', () => {
  let poltettuja = 0;
  for (const m of merkit) {
    if (!m.poltettava) {
      assert.equal(luettelo[m.tunnus], undefined,
        `${m.tunnus} ei pala mutta on luettelossa`);
      continue;
    }
    poltettuja += 1;
    assert.equal(luettelo[m.tunnus], m.tiiviste,
      `${m.tunnus}: luettelon tiiviste eroaa merkin omasta`);
  }
  assert.equal(poltettuja, tilasto.poltettu);
  assert.equal(Object.keys(luettelo).length, poltettuja);
  // Maat, joiden lehti on tällä laudalla — sama joukko kuin ennen porttia.
  const lehdet = Object.entries(FOKUS_POHJAT).filter(([, p]) => p.lauta === pack.id).length;
  assert.ok(lehdet >= maittain.size, `lehtiä ${lehdet}, maita merkeissä ${maittain.size}`);
});
