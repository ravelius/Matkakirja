/*
 * KEHYSTAHTI — pisin kehys, ei keskiarvo (omistaja 7.9.2026).
 *
 * Omistajan havainto sanatarkasti: *"kartta pyörii nyt jo todella
 * hyvin, mutta jos vertaa google earthiin, niin vielä tulee vähän
 * tökkimistä eli ei niin sulavaa ruudun päivitystä, vaikka välillä on
 * sujuvaa. löytyykö jostain vielä optimoitavaa tai jotain mikä kuluttaa
 * laskentatehoa? mittari kyllä näyttää pysyvän 55-60 fps tasossa. voiko
 * se muuton 55 ja 60 välillä kuitenkin näkyä tökkimisenä?"*
 *
 * VOI — ja juuri sitä se on. 55 fps 60 Hz:n ruudulla ei ole 8 %
 * hitaampi kuva vaan VIISI PUDOTETTUA KEHYSTÄ SEKUNNISSA: neljä
 * kehystä 16,7 ms:n välein ja sitten yksi 33 ms:n nykäys. Keskiarvo ei
 * siis mittaa tökkimistä lainkaan. Tämä testi vartioi ne kolme asiaa,
 * jotka mittauksen (tools/savukkeet/savuke-pallo-kehystahti.mjs,
 * 390 × 844 dpr 2) mukaan veivät pisimmät kehykset — ja mittarin, joka
 * näyttää oikean luvun.
 *
 * Mittaukset ja päätökset: docs/moduulit/karttapallo.md luku 12
 * ("Kehystahti").
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  POHJAN_ASKEL_OSUUS, POHJAN_VALI_MS, POHJAN_TASO_MAX,
  kameranSiirtyma, pohjanHarvennusPaalla,
} from '../js/pallo.js';
import {
  LAATTAKERROS_TEKSTUUREJA_PER_KEHYS, LAATTAKERROS_RINNAKKAIN,
  LAATTAKERROS_PAIVITYSVALI_LIIKE_MS,
} from '../js/pallolaatat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/*
 * ======== 1. POHJA PÄIVITTYY HARVEMMIN KUIN RUUTU ==================
 *
 * MITATTU (savuke-pallo-kehystahti, 41 laitekehystä): kirjaston oma
 * laattamoottori (`updatePov`) ajettiin KAKSI KERTAA JOKAISESSA
 * kehyksessä, ja vaikka mediaanikutsu oli 0,4 ms, pisin oli 12,2 ms ja
 * raskaimmassa kehyksessä kutsut veivät yhteensä 17 ms — yksin koko
 * 60 Hz:n kehysbudjetin.
 */
test('pohjan harvennus: suhteellinen siirtymä, ei asteita', () => {
  const origo = { x: 0, y: 0, z: 135 };
  // Ei vertailukohtaa (NaN, null) → päivitetään aina.
  assert.equal(kameranSiirtyma({ x: 1, y: 0, z: 0 }, null), Infinity);
  assert.equal(kameranSiirtyma(null, origo), Infinity);
  assert.equal(kameranSiirtyma({ x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 0 }), Infinity);
  assert.equal(kameranSiirtyma({ x: NaN, y: 0, z: 0 }, origo), Infinity);
  // Paikallaan = 0; sivusuunta = kuljettu kulma radiaaneina.
  assert.equal(kameranSiirtyma(origo, origo), 0);
  assert.ok(Math.abs(kameranSiirtyma({ x: 13.5, y: 0, z: 135 }, origo) - 0.1) < 1e-9);
  // Zoom (säteen muutos) mitataan samalla luvulla: 10 % lähemmäs = 0,1.
  assert.ok(Math.abs(kameranSiirtyma({ x: 0, y: 0, z: 121.5 }, origo) - 0.1) < 1e-9);

  /*
   * KYNNYS ON KOLMASOSA NÄKYMÄSTÄ. Korkeudella 0,35 kamera on 135
   * yksikön päässä 100:n säteisestä pallosta ja näkee noin 9°;
   * 0,06 · 135 = 8,1 yksikköä ≈ 3,4°:n kaari. Pohjan laatta (z5) on
   * 11,25° leveä, joten se ei ehdi siinä ajassa vanhentua.
   */
  assert.equal(POHJAN_ASKEL_OSUUS, 0.06);
  assert.ok(POHJAN_ASKEL_OSUUS > 0 && POHJAN_ASKEL_OSUUS < 0.2);
  assert.equal(POHJAN_TASO_MAX, 5, 'pohja on karkea: harvennus ei voi sumentaa sitä');
  // Peittämättömässä tilassa pohja päivitetään enintään kerroksen tahdissa.
  assert.equal(POHJAN_VALI_MS, LAATTAKERROS_PAIVITYSVALI_LIIKE_MS);
});

test('pohjan harvennus: vipu pois osoiteriviltä, päällä oletuksena', () => {
  const ikkuna = (haku) => ({ location: { search: haku } });
  assert.equal(pohjanHarvennusPaalla(ikkuna('')), true);
  assert.equal(pohjanHarvennusPaalla(ikkuna('?lauta=pallo')), true);
  assert.equal(pohjanHarvennusPaalla(ikkuna('?pohjanharvennus=1')), true);
  assert.equal(pohjanHarvennusPaalla(ikkuna('?pohjanharvennus=0')), false);
  assert.equal(pohjanHarvennusPaalla(ikkuna('?pohjanharvennus=pois')), false);
  assert.equal(pohjanHarvennusPaalla({}), true, 'ilman ikkunaa (testiajo) harvennus on päällä');
});

test('pohjan harvennus: kolme ohitusehtoa ja laskuri savukkeelle', () => {
  const pallo = lue('../js/pallo.js');
  /*
   * (1) ilman laattakerrosta moottori ON kartta, (2) riittävä siirtymä,
   * (3) peittämätön näkymä mutta enintään POHJAN_VALI_MS:n välein.
   */
  assert.match(pallo, /if \(!kerrosKaytossa \|\| !pohjanHarvennus\) return true;/);
  assert.match(pallo, /if \(kameranSiirtyma\(kam\.position, pohjanPaikka\) >= POHJAN_ASKEL_OSUUS\) return true;/);
  assert.match(pallo, /return !kerros\.peittaa\(\) && nyt - pohjanHetki >= POHJAN_VALI_MS;/);
  // Ohitettu päivitys ei kutsu kirjastoa lainkaan.
  assert.match(pallo, /if \(!pohjaPaivitetaan\(kam, nyt\)\) return undefined;/);
  // Lepo ajaa moottorin aina: levossa pohja on sama kuin ennen muutosta.
  assert.match(pallo, /const lepoon = \(\) => \{[\s\S]*?alkuperainen\.call\(moottori, kamera\);/);
  // Savukkeen luettava laskuri (tools/savukkeet/savuke-pallo-kehystahti.mjs).
  assert.match(pallo, /moottori\.pohjapaivityksia \+= 1;/);
});

/*
 * ======== 2. TEKSTUURIEN VIENTI JA LAATAN LÄHDE ====================
 *
 * Mitattu `renderer.initTexture`: 3,0 ms (p50), 6,7 ms (max). Kaksi
 * peräkkäin samassa kehyksessä on siis pahimmillaan 13 ms 16,7 ms:n
 * budjetista.
 */
test('tekstuureja yksi kehystä kohti — ja vienti ei jää pullonkaulaksi', () => {
  assert.equal(LAATTAKERROS_TEKSTUUREJA_PER_KEHYS, 1);
  assert.ok(LAATTAKERROS_TEKSTUUREJA_PER_KEHYS * 60 > LAATTAKERROS_RINNAKKAIN,
    '60 Hz:llä yksi vienti kehyksessä on 60 laattaa sekunnissa');
});

/*
 * ======== 3. PÄIVITYS EI SAA TUOTTAA ROSKAA ========================
 *
 * Jäljessä (CDP Tracing) näkyi panoroinnin aikana
 * V8.GC_MC_BACKGROUND_MARKING 845 ms neljässä sekunnissa. Kerroksen
 * päivitys ajetaan 10 kertaa sekunnissa, ja se kokosi ennen kahdeksan
 * erillistä filter/reduce-kierrosta ja kaksi taulukkokopiota kaikista
 * tietueista — ja lisäksi js/pallo.js kutsui `mittarit()`ia joka
 * piirretyllä kehyksellä, mikä kopioi myös pyydettyjen osoitteiden
 * joukon taulukoksi.
 */
test('kerroksen päivitys: mittarit yhdellä kierroksella, ei taulukkokopioita', () => {
  const laatat = lue('../js/pallolaatat.js');
  const suorita = laatat.match(/function suorita\(kehys\) \{[\s\S]*?\n {2}\}/)[0];
  const mittariosa = suorita.slice(suorita.indexOf('let jumissa = 0;'));
  assert.ok(mittariosa.length > 200, 'mittarien kokoamislohko löytyy');
  assert.ok(!/\.filter\(/.test(mittariosa), 'mittarit eivät suodata uusia taulukoita');
  assert.ok(!/\.reduce\(/.test(mittariosa), 'mittarit eivät kokoa reducella');
  assert.ok(!/\[\.\.\.laatat\.values\(\)\]/.test(mittariosa), 'mittarit eivät kopioi tietueita');
  assert.match(mittariosa, /for \(const t of laatat\.values\(\)\) \{/);
  // Aluemuisti: laatan lat/lon-suorakaide lasketaan kerran, ei kahdesti
  // jokaisella päivityksellä jokaiselle ehdokkaalle.
  assert.match(laatat, /const muistissa = aluemuisti\.get\(muistiavain\);\n\s*if \(muistissa\) return muistissa;/);
  assert.match(laatat, /if \(aluemuisti\.size >= ALUEMUISTIN_KATTO\) aluemuisti\.clear\(\);/);
  // Varauksettomat lukijat js/pallo.js:n piirtokoukulle.
  assert.match(laatat, /tila: \(\) => mittarit\.tila,/);
  assert.match(laatat, /syy: \(\) => mittarit\.syy,/);
  assert.match(laatat, /peittaa: \(\) => mittarit\.nakyvia > 0 && mittarit\.nakyviaScenessa >= mittarit\.nakyvia,/);
});

/*
 * ======== 4. MITTARI NÄYTTÄÄ PISIMMÄN KEHYKSEN =====================
 *
 * Omistaja luki mittarista keskiarvon ("55-60 fps") ja kysyi, voiko se
 * silti näkyä tökkimisenä. Mittari näyttää nyt sen luvun, joka vastaa:
 * pisin kehys viimeisen SEKUNNIN aikana ja pudotusten lukumäärä.
 */
test('karttamittari: pisin kehys ja pudotukset sekunnin ikkunasta', () => {
  const mittari = lue('../js/karttamittari.js');
  assert.match(mittari, /const KEHYSIKKUNA_LYHYT_MS = 1000;/);
  assert.match(mittari, /const PUDOTUSRAJA_MS = 17;/);
  // Sama rengaslukija palvelee molempia ikkunoita; raja on valinnainen.
  assert.match(mittari, /const ikkunasta = \(kestot, ajat, paa, maara, nyt, ikkuna, raja = Infinity\) =>/);
  assert.match(mittari, /if \(kestot\[kohta\] > raja\) yli \+= 1;/);
  assert.match(mittari, /KEHYSIKKUNA_LYHYT_MS, PUDOTUSRAJA_MS\);/);
  assert.match(mittari, /pisin\/1s\s+\$\{luku\(s\.suurin\)\} ms · pudotuksia \$\{s\.yli\} \/ \$\{s\.maara\}/);
  // Sama rivi menee konsoliin (Safarin etäkonsoli, iOS-kuori).
  assert.match(mittari, /pisin1s \$\{luku\(s\.suurin\)\} pudotuksia \$\{s\.yli\}/);
  // Mittari ei saa itse tuottaa roskaa: renkaat ovat valmiiksi varatut.
  assert.match(mittari, /const kehysvalit = new Float64Array\(KEHYKSIA\);/);
});

/*
 * ======== 5. SAVUKE ON OLEMASSA JA KALIBROITU ======================
 */
test('savuke-pallo-kehystahti: kalibrointi kirjattu, raja 17 ms / 3 %', () => {
  const savuke = lue('../tools/savukkeet/savuke-pallo-kehystahti.mjs');
  assert.match(savuke, /const NYKAYS_MS = 17;/);
  assert.match(savuke, /const NYKAYSOSUUS_RAJA = 3;/);
  // Kalibrointi on kirjattu: kontin kehysväli ei kelpaa mitaksi.
  assert.match(savuke, /KALIBROINTI/);
  assert.match(savuke, /SwiftShader/);
  // Kamera liikkuu KEHYSASKELIN eikä kellosta (ks. savukkeen otsikko).
  assert.match(savuke, /const askelin = \(\{ dLat = 0, dLng = 0, kerroin = 1, kehyksia \}\)/);
  const readme = lue('../tools/savukkeet/README.md');
  assert.ok(readme.includes('| savuke-pallo-kehystahti |'),
    'tools/savukkeet/README.md: savuke-pallo-kehystahti-rivi puuttuu');
});
