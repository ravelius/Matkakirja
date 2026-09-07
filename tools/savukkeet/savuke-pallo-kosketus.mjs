/*
 * Savuke: ROIKKUVA KOSKETUS — yksi sormi panoroi aina (vika v1671).
 *
 * Omistajan iPad-havainto 7.9.2026 ilta, Ihmisen matka -linssin
 * lopussa, sanatarkasti: *"Kartan pyörittämisessä on joku bugi, koska
 * näyttää ihan kuin yksi sormi olisi koko ajan painettuna. jos koitan
 * yhdellä sormella vierittää, niin kartta zoomautuukin sisään ja ulos,
 * eikä vierity."*
 *
 * Juurisyy ja koko ketju: docs/moduulit/karttapallo.md luku 17.
 * Lyhyesti: three.js:n OrbitControls pitää sormilistaa (`_pointers`).
 * Yksi sormi kiertää (pallolla pois käytöstä), KAKSI nipistää — joten
 * yksi unohtunut sormi tekee jokaisesta seuraavasta yhden sormen
 * vedosta nipistyksen, ja koska unohtuneen sormen paikka ei liiku,
 * pallo zoomaa sisään ja ulos sormen mukana.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. YKSI SORMI PANOROI. Veto pallolla kääntää palloa (pituusaste
 *      muuttuu) eikä muuta korkeutta (|Δaltitude| ≤ 0,0005).
 *   2. ROIKKUVA SORMI EI JÄÄ. Kirjaston listaan istutetaan unohtunut
 *      sormi (juuri se tila, jonka kadonnut pointercancel jättää), ja
 *      seuraava YHDEN sormen veto panoroi silti — pallon sormivahti
 *      nollaa listan ennen kirjaston omaa pointerdownia. Ilman
 *      korjausta tämä veto zoomaa.
 *   3. KUPLA SULJETAAN KESKEN KOSKETUKSEN. Sormi on POHJASSA pallolla,
 *      kun pulun kupla suljetaan napautuksesta: veto jatkuu
 *      katkeamatta (tämä vartioi `vapautaKosketus`in `paitsi`-säännön
 *      — pohjassa olevaa sormea ei saa unohtaa) ja seuraava uusi veto
 *      panoroi. Saman kohdan alussa vartioidaan myös, että kuplapinon
 *      viimeisin kupla ON pallolaudalla osumapintana (3d,
 *      elementFromPoint) ja että AITO kosketus sen koordinaattiin
 *      sulkee sen (3e): pallon kuori ei saa nousta pinon päälle
 *      laudalla, tai pulun kuplat lakkaisivat vastaamasta sormeen ja
 *      pallo pyörähtäisi vastauksen sijaan.
 *   4. LINSSIN LOPPULAPPU. Ihmisen matka ajetaan loppuun, loppusanojen
 *      Sulje-nappia kosketetaan (linssin kerrokset katoavat kesken
 *      kosketuksen), sitten veto: panoroi.
 *   5. KAKSI SORMEA ZOOMAA YHÄ. Nipistys muuttaa korkeutta — korjaus ei
 *      saa viedä nipistystä.
 *
 * AJOJÄRJESTYS on 1, 2, 5, 3, 4: linssin ajo kestää kontissa
 * minuutteja, eikä nopeita vartioita saa jättää sen taakse.
 *
 * MIKSI ROIKKUVA SORMI ISTUTETAAN (vartio 2): kontin Chromium tuottaa
 * aina siistin pointerup/pointercancel-parin, eikä ele-sarjaa, joka
 * pudottaisi lopun, saatu toistettua CDP:n kosketuksilla (mitattu
 * 7.9.2026: nipistys, peruutus kesken vedon, veto kotelon ulkopuolelle
 * — kaikissa `_pointers` tyhjeni oikein). Vika elää iPadin
 * WebKitissä, jossa kadonnut pointercancel on arkea. Vartio mittaa
 * siksi SEURAUKSEN: pallo on siinä tilassa, jonka kadonnut loppu
 * jättää, ja korjauksen on selvittävä siitä.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-kosketus.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi ladata, kosketusvartioita ei voi ajaa');
  palvelin.close();
  process.exit(0);
}

/* Tallenne: Fogg Ateenassa, aarre löydetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
/*
 * IPADIN MITAT JA OIKEA KOSKETUS: hasTouch + CDP:n Input.dispatchTouchEvent.
 * JS:llä lähetetty TouchEvent ei synnytä osoitintapahtumia lainkaan,
 * eikä Playwrightin oma kosketus osaa vetoa (vain napautuksen).
 */
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1100 }, deviceScaleFactor: 2, hasTouch: true, serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
/*
 * Reititetyt katkot (wikimedia, worker) tulevat konsoliin
 * "Failed to load resource" -riveinä eivätkä ole sivun kaatumisia:
 * ne kuuluvat savukkeen omaan reititykseen.
 */
sivu.on('console', (m) => {
  if (m.type() !== 'error') return;
  const teksti = m.text();
  if (/Failed to load resource|ERR_FAILED|ERR_ABORTED/.test(teksti)) return;
  virheet.push(teksti);
});
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallonInstanssi), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki, 'ui.pallonInstanssi ei syntynyt');
if (!auki) { await selain.close(); palvelin.close(); process.exit(1); }
await sivu.waitForTimeout(3000);

const cdp = await ctx.newCDPSession(sivu);
const KOSKETUS_SADE = 6;
const kosketa = (tyyppi, pisteet) => cdp.send('Input.dispatchTouchEvent', {
  type: tyyppi,
  touchPoints: pisteet.map((p) => ({
    ...p, radiusX: KOSKETUS_SADE, radiusY: KOSKETUS_SADE, force: 1,
  })),
});

/** Kameran asento ja ohjaimen sormilista. */
const kamera = () => sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  const ohj = pallo?.controls?.();
  const pov = pallo?.pointOfView?.() ?? {};
  return {
    lat: pov.lat, lng: pov.lng, alt: pov.altitude,
    pointers: Array.isArray(ohj?._pointers) ? [...ohj._pointers] : null,
    sormet: ui.pallonSormet ? ui.pallonSormet.alhaalla : null,
  };
});

/**
 * Piste, jossa sormi osuu PALLON KANKAASEEN. Kotelon keskelle voi
 * jäädä kelluva kerros (kaupunkilehden kuva, kortti), ja silloin veto
 * ei koskisi palloa lainkaan — piste haetaan elementFromPointilla.
 */
const kankaanPiste = () => sivu.evaluate(() => {
  const kotelo = document.querySelector('.pallo-kotelo');
  const kangas = kotelo.querySelector('canvas');
  const r = kotelo.getBoundingClientRect();
  const cx = Math.round(r.left + r.width / 2);
  const cy = Math.round(r.top + r.height / 2);
  for (const dy of [0, 60, -60, 120, -120, 180, -180]) {
    for (const dx of [0, 80, -80, 160, -160, 240, -240]) {
      if (document.elementFromPoint(cx + dx, cy + dy) === kangas) return { x: cx + dx, y: cy + dy, kangas: true };
    }
  }
  return { x: cx, y: cy, kangas: false };
});
let keskus = await kankaanPiste();
tieto('kankaan kosketuspiste', `${keskus.x}, ${keskus.y}`);

/*
 * KAUPUNKILEHTI SULJETAAN VETOJEN VÄLISSÄ. Chromiumin CDP-kosketus ei
 * aseta pointermoven movementX/Y:tä, joten Globe.gl:n oma
 * raahaustunnistus (isPointerDragging) ei laukea ja veto päättyy myös
 * KLIKKINÄ — lauta avaa kaupunkilehden, joka pysäyttää pallon ja
 * peittää keskikohdan. Oikealla laitteella näin ei käy; savukkeen on
 * silti siivottava jälkensä, jotta seuraava mittaus on puhdas.
 */
const suljeLehti = async () => {
  const oli = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const auki = Boolean(ui.arrivalDialog?.open);
    if (auki) ui.arrivalDialog.close();
    return auki;
  });
  if (oli) await sivu.waitForTimeout(300);
  return oli;
};

/**
 * Yhden sormen veto. Kamera luetaan VIIMEISEN LIIKKEEN kohdalla, ennen
 * irrotusta: sekä panorointi että nipistys ovat silloin jo tehneet
 * työnsä, eikä mittaukseen sekoitu irrotuksen liuku tai klikin
 * sivuvaikutukset.
 */
async function veto(dx, dy, { id = 1, alku = keskus } = {}) {
  const ennen = await kamera();
  await kosketa('touchStart', [{ x: alku.x, y: alku.y, id }]);
  for (let i = 1; i <= 8; i += 1) {
    await kosketa('touchMove', [{ x: alku.x + (dx * i) / 8, y: alku.y + (dy * i) / 8, id }]);
    await sivu.waitForTimeout(20);
  }
  const liikkeessa = await kamera();
  await kosketa('touchEnd', []);
  await sivu.waitForTimeout(400);
  const jalkeen = await kamera();
  await suljeLehti();
  return { ennen, liikkeessa, jalkeen };
}

/** Napautus ruudun pisteeseen oikeana kosketuksena. */
async function napauta(x, y, id = 1) {
  await kosketa('touchStart', [{ x, y, id }]);
  await sivu.waitForTimeout(60);
  await kosketa('touchEnd', []);
  await sivu.waitForTimeout(400);
}

/**
 * Panoroiko veto? Palauttaa mittarit ja tuomion.
 *
 * SIVU VOI KUOLLA ALTA: kontin ohjelmisto-WebGL kaatuu joskus
 * muistipaineessa (etenkin linssin ajon jälkeen), ja silloin CDP:n
 * kosketus heittää. Se on ympäristön vika eikä pelin — mutta se on
 * FAIL, ei jäljetön poikkeus, jotta ajojono näkee mitä tapahtui.
 */
async function mittaaVeto(nimi) {
  let mitat = null;
  try {
    mitat = await veto(150, 0);
  } catch (e) {
    tieto(nimi, `mittaus keskeytyi: ${String(e?.message ?? e).split('\n')[0]}`);
    return { panoroi: false, dLng: 0, dAlt: 0, jalkeen: {}, kaatui: true };
  }
  const { ennen, liikkeessa, jalkeen } = mitat;
  const dLng = liikkeessa.lng - ennen.lng;
  const dAlt = liikkeessa.alt - ennen.alt;
  /*
   * Korkeus on suhdeluku (pallon säteinä). Roikkuva sormi vei sen
   * mitattuna 0,169 → 0,042 yhdellä vedolla (7.9.2026), joten 0,0005 on
   * turvallinen "ei liikahtanutkaan" -raja. Pituusasteen 0,2° on
   * murto-osa siitä 1,7°:sta, jonka 150 pikselin veto kääntää.
   */
  const panoroi = Math.abs(dAlt) <= 0.0005 && Math.abs(dLng) > 0.2;
  tieto(nimi, `Δlng ${dLng.toFixed(3)}° Δkorkeus ${dAlt.toFixed(5)} `
    + `sormet ${jalkeen.sormet} kirjaston lista ${JSON.stringify(jalkeen.pointers)}`);
  return { panoroi, dLng, dAlt, jalkeen, kaatui: false };
}

/* ---------- 1. yhden sormen veto panoroi ---------- */
const v1 = await mittaaVeto('1 veto ilman häiriötä');
vaadi('1 yhden sormen veto panoroi (suunta muuttuu, korkeus ei)', v1.panoroi,
  `Δlng ${v1.dLng.toFixed(3)} Δkorkeus ${v1.dAlt.toFixed(5)}`);

/* ---------- 2. roikkuva sormi kirjaston listassa ---------- */
const istutettu = await sivu.evaluate((piste) => {
  const ohj = window.matkakirja.ui.pallonInstanssi.controls();
  if (!Array.isArray(ohj._pointers)) return false;
  /*
   * SAMA TILA, JONKA KADONNUT LOPPU JÄTTÄÄ. Kaksi sormea pallolla:
   * lista on [A, B] ja kirjasto on kiinnittänyt liike- ja
   * nostokuuntelijansa DOKUMENTTIIN. Jos B:n loppu ei tule perille,
   * A:n nosto vie listan pituuteen 1 — kirjaston "case 1" -haara,
   * joka EI irrota dokumentin kuuntelijoita eikä palauta tilaa. Siihen
   * jää siis: yksi sormi listassa, kuuntelijat kiinni, tila
   * TOUCH_DOLLY_PAN (kirjaston vakio 5). Seuraava YKSI sormi luetaan
   * kakkoseksi, ja koska roikkuvan paikka ei liiku, pallo zoomaa
   * sisään ja ulos sormen mukana — juuri omistajan oire.
   */
  ohj._pointers.push(9901);
  ohj._pointerPositions[9901] = { x: piste.x, y: piste.y, set() {} };
  document.addEventListener('pointermove', ohj._onPointerMove);
  document.addEventListener('pointerup', ohj._onPointerUp);
  ohj.state = 5;
  return ohj._pointers.length === 1;
}, keskus);
vaadi('2a roikkuva sormi saatiin istutettua kirjaston listaan', istutettu, 'controls._pointers ei ole taulukko');
const v2 = await mittaaVeto('2 veto roikkuvan sormen jälkeen');
vaadi('2 roikkuvan sormen jälkeen yhden sormen veto panoroi (ei zoomaa)', v2.panoroi,
  `Δlng ${v2.dLng.toFixed(3)} Δkorkeus ${v2.dAlt.toFixed(5)} — sormi jäi listaan`);
vaadi('2b kirjaston sormilista on vedon jälkeen tyhjä',
  Array.isArray(v2.jalkeen.pointers) && v2.jalkeen.pointers.length === 0,
  JSON.stringify(v2.jalkeen.pointers));

/* ---------- 5. kaksi sormea zoomaa yhä ---------- */
/*
 * Nipistys ajetaan ENNEN kuplaa ja linssiä: linssin ajo kestää
 * kontissa minuutteja, eikä nopeaa vartiota saa jättää sen taakse.
 */
await suljeLehti();
keskus = await kankaanPiste();
const ennenNipistysta = await kamera();
const A = { x: keskus.x - 70, y: keskus.y };
const B = { x: keskus.x + 70, y: keskus.y };
await kosketa('touchStart', [{ x: A.x, y: A.y, id: 11 }]);
await sivu.waitForTimeout(40);
await kosketa('touchStart', [{ x: A.x, y: A.y, id: 11 }, { x: B.x, y: B.y, id: 12 }]);
for (let i = 1; i <= 6; i += 1) {
  // Sormet lähestyvät toisiaan = zoom ulos (vähemmän laattoja kuin sisään).
  await kosketa('touchMove', [
    { x: A.x + i * 8, y: A.y, id: 11 },
    { x: B.x - i * 8, y: B.y, id: 12 },
  ]);
  await sivu.waitForTimeout(25);
}
await kosketa('touchEnd', [{ x: B.x - 48, y: B.y, id: 12 }]);
await sivu.waitForTimeout(40);
await kosketa('touchEnd', []);
await sivu.waitForTimeout(600);
const nipistyksenJalkeen = await kamera();
const dZoom = nipistyksenJalkeen.alt - ennenNipistysta.alt;
tieto('5 nipistys', `korkeus ${ennenNipistysta.alt.toFixed(4)} → ${nipistyksenJalkeen.alt.toFixed(4)}`);
vaadi('5 kahden sormen nipistys zoomaa yhä', Math.abs(dZoom) > 0.005, `Δkorkeus ${dZoom.toFixed(5)}`);
vaadi('5b nipistyksen jälkeen kirjaston sormilista on tyhjä',
  Array.isArray(nipistyksenJalkeen.pointers) && nipistyksenJalkeen.pointers.length === 0,
  JSON.stringify(nipistyksenJalkeen.pointers));

/* ---------- 3. kupla suljetaan kesken kosketuksen ---------- */
/*
 * OIKEA ELE: sormi on POHJASSA pallolla, kun kupla suljetaan. Juuri
 * tässä järjestyksessä kerros katoaa kesken kosketuksen — ja juuri
 * tässä ilmoituksen (js/ui-apurit.js vapautaKosketus) on unohdettava
 * roikkuvat sormet MUTTA säästettävä se, joka on yhä pohjassa
 * (`paitsi`). Jos sääntö menee väärin päin, veto katkeaa tähän.
 */
const kupla = await sivu.evaluate(async () => {
  const pollo = await import('/js/pollo.js');
  const nakyi = pollo.polloSaapumiskupla('Kääk! Katsopa tätä palloa hetki.');
  await new Promise((r) => setTimeout(r, 500));
  /*
   * VIIMEISIN KUPLA ON SE, JOHON PELAAJA YLTÄÄ. Supistetussa pinossa
   * vanhemmat kuplat on sekä leikattu pinon katon yläpuolelle (pino
   * on vieritetty pohjaan) että kytketty pois kosketuksista (css
   * `.pollo-kuplapino:not(.pollo-kuplapino-laaja) .pollo-vihje:not(:last-child)`
   * → pointer-events: none). Niiden keskipisteestä elementFromPoint
   * antaa siis kartan, ja niin kuuluukin. Osumavartio mittaa vain
   * viimeisintä — sitä ainoaa, jonka on määrä olla napautettavissa.
   */
  const kuplat = [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')];
  const el = kuplat.at(-1) ?? null;
  if (!el) return { nakyi, paikka: null };
  const r = el.getBoundingClientRect();
  const x = Math.round(r.left + r.width / 2);
  const y = Math.round(r.top + r.height / 2);
  const paalla = document.elementFromPoint(x, y);
  return {
    nakyi,
    paikka: { x, y },
    kuplia: kuplat.length,
    osuma: paalla === el || el.contains(paalla),
    paalla: `${paalla?.tagName ?? 'null'}.${typeof paalla?.className === 'string' ? paalla.className : ''}`,
  };
});
vaadi('3a pulun kupla saatiin ruudulle', Boolean(kupla.paikka), JSON.stringify(kupla));
if (kupla.paikka) {
  /*
   * KUPLAPINO ON PALLOLAUDALLA KOSKETETTAVISSA (vartio 3d, 7.9.2026).
   *
   * Pallolauta on pelin lauta, ei ikkuna: pulu on sen päällä pelin osa
   * ja sen viimeisimmän kuplan on otettava sormi vastaan — napautus
   * avaa chatin (js/pollo.js sidoKuplanNapautus) ja pystyveto laajentaa
   * pinon (varmistaPino, `kelaus laajentaa`). Jos pallon kuori nousee
   * kuplapinon (z-index 40) päälle, sormi menee kankaalle ja pallo
   * pyörii sen sijaan, että pulu vastaisi. Tämä oli aiemmin pelkkä
   * INFO-huomio; nyt se on VIRHE, jotta vika ei voi palata hiljaa.
   *
   * Mittaus on elementFromPoint kuplan keskeltä, ja AITO KOSKETUS samaan
   * koordinaattiin ajetaan omana vartionaan (3e) heti tämän kohdan
   * jälkeen — vain aito kosketus kulkee osumapinnan läpi.
   */
  vaadi('3d kuplapinon viimeisin kupla on pallolaudalla kosketettavissa', kupla.osuma === true,
    `kuplan keskeltä (${kupla.paikka.x}, ${kupla.paikka.y}) osuu ${kupla.paalla} `
    + `— kuplapino jää pallon kuoren alle (kuplia ${kupla.kuplia})`);
  const alkuTila = await kamera();
  // Sormi pohjaan pallolle ja liikkeelle.
  await kosketa('touchStart', [{ x: keskus.x, y: keskus.y, id: 21 }]);
  for (let i = 1; i <= 4; i += 1) {
    await kosketa('touchMove', [{ x: keskus.x + i * 12, y: keskus.y, id: 21 }]);
    await sivu.waitForTimeout(20);
  }
  /*
   * KESKEN KOSKETUKSEN SULKU AJETAAN KUPLAN OMAAN ELEMENTTIIN, ja tällä
   * kertaa syystä (mitattu 7.9.2026): kun pallolla on jo sormi pohjassa,
   * CDP:n toinen kosketuspiste peruuntuu (pointercancel) ennen kuin
   * kuplan napautussopimus ehtii nousuun, eikä kuplaa saa suljettua
   * aidolla toisella sormella lainkaan. Osumapinta mitataan siksi
   * erikseen (3d) ja aito napautus ajetaan omana vartionaan (3e); tämän
   * vartion asia on VAIN se, mitä `vapautaKosketus`in `paitsi`-sääntö
   * tekee pohjassa olevalle sormelle, ja siihen dispatch riittää — se
   * ajaa saman polun (sulku, nielu, kosketuksen vapautus) kuin
   * pelaajan napautuskin.
   */
  const suljettu = await sivu.evaluate((paikka) => {
    const el = [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')].at(-1) ?? null;
    if (!el) return false;
    const tee = (laji) => el.dispatchEvent(new PointerEvent(laji, {
      bubbles: true, cancelable: true, pointerId: 88, pointerType: 'touch',
      clientX: paikka.x, clientY: paikka.y,
    }));
    tee('pointerdown');
    tee('pointerup');
    return true;
  }, kupla.paikka);
  await sivu.waitForTimeout(400);
  const kuplia = await sivu.evaluate(() => document.querySelectorAll('.pollo-kuplapino .pollo-vihje').length);
  vaadi('3b napautus sulki kuplan', suljettu && kuplia === 0, `kuplia jäljellä ${kuplia}`);
  // Sama sormi jatkaa: kuplan sulku ei saa katkaista vetoa.
  for (let i = 5; i <= 12; i += 1) {
    await kosketa('touchMove', [{ x: keskus.x + i * 12, y: keskus.y, id: 21 }]);
    await sivu.waitForTimeout(20);
  }
  const kesken = await kamera();
  await kosketa('touchEnd', []);
  await sivu.waitForTimeout(400);
  await suljeLehti();
  const dLng3 = kesken.lng - alkuTila.lng;
  const dAlt3 = kesken.alt - alkuTila.alt;
  tieto('3 veto kuplan sulun yli', `Δlng ${dLng3.toFixed(3)}° Δkorkeus ${dAlt3.toFixed(5)}`);
  vaadi('3 kuplan sulku kesken kosketuksen ei katkaise vetoa eikä zoomaa',
    Math.abs(dAlt3) <= 0.0005 && Math.abs(dLng3) > 0.2,
    `Δlng ${dLng3.toFixed(3)} Δkorkeus ${dAlt3.toFixed(5)}`);
  keskus = await kankaanPiste();
  const v3 = await mittaaVeto('3 veto kuplan sulun jälkeen');
  vaadi('3c kuplan sulun jälkeen uusi yhden sormen veto panoroi', v3.panoroi,
    `Δlng ${v3.dLng.toFixed(3)} Δkorkeus ${v3.dAlt.toFixed(5)}`);

  /*
   * 3e. AITO NAPAUTUS KUPLAAN. Uusi kupla pinoon ja sormi sen
   * koordinaattiin CDP:n kosketuksena — ei dispatchia elementtiin.
   * Tämä on pelaajan ele pallolaudalla, ja se kulkee perille vain, jos
   * kupla todella on osumapinta (3d:n toinen puoli). Ajetaan vasta
   * vartion 3 jälkeen: napautus avaa chatin, ja avoin chatti muuttaisi
   * pinon tilan sen alta.
   */
  const kupla2 = await sivu.evaluate(async () => {
    const pollo = await import('/js/pollo.js');
    pollo.polloSaapumiskupla('Kääk! Ja vielä yksi sana matkaan.');
    await new Promise((r) => setTimeout(r, 500));
    const el = [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')].at(-1) ?? null;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  vaadi('3e1 toinen kupla saatiin ruudulle', Boolean(kupla2), 'pino jäi tyhjäksi');
  if (kupla2) {
    await napauta(kupla2.x, kupla2.y, 88);
    const jaljella = await sivu.evaluate(() => document.querySelectorAll('.pollo-kuplapino .pollo-vihje').length);
    vaadi('3e aito napautus kuplan koordinaattiin sulkee kuplan', jaljella === 0,
      `kuplia jäljellä ${jaljella} — kosketus ei kulkenut kuplaan asti`);
    // Napautus avaa chatin: se pois alta ennen linssiä.
    await sivu.evaluate(async () => (await import('/js/pollo.js')).polloSulje());
    await sivu.waitForTimeout(300);
    await suljeLehti();
  }
}

/* ---------- 4. linssin loppulappu ---------- */
const linssi = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
  ui.valitseLinssi('ihmisen-matka');
  for (let i = 0; i < 800; i += 1) {
    if (ui.aikajana) break;
    await new Promise((r) => setTimeout(r, 25));
  }
  if (!ui.aikajana) return { auki: false };
  await ui.aikajana.virrat?.valmis;
  /*
   * AVAUSLAATIKKO POIS ENSIN: linssi alkaa peitteellä ja Käynnistä-
   * napilla, ja se peittää koko ruudun. Ilman tätä loppulappua ei
   * pääse koskettamaan (mitattu 7.9.2026: elementFromPoint antoi
   * .aikajana-avaus-laatikon).
   */
  document.querySelector('.aikajana-avaus-nappi')?.click();
  await new Promise((r) => setTimeout(r, 900));
  // Suoraan loppuun: sama tila kuin kaaren päätyttyä (loppusanat +
  // Katso löydöt / Sulje -napit).
  ui.aikajana.lopeta();
  await new Promise((r) => setTimeout(r, 900));
  const napit = [...document.querySelectorAll('.aikajana-loppunappi')];
  const sulje = napit.find((n) => n.textContent.trim() === 'Sulje');
  if (!sulje) return { auki: true, nappi: null, nappeja: napit.length };
  const r = sulje.getBoundingClientRect();
  const x = Math.round(r.left + r.width / 2);
  const y = Math.round(r.top + r.height / 2);
  const paalla = document.elementFromPoint(x, y);
  return {
    auki: true,
    nappi: { x, y },
    osuma: paalla === sulje || sulje.contains(paalla),
    paalla: `${paalla?.tagName}.${typeof paalla?.className === 'string' ? paalla.className : ''}`,
  };
});
if (!linssi.auki || !linssi.nappi) {
  vaadi('4 linssin loppulapun sulku ei jätä sormea', false,
    `Ihmisen matkan loppulappua ei saatu ruudulle: ${JSON.stringify(linssi)}`);
} else {
  vaadi('4a loppulapun Sulje on kosketettavissa', linssi.osuma === true, `päällimmäisenä ${linssi.paalla}`);
  await napauta(linssi.nappi.x, linssi.nappi.y, 31);
  await sivu.waitForTimeout(600);
  const linssiKiinni = await sivu.evaluate(() => !window.matkakirja.ui.aikajana);
  vaadi('4b loppulapun Sulje sulkee linssin kosketuksesta', linssiKiinni, 'ui.aikajana jäi eloon');
  await suljeLehti();
  keskus = await kankaanPiste();
  tieto('4 kankaan kosketuspiste linssin jälkeen', `${keskus.x}, ${keskus.y} (kangas ${keskus.kangas})`);
  const v4 = await mittaaVeto('4 veto loppulapun sulun jälkeen');
  vaadi('4 linssin loppulapun sulun jälkeen yhden sormen veto panoroi', v4.panoroi,
    v4.kaatui ? 'sivu kaatui kesken mittauksen (kontin WebGL)'
      : `Δlng ${v4.dLng.toFixed(3)} Δkorkeus ${v4.dAlt.toFixed(5)}`);
}

if (virheet.length) tieto('sivun virheet', virheet.slice(0, 5).join(' | '));
vaadi('sivu ei kaatunut kosketusten aikana', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close().catch(() => {});
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
