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
  LIVIAN_KAUPUNKILAHTEET, LIVIAN_SAAPUMISREPLIIKIT, livianAaniNimi,
  livianAaniOsoite, livianAanitykset, livianKaupunkiAanitetty,
  livianKaupunkiIndeksi, livianSaapumisrepliikki, livianSoitettava,
} from '../js/liviapuhe.js';
import { FOKUSVIRTA_ATEENA } from '../js/packs/fokusvirta-ateena.js';
import { FOKUSVIRTA_SOFIA } from '../js/packs/fokusvirta-sofia.js';
import {
  TAGIT, ampariKansio, ilmanTageja, kaupunginRepliikit, kokoaManifesti,
  puhemuoto, repliikit, valitseRepliikit,
} from '../tools/generoi-pulu.mjs';

/** Ne lähteet, joiden tekstit tulevat js/livia.js:stä (tagitaulu koskee vain näitä). */
const LIVIA_LAHTEET = ['avaus', 'paljastus', 'mannerivihje'];
/** Kaupunkirepliikkejä yhteensä (Ateena 1 + Sofia 7). */
const KAUPUNKIREPLIIKKEJA = Object.values(LIVIAN_KAUPUNKILAHTEET)
  .reduce((summa, kentat) => summa + kentat.length, 0);

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------- repliikit ja tiedostonimet ---------- */

test('jokaisella repliikillä on oma tiedostonimi', () => {
  const rivit = repliikit();
  // Viisi avausta, kaksi paljastusta, yksi mannerivihje + kaupungit.
  assert.equal(rivit.length, LIVIAN_AVAUS.length + 2 + 1 + KAUPUNKIREPLIIKKEJA);
  const lahteet = LIVIAN_AANILAHTEET.join('|');
  for (const rivi of rivit) {
    assert.match(rivi.nimi, new RegExp(`^livia-(${lahteet})-\\d+\\.mp3$`),
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
  assert.deepEqual(LIVIAN_AANILAHTEET,
    ['avaus', 'paljastus', 'mannerivihje', 'ateena', 'sofia']);
});

/* ---------- kaupunkikohtaiset lähteet (Ateena ja Sofia ensin) ---------- */

test('kaupunkirepliikki nimetään kaupungista ja kentän järjestyksestä', () => {
  // Ateenassa vain maadoitus; Sofiassa maadoitus + kuusi sähkevaihetta.
  assert.deepEqual(LIVIAN_KAUPUNKILAHTEET.ateena, ['maadoitus']);
  assert.deepEqual(LIVIAN_KAUPUNKILAHTEET.sofia,
    ['maadoitus', 'johdanto', 'vinkki', 'linkkiSaate', 'oikein', 'odotus', 'paluu']);
  assert.equal(livianKaupunkiIndeksi('ateena', 'maadoitus'), 0);
  assert.equal(livianKaupunkiIndeksi('sofia', 'paluu'), 6);
  assert.equal(livianAaniNimi('ateena', 0), 'livia-ateena-1.mp3');
  assert.equal(livianAaniNimi('sofia', 6), 'livia-sofia-7.mp3');
  // Äänittämätön kaupunki tai kenttä on hiljainen, ei arvattu nimi.
  assert.equal(livianKaupunkiIndeksi('venetsia', 'maadoitus'), null);
  assert.equal(livianKaupunkiIndeksi('ateena', 'paluu'), null);
  assert.equal(livianKaupunkiAanitetty('sofia', 'vinkki'), true);
  assert.equal(livianKaupunkiAanitetty('sofia', ''), false);
  assert.equal(livianAaniNimi('venetsia', 0), null);
});

test('kaupunkirepliikkien tekstit luetaan pakkauksista, ei kopioida', () => {
  const sofia = FOKUSVIRTA_SOFIA.sahketehtava;
  assert.deepEqual(kaupunginRepliikit('ateena'), [FOKUSVIRTA_ATEENA.pollo.maadoitus]);
  assert.deepEqual(kaupunginRepliikit('sofia'), [
    FOKUSVIRTA_SOFIA.pollo.maadoitus, sofia.johdanto, sofia.vinkki,
    sofia.linkkiSaate, sofia.oikein, sofia.odotus, sofia.paluu,
  ]);
  assert.deepEqual(kaupunginRepliikit('venetsia'), []);
  const rivit = repliikit();
  const avaimet = rivit.filter((rivi) => LIVIAN_KAUPUNKILAHTEET[rivi.lahde])
    .map((rivi) => rivi.avain);
  assert.deepEqual(avaimet, ['ateena-1', 'sofia-1', 'sofia-2', 'sofia-3',
    'sofia-4', 'sofia-5', 'sofia-6', 'sofia-7']);
  // Teksti on pakkauksen teksti merkilleen — kaanonia ei muotoilla.
  assert.equal(rivit.find((rivi) => rivi.avain === 'sofia-7').teksti, sofia.paluu.trim());
});

test('kaupunkirepliikki mahtuu pinoutuvaan puheenvuoroon', () => {
  // Puheenvuoron osat eivät korvaa toisiaan, joten näkyvä aika on
  // osien lukuaikojen summa (tools/generoi-pulu.mjs nakyvaAika).
  for (const rivi of repliikit()) {
    if (!LIVIAN_KAUPUNKILAHTEET[rivi.lahde]) continue;
    assert.ok(rivi.kuplaSekunteina >= rivi.arvioSekunteina,
      `${rivi.avain}: puhe (${rivi.arvioSekunteina} s) ei mahdu kuplien `
      + `näkyvään aikaan (${rivi.kuplaSekunteina} s)`);
  }
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
  // Kaupunkirepliikeistä vain Sofian paluu: se on ainoa, jossa Livia
  // oikeasti palaa lennolta ja aloittaa puheensa jo ilmasta.
  assert.deepEqual(kaiulliset, ['avaus-1', 'paljastus-1', 'sofia-7']);
  for (const rivi of rivit) {
    assert.equal(rivi.saapuu, Boolean(rivi.kaikuNimi),
      `${rivi.avain}: saapuu-lippu ja kaikuversio ovat eri mieltä`);
    // Peli soittaa saapumisrepliikistä kaikuversion, muista kuivan.
    assert.equal(livianSoitettava(rivi.lahde, rivi.indeksi),
      rivi.kaikuNimi ?? rivi.nimi);
  }
  assert.equal(livianSaapumisrepliikki('avaus', 1), false);
  assert.equal(livianSaapumisrepliikki('mannerivihje', 0), false);
  assert.equal(livianSaapumisrepliikki('sofia', 0), false);
  assert.equal(livianSaapumisrepliikki('ateena', 0), false);
  assert.deepEqual(LIVIAN_SAAPUMISREPLIIKIT, { avaus: [0], paljastus: [0], sofia: [6] });
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
    assert.equal(rivi.puhe, rivi.teksti, `${rivi.avain}: puhemuodossa on ohjausmerkkejä`);
    assert.ok(!/\[[^\]]+\]/.test(rivi.puhe), `${rivi.avain}: hakasulkutagi puheessa`);
    /*
     * TAGITAULUA VAADITAAN VAIN js/livia.js:n LÄHTEILTÄ. Kaupunkien
     * repliikit (ateena, sofia) syntyivät v2-mallin aikaan, jolloin
     * mallille ei lähetetä tageja lainkaan — taulua ei siis ole eikä
     * sitä tarvita. Kolmelle vanhalle lähteelle tagitus on yhä
     * kaanonia kunnioittava, jos v3 otetaan takaisin.
     */
    if (!LIVIA_LAHTEET.includes(rivi.lahde)) continue;
    assert.ok(TAGIT[rivi.avain], `${rivi.avain}: elävöitystagit puuttuvat taulusta`);
    const tagitettu = puhemuoto(rivi.teksti, TAGIT[rivi.avain]);
    assert.notEqual(tagitettu, rivi.teksti);
    assert.equal(ilmanTageja(tagitettu), rivi.teksti,
      `${rivi.avain}: tagien poisto ei palauta kaanonista tekstiä`);
  }
  // Tagitaulu ei saa paisua kaupunkilähteille: v2 ei niitä lue.
  for (const avain of Object.keys(TAGIT)) {
    assert.ok(LIVIA_LAHTEET.includes(avain.replace(/-\d+$/, '')),
      `TAGIT: ${avain} ei ole js/livia.js:n lähde`);
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
  // Kaupunkirepliikit ovat manifestissa mukana omilla tiedostoillaan.
  assert.ok(manifesti.repliikit.some((rivi) => rivi.tiedosto === 'livia-ateena-1.mp3'));
  assert.equal(manifesti.repliikit.find((rivi) => rivi.avain === 'sofia-7').kaiku,
    'livia-sofia-7-kaiku.mp3');
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
  assert.equal(rivit.find((r) => r.lahde === 'mannerivihje').teksti, MANNERIVIHJE.trim());
});

test('js/fokusvirta.js soittaa Ateenan ja Sofian repliikit', () => {
  const virta = lue('../js/fokusvirta.js');
  assert.match(virta,
    /import \{ livianKaupunkiAanitetty, soitaLivianKaupunkiAani \} from '\.\/liviapuhe\.js';/);
  // Jokaiselle Sofian äänitetylle kentälle on kutsu — kupla ja ääni
  // eivät saa eriytyä.
  for (const kentta of ['vinkki', 'linkkiSaate', 'oikein', 'paluu']) {
    assert.ok(virta.includes(`soitaLivianKaupunkiAani(ui, city.id, '${kentta}')`),
      `js/fokusvirta.js: Sofian ${kentta} jää ilman ääntä`);
  }
  // Johdanto ja odotus kulkevat sähkesaatteen kautta: kenttä välitetään
  // sinne nimenä ja saate soittaa sen.
  assert.match(virta, /sahkeSaateKuplaan\(ui, city, avain, tehtava\.johdanto \?\? '', 'johdanto'\)/);
  assert.match(virta, /'odotus'\);/, 'odotuksen kenttänimi puuttuu sähkesaatteesta');
  assert.match(virta, /soitaLivianKaupunkiAani\(ui, city\.id, kentta\)/,
    'maadoituksen ääni puuttuu saapumiskuplasta');
  assert.match(virta, /soitaLivianKaupunkiAani\(ui, city\?\.id, kentta\)/,
    'sähkesaatteen ääni puuttuu');
  // ÄÄNI SEURAA KUPLAA: soitto on kuplan onnistumisen takana.
  assert.match(virta, /if \(nakyi\) soitaLivianKaupunkiAani/);
  /*
   * KUPLA ODOTTAA PUHEEN LOPPUUN. Äänitetty puheenvuoro etenee kuplan
   * lukuajalla (js/livia.js livianKuplanLukuaika) eikä nopeammalla
   * perusrytmillä — sama sääntö kuin avauksessa.
   */
  assert.match(virta, /function livianPuherytmi\(kaupunkiId, kentta\) \{[\s\S]{0,200}livianKuplanLukuaika/);
  assert.match(virta, /import \{ livianKuplanLukuaika, livianPaljastusKesken \} from '\.\/livia\.js';/);
  // Sähkelento odottaa kuittauksen puheen loppuun ennen paluukuplaa.
  assert.match(virta, /const lento = livianKaupunkiAanitetty\(city\.id, 'oikein'\)/);
  const pollo = lue('../js/pollo.js');
  assert.match(pollo, /naytaPuheenvuoro\(osat, \{[\s\S]{0,160}viive = null,/);
  assert.match(pollo, /tila\.viive[\s\S]{0,120}PUHEENVUORON_VIIVE_ALA/);
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
