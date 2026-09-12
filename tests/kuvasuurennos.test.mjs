/*
 * KUVAN SUURENNOKSEN YLEINEN LINJAUS (js/ui-apurit.js suurennoksenMitat).
 *
 * Omistaja 8.9.2026, sanatarkasti: *"pystykuvat saisivat aueta hieman
 * pienemmäksi. Nyt ne täyttävät ihan koko ruudun. Vaakakuva saa aueta koko
 * ruudun leveydelle, ainakin jos pelaajalla on pystyruutuinen näyttö.
 * Tilanne on tietenkin toinen, jos on vaakaruutuinen näyttö, niin silloin
 * vaakakuva saa jäädä hieman pienemmäksi, että sivuista näkyy jotain. Ja
 * taas pystykuva voi tullakin koko ruudun korkeudelle. Tästä kannattaa
 * tehdä jokin yleinen linjaus, jotta toimii kaikissa tilanteissa samalla
 * tavalla."*
 *
 * Neljä yhdistelmää + neliö, ja se että KUMPIKIN suurennos (fokusvirta ja
 * kohdekortti) laskee mittansa samalla funktiolla — kaksi eri kaavaa oli
 * juuri se, mistä omistaja huomautti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  SUURENNOS_SAMA_PYSTY, SUURENNOS_SAMA_VAAKA, SUURENNOS_VASTAKKAINEN,
  suurennoksenMitat,
} from '../js/ui-apurit.js';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/** iPad pystyssä ja tavallinen työpöytä. */
const PYSTYRUUTU = { ruutuLeveys: 1024, ruutuKorkeus: 1366 };
const VAAKARUUTU = { ruutuLeveys: 1280, ruutuKorkeus: 800 };
/** Havainnekuva 3:2 ja muotokuva ~4:5. */
const VAAKAKUVA = { kuvaLeveys: 1536, kuvaKorkeus: 1024 };
const PYSTYKUVA = { kuvaLeveys: 1103, kuvaKorkeus: 1426 };

test('pystyruutu + vaakakuva: kuva täyttää ruudun leveyden', () => {
  const { leveys, korkeus, vastakkainen } = suurennoksenMitat({ ...PYSTYRUUTU, ...VAAKAKUVA });
  assert.equal(vastakkainen, true);
  assert.equal(leveys, Math.round(1024 * SUURENNOS_VASTAKKAINEN));
  assert.ok(leveys > 1024 * 0.95, `vaakakuva jäi kapeaksi (${leveys})`);
  // Korkeus seuraa kuvasuhdetta eikä täytä ruutua.
  assert.ok(korkeus < 1366 * 0.6);
});

test('vaakaruutu + pystykuva: kuva täyttää ruudun korkeuden', () => {
  const { leveys, korkeus, vastakkainen } = suurennoksenMitat({ ...VAAKARUUTU, ...PYSTYKUVA });
  assert.equal(vastakkainen, true);
  assert.equal(korkeus, Math.round(800 * SUURENNOS_VASTAKKAINEN));
  assert.ok(leveys < 1280 * 0.6, 'sivuille jää tilaa, koska korkeus ratkaisee');
});

test('pystyruutu + pystykuva: kuva jää hieman pienemmäksi', () => {
  const { korkeus } = suurennoksenMitat({ ...PYSTYRUUTU, ...PYSTYKUVA });
  assert.equal(korkeus, Math.round(1366 * SUURENNOS_SAMA_PYSTY));
  assert.ok(korkeus < 1366 * 0.85, 'ylä- ja alalaidasta pitää näkyä jotain');
});

test('vaakaruutu + vaakakuva: kuva jää hieman pienemmäksi', () => {
  const { leveys } = suurennoksenMitat({ ...VAAKARUUTU, ...VAAKAKUVA });
  // Korkeuskatto voi rajata leveyttä lisää, mutta ei koskaan kasvattaa.
  assert.ok(leveys <= Math.round(1280 * SUURENNOS_SAMA_VAAKA));
  assert.ok(leveys < 1280 * 0.9, 'sivuista pitää näkyä jotain');
});

test('neliömäinen kuva käsitellään ruudun suuntaisena', () => {
  const nelio = { kuvaLeveys: 1000, kuvaKorkeus: 1000 };
  const pysty = suurennoksenMitat({ ...PYSTYRUUTU, ...nelio });
  const vaaka = suurennoksenMitat({ ...VAAKARUUTU, ...nelio });
  assert.equal(pysty.vastakkainen, false);
  assert.equal(vaaka.vastakkainen, false);
  // Pystyruudulla neliö rajautuu leveyteen (korkeuskatto 78 % olisi
  // ruutua leveämpi), vaakaruudulla korkeuteen — kummassakin ruudun
  // laidoista jää jotain näkyviin.
  assert.equal(pysty.leveys, pysty.korkeus);
  assert.ok(pysty.korkeus <= Math.round(1366 * SUURENNOS_SAMA_PYSTY));
  assert.ok(pysty.leveys < 1024, 'neliö ei täytä ruudun leveyttä reunaan asti');
  assert.ok(vaaka.leveys <= Math.round(1280 * SUURENNOS_SAMA_VAAKA));
  assert.equal(vaaka.leveys, vaaka.korkeus);
  // Rajatapaukset: 0,9 ja 1,1 ovat vielä neliötä.
  assert.equal(suurennoksenMitat({ ...PYSTYRUUTU, kuvaLeveys: 9, kuvaKorkeus: 10 }).vastakkainen, false);
  assert.equal(suurennoksenMitat({ ...PYSTYRUUTU, kuvaLeveys: 11, kuvaKorkeus: 10 }).vastakkainen, false);
  assert.equal(suurennoksenMitat({ ...PYSTYRUUTU, kuvaLeveys: 12, kuvaKorkeus: 10 }).vastakkainen, true);
});

test('kehyksen ja kuvatekstin tila vähennetään, eikä kuva katoa pitkään tekstiin', () => {
  const tiukka = suurennoksenMitat({
    ...PYSTYRUUTU, ...PYSTYKUVA, vaakaVara: 26, pystyVara: 2000,
  });
  // Kuvalle jää aina vähintään reilu neljännes ruudun korkeudesta.
  assert.ok(tiukka.korkeus >= 1366 * 0.27, `kuva kutistui olemattomiin (${tiukka.korkeus})`);
  const vara = suurennoksenMitat({ ...PYSTYRUUTU, ...VAAKAKUVA, vaakaVara: 40 });
  assert.equal(vara.leveys, Math.round(1024 * SUURENNOS_VASTAKKAINEN) - 40);
});

test('pientä lähdettä ei venytetä eikä mitoiteta ilman ruudun mittoja', () => {
  const pieni = suurennoksenMitat({ ...PYSTYRUUTU, ...VAAKAKUVA, enintaanLeveys: 400 });
  assert.equal(pieni.leveys, 400);
  assert.deepEqual(
    suurennoksenMitat({ ...VAAKAKUVA, ruutuLeveys: 0, ruutuKorkeus: 0 }),
    { leveys: 0, korkeus: 0, vastakkainen: false },
  );
  // Ilman kuvan mittoja käytetään oletussuhdetta eikä kaaduta.
  assert.ok(suurennoksenMitat({ ...PYSTYRUUTU }).leveys > 0);
});

test('molemmat suurennokset laskevat mittansa samalla funktiolla', () => {
  for (const tiedosto of ['js/fokusvirta.js', 'js/fokuskohteet.js']) {
    const lahde = lue(tiedosto);
    assert.match(lahde, /suurennoksenMitat\(\{/, `${tiedosto}: oma kaava jäi käyttöön`);
    assert.match(lahde, /suurennoksenMitat,?\s*\n?\s*\}? from '\.\/ui-apurit\.js'|suurennoksenMitat,/,
      `${tiedosto}: yhteistä mitoitusta ei tuoda`);
  }
  // Vanhat omat katot eivät saa palata.
  const virta = lue('js/fokusvirta.js');
  assert.doesNotMatch(virta, /SUURENNOS_OSUUS|SUURENNOS_LEVEIN|SUURENNOS_KORKEIN/);
  const kohteet = lue('js/fokuskohteet.js');
  assert.doesNotMatch(kohteet, /KOHDE_ZOOM_LEVEIN|KOHDE_ZOOM_KORKEIN|KOHDE_ZOOM_VAHIN_OSUUS/);
  // CSS:n varmistusarvot eivät saa kuristaa yhteistä linjausta.
  const css = lue('css/fokusvirta.css');
  assert.match(css, /\.fokuszoom-kehys \{[^}]*max-width: 100%/);
  assert.doesNotMatch(css, /max-height: min\(88vh, 94vmin\)/);
});

/*
 * KEHYKSEN LEVEYS ON KUVAN LEVEYS (omistajan vikailmoitus 12.9.2026:
 * *"Näissä kuvissa on turhaan ylhäällä ja alhaalla pieni
 * marginaali."*).
 *
 * JS asettaa saman luvun sekä kehyksen että kuvan leveydeksi
 * (js/fokusvirta.js avaaSuurennos mitoita). Sivuston yleinen nollaus
 * asettaa kaikelle `box-sizing: border-box` (css/styles.css), ja sen alla
 * kehyksen sisennys söi kuvasta 19,6 px LEVEYTTÄ mutta ei korkeutta:
 * `object-fit: contain` piirsi eron kirjekuorireunoina kuvaelementin
 * sisään (mitattu Chromiumilla 390 × 844: kuvaelementti 324,4 × 215,
 * piirretty kuva 324,4 × 202,8 — 6,1 px turhaa tilaa ylle ja alle).
 * Ilman tätä vartiota nollaus palaisi hiljaa seuraavassa siivouksessa.
 */
test('suurennoksen kehys on content-box: annettu leveys on kuvan leveys', () => {
  const css = lue('css/fokusvirta.css');
  // Kommentit pois: säännöstä luetaan vain se, mitä selain lukee.
  const puhdas = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const lohko = puhdas.slice(puhdas.indexOf('.fokuszoom-kehys {'));
  const kehys = lohko.slice(0, lohko.indexOf('}'));
  assert.match(kehys, /box-sizing: content-box/,
    'kehys palasi border-boxiin — kuvaan syntyy kirjekuorireunat');
  assert.doesNotMatch(kehys, /box-sizing: border-box/);
  // Kuva saa yhä mittansa JS:ltä eikä CSS venytä sitä.
  const kuvalohko = puhdas.slice(puhdas.indexOf('.fokuszoom-kuva {'));
  assert.match(kuvalohko.slice(0, kuvalohko.indexOf('}')), /object-fit: contain/);
});
