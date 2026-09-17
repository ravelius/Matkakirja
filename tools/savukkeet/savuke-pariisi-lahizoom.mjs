/*
 * Savuke: PARIISIN LÄHIZOOMI — nimiön ruutupikselikatto, rykelmän
 * näkyvyys ja luentakuvapakan piilotus.
 *
 * OMISTAJA 16.9.2026 klo 16.05 UTC (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 31, iPhone-kuva Pariisista lähizoomilla), sanatarkasti:
 * *"Piilotetaan nuo kuvat kartalta toistaiseksi. Täytyy miettiä niille
 * joku parempi paikka. Mutta miksi tuolla Pariisin alueella ei näy
 * niitä nostoja, enkä pysty noitakaan klikkaamaan?"* — ja korjaus
 * samana päivänä: *"pystyn kyllä noita näkyviä nostoja klikkaamaan,
 * mutta ilmeisesti iso osa nostoista on jossain piilossa."*
 *
 * ── MITÄ TÄMÄ MITTAA, JA MIKSI JUURI SEN ──────────────────────────
 *
 * Vika ei ollut yksi vaan kolme, ja kaikki kolme näkyvät vasta
 * PUHELIMEN SISIMMÄLLÄ zoomilla — siinä, mihin uloszoomauksen esto
 * (js/pallolauta/lauta.js maanZoomiraja) päästää pelaajan, kun hän
 * nipistää Pariisiin niin lähelle kuin peli sallii (mitattu 390 × 844:
 * osuus 0,341 uloimmasta). Savuke ajaa kameran sinne asti ja mittaa
 * vasta siellä: välitasolla mikään näistä ei vielä riko mitään.
 * Työpöydällä zoomataan SAMAAN karttamittaan eikä pohjaan asti (ks.
 * LAHIZOOMIN_TAVOITE), jotta molemmat ruudut mittaavat samaa ilmiötä.
 *
 * ── VARTIOT (390 × 844 ja 1400 × 900, dpr 2) ──────────────────────
 *
 *   1.  NIMIÖ EI KASVA YLI KATON. Jokaisen kartalla olevan noston ja
 *       kaupunkimerkin nimiön kirjasinkoko RUUDULLA on lähizoomissa
 *       enintään NIMION_KATTO_PX (js/pallolauta/nostot.js
 *       NOSTON_NIMIO_KATTO_PX). Koko luetaan siitä `scale()`-
 *       muunnoksesta, jonka kerros oikeasti kirjoittaa, kerrottuna
 *       nimiön kirjasinkoolla (NOSTOSYM_NIMIO_KOKO).
 *   1b. VASTAKOE: sama kerroin ilman kattoa antaisi yli
 *       VASTAKOKEEN_RAJA_PX:n nimiön. Ilman tätä vartio 1 menisi läpi
 *       myös silloin, jos kartta ei olisi zoomannut lainkaan.
 *   1c. SAAPUMISNÄKYMÄSSÄ NIMIÖ EI OLE KUTISTUNUT. Kaupunkimerkin
 *       nimiö on saapuessa vähintään SAAPUMISEN_VAHIN_PX (PAATOKSET
 *       25 kohta 2: *"Isommaksi, n. 11-12 px"*) — katto ei siis saa
 *       purra siellä, missä mitään ei ollut vikana.
 *   2.  NIMIÖ MAHTUU RUUDULLE. Yhdenkään kartalla olevan noston
 *       nimiölaatikko ei leikkaudu kotelon laidasta lähizoomissa.
 *   3.  PARIISIN RYKELMÄSTÄ EI KATOA YKSIKÄÄN NOSTO. Jokainen
 *       PARIISIN_NOSTOT-rivi on lähizoomissa joko oma elävä merkkinsä
 *       (DOM + osumalaatikko), aihemerkin jäsen tai laattaan poltettua
 *       mustetta (jolla ei OLE DOM-elementtiä mutta joka on ruudulla
 *       ja osumalistalla) — mikään näistä kolmesta ei tarkoita
 *       piilossa olevaa sisältöä, mutta neljäs vaihtoehto tarkoittaa.
 *   3b. RYKELMÄ ON YHÄ RYKELMÄ, JOTEN AIHEMERKKEJÄ ON. Ryhmitys
 *       seuraa limitystä eikä zoomiporrasta (PAATOKSET 27 kohta 3),
 *       ja Pariisin nostojen LYHIN keskinäinen ruutuväli on
 *       sisimmälläkin zoomilla 39,2 px eli alle sormen 44 px:n
 *       (mitattu 16.9.2026) — aihemerkkejä on siis oltava vähintään
 *       AIHEMERKKEJA_VAHINTAAN.
 *   3d. AIHENOSTOJA ON TÄSMÄLLEEN NIIN MONTA KUIN PARIISISSA ON
 *       AIHEITA, JOILLA ON ≥ 2 NOSTOA (PAATOKSET 27 TARKENNUS 2
 *       kohta 7, omistaja 16.9.2026 klo 19.00 UTC: saman kaupungin
 *       saman aiheen nostot yhdistetään AINA *"zoomista riippumatta -
 *       ei vain limityksen perusteella"*). Odotus lasketaan RUUDULLA
 *       olevista Pariisin nostoista eikä kirjoiteta vakioksi: joukko
 *       riippuu siitä, mitkä nostot ovat poltettuja. Mitataan sekä
 *       saapumisnäkymässä että lähizoomissa — sääntö ei saa riippua
 *       zoomista.
 *   3e. JOKAISELLA AIHENOSTOLLA ON NIMIÖ MUOTOA "Nimi…" (kohta 8:
 *       *"tarkeimman noston nimella ja laittaa loppuun vain kolme
 *       pistetta"*), ja nimiön runko on ryhmän ensimmäisen jäsenen
 *       nimen alkuosa. Tärkein on paketin ensimmäinen LADONNASSA
 *       (js/pallolauta/nostot.js `ladontaNro`), ei ruudulla, joten
 *       nimi on sama saapumisnäkymässä ja lähizoomissa. Lukumäärää ei
 *       ole (3e2: `.pallolauta-aihemerkki-luku` on 0 kappaletta).
 *   3e3. OMISTAJAN OMA ESIMERKKI: Pariisin skandaalirykelmän
 *       aihenoston nimiö on *"Mona Lisan varkaus…"* — sanatarkasti se
 *       nimi, jonka omistaja kirjoitti tarkennukseen.
 *   3f. YKSINÄINEN SAMAN AIHEEN NOSTO PYSYY OMANA NOSTONAAN ja
 *       MAASTOKOHDE EI YHDISTY (kohdat 9 ja 6): yhdenkään aihenoston
 *       jäsenenä ei ole maastokohdetta, ja aihe, jolla on Pariisissa
 *       vain yksi nosto, ei saa aihenostoa.
 *   3e4. NIMIÖ MYÖS NÄKYY LÄHIZOOMISSA: sovittelun viimeinen keino on
 *       lapun piilotus, eikä yhdenkään Pariisin aihenoston nimiö saa
 *       joutua sinne siinä näkymässä, josta päätös tehtiin.
 *   3i. NIMIÖ VAIN LÄHIZOOMISSA (PAATOKSET 27 TARKENNUS 4 kohta 10,
 *       omistaja 17.9.2026 klo 04.15 UTC, kortti *"Nimiö vain
 *       lähizoomissa"*): koko maan SAAPUMISNÄKYMÄSSÄ yhdelläkään
 *       aihenostolla ei ole nimiötä — se on pelkkä symboli — ja
 *       LÄHIZOOMISSA nimiö on jokaisella, kuten ennen. Mitataan
 *       kahdesta lähteestä: kerroksen `nimioNakyy` ja elementin oma
 *       `data-nimio` (aihenimioitaDom).
 *   3i2. VASTAKOE `?aihenimiokynnys=0`: kun kynnys otetaan pois,
 *       nimiöt palaavat saapumisnäkymään (v1927:n tila) — vartio 3i
 *       mittaa siis kynnystä eikä sitä, ettei nimiöitä ole lainkaan.
 *   3h. AIHENOSTOT EIVÄT PEITÄ TOISIAAN LÄHIZOOMISSA enempää kuin
 *       AIHENOSTOJEN_LIMITYSKATTO sallii — ryhmitys ei saa vain
 *       siirtää rykelmän ongelmaa merkkitasolle. Saapumisnäkymän luvut
 *       ovat INFOna (koko Ranska 390 px:ssä).
 *   3g. VASTAKOE `?aihekaupunki=0`: kun kaupungin AINA-yhdistys
 *       otetaan pois, aihenostojen määrä EI enää vastaa aiheiden
 *       määrää — lähizoomissa rykelmä hajoaa ja luku on liian pieni.
 *       Lippu käännetään ilman uutta sivunlatausta
 *       (history.replaceState + uusi ladonta), joten vastakoe mittaa
 *       täsmälleen samaa näkymää kuin vartio 3d.
 *   3c. VASTAKOE `?aihemerkit=0`: ilman ryhmitystä rykelmän nimiöt
 *       menevät SAAPUMISNÄKYMÄSSÄ toistensa päälle (PAATOKSET 27:n
 *       oma limitysmittari; lähizoomin luvut INFOna, koska siellä
 *       ruutupikselikatto jo riittää). Vartio 3b mittaa siis
 *       ryhmityksen ansiota eikä sattumaa.
 *   4.  NAPAUTUS AVAA NOSTON. Kolme nostoa avataan AIDOLLA
 *       napautuksella merkin omasta ruutupisteestä (sivu.mouse.click),
 *       ja jokaisesta avautuu nostokortti. Jos kortin tunnus on
 *       luettavissa (`ui.fokuskohdeAuki`), sen merkin on oltava 44
 *       px:n osumasäteen sisällä napautetusta pisteestä — rykelmässä
 *       lähin merkki saa voittaa, se ON osumasääntö.
 *   4b. Aihemerkin napautus avaa viuhkan, jossa on ryhmän verran
 *       kohtia, ja viuhkan kohdan napautus avaa juuri sen kortin.
 *   5.  LUENTAKUVAPAKKAA EI OLE KARTALLA (PAATOKSET 31 kohta 1):
 *       yhtään näkyvää `.fokusvirta-luentakuva`-paneelia eikä
 *       `.pulucam-kortti`-korttia kartalla saapumisen jälkeen.
 *   6.  MERKIT OVAT TERÄVIÄ. Rasterin tarkkuusporras
 *       (js/fokusnosto-symbolit.js nostosymPorrasNyt) on vähintään
 *       merkin näkyvä tarve `mitta × devicePixelRatio`. Sumeus on
 *       täsmälleen tämän ehdon rikkoutuminen, joten se mitataan
 *       luvuilla eikä kuvavertailulla.
 *   6b. VASTAKOE: oletusporras (NOSTOSYM_PORTAAT[0] = 1,5) EI riitä
 *       samaan tarpeeseen — vartio 6 mittaa siis sitä, että pallo
 *       oikeasti tilaa portaan, eikä sitä että tarve on pieni.
 *   7.  TURISTI-INFON KYLTTI SAA SAMAN KATON (PAATOKSET 31 TARKENNUS
 *       1 kohta 3). Kyltti on js/kaupunkinosto.js:n oma merkki eikä
 *       karttanosto, joten vartiot 1 ja 2 eivät sitä mitanneet: sen
 *       nimiö luetaan omasta elementistään ja sen on oltava enintään
 *       NIMION_KATTO_PX.
 *   7b. KYLTTI MAHTUU RUUDULLE. Sen piirretty ala on kokonaan
 *       kotelossa — juuri se, mikä omistajan kuvassa leikkautui
 *       oikeasta laidasta (*"Turisti-in…"*).
 *   7c. (INFO, ei vartio) aito napautus merkin omasta ruutupisteestä:
 *       avaako se matkailijan oppaan? Rykelmässä ei — ks. rivin oma
 *       perustelu mittauksineen alempana.
 *   7d. VASTAKOE: katto pois kesken ajon (`?nimiokatto=0`,
 *       js/fokusnosto-symbolit.js) — sama näkymä, sama kyltti, ja
 *       nimiö kasvaa yli TURISTIN_VASTAKOKEEN_RAJA_PX:n.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä pallon kirjastoa ei saa, ja savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-pariisi-lahizoom.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
import {
  NOSTON_MITTA, NOSTON_NIMIO_KATTO_PX, KAUPUNKIMERKIN_KERROIN,
} from '../../js/pallolauta/nostot.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUDUT = [
  { nimi: 'puhelin', w: 390, h: 844 },
  { nimi: 'tyopoyta', w: 1400, h: 900 },
];
/**
 * ZOOMATAAN SAMAAN KARTTAMITTAAN MOLEMMILLA RUUDUILLA, EI SAMAAN
 * MÄÄRÄÄN PORTAITA.
 *
 * Uloszoomauksen esto pysähtyy eri kohtiin eri ruuduilla: mitattu
 * Ranskassa 390 × 844 pohja on osuudessa 0,341 uloimmasta, kun
 * 1400 × 900 päästää 0,098:aan. Puolituksin (0,5 → 0,25 → …) ei
 * myöskään voi osua 0,34:ään. Savuke asettaa siksi korkeuden SUORAAN
 * saapumiskorkeuden osuuteen LAHIZOOMIN_TAVOITE: puhelimella
 * uloszoomauksen esto pitää sen omassa pohjassaan (0,341) ja
 * työpöydällä kamera menee juuri siihen. Molemmat ruudut mittaavat
 * silloin saman karttamitan — sen, jonka omistaja näki.
 *
 * VÄLIPORTAAT AJETAAN SILTI, koska ladonta kulkee liikkeen mukana
 * (js/pallolauta/lauta.js LADONNAN_TAHTI_MS) ja yksi jättiloikka
 * jättäisi kerroksen kiinni saapumisnäkymän mittoihin.
 */
const LAHIZOOMIN_TAVOITE = 0.34;
/** Väliportaat saapumiskorkeuden osuuksina, viimeinen on tavoite. */
const ZOOMIPORTAAT = [0.7, 0.5, LAHIZOOMIN_TAVOITE];
/** Nimiön ruutupikselikatto (sama luku kuin kerroksella). */
const NIMION_KATTO_PX = NOSTON_NIMIO_KATTO_PX;
/** Mittausvara kattoon: pyöristys `toFixed(4)`-muunnoksessa. */
const KATON_VARA_PX = 0.1;
/**
 * VASTAKOKEEN RAJA. Ilman kattoa kaupunkimerkin nimiö olisi
 * sisimmällä zoomilla 33,8 px ja noston 25,0 px (mitattu 16.9.2026,
 * 390 × 844 dpr 2). Raja 30 px on näiden välissä: se ei voi mennä
 * läpi vahingossa, ja se vaatii kameran oikeasti zoomanneen.
 */
const VASTAKOKEEN_RAJA_PX = 30;
/**
 * TURISTI-INFON VASTAKOKEEN RAJA on oma lukunsa, koska kyltin kerroin
 * mitataan eri vertailusta kuin nostojen (maan laatikko × 1,15, ei
 * laitteen saapumisnäkymä — js/pallolauta/lauta.js paivitaTuristiInfo).
 * Mitattu 16.9.2026 sisimmällä zoomilla ilman kattoa: puhelimella
 * 79,8 px, työpöydällä 22,97 px. Raja on katto × 1,25 = 20 px: se on
 * molempien alapuolella mutta selvästi katon (16 px) yläpuolella, joten
 * se ei voi mennä läpi vahingossa eikä kaadu ruudun kuvasuhteesta.
 */
const TURISTIN_VASTAKOKEEN_RAJA_PX = NOSTON_NIMIO_KATTO_PX * 1.25;
/** Kaupunkimerkin nimiö saapumisnäkymässä (PAATOKSET 25 kohta 2). */
const SAAPUMISEN_VAHIN_PX = 11;
/**
 * PARIISIN RYKELMÄ (js/packs/*-fra.js, lähin kaupunki `pariisi`,
 * enintään 3 lautayksikköä kaupungista — sama joukko, jonka omistajan
 * kuvassa olisi pitänyt näkyä). Lista on kirjoitettu auki eikä
 * johdettu, jotta vartio kaatuu myös silloin, kun nosto katoaa
 * DATASTA eikä vain kartalta.
 */
const PARIISIN_NOSTOT = [
  'tuileries', 'bastilji',
  'syvennys-pariisi-tuileriat', 'syvennys-pariisi-kyyhkyposti',
  'syvennys-pariisi-impressionistit',
  'skandaali-mona-lisan-varkaus-1911', 'skandaali-vrain-lucas-kirjevaarennokset',
  'nosto-lustig-eiffel', 'nosto-kirahvin-kavelymatka', 'nosto-carmenin-ensi-ilta',
  'nosto-pariisin-72-nimea', 'nosto-guimardin-metro', 'nosto-notre-damen-kukko',
  'nosto-pariisin-patonki', 'nosto-pariisi-soi', 'nosto-pariisin-vuosisadat',
  'nosto-maalehti-braille', 'nosto-maalehti-pasteur-meister',
  'nosto-maalehti-tour-de-france-1903', 'nosto-maalehti-roland-garros',
  'nosto-maalehti-bouquinistit',
];
/**
 * Aihemerkkejä lähizoomissa vähintään. Mitattu 16.9.2026 (390 × 844):
 * sisimmällä zoomilla syntyy 4 ryhmää (Historia, Kulttuuri ja ruoka,
 * Kauppa ja tekniikka, Skandaalit). Raja on 2, jotta työpöydän
 * väljempi ruutu saa purkaa osan ryhmistä ilman että vartio kaatuu —
 * väite on "rykelmä ryhmittyy yhä", ei tarkka lukumäärä.
 */
const AIHEMERKKEJA_VAHINTAAN = 2;
/** Kaupunki, jonka rykelmää mitataan (js/fokuskohteet.js nostonKaupunkiAvain). */
const KAUPUNKI = 'pariisi';
/** Kolme pistettä on yksi merkki (js/pallolauta/aihemerkit.js). */
const ELLIPSI = '…';
/** Omistajan sanatarkas esimerkki aihenoston nimiöstä (kohta 8). */
const OMISTAJAN_ESIMERKKI = 'Mona Lisan varkaus';
/*
 * AIHENOSTOJEN LIMITYSKATTO. Aihenoston nimi on tärkeämpi kuin
 * täydellinen ladonta (js/pallolauta/sovittelu.js AIHENOSTON NIMI EI
 * KATOA NAAPURIN TAKIA): kun kaksi aihenostoa syntyy muutaman
 * kymmenen pikselin päähän toisistaan ja molempien nimiö on toista
 * sataa pikseliä pitkä, sovittelu valitsee mieluummin naapurin
 * viereen ladotun nimen kuin nimettömän pallon. Katto on siksi
 * MITATTU eikä nolla — luku on kirjattu raporttiin, ja sen KASVU on
 * regressio.
 */
const AIHENOSTOJEN_LIMITYSKATTO = 1;

/**
 * AIHENOSTOJEN ODOTUS LASKETAAN NÄKYMÄSTÄ, EI VAKIOSTA (vartio 3d).
 *
 * PAATOKSET 27 TARKENNUS 2 kohta 7: kaupungin rykelmässä saman aiheen
 * nostot yhdistetään AINA. Odotus on siis *"aiheiden määrä, joilla on
 * Pariisissa vähintään kaksi ryhmittyvää nostoa"* — ja ryhmittyviä
 * ovat elävät kohdenostot, joilla on aihe eivätkä ne ole kaupunkeja,
 * nimikylttejä tai maastokohteita (kohta 6).
 *
 * Ehdokkaat kootaan kahdesta paikasta, koska ryhmään sulautunut nosto
 * EI ole osumalistalla: yksin jääneet luetaan `osumat`ista ja
 * ryhmittyneet aihemerkkien jäsentiedoista.
 *
 * @returns {{ehdokkaat:Array, aiheet:Map<string,number>, odotus:number}}
 */
function rykelmanAiheet(mit) {
  const kelpaa = (r) => r.aihe && !r.poltettu && !r.maasto && !r.kaupunki
    && r.kaupunkiAvain === KAUPUNKI;
  const ehdokkaat = [
    ...mit.osumat.filter((o) => o.perhe === 'nosto' && kelpaa(o)),
    ...mit.aihemerkit.flatMap((a) => a.jasentiedot.filter((j) => kelpaa(j))),
  ];
  const aiheet = new Map();
  for (const r of ehdokkaat) aiheet.set(r.aihe, (aiheet.get(r.aihe) ?? 0) + 1);
  let odotus = 0;
  for (const m of aiheet.values()) if (m >= 2) odotus += 1;
  return { ehdokkaat, aiheet, odotus };
}

/** Pariisin aihenostot (muut kaupungit eivät kuulu tähän vartioon). */
const pariisinAihenostot = (mit) => mit.aihemerkit
  .filter((a) => a.jasentiedot.some((j) => j.kaupunkiAvain === KAUPUNKI));

/** Kartan lyhennys ei katkaise kesken sanan: runko on nimen alkuosa. */
const siisti = (t) => String(t ?? '').trim().replace(/\s+/gu, ' ');

/** Leikkaavatko kaksi ruutulaatikkoa? */
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
/** Montako nostoa avataan aidolla napautuksella (vartio 4). */
const NAPAUTUKSIA = 3;
/** Rasterin oletusporras (js/fokusnosto-symbolit.js NOSTOSYM_PORTAAT[0]). */
const OLETUSPORRAS = 1.5;
/** Osumasäde ruudulla (js/pallolauta/lauta.js NAPAUTUKSEN_SADE_PX). */
const NAPAUTUKSEN_SADE_PX = 44;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaaSivu(ruutu, { ryhmitys = true } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne('pariisi'));
  const sivu = await ctx.newPage();
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const lippu = ryhmitys ? '' : '&aihemerkit=0';
  await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  /*
   * SAAPUMINEN AJETAAN LOPPUUN ENNEN MITTAUSTA — sama syy kuin
   * savuke-nimikyltti.mjs:ssä: isoisän kuvasarja ja pulun kommentti
   * kulkevat ruudun poikki saapumisen ensimmäisen 40 sekunnin ajan, ja
   * juuri niiden jälkeinen tila on se, jota omistaja katsoi.
   */
  await sivu.waitForTimeout(44000);
  return { ctx, sivu };
}

/**
 * Kamera Pariisin päälle ja lähizoomiin: väliportaat saapumiskorkeuden
 * osuuksina ja viimeisenä tavoite (ks. LAHIZOOMIN_TAVOITE).
 */
async function zoomaaPariisiin(sivu, portaat) {
  return sivu.evaluate(async (osuudet) => {
    const ui = window.matkakirja.ui;
    const l = ui.pallolauta;
    const c = ui.game.pack.cities.find((x) => x.id === 'pariisi');
    const a = l.asteet({ x: c.x, y: c.y });
    // Saapumiskorkeus on uloin sallittu: kaikki portaat ovat sen osuuksia.
    const alku = l.pallo.pointOfView().altitude;
    // Ensin keskelle ilman zoomia, jotta mitta on Pariisin oma.
    l.pallo.pointOfView({ lat: a.lat, lng: a.lon, altitude: alku }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    for (const k of osuudet) {
      l.pallo.pointOfView({ lat: a.lat, lng: a.lon, altitude: alku * k }, 0);
      await new Promise((v) => setTimeout(v, 1600));
    }
    return l.pallo.pointOfView().altitude;
  }, portaat);
}

/** Yksi mittaus nykyisestä näkymästä. */
const mittaa = (sivu) => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const l = ui.pallolauta;
  const n = l.nostot;
  const koti = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
  const sym = await import('/js/fokusnosto-symbolit.js');
  const merkit = [...document.querySelectorAll('.pallolauta-nosto')].map((el) => {
    const g = el.querySelector('.pallolauta-nosto-siirto');
    const mitta = g ? Number((g.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
    const tyyli = getComputedStyle(el);
    return {
      id: el.dataset.nosto,
      nimio: el.dataset.nimio ?? '',
      kaupunki: el.classList.contains('pallolauta-nosto-kaupunki'),
      mitta,
      nakyy: tyyli.display !== 'none' && tyyli.visibility !== 'hidden'
        && Number(tyyli.opacity) > 0.01,
    };
  });
  return {
    koti: { w: koti.width, h: koti.height },
    alt: l.pallo.pointOfView().altitude,
    uloinOsuus: n?.portti?.()?.uloinOsuus ?? 0,
    karttaskaala: l.kamera.nakyvaAlue()?.skaala ?? 0,
    vertailuskaala: l.saapumisenSkaala?.() ?? 0,
    tiheys: window.devicePixelRatio || 1,
    porras: sym.nostosymPorrasNyt(),
    merkit,
    /*
     * TURISTI-INFON KYLTTI (js/kaupunkinosto.js) ON OMA MITTANSA, EI
     * NOSTOJEN. Merkki on pallon merkkikerroksen datum, jonka
     * mittakaava tulee `kaupunkimerkinMitta`sta, joten se luetaan
     * omasta elementistään (`.pallolauta-turisti-info`) eikä
     * `.pallolauta-nosto`-listasta, jossa sitä ei ole. Laatikko on
     * SIIRTORYHMÄN piirretty ala (svg on 1 × 1 px ja `overflow:
     * visible`), eli täsmälleen se, minkä pelaaja näkee — kotelon
     * koordinaateissa, kuten nostojen osumalaatikot.
     */
    turisti: (() => {
      const el = document.querySelector('.pallolauta-turisti-info');
      if (!el) return null;
      const g = el.querySelector('.pallolauta-turisti-info-siirto');
      const mitta = g ? Number((g.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
      const r = (g ?? el).getBoundingClientRect();
      const tyyli = getComputedStyle(el);
      return {
        kaupunki: el.dataset.kaupunki ?? '',
        mitta,
        x0: r.left - koti.left,
        y0: r.top - koti.top,
        x1: r.right - koti.left,
        y1: r.bottom - koti.top,
        nakyy: tyyli.display !== 'none' && tyyli.visibility !== 'hidden'
          && Number(tyyli.opacity) > 0.01,
      };
    })(),
    aihemerkit: (n?.aihemerkit?.() ?? []).map((a) => ({
      id: a.id,
      aihe: a.aihe,
      // Nimiö ja kaupunki: PAATOKSET 27 TARKENNUS 2 kohdat 7 ja 8.
      nimi: a.nimi ?? '',
      nimioNakyy: Boolean(a.nimioNakyy),
      kaupunkiAvain: a.kaupunkiAvain ?? null,
      maara: a.maara,
      jasenet: a.jasenet.map((j) => j.id),
      jasentiedot: a.jasenet.map((j) => ({
        id: j.id, nimi: j.nimi ?? '', aihe: j.aihe ?? null, kaupunkiAvain: j.kaupunkiAvain ?? null, maasto: Boolean(j.maasto),
      })),
      x: a.x,
      y: a.y,
    })),
    // Lukumäärää ei saa olla pallossa (kohta 8: *"ei lukumaaraa palloon"*).
    lukupalloja: document.querySelectorAll('.pallolauta-aihemerkki-luku').length,
    /*
     * AIHENOSTON NIMIÖ RUUDULLA (PAATOKSET 27 TARKENNUS 4 kohta 10).
     * Datan `nimioNakyy` kertoo päätöksen, tämä kertoo mitä pelaaja
     * NÄKEE: asetteleAihemerkki kirjoittaa näkyvän nimiön elementin
     * `data-nimio`-määreeseen ja tyhjän merkkijonon, kun nimiötä ei
     * piirretä. Kaksi mittaria, jottei vartio nojaa pelkkään lippuun.
     */
    aihenimioitaDom: [...document.querySelectorAll('.pallolauta-aihemerkki')]
      .filter((el) => (el.dataset.nimio ?? '') !== '').length,
    osumat: (n?.osumat?.() ?? []).map((o) => ({
      id: o.id,
      perhe: o.perhe,
      poltettu: Boolean(o.poltettu),
      nimi: o.nimi ?? '',
      aihe: o.aihe ?? null,
      kaupunkiAvain: o.kaupunkiAvain ?? null,
      maasto: Boolean(o.maasto),
      kaupunki: Boolean(o.kaupunki),
    })),
    laatikot: (n?.osumaLaatikot?.() ?? []).map((r) => ({
      id: r.id, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1,
    })),
    // Kartalle jäänyt luentakuvapakka (PAATOKSET 31 kohta 1).
    pakka: [...document.querySelectorAll('.fokusvirta-luentakuva')]
      .filter((el) => getComputedStyle(el).display !== 'none').length,
    pulucamKortteja: [...document.querySelectorAll('.pulucam-kortti')]
      .filter((el) => getComputedStyle(el).display !== 'none').length,
  };
});

/*
 * AVOIN KORTTI LUETAAN KAHDESTA PAIKASTA (sama kahvapari kuin
 * tools/savukkeet/savuke-ranska-sisalto.mjs `avoinna`).
 *
 * `ui.fokuskohdeAuki` on kohdekortin oma tila, mutta nosto voi avautua
 * myös KUVA EDELLÄ -korttina (`.fokusnosto-kerros`), joka ei kulje sen
 * kautta. Mitattu 16.9.2026: viuhkasta avattu nosto jätti
 * `fokuskohdeAuki`n tyhjäksi, jolloin savuke luuli ettei mitään
 * auennut — ja koska sulkeminen katsoi samaa tyhjää tilaa, kortti jäi
 * ruudulle peittämään kaikki seuraavat napautukset. Kahva on siksi
 * kumpi tahansa: tunnus tai kerroksen luokka.
 */
const KORTIT = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup, .kaupunkipopup';
const avoinNosto = (sivu) => sivu.evaluate((sel) => {
  const ui = window.matkakirja.ui;
  const el = document.querySelector(sel);
  return ui.fokuskohdeAuki?.id
    ?? (el ? String(el.className?.baseVal ?? el.className ?? el.tagName) : null);
}, KORTIT);
async function suljeKortti(sivu) {
  for (let i = 0; i < 8; i += 1) {
    if (!(await avoinNosto(sivu))) return;
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(260);
  }
  // Viimeinen keino: kortti pois suoraan, jottei se peitä seuraavia
  // napautuksia (savukkeen siivous, ei väite).
  await sivu.evaluate(async (sel) => {
    const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    for (const e of document.querySelectorAll(sel)) e.remove();
  }, KORTIT);
  await sivu.waitForTimeout(250);
}

/*
 * MERKIN RUUTUPISTE SIVUN KOORDINAATEISSA. Kerroksen omat luvut
 * (`osumaLaatikot`, `aihemerkit`) ovat KANKAAN koordinaatteja
 * (`getScreenCoords`), joten sivun piste saadaan lisäämällä kankaan
 * nurkka — ei kotelon, joka on eri elementti ja voi olla eri kohdassa.
 * Sama kaava kuin tools/savukkeet/savuke-ranska-sisalto.mjs `tuore`.
 */
const kankaanNurkka = (sivu) => sivu.evaluate(() => {
  const r = window.matkakirja.ui.pallolauta.pallo.renderer().domElement
    .getBoundingClientRect();
  return { x: r.left, y: r.top };
});

/** Yhden noston oma ruutupiste (symbolin kohta, ei nimiön ulkopää). */
const merkinPiste = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const o = l.nostot.osumat().find((x) => x.id === tunnus);
  if (!o) return null;
  const p = l.pallo.getScreenCoords(o.lat, o.lng, 0);
  return p ? { x: p.x, y: p.y } : null;
}, id);

/** Peittääkö käyttöliittymän paneeli tämän pisteen? */
const peitossa = (sivu, px, py) => sivu.evaluate(([x, y]) => {
  const e = document.elementFromPoint(x, y);
  if (!e) return 'ei elementtiä';
  const kangas = window.matkakirja.ui.pallolauta.pallo.renderer().domElement;
  if (e === kangas || e.closest?.('.pallolauta-nosto, .pallolauta-merkki')) return null;
  return `${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}`.slice(0, 40);
}, [px, py]);

/*
 * KAAPPAUS EI SAA KAATAA MITTAUSTA. Playwrightin `screenshot` odottaa
 * kirjasinten latautumista, ja pallon oma rAF-silmukka voi pitää sen
 * odotuksen auki yli 30 s:n (mitattu 16.9.2026, 1400 × 900 — sama
 * ilmiö kuin tools/savukkeet/savuke-pergamentti.mjs:n kirjasinodotus).
 * Kuva on savukkeen sivutuote, vartiot sen tulos, joten epäonnistunut
 * kaappaus kirjataan INFOna eikä heitetä eteenpäin.
 */
async function kaappaa(sivu, nimi) {
  if (!KUVAKANSIO) return;
  try {
    await sivu.screenshot({ path: join(KUVAKANSIO, nimi), timeout: 15000 });
  } catch (virhe) {
    tieto('kaappaus ei onnistunut', `${nimi}: ${String(virhe?.message ?? virhe).slice(0, 80)}`);
  }
}

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${ruutu.nimi} ${ruutu.w} × ${ruutu.h} =====================`);
  const { ctx, sivu } = await avaaSivu(ruutu);

  /* --- saapumisnäkymä: katto ei saa purra siellä (vartio 1c) --- */
  const saapuen = await mittaa(sivu);
  const saapuvaKaupunki = saapuen.merkit.filter((m) => m.kaupunki && m.mitta > 0);
  const saapuvaNimio = saapuvaKaupunki.length
    ? Math.max(...saapuvaKaupunki.map((m) => m.mitta)) * NOSTOSYM_NIMIO_KOKO : 0;
  tieto(`${ruutu.nimi} · saapuminen`,
    `uloinOsuus ${p(saapuen.uloinOsuus, 3)}, merkkejä ${saapuen.merkit.length}, `
    + `kaupunkimerkin nimiö ${p(saapuvaNimio)} px, aihemerkkejä ${saapuen.aihemerkit.length}`);
  vaadi(`1c. ${ruutu.nimi}: kaupunkimerkin nimiö on saapuessa ≥ ${SAAPUMISEN_VAHIN_PX} px`,
    saapuvaNimio >= SAAPUMISEN_VAHIN_PX,
    `${p(saapuvaNimio)} px (kaupunkimerkkejä ${saapuvaKaupunki.length})`);

  /*
   * --- 3i2. VASTAKOE: NIMIÖKYNNYS POIS SAMASTA SAAPUMISNÄKYMÄSTÄ ---
   *
   * `?aihenimiokynnys=0` (js/pallolauta/nostot.js
   * aihenimionKynnysSallittu) palauttaa v1927:n tilan, jossa nimiö
   * näkyi kaikilla zoomeilla. Lippu luetaan joka ladonnassa
   * osoitteesta, joten sivua ei ladata uudelleen eikä kameraa
   * siirretä — mitattava näkymä on sama kuin vartiossa 3i.
   */
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('aihenimiokynnys', '0');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const ilmanKynnysta = await mittaa(sivu);
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('aihenimiokynnys');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const kynnysTakaisin = await mittaa(sivu);
  const ilmanNimioita = ilmanKynnysta.aihemerkit.filter((a) => a.nimioNakyy).length;
  tieto(`${ruutu.nimi} · vastakoe ilman nimiökynnystä (saapuen)`,
    `nimiöllisiä aihenostoja ${ilmanNimioita}/${ilmanKynnysta.aihemerkit.length}, `
    + `DOM ${ilmanKynnysta.aihenimioitaDom}; kynnyksen kanssa `
    + `${kynnysTakaisin.aihemerkit.filter((a) => a.nimioNakyy).length}/`
    + `${kynnysTakaisin.aihemerkit.length}, DOM ${kynnysTakaisin.aihenimioitaDom}`);
  vaadi(`3i2. VASTAKOE ${ruutu.nimi}: ilman kynnystä nimiöt palaavat saapumisnäkymään`,
    ilmanKynnysta.aihemerkit.length > 0
      && ilmanNimioita === ilmanKynnysta.aihemerkit.length
      && ilmanKynnysta.aihenimioitaDom === ilmanKynnysta.aihemerkit.length
      && kynnysTakaisin.aihenimioitaDom === 0,
    `ilman kynnystä ${ilmanNimioita}/${ilmanKynnysta.aihemerkit.length} `
    + `(DOM ${ilmanKynnysta.aihenimioitaDom}), kynnyksen kanssa DOM `
    + `${kynnysTakaisin.aihenimioitaDom}`);

  /* --- 5. PAKKA EI OLE KARTALLA (PAATOKSET 31 kohta 1) --- */
  vaadi(`5. ${ruutu.nimi}: luentakuvapakkaa ei ole kartalla saapumisen jälkeen`,
    saapuen.pakka === 0 && saapuen.pulucamKortteja === 0,
    `paneeleja ${saapuen.pakka}, PuluCam-kortteja ${saapuen.pulucamKortteja}`);

  /* --- sisimpään zoomiin --- */
  const alt = await zoomaaPariisiin(sivu, ZOOMIPORTAAT);
  const m = await mittaa(sivu);
  const nurkka = await kankaanNurkka(sivu);
  const kerroin = m.vertailuskaala > 0 ? m.karttaskaala / m.vertailuskaala : 0;
  tieto(`${ruutu.nimi} · lähizoom`,
    `alt ${p(alt, 4)}, uloinOsuus ${p(m.uloinOsuus, 3)}, kerroin ${p(kerroin, 3)}, `
    + `merkkejä ${m.merkit.length}, aihemerkkejä ${m.aihemerkit.length}, porras ${m.porras}`);

  /* --- 1. NIMIÖN RUUTUPIKSELIKATTO --- */
  const nimiolliset = m.merkit.filter((x) => x.nimio && x.mitta > 0);
  const koot = nimiolliset.map((x) => x.mitta * NOSTOSYM_NIMIO_KOKO);
  const suurin = koot.length ? Math.max(...koot) : 0;
  tieto(`${ruutu.nimi} · nimiön koko ruudulla lähizoomissa`,
    `${koot.length} nimiötä, suurin ${p(suurin)} px, pienin ${p(Math.min(...koot))} px`);
  vaadi(`1. ${ruutu.nimi}: nimiö ≤ ${NIMION_KATTO_PX} px lähizoomissa`,
    koot.length > 0 && suurin <= NIMION_KATTO_PX + KATON_VARA_PX,
    `suurin ${p(suurin)} px (${koot.length} nimiötä)`);

  /*
   * 1b. VASTAKOE ILMAN KATTOA. Sama kerroin, sama peruskoko — vain
   * `Math.min` jää pois. Luku on se, mitä omistaja näki.
   */
  const ilmanKattoa = NOSTON_MITTA * kerroin * KAUPUNKIMERKIN_KERROIN * NOSTOSYM_NIMIO_KOKO;
  const nostoIlmanKattoa = NOSTON_MITTA * kerroin * NOSTOSYM_NIMIO_KOKO;
  tieto(`${ruutu.nimi} · vastakoe ilman kattoa`,
    `nosto ${p(nostoIlmanKattoa)} px, kaupunkimerkki ${p(ilmanKattoa)} px`);
  vaadi(`1b. VASTAKOE ${ruutu.nimi}: ilman kattoa nimiö olisi > ${VASTAKOKEEN_RAJA_PX} px`,
    ilmanKattoa > VASTAKOKEEN_RAJA_PX,
    `${p(ilmanKattoa)} px — kamera ei ilmeisesti zoomannut (kerroin ${p(kerroin, 3)})`);

  /*
   * 2. NIMIÖ MAHTUU RUUDULLE — MITATTUNA PARIISIN RYKELMÄSTÄ.
   *
   * Mitta on rykelmän omat laatikot eikä koko kartan: ruudun LAIDALLA
   * oleva merkki saa yhä jäädä puoliksi näkyviin (sama myönnytys kuin
   * nimikylteillä, js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON),
   * eikä se ole se vika, jonka omistaja näki. Pariisin rykelmä on
   * ruudun keskellä, joten sen laatikoilla ei ole tuota tekosyytä.
   */
  const rykelmanLaatikot = (mit) => mit.laatikot.filter((r) => PARIISIN_NOSTOT.includes(r.id));
  const laidanYli = (mit) => rykelmanLaatikot(mit).filter((r) => r.x0 < 0 || r.y0 < 0
    || r.x1 > mit.koti.w || r.y1 > mit.koti.h);
  const yli = laidanYli(m);
  tieto(`${ruutu.nimi} · rykelmän laidan yli valuvat laatikot`,
    yli.length ? yli.map((r) => r.id).join(', ') : 'ei yhtään');
  vaadi(`2. ${ruutu.nimi}: Pariisin nimiölaatikot mahtuvat koteloon`,
    yli.length === 0, `${yli.length} laatikkoa: ${yli.map((r) => r.id).join(', ')}`);

  /*
   * 3. PARIISIN RYKELMÄSTÄ EI KATOA YKSIKÄÄN NOSTO.
   *
   * KOLME HYVÄKSYTTÄVÄÄ TILAA, ei yksi. Nosto on kartalla, jos se on
   *   a) oma ELÄVÄ merkkinsä (DOM-elementti + osumalaatikko),
   *   b) aihemerkin jäsen (napautus avaa viuhkan, PAATOKSET 27), tai
   *   c) LAATTAAN POLTETTU muste (js/pallolauta/nostot.js POLTETTUA
   *      MUSTETTA EI VOI PIILOTTAA): sen kuva tulee laatasta eikä
   *      kerroksesta, joten DOM-elementtiä ei ole — mutta merkki on
   *      ruudulla ja osumalistalla, ja juuri niin sen kuuluu olla.
   * Poltetut kirjataan omana INFO-rivinään, koska joukko riippuu
   * siitä, millä laattatasolla kamera on.
   */
  const domIdt = new Set(m.merkit.filter((x) => x.nakyy).map((x) => x.id));
  const osumaIdt = new Set(m.osumat.map((o) => o.id));
  const poltetut = new Set(m.osumat.filter((o) => o.poltettu).map((o) => o.id));
  const ryhmassa = new Set(m.aihemerkit.flatMap((a) => a.jasenet));
  const kartalla = (id) => ryhmassa.has(id)
    || (osumaIdt.has(id) && (domIdt.has(id) || poltetut.has(id)));
  const kateissa = PARIISIN_NOSTOT.filter((id) => !kartalla(id));
  const poltettujaRykelmassa = PARIISIN_NOSTOT.filter((id) => poltetut.has(id));
  if (poltettujaRykelmassa.length) {
    tieto(`${ruutu.nimi} · rykelmän poltettua mustetta (ei DOM-elementtiä)`,
      poltettujaRykelmassa.join(', '));
  }
  tieto(`${ruutu.nimi} · Pariisin rykelmä`,
    `${PARIISIN_NOSTOT.length} nostoa: omana merkkinä `
    + `${PARIISIN_NOSTOT.filter((id) => domIdt.has(id)).length}, `
    + `aihemerkin jäsenenä ${PARIISIN_NOSTOT.filter((id) => ryhmassa.has(id)).length}, `
    + `poltettuna ${poltettujaRykelmassa.length}`);
  /*
   * NOSTOKOHTAINEN RIVI RAPORTTIA VARTEN (omistajan kysymys koski
   * sitä, MIKÄ nosto on piilossa — yhteenvetoluku ei sitä kerro).
   * Rivi on INFO eikä vartio: vartio on 3, joka vaatii jokaisen
   * olevan jossakin kolmesta hyväksyttävästä tilasta.
   */
  const tilaRivi = (id) => {
    if (ryhmassa.has(id)) return 'aihemerkissä';
    if (domIdt.has(id)) return 'oma merkki';
    if (poltetut.has(id)) return 'poltettu';
    return 'PIILOSSA';
  };
  tieto(`${ruutu.nimi} · rykelmän nostot tiloittain`,
    PARIISIN_NOSTOT.map((id) => `${id}=${tilaRivi(id)}`).join(', '));
  vaadi(`3. ${ruutu.nimi}: yksikään Pariisin nosto ei ole piilossa lähizoomissa`,
    kateissa.length === 0, `kateissa ${kateissa.length}: ${kateissa.join(', ')}`);
  vaadi(`3b. ${ruutu.nimi}: rykelmä ryhmittyy yhä lähizoomissa `
    + `(≥ ${AIHEMERKKEJA_VAHINTAAN} aihemerkkiä)`,
    m.aihemerkit.length >= AIHEMERKKEJA_VAHINTAAN, `${m.aihemerkit.length} aihemerkkiä`);

  /*
   * 3d–3f. AIHENOSTOT (PAATOKSET 27 TARKENNUS 2, omistaja 16.9.2026
   * klo 19.00 UTC). Sama mittaus molemmista näkymistä: sääntö 7 on
   * *"zoomista riippumatta"*, joten saapumisnäkymän ja lähizoomin on
   * annettava sama vastaus.
   */
  for (const [nakyma, mit] of [['saapuen', saapuen], ['lähizoom', m]]) {
    const { aiheet, odotus } = rykelmanAiheet(mit);
    const nostot = pariisinAihenostot(mit);
    tieto(`${ruutu.nimi} · ${nakyma} · Pariisin aiheet`,
      [...aiheet.entries()].map(([a, k]) => `${a}=${k}`).join(', ') || 'ei yhtään');
    tieto(`${ruutu.nimi} · ${nakyma} · aihenostot`,
      nostot.map((a) => `${a.aihe}:"${a.nimi}"(${a.maara})`).join(', ') || 'ei yhtään');
    vaadi(`3d. ${ruutu.nimi} (${nakyma}): aihenostoja = aiheita joilla ≥ 2 nostoa`,
      nostot.length === odotus,
      `aihenostoja ${nostot.length}, aiheita joilla ≥ 2 nostoa ${odotus}`);

    // 3e. NIMIÖ = tärkeimmän noston nimi + kolme pistettä, ei lukua.
    const nimiovirheet = nostot.filter((a) => {
      if (!a.nimi.endsWith(ELLIPSI)) return true;
      const runko = a.nimi.slice(0, -ELLIPSI.length);
      if (!runko || runko.endsWith('.')) return true;
      return !siisti(a.jasentiedot[0]?.nimi).startsWith(runko);
    });
    vaadi(`3e. ${ruutu.nimi} (${nakyma}): jokaisella aihenostolla on nimiö "Nimi${ELLIPSI}"`,
      nostot.length > 0 && nimiovirheet.length === 0,
      nostot.length
        ? nimiovirheet.map((a) => `${a.id}="${a.nimi}"`).join(', ')
        : 'aihenostoja ei ollut lainkaan');
    /*
     * NIMIÖ MYÖS NÄKYY — MITATTUNA SIINÄ NÄKYMÄSSÄ, JOSTA PÄÄTÖS
     * TEHTIIN. Sovittelun viimeinen keino on yhä lapun piilotus
     * (js/pallolauta/sovittelu.js kohta 3), ja SAAPUMISNÄKYMÄSSÄ koko
     * Ranska on 390 px:n levyisenä niin täynnä, että osa aihenostoista
     * joutuu sinne asti. Omistajan kuva ja PAATOKSET 27 TARKENNUS 2:n
     * oma mittausohje (*"Mitataan Pariisi 390 px"*) koskevat
     * LÄHIZOOMIA, joten vartio on siellä ja saapumisnäkymä on INFO.
     */
    const piilossa = nostot.filter((a) => !a.nimioNakyy);
    tieto(`${ruutu.nimi} · ${nakyma} · aihenoston nimiö piilotettu sovittelussa`,
      piilossa.length ? piilossa.map((a) => a.id).join(', ') : 'ei yhtään');
    if (nakyma === 'lähizoom') {
      vaadi(`3e4. ${ruutu.nimi} (${nakyma}): yhdenkään aihenoston nimiö ei ole piilossa`,
        piilossa.length === 0, `${piilossa.length} piilossa`);
    }
    /*
     * 3i. NIMIÖ VAIN LÄHIZOOMISSA (PAATOKSET 27 TARKENNUS 4 kohta 10).
     * Saapumisnäkymässä nolla, lähizoomissa jokaisella — ja luku
     * luetaan KAHDESTA lähteestä: kerroksen oma lippu (`nimioNakyy`,
     * jota myös sovittelu lukee) ja se, mitä elementtiin oikeasti
     * piirrettiin (`data-nimio`). Jos ne eroavat, vika on siinä
     * välissä eikä kynnyksessä, ja se on syytä nähdä.
     *
     * DOM-luku koskee KOKO ruutua, kerroksen luku Pariisin nostoja,
     * joten lähizoomissa verrataan DOMia kaikkiin aihemerkkeihin ja
     * saapumisnäkymässä molempien on oltava nolla.
     */
    const nimiollisia = nostot.filter((a) => a.nimioNakyy).length;
    tieto(`${ruutu.nimi} · ${nakyma} · aihenoston nimiö näkyy`,
      `kerros ${nimiollisia}/${nostot.length}, DOM ${mit.aihenimioitaDom} `
      + `(aihemerkkejä kartalla ${mit.aihemerkit.length})`);
    if (nakyma === 'saapuen') {
      vaadi(`3i. ${ruutu.nimi} (${nakyma}): aihenostojen nimiöitä 0 — pelkkä symboli`,
        nimiollisia === 0 && mit.aihenimioitaDom === 0,
        `kerros ${nimiollisia}, DOM ${mit.aihenimioitaDom}`);
    } else {
      vaadi(`3i. ${ruutu.nimi} (${nakyma}): jokaisella aihenostolla on nimiö näkyvissä`,
        nostot.length > 0 && nimiollisia === nostot.length
          && mit.aihenimioitaDom === mit.aihemerkit.length,
        `kerros ${nimiollisia}/${nostot.length}, DOM ${mit.aihenimioitaDom}/`
        + `${mit.aihemerkit.length}`);
    }
    vaadi(`3e2. ${ruutu.nimi} (${nakyma}): pallossa ei ole lukumäärää`,
      mit.lukupalloja === 0, `${mit.lukupalloja} lukua kartalla`);

    // 3e3. Omistajan oma esimerkki (kohta 8).
    const skandaalit = nostot.find((a) => a.aihe === 'skandaalit');
    vaadi(`3e3. ${ruutu.nimi} (${nakyma}): skandaalirykelmän nimiö on `
      + `"${OMISTAJAN_ESIMERKKI}${ELLIPSI}"`,
      skandaalit?.nimi === `${OMISTAJAN_ESIMERKKI}${ELLIPSI}`,
      `nimiö "${skandaalit?.nimi ?? '-'}"`);

    /*
     * 3h. AIHENOSTOT EIVÄT PEITÄ TOISIAAN. Rykelmä korvautuu viidellä
     * merkillä, jotka kaikki ovat saman kaupungin päällä — jos niiden
     * nimiöt limittyisivät keskenään, ryhmitys olisi vain siirtänyt
     * ongelman. Laatikot ovat samasta kaavasta kuin sormi
     * (osumaLaatikot → aihemerkinLaatikko).
     */
    const aihelaatikot = mit.laatikot.filter((r) => String(r.id).startsWith('aihemerkki:'));
    let aiheparit = 0;
    for (let i = 0; i < aihelaatikot.length; i += 1) {
      for (let j = i + 1; j < aihelaatikot.length; j += 1) {
        if (limittyy(aihelaatikot[i], aihelaatikot[j])) aiheparit += 1;
      }
    }
    tieto(`${ruutu.nimi} · ${nakyma} · aihenostojen limittyvät parit`,
      `${aiheparit} paria ${aihelaatikot.length}:stä`);
    // Sama rajaus kuin 3e4: vartio on lähizoomissa, saapuminen INFO.
    if (nakyma === 'lähizoom') {
      vaadi(`3h. ${ruutu.nimi} (${nakyma}): aihenostojen limittyviä pareja `
        + `≤ ${AIHENOSTOJEN_LIMITYSKATTO}`,
        aiheparit <= AIHENOSTOJEN_LIMITYSKATTO,
        `${aiheparit} limittyvää paria ${aihelaatikot.length}:stä`);
    }

    // 3f. maastokohde ei yhdisty, yksinäinen aihe ei saa aihenostoa.
    const maastoJasenet = nostot.flatMap((a) => a.jasentiedot.filter((j) => j.maasto));
    const yksinaiset = [...aiheet.entries()].filter(([, k]) => k < 2).map(([a]) => a);
    const vaaraYksin = nostot.filter((a) => yksinaiset.includes(a.aihe));
    vaadi(`3f. ${ruutu.nimi} (${nakyma}): maastokohde ei yhdisty, yksinäinen nosto pysyy omanaan`,
      maastoJasenet.length === 0 && vaaraYksin.length === 0,
      `maastojäseniä ${maastoJasenet.length}, yksinäisiä aihenostoja ${vaaraYksin.length}`);
  }

  /*
   * 3g. VASTAKOE: KAUPUNGIN AINA-YHDISTYS POIS SAMASTA NÄKYMÄSTÄ.
   * Lippu luetaan joka ladonnassa osoitteesta (js/pallolauta/nostot.js
   * kaupunkiYhdistysSallittu), joten sivua ei tarvitse ladata uudelleen
   * eikä kameraa siirtää — mitattava näkymä on sama kuin vartiossa 3d.
   */
  const odotusLahella = rykelmanAiheet(m).odotus;
  const aihenostojaLahella = pariisinAihenostot(m).length;
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('aihekaupunki', '0');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const ilmanKaupunkia = await mittaa(sivu);
  const ilmanKaupunkiaMaara = pariisinAihenostot(ilmanKaupunkia).length;
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('aihekaupunki');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  tieto(`${ruutu.nimi} · vastakoe ilman kaupungin aina-yhdistystä`,
    `aihenostoja ${ilmanKaupunkiaMaara} (säännön kanssa ${aihenostojaLahella}, `
    + `odotus ${odotusLahella})`);
  vaadi(`3g. VASTAKOE ${ruutu.nimi}: ilman kaupungin aina-yhdistystä `
    + 'aihenostojen määrä on väärä',
    ilmanKaupunkiaMaara !== odotusLahella && aihenostojaLahella === odotusLahella,
    `ilman sääntöä ${ilmanKaupunkiaMaara}, säännön kanssa ${aihenostojaLahella}, `
    + `odotus ${odotusLahella}`);

  /* --- 6. TERÄVYYS: PORRAS RIITTÄÄ MERKIN NÄKYVÄÄN TARPEESEEN --- */
  const suurinMitta = Math.max(...m.merkit.map((x) => x.mitta), 0);
  const tarve = suurinMitta * Math.min(m.tiheys, 3);
  tieto(`${ruutu.nimi} · rasteri`,
    `suurin mitta ${p(suurinMitta, 4)}, dpr ${m.tiheys}, tarve ${p(tarve, 3)}, `
    + `porras ${m.porras}`);
  vaadi(`6. ${ruutu.nimi}: rasteriporras riittää merkin näkyvään kokoon`,
    m.porras >= tarve, `porras ${m.porras} < tarve ${p(tarve, 3)}`);
  vaadi(`6b. VASTAKOE ${ruutu.nimi}: oletusporras ${OLETUSPORRAS} ei riittäisi`,
    tarve > OLETUSPORRAS, `tarve ${p(tarve, 3)} ≤ ${OLETUSPORRAS}`);

  /*
   * 4. AITO NAPAUTUS AVAA NOSTON. Sormen piste on merkin OMA
   * ruutupiste (`getScreenCoords`), ei nimiölaatikon keskikohta: nimiö
   * on osa osumapintaa, mutta pelaajan sormi hakee symbolin. Kohteeksi
   * kelpaavat vain Pariisin rykelmän omat merkit — juuri ne, joita
   * omistaja ei nähnyt.
   */
  const ehdokkaat = PARIISIN_NOSTOT.filter((id) => domIdt.has(id) && osumaIdt.has(id));
  const napautetut = [];
  const virheet = [];
  /*
   * ── 7c. TURISTI-INFON KYLTIN NAPAUTUS MITATAAN ENSIMMÄISENÄ ─────
   *
   * SAMASTA SYYSTÄ KUIN VIUHKA: kartan napautustila on puhtaimmillaan
   * ennen kuin yksikään kortti on ehtinyt avautua ja sulkeutua.
   * MITATTU 16.9.2026: kun sama napautus tehtiin vasta kolmen
   * nostokortin jälkeen, se ei avannut mitään — laudan oma
   * `korttiOliAuki`-lukko (js/pallolauta/lauta.js napautaPintaan:
   * *"sulkeva napautus ei avaa mitään uutta"*) nielaisi sen. Lukko on
   * oikein, mutta se on eri asia kuin tämän erän väite.
   *
   * Sormen piste on merkin ANKKURI eli sen elementin keskikohta:
   * elementti on 1 × 1 px:n laatikko ankkurissa (`translate(-50%,
   * -50%)`) ja nimiö piirtyy siitä oikealle siirtoryhmään, joten
   * sormi hakee symbolin eikä nimiön ulkopäätä — sama sääntö kuin
   * vartiossa 4.
   */
  const tPiste = await sivu.evaluate(() => {
    const el = document.querySelector('.pallolauta-turisti-info');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
  });
  let opasAuki = null;
  let opasEste = null;
  let opasSijaan = null;
  if (tPiste) {
    opasEste = await peitossa(sivu, tPiste.x, tPiste.y);
    if (!opasEste) {
      await sivu.mouse.click(tPiste.x, tPiste.y);
      await sivu.waitForTimeout(900);
      opasAuki = await sivu.evaluate(() => {
        const d = document.getElementById('nahtavyys-dialog');
        const auki = window.matkakirja.ui.lehtitila?.nahtavyysAuki ?? null;
        return d?.open
          ? (auki?.kohde?.nimi ?? auki?.kohde?.otsikko ?? 'opas auki') : null;
      });
      // Mikä muu kortti vei napautuksen? Ilman tätä punainen rivi ei
      // kerro, oliko kyse osumasäännöstä vai kuolleesta merkistä.
      if (!opasAuki) opasSijaan = await avoinNosto(sivu);
      // Opas on modaali arkki: se on suljettava ennen seuraavia
      // napautuksia, tai se peittäisi kartan (savukkeen siivous).
      await sivu.keyboard.press('Escape');
      await sivu.waitForTimeout(500);
      await sivu.evaluate(() => {
        const d = document.getElementById('nahtavyys-dialog');
        if (d?.open) d.close();
      });
      await sivu.waitForTimeout(300);
      await suljeKortti(sivu);
    }
  }
  /*
   * VIUHKA ENNEN NOSTOJA. Aihemerkin napautus on kartan tila
   * (viuhka aukeaa ja sulkeutuu), ja se on mitattava puhtaasta
   * näkymästä — ennen kuin yksikään kortti on ehtinyt avautua.
   */
  let viuhkaTulos = null;
  if (m.aihemerkit.length) {
    const suurinRyhma = [...m.aihemerkit].sort((a, b) => b.maara - a.maara)[0];
    await sivu.mouse.click(nurkka.x + suurinRyhma.x, nurkka.y + suurinRyhma.y);
    await sivu.waitForTimeout(800);
    const kohdat = await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const r = l.pallo.renderer().domElement.getBoundingClientRect();
      return (l.nostot?.viuhkanOsumalaatikot?.() ?? []).map((b) => ({
        id: b.id, x: (b.x0 + b.x1) / 2 + r.left, y: (b.y0 + b.y1) / 2 + r.top,
      }));
    });
    let viuhkaKortti = null;
    if (kohdat.length) {
      await sivu.mouse.click(kohdat[0].x, kohdat[0].y);
      await sivu.waitForTimeout(900);
      viuhkaKortti = await avoinNosto(sivu);
    }
    await suljeKortti(sivu);
    /*
     * VIUHKA SULJETAAN ENNEN SEURAAVIA NAPAUTUKSIA. Auki jäänyt viuhka
     * on kartan oma tila: sen aikana kartan napautus SULKEE viuhkan
     * eikä avaa mitään (js/pallolauta/lauta.js napautaPintaan), joten
     * vartio 4 mittaisi väärää asiaa. Tämä on savukkeen siivous, ei
     * väite — viuhkan sulkeutumisen mittaa savuke-nimikyltti (9d).
     */
    await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      l.nostot?.suljeViuhka?.();
      l.ladoHeti?.();
    });
    await sivu.waitForTimeout(500);
    viuhkaTulos = { ryhma: suurinRyhma, kohdat, kortti: viuhkaKortti };
  }

  const esteet = [];
  for (const id of ehdokkaat) {
    if (napautetut.length >= NAPAUTUKSIA) break;
    const piste = await merkinPiste(sivu, id);
    if (!piste) continue;
    const px = nurkka.x + piste.x;
    const py = nurkka.y + piste.y;
    await suljeKortti(sivu);
    // Sulkeutuva kortti vie oman hetkensä; sen aikana tullut napautus
    // menisi hukkaan eikä kertoisi osumapinnasta mitään.
    await sivu.waitForTimeout(400);
    const este = await peitossa(sivu, px, py);
    // Paneelin alle jäävä merkki ohitetaan: sitä ei voi napauttaa
    // sormellakaan, eikä se ole tämän vartion väite. Este kirjataan,
    // jotta "napautettavia vain 0" ei jää arvoitukseksi.
    if (este) { esteet.push(`${id} (${este})`); continue; }
    await sivu.mouse.click(px, py);
    await sivu.waitForTimeout(800);
    const auki = await avoinNosto(sivu);
    napautetut.push(`${id}→${auki ?? '-'}`);
    /*
     * OSUMASÄÄNTÖ ON LÄHIN MERKKI 44 px:N SÄTEELLÄ
     * (js/pallolauta/lauta.js NAPAUTUKSEN_SADE_PX). Rykelmässä sormen
     * pisteestä voi siis avautua NAAPURIN kortti, ja niin kuuluukin:
     * väite on *"napautus avaa noston popupin"*, ei "juuri tämän".
     * Vartio kaatuu, jos mitään ei aukea — ja jos kortin TUNNUS on
     * luettavissa (`ui.fokuskohdeAuki`), myös silloin, jos sen merkki
     * on yli 44 px:n päässä napautetusta pisteestä. Kuva edellä
     * -kortilla tunnusta ei ole, jolloin mitta on kortin olemassaolo.
     */
    if (!auki) { virheet.push(`${id}→ei korttia`); continue; }
    const avatunPiste = await merkinPiste(sivu, auki);
    const etaisyys = avatunPiste
      ? Math.hypot(avatunPiste.x - piste.x, avatunPiste.y - piste.y) : null;
    if (etaisyys !== null && etaisyys > NAPAUTUKSEN_SADE_PX) {
      virheet.push(`${id}→${auki} (${p(etaisyys)} px päässä)`);
    }
  }
  await suljeKortti(sivu);
  tieto(`${ruutu.nimi} · napautukset`, napautetut.join(', ') || 'ei yhtään');
  if (esteet.length) {
    tieto(`${ruutu.nimi} · peitossa (ohitettu)`, esteet.join(', '));
  }
  vaadi(`4. ${ruutu.nimi}: aito napautus avaa noston kortin `
    + `(${NAPAUTUKSIA} nostoa, osuma 44 px:n säteeltä)`,
    napautetut.length === NAPAUTUKSIA && virheet.length === 0,
    virheet.length ? virheet.join(', ') : `napautettavia vain ${napautetut.length}`);

  /*
   * 4b. AIHEMERKIN VIUHKA AVAA KORTIN. Viuhkan kohtia on oltava
   * ryhmän verran (jokainen jäsen saa oman nimensä, PAATOKSET 27
   * kohta 2), ja kohdan napautuksesta on avauduttava kortti. Tunnusta
   * ei vaadita: viuhkasta avautuva nosto tulee usein KUVA EDELLÄ
   * -korttina (`.fokusnosto-kerros`), jolla ei ole `fokuskohdeAuki`-
   * tunnusta lainkaan (ks. avoinNosto).
   */
  vaadi(`4b. ${ruutu.nimi}: aihemerkin viuhka avautuu ja sen kohta avaa kortin`,
    Boolean(viuhkaTulos) && viuhkaTulos.kohdat.length === viuhkaTulos.ryhma.maara
      && Boolean(viuhkaTulos.kortti),
    viuhkaTulos
      ? `kohtia ${viuhkaTulos.kohdat.length} / ${viuhkaTulos.ryhma.maara}, `
        + `kortti ${viuhkaTulos.kortti ?? '-'} (kohta ${viuhkaTulos.kohdat[0]?.id ?? '-'})`
      : 'aihemerkkejä ei ollut (ks. vartio 3b)');

  /*
   * ══════════════════════════════════════════════════════════════
   * 7. TURISTI-INFON KYLTTI (PAATOKSET 31 TARKENNUS 1 kohta 3)
   * ══════════════════════════════════════════════════════════════
   *
   * Fable 16.9.2026 klo 20.45 UTC: kyltti *"kasvaa lähizoomissa
   * rajatta ja leikkautuu ruudun laidasta — kohdan 2 ruutupikselikatto
   * ei koske sitä"*. Kyltti on js/kaupunkinosto.js:n oma merkki, ei
   * karttanosto, joten vartiot 1 ja 2 eivät sitä mitanneet.
   *
   * Kolme väitettä, kaikki samasta ruudusta ja samasta zoomista kuin
   * nostojen omat:
   *   7.  nimiö ei kasva yli nostojen katon (NIMION_KATTO_PX);
   *   7b. kyltin piirretty ala mahtuu koteloon — juuri se, mikä
   *       omistajan kuvassa leikkautui oikeasta laidasta;
   *   7c. (INFO) napautus merkin omasta ruutupisteestä — avaako se
   *       matkailijan oppaan (js/kaupunkinosto.js avaaTuristiOpas →
   *       #nahtavyys-dialog)? Napautus tehdään puhtaasta tilasta ennen
   *       muita kortteja, ks. sen oma perustelu ylempänä.
   * Vastakoe on 7d: katto pois kesken ajon (`?nimiokatto=0`).
   */
  const t = m.turisti;
  const turistiNimio = t ? t.mitta * NOSTOSYM_NIMIO_KOKO : 0;
  const tSaapuen = saapuen.turisti;
  tieto(`${ruutu.nimi} · turisti-infon kyltti`,
    t
      ? `mitta ${p(t.mitta, 4)}, nimiö ${p(turistiNimio)} px, `
        + `laatikko ${p(t.x0)},${p(t.y0)} → ${p(t.x1)},${p(t.y1)} `
        + `(leveys ${p(t.x1 - t.x0)} px, kotelo ${p(m.koti.w)} × ${p(m.koti.h)} px), `
        + `saapuessa nimiö ${p(tSaapuen ? tSaapuen.mitta * NOSTOSYM_NIMIO_KOKO : 0)} px`
      : 'ei kyltillä kartalla');
  vaadi(`7. ${ruutu.nimi}: turisti-infon nimiö ≤ ${NIMION_KATTO_PX} px lähizoomissa`,
    Boolean(t) && t.nakyy && turistiNimio > 0
      && turistiNimio <= NIMION_KATTO_PX + KATON_VARA_PX,
    t ? `${p(turistiNimio)} px (mitta ${p(t.mitta, 4)})` : 'kylttiä ei ollut kartalla');
  const tYli = t
    ? (t.x0 < 0 || t.y0 < 0 || t.x1 > m.koti.w || t.y1 > m.koti.h) : true;
  vaadi(`7b. ${ruutu.nimi}: turisti-infon kyltti mahtuu kokonaan koteloon`,
    Boolean(t) && !tYli,
    t
      ? `laatikko ${p(t.x0)},${p(t.y0)} → ${p(t.x1)},${p(t.y1)}, `
        + `kotelo ${p(m.koti.w)} × ${p(m.koti.h)} px`
      : 'kylttiä ei ollut kartalla');
  /*
   * 7c. ON INFO EIKÄ VARTIO — JA SE ON MITTAUSTULOS, EI LAISKUUTTA.
   *
   * MITATTU 16.9.2026 (Pariisin sisin zoomi, molemmat ruudut): sormi
   * TÄSMÄLLEEN kyltin päällä avaa Guimardin metron, jonka merkki on
   * 16,4 px päässä. Syy on osumasääntöjen järjestys, ei kyltin koko:
   * nostojen osumalaatikkoa venytetään joka suuntaan
   * LAPUN_KOSKETUSVARA_PX:n (16 px) verran (js/pallolauta/lauta.js,
   * omistajan tilaus 7.9.2026 *"Symboli ottaa klikkauksen mutta teksti
   * ei"*), ja 14.9.2026:n sääntö antaa noston musteen voittaa
   * turisti-infon (omistajan Chambord-havainto). Rykelmässä nämä kaksi
   * omistajan omaa sääntöä osuvat yhteen, ja kyltti jää väliin.
   *
   * KOKEILTU JA PERUTTU, mitattuna: (a) kyltin oma muste voittaa, kun
   * sormi on sen päällä eikä noston musteella, ja (b) kyltin laatikko
   * sovittelun esteeksi, jolloin nostojen laput väistävät sitä.
   * Kumpikin korjasi tämän rivin mutta kaatoi
   * tools/savukkeet/savuke-pallo-nostolaput.mjs:n omistajan omia
   * vartioita Bukarestissa: (a) vartiot 6 ja 7 (lapun tekstin napautus
   * 8 px:n sormenpoikkeamalla, VIAT v1680) ja (b) vartion 2
   * (kaupunkinimi ei leikkaa liikkumatonta mustetta). Osumajärjestys
   * rykelmässä on siis oma eränsä ja oma päätöksensä, ei tämän katon
   * sivutuote — luku jää tähän mitattuna, jotta se ei unohdu.
   */
  tieto(`${ruutu.nimi} · turisti-infon kyltin napautus`,
    tPiste
      ? (opasEste
        ? `merkki on peitossa: ${opasEste}`
        : (opasAuki
          ? `avasi oppaan (${opasAuki})`
          : `EI avannut opasta — auki sen sijaan: ${opasSijaan ?? 'ei mitään'}`))
      : 'kylttiä ei ollut kartalla');

  /*
   * 7d. VASTAKOE: KATTO POIS KESKEN AJON (`?nimiokatto=0`,
   * js/fokusnosto-symbolit.js). Kyltin kerrointa ei voi laskea
   * savukkeessa kuten nostojen (vartio 1b): sen vertailuleveys on maan
   * laatikko × 1,15 eikä laitteen saapumisnäkymä
   * (js/pallolauta/lauta.js paivitaTuristiInfo), eikä laatikko ole
   * savukkeen ulottuvilla. Lippu kääntää katon pois SAMASSA näkymässä
   * — ei sivun uudelleenlatausta, vain uusi ladonta — ja sitten
   * mitataan sama kyltti uudelleen. Näin vastakoe on aito mittaus
   * eikä laskutoimitus.
   */
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('nimiokatto', '0');
    window.history.replaceState(null, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const kattoPois = await mittaa(sivu);
  const tIlman = kattoPois.turisti;
  const turistiIlmanKattoa = tIlman ? tIlman.mitta * NOSTOSYM_NIMIO_KOKO : 0;
  const tIlmanYli = tIlman
    ? (tIlman.x0 < 0 || tIlman.y0 < 0
      || tIlman.x1 > kattoPois.koti.w || tIlman.y1 > kattoPois.koti.h) : false;
  tieto(`${ruutu.nimi} · turisti-info ilman kattoa (?nimiokatto=0)`,
    tIlman
      ? `nimiö ${p(turistiIlmanKattoa)} px, leveys ${p(tIlman.x1 - tIlman.x0)} px, `
        + `laidan yli ${tIlmanYli ? 'kyllä' : 'ei'}`
      : 'kylttiä ei ollut kartalla');
  vaadi(`7d. VASTAKOE ${ruutu.nimi}: ilman kattoa turisti-infon nimiö olisi `
    + `> ${TURISTIN_VASTAKOKEEN_RAJA_PX} px`,
    turistiIlmanKattoa > TURISTIN_VASTAKOKEEN_RAJA_PX,
    `${p(turistiIlmanKattoa)} px — kamera ei ilmeisesti zoomannut (kerroin ${p(kerroin, 3)})`);
  // Lippu pois: kuva ja mahdolliset myöhemmät mittaukset ovat korjatusta
  // laudasta, eivät vastakokeesta.
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('nimiokatto');
    window.history.replaceState(null, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);

  await kaappaa(sivu, `pariisi-lahizoom-${ruutu.w}.png`);
  await ctx.close();

  /*
   * 3c. VASTAKOE `?aihemerkit=0`: sama peli ilman ryhmitystä.
   *
   * MITTA ON LIMITYS SAAPUMISNÄKYMÄSSÄ, EI LÄHIZOOMISSA. Kaksi syytä,
   * molemmat mitattuja 16.9.2026:
   *   1. Saapumisnäkymä on se, jolle PAATOKSET 27 kirjoitettiin
   *      (*"Pariisin saapumisnäkymässä limittyviä nimiöitä 0"*), ja
   *      siellä ero on suurin: rykelmä mahtuu 26,6 × 135,4 px:n alaan.
   *   2. Lähizoomissa ero on kadonnut, koska ruutupikselikatto
   *      (vartio 1) kutistaa nimiöt niin pieniksi, että sovittelu
   *      mahtuu latomaan nekin limittymättä — mitattu: 0 paria
   *      kummallakin. Se EI ole vastakokeen epäonnistuminen vaan
   *      katon ansio, ja siksi vastakoe mittaa sen näkymän, jossa
   *      ryhmityksellä on oikeasti tehtävä.
   * Lähizoomin luvut jäävät INFO-riveiksi.
   */
  const limitysparit = (mit) => {
    const laatikot = rykelmanLaatikot(mit);
    let parit = 0;
    for (let i = 0; i < laatikot.length; i += 1) {
      for (let j = i + 1; j < laatikot.length; j += 1) {
        if (limittyy(laatikot[i], laatikot[j])) parit += 1;
      }
    }
    return parit;
  };
  const paritSaapuen = limitysparit(saapuen);
  const paritLahella = limitysparit(m);
  tieto(`${ruutu.nimi} · rykelmän limittyvät nimiöparit`,
    `saapuen ${paritSaapuen}, lähizoomissa ${paritLahella}`);
  const vastakoe = await avaaSivu(ruutu, { ryhmitys: false });
  const vSaapuen = await mittaa(vastakoe.sivu);
  const vParitSaapuen = limitysparit(vSaapuen);
  await zoomaaPariisiin(vastakoe.sivu, ZOOMIPORTAAT);
  const v = await mittaa(vastakoe.sivu);
  tieto(`${ruutu.nimi} · vastakoe ilman ryhmitystä`,
    `saapuen limityspareja ${vParitSaapuen} (aihemerkkejä ${vSaapuen.aihemerkit.length}); `
    + `lähizoomissa merkkejä ${v.merkit.length}, limityspareja ${limitysparit(v)}, `
    + `laidan yli ${laidanYli(v).length}`);
  vaadi(`3c. VASTAKOE ${ruutu.nimi}: ilman ryhmitystä rykelmän nimiöt `
    + 'limittyvät saapumisnäkymässä',
    vSaapuen.aihemerkit.length === 0 && vParitSaapuen > paritSaapuen,
    `limityspareja ${vParitSaapuen} (ryhmityksen kanssa ${paritSaapuen}), `
    + `aihemerkkejä ${vSaapuen.aihemerkit.length}`);
  await kaappaa(vastakoe.sivu, `pariisi-lahizoom-ilman-ryhmitysta-${ruutu.w}.png`);
  await vastakoe.ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
