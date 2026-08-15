/*
 * Kaupunkikartan satelliittiversio (omistajan tilaus 14.8.2026:
 * kaupunkikartalle vipu, joka vaihtaa piirretyn kartan
 * satelliittinäkymäksi).
 *
 *   node tools/hae-satelliittikartat.mjs berliini [kaupunki ...]
 *
 * Hakee EOX:n Sentinel-2 cloudless -WMS:stä pilvettömän satelliitti-
 * kuvan TÄSMÄLLEEN samasta rajauksesta kuin piirretty kartta ja
 * tallentaa sen tiedostoon assets/kartat/<kaupunki>-satelliitti.jpg.
 *
 * --- miksi sama rajaus ja sama kuvasuhde ---
 *
 * Lehti asemoi kohdepisteet prosentteina rajauksesta (maakartat.js:n
 * karttapiste), ei kuvan sisällöstä. Kun satelliittikuva pyydetään
 * samalla rajauksella JA samassa kuvasuhteessa kuin piirretty PNG,
 * numeroympyrät, selitteet ja mittajana osuvat molemmissa näkymissä
 * samaan paikkaan — vipu vaihtaa vain taustan. Kuvasuhde luetaan
 * siksi suoraan piirretystä PNG:stä (IHDR-lohko) eikä lasketa
 * asteista: piirtäjä tekee leveysasteen mukaisen cos-korjauksen, ja
 * pelkistä asteista laskettu suhde venyttäisi satelliittikuvan
 * pystysuunnassa puolitoistakertaiseksi.
 *
 * Leveys on 3200 pikseliä eli kaksi kertaa piirretyn kartan leveys
 * (omistajan palaute 14.8.2026: "satelliittikuva oli vähän
 * suttuinen"). Kohdekartta on zoomattava (ui.js), joten kuvaa
 * katsotaan myös kolminkertaisena — 1600 pikselillä zoomi näytti
 * selaimen venytyksen eikä kuvaa.
 *
 * TÄMÄ EI TEE KUVASTA TERÄVÄÄ MITEN SYVÄLLE TAHANSA. s2cloudless-
 * aineiston pohjaresoluutio on 10 metriä/pikseli, eli Berliinin
 * 10,2 km:n rajaus sisältää noin 1 020 pikselin verran oikeaa dataa.
 * Sen yli mennessä palvelin tulkitsee välipikselit, ja kuva pehmenee
 * — perusnäkymä terävöityy selvästi, syvä zoomi ei. Se on datalähteen
 * raja, ei hakuparametri.
 *
 * Leveyden nostaminen kannattaa silti, koska se pakottaa palvelimen
 * hakemaan ruudun laattapyramidin tarkimmalta tasolta ja koska
 * yhtenäinen JPEG-pakkaus tekee vähemmän tuhoa kuin selaimen
 * venytys pienestä kuvasta.
 *
 * TARKISTA TIEDOSTOKOKO. JPEG nelinkertaistuu pikselimäärän mukana;
 * jos kuva ylittää ~1,5 Mt, sitä ei pidä viedä sw.js:n SHELL-listaan
 * sellaisenaan (jokainen asennus lataa listan kokonaan) — pakkaa se
 * silloin uudelleen tools/pakkaa-jpeg.mjs:llä.
 *
 * --- kainalokartat satelliittikuvaan (15.8.2026) ---
 *
 * Jos kaupungilla on kainalokartta (maakartat.js:n kainalot-lohko),
 * työkalu hakee JOKAISELLE kainalolle oman WMS-ruudun ja komposoi ne
 * päähaun päälle samoille prosenttipaikoille, joihin piirtäjä piirtää
 * omansa. Ilman tätä satelliittinäkymä rikkoutuisi: Helsingissä
 * Suomenlinnan kainalon paikalla olisi pelkkää avomerta, ja kohde 7 —
 * jonka karttapiste() asemoi kainalon sisään — kelluisi tyhjällä
 * merellä. Kainalo EI ole koriste vaan osa kohteiden koordinaatistoa,
 * joten sen on oltava molemmissa näkymissä.
 *
 * Mitat luetaan maakartat.js:n kainalosta (x, y, leveys, korkeus)
 * eikä lasketa tässä uudelleen. Ne ovat prosentteja, ja piirtäjä on
 * laskenut korkeuden kainalon omasta kuvasuhteesta — sama luku, kaksi
 * käyttäjää, joten ruudut osuvat päällekkäin pikselilleen.
 *
 * Komposointi tehdään pelin omalla Chromiumilla samaan tapaan kuin
 * piirtäjän rasterointi (tools/piirra-kaupunkikartta.mjs): kuvat
 * ladotaan HTML-sivulle ja sivusta otetaan JPEG-kaappaus. Se on syy
 * siihen, että kainalollisen kaupungin kuva on Chromiumin pakkaama
 * eikä WMS:n — LAATU-vakio alla.
 *
 * --- lähde ja lisenssi ---
 *
 * Sentinel-2 cloudless 2024 (s2maps.eu, EOX): muokattua Copernicus
 * Sentinel -dataa, ilmainen ei-kaupalliseen käyttöön nimeämisellä.
 * Lähderivi peliin on LAHDERIVI-vakiossa alla — se kuuluu kirjata
 * maakartat.js:n satelliittiLahde-kenttään. Avaimia ei tarvita.
 *
 * KATSO TUOTETTU KUVA SILMIN (Read) ennen kuin otat sen käyttöön.
 * WMS palauttaa toisinaan pilvisen tai värivääristyneen ruudun, eikä
 * työkalu näe sitä. Vertaa myös piirrettyyn karttaan: joen mutkien ja
 * ratapihan pitää osua samaan kohtaan.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXY=1
 * (ks. tools/hae-yonkartta.mjs). Skripti käynnistää itsensä
 * uudelleen, jos muuttuja puuttuu.
 */
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const PALVELIN = 'https://tiles.maps.eox.at/wms';
const TASO = 's2cloudless-2024';
const LEVEYS = 3200;
// Kohtelias tauko peräkkäisten hakujen välissä: yksi kaupunki on yksi
// pyyntö, mutta skaalatessa niitä tulee kymmeniä samalta palvelimelta.
const TAUKO_MS = 3000;
const LAHDERIVI = 'Sentinel-2 cloudless 2024 — s2maps.eu, EOX '
  + '(muokattua Copernicus Sentinel -dataa)';
/*
 * Kainalollisen kuvan pakkaa Chromium, ei WMS. 82 on mitattu eikä
 * arvattu: Helsinki on tällä 1,1 Mt eli SHELL-listan 1,5 Mt:n rajan
 * alla, ja satelliittikuvassa ei ole teräviä reunoja, joissa JPEGin
 * artefaktit näkyisivät. Jos jokin kaupunki ylittää rajan, laske tätä
 * ennen kuin kajoat leveyteen — leveys on se, joka pitää zoomin
 * terävänä.
 */
const LAATU = 82;
// Kainalon reunus samoissa sävyissä kuin piirtäjän oma (VESIREUNA,
// 2,5 px 1600:n levyisellä kuvalla) mutta tämän kuvan mittakaavassa.
const REUNUS = '#b99a68';

/** Piirretyn PNG:n mitat IHDR-lohkosta ilman kirjastoja. */
function pngMitat(polku) {
  const tavut = readFileSync(polku);
  if (tavut.readUInt32BE(0) !== 0x89504e47) throw new Error(`${polku} ei ole PNG`);
  return { leveys: tavut.readUInt32BE(16), korkeus: tavut.readUInt32BE(20) };
}

/**
 * WMS 1.1.1 + EPSG:4326: bbox on lon,lat-järjestyksessä
 * (länsi,etelä,itä,pohjoinen).
 */
function wmsOsoite(rajat, leveys, korkeus) {
  const p = new URLSearchParams({
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.1',
    layers: TASO,
    bbox: [rajat.lansi, rajat.etela, rajat.ita, rajat.pohjoinen].join(','),
    srs: 'EPSG:4326',
    width: String(leveys),
    height: String(korkeus),
    format: 'image/jpeg',
  });
  return `${PALVELIN}?${p}`;
}

/** Yksi WMS-ruutu tavuina. Heittää, jos vastaus ei ole JPEG. */
async function haeRuutu(id, rajat, leveys, korkeus) {
  const vastaus = await fetch(wmsOsoite(rajat, leveys, korkeus));
  if (!vastaus.ok) throw new Error(`${id}: WMS vastasi ${vastaus.status}`);
  const tavut = Buffer.from(await vastaus.arrayBuffer());
  /*
   * WMS palauttaa virheensä XML:nä statuksella 200, joten pelkkä ok
   * ei riitä — tarkistetaan JPEGin taikatavut. Muuten repoon
   * tallentuisi virheilmoitus .jpg-päätteellä.
   */
  if (tavut[0] !== 0xff || tavut[1] !== 0xd8) {
    throw new Error(`${id}: vastaus ei ole JPEG — ${tavut.subarray(0, 200)}`);
  }
  return tavut;
}

/*
 * Latoo päähaun ja kainaloruudut yhdeksi JPEGiksi pelin Chromiumilla.
 *
 * Paikat ovat prosentteja, koska piirtäjä käyttää samoja prosentteja —
 * silloin kahden näkymän kainalot ovat päällekkäin riippumatta siitä,
 * että satelliittikuva on kaksi kertaa piirretyn kokoinen.
 *
 * NODE_PATH kuten piirtäjässä: playwright ei ole pelin riippuvuus vaan
 * ympäristön (/opt/node22/lib/node_modules).
 */
function komposoi(pohja, ruudut, leveys, korkeus, kohde) {
  const paja = mkdtempSync(join(tmpdir(), 'satelliitti-'));
  try {
    const pohjaPolku = join(paja, 'pohja.jpg');
    writeFileSync(pohjaPolku, pohja);
    const palat = ruudut.map((ruutu, i) => {
      const polku = join(paja, `kainalo${i}.jpg`);
      writeFileSync(polku, ruutu.tavut);
      // Reunus ja pyöristys piirtäjän mitoissa tämän kuvan
      // mittakaavaan: 2,5 px ja rx 6 kuvalla, jonka leveys on 1600.
      const viiva = (2.5 * leveys) / 1600;
      const pyoristys = (6 * leveys) / 1600;
      return `<img src="file://${polku}" style="position:absolute;`
        + `left:${ruutu.x}%;top:${ruutu.y}%;width:${ruutu.leveys}%;height:${ruutu.korkeus}%;`
        + `box-sizing:border-box;border:${viiva}px solid ${REUNUS};border-radius:${pyoristys}px">`;
    }).join('');
    const html = join(paja, 'kooste.html');
    writeFileSync(html, `<!doctype html><style>html,body{margin:0}`
      + `#pohja{position:relative;width:${leveys}px;height:${korkeus}px}`
      + `#pohja>img{display:block}</style>`
      + `<div id="pohja"><img src="file://${pohjaPolku}" style="width:100%;height:100%">${palat}</div>`);
    const skripti = `
const { chromium } = require('playwright');
(async () => {
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await (await selain.newContext({
    viewport: { width: ${leveys}, height: ${korkeus} }, deviceScaleFactor: 1,
  })).newPage();
  await sivu.goto('file://${html}');
  await sivu.waitForLoadState('networkidle');
  await sivu.locator('#pohja').screenshot({ path: '${kohde}', type: 'jpeg', quality: ${LAATU} });
  await selain.close();
})();`;
    execFileSync('node', ['-e', skripti], {
      cwd: JUURI,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_PATH: [process.env.NODE_PATH, '/opt/node22/lib/node_modules']
          .filter(Boolean).join(':'),
      },
    });
  } finally {
    rmSync(paja, { recursive: true, force: true });
  }
}

async function haeKaupunki(id) {
  const kartta = KAUPUNKIKARTAT[id];
  if (!kartta) throw new Error(`tuntematon kaupunki: ${id}`);
  if (!kartta.rajat) throw new Error(`${id}: rajat puuttuvat (laea tai kainalokartta?)`);
  if (!kartta.polku) throw new Error(`${id}: ei piirrettyä PNG:tä (polku puuttuu)`);

  const piirretty = pngMitat(join(JUURI, kartta.polku));
  const korkeus = Math.round((LEVEYS * piirretty.korkeus) / piirretty.leveys);
  const tavut = await haeRuutu(id, kartta.rajat, LEVEYS, korkeus);

  /*
   * Kainaloruudut pyydetään siinä pikselikoossa, jonka ne kuvassa
   * saavat. Pienempi haku pehmenisi venytyksessä ja isompi olisi
   * turhaa dataa — ja koska kainalo on tiukka rajaus, se on joka
   * tapauksessa s2cloudlessin 10 m/px -rajan yläpuolella (ks. yllä).
   */
  const kainalot = kartta.kainalot ?? [];
  const ruudut = [];
  for (const kainalo of kainalot) {
    await new Promise((r) => setTimeout(r, TAUKO_MS));
    ruudut.push({
      ...kainalo,
      tavut: await haeRuutu(
        id,
        kainalo.rajat,
        Math.round((kainalo.leveys / 100) * LEVEYS),
        Math.round((kainalo.korkeus / 100) * korkeus),
      ),
    });
  }

  const kohde = join(JUURI, 'assets', 'kartat', `${id}-satelliitti.jpg`);
  if (ruudut.length) komposoi(tavut, ruudut, LEVEYS, korkeus, kohde);
  else writeFileSync(kohde, tavut);
  const koko = readFileSync(kohde).length;
  const lisa = ruudut.length ? `, ${ruudut.length} kainaloa` : '';
  console.log(`${id}: ${LEVEYS} x ${korkeus} px${lisa}, ${Math.round(koko / 1024)} kt -> ${kohde}`);
  console.log(`  satelliitti: 'assets/kartat/${id}-satelliitti.jpg',`);
  console.log(`  satelliittiLahde: '${LAHDERIVI}',`);
}

const kaupungit = process.argv.slice(2);
if (kaupungit.length === 0) {
  console.error('Käyttö: node tools/hae-satelliittikartat.mjs <kaupunki> [kaupunki ...]');
  process.exit(1);
}

let virheita = 0;
for (const [i, id] of kaupungit.entries()) {
  if (i > 0) await new Promise((r) => setTimeout(r, TAUKO_MS));
  try {
    await haeKaupunki(id);
  } catch (virhe) {
    virheita += 1;
    console.error(`VIRHE ${virhe.message}`);
  }
}
console.log('\nLisää kentät KÄSIN js/packs/maakartat.js:ään ja KATSO kuva silmin.');
process.exit(virheita ? 1 : 0);
