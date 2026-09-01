/*
 * KUVIEN SYÖTTÖPUTKI — workerin reitti /kuvavinkki
 * (worker/ehdotukset/kuvavinkki.js, omistajan tilaus 1.9.2026).
 *
 * Reitti ottaa vastaan kuvia kolmelta sisäänkäynniltä: pelaajan
 * paikkavinkki, pro-tuottajan sama lomake tunnusparilla ja
 * havainnekuvan palaute. Testit vartioivat sitä, mikä tässä on
 * vaarallista mennä pieleen:
 *
 *   1. OIKEUDET OHITETTUNA. Kuva ilman omistajuusvakuutusta tai ilman
 *      käyttölupaa on työhuoneessa käyttökelvoton — mutta se näyttää
 *      kelvolliselta. Siksi kumpikin puute on 400, ei varoitus.
 *   2. AVOIN ORIGIN. Ilman origin-porttia reitti olisi kenen tahansa
 *      avoin kuvavarasto.
 *   3. VÄÄRÄ PRO-PARI hiljaisena ohituksena: tuottaja luulisi
 *      lähettäneensä kuvan pro-lähteenä, vaikka se tallentuisi
 *      nimettömänä.
 *   4. JONO EI EROA. Kuvavinkin on löydyttävä samalta /lista-reitiltä
 *      kuin tavallisten ehdotusten — muuten työhuone ei näe sitä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { ETULIITE, kasittele } from '../worker/ehdotukset/kasittelija.js';
import { KAYTTOLUVAT, KUVAVINKIN_KATTO } from '../worker/ehdotukset/kuvavinkki.js';

const PELI = 'https://ravelius.github.io';
const AVAIN = 'salainen-avain-123';

function teeAmpari() {
  const sisalto = new Map();
  return {
    sisalto,
    async put(avain, arvo, asetukset = {}) {
      const tavut = typeof arvo === 'string' ? new TextEncoder().encode(arvo).buffer : arvo;
      sisalto.set(avain, { tavut, httpMetadata: asetukset.httpMetadata ?? {} });
    },
    async get(avain) {
      const kohde = sisalto.get(avain);
      if (!kohde) return null;
      return {
        httpMetadata: kohde.httpMetadata,
        async text() { return new TextDecoder().decode(kohde.tavut); },
        async arrayBuffer() { return kohde.tavut; },
      };
    },
    async list({ prefix = '' } = {}) {
      const objects = [...sisalto.keys()]
        .filter((k) => k.startsWith(prefix)).sort().map((key) => ({ key }));
      return { objects, truncated: false };
    },
  };
}

function teeYmparisto(ampari = teeAmpari()) {
  return { EHDOTUKSET: ampari, EHDOTUS_AVAIN: AVAIN, EHDOTUS_ORIGINIT: PELI };
}

function vinkki(kentat = {}, kuvat = [], { origin = PELI } = {}) {
  const lomake = new FormData();
  for (const [nimi, arvo] of Object.entries(kentat)) lomake.append(nimi, arvo);
  for (const kuva of kuvat) lomake.append('kuvat', kuva);
  return new Request('https://esimerkki.workers.dev/kuvavinkki', {
    method: 'POST',
    headers: origin ? { origin } : {},
    body: lomake,
  });
}

function teeKuva(nimi = 'laatta.jpg', tyyppi = 'image/jpeg', tavuja = 32) {
  return new File([new Uint8Array(tavuja)], nimi, { type: tyyppi });
}

const apurit = { nyt: () => new Date('2026-09-01T10:00:00Z'), tunnus: () => 'abc123' };

/** Metan luku ämpäristä: kansioita on testeissä aina yksi. */
async function lueMeta(ampari) {
  const avain = [...ampari.sisalto.keys()].find((k) => k.endsWith('/meta.json'));
  return JSON.parse(await (await ampari.get(avain)).text());
}

/** Kelvollinen pelaajan kuvavinkki (omistajan esimerkki: muistolaatta). */
const KELPO = {
  paikka: 'Ritavuoren muistolaatta, Helsinki',
  teksti: 'Laatta talon seinässä, helppo ohittaa.',
  omakuva: 'on',
  kayttolupa: 'sellaisenaan',
};

/* ---------------------------------------------------------------- */
/* Portit                                                            */
/* ---------------------------------------------------------------- */

test('vieras origin ei pääse kirjoittamaan kuvavinkkejä', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    vinkki(KELPO, [teeKuva()], { origin: 'https://paha.example' }),
    teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 403);
  assert.equal(ampari.sisalto.size, 0, 'mitään ei saa tallentua');
});

test('vain POST kelpaa', async () => {
  const vastaus = await kasittele(
    new Request('https://esimerkki.workers.dev/kuvavinkki', {
      method: 'GET', headers: { origin: PELI },
    }),
    teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 405);
});

/* ---------------------------------------------------------------- */
/* Oikeusvalinnat — pakolliset molemmat                              */
/* ---------------------------------------------------------------- */

test('kuva ilman omistajuusvakuutusta torjutaan', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    vinkki({ ...KELPO, omakuva: '' }, [teeKuva()]), teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /itse ottamasi/i);
  assert.equal(ampari.sisalto.size, 0, 'oikeudeton kuva ei saa jäädä jonoon');
});

test('kuva ilman käyttölupaa torjutaan', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    vinkki({ ...KELPO, kayttolupa: '' }, [teeKuva()]), teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /käyttölupa/i);
  assert.equal(ampari.sisalto.size, 0);
});

test('keksitty käyttölupa ei kelpaa — lista on suljettu', async () => {
  const vastaus = await kasittele(
    vinkki({ ...KELPO, kayttolupa: 'ihan-miten-vaan' }, [teeKuva()]), teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.deepEqual(KAYTTOLUVAT, ['sellaisenaan', 'taustatieto']);
});

test('molemmat käyttöluvat kelpaavat ja kirjautuvat metaan', async () => {
  for (const lupa of KAYTTOLUVAT) {
    const ampari = teeAmpari();
    // eslint-disable-next-line no-await-in-loop
    const vastaus = await kasittele(
      vinkki({ ...KELPO, kayttolupa: lupa }, [teeKuva()]), teeYmparisto(ampari), apurit,
    );
    assert.equal(vastaus.status, 200);
    // eslint-disable-next-line no-await-in-loop
    const meta = await lueMeta(ampari);
    assert.deepEqual(meta.kuvaoikeudet, { omaKuva: true, kayttolupa: lupa });
  }
});

/* ---------------------------------------------------------------- */
/* Sisältö ja rajat                                                  */
/* ---------------------------------------------------------------- */

test('kuvavinkki ilman kuvaa torjutaan — vinkin sisältö ON kuva', async () => {
  const vastaus = await kasittele(vinkki(KELPO, []), teeYmparisto(), apurit);
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /Valitse kuva/i);
});

test('kuvavinkki ilman paikkaa torjutaan', async () => {
  const vastaus = await kasittele(
    vinkki({ ...KELPO, paikka: '' }, [teeKuva()]), teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /mistä paikasta/i);
});

test('kuvavinkin katto on 10 Mt — sen yli ei mene, sen alle menee', async () => {
  // Yli katon: torjutaan.
  const yli = await kasittele(
    vinkki(KELPO, [teeKuva('iso.jpg', 'image/jpeg', KUVAVINKIN_KATTO + 1)]),
    teeYmparisto(), apurit,
  );
  assert.equal(yli.status, 413);

  /*
   * Alle katon mutta yli /laheta:n 8 Mt:n rajan: menee läpi. Juuri tämä
   * on kuvavinkin oman katon syy — puhelimen kamerakuva, jota selain ei
   * osannut pienentää (HEIC), ei saa kaatua kahdeksaan megaan.
   */
  const ampari = teeAmpari();
  const alle = await kasittele(
    vinkki(KELPO, [teeKuva('iso.jpg', 'image/jpeg', 9 * 1024 * 1024)]),
    teeYmparisto(ampari), apurit,
  );
  assert.equal(alle.status, 200);
  assert.equal((await lueMeta(ampari)).kuvat.length, 1);
});

test('väärä kuvatyyppi torjutaan', async () => {
  const vastaus = await kasittele(
    vinkki(KELPO, [teeKuva('a.gif', 'image/gif')]), teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 415);
});

test('hunajapurkki nielee robotin hiljaa', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    vinkki({ ...KELPO, hunaja: 'botti' }, [teeKuva()]), teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 200, 'robotti ei saa oppia torjunnasta');
  assert.equal(ampari.sisalto.size, 0, 'mitään ei silti tallenneta');
});

/* ---------------------------------------------------------------- */
/* Havainnekuvan palaute                                             */
/* ---------------------------------------------------------------- */

test('palaute havainnekuvasta kelpaa ilman kuvaa ja tunnistetaan lajiksi', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(vinkki({
    kuvatunnus: 'assets/kartat/ihmeet/ihme-kolossi.webp',
    kuvalahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
    teksti: 'Patsas seisoi rannalla, ei sataman suulla.',
  }), teeYmparisto(ampari), apurit);
  assert.equal(vastaus.status, 200);
  const meta = await lueMeta(ampari);
  assert.equal(meta.laji, 'kuvapalaute');
  assert.equal(meta.kuvatunnus, 'assets/kartat/ihmeet/ihme-kolossi.webp');
  assert.match(meta.kuvalahde, /loistoaikansa asussa/);
  // Ilman kuvaa oikeuksia ei kysytä eikä keksitä.
  assert.equal(meta.kuvaoikeudet, null);
});

test('tyhjä palaute ilman tekstiä ja kuvaa torjutaan', async () => {
  const vastaus = await kasittele(
    vinkki({ kuvatunnus: 'assets/x.webp', teksti: '' }), teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 400);
});

test('palautteen liitekuva vaatii oikeudet siinä missä vinkinkin', async () => {
  const vastaus = await kasittele(
    vinkki({ kuvatunnus: 'assets/x.webp', teksti: 'Väärin.' }, [teeKuva()]),
    teeYmparisto(), apurit,
  );
  assert.equal(vastaus.status, 400);
  assert.match((await vastaus.json()).virhe, /itse ottamasi/i);
});

/* ---------------------------------------------------------------- */
/* Pro-tuottaja                                                      */
/* ---------------------------------------------------------------- */

test('väärä pro-pari on 401 eikä hiljainen nimetön tallennus', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    vinkki({ ...KELPO, sahkoposti: 'aino@example.com', koodi: 'VAARAKOODI' }, [teeKuva()]),
    teeYmparisto(ampari), apurit,
  );
  assert.equal(vastaus.status, 401);
  assert.equal(ampari.sisalto.size, 0);
});

test('tunnistettu pro-tuottaja merkitään kuvan lähteeksi', async () => {
  const ampari = teeAmpari();
  const env = teeYmparisto(ampari);
  // Tuottaja luodaan omistajan reitillä, jotta koodi on aito.
  const luonti = await kasittele(new Request(
    `https://esimerkki.workers.dev/pro-tuottaja?avain=${AVAIN}`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sahkoposti: 'aino@example.com', nimi: 'Aino Valokuvaaja' }),
    },
  ), env, apurit);
  assert.equal(luonti.status, 200);
  const { tuottaja } = await luonti.json();

  const vastaus = await kasittele(vinkki({
    ...KELPO, sahkoposti: 'aino@example.com', koodi: tuottaja.koodi,
  }, [teeKuva()]), env, apurit);
  assert.equal(vastaus.status, 200);

  const avain = [...ampari.sisalto.keys()]
    .find((k) => k.startsWith(ETULIITE) && k.endsWith('/meta.json'));
  const meta = JSON.parse(await (await ampari.get(avain)).text());
  assert.equal(meta.pro?.nimi, 'Aino Valokuvaaja');
  assert.equal(meta.pro?.tekijaId, tuottaja.tekijaId);
  // Koodi ei saa päätyä metaan.
  assert.ok(!JSON.stringify(meta).includes(tuottaja.koodi));
});

/* ---------------------------------------------------------------- */
/* Sama jono kuin tavallisilla ehdotuksilla                          */
/* ---------------------------------------------------------------- */

test('kuvavinkki näkyy työhuoneen /lista-reitillä muiden joukossa', async () => {
  const ampari = teeAmpari();
  const env = teeYmparisto(ampari);
  await kasittele(vinkki(KELPO, [teeKuva()]), env, apurit);

  const lista = await kasittele(
    new Request(`https://esimerkki.workers.dev/lista?avain=${AVAIN}`), env, apurit,
  );
  assert.equal(lista.status, 200);
  const { ehdotukset } = await lista.json();
  assert.equal(ehdotukset.length, 1);
  assert.equal(ehdotukset[0].laji, 'kuvavinkki');
  assert.equal(ehdotukset[0].paikka, 'Ritavuoren muistolaatta, Helsinki');
  assert.equal(ehdotukset[0].tila, 'uusi', 'ei julkaisuautomatiikkaa — ihminen poimii');
  assert.equal(ehdotukset[0].kuvat.length, 1);
});

test('kuva on noudettavissa vain avaimella', async () => {
  const ampari = teeAmpari();
  const env = teeYmparisto(ampari);
  await kasittele(vinkki(KELPO, [teeKuva()]), env, apurit);
  const polku = [...ampari.sisalto.keys()].find((k) => k.endsWith('.jpg'));

  const ilman = await kasittele(
    new Request(`https://esimerkki.workers.dev/kohde/${encodeURIComponent(polku)}`), env, apurit,
  );
  assert.equal(ilman.status, 401);

  const avaimella = await kasittele(new Request(
    `https://esimerkki.workers.dev/kohde/${encodeURIComponent(polku)}?avain=${AVAIN}`,
  ), env, apurit);
  assert.equal(avaimella.status, 200);
});
