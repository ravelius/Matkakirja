import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { TAGIT, puhemuoto } from '../tools/generoi-pulu.mjs';

const batches = ['e1', 'e2', 'e3', 'e4b', 'e5', 'e6'];
const correctionBatches = new Set(['e2', 'e3', 'e4b', 'e5']);
const sha = (text) => createHash('sha256').update(text).digest('hex');
const stripTags = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();

for (const batch of batches) {
  const manifest = JSON.parse(readFileSync(new URL(
    `../docs/raportit/horatio-livia-${batch}-luentamanifesti-20260913.json`,
    import.meta.url,
  ), 'utf8'));

  test(`${batch}: manifesti ja runtime-packit ovat sisältöjäädytetyt`, () => {
    const revision = correctionBatches.has(batch) ? 'r2' : 'r1';
    assert.equal(manifest.contentRevision, `eu-hl-${batch}-20260913-${revision}-approved1`);
    assert.equal(manifest.state, 'content-frozen-audio-authorized-rc-only');
    for (const city of manifest.cities) {
      const pack = FOKUSVIRRAT[city.city];
      assert.ok(pack, `${city.city}: pack puuttuu`);
      assert.equal(pack.matkakirja.teksti, city.horatio.visibleText, `${city.city}: H näkyvä`);
      assert.equal(pack.matkakirja.luenta, city.horatio.ttsText, `${city.city}: H TTS`);
      assert.equal(pack.pollo.kommentti[0], city.livia.visibleText, `${city.city}: L näkyvä`);
      for (const speaker of ['horatio', 'livia']) {
        const item = city[speaker];
        assert.equal(stripTags(item.ttsText), item.visibleText, `${city.city}: ${speaker} TTS-sanat`);
        assert.equal(item.visibleTextSha256, sha(item.visibleText), `${city.city}: ${speaker} näkyvä SHA`);
        assert.equal(item.ttsTextSha256, sha(item.ttsText), `${city.city}: ${speaker} TTS SHA`);
        for (const cue of item.cues) {
          assert.equal(item.visibleText.split(cue.anchor).length - 1, 1,
            `${cue.cueId}: ankkuri ei ole yksikäsitteinen`);
        }
      }
      assert.deepEqual(
        pack.matkakirja.reaktiot.map(({ id, ankkuri, tarkoitus, voimakkuus }) => ({
          cueId: id, anchor: ankkuri, intent: tarkoitus, strength: voimakkuus,
        })),
        city.horatio.cues.map(({ cueId, anchor, intent, strength }) => ({
          cueId, anchor, intent, strength,
        })),
        `${city.city}: runtime-cuet`,
      );
    }
  });
}

test('Eurooppa-koonti kattaa 45 kaupunkia ja Sofian kanssa 55 Livia-utteranssia', () => {
  const combined = JSON.parse(readFileSync(new URL(
    '../docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260913.json',
    import.meta.url,
  ), 'utf8'));
  assert.equal(combined.cityCount, 45);
  assert.equal(combined.contentRevision, 'eu-hl-europe-20260913-r2-approved1');
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
    assert.equal(city.livia.audioId, `${city.city}-3`, `${city.city}: audio-ID`);
    assert.match(city.sourcePackBlobSha, /^[0-9a-f]{40}$/, `${city.city}: baseline-blob-SHA`);
    assert.equal(city.horatio.visibleText, FOKUSVIRRAT[city.city].matkakirja.teksti,
      `${city.city}: koonti-H`);
    assert.equal(city.livia.visibleText, FOKUSVIRRAT[city.city].pollo.kommentti[0],
      `${city.city}: koonti-L`);
    assert.equal(puhemuoto(city.livia.visibleText, TAGIT[`${city.city}-3`]), city.livia.ttsText,
      `${city.city}: tuotantogeneraattorin exact TTS`);
    for (const speaker of ['horatio', 'livia']) {
      const item = city[speaker];
      assert.equal(stripTags(item.ttsText), item.visibleText, `${city.city}: koonti-${speaker}-TTS`);
      assert.equal(item.visibleTextSha256, sha(item.visibleText), `${city.city}: koonti-${speaker}-SHA`);
      assert.equal(item.ttsTextSha256, sha(item.ttsText), `${city.city}: koonti-${speaker}-TTS-SHA`);
      for (const cue of item.cues) assert.equal(item.visibleText.split(cue.anchor).length - 1, 1,
        `${cue.cueId}: koontiankkuri`);
    }
  }
  for (const item of combined.sofiaSupplementalLiviaUtterances) {
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

test('rajattu r2-korjaus sisältää täsmälleen sovitut merkityskorjaukset', () => {
  assert.match(FOKUSVIRRAT.budapest.matkakirja.teksti, /Lämmössä kaupungit saivat odottaa järjestystä\.$/);
  assert.match(FOKUSVIRRAT.lissabon.pollo.kommentti[0], /päätepysäkille asti\.$/);
  assert.match(FOKUSVIRRAT.sisilia.pollo.kommentti[0], /sillä sisälle en lentänyt\.$/);
  for (const city of ['sofia', 'istanbul', 'bukarest', 'budapest', 'dubrovnik', 'kreeta', 'kobenhavn', 'bergen', 'oslo', 'islanti']) {
    assert.ok(FOKUSVIRRAT[city].pollo.kommentti[0].length >= 130, `${city}: Livia jäi liian ohueksi`);
  }
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
