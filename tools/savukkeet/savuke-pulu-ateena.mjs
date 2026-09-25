/*
 * Savuke: PULUN UUSI RYTMI ATEENASSA (omistaja 7.9.2026).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pulu-ateena.mjs [kuvakansio]
 *
 * Raamattu, PULUN UUSI RYTMI ATEENASSA. Ensimmäisellä saapumisella
 * koskaan kulku on kolmiosainen, eikä yksikään yksikkötesti näe sitä:
 * kuplat, luenta ja lehden vinkki elävät oikeassa DOMissa ja oikeissa
 * ajastimissa.
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 *   R1  KAKSI KUPLAA ENNEN LUENTAA. Perillä ruudulle tulevat pulun
 *       kaksi ensimmäistä repliikkiä ("Kääk, apua! …" ja "Tervetuloa
 *       Ateenaan. …") ENNEN kuin isoisän luenta on alkanut.
 *   R2  PULU ON HILJAA LUENNAN AJAN. Niin kauan kuin luenta soi,
 *       kuplia ei tule lisää.
 *   R3  KOLMAS KUPLA LUENNAN JÄLKEEN: "Kantsuu klikata Ateenaa
 *       kartalta, jos meinaat löytää aarteen."
 *   R4  LEHDEN VINKKI ILMAN RUKSIA: kaupunkilehden avautuessa pulu
 *       sanoo "Etsi lehdestä aarrekysymys." eikä kuplassa ole
 *       valintaruutua.
 *   R5  VINKKI VAIN KERRAN: toinen lehden avaus on vinkitön ja
 *       kertalippu on laitteen muistissa.
 *
 * ILMAN LUENTAA (kertoja ei käynnisty kontissa) R1 ja R3 mitataan yhä
 * järjestyksenä — kolmas kupla tulee kahden ensimmäisen jälkeen omalla
 * varaviiveellään — ja R2 raportoidaan INFO-rivinä. Savuke ei siis
 * kaadu ääniympäristöön, mutta kertoo sen ääneen.
 *
 * VERKKO: laatat ja äänet tulevat ämpäristä Noden kautta (CLAUDE.md:
 * NODE_USE_ENV_PROXY=1), kuten savuke-avauslennossa. Ilman ämpäriä
 * luentaa ei ole, ja savuke ajaa varapolun.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
/*
 * KUVAT VAIN PYYDETTÄESSÄ. Kaappaukset ovat megatavun kokoisia eivätkä
 * kuulu repoon ilman erillistä syytä (sama kaava kuin
 * savuke-pulu-paikassa): ensimmäinen argumentti on kuvakansio, ja ilman
 * sitä savuke ajaa vartionsa kuvaamatta mitään.
 */
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const kuva = async (nimi) => {
  if (!KUVAKANSIO) return;
  await sivu.screenshot({ path: join(KUVAKANSIO, `savuke-pulu-ateena-${nimi}.png`), scale: 'css' });
};

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = req.url.split('?')[0];
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/** Omistajan sanatarkat repliikit (js/livia.js livianPaljastus). */
const KUPLA1 = 'Kääk, apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa.';
const KUPLA2 = 'Tervetuloa Ateenaan. Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta.';
const KUPLA3 = 'Kantsuu klikata Ateenaa kartalta, jos meinaat löytää aarteen.';
const VINKKI = 'Etsi lehdestä aarrekysymys.';

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (v) => virheet.push(String(v.message ?? v)));

/*
 * ÄMPÄRI NODEN KAUTTA: kontin selain ei pääse verkkoon, Noden fetch
 * pääsee. Sama kaava kuin savuke-avauslennossa; ilman tätä luentaa ei
 * ole eikä R2 mittaa mitään.
 */
const valimuisti = new Map();
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const url = route.request().url();
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: Buffer.from(await v.arrayBuffer()),
    })).catch((e) => ({ status: 502, contentType: 'text/plain', body: Buffer.from(String(e)) })));
  }
  route.fulfill(await valimuisti.get(url));
});
await sivu.route('**workers.dev/**', (route) => route.abort());

/*
 * MITTAUS TAPAHTUMISTA, EI KELLOSTA. Kontin selain kuristaa ajastimet
 * (mitattu: 200 ms:n setInterval kävi kolmen sekunnin välein), joten
 * näytteenotto ei kelpaa: kupla ehtisi tulla ja mennä kahden näytteen
 * välissä. Kuplat luetaan siksi MutationObserverista ja luenta
 * Audio-olion play/ended-tapahtumista — kumpikaan ei ole ajastimen
 * varassa. Molemmat kirjataan ENNEN moduulien latausta.
 */
await sivu.addInitScript(() => {
  window.__kuplat = [];
  window.__aanet = [];
  const nyt = () => Math.round(performance.now());
  const OikeaAudio = window.Audio;
  window.Audio = function Audio(...args) {
    const audio = new OikeaAudio(...args);
    const rivi = { src: '', alkoi: null, loppui: null };
    window.__aanet.push(rivi);
    const oikeaPlay = audio.play.bind(audio);
    audio.play = () => {
      rivi.src = audio.getAttribute('src') ?? audio.src ?? '';
      if (rivi.alkoi === null) rivi.alkoi = nyt();
      return oikeaPlay();
    };
    for (const laji of ['ended', 'pause', 'error']) {
      audio.addEventListener(laji, () => { if (rivi.alkoi !== null) rivi.loppui = nyt(); });
    }
    return audio;
  };
  window.Audio.prototype = OikeaAudio.prototype;
  const vahti = new MutationObserver((muutokset) => {
    for (const muutos of muutokset) {
      for (const solmu of muutos.addedNodes) {
        if (solmu.nodeType !== 1) continue;
        const kuplat = solmu.matches?.('.pollo-vihje')
          ? [solmu] : [...(solmu.querySelectorAll?.('.pollo-vihje') ?? [])];
        for (const kupla of kuplat) {
          window.__kuplat.push({ t: nyt(), teksti: kupla.textContent.trim() });
        }
      }
    }
  });
  // Init-skripti ajetaan ennen dokumenttia: juurta ei vielä ole.
  const kiinnita = () => {
    if (!document.documentElement) return false;
    vahti.observe(document.documentElement, { childList: true, subtree: true });
    return true;
  };
  if (!kiinnita()) document.addEventListener('readystatechange', kiinnita, { once: true });
});

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

// Aloitusportti (äänet päälle) ja kartalle — sama polku kuin pelaajalla.
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => { window.matkakirja.ui.aloitaKartalta(); });
await sivu.waitForTimeout(2500);

// Ateenaan: sama napautus kuin pelaajalla (aloituslento ja saapuminen).
await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  window.__kuplat.length = 0;
  ui.doPickStart(game.board.cityById.get('ateena'));
});

/*
 * ODOTUS TAPAHTUMASTA, EI KELLOSTA. Aloituslento kestää kontissa
 * minuutin luokkaa (mitattu), joten sarjaa odotetaan siihen asti kun
 * kolmas kupla on tullut — tai kunnes katto täyttyy, jolloin vartiot
 * kertovat mitä jäi tulematta.
 */
await sivu.waitForFunction((teksti) => window.__kuplat.some((k) => k.teksti.includes(teksti)),
  'Tervetuloa Ateenaan', { timeout: 180000 })
  .catch(() => console.log('HUOM  toista kuplaa ei tullut 180 s:ssa'));
await kuva('kuplat');
// Kolmas kupla odottaa koko matkakirjaluennan yli — se on koko homman
// idea, joten odotus on pitkä (luenta on Ateenassa yli minuutin).
await sivu.waitForFunction((teksti) => window.__kuplat.some((k) => k.teksti.includes(teksti)),
  'Kantsuu klikata', { timeout: 240000 })
  .catch(() => console.log('HUOM  kolmatta kuplaa ei tullut 240 s:ssa'));
// Hetki vielä: kolmas kupla saa asettua ennen mittausta.
await sivu.waitForTimeout(1500);

const mittaus = await sivu.evaluate(() => ({
  kuplat: window.__kuplat,
  aanet: window.__aanet.filter((a) => a.alkoi !== null),
  lykkays: Boolean(window.matkakirja.ui.luennanLykkays),
}));

const kuplanAika = (teksti) => mittaus.kuplat.find((k) => k.teksti.includes(teksti))?.t ?? null;
const t1 = kuplanAika(KUPLA1);
const t2 = kuplanAika(KUPLA2);
const t3 = kuplanAika(KUPLA3);
/*
 * SAAPUMISEN MATKAKIRJALUENTA: kertojan äänite tästä kaupungista.
 * Ateena on fokuskaupunki, joten merkintä tulee fokusvirran
 * pakkauksesta (puhe-fokus-matkakirja-ateena.mp3); muilla laudoilla
 * nimi on puhe-<lauta>-saapuminen-<kaupunki>.mp3.
 */
const luenta = mittaus.aanet.find((a) => /puhe-.*(matkakirja|saapuminen).*ateena/.test(a.src))
  ?? null;

tieto('kuplat', JSON.stringify(mittaus.kuplat.map((k) => `${k.t}: ${k.teksti.slice(0, 40)}`)));
tieto('äänet', JSON.stringify(mittaus.aanet.map((a) => `${a.alkoi}–${a.loppui} ${a.src.split('/').pop()}`)));
tieto('luenta', luenta ? `${luenta.alkoi}–${luenta.loppui} ms` : 'ei käynnistynyt (varapolku)');

vaadi('R1 pulun kaksi ensimmäistä kuplaa tulevat perillä',
  t1 !== null && t2 !== null && t2 > t1, `1: ${t1}, 2: ${t2}`);
vaadi('R3 kolmas kupla on omistajan ohje ja tulee viimeisenä',
  t3 !== null && t2 !== null && t3 > t2, `2: ${t2}, 3: ${t3}`);
vaadi('lykkäyslippu on laskettu sarjan jälkeen', mittaus.lykkays === false);
if (luenta?.alkoi != null) {
  vaadi('R1 kuplat 1 ja 2 ovat ENNEN isoisän luentaa',
    t1 < luenta.alkoi && t2 < luenta.alkoi, `kuplat ${t1}/${t2}, luenta ${luenta.alkoi}`);
  const loppu = luenta.loppui ?? Infinity;
  const valissa = mittaus.kuplat.filter((k) => k.t > luenta.alkoi && k.t < loppu);
  vaadi('R2 luennan aikana ei tule yhtään kuplaa',
    valissa.length === 0, JSON.stringify(valissa.map((k) => k.teksti.slice(0, 30))));
  vaadi('R3 kolmas kupla tulee vasta luennan jälkeen',
    t3 > (luenta.loppui ?? Infinity), `kupla3 ${t3}, luenta loppui ${luenta.loppui}`);
} else {
  tieto('R2', 'luentaa ei kuulunut — pelkkä järjestys mitattu (varaviive)');
}

/* ---------- lehden vinkki ---------- */

const lehti = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 40 && ui.busy; i += 1) await odota(250);
  ui.avaaTutkinta(game.cityOf());
  await odota(2600);
  const kupla = document.querySelector('.fokusvirta-vinkki');
  return {
    teksti: kupla?.querySelector('.fokusvirta-vinkkiteksti')?.textContent ?? '',
    ruksi: Boolean(kupla?.querySelector('input[type="checkbox"]')),
    muistissa: localStorage.getItem('matkakirja-livia-lehtivinkki'),
  };
});
vaadi('R4 lehden vinkki on omistajan lause', lehti.teksti === VINKKI, `"${lehti.teksti}"`);
vaadi('R4 vinkissä ei ole ruksia', !lehti.ruksi);
vaadi('R5 kertalippu jäi laitteen muistiin', lehti.muistissa === '1', String(lehti.muistissa));
await kuva('vinkki');

const toinen = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelector('.fokusvirta-vinkki')?.remove();
  ui.fokusvirtaKortti = null;
  ui.closeArrival();
  await odota(600);
  ui.avaaTutkinta(game.cityOf());
  await odota(2600);
  return document.querySelectorAll('.fokusvirta-vinkki').length;
});
vaadi('R5 toinen lehden avaus on vinkitön', toinen === 0, `kuplia ${toinen}`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
