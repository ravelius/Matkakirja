import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { AANI_JUURI, UUSITUT_AANET, aaniUrl } from '../js/media.js';
import { aikaleimojenOsoite, tarkistaAikaleimat } from '../js/luentareaktiot.js';
import { MAAILMA } from '../js/packs/maailma.js';
import { INTRO_TEXT } from '../js/ui-tekstit.js';
import {
  AVAUSLUENNAT, avausTyo, kohdistusTyo, kuittirivit, lueLiput,
} from '../tools/kohdista-luennat.mjs';
import {
  kohdeTiedosto, kuittirivi, tuotantoAvaimet, tuotantoEraId,
} from '../tools/generoi-luennat.mjs';

function valmisKuitti(id = 'ateena') {
  const sourceCommit = '1'.repeat(40);
  const tyo = { id, ...kohdeTiedosto(id) };
  const batch = { id: tuotantoEraId([tyo], sourceCommit), sourceCommit, retryOf: null };
  const audio = Buffer.from(`horatio-${id}-final-audio`);
  return {
    schemaVersion: 1,
    batch,
    cities: [kuittirivi(tyo, {
      status: 'success', raw: audio, final: { data: audio, duration: 12.5 },
      objectKeys: tuotantoAvaimet(tyo, { batchId: batch.id, sourceCommit }),
    })],
  };
}

test('Horatio-kohdistus hyväksyy vain valmiin SHA-sidotun tuotantokuitin', async () => {
  const kuitti = valmisKuitti();
  const rivit = await kuittirivit(kuitti);
  const rivi = rivit.get('ateena');
  const tyo = kohdistusTyo('ateena', rivi);
  assert.equal(tyo.aaniOsoite, `${AANI_JUURI}${rivi.objectKeys.final}`);
  assert.equal(tyo.ampariNimi, rivi.objectKeys.final.replace(/\.mp3$/, '.aikaleimat.json'));
  assert.deepEqual(tyo.kuittiAani, rivi.finalAudio);

  for (const muuta of [
    (k) => { k.cities[0].visibleText.text += ' väärä'; },
    (k) => { k.cities[0].synthesis.voiceId = 'vaara'; },
    (k) => { k.cities[0].finalAudio.sha256 = 'a'.repeat(64); },
    (k) => { k.cities[0].objectKeys.final = 'audio/puhe-fokus-matkakirja-ateena.mp3'; },
    (k) => { k.cities[0].generation.status = 'planned'; },
  ]) {
    const rikottu = structuredClone(kuitti);
    muuta(rikottu);
    await assert.rejects(() => kuittirivit(rikottu), /ei kelpaa kohdistukseen/);
  }
});

test('vanhan tuotantoerän outputFormat kelpaa kohdistukseen, mutta muu formaattiroska ei', async () => {
  /*
   * 23.9.2026, Fablen päätös: kaikki 23.9.2026 mennessä tuotetut
   * kuitit kantavat vanhaa mp3_44100_128:aa, ja OUTPUT_FORMAT nostettiin
   * myöhemmin mp3_44100_192:een. Kohdistus ei tuota ääntä, joten
   * kuitin oma formaatti kelpaa — myös eräId lasketaan sillä, ei
   * nykyisellä vakiolla (muuten batchId ei täsmäisi).
   */
  const id = 'praha';
  const sourceCommit = '2'.repeat(40);
  const vanhaFormaatti = 'mp3_44100_128';
  const tyo = { id, ...kohdeTiedosto(id) };
  const batch = {
    id: tuotantoEraId([tyo], sourceCommit, vanhaFormaatti), sourceCommit, retryOf: null,
  };
  const audio = Buffer.from(`horatio-${id}-vanha-formaatti`);
  const vanha = {
    schemaVersion: 1,
    batch,
    cities: [kuittirivi(tyo, {
      status: 'success', raw: audio, final: { data: audio, duration: 9.5 },
      objectKeys: tuotantoAvaimet(tyo, { batchId: batch.id, sourceCommit }),
    })],
  };
  vanha.cities[0].synthesis.outputFormat = vanhaFormaatti;
  const rivit = await kuittirivit(vanha);
  assert.ok(rivit.has('praha'));

  const roska = structuredClone(vanha);
  roska.cities[0].synthesis.outputFormat = 'jotain-muuta';
  await assert.rejects(() => kuittirivit(roska), /ei kelpaa kohdistukseen/);
});

test('kohdistusliput kantavat kuitin eivatka oleta vientia', () => {
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json']), {
    kaupungit: [], kaikki: false, kuiva: false, vienti: false, sidonta: false, kuitti: 'valmis.json',
    avaus: false,
  });
  assert.equal(lueLiput(['--avaus', '--kuiva']).avaus, true);
  assert.throws(() => lueLiput(['--kuitti']), /ilman polkua tai URLia/);
});

test('workflow vartioi julkisen completed-kuitin ja julkaisee vain tarkastusartefaktin', () => {
  const workflow = readFileSync(new URL('../.github/workflows/generoi-luennat.yml', import.meta.url), 'utf8');
  assert.match(workflow, /https:\/\/media\.matkakirja\.app\/audio\/receipts\/horatio\/\*\.completed\.json/);
  assert.match(workflow, /node tools\/kohdista-luennat\.mjs --vie --kuitti "\$KUITTI"/);
  assert.match(workflow, /name: horatio-aikaleimat-/);
  assert.doesNotMatch(workflow, /git push|Committoi aikaleimat/);
  assert.match(workflow, /permissions:\s+contents: read/);
});

/*
 * AVAUSLUENNAT (24.9.2026, build 7): natiivi tahdistaa etusivun ja
 * avauslennon kirjoituskoneen aikaleimoista. Teksti on pelin oma vakio,
 * ja tiedoston osoite on äänitteen sisar samalla kyselyversiolla.
 */
test('avausluennat: teksti pelin vakiosta ja osoite äänitteen parina', () => {
  assert.deepEqual(AVAUSLUENNAT.map((l) => l.id), ['intro', 'lento-alku']);
  const intro = avausTyo('intro');
  assert.equal(intro.teksti, INTRO_TEXT);
  assert.equal(intro.kaupunki, null);
  assert.equal(intro.aaniOsoite, aaniUrl('assets/audio/intro-puhe.mp3'));
  assert.equal(intro.ampariNimi, 'audio/intro-puhe.aikaleimat.json');
  assert.equal(intro.kohde, 'assets/aikaleimat/intro-puhe.aikaleimat.json');
  const lento = avausTyo('lento-alku');
  assert.equal(lento.teksti, MAAILMA.texts.flightFirst[0]);
  assert.equal(lento.ampariNimi, 'audio/puhe-lento-alku.aikaleimat.json');
  // Pelin/natiivin laskema osoite osuu ämpärin avaimeen (kysely ohitetaan).
  for (const tyo of [intro, lento]) {
    const osoite = aikaleimojenOsoite(tyo.aaniPolku);
    assert.equal(osoite.split('?')[0], `${AANI_JUURI}${tyo.ampariNimi}`);
    assert.match(osoite, new RegExp(`\\?v=${UUSITUT_AANET[tyo.aaniNimi]}$`));
  }
  assert.equal(avausTyo('ei-ole'), null);
});

test('avausluentojen repokopiot kelpaavat nykyiselle tekstille ja äänitepolvelle', async () => {
  for (const { id } of AVAUSLUENNAT) {
    const tyo = avausTyo(id);
    const data = JSON.parse(readFileSync(new URL(`../${tyo.kohde}`, import.meta.url), 'utf8'));
    assert.equal(data.luenta, id);
    assert.equal(data.kaupunki, null);
    assert.equal(data.aani.nimi, tyo.aaniNimi);
    assert.equal(data.aani.versio, UUSITUT_AANET[tyo.aaniNimi] ?? 0,
      `${id}: aikaleimat on kohdistettu eri äänitepolveen kuin peli soittaa`);
    const tulos = await tarkistaAikaleimat(data, { teksti: tyo.teksti });
    assert.equal(tulos.ok, true, `${id}: ${tulos.syy}`);
  }
});

test('workflow kohdistaa avausluennat ilman kuittia eikä äänitä niitä uusiksi', () => {
  const workflow = readFileSync(new URL('../.github/workflows/generoi-luennat.yml', import.meta.url), 'utf8');
  assert.match(workflow, /node tools\/kohdista-luennat\.mjs --vie --avaus/);
  assert.match(workflow, /node tools\/kohdista-luennat\.mjs --kuiva --avaus/);
  assert.match(workflow, /inputs\.toiminto == 'kohdista' && inputs\.kuitti == '' && inputs\.avaus == false/);
  // Kohdista + avaus ei saa käynnistää maksullista uudelleenäänitystä.
  const generoi = workflow.slice(workflow.indexOf('- name: Generoi avausluennat'));
  assert.match(generoi.slice(0, 200), /inputs\.avaus == true && inputs\.toiminto == 'generoi'/);
  assert.match(workflow, /assets\/aikaleimat\/intro-puhe\.aikaleimat\.json/);
  assert.match(workflow, /assets\/aikaleimat\/puhe-lento-alku\.aikaleimat\.json/);
});
