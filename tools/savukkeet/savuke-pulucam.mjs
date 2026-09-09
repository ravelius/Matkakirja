/*
 * Savuke: PULU-CAM — PULUN KUVAT PAKKANA ISOISÄN KUVAN PÄÄLLE.
 *
 * Omistaja 9.9.2026 klo 15.20–15.30 (Raamattu, PULU-CAM: PULUN
 * NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE, YHTEINEN KARUSELLI).
 *
 * VARTIOT:
 *   1. EI PAKKAA ENNEN KOMMENTTIA: luennan aikana kartalla on vain
 *      isoisän luentakuva.
 *   2. KOMMENTIN JÄLKEEN PAKKA: kolme kuvaa pulpahtaa yksitellen,
 *      kukin omaan kulmaansa ja paikkaansa isoisän kuvan päälle.
 *   3. LIMITYS NÄKYY: kortit ovat oikeasti eri kohdissa ruudulla, ja
 *      jokaisessa on PULU-CAM-merkki erillisenä tekstinä.
 *   4. KARUSELLI: napautus avaa suurennoksen, jossa isoisän kuva on
 *      ENSIN (laskuri 1 / 4) ja pulun kuvissa merkki näkyy.
 *   5. RAAHAUS SIIRTÄÄ KOKO PAKKAA: kortit liikkuvat täsmälleen yhtä
 *      paljon kuin paneeli.
 *   6. PUHELIN: sama pakka omalla ajolla 430 × 930 -ruudulla.
 *
 * KOEKUVAT OVAT REPON OMIA (assets/kartat/ihmeet/*.webp): selaimessa
 * ei ole ulkoverkkoa, eikä tuotantodatassa ole vielä yhtään pulun
 * kuvaa — kuvatoimitus tuo viiden kuvan kokeiluerän myöhemmin.
 *
 * Aja:  node tools/savukkeet/savuke-pulucam.mjs [kuvakansio] [lauta]
 *       lauta = pallo (oletus) | kartta
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
const LAUTA = process.argv[3] === 'kartta' ? 'kartta' : 'pallo';
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'lontoo';
const TYOPOYTA = { width: 1280, height: 860 };
const PUHELIN = { width: 430, height: 930 };

/** Koekuvat: pohjakuva (isoisä) ja kolme pulun kuvaa. */
const KOEKUVAT = {
  luentakuva: {
    osoite: '/assets/kartat/ihmeet/ihme-crystal-palace.webp',
    lyhyt: 'Koekuva: Crystal Palace, Lontoo 1873.',
    selite: 'Koekuva isoisän matkakirjasta: Crystal Palace höyryn keskellä.',
    lahde: 'Matkakirjan havainnekuva',
  },
  kuvat: [
    {
      osoite: '/assets/kartat/ihmeet/ihme-colosseum.webp',
      lyhyt: 'Pulu katolla.',
      selite: 'PULU-CAM: pulu katolla, kaupunki auringossa.',
      lahde: 'Pulun kamera',
    },
    {
      osoite: '/assets/kartat/ihmeet/ihme-faros.webp',
      lyhyt: 'Pulu majakalla.',
      selite: 'PULU-CAM: pulu majakan kaiteella, ihastus alhaalla laiturilla.',
      lahde: 'Pulun kamera',
    },
    {
      osoite: '/assets/kartat/ihmeet/ihme-delfoi.webp',
      lyhyt: 'Pulu portailla.',
      selite: 'PULU-CAM: pulu portailla, ihastus jo toisaalla.',
      lahde: 'Pulun kamera',
    },
  ],
};

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
const osoite = `http://localhost:${palvelin.address().port}/?lauta=${LAUTA}`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
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
if (LAUTA === 'pallo' && kirjasto?.status !== 200) {
  console.log('HUOM  ämpäri ei vastaa — pallo ei lataudu');
}

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/**
 * Yksi ajo: uusi konteksti, saapuminen Lontooseen koekuvineen ja
 * odotus siihen asti, että pakka on noussut.
 */
async function avaaAjo(viewport) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);

  const sivu = await ctx.newPage();
  const cdp = await ctx.newCDPSession(sivu);
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  if (LAUTA === 'pallo') {
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
      { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  }
  await sivu.waitForTimeout(6000);

  /*
   * KOEKUVAT PAKKIIN AJON AJAKSI. Moduulien välimuisti on sivukohtainen,
   * joten sama olio näkyy pelille — tuotantodataa tämä ei koske.
   */
  await sivu.evaluate(async ([id, koe]) => {
    const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
    FOKUSVIRRAT[id].matkakirja.luentakuva = koe.luentakuva;
    FOKUSVIRRAT[id].pollo.kuvat = koe.kuvat;
  }, [KAUPUNKI, KOEKUVAT]);

  /* Saapuminen kaupunkiin pelin omalla tilalla (kuten renderFactissa). */
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
    const kaupunki = game.cityOf();
    ui.kamera?.()?.ajaKamera?.({ x: kaupunki.x, y: kaupunki.y, leveys: 900, saapuminen: true },
      { kesto: 900, sovita: true });
  }, KAUPUNKI);
  await sivu.waitForTimeout(2500);

  const kaappaa = async (nimi) => {
    if (!KUVAKANSIO) return;
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(KUVAKANSIO, nimi), Buffer.from(data, 'base64'));
  };

  /** Pakan ja paneelin tila yhdellä lukemalla. */
  const lue = () => sivu.evaluate(() => {
    const kortit = [...document.querySelectorAll('.pulucam-kuva')];
    const laatikko = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      };
    };
    const paneeli = document.querySelector('.fokusvirta-luentakuva');
    return {
      luentakuva: Boolean(paneeli),
      paneeli: paneeli ? laatikko(paneeli) : null,
      pieni: Boolean(paneeli?.classList.contains('pieni')),
      kortteja: kortit.length,
      laatikot: kortit.map(laatikko),
      merkit: kortit.map((k) => k.querySelector('.pulucam-teksti')?.textContent ?? null),
      pino: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
        .map((k) => k.textContent ?? '').join(' ').trim(),
    };
  });

  return {
    ctx, sivu, kaappaa, lue,
  };
}

/**
 * Odota, että kommentti on tullut ja pakka noussut kokonaan.
 *
 * KAMERA AJETAAN LOPUKSI TAKAISIN KAUPUNGIN PÄÄLLE. Odotus kestää
 * kymmeniä sekunteja (luenta + kuplajono), ja pallolauta ehtii sinä
 * aikana ajautua omaan asentoonsa; ilman paluuajoa pakka olisi
 * kaappauksessa ruudun laidan takana. Ankkuri on kartan kohta, joten
 * kamera-ajo tuo sen mukanaan — juuri se on koko ankkuroinnin idea.
 */
async function odotaPakka(sivu, lue) {
  await sivu.evaluate(() => { window.matkakirja.ui.diaryVoice?.pause(); });
  let tila = await lue();
  for (let i = 0; i < 250 && tila.kortteja < 3; i += 1) {
    await sivu.waitForTimeout(200);
    tila = await lue();
  }
  await sivu.evaluate(() => {
    const { ui, game } = window.matkakirja;
    const kaupunki = game.cityOf();
    ui.kamera?.()?.ajaKamera?.({ x: kaupunki.x, y: kaupunki.y, leveys: 900, saapuminen: true },
      { kesto: 900, sovita: true });
  });
  await sivu.waitForTimeout(2000);
  return lue();
}

/**
 * PAKKA RUUDUN KESKELLE PELAAJAN OMALLA ELEELLÄ ennen kaappausta.
 *
 * Ankkuri on KARTAN KOHTA, ja tämä savuke pakottaa saapumisen kesken
 * kamera-ajoa (peli itse ajaa kameran ennen luentaa), joten paneeli jää
 * ruudun laitaan eikä kaappauksesta näkisi pakan ulkoasua. Raahaus on
 * juuri se, mitä pelaajakin tekisi — ja samalla se on kaappauksessa
 * toinen todiste siitä, että pakka siirtyy yhtenä kappaleena.
 */
async function keskitaPakka(sivu, lue, osuusY = 0.5) {
  const tila = await lue();
  if (!tila.paneeli) return tila;
  const kohti = await sivu.evaluate((oy) => {
    const pane = window.matkakirja.ui.mapPane.getBoundingClientRect();
    return { x: pane.left + pane.width * 0.5, y: pane.top + pane.height * oy };
  }, osuusY);
  const alku = {
    x: Math.round(tila.paneeli.x + tila.paneeli.w / 2),
    y: Math.round(tila.paneeli.y + tila.paneeli.h / 2),
  };
  await sivu.mouse.move(alku.x, alku.y);
  await sivu.mouse.down();
  await sivu.mouse.move(Math.round(kohti.x), Math.round(kohti.y), { steps: 10 });
  await sivu.mouse.up();
  await sivu.waitForTimeout(700);
  return lue();
}

/* ================== TYÖPÖYTÄAJO ================== */

const tyopoyta = await avaaAjo(TYOPOYTA);

/* 1. Ei pakkaa ennen kommenttia. */
let tila = await tyopoyta.lue();
tieto('luennan hetki', JSON.stringify({ luentakuva: tila.luentakuva, kortteja: tila.kortteja }));
vaadi('isoisän luentakuva on kartalla', tila.luentakuva === true, JSON.stringify(tila));
vaadi('pakka ei nouse ennen kommenttia', tila.kortteja === 0, String(tila.kortteja));
tieto('luentakuvan paikka luennan aikana', JSON.stringify(tila.paneeli));
await tyopoyta.kaappaa('pulucam-luenta.png');

/* 2. Kommentin jälkeen pakka. */
tila = await odotaPakka(tyopoyta.sivu, tyopoyta.lue);
tila = await keskitaPakka(tyopoyta.sivu, tyopoyta.lue, 0.46);
tieto('kuplapino', tila.pino.slice(-140) || '(tyhjä)');
tieto('korttien laatikot', JSON.stringify(tila.laatikot));
vaadi('pulun kommentti tuli ruudulle', tila.pino.length > 0, '(pino jäi tyhjäksi)');
vaadi('kolme kuvaa pulpahti pakkaan', tila.kortteja === 3, String(tila.kortteja));
vaadi('jokaisessa kuvassa on PULU-CAM-merkki',
  tila.merkit.length === 3 && tila.merkit.every((m) => m === 'PULU-CAM'),
  JSON.stringify(tila.merkit));

/* 3. Limitys: kortit ovat oikeasti eri kohdissa. */
if (tila.laatikot.length === 3) {
  const paikat = new Set(tila.laatikot.map((l) => `${l.x},${l.y}`));
  vaadi('kortit ovat eri kohdissa (limitys näkyy)', paikat.size === 3,
    JSON.stringify(tila.laatikot));
  const siirto = Math.max(...tila.laatikot.map((l) => Math.abs(l.x - tila.laatikot[0].x)));
  tieto('suurin vaakasiirtymä', `${siirto} px (kortin leveys ${tila.laatikot[0].w} px)`);
}
await tyopoyta.kaappaa('pulucam-pakka.png');

/* 4. Karuselli: päällimmäinen kortti auki, isoisä ensin. */
/*
 * KAKSI NAPAUTUSTA, KOSKA EDELLINEN ELE OLI RAAHAUS. Selain lähettää
 * klikin myös raahauksen päätteeksi, ja pakka nielaisee sen
 * tarkoituksella (js/pulucam.js `raahattu`) — juuri niin kuin
 * luentakuvakin tekee. Ensimmäinen napautus siis kuluttaa lipun ja
 * toinen avaa karusellin; ilman edeltävää raahausta yksi riittää.
 */
const napautaPaallimmaista = () => tyopoyta.sivu.evaluate(() => {
  const kortit = [...document.querySelectorAll('.pulucam-kuva')];
  kortit[kortit.length - 1]?.click();
});
await napautaPaallimmaista();
await tyopoyta.sivu.waitForTimeout(400);
if (!(await tyopoyta.sivu.$('.fokuszoom'))) await napautaPaallimmaista();
await tyopoyta.sivu.waitForTimeout(1200);
const zoom = await tyopoyta.sivu.evaluate(() => ({
  auki: Boolean(document.querySelector('.fokuszoom')),
  laskuri: document.querySelector('.fokuszoom-laskuri')?.textContent ?? null,
  selite: document.querySelector('.fokuszoom-selite')?.textContent ?? null,
  lahde: document.querySelector('.fokuszoom-lahde')?.textContent ?? null,
  nuolia: document.querySelectorAll('.fokuszoom-nuoli').length,
  merkkiPiilossa: document.querySelector('.pulucam-suuri')?.hidden ?? null,
}));
tieto('karuselli', JSON.stringify(zoom));
vaadi('karuselli aukesi', zoom.auki === true, JSON.stringify(zoom));
vaadi('isoisän kuva on ensin', zoom.laskuri === '1 / 4', String(zoom.laskuri));
vaadi('nuolinapit ovat molempiin suuntiin', zoom.nuolia === 2, String(zoom.nuolia));
vaadi('isoisän kuvassa ei ole PULU-CAM-merkkiä', zoom.merkkiPiilossa === true,
  String(zoom.merkkiPiilossa));
vaadi('lähderivi on mukana', Boolean(zoom.lahde), String(zoom.lahde));
await tyopoyta.kaappaa('pulucam-karuselli-isoisa.png');

/* Nuolella eteenpäin: ensimmäinen pulun kuva merkkeineen. */
await tyopoyta.sivu.click('.fokuszoom-nuoli.oikea');
await tyopoyta.sivu.waitForTimeout(700);
const pulunKuva = await tyopoyta.sivu.evaluate(() => ({
  laskuri: document.querySelector('.fokuszoom-laskuri')?.textContent ?? null,
  selite: document.querySelector('.fokuszoom-selite')?.textContent ?? null,
  merkkiPiilossa: document.querySelector('.pulucam-suuri')?.hidden ?? null,
  merkinTeksti: document.querySelector('.pulucam-suuri .pulucam-teksti')?.textContent ?? null,
}));
tieto('karusellin toinen kuva', JSON.stringify(pulunKuva));
vaadi('toinen kuva on pulun kuva', pulunKuva.laskuri === '2 / 4', String(pulunKuva.laskuri));
vaadi('pulun kuvassa on PULU-CAM-merkki',
  pulunKuva.merkkiPiilossa === false && pulunKuva.merkinTeksti === 'PULU-CAM',
  JSON.stringify(pulunKuva));
await tyopoyta.kaappaa('pulucam-karuselli.png');

/* Sulkeminen palauttaa kartan pakkaan. */
await tyopoyta.sivu.keyboard.press('Escape');
await tyopoyta.sivu.waitForTimeout(900);
const suljettu = await tyopoyta.lue();
vaadi('sulkeminen palauttaa pakan kartalle',
  suljettu.kortteja === 3 && !(await tyopoyta.sivu.$('.fokuszoom')),
  String(suljettu.kortteja));

/*
 * 5. RAAHAUS SIIRTÄÄ KOKO PAKKAA. Mitta on korttien siirtymä SUHTEESSA
 * PANEELIIN: pallolauta elää omaa elämäänsä (vaimeneva kamera-ajo),
 * joten absoluuttinen pikselimatka ei ole vakaa mitta. Se, mitä tämä
 * vartio oikeasti valvoo, on että pakka ei jää paikalleen paneelin
 * liikkuessa — eli että kortit ja paneeli siirtyvät yhtä paljon.
 */
const ennen = await tyopoyta.lue();
const keskus = {
  x: Math.round(ennen.paneeli.x + ennen.paneeli.w / 2),
  y: Math.round(ennen.paneeli.y + ennen.paneeli.h / 2),
};
const osuma = await tyopoyta.sivu.evaluate((p) => {
  const el = document.elementFromPoint(p.x, p.y);
  return { luokka: el?.className ?? null, paneelissa: Boolean(el?.closest?.('.fokusvirta-luentakuva')) };
}, keskus);
tieto('raahauksen aloituskohta', JSON.stringify({ keskus, pieni: ennen.pieni, ...osuma }));
vaadi('raahaus alkaa paneelin päältä', osuma.paneelissa === true, JSON.stringify(osuma));
await tyopoyta.sivu.mouse.move(keskus.x, keskus.y);
await tyopoyta.sivu.mouse.down();
await tyopoyta.sivu.mouse.move(keskus.x - 90, keskus.y - 60, { steps: 8 });
await tyopoyta.sivu.mouse.up();
await tyopoyta.sivu.waitForTimeout(700);
const jalkeen = await tyopoyta.lue();
if (ennen.laatikot.length === 3 && jalkeen.laatikot.length === 3) {
  const paneelinSiirto = {
    dx: jalkeen.paneeli.x - ennen.paneeli.x, dy: jalkeen.paneeli.y - ennen.paneeli.y,
  };
  const siirrot = jalkeen.laatikot.map((l, i) => ({
    dx: l.x - ennen.laatikot[i].x, dy: l.y - ennen.laatikot[i].y,
  }));
  tieto('paneelin siirtymä', JSON.stringify(paneelinSiirto));
  tieto('korttien siirtymät', JSON.stringify(siirrot));
  vaadi('paneeli oikeasti liikkui raahauksesta',
    Math.hypot(paneelinSiirto.dx, paneelinSiirto.dy) > 20, JSON.stringify(paneelinSiirto));
  vaadi('koko pakka siirtyi paneelin mukana',
    siirrot.every((s) => Math.abs(s.dx - paneelinSiirto.dx) <= 3
      && Math.abs(s.dy - paneelinSiirto.dy) <= 3),
    JSON.stringify({ paneelinSiirto, siirrot }));
}
await tyopoyta.kaappaa('pulucam-raahaus.png');
await tyopoyta.ctx.close();

/* ================== PUHELINAJO (430 × 930) ================== */

const puhelin = await avaaAjo(PUHELIN);
let puhelimessa = await odotaPakka(puhelin.sivu, puhelin.lue);
tieto('puhelin', JSON.stringify({
  kortteja: puhelimessa.kortteja, paneeli: puhelimessa.paneeli, laatikot: puhelimessa.laatikot,
}));
vaadi('pakka on kartalla myös puhelimella', puhelimessa.kortteja === 3,
  String(puhelimessa.kortteja));

puhelimessa = await keskitaPakka(puhelin.sivu, puhelin.lue, 0.52);
tieto('puhelin raahauksen jälkeen', JSON.stringify({
  paneeli: puhelimessa.paneeli, laatikot: puhelimessa.laatikot,
}));
if (puhelimessa.laatikot.length === 3) {
  vaadi('kortit mahtuvat puhelimen ruudulle',
    puhelimessa.laatikot.every((l) => l.x > -40 && l.x + l.w < PUHELIN.width + 40),
    JSON.stringify(puhelimessa.laatikot));
}
await puhelin.kaappaa('pulucam-puhelin.png');
await puhelin.ctx.close();

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi (lauta: ${LAUTA}).`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
