import test from 'node:test';
import assert from 'node:assert/strict';

import { SKANDAALIT } from '../js/packs/skandaalit.js';

const ODOTETUT = [
  ['IRL', 'pigottin-vaarennetyt-kirjeet', 'skandaali-irl-pigottin-vaarennetyt-kirjeet-r20260911-v2.jpg'],
  ['IRL', 'parnellin-lankeemus', 'skandaali-irl-parnellin-lankeemus-r20260911-v2.jpg'],
  ['NLD', 'oera-linda-kasikirjoitus', 'skandaali-nld-oera-linda-kasikirjoitus-r20260911-v1.jpg'],
  ['NLD', 'van-meegerenin-vermeerit', 'skandaali-nld-van-meegerenin-vermeerit-r20260911-v1.jpg'],
  ['ISL', 'koirapaivien-kuningas', 'skandaali-isl-koirapaivien-kuningas-r20260912-v2.jpg'],
  ['ISL', 'siivettoman-ruokin-loppu', 'skandaali-isl-siivettoman-ruokin-loppu-r20260912-v2.jpg'],
  ['UKR', 'potemkinin-kulissikylat', 'skandaali-ukr-potemkinin-kulissikylat-r20260912-v1.jpg'],
  ['UKR', 'velesin-kirja', 'skandaali-ukr-velesin-kirja-r20260912-v1.jpg'],
];

test('batch02–03:n kahdeksan havainnekuvaa on kytketty ensisijaisiksi', () => {
  for (const [iso, id, tiedosto] of ODOTETUT) {
    const kohde = SKANDAALIT[iso].find((s) => s.id === id);
    assert.ok(kohde, `${iso}/${id}: tietuetta ei löydy`);
    const ensimmainen = kohde.kuvat?.[0] ?? kohde.kuva;
    assert.equal(ensimmainen.osoite,
      `https://media.matkakirja.app/skandaalit/${tiedosto.includes('20260912') ? '20260912' : '20260911'}/${tiedosto}`);
    assert.match(ensimmainen.lahde, /^Matkakirjan havainnekuva\. Faktat:/);
    assert.ok(ensimmainen.lyhyt && ensimmainen.selite && ensimmainen.lahdeUrl);
    for (const rinnakkainen of kohde.kuvat?.slice(1) ?? []) {
      assert.notEqual(rinnakkainen.osoite, ensimmainen.osoite, `${iso}/${id}: sama kuva kahdesti`);
    }
  }
});
