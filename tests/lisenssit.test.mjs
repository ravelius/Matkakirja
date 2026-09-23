/*
 * MEDIAN NC/ND-PORTTI — yksi laskuri kaikelle medialle.
 *
 * Pelistä tulee maksullinen (Fable 23.9.2026), joten NC- ja ND-ehtoinen
 * aineisto ei saa lisääntyä. tools/vienti/lisenssit.mjs luokittelee
 * jokaisen mediaviitteen (kuvat, äänet, liput, julisteet…) samalla
 * säännöllä kuin pelin portit (js/lisenssi.js). Tämä testi on AINOA
 * NC/ND-laskuri; äänten portin vartija (tests/aanilisenssit.test.mjs)
 * nojaa tähän.
 *
 * Kaatuu, jos
 *   - dataan tulee uusi NC/ND-viite (ei listassa), tai
 *   - listassa on viite, joka on korvattu (lista pidetään totena ja
 *     lyhenevänä: poista rivi tools/vienti/lisenssit-tunnetut.json:sta).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { luokitteleMedia, vertaaTunnettuihin, TUNNETUT_NC_ND } from '../tools/vienti/lisenssit.mjs';
import { aaniLisenssiTunnus, lisenssiKelpaa } from '../js/lisenssi.js';

const { tiedostot } = await kokoaVienti();
const { viitteet } = luokitteleMedia(tiedostot);

test('NC/ND-viitteet ovat täsmälleen tunnettu lista', () => {
  const v = vertaaTunnettuihin(viitteet);
  assert.deepEqual(v.uudet, [], `uusi NC/ND-media: ${v.uudet.join(' | ')}`);
  assert.deepEqual(v.korvatut, [], `korvattu, poista tools/vienti/lisenssit-tunnetut.json:sta: ${v.korvatut.join(' | ')}`);
});

test('tunnettujen listan rivit ovat oikeasti NC/ND', () => {
  for (const t of TUNNETUT_NC_ND) {
    assert.ok(t.arvo && t.lisenssi, JSON.stringify(t));
    assert.equal(lisenssiKelpaa(aaniLisenssiTunnus(t.lisenssi)), false, t.lisenssi);
  }
});

/** Pieni keinotekoinen vienti: yksi moduuli, yksi mediaviite. */
function vienti(exportit, esiintymat, laji = 'aani-peilattu', arvo = 'https://example.org/a.mp3') {
  return new Map([
    ['manifest.json', JSON.stringify({ moduulit: [{ moduuli: 'js/koe.js', tiedosto: 'moduulit/js/koe.json' }] })],
    ['moduulit/js/koe.json', JSON.stringify({ exportit })],
    ['media.json', JSON.stringify({ viitteet: [{ arvo, laji, esiintymat: esiintymat.map((polku) => ({ moduuli: 'js/koe.js', export: 'KOE', polku })) }] })],
  ]);
}
const luokkaa = (t) => luokitteleMedia(t).viitteet[0].luokka;

test('luokittelu: NC löytyy, vapaa kelpaa, lisenssi luetaan ylempää ja Map-parista', () => {
  assert.equal(luokkaa(vienti({ KOE: [{ url: 'x', nimi: 'Tori — A, CC BY-NC' }] }, ['/0/url'])), 'nc-nd');
  assert.equal(luokkaa(vienti({ KOE: [{ url: 'x', nimi: 'Tori — A, CC BY-SA' }] }, ['/0/url'])), 'vapaa');
  assert.equal(luokkaa(vienti({ KOE: { aani: 'x', aaniLahde: 'B (CC BY-ND 3.0)' } }, ['/aani'])), 'nc-nd');
  assert.equal(luokkaa(vienti({ KOE: { lisenssi: 'CC BY-NC 4.0', rivit: [{ url: 'x' }] } }, ['/rivit/0/url'])), 'nc-nd');
  assert.equal(luokkaa(vienti({ KOE: { $map: [['a.jpg', { lisenssi: 'CC BY 2.0' }]] } }, ['/$map/0/0'], 'kuva-flickr')), 'vapaa');
  assert.equal(luokkaa(vienti({ KOE: [{ url: 'x' }] }, ['/0/url'])), 'tuntematon');
  assert.equal(luokkaa(vienti({ KOE: [{ url: 'x', lahde: 'Matkakirjan havainnekuva' }] }, ['/0/url'], 'kuva-url')), 'oma');
});

test('luokittelu: NC/ND voittaa, vaikka toisessa esiintymässä lisenssi olisi vapaa', () => {
  const t = vienti({ KOE: [{ url: 'x', nimi: 'A, CC BY' }, { url: 'x', nimi: 'A, CC BY-NC-SA' }] }, ['/0/url', '/1/url']);
  assert.equal(luokkaa(t), 'nc-nd');
});
