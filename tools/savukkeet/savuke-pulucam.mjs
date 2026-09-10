/*
 * Savuke: PULU-CAM — PULUN KUVAT PAKKANA ISOISÄN KUVAN PÄÄLLE.
 *
 * Omistaja 9.9.2026 klo 15.20–15.30 (Raamattu, PULU-CAM: PULUN
 * NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE, YHTEINEN KARUSELLI).
 *
 * TARKENNUS 9.9.2026 klo 18.50 (Raamattu, PULU-CAM: RAKKAUSKOHTAUS
 * 3-5 KUVAA, KAKSI KUVATEKSTIA MOLEMMILLE, HAVAINNEKUVA-LINKKI PITKAN
 * LOPUSSA, TARRA YHTENA PNG:NA OMISTAJAN VALINNASTA).
 *
 * VARTIOT:
 *   1. EI PAKKAA ENNEN KOMMENTTIA: luennan aikana kartalla on vain
 *      isoisän luentakuva.
 *   2. KOMMENTIN JÄLKEEN PAKKA: VIISI kuvaa pulpahtaa yksitellen,
 *      kukin omaan kulmaansa ja paikkaansa isoisän kuvan päälle
 *      (rakkauskohtauksen katto).
 *   3. LIMITYS NÄKYY: kortit ovat oikeasti eri kohdissa ruudulla, ja
 *      kuvat ovat PUHTAITA — ennen omistajan tarravalintaa niissä ei
 *      ole merkkiä eikä HTML-tekstiä.
 *   4. KARUSELLI: napautus avaa suurennoksen, jossa isoisän kuva on
 *      ENSIN (laskuri 1 / 6) ja pitkä kuvateksti vaihtuu kuvan mukana.
 *   5. HAVAINNEKUVA-LINKKI on isoisän pitkän kuvatekstin perässä ja
 *      avaa selitteen; kartan lyhyessä tekstissä sitä ei ole.
 *   6. LYHYT KUVATEKSTI KERTOO PÄÄLLIMMÄISESTÄ KUVASTA — ja se on
 *      KIINNI JUURI SEN KORTIN ALALAIDASSA, kortin omassa kierretyssä
 *      lohkossa (omistaja 10.9.2026 klo 23.37). Vain yksi lappu
 *      kerrallaan; nosto siirtää sen uuden päällimmäisen alle.
 *   7. RAAHAUS SIIRTÄÄ KOKO PAKKAA: kortit liikkuvat täsmälleen yhtä
 *      paljon kuin paneeli.
 *   8. PUHELIN: sama pakka omalla ajolla 430 × 930 -ruudulla.
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
/*
 * ISO RUUTU ON IPAD PYSTYSSÄ (1024 x 1366). Omistajan kaappaukset
 * 10.9.2026 (Krakova ja Vilna) ovat iPadilta, ja juuri niistä lappu
 * puuttui pulun kortin alta — savukkeen on katsottava samaa ruutua.
 */
const TYOPOYTA = { width: 1024, height: 1366 };
const PUHELIN = { width: 390, height: 844 };

/**
 * Koekuvat: pohjakuva (isoisä) ja VIISI pulun kuvaa.
 *
 * Viisi siksi, että rakkauskohtauksen katto on viisi (omistaja
 * 9.9.2026 klo 18.50) — pakka on siis kaappauksessa täydessä
 * mitassaan, isoisän kuvan kanssa kuusi kuvaa.
 *
 * NELJÄNNEN LÄHDE ON HAVAINNEKUVA tarkoituksella: omistajan sääntö on,
 * että pulun kuva saa Havainnekuva-linkin vain jos lähde sen sanoo,
 * ja savukkeen pitää nähdä sekä linkillinen että linkitön pulun kuva.
 */
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
    {
      osoite: '/assets/kartat/ihmeet/ihme-karnak.webp',
      lyhyt: 'Pulu pylväiköllä.',
      selite: 'PULU-CAM: pulu pylväiköllä, ihastus varjossa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    {
      osoite: '/assets/kartat/ihmeet/ihme-knossos.webp',
      lyhyt: 'Pulu portilla.',
      selite: 'PULU-CAM: pulu portilla, ihastus katoaa kujalle.',
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
    // Kortin KUVA (nappi) ruudulla — laatikot ja limitys luetaan siitä.
    const kortit = [...document.querySelectorAll('.pulucam-kuva')];
    /*
     * KERROS ON KÄÄREESSÄ, EI NAPISSA (omistaja 10.9.2026 klo 23.37):
     * kortti on kääre, jossa ovat kuva ja sen oma lappu. Jos kerros
     * luettaisiin napista, se olisi aina 0 ja koko nostovartio
     * vertailisi nollia keskenään.
     */
    const kaareet = [...document.querySelectorAll('.pulucam-kortti')];
    const laatikko = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      };
    };
    const paneeli = document.querySelector('.fokusvirta-luentakuva');
    const pohjakortti = document.querySelector('.fokusvirta-luentakuva .fokusvirta-kuva');
    /*
     * LAPPU ON PÄÄLLIMMÄISEN KORTIN OMA (omistaja 10.9.2026 klo 23.37,
     * Raamattu "PULUN KORTIN KUVATEKSTI KIINNI KORTIN OMASSA
     * ALALAIDASSA"). Näkyviä lappuja saa olla täsmälleen yksi: joko
     * päällimmäisen pulun kortin oma tai — isoisän kuvan ollessa
     * päällimmäisenä — paneelin oma kappale.
     */
    const nakyy = (el) => Boolean(el) && el.offsetParent !== null
      && getComputedStyle(el).visibility !== 'hidden'
      && String(el.textContent).trim() !== '';
    const paallaKortti = document.querySelector('.pulucam-kortti.pulucam-paalla');
    const paallaNappi = paallaKortti?.querySelector('.pulucam-kuva') ?? null;
    const paallaLappu = paallaKortti?.querySelector('.pulucam-lappu') ?? null;
    const pohjaLappu = paneeli?.querySelector(':scope > .fokusvirta-luentateksti') ?? null;
    const laput = [...document.querySelectorAll('.pulucam-lappu'), pohjaLappu].filter(nakyy);
    const kerros = (el) => Number(el?.style?.getPropertyValue('--pulucam-kerros') || 0);
    const laatta = document.querySelector('.map-pane [data-kaupunki="lontoo"].city, '
      + '.map-pane [data-kaupunki="lontoo"].city-start');
    const kortti = document.querySelector('.fact-card');
    return {
      luentakuva: Boolean(paneeli),
      paneeli: paneeli ? laatikko(paneeli) : null,
      pieni: Boolean(paneeli?.classList.contains('pieni')),
      kortteja: kortit.length,
      laatikot: kortit.map(laatikko),
      // Pakan järjestys: kerros 1 on alin, suurin on päällimmäinen.
      kerrokset: kaareet.map(kerros),
      pohjanKerros: kerros(pohjakortti),
      // Matkakirjakortti: pakan selaus ei saa kutistaa sitä lapuksi.
      matkakirjaPieni: kortti ? kortti.classList.contains('pieni') : null,
      // Kaupungin laatta kartalla (vain tasokartalla on svg-laatta).
      laatta: laatta ? laatikko(laatta) : null,
      // Karusellin kuva: sen on oltava se, joka oli pakan päällä.
      zoomKuva: document.querySelector('.fokuszoom-kuva')?.getAttribute('src') ?? null,
      zoomLaskuri: document.querySelector('.fokuszoom-laskuri')?.textContent ?? null,
      zoomAuki: Boolean(document.querySelector('.fokuszoom')),
      // Ennen omistajan tarravalintaa kuvissa EI saa olla merkkiä.
      merkkeja: document.querySelectorAll('.pulucam-merkki').length,
      // Kartan lyhyt kuvateksti: sen pitää kertoa päällimmäisestä kuvasta
      // ja tulla PÄÄLLIMMÄISEN KORTIN OMASTA lapusta.
      lyhyt: (nakyy(paallaLappu) ? paallaLappu : (nakyy(pohjaLappu) ? pohjaLappu : null))
        ?.textContent?.trim() ?? null,
      // Isoisän oma kappale (näkyy vain isoisän kuvan ollessa päällä).
      lyhytPohjasta: !nakyy(paallaLappu) && nakyy(pohjaLappu),
      lappuja: laput.length,
      // Lappu on kortin OMASSA lohkossa: sama kääre, sama kierto.
      lappuKortissa: Boolean(paallaLappu) && paallaLappu.closest('.pulucam-kortti') === paallaKortti
        && paallaLappu.offsetParent === paallaKortti,
      /*
       * KIINNI KORTIN ALALAIDASSA: lapun yläreuna on kortin omassa
       * koordinaatistossa täsmälleen napin alareuna (0 px väliä). Mitta
       * on kääreen sisällä, joten kierto ei sotke sitä — ja juuri se on
       * koko vaatimus: lappu kääntyy kortin mukana.
       */
      lapunVali: paallaLappu && paallaNappi
        ? Math.round(paallaLappu.offsetTop - (paallaNappi.offsetTop + paallaNappi.offsetHeight))
        : null,
      lapunLeveysero: paallaLappu && paallaNappi
        ? Math.round(paallaLappu.offsetWidth - paallaNappi.offsetWidth) : null,
      lyhyenLinkkeja: document.querySelectorAll(
        '.fokusvirta-luentakuva .havainnekuva-selite, .fokusvirta-luentakuva .havainnekuva-linkki',
      ).length,
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
  for (let i = 0; i < 250 && tila.kortteja < KOEKUVAT.kuvat.length; i += 1) {
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

/**
 * NAPAUTUS KORTIN NÄKYVÄÄN REUNAAN — juuri se ele, jonka pelaaja tekee
 * (omistaja 10.9.2026: *"jos klikkaa alempana näkyvää kuvaa"*).
 *
 * Kohta haetaan selaimen omalla osumatestillä: kortin alalta etsitään
 * piste, jossa `elementFromPoint` osuu OIKEASTI tähän korttiin eikä sen
 * päällä olevaan. Ohjelmallinen `click()` menisi läpi vaikka kortti
 * olisi kokonaan piilossa, eikä se todistaisi mitään.
 */
async function nakyvaKohta(sivu, valitsin, i = 0) {
  return sivu.evaluate(([v, n]) => {
    const el = [...document.querySelectorAll(v)][n];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    for (let ay = 0.03; ay <= 0.98; ay += 0.02) {
      for (let ax = 0.03; ax <= 0.98; ax += 0.02) {
        const x = Math.round(r.left + r.width * ax);
        const y = Math.round(r.top + r.height * ay);
        const osuma = document.elementFromPoint(x, y);
        if (osuma && (osuma === el || el.contains(osuma))) return { x, y };
      }
    }
    return null;
  }, [valitsin, i]);
}

/**
 * Napautus kortin näkyvään reunaan; `pakota` sallii ohjelmallisen
 * napautuksen, jos kortti on kokonaan muiden alla (viiden kuvan
 * pakassa keskimmäiset kortit voivat peittyä täysin).
 */
async function napautaNakyvaa(sivu, valitsin, i = 0, { pakota = false } = {}) {
  const kohta = await nakyvaKohta(sivu, valitsin, i);
  if (kohta) {
    await sivu.mouse.click(kohta.x, kohta.y);
    await sivu.waitForTimeout(500);
    return { ...kohta, ele: 'hiiri' };
  }
  if (!pakota) return null;
  await sivu.evaluate(([v, n]) => {
    [...document.querySelectorAll(v)][n]?.click();
  }, [valitsin, i]);
  await sivu.waitForTimeout(500);
  return { ele: 'ohjelmallinen' };
}

/** Pakan alin kortti, jolla on ruudulla näkyvä reuna (tai null). */
async function alinNakyvaKortti(sivu, kerrokset) {
  const jarjestys = kerrokset.map((k, i) => ({ k, i })).sort((a, b) => a.k - b.k);
  for (const { i } of jarjestys.slice(0, -1)) {
    // eslint-disable-next-line no-await-in-loop
    const kohta = await nakyvaKohta(sivu, '.pulucam-kuva', i);
    if (kohta) return { i, kohta };
  }
  return null;
}

/**
 * RAAHAUSLIPPU POIS. Selain lähettää klikin myös raahauksen
 * päätteeksi, ja paneeli nielaisee sen tarkoituksella (js/fokusvirta.js
 * `raahattu`). Savukkeen raahaus on vain kaappauksen keskitys, joten
 * lippu kuitataan käsin — pelissä sen kuittaa pelaajan seuraava
 * napautus.
 */
const nollaaRaahaus = (sivu) => sivu.evaluate(() => {
  const naytto = window.matkakirja?.ui?.luentakuvaAnkkuri;
  if (naytto) naytto.raahattu = false;
});

/**
 * KAUPUNGIN LAATTA JA SEN PISTE RUUDULLA.
 *
 * Laatta on kartan oma ellipsi (js/ui.js city); sen lisäksi luetaan
 * kaupungin pisteen ruutupaikka SAMALLA kaavalla kuin peli sen laskee
 * (js/saapumisasento.js laudaltaRuudulle), jotta mitta on olemassa
 * myös silloin, kun lauta piirtää kaupungit ilman svg-laattaa.
 */
const mittaaLaatta = (sivu) => sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const kaupunki = game.cityOf();
  const laatat = [...document.querySelectorAll(`[data-kaupunki="${kaupunki.id}"]`)]
    .filter((el) => /(^| )(city|city-start|city-gate)( |$)/.test(
      el.getAttribute('class') ?? '',
    ));
  const laatikot = laatat.map((el) => el.getBoundingClientRect()).filter((r) => r.height > 0);
  const mod = await import('/js/saapumisasento.js');
  const pane = ui.mapPane.getBoundingClientRect();
  const piste = mod.laudaltaRuudulle({ x: kaupunki.x, y: kaupunki.y }, ui.nakyvaAlue(),
    ui.mapPane.clientWidth, ui.mapPane.clientHeight, ui.contentBox?.w ?? 0);
  return {
    laatanYlareuna: laatikot.length ? Math.round(Math.min(...laatikot.map((r) => r.top))) : null,
    laatanKorkeus: laatikot.length ? Math.round(Math.max(...laatikot.map((r) => r.height))) : null,
    pisteY: piste ? Math.round(pane.top + piste.y) : null,
    pisteX: piste ? Math.round(pane.left + piste.x) : null,
  };
});

/**
 * PANEELI PAIKALLEEN LEVOSSA OLEVALLE KARTALLE.
 *
 * Savuke pakottaa saapumisen kesken kamera-ajoa, joten paneelin
 * ankkuri lasketaan kartan siitä asennosta, joka sattuu olemaan
 * ruudulla juuri sillä hetkellä — ja kuva jää ruudun laitaan. Pelissä
 * ankkuri lasketaan kaupungin kohdalta. Nostetaan siis paneeli ja
 * pakka uudestaan pelin OMILLA kutsuilla (js/fokusvirta.js), kun
 * kamera on jo perillä: vasta silloin mitta kaupungin laattaan
 * tarkoittaa sitä, mitä omistaja kaappauksessaan katsoi.
 */
async function nostaPaneeliPaikalleen(sivu, lue) {
  await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const kaupunki = game.cityOf();
    const f = await import('/js/fokusvirta.js');
    f.naytaLuentakuva(ui, kaupunki);
    f.naytaPulunKuvapakka(ui, kaupunki);
  });
  let tila = await lue();
  for (let i = 0; i < 60 && tila.kortteja < KOEKUVAT.kuvat.length; i += 1) {
    await sivu.waitForTimeout(200);
    tila = await lue();
  }
  await sivu.waitForTimeout(500);
  return lue();
}

/** Paneelin (kuvatekstilappu ja pakka mukaan lukien) alin reuna. */
const mittaaAla = (sivu) => sivu.evaluate(() => {
  const paneeli = document.querySelector('.fokusvirta-luentakuva');
  if (!paneeli) return null;
  const osat = [paneeli, ...document.querySelectorAll('.pulucam-kuva'),
    ...document.querySelectorAll('.fokusvirta-luentateksti'),
    // Päällimmäisen kortin oma lappu roikkuu kortin alapuolella
    // (omistaja 10.9.2026 klo 23.37): sekin kuuluu paneelin alareunaan.
    ...document.querySelectorAll('.pulucam-kortti.pulucam-paalla .pulucam-lappu')];
  return Math.round(Math.max(...osat.map((el) => el.getBoundingClientRect().bottom)));
});

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

/*
 * 2 b. KUVA ON SELVÄSTI KAUPUNGIN LAATAN YLÄPUOLELLA (omistaja
 * 10.9.2026, työpöytäkaappaus Marseillesta: *"kuva saisi tulla ylemmäs,
 * ei näin kiinni kaupungin laattaa"*).
 */
tila = await nostaPaneeliPaikalleen(tyopoyta.sivu, tyopoyta.lue);
const ala = await mittaaAla(tyopoyta.sivu);
const laatta = await mittaaLaatta(tyopoyta.sivu);
tieto('paneelin alareuna (kuvateksti ja pakka mukana)', `${ala} px`);
tieto('kaupungin laatta', JSON.stringify(laatta));
tieto('väli paneelin alareunasta kaupungin pisteeseen', `${laatta.pisteY - ala} px`);
vaadi('paneeli on kaupungin pisteen yläpuolella laatan korkeuden ja ilmaraon verran',
  laatta.pisteY - ala >= 34 + 12, `${laatta.pisteY - ala} px`);
if (laatta.laatanYlareuna != null) {
  tieto('väli laatan yläreunaan', `${laatta.laatanYlareuna - ala} px`);
  vaadi('paneelin alareuna on kaupungin laatan yläpuolella',
    laatta.laatanYlareuna - ala >= 12, `${laatta.laatanYlareuna - ala} px`);
}
await tyopoyta.kaappaa('pulucam-laatan-ylapuolella.png');
tieto('kuplapino', tila.pino.slice(-140) || '(tyhjä)');
tieto('korttien laatikot', JSON.stringify(tila.laatikot));
vaadi('pulun kommentti tuli ruudulle', tila.pino.length > 0, '(pino jäi tyhjäksi)');
vaadi('viisi kuvaa pulpahti pakkaan', tila.kortteja === KOEKUVAT.kuvat.length,
  String(tila.kortteja));
/*
 * TARRA ON OMISTAJAN VALINNASSA (A–F), eikä sitä ole vielä valittu:
 * kuvien pitää näkyä PUHTAINA. Kun PULU_CAM_TARRA_OSOITE saa arvon,
 * tämä vartio käännetään toisin päin (tarra jokaisessa pulun kuvassa).
 */
// Omistaja valitsi tarran B (9.9.2026): jokaisessa pulun kuvassa yksi tarra.
vaadi('pulun kuvissa on tarra B', tila.merkkeja === KOEKUVAT.kuvat.length, String(tila.merkkeja));

/* 3. Limitys: kortit ovat oikeasti eri kohdissa. */
if (tila.laatikot.length === KOEKUVAT.kuvat.length) {
  const paikat = new Set(tila.laatikot.map((l) => `${l.x},${l.y}`));
  vaadi('kortit ovat eri kohdissa (limitys näkyy)', paikat.size === KOEKUVAT.kuvat.length,
    JSON.stringify(tila.laatikot));
  const siirto = Math.max(...tila.laatikot.map((l) => Math.abs(l.x - tila.laatikot[0].x)));
  tieto('suurin vaakasiirtymä', `${siirto} px (kortin leveys ${tila.laatikot[0].w} px)`);
}

/*
 * 3 b. LYHYT KUVATEKSTI KERTOO PÄÄLLIMMÄISESTÄ KUVASTA, ja kartalla ei
 * ole Havainnekuva-linkkiä (omistaja 9.9.2026 klo 18.50).
 */
tieto('kartan lyhyt kuvateksti', String(tila.lyhyt));
vaadi('lyhyt kuvateksti on päällimmäisen kuvan teksti',
  tila.lyhyt === KOEKUVAT.kuvat[KOEKUVAT.kuvat.length - 1].lyhyt, String(tila.lyhyt));
vaadi('kartan lyhyessä tekstissä ei ole havainnekuvalinkkiä',
  tila.lyhyenLinkkeja === 0, String(tila.lyhyenLinkkeja));
/*
 * 3 b b. LAPPU ON KIINNI PULUN KORTIN OMASSA ALALAIDASSA (omistaja
 * 10.9.2026 klo 23.37, iPad-kaappaukset Krakovasta ja Vilnasta:
 * *"Pulun pienissä kuvissa ei näy kuvatekstiä"* — lappu oli kiinni
 * pakan POHJAKUVAN alareunassa, eri kulmassa ja alempana kuin pulun
 * kortti).
 */
tieto('lappu', JSON.stringify({
  lappuja: tila.lappuja,
  kortissa: tila.lappuKortissa,
  vali: tila.lapunVali,
  leveysero: tila.lapunLeveysero,
  pohjasta: tila.lyhytPohjasta,
}));
vaadi('kartalla näkyy täsmälleen yksi lappu', tila.lappuja === 1, String(tila.lappuja));
vaadi('lappu on päällimmäisen kortin omassa lohkossa (kääntyy kortin mukana)',
  tila.lappuKortissa === true, String(tila.lappuKortissa));
vaadi('lappu on kiinni kortin alalaidassa (ei väliä)', tila.lapunVali === 0,
  `${tila.lapunVali} px`);
vaadi('lappu on kortin levyinen', Math.abs(tila.lapunLeveysero ?? 999) <= 1,
  `${tila.lapunLeveysero} px`);
vaadi('lappu tulee pulun kortilta eikä isoisän kappaleesta',
  tila.lyhytPohjasta === false, String(tila.lyhytPohjasta));
await tyopoyta.kaappaa('pulucam-5-pakka.png');

/*
 * 3 c. PAKAN SELAUS: ALEMMAN KORTIN NAPAUTUS NOSTAA SEN PÄÄLLE
 * (omistaja 10.9.2026, sanatarkasti: *"kuvia pitäisi voida vaihdella
 * näytöllä jos klikkaa alempana näkyvää kuvaa"*), KARUSELLI EI AUKEA —
 * ja MATKAKIRJAKORTTI PYSYY AUKI (*"matkakirja ei saisi hävitä
 * näkyvistä jos käyttäjä klikkaa kuvapakasta toisen kuvan
 * näkyville"*).
 */
await tyopoyta.sivu.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(false));
const ennenSelausta = await tyopoyta.lue();
tieto('kerrokset ennen selausta', JSON.stringify(ennenSelausta.kerrokset));
vaadi('matkakirjakortti on auki ennen pakan selausta',
  ennenSelausta.matkakirjaPieni === false, String(ennenSelausta.matkakirjaPieni));
/*
 * ALIN KORTTI, JOLLA ON NÄKYVÄ REUNA. Viiden kuvan pakassa keskimmäiset
 * kortit voivat peittyä kokonaan, eikä peittynyttä korttia voi
 * napauttaa — pelaajakaan ei voi. Vartio koskee sitä korttia, jonka
 * reuna oikeasti näkyy.
 */
const nakyva = await alinNakyvaKortti(tyopoyta.sivu, ennenSelausta.kerrokset);
vaadi('pakasta näkyy alemman kortin reuna', Boolean(nakyva), '(yksikään alempi ei näy)');
const alinKortti = nakyva?.i ?? 0;
const osumakohta = await napautaNakyvaa(tyopoyta.sivu, '.pulucam-kuva', alinKortti);
tieto('alemman kortin napautus', JSON.stringify({ kortti: alinKortti, osumakohta }));
vaadi('alemman kortin näkyvä reuna löytyi ruudulta', Boolean(osumakohta), '(ei osumaa)');
const selauksenJalkeen = await tyopoyta.lue();
tieto('kerrokset noston jälkeen', JSON.stringify(selauksenJalkeen.kerrokset));
tieto('kuvateksti noston jälkeen', String(selauksenJalkeen.lyhyt));
vaadi('alemman kortin napautus nosti sen päällimmäiseksi',
  selauksenJalkeen.kerrokset[alinKortti] === Math.max(...selauksenJalkeen.kerrokset),
  JSON.stringify(selauksenJalkeen.kerrokset));
vaadi('kuvateksti vaihtui nostetun kuvan tekstiin',
  selauksenJalkeen.lyhyt === KOEKUVAT.kuvat[alinKortti].lyhyt, String(selauksenJalkeen.lyhyt));
// LAPPU SIIRTYI UUDEN PÄÄLLIMMÄISEN ALLE, eikä vanhaa jäänyt näkyviin.
vaadi('nostettu kortti kantaa nyt ainoan lapun',
  selauksenJalkeen.lappuja === 1 && selauksenJalkeen.lappuKortissa === true,
  JSON.stringify({ lappuja: selauksenJalkeen.lappuja, kortissa: selauksenJalkeen.lappuKortissa }));
vaadi('lappu on yhä kiinni kortin alalaidassa', selauksenJalkeen.lapunVali === 0,
  `${selauksenJalkeen.lapunVali} px`);
vaadi('alemman kortin napautus EI avannut karusellia',
  selauksenJalkeen.zoomAuki === false, String(selauksenJalkeen.zoomAuki));
vaadi('pakan napautus ei kutistanut matkakirjakorttia',
  selauksenJalkeen.matkakirjaPieni === false, String(selauksenJalkeen.matkakirjaPieni));
await tyopoyta.kaappaa('pulucam-selaus-nostettu.png');

/*
 * 3 d. PÄÄLLIMMÄISEN NAPAUTUS AVAA KARUSELLIN JUURI SIITÄ KUVASTA
 * (omistajan täsmennys 10.9.2026: *"kun kuvaa klikkaa, niin juuri se
 * kuva pitää tulla näkyviin täysikokoisena"*).
 */
const paallimmaisenSrc = await tyopoyta.sivu.evaluate((i) => {
  const el = [...document.querySelectorAll('.pulucam-kuva')][i];
  return el?.querySelector('img')?.getAttribute('src') ?? null;
}, alinKortti);
await napautaNakyvaa(tyopoyta.sivu, '.pulucam-kuva', alinKortti);
await tyopoyta.sivu.waitForTimeout(900);
const avattu = await tyopoyta.lue();
tieto('karuselli päällimmäisestä', JSON.stringify({
  laskuri: avattu.zoomLaskuri, kuva: avattu.zoomKuva, odotettu: paallimmaisenSrc,
}));
vaadi('päällimmäisen kortin napautus avasi karusellin', avattu.zoomAuki === true, '(ei auennut)');
// Karusellin src on absoluuttinen, kortin suhteellinen: verrataan polkua.
vaadi('karuselli avautui JUURI siitä kuvasta, joka oli pakan päällä',
  Boolean(avattu.zoomKuva) && avattu.zoomKuva.endsWith(paallimmaisenSrc),
  `${avattu.zoomKuva} != ${paallimmaisenSrc}`);
vaadi('laskuri kertoo saman kuvan', avattu.zoomLaskuri === `${alinKortti + 2} / 6`,
  String(avattu.zoomLaskuri));
await tyopoyta.kaappaa('pulucam-karuselli-paallimmaisesta.png');
await tyopoyta.sivu.keyboard.press('Escape');
await tyopoyta.sivu.waitForTimeout(700);

/*
 * 3 e. ISOISÄN KUVA ON PAKASSA YKSI KORTTI MUIDEN JOUKOSSA: sen
 * näkyvän reunan napautus nostaa sen päälle, ja vasta toinen napautus
 * avaa karusellin — siitä samasta kuvasta (1 / 6).
 */
const isoisanEle = await napautaNakyvaa(
  tyopoyta.sivu, '.fokusvirta-luentakuva .fokusvirta-kuva', 0, { pakota: true },
);
tieto('isoisän kuvan napautus', JSON.stringify(isoisanEle));
const isoisaPaalla = await tyopoyta.lue();
tieto('isoisän kuva nostettuna', JSON.stringify({
  pohjanKerros: isoisaPaalla.pohjanKerros,
  kerrokset: isoisaPaalla.kerrokset,
  lyhyt: isoisaPaalla.lyhyt,
}));
vaadi('isoisän kuvan napautus nosti sen pakan päälle',
  isoisaPaalla.pohjanKerros === Math.max(isoisaPaalla.pohjanKerros, ...isoisaPaalla.kerrokset),
  String(isoisaPaalla.pohjanKerros));
vaadi('isoisän kuvan napautus ei avannut karusellia',
  isoisaPaalla.zoomAuki === false, String(isoisaPaalla.zoomAuki));
vaadi('kuvateksti palasi isoisän kuvan tekstiin',
  isoisaPaalla.lyhyt === KOEKUVAT.luentakuva.lyhyt, String(isoisaPaalla.lyhyt));
// ISOISÄN LAPPU ON PANEELIN OMA KAPPALE, ja se on nyt se ainoa näkyvä.
vaadi('isoisän kuvan alla näkyy sen oma lappu — eikä kahta lappua',
  isoisaPaalla.lyhytPohjasta === true && isoisaPaalla.lappuja === 1,
  JSON.stringify({ pohjasta: isoisaPaalla.lyhytPohjasta, lappuja: isoisaPaalla.lappuja }));
vaadi('matkakirjakortti on yhä auki pakan selaamisen jälkeen',
  isoisaPaalla.matkakirjaPieni === false, String(isoisaPaalla.matkakirjaPieni));
await tyopoyta.kaappaa('pulucam-isoisa-paalla.png');

/* 4. Karuselli: päällimmäinen kortti auki, isoisä ensin. */
/*
 * ISOISÄN KUVA ON NYT PAKAN PÄÄLLIMMÄINEN (kohta 3 e), joten sen
 * napautus avaa karusellin siitä kuvasta — ja juuri se on tämän osion
 * vartioima järjestys: isoisä ensin, pulun kuvat perässä.
 */
const napautaPaallimmaista = () => napautaNakyvaa(
  tyopoyta.sivu, '.fokusvirta-luentakuva .fokusvirta-kuva', 0, { pakota: true },
);
await napautaPaallimmaista();
await tyopoyta.sivu.waitForTimeout(400);
if (!(await tyopoyta.sivu.$('.fokuszoom'))) await napautaPaallimmaista();
await tyopoyta.sivu.waitForTimeout(1200);
/** Karusellin nykyisen kuvan tila yhdellä lukemalla. */
const lueZoom = () => tyopoyta.sivu.evaluate(() => {
  const selite = document.querySelector('.fokuszoom-selite');
  const linkki = selite?.querySelector('.havainnekuva-linkki') ?? null;
  return {
    auki: Boolean(document.querySelector('.fokuszoom')),
    laskuri: document.querySelector('.fokuszoom-laskuri')?.textContent ?? null,
    // Pitkä teksti ilman perään ladottua linkkiä.
    selite: [...(selite?.childNodes ?? [])]
      .filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim(),
    lahde: document.querySelector('.fokuszoom-lahde')?.textContent ?? null,
    nuolia: document.querySelectorAll('.fokuszoom-nuoli').length,
    merkkeja: document.querySelectorAll('.fokuszoom .pulucam-merkki').length,
    // Sinetti kuuluu vain pulun kuviin: isoisän kuvassa se on piilossa.
    merkkiPiilossa: document.querySelector('.fokuszoom .pulucam-merkki')?.hidden ?? null,
    linkki: linkki?.textContent ?? null,
    // Linkin on oltava PITKÄN TEKSTIN PERÄSSÄ, ei sen keskellä.
    linkkiViimeisena: Boolean(linkki)
      && selite.childNodes[selite.childNodes.length - 1] === linkki,
  };
});

const zoom = await lueZoom();
tieto('karuselli', JSON.stringify(zoom));
vaadi('karuselli aukesi', zoom.auki === true, JSON.stringify(zoom));
vaadi('isoisän kuva on ensin', zoom.laskuri === '1 / 6', String(zoom.laskuri));
vaadi('nuolinapit ovat molempiin suuntiin', zoom.nuolia === 2, String(zoom.nuolia));
vaadi('isoisän lyhyt kuvateksti on karusellissa',
  zoom.selite === KOEKUVAT.luentakuva.lyhyt, String(zoom.selite));
/*
 * SINETTI ON KARUSELLISSA YHTENÄ ELEMENTTINÄ, mutta isoisän kuvan
 * kohdalla piilossa (omistaja valitsi sinetin 9.9.2026; se kuuluu vain
 * pulun kuviin).
 */
vaadi('isoisän kuvassa sinetti on piilossa', zoom.merkkeja === 1 && zoom.merkkiPiilossa === true,
  JSON.stringify({ merkkeja: zoom.merkkeja, piilossa: zoom.merkkiPiilossa }));
vaadi('havainnekuvamerkintä ei toistu lähderivillä', zoom.lahde === '', String(zoom.lahde));
/* 5. Havainnekuva-linkki isoisän pitkän kuvatekstin perässä. */
vaadi('isoisän pitkän tekstin perässä on Havainnekuva-linkki',
  zoom.linkki === 'Havainnekuva' && zoom.linkkiViimeisena === true, JSON.stringify(zoom));
await tyopoyta.kaappaa('pulucam-karuselli-isoisa.png');

/* Linkki avaa oikeasti pelin havainnekuvaselityksen. */
await tyopoyta.sivu.click('.fokuszoom-selite .havainnekuva-linkki');
await tyopoyta.sivu.waitForTimeout(700);
const selitys = await tyopoyta.sivu.evaluate(() => {
  const popup = document.querySelector('.havainnekuva-selite-popup');
  return {
    auki: Boolean(popup),
    otsikko: popup?.querySelector('h2, .minipopup-otsikko')?.textContent ?? null,
    kappaleita: popup?.querySelectorAll('.minipopup-teksti').length ?? 0,
    zoomYha: Boolean(document.querySelector('.fokuszoom')),
  };
});
tieto('havainnekuvaselitys', JSON.stringify(selitys));
vaadi('Havainnekuva-linkki avaa selityksen', selitys.auki === true, JSON.stringify(selitys));
vaadi('selityksessä on omistajan hyväksymät kappaleet', selitys.kappaleita >= 3,
  String(selitys.kappaleita));
vaadi('linkki ei sulje suurennosta altaan', selitys.zoomYha === true, String(selitys.zoomYha));
await tyopoyta.kaappaa('pulucam-havainnekuva-linkki.png');
/*
 * ESC SULKEE SEKÄ SELITTEEN ETTÄ SUURENNOKSEN: selite on <dialog>,
 * jonka natiivi Esc sulkee, ja sama näppäinpainallus kulkee myös
 * suurennoksen omalle kuuntelijalle. Se ei ole vika vaan odotettua —
 * mutta savukkeen on jatkettava karusellista, joten se avataan
 * tarvittaessa uudestaan.
 */
await tyopoyta.sivu.keyboard.press('Escape');
await tyopoyta.sivu.waitForTimeout(600);
if (!(await tyopoyta.sivu.$('.fokuszoom'))) {
  await napautaPaallimmaista();
  await tyopoyta.sivu.waitForTimeout(1000);
}
vaadi('karuselli on jälleen auki selitteen jälkeen',
  Boolean(await tyopoyta.sivu.$('.fokuszoom')), '(karuselli ei auennut uudestaan)');

/*
 * Nuolella eteenpäin: pitkä kuvateksti vaihtuu kuvan mukana, ja
 * Havainnekuva-linkki seuraa LÄHDETTÄ eikä kuvan omistajaa.
 */
await tyopoyta.sivu.click('.fokuszoom-nuoli.oikea');
await tyopoyta.sivu.waitForTimeout(700);
const pulunKuva = await lueZoom();
tieto('karusellin toinen kuva', JSON.stringify(pulunKuva));
vaadi('toinen kuva on pulun kuva', pulunKuva.laskuri === '2 / 6', String(pulunKuva.laskuri));
vaadi('lyhyt kuvateksti vaihtui kuvan mukana',
  pulunKuva.selite === KOEKUVAT.kuvat[0].lyhyt, String(pulunKuva.selite));
vaadi('"Pulun kamera" ei saa Havainnekuva-linkkiä', pulunKuva.linkki === null,
  String(pulunKuva.linkki));
await tyopoyta.kaappaa('pulucam-karuselli.png');

/* Neljäs pulun kuva on havainnekuva: se saa linkin. */
await tyopoyta.sivu.click('.fokuszoom-nuoli.oikea');
await tyopoyta.sivu.click('.fokuszoom-nuoli.oikea');
await tyopoyta.sivu.click('.fokuszoom-nuoli.oikea');
await tyopoyta.sivu.waitForTimeout(700);
const havainnekuva = await lueZoom();
tieto('karusellin viides kuva', JSON.stringify(havainnekuva));
vaadi('havainnekuvalähteinen pulun kuva saa linkin',
  havainnekuva.laskuri === '5 / 6' && havainnekuva.linkki === 'Havainnekuva',
  JSON.stringify(havainnekuva));

/* Sulkeminen palauttaa kartan pakkaan. */
await tyopoyta.sivu.keyboard.press('Escape');
await tyopoyta.sivu.waitForTimeout(900);
const suljettu = await tyopoyta.lue();
vaadi('sulkeminen palauttaa pakan kartalle',
  suljettu.kortteja === KOEKUVAT.kuvat.length && !(await tyopoyta.sivu.$('.fokuszoom')),
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
await nollaaRaahaus(tyopoyta.sivu);
const jalkeen = await tyopoyta.lue();
if (ennen.laatikot.length === KOEKUVAT.kuvat.length
  && jalkeen.laatikot.length === KOEKUVAT.kuvat.length) {
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
vaadi('pakka on kartalla myös puhelimella', puhelimessa.kortteja === KOEKUVAT.kuvat.length,
  String(puhelimessa.kortteja));

/*
 * PUHELIMELLA SAMA MITTA LAATASTA (omistaja 10.9.2026: kuvan on oltava
 * laatan yläpuolella KAIKILLA ruutukoilla).
 */
puhelimessa = await nostaPaneeliPaikalleen(puhelin.sivu, puhelin.lue);
const puhelimenAla = await mittaaAla(puhelin.sivu);
const puhelimenLaatta = await mittaaLaatta(puhelin.sivu);
tieto('puhelin: paneelin alareuna', `${puhelimenAla} px`);
tieto('puhelin: kaupungin laatta', JSON.stringify(puhelimenLaatta));
tieto('puhelin: väli kaupungin pisteeseen', `${puhelimenLaatta.pisteY - puhelimenAla} px`);
vaadi('puhelimella paneeli on kaupungin pisteen yläpuolella laatan verran',
  puhelimenLaatta.pisteY - puhelimenAla >= 34 + 12,
  `${puhelimenLaatta.pisteY - puhelimenAla} px`);
if (puhelimenLaatta.laatanYlareuna != null) {
  const vali = puhelimenLaatta.laatanYlareuna - puhelimenAla;
  tieto('puhelin: väli laatan yläreunaan', `${vali} px`);
  vaadi('puhelimella paneelin alareuna on laatan yläpuolella', vali >= 12, `${vali} px`);
}
await puhelin.kaappaa('pulucam-puhelin-laatta.png');

puhelimessa = await keskitaPakka(puhelin.sivu, puhelin.lue, 0.52);
await nollaaRaahaus(puhelin.sivu);

/* Pakan selaus toimii myös sormella: alempi kortti nousee päälle. */
await puhelin.sivu.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(false));
const puhelinEnnen = await puhelin.lue();
const puhelimenNakyva = await alinNakyvaKortti(puhelin.sivu, puhelinEnnen.kerrokset);
vaadi('puhelimella pakasta näkyy alemman kortin reuna', Boolean(puhelimenNakyva),
  '(yksikään alempi ei näy)');
const puhelimenAlin = puhelimenNakyva?.i ?? 0;
await napautaNakyvaa(puhelin.sivu, '.pulucam-kuva', puhelimenAlin);
const puhelinNosto = await puhelin.lue();
tieto('puhelin: kerrokset noston jälkeen', JSON.stringify(puhelinNosto.kerrokset));
vaadi('puhelimella alemman kortin napautus nostaa sen päälle',
  puhelinNosto.kerrokset[puhelimenAlin] === Math.max(...puhelinNosto.kerrokset),
  JSON.stringify(puhelinNosto.kerrokset));
vaadi('puhelimella kuvateksti vaihtui nostetun kuvan tekstiin',
  puhelinNosto.lyhyt === KOEKUVAT.kuvat[puhelimenAlin].lyhyt, String(puhelinNosto.lyhyt));
vaadi('puhelimella karuselli ei auennut nostosta', puhelinNosto.zoomAuki === false,
  String(puhelinNosto.zoomAuki));
vaadi('puhelimella matkakirjakortti pysyi auki', puhelinNosto.matkakirjaPieni === false,
  String(puhelinNosto.matkakirjaPieni));
await puhelin.kaappaa('pulucam-puhelin-selaus.png');
tieto('puhelin raahauksen jälkeen', JSON.stringify({
  paneeli: puhelimessa.paneeli, laatikot: puhelimessa.laatikot,
}));
if (puhelimessa.laatikot.length === KOEKUVAT.kuvat.length) {
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
