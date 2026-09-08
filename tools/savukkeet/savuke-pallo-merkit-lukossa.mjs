/*
 * Savuke: MERKIT LUKITTU KAMERAAN — pallon merkki ei liiku laattojen
 * päällä, kun karttaa panoroi.
 *
 * Omistajan vikailmoitus 7.9.2026 (iPad, sanatarkasti): *"nyt kun kartta
 * on pallona, niin kohdepisteet ja pelaajan nappula ei pysy paikallaan,
 * kun karttaa vierittää, vaan ne heiluvat vähän eri suuntiin, riippuen
 * mihin päin vierittää. Pystyisikö ne lukitsemaan? Paikalleen."*
 *
 * JUURISYY (docs/moduulit/karttapallo.md luku 12): CSS2D-merkki oli
 * 0,004 × säde pinnan yläpuolella, ja perspektiivissä kohotettu piste
 * projisoituu ruudun keskipisteestä ULOSPÄIN. Ero pinnan pisteeseen
 * kasvaa suoraan sen mukaan, kuinka kaukana ruudun keskipisteestä merkki
 * on — panorointi siis liu'utti merkkiä laattojen päällä, ja suunta
 * vaihtui vierityssuunnan mukana.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. MERKKI ON PINNAN PISTEESSÄ. Jokaisen CSS2D-merkin (nappula,
 *      kaupunkien nimet, nostot, nopanheiton kohteet) ruutupaikka on
 *      `getScreenCoords(lat, lng, 0)` ±1 px JOKAISESSA kehyksessä
 *      200 px:n sormivedon aikana. Laatat ja rantaviiva ovat
 *      korkeudella 0, joten tämä on juuri se ehto, jonka omistaja
 *      pyysi: merkki pysyy kartan kohdassaan.
 *   2. VETO EI VIE MERKKIÄ MUKANAAN. Merkin ruutupaikan ja pinnan
 *      pisteen erotus ei kasva vedon aikana kumpaankaan suuntaan
 *      (itään ja länteen vedetään erikseen): suurin ero on sama
 *      molemmilla, eikä se riipu ruudun kohdasta.
 *   3. NOPANHEITON KOHTEET samalla ehdolla — omistaja nimesi ne
 *      erikseen. Kohteet syntyvät oikeasta heitosta, eivät kuvitteesta.
 *
 *   4. NAPPULAN JALKA ON KAUPUNGIN PISTEESSÄ (päätoimittajan linjaus
 *      7.9.2026, Raamattu VIAT v1672): piirretyn hahmon alareunan
 *      keskipiste on pinnan pisteessä ±1 px joka kehyksessä — ei
 *      merkin keskipiste, kuten kirjaston oma CSS2D-keskitys teki.
 *
 *   5. KAUPUNKIPISTE ON RUUDUN VAKIO. Pisteen levyn ruutuhalkaisija on
 *      sama ± 1 px korkeudella 0,35 ja lähimmällä zoomilla (luku 12.3:
 *      `pointRadius` on astemitta, joten piste kasvoi lähennettäessä
 *      iPadin ruudulla noin 30 pikseliin).
 *
 *      MOLEMMAT MITATUT KORKEUDET OVAT LÄHIKUVAA (8.9.2026, luku 19):
 *      maan lehti täyttää niissä yli puolet näkymästä, joten pisteen
 *      lattia (1,5 x kohdemerkki, js/pallolauta/lauta.js
 *      kohdekaupunginMitat) on kummassakin täydessä mitassaan ja
 *      vartio mittaa yhä samaa vakiota — vain luku on 7 px:n sijaan
 *      17,2 px. Yleisnäkymän 7 px on ennallaan (tests/kohdekaupunki).
 *
 *   RAPORTIN TIETOJA (ei ehtoja): kaupunkipisteen (pointsData) oma
 *   säteittäinen siirtymä, joka jää tästä korjauksesta jäljelle.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Ilman ämpäriä
 * pallo ei lataudu; savuke toteaa sen ja päättyy ohituksella.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-merkit-lukossa.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Sallittu ero merkin ruutupaikan ja pinnan pisteen välillä (css-px). */
const SALLITTU_PX = 1;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

/* Tallenne: Fogg Ateenassa, aarre löydetty (Liiku ja noppa käytettävissä). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
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
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));

if (auki) {
  await sivu.waitForTimeout(3500);
  // Lähikuva: siirtymä on suurimmillaan matalalla, kuten omistajan iPadilla.
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: 0.08 }, 0);
    await new Promise((v) => setTimeout(v, 2000));
  });

  /*
   * Sormiveto pallon kotelossa: pointerdown → 20 × 10 px → pointerup.
   * Jokaisen liikkeen jälkeen odotetaan kaksi kehystä (kirjaston oma
   * piirto ja CSS2D-kerros ovat samassa kehyksessä) ja luetaan jokaisen
   * merkin ruutupaikka sen OMASTA inline-transformista sekä pinnan piste
   * samoista asteista. Suurin ero on vartion luku.
   */
  const veda = (suunta) => sivu.evaluate(async (dx) => {
    const l = window.matkakirja.ui.pallolauta;
    const p = l.pallo;
    const kotelo = l.kotelo;
    const r = kotelo.getBoundingClientRect();
    const x0 = r.left + r.width / 2;
    const y0 = r.top + r.height / 2;
    const tapahtuma = (tyyppi, x, y) => kotelo.dispatchEvent(new PointerEvent(tyyppi, {
      bubbles: true, cancelable: true, pointerId: 1, pointerType: 'touch', clientX: x, clientY: y,
    }));
    const kehys = () => new Promise((v) => requestAnimationFrame(() => requestAnimationFrame(v)));
    /**
     * Suurin ero merkin ruutupaikan ja pinnan pisteen välillä juuri nyt.
     *
     * NAPPULASTA MITATAAN MYÖS JALKA (päätoimittajan linjaus 7.9.2026,
     * Raamattu VIAT v1672): ankkuri kertoo, missä merkki on kiinni,
     * mutta pelaaja näkee sen PIIRRETYN hahmon — ja linjaus on, että
     * nappulan jalka seisoo kaupungin pisteessä sekä levossa että
     * liikkeessä. Jalka on svg:n alareunan keskipiste (lepomerkin oma
     * laatikko on 0 × 0, ks. css/styles.css).
     */
    const mittaa = () => {
      let suurin = 0;
      let pahin = null;
      let laskettu = 0;
      let jalka = 0;
      let jalkoja = 0;
      const koti = kotelo.getBoundingClientRect();
      for (const d of p.htmlElementsData()) {
        const el = d.el;
        if (!el?.isConnected || d.poistuu) continue;
        const m = /translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(el.style.transform || '');
        if (!m) continue;
        const pinta = p.getScreenCoords(d.lat, d.lng, 0);
        if (!pinta || !Number.isFinite(pinta.x)) continue;
        laskettu += 1;
        const ero = Math.hypot(Number(m[1]) - pinta.x, Number(m[2]) - pinta.y);
        if (ero > suurin) { suurin = ero; pahin = `${d.laji ?? '?'}:${d.avain}`; }
        if (d.laji !== 'nappula') continue;
        const svg = el.querySelector('svg')?.getBoundingClientRect();
        if (!svg) continue;
        jalkoja += 1;
        jalka = Math.max(jalka, Math.hypot(
          (svg.left + svg.width / 2 - koti.left) - pinta.x, (svg.bottom - koti.top) - pinta.y,
        ));
      }
      return {
        suurin, pahin, laskettu, jalka, jalkoja,
      };
    };
    tapahtuma('pointerdown', x0, y0);
    await kehys();
    let suurin = 0;
    let pahin = null;
    let vahin = Infinity;
    let kehyksia = 0;
    let merkkeja = 0;
    let jalka = 0;
    let jalkoja = 0;
    for (let i = 1; i <= 20; i += 1) {
      tapahtuma('pointermove', x0 + dx * i, y0);
      // eslint-disable-next-line no-await-in-loop
      await kehys();
      const m = mittaa();
      kehyksia += 1;
      merkkeja = Math.max(merkkeja, m.laskettu);
      if (m.suurin > suurin) { suurin = m.suurin; pahin = m.pahin; }
      vahin = Math.min(vahin, m.suurin);
      jalka = Math.max(jalka, m.jalka);
      jalkoja += m.jalkoja;
    }
    tapahtuma('pointerup', x0 + dx * 20, y0);
    await kehys();
    return {
      suurin: Number(suurin.toFixed(3)),
      vahin: Number(vahin.toFixed(3)),
      pahin,
      kehyksia,
      merkkeja,
      jalka: Number(jalka.toFixed(3)),
      jalkoja,
      pov: p.pointOfView(),
    };
  }, suunta);

  const ita = await veda(-10);
  const lansi = await veda(10);
  vaadi(`1. merkit pysyvät pinnan pisteessä 200 px:n vedossa itään (≤ ${SALLITTU_PX} px joka kehyksessä)`,
    ita.merkkeja > 0 && ita.kehyksia === 20 && ita.suurin <= SALLITTU_PX, JSON.stringify(ita));
  vaadi(`   sama länteen (≤ ${SALLITTU_PX} px joka kehyksessä)`,
    lansi.merkkeja > 0 && lansi.suurin <= SALLITTU_PX, JSON.stringify(lansi));
  vaadi('2. veto ei kasvata eroa kumpaankaan suuntaan (suurin ≈ vähin, molemmat suunnat samat)',
    Math.abs(ita.suurin - ita.vahin) <= SALLITTU_PX && Math.abs(ita.suurin - lansi.suurin) <= SALLITTU_PX,
    JSON.stringify({ ita, lansi }));
  vaadi(`4. nappulan JALKA on kaupungin pisteessä joka kehyksessä (≤ ${SALLITTU_PX} px, VIAT v1672)`,
    ita.jalkoja > 0 && lansi.jalkoja > 0
      && ita.jalka <= SALLITTU_PX && lansi.jalka <= SALLITTU_PX,
    `itään ${ita.jalka} px (${ita.jalkoja} mittausta), `
    + `länteen ${lansi.jalka} px (${lansi.jalkoja})`);
  tieto('merkkejä mitattu vedon aikana', ita.merkkeja);
  tieto('nappulan jalan ero pinnan pisteestä itään / länteen (px)', `${ita.jalka} / ${lansi.jalka}`);
  tieto('suurin ero itään / länteen (px)', `${ita.suurin} / ${lansi.suurin}`);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallo-merkit-lukossa.png') });

  /* 3. Nopanheiton kohteet: sama ehto oikeilla kohdemerkeillä. */
  const kohteet = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    game.autoTravel = false;
    const valinta = game.actionTravel('land');
    if (!valinta.ok) return { virhe: valinta.error };
    ui.doRoll();
    for (let i = 0; i < 100 && ui.busy; i += 1) await new Promise((r) => setTimeout(r, 50));
    await new Promise((r) => setTimeout(r, 600));
    const l = ui.pallolauta;
    const p = l.pallo;
    const kotelo = l.kotelo;
    const r = kotelo.getBoundingClientRect();
    const x0 = r.left + r.width / 2;
    const y0 = r.top + r.height / 2;
    const tapahtuma = (tyyppi, x, y) => kotelo.dispatchEvent(new PointerEvent(tyyppi, {
      bubbles: true, cancelable: true, pointerId: 1, pointerType: 'touch', clientX: x, clientY: y,
    }));
    const kehys = () => new Promise((v) => requestAnimationFrame(() => requestAnimationFrame(v)));
    tapahtuma('pointerdown', x0, y0);
    await kehys();
    let suurin = 0;
    let mitattuja = 0;
    for (let i = 1; i <= 20; i += 1) {
      tapahtuma('pointermove', x0 - 10 * i, y0);
      // eslint-disable-next-line no-await-in-loop
      await kehys();
      for (const d of p.htmlElementsData()) {
        if (d.laji !== 'kohde' || !d.el?.isConnected) continue;
        const m = /translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(d.el.style.transform || '');
        const pinta = p.getScreenCoords(d.lat, d.lng, 0);
        if (!m || !pinta || !Number.isFinite(pinta.x)) continue;
        mitattuja += 1;
        suurin = Math.max(suurin, Math.hypot(Number(m[1]) - pinta.x, Number(m[2]) - pinta.y));
      }
    }
    tapahtuma('pointerup', x0 - 200, y0);
    await kehys();
    return {
      vaihe: game.phase,
      kohteita: game.moveOptions().length,
      mitattuja,
      suurin: Number(suurin.toFixed(3)),
    };
  });
  vaadi(`3. nopanheiton kohteet pysyvät pinnan pisteessä vedon aikana (≤ ${SALLITTU_PX} px)`,
    kohteet.vaihe === 'move' && kohteet.mitattuja > 0 && kohteet.suurin <= SALLITTU_PX,
    JSON.stringify(kohteet));

  /*
   * RAPORTTI: mitä korjauksesta jää jäljelle. Kaupunkipiste on
   * pointsData korkeudella 0,003 eikä CSS2D-merkki, joten sillä on yhä
   * oma säteittäinen siirtymänsä — ja sen säde on karttavakio, joten
   * ruutuhalkaisija kasvaa lähennettäessä (omistajan kuvassa Tampereen
   * iso musta ympyrä). Molemmat ovat luvun 12 jatkotyötä.
   */
  const jaannos = await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const p = l.pallo;
    const kotelo = l.kotelo;
    const pisteet = p.pointsData().filter((d) => !d.laji || d.laji === 'kaupunki');
    let suurin = 0;
    for (const d of pisteet) {
      const pinta = p.getScreenCoords(d.lat, d.lon, 0);
      const nostettu = p.getScreenCoords(d.lat, d.lon, 0.003);
      if (!pinta || !nostettu || !Number.isFinite(pinta.x) || !Number.isFinite(nostettu.x)) continue;
      if (pinta.x < 0 || pinta.y < 0 || pinta.x > kotelo.clientWidth || pinta.y > kotelo.clientHeight) continue;
      suurin = Math.max(suurin, Math.hypot(nostettu.x - pinta.x, nostettu.y - pinta.y));
    }
    return { pisteita: pisteet.length, suurin: Number(suurin.toFixed(2)), korkeus: p.pointOfView().altitude };
  });
  tieto('kaupunkipisteen jäljelle jäävä siirtymä ruudulla (px, korkeus '
    + `${jaannos.korkeus.toFixed(3)})`, `${jaannos.suurin} (${jaannos.pisteita} pistettä)`);

  /*
   * ── 4. KAUPUNKIPISTE ON RUUDUN VAKIO ──────────────────────────────
   *
   * Omistajan kuvassa Tampereen kohdalla oli iso musta ympyrä:
   * `pointRadius` on Globe.gl:n ASTEMITTA, joten piste kasvoi
   * lähennettäessä (puhelimella 2,7 px korkeudella 0,35 ja 13,7 px
   * lähimmällä zoomilla, iPadilla noin 30 px). Raamattu sanoo pallon
   * merkeistä, että koko on ruutuvakio.
   *
   * MITTA ON PISTEEN OMA GEOMETRIA, EI KAAVA. Levy (PISTE ON LEVY) on
   * lieriön kansi paikallisessa z = −1:ssä, säde 1 ennen skaalausta,
   * joten sen keskipiste ja reuna projisoidaan kameralla ruudulle ja
   * niiden etäisyys on säde pikseleinä. Mitataan ruudun keskimmäisin
   * piste, jotta perspektiivi ei venytä lukua.
   */
  const halkaisija = (korkeus) => sivu.evaluate(async (h) => {
    const l = window.matkakirja.ui.pallolauta;
    const p = l.pallo;
    const { kotelo } = l;
    const pov = p.pointOfView();
    /*
     * KAMERA AJETAAN PELIN OMALLA TAVALLA (lauta.kamera.ajaKamera), ei
     * suoralla pointOfView-kirjoituksella: lauta nukkuu levossa
     * (pauseAnimation), ja kirjaston ohjaimet lähettävät `change`-
     * tapahtuman vasta omassa silmukassaan. Peli herättää laudan
     * jokaisessa ajossa ja eleessä, ja juuri se on se polku, jonka
     * varassa kaupunkipisteen koko ja nimien ladonta ovat.
     * `korkeus: 0` painuu laudan omaan alarajaan (korkeusMin), eli
     * lähimpään zoomiin, jonka laatat sallivat tällä laitteella.
     */
    await l.kamera.ajaKamera(
      { lat: pov.lat, lng: pov.lng, korkeus: h ?? 0 },
      { kesto: 600 },
    );
    await new Promise((v) => { setTimeout(v, 900); });
    const cam = p.camera();
    const kx = kotelo.clientWidth / 2;
    const ky = kotelo.clientHeight / 2;
    let paras = null;
    for (const d of p.pointsData()) {
      if (d.laji === 'helmi' || d.laji === 'valo') continue;
      const o = d.__threeObjPoint;
      if (!o) continue;
      const r = p.getScreenCoords(d.lat, d.lon, 0);
      if (!r || !Number.isFinite(r.x)) continue;
      const etaisyys = Math.hypot(r.x - kx, r.y - ky);
      if (!paras || etaisyys < paras.etaisyys) paras = { o, etaisyys, id: d.id };
    }
    if (!paras) return null;
    const Vektori = paras.o.position.constructor;
    const ruudulle = (v) => {
      const c = v.project(cam);
      return { x: ((c.x + 1) / 2) * kotelo.clientWidth, y: ((1 - c.y) / 2) * kotelo.clientHeight };
    };
    const keski = ruudulle(paras.o.localToWorld(new Vektori(0, 0, -1)));
    const reuna = ruudulle(paras.o.localToWorld(new Vektori(1, 0, -1)));
    return {
      id: paras.id,
      korkeus: p.pointOfView().altitude,
      halkaisija: Number((2 * Math.hypot(reuna.x - keski.x, reuna.y - keski.y)).toFixed(2)),
    };
  }, korkeus);

  const kaukana = await halkaisija(0.35);
  const lahella = await halkaisija(null);
  const ero = kaukana && lahella ? Math.abs(kaukana.halkaisija - lahella.halkaisija) : Infinity;
  vaadi('5. kaupunkipisteen ruutuhalkaisija on sama kaukana ja lähellä (± 1 px)',
    Boolean(kaukana && lahella) && ero <= 1,
    JSON.stringify({ kaukana, lahella, ero: Number(ero.toFixed(2)) }));
  tieto('kaupunkipisteen ruutuhalkaisija', kaukana && lahella
    ? `${kaukana.halkaisija} px (korkeus ${kaukana.korkeus.toFixed(3)}), `
      + `${lahella.halkaisija} px (korkeus ${lahella.korkeus.toFixed(3)})`
    : 'ei mitattu');
  tieto('sivun virheet', virheet.length ? virheet.join(' | ') : 'ei yhtään');
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
