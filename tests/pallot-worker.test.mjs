/*
 * Retkikunnan pallot näkyviin (worker/sahke/pallohuone.js + kasittelija.js /pallot; suunnitelma #4501, juna 185).
 *
 * Vartioidaan: vain oman retkikunnan jäsen pääsee huoneeseen (avain), viestistä ei välity mitään muuta kuin
 * rajatut numerot, rajoitin pudottaa tulvan, uusi tulija saa vain tuoreet tilat, sama jäsen ei näy kahdesti,
 * eikä lähettäjä saa omaa viestiään takaisin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  KISA_LAHTO_MS, PALLO_JASEN_OTSAKE, PALLO_TUOREUS_MS, PALLO_VIESTEJA_SEKUNNISSA, PalloHuone, rajoita, tarkistaKisa, tarkistaPaikka, tilannekuva,
} from '../worker/sahke/pallohuone.js';
import { avainTiiviste, kasittele } from '../worker/sahke/kasittelija.js';

const PELI = 'https://ravelius.github.io';
const OSOITE = 'https://esimerkki.workers.dev';

test('tarkistaPaikka: vain tunnetut numerokentät rajoissaan, lat/lon/alt pakollisia', () => {
  const ok = tarkistaPaikka(JSON.stringify({ lat: 48.8530001234, lon: 2.3499, alt: 152.345, suunta: 271.5, poltin: 0.4, n: 3 }));
  assert.deepEqual(ok.tila, { lat: 48.853, lon: 2.3499, alt: 152.35, suunta: 271.5, poltin: 0.4, n: 3 });
  for (const [viesti, syy] of [
    [JSON.stringify({ lat: 48, lon: 2 }), 'alt puuttuu'],
    [JSON.stringify({ lat: 91, lon: 2, alt: 0 }), 'lat rajojen ulkopuolella'],
    [JSON.stringify({ lat: 48, lon: 2, alt: 0, nimi: 'x' }), 'tuntematon kenttä nimi'],
    [JSON.stringify({ lat: 48, lon: 2, alt: 0, n: 1.5 }), 'n ei kokonaisluku'],
    [JSON.stringify({ lat: '48', lon: 2, alt: 0 }), 'lat rajojen ulkopuolella'],
    ['[1,2,3]', 'ei olio'],
    ['{', 'ei JSONia'],
    [JSON.stringify({ lat: 48, lon: 2, alt: 0, suunta: 1 }) + ' '.repeat(300), 'liian pitkä'],
  ]) assert.equal(tarkistaPaikka(viesti).virhe, syy, viesti.slice(0, 40));
  assert.equal(tarkistaPaikka(null).virhe, 'vain tekstiviestit');
});

test('rajoita: tokenikori päästää enintään 4/s ja täyttyy ajan myötä', () => {
  let kori = null; let sallittuja = 0;
  for (let i = 0; i < 10; i++) { const r = rajoita(kori, 1000); kori = r.kori; if (r.sallittu) sallittuja++; }
  assert.equal(sallittuja, PALLO_VIESTEJA_SEKUNNISSA, 'sama hetki: koko kori');
  assert.equal(rajoita(kori, 1100).sallittu, false, '0,1 s: 0,4 merkkiä');
  assert.equal(rajoita(kori, 1300).sallittu, true, '0,3 s: 1,2 merkkiä');
});

test('tilannekuva: vain muut ja vain tuoreet', () => {
  const nyt = 100000;
  const liitteet = [
    { j: 'itse', viim: { lat: 1, lon: 1, alt: 1, t: nyt } },
    { j: 'tuore', viim: { lat: 2, lon: 2, alt: 2, t: nyt - 1000 } },
    { j: 'vanha', viim: { lat: 3, lon: 3, alt: 3, t: nyt - PALLO_TUOREUS_MS - 1 } },
    { j: 'hiljainen', viim: null },
    null,
  ];
  assert.deepEqual(tilannekuva(liitteet, 'itse', nyt), [{ j: 'tuore', lat: 2, lon: 2, alt: 2, t: nyt - 1000 }]);
});

/** Valesocket: liite ja lähetetyt viestit muistissa. */
function teeSocket(j) {
  let liite = null;
  return {
    j, lahetetyt: [], suljettu: null,
    serializeAttachment(x) { liite = JSON.parse(JSON.stringify(x)); },
    deserializeAttachment() { return liite; },
    send(t) { this.lahetetyt.push(JSON.parse(t)); },
    close(koodi, syy) { this.suljettu = [koodi, syy]; },
  };
}

function teeHuone(socketit, nyt = () => 5000, tallennus = new Map()) {
  const ctx = {
    getWebSockets: (tagi) => socketit.filter((ws) => !tagi || ws.j === tagi),
    acceptWebSocket: () => {},
    storage: {
      get: async (k) => tallennus.get(k),
      put: async (k, v) => { tallennus.set(k, v); },
      list: async ({ prefix }) => new Map([...tallennus].filter(([k]) => k.startsWith(prefix))),
    },
  };
  return new PalloHuone(ctx, {}, { nyt });
}

test('huone: viesti välittyy muille siivottuna, ei lähettäjälle; virheellinen ja tulva pudotetaan', async () => {
  const a = teeSocket('A'); const b = teeSocket('B'); const c = teeSocket('C');
  for (const ws of [a, b, c]) ws.serializeAttachment({ j: ws.j, viim: null, kori: null });
  const huone = teeHuone([a, b, c]);
  await huone.webSocketMessage(a, JSON.stringify({ lat: 48.85, lon: 2.35, alt: 160, suunta: 90, poltin: 1, n: 2 }));
  assert.equal(a.lahetetyt.length, 0, 'ei omaa takaisin');
  assert.deepEqual(b.lahetetyt[0], { tyyppi: 'pallo', j: 'A', lat: 48.85, lon: 2.35, alt: 160, suunta: 90, poltin: 1, n: 2, t: 5000 });
  assert.equal(c.lahetetyt.length, 1);
  await huone.webSocketMessage(a, JSON.stringify({ lat: 48.85, lon: 2.35, alt: 160, viesti: 'hei' }));
  assert.equal(b.lahetetyt.length, 1, 'vapaa teksti ei välity');
  for (let i = 0; i < 10; i++) await huone.webSocketMessage(a, JSON.stringify({ lat: 48.85, lon: 2.35, alt: 160 }));
  // Kori 4/s: ensimmäinen, hylätty vapaa teksti (vie myös merkin) ja kaksi tulvasta → 3 välitettyä.
  assert.equal(b.lahetetyt.length, PALLO_VIESTEJA_SEKUNNISSA - 1, 'tulva rajoitettu, virheellinenkin kuluttaa koria');
  assert.equal(a.deserializeAttachment().viim.t, 5000, 'viimeisin tila liitteessä');
});

test('huone: poistuminen kerrotaan muille, mutta ei korvatusta yhteydestä', async () => {
  const a = teeSocket('A'); const b = teeSocket('B'); const a2 = teeSocket('A');
  for (const ws of [a, b, a2]) ws.serializeAttachment({ j: ws.j, viim: null, kori: null });
  await teeHuone([a, b, a2]).webSocketClose(a);
  assert.equal(b.lahetetyt.length, 0, 'A jatkaa uudella yhteydellä');
  await teeHuone([a2, b]).webSocketClose(a2);
  assert.deepEqual(b.lahetetyt[0], { tyyppi: 'pois', j: 'A' });
});

/* ---------- pallokisa (suunnitelma luku 7) ---------- */

test('tarkistaKisa: vain nouto, lähtö ja maali, tarkat kentät', () => {
  assert.deepEqual(tarkistaKisa({ tyyppi: 'nouto', pallo: 3, n: 2 }).kisa, { tyyppi: 'nouto', pallo: 3, n: 2 });
  assert.deepEqual(tarkistaKisa({ tyyppi: 'lahto' }).kisa, { tyyppi: 'lahto' });
  assert.deepEqual(tarkistaKisa({ tyyppi: 'maali', aika: 151.234 }).kisa, { tyyppi: 'maali', aika: 151.2 });
  for (const v of [{ tyyppi: 'nouto', pallo: -1, n: 1 }, { tyyppi: 'nouto', pallo: 1, n: 1, nimi: 'x' }, { tyyppi: 'nouto', pallo: 1.5, n: 1 },
    { tyyppi: 'maali', aika: -3 }, { tyyppi: 'lahto', t0: 1 }, { tyyppi: 'huuto' }]) assert.ok(tarkistaKisa(v).virhe, JSON.stringify(v));
});

test('kisa: nouto heti muille, sama pallo vain kerran; lähtö yhteinen ja harva; maali tallentaa parhaan', async () => {
  const a = teeSocket('A'); const b = teeSocket('B');
  for (const ws of [a, b]) ws.serializeAttachment({ j: ws.j, viim: null, kori: null, noudetut: [] });
  let nyt = 10000; const tallennus = new Map();
  const huone = teeHuone([a, b], () => nyt, tallennus);
  await huone.webSocketMessage(a, JSON.stringify({ tyyppi: 'nouto', pallo: 2, n: 1 }));
  assert.deepEqual(b.lahetetyt.at(-1), { tyyppi: 'nouto', j: 'A', pallo: 2, n: 1, t: 10000 });
  assert.equal(a.lahetetyt.length, 0, 'ei omaa takaisin');
  nyt += 300; await huone.webSocketMessage(a, JSON.stringify({ tyyppi: 'nouto', pallo: 2, n: 1 }));
  assert.equal(b.lahetetyt.length, 1, 'uudelleenlähetys ei laske kahdesti');
  nyt += 300; await huone.webSocketMessage(b, JSON.stringify({ tyyppi: 'lahto' }));
  for (const ws of [a, b]) assert.deepEqual(ws.lahetetyt.at(-1), { tyyppi: 'lahto', j: 'B', t0: nyt + KISA_LAHTO_MS, t: nyt });
  assert.deepEqual(a.deserializeAttachment().noudetut, [], 'uusi kisa nollaa kerätyt');
  const ennen = a.lahetetyt.length;
  nyt += 1000; await huone.webSocketMessage(a, JSON.stringify({ tyyppi: 'lahto' }));
  assert.equal(a.lahetetyt.length, ennen, 'toinen lähtö alle 30 s:ssa hylätään');
  nyt += 1000; await huone.webSocketMessage(a, JSON.stringify({ tyyppi: 'maali', aika: 180 }));
  nyt += 1000; await huone.webSocketMessage(b, JSON.stringify({ tyyppi: 'maali', aika: 150 }));
  nyt += 1000; await huone.webSocketMessage(a, JSON.stringify({ tyyppi: 'maali', aika: 200 }));
  assert.deepEqual(b.lahetetyt.at(-1).parhaat, [{ j: 'B', aika: 150 }, { j: 'A', aika: 180 }], 'paras säilyy, nopein ensin');
});

/* ---------- reitti /pallot (kasittelija.js) ---------- */

async function teeYmparisto() {
  const avain = 'a'.repeat(32);
  const jasen = { koodi: 'ABCDEF', jasenId: 'j'.repeat(12), avainTiiviste: await avainTiiviste(avain), nimimerkki: 'Utelias Ilves' };
  const varasto = { haeJasen: async (koodi, id) => (koodi === jasen.koodi && id === jasen.jasenId ? jasen : null) };
  const valitetyt = [];
  const PALLOT = {
    idFromName: (nimi) => ({ nimi }),
    get: (id) => ({ fetch: async (pyynto) => { valitetyt.push({ id: id.nimi, pyynto }); return new Response('huone', { status: 200 }); } }),
  };
  return { avain, jasen, varasto, valitetyt, env: { SAHKE_ORIGINIT: PELI, PALLOT } };
}

function pyynto(polku, { avain, upgrade = 'websocket', origin = PELI } = {}) {
  const h = { origin };
  if (upgrade) h.upgrade = upgrade;
  if (avain) h['x-sahke-avain'] = avain;
  return new Request(OSOITE + polku, { headers: h });
}

test('/pallot: oikeat tunnukset → huone "<koodi>:<kaupunki>", jäsen otsakkeessa, avain pois', async () => {
  const y = await teeYmparisto();
  const v = await kasittele(pyynto(`/pallot?koodi=abcdef&jasenId=${y.jasen.jasenId}&kaupunki=pariisi`, { avain: y.avain }), y.env, { varasto: y.varasto });
  assert.equal(v.status, 200);
  assert.equal(y.valitetyt.length, 1);
  assert.equal(y.valitetyt[0].id, 'ABCDEF:pariisi');
  assert.equal(y.valitetyt[0].pyynto.headers.get(PALLO_JASEN_OTSAKE), y.jasen.jasenId);
  assert.equal(y.valitetyt[0].pyynto.headers.get('x-sahke-avain'), null, 'avain ei kulje huoneeseen');
  assert.equal(y.valitetyt[0].pyynto.headers.get('upgrade'), 'websocket');
});

test('/pallot: väärä avain, vieras kaupunkitunnus, ei WebSocketia ja puuttuva sidos hylätään', async () => {
  const y = await teeYmparisto();
  const polku = (k = 'pariisi') => `/pallot?koodi=ABCDEF&jasenId=${y.jasen.jasenId}&kaupunki=${k}`;
  assert.equal((await kasittele(pyynto(polku(), { avain: 'b'.repeat(32) }), y.env, { varasto: y.varasto })).status, 401);
  assert.equal((await kasittele(pyynto(polku('../x'), { avain: y.avain }), y.env, { varasto: y.varasto })).status, 400);
  assert.equal((await kasittele(pyynto(polku(), { avain: y.avain, upgrade: null }), y.env, { varasto: y.varasto })).status, 426);
  assert.equal((await kasittele(pyynto(polku(), { avain: y.avain, origin: 'https://vieras.example' }), y.env, { varasto: y.varasto })).status, 403);
  const ilman = { ...y.env, PALLOT: undefined };
  assert.equal((await kasittele(pyynto(polku(), { avain: y.avain }), ilman, { varasto: y.varasto })).status, 503);
  assert.equal(y.valitetyt.length, 0, 'mikään hylätty ei päässyt huoneeseen');
});
