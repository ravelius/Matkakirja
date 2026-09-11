import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * LÄHTÖKAUPUNGIN VALINTA PALLOLLA — aalto 3A
 * (docs/moduulit/karttapallo.md luku 10.3; omistaja 5.9.2026 sanatarkasti:
 * *"Käännä kaikki pallolle, niin voidaan sulkea vanha kartta kokonaan."*).
 *
 * Aalto 1D jätti tähän yhden poikkeuksen: "Valitse aloituskaupunki"
 * herätti tasokartan lepotilasta, ja lähtökaupunki valittiin
 * kohderenkaista svg#boardilta. Se oli pallolaudan VIIMEINEN pelitoiminto,
 * joka vielä ajoi js/kartta.js:ää. Nämä vartijat pitävät huolen siitä,
 * ettei herätys palaa takaisin ja että valintanäkymä on pallon oma.
 *
 * Vartijat ovat tekstivartijoita samalla mallilla kuin
 * tests/pallolauta.test.mjs ja tests/aikajana-pallolla.test.mjs: pallon
 * kerrokset ja Globe.gl eivät aja Nodessa, mutta haarat ja kytkennät ovat
 * luettavissa lähteestä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const {
  ALOITUSVALINNAN_ANKKURIT, ALOITUSVALINNAN_ANKKURIVARA, ALOITUSVALINNAN_LAT,
  ALOITUSVALINNAN_LON, ALOITUSVALINNAN_PALLON_OSUUS, aloitusvalinnanKorkeus,
} = await import('../js/pallolauta/lauta.js');
const { PALLO_FOV } = await import('../js/pallolauta/kamera.js');
const {
  KOHDEMERKIN_HALO_LAAJIN, KOHDEMERKIN_HUOMIO_PX, KOHDEMERKIN_PX,
} = await import('../js/pallolauta/merkit.js');
const { ETUSIVUN_KOHTEET, ETUSIVUN_NAKYVAT } = await import('../js/ui-apurit.js');
const {
  LIVIAN_AVAUKSEN_VIIVE_MS, LIVIAN_AVAUS, LIVIAN_YHDEN_REITIN_KUPLA, livianAvausSarja,
} = await import('../js/livia.js');
const { laudaltaAsteiksi } = await import('../js/fokusmitat.js');
const { packById } = await import('../js/pack.js');
const ui = lue('../js/ui.js');
const lauta = lue('../js/pallolauta/lauta.js');

/* ================================================================== *
 * 1. Kartta ei herää lähtövalinnassa pallolaudalla
 * ================================================================== */

test('aloitaKartalta ei herätä karttaa pallolaudalla', () => {
  const nappi = ui.match(/ {2}aloitaKartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(nappi, /this\.kartta\./,
    'lähtövalinnan nappi ei saa koskea tasokarttaan lainkaan');
  assert.match(nappi, /if \(this\.aloituslentoPallolla\(\)\) \{ this\.aloitaPallolta\(\); return; \}/);
  assert.match(nappi, /this\.aloitaTasokartalta\(\);/);
  // Vanha kulku säilyy ?lauta=kartta-tilassa ja pallon varapolussa (3B poistaa).
  // Vanha polku on 5.9.2026 alkaen asynkroninen: tasokartan moduuli
  // ladataan vasta tässä (laiskoituserä 5b, js/kartta-lataus.js).
  const vanha = ui.match(/ {2}async aloitaTasokartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(vanha, /await this\.varmistaKartta\(\);/);
  assert.match(vanha, /this\.kartta\.heraa\(\);/);
  assert.match(vanha, /this\.kartta\.zoomaaAloituskartta\(/);
});

test('aloitaPallolta nostaa lipun ennen piirtoa ja Livia lennähtää mukaan', () => {
  const polku = ui.match(/ {2}aloitaPallolta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  // Lippu ENNEN renderiä: pallolautaHalutaan, renderIntro ja
  // aloitusvalinnanKohteet lukevat sen samassa piirrossa.
  assert.match(polku, /this\.aloitusvalintaPallolla = true;\n\s*this\.render\(\);/);
  // Lippu on laudan oma: js/kartta.js nollaa aloitusZoomin aina kun
  // kartta nukahtaa (nollaaAloitusZoom), ja pallo nukuttaa sen.
  assert.match(lue('../js/kartta.js'), /this\.ui\.aloitusZoom = false;/);
  assert.doesNotMatch(lue('../js/kartta.js'), /aloitusvalintaPallolla/,
    'tasokartta ei saa koskea pallon valintalippuun');
  // Repliikit ennallaan: sama kutsu kuin tasokartan lähikuvassa
  // (js/kartta.js zoomaaAloituskartta).
  assert.match(polku, /naytaLivianAvaus\(this\);/);
  assert.match(ui, /naytaLivianAvaus, naytaLivianPaljastus/,
    'js/ui.js tuo Livian avauksen js/livia.js:stä');
  assert.match(lue('../js/kartta.js'), /naytaLivianAvaus\(this\.ui\);/,
    'tasokartan polku pitää saman repliikkisarjan');
});

test('pallolauta avautuu vasta napista, mutta jo pickstart-vaiheessa', () => {
  const halutaan = ui.match(/^ {2}pallolautaHalutaan\(\) \{[\s\S]*?\n {2}\}/m)[0];
  assert.match(halutaan, /if \(this\.game\.phase === 'pickstart'\) return this\.aloitusvalintaPallolla;/);
  // Pakkaehto ei enää portita pickstartia: aloitusnäytön lauta on
  // js/packs/maailma.js eikä maailmankartta.
  assert.match(halutaan, /return this\.game\.pack\?\.id === 'maailmankartta';/);
});

test('etusivun pallovideo puretaan samassa piirrossa kuin valinta alkaa', () => {
  assert.match(ui, /if \(nakyy && !this\.aloitusvalintaPallolla && etusivupalloPaalla\(\)\) \{/,
    'renderIntro ei saa avata pallovideota enää valintatilassa');
});

/*
 * VÄLIAIKAISESTI POIS -VARTIO (omistaja 7.9.2026, sanatarkasti: *"Voisiko
 * vanhan kartan ottaa pelistä ainakin väliaikaisesti kokonaan pois, eli
 * että se ei lataisi sitä millään lailla, eikä se olisi myöskään
 * kytkettävissä päälle?"*). Ennen tämä testi vaati, että kaatunut pallo
 * antaa lähtövalinnan tasokartalle. Nyt vanhaa karttaa ei ole olemassa
 * pelaajalle, joten varapolku on kaksiaskelinen: pallo uudelleen
 * kevennettynä, ja vasta toisesta kaatumisesta selkeä virheilmoitus.
 * Testiä EI poistettu, vaan se vartioi uutta sääntöä — ja nimenomaan
 * sitä, ettei tasokartalle enää mennä.
 */
test('pallon varapolku yrittää palloa kevennettynä eikä avaa vanhaa karttaa', () => {
  const varapolku = ui.match(/ {2}pallolautaVarapolku\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(varapolku, /if \(!palloKevennetty\(\)\) \{\n\s*asetaPalloKevennys\(true\);/,
    'ensimmäinen kaatuminen: pallo uudelleen kevennettynä');
  assert.match(varapolku, /this\.pallolautaEpaonnistui = true;/,
    'toinen kaatuminen: lauta jää avaamatta');
  assert.doesNotMatch(varapolku, /aloitaTasokartalta|kartta\.heraa/,
    'varapolku ei saa herättää tasokarttaa (vanha kartta pois käytöstä)');
  // Lähtövalinta pysyy pallolla myös epäonnistumisen jälkeen.
  const aloita = ui.match(/ {2}aloitaKartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(aloita, /if \(!VANHA_KARTTA_KAYTOSSA\) \{ this\.aloitaPallolta\(\); return; \}/);
});

/* ================================================================== *
 * 2. Valintatila käyttää laudan omia kerroksia
 * ================================================================== */

test('valittavat kaupungit ovat laudan merkkejä (kohde-laji), eivät svg-renkaita', () => {
  // ui.js kertoo MITKÄ kaupungit, lauta piirtää MITEN.
  const kohteet = ui.match(/ {2}aloitusvalinnanKohteet\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(kohteet, /this\.game\.phase !== 'pickstart' \|\| this\.katselu \|\| !this\.aloitusvalintaPallolla/,
    'kohteet ilmestyvät vasta napin jälkeen, kuten drawTargetsissa');
  assert.match(kohteet, /\[\.\.\.ETUSIVUN_KOHTEET\]/,
    'sama joukko kuin tasokartan kohderenkailla');
  const nakyvat = ui.match(/ {2}aloitusvalinnanNakyvat\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(nakyvat, /return ETUSIVUN_NAKYVAT;/,
    'sama niukkuus kuin paivitaAloituskaupungit tasokartalla');

  // Lauta pyytää molemmat ui:lta eikä keksi omaa joukkoaan.
  assert.match(lauta, /const aloitusNakyvat = \(\) => ui\.aloitusvalinnanNakyvat\?\.\(\) \?\? null;/);
  assert.match(lauta, /const aloitusKohteet = \(\) => \(ui\.aloitusvalinnanKohteet\?\.\(\) \?\? \[\]\)/);
  // Merkki on nopanheiton kohde: sama datum, sama kohdeElementti.
  assert.match(lauta, /return \{ key: `aloitus:\$\{city\.id\}`, x: k\.x, y: k\.y, city, huomio: true \};/);
  assert.match(lauta, /if \(game\.phase === 'pickstart'\) return aloitusKohteet\(\);/,
    'kohdevalinta antaa aloituskaupungit merkkikerrokselle (osa `peli`)');
  const merkit = lue('../js/pallolauta/merkit.js');
  assert.match(merkit, /else if \(d\.laji === 'kohde'\) el = kohdeElementti\(d\);/);
  assert.match(merkit, /if \(osa === 'peli'\) kohteet = lista\.filter\(\(d\) => d\.laji === 'kohde'\);/);
});

test('pallon lauta on aina maailmankartta — myös aloitusnäytön aikana', () => {
  /*
   * Aloitusnäytön lauta (js/packs/maailma.js) on eri koordinaatistossa
   * kuin maailmankartta, eikä sen pisteitä voi projisoida pallolle.
   * Sama pakka annetaan myös nimikerrokselle, joka muistaa aineistonsa.
   */
  assert.match(lauta, /const pack = ui\.game\.pack\?\.id === PALLO_LAUTA \? ui\.game\.pack : packById\(PALLO_LAUTA\);/);
  assert.match(lauta, /const packKaupunki = new Map\(\(pack\?\.cities \?\? \[\]\)\.map\(\(c\) => \[c\.id, c\]\)\);/);
  assert.match(lauta, /ui, merkit, asteet: pallonAsteet, ruudulla, kotelo, pack,/);
  assert.match(lue('../js/pallolauta/nimet.js'), /karttanimienKaupungit\(pack \?\? ui\.game\.pack\)/);
});

/*
 * ZOOM JA RAJAUS OMISTAJAN KUVASTA (omistaja 7.9.2026 iltapäivä,
 * sanatarkasti: *"Kartan zoomaustason voisikin muuttaa tällaiseksi,
 * mikä nyt näkyy kuvassa."*). Rajaus ei ole enää laatikkosovitus vaan
 * KIINTEÄ näkymä: keskipiste Välimeren yllä ja korkeus pallon koosta
 * ruudulla. Luvut ovat MITTOJA — jos ne muuttuvat, kuva on mitattava
 * uudelleen selaimessa.
 */
test('valintanäkymä on kiinteä: Välimeren keskipiste ja pallo ruudun korkuisena', () => {
  assert.equal(ALOITUSVALINNAN_LAT, 30);
  assert.equal(ALOITUSVALINNAN_LON, 17);
  assert.equal(ALOITUSVALINNAN_PALLON_OSUUS, 0.55);
  assert.deepEqual(ALOITUSVALINNAN_ANKKURIT, ['lontoo', 'ateena']);
  // Kamera-ajo menee suoraan asteisiin ja korkeuteen, ei bboxiin.
  assert.match(lauta, /const aloitusnakyma = \(\{ kesto = 0 \} = \{\}\) => \{/);
  assert.match(lauta, /lat: ALOITUSVALINNAN_LAT, lng: ALOITUSVALINNAN_LON, korkeus,/);
  assert.match(lauta, /const korkeus = aloitusvalinnanKorkeus\(\{/);
  assert.doesNotMatch(lauta, /ALOITUSVALINNAN_KUPLAVARA_PX|ALOITUSVALINNAN_MARGINAALI = /,
    'kuplavara ja laatikkomarginaali poistuivat kiinteän rajauksen myötä');
  assert.match(lauta, /^ {4}aloitusnakyma,$/m, 'lauta vie näkymän ulos ui.js:lle');
  assert.match(ui, /if \(this\.game\.phase === 'pickstart'\) lauta\.aloitusnakyma\(\);\n\s*else lauta\.kamera\.kotiin\(\);/,
    'avaaPallolauta ei kutsu kotiin-ajoa ennen kuin matkaajalla on paikka');
});

/*
 * KORKEUDEN KAAVA MITATAAN, EI ARVATA. Näkyvä pallo on
 * PALLO_FOV-kulman perspektiivissä, joten sekä pallon säde että
 * ankkurikaupunkien ruutupaikat ovat laskettavissa Nodessa — juuri ne
 * luvut, jotka omistaja näkee kuvassa.
 */
test('rajauksen luvut: pallon säde 0,55 × korkeus, Lontoo ja Ateena kuvassa', () => {
  const AST = Math.PI / 180;
  const tan = Math.tan((PALLO_FOV / 2) * AST);
  // Lontoo ja Ateena maailmankartan omista koordinaateista.
  const pallonKaupunki = (id) => {
    const c = (packById('maailmankartta').cities ?? []).find((k) => k.id === id);
    return laudaltaAsteiksi('maailmankartta', c.x, c.y);
  };
  const ankkurit = ALOITUSVALINNAN_ANKKURIT.map(pallonKaupunki);
  /** Ankkurin ruutupaikka ruudun PUOLIKKAINA keskipisteestä. */
  const ruudulla = (etaisyys, { lat, lon }) => {
    const [a0, b0, a, b] = [ALOITUSVALINNAN_LAT * AST, ALOITUSVALINNAN_LON * AST, lat * AST, lon * AST];
    const v = [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
    const piste = (akseli) => v[0] * akseli[0] + v[1] * akseli[1] + v[2] * akseli[2];
    const u = piste([Math.cos(a0) * Math.cos(b0), Math.cos(a0) * Math.sin(b0), Math.sin(a0)]);
    const e = piste([-Math.sin(b0), Math.cos(b0), 0]);
    const n = piste([-Math.sin(a0) * Math.cos(b0), -Math.sin(a0) * Math.sin(b0), Math.cos(a0)]);
    return { x: e / ((etaisyys - u) * tan), y: n / ((etaisyys - u) * tan) };
  };
  for (const [leveysPx, korkeusPx] of [[2000, 1125], [1400, 900], [390, 844], [834, 1194]]) {
    const korkeus = aloitusvalinnanKorkeus({ leveysPx, korkeusPx, ankkurit });
    const etaisyys = 1 + korkeus;
    // Pallon säde ruudulla: silhuetin kulmasäde perspektiivissä.
    const sade = (Math.tan(Math.asin(1 / etaisyys)) / tan) * (korkeusPx / 2);
    assert.ok(Math.abs(sade / korkeusPx - ALOITUSVALINNAN_PALLON_OSUUS) < 0.01,
      `${leveysPx}×${korkeusPx}: pallon säde ${(sade / korkeusPx).toFixed(3)} × korkeus`);
    const [lontoo, ateena] = ankkurit.map((a) => ruudulla(etaisyys, a));
    // Lontoo ylhäällä vasemmalla keskeltä, Ateena keskellä oikealla.
    assert.ok(lontoo.x < 0 && lontoo.y > 0.4, `${leveysPx}×${korkeusPx}: Lontoo ${JSON.stringify(lontoo)}`);
    assert.ok(ateena.x > 0 && ateena.y > 0 && ateena.y < lontoo.y,
      `${leveysPx}×${korkeusPx}: Ateena ${JSON.stringify(ateena)}`);
    // Molemmat mahtuvat kuvaan (myös puhelimen kapealla ruudulla).
    const varaX = ALOITUSVALINNAN_ANKKURIVARA * (leveysPx / korkeusPx);
    for (const [nimi, p] of [['Lontoo', lontoo], ['Ateena', ateena]]) {
      assert.ok(Math.abs(p.x) <= varaX && Math.abs(p.y) <= ALOITUSVALINNAN_ANKKURIVARA,
        `${leveysPx}×${korkeusPx}: ${nimi} ei mahdu kuvaan (${JSON.stringify(p)})`);
    }
  }
  // Hyvin kapea ruutu vetäytyy kauemmas, jotta ankkurit mahtuvat.
  assert.ok(aloitusvalinnanKorkeus({ leveysPx: 300, korkeusPx: 900, ankkurit })
    > aloitusvalinnanKorkeus({ leveysPx: 2000, korkeusPx: 1125, ankkurit }),
    'kapealla ruudulla kamera vetäytyy');
});

/* ================================================================== *
 * 2b. Pallo pysyy PAIKALLAAN valinnassa, täydessä terävyydessä
 * ================================================================== */

/*
 * Omistaja 7.9.2026 iltapäivä sanatarkasti: *"Kartta voisi sittenkin
 * pysyä ihan paikallaan tässä, kun pelaaja valitsee, minne hän haluaa
 * lentää."* Tämä kumoaa 5.9.2026 lisätyn hitaan pyörinnän
 * (ALOITUKSEN_PYORINTA_AST_S) — ja vartio on nimenomaan se, ettei
 * automaattinen liike palaa vahingossa.
 */
test('valinnassa pallo ei pyöri itsestään', () => {
  assert.doesNotMatch(lauta, /ALOITUKSEN_PYORINTA_AST_S|ALOITUKSEN_PYSAYTYS_MS/,
    'pyörinnän vakiot on poistettu');
  assert.doesNotMatch(lauta, /aloitaAloituksenPyorinta|hidastaAloituksenPyorinta|seisAloituksenPyorinta/,
    'pyörinnän silmukkaa ja pysäyttimiä ei enää ole');
  assert.doesNotMatch(lauta, /requestAnimationFrame\(askel\);\n\s*return true;\n\s*\};\n\s*kotelo\.addEventListener\('pointerdown'/,
    'valinnan omaa rAF-silmukkaa ei ole');
  // Rajapinta jää vartioksi ja vastaa aina false.
  assert.match(lauta, /aloitusvalinnanPyorinta: \(\) => false,/);
  // Pelaaja saa yhä panoroida ja zoomata: pallon omat eleet ovat
  // js/pallo.js:ssä eikä lauta kytke niitä pois valinnassa.
  assert.doesNotMatch(lauta, /pickstart[^\n]*enableRotate|enableRotate[^\n]*pickstart/);
});

test('terävä tila on pakotettuna valinnan ajan ja vapautuu purussa', () => {
  assert.match(lauta, /laatatSaatavilla, laattatasoMax, lataaPallokirjasto, pakotaPallonLaatu,/);
  assert.match(lauta, /const pyydaAloituksenLaatu = \(\) => \{\n\s*if \(aloituksenLaatu\) return;\n\s*aloituksenLaatu = true;\n\s*pakotaPallonLaatu\(true\);/);
  assert.match(lauta, /const vapautaAloituksenLaatu = \(\) => \{\n\s*if \(!aloituksenLaatu\) return;\n\s*aloituksenLaatu = false;\n\s*pakotaPallonLaatu\(false\);/);
  // Pyyntö lähtee jo ennen kamera-ajoa: laatat haetaan terävinä heti.
  assert.match(lauta, /pyydaAloituksenLaatu\(\);\n\s*return kamera\.ajaKamera\(/);
  // Vapautus kahdesta paikasta: piirto (kaupunki valittu) ja purku.
  assert.match(lauta, /if \(aloituksenLaatu && ui\.game\.phase !== 'pickstart'\) paataAloitusvalinta\(\);/);
  const pura = lauta.match(/ {4}pura: \(\) => \{[\s\S]*?\n {4}\},/)[0];
  assert.match(pura, /paataAloitusvalinta\(\);/,
    'pakotus on istunnon laskuri — se ei saa jäädä päälle puretun laudan jälkeen');
});

/* ================================================================== *
 * 2e. Neljätoista kohdetta ja niiden huomiorengas
 * ================================================================== */

/*
 * OMISTAJA 7.9.2026 iltapäivä sanatarkasti: *"ja nostetaan kokeeksi
 * kaikki kohdekaupungit takaisin mitä aiemmin oli käytössä"* ja *"Ja
 * valittavien kohdekaupunkien huomioympyrää voisi hieman tehostaa."*
 */
test('lähtövalinnassa on neljätoista kohdetta ja kaikki näkyvät', () => {
  assert.equal(ETUSIVUN_KOHTEET.size, 14);
  // Omistajan päätös 7.9.2026 illalla: Los Angeles vaihtui San
  // Franciscoksi ja Istanbul lisättiin.
  assert.ok(!ETUSIVUN_KOHTEET.has('losangeles'), 'Los Angeles ei ole enää kohde');
  assert.ok(!ETUSIVUN_NAKYVAT.has('losangeles'), 'Los Angeles ei näy lähtövalinnassa');
  for (const id of ['ateena', 'newyork', 'kairo', 'rio', 'mumbai', 'peking', 'sydney',
    'moskova', 'tokio', 'singapore', 'kapkaupunki', 'sanfrancisco', 'tanger', 'istanbul']) {
    assert.ok(ETUSIVUN_KOHTEET.has(id), `${id} puuttuu lähtökohteista`);
    assert.ok(ETUSIVUN_NAKYVAT.has(id), `${id} ei näy aloituskartalla`);
  }
  assert.ok(ETUSIVUN_NAKYVAT.has('lontoo'), 'Lontoo on lähtöpiste');
  assert.equal(ETUSIVUN_NAKYVAT.size, ETUSIVUN_KOHTEET.size + 1);
  // Jokainen kohde on olemassa sekä aloitusnäytön että pallon laudalla.
  for (const nimi of ['maailma', 'maailmankartta']) {
    const kaupungit = new Set((packById(nimi).cities ?? []).map((c) => c.id));
    for (const id of ETUSIVUN_NAKYVAT) {
      assert.ok(kaupungit.has(id), `${id} puuttuu laudalta ${nimi}`);
    }
  }
});

test('esilämmitys valitsee yhden kohteen, ei neljäätoista lautaa', () => {
  const esi = ui.match(/ {2}esilammitaAvaus\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(esi, /const kohdeId = ETUSIVUN_KOHTEET\.has\(ESILAMMITETTAVA_KOHDE\)/);
  assert.match(ui, /const ESILAMMITETTAVA_KOHDE = 'ateena';/);
  // Talletus on kohdekohtainen: muille kaupungeille repliikki arvotaan
  // doPickStartissa kuten ennenkin (rng-järjestys säilyy).
  assert.match(ui, /this\.esilammitys\?\.kohde === city\.id/);
});

test('valittava kaupunki saa huomiorenkaan, nopanheiton kohde ei', () => {
  assert.match(lauta, /return \{ key: `aloitus:\$\{city\.id\}`, x: k\.x, y: k\.y, city, huomio: true \};/);
  const merkit = lue('../js/pallolauta/merkit.js');
  // Mitta on ruudun px ja selvästi kohdemerkin haloa laajempi.
  assert.equal(KOHDEMERKIN_HUOMIO_PX, 54);
  assert.ok(KOHDEMERKIN_HUOMIO_PX / 2 > KOHDEMERKIN_PX / 2 * KOHDEMERKIN_HALO_LAAJIN,
    'huomiorengas on kohdemerkin haloa laajempi');
  assert.match(merkit, /const huomio = kohde\.huomio === true;/);
  assert.match(merkit, /const rengas = ympyra\('pallolauta-huomio'\);/);
  // Nimi nousee ylimmän kehän yläpuolelle, ei renkaan päälle.
  assert.match(merkit, /const nimenSade = Math\.max\(r \* KOHDEMERKIN_HALO_LAAJIN, huomio \? KOHDEMERKIN_HUOMIO_PX \/ 2 : 0\);/);
  assert.match(merkit, /nimi\.setAttribute\('y', String\(-\(nimenSade \+ KOHDEMERKIN_NIMI_RAKO_PX\)\)\);/);
  // Datum kantaa lipun merkkikerrokseen asti.
  assert.match(merkit, /huomio: k\.huomio === true,/);
  // Syke on hidas ja kultainen, ja liikeherkkyydessä se jää pois.
  const css = lue('../css/styles.css');
  const saanto = css.match(/\.pallolauta-huomio \{[\s\S]*?\n\}/)[0];
  assert.match(saanto, /stroke: var\(--kulta, #eab84e\);/);
  assert.match(saanto, /animation: pallolauta-huomio 2\.6s ease-in-out infinite;/);
  const jakso = Number(saanto.match(/animation: pallolauta-huomio ([\d.]+)s/)[1]);
  assert.ok(jakso >= 2 && jakso <= 3, 'omistajan haarukka: 2–3 s jakso');
  assert.match(css, /@keyframes pallolauta-huomio \{[\s\S]*?transform: scale\(1\.16\); opacity: 0\.42;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\n {2}\.pallolauta-huomio \{\n {4}animation: none;/);
});

test('Livian "vasta yhden reitin" -kupla väistyy usealla kohteella', () => {
  const livia = lue('../js/livia.js');
  // Teksti pysyy kaanonissa — vain näyttö on ehdollinen.
  assert.ok(LIVIAN_AVAUS.some((t) => /anteeksi valikoima/.test(t)),
    'kaanoninen repliikki ei saa kadota tiedostosta');
  assert.equal(LIVIAN_YHDEN_REITIN_KUPLA, 3);
  assert.match(LIVIAN_AVAUS[LIVIAN_YHDEN_REITIN_KUPLA], /vasta yhden reitin/);
  // Usealla kohteella kupla jää pois, yhdellä se on mukana.
  assert.equal(livianAvausSarja(14).length, LIVIAN_AVAUS.length - 1);
  assert.equal(livianAvausSarja(1).length, LIVIAN_AVAUS.length);
  assert.ok(!livianAvausSarja(14).some((r) => /anteeksi valikoima/.test(r.teksti)));
  // Oletus tulee pelin omasta joukosta (14 → kupla pois).
  assert.equal(livianAvausSarja().length, LIVIAN_AVAUS.length - 1);
  // Äänite seuraa KAANONIN numeroa, jottei ohitetun kuplan ääni soi
  // seuraavan kohdalla.
  assert.deepEqual(livianAvausSarja(14).map((r) => r.indeksi), [0, 1, 2, 4]);
  // Teksti kulkee mukana, jotta vanhentunut äänite jää hiljaiseksi
  // (js/liviapuhe.js livianAaniAjanTasalla).
  assert.match(livia, /soitaLivianAani\(ui, 'avaus', rivi\.indeksi, \{ teksti \}\);/);
});

/* ================================================================== *
 * 2c. Valittavalla kaupungilla on yksi nimi, ei kahta
 * ================================================================== */

/*
 * Omistajan kaappauksessa 5.9.2026 klo 00.30 Ateenan kohdalla oli KAKSI
 * nimeä: nimikerroksen harmaa kapiteeli ja kohdemerkin oma tumma lappu.
 * Merkin nimi voittaa — se on kehotus toimia ja sama molemmilla laudoilla.
 */
test('valittavan kaupungin nimi tulee merkistä, ei nimikerroksesta', () => {
  assert.match(lauta, /const aloitusNimet = \(\) => \{/);
  assert.match(lauta, /const kohteet = new Set\(aloitusKohteet\(\)\.map\(\(k\) => k\.city\.id\)\);/);
  assert.match(lauta, /return new Set\(\[\.\.\.nakyvat\]\.filter\(\(id\) => !kohteet\.has\(id\)\)\);/);
  assert.match(lauta, /const vain = lento\?\.nimet \?\? aloitusNimet\(\);/,
    'ladonta rajaa nimet aloitusNimet-joukkoon (Lontoo), ei koko näkyvään joukkoon');
  // Piste näkyy edelleen molemmilta (PISTE VAIN NIMEN KANSSA ei koske
  // valintaa: kohdemerkki on nimi).
  assert.match(lauta, /const valinta = aloitusNakyvat\(\);\n\s*if \(valinta\) return valinta\.has\(k\.id\);/);
  // Kohdemerkki piirtää nimen (js/pallolauta/merkit.js kohdeElementti).
  assert.match(lue('../js/pallolauta/merkit.js'), /nimi\.textContent = kohde\.city\.name;/);
});

/* ================================================================== *
 * 2d. Livian kuplat 1,5 s myöhemmin
 * ================================================================== */

/*
 * Omistaja 5.9.2026 klo 00.30 sanatarkasti: *"pulun kommentit noin
 * 1,5 sek myöhemmin"*. Lisäviive on VAIN ensimmäisen kuplan edessä:
 * kuplien keskinäinen rytmi (KUPLIEN_VALI, lukuaika) on ennallaan.
 */
test('Livian ensitervehdys alkaa lennossa ja seuraava odottaa laskua, rytmi ennallaan', () => {
  assert.equal(LIVIAN_AVAUKSEN_VIIVE_MS, 1500);
  const livia = lue('../js/livia.js');
  assert.match(livia, /const AVAUKSEN_VIIVE = 900;/);
  assert.match(livia, /polloLivianEnsiliito\(laskeutui, \{ reducedMotion: ui\.reducedMotion \}\)/);
  assert.match(livia, /setTimeout\(\(\) => naytaRepliikki\(ui, 0\), ui\.reducedMotion \? 0 : AVAUKSEN_VIIVE\)/,
    'ensimmäinen kupla alkaa lennossa; reduced motionissa heti');
  assert.match(livia, /if \(!avausLiitoValmis\) \{ avausLiidonJalkeinen = i; return; \}/,
    'toinen repliikki ei ohita laskua');
  // Kuplien keskinäinen rytmi ei muuttunut: lukuaika ohjaa yhä sarjaa.
  // (7.9.2026: lukuaika on VÄHIMMÄISAIKA — sitä pidempi äänite venyttää
  // kuplaa, js/liviapuhe.js livianKuplanAjastin.)
  assert.match(livia, /const KUPLIEN_VALI = 280;/);
  assert.match(livia,
    /avausAjastin = livianKuplanAjastin\(\n\s*lukuaika\(teksti\), aani,\n\s*\(\) => seuraavaRepliikki\(ui, i \+ 1\),/);
});

test('nappula seisoo Lontoossa PALLON koordinaateissa myös lähtövalinnassa', () => {
  // Aloitusnäytön lauta on eri projektiossa: ilman tätä apuria nappula
  // päätyi Tyynellemerelle (mitattu Chromiumilla).
  assert.match(lauta, /const pallonKohta = \(pos\) => \{/);
  // Pelin oma lauta: paikka luetaan laudalta (reitillä korjatulta
  // polylta, kaupungissa pixelOfilla); muu lauta: kaupunki tunnuksella.
  assert.match(lauta, /if \(ui\.game\.pack\?\.id === pack\?\.id\) \{/);
  assert.match(lauta, /const \{ board \} = ui\.game;\n\s*if \(!board\) return null;/);
  assert.match(lauta, /return pixelOf\(board, pos\);/);
  assert.match(lauta, /const c = packKaupunki\.get\(pos\.city\);/);
  assert.match(lauta, /const kohta = pallonKohta\(pos\);/);
});

/* ================================================================== *
 * 3. Napautus käynnistää pelin
 * ================================================================== */

test('kohteen napautus vie doPickStartiin, muu kaupunki on vaiti', () => {
  const kohde = lauta.match(/ {2}const napautaKohde = \(kohde\) => \{[\s\S]*?\n {2}\};/)[0];
  assert.match(kohde, /if \(game\.phase === 'pickstart'\) \{\n\s*if \(!kohde\.city\) return false;\n\s*heraa\(\);\n\s*ui\.doPickStart\(kohde\.city\);/);
  // Kohde ratkaistaan ENNEN kaupunkeja (napautaPintaan): kehotus toimia
  // voittaa Lontoon pisteen.
  assert.match(lauta, /const kohde = lahinKohde\(lat, lng\);\n\s*if \(kohde\) \{ napautaKohde\(kohde\); return; \}/);
  const kaupunki = lauta.match(/ {2}const napautaKaupunki = \(k\) => \{[\s\S]*?\n {2}\};/)[0];
  assert.match(kaupunki, /if \(ui\.game\.phase === 'pickstart'\n\s*&& !\(kehittajaTilaPaalla\(\) && kehittajaMaailmaPaalla\(\) && !ui\.katselu\)\) return false;/,
    'Lontoo on lähtöpiste eikä valinta — sen napautus ei sukella kameralla');
});

test('doPickStart on yhä yksi polku molemmille laudoille', () => {
  // Napautus tekee saman kuin tasokartan kohderengas: peli ei tiedä
  // kummalta laudalta valinta tuli.
  assert.match(ui, /if \(!zoomaa\) this\.doPickStart\(c\);/, 'tasokartan rengas kutsuu doPickStartia');
  assert.match(ui, /if \(kartalento && this\.aloituslentoPallolla\(\)\) this\.kartta\.nuku\(\);/);
  assert.match(ui, /peruLivianAvaus\(\);/, 'valinta vie Livian kuplat pois');
});

/* ================================================================== *
 * 4. Häivytetty avausteksti ei syö napautuksia
 * ================================================================== */

test('häivytetty avausteksti on poissa myös sormelta', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.intro\.intro-fade,\n\.intro\.intro-fade \* \{ pointer-events: none; \}/,
    'näkymätön Valitse aloituskaupunki -nappi veisi pallon pyörityksen');
});
