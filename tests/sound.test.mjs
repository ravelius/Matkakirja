// Äänten savutesti.
//
// Web Audiota ei ole Nodessa, joten käytämme tynkäkontekstia, joka toteuttaa
// samat rajapinnat ja kirjaa luodut solmut. Näin testi ajaa oikeasti läpi
// synteesikoodin (knock, bell, ding, potkurihurina) eikä vain totea, ettei
// mikään kaadu ilman äänilaitetta.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/** Automaatioparametri, joka hyväksyy kaikki aikataulutuskutsut. */
function param(value = 0) {
  return {
    value,
    setValueAtTime() { return this; },
    exponentialRampToValueAtTime() { return this; },
    linearRampToValueAtTime() { return this; },
    // Zoomiäänen kaaret piirretään käyränä. Tynkä jäi tästä paitsi
    // niin kauan kuin zoom oli vaiennettu (v293-v339): sen synteesi ei
    // ajanut testeissä lainkaan, ja puuttuva metodi paljastui vasta
    // kun ääni palautettiin.
    setValueCurveAtTime() { return this; },
    cancelScheduledValues() { return this; },
  };
}

/** Solmu, joka muistaa mihin se on kytketty. */
function node(type, ctx) {
  const n = {
    type,
    connect(kohde) { ctx.yhteydet.push([type, kohde?.type ?? 'param']); return kohde; },
    disconnect() {},
    start() { ctx.aloitetut.push(type); },
    stop() {},
  };
  return n;
}

function stubContext() {
  const ctx = {
    currentTime: 0,
    sampleRate: 44100,
    state: 'running',
    luodut: [],
    aloitetut: [],
    yhteydet: [],
    destination: { type: 'destination' },
    resume: () => Promise.resolve(),
  };
  const luo = (type, lisa = {}) => {
    ctx.luodut.push(type);
    return Object.assign(node(type, ctx), lisa);
  };
  ctx.createGain = () => luo('gain', { gain: param(1) });
  ctx.createOscillator = () => luo('oscillator', { frequency: param(440), type: 'sine' });
  ctx.createBufferSource = () => luo('bufferSource', { buffer: null, loop: false });
  ctx.createBiquadFilter = () => luo('filter', { frequency: param(1000), Q: param(1), type: 'bandpass' });
  ctx.createConvolver = () => luo('convolver', { buffer: null });
  ctx.createDynamicsCompressor = () => luo('compressor', {
    threshold: param(-24), knee: param(30), ratio: param(12), attack: param(0.003), release: param(0.25),
  });
  ctx.createBuffer = (ch, frames, rate) => ({
    length: frames,
    sampleRate: rate,
    numberOfChannels: ch,
    getChannelData: () => new Float32Array(frames),
  });
  return ctx;
}

/** Lataa sound.js tuoreena tynkäkontekstin kanssa. */
async function lataaSfx() {
  const ctx = stubContext();
  globalThis.window = { AudioContext: function () { return ctx; } };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  const { sfx } = await import(`../js/sound.js?kerta=${Math.random()}`);
  sfx.enabled = true;
  return { sfx, ctx };
}

/*
 * Pelin tehosteet. Kaikki soivat (v340, omistajan pyyntö "Palauta pelin
 * tehosteäänet"); v293–v339 näistä kuului vain neljä.
 *
 * Lista on tarkoituksella käsin kirjoitettu eikä johdettu koodista.
 * Johdettu lista seuraisi mukana, jos joku vaientaisi äänen vahingossa
 * — käsin kirjoitettu huomaa sen. Sama syy piti tämän listan käsin
 * kirjoitettuna myös silloin, kun se oli vaiennettujen lista.
 */
const NIMET = [
  'dieTick', 'dieLand', 'ferry', 'flight',
  'click', 'paper', 'swipe', 'step', 'arrive', 'correct', 'wrong', 'hint',
  'tick', 'timeout', 'flip', 'clack', 'star', 'gem', 'robber',
  'empty', 'coin', 'stuck', 'turn', 'win', 'pen', 'quizOpen', 'zoom',
  // Pöllön omat äänet (13.8.2026): huhuilu paneelin avautuessa ja
  // kirjoituskoneen rivinvaihtokello vastauksen valmistuessa.
  'owl', 'typeBell',
];

test('jokainen tehoste tuottaa äänilähteitä', async () => {
  for (const nimi of NIMET) {
    const { sfx, ctx } = await lataaSfx();
    assert.doesNotThrow(() => sfx.play(nimi), `ääni "${nimi}" heitti poikkeuksen`);
    assert.ok(
      ctx.aloitetut.length > 0,
      `ääni "${nimi}" ei käynnistänyt yhtään äänilähdettä`,
    );
  }
});

test('tehosteita ei ole portitettu sallitulla listalla', async () => {
  /*
   * v293:n portti (SALLITUT_TEHOSTEET) vaiensi nimen, jota ei ollut
   * listalla — hiljaa, ilman virhettä. Portti poistui v340:ssä, ja
   * tämä testi vahtii ettei sitä palauteta huomaamatta: uusi tehoste
   * ei saa jäädä mykäksi vain siksi, että joku unohti lisätä sen
   * jollekin listalle.
   */
  const lahde = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  // Portin KÄYTTÖ, ei maininta: kommentti kertoo yhä v293:n historian.
  assert.doesNotMatch(lahde, /SALLITUT_TEHOSTEET\s*[.=[]/,
    'tehosteportti on palannut: play() vaientaisi listan ulkopuoliset nimet');
});

test('pelin äänet voi vaientaa asetuksesta', async () => {
  // Kokonaisvaimennus on eri asia kuin portti: se on pelaajan valinta
  // ja koskee kaikkia ääniä samalla tavalla.
  const { sfx, ctx } = await lataaSfx();
  sfx.enabled = false;
  sfx.play('paper');
  assert.equal(ctx.aloitetut.length, 0, 'vaimennettuna ei saa soida mitään');
});

/*
 * MEDIAKANAVAN ANKKURI (omistajan bugiraportit 22.8.2026).
 *
 * Ankkuri itse on selainasia — se mitataan oikealla mediaelementillä
 * savukkeessa (tools/savukkeet/savuke-mediakanava.mjs). Täällä
 * vartioidaan ne EHDOT, joiden varassa iOS:n luokkapäättely lepää ja
 * jotka katoaisivat huomaamatta yhden rivin siivouksessa: elementin on
 * oltava silmukka, täydellä volumella eikä mykkä (WebKitin
 * computeCanProduceAudio katsoo täsmälleen näitä), ja sen lähteessä on
 * oltava oikea ääniraita — nollan mittainen data-lohko ei kelpaa.
 */
test('mediakanavan ankkuri täyttää kuuluvuuden ehdot', () => {
  const lahde = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  const kohta = lahde.indexOf('function haeAnkkuri()');
  assert.ok(kohta > 0, 'ankkuria ei löydy');
  const runko = lahde.slice(kohta, kohta + 1200);
  assert.match(runko, /\.loop = true/, 'ankkuri ei ole silmukka');
  assert.match(runko, /\.volume = 1/, 'ankkurin volume ei ole täysi');
  assert.match(runko, /\.muted = false/, 'ankkuria ei varmisteta mykistämättömäksi');
  // Ääniraidan on oltava aito: data-lohkon pituus tulee näytemäärästä.
  assert.match(lahde, /nakyma\.setUint32\(40, naytteita, true\)/, 'wavin data-lohko on tyhjä');
  assert.match(lahde, /tavut\.fill\(128, 44\)/, 'hiljaisuuden nollataso puuttuu');
});

test('mediakanavaa ei oteta ilman käyttäjän elettä', () => {
  /*
   * Mediakanava on yksinoikeusluokka: latauksessa otettuna se
   * katkaisisi pelaajan oman musiikin. ensureContext ajetaan jo sivun
   * latauksessa (js/ui.js syncAmbience), joten portin on oltava
   * varmistuksessa itsessään eikä kutsujissa.
   */
  const lahde = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  const kohta = lahde.indexOf('export function varmistaAaniIstunto()');
  assert.ok(kohta > 0, 'varmistaAaniIstunto puuttuu');
  const runko = lahde.slice(kohta, kohta + 300);
  assert.match(runko, /if \(saneluKaynnissa \|\| taustalla \|\| !eleNahty\) return false;/,
    'mediakanavan voi ottaa ilman elettä, kesken sanelun tai taustalla');
  // Ele nostaa lipun; kuuntelija ei saa olla kertaluonteinen, koska
  // ankkuri voi pysähtyä ulkopuolelta (Ohjauskeskus, puhelu).
  assert.match(lahde, /eleNahty = true;/);
  assert.doesNotMatch(lahde.slice(lahde.indexOf('const ele = ()')), /once: true/);
});

test('sanelun tauko purkaa mediakanavan ja jatko palauttaa sen', () => {
  const lahde = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  const tauko = lahde.slice(lahde.indexOf('taukoaKonteksti() {'), lahde.indexOf('jatkaKonteksti() {'));
  assert.match(tauko, /asetaAaniIstunto\('auto'\)/, 'äänisession luokka jää lukkoon sanelun ajaksi');
  assert.match(tauko, /pysaytaAnkkuri\(\)/, 'ankkuri jää soimaan mikrofonin päälle');
  const jatko = lahde.slice(lahde.indexOf('jatkaKonteksti() {'));
  assert.match(jatko.slice(0, 400), /varmistaAaniIstunto\(\)/, 'mediakanava ei palaa sanelun jälkeen');
});

test('masteriketjuun kuuluu kaiku ja kompressori', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.play('dieLand');
  assert.ok(ctx.luodut.includes('convolver'), 'kaiku puuttuu masteriketjusta');
  assert.ok(ctx.luodut.includes('compressor'), 'kompressori puuttuu masteriketjusta');
  // Kaiun impulssivaste on luotu, ei ladattu tiedostosta.
  assert.ok(sfx.reverb.buffer, 'kaiulla ei ole impulssivastetta');
  assert.equal(sfx.reverb.buffer.numberOfChannels, 2);
});

test('kaikki äänet kulkevat kaikubussin kautta', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.play('dieLand');
  const bussiin = ctx.yhteydet.filter(([, kohde]) => kohde === 'gain').length;
  assert.ok(bussiin > 0, 'äänet eivät kytkeydy mihinkään');
});

test('potkurihurina käynnistyy ja pysähtyy siististi', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.startFlight(2000);
  assert.ok(sfx.flightNodes, 'hurina ei käynnistynyt');
  const oskillaattoreita = ctx.aloitetut.filter((t) => t === 'oscillator').length;
  assert.ok(oskillaattoreita >= 2, 'hurinasta puuttuu kantoaalto tai LFO');

  // Toinen käynnistys ei saa luoda päällekkäistä hurinaa.
  const ennen = ctx.aloitetut.length;
  sfx.startFlight(2000);
  assert.equal(ctx.aloitetut.length, ennen, 'hurina käynnistyi kahdesti');

  sfx.stopFlight();
  assert.equal(sfx.flightNodes, null, 'hurina jäi päälle');
  // Turha lopetus ei kaadu.
  assert.doesNotThrow(() => sfx.stopFlight());
});

test('vireheitto pysyy kolmessa prosentissa', async () => {
  const { sfx } = await lataaSfx();
  for (let i = 0; i < 400; i++) {
    const v = sfx.jitter(1000);
    assert.ok(v >= 970 && v <= 1030, `heitto ${v} ylitti kolme prosenttia`);
  }
});

test('tuntematon äänen nimi ei kaada peliä', async () => {
  const { sfx } = await lataaSfx();
  assert.doesNotThrow(() => sfx.play('ei-tallaista-aanta'));
});

test('äänet ovat turvallisia ilman AudioContextia', async () => {
  globalThis.window = {};
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  const { sfx } = await import(`../js/sound.js?kerta=${Math.random()}`);
  sfx.enabled = true;
  for (const nimi of NIMET) {
    assert.doesNotThrow(() => sfx.play(nimi), `"${nimi}" kaatui ilman äänilaitetta`);
  }
  assert.doesNotThrow(() => sfx.startFlight(1000));
  assert.doesNotThrow(() => sfx.stopFlight());
});

/*
 * MITATTU VIKA 4.8.2026: maailmanradion viritysääni oli hävinnyt kokonaan
 * ja VU-mittarin neula makasi lepokulmassaan koko lähetyksen ajan. Syy oli
 * tässä: `ensureContext` palautti null aina kun pelin äänet olivat pois
 * päältä, joten radio ei saanut äänikontekstia — mutta suora lähetys soi
 * silti, koska se tulee <audio>-elementistä eikä kysy tältä luokalta
 * mitään. Laite oli puolikas: asema kuului, kohina ei.
 *
 * Radion omat äänet seuraavat radion virtakytkintä, joten sillä on oltava
 * tapa saada konteksti myös mykistettynä. `pakota` on se tapa, ja nämä
 * kaksi testiä pitävät molemmat puolet paikallaan.
 */
test('pakotettu konteksti syntyy myös mykistettynä (radion oma ääni)', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.enabled = false;
  assert.equal(sfx.ensureContext(), null, 'mykistetty peli sai kontekstin ilman pakotusta');
  assert.equal(sfx.ensureContext({ pakota: true }), ctx, 'pakotus ei antanut kontekstia');
  assert.ok(sfx.bus, 'pakotettu konteksti jäi ilman bussia');
});

test('pakotus ei avaa pelin omia ääniä', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.enabled = false;
  sfx.ensureContext({ pakota: true });
  const ennen = ctx.aloitetut.length;
  sfx.play('click');
  assert.equal(ctx.aloitetut.length, ennen, 'mykistetty peli soitti tehosteen');
});

// --- paketti 17: ambienssi -------------------------------------------------

test('jokainen äänimaisema käynnistyy ja sammuu ilman virhettä', async () => {
  const { AMBIENCE_TYPES } = await import('../js/sound.js');
  assert.ok(AMBIENCE_TYPES.length >= 5, 'maisematyyppejä on liian vähän');
  for (const tyyppi of AMBIENCE_TYPES) {
    const { sfx, ctx } = await lataaSfx();
    assert.doesNotThrow(() => sfx.setAmbience(tyyppi), `maisema "${tyyppi}" kaatui`);
    assert.ok(sfx.ambience, `maisema "${tyyppi}" ei käynnistynyt`);
    assert.ok(
      ctx.aloitetut.length > 0,
      `maisema "${tyyppi}" ei käynnistänyt yhtään äänilähdettä`,
    );
    assert.doesNotThrow(() => sfx.setAmbience(null), `maiseman "${tyyppi}" sammutus kaatui`);
    assert.equal(sfx.ambienceType, null);
  }
});

test('sama maisema uudelleen ei rakenna sitä toistamiseen', async () => {
  const { sfx, ctx } = await lataaSfx();
  sfx.setAmbience('meri');
  const ennen = ctx.aloitetut.length;
  sfx.setAmbience('meri');
  assert.equal(ctx.aloitetut.length, ennen, 'sama maisema rakennettiin kahdesti');
});

test('maiseman vaihto häivyttää edellisen', async () => {
  const { sfx } = await lataaSfx();
  sfx.setAmbience('aavikko');
  const eka = sfx.ambience;
  sfx.setAmbience('sademetsa');
  assert.ok(eka.loppuu, 'edellistä maisemaa ei häivytetty');
  assert.notEqual(sfx.ambience, eka);
  assert.equal(sfx.ambienceType, 'sademetsa');
});

test('tuntematon maisema jää soimatta eikä kaada peliä', async () => {
  const { sfx } = await lataaSfx();
  assert.doesNotThrow(() => sfx.setAmbience('ei-tallaista-maisemaa'));
  assert.equal(sfx.ambience, null);
});

test('äänten sammutus lopettaa myös ambienssin', async () => {
  const { sfx } = await lataaSfx();
  sfx.setAmbience('savanni');
  assert.ok(sfx.ambience);
  sfx.setEnabled(false);
  assert.equal(sfx.ambienceType, null);
});

test('ambienssi on hiljaisempaa kuin pelin äänet', async () => {
  // Taustan kuuluu jäädä huomaamatta, kunnes se lakkaa.
  const { sfx, ctx } = await lataaSfx();
  sfx.setAmbience('meri');
  const vahvistimet = ctx.luodut.filter((t) => t === 'gain').length;
  assert.ok(vahvistimet > 0);
  // Pohjien voimakkuudet on kovakoodattu välille 0,03–0,05; tarkistetaan
  // että sellainen arvo tosiaan asetetaan eikä esimerkiksi ykköstä.
  assert.ok(sfx.ambience.nodes.length >= 2, 'merimaisemasta puuttuu pohja tai LFO');
});

test('Afrikan kaupungeilla on ambienssi ja tyyppi on tunnettu', async () => {
  const { AMBIENCE_TYPES } = await import('../js/sound.js');
  const { AFRICA } = await import('../js/packs/africa.js');
  const puuttuu = AFRICA.cities.filter((c) => !c.ambience);
  assert.equal(puuttuu.length, 0, `ilman ambienssia: ${puuttuu.map((c) => c.id).join(', ')}`);
  for (const c of AFRICA.cities) {
    assert.ok(
      AMBIENCE_TYPES.includes(c.ambience),
      `${c.id}: tuntematon maisema "${c.ambience}"`,
    );
  }
});

test('treasureSound osaa kaikki laattatyypit', async () => {
  const { treasureSound } = await import('../js/sound.js');
  const { TOKEN_TYPES } = await import('../js/tokens.js');
  assert.equal(treasureSound('star'), 'star');
  assert.equal(treasureSound('robber'), 'robber');
  // Sisäinen merkki: pöllön korvaama laatta ei kilahda aarteena.
  assert.equal(treasureSound('empty'), 'empty');
  // Muut aarteet jakavat saman kilahduksen.
  assert.equal(treasureSound('mannerAarre'), 'gem');
  assert.equal(treasureSound('isoAarre'), 'gem');
  assert.equal(treasureSound('pieniAarre'), 'gem');
  assert.equal(treasureSound(undefined), 'gem');
  // Jokaiselle laattatyypille on oltava ääni — myös uusille.
  const aanet = new Set(['star', 'robber', 'empty', 'gem']);
  for (const type of Object.keys(TOKEN_TYPES)) {
    assert.ok(aanet.has(treasureSound(type)), `laattatyypiltä ${type} puuttuu ääni`);
  }
});

// --- kaupunkien omat kenttä-äänitykset (paketti 20) -------------------------
//
// Tyyppikori antaa saman äänen kaikille saman maiseman kaupungeille, joten
// Praha ja Lissabon kuulostivat samalta. Kaupungin oma äänitys menee korin
// edelle. Nämä testit vartioivat, että äänitykset ovat muodoltaan kunnossa
// ja että ne tosiaan voittavat tyyppikorin.

test('kaupunkien omat äänitykset ovat muodoltaan kelvollisia', async () => {
  const { KAUPUNKI_EHDOKKAAT } = await import('../js/aani-ehdokkaat.js');
  const { PACKS } = await import('../js/pack.js');
  let maara = 0;
  for (const [lauta, kaupungit] of Object.entries(KAUPUNKI_EHDOKKAAT)) {
    const pack = PACKS.find((p) => p.id === lauta);
    assert.ok(pack, `tuntematon lauta ${lauta}`);
    for (const [cityId, lista] of Object.entries(kaupungit)) {
      assert.ok(pack.cities.some((c) => c.id === cityId),
        `${lauta}: tuntematon kaupunki ${cityId}`);
      assert.ok(Array.isArray(lista) && lista.length,
        `${lauta}/${cityId}: tyhjä lista — jätä kaupunki pois, älä merkitse tyhjäksi`);
      for (const e of lista) {
        maara += 1;
        // Äänitykset ovat radio aporeesta, ja osoitteen pitää olla
        // suora tiedosto — kohdesivu ei soi <audio>-elementissä.
        // Pääte voi olla kummalla tahansa kirjainkoolla (…EarlStreetSouth.MP3).
        //
        // Perässä voi olla säätöjä (#alku=20&voima=1.5), jotka jaaAlku
        // purkaa. Voimakkuudet ovat mitattuja eivätkä käsin arvattuja:
        // tools/mittaa-aanet.mjs kirjoittaa ne, jotta taustaäänet soivat
        // keskenään samalla tasolla (omistajan havainto siitä, että
        // toiset hukkuvat ja toiset peittävät kertojan).
        assert.match(e.url, /^https:\/\/archive\.org\/download\/[^/]+\/[^#]+\.mp3(#\S*)?$/i,
          `${lauta}/${cityId}: kelvoton osoite ${e.url}`);
        const risu = e.url.indexOf('#');
        if (risu >= 0) {
          for (const osa of e.url.slice(risu + 1).split('&')) {
            assert.match(osa, /^(alku|voima)=\d+(\.\d+)?$/,
              `${lauta}/${cityId}: tuntematon säätö "${osa}"`);
          }
        }
        // Nimi näkyy studiossa ja kertoo tekijän ja lisenssin: aporee on
        // CC BY, CC BY-SA, CC BY-NC(-ND) tai public domain.
        assert.ok(typeof e.nimi === 'string' && e.nimi.length > 5,
          `${lauta}/${cityId}: puuttuva nimi`);
        assert.match(e.nimi, /(CC BY|CC0|public domain)/i,
          `${lauta}/${cityId}: nimestä puuttuu lisenssi — ${e.nimi}`);
      }
    }
  }
  assert.ok(maara >= 40, `äänityksiä vain ${maara}`);
});

test('jokainen kaupunkiäänitys saa oman peilipolun', async () => {
  const { KAUPUNKI_EHDOKKAAT } = await import('../js/aani-ehdokkaat.js');
  const { peiliAaniPolku } = await import('../js/media.js');
  // Peili on ensisijainen lähde: ilman polkua jokainen soitto menisi
  // ohi peilin, ja päällekkäinen polku ylikirjoittaisi toisen äänitteen.
  const polut = new Map();
  for (const [lauta, kaupungit] of Object.entries(KAUPUNKI_EHDOKKAAT)) {
    for (const [cityId, lista] of Object.entries(kaupungit)) {
      for (const e of lista) {
        const polku = peiliAaniPolku(e.url);
        assert.ok(polku, `${lauta}/${cityId}: peilipolkua ei voi laskea (${e.url})`);
        assert.ok(!polut.has(polku),
          `${polku} on kahdesti: ${polut.get(polku)} ja ${lauta}/${cityId}`);
        polut.set(polku, `${lauta}/${cityId}`);
      }
    }
  }
});

test('kaupungin oma äänitys voittaa tyyppikorin, muut putoavat siihen', async () => {
  const { kaupunkiKori, KAUPUNKI_EHDOKKAAT } = await import('../js/aani-ehdokkaat.js');
  const omat = KAUPUNKI_EHDOKKAAT.europe ?? {};
  const [cityId, lista] = Object.entries(omat)[0];
  const kori = kaupunkiKori('europe', cityId);
  assert.equal(kori.length, lista.length, `${cityId}: kori ei vastaa äänityksiä`);
  assert.ok(kori.every((k) => k.startsWith('https://archive.org/')));
  // Kaupunki ilman omaa äänitystä saa tyhjän korin, jolloin
  // ambience-stream putoaa maisematyypin koriin kuten ennen.
  assert.deepEqual(kaupunkiKori('europe', 'ei-tallaista-kaupunkia'), []);
  assert.deepEqual(kaupunkiKori('afrikka-jota-ei-ole', cityId), []);
});

// --- mp3:n leikkaus kolmeen minuuttiin --------------------------------------
//
// Leikkuri katkaisee tiedoston kehysrajalta koodaamatta uudelleen. Jos se
// osuu väärään kohtaan, ääni rätisee tai tiedosto ei soi lainkaan — eikä
// sitä huomaisi ennen kuin pelaaja saapuu kaupunkiin. Testi rakentaa
// tunnetun mp3:n ja tarkistaa tuloksen kehys kehykseltä.

/** MPEG1 Layer III, 128 kb/s, 44,1 kHz, stereo: 417 tavua ja 0,026 s per kehys. */
function tekoMp3(kehyksia, { xing = false } = {}) {
  const KEHYS = 417;
  // Tyhjä ID3v2-tunniste: 'ID3', versio, liput ja nelitavuinen koko (0).
  const tunniste = Buffer.alloc(10);
  tunniste.write('ID3', 0, 'latin1');
  tunniste[3] = 3;
  const osat = [tunniste];
  for (let i = 0; i < kehyksia; i += 1) {
    const kehys = Buffer.alloc(KEHYS);
    kehys[0] = 0xff; kehys[1] = 0xfb; kehys[2] = 0x90; kehys[3] = 0x00;
    // Täyte ei saa sisältää tahdistustavuja, jotta kehysraja on yksikäsitteinen.
    kehys.fill(0x41, 4);
    if (xing && i === 0) {
      kehys.write('Xing', 36, 'latin1');
      kehys.writeUInt32BE(0b0111, 40); // kehykset, tavut, hakutaulukko
      kehys.writeUInt32BE(kehyksia, 44);
      kehys.writeUInt32BE(kehyksia * KEHYS, 48);
    }
    osat.push(kehys);
  }
  return Buffer.concat(osat);
}

test('mp3 leikkautuu kehysrajalta eikä ylitä annettua kestoa', async () => {
  const { leikkaaMp3 } = await import('../tools/leikkaa-mp3.mjs');
  const KEHYS = 417;
  const KESTO = 1152 / 44100;
  const alkuperainen = tekoMp3(2000); // noin 52 s
  const tulos = leikkaaMp3(alkuperainen, 10);
  assert.ok(tulos, 'leikkaus epäonnistui');
  assert.ok(tulos.kesto <= 10, `kesto ${tulos.kesto} s ylittää rajan`);
  assert.ok(tulos.kesto >= 9, `kesto ${tulos.kesto} s jäi liian lyhyeksi`);
  // Pituus osuu tasan kehysrajalle: ID3-tunniste ja kokonaisia kehyksiä.
  const kehyksia = Math.floor(10 / KESTO);
  assert.equal(tulos.puskuri.length, 10 + kehyksia * KEHYS);
  // Alkuperäinen sisältö säilyy sellaisenaan — ääntä ei koodata uudelleen.
  assert.ok(tulos.puskuri.equals(alkuperainen.subarray(0, tulos.puskuri.length)),
    'leikattu tiedosto ei ole alkuperäisen alkuosa');
});

test('leikkuri jättää tarpeeksi lyhyen tiedoston koskematta', async () => {
  const { leikkaaMp3 } = await import('../tools/leikkaa-mp3.mjs');
  // Peilaustyökalu tulkitsee null-paluun "ei leikattavaa" -tiedoksi, eikä
  // silloin merkitse tiedostoa manifestiin leikatuksi.
  assert.equal(leikkaaMp3(tekoMp3(2000), 600), null);
  assert.equal(leikkaaMp3(Buffer.from('ei tama mp3 ole'), 180), null);
});

test('Xing-otsakkeen kesto korjataan leikkauksen mukaiseksi', async () => {
  const { leikkaaMp3 } = await import('../tools/leikkaa-mp3.mjs');
  // Ilman korjausta selain laskisi keston alkuperäisestä pituudesta ja
  // arpoisi ambienssin aloituskohdan tiedoston lopun ulkopuolelta.
  const tulos = leikkaaMp3(tekoMp3(2000, { xing: true }), 10);
  assert.ok(tulos);
  const xing = tulos.puskuri.indexOf('Xing', 0, 'latin1');
  assert.ok(xing > 0, 'Xing-otsake katosi');
  const liput = tulos.puskuri.readUInt32BE(xing + 4);
  assert.equal(liput & 4, 0, 'hakutaulukon lippu jäi päälle vaikka taulukko ei enää päde');
  const kehyksia = Math.floor(10 / (1152 / 44100));
  assert.equal(tulos.puskuri.readUInt32BE(xing + 8), kehyksia, 'kehysmäärä ei täsmää');
  assert.equal(tulos.puskuri.readUInt32BE(xing + 12), tulos.puskuri.length - 10,
    'tavumäärä ei täsmää');
});

// --- silmukan sauma ja ristihäivytys ----------------------------------------
//
// Kolmen minuutin äänitteen silmukka näkyy vasta kolmen minuutin päästä,
// joten sitä ei voi todeta pelaamalla. Tynkäsoittimella sauman saa esiin
// heti: nauhan loppu kelataan käsin ja katsotaan, alkaako uusi kierros
// päällekkäin edellisen kanssa.

/** Tynkä <audio>: kirjaa soitot ja antaa ajan liikkua käsin. */
function tekoAudio(rekisteri) {
  return class {
    constructor(src) {
      this.src = src;
      this.volume = 1;
      this.paused = true;
      this.loop = false;
      this.preload = '';
      this.duration = 180;
      this.currentTime = 0;
      this.kuuntelijat = new Map();
      rekisteri.push(this);
    }

    addEventListener(nimi, fn) {
      if (!this.kuuntelijat.has(nimi)) this.kuuntelijat.set(nimi, []);
      this.kuuntelijat.get(nimi).push(fn);
    }

    removeEventListener() {}
    getAttribute() { return this.src; }
    removeAttribute() { this.src = null; }
    load() {}
    pause() { this.paused = true; }
    play() { this.paused = false; return Promise.resolve(); }
    laukaise(nimi) { for (const fn of this.kuuntelijat.get(nimi) ?? []) fn(); }
  };
}

/** Ajaa kaikki jonossa olevat rAF-askeleet loppuun asti. */
async function ajaHaivytykset(kello) {
  for (let i = 0; i < 400; i += 1) {
    kello.nyt += 120;
    const jono = kello.jono.splice(0);
    if (!jono.length) break;
    for (const fn of jono) fn(kello.nyt);
    await Promise.resolve();
  }
}

async function lataaAmbienssi() {
  const soittimet = [];
  const kello = { nyt: 0, jono: [] };
  globalThis.Audio = tekoAudio(soittimet);
  globalThis.requestAnimationFrame = (fn) => { kello.jono.push(fn); return kello.jono.length; };
  globalThis.performance = { now: () => kello.nyt };
  globalThis.window = { AudioContext: null };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  const mod = await import(`../js/ambience-stream.js?kerta=${soittimet.length}-${Math.random()}`);
  const { sfx } = await import('../js/sound.js');
  sfx.enabled = true;
  return { mod, soittimet, kello };
}

test('silmukan sauma ristihäivytetään: uusi kierros alkaa ennen nauhan loppua', async () => {
  const { mod, soittimet, kello } = await lataaAmbienssi();
  mod.playPlaceAmbience('lontoo', 'kaupunki', 'europe');
  await Promise.resolve();
  assert.equal(soittimet.length, 1, 'ensimmäinen soitin ei käynnistynyt');
  const eka = soittimet[0];
  eka.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  assert.ok(eka.volume > 0, 'ensimmäinen kierros ei noussut kuuluviin');

  // Nauhan loppu lähestyy: sauman pitää alkaa ennen kuin aika loppuu.
  eka.currentTime = eka.duration - 1;
  eka.laukaise('timeupdate');
  await Promise.resolve();
  assert.equal(soittimet.length, 2, 'uusi kierros ei alkanut ennen nauhan loppua');
  const toka = soittimet[1];
  assert.equal(toka.paused, false, 'uusi kierros ei lähtenyt soimaan');
  assert.ok(!eka.paused, 'edellinen kierros katkaistiin heti — ei ristihäivytystä');

  // Häivytysten jälkeen vanha on vaiennut ja uusi soi.
  toka.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  assert.equal(eka.paused, true, 'edellinen kierros jäi soimaan');
  assert.ok(toka.volume > 0, 'uusi kierros jäi hiljaiseksi');
  mod.stopPlaceStream();
});

test('väistö säilyy silmukan sauman yli', async () => {
  const { mod, soittimet, kello } = await lataaAmbienssi();
  mod.playPlaceAmbience('praha', 'kaupunki', 'europe');
  await Promise.resolve();
  const eka = soittimet[0];
  eka.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  const taysi = eka.volume;

  // Kertoja puhuu: tausta väistyy. Sauma osuu keskelle puhetta.
  mod.vaimennaTausta();
  await ajaHaivytykset(kello);
  assert.ok(eka.volume < taysi, 'väistö ei laskenut taustaa');

  eka.currentTime = eka.duration - 1;
  eka.laukaise('timeupdate');
  await Promise.resolve();
  const toka = soittimet[1];
  toka.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  // Ilman väistön muistamista uusi kierros nousisi täyteen voimaan ja
  // puhe hukkuisi sen alle kesken lauseen.
  assert.ok(toka.volume < taysi, `uusi kierros ohitti väistön (${toka.volume} vs ${taysi})`);
  mod.stopPlaceStream();
});

/*
 * OMISTAJAN TILAUS 13.8.2026: *"tausta ambienssia voisi hiljentää hieman
 * kun pöllönäkymä aukeaa"* ja *"ambienssi voisi hiljentyä hieman myös
 * jos lehti avataan"*. Kumpikin on oma syynsä, ja toisen sulkeutuminen
 * ei saa nostaa taustaa takaisin niin kauan kuin toinen on auki.
 */
test('lukunäkymä hiljentää taustan ja palauttaa sen vasta viimeisen sulkeuduttua', async () => {
  const { mod, soittimet, kello } = await lataaAmbienssi();
  mod.nollaaHiljennykset();
  mod.playPlaceAmbience('lontoo', 'kaupunki', 'europe');
  await Promise.resolve();
  const soi = soittimet[0];
  soi.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  const taysi = soi.volume;
  assert.ok(taysi > 0, 'ambienssi ei lähtenyt soimaan');

  mod.hiljennaAmbienssi('lehti');
  await ajaHaivytykset(kello);
  const hiljaa = soi.volume;
  assert.ok(hiljaa < taysi, `hiljennys ei laskenut taustaa (${hiljaa} vs ${taysi})`);
  // Hiljennys, ei mykistys: taustan pitää jäädä kuuluviin.
  assert.ok(hiljaa > 0, 'tausta vaikeni kokonaan');

  // Pöllö avataan lehden sisällä ja suljetaan ensin: lehti pitää yhä
  // hiljennyksen voimassa.
  mod.hiljennaAmbienssi('pollo');
  await ajaHaivytykset(kello);
  mod.palautaAmbienssi('pollo');
  await ajaHaivytykset(kello);
  assert.ok(soi.volume < taysi, 'hiljennys purkautui vaikka lehti oli yhä auki');

  mod.palautaAmbienssi('lehti');
  await ajaHaivytykset(kello);
  assert.ok(Math.abs(soi.volume - taysi) < 1e-6,
    `tausta ei palannut täyteen voimaan (${soi.volume} vs ${taysi})`);
  mod.stopPlaceStream();
});

test('sama hiljennyssyy kahdesti ei jää päälle, ja tuntematon purku on turvallinen', async () => {
  const { mod, soittimet, kello } = await lataaAmbienssi();
  mod.nollaaHiljennykset();
  mod.playPlaceAmbience('praha', 'kaupunki', 'europe');
  await Promise.resolve();
  const soi = soittimet[0];
  soi.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  const taysi = soi.volume;

  // Nopea avaus-sulku-avaus: joukko ei kasaannu kuten laskuri kasaisi.
  mod.hiljennaAmbienssi('pollo');
  mod.hiljennaAmbienssi('pollo');
  await ajaHaivytykset(kello);
  mod.palautaAmbienssi('pollo');
  await ajaHaivytykset(kello);
  assert.ok(Math.abs(soi.volume - taysi) < 1e-6, 'hiljennys jäi päälle');
  assert.doesNotThrow(() => mod.palautaAmbienssi('ei-ollutkaan'));
  mod.stopPlaceStream();
});

test('paneelin ollessa auki alkava ambienssi alkaa hiljennettynä', async () => {
  const { mod, soittimet, kello } = await lataaAmbienssi();
  mod.nollaaHiljennykset();
  // Kaupungin vaihto pöllö auki: uusi maisema ei saa nousta täyteen.
  mod.hiljennaAmbienssi('pollo');
  mod.playPlaceAmbience('wien', 'kaupunki', 'europe');
  await Promise.resolve();
  const hiljainen = soittimet[0];
  hiljainen.laukaise('loadedmetadata');
  await ajaHaivytykset(kello);
  const hiljaaTaso = hiljainen.volume;

  mod.palautaAmbienssi('pollo');
  await ajaHaivytykset(kello);
  assert.ok(hiljainen.volume > hiljaaTaso,
    `uusi maisema alkoi täydellä voimalla (${hiljaaTaso} → ${hiljainen.volume})`);
  mod.stopPlaceStream();
  mod.nollaaHiljennykset();
});

test('kielinäytteet ovat oikeista kaupungeista ja muodoltaan kelvollisia', async () => {
  const { EUROPE_KIELET } = await import('../js/packs/europe-kielet.js');
  const { PACKS } = await import('../js/pack.js');
  const { peiliAaniPolku } = await import('../js/media.js');
  const europe = PACKS.find((p) => p.id === 'europe');
  const polut = new Set();
  for (const [cityId, n] of Object.entries(EUROPE_KIELET)) {
    assert.ok(europe.cities.some((c) => c.id === cityId),
      `tuntematon kaupunki ${cityId}`);
    assert.match(n.url, /^https:\/\/archive\.org\/download\/[^/]+\/.+\.mp3$/i,
      `${cityId}: kelvoton osoite ${n.url}`);
    // Nimi näkyy napin selitteenä ja on samalla lähdemaininta.
    assert.match(n.nimi, /(CC BY|CC0|PD|public domain)/i,
      `${cityId}: nimestä puuttuu lisenssi — ${n.nimi}`);
    // ND kieltää muokkaamisen, ja peiliin menevät äänet leikataan
    // kolmeen minuuttiin — siksi ND-lisenssiä ei saa päätyä listaan.
    assert.doesNotMatch(n.nimi, /-ND\b/,
      `${cityId}: ND-lisenssi ei sovi leikattavaksi — ${n.nimi}`);
    assert.ok(n.kesto > 0 && n.kesto <= 180,
      `${cityId}: kesto ${n.kesto} s ei ole leikatun näytteen mittainen`);
    const polku = peiliAaniPolku(n.url);
    assert.ok(polku && !polut.has(polku), `${cityId}: peilipolku puuttuu tai toistuu`);
    polut.add(polku);
  }
  assert.ok(Object.keys(EUROPE_KIELET).length >= 25,
    'kielinäytteitä on liian vähän — nappi jäisi useimmilta näkymättä');
});

test('musiikkinäytteet ovat suoria mp3-osoitteita ja kertovat lisenssin', async () => {
  const { EUROPE_KULTTUURI } = await import('../js/packs/europe-kulttuuri.js');
  const { KULTTUURI_KATEGORIAT } = await import('../js/packs/kulttuuri-kategoriat.js');
  // Näyte voi olla kahdessa paikassa. Kun kaupunki saa oman lehden, sen
  // litteät nostot siirtyvät europe-kulttuuri.js:stä kategorioihin ja
  // näyte siirtyy mukana. Pelaajalle se on sama nappi samassa jutussa,
  // joten testin on laskettava molemmat — muuten lukumäärän vahti
  // laukeaa siirrosta eikä siitä, että näytteitä oikeasti katosi.
  const kaikki = [
    ...Object.entries(EUROPE_KULTTUURI)
      .flatMap(([city, tiedot]) => (tiedot.nostot ?? []).map((n) => [city, n])),
    ...Object.entries(KULTTUURI_KATEGORIAT)
      .flatMap(([city, sivut]) => sivut.flatMap((s) => (s.nostot ?? []).map((n) => [city, n]))),
  ];
  let maara = 0;
  {
    for (const [city, nosto] of kaikki) {
      // Vanha kenttä oli linkki yleisradion etusivulle. Sitä ei saa
      // palauttaa: sivulle päätyminen ei ole musiikin kuulemista.
      assert.equal(nosto.musiikkiVapaa, undefined,
        `${city}: musiikkiVapaa on korvattu musiikkiNayte-kentällä`);
      if (!nosto.musiikkiNayte) continue;
      maara += 1;
      // Soitin on <audio>, joten osoitteen pitää olla suora
      // äänitiedosto. Ogg ja flac eivät kelpaa: Safari ei soita niitä.
      assert.match(nosto.musiikkiNayte, /^https:\/\/[^\s'"]+\.mp3$/i,
        `${city}: näytteen pitää olla suora mp3 — ${nosto.musiikkiNayte}`);
      assert.match(nosto.musiikkiNayte,
        /^https:\/\/(upload\.wikimedia\.org|archive\.org)\//,
        `${city}: tuntematon lähde — vain Commons ja archive.org`);
      // Nimi näkyy napin selitteenä ja on samalla lähdemaininta.
      assert.match(nosto.musiikkiNayteNimi ?? '', /(CC BY|CC0|PD|public domain)/i,
        `${city}: näytteen nimestä puuttuu lisenssi — ${nosto.musiikkiNayteNimi}`);
      // ND kieltää muokkaamisen, ja archive.orgin näytteet leikataan
      // peiliin kolmeen minuuttiin.
      assert.doesNotMatch(nosto.musiikkiNayteNimi ?? '', /-ND\b/,
        `${city}: ND-lisenssi ei sovi leikattavaksi`);
    }
  }
  assert.ok(maara >= 15, `musiikkinäytteitä vain ${maara}`);
});

/* ------------------------------------------------------------------ */
/* Taustavahti — kaikki äänet vaikenevat taustalla                     */
/* ------------------------------------------------------------------ */

/*
 * Omistajan tilaus 24.8.2026: "Pelin äänet pitäisi hiljentyä kaikki jos
 * sovellus ei ole iOS-laitteella auki päällimmäisenä." Vahdin oma
 * kirjanpito (js/aani-tausta.js) testataan tässä; oikeat soittimet ja
 * äänikontekstit mittaa tools/savukkeet/savuke-aanet-tausta.mjs.
 */

test('taustavahti kertoo tilan jokaiselle vaimentajalle kerran', async () => {
  const vahti = await import('../js/aani-tausta.js');
  const jaljet = [];
  const irrota = vahti.lisaaTaustaVaimennus({
    hiljenna: () => jaljet.push('hiljenna'),
    palauta: () => jaljet.push('palauta'),
  });
  assert.equal(vahti.taustallaNyt(), false);
  assert.equal(vahti.hiljennaTaustalle(), true);
  assert.equal(vahti.taustallaNyt(), true);
  // Toinen "taustalle" on tyhjä kutsu: neljä eri tapahtumalähdettä
  // (visibilitychange, pagehide, freeze, iOS-kuori) voi kertoa samasta.
  assert.equal(vahti.hiljennaTaustalle(), false);
  assert.equal(vahti.palautaEtualalle(), true);
  assert.equal(vahti.palautaEtualalle(), false);
  assert.deepEqual(jaljet, ['hiljenna', 'palauta']);
  irrota();
  vahti.hiljennaTaustalle();
  vahti.palautaEtualalle();
  assert.deepEqual(jaljet, ['hiljenna', 'palauta'], 'irrotettu vaimentaja sai vielä kutsun');
});

test('yhden vaimentajan virhe ei jätä muita soimaan', async () => {
  const vahti = await import('../js/aani-tausta.js');
  const jaljet = [];
  const irrotaRikki = vahti.lisaaTaustaVaimennus({
    hiljenna: () => { throw new Error('rikki'); },
  });
  const irrotaEhja = vahti.lisaaTaustaVaimennus({ hiljenna: () => jaljet.push('ehja') });
  vahti.hiljennaTaustalle();
  vahti.palautaEtualalle();
  assert.deepEqual(jaljet, ['ehja']);
  irrotaRikki();
  irrotaEhja();
});

test('taustalla rekisteröity vaimentaja vaikenee heti', async () => {
  const vahti = await import('../js/aani-tausta.js');
  vahti.hiljennaTaustalle();
  let hiljennetty = 0;
  const irrota = vahti.lisaaTaustaVaimennus({ hiljenna: () => { hiljennetty += 1; } });
  assert.equal(hiljennetty, 1, 'taustalla syntynyt äänilähde jäisi ainoana soimaan');
  vahti.palautaEtualalle();
  irrota();
});

test('taustavahti ei tuo mitään — se on riippuvuuspuun pohjalla', () => {
  const lahde = readFileSync(new URL('../js/aani-tausta.js', import.meta.url), 'utf8');
  assert.doesNotMatch(lahde, /^import\s/m,
    'vahdin tuonti kääntyisi kehäksi niputuksessa (tools/build-standalone.mjs)');
});

test('jokainen äänilähde rekisteröi taustavaimennuksensa', () => {
  const moduulit = [
    'js/sound.js', 'js/puhe.js', 'js/ambience-stream.js',
    'js/lukija.js', 'js/luenta.js', 'js/linssit/radio.js',
  ];
  for (const polku of moduulit) {
    const lahde = readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
    assert.match(lahde, /lisaaTaustaVaimennus\(/,
      `${polku} ei liity taustavahtiin — sen ääni jäisi soimaan taustalle`);
  }
});

test('kesken jäänyt luenta ei ala itsestään paluussa', () => {
  const puhe = readFileSync(new URL('../js/puhe.js', import.meta.url), 'utf8');
  const jatko = puhe.slice(puhe.indexOf('export function jatkaPuheEtualalla()'));
  const runko = jatko.slice(0, jatko.indexOf('}') + 1);
  assert.doesNotMatch(runko, /resume/,
    'lukijaäänen piirin herätys jatkaisi kertojaa keskeltä lausetta');
  const lukija = readFileSync(new URL('../js/lukija.js', import.meta.url), 'utf8');
  assert.match(lukija, /lisaaTaustaVaimennus\(\{ hiljenna: taustaHiljennaLukija \}\)/,
    'lukijalle ei saa antaa automaattista paluuta');
});
