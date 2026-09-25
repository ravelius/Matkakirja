/**
 * RAAKAVIENTI ON PAKOLLINEN KAIKISSA ÄÄNIPUTKISSA.
 *
 * Omistajan sitova sääntö 14.9.2026 (Raamattu: "ALKUPERÄISET
 * ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA"): jokaisen maksullisen generoinnin
 * raakatuotos viedään ämpäriin versionoituun avaimeen ENNEN käsittelyä,
 * kuitti kirjaa avaimen ja sha256:n, raakaa ei koskaan ylikirjoiteta,
 * ja ajo joka ei tallenna raakaa on virheellinen: työkalun pitää
 * KIELTÄYTYÄ generoinnista, ei jatkaa hiljaa.
 *
 * Pulun ääniputki ja tehosteputki saivat toteutuksensa omissa
 * PR:issään; tämä vartioi ne seitsemän muuta putkea ja niiden yhteistä
 * moduulia tools/raakavienti.mjs.
 *
 * TÄRKEIN VARTIO on "kielto ennen API-kutsua": jokaisen putken on
 * kieltäydyttävä ennen kuin yhtäkään maksullista kutsua on tehty.
 * Viidellä putkella se todennetaan AJAMALLA työkalu oikeasti — kielto
 * tulee, paluukoodi on 1, eikä tuloste kerro generoinnin alkaneen.
 * Kahdella (avaus, hihkaisut) ajaminen ei onnistu ilman työnkulun
 * asentamia mpg123-decoder- ja lamejs-paketteja, joten niillä todiste
 * on lähdekoodin järjestys: kielto ennen ensimmäistä fetchiä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  eratunnus, kokoaRaakakuitti, raakaAmpariKansio, raakavientiEste, sha256,
} from '../tools/raakavienti.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const lue = (nimi) => readFileSync(new URL(`../tools/${nimi}`, import.meta.url), 'utf8');

/*
 * Seitsemän putkea, jotka tämä erä kattaa.
 *
 * `aja`     — kieltäytyminen todennetaan KÄYNNISTÄMÄLLÄ työkalu. Avaus
 *             ja hihkaisut lataavat mpg123-decoderin ja lamejs:n jo
 *             moduulitasolla, eivätkä ne ole repon riippuvuuksia
 *             (työnkulku asentaa ne), joten niitä ei voi käynnistää.
 * `jarjestys` — lähdekoodin järjestys kertoo suoritusjärjestyksen.
 *
 * Jälkimmäinen pätee vain suoraan ylhäältä alas ajettaviin skripteihin.
 * Putkissa, joissa on main(), API-kutsu asuu apufunktiossa, joka on
 * tiedostossa ENNEN main()ia — lähdekoodin järjestys ei siis kerro
 * suoritusjärjestystä, ja todiste on ajaminen.
 */
const PUTKET = [
  { nimi: 'generoi-linssiluennat.mjs', argv: [], aja: true, jarjestys: false },
  { nimi: 'generoi-siirtymamusiikki.mjs', argv: ['--laji', 'laiva'], aja: true, jarjestys: false },
  { nimi: 'generoi-musiikki.mjs', argv: ['pohja'], aja: true, jarjestys: false },
  { nimi: 'generoi-kaari.mjs', argv: [], aja: true, jarjestys: true },
  { nimi: 'generoi-kohtaamiset.mjs', argv: ['lontoo'], aja: true, jarjestys: true },
  { nimi: 'generoi-avaus.mjs', argv: [], aja: false, jarjestys: true },
  { nimi: 'generoi-hihkaisut.mjs', argv: [], aja: false, jarjestys: true },
];

// ── kielto ennen API-kutsua, putki kerrallaan ──────────────────────

for (const putki of PUTKET) {
  test(`${putki.nimi}: kielto ennen API-kutsua`, () => {
    const lahde = lue(putki.nimi);

    // 1. Kielto on olemassa. Tämä vaaditaan JOKAISELTA putkelta.
    const kielto = lahde.indexOf('vaadiRaakavienti(');
    assert.ok(kielto > 0, `${putki.nimi} ei kutsu vaadiRaakavientiä lainkaan`);

    // 1b. Suoraan ylhäältä alas ajettavissa skripteissä myös
    //     lähdekoodin järjestys on todiste.
    if (putki.jarjestys) {
      const fetchKohta = lahde.indexOf('await fetch(');
      assert.ok(fetchKohta > 0, `${putki.nimi}: fetch-kutsua ei löytynyt — testi on vanhentunut`);
      assert.ok(kielto < fetchKohta,
        `${putki.nimi}: kielto on tarkistettava ENNEN ensimmäistä maksullista kutsua`);
    }

    // 2. Raaka viedään ämpäriin, ja kuitti kootaan.
    assert.match(lahde, /vieRaaka\(/, `${putki.nimi} ei vie raakaa ämpäriin`);
    assert.match(lahde, /kokoaRaakakuitti\(/, `${putki.nimi} ei kokoa kuittia`);

    if (!putki.aja) return;

    // 3. Ja kun työkalu oikeasti käynnistetään ilman vientiä, se
    //    kaatuu paluukoodilla 1 eikä tee yhtäkään verkkopyyntöä.
    const ajo = spawnSync(process.execPath, [`tools/${putki.nimi}`, ...putki.argv, '--ei-vientia'], {
      cwd: JUURI,
      encoding: 'utf8',
      env: {
        ...process.env, ELEVEN_API_KEY: 'testi', ELEVENLABS_API_KEY: 'testi',
        GOOGLE_API_KEY: 'testi', GEMINI_API_KEY: 'testi',
      },
    });
    assert.equal(ajo.status, 1, `${putki.nimi} ei kaatunut: ${ajo.stdout}${ajo.stderr}`);
    const tuloste = `${ajo.stdout}${ajo.stderr}`;
    assert.match(tuloste, /raakavient/i,
      `${putki.nimi} kaatui, mutta muusta syystä kuin raakavientiin`);
    // Eikä ehtinyt generoida mitään: kielto tuli ennen kutsua.
    assert.doesNotMatch(tuloste, /generoidaan|API:/,
      `${putki.nimi} ehti aloittaa generoinnin ennen kieltoa`);
  });
}

// ── yhteinen moduuli ───────────────────────────────────────────────

test('raakavientiEste päästää kuivan ajon ja vientiajon, kieltää muun', () => {
  assert.equal(raakavientiEste({ kuiva: true, vienti: false }), null);
  assert.equal(raakavientiEste({ kuiva: true, vienti: true }), null);
  assert.equal(raakavientiEste({ kuiva: false, vienti: true }), null);
  assert.equal(raakavientiEste({}), null);
  const este = raakavientiEste({ kuiva: false, vienti: false });
  assert.ok(este);
  assert.match(este, /raakavient/i);
});

test('raaka-avain on eräkohtainen eikä voi ylikirjoittaa toista erää', () => {
  assert.equal(raakaAmpariKansio('audio', 'avaus-aaaa'), 'audio/raaka/avaus-aaaa');
  assert.equal(raakaAmpariKansio('aanet/', 'musiikki-bbbb'), 'aanet/raaka/musiikki-bbbb');
  assert.notEqual(raakaAmpariKansio('audio', 'a-1'), raakaAmpariKansio('audio', 'a-2'));
  // Kelvotonta tunnusta EI siivota kelvolliseksi: siivottu voisi
  // törmätä toisen erän kanssa ja tuhota sen alkuperäisen.
  assert.throws(() => raakaAmpariKansio('audio', '../live'), /erätunnu/);
  assert.throws(() => raakaAmpariKansio('audio', ''), /erätunnu/);
  assert.throws(() => raakaAmpariKansio('../..', 'avaus-aaaa'), /ämpärikansio/);
});

test('erätunnus on deterministinen ja sidottu reseptiin', () => {
  const resepti = { sourceCommit: '0'.repeat(40), malli: 'eleven_v3' };
  const a = eratunnus('avaus', resepti);
  assert.match(a, /^avaus-[0-9a-f]{20}$/);
  assert.equal(a, eratunnus('avaus', resepti));
  assert.notEqual(a, eratunnus('avaus', { ...resepti, malli: 'muu' }));
  assert.notEqual(a, eratunnus('kaari', resepti));
  assert.throws(() => eratunnus('avaus', { malli: 'x' }), /sourceCommit/);
  assert.throws(() => eratunnus('Avaus!', resepti), /etuliite/);
});

test('kuitti kirjaa raa\'an avaimen ja sha256:n, eikä salaisuuksia', () => {
  const raaka = {
    fileName: 'raaka-intro-puhe.mp3', objectKey: 'audio/raaka/avaus-x/raaka-intro-puhe.mp3',
    sha256: sha256(Buffer.from('tavut')), bytes: 5,
  };
  const kuitti = kokoaRaakakuitti({
    putki: 'avaus',
    batchId: 'avaus-x',
    sourceCommit: '0'.repeat(40),
    resepti: { model: 'eleven_v3' },
    rivit: [{ fileName: 'intro-puhe.mp3', outputPath: 'assets/audio/intro-puhe.mp3', rawArtifact: raaka }],
  });
  assert.equal(kuitti.schemaVersion, 1);
  assert.equal(kuitti.pipeline, 'avaus');
  assert.equal(kuitti.items.length, 1);
  assert.deepEqual(kuitti.items[0].rawArtifact, raaka);
  assert.equal(kuitti.items[0].status, 'generated');
  assert.doesNotMatch(JSON.stringify(kuitti), /ELEVEN_API_KEY|xi-api-key|R2_SECRET|AWS_SECRET/);
  assert.throws(() => kokoaRaakakuitti({ batchId: 'x' }), /putken nimen/);
  assert.throws(() => kokoaRaakakuitti({ putki: 'avaus' }), /erätunnuksen/);
});

test('vienti varmistetaan luennalla, ei pelkällä kirjoituksella', () => {
  const moduuli = lue('raakavienti.mjs');
  assert.match(moduuli, /raakatiedoston vienti epäonnistui/);
  assert.match(moduuli, /'-I', '--max-time'/, 'HEAD-varmistus puuttuu');
  // Tyhjää tuotosta ei saa viedä hiljaa "onnistuneena".
  assert.match(moduuli, /raakavienti sai tyhjän tuotoksen/);
});

// ── putkikohtaiset erikoistapaukset ────────────────────────────────

test('hihkaisut tallentaa myös hylätyt otokset', () => {
  // Kolme yritystä per tiedosto, jokainen maksettu: yksikään ei saa
  // kadota. Yritysnumero on nimessä, jotta ne eivät kirjoita toistensa
  // päälle, ja hylätyt näkyvät kuitissa omina riveinään.
  const lahde = lue('generoi-hihkaisut.mjs');
  assert.match(lahde, /-otos\$\{yritys\}\.mp3/);
  assert.match(lahde, /status: 'rejected-take'/);
  // Vienti tapahtuu ennen leikkausta ja ennen hylkäyspäätöstä.
  const vienti = lahde.indexOf('otokset.push(raaka)');
  const leikkaus = lahde.indexOf('const leikattu = await leikkaaPuhe(tavut)');
  assert.ok(vienti > 0 && vienti < leikkaus, 'raaka on vietävä ennen leikkausta');
});

test('avaus tallentaa oton ennen hännän hiljaisuustarkistusta', () => {
  // Juuri se tarkistus voi kaataa ajon, ja ilman tätä maksettu otos
  // katoaisi kokonaan.
  const lahde = lue('generoi-avaus.mjs');
  const vienti = lahde.indexOf('const raaka = vieRaaka(tavut,');
  const tarkistus = lahde.indexOf('await tarkistaHanta(tavut)');
  assert.ok(vienti > 0 && vienti < tarkistus, 'raaka on vietävä ennen häntätarkistusta');
  assert.match(lahde, /Maksettu otos on silti tallessa/);
});

test('siirtymämusiikki tallentaa mallin tuotoksen ENNEN loopin ompelua', () => {
  // Valmis raita on ommeltu looppi eli johdettu teos; mallin tuotos
  // ennen ompelua on se, mitä ei saa hukata.
  const lahde = lue('generoi-siirtymamusiikki.mjs');
  const vienti = lahde.indexOf('raakatiedot.set(raita.tiedosto, raaka)');
  const ompelu = lahde.indexOf('} = leikkaaLooppi(lahde, kohde, raita, tyokansio);');
  assert.ok(vienti > 0 && vienti < ompelu, 'raaka on vietävä ennen loopin leikkausta');
});
