// Kaupunkiliuskan kategoriat: kohdekartan historian hetket eivät saa
// pudota "Muut"-kasaan (korjattu 23.9.2026).
//
// Kaupungin laatan päälle osuva hetki on datassa `kartalla: false`
// (js/packs/historian-hetket.js, omistaja 3.9.2026) ja asuu kaupunkilehden
// kohdekartalla (js/packs/maakartat.js `nosto: 'hetki-…'`). Se ei siksi ole
// maan kohdetiedoissa (js/fokuskohteet.js maanKohdetiedot, jota
// hetkiKarttarivit ruokkii vain `kartalla: true` -hetkillä), ja liuskan
// sisäiseksi nostoksi siirretty kohdekartan hetki sai tyhjän aiheen eli
// meni "Muut"-kasaan. Aihe haetaan nyt tunnuksella (hetkiKohdetieto).
import assert from 'node:assert/strict';
import test from 'node:test';

import { HISTORIAN_HETKET } from '../js/packs/historian-hetket.js';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { hetkiKarttarivit, hetkiKohdetieto } from '../js/historian-hetket.js';
import { maanKohdetiedot } from '../js/fokuskohteet.js';
import { kaupunkikartanSiirretyt } from '../js/nahtavyydet.js';
import { siirretynAihe } from '../js/pallolauta/nostot.js';
import { MUUT_AIHE, kategoriat } from '../js/pallolauta/kaupunkiliuska.js';

const HETKI_ISO = new Map(HISTORIAN_HETKET.map((h) => [`hetki-${h.id}`, h.iso]));

/** Kohdekartan kohteen noston tunnus (kenttä voi olla lista). */
const tunnusOf = (raaka) => (Array.isArray(raaka.nosto) ? raaka.nosto[0] : (raaka.nosto ?? null));

/** Kaikki kaupunkien kohdekarttojen hetkikohteet: [{ cityId, tunnus }]. */
function kohdekartanHetket() {
  const ulos = [];
  for (const [cityId, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    for (const raaka of kartta.kohteet ?? []) {
      const tunnus = tunnusOf(raaka);
      if (typeof tunnus === 'string' && tunnus.startsWith('hetki-')) ulos.push({ cityId, tunnus });
    }
  }
  return ulos;
}

test('kohdekartan hetket ovat olemassa ja viittaavat oikeisiin hetkiin', () => {
  const hetket = kohdekartanHetket();
  assert.ok(hetket.length >= 20, `kohdekartan hetkiä vain ${hetket.length}`);
  for (const { cityId, tunnus } of hetket) {
    assert.ok(HETKI_ISO.has(tunnus), `${cityId}: ${tunnus} ei ole historian hetki`);
  }
  // Juuri nämä puuttuvat pääkartan riveiltä: suodatin `kartalla` on oikea
  // pääkartalle, eikä korjaus saa muuttaa sitä.
  const paakartalla = hetket.filter(({ tunnus }) => hetkiKarttarivit(HETKI_ISO.get(tunnus), 'maailmankartta')
    .some((r) => r.kohde.id === tunnus));
  assert.equal(paakartalla.length, 0, paakartalla.map((h) => h.tunnus).join(', '));
});

test('jokaisen kohdekartan hetken aihe on "hetket", ei "Muut"', () => {
  const hetket = kohdekartanHetket();
  const muihin = [];
  for (const { tunnus } of hetket) {
    const kohdetiedot = maanKohdetiedot(null, HETKI_ISO.get(tunnus));
    const aihe = siirretynAihe(kohdetiedot, tunnus);
    if (aihe !== 'hetket') muihin.push(`${tunnus} → ${JSON.stringify(aihe)}`);
  }
  assert.deepEqual(muihin, [], `"Muut"-kasaan menisi ${muihin.length}/${hetket.length} kohdekartan hetkeä`);
  assert.equal(hetkiKohdetieto(hetket[0].tunnus).symboli, 'hetki');
});

test('liuskaan siirretyt kohdekartan hetket: "Muut"-ryhmässä nolla hetkeä', () => {
  // Sama rivinmuodostus kuin js/pallolauta/nostot.js "siirretyt".
  let hetkia = 0;
  let muutKasassa = 0;
  for (const cityId of Object.keys(KAUPUNKIKARTAT)) {
    const rivit = kaupunkikartanSiirretyt(null, cityId).map((k) => ({
      ...k,
      perhe: 'nosto',
      kartalta: true,
      aihe: siirretynAihe(maanKohdetiedot(null, HETKI_ISO.get(k.id) ?? null), k.id),
    }));
    hetkia += rivit.filter((r) => HETKI_ISO.has(r.id)).length;
    for (const kasa of kategoriat(rivit)) {
      if (kasa.aihe !== MUUT_AIHE) continue;
      muutKasassa += kasa.jasenet.filter((r) => HETKI_ISO.has(r.id)).length;
    }
  }
  assert.ok(hetkia >= 1, 'yksikään kohdekartan hetki ei siirry liuskaan — testi ei mittaa mitään');
  assert.equal(muutKasassa, 0, `"Muut"-kasassa ${muutKasassa} kohdekartan hetkeä`);
});

test('muiden rivien aihe ennallaan: tunnettu kohde omasta tiedostaan, tuntematon "Muut"', () => {
  const kohdetiedot = new Map([
    ['kohde-ihme', { id: 'kohde-ihme', ihme: { kadonnut: true, osoite: 'x' } }],
    ['kohde-skandaali', { id: 'kohde-skandaali', symboli: 'huuto' }],
  ]);
  assert.equal(siirretynAihe(kohdetiedot, 'kohde-ihme'), 'ihmeet');
  assert.equal(siirretynAihe(kohdetiedot, 'kohde-skandaali'), 'skandaalit');
  assert.equal(siirretynAihe(kohdetiedot, 'kartta:pariisi:7'), '');
  assert.equal(siirretynAihe(kohdetiedot, 'hetki-ei-ole-olemassa'), '');
  assert.equal(siirretynAihe(new Map(), undefined), '');
});
