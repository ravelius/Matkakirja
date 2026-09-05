/*
 * Nopanheiton siirtoketjun ajoitus ja järjestys.
 *
 * Omistajan tilaus 1.9.2026 illalla, sanatarkasti: *"voisit katsoa ja
 * miettiä kartta ajon paremmaksi kun pelaaja liikkuu nopalla. kartta
 * saisi zoomautua lähemmäksi ensin ja sitten vasta pelaaja alkaisi
 * liikkua. pelaajan nappulat saisi edetä vähän hitaammin."*
 *
 * Kaksi asiaa on vartioitava, ja kumpikaan ei näkyisi virheenä jos se
 * katoaisi — siirto vain palaisi hiljaa vanhaksi:
 *
 *   1. JÄRJESTYS. Ennakkozoomi on ODOTETTAVA ja sen on tapahduttava
 *      ENNEN kuin nappula poimitaan laudalta (movingPlayerId). Yksi
 *      poistettu `await` riittää palauttamaan vanhan yhtaikaisuuden.
 *   2. TAHTI. Askel on hitaampi kuin ennen mutta porrastettu, eikä
 *      pisin heitto saa venyä odotteluksi. Luvut ovat säädettäviä,
 *      joten rajat ovat väljät — vartioitava asia on suhde, ei desimaali.
 *
 * Ajoitus luetaan funktiosta (jalkamatkanAskel) ja järjestys
 * lähdetekstistä, samaan tapaan kuin tests/lento-ajoitus.test.mjs
 * vartioi avauslennon kytkennät.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  jalkamatkanAskel, siirtoajonKesto, siirtoajonPehmennys,
} from '../js/siirtokoreografia.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
// Koreografian luvut asuvat omassa moduulissaan (pallolauta vaihe 2).
const KOREO = readFileSync(new URL('../js/siirtokoreografia.js', import.meta.url), 'utf8');
const KARTTA = readFileSync(new URL('../js/kartta.js', import.meta.url), 'utf8');

const luku = (lahde, nimi) => Number(lahde.match(new RegExp(`const ${nimi} = ([\\d.]+)`))[1]);

/* --- 1. tahti ------------------------------------------------------ */

test('yhden askeleen tahti on vanhaa hitaampi, muttei paljon', () => {
  const uusi = luku(KOREO, 'JALKAMATKAN_STEP_MS');
  const vanha = luku(KOREO, 'JALKAMATKAN_STEP_LYHIN_MS');
  // Vanha askel 640 ms on nyt alaraja; uusi perusaskel on "vähän
  // hitaampi" eli 1,3–1,5× siitä. Yli 1,5× ei ole enää vähän.
  assert.equal(vanha, 640, 'alaraja ei ole enää entinen askel');
  assert.ok(uusi / vanha >= 1.3 && uusi / vanha <= 1.5,
    `perusaskel ${uusi} ms on ${(uusi / vanha).toFixed(2)}× vanhasta — ei 1,3–1,5×`);
  assert.equal(jalkamatkanAskel(1), uusi, 'yhden askeleen matka ei saa perusaskelta');
});

test('lyhyet heitot kulkevat täydellä rauhalla', () => {
  const perus = luku(KOREO, 'JALKAMATKAN_STEP_MS');
  for (const n of [1, 2, 3, 4, 5]) {
    assert.equal(jalkamatkanAskel(n), perus, `${n} askelta ei kulje perustahdilla`);
  }
});

test('kuutonen ei veny odotteluksi eikä alita vanhaa tahtia', () => {
  const tauko = luku(KOREO, 'HYPYN_TAUKO_MS');
  const katto = luku(KOREO, 'JALKAMATKAN_KATTO_MS');
  const alaraja = luku(KOREO, 'JALKAMATKAN_STEP_LYHIN_MS');
  const askel = jalkamatkanAskel(6);
  const kesto = 6 * askel + 5 * tauko;
  assert.ok(askel >= alaraja, `kuutosen askel ${askel} ms alittaa vanhan tahdin`);
  assert.ok(kesto <= katto + 60, `kuutosen matka ${kesto} ms ylittää katon ${katto} ms`);
  // Vanha peli: 6 × 640 + 5 × 190 = 4790 ms. Uusi saa olla hitaampi,
  // muttei enempää kuin ~15 %, tai koko porrastus on turha.
  const ennen = 6 * alaraja + 5 * tauko;
  assert.ok(kesto >= ennen && kesto <= ennen * 1.15,
    `kuutosen matka ${kesto} ms ei ole entisen ${ennen} ms tuntumassa`);
});

test('tahti ei koskaan kiihdy heiton pidetessä', () => {
  let edellinen = Infinity;
  for (let n = 1; n <= 6; n++) {
    const askel = jalkamatkanAskel(n);
    assert.ok(askel <= edellinen, `askel kasvoi ${n}:ssä (${edellinen} → ${askel})`);
    edellinen = askel;
  }
});

test('lento ei hidastunut: tilaus koski maareittejä', () => {
  assert.equal(luku(KOREO, 'STEP_MS'), 190, 'lennon askeltahti muuttui');
  assert.match(UI, /maitse \? jalkamatkanAskel\(path\.length\) : STEP_MS/,
    'siirto ei enää erottele jalkamatkaa ja lentoa');
});

/* --- 2. järjestys: zoomi ensin, nappula vasta sitten ---------------- */

const SIIRTO = UI.match(/async animatePawnSisalla\([\s\S]*?\n  \}\n/)[0];

test('ennakkozoomia odotetaan ennen kuin nappula poimitaan laudalta', () => {
  const zoomi = SIIRTO.indexOf('await this.ennakoiSiirtoZoomi(');
  const poiminta = SIIRTO.indexOf('this.movingPlayerId = player.id');
  assert.ok(zoomi > 0, 'ennakkozoomia ei kutsuta lainkaan');
  assert.ok(poiminta > zoomi,
    'nappula poimitaan laudalta ennen ennakkozoomia — se katoaisi zoomin ajaksi');
});

test('saatto ja matkan ääni alkavat vasta zoomin jälkeen', () => {
  const zoomi = SIIRTO.indexOf('await this.ennakoiSiirtoZoomi(');
  for (const kutsu of ['this.aloitaSaattavaKamera(', 'this.aloitaJalkamatkanAani()']) {
    assert.ok(SIIRTO.indexOf(kutsu) > zoomi, `${kutsu} alkaa jo zoomauksen kanssa`);
  }
});

test('ennakkozoomi ajaa kertoimeen ja odottaa perilletuloa', () => {
  const metodi = UI.match(/async ennakoiSiirtoZoomi\([\s\S]*?\n  \}\n/)[0];
  assert.match(metodi, /siirtoZoomiKerroin\(SIIRTOZOOMIN_LAHENNYS\)/,
    'ennakko ei kysy siirtozoomin kerrointa kartalta');
  assert.match(metodi, /await kartta\.ajaKamera\([\s\S]*?ENNAKKOZOOMIN_MS/,
    'ennakkoajoa ei odoteta');
  assert.match(metodi, /await this\.wait\(ENNAKON_HENGAHDYS_MS\)/,
    'zoomin ja liikkeen väliin ei jää hengähdystä');
  // Liikeherkkyys ja yleiskuva ohittavat, kuten saatollakin.
  assert.match(metodi, /if \(this\.reducedMotion \|\| this\.dead\) return;/);
  assert.match(metodi, /!this\.mannerZoom\) return;/);
});

test('saattoajo ei enää zoomaa itse eikä palaa perillä', () => {
  const saatto = UI.match(/ {2}aloitaSaattavaKamera\(path, kesto\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(saatto, /kerroin/,
    'saatto muuttaa yhä mittakaavaa — zoomi kuuluu ennakkoon');
  // Vain KUTSU ja METODI, ei maininta: poiston perustelu elää yhä
  // kommenteissa, ja se on tarkoitus.
  assert.doesNotMatch(UI, /this\.puraSaattavaKamera\(|async puraSaattavaKamera\(/,
    'paluuajo on palannut: kameran pitää jäädä sinne minne se ajettiin');
  assert.doesNotMatch(UI, /SAATON_PALUU_MS =/, 'paluuajon vakio on palannut');
});

test('ennakkozoomi on ripeämpi kuin kartan muut ajot', () => {
  const ennakko = luku(KOREO, 'ENNAKKOZOOMIN_MS');
  const ajo = luku(KARTTA, 'AJO_MS');
  assert.ok(ennakko > 300 && ennakko < ajo,
    `ennakkozoomin ${ennakko} ms ei ole 300 ms – ${ajo} ms väliltä`);
  assert.ok(luku(KOREO, 'ENNAKON_HENGAHDYS_MS') <= 250, 'hengähdys venyi tauoksi');
});

/* --- 3. siirtozoomin katto ----------------------------------------- */

test('siirtozoomilla on absoluuttinen katto — muuten se kylläisi pohjaan', () => {
  const metodi = KARTTA.match(/ {2}siirtoZoomiKerroin\(lahennys = 1\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(metodi, /SIIRTONAKYMAN_LAHIN_KERROIN/, 'kattoa ei lasketa');
  // Pelaajan oma lähikuva voittaa katon: ennakko lähentää, ei loitonna.
  assert.match(metodi, /Math\.max\(nyt, katto\)/,
    'siirtozoomi voisi vetää pelaajan omasta lähikuvasta kauemmas');
  // Ja lopuksi portaikon päät, kuten kaikilla mittakaavoilla.
  assert.match(metodi, /this\.zoomiRajat\(\)/, 'kerrointa ei rajata portaikkoon');
  const kerroin = luku(KARTTA, 'SIIRTONAKYMAN_LAHIN_KERROIN');
  assert.ok(kerroin >= 2 && kerroin <= 6,
    `siirtonäkymän katto ${kerroin}× lähimmästä portaasta ei ole 2–6×`);
  assert.ok(luku(KOREO, 'SIIRTOZOOMIN_LAHENNYS') > 1.2,
    'lähennys ei enää vie lähemmäs');
});

/* --- 4. koreografia: kamera edellä, nappula perässä ----------------
 *
 * Omistajan tilaus 2.9.2026, sanatarkasti: *"nappulan liikkeelle lähtö
 * voisi olla hieman viivytetty niin, että kartta ehtii lähteä hitaasti
 * jo rullaamaan eteenpäin, juuri sellaisella vauhdilla, että kun se
 * ensin vähän hitaasti kiihdyttää, sitten pysyy vakionopeudessa ja
 * lopussa taas hitaasti jarruttaa... niin, että laatta saapuu perille
 * vähän ennen, kuin kartan panorointiliike loppuu."*
 *
 * Kolme asiaa, ja jokainen katoaisi hiljaa: viive on yksi await,
 * saapumisero yksi yhteenlasku ja trapetsi yksi funktio, jonka
 * korvaisi huomaamatta smoothstepillä.
 */

const nappulanMatka = (askelia) => askelia * jalkamatkanAskel(askelia)
  + (askelia - 1) * luku(KOREO, 'HYPYN_TAUKO_MS');

test('kamera lähtee ensin ja nappula viiveellä', () => {
  const viive = luku(KOREO, 'NAPPULAN_LAHDON_VIIVE_MS');
  // Omistajan haarukka oli 250–400 ms: alle sen katse ei ehdi lukea
  // kartan lähtöä, yli sen peli tuntuu jumittuvan heiton jälkeen.
  assert.ok(viive >= 250 && viive <= 400, `viive ${viive} ms ei ole 250–400 ms`);
  const siirto = UI.match(/async animatePawnSisalla\([\s\S]*?\n  \}\n/)[0];
  const kamera = siirto.indexOf('this.aloitaSaattavaKamera(');
  const odotus = siirto.indexOf('await this.wait(NAPPULAN_LAHDON_VIIVE_MS)');
  const silmukka = siirto.indexOf('for (const [i, pos] of path.entries())');
  assert.ok(kamera > 0 && odotus > kamera,
    'nappulan viive ei ole kameran käynnistyksen jälkeen');
  assert.ok(silmukka > odotus, 'askelsilmukka alkaa ennen viivettä');
});

test('nappula saapuu perille ennen kameraa, joka pituudella tahansa', () => {
  const viive = luku(KOREO, 'NAPPULAN_LAHDON_VIIVE_MS');
  const ero = luku(KOREO, 'NAPPULAN_SAAPUMISERO_MS');
  assert.ok(ero >= 150 && ero <= 300, `saapumisero ${ero} ms ei ole 150–300 ms`);
  for (let n = 1; n <= 6; n++) {
    const nappula = nappulanMatka(n);
    const kamera = siirtoajonKesto(nappula);
    const saapuu = viive + nappula;
    assert.ok(saapuu < kamera,
      `${n} askelta: nappula perillä ${saapuu} ms, kamera ${kamera} ms — ei ennen`);
    // Ja nimenomaan "vähän ennen": ero on saapumisero, ei sekunteja.
    assert.equal(kamera - saapuu, ero, `${n} askelta: ero ei ole saapumisero`);
  }
});

test('kestorajat ovat vartijoita eivätkä pure nykytahdilla', () => {
  const lyhin = luku(KOREO, 'SIIRTOAJON_LYHIN_MS');
  const pisin = luku(KOREO, 'SIIRTOAJON_PISIN_MS');
  assert.ok(lyhin < pisin, 'kestorajat ovat väärin päin');
  for (let n = 1; n <= 6; n++) {
    const kesto = siirtoajonKesto(nappulanMatka(n));
    assert.ok(kesto > lyhin && kesto < pisin,
      `${n} askelta: ajo ${kesto} ms osuu rajaan (${lyhin}–${pisin} ms)`);
  }
  // Rajat toimivat silti, jos askeltahti joskus muuttuu rajusti.
  assert.equal(siirtoajonKesto(0), lyhin);
  assert.equal(siirtoajonKesto(60000), pisin);
});

test('saaton käyrä on trapetsi: kiihdytys, vakionopeus, jarrutus', () => {
  // Päät kiinni ja monotoninen — sama vaatimus kuin kaikilla
  // pehmennyksillä.
  assert.equal(siirtoajonPehmennys(0), 0);
  assert.ok(Math.abs(siirtoajonPehmennys(1) - 1) < 1e-9);
  let edellinen = -1;
  for (let i = 0; i <= 100; i++) {
    const arvo = siirtoajonPehmennys(i / 100);
    assert.ok(arvo >= edellinen - 1e-9, `käyrä kääntyi kohdassa ${i / 100}`);
    edellinen = arvo;
  }
  // Nopeus numeerisesti: erotusosamäärä 200 näytteessä.
  const dt = 1 / 200;
  const nopeus = [];
  for (let i = 0; i < 200; i++) {
    const t = i / 200;
    nopeus.push((siirtoajonPehmennys(t + dt) - siirtoajonPehmennys(t)) / dt);
  }
  const ramppi = luku(KOREO, 'SAATON_RAMPPI');
  const huippu = 1 / (1 - ramppi);
  // 1. KESKELLÄ VAKIO. Ramppien välissä nopeus on tasan huippunopeus.
  const keski = nopeus.slice(Math.round(200 * (ramppi + 0.05)),
    Math.round(200 * (1 - ramppi - 0.05)));
  assert.ok(keski.length > 20, 'vakio-osuus jäi liian lyhyeksi mitattavaksi');
  for (const v of keski) {
    assert.ok(Math.abs(v - huippu) < 0.02,
      `keskiosan nopeus ${v.toFixed(3)} ei ole vakio ${huippu.toFixed(3)}`);
  }
  // 2. PÄÄT HITAAT. Ensimmäinen ja viimeinen näyte ovat lähellä nollaa.
  assert.ok(nopeus[0] < 0.05, `lähtö ei ole hidas (${nopeus[0].toFixed(3)})`);
  assert.ok(nopeus.at(-1) < 0.05, `pysähdys ei ole hidas (${nopeus.at(-1).toFixed(3)})`);
  // 3. EI SMOOTHSTEP. Smoothstepin huippunopeus on tasan 1,5 ja se
  //    saavutetaan vain hetkeksi puolivälissä; trapetsilla huippu on
  //    1/(1−r) ja se KESTÄÄ. Ero mitataan siitä, montako näytettä on
  //    huipun tuntumassa.
  const huipulla = nopeus.filter((v) => Math.abs(v - huippu) < 0.02).length;
  assert.ok(huipulla > 60,
    `vain ${huipulla}/200 näytettä huippunopeudessa — käyrä ei ole trapetsi`);
});

/* --- 5. siirtymämusiikki: kytkennät paikoillaan -------------------- */

const MUSA = readFileSync(new URL('../js/siirtymamusiikki.js', import.meta.url), 'utf8');

test('kolme raitaa omilla poluillaan ämpärin aanet-kansiossa', () => {
  for (const laji of ['jalan', 'laiva', 'lento']) {
    assert.match(MUSA, new RegExp(`aanet/siirtyma-${laji}\\.mp3`),
      `raidan ${laji} ämpäripolku puuttuu`);
    assert.match(MUSA, new RegExp(`assets/audio/siirtyma-${laji}\\.mp3`),
      `raidan ${laji} varapolku (vie-aanet.yml) puuttuu`);
  }
});

test('puuttuva raita hiljenee pysyvästi eikä kaada peiliä', () => {
  // Katkaisijaa ei kutsuta: oma puuttuva äänite ei ole peilin vika.
  // Mitataan tuonnista, koska perustelu elää kommenteissa nimeltä.
  const tuonnit = [...MUSA.matchAll(/^import [\s\S]*?from '[^']+';$/gm)].join('\n');
  assert.doesNotMatch(tuonnit, /peiliPetti/,
    'siirtymämusiikki tuo peilikatkaisijan — puuttuva oma raita ei ole peilin vika');
  assert.match(MUSA, /puuttuvatRaidat\.add\(laji\)/,
    'puuttuvaa raitaa ei merkitä muistiin');
  assert.match(MUSA, /puuttuvatRaidat\.has\(laji\)/,
    'muistiin merkittyä ei tarkisteta');
});

test('feidit ovat tilauksen mukaiset: sisään 300, ulos 500', () => {
  assert.equal(luku(MUSA, 'NOUSU_MS'), 300);
  assert.equal(luku(MUSA, 'LASKU_MS'), 500);
});

test('musiikki kunnioittaa äänikytkintä ja väistöä', () => {
  assert.match(MUSA, /!sfx\.enabled \|\| puuttuvatRaidat\.has\(laji\)\) return;/,
    'aloitus ei tarkista taustaäänten kytkintä');
  assert.match(MUSA, /lisaaVaistaja\(/, 'musiikki ei väisty puheen alta');
});

test('lennon raita soi kabiiniäänen alla eli hiljempaa', () => {
  const tasot = Object.fromEntries(
    [...MUSA.matchAll(/(jalan|laiva|lento): \{[\s\S]*?voima: ([\d.]+),/g)]
      .map((m) => [m[1], Number(m[2])]),
  );
  assert.equal(Object.keys(tasot).length, 3, 'kolmen raidan tasoja ei löytynyt');
  assert.ok(tasot.lento < tasot.jalan && tasot.lento < tasot.laiva,
    `lennon taso ${tasot.lento} ei ole matalin (${JSON.stringify(tasot)})`);
});

test('varamusiikki on oletuksena pois', () => {
  assert.match(MUSA, /localStorage\.getItem\(VARA_AVAIN\) === '1'/,
    'varamusiikin oletus ei ole pois (avaimen puuttuminen = pois)');
  assert.match(MUSA, /varaKytkinMuisti = false;/,
    'yksityisen selauksen oletus ei ole pois');
});

test('siirto kytkee musiikin: jalan, laiva ja lento omissa paikoissaan', () => {
  assert.match(UI, /const musiikki = maitse \? 'jalan' : 'laiva';/,
    'doMove ei valitse siirtymämusiikin lajia matkustustavan mukaan');
  assert.match(UI, /this\.aloitaSiirronMusiikki\('lento'\)/,
    'doFly ei käynnistä lennon siirtymämusiikkia');
  const siirto = UI.match(/async animatePawnSisalla\([\s\S]*?\n  \}\n/)[0];
  assert.match(siirto, /if \(musiikki\) this\.aloitaSiirronMusiikki\(musiikki\);/,
    'siirto ei käynnistä musiikkia');
  assert.match(siirto, /if \(musiikki\) this\.lopetaSiirronMusiikki\(\);/,
    'siirto ei sammuta musiikkia perillä');
});

/* --- 4. ajot pehmeästi peräkkäin (omistaja 3.9.2026) --------------- */

test('kamera-ajo lähtee kesken olevan ajon nykyisestä kehyksestä, ei sen määränpäästä', () => {
  const metodi = KARTTA.match(/ {2}ajaKamera\(kohde, \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(metodi, /const kesken = this\.kameraAjo\?\.nyt;\n\s*const alku = kesken \? \{ \.\.\.kesken \} : this\.kameranTila\(\);/,
    'uusi ajo alkaa yhä kirjatusta näkymästä — kuva hyppää edellisen ajon loppuun');
  assert.match(metodi, /if \(sovita\) kesto = sovitaAjonKesto\(kesto, suhde, matka \/ paneW\);/);
});

test('ennakkozoomi ja kohdesovitus sovittavat kestonsa liikkeen mukaan', async () => {
  const { sovitaAjonKesto, SOVITETUN_AJON_PISIN_MS } = await import('../js/kartta.js');
  // Pieni ele: pyydetty kesto sellaisenaan.
  assert.equal(sovitaAjonKesto(760, 0, 0), 760);
  // Kaksinkertainen zoomi: puolet lisää.
  assert.equal(sovitaAjonKesto(760, Math.LN2, 0), 1140);
  // Oktaavi zoomia ja ruudullinen panorointi: tuplat.
  assert.equal(sovitaAjonKesto(760, Math.LN2, 1), 1520);
  // Katto pitää kohtauksen mittaisena, eikä koskaan lyhene pyydetystä.
  assert.equal(sovitaAjonKesto(760, 3 * Math.LN2, 3), SOVITETUN_AJON_PISIN_MS);
  assert.equal(sovitaAjonKesto(2000, 0, 0), 2000);
  const ennakko = UI.match(/async ennakoiSiirtoZoomi\([\s\S]*?\n  \}\n/)[0];
  assert.match(ennakko, /\{ kesto: ENNAKKOZOOMIN_MS, sovita: true \}/, 'ennakko ei sovita kestoaan');
  const sovitus = UI.match(/ {2}sovitaKohteetNakyviin\(bbox[\s\S]*?\n {2}\}\n/)[0];
  assert.match(sovitus, /\{ kesto, sovita: true \}/, 'kohdesovitus ei sovita kestoaan');
});
