/*
 * Savuke: NOPANHEITON KOHTEET JÄÄVÄT RUUDULLE.
 *
 * LÖYDÖS (Sonnet-testaaja, iPhone 18 Pro -simulaattori, tuotanto v1952,
 * 19.9.2026 klo 13.55-14.10,
 * docs/raportit/viesti-fable-ranska-testipeli-5-20260919.md löydös 1):
 * Pariisi -> Liiku -> liftaus -> Amsterdam, ja heti perään uusi Liiku ->
 * liftaus -> noppa. Noppa näytti kuutosen, mutta kamera panoroitui
 * TYHJÄLLE pergamentille Maastrichtin kaakkoispuolelle: kohteita ei
 * näkynyt, reittiä ei näkynyt, eikä nappula ollut ruudulla. Mikään
 * napautus ei tehnyt mitään, ja uudelleenlatauksen jälkeen myös Liiku-
 * nappi oli poissa. Sama oire toistui Tangerin laivapolulla ilman
 * saapumisluentaa (Fablen tarkennus klo 14.22).
 *
 * ── JUURISYY, JOTA TÄMÄ SAVUKE VARTIOI ────────────────────────────
 *
 * `sovitaSiirtokohteet` (js/ui.js) ajaa kameran ulospäin niin, että
 * heiton vaihtoehdot mahtuvat ruutuun. Ajo kirjoittaa `pointOfView`in
 * suoraan joka kehyksessä, joten uloszoomaus NÄYTTÄÄ onnistuvan —
 * mutta kohdemaan uloszoomauskatto elää OrbitControlsin
 * `maxDistance`issa (js/pallolauta/lauta.js tahdistaZoomirajat,
 * maanZoomiraja), ja se puree vasta kun ajo lakkaa kirjoittamasta.
 * Ajon päätyttyä ohjain kuristi korkeuden takaisin saapumisnäkymän
 * lukemaan JA JÄTTI PANOROIDUN KESKIPISTEEN paikalleen: lähikuva
 * tyhjää maata kohteiden puolivälissä, nappula ja kohteet ruudun
 * ulkopuolella. Esto kumotaan lennolla, matkavalikossa ja siirron
 * animaatiossa — nopanheiton oma sovitus oli ainoa reitti ilman
 * kumousta.
 *
 * ── MIKSI SAVUKE EIKÄ YKSIKKÖTESTI ────────────────────────────────
 *
 * Pelisäännöt olivat koko ajan kunnossa: heitto tuottaa lailliset
 * siirrot ja `game.moveOptions()` palauttaa ne. Vika on KAMERASSA ja
 * kohteiden RUUTUSIJAINNISSA — kumpaakaan ei ole Nodessa olemassa.
 * Siksi väitteet mitataan ruudun pikseleinä oikeassa selaimessa.
 *
 * ── VÄITTEET ──────────────────────────────────────────────────────
 *
 *   1. Heiton jälkeen peli ei jää ilman kohteita: vaihe on 'move' ja
 *      pallolaudalla on vähintään yksi kohdemerkki.
 *   2. NAPPULA ON RUUDULLA heiton jälkeen (löydöksen ydin: pelaaja
 *      näki tyhjää pergamenttia eikä omaa nappulaansa).
 *   3. VÄHINTÄÄN YKSI KOHDE ON RUUDULLA eli napautettavissa.
 *   4. Uudelleenlataus kesken siirtovaiheen palauttaa pelin
 *      pelattavaan tilaan: Liiku-nappi on DOMissa (vaiheessa 'move'
 *      renderActions ei piirrä yhtään nappia, joten jumitila ei saa
 *      säilyä tallennuksessa).
 *
 * Vastakoe ilman korjausta kaatuu väitteisiin 2 ja 3 (mitattu
 * 19.9.2026: nappula ruudulla −243, −233 ja kohteet −758, 556 ja
 * 908, −316 kun ruutu on 390 x 844) sekä väitteeseen 4.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1), koska
 * media.matkakirja.app ei anna CORS-lupaa 127.0.0.1:lle. Ilman ämpäriä
 * palloa ei saa auki ja savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-noppa-saapumisen-aikana.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { findMoves } from '../../js/rules.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
// CommonJS-paketti voi tulla default-kääreen sisällä (Macin runner 19.9.2026).
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Puhelimen ruutu: löydös tuli iPhonesta, joten 390 px on se mitta. */
const RUUTU = { nimi: '390 px', width: 390, height: 844, dpr: 2 };
/** Kamera-ajo ja sen jälkeinen zoomirajojen tahdistus mahtuvat tähän. */
const KAMERAN_ASETTUMINEN_MS = 6000;

const KAIKKI_SELAIMET = [
  {
    nimi: 'chromium',
    latauskatto: 60000,
    avaa: () => paketti.chromium.launch({
      executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
    }),
  },
  { nimi: 'webkit', latauskatto: 90000, avaa: () => paketti.webkit.launch() },
];
const SELAIMET = process.env.SAVUKE_SELAIN
  ? KAIKKI_SELAIMET.filter((s) => s.nimi === process.env.SAVUKE_SELAIN)
  : KAIKKI_SELAIMET;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
/*
 * KOKEELLINEN VIIVE JA KATTO (vain mittaukseen, erä opus-local-goto
 * 19.9.2026): SAVUKE_VIIVE_MS viivästää jokaista paikallista vastausta ja
 * SAVUKE_LATAUSKATTO_MS korvaa selaimen latauskaton. Niillä todennetaan,
 * että latauksen aikakatkaisu päätyy FAIL-riviksi eikä poikkeukseksi.
 */
const VIIVE_MS = Number(process.env.SAVUKE_VIIVE_MS) || 0;
const palvelin = http.createServer(async (req, res) => {
  if (VIIVE_MS) await new Promise((v) => setTimeout(v, VIIVE_MS));
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const PALLON_PACK = packById('maailmankartta');

/**
 * Tallennus: Fogg on yhden askeleen päässä Amsterdamista Pariisin
 * puolella maantietä. Tila rakennetaan pelin omilla teoilla, jotta se
 * on täsmälleen se tila, johon pelaaja päätyy liftatessaan Pariisista.
 */
function amsterdaminKynnyksella() {
  const peli = new Game({
    // v1968: Bryssel tuli pelikaupungiksi Pariisin ja Amsterdamin väliin
    // (reitti Pariisi–Bryssel–Amsterdam), joten Amsterdamin kynnys on nyt
    // Bryssel–Amsterdam-kaarella. Lähtö Brysselistä pitää tilan samana kuin
    // ennen: yksi askel Amsterdamista, sama liftauslogiikka.
    players: [{ name: 'Fogg', color: '#c9a227', start: 'bryssel' }],
    pack: PALLON_PACK,
    seed: 7,
  });
  peli.phase = 'action';
  peli.actionTravel('land');
  let kaariId = null;
  let kaari = null;
  for (const [id, e] of peli.board.edgeById.entries()) {
    if ((e.a === 'bryssel' && e.b === 'amsterdam') || (e.a === 'amsterdam' && e.b === 'bryssel')) {
      kaariId = id; kaari = e; break;
    }
  }
  if (!kaari) throw new Error('Bryssel–Amsterdam-kaarta ei löydy laudalta');
  const idx = kaari.a === 'amsterdam' ? 0 : kaari.steps - 1;
  peli.player.pos = { type: 'edge', edge: kaariId, idx };
  peli.phase = 'action';
  peli.travelMode = null;
  // Varmistus: yhden askeleen päässä on nimenomaan Amsterdam.
  const yksi = findMoves(peli.board, peli.player.pos, 1, { mode: 'land' });
  return { tallenne: JSON.stringify(peli.toJSON()), amsterdamAskeleenPaassa: yksi.has('c:amsterdam') };
}

/**
 * Yksi lause pelin ja RUUDUN tilasta. Kohteiden ja nappulan paikat
 * luetaan `getBoundingClientRect`illa, koska juuri ruutusijainti on se,
 * mitä pelaaja näkee ja mitä sormi voi osua.
 */
const LUE = `() => {
  const { ui, game } = window.matkakirja;
  const nappi = (t) => [...document.querySelectorAll('#actions button, .toimintorivi button')]
    .find((b) => ((b.getAttribute('aria-label')||'') + ' ' + (b.textContent||'')).includes(t));
  const pl = ui.pallolauta;
  const pov = pl && pl.pallo ? pl.pallo.pointOfView() : null;
  const ruudulla = (r) => Boolean(r) && r.right > 0 && r.bottom > 0
    && r.left < window.innerWidth && r.top < window.innerHeight;
  const kohteet = [...document.querySelectorAll('.pallolauta-kohde')].map((e) => {
    const r = e.getBoundingClientRect();
    return {
      key: e.dataset.kohde,
      x: Math.round(r.x), y: Math.round(r.y),
      ruudulla: ruudulla(r) && !e.classList.contains('pallolauta-takana'),
    };
  });
  const n = document.querySelector('.pallolauta-nappula');
  const nr = n ? n.getBoundingClientRect() : null;
  const p = game.player.pos;
  return {
    vaihe: game.phase,
    die: game.die,
    busy: Boolean(ui.busy),
    moveOptions: (game.moveOptions ? game.moveOptions() : []).length,
    kohteita: kohteet.length,
    kohteitaRuudulla: kohteet.filter((k) => k.ruudulla).length,
    kohteet,
    nappula: nr ? { x: Math.round(nr.x), y: Math.round(nr.y), ruudulla: ruudulla(nr) } : null,
    pov: pov ? { lat: Math.round(pov.lat*100)/100, lng: Math.round(pov.lng*100)/100, alt: Math.round(pov.altitude*1000)/1000 } : null,
    paikka: p.type === 'city' ? p.city : p.edge + '@' + p.idx,
    liikuNappi: Boolean(nappi('Liiku')),
  };
}`;

/** Napin painallus nimellä; liuku aukeaa Liiku-napista kuten pelissä. */
const PAINA = `async (teksti) => {
  const nappi = [...document.querySelectorAll('#actions button, .toimintorivi button')]
    .find((b) => ((b.getAttribute('aria-label')||'') + ' ' + (b.textContent||'')).includes(teksti));
  if (!nappi) return 'ei nappia: ' + teksti;
  nappi.click();
  await new Promise((r) => setTimeout(r, 400));
  return 'ok';
}`;

async function avaaKonteksti(selain, tallenne) {
  const ctx = await selain.newContext({
    viewport: { width: RUUTU.width, height: RUUTU.height },
    deviceScaleFactor: RUUTU.dpr,
    serviceWorkers: 'block',
  });
  /*
   * TALLENNUS KIRJOITETAAN VAIN KERRAN: init-skripti ajetaan myös
   * uudelleenlatauksessa, ja ehdoton kirjoitus palauttaisi alkutilan
   * juuri silloin kun mitataan, mitä UUDELLEENLATAUS tekee pelin omalle
   * tallennukselle (väite 4).
   */
  await ctx.addInitScript((data) => {
    try {
      if (!localStorage.getItem('matkakirja-save-v1')) {
        localStorage.setItem('matkakirja-save-v1', data);
      }
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  /*
   * KAIKKI EI-PAIKALLINEN ESTETÄÄN, ämpäri palvellaan Noden kautta.
   * WebKit pitää verkkoon lähteneet pyynnöt vireillä, ja kuormassa yksikin
   * roikkuva ulkopuolinen haku (workers.dev, Wikimedia, archive.org,
   * Freesound, fontit, analytiikka) venytti latausta kohti goto-kattoa.
   * Playwright ajaa reitit käänteisessä rekisteröintijärjestyksessä,
   * joten alla oleva ämpäri-reitti voittaa tämän.
   */
  await sivu.route((url) => !/^(127\.0\.0\.1|localhost)$/.test(url.hostname), (r) => r.abort());
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
  return { ctx, sivu, virheet };
}

/**
 * Latauksen aikakatkaisu nimetään omaksi virheekseen, jotta selaimen ajo
 * voi kirjata sen FAIL-riviksi eikä koko savuke kaadu ennen yhtään
 * väitettä (v1951 CI: WebKit goto domcontentloaded aikakatkaistiin
 * kuormassa, rivi "0/0 kaatui poikkeukseen").
 */
class LatausKatko extends Error {}

async function odotaPeli(sivu, katto, { uudelleen = false } = {}) {
  const alkuMs = Date.now();
  try {
    if (uudelleen) await sivu.reload({ waitUntil: 'domcontentloaded', timeout: katto });
    else await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: katto });
    await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: katto });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: katto });
  } catch (e) {
    if (e?.name !== 'TimeoutError') throw e;
    throw new LatausKatko(`${Date.now() - alkuMs} ms, ${String(e.message).split('\n')[0]}`);
  }
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    await l.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1200));
  });
}

/** Selaimen ajon poikkeus FAIL-riviksi; seuraava selain ajetaan silti. */
function kirjaaKaatuminen(tunnus, katto, e) {
  if (e instanceof LatausKatko) {
    vaadi(`${tunnus}: peli ei latautunut ${katto} ms:ssa (kuorma?)`, false, e.message);
  } else {
    vaadi(`${tunnus}: ajo kaatui poikkeukseen`, false, String(e?.stack ?? e).split('\n').slice(0, 2).join(' | '));
  }
}

/** Liiku -> Liftaus: liftaus valitsee tavan JA heittää nopan samalla. */
async function liftaa(sivu) {
  const a = await sivu.evaluate(`(${PAINA})('Liiku')`);
  if (a !== 'ok') return a;
  return sivu.evaluate(`(${PAINA})('Liftaus')`);
}

const lahto = amsterdaminKynnyksella();
tieto('lähtötila', `Amsterdam askeleen päässä: ${lahto.amsterdamAskeleenPaassa}`);

for (const selainTieto of SELAIMET) {
  const selain = await selainTieto.avaa().catch((e) => {
    console.log(`OHITUS  ${selainTieto.nimi} ei käynnisty — ${e.message}`);
    return null;
  });
  if (!selain) continue;
  const tunnus = selainTieto.nimi;
  const katto = Number(process.env.SAVUKE_LATAUSKATTO_MS) || selainTieto.latauskatto;
  try {
    const { ctx, sivu, virheet } = await avaaKonteksti(selain, lahto.tallenne);
    await odotaPeli(sivu, katto);

    /* ── 1. kierros: liftaus Amsterdamiin ────────────────────────── */
    tieto(`${tunnus}: 1. liftaus`, await liftaa(sivu));
    await sivu.waitForFunction(
      () => window.matkakirja.game.phase === 'move' && !window.matkakirja.ui.busy,
      null, { timeout: 20000 },
    ).catch(() => {});
    /*
     * SIIRTO MITATAAN KEHYS KEHYKSELTÄ (omistaja 19.9.2026 klo 23.47,
     * iPad Pariisi–Marseille). Kaksi väitettä yhdestä siirrosta, joka
     * päättyy KERTAHEITOLLA kaupunkiin:
     *
     *   6. Nappula HYPPII: hahmon pystysiirtymä on kesken askeleen
     *      suurempi kuin nolla (js/pallolauta/siirto.js hypynVaihe).
     *      Autokyyti (erä 8) liu'utti sen nollassa.
     *   7. REITTI NÄKYY KOKO SIIRRON AJAN: ui.matkareittienValinta()
     *      antaa reitin jokaisessa näytteessä. Sääntö on yksi ja sama
     *      kummallekin laudalle, ja pallon reittikerros piirtää sen.
     */
    const siirto = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      if (!game.moves?.has('c:amsterdam')) return { virhe: 'Amsterdam ei ollut listalla' };
      const naytteet = [];
      let kaynnissa = true;
      const kehys = () => {
        const hahmo = document.querySelector('.pallolauta-liikkuva .pawn-hahmo');
        const h = /translate\(0,([-\d.]+)\)/.exec(hahmo?.getAttribute('transform') ?? '');
        const v = ui.matkareittienValinta();
        naytteet.push({
          korkeus: h ? Math.abs(Number(h[1])) : 0,
          reitteja: v.reittiTunnukset.length,
          avain: Boolean(v.avain),
        });
        if (kaynnissa) requestAnimationFrame(kehys);
      };
      requestAnimationFrame(kehys);
      ui.doMove('c:amsterdam');
      for (let i = 0; i < 200; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 100));
        if (game.player.pos.type === 'city' && !ui.busy && !ui.siirtoKaynnissa) break;
      }
      kaynnissa = false;
      const jalkeen = ui.matkareittienValinta();
      const liikkeessa = naytteet.filter((n) => n.korkeus > 0 || n.reitteja > 0);
      return {
        naytteita: naytteet.length,
        korkein: Math.max(0, ...naytteet.map((n) => n.korkeus)),
        reitittomia: liikkeessa.filter((n) => n.reitteja === 0).length,
        liikkeessa: liikkeessa.length,
        reittiPerilla: jalkeen.reittiTunnukset.length,
      };
    });
    tieto(`${tunnus}: siirto Amsterdamiin`, JSON.stringify(siirto));
    vaadi(`${tunnus}: 6. nappula hyppii siirrossa (pystysiirtymä `
      + `${(siirto.korkein ?? 0).toFixed(2)} px > 0)`,
    Boolean(siirto.korkein > 0.01), JSON.stringify(siirto));
    vaadi(`${tunnus}: 7. reitti näkyy koko siirron ajan eikä jää perille`,
      Boolean(siirto.liikkeessa >= 5 && siirto.reitittomia === 0 && siirto.reittiPerilla === 0),
      JSON.stringify(siirto));
    await sivu.waitForFunction(
      () => window.matkakirja.game.player.pos.type === 'city' && !window.matkakirja.ui.busy,
      null, { timeout: 30000 },
    ).catch(() => {});
    const perilla = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: perillä Amsterdamissa`, JSON.stringify(perilla));

    /* ── 2. kierros: HETI uusi liftaus, eli heitto saapumisen päälle ─ */
    tieto(`${tunnus}: 2. liftaus heti saapumisen päälle`, await liftaa(sivu));
    await sivu.waitForTimeout(KAMERAN_ASETTUMINEN_MS);
    const jalkeen = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: heiton jälkeen`, JSON.stringify(jalkeen));
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `noppa-saapuminen-${tunnus}.png`), scale: 'css' });
    }

    vaadi(`${tunnus}: 1. heitto ei jätä peliä ilman kohteita`,
      jalkeen.vaihe === 'move' && jalkeen.kohteita > 0,
      JSON.stringify(jalkeen));
    vaadi(`${tunnus}: 2. nappula on ruudulla heiton jälkeen`,
      Boolean(jalkeen.nappula?.ruudulla),
      JSON.stringify(jalkeen.nappula));
    vaadi(`${tunnus}: 3. vähintään yksi kohde on ruudulla napautettavissa`,
      jalkeen.kohteitaRuudulla > 0,
      JSON.stringify(jalkeen.kohteet));

    /* ── 3. uudelleenlataus kesken siirtovaiheen ─────────────────── */
    await odotaPeli(sivu, katto, { uudelleen: true });
    await sivu.waitForTimeout(1500);
    const ladattu = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: uudelleenlatauksen jälkeen`, JSON.stringify({
      vaihe: ladattu.vaihe, liikuNappi: ladattu.liikuNappi, paikka: ladattu.paikka,
    }));
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `noppa-lataus-${tunnus}.png`), scale: 'css' });
    }
    vaadi(`${tunnus}: 4. Liiku on DOMissa uudelleenlatauksen jälkeen`,
      ladattu.liikuNappi === true,
      JSON.stringify(ladattu));
    /*
     * 5. KATTO ON AJON OMA EHTO (PAATOKSET 47 avoin velka, 19.9.2026):
     * mikä tahansa ulossovittava ajo — ei vain nopanheiton — pysyy
     * maalissaan eikä puristu maan uloszoomauskattoon, ja saapumis-
     * rajaus palauttaa katon. Vastakoe (katto ajon ulkopuolella):
     * korkeus 0,82 → 0,205 1,5 s:ssa (mitattu Pariisi → Ateena).
     */
    const ajonKatto = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const p = ui.pallolauta.pallo;
      const maxNyt = () => +(p.controls().maxDistance / p.getGlobeRadius() - 1).toFixed(3);
      await ui.pallolauta.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 600));
      const maxAlussa = maxNyt();
      const kohde = ui.game.pack.cities.find((c) => c.id === 'ateena');
      const leveys = (ui.kamera().kameranTila?.()?.leveys ?? 300) * 4;
      await ui.kamera().ajaKamera({ x: kohde.x, y: kohde.y, leveys }, { kesto: 700 });
      const heti = p.pointOfView().altitude;
      await new Promise((v) => setTimeout(v, 1500));
      const jalkeen = p.pointOfView().altitude;
      await ui.pallolauta.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 600));
      return { maxAlussa, heti: +heti.toFixed(3), jalkeen: +jalkeen.toFixed(3), maxPalattua: maxNyt() };
    });
    tieto(`${tunnus}: ajon katto`, JSON.stringify(ajonKatto));
    vaadi(`${tunnus}: 5. ulossovittava ajo pysyy maalissaan eikä puristu maan kattoon`,
      ajonKatto.heti > ajonKatto.maxAlussa && Math.abs(ajonKatto.jalkeen - ajonKatto.heti) < 0.01, JSON.stringify(ajonKatto));
    vaadi(`${tunnus}: 5b. saapumisrajaus palauttaa maan katon`,
      Math.abs(ajonKatto.maxPalattua - ajonKatto.maxAlussa) < 0.01, JSON.stringify(ajonKatto));
    /*
     * 8. AUTOMAATTIHEITTO JATKAA MATKAA REITIN VARRELLA (omistaja
     * 19.9.2026 klo 23.47: *"automaattinen nopanheitto on poistunut
     * vaikka pitäisi olla päällä"*). Matka pysäytetään reitin
     * välipisteeseen, ja peli saa heittää seuraavan nopan itse
     * (js/ui.js ajastaAutomaattinenHeitto, AUTOMAATTIHEITON_TAUKO_MS).
     */
    tieto(`${tunnus}: 8. liftaus reitille`, await liftaa(sivu));
    await sivu.waitForFunction(
      () => window.matkakirja.game.phase === 'move' && !window.matkakirja.ui.busy,
      null, { timeout: 20000 },
    ).catch(() => {});
    const automaatti = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const avaimet = [...(game.moves?.keys() ?? [])];
      const reitille = avaimet.find((k) => !String(k).startsWith('c:'));
      if (!reitille) return { virhe: 'reitin varrelle ei päässyt', avaimet, vaihe: game.phase };
      ui.doMove(reitille);
      // Nappula pysähtyy reitin varteen: tila luetaan heti kun siirto on
      // maalissa, ennen kuin automaattiheiton 750 ms:n tauko on kulunut.
      let paikka = null;
      for (let i = 0; i < 400; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 30));
        if (!ui.busy && !ui.siirtoKaynnissa) { paikka = { ...game.player.pos }; break; }
      }
      if (!paikka) return { virhe: 'siirto ei pysähtynyt', reitille };
      const jatkaa = game.jatkaMatkaaItsestaan();
      const sallittu = ui.automaattiheittoSallittu();
      // Automaattiheiton tauko on 750 ms; annetaan sille kolme sekuntia.
      const alku = Date.now();
      let heitetty = false;
      while (Date.now() - alku < 3000) {
        if (game.die !== null || ui.busy || game.player.pos.type === 'city') { heitetty = true; break; }
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 50));
      }
      return {
        reitille, paikka: paikka.type, jatkaa, sallittu, heitetty,
        liukuAuki: Boolean(ui.liukuAuki), liukuNopalle: Boolean(ui.liukuNopalle),
      };
    });
    tieto(`${tunnus}: automaattiheitto`, JSON.stringify(automaatti));
    vaadi(`${tunnus}: 8. reitin varrella noppa heitetään itsestään`,
      Boolean(automaatti.paikka === 'edge' && automaatti.jatkaa && automaatti.sallittu
        && automaatti.heitetty),
      JSON.stringify(automaatti));


    vaadi(`${tunnus}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | ').slice(0, 300));

    await ctx.close();
  } catch (e) {
    kirjaaKaatuminen(tunnus, katto, e);
  } finally {
    await selain.close().catch(() => {});
  }
}

palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
