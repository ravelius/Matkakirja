/*
 * Savuke: PELINAPPULA KULKEE JOKA MATKAPISTEEN LÄPI, KERMA POIS
 * LIIKKEEN AJAKSI (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 29).
 *
 * Omistaja 16.9.2026 klo 05.20 UTC, iPhone-kuva Ateenasta,
 * sanatarkasti: *"Nyt jos pelaaja liftaa niin kamera taitaa panoroida
 * mutta pelinappula ei nay liikkeen aikana eli vaikka otetaan se
 * pomppiminen pois niin pelinappula saisi silti liikkua jokaisen
 * matkapisteen lapi ja kiihdyttaa ja jarruttaa niiden valilla. Lisaksi
 * pitaisi ottaa ainakin kaikkien maiden paalta pois minka lapi liike
 * menee… Jos se on vaikea toteuttaa niin otetaan sitten huntu
 * kaikkialta pois liikkeen ajaksi ja palautetaan takaisin sitten kun
 * pelaaja on paassyt uuteen kohde kaupunkiin."*
 *
 * MITATTU JUURISYY (16.9.2026). Liikkuva nappula jakoi css:ssä
 * ryhmävalitsimen lentokoneen kanssa, ja koneen säännössä on
 * `opacity: 0` — kone häivyttyy näkyviin vasta luokalla `nakyy`, jonka
 * js/pallolauta/siirto.js lisää VAIN lennolla. Nappulan elementti oli
 * siis koko matkan DOMissa ja oikeassa ruutupaikassa, mutta täysin
 * läpinäkyvä. Juuri siksi mikään vanha vartio ei huomannut sitä:
 * savuke-liiku.mjs mittasi transformin, ei peittävyyttä.
 *
 * VARTIOT:
 *   1. NAPPULA NÄKYY KOKO MATKAN. Kymmenen näytettä liftauksen
 *      aikana: elementti on olemassa, laskettu peittävyys on 1 eikä 0,
 *      ja laatikko on ruudun sisällä.
 *   2. JOKAINEN MATKAPISTE OSUU. Ajo ajetaan käsikirjoitetulla
 *      kellolla ja nappulan jalan ruutupaikka mitataan täsmälleen
 *      niillä vaiheilla, joilla käyrä on matkapisteessä: poikkeama
 *      pallon pinnalle projisoidusta pisteestä ≤ 4 px.
 *   3. NOPEUSPROFIILI. Sama ajo: nappulan ruutuvauhti matkapisteen
 *      kohdalla on pienempi kuin välin puolivälissä (jarruttaa
 *      pisteeseen, kiihdyttää siitä pois).
 *   4. EI POMPPUA. Nappulan pystykorkeus on nolla koko matkan.
 *   5. KERMA POIS LIIKKEEN AJAKSI JA TAKAISIN. Ennen matkaa kerma on
 *      päällä, matkan aikana pois (runko-luokka `kerma-pois-liikkeessa`
 *      ja js/laattapyramidi.js tasoituksenLiike), saapumisen jälkeen
 *      taas päällä.
 *   6. SAMA LEVEÄLLÄ RUUDULLA (1400 px): nappula näkyy ja kerma
 *      kytkeytyy.
 *
 * VASTAKOKEET:
 *   A. LIIKEANIMAATIO POIS (`kyyti: false` eli entinen hyppyketju):
 *      nappula HYPPÄÄ — pystykorkeus > 0 — eli vartio 4 erottaa aidosti
 *      kyydin hyppyketjusta.
 *   B. KERMA POIS -KYTKIN POIS (ui.matkanKermattomuus tyhjäksi): kerma
 *      JÄÄ koko matkan ajaksi, eli vartio 5 mittaa kytkintä eikä
 *      sattumaa.
 *
 * MIKSI VARTIO: kaikki kolme takeetta katoavat yhdellä rivillä.
 * Peittävyys on yksi css-valitsin, vaihekäyrä yksi valinnainen kenttä
 * (`{ vaihe }`) ja kerman kytkin yksi funktiokutsu — eikä yksikään
 * niistä kaada mitään kadotessaan.
 *
 *   node tools/savukkeet/savuke-nappula-liike.mjs [kansio] [--dpr N]
 *
 * Pallotila tarvitsee ämpärin (Globe.gl ja laatat) — se reititetään
 * selaimelle Noden fetchin kautta (NODE_USE_ENV_PROXY=1, malli
 * savuke-liiku.mjs), ja peli aloitetaan tallenteesta Ateenassa.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argit = process.argv.slice(2);
const dprArg = argit.indexOf('--dpr');
const DPR = dprArg >= 0 ? Number(argit[dprArg + 1]) : 1;
const vipujenArvot = new Set();
if (dprArg >= 0) vipujenArvot.add(dprArg + 1);
const ULOS = argit.find((a, i) => !a.startsWith('--') && !vipujenArvot.has(i))
  ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/* Ämpäri Noden kautta (malli savuke-liiku.mjs). */
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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const TALLENNE = JSON.stringify(peli.toJSON());

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0; let kaikki = 0;
const rivit = [];
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  const tulos = ehto ? `OK    ${nimi}` : `FAIL  ${nimi} — ${lisa}`;
  if (ehto) lapi += 1;
  rivit.push(tulos);
  console.log(tulos);
};

/* Kaappaus pienennettynä selaimen kankaalla (raporttikuvan katto). */
const kaappaa = async (sivuOlio, nimi, skaala = 0.72) => {
  const png = (await sivuOlio.screenshot()).toString('base64');
  const pieni = await sivuOlio.evaluate(async ([data, k]) => {
    const kuva = new Image();
    await new Promise((ok, hup) => {
      kuva.onload = ok; kuva.onerror = hup; kuva.src = `data:image/png;base64,${data}`;
    });
    const kangas = document.createElement('canvas');
    kangas.width = Math.round(kuva.width * k);
    kangas.height = Math.round(kuva.height * k);
    kangas.getContext('2d').drawImage(kuva, 0, 0, kangas.width, kangas.height);
    return kangas.toDataURL('image/jpeg', 0.82).split(',')[1];
  }, [png, skaala]);
  writeFileSync(join(ULOS, nimi), Buffer.from(pieni, 'base64'));
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Avaa sivun annetulla ruudulla ja odottaa pallolaudan valmiiksi. */
async function avaaSivu(leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus },
    deviceScaleFactor: DPR,
    serviceWorkers: 'block',
    isMobile: leveys < 900,
    hasTouch: leveys < 900,
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(`${leveys}px: ${e.message}`));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app\//, async (route) => {
    const url = route.request().url();
    if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
    const vastaus = await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForTimeout(2500);
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'ateena' };
    g.world.visited.add('ateena');
    g.phase = 'action';
    g.player.money = 300;
    ui.render();
    await new Promise((r) => setTimeout(r, 1500));
  });
  return { ctx, sivu };
}

/*
 * ══════════════════════════════════════════════════════════════════
 * KÄSIKIRJOITETTU KELLO — MIKSI MITTAUS EI LUOTA KEHYSTAHTIIN
 * ══════════════════════════════════════════════════════════════════
 *
 * Nappulan paikka lasketaan joka kehyksellä vaihekäyrästä, ja vartio 2
 * kysyy nimenomaan sitä paikkaa NIILLÄ vaiheilla, joissa käyrä on
 * matkapisteessä. Kontin ohjelmistopiirto pyörii yhdestä muutamaan
 * kehykseen sekunnissa, joten satunnaisista näytteistä ei osuisi
 * yksikään pisteeseen — mittaus olisi kohinaa.
 *
 * Siksi ajon aikamuuttuja annetaan mittauksesta: `requestAnimationFrame`
 * ja `performance.now` palauttavat mittauksen oman kellon, ja kuljettaja
 * piirtää täsmälleen pyydetyssä vaiheessa. Kuljettaja itse on se
 * oikea (ui.nappulanKuljettaja → js/pallolauta/siirto.js) ja käyrä se
 * oikea (js/siirtokoreografia.js matkanVaihe) — vain kello on käsissä.
 */
const KASIKIRJOITETTU = `
window.__mittaaAjo = async (vaiheet) => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves, pixelOf, pointAlong } = await import('./js/rules.js');
  const { matkanVaihe, autokyydinAskel } = await import('./js/siirtokoreografia.js');
  const { MERKIN_KORKEUS } = await import('./js/pallolauta/merkit.js');
  const lauta = ui.pallolauta;
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  // Kamera paikalleen: liikkuva kamera näkyisi nappulan vauhdissa.
  const kam = ui.kamera();
  kam.pysaytaKameraAjo?.();
  await lauta.saavu({ kesto: 0 });
  for (let i = 0; i < 60; i += 1) {
    if (!kam.kameraAjossa()) break;
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 1200));

  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  if (!parit.length) return { virhe: 'ei siirtoja' };
  const polku = parit[0][1].path;
  if (polku.length < 3) return { virhe: 'liian lyhyt matka' };
  const from = { ...g.player.pos };

  /** Matkapisteen ruutupaikka pallon pinnalta (sama kaava kuin kuljettajalla). */
  const odotettu = (pos) => {
    const perus = pixelOf(g.board, pos);
    let kohta = perus;
    if (pos.type === 'city') {
      const d = lauta.siirtymat?.get(pos.city);
      if (d) kohta = { x: perus.x + d.dx, y: perus.y + d.dy };
    } else {
      const reitti = g.board.edgeById.get(pos.edge);
      if (reitti?.poly?.length) {
        kohta = pointAlong(lauta.reitit.poly(reitti), pos.idx / reitti.steps);
      }
    }
    const a = lauta.asteet(kohta);
    if (!a) return null;
    return lauta.pallo.getScreenCoords(a.lat, a.lon, MERKIN_KORKEUS);
  };

  const raf = window.requestAnimationFrame.bind(window);
  const nyt = performance.now.bind(performance);
  let kello = 1e6;
  window.requestAnimationFrame = (cb) => raf(() => cb(kello));
  performance.now = () => kello;
  const alku = kello;
  const kesto = polku.length * autokyydinAskel(polku.length);
  const kuljettaja = ui.nappulanKuljettaja(g.player, {});
  ui.movingPlayerId = g.player.id;
  ui.piirraNappulat();
  kuljettaja.nosta();
  kuljettaja.aseta(from);
  const ajo = kuljettaja.aja(from, polku, kesto, { vaihe: matkanVaihe(polku.length) });

  /** Nappulan jalan ruutupaikka ja pystykorkeus juuri nyt. */
  const jalka = () => {
    const el = document.querySelector('.pallolauta-liikkuva');
    if (!el) return null;
    const m = /translate\\(([-\\d.]+)px,\\s*([-\\d.]+)px\\)/.exec(el.style.transform);
    if (!m) return null;
    const hahmo = el.querySelector('.pawn-hahmo');
    const h = /translate\\(0,([-\\d.]+)\\)/.exec(hahmo?.getAttribute('transform') ?? '');
    return { x: Number(m[1]) + 16, y: Number(m[2]) + 36, korkeus: h ? Math.abs(Number(h[1])) : 0 };
  };

  const naytteet = [];
  for (const t of vaiheet) {
    kello = alku + kesto * Math.min(0.9999, t);
    await new Promise((r) => raf(r));
    await new Promise((r) => raf(r));
    naytteet.push({ t, ...(jalka() ?? { puuttuu: true }) });
  }
  // Ajo loppuun ja siivous.
  kello = alku + kesto + 1;
  await new Promise((r) => raf(r));
  await ajo;
  kuljettaja.laske();
  window.requestAnimationFrame = raf;
  performance.now = nyt;
  ui.movingPlayerId = null;
  g.player.pos = from;
  ui.render();
  return {
    pisteita: polku.length,
    kesto,
    naytteet,
    kohteet: polku.map((pos) => odotettu(pos)),
  };
};
`;

/** autokyydinVaiheen käänteisfunktio: se t, jolla eteneminen on x. */
const aika = (x) => (x < 0.5 ? Math.sqrt(x / 2) : 1 - Math.sqrt((1 - x) / 2));

/* ================= 390 px ========================================= */

const { ctx: ctx390, sivu } = await avaaSivu(390, 844);

/* ---- 1. nappula näkyy koko matkan (oikea ajo, saattava kamera) ---- */

const nakyvyys = await sivu.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  const { tasoituksenLiike } = await import('./js/laattapyramidi.js');
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 800));
  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  const polku = parit[0][1].path;
  const from = { ...g.player.pos };
  const ennen = {
    luokka: document.body.classList.contains('kerma-pois-liikkeessa'),
    lippu: tasoituksenLiike(),
  };
  const naytteet = [];
  const kerma = [];
  let kaynnissa = true;
  const kehys = () => {
    const el = document.querySelector('.pallolauta-liikkuva');
    if (el) {
      // Kerma mitataan niiltä kehyksiltä, joilla nappula on laudalla:
      // juuri ne ovat "liikkeen aika". Ennakkozoomi ja saapumisajo ovat
      // omat näytteensä (`ennen` ja `jalkeen`).
      kerma.push({
        luokka: document.body.classList.contains('kerma-pois-liikkeessa'),
        lippu: tasoituksenLiike(),
      });
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      naytteet.push({
        peittavyys: Number(cs.opacity),
        nakyvyys: cs.visibility,
        naytto: cs.display,
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      });
    }
    if (kaynnissa) requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);
  await ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
    saatto: true, maitse: true, kyyti: true, tapa: 'land',
  });
  kaynnissa = false;
  await new Promise((r) => setTimeout(r, 800));
  const jalkeen = {
    luokka: document.body.classList.contains('kerma-pois-liikkeessa'),
    lippu: tasoituksenLiike(),
  };
  g.player.pos = from;
  ui.render();
  return {
    naytteita: naytteet.length,
    lapinakyvia: naytteet.filter((s) => !(s.peittavyys > 0.99)).length,
    piilossa: naytteet.filter((s) => s.nakyvyys !== 'visible' || s.naytto === 'none').length,
    ruudunUlkona: naytteet.filter((s) => s.x + s.w < 0 || s.y + s.h < 0
      || s.x > window.innerWidth || s.y > window.innerHeight).length,
    pienin: Math.min(...naytteet.map((s) => s.peittavyys)),
    ennen,
    jalkeen,
    kermattomia: kerma.filter((k) => k.luokka && k.lippu).length,
    kermaNaytteita: kerma.length,
  };
});

/*
 * NÄYTTEIDEN MÄÄRÄ ON KONTIN, EI PELIN, ASIA. Ohjelmistopiirto pyörii
 * täällä muutamalla kehyksellä sekunnissa, joten kolmen sekunnin
 * liftauksesta kertyy tyypillisesti 5–15 näytettä. Vartio vaatii, että
 * näytteitä on tarpeeksi todistamaan asia — ja että JOKAINEN niistä on
 * näkyvä. Vaiheen tarkkuus mitataan erikseen käsikirjoitetulla
 * kellolla (vartiot 2–4), joka ei ole kehystahdista kiinni.
 */
vaadi(`liftauksesta saatiin näytteitä nappulasta (${nakyvyys.naytteita})`,
  nakyvyys.naytteita >= 5, JSON.stringify(nakyvyys));
vaadi(`nappula on näkyvissä koko matkan (pienin peittävyys ${nakyvyys.pienin})`,
  nakyvyys.naytteita >= 5 && nakyvyys.lapinakyvia === 0 && nakyvyys.piilossa === 0,
  JSON.stringify(nakyvyys));
vaadi('nappula pysyy ruudulla koko matkan',
  nakyvyys.ruudunUlkona === 0, `ulkona ${nakyvyys.ruudunUlkona} näytettä`);

/* ---- 5. kerma pois liikkeen ajaksi ja takaisin perillä ------------ */

vaadi('ennen matkaa kerma on päällä',
  nakyvyys.ennen.luokka === false && nakyvyys.ennen.lippu === false,
  JSON.stringify(nakyvyys.ennen));
vaadi(`kerma on pois liikkeen ajan (${nakyvyys.kermattomia}/${nakyvyys.kermaNaytteita} näytettä)`,
  nakyvyys.kermaNaytteita > 0 && nakyvyys.kermattomia === nakyvyys.kermaNaytteita,
  JSON.stringify(nakyvyys));
vaadi('kerma palaa, kun nappula on saapunut kohdekaupunkiin',
  nakyvyys.jalkeen.luokka === false && nakyvyys.jalkeen.lippu === false,
  JSON.stringify(nakyvyys.jalkeen));

/* ---- 2–4. matkapisteet, nopeusprofiili ja pomppu ------------------ */

await sivu.evaluate(KASIKIRJOITETTU);

/*
 * VAIHEET: jokaisen matkapisteen kohta (e = i / n) sekä sen molemmin
 * puolin pieni askel — vauhti mitataan erotusosamääränä samoilla
 * pikseleillä, joilla pisteen osuvuuskin.
 */
const N_ARVIO = 4;
const D = 0.004;
const vaiheet = [];
const merkinta = [];
for (let i = 1; i <= N_ARVIO; i += 1) {
  for (const [nimi, x] of [['piste', i / N_ARVIO], ['keski', (i - 0.5) / N_ARVIO]]) {
    const t = aika(x);
    vaiheet.push(Math.max(0, t - D), t, Math.min(1, t + D));
    merkinta.push({ nimi, i, kanta: vaiheet.length - 2 });
  }
}
const ajo = await sivu.evaluate((v) => window.__mittaaAjo(v), vaiheet);
vaadi('käsikirjoitettu liftaus mitattiin', !ajo.virhe && ajo.pisteita >= 3, JSON.stringify(ajo.virhe ?? ''));

let pisteMitat = [];
let vauhdit = [];
if (!ajo.virhe) {
  /*
   * VAIHEET LASKETTIIN NELJÄLLE MATKAPISTEELLE; jos noppa antoi
   * lyhyemmän polun, mitataan ne pisteet, jotka polussa on.
   */
  const n = ajo.pisteita;
  const etaisyys = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  pisteMitat = merkinta.filter((m) => m.nimi === 'piste').map((m) => {
    const nayte = ajo.naytteet[m.kanta];
    // Vaihe laskettiin jaolla N_ARVIO; polun oma jako on n.
    const osuus = m.i / N_ARVIO;
    const idx = Math.round(osuus * n) - 1;
    const kohde = ajo.kohteet[idx];
    const sama = Math.abs((idx + 1) / n - osuus) < 1e-9;
    return {
      i: m.i, sama, idx, ero: kohde && nayte && !nayte.puuttuu ? etaisyys(nayte, kohde) : null,
    };
  }).filter((m) => m.sama && m.ero !== null);
  const vauhti = (kanta) => {
    const a = ajo.naytteet[kanta - 1];
    const b = ajo.naytteet[kanta + 1];
    return a && b && !a.puuttuu && !b.puuttuu ? etaisyys(a, b) : null;
  };
  vauhdit = merkinta.map((m) => ({ ...m, v: vauhti(m.kanta) }));
  vaadi(`nappula osuu jokaiseen matkapisteeseen ≤ 4 px `
    + `(${pisteMitat.map((m) => m.ero.toFixed(2)).join(' / ')} px)`,
  pisteMitat.length >= 2 && pisteMitat.every((m) => m.ero <= 4),
  JSON.stringify(pisteMitat));

  const parit = [];
  for (let i = 1; i <= N_ARVIO; i += 1) {
    const piste = vauhdit.find((m) => m.nimi === 'piste' && m.i === i)?.v;
    const keski = vauhdit.find((m) => m.nimi === 'keski' && m.i === i)?.v;
    if (piste > 0 && keski > 0) parit.push({ i, piste, keski });
  }
  vaadi(`nappula jarruttaa jokaiseen pisteeseen ja kiihdyttää välillä `
    + `(${parit.map((p) => `${p.piste.toFixed(2)}<${p.keski.toFixed(2)}`).join(' · ')})`,
  parit.length >= 2 && parit.every((p) => p.piste < p.keski),
  JSON.stringify(parit));

  const korkein = Math.max(...ajo.naytteet.filter((s) => !s.puuttuu).map((s) => s.korkeus));
  vaadi(`autokyyti ei pompi: nappulan pystykorkeus ${korkein.toFixed(2)} px`,
    korkein < 0.01, String(korkein));
  vaadi('nappulan elementti oli olemassa jokaisessa mittausvaiheessa',
    ajo.naytteet.every((s) => !s.puuttuu), JSON.stringify(ajo.naytteet.filter((s) => s.puuttuu).length));
}

/* ---- VASTAKOE A: liikeanimaatio pois → nappula hyppää ------------- */

const vastakoeA = await sivu.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 600));
  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  const polku = parit[0][1].path;
  const from = { ...g.player.pos };
  let korkein = 0;
  let kaynnissa = true;
  const kehys = () => {
    const hahmo = document.querySelector('.pallolauta-liikkuva .pawn-hahmo');
    const h = /translate\(0,([-\d.]+)\)/.exec(hahmo?.getAttribute('transform') ?? '');
    if (h) korkein = Math.max(korkein, Math.abs(Number(h[1])));
    if (kaynnissa) requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);
  // kyyti: false = entinen hyppyketju, ei vaihekäyrää.
  await ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
    saatto: false, maitse: true, kyyti: false, tapa: 'land',
  });
  kaynnissa = false;
  g.player.pos = from;
  ui.render();
  return { korkein };
});
vaadi(`VASTAKOE A: ilman liikeanimaatiota nappula hyppää (${vastakoeA.korkein.toFixed(2)} px)`,
  vastakoeA.korkein > 0.01, `pystykorkeus ${vastakoeA.korkein}`);

/* ---- VASTAKOE B: kerma pois -kytkin pois → kerma jää -------------- */

const vastakoeB = await sivu.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  const { tasoituksenLiike } = await import('./js/laattapyramidi.js');
  const alkuperainen = ui.matkanKermattomuus.bind(ui);
  ui.matkanKermattomuus = () => {};
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 600));
  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  const polku = parit[0][1].path;
  const from = { ...g.player.pos };
  let kermattomia = 0;
  let naytteita = 0;
  let kaynnissa = true;
  const kehys = () => {
    naytteita += 1;
    if (document.body.classList.contains('kerma-pois-liikkeessa') || tasoituksenLiike()) {
      kermattomia += 1;
    }
    if (kaynnissa) requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);
  await ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
    saatto: true, maitse: true, kyyti: true, tapa: 'land',
  });
  kaynnissa = false;
  ui.matkanKermattomuus = alkuperainen;
  g.player.pos = from;
  ui.render();
  return { kermattomia, naytteita };
});
vaadi('VASTAKOE B: ilman kytkintä kerma jää koko matkaksi',
  vastakoeB.naytteita > 0 && vastakoeB.kermattomia === 0, JSON.stringify(vastakoeB));

/* ---- kuvakaappaus liikkeen puolivälistä --------------------------- */

const kuvanTiedot = await sivu.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 600));
  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  const polku = parit[0][1].path;
  const from = { ...g.player.pos };
  const kesto = polku.length * autokyydinAskel(polku.length);
  window.__matkaValmis = ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
    saatto: true, maitse: true, kyyti: true, tapa: 'land',
  }).then(() => { g.player.pos = from; ui.render(); });
  return { kesto, pisteita: polku.length };
});
/*
 * PUOLIVÄLI LASKETAAN NAPPULAN LÄHDÖSTÄ, EI KUTSUSTA. Koreografiassa on
 * ennen nappulaa ennakkozoomi ja lähdön viive, joten kellon puoliväli
 * osuisi hetkeen, jolloin nappulaa ei vielä ole laudalla.
 */
/*
 * ODOTUS KELLOLLA EIKÄ KEHYKSELLÄ. `waitForFunction` tarkkailee
 * oletuksena kehystahdissa, ja kontissa se tarkoittaa sekunnin
 * tarkkuutta — nappula olisi jo perillä ennen ensimmäistä tarkistusta.
 * 50 ms:n kellopollaus osuu nappulan lähtöön, ja siitä eteenpäin
 * odotetaan kolmannes matkasta, jolloin kuva on liikkeen puolivälistä.
 */
await sivu.waitForFunction(() => Boolean(document.querySelector('.pallolauta-liikkuva')),
  null, { timeout: 30000, polling: 50 });
await sivu.waitForTimeout(Math.round(kuvanTiedot.kesto * 0.35));
const puolivali = await sivu.evaluate(() => {
  const el = document.querySelector('.pallolauta-liikkuva');
  if (!el) return { puuttuu: true };
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return { peittavyys: Number(cs.opacity), x: Math.round(r.x), y: Math.round(r.y) };
});
await kaappaa(sivu, 'nappula-liike-390.jpg');
vaadi('kuvakaappauksen hetkellä nappula on ruudulla näkyvissä',
  !puolivali.puuttuu && puolivali.peittavyys > 0.99, JSON.stringify(puolivali));
await sivu.evaluate(() => window.__matkaValmis);

/* ================= 1400 px ======================================== */

const { ctx: ctx1400, sivu: levea } = await avaaSivu(1400, 900);
await levea.evaluate(KASIKIRJOITETTU);
const leveaTulos = await levea.evaluate(async () => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  const { autokyydinAskel } = await import('./js/siirtokoreografia.js');
  const { tasoituksenLiike } = await import('./js/laattapyramidi.js');
  g.player.pos = { type: 'city', city: 'ateena' };
  g.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 800));
  const moves = findMoves(g.board, g.player.pos, 4, { mode: 'land' });
  const parit = [...moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
  const polku = parit[0][1].path;
  const from = { ...g.player.pos };
  const naytteet = [];
  const kerma = [];
  let kaynnissa = true;
  const kehys = () => {
    const el = document.querySelector('.pallolauta-liikkuva');
    if (el) {
      kerma.push(document.body.classList.contains('kerma-pois-liikkeessa') && tasoituksenLiike());
      naytteet.push(Number(getComputedStyle(el).opacity));
    }
    if (kaynnissa) requestAnimationFrame(kehys);
  };
  requestAnimationFrame(kehys);
  await ui.animatePawn(g.player, from, polku, autokyydinAskel(polku.length), {
    saatto: true, maitse: true, kyyti: true, tapa: 'land',
  });
  kaynnissa = false;
  await new Promise((r) => setTimeout(r, 800));
  const jalkeen = document.body.classList.contains('kerma-pois-liikkeessa') || tasoituksenLiike();
  g.player.pos = from;
  ui.render();
  return {
    naytteita: naytteet.length,
    pienin: naytteet.length ? Math.min(...naytteet) : null,
    kermattomia: kerma.filter(Boolean).length,
    kermaNaytteita: kerma.length,
    jalkeen,
  };
});
vaadi(`1400 px: nappula näkyy koko matkan (pienin peittävyys ${leveaTulos.pienin})`,
  leveaTulos.naytteita >= 3 && leveaTulos.pienin > 0.99, JSON.stringify(leveaTulos));
vaadi('1400 px: kerma pois liikkeen ajan ja takaisin perillä',
  leveaTulos.kermattomia === leveaTulos.kermaNaytteita && leveaTulos.jalkeen === false,
  JSON.stringify(leveaTulos));
await kaappaa(levea, 'nappula-liike-1400.jpg', 0.5);

vaadi('sivuvirheitä ei tullut', virheet.length === 0, virheet.join(' | '));

/* ---- yhteenveto --------------------------------------------------- */

const taulu = [];
taulu.push(`390 px: nappulan näytteitä ${nakyvyys.naytteita}, pienin peittävyys ${nakyvyys.pienin}, `
  + `ruudun ulkona ${nakyvyys.ruudunUlkona}`);
taulu.push(`kerma: ennen ${JSON.stringify(nakyvyys.ennen)} · liikkeen aikana `
  + `${nakyvyys.kermattomia}/${nakyvyys.kermaNaytteita} näytettä kermatta · perillä `
  + `${JSON.stringify(nakyvyys.jalkeen)}`);
if (!ajo.virhe) {
  taulu.push(`matkapisteitä ${ajo.pisteita}, kesto ${ajo.kesto} ms; poikkeamat pisteissä: `
    + `${pisteMitat.map((m) => `${m.ero.toFixed(2)} px`).join(' / ')}`);
  taulu.push(`vauhti (px / 2·${D} vaihetta): `
    + vauhdit.filter((m) => m.v != null).map((m) => `${m.nimi}${m.i} ${m.v.toFixed(2)}`).join(' · '));
}
taulu.push(`VASTAKOE A (hyppyketju): pystykorkeus ${vastakoeA.korkein.toFixed(2)} px`);
taulu.push(`VASTAKOE B (kytkin pois): kermattomia näytteitä ${vastakoeB.kermattomia}`
  + `/${vastakoeB.naytteita}`);
taulu.push(`1400 px: näytteitä ${leveaTulos.naytteita}, pienin peittävyys ${leveaTulos.pienin}`);
taulu.push('');
taulu.push(...rivit);
writeFileSync(join(ULOS, 'savuke-nappula-liike.txt'), `${taulu.join('\n')}\n`);
console.log(`\n${taulu.slice(0, 8).join('\n')}`);

await ctx390.close();
await ctx1400.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
