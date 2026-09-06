/*
 * IHMISEN MATKA — toinen aikajanalinssi (omistajan päätös 5.9.2026).
 *
 * Linssi on nykyihmisen leviäminen Afrikasta koko maapallolle: 20
 * pysäkkiä 300 000 vuotta sitten → n. 1300 jaa. Aineisto (pysäkit,
 * tekstit, kuvat) kirjoitetaan omassa tiedostossaan; TÄSSÄ mitataan
 * MOOTTORIPUOLI, eli ne kolme asiaa, jotka moottoriin lisättiin ja
 * jotka rikkoutuvat hiljaa:
 *
 *   1. KELLO. "Vuotta sitten" -asteikko: pysäkkivälit ovat yhtä pitkiä,
 *      lukema interpoloidaan logaritmisesti ja rullat pyörivät
 *      LASKEVAAN suuntaan pyöristettynä (300 000 → 3 000 → n. 1250
 *      jaa.). Väärä pyöristys tai suunta ei kaada mitään: kello vain
 *      näyttäisi väärää lukua tai pyörisi harmaana sotkuna.
 *   2. REITTIVIIVA. Valot ovat yksi matka, ja niiden väliin piirtyy
 *      isoympyrä. Puuttuva viiva näyttää tyhjältä merelta — ei virhe
 *      missään lokissa.
 *   3. KAMERA. Lähikuva on kaksinkertainen ja valtameren ylityksessä
 *      kamera nousee kauemmas; väärä mitta jättää lähtörannan ruudun
 *      ulkopuolelle eikä kukaan näe matkaa.
 *
 * Lisäksi vartioidaan, ETTEI KEKSINTÖLINSSI MUUTU: jokainen yleistys on
 * kaaren valinta, ja ilman kenttää käytös on entinen. Sen tarkistavat
 * myös tests/aikajana*.test.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ASTEIKON_VALI, KELLON_NUMEROT, KELLON_ASKELEET, luoAsteikko, jarjestaTapahtumat,
  kellonAskel, kellonNaytto, kellonVuositeksti, valinAskel,
  vuosiaSittenLukema, asetaMatkamittari, reitinPisteet, REITIN_PAKSUUS_PX, REITIN_TIHENNYS_AST,
  pysakinLahikuva, AIKAJANAN_HYPYN_KERROIN, AIKAJANAN_HYPYN_KATTO, AIKAJANAN_LAHIKUVA_LEVEYS,
  LAUTAYKSIKKOA_ASTEELLA, AIKAJANA_VIIVE_MS, paneelikuvanOsoite,
  aikajananHypynKaari, hypynLeveys, reitinKuvio, REITIN_KARJEN_ENNAKKO,
  AJON_REIAN_KERROIN, REITIN_VARI,
} from '../js/aikajana.js';
import {
  LINSSI, PYSAKIT, IHMISEN_MATKAN_LAHIKUVA, ihmisenMatkanPysakit,
} from '../js/linssit/ihmisen-matka.js';
import { IHMISEN_MATKA_KUVAJUURI } from '../js/linssit/ihmisen-matka-data.js';
import { LINSSI as KEKSINTOLINSSI } from '../js/linssit/keksinnot.js';
import {
  kaarenPuheet, luennanOsoite, luennanPuhe, luennanTeksti, luennanTiedosto,
} from '../js/linssipuhe.js';
import { LINSSIT as LUENTAKAARET, ampariKansio, valitsePysakit } from '../tools/generoi-linssiluennat.mjs';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { tarkistaLinssi } from '../js/linssit/kerros.js';
import { MUSIIKKILAJIT } from '../js/siirtymamusiikki.js';
import { LAJIT } from '../tools/generoi-siirtymamusiikki.mjs';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { kulmaAsteina } from '../js/pallolauta/reitit.js';

const MOOTTORI = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');
const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const LUENTATYONKULKU = readFileSync(
  new URL('../.github/workflows/generoi-linssiluennat.yml', import.meta.url), 'utf8',
);
const MUSIIKKITYONKULKU = readFileSync(
  new URL('../.github/workflows/generoi-siirtymamusiikki.yml', import.meta.url), 'utf8',
);

/** Yhden metodin lohko moottorista (sama apuri kuin tests/aikajana.test.mjs). */
function metodi(nimi) {
  const osuma = MOOTTORI.match(new RegExp(`\\n  ${nimi}\\([^)]*\\) \\{[\\s\\S]*?\\n  \\}`));
  assert.ok(osuma, `moottorista ei löydy metodia ${nimi}`);
  return osuma[0];
}

/** Kolmen pysäkin koekaari samalla muodolla kuin oikea aineisto. */
const KOEKAARI = {
  otsikko: 'Koe',
  asteikko: 'vuosiaSitten',
  tapahtumat: [
    { vuosiaSitten: 300000, ajoitus: '300 000 vuotta sitten', otsikko: 'A' },
    { vuosiaSitten: 3000, ajoitus: '3 000 vuotta sitten', otsikko: 'B' },
    { vuosiaSitten: 776, ajoitus: 'n. 1250 jaa.', otsikko: 'C' },
  ],
};

/* ══════════════════════════════════════════════════════════════════
 * 1. LINSSISOPIMUS JA REKISTERI
 * ══════════════════════════════════════════════════════════════════ */

test('linssi täyttää linssisopimuksen ja on rekisterissä', () => {
  tarkistaLinssi({ LINSSI }, 'ihmisen-matka');
  const rivi = LINSSIT.find((r) => r.tunnus === 'ihmisen-matka');
  assert.ok(rivi, 'linssi puuttuu js/linssit/rekisteri.js:stä');
  // Tietäjäpistereitti (manner: null) kuten keksinnöillä ja radiolla.
  assert.equal(rivi.manner, null);
  assert.equal(LINSSI.kerros, false, 'aikajanalinssi ei piirrä pysyvää kerrosta');
  assert.deepEqual(LINSSI.laudat, ['maailmankartta'], 'sama lauta kuin keksinnöillä');
  assert.equal(typeof LINSSI.pallolle, 'function', 'pallolle puuttuu');
  // Kahva purkaa laudan osan — muuten valot jäisivät palamaan.
  assert.match(String(LINSSI.pallolle), /pura\(PALLON_OSA\)/);
  // Matkalaukun varusteen kuva haetaan tunnuksella (js/ui.js aarreIkoni);
  // puuttuva tiedosto pudottaa viivakuvakkeeseen, joten kuvaa ei vaadita.
  assert.ok(LINSSI.ikoni.includes('<path'), 'viivakuvake puuttuu');
  assert.ok(LINSSI.lahde.osoite.startsWith('https://'));
});

test('kaari pyytää moottorilta juuri ne kolme yleistystä', () => {
  const k = LINSSI.aikajana;
  assert.equal(k.asteikko, 'vuosiaSitten');
  // Reittiviiva on POIS tästä linssistä (omistajan päätös 6, 6.9.2026):
  // pallolla leviäminen näytetään värivirtoina (tests/aikajana-virrat.test.mjs).
  assert.equal(k.reitti, false);
  assert.equal(k.hyppykamera, true);
  assert.equal(k.lahikuva, IHMISEN_MATKAN_LAHIKUVA);
  assert.equal(k.musiikki, 'ihmisen-matka');
  assert.equal(k.kuvasovitus, 'contain', 'koko kuva näkyviin, ei cover-rajausta');
  assert.ok(k.esittely?.teksti, 'avausjakson teksti puuttuu');
  assert.ok(k.loppusanat?.teksti, 'loppusanat puuttuvat');
  assert.ok(k.jakso.includes('300 000'), 'kellorivin jakso puuttuu');
  // Oma luentakansio: ilman sitä ajo soittaisi keksintöjen luennat.
  assert.match(k.luentajuuri, /ihmisen-matka\/puhe$/);
  // Alue on koko maapallo (kamera peräytyy siihen kaaren lopussa).
  assert.equal(k.alue.w, 12000);
});

test('pysäkit käännetään moottorin kentiksi: esine korttiin, kuva paneeliin', () => {
  const [eka] = ihmisenMatkanPysakit([{
    vuosiaSitten: 1000,
    lat: 60,
    lon: 25,
    kuva: { osoite: 'https://x.test/a.jpg' },
    esine: { osoite: 'https://x.test/b.jpg' },
  }]);
  assert.equal(eka.ilmio.osoite, 'https://x.test/a.jpg', 'havainnekuva ei mene paneeliin');
  assert.equal(eka.kuva.osoite, 'https://x.test/b.jpg', 'esine ei mene kortille');
  // Laudan koordinaatit lasketaan pelin omalla projektiolla.
  const kohta = projisoiLaudalle('maailmankartta', 25, 60);
  assert.ok(Math.abs(eka.x - kohta.x) < 1e-9 && Math.abs(eka.y - kohta.y) < 1e-9);
  // Puuttuva esine on sallittu tila: kortti näyttää tyhjän kehyksen.
  const [tyhja] = ihmisenMatkanPysakit([{ vuosiaSitten: 1, lat: 0, lon: 0 }]);
  assert.equal(tyhja.kuva, null);
});

test('aineiston pysäkeillä on ajoitus, paikka ja asteet', () => {
  assert.ok(PYSAKIT.length >= 3, 'tynkäkin on kolme pysäkkiä');
  for (const t of PYSAKIT) {
    assert.ok(Number.isFinite(t.vuosiaSitten) && t.vuosiaSitten > 0, `${t.otsikko}: vuosiaSitten`);
    assert.ok(t.ajoitus, `${t.otsikko}: ajoitus puuttuu — kello näyttäisi tyhjää`);
    assert.ok(t.paikka, `${t.otsikko}: paikka puuttuu`);
    assert.ok(Number.isFinite(t.lat) && Number.isFinite(t.lon), `${t.otsikko}: asteet`);
    assert.ok(t.lahde, `${t.otsikko}: lähde puuttuu`);
  }
});

/* ══════════════════════════════════════════════════════════════════
 * 2. KELLO: "VUOTTA SITTEN" -ASTEIKKO
 * ══════════════════════════════════════════════════════════════════ */

test('asteikko antaa pysäkeille yhtä pitkät välit ja kellon koordinaatit', () => {
  const asteikko = luoAsteikko(KOEKAARI);
  assert.equal(asteikko.laji, 'vuosiaSitten');
  assert.equal(asteikko.suunta, -1, 'lukema pienenee ajan kuluessa');
  assert.equal(asteikko.yksikko, 'v. sitten');
  assert.equal(asteikko.numerot, 6, '300 000 tarvitsee kuusi rullaa');
  assert.equal(asteikko.loppu, 2 * ASTEIKON_VALI);
  assert.ok(asteikko.alku < 0, 'kello ehtii näkyä ennen ensimmäistä valoa');

  const pysakit = jarjestaTapahtumat(KOEKAARI.tapahtumat, asteikko);
  assert.deepEqual(pysakit.map((t) => t.otsikko), ['A', 'B', 'C'], 'vanhin ensin');
  assert.deepEqual(pysakit.map((t) => t.vuosi), [0, 10, 20], 'välit ovat yhtä pitkiä');
});

test('epäjärjestyksessä annettu aineisto järjestetään vanhimmasta uusimpaan', () => {
  const asteikko = luoAsteikko(KOEKAARI);
  const sekaisin = [...KOEKAARI.tapahtumat].reverse();
  const pysakit = jarjestaTapahtumat(sekaisin, asteikko);
  assert.deepEqual(pysakit.map((t) => t.otsikko), ['A', 'B', 'C']);
});

test('keksintökaari saa entisen asteikkonsa: vuosiluku, neljä rullaa, ylöspäin', () => {
  const asteikko = luoAsteikko({ alku: 1765, loppu: 1928, tapahtumat: [{ vuosi: 1769 }] });
  assert.equal(asteikko.laji, 'vuosi');
  assert.equal(asteikko.numerot, KELLON_NUMEROT);
  assert.equal(asteikko.suunta, 1);
  assert.equal(asteikko.yksikko, '');
  assert.equal(asteikko.alku, 1765);
  assert.equal(asteikko.lukema(1769.5), 1769.5, 'vuosiluku on lukema sellaisenaan');
  assert.equal(asteikko.askel(1769), 1);
  const pysakit = jarjestaTapahtumat([{ vuosi: 1783 }, { vuosi: 1769 }], asteikko);
  assert.deepEqual(pysakit.map((t) => t.vuosi), [1769, 1783], 'vuosi ei muutu');
});

test('lukema interpoloidaan logaritmisesti pysäkkien välillä', () => {
  const arvot = [300000, 3000, 776];
  // Päätepisteet osuvat tasan pysäkkeihin.
  assert.equal(vuosiaSittenLukema(0, arvot), 300000);
  assert.equal(vuosiaSittenLukema(10, arvot), 3000);
  assert.equal(vuosiaSittenLukema(20, arvot), 776);
  // Puolivälissä geometrinen keskiarvo (√(300 000 × 3 000) = 30 000),
  // ei aritmeettinen (151 500) — juuri tämä tekee syvästä ajasta
  // luettavan: suhde on vakio, ei erotus.
  assert.ok(Math.abs(vuosiaSittenLukema(5, arvot) - 30000) < 1, `${vuosiaSittenLukema(5, arvot)}`);
  // Monotonisesti laskeva koko matkan: kello ei koskaan peruuta.
  let edellinen = Infinity;
  for (let p = 0; p <= 20; p += 0.25) {
    const arvo = vuosiaSittenLukema(p, arvot);
    assert.ok(arvo < edellinen, `paikka ${p}: lukema ei laske`);
    edellinen = arvo;
  }
  // Rajojen ulkopuolella pidätellään päätearvoissa (avausjakson lyhyt
  // lähtö ennen ensimmäistä pysäkkiä).
  assert.equal(vuosiaSittenLukema(-5, arvot), 300000);
  assert.equal(vuosiaSittenLukema(999, arvot), 776);
  assert.equal(vuosiaSittenLukema(0, []), 0);
});

/*
 * ASKEL TULEE PYSÄKKIVÄLISTÄ (Fablen arvio 6.9.2026). Ensimmäinen
 * toteutus otti askeleen lukeman suuruudesta, ja ensimmäisellä välillä
 * (300 000 → 233 000, noin 2,6 s) kello ehti vaihtua 67 kertaa: luku
 * pyöri harmaana sotkuna. Nyt jokainen väli saa oman askeleensa, ja
 * vaihtoja on kaikilla väleillä muutama sekunnissa.
 */
test('kellon askel tulee pysäkkivälistä eikä lukeman suuruudesta', () => {
  // Yksi väli: suurin tikas, joka mahtuu väliin kuudesti.
  assert.equal(valinAskel(300000, 233000), 10000);
  assert.equal(valinAskel(45000, 42000), 500);
  assert.equal(valinAskel(40500, 40000), 100, 'lyhyinkin väli liikuttaa kelloa');
  assert.equal(valinAskel(2850, 750), 200);
  // Jokainen tikas on sadan monikerta: kaksi viimeistä nollaa seisovat.
  for (const tikas of KELLON_ASKELEET) assert.equal(tikas % 100, 0, `${tikas}`);

  // Oikea aineisto: vaihtoja on välillä 5–15, ei 67 eikä yhtä.
  const arvot = LINSSI.aikajana.tapahtumat.map((t) => t.vuosiaSitten);
  for (let i = 0; i < arvot.length - 1; i += 1) {
    const askel = kellonAskel((arvot[i] + arvot[i + 1]) / 2, arvot);
    const muutoksia = (arvot[i] - arvot[i + 1]) / askel;
    assert.ok(muutoksia >= 4 && muutoksia <= 15,
      `väli ${arvot[i]}→${arvot[i + 1]}: ${muutoksia.toFixed(1)} vaihtoa`);
  }
  // Ilman arvoja (tai niiden ulkopuolella) palautuu aina jokin askel.
  assert.equal(kellonAskel(300000), 100);
  assert.equal(kellonAskel(999999, arvot), valinAskel(arvot[0], arvot[1]));

  // Laskeva kello pyöristää YLÖS: näkyvä luku on se, josta ollaan
  // matkalla seuraavaan.
  assert.equal(kellonNaytto(245678.9, 1000, -1), 246000);
  assert.equal(kellonNaytto(245678.9, 1000, 1), 245000);
  assert.equal(kellonNaytto(1769.4, 1, 1), 1769, 'keksintökello ennallaan');
});

test('kaaren loppupäässä kello näyttää vuosiluvun tekstinä', () => {
  // Viimeinen pysäkki on 750 vuotta sitten = n. 1250 jaa., tasan se
  // luku, jonka aineiston `ajoitus` sanoo.
  assert.equal(kellonVuositeksti(750), 'n. 1250 jaa.');
  assert.equal(kellonVuositeksti(1900), null, 'rajalla ollaan yhä syvässä ajassa');
  // Tarkkuus on YKSI VUOSI (6.9.2026 keskipäivä): vuosilukukin juoksee
  // eikä hyppää viidenkymmenen vuoden askelin.
  assert.equal(kellonVuositeksti(1899), 'n. 101 jaa.');
  assert.equal(kellonVuositeksti(1247.6), 'n. 752 jaa.', 'vuosiluku ei juokse vuosina');
  assert.equal(kellonVuositeksti(300000), null);
  assert.match(LINSSI.aikajana.tapahtumat.at(-1).ajoitus, /1250/);
  // Asteikko tarjoaa tekstin; keksintökaarella sitä ei ole koskaan.
  assert.equal(luoAsteikko(KOEKAARI).teksti(750), 'n. 1250 jaa.');
  assert.equal(luoAsteikko({ tapahtumat: [] }).teksti(750), null);
  // Moottori vaihtaa rullat tekstiin ja takaisin yhdessä paikassa.
  const nayta = metodi('naytaVuosi');
  assert.match(nayta, /const vuositeksti = this\.asteikko\.teksti\?\.\(arvo\) \?\? null;/);
  assert.match(nayta, /this\.naytaKellonTeksti\(vuositeksti\);/);
  assert.match(nayta, /if \(vuositeksti === null\) \{/, 'rullia ei kosketa tekstitilassa');
  assert.match(metodi('naytaKellonTeksti'), /classList\.add\('tekstina'\)/);
  assert.match(CSS, /\.aikajana-kello\.tekstina \.vuosi-numero/);
});

/** Rullat tynkänä (sama muoto kuin tests/aikajana.test.mjs). */
const tynkaRivi = () => ({ textContent: '', style: {} });
const tynkaRullat = (n) => Array.from({ length: n }, () => ({
  vanha: tynkaRivi(), uusi: tynkaRivi(), merkki: null,
}));

test('matkamittari laskee alaspäin ja pyöristyksen nollat seisovat', () => {
  const rullat = tynkaRullat(6);
  asetaMatkamittari(rullat, 300000, { heti: true, askel: 1000, suunta: -1 });
  assert.deepEqual(rullat.map((r) => r.vanha.textContent), ['3', '0', '0', '0', '0', '0']);
  // Seuraava numero on YHTÄ PIENEMPI (laskeva mittari).
  assert.equal(rullat[2].uusi.textContent, '9', 'tuhatrullan seuraava numero on 9 (0 − 1)');

  // 245 700 → näkyvä luku 246 000, ja tuhatrulla on 30 % matkalla 245:een.
  asetaMatkamittari(rullat, 245700, { askel: 1000, suunta: -1 });
  assert.deepEqual(rullat.map((r) => r.merkki), ['2', '4', '6', '0', '0', '0']);
  assert.equal(rullat[2].vanha.style.transform, 'translateY(30%)', 'tuhatrulla ei liiku alaspäin');
  assert.equal(rullat[2].uusi.style.transform, 'translateY(-70%)', 'uusi numero tulee ylhäältä');
  // Askeleen alapuoliset rullat ovat pyöristyksen nollia: ne seisovat.
  assert.equal(rullat[5].vanha.style.transform, 'translateY(0%)');
  assert.equal(rullat[4].vanha.style.transform, 'translateY(0%)');
  // Sadat eivät liiku, koska tuhat ei ole vielä nollassa.
  assert.equal(rullat[1].vanha.style.transform, 'translateY(0%)');

  // 239 300 → näkyvä luku 240 000: tuhatrulla on nollassa, joten
  // sadatkin lähtevät liikkeelle (mekaanisen mittarin lainaus).
  asetaMatkamittari(rullat, 239300, { askel: 1000, suunta: -1 });
  assert.equal(rullat[2].merkki, '0');
  assert.equal(rullat[1].vanha.style.transform, 'translateY(70%)');
  assert.equal(rullat[1].uusi.textContent, '3', 'sadoissa seuraava numero on 4 − 1');
});

/*
 * KELLO VILISEE (omistaja 6.9.2026 keskipäivä, sanatarkasti:
 * *"Vuosinumerot saisivat vilistää yksittäisistä numeroista alkaen
 * vuosituhansien läpi."*).
 *
 * Saman päivän aamuversio pyöristi näytetyn lukeman pysäkkivälin
 * askeleeseen (1 000 tai 10 000 vuotta), jolloin kello luki "165 000"
 * ja kaksi tai kolme viimeistä nollaa seisoivat koko kaaren ajan.
 * Tämä vartija ajaa yhden oikean pysäkkivälin läpi kellon omalla
 * asteikolla ja vaatii, että jokainen neljä alinta rullaa vaihtaa
 * numeroa — ja että ylimmät vaihtavat harvemmin kuin alimmat.
 */
test('kellon lukema on jatkuva: kaikki neljä alinta numeroa vilisevät', () => {
  const arvot = LINSSI.aikajana.tapahtumat.map((t) => t.vuosiaSitten);
  const rullat = tynkaRullat(6);
  const suunta = luoAsteikko(LINSSI.aikajana).suunta;
  assert.equal(suunta, -1);
  // Pinnacle Pointin väli (164 000 → 105 000) sekunnin kehyksinä:
  // kello etenee ASTEIKON_VALI yksikköä pysäkkiväliä kohti.
  const alkupaikka = 2 * ASTEIKON_VALI;
  const kehyksia = 160;
  const vaihdot = [0, 0, 0, 0, 0, 0];
  const lukemat = [];
  let edelliset = null;
  for (let k = 0; k <= kehyksia; k += 1) {
    const paikka = alkupaikka + (ASTEIKON_VALI * k) / kehyksia;
    const arvo = vuosiaSittenLukema(paikka, arvot);
    // Sama kutsu kuin moottorissa (naytaVuosi): askel 1, murto-osa päällä.
    asetaMatkamittari(rullat, arvo, { askel: 1, suunta, murtoOsa: true, heti: k === 0 });
    const merkit = rullat.map((r) => r.merkki);
    lukemat.push(Number(merkit.join('')));
    if (edelliset) {
      for (let i = 0; i < merkit.length; i += 1) if (merkit[i] !== edelliset[i]) vaihdot[i] += 1;
    }
    edelliset = merkit;
  }
  // NÄYTETTY LUKEMA ON TÄYSI: ei pyöristystä sataan eikä tuhanteen.
  assert.ok(lukemat.filter((v) => v % 100 !== 0).length > kehyksia / 2,
    'näytetty lukema pyöristyy yhä sataan');
  // Neljä alinta rullaa (ykköset, kympit, sadat, tuhannet) vilisevät.
  for (let i = 2; i < 6; i += 1) {
    assert.ok(vaihdot[i] > 0, `rulla ${i} seisoo koko välin (${vaihdot.join(', ')})`);
  }
  // Ykköset ja kympit vaihtuvat useammin kuin tuhannet ja kymmenettuhannet:
  // mekaaninen mittari, ei satunnaista välkyntää.
  assert.ok(vaihdot[5] >= vaihdot[4], `ykköset ${vaihdot[5]} < kympit ${vaihdot[4]}`);
  assert.ok(vaihdot[4] >= vaihdot[2], `kympit ${vaihdot[4]} < tuhannet ${vaihdot[2]}`);
  assert.ok(vaihdot[2] >= vaihdot[1], `tuhannet ${vaihdot[2]} < kymmenettuhannet ${vaihdot[1]}`);
  // PYSÄKILLÄ kello on aineiston omassa tasaluvussa.
  asetaMatkamittari(rullat, arvot[3], { askel: 1, suunta, murtoOsa: true, heti: true });
  assert.equal(rullat.map((r) => r.merkki).join(''), String(arvot[3]).padStart(6, '0'));

  // Moottori antaa mittarille lukeman sellaisenaan ja käyttää askelta
  // vain naksahduksen ja etunollien tahtina (naytaVuosi).
  const nayta = metodi('naytaVuosi');
  assert.match(nayta, /const askelteksti = vuositeksti \?\? String\(kellonNaytto\(arvo, askel, suunta\)\);/);
  assert.match(nayta, /const vaihtui = askelteksti !== this\.kelloAskel;/);
  assert.match(nayta, /askel: 1,/);
  assert.equal(luoAsteikko(LINSSI.aikajana).murtoOsa, true, 'syvä aika ei kuljeta murto-osaa');
});

test('keksintökellon rullaus ei muutu askeleen ja suunnan oletuksista', () => {
  const rullat = tynkaRullat(4);
  asetaMatkamittari(rullat, 1769, { heti: true });
  asetaMatkamittari(rullat, 1769.25);
  // Sama kuin ennen yleistystä: ykkösrulla neljänneksen YLÖS.
  assert.equal(rullat[3].vanha.style.transform, 'translateY(-25%)');
  assert.equal(rullat[3].uusi.style.transform, 'translateY(75%)');
  assert.equal(rullat[3].uusi.textContent, '0', 'seuraava numero on yhtä suurempi');
});

test('moottori lukee kellon asteikosta eikä kovakoodaa neljää numeroa', () => {
  assert.match(MOOTTORI, /this\.asteikko = luoAsteikko\(kaari\);/);
  assert.match(MOOTTORI, /this\.tapahtumat = jarjestaTapahtumat\(kaari\.tapahtumat, this\.asteikko\);/);
  const rakenna = metodi('rakenna');
  assert.match(rakenna, /const numerot = this\.asteikko\.numerot;/);
  assert.match(rakenna, /this\.asteikko\.ryhmitys/, 'tuhaterotin puuttuu');
  assert.match(rakenna, /aikajana-kelloyksikko/, 'yksikkö ("v. sitten") puuttuu kellosta');
  // Etunollat piiloon paikoillaan: numeroiden paikat eivät saa hypätä.
  assert.match(metodi('kellonSelite'), /classList\.toggle\('tyhja'/);
  assert.match(CSS, /\.vuosi-numero\.tyhja, \.vuosi-erotin\.tyhja \{ visibility: hidden; \}/);
});

/* ══════════════════════════════════════════════════════════════════
 * 3. AJOITUS NÄKYY TEKSTINÄ, EI KELLON KOORDINAATTINA
 * ══════════════════════════════════════════════════════════════════ */

test('kortin alla paikka, havainnekuvan alla ajoitus ja otsikko', () => {
  // Yksi apuri: ajoitus on datan teksti tai vuosiluku (keksinnöt).
  assert.match(MOOTTORI, /const ajoitus = \(t\) => t\.ajoitus \?\? t\.vuosi;/);
  const rakenna = metodi('rakenna');
  // Kortin alla vain nimi/paikka (omistaja 5.9.2026 ilta).
  assert.match(rakenna, /aikajana-kortti-henkilo', t\.henkilo \?\? paikka\(t\)/);
  assert.match(rakenna, /aria-label', `\$\{ajoitus\(t\)\}: \$\{t\.otsikko\}/);
  // Havainnekuvan alla ajoitus · otsikko — tai kuvaputken kuvateksti.
  const paneeli = metodi('vaihdaPaneeli');
  // Yhdistetty liekkierän kanssa (6.9.2026): otsikkorivi on vuosi ◈ nimi
  // (AIKAJANAN_EROTIN) ja kuvatekstillinen pysäkki näyttää vain nimen +
  // kuvatekstin sen alla.
  assert.match(paneeli, /'aikajana-ilmiokuvateksti-vuosi', String\(ajoitus\(t\)\)/);
  assert.match(paneeli, /if \(kuvateksti\) \{[\s\S]{0,300}aikajana-ilmiokuvateksti-kuvateksti', kuvateksti/);
  assert.match(paneeli, /if \(this\.kaari\.kuvasovitus === 'contain'\) kehys\.classList\.add\('kokonaan'\);/);
  assert.match(CSS, /\.aikajana-ilmiokuva\.kokonaan img \{ object-fit: contain; \}/);
  // Kellorivi: ajoitus · paikka.
  assert.match(MOOTTORI, /\[ajoitus\(t\), paikka\(t\)\]\.filter\(Boolean\)\.join\(' · '\)/);
});

/* ══════════════════════════════════════════════════════════════════
 * 4. REITTIVIIVA
 * ══════════════════════════════════════════════════════════════════ */

test('reittiviiva seuraa isoympyrää ja tihennetään pitkillä väleillä', () => {
  const lyhyt = reitinPisteet({ lat: 0, lon: 0 }, { lat: 0, lon: 1 });
  assert.deepEqual(lyhyt, [[0, 0], [0, 1]], 'lyhyt väli ei tarvitse välipisteitä');
  // Beringinsalmen mittainen hyppy: pisteitä on niin monta, ettei viiva
  // oikaise pallon läpi (yksi piste vähintään joka REITIN_TIHENNYS_AST).
  const pitka = reitinPisteet({ lat: 64, lon: -173 }, { lat: 61, lon: -149 });
  assert.ok(pitka.length > 5, `pisteitä vain ${pitka.length}`);
  for (let i = 1; i < pitka.length; i += 1) {
    const vali = kulmaAsteina(
      { lat: pitka[i - 1][0], lng: pitka[i - 1][1] },
      { lat: pitka[i][0], lng: pitka[i][1] },
    );
    assert.ok(vali <= REITIN_TIHENNYS_AST + 1e-6, `väli ${i} on ${vali}°`);
  }
  // Päätepisteet ovat tasan pysäkeissä: viiva alkaa ja päättyy valoon.
  assert.deepEqual(pitka[0], [64, -173]);
  assert.deepEqual(pitka.at(-1), [61, -149]);
});

test('viiva piirtyy laudan linssiapurille pikselipaksuisena ja kasvaa valojen mukana', () => {
  /*
   * PAKSUUS ON RUUTUPIKSELEITÄ, EI ASTEITA (mitattu 5.9.2026,
   * karttapallo.md 10.3): asteina laskettu viiva jää alle pikselin.
   */
  assert.equal(REITIN_PAKSUUS_PX, 3);
  const rakennaReitti = metodi('rakennaReitti');
  assert.match(rakennaReitti, /if \(!this\.kaari\.reitti\) return;/);
  assert.match(rakennaReitti, /if \(this\.pallolla && !this\.lauta\?\.linssit\?\.polut\) return;/);
  assert.match(rakennaReitti, /pisteet,/);
  assert.match(rakennaReitti, /paksuus: REITIN_PAKSUUS_PX/);
  // Tasokartalla sama viiva on SVG-polku (pathLength 1) omassa
  // kerroksessaan; kasvu on stroke-dasharray (piirraPatka).
  assert.match(rakennaReitti, /reitinKuvio\(pisteet, this\.kaari\.lauta\)/);
  assert.match(metodi('piirraPatka'), /strokeDasharray/);
  const paivitaReitti = metodi('paivitaReitti');
  assert.match(paivitaReitti, /linssit\?\.polut\?\.\(PALLON_OSA, nakyvat\)/, 'viiva menee valojen kanssa samaan osaan');
  assert.match(paivitaReitti, /o\.i > i && !kasvava/, 'viiva ei seuraa valoja');
  // Syttyminen, selailu, Alusta ja loppu päivittävät viivan.
  assert.match(metodi('sytyta'), /this\.paivitaReitti\(i\);/);
  assert.match(metodi('siirry'), /this\.paivitaReitti\(i\);/);
  assert.match(metodi('alusta'), /this\.paivitaReitti\(-1\);/);
  assert.match(metodi('lopeta'), /this\.paivitaReitti\(this\.tapahtumat\.length\);/);
});

/*
 * VIIVA KASVAA KAMERAN MUKANA (omistaja 6.9.2026 keskipäivä: *"se
 * saisi liikkua jo aiemmin ja pidemmän aikaa piirtäen viivaa
 * seuraavaan paikkaan. Lisää dynamiikka tällä."*).
 */
test('reittiviiva piirtyy pysäkkivälin aikana kameran kärjen edellä', () => {
  const ajaValia = metodi('ajaValia');
  // Kolme asiaa samasta osuudesta: kärki, kameran paikka ja korkeus.
  assert.match(ajaValia, /const e = aikajananKameranPehmennys\(t\);/);
  assert.match(ajaValia, /this\.paivitaReitti\(i - 1, Math\.min\(1, e \+ REITIN_KARJEN_ENNAKKO\)\)/);
  assert.match(ajaValia, /isoympyranPiste\(alku, loppu, e\)/);
  assert.match(ajaValia, /leveys: hypynLeveys\(this\.lahikuva, huippu, e\)/);
  // Kärki on kameran EDELLÄ mutta ei paljon: pysäkkiväli on lyhyt.
  assert.ok(REITIN_KARJEN_ENNAKKO > 0 && REITIN_KARJEN_ENNAKKO <= 0.15);
  // Väliajo on vain ajo NYKYISELTÄ pysäkiltä seuraavalle; selailu ja
  // vähennetty liike jäävät entiselle suoralle ajolle.
  const valimatka = metodi('valimatka');
  assert.match(valimatka, /if \(this\.reducedMotion \|\| !\(kesto > 0\)\) return null;/);
  assert.match(valimatka, /if \(i !== this\.tila\.i \+ 1\) return null;/);
  assert.match(metodi('ajaPysakille'), /if \(vali\) return this\.ajaValia\(i, vali, kesto\);/);
  /*
   * VALOKEILA KULKEE MUKANA. Viiva piirtyy pallon PINTAAN eli
   * tummennuskalvon alle, ja kalvo syö siitä 86 % (mitattu 6.9.2026,
   * scratchpad/aikajana-ajo: sama kuva kalvon kanssa ja ilman). Ilman
   * mukana kulkevaa reikää piirtyvä viiva ei näkyisi lainkaan.
   */
  assert.match(ajaValia, /this\.siirraReikaMatkalla\(kohta, e\);/);
  assert.match(metodi('siirraReikaMatkalla'), /AJON_REIAN_KERROIN/);
  assert.match(metodi('siirraReikaMatkalla'), /this\.kalvo\.paivita\(this\.reianPaikka\)/);
  assert.ok(AJON_REIAN_KERROIN > 1 && AJON_REIAN_KERROIN <= 2.5, `keila ${AJON_REIAN_KERROIN}`);
  // Viiva on täydellä kirkkaudella, koska kalvo tummentaa sen alta.
  assert.match(REITIN_VARI, /0\.9[0-9]?\)$/, `viivan sävy ${REITIN_VARI}`);
  // Kesken oleva ajo pysähtyy purussa, lopussa ja uudessa ajossa.
  assert.match(metodi('pysaytaValiajo'), /cancelAnimationFrame\(this\.valiajo\.kehys\)/);
  assert.match(metodi('ajaPysakille'), /^\s*this\.pysaytaValiajo\(\);/m);
  assert.match(metodi('lopeta'), /this\.pysaytaValiajo\(\);/);
  assert.match(metodi('pura'), /this\.pysaytaValiajo\(\);/);
});

/*
 * TASOKARTAN VIIVA on sama isoympyrä laudan projektiossa. Päivämäärän
 * raja katkaisee polun, jottei viiva vedä koko kartan yli.
 */
test('reitinKuvio projisoi isoympyrän laudalle ja katkaisee päivämäärärajalla', () => {
  const suora = reitinKuvio([[0, 0], [0, 10], [0, 20]], 'maailmankartta');
  assert.match(suora, /^M[\d.]+ [\d.]+ L[\d.]+ [\d.]+ L[\d.]+ [\d.]+$/);
  // Beringia: pituusaste kiertää nollan yli, joten polku katkeaa (kaksi M).
  const yli = reitinKuvio([[65, 170], [66, 178], [66, -178], [65, -170]], 'maailmankartta');
  assert.equal((yli.match(/M/g) ?? []).length, 2, `polku: ${yli}`);
  // Tuntematon lauta ei kaada mitään.
  assert.equal(reitinKuvio([[0, 0], [0, 10]], 'ei-ole'), '');
  assert.equal(reitinKuvio(null), '');
  // Kaari kertoo laudan, jotta viiva osuu samaan projektioon kuin pysäkit.
  assert.equal(LINSSI.aikajana.lauta, 'maailmankartta');
});

/* ══════════════════════════════════════════════════════════════════
 * 5. KAMERA: VÄLJEMPI LÄHIKUVA JA VALTAMEREN YLITYS
 * ══════════════════════════════════════════════════════════════════ */

/*
 * PYSÄKILLÄ TIUKKA LÄHIKUVA (omistaja 6.9.2026 keskipäivä
 * iPhone-kuvakaappauksesta, Pinnacle Point: *"Kartta on liian
 * kaukana"*). Ennen mitta oli kaksinkertainen keksintöihin nähden
 * (868) ja pitkä hyppy nosti kameran vielä perillä asti 3 600
 * yksikköön — koko eteläinen Afrikka ruudulla.
 */
test('lähikuva on tiukka: 1,3 × keksintöjen mitta', () => {
  assert.equal(IHMISEN_MATKAN_LAHIKUVA, 560, 'mitta vaihtui — mittaa selaimessa uudestaan');
  assert.ok(IHMISEN_MATKAN_LAHIKUVA >= AIKAJANAN_LAHIKUVA_LEVEYS,
    'ihmisen matkan välit ovat pidempiä kuin keksintöjen');
  assert.ok(IHMISEN_MATKAN_LAHIKUVA <= 1.4 * AIKAJANAN_LAHIKUVA_LEVEYS,
    'lähikuva ei ole enää lähikuva');
});

test('pitkä hyppy nostaa kameran MATKALLA, lyhyt ei nosta lainkaan', () => {
  const perus = IHMISEN_MATKAN_LAHIKUVA;
  // Saman maanosan sisäinen siirtymä: perusmitta säilyy koko matkan.
  assert.equal(pysakinLahikuva(perus, 0), perus);
  assert.equal(pysakinLahikuva(perus, 100), perus);
  assert.equal(hypynLeveys(perus, pysakinLahikuva(perus, 100), 0.5), perus);
  // Sahulin ylitys (noin 600 lautayksikköä ≈ 2 000 km): kaaren huipulla
  // kamera nousee niin, että lähtöranta on kuvassa.
  const sahul = pysakinLahikuva(perus, 600);
  assert.equal(sahul, 600 * AIKAJANAN_HYPYN_KERROIN);
  assert.ok(sahul / 2 > 600, 'lähtöranta jää ruudun ulkopuolelle');
  // Mannerten mittainen väli (900+) osuu jo kattoon: kamera ei nouse
  // enempää, vaan pitkä matka näkyy pidempänä liikkeenä.
  assert.equal(pysakinLahikuva(perus, 900), AIKAJANAN_HYPYN_KATTO);
  // Katto on nyt alle PUOLET entisestä (3 600): pitkäkään hyppy ei vie
  // kameraa maanosan mittaiseen kaukokuvaan.
  assert.equal(pysakinLahikuva(perus, 99999), AIKAJANAN_HYPYN_KATTO);
  assert.ok(AIKAJANAN_HYPYN_KATTO >= 1400 && AIKAJANAN_HYPYN_KATTO <= 1800, `katto ${AIKAJANAN_HYPYN_KATTO}`);
  // Yksikkömuunnos: 12 000 lautayksikköä = 360°.
  assert.ok(Math.abs(LAUTAYKSIKKOA_ASTEELLA * 360 - 12000) < 1e-9);
});

/*
 * KAARI: nolla molemmissa päissä, huippu puolivälissä ja pehmeä lähtö
 * (derivaatta nolla päissä) — Raamattu: KAIKKI LIIKE ANIMOIDAAN
 * PEHMEÄSTI.
 */
test('kaaren profiili nousee puolivälissä ja laskeutuu perille', () => {
  assert.equal(aikajananHypynKaari(0), 0);
  assert.ok(Math.abs(aikajananHypynKaari(1)) < 1e-12);
  assert.ok(Math.abs(aikajananHypynKaari(0.5) - 1) < 1e-12);
  assert.ok(aikajananHypynKaari(0.02) < 0.01, 'nousu nykäisee lähdössä');
  assert.ok(aikajananHypynKaari(0.98) < 0.01, 'lasku nykäisee perillä');
  assert.equal(aikajananHypynKaari(-1), 0);
  assert.ok(Math.abs(aikajananHypynKaari(2)) < 1e-12);
  // PERILLÄ JA LÄHDÖSSÄ AINA PERUSMITTA, huipulla kaaren huippu.
  const perus = IHMISEN_MATKAN_LAHIKUVA;
  assert.equal(hypynLeveys(perus, 1600, 0), perus);
  assert.ok(Math.abs(hypynLeveys(perus, 1600, 1) - perus) < 1e-9);
  assert.ok(Math.abs(hypynLeveys(perus, 1600, 0.5) - 1600) < 1e-9);
  // Geometrinen interpolointi: puolimatkassa huipulle ollaan
  // logaritmisesti puolivälissä, ei aritmeettisesti.
  const nelja = hypynLeveys(perus, 1600, 0.25);
  assert.ok(Math.abs(nelja - Math.sqrt(perus * 1600)) < 1, `${nelja}`);
  // Ilman nousua (huippu = perusmitta) leveys ei muutu missään kohtaa.
  assert.equal(hypynLeveys(perus, perus, 0.5), perus);
});

test('moottori laskee kaaren huipun edellisestä pysäkistä vain hyppykameralla', () => {
  const huippu = metodi('hypynHuippu');
  assert.match(huippu, /if \(!this\.kaari\.hyppykamera \|\| !t \|\| !edellinen\) return this\.lahikuva;/);
  assert.match(huippu, /kulmaAsteina\(/);
  assert.match(huippu, /pysakinLahikuva\(this\.lahikuva, ast \* LAUTAYKSIKKOA_ASTEELLA\)/);
  // Perillä leveys on aina perusmitta — nousu tapahtuu vain matkalla.
  assert.match(metodi('ajaPysakille'), /leveys: this\.lahikuva,/);
  // Kameran ennakko lasketaan yhä samalla puhtaalla funktiolla.
  assert.match(metodi('tarkistaKameraEnnakko'), /AIKAJANAN_KAMERAN_ENNAKKO_MS \+ AIKAJANA_ALIASKEL_MS/);
  assert.ok(AIKAJANA_VIIVE_MS > 0);
});

/* ══════════════════════════════════════════════════════════════════
 * 6. MUSIIKKI JA ESILATAUS
 * ══════════════════════════════════════════════════════════════════ */

test('linssillä on oma musiikkilaji pelissä ja generointityökalussa', () => {
  assert.ok(MUSIIKKILAJIT.includes('ihmisen-matka'), 'laji puuttuu js/siirtymamusiikki.js:stä');
  const raita = LAJIT['ihmisen-matka'];
  assert.ok(raita, 'laji puuttuu tools/generoi-siirtymamusiikki.mjs:stä');
  assert.equal(raita.ryhma, 'linssi');
  assert.equal(raita.tiedosto, 'linssi-ihmisen-matka.mp3');
  // Omistajan tilaus 5.9.2026 sanoina: syvä, hidas, syke, sanaton ääni.
  assert.match(raita.prompt, /deep, slow/);
  assert.match(raita.prompt, /heartbeat/);
  assert.match(raita.prompt, /wordless/);
  assert.match(raita.prompt, /No melody to follow/);
  // Looppi on linssiraidan mittainen (45–60 s), ei siirtymän.
  assert.ok(raita.looppi >= 45 && raita.looppi <= 60);
});

test('linssi ja sen aineisto ovat service workerin SHELL-listalla', () => {
  // Ilman näitä linssi toimisi verkossa ja katoaisi offline.
  assert.ok(SW.includes("'./js/linssit/ihmisen-matka.js'"));
  assert.ok(SW.includes("'./js/linssit/ihmisen-matka-data.js'"));
});


/* ══════════════════════════════════════════════════════════════════
 * 7. KORTIN KUVA, PIENET VERSIOT JA LUENNAT (Fablen arvio 6.9.2026)
 * ══════════════════════════════════════════════════════════════════
 *
 * Kolme vikaa, jotka näkyivät vasta pelissä ja jotka rikkoutuvat
 * hiljaa uudelleen:
 *
 *   1. Kortissa luki pysäkin nimikirjaimet ("EI", "SY"), koska
 *      löytökuvia ei ole vielä ämpärissä. Nyt kortti putoaa pysäkin
 *      havainnekuvaan.
 *   2. Jokainen kuva haettiin ensin kansiosta `pieni/`, jota tälle
 *      kaarelle ei ole — pelkkiä 404:iä.
 *   3. Luennat: yksi lyhyt lause pysäkkiä kohti, tiedostonimi pysäkin
 *      tunnus, ja työkalu osaa nyt kaksi kaarta.
 */

test('kortin kuva putoaa löydöstä havainnekuvaan', () => {
  for (const t of PYSAKIT) {
    assert.ok(t.kuva?.osoite.includes('/esine/'), `${t.tunnus}: kortissa ei ole löytökuvaa`);
    assert.equal(t.kuva.vara, t.ilmio.osoite, `${t.tunnus}: varakuva ei ole havainnekuva`);
  }
  // Muunnos on datan puolella; moottori vain käyttää kenttää.
  assert.match(MOOTTORI, /vara: kuvatieto\.vara \?\? null/);
  // Rajaus keskeltä: vaakakuvan turva-alue on keskimmäiset 60 %.
  assert.match(CSS, /img\.varakuva \{ object-position: center center; \}/);
});

test('kaari kertoo, ettei sen kuvista ole pieniä versioita', () => {
  assert.equal(LINSSI.aikajana.pienetKuvat, false);
  assert.notEqual(KEKSINTOLINSSI.aikajana.pienetKuvat, false, 'keksinnöillä pienet versiot ovat');
  assert.match(MOOTTORI, /this\.pienetKuvat = kaari\.pienetKuvat !== false;/);
  // Lippu kulkee samana esilataukseen ja kuvaelementtiin, tai
  // esilataus hakisi eri tiedoston kuin paneeli.
  assert.equal(paneelikuvanOsoite({ osoite: 'https://x.test/a/b.jpg' }, 640, false),
    'https://x.test/a/b.jpg');
  assert.equal(paneelikuvanOsoite({ osoite: 'https://x.test/a/b.jpg' }, 640, true),
    'https://x.test/a/pieni/b.webp');
});

test('luenta on yksi lyhyt lause ja tiedosto on pysäkin tunnus', () => {
  const kaari = LINSSI.aikajana;
  for (const t of kaari.tapahtumat) {
    assert.equal(luennanTiedosto(t), `${t.tunnus}.mp3`, `${t.tunnus}: väärä tiedostonimi`);
    const teksti = luennanTeksti(t);
    // Aika, otsikko ja paikka — ja vain yksi lause kutakin.
    assert.ok(teksti.includes(t.otsikko), `${t.tunnus}: otsikko puuttuu`);
    assert.ok(teksti.includes(t.paikka), `${t.tunnus}: paikka puuttuu`);
    assert.ok(teksti.length <= 130, `${t.tunnus}: luenta on ${teksti.length} merkkiä`);
    // Mallille suuret luvut sanoina (js/linssipuhe.js lukuSanoina).
    assert.ok(!/\d/.test(luennanPuhe(t).replace(/<break[^>]*>/g, '')),
      `${t.tunnus}: mallille jäi numeroita`);
  }
  assert.equal(luennanTeksti(kaari.tapahtumat[0]),
    'Noin 300 000 vuotta sitten. Kasvot, jotka tunnistaisi — Jebel Irhoud, Marokko.');
  // Peli hakee luennat kaaren omasta kansiosta.
  assert.equal(kaari.luentajuuri, `${IHMISEN_MATKA_KUVAJUURI}/puhe`);
  assert.equal(luennanOsoite(kaari.tapahtumat[0], kaari.luentajuuri),
    `${IHMISEN_MATKA_KUVAJUURI}/puhe/jebel-irhoud.mp3`);
  // Esittely ja loppusanat lyhentämättä, omilla nimillään.
  const puheet = kaarenPuheet(kaari);
  assert.deepEqual(puheet.map((x) => x.nimi), ['esittely.mp3', 'loppu.mp3']);
  assert.equal(puheet[0].teksti, kaari.esittely.teksti);
  assert.equal(puheet[1].teksti, kaari.loppusanat.teksti);
  // Loppusanat myös luetaan: ilman tätä tiedosto jäisi soimatta.
  assert.equal(kaari.loppupuhe, true);
  assert.match(metodi('lopeta'), /runko: LOPUN_RUNKO, juuri: this\.luentajuuri/);
});

test('työkalu ja työnkulut osaavat molemmat kaaret', () => {
  // Työkalu: --linssi valitsee kaaren, ja kansio tulee kaaresta.
  assert.deepEqual(Object.keys(LUENTAKAARET), ['keksinnot', 'ihmisen-matka']);
  assert.equal(ampariKansio(LINSSI.aikajana), 'aikajana/ihmisen-matka/puhe');
  assert.equal(ampariKansio(KEKSINTOLINSSI.aikajana), 'aikajana/keksinnot/puhe');
  assert.equal(ampariKansio({}), 'aikajana/keksinnot/puhe', 'oletus on entinen kansio');
  const { tyot } = valitsePysakit(LINSSI.aikajana);
  assert.equal(tyot.length, LINSSI.aikajana.tapahtumat.length + 2);

  // Työnkulut: kumpikin ajo tarjoaa tämän kaaren valintana.
  assert.match(LUENTATYONKULKU, /options: \['keksinnot', 'ihmisen-matka'\]/);
  assert.match(LUENTATYONKULKU, /--linssi "\$LINSSI"/);
  assert.match(MUSIIKKITYONKULKU, /'keksinnot', 'ihmisen-matka'\]/);
});
