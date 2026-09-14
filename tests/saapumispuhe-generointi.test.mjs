import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { EUROPE } from '../js/packs/europe.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { ISKULAUSEET } from '../js/packs/iskulauseet.js';
import {
  EUROOPAN_SAAPUMISKAUPUNGIT, ISKULAUSEEN_AANI, SAAPUMISNIMEN_AANI,
  ilmanIlmaisutageja, kokoaSaapumispuheRivit, vaadiTaysiSaapumispuheaineisto,
} from '../tools/saapumispuhe-data.mjs';
import {
  kokoaTuotantokuitti, repliikit, saapumisAanenRooliEste, tuotantorepliikit,
  valitseRepliikit,
} from '../tools/generoi-pulu.mjs';

const nimet = new Map(EUROPE.cities.map(({ id, name }) => [id, name]));
const raportti45 = () => ({
  schemaVersion: 1,
  cities: EUROOPAN_SAAPUMISKAUPUNGIT.map((cityId) => ({
    cityId,
    cityName: nimet.get(cityId),
    displaySlogan: ISKULAUSEET[cityId],
    liviaText: ISKULAUSEET[cityId],
    liviaTtsText: `[brightly] ${ISKULAUSEET[cityId]}`,
  })),
});

test('saapumispuheiden kanoninen järjestys on sama 45 kaupunkia kuin runtime', () => {
  assert.equal(EUROOPAN_SAAPUMISKAUPUNGIT.length, 45);
  assert.deepEqual(EUROOPAN_SAAPUMISKAUPUNGIT, Object.keys(FOKUSVIRRAT));
  assert.deepEqual(new Set(EUROOPAN_SAAPUMISKAUPUNGIT), new Set(Object.keys(ISKULAUSEET)));
});

test('täysi raportti tuottaa 45 kertojan nimeä ja 45 Livian iskulausetta', () => {
  const rivit = kokoaSaapumispuheRivit(raportti45());
  assert.equal(rivit.length, 90);
  assert.equal(rivit.filter(({ rooli }) => rooli === 'kertoja').length, 45);
  assert.equal(rivit.filter(({ rooli }) => rooli === 'livia').length, 45);
  assert.equal(vaadiTaysiSaapumispuheaineisto(rivit), true);
  assert.equal(new Set(rivit.map(({ avain }) => avain)).size, 90);
  assert.equal(new Set(rivit.map(({ nimi }) => nimi)).size, 90);

  for (const cityId of EUROOPAN_SAAPUMISKAUPUNGIT) {
    const nimi = rivit.find(({ avain }) => avain === `saapumisnimi-${cityId}`);
    const iskulause = rivit.find(({ avain }) => avain === `iskulause-${cityId}`);
    assert.equal(nimi.cityId, cityId);
    assert.equal(nimi.vaadittuAani, SAAPUMISNIMEN_AANI);
    assert.equal(nimi.nimi, `horatio-saapumisnimi-${cityId}.mp3`);
    assert.equal(nimi.puhe, `[warmly] ${nimet.get(cityId)}.`);
    assert.equal(iskulause.cityId, cityId);
    assert.equal(iskulause.vaadittuAani, ISKULAUSEEN_AANI);
    assert.equal(iskulause.nimi, `livia-iskulause-${cityId}.mp3`);
    assert.equal(ilmanIlmaisutageja(iskulause.puhe), iskulause.teksti);
  }
});

test('rajattu Sofia–Venetsia-pilotti on sallittu mutta ei teeskentele 45/45 kattavuutta', () => {
  const pilotti = raportti45();
  pilotti.cities = pilotti.cities.filter(({ cityId }) => ['sofia', 'venetsia'].includes(cityId));
  const rivit = kokoaSaapumispuheRivit(pilotti);
  assert.deepEqual(rivit.map(({ avain }) => avain), [
    'saapumisnimi-sofia', 'iskulause-sofia',
    'saapumisnimi-venetsia', 'iskulause-venetsia',
  ]);
  assert.throws(() => vaadiTaysiSaapumispuheaineisto(rivit), /45\/45/);
});

test('raportti torjuu tuntemattoman, duplikaatin, väärän näkyvän sloganin ja sanamuutoksen', () => {
  const pohja = raportti45().cities[0];
  assert.throws(() => kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [
    { ...pohja, cityId: 'doha', cityName: 'Doha' },
  ] }), /kanoniseen 45/);
  assert.throws(() => kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [pohja, pohja] }), /duplikaatti/);
  assert.throws(() => kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [
    { ...pohja, displaySlogan: 'Väärä ruututeksti' },
  ] }), /näkyvää lausetta/);
  assert.throws(() => kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [
    { ...pohja, liviaTtsText: '[brightly] Eri sanat.' },
  ] }), /muuttaa puhutut sanat/);
});

test('vanha repertuaari ja sen valinta säilyvät muuttumattomina', () => {
  const vanhat = repliikit();
  const tuotanto = tuotantorepliikit([], []);
  assert.deepEqual(tuotanto, vanhat);
  assert.deepEqual(valitseRepliikit(tuotanto, ['avaus-2']).tyot.map(({ avain }) => avain), ['avaus-2']);
});

test('vanhan repliikin tuotantoerän hash ja kuittimuoto eivät muutu', () => {
  const rivi = repliikit().find(({ avain }) => avain === 'marseille-3');
  const kuitti = kokoaTuotantokuitti([rivi], {
    sourceCommit: '1'.repeat(40), voiceId: 'voice-test', model: 'eleven_v3',
  });
  assert.equal(kuitti.batchId, 'pulu-849bec70f7ad54ef4436');
  assert.equal(Object.hasOwn(kuitti.utterances[0], 'role'), false);
  assert.equal(Object.hasOwn(kuitti.utterances[0], 'source'), false);
  assert.equal(Object.hasOwn(kuitti.utterances[0], 'sourceAudioId'), false);
});

test('valitsematon pääohjelma ei lisää uusia kahden roolin kandidaatteja', () => {
  const source = readFileSync(new URL('../tools/generoi-pulu.mjs', import.meta.url), 'utf8');
  assert.match(source,
    /const kaikki = liput\.valitut\.length \? tuotantorepliikit\(\) : repliikit\(\);/);
});

test('saapumisäänierä torjuu sekaroolin ja väärän äänen', () => {
  const rivit = kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [raportti45().cities[0]] });
  const nimi = rivit.filter(({ rooli }) => rooli === 'kertoja');
  const iskulause = rivit.filter(({ rooli }) => rooli === 'livia');
  assert.match(saapumisAanenRooliEste(rivit, SAAPUMISNIMEN_AANI), /sekoittaa/);
  assert.match(saapumisAanenRooliEste(nimi, ISKULAUSEEN_AANI), /vaatii voice_id/);
  assert.match(saapumisAanenRooliEste(iskulause, SAAPUMISNIMEN_AANI), /vaatii voice_id/);
  assert.equal(saapumisAanenRooliEste(nimi, SAAPUMISNIMEN_AANI), null);
  assert.equal(saapumisAanenRooliEste(iskulause, ISKULAUSEEN_AANI), null);
  assert.equal(saapumisAanenRooliEste([repliikit()[0]], 'koeaaani'), null,
    'vanhojen repliikkien tietoinen koestus ei muutu');
});

test('saapumisäänen kuitti säilyttää cityId:n, roolin tekstin ja muuttumattomat avaimet', () => {
  const [nimi] = kokoaSaapumispuheRivit({ schemaVersion: 1, cities: [raportti45().cities[0]] });
  const kuitti = kokoaTuotantokuitti([nimi], {
    sourceCommit: 'a'.repeat(40), voiceId: SAAPUMISNIMEN_AANI, staged: true,
  });
  const utterance = kuitti.utterances[0];
  assert.equal(utterance.cityId, nimi.cityId);
  assert.equal(utterance.role, 'kertoja');
  assert.equal(utterance.source, 'saapumisnimi');
  assert.equal(utterance.utteranceKey, nimi.avain);
  assert.equal(utterance.visibleText, nimi.teksti);
  assert.equal(utterance.ttsText, nimi.puhe);
  assert.equal(utterance.voiceId, SAAPUMISNIMEN_AANI);
  assert.match(utterance.stagingObjectKey,
    new RegExp(`/erat/${kuitti.batchId}/horatio-saapumisnimi-${nimi.cityId}\\.mp3$`));
  assert.match(utterance.finalObjectKey,
    new RegExp(`/versiot/${'a'.repeat(12)}/${kuitti.batchId}/horatio-saapumisnimi-${nimi.cityId}\\.mp3$`));
  assert.deepEqual(utterance.postprocess, { kind: 'none' });
  assert.equal(utterance.outputFormat, 'mp3_44100_192');
});

test('rooliportti on pääohjelmassa ennen kuittia ja ensimmäistä API-kutsua', () => {
  const source = readFileSync(new URL('../tools/generoi-pulu.mjs', import.meta.url), 'utf8');
  const main = source.slice(source.indexOf('async function main()'));
  assert.ok(main.indexOf('saapumisAanenRooliEste(tyot, liput.aani)') < main.indexOf('kokoaTuotantokuitti(tyot'));
  assert.ok(main.indexOf('saapumisAanenRooliEste(tyot, liput.aani)') < main.indexOf('await haeApista('));
});
