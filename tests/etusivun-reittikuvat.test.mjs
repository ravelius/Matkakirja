import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

/*
 * ETUSIVUN REITTIKUVAT (js/etusivupallo.js, osio REITTIKUVAT PALLON
 * PINNALLA).
 *
 * OMISTAJA 6.9.2026 aamu, sanatarkasti: *"Etusivulla kuvat voisivat
 * tulla pienellä kartalle kaupungin käännöksen kohdalle ja seurata
 * kaupunkia ja lopulta häipyä sitä kautta näkyvistä. Käytä uusia
 * vaaleita kuvia. Voi olla isoisän ottamia kuvia."*
 *
 * Vartioi viisi asiaa, joita ei näe silmällä yhdestä kuvakaappauksesta:
 * (1) jokaisella reitin kaupungilla on kuva (Pariisi on kirjattu
 * poikkeus, kunnes kuvaputki toimittaa sen); (2) osoitteet osoittavat
 * pelin omaan ämpäriin ja kuvateksti on kuvaputken muotoa; (3) kuva
 * ilmestyy juuri käännöksessä ja kuolee eliniässään; (4) kuva häipyy
 * viimeistään pallon reunalla eikä koskaan litisty reunaan; (5) kuva
 * on ankkuroitu kaupungin lat/lon-pisteeseen samalla projektiolla kuin
 * kone — ei ruudun kiinteään paikkaan.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* Selaimen varastot: moduuli lukee molempia try/catchin takaa. */
const varasto = new Map();
globalThis.localStorage = {
  getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
  setItem: (k, v) => varasto.set(k, String(v)),
  removeItem: (k) => varasto.delete(k),
};
globalThis.location = { search: '' };

const {
  ETUSIVUN_REITTI, ETUSIVUN_KAMERA,
  REITTIKUVAN_ELINIKA_S, REITTIKUVAN_HAIPYMINEN_S, REITTIKUVAN_ILMESTYS_S,
  REITTIKUVAN_KOKO_OSUUS, REITTIKUVAN_NOSTO, REITTIKUVAN_PITO_S,
  REITTIKUVAN_REUNAKULMA, REITTIKUVAN_REUNAVYO,
  REITTIKUVAN_KIRKASTUS,
  kameranKulma, kameranNakyma, koneenTila, reitinKuvat, reitinPisteet,
  reittikuvanIka, reittikuvanKoko, reittikuvanOsoite, reittikuvanPeitto,
  saapumisenHetket, teeReitti,
} = await import('../js/etusivupallo.js');
const {
  ETUSIVUN_ISOISAKUVAT, ETUSIVUN_PIENET, isoisakuvanSavy,
} = await import('../js/packs/etusivun-isoisakuvat.js');
const { packById } = await import('../js/pack.js');

const reitti = teeReitti(reitinPisteet(packById('maailmankartta')));
const hetket = saapumisenHetket(reitti);

/*
 * PARIISI ON AINOA REITIN KAUPUNKI ILMAN KUVAA (päätoimittajan
 * tarkennus 6.9.2026 aamu: väliaikaista sijaista ei panna). Kun
 * kuvaputki toimittaa Pariisin kuvan, tämä lista tyhjenee — ja jos
 * jokin MUU kaupunki putoaa kuvattomaksi, testi kaatuu.
 */
const KUVATTOMAT = ['pariisi'];

test('jokaisella reitin kaupungilla on kuva (Pariisi kirjattu poikkeus)', () => {
  const kartta = reitinKuvat(ETUSIVUN_ISOISAKUVAT);
  const kaupungit = [...new Set(ETUSIVUN_REITTI)];
  const ilman = kaupungit.filter((id) => !kartta.has(id));
  assert.deepEqual(ilman, KUVATTOMAT,
    'reitin kaupunki jäi ilman kuvaa (tai kirjattu poikkeus sai kuvan) — '
    + 'päivitä pakan kaupunki-kentät ja tämän testin KUVATTOMAT');
  // Kalkutta sai Benares-kuvan (päätoimittaja 6.9.2026), kuvateksti ennallaan.
  assert.equal(kartta.get('kolkata').tunnus, 'isoisa-benares-ghat-more-r20260905-v2');
  assert.equal(kartta.get('kolkata').kuvateksti, 'Isoisän ottama kuva, Benares, 1873');
  // Yksi kaupunki, yksi kuva: pakan ensimmäinen osuma voittaa.
  const laskuri = new Map();
  for (const k of ETUSIVUN_ISOISAKUVAT) {
    if (!k.kaupunki) continue;
    laskuri.set(k.kaupunki, (laskuri.get(k.kaupunki) ?? 0) + 1);
    assert.ok(kaupungit.includes(k.kaupunki),
      `kuvan ${k.tunnus} kaupunki "${k.kaupunki}" ei ole reitillä`);
  }
  for (const [id, n] of laskuri) {
    assert.equal(n, 1, `kaupungilla ${id} on ${n} kuvaa — kerros näyttäisi vain ensimmäisen`);
  }
});

test('kuvien osoitteet ovat pelin ämpärissä ja kuvateksti on kuvaputken muotoa', () => {
  for (const [id, kuva] of reitinKuvat(ETUSIVUN_ISOISAKUVAT)) {
    assert.ok(kuva.osoite.startsWith('https://media.matkakirja.app/kohtaamiset/isoisa/'),
      `${id}: osoite ei osoita pelin ämpäriin (${kuva.osoite})`);
    assert.match(kuva.osoite, /\.jpg$/, `${id}: kuvaputken vedos on jpg`);
    /*
     * KUVATEKSTI ON KUVAPUTKEN SANASTA SANAAN, paikka + vuosi (Raamattu:
     * ISOISA JAA ARVOITUKSEKSI) — ei koskaan ulkonäön kuvausta.
     */
    assert.match(kuva.kuvateksti, /^(Isoisä|Isoisän ottama kuva), .+, 1873$/,
      `${id}: kuvateksti "${kuva.kuvateksti}" ei ole muotoa [Isoisä|Isoisän ottama kuva], paikka, 1873`);
    assert.doesNotMatch(kuva.kuvateksti, /kasvo|parta|silm|hattu|pitkä|lyhyt/i,
      `${id}: kuvateksti kuvailee isoisän ulkonäköä`);
    // Kuvat ovat kuvaputken VAALEITA vinjettikuvia (omistaja: "uusia vaaleita").
    assert.equal(kuva.savy, 'vaalea', `${id}: reittikuvan on oltava vaalea vinjettikuva`);
    assert.ok(isoisakuvanSavy(kuva).haalea >= 0.8,
      `${id}: vaalea kuva ei saa haalistua näkymättömiin pallon päällä`);
  }
});

/*
 * PIENENNETYT KUVAT REPOSSA (omistaja 6.9.2026: *"Etusivulle kuvat
 * kannattaa varmaan pienentää valmiiksi että pyörii parhaiten. Kuvat
 * saavat olla aika pieniä."*). Pallo lataa nämä, ei ämpärin isoa
 * vedosta — muuten yhdeksän 0,5–0,9 Mt:n kuvaa purkautuisi juuri
 * silloin, kun pallon pitää pyöriä tasaisesti.
 */
test('reittikuva ladataan repon pienennetystä vedoksesta, ei ämpäristä', () => {
  assert.equal(ETUSIVUN_PIENET, 'assets/etusivu/reitti/');
  for (const [id, kuva] of reitinKuvat(ETUSIVUN_ISOISAKUVAT)) {
    assert.equal(kuva.pieni, `${ETUSIVUN_PIENET}${id}.jpg`,
      `${id}: pienennetty vedos puuttuu tai on väärännimensä`);
    assert.equal(reittikuvanOsoite(kuva), kuva.pieni, `${id}: kerros lataisi ison kuvan`);
    const polku = new URL(`../${kuva.pieni}`, import.meta.url);
    const koko = statSync(polku).size;
    assert.ok(koko > 2000 && koko < 40000,
      `${id}: pienennetty kuva on ${Math.round(koko / 1024)} kt — ei enää "aika pieni"`);
  }
  // Ilman pienennystä (uusi kuvaputken toimitus) kerros lataa lähteen.
  assert.equal(reittikuvanOsoite({ osoite: 'https://x/y.jpg' }), 'https://x/y.jpg');
  assert.equal(reittikuvanOsoite(null), '');
  // Esiladataan myös offline: jokainen tiedosto on sw.js:n SHELLissä.
  const sw = lue('../sw.js');
  for (const [id] of reitinKuvat(ETUSIVUN_ISOISAKUVAT)) {
    assert.ok(sw.includes(`'./assets/etusivu/reitti/${id}.jpg'`),
      `${id}: pienennetty kuva puuttuu sw.js:n SHELListä`);
  }
});

test('kuva nousee juuri käännöksessä ja saa kaupunkinsa koordinaatit', () => {
  const kaupungit = [...new Set(ETUSIVUN_REITTI)].filter((id) => !KUVATTOMAT.includes(id));
  assert.equal(hetket.length, kaupungit.length,
    'jokaiselle kuvalliselle käännökselle syntyy tasan yksi kuvahetki');
  for (const h of hetket) {
    // Aika on jakson loppu: kone on kaupungin kohdalla.
    const kone = koneenTila(reitti, h.aika);
    assert.ok(Math.abs(kone.lat - h.lat) < 1e-6, `${h.id}: kuva ei ole koneen kohdalla`);
    assert.ok(Math.abs(((kone.lon - h.lon) % 360 + 540) % 360 - 180) < 1e-6,
      `${h.id}: kuvan pituusaste ei osu käännökseen`);
    assert.ok(h.kuva?.osoite, `${h.id}: hetkellä ei ole kuvaa`);
  }
  // Käännökset ovat aikajärjestyksessä eivätkä osu kierroksen ulkopuolelle.
  for (let i = 1; i < hetket.length; i++) {
    assert.ok(hetket[i].aika > hetket[i - 1].aika, 'käännökset eivät ole aikajärjestyksessä');
  }
  assert.ok(hetket[hetket.length - 1].aika <= reitti.kesto, 'käännös kierroksen ulkopuolella');
  // Pariisi ei tuo kuvaa (eikä tyhjää elementtiä).
  assert.ok(!hetket.some((h) => h.id === 'pariisi'), 'kuvattomalle kaupungille syntyi kuvahetki');
});

/*
 * ILMESTYS ~600 MS, HÄIPYMINEN ~2,5–3 S (omistajan tilaus 6.9.2026:
 * kuva *"feidaa sisään"*, seuraa kaupunkia ja *"lopulta häipyä sitä
 * kautta näkyvistä"*).
 */
test('peittävyys: ilmestyy 600 ms:ssä, pysyy ja häipyy 2,5–3 s kuluessa', () => {
  assert.equal(REITTIKUVAN_ILMESTYS_S, 0.6, 'ilmestyminen ei ole omistajan ~600 ms');
  assert.ok(REITTIKUVAN_HAIPYMINEN_S >= 2.5 && REITTIKUVAN_HAIPYMINEN_S <= 3,
    `häipyminen ${REITTIKUVAN_HAIPYMINEN_S} s ei ole omistajan 2,5–3 s`);
  assert.equal(REITTIKUVAN_ELINIKA_S,
    REITTIKUVAN_ILMESTYS_S + REITTIKUVAN_PITO_S + REITTIKUVAN_HAIPYMINEN_S);

  const p = (ika) => reittikuvanPeitto(ika, 0);
  assert.equal(p(-0.2), 0, 'kuva ei näy ennen käännöstä');
  assert.equal(p(0), 0, 'kuva ei napsahda esiin täydellä peittävyydellä');
  assert.ok(p(0.3) > 0.4 && p(0.3) < 0.6, 'ilmestyminen on lineaarinen liuku');
  assert.equal(p(REITTIKUVAN_ILMESTYS_S), 1, 'kuva on täysillä ilmestyksen jälkeen');
  assert.equal(p(REITTIKUVAN_ILMESTYS_S + REITTIKUVAN_PITO_S), 1, 'pito on täydellä peittävyydellä');
  assert.ok(p(REITTIKUVAN_ELINIKA_S - 0.5) < 0.25, 'kuva on jo lähes poissa lopussa');
  assert.equal(p(REITTIKUVAN_ELINIKA_S), 0, 'kuva sammuu eliniän lopussa');
  assert.equal(p(REITTIKUVAN_ELINIKA_S + 5), 0, 'vanha kuva ei herää henkiin');
  // Huippu tulee pakan haaleudesta: vaalea kuva ei ole täysin peittävä.
  assert.ok(Math.abs(reittikuvanPeitto(1, 0, { huippu: 0.85 }) - 0.85) < 1e-9);
  /*
   * LIIKE VÄHENNETTYNÄ: ei kehyksittäistä liukua, vaan portaittainen
   * peittävyys — css häivyttää kuvan liikkumatta (Raamattu, sääntö 4).
   */
  assert.equal(reittikuvanPeitto(0.05, 0, { portaittain: true }), 1,
    'liike vähennettynä kuva on heti esillä (css hoitaa häivytyksen)');
  assert.equal(reittikuvanPeitto(REITTIKUVAN_ELINIKA_S + 1, 0, { portaittain: true }), 0);
  const css = lue('../css/styles.css');
  const vahennetty = [...css.matchAll(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g)]
    .map((m) => m[0]).find((t) => t.includes('.etusivupallo'));
  assert.ok(vahennetty, 'etusivupallolla ei ole reduced motion -sääntöä');
  assert.match(vahennetty, /\.etusivupallo-reittikuva \{ transition: opacity \d+ms ease; \}/,
    'liike vähennettynä kuvalta puuttuu pelkkä häivytys');
});

test('kuva häipyy pallon reunalla eikä koskaan litisty reunaan', () => {
  assert.ok(REITTIKUVAN_REUNAKULMA >= 65 && REITTIKUVAN_REUNAKULMA <= 75,
    `reunakulma ${REITTIKUVAN_REUNAKULMA}° ei ole omistajan ~70°`);
  assert.ok(REITTIKUVAN_REUNAKULMA + REITTIKUVAN_REUNAVYO < 90,
    'kuvan on hävittävä ennen näkyvän kalotin reunaa');
  const täysi = REITTIKUVAN_ILMESTYS_S + 0.1;
  assert.equal(reittikuvanPeitto(täysi, REITTIKUVAN_REUNAKULMA), 1, 'keskellä kuva on täysillä');
  assert.ok(reittikuvanPeitto(täysi, REITTIKUVAN_REUNAKULMA + 5) < 0.6, 'reunalla kuva jo häipyy');
  assert.equal(reittikuvanPeitto(täysi, REITTIKUVAN_REUNAKULMA + REITTIKUVAN_REUNAVYO), 0,
    'reunavyön päässä kuvaa ei ole');
  assert.equal(reittikuvanPeitto(täysi, 120), 0, 'pallon takapuolella ei näytetä kuvaa');

  // Kulma lasketaan samasta kamerasta kuin projektio: keskipiste on 0°.
  const nakyma = kameranNakyma(reitti, 12);
  assert.ok(kameranKulma({ lat: nakyma.lat, lon: nakyma.lon }, nakyma) < 1e-9);
  assert.ok(Math.abs(kameranKulma({ lat: 0, lon: 90 }, { lat: 0, lon: 0 }) - 90) < 1e-9,
    'neljännes päiväntasaajaa on 90°');
  assert.ok(Math.abs(kameranKulma({ lat: 90, lon: 0 }, nakyma) - (90 - nakyma.lat)) < 1e-9,
    'kulma mitataan kameran akselista');

  /*
   * KUVA EI JÄÄ ROIKKUMAAN: jokainen käännös katoaa itsestään, ja
   * kierroksen sauman yli häipyminen jatkuu (kello kelaa).
   */
  assert.ok(reittikuvanIka(0.4, reitti.kesto - 1, reitti.kesto) > 1.3,
    'sauman yli jatkuva häipyminen katkeaa');
  assert.equal(reittikuvanIka(10, 4, reitti.kesto), 6);
  for (const h of hetket) {
    let nakyi = false;
    for (let t = h.aika; t < h.aika + REITTIKUVAN_ELINIKA_S; t += 0.1) {
      const nakymaT = kameranNakyma(reitti, t);
      const peitto = reittikuvanPeitto(reittikuvanIka(t % reitti.kesto, h.aika, reitti.kesto),
        kameranKulma(h, nakymaT));
      if (peitto > 0.3) nakyi = true;
    }
    assert.ok(nakyi, `${h.id}: kuva ei ehdi näkyä lainkaan käännöksessään`);
  }
});

test('kuva on pieni, ankkuroitu kaupunkiin ja koneen alla', () => {
  // Halkaisija 11–14 % ruudun lyhyemmästä sivusta (omistajan tilaus).
  assert.ok(REITTIKUVAN_KOKO_OSUUS >= 0.11 && REITTIKUVAN_KOKO_OSUUS <= 0.14,
    `koko ${REITTIKUVAN_KOKO_OSUUS} ei ole 11–14 % lyhyemmästä sivusta`);
  assert.equal(reittikuvanKoko(1280, 800), 800 * REITTIKUVAN_KOKO_OSUUS);
  assert.equal(reittikuvanKoko(390, 844), 390 * REITTIKUVAN_KOKO_OSUUS);
  assert.ok(REITTIKUVAN_NOSTO > 0, 'kuva on kaupungin yläpuolella, ei koneen päällä');

  const lahde = lue('../js/etusivupallo.js');
  const kerros = lahde.slice(lahde.indexOf('export async function avaaEtusivupallo'));
  // ANKKURI: paikka lasketaan joka kehyksellä samalla projektiolla kuin kone.
  assert.match(kerros, /videostaRuudulle\(pallonPiste\(r, nakyma, mitat\), sov\)/,
    'kuvan paikka ei tule pallon projektiosta — se ei seuraisi kaupunkia');
  assert.match(kerros, /piirraReittikuvat\(t, nakyma\);/,
    'kuvia ei piirretä samassa kehyksessä kameran kanssa');
  // KONE JÄÄ PÄÄLLE: kuvakerros liitetään ennen SVG:tä.
  assert.ok(kerros.indexOf("juuri.appendChild(kuvakerros)") < kerros.indexOf("class: 'etusivupallo-reitti'"),
    'kuvakerros on SVG:n päällä — kuva peittäisi koneen ja viivan');
  // ESILATAUS: osoite annetaan heti kerroksen syntyessä.
  assert.match(kerros, /lataaKuvaSitkeasti\(el, reittikuvanOsoite\(s\.kuva\)\)/,
    'kuvia ei esiladata reitin alussa (käännöksessä olisi latausviive)');
  // ALT-TEKSTI on kuvateksti (kuvateksti ei näy pallolla).
  assert.match(kerros, /el\.alt = s\.kuva\.kuvateksti/, 'kuvalta puuttuu alt-teksti');

  /* CSS: koko kuva paperireunoineen, vaalea reuna sulautuu pallon pintaan. */
  const css = lue('../css/styles.css');
  const tyyli = css.match(/\.etusivupallo-reittikuva \{[\s\S]*?\n\}/)[0];
  /*
   * REUNA HÄIPYY MASKILLA EIKÄ SEKOITUSTILALLA. `multiply` ja `darken`
   * mitattiin ensin (6.9.2026 Chromiumilla): koska kuva ja pallon pinta
   * ovat yhtä vaaleaa pergamenttia, kumpikin söi kuvan kokonaan (kuvan
   * osuus ruudun pikseleistä 3–9 yksikköä 255:stä). Perustelu on
   * kirjattava tyyliin, ettei sekoitusta lisätä takaisin sokkona.
   */
  assert.doesNotMatch(tyyli, /^ {2}mix-blend-mode:/m,
    'sekoitustila söi kuvan mittauksissa — reuna häivytetään maskilla');
  assert.match(css, /multiply.{0,400}?darken/s,
    'css:stä puuttuu perustelu sille, miksi sekoitustilaa ei käytetä');
  assert.doesNotMatch(tyyli, /border(?!-radius)[^;]*:/, 'kuvalla ei saa olla kehystä');
  assert.doesNotMatch(tyyli, /box-shadow/, 'kuvalla ei saa olla varjoa');
  assert.doesNotMatch(tyyli, /border-radius: 50%/,
    'pyöreä rajaus leikkaisi vaalean vinjetin');
  /*
   * SUODATIN ON VAIN KONTRASTI, EI SUMENNUS. Kuvat ovat 320 px:n
   * vedoksia yhtä vaalean pallon päällä: ilman pientä kontrastin
   * nostoa ne katosivat pergamenttiin (mitattu 6.9.2026). Sumennus tai
   * varjo maksaisi joka kehyksellä (iOS-sääntö), eikä niitä ole.
   */
  assert.match(tyyli, /filter: contrast\([\d.]+\) brightness\([\d.]+\);/,
    'kontrastin nosto puuttuu — kuva katoaa pallon pergamenttiin');
  assert.doesNotMatch(tyyli, /blur\(|drop-shadow\(/, 'sumennus ja varjo maksavat joka kehyksellä');
  assert.ok(REITTIKUVAN_KIRKASTUS > 0 && REITTIKUVAN_KIRKASTUS <= 0.25,
    'harsokorjaus on pieni mutta olemassa (pakan haaleus jäisi muuten näkymättömäksi)');
  /*
   * MASKI ON PEHMEÄ ULKOREUNA, EI RAJAUS: täysi peittävyys yltää yli
   * kuvan keskiosan ja liuku päättyy vasta reunalla, joten kuva
   * näytetään kokonaan eikä siitä leikata pyöreää palaa.
   */
  for (const etuliite of ['-webkit-mask-image', 'mask-image']) {
    const maski = tyyli.match(
      new RegExp(`${etuliite}: radial-gradient\\(circle at 50% 50%, #000 (\\d+)%, transparent (\\d+)%`),
    );
    assert.ok(maski, `${etuliite} puuttuu — kuvan reuna jäisi suoraksi laatikoksi`);
    const [, taysi, loppu] = maski.map(Number);
    assert.ok(taysi >= 40 && taysi <= 60, `${etuliite}: täysi ala ${taysi} % ei ole 40–60 %`);
    assert.ok(loppu >= 75 && loppu <= 95, `${etuliite}: liuku päättyy ${loppu} %:iin`);
  }
  assert.match(css, /\.etusivupallo-kuvat \{[\s\S]*?pointer-events: none;[\s\S]*?\n\}/,
    'kuvakerros ottaisi napautuksia pallolta');
});

test('pakka on SHELLissä muttei yhden tiedoston nipussa', () => {
  assert.match(lue('../sw.js'), /'\.\/js\/packs\/etusivun-isoisakuvat\.js'/,
    'offline-käyttö vaatii pakan SHELListä');
  assert.match(lue('../tests/sw.test.mjs'), /'js\/packs\/etusivun-isoisakuvat\.js'/,
    'pakka on kirjattava NIPUTTAMATTOMAT-listaan (ainoa tuoja on dynaaminen etusivupallo.js)');
  assert.doesNotMatch(lue('../tools/build-standalone.mjs'), /etusivun-isoisakuvat/,
    'dist jää vanhaan etusivun karttaan: pakalla ei ole niputuksessa tuojaa');
  // Kamera on sama olio kuin projektiolla: kulma ja ruutupiste eivät saa erota.
  assert.ok(ETUSIVUN_KAMERA.korkeus > 0);
});
