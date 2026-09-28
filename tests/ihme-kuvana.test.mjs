import test from 'node:test';
import assert from 'node:assert/strict';

import { kohteenKuvalista, kohteenNykykuva, matkakirjanIhme } from '../js/fokuskohteet.js';
import { FOKUSKOHTEET_GRC } from '../js/packs/fokuskohteet-grc.js';

/*
 * "KOE IHME" -NAPPI POIS (omistaja 27.9.2026 klo 23.4x, Olympia-kortti):
 * yhä olemassa olevan kohteen ihmekuva on kortin ensimmäinen ja iso kuva,
 * ja valokuva siitä, mitä paikalla NYT on, kelluu pienenä tekstin kyljessä.
 */
const olympia = FOKUSKOHTEET_GRC.find((k) => k.id === 'olympia');

test('Olympia: ihme on olemassa olevan kohteen ihme', () => {
  assert.ok(olympia?.ihme?.osoite, 'Olympialla on ihmekuva');
  assert.equal(olympia.ihme.kadonnut, false);
});

test('olemassa oleva: ihmekuva kortin ensimmäisenä, nykyinen valokuva ei sarjassa', () => {
  const lista = kohteenKuvalista(olympia);
  assert.equal(lista[0].osoite, olympia.ihme.osoite, 'ihmekuva ensimmäisenä');
  assert.ok(lista[0].nauha, 'nauha mukana');
  const nyky = kohteenNykykuva(olympia);
  assert.equal(nyky, olympia.kuva, 'nykyinen valokuva tekstin kylkeen');
  assert.ok(!lista.some((k) => (k.tiedosto ?? k.osoite) === (nyky.tiedosto ?? nyky.osoite)), 'nykykuva ei kahdesti');
});

test('kadonnut ja ihmeetön kohde ennallaan', () => {
  const kadonnut = { nimi: 'Koe', ihme: { osoite: 'assets/kartat/ihmeet/koe.webp', kadonnut: true }, kuva: { tiedosto: 'Koe.jpg' } };
  assert.equal(kohteenNykykuva(kadonnut), null);
  assert.deepEqual(kohteenKuvalista(kadonnut).map((k) => k.tiedosto ?? k.osoite), ['assets/kartat/ihmeet/koe.webp', 'Koe.jpg']);
  const tavallinen = { nimi: 'Tavallinen', kuva: { tiedosto: 'T.jpg' } };
  assert.equal(kohteenNykykuva(tavallinen), null);
  assert.deepEqual(kohteenKuvalista(tavallinen).map((k) => k.tiedosto), ['T.jpg']);
});

test('nähtävyysikkunan ihme ei kanna enää nappitekstiä', () => {
  const ihme = matkakirjanIhme('Olympia');
  assert.ok(ihme, 'Olympian ihme löytyy nimellä');
  assert.equal(ihme.kadonnut, false);
  assert.equal('nappi' in ihme, false);
});

test('ihmekuvan alla lyhyt kuvateksti, pitkä selite suurennokseen (Natiivi-UI:n löydös 28.9.2026)', async () => {
  const { kuvatekstiLyhyt, kuvatekstiPitka } = await import('../js/kuvatekstit.js');
  const kuva = kohteenKuvalista(olympia)[0];
  assert.match(kuvatekstiLyhyt(kuva), /^Feidiaan 12,4-metrinen Zeus-patsas/);
  assert.equal(kuvatekstiPitka(kuva), olympia.ihme.selite);
  assert.equal(kuvatekstiLyhyt(matkakirjanIhme('Olympia')), olympia.ihme.lyhyt, 'nähtävyysikkuna samoin');
  const ilman = kohteenKuvalista({ ihme: { osoite: 'a.webp', selite: 'Pitkä.' } })[0];
  assert.equal(kuvatekstiLyhyt(ilman), 'Pitkä.', 'ilman lyhyttä pitkä kelpaa');
});
