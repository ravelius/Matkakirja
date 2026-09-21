/*
 * NIMIÖLAPPUJEN SOVITTELU — GOOGLE EARTHIN MALLI (js/pallolauta/sovittelu.js).
 *
 * Omistaja 7.9.2026: *"kaupungin nimi menee nostojen päälle"* — kaupungin
 * nimi on ensisijainen, laput väistävät (Raamattu KAUPUNGIN NIMI NOSTOJEN
 * PAALLA). Omistaja 21.9.2026 (v1985): *"karttanostot pomppivat kun
 * panoroi tai zoomaa"* — Fablen linjaus: asento valitaan ankkurin
 * ympäriltä kerran levossa ja pidetään; törmäys ratkaistaan
 * näkyvyydellä (heikompi häivytetään), ei siirrolla; hystereesi;
 * ykköstaso ei häivy eikä vaihda asentoa ellei osu toiseen ykköstasoon
 * tai reunaan.
 *
 * Selaimessa sama sääntö mitataan savukkeilla
 * (tools/savukkeet/savuke-nimiot-vakaat.mjs, savuke-pallo-nostolaput.mjs);
 * tässä mitataan PÄÄTÖSSARJA ilman DOMia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  SOVITTELUN_KYLJET, SOVITTELUN_HYSTEREESI_PX,
  laatikotLimittyvat, laatikkoSisalla, reunaanSiirto, sovitteleLaput,
  sovittelunPainoarvo, sovittelunEhdokkaat,
} from '../js/pallolauta/sovittelu.js';
import { NOSTOSYM_NIMIO_ASENNOT, NOSTOSYM_NIMIO_KYLJET, NOSTOSYM_NIMIO_KULMAT } from '../js/fokusnosto-symbolit.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/**
 * Koelappu: ikoni 10 x 10 px pisteessä (x, y) ja nimiö 40 px sen
 * kyljessä — sama muoto kuin nostonLaatikko antaa (ikonin ja nimiön
 * yhdiste), mutta luvut ovat käsin luettavia. Kulmat ovat vaakakylkiä
 * perusviiva ylä- tai alalaidassa.
 */
function koelappu(avain, x, y, kylki = 'oikea', lisa = {}) {
  const r = 5;
  const lev = 40;
  return {
    avain,
    kylki,
    nimi: avain,
    ...lisa,
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
      if (k === 'koillinen') return { x0: kx - r, x1: kx + r + lev, y0: ky - r - 8, y1: ky + r };
      if (k === 'kaakko') return { x0: kx - r, x1: kx + r + lev, y0: ky - r, y1: ky + r + 8 };
      if (k === 'luode') return { x0: kx - r - lev, x1: kx + r, y0: ky - r - 8, y1: ky + r };
      if (k === 'lounas') return { x0: kx - r - lev, x1: kx + r, y0: ky - r, y1: ky + r + 8 };
      return { ...ikoni, x1: kx + r + lev };
    },
  };
}
const asento = (t, avain) => t.asennot.get(avain);

test('vapaa lappu pitää oman kylkensä eikä liiku', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [] });
  assert.deepEqual(asento(t, 'a'), {
    kylki: 'oikea', dx: 0, dy: 0, nimio: true, syy: 'oma',
  });
  assert.equal(t.siirretty, 0);
  assert.equal(t.piilotettu, 0);
});

test('este oikealla → lappu vaihtaa ehdokasasentoa, EI siirry vapaasti', () => {
  const este = { x0: 108, y0: 95, x1: 160, y1: 105 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [este] });
  const a = asento(t, 'a');
  assert.equal(a.nimio, true);
  assert.notEqual(a.kylki, 'oikea');
  assert.equal(a.dx, 0); assert.equal(a.dy, 0);
  assert.equal(a.syy, 'kylki');
  assert.equal(t.kylkiVaihtui, 1);
});

test('kahdeksan ehdokasasentoa: kyljet ensin, kulmat perässä, lukittu ja oma kärjessä', () => {
  assert.deepEqual([...SOVITTELUN_KYLJET], [...NOSTOSYM_NIMIO_ASENNOT]);
  assert.equal(SOVITTELUN_KYLJET.length, 8);
  assert.deepEqual(NOSTOSYM_NIMIO_ASENNOT, [...NOSTOSYM_NIMIO_KYLJET, ...NOSTOSYM_NIMIO_KULMAT]);
  const e = sovittelunEhdokkaat({ kylki: 'yla' }, 'lounas');
  assert.deepEqual(e.slice(0, 2), ['lounas', 'yla']);
  assert.equal(new Set(e).size, 8);
});

test('kun mikään asento ei ole vapaa, nimiö häivytetään ja IKONI JÄÄ asentoonsa', () => {
  const kaikkialla = { x0: 0, y0: 0, x1: 300, y1: 300 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [kaikkialla] });
  assert.deepEqual(asento(t, 'a'), {
    kylki: 'oikea', dx: 0, dy: 0, nimio: false, syy: 'piilossa',
  });
  assert.equal(t.piilotettu, 1);
});

test('kaksi lappua eivät jää limittäin: heikompi vaihtaa asentoa tai häivytetään', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100), koelappu('b', 120, 100)], esteet: [] });
  const A = koelappu('a', 100, 100).laatikko(asento(t, 'a').kylki, 0, 0, true);
  const B = koelappu('b', 120, 100).laatikko(asento(t, 'b').kylki, 0, 0, true);
  if (asento(t, 'a').nimio && asento(t, 'b').nimio) assert.ok(!laatikotLimittyvat(A, B));
  else assert.equal(t.piilotettu, 1);
});

test('prioriteetti: kaupunki > taso 1 > taso 2 > taso 3, sitten lyhyempi nimi', () => {
  assert.ok(sovittelunPainoarvo({ kaupunki: true, nimi: 'Pitkä nimi tässä' }) < sovittelunPainoarvo({ taso: 1, nimi: 'A' }));
  assert.ok(sovittelunPainoarvo({ taso: 1, nimi: 'Lyon' }) < sovittelunPainoarvo({ taso: 2, nimi: 'A' }));
  assert.ok(sovittelunPainoarvo({ taso: 2, nimi: 'Ab' }) < sovittelunPainoarvo({ taso: 3, nimi: 'A' }));
  assert.ok(sovittelunPainoarvo({ taso: 2, nimi: 'Ab' }) < sovittelunPainoarvo({ taso: 2, nimi: 'Abc' }));
  // Vahvempi valitsee ensin: heikko (vasemmalla, nimiö oikealle) osuisi
  // vahvan lappuun ja vaihtaa vasemmalle; vahva pitää oman kylkensä.
  const t = sovitteleLaput({
    laput: [koelappu('heikko', 60, 100, 'oikea', { taso: 2 }), koelappu('vahva', 100, 100, 'oikea', { taso: 1 })],
    esteet: [],
  });
  assert.equal(asento(t, 'vahva').kylki, 'oikea');
  assert.equal(asento(t, 'vahva').syy, 'oma');
  assert.equal(asento(t, 'heikko').kylki, 'vasen');
  // Samassa pisteessä mikään ehdokas ei ole vapaa: heikompi häivytetään.
  const t2 = sovitteleLaput({
    laput: [koelappu('heikko', 100, 100, 'oikea', { taso: 2 }), koelappu('vahva', 100, 100, 'oikea', { taso: 1 })],
    esteet: [],
  });
  assert.equal(asento(t2, 'vahva').nimio, true);
  assert.equal(asento(t2, 'heikko').nimio, false);
});

test('ykköstaso ei häivy muiden lappujen tieltä: kaikki ehdokkaat toisten lappujen alla → pakko, nimiö jää', () => {
  // Kaikkialla toisten lappujen mustetta (sijoitettu ensin kaupunkina),
  // ei kiinteää: ykköstaso pitää oman kylkensä ja muut väistävät.
  const t = sovitteleLaput({
    laput: [
      koelappu('a', 100, 100, 'vasen', { taso: 1 }),
      koelappu('iso', 100, 100, 'oikea', { kaupunki: true, nimi: 'x' }),
    ],
    esteet: [],
  });
  assert.equal(asento(t, 'a').nimio, true);
  assert.equal(asento(t, 'a').syy, 'pakko');
  assert.equal(asento(t, 'a').dx, 0);
});

test('vain kaupungin nimi häivyttää ykköstason: kiinteä muste joka ehdokkaalla → nimiö pois, ikoni jää', () => {
  const kaikkialla = { x0: 0, y0: 0, x1: 300, y1: 300 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100, 'vasen', { taso: 1 })], esteet: [kaikkialla] });
  assert.deepEqual(asento(t, 'a'), {
    kylki: 'vasen', dx: 0, dy: 0, nimio: false, syy: 'piilossa',
  });
  assert.equal(t.piilotettu, 1);
});

test('ykköstaso väistää toista ykköstasoa (ja vain sitä)', () => {
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100, 'oikea', { taso: 1 }), koelappu('b', 60, 100, 'oikea', { taso: 1, nimi: 'bbbbbbbb' })],
    esteet: [],
  });
  assert.equal(asento(t, 'a').kylki, 'oikea');
  assert.equal(asento(t, 'b').kylki, 'vasen');
  assert.equal(asento(t, 'b').nimio, true);
  // Kakkostaso ei saa kääntää ykköstasoa: sama pari toisin päin.
  const t2 = sovitteleLaput({
    laput: [koelappu('a', 100, 100, 'oikea', { taso: 2 }), koelappu('b', 60, 100, 'oikea', { taso: 1, nimi: 'bbbbbbbb' })],
    esteet: [],
  });
  assert.equal(asento(t2, 'b').kylki, 'oikea');
  assert.equal(asento(t2, 'b').nimio, true);
  // Kakkostaso väistää tai häivyttyy — tässä geometriassa mikään
  // ehdokas ei ole vapaa, joten se häivytetään.
  assert.equal(asento(t2, 'a').nimio, false);
});

test('hystereesi: lukittu kelvollinen asento pidetään, vaikka oma kylki olisi taas vapaa', () => {
  const lukot = new Map([['a', { kylki: 'ala', dx: 0, dy: 0, nimio: true }]]);
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [], lukot });
  assert.equal(asento(t, 'a').kylki, 'ala');
  assert.equal(asento(t, 'a').syy, 'lukko');
  assert.equal(t.kylkiVaihtui, 0);
});

test('hystereesi: häivytetty palaa vasta marginaalilla', () => {
  const lukot = new Map([['a', { kylki: 'oikea', dx: 0, dy: 0, nimio: false }]]);
  // Este juuri oikean kyljen laatikon vieressä: ilman marginaalia vapaa,
  // hystereesin verran kasvatettuna ei.
  const este = { x0: 100 + 5 + 40 + 2, y0: 90, x1: 200, y1: 110 };
  const kaikkiMuut = [
    { x0: 0, y0: 0, x1: 200, y1: 94 }, { x0: 0, y0: 106, x1: 200, y1: 300 }, { x0: 0, y0: 90, x1: 94, y1: 110 },
  ];
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [este, ...kaikkiMuut], lukot });
  assert.equal(asento(t, 'a').nimio, false, 'rajatapaus ei saa vilkuttaa nimiötä takaisin');
  const t2 = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [este, ...kaikkiMuut], lukot, hystereesi: 0 });
  assert.equal(asento(t2, 'a').nimio, true, 'ilman marginaalia sama asento on vapaa (vastakoe)');
  assert.ok(SOVITTELUN_HYSTEREESI_PX > 0);
});

test('reuna: levossa reunan ylittävä lappu vaihtaa ehdokasta; kun mikään ei mahdu, se häivytetään', () => {
  const reuna = { x0: 0, y0: 0, x1: 130, y1: 300 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [], reuna });
  assert.equal(asento(t, 'a').nimio, true);
  assert.notEqual(asento(t, 'a').kylki, 'oikea');
  assert.ok(laatikkoSisalla(koelappu('a', 100, 100).laatikko(asento(t, 'a').kylki, 0, 0, true), reuna));
  assert.equal(t.reunalta, 1);
  const ahdas = { x0: 97, y0: 97, x1: 103, y1: 103 };
  const t2 = sovitteleLaput({ laput: [koelappu('b', 100, 100)], esteet: [], reuna: ahdas });
  assert.equal(asento(t2, 'b').nimio, false);
  assert.deepEqual(reunaanSiirto({ x0: -5, y0: 10, x1: 20, y1: 20 }, { x0: 0, y0: 0, x1: 100, y1: 100 }), { dx: 5, dy: 0 });
});

test('rantaviiva: meren lappu väistää kehän laatikoita, maan lappu ei', () => {
  const kehä = [{ x0: 108, y0: 95, x1: 160, y1: 105 }];
  const meri = sovitteleLaput({ laput: [koelappu('m', 100, 100, 'oikea', { meri: true })], esteet: [], rantaviiva: kehä });
  assert.notEqual(asento(meri, 'm').kylki, 'oikea');
  const maa = sovitteleLaput({ laput: [koelappu('k', 100, 100)], esteet: [], rantaviiva: kehä });
  assert.equal(asento(maa, 'k').kylki, 'oikea');
});

test('`este`-lappu (aihenosto) sovitellaan viimeisenä ja väistää muita', () => {
  const t = sovitteleLaput({
    laput: [koelappu('aihe', 60, 100, 'oikea', { este: true, nimi: 'a' }), koelappu('nosto', 100, 100, 'oikea', { nimi: 'nostonnimi' })],
    esteet: [],
  });
  assert.equal(asento(t, 'nosto').kylki, 'oikea');
  assert.equal(asento(t, 'aihe').kylki, 'vasen');
});

test('eleen aikana nostokerros ei ratkaise: lukko pidetään ja uusi lappu saa oman kylkensä', () => {
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /rantaviivaOn = false, lepo = true,/);
  assert.match(nostot, /if \(!lepo\) \{/);
  assert.match(nostot, /kylki: r\.puoli \?\? 'oikea', dx: 0, dy: 0, nimio: true, syy: 'ele',/);
  assert.match(nostot, /lukot: sovitellutAsennot,/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /lepo: lepoladonta && !eleKaynnissa\(\),/);
  assert.match(lauta, /kotelo\.addEventListener\('pointerup', pyydaLadonta\);/);
});

test('nimiö häivytetään luokalla eikä poisteta: erillinen nimiörasteri ja ≤ 200 ms:n siirtymä', () => {
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /erillinenNimio: true,/);
  assert.match(nostot, /g\.classList\.toggle\('nostosym-nimio-piilossa', !nakyy\);/);
  const css = lue('../css/styles.css');
  assert.match(css, /\.nostosym-nimiokuva \{ transition: opacity (1[0-9]{2}|200)ms ease-out; \}/);
  assert.match(css, /\.nostosym-nimio-piilossa \.nostosym-nimiokuva \{ opacity: 0; \}/);
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
  assert.match(nostot, /const sovittele = \(\{\n\s*nimet = \[\], kiinteat = \[\], rantaviiva = null, rantaviivaOn = false, lepo = true,\n\s*\} = \{\}\) => \{/);
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
