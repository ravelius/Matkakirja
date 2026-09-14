import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { AANI as HORATIO_AANI, MALLI as HORATIO_MALLI, STABILITY as HORATIO_VAKAUS } from '../tools/generoi-luennat.mjs';
import {
  PULU_AANI_OLETUS, PULU_MALLI_OLETUS, TAGIT, puhemuoto, tulkitseArgumentit,
} from '../tools/generoi-pulu.mjs';

const APPROVED_SOURCE_SHA = '44b3192a64ee18efa1fce43c1729ba4b410440328dcc5b6ce694f6885bf85fbc';
const approvedUrl = new URL('../docs/raportit/horatio-livia-hyvaksytyt-20260914-r2.json', import.meta.url);
const approved = JSON.parse(readFileSync(approvedUrl, 'utf8'));
const combined = JSON.parse(readFileSync(new URL(
  '../docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json', import.meta.url,
), 'utf8'));
const sha = (text) => createHash('sha256').update(text).digest('hex');
const stripTags = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();

test('R2-hyväksyntälähde on tarkalleen käyttäjän hyväksymä 45 kaupungin versio', () => {
  assert.equal(approved.sourceSha256, APPROVED_SOURCE_SHA);
  assert.equal(approved.cities.length, 45);
  assert.equal(new Set(approved.cities.map(({ id }) => id)).size, 45);
});

test('Eurooppa-koonti kattaa 45 kaupunkia ja Sofian kanssa 55 Livia-utteranssia', () => {
  assert.equal(combined.cityCount, 45);
  assert.equal(combined.contentRevision, 'eu-hl-europe-20260914-r2-approved');
  assert.equal(combined.requestedAudioCount, 90);
  assert.equal(combined.cities.length, 45);
  assert.equal(new Set(combined.cities.map((city) => city.city)).size, 45);
  assert.equal(combined.liviaCityUtteranceCount, 55);
  assert.equal(combined.sofiaSupplementalLiviaUtterances.length, 10);
  assert.deepEqual(
    combined.sofiaSupplementalLiviaUtterances.map((item) => item.audioId),
    ['sofia-5', 'sofia-6', 'sofia-7', 'sofia-8', 'sofia-9', 'sofia-10', 'sofia-11', 'sofia-12', 'sofia-13', 'sofia-14'],
  );
  assert.equal(combined.cities.find((city) => city.city === 'sofia').livia.audioId, 'sofia-3');
  for (const city of combined.cities) {
    const source = approved.cities.find(({ id }) => id === city.city);
    assert.ok(source, `${city.city}: hyväksyntälähde puuttuu`);
    assert.equal(city.livia.audioId, `${city.city}-3`, `${city.city}: audio-ID`);
    assert.equal(city.horatio.visibleText, source.text.horatio, `${city.city}: hyväksytty H`);
    assert.equal(city.livia.visibleText, source.text.livia, `${city.city}: hyväksytty L`);
    assert.equal(city.horatio.visibleText, FOKUSVIRRAT[city.city].matkakirja.teksti,
      `${city.city}: koonti-H`);
    assert.equal(city.livia.visibleText, FOKUSVIRRAT[city.city].pollo.kommentti[0],
      `${city.city}: koonti-L`);
    assert.equal(puhemuoto(city.livia.visibleText, TAGIT[city.livia.audioId]), city.livia.ttsText,
      `${city.city}: tuotantogeneraattorin Livia TTS`);
    for (const speaker of ['horatio', 'livia']) {
      const item = city[speaker];
      assert.equal(stripTags(item.ttsText), item.visibleText, `${city.city}: koonti-${speaker}-TTS`);
      assert.equal(item.visibleTextSha256, sha(item.visibleText), `${city.city}: koonti-${speaker}-SHA`);
      assert.equal(item.ttsTextSha256, sha(item.ttsText), `${city.city}: koonti-${speaker}-TTS-SHA`);
      const cueIds = new Set();
      for (const cue of item.cues) {
        assert.ok(!cueIds.has(cue.cueId), `${cue.cueId}: cue-ID toistuu`);
        cueIds.add(cue.cueId);
        assert.ok(cue.intent, `${cue.cueId}: intent puuttuu`);
        assert.equal(item.visibleText.split(cue.anchor).length - 1, cue.occurrence ?? 1,
          `${cue.cueId}: koontiankkuri`);
      }
    }
  }
  for (const item of combined.sofiaSupplementalLiviaUtterances) {
    assert.equal(puhemuoto(item.visibleText, TAGIT[item.audioId]), item.ttsText,
      `${item.audioId}: tuotantogeneraattorin exact TTS`);
    assert.equal(stripTags(item.ttsText), item.visibleText, `${item.audioId}: exact TTS-sopimus`);
    assert.equal(item.visibleTextSha256, sha(item.visibleText), `${item.audioId}: näkyvä SHA`);
    assert.equal(item.ttsTextSha256, sha(item.ttsText), `${item.audioId}: TTS SHA`);
    assert.equal(item.unchangedFromBaseline, true, `${item.audioId}: baseline-säilytys`);
    assert.equal(item.generationAction, 'reuse-existing', `${item.audioId}: ei uutta generointia`);
    assert.deepEqual(item.ttsRecipeSource, {
      path: 'tools/generoi-pulu.mjs', export: 'TAGIT',
      verifiedAtCommit: '079284e1cf09f650ed7e5f3d54f54c4e3da933b1',
    }, `${item.audioId}: varmennettu reseptilähde`);
  }
});

test('tuotantomanifesti lukitsee hyväksytyt äänet ja luonnollisen tempon', () => {
  assert.deepEqual(combined.voices.horatio, {
    name: 'Viisas Kertoja', id: 'Sz0tRTEpybtDJ9ru2kgD', model: 'eleven_v3', stability: 0.5,
  });
  assert.deepEqual(combined.voices.livia, {
    name: 'Flicker — cheerful fairy & sparkly sweetness',
    id: 'piI8Kku0DcvcL6TTSeQt', model: 'eleven_v3', stability: 0.5, tempo: 1,
  });
  assert.equal(HORATIO_AANI, combined.voices.horatio.id);
  assert.equal(HORATIO_MALLI, combined.voices.horatio.model);
  assert.equal(HORATIO_VAKAUS, combined.voices.horatio.stability);
  assert.equal(PULU_AANI_OLETUS, combined.voices.livia.id);
  assert.equal(PULU_MALLI_OLETUS, combined.voices.livia.model);
  assert.equal(tulkitseArgumentit([]).tempo, combined.voices.livia.tempo);
});

test('jäljellä olleiden 33 kaupungin 106 nykykuvaa saivat kahden lauseen readbackit', () => {
  const cities = [
    'alpit', 'amsterdam', 'barcelona', 'bergen', 'berliini', 'budapest', 'bukarest',
    'dublin', 'dubrovnik', 'edinburgh', 'firenze', 'granada', 'islanti', 'istanbul',
    'kiova', 'kobenhavn', 'krakova', 'kreeta', 'lissabon', 'lontoo', 'madrid',
    'moskova', 'odessa', 'oslo', 'pariisi', 'pietari', 'praha', 'rooma', 'sevilla',
    'sisilia', 'sofia', 'varsova', 'wien',
  ];
  const images = cities.flatMap((city) => {
    const pack = FOKUSVIRRAT[city];
    return [pack.matkakirja.luentakuva, pack.matkakirja.luentakuva2, ...(pack.pollo.kuvat ?? [])];
  });
  assert.equal(images.length, 106);
  for (const image of images) {
    assert.equal((image.selite.match(/[.!?](?=\s|$)/g) ?? []).length, 2, image.osoite);
  }
  const exactShorts = {
    barcelona: ['P1', 'Barcelona: viistetty kulma avasi näkymään tilaa.'],
    budapest: ['P2', 'Budapest: nimi yhdisti kaupungin, joki jäi näkyvästi väliin.'],
    dublin: ['P1', 'Dublin: vuokrasopimus kesti, minun pysähdykseni ei.'],
    dubrovnik: ['P3', 'Dubrovnik: kuusitoista suuta yhden kaivon ympärillä.'],
    lissabon: ['P1', 'Lissabon: hissin yläpää, jossa siipiä myydään ilmeisesti pareittain.'],
    lontoo: ['P1', 'Lontoo: parlamentti jäi taustalle, sillä penkillä oli tärkeämpää.'],
    pietari: ['P1', 'Pietari: vaalea kesäyö jätti Nevan rantaan tilaa vielä yhdelle kierrokselle.'],
    sisilia: ['P1', 'Palermo: tämän katon näin kuvasta, siipeni jäivät ulkopuolelle.'],
  };
  for (const [city, [slot, expected]] of Object.entries(exactShorts)) {
    assert.equal(FOKUSVIRRAT[city].pollo.kuvat[Number(slot.slice(1)) - 1].lyhyt, expected);
  }
});

test('kaikkien 45 Euroopan kaupungin 149 nykykuvaa täyttävät kuvatekstirajauksen', () => {
  const images = combined.cities.flatMap(({ city }) => {
    const pack = FOKUSVIRRAT[city];
    return [pack.matkakirja.luentakuva, pack.matkakirja.luentakuva2, ...(pack.pollo.kuvat ?? [])];
  });
  assert.equal(images.length, 149);
  for (const image of images) {
    assert.equal((image.selite.match(/[.!?](?=\s|$)/g) ?? []).length, 2,
      `${image.osoite}: pitkän selitteen pitää olla kaksi sisältölausetta`);
    const shortContent = image.lyhyt.replace(/^[^.]+,\s*1873\.\s*/u, '');
    assert.equal((shortContent.match(/[.!?](?=\s|$)/g) ?? []).length, 1,
      `${image.osoite}: lyhyen selitteen pitää olla yksi sisältölause`);
  }
  assert.equal(FOKUSVIRRAT.venetsia.pollo.kuvat[1].lyhyt,
    'Venetsia: sama paikallinen, kaupunki on yllättävän pieni.');
  assert.equal(FOKUSVIRRAT.venetsia.pollo.kuvat[2].lyhyt,
    'Venetsia: aukion nimi on… tiedän kyllä aivan varmasti.');
});
