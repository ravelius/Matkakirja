/*
 * SELAINSAVUKE: SATELLIITTILINSSI AVAUTUU AVARUUTEEN.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-satelliitti-avaruus.mjs
 *
 * OMISTAJA 12.9.2026, sanatarkasti: *"Astronoottikuvat ovat hienoja,
 * niitä voisi olla vaikka enemmänkin. Saisiko maapallosta tehtyä sen
 * näköistä, miltä se näyttää avaruudestakin? Ja laittaisi vielä tähtiä
 * taustalle. Linssi voisi alkaa niin, että maapallon reunat näkyvät ja
 * taustalla on tähtiä. Maapallonhan ei tarvitse olla kovin tarkka. Eli
 * zoomaustasoja ei tarvitse olla juurikaan."*
 *
 * Yksikkötestit (tests/satelliitti-avaruus.test.mjs) näkevät kaavat ja
 * värit; ne EIVÄT näe, mitä pallolla oikeasti on. Tämä savuke mittaa
 * sen oikealla pallolaudalla kolmella näytöllä.
 *
 * VÄITTEET:
 *   1. AVAUSNÄKYMÄ: koko pallo ruudulla reunoineen — halkaisija mahtuu
 *      sekä leveyteen että korkeuteen, ja kamera on korkeammalla kuin
 *      laudan oma katto PALLO_KORKEUS_MAX (2,5) siellä missä se on
 *      tarpeen. Ennen korjausta linssi avautui pelaajan omaan zoomiin
 *      (mitattu 12.9.2026: puhelimella halkaisija 1 908 px / 374 px).
 *   2. TÄHDET: kolme pistekerrosta ja 2 190 pistettä pallon ympärillä.
 *   3. MAA AVARUUDESTA: pohjapallolla on generoitu tekstuuri,
 *      Globe.gl:n laattamoottori on kiinni, ilmakehä on sininen — eikä
 *      RUUDULLA OLE YHTÄÄN NÄKYVÄÄ 1873-karttapintaa (laattakerros,
 *      lepokerros, napakannet ja -kalotit, vektorirannikko ja rajat).
 *   4. KAPEA ZOOM: OrbitControlsin min/max pitävät pallon ruudulla
 *      eivätkä päästä pintaan — ja PYÖRITYS TOIMII YHÄ (omistajan
 *      linjaus: kohteet etsitään palloa pyörittämällä).
 *   5. SULKEMINEN PALAUTTAA PALLON TÄSMÄLLEEN: kamera, pinta,
 *      laattamoottori, ilmakehä, tausta, zoomirajat, karttapinnat ja
 *      tähtien poistuminen — eikä pelitila muutu.
 *
 * VERKKO: ämpäri (laatat, Globe.gl) Noden fetchin kautta, muu katki.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8754, r));

/*
 * Playwright kahdesta paikasta (README: älä kirjoita kiinteää
 * ../../node_modules-polkua).
 */
let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
const chromium = paketti?.chromium ?? paketti?.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
  tyopoyta: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Pallon mitattu tila: kamera, pinta, tähdet ja karttapinnat. */
const MITAT = () => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  const pov = pallo.pointOfView();
  const R = pallo.getGlobeRadius();
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori').getBoundingClientRect();
  const d = R * (1 + pov.altitude);
  const a = Math.asin(Math.min(1, R / d));
  const halkaisija = kotelo.height * Math.tan(a) / Math.tan((25 * Math.PI) / 180);
  const tahdet = [];
  let karttapintoja = 0;
  const lajit = [];
  // Näkyy = koko esivanhempien ketju näkyvissä JA piirtokerros päällä
  // (linssi sulkee karttapinnat layers-maskista, ks. satelliitti-avaruus.js).
  const nakyy = (o) => {
    if (o.layers && o.layers.mask === 0) return false;
    let p = o;
    while (p) { if (!p.visible) return false; p = p.parent; }
    return true;
  };
  pallo.scene()?.traverse?.((o) => {
    if (o?.__globeObjType === 'particles' && o.geometry) tahdet.push(o.geometry.attributes?.position?.count ?? 0);
    const ud = o?.userData;
    if (!ud) return;
    const kartta = ud.laattakerros || ud.lepokerros || ud.napakansi || ud.napakalotti;
    if (kartta && nakyy(o)) {
      karttapintoja += 1;
      lajit.push(`${Object.keys(ud).join('+')}:maski${o.layers?.mask}:nakyy${o.visible}`);
    }
    if (ud.pallovektorit && nakyy(o) && o.material?.visible !== false) {
      karttapintoja += 1; lajit.push(`vektori:${ud.pallovektorit.laji}`);
    }
  });
  const ohj = pallo.controls();
  return {
    korkeus: +pov.altitude.toFixed(3), lat: +pov.lat.toFixed(3), lng: +pov.lng.toFixed(3),
    leveys: Math.round(kotelo.width), rkorkeus: Math.round(kotelo.height),
    halkaisija: Math.round(halkaisija),
    minKorkeus: +(ohj.minDistance / R - 1).toFixed(3),
    maxKorkeus: +(ohj.maxDistance / R - 1).toFixed(3),
    tahtikerroksia: tahdet.length, tahtia: tahdet.reduce((x, y) => x + y, 0),
    karttapintoja, lajit: lajit.slice(0, 6),
    avaruus: ui.pallolinssi?.kahva?.avaruus?.tila?.() ?? null,
    kerrosLukossa: Boolean(ui.pallolauta?.lepokerros?.()?.lukossa?.()),
    tekstuuri: Boolean(pallo.globeImageUrl()),
    laattamoottori: Boolean(pallo.globeTileEngineUrl()),
    ilmakeha: pallo.atmosphereColor(),
    ilmakorkeus: pallo.atmosphereAltitude(),
    tausta: pallo.backgroundColor(),
  };
};

/*
 * KEHYSTEN ODOTUS ENNEN MITTAUSTA. Linssi sulkee karttapinnat OMASSA
 * kehyssilmukassaan, ja laattakerros luo uuden verkon aina kun sen
 * tekstuuri saapuu verkosta. Oikealla laitteella väli on yksi kehys
 * (16 ms) eikä näy, mutta konttiympäristön SwiftShader piirtää 2–3
 * kehystä sekunnissa, jolloin juuri saapunut laatta ehtii olla
 * ruudulla kolmanneksen sekunnin. Mittaus odottaa siksi, että laattojen
 * pyyntöjono on tyhjentynyt ja sen jälkeen kolme kehystä.
 */
async function rauhoitu(s) {
  await s.waitForTimeout(2500);
  await s.evaluate(() => new Promise((r) => {
    let n = 3;
    const askel = () => { n -= 1; if (n <= 0) r(); else requestAnimationFrame(askel); };
    requestAnimationFrame(askel);
  }));
}

const PELITILA = () => {
  const { game } = window.matkakirja;
  return JSON.stringify({
    vaihe: game.phase, paikka: game.player.pos, rahat: game.player.money,
    tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
  });
};

async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8754/index.html?lauta=pallo', { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1800);
  // Saapumispinnat pois: ne peittäisivät pallon eivätkä kuulu linssiin.
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
  return ok;
}

async function ajaNakyma(nimi) {
  const virheet = [];
  const konteksti = await selain.newContext({ ...NAKYMAT[nimi], serviceWorkers: 'block' });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(String(e)));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const t = (x) => `${x} (${nimi})`;
  const kaappaa = async (vaihe) => {
    if (!ULOS) return;
    await s.screenshot({ path: join(ULOS, `savuke-satelliitti-avaruus-${nimi}-${vaihe}.png`), timeout: 120000 })
      .catch((e) => console.log(`    (kaappaus ${vaihe} ei onnistunut: ${e.message.split('\n')[0]})`));
  };

  const pallolauta = await avaaPeli(s);
  vaadi(t('pallolauta avautuu'), pallolauta);
  const peliEnnen = await s.evaluate(PELITILA);
  const ennen = await s.evaluate(MITAT);
  await kaappaa('0-peli');

  await s.evaluate(() => window.matkakirja.ui.valitseLinssi('satelliitti'));
  await s.waitForTimeout(4500);
  await rauhoitu(s);
  const linssi = await s.evaluate(MITAT);
  await kaappaa('1-linssi');

  /* 1. avausnäkymä */
  vaadi(t('koko pallo mahtuu ruutuun'),
    linssi.halkaisija <= linssi.leveys && linssi.halkaisija <= linssi.rkorkeus,
    `halkaisija ${linssi.halkaisija} px, ruutu ${linssi.leveys} × ${linssi.rkorkeus}`);
  vaadi(t('pallon reunat erottuvat — rako on jäljellä'),
    linssi.halkaisija < Math.min(linssi.leveys, linssi.rkorkeus) * 0.95,
    `täyttö ${(linssi.halkaisija / Math.min(linssi.leveys, linssi.rkorkeus) * 100).toFixed(0)} %`);
  vaadi(t('kamera nousi pelaajan zoomista'), linssi.korkeus > ennen.korkeus * 3,
    `${ennen.korkeus} → ${linssi.korkeus}`);

  /* 2. tähdet */
  vaadi(t('tähtitaivas kolmella kerroksella'),
    linssi.tahtikerroksia === 3 && linssi.tahtia === 2190,
    `${linssi.tahtikerroksia} kerrosta, ${linssi.tahtia} pistettä`);
  vaadi(t('pelissä ei ole tähtiä ennen linssiä'), ennen.tahtia === 0, `${ennen.tahtia}`);

  /* 3. Maa avaruudesta */
  vaadi(t('pohjapallolla on generoitu Maa'), linssi.tekstuuri && !linssi.laattamoottori,
    `tekstuuri ${linssi.tekstuuri}, laattamoottori ${linssi.laattamoottori}`);
  vaadi(t('ilmakehä on sininen eikä kartan kellertävä'),
    String(linssi.ilmakeha).toLowerCase() !== String(ennen.ilmakeha).toLowerCase()
      && linssi.ilmakorkeus > ennen.ilmakorkeus,
    `${ennen.ilmakeha} → ${linssi.ilmakeha}`);
  vaadi(t('yhtään 1873-karttapintaa ei ole näkyvissä'), linssi.karttapintoja === 0,
    `${linssi.karttapintoja} pintaa (pelissä ${ennen.karttapintoja})`
    + `${linssi.lajit?.length ? `: ${linssi.lajit.join(', ')}` : ''}`);
  vaadi(t('pintakerros on lukossa — uusia karttaverkkoja ei synny'),
    linssi.kerrosLukossa && !ennen.kerrosLukossa);

  /* 4. kapea zoom ja pyöritys */
  vaadi(t('zoom ei päästä pintaan'), linssi.minKorkeus > 0.5,
    `lähin korkeus ${linssi.minKorkeus}`);
  vaadi(t('zoom ei kadota palloa'), linssi.maxKorkeus < linssi.korkeus * 1.4,
    `kauin korkeus ${linssi.maxKorkeus}, avaus ${linssi.korkeus}`);
  vaadi(t('zoomikaista on kapea'), linssi.maxKorkeus / linssi.minKorkeus < 3,
    `${linssi.minKorkeus}…${linssi.maxKorkeus}`);

  // Pyöritys: vaakaveto pallon yli muuttaa pituuspiiriä mutta ei korkeutta.
  const keskiX = Math.round(NAKYMAT[nimi].viewport.width / 2);
  const keskiY = Math.round(NAKYMAT[nimi].viewport.height / 2);
  await s.mouse.move(keskiX, keskiY);
  await s.mouse.down();
  for (let i = 1; i <= 6; i += 1) await s.mouse.move(keskiX - i * 12, keskiY);
  await s.mouse.up();
  await s.waitForTimeout(1400);
  await rauhoitu(s);
  const pyoritetty = await s.evaluate(MITAT);
  vaadi(t('pallon pyöritys toimii yhä'),
    Math.abs(pyoritetty.lng - linssi.lng) > 1,
    `pituuspiiri ${linssi.lng} → ${pyoritetty.lng}`);
  vaadi(t('pyöritys ei muuta korkeutta eikä päästä karttaa esiin'),
    Math.abs(pyoritetty.korkeus - linssi.korkeus) < 0.2 && pyoritetty.karttapintoja === 0,
    `korkeus ${pyoritetty.korkeus}, karttapintoja ${pyoritetty.karttapintoja}`);

  /* 5. sulkeminen palauttaa */
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(3000);
  const jalkeen = await s.evaluate(MITAT);
  const peliJalkeen = await s.evaluate(PELITILA);
  await kaappaa('2-jalkeen');

  vaadi(t('kamera palasi täsmälleen'),
    Math.abs(jalkeen.korkeus - ennen.korkeus) < 0.005
      && Math.abs(jalkeen.lat - ennen.lat) < 0.01 && Math.abs(jalkeen.lng - ennen.lng) < 0.01,
    `${JSON.stringify(ennen)} vs ${JSON.stringify(jalkeen)}`);
  vaadi(t('pinta palasi laattamoottorille'),
    jalkeen.laattamoottori === ennen.laattamoottori && jalkeen.tekstuuri === ennen.tekstuuri);
  vaadi(t('ilmakehä ja tausta palasivat'),
    jalkeen.ilmakeha === ennen.ilmakeha && jalkeen.ilmakorkeus === ennen.ilmakorkeus
      && jalkeen.tausta === ennen.tausta,
    `${jalkeen.ilmakeha} / ${jalkeen.ilmakorkeus} / ${jalkeen.tausta}`);
  vaadi(t('tähdet purkautuivat'), jalkeen.tahtia === 0, `${jalkeen.tahtia} pistettä jäi`);
  vaadi(t('karttapinnat palasivat'), jalkeen.karttapintoja > 0,
    `${jalkeen.karttapintoja} (ennen ${ennen.karttapintoja})`);
  vaadi(t('pintakerroksen lukko aukesi'), !jalkeen.kerrosLukossa);
  vaadi(t('zoomirajat palasivat laudan omiksi'),
    Math.abs(jalkeen.minKorkeus - ennen.minKorkeus) < 0.01
      && Math.abs(jalkeen.maxKorkeus - ennen.maxKorkeus) < 0.01,
    `${jalkeen.minKorkeus}…${jalkeen.maxKorkeus}`);
  vaadi(t('pelitila ei muuttunut'), peliEnnen === peliJalkeen);
  vaadi(t('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' | '));

  console.log(`    ENNEN  ${JSON.stringify(ennen)}`);
  console.log(`    LINSSI ${JSON.stringify(linssi)}`);
  console.log(`    JÄLKEEN ${JSON.stringify(jalkeen)}`);
  await konteksti.close();
}

for (const nimi of Object.keys(NAKYMAT)) await ajaNakyma(nimi);

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((r) => !r.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi`);
process.exit(kaatui.length ? 1 : 0);
