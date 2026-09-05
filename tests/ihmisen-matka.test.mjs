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
  ASTEIKON_VALI, KELLON_NUMEROT, luoAsteikko, jarjestaTapahtumat, kellonAskel, kellonNaytto,
  vuosiaSittenLukema, asetaMatkamittari, reitinPisteet, REITIN_PAKSUUS_PX, REITIN_TIHENNYS_AST,
  pysakinLahikuva, AIKAJANAN_HYPYN_KERROIN, AIKAJANAN_HYPYN_KATTO, AIKAJANAN_LAHIKUVA_LEVEYS,
  LAUTAYKSIKKOA_ASTEELLA, AIKAJANA_VIIVE_MS,
} from '../js/aikajana.js';
import {
  LINSSI, PYSAKIT, IHMISEN_MATKAN_LAHIKUVA, ihmisenMatkanPysakit,
} from '../js/linssit/ihmisen-matka.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { tarkistaLinssi } from '../js/linssit/kerros.js';
import { MUSIIKKILAJIT } from '../js/siirtymamusiikki.js';
import { LAJIT } from '../tools/generoi-siirtymamusiikki.mjs';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { kulmaAsteina } from '../js/pallolauta/reitit.js';

const MOOTTORI = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');
const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

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
  assert.equal(k.reitti, true);
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

test('kello pyöristää suuret luvut eikä pyöri sotkuna', () => {
  assert.equal(kellonAskel(300000), 1000);
  assert.equal(kellonAskel(45000), 100);
  assert.equal(kellonAskel(3000), 10);
  assert.equal(kellonAskel(776), 1);
  // Laskeva kello pyöristää YLÖS: näkyvä luku on se, josta ollaan
  // matkalla seuraavaan.
  assert.equal(kellonNaytto(245678.9, 1000, -1), 246000);
  assert.equal(kellonNaytto(245678.9, 1000, 1), 245000);
  assert.equal(kellonNaytto(1769.4, 1, 1), 1769, 'keksintökello ennallaan');
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
  assert.match(rakennaReitti, /if \(!this\.pallolla \|\| !this\.kaari\.reitti \|\| !this\.lauta\?\.linssit\?\.polut\) return;/);
  assert.match(rakennaReitti, /pisteet: reitinPisteet\(edellinen, t\)/);
  assert.match(rakennaReitti, /paksuus: REITIN_PAKSUUS_PX/);
  const paivitaReitti = metodi('paivitaReitti');
  assert.match(paivitaReitti, /linssit\?\.polut\?\.\(\n\s*PALLON_OSA,/, 'viiva menee valojen kanssa samaan osaan');
  assert.match(paivitaReitti, /filter\(\(o\) => o\.i <= i\)/, 'viiva ei seuraa valoja');
  // Syttyminen, selailu, Alusta ja loppu päivittävät viivan.
  assert.match(metodi('sytyta'), /this\.paivitaReitti\(i\);/);
  assert.match(metodi('siirry'), /this\.paivitaReitti\(i\);/);
  assert.match(metodi('alusta'), /this\.paivitaReitti\(-1\);/);
  assert.match(metodi('lopeta'), /this\.paivitaReitti\(this\.tapahtumat\.length\);/);
});

/* ══════════════════════════════════════════════════════════════════
 * 5. KAMERA: VÄLJEMPI LÄHIKUVA JA VALTAMEREN YLITYS
 * ══════════════════════════════════════════════════════════════════ */

test('lähikuva on kaksinkertainen keksintöihin nähden', () => {
  assert.equal(IHMISEN_MATKAN_LAHIKUVA, 2 * AIKAJANAN_LAHIKUVA_LEVEYS);
  assert.equal(IHMISEN_MATKAN_LAHIKUVA, 868, 'kaavan korjaus (6.9.2026): keksinnot 434');
});

test('pitkä hyppy nostaa kameran, lyhyt jättää sen lähikuvaan', () => {
  const perus = IHMISEN_MATKAN_LAHIKUVA;
  // Saman maanosan sisäinen siirtymä: perusmitta säilyy.
  assert.equal(pysakinLahikuva(perus, 0), perus);
  assert.equal(pysakinLahikuva(perus, 100), perus);
  // Sahulin ylitys (noin 900 lautayksikköä ≈ 3 000 km): kamera nousee
  // niin, että lähtöranta (matkan päässä) on kuvassa.
  const sahul = pysakinLahikuva(perus, 900);
  assert.equal(sahul, 900 * AIKAJANAN_HYPYN_KERROIN);
  assert.ok(sahul / 2 > 900, 'lähtöranta jää ruudun ulkopuolelle');
  // Katto pitää kameran pallon lähellä pisimmälläkin hypyllä.
  assert.equal(pysakinLahikuva(perus, 99999), AIKAJANAN_HYPYN_KATTO);
  // Yksikkömuunnos: 12 000 lautayksikköä = 360°.
  assert.ok(Math.abs(LAUTAYKSIKKOA_ASTEELLA * 360 - 12000) < 1e-9);
});

test('moottori laskee leveyden edellisestä pysäkistä vain hyppykameralla', () => {
  const leveys = metodi('pysakinLeveys');
  assert.match(leveys, /if \(!this\.kaari\.hyppykamera \|\| !t \|\| !edellinen\) return this\.lahikuva;/);
  assert.match(leveys, /kulmaAsteina\(/);
  assert.match(leveys, /pysakinLahikuva\(this\.lahikuva, ast \* LAUTAYKSIKKOA_ASTEELLA\)/);
  assert.match(metodi('ajaPysakille'), /leveys: this\.pysakinLeveys\(i\),/);
  // Kameran ennakko ja jälkijättö ovat entiset (keksintöjen mitat).
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
