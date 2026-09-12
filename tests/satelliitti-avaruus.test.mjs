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
  ZOOMIN_KAUIN, ZOOMIN_LAHIN,
  avaaAvaruusnakyma, avausKorkeus, halkaisijaRuudulla, maapallonVarit, nimetNakyvat,
  pilvipaino, vyohykeVari, zoomirajat,
} from '../js/linssit/satelliitti-avaruus.js';
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
    // Pintaan ei sukelleta: lähinkin raja on selvästi kaukana pinnasta
    // (laudan oma lähin on 0,02–0,07).
    assert.ok(min > 0.5, `${nimi}: lähin raja päästi pintaan (${min})`);
    // Pallo ei katoa: kauimmillaankin se on yli kolmanneksen ruudusta.
    const pienin = halkaisijaRuudulla(max, { korkeus: mitat.korkeus });
    assert.ok(pienin > Math.min(mitat.leveys, mitat.korkeus) * 0.33,
      `${nimi}: pallo kutistui liikaa (${pienin.toFixed(0)} px)`);
  }
});

test('zoomikaista on kapea — ei kartan täyttä skaalaa', () => {
  assert.ok(ZOOMIN_LAHIN > 0.4 && ZOOMIN_LAHIN < 1);
  assert.ok(ZOOMIN_KAUIN > 1 && ZOOMIN_KAUIN < 1.6);
  // Koko kaista on alle kolminkertainen; laudalla suhde on yli satakertainen.
  assert.ok(ZOOMIN_KAUIN / ZOOMIN_LAHIN < 3);
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
  // Oletus avaruusnäkymässä: nimi läpinäkyvä; luokka sytyttää sen.
  assert.match(css, /body\.satelliitti-avaruus \.satelliitti-nimi \{[^}]*opacity: 0;/);
  assert.match(css, new RegExp(`body\\.satelliitti-avaruus\\.${NIMIEN_LUOKKA} \\.satelliitti-nimi \\{ opacity: 1; \\}`));
  // Häivytys, ei välähdys — ja liikkeenvähennyksellä ei siirtymää.
  assert.match(css, /transition: opacity 220ms ease;/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*?satelliitti-nimi \{ transition: none; \}/);
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
    controls: () => ({
      addEventListener: (n, f) => kuuntelijat.push([n, f]),
      removeEventListener: (n, f) => {
        const i = kuuntelijat.findIndex(([a, b]) => a === n && b === f);
        if (i >= 0) kuuntelijat.splice(i, 1);
      },
    }),
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
  assert.equal(lauta.rajat.length, 1);
  assert.ok(lauta.rajat[0].min > 0.5 && lauta.rajat[0].max > lauta.rajat[0].min);
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
