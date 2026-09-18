/*
 * Savuke: KAMERA LAHEMMAS NAPPULAA HYPPYJEN AJAKSI (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 40).
 *
 * OMISTAJA 18.9.2026 klo 20.50 Suomen aikaa (puhelintestin v1944
 * löydös 4, kuva Marseillen siirtovaiheesta), sanatarkasti: *"kartan
 * pitaisi zoomautua lahemmas pelinappulaa kun se liftaa pisteiden
 * valilla."*
 *
 * MIKSI OMA SAVUKE. savuke-siirtokoreografia mittaa siirron AJOITUKSEN
 * (viive, saapumisero, trapetsi) ja savuke-jalkamatka sen RAKENTEEN
 * (zoomi ensin, ääni, ele voittaa). Kumpikaan ei mittaa sitä yhtä
 * lukua, jonka omistaja näki puhelimen ruudulla: KUINKA PITKÄ YKSI
 * ASKEL ON RUUDULLA. Se on koko päätöksen sisältö, ja se katoaisi
 * huomaamatta yhdellä kertoimen muutoksella.
 *
 * VARTIOT (390 × 844 ja 1400 × 900, dpr 2, Ranskan maasiirto
 * Marseillesta):
 *
 *   1. KAMERA MENEE LÄHEMMÄS: näkyvä leveys ennakkozoomin jälkeen on
 *      pienempi kuin ennen siirtoa.
 *   2. ASKEL ON RUUDULLA ISO: yksi askel (piste → piste) on vähintään
 *      ASKELEN_VAHIN_OSUUS (25 %) ruudun LYHYEMMÄSTÄ sivusta.
 *   3. KATTO PITÄÄ: näkyvä leveys ei mene laitteen syvimmän sallitun
 *      zoomin alle (puhelin 40, työpöytä 60 lautayksikköä).
 *   4. NAPPULA PYSYY KESKIALUEELLA: jokaisessa saaton näytteessä
 *      liikkuvan nappulan keskipiste on ruudun keskimmäisellä 60 %:lla
 *      molemmissa suunnissa.
 *   5. SAATON KESTO ENNALLAAN: mitattu kesto on ±10 % siitä, minkä
 *      siirtoajonKesto(nappulanKesto) antaa — zoomi ei saa muuttaa
 *      koreografian ajoitusta.
 *   6. EI SIVUVIRHEITÄ.
 *   7. ZOOMI ENSIN, VASTA SITTEN NAPPULA (Raamattu, KARTTAUUDISTUKSEN
 *      PAATOKSET 40; omistaja 1.9.2026: *"kartta saisi zoomautua
 *      lähemmäksi ensin ja sitten vasta pelaaja alkaisi liikkua"*).
 *      Sillä kehyksellä, jolla nappula IRTOAA laudalta (liikkuva
 *      nappula ilmestyy), kameran korkeus on ennakkozoomin
 *      TAVOITEkorkeudessa ±5 %. Tämä on koko koreografian sääntö
 *      lukuna: ennen korjausta ennakon `await` ratkesi yhdessä
 *      millisekunnissa, ja zoomaus tapahtui vasta saaton aikana.
 *
 * Kaappaukset kansioon tools/savukkeet/kaappaukset/siirtozoomi/:
 * ennakko-390.png (ennakkozoomin lopussa, nappula vielä paikallaan) ja
 * saatto-390.png / saatto-1400.png (saaton keskeltä).
 *
 * Aja: NODE_USE_ENV_PROXY=1 PORTTI=8826 \
 *      node tools/savukkeet/savuke-siirtozoomi.mjs
 *      (SAVUKE_RUUTU=390 tai 1400 rajaa yhteen ruutuun.)
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ASKELEN_VAHIN_OSUUS, siirtoajonKesto, autokyydinAskel } from '../../js/siirtokoreografia.js';
import {
  lahinLeveys, lahizoominSyvennys, PALLOLAUDAN_LAHIN_LEVEYS,
} from '../../js/pallolauta/kamera.js';

const JUURI = new URL('../..', import.meta.url).pathname;
// Julkaisusarjassa kaappauskansio tulee ajurilta (tools/savukkeet/
// aja-sarja.mjs asettaa KAAPPAUKSET), paikallisesti oma kansio.
const KAAPPAUKSET = process.env.KAAPPAUKSET
  || join(JUURI, 'tools/savukkeet/kaappaukset/siirtozoomi');
mkdirSync(KAAPPAUKSET, { recursive: true });

/** Nopan silmäluku: kolmen askeleen maasiirto Marseillesta. */
const SILMA = 3;
/** Saaton keston sallittu heitto (osuus). */
const KESTON_SIETO = 0.1;
/** Keskialue: ruudun keskimmäinen 60 % molemmissa suunnissa. */
const KESKIALUE = 0.6;
/**
 * Ennakkozoomin sallittu heitto tavoitekorkeudesta nappulan lähtiessä.
 *
 * Kamera-ajo päättyy tavoitteeseen tasan, mutta nappulan irtoaminen on
 * DOM-tapahtuma ja mittaus rAF-näyte: väliin mahtuu kehys tai pari,
 * eikä hengähdyksen (ENNAKON_HENGAHDYS_MS) aikana kuvan pidä liikkua
 * lainkaan. 5 % on siis reilusti enemmän kuin mittauksen kohina ja
 * selvästi vähemmän kuin yksikään oikea zoomiaskel.
 */
const ENNAKON_SIETO = 0.05;
/**
 * Askelvartion (2) pyöristysvara.
 *
 * `askelenSiirtoleveys` tähtää TÄSMÄLLEEN ASKELEEN_VAHIN_OSUUTEEN, eli
 * työpöytäruudulla mitattu askel osuu vartion rajalle desimaalin
 * tarkkuudella. Ilman varaa vartio kaatuisi siihen, että savuke lukee
 * ruudun koon kotelon laatikosta ja peli karttaruudun clientWidthistä —
 * ero on pikselin murto-osia, ei koreografiaa.
 */
const ASKELEN_SIETO = 0.99;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); return; }
  console.log(`FAIL  ${nimi} — ${lisa}`);
  console.log(`::warning::${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
  .catch(() => null);
const chromium = paketti?.chromium ?? paketti?.default?.chromium ?? null;
const lopeta = (koodi) => {
  console.log(`\n${lapi}/${kaikki} vartiota läpi`);
  process.exit(koodi);
};
if (!chromium) {
  console.log('OHITUS  playwright puuttuu — savuke ohitetaan');
  lopeta(0);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata');
  palvelin.close();
  lopeta(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const TALLENNE = JSON.stringify(peli.toJSON());

const konttiSelain = '/opt/pw-browsers/chromium';
const selainPolku = process.env.CHROMIUM
  ?? (existsSync(konttiSelain) ? konttiSelain : chromium.executablePath());
const selain = await chromium.launch({ executablePath: selainPolku });

/**
 * Yksi ruutukoko: siirto Marseillesta ja mittaukset sen ympäriltä.
 *
 * Ruutukoko on osa mittausta: tavoiteleveys lasketaan ruudun
 * LYHYEMMÄSTÄ sivusta, joten pysty- ja vaakaruutu eivät saa samaa
 * lukemaa — ja juuri se on tarkoitus.
 */
async function mittaa(ruutu) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
    isMobile: ruutu.w < 700,
    hasTouch: ruutu.w < 700,
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(e.message));
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
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(6000);

  const mitta = await sivu.evaluate(async ({ silma, keskialue }) => {
    const { ui, game: g } = window.matkakirja;
    const { findMoves, pixelOf } = await import('./js/rules.js');
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'marseille' };
    g.world.visited.add('marseille');
    g.phase = 'action';
    g.autoTravel = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1600));

    const kam = ui.kamera();
    const kotelo = ui.pallolauta?.kotelo ?? document.querySelector('#pallolauta') ?? document.body;
    const koteloLaatikko = kotelo.getBoundingClientRect();
    const tila = () => kam.kameranTila?.() ?? null;
    const ennen = tila();

    if (!g.actionTravel('land').ok) return { virhe: 'ei maareittiä Marseillesta' };
    g.die = silma;
    g.phase = 'move';
    g.moves = findMoves(g.board, g.player.pos, silma, { mode: 'land' });
    const parit = [...g.moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
    if (!parit.length) return { virhe: 'ei siirtoja' };
    const [avain, siirto] = parit[0];

    // Askelen pituus LAUDAN yksiköissä: reitin peräkkäisten pisteiden
    // väli (sama mitta kuin ui.aloitaSaattavaKamera käyttää).
    const pisteet = [g.player.pos, ...siirto.path].map((p) => pixelOf(g.board, p));
    const valit = [];
    for (let i = 1; i < pisteet.length; i += 1) {
      valit.push(Math.hypot(pisteet[i].x - pisteet[i - 1].x, pisteet[i].y - pisteet[i - 1].y));
    }
    const jarjestys = [...valit].sort((a, b) => a - b);
    const askelYks = jarjestys[Math.floor(jarjestys.length / 2)];

    // Kamera-ajot talteen: ennakkozoomi ensin, saatto toinen.
    const ajot = [];
    const alkuperainen = kam.ajaKamera.bind(kam);
    kam.ajaKamera = (kohde, valinnat) => {
      ajot.push({ t: performance.now(), kohde: { ...kohde }, kesto: valinnat?.kesto ?? null });
      return alkuperainen(kohde, valinnat);
    };

    const alkuhetki = performance.now();
    ui.doMove(avain);

    const naytteet = [];
    let kaynnissa = true;
    const kehys = () => {
      const t = tila();
      const nappula = document.querySelector('.pawn-moving');
      const laatikko = nappula?.getBoundingClientRect() ?? null;
      naytteet.push({
        t: performance.now() - alkuhetki,
        nappula: Boolean(nappula),
        leveys: t?.leveys ?? null,
        korkeus: t?.korkeus ?? null,
        px: laatikko && laatikko.width
          ? (laatikko.left + laatikko.width / 2 - koteloLaatikko.left) : null,
        py: laatikko && laatikko.height
          ? (laatikko.top + laatikko.height / 2 - koteloLaatikko.top) : null,
        vaihe: nappula?.dataset?.vaihe ?? null,
      });
      if (kaynnissa) requestAnimationFrame(kehys);
    };
    requestAnimationFrame(kehys);

    let nahtiin = false;
    for (;;) {
      const laudalla = Boolean(document.querySelector('.pawn-moving'));
      if (laudalla) nahtiin = true;
      if (nahtiin && !laudalla) break;
      if (performance.now() - alkuhetki > 25000) break;
      await new Promise((r) => setTimeout(r, 25));
    }
    kaynnissa = false;
    kam.ajaKamera = alkuperainen;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;

    // Saatto on se ajo, jolla on `saapuminen` (pelkkä keskipiste);
    // ennakkozoomi on sitä edeltävä ajo.
    const saatto = ajot.find((a) => a.kohde?.saapuminen) ?? ajot[1] ?? null;
    const ennakko = ajot.find((a) => a !== saatto) ?? null;
    const saatonAlku = saatto ? saatto.t - alkuhetki : null;
    // Ennakkozoomin jälkeinen leveys: viimeinen näyte ennen saaton alkua.
    const ennakonJalkeen = saatonAlku === null
      ? null
      : ([...naytteet].reverse().find((s) => s.t <= saatonAlku && s.leveys !== null) ?? null);
    const saatonNaytteet = naytteet.filter((s) => saatonAlku !== null
      && s.t >= saatonAlku && s.px !== null && s.vaihe && s.vaihe !== 'lepo');
    const leveydet = saatonNaytteet.map((s) => s.leveys).filter((v) => v > 0);
    const raja = (1 - keskialue) / 2;
    const ulkona = saatonNaytteet.filter((s) => s.px < koteloLaatikko.width * raja
      || s.px > koteloLaatikko.width * (1 - raja)
      || s.py < koteloLaatikko.height * raja
      || s.py > koteloLaatikko.height * (1 - raja));

    /*
     * VARTIO 7: onko ennakkozoomi VALMIS sillä kehyksellä, jolla nappula
     * irtoaa laudalta? Tavoitekorkeus lasketaan kameran omalla kaavalla
     * ennakkoajon pyytämästä leveydestä — sama muunnos, jonka
     * `kameranKohde` tekee, kattoineen ja lattioineen.
     */
    const kam2 = await import('./js/pallolauta/kamera.js');
    const kuvasuhde = koteloLaatikko.width / koteloLaatikko.height;
    const lattia = kam2.lahinKorkeus({
      laudanLeveys: kam2.PALLOLAUDAN_LEVEYS,
      kuvasuhde,
      syvennys: kam2.lahizoominSyvennys({
        leveysPx: koteloLaatikko.width, dpr: window.devicePixelRatio || 1,
      }),
    });
    const pyydettyLeveys = ennakko?.kohde?.leveys ?? null;
    const tavoiteKorkeus = pyydettyLeveys > 0
      ? kam2.korkeusLeveydesta(pyydettyLeveys, {
        laudanLeveys: kam2.PALLOLAUDAN_LEVEYS, kuvasuhde, min: lattia,
      })
      : null;
    const lahtoNayte = naytteet.find((s) => s.nappula && s.korkeus > 0) ?? null;

    return {
      pyydettyLeveys,
      tavoiteKorkeus,
      lahdonKorkeus: lahtoNayte?.korkeus ?? null,
      lahdonLeveys: lahtoNayte?.leveys ?? null,
      lahdonHetki: lahtoNayte ? Math.round(lahtoNayte.t) : null,
      askeleet: siirto.path.length,
      askelYks,
      ruutuPx: { w: koteloLaatikko.width, h: koteloLaatikko.height },
      leveysEnnen: ennen?.leveys ?? null,
      korkeusEnnen: ennen?.korkeus ?? null,
      leveysEnnakonJalkeen: ennakonJalkeen?.leveys ?? null,
      korkeusEnnakonJalkeen: ennakonJalkeen?.korkeus ?? null,
      leveysSaatossa: leveydet.length
        ? leveydet.slice().sort((a, b) => a - b)[Math.floor(leveydet.length / 2)] : null,
      ennakonKesto: ennakko?.kesto ?? null,
      saatonKesto: saatto?.kesto ?? null,
      naytteita: saatonNaytteet.length,
      ulkona: ulkona.length,
      ulkonaEsimerkki: ulkona.slice(0, 3).map((s) => ({
        t: Math.round(s.t), x: Math.round(s.px), y: Math.round(s.py),
      })),
      ajot: ajot.map((a) => ({
        t: Math.round(a.t - alkuhetki),
        kesto: a.kesto,
        kerroin: a.kohde?.kerroin ?? null,
        leveys: a.kohde?.leveys ?? null,
        bbox: a.kohde?.bbox ? { w: +a.kohde.bbox.w.toFixed(1), h: +a.kohde.bbox.h.toFixed(1) } : null,
        saapuminen: Boolean(a.kohde?.saapuminen),
      })),
    };
  }, { silma: SILMA, keskialue: KESKIALUE });

  return { ctx, sivu, mitta, virheet };
}

/**
 * Sama siirto uudestaan kuvaa varten. `jaadyta` pysäyttää koreografian
 * kuvan ajaksi TÄSMÄLLEEN ennakkozoomin loppuun (nappulaa ei ole vielä
 * poimittu laudalta) — muuten tuo hetki on vain hengähdyksen mittainen
 * eikä kaappaus osuisi siihen.
 */
async function aloitaSiirtoKuvaa(sivu, { jaadyta = 0 } = {}) {
  await sivu.evaluate(async ({ silma, jaadytys }) => {
    const { ui, game: g } = window.matkakirja;
    const { findMoves } = await import('./js/rules.js');
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'marseille' };
    g.phase = 'action';
    g.autoTravel = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1200));
    window.__ennakkoValmis = false;
    if (jaadytys > 0) {
      const alkuperainen = ui.ajaEnnakkozoomi.bind(ui);
      ui.ajaEnnakkozoomi = async (...args) => {
        const arvo = await alkuperainen(...args);
        ui.ajaEnnakkozoomi = alkuperainen;
        window.__ennakkoValmis = true;
        await new Promise((r) => setTimeout(r, jaadytys));
        return arvo;
      };
    }
    if (!g.actionTravel('land').ok) return;
    g.die = silma;
    g.phase = 'move';
    g.moves = findMoves(g.board, g.player.pos, silma, { mode: 'land' });
    const parit = [...g.moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
    if (!parit.length) return;
    void ui.doMove(parit[0][0]);
  }, { silma: SILMA, jaadytys: jaadyta });
}

/** Odottaa, että siirto on kokonaan ohi (seuraava kaappaus alkaa puhtaalta). */
async function odotaSiirronLoppu(sivu) {
  await sivu.waitForFunction(() => !window.matkakirja?.ui?.busy, null, { timeout: 30000 })
    .catch(() => {});
  await sivu.waitForTimeout(600);
}

/** Kaappaus ennakkozoomin lopusta: nappula on vielä paikallaan. */
async function kaappaaEnnakko(sivu, nimi) {
  await aloitaSiirtoKuvaa(sivu, { jaadyta: 4000 });
  await sivu.waitForFunction(() => window.__ennakkoValmis === true, null, { timeout: 25000 })
    .catch(() => {});
  await sivu.screenshot({ path: join(KAAPPAUKSET, `${nimi}.png`) });
  await odotaSiirronLoppu(sivu);
}

/** Kaappaus saaton keskeltä: sama siirto uudestaan, kuva puolivälissä. */
async function kaappaaSaatto(sivu, nimi) {
  await aloitaSiirtoKuvaa(sivu);
  // Ennakkozoomi (~760–1800 ms) + noin puolet saatosta.
  await sivu.waitForTimeout(2600);
  await sivu.screenshot({ path: join(KAAPPAUKSET, `${nimi}.png`) });
}

const RUUDUT = [
  { nimi: '390', w: 390, h: 844 },
  { nimi: '1400', w: 1400, h: 900 },
];
const VAIN = process.env.SAVUKE_RUUTU ?? '';
const nappulanKesto = SILMA * autokyydinAskel(SILMA);
const ODOTETTU_SAATTO = siirtoajonKesto(nappulanKesto);

for (const ruutu of RUUDUT.filter((r) => !VAIN || r.nimi === VAIN)) {
  const {
    ctx, sivu, mitta, virheet,
  } = await mittaa(ruutu);
  if (mitta.virhe) {
    vaadi(`${ruutu.nimi}: siirto lähti`, false, mitta.virhe);
    await ctx.close();
    continue;
  }
  const lyhyempi = Math.min(mitta.ruutuPx.w, mitta.ruutuPx.h);
  const skaala = mitta.ruutuPx.w / (mitta.leveysSaatossa || mitta.leveysEnnakonJalkeen || 1);
  const askelPx = mitta.askelYks * skaala;
  const tavoitePx = ASKELEN_VAHIN_OSUUS * lyhyempi;
  const syvin = lahinLeveys({
    lahin: PALLOLAUDAN_LAHIN_LEVEYS,
    syvennys: lahizoominSyvennys({ leveysPx: mitta.ruutuPx.w, dpr: 2 }),
  });

  tieto(`${ruutu.nimi} ruutu`, `${Math.round(mitta.ruutuPx.w)} × ${Math.round(mitta.ruutuPx.h)} px, askelia ${mitta.askeleet}, askel ${mitta.askelYks.toFixed(1)} lautayksikköä`);
  tieto(`${ruutu.nimi} näkyvä leveys`, `ennen ${mitta.leveysEnnen?.toFixed(1)} → ennakon jälkeen ${mitta.leveysEnnakonJalkeen?.toFixed(1)} → saatossa ${mitta.leveysSaatossa?.toFixed(1)} lautayksikköä (syvin sallittu ${syvin.toFixed(1)})`);
  tieto(`${ruutu.nimi} korkeus`, `ennen ${mitta.korkeusEnnen?.toFixed(4)} → ennakon jälkeen ${mitta.korkeusEnnakonJalkeen?.toFixed(4)}`);
  tieto(`${ruutu.nimi} kamera-ajot`, JSON.stringify(mitta.ajot));

  /*
   * 1. EI KAUEMMAS KUIN LÄHTÖNÄKYMÄ. Siirto vie lähemmäs silloin kun
   * askel sitä vaatii, mutta jos näkymä on jo askelta lähempänä, se
   * PYSYY — tavoite on vähimmäismitta askeleelle eikä kiinteä
   * mittakaava (ui.js ennakoiSiirtoZoomi, "ei koskaan ulos pelaajan
   * omasta lähikuvasta"). Vartio mittaa siis molemmat suunnat.
   */
  vaadi(`1 ${ruutu.nimi}: siirto ei vie kauemmas (${mitta.leveysEnnen?.toFixed(1)} → ${mitta.leveysSaatossa?.toFixed(1)} yks)`,
    mitta.leveysSaatossa > 0 && mitta.leveysSaatossa <= mitta.leveysEnnen * 1.02,
    JSON.stringify({ ennen: mitta.leveysEnnen, saatossa: mitta.leveysSaatossa }));
  vaadi(`2 ${ruutu.nimi}: askel ruudulla ≥ 25 % lyhyemmästä sivusta (${askelPx.toFixed(0)} px ≥ ${tavoitePx.toFixed(0)} px)`,
    askelPx >= tavoitePx * ASKELEN_SIETO,
    JSON.stringify({ askelYks: mitta.askelYks, leveysSaatossa: mitta.leveysSaatossa, lyhyempi }));
  vaadi(`3 ${ruutu.nimi}: katto pitää — ei syvimmän zoomin alle (${mitta.leveysSaatossa?.toFixed(1)} ≥ ${syvin.toFixed(1)} yks)`,
    mitta.leveysSaatossa >= syvin - 0.5,
    JSON.stringify({ saatossa: mitta.leveysSaatossa, syvin }));
  vaadi(`4 ${ruutu.nimi}: nappula keskimmäisellä 60 %:lla koko saaton ajan (${mitta.naytteita - mitta.ulkona}/${mitta.naytteita})`,
    mitta.naytteita >= 10 && mitta.ulkona === 0,
    JSON.stringify({ naytteita: mitta.naytteita, ulkona: mitta.ulkona, esimerkki: mitta.ulkonaEsimerkki }));
  vaadi(`5 ${ruutu.nimi}: saaton kesto ±10 % ennallaan (${mitta.saatonKesto} vs. ${ODOTETTU_SAATTO} ms)`,
    mitta.saatonKesto > 0
    && Math.abs(mitta.saatonKesto - ODOTETTU_SAATTO) <= KESTON_SIETO * ODOTETTU_SAATTO,
    JSON.stringify({ mitattu: mitta.saatonKesto, odotettu: ODOTETTU_SAATTO }));
  vaadi(`6 ${ruutu.nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  /*
   * 7. ENNAKKOZOOMI VALMIS ENNEN NAPPULAN LÄHTÖÄ. Mitta on kameran
   * KORKEUS sillä kehyksellä, jolla liikkuva nappula ilmestyy laudalle
   * — se on koreografian sääntö *"kartta ensin, sitten pelaaja"*
   * yhtenä lukuna. Ennen korjausta ennakon ajo keskeytyi ohjelmallisesti
   * ensimmäisellä millisekunnilla, ja tämä luku oli lähtönäkymän eikä
   * tavoitteen korkeus.
   */
  const ennakonHeitto = mitta.tavoiteKorkeus > 0 && mitta.lahdonKorkeus > 0
    ? Math.abs(mitta.lahdonKorkeus / mitta.tavoiteKorkeus - 1) : null;
  tieto(`${ruutu.nimi} ennakko nappulan lähtiessä`, `korkeus ${mitta.lahdonKorkeus?.toFixed(4)} vs. tavoite ${mitta.tavoiteKorkeus?.toFixed(4)} (${ennakonHeitto === null ? '—' : `${(ennakonHeitto * 100).toFixed(1)} %`}), t = ${mitta.lahdonHetki} ms`);
  vaadi(`7 ${ruutu.nimi}: ennakkozoomi valmis ennen nappulan lähtöä (±5 %)`,
    ennakonHeitto !== null && ennakonHeitto <= ENNAKON_SIETO,
    JSON.stringify({
      lahdonKorkeus: mitta.lahdonKorkeus,
      tavoiteKorkeus: mitta.tavoiteKorkeus,
      pyydettyLeveys: mitta.pyydettyLeveys,
      lahdonHetki: mitta.lahdonHetki,
    }));

  // Ennakkozoomin loppu (nappula vielä paikallaan) vain puhelinruudulla:
  // sama kuva kahdesta ruutukoosta ei kerro mitään lisää.
  if (ruutu.nimi === '390') {
    await kaappaaEnnakko(sivu, 'ennakko-390');
    tieto(`${ruutu.nimi} kaappaus (ennakko)`, join(KAAPPAUKSET, 'ennakko-390.png'));
  }
  await kaappaaSaatto(sivu, `saatto-${ruutu.nimi}`);
  tieto(`${ruutu.nimi} kaappaus`, join(KAAPPAUKSET, `saatto-${ruutu.nimi}.png`));
  await ctx.close();
}

await selain.close();
palvelin.close();
lopeta(lapi === kaikki ? 0 : 1);
