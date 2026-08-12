// Etusivun reittianimaatio.
//
// Omistaja ei nähnyt animaatiota millään laitteellaan (12.8.2026), vaikka
// jokainen Chromium-mittaus näytti sen toimivan. Omistajan selaimet ovat
// WebKit-pohjaisia, eikä tässä ympäristössä ole WebKit-selainta, joten
// korjaus nojaa tunnettuihin käyttäytymisiin. Nämä testit vartioivat juuri
// niitä oletuksia, joita ei pysty ajamalla toteamaan: ne katsovat
// lähdekoodia ja laskevat samat luvut kuin peli.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  polunPituus, alkuKehykset, kierraKehykset, jaljenKehykset,
  ALKUREITIT, JALJEN_PYYHKAISY,
} from '../js/ui.js';
import { jaaAlku } from '../js/aani-ehdokkaat.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const VIRTA = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');
const EHDOKKAAT = readFileSync(new URL('../js/aani-ehdokkaat.js', import.meta.url), 'utf8');

/** css/styles.css:n säännöt luokalle, koko tiedostosta. */
function saannot(luokka) {
  const osat = [];
  const re = new RegExp(`[^{}]*\\.${luokka}[^{}]*\\{([^}]*)\\}`, 'g');
  for (const osuma of CSS.matchAll(re)) osat.push(osuma[1]);
  return osat.join(' ');
}

test('CSS ei aseta niitä ominaisuuksia, joita SMIL animoi', () => {
  /*
   * Tämä on koko korjauksen kompastuskivi: tyylitiedoston sääntö voittaa
   * SMIL-animaation arvon. Jos joku lisää tänne peittävyyden, säteen tai
   * katkoviivan, animaatio jää paikalleen eikä siitä tule virhettä —
   * ruudulle jää vain liikkumaton piste, aivan kuten omistajalle.
   */
  for (const luokka of ['alkureitti-jalki', 'alkureitti-piste', 'alkureitti-karki',
    'alkureitti-keha', 'alkureitti-kulkija']) {
    const teksti = saannot(luokka);
    for (const omin of ['opacity', 'r:', 'stroke-dashoffset', 'stroke-dasharray', 'animation']) {
      assert.ok(!teksti.includes(omin),
        `.${luokka} asettaa ominaisuuden ${omin} — se jyrää SMIL-animaation`);
    }
  }
});

test('kärki on ympyrä, jota animateMotion kuljettaa', () => {
  // CSS-animoitu katkoviivan pätkä oli se, jota omistaja ei nähnyt.
  assert.match(UI, /animateMotion/, 'kärjen liike ei ole SMILiä');
  assert.ok(!/@keyframes alkureitti/.test(CSS), 'CSS-avainkehykset ovat yhä tallella');
  assert.ok(!/alkureitti[^\n]*getTotalLength/.test(UI),
    'polun pituus luetaan yhä selaimelta — WebKit palauttaa nollan piilossa olevalle');
});

test('polun pituus lasketaan ilman selainta', () => {
  // Suora jana: murtoviiva-arvion on osuttava tarkkaan oikeaan.
  assert.ok(Math.abs(polunPituus([[0, 0], [100, 0]]) - 100) < 0.01);
  // Kaaren pituus on aina vähintään päiden välinen etäisyys.
  const kaari = polunPituus([[0, 0], [50, 40], [100, 0]]);
  assert.ok(kaari > 100 && kaari < 200, `odottamaton kaaren pituus ${kaari}`);
  assert.equal(polunPituus([[5, 5]]), 0);
});

test('kierretty silmukka kelpaa SMILille', () => {
  /*
   * keyTimes on hylkäysehto: sen on alettava nollasta, päätyttävä
   * ykköseen ja kasvettava koko matkan. Vaihe leivotaan avainhetkiin,
   * jottei tarvita negatiivista begin-arvoa (WebKitin ajastuksen
   * erikoistapaukset ovat juuri se, mihin ei haluta nojata).
   */
  const kehykset = alkuKehykset(0.44);
  for (const vaihe of [0, 0.5, 0.83, -0.37, 1.25, 0.0001, 0.9999]) {
    const k = kierraKehykset(kehykset, vaihe);
    assert.equal(k[0].t, 0, `vaihe ${vaihe}: ei ala nollasta`);
    assert.equal(k[k.length - 1].t, 1, `vaihe ${vaihe}: ei pääty ykköseen`);
    for (let i = 1; i < k.length; i++) {
      assert.ok(k[i].t > k[i - 1].t, `vaihe ${vaihe}: keyTimes ei kasva kohdassa ${i}`);
    }
    for (const askel of k) {
      assert.ok(askel.kulku >= 0 && askel.kulku <= 1, `vaihe ${vaihe}: keyPoints ${askel.kulku} rajojen ulkopuolella`);
      assert.ok(askel.nakyy >= 0 && askel.nakyy <= 1, `vaihe ${vaihe}: peittävyys ${askel.nakyy} rajojen ulkopuolella`);
    }
  }
});

test('silmukan sauma osuu kohtaan, jossa mitään ei näy', () => {
  // Kierretyssä silmukassa arvo hyppää kerran lopusta alkuun. Hyppy on
  // näkymätön vain, jos peittävyys on sen molemmin puolin nolla.
  const kehykset = alkuKehykset(0.44);
  for (const vaihe of [0.3, 0.5, 0.77]) {
    const k = kierraKehykset(kehykset, vaihe);
    for (let i = 1; i < k.length; i++) {
      if (k[i].kulku >= k[i - 1].kulku - 0.001) continue; // ei hyppyä taaksepäin
      assert.equal(k[i].nakyy, 0, `vaihe ${vaihe}: hyppy näkyisi (peittävyys ${k[i].nakyy})`);
      assert.equal(k[i - 1].nakyy, 0, `vaihe ${vaihe}: hyppy näkyisi (peittävyys ${k[i - 1].nakyy})`);
    }
  }
});

/*
 * HIENOSÄÄTÖ 12.8.2026. Jälki jää näkyviin, pisteet sykkivät, laivoja on
 * useampi ja ne ovat isoisää himmeämpiä. Alla oleva vartioi niitä
 * oletuksia, joiden rikkoutuminen ei näkyisi virheenä vaan vain
 * väärältä näyttävänä etusivuna.
 */

test('reitin lähtöhetki mahtuu lepovaiheeseen', () => {
  /*
   * Sekä kärki että jälki kierretään kohdasta 1 − alku, ja sen kohdan
   * arvon on oltava vakio: matkan aikana kierto katkaisisi matkan
   * keskeltä, pyyhkäisyn aikana se jättäisi puolikkaan jäljen ruudulle.
   */
  for (const reitti of ALKUREITIT) {
    const { alku, ikkuna } = reitti;
    if (alku === 0) continue;
    assert.ok(alku + ikkuna < 1, `reitti (${reitti.laji}, alku ${alku}): matka jatkuu kierron yli`);
    assert.ok(alku > JALJEN_PYYHKAISY,
      `reitti (${reitti.laji}, alku ${alku}): kierto osuu pyyhkäisyyn`);
  }
});

test('jäljen silmukka kelpaa SMILille ja osuu pätkäjaon askeleisiin', () => {
  for (const reitti of ALKUREITIT) {
    const jaksoja = 37;
    const k = kierraKehykset(jaljenKehykset(reitti.ikkuna, jaksoja), (1 - reitti.alku) % 1);
    assert.equal(k[0].t, 0);
    assert.equal(k[k.length - 1].t, 1);
    for (let i = 1; i < k.length; i++) {
      assert.ok(k[i].t > k[i - 1].t, `${reitti.laji}: keyTimes ei kasva kohdassa ${i}`);
    }
    for (const askel of k) {
      // Kuvio poimitaan taulukosta pyöristetyllä indeksillä: jos kierto
      // tuottaisi väliarvon, jälki hyppäisi pätkän verran väärään kohtaan.
      const osuma = askel.kulku * jaksoja;
      assert.ok(Math.abs(osuma - Math.round(osuma)) < 1e-9,
        `${reitti.laji}: piirretty osuus ${askel.kulku} ei osu pätkäjakoon`);
    }
  }
});

test('jäljen nollaus tapahtuu näkymättömissä', () => {
  // Kuvio palaa tyhjäksi kerran kierroksessa. Jos peittävyys ei ole
  // silloin nolla, koko reitti näyttäisi kelautuvan auki takaperin.
  for (const reitti of ALKUREITIT) {
    const k = kierraKehykset(jaljenKehykset(reitti.ikkuna, 21), (1 - reitti.alku) % 1);
    for (let i = 1; i < k.length; i++) {
      if (k[i].kulku >= k[i - 1].kulku - 1e-9) continue;
      assert.equal(k[i].nakyy, 0, `${reitti.laji}: nollaus näkyisi`);
      assert.equal(k[i - 1].nakyy, 0, `${reitti.laji}: nollaus näkyisi`);
    }
  }
});

test('jälki kasvaa katkoviivana eikä ole enää liukuva häntä', () => {
  // Vanha jälki oli lyhyt pätkäjono, jota siirrettiin dashoffsetilla
  // pisteen perässä ("kuin mato", omistaja 12.8.2026).
  assert.match(UI, /animoi\(jalki, 'stroke-dasharray'/,
    'jäljen kasvua ei tehdä katkoviivakuviolla');
  assert.ok(!/animoi\([^)]*'stroke-dashoffset'/.test(UI),
    'jälki liukuu yhä dashoffsetilla');
  // Nollan mittainen pätkä piirtyisi pyöreällä päällä pisteenä, jolloin
  // piirtämätön osa reittiä näkyisi pistejonona.
  assert.match(CSS, /\.alkureitti-jalki\s*\{[^}]*stroke-linecap:\s*butt/,
    'jäljen päät ovat pyöreät');
});

test('punainen piste välähtää kuin majakka: lyhyt leimahdus, pitkä lepo', () => {
  /*
   * Omistaja 12.8.2026: *"nopea kirkas välähdys ja sitten pitkä himmeä
   * vaihe (kuten majakka)"*. Tasainen sini-aalto oli juuri se, mitä ei
   * haluta, eikä sen paluu näkyisi virheenä — siksi verhokäyrän muoto
   * mitataan tässä lukuina.
   */
  const kesto = Number(UI.match(/const SYKE_KESTO = '([\d.]+)s'/)[1]);
  assert.ok(kesto >= 2 && kesto <= 3, `sykkeen jakso ${kesto}s ei ole 2–3 sekuntia`);
  const luvut = (nimi) => UI.match(new RegExp(`const ${nimi} = \\[([^\\]]*)\\]`))[1]
    .split(',').map((s) => Number(s.trim()));
  const hetket = luvut('SYKE_HETKET');
  const muoto = luvut('SYKE_MUOTO');
  assert.equal(hetket.length, muoto.length, 'keyTimes ja values eri mittaiset — SMIL hylkää');
  // SMILin hylkäysehdot: alkaa nollasta, päättyy ykköseen, kasvaa.
  assert.equal(hetket[0], 0);
  assert.equal(hetket[hetket.length - 1], 1);
  for (let i = 1; i < hetket.length; i++) {
    assert.ok(hetket[i] > hetket[i - 1], `keyTimes ei kasva kohdassa ${i}`);
  }
  // Leimahdus: huippuun päästään nopeasti ja takaisin lepoon pian.
  const huippu = muoto.indexOf(1);
  assert.ok(huippu > 0, 'verhokäyrä ei käy huipussa lainkaan');
  assert.equal(muoto[0], 0, 'jakso ei ala levosta');
  assert.equal(muoto[muoto.length - 1], 0, 'jakso ei pääty lepoon');
  const nousu = hetket[huippu] * kesto;
  assert.ok(nousu <= 0.15, `leimahdus nousee ${nousu.toFixed(2)}s — ei ole välähdys`);
  const lepoon = muoto.findIndex((arvo, i) => i > huippu && arvo === 0);
  assert.ok(lepoon > huippu, 'leimahdus ei palaa lepoon');
  const valahdys = hetket[lepoon] * kesto;
  assert.ok(valahdys > 0.15 && valahdys <= 0.45,
    `leimahdus kestää ${valahdys.toFixed(2)}s — tavoite on noin 0,3 s`);
  assert.ok(kesto - valahdys >= 1.5,
    `himmeä vaihe on vain ${(kesto - valahdys).toFixed(2)}s — majakan pimeä hetki on pitkä`);
  // Sini-aallon paluu näkyisi tässä: puolivälissä jaksoa ollaan levossa.
  const puolivali = hetket.findIndex((t) => t >= 0.5);
  assert.equal(muoto[puolivali], 0, 'jakson puolivälissä piste ei ole himmeä — muoto on aalto');
  // Muoto on kirjoitettava SMILille juuri näinä listoina: spline-
  // pehmennys tekisi verhokäyrästä taas aallon.
  const animaatio = UI.match(/for \(const \[maare, arvot\] of[\s\S]*?\}, ympyra\);/)[0];
  assert.ok(!/keySplines/.test(animaatio), 'syke käyttää yhä spline-pehmennystä');
  assert.match(animaatio, /calcMode: 'linear'/, 'sykkeen välistys ei ole lineaarinen');
  assert.match(animaatio, /keyTimes: SYKE_HETKET/, 'sykkeen avainhetket eivät tule taulukosta');

  const karjet = UI.match(/const KARJET = \[[\s\S]*?\];/)[0];
  const parit = [...karjet.matchAll(/\[([\d.]+), ([\d.]+)\]/g)]
    .map(([, a, b]) => [Number(a), Number(b)]);
  assert.equal(parit.length, 4, 'kärjillä ei ole sekä säteen että kirkkauden ääriarvoja');
  for (const [pieni, iso] of parit) {
    assert.ok(iso / pieni > 1.25, `syke ${pieni}…${iso} on liian vaimea nähtäväksi`);
  }
});

test('siniset pisteet eivät välky lainkaan', () => {
  // Omistaja 12.8.2026: laivat ovat tasaisen himmeitä pisteitä, jotka
  // vain liikkuvat. Syke lisätään vain isoisän reitille.
  assert.match(UI, /const valahtaa = reitti\.laji === 'isoisa';/,
    'sykettä ei rajata isoisän reittiin');
  assert.match(UI, /if \(!valahtaa\) continue;/,
    'laivan kärjelle luodaan yhä <animate> — piste välkkyisi');
});

test('punainen kulkee entistä hitaammin ja laivat sitä hitaammin', () => {
  /*
   * Omistaja 12.8.2026: *"punainen isoisän piste liikkuu hitaammin kuin
   * nyt, ja siniset laivat vielä hitaammin kuin punainen"*. Vauhti on
   * matkan pituus jaettuna matka-ajalla (kesto × ikkuna), joten
   * kummankin kentän muutos näkyisi tässä.
   */
  const vauhti = (r) => polunPituus(r.pisteet) / (r.kesto * r.ikkuna);
  const punaiset = ALKUREITIT.filter((r) => r.laji === 'isoisa');
  const laivat = ALKUREITIT.filter((r) => r.laji === 'kauppa');
  for (const r of punaiset) {
    // Ennen hienosäätöä silmukka oli 26 s ja nopein osa 60 yks/s.
    assert.ok(r.kesto >= 36, `punaisen silmukka ${r.kesto}s on entistä lyhyempi`);
    assert.ok(vauhti(r) < 45, `punainen kulkee ${vauhti(r).toFixed(1)} yks/s — yhä kiitolaukkaa`);
  }
  const hitainPunainen = Math.min(...punaiset.map(vauhti));
  for (const r of laivat) {
    assert.ok(r.kesto >= 50 && r.kesto <= 70,
      `laivan silmukka ${r.kesto}s ei ole 50–70 sekuntia`);
    assert.ok(vauhti(r) < hitainPunainen,
      `laiva kulkee ${vauhti(r).toFixed(1)} yks/s eli vähintään yhtä nopeasti kuin punainen`);
  }
});

test('laivoja on useampi, ne lähtevät porrastetusti ja ovat isoisää himmeämpiä', () => {
  const laivat = ALKUREITIT.filter((r) => r.laji === 'kauppa');
  assert.ok(laivat.length >= 3, `sinisiä merireittejä on vain ${laivat.length}`);
  const lahdot = laivat.map((r) => r.alku * r.kesto).sort((a, b) => a - b);
  for (let i = 1; i < lahdot.length; i++) {
    const vali = lahdot[i] - lahdot[i - 1];
    assert.ok(vali > 1.5, `laivat lähtevät ${vali.toFixed(1)} s välein — käytännössä yhtä aikaa`);
  }
  const kirkkaus = UI.match(/const LAJIN_KIRKKAUS = \{ isoisa: ([\d.]+), kauppa: ([\d.]+) \}/);
  assert.ok(Number(kirkkaus[2]) < Number(kirkkaus[1]),
    'siniset eivät ole punaista himmeämpiä');
});

test('liikkeen vähennys näyttää reitit, ei tyhjää', () => {
  // Ennen koko kerros jätettiin rakentamatta ja CSS piilotti sen: kartta
  // oli asetuksen kanssa tyhjä. Nyt pohjaviiva jää näkyviin.
  assert.ok(!/prefers-reduced-motion[\s\S]{0,400}\.alkureitit\s*\{\s*display:\s*none/.test(CSS),
    'liikkeen vähennys piilottaa yhä koko kerroksen');
  assert.match(UI, /if \(this\.reducedMotion\) continue;/,
    'pohjaviiva ei piirry liikkeen vähennyksessä');
});

test('etusivun taustaääni on kuultavalla tasolla', () => {
  /*
   * Efektiivinen taso on VOIMA × äänitteen oma kerroin × etusivun
   * kerroin. Se oli 0,042 eikä kuulunut läppärin kaiuttimista lainkaan
   * (omistaja 12.8.2026). Alaraja vartioi juuri sitä; yläraja pitää
   * huolen, ettei etusivu ala huutaa.
   */
  const perus = Number(VIRTA.match(/const VOIMA = ([\d.]+)/)[1]);
  const etusivu = Number(VIRTA.match(/const ETUSIVUN_VOIMA = ([\d.]+)/)[1]);
  // Etusivun ääni on lentoasemakorin ensimmäinen (VAKIOPAIKAT: ei arvontaa).
  const kori = EHDOKKAAT.match(/lentoasema: \[\s*\{ url: '([^']+)'/);
  const { voima } = jaaAlku(kori[1]);
  const taso = perus * voima * etusivu;
  assert.ok(taso > 0.09 && taso < 0.2, `etusivun efektiivinen taso ${taso.toFixed(3)} ei ole kuultavalla alueella`);
});

test('automaattitoiston uudelleenyritys on eleen kutsupinossa', () => {
  /*
   * Safari myöntää soittoluvan vain kutsulle, joka on suoraan eleen
   * kutsupinossa. Kuuntelija on lisäksi kaappausvaiheessa, koska kartan
   * oma napautuszoomaus pysäyttää tapahtuman ennen kuplintaa.
   */
  const kohta = VIRTA.slice(VIRTA.indexOf('const ele = () => {'));
  // Kommentit pois: ne puhuvat awaitista ja setTimeoutista nimeltä.
  const runko = kohta.slice(0, kohta.indexOf('\n    };')).replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  assert.ok(!/await|\.then\(|setTimeout\(/.test(runko),
    'eleen käsittelijässä on asynkroniaa ennen soittoa — Safari hylkää play():n');
  assert.match(runko, /\bsoi\(\);/, 'ele ei yritä soittoa uudelleen');
  assert.match(VIRTA, /document\.addEventListener\(laji, ele, \{ passive: true, capture: true \}\)/,
    'elettä kuunnellaan kuplinnassa — kartan napautus voi syödä sen');
});
