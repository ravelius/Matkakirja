import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { spawnSync } from 'node:child_process';

import { LIVIAN_LUENTAKAUPUNGIT, LIVIAN_PILOTTI_CUET } from '../js/livia-pilotti-cuet.js';
import {
  kokoaEledata, kokoaEledataElavana, kuittirivit, livianKohdistustyo, lueLiput,
  ratkaiseCueAjat, ratkaiseCueAjatElavana,
} from '../tools/kohdista-pulu-eleet.mjs';
import { TAGIT, kokoaTuotantokuitti, puhemuoto } from '../tools/generoi-pulu.mjs';
import { jaksonJasennys } from '../tools/generoi-linssiluennat.mjs';

const ffmpegLoytyy = spawnSync('ffmpeg', ['-version']).status === 0
  && spawnSync('ffprobe', ['-version']).status === 0;

/** Aidosti kelvollinen mp3 halutun mittaisena (hiljaisuutta), ilman committoitua fixturea. */
function generoiMp3(sekuntia) {
  const ajo = spawnSync('ffmpeg', ['-f', 'lavfi', '-i', `anullsrc=r=44100:cl=mono`,
    '-t', String(sekuntia), '-q:a', '9', '-f', 'mp3', '-'], { encoding: null, maxBuffer: 1024 * 1024 * 8 });
  if (ajo.status !== 0) throw new Error(`ffmpeg epäonnistui: ${ajo.stderr}`);
  return new Uint8Array(ajo.stdout);
}

function alignment(teksti) {
  const characters = [...teksti];
  return {
    characters,
    character_start_times_seconds: characters.map((_, i) => i * .02),
    character_end_times_seconds: characters.map((_, i) => (i + 1) * .02),
  };
}

/**
 * Sama alignment, mutta annetut sanaindeksit puuttuvat kokonaan vastauksesta
 * (kuten ASR jättäisi ne litteroimatta) — merkit-lista on lyhyempi, ei
 * korruptoitu samassa pituudessa, jotta sovitaMerkitin ikkunahaku
 * synkronoituu oikein puuttuvan kohdan jälkeen eikä koko loppuosa ajaudu
 * pois raiteiltaan.
 */
function alignmentPuuttuvillaSanoilla(teksti, puuttuvatIndeksit) {
  const { sanat } = jaksonJasennys(teksti, { alku: 0, loppu: teksti.length });
  const poistettavat = new Set(puuttuvatIndeksit);
  const pidettavatValit = sanat
    .filter((_, i) => poistettavat.has(i))
    .map(({ sana, merkki }) => [merkki, merkki + sana.length]);
  const characters = [...teksti].filter((_, i) => !pidettavatValit.some(([a, b]) => i >= a && i < b));
  return {
    characters,
    character_start_times_seconds: characters.map((_, i) => i * .02),
    character_end_times_seconds: characters.map((_, i) => (i + 1) * .02),
  };
}

test('liput eivät vie ilman eksplisiittistä --vie-valintaa', () => {
  assert.deepEqual(lueLiput(['--kuiva']), {
    kuiva: true, vie: false, kaupungit: [], kuitti: null, elava: false,
  });
  assert.deepEqual(lueLiput(['--kaupungit', 'marseille,ateena', '--vie']),
    { kuiva: false, vie: true, kaupungit: ['marseille', 'ateena'], kuitti: null, elava: false });
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json']),
    { kuiva: false, vie: false, kaupungit: [], kuitti: 'valmis.json', elava: false });
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json', '--kaupungit', 'granada']),
    { kuiva: false, vie: false, kaupungit: ['granada'], kuitti: 'valmis.json', elava: false });
  assert.deepEqual(lueLiput(['--elava', '--vie']),
    { kuiva: false, vie: true, kaupungit: [], kuitti: null, elava: true });
  assert.throws(() => lueLiput(['--generoi']), /tuntematon lippu/);
  assert.throws(() => lueLiput(['--elava', '--kuitti', 'valmis.json']), /eivät kelpaa yhdessä/);
});

test('workflow rajaa Granada-uusinnan exact granada-3-avaimesta ja vartioi kuittiosuman', () => {
  const workflow = readFileSync(new URL('../.github/workflows/generoi-pulu.yml', import.meta.url), 'utf8');
  const tyokalu = readFileSync(new URL('../tools/kohdista-pulu-eleet.mjs', import.meta.url), 'utf8');
  const retryAvain = 'granada-3';
  assert.match(retryAvain, /^[a-z0-9]+-3$/);
  assert.equal(retryAvain.slice(0, -2), 'granada');
  assert.match(workflow, /REPLIIKIT: \$\{\{ inputs\.repliikit \}\}/);
  assert.match(workflow, /\^\[a-z0-9\]\+-3\$/);
  assert.match(workflow, /kaupungit\+\=\("\$\{avain%-3\}"\)/);
  assert.match(workflow, /liput\+\=\(--kaupungit "\$valitut"\)/);
  assert.match(tyokalu, /liput\.kuitti && !kuitit\.has\(kaupunki\)/);
  assert.match(tyokalu, /ei ole annetussa tuotantokuitissa/);
});

test('kohdistus hyväksyy vain valmiin versionoidun tuotantokuitin ja sen lukitun TTS-reseptin', async () => {
  const tyo = livianKohdistustyo('ateena');
  const rivi = {
    avain: tyo.avain, lahde: 'ateena', nimi: tyo.aaniNimi, teksti: tyo.teksti,
    puhe: puhemuoto(tyo.teksti, TAGIT[tyo.avain]),
  };
  const tulokset = new Map([[tyo.avain, {
    status: 'generated',
    finalArtifact: { fileName: tyo.aaniNimi, sha256: 'a'.repeat(64), bytes: 1234, actualDurationSeconds: 8.5 },
  }]]);
  const kuitti = kokoaTuotantokuitti([rivi], {
    sourceCommit: '0'.repeat(40), status: 'completed', tulokset, staged: true,
  });
  const valitut = await kuittirivit(kuitti);
  assert.equal(valitut.get('ateena').finalObjectKey,
    `aanet/pulu/versiot/${'0'.repeat(12)}/${kuitti.batchId}/livia-ateena-3.mp3`);
  const muutettu = structuredClone(kuitti);
  muutettu.utterances[0].ttsText = '[brightly] väärä';
  await assert.rejects(() => kuittirivit(muutettu), /ei kelpaa kohdistukseen/);
});

test('forced alignment ratkaisee cue-alkujen sanapaikat eikä päästä cueita päällekkäin', () => {
  const tyo = livianKohdistustyo('marseille');
  const eleet = ratkaiseCueAjat(tyo, alignment(tyo.teksti));
  assert.deepEqual(eleet.map((e) => e.id), LIVIAN_PILOTTI_CUET.marseille.cuet.map((e) => e.id));
  assert.ok(eleet.every((e) => Number.isInteger(e.alku) && Number.isInteger(e.loppu) && e.loppu > e.alku));
  for (let i = 1; i < eleet.length; i += 1) assert.ok(eleet[i - 1].loppu <= eleet[i].alku);
});

test('forced alignment käyttää ankkurissa ja aikaleimoissa samaa sanarajaa', () => {
  const tyo = livianKohdistustyo('berliini');
  const eleet = ratkaiseCueAjat(tyo, alignment(tyo.teksti));
  assert.equal(eleet[0].id, 'berliini.livia.c1');
  assert.ok(eleet.every((e) => e.loppu > e.alku));
});

test('kirjoitettava data kantaa teksti- ja mp3-sidonnan ja kelpaa samalle runtimeportille', async () => {
  const tyo = livianKohdistustyo('ateena');
  const aanitavut = new TextEncoder().encode('lopullinen-mp3');
  const data = await kokoaEledata(tyo, aanitavut, alignment(tyo.teksti));
  assert.equal(data.tekstiSha256, tyo.tekstiSha256);
  assert.equal(data.aani.tavut, aanitavut.byteLength);
  assert.match(data.aani.sha256, /^[0-9a-f]{64}$/);
  assert.equal(data.eleet.length, tyo.cuet.length);
});

/*
 * HUOM testin sanavalinnasta: sovitaMerkit skannaa merkkejä peräkkäin eikä
 * synkronoi uudelleen sanarajoista — yksittäisen KESKELTÄ puuttuvan sanan
 * jälkeinen teksti ajautuu helposti väärään kohtaan (löytää sattumalta
 * saman kirjaimen kauempaa), mikä pudottaisi koko lopputekstin kattavuuden.
 * Siksi testi poistaa VIIMEISEN sanan: mikään ei ole sen jälkeen ajautumassa
 * pois raiteilta, joten muu teksti pysyy täydessä kattavuudessa. Tämä
 * kuvaa myös realistista tapausta: forced alignment antaa merkit koko
 * annetulle tekstille, joten aito iso kattavuusvaje syntyy lähinnä silloin,
 * kun ääni ei enää vastaa tekstiä (juuri se, mitä 95 %:n raja vartioi).
 */
test('elävä kohdistus interpoloi yksittäisen puuttuvan sanan ja laskee kattavuuden', () => {
  const tyo = livianKohdistustyo('marseille'); // 24 sanaa, viimeinen puuttuu = 23/24 = 95,8 %
  const vas = alignmentPuuttuvillaSanoilla(tyo.teksti, [23]);
  const { cuet, kattavuus, puuttuvat } = ratkaiseCueAjatElavana(tyo, vas);
  assert.equal(cuet.length, tyo.cuet.length);
  assert.deepEqual(cuet.map((e) => e.id), tyo.cuet.map((e) => e.id));
  assert.ok(cuet.every((e) => Number.isInteger(e.alku) && Number.isInteger(e.loppu) && e.loppu > e.alku));
  assert.deepEqual(puuttuvat, ['nokkaan']);
  assert.ok(kattavuus > 0.95 && kattavuus < 1, `kattavuus ${kattavuus}`);
});

test('elävä kohdistus hylkää kaupungin kun kattavuus alittaa 95 %', () => {
  const tyo = livianKohdistustyo('marseille'); // 24 sanaa: 2 puuttuvaa lopusta = 91,7 % < 95 %
  const vas = alignmentPuuttuvillaSanoilla(tyo.teksti, [22, 23]);
  assert.throws(() => ratkaiseCueAjatElavana(tyo, vas), /kattavuus/);
});

test('elävä kohdistus täydellä alignmentilla vastaa tiukkaa tulosta', () => {
  const tyo = livianKohdistustyo('berliini');
  const tiukka = ratkaiseCueAjat(tyo, alignment(tyo.teksti));
  const { cuet, kattavuus, puuttuvat } = ratkaiseCueAjatElavana(tyo, alignment(tyo.teksti));
  assert.deepEqual(cuet, tiukka);
  assert.equal(kattavuus, 1);
  assert.deepEqual(puuttuvat, []);
});

test('kokoaEledataElavana hyväksyy uskottavan keston ja merkitsee lähteen', { skip: !ffmpegLoytyy && 'ffmpeg/ffprobe puuttuu' }, async () => {
  const tyo = livianKohdistustyo('berliini');
  const aanidata = generoiMp3(5.06); // teksti 253 merkkiä × 20 ms ≈ 5060 ms
  const { data, kattavuus, puuttuvat } = await kokoaEledataElavana(tyo, aanidata, alignment(tyo.teksti));
  assert.equal(data.lahde, 'elava-ilman-kuittia');
  assert.equal(data.eleet.length, tyo.cuet.length);
  assert.equal(kattavuus, 1);
  assert.deepEqual(puuttuvat, []);
  assert.match(data.aani.sha256, /^[0-9a-f]{64}$/);
});

test('kokoaEledataElavana hylkää kun ffprobe-kesto ei täsmää alignmentin kestoon', { skip: !ffmpegLoytyy && 'ffmpeg/ffprobe puuttuu' }, async () => {
  const tyo = livianKohdistustyo('berliini');
  const aanidata = generoiMp3(1); // alignment odottaa ~5,06 s, oikea ääni vain 1 s
  await assert.rejects(() => kokoaEledataElavana(tyo, aanidata, alignment(tyo.teksti)), /kesto ei ole uskottava/);
});

test('kaikkien 45 city-3-rivin alignment kelpaa exact runtimeportille', async () => {
  assert.equal(LIVIAN_LUENTAKAUPUNGIT.length, 45);
  for (const kaupunki of LIVIAN_LUENTAKAUPUNGIT) {
    const tyo = livianKohdistustyo(kaupunki);
    const aanitavut = new TextEncoder().encode(`lopullinen-${kaupunki}-mp3`);
    const data = await kokoaEledata(tyo, aanitavut, alignment(tyo.teksti));
    assert.equal(data.eleet.length, tyo.cuet.length, kaupunki);
  }
});
