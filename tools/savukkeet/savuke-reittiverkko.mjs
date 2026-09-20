/*
 * Savuke: HIMMEÄ REITTIVERKKO LIFTATESSA — kaikki laudan kaaret himmeinä
 * kantaman kaarten alla, vain matkasession ajan, kerran per lauta.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-reittiverkko.mjs \
 *     [--kuvat <kansio>]
 *
 * OMISTAJA 20.9.2026 klo 13.50 (Raamattu, liftaus): *"entä jos
 * piirretaan myos muutkin reitit mutta himmeammalla"*. Fablen sääntö:
 * liftatessa heiton kantaman kaaret normaalisti ja kaikki muut laudan
 * kaaret himmeinä staattisena kerroksena (kerran per lauta, ei
 * animaatiota).
 *
 * === VÄITTEET (Bryssel, maakulku, 1400 × 900) ======================
 *
 *   V1  ENNEN LIIKUA verkkoa ei ole: mittari verkkoNakyy = false ja
 *       kaukainen merireitti (Lontoo–Dublin, keskikohta) on ilman mustetta.
 *   V2  HEITON JÄLKEEN verkko on: verkkoNakyy = true, verkko = laudan
 *       tunnus, verkkoJanoja > 0, ja sama kaukainen kaari on ruudulla
 *       himmeänä (tummuus välillä: tummempi kuin paperi, vaaleampi kuin
 *       kantaman kaari).
 *   V3  KANTAMAN KAARI on tummempi kuin himmeä verkko samassa kuvassa —
 *       kirkas piirtyy päälle ja erottuu.
 *   V4  KERRAN PER LAUTA: toinen heitto ei rakenna verkkoa uudestaan
 *       (verkkoJanoja sama, olio sama).
 *   V5  PERUUTUS sammuttaa verkon: matkasession päättyessä verkkoNakyy =
 *       false ja kaukainen kaari on taas ilman mustetta.
 *   V6  KEHYSAIKA: verkko päällä rAF-kehysten mediaani ei kasva yli
 *       KEHYSAIKA_RAJA_MS:n verrattuna ilman verkkoa (Chromium; laitteen
 *       fps mittaa Laitetestaaja).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA. Ilman ämpäriä OHITETAAN.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const KUVAT = argv.includes('--kuvat') ? argv[argv.indexOf('--kuvat') + 1] : (argv[0] && !argv[0].startsWith('--') ? argv[0] : null);

/**
 * Kehysajan mediaanin sallittu kasvu verkon kanssa OSUUTENA (Chromiumin
 * ohjelmistopiirto: 137 ms/kehys ilman verkkoa; 4 168 janaa lisäsi 34 ms
 * = 25 %, 24 127 janaa 205 ms = 150 %). Laitteen fps mittaa Laitetestaaja.
 */
const KEHYSAIKA_RAJA_OSUUS = 0.6;
/** Vaakaleike kaaren keskikohdan ympärillä (laitepikseliä): pallon getScreenCoords osuu 10–22 px sivuun. */
const LEIKE_LEVEYS = 80;
const LEIKE_KORKEUS = 16;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.geojson': 'application/json',
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
const lopeta = () => {
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
};

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' })).catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
if ((await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`))?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'bryssel' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'roll';
peli.tokens.delete('bryssel');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--disable-dev-shm-usage'],
});
const ctx = await selain.newContext({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
    // Verkko on oletuksena pois (v1984 hotfix); savuke kytkee sen päälle.
    localStorage.setItem('matkakirja-reittiverkko', '1');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
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
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) { await selain.close(); lopeta(); }
await sivu.waitForTimeout(2500);
// Saapumisen valokuvat ohi napista (ks. savuke-korostus-janne.mjs).
await sivu.evaluate(() => {
  setInterval(() => {
    const ui = window.matkakirja?.ui;
    const nappi = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
    if (nappi) nappi.click();
  }, 150);
});
await sivu.waitForTimeout(3000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
/* Kortit, nimiöt ja pulu pois mittarin tieltä. */
await sivu.addStyleTag({
  content: `body *:not(:has(canvas)):not(canvas) { visibility: hidden !important; }
            canvas { visibility: visible !important; }`,
});
/*
 * KAMERA LÄNSI-EUROOPPAAN PAKOTTAEN: pallon oma uloszoomauskatto pitää
 * Belgian kokoisen maan lähikuvassa (korkeus 0,04), joten pointOfView
 * ei riitä — ajaKamera({ bbox }, { pakota }) on sama reitti kuin
 * savuke-kerma-reuna.mjs:ssä. Laatikko laudan yksiköinä (Miller).
 */
const LAATIKKO = await (async () => {
  const { projisoiLaudalle } = await import('../../js/fokusmitat.js');
  const a = projisoiLaudalle('maailmankartta', -11, 53);
  const b = projisoiLaudalle('maailmankartta', 12, 35);
  return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y };
})();
const kameraPaikalleen = () => sivu.evaluate(async (bbox) => {
  const l = window.matkakirja.ui.pallolauta;
  await l.kamera.ajaKamera({ bbox }, { kesto: 0, pakota: true });
  await new Promise((v) => setTimeout(v, 1200));
}, LAATIKKO);
await kameraPaikalleen();
await sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  l.ladoHeti?.();
  await new Promise((v) => setTimeout(v, 4000));
});

const mittarit = () => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const m = l.vektorit?.()?.mittarit?.() ?? {};
  let olioita = 0; let nakyvia = 0; let olioId = null;
  l.pallo.scene().traverse((o) => {
    if (o.userData?.pallovektorit?.laji !== 'verkko') return;
    olioita += 1; olioId = o.id;
    if (o.visible) nakyvia += 1;
  });
  return {
    verkko: m.verkko ?? null, verkkoJanoja: m.verkkoJanoja ?? 0, verkkoNakyy: m.verkkoNakyy ?? false,
    tila: m.tila, olioita, nakyvia, olioId,
  };
});
/* Kamera SAMAAN paikkaan ennen jokaista kuvaa: heitto sovittaa kameran kohteisiin. */
const kaappaa = async (nimi) => {
  await kameraPaikalleen();
  const pov = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  tieto(`kamera (${nimi})`, JSON.stringify(pov));
  const b = await sivu.screenshot();
  if (KUVAT) { mkdirSync(KUVAT, { recursive: true }); writeFileSync(join(KUVAT, `${nimi}.png`), b); }
  return decodePng(b);
};
/** Kaaren keskikohta asteina laudan polysta (sama muisti kuin piirtäjällä). */
const kaarenKeski = (a, b) => sivu.evaluate(([x, y]) => {
  const { game, pallolauta: l } = window.matkakirja.ui;
  const id = game.board.edgeById.has(`${x}|${y}`) ? `${x}|${y}` : `${y}|${x}`;
  const reitti = game.board.edgeById.get(id);
  const poly = l.reitit?.poly?.(reitti) ?? reitti.poly;
  const p = poly[Math.floor(poly.length / 2)];
  return { id, x: p[0], y: p[1] };
}, [a, b]);
const ruutupiste = (x, y) => sivu.evaluate(async ([lx, ly]) => {
  const { laudaltaAsteiksi } = await import('/js/fokusmitat.js');
  const a = laudaltaAsteiksi('maailmankartta', lx, ly);
  const s = window.matkakirja.ui.pallolauta.pallo.getScreenCoords(a.lat, a.lon);
  return { x: s.x, y: s.y, lat: a.lat, lon: a.lon };
}, [x, y]);
/** Tummin pikseli ja keskikirkkaus leikkeessä. */
const leike = (kuva, p) => {
  const dpr = kuva.width / 1400;
  const cx = Math.round(p.x * dpr); const cy = Math.round(p.y * dpr);
  let tummin = 999; let summa = 0; let n = 0;
  for (let y = cy - LEIKE_KORKEUS / 2; y < cy + LEIKE_KORKEUS / 2; y += 1) {
    for (let x = cx - LEIKE_LEVEYS / 2; x < cx + LEIKE_LEVEYS / 2; x += 1) {
      if (x < 0 || y < 0 || x >= kuva.width || y >= kuva.height) continue;
      const i = (y * kuva.width + x) * 4;
      const v = (kuva.data[i] + kuva.data[i + 1] + kuva.data[i + 2]) / 3;
      if (v < tummin) tummin = v;
      summa += v; n += 1;
    }
  }
  return { tummin, keski: n ? summa / n : 0 };
};
/**
 * TUMMENTUNEET PIKSELIT: kuinka moni pikseli laatikossa on kuvassa b
 * vähintään TUMMENNUS_RAJA yksikköä tummempi kuin kuvassa a. Laatikko on
 * avomerta merireitin ympärillä (Kelttienmeri), jossa ainoa uusi muste
 * on himmeä verkko — koordinaattien 10–22 px:n poikkeama ei haittaa,
 * koska laatikko on satojen pikselien kokoinen.
 */
const TUMMENNUS_RAJA = 8;
const tummentuneet = (a, b, p, sade = 120) => {
  const dpr = a.width / 1400;
  const cx = Math.round(p.x * dpr); const cy = Math.round(p.y * dpr); const r = Math.round(sade * dpr);
  let n = 0;
  for (let y = Math.max(0, cy - r); y < Math.min(a.height, cy + r); y += 1) {
    for (let x = Math.max(0, cx - r); x < Math.min(a.width, cx + r); x += 1) {
      const i = (y * a.width + x) * 4;
      const va = (a.data[i] + a.data[i + 1] + a.data[i + 2]) / 3;
      const vb = (b.data[i] + b.data[i + 1] + b.data[i + 2]) / 3;
      if (va - vb >= TUMMENNUS_RAJA) n += 1;
    }
  }
  return n;
};
/** Tummentuneita pikseleitä vähintään: 1 px:n viiva 240 css-px:n laatikon poikki dpr 2:lla ≈ 500+. */
const TUMMENTUNEITA_VAHINTAAN = 300;

/** rAF-kehysten mediaani (ms) pallon pyöriessä hitaasti. */
const kehysaika = async () => {
  await kameraPaikalleen();
  return sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  const pov = l.pallo.pointOfView();
  const ajat = [];
  let edellinen = performance.now();
  await new Promise((valmis) => {
    let i = 0;
    const askel = () => {
      const nyt = performance.now();
      ajat.push(nyt - edellinen);
      edellinen = nyt;
      i += 1;
      l.pallo.pointOfView({ ...pov, lng: pov.lng + Math.sin(i / 10) * 0.2 }, 0);
      if (i < 90) requestAnimationFrame(askel); else valmis();
    };
    requestAnimationFrame(askel);
  });
  l.pallo.pointOfView(pov, 0);
  const s = ajat.slice(10).sort((a, b) => a - b);
  return { mediaani: s[Math.floor(s.length / 2)], p90: s[Math.floor(s.length * 0.9)] };
  });
};

/* Heitto pelin omalla reitillä; matkasessio merkitään kuten savuke-liftaus-reitit.mjs. */
const heita = (die) => sivu.evaluate(async (silmaluku) => {
  const { ui, game } = window.matkakirja;
  game.phase = 'roll';
  game.travelMode = 'land';
  game.die = null;
  game.moves = new Map();
  game.rollDie = () => silmaluku;
  game.actionRoll();
  ui.matkaSessio = game.cityOf().id;
  ui.matkareittiAvain = null;
  ui.paivitaMatkareitit();
  ui.pallolauta.paivita?.();
  await new Promise((r) => setTimeout(r, 900));
  return ui.matkareittienValinta();
}, die);
const peruuta = () => sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  ui.matkaSessio = null;
  game.phase = 'action';
  game.die = null;
  game.moves = new Map();
  ui.matkareittiAvain = null;
  ui.paivitaMatkareitit();
  ui.pallolauta.paivita?.();
  await new Promise((r) => setTimeout(r, 900));
});

/*
 * MITTAPISTE ON MERIREITTI (Lontoo–Dublin, keskikohta Kelttienmerellä):
 * meri on tasaista paperia (kirkkaus ~200), kun maalla väritason
 * reliefivarjot ovat itsessään 130:n luokkaa eikä 1 px:n himmeä viiva
 * erotu niistä tummimman pikselin mitalla.
 */
const kaukainen = await kaarenKeski('lontoo', 'dublin');

/* V1: ennen Liikua */
const m0 = await mittarit();
const k0 = await kaappaa('verkko-ennen');
const piste = await ruutupiste(kaukainen.x, kaukainen.y);
tieto('kaukainen kaari', `${kaukainen.id} keskikohta ${piste.lat.toFixed(2)} N ${piste.lon.toFixed(2)} E → (${Math.round(piste.x)}, ${Math.round(piste.y)})`);
vaadi('kaukainen kaari on ruudulla', piste.x > 0 && piste.y > 0 && piste.x < 1400 && piste.y < 900, JSON.stringify(piste));
const l0 = leike(k0, piste);
tieto('ennen Liikua', `${JSON.stringify(m0)}, kaukainen tummin ${l0.tummin.toFixed(0)} keski ${l0.keski.toFixed(0)}`);
vaadi('V1 ennen Liikua verkkoa ei näy', m0.verkkoNakyy === false && m0.nakyvia === 0, JSON.stringify(m0));
const aikaIlman = await kehysaika();

/* V2: heitto → matkasessio. KAMERA EI SAA MUUTTUA verkon syttyessä (v1984:
 * omistajan havainto v1983: liftaus zoomasi koko pallolle). Heitto itse
 * sovittaa kameran kantaman kaariin (sovitaSiirtokohteet), joten mitataan
 * korkeus ENNEN heittoa ja verkon syttymisen jälkeen: kasvu yli 2× on
 * maailmakuva, ei sovitus. */
const povEnnen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
const v1 = await heita(6);
const m1 = await mittarit();
const povJalkeen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
tieto('kamera ennen/jälkeen heiton', `${povEnnen.altitude.toFixed(3)} → ${povJalkeen.altitude.toFixed(3)}`);
vaadi('V7 kamera ei zoomaa maailmakuvaan verkon syttyessä', povJalkeen.altitude < Math.max(0.6, povEnnen.altitude * 2),
  `korkeus ${povEnnen.altitude.toFixed(3)} → ${povJalkeen.altitude.toFixed(3)}`);
const k1 = await kaappaa('verkko-heiton-jalkeen');
const l1 = leike(k1, piste);
tieto('heiton jälkeen', `${JSON.stringify(m1)}, valinta.verkko ${v1.verkko}, kaaria ${v1.reittiTunnukset.length}`);
tieto('kaukainen kaari verkon kanssa', `tummin ${l1.tummin.toFixed(0)} keski ${l1.keski.toFixed(0)} (ennen ${l0.tummin.toFixed(0)})`);
vaadi('V2 heiton jälkeen verkko on ruudulla (mittari)',
  m1.verkkoNakyy === true && m1.nakyvia === 1 && m1.verkko === 'maailmankartta' && m1.verkkoJanoja > 400,
  JSON.stringify(m1));
const uusiaVerkon = tummentuneet(k0, k1, piste);
tieto('Kelttienmeri: tummentuneita pikseleitä verkon kanssa', String(uusiaVerkon));
vaadi('V2 kaukainen merireitti piirtyy himmeänä', uusiaVerkon >= TUMMENTUNEITA_VAHINTAAN && l1.keski > 150,
  `tummentuneita ${uusiaVerkon} < ${TUMMENTUNEITA_VAHINTAAN}, keski ${l1.keski.toFixed(0)}`);
/* V3: kantaman kaari tummempi kuin verkko */
const omaId = v1.reittiTunnukset.find((id) => id.includes('bryssel')) ?? v1.reittiTunnukset[0];
const [oa, ob] = omaId.split('|');
const oma = await kaarenKeski(oa, ob);
const omaPiste = await ruutupiste(oma.x, oma.y);
const lo = leike(k1, omaPiste);
tieto('kantaman kaari', `${omaId} → tummin ${lo.tummin.toFixed(0)}`);
vaadi('V3 kantaman kaari on verkkoa tummempi', lo.tummin < l1.tummin - 15, `${lo.tummin.toFixed(0)} vs ${l1.tummin.toFixed(0)}`);
const aikaKanssa = await kehysaika();

/* V4: toinen heitto ei rakenna uudestaan */
await heita(3);
const m2 = await mittarit();
vaadi('V4 toinen heitto ei rakenna verkkoa uudestaan',
  m2.olioId === m1.olioId && m2.verkkoJanoja === m1.verkkoJanoja && m2.verkkoNakyy === true, JSON.stringify(m2));

/* V5: peruutus sammuttaa */
await peruuta();
const m3 = await mittarit();
const k3 = await kaappaa('verkko-peruutus');
const l3 = leike(k3, piste);
const jaljella = tummentuneet(k0, k3, piste);
tieto('Kelttienmeri: tummentuneita pikseleitä peruutuksen jälkeen', String(jaljella));
vaadi('V5 peruutus sammuttaa verkon', m3.verkkoNakyy === false && m3.nakyvia === 0 && jaljella < TUMMENTUNEITA_VAHINTAAN / 3,
  `${JSON.stringify(m3)}, tummentuneita ${jaljella}`);

/* V6: kehysaika */
tieto('kehysaika ilman verkkoa', `mediaani ${aikaIlman.mediaani.toFixed(1)} ms, p90 ${aikaIlman.p90.toFixed(1)} ms`);
tieto('kehysaika verkon kanssa', `mediaani ${aikaKanssa.mediaani.toFixed(1)} ms, p90 ${aikaKanssa.p90.toFixed(1)} ms`);
vaadi(`V6 kehysajan mediaani ei kasva yli ${Math.round(KEHYSAIKA_RAJA_OSUUS * 100)} %`,
  aikaKanssa.mediaani <= aikaIlman.mediaani * (1 + KEHYSAIKA_RAJA_OSUUS),
  `${aikaIlman.mediaani.toFixed(1)} → ${aikaKanssa.mediaani.toFixed(1)} ms`);
/*
 * JANAKATTO 20 000 (v1983): vektorijanat jakaa pitkät janat paloiksi
 * (Gironden jänne), ja verkon kaupunkivälit ovat pitkiä — 0,1°:n jako
 * antoi 40 328 janaa (CI punainen), verkon oma 0,3°:n jako 14 848.
 * Pikselimitta (V2) on sama molemmilla, joten katto vartioi harvennusta
 * ja jakoa yhdessä, ei kumpaakaan yksin.
 */
vaadi('V6 verkon janamäärä pysyy kurissa (harvennus + palajako)', m1.verkkoJanoja < 20000, `${m1.verkkoJanoja} janaa`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
lopeta();
