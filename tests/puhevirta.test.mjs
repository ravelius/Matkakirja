/*
 * PROGRESSIIVINEN PUHE (js/puhevirta.js): kehysjäsennin ja virtadekooderi.
 *
 * Testi rakentaa synteettisen MPEG-2 Layer III -virran (xAI:n muoto:
 * 24 kHz, 128 kbit/s, 384 tavun kehykset) ja kirjoittaa jokaiseen
 * kehykseen sen järjestysnumeron. Valedekooderi "dekoodaa" kehyksen 576
 * näytteeksi, joiden arvo on kehyksen numero — silloin soitettavista
 * osista näkee suoraan, puuttuuko tai toistuuko jokin kehys saumassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MP3_ESIRULLA, MP3_JALKIRULLA, VIRTAPORTAAT, id3Pituus, luoMp3Virta, mp3Kehykset,
} from '../js/puhevirta.js';

const KEHYS = 384;
const NAYTTEITA = 576;

function virta(kehyksia, { id3 = 0 } = {}) {
  const t = new Uint8Array(id3 + kehyksia * KEHYS);
  if (id3) {
    t.set([0x49, 0x44, 0x33, 4, 0, 0, 0, 0, 0, id3 - 10]);
  }
  for (let k = 0; k < kehyksia; k += 1) {
    const o = id3 + k * KEHYS;
    t.set([0xff, 0xf3, 0xc4, 0xc4], o);
    t[o + 4] = k >> 8;
    t[o + 5] = k & 0xff;
  }
  return t;
}

/** Valedekooderi: jokainen kehys → 576 näytettä, arvona kehyksen numero. */
async function dekoodaa(puskuri) {
  const t = new Uint8Array(puskuri);
  const { kehykset } = mp3Kehykset(t);
  const data = new Float32Array(kehykset.length * NAYTTEITA);
  kehykset.forEach((k, i) => data.fill((t[k.alku + 4] << 8) | t[k.alku + 5], i * NAYTTEITA, (i + 1) * NAYTTEITA));
  return { sampleRate: 24000, length: data.length, getChannelData: () => data };
}

async function aja(t, palat) {
  const kuullut = [];
  const v = luoMp3Virta({
    dekoodaa,
    osa: (p, alku, pituus) => kuullut.push(...p.getChannelData(0).subarray(alku, alku + pituus)),
  });
  let i = 0;
  for (const koko of palat) {
    v.lisaa(t.subarray(i, i + koko));
    i += koko;
  }
  v.lisaa(t.subarray(i));
  await v.loppu();
  return kuullut;
}

function odotettu(kehyksia) {
  const out = [];
  for (let k = 0; k < kehyksia; k += 1) for (let j = 0; j < NAYTTEITA; j += 1) out.push(k);
  return out;
}

test('kehysjäsennin: MPEG-2 Layer III 24 kHz, 384 tavua, vajaa kehys jää odottamaan', () => {
  const t = virta(5);
  const { kehykset, seuraava } = mp3Kehykset(t, 0, t.length - 100);
  assert.equal(kehykset.length, 4);
  assert.equal(seuraava, 4 * KEHYS);
  assert.deepEqual(kehykset[0], { alku: 0, pituus: KEHYS, naytteita: NAYTTEITA, taajuus: 24000 });
  assert.equal(id3Pituus(virta(1, { id3: 40 })), 40);
  assert.equal(id3Pituus(t), 0);
});

test('virta: jokainen kehys kuuluu kerran oikeassa järjestyksessä, paloittelusta riippumatta', async () => {
  const t = virta(300);
  for (const palat of [[t.length], [1000, 1000, 5000], Array(200).fill(97), [10, 10, 10, 20000]]) {
    const kuullut = await aja(t, palat);
    assert.equal(kuullut.length, 300 * NAYTTEITA, `palat ${palat.slice(0, 4)}`);
    assert.deepEqual(kuullut, odotettu(300));
  }
});

test('virta: ensimmäinen osa tulee kun portaan verran kehyksiä + jälkirulla on saapunut', async () => {
  const t = virta(100);
  const osat = [];
  const v = luoMp3Virta({ dekoodaa, osa: (p, alku, pituus) => osat.push(pituus) });
  v.lisaa(t.subarray(0, (VIRTAPORTAAT[0] + MP3_JALKIRULLA) * KEHYS - 1));
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(osat.length, 0, 'yksi tavu puuttuu vielä');
  v.lisaa(t.subarray((VIRTAPORTAAT[0] + MP3_JALKIRULLA) * KEHYS - 1, (VIRTAPORTAAT[0] + MP3_JALKIRULLA) * KEHYS));
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(osat[0], VIRTAPORTAAT[0] * NAYTTEITA);
  v.lisaa(t.subarray((VIRTAPORTAAT[0] + MP3_JALKIRULLA) * KEHYS));
  await v.loppu();
  assert.equal(osat.reduce((s, n) => s + n, 0), 100 * NAYTTEITA);
  assert.equal(MP3_ESIRULLA, 3);
});

test('virta: ID3-otsake ohitetaan, tuntematon muoto ja kokonaan-tila dekoodataan yhtenä', async () => {
  const t = virta(40, { id3: 30 });
  assert.deepEqual(await aja(t, [500, 700]), odotettu(40));
  // Tuntematon muoto: ei kehyksiä → koko virta yhdellä kutsulla.
  let kutsuja = 0;
  const v = luoMp3Virta({
    dekoodaa: async (b) => { kutsuja += 1; return { sampleRate: 24000, length: b.byteLength, getChannelData: () => new Float32Array(b.byteLength) }; },
    osa: () => {},
  });
  v.lisaa(new Uint8Array(5000).fill(7));
  await v.loppu();
  assert.equal(kutsuja, 1);
  const kokonaan = [];
  const k = luoMp3Virta({ dekoodaa, kokonaan: true, osa: (p, alku, pituus) => kokonaan.push(pituus) });
  k.lisaa(virta(50));
  await k.loppu();
  assert.deepEqual(kokonaan, [50 * NAYTTEITA]);
});

test('virta: pettänyt segmentti ei hukkaa ääntä — loput dekoodataan yhtenä', async () => {
  const t = virta(120);
  let n = 0;
  const kuullut = [];
  const v = luoMp3Virta({
    dekoodaa: async (b) => { n += 1; if (n === 3) throw new Error('rikki'); return dekoodaa(b); },
    osa: (p, alku, pituus) => kuullut.push(...p.getChannelData(0).subarray(alku, alku + pituus)),
  });
  v.lisaa(t);
  await v.loppu();
  assert.deepEqual(kuullut, odotettu(120));
});
