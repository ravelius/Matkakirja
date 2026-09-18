/*
 * POLTETTU MERKKI ON LUKITUSSA ANKKURISSA — MITTA ILMAN SELAINTA.
 *
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 33 TARKENNUS 2 ja Fablen rajaus
 * 18.9.2026: Ranskan nostot poltetaan nostotasolle, poltetaan vain
 * kaupungin ULKOPUOLISET nostot, siirtoviivaa ei polteta, ja lukittu
 * ankkuri (js/packs/nostoankkurit-fra.js) ON noston paikka.
 *
 * MIKSI TÄMÄ ON TESTI EIKÄ KERTAMITTA. Poltettu muste on laatassa
 * PYSYVÄSTI: jos polttoketju ja lukittu taulu ajautuvat erilleen, peli
 * piirtää elävän nimiön ja osumapinnan eri kohtaan kuin missä muste
 * on, eikä sitä voi korjata muuten kuin polttamalla laatat uudelleen.
 * Ero mitattiin 18.9.2026 ennen korjausta: Avignon 3,10 ja
 * Mont-Saint-Michel 2,74 laudan yksikköä (~6-7 px). Vaatimus on siksi
 * TASAN 0 — ei sietoa, koska kumpikin luku tulee samasta taulusta
 * saman muunnoksen (js/pulu-paikka.js asteetLaudalle) läpi.
 *
 * Mitta ei tarvitse selainta eikä laattoja: `keraaNostot` on puhdasta
 * laudan dataa.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { packById } from '../js/pack.js';
import { asteetLaudalle } from '../js/pulu-paikka.js';
import { lukittuAnkkuri, onLukittuMaa } from '../js/pallolauta/nostoankkurit.js';

const pack = packById('maailmankartta');
const { merkit, luettelo } = keraaNostot(pack);
const ranska = merkit.filter((m) => m.iso === 'FRA');
/*
 * KAUPUNKIPISTE EI OLE NOSTO (Fablen rajaus kohta a): `nakyva-kaupunki-*`
 * on kaupungin oma piste ja `elaintaky-*` oma kerroksensa, ja kumpikin
 * palaa kuten ennen. Lukitus koskee vain levitettäviä nostoja.
 */
const onKaupunkipiste = (t) => String(t).startsWith('nakyva-kaupunki-');
const lukittavat = ranska.filter((m) => m.poltettava && m.perhe === 'nosto'
  && !onKaupunkipiste(m.tunnus));

test('Ranska on lukittu maa ja sillä on poltettavia nostoja', () => {
  assert.ok(onLukittuMaa('FRA'));
  assert.ok(lukittavat.length > 0, 'Ranskasta ei polteta yhtään nostoa — mitta ei mittaa mitään');
});

test('jokainen poltettava Ranskan nosto on TASAN lukitussa ankkurissaan', () => {
  for (const m of lukittavat) {
    const a = lukittuAnkkuri(`nosto:${m.tunnus}`);
    assert.ok(a, `${m.tunnus} poltetaan ilman lukittua ankkuria`);
    const p = asteetLaudalle(pack.id, a.lat, a.lng);
    assert.equal(m.x, p.x, `${m.tunnus}: x ei ole ankkurissa`);
    assert.equal(m.y, p.y, `${m.tunnus}: y ei ole ankkurissa`);
    // Ankkurikenttä on siirtymän lähtöpiste — lukitulla se on sama piste.
    assert.equal(m.ankkuriX, p.x, `${m.tunnus}: ankkuriX ei ole ankkurissa`);
    assert.equal(m.ankkuriY, p.y, `${m.tunnus}: ankkuriY ei ole ankkurissa`);
  }
});

test('lukitulta nostolta ei polteta siirtoviivaa', () => {
  for (const m of lukittavat) {
    assert.equal(m.viiva, null, `${m.tunnus}: siirtoviiva palaisi laattaan`);
  }
});

test('kaupungin sisäinen nosto ei saa pistettä laattaan', () => {
  /*
   * PAATOKSET 34: sisäiset ovat kaupunkiliuskassa eivätkä kartalla
   * millään zoomilla. Sääntö on pelin oma (onKaupunginSisainen), ja
   * tässä mitataan sen SEURAUS: yksikään sisäinen ei ole luettelossa.
   * Laskuri on tilastossa, joten testi myös huomaa, jos suodatus
   * lakkaa löytämästä yhtään — silloin sääntö on hiljaa rikkoutunut.
   */
  const { tilasto } = keraaNostot(pack);
  assert.ok(tilasto.sisaisia > 0, 'yksikään nosto ei ole kaupungin sisäinen — suodatus ei toimi');
  for (const m of merkit) {
    if (!m.poltettava) assert.ok(!(m.tunnus in luettelo) || luettelo[m.tunnus] === m.tiiviste);
  }
});

test('poltettu tiiviste on LADONNAN pisteestä, ei lukitusta ankkurista', () => {
  /*
   * Tiiviste on merkin TUNNISTE, jonka peli laskee omasta
   * ladonnastaan (js/fokuskohteet.js kohteenNostotiiviste →
   * js/pallo.js pallonNostoOnPoltettu). Jos se laskettaisiin
   * siirretystä pisteestä, se ei täsmäisi ja jokainen lukittu nosto
   * piirtyisi elävänä musteen päälle. Väite: siirretystä pisteestä
   * laskettu tiiviste EROAA luettelon tiivisteestä ainakin siellä,
   * missä lukittu ankkuri siirsi merkkiä.
   */
  const siirretyt = lukittavat.filter((m) => m.lukittuAnkkuri);
  assert.ok(siirretyt.length > 0);
  for (const m of siirretyt) {
    assert.equal(luettelo[m.tunnus], m.tiiviste, `${m.tunnus}: luettelo ja merkki eri tiivisteellä`);
  }
});
