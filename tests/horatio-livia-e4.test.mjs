import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const KAUPUNGIT = [
  ['tukholma', 'Tukholma', 447, 57],
  ['helsinki', 'Helsinki', 441, 52],
  ['tampere', 'Tampere', 441, 56],
  ['tallinna', 'Tallinna', 411, 53],
  ['riika', 'Riika', 445, 57],
  ['vilna', 'Vilna', 448, 52],
  ['tromssa', 'Tromssa', 459, 59],
  ['lappi', 'Lappi — Rovaniemi', 439, 55],
];

const lukukopio = readFileSync(new URL(
  '../docs/raportit/horatio-livia-e4-r1-lukukopio-20260913.md',
  import.meta.url,
), 'utf8');

const mittaraportti = readFileSync(new URL(
  '../docs/raportit/horatio-livia-e4-r1-mittaraportti-20260913.md',
  import.meta.url,
), 'utf8');

const manifesti = JSON.parse(readFileSync(new URL(
  '../docs/raportit/horatio-livia-e4-luentamanifesti-20260913.json',
  import.meta.url,
), 'utf8'));

function regexpNimi(nimi) {
  return nimi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ilmanTageja(teksti) {
  return String(teksti ?? '').replace(/\[[^\]]+\]\s*/g, '').trim();
}

function sanoja(teksti) {
  return String(teksti ?? '').trim().split(/\s+/u).filter(Boolean).length;
}

function lukukopionPari(nimi) {
  const osuma = lukukopio.match(new RegExp(
    `## ${regexpNimi(nimi)}\\n[\\s\\S]*?\\n> ([^\\n]+)\\n[\\s\\S]*?\\n> ([^\\n]+)`,
  ));
  assert.ok(osuma, `${nimi}: lukukopiota ei löytynyt`);
  return { horatio: osuma[1], livia: osuma[2] };
}

function ttsPari(nimi) {
  const osuma = mittaraportti.match(new RegExp(
    `### ${regexpNimi(nimi)}\\n[\\s\\S]*?Horatio:\\n\\n> ([^\\n]+)\\n[\\s\\S]*?Livia:\\n\\n> ([^\\n]+)`,
  ));
  assert.ok(osuma, `${nimi}: TTS-paria ei löytynyt`);
  return { horatio: osuma[1], livia: osuma[2] };
}

test('E4-packit vastaavat hyväksyttyä lukukopiota ja TTS-sanoja', () => {
  for (const [id, nimi] of KAUPUNGIT) {
    const virta = FOKUSVIRRAT[id];
    const tekstit = lukukopionPari(nimi);
    const tts = ttsPari(nimi);
    assert.equal(virta.matkakirja.teksti, tekstit.horatio, `${id}: Horatio`);
    assert.equal(virta.pollo.kommentti[0], tekstit.livia, `${id}: Livia`);
    assert.equal(virta.matkakirja.luenta, tts.horatio, `${id}: Horatio TTS`);
    assert.equal(ilmanTageja(tts.horatio), tekstit.horatio, `${id}: Horation sanat`);
    assert.equal(ilmanTageja(tts.livia), tekstit.livia, `${id}: Livian sanat`);
  }
});

test('E4-parit pysyvät julkaistussa yhteisbudjetissa', () => {
  for (const [id, nimi, merkkiraja, sanaraja] of KAUPUNGIT) {
    const tekstit = lukukopionPari(nimi);
    const pari = `${tekstit.horatio}${tekstit.livia}`;
    assert.ok(pari.length <= merkkiraja, `${id}: merkkibudjetti`);
    assert.ok(sanoja(pari) <= sanaraja, `${id}: sanabudjetti`);
  }
});

test('E4-pakkien Horatio-ankkurit ovat yksikäsitteiset', () => {
  for (const [id] of KAUPUNGIT) {
    const matkakirja = FOKUSVIRRAT[id].matkakirja;
    const tunnukset = new Set();
    for (const cue of matkakirja.reaktiot) {
      assert.match(cue.id, new RegExp(`^${id}\\.r\\d+$`), `${id}: cueId`);
      assert.ok(!tunnukset.has(cue.id), `${id}: cueId toistuu`);
      tunnukset.add(cue.id);
      assert.equal(matkakirja.teksti.split(cue.ankkuri).length - 1, 1,
        `${cue.id}: ankkuri ei ole yksikäsitteinen`);
    }
  }
});

test('E4-luentamanifesti on sidottu hyväksyttyihin sanoihin, tageihin ja cueihin', () => {
  assert.equal(manifesti.contentRevision, 'eu-hl-e4-20260913-r1-approved1');
  assert.equal(manifesti.state, 'content-frozen-audio-authorized-rc-only');
  assert.equal(manifesti.cities.length, KAUPUNGIT.length);
  const sha = (teksti) => createHash('sha256').update(teksti).digest('hex');
  for (const [id, nimi] of KAUPUNGIT) {
    const item = manifesti.cities.find((kaupunki) => kaupunki.city === id);
    const tekstit = lukukopionPari(nimi);
    const tts = ttsPari(nimi);
    assert.ok(item, `${id}: puuttuu manifestista`);
    assert.equal(item.horatio.visibleText, tekstit.horatio, `${id}: H näkyvä`);
    assert.equal(item.horatio.ttsText, tts.horatio, `${id}: H TTS`);
    assert.equal(item.livia.visibleText, tekstit.livia, `${id}: L näkyvä`);
    assert.equal(item.livia.ttsText, tts.livia, `${id}: L TTS`);
    assert.equal(item.horatio.visibleTextSha256, sha(tekstit.horatio), `${id}: H SHA`);
    assert.equal(item.horatio.ttsTextSha256, sha(tts.horatio), `${id}: H TTS SHA`);
    assert.equal(item.livia.visibleTextSha256, sha(tekstit.livia), `${id}: L SHA`);
    assert.equal(item.livia.ttsTextSha256, sha(tts.livia), `${id}: L TTS SHA`);
    for (const cue of [...item.horatio.cues, ...item.livia.cues]) {
      const visible = cue.cueId.includes('.livia.') ? tekstit.livia : tekstit.horatio;
      assert.equal(visible.split(cue.anchor).length - 1, cue.occurrence ?? 1,
        `${cue.cueId}: manifestin ankkuri`);
    }
  }
});
