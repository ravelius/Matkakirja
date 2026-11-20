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
import { FOKUSKOHTEET_FRA } from '../js/packs/fokuskohteet-fra.js';
import { EUROOPAN_KADONNEET } from '../js/packs/monumentit-eurooppa.js';

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

/*
 * KK:N PÄÄTÖS 20.11.2026 klo 14.00 (aiempi: P-261120-10; kortti noston-kuvat 9): kuva näkyy sillä jaksolla, jossa kertoja sanoo
 * kuvan asian, ei ennen. Testi tarkistaa jakson (1-alkuinen) ja jakson tekstistä kuvan asian, ei vain paikkaa kuvalistassa.
 * [kohteen tunnus, jakson numero, jaksokuvan avain, teksti, jonka jakso sanoo]
 */
const JAKSOT = [
  ['eiffel-torni', 4, 'lustig', /Lustig/],
  ['sainte-chapelle', 1, 'piha', /palatsin pihalla/],
  ['sainte-chapelle', 3, 'kaulanauha', /Elokuussa 1784 kardinaali tapasi Versailles'n puistossa/],
  ['sainte-chapelle', 4, 'parlamentti', /Pariisin parlamentissa/],
  ['curie-1898', 1, 'vaja', /Curien vaja/],
  ['curie-1898', 3, 'radiumtyo', /eikä pitänyt sadetta, ja malmia kului tonneittain/],
  ['curie-1898', 4, 'hohto', /Iltaisin radium hohti/],
  ['louvre', 2, 'varkaus', /Louvre oli suljettu/],
  ['hahmotelma-temple-torni', 3, 'kadonnut', /Sidney Smith/],
];

/** Ensimmäinen olio, jolla on tunnus ja jaksot (kohdelistat ovat kaupunkien alla eri syvyyksillä). */
function etsi(osa, id) {
  if (!osa || typeof osa !== 'object') return null;
  if (osa.id === id && Array.isArray(osa.jaksot)) return osa;
  for (const v of Object.values(osa)) { const k = etsi(v, id); if (k) return k; }
  return null;
}
function kohde(id) {
  const k = etsi(FOKUSKOHTEET_FRA, id) ?? etsi(EUROOPAN_KADONNEET, id);
  assert.ok(k, `${id}: kohdetta ei löydy`);
  return k;
}

test('jokainen kuva on sen jakson kohdalla, jossa kertoja sanoo kuvan asian', () => {
  for (const [id, jakso, avain, teksti] of JAKSOT) {
    const k = kohde(id);
    const kuvaJaksot = k.jaksot.map((j, i) => (j.kuva === avain ? i + 1 : null)).filter(Boolean);
    assert.deepEqual(kuvaJaksot, [jakso], `${id}/${avain}: jaksot ${kuvaJaksot}, odotettu ${jakso}`);
    assert.match(k.jaksot[jakso - 1].teksti, teksti, `${id}/${avain}: jakson ${jakso} teksti ei sano kuvan asiaa`);
    assert.ok(k.jaksokuvat[avain]?.osoite?.includes('/tarina-'), `${id}/${avain}: jaksokuva puuttuu`);
  }
});

test('kuvat ovat 1200 × 800 ja niiden mitat ovat dataan kirjatut (ämpärin tiedostot: K-5 korjaus K3)', () => {
  for (const [id, , avain] of JAKSOT) {
    const k = kohde(id).jaksokuvat[avain];
    assert.equal(k.leveys, 1200, `${id}/${avain}`);
    assert.equal(k.korkeus, 800, `${id}/${avain}`);
  }
});
