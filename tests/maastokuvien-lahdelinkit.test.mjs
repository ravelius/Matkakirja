import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const juuri = new URL('../', import.meta.url);
const lue = (polku) => fs.readFileSync(new URL(polku, juuri), 'utf8');

function luePakki(polku, nimi) {
  const lahde = lue(polku).replace(`export const ${nimi} =`, `globalThis.${nimi} =`);
  const konteksti = {};
  vm.createContext(konteksti);
  vm.runInContext(lahde, konteksti);
  return konteksti[nimi];
}

const odotetut = [
  ['POL', 'rysy'], ['POL', 'sniezka'], ['POL', 'itameri'], ['POL', 'veiksel'],
  ['POL', 'malbork'], ['UKR', 'hoverla'], ['UKR', 'mustameri'],
  ['UKR', 'asovanmeri'], ['UKR', 'dnepr'],
];

test('ensimmäisen kuvaerän yhdeksän tietuetta kantavat kuvan ja klikattavan lähdemetadatan', () => {
  const pakit = {
    POL: luePakki('js/packs/maastokohteet-pol.js', 'MAASTOKOHTEET_POL'),
    UKR: luePakki('js/packs/maastokohteet-ukr.js', 'MAASTOKOHTEET_UKR'),
  };
  for (const [maa, id] of odotetut) {
    const kuva = pakit[maa].find((x) => x.id === id)?.kuva;
    assert.ok(kuva, `${maa}:${id}: kuva puuttuu`);
    assert.ok(kuva.tiedosto, `${maa}:${id}: Commons-tiedostonimi puuttuu`);
    assert.ok(kuva.selite, `${maa}:${id}: kuvateksti puuttuu`);
    assert.ok(kuva.tekija, `${maa}:${id}: tekijä puuttuu`);
    assert.ok(kuva.lahde.includes(kuva.tekija), `${maa}:${id}: tekijä ei näy lähderivillä`);
    assert.match(kuva.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(kuva.lisenssi, /^(?:CC BY(?:-SA)? [234]\.0|Public domain)$/);
    assert.match(kuva.lisenssiUrl, /^https:\/\//);
  }
});

test('lähderivin apuri tekee Commons- ja lisenssisanoista oikeat ulkoiset linkit', async () => {
  const solmu = (nodeType = 1) => ({
    nodeType,
    childNodes: [],
    appendChild(lapsi) { lapsi.parentNode = this; this.childNodes.push(lapsi); return lapsi; },
    replaceChildren(...lapset) { this.childNodes = []; lapset.forEach((x) => this.appendChild(x)); },
    querySelector() { return null; },
    setAttribute(nimi, arvo) { this[nimi] = arvo; },
    addEventListener() {},
  });
  globalThis.document = {
    createTextNode(teksti) { return { nodeType: 3, nodeValue: teksti, textContent: teksti }; },
    createElement() { return solmu(); },
  };
  const { taytaLahderivi } = await import('../js/tekijakortti.js');
  const el = solmu();
  taytaLahderivi(el, 'Kuvaaja, Wikimedia Commons (CC BY 4.0)', {
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuva.jpg',
    lisenssi: 'CC BY 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
  });
  const linkit = el.childNodes.filter((x) => x.href);
  assert.deepEqual(linkit.map((x) => x.textContent), ['Wikimedia Commons', 'CC BY 4.0']);
  assert.deepEqual(linkit.map((x) => x.href), [
    'https://commons.wikimedia.org/wiki/File:Kuva.jpg',
    'https://creativecommons.org/licenses/by/4.0/',
  ]);
  assert.ok(linkit.every((x) => x.target === '_blank' && x.rel === 'noopener noreferrer'));
  delete globalThis.document;
});
