/*
 * IHMISEN MATKA — ESITYS YHTENÄ KAARENA.
 *
 * Raamattu IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA + ALKAA MUSTASTA
 * RUUDUSTA + KERTOMUS SOLJUVAKSI (omistaja 7.9.2026). Esityksen ohjaaja
 * (js/linssit/ihmisen-matka-esitys.js) elää selaimessa — kello, kamera,
 * vanat ja kuvat mitataan savukkeella
 * (tools/savukkeet/savuke-ihmisen-esitys.mjs). TÄSSÄ mitataan se, mikä
 * on puhdasta laskentaa tai kytkentää ja mikä rikkoutuisi hiljaa:
 *
 *   1. KAANONIN MUOTO. Jokaisella jaksolla on tunnus, tunnettu vaihe ja
 *      lukema; kohde osuu löytöpaikkaan ja alue nimettyyn rajaukseen.
 *      Väärä nimi ei kaada mitään — kamera vain jäisi paikoilleen.
 *   2. KELLON KÄÄNNÖS. vuosiaSittenPaikka on vuosiaSittenLukeman
 *      käänteisfunktio: esitys kirjoittaa lukeman, moottori lukee
 *      paikan. Väärä käännös näyttäisi väärää vuotta koko esityksen.
 *   3. LUENNAN NIMI JA KESTO. Peli ja generointityökalu johtavat
 *      tiedostonimen samasta funktiosta; eriytyminen tarkoittaisi
 *      maksettua tiedostoa, jota peli ei koskaan hae.
 *   4. PULUN VÄLIHUOMIOT. js/liviapuhe.js LIVIAN_LINSSILAHTEET ja
 *      kaanonin `pulu`-kentät ovat samat ja samassa järjestyksessä —
 *      numero on tiedostonimessä.
 *   5. VANOJEN PITO. Kelaus taaksepäin ei saa purkaa piirrettyä vanaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { vuosiaSittenLukema, vuosiaSittenPaikka, ASTEIKON_VALI } from '../js/aikajana.js';
import { karjenPaino } from '../js/aikajana-vanat.js';
import {
  KERTOMUKSEN_MERKKIA_SEKUNNISSA, kertomuksenLuennat, kertomuksenRunko, kertomuksenVarakesto,
} from '../js/linssipuhe.js';
import { LIVIAN_AANILAHTEET, LIVIAN_LINSSILAHTEET, livianLinssiIndeksi } from '../js/liviapuhe.js';
import { IHMISEN_MATKA_KERTOMUS } from '../js/linssit/ihmisen-matka-kertomus.js';
import { IHMISEN_MATKA } from '../js/linssit/ihmisen-matka-data.js';
import { LINSSI } from '../js/linssit/ihmisen-matka.js';
import {
  ESITYKSEN_ALUEET, ESITYKSEN_LAHIKUVA, IHMISEN_MATKA_KUVAT_ESITYKSESSA, KUVAN_OSUUS,
  LOPUN_ASETUS_MS, alueenLaatikko, jaksonTahti, kelauksenPehmennys,
  jaksonRajaus, KARJEN_ETAISYYS_MAX_AST, HAARAN_ETAISYYS_MAX_AST, KARJEN_LIIKE_MIN_AST,
} from '../js/linssit/ihmisen-matka-esitys.js';
import { valitseKertomus, kokoaKertomusManifesti } from '../tools/generoi-linssiluennat.mjs';

const OHJAAJA = readFileSync(new URL('../js/linssit/ihmisen-matka-esitys.js', import.meta.url), 'utf8');
const MOOTTORI = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');

const VAIHEET = new Set(['pimea', 'valot', 'matka', 'hyppy', 'loppu']);
const TUNNUKSET = new Set(IHMISEN_MATKA.map((t) => t.tunnus));

/* ==================== 1. KAANONIN MUOTO ==================== */

test('kertomus on yksi kaari: tunnukset, vaiheet ja lukemat kunnossa', () => {
  assert.ok(IHMISEN_MATKA_KERTOMUS.length >= 20, `jaksoja vain ${IHMISEN_MATKA_KERTOMUS.length}`);
  const nahdyt = new Set();
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    assert.ok(jakso.id && !nahdyt.has(jakso.id), `jakson tunnus puuttuu tai toistuu: ${jakso.id}`);
    nahdyt.add(jakso.id);
    assert.ok(VAIHEET.has(jakso.vaihe), `${jakso.id}: tuntematon vaihe ${jakso.vaihe}`);
    assert.ok(Number.isFinite(jakso.vuosia) && jakso.vuosia >= 0, `${jakso.id}: vuosia`);
    assert.ok(String(jakso.teksti ?? '').trim(), `${jakso.id}: teksti puuttuu`);
    assert.ok(String(jakso.luenta ?? '').trim(), `${jakso.id}: luenta puuttuu`);
  }
  // Dramaturgia: musta ruutu ensin, valot toisena, loppu viimeisenä.
  assert.equal(IHMISEN_MATKA_KERTOMUS[0].vaihe, 'pimea');
  assert.equal(IHMISEN_MATKA_KERTOMUS[1].vaihe, 'valot');
  assert.equal(IHMISEN_MATKA_KERTOMUS.at(-1).vaihe, 'loppu');
  // Yksi ja vain yksi aikahyppy (paluu Aasiaan).
  assert.equal(IHMISEN_MATKA_KERTOMUS.filter((j) => j.vaihe === 'hyppy').length, 1);
});

test('jokainen kohde on löytöpaikka ja jokainen alue nimetty rajaus', () => {
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    if (jakso.kohde) {
      assert.ok(TUNNUKSET.has(jakso.kohde),
        `${jakso.id}: kohde ${jakso.kohde} ei ole IHMISEN_MATKA-tunnus`);
      assert.equal(jakso.alue, null, `${jakso.id}: kohde ja alue yhtä aikaa`);
      continue;
    }
    if (jakso.alue === null) continue;
    assert.ok(jakso.alue in ESITYKSEN_ALUEET,
      `${jakso.id}: tuntematon alue ${jakso.alue} (${Object.keys(ESITYKSEN_ALUEET).join(', ')})`);
  }
  // Kaanoni käyttää kaikkia nimettyjä alueita: turha rajaus on kuollut koodi.
  const kaytetyt = new Set(IHMISEN_MATKA_KERTOMUS.map((j) => j.alue).filter(Boolean));
  for (const nimi of Object.keys(ESITYKSEN_ALUEET)) {
    assert.ok(kaytetyt.has(nimi), `aluetta ${nimi} ei käytä yksikään jakso`);
  }
});

test('nimetty rajaus kääntyy laudan laatikoksi ja koko pallo on koko lauta', () => {
  const afrikka = alueenLaatikko('afrikka');
  assert.ok(afrikka.w > 0 && afrikka.h > 0);
  // Afrikka on noin 70° leveä: 12 000 / 360 = 33,3 yksikköä asteella.
  assert.ok(afrikka.w > 2000 && afrikka.w < 2800, `Afrikan leveys ${afrikka.w}`);
  const maailma = alueenLaatikko('maailma');
  assert.equal(maailma.w, 12000);
  // Tuntematon nimi ei jätä kameraa ilman kohdetta.
  assert.deepEqual(alueenLaatikko('ei-tallaista'), maailma);
  // Etiopia on Afrikan sisällä, Keski-Aasia sen ulkopuolella idässä.
  const ita = alueenLaatikko('afrikka-ita');
  assert.ok(ita.w < afrikka.w && ita.h < afrikka.h);
  assert.ok(alueenLaatikko('keski-aasia').x > afrikka.x);
});

test('linssi antaa kertomuksen ja sen luentarungon moottorille', () => {
  assert.equal(LINSSI.aikajana.kertomus, IHMISEN_MATKA_KERTOMUS);
  assert.equal(LINSSI.aikajana.kertomusRunko, 'ihmisen-matka-kertomus');
  // Kertomuskaari EI aja pysäkkikelloa: moottorissa on portti jokaisessa
  // kohdassa, jossa pysäkkiajo muuten jatkaisi.
  assert.match(MOOTTORI, /if \(this\.esitys\) \{ this\.esitys\.aloita\(\); return; \}/);
  assert.match(MOOTTORI, /if \(this\.esitys\) \{ this\.esitys\.taukoTaiJatka\(\); return; \}/);
  assert.match(MOOTTORI, /this\.esitys\?\.pura\(\);/);
  // Musiikki ei ala mustassa ruudussa.
  assert.match(MOOTTORI, /if \(this\.kaari\.kertomus\?\.length\) this\.esitys = luoEsitys\(\{ ajo: this \}\);\n\s*else this\.aloitaMusiikki\(false\);/);
});

/* ==================== 2. KELLON KÄÄNNÖS ==================== */

test('vuosiaSittenPaikka on vuosiaSittenLukeman käänteisfunktio', () => {
  const arvot = [...IHMISEN_MATKA.map((t) => t.vuosiaSitten)].sort((a, b) => b - a);
  for (let p = 0; p <= (arvot.length - 1) * ASTEIKON_VALI; p += 1.7) {
    const lukema = vuosiaSittenLukema(p, arvot);
    const takaisin = vuosiaSittenPaikka(lukema, arvot);
    assert.ok(Math.abs(takaisin - p) < 0.02, `paikka ${p} → ${lukema} → ${takaisin}`);
  }
});

test('kellon käännös pitää päät kaaressa', () => {
  const arvot = [300000, 100000, 10000, 750];
  assert.equal(vuosiaSittenPaikka(400000, arvot), 0);
  assert.equal(vuosiaSittenPaikka(1, arvot), 3 * ASTEIKON_VALI);
  assert.equal(vuosiaSittenPaikka(300000, arvot), 0);
  // Jokainen pysäkkiarvo osuu tasan omaan kohtaansa.
  arvot.forEach((v, i) => {
    assert.ok(Math.abs(vuosiaSittenPaikka(v, arvot) - i * ASTEIKON_VALI) < 1e-6, `${v}`);
  });
  // Asteikko tarjoaa käännöksen molemmilla lajeilla.
  assert.equal(typeof LINSSI.aikajana.asteikko, 'string');
});

test('jakson tahti kulkee jakson lukemasta seuraavan lukemaan', () => {
  const kertomus = [{ vuosia: 300000 }, { vuosia: 240000 }, { vuosia: 0 }];
  assert.deepEqual(jaksonTahti(kertomus, 0), { alku: 300000, loppu: 240000 });
  assert.deepEqual(jaksonTahti(kertomus, 1), { alku: 240000, loppu: 0 });
  // Viimeinen jakso jää lukemaansa — kello ei juokse kaaren ohi.
  assert.deepEqual(jaksonTahti(kertomus, 2), { alku: 0, loppu: 0 });
});

test('aikahyppyä edeltävä jakso ei kelaa itse: hyppy kuuluu hyppyjaksolle', () => {
  const kertomus = [{ vuosia: 14500 }, { vuosia: 50000, vaihe: 'hyppy' }, { vuosia: 45000 }];
  // Chile pysyy lukemassaan kertojan puhuessa pisimmästä kävelymatkasta…
  assert.deepEqual(jaksonTahti(kertomus, 0), { alku: 14500, loppu: 14500 });
  // …ja hyppyjakso etenee omasta lukemastaan seuraavaan (kelaus erikseen).
  assert.deepEqual(jaksonTahti(kertomus, 1), { alku: 50000, loppu: 45000 });
  // Sama kaanonissa: Chilen jakso ei saa juosta 50 000:een.
  const i = IHMISEN_MATKA_KERTOMUS.findIndex((j) => j.vaihe === 'hyppy');
  const chile = jaksonTahti(IHMISEN_MATKA_KERTOMUS, i - 1);
  assert.equal(chile.alku, 14500);
  assert.equal(chile.loppu, 14500);
});

test('aikahyppy kelaa taaksepäin 14 500 → 50 000', () => {
  const i = IHMISEN_MATKA_KERTOMUS.findIndex((j) => j.vaihe === 'hyppy');
  const edellinen = IHMISEN_MATKA_KERTOMUS[i - 1];
  const hyppy = IHMISEN_MATKA_KERTOMUS[i];
  assert.equal(edellinen.vuosia, 14500);
  assert.equal(hyppy.vuosia, 50000);
  assert.equal(hyppy.alue, 'keski-aasia');
  // Pehmennys on nollasta yhteen eikä ylitä kumpaakaan päätä.
  assert.equal(kelauksenPehmennys(0), 0);
  assert.equal(kelauksenPehmennys(1), 1);
  assert.ok(Math.abs(kelauksenPehmennys(0.5) - 0.5) < 1e-9);
  for (let t = 0; t <= 1; t += 0.05) {
    const v = kelauksenPehmennys(t);
    assert.ok(v >= 0 && v <= 1, `pehmennys(${t}) = ${v}`);
  }
});

/* ==================== 3. LUENNAN NIMI JA KESTO ==================== */

test('jakson luennan nimi tulee tunnuksesta ja kaaren etuliitteestä', () => {
  assert.equal(kertomuksenRunko({ id: 'avaus' }, 'ihmisen-matka-kertomus'),
    'ihmisen-matka-kertomus-avaus');
  assert.equal(kertomuksenRunko({ id: 'jebel-irhoud' }, 'ihmisen-matka-kertomus'),
    'ihmisen-matka-kertomus-jebel-irhoud');
  assert.equal(kertomuksenRunko({}, 'ihmisen-matka-kertomus'), null);
  // Peli ja työkalu johtavat saman nimen samasta datasta.
  const tyokalu = valitseKertomus(LINSSI.aikajana);
  const peli = kertomuksenLuennat(LINSSI.aikajana);
  assert.equal(tyokalu.tyot.length, IHMISEN_MATKA_KERTOMUS.length);
  assert.deepEqual(tyokalu.tyot.map((t) => t.nimi), peli.map((t) => t.nimi));
  assert.ok(peli.every((t) => t.nimi.startsWith('ihmisen-matka-kertomus-') && t.nimi.endsWith('.mp3')));
  // Mallille menee kaanonin tagitettu luenta, ruudulle pelkkä teksti.
  const avaus = peli[0];
  assert.equal(avaus.teksti, IHMISEN_MATKA_KERTOMUS[0].teksti);
  assert.equal(avaus.puhe, IHMISEN_MATKA_KERTOMUS[0].luenta);
  // Tuntematon valitsin kaatuu ennen ensimmäistäkään maksullista kutsua.
  assert.deepEqual(valitseKertomus(LINSSI.aikajana, ['ei-tallaista']).tuntemattomat, ['ei-tallaista']);
});

test('varakesto on tekstin pituus 14 merkkiä sekunnissa', () => {
  assert.equal(KERTOMUKSEN_MERKKIA_SEKUNNISSA, 14);
  assert.equal(kertomuksenVarakesto({ teksti: 'x'.repeat(140) }, 0), 10000);
  // Lyhytkin jakso saa pohjan, ettei se vilahda ohi.
  assert.equal(kertomuksenVarakesto({ teksti: 'Ai.' }), 2500);
  // Koko esitys mahtuu järkevään mittaan myös ilman ääntä.
  const ms = IHMISEN_MATKA_KERTOMUS.reduce((s, j) => s + kertomuksenVarakesto(j), 0);
  assert.ok(ms > 3 * 60000 && ms < 10 * 60000, `esitys ${(ms / 60000).toFixed(1)} min`);
});

test('kertomusmanifesti kattaa koko kaanonin', () => {
  const manifesti = kokoaKertomusManifesti(LINSSI.aikajana, new Map([['avaus', 8.2]]));
  assert.equal(manifesti.jaksoja, IHMISEN_MATKA_KERTOMUS.length);
  assert.equal(manifesti.jaksot[0].tunnus, 'avaus');
  assert.equal(manifesti.jaksot[0].kesto, 8.2);
  // Generoimaton jakso on manifestissa mukana kestona null.
  assert.equal(manifesti.jaksot[1].kesto, null);
  assert.equal(manifesti.merkkiaSekunnissa, KERTOMUKSEN_MERKKIA_SEKUNNISSA);
  assert.match(manifesti.kansio, /ihmisen-matka\/puhe$/);
});

/* ==================== 4. PULUN VÄLIHUOMIOT ==================== */

test('pulun välihuomiot ovat samassa järjestyksessä taulussa ja kaanonissa', () => {
  const kaanonissa = IHMISEN_MATKA_KERTOMUS.filter((j) => j.pulu).map((j) => j.id);
  assert.deepEqual(LIVIAN_LINSSILAHTEET['ihmisen-matka'], kaanonissa);
  // 1–3 välihuomiota kertomuksen keskellä + lopun kutsu tutkimusvaiheeseen
  // (Raamattu KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA, kohdat 4–5).
  assert.ok(kaanonissa.length >= 2 && kaanonissa.length <= 4, `${kaanonissa.length} huomiota`);
  assert.equal(kaanonissa.at(-1), 'loppu');
  // Numero on tiedostonimessä: indeksi tulee taulusta eikä kutsupaikasta.
  assert.equal(livianLinssiIndeksi('ihmisen-matka', kaanonissa[0]), 0);
  assert.equal(livianLinssiIndeksi('ihmisen-matka', 'loppu'), kaanonissa.length - 1);
  assert.equal(livianLinssiIndeksi('ihmisen-matka', 'avaus'), null);
  assert.equal(livianLinssiIndeksi('ei-linssia', 'loppu'), null);
  // Lähde on nimeämislistalla, joten työkalu löytää tekstit.
  assert.ok(LIVIAN_AANILAHTEET.includes('ihmisen-matka'));
});

test('välihuomio soi kertojan päälle eikä kertoja väisty', () => {
  assert.match(OHJAAJA, /soitaLivianLinssiAani\(/);
  const puhe = readFileSync(new URL('../js/liviapuhe.js', import.meta.url), 'utf8');
  assert.match(puhe, /export const LIVIAN_VALIHUOMION_VAIMENNUS = 0\.7;/);
  assert.match(puhe, /vaimennus = LIVIAN_VALIHUOMION_VAIMENNUS, vaista = false/);
  // Kupla on linssin oma (ohittaa kuplaportin) ja välihuudon mittainen.
  assert.match(OHJAAJA, /polloLinssikupla\(\[jakso\.pulu\], \{/);
  assert.match(OHJAAJA, /luokka: 'aikajana-kertomus-pulu'/);
  assert.match(CSS, /\.aikajana-kertomus-pulu \{/);
});

/* ==================== 5. VANOJEN PITO ==================== */

test('pitotila ei pura piirrettyä vanaa eikä leimauta sitä rintamaksi', () => {
  // Ilman pitoa mennyt kärki on täydessä rintamavärissä (vanha käytös).
  assert.equal(karjenPaino(40000, 50000, 3000), 1);
  // Pitotilassa sama kärki on vanhaa väestöä.
  assert.equal(karjenPaino(40000, 50000, 3000, { pito: true }), 0);
  // Rintamalla kaava on ennallaan kummassakin tilassa.
  assert.equal(karjenPaino(50000, 50000, 3000), 1);
  assert.equal(karjenPaino(50000, 50000, 3000, { pito: true }), 1);
  assert.ok(Math.abs(karjenPaino(51500, 50000, 3000, { pito: true }) - 0.5) < 1e-9);
  const vanat = readFileSync(new URL('../js/aikajana-vanat.js', import.meta.url), 'utf8');
  assert.match(vanat, /const matka = pito \? Math\.max\(o\.pitomatka \?\? 0, kuljettu\) : kuljettu;/);
  const virrat = readFileSync(new URL('../js/aikajana-virrat.js', import.meta.url), 'utf8');
  assert.match(virrat, /asetaPito: \(paalla\) => \{ tila\.pito = Boolean\(paalla\); \}/);
  // Esitys kytkee pidon päälle valojen syttyessä ja pitää sen päällä.
  assert.match(OHJAAJA, /ajo\.virrat\?\.asetaPito\?\.\(true\);/);
});

/* ==================== ESITYKSEN PINNAT ==================== */

test('esityksen pinnat ovat olemassa: pimeä, teksti, kuva ja koukku', () => {
  // Musta ruutu ja sen purku (Raamattu ALKAA MUSTASTA RUUDUSTA).
  assert.match(CSS, /\.aikajana-esitys-peite \{/);
  assert.match(CSS, /\.aikajana-esitys-peite\.pois \{[\s\S]{0,120}2600ms/);
  // Pimeässä vain sulkunappi.
  assert.match(CSS, /\.aikajana\.esitys-pimea \.aikajana-nappi:not\(\.aikajana-sulje\)/);
  // Esinerivi pois esityksen ajaksi ja takaisin lopuksi.
  assert.match(CSS, /\.aikajana\.esitys-kaynnissa \.aikajana-nauha \{/);
  assert.match(OHJAAJA, /ajo\.juuri\?\.classList\.remove\('esitys-kaynnissa'\);/);
  // Kuva on sivuosassa: pieni, kohteen vieressä, kytkettävissä pois.
  assert.equal(IHMISEN_MATKA_KUVAT_ESITYKSESSA, true);
  assert.ok(KUVAN_OSUUS > 0.15 && KUVAN_OSUUS < 0.3, `kuvan osuus ${KUVAN_OSUUS}`);
  assert.match(CSS, /\.aikajana-kertomuskuva \{/);
  assert.match(OHJAAJA, /esityskuvat/);
  // Lähikuva on väljempi kuin pysäkkiajon, muttei koko pallo.
  assert.ok(ESITYKSEN_LAHIKUVA > 560 && ESITYKSEN_LAHIKUVA < 4000);
  // Tutkimusvaiheen koukku on ohjaajan viimeinen teko.
  assert.match(OHJAAJA, /ajo\.ui\?\.aloitaTutkimusvaihe\?\.\(\);/);
});

test('aikaselain seuraa esitystä ja ohjaa sitä (7.9.2026)', () => {
  /*
   * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN": alareunan nauha korvaa
   * jaksojen selaamisen. Ohjaaja antaa sille kaksi asiaa — valitun
   * viivan (aseta jakson vaihtuessa) ja kaksi takaisinkutsua
   * (esikatsele, valitse). Nauhan oma pinta on js/linssit/aikaselain.js
   * ja sen testit tests/aikaselain.test.mjs.
   */
  assert.match(OHJAAJA, /ajo\.aikaselain\?\.aseta\?\.\(jakso\.id\);/,
    'nauhan valinta ei seuraa jakson vaihtumista');
  assert.match(OHJAAJA, /\n    esikatsele,\n    valitse,/,
    'ohjaaja ei tarjoa nauhalle esikatselua eikä valintaa');
  // Veto vaientaa kertojan; kello ja vanat seuraavat sormea ilman pitoa.
  assert.match(OHJAAJA, /const kelaaKello = \(vuosia\) => \{/);
  assert.match(OHJAAJA, /vanat\?\.\(\)\?\.paivita\?\.\(arvo, \{ pito: false \}\)/,
    'kelaus ei päivitä vanoja suoraan (tutkimusvaiheessa silmukka ei lue kelloa)');
  // Tauko/Jatka, ↺ ja ✕ jäävät palkkiin: nauha ei korvaa niitä.
  // (Palkin yhteiset tyylit ovat 8.9.2026 alkaen `.aikajana.palkki`:ssa —
  // sama palkki on nyt myös keksintölinssillä.)
  assert.match(CSS, /\.aikajana\.palkki \.aikajana-alusta \{/);
  assert.match(CSS, /\.aikajana\.palkki \.aikajana-sulje \{/);
});

test('loppunäkymä asemoidaan erikseen, ei jätetä kesken jääneen ajon varaan', () => {
  /*
   * Viimeisen jakson kamera-ajo mitoitetaan VARAKESTOSTA (tekstin
   * pituudesta), ja äänite on usein lyhyempi: ajo oli 8,9 s ja jakso
   * 5,6 s, jolloin esitys päättyi puolittaiseen zoomiin (savuke mittasi
   * 2 698 lautayksikköä odotetun 3 546 sijaan). `paata` ajaa saman
   * rajauksen uudestaan lyhyellä liu'ulla ENNEN tutkimusvaiheen
   * koukkua, joten loppunäkymä on aina koko pallo.
   */
  assert.ok(LOPUN_ASETUS_MS > 0 && LOPUN_ASETUS_MS <= 2000, `${LOPUN_ASETUS_MS} ms`);
  const paata = OHJAAJA.match(/function paata\(\{ kamera = true \} = \{\}\) \{[\s\S]*?\n  \}/)[0];
  assert.match(paata, /const viimeinen = kertomus\[tila\.i\];/);
  // `kamera: false` on muistista jatkettu tutkimusvaihe: kamera on jo
  // muistin paikassa, eikä loppunäkymä saa ajaa sen päälle.
  assert.match(paata, /if \(kamera && viimeinen\?\.alue\) ajaAlueeseen\(viimeinen\.alue, reduced \? 0 : LOPUN_ASETUS_MS\);/);
  // Asemointi on ENNEN koukkua: tutkimusvaihe saa ottaa kameran omiin
  // käsiinsä ja sen ajo syrjäyttää tämän (js/pallolauta/kamera.js).
  assert.ok(paata.indexOf('ajaAlueeseen') < paata.indexOf('aloitaTutkimusvaihe'),
    'loppunäkymä on asemoitava ennen tutkimusvaiheen koukkua');
  // Kaanonin viimeisellä jaksolla on alue, jota tämä käyttää.
  assert.equal(IHMISEN_MATKA_KERTOMUS.at(-1).alue, 'maailma');
});

test('kuva on "esillä" vasta kun poksahdus on alkanut', () => {
  /*
   * Kehys syntyy scale(0,6)-kokoisena ja saa `esilla`-luokan vasta
   * seuraavassa kehyksessä. Jos tila() kertoisi pelkästä DOMissa
   * olosta, mittaaja voisi osua siihen yhteen kehykseen, jossa kuva on
   * vielä kutistettuna — savuke mittasi 110 px odotetun 183 px:n
   * sijaan (110 = 0,6 × 183).
   */
  assert.match(OHJAAJA,
    /kuvaEsilla: Boolean\(tila\.kuva\?\.isConnected && tila\.kuva\.classList\.contains\('esilla'\)\)/);
  assert.match(CSS, /\.aikajana-kertomuskuva \{[\s\S]{0,600}scale\(0\.6\)/);
  assert.match(CSS, /\.aikajana-kertomuskuva\.esilla \{[^}]*scale\(1\)/);
});

test('esitys ei aja pysäkkikelloa eikä anna virtojen ohjata kameraa', () => {
  // tila.i jää −1, jolloin js/aikajana-virrat.js ohjaaKameraa on epätosi.
  assert.ok(!/ajo\.tila\.i\s*=/.test(OHJAAJA), 'ohjaaja ei saa asettaa pysäkki-indeksiä');
  assert.match(OHJAAJA, /ajo\.tila = \{ \.\.\.ajo\.tila, vuosi: paikka \};/);
  const virrat = readFileSync(new URL('../js/aikajana-virrat.js', import.meta.url), 'utf8');
  assert.match(virrat, /ajo\.tila\.i >= 0/);
});

/* ==================== KÄRKI EI SAA POISTUA KUVASTA ==================== */

/*
 * Raamattu "IHMISEN MATKA: ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA
 * HUKKUA" (omistaja 7.9.2026 klo 18.15). Vanat tässä ovat MITATTUJA
 * (kontti 7.9.2026, ajo.virrat.tutkimus().pisteet()): selkäranka kulkee
 * Omosta (4,8° N, 35,8° I, 233 000) Chileen (14 131), ja 'ranta'-jaksossa
 * (164 000 → 75 000) sen kärki on Etiopiassa → Arabiassa, kun kamera
 * katsoo Pinnacle Pointia (−34,2°, 22,1°).
 */
const SELKARANKA = {
  tunnus: 'selkaranka',
  pisteet: [
    [4.8, 35.8, 233000], [12, 43, 164000], [13, 44, 110000], [24, 58, 75000],
    [47, 80, 70000], [52, 85, 50000], [66, -176, 32000], [65, -168, 22000],
    [-16, -74, 14500], [-41.7, -73.2, 14131],
  ],
};
const EUROOPPA = {
  tunnus: 'eurooppa',
  pisteet: [[31.8, -8.7, 300000], [34, 6, 240000], [31, 30, 164000], [36, 36, 50000], [39, -9, 41227]],
};
const PINNACLE = { lat: -34.2, lon: 22.1 };

test('kärkisääntö: ranta-jaksossa selkärangan kärki tulee kameraan Pinnacle Pointin kanssa', () => {
  const { rajaus, karjet } = jaksonRajaus({
    kohde: PINNACLE, vanat: [SELKARANKA, EUROOPPA], alku: 164000, loppu: 75000, pitoMin: 164000,
  });
  assert.ok(karjet.length >= 5, `kärkiä ${karjet.length}`);
  // Laatikko ulottuu Kapista Arabiaan: yli 50° korkea.
  assert.ok(rajaus.korkeusAst > 50, `korkeus ${rajaus.korkeusAst}`);
  assert.ok(rajaus.lat > -34.2 && rajaus.lat < 24, `keskipiste ${rajaus.lat}`);
  // Euroopan haara (Egypti, liike 0°) ei ole "kulkeva": se ei laajenna laatikkoa.
  assert.ok(!karjet.some(([lat, lon]) => Math.abs(lat - 31) < 0.5 && Math.abs(lon - 30) < 0.5),
    'liikkumaton haara otettiin mukaan');
});

test('kärkisääntö: ilman kulkevaa vanaa rajaus on pelkkä kohde (entinen lähikuva)', () => {
  const { rajaus, karjet } = jaksonRajaus({ kohde: PINNACLE, vanat: [], alku: 164000, loppu: 75000 });
  assert.equal(karjet.length, 0);
  assert.equal(rajaus.leveysAst, 0);
  assert.equal(rajaus.lat, PINNACLE.lat);
  assert.deepEqual(jaksonRajaus({ kohde: null, vanat: [SELKARANKA], alku: 1, loppu: 0 }), { rajaus: null, karjet: [] });
});

test('kärkisääntö: taaksepäin kulkeva jakso pitää nykyisen rintaman kuvassa', () => {
  // Blombos: kello 75 000 → 110 000, pito on jo 75 000:ssa. Uutta ei
  // piirry, mutta rintama (Arabia, 24° N 58° I) pysyy kuvassa.
  const { karjet } = jaksonRajaus({
    kohde: { lat: -34.4, lon: 21.2 }, vanat: [SELKARANKA], alku: 75000, loppu: 110000, pitoMin: 75000,
  });
  assert.equal(karjet.length, 1);
  assert.ok(Math.abs(karjet[0][0] - 24) < 0.5 && Math.abs(karjet[0][1] - 58) < 0.5, JSON.stringify(karjet));
});

test('kärkisääntö: jo piirretty osuus ei ole rintama, ja toinen näyttämö jää pois', () => {
  // Chauvet (36 000 → 3 000) aikahypyn jälkeen: pito on 14 131:ssä, joten
  // selkärangan toinen kierros Siperiasta Chileen ei ole uutta —
  // eikä se saa vetää kameraa Ranskasta puolen pallon näkymään.
  const chauvet = { lat: 44.4, lon: 4.4 };
  const { karjet } = jaksonRajaus({ kohde: chauvet, vanat: [SELKARANKA], alku: 36000, loppu: 3000, pitoMin: 14131 });
  assert.equal(karjet.length, 0, JSON.stringify(karjet));
  // Denisova (50 000 → 32 000): selkäranka Altailta Beringiaan on 60°
  // päässä ja tulee mukaan; Euroopan haara Lissabonissa on yli 45°
  // päässä eikä tule (haaran katto).
  const denisova = { lat: 51.4, lon: 84.7 };
  const d = jaksonRajaus({ kohde: denisova, vanat: [SELKARANKA, EUROOPPA], alku: 50000, loppu: 32000, pitoMin: 50000 });
  assert.ok(d.karjet.some(([, lon]) => lon < -170), 'selkärangan kärki Beringiassa puuttuu');
  assert.ok(!d.karjet.some(([lat, lon]) => lat < 41 && lon < 0), 'Euroopan haara vetäisi kameran Lissaboniin');
  assert.ok(KARJEN_ETAISYYS_MAX_AST > HAARAN_ETAISYYS_MAX_AST);
  assert.ok(KARJEN_LIIKE_MIN_AST > 0 && KARJEN_LIIKE_MIN_AST < 10);
});

test('kohteen kamera-ajo käyttää kärkisääntöä eikä alita lähikuvaa', () => {
  const ajo = OHJAAJA.match(/const ajaKohteeseen = \(tunnus, kesto, \{ alku = null, loppu = null \} = \{\}\) => \{[\s\S]*?\n  \};/)[0];
  assert.match(ajo, /jaksonRajaus\(\{/);
  assert.match(ajo, /Math\.max\(ESITYKSEN_LAHIKUVA, rajauksenLeveys\(rajaus, kuvasuhde\(\), KARJEN_VARA\)/);
  // Jakso antaa kellovälinsä ajolle (alku → loppu), ei pelkkää kohdetta.
  assert.match(OHJAAJA, /ajaKohteeseen\(jakso\.kohde, kesto, \{ alku: tahti\.alku, loppu: tahti\.loppu \}\);/);
  // Mittari savukkeelle: jakson kärjet.
  assert.match(OHJAAJA, /karjet: tila\.karjet,/);
});

/* ==================== KUVA JA LAMPPU AVAAVAT KORTIN, MUISTI ==================== */

test('kartan kuva ja lamppu avaavat noston kortin; esitys jatkuu muistista', () => {
  // Kuva ottaa napautuksen itse (merkkikerros on pointer-events: none).
  assert.match(OHJAAJA, /kehys\.addEventListener\('click', \(e\) => \{\n\s*e\.stopPropagation\(\);\n\s*ajo\.ui\?\.nostokortti\?\.avaa\?\.\(tunnus\);/);
  assert.match(CSS, /\.aikajana-kertomuskuva\.esilla \{ pointer-events: auto; cursor: pointer; \}/);
  // Lamppu: kertomuskaarella napautus avaa kortin eikä palaa tyhjänä.
  assert.match(MOOTTORI, /napautaValoa\(i\) \{[\s\S]{0,400}if \(this\.esitys\) \{\n\s*const t = this\.tapahtumat\[i\];\n\s*if \(t\?\.tunnus\) this\.ui\.nostokortti\?\.avaa\?\.\(t\.tunnus\);/);
  // Muisti: aloita({ muisti }) jatkaa ilman pimeää ja avausta.
  assert.match(OHJAAJA, /aloita\(\{ muisti = null \} = \{\}\) \{[\s\S]{0,200}if \(muisti\) return jatkaMuistista\(muisti\);/);
  assert.match(OHJAAJA, /asennaPinnat\(\{ pimea: false \}\);/);
  // Pidon pohja piirretään ennen jatkoa.
  assert.match(OHJAAJA, /ajo\.virrat\?\.vanat\?\.\(\)\?\.paivita\?\.\(muisti\.pitoMin, \{ pito: true \}\);/);
  // Jakson vaihto kirjoittaa muistin.
  assert.match(OHJAAJA, /ajo\.tallennaMuisti\?\.\(\);/);
});
