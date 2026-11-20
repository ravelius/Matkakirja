/*
 * K-5 (KK:N PÄÄTÖS 20.11.2026 klo 13.50; omistaja 09.25): Codexin 11 nostokuvaa dataan havainnekuvina oikean jakson kohdalle.
 * Tiedostonimi kertoo noston ja jakson (tarina-<nosto>-<jakso>-<nimi>.jpg). Testi tarkistaa vientipaketin nostokuvat:
 * kuva on noston listassa, laji havainnekuva, lähderivi alkaa "Tekoälyllä tuotettu havainnekuva", selite ei väitä kuvaa aidoksi
 * eikä Sainte-Chapellen kaulanauhakuva mainitse viitan väriä. (Ämpärin sha256-vertailu: SK:n skriptin tuloste palautuksessa.)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { lisakentatViennissa } from '../tools/vienti/nostokuvat.mjs';

lisakentatViennissa(true);
const { tiedostot } = await kokoaVienti();
const valot = new Map(JSON.parse(tiedostot.get('kokoelmat/karttavalot.json')).alkiot.map((a) => [a.tunnus, a]));

// [karttavalon tunnus, tiedosto, odotettu paikka noston kuvalistassa (0-alkuinen)]
const KUVAT = [
  ['eiffel-torni', 'tarina-eiffel-torni-4-lustig.jpg', 2],
  ['sainte-chapelle', 'tarina-sainte-chapelle-1-piha.jpg', 0],
  ['sainte-chapelle', 'tarina-sainte-chapelle-2-kaulanauha.jpg', 1],
  ['sainte-chapelle', 'tarina-sainte-chapelle-4-parlamentti.jpg', 2],
  ['curie-1898', 'tarina-curie-1898-1-vaja.jpg', 0],
  ['curie-1898', 'tarina-curie-1898-2-radiumtyo.jpg', 1],
  ['curie-1898', 'tarina-curie-1898-4-hohto.jpg', 2],
  ['louvre', 'tarina-louvre-2-varkaus.jpg', 1],
  ['nosto-kirahvin-kavelymatka', 'tarina-kirahvi-1827-2-kavely.jpg', 1],
  ['hahmotelma-temple-torni', 'tarina-hahmotelma-temple-torni-3-kadonnut.jpg', 2],
  ['skandaali-vrain-lucas-kirjevaarennokset', 'tarina-vrain-lucas-2-kirjepino.jpg', 1],
];

test('11 K-5-kuvaa on oikean noston listassa oikealla jaksopaikalla havainnekuvina', () => {
  assert.equal(KUVAT.length, 11);
  for (const [tunnus, tiedosto, paikka] of KUVAT) {
    const lista = valot.get(tunnus)?.nostokuvat;
    assert.ok(Array.isArray(lista), `${tunnus}: ei nostokuvia`);
    const i = lista.findIndex((k) => k.osoite.endsWith(`/kuvat/${tiedosto}`));
    assert.equal(i, paikka, `${tunnus}: ${tiedosto} paikassa ${i}, odotettu ${paikka}`);
    const k = lista[i];
    assert.equal(k.laji, 'havainnekuva', `${tiedosto}: laji`);
    assert.ok(k.lahde.startsWith('Tekoälyllä tuotettu havainnekuva'), `${tiedosto}: lähderivi`);
    assert.equal(k.lisenssi, 'Matkakirjan oma');
    assert.equal(k.mista, 'nosto');
  }
});

test('selitteissä ei väitetä kuvaa aidoksi eikä mainita viitan väriä', () => {
  for (const [tunnus, tiedosto] of KUVAT) {
    const k = valot.get(tunnus).nostokuvat.find((x) => x.osoite.endsWith(`/kuvat/${tiedosto}`));
    assert.doesNotMatch(k.lyhyt, /valokuv|kuvattu|\b1[5-9]\d\d\b/i, `${tiedosto}: ${k.lyhyt}`);
    if (tiedosto.includes('kaulanauha')) assert.doesNotMatch(k.lyhyt + k.lahde, /viitta|punai|valkoi|harmaa/i);
  }
});
