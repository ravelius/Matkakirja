import test from 'node:test';
import assert from 'node:assert/strict';

import { laskeSha256 } from '../js/luentareaktiot.js';
import { LIVIAN_PILOTTI_CUET } from '../js/livia-pilotti-cuet.js';
import {
  kytkeLivianPilottiEleet, livianEleidenOsoite, lataaLivianPilottiEleet,
  tarkistaLivianPilottiData,
} from '../js/livia-puheeleet-lataus.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';

const teksti = 'Marseillen saippuaa tehdään yhä. Lokit eivät tunne puhdasta pöytää. Minä erotan sataman jo äänestä ja suolasta höyhenissä.';
const aanitavut = new TextEncoder().encode('koe-mp3');

async function kelpoData() {
  const tyo = LIVIAN_PILOTTI_CUET.marseille;
  return {
    versio: 1, revision: 'eu-hl-pilot-20260912-r1', kaupunki: 'marseille', avain: 'marseille-3',
    teksti, tekstiSha256: tyo.tekstiSha256,
    aani: { nimi: tyo.aaniNimi, tavut: aanitavut.byteLength, sha256: await laskeSha256(aanitavut) },
    eleet: tyo.cuet.map((cue, i) => ({ ...cue, alku: i * 1000 + 100, loppu: i * 1000 + 900 })),
  };
}

test('eleosoite pysyy mp3:n vieressä ja säilyttää version', () => {
  assert.equal(livianEleidenOsoite('https://media/aanet/pulu/livia-marseille-3.mp3?v=f58cb5bc-4'),
    'https://media/aanet/pulu/livia-marseille-3.eleet.json?v=f58cb5bc-4');
  assert.equal(livianEleidenOsoite('https://media/tiedosto.ogg'), null);
});

test('validaattori vaatii kortin, näkyvän tekstin sekä mp3:n SHA:n ja tavut', async () => {
  const data = await kelpoData();
  const aani = { tavut: data.aani.tavut, sha256: data.aani.sha256 };
  assert.equal((await tarkistaLivianPilottiData(data, { kaupunki: 'marseille', teksti, aani })).ok, true);
  assert.equal((await tarkistaLivianPilottiData(data, { kaupunki: 'marseille', teksti: `${teksti}!`, aani })).ok, false);
  assert.equal((await tarkistaLivianPilottiData(data, { kaupunki: 'marseille', teksti,
    aani: { ...aani, tavut: aani.tavut + 1 } })).ok, false);
  assert.equal((await tarkistaLivianPilottiData({ ...data, eleet: data.eleet.map((c, i) => i ? c : { ...c, tarkoitus: 'ilo' }) },
  { kaupunki: 'marseille', teksti, aani })).ok, false);
  assert.equal((await tarkistaLivianPilottiData(data, { kaupunki: 'sofia', teksti, aani })).ok, false);
});

test('404, virheellinen JSON ja väärä mp3 jäävät hiljaisiksi', async (t) => {
  const alkuperainen = globalThis.fetch;
  t.after(() => { globalThis.fetch = alkuperainen; });
  globalThis.fetch = async () => new Response('', { status: 404 });
  assert.equal(await lataaLivianPilottiEleet('marseille', 'https://media/aanet/pulu/livia-marseille-3.mp3?v=404', { teksti }), null);
  globalThis.fetch = async (url) => String(url).includes('.eleet.json')
    ? new Response('{rikki', { status: 200 }) : new Response(aanitavut, { status: 200 });
  assert.equal(await lataaLivianPilottiEleet('marseille', 'https://media/aanet/pulu/livia-marseille-3.mp3?v=json', { teksti }), null);
  const data = await kelpoData();
  globalThis.fetch = async (url) => String(url).includes('.eleet.json')
    ? Response.json(data) : new Response(new TextEncoder().encode('eri-mp3'), { status: 200 });
  assert.equal(await lataaLivianPilottiEleet('marseille', 'https://media/aanet/pulu/livia-marseille-3.mp3?v=sha', { teksti }), null);
});

test('myöhässä valmistunut loader kytkee jo soivan audion nykyiseen cueen', async (t) => {
  const data = await kelpoData();
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async (url) => String(url).includes('.eleet.json')
    ? Response.json(data) : new Response(aanitavut, { status: 200 });
  t.after(() => { globalThis.fetch = alkuperainen; });
  const audio = new EventTarget();
  Object.assign(audio, { currentTime: .4, paused: false, ended: false, muted: false, volume: 1 });
  const tapahtumat = [];
  const off = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push([laji, tiedot]));
  t.after(off);
  const pura = await kytkeLivianPilottiEleet(audio, {
    kaupunki: 'marseille', kentta: 'kommentti', kupla: 0, teksti,
    aaniOsoite: 'https://media/aanet/pulu/livia-marseille-3.mp3?v=late',
  });
  t.after(pura);
  assert.deepEqual(tapahtumat.map(([laji, tiedot]) => [laji, tiedot.tunnus]),
    [['speechCue', 'marseille.livia.c1']]);
});
