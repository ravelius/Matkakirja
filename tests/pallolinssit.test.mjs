import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

/*
 * LINSSIT PALLOLLA — AALTO 1A (omistaja 5.9.2026, Raamattu KAIKKI
 * PALLOLLE, VANHA KARTTA SULJETAAN: *"Käännä kaikki pallolle, niin
 * voidaan sulkea vanha kartta kokonaan"*; sopimus
 * docs/moduulit/karttapallo.md luku 10.1).
 *
 * Vartioi kolme asiaa, jotka epäonnistuisivat hiljaa:
 *   1. moottorin rajapinta on TÄSMÄLLEEN sopimuksen taulukko — muut
 *      aallot (vesistöt, vertailu, aikajana, radio) kirjoitetaan
 *      rinnakkain sitä vasten,
 *   2. linssi ei koske Globe.gl-instanssiin vaan kulkee osarekisterien
 *      läpi, jolloin se ei voi pyyhkiä pelin reittejä eikä merkkejä,
 *   3. pallolaudalla `pallolle`-linssi ei avaa linssikarttaa.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const {
  luoLinssit, KALVON_SADE, KALVON_SYVYYSSIIRTO, POLYGONIN_KORKEUS,
} = await import('../js/pallolauta/linssit.js');
const { PALLOLAUDAN_KERROKSET } = await import('../js/pallolauta/lauta.js');
const {
  LAATTAKERROS_RENDER_ORDER_POHJA, LAATTAKERROS_SYVYYSSIIRTO, LEPOKERROS_SYVYYSSIIRTO,
} = await import('../js/pallolaatat.js');
const { VEKTORIT_SYVYYSSIIRTO } = await import('../js/pallovektorit.js');

/** Ketjuttuva Globe.gl-tynkä: muistaa kerrosten viimeisimmät listat. */
function tynkaPallo() {
  const kerrokset = {};
  const pallo = new Proxy({}, {
    get: (_, nimi) => (...args) => {
      if (String(nimi).endsWith('Data') && args.length) kerrokset[nimi] = args[0];
      return pallo;
    },
  });
  return { pallo, kerrokset };
}

test('sopimus 10.1: moottorilla on tasan luvun taulukon rajapinta', () => {
  const { pallo } = tynkaPallo();
  const linssit = luoLinssit({
    pallo, ui: {}, lauta: {}, merkit: { aseta() {} }, reitit: { aseta() {} }, siirtyma: 0,
  });
  for (const nimi of ['kalvo', 'polut', 'polygonit', 'merkit', 'kalvoRuudulle', 'pura']) {
    assert.equal(typeof linssit[nimi], 'function', `moottorilta puuttuu ${nimi}`);
  }
  // Kalvo jää pinnan alle mutta reittien (0,002) ja helmien (0,0025) alle,
  // jotta pelin viivat lukeutuvat linssin päältä.
  assert.ok(KALVON_SADE > 1 && KALVON_SADE < 1.002);
  assert.equal(POLYGONIN_KORKEUS, 0.004);
});

/*
 * ── KALVO PYSYY LAATTAKERROKSEN PÄÄLLÄ ───────────────────────────
 *
 * VIKA v1647–v1649 (omistaja 6.9.2026 ilta, iPad Safari, Ihmisen matka:
 * *"Ainakin selaimella täyttöväri ei pysy ihmis linssissä"*): kalvo
 * näkyi vain tähtinä säännöllisen ruudukon kärkien ympärillä. Laattojen
 * polygonOffset (−8 yksikköä) vetää laatan syvyyspuskurissa kameraa
 * kohti MAAILMAN mitassa d² (1/near − 1/far) / 2²⁴ — korkeudella 1,1
 * noin 0,12 yksikköä, enemmän kuin kalvon nosto pinnasta, joka jänteen
 * painuman jälkeen on ruutujen keskellä vain 0,03. Vartio pitää huolen,
 * ettei kalvo jää enää ilman omaa, laattoja negatiivisempaa siirtoa.
 * Mitattu Chromiumilla 390 × 844 dpr 3 (scratchpad/kalvo, 40 ka
 * -näkymä): ennen 9 % kalvon omista väripisteistä näkyi ruudulla,
 * korjauksen jälkeen 100 % laattojen päällä.
 */
test('kalvo piirtyy laattakerroksen päälle: syvyyssiirto, ei sädekorotusta', () => {
  const src = lue('../js/pallolauta/linssit.js');
  // Sama sääntö kuin vektoriviivoilla: kaikki pinnan päälliset kerrokset
  // ovat laattojen (ja lepokerroksen) EDELLÄ neljä syvyysaskelta.
  assert.equal(KALVON_SYVYYSSIIRTO, -12);
  assert.equal(KALVON_SYVYYSSIIRTO, VEKTORIT_SYVYYSSIIRTO, 'yksi sääntö, ei kahta lukua');
  /*
   * JOS LAATTAKERROS JOSKUS SAA TASOKOHTAISET SIIRROT (ehdotus 6.9.2026:
   * −3…−11 tason mukaan), tämän ehdon on pidettävä SYVIMPÄÄN siirtoon
   * nähden — kalvo on aina laattojen edellä, ei vain pohjatason.
   */
  assert.ok(KALVON_SYVYYSSIIRTO < LAATTAKERROS_SYVYYSSIIRTO, 'kalvo jäisi laattojen alle');
  assert.ok(KALVON_SYVYYSSIIRTO < LEPOKERROS_SYVYYSSIIRTO, 'kalvo jäisi lepokerroksen alle');
  // Materiaali: siirto päällä, syvyystesti PÄÄLLÄ (horisontti leikkaa
  // kalvon) eikä syvyyskirjoitusta (kalvo ei peitä pisteitä puskurissa).
  assert.match(src, /polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: KALVON_SYVYYSSIIRTO,/);
  assert.match(src, /map: tekstuuri, transparent: true, opacity: 0, depthWrite: false,\n\s*depthTest: true,/);
  assert.ok(!/depthTest: false/.test(src), 'depthTest pois vuotaisi kalvon pallon takapuolelle');
  // Varapolku (kloonattu pintamateriaali) saa saman siirron.
  assert.match(src, /kopio\.polygonOffsetUnits = KALVON_SYVYYSSIIRTO;/);
  // Kalvo piirtyy läpinäkyvien jonossa laattojen JÄLKEEN (renderOrder).
  assert.match(src, /mesh\.renderOrder = 1;/);
  for (let z = 0; z <= 8; z += 1) {
    assert.ok(1 > LAATTAKERROS_RENDER_ORDER_POHJA + z, `taso ${z} ennen kalvoa`);
  }
  // KORJAUS EI OLE SÄDEKOROTUS (v1641:n oppi: nosto näkyisi hyppynä).
  assert.equal(KALVON_SADE, 1.0015);
  /*
   * Miksi pelkkä säde ei riitä (mitattu, sama kaava kuin
   * tests/pallolepokerros.test.mjs:ssä: Globe.gl near 0,05, far 125 000,
   * 24-bittinen puskuri): laattojen kahdeksan askelta on korkeudella 1,1
   * jo 0,1 yksikköä, ja kirjaston 90 × 45 -pallon jänne painuu ruudun
   * keskellä 0,12 yksikköä eli kalvon 0,15:n nostosta jää 0,03.
   */
  const askel = (d) => (d * d * (1 / 0.05 - 1 / 125000)) / 2 ** 24;
  const sade = 100;
  const etaisyys = sade * 1.1;
  const painuma = sade * KALVON_SADE * (1 - Math.cos((Math.hypot(360 / 90, 180 / 45) / 2) * (Math.PI / 180)));
  const nostoRuudunKeskella = sade * (KALVON_SADE - 1) - painuma;
  assert.ok(nostoRuudunKeskella > 0, 'kalvo painuisi pinnan sisään');
  assert.ok(-LAATTAKERROS_SYVYYSSIIRTO * askel(etaisyys) > nostoRuudunKeskella,
    'ilman omaa siirtoa laatta voitti syvyystestin — juuri tämä oli vika');
  // Oma siirto on laattojen edellä joka etäisyydellä (sama d²-skaala).
  for (const korkeus of [0.05, 0.4, 1.1, 2.5]) {
    const ero = (LAATTAKERROS_SYVYYSSIIRTO - KALVON_SYVYYSSIIRTO) * askel(sade * korkeus);
    assert.ok(ero + nostoRuudunKeskella > 0, `korkeus ${korkeus}: kalvo jäisi laatan alle`);
  }
});

test('linssi kulkee osarekisterien kautta: peli ja linssi eivät pyyhi toisiaan', () => {
  const { pallo, kerrokset } = tynkaPallo();
  const polut = new Map();
  const merkit = new Map();
  const linssit = luoLinssit({
    pallo,
    ui: {},
    lauta: {},
    merkit: { aseta: (osa, lista) => merkit.set(osa, lista) },
    reitit: { aseta: (osa, lista) => polut.set(osa, lista) },
    siirtyma: 0,
  });

  linssit.polut('vesistot', [{ avain: 'nile', pisteet: [[0, 30], [30, 31]], vari: '#345', paksuus: 0.03 }]);
  assert.equal(polut.get('vesistot').length, 1, 'polut menevät reittikerroksen osarekisteriin');

  linssit.polygonit('maatiedot', [{ avain: 'FI', geometry: { type: 'Polygon', coordinates: [] }, vari: '#abc' }]);
  assert.equal(kerrokset.polygonsData.length, 1, 'polygonit ovat oma Globe.gl-kerros');

  linssit.merkit('aikajana', [{ avain: 'lontoo', lat: 51, lng: 0, elementti: () => null }]);
  assert.equal(merkit.get('aikajana')[0].laji, 'linssi', 'merkit saavat lajin linssi');

  // Purku vie VAIN oman osansa.
  linssit.pura('vesistot');
  assert.equal(polut.get('vesistot').length, 0);
  assert.equal(kerrokset.polygonsData.length, 1, 'toisen osan polygonit jäävät');
  linssit.pura();
  assert.equal(kerrokset.polygonsData.length, 0);
  assert.equal(merkit.get('aikajana').length, 0);
});

test('polygonsData on sallittu kerros ja moottori asettaa sen sopimuksen mukaan', () => {
  assert.ok(PALLOLAUDAN_KERROKSET.includes('polygonsData'), 'kerros on lueteltu lauta.js:ssä');
  const src = lue('../js/pallolauta/linssit.js');
  assert.match(src, /\.polygonGeoJsonGeometry\('geometry'\)/);
  assert.match(src, /\.polygonCapColor\(\(d\) => d\.vari\)/);
  assert.match(src, /\.onPolygonClick\(\(d\) => d\?\.napautus\?\.\(d\)\)/);
  assert.match(src, /\.polygonsTransitionDuration\(siirtyma\)/, 'kaikki liike animoidaan');
  // Reittikerros lukee paksuuden ja katkon datumista, jotta linssin
  // viiva voi olla eri paksuinen kuin pelin reitti.
  const reitit = lue('../js/pallolauta/reitit.js');
  assert.match(reitit, /\.pathStroke\(\(d\) => d\.paksuus \?\? MATKAREITIN_PAKSUUS_PX\)/);
  assert.match(reitit, /aseta\('peli', polut\);/, 'pelin reitit ovat oma osansa');
});

test('topografia piirtyy pallolle tasavälisenä kalvona, ja kuva on repossa', () => {
  const src = lue('../js/linssit/topografia.js');
  assert.match(src, /pallolle\(lauta\) \{/, 'linssillä on pallolle-kahva');
  assert.match(src, /lauta\?\.linssit\?\.kalvo\('topografia'/, 'piirto kulkee linssimoottorin kautta');
  assert.match(src, /peittavyys: PEITTAVYYS/, 'sama 0,72 peittävyys kuin tasokartalla');
  assert.match(src, /const PALLOKUVA = 'assets\/linssit\/topografia-pallo\.webp';/);
  const kuva = new URL('../assets/linssit/topografia-pallo.webp', import.meta.url);
  assert.ok(existsSync(kuva), 'pallon tasavälinen reliefi puuttuu (tools/tee-pallotopografia.mjs)');
  assert.ok(statSync(kuva).size < 1_500_000, 'kuva on liian iso esiladattavaksi');
  // Sama kuva ja moduuli myös service workerin esilatauslistalla.
  const sw = lue('../sw.js');
  assert.ok(sw.includes("'./js/pallolauta/linssit.js'"));
  assert.ok(sw.includes("'./assets/linssit/topografia-pallo.webp'"));
});

test('ui: pallolaudalla pallolle-linssi piirtyy pallolle eikä avaa linssikarttaa', () => {
  const ui = lue('../js/ui.js');
  // Kelpoisuus yhdestä portista: pallolauta päällä, moottori pystyssä,
  // linssillä pallolle-funktio.
  assert.match(ui, /pallolinssiKelpaa\(tunnus, lista = this\.linssiTuki\?\.kaikki \?\? \[\]\) \{/);
  assert.match(ui, /typeof lista\.find\(\(l\) => l\.tunnus === tunnus\)\?\.pallolle === 'function'/);
  // Sytytys kutsuu pallolle-funktiota laudalla ja tilalla.
  assert.match(ui, /linssi\.pallolle\(this\.pallolauta, tila\)/);
  // Sammutus purkaa kahvan.
  assert.match(ui, /nyt\.kahva\?\.pura\?\.\(\);/);
  assert.match(ui, /this\.sammutaPallolinssi\(\);/);
  // Linssikartta avataan vain kääntämättömälle linssille.
  assert.match(ui, /if \(tunnus && this\.pallolautaPaalla\(\) && !pallolle\) this\.avaaLinssikartta\(\{ linssi: true \}\);/);
  // Nukkuva kartta ei unohda pallolinssin valintaa (paivitaLinssit).
  assert.match(ui, /if \(this\.pallolinssiKelpaa\(haluttu, nakyvat\)\) \{/);
});

/*
 * ── VIIVAPAKSUUDET OVAT RUUTUPIKSELEITÄ ──────────────────────────
 *
 * `pathStroke` on tässä Globe.gl-versiossa CSS-pikseleitä ruudulla
 * (Line2/LineMaterial, worldUnits epätosi; mitattu 5.9.2026,
 * docs/moduulit/karttapallo.md luku 10.3). Asteina laskettu paksuus
 * jää alle pikselin eli näkymättömiin — juuri niin kävi ensimmäisissä
 * pallototeutuksissa. Vartio pitää sekä NIMEN (`_PX`, jottei seuraava
 * lukija luule luvun olevan asteita) että SUURUUSLUOKAN (≥ 1,5 px).
 */
test('pallon polkujen paksuudet ovat _PX-nimisiä ruutupikseleitä, ei asteita', async () => {
  const reitit = await import('../js/pallolauta/reitit.js');
  const vesistot = await import('../js/linssit/vesistot.js');
  const aikajana = await import('../js/aikajana.js');
  const avaus = await import('../js/pallolauta/avaus.js');

  const paksuudet = {
    'reitit.MATKAREITIN_PAKSUUS_PX': reitit.MATKAREITIN_PAKSUUS_PX,
    'reitit.MATKAREITIN_VARJON_PAKSUUS_PX': reitit.MATKAREITIN_VARJON_PAKSUUS_PX,
    'avaus.AVAUSLENNON_VIIVAN_PX': avaus.AVAUSLENNON_VIIVAN_PX,
    'aikajana.REITIN_PAKSUUS_PX': aikajana.REITIN_PAKSUUS_PX,
    'vesistot.PALLON_UOMA_PX.1': vesistot.PALLON_UOMA_PX[1],
    'vesistot.PALLON_UOMA_PX.2': vesistot.PALLON_UOMA_PX[2],
    'vesistot.PALLON_UOMA_PX.3': vesistot.PALLON_UOMA_PX[3],
    'vesistot.PALLON_PENGER_PX.1': vesistot.PALLON_PENGER_PX[1],
    'vesistot.PALLON_PENGER_PX.2': vesistot.PALLON_PENGER_PX[2],
  };
  for (const [nimi, px] of Object.entries(paksuudet)) {
    assert.equal(typeof px, 'number', `${nimi} puuttuu`);
    assert.ok(px >= 1.5, `${nimi} on ${px} px — alle 1,5 px hukkuu ruudulla`);
    assert.ok(px <= 12, `${nimi} on ${px} px — polku ei ole putki`);
  }
  // Omistajan sopimat kaksi lukua eivät saa liikkua muun mukana.
  assert.equal(avaus.AVAUSLENNON_VIIVAN_PX, 11, 'avauslento = css .etusivupallo-viiva');
  assert.equal(aikajana.REITIN_PAKSUUS_PX, 3, 'ihmisen matkan reittiviiva');
  // Varjo on musteviivaa leveämpi — muuten se ei olisi varjo.
  assert.ok(reitit.MATKAREITIN_VARJON_PAKSUUS_PX > reitit.MATKAREITIN_PAKSUUS_PX);

  /*
   * Nimivartio: yksikään pallon POLKUJEN paksuusvakio ei saa olla
   * `_AST`-loppuinen. Kaaret (arcStroke) ovat putkia pallon omissa
   * yksiköissä, ja niiden nimi on `_YKS` — sekään ei ole `_AST`.
   */
  for (const polku of ['../js/pallolauta/reitit.js', '../js/linssit/vesistot.js', '../js/aikajana.js']) {
    const lahde = lue(polku);
    const osumat = lahde.match(/export const [A-Z_]*(PAKSUUS|LEVEYS|UOMA|PENGER)[A-Z_]*_AST\b/g) ?? [];
    assert.deepEqual(osumat, [], `${polku}: paksuus asteina — ${osumat.join(', ')}`);
  }
});

/*
 * NAAPURIREITIN VARJO (5.9.2026): pallon pinta on tumma ja kirjava,
 * eikä 42 %:n muste lukeudu siltä kuten pergamentilta. Jokainen reitti
 * on siksi kaksi polkua: vaalea varjo hitusen alempana ja musteviiva
 * sen päällä — samalla katkolla, jotta katkoviiva pysyy yhtenä
 * merkkinä.
 */
test('naapurireitti piirtyy varjon kanssa: kaksi polkua per reitti', () => {
  const reitit = lue('../js/pallolauta/reitit.js');
  assert.match(reitit, /polut\.push\(m\.varjo, m\.datum\);/, 'varjo ennen viivaa');
  assert.match(reitit, /paksuus: MATKAREITIN_VARJON_PAKSUUS_PX,/);
  assert.match(reitit, /vari: REITIN_VARIT\.varjo,/);
  // Varjo on omalla korkeudellaan, jottei kaksi viivaa välky toistensa läpi.
  assert.match(reitit, /pisteet\.map\(\(\[lat, lng\]\) => \[lat, lng, REITIN_VARJON_KORKEUS\]\)/);
  assert.match(reitit, /export const REITIN_VARJON_KORKEUS = 0\.0018;/);
  assert.match(reitit, /\.pathPointAlt\(\(p\) => \(p\.length > 2 \? p\[2\] : REITIN_KORKEUS\)\)/);
});
