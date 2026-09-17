/*
 * NOSTOJEN LAPUT VÄISTÄVÄT KAUPUNGIN NIMEÄ (js/pallolauta/sovittelu.js).
 *
 * Omistaja 7.9.2026 (kuvakaappaus Bukarestista, sanatarkasti):
 * *"kaupungin nimi menee nostojen päälle"*. Fablen linjaus (Raamattu,
 * KAUPUNGIN NIMI NOSTOJEN PAALLA): kaupungin nimi on ensisijainen,
 * nostojen laput väistävät — vaihtoehtoinen ankkuri, pieni siirto,
 * viimeisenä lappu piiloon.
 *
 * Selaimessa sama sääntö mitataan savukkeella
 * (tools/savukkeet/savuke-pallo-nostolaput.mjs); tässä mitataan
 * PÄÄTÖSSARJA sellaisenaan, koska sen jokainen porras on
 * todennettavissa ilman DOMia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  SOVITTELUN_KYLJET, SOVITTELUN_SIIRTO_PX, laatikotLimittyvat, sovitteleLaput,
} from '../js/pallolauta/sovittelu.js';
import { NOSTOSYM_NIMIO_KYLJET } from '../js/fokusnosto-symbolit.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/**
 * Koelappu: ikoni 10 x 10 px pisteessä (x, y) ja nimiö 40 px sen
 * kyljessä — sama muoto kuin nostonLaatikko antaa (ikonin ja nimiön
 * yhdiste), mutta luvut ovat käsin luettavia.
 */
function koelappu(avain, x, y, kylki = 'oikea') {
  const r = 5;
  const lev = 40;
  return {
    avain,
    kylki,
    laatikko: (k, dx, dy, nimio) => {
      const kx = x + dx;
      const ky = y + dy;
      const ikoni = {
        x0: kx - r, y0: ky - r, x1: kx + r, y1: ky + r,
      };
      if (!nimio) return ikoni;
      if (k === 'vasen') return { ...ikoni, x0: kx - r - lev };
      if (k === 'yla') return { x0: kx - lev / 2, x1: kx + lev / 2, y0: ky - r - 12, y1: ky + r };
      if (k === 'ala') return { x0: kx - lev / 2, x1: kx + lev / 2, y0: ky - r, y1: ky + r + 12 };
      return { ...ikoni, x1: kx + r + lev };
    },
  };
}

test('vapaa lappu pitää oman kylkensä eikä liiku', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [] });
  assert.deepEqual(t.asennot.get('a'), {
    kylki: 'oikea', dx: 0, dy: 0, nimio: true, syy: 'oma',
  });
  assert.equal(t.siirretty, 0);
  assert.equal(t.piilotettu, 0);
});

test('1. porras: este oikealla → lappu vaihtaa kyljen, ei siirry eikä piiloudu', () => {
  // Este peittää nimiökaistan oikealla, ikonin ruutu jää vapaaksi.
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [este] });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'kylki');
  assert.notEqual(a.kylki, 'oikea');
  assert.equal(a.dx, 0);
  assert.equal(a.dy, 0);
  assert.equal(a.nimio, true);
  assert.equal(t.kylkiVaihtui, 1);
  assert.ok(!laatikotLimittyvat(koelappu('a', 100, 100).laatikko(a.kylki, 0, 0, true), este));
});

test('2. porras: kaikki kyljet tukossa → pieni siirto, lappu jää näkyviin', () => {
  /*
   * Neljä kapeaa nimikaistaa, yksi kutakin kylkeä vasten. Kaistat ovat
   * niin matalia (4 px), että 6 px:n KOHTISUORA nudge irrottaa lapun
   * — juuri se liike, jota vaakanimen ja vaakalapun törmäys vaatii.
   */
  const esteet = [
    { x0: 106, y0: 99, x1: 148, y1: 103 },
    { x0: 52, y0: 99, x1: 94, y1: 103 },
    { x0: 98, y0: 82, x1: 102, y1: 88 },
    { x0: 98, y0: 112, x1: 102, y1: 118 },
  ];
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'siirto');
  assert.equal(a.nimio, true);
  assert.equal(Math.abs(a.dx) + Math.abs(a.dy), SOVITTELUN_SIIRTO_PX);
  for (const e of esteet) {
    assert.ok(!laatikotLimittyvat(koelappu('a', 100, 100).laatikko(a.kylki, a.dx, a.dy, true), e));
  }
});

test('3. porras: kun mikään asento ei kelpaa, lappu piiloon ja IKONI JÄÄ', () => {
  // Yksi laaja este peittää koko sen alueen, johon nimiö mahtuisi.
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100)],
    esteet: [{ x0: 20, y0: 20, x1: 180, y1: 180 }],
  });
  const a = t.asennot.get('a');
  assert.equal(a.nimio, false, 'lappu piiloon');
  assert.equal(a.syy, 'piilo');
  assert.equal(t.piilotettu, 1);
  // Ikonia ei voi piilottaa — nosto katoaisi kartalta; se kirjataan.
  assert.equal(t.jaljella, 1);
});

test('ahtain ensin: lähinnä nimeä oleva lappu saa valita ensimmäisenä', () => {
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const kauka = koelappu('kauka', 600, 600);
  const lahi = koelappu('lahi', 100, 100);
  const t = sovitteleLaput({ laput: [kauka, lahi], esteet: [este] });
  assert.equal(t.asennot.get('kauka').syy, 'oma');
  assert.equal(t.asennot.get('lahi').syy, 'kylki');
});

test('väistänyt lappu on este seuraavalle, paikallaan pysynyt ei', () => {
  // Kaksi lappua samassa pisteessä: ensimmäinen väistää vasemmalle,
  // toisen on löydettävä eri asento kuin ensimmäinen.
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100), koelappu('b', 100, 100)],
    esteet: [este],
  });
  const a = t.asennot.get('a');
  const b = t.asennot.get('b');
  assert.notDeepEqual([a.kylki, a.dx, a.dy], [b.kylki, b.dx, b.dy]);
});

/* ══ AIHENOSTO VÄISTÄÄ KAIKKEA (`este`, PAATOKSET 27 TARKENNUS 2) ══ */

/** Näkyykö lapun nimiö, ja missä asennossa? */
const asentoOn = (t, avain) => {
  const a = t.asennot.get(avain);
  return `${a.kylki}|${a.dx}|${a.dy}|${a.nimio ? 'nimio' : 'piilo'}`;
};

test('`este`-lappu väistää toista `este`-lappua ilman kiinteitä esteitä', () => {
  // Kaksi aihenostoa lähekkäin eikä yhtään kaupungin nimeä: oikean
  // kyljen nimiökaistat menisivät päällekkäin, ja vain `este`-lippu
  // saa jälkimmäisen etsimään toisen asennon.
  const t = sovitteleLaput({
    laput: [
      { ...koelappu('a', 100, 100), este: true },
      { ...koelappu('b', 118, 108), este: true },
    ],
    esteet: [],
  });
  assert.notEqual(asentoOn(t, 'a'), asentoOn(t, 'b'),
    'aihenostot eivät saa latoa nimiöitään päällekkäin');
  assert.equal(t.piilotettu, 0, 'väljässä maastossa nimiön ei tarvitse kadota');
});

test('VASTAKOE: ilman `este`-lippua samat kaksi lappua jäävät päällekkäin', () => {
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100), koelappu('b', 118, 108)],
    esteet: [],
  });
  assert.equal(asentoOn(t, 'a'), asentoOn(t, 'b'),
    'käsin ladotut laput eivät väistä toisiaan — sääntö ei saa muuttua');
});

test('`este`-lappu sovitellaan viimeisenä ja väistää käsin ladottua, ei toisinpäin', () => {
  const t = sovitteleLaput({
    laput: [
      { ...koelappu('aihe', 118, 108), este: true },
      koelappu('kasin', 100, 100),
    ],
    esteet: [],
  });
  assert.deepEqual(t.asennot.get('kasin'), {
    kylki: 'oikea', dx: 0, dy: 0, nimio: true, syy: 'oma',
  }, 'käsin ladottu pitää oman kylkensä');
  assert.notEqual(asentoOn(t, 'aihe'), 'oikea|0|0|nimio',
    'aihenosto on se, joka väistää');
});

test('`este`-lapun nimi ei katoa naapurin takia — vain kiinteä muste voi viedä sen', () => {
  // Kolme aihenostoa niin tiheässä, ettei kolmannelle ole vapaata
  // asentoa: nimiön on silti jäätävä näkyviin (PAATOKSET 27 TARKENNUS
  // 2 kohta 8), koska mikään KIINTEÄ este ei ole sen tiellä.
  const t = sovitteleLaput({
    laput: [0, 1, 2].map((i) => ({ ...koelappu(`a${i}`, 100 + i * 4, 100 + i * 4), este: true })),
    esteet: [],
  });
  assert.equal(t.piilotettu, 0, 'naapurin lappu ei saa viedä aihenoston nimeä');
  for (const i of [0, 1, 2]) assert.equal(t.asennot.get(`a${i}`).nimio, true);
});

test('aihenoston lappu saa `este`-lipun nostokerroksessa', () => {
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /este: r\.perhe === 'aihemerkki',/);
});

test('kyljet ovat kirjaston omat neljä, eikä sovittelu keksi omiaan', () => {
  assert.deepEqual([...SOVITTELUN_KYLJET], [...NOSTOSYM_NIMIO_KYLJET]);
});

test('lauta sovittelee nimien JÄLKEEN, ja nimi väistää vain liikkumatonta mustetta', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  const nimiKohta = lauta.indexOf('const nimiTulos = nimet.lado(');
  const sovitteluKohta = lauta.indexOf('nostot.sovittele(');
  assert.ok(nimiKohta > 0 && sovitteluKohta > nimiKohta,
    'sovittelu on ladottava nimien jälkeen — muuten nimi ei ole kiinteä');
  assert.match(lauta,
    /nostot\.sovittele\(\{ nimet: nimet\.laatikot\(\), kiinteat: infoTulos \}\)/);
  const nostot = lue('../js/pallolauta/nostot.js');
  // Elävän noston LAPPU ei ole nimen varaus, ikoni on.
  assert.match(nostot, /nostonLaatikko\(r\.p, r, \{\s*dx: datum\.dx, dy: datum\.dy, nimio: false,\s*\}\)/);
  assert.match(nostot, /import \{ sovitteleLaput \} from '\.\/sovittelu\.js';/);
  // Nimikerros antaa laatikkonsa luettavaksi eikä lue sovittelua.
  const nimet = lue('../js/pallolauta/nimet.js');
  assert.match(nimet, /laatikot: \(\) => laatikot,/);
  assert.ok(!/^import .*sovittelu\.js/m.test(nimet), 'nimikerros ei saa tuoda sovittelua');
  // Uusi moduuli on SHELLissä (offline).
  assert.match(lue('../sw.js'), /'\.\/js\/pallolauta\/sovittelu\.js'/);
});

/*
 * TURISTI-INFON KYLTTI ON SOVITTELUSSA KIINTEÄ ESTE (omistaja
 * 17.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 TARKENNUS 2
 * kohta 6). Kyltti ei voi väistää, joten nostojen laput väistävät
 * sitä samalla säännöllä kuin kaupunkien nimiä — ja sen laatikko on
 * kyltin PIIRRETTY ala eikä 1 × 1 px:n piste.
 */
test('turisti-infon kyltti on sovittelun este ja sen varaus on koko kyltti', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  const nostot = lue('../js/pallolauta/nostot.js');
  // 1. Kerros ottaa muunkin liikkumattoman musteen kuin nimet.
  assert.match(nostot, /const sovittele = \(\{ nimet = \[\], kiinteat = \[\] \} = \{\}\) => \{/);
  assert.match(nostot, /esteet: kiinteat\.length \? \[\.\.\.nimet, \.\.\.kiinteat\] : nimet,/);
  // 2. Lauta antaa kyltin laatikot sekä nimiladonnalle että sovittelulle.
  assert.match(lauta, /varaukset: \[\.\.\.nostoTulos\.laatikot, \.\.\.infoTulos\]/);
  // 3. Varaus lasketaan SAMASTA kaavasta kuin nostojen omat laatikot —
  //    ei lueta ruudulta, koska merkin rasteri valmistuu omalla ajallaan.
  assert.match(lauta, /return \[nostonLaatikko\(p, KYLTIN_LADONTA\)\];/);
  assert.match(lauta, /const KYLTIN_LADONTA = \{\n {4}kaupunki: true,/);
  assert.match(lauta, /nimi: TURISTI_INFO_NIMIO,/);
  // 4. Sama laatikko palvelee sekä ladontaa että osumatestiä.
  assert.match(lauta, /return kyltinLaatikot\(\);/);
  assert.match(lauta,
    /if \(!kyltinLaatikot\(\)\.some\(\(r\) => laatikonEtaisyys\(kohta, r\) <= KYLTIN_MUSTEEN_VARA_PX\)\) \{/);
  // 5. Vastakoe palauttaa 1 x 1 px:n pisteen (merkin svg:n oma mitta).
  assert.match(lauta, /if \(!pallonSaantoKaytossa\('kylttilaatikko'\)\) \{/);
});

/*
 * KYLTTI SIIRTYY SIVUUN, EI NIMIÖ (omistaja 17.9.2026, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 31 TARKENNUS 3).
 */
test('turisti-infon kyltti valitsee vapaan asennon ennen nimiladontaa', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  const kaupunkinosto = lue('../js/kaupunkinosto.js');
  // 1. Asennot ovat lista, jonka ensimmäinen on entinen paikka.
  assert.match(kaupunkinosto, /export const TURISTI_INFON_ASENNOT = Object\.freeze\(\[/);
  assert.match(kaupunkinosto, /Object\.freeze\(\{ dx: 36, dy: 16 \}\),/);
  // 2. Este on vain se, mikä EI riipu kyltistä (kiinteä muste, kaupungin piste).
  assert.match(lauta, /const paivitaTuristiInfo = \(kiinteaMuste = \[\]\) => \{/);
  assert.match(lauta, /const infoTulos = paivitaTuristiInfo\(nostoTulos\.laatikot\);/);
  // 3. Edellinen asento kokeillaan ensin (ei heilu ladonnasta toiseen).
  assert.match(lauta, /const jarjestys = \[asennot\[kyltinAsento\] \?\? asennot\[0\], \.\.\.asennot\];/);
  assert.match(lauta, /kyltinAsento = Math\.max\(0, asennot\.indexOf\(asento\)\);/);
  // 4. Kyltti valitaan ENNEN nimiladontaa, joka väistää sitä.
  const kyltti = lauta.indexOf('const infoTulos = paivitaTuristiInfo(');
  const nimet = lauta.indexOf('const nimiTulos = nimet.lado(');
  assert.ok(kyltti > 0 && nimet > kyltti, 'kyltin asento ennen nimiladontaa');
  // 5. Vastakoe: siirto pois.
  assert.match(lauta, /pallonSaantoKaytossa\('kylttisiirto'\)\n?\s*\? TURISTI_INFON_ASENNOT : TURISTI_INFON_ASENNOT\.slice\(0, 1\)/);
});

test('siirto animoidaan ja reduced motion poistaa siirtymän', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.pallolauta-nosto-siirto \{ transition: transform 200ms ease-in-out; \}/);
  assert.match(css, /\.pallolauta-nimi-siirto,\n\s*\.pallolauta-nosto-siirto \{ transition: none; \}/);
  // Aihenosto siirtyy samalla tavalla (PAATOKSET 27 TARKENNUS 2).
  assert.match(css, /\.pallolauta-aihemerkki-siirto \{ transition: transform 200ms ease-in-out; \}/);
  assert.match(css, /\.pallolauta-aihemerkki-siirto \{ transition: none; \}/);
});
