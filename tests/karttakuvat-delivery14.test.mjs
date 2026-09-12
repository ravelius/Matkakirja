import test from 'node:test';
import assert from 'node:assert/strict';

import { SKANDAALIT } from '../js/packs/skandaalit.js';
import { MAASTOKOHTEET_EST } from '../js/packs/maastokohteet-est.js';
import { skandaalinKuvat } from '../js/skandaalit.js';
import { kohteenKuvalista } from '../js/fokuskohteet.js';

const SKANDAALIKUVAT = [
  ['PRT', 'portugalilaisen-nunnan-kirjeet', 'prt-skandaali-skandaali-portugalilaisen-nunnan-kirjeet-dd99e0cd157d.jpg'],
  ['LVA', 'thiess-ihmissusi', 'lva-skandaali-skandaali-thiess-ihmissusi-9d3e01f7a2b1.jpg'],
  ['HUN', 'pyhan-kruunun-varkaus-1440', 'hun-skandaali-skandaali-pyhan-kruunun-varkaus-1440-b707a38f3934.jpg'],
  ['LTU', 'lituanican-viimeinen-lento', 'ltu-skandaali-skandaali-lituanican-viimeinen-lento-b1c6a8fb61d7.jpg'],
  ['ITA', 'cagliostro-san-leo', 'ita-skandaali-skandaali-cagliostro-san-leo-74c109d225f8.jpg'],
  ['HRV', 'zrinski-frankopan-salaliitto', 'hrv-skandaali-skandaali-zrinski-frankopan-salaliitto-2d847b0598a9.jpg'],
  ['TUR', 'karun-aarre', 'tur-skandaali-skandaali-karun-aarre-00f4173b7aa5.jpg'],
  ['NOR', 'gjest-baardsen-mestarivaras', 'nor-skandaali-skandaali-gjest-baardsen-mestarivaras-eb233ecd0e32.jpg'],
  ['ITA', 'modiglianin-paat-1984', 'ita-skandaali-skandaali-modiglianin-paat-1984-4a42cbfbd878.jpg'],
];

const VIRON_KUVAT = [
  ['suurmunamagi', 'est-maasto-suurmunamagi-0db7b30f17c6.jpg'],
  ['itameri', 'est-maasto-itameri-8c87cd382f39.jpg'],
  ['suomenlahti', 'est-maasto-suomenlahti-ae72a2574132.jpg'],
  ['tartu-ulikool', 'est-kohde-tartu-ulikool-09e4f04bb3d5.jpg'],
  ['narvan-linnus', 'est-kohde-narvan-linnus-d83001009ce7.jpg'],
];

function tarkistaHavainne(kuva, tiedosto, kohta) {
  assert.equal(kuva?.osoite,
    `https://media.matkakirja.app/karttanostot/20260912/${tiedosto}`,
    `${kohta}: väärä ensisijainen kuva`);
  assert.match(kuva.lyhyt, /\S/);
  assert.match(kuva.selite, /\S/);
  assert.equal(kuva.lahde, 'Matkakirjan havainnekuva');
  assert.equal(kuva.tekija, 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva');
  assert.equal(kuva.lisenssi, 'Matkakirjan oma havainnekuva');
  assert.match(kuva.lahdeUrl, /^https:\/\//);
}

test('yhdeksän skandaalin hyväksytty havainnekuva on renderer-listan ensimmäinen', () => {
  for (const [maa, id, tiedosto] of SKANDAALIKUVAT) {
    const kohde = SKANDAALIT[maa].find((x) => x.id === id);
    assert.ok(kohde, `${maa}:${id}: tietuetta ei löydy`);
    const kuvat = skandaalinKuvat(kohde);
    tarkistaHavainne(kuvat[0], tiedosto, `${maa}:${id}`);
    assert.equal(new Set(kuvat.map((x) => x.osoite ?? x.tiedosto)).size, kuvat.length,
      `${maa}:${id}: renderer-listassa on kaksoiskappale`);
  }
});

test('viiden Viron kohteen hyväksytty havainnekuva on kohdekortin ensimmäinen', () => {
  for (const [id, tiedosto] of VIRON_KUVAT) {
    const kohde = MAASTOKOHTEET_EST.find((x) => x.id === id);
    assert.ok(kohde, `EST:${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    tarkistaHavainne(kuvat[0], tiedosto, `EST:${id}`);
    assert.equal(new Set(kuvat.map((x) => x.osoite ?? x.tiedosto)).size, kuvat.length,
      `EST:${id}: renderer-listassa on kaksoiskappale`);
  }
});
