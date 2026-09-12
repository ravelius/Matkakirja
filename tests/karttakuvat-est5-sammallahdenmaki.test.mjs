import test from 'node:test';
import assert from 'node:assert/strict';
import { MAASTOKOHTEET_EST } from '../js/packs/maastokohteet-est.js';
import { MAASTOKOHTEET_FIN } from '../js/packs/maastokohteet-fin.js';

const est = new Map(MAASTOKOHTEET_EST.map((kohde) => [kohde.id, kohde]));
const fin = new Map(MAASTOKOHTEET_FIN.map((kohde) => [kohde.id, kohde]));
const lista = (kohde) => [kohde.kuva, ...(kohde.kuvat ?? [])].filter(Boolean);

const aidot = new Map([
  ['kuressaaren-linna', 'est-kohde-kuressaaren-linna-d8962b4b5073.jpg'],
  ['kopu-tuletorn', 'est-kohde-kopu-tuletorn-bb55a04ab1f1.jpg'],
  ['kihnu', 'est-kohde-kihnu-512c5cb9132a.jpg'],
  ['parnu', 'est-kohde-parnu-e28cf1c466fd.jpg'],
  ['narvan-linnus', 'est-kohde-narvan-linnus-7646b0a2dd5e.jpg'],
]);

test('viisi aitoa Viron kuvaa sisältävät oikeustiedot ilman URL-kaksoiskappaleita', () => {
  for (const [id, tiedosto] of aidot) {
    const kuvat = lista(est.get(id));
    const urls = kuvat.map((kuva) => kuva.osoite);
    assert.equal(new Set(urls).size, urls.length, `${id}: sama kuva kahdesti`);
    const kuva = kuvat.find((x) => x.osoite.endsWith(tiedosto));
    assert.ok(kuva, `${id}: aito kuva puuttuu`);
    assert.match(kuva.lahde, /^Valokuva:/);
    assert.match(kuva.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.equal(kuva.lisenssi, 'CC BY-SA 4.0');
    assert.equal(kuva.lisenssiUrl, 'https://creativecommons.org/licenses/by-sa/4.0/');
    assert.ok(kuva.tekija && kuva.lyhyt && kuva.selite);
  }
});

test('Pärnun ja Narvan havainnekuva säilyy ensimmäisenä', () => {
  assert.deepEqual(lista(est.get('parnu')).map((x) => x.osoite), [
    'https://media.matkakirja.app/karttanostot/20260912/est-kohde-parnu-6bd0530d1255.jpg',
    'https://media.matkakirja.app/karttanostot/20260912/est-kohde-parnu-e28cf1c466fd.jpg',
  ]);
  assert.deepEqual(lista(est.get('narvan-linnus')).map((x) => x.osoite), [
    'https://media.matkakirja.app/karttanostot/20260912/est-kohde-narvan-linnus-d83001009ce7.jpg',
    'https://media.matkakirja.app/karttanostot/20260912/est-kohde-narvan-linnus-7646b0a2dd5e.jpg',
  ]);
});

test('Sammallahdenmäen hyväksytty havainnekuva ja lähde ovat kytkettyinä', () => {
  const kuva = fin.get('sammallahdenmaki').kuva;
  assert.equal(kuva.osoite,
    'https://media.matkakirja.app/karttanostot/20260912/fin-kohde-sammallahdenmaki-c35cb84efe24.jpg');
  assert.equal(kuva.lahde, 'Matkakirjan havainnekuva');
  assert.equal(kuva.tekija, 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva');
  assert.match(kuva.lahdeUrl, /^https:\/\/www\.museovirasto\.fi\//);
});
