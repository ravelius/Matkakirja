/*
 * REAKTIOT: hyötykuorman muoto, istunnon virhe-esto ja lähetysjono.
 *
 * TÄRKEIN TESTI on hyötykuorma. Reaktio kulkee olemassa olevan
 * ehdotuskanavan läpi (js/ehdotukset.js lahetaEhdotus → workerin
 * POST /laheta), joka on kirjoitettu juttuideoille eikä reaktioille:
 * jos etuliite katoaa tekstin tai tarkenteen alusta, omistajan
 * Lukijoilta-lehteen valuu nimettömiä yhden sanan lappuja, joita ei voi
 * lajitella mistään. Worker leikkaa lisäksi tarkenteen 500 merkkiin ja
 * siivoaa siitä rivinvaihdot, joten tunniste on oltava sen alussa.
 *
 * Toiseksi tärkein on jono: lähetys ei saa koskaan kaataa peliä eikä
 * kadota reaktiota verkkokatkoon.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  REAKTIO_ETULIITTEET, REAKTIO_JONO_TALLE, REAKTIO_TEKSTIN_KATTO,
  jonotaReaktio, nollaaReaktiot, puraReaktiojono, reaktioVersio, reaktionKuorma,
  reaktiotKaytossa,
} from '../js/reaktiot.js';

/** Muistissa elävä localStorage — sama sopimus kuin selaimen. */
function asennaVarasto() {
  const arvot = new Map();
  globalThis.localStorage = {
    getItem: (k) => (arvot.has(k) ? arvot.get(k) : null),
    setItem: (k, v) => { arvot.set(k, String(v)); },
    removeItem: (k) => { arvot.delete(k); },
  };
  return arvot;
}

test('kanava on kytketty (muuten riviä ei piirretä lainkaan)', () => {
  // Sama portti kuin ehdotuslomakkeella: tyhjä EHDOTUS_OSOITE piilottaa
  // koko toiminnon. Testi vahtii, ettei osoite katoa vahingossa.
  assert.equal(reaktiotKaytossa(), true);
});

test('peukun kuorma kantaa etuliitteen sekä tekstissä että tarkenteessa', () => {
  const kuorma = reaktionKuorma('peukku', 'juttu:lontoo:Tower Bridge',
    { otsikko: 'Tower Bridge' });
  assert.ok(kuorma.teksti.startsWith(`${REAKTIO_ETULIITTEET.peukku}: Tower Bridge`));
  assert.ok(kuorma.tarkenne.startsWith(REAKTIO_ETULIITTEET.peukku));
  assert.equal(kuorma.sivu, 'juttu:lontoo:Tower Bridge');
  assert.ok(kuorma.teksti.includes('Sisältö: juttu:lontoo:Tower Bridge'));
});

test('virheilmoituksen vapaateksti tulee mukaan ja katkeaa kattoon', () => {
  const pitka = 'x'.repeat(REAKTIO_TEKSTIN_KATTO + 50);
  const kuorma = reaktionKuorma('virhe', 'kohde:thessaloniki',
    { teksti: pitka, otsikko: 'Thessaloniki' });
  assert.ok(kuorma.teksti.startsWith(`${REAKTIO_ETULIITTEET.virhe}: Thessaloniki`));
  const rivit = kuorma.teksti.split('\n');
  const vapaa = rivit.find((r) => r.startsWith('x'));
  assert.equal(vapaa.length, REAKTIO_TEKSTIN_KATTO);
});

test('tyhjä vapaateksti ei jätä tyhjää lohkoa kuormaan', () => {
  const kuorma = reaktionKuorma('virhe', 'ihme:Knossos', { otsikko: 'Knossos' });
  assert.ok(!/\n\n\n/.test(kuorma.teksti), kuorma.teksti);
  assert.ok(kuorma.teksti.includes('Otsikko: Knossos'));
});

test('worker saa aina epätyhjän tekstin — myös ilman otsikkoa ja versiota', () => {
  // POST /laheta hylkää lähetyksen, jossa ei ole tekstiä eikä kuvaa.
  const kuorma = reaktionKuorma('peukku', 'aihe:praha:historia');
  assert.ok(kuorma.teksti.trim().length > 0);
  assert.ok(kuorma.tarkenne.includes('aihe:praha:historia'));
});

test('versio luetaan DOMista eikä muutoslokista', () => {
  // js/muutokset.js on niputuksessa vasta ui.js:n jälkeen, joten
  // reaktiot ei voi tuoda sitä. Puuttuva elementti on tyhjä merkkijono,
  // ei kaatuminen.
  assert.equal(reaktioVersio(null), '');
  assert.equal(reaktioVersio({ getElementById: () => ({ textContent: ' 2026-08-09.1245 ' }) }),
    '2026-08-09.1245');
});

test('istunnon virhe-esto on tyhjennettävissä', () => {
  nollaaReaktiot();
  // reaktioIlmoitettu on piirtäjän käyttämä lippu; ilman piirtoa se on
  // aina epätosi, ja nollaus palauttaa saman tilan.
  assert.doesNotThrow(() => nollaaReaktiot());
});

test('epäonnistunut lähetys jää jonoon eikä katoa', async () => {
  const arvot = asennaVarasto();
  const kuorma = reaktionKuorma('peukku', 'kohde:delfoi', { otsikko: 'Delfoi' });
  jonotaReaktio(kuorma);
  assert.equal(JSON.parse(arvot.get(REAKTIO_JONO_TALLE)).length, 1);

  // Verkko yhä poikki: kuorma palaa jonoon, se ei häviä purkuyrityksessä.
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    assert.equal(await puraReaktiojono(), 0);
  } finally {
    globalThis.fetch = alkuperainen;
  }
  assert.equal(JSON.parse(arvot.get(REAKTIO_JONO_TALLE)).length, 1);
});

test('verkon palatessa jono tyhjenee', async () => {
  const arvot = asennaVarasto();
  jonotaReaktio(reaktionKuorma('virhe', 'kohde:nafplio', { teksti: 'Vuosiluku väärin.' }));
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async () => new Response('{"ok":true}',
    { status: 200, headers: { 'content-type': 'application/json' } });
  try {
    assert.equal(await puraReaktiojono(), 1);
  } finally {
    globalThis.fetch = alkuperainen;
  }
  assert.equal(arvot.get(REAKTIO_JONO_TALLE), undefined);
});

test('yksityinen selaus ei kaada lähetystä', () => {
  globalThis.localStorage = {
    getItem: () => { throw new Error('ei käytössä'); },
    setItem: () => { throw new Error('ei käytössä'); },
    removeItem: () => { throw new Error('ei käytössä'); },
  };
  assert.doesNotThrow(() => jonotaReaktio(reaktionKuorma('peukku', 'kohde:patras')));
});
