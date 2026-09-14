import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import {
  LIVIA_ILMAISUPILOTIN_AANI, LIVIA_ILMAISUPILOTIN_KAUPUNGIT,
  kokoaLivianIlmaisupilottiRivit, lueLivianIlmaisupilottiRivit,
} from '../tools/livia-ilmaisupilotti-data.mjs';
import {
  kokoaTuotantokuitti, repliikit, saapumisAanenRooliEste, tuotantorepliikit,
  tauluksi, valitseRepliikit,
} from '../tools/generoi-pulu.mjs';

const KAUPUNGIT = ['istanbul', 'helsinki', 'berliini', 'amsterdam', 'tampere', 'barcelona'];
const raportti = () => ({
  schemaVersion: 1,
  voiceId: LIVIA_ILMAISUPILOTIN_AANI,
  cities: KAUPUNGIT.map((cityId) => ({
    cityId,
    sourceAudioId: `${cityId}-3`,
    visibleText: `${cityId} puhuu tässä selvästi.`,
    ttsText: `[brightly] ${cityId} puhuu tässä [warmly] selvästi.`,
  })),
});

test('kuuden kaupungin ilmaisupilotti saa erilliset vakaat avaimet ja tiedostonimet', () => {
  assert.deepEqual(LIVIA_ILMAISUPILOTIN_KAUPUNGIT, KAUPUNGIT);
  const rivit = kokoaLivianIlmaisupilottiRivit(raportti());
  assert.equal(rivit.length, 6);
  assert.deepEqual(rivit.map(({ cityId }) => cityId), KAUPUNGIT);
  for (const rivi of rivit) {
    assert.ok(Object.hasOwn(FOKUSVIRRAT, rivi.cityId));
    assert.equal(rivi.avain, `ilmaisu-${rivi.cityId}-3`);
    assert.equal(rivi.sourceAudioId, `${rivi.cityId}-3`);
    assert.equal(rivi.nimi, `livia-ilmaisu-${rivi.cityId}-3.mp3`);
    assert.equal(rivi.rooli, 'livia');
    assert.equal(rivi.lahde, 'ilmaisu');
    assert.equal(rivi.vaadittuAani, LIVIA_ILMAISUPILOTIN_AANI);
  }
});

test('toimitettu ilmaisupilotti muuttaa sanat vain Istanbulissa ja Helsingissä', () => {
  const rivit = lueLivianIlmaisupilottiRivit();
  assert.deepEqual(rivit.map(({ cityId }) => cityId), KAUPUNGIT);
  const muuttuneet = [];
  const ennallaan = [];
  for (const rivi of rivit) {
    const nykyinen = FOKUSVIRRAT[rivi.cityId].pollo.kommentti[0];
    (rivi.teksti === nykyinen ? ennallaan : muuttuneet).push(rivi.cityId);
  }
  assert.deepEqual(muuttuneet, ['istanbul', 'helsinki']);
  assert.deepEqual(ennallaan, ['berliini', 'amsterdam', 'tampere', 'barcelona']);
});

test('ilmaisupilotti torjuu väärän raporttiäänen, kaupungin, sourceAudioId:n ja sanamuutoksen', () => {
  assert.throws(() => kokoaLivianIlmaisupilottiRivit({ ...raportti(), voiceId: 'väärä' }), /Flicker/);
  const tuntematon = raportti();
  tuntematon.cities[0] = { ...tuntematon.cities[0], cityId: 'doha', sourceAudioId: 'doha-3' };
  assert.throws(() => kokoaLivianIlmaisupilottiRivit(tuntematon), /kanoniseen 45/);
  const lahde = raportti();
  lahde.cities[0] = { ...lahde.cities[0], sourceAudioId: 'istanbul-2' };
  assert.throws(() => kokoaLivianIlmaisupilottiRivit(lahde), /sourceAudioId/);
  const sanat = raportti();
  sanat.cities[0] = { ...sanat.cities[0], ttsText: '[brightly] aivan eri sanat.' };
  assert.throws(() => kokoaLivianIlmaisupilottiRivit(sanat), /muuttaa näkyvät sanat/);
  const vajaa = raportti();
  vajaa.cities.pop();
  assert.throws(() => kokoaLivianIlmaisupilottiRivit(vajaa), /täsmälleen kaupungit/);
});

test('ilmaisupilotti liittyy vain tuotantovalintaan eikä muuta vanhaa repliikkilistaa', () => {
  const vanhat = repliikit();
  const ilmaisut = kokoaLivianIlmaisupilottiRivit(raportti());
  const kaikki = tuotantorepliikit([], ilmaisut);
  assert.deepEqual(kaikki.slice(0, vanhat.length), vanhat);
  assert.deepEqual(kaikki.slice(vanhat.length).map(({ avain }) => avain),
    KAUPUNGIT.map((cityId) => `ilmaisu-${cityId}-3`));
  assert.deepEqual(
    valitseRepliikit(kaikki, ['ilmaisu-istanbul-3']).tyot.map(({ avain }) => avain),
    ['ilmaisu-istanbul-3'],
  );
});

test('ilmaisupilotti hyväksyy vain Flickerin ennen tuotantoa', () => {
  const rivit = kokoaLivianIlmaisupilottiRivit(raportti());
  assert.equal(saapumisAanenRooliEste(rivit, LIVIA_ILMAISUPILOTIN_AANI), null);
  assert.match(saapumisAanenRooliEste(rivit, 'väärä-ääni'), /vaatii voice_id/);
});

test('ilmaisukuitissa lähde city-3 ja kandidaatti pysyvät erillään', () => {
  const [rivi] = kokoaLivianIlmaisupilottiRivit(raportti());
  const kuitti = kokoaTuotantokuitti([rivi], {
    sourceCommit: 'b'.repeat(40), voiceId: LIVIA_ILMAISUPILOTIN_AANI, staged: true,
  });
  const u = kuitti.utterances[0];
  assert.equal(u.cityId, 'istanbul');
  assert.equal(u.role, 'livia');
  assert.equal(u.source, 'ilmaisu');
  assert.equal(u.sourceAudioId, 'istanbul-3');
  assert.equal(u.utteranceKey, 'ilmaisu-istanbul-3');
  assert.match(u.finalObjectKey, /livia-ilmaisu-istanbul-3\.mp3$/);
  assert.doesNotMatch(u.finalObjectKey, /\/livia-istanbul-3\.mp3$/);
  assert.match(tauluksi([rivi]), /runtime-tauluja ei päivitetä/);
});
