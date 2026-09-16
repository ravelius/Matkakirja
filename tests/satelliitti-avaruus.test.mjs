/*
 * SATELLIITTILINSSIN AVARUUSNÄKYMÄ (js/linssit/satelliitti-avaruus.js).
 *
 * OMISTAJA 12.9.2026, sanatarkasti: *"Linssi voisi alkaa niin, että
 * maapallon reunat näkyvät ja taustalla on tähtiä. Maapallonhan ei
 * tarvitse olla kovin tarkka. Eli zoomaustasoja ei tarvitse olla
 * juurikaan."*
 *
 * Mitä tässä vartioidaan:
 *
 *   1. AVAUSNÄKYMÄ: koko pallo mahtuu ruutuun KOLMELLA mitatulla
 *      näytöllä — myös puhelimen pystyruudulla, jossa rajaa LEVEYS
 *      vaikka Globe.gl:n fov on pystykulma. Tämä on se laskuvirhe,
 *      josta koko vika syntyi.
 *   2. LAUDAN KATTO EI RIITÄ: avauskorkeus ylittää PALLO_KORKEUS_MAXin
 *      puhelimella, joten zoomirajojen syrjäytys laudassa on pakko —
 *      jos joku poistaa sen, tämä testi kertoo miksi se oli.
 *   3. KAPEA ZOOM: lähinkään raja ei päästä pintaan eikä kauinkaan
 *      pudota palloa ruudulta.
 *   4. MAAN VÄRIT: meri sininen, maa vihreä, aavikkovyöhyke keltainen,
 *      navat jäässä, ei läpinäkyviä pikseleitä — ja valon vastakaava
 *      poltettuna sisään, jottei napa pala puhki.
 *   5. PURKU: avaruusnäkymän sulkeminen kirjoittaa pallon lähtötilan
 *      takaisin TÄSMÄLLEEN (tekstuuri, laattamoottori, ilmakehä,
 *      tausta, kamera, zoomirajat, kiilto) — muun pelin pallo ei saa
 *      muuttua. Tässä se mitataan valepallolla; selaimessa sama on
 *      savukkeessa savuke-satelliitti-avaruus.mjs.
 *
 * Selaimen puoli (pallo oikeasti ruudulla, tähdet näkyvissä,
 * paperikartta poissa) on savukkeessa — tämä testi ei näe pikseleitä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ASETTUMISEN_IKKUNA_MS, AVAUKSEN_MARGINAALI, AVARUUDEN_FOV, AVARUUDEN_TAUSTA,
  ILMAKEHAN_KORKEUS, ILMAKEHAN_VARI, JAAVYOHYKE, NIMIEN_KYNNYS,
  NIMIEN_KYNNYS_POIS, NIMIEN_LUOKKA, VALON_KOMPENSAATIO,
  ZOOMIN_KAUIN, ZOOMIN_LAHIN, ZOOMIN_POHJA, reliefinAlfa, valokerroin, liuunPysakit,
  avaaAvaruusnakyma, avausKorkeus, halkaisijaRuudulla, maapallonVarit, nimetNakyvat,
  pilvipaino, vyohykeVari, zoomirajat,
  JAAN_VARI, RELIEFI_KOKO_PALLO, RELIEFIN_KOKO_8K, RELIEFIN_KOKO_4K, RELIEFIN_LEVEYS,
  RELIEFIN_KORKEUS, RELIEFIN_OSOITE, valitseReliefi,
} from '../js/linssit/satelliitti-avaruus.js';
import {
  JAAN_VARI as JAAN_VARI_TYOKALU, JAA, jaapaino,
} from '../tools/reliefivarit.mjs';
import { PULUN_PIILO_LUOKKA, piilotaPulu } from '../js/linssit/satelliitti.js';
import { PALLO_FOV, PALLO_KORKEUS_MAX } from '../js/pallolauta/kamera.js';

/** Omistajan kolme mitattua ruutua (kotelon mitat linssi auki). */
const RUUDUT = {
  puhelin: { leveys: 374, korkeus: 828 },
  ipad: { leveys: 813, korkeus: 1173 },
  tyopoyta: { leveys: 1259, korkeus: 779 },
};

/* ───────────────────────── 1. avausnäkymä ───────────────────────── */

test('avauskulma on sama kuin laudan kamera käyttää', () => {
  assert.equal(AVARUUDEN_FOV, PALLO_FOV);
});

test('koko pallo mahtuu ruutuun kaikilla kolmella näytöllä', () => {
  for (const [nimi, mitat] of Object.entries(RUUDUT)) {
    const alt = avausKorkeus(mitat);
    const halkaisija = halkaisijaRuudulla(alt, { korkeus: mitat.korkeus });
    assert.ok(halkaisija <= mitat.leveys, `${nimi}: pallo ei mahtunut leveyteen`);
    assert.ok(halkaisija <= mitat.korkeus, `${nimi}: pallo ei mahtunut korkeuteen`);
    // Reunan rako on se, mistä pallon REUNAN näkee: marginaali toteutuu
    // yhden pikselin tarkkuudella ruudun kapeammalla sivulla.
    const kapein = Math.min(mitat.leveys, mitat.korkeus);
    assert.ok(Math.abs(halkaisija - kapein * (1 - AVAUKSEN_MARGINAALI)) < 1.5,
      `${nimi}: rako ei ole pyydetty (${halkaisija.toFixed(1)} / ${kapein})`);
  }
});

test('pystyruutu vaatii kauemmas kuin vaakaruutu — leveys ratkaisee', () => {
  // Juuri tämä meni ennen väärin: fov on pystykulma, joten pelkkä
  // korkeuden katsominen antaisi puhelimelle saman luvun kuin
  // työpöydälle, ja pallon reunat jäisivät ruudun ulkopuolelle.
  assert.ok(avausKorkeus(RUUDUT.puhelin) > avausKorkeus(RUUDUT.ipad));
  assert.ok(avausKorkeus(RUUDUT.ipad) > avausKorkeus(RUUDUT.tyopoyta));
});

test('rikkinäiset mitat eivät kaada avausta', () => {
  for (const mitat of [undefined, {}, { leveys: 0, korkeus: 0 }, { leveys: NaN, korkeus: 10 }]) {
    const alt = avausKorkeus(mitat);
    assert.ok(Number.isFinite(alt) && alt > 0);
  }
});

/* ───────────────── 2. laudan katto ei riitä ─────────────────────── */

test('puhelimen avauskorkeus ylittää laudan oman katon', () => {
  // Siksi js/pallolauta/lauta.js:ssä on zoomirajojen syrjäytys. Ilman
  // sitä OrbitControls vetäisi kameran takaisin korkeuteen 2,5 eikä
  // pallo mahtuisi ruudulle.
  assert.ok(avausKorkeus(RUUDUT.puhelin) > PALLO_KORKEUS_MAX);
});

test('lauta tarjoaa zoomirajojen syrjäytyksen', () => {
  const lahde = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lahde, /zoomirajat:\s*\(rajat\)/);
  assert.match(lahde, /zoomirajaSyrjaytys/);
});

/* ───────────────────────── 3. kapea zoom ────────────────────────── */

test('zoomiraja ei päästä pintaan eikä kadota palloa', () => {
  for (const [nimi, mitat] of Object.entries(RUUDUT)) {
    const alt = avausKorkeus(mitat);
    const { min, max } = zoomirajat(alt);
    assert.ok(min < alt && max > alt, `${nimi}: avaus ei ole rajojen sisällä`);
    /*
     * Pintaan ei sukelleta. Raja laski 0,55 × avauksesta 0,12 ×
     * avaukseen (omistaja 12.9.2026: yksi zoom-taso lisää), ja pohjaksi
     * jäi ABSOLUUTTINEN ZOOMIN_POHJA 0,1 — noin 640 km, matalan radan
     * korkeus. Laudan oma lähin on 0,02–0,07, eli yhä selvästi alempana.
     */
    assert.ok(min >= ZOOMIN_POHJA, `${nimi}: lähin raja alitti pohjan (${min})`);
    assert.ok(min < alt * 0.5, `${nimi}: lähin raja ei tuonut lisätasoa (${min} / ${alt})`);
    // Pallo ei katoa: kauimmillaankin se on yli kolmanneksen ruudusta.
    const pienin = halkaisijaRuudulla(max, { korkeus: mitat.korkeus });
    assert.ok(pienin > Math.min(mitat.leveys, mitat.korkeus) * 0.33,
      `${nimi}: pallo kutistui liikaa (${pienin.toFixed(0)} px)`);
  }
});

test('zoomikaistassa on yksi taso lisää mutta se on yhä pelin omaa kapeampi', () => {
  // Yksi taso lisää (omistaja 12.9.2026): lähin raja on selvästi
  // entisen 0,55:n alapuolella, mutta ei nollassa.
  assert.ok(ZOOMIN_LAHIN > 0.05 && ZOOMIN_LAHIN < 0.3);
  assert.ok(ZOOMIN_KAUIN > 1 && ZOOMIN_KAUIN < 1.6);
  /*
   * Kaista on noin kymmenkertainen. Laudan oma on yli satakertainen
   * (0,02…2,5), joten linssi on yhä murto-osa pelin skaalasta — mutta
   * nyt vierekkäiset kohteet erottuvat: puhelimella Etna ja Italian
   * saapas olivat 11 px päässä ja ovat nyt 102 px (mitattu 12.9.2026).
   */
  assert.ok(ZOOMIN_KAUIN / ZOOMIN_LAHIN > 5 && ZOOMIN_KAUIN / ZOOMIN_LAHIN < 15);
  // Pohja ei saa olla kaistan yläpuolella.
  assert.ok(ZOOMIN_POHJA > 0 && ZOOMIN_POHJA < 0.5);
});

test('lähin raja ei koskaan alita pohjaa eikä ylitä katsoa', () => {
  for (const alt of [0.05, 0.3, 1, 1.63, 4.49, 12]) {
    const { min, max } = zoomirajat(alt);
    assert.ok(min >= Math.min(ZOOMIN_POHJA, max * 0.95) - 1e-9, `min ${min} alle pohjan (alt ${alt})`);
    assert.ok(min < max, `kaista kääntyi nurin (alt ${alt})`);
  }
});

/* ───────────────────────── 4. maan värit ────────────────────────── */

test('vyöhykeväri: aavikko keltaisempi kuin sademetsä', () => {
  const paivantasaaja = vyohykeVari(0);
  const aavikko = vyohykeVari(25);
  assert.ok(aavikko[0] > paivantasaaja[0], 'aavikossa pitää olla enemmän punaista');
  assert.ok(paivantasaaja[1] > paivantasaaja[0], 'sademetsä on vihreä');
  // Sama pohjoisessa ja etelässä: vyöhyke luetaan itseisarvosta.
  assert.deepEqual(vyohykeVari(-25), vyohykeVari(25));
});

test('pilvipaino on suurin päiväntasaajalla ja pienin aavikkovyöhykkeellä', () => {
  assert.ok(pilvipaino(0) > pilvipaino(25));
  assert.ok(pilvipaino(55) > pilvipaino(25));
  for (const lat of [-90, -45, 0, 45, 90]) {
    assert.ok(pilvipaino(lat) >= 0 && pilvipaino(lat) <= 1);
  }
});

test('maapallon tekstuuri: meri sininen, maa vihreä, navat jäässä', () => {
  const { leveys, korkeus, data } = maapallonVarit({ leveys: 360, korkeus: 180 });
  assert.equal(data.length, leveys * korkeus * 4);
  const nayte = (lat, lon) => {
    const x = Math.min(leveys - 1, Math.floor(((lon + 180) / 360) * leveys));
    const y = Math.min(korkeus - 1, Math.floor(((90 - lat) / 180) * korkeus));
    const i = (y * leveys + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  // Tyyni valtameri (0° N, 150° W): sininen.
  const meri = nayte(0, -150);
  assert.ok(meri[2] > meri[0] + 20, `meri ei ole sininen: ${meri}`);
  // Kongon allas (0° N, 22° E): vihreä.
  const maa = nayte(0, 22);
  assert.ok(maa[1] > maa[2], `maa ei ole vihreä: ${maa}`);
  // Etelänapa: jäätä eli vaalea ja väritön.
  const napa = nayte(-85, 0);
  assert.ok(napa[0] > 170 && Math.abs(napa[0] - napa[2]) < 30, `etelänapa ei ole jäässä: ${napa}`);
  // Ei läpinäkyviä pikseleitä: tekstuuri on pallon pinta, ei kalvo.
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] !== 255) assert.fail(`läpinäkyvä pikseli kohdassa ${i}`);
  }
});

test('valon vastakaava on poltettu tekstuuriin — napa ei pala puhki', () => {
  const { leveys, data } = maapallonVarit({ leveys: 360, korkeus: 180 });
  const nayte = (lat, lon) => {
    const x = Math.floor(((lon + 180) / 360) * leveys);
    const y = Math.floor(((90 - lat) / 180) * 180);
    return data[(y * leveys + x) * 4];
  };
  const pohjoinen = nayte(88, 0);
  const etela = nayte(-88, 0);
  // Valo tulee pohjoisnavan yläpuolelta, joten pohjoisnavan pikseli on
  // tekstuurissa noin (1 + 0,6) kertaa tummempi kuin etelänavan.
  assert.ok(pohjoinen < etela, 'pohjoisnapaa ei ole kompensoitu');
  const suhde = etela / pohjoinen;
  assert.ok(Math.abs(suhde - (1 + VALON_KOMPENSAATIO)) < 0.12,
    `kompensaatio ei vastaa valoa (suhde ${suhde.toFixed(2)})`);
  // Ja ruudulla se palautuu: kerrottuna valolla napa on lähellä jäätä
  // mutta ei yli 255:n.
  assert.ok(pohjoinen * (1 + VALON_KOMPENSAATIO) <= 255);
});

test('jäävyöhyke alkaa vasta napapiirin pohjoispuolelta', () => {
  assert.ok(JAAVYOHYKE[0] >= 60 && JAAVYOHYKE[1] <= 85);
  assert.ok(JAAVYOHYKE[1] > JAAVYOHYKE[0]);
});

/* ──────────────── 5. nimet vasta läheltä ────────────────────────── */

test('AVAUSNÄKYMÄSSÄ EI OLE NIMIÄ — vartio omistajan linjaukselle', () => {
  // Omistaja 12.9.2026: *"Kaikissa pisteissä ei tarvitse nimeä näkyä
  // kuin vasta lähemmäs zoomattuna."* Jos tämä kaatuu, nimet ovat
  // palanneet avauskorkeudelle.
  for (const mitat of Object.values(RUUDUT)) {
    const avaus = avausKorkeus(mitat);
    assert.equal(nimetNakyvat(avaus, avaus, false), false, 'nimet näkyivät avauskorkeudella');
    // Myös silloin kun ne olivat juuri näkyvissä: ylös zoomatessa ne sammuvat.
    assert.equal(nimetNakyvat(avaus, avaus, true), false, 'nimet jäivät päälle avauskorkeudelle');
    // Ja kauimmalla sallitulla korkeudella sitäkin varmemmin.
    const { max } = zoomirajat(avaus);
    assert.equal(nimetNakyvat(max, avaus, true), false);
  }
});

test('nimet syttyvät lähikuvassa ja kynnys on suhde, ei astelukua', () => {
  for (const mitat of Object.values(RUUDUT)) {
    const avaus = avausKorkeus(mitat);
    const { min } = zoomirajat(avaus);
    // Lähimmällä sallitulla korkeudella nimet ovat päällä joka ruudulla.
    assert.equal(nimetNakyvat(min, avaus, false), true, 'nimet eivät syttyneet lähikuvassa');
    assert.equal(nimetNakyvat(avaus * NIMIEN_KYNNYS, avaus, false), true);
  }
  // Kynnys on zoomikaistan sisällä ja sen puolivälin alapuolella:
  // nimen näkeminen vaatii oikeasti zoomaamista.
  assert.ok(NIMIEN_KYNNYS > ZOOMIN_LAHIN && NIMIEN_KYNNYS < 1);
  assert.ok(NIMIEN_KYNNYS < (ZOOMIN_LAHIN + ZOOMIN_KAUIN) / 2);
});

test('hystereesi pitää siirtymän vakaana eikä värähtele', () => {
  assert.ok(NIMIEN_KYNNYS_POIS > NIMIEN_KYNNYS, 'sammutuskynnys on syttymiskynnyksen yläpuolella');
  const avaus = 4.487;
  // Kynnysten VÄLISSÄ tila säilyy — kumpaan suuntaan tahansa.
  const vali = avaus * (NIMIEN_KYNNYS + NIMIEN_KYNNYS_POIS) / 2;
  assert.equal(nimetNakyvat(vali, avaus, true), true);
  assert.equal(nimetNakyvat(vali, avaus, false), false);
  /*
   * VÄRÄHTELYTESTI: kamera nytkähtelee kynnyksen ympärillä pikselin
   * verran. Ilman hystereesiä tila vaihtuisi joka askeleella; nyt se
   * ei vaihdu kertaakaan.
   */
  let tila = false;
  let vaihtoja = 0;
  for (let i = 0; i < 200; i += 1) {
    const korkeus = avaus * NIMIEN_KYNNYS_POIS - 0.0005 + (i % 2) * 0.001;
    const uusi = nimetNakyvat(korkeus, avaus, tila);
    if (uusi !== tila) vaihtoja += 1;
    tila = uusi;
  }
  assert.equal(vaihtoja, 0, `nimet värähtelivät ${vaihtoja} kertaa kynnyksellä`);
});

test('rikkinäinen korkeus ei sytytä eikä sammuta nimiä', () => {
  assert.equal(nimetNakyvat(NaN, 4, true), true);
  assert.equal(nimetNakyvat(1, 0, false), false);
  assert.equal(nimetNakyvat(undefined, 4, false), false);
});

test('nimet on häivytetty CSS:ssä eikä piilotettu asettelusta', () => {
  const css = readFileSync(new URL('../css/satelliitti.css', import.meta.url), 'utf8');
  /*
   * OLETUS ON PIILOSSA ILMAN EHTOA (12.9.2026). Sääntö oli aiemmin
   * `body.satelliitti-avaruus`-luokan takana, ja kun avaruusnäkymä ei
   * syntynyt (pallo ei valmis → avaaAvaruusnakyma palaa nullina),
   * nimillä ei ollut yhtään piilottavaa sääntöä. Vartio vaatii nyt
   * ehdottoman oletuksen: vika kaatuu piiloon eikä ruudulle.
   */
  assert.match(css, /\n\.satelliitti-nimi \{\n  opacity: 0;/);
  assert.ok(!/body\.satelliitti-avaruus \.satelliitti-nimi \{[^}]*opacity: 0;/.test(css),
    'piilotus on yhä avaruusluokan takana');
  assert.match(css, new RegExp(`body\\.${NIMIEN_LUOKKA} \\.satelliitti-nimi \\{ opacity: 1; \\}`));
  // Häivytys, ei välähdys — ja liikkeenvähennyksellä ei siirtymää.
  assert.match(css, /transition: opacity 220ms ease;/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*?\.satelliitti-nimi \{ transition: none; \}/);
  // Piste itse ei saa kadota: vain nimi.
  assert.ok(!/satelliitti-(hehku|rengas|ydin)[^}]*opacity: 0/.test(css));
});

/* ──────────────── 6. pulu piilossa linssin ajan ─────────────────── */

test('pulun piiloluokka on SAMA kuin Ihmisen matka -linssillä', () => {
  const esitys = readFileSync(new URL('../js/linssit/ihmisen-matka-esitys.js', import.meta.url), 'utf8');
  assert.match(esitys, new RegExp(`PULUN_PIILO_LUOKKA = '${PULUN_PIILO_LUOKKA}'`),
    'satelliittilinssin kopio ja alkuperä erkanivat');
  // Ja sääntö on kopioitu satelliitin omaan tyyliin, koska
  // css/aikajana.css ei ole ladattu.
  const css = readFileSync(new URL('../css/satelliitti.css', import.meta.url), 'utf8');
  for (const valitsin of ['.pollo-nappi', '.pollo-paneeli', '.livia-kasvot-pinta']) {
    assert.ok(css.includes(`body.${PULUN_PIILO_LUOKKA} ${valitsin}`), `${valitsin} puuttuu`);
  }
  assert.match(css, new RegExp(`body\\.${PULUN_PIILO_LUOKKA} \\.livia-kasvot-pinta \\{\\s*visibility: hidden;`));
});

test('pulu piiloutuu linssin ajaksi ja palaa täsmälleen', () => {
  const luokat = new Set();
  const doc = { body: { classList: {
    add: (n) => luokat.add(n),
    remove: (n) => luokat.delete(n),
    contains: (n) => luokat.has(n),
  } } };
  const kahva = piilotaPulu(doc);
  assert.ok(luokat.has(PULUN_PIILO_LUOKKA), 'pulua ei piilotettu');
  assert.equal(kahva.piilossa(), true);
  kahva.pura();
  assert.ok(!luokat.has(PULUN_PIILO_LUOKKA), 'pulu jäi piiloon');
  assert.equal(kahva.piilossa(), false);
  // Toinen purku ei tee mitään.
  kahva.pura();
  assert.ok(!luokat.has(PULUN_PIILO_LUOKKA));
});

test('toisen linssin piilottamaa pulua ei paljasteta sulkiessa', () => {
  const luokat = new Set([PULUN_PIILO_LUOKKA]);
  const doc = { body: { classList: {
    add: (n) => luokat.add(n),
    remove: (n) => luokat.delete(n),
    contains: (n) => luokat.has(n),
  } } };
  const kahva = piilotaPulu(doc);
  kahva.pura();
  assert.ok(luokat.has(PULUN_PIILO_LUOKKA), 'toisen linssin piilotus purkautui');
});

test('satelliittilinssi piilottaa pulun ja palauttaa sen', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti.js', import.meta.url), 'utf8');
  // Talon oma mekanismi, ei uutta: jono, kuplat ja piiloluokka.
  assert.match(lahde, /polloLinssiAlkoi, polloLinssiPaattyi/);
  assert.match(lahde, /const pulu = piilotaPulu\(\);/);
  assert.match(lahde, /pulu\.pura\(\);/);
});

/* ───────────────────────── 7. purku ─────────────────────────────── */

/** Valepallo: vain ne kutsut, joita avaruusnäkymä käyttää. */
function valepallo() {
  const tila = {
    pov: { lat: 38.4, lng: 23.9, altitude: 0.37 },
    tausta: 'rgba(0,0,0,0)',
    ilmaVari: '#d9a13b',
    ilmaKorkeus: 0.18,
    laatta: () => 'laatta-url',
    kuva: null,
    ajot: [],
  };
  const materiaali = {
    type: 'MeshPhongMaterial',
    shininess: 30,
    specular: { hex: 0x111111, getHex() { return this.hex; }, setHex(h) { this.hex = h; } },
    needsUpdate: false,
  };
  const kuuntelijat = [];
  const ohjaimet = {
    autoRotate: false,
    autoRotateSpeed: 2,
    addEventListener: (n, f) => kuuntelijat.push([n, f]),
    removeEventListener: (n, f) => {
      const i = kuuntelijat.findIndex(([a, b]) => a === n && b === f);
      if (i >= 0) kuuntelijat.splice(i, 1);
    },
  };
  const pallo = {
    tila,
    materiaali,
    pyyhkaisyja: 0,
    pointOfView(uusi, kesto) {
      if (uusi === undefined) return { ...tila.pov };
      tila.pov = { ...tila.pov, ...uusi };
      tila.ajot.push(kesto);
      return pallo;
    },
    backgroundColor(v) { if (v === undefined) return tila.tausta; tila.tausta = v; return pallo; },
    atmosphereColor(v) { if (v === undefined) return tila.ilmaVari; tila.ilmaVari = v; return pallo; },
    atmosphereAltitude(v) { if (v === undefined) return tila.ilmaKorkeus; tila.ilmaKorkeus = v; return pallo; },
    globeTileEngineUrl(v) { if (v === undefined) return tila.laatta; tila.laatta = v; return pallo; },
    globeImageUrl(v) { if (v === undefined) return tila.kuva; tila.kuva = v; return pallo; },
    globeMaterial: () => materiaali,
    // Näyttämön läpikäynti lasketaan: pyyhkäisyn on ajettava avatessa.
    scene: () => { pallo.pyyhkaisyja += 1; return { traverse() {} }; },
    // YKSI JA SAMA OHJAINOLIO kuten kirjastossa: linssi ottaa
    // pyörimisen lähtöarvon talteen ja kirjoittaa sen purkaessa
    // takaisin, eikä se onnistuisi, jos jokainen kutsu antaisi uuden.
    ohjaimet,
    controls: () => ohjaimet,
    // Tähtitaivas jää pois ilman kirjaston hiukkaskerrosta (luoTahtitaivas
    // palauttaa null) — juuri niin kuin selaimessa vanhalla kirjastolla.
    kuuntelijat,
  };
  return pallo;
}

/** Valelauta: kotelo, zoomirajat ja herätys. */
function valelauta(pallo) {
  const rajat = [];
  return {
    pallo,
    kotelo: { clientWidth: 374, clientHeight: 828 },
    rajat,
    zoomirajat: (r) => rajat.push(r),
    heraa: () => {},
    kamera: { pysaytaKameraAjo: () => {} },
    lepokerros: () => null,
  };
}

/**
 * Kevyt ikkuna: ajastimet, luokkalista ja NIUKKA KANGAS. Kangas on
 * mukana, jotta tekstuuripolku oikeasti ajetaan — muuten `maapallonVarit`
 * jäisi kutsumatta ja koko purkuväite (laattamoottori takaisin,
 * pohjapallon kuva takaisin) menisi läpi tyhjänä.
 */
function valeikkuna() {
  const luokat = new Set();
  if (!globalThis.ImageData) {
    globalThis.ImageData = class { constructor(data, w, h) { this.data = data; this.width = w; this.height = h; } };
  }
  const kangas = () => ({
    width: 0,
    height: 0,
    getContext: () => ({ putImageData: () => {} }),
    toDataURL: () => 'data:image/png;base64,MAA',
  });
  return {
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
    luokat,
    document: {
      createElement: (nimi) => (nimi === 'canvas' ? kangas() : {}),
      body: {
        classList: {
          add: (n) => luokat.add(n),
          remove: (n) => luokat.delete(n),
          contains: (n) => luokat.has(n),
          toggle: (n, paalla) => (paalla ? luokat.add(n) : luokat.delete(n)),
        },
      },
    },
  };
}

test('avaruusnäkymä asettuu ja purkautuu täsmälleen ennalleen', () => {
  const pallo = valepallo();
  const lauta = valelauta(pallo);
  const ikkuna = valeikkuna();
  const ennen = {
    pov: { ...pallo.tila.pov },
    tausta: pallo.tila.tausta,
    ilmaVari: pallo.tila.ilmaVari,
    ilmaKorkeus: pallo.tila.ilmaKorkeus,
    laatta: pallo.tila.laatta,
    kuva: pallo.tila.kuva,
    shininess: pallo.materiaali.shininess,
    specular: pallo.materiaali.specular.getHex(),
  };

  const nakyma = avaaAvaruusnakyma(lauta, { ui: { reducedMotion: true }, ikkuna });
  assert.ok(nakyma, 'näkymä ei syntynyt');

  // Auki: avaruuden tausta, sininen ilmakehä, kamera ylhäällä, kapea zoom.
  assert.equal(pallo.tila.tausta, AVARUUDEN_TAUSTA);
  assert.equal(pallo.tila.ilmaVari, ILMAKEHAN_VARI);
  assert.equal(pallo.tila.ilmaKorkeus, ILMAKEHAN_KORKEUS);
  assert.ok(pallo.tila.pov.altitude > PALLO_KORKEUS_MAX, 'kamera ei noussut');
  assert.equal(pallo.materiaali.shininess, 0, 'kiilto jäi päälle');
  assert.equal(pallo.materiaali.specular.getHex(), 0, 'heijastus jäi päälle');
  /*
   * ZOOMIRAJAT KIRJOITETAAN KAHDESTI: ensin avausajon nostettu katto
   * (kamera aloittaa leponäkymää ylempää), sitten leponäkymän oma
   * kaista, kun ajo on perillä. Liikkeenvähennyksellä ajo on perillä
   * heti, joten molemmat tulevat samassa avauksessa.
   */
  assert.equal(lauta.rajat.length, 2, JSON.stringify(lauta.rajat));
  assert.ok(lauta.rajat[0].max > lauta.rajat[1].max,
    'avausajon katto ei ollut leponäkymää korkeammalla');
  assert.ok(lauta.rajat[1].min > 0.5 && lauta.rajat[1].max > lauta.rajat[1].min);
  assert.ok(ikkuna.luokat.has('satelliitti-avaruus'), 'ruumiin luokka puuttuu');
  assert.ok(!ikkuna.luokat.has(NIMIEN_LUOKKA), 'nimet olivat päällä heti avattaessa');
  // Pinta vaihtui oikeasti: laattamoottori kiinni, pohjapallolla oma kuva.
  assert.equal(pallo.tila.laatta, null, 'laattamoottori jäi päälle');
  assert.match(String(pallo.tila.kuva), /^data:image\/png/, 'generoitu Maa ei tullut pinnalle');
  assert.ok(nakyma.tila().tekstuuri, 'tekstuuria ei tehty');
  assert.equal(pallo.pyyhkaisyja > 0, true, 'karttapintoja ei pyyhitty');
  // Liikkeenvähennys: avaus on hyppy eikä ajo.
  assert.ok(pallo.tila.ajot.every((k) => k === 0));
  const tila = nakyma.tila();
  assert.ok(tila.avauskorkeus > PALLO_KORKEUS_MAX);
  assert.ok(tila.halkaisijaPx > 0 && tila.halkaisijaPx <= lauta.kotelo.clientWidth);

  nakyma.pura();

  assert.deepEqual(pallo.tila.pov, ennen.pov, 'kamera ei palannut');
  assert.equal(pallo.tila.tausta, ennen.tausta);
  assert.equal(pallo.tila.ilmaVari, ennen.ilmaVari);
  assert.equal(pallo.tila.ilmaKorkeus, ennen.ilmaKorkeus);
  assert.equal(pallo.tila.laatta, ennen.laatta, 'laattamoottori ei palannut');
  assert.equal(pallo.tila.kuva, ennen.kuva, 'pohjapallon kuva ei palannut');
  assert.equal(pallo.materiaali.shininess, ennen.shininess);
  assert.equal(pallo.materiaali.specular.getHex(), ennen.specular);
  assert.deepEqual(lauta.rajat.at(-1), null, 'zoomirajat jäivät syrjäytetyiksi');
  assert.ok(!ikkuna.luokat.has('satelliitti-avaruus'), 'ruumiin luokka jäi');
  assert.ok(!ikkuna.luokat.has(NIMIEN_LUOKKA), 'nimiluokka jäi');
});

test('avaruusnäkymä ei synny ilman palloa', () => {
  assert.equal(avaaAvaruusnakyma(null, {}), null);
  assert.equal(avaaAvaruusnakyma({ pallo: {} }, {}), null);
});

test('asettumisen ikkuna on lyhyt mutta riittää palkin vaihtumiseen', () => {
  assert.ok(ASETTUMISEN_IKKUNA_MS >= 1200 && ASETTUMISEN_IKKUNA_MS <= 4000);
});

/* ───────────────── linssi käyttää näkymää ───────────────────────── */

test('satelliittilinssi avaa ja purkaa avaruusnäkymän', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti.js', import.meta.url), 'utf8');
  assert.match(lahde, /import \{ avaaAvaruusnakyma \} from '\.\/satelliitti-avaruus\.js'/);
  assert.match(lahde, /const avaruus = avaaAvaruusnakyma\(lauta, \{ ui \}\)/);
  assert.match(lahde, /avaruus\?\.pura\?\.\(\)/);
});

test('avaruusnäkymä on huoltokartalla (sw.js)', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/linssit/satelliitti-avaruus.js'"));
});

/* ══════ 10. pelin oma reliefi pallon pinnaksi (omistaja 12.9.2026) ══ */

/*
 * Sanatarkasti: *"Katsoitko topografia linssistä, joka on jo aiemmin
 * luotu peliin? Se varmaan sopisi aika hyvin kartan pohjan
 * rakentamiseksi pallolle."*
 */

test('reliefi tulee pelin omasta kuvasta eikä uudesta aineistosta', async () => {
  const { RELIEFIN_OSOITE } = await import('../js/linssit/satelliitti-avaruus.js');
  const { TOPOGRAFIA_PALLOKUVA } = await import('../js/packs/linssi-topografia-kuva.js');
  assert.equal(RELIEFIN_OSOITE, TOPOGRAFIA_PALLOKUVA,
    'linssi osoittaa eri kuvaan kuin topografia- ja vesistölinssit');
  // Lisenssiviite säilyy siinä missä se on: paketin omassa otsikossa.
  const pakkaus = readFileSync(new URL('../js/packs/linssi-topografia-kuva.js', import.meta.url), 'utf8');
  assert.match(pakkaus, /ETOPO1/);
  assert.match(pakkaus, /Public domain/);
});

test('valon vastakaava jakaa pohjoisen ja jättää etelän rauhaan', () => {
  // Pohjoisnavalla valo on 1 + 0,6 = 1,6-kertainen → kerroin 1/1,6.
  assert.ok(Math.abs(valokerroin(90) - 1 / 1.6) < 1e-9, String(valokerroin(90)));
  // Päiväntasaajalla ja etelässä DirectionalLight ei paista: kerroin 1.
  assert.equal(valokerroin(0), 1);
  assert.equal(valokerroin(-45), 1);
  assert.equal(valokerroin(-90), 1);
  // Monotoninen pohjoiseen päin: ei portaita, jotka näkyisivät raitoina.
  let edellinen = 1;
  for (let lat = 0; lat <= 90; lat += 5) {
    assert.ok(valokerroin(lat) <= edellinen + 1e-12, `kerroin nousi ${lat}°:ssa`);
    edellinen = valokerroin(lat);
  }
  // Sama kaava kuin maapallonVarit-funktiossa polttaa tekstuuriin
  // (VALON_KOMPENSAATIO): generoitu ja reliefi eivät saa erota.
  assert.ok(Math.abs(valokerroin(30) - 1 / (1 + VALON_KOMPENSAATIO * Math.sin(Math.PI / 6))) < 1e-12);
});

test('liu\'un pysäkit kattavat navalta navalle eivätkä hyppää', () => {
  const p = liuunPysakit(valokerroin);
  assert.equal(p.length, 181);
  assert.equal(p[0].t, 0);
  assert.equal(p[0].lat, 90);
  assert.equal(p[p.length - 1].t, 1);
  assert.equal(p[p.length - 1].lat, -90);
  // Yhden asteen välein, ja liu'un virhe pysäkkien VÄLISSÄ on pieni:
  // suurin askel on päiväntasaajalla noin 0,01 eli 2,6/255 sävyä.
  let suurin = 0;
  for (let i = 1; i < p.length; i += 1) {
    assert.ok(Math.abs(p[i].lat - p[i - 1].lat - -1) < 1e-9, 'pysäkkiväli ei ole 1°');
    suurin = Math.max(suurin, Math.abs(p[i].arvo - p[i - 1].arvo));
  }
  assert.ok(suurin < 0.015, `liuku hyppää ${suurin}`);
  // Napojen häivytyskaistalle (6°) osuu kuusi pysäkkiä, ei yhtä.
  const kaistalla = liuunPysakit(reliefinAlfa).filter((x) => x.arvo > 0 && x.arvo < 1);
  assert.ok(kaistalla.length >= 8, `häivytyskaistalla vain ${kaistalla.length} pysäkkiä`);
});

test('napojen häivytys vie reliefin nollaan ennen kuvan omaa reunaa', () => {
  // Lauta ulottuu −58…76, ja häivytys alkaa ennen molempia reunoja.
  assert.equal(reliefinAlfa(0), 1);
  assert.equal(reliefinAlfa(69), 1);
  assert.equal(reliefinAlfa(-51), 1);
  assert.ok(reliefinAlfa(73) > 0 && reliefinAlfa(73) < 1, 'pohjoinen ei häivy pehmeästi');
  assert.ok(reliefinAlfa(-55) > 0 && reliefinAlfa(-55) < 1, 'etelä ei häivy pehmeästi');
  assert.equal(reliefinAlfa(76), 0);
  assert.equal(reliefinAlfa(90), 0);
  assert.equal(reliefinAlfa(-58), 0);
  assert.equal(reliefinAlfa(-90), 0);
  // Ja häivytys on monotoninen: ei kuoppia, jotka näkyisivät renkaina.
  let edellinen = 1;
  for (let lat = 69; lat <= 77; lat += 0.5) {
    const nyt = reliefinAlfa(lat);
    assert.ok(nyt <= edellinen + 1e-9, `häivytys kääntyi ylös ${lat}°:ssa`);
    edellinen = nyt;
  }
});

test('napojen häivytys tehdään alfaliu\'ulla eikä 33 Mt:n taulukolla', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  /*
   * 4096 × 2048 on 8,4 miljoonaa pikseliä: getImageData palauttaisi
   * 33 Mt:n taulukon joka kerta, kun linssi avataan. Rivikohtainen
   * arvo syntyy kahdella pystyliu'ulla, jotka selain piirtää
   * näytönohjaimella — ja `destination-in` palauttaa alfan täsmälleen,
   * koska `multiply` täyttäisi läpinäkyvät navat harmaalla.
   */
  assert.ok(!/getImageData\(0, 0, leveys, korkeus\)/.test(lahde),
    'reliefi luetaan yhä pikseleinä');
  assert.match(lahde, /globalCompositeOperation = 'multiply'/);
  assert.match(lahde, /globalCompositeOperation = 'destination-in'/);
  assert.match(lahde, /globalCompositeOperation = 'destination-out'/);
  // Blob-osoite eikä base64: 4096 × 2048 -PNG olisi kymmeniä megatavuja.
  assert.match(lahde, /createObjectURL\(blob\)/);
  assert.match(lahde, /revokeObjectURL/);
});

test('reliefiTekstuuri palaa nullina ilman canvasia eikä kaadu', async () => {
  const { reliefiTekstuuri } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(await reliefiTekstuuri({}, null, {}), null);
  assert.equal(await reliefiTekstuuri({}, { createElement: () => ({}) }, {}), null);
});

/* ══ 11. ISS, auringon sivuvalo ja kylläisyys (omistaja 16.9.2026) ══ */

/*
 * Raamattu, "ASTRONAUTIN KAMERA: VALOKUVANÄKYMÄ UUSIKSI 2",
 * PALLONÄKYMÄ 11–13: kiertävä ISS, auringon sivuvalo pallon reunalla
 * ja hillitympi kylläisyys. Kaavat mitataan tässä; pikselit ja DOM
 * ovat savukkeessa tools/savukkeet/savuke-astro-pallo.mjs.
 */

test('ISS kulkee 51,6 asteen radalla eikä käy koskaan navoilla', async () => {
  const { radanPiste, issPaikka, ISS_INKLINAATIO, ISS_KIERROS_S } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(ISS_INKLINAATIO, 51.6);
  // Nouseva solmu: päiväntasaajalla ja solmun pituudella.
  const solmussa = radanPiste(0, 25);
  assert.ok(Math.abs(solmussa.lat) < 1e-9, String(solmussa.lat));
  assert.ok(Math.abs(solmussa.lng - 25) < 1e-9, String(solmussa.lng));
  // Neljännes radasta: täsmälleen inklinaation verran pohjoista.
  assert.ok(Math.abs(radanPiste(90).lat - ISS_INKLINAATIO) < 1e-9);
  assert.ok(Math.abs(radanPiste(270).lat + ISS_INKLINAATIO) < 1e-9);
  // Koko kierros: leveysaste pysyy kaistassa, pituus laillisena.
  for (let u = 0; u < 360; u += 3) {
    const p = radanPiste(u);
    assert.ok(Math.abs(p.lat) <= ISS_INKLINAATIO + 1e-9, `${u}: ${p.lat}`);
    assert.ok(p.lng >= -180 && p.lng <= 180, `${u}: ${p.lng}`);
  }
  // Kierrosaika on tilauksen kaistassa 60–90 s ja merkki liikkuu
  // kahdessa sekunnissa (vartion mittari).
  assert.ok(ISS_KIERROS_S >= 60 && ISS_KIERROS_S <= 90, String(ISS_KIERROS_S));
  const a = issPaikka(0);
  const b = issPaikka(2);
  assert.ok(Math.abs(a.lat - b.lat) + Math.abs(a.lng - b.lng) > 1,
    `ISS ei liikkunut kahdessa sekunnissa: ${JSON.stringify(a)} ${JSON.stringify(b)}`);
  // Kierroksen jälkeen ollaan lähellä lähtöä, mutta rata on kiertynyt
  // maan mukana: pituus on siirtynyt, leveys palannut.
  const kierros = issPaikka(ISS_KIERROS_S);
  assert.ok(Math.abs(kierros.lat - a.lat) < 1e-6, String(kierros.lat));
  assert.ok(Math.abs(kierros.lng - a.lng) > 1, `rata ei pyörinyt: ${kierros.lng} vs ${a.lng}`);
});

test('ratakaari kiertää ympäri ja horisonttitesti karsii takapuolen', async () => {
  const { issKaari, radallaEdessa, ISS_KORKEUS, ISS_KAAREN_PISTEITA } = await import('../js/linssit/satelliitti-avaruus.js');
  const kaari = issKaari(0);
  assert.equal(kaari.length, ISS_KAAREN_PISTEITA + 1);
  assert.ok(Math.abs(kaari[0].lat - kaari[kaari.length - 1].lat) < 1e-9, 'kaari ei sulkeudu');
  // Radan korkeus on 6 % pinnan yläpuolella.
  assert.ok(Math.abs(ISS_KORKEUS - 0.06) < 1e-9);
  // Kamera +Z:llä etäisyydellä 3R: etupuoli näkyy, takapuoli ei.
  const R = 100;
  const kamera = { x: 0, y: 0, z: 3 * R };
  const edessa = { x: 0, y: 0, z: R * 1.06 };
  const takana = { x: 0, y: 0, z: -R * 1.06 };
  const reunalla = { x: R * 1.06, y: 0, z: 0 };
  assert.equal(radallaEdessa(kamera, edessa, R), true);
  assert.equal(radallaEdessa(kamera, takana, R), false);
  // Horisontin päällä oleva piste on radan korkeudella yhä piilossa
  // (P · C = 0 < R²), kuten pallon oma horisontti sanoo.
  assert.equal(radallaEdessa(kamera, reunalla, R), false);
  assert.equal(radallaEdessa(null, edessa, R), false);
});

test('auringon sivuvalo koskee vain reunaa ja jättää keskustan rauhaan', async () => {
  const m = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(m.VARJON_ALFA, 0.55);
  assert.equal(m.VARJON_KAISTA, 0.12);
  assert.equal(m.VALOREUNAN_ALFA, 0.18);
  assert.equal(m.VALOREUNAN_KAISTA, 0.08);
  // Varjo alkaa vasta 88 %:n säteellä ja katkeaa nollaan pallon reunaan
  // (ei vuotoa tähtitaivaalle).
  const varjo = m.varjonTausta();
  assert.match(varjo, /rgba\(0,0,0,0\) 88\.0%/);
  assert.match(varjo, /rgba\(0,0,0,0\.55\) 100%, rgba\(0,0,0,0\) 100%/);
  const valo = m.valoreunanTausta();
  assert.match(valo, /rgba\(255,255,255,0\) 92\.0%/);
  assert.match(valo, /rgba\(255,255,255,0\.18\) 100%, rgba\(255,255,255,0\) 100%/);
  // Puolet ovat vastakkaiset: varjo poispäin auringosta.
  assert.notEqual(m.puolenMaski('varjo'), m.puolenMaski('valo'));
  assert.match(m.puolenMaski('varjo'), /to right/);
  assert.match(m.puolenMaski('valo'), /to left/);
});

test('reliefin 8k-kuva tulee vain leveälle ruudulle, puhelin saa 4k:n', async () => {
  const m = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(m.RELIEFIN_8K_LEVEYS, 8192);
  assert.equal(m.RELIEFIN_8K_KORKEUS, 4096);
  const puhelin = m.valitseReliefi({ leveys: 390, dpr: 3 });
  assert.equal(puhelin.tunnus, '4k');
  assert.equal(puhelin.osoite, m.RELIEFIN_OSOITE);
  // Leveä puhelin kolminkertaisella pikselisuhteella on yhä puhelin.
  assert.equal(m.valitseReliefi({ leveys: 430, dpr: 3 }).tunnus, '4k');
  const tyopoyta = m.valitseReliefi({ leveys: 1400, dpr: 1 });
  assert.equal(tyopoyta.tunnus, m.RELIEFIN_8K_KAYTOSSA ? '8k' : '4k');
  // Pääkytkin vie kaikki takaisin 4k:hon.
  assert.equal(m.valitseReliefi({ leveys: 1400, dpr: 2, salli8k: false }).tunnus, '4k');
});

test('kylläisyys lasketaan suodattimella ja varareitti on sekoitus', async () => {
  const { kyllaisyysAlas, RELIEFIN_SATURAATIO } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(RELIEFIN_SATURAATIO, 0.8);
  const kutsut = [];
  const tukeva = {
    filter: 'none', globalAlpha: 1, globalCompositeOperation: 'source-over', fillStyle: '',
    drawImage: () => kutsut.push('draw'), fillRect: () => kutsut.push('fill'),
  };
  assert.equal(kyllaisyysAlas(tukeva, {}, 4, 2), 'suodatin');
  assert.deepEqual(kutsut, ['draw']);
  assert.equal(tukeva.filter, 'none', 'suodatin jäi päälle');
  // Selain ilman kankaan suodatinta: arvo ei jää kiinni → sekoitus.
  const vanha = {
    globalAlpha: 1, globalCompositeOperation: 'source-over', fillStyle: '',
    get filter() { return 'none'; }, set filter(_) { /* ei tue */ },
    drawImage: () => {}, fillRect: () => {},
  };
  assert.equal(kyllaisyysAlas(vanha, {}, 4, 2), 'sekoitus');
  assert.equal(vanha.globalAlpha, 1);
  assert.equal(vanha.globalCompositeOperation, 'source-over');
});

test('avaruuskalvo palaa nullina ilman koteloa eikä kaada linssiä', async () => {
  const { luoAvaruusKalvo } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(luoAvaruusKalvo({}), null);
  assert.equal(luoAvaruusKalvo({ pallo: { getScreenCoords: () => ({}) }, kotelo: null }), null);
});

/* ══ 12. avausajo: koko pallo → melkein koko ruutu (16.9.2026) ═════ */

/*
 * Raamattu LISÄYS 4, kohta 18 (omistaja, sanatarkasti): *"maapallo
 * voisi pyöriä hitaasti kun linssi avautuu ja samalla zoomautua alussa
 * pehmeästi lähemmäs niin että alussa pallo näkyy kokonaan ja lopuksi
 * pallo peittää melkein koko ruudun ja jää sen jälkeen vain hitaasti
 * pyörimään, kunnes pelaaja alkaa ohjata palloa, jolloin pyöriminen
 * loppuu."*
 */

test('avausajo alkaa koko pallosta ja päättyy melkein koko ruutuun', async () => {
  const m = await import('../js/linssit/satelliitti-avaruus.js');
  for (const [nimi, mitat] of Object.entries(RUUDUT)) {
    const kapein = Math.min(mitat.leveys, mitat.korkeus);
    const alku = m.avausKorkeus({ ...mitat, marginaali: m.ALOITUKSEN_MARGINAALI });
    const loppu = m.avausKorkeus(mitat);
    const dAlku = m.halkaisijaRuudulla(alku, { korkeus: mitat.korkeus }) / kapein;
    const dLoppu = m.halkaisijaRuudulla(loppu, { korkeus: mitat.korkeus }) / kapein;
    // Alussa pallo näkyy KOKONAAN väljästi: 60–70 % kapeimmasta sivusta.
    assert.ok(dAlku >= 0.6 && dAlku <= 0.7, `${nimi}: alku ${(dAlku * 100).toFixed(1)} %`);
    // Lopuksi se peittää melkein koko ruudun: 90–95 %.
    assert.ok(dLoppu >= 0.9 && dLoppu <= 0.95, `${nimi}: loppu ${(dLoppu * 100).toFixed(1)} %`);
    // Ajo menee SISÄÄNPÄIN ja kasvattaa pallon vähintään 1,3-kertaiseksi.
    assert.ok(alku > loppu, `${nimi}: ajo ei tule lähemmäs`);
    assert.ok(dLoppu / dAlku >= 1.3, `${nimi}: kasvu ${(dLoppu / dAlku).toFixed(2)}×`);
  }
});

test('avausajon pehmennys on ease-in-out ja pysyy kaistassa', async () => {
  const { avausPehmennys, AVAUSZOOMIN_KESTO_MS } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(avausPehmennys(0), 0);
  assert.equal(avausPehmennys(1), 1);
  assert.ok(Math.abs(avausPehmennys(0.5) - 0.5) < 1e-9);
  // Rajat eivät vuoda: alle nollan ja yli ykkösen leikataan.
  assert.equal(avausPehmennys(-3), 0);
  assert.equal(avausPehmennys(7), 1);
  assert.equal(avausPehmennys('roska'), 0);
  // Ease-IN: alussa liike on hitaampaa kuin lineaarinen…
  assert.ok(avausPehmennys(0.2) < 0.2, String(avausPehmennys(0.2)));
  // …ja ease-OUT: lopussa se hidastuu takaisin.
  assert.ok(avausPehmennys(0.8) > 0.8, String(avausPehmennys(0.8)));
  // Monotoninen: zoom ei nykäise taaksepäin kertaakaan.
  let edellinen = -1;
  for (let i = 0; i <= 100; i += 1) {
    const v = avausPehmennys(i / 100);
    assert.ok(v >= edellinen, `pehmennys kääntyi kohdassa ${i}`);
    edellinen = v;
  }
  // Kesto on tilauksen kaistassa 4–6 s.
  assert.ok(AVAUSZOOMIN_KESTO_MS >= 4000 && AVAUSZOOMIN_KESTO_MS <= 6000,
    String(AVAUSZOOMIN_KESTO_MS));
});

test('pyörimisnopeus on 0,16 °/s kirjaston omalla kaavalla', async () => {
  const { PYORIMISTA_ASTETTA_S, PYORIMISEN_NOPEUS } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(PYORIMISTA_ASTETTA_S, 0.16);
  // OrbitControls: kulma = 2π/60 · autoRotateSpeed radiaania sekunnissa
  // (three-render-objects antaa update(dt):lle kehysajan), eli
  // 6 · speed astetta sekunnissa.
  assert.ok(Math.abs(PYORIMISEN_NOPEUS * 6 - PYORIMISTA_ASTETTA_S) < 1e-12);
});

test('linssi sytyttää pyörimisen ja purku palauttaa sen ennalleen', () => {
  const pallo = valepallo();
  const lauta = valelauta(pallo);
  const ikkuna = valeikkuna();
  pallo.ohjaimet.autoRotate = false;
  pallo.ohjaimet.autoRotateSpeed = 2;
  const nakyma = avaaAvaruusnakyma(lauta, { ui: { reducedMotion: false }, ikkuna });
  assert.equal(pallo.ohjaimet.autoRotate, true, 'pallo ei jäänyt pyörimään');
  assert.ok(Math.abs(pallo.ohjaimet.autoRotateSpeed * 6 - 0.16) < 1e-12,
    String(pallo.ohjaimet.autoRotateSpeed));
  assert.equal(nakyma.tila().pyorii, true);
  nakyma.pura();
  // Lauta ei pyöri itsekseen: lähtöarvo takaisin, myös nopeus.
  assert.equal(pallo.ohjaimet.autoRotate, false, 'pyöriminen jäi pelilaudalle');
  assert.equal(pallo.ohjaimet.autoRotateSpeed, 2);
});

test('liikkeenvähennys: ei pyörimistä ja zoom suoraan loppuasentoon', () => {
  const pallo = valepallo();
  const lauta = valelauta(pallo);
  const ikkuna = valeikkuna();
  const nakyma = avaaAvaruusnakyma(lauta, { ui: { reducedMotion: true }, ikkuna });
  assert.equal(pallo.ohjaimet.autoRotate, false, 'pallo pyöri liikkeenvähennyksellä');
  const tila = nakyma.tila();
  assert.equal(tila.pyorii, false);
  assert.equal(tila.avausajo.kaynnissa, false, 'ajo jäi kesken');
  assert.equal(tila.avausajo.osuus, 1);
  // Kamera on LOPPUASENNOSSA heti, ei aloituskorkeudessa.
  assert.ok(Math.abs(pallo.tila.pov.altitude - tila.avauskorkeus) < 0.001,
    `${pallo.tila.pov.altitude} vs ${tila.avauskorkeus}`);
  assert.ok(tila.aloituskorkeus > tila.avauskorkeus);
  // Ja kaikki kamerakirjoitukset ovat hyppyjä (kesto 0).
  assert.ok(pallo.tila.ajot.every((k) => k === 0), JSON.stringify(pallo.tila.ajot));
  nakyma.pura();
});

/* ══ 12. koko pallon reliefi: navat mukaan (omistaja 16.9.2026) ═════ */

/*
 * Sanatarkasti: *"onhan tarkemmassa topografia ajossa myos pohjois ja
 * etelanavat mukana, etta ei tule tyhjia kohtia niihin?"* — ja päätös:
 * *"Kyllä, koko pallo 1′-datasta."*
 */

test('koko pallon reliefi on VALMIS mutta EI vielä kytketty', () => {
  // Kytkin käännetään vasta kun Mac-ajo on tehty ja osoitteet
  // tarkistettu. Tämä testi on se vartija: jos kytkin kääntyy vahingossa
  // tässä PR:ssä, ajoa ei ole vielä tehty eikä kuvaa ole olemassa.
  assert.equal(RELIEFI_KOKO_PALLO, false);
  // Sama ruutu, kytkin pois: vanha kuva molemmilla tarkkuuksilla.
  const nyt = valitseReliefi();
  assert.equal(nyt.osoite, RELIEFIN_OSOITE);
  assert.equal(nyt.leveys, RELIEFIN_LEVEYS);
  assert.equal(nyt.korkeus, RELIEFIN_KORKEUS);
  assert.equal(nyt.kokoPallo, false);
});

test('kytkin vaihtaa kuvan mutta EI tarkkuuden valintaa', () => {
  // Puhelin: 4k myös koko pallon kuvalla — muistinkulutus ei muutu.
  const puhelin = valitseReliefi({ kokoPallo: true, leveys: 390, dpr: 3 });
  assert.equal(puhelin.osoite, RELIEFIN_KOKO_4K.osoite);
  assert.equal(puhelin.tunnus, '4k');
  assert.equal(puhelin.leveys, RELIEFIN_LEVEYS);
  assert.equal(puhelin.korkeus, RELIEFIN_KORKEUS);
  assert.equal(puhelin.kokoPallo, true);
  // Työpöytä: sama 8k-kynnys kuin vanhalla kuvaparilla.
  const tyopoyta = valitseReliefi({ kokoPallo: true, leveys: 1440, dpr: 2 });
  assert.equal(tyopoyta.osoite, RELIEFIN_KOKO_8K.osoite);
  assert.equal(tyopoyta.tunnus, '8k');
  assert.equal(tyopoyta.leveys, 8192);
  assert.equal(tyopoyta.korkeus, 4096);
  assert.equal(tyopoyta.kokoPallo, true);
  // Tarkkuuden valinta on SAMA kummallakin kuvaparilla: vain osoite
  // vaihtuu, ei mitat.
  for (const ruutu of [{ leveys: 390, dpr: 3 }, { leveys: 1440, dpr: 2 }]) {
    const vanha = valitseReliefi(ruutu);
    const uusi = valitseReliefi({ ...ruutu, kokoPallo: true });
    assert.equal(uusi.tunnus, vanha.tunnus);
    assert.equal(uusi.leveys, vanha.leveys);
    assert.equal(uusi.korkeus, vanha.korkeus);
    assert.notEqual(uusi.osoite, vanha.osoite);
  }
  // Molemmat osoitteet ovat samassa ämpärikansiossa kuin muut
  // linssikuvat, ja molemmissa on tunniste (ikuinen välimuisti).
  for (const k of [RELIEFIN_KOKO_8K, RELIEFIN_KOKO_4K]) {
    assert.match(k.osoite, /^https:\/\/media\.matkakirja\.app\/matkakirja\/linssit\//);
    assert.match(k.osoite, /topografia-pallo-koko-(4k|8k)-\d{8}\.webp$/);
  }
  assert.notEqual(RELIEFIN_KOKO_8K.osoite, RELIEFIN_KOKO_4K.osoite);
});

test('napajäätä ei häivytetä päälle, kun jää tulee kuvasta', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  // Häivytys on yhä olemassa vanhalle kuvalle, mutta se on ehdollinen.
  assert.match(lahde, /if \(!kokoPallo\) napaLiuku\(actx, leveys, korkeus\);/);
});

test('työkalun jäävari on SAMA kuin linssin generoidun Maan jää', () => {
  // Reliefi piirtyy generoidun Maan päälle. Jos sävyt eroaisivat, raja
  // näkyisi juuri siellä missä kuva vaihtuu.
  assert.deepEqual(JAAN_VARI_TYOKALU, JAAN_VARI);
});

test('jään sekoitus: päiväntasaajalla ei jäätä, navalla lähes pelkkää', () => {
  assert.equal(jaapaino(0, 1000), 0);
  assert.equal(jaapaino(0, -4000), 0);
  // Mannerjää alkaa ennen merijäätä: Grönlannin ja Etelämantereen
  // jäätiköt ulottuvat etelämmäs kuin kiinteä merijää.
  assert.ok(jaapaino(64, 1500) > jaapaino(64, -1500), 'merijää alkaa liian aikaisin');
  // Etelämanner on jäätä, Jäämeri vain osittain — muuten rantaviiva
  // katoaisi, ja juuri se on tämän kuvan tarkoitus.
  assert.ok(Math.abs(jaapaino(-80, 2500) - JAA.maaKatto) < 1e-9);
  assert.ok(Math.abs(jaapaino(89, -4000) - JAA.meriKatto) < 1e-9);
  assert.ok(JAA.meriKatto < JAA.maaKatto, 'merijää ei saa peittää yhtä täysin kuin mannerjää');
  // Liuku eikä kytkin: terävä raja piirtäisi navan ympäri renkaan.
  let edellinen = 0;
  for (let lat = 55; lat <= 90; lat += 1) {
    const nyt = jaapaino(lat, 1000);
    assert.ok(nyt >= edellinen - 1e-12, `jään osuus laski ${lat}°:ssa`);
    assert.ok(nyt - edellinen < 0.25, `jään osuus hyppää ${lat}°:ssa`);
    edellinen = nyt;
  }
  // Sama molemmilla pallonpuoliskoilla.
  assert.equal(jaapaino(-72, 800), jaapaino(72, 800));
});
