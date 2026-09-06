/*
 * PULUN ÄÄNI — repliikit, tiedostonimet, kaiku ja manifesti.
 *
 * Omistajan tilaus 6.9.2026: Livian valmiiksi kirjoitetut repliikit
 * generoidaan puheeksi (tools/generoi-pulu.mjs), peli soittaa ne
 * kuplan ilmestyessä (js/liviapuhe.js) ja saapumisrepliikit saavat
 * kaikuversion.
 *
 * Nämä testit vartioivat sitä KYTKENTÄÄ, joka ei näy mistään
 * virheilmoituksesta: jos pelin ja työkalun tiedostonimet eriytyvät,
 * ajo maksaa tiedostosta, jota peli ei koskaan hae — eikä mikään
 * kaadu, koska puuttuva äänite on hiljainen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { LIVIAN_AVAUS, MANNERIVIHJE, livianPaljastus } from '../js/livia.js';
import {
  LIVIAN_AANIJUURI, LIVIAN_AANILAHTEET, LIVIAN_AANITETTY_PALJASTUS,
  LIVIAN_SAAPUMISREPLIIKIT, livianAaniNimi, livianAaniOsoite, livianAanitykset,
  livianSaapumisrepliikki, livianSoitettava,
} from '../js/liviapuhe.js';
import {
  TAGIT, ampariKansio, ilmanTageja, kokoaManifesti, puhemuoto, repliikit,
  valitseRepliikit,
} from '../tools/generoi-pulu.mjs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------- repliikit ja tiedostonimet ---------- */

test('jokaisella repliikillä on oma tiedostonimi', () => {
  const rivit = repliikit();
  // Viisi avausta, kaksi paljastusta, yksi mannerivihje.
  assert.equal(rivit.length, LIVIAN_AVAUS.length + 2 + 1);
  for (const rivi of rivit) {
    assert.match(rivi.nimi, /^livia-(avaus|paljastus|mannerivihje)-\d+\.mp3$/,
      `${rivi.avain}: tiedostonimi ei ole muotoa livia-<lähde>-<indeksi>.mp3`);
    assert.ok(rivi.teksti.length > 0, `${rivi.avain}: teksti puuttuu`);
    assert.equal(rivi.merkit, rivi.teksti.length);
  }
  const nimet = rivit.map((rivi) => rivi.nimi);
  assert.equal(new Set(nimet).size, nimet.length, 'tiedostonimet eivät ole yksikäsitteisiä');
});

test('nimi johdetaan lähteestä ja indeksistä samalla funktiolla', () => {
  assert.equal(livianAaniNimi('avaus', 0), 'livia-avaus-1.mp3');
  assert.equal(livianAaniNimi('paljastus', 1), 'livia-paljastus-2.mp3');
  assert.equal(livianAaniNimi('avaus', 0, { kaiku: true }), 'livia-avaus-1-kaiku.mp3');
  // Tuntematon lähde tai kelvoton indeksi ei saa keksiä nimeä.
  assert.equal(livianAaniNimi('kupla', 0), null);
  assert.equal(livianAaniNimi('avaus', -1), null);
  assert.equal(livianAaniNimi('avaus', 1.5), null);
  assert.deepEqual(LIVIAN_AANILAHTEET, ['avaus', 'paljastus', 'mannerivihje']);
});

test('äänen osoite osoittaa ämpärin pulukansioon', () => {
  assert.equal(LIVIAN_AANIJUURI.endsWith('aanet/pulu/'), true);
  assert.equal(ampariKansio(), 'aanet/pulu');
  assert.equal(livianAaniOsoite('mannerivihje', 0),
    `${LIVIAN_AANIJUURI}livia-mannerivihje-1.mp3`);
  assert.equal(livianAaniOsoite('kupla', 0), null);
});

/* ---------- kaiku ---------- */

test('kaikuversio on vain saapumisrepliikeillä', () => {
  const rivit = repliikit();
  const kaiulliset = rivit.filter((rivi) => rivi.kaikuNimi).map((rivi) => rivi.avain);
  // Livia saapuu kahdesti: avauksessa hän lennähtää mukaan ja
  // paljastuksessa hän tulee sähkeen kanssa.
  assert.deepEqual(kaiulliset, ['avaus-1', 'paljastus-1']);
  for (const rivi of rivit) {
    assert.equal(rivi.saapuu, Boolean(rivi.kaikuNimi),
      `${rivi.avain}: saapuu-lippu ja kaikuversio ovat eri mieltä`);
    // Peli soittaa saapumisrepliikistä kaikuversion, muista kuivan.
    assert.equal(livianSoitettava(rivi.lahde, rivi.indeksi),
      rivi.kaikuNimi ?? rivi.nimi);
  }
  assert.equal(livianSaapumisrepliikki('avaus', 1), false);
  assert.equal(livianSaapumisrepliikki('mannerivihje', 0), false);
  assert.deepEqual(LIVIAN_SAAPUMISREPLIIKIT, { avaus: [0], paljastus: [0] });
});

/* ---------- tagit ---------- */

/*
 * V2-MALLILLA PUHE ON PUHDASTA TEKSTIÄ (omistaja 6.9.2026: "v2 versio
 * on parempi tälle äänelle, eli ei tule ollenkaan ohjausmerkkejä").
 * Tagit ovat yhä taulussa v3-kokeilua varten, mutta mallille lähtevä
 * teksti on täsmälleen kaanoni — hakasulku puheessa luettaisiin ääneen.
 */
test('v2-mallille lähtee kaanonin teksti ilman tageja; tagitaulu säilyy v3:lle', () => {
  for (const rivi of repliikit()) {
    assert.ok(TAGIT[rivi.avain], `${rivi.avain}: elävöitystagit puuttuvat taulusta`);
    assert.equal(rivi.puhe, rivi.teksti, `${rivi.avain}: puhemuodossa on ohjausmerkkejä`);
    assert.ok(!/\[[^\]]+\]/.test(rivi.puhe), `${rivi.avain}: hakasulkutagi puheessa`);
    // Tagitus on yhä kaanonia kunnioittava, jos v3 otetaan takaisin.
    const tagitettu = puhemuoto(rivi.teksti, TAGIT[rivi.avain]);
    assert.notEqual(tagitettu, rivi.teksti);
    assert.equal(ilmanTageja(tagitettu), rivi.teksti,
      `${rivi.avain}: tagien poisto ei palauta kaanonista tekstiä`);
  }
});

test('puuttuva tagiankkuri kaataa ennen maksullista kutsua', () => {
  assert.throws(
    () => puhemuoto('Hei, odotas kaveri.', { kohdat: [['tätä sanaa ei ole', '[amused]']] }),
    /ankkuri/,
  );
});

/* ---------- manifesti ---------- */

test('manifestin muoto on täysi ja kestot tulevat ajosta', () => {
  const rivit = repliikit();
  const kestot = new Map([['avaus-1', { kesto: 3.4, kaikuKesto: 3.6 }]]);
  const manifesti = kokoaManifesti(rivit, kestot);
  assert.equal(manifesti.versio, 1);
  assert.equal(manifesti.kansio, 'aanet/pulu');
  assert.match(manifesti.paivitetty, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(manifesti.repliikit.length, rivit.length);
  for (const rivi of manifesti.repliikit) {
    for (const kentta of ['avain', 'lahde', 'teksti', 'tiedosto']) {
      assert.ok(rivi[kentta], `manifestin rivistä ${rivi.avain} puuttuu ${kentta}`);
    }
    assert.equal(typeof rivi.merkit, 'number');
    assert.equal(typeof rivi.saapuu, 'boolean');
    assert.equal(rivi.saapuu, Boolean(rivi.kaiku));
  }
  const eka = manifesti.repliikit[0];
  assert.equal(eka.avain, 'avaus-1');
  assert.equal(eka.kesto, 3.4);
  assert.equal(eka.kaikuKesto, 3.6);
  // Repliikki, jota tässä ajossa ei generoitu, on manifestissa
  // kestoltaan tyhjä eikä puutu kokonaan.
  assert.equal(manifesti.repliikit.at(-1).kesto, null);
});

test('repliikkivalinta tunnistaa tuntemattoman avaimen', () => {
  const kaikki = repliikit();
  const { tyot, tuntemattomat } = valitseRepliikit(kaikki, ['avaus-2', 'pulu-9']);
  assert.deepEqual(tyot.map((rivi) => rivi.avain), ['avaus-2']);
  assert.deepEqual(tuntemattomat, ['pulu-9']);
  assert.equal(valitseRepliikit(kaikki, []).tyot.length, kaikki.length);
});

/* ---------- kytkentä peliin ---------- */

test('paljastus äänitetään sillä variantilla, jonka peli soittaa', () => {
  const teksti = livianPaljastus(LIVIAN_AANITETTY_PALJASTUS);
  const rivit = repliikit().filter((rivi) => rivi.lahde === 'paljastus');
  assert.deepEqual(rivit.map((rivi) => rivi.teksti), teksti);
  // Aloitusreitti on kaanonissa Ateena (LIVIAN_AVAUS: "Ateenasta se
  // alkaa"), joten äänitetty variantti on Kreikka/Ateena.
  assert.equal(LIVIAN_AANITETTY_PALJASTUS.maahan, 'Kreikkaan');
  assert.equal(LIVIAN_AANITETTY_PALJASTUS.paikassa, 'Ateenassa');
  const livia = lue('../js/liviapuhe.js');
  assert.match(livia, /lahde === 'paljastus'/,
    'muu maa kuin äänitetty jää hiljaiseksi (soitaLivianAani)');
});

test('js/livia.js soittaa jokaisen kuplan äänen', () => {
  const livia = lue('../js/livia.js');
  assert.match(livia, /import \{ soitaLivianAani, pysaytaLivianAani \} from '\.\/liviapuhe\.js';/);
  assert.match(livia, /soitaLivianAani\(ui, 'avaus', i\);/);
  assert.match(livia, /soitaLivianAani\(ui, 'paljastus', i, variantti\);/);
  assert.match(livia, /soitaLivianAani\(ui, 'mannerivihje', 0\);/);
  // Kupla ensin, ääni sen jälkeen: äänen soitto on kuplan
  // onnistumisen jälkeisellä polulla.
  assert.ok(livia.indexOf('const nakyi = polloAvauskupla')
    < livia.indexOf("soitaLivianAani(ui, 'avaus', i)"));
  // Viimeinen repliikki saa puhua loppuun: itsestään päättyvä sarja ei
  // vaienna ääntä, keskeytys vaientaa.
  assert.match(livia, /lopetaAvaus\(\{ vaienna: false \}\);/);
  assert.match(livia, /function lopetaAvaus\(\{ vaienna = true \} = \{\}\) \{[\s\S]{0,300}if \(vaienna\) pysaytaLivianAani\(avauksenUi\);/);
});

test('mannerivihje ja avaus käyttävät samoja repliikkejä kuin äänitteet', () => {
  const rivit = repliikit();
  assert.deepEqual(rivit.filter((r) => r.lahde === 'avaus').map((r) => r.teksti),
    LIVIAN_AVAUS.map((t) => t.trim()));
  assert.equal(rivit.at(-1).teksti, MANNERIVIHJE.trim());
});

test('uusi moduuli on niputus- ja esilatauslistoilla', () => {
  const build = lue('../tools/build-standalone.mjs');
  const sw = lue('../sw.js');
  assert.ok(build.includes("'js/liviapuhe.js'"), 'js/liviapuhe.js puuttuu MODULES-listalta');
  assert.ok(sw.includes("'./js/liviapuhe.js'"), 'js/liviapuhe.js puuttuu sw.js:n SHELL-listalta');
  // Riippuvuus ennen tuojaansa: liviapuhe ennen liviaa.
  assert.ok(build.indexOf("'js/liviapuhe.js'") < build.indexOf("'js/livia.js'"));
});

test('äänitykset kestävät tyhjän ja vajaan syötteen', () => {
  assert.deepEqual(livianAanitykset(), []);
  assert.deepEqual(livianAanitykset({ avaus: ['', '  '] }), []);
  const yksi = livianAanitykset({ mannerivihje: ['Kuule.'] });
  assert.equal(yksi.length, 1);
  assert.equal(yksi[0].saapuu, false);
  assert.equal(yksi[0].kaikuNimi, null);
});
