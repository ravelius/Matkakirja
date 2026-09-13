/*
 * Savuke: VÄRILAATAT — kohdemaan värillinen topografia
 * (karttauudistus, erä 1; js/laattapyramidi.js väritaso).
 *
 *   node tools/savukkeet/savuke-varilaatat.mjs [--laatat <kansio>]
 *                                              [--ilman-rajausta] [--kuvat <kansio>]
 *
 * Omistaja 13.9.2026, sanatarkasti: *"Maan korkeuserot muutetaan
 * varilliseksi ja vedetkin nakyvat sinisena syyvyyserot huomioiden. …
 * Muiden maiden kartat ja valtion ulkopuoliset vedet ja meret
 * ennallaan ruskean savyissa. Onko se mahdollista? Siis etta vain
 * kohdemaassa on varillinen topografia nakyvissa?"*
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 *   V0  Kerros on olemassa ja rajattu Ranskaan: mittari kertoo
 *       varillisia > 0 ja variMaa === 'FRA'.
 *   V1  RANSKAN SISÄLTÄ pikseli on värillistä maata (vihreä tai
 *       ruskeanvihreä), ei seepiaa.
 *   V2  BELGIAN PUOLELTA pikseli on nykyistä seepiaruskeaa. Tämä on
 *       omistajan ehto *"muiden maiden kartat … ennallaan"*, ja se on
 *       mitattava juuri rajan takaa: värilaatta ULOTTUU Belgian yli
 *       (laatat ovat suorakaiteita maan laatikon alalla), joten vain
 *       pelin leikkuri pitää sen poissa.
 *   V3  ALUEVESI: 12 meripeninkulman sisällä Marseillen edustalla vesi
 *       on sinistä (Fablen päätös 13.9.2026).
 *   V4  AVOMERI: sama meri 40 mpk:n päässä on seepiaa.
 *   V5  Laattamäärä ei kaksinkertaistu: värilaatat + pohjan laatat
 *       enintään kaksi kertaa pohjan oma määrä.
 *
 * === VASTAKOE ON PAKOLLINEN =========================================
 *
 * `--ilman-rajausta` riisuu leikkurin kerrokselta (`clip-path` pois)
 * eikä muuta mitään muuta. Silloin V2:n ON KAADUTTAVA: Belgia on
 * värilaatan alla, ja jos se pysyy ruskeana, testi ei mittaa
 * leikkuria vaan jotain muuta. Vihreä mittari ilman tätä ajoa ei
 * kelpaa (docs/raportit/karttauudistus-suunnitelma-20260913.md luku 7).
 *
 * VERKKOON EI MENNÄ: laatat tulevat testin omasta reitityksestä
 * paikallisesta kansiosta, jonka tools/generoi-laattapyramidi.mjs on
 * kirjoittanut (`--vari FRA` ja sama alue pohjana).
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

/*
 * === TÄMÄ SAVUKE AJAA TASOKARTAN, JOKA ON PELISSÄ POIS KÄYTÖSTÄ =====
 *
 * js/ui-apurit.js VANHA_KARTTA_KAYTOSSA on `false` (omistaja 7.9.2026:
 * *"Voisiko vanhan kartan ottaa pelistä ainakin väliaikaisesti
 * kokonaan pois"*), joten peli avautuu pallolle eikä tasokartalle.
 * Väritaso (js/laattapyramidi.js) on TASOKARTAN kerros — pallolla on
 * oma laattakerroksensa (js/pallolaatat.js), johon värit ovat oma
 * eränsä.
 *
 * SAVUKE EI SIIS OHITA ITSEÄÄN vaan KÄÄNTÄÄ PORTIN AUKI omassa
 * palvelimessaan: `/js/ui-apurit.js` tarjoillaan yhdellä kirjaimella
 * muutettuna (`= true`). Muutos on VAIN testin omassa vastauksessa —
 * repossa vakio pysyy falsena, eikä tämä savuke voi siis vahingossa
 * kytkeä vanhaa karttaa peliin.
 *
 * MITÄ TÄMÄ TARKOITTAA MITTARIN LUKIJALLE: vihreä savuke todistaa,
 * että väritaso toimii tasokartalla. Se EI todista, että omistaja
 * näkee värit pelatessaan — siihen tarvitaan joko vanhan kartan paluu
 * tai värit pallon laattakerrokseen. Tämä on kirjattu erän raporttiin
 * avoimena asiana.
 */
const PORTTI_AUKI = [
  'export const VANHA_KARTTA_KAYTOSSA = false;',
  'export const VANHA_KARTTA_KAYTOSSA = true;',
];

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const LAATAT = valitsin('laatat', process.env.PYRAMIDI_LAATAT ?? '');
const ILMAN_RAJAUSTA = argv.includes('--ilman-rajausta');
const KUVAT = valitsin('kuvat', '');

if (!LAATAT || !existsSync(join(LAATAT, 'pyramidi.json'))) {
  console.error('Pilottilaattoja ei löydy. Aja ensin\n'
    + '  node tools/generoi-laattapyramidi.mjs <kansio> --data <ne> --tasot 4-7 \\\n'
    + '       --kaariminuutit 3 --alue -5.34,41.19,9.77,51.24\n'
    + '  node tools/generoi-laattapyramidi.mjs <kansio> --data <ne> --tasot 4-7 \\\n'
    + '       --kaariminuutit 3 --vari FRA\n'
    + 'ja anna kansio: --laatat <kansio> (tai PYRAMIDI_LAATAT).');
  process.exit(2);
}

/*
 * MITTAUSPISTEET ASTEINA. Jokainen on valittu niin, ettei sen päällä
 * ole kaupunkia, reittiä eikä nostoa — kartan muste veisi mittauksen
 * omaan sävyynsä. Odotus on se, mitä omistajan lause vaatii.
 */
const PISTEET = [
  {
    avain: 'ranska', lon: 2.0, lat: 47.3, odotus: 'vari-maa',
    seloste: 'Keski-Ranska (Sologne, ~120 m)',
  },
  {
    avain: 'belgia', lon: 4.6, lat: 50.6, odotus: 'seepia',
    seloste: 'Belgia (Namurin seutu, ~50 km rajasta)',
  },
  {
    avain: 'aluevesi', lon: 5.3, lat: 43.15, odotus: 'vari-vesi',
    seloste: 'Välimeri Marseillen edustalla, ~8 mpk rannasta',
  },
  {
    avain: 'avomeri', lon: 5.3, lat: 42.5, odotus: 'seepia',
    seloste: 'Välimeri ~40 mpk rannasta',
  },
];

/* Kamerakohde: laatikko laudan yksikköinä, johon kaikki neljä osuvat. */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
/*
 * LAUDAN PROJEKTIO ON LUKITTU (leveys 12000, lon0 −175, pohjoinen 76;
 * tools/generoi-laattapyramidi.mjs LAUTA). Kaava on tässä auki eikä
 * tuotuna, koska savuke ei saa tuoda pelin moduuleja Node-puolelle —
 * sivu tuo ne itse. Luvut ovat samat kolmessa paikassa, ja jos ne
 * joskus muuttuvat, tämä savuke kaatuu näkyvästi mittauspisteisiin.
 */
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const pyydetty = req.url.split('?')[0];
  const polku = join(JUURI, pyydetty === '/' ? 'index.html' : pyydetty);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  if (pyydetty === '/js/ui-apurit.js') {
    const lahde = readFileSync(polku, 'utf8');
    if (!lahde.includes(PORTTI_AUKI[0])) {
      console.error('VANHA_KARTTA_KAYTOSSA-vakiota ei löytynyt js/ui-apurit.js:stä — '
        + 'savuke ei voi avata tasokarttaa.');
      process.exit(2);
    }
    res.end(lahde.replace(PORTTI_AUKI[0], PORTTI_AUKI[1]));
    return;
  }
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**r2.dev/**', (route) => route.abort());
await sivu.route('**/julisteet/fokus/**', (route) => route.abort());
await sivu.route('**/julisteet/pyramidi/**', async (route) => {
  const url = new URL(route.request().url());
  const osa = url.pathname.split('/julisteet/pyramidi/')[1];
  // Osoitteessa on versio polun osana; pilottikansiossa laatat ovat
  // suoraan z- ja vari-kansioissa. Kokeillaan molempia.
  let tiedosto = join(LAATAT, osa);
  if (!existsSync(tiedosto) && osa.includes('/')) {
    tiedosto = join(LAATAT, osa.slice(osa.indexOf('/') + 1));
  }
  if (!existsSync(tiedosto)) { route.fulfill({ status: 404, body: 'ei' }); return; }
  route.fulfill({
    status: 200,
    contentType: osa.endsWith('.json') ? 'application/json' : 'image/webp',
    body: readFileSync(tiedosto),
  });
});

sivu.on('pageerror', (e) => console.log(`SIVUVIRHE ${e.message}`));
sivu.on('requestfailed', (r) => {
  const u = r.url();
  if (!/pyramidi|fokus|r2\.dev|workers\.dev/.test(u)) console.log(`PYYNTÖ EPÄONNISTUI ${u}`);
});
/*
 * `domcontentloaded` eikä `load`: peli hakee käynnistyessään mediaa
 * (ääniä, kuvia) ämpäristä, ja tämä savuke katkaisee ne — `load`
 * odottaisi niitä katkaisun jälkeenkin selaimen omalla aikataululla.
 * Pelin oma valmius mitataan odotuksilla, ei latautumistapahtumalla.
 */
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);
// Etusivun nappi vie lähtöpaikan valintaan (teksti on vaihtunut
// kerran: "Aloita seikkailu" -> "Valitse aloituskaupunki").
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /valitse aloituskaupunki|aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);
/*
 * PELAAJA PARIISIIN. Lähtökaupunkeja on kuusitoista (js/packs/maailma.js)
 * eikä Pariisi ole niiden joukossa, joten peli avataan Lontoosta ja
 * nappula siirretään Pariisiin kuten mittaussavukkeet tekevät: pelin
 * oma `visitCity` hoitaa saapumisen, ja ui.render latoo kartan sen
 * mukaan. Matkustaminen Lontoosta Pariisiin nopanheitoilla ei mittaisi
 * yhtään enempää väritasosta, mutta veisi kymmeniä sekunteja.
 */
const alku = await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  const p = g.player;
  p.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(p);
  window.matkakirja.ui.render();
  return { vaihe: g.phase, lauta: g.pack?.id, kaupunki: g.player?.pos?.city ?? null };
});
console.log(`lähtö: ${JSON.stringify(alku)}`);
await sivu.waitForTimeout(9000);

/*
 * KAMERA MITTAUSLAATIKKOON. Kaikki neljä pistettä on saatava samaan
 * kuvaan: yksi kuvakaappaus, yksi zoomtaso, yksi valaistus — muuten
 * mittaukset eivät olisi vertailukelpoisia keskenään.
 */
const laatikko = (() => {
  const xs = PISTEET.map((p) => lautaX(p.lon));
  const ys = PISTEET.map((p) => lautaY(p.lat));
  const x0 = Math.min(...xs) - 25;
  const x1 = Math.max(...xs) + 25;
  const y0 = Math.min(...ys) - 25;
  const y1 = Math.max(...ys) + 25;
  return {
    x: x0, y: y0, w: x1 - x0, h: y1 - y0,
  };
})();
await sivu.evaluate(async (b) => {
  await window.matkakirja.ui.kartta.ajaKamera({ bbox: b }, { kesto: 0, pakota: true });
}, laatikko);
await sivu.waitForTimeout(6000);

/*
 * TEKSTIKORTIT POIS MITTAUKSEN AJAKSI. Saapumiskortti (`section.intro`)
 * ja faktapalsta (`aside.rail`) ovat käyttöliittymää kartan PÄÄLLÄ, ja
 * puhelinkoossa ne peittävät ruudun ylimmän kolmanneksen — juuri sen,
 * missä Belgia on. Ilman tätä mittaus luki kortin pergamenttia ja
 * ilmoitti sen seepiaksi: V2 meni läpi myös leikkuri riisuttuna, eikä
 * vastakoe olisi voinut kaataa sitä.
 *
 * `visibility` EIKÄ `display`: näkyvyyden piilotus ei muuta asettelua,
 * joten karttapaneeli pysyy samankokoisena eikä kamera siirry kesken
 * mittauksen. `elementFromPoint` ohittaa piilotetun elementin, joten
 * alla oleva vartio näkee kartan.
 */
await sivu.evaluate(() => {
  for (const e of document.querySelectorAll('section.intro, aside.rail')) {
    e.style.visibility = 'hidden';
  }
});
await sivu.waitForTimeout(400);

if (ILMAN_RAJAUSTA) {
  /*
   * VASTAKOE: leikkuri pois, ei mitään muuta. Kerroksen laatat ovat
   * paikallaan; ainoa ero on, ettei mikään rajaa niitä Ranskaan.
   */
  const poistettu = await sivu.evaluate(() => {
    const k = document.querySelector('.pyramidi-varitaso');
    if (!k || !k.getAttribute('clip-path')) return false;
    k.removeAttribute('clip-path');
    return true;
  });
  console.log(`VASTAKOE: clip-path riisuttu kerrokselta — ${poistettu ? 'kyllä' : 'EI LÖYTYNYT'}`);
  await sivu.waitForTimeout(1500);
}

const mitat = await sivu.evaluate(() => globalThis.__pyramidinMittarit?.() ?? null);

/*
 * PIKSELIN LUKU. Kuvakaappaus tulee laitepikseleinä, ja mittauspisteet
 * ovat LAUDAN yksikköinä — muunnos tehdään pyramidikerroksen omalla
 * `getScreenCTM`illa, joka on täsmälleen se matriisi, jolla selain
 * asettaa laatat ruudulle. Erillinen kaava olisi viides paikka, jossa
 * projektio elää.
 *
 * MEDIAANI YHDEKSÄSTÄ EIKÄ YKSI PIKSELI: paperin rae ja pigmentti
 * heittelevät yksittäistä pikseliä kymmenen sävyä, ja yksi mustepiste
 * (jokiviiva, asteverkko) osuisi kohdalle sattumalta. Mediaani kanavaa
 * kohti on immuuni molemmille.
 */
/*
 * KUVAKAAPPAUS CDP:LLÄ EIKÄ `page.screenshot`illa. Playwrightin oma
 * kaappaus odottaa ensin `document.fonts.ready`n, ja kartalla se jää
 * odottamaan loputtomiin (mitattu: 30 s aikakatkaisu joka ajossa).
 * `Page.captureScreenshot` ottaa kuvan siitä, mitä ruudulla juuri nyt
 * on — ja juuri se on se, mitä tämä savuke mittaa.
 */
const cdp = await ctx.newCDPSession(sivu);
const kuva = Buffer.from(
  (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
);
const mittaukset = await sivu.evaluate(async ({ png, pisteet }) => {
  const img = new Image();
  img.src = `data:image/png;base64,${png}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const kerros = window.matkakirja.ui.pyramidiKerros;
  const m = kerros.getScreenCTM();
  const dpr = img.width / window.innerWidth;
  const ulos = [];
  for (const p of pisteet) {
    const sx = (m.a * p.bx + m.c * p.by + m.e) * dpr;
    const sy = (m.b * p.bx + m.d * p.by + m.f) * dpr;
    const x = Math.round(sx);
    const y = Math.round(sy);
    if (x < 2 || y < 2 || x >= img.width - 2 || y >= img.height - 2) {
      ulos.push({ ...p, ruudulla: false, syy: 'ruudun ulkopuolella' });
      continue;
    }
    /*
     * MITATAANKO VARMASTI KARTTAA? Kartan päällä on käyttöliittymää —
     * saapumiskortti, mitat, kartuutsi, Pulu — ja pikseli niiden päältä
     * kertoisi paneelin sävyn eikä maaston. Ensimmäisessä ajossa juuri
     * niin kävi: Belgian piste osui saapumiskortin pergamenttiin, ja
     * väite meni läpi silloinkin kun leikkuri oli riisuttu. Piste
     * hyväksytään vain, jos ruudun se kohta kuuluu karttapaneeliin.
     */
    const osuma = document.elementFromPoint(sx / dpr, sy / dpr);
    const kartalla = osuma && osuma.closest && osuma.closest('.map-pane')
      && !osuma.closest('section.intro, aside.rail, .fokusmitat, .karttaselite');
    if (!kartalla) {
      // Esivanhempien ketju viestiin: ilman sitä "ei kartalla" ei kerro
      // mikä paneeli oli tiellä, ja korjaus olisi arvailua.
      const ketju = [];
      for (let n = osuma; n && n !== document.body && ketju.length < 4; n = n.parentElement) {
        ketju.push(`${n.tagName.toLowerCase()}.${n.className || ''}`);
      }
      ulos.push({
        ...p, ruudulla: false, syy: `päällä ${ketju.join(' < ') || 'ei mitään'}`,
      });
      continue;
    }
    const kanavat = [[], [], []];
    for (let dy = -4; dy <= 4; dy += 1) {
      for (let dx = -4; dx <= 4; dx += 1) {
        const d = g.getImageData(x + dx, y + dy, 1, 1).data;
        kanavat[0].push(d[0]); kanavat[1].push(d[1]); kanavat[2].push(d[2]);
      }
    }
    const med = kanavat.map((k) => k.sort((a, b) => a - b)[Math.floor(k.length / 2)]);
    ulos.push({
      ...p, ruudulla: true, x, y, r: med[0], g: med[1], b: med[2],
    });
  }
  return ulos;
}, {
  png: kuva.toString('base64'),
  pisteet: PISTEET.map((p) => ({ ...p, bx: lautaX(p.lon), by: lautaY(p.lat) })),
});

if (KUVAT) {
  mkdirSync(KUVAT, { recursive: true });
  const nimi = join(KUVAT, `varilaatat${ILMAN_RAJAUSTA ? '-ilman-rajausta' : ''}.png`);
  writeFileSync(nimi, kuva);
  console.log(`kuva: ${nimi}`);
}

/*
 * LUOKITTELU ON KOLME EHTOA, JA NE OVAT TOISENSA POISSULKEVIA.
 *
 *   vari-vesi  SININEN on suurin kanava: b > g ja b > r. Matala
 *              rannikkovesi on 176,214,240 — myös sen vihreä on
 *              punaista suurempi, joten sininen on testattava ENSIN
 *              tai vesi luettaisiin maaksi.
 *   vari-maa   VIHREÄ on suurin: g > r ja g > b.
 *   seepia     LÄMMIN: r on suurin ja r > b + 12.
 *
 * SEEPIA EI VOI OSUA KAHTEEN ENSIMMÄISEEN. Sekä hypsometrinen asteikko
 * (piirto.js ASTEIKKO) että meren syvyysramppi (SYVYYS) ovat joka
 * portaallaan r > g > b — punainen on aina suurin — joten yksikään
 * seepiapikseli ei voi lukeutua värilliseksi. Ehdot ovat siis toisensa
 * poissulkevat eivätkä kynnyksen varassa.
 */
const luokka = ({ r, g, b }) => {
  if (b > g && b > r) return 'vari-vesi';
  if (g > r && g > b) return 'vari-maa';
  if (r >= g && r > b + 12) return 'seepia';
  return 'muu';
};

console.log('\n--- MITATUT PIKSELIT ---');
for (const p of mittaukset) {
  if (!p.ruudulla) {
    console.log(`  ${p.avain.padEnd(9)} EI KARTALLA (${p.syy}) — ${p.seloste}`);
    continue;
  }
  console.log(`  ${p.avain.padEnd(9)} rgb(${p.r},${p.g},${p.b})  ${luokka(p).padEnd(9)} `
    + `(odotus ${p.odotus})  ruutu ${p.x},${p.y} — ${p.seloste}`);
}
console.log(`\n  mittarit: taso z${mitat?.taso} · pohjalaattoja ${mitat?.nakymassa} `
  + `· värilaattoja ${mitat?.varillisia} · väritaso rajattu maahan ${mitat?.variMaa}`);

console.log('\n--- VÄITTEET ---');
vaadi('V0 väritaso on kerroksessa ja rajattu Ranskaan',
  mitat?.varillisia > 0 && mitat?.variMaa === 'FRA',
  `varillisia ${mitat?.varillisia}, variMaa ${mitat?.variMaa}`);

for (const p of mittaukset) {
  const nimet = {
    ranska: 'V1 Ranskan sisältä pikseli on värillistä maata',
    belgia: 'V2 Belgian puolelta pikseli on seepiaa',
    aluevesi: 'V3 aluevedet (12 mpk) ovat sinisiä',
    avomeri: 'V4 avomeri on seepiaa',
  };
  vaadi(nimet[p.avain], p.ruudulla && luokka(p) === p.odotus,
    p.ruudulla ? `rgb(${p.r},${p.g},${p.b}) on ${luokka(p)}, odotettiin ${p.odotus}`
      : `piste ei ollut kartalla: ${p.syy}`);
}

vaadi('V5 laattamäärä ei kaksinkertaistu',
  mitat && (mitat.nakymassa + mitat.varillisia) <= 2 * mitat.nakymassa,
  `pohja ${mitat?.nakymassa} + väri ${mitat?.varillisia}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
