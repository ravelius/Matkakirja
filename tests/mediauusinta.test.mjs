/*
 * SITKEÄ KUVANLATAUS JA PYYNTÖJONO (js/media.js).
 *
 * Omistajan kuvakaappaus 6.9.2026 klo 01.09 (iPhone, Ateenan
 * kaupunkilehti): *"Kartalla pisteitä jotka eivät toimi"* — viisi
 * kohdetta kahdestatoista oli pelkkä täplä. Mitattu syy: ämpärin
 * julkinen r2.dev-osoite vastasi **429 Too Many Requests** koko
 * miniatyyripurskeeseen, ja peli pudotti pisteen täpläksi ENSIMMÄISESTÄ
 * virheestä eikä yrittänyt uudestaan.
 *
 * Nämä testit vartioivat kolmea asiaa, jotka on helppo rikkoa vahingossa:
 *   1. virhe johtaa uuteen yritykseen SAMALLA osoitteella (cache-busting
 *      rikkoisi sw.js:n välimuistin, joka avaimena on polku),
 *   2. yrityksillä on katto eikä ketju jää silmukkaan,
 *   3. onnistunut lataus ei tuplaa pyyntöä.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  KUVAJONON_LEVEYS, haeSitkeasti, kuvajononTila, lataaKuvaSitkeasti,
  mediaLukemat, nollaaKuvajono, nollaaMediaLukemat, retryAfterMs,
} from '../js/media.js';

/**
 * Kevyt <img>-jäljitelmä: kirjaa jokaisen src-sijoituksen ja osaa
 * laukaista `load`- ja `error`-tapahtuman niin kuin selain tekisi.
 */
function teeKuva() {
  const kuuntelijat = { load: [], error: [] };
  return {
    sijoitukset: [],
    _src: null,
    get src() { return this._src; },
    set src(arvo) { this._src = arvo; this.sijoitukset.push(arvo); },
    getAttribute() { return this._src; },
    addEventListener(laji, fn) { kuuntelijat[laji]?.push(fn); },
    removeEventListener(laji, fn) {
      const lista = kuuntelijat[laji];
      if (!lista) return;
      const i = lista.indexOf(fn);
      if (i >= 0) lista.splice(i, 1);
    },
    laukaise(laji) {
      for (const fn of kuuntelijat[laji].splice(0, kuuntelijat[laji].length)) fn();
    },
    petta() { this.laukaise('error'); },
    latasi() { this.laukaise('load'); },
  };
}

/** Odottaa, että ajastimet ja lupaukset ehtivät pyörähtää. */
const hetki = (ms = 12) => new Promise((r) => { setTimeout(r, ms); });

test('ensimmäinen virhe johtaa uuteen yritykseen SAMALLA osoitteella', async () => {
  nollaaKuvajono();
  nollaaMediaLukemat();
  const kuva = teeKuva();
  const osoite = 'https://peili.test/kohde.png';
  const lupaus = lataaKuvaSitkeasti(kuva, osoite, { viive: 2, kerroin: 1 });

  assert.deepEqual(kuva.sijoitukset, [osoite], 'ensimmäinen pyyntö heti');
  kuva.petta();
  assert.deepEqual(kuva.sijoitukset, [osoite], 'uusinta vasta viiveen jälkeen');
  await hetki();
  assert.deepEqual(kuva.sijoitukset, [osoite, osoite],
    'sama osoite uudestaan — ei cache-busting-parametria (sw.js avaimena on polku)');

  kuva.latasi();
  assert.equal(await lupaus, true);
  assert.equal(mediaLukemat().uusinta, 1);
  assert.equal(mediaLukemat().onnistui, 1);
  nollaaKuvajono();
});

test('yrityksillä on katto: onVirhe vasta viimeisen jälkeen, ei silmukkaa', async () => {
  nollaaKuvajono();
  nollaaMediaLukemat();
  const kuva = teeKuva();
  let luovutti = 0;
  const lupaus = lataaKuvaSitkeasti(kuva, 'https://peili.test/a.png', {
    yrityksia: 4, viive: 1, kerroin: 1, onVirhe: () => { luovutti += 1; },
  });

  for (let i = 1; i <= 3; i += 1) {
    kuva.petta();
    assert.equal(luovutti, 0, `yritys ${i} ei vielä luovuta`);
    // eslint-disable-next-line no-await-in-loop
    await hetki();
    assert.equal(kuva.sijoitukset.length, i + 1, `yritys ${i + 1} lähti`);
  }
  kuva.petta();
  assert.equal(luovutti, 1, 'neljäs virhe luovuttaa');
  assert.equal(await lupaus, false);
  await hetki();
  assert.equal(kuva.sijoitukset.length, 4, 'katto pitää: ei viidettä pyyntöä');

  const lukemat = mediaLukemat();
  assert.equal(lukemat.uusinta, 3);
  assert.equal(lukemat.epaonnistui, 1);
  assert.equal(lukemat.onnistui, 0);
  nollaaKuvajono();
});

test('onnistunut lataus ei tuplaa pyyntöä', async () => {
  nollaaKuvajono();
  nollaaMediaLukemat();
  const kuva = teeKuva();
  const lupaus = lataaKuvaSitkeasti(kuva, 'https://peili.test/b.png', { viive: 1 });
  kuva.latasi();
  assert.equal(await lupaus, true);
  await hetki();
  assert.equal(kuva.sijoitukset.length, 1, 'yksi pyyntö riittää');
  assert.deepEqual(mediaLukemat(), { onnistui: 1, uusinta: 0, epaonnistui: 0 });
  nollaaKuvajono();
});

test('kesken vaihdettu kuva ei jatka vanhaa ketjua', async () => {
  nollaaKuvajono();
  nollaaMediaLukemat();
  const kuva = teeKuva();
  const lupaus = lataaKuvaSitkeasti(kuva, 'https://peili.test/eka.png', { viive: 1 });
  // Galleria antaa samalle <img>:lle uuden kuvan ennen kuin vanha ehti
  // pettää: vanha ketju ei saa asettaa omaa osoitettaan takaisin.
  kuva.src = 'https://peili.test/toka.png';
  kuva.petta();
  assert.equal(await lupaus, false, 'vanha ketju päättyy hiljaisesti');
  await hetki();
  assert.equal(kuva.src, 'https://peili.test/toka.png');
  nollaaKuvajono();
});

test('jono päästää neljä pyyntöä kerrallaan, loput perässä', async () => {
  nollaaKuvajono();
  nollaaMediaLukemat();
  assert.equal(KUVAJONON_LEVEYS, 4, 'jonon leveys on kirjattu vakiona');
  const kuvat = Array.from({ length: 6 }, () => teeKuva());
  kuvat.forEach((kuva, i) => {
    void lataaKuvaSitkeasti(kuva, `https://peili.test/jono-${i}.png`, { viive: 1 });
  });
  await hetki();
  assert.equal(kuvat.filter((k) => k.src).length, KUVAJONON_LEVEYS,
    'kohdekartan 10–25 miniatyyriä eivät lähde yhtenä purskeena');
  assert.equal(kuvajononTila().jonossa, 2);

  kuvat[0].latasi();
  await hetki();
  assert.equal(kuvat.filter((k) => k.src).length, 5, 'vapautunut vuoro siirtyy jonosta');
  kuvat[1].latasi();
  await hetki();
  assert.equal(kuvat.filter((k) => k.src).length, 6);
  for (const kuva of kuvat.slice(2)) kuva.latasi();
  await hetki();
  assert.equal(kuvajononTila().kaynnissa, 0, 'jokainen vuoro vapautuu');
  nollaaKuvajono();
});

test('Retry-After luetaan sekunteina ja katkaistaan kattoon', () => {
  const otsakkeilla = (arvo) => ({ headers: { get: () => arvo } });
  assert.equal(retryAfterMs(otsakkeilla('2')), 2000);
  assert.equal(retryAfterMs(otsakkeilla('600')), 10000, 'katto 10 s');
  assert.equal(retryAfterMs(otsakkeilla(null)), null);
  assert.equal(retryAfterMs(undefined), null);
});

test('haeSitkeasti uusii 429:n ja 5xx:n mutta ei 404:ää', async () => {
  nollaaMediaLukemat();
  const vastaus = (status, otsake = null) => ({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (nimi) => (nimi === 'Retry-After' ? otsake : null) },
  });

  let kutsuja = 0;
  const tulos = await haeSitkeasti('https://peili.test/laatat.json', {
    yrityksia: 3,
    viive: 1,
    kerroin: 1,
    haku: async () => {
      kutsuja += 1;
      return kutsuja < 3 ? vastaus(429, '0') : vastaus(200);
    },
  });
  assert.equal(tulos.status, 200, 'kolmas yritys onnistuu');
  assert.equal(kutsuja, 3);

  kutsuja = 0;
  const puuttuu = await haeSitkeasti('https://peili.test/ei-ole.json', {
    yrityksia: 3,
    viive: 1,
    haku: async () => { kutsuja += 1; return vastaus(404); },
  });
  assert.equal(puuttuu.status, 404);
  assert.equal(kutsuja, 1, 'puuttuva tiedosto ei parane odottamalla');

  kutsuja = 0;
  const rikki = await haeSitkeasti('https://peili.test/palvelin.json', {
    yrityksia: 2,
    viive: 1,
    haku: async () => { kutsuja += 1; return vastaus(503); },
  });
  assert.equal(rikki.status, 503);
  assert.equal(kutsuja, 2, '5xx uusitaan kattoon asti');
});
