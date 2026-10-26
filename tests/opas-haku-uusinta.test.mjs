// WIKIMEDIA-HAUN UUSINTA (6.10.2026 17.45: Pariisin Liiku-lista 502 kylmänä; erähaun palan hetkellinen virhe tyhjensi listan).
import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteetErana, HAKU_UUSINTA_MS } from '../tools/pollo/opas.js';

HAKU_UUSINTA_MS.oletus = 0;
const ehdokkaat = [{ nimi: 'Eiffel-torni', wikipedia: 'Eiffel Tower', koukku: 'K.' }, { nimi: 'Louvre', wikipedia: 'Louvre', koukku: 'K.' }];
function verkko(virheet) {
  const kutsut = [];
  return { kutsut, haku: async (u) => {
    const s = decodeURIComponent(String(u)); kutsut.push(s);
    const lahde = s.includes('en.wikipedia') ? 'wiki' : s.includes('wikidata') ? 'wd' : 'commons';
    if (virheet[lahde] > 0) { virheet[lahde] -= 1; return virheet.koodi === 'verkko' ? Promise.reject(new Error('verkko')) : new Response('', { status: virheet.koodi }); }
    if (lahde === 'wiki') return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Eiffel Tower', coordinates: [{ lat: 48.8584, lon: 2.2945 }], pageprops: { wikibase_item: 'Q243' } },
      2: { title: 'Louvre', coordinates: [{ lat: 48.8606, lon: 2.3376 }], pageprops: { wikibase_item: 'Q19675' } } } } }));
    if (lahde === 'wd') return new Response(JSON.stringify({ entities: { Q243: { labels: { fi: { value: 'Eiffel-torni' } } }, Q19675: { labels: { fi: { value: 'Louvre' } } } } }));
    return new Response('{}');
  } };
}

test('429 ja 5xx: yksi uusinta, lista ei tyhjene', async () => {
  for (const koodi of [429, 503, 'verkko']) {
    const v = verkko({ wiki: 1, koodi });
    const k = await kohteetErana(v.haku, ehdokkaat);
    assert.deepEqual(k.map((x) => x.nimi), ['Eiffel-torni', 'Louvre'], `koodi ${koodi}`);
    assert.equal(v.kutsut.filter((s) => s.includes('en.wikipedia')).length, 2, 'täsmälleen yksi uusinta');
  }
});

test('404 ei uusita; toistuva 429 luovuttaa yhden uusinnan jälkeen', async () => {
  const a = verkko({ wiki: 1, koodi: 404 });
  assert.equal((await kohteetErana(a.haku, ehdokkaat)).length, 0);
  assert.equal(a.kutsut.filter((s) => s.includes('en.wikipedia')).length, 1);
  const b = verkko({ wiki: 5, koodi: 429 });
  assert.equal((await kohteetErana(b.haku, ehdokkaat)).length, 0);
  assert.equal(b.kutsut.filter((s) => s.includes('en.wikipedia')).length, 2);
});
