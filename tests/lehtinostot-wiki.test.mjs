/*
 * LEHTINOSTOJEN WIKIPEDIA-LINKIT JA GALLERIAN OTSIKOT (PT 12.10.2026).
 *
 * Karttauudistuksen erät 5 ja 10 (721efc3cf v1850, 92e55048a v1854) siirsivät
 * 14 aihesivun nostot kartalle, mutta noston `wiki` ("Lue lisää aiheesta") ja
 * gallerian kuvien `otsikko` jäivät historiaan. NUI palauttaa nostot aihesivuille
 * (natiivi-ui/lehtinostot-184), joten kentät on palautettu täkynostoihin samoille
 * nosto-id:ille. `wiki` on yksi Wikipedia-otsikko (fi.wikipedia.org) tai lista
 * otsikoista (kuten `musiikki`). Otsikoiden olemassaolo ja ettei yksikään ole
 * täsmennyssivu tarkistettiin Wikipedian rajapinnasta 12.10.2026.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const WIKIT = {
  lontoo: { 'leake-streetin-tunneli': 'Banksy', 'neljas-jalusta': 'Antony Gormley', 'tate-modernin-turbiinihalli': 'Tate Modern', 'orbitin-liukumaki': 'Anish Kapoor' },
  wien: { 'tonava-kaunoinen': 'Johann Strauss nuorempi', 'taikahuilu-wiedenissa': 'Taikahuilu' },
  madrid: { 'madridin-kaksi-joukkuetta': ['Estadio Santiago Bernabéu', 'Plaza de Cibeles'], 'gran-vian-murto': 'Alfonso XIII', 'palamaton-linna': 'Palacio Real de Madrid' },
  berliini: { 'paavin-kosto': 'Berliinin televisiotorni', 'maailmankello': 'Alexanderplatz' },
  pariisi: { 'pariisi-soi': ['Édith Piaf', 'Django Reinhardt'] },
  amsterdam: { 'amsterdamin-yovartio': 'Yövartio (maalaus)', 'amsterdamin-maitotytto': 'Maitotyttö' },
  rooma: { 'aqua-virgo': 'Rooman akveduktit' },
};

test('palautetuilla lehtinostoilla on Wikipedia-otsikko (Lue lisää aiheesta)', () => {
  let n = 0;
  for (const [kaupunki, nostot] of Object.entries(WIKIT)) {
    for (const [id, odotettu] of Object.entries(nostot)) {
      const nosto = FOKUSVIRRAT[kaupunki].takynostot.find((x) => x.id === id);
      assert.ok(nosto, `${kaupunki}/${id}: nostoa ei löydy`);
      assert.deepEqual(nosto.wiki, odotettu, `${kaupunki}/${id}: wiki ei vastaa`);
      n += Array.isArray(odotettu) ? odotettu.length : 1;
    }
  }
  assert.equal(n, 17, 'Wikipedia-linkkejä palautettu 17');
});

test('gallerian kuvilla on otsikko (kuvateksti) palautetuissa nostoissa', () => {
  const GAL = [
    ['wien', 'taikahuilu-wiedenissa'], ['amsterdam', 'amsterdamin-yovartio'],
    ['berliini', 'paavin-kosto'], ['berliini', 'maailmankello'], ['rooma', 'rooman-nasone'],
  ];
  for (const [kaupunki, id] of GAL) {
    const nosto = FOKUSVIRRAT[kaupunki].takynostot.find((x) => x.id === id);
    assert.ok(nosto?.galleria?.length, `${kaupunki}/${id}: galleria puuttuu`);
    for (const kuva of nosto.galleria) {
      assert.ok(typeof kuva.otsikko === 'string' && kuva.otsikko.length > 0,
        `${kaupunki}/${id}: gallerian kuvalta puuttuu otsikko (${kuva.tiedosto})`);
      assert.ok(kuva.selite && kuva.lahde, `${kaupunki}/${id}: selite tai lähde puuttuu`);
    }
  }
});
