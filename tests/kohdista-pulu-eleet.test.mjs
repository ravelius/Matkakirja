import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { LIVIAN_LUENTAKAUPUNGIT, LIVIAN_PILOTTI_CUET } from '../js/livia-pilotti-cuet.js';
import {
  kelpaaJalkikasittely, kelpaaKuittiresepti, kelpaaSointiresepti, kokoaEledata, kuitinEraTasmaa,
  kuittirivit, livianKohdistustyo, lueLiput, ratkaiseCueAjat,
} from '../tools/kohdista-pulu-eleet.mjs';
import { TAGIT, kokoaTuotantokuitti, puhemuoto } from '../tools/generoi-pulu.mjs';

function alignment(teksti) {
  const characters = [...teksti];
  return {
    characters,
    character_start_times_seconds: characters.map((_, i) => i * .02),
    character_end_times_seconds: characters.map((_, i) => (i + 1) * .02),
  };
}

test('liput eivät vie ilman eksplisiittistä --vie-valintaa', () => {
  assert.deepEqual(lueLiput(['--kuiva']), { kuiva: true, vie: false, kaupungit: [], kuitti: null });
  assert.deepEqual(lueLiput(['--kaupungit', 'marseille,ateena', '--vie']),
    { kuiva: false, vie: true, kaupungit: ['marseille', 'ateena'], kuitti: null });
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json']),
    { kuiva: false, vie: false, kaupungit: [], kuitti: 'valmis.json' });
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json', '--kaupungit', 'granada']),
    { kuiva: false, vie: false, kaupungit: ['granada'], kuitti: 'valmis.json' });
  assert.throws(() => lueLiput(['--generoi']), /tuntematon lippu/);
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
    rawArtifact: {
      fileName: `raaka-${tyo.aaniNimi}`, sha256: 'b'.repeat(64), bytes: 1220,
      actualDurationSeconds: 8.4,
    },
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
  await assert.rejects(() => kuittirivit(muutettu), /erätunnus ei vastaa|ei kelpaa kohdistukseen/);
});

test('kuittiresepti hyväksyy vain kaksi lukittua sointipolvea ja niiden jälkikäsittelyn', () => {
  const vanhaSointi = {
    stability: 0.5, similarityBoost: 0.75, style: 0.6, useSpeakerBoost: true, speed: null,
  };
  const uusiSointi = {
    stability: 0.5, similarityBoost: null, style: null, useSpeakerBoost: null, speed: null,
  };
  const vanhaKasittely = {
    silenceTrim: true, targetLufs: -17, lufsTolerance: 1.5, fadeSeconds: 0.03,
    tailPaddingSeconds: 0.15, tempo: 1, arrivalEchoSeconds: 1.5,
  };
  const uusiKasittely = { kind: 'none' };
  assert.equal(kelpaaSointiresepti(vanhaSointi), true);
  assert.equal(kelpaaSointiresepti(uusiSointi), true);
  assert.equal(kelpaaSointiresepti({
    stability: 0.5, similarityBoost: 0.75, style: 0.6, useSpeakerBoost: false, speed: null,
  }), false);
  assert.equal(kelpaaJalkikasittely(uusiKasittely), true);
  assert.equal(kelpaaJalkikasittely({ kind: 'none', tempo: 1 }), false);
  assert.equal(kelpaaKuittiresepti(vanhaSointi, vanhaKasittely), true);
  assert.equal(kelpaaKuittiresepti(uusiSointi, uusiKasittely), true);
  assert.equal(kelpaaKuittiresepti(vanhaSointi, uusiKasittely), false);
  assert.equal(kelpaaKuittiresepti(uusiSointi, vanhaKasittely), false);
});

test('completed-with-errors säilyttää alkuperäisen erän ja palauttaa vain onnistuneet rivit', async () => {
  const tyot = ['ateena', 'sofia'].map((kaupunki) => {
    const tyo = livianKohdistustyo(kaupunki);
    return {
      avain: tyo.avain, lahde: kaupunki, nimi: tyo.aaniNimi, teksti: tyo.teksti,
      puhe: puhemuoto(tyo.teksti, TAGIT[tyo.avain]),
    };
  });
  const tulokset = new Map([
    ['ateena-3', {
      status: 'generated',
      rawArtifact: {
        fileName: `raaka-${tyot[0].nimi}`, sha256: 'c'.repeat(64), bytes: 1200,
        actualDurationSeconds: 8.4,
      },
      finalArtifact: {
        fileName: tyot[0].nimi, sha256: 'a'.repeat(64), bytes: 1234,
        actualDurationSeconds: 8.5,
      },
    }],
    ['sofia-3', {
      status: 'validation-failed', retryReason: 'kesto yli vanhan rajan',
      finalArtifact: {
        fileName: tyot[1].nimi, sha256: 'b'.repeat(64), bytes: 2345,
        actualDurationSeconds: 24.5,
      },
    }],
  ]);
  const kuitti = kokoaTuotantokuitti(tyot, {
    sourceCommit: '2'.repeat(40), status: 'completed-with-errors', tulokset, staged: true,
  });
  assert.equal(kuitinEraTasmaa(kuitti), true);
  const valitut = await kuittirivit(kuitti);
  assert.deepEqual([...valitut.keys()], ['ateena']);

  const irrotettu = structuredClone(kuitti);
  irrotettu.batchId = `pulu-${'f'.repeat(20)}`;
  await assert.rejects(() => kuittirivit(irrotettu), /erätunnus ei vastaa/);

  const vaaraEpaonnistuminen = structuredClone(kuitti);
  vaaraEpaonnistuminen.utterances[1].generationStatus = 'generated';
  vaaraEpaonnistuminen.utterances[1].finalArtifact.sha256 = 'ei-sha';
  await assert.rejects(() => kuittirivit(vaaraEpaonnistuminen), /ei kelpaa kohdistukseen/);

  const vaaraKuori = structuredClone(kuitti);
  vaaraKuori.generationStatus = 'completed';
  await assert.rejects(() => kuittirivit(vaaraKuori), /completed-kuitti sisältää epäonnistuneen rivin/);

  const duplikaatti = structuredClone(kuitti);
  duplikaatti.utterances.push(structuredClone(duplikaatti.utterances[1]));
  await assert.rejects(() => kuittirivit(duplikaatti), /duplikaattirivi/);
});

test('julkiset kokonaiset vanha ja uusi tuotantokuitti läpäisevät saman parserin', {
  skip: process.env.TESTAA_JULKISET_PULU_KUITIT !== '1',
  timeout: 15_000,
}, async () => {
  const juuri = 'https://media.matkakirja.app/aanet/pulu/kuitit';
  const lue = async (nimi) => {
    const vastaus = await fetch(`${juuri}/${nimi}`);
    assert.equal(vastaus.status, 200);
    return vastaus.json();
  };
  const vanha = await lue('pulu-b3a8d61baa0c4dd24123.completed.json');
  const uusi = await lue('pulu-c4a91d1229f96eaac265.completed.json');
  assert.deepEqual([...await kuittirivit(vanha).then((rivit) => rivit.keys())],
    ['ateena', 'sofia', 'istanbul', 'sarajevo', 'wien', 'madrid', 'rooma']);
  assert.deepEqual([...await kuittirivit(uusi).then((rivit) => rivit.keys())], ['ateena', 'sofia']);
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

test('kaikkien 45 city-3-rivin alignment kelpaa exact runtimeportille', async () => {
  assert.equal(LIVIAN_LUENTAKAUPUNGIT.length, 45);
  for (const kaupunki of LIVIAN_LUENTAKAUPUNGIT) {
    const tyo = livianKohdistustyo(kaupunki);
    const aanitavut = new TextEncoder().encode(`lopullinen-${kaupunki}-mp3`);
    const data = await kokoaEledata(tyo, aanitavut, alignment(tyo.teksti));
    assert.equal(data.eleet.length, tyo.cuet.length, kaupunki);
  }
});
