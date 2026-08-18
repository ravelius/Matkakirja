// Palvelutyöntekijän SHELL-lista on käsin ylläpidetty. Jos moduuli
// unohtuu siitä, peli toimii verkossa mutta hajoaa offline — eikä sitä
// huomaa kehittäessä. Tämä testi vertaa listaa levyyn molempiin
// suuntiin.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const sw = readFileSync(join(JUURI, 'sw.js'), 'utf8');
const SHELL = [...sw.matchAll(/'\.\/([^']+)'/g)].map((m) => m[1]);

test('kaikki SHELLin tiedostot ovat olemassa', () => {
  const puuttuu = SHELL.filter((p) => p !== '' && !existsSync(join(JUURI, p)));
  assert.deepEqual(puuttuu, [], 'SHELL viittaa tiedostoihin joita ei ole');
});

/*
 * KAIKKI js/-moduulit kuuluvat SHELLiin — myös js/tyohuone-*.js.
 *
 * Ennen 18.8.2026 työhuone oli erillinen sivusto (tyohuone.html), joka
 * jakoi pelin kanssa palvelutyöntekijän mutta haki omat tiedostonsa
 * verkosta ensin; ne oli siksi rajattu tästä testistä pois. Sivusto
 * purettiin ja työhuone elää nyt pelin sisällä kehittäjävivun takana,
 * joten sen moduulit ovat pelin moduuleja: ui.js tuo ne staattisesti,
 * ja yksikin puuttuja jättäisi KOKO pelin käynnistymättä offline.
 */

/*
 * Hakemistot, joiden jokainen .js-tiedosto kuuluu pelin SHELLiin.
 *
 * Lista on hakemistoina eikä tiedostoina, koska juuri kokonainen uusi
 * KANSIO jää muuten huomaamatta: yksittäisen unohtuneen tiedoston
 * huomaa alla oleva vertailu, mutta jos skannaus ei tunne kansiota
 * lainkaan, se ei voi kertoa mistään. Niin kävi js/linssit-kansiolle:
 * peli olisi toiminut kehityksessä ja hajonnut vasta lentokoneessa.
 *
 * Kun tänne syntyy uusi js-alihakemisto, se lisätään tähän listaan.
 */
const SKANNATTAVAT = ['js', 'js/packs', 'js/linssit'];

/**
 * Hakemiston .js-tiedostot repon juuresta laskettuina polkuina.
 *
 * Puuttuva hakemisto ei ole virhe. Kansiot syntyvät kesken työn, ja
 * testin tehtävä on vahtia SHELLiä — ei sanella missä järjestyksessä
 * kansiot ilmestyvät.
 */
function moduulitLevylla(hakemisto) {
  const polku = join(JUURI, hakemisto);
  if (!existsSync(polku)) return [];
  return readdirSync(polku)
    .filter((f) => f.endsWith('.js'))
    .map((f) => `${hakemisto}/${f}`)
    .sort();
}

test('kaikki js-moduulit ovat SHELLissä', () => {
  const levy = SKANNATTAVAT.flatMap(moduulitLevylla);
  const unohtui = levy.filter((p) => !SHELL.includes(p));
  assert.deepEqual(unohtui, [],
    'nämä moduulit puuttuvat sw.js:n SHELL-listalta — offline hajoaisi. Korjaus on '
    + `sw.js:n SHELL-listaan: ${unohtui.map((p) => `'./${p}',`).join(' ')}`);
});

/*
 * Linssikerroksessa ei ole yhtään SVG-suodatinta.
 *
 * iOS:n webapp-tila palauttaa suodatetun kerroksen TYHJÄNÄ sen jälkeen,
 * kun sovellus on ollut taustalla. Sama vika on korjattu tässä repossa
 * jo kolmesti (js/mapart.js 72–91 ja 236–242, js/ui.js 2986–3004), ja
 * joka kerta se huomattiin vasta omistajan iPadilta — kehityskoneelta
 * suodatin näyttää täsmälleen oikealta. Linssi kattaa koko
 * maailmankartan, joten se ei ole missään olosuhteissa se "pieni
 * kerros", joka aikoinaan sai pitää suodattimensa.
 *
 * js/linssit/kerros.js tarkistaa saman ajon aikana, mutta vasta kun
 * linssi on oikeasti piirretty ruudulle. Tämä testi lukee lähdekoodia,
 * joten se osuu myös rasteroitavaan SVG-merkkijonoon ja linssiin, jota
 * kukaan ei ole vielä avannut kertaakaan.
 *
 * Pehmeys ja kohina esilasketaan kuvaan tai <pattern>-laattaan
 * (malli: grainTile, js/mapart.js 177–222).
 */
const SUODATINSAANNOT = [
  // feTurbulence, feGaussianBlur, feColorMatrix… — pieni fe + iso kirjain
  // on SVG:ssä aina suodatinalkio. Taulukon .filter() ja merkkijono 'fe'
  // eivät osu tähän.
  { nimi: 'suodatinalkio', saanto: /\bfe[A-Z]\w*/ },
  // filter="url(#…)", { filter: … }, 'filter': … ja <filter>. Vertailu
  // nimi === 'filter' (moottorin oma vahti) ei osu, koska sitä ei seuraa
  // kaksoispiste eikä yhtäläisyysmerkki.
  { nimi: 'filter-attribuutti', saanto: /<\s*filter\b|filter\s*=\s*["']|["']filter["']\s*:|\bfilter\s*:/ },
];

/** Kokonaan kommentiksi kirjoitettu rivi — sääntöä saa selittää sanoin. */
const kommenttirivi = (rivi) => /^\s*(\/\/|\/?\*)/.test(rivi);

test('linssimoduuleissa ei ole SVG-suodattimia', () => {
  const loydot = [];
  for (const polku of moduulitLevylla('js/linssit')) {
    readFileSync(join(JUURI, polku), 'utf8').split('\n').forEach((rivi, i) => {
      if (kommenttirivi(rivi)) return;
      for (const { nimi, saanto } of SUODATINSAANNOT) {
        const osuma = rivi.match(saanto);
        if (osuma) loydot.push(`${polku}:${i + 1} ${nimi}: ${osuma[0]}`);
      }
    });
  }
  assert.deepEqual(loydot, [],
    'linssikerroksessa ei saa olla SVG-suodattimia: iOS:n webapp-tila palauttaa '
    + 'suodatetun kerroksen tyhjänä taustalta palatessa. Esilaske pehmeys kuvaan '
    + 'tai <pattern>-laattaan (docs/moduulit/linssit.md luku 1.7)');
});

/*
 * Yhden tiedoston versio niputtaa jokaisen karttapaketin.
 *
 * tools/build-standalone.mjs kokoaa vain MODULES-listan tiedostot, ja
 * sen oma checkModuleList huomaa vain listalla jo olevien moduulien
 * puuttuvat riippuvuudet. Kokonaan unohtunut paketti menee siis läpi:
 * dist/matkakirja.html syntyy virheittä mutta vajaana, ja puute näkyy
 * vasta pelatessa. SHELListä puuttumisesta on testi yllä; MODULESista
 * puuttumisesta ei ollut mitään.
 *
 * Linssimoduulit (js/linssit/) EIVÄT kuulu listalle: ne tuodaan
 * dynaamisesti ja yhden tiedoston versio jää tarkoituksella ilman
 * linssejä, kuten se jää ilman valokuvia ja ääniä
 * (docs/moduulit/linssit.md luku 2.1). Siksi tämä testi vertaa vain
 * karttapaketteja.
 *
 * NIPUTTAMATTOMAT-poikkeuslista (moduuliremontin M0b, 17.8.2026,
 * päätoimittajan päätös): paketti, jota mikään MODULES-listan moduuli
 * ei tuo staattisesti, on niputuksessa pelkkää kuollutta painoa ja
 * törmäyspintaa (NS-törmäyksen oppi build-standalonen kommentissa) —
 * selaimessa data jää saavuttamattomaksi, koska dynaaminen import
 * kaatuu yhden tiedoston versiossa joka tapauksessa. Tällaiset paketit
 * listataan tähän NIMELTÄ, jotta poisjättö on aina tietoinen päätös
 * eikä unohdus: tuntematon puuttuva paketti kaataa testin edelleen.
 * Symmetrian vartija alla estää tiedoston olemisen molemmilla
 * listoilla, ja tools/tarkista-niputus.mjs kaataa ajon, jos listattu
 * moduuli jää ilman tuojaa.
 */
const NIPUTTAMATTOMAT = new Set([
  // Linssien aineistopaketit: vain linssimoduulit (js/linssit/) tuovat
  // näitä, ja ne jäävät listalta pois yllä kerrotusta syystä.
  'js/packs/linssi-historia.js',
  'js/packs/linssi-ilmasto.js',
  'js/packs/linssi-kielet.js',
  'js/packs/linssi-leviaminen.js',
  'js/packs/linssi-maaluvut.js',
  'js/packs/linssi-muuttoliike.js',
  'js/packs/linssi-tahdet.js',
  'js/packs/linssi-topografia-kuva.js',
  'js/packs/linssi-topografia.js',
  'js/packs/linssi-tuulet.js',
  'js/packs/linssi-yokartta.js',
  // Koelaudat poistettiin pelin rekisteristä (js/pack.js) — tiedostot
  // jäävät repoon mahdollista myöhempää käyttöä varten.
  'js/packs/istanbul-questions.js',
  'js/packs/istanbul.js',
  'js/packs/suomi-questions.js',
  'js/packs/suomi.js',
  // Asteaineistot: lähdedataa, josta projisoidut versiot on jo
  // niputettu (maailmankartta-maasto, maailmankartta-nimet).
  'js/packs/maasto-korkeus.js',
  'js/packs/maasto-nimet-vedet.js',
  'js/packs/maasto-nimet-vuoret.js',
  'js/packs/maasto-vedet.js',
  // Radiosoittimen ja päivän kuvien aineistot: tuojat (viritin.js,
  // työhuone) eivät ole niputuksessa.
  'js/packs/viritysaanet.js',
  'js/packs/paivan-kuvat.js',
]);

test('yhden tiedoston versio niputtaa kaikki karttapaketit', () => {
  const kokooja = readFileSync(join(JUURI, 'tools/build-standalone.mjs'), 'utf8');
  const lohko = kokooja.match(/const MODULES = \[([\s\S]*?)\n\];/);
  assert.ok(lohko, 'MODULES-listaa ei löytynyt tools/build-standalone.mjs:stä');
  const listatut = lohko[1].split('\n')
    .filter((rivi) => !kommenttirivi(rivi))
    .flatMap((rivi) => [...rivi.matchAll(/'([^']+)'/g)].map((m) => m[1]));

  const unohtui = moduulitLevylla('js/packs')
    .filter((p) => !listatut.includes(p) && !NIPUTTAMATTOMAT.has(p));
  assert.deepEqual(unohtui, [],
    'nämä karttapaketit puuttuvat tools/build-standalone.mjs:n MODULES-listalta — '
    + 'yhden tiedoston versio jäisi vajaaksi. Jos poisjättö on tarkoitus, '
    + 'kirjaa paketti NIPUTTAMATTOMAT-listaan perusteluineen');

  const tuplana = listatut.filter((p) => NIPUTTAMATTOMAT.has(p));
  assert.deepEqual(tuplana, [],
    'paketti on sekä MODULES- että NIPUTTAMATTOMAT-listalla — poista toisesta');

  const kadonneet = [...NIPUTTAMATTOMAT].filter((p) => !existsSync(join(JUURI, p)));
  assert.deepEqual(kadonneet, [],
    'NIPUTTAMATTOMAT viittaa paketteihin joita ei enää ole — siivoa lista');

  const haamut = listatut.filter((p) => p.startsWith('js/packs/') && !existsSync(join(JUURI, p)));
  assert.deepEqual(haamut, [],
    'MODULES-lista viittaa karttapaketteihin joita ei ole — kokoaja kaatuu lukemiseen');
});

test('välimuistin nimi seuraa sovelluksen versiota', () => {
  const versio = readFileSync(join(JUURI, 'js/main.js'), 'utf8')
    .match(/const APP_VERSION = '([^']+)'/)?.[1];
  assert.ok(versio, 'APP_VERSION ei löytynyt');
  const cache = sw.match(/const CACHE = '([^']+)'/)?.[1];
  assert.equal(cache, `matkakirja-${versio}`,
    'sw.js:n CACHE ja js/main.js:n APP_VERSION ovat eri versiossa — '
    + 'vanha välimuisti jäisi voimaan');
});

/*
 * PEILIKUVAN NOUDOSSA ON OLTAVA VARAREITTI ILMAN CORSIA.
 *
 * Historia: R2:n julkinen pub-*.r2.dev-osoite ei aluksi lähettänyt
 * Access-Control-Allow-Origin -otsaketta, jolloin { mode: 'cors' }
 * -nouto epäonnistui AINA ja jokainen peilikuva kaatui
 * palvelutyöntekijässä. Yksittäinen kuva näytti silti toimivan, joten
 * vikaa ei huomannut mistään — se paljastui vasta kun kuvia pyydettiin
 * monta kerralla (rikkinäinen kuva Marseillessa, tyhjä pino Ateenassa).
 *
 * Ämpäriin lisättiin sittemmin CORS-sääntö, joten cors-noutoa saa taas
 * yrittää: se on ainoa tapa saada kuva talteen koriin, ja juuri se
 * poistaa toistuvat purskeet rajoitetulle r2.dev-osoitteelle. Ehto on
 * nyt tämä: cors-noudon jälkeen KOODISSA ON OLTAVA tavallinen
 * fetch(event.request) varareittinä. Ilman sitä peli hajoaisi
 * uudelleen heti, jos sääntö poistetaan ämpäristä tai peli avataan
 * muualta kuin ravelius.github.io:sta.
 *
 * Testi lukee lähdekoodia eikä käyttäytymistä, koska palvelutyöntekijää
 * ei voi ajaa Nodessa. Se on karkea mutta osuu juuri siihen riviin,
 * jonka poisto rikkoisi kuvat uudelleen.
 */
test('peilikuvalla on cors-noudon jälkeen varareitti ilman corsia', () => {
  const kohta = sw.indexOf('r2.dev');
  assert.ok(kohta > 0, 'sw.js ei enää tunne peiliä — onko ehto poistettu?');
  const lohko = sw.slice(kohta, kohta + 3200);
  const rivit = lohko.split('\n').filter((r) => !/^\s*(\*|\/\/|\/\*)/.test(r));
  const corsRivi = rivit.findIndex((r) => /mode:\s*'cors'/.test(r));
  const varaRivi = rivit.findIndex((r) => /fetch\(event\.request\)/.test(r));
  assert.ok(corsRivi >= 0, 'cors-nouto on ainoa tapa saada kuva koriin');
  assert.ok(varaRivi > corsRivi,
    'cors-noudon jälkeen on oltava tavallinen fetch(event.request) varareittinä');
});

/*
 * Yhdistämismerkkejä ei saa päätyä julkaistuun koodiin.
 *
 * Tänään kävi juuri niin: neljään tiedostoon jäi purkamaton ristiriita
 * (<<<<<<< HEAD), ne commitoitiin, ja KOKO TESTISARJA MENI SILTI LÄPI.
 * Syy on yksinkertainen: yksikään testi ei tuo js/linssit/- eikä
 * css/-tiedostoja, joten rikkinäistä syntaksia ei kukaan jäsentänyt.
 * Peli hajosi selaimessa ensimmäiseen riviin ("Unexpected token '<<'"),
 * ja sen huomasi vain siksi, että satuin ottamaan kuvakaappauksen.
 *
 * Tämä testi lukee tiedostot tekstinä eikä koodina, joten se kattaa myös
 * ne, joita ei voi tuoda: tyylit, HTML ja yhden tiedoston versio.
 */
test('yhdistämismerkkejä ei ole jäänyt tiedostoihin', () => {
  const merkki = /^(<{7}|={7}|>{7})(\s|$)/m;
  const kansiot = ['js', 'js/packs', 'js/linssit', 'css', 'tools', 'tests'];
  const loydot = [];
  for (const kansio of kansiot) {
    const polku = join(JUURI, kansio);
    if (!existsSync(polku)) continue;
    for (const nimi of readdirSync(polku)) {
      if (!/\.(js|mjs|css|html)$/.test(nimi)) continue;
      const tiedosto = join(polku, nimi);
      if (!statSync(tiedosto).isFile()) continue;
      if (merkki.test(readFileSync(tiedosto, 'utf8'))) loydot.push(`${kansio}/${nimi}`);
    }
  }
  for (const juuriTiedosto of ['index.html', 'sw.js']) {
    const tiedosto = join(JUURI, juuriTiedosto);
    if (existsSync(tiedosto) && merkki.test(readFileSync(tiedosto, 'utf8'))) loydot.push(juuriTiedosto);
  }
  assert.deepEqual(loydot, [],
    'näihin tiedostoihin on jäänyt purkamaton yhdistämisristiriita');
});
