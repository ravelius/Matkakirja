/*
 * Savuke: ELÄINTÄKY — maan eläin kartalla, kortti ja löytöpalkkio
 * (js/elaintaky.js, js/packs/elaintakyt.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA. Eläintäky on kolmas täkykoneisto eikä
 * kumpikaan vanhoista testeistä osu siihen: fokusvirran savuke ajaa
 * kaupungin annostelukulkua ja täkyportin savuke maapoolin pisteitä,
 * kun taas eläintäky on kartan oma kerros, joka ei tunne kaupunkia
 * lainkaan. Datatesti (tests/elaintakyt.test.mjs) vartioi paikat ja
 * kuvat, mutta ei sitä, syntyykö merkki ruudulle tai maksetaanko
 * palkkio kahdesti — ja juuri palkkion tuplaus olisi vika, jota kukaan
 * ei huomaa ennen kuin punnat eivät täsmää.
 *
 * VARTIOT:
 *   1. MERKIT KARTALLA. Katselutilan Euroopan laudalla kaikki maan
 *      tunnistavat eläintäyt ovat kartan omassa kerroksessa, ja
 *      jokaisen osuma-alue on sormen mitta (≥ 44 px).
 *   2. KORTTI AUKEAA MERKISTÄ, ja siinä on kaanoniteksti, otsikko ja
 *      eläinkuva — kuvan osoite on repon oma assets/elaimet/-tiedosto,
 *      jota EI ole palvelutyöntekijän esilatauksessa.
 *   3. PALKKIO KIRJAUTUU KERRAN. Ensimmäinen avaus kasvattaa
 *      matkakassaa 20 punnalla; toinen avaus ei kasvata sitä
 *      pennilläkään, ja kortti kertoo eläimen jo löytyneen. Merkki jää
 *      kartalle vaimeana.
 *   4. YLEISKUVA ON TYHJÄ. Maailmankartan yleiskuvassa kerros on
 *      piilossa (29 merkkiä peukalonkynnen kokoisessa Euroopassa olisi
 *      ryteikkö) ja lähennettäessä merkit palaavat.
 *
 * Peli istutetaan kaupunkiin pelitallenteen kautta, kuten muissakin
 * savukkeissa: lentoa ei voi odottaa.
 */
import http from 'node:http';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ELAINTAKY_PALKKIO } from '../../js/elaintaky.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset/elaintakyt';
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

mkdirSync(KAAPPAUKSET, { recursive: true });

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/** Pelitallenne: Fogg seisoo annetun laudan annetussa kaupungissa. */
function tallenneKaupunkiin(lauta, id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: packById(lauta),
    seed: 11,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi sivu valmiiksi ladattuna annettuun kaupunkiin. */
async function avaaSivu(lauta, kaupunki) {
  const ctx = await selain.newContext({
    viewport: { width: 1100, height: 900 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, tallenneKaupunkiin(lauta, kaupunki));
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ: kontin selain ei pääse ämpäriin
   * eikä Commonsiin. Eläinkuvat tulevat repon omasta kansiosta eivätkä
   * kulje tämän kautta — juuri se on kuvien koe.
   */
  const PIKSELI = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  return sivu;
}

/** Kartan eläinmerkit: maa, vaimennus, ruutupaikka ja osuma-alueen koko. */
const merkit = (sivu) => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kerros = ui.elaintakyKerros;
  const piilossa = Boolean(kerros?.classList.contains('elaintakyt-piilossa'));
  const ruutu = { w: window.innerWidth, h: window.innerHeight };
  const rivit = [...(kerros?.querySelectorAll('.elaintaky-merkki') ?? [])].map((g) => {
    const osuma = g.querySelector('.elaintaky-osuma');
    const r = osuma?.getBoundingClientRect();
    return {
      nimi: g.getAttribute('aria-label') ?? '',
      lunastettu: g.classList.contains('lunastettu'),
      symboleita: g.querySelectorAll('.elaintaky-symboli image, .elaintaky-symboli path').length,
      lapimitta: r?.width ?? 0,
      keski: r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null,
      ruudulla: Boolean(r && r.width > 0 && r.left > 40 && r.top > 40
        && r.right < ruutu.w - 40 && r.bottom < ruutu.h - 40),
    };
  });
  return { piilossa, rivit };
});

/** Auki olevan eläinkortin sisältö, tai null. */
const kortti = (sivu) => sivu.evaluate(() => {
  const k = document.querySelector('.elaintaky-kortti');
  if (!k) return null;
  return {
    ylarivi: k.querySelector('.fokusnosto-ylarivi')?.textContent ?? '',
    otsikko: k.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    teksti: [...k.querySelectorAll('.fokusnosto-teksti p')]
      .map((p) => (p.textContent ?? '').trim()).join(' '),
    kuva: k.querySelector('.elaintaky-kuva img')?.getAttribute('src') ?? '',
    kuvaLatautui: Boolean(k.querySelector('.elaintaky-kuva img')?.naturalWidth),
    kuvaPiilossa: Boolean(k.querySelector('.elaintaky-kuva')?.hidden),
    palkkio: k.querySelector('.elaintaky-palkkio')?.textContent ?? '',
    vanha: Boolean(k.querySelector('.elaintaky-palkkio-vanha')),
  };
});

const rahat = (sivu) => sivu.evaluate(() => window.matkakirja.ui.game.player.money);

/* --- 1: merkit kartalla (Euroopan lauta, koko lauta näkyvissä) --- */

const eu = await avaaSivu('europe', 'helsinki');
const kartalla = await merkit(eu);
/*
 * 27 EIKÄ 29, JA SE ON OIKEIN. Euroopan lauta on lon −11…41, joten
 * Vanjärven kissa (lon 43) jää sen itäpuolelle ja Islannin lunni
 * (lon −19,4) länsipuolelle. Kumpikin jätetään piirtämättä tällä
 * laudalla (js/elaintaky.js elaintakyLaudalla) — luku on tässä
 * tarkka, jotta hiljainen katoaminen ei mene läpi kumpaankaan
 * suuntaan.
 */
vaadi('eläinmerkit ovat kartan omassa kerroksessa',
  kartalla.rivit.length === 27 && !kartalla.piilossa,
  `${kartalla.rivit.length} merkkiä, piilossa=${kartalla.piilossa}`);
vaadi('laudan ulkopuolelle jäävät täyt eivät piirry',
  !kartalla.rivit.some((m) => /Turkki|Islanti/.test(m.nimi)),
  JSON.stringify(kartalla.rivit.map((m) => m.nimi)));
vaadi('jokaisella merkillä on kaiverrettu eläinsymboli',
  kartalla.rivit.every((m) => m.symboleita > 0),
  JSON.stringify(kartalla.rivit.filter((m) => !m.symboleita).map((m) => m.nimi)));
vaadi('jokaisella merkillä on maan ja eläimen nimilappu',
  kartalla.rivit.every((m) => /.+: .+/.test(m.nimi)),
  JSON.stringify(kartalla.rivit.slice(0, 3).map((m) => m.nimi)));
vaadi('osuma-alue on sormen mitta (≥44 px)',
  kartalla.rivit.every((m) => m.lapimitta >= 43.5),
  JSON.stringify(kartalla.rivit.map((m) => Math.round(m.lapimitta)).slice(0, 6)));
vaadi('yksikään merkki ei ole vielä lunastettu',
  kartalla.rivit.every((m) => !m.lunastettu), 'uusi peli');

/* --- 2: kortti aukeaa merkistä, kuvineen ja kaanonteksteineen --- */

const kohde = kartalla.rivit.find((m) => m.ruudulla && m.keski);
vaadi('ainakin yksi merkki on ruudulla napautettavissa',
  Boolean(kohde), JSON.stringify(kartalla.rivit.map((m) => m.ruudulla)));
const rahatEnnen = await rahat(eu);
await eu.mouse.click(Math.round(kohde.keski.x), Math.round(kohde.keski.y));
await eu.waitForTimeout(900);
const avattu = await kortti(eu);
vaadi('merkin napautus avaa eläinkortin',
  Boolean(avattu?.otsikko?.length), JSON.stringify(avattu));
vaadi('kortissa on kaanonteksti eikä pelkkä otsikko',
  (avattu?.teksti?.length ?? 0) > 150, `${avattu?.teksti?.length ?? 0} merkkiä`);
vaadi('kortin ylärivi kertoo lähteen (Livian eläinkirja)',
  avattu?.ylarivi === 'Livian eläinkirja', avattu?.ylarivi);
vaadi('kortissa on repon oma eläinkuva ja se latautui',
  /^assets\/elaimet\/elain-[a-z]{3}\.jpg$/.test(avattu?.kuva ?? '')
  && avattu?.kuvaLatautui && !avattu?.kuvaPiilossa,
  `${avattu?.kuva} latautui=${avattu?.kuvaLatautui}`);

await eu.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-kortti.png') });

/* --- 3: palkkio kirjautuu kerran --- */

const rahatJalkeen = await rahat(eu);
vaadi(`ensimmäinen avaus maksaa ${ELAINTAKY_PALKKIO} puntaa`,
  rahatJalkeen === rahatEnnen + ELAINTAKY_PALKKIO,
  `${rahatEnnen} → ${rahatJalkeen}`);
vaadi('kortti kertoo löytöpalkkion',
  (avattu?.palkkio ?? '').includes(String(ELAINTAKY_PALKKIO)) && !avattu?.vanha,
  avattu?.palkkio);

await eu.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await eu.waitForTimeout(600);
const lunastuksenJalkeen = await merkit(eu);
const sama = lunastuksenJalkeen.rivit.find((m) => m.nimi === kohde.nimi);
vaadi('lunastettu merkki jää kartalle vaimeana',
  Boolean(sama?.lunastettu), JSON.stringify(sama));

await eu.mouse.click(Math.round(kohde.keski.x), Math.round(kohde.keski.y));
await eu.waitForTimeout(900);
const uudelleen = await kortti(eu);
vaadi('toinen napautus avaa saman kortin uudelleen',
  uudelleen?.otsikko === avattu?.otsikko, `${uudelleen?.otsikko} vs ${avattu?.otsikko}`);
vaadi('toinen napautus ei tuplaa palkkiota',
  (await rahat(eu)) === rahatJalkeen, `${rahatJalkeen} → ${await rahat(eu)}`);
vaadi('kortti kertoo eläimen jo löytyneen',
  Boolean(uudelleen?.vanha), uudelleen?.palkkio);
await eu.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await eu.context().close();

/* --- 4: maailmankartan yleiskuvassa merkit ovat piilossa --- */

const maailma = await avaaSivu('maailmankartta', 'helsinki');
await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(-1));
await maailma.waitForTimeout(400);
await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(-1));
await maailma.waitForTimeout(1200);
const yleiskuva = await merkit(maailma);
vaadi('maailmankartan yleiskuvassa eläinmerkit ovat piilossa',
  yleiskuva.piilossa, `piilossa=${yleiskuva.piilossa}`);
for (let i = 0; i < 4; i += 1) {
  await maailma.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
  await maailma.waitForTimeout(400);
}
await maailma.waitForTimeout(900);
const lahikuva = await merkit(maailma);
/*
 * Maailmankartta on KIERTÄVÄ lauta, joten jokainen merkki piirretään
 * kahteen kiertokohtaan (ui.kiertoKohdat) — 29 maata, 58 solmua.
 * Kaikki 29 mahtuvat laudalle, myös Vanjärvi ja Islanti.
 */
vaadi('lähennettäessä merkit palaavat kartalle',
  !lahikuva.piilossa && lahikuva.rivit.length === 58,
  `piilossa=${lahikuva.piilossa}, ${lahikuva.rivit.length} merkkiä`);
await maailma.screenshot({ path: join(KAAPPAUKSET, 'elaintaky-kartta.png') });
await maailma.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
