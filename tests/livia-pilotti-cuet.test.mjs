import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { tekstinSha256 } from '../js/luentareaktiot.js';
import {
  LIVIAN_PILOTIN_REVISION, LIVIAN_PILOTTIKAUPUNGIT, LIVIAN_PILOTTI_CUET, livianPilottityo,
} from '../js/livia-pilotti-cuet.js';
import { ankkurinOsumat, livianKohdistustyo, tarkistaKohdistustyo } from '../tools/kohdista-pulu-eleet.mjs';

test('tekninen lähde kattaa neljä pysyvää city-3-pilottia', () => {
  assert.equal(LIVIAN_PILOTIN_REVISION, 'eu-hl-pilot-20260913-r2-approved1');
  assert.deepEqual(LIVIAN_PILOTTIKAUPUNGIT, ['marseille', 'ateena', 'sarajevo', 'venetsia']);
  for (const kaupunki of LIVIAN_PILOTTIKAUPUNGIT) {
    const tyo = livianPilottityo(kaupunki, 'kommentti', 0);
    assert.equal(tyo.avain, `${kaupunki}-3`);
    assert.match(tyo.aaniNimi, new RegExp(`^livia-${kaupunki}-3\\.mp3$`));
    assert.equal(livianPilottityo(kaupunki, 'huudahdus', 0), null);
    assert.equal(livianPilottityo(kaupunki, 'kommentti', 1), null);
    assert.ok(tyo.cuet.every((cue) => cue.id.startsWith(`${kaupunki}.livia.c`)));
  }
  assert.equal(livianPilottityo('sofia'), null);
});

test('cue-lähteen SHA sitoo sen pakin näkyvään kommenttiin', async () => {
  for (const kaupunki of LIVIAN_PILOTTIKAUPUNGIT) {
    const raaka = FOKUSVIRRAT[kaupunki].pollo.kommentti;
    const teksti = Array.isArray(raaka) ? raaka[0] : raaka;
    assert.equal(await tekstinSha256(teksti), LIVIAN_PILOTTI_CUET[kaupunki].tekstiSha256, kaupunki);
  }
});

test('runtime-cuet vastaavat tekstinomistajan koneellista ajopakettia', () => {
  const paketti = JSON.parse(readFileSync(new URL(
    '../docs/raportit/horatio-livia-pilotti-tts-ajopaketti-20260912.json',
    import.meta.url,
  ), 'utf8'));
  for (const kaupunki of LIVIAN_PILOTTIKAUPUNGIT) {
    const rivi = paketti.livia.items.find((item) => item.key === `${kaupunki}-3`);
    assert.ok(rivi, `${kaupunki}: ajopaketin Livia-rivi puuttuu`);
    assert.deepEqual(
      LIVIAN_PILOTTI_CUET[kaupunki].cuet.map(({
        id, ankkuri, esiintyma, tarkoitus, voimakkuus,
      }) => ({
        cueId: id, anchor: ankkuri, occurrence: esiintyma,
        purpose: tarkoitus, strength: voimakkuus,
      })),
      rivi.cueAnchors,
      `${kaupunki}: runtime ja ajopaketti ovat eriytyneet`,
    );
  }
});

test('kuiva portti hyväksyy vain yksikäsitteiset täsmäankkurit', async () => {
  for (const kaupunki of LIVIAN_PILOTTIKAUPUNGIT) {
    const tyo = livianKohdistustyo(kaupunki);
    const tulos = await tarkistaKohdistustyo(tyo);
    assert.deepEqual(tulos, { ok: true }, kaupunki);
  }
  assert.deepEqual(ankkurinOsumat('Sama sana ja sama sana.', 'sama sana'), [0, 3]);
});

test('cue- ja loader-moduulit ovat standalone- ja SW-listoilla riippuvuusjärjestyksessä', () => {
  const build = readFileSync(new URL('../tools/build-standalone.mjs', import.meta.url), 'utf8');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const nimi of ['livia-pilotti-cuet.js', 'livia-puheeleet-lataus.js']) {
    assert.ok(build.includes(`'js/${nimi}'`));
    assert.ok(sw.includes(`'./js/${nimi}'`));
  }
  assert.ok(build.indexOf("'js/luentareaktiot.js'") < build.indexOf("'js/livia-puheeleet-lataus.js'"));
  assert.ok(build.indexOf("'js/livia-puheeleet-lataus.js'") < build.indexOf("'js/liviapuhe.js'"));
});
