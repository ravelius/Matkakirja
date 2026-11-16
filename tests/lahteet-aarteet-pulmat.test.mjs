// Aarteiden ja valokuvapulmien kuvien nimeäminen Tietoja-sivulla (KK 13.11.2026 klo 13.50, kortti
// lisenssit-ja-lataukset 4): tekijä ja lisenssi kuuluvat lähdeluetteloon, ei koskaan aarteen faktaan tai
// tehtävänäkymään. Rivit syntyvät datasta (js/lahteet.js pulmienJaAarteidenRivit).
import test from 'node:test';
import assert from 'node:assert/strict';
import { LAHTEET, AARREPAKAT, aarrekuvanRivi } from '../js/lahteet.js';
import { PYLVASKUVAT } from '../js/packs/europe-puzzles.js';
import { EUROPE } from '../js/packs/europe.js';
import { MAAILMA } from '../js/packs/maailma.js';
import { ISTANBUL } from '../js/packs/istanbul.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { PAIKALLISAARTEET } from '../js/packs/paikallisaarteet.js';

const huomit = () => new Set(LAHTEET.flatMap((r) => r.rivit).map((r) => r.huom));
const LISENSSITEKSTI = /\(Kuva:|\bCC[ -]BY\b|\bCC0\b|Wikimedia|Commons|lisenssi|Public domain/i;

function faktat(o, polku, ulos) {
  if (Array.isArray(o)) o.forEach((x, i) => faktat(x, `${polku}[${i}]`, ulos));
  else if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      if (k === 'fakta' && typeof v === 'string') ulos.push([`${polku}.fakta`, v]);
      else faktat(v, `${polku}.${k}`, ulos);
    }
  }
  return ulos;
}

test('aarteen faktassa ei ole kuvan lähdettä eikä lisenssitekstiä', () => {
  const kaikki = [];
  for (const [nimi, pakka] of [...AARREPAKAT.map((p, i) => [`pakka${i}`, p]), ['MAAILMA', MAAILMA],
    ['ISTANBUL', ISTANBUL], ['MAAILMANKARTTA', MAAILMANKARTTA]]) {
    faktat(pakka?.tokens?.types ?? {}, `${nimi}.tokens.types`, kaikki);
  }
  faktat(PAIKALLISAARTEET, 'PAIKALLISAARTEET', kaikki);
  assert.ok(kaikki.length > 50, `faktoja ${kaikki.length}`);
  assert.deepEqual(kaikki.filter(([, t]) => LISENSSITEKSTI.test(t)), []);
});

test('jokaisella kuvaLahde-aarteella on rivi Lähteet-luettelossa (Kolme veljestä mukana)', () => {
  const h = huomit();
  const kuvalliset = AARREPAKAT.flatMap((p) => Object.values(p?.tokens?.types ?? {})).filter((a) => a?.kuvaLahde);
  assert.ok(kuvalliset.includes(EUROPE.tokens.types.star), 'Kolme veljestä -riipuksella on kuvaLahde');
  for (const a of kuvalliset) {
    const k = a.kuvaLahde;
    assert.ok(k.teos && k.tekija && /^CC BY/.test(k.lisenssi) && /^https:\/\/commons\.wikimedia\.org\//.test(k.linkki),
      `${a.name}: teos, tekijä, lisenssi ja linkki`);
    assert.ok(h.has(aarrekuvanRivi(a).huom), `${a.name}: rivi puuttuu`);
  }
  const rivi = aarrekuvanRivi(EUROPE.tokens.types.star);
  assert.match(rivi.tekija, /Peter Portner/);
  assert.equal(rivi.lisenssi, 'CC BY-SA 4.0');
  assert.match(rivi.huom, /Muokattu.*samalla lisenssillä.*Three_Brothers_jewel_Basel\.jpg/);
});

test('valokuvapulman jokaisella CC BY / BY-SA -kuvalla on rivi Lähteet-luettelossa', () => {
  const h = huomit();
  const nimettavat = PYLVASKUVAT.filter((k) => /\bCC BY\b/.test(k.lahde));
  assert.equal(nimettavat.length, 4);
  assert.deepEqual(nimettavat.filter((k) => !h.has(`Wikimedia Commons: ${k.tiedosto}`)).map((k) => k.tiedosto), []);
});
