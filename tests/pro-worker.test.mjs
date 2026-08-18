/*
 * Pro-sisällöntuottajien reitit (worker/ehdotukset/pro.js).
 *
 * Sama tapa kuin ehdotuskanavalla: käsittelijä ajetaan Nodessa ilman
 * wrangleria ja R2 on muistivarasto. Testit vartioivat sitä, mikä
 * tässä palikassa on vaarallista mennä pieleen:
 *
 *   1. TODENNUS. Väärä koodi, väärä osoite ja avaimeton omistajareitti
 *      eivät saa avata mitään. Koodi on PYSYVÄ — sama osoite toisen
 *      kerran ei saa arpoa uutta, tai tuottajan sähköpostissa oleva
 *      koodi lakkaisi toimimasta.
 *   2. TILASIIRTYMÄT. kutsuttu → odottaa → julkaistu | hylatty, ja
 *      julkaistun profiilin muutos palaa aina jonoon.
 *   3. VUOTO. Julkinen tekijäsivu ei saa sisältää sähköpostia eikä
 *      koodia MISSÄÄN muodossa, eikä hyväksymätön profiili saa näkyä
 *      pelaajalle lainkaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kasittele } from '../worker/ehdotukset/kasittelija.js';
import {
  KOODIN_PITUUS, LINKKEJA_ENINTAAN, PRO_KUVAN_KATTO, PRO_TILAT,
  normalisoiKoodi, normalisoiSahkoposti, siivoaLinkki,
} from '../worker/ehdotukset/pro.js';

const PELI = 'https://ravelius.github.io';
const AVAIN = 'salainen-avain-123';
const POSTI = 'valokuvaaja@example.com';

/** Muistissa elävä R2-ämpäri: put, get, list ja delete. */
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
    async delete(avain) { sisalto.delete(avain); },
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

const json = (polku, metodi, runko) => new Request(`https://x.dev${polku}`, {
  method: metodi,
  headers: { 'content-type': 'application/json', origin: PELI },
  body: JSON.stringify(runko),
});

/** Lomakelähetys pelin originista (tuottajan reitit). */
function lomakePyynto(polku, kentat, { origin = PELI } = {}) {
  const lomake = new FormData();
  for (const [nimi, arvo] of Object.entries(kentat)) {
    if (Array.isArray(arvo)) for (const yksi of arvo) lomake.append(nimi, yksi);
    else lomake.append(nimi, arvo);
  }
  return new Request(`https://x.dev${polku}`, {
    method: 'POST',
    headers: origin ? { origin } : {},
    body: lomake,
  });
}

function teeKuva(nimi, tyyppi, tavuja = 64) {
  return new File([new Uint8Array(tavuja)], nimi, { type: tyyppi });
}

/** Luo tuottajan ja palauttaa { ymparisto, ampari, tuottaja }. */
async function teeTuottaja(nimi = 'Aino Valokuvaaja', posti = POSTI) {
  const ampari = teeAmpari();
  const ymparisto = teeYmparisto(ampari);
  const vastaus = await kasittele(
    json(`/pro-tuottaja?avain=${AVAIN}`, 'PUT', { sahkoposti: posti, nimi }), ymparisto,
  );
  const data = await vastaus.json();
  return { ampari, ymparisto, tuottaja: data.tuottaja };
}

/** Lähettää profiilin ja palauttaa vastauksen. */
function lahetaProfiili(ymparisto, tuottaja, muutokset = {}) {
  return kasittele(lomakePyynto('/pro-profiili', {
    sahkoposti: tuottaja.sahkoposti,
    koodi: tuottaja.koodi,
    esittely: 'Dokumenttivalokuvaaja Tampereelta, kuvannut satamia 20 vuotta.',
    linkit: ['https://www.esimerkki.fi/galleria'],
    ...muutokset,
  }), ymparisto);
}

/* ---------------------------------------------------------------- */
/* Apurit                                                            */
/* ---------------------------------------------------------------- */

test('sähköposti ja koodi normalisoituvat vertailukelpoisiksi', () => {
  assert.equal(normalisoiSahkoposti('  Aino@Esimerkki.FI '), 'aino@esimerkki.fi');
  assert.equal(normalisoiSahkoposti('ei-osoite'), '');
  assert.equal(normalisoiSahkoposti(''), '');
  // Tuottaja saa kirjoittaa koodin miten tahansa.
  assert.equal(normalisoiKoodi(' ab3d-ef4h '), 'AB3DEF4H');
  assert.equal(normalisoiKoodi(null), '');
});

test('linkki kelpaa vain http- tai https-osoitteena', () => {
  assert.deepEqual(siivoaLinkki('https://www.esimerkki.fi/kuvat'),
    { nimi: 'esimerkki.fi', url: 'https://www.esimerkki.fi/kuvat' });
  assert.equal(siivoaLinkki('javascript:alert(1)'), null);
  assert.equal(siivoaLinkki('mailto:aino@example.com'), null);
  assert.equal(siivoaLinkki('data:text/html,<b>'), null);
  assert.equal(siivoaLinkki('esimerkki.fi'), null, 'ilman skeemaa ei kelpaa');
  assert.equal(siivoaLinkki(''), null);
});

/* ---------------------------------------------------------------- */
/* Omistaja: tuottajan luonti ja lista                               */
/* ---------------------------------------------------------------- */

test('omistaja luo tuottajan ja saa pysyvän koodin', async () => {
  const { ymparisto, tuottaja, ampari } = await teeTuottaja();
  assert.equal(tuottaja.sahkoposti, POSTI);
  assert.equal(tuottaja.nimi, 'Aino Valokuvaaja');
  assert.equal(tuottaja.koodi.length, KOODIN_PITUUS);
  assert.match(tuottaja.koodi, /^[A-HJ-NP-Z2-9]{8}$/, 'sekoittuvat merkit pois');
  assert.match(tuottaja.tekijaId, /^[a-z0-9]{10}$/);
  assert.equal(tuottaja.tila, 'kutsuttu');
  assert.ok(PRO_TILAT.includes(tuottaja.tila));

  // Sähköposti on avaimessa vain tiivisteenä — ämpärin avainlistaus ei
  // saa olla osoiterekisteri.
  const avaimet = [...ampari.sisalto.keys()];
  assert.ok(avaimet.some((k) => k.startsWith('pro/tuottajat/')));
  assert.ok(!avaimet.some((k) => k.includes(POSTI)), 'osoite vuoti avaimeen');

  // Sama osoite toisen kerran EI arvo uutta koodia.
  const uudestaan = await kasittele(
    json(`/pro-tuottaja?avain=${AVAIN}`, 'PUT', { sahkoposti: POSTI, nimi: 'Aino V.' }),
    ymparisto,
  );
  const data = await uudestaan.json();
  assert.equal(data.uusi, false);
  assert.equal(data.tuottaja.koodi, tuottaja.koodi, 'koodin pitää olla pysyvä');
  assert.equal(data.tuottaja.tekijaId, tuottaja.tekijaId);
  assert.equal(data.tuottaja.nimi, 'Aino V.', 'nimen saa päivittää');
});

test('pro-reitit vaativat omistajan avaimen', async () => {
  const { ymparisto } = await teeTuottaja();
  for (const [polku, metodi] of [
    ['/pro-tuottaja', 'PUT'], ['/pro-lista', 'GET'], ['/pro-hyvaksy', 'PUT'],
  ]) {
    // eslint-disable-next-line no-await-in-loop
    const ilman = await kasittele(new Request(`https://x.dev${polku}`, { method: metodi }), ymparisto);
    assert.equal(ilman.status, 401, `${polku} avautui ilman avainta`);
    // eslint-disable-next-line no-await-in-loop
    const vaaralla = await kasittele(
      new Request(`https://x.dev${polku}?avain=huti`, { method: metodi }), ymparisto,
    );
    assert.equal(vaaralla.status, 401, `${polku} avautui väärällä avaimella`);
  }
});

test('kelvoton sähköposti ei luo tuottajaa', async () => {
  const ampari = teeAmpari();
  const vastaus = await kasittele(
    json(`/pro-tuottaja?avain=${AVAIN}`, 'PUT', { sahkoposti: 'roskaa' }), teeYmparisto(ampari),
  );
  assert.equal(vastaus.status, 400);
  assert.equal(ampari.sisalto.size, 0);
});

test('lista näyttää omistajalle tuottajat koodeineen', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await kasittele(json(`/pro-tuottaja?avain=${AVAIN}`, 'PUT',
    { sahkoposti: 'tutkija@example.com', nimi: 'Onni Tutkija' }), ymparisto);

  const vastaus = await kasittele(new Request(`https://x.dev/pro-lista?avain=${AVAIN}`), ymparisto);
  assert.equal(vastaus.status, 200);
  const { tuottajat } = await vastaus.json();
  assert.equal(tuottajat.length, 2);
  const aino = tuottajat.find((t) => t.sahkoposti === POSTI);
  assert.equal(aino.koodi, tuottaja.koodi);
  assert.equal(aino.tila, 'kutsuttu');
});

/* ---------------------------------------------------------------- */
/* Tuottaja: tarkistus ja profiili                                   */
/* ---------------------------------------------------------------- */

test('tarkistus hyväksyy oikean parin ja torjuu väärän', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();

  const oikein = await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: POSTI, koodi: tuottaja.koodi.toLowerCase() }),
    ymparisto,
  );
  assert.equal(oikein.status, 200);
  const data = await oikein.json();
  assert.equal(data.ok, true);
  assert.equal(data.nimi, 'Aino Valokuvaaja');
  assert.equal(data.tekijaId, tuottaja.tekijaId);
  assert.equal(data.tila, 'kutsuttu');
  assert.equal(data.profiili, null);
  // Koodi ei saa palata edes tuottajalle itselleen — se on hänellä jo.
  assert.ok(!JSON.stringify(data).includes(tuottaja.koodi));

  const vaaraKoodi = await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: POSTI, koodi: 'AAAAAAAA' }), ymparisto,
  );
  assert.equal(vaaraKoodi.status, 401);

  const vaaraPosti = await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: 'muu@example.com', koodi: tuottaja.koodi }),
    ymparisto,
  );
  assert.equal(vaaraPosti.status, 401);
});

test('tuottajan reitit vaativat sallitun originin', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  const vastaus = await kasittele(lomakePyynto('/pro-tarkista', {
    sahkoposti: POSTI, koodi: tuottaja.koodi,
  }, { origin: 'https://paha.example' }), ymparisto);
  assert.equal(vastaus.status, 403);
});

test('profiili tallentuu tilaan odottaa kuvineen ja linkkeineen', async () => {
  const { ymparisto, ampari, tuottaja } = await teeTuottaja();
  const vastaus = await lahetaProfiili(ymparisto, tuottaja, {
    linkit: ['https://www.esimerkki.fi/galleria', 'http://blogi.example.org'],
    kuva: teeKuva('minä.jpg', 'image/jpeg'),
  });
  assert.equal(vastaus.status, 200);
  const data = await vastaus.json();
  assert.equal(data.tila, 'odottaa');
  assert.match(data.viesti, /odottaa julkaisua/);

  const tarkistus = await (await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: POSTI, koodi: tuottaja.koodi }), ymparisto,
  )).json();
  assert.equal(tarkistus.tila, 'odottaa');
  assert.equal(tarkistus.profiili.kuva, true);
  assert.deepEqual(tarkistus.profiili.linkit.map((l) => l.nimi),
    ['esimerkki.fi', 'blogi.example.org']);
  assert.ok(ampari.sisalto.has(`pro/kuvat/${tuottaja.tekijaId}.jpg`), 'kuva jäi tallentumatta');
});

test('profiili torjuu tyhjän esittelyn, liian monta linkkiä ja kelvottoman linkin', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();

  const tyhja = await lahetaProfiili(ymparisto, tuottaja, { esittely: '   ' });
  assert.equal(tyhja.status, 400);

  const liikaa = await lahetaProfiili(ymparisto, tuottaja, {
    linkit: Array.from({ length: LINKKEJA_ENINTAAN + 1 }, (_, i) => `https://e${i}.example`),
  });
  assert.equal(liikaa.status, 400);

  const paha = await lahetaProfiili(ymparisto, tuottaja, {
    linkit: ['javascript:alert(1)'],
  });
  assert.equal(paha.status, 400);
});

test('profiilin kuva: vain yksi, oikea tyyppi ja alle 4 Mt', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();

  const vaaraTyyppi = await lahetaProfiili(ymparisto, tuottaja, {
    kuva: teeKuva('a.gif', 'image/gif'),
  });
  assert.equal(vaaraTyyppi.status, 415);

  const iso = await lahetaProfiili(ymparisto, tuottaja, {
    kuva: teeKuva('a.jpg', 'image/jpeg', PRO_KUVAN_KATTO + 1),
  });
  assert.equal(iso.status, 413);

  const kaksi = await lahetaProfiili(ymparisto, tuottaja, {
    kuva: [teeKuva('a.jpg', 'image/jpeg'), teeKuva('b.jpg', 'image/jpeg')],
  });
  assert.equal(kaksi.status, 400);
});

test('väärä koodi ei saa muuttaa toisen profiilia', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  const vastaus = await kasittele(lomakePyynto('/pro-profiili', {
    sahkoposti: POSTI, koodi: 'ZZZZZZZZ', esittely: 'Vieras',
  }), ymparisto);
  assert.equal(vastaus.status, 401);
  const tarkistus = await (await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: POSTI, koodi: tuottaja.koodi }), ymparisto,
  )).json();
  assert.equal(tarkistus.tila, 'kutsuttu', 'tila muuttui ilman oikeaa koodia');
});

/* ---------------------------------------------------------------- */
/* Tilasiirtymät ja julkinen luku                                    */
/* ---------------------------------------------------------------- */

test('julkaisematonta profiilia ei näy pelaajalle', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await lahetaProfiili(ymparisto, tuottaja);
  const vastaus = await kasittele(
    new Request(`https://x.dev/tekija/${tuottaja.tekijaId}`, { headers: { origin: PELI } }),
    ymparisto,
  );
  assert.equal(vastaus.status, 404, 'odottava profiili vuoti peliin');
});

test('hyväksyntä julkaisee tekijäsivun ilman sähköpostia ja koodia', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await lahetaProfiili(ymparisto, tuottaja, { kuva: teeKuva('minä.jpg', 'image/jpeg') });

  const paatos = await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT', {
    sahkoposti: POSTI, tila: 'julkaistu', kommentti: 'Hieno esittely.',
  }), ymparisto);
  assert.equal(paatos.status, 200);
  assert.equal((await paatos.json()).tuottaja.tila, 'julkaistu');

  const vastaus = await kasittele(
    new Request(`https://x.dev/tekija/${tuottaja.tekijaId}`, { headers: { origin: PELI } }),
    ymparisto,
  );
  assert.equal(vastaus.status, 200);
  const teksti = await vastaus.text();
  assert.ok(!teksti.includes(POSTI), 'sähköposti vuoti julkiseen tekijäsivuun');
  assert.ok(!teksti.includes(tuottaja.koodi), 'koodi vuoti julkiseen tekijäsivuun');
  const { tekija } = JSON.parse(teksti);
  assert.equal(tekija.id, tuottaja.tekijaId);
  assert.equal(tekija.nimi, 'Aino Valokuvaaja');
  assert.match(tekija.esittely, /Dokumenttivalokuvaaja/);
  assert.deepEqual(tekija.linkit.map((l) => l.url), ['https://www.esimerkki.fi/galleria']);
  assert.equal(tekija.kuva, `/tekija/${tuottaja.tekijaId}/kuva`);
  assert.equal(Object.keys(tekija).sort().join(','), 'esittely,id,julkaistu,kuva,linkit,nimi');

  const kuva = await kasittele(
    new Request(`https://x.dev/tekija/${tuottaja.tekijaId}/kuva`, { headers: { origin: PELI } }),
    ymparisto,
  );
  assert.equal(kuva.status, 200);
  assert.equal(kuva.headers.get('content-type'), 'image/jpeg');
});

test('hylkäys poistaa aiemmin julkaistun tekijäsivun', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await lahetaProfiili(ymparisto, tuottaja);
  await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: POSTI, tila: 'julkaistu' }), ymparisto);
  await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: POSTI, tila: 'hylatty', kommentti: 'Linkki ei toimi.' }), ymparisto);

  const vastaus = await kasittele(
    new Request(`https://x.dev/tekija/${tuottaja.tekijaId}`, { headers: { origin: PELI } }),
    ymparisto,
  );
  assert.equal(vastaus.status, 404);
  const tarkistus = await (await kasittele(
    json('/pro-tarkista', 'POST', { sahkoposti: POSTI, koodi: tuottaja.koodi }), ymparisto,
  )).json();
  assert.equal(tarkistus.tila, 'hylatty');
  assert.equal(tarkistus.kommentti, 'Linkki ei toimi.');
});

test('julkaistun profiilin muutos palaa jonoon eikä näy heti pelissä', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await lahetaProfiili(ymparisto, tuottaja);
  await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: POSTI, tila: 'julkaistu' }), ymparisto);

  await lahetaProfiili(ymparisto, tuottaja, { esittely: 'Uusi teksti ilman tarkistusta.' });
  const vastaus = await kasittele(
    new Request(`https://x.dev/tekija/${tuottaja.tekijaId}`, { headers: { origin: PELI } }),
    ymparisto,
  );
  assert.equal(vastaus.status, 404, 'muokattu profiili näkyi ilman uutta hyväksyntää');
});

test('tuntematon tila ja profiiliton tuottaja torjutaan hyväksynnässä', async () => {
  const { ymparisto } = await teeTuottaja();
  const vaaraTila = await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: POSTI, tila: 'kutsuttu' }), ymparisto);
  assert.equal(vaaraTila.status, 400);

  const eiProfiilia = await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: POSTI, tila: 'julkaistu' }), ymparisto);
  assert.equal(eiProfiilia.status, 409);

  const eiOle = await kasittele(json(`/pro-hyvaksy?avain=${AVAIN}`, 'PUT',
    { sahkoposti: 'tuntematon@example.com', tila: 'julkaistu' }), ymparisto);
  assert.equal(eiOle.status, 404);
});

test('tuntematon tekijätunnus ja kelvoton muoto eivät kaada workeria', async () => {
  const { ymparisto } = await teeTuottaja();
  const eiOle = await kasittele(new Request('https://x.dev/tekija/abcdefghij'), ymparisto);
  assert.equal(eiOle.status, 404);
  const roska = await kasittele(new Request('https://x.dev/tekija/..%2Fpro%2Ftuottajat'), ymparisto);
  assert.equal(roska.status, 400);
});

test('omistaja näkee odottavan profiilin kuvan avaimella, muut eivät', async () => {
  const { ymparisto, tuottaja } = await teeTuottaja();
  await lahetaProfiili(ymparisto, tuottaja, { kuva: teeKuva('minä.png', 'image/png') });

  const ilman = await kasittele(
    new Request(`https://x.dev/pro-kuva/${tuottaja.tekijaId}`), ymparisto,
  );
  assert.equal(ilman.status, 401);

  const kanssa = await kasittele(
    new Request(`https://x.dev/pro-kuva/${tuottaja.tekijaId}?avain=${AVAIN}`), ymparisto,
  );
  assert.equal(kanssa.status, 200);
  assert.equal(kanssa.headers.get('content-type'), 'image/png');
});
