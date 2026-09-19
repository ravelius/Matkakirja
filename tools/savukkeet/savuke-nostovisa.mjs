/*
 * Savuke: KARTTANOSTON MINIKYSYMYS MAKSAA KERRAN JA VAIN OIKEASTA.
 *
 * Karttauudistuksen erä 6 (suunnitelma docs/raportit/
 * karttauudistus-suunnitelma-20260913.md luku 5.1, pallon versio
 * karttauudistus-suunnitelma-pallo-20260913.md luku 3.5; Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 1: nostokysymyksen palkkio 25 p).
 *
 * Nostokortin loppuun tuli valinnainen minikysymys (js/fokusnosto.js
 * piirraNostonVisa, datamalli `visa` fokusvirtapakan `takynostot`-
 * rivillä). Oikea vastaus lisää kassaan 25 puntaa JA kasvattaa
 * tallennuksen laskuria `nostotehtavatRatkaistu`, jota erä 7 lukee
 * aarrepisteen ehtona. Väärä vastaus ei lisää kumpaakaan, eikä sama
 * kysymys maksa kahdesti.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. KYSYMYS ON KORTISSA. Pariisin poolin kolmannen noston
 *      (`carmenin-ensi-ilta`) kortissa on visalaatikko lipukkeineen.
 *   2. OIKEA VASTAUS MAKSAA 25 p JA KASVATTAA LASKURIA. `money`
 *      nousee tasan palkkion verran ja `nostotehtavatRatkaistu`
 *      nollasta yhteen.
 *   3. SAMA KYSYMYS EI MAKSA KAHDESTI. Kortti suljetaan ja avataan
 *      uudelleen: laatikossa ei ole enää lipukkeita, ja kun kaikkia
 *      laatikon nappeja napautetaan, kassa ja laskuri pysyvät
 *      paikallaan.
 *   4. VÄÄRÄ VASTAUS EI LISÄÄ KUMPAAKAAN (VASTAKOE). Oma, tyhjästä
 *      ladattu peli: väärä lipuke → `money` ja laskuri ennallaan,
 *      mutta kysymys on silti kulunut (laatikossa lukee vastaus).
 *   5. VANHA TALLENNUS LATAUTUU ILMAN KENTTÄÄ. Tallennus, josta
 *      `nostotehtavatRatkaistu` on poistettu, latautuu ja laskuri on
 *      0 — erä 6 ei nosta skeemaversiota (suunnitelma, luku 4.4).
 *
 * MIKSI KORTTI AVATAAN TUNNUKSESTA EIKÄ HIIRELLÄ. PARIISIN NOSTOILLA
 * EI OLE PÄÄKARTALLA MERKKIÄ: kaikki kolme asuvat kaupunkilehden
 * kohdekartalla (js/packs/nahtavyysjutut.js `nosto`-linkit), ja
 * js/fokuskohteet.js karsiKaupunkikartanNostot pudottaa ne pallolta
 * omistajan säännöllä 2.9.2026. Savuke ajaa siksi saman polun kuin
 * merkin napautus, mutta tunnuksesta (js/fokusnosto.js
 * avaaNostonTunnuksella → avaaNosto → avaaNostonKortti); merkin
 * napautusta mittaa oma vartionsa savuke-pallo-nostolaput.mjs.
 * Tämä savuke mittaa kortin SISUSTA.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-nostovisa.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_PARIISI } from '../../js/packs/fokusvirta-pariisi.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Palkkio on koodin vakio (js/fokusnosto.js NOSTON_VISA_PALKKIO). */
const PALKKIO = 25;
/** Pariisin nostot; kysymys on kiintiön mukaan joka kolmannessa. */
const NOSTOT = FOKUSVIRTA_PARIISI.takynostot;
const VISALLISET = NOSTOT.filter((n) => n.visa);
const KOE = VISALLISET[0];
/** Näkymä: Pariisi lähikuvassa, jotta maan nostot ovat kartalla. */
const PARIISI = { lat: 48.8566, lng: 2.3522, alt: 0.09 };

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

/* ---------- Tallenne: Fogg Pariisissa, vuoro toiminnassa ---------- */
function tallenne({ ilmanLaskuria = false } = {}) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete('pariisi');
  const data = peli.toJSON();
  // Vanha tallennus ei tunne kenttää lainkaan (vartio 5).
  if (ilmanLaskuria) delete data.nostotehtavatRatkaistu;
  return JSON.stringify(data);
}

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** Yksi selainkonteksti valmiiksi ladattuna Pariisin palloon. */
async function avaaPeli(data) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, data);
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
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) await sivu.waitForTimeout(3500);
  return { ctx, sivu, auki, virheet };
}

/** Kamera Pariisiin ja ladonta heti, jotta nostot ovat osumissa. */
const asetaNakyma = (sivu) => sivu.evaluate(async (n) => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView({ lat: n.lat, lng: n.lng, altitude: n.alt }, 0);
  await new Promise((v) => setTimeout(v, 1600));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  return l.nostot.osumat().map((o) => o.id);
}, PARIISI);

/** Kortti auki noston tunnuksesta; palauttaa laatikon tilan. */
const avaaKortti = (sivu, id) => sivu.evaluate(async (nostoId) => {
  for (const el of document.querySelectorAll('.fokusnosto-kerros')) el.remove();
  const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
  const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, nostoId);
  await new Promise((v) => setTimeout(v, 400));
  /*
   * KUVA EDELLÄ -AVAUS (js/nostokuva.js): kuvallinen nosto avautuu
   * ensin pelkkänä kuvakehyksenä, ja juttu — kysymys mukaan lukien —
   * latoutuu vasta "lisää"-napista. Sama napautus, jonka pelaaja
   * tekee; ilman sitä kortissa ei ole kysymystä eikä tekstiä.
   */
  const lisaa = document.querySelector('.fokusnosto-kortti .nostokuva-lisaa');
  if (lisaa) {
    lisaa.click();
    await new Promise((v) => setTimeout(v, 500));
  }
  const laatikko = document.querySelector('.fokusnosto-kortti .fokusnosto-visa');
  const napit = [...(laatikko?.querySelectorAll('.kulttuuri-vaihtoehdot button') ?? [])];
  return {
    loytyi,
    onLaatikko: Boolean(laatikko),
    otsake: laatikko?.querySelector('.minitehtava-otsikko')?.textContent ?? '',
    kysymys: laatikko?.querySelector('.minitehtava-kysymys')?.textContent ?? '',
    vihje: laatikko?.querySelector('.fokusnosto-visa-vihje')?.textContent ?? '',
    napit: napit.map((n) => n.textContent),
    // 390 px: laatikko ei saa vuotaa kortin yli.
    laatikkoLeveys: laatikko ? Math.round(laatikko.getBoundingClientRect().width) : 0,
    korttiLeveys: Math.round(
      document.querySelector('.fokusnosto-kortti')?.getBoundingClientRect().width ?? 0,
    ),
    vaakavuoto: document.documentElement.scrollWidth > window.innerWidth,
  };
}, id);

/** Napauta laatikon n:ttä lipuketta; palauttaa kassan ja laskurin. */
const vastaa = (sivu, i) => sivu.evaluate(async (indeksi) => {
  const napit = [...document.querySelectorAll(
    '.fokusnosto-kortti .fokusnosto-visa .kulttuuri-vaihtoehdot button',
  )];
  napit[indeksi]?.click();
  await new Promise((v) => setTimeout(v, 300));
  const g = window.matkakirja.game;
  return {
    napitOli: napit.length,
    money: g.player.money,
    laskuri: g.nostotehtavatRatkaistu,
    tulos: document.querySelector('.fokusnosto-kortti .fokusnosto-visa .kulttuuri-tulos')
      ?.textContent ?? '',
    napitJaljella: document.querySelectorAll(
      '.fokusnosto-kortti .fokusnosto-visa .kulttuuri-vaihtoehdot button',
    ).length,
  };
}, i);

/**
 * PULU EI PEITÄ KORTIN TEKSTIÄ (PAATOKSET 50, js/pulu-paneelin-ylla.js):
 * pulun laatikko ei leikkaa yhtään kortin näkyvää tekstiriviä.
 */
const puluPeitto = (sivu, kortti) => sivu.evaluate(async (valitsin) => {
  await new Promise((v) => setTimeout(v, 700));
  const n = document.querySelector('.pollo-nappi.pollo-kelluu');
  const k = document.querySelector(valitsin);
  if (!n || !k) return { pulu: Boolean(n), kortti: Boolean(k), leikkaa: -1 };
  const p = n.getBoundingClientRect();
  const kr = k.getBoundingClientRect();
  /*
   * Väistynyt (näkymätön) pulu ei peitä mitään — MUTTA näkyvä lintu on
   * Livian kasvokankaalla (.livia-kasvot-pinta, js/livia-eleet.js), ei
   * napissa. Sonnet 1, kierros 13 (v1964, iPhone-simulaattori): nappi oli
   * piilossa, mutta kangas piirsi pulun kortin lähderivin päälle. Kankaan
   * on oltava piilossa samalla. Playwright ei piirrä lintua, joten
   * vartio lukee kankaan tilan.
   */
  if (Number(getComputedStyle(n).opacity) === 0) {
    const pinta = document.querySelector('.livia-kasvot-pinta');
    const pintaNakyy = Boolean(pinta && !pinta.hidden && pinta.getClientRects().length > 0);
    return {
      pulu: true, kortti: true, leikkaa: pintaNakyy ? 1 : 0, piilossa: true, pintaNakyy,
    };
  }
  const leikkaavat = [...k.querySelectorAll('p, h1, h2, h3, li, figcaption, button')]
    .map((e) => e.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0 && r.bottom > kr.top && r.top < kr.bottom)
    .filter((r) => r.left < p.right && r.right > p.left && r.top < p.bottom && r.bottom > p.top);
  return {
    pulu: true, kortti: true, leikkaa: leikkaavat.length,
    ylla: n.classList.contains('pulu-paneelin-ylla'),
    pulunAla: Math.round(p.bottom), kortinYla: Math.round(kr.top),
  };
}, kortti);

/*
 * VISALAATIKON ULKOASU (Raamattu NOSTOVISAN ULKOASU JA VAIHTOEHTOJEN
 * KIELI, omistajan laitekuva 19.9.2026 klo 20.41: "Tämä visuaalisesti
 * outo"). Laatikko on paperia: vaihtoehdot ovat VAALEITA nappeja
 * ruskealla reunalla, ja laatikko on enintään puolet 390 × 844 -ruudun
 * korkeudesta. Mitataan laatikon korkeus ja jokaisen vaihtoehtonapin
 * taustan luminanssi (tausta sekoitettuna laatikon paperiin alfan
 * mukaan) sekä reunan olemassaolo. Laitekuvassa kohdekortin napit
 * olivat tummanruskeita (pelin yleinen nappi), koska laatikon säännöt
 * oli kirjoitettu vain nostokortin valitsimella.
 */
const visaUlkoasu = (sivu, kortti) => sivu.evaluate((valitsin) => {
  const laatikko = document.querySelector(`${valitsin} .fokusnosto-visa`);
  if (!laatikko) return { laatikko: false };
  const rgba = (c) => (c.match(/[\d.]+/g) ?? []).map(Number);
  const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const napit = [...laatikko.querySelectorAll('.kulttuuri-vaihtoehdot button')].map((n) => {
    const t = getComputedStyle(n);
    const [r, g, b, a = 1] = rgba(t.backgroundColor);
    // Läpinäkyvä tausta näyttää paperin (kortin sävy #f5f0e2 ≈ 240).
    const paperi = 240;
    return {
      lum: Math.round(a * lum([r, g, b]) + (1 - a) * paperi),
      reuna: parseFloat(t.borderTopWidth) > 0 && t.borderTopStyle !== 'none',
      teksti: Math.round(lum(rgba(t.color))),
    };
  });
  const otsikko = laatikko.querySelector('.minitehtava-otsikko');
  return {
    laatikko: true,
    korkeus: Math.round(laatikko.getBoundingClientRect().height),
    ruutu: innerHeight,
    napit,
    otsikkoKoko: otsikko ? parseFloat(getComputedStyle(otsikko).fontSize) : null,
  };
}, kortti);
const ulkoasuOk = (u) => u.laatikko && u.korkeus <= u.ruutu / 2 && u.napit.length >= 2
  && u.napit.every((n) => n.lum >= 200 && n.reuna && n.teksti < 80);

const luvut = (sivu) => sivu.evaluate(() => ({
  money: window.matkakirja.game.player.money,
  laskuri: window.matkakirja.game.nostotehtavatRatkaistu,
}));

/* ---------- DATAN KIINTIÖ (ei tarvitse selainta) ---------- */
tieto('Pariisin nostot', NOSTOT.map((n) => `${n.id}${n.visa ? ' *' : ''}`).join(', '));
vaadi('0. kiintiö: joka kolmannessa nostossa on kysymys',
  VISALLISET.length === Math.floor(NOSTOT.length / 3)
    && NOSTOT.indexOf(KOE) === 2,
  `nostoja ${NOSTOT.length}, kysymyksiä ${VISALLISET.length}, `
  + `ensimmäinen indeksissä ${NOSTOT.indexOf(KOE)}`);

/* ---------- AJO A: OIKEA VASTAUS ---------- */
const a = await avaaPeli(tallenne());
vaadi('pallolauta aukesi (oikea vastaus)', a.auki, a.virheet.join(' | '));

if (a.auki) {
  const osumat = await asetaNakyma(a.sivu);
  tieto('osumia Pariisin näkymässä', `${osumat.length} — ${osumat.join(', ')}`);
  const kortti = await avaaKortti(a.sivu, KOE.id);
  tieto('kortin otsake', `"${kortti.otsake}"`);
  tieto('kortin kysymys', `"${kortti.kysymys}"`);
  tieto('vihjerivi', `"${kortti.vihje}"`);
  tieto('lipukkeet', kortti.napit?.join(' | ') ?? '—');
  tieto('laatikon leveys / kortin leveys',
    `${kortti.laatikkoLeveys} px / ${kortti.korttiLeveys} px (ruutu 390 px)`);
  vaadi('1. kysymys on kortissa lipukkeineen',
    kortti.onLaatikko && kortti.napit?.length === KOE.visa.vaihtoehdot.length,
    `löytyi ${kortti.loytyi}, laatikko ${kortti.onLaatikko}, lipukkeita ${kortti.napit?.length}`);
  vaadi('1b. 390 px: laatikko mahtuu korttiin eikä sivu vuoda vaakaan',
    kortti.laatikkoLeveys > 0 && kortti.laatikkoLeveys <= kortti.korttiLeveys
      && !kortti.vaakavuoto,
    `laatikko ${kortti.laatikkoLeveys}, kortti ${kortti.korttiLeveys}, vuoto ${kortti.vaakavuoto}`);

  /*
   * KYSYMYS NÄKYVIIN ENNEN KAAPPAUSTA. Kortti avautuu jutun alkuun ja
   * laatikko on sen lopussa (sisältö vierii .fokusnosto-sisallossa),
   * joten ilman vieritystä kaappaus näyttäisi vain lööpin.
   */
  const vierita = () => a.sivu.evaluate(async () => {
    document.querySelector('.fokusnosto-kortti .fokusnosto-visa')
      ?.scrollIntoView({ block: 'end' });
    await new Promise((v) => setTimeout(v, 250));
  });
  if (KUVAKANSIO) {
    await vierita();
    await a.sivu.locator('.fokusnosto-kortti')
      .screenshot({ path: join(KUVAKANSIO, 'karttauudistus-6-nostovisa-kysymys.png'), scale: 'css' });
  }
  const peittoA = await puluPeitto(a.sivu, '.fokusnosto-kortti');
  tieto('pulu nostokortilla', JSON.stringify(peittoA));
  vaadi('9. pulu ei peitä nostokortin tekstiä (390 px)',
    peittoA.pulu && peittoA.kortti && peittoA.leikkaa === 0, JSON.stringify(peittoA));
  const ulkoasuA = await visaUlkoasu(a.sivu, '.fokusnosto-kortti');
  tieto('visan ulkoasu nostokortilla', JSON.stringify(ulkoasuA));
  vaadi('12. nostokortin visa on paperia: vaaleat reunalliset napit, laatikko ≤ puoli ruutua',
    ulkoasuOk(ulkoasuA), JSON.stringify(ulkoasuA));

  /*
   * 9c. KORTTI JO NOSTETUN PULUN PÄÄLLE (Sonnet, kierros 11, v1962
   * laitteella). Pulu oli jo hypännyt alalaidan paneelin yläpuolelle, ja
   * laaja nostokortti avautui sen päälle. Vahti piti vanhan paneelin
   * muistissa, joten pulu jäi kortin keskelle tekstin ja visan napin
   * päälle. Vastakoe ennen korjausta (js/pulu-paneelin-ylla.js):
   * leikkaa 1, pulun alareuna 636 px kortin sisällä. Alapaneeli on
   * savukkeen oma (kiinteä, taustallinen, tekstiä), jotta väite ei
   * riipu siitä, mikä pelin paneeli sattuu olemaan auki.
   */
  const alapaneeli = (paalle) => a.sivu.evaluate(async (lisaa) => {
    for (const e of document.querySelectorAll('.fokusnosto-kerros, .saapumistraileri')) e.remove();
    document.querySelector('.savuke-alapaneeli')?.remove();
    if (lisaa) {
      const pa = document.createElement('div');
      pa.className = 'savuke-alapaneeli';
      pa.style.cssText = 'position:fixed;left:0;right:0;bottom:0;height:200px;background:#eee;z-index:5';
      pa.textContent = 'Alalaidan infopaneeli, jossa on luettavaa tekstiä riittävästi.';
      document.body.appendChild(pa);
    }
    await new Promise((v) => setTimeout(v, 800));
    const n = document.querySelector('.pollo-nappi.pollo-kelluu');
    const pa = document.querySelector('.savuke-alapaneeli');
    return {
      ylla: Boolean(n?.classList.contains('pulu-paneelin-ylla')),
      pulunAla: n ? Math.round(n.getBoundingClientRect().bottom) : null,
      paneelinYla: pa ? Math.round(pa.getBoundingClientRect().top) : null,
    };
  }, paalle);
  const alaEnnen = await alapaneeli(true);
  await avaaKortti(a.sivu, KOE.id);
  const peittoC = await puluPeitto(a.sivu, '.fokusnosto-kortti');
  tieto('pulu alapaneelin päälle avatulla kortilla', JSON.stringify({ alaEnnen, peittoC }));
  vaadi('9c. kortti jo nostetun pulun päälle: pulu väistyy eikä peitä tekstiä',
    alaEnnen.ylla && alaEnnen.pulunAla <= alaEnnen.paneelinYla
      && peittoC.pulu && peittoC.kortti && peittoC.leikkaa === 0,
    JSON.stringify({ alaEnnen, peittoC }));
  // Kortti kiinni: pulu palaa alapaneelin yläpuolelle (ei heiluria).
  const alaJalkeen = await a.sivu.evaluate(async () => {
    for (const e of document.querySelectorAll('.fokusnosto-kerros')) e.remove();
    await new Promise((v) => setTimeout(v, 800));
    const n = document.querySelector('.pollo-nappi.pollo-kelluu');
    return {
      ylla: Boolean(n?.classList.contains('pulu-paneelin-ylla')),
      piilossa: Boolean(n?.classList.contains('pulu-paneelin-alla-piilossa')),
      pulunAla: n ? Math.round(n.getBoundingClientRect().bottom) : null,
      paneelinYla: Math.round(document.querySelector('.savuke-alapaneeli').getBoundingClientRect().top),
    };
  });
  vaadi('9d. kortin sulkeuduttua pulu palaa alapaneelin yläpuolelle',
    alaJalkeen.ylla && !alaJalkeen.piilossa && alaJalkeen.pulunAla <= alaJalkeen.paneelinYla,
    JSON.stringify(alaJalkeen));
  await alapaneeli(false);
  await avaaKortti(a.sivu, KOE.id);

  const ennen = await luvut(a.sivu);
  const jalkeen = await vastaa(a.sivu, KOE.visa.oikea);
  tieto('oikea vastaus', `money ${ennen.money} → ${jalkeen.money}, `
    + `laskuri ${ennen.laskuri} → ${jalkeen.laskuri}`);
  tieto('tulosrivi', `"${jalkeen.tulos}"`);
  vaadi('2. oikea vastaus lisää palkkion ja kasvattaa laskuria',
    jalkeen.money === ennen.money + PALKKIO && jalkeen.laskuri === ennen.laskuri + 1,
    `money ${ennen.money} → ${jalkeen.money} (odotettu +${PALKKIO}), `
    + `laskuri ${ennen.laskuri} → ${jalkeen.laskuri}`);

  /*
   * KAKSI KAAPPAUSTA KORTISTA, EI KOKO RUUDUSTA: kysymys ennen
   * vastausta ja tulos sen jälkeen. Kortti on 342 px 390 px:n
   * ruudulla, joten rajattu kaappaus näyttää saman asian murto-osalla
   * tiedostokoosta (docs/raportit/kuvat, katto 400 kt).
   */
  if (KUVAKANSIO) {
    await vierita();
    await a.sivu.locator('.fokusnosto-kortti')
      .screenshot({ path: join(KUVAKANSIO, 'karttauudistus-6-nostovisa-tulos.png'), scale: 'css' });
  }

  // 3. Kortti uudelleen auki: ei lipukkeita, ei toista palkkiota.
  const uudelleen = await avaaKortti(a.sivu, KOE.id);
  const toinen = await vastaa(a.sivu, KOE.visa.oikea);
  tieto('toinen avaus', `lipukkeita ${uudelleen.napit?.length ?? 0}, `
    + `money ${toinen.money}, laskuri ${toinen.laskuri}`);
  vaadi('3. sama kysymys ei maksa kahdesti',
    (uudelleen.napit?.length ?? 0) === 0
      && toinen.money === jalkeen.money && toinen.laskuri === jalkeen.laskuri,
    `lipukkeita ${uudelleen.napit?.length}, money ${jalkeen.money} → ${toinen.money}, `
    + `laskuri ${jalkeen.laskuri} → ${toinen.laskuri}`);
  await a.ctx.close();
} else {
  await a.ctx.close();
}

/* ---------- AJO B (VASTAKOE): VÄÄRÄ VASTAUS ---------- */
const b = await avaaPeli(tallenne());
vaadi('pallolauta aukesi (väärä vastaus)', b.auki, b.virheet.join(' | '));

if (b.auki) {
  await asetaNakyma(b.sivu);
  const kortti = await avaaKortti(b.sivu, KOE.id);
  const ennen = await luvut(b.sivu);
  const vaara = (KOE.visa.oikea + 1) % KOE.visa.vaihtoehdot.length;
  const jalkeen = await vastaa(b.sivu, vaara);
  tieto('väärä vastaus', `money ${ennen.money} → ${jalkeen.money}, `
    + `laskuri ${ennen.laskuri} → ${jalkeen.laskuri}`);
  tieto('tulosrivi (väärä)', `"${jalkeen.tulos}"`);
  vaadi('4. väärä vastaus ei lisää kassaan eikä laskuriin (VASTAKOE)',
    kortti.onLaatikko && jalkeen.money === ennen.money && jalkeen.laskuri === ennen.laskuri
      && jalkeen.napitJaljella === 0,
    `money ${ennen.money} → ${jalkeen.money}, laskuri ${ennen.laskuri} → ${jalkeen.laskuri}, `
    + `lipukkeita jäljellä ${jalkeen.napitJaljella}`);
  /*
   * 4b. VÄÄRÄN JÄLKEEN KORTTI LUKITTUU (Sonnet 1:n laitetesti v1962,
   * kierros 11; Fablen päätös klo 19.55: avain kuluu molemmista
   * vastauksista). Uudelleenavatussa kortissa ei ole lipukkeita, ja
   * oikean vastauksen yritys ei maksa. (Uudelleenlatausta ei mitata tässä:
   * avaaPeli-init-skripti kirjoittaa alkutallennuksen joka latauksella.)
   */
  const uudelleenB = await avaaKortti(b.sivu, KOE.id);
  const yritysB = await vastaa(b.sivu, KOE.visa.oikea);
  tieto('väärän jälkeen uudelleen', JSON.stringify({ napit: uudelleenB.napit?.length, money: yritysB.money }));
  vaadi('4b. väärän vastauksen jälkeen kortti on lukittu eikä oikea vastaus enää maksa',
    (uudelleenB.napit?.length ?? 0) === 0 && yritysB.money === jalkeen.money
    , `lipukkeita ${uudelleenB.napit?.length}, money ${jalkeen.money} → ${yritysB.money}`);
  await b.ctx.close();
} else {
  await b.ctx.close();
}

/* ---------- AJO C: VANHA TALLENNUS ILMAN KENTTÄÄ ---------- */
const c = await avaaPeli(tallenne({ ilmanLaskuria: true }));
vaadi('pallolauta aukesi (vanha tallennus)', c.auki, c.virheet.join(' | '));
if (c.auki) {
  const vanha = await luvut(c.sivu);
  tieto('vanha tallennus', `money ${vanha.money}, laskuri ${vanha.laskuri}`);
  vaadi('5. vanha tallennus ilman kenttää latautuu, laskuri 0',
    vanha.laskuri === 0 && Number.isInteger(vanha.laskuri),
    `laskuri ${vanha.laskuri}`);
}
await c.ctx.close();

/* ---------- AJO D: HAHMOTELMANOSTO KOHDEKORTILLA (Texel) ----------
 *
 * Sonnet 1:n laitetesti 19.9.2026 (v1960): hahmotelmanostojen visa ei
 * piirtynyt, koska ne ovat KOHDE_MAAT-rivejä ja avautuvat kohdekortilla
 * (js/fokuskohteet.js piirraKohteenSisus), jolla visaa ei ollut.
 */
const HAHMOTELMA = 'hahmotelma-texel';
const d = await avaaPeli(tallenne());
vaadi('pallolauta aukesi (hahmotelma)', d.auki, d.virheet.join(' | '));
if (d.auki) {
  const avaaKohde = (tunnus = HAHMOTELMA, maa = 'NLD') => d.sivu.evaluate(async ({ id, iso }) => {
    for (const el of document.querySelectorAll('.fokuskohde-popup')) el.remove();
    const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const kohde = (KOHDE_MAAT[iso] ?? []).find((k) => k.id === id);
    if (!kohde) return { loytyi: false };
    avaaFokuskohde(window.matkakirja.ui, kohde);
    await new Promise((v) => setTimeout(v, 500));
    const lisaa = document.querySelector('.fokuskohde-popup .nostokuva-lisaa');
    if (lisaa) { lisaa.click(); await new Promise((v) => setTimeout(v, 500)); }
    const laatikko = document.querySelector('.fokuskohde-popup .fokusnosto-visa');
    return {
      loytyi: true,
      oikea: kohde.visa?.oikea ?? null,
      onLaatikko: Boolean(laatikko),
      napit: laatikko?.querySelectorAll('.kulttuuri-vaihtoehdot button').length ?? 0,
    };
  }, { id: tunnus, iso: maa });
  const vastaaKohde = (i) => d.sivu.evaluate(async (indeksi) => {
    const napit = [...document.querySelectorAll('.fokuskohde-popup .fokusnosto-visa .kulttuuri-vaihtoehdot button')];
    napit[indeksi]?.click();
    await new Promise((v) => setTimeout(v, 300));
    const g = window.matkakirja.game;
    return { money: g.player.money, laskuri: g.nostotehtavatRatkaistu, napitOli: napit.length };
  }, i);
  const ek = await avaaKohde();
  tieto('hahmotelmakortti', JSON.stringify(ek));
  const peittoD = await puluPeitto(d.sivu, '.fokuskohde-popup');
  tieto('pulu kohdekortilla', JSON.stringify(peittoD));
  vaadi('10. pulu ei peitä kohdekortin tekstiä (390 px)',
    peittoD.pulu && peittoD.kortti && peittoD.leikkaa === 0, JSON.stringify(peittoD));
  /*
   * 10b. KORTTI KIINNI → LINTU TAKAISIN. Vahdin piilotus ei saa jäädä
   * päälle: kankaan on palattava, kun kohdekortti suljetaan.
   */
  const palasiD = await d.sivu.evaluate(async () => {
    const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    // Saapumistraileri on savukkeen latauksen jäänne koko ruudun päällä:
    // sen alla pulu väistyy oikein, joten se pois ennen mittausta.
    for (const e of document.querySelectorAll('.fokuskohde-popup, .saapumistraileri')) e.remove();
    await new Promise((v) => setTimeout(v, 800));
    const n = document.querySelector('.pollo-nappi');
    const pinta = document.querySelector('.livia-kasvot-pinta');
    return {
      piilossa: Boolean(n?.classList.contains('pulu-paneelin-alla-piilossa')),
      pinta: pinta ? !pinta.hidden : null,
    };
  });
  vaadi('10b. kohdekortin sulkeuduttua pulu ja sen kasvokangas palaavat',
    !palasiD.piilossa && palasiD.pinta !== false, JSON.stringify(palasiD));
  await avaaKohde();
  const ulkoasuD = await visaUlkoasu(d.sivu, '.fokuskohde-popup');
  tieto('visan ulkoasu kohdekortilla', JSON.stringify(ulkoasuD));
  if (KUVAKANSIO) {
    await d.sivu.evaluate(async () => {
      // Saapumistraileri on savukkeen latauksen jäänne kortin päällä.
      for (const e of document.querySelectorAll('.saapumistraileri')) e.remove();
      document.querySelector('.fokuskohde-popup .fokusnosto-visa')?.scrollIntoView({ block: 'center' });
      await new Promise((v) => setTimeout(v, 300));
    });
    await d.sivu.locator('.fokuskohde-popup .fokusnosto-visa')
      .screenshot({ path: join(KUVAKANSIO, 'nostovisa-kohdekortti-laatikko.png'), scale: 'css' }).catch(() => {});
  }
  vaadi('12b. kohdekortin visa on paperia: vaaleat reunalliset napit, laatikko ≤ puoli ruutua',
    ulkoasuOk(ulkoasuD), JSON.stringify(ulkoasuD));
  vaadi('6. hahmotelmanoston kohdekortissa on lukijan kysymys lipukkeineen',
    ek.loytyi && ek.onLaatikko && ek.napit >= 2, JSON.stringify(ek));
  const ennenD = await luvut(d.sivu);
  const jalkeenD = await vastaaKohde(ek.oikea ?? 0);
  vaadi('7. oikea vastaus kohdekortilla lisää palkkion',
    jalkeenD.money === ennenD.money + PALKKIO && jalkeenD.laskuri === ennenD.laskuri + 1,
    `money ${ennenD.money} → ${jalkeenD.money}, laskuri ${ennenD.laskuri} → ${jalkeenD.laskuri}`);
  const toinenK = await avaaKohde();
  const toinenD = await vastaaKohde(ek.oikea ?? 0);
  vaadi('8. kohdekortin kysymys ei maksa kahdesti',
    toinenK.onLaatikko && toinenK.napit === 0 && toinenD.money === jalkeenD.money,
    `lipukkeita ${toinenK.napit}, money ${jalkeenD.money} → ${toinenD.money}`);
}
if (d.auki) {
  /*
   * 11. VÄÄRÄN JÄLKEEN KOHDEKORTTI LUKITTUU (Sonnet 1 kierros 11, v1962:
   * Białowieża — uudelleenavatussa kortissa oli yhä vaihtoehdot).
   */
  const avaaKohdeB = () => d.sivu.evaluate(async () => {
    for (const el of document.querySelectorAll('.fokuskohde-popup')) el.remove();
    const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const kohde = (KOHDE_MAAT.POL ?? []).find((k) => k.id === 'hahmotelma-bialowieza');
    if (!kohde) return { loytyi: false };
    avaaFokuskohde(window.matkakirja.ui, kohde);
    await new Promise((v) => setTimeout(v, 500));
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 500));
    const laatikko = document.querySelector('.fokuskohde-popup .fokusnosto-visa');
    return {
      loytyi: true, oikea: kohde.visa?.oikea ?? null, onLaatikko: Boolean(laatikko),
      napit: laatikko?.querySelectorAll('.kulttuuri-vaihtoehdot button').length ?? 0,
      laatikoita: document.querySelectorAll('.fokuskohde-popup .fokusnosto-visa').length,
      vastatut: [...window.matkakirja.game.minitehtavatVastatut].filter((a) => /bialow/.test(a)),
    };
  });
  const vastaaB = (i) => d.sivu.evaluate(async (indeksi) => {
    const napit = [...document.querySelectorAll('.fokuskohde-popup .fokusnosto-visa .kulttuuri-vaihtoehdot button')];
    napit[indeksi]?.click();
    await new Promise((v) => setTimeout(v, 300));
    return { money: window.matkakirja.game.player.money, napit: napit.length };
  }, i);
  const b1 = await avaaKohdeB();
  const vaaraB = b1.oikea === null ? 0 : (b1.oikea + 1) % 4;
  const bv = await vastaaB(vaaraB);
  await d.sivu.keyboard.press('Escape');
  await d.sivu.waitForTimeout(400);
  await d.sivu.waitForTimeout(1500);
  const tallessa = await d.sivu.evaluate(() => {
    try {
      const t = JSON.parse(localStorage.getItem('matkakirja-save-v1') ?? '{}');
      return (t.minitehtavatVastatut ?? []).filter((a) => /bialow/.test(a));
    } catch (e) { return String(e); }
  });
  tieto('Białowieża tallennuksessa väärän jälkeen', JSON.stringify(tallessa));
  vaadi('11b. väärän vastauksen avain on tallennuksessa (säilyy uudelleenlatauksen yli)',
    Array.isArray(tallessa) && tallessa.length === 1, JSON.stringify(tallessa));
  const b2 = await avaaKohdeB();
  const bo = await vastaaB(b1.oikea ?? 0);
  tieto('Białowieża väärä → uudelleen', JSON.stringify({ b1, bv, b2, bo }));
  vaadi('11. väärän vastauksen jälkeen kohdekortti (Białowieża) on lukittu eikä oikea maksa',
    b1.loytyi && b1.napit >= 2 && b2.napit === 0 && bo.money === bv.money,
    JSON.stringify({ ennen: b1.napit, jalkeen: b2.napit, laatikoita: b2.laatikoita, vastatut: b2.vastatut, money: [bv.money, bo.money] }));
}
await d.ctx.close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
