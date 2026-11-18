// NÄHTÄVYYS AVAA NOSTON JA LUE LISÄÄ VAIN SUOMEKSI (PT 18.11.2026 04.5x, NUI:n selvitys; natiivin säännöt
// NUI 5cda787ef PaikkaSaanto.FokusValo ja f15b541f4 WikiIkkuna).
import test from 'node:test';
import assert from 'node:assert/strict';
import '../js/fokuskohteet.js';
import { nahtavyydenNosto, nahtavyydenAvaaja } from '../js/nahtavyydet.js';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';
import { fetchSummarySuomeksi, parseKielilinkkiFi } from '../js/wiki.js';

/** Sama yhdistys kuin js/nahtavyydet.js:n kutsupaikoissa. */
function kohde(kaupunki, nimi) {
  const raaka = (KAUPUNKIKARTAT[kaupunki]?.kohteet ?? []).find((k) => k.nimi === nimi);
  assert.ok(raaka, `${kaupunki}: piste ${nimi}`);
  const juttu = NAHTAVYYSJUTUT[kaupunki]?.[raaka.nimi];
  return juttu ? { ...raaka, wiki: undefined, ...juttu, karttaNosto: raaka.nosto } : { ...raaka };
}

test('kadonnut ihme avaa aina noston, myös jutun kanssa', () => {
  assert.equal(nahtavyydenNosto(kohde('pariisi', "Palais de l'Industrie")), 'hahmotelma-palais-industrie');
  assert.equal(nahtavyydenNosto(kohde('pariisi', "Palais d'Orsay")), 'hahmotelma-palais-orsay');
  // SK PR 7134: Grand Palais on Palais de l'Industrien jakso (yksi nosto).
  assert.equal(nahtavyydenNosto(kohde('pariisi', 'Grand Palais')), 'hahmotelma-palais-industrie');
});

test('juttuton kohde, jonka nosto on pääkartan kohde, avaa noston (ei Wikipediaa)', () => {
  for (const [nimi, tunnus] of [["Tuileries'n palatsi", 'tuileries'], ['Curien vaja', 'curie-1898'],
    ['Pasteurin laboratorio', 'pasteur-1862'], ['Lavoisierin laboratorio', 'lavoisier-1780'], ['Louvre', 'louvre']]) {
    assert.equal(nahtavyydenNosto(kohde('pariisi', nimi)), tunnus, nimi);
  }
});

test('skandaali, juttu ja pelkkä wiki entisillä reiteillä', () => {
  assert.equal(nahtavyydenNosto(kohde('valletta', 'Suurmestarin palatsi')), null, 'skandaali → fi-wiki');
  assert.equal(nahtavyydenNosto(kohde('pariisi', 'Petit Palais')), null, 'oma juttu');
  const onKohde = () => true;
  assert.equal(nahtavyydenNosto({ teksti: 'juttu', nosto: 'louvre' }, onKohde), null, 'juttu voittaa kohteen');
  assert.equal(nahtavyydenNosto({ nosto: 'skandaali-x' }, () => false), null, 'ei kohde');
  assert.equal(nahtavyydenNosto({ wiki: 'X' }, onKohde), null, 'ei nostoa');
  assert.equal(nahtavyydenNosto({ nosto: ['louvre', 'muu'] }, (t) => t === 'louvre'), 'louvre', 'listan ensimmäinen');
});

test('avaaja: nosto ensin, vanha reitti jos kortti ei aukea', () => {
  const wikit = [];
  const ui = { openWikiArticle: (w) => wikit.push(w) };
  assert.equal(nahtavyydenAvaaja(ui, { nimi: 'X' }, null), null, 'ei mitään avattavaa');
  nahtavyydenAvaaja(ui, { nimi: 'Y', wiki: 'Y' }, null)();
  assert.deepEqual(wikit, ['Y']);
});

const vastaus = (data, ok = true) => ({ ok, json: async () => data });

test('Lue lisää: fi suoraan, sitten en → fi -kielilinkki, muuten null (ei englantia)', async () => {
  const pyynnot = [];
  const fi = (otsikko) => ({ type: 'standard', title: otsikko, extract: 'Lyhyt fi-tynkä.' });
  const haku = (osumat) => async (url) => {
    pyynnot.push(url);
    for (const [osa, data] of osumat) if (url.includes(osa)) return vastaus(data);
    return vastaus(null, false);
  };
  // Suora fi-osuma, lyhytkin kelpaa.
  let s = await fetchSummarySuomeksi('Grand Palais', { fetchImpl: haku([['fi.wikipedia.org/api/rest_v1/page/summary/Grand%20Palais', fi('Grand Palais')]]) });
  assert.equal(s.lang, 'fi');
  assert.ok(!pyynnot.some((u) => u.includes('en.wikipedia.org/api/rest_v1')), 'ei en-tiivistelmää');
  // Kielilinkki: "Tuileries Palace" → "Tuileries'n palatsi".
  pyynnot.length = 0;
  s = await fetchSummarySuomeksi('Tuileries Palace', { fetchImpl: haku([
    ['prop=langlinks', { query: { pages: { 1: { langlinks: [{ lang: 'fi', '*': "Tuileries'n palatsi" }] } } } }],
    ['summary/Tuileries\'n%20palatsi', fi("Tuileries'n palatsi")],
    ['summary/Tuileries%27n%20palatsi', fi("Tuileries'n palatsi")],
  ]) });
  assert.equal(s?.title, "Tuileries'n palatsi");
  // Ei fi-sivua: null, vaikka englanniksi olisi.
  s = await fetchSummarySuomeksi('Only English', { fetchImpl: haku([
    ['en.wikipedia.org/api/rest_v1/page/summary/Only%20English', { type: 'standard', title: 'Only English', extract: 'x'.repeat(400) }],
    ['prop=langlinks', { query: { pages: { 1: {} } } }],
  ]) });
  assert.equal(s, null);
  assert.equal(parseKielilinkkiFi({ query: { pages: { 1: { langlinks: [{ lang: 'fi', '*': ' Suomeksi ' }] } } } }), 'Suomeksi');
  assert.equal(parseKielilinkkiFi(null), null);
});
