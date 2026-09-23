/*
 * PIIRTOKOE JA KEHYSPROFIILI RATASVALIKOSTA (omistaja 22.9.2026 klo
 * 20.15: kokeet suoraan peliin, koska pitkän ?koe=-osoitteen naputtelu
 * puhelimella on se este, jonka takia koe jää ajamatta).
 *
 * Kaksi asiaa, jotka eivät näy diffistä:
 *   1. VALIKON VALINTA ON SAMA KUIN LIPPU. Moduulit lukevat koelippunsa
 *      kahdesta apurista; molempien on nähtävä valinta.
 *   2. OSOITE VOITTAA MITTAUKSESSA. Kun apurille annetaan hakumerkkijono
 *      (savuke, testi), laitteen muistia ei saa lukea lainkaan — muuten
 *      mittaus mittaisi väärää tilaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function valeMuisti() {
  const varasto = new Map();
  globalThis.localStorage = {
    getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
    setItem: (k, v) => { varasto.set(k, String(v)); },
    removeItem: (k) => { varasto.delete(k); },
  };
  globalThis.dispatchEvent = () => true;
  return () => { delete globalThis.localStorage; delete globalThis.dispatchEvent; delete globalThis.location; };
}

const {
  PIIRTOKOKEIDEN_VAIHTOEHDOT, asetaKehysprofiili, asetaPiirtokoe, kehysprofiiliPaalla,
  piirtokoeValinta, tallennetutKokeet, koetilanAvain, luoKoevaihdonLataaja,
  PIIRTOKOE_LATAUS_VIIVE_MS,
} = await import('../js/piirtokoe-asetus.js');
const { laattakerroksenKokeet } = await import('../js/pallolaatat.js');
const { piirtokokeet } = await import('../js/pallolauta/kerrokset.js');
const { kankaanTausta, luoAlfatonKonteksti } = await import('../js/pallo.js');

test('vaihtoehdot: oletus normaali ilman lippua, muilla oma lippunsa', () => {
  assert.equal(PIIRTOKOKEIDEN_VAIHTOEHDOT[0].avain, 'normaali');
  assert.equal(PIIRTOKOKEIDEN_VAIHTOEHDOT[0].lippu, null, 'oletus ei lisää lippua');
  for (const koe of PIIRTOKOKEIDEN_VAIHTOEHDOT.slice(1)) {
    assert.ok(koe.lippu && koe.nimi && koe.seloste && koe.ikoni, `${koe.avain}: lippu, nimi, seloste, ikoni`);
  }
});

test('valinta muistetaan ja näkyy molemmissa lippuapureissa', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    assert.equal(piirtokoeValinta(), 'normaali');
    assert.deepEqual([...tallennetutKokeet()], []);

    asetaPiirtokoe('syotetouch');
    assert.equal(piirtokoeValinta(), 'syotetouch');
    assert.ok(laattakerroksenKokeet().has('syotetouch'), 'pallolaatat näkee valinnan');
    assert.ok(piirtokokeet().has('syotetouch'), 'kerrokset näkee valinnan');

    asetaKehysprofiili(true);
    assert.equal(kehysprofiiliPaalla(), true);
    assert.ok(piirtokokeet().has('profiili'), 'kytkin vastaa ?koe=profiili');
    assert.ok(piirtokokeet().has('syotetouch'), 'koe ja profiili yhtä aikaa');

    assert.equal(asetaPiirtokoe('pöllö'), 'normaali', 'tuntematon arvo palautuu oletukseen');
    assert.ok(!piirtokokeet().has('syotetouch'));
  } finally { pura(); }
});

test('osoitteen haku ohittaa muistin kokonaan (savukkeet ja mittaukset)', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '?koe=eipuskuri' };
    asetaPiirtokoe('syotekello');
    asetaKehysprofiili(true);
    // Annettu haku: vain osoitteen liput, ei laitteen muistia.
    assert.deepEqual([...laattakerroksenKokeet('?koe=syoteloki')], ['syoteloki']);
    assert.deepEqual([...piirtokokeet('?koe=syoteloki')], ['syoteloki']);
    // Ilman hakua osoite ja muisti yhdistyvät.
    const yhdessa = piirtokokeet();
    assert.ok(yhdessa.has('eipuskuri') && yhdessa.has('syotekello') && yhdessa.has('profiili'));
  } finally { pura(); }
});

test('valikko on kytketty: rivit, radiogroup ja kytkin', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="piirtokoe-valikko"[\s\S]{0,120}role="radiogroup"/);
  assert.match(html, /id="kehysprofiili-valikko"/);
  const main = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');
  assert.match(main, /asetaPiirtokoe\(koe\.avain\)/);
  assert.match(main, /asetaKehysprofiili\(!kehysprofiiliPaalla\(\)\)/);
  assert.match(readFileSync(new URL('../sw.js', import.meta.url), 'utf8'), /'\.\/js\/piirtokoe-asetus\.js'/);
});

/*
 * ALPHA0 JA VAHEMMANDC (Fablen lista 22.9.2026, taustana Safarin
 * GPU-prosessi). Kokeiden kytkennät ovat lähdesopimuksia, koska
 * kumpikin elää selaimessa: toinen WebGL-kontekstin luonnissa, toinen
 * laattakerroksen näkyvyydessä.
 */
test('alpha0: alfaton konteksti itse luotuna ja läpinäkymätön tausta', () => {
  const pallo = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  assert.match(pallo, /const eiAlfaa = laattakerroksenKokeet\(\)\.has\('alpha0'\);/);
  assert.match(pallo, /const alfaton = eiAlfaa \? luoAlfatonKonteksti\(kotelo, antialiasTarkkuudella/);
  // Ilman alfaa sivun tausta ei paista läpi, joten scene saa oman värin.
  assert.match(pallo, /\.backgroundColor\(eiAlfaa \? kankaanTausta\(kotelo\) : 'rgba\(0,0,0,0\)'\)/);
  /*
   * Mitattu 22.9.2026 (WebKit): pelkkä rendererConfigin `alpha: false`
   * ei riitä, koska three.js r185 luo kontekstin aina alpha: true
   * -lipulla. Kierto: kangas ja konteksti luodaan itse ja annetaan
   * kolmoselle valmiina — se käyttää annettua kontekstia sellaisenaan.
   */
  assert.match(pallo, /MITATTU RAJOITUS JA SEN KIERTO/);
  assert.match(pallo, /r185 luo kontekstin/);
  assert.match(pallo, /canvas: alfaton\.kangas, context: alfaton\.gl, alpha: false/);
});

test('vahemmandc: tuki- ja ennakkolaatat piiloon vain täydellä peitolla', () => {
  const laatat = readFileSync(new URL('../js/pallolaatat.js', import.meta.url), 'utf8');
  assert.match(laatat, /const vahemmanDc = laattakerroksenKokeet\(\)\.has\('vahemmandc'\);/);
  assert.match(laatat, /const taysi = mittarit\.peittoOsuus === 1;/);
  // Häipyvä laatta on kesken olevaa ristihäivytystä: sitä ei saa piilottaa.
  assert.match(laatat, /const piiloon = taysi && !t\.nakyva && !t\.haipyy;/);
});

test('kankaanTausta: lähin läpinäkymätön tausta, muuten vara', () => {
  const solmu = (vari, vanhempi = null) => ({
    parentElement: vanhempi,
    ownerDocument: { defaultView: { getComputedStyle: (s) => ({ backgroundColor: s.__vari }) } },
    __vari: vari,
  });
  const isa = solmu('rgb(18, 16, 11)');
  const lapsi = solmu('rgba(0, 0, 0, 0)', isa);
  assert.equal(kankaanTausta(lapsi), 'rgb(18, 16, 11)', 'läpinäkyvä ohitetaan, isän väri kelpaa');
  assert.equal(kankaanTausta(solmu('transparent')), '#12100b', 'ilman väriä vara');
  assert.equal(kankaanTausta(null), '#12100b', 'ilman DOMia vara');
});

/*
 * ALFATON KONTEKSTI (?koe=alpha0). Kontekstin määreet ovat se, mitä
 * kokeessa mitataan: jos `alpha` jää todeksi, koe ei mittaa mitään.
 * Savuke lukee ne oikeasta selaimesta; tässä varmistetaan, että pyyntö
 * lähtee oikeilla arvoilla ja että epäonnistuminen on turvallinen.
 */
test('luoAlfatonKonteksti: pyytää webgl2:ta ilman alfaa, epäonnistuminen palauttaa nullin', () => {
  const pyynnot = [];
  const doc = {
    createElement: () => ({
      getContext: (laji, maareet) => { pyynnot.push({ laji, maareet }); return maareet.__tyhja ? null : { __gl: true }; },
    }),
  };
  const tulos = luoAlfatonKonteksti({ ownerDocument: doc }, true, doc);
  assert.ok(tulos?.gl, 'konteksti saatiin');
  assert.equal(pyynnot[0].laji, 'webgl2');
  assert.equal(pyynnot[0].maareet.alpha, false, 'alfa pois — tämä on koko koe');
  assert.equal(pyynnot[0].maareet.antialias, true, 'reunanpehmennys pelaajan asetuksesta');

  // Ilman kontekstia peli jatkaa tavallisella polulla eikä koe vain pure.
  const tyhja = { createElement: () => ({ getContext: () => null }) };
  assert.equal(luoAlfatonKonteksti({ ownerDocument: tyhja }, false, tyhja), null);
  assert.equal(luoAlfatonKonteksti(null, false, null), null, 'ilman DOMia ei kaadu');
});

/*
 * EIVIENTI KATTAA LAATAT (Laitetestaajan Mac-mittaus 22.9.2026: lippu ei
 * muuttanut mitään, koska se jäädytti VAIN nimiöatlaksen — laattojen
 * tekstuurit, jotka iPhonella virtaavat vedon aikana, menivät
 * näytönohjaimelle kuten ennenkin). Sopimus on lähteessä, koska vienti
 * tapahtuu kolmosen initTexturessa; savuke mittaa jonon.
 */
test('eivienti jäädyttää laattojen viennin vedon ajaksi, ja laskuri laskee vientejä', () => {
  const laatat = readFileSync(new URL('../js/pallolaatat.js', import.meta.url), 'utf8');
  assert.match(laatat, /if \(\(kokeet\.has\('vientilepo'\) \|\| kokeet\.has\('eivienti'\)\) && liikkeessaViimeksi\) \{/);
  // Jono valuu levossa: liikkeen loppu käynnistää viennin uudelleen.
  assert.match(laatat, /if \(liikkeessaViimeksi && !liikkuu\) \{ liikkeessaViimeksi = false; ajaVienti\(\); \}/);
  const profiili = readFileSync(new URL('../js/pallolauta/kehysprofiili.js', import.meta.url), 'utf8');
  assert.match(profiili, /laattaVienteja: laatat\.vienteja \?\? 0/);
  const naytto = readFileSync(new URL('../js/pallolauta/profiilinaytto.js', import.meta.url), 'utf8');
  // v2125 laski tähän kerroksen päivityksiä: nimi lupasi vientejä.
  assert.match(naytto, /const vienteja = kasvu\('laattaVienteja'\);/);
  assert.doesNotMatch(naytto, /const vienteja = kasvu\('paivityksia'\);/);
});

test('jokainen valikon koelipun lukija yhdistää myös tallennetun valinnan', async () => {
  /*
   * VIKA 22.9.2026: js/pallonimiot-gl.js luki eipuskuri/eivienti-lipun
   * vain osoitteesta, joten ratasvalikon koe ei koskenut nimiörunkoon —
   * overlay olisi näyttänyt kokeen, jota peli ei ajanut. Moduuli, joka
   * lukee `koe`-parametria itse ja hakee sieltä valikon lippua, käyttää
   * myös tallennetutKokeet()-apuria (suoraan tai jonkin kokoajan kautta).
   */
  const { readdirSync, readFileSync: lue } = await import('node:fs');
  const { join } = await import('node:path');
  const juuri = new URL('../js/', import.meta.url).pathname;
  const liput = PIIRTOKOKEIDEN_VAIHTOEHDOT.map((k) => k.lippu).filter(Boolean);
  const tiedostot = [];
  const kay = (kansio) => {
    for (const e of readdirSync(kansio, { withFileTypes: true })) {
      const polku = join(kansio, e.name);
      if (e.isDirectory()) kay(polku);
      else if (e.name.endsWith('.js')) tiedostot.push(polku);
    }
  };
  kay(juuri);
  const rikkojat = [];
  for (const polku of tiedostot) {
    const s = lue(polku, 'utf8');
    if (!/get\('koe'\)/.test(s)) continue;
    const luettu = liput.filter((l) => s.includes(`'${l}'`));
    if (!luettu.length || /tallennetutKokeet/.test(s)) continue;
    rikkojat.push(`${polku.slice(juuri.length)}: ${luettu.join(', ')}`);
  }
  assert.deepEqual(rikkojat, []);
});

/*
 * VALINTA LATAA SIVUN (omistaja 22.9.2026 klo 23.05): v2133-kierroksen
 * kolme viidestä kaappauksesta mittasi vanhaa koetta, koska sivua ei
 * ladattu. Lataaja ajastaa latauksen aina, kun valikon tila poikkeaa
 * latauksessa voimassa olleesta, ja perii sen, jos valinta palaa.
 */
test('koevaihto: muutos ajastaa latauksen viiveellä ja näyttää "Ladataan…"', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    const alussa = koetilanAvain();
    assert.equal(alussa, 'normaali|0|');
    const ajastetut = [];
    let ladattu = 0;
    const naytetty = [];
    const lataaja = luoKoevaihdonLataaja({
      alussa,
      lataa: () => { ladattu += 1; },
      nayta: (n) => naytetty.push(n),
      ajasta: (fn, ms) => { ajastetut.push({ fn, ms, peruttu: false }); return ajastetut.length - 1; },
      peru: (i) => { ajastetut[i].peruttu = true; },
    });
    assert.equal(lataaja.muuttui(), false, 'ei muutosta, ei latausta');
    asetaPiirtokoe('syotekello');
    assert.equal(lataaja.muuttui(), true);
    assert.equal(ajastetut.at(-1).ms, PIIRTOKOE_LATAUS_VIIVE_MS);
    assert.ok(PIIRTOKOE_LATAUS_VIIVE_MS >= 300 && PIIRTOKOE_LATAUS_VIIVE_MS <= 1500, 'pieni viive: teksti ehtii näkyä');
    assert.equal(naytetty.at(-1), true, 'Ladataan… näkyviin');
    // Toinen valinta viiveen aikana: vanha ajastin perutaan, uusi tilalle.
    asetaPiirtokoe('molemmat');
    lataaja.muuttui();
    assert.equal(ajastetut.filter((a) => !a.peruttu).length, 1, 'yksi lataus kerrallaan');
    // Paluu latauksen tilaan perii latauksen.
    asetaPiirtokoe('normaali');
    assert.equal(lataaja.muuttui(), false);
    assert.equal(ajastetut.filter((a) => !a.peruttu).length, 0, 'lataus peruttu');
    assert.equal(naytetty.at(-1), false);
    // Kehysprofiilin kytkin on osa tilaa: sekin vaatii latauksen.
    asetaKehysprofiili(true);
    assert.equal(lataaja.muuttui(), true);
    ajastetut.at(-1).fn();
    assert.equal(ladattu, 1, 'ajastin lataa sivun');
    assert.equal(lataaja.odottaa(), false);
  } finally { pura(); }
});

test('koevaihto: main.js kytkee lataajan sekä kokeeseen että kehysprofiiliin', () => {
  const main = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');
  assert.match(main, /const koevaihto = luoKoevaihdonLataaja\(\{\n  alussa: koetilanAvain\(\),\n  lataa: \(\) => location\.reload\(\),/);
  assert.match(main, /piirtokoeVihje\.textContent = lataus \? 'Ladataan…' : '';/);
  assert.equal(main.match(/koevaihto\.muuttui\(\);/g)?.length, 3, 'Syötekoe-rivit, paljaan kerroskytkimet ja kehysprofiilin kytkin');
  assert.doesNotMatch(main, /Tulee voimaan seuraavassa latauksessa/);
});

test('valikossa neljä syötekoetta omistajan järjestyksessä; poistetut liput vain osoitteessa', () => {
  // Omistaja 23.9.2026 klo 08.34 (Fablen kautta): Syötekoe valikkoon, piirtokokeet vain osoitteessa.
  assert.deepEqual(PIIRTOKOKEIDEN_VAIHTOEHDOT.map((k) => k.avain), ['normaali', 'syotetouch', 'syotekello', 'molemmat',
    // Paljas kartta ja puolitus (omistaja 23.9.2026 klo 09.20).
    'paljas', 'paljasnimet', 'paljassymbolit', 'paljasdom']);
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '?koe=dpr15' };
    globalThis.localStorage.setItem('matkakirja-piirtokoe', 'alpha0');
    assert.equal(piirtokoeValinta(), 'normaali', 'tallennettu poistettu koe ei ole valinta');
    assert.ok(!tallennetutKokeet().has('alpha0'), 'eikä vaikuta peliin');
    assert.ok(piirtokokeet().has('dpr15') && laattakerroksenKokeet().has('dpr15'), 'osoitteen lippu toimii yhä');
  } finally { pura(); }
});

test('syötekoe valikosta päätyy syöteputkeen: Molemmat = kaksi lippua, mittauslippu näkee tallennetun', async () => {
  const { mittauslippuPaalla } = await import('../js/vedon-seuranta.js');
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    assert.equal(mittauslippuPaalla(), false, 'oletus: ei lippua');
    asetaPiirtokoe('syotetouch');
    assert.equal(mittauslippuPaalla(), true, 'Kosketus suoraan ohjaa pallo.js:n lippupolkuun (syotetouch)');
    assert.equal(mittauslippuPaalla('?koe=syoteloki'), false, 'annettu haku ei lue muistia');
    asetaPiirtokoe('molemmat');
    const k = laattakerroksenKokeet();
    assert.ok(k.has('syotetouch') && k.has('syotekello'), 'Molemmat asettaa kaksi lippua');
    assert.equal(mittauslippuPaalla(), true);
    asetaPiirtokoe('syotekello');
    assert.equal(mittauslippuPaalla(), false, 'pelkkä kello ei ole vedon seurannan lippu');
    assert.ok(laattakerroksenKokeet().has('syotekello'));
  } finally { pura(); }
});

/*
 * PALJAS KARTTA (omistaja 23.9.2026 klo 09.20): yksi lippu riisuu kartan
 * laattoihin ja vetoon; 6–8 lisäävät kukin yhden ryhmän.
 */
test('paljas: yksi lippu asettaa kerrokset ja lisäriisunnat, menu jää käyttöön', async () => {
  const { kerrosKaytossa, kerrostenBodyLuokat, paljasTila } = await import('../js/pallolauta/kerrokset.js');
  const { lepopiirtoKaytossa } = await import('../js/pallolauta/lepopiirto.js');
  const { voimassaOlevatKokeet, PALJAAN_LISAKOKEET } = await import('../js/piirtokoe-asetus.js');
  const h = '?koe=paljas';
  assert.equal(paljasTila(h), 'paljas');
  for (const k of ['vektorit', 'nimet', 'nostot', 'nappula', 'kohteet', 'pulu', 'aanet', 'liike']) assert.equal(kerrosKaytossa(k, h), false, k);
  assert.equal(kerrosKaytossa('laatat', h), true);
  assert.equal(kerrosKaytossa('ui', h), true, 'ui jää: yläpalkin valikkonappi pysyy');
  const luokat = kerrostenBodyLuokat(h);
  assert.ok(luokat.includes('kerros-pois-dom') && luokat.includes('paljas-kartta') && luokat.includes('kerros-pois-liike'));
  assert.ok(!luokat.includes('kerros-pois-ui'), 'valikkonappi ei katoa');
  for (const k of PALJAAN_LISAKOKEET) assert.ok(voimassaOlevatKokeet(h).has(k), k);
  assert.equal(lepopiirtoKaytossa(h), false, 'piirto joka rAF:ssa');
  assert.equal(lepopiirtoKaytossa(''), true, 'ilman lippua lepopiirto ennallaan');
  // ?kerrokset= voittaa (ablaatiotikkaan mittaukset eivät muutu); tikkaalla liike kulkee pulun mukana.
  assert.equal(paljasTila('?koe=paljas&kerrokset=porras2'), null);
  assert.equal(kerrosKaytossa('vektorit', '?koe=paljas&kerrokset=porras2'), true);
  assert.equal(kerrosKaytossa('liike', '?kerrokset=porras5'), false);
  assert.equal(kerrosKaytossa('liike', '?kerrokset=porras6'), true);
  assert.equal(kerrosKaytossa('liike', ''), true);
});

/*
 * KERROKSET-KYTKIMET (omistaja 23.9.2026 klo 09.25): jokainen ryhmä yksin
 * päällä muuttaa vain oman ryhmänsä — kerrokset, lisäriisunnat ja luokat.
 */
test('paljas: jokainen kerroskytkin tuo vain oman ryhmänsä', async () => {
  const { kerrosKaytossa, kerrostenBodyLuokat, paljasTila } = await import('../js/pallolauta/kerrokset.js');
  const { voimassaOlevatKokeet, PALJAAN_KERROKSET } = await import('../js/piirtokoe-asetus.js');
  const tikas = ['vektorit', 'nimet', 'nostot', 'nappula', 'kohteet', 'pulu', 'liike', 'aanet'];
  const pohja = { kerrokset: tikas.filter((k) => kerrosKaytossa(k, '?koe=paljas')), kokeet: [...voimassaOlevatKokeet('?koe=paljas')].sort(), dom: kerrostenBodyLuokat('?koe=paljas').includes('kerros-pois-dom') };
  for (const ryhma of PALJAAN_KERROKSET) {
    const h = `?koe=paljas,kerros-${ryhma.avain}`;
    const tuodut = tikas.filter((k) => kerrosKaytossa(k, h) && !pohja.kerrokset.includes(k));
    assert.deepEqual(tuodut.sort(), [...ryhma.tikas].sort(), `${ryhma.avain}: kerrokset`);
    const kokeet = [...voimassaOlevatKokeet(h)].filter((k) => !k.startsWith('kerros-'));
    const poistuneet = pohja.kokeet.filter((k) => !kokeet.includes(k));
    assert.deepEqual(poistuneet.sort(), [...ryhma.riisunta].sort(), `${ryhma.avain}: riisunnat`);
    assert.equal(kerrostenBodyLuokat(h).includes('kerros-pois-dom'), ryhma.avain !== 'dom', `${ryhma.avain}: DOM`);
  }
  // Pikavalinnat 6–8 = paljas + yksi ryhmä.
  assert.equal(paljasTila('?koe=paljasnimet'), 'paljas');
  assert.ok(kerrosKaytossa('nimet', '?koe=paljasnimet') && !kerrosKaytossa('nostot', '?koe=paljasnimet'));
  assert.ok(kerrosKaytossa('nostot', '?koe=paljassymbolit') && !kerrosKaytossa('nimet', '?koe=paljassymbolit'));
  assert.ok(!kerrostenBodyLuokat('?koe=paljasdom').includes('kerros-pois-dom') && kerrostenBodyLuokat('?koe=paljas').includes('kerros-pois-dom'));
  // Kaksi yhtä aikaa: molemmat ryhmät.
  assert.ok(kerrosKaytossa('nimet', '?koe=paljas,kerros-nimiot,kerros-runko') && kerrosKaytossa('vektorit', '?koe=paljas,kerros-nimiot,kerros-runko'));
});

test('paljas: kerroskytkin tallentuu vain paljaaseen tilaan ja kuuluu koetilaan (lataus)', async () => {
  const { asetaPaljasKerros, paljaatKerrokset } = await import('../js/piirtokoe-asetus.js');
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    asetaPaljasKerros('runko', true);
    asetaPaljasKerros('nimiot', true);
    assert.deepEqual(paljaatKerrokset(), ['nimiot', 'runko'], 'valikon järjestyksessä');
    assert.ok(!tallennetutKokeet().has('kerros-runko'), 'ei vaikuta ilman paljasta tilaa');
    asetaPiirtokoe('paljas');
    assert.ok(tallennetutKokeet().has('kerros-runko') && tallennetutKokeet().has('paljas'));
    const ennen = koetilanAvain();
    asetaPaljasKerros('runko', false);
    assert.notEqual(koetilanAvain(), ennen, 'kytkin muuttaa koetilaa → automaattilataus');
    assert.ok(!laattakerroksenKokeet().has('kerros-runko'));
  } finally { pura(); }
});

test('paljas: CSS jättää kankaan, overlayn ja valikon näkyviin', () => {
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /body\.kerros-pois-dom \{ visibility: hidden; \}/);
  for (const s of ['.pallo-kotelo canvas', '.profiilinaytto', '#menu-btn', '#paavalikko']) {
    assert.ok(css.includes(`body.kerros-pois-dom ${s}`), s);
  }
});
