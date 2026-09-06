import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { pallonKaupungit, sukelluskohta, pallonLaatta, laatatSaatavilla, PALLO_KIRJASTO, PALLO_TEKSTUURI, PALLO_TEKSTUURIVERSIO, PALLO_TEKSTUURITASO, PALLO_LAATAT, PALLO_LAATTAVERSIO, PALLO_LAATTAKANSIO, laattatasoMax, PALLO_LAATTATASO_MAX, PALLO_SUKELLUSLEVEYS, laattakynnykset, lepokerroin, LAATU_TERAVYYS, LAATU_TERAVYYS_KAUKO, LAATU_KAUKORAJA, laatuTeravyys, napakerroin, NAPAKERROIN_MIN, NAPAKANNEN_LEVEYS, NAPAKANNEN_HAIVEPEITTO, NAPAKANSI_POHJOINEN, NAPAKANSI_ETELA, asennaNapakannet, kolmiulotteinen, LAATU_LEPOVIIVE_MS, LAATU_LIIKEVIIVE_MS, LAATU_PIKSELISUHDE_LEPO, LAATU_PIKSELISUHDE_LIIKE } from '../js/pallo.js';
import { laatanReunat, rivinLeveysaste, julisteenLeveysvali, tasonLaatat, lahdetaso, laattojenKansio, LAATTA, tayteRivilla, nostaReuna, JAA_RAJA, JAA_SAVY, MERI_SAVY } from '../tools/tee-pallolaatat.mjs';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LINSSI as PALLOLINSSI } from '../js/linssit/pallo.js';
import { PERUSLINSSIT, omistetut } from '../js/linssit/omistus.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { arkinPikseli, pinnoitteenAvain, pinnoitteenMitat, PINNOITE } from '../tools/tee-pallotekstuuri.mjs';
// Vaihe 5c: laatat offline, varapolku ja turvatila.
import {
  ESILATAUKSEN_KAUPUNKITASO, ESILATAUKSEN_MAAILMATASO, esilataaPallolaatat, esilatauksenLaatat,
  esilataaLentoreitti, laatanKoordinaatit, reitinLaatat,
  REITIN_ESILATAUSTASOT, REITIN_LASKEUTUMISTASO,
} from '../js/pallo.js';
import {
  PALLON_SALLITTU_VENYTYS, PALLOLAUDAN_SAAPUMISLEVEYS, PALLOLAUDAN_SIIRTOLEVEYS,
  PALLOLAUDAN_LAHIN_LEVEYS, PALLO_KORKEUS_MIN, PYRAMIDIN_SYVIN_PX_ASTE,
  korkeusLeveydesta, laatanTarkkuus, laattojenVenytys, lahinKorkeus, lahinLeveys,
} from '../js/pallolauta/kamera.js';
// Työpöytäselaimen rulla: kaksi sormea panoroi, cmd zoomaa (omistaja 5.9.2026).
import {
  PANOROINNIN_HERKKYYS, PANOROINNIN_KOHTISUORA_RAJA, PANOROINNIN_LEVEYSRAJA, RULLAN_LIUKU_MS,
  RULLAN_RIVI_PX, RULLAN_SIVU_PX, RULLAN_SUORA_RAJA, rullanAskel,
} from '../js/pallo.js';
import { OSOITTIMEN_JALKIVIIVE_MS } from '../js/pallolauta/lauta.js';
import {
  PALLON_TURVATILAN_RAJA, PALLON_TURVATILAN_UNOHDUS_MS, nollaaPallonKaatumiset, palloKaatui,
  palloTurvatilassa, pallonKaatumiset,
} from '../js/ui-apurit.js';

/*
 * KARTTAPALLO (omistaja 4.9.2026: "Globe GL toimii hienosti"; illalla
 * "Tee z4 ainoaksi ja älä lisää mitään sen päälle. Eli ei reittejä tai
 * nimiä. Lisää pallo yhdeksi linssiksi matkalaukkuun ja ota pois
 * kehittäjä valikosta"). Pallo on pelkkä pinnoite; napautus sukeltaa
 * laudalle napautettuun kohtaan. Kirjasto ja pinnoite tulevat ämpäristä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('laudalta asteiksi on projisoinnin käänteinen ja osuu tunnettuihin kaupunkeihin', () => {
  const lontoo = MAAILMANKARTTA.cities.find((c) => c.id === 'lontoo');
  const a = laudaltaAsteiksi('maailmankartta', lontoo.x, lontoo.y);
  assert.ok(Math.abs(a.lat - 51.5) < 0.4 && Math.abs(a.lon - (-0.12)) < 0.4, `Lontoo ${a.lat}, ${a.lon}`);
  for (const [lon, lat] of [[24.94, 60.17], [-43.2, -22.9], [139.7, 35.7], [-175, 10]]) {
    const p = projisoiLaudalle('maailmankartta', lon, lat);
    const takaisin = laudaltaAsteiksi('maailmankartta', p.x, p.y);
    assert.ok(Math.abs(takaisin.lat - lat) < 1e-6 && Math.abs(takaisin.lon - lon) < 1e-6, `${lon},${lat} → ${takaisin.lon},${takaisin.lat}`);
  }
  assert.equal(laudaltaAsteiksi('maailmankartta', NaN, 1), null);
});

test('pallon kaupungit tulevat laudalta ja napautus sukeltaa napautettuun kohtaan', () => {
  const kaupungit = pallonKaupungit(MAAILMANKARTTA, new Set(['lontoo', 'pariisi']));
  assert.equal(kaupungit.length, MAAILMANKARTTA.cities.length);
  const lontoo = kaupungit.find((k) => k.id === 'lontoo');
  assert.ok(lontoo.kayty && lontoo.alku && lontoo.x === 5829.5, 'Lontoo: käyty, aloitus, laudan x säilyy kameran kotia varten');
  assert.ok(kaupungit.every((k) => Math.abs(k.lat) <= 90 && Math.abs(k.lon) <= 180));
  // Napautus Lontoon asteisiin osuu Lontoon laudan koordinaattiin.
  const kohta = sukelluskohta(lontoo.lat, lontoo.lon);
  assert.ok(Math.abs(kohta.x - lontoo.x) < 1e-6 && Math.abs(kohta.y - lontoo.y) < 1e-6, JSON.stringify(kohta));
  assert.equal(sukelluskohta(NaN, 0), null);
  /*
   * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026 täsmensi 4.9.:n
   * "älä lisää mitään sen päälle"): valikkopallo (js/pallo.js) on yhä
   * pelkkä pinnoite, ja pallolaudalla (js/pallolauta/) sallitaan VAIN
   * pelin merkit — sallittujen kerrosten lista on lauta.js:n
   * PALLOLAUDAN_KERROKSET (tests/pallolauta.test.mjs vartioi sen).
   * Kartan kerrokset (nimet, reitit, renkaat) ovat kiellettyjä kummallakin.
   */
  const pallo = lue('../js/pallo.js');
  for (const kielletty of ['pointsData', 'labelsData', 'arcsData', 'ringsData', 'htmlElementsData', 'pathsData']) {
    assert.ok(!pallo.includes(`.${kielletty}(`), `${kielletty}: valikkopallon päälle ei lisätä mitään (omistaja 4.9.2026)`);
  }
  // Pallolauta on kansio (lauta, kamera, merkit, reitit, siirto — vaihe 2):
  // kartan kerrokset kiellettyjä kaikissa, pelin merkit jossakin niistä.
  const kansio = new URL('../js/pallolauta/', import.meta.url);
  const pallolauta = readdirSync(kansio).map((nimi) => readFileSync(new URL(nimi, kansio), 'utf8')).join('\n');
  // polygonsData on 5.9.2026 alkaen LINSSIN kerros pallolaudalla
  // (karttapallo.md luku 10.1, js/pallolauta/linssit.js): peli ei piirrä
  // sinne mitään, joten kartan kerrosten kielto koskee muita.
  for (const kielletty of ['labelsData', 'ringsData', 'hexBinPointsData', 'tilesData']) {
    assert.ok(!pallolauta.includes(`.${kielletty}(`), `${kielletty}: pallolaudalle ei piirretä karttaa kerroksena (Raamattu 5.9.2026)`);
  }
  for (const sallittu of ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData']) {
    assert.ok(pallolauta.includes(`.${sallittu}(`), `${sallittu}: pelin merkit ovat pallolaudalla (Raamattu 5.9.2026)`);
  }
  assert.match(pallo, /\.onGlobeClick\(/);
  // Nipistys ei ole napautus (iPhone-bugi 4.9.2026): toinen sormi
  // merkitsee eleen nipistykseksi, ja napautus hylätään sen ajaksi.
  assert.match(pallo, /if \(sormet\.nipistys\) return;/);
  assert.match(pallo, /if \(sormet\.alhaalla > 1\) sormet\.nipistys = true;/);
  assert.match(pallo, /addEventListener\('pointercancel', irrota\)/);
  // Sormi pysyy kartan kohdassa: kiertonopeus lasketaan korkeudesta joka muutoksessa.
  assert.match(pallo, /ohjaimet\.rotateSpeed = korkeus \* Math\.tan\(\(kamera\.fov \/ 2\) \* \(Math\.PI \/ 180\)\) \/ Math\.PI;/);
  assert.match(pallo, /ohjaimet\.addEventListener\('change', tahdistaVeto\)/);
});

test('kirjasto ja pinnoite tulevat pelin ämpäristä, ei reposta', () => {
  assert.match(PALLO_KIRJASTO, /^https:\/\/(?:media\.matkakirja\.app|pub-[a-z0-9]+\.r2\.dev)\/vendor\/globe\.gl-\d+\.\d+\.\d+\.min\.js$/);
  assert.equal(PALLO_TEKSTUURITASO, 4, 'z4 on ainoa pinnoite (omistaja 4.9.2026)');
  assert.equal(PALLO_TEKSTUURI, `https://media.matkakirja.app/${pinnoitteenAvain(PALLO_TEKSTUURIVERSIO, 4)}`);
  assert.match(PALLO_TEKSTUURI, /tekstuuri-z4\.jpg$/);
  assert.deepEqual(pinnoitteenMitat(4), { leveys: 8192, korkeus: 4096, laatu: 82 });
  assert.match(lue('../.github/workflows/tee-pallotekstuuri.yml'), /default: '4'/);
  assert.ok(PALLO_SUKELLUSLEVEYS > 300 && PALLO_SUKELLUSLEVEYS < 2000);
  // Workflow vie samat kaksi: pinnoitteen avaimen ja kirjaston vendor-polun.
  const wf = lue('../.github/workflows/tee-pallotekstuuri.yml');
  assert.match(wf, /npm install --no-save --no-fund --no-audit sharp/);
  assert.match(wf, /s3:\/\/\$\{R2_BUCKET\}\/vendor\/globe\.gl-\$\{v\}\.min\.js/);
  assert.match(wf, /cat pallotekstuuri-ulos\/avain\.txt/);
  assert.equal(PINNOITE.leveys, PINNOITE.korkeus * 2, 'tasavälinen pinnoite on 2:1');
});

test('laatoitettu pallo: Mercator-laatat ämpäristä, z4-tekstuuri varana', async () => {
  // Kirjasto on laattamoottorin tuova 2.46 tai uudempi.
  const versio = PALLO_KIRJASTO.match(/globe\.gl-(\d+)\.(\d+)\.\d+\.min\.js$/);
  assert.ok(versio && (Number(versio[1]) > 2 || Number(versio[2]) >= 46), PALLO_KIRJASTO);
  assert.equal(PALLO_LAATTAKANSIO, `${PALLO_LAATTAVERSIO}-nostot-c`, 'kansio c: etelan reunasavyt tasoitettu (v1583-v1589), valmis 6.9.2026 klo 00.40');
  assert.equal(PALLO_LAATAT, `https://media.matkakirja.app/${laattojenKansio(PALLO_LAATTAVERSIO, true, 'c')}`);
  assert.equal(pallonLaatta(3, 5, 4), `${PALLO_LAATAT}4/3/5.jpg`);
  assert.equal(PALLO_LAATTATASO_MAX, 8, 'taso 8 kaytossa 5.9.2026');
  /*
   * LUETTELO REVALIDOIDAAN, LAATAT EIVÄT (6.9.2026): laatat.json muuttuu
   * saman nimen alla joka poltossa (ämpärin max-age 3600), joten
   * `force-cache` jätti palaavan pelaajan vanhaan tasot.max-arvoon —
   * taso 8 valmistui 6.9. klo 04.50 eikä olisi tullut käyttöön.
   * Verkon katketessa kappale haetaan vielä korista (lentokonetila).
   */
  const tuore = await import(`../js/pallo.js?luettelo=${Date.now()}`);
  const luettelovastaus = { ok: true, json: async () => ({ tasot: { min: 0, max: 8 } }) };
  const pyynnot = [];
  assert.deepEqual(
    await tuore.laatatSaatavilla((osoite, valinnat) => { pyynnot.push(valinnat?.cache); return Promise.resolve(luettelovastaus); }),
    { tasot: { min: 0, max: 8 } },
  );
  assert.deepEqual(pyynnot, ['no-cache'], 'luettelo on revalidoitava, ei force-cache');
  const lento = await import(`../js/pallo.js?lentokone=${Date.now()}`);
  const lennonPyynnot = [];
  assert.deepEqual(
    await lento.laatatSaatavilla((osoite, valinnat) => {
      lennonPyynnot.push(valinnat?.cache);
      return valinnat?.cache === 'no-cache' ? Promise.reject(new Error('offline')) : Promise.resolve(luettelovastaus);
    }),
    { tasot: { min: 0, max: 8 } },
  );
  assert.deepEqual(lennonPyynnot, ['no-cache', 'force-cache'], 'ilman verkkoa luettelo korista');
  // Luettelon puute tai virhe → varatekstuuri, ei kaatumista.
  assert.equal(await laatatSaatavilla(async () => ({ ok: false })), null);
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 7 } }), 7, 'varakansio ei kanna tasoa 8: vanha napalakki sekoittuisi (5.9.2026 klo 17.30)');
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 6 } }), 6);
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 8 } }), 8, 'luettelon 8 riittaa, kun sarja b kantaa sen');
  assert.match(pallonLaatta(3, 5, 8), /laatat\/2026-09-03a-nostot-c\/8\/3\/5\.jpg$/, 'taso 8 samasta kansiosta (varakansio pois 5.9.2026 klo 17.30)');
  assert.match(pallonLaatta(3, 5, 7), /laatat\/2026-09-03a-nostot-c\/7\/3\/5\.jpg$/, 'tasot 0-7 nostosarjasta c');
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 9 } }), PALLO_LAATTATASO_MAX);
  assert.equal(laattatasoMax(null), PALLO_LAATTATASO_MAX);
  const pallo = lue('../js/pallo.js');
  // Laattamoottorin katto on luettelon syvin taso; laattakerroksen kanssa
  // (erä E1) kirjaston moottori jää karkeaksi pohjaksi (POHJAN_TASO_MAX).
  assert.match(pallo, /globeTileEngineUrl\(pallonLaatta\)\.globeTileEngineMaxLevel\(/);
  assert.match(pallo, /const syvin = laattatasoMax\(laatat\);/);
  assert.match(pallo, /Math\.min\(syvin, POHJAN_TASO_MAX\) : syvin,/);
  assert.match(pallo, /pallo\.globeImageUrl\(PALLO_TEKSTUURI\)/);
  // Laattatyökalu: slippy map -geometria ja lähdetasot.
  assert.equal(LAATTA, 256);
  assert.deepEqual(laatanReunat(0, 0, 0).lansi, -180);
  assert.ok(Math.abs(laatanReunat(1, 1, 0).pohjoinen - 85.0511) < 1e-3);
  assert.ok(Math.abs(rivinLeveysaste(1, 1, 255) + 85.0511) < 0.2);
  assert.equal(lahdetaso(0), 0); assert.equal(lahdetaso(7), 6);
  assert.equal(tasonLaatat(3).length, 64);
  assert.equal(tasonLaatat(3, [-10, 40, 30, 70]).length, 6, 'Eurooppa osuu kuuteen Z3-laattaan (2 saraketta x 3 rivia)');
  const luettelo = { projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 }, rajaus: { x: 0, y: -611.3, w: 12000, h: 6422.7 }, kehys: { yla: 232, ala: 240 } };
  const vali = julisteenLeveysvali(luettelo);
  // Vain kartta: kartussi ja kehys (rajauksen yläpuoli, arkin alakehys etelässä) jäävät
  // pois (5.9.2026), mutta kartta ulottuu rajauksen yläreunaan ≈ 84° N — Huippuvuoret ja
  // Frans Joosefin maa eivät katoa (5.9.2026 iltapäivä: "Miksi hattu näkyy?").
  assert.ok(vali.pohjoinen > 83.9 && vali.pohjoinen < 84.1, JSON.stringify(vali));
  assert.ok(vali.etela < -60 && vali.etela > -64, JSON.stringify(vali));
  const ilmanKehysta = julisteenLeveysvali({ ...luettelo, kehys: undefined });
  assert.ok(ilmanKehysta.etela < -65 && ilmanKehysta.etela > -67, 'ilman kehystietoa rajaus sellaisenaan');
  // Workflow vie laatat ja luettelon oikeaan kansioon.
  const wf = lue('../.github/workflows/tee-pallolaatat.yml');
  assert.match(wf, /cat pallolaatat-ulos\/kansio\.txt/);
  assert.match(wf, /--include '\*\.jpg'/);
  assert.match(wf, /laatat\.json/);
  // Nostotaso (nimet, karttanostot) poltetaan omaan kansioon (5.9.2026).
  assert.equal(laattojenKansio('2026-09-03a', true), 'julisteet/pallo/laatat/2026-09-03a-nostot/');
  assert.match(wf, /--nostot/);
  // Muuttunut piirto → uusi kansio (laatat vuoden välimuistissa): --tunniste (5.9.2026).
  assert.equal(laattojenKansio('2026-09-03a', true, 'b'), 'julisteet/pallo/laatat/2026-09-03a-nostot-b/');
  assert.match(wf, /--tunniste \{0\}/);
  assert.match(wf, /inputs\.tunniste/);
  // Napalakki: pohjoisessa täyte on merta napaan asti, etelässä meri liukuu jääksi ilman rajaa.
  assert.equal(JAA_RAJA.pohjoinen, null);
  assert.deepEqual(tayteRivilla(85, [200, 194, 175]), [200, 194, 175], 'Jäämeri on merta');
  assert.deepEqual(tayteRivilla(-69, [200, 194, 175]), [200, 194, 175]);
  assert.deepEqual(tayteRivilla(-85, [200, 194, 175]), JAA_SAVY, 'Etelämanner on jäätä');
  const puoli = tayteRivilla(JAA_RAJA.etela - 2, [200, 194, 175]);
  assert.ok(puoli[0] > 200 && puoli[0] < JAA_SAVY[0], `liuku ${puoli}`);
  assert.deepEqual(tayteRivilla(80), MERI_SAVY, 'oletus ilman mittausta');
  // Reunavarjon nosto: merenkaltainen tumma pikseli nousee merisävyyn, maa ja rantaviiva eivät.
  const meri = [200, 194, 175];
  const puskuri = Uint8Array.from([189, 181, 162, 235, 215, 150, 90, 80, 60, 200, 194, 175]);
  assert.equal(nostaReuna(puskuri, 0, meri, 1), true);
  assert.deepEqual([...puskuri.slice(0, 3)], meri, 'varjo → meri');
  assert.equal(nostaReuna(puskuri, 3, meri, 1), false, 'maa (kyllainen) jää');
  assert.equal(nostaReuna(puskuri, 6, meri, 1), false, 'rantaviiva (tumma) jää');
  assert.equal(nostaReuna(puskuri, 9, meri, 0), false, 'kaistan ulkopuolella ei nosteta');
  assert.deepEqual([...puskuri.slice(3)], [235, 215, 150, 90, 80, 60, 200, 194, 175]);
  // Liike jatkuu sormen irrottua: kitka ja kynnys (5.9.2026).
  const pallo2 = lue('../js/pallo.js');
  assert.match(pallo2, /const VAUHTI_KITKA = 0\.0028;/);
  assert.match(pallo2, /requestAnimationFrame\(\(\) => liu\(/);
});

/*
 * NAPAKANNET (omistaja 5.9.2026 klo 15 Suomen aikaa, kuvakaappaus
 * Huippuvuorilta: "Miksi hattu näkyy?"). Kaksi ohutta pallokalottia
 * peittää sen, mitä laatoista ei voi poistaa: Globe.gl:n venytetyn
 * napalakin ja laattaverkkojen rivisauman. Kannen leveysaste ja
 * materiaaliluokka mitattiin selaimessa (js/pallo.js kertoo mittaukset).
 */
test('napakannet peittävät sauman laattojen omalla sävyllä eivätkä koske Huippuvuoriin', () => {
  // Kansi alkaa mitatun renkaan (83,7–84,25°) alapuolelta mutta jättää
  // Grönlannin pohjoiskärjen, Frans Joosefin maan ja Huippuvuoret näkyviin.
  assert.ok(NAPAKANNEN_LEVEYS <= 83.7, `kansi ei peitä rengasta: ${NAPAKANNEN_LEVEYS}`);
  assert.ok(NAPAKANNEN_LEVEYS > 82, `kansi söisi karttaa: ${NAPAKANNEN_LEVEYS}`);
  assert.ok(NAPAKANNEN_LEVEYS > 81.9, 'Frans Joosefin maa (81,9° N) jää kannen alta näkyviin');
  // Sävyt ovat laattatyökalun täytesävyt: pohjoinen merta, etelä jäätä.
  const hex = (rgb) => `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  assert.equal(NAPAKANSI_ETELA, hex(JAA_SAVY), 'etelän kansi on JAA_SAVY');
  const pohjoinen = [201, 194, 175]; // tools/tee-pallolaatat.mjs mittaama Jäämeri
  assert.equal(NAPAKANSI_POHJOINEN, hex(pohjoinen));
  assert.ok(pohjoinen.every((v, i) => Math.abs(v - MERI_SAVY[i]) <= 10), 'pohjoinen kansi on merisävyä');
  // Kannet asennetaan laattamoottorihaarasta, ja niitä on kaksi.
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /globeTileEngineMaxLevel\([\s\S]{0,200}?\);\n\s*asennaLaatunosto\(pallo, kotelo\);\n\s*asennaNapakannet\(pallo\);/);
  assert.match(pallo, /kansi\(false, NAPAKANSI_POHJOINEN/);
  assert.match(pallo, /kansi\(true, NAPAKANSI_ETELA/);
  assert.match(pallo, /new LaattaMateriaali\(\{ color: savy \}\)/, 'materiaali laatoilta: valaisematon kansi näkyisi tummana kiekkona');
});

test('napakannet: geometria pohjoisnavasta, purkaja siivoaa, ilman laattaverkkoa ei kantta', () => {
  // Kirjaston luokkien sijaiset: kolmiulotteinen() lukee ne elävistä objekteista.
  class Muoto {
    constructor(radius, w, h, phiStart, phiLength, thetaStart, thetaLength) {
      this.parameters = { radius, thetaStart, thetaLength };
      this.purettu = false;
    }
    dispose() { this.purettu = true; }
  }
  class Valaistu { constructor(o) { Object.assign(this, o); this.type = 'MeshLambertMaterial'; } dispose() {} }
  class Valaisematon { constructor(o) { Object.assign(this, o); this.type = 'MeshBasicMaterial'; } dispose() {} }
  class Verkko { constructor(geometry, material) { this.geometry = geometry; this.material = material; this.userData = {}; } }
  const teePallo = (valaistuLoytyy) => {
    const juuri = {
      children: [],
      add(o) { this.children.push(o); },
      remove(o) { this.children = this.children.filter((x) => x !== o); },
    };
    const lapset = [new Verkko(new Muoto(99, 8, 8, 0, 6.28, 0, Math.PI), new Valaisematon({ color: '#fff' }))];
    if (valaistuLoytyy) lapset.push(new Verkko(new Muoto(100, 8, 8, 0, 6.28, 1.5, 1.1), new Valaistu({ color: '#fff' })));
    const moottori = { thresholds: [], updatePov() {}, children: lapset, parent: juuri };
    return { juuri, pallo: { scene: () => ({ traverse: (f) => f(moottori) }), getGlobeRadius: () => 100 } };
  };
  const { juuri, pallo } = teePallo(true);
  const kolmi = kolmiulotteinen(pallo);
  assert.equal(kolmi.LaattaMateriaali, Valaistu, 'laattojen materiaali (valaistu)');
  assert.equal(kolmi.PerusMateriaali, Valaisematon);
  assert.ok(kolmi.laatatValmiit);
  const pura = asennaNapakannet(pallo);
  assert.equal(juuri.children.length, 4, 'kaksi kantta, kummallakin peittävä ja häivyttyvä');
  assert.ok(juuri.children.every((k) => k.userData.napakansi && k.material instanceof Valaistu));
  const aste = Math.PI / 180;
  const [pohja, pohjaHaive, etela, etelaHaive] = juuri.children;
  assert.equal(pohja.geometry.parameters.thetaStart, 0, 'pohjoinen kansi alkaa navasta (+Y)');
  assert.ok(Math.abs(pohja.geometry.parameters.thetaLength - (90 - NAPAKANNEN_LEVEYS) * aste) < 1e-9);
  assert.ok(Math.abs(etela.geometry.parameters.thetaStart - (Math.PI - (90 - NAPAKANNEN_LEVEYS) * aste)) < 1e-9, 'etelä on toisessa päässä');
  assert.equal(etela.geometry.parameters.thetaLength, pohja.geometry.parameters.thetaLength);
  assert.equal(pohja.material.color, NAPAKANSI_POHJOINEN);
  assert.equal(etela.material.color, NAPAKANSI_ETELA);
  for (const haive of [pohjaHaive, etelaHaive]) {
    assert.equal(haive.material.opacity, NAPAKANNEN_HAIVEPEITTO);
    assert.equal(haive.material.transparent, true);
    assert.ok(haive.geometry.parameters.thetaLength > pohja.geometry.parameters.thetaLength, 'häive on leveämpi');
    assert.ok(haive.geometry.parameters.radius > pohja.geometry.parameters.radius, 'häive on peittävän päällä');
  }
  assert.ok(pohja.geometry.parameters.radius > 100 && pohja.geometry.parameters.radius < 100.5, 'kansi laattojen yläpuolella');
  pura();
  assert.equal(juuri.children.length, 0, 'purkaja poistaa kannet');
  assert.equal(pohja.geometry.purettu, true);
  // Ilman laattaverkkoa kantta ei tehdä: valaisematon materiaali näkyisi tummana kiekkona.
  const vain = teePallo(false);
  assert.equal(kolmiulotteinen(vain.pallo).laatatValmiit, false);
  const ajastimet = [];
  asennaNapakannet(vain.pallo, { setTimeout: (f) => ajastimet.push(f) });
  assert.equal(vain.juuri.children.length, 0);
  assert.equal(ajastimet.length, 1, 'yritetään uudestaan, kunnes laatat saapuvat');
});

test('pinnoitteen pikselihaku: juliste kattaa 76° N – Etelämanner, navat jäävät ulkopuolelle', () => {
  const luettelo = {
    projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 },
    arkki: { x: 0, y: -1046.3, w: 12000, h: 7307.7 },
    rajaus: { x: 0, y: -611.3, w: 12000, h: 6422.7 },
  };
  const taso = { z: 2, leveys: 2700, korkeus: 1644, pikseliaPerYksikko: 0.225 };
  const lontoo = arkinPikseli(luettelo, taso, -0.12, 51.5);
  assert.ok(lontoo && lontoo.px > 1300 && lontoo.px < 1320 && lontoo.py > 520 && lontoo.py < 560, JSON.stringify(lontoo));
  assert.equal(arkinPikseli(luettelo, taso, 0, 89), null, 'pohjoisnapa on julisteen ulkopuolella');
  assert.equal(arkinPikseli(luettelo, taso, 0, -85), null, 'Etelämanner on julisteen ulkopuolella');
  // Sauma: lon0 - 1° on arkin oikeassa laidassa, lon0 vasemmassa.
  assert.ok(arkinPikseli(luettelo, taso, -176, 0).px > 2650);
  assert.ok(arkinPikseli(luettelo, taso, -175, 0).px < 1);
});

test('pallo on matkalaukun linssi, ei valikossa; ui avaa sen laiskasti ja kuori on SHELLissä', () => {
  assert.ok(!lue('../index.html').includes('pallo-btn'), 'valikkonappi poistui (omistaja 4.9.2026)');
  assert.ok(!lue('../js/main.js').includes('pallo-btn'));
  const ui = lue('../js/ui.js');
  assert.match(ui, /async avaaPallo\(\) \{[\s\S]{0,300}import\('\.\/pallo\.js'\)/);
  // Linssin valinta avaa pallon eikä vaihda valittua linssiä.
  assert.match(ui, /if \(tunnus === 'pallo'\) \{[\s\S]{0,200}void this\.avaaPallo\(\);\n      return;/);
  assert.match(lue('../sw.js'), /'\.\/js\/pallo\.js'/);
  assert.match(lue('../sw.js'), /'\.\/js\/linssit\/pallo\.js'/);
  // Rekisterissä, kerrokseton, maailmankartalla, perusvaruste.
  assert.ok(LINSSIT.some((r) => r.tunnus === 'pallo' && r.manner === null));
  assert.equal(PALLOLINSSI.tunnus, 'pallo');
  assert.equal(PALLOLINSSI.kerros, false);
  assert.deepEqual(PALLOLINSSI.laudat, ['maailmankartta']);
  assert.ok(PERUSLINSSIT.includes('pallo'));
  assert.ok(omistetut(null, { linssit: [] }).has('pallo'), 'pallo on omistettu heti');
  const pallo = lue('../js/pallo.js');
  // Sukellus on kamera-ajo nykyiselle laudalle, ei laudan vaihto.
  assert.match(pallo, /ui\.kartta\?\.ajaKamera\?\.\(\{ x: kohta\.x, y: kohta\.y, leveys: PALLO_SUKELLUSLEVEYS \}, \{ kesto: 1400 \}\)/);
  // Kirjaston latausvirhe ei kaada peliä vaan näkyy kuoressa.
  assert.match(pallo, /tila\.textContent = 'Karttapallo ei latautunut/);
  assert.match(lue('../css/styles.css'), /\.pallo-kuori \{[\s\S]*?z-index: 45;/);
});

test('laatu palaa levossa: kynnykset ruudun pikseleistä, liike kevyt (omistaja 5.9.2026)', () => {
  // Kirjaston oma taulukko: taso t, kun 8/2^t ≤ korkeus.
  const oletus = laattakynnykset();
  assert.equal(oletus.length, 30);
  assert.equal(oletus[0], 8);
  assert.equal(oletus[3], 1);
  // Lepokerroin iPhonen pystyruudulle (771 css-px × 3): 2^t ≥ 0,0263·H/h.
  const k = lepokerroin(771 * 3);
  const kauko = lepokerroin(771 * 3, LAATU_TERAVYYS_KAUKO);
  const taso = (h, kerroin) => Math.min(PALLO_LAATTATASO_MAX, laattakynnykset(kerroin).findIndex((x) => x <= h));
  assert.equal(taso(0.135, 1), 6, 'kirjaston taso korkeudella 0,135');
  assert.equal(taso(0.135, k), 8, 'levossa syvin taso (kirjasto rajaa maxLeveliin)');
  assert.equal(taso(2.5, kauko), 4, 'koko pallo levossa tasolla 4, ei 5 (128 laattaa)');
  assert.equal(lepokerroin(100), 1, 'ei koskaan karkeampi kuin kirjasto');
  // Terävyys 1,0 lähikuvassa: laatan pikseli on laitepikseli (omistaja
  // 6.9.2026 "vielä röpelöistä, varsinkin teksti"). Työpöydällä
  // (1081 css-px × 2) korkeus 0,30 nousee tasolta 7 tasolle 8.
  assert.equal(LAATU_TERAVYYS, 1);
  assert.ok(LAATU_TERAVYYS_KAUKO >= 0.5 && LAATU_TERAVYYS_KAUKO < LAATU_TERAVYYS);
  assert.equal(laatuTeravyys(0.3), LAATU_TERAVYYS, 'lähikuva terävänä');
  assert.equal(laatuTeravyys(LAATU_KAUKORAJA), LAATU_TERAVYYS, 'raja kuuluu lähikuvaan');
  assert.equal(laatuTeravyys(2.5), LAATU_TERAVYYS_KAUKO, 'koko pallo yleiskuvana');
  assert.equal(laatuTeravyys(undefined), LAATU_TERAVYYS, 'tuntematon korkeus ei karkeuta');
  const poyta = lepokerroin(1081 * 2) * napakerroin(38.2);
  assert.equal(taso(0.3, poyta), 8, 'työpöydällä korkeus 0,30 tasolle 8 (ennen 7)');
  assert.ok(k > 7 && k < 8, `kerroin ${k}`);
  assert.ok(kauko > 3.5 && kauko < 5, `kaukokerroin ${kauko}`);
  // Kerroin lasketaan piirtopuskurin korkeudesta (ei ruudun leveydestä
  // eikä pelkästä dpr:stä): fov on pystysuunnan kulma, ks. js/pallo.js.
  assert.match(lue('../js/pallo.js'), /kotelo\.clientHeight \* Math\.min\(dpr, LAATU_PIKSELISUHDE_LEPO\)/);
  assert.match(lue('../js/pallo.js'), /lepokerroin\(piirtokorkeus\(\), teravyys\)/);
  assert.ok(LAATU_LEPOVIIVE_MS >= 200 && LAATU_LEPOVIIVE_MS <= 400);
  assert.ok(LAATU_LIIKEVIIVE_MS > 0 && LAATU_LIIKEVIIVE_MS < LAATU_LEPOVIIVE_MS);
  assert.equal(LAATU_PIKSELISUHDE_LIIKE, 2, 'liikkeessä kirjaston katto');
  assert.equal(LAATU_PIKSELISUHDE_LEPO, 3, 'levossa iPhonen koko dpr');
  // Laatunosto kytketään vain laatoitettuun palloon; purkaja palauttaa.
  const lahde = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  assert.match(lahde, /globeTileEngineMaxLevel\([\s\S]{0,200}?\);\n\s+asennaLaatunosto\(pallo, kotelo\);/);
  assert.match(lahde, /moottori\.updatePov = alkuperainen;/);
  assert.match(lahde, /map\.anisotropy = maxAniso/);
});

/*
 * ======== VAIHE 5c: LAATAT OFFLINE, VARAPOLKU JA TURVATILA ==========
 * (docs/moduulit/karttapallo.md luku 6 ja luvun 7 vaihe 5: *"SW-välimuisti
 * vendorille ja laatoille; varapolku + turvatila; Z8 käyttöön ja lähin
 * korkeus laattatarkkuudesta; hover-raycast pois"*)
 */

test('esilataus: karkea maailma ja aloituskaupunki laattojen koriin', () => {
  const osoitteet = esilatauksenLaatat({ lat: 51.5, lon: -0.12 });
  // Koko maailma tasoille 0–3 = 1 + 4 + 16 + 64 = 85 laattaa, ja
  // aloituskaupungin ympäriltä 3 × 3 tasolla 4.
  assert.equal(osoitteet.length, 85 + 9, `esilatauksessa ${osoitteet.length} laattaa`);
  assert.equal(new Set(osoitteet).size, osoitteet.length, 'sama laatta kahdesti');
  assert.ok(osoitteet.every((u) => u.startsWith(PALLO_LAATAT) && u.endsWith('.jpg')));
  assert.ok(osoitteet.includes(pallonLaatta(0, 0, 0)), 'koko pallo tasolla 0');
  assert.equal(osoitteet.filter((u) => u.includes(`${PALLO_LAATAT}3/`)).length, 64, 'taso 3 kokonaan');
  // Lontoo on Z4-laatassa 7/5 (todennettu ämpäristä 5.9.2026).
  assert.deepEqual(laatanKoordinaatit(51.5, -0.12, 4), { x: 7, y: 5 });
  assert.ok(osoitteet.includes(pallonLaatta(7, 5, 4)), 'aloituskaupungin laatta');
  assert.deepEqual(laatanKoordinaatit(0, 0, 1), { x: 1, y: 1 }, 'nollameridiaani ja päiväntasaaja');
  // Luettelon matalampi katto rajaa myös esilatauksen.
  const matala = esilatauksenLaatat({ maxTaso: 2 });
  assert.equal(matala.length, 1 + 4 + 16, 'maxTaso rajaa maailman');
  assert.ok(matala.every((u) => !u.includes(`${PALLO_LAATAT}4/`)), 'ei kaupunkitasoa ilman laattoja');
  assert.equal(ESILATAUKSEN_MAAILMATASO, 3);
  assert.equal(ESILATAUKSEN_KAUPUNKITASO, 4);
});

test('esilataus lähtee palvelutyöntekijälle kerran ja vain jos se on olemassa', async () => {
  assert.equal(await esilataaPallolaatat({}, undefined), null, 'ei työntekijää (yhden tiedoston versio)');
  const viestit = [];
  const nav = {
    serviceWorker: {
      ready: Promise.resolve({ active: null }),
      controller: { postMessage: (v) => viestit.push(v) },
    },
  };
  await esilataaPallolaatat({ lat: 51.5, lon: -0.12 }, nav);
  assert.equal(viestit.length, 1, 'viesti ei lähtenyt');
  assert.equal(viestit[0].tyyppi, 'esilataa-pallolaatat');
  assert.equal(viestit[0].kansio, PALLO_LAATTAKANSIO);
  assert.ok(viestit[0].osoitteet.length >= 85);
  await esilataaPallolaatat({}, nav);
  assert.equal(viestit.length, 1, 'esilataus lähti kahdesti samassa istunnossa');
});

/*
 * LENTOREITIN KÄYTÄVÄ (omistaja 6.9.2026: *"Lentokonekohtauksessa paljon
 * lähempi zoom aste ja kamera seuraa konetta"*). Lähempi kamera pyytää
 * lennon aikana Z7:ää pitkin koko kaarta ja lopussa Z8:aa
 * kohdekaupungin yllä; laattamoottori hakee vasta kun kamera on jo
 * siellä, joten avauslento pyytää käytävän etukäteen koriin.
 */
test('esilataus: lentoreitin käytävä kaaren ympärillä ja Z8 laskeutumiseen', () => {
  // Kolme näytettä Lontoosta Ateenaan (isoympyrän karkea otanta).
  const pisteet = [{ lat: 51.5, lon: -0.12 }, { lat: 45.5, lon: 12 }, { lat: 37.98, lon: 23.73 }];
  const kaytava = reitinLaatat({ pisteet });
  assert.deepEqual(REITIN_ESILATAUSTASOT, [6, 7]);
  assert.equal(REITIN_LASKEUTUMISTASO, 8);
  // Kolme näytettä × 3 × 3 laattaa × kaksi tasoa, päällekkäiset karsittuina.
  assert.equal(new Set(kaytava).size, kaytava.length, 'sama laatta kahdesti');
  assert.ok(kaytava.length > 30 && kaytava.length <= 54, `käytävässä ${kaytava.length} laattaa`);
  assert.ok(kaytava.every((u) => u.startsWith(PALLO_LAATAT) && u.endsWith('.jpg')));
  for (const taso of REITIN_ESILATAUSTASOT) {
    const keski = laatanKoordinaatit(51.5, -0.12, taso);
    assert.ok(kaytava.includes(pallonLaatta(keski.x, keski.y, taso)), `lähtö puuttuu tasolta ${taso}`);
  }
  // Luettelon katto rajaa myös käytävän (Z8 on syvin, jos luettelo sanoo 7).
  const matala = reitinLaatat({ pisteet, tasot: [8], maxTaso: 7 });
  assert.ok(matala.every((u) => u.includes(`${PALLO_LAATAT}7/`)), 'maxTaso ei rajannut');
});

test('lentoreitin esilataus lähtee erikseen eikä kuluta kerran-per-istunto-lupaa', async () => {
  const pisteet = [{ lat: 51.5, lon: -0.12 }, { lat: 37.98, lon: 23.73 }];
  assert.equal(await esilataaLentoreitti(pisteet, undefined), null, 'ei työntekijää');
  assert.equal(await esilataaLentoreitti([], { serviceWorker: {} }), null, 'tyhjä reitti');
  const viestit = [];
  const nav = {
    serviceWorker: {
      ready: Promise.resolve({ active: null }),
      controller: { postMessage: (v) => viestit.push(v) },
    },
  };
  await esilataaLentoreitti(pisteet, nav);
  await esilataaLentoreitti(pisteet, nav);
  assert.equal(viestit.length, 2, 'reittiesilataus saa lähteä joka lennolla');
  assert.equal(viestit[0].tyyppi, 'esilataa-pallolaatat');
  assert.equal(viestit[0].kansio, PALLO_LAATTAKANSIO);
  // Laskeutumisen taso on mukana kohdekaupungin (viimeinen näyte) ympärillä.
  const maali = laatanKoordinaatit(37.98, 23.73, REITIN_LASKEUTUMISTASO);
  assert.ok(viestit[0].osoitteet.includes(pallonLaatta(maali.x, maali.y, REITIN_LASKEUTUMISTASO)),
    'kohdekaupungin Z8-laatta puuttuu');
});

test('lähin näkyvä leveys on vakio 60 yksikköä, ei laattatarkkuus (v1649)', () => {
  assert.ok(Math.abs(laatanTarkkuus(8) - 182.04) < 0.1, `Z8 ${laatanTarkkuus(8)}`);
  assert.equal(laatanTarkkuus(7) * 2, laatanTarkkuus(8), 'taso tuplaa tarkkuuden');
  assert.equal(PALLON_SALLITTU_VENYTYS, 2, 'rasterin terävyysraja on yhä 2 (vertailukohta)');
  /*
   * OMISTAJAN PALAUTE v1649: *"Voisiko syvemmin zoomin sallia jo nyt
   * vaikka korkeusdataa ei ole mutta rajat varmaan piirtyvät terävänä
   * kun on vektori"*. Lähin leveys on nyt VAKIO — puolet siirtonäkymän
   * katosta — eikä riipu laitteesta eikä laattatasosta.
   */
  assert.equal(PALLOLAUDAN_LAHIN_LEVEYS, 60);
  assert.equal(PALLOLAUDAN_LAHIN_LEVEYS, PALLOLAUDAN_SIIRTOLEVEYS / 2, 'puolet vanhasta katosta');
  for (const valinnat of [{}, { taso: 7, leveysPx: 390, dpr: 2 }, { taso: 8, leveysPx: 1440, dpr: 3 }]) {
    assert.equal(lahinLeveys(valinnat), PALLOLAUDAN_LAHIN_LEVEYS, 'laite ei muuta rajaa');
  }
  // Sama korkeutena on syvempi kuin vanha kiinteä 0,04 (neliöruudulla).
  const korkeus = lahinKorkeus({ kuvasuhde: 1 });
  assert.ok(korkeus < PALLO_KORKEUS_MIN, `uusi raja ${korkeus} ei ole vanhaa syvempi`);
  assert.ok(Math.abs(korkeus - korkeusLeveydesta(60, { min: 0, kuvasuhde: 1 })) < 1e-9);
  // Kuvasuhde vaikuttaa yhä: sama leveys ruudun leveydellä on eri korkeus.
  assert.ok(lahinKorkeus({ kuvasuhde: 1.6 }) < lahinKorkeus({ kuvasuhde: 0.46 }));
  /*
   * VENYTYS mitataan pyramidin syvimmästä tasosta (z8 = 480 px/aste),
   * koska laattakerros piirtää sen — ei pallon Mercator-sarjasta.
   * Puhelin 390 × dpr 3 → 1,4×, iPad 834 × dpr 2 → 1,9×, työpöytä
   * 1440 × dpr 2 → 3,3×. Maasto pehmenee, viivat ovat vektoreita.
   */
  assert.equal(PYRAMIDIN_SYVIN_PX_ASTE, 480);
  assert.ok(Math.abs(laattojenVenytys({ leveysPx: 390, dpr: 3 }) - 1.35) < 0.05);
  assert.ok(Math.abs(laattojenVenytys({ leveysPx: 834, dpr: 2 }) - 1.93) < 0.05);
  assert.ok(Math.abs(laattojenVenytys({ leveysPx: 1440, dpr: 2 }) - 3.33) < 0.05);
  // Siirtonäkymä EI syvene: koreografian katto on yhä 120 ja saapumista lähempänä.
  assert.equal(PALLOLAUDAN_SIIRTOLEVEYS, 120);
  assert.ok(PALLOLAUDAN_SIIRTOLEVEYS < PALLOLAUDAN_SAAPUMISLEVEYS, 'siirtonäkymä on saapumista lähempänä');
  assert.ok(PALLOLAUDAN_LAHIN_LEVEYS < PALLOLAUDAN_SIIRTOLEVEYS, 'sormi pääsee koreografiaa syvemmälle');
  // Kamera ei mene rajan alle: korkeusLeveydesta saa minimin parametrina.
  assert.equal(korkeusLeveydesta(1, { min: 0.08 }), 0.08);
  // Lauta johtaa tason laattaluettelosta ja putoaa Z7:ään ilman luetteloa.
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /const laattataso = laatat \? laattatasoMax\(laatat\) : PALLO_LAATTATASO_MAX - 1;/);
  assert.match(lauta, /ohj\.minDistance = pallonSade \* \(1 \+ kamera\.korkeusMin\(\)\);/);
});

test('turvatila: kaksi kaatumista peräkkäin sulkee pallon tältä laitteelta', () => {
  // Laskuri on laitteen asetus (localStorage), ei pelitilan kenttä.
  const muisti = new Map();
  const varasto = {
    getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
    setItem: (k, v) => muisti.set(k, v),
    removeItem: (k) => muisti.delete(k),
  };
  assert.equal(pallonKaatumiset(varasto), 0);
  assert.equal(palloTurvatilassa(varasto), false);
  assert.equal(palloKaatui(varasto), 1);
  assert.equal(palloTurvatilassa(varasto), false, 'yksi kaatuminen ei sulje palloa');
  assert.equal(palloKaatui(varasto), PALLON_TURVATILAN_RAJA);
  assert.equal(palloTurvatilassa(varasto), true, 'kahden jälkeen turvatila');
  assert.equal(muisti.get('matkakirja-pallo-kaatumiset'), '2', 'laskuri talteen omalla avaimella');
  // Vipu (ratasvalikko) ja vakaa istunto nollaavat.
  nollaaPallonKaatumiset(varasto);
  assert.equal(pallonKaatumiset(varasto), 0);
  assert.equal(palloTurvatilassa(varasto), false);
  assert.ok(PALLON_TURVATILAN_UNOHDUS_MS >= 10000, 'vakaan istunnon mitta');
  // Turvatila luetaan käynnistyksessä ja pelaaja saa yhden rivin.
  const ui = lue('../js/ui.js');
  assert.match(ui, /if \(palloTurvatilassa\(\)\) \{ this\.ilmoitaPallonTurvatila\(\); return false; \}/);
  assert.match(ui, /Karttapallo pois käytöstä tällä laitteella — kytke päälle ratasvalikosta\./);
  // Kaatumiset: WebGL puuttuu, rakentaminen kaatuu tai konteksti kuolee.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /if \(!webglTuettu\(document\)\) \{\n\s+palloKaatui\(\);/);
  assert.match(lauta, /addEventListener\('webglcontextlost', kontekstiKuoli\)/);
  assert.match(lauta, /if \(uudelleenrakennuksia < 1\) \{/, 'yksi uudelleenrakennus ennen varapolkua');
  assert.match(lauta, /ui\.pallolautaVarapolku\?\.\(\)/);
  assert.match(lauta, /nollaaPallonKaatumiset\(\), PALLON_TURVATILAN_UNOHDUS_MS/);
  // Kehittäjän/pelaajan vipu nollaa laskurin.
  assert.match(lue('../index.html'), /id="kehittaja-pallo-turvatila-btn"/);
  assert.match(lue('../js/main.js'), /palloTurvatilaNappi\?\.addEventListener\('click'/);
});

test('hover-raycast pois kosketuslaitteilla, napautus säilyy', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Kirjaston oma silmukka raycastaa joka kehys, kun tämä on päällä.
  assert.match(lauta, /const kosketuslaite = Boolean\(globalThis\.matchMedia\?\.\('\(hover: none\)'\)\?\.matches\);/);
  assert.match(lauta, /pallo\.enablePointerInteraction\?\.\(false\);/);
  // Napautus tarvitsee raycastin: päälle sormen laskeutuessa (kaappaus
  // ennen kirjaston omaa kuuntelijaa), pois vasta klikin jälkeen.
  assert.match(lauta, /document\.addEventListener\('pointerdown', osoitinPaalle, true\);/);
  assert.match(lauta, /pallo\.enablePointerInteraction\?\.\(true\);/);
  assert.ok(OSOITTIMEN_JALKIVIIVE_MS >= 200 && OSOITTIMEN_JALKIVIIVE_MS <= 800);
});

test('tarkkuus liikkeessä -kokeiluvipu (omistaja 5.9.2026: "kokeile pyörisikö vieritys sillä korkeammalla tarkkuudella")', async () => {
  const { laatuAinaPaalla, asetaLaatuAina, LAATU_AINA_AVAIN } = await import('../js/ui-apurit.js');
  const muisti = new Map();
  const win = { location: { search: '' }, localStorage: { getItem: (k) => muisti.get(k) ?? null, setItem: (k, v) => muisti.set(k, v), removeItem: (k) => muisti.delete(k) } };
  assert.equal(laatuAinaPaalla(win), false, 'oletus pois');
  asetaLaatuAina(true, win);
  assert.equal(muisti.get(LAATU_AINA_AVAIN), '1');
  assert.equal(laatuAinaPaalla(win), true);
  asetaLaatuAina(false, win);
  assert.equal(muisti.has(LAATU_AINA_AVAIN), false, 'pois poistaa avaimen');
  assert.equal(laatuAinaPaalla({ ...win, location: { search: '?laatu=aina' } }), true, 'URL voittaa');
  assert.equal(laatuAinaPaalla({ ...win, location: { search: '?laatu=0' } }), false);
  const pallo = lue('../js/pallo.js');
  // Vipu luetaan KUTSUTTAESSA eikä kerran: sen rinnalla on ajokohtainen
  // pakotus (pakotaPallonLaatu), joka voi kytkeytyä kesken istunnon.
  assert.match(pallo, /const aina = \(\) => laatuAinaPaalla\(ikkuna\) \|\| laatuPakotukset > 0;/);
  assert.match(pallo, /if \(aina\(\)\) lepoon = true;/);
  const html = lue('../index.html');
  assert.match(html, /kehittaja-laatu-aina-kytkin/);
});

/*
 * TERÄVÄ TILA PAKOTETTUNA AJON AJAKSI (omistaja 5.9.2026 ilta,
 * keksintölinssi pallolla, sanatarkasti: *"pidä kokoajan terävä tila
 * päällä"*). Kaksi asiaa rikkoutuisi hiljaa: pakotus jäisi päälle
 * linssin jälkeen (koko peli pyörisi lepolaadulla) tai toisen pyytäjän
 * vapautus sammuttaisi sen toisen alta.
 */
test('terävän tilan pakotus lasketaan pyytäjittäin ja purku palauttaa laadun', async () => {
  const { pakotaPallonLaatu, pallonLaatuPakotettu } = await import('../js/pallo.js');
  assert.equal(pallonLaatuPakotettu(), false, 'oletus pois');
  assert.equal(pakotaPallonLaatu(true), true);
  // Toinen pyytäjä: yksi vapautus ei riitä sammuttamaan.
  pakotaPallonLaatu(true);
  assert.equal(pakotaPallonLaatu(false), true, 'toisen pyytäjän vapautus sammutti laadun');
  assert.equal(pakotaPallonLaatu(false), false, 'viimeinen vapautus ei sammuttanut');
  // Ylimääräinen vapautus ei mene nollan alle (kahdesti purettu ajo).
  assert.equal(pakotaPallonLaatu(false), false);
  assert.equal(pakotaPallonLaatu(true), true, 'laskuri jäi negatiiviseksi');
  pakotaPallonLaatu(false);

  const pallo = lue('../js/pallo.js');
  // Muutos ilmoitetaan asennetuille laatunostoille, ja kuuntelija
  // irtoaa purkajassa (pallon vaihtuessa ei jää haamuja).
  assert.match(pallo, /for \(const kuuntelija of laatuKuuntelijat\) kuuntelija\(nyt\);/);
  assert.match(pallo, /laatuKuuntelijat\.add\(pakotus\);/);
  assert.match(pallo, /laatuKuuntelijat\.delete\(pakotus\);/);
  // Pakotus hakee tarkat laatat heti eikä vasta seuraavasta liikkeestä.
  assert.match(pallo, /const pakotus = \(\) => \{\n\s*asetaTila\(lepo\);\n\s*if \(kamera\) alkuperainen\.call\(moottori, kamera\);\n\s*teroita\(\);/);
});

/*
 * TYÖPÖYTÄSELAIMEN RULLA (omistaja 5.9.2026 klo 21: *"saisiko macin
 * työpöytäselaimella panoroinnin jos käyttää kahta sormea ja zoomaus
 * olisi cmd pohjassa kahdella sormella (nipistys eleen voi ottaa pois
 * pöytäkoneelta)"*). Trackpadin kahden sormen pyyhkäisy on selaimessa
 * wheel-virta, jonka OrbitControls tulkitsi zoomiksi.
 */
test('rullan askel: korkeus skaalaa, suunta seuraa vieritystä, deltaMode riveiksi', () => {
  // Pyyhkäisy alaspäin vie etelään, oikealle vie itään.
  const alas = rullanAskel(0, 100, 0.05, { leveysPx: 1000 });
  assert.ok(alas.dLat < 0 && alas.dLng === 0, JSON.stringify(alas));
  const sivu = rullanAskel(100, 0, 0.05, { leveysPx: 1000 });
  assert.ok(sivu.dLng > 0 && sivu.dLat === 0, JSON.stringify(sivu));
  // Askel on ruudun pikseli asteina: näkyvä leveys = korkeus · 2 · tan(fov/2).
  const nakyva = 0.05 * 2 * Math.tan((50 / 2) * (Math.PI / 180)) * (180 / Math.PI);
  assert.ok(Math.abs(-alas.dLat - (100 * nakyva) / 1000) < 1e-12, `${alas.dLat}`);
  assert.equal(PANOROINNIN_HERKKYYS, 1, 'oletustahti on 1:1 — pinta seuraa pyyhkäisyä');
  // ASKEL PIENENEE KORKEUDEN PIENETESSÄ: matalalla sama pyyhkäisy siirtää
  // vähemmän asteita, jolloin lähikuvassa liike ei karkaa käsistä.
  const matala = rullanAskel(0, 100, 0.02, { leveysPx: 1000 });
  const korkea = rullanAskel(0, 100, 2.5, { leveysPx: 1000 });
  assert.ok(Math.abs(matala.dLat) < Math.abs(alas.dLat), 'matalalla pienempi askel');
  assert.ok(Math.abs(korkea.dLat) > Math.abs(alas.dLat), 'kaukaa suurempi askel');
  assert.ok(Math.abs(Math.abs(korkea.dLat / matala.dLat) - 2.5 / 0.02) < 1e-9, 'suoraan verrannollinen korkeuteen');
  // Iso kotelo = pienempi askel pikseliä kohden (sama osuus ruudusta).
  const leveaRuutu = rullanAskel(0, 100, 0.05, { leveysPx: 2000 });
  assert.ok(Math.abs(leveaRuutu.dLat * 2 - alas.dLat) < 1e-12);
  // deltaMode 1 (rivi) ja 2 (sivu) skaalataan pikseleiksi.
  const rivi = rullanAskel(0, 1, 0.05, { deltaMode: 1, leveysPx: 1000 });
  assert.ok(Math.abs(rivi.dLat - rullanAskel(0, RULLAN_RIVI_PX, 0.05, { leveysPx: 1000 }).dLat) < 1e-12);
  const sivuAskel = rullanAskel(0, 1, 0.05, { deltaMode: 2, leveysPx: 1000 });
  assert.ok(Math.abs(sivuAskel.dLat - rullanAskel(0, RULLAN_SIVU_PX, 0.05, { leveysPx: 1000 }).dLat) < 1e-12);
  // Pituuspiirit kapenevat navoilla: 1/cos φ, katkaistuna 75°:seen.
  const tasaaja = rullanAskel(100, 0, 0.05, { leveysPx: 1000, lat: 0 });
  const kuusikymmenta = rullanAskel(100, 0, 0.05, { leveysPx: 1000, lat: 60 });
  assert.ok(Math.abs(kuusikymmenta.dLng / tasaaja.dLng - 2) < 1e-9, 'lat 60 → kaksinkertainen');
  const napa = rullanAskel(100, 0, 0.05, { leveysPx: 1000, lat: 89 });
  const raja = rullanAskel(100, 0, 0.05, { leveysPx: 1000, lat: PANOROINNIN_KOHTISUORA_RAJA });
  assert.ok(Math.abs(napa.dLng - raja.dLng) < 1e-12, 'kerroin katkeaa 75°:seen eikä karkaa navalla');
  // Nolla on nolla, eikä korkeus 0 räjäytä kaavaa.
  assert.equal(rullanAskel(0, 0, 0.05).dLng, 0);
  assert.ok(Number.isFinite(rullanAskel(10, 10, 0).dLat));
});

test('rulla: kaappausvaiheessa, cmd/ctrl zoomaa, muuten panorointi ja pehmeä liuku', () => {
  const lahde = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  const ele = lahde.slice(lahde.indexOf('export function asennaPallonEleet'));
  const kasittelija = ele.slice(ele.indexOf("kotelo.addEventListener('wheel'"));
  assert.ok(kasittelija, 'wheel-käsittelijä puuttuu pallon eleistä');
  // KAAPPAUSVAIHE: OrbitControlsin kuuntelija on kankaalla eli kotelon
  // lapsessa, joten kotelon kaappaus ehtii ensin. passive: false, muuten
  // preventDefault ei tehoa.
  assert.match(kasittelija, /\{ capture: true, passive: false \}/);
  // Cmd (mac) tai ctrl (Windows, nipistys) → kirjasto zoomaa kuten ennen.
  assert.match(kasittelija, /if \(e\.metaKey \|\| e\.ctrlKey\) return;/);
  const zoomKohta = kasittelija.indexOf('e.metaKey');
  const estoKohta = kasittelija.indexOf('e.preventDefault()');
  assert.ok(zoomKohta >= 0 && estoKohta > zoomKohta, 'zoom päästetään läpi ennen estoa');
  // Muuten: selaimen oma vieritys/zoom pois ja kirjasto ohitetaan.
  assert.match(kasittelija, /e\.preventDefault\(\);\s*\n\s*e\.stopPropagation\(\);/);
  assert.match(kasittelija, /rullanAskel\(e\.deltaX, e\.deltaY, pov\.altitude/);
  // Panorointi kiertää kameraa, ei muuta korkeutta.
  assert.match(ele, /altitude: pov\.altitude/);
  // Yksittäinen rullapykälä animoidaan (Raamattu: kaikki liike pehmeästi).
  assert.match(kasittelija, /rulla\.aikaa = RULLAN_LIUKU_MS/);
  assert.match(kasittelija, /requestAnimationFrame\(rullanLiuku\)/);
  assert.ok(RULLAN_LIUKU_MS > 0 && RULLAN_LIUKU_MS <= 200, `liuku on lyhyt: ${RULLAN_LIUKU_MS}`);
  assert.match(kasittelija, /ui\.reducedMotion \|\| \(e\.deltaMode === 0/, 'reduced motion = hyppy');
  assert.ok(RULLAN_SUORA_RAJA > 0, 'trackpadin virta menee suoraan');
  // Napakannet alkavat 83,7°:sta: rulla ei kiipeä kannen sisään.
  assert.ok(PANOROINNIN_LEVEYSRAJA > NAPAKANNEN_LEVEYS && PANOROINNIN_LEVEYSRAJA <= 89);
  assert.match(ele, /-PANOROINNIN_LEVEYSRAJA, Math\.min\(PANOROINNIN_LEVEYSRAJA/);
  // Kosketuslaitteet ennallaan: sormet kulkevat pointer-tapahtumina.
  for (const nimi of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel']) {
    assert.ok(ele.includes(`addEventListener('${nimi}'`), `${nimi} katosi sormieleistä`);
  }
  // Kamera-ajon keskeytys kuuntelee wheeliä samassa vaiheessa, muuten
  // stopPropagation veisi tapahtuman siltä (kuplinta ei enää tule).
  assert.match(
    lue('../js/pallolauta/kamera.js'),
    /addEventListener\('wheel', \(\) => pysaytaKameraAjo\(\), \{ passive: true, capture: true \}\)/,
  );
  // Nukkuva render-silmukka herää myös rullasta.
  assert.match(
    lue('../js/pallolauta/lauta.js'),
    /addEventListener\('wheel', heraa, \{ passive: true, capture: true \}\)/,
  );
});

test('napakerroin: navan lähellä karkeampi taso samalla terävyydellä (omistaja 5.9.2026: "ihmeen hitaasti lataa tuolla ylhäällä")', () => {
  assert.equal(napakerroin(0), 1);
  assert.ok(Math.abs(napakerroin(60) - 0.5) < 1e-9);
  assert.ok(napakerroin(80) < 0.18 && napakerroin(80) >= NAPAKERROIN_MIN);
  assert.equal(napakerroin(89), NAPAKERROIN_MIN, 'alaraja navan vieressä');
  assert.equal(napakerroin(-60), napakerroin(60), 'etelä kuin pohjoinen');
  assert.equal(napakerroin(NaN), 1);
  // Kynnys pienenee ⇒ sama korkeus valitsee matalamman tason.
  const taso = (kerroin, korkeus) => laattakynnykset(kerroin).findIndex((k) => k <= korkeus);
  assert.ok(taso(napakerroin(80), 0.6) < taso(1, 0.6), 'navalla matalampi taso');
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /\* napakerroin\(kynnysLat\)/);
  // Leveysaste JA korkeuden terävyysalue korjaavat kynnykset heti: yksi
  // hyppy ei ehdi liikkeeksi (6.9.2026, ks. js/pallo.js laatuPov).
  assert.match(pallo, /Math\.abs\(lat - kynnysLat\) >= NAPAKERROIN_ASKEL\n\s*\|\| laatuTeravyys\(nakyma\?\.altitude\) !== kynnysTeravyys\) asetaTila\(lepo\);/);
  assert.match(pallo, /const lepoon = \(\) => \{\n\s*lepoAjastin = 0;\n\s*if \(!kamera\) return;\n\s*asetaTila\(true\);/,
    'lepo laskee kynnykset aina uudestaan — hypyn jälkeen ne ovat väärät');
});
