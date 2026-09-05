/*
 * Musiikkiraitojen leikkauslogiikka (tools/generoi-siirtymamusiikki.mjs)
 * ja pelin lajitaulukko (js/siirtymamusiikki.js).
 *
 * Raita on saumaton looppi vain jos leikkauksen kolme palaa osuvat
 * yhteen SEKUNNIN MURTO-OSAN tarkkuudella: hännän on alettava tasan
 * siitä, mihin keski loppuu, ja häivytyksen päätyttävä tasan siihen,
 * mistä keski alkaa (työkalun otsikko "MITEN SAUMA TEHDÄÄN"). Yksikään
 * ajo ei paljastaisi virhettä siinä laskennassa — mp3 syntyisi,
 * mittarit näyttäisivät oikeaa kestoa ja tasoa, ja vika kuuluisi vasta
 * pelissä naksahduksena joka kierroksella. Siksi laskenta on puhtaita
 * funktioita ja vartioitu täällä.
 *
 * Toinen vartioitava asia on NIMET: peli hakee tiedostot nimeltä
 * ämpärin aanet/-kansiosta (js/siirtymamusiikki.js RAIDAT). Jos
 * työkalu kirjoittaisi eri nimen, ajo näyttäisi onnistuvan ja peli
 * jäisi hiljaiseksi — puuttuva raita on siellä normaali tila eikä
 * virhe.
 *
 * Kolmas on LAJITAULUKKO (omistajan tilaus 2.9.2026 ilta, linssin oma
 * musiikki): siirtymät ja linssiraidat asuvat samassa taulukossa
 * molemmin puolin, ja niiden on pysyttävä samana. Erityisesti
 * "kaikki" saa tarkoittaa VAIN siirtymäraitoja — linssiraidan
 * generointi uudestaan maksaisi turhaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  GENEROITAVA_MS, LAJIT, MOOTTORIT, hiljaisuusVirheet, kestoRajat, lahdeMs, looppiLeikkaus,
  looppiSuodatin, raidanTiedosto, tulkitseArgumentit, tulkitseEbur128, tulkitseLoudnorm, valitseLajit,
} from '../tools/generoi-siirtymamusiikki.mjs';
import * as lyria from '../tools/lyria.mjs';

const TYOKALU = readFileSync(
  new URL('../tools/generoi-siirtymamusiikki.mjs', import.meta.url), 'utf8',
);
const PELI = readFileSync(new URL('../js/siirtymamusiikki.js', import.meta.url), 'utf8');

/* --- 1. leikkaus --------------------------------------------------- */

test('leikkaus otetaan lähteen keskeltä ja on tasan tilatun mittainen', () => {
  const { alku, looppi, risti } = looppiLeikkaus({ lahde: 24.03, looppi: 12, risti: 1.5 });
  assert.equal(looppi, 12);
  assert.equal(risti, 1.5);
  // Käytetty pala on L + R = 13,5 s, joten molemmin puolin jää 5,265 s.
  assert.ok(Math.abs(alku - 5.265) < 1e-9, `alku ${alku}`);
  // Leikkaus ei saa koskaan yltää lähteen ulkopuolelle.
  assert.ok(alku + looppi + risti <= 24.03 + 1e-9);
});

test('lyhyt lähde kaventaa ensin ristiä, ei loopin vähimmäiskestoa', () => {
  // 11 s lähteestä ei saa 12 s looppia: looppi kutistuu vähimmäismittaan
  // (10 s) ja risti saa lopun — ei toisin päin.
  const { alku, looppi, risti } = looppiLeikkaus({ lahde: 11, looppi: 12, risti: 1.5 });
  assert.equal(looppi, 10);
  assert.ok(Math.abs(risti - 1) < 1e-9, `risti ${risti}`);
  assert.ok(Math.abs(alku) < 1e-9, `alku ${alku}`);
});

test('liian lyhyt lähde kaataa leikkauksen eikä tuota vajaata looppia', () => {
  assert.throws(() => looppiLeikkaus({ lahde: 10.2, looppi: 12, risti: 1.5 }), /liian lyhyt/);
  assert.throws(() => looppiLeikkaus({ lahde: 0, looppi: 12, risti: 1.5 }), /kesto puuttuu/);
});

test('risti ei voi olla looppia pidempi', () => {
  assert.throws(() => looppiLeikkaus({ lahde: 24, looppi: 1.5, risti: 1.5 }),
    /lyhyempi kuin ristihäivytys/);
});

/* --- 2. suodatin --------------------------------------------------- */

test('suodattimen kolme palaa ovat vierekkäiset eivätkä mene päällekkäin', () => {
  const leikkaus = looppiLeikkaus({ lahde: 24, looppi: 16, risti: 2 });
  const suodatin = looppiSuodatin(leikkaus);
  const trimit = [...suodatin.matchAll(/atrim=start=([\d.]+):end=([\d.]+)/g)]
    .map(([, a, b]) => [Number(a), Number(b)]);
  assert.equal(trimit.length, 3, 'kolme palaa: pää, häntä, keski');
  const [paa, hanta, keski] = trimit;
  const { alku, looppi, risti } = leikkaus;
  assert.deepEqual(paa, [alku, alku + risti], 'pää = loopin ensimmäiset R sekuntia');
  assert.deepEqual(keski, [alku + risti, alku + looppi], 'keski jatkaa päästä');
  assert.deepEqual(hanta, [alku + looppi, alku + looppi + risti],
    'häntä alkaa tasan siitä, mihin keski loppuu — muuten sauma naksahtaa');
});

test('sauma ommellaan afade+amixilla, ei acrossfadella', () => {
  const suodatin = looppiSuodatin({ alku: 3, looppi: 16, risti: 2 });
  // acrossfade palauttaa tyhjän raidan, kun syöte on tasan häivytyksen
  // mittainen (ffmpeg 6.1.1) — juuri tämä tapaus.
  assert.ok(!suodatin.includes('acrossfade'), 'acrossfade ei kelpaa tähän');
  assert.ok(suodatin.includes('afade=t=in:st=0:d=2.000:curve=qsin'));
  assert.ok(suodatin.includes('afade=t=out:st=0:d=2.000:curve=qsin'));
  // normalize=0: amix ei saa puolittaa tasoa summatessaan.
  assert.ok(suodatin.includes('amix=inputs=2:duration=shortest:normalize=0'));
  // Mono ja 44,1 kHz jo ennen leikkausta, ks. aanet.md formaattivaatimus.
  assert.ok(suodatin.includes('channel_layouts=mono'));
  assert.ok(suodatin.includes('sample_rates=44100'));
});

/* --- 3. mittarien tulkinta ----------------------------------------- */

test('loudnormin JSON luetaan lokin lopusta', () => {
  const loki = 'Input #0, wav\n[Parsed_loudnorm_0 @ 0x1] \n'
    + '{\n\t"input_i" : "-25.35",\n\t"input_tp" : "-17.99",\n'
    + '\t"input_lra" : "0.70",\n\t"target_offset" : "0.03"\n}\n';
  assert.equal(tulkitseLoudnorm(loki).taso, -25.35);
  assert.equal(tulkitseLoudnorm('ei jsonia'), null);
  assert.equal(tulkitseLoudnorm('{ "input_i" : "N/A" }'), null);
});

test('ebur128:sta otetaan yhteenvedon viimeinen integroitu taso', () => {
  const loki = '[Parsed_ebur128_0] t: 1 M: -30.0 S: -30.0 I: -29.0 LUFS\n'
    + 'Summary:\n\n  Integrated loudness:\n    I:         -33.4 LUFS\n'
    + '    Threshold: -43.4 LUFS\n';
  assert.equal(tulkitseEbur128(loki), -33.4);
  assert.equal(tulkitseEbur128('ei mittausta'), null);
});

test('hiljaisuus päissä erotetaan hiljaisuudesta keskellä', () => {
  const alussa = hiljaisuusVirheet('silence_start: 0.0\nsilence_end: 0.9\n', 12);
  assert.equal(alussa.paissa.length, 1);
  assert.equal(alussa.keskella.length, 0);

  // Ilman silence_end-riviä jakso jatkuu tiedoston loppuun asti.
  const lopussa = hiljaisuusVirheet('silence_start: 11.4\n', 12);
  assert.equal(lopussa.paissa.length, 1);
  assert.equal(lopussa.paissa[0].loppu, 12);

  const keskella = hiljaisuusVirheet('silence_start: 5.0\nsilence_end: 5.4\n', 12);
  assert.equal(keskella.paissa.length, 0);
  assert.equal(keskella.keskella.length, 1);

  assert.deepEqual(hiljaisuusVirheet('', 12), { paissa: [], keskella: [] });
});

/* --- 4. liput ------------------------------------------------------ */

test('--laji on pakollinen ja tuntematon nimi torjutaan', () => {
  assert.match(tulkitseArgumentit([]).virhe, /--laji puuttuu/);
  assert.match(tulkitseArgumentit(['--laji']).virhe, /ilman arvoa/);
  assert.match(tulkitseArgumentit(['--hupsis']).virhe, /tuntematon argumentti/);
  assert.equal(valitseLajit('hupsis'), null);
  assert.deepEqual(valitseLajit('laiva'), ['laiva']);
  assert.deepEqual(valitseLajit('keksinnot'), ['keksinnot']);
});

test('"kaikki" on vain siirtymäryhmä — linssiraita pyydetään nimeltä', () => {
  /*
   * Jos linssiraita luiskahtaisi "kaikki"-valintaan, jokainen
   * siirtymäraitojen ajo maksaisi yhden ylimääräisen kutsun ja
   * ylikirjoittaisi valmiin raidan ämpärissä.
   */
  assert.deepEqual(valitseLajit('kaikki'), ['jalan', 'laiva', 'lento']);
  for (const nimi of valitseLajit('kaikki')) assert.equal(LAJIT[nimi].ryhma, 'siirtyma');
  assert.equal(LAJIT.keksinnot.ryhma, 'linssi');
  // Toinen aikajanalinssi sai oman raitansa 5.9.2026 (ihmisen matka).
  assert.equal(LAJIT['ihmisen-matka'].ryhma, 'linssi');
  assert.deepEqual(valitseLajit('ihmisen-matka'), ['ihmisen-matka']);
  for (const linssiraita of ['keksinnot', 'ihmisen-matka']) {
    assert.ok(!valitseLajit('kaikki').includes(linssiraita), `${linssiraita} luiskahti "kaikki"-valintaan`);
  }
});

test('Lyria-haku tulee yhteisestä moduulista eikä kopiona', () => {
  /*
   * Omistajan linjaus 5.9.2026 illalla: *"kaikki musiikki lyrialla"* —
   * myös musiikkipaletti (tools/generoi-musiikki.mjs). Kaksi kopiota
   * Gemini API:n vastausrakenteen etsinnästä olisi kaksi paikkaa,
   * jotka pitäisi muistaa korjata yhdessä, joten haku asuu
   * moduulissa tools/lyria.mjs ja molemmat työkalut tuovat sen.
   * Identiteettivertailu: kopio olisi eri funktio, vaikka koodi olisi
   * merkki merkiltä sama.
   */
  assert.equal(raidanTiedosto, lyria.raidanTiedosto);
  assert.deepEqual(MOOTTORIT, lyria.MOOTTORIT);
  assert.match(TYOKALU, /from '\.\/lyria\.mjs'/);
  assert.doesNotMatch(TYOKALU, /generativelanguage\.googleapis\.com/,
    'Lyrian osoite on kopioitu takaisin työkaluun — se kuuluu tools/lyria.mjs:ään');
  assert.doesNotMatch(TYOKALU, /async function haeLyriasta/,
    'työkalulla on taas oma kopio Lyria-hausta');
});

test('--kuiva ja --ei-vientia luetaan lipuiksi', () => {
  const liput = tulkitseArgumentit(['--laji', 'kaikki', '--kuiva', '--ei-vientia']);
  assert.equal(liput.virhe, undefined);
  assert.deepEqual(liput, { laji: 'kaikki', kuiva: true, vienti: false, moottori: 'lyria' });
  assert.equal(tulkitseArgumentit(['--laji', 'jalan']).vienti, true);
  // Lyria on pelin moottori (omistaja 5.9.2026); eleven jää vertailuun.
  assert.equal(tulkitseArgumentit(['--laji', 'jalan', '--moottori', 'eleven']).moottori, 'eleven');
  assert.equal(tulkitseArgumentit(['--laji', 'jalan', '--moottori', 'lyria']).moottori, 'lyria');
  assert.match(tulkitseArgumentit(['--laji', 'jalan', '--moottori', 'suno']).virhe, /--moottori/);
});

/* --- 5. kytkentä peliin ja vaatimuksiin ---------------------------- */

test('työkalu kirjoittaa tasan ne tiedostot, jotka peli hakee', () => {
  // Peli soittaa Lyrian raidat (pääte -lyria, omistaja 5.9.2026): työkalun
  // oletusmoottori kirjoittaa tasan ne nimet.
  // Lajin nimessä saa olla väliviiva (linssi-ihmisen-matka-lyria.mp3).
  const pelinNimet = [...PELI.matchAll(/aanet\/((?:siirtyma|linssi)-[a-z-]+-lyria\.mp3)/g)].map((m) => m[1]);
  assert.equal(pelinNimet.length, 5, 'peli hakee viisi raitaa ämpärin aanet/-kansiosta');
  const tyokalunNimet = Object.values(LAJIT).map((r) => raidanTiedosto(r, tulkitseArgumentit(['--laji', 'kaikki']).moottori));
  assert.deepEqual([...tyokalunNimet].sort(), [...pelinNimet].sort());
  // Siirtymälajit ovat työkalun siirtymäryhmä, samassa järjestyksessä.
  const lajit = PELI.match(/export const SIIRTYMALAJIT = \[([^\]]+)\]/)[1]
    .match(/'([a-z]+)'/g).map((s) => s.replaceAll("'", ''));
  assert.deepEqual(valitseLajit('kaikki'), lajit);
  // Peli listaa MUSIIKKILAJIT taulukostaan: samat avaimet kuin työkalulla.
  assert.match(PELI, /export const MUSIIKKILAJIT = Object\.keys\(RAIDAT\)/);
  // Väliviivallinen laji on lainausmerkeissä ('ihmisen-matka': { … }).
  const pelinLajit = [...PELI.matchAll(/^ {2}'?([a-z-]+)'?: \{$/gm)].map((m) => m[1]);
  assert.deepEqual(pelinLajit.filter((n) => Object.hasOwn(LAJIT, n)), Object.keys(LAJIT));
});

test('linssiraita on pitkä looppi ja siirtymäraidat lyhyitä', () => {
  /*
   * Linssin ajo kestää minuutteja ja pysähtyy 20–25 kertaa: 10–20 s
   * looppi alkaisi kuulua silmukaksi. Siirtymä taas kestää sekunteja,
   * eikä pidempää looppia ehdittäisi koskaan kuulla.
   */
  for (const nimi of ['keksinnot', 'ihmisen-matka']) {
    const linssi = LAJIT[nimi];
    assert.deepEqual(kestoRajat(linssi), { min: 45, max: 60 }, `${nimi}: kestorajat`);
    assert.ok(linssi.looppi >= 45 && linssi.looppi <= 60, `${nimi}: looppi ${linssi.looppi} s`);
  }
  const rajat = kestoRajat(LAJIT.keksinnot);
  assert.deepEqual(rajat, { min: 45, max: 60 });
  assert.ok(LAJIT.keksinnot.looppi >= rajat.min && LAJIT.keksinnot.looppi <= rajat.max);
  for (const nimi of valitseLajit('kaikki')) {
    assert.deepEqual(kestoRajat(LAJIT[nimi]), { min: 10, max: 20 }, `${nimi}: oletusrajat`);
    assert.equal(lahdeMs(LAJIT[nimi]), GENEROITAVA_MS, `${nimi}: oletuslähde`);
  }
});

test('jokainen looppi mahtuu lajinsa kestorajoihin ja lähteen sisään', () => {
  for (const [nimi, raita] of Object.entries(LAJIT)) {
    const rajat = kestoRajat(raita);
    assert.ok(raita.looppi >= rajat.min && raita.looppi <= rajat.max,
      `${nimi}: looppi ${raita.looppi} s ei ole välillä ${rajat.min}–${rajat.max} s`);
    assert.ok(raita.risti >= 0.5 && raita.risti < raita.looppi, `${nimi}: risti ${raita.risti} s`);
    const lahde = lahdeMs(raita) / 1000;
    assert.ok(raita.looppi + raita.risti < lahde,
      `${nimi}: leikkaus ei mahdu ${lahde} s lähteeseen`);
    // Leikkaus otetaan keskeltä: molempiin päihin on jäätävä varaa
    // mallin sisäänajolle ja lopetukselle.
    assert.ok(looppiLeikkaus({
      lahde, looppi: raita.looppi, risti: raita.risti, vahin: rajat.min,
    }).alku >= 2, `${nimi}: lähteessä ei ole varaa päissä`);
  }
});

test('promptit ovat instrumentaaleja ja kieltävät elektroniikan', () => {
  for (const [nimi, raita] of Object.entries(LAJIT)) {
    assert.match(raita.prompt, /No modern synths/, `${nimi}: tyyli puuttuu`);
    assert.match(raita.prompt, /no vocals/, `${nimi}: laulukielto puuttuu`);
    assert.match(raita.prompt, /repeat forever/, `${nimi}: saumaohje puuttuu`);
  }
  /*
   * Linssiraidan oma luonne: kellokoneisto ja pulssi — ja 3.9.2026
   * alkaen pulssi on SYDÄMEN syke (omistaja: *"Tähän sopisi
   * taustaääneksi myös ehkä jopa sydämen syke … musiikki, joka olisi
   * inspiroitunut sydämen sykkeen äänestä"*). Tahti on osa tilausta,
   * joten se vartioidaan lukuna eikä sanana.
   */
  // Jalan: omistaja 3.9.2026 "rymikäs ja melkein laukkaava rytmi".
  assert.match(LAJIT.jalan.prompt, /galloping/);
  assert.match(LAJIT.jalan.prompt, /never heavy drums/);
  assert.match(LAJIT.keksinnot.prompt, /clockwork/);
  assert.match(LAJIT.keksinnot.prompt, /heartbeat/);
  assert.match(LAJIT.keksinnot.prompt, /60 beats per minute/);
  /*
   * Ihmisen matka (omistaja 5.9.2026): *"syvä, hidas, rumpu kuin
   * sydämen syke ja kaukainen ihmisääni ilman sanoja, ei melodiaa"*.
   * Jokainen neljästä on vartioitu, koska prompti on tilaus.
   */
  const matka = LAJIT['ihmisen-matka'].prompt;
  assert.match(matka, /heartbeat/);
  assert.match(matka, /wordlessly|wordless/);
  assert.match(matka, /No melody to follow/);
  assert.match(matka, /deep, slow/);
  assert.match(TYOKALU, /force_instrumental: true/);
});

test('API-avain ei koskaan päädy tulosteeseen', () => {
  const tulosteet = [...TYOKALU.matchAll(/console\.(?:log|error)\(([^\n]*)/g)].map((m) => m[1]);
  for (const rivi of tulosteet) {
    assert.ok(!/\bavain\b/.test(rivi) || /puuttuu ympäristöstä|ilman avainta/.test(rivi),
      `tuloste vuotaa avaimen: ${rivi}`);
  }
});

test('jalan-raita jää soimaan reitin välipisteeseen ja sammuu vasta kaupungissa (omistaja 3.9.2026)', async () => {
  const UI = (await import('node:fs')).readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(UI, /const jalanKeskenReitin = musiikki === 'jalan' && player\.pos\?\.type === 'edge' && !this\.dead;/);
  assert.match(UI, /if \(musiikki && !jalanKeskenReitin\) this\.lopetaSiirronMusiikki\(\);/);
});
