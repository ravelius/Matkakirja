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
 *   5. NIMET VASTA LÄHELTÄ (omistaja 12.9.2026: *"Kaikissa pisteissä
 *      ei tarvitse nimeä näkyä kuin vasta lähemmäs zoomattuna"*):
 *      avausnäkymässä yksikään nimikyltti ei ole näkyvissä, vihreät
 *      pisteet ovat; lähimmässä sallitussa zoomissa nimet näkyvät.
 *   6. PULU PIILOSSA (omistaja 12.9.2026: *"Pulun voisi piilottaa"*):
 *      pöllön nappi, paneeli, kuplapino ja kasvokangas ovat piilossa
 *      linssin ajan ja takaisin näkyvissä sen jälkeen.
 *   7. SULKEMINEN PALAUTTAA PALLON TÄSMÄLLEEN: kamera, pinta,
 *      laattamoottori, ilmakehä, tausta, zoomirajat, karttapinnat,
 *      nimet, pulu ja tähtien poistuminen — eikä pelitila muutu.
 *   8. MUUT ÄÄNET VAIKENEVAT (omistaja 12.9.2026: *"Kun linssi lähtee
 *      käyntiin, niin se ei osaa vielä sammuttaa muita ääniä"*).
 *   9. PELIN OMA RELIEFI on pallon pinnalla (omistaja 12.9.2026:
 *      *"Katsoitko topografia linssistä… se varmaan sopisi"*).
 *
 * ═══════════════ MIKSI TÄMÄ SAVUKE NÄYTTI VIHREÄÄ, KUN PELI OLI
 *                 RIKKI (12.9.2026) ═══════════════════════════════
 *
 * Omistaja: *"Julkaistussa pelissä nimet näkyvät silti avausnäkymässä
 * päällekkäin"* ja *"Pulun voisi piilottaa"* — ja tämä savuke raportoi
 * 99/99 läpi. NELJÄ ASIAA MITTASI VÄÄRÄÄ:
 *
 *  A. SAVUKE AVASI LINSSIN ERI REITTIÄ KUIN PELAAJA. Se kutsui
 *     `ui.valitseLinssi('satelliitti')` suoraan. Pelaaja avaa laukun
 *     (#turn-pill), napauttaa linssiruutua (button[data-linssi]) ja
 *     painaa Aktivoi (.linssi-aktivoi) — kolme elettä, joista viimeinen
 *     myös sulkee laukun. Mikään savukkeen väitteistä ei koskenut sitä
 *     reittiä. NYT LINSSI AVATAAN NAPAUTTAMALLA, ja jos jokin noista
 *     kolmesta ei löydy, savuke kaatuu.
 *  B. SAVUKE EI MITANNUT, ETTÄ TYYLI OIKEASTI SAAPUI. Se luki nimien
 *     `opacity`-arvoa — mutta jos css/satelliitti.css ei ollut
 *     ladattu lainkaan, opacity olisi 1 ja väite olisi kaatunut…
 *     paitsi että väite oli "nimiä näkyvissä === 0", ja SE OLISI YHÄ
 *     LÄPÄISTY, jos nimilaput olisivat jääneet kokonaan syntymättä.
 *     Nyt mitataan erikseen: tyylitiedosto on ladattu (sheet.cssRules),
 *     kriittinen inline-tyyli on sivulla, JA nimilappuja on olemassa.
 *  C. PULUN VÄITE HYVÄKSYI PUUTTUVAN ELEMENTIN. `kasvot === null`
 *     kelpasi "piilossa"-todisteeksi, joten luokan nimen vaihtuminen
 *     olisi mennyt läpi hiljaa. Nyt jokainen pinta, joka OLI olemassa
 *     ennen linssiä, on oltava olemassa ja piilossa linssin aikana.
 *  D. EI OLLUT VASTAKOETTA. Savuke ei koskaan todistanut, että mittari
 *     osaa mennä punaiseksi. Nyt jokainen ajo tekee VASTAKOKEEN: se
 *     riisuu piilotusluokat hetkeksi ja vaatii, että nimet ja pulu
 *     TULEVAT näkyviin — jos eivät tule, mittari ei mittaa mitään ja
 *     savuke kaatuu siihen. Vasta sen jälkeen luokat palautetaan ja
 *     varsinainen väite luetaan.
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
  /*
   * NÄKYVYYS LUETAAN MAALATUSTA TULOKSESTA, EI YHDESTÄ OMINAISUUDESTA
   * (ks. tiedoston alku, kohta B). Nimi on näkyvissä vain jos KAIKKI
   * pitää paikkansa: peittävyys yli nollan koko esivanhempien ketjussa,
   * visibility ja display sallivat, laatikolla on kokoa JA se on
   * ruudulla. Yksi näistä yksin ei kerro, näkeekö pelaaja lapun.
   */
  const maalattu = (el) => {
    let p = el;
    while (p && p.nodeType === 1) {
      const t = getComputedStyle(p);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) <= 0.05) return false;
      p = p.parentElement;
    }
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0
      && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  };
  let nimiaNakyvissa = 0;
  let nimiaYhteensa = 0;
  for (const el of document.querySelectorAll('.satelliitti-nimi')) {
    const merkki = el.closest('.pallolauta-merkki') ?? el.closest('.satelliitti-piste');
    if (merkki?.classList?.contains('pallolauta-takana')) continue;
    nimiaYhteensa += 1;
    if (maalattu(el)) nimiaNakyvissa += 1;
  }
  /*
   * TYYLIN SAAPUMINEN ON OMA MITTARINSA. Pelkkä body-luokka ei piilota
   * mitään, jos sääntöä ei ole sivulla — ja juuri se oli epäilty vika.
   * Kriittiset piilotukset ovat inline-tyylissä (satelliitti-kriittinen)
   * ja koko ulkoasu linkissä (satelliitti-tyyli): molemmat mitataan.
   */
  const kriittinen = document.getElementById('satelliitti-kriittinen');
  const linkki = document.getElementById('satelliitti-tyyli');
  let tyylisaantoja = 0;
  for (const arkki of document.styleSheets) {
    if (!/satelliitti\.css/.test(arkki.href ?? '')) continue;
    try { tyylisaantoja = arkki.cssRules?.length ?? 0; } catch { tyylisaantoja = -1; }
  }
  const puluNakyy = (valitsin) => {
    const el = document.querySelector(valitsin);
    if (!el) return null;
    return maalattu(el);
  };
  return {
    nimiaNakyvissa,
    nimiaYhteensa,
    kriittinenTyyli: Boolean(kriittinen?.textContent?.includes('satelliitti-nimet')),
    tyylilinkki: Boolean(linkki),
    tyylisaantoja,
    puluNappi: puluNakyy('.pollo-nappi'),
    puluPaneeli: puluNakyy('.pollo-paneeli'),
    puluKuplapino: puluNakyy('.pollo-kuplapino'),
    puluKasvot: puluNakyy('.livia-kasvot-pinta'),
    puluPiilossa: document.body.classList.contains('aikajana-pulu-piilossa'),
    aanetHiljaa: Boolean(ui.pallolinssi?.kahva?.aanet?.hiljaa?.()),
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
    /*
     * LINSSI LAUKKUUN. Pelaaja löytää sen pelistä (js/linssit/omistus.js);
     * savuke ei pelaa sitä läpi vaan antaa linssin samalla kentällä,
     * johon myonna() sen kirjoittaa. AVAAMINEN tehdään sen jälkeen
     * pelaajan omilla eleillä (avaaLinssiEleella).
     */
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
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

/*
 * LINSSI AUKI PELAAJAN OMILLA ELEILLÄ (ks. tiedoston alku, kohta A).
 *
 * Kolme napautusta, samat kuin pelaajalla:
 *   1. #turn-pill avaa matkalaukun (js/ui.js, index.html),
 *   2. button[data-linssi="satelliitti"] valitsee ruudun laukussa
 *      (js/ui.js linssiLiuska) — tämä EI vielä sytytä linssiä,
 *   3. .linssi-aktivoi sytyttää sen ja sulkee laukun (aktivoiLinssi).
 *
 * Jos jokin näistä puuttuu, savuke kaatuu tähän — ja juuri se on
 * tarkoitus: silloin pelaaja ei pääse linssiin lainkaan, eikä muilla
 * väitteillä ole väliä.
 */
async function avaaLinssiEleella(s) {
  await s.click('#turn-pill');
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click();
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  await aktivoi.click();
  await s.waitForTimeout(4500);
  return s.evaluate(() => ({
    linssi: window.matkakirja.ui.linssiValittu,
    laukku: Boolean(document.getElementById('passport-dialog')?.open),
  }));
}

/*
 * VASTAKOE (ks. tiedoston alku, kohta D): riisu piilotusluokat ja
 * todista, että nimet ja pulu TULEVAT näkyviin. Jos eivät tule,
 * mittari ei mittaa näkyvyyttä lainkaan ja kaikki vihreä on valhetta.
 * Luokat palautetaan täsmälleen ennalleen.
 */
async function vastakoe(s) {
  const ennen = await s.evaluate(() => {
    const b = document.body.classList;
    const oli = { pulu: b.contains('aikajana-pulu-piilossa') };
    b.remove('aikajana-pulu-piilossa');
    b.add('satelliitti-nimet');
    return oli;
  });
  await s.waitForTimeout(700);
  const nakyi = await s.evaluate(MITAT);
  await s.evaluate((oli) => {
    const b = document.body.classList;
    if (oli.pulu) b.add('aikajana-pulu-piilossa');
    b.remove('satelliitti-nimet');
  }, ennen);
  await s.waitForTimeout(700);
  return nakyi;
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

  const ele = await avaaLinssiEleella(s);
  vaadi(t('linssi aukeaa pelaajan omalla eleellä (laukku → ruutu → Aktivoi)'),
    ele.linssi === 'satelliitti' && ele.laukku === false,
    `linssi ${ele.linssi}, laukku auki ${ele.laukku}`);
  await rauhoitu(s);
  const linssi = await s.evaluate(MITAT);
  await kaappaa('1-linssi');

  /* 0. mittari itse: tyyli on sivulla ja vastakoe menee punaiseksi */
  vaadi(t('kriittinen piilotustyyli on sivulla ilman verkkoa'),
    linssi.kriittinenTyyli, `inline-tyyli ${linssi.kriittinenTyyli}`);
  vaadi(t('css/satelliitti.css on oikeasti ladattu'),
    linssi.tyylilinkki && linssi.tyylisaantoja !== 0,
    `linkki ${linssi.tyylilinkki}, sääntöjä ${linssi.tyylisaantoja}`);
  const vastassa = await vastakoe(s);
  vaadi(t('VASTAKOE: mittari näkee nimet, kun piilotus riisutaan'),
    vastassa.nimiaNakyvissa > 0,
    `${vastassa.nimiaNakyvissa}/${vastassa.nimiaYhteensa} — nolla tarkoittaisi, ettei mittari mittaa mitään`);
  vaadi(t('VASTAKOE: mittari näkee pulun, kun piilotus riisutaan'),
    vastassa.puluNappi === true, `nappi ${vastassa.puluNappi}`);

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

  /* 5. nimet vasta läheltä */
  vaadi(t('avausnäkymässä ei ole yhtään nimikylttiä'),
    linssi.nimiaNakyvissa === 0 && linssi.nimiaYhteensa > 0,
    `${linssi.nimiaNakyvissa}/${linssi.nimiaYhteensa} nimeä näkyvissä`);
  vaadi(t('vihreät pisteet ovat silti ruudulla'), linssi.nimiaYhteensa >= 5,
    `${linssi.nimiaYhteensa} pistettä kameran puolella`);

  // Lähizoom: kamera linssin lähimpään sallittuun korkeuteen.
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const tila = ui.pallolinssi.kahva.avaruus.tila();
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, altitude: tila.rajat.min }, 0);
    ui.pallolauta.heraa();
  });
  await rauhoitu(s);
  const lahella = await s.evaluate(MITAT);
  await kaappaa('1b-lahizoomi');
  vaadi(t('nimet syttyvät lähizoomissa'),
    lahella.nimiaNakyvissa > 0,
    `${lahella.nimiaNakyvissa}/${lahella.nimiaYhteensa} nimeä näkyvissä korkeudella ${lahella.korkeus}`);
  /*
   * "KAIKKI KAMERAN PUOLEN NIMET" EI OLE ENÄÄ OIKEA VÄITE: lähimmässä
   * zoomissa pallo on 1 500–2 500 px leveä, joten suuri osa kameran
   * puolen kohteista on ruudun ULKOPUOLELLA — ja mittari lukee nyt
   * myös ruutupaikan (ks. maalattu). Väite on siksi se, mikä
   * pelaajalle merkitsee: ruudulla olevat nimet näkyvät.
   */
  vaadi(t('lähizoomissa nimiä on esillä useampi kuin yksi'),
    lahella.nimiaNakyvissa >= 2,
    `${lahella.nimiaNakyvissa}/${lahella.nimiaYhteensa}`);

  // Takaisin avausnäkymään: nimet sammuvat uudestaan (hystereesi ei jumita).
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const tila = ui.pallolinssi.kahva.avaruus.tila();
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, altitude: tila.avauskorkeus }, 0);
    ui.pallolauta.heraa();
  });
  await rauhoitu(s);
  const takaisin = await s.evaluate(MITAT);
  vaadi(t('nimet sammuvat kun zoomataan takaisin ulos'),
    takaisin.nimiaNakyvissa === 0,
    `${takaisin.nimiaNakyvissa}/${takaisin.nimiaYhteensa}`);

  /* 6. pulu piilossa */
  /*
   * PUUTTUVA ELEMENTTI EI OLE TODISTE (ks. tiedoston alku, kohta C):
   * jokainen pinta, joka OLI olemassa ennen linssiä, on oltava olemassa
   * ja piilossa linssin aikana. Aiempi väite hyväksyi nullin.
   */
  const puluPinnat = ['puluNappi', 'puluPaneeli', 'puluKuplapino', 'puluKasvot'];
  const puluJaiNakyviin = puluPinnat.filter((k) => ennen[k] !== null && linssi[k] !== false);
  vaadi(t('pulu on piilossa linssin ajan — jokainen pinta erikseen'),
    linssi.puluPiilossa && puluJaiNakyviin.length === 0,
    `luokka ${linssi.puluPiilossa}, jäi näkyviin: ${puluJaiNakyviin.join(', ') || 'ei mitään'}`
    + ` (${puluPinnat.map((k) => `${k} ${ennen[k]}→${linssi[k]}`).join(', ')})`);
  vaadi(t('pulu näkyi ennen linssiä'), ennen.puluNappi === true,
    `nappi ${ennen.puluNappi}`);

  /* 8. muut äänet vaikenevat */
  vaadi(t('linssi vaiensi muut äänet'), linssi.aanetHiljaa === true,
    `hiljennys ${linssi.aanetHiljaa}`);

  /* 9. pelin oma reliefi pallon pinnalla */
  vaadi(t('pallon pinta on pelin oma reliefi eikä pelkkä vyöhykeväri'),
    linssi.avaruus?.reliefi === true,
    `reliefi ${linssi.avaruus?.reliefi}, generoitu ${linssi.avaruus?.tekstuuri}`);

  /* 4. kapea zoom ja pyöritys */
  /*
   * YKSI TASO LISÄÄ (omistaja 12.9.2026). Lähin raja laski 0,55 ×
   * avauksesta 0,12 × avaukseen, pohjana absoluuttinen 0,1 (noin
   * 640 km). Pintaan ei silti sukelleta.
   */
  vaadi(t('zoom ei päästä pintaan'), linssi.minKorkeus >= 0.099,
    `lähin korkeus ${linssi.minKorkeus}`);
  vaadi(t('zoomissa on yksi taso lisää'), linssi.minKorkeus < linssi.korkeus * 0.5,
    `lähin ${linssi.minKorkeus}, avaus ${linssi.korkeus}`);
  vaadi(t('zoom ei kadota palloa'), linssi.maxKorkeus < linssi.korkeus * 1.4,
    `kauin korkeus ${linssi.maxKorkeus}, avaus ${linssi.korkeus}`);
  vaadi(t('zoomikaista on yhä pelin omaa kapeampi'),
    linssi.maxKorkeus / linssi.minKorkeus < 15,
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
  vaadi(t('pulu palasi ruudulle'),
    jalkeen.puluNappi === ennen.puluNappi && !jalkeen.puluPiilossa,
    `nappi ${jalkeen.puluNappi}, luokka ${jalkeen.puluPiilossa}`);
  vaadi(t('äänet palasivat sulkemisen jälkeen'), jalkeen.aanetHiljaa === false,
    `hiljennys ${jalkeen.aanetHiljaa}`);
  vaadi(t('nimiluokka ei jäänyt bodyyn'),
    !(await s.evaluate(() => document.body.classList.contains('satelliitti-nimet'))));
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
