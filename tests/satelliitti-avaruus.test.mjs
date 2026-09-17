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
  PUUTTEEN_SELITE, avauksenPuute, pallodiag, pallodiagPaalla, pallodiagTeksti,
} from '../js/linssit/satelliitti-avaruus.js';
import {
  LINSSIVIRHEEN_TUNNUS, linssivirheNakyy, naytaLinssivirhe, poistaLinssivirhe,
} from '../js/linssivirhe.js';
import {
  PALLOKIRJASTON_AIKAKATKO_MS, PALLOKIRJASTON_YRITYKSET, PALLO_KIRJASTO, pallokirjastonOsoite,
} from '../js/pallo.js';
import {
  JAAN_VARI as JAAN_VARI_TYOKALU, JAA, jaapaino,
} from '../tools/reliefivarit.mjs';
import {
  PULUN_PIILO_LUOKKA, VARTIJAN_AIKAKATKO_MS, VARTIJAN_VARHAINEN_MS, piilotaPulu,
} from '../js/linssit/satelliitti.js';
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
  /* Vaihevartija välissä (16.9.2026): pulu on yhä sama kahva. */
  assert.match(lahde, /const pulu = vaihe\('pulu', \(\) => piilotaPulu\(\)\)/);
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
  assert.match(lahde, /avaaAvaruusnakyma[\s\S]{0,80}\} from '\.\/satelliitti-avaruus\.js'/);
  assert.match(lahde, /const avaruus = vaihe\('avaruus', \(\) => avaaAvaruusnakyma\(lauta, \{ ui \}\)\)/);
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
  /*
   * PÄIVITETTY 16.9.2026 (musta pallo): pikselisilmukka on olemassa,
   * mutta vain kylläisyyden varareittinä vanhalle Safarille JA vain
   * PIKSELISATURAATION_KATON alittavalle kankaalle. 4k ja 8k eivät
   * mahdu siihen, joten 33 Mt:n taulukkoa ei synny.
   */
  assert.match(lahde, /PIKSELISATURAATION_KATTO = 2048 \* 1024/);
  assert.match(lahde,
    /leveys \* korkeus <= PIKSELISATURAATION_KATTO[\s\S]{0,160}getImageData\(0, 0, leveys, korkeus\)/,
    'pikselisilmukka ilman kokokattoa');
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
  // Vanhan (ei-koko-pallon) kuvaparin osoitteet: kokoPallo eksplisiittisesti
  // pois, koska RELIEFI_KOKO_PALLO on nyt oletuksena päällä.
  const puhelin = m.valitseReliefi({ leveys: 390, dpr: 3, kokoPallo: false });
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

test('koko pallon reliefi on KYTKETTY (Mac-ajo 20260916)', () => {
  // Mac-ajo (tunniste 20260916) on valmis, osoitteet tarkistettu
  // HEAD:illä ja kytkin käännetty todeksi 16.9.2026
  // (docs/raportit/viesti-fable-pallo-navat-20260916.md).
  assert.equal(RELIEFI_KOKO_PALLO, true);
  // Oletus (ei ruudun mittoja) valitsee koko pallon 4k-kuvan: kytkin
  // vaikuttaa myös ilman selitystä annettua kokoPallo-lippua.
  const nyt = valitseReliefi();
  assert.equal(nyt.osoite, RELIEFIN_KOKO_4K.osoite);
  assert.equal(nyt.leveys, RELIEFIN_LEVEYS);
  assert.equal(nyt.korkeus, RELIEFIN_KORKEUS);
  assert.equal(nyt.kokoPallo, true);
  // Tunniste näkyy molemmissa osoitteissa.
  assert.match(RELIEFIN_KOKO_8K.osoite, /topografia-pallo-koko-8k-20260916\.webp$/);
  assert.match(RELIEFIN_KOKO_4K.osoite, /topografia-pallo-koko-4k-20260916\.webp$/);
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
  // vaihtuu, ei mitat. Vanha kuvapari haetaan EKSPLISIITTISESTI
  // kokoPallo: false -lipulla, koska oletus on nyt kytketty.
  for (const ruutu of [{ leveys: 390, dpr: 3 }, { leveys: 1440, dpr: 2 }]) {
    const vanha = valitseReliefi({ ...ruutu, kokoPallo: false });
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
  /*
   * Häivytys on yhä olemassa vanhalle kuvalle, mutta se on nyt kokonaan
   * toisessa haarassa: koko pallon kuva ladotaan yhdelle kankaalle
   * ilman apukangasta, alfan palautusta ja napaliukua (16.9.2026,
   * musta pallo). napaLiuku kutsutaan vain `else`-haarassa.
   */
  assert.match(lahde, /if \(kokoPallo\) \{[\s\S]{0,900}\} else \{[\s\S]{0,900}napaLiuku\(actx, leveys, korkeus\);/);
  assert.ok(!/^\s*napaLiuku\(ctx, /m.test(lahde), 'napaliuku koko pallon haarassa');
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

/* ═══════ MUSTA PALLO iPHONESSA (v1924) — LADONNAN KESTÄVYYS ═══════ */

test('ladontakangas valitaan ruudusta, eikä koskaan yli 16 megapikselin', async () => {
  const {
    valitseLadonta, LADONNAN_KATTO_PUHELIN, LADONNAN_KATTO, LADONNAN_KATTO_WEBKIT,
    LADONNAN_PIKSELIKATTO,
  } = await import('../js/linssit/reliefikuva.js');
  // Puhelin (390 CSS) → 4k-lähde puolitetaan kerran.
  const puhelin = valitseLadonta({ leveys: 4096, korkeus: 2048, ruudunLeveys: 390 });
  assert.deepEqual(
    { leveys: puhelin.leveys, korkeus: puhelin.korkeus }, { leveys: 2048, korkeus: 1024 },
  );
  assert.equal(puhelin.pienennetty, true);
  assert.equal(puhelin.katto, LADONNAN_KATTO_PUHELIN);
  // Suhde pysyy 2:1, tai tasavälinen maasto venyisi.
  assert.equal(puhelin.leveys / puhelin.korkeus, 2);
  /*
   * LISÄYS 13 kohta 37: leveä ruutu EI enää saa lähdekuvan omaa kokoa.
   * 8192 × 4096 = 33,5 Mpx on kaksi kertaa iOS:n kangaskatto, 48 Mt:n
   * PNG ja 134 Mt:n tekstuuri — musta pallo macOS-WebAppissa.
   */
  const tyopoyta = valitseLadonta({ leveys: 8192, korkeus: 4096, ruudunLeveys: 2539 });
  assert.deepEqual(
    { leveys: tyopoyta.leveys, korkeus: tyopoyta.korkeus }, { leveys: 4096, korkeus: 2048 },
  );
  assert.equal(tyopoyta.pienennetty, true);
  assert.equal(tyopoyta.katto, LADONNAN_KATTO);
  assert.ok(tyopoyta.leveys * tyopoyta.korkeus <= LADONNAN_PIKSELIKATTO);
  // WebKitillä katto on sama tai tiukempi — ei koskaan löysempi.
  const webkit = valitseLadonta({
    leveys: 8192, korkeus: 4096, ruudunLeveys: 2539, webkit: true,
  });
  assert.ok(webkit.leveys <= LADONNAN_KATTO_WEBKIT);
  assert.ok(webkit.leveys <= tyopoyta.leveys);
  // Ilman ruudun leveyttä oletus on varovainen (puhelinkatto).
  assert.equal(valitseLadonta({ leveys: 4096, korkeus: 2048 }).leveys, 2048);
  // Nimenomainen katto voittaa ruudun: puolituksin, ei vapaalla kertoimella.
  assert.equal(valitseLadonta({ leveys: 8192, korkeus: 4096, katto: 1024 }).leveys, 1024);
  assert.equal(valitseLadonta({ leveys: 8192, korkeus: 4096, katto: 1024 }).korkeus, 512);
  // Eikä edes nimenomainen katto voi ylittää pikselikattoa.
  const liikaa = valitseLadonta({ leveys: 16384, korkeus: 8192, katto: 16384 });
  assert.ok(liikaa.leveys * liikaa.korkeus <= LADONNAN_PIKSELIKATTO, `${liikaa.leveys}x${liikaa.korkeus}`);
});

test('webkitSelain tunnistaa Safarin ja WebAppin muttei Chromea', async () => {
  const { webkitSelain } = await import('../js/linssit/reliefikuva.js');
  const SAFARI = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'
    + ' (KHTML, like Gecko) Version/17.6 Safari/605.1.15';
  const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    + ' (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
  const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15'
    + ' (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1';
  assert.equal(webkitSelain({ userAgent: SAFARI }), true);
  assert.equal(webkitSelain({ userAgent: IPHONE }), true);
  assert.equal(webkitSelain({ userAgent: CHROME }), false);
  // Asennettu WebApp kertoo itsensä myös standalone-lipulla.
  assert.equal(webkitSelain({ userAgent: CHROME, standalone: true }), true);
  // Tuntematon tai puuttuva navigator ei saa kaataa eikä arvata.
  assert.equal(webkitSelain(null), false);
  assert.equal(webkitSelain({}), false);
});

test('tyhjä kangas tunnistetaan, eikä tunnistus estä kun sitä ei voi tehdä', async () => {
  const {
    tyhjaKangas, TYHJYYDEN_KYNNYS, TUMMUUDEN_KYNNYS, VAIHTELUN_KYNNYS,
  } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(TYHJYYDEN_KYNNYS, 12);
  /*
   * NÄYTTEET VAIHTELEVAT, KUTEN OIKEA RELIEFI: syvä meri ja vaalea
   * manner. Yksivärinen kangas kelpasi ennen — se päästi mustan pallon
   * läpi macOS-WebAppissa (LISÄYS 13 kohta 37).
   */
  const vaihteleva = (tumma, vaalea) => {
    let vuoro = 0;
    return {
      getImageData: () => {
        vuoro += 1;
        return { data: vuoro % 2 ? tumma : vaalea };
      },
    };
  };
  const yksivarinen = (r, g, b, a) => ({ getImageData: () => ({ data: [r, g, b, a] }) });
  // Juuri tämä on iOS Safarin oire: kangas on läpinäkyvä, ei poikkeusta.
  assert.equal(tyhjaKangas(yksivarinen(0, 0, 0, 0), 64, 32), true);
  // Musta mutta läpinäkymätön on yhtä musta ruudulla.
  assert.equal(tyhjaKangas(yksivarinen(0, 0, 0, 255), 64, 32), true);
  // Syvä meri ja manner: tämä on oikea reliefi ja se kelpaa.
  assert.equal(tyhjaKangas(vaihteleva([9, 32, 72, 255], [180, 170, 120, 255]), 64, 32), false);
  // UUSI: yksivärinen pinta hylätään, vaikka se olisi kirkas.
  assert.equal(tyhjaKangas(yksivarinen(180, 170, 120, 255), 64, 32), true);
  // UUSI: lähes musta hylätään, vaikka yksi näyte ylittäisi kynnyksen.
  assert.ok(TUMMUUDEN_KYNNYS > TYHJYYDEN_KYNNYS);
  assert.equal(tyhjaKangas(vaihteleva([0, 0, 0, 255], [14, 14, 14, 255]), 64, 32), true);
  assert.ok(VAIHTELUN_KYNNYS > 0);
  // Ei getImageDataa tai se heittää (likainen kangas) → ei estetä.
  assert.equal(tyhjaKangas({}, 64, 32), false);
  assert.equal(tyhjaKangas({ getImageData() { throw new Error('tainted'); } }, 64, 32), false);
});

test('tyhjyysnäytteet ulottuvat reunoihin asti (lähde)', async () => {
  const { readFile } = await import('node:fs/promises');
  const lahde = await readFile(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  const lohko = lahde.match(/const TYHJYYSNAYTTEET = \[([\s\S]*?)\];/)?.[1] ?? '';
  const luvut = [...lohko.matchAll(/\[([\d.]+), ([\d.]+)\]/g)]
    .map(([, x, y]) => [Number(x), Number(y)]);
  assert.ok(luvut.length >= 16, `näytteitä ${luvut.length}`);
  // Reunanäyte kummallakin akselilla, molemmista päistä.
  assert.ok(luvut.some(([x]) => x <= 0.05), 'vasen reuna');
  assert.ok(luvut.some(([x]) => x >= 0.95), 'oikea reuna');
  assert.ok(luvut.some(([, y]) => y <= 0.05), 'yläreuna');
  assert.ok(luvut.some(([, y]) => y >= 0.95), 'alareuna');
});

test('kylläisyyden pikselivarareitti pienelle kankaalle, sekoitus suurelle', async () => {
  const { kyllaisyysAlas, PIKSELISATURAATION_KATTO } = await import('../js/linssit/satelliitti-avaruus.js');
  const teePikseli = () => {
    const data = { data: new Uint8ClampedArray([200, 40, 40, 255]) };
    return {
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      fillStyle: '',
      get filter() { return 'none'; },
      set filter(_) { /* ei tue: Safari 16 ja vanhemmat */ },
      drawImage: () => {},
      fillRect: () => {},
      getImageData: () => data,
      putImageData: () => {},
      data,
    };
  };
  const pieni = teePikseli();
  assert.equal(kyllaisyysAlas(pieni, {}, 4, 2), 'pikselit');
  // Punainen vaimeni kohti harmaata mutta ei muuttunut harmaaksi.
  assert.ok(pieni.data.data[0] < 200 && pieni.data.data[0] > 140, `R ${pieni.data.data[0]}`);
  assert.ok(pieni.data.data[1] > 40, `G ${pieni.data.data[1]}`);
  // Liian iso kangas ei mene pikselisilmukkaan vaikka getImageData olisi.
  const iso = teePikseli();
  assert.equal(kyllaisyysAlas(iso, {}, 4096, 2048), 'sekoitus');
  assert.ok(PIKSELISATURAATION_KATTO < 4096 * 2048);
  /*
   * VANHA VIKA: jos `saturation` ei ollut tuettu, gCO jäi
   * `source-over`iksi ja harmaa täyttö levisi koko kankaalle. Arvo
   * luetaan nyt takaisin — tuntematon tila päättää yrityksen.
   */
  let taytetty = false;
  const eiSekoitusta = {
    globalAlpha: 1,
    fillStyle: '',
    get filter() { return 'none'; },
    set filter(_) { /* ei tue */ },
    get globalCompositeOperation() { return 'source-over'; },
    set globalCompositeOperation(_) { /* ei tue mitään sekoitusta */ },
    drawImage: () => {},
    fillRect: () => { taytetty = true; },
  };
  assert.equal(kyllaisyysAlas(eiSekoitusta, {}, 4096, 2048), 'ei');
  assert.equal(taytetty, false, 'harmaa levisi koko kankaalle');
});

test('reliefiTekstuuri: aikakatko ja tyhjä kangas päättyvät nulliin', async () => {
  const { reliefiTekstuuri, RELIEFIN_AIKAKATKO_MS } = await import('../js/linssit/satelliitti-avaruus.js');
  assert.equal(RELIEFIN_AIKAKATKO_MS, 8000);

  /** Kangasmokki, joka jäljittelee iOS Safaria annetulla pikselikatolla. */
  const teeDoc = (kattoPx, kirjaa = []) => ({
    createElement: () => {
      const k = {
        width: 0,
        height: 0,
        toBlob: (cb) => cb({ size: 1234 }),
        toDataURL: () => 'data:image/png;base64,xx',
        getContext: () => ({
          globalAlpha: 1,
          globalCompositeOperation: 'source-over',
          fillStyle: '',
          get filter() { return 'none'; },
          set filter(_) { /* Safari 16: ei suodatinta */ },
          drawImage: () => {},
          fillRect: () => {},
          createLinearGradient: () => ({ addColorStop: () => {} }),
          putImageData: () => {},
          /*
           * TYHJÄ KANGAS ILMAN POIKKEUSTA, juuri kuten iOS Safarissa.
           * Mahtuva kangas antaa VAIHTELEVIA arvoja (meri ja manner) —
           * yksivärinen pinta hylätään nykyään omana vikanaan.
           */
          getImageData: (x, y, w, h) => {
            if (k.width * k.height > kattoPx) return { data: [0, 0, 0, 0] };
            k.nayte = (k.nayte ?? 0) + 1;
            const arvo = k.nayte % 2 ? 40 : 200;
            return { data: new Uint8ClampedArray(4 * w * h).fill(arvo) };
          },
        }),
      };
      kirjaa.push(k);
      return k;
    },
  });
  const teeIkkuna = (doc) => {
    const ikkuna = {
      ImageData: class { constructor(data, leveys, korkeus) { Object.assign(this, { data, leveys, korkeus }); } },
      URL: { createObjectURL: () => 'blob:testi' },
      setTimeout: (fn, ms) => setTimeout(fn, ms),
      clearTimeout: (id) => clearTimeout(id),
      document: doc,
      Image: class {
        constructor() { this.kuuntelijat = {}; }
        addEventListener(nimi, fn) { this.kuuntelijat[nimi] = fn; }
        set src(_) { setTimeout(() => this.kuuntelijat.load?.(), 0); }
      },
    };
    return ikkuna;
  };

  // 1. Kangas mahtuu → osoite syntyy.
  const doc1 = teeDoc(4096 * 2048);
  assert.equal(
    await reliefiTekstuuri({ ruudunLeveys: 390 }, doc1, teeIkkuna(doc1)), 'blob:testi',
  );

  // 2. Safarin katto 2048 × 1024 -kankaan alle: jokainen yritys tyhjä →
  //    null, eli generoitu vyöhykepallo jää pinnalle mustan sijasta.
  const doc2 = teeDoc(256);
  assert.equal(await reliefiTekstuuri({ ruudunLeveys: 390 }, doc2, teeIkkuna(doc2)), null);

  // 3. Kuva ei lataudu eikä heitä virhettä: aikakatko ratkaisee.
  const doc3 = teeDoc(4096 * 2048);
  const ikkuna3 = teeIkkuna(doc3);
  ikkuna3.Image = class {
    constructor() { this.kuuntelijat = {}; }
    addEventListener(nimi, fn) { this.kuuntelijat[nimi] = fn; }
    set src(_) { /* hiljaisuus: ei loadia eikä erroria */ }
  };
  assert.equal(await reliefiTekstuuri({ ruudunLeveys: 390, aikakatko: 30 }, doc3, ikkuna3), null);
});

test('reliefiTekstuuri kokoaa koko pallon kuvan YHDELLE kankaalle', async () => {
  const { reliefiTekstuuri } = await import('../js/linssit/satelliitti-avaruus.js');
  /*
   * MUISTIHUIPPU ON SE, JOKA MUSTASI PALLON. Koko pallon kuvassa ei ole
   * läpinäkyviä pikseleitä, joten apukangasta ei tarvita — ladonnassa
   * saa olla vain tuloskangas ja pieni 1024 × 512 -pohja.
   */
  const kankaat = [];
  const doc = {
    createElement: () => {
      const k = {
        width: 0,
        height: 0,
        toBlob: (cb) => cb({ size: 9 }),
        toDataURL: () => 'data:,',
        getContext: () => ({
          globalAlpha: 1,
          globalCompositeOperation: 'source-over',
          fillStyle: '',
          filter: 'none',
          drawImage: () => {},
          fillRect: () => {},
          createLinearGradient: () => ({ addColorStop: () => {} }),
          putImageData: () => {},
          getImageData: (x, y, w, h) => {
            k.nayte = (k.nayte ?? 0) + 1;
            return { data: new Uint8ClampedArray(4 * w * h).fill(k.nayte % 2 ? 40 : 180) };
          },
        }),
      };
      kankaat.push(k);
      return k;
    },
  };
  const ikkuna = {
    ImageData: class { constructor(d, l, k) { Object.assign(this, { d, l, k }); } },
    URL: { createObjectURL: () => 'blob:yksi' },
    setTimeout: (fn, ms) => setTimeout(fn, ms),
    clearTimeout: (id) => clearTimeout(id),
    document: doc,
    Image: class {
      constructor() { this.k = {}; }
      addEventListener(n, fn) { this.k[n] = fn; }
      set src(_) { setTimeout(() => this.k.load?.(), 0); }
    },
  };
  assert.equal(await reliefiTekstuuri({ ruudunLeveys: 390, kokoPallo: true }, doc, ikkuna), 'blob:yksi');
  // koe + tuloskangas + pohja = 3; neljäs olisi vanha apukangas.
  assert.equal(kankaat.length, 3, `kankaita ${kankaat.length}`);
  // Jokainen kangas on vapautettu (mitta 1 × 1) ladonnan jälkeen.
  for (const k of kankaat) assert.equal(k.width, 1, 'kangas jäi muistiin');
});

/* ═══════ 8. AVAUS EI JÄÄ TYHJÄKSI (WebKit-vika 16.9.2026) ════════ */

/*
 * Raamattu, ASTRONAUTIN KAMERA LISÄYS 11 kohta 34; Codexin live-QA
 * asennetusta macOS Safari -sovelluksesta: aktivointi jätti ruudulle
 * tumman pohjan ja ✕:n, ei palloa eikä pisteitä, eikä konsolissa ollut
 * mitään. Nämä vartiot pitävät huolen siitä, ettei tyhjä näkymä voi
 * enää jäädä hiljaiseksi.
 */

test('avauksenPuute nimeää sen, mikä näkymästä puuttuu', () => {
  const taysi = {
    avaruus: true,
    kotelo: { leveys: 390, korkeus: 780 },
    kangas: { leveys: 780, korkeus: 1560 },
    pinnanOsoite: 'blob:https://esimerkki',
    pisteita: 42,
    kontekstiHukassa: false,
  };
  assert.equal(avauksenPuute(taysi), null, 'ehjä näkymä ei saa olla puutteellinen');
  assert.equal(avauksenPuute({}), 'avaruusnakyma');
  assert.equal(avauksenPuute({ ...taysi, kontekstiHukassa: true }), 'webgl-konteksti');
  assert.equal(avauksenPuute({ ...taysi, kangas: { leveys: 0, korkeus: 0 } }), 'kangas');
  assert.equal(avauksenPuute({ ...taysi, kotelo: { leveys: 390, korkeus: 0 } }), 'kotelo');
  assert.equal(avauksenPuute({ ...taysi, pinnanOsoite: '' }), 'pinta');
  assert.equal(avauksenPuute({ ...taysi, pisteita: 0 }), 'pisteet');
  /*
   * LISÄYS 13 kohta 36: yksikään kehys ei piirtynyt. Se on SYY, jonka
   * seurauksia puuttuva pinta ja puuttuvat pisteet ovat — siksi se
   * nimetään ennen niitä. `null` tarkoittaa "ei mitattavissa".
   */
  assert.equal(avauksenPuute({ ...taysi, kehyksia: 0 }), 'kehykset');
  assert.equal(avauksenPuute({ ...taysi, kehyksia: 0, pisteita: 0 }), 'kehykset');
  assert.equal(avauksenPuute({ ...taysi, kehyksia: 3 }), null);
  assert.equal(avauksenPuute({ ...taysi, kehyksia: null }), null);
  /*
   * LISÄYS 13 kohta 37: osoite paikallaan ja 64 pistettä ruudulla,
   * mutta piirtopuskurista luettu pallon keskusta on musta.
   */
  assert.equal(avauksenPuute({ ...taysi, pinnanKirkkaus: 2 }), 'pinta-musta');
  assert.equal(avauksenPuute({ ...taysi, pinnanKirkkaus: 64 }), null);
  assert.equal(avauksenPuute({ ...taysi, pinnanKirkkaus: null }), null);
  // Kehykset selittävät mustankin pinnan: ne tulevat ensin.
  assert.equal(avauksenPuute({ ...taysi, kehyksia: 0, pinnanKirkkaus: 2 }), 'kehykset');
  // Jokaiselle puutteelle on pelaajan kielinen lause, ei koodinimeä.
  for (const nimi of ['avaruusnakyma', 'webgl-konteksti', 'kangas', 'kotelo', 'kehykset',
    'pinta', 'pinta-musta', 'pisteet', 'kirjasto']) {
    assert.equal(typeof PUUTTEEN_SELITE[nimi], 'string', `selite puuttuu: ${nimi}`);
    assert.ok(PUUTTEEN_SELITE[nimi].length > 8, `selite on liian lyhyt: ${nimi}`);
    // Lause, ei koodinimi: iso alkukirjain ja piste lopussa.
    assert.match(PUUTTEEN_SELITE[nimi], /^[A-ZÄÖÅ].*\.$/, `selite ei ole lause: ${nimi}`);
  }
});

/* ═══ KEHYSVAHTI JA PINNAN MITTAUS (LISÄYS 13, kohdat 36 ja 37) ═══ */

test('pinnanKirkkaus piirtää kehyksen ja lukee pallon keskustan', async () => {
  const { pinnanKirkkaus, PINNAN_MUSTAN_KYNNYS } = await import('../js/linssit/satelliitti-avaruus.js');
  const teePallo = (vari, { piirtoja = { n: 0 } } = {}) => {
    const gl = {
      RGBA: 1, UNSIGNED_BYTE: 2,
      isContextLost: () => false,
      readPixels: (x, y, w, h, f, t, ulos) => {
        ulos[0] = vari[0]; ulos[1] = vari[1]; ulos[2] = vari[2]; ulos[3] = 255;
      },
    };
    return {
      renderer: () => ({
        getContext: () => gl,
        domElement: { width: 400, height: 300 },
        render: () => { piirtoja.n += 1; },
      }),
      scene: () => ({}),
      camera: () => ({}),
      piirtoja,
    };
  };
  const piirtoja = { n: 0 };
  const varillinen = teePallo([30, 90, 140], { piirtoja });
  assert.equal(pinnanKirkkaus(varillinen), 140);
  // Mittaus PIIRTÄÄ: ilman omaa kehystä puskuri olisi jo vaihdettu.
  assert.ok(piirtoja.n > 0, 'mittaus ei piirtänyt kehystä');
  const musta = teePallo([0, 0, 0]);
  assert.ok(pinnanKirkkaus(musta) < PINNAN_MUSTAN_KYNNYS);
  // Mittaamattomissa oleva tilanne on null eikä nolla — ei puute.
  assert.equal(pinnanKirkkaus(null), null);
  assert.equal(pinnanKirkkaus({ renderer: () => ({}) }), null);
  const hukassa = teePallo([30, 90, 140]);
  hukassa.renderer().getContext().isContextLost = () => true;
  assert.equal(pinnanKirkkaus({
    ...hukassa,
    renderer: () => ({
      getContext: () => ({ readPixels: () => {}, isContextLost: () => true }),
      domElement: { width: 400, height: 300 },
      render: () => {},
    }),
  }), null);
});

test('musta pinta korjataan ensin materiaalin värillä', async () => {
  const { valkaiseMateriaali } = await import('../js/linssit/satelliitti-avaruus.js');
  /*
   * MITATTU (Mac-sessio 17.9.2026, oikea WebKit ja Chromium): globe.gl
   * asettaa `material.color = new Color(0)` aina kun globeImageUrl on
   * null, ja tekstuurin saavuttua `color = null`. Mustaa EI saa pois
   * `color.set()`illä eikä `needsUpdate`illa — materiaalille on
   * annettava UUSI Color-olio.
   */
  class Vari {
    constructor(hex) { this.hex = hex; }

    getHex() { return this.hex; }

    setHex(h) { this.hex = h; return this; }
  }
  // 1. Väri on null (kirjasto nollasi sen tekstuurin saavuttua).
  const nollattu = { color: null, specular: new Vari(0x111111), needsUpdate: false };
  assert.equal(valkaiseMateriaali(nollattu), true);
  assert.equal(nollattu.color.getHex(), 0xffffff, 'väri ei vaihtunut valkoiseksi');
  assert.equal(nollattu.needsUpdate, true);
  // 2. Väri on musta (kirjasto maalasi sen null-osoitteella).
  const musta = { color: new Vari(0), specular: new Vari(0x111111), needsUpdate: false };
  assert.equal(valkaiseMateriaali(musta), true);
  assert.equal(musta.color.getHex(), 0xffffff);
  // 3. Lähtöväri palautetaan pyydettäessä (purku).
  const palautus = { color: null, specular: new Vari(0x111111), needsUpdate: false };
  valkaiseMateriaali(palautus, 0x336699);
  assert.equal(palautus.color.getHex(), 0x336699);
  // 4. Ei materiaalia tai ei Color-luokkaa → ei kaadu, palauttaa false.
  assert.equal(valkaiseMateriaali(null), false);
  assert.equal(valkaiseMateriaali({ color: null, specular: null }), false);
});

test('linssi valkaisee materiaalin sekä avatessa että sulkiessa (lähde)', async () => {
  const { readFile } = await import('node:fs/promises');
  const lahde = await readFile(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  /*
   * SULKU ON SE, JOKA MUSTAA PALLON: `globeImageUrl(null)` panee
   * globe.gl:n maalaamaan materiaalin mustaksi, ja musta jää
   * odottamaan SEURAAVAA avausta. Väri on siis palautettava heti
   * saman kutsun perään — ja varmuudeksi myös avauksessa.
   */
  const sulku = lahde.indexOf('pallo.globeImageUrl(lahto.kuvaUrl ?? null)');
  assert.ok(sulku > 0, 'sulun globeImageUrl-kutsua ei löytynyt');
  const sulunJalkeen = lahde.slice(sulku, sulku + 700);
  assert.match(sulunJalkeen, /valkaiseMateriaali\(materiaali, varinLahto\)/,
    'sulku ei palauta materiaalin väriä');
  // Avauksessa väri pakotetaan ENNEN oman tekstuurin asetusta.
  const avaus = lahde.indexOf('valkaiseMateriaali(materiaali);');
  assert.ok(avaus > 0 && avaus < sulku, 'avaus ei valkaise materiaalia');
  /*
   * VARAPOLKU ON KAKSIVAIHEINEN, ja järjestys on mitattu: ensin VÄRI
   * (Mac-sessio: globe.gl maalasi materiaalin mustaksi), vasta sitten
   * tekstuurin vaihto (pallo-musta-erä: ladontakangas jäi tyhjäksi).
   * Väri ei auta tyhjään tekstuuriin eikä tekstuuri mustaan väriin.
   */
  assert.match(lahde, /askel: 1, toimenpide: valkaistiin \? 'vari-valkoiseksi'/);
  assert.match(lahde, /askel: 2, toimenpide: 'vyohykepallo'/);
  const askel1 = lahde.indexOf("askel: 1, toimenpide");
  const askel2 = lahde.indexOf("askel: 2, toimenpide");
  assert.ok(askel1 > 0 && askel2 > askel1, 'väri ei tule ennen tekstuurin vaihtoa');
});

test('kehysvahti pakottaa piirron, kun kehyslaskuri ei etene', async () => {
  const { varmistaKehykset, KEHYSVAHDIN_VALI_MS } = await import('../js/linssit/satelliitti-avaruus.js');
  const kutsut = [];
  let kehyksia = 0;
  const pallo = {
    renderer: () => ({ info: { render: { frame: kehyksia } } }),
    pauseAnimation: () => kutsut.push('pause'),
    resumeAnimation: () => { kutsut.push('resume'); kehyksia += 1; },
  };
  const kellot = [];
  const ikkuna = {
    document: { visibilityState: 'visible' },
    setInterval: (fn) => { kellot.push(fn); return kellot.length; },
    clearInterval: (id) => { kellot[id - 1] = null; },
  };
  const vahti = varmistaKehykset(pallo, { heraa: () => kutsut.push('heraa') }, ikkuna);
  assert.equal(vahti.tila().kehyksia, 0, 'alussa kehyksiä ei ole');
  // Laskuri ei etene → vahti pakottaa piirron PARINA (pause + resume).
  kellot[0]();
  assert.deepEqual(kutsut.slice(0, 3), ['pause', 'resume', 'heraa']);
  assert.ok(vahti.tila().kehyksia > 0, 'pakotettu kehys ei näkynyt laskurissa');
  // Kun laskuri etenee itsestään, ei pakoteta enää.
  const ennen = kutsut.length;
  kehyksia += 5;
  kellot[0]();
  assert.equal(kutsut.length, ennen, 'vahti pakotti turhaan');
  // Taustalla (piilotettu sivu) ei pakoteta lainkaan.
  ikkuna.document.visibilityState = 'hidden';
  const ennenPiilossa = kutsut.length;
  kellot[0]();
  assert.equal(kutsut.length, ennenPiilossa, 'piilossa ei saa pakottaa');
  // Purku ottaa kellon pois.
  vahti.pura();
  assert.equal(kellot[0], null);
  assert.ok(KEHYSVAHDIN_VALI_MS > 0 && KEHYSVAHDIN_VALI_MS <= 1000);
});

test('linssin jokainen avausvaihe ajetaan vartijan läpi', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti.js', import.meta.url), 'utf8');
  // Yksikään vaihe ei saa viedä koko avausta: pisteet ja poistumistie
  // ovat tärkeämpiä kuin ääni tai pulu.
  for (const nimi of ['avaruus', 'pulu', 'aanet', 'linssiaani', 'pisteet']) {
    assert.ok(lahde.includes(`vaihe('${nimi}'`), `vaihe puuttuu: ${nimi}`);
  }
  // Kaatunut vaihe kirjataan mutta EI heitetä eteenpäin.
  assert.match(lahde, /kaatuneetVaiheet\.push\(nimi\)/);
  // Kohdepisteet lisätään vasta äänen jälkeen — mutta lisätään aina.
  assert.ok(lahde.indexOf("vaihe('linssiaani'") < lahde.indexOf("vaihe('pisteet'"));
});

test('vartija näyttää ilmoituksen, jos näkymä ei valmistu', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti.js', import.meta.url), 'utf8');
  assert.match(lahde, /import \{ naytaLinssivirhe, poistaLinssivirhe \} from '\.\.\/linssivirhe\.js';/);
  // Kaksi tarkistusta: varhainen (ei mitään alkanut) ja aikakatko.
  assert.match(lahde, /ajastaVartija\(VARTIJAN_VARHAINEN_MS, false\)/);
  assert.match(lahde, /ajastaVartija\(VARTIJAN_AIKAKATKO_MS, true\)/);
  assert.ok(VARTIJAN_VARHAINEN_MS < VARTIJAN_AIKAKATKO_MS, 'varhainen tarkistus ei saa olla myöhemmin');
  // Aikakatko on pitempi kuin reliefin oma (8 s), jottei hidas kuva
  // laukaise ilmoitusta turhaan.
  assert.ok(VARTIJAN_AIKAKATKO_MS > 8000);
  // Ilmoitus poistuu itsestään, jos näkymä valmistuukin myöhässä.
  assert.match(lahde, /if \(!puute\) \{[\s\S]{0,140}virheKahva\?\.pura\?\.\(\);/);
  // Purku ottaa kellot ja ilmoituksen pois.
  assert.match(lahde, /clearTimeout\(varhainen\)/);
  assert.match(lahde, /clearTimeout\(vartijanKello\)/);
  assert.match(lahde, /poistaLinssivirhe\(\);/);
});

test('pallokirjastolla on aikakatko ja välimuistin ohittava uusinta', () => {
  const lahde = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  assert.ok(PALLOKIRJASTON_AIKAKATKO_MS > 0 && PALLOKIRJASTON_AIKAKATKO_MS <= 20000);
  assert.ok(PALLOKIRJASTON_YRITYKSET >= 2, 'yksi yritys ei riitä WebKitissä');
  // Ensimmäinen yritys on puhdas osoite (välimuisti saa palvella).
  assert.equal(pallokirjastonOsoite(0), PALLO_KIRJASTO);
  // Toinen kiertää palvelutyöntekijän korin: kori hakee täsmäosoitteella.
  const uusinta = pallokirjastonOsoite(1, 12345);
  assert.notEqual(uusinta, PALLO_KIRJASTO);
  assert.ok(uusinta.startsWith(PALLO_KIRJASTO));
  assert.match(uusinta, /[?&]uusi=1-12345$/);
  // Aikakatko on koodissa eikä pelkkä vakio: latausyritys ratkaistaan.
  assert.match(lahde, /kirjaston aikakatko/);
  assert.match(lahde, /setTimeout\?\.\(\(\) => paata\(new Error\('kirjaston aikakatko'\)\), aikakatko\)/);
  // Epäonnistunut ketju nollaa muistin, jotta uusi avaus saa yrittää.
  assert.match(lahde, /kirjastoLupaus = null;\n {4}throw viimeisin/);
});

test('linssivirhe näkyy ruudulla ja katoaa napista', () => {
  const tehdyt = [];
  const luoElementti = () => {
    const el = {
      lapset: [], kuuntelijat: {}, tyyli: '', textContent: '', id: '',
      setAttribute(n, v) { if (n === 'style') el.tyyli = v; el[n] = v; },
      appendChild(lapsi) { el.lapset.push(lapsi); return lapsi; },
      addEventListener(n, f) { el.kuuntelijat[n] = f; },
      remove() { doc.body.lapset = doc.body.lapset.filter((x) => x !== el); },
    };
    tehdyt.push(el);
    return el;
  };
  const doc = {
    body: { lapset: [], appendChild(el) { doc.body.lapset.push(el); return el; } },
    createElement: luoElementti,
    getElementById: (id) => doc.body.lapset.find((el) => el.id === id) ?? null,
  };
  let suljettu = 0;
  const kahva = naytaLinssivirhe({
    otsikko: 'Astronautin kamera ei käynnistynyt',
    syy: 'Maapallon pintakuva ei latautunut.',
    onSulje: () => { suljettu += 1; },
    doc,
    ikkuna: { location: { search: '' } },
  });
  assert.equal(doc.body.lapset.length, 1, 'ilmoitus ei päätynyt ruudulle');
  assert.equal(linssivirheNakyy(doc), true);
  assert.equal(kahva.el.id, LINSSIVIRHEEN_TUNNUS);
  assert.equal(kahva.el.role, 'alert', 'ruudunlukija ei saa ilmoitusta');
  // Nappi on kahvan viimeinen lapsi ilman pallodiagia; se sulkee linssin.
  const nappi = kahva.el.lapset.find((el) => el.kuuntelijat.click);
  assert.ok(nappi, 'ulospääsynappi puuttuu');
  nappi.kuuntelijat.click();
  assert.equal(suljettu, 1);
  assert.equal(linssivirheNakyy(doc), false, 'ilmoitus jäi ruudulle');
  // Toinen näyttö ei kasaa kahta ilmoitusta päällekkäin.
  naytaLinssivirhe({ doc, ikkuna: { location: { search: '' } } });
  naytaLinssivirhe({ doc, ikkuna: { location: { search: '' } } });
  assert.equal(doc.body.lapset.length, 1);
  poistaLinssivirhe(doc);
  assert.equal(linssivirheNakyy(doc), false);
});

test('pallodiag näyttää vaiheet vain lipulla ja ilmoitus saa ne mukaansa', () => {
  assert.equal(pallodiagPaalla({ location: { search: '?pallodiag=1' } }), true);
  assert.equal(pallodiagPaalla({ location: { search: '?muu=1' } }), false);
  pallodiag('koevaihe', { luku: 7 }, { location: { search: '' } });
  assert.match(pallodiagTeksti(), /koevaihe luku=7/);
  // Avausketjun vaiheet kirjataan samaan lokiin kuin tekstuuriketju.
  const avaruus = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  for (const vaihe of ['avaruus-alku', 'avaruus-pinta', 'avaruus-valmis']) {
    assert.ok(avaruus.includes(`pallodiag('${vaihe}'`), `vaihe puuttuu lokista: ${vaihe}`);
  }
  const pallo = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  assert.ok(pallo.includes("pallodiag('kirjasto'"), 'kirjaston lataus ei kirjaa vaihetta');
});

test('uudet moduulit ovat huoltokartalla (sw.js)', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/pallodiag.js'"), 'pallodiag puuttuu SHELListä');
  assert.ok(sw.includes("'./js/linssivirhe.js'"), 'linssivirhe puuttuu SHELListä');
});

test('linssin avaus ilmoittaa itsestään, jos lautaa ei ole', () => {
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /this\.varmistaLinssinAvaus\(tunnus\);/);
  assert.match(ui, /varmistaLinssinAvaus\(tunnus\) \{/);
  // Vartija ei saa jäädä elämään kuolleeseen instanssiin.
  assert.match(ui, /clearTimeout\(this\.linssinAvausVahti\);/);
  assert.match(ui, /Maapalloa ei saatu ladattua/);
});
