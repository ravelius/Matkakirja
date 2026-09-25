import test from 'node:test';
import assert from 'node:assert/strict';

import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FIN } from '../js/packs/maastokohteet-fin.js';
import { MAASTOKOHTEET_SWE } from '../js/packs/maastokohteet-swe.js';
import { MAASTOKOHTEET_NOR } from '../js/packs/maastokohteet-nor.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';

const TAPAUKSET = [
  [MAASTOKOHTEET_FIN, 'suomenlahti', 'fin-maasto-suomenlahti-36c903d047a6.jpg', 'fin-maasto-suomenlahti-ed485e1c26dd.jpg'],
  [MAASTOKOHTEET_FIN, 'kerimaenkirkko', 'fin-kohde-kerimaenkirkko-9da7b658baa0.jpg', 'fin-kohde-kerimaenkirkko-31cc93674675.jpg'],
  [MAASTOKOHTEET_FIN, 'koli', 'fin-kohde-koli-3b9c0577c279.jpg', 'fin-kohde-koli-1a08b6e8ddc4.jpg'],
  [MAASTOKOHTEET_FIN, 'saimaa', 'fin-kohde-saimaa-a116aac4f831.jpg', 'fin-kohde-saimaa-1ab486b20a35.jpg'],
  [MAASTOKOHTEET_FIN, 'bomarsund', 'fin-kohde-bomarsund-04e06ac99dc8.jpg', 'fin-kohde-bomarsund-300bf713e1f9.jpg'],
  [MAASTOKOHTEET_FIN, 'hameenlinna', 'fin-kohde-hameenlinna-902715e493f7.jpg', 'fin-kohde-hameenlinna-0fd4b80439c0.jpg'],
  [MAASTOKOHTEET_SWE, 'kebnekaise', 'swe-maasto-kebnekaise-dd1df4d59bad.jpg', 'swe-maasto-kebnekaise-cd98484728f3.jpg'],
  [MAASTOKOHTEET_SWE, 'gotaalv', 'swe-maasto-gotaalv-6a7b7252d343.jpg', 'swe-maasto-gotaalv-76c74fdd7683.jpg'],
  [MAASTOKOHTEET_NOR, 'galdhpiggen', 'nor-maasto-galdhpiggen-3570e4558290.jpg', 'nor-maasto-galdhpiggen-abed85b170a3.jpg'],
  [MAASTOKOHTEET_NOR, 'glomma', 'nor-maasto-glomma-93f541979ec1.jpg', 'nor-maasto-glomma-abcd4279dea9.jpg'],
  [MAASTOKOHTEET_FRA, 'loire', 'fra-maasto-loire-7d2bf0f03134.jpg', 'fra-maasto-loire-c38f7bfdd6e9.jpg'],
  [MAASTOKOHTEET_FRA, 'rhone', 'fra-maasto-rhone-5c452abae760.jpg', 'fra-maasto-rhone-181bfd18e8e2.jpg'],
];

test('landscapes24 näyttää havainteen ensin ja aidon kuvan toisena', () => {
  for (const [pakka, id, havainne, aito] of TAPAUKSET) {
    const kohde = pakka.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2, `${id}: renderer-listan kuvamäärä`);
    assert.ok(kuvat[0].osoite.endsWith(`/${havainne}`), `${id}: havainne ei ole ensimmäinen`);
    assert.ok(kuvat[1].osoite.endsWith(`/${aito}`), `${id}: aito ei ole toinen`);
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.doesNotMatch(`${kuvat[0].lyhyt} ${kuvat[0].selite}`, /havainnekuva/i);
    assert.ok([...kuvat[0].lyhyt].length <= 100, `${id}: havainteen lyhyt`);
    assert.ok([...kuvat[1].lyhyt].length <= 100, `${id}: aidon kuvan lyhyt`);
    assert.equal(new Set(kuvat.map((kuva) => kuva.osoite ?? kuva.tiedosto)).size, 2,
      `${id}: renderer-listassa on kaksoiskappale`);
  }
});

test('landscapes24 säilyttää johdannaisten lähteen ja lisenssin', () => {
  for (const [pakka, id] of TAPAUKSET) {
    const [havainne, aito] = kohteenKuvalista(pakka.find((x) => x.id === id));
    assert.match(havainne.tekija, /^OpenAI[;,]/);
    assert.ok(havainne.lisenssi, `${id}: havainteen lisenssi`);
    assert.match(havainne.lisenssiUrl, /^https:\/\//, `${id}: havainteen lisenssilinkki`);
    assert.match(havainne.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
      `${id}: havainteen lähdesivu`);
    assert.ok(aito.lisenssi, `${id}: aidon kuvan lisenssi`);
    assert.match(aito.lisenssiUrl, /^https:\/\//, `${id}: aidon kuvan lisenssilinkki`);
    assert.match(aito.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
      `${id}: aidon kuvan lähdesivu`);
  }
});
