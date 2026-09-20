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
  SOVITTELUN_KYLJET, SOVITTELUN_SIIRTO_PX, SOVITTELUN_REUNASIIRTO_PX,
  laatikotLimittyvat, laatikkoSisalla, reunaanSiirto, sovitteleLaput,
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

/*
 * ══ RUUDUN REUNA ON ESTE (omistaja 20.9.2026: Biskajanlahti ja Dune du
 * Pilat maalehden reunassa; docs/raportit/nimiot-reunassa-20260920.md)
 * ══════════════════════════════════════════════════════════════════
 */
const REUNA = { x0: 6, y0: 6, x1: 394, y1: 838 };

test('reuna: lappu, jonka kaista ylittäisi oikean reunan, vaihtaa kyljen vasemmalle', () => {
  // Ikoni 20 px reunasta: oikea kaista (40 px) menisi yli, vasen mahtuu.
  const t = sovitteleLaput({ laput: [koelappu('a', 374, 400)], esteet: [], reuna: REUNA });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'kylki');
  assert.equal(a.kylki, 'vasen');
  assert.equal(a.nimio, true);
  assert.ok(laatikkoSisalla(koelappu('a', 374, 400).laatikko(a.kylki, a.dx, a.dy, true), REUNA));
});

test('reuna: sama lappu ilman reunaa pysyy omassa kyljessään (vastakoe)', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 374, 400)], esteet: [] });
  assert.equal(t.asennot.get('a').syy, 'oma');
});

test('reuna: kun kylki ei riitä, lappu vedetään sisään enintään reunasiirron verran', () => {
  // Ikoni 11 px reunan takana: pieni 6 px:n siirto ei riitä millään
  // kyljellä, mutta 16 px vasemmalle tuo vasemman kaistan sisään → 'reuna'.
  const t = sovitteleLaput({ laput: [koelappu('a', 405, 400)], esteet: [], reuna: REUNA });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'reuna');
  assert.equal(a.nimio, true);
  assert.ok(Math.abs(a.dx) <= SOVITTELUN_REUNASIIRTO_PX && Math.abs(a.dy) <= SOVITTELUN_REUNASIIRTO_PX);
  assert.ok(laatikkoSisalla(koelappu('a', 405, 400).laatikko(a.kylki, a.dx, a.dy, true), REUNA));
  assert.equal(t.reunalta, 1);
});

test('reuna: ikoni kaukana reunan takana → lappu piiloon, ikoni jää (ei siirretä yli katon)', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 440, 400)], esteet: [], reuna: REUNA });
  const a = t.asennot.get('a');
  assert.equal(a.nimio, false);
  assert.equal(a.syy, 'piilo');
  assert.equal(t.piilotettu, 1);
});

test('reuna: yläreuna ja turva-alue — ylä-kylki ei kelpaa, ala kelpaa', () => {
  const reuna = { x0: 6, y0: 50, x1: 394, y1: 838 };
  const t = sovitteleLaput({ laput: [koelappu('a', 200, 60, 'yla')], esteet: [], reuna });
  const a = t.asennot.get('a');
  assert.notEqual(a.kylki, 'yla');
  assert.equal(a.nimio, true);
  assert.ok(laatikkoSisalla(koelappu('a', 200, 60).laatikko(a.kylki, a.dx, a.dy, true), reuna));
});

test('reuna: reunaanSiirto antaa pienimmän sisään vievän siirron', () => {
  assert.deepEqual(reunaanSiirto({ x0: 380, y0: 100, x1: 420, y1: 120 }, REUNA), { dx: -26, dy: 0 });
  assert.deepEqual(reunaanSiirto({ x0: -4, y0: -10, x1: 40, y1: 10 }, REUNA), { dx: 10, dy: 16 });
  assert.deepEqual(reunaanSiirto({ x0: 100, y0: 100, x1: 140, y1: 120 }, REUNA), { dx: 0, dy: 0 });
  assert.equal(laatikkoSisalla({ x0: 100, y0: 100, x1: 140, y1: 120 }, null), true);
});

test('reuna: nostokerros antaa reunan sovittelulle ja kirjaa ylityksen avaimeen', () => {
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /const reunaNyt = reuna\?\.\(\) \?\? null;/);
  assert.match(nostot, /reuna: reunaNyt,/);
  assert.match(nostot, /`#reuna:\$\{reunalla\}#palaa:\$\{palaisi\}#ranta:\$\{rantaviivaOn \? 1 : 0\}`/);
  // Reunan takia käännetty lappu saa lähtökohdakseen datan kyljen (paluu).
  assert.match(nostot, /kylki: palaavat\.has\(datum\.avain\) \? \(r\.puoli \?\? .oikea.\) : datum\.puoli,/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /reuna: \(\) => nostojenReuna\(kotelo\),/);
  // Turva-alueet myös sivuilta (css :root).
  const css = lue('../css/styles.css');
  assert.match(css, /--turva-vasen: env\(safe-area-inset-left, 0px\);/);
  assert.match(css, /--turva-oikea: env\(safe-area-inset-right, 0px\);/);
});

/*
 * ══ MEREN NIMIÖ EI JÄÄ RANTAVIIVAN ALLE (Fable 20.9.2026, Välimeri
 * Marseillen kaappauksessa) ═══════════════════════════════════════
 */
test('rantaviiva: meren lappu väistää kehän laatikoita, maan lappu ei', () => {
  // Kehä kulkee vaakasuoraan lapun oikean kaistan poikki.
  const ranta = [{ x0: 100, y0: 96, x1: 160, y1: 104 }];
  const meri = { ...koelappu('meri', 100, 100), meri: true };
  const maa = koelappu('maa', 100, 100);
  const t = sovitteleLaput({ laput: [meri, maa], esteet: [], rantaviiva: ranta });
  const m = t.asennot.get('meri');
  assert.notEqual(m.syy, 'oma', 'meren lappu jäi rantaviivan alle');
  assert.equal(m.nimio, true);
  assert.ok(!laatikotLimittyvat(meri.laatikko(m.kylki, m.dx, m.dy, true), ranta[0]));
  assert.equal(t.asennot.get('maa').syy, 'oma', 'maan lappu ei väistä rantaviivaa');
});

test('rantaviiva: ilman meri-lippua sama lappu pysyy omassa kyljessään (vastakoe)', () => {
  const ranta = [{ x0: 100, y0: 96, x1: 160, y1: 104 }];
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [], rantaviiva: ranta });
  assert.equal(t.asennot.get('a').syy, 'oma');
});

test('rantaviiva: nostokerros antaa kehän laatikot ja merkitsee meren laput', () => {
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /meri: r\.symLaji === 'meri' \|\| r\.kategoria === 'meri',/);
  assert.match(nostot, /rantaviiva: typeof rantaviiva === 'function' \? rantaviiva\(\) : \(rantaviiva \?\? \[\]\),/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /rantaviiva: rantaviivanLaatikot,/);
  assert.match(lauta, /pallonKorostusRenkaat\(pallonKorostettuMaa\(\)\)/);
});


/*
 * ══ LAPUT EIVÄT LIMITY KESKENÄÄN (`keskinainen`, v1983 PR #2635:
 * savuke-nimikyltti 9b 13 paria, raja 4) ══════════════════════════
 */
test('keskinainen: kaksi päällekkäistä lappua eivät jää limittäin — toinen vaihtaa kylkeä tai piiloutuu', () => {
  const a = koelappu('a', 100, 100);
  const b = koelappu('b', 110, 102); // sama kylki, kaistat päällekkäin
  const t = sovitteleLaput({ laput: [a, b], esteet: [], keskinainen: true });
  const ra = t.asennot.get('a');
  const rb = t.asennot.get('b');
  const la = a.laatikko(ra.kylki, ra.dx, ra.dy, ra.nimio);
  const lb = b.laatikko(rb.kylki, rb.dx, rb.dy, rb.nimio);
  // Kaksi NIMIÖTÄ ei saa limittyä; ikoni (piilotetun lapun jäänne) on
  // karttapisteessään eikä sitä voi ottaa pois.
  assert.ok(!(ra.nimio && rb.nimio && laatikotLimittyvat(la, lb)), 'nimiöt limittyvät yhä');
  assert.ok(ra.nimio || rb.nimio, 'ainakin toinen nimiö jää näkyviin');
  assert.equal(t.piilotettu + t.kylkiVaihtui + t.siirretty >= 1, true);
});

test('keskinainen: ilman lippua samat laput saavat jäädä limittäin (vanha käytös, vastakoe)', () => {
  const a = koelappu('a', 100, 100);
  const b = koelappu('b', 110, 102);
  const t = sovitteleLaput({ laput: [a, b], esteet: [] });
  assert.equal(t.asennot.get('a').syy, 'oma');
  assert.equal(t.asennot.get('b').syy, 'oma');
});

test('keskinainen: nostokerros kytkee sen elävillä nimiöillä', () => {
  assert.match(lue('../js/pallolauta/nostot.js'), /keskinainen: KOHDEMAAN_NIMIOT_ELAVINA,/);
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
  /*
   * PELINAPPULA ON ESTE MYÖS SOVITTELUSSA (omistaja 17.9.2026 illalla,
   * Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 TARKENNUS 2 kohta b):
   * `sovitteleLaput` vaihtaa nimiön kylkeä joka zoomilla, ja sen
   * esteistössä oli ennen vain nimet ja kyltti — nimiö *"Tuileriain
   * rauniot…"* käännettiin siksi lähizoomissa nappulan puolelle.
   */
  assert.match(lauta, /kiinteat: \[\.\.\.infoTulos, \.\.\.merkit\.laatikot\('peli'\)\],/);
  const nostot = lue('../js/pallolauta/nostot.js');
  // Elävän noston LAPPU ei ole nimen varaus, ikoni on.
  assert.match(nostot, /nostonLaatikko\(r\.p, r, \{\s*dx: datum\.dx, dy: datum\.dy, nimio: false,\s*\}\)/);
  assert.match(nostot, /import \{ sovitteleLaput, laatikkoSisalla \} from '\.\/sovittelu\.js';/);
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
  assert.match(nostot, /const sovittele = \(\{\n\s*nimet = \[\], kiinteat = \[\], rantaviiva = null, rantaviivaOn = false,\n\s*\} = \{\}\) => \{/);
  assert.match(nostot, /esteet: kiinteat\.length \? \[\.\.\.nimet, \.\.\.kiinteat\] : nimet,/);
  // 2. Lauta antaa kyltin laatikot sekä nimiladonnalle että sovittelulle.
  assert.match(lauta, /varaukset: \[\.\.\.nostoTulos\.laatikot, \.\.\.infoTulos\]/);
  // 3. Varaus lasketaan SAMASTA kaavasta kuin nostojen omat laatikot —
  //    ei lueta ruudulta, koska merkin rasteri valmistuu omalla ajallaan.
  assert.match(lauta, /return \[nostonLaatikko\(p, KYLTIN_LADONTA\)\];/);
  /*
   * KYLTTI ON SAMAA KOKOA KUIN NOSTOT (omistaja 17.9.2026 illalla,
   * PAATOKSET 32 TARKENNUS 2 kohta a): `kaupunki` tarkoitti tässä
   * tietueessa vain kaupunkimerkin mittakerrointa (11,5 px), ja uusi
   * mitta on poltetun kartan 8,5 px eli kerroin 1. Kumoaa PAATOKSET 31
   * TARKENNUS 2 kohdan 5 mitan.
   */
  assert.match(lauta, /const KYLTIN_LADONTA = \{\n {4}kaupunki: false,/);
  assert.match(lauta, /nimi: TURISTI_INFO_NIMIO,/);
  /*
   * 4. KAKSI LAATIKKOA, KUMPIKIN OMAAN TEHTÄVÄÄNSÄ. Ladonta ja
   *    sovittelu käyttävät KAAVAA (sama luku joka koneella, ei odota
   *    rasteria), osumatesti PIIRRETTYÄ laatikkoa (sormi osuu siihen,
   *    mikä ruudulla on, myös kesken merkkikerroksen tweenin). Levossa
   *    ne ovat sama laatikko.
   */
  assert.match(lauta, /return kyltinLaatikot\(\);/);
  assert.match(lauta, /turistiLaatikot: \(\) => kyltinLaatikot\(\),/);
  assert.match(lauta, /const laatikot = kyltinPiirretty\(d\) \?\? kyltinLaatikot\(\);/);
  assert.match(lauta, /turistiPiirretty: \(\) => kyltinPiirretty\(/);
  // 5. Vastakoe palauttaa 1 x 1 px:n pisteen (merkin svg:n oma mitta).
  assert.match(lauta, /if \(!pallonSaantoKaytossa\('kylttilaatikko'\)\) \{/);
});

/*
 * KYLTTI SIIRTYY SIVUUN, EI NIMIÖ (omistaja 17.9.2026, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 31 TARKENNUS 3).
 */
test('turisti-infon kyltti valitsee vapaan asennon ennen nimiladontaa', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  const nostot = lue('../js/pallolauta/nostot.js');
  const kaupunkinosto = lue('../js/kaupunkinosto.js');
  // 1. Asennot ovat kiinteä, järjestetty lista — sama joka koneella.
  assert.match(kaupunkinosto, /export const TURISTI_INFON_ASENNOT = Object\.freeze\(\[/);
  assert.match(kaupunkinosto, /Object\.freeze\(\{ dx: 36, dy: 16 \}\),/);
  /*
   * 2. ASENTO ON KAMERAN JA DATAN FUNKTIO, EI LADONTAHISTORIAN
   *    (mitattu 17.9.2026: GitHub Actionsin ajo 35201833942 antoi
   *    savuke-pariisi-lahizoomista 72/74 samalla koodilla, joka on
   *    nopealla koneella 74/74). `nostot.laatikot()` lasketaan datumin
   *    dx/dy:llä eli EDELLISEN sovittelun tuloksella, joten esteistö
   *    riippui siitä, montako ladontakierrosta kone oli ehtinyt ajaa.
   *    Esteenä ovat nyt merkkien ikonit OMISSA paikoissaan, ja ankkuri
   *    mitataan koko musteesta nimiöineen — molemmat luetaan RIVILTÄ,
   *    koska sovittelu kirjoittaa tuloksensa DATUMIIN.
   */
  assert.match(lauta, /const paivitaTuristiInfo = \(kiinteaMuste = \[\], omaMuste = \[\]\) => \{/);
  assert.match(lauta,
    /const infoTulos = paivitaTuristiInfo\(nostot\.omatIkonilaatikot\(\), nostot\.omaMuste\(\)\);/);
  assert.match(nostot, /omatIkonilaatikot: \(\) => omatLaatikot\(\),/);
  assert.match(nostot, /omaMuste: \(\) => omatLaatikot\(\{ nimiot: true \}\),/);
  assert.match(nostot, /omatLaatikot = \(\{ nimiot = false \} = \{\}\) => \[/);
  assert.match(nostot, /kylki: r\.puoli \?\? 'oikea',/);
  assert.match(nostot, /nimio: nimiot \? Boolean\(r\.nimioNakyy && r\.nimi\) : false,/);
  // 2b. Kyltin ANKKURI ei jää noston musteen alle (nimiö mukaan luettuna).
  assert.match(lauta, /if \(omaMuste\.some\(\(e\) => piste\.x >= e\.x0 && piste\.x <= e\.x1/);
  /*
   * 2c. KYLTIN LAATIKKO EI VÄISTÄ NIMIÖITÄ EIKÄ SORMEN MITTAA. Kokeiltu
   *     17.9.2026: kun esteinä oli koko muste nimiöineen ja vielä
   *     LAPUN_KOSKETUSVARA_PX väljästi, Pariisissa kaikki oikean puolen
   *     asennot menivät tukkoon, kyltti siirtyi vasemmalle ja vei tilan
   *     aihenoston nimiöltä (savuke-pariisi-lahizoom 70/74, vartiot 3e4
   *     ja 3i punaisina). Napautuksen työnjako hoidetaan siksi
   *     osumatestissä, ei esteistöä paisuttamalla.
   */
  assert.match(lauta,
    /const esteet = kaupunginPiste \? \[\.\.\.kiinteaMuste, kaupunginPiste\] : \[\.\.\.kiinteaMuste\];/);
  /*
   * 3. EI MUISTIA. Kun syötteessä ei ole takaisinkytkentää, sama kamera
   *    antaa saman asennon joka kierroksella — edellisen asennon muisti
   *    vain lukitsisi hitaan koneen ensimmäisen, väärän valinnan.
   */
  assert.ok(!/kyltinAsento/.test(lauta), 'kyltin asennolla ei ole muistia');
  assert.match(lauta, /for \(const asento of asennot\) \{/);
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

/*
 * ══ MEREN NIMI EI TUPLAANNU NIMIÖTASON KANSSA (Fable 20.9.2026,
 * Karttasepän merikoe 2) ═══════════════════════════════════════════
 */
test('merinimen tunnus on sama kaava kuin nimiötason generaattorilla', async () => {
  const { merinimenTunnus, merenTunnusPoltettu } = await import('../js/pallolauta/nostot.js');
  assert.equal(merinimenTunnus('Biskajanlahti'), 'biskajanlahti');
  assert.equal(merinimenTunnus('≈ Biskajanlahti'), 'biskajanlahti');
  assert.equal(merinimenTunnus('Välimeri'), 'valimeri');
  assert.equal(merinimenTunnus('Lioninlahti'), 'lioninlahti');
  const avaimet = new Set(['biskajanlahti', 'valimeri']);
  assert.ok(merenTunnusPoltettu(avaimet, 'valimeri', 'Välimeri'));
  assert.ok(merenTunnusPoltettu(avaimet, 'x', '≈ Biskajanlahti'), 'nimen tunnus riittää');
  assert.ok(!merenTunnusPoltettu(avaimet, 'pohjanmeri', 'Pohjanmeri'));
  assert.ok(!merenTunnusPoltettu(new Set(), 'valimeri', 'Välimeri'), 'tyhjä joukko = ei piilotusta');
});

test('nimiötason meri-avaimet luetaan luettelosta; ilman kenttää joukko on tyhjä', async () => {
  const { pyramidinMerinimet, pyramidinNimiot } = await import('../js/laattapyramidi.js');
  assert.equal(pyramidinNimiot(), null);
  assert.equal(pyramidinMerinimet().size, 0);
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /const poltetutMerinimet = pyramidinMerinimet\(\);/);
  assert.match(nostot, /kohde\.tyyppi === 'meri'\n\s*&& merenTunnusPoltettu\(poltetutMerinimet, m\.id, m\.nimi \?\? kohde\.nimi\)\) continue;/);
});
