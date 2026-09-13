/*
 * Savuke: TASOITUSKERROS PALLOLLA — kohdemaa alkuperäisenä, muut maat
 * tasoitettuina (karttauudistus, erä 1c; uloszoomauksen esto erästä 2).
 *
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-tasoitus-pallo.mjs --laatat <kansio>
 *          [--ilman-rajausta] [--rikki-versio] [--vain-kuvat]
 *          [--kuvat <kansio>] [--nimi <tunnus>]
 *
 * === MIKSI TÄMÄ SAVUKE ON ERÄN 1b SAVUKKEEN KÄÄNTEISKUVA ===========
 *
 * Omistaja 13.9.2026 klo 14.10 UTC, nähtyään erän 1b kolme
 * vaihtoehtokuvaa, sanatarkasti: *"Jätä ranska alkuperäiseen. Kaikki
 * muut ihan kamalia. Poistetaan muista maista korkeus erot kokonaan
 * tai lähes kokonaan."* (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 4.)
 *
 * Erän 1b savuke vartioi, että KOHDEMAA MUUTTUU ja naapuri pysyy
 * lähes ennallaan. Päätös 4 kääntää molemmat väitteet ympäri, ja siksi
 * tämä on oma savukkeensa eikä lippu vanhaan: vanhan V2 ("Ranskan
 * sisältä pikseli tummui") on nyt se virhe, jota etsitään.
 *
 *   A  ILMAN TASOITUSKERROSTA. Luettelosta tarjoillaan `varitasot`
 *      poistettuna, eli peli täsmälleen sellaisena kuin se oli ennen
 *      tätä erää. Tämä on samalla valmis-kriteerin vertailuajo.
 *   B  TASOITUSKERROS PÄÄLLÄ, sama kamera, sama taso, samat pisteet.
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 *   V0  Kerros on pallolla ja se on Ranskan: `variMaa === 'FRA'` ja
 *       `varillisia > 0`.
 *   V1  `mittarit().syy` on tyhjä — versioportti
 *       (js/pallolaatat.js lepokerroksenKerrokset) EI sammuttanut
 *       laattakerrosta. Ilman tätä kerros voisi olla "päällä"
 *       kartalla, joka on pelkkää sumeaa Mercator-sarjaa.
 *   V2  RANSKAN SISÄLTÄ PIKSELIT OVAT A:SSA JA B:SSÄ IDENTTISET.
 *       Tämä on päätöksen 4 kirjaimellinen vaatimus ja tämän savukkeen
 *       koko pointti. Väite EI ole yksi piste vaan kokonainen ala
 *       (lon 1,4…3,1 · lat 46,7…48,1, Berry–Sologne: ei rannikkoa, ei
 *       rajaa, ei kaupunkia): laatan alfa on kohdemaan sisällä 0, joten
 *       pohjalaatan seepia näkyy muuttumattomana pikselilleen.
 *   V3  BELGIAN PUOLELTA pikseli VAALENI SELVÄSTI (kerma on paperia
 *       vaaleampi) JA sen reliefikontrasti PIENENI: 9 × 9 ruudun
 *       keskihajonta on B:ssä pienempi kuin A:ssa. Omistajan
 *       *"Poistetaan muista maista korkeus erot"* on nimenomaan
 *       kontrastiväite — pelkkä vaaleneminen ei sitä todista.
 *   V4  AVOMERI vaaleni selvästi (sama kerma, sama peitto).
 *   V5  ALUEVESI (12 mpk) EI SINERRY vaan tasoittuu avomeren tavoin.
 *       Päätös 4: *"Aluevesien sininen ei kuulu alkuperäiseen"*, ja
 *       siksi leikkurin puskuri on tasoitusajossa 0.
 *   V6  Laattamäärä ja tekstuurimuisti eivät kasva: kerros on samassa
 *       kankaassa eikä tuo verkkoa eikä tekstuuria.
 *   V7  ULOSZOOMAUKSEN ESTO Ranskassa (erä 2) ennallaan: kamera ei
 *       ylitä laatikko × 1,15 -rajaa.
 *   V8  RUS EI LUKKIUDU: Venäjässä rajaa ei aseteta.
 *
 * === VASTAKOKEET OVAT PAKOLLISIA ===================================
 *
 *   `--ilman-rajausta`  laatat ajetaan ILMAN poltettua leikkuria
 *                       (generaattorin sama lippu). Silloin kerma
 *                       peittää myös Ranskan, ja V2 ON KAADUTTAVA:
 *                       Ranskan sisältä A ja B eroavat. Tämä on ainoa
 *                       koe siitä, että V2 mittaa leikkuria eikä
 *                       kahden kuvakaappauksen samuutta.
 *   `--rikki-versio`    pyramidin luettelon versio muutetaan niin,
 *                       ettei se vastaa pallon sarjaa. Silloin V1 ON
 *                       KAADUTTAVA (`syy` ei ole tyhjä).
 *
 * === POHJA TULEE OIKEASTA ÄMPÄRISTÄ ================================
 *
 * Vain `vari/z…` tarjoillaan paikallisesta pilottikansiosta; pohja,
 * ranta-, viiva- ja nostotaso tulevat tuotannon pyramidista. Syy on
 * versioportti: pallon sarja (laatat.json) ja pyramidi (pyramidi.json)
 * on oltava samaa versiota, tai kerros sammuu kokonaan.
 */
import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const LAATAT = valitsin('laatat', process.env.PYRAMIDI_VARILAATAT ?? '');
const ILMAN_RAJAUSTA = argv.includes('--ilman-rajausta');
const RIKKI_VERSIO = argv.includes('--rikki-versio');
/*
 * VAIN KUVAT (`--vain-kuvat`): B-vaihe ja kuvakaappaukset, ei väitteitä
 * eikä vertailuajoa. Tämä on se ajo, jolla omistajalle tehdään KOLME
 * VAIHTOEHTOA samasta näkymästä eri parametripareilla (vesi/feidaus
 * 0,60/0,25 · 0,72/0,35 · 0,85/0,45) — sama sivu, sama kamera ja sama
 * laattataso kuin vartioajossa, joten kuvat ovat vertailukelpoisia
 * keskenään ja savukkeen mittauksiin.
 */
const VAIN_KUVAT = argv.includes('--vain-kuvat');
const KUVAT = valitsin('kuvat', '');
const NIMI = valitsin('nimi', ILMAN_RAJAUSTA ? 'ilman-rajausta' : (RIKKI_VERSIO ? 'rikki-versio' : 'vihrea'));

/*
 * OHITUS ILMAN LAATTOJA. Savuke tarvitsee pilottilaataston, eikä sitä
 * ole repossa (laatat menevät ämpäriin). Sarja-ajossa
 * (tools/tarkista-savukkeet.mjs) tämä on ohitus eikä kaatuminen —
 * sama käytäntö kuin erän 1 savukkeella.
 */
if (!LAATAT || !existsSync(join(LAATAT, 'pyramidi.json'))) {
  console.log('OHITUS: pilottilaatastoa ei annettu. Aja ensin\n'
    + '  node tools/generoi-laattapyramidi.mjs <kansio> --tasot 4-8 \\\n'
    + '       --vari FRA --paletti tasoitus --peitto 0.85 --variversio pilotti\n'
    + 'ja anna kansio: --laatat <kansio> (tai PYRAMIDI_VARILAATAT).\n'
    + '(Tasoitusajo ei tarvitse --data-kansiota: se ei piirrä maastoa.)');
  process.exit(0);
}
const PILOTTI = JSON.parse(readFileSync(join(LAATAT, 'pyramidi.json'), 'utf8'));
const VARITASOT = PILOTTI.varitasot ?? null;
if (!VARITASOT?.FRA?.tasot?.length) {
  console.error('Pilottiluettelossa ei ole varitasot.FRA-kirjausta — onko ajo tehty --vari FRA:lla?');
  process.exit(2);
}

/*
 * MITTAUSPISTEET ASTEINA (samat kuin erän 1 savukkeella, jotta luvut
 * ovat vertailukelpoisia). Jokainen on valittu niin, ettei sen päällä
 * ole kaupunkia, reittiä eikä nostoa.
 */
const PISTEET = [
  {
    avain: 'ranska', lon: 2.0, lat: 47.3, ryhma: 'maa', odotus: 'ennallaan',
    seloste: 'Keski-Ranska (Sologne, ~120 m)',
  },
  /*
   * BELGIAN PISTE SIIRRETTIIN ARDENNEILLE, JA SE ON MITTAUKSEN KORJAUS.
   *
   * Erän 1b piste oli Namurissa (4,6 E 50,6 N), ja sen raportti kirjasi
   * jo rajoitteen (luku 7.2): piste on HÄIVEEN SISÄLLÄ, jossa peitto on
   * nimellistä pienempi. Erän 1c ensimmäinen ajo mittasi sen luvuksi:
   * laatan alfa Namurissa on 161/255 = 0,63 × nimellisestä, ja mitattu
   * muutos ruudulla oli yksi yksikkö — eli piste ei kelpaa PEITON
   * mittaamiseen, vain sen suuntaan.
   *
   * Uusi piste on Ardenneilla (5,30 E 50,05 N): laatan alfa siellä on
   * 217/255 = TÄSMÄLLEEN nimellinen 0,85, eli piste on sekä kohdemaan
   * leikkurin ulkopuolella että häiveen sisäpuolella. Alfa 217 on
   * samalla todiste kummastakin: leikkuri on maan polygoni ilman
   * puskuria, joten täysi peitto EI voi olla Ranskan sisällä.
   *
   * Reliefiä siellä on mitattavaksi (Ardennien ylänkö, 300–600 m), ja
   * se on ehto σ-väitteelle: tasaisella alangolla keskihajonta olisi
   * lähtökohtaisesti nolla eikä sen kutistumista voisi nähdä.
   */
  {
    avain: 'belgia', lon: 5.30, lat: 50.05, ryhma: 'maa', odotus: 'tasoittui',
    seloste: 'Belgia, Ardennit (täyden peiton alueella)',
  },
  /*
   * MERIPISTEET OVAT LIONINLAHDELLA EIKÄ MARSEILLEN EDUSTALLA, ja se on
   * MITTAUKSEN KORJAUS eikä siirto helpompaan paikkaan. Erän 1 piste
   * 5,3 E 43,15 N on Natural Earthin merialuetta, mutta se osuu
   * Marseillen rannikon rikkonaiseen kohtaan: pisteen ympärillä on
   * kaupunkimerkki, punainen kehä ja rantaviiva, ja z8-näkymässä
   * mittaus luki niiden sävyä (murrettu maa 226,217,167) eikä vettä.
   * Camarguen edustalla rantaviiva on suora ja tyhjä, joten 12 mpk:n
   * kaistale on siellä mitattavissa puhtaana.
   *
   * LATITUDIT TULEVAT PROFIILIMITTAUKSESTA, EI AINEISTOHAUSTA. Ensin
   * ne laskettiin Natural Earthin merirenkaista pistetestillä, ja
   * tulos oli väärä: testi väitti rannan olevan 43,46 N:ssä, joten
   * aluevesipiste osui maalle (murrettu maa 230,219,172). Kartalta
   * mitattu profiili (4,5 E, alla `profiili`-tuloste) näyttää rannan
   * olevan 43,12 N:ssä: 43,10…42,95 on savunsinistä (191…195,
   * 198…203, 192…196) ja 42,90 alkaen feidattua seepiaa (222,214,188).
   * Piirtomoottorin oma maa/meri-päätös on se, mitä laatassa on —
   * pistetesti oli neljäs totuus samasta rannasta.
   *
   * Aluevesipiste on siis 0,10° = 11 km = 6 mpk rannasta ja
   * avomeripiste 0,52° = 58 km = 31 mpk; leikkuri ulottuu 6,7
   * lautayksikköä = 0,20° eli 42,92 N:ään.
   */
  {
    avain: 'aluevesi', lon: 4.5, lat: 43.02, ryhma: 'meri', odotus: 'tasoittui',
    seloste: 'Lioninlahti Camarguen edustalla, ~6 mpk rannasta',
  },
  {
    avain: 'avomeri', lon: 4.5, lat: 42.6, ryhma: 'meri', odotus: 'tasoittui',
    seloste: 'Lioninlahti ~31 mpk rannasta',
  },
];

/*
 * ====== RANSKAN VERTAILUALA (erä 1c, V2) ===========================
 *
 * YKSI PIKSELI EI TODISTA "ALKUPERÄISTÄ". Päätös 4 sanoo *"Jätä ranska
 * alkuperäiseen"*, ja se on väite koko maasta — yhden pisteen
 * samuuden voisi tuottaa myös kerma, joka sattuu osumaan samaan
 * sävyyn. Siksi V2 vertaa KOKONAISTA ALAA pikseli pikseliltä.
 *
 * ALA ON BERRY–SOLOGNE (lon 1,4…3,1 · lat 46,7…48,1) ja se on valittu
 * kolmella ehdolla: (1) kokonaan Ranskan sisällä, kaukana rajasta ja
 * rannikosta, jottei leikkurin pehmennetty reuna osu siihen; (2) ei
 * kaupunkia eikä nostoa (ne ovat HTML-merkkejä ja piilotetaan, mutta
 * poltettu reitti on laatassa — reitti ei silti haittaa, koska se on
 * SAMA laatassa A:ssa ja B:ssä); (3) mahtuu `maa`-mittauskameran
 * näkymään kokonaan.
 */
const RANSKAN_ALA = {
  lon0: 1.4, lat0: 46.7, lon1: 3.1, lat1: 48.1,
  seloste: 'Berry–Sologne, kokonaan Ranskan sisällä',
};

/*
 * KAKSI MITTAUSKAMERAA, EIKÄ YKSI. Ensimmäisessä ajossa kaikki neljä
 * pistettä mitattiin saapumisnäkymästä, ja aluevesi luki lämpimäksi:
 * 12 mpk:n kaistale on 6,7 lautayksikköä eli siinä näkymässä 4 css-
 * pikseliä, ja mediaani 9 × 9 laitepikselin ruudusta sekoitti siihen
 * rantaviivan ja maan. Kaistaleen mittaaminen vaatii näkymän, jossa se
 * on kymmeniä pikseleitä leveä — ja zoomaaminen SISÄÄN on juuri se,
 * mitä erän 2 esto sallii.
 *
 * Laatikot ovat laudan yksiköissä (LAUTA-projektio alla).
 */
const KAMERAT = {
  maa: {
    seloste: 'Ranska ja Belgia (saapumisnäkymää lähempänä)',
    lon0: 0.5, lat0: 46.2, lon1: 6.2, lat1: 51.6,
    /*
     * PROFIILI RANSKAN POHJOISRAJAN YLI. Sama syy kuin merikameralla:
     * yksi piste ei kerro, MISSÄ leikkurin reuna ja feidauksen häive
     * ovat. Ranskan raja on lon 4,6:n kohdalla noin 49,95 N, ja sen
     * pohjoispuolella alkaa kerma — jonka peitto laskee laataston
     * pohjoisreunaa (51,77 N) kohti häiveen takia.
     */
    profiili: { lon: 4.6, lat0: 49.4, lat1: 51.6, n: 23 },
  },
  meri: {
    seloste: 'Lioninlahti: 12 mpk:n kaistale ja avomeri',
    lon0: 4.0, lat0: 42.45, lon1: 5.0, lat1: 43.35,
    profiili: { lon: 4.5, lat0: 42.4, lat1: 43.4, n: 21 },
  },
};

/*
 * LAUDAN PROJEKTIO ON LUKITTU (leveys 12000, lon0 −175, pohjoinen 76;
 * tools/generoi-laattapyramidi.mjs LAUTA). Kaava on tässä auki eikä
 * tuotuna, koska savuke ei saa tuoda pelin karttamoduuleja Node-
 * puolelle — sivu tuo ne itse. Sama ratkaisu kuin erän 1 savukkeessa.
 */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;
const laatikkoAsteista = (k) => {
  const x0 = lautaX(k.lon0);
  const x1 = lautaX(k.lon1);
  const y0 = lautaY(k.lat1);
  const y1 = lautaY(k.lat0);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
};

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

/*
 * VÄRITASO PÄÄLLE JA POIS ON YKSI LIPPU PALVELIMELLA, eikä pelin
 * koodin muutos: sama sivu, sama kamera, sama laattataso — vain
 * luettelon `varitasot`-taulu on tai ei ole. Näin A- ja B-vaihe
 * eroavat täsmälleen siinä, mitä tämä erä lisäsi.
 */
let variPaalla = false;

/** Pilotin väriversio (polun osa): tästä tunnistetaan paikalliset laatat. */
const VARIVERSIO = VARITASOT.FRA.versio;
/*
 * FEIDAUKSEN MÄÄRÄ LUETAAN LUETTELOSTA eikä kirjoiteta savukkeeseen:
 * omistaja valitsee luvun kolmesta vaihtoehdosta (0,25 · 0,35 · 0,45),
 * ja savuke mittaa sitä lukua, jolla laatat on poltettu. Vastakoeajo
 * (`--ilman-rajausta`) ei kirjaa feidausta lainkaan, ja silloin
 * odotusarvo on 0,35 eli se, mitä laatoissa PITÄISI olla.
 */
const PEITTO = Number.isFinite(VARITASOT.FRA.peitto) ? VARITASOT.FRA.peitto : 0.85;
const KERMA = VARITASOT.FRA.kerma ?? '#faf4d6';
const KERMA_RGB = [1, 3, 5].map((i) => parseInt(KERMA.slice(i, i + 2), 16));
if (VARITASOT.FRA.paletti !== 'tasoitus') {
  console.error(`Pilottiluettelo on ajettu paletilla "${VARITASOT.FRA.paletti}", ei tasoituksella. `
    + 'Aja --paletti tasoitus tai käytä savuke-varilaatat-pallo.mjs:ää.');
  process.exit(2);
}
tieto('pilotin parametrit', `paletti ${VARITASOT.FRA.paletti} · vesi ${VARITASOT.FRA.vesi} `
  + `· feidaus ${VARITASOT.FRA.feidaus} (häive ${VARITASOT.FRA.feidausReuna}) `
  + `· rajattu ${VARITASOT.FRA.rajattu} · tasot ${VARITASOT.FRA.tasot.join(',')}`);

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});
/* Tallenne: Fogg Ateenassa (sama kuin muilla pallosavukkeilla). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());
/*
 * RUUTU ON VALITSIN, KOSKA FEIDATTU ALA RIIPPUU KUVASUHTEESTA.
 *
 * Erän 1b löydös 7.1: laataston laatikko täyttää ruudun VAIN jos
 * kuvasuhteet täsmäävät. Puhelimella (390 × 844) Ranskan laatikon
 * leveys täyttää ruudun ja korkeussuunnassa näkyy kolminkertainen
 * ala; työpöydällä (1440 × 900) ylimääräinen ala on leveyssuunnassa.
 * Häive on mitoitettu puhelimelle, joten työpöytäkuva on nähtävä
 * erikseen — ja `--ruutu 1440x900` on se, millä se nähdään.
 *
 * VÄITTEET AJETAAN AINA PUHELIMELLA. Mittauspisteet, vertailuala ja
 * laattamäärät on kalibroitu siihen ruutuun; työpöytä on kuvia varten
 * (`--vain-kuvat --ruutu 1440x900`).
 */
const RUUTU = (() => {
  const t = valitsin('ruutu', '390x844');
  const [w, h] = String(t).toLowerCase().split('x').map(Number);
  if (!(w > 0) || !(h > 0)) {
    console.error(`--ruutu ${t}: odotettiin muotoa <leveys>x<korkeus>.`);
    process.exit(2);
  }
  return { w, h, puhelin: w < 900 };
})();
const ctx = await selain.newContext({
  viewport: { width: RUUTU.w, height: RUUTU.h },
  hasTouch: RUUTU.puhelin,
  isMobile: RUUTU.puhelin,
  deviceScaleFactor: RUUTU.puhelin ? 3 : 2,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const osa = url.split('/julisteet/pyramidi/')[1] ?? null;
  /*
   * VÄRILAATTA PAIKALLISESTA KANSIOSTA. Osoite on
   * `<variversio>/vari/z<taso>/<sarake>/<rivi>.webp`, ja kansiossa
   * laatat ovat suoraan `vari/z…`-polussa ilman versio-osaa.
   */
  if (osa && osa.includes('/vari/')) {
    const tiedosto = join(LAATAT, osa.slice(osa.indexOf('/vari/') + 1));
    if (!existsSync(tiedosto)) { route.fulfill({ status: 404, body: 'ei' }); return; }
    route.fulfill({
      status: 200,
      contentType: 'image/webp',
      body: readFileSync(tiedosto),
      headers: { 'access-control-allow-origin': '*' },
    });
    return;
  }
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  /*
   * LUETTELOON LISÄTÄÄN PILOTIN VÄRITASOT. Tuotannon pyramidi.json ei
   * tunne niitä, koska laatat ovat vain tässä kansiossa. Tasogeometria
   * (laatta 512, sarakkeet, arkki, projektio) on sama molemmissa —
   * tarkistetaan alla, eikä oleteta.
   */
  if (osa === 'pyramidi.json') {
    const luettelo = JSON.parse(vastaus.body.toString('utf8'));
    if (variPaalla) luettelo.varitasot = VARITASOT;
    /*
     * VASTAKOE 2: pyramidin versio muutetaan, pallon sarjaa ei.
     * Silloin lepokerroksenKerrokset palauttaa nullin ja koko
     * laattakerros sammuu — `syy` kertoo sen.
     */
    if (RIKKI_VERSIO) luettelo.versio = `${luettelo.versio}-rikki`;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(luettelo),
      /*
       * EI VÄLIMUISTIA LUETTELOLLE. Savuke tarjoilee saman osoitteen
       * kahdesti eri sisällöllä (A ilman väritasoja, B niiden kanssa),
       * ja välimuistista tullut vastaus tekisi B:stä A:n kopion —
       * kaksi identtistä mittausta ja kaikki väitteet punaisina.
       */
      headers: { 'access-control-allow-origin': '*', 'cache-control': 'no-store' },
    });
    return;
  }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});

/* Tasogeometrian yhteensopivuus: pilotti ja tuotanto samalla ruudukolla. */
{
  const tuotanto = await ampariHaku(`${AMPARI}julisteet/pyramidi/pyramidi.json`);
  const luettelo = tuotanto?.status === 200 ? JSON.parse(tuotanto.body.toString('utf8')) : null;
  const sama = luettelo && luettelo.laatta === PILOTTI.laatta
    && JSON.stringify(luettelo.projektio) === JSON.stringify(PILOTTI.projektio)
    && JSON.stringify(luettelo.arkki) === JSON.stringify(PILOTTI.arkki)
    && VARITASOT.FRA.tasot.every((z) => {
      const a = luettelo.tasot.find((t) => t.z === z);
      const b = PILOTTI.tasot.find((t) => t.z === z);
      return a && b && a.sarakkeita === b.sarakkeita && a.riveja === b.riveja;
    });
  vaadi('pilottilaatasto on tuotannon laattaruudukolla', Boolean(sama),
    'laatta, projektio, arkki tai sarakkeet eroavat — värilaatat osuisivat väärään kohtaan');
  tieto('tuotannon pyramidi', `${luettelo?.versio} (pilotin väriversio ${VARIVERSIO})`);
}

await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  console.log(`\n${lapi}/${kaikki} väitettä läpi — pallo ei avautunut`);
  await ctx.close();
  await selain.close();
  palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(2500);

/** Pelaaja Pariisiin ja saapumisajo (maan laatikko ruutuun). */
const alku = await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  const p = g.player;
  p.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(p);
  window.matkakirja.ui.render();
  return { vaihe: g.phase, kaupunki: g.player?.pos?.city ?? null };
});
tieto('lähtö', JSON.stringify(alku));
await sivu.waitForTimeout(4000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(3000);

/*
 * KEHYSAJAT JATKUVASTA UUDELLEENMAALAUKSESTA, EI KAMERA-AJOSTA.
 *
 * Erän 1 mittaus (luku 5) antoi 59,6 vs. 59,1 fps ja sanoi sen itse
 * ääneen: tasokartan kamera-ajo on CSS-muunnos, joten kumpikin luku
 * oli ruudunpäivityksen katossa eikä mittaus voinut erottaa mitään.
 * Pallolla vastaava ansa on sama: pelkkä `pointOfView`-ajo voi mennä
 * kompositorilla. Tämä pyörittää palloa pituuspiirin suunnassa joka
 * kehyksellä, mikä pakottaa WebGL:n piirtämään koko pinnan uudestaan
 * — ja juuri sen hinnan värilaatat voisivat nostaa.
 */
const kehysajat = (kestoMs = 12000) => sivu.evaluate(async (kesto) => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const alku = pallo.pointOfView();
  const erot = [];
  await new Promise((valmis) => {
    let edellinen = performance.now();
    const alkuhetki = edellinen;
    let i = 0;
    const askel = (nyt) => {
      erot.push(nyt - edellinen);
      edellinen = nyt;
      i += 1;
      // 0,4° kehyksessä: pinta liikkuu, mutta kuva pysyy samassa kohdassa maapalloa.
      pallo.pointOfView({ lat: alku.lat, lng: alku.lng + i * 0.4, altitude: alku.altitude }, 0);
      if (nyt - alkuhetki < kesto) requestAnimationFrame(askel);
      else valmis();
    };
    requestAnimationFrame(askel);
  });
  pallo.pointOfView(alku, 0);
  const jarj = erot.slice(1).sort((a, b) => a - b);
  const q = (o) => Math.round(jarj[Math.min(jarj.length - 1, Math.floor(o * jarj.length))] * 10) / 10;
  return {
    kehyksia: jarj.length,
    p50: q(0.5),
    p95: q(0.95),
    max: Math.round(jarj[jarj.length - 1] * 10) / 10,
    fps: Math.round((1000 / q(0.5)) * 10) / 10,
  };
}, kestoMs);

/** Laattakerroksen mittarit (js/pallolaatat.js). */
const mittarit = () => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null;
  if (!m) return null;
  return {
    tila: m.tila, taso: m.taso, syy: m.syy, laattoja: m.laattoja, scenessa: m.scenessa,
    valmiita: m.valmiita, jumissa: m.jumissa, hapyvia: m.hapyvia,
    nakyvia: m.nakyvia, nakyviaScenessa: m.nakyviaScenessa,
    varillisia: m.varillisia, variMaa: m.variMaa,
    kaytetytTavut: m.kaytetytTavut,
  };
});

/** Odota lepoa: ei jumissa olevia eikä keskeneräisiä latauksia. */
async function odotaLepo(kierroksia = 14) {
  for (let i = 0; i < kierroksia; i += 1) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1500); // eslint-disable-line no-await-in-loop
    const m = await mittarit(); // eslint-disable-line no-await-in-loop
    /*
     * LEPO ON KOLME EHTOA: ei jumissa olevia, kaikki valmiita JA
     * häive perillä. Kesken häivytyksen mitattu pikseli on kahden
     * kartan sekoitus — ja juuri se teki ensimmäisessä ajossa
     * avomeren pisteestä eri värin A:ssa ja B:ssä, vaikka piste on
     * laataston ulkopuolella eikä voi muuttua.
     */
    if (m && m.jumissa === 0 && m.valmiita > 0 && m.valmiita >= m.laattoja
      && m.hapyvia === 0) return m;
  }
  return mittarit();
}

/*
 * PIKSELIN LUKU PALLOLTA. Pisteen ruutupaikka tulee Globe.gl:n omalta
 * `getScreenCoords`ilta — sama matriisi, jolla kirjasto asettaa pallon
 * pinnan ruudulle; oma kaava olisi toinen totuus projektiosta.
 *
 * MEDIAANI 9 × 9 RUUDUSTA: paperin rae ja pigmentti heittelevät
 * yksittäistä pikseliä kymmenen sävyä.
 *
 * JOKAINEN PISTE TARKISTETAAN `elementFromPoint`illa (erän 1 ansa 1:
 * mittauspiste osui saapumiskorttiin ja väite meni läpi myös silloin,
 * kun leikkuri oli rikki). Pallon kangas on karttaruudun lapsi.
 */
/*
 * KAIKKI PALLON KANKAAN ULKOPUOLINEN PIILOON. Sääntö on käänteinen
 * nimettyyn selektorilistaan: näkyviin jää VAIN pallon kangas ja sen
 * esivanhemmat. Nimetty lista ei riitä, koska kortteja on monta lajia
 * ja uusia tulee — ja juuri niin kävi (luku 4.4 ansa 1).
 */
const piilotaPaallikset = () => sivu.evaluate(() => {
  const kangas = document.querySelector('.pallolauta canvas')
    ?? document.querySelector('canvas');
  if (!kangas) return -1;
  const ketju = new Set();
  for (let n = kangas; n; n = n.parentElement) ketju.add(n);
  let n = 0;
  for (const e of document.querySelectorAll('body *')) {
    if (ketju.has(e) || e.contains(kangas)) continue;
    if (e.style.visibility === 'hidden') continue;
    e.style.visibility = 'hidden';
    n += 1;
  }
  return n;
});

/*
 * KUVAKAAPPAUS CDP:LLÄ EIKÄ `page.screenshot`illa. Playwrightin oma
 * kaappaus odottaa `document.fonts.ready`n, ja kartalla se jää
 * odottamaan aikakatkaisuun asti. `Page.captureScreenshot` ottaa kuvan
 * siitä, mitä ruudulla juuri nyt on — ja juuri se on mitattava asia.
 */
async function kaappaa() {
  const cdp = await ctx.newCDPSession(sivu);
  return Buffer.from(
    (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
  );
}

async function mittaaPisteet(ryhma) {
  const kohde = KAMERAT[ryhma];
  await sivu.evaluate(async (b2) => {
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ bbox: b2 }, { kesto: 0, pakota: true });
  }, laatikkoAsteista(kohde));
  await sivu.waitForTimeout(2000);
  const m = await odotaLepo();
  tieto(`kamera ${ryhma}`, `${kohde.seloste} · taso z${m?.taso} · scenessä ${m?.scenessa}`
    + ` · värillisiä ${m?.varillisia} · jumissa ${m?.jumissa}`);
  /*
   * KAIKKI PALLON KANKAAN ULKOPUOLINEN PIILOON MITTAUKSEN AJAKSI.
   *
   * Erän 1 ansa 1 toistui heti ensimmäisessä ajossa: Pariisin
   * saapumiskortin valokuva peitti ruudun keskikolmanneksen, ja
   * Keski-Ranskan piste luki sen harmaata (133,120,112). Nimetty
   * lista selektoreita ei riitä — kortteja on monta lajia ja uusia
   * tulee — joten sääntö on käänteinen: näkyviin jää VAIN pallon
   * kangas ja sen esivanhemmat.
   *
   * `visibility` EIKÄ `display`: asettelu ei muutu, joten kotelo
   * pysyy samankokoisena eikä kamera siirry kesken mittauksen.
   */
  const piilotettuja = await piilotaPaallikset();
  tieto('mittauksen ajaksi piiloon', `${piilotettuja} elementtiä`);
  await sivu.waitForTimeout(600);
  const kuva = await kaappaa();
  const tulos = await sivu.evaluate(async ({ png, pisteet }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const pallo = window.matkakirja.ui.pallolauta.pallo;
    const dpr = img.width / window.innerWidth;
    const ulos = [];
    for (const p of pisteet) {
      const s = pallo.getScreenCoords(p.lat, p.lon, 0);
      if (!s || !Number.isFinite(s.x)) { ulos.push({ ...p, ruudulla: false, syy: 'ei ruutupaikkaa' }); continue; }
      const x = Math.round(s.x * dpr);
      const y = Math.round(s.y * dpr);
      if (x < 6 || y < 6 || x >= img.width - 6 || y >= img.height - 6) {
        ulos.push({ ...p, ruudulla: false, syy: 'ruudun ulkopuolella' });
        continue;
      }
      /*
       * VAIN PALLON KANGAS KELPAA. Ehto oli aluksi väljempi ("jokin
       * karttakuoren sisällä"), ja saapumiskortti menisi siitä läpi,
       * koska se on kuoren lapsi. Kangas on ainoa elementti, jossa
       * pallon pikselit ovat.
       */
      const osuma = document.elementFromPoint(s.x, s.y);
      const kartalla = osuma && osuma.tagName === 'CANVAS';
      if (!kartalla) {
        const ketju = [];
        for (let n = osuma; n && n !== document.body && ketju.length < 4; n = n.parentElement) {
          ketju.push(`${n.tagName.toLowerCase()}.${n.className || ''}`);
        }
        ulos.push({ ...p, ruudulla: false, syy: `päällä ${ketju.join(' < ') || 'ei mitään'}` });
        continue;
      }
      /*
       * MEDIAANI 5 × 5 EIKÄ 9 × 9. Rae ja pigmentti heittelevät
       * yksittäistä pikseliä kymmenen sävyä, joten mediaani on pakko —
       * mutta 9 × 9 laitepikseliä on dpr 3:lla kolme css-pikseliä
       * kumpaankin suuntaan, ja 12 mpk:n kaistaleen mittauksessa se
       * ulottui rantaviivan yli. 5 × 5 riittää raetta vastaan.
       */
      const kanavat = [[], [], []];
      for (let dy = -2; dy <= 2; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const d = g.getImageData(x + dx, y + dy, 1, 1).data;
          kanavat[0].push(d[0]); kanavat[1].push(d[1]); kanavat[2].push(d[2]);
        }
      }
      const med = kanavat.map((k) => k.sort((a, b) => a - b)[Math.floor(k.length / 2)]);
      /*
       * RELIEFIKONTRASTI = 9 × 9 RUUDUN KESKIHAJONTA (erä 1c, V3).
       *
       * Omistajan *"Poistetaan muista maista korkeus erot"* on
       * kontrastiväite, ei kirkkausväite: kerma-peitto jättää läpi
       * (1 − peitto) osuuden alkuperäisestä, joten reliefin
       * vaihtelu kutistuu samassa suhteessa. Keskihajonta mittaa
       * juuri sitä ja on immuuni sille, mihin suuntaan keskisävy
       * siirtyy. Ruutu on 9 × 9 LAITEpikseliä (dpr 3:lla kolme
       * css-pikseliä), eli isompi kuin mediaanin 5 × 5: kontrasti
       * tarvitsee vaihtelua nähdäkseen, mediaani ei.
       */
      const lumat = [];
      for (let dy = -4; dy <= 4; dy += 1) {
        for (let dx = -4; dx <= 4; dx += 1) {
          const d = g.getImageData(x + dx, y + dy, 1, 1).data;
          lumat.push((d[0] + d[1] + d[2]) / 3);
        }
      }
      const ka = lumat.reduce((a2, b2) => a2 + b2, 0) / lumat.length;
      const hajonta = Math.sqrt(
        lumat.reduce((a2, b2) => a2 + (b2 - ka) ** 2, 0) / lumat.length,
      );
      ulos.push({
        ...p, ruudulla: true, x, y, r: med[0], g: med[1], b: med[2], hajonta,
      });
    }
    return ulos;
  }, { png: kuva.toString('base64'), pisteet: PISTEET.filter((p) => p.ryhma === ryhma) });
  /*
   * LEIKKAUSPROFIILI RANNIKON POIKKI (vain tuloste, ei väite).
   *
   * Yksi pikseli ei kerro, MISSÄ 12 mpk:n kaistale on — ja juuri sen
   * tietämättä mittauspiste osui ensimmäisessä ajossa rantaviivaan ja
   * luki murrettua maata siniseksi luullun veden sijaan. Profiili
   * tulostaa sävyn asteen kahdeskymmenesosan välein rannikon poikki,
   * jolloin kaistaleen reunat NÄKYVÄT luvuissa eikä niitä tarvitse
   * arvata.
   */
  /*
   * RANSKAN VERTAILUALA SAMASTA KUVAKAAPPAUKSESTA (V2). Palautetaan
   * raakapikselit base64:nä, jotta A ja B voidaan verrata Nodessa
   * tavu tavulta — sivulla ei ole molempia vaiheita yhtä aikaa.
   */
  let ranskanAla = null;
  if (ryhma === 'maa') {
    ranskanAla = await sivu.evaluate(async ({ png, ala }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const pallo = window.matkakirja.ui.pallolauta.pallo;
      const dpr = img.width / window.innerWidth;
      const nurkat = [
        pallo.getScreenCoords(ala.lat1, ala.lon0, 0),
        pallo.getScreenCoords(ala.lat0, ala.lon1, 0),
      ];
      if (nurkat.some((n2) => !n2 || !Number.isFinite(n2.x))) return { ok: false, syy: 'ei ruutupaikkaa' };
      const x0 = Math.round(Math.min(nurkat[0].x, nurkat[1].x) * dpr);
      const x1 = Math.round(Math.max(nurkat[0].x, nurkat[1].x) * dpr);
      const y0 = Math.round(Math.min(nurkat[0].y, nurkat[1].y) * dpr);
      const y1 = Math.round(Math.max(nurkat[0].y, nurkat[1].y) * dpr);
      if (x0 < 0 || y0 < 0 || x1 > img.width || y1 > img.height || x1 - x0 < 20 || y1 - y0 < 20) {
        return { ok: false, syy: `ala ruudun ulkopuolella (${x0},${y0})..(${x1},${y1})` };
      }
      const d = g.getImageData(x0, y0, x1 - x0, y1 - y0);
      let bin = '';
      for (let i = 0; i < d.data.length; i += 1) bin += String.fromCharCode(d.data[i]);
      return {
        ok: true, x0, y0, w: x1 - x0, h: y1 - y0, data: btoa(bin),
      };
    }, { png: kuva.toString('base64'), ala: RANSKAN_ALA });
    tieto('Ranskan vertailuala', ranskanAla.ok
      ? `${ranskanAla.w} x ${ranskanAla.h} laitepikseliä (${RANSKAN_ALA.seloste})`
      : `EI MITATTAVISSA: ${ranskanAla.syy}`);
  }
  if (kohde.profiili) {
    const profiili = await sivu.evaluate(async ({ png, lon, lat0, lat1, n }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0);
      const pallo = window.matkakirja.ui.pallolauta.pallo;
      const dpr = img.width / window.innerWidth;
      const ulos = [];
      for (let i = 0; i < n; i += 1) {
        const lat = lat1 + ((lat0 - lat1) * i) / (n - 1);
        const sp = pallo.getScreenCoords(lat, lon, 0);
        const x = Math.round(sp.x * dpr);
        const y = Math.round(sp.y * dpr);
        if (x < 1 || y < 1 || x >= img.width - 1 || y >= img.height - 1) { ulos.push(`${lat.toFixed(2)}:—`); continue; }
        const d = g.getImageData(x, y, 1, 1).data;
        ulos.push(`${lat.toFixed(2)}:${d[0]},${d[1]},${d[2]}`);
      }
      return ulos;
    }, { png: kuva.toString('base64'), ...kohde.profiili });
    tieto(`profiili ${String(kohde.profiili.lon).replace('.', ',')} E (lat:rgb)`, profiili.join('  '));
  }
  return { kuva, mittaukset: tulos, mitat: m, ranskanAla };
}

/* ---------------- kaksi vaihetta samalla koodipolulla ------------- */

/*
 * A JA B AJETAAN TÄSMÄLLEEN SAMALLA POLULLA, ja se on mittauksen ehto.
 * Ensimmäisessä yrityksessä A mitattiin ensimmäiseltä latauksesta ja B
 * uudelleenlatauksen jälkeen — kamera ja laattojen lataustila eivät
 * silloin olleet samat, ja `scenessa` erosi 18 vs. 34 ilman että väri
 * lisäsi yhtään verkkoa. Nyt kumpikin vaihe tekee saman: lataa sivun,
 * siirtää nappulan Pariisiin, ajaa saapumisen, odottaa levon ja
 * mittaa. Ero vaiheiden välillä on VAIN luettelon `varitasot`-taulu.
 */
async function vaihe(vari, tunnus) {
  variPaalla = vari;
  await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
    const p = g.player;
    p.pos = { type: 'city', city: 'pariisi' };
    g.visitCity(p);
    window.matkakirja.ui.render();
  });
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
  await sivu.waitForTimeout(3000);
  const mitat = await odotaLepo();
  const pov = await sivu.evaluate(() => {
    const p = window.matkakirja.ui.pallolauta.pallo.pointOfView();
    return { lat: Number(p.lat.toFixed(3)), lng: Number(p.lng.toFixed(3)), alt: Number(p.altitude.toFixed(4)) };
  });
  tieto(`${tunnus} mittarit (saapumisnäkymä)`, JSON.stringify(mitat));
  tieto(`${tunnus} kamera (saapumisnäkymä)`, JSON.stringify(pov));
  const kehykset = await kehysajat();
  tieto(`${tunnus} kehysajat (pallon pyöritys)`, JSON.stringify(kehykset));
  /*
   * SAAPUMISNÄKYMÄN KUVA ON SE, JOTA OMISTAJA KATSOO. Mittauskamerat
   * ovat lähempänä (ohut aluevesikaistale on saatava mitattavaksi),
   * mutta valinta paletin voimakkuudesta tehdään siitä näkymästä,
   * johon peli saapuu — koko maa ruudussa kehä ja kaistale mukaan
   * lukien.
   */
  await piilotaPaallikset();
  await sivu.waitForTimeout(600);
  const saapumiskuva = await kaappaa();
  const maa = await mittaaPisteet('maa');
  const meri = await mittaaPisteet('meri');
  return {
    mitat,
    pov,
    kehykset,
    ranskanAla: maa.ranskanAla,
    maamitat: maa.mitat,
    merimitat: meri.mitat,
    saapumiskuva,
    kuva: maa.kuva,
    merikuva: meri.kuva,
    mittaukset: [...maa.mittaukset, ...meri.mittaukset],
  };
}

const A = VAIN_KUVAT ? null : await vaihe(false, 'A (ilman tasoitusta)');
const B = await vaihe(true, 'B (tasoitettuna)');
const mA = A?.mitat ?? null;
const mB = B.mitat;

if (KUVAT) {
  mkdirSync(KUVAT, { recursive: true });
  if (A) {
    writeFileSync(join(KUVAT, `tasoitus-pallo-${NIMI}-ilman-tasoitusta.png`), A.kuva);
    writeFileSync(join(KUVAT, `tasoitus-pallo-${NIMI}-saapuminen-ilman-tasoitusta.png`), A.saapumiskuva);
  }
  writeFileSync(join(KUVAT, `tasoitus-pallo-${NIMI}.png`), B.kuva);
  writeFileSync(join(KUVAT, `tasoitus-pallo-${NIMI}-saapuminen.png`), B.saapumiskuva);
  writeFileSync(join(KUVAT, `tasoitus-pallo-${NIMI}-meri.png`), B.merikuva);
  tieto('kuvat', join(KUVAT, `tasoitus-pallo-${NIMI}*.png`));
}

if (VAIN_KUVAT) {
  console.log(`\nVAIN KUVAT: väitteitä ei ajettu. Parametrit `
    + `paletti ${VARITASOT.FRA.paletti} · peitto ${PEITTO} · kerma ${KERMA}.`);
  await ctx.close();
  await selain.close();
  palvelin.close();
  process.exit(0);
}

/* ---------------- erä 2: uloszoomauksen esto ---------------------- */

/**
 * Kameran etäisyys ja ohjaimen katto. `maxDistance` on se luku, jonka
 * uloszoomauksen esto asettaa (js/pallolauta/lauta.js
 * tahdistaZoomirajat), ja `etaisyys` on se, minne kamera pääsee kun
 * sitä työnnetään laudan omaan kattoon.
 */
const zoomitila = () => sivu.evaluate(() => {
  const lauta = window.matkakirja.ui.pallolauta;
  const pallo = lauta.pallo;
  const ohj = pallo.controls();
  const sade = pallo.getGlobeRadius();
  return {
    sade,
    maxDistance: ohj.maxDistance,
    maxKorkeus: ohj.maxDistance / sade - 1,
    korkeus: pallo.pointOfView().altitude,
  };
});

/**
 * Työnnä kamera niin kauas kuin ohjain sallii: pyydetään laudan omaa
 * kattoa (2,5) ja katsotaan, mihin kamera todella jää. Tämä mittaa
 * SAMAA polkua kuin sormi ja rulla (OrbitControls), ei kamera-ajoa.
 */
const tyonnaUlos = () => sivu.evaluate(async () => {
  const lauta = window.matkakirja.ui.pallolauta;
  const pallo = lauta.pallo;
  const ohj = pallo.controls();
  const sade = pallo.getGlobeRadius();
  const pov = pallo.pointOfView();
  // Kamera suoraan kauas: ohjaimen oma rajoitin leikkaa liikkeen.
  pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: 2.5 }, 0);
  ohj.update?.();
  await new Promise((ok) => requestAnimationFrame(() => ok()));
  const etaisyys = ohj.object?.position?.length?.() ?? null;
  return {
    korkeus: pallo.pointOfView().altitude,
    etaisyysKorkeutena: etaisyys === null ? null : etaisyys / sade - 1,
    maxKorkeus: ohj.maxDistance / sade - 1,
  };
});

const zoomFra = await zoomitila();
const ulosFra = await tyonnaUlos();
tieto('FRA zoomiraja', JSON.stringify({ ...zoomFra, ...ulosFra }));

/* Venäjä: laatikko ei mahdu saapumisrajaukseen → rajaa ei aseteta. */
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  const p = g.player;
  p.pos = { type: 'city', city: 'moskova' };
  g.visitCity(p);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(3000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(2500);
const zoomRus = await zoomitila();
tieto('RUS zoomiraja', JSON.stringify(zoomRus));

/* ---------------- väitteet ---------------------------------------- */

const kirkkaus = (p) => (p.r + p.g + p.b) / 3;
const lampo = (p) => p.r - p.b;
const parit = PISTEET.map((p) => ({
  ...p,
  a: A.mittaukset.find((m) => m.avain === p.avain),
  b: B.mittaukset.find((m) => m.avain === p.avain),
}));

console.log('\n--- MITATUT PIKSELIT (A = ilman tasoitusta, B = tasoitettuna; σ = 9 × 9 keskihajonta) ---');
for (const p of parit) {
  const kuvaa = (m) => (m?.ruudulla
    ? `rgb(${m.r},${m.g},${m.b})σ${m.hajonta?.toFixed(1) ?? '–'}` : `EI KARTALLA (${m?.syy})`);
  console.log(`  ${p.avain.padEnd(9)} A ${kuvaa(p.a).padEnd(26)} B ${kuvaa(p.b).padEnd(26)} `
    + `${p.a?.ruudulla && p.b?.ruudulla
      ? `ΔL ${(kirkkaus(p.b) - kirkkaus(p.a)).toFixed(1)} Δσ ${(p.b.hajonta - p.a.hajonta).toFixed(2)}`
      : ''} — ${p.seloste}`);
}
console.log(`\n  A: taso z${mA?.taso} · laattoja ${mA?.laattoja} · scenessä ${mA?.scenessa} `
  + `· tavuja ${mA?.kaytetytTavut} · syy "${mA?.syy}"`);
console.log(`  B: taso z${mB?.taso} · laattoja ${mB?.laattoja} · scenessä ${mB?.scenessa} `
  + `· tavuja ${mB?.kaytetytTavut} · tasoitettuja ${mB?.varillisia} · maa ${mB?.variMaa} `
  + `· syy "${mB?.syy}"`);

console.log('\n--- VÄITTEET ---');
const molemmat = (p) => p.a?.ruudulla && p.b?.ruudulla;

vaadi('V0 tasoituskerros on pallolla ja se on Ranskan',
  mB?.varillisia > 0 && mB?.variMaa === 'FRA',
  `varillisia ${mB?.varillisia}, variMaa ${mB?.variMaa}`);

vaadi('V1 versioportti ei sammuttanut laattakerrosta (syy tyhjä)',
  mB?.tila === 'nakyy' && !mB?.syy,
  `tila ${mB?.tila}, syy "${mB?.syy}"`);

/*
 * ====== V2: RANSKAN SISÄLTÄ A JA B OVAT IDENTTISET =================
 *
 * TÄMÄ ON PÄÄTÖS 4 MITTARINA. Tasoituslaatan alfa on kohdemaan
 * renkaiden sisällä 0, ja alfa 0 tarkoittaa `drawImage`ssa, ettei
 * yhtään kanavaa muutu. Väite on siis ANKARA eikä haarukka: jokaisen
 * vertailualan laitepikselin on oltava tavulleen sama.
 *
 * MIKSI TAVULLEEN EIKÄ TOLERANSSILLA. Kumpikin vaihe piirtää samat
 * tekstuurit samalta kameralta (`pakota: true`), ja laatat ovat
 * ämpäristä eli tavulleen samat kuvat. Toleranssi peittäisi juuri sen
 * virheen, jota etsitään: kerman vuotaminen kohdemaan sisään olisi
 * muutaman yksikön siirtymä, ei räikeä ero. Vastakoe
 * (`--ilman-rajausta`) näyttää, ettei väite mittaa pelkkää
 * kuvakaappausten samuutta.
 */
const alaA = A.ranskanAla;
const alaB = B.ranskanAla;
let ranskaTulos = { ok: false, seloste: 'alaa ei mitattu' };
if (alaA?.ok && alaB?.ok) {
  if (alaA.w !== alaB.w || alaA.h !== alaB.h || alaA.x0 !== alaB.x0 || alaA.y0 !== alaB.y0) {
    ranskaTulos = {
      ok: false,
      seloste: `ala eri kohdassa: A ${alaA.w}x${alaA.h}@${alaA.x0},${alaA.y0} `
        + `vs. B ${alaB.w}x${alaB.h}@${alaB.x0},${alaB.y0} — kamerat eivät ole samat`,
    };
  } else {
    const a = Buffer.from(alaA.data, 'base64');
    const b = Buffer.from(alaB.data, 'base64');
    let eroavia = 0;
    let pahin = 0;
    for (let i = 0; i < a.length; i += 1) {
      const d = Math.abs(a[i] - b[i]);
      if (d) { eroavia += 1; if (d > pahin) pahin = d; }
    }
    const pikseleita = alaA.w * alaA.h;
    ranskaTulos = {
      ok: eroavia === 0,
      eroavia,
      pahin,
      pikseleita,
      seloste: `${alaA.w} x ${alaA.h} = ${pikseleita} pikseliä (${a.length} tavua): `
        + `eroavia tavuja ${eroavia} (${((100 * eroavia) / a.length).toFixed(4)} %), pahin ero ${pahin}`,
    };
  }
}
vaadi('V2 Ranskan sisältä A ja B ovat pikselilleen identtiset (kohdemaa alkuperäinen)',
  ranskaTulos.ok, ranskaTulos.seloste);

/*
 * V3: BELGIA VAALENI JA SEN RELIEFIKONTRASTI PIENENI.
 *
 * KAKSI EHTOA, KOSKA YKSI EI RIITÄ. Kirkkaus yksinään kertoisi vain,
 * että pikselin päälle tuli jotain vaaleaa; keskihajonta kertoo, että
 * KORKEUSEROT katosivat — ja juuri se on omistajan lause *"Poistetaan
 * muista maista korkeus erot kokonaan tai lähes kokonaan"*.
 *
 * ODOTUSARVO ON LASKETTAVISSA: B = (1 − peitto)·A + peitto·kerma,
 * joten hajonnan pitäisi kutistua kertoimella (1 − peitto). Väite ei
 * vaadi tarkkaa kerrointa — mittauspiste on häiveen sisällä, jossa
 * peitto on nimellistä pienempi (erän 1b luku 7.2) — vaan suunnan:
 * selvästi vaaleampi ja selvästi tasaisempi.
 *
 * ERÄN 1b LÖYDÖS ON TÄSSÄ KORJATTU. Belgian alanko on seepiakartalla
 * rgb(246,243,204) eli JO paperia vaaleampi, ja siksi erässä 1b
 * paperinsävyinen feidaus TUMMENSI sitä kaksi yksikköä. Kerma
 * (250,244,214) on sitäkin vaaleampi, joten vaaleneminen on nyt
 * mitattavissa myös tasaisella alangolla.
 */
const belgia = parit.find((p) => p.avain === 'belgia');
const VAALENEMINEN_MIN = 3;
const belgiaKirkkaammaksi = molemmat(belgia)
  && kirkkaus(belgia.b) > kirkkaus(belgia.a) + VAALENEMINEN_MIN;
const belgiaTasaisemmaksi = molemmat(belgia)
  && Number.isFinite(belgia.a.hajonta) && Number.isFinite(belgia.b.hajonta)
  && belgia.b.hajonta < belgia.a.hajonta;
vaadi('V3 Belgian puoli vaaleni ja sen reliefikontrasti pieneni',
  belgiaKirkkaammaksi && belgiaTasaisemmaksi,
  molemmat(belgia)
    ? `A rgb(${belgia.a.r},${belgia.a.g},${belgia.a.b}) L ${kirkkaus(belgia.a).toFixed(1)} `
      + `hajonta ${belgia.a.hajonta?.toFixed(2)} → `
      + `B rgb(${belgia.b.r},${belgia.b.g},${belgia.b.b}) L ${kirkkaus(belgia.b).toFixed(1)} `
      + `hajonta ${belgia.b.hajonta?.toFixed(2)} `
      + `(odotus peitolla ${PEITTO}: rgb(${[0, 1, 2].map((i) => Math.round((1 - PEITTO) * [belgia.a.r, belgia.a.g, belgia.a.b][i] + PEITTO * KERMA_RGB[i])).join(',')}))`
    : `piste ei kartalla: ${belgia.a?.syy ?? belgia.b?.syy}`);

/*
 * V4 JA V5 OVAT SAMA VÄITE KAHDESTA KOHDASTA, ja se on tarkoitus.
 * Päätös 4: *"Aluevesien sininen ei kuulu alkuperäiseen — ei sinistä
 * ilman omistajan erillista sanaa."* Tasoitusajossa leikkurin puskuri
 * on siksi 0, ja 12 mpk:n kaistale saa saman kerman kuin avomeri. V5
 * vaatii nimenomaan, ETTEI kaistale sinerry (b ei nouse r:n yli) —
 * erän 1b V4 vaati päinvastaista, ja se on se päätös, joka kumottiin.
 */
const avomeri = parit.find((p) => p.avain === 'avomeri');
vaadi('V4 avomeri vaaleni kermaa kohti',
  molemmat(avomeri) && kirkkaus(avomeri.b) > kirkkaus(avomeri.a) + VAALENEMINEN_MIN,
  molemmat(avomeri)
    ? `A rgb(${avomeri.a.r},${avomeri.a.g},${avomeri.a.b}) → B rgb(${avomeri.b.r},${avomeri.b.g},${avomeri.b.b}), `
      + `ΔL ${(kirkkaus(avomeri.b) - kirkkaus(avomeri.a)).toFixed(1)}`
    : `piste ei kartalla: ${avomeri.a?.syy ?? avomeri.b?.syy}`);

const aluevesi = parit.find((p) => p.avain === 'aluevesi');
vaadi('V5 aluevesi (12 mpk) tasoittui avomeren tavoin eikä sinertynyt',
  molemmat(aluevesi)
    && kirkkaus(aluevesi.b) > kirkkaus(aluevesi.a) + VAALENEMINEN_MIN
    && aluevesi.b.r > aluevesi.b.b,
  molemmat(aluevesi)
    ? `A rgb(${aluevesi.a.r},${aluevesi.a.g},${aluevesi.a.b}) → B rgb(${aluevesi.b.r},${aluevesi.b.g},${aluevesi.b.b}), `
      + `ΔL ${(kirkkaus(aluevesi.b) - kirkkaus(aluevesi.a)).toFixed(1)}, r−b ${lampo(aluevesi.b)}`
    : `piste ei kartalla: ${aluevesi.a?.syy ?? aluevesi.b?.syy}`);

/*
 * V6 MITATAAN KIINTEÄLTÄ KAMERALTA, EI SAAPUMISNÄKYMÄSTÄ (erän 1b
 * ansa 2): `scenessa` laskee mukaan LRU:n pitämät edellisen näkymän
 * laatat, joten kahden näkymän vertailu ei kerro kerroksesta mitään.
 * `nakyvia` on näkyvän alueen laattamäärä samalta kameralta, ja koska
 * tasoituskerros piirtyy SAMAAN kankaaseen, sen on oltava täsmälleen
 * sama.
 */
const mMaaA = A.maamitat;
const mMaaB = B.maamitat;
const tavutPerLaatta = (m) => (m?.laattoja > 0 ? m.kaytetytTavut / m.laattoja : 0);
vaadi('V6 tasoitus ei lisää laattoja eikä tekstuurimuistia (sama kamera)',
  mMaaA?.nakyvia > 0 && mMaaB?.nakyvia === mMaaA.nakyvia
    && Math.abs(tavutPerLaatta(mMaaB) - tavutPerLaatta(mMaaA)) < 1,
  `nakyvia A ${mMaaA?.nakyvia} → B ${mMaaB?.nakyvia}; `
  + `tavuja/laatta A ${Math.round(tavutPerLaatta(mMaaA))} → B ${Math.round(tavutPerLaatta(mMaaB))}`);

/*
 * V7: raja on laatikko × 1,15, ja se on selvästi laudan oman katon
 * (PALLO_KORKEUS_MAX 2,5) alla. Kamera ei saa päästä sen yli, vaikka
 * sitä työnnetään suoraan kattoon.
 */
vaadi('V7 uloszoomaus pysähtyy Ranskassa laatikon rajaan',
  zoomFra.maxKorkeus > 0 && zoomFra.maxKorkeus < 2.4
    && ulosFra.korkeus <= zoomFra.maxKorkeus + 0.02,
  `maxKorkeus ${zoomFra.maxKorkeus?.toFixed(3)}, ulos ${ulosFra.korkeus?.toFixed(3)}`);

vaadi('V8 Venäjässä rajaa ei aseteta (kamera ei lukkiudu)',
  zoomRus.maxKorkeus > 2.4,
  `RUS maxKorkeus ${zoomRus.maxKorkeus?.toFixed(3)}`);

console.log(`\n  kehysajat (pallon pyöritys, ${RUUTU.w} × ${RUUTU.h} dpr ${RUUTU.puhelin ? 3 : 2}):`);
console.log(`    A ilman tasoitusta p50 ${A.kehykset?.p50} ms · p95 ${A.kehykset?.p95} ms `
  + `· max ${A.kehykset?.max} ms · ${A.kehykset?.fps} fps (${A.kehykset?.kehyksia} kehystä)`);
console.log(`    B tasoitettuna     p50 ${B.kehykset?.p50} ms · p95 ${B.kehykset?.p95} ms `
  + `· max ${B.kehykset?.max} ms · ${B.kehykset?.fps} fps (${B.kehykset?.kehyksia} kehystä)`);

if (virheet.length) console.log(`\nSIVUVIRHEET: ${virheet.slice(0, 4).join(' | ')}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
