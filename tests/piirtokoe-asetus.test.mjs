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
  piirtokoeValinta, piirtokoeVaatiiLatauksen, tallennetutKokeet,
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
  assert.equal(piirtokoeVaatiiLatauksen('dpr15'), true, 'pikselisuhde on kontekstin luku');
  assert.equal(piirtokoeVaatiiLatauksen('eipuskuri'), false);
});

test('valinta muistetaan ja näkyy molemmissa lippuapureissa', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    assert.equal(piirtokoeValinta(), 'normaali');
    assert.deepEqual([...tallennetutKokeet()], []);

    asetaPiirtokoe('eipuskuri');
    assert.equal(piirtokoeValinta(), 'eipuskuri');
    assert.ok(laattakerroksenKokeet().has('eipuskuri'), 'pallolaatat näkee valinnan');
    assert.ok(piirtokokeet().has('eipuskuri'), 'kerrokset näkee valinnan');

    asetaKehysprofiili(true);
    assert.equal(kehysprofiiliPaalla(), true);
    assert.ok(piirtokokeet().has('profiili'), 'kytkin vastaa ?koe=profiili');
    assert.ok(piirtokokeet().has('eipuskuri'), 'koe ja profiili yhtä aikaa');

    assert.equal(asetaPiirtokoe('pöllö'), 'normaali', 'tuntematon arvo palautuu oletukseen');
    assert.ok(!piirtokokeet().has('eipuskuri'));
  } finally { pura(); }
});

test('osoitteen haku ohittaa muistin kokonaan (savukkeet ja mittaukset)', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '?koe=eipuskuri' };
    asetaPiirtokoe('dpr15');
    asetaKehysprofiili(true);
    // Annettu haku: vain osoitteen liput, ei laitteen muistia.
    assert.deepEqual([...laattakerroksenKokeet('?koe=syoteloki')], ['syoteloki']);
    assert.deepEqual([...piirtokokeet('?koe=syoteloki')], ['syoteloki']);
    // Ilman hakua osoite ja muisti yhdistyvät.
    const yhdessa = piirtokokeet();
    assert.ok(yhdessa.has('eipuskuri') && yhdessa.has('dpr15') && yhdessa.has('profiili'));
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
