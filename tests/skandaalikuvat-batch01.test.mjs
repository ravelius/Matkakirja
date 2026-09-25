import test from 'node:test';
import assert from 'node:assert/strict';

import { SKANDAALIT } from '../js/packs/skandaalit.js';

const ODOTETUT = [
  {
    iso: 'POL',
    id: 'prokoszin-kronikka',
    osoite: 'https://media.matkakirja.app/skandaalit/20260911/'
      + 'skandaali-pol-prokoszin-kronikka-r20260911-v1.jpg',
    selite: 'Vuonna 1825 Prokoszin kronikka lupasi Puolalle tuntemattomien '
      + 'muinaiskuninkaiden historian, kunnes Joachim Lelewel löysi tekstistä '
      + 'paljon nuoremman käsikirjoitusjäljen.',
  },
  {
    iso: 'UKR',
    id: 'saitafernesin-tiaara',
    osoite: 'https://media.matkakirja.app/skandaalit/20260911/'
      + 'skandaali-ukr-saitafernesin-tiaara-r20260911-v1.jpg',
    selite: 'Israel Rouhomovski valmisti Odessassa vuonna 1894 kultatiaaran, '
      + 'jonka Louvre osti antiikin skyyttiläisenä aarteena; hän osoitti '
      + 'tekijyytensä Pariisissa vuonna 1903.',
  },
  {
    iso: 'RUS',
    id: 'sonja-kultakasi',
    osoite: 'https://media.matkakirja.app/skandaalit/20260911/'
      + 'skandaali-rus-sonja-kultakasi-r20260911-v1.jpg',
    selite: 'Sonja Kultakäden kuuluisassa huijauksessa moskovalainen '
      + 'jalokivikauppias Karl von Mel joutui vuonna 1883 lavastetun '
      + 'väärinkäsityksen vuoksi psykiatrin potilaaksi, kun Sonja pakeni '
      + 'korujen kanssa.',
  },
];

test('batch01:n kolme havainnekuvaa on kytketty oikeisiin skandaaleihin', () => {
  for (const odotettu of ODOTETUT) {
    const kohde = SKANDAALIT[odotettu.iso].find((s) => s.id === odotettu.id);
    assert.ok(kohde, `${odotettu.iso}/${odotettu.id}: tietuetta ei löytynyt`);
    assert.deepEqual(kohde.kuvat, [{
      osoite: odotettu.osoite,
      selite: odotettu.selite,
      lahde: 'Matkakirjan havainnekuva',
    }]);
    const osumat = Object.values(SKANDAALIT)
      .flat()
      .flatMap((skandaali) => skandaali.kuvat ?? [])
      .filter((kuva) => kuva.osoite === odotettu.osoite);
    assert.equal(osumat.length, 1,
      `${odotettu.osoite}: kuvan pitää esiintyä koko skandaaliaineistossa kerran`);
  }
  assert.equal(new Set(ODOTETUT.map((kuva) => kuva.osoite)).size, ODOTETUT.length,
    'sama havainnekuva on kytketty useaan tietueeseen');
});
