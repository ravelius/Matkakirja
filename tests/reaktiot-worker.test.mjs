/*
 * REAKTIOLASKURIT WORKERISSA (worker/ehdotukset/reaktiot.js).
 *
 * Laskurit ovat julkisia lukuja, joita kuka tahansa pelin originista
 * voi kasvattaa. Testit vartioivat sitä, mikä siinä on vaarallista
 * mennä pieleen:
 *
 *   - avoin origin (kuka tahansa täyttäisi laskurit)
 *   - avaimeton pääsy omistajan listaan tai korjausmerkintään
 *   - äänen vaihto, joka kasvattaisi summaa sen sijaan että siirtäisi
 *   - miinukselle valuva laskuri, kun selainmuisti on tyhjennetty
 *   - kohdeavain, joka karkaa oman etuliitteensä ulkopuolelle
 *
 * Ämpäri on sama muistivarasto kuin ehdotustesteissä, mutta se osaa
 * lisäksi etagin ja onlyIf-ehdon: juuri ehdollinen kirjoitus estää
 * kahta yhtaikaista ääntä ylikirjoittamasta toisiaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kasittele } from '../worker/ehdotukset/kasittelija.js';
import {
  REAKTIO_ETULIITE, REAKTIO_SYMBOLIT, kohteenPolku, polunKohde,
} from '../worker/ehdotukset/reaktiot.js';

const PELI = 'https://ravelius.github.io';
const AVAIN = 'salainen-avain-123';

/** Muistissa elävä R2-ämpäri etagilla ja onlyIf-ehdolla. */
function teeAmpari() {
  const sisalto = new Map();
  let juokseva = 0;
  return {
    sisalto,
    async put(avain, arvo, asetukset = {}) {
      const vanha = sisalto.get(avain) ?? null;
      const ehto = asetukset.onlyIf;
      if (ehto?.etagMatches && vanha?.etag !== ehto.etagMatches) return null;
      if (ehto?.etagDoesNotMatch === '*' && vanha) return null;
      juokseva += 1;
      const tavut = typeof arvo === 'string' ? new TextEncoder().encode(arvo).buffer : arvo;
      sisalto.set(avain, { tavut, etag: `e${juokseva}` });
      return { etag: `e${juokseva}` };
    },
    async get(avain) {
      const kohde = sisalto.get(avain);
      if (!kohde) return null;
      return {
        etag: kohde.etag,
        httpMetadata: {},
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

/** Yksi ääni pelin originista. */
function aani(kohde, symboli, edellinen = null, { origin = PELI, otsikko = '' } = {}) {
  return new Request('https://esimerkki.workers.dev/reaktio', {
    method: 'POST',
    headers: { ...(origin ? { origin } : {}), 'content-type': 'application/json' },
    body: JSON.stringify({ kohde, symboli, edellinen, otsikko }),
  });
}

/** Laskurien haku pelin originista. */
function haku(kohteet, { origin = PELI } = {}) {
  const kysely = kohteet.map((k) => encodeURIComponent(k)).join(',');
  return new Request(`https://esimerkki.workers.dev/reaktiot?kohteet=${kysely}`,
    { headers: origin ? { origin } : {} });
}

/* ------------------------------------------------------------------ *
 * Kohdeavain
 * ------------------------------------------------------------------ */

test('kohdeavain koodataan käännettävästi oman etuliitteen alle', () => {
  const polku = kohteenPolku('juttu:lontoo:Tower Bridge');
  assert.ok(polku.startsWith(REAKTIO_ETULIITE));
  assert.ok(!polku.slice(REAKTIO_ETULIITE.length).includes('/'), polku);
  assert.equal(polunKohde(polku), 'juttu:lontoo:Tower Bridge');
});

test('kohdeavain ei pääse kiipeämään ämpärissä ylöspäin', () => {
  // Kauttaviivat koodautuvat, joten polku on yksi litteä nimi oman
  // etuliitteen alla eikä osoita ehdotusten metatiedostoihin.
  const polku = kohteenPolku('../ehdotukset/2026-01-01-abc/meta.json');
  assert.ok(polku.startsWith(REAKTIO_ETULIITE));
  assert.ok(!polku.slice(REAKTIO_ETULIITE.length).includes('/'), polku);
  assert.ok(!polku.includes('ehdotukset/'), polku);
});

test('tyhjä, liian pitkä tai ohjausmerkkejä sisältävä kohde hylätään', () => {
  assert.equal(kohteenPolku(''), null);
  assert.equal(kohteenPolku('x'.repeat(400)), null);
  assert.equal(kohteenPolku('kohde:\u0000delfoi'), null);
});

/* ------------------------------------------------------------------ *
 * Portit
 * ------------------------------------------------------------------ */

test('vieras origin ei saa äänestää eikä lukea laskureita', async () => {
  const env = teeYmparisto();
  const paha = 'https://muusivusto.example';
  assert.equal((await kasittele(aani('kohde:delfoi', 'hieno', null, { origin: paha }), env)).status,
    403);
  assert.equal((await kasittele(haku(['kohde:delfoi'], { origin: paha }), env)).status, 403);
});

test('omistajan listaus ja korjausmerkintä vaativat avaimen', async () => {
  const env = teeYmparisto();
  const lista = new Request('https://esimerkki.workers.dev/reaktio-lista');
  assert.equal((await kasittele(lista, env)).status, 401);
  const korjaus = new Request('https://esimerkki.workers.dev/reaktio-korjattu?avain=vaara', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kohde: 'kohde:delfoi' }),
  });
  assert.equal((await kasittele(korjaus, env)).status, 401);
});

test('väärä metodi torjutaan omalla koodillaan', async () => {
  const env = teeYmparisto();
  const vaara = new Request('https://esimerkki.workers.dev/reaktiot', {
    method: 'POST', headers: { origin: PELI },
  });
  assert.equal((await kasittele(vaara, env)).status, 405);
});

/* ------------------------------------------------------------------ *
 * Äänestys
 * ------------------------------------------------------------------ */

test('ääni kasvattaa laskuria ja näkyy haussa', async () => {
  const env = teeYmparisto();
  const vastaus = await kasittele(aani('kohde:delfoi', 'ihana', null, { otsikko: 'Delfoi' }), env);
  assert.equal(vastaus.status, 200);
  assert.equal((await vastaus.json()).aanet.ihana, 1);

  const haettu = await (await kasittele(haku(['kohde:delfoi']), env)).json();
  assert.equal(haettu.reaktiot['kohde:delfoi'].ihana, 1);
  // Tuntematon kohde on nollarivistö eikä 404: peli piirtää napin joka
  // tapauksessa.
  const tyhja = await (await kasittele(haku(['kohde:ei-ketaan']), env)).json();
  assert.equal(tyhja.reaktiot['kohde:ei-ketaan'].hieno, 0);
});

test('äänen vaihto siirtää eikä kasvata summaa', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'ihana'), env);
  const vastaus = await kasittele(aani('kohde:delfoi', 'hieno', 'ihana'), env);
  const { aanet } = await vastaus.json();
  assert.equal(aanet.ihana, 0);
  assert.equal(aanet.hieno, 1);
  const summa = REAKTIO_SYMBOLIT.reduce((n, s) => n + aanet[s], 0);
  assert.equal(summa, 1);
});

test('peruminen vähentää, eikä laskuri valu miinukselle', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'hieno'), env);
  const peru = await (await kasittele(aani('kohde:delfoi', null, 'hieno'), env)).json();
  assert.equal(peru.aanet.hieno, 0);
  // Tyhjennetty selainmuisti voi lähettää vähennyksen, jota ei ole:
  // laskuri jää nollaan eikä mene negatiiviseksi.
  const liikaa = await (await kasittele(aani('kohde:delfoi', null, 'hieno'), env)).json();
  assert.equal(liikaa.aanet.hieno, 0);
});

test('sama ääni uudestaan ei kasvata laskuria', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'tylsa'), env);
  const uudestaan = await (await kasittele(aani('kohde:delfoi', 'tylsa', 'tylsa'), env)).json();
  assert.equal(uudestaan.aanet.tylsa, 1);
});

test('tuntematon symboli hylätään eikä jätä jälkeä', async () => {
  const env = teeYmparisto();
  const vastaus = await kasittele(aani('kohde:delfoi', 'peukku'), env);
  assert.equal(vastaus.status, 400);
  assert.equal(env.EHDOTUKSET.sisalto.size, 0);
});

/* ------------------------------------------------------------------ *
 * Omistajan näkymä ja korjaus
 * ------------------------------------------------------------------ */

test('listaus näyttää tahralliset ensin eikä äänettömiä lainkaan', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:a', 'hieno'), env);
  await kasittele(aani('kohde:a', 'hieno'), env);
  await kasittele(aani('kohde:b', 'virhe'), env);
  // Äänetön kohde syntyy ja katoaa: se ei kuulu omistajan listaan.
  await kasittele(aani('kohde:c', 'hieno'), env);
  await kasittele(aani('kohde:c', null, 'hieno'), env);

  const lista = new Request(`https://esimerkki.workers.dev/reaktio-lista?avain=${AVAIN}`);
  const { kohteet } = await (await kasittele(lista, env)).json();
  assert.deepEqual(kohteet.map((k) => k.kohde), ['kohde:b', 'kohde:a']);
  assert.equal(kohteet[1].yhteensa, 2);
});

test('korjatuksi merkitseminen nollaa tahran mutta säästää muut äänet', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'hieno'), env);
  await kasittele(aani('kohde:delfoi', 'virhe'), env);
  await kasittele(aani('kohde:delfoi', 'virhe'), env);

  const korjaus = new Request(`https://esimerkki.workers.dev/reaktio-korjattu?avain=${AVAIN}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kohde: 'kohde:delfoi' }),
  });
  const tulos = await (await kasittele(korjaus, env)).json();
  assert.equal(tulos.kohde.aanet.virhe, 0);
  assert.equal(tulos.kohde.aanet.hieno, 1);
  assert.ok(tulos.kohde.korjattu);

  // Ja pelaajan näkymässä tahra on poissa.
  const haettu = await (await kasittele(haku(['kohde:delfoi']), env)).json();
  assert.equal(haettu.reaktiot['kohde:delfoi'].virhe, 0);
});

test('uusi tahra korjatun jälkeen poistaa korjausmerkinnän', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'virhe'), env);
  const korjaus = new Request(`https://esimerkki.workers.dev/reaktio-korjattu?avain=${AVAIN}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kohde: 'kohde:delfoi' }),
  });
  await kasittele(korjaus, env);
  await kasittele(aani('kohde:delfoi', 'virhe'), env);

  const lista = new Request(`https://esimerkki.workers.dev/reaktio-lista?avain=${AVAIN}`);
  const { kohteet } = await (await kasittele(lista, env)).json();
  assert.equal(kohteet[0].aanet.virhe, 1);
  assert.equal(kohteet[0].korjattu, '');
});

test('tuntemattoman kohteen korjaus on 404 eikä hiljainen onnistuminen', async () => {
  const env = teeYmparisto();
  const korjaus = new Request(`https://esimerkki.workers.dev/reaktio-korjattu?avain=${AVAIN}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kohde: 'kohde:ei-ketaan' }),
  });
  assert.equal((await kasittele(korjaus, env)).status, 404);
});

/* ------------------------------------------------------------------ *
 * Ehdollinen kirjoitus
 * ------------------------------------------------------------------ */

test('yhtaikaiset äänet eivät ylikirjoita toisiaan', async () => {
  const env = teeYmparisto();
  // Kymmenen ääntä rinnakkain samaan kohteeseen: ehdollinen kirjoitus
  // pakottaa ne jonoon, eikä yksikään katoa.
  await Promise.all(Array.from({ length: 10 },
    () => kasittele(aani('kohde:ruuhka', 'hieno'), env)));
  const haettu = await (await kasittele(haku(['kohde:ruuhka']), env)).json();
  assert.equal(haettu.reaktiot['kohde:ruuhka'].hieno, 10);
});

test('reaktiot eivät sekoitu ehdotuksiin samassa ämpärissä', async () => {
  const env = teeYmparisto();
  await kasittele(aani('kohde:delfoi', 'hieno'), env);
  for (const avain of env.EHDOTUKSET.sisalto.keys()) {
    assert.ok(avain.startsWith(REAKTIO_ETULIITE), avain);
  }
});
