/*
 * Savuke: VETO EI OLE NAPAUTUS — kortti ei katoa vierittäessä.
 *
 * Omistajan vikailmoitus 12.9.2026, sanatarkasti: *"Nosto häviää
 * näkyvistä jos yrittää scrollata. Ilmeisesti peli tulkitsee että
 * pelaaja painaa kuvan ulkopuolelta ja sulkee ikkunan vaikka nosto on
 * jo rakentunut kuvan ympärille."*
 *
 * MITATTU JUURISYY — KAKSI ERI TIETÄ (iPhone 390x844 ja iPad 834x1194,
 * Parnassos-kortti vaiheessa 2):
 * kuva edellä -kortti on 366 x 647 px eli lähes koko ruudun kokoinen,
 * ja sen vierittävä kotelo (.fokuskohde-sisalto, scrollHeight 766 >
 * clientHeight 616) on popupin SISÄLLÄ — sieltä alkava veto ei siis
 * koskaan ollut vika. Vika oli kortin ULKOPUOLELTA alkava veto:
 * pointerdown osui pallon <canvas>-pintaan, ja kortin sulkuvahti
 * (js/fokuskohteet.js kuunteleKohdetta, js/fokusnosto.js,
 * js/elaintaky.js) sulki kortin JO pointerdownissa — ennen kuin sormi
 * oli liikkunut pikseliäkään. Kapealla ruudulla kortin reuna on 12 px
 * päässä laidasta, joten sormi osuu sinne jatkuvasti.
 *
 * Toinen tie oli KORTIN OMA ELE (js/fokuskohteet.js raahausTaiSulku):
 * iPadilla veto kortin OTSIKOSTA ylöspäin sulki kortin, koska eleestä
 * ei tullut yhtään pointermovea (selain vei eleen vieritykseen) — ja
 * ilman liikettä irrotus luettiin napautukseksi. Nyt matka ja kesto
 * luetaan irrotuksesta samalla kynnyksellä.
 *
 * KOLMAS TIE, JA SE OLI VAIHEEN 2 OMA (omistaja 12.9.2026 illalla,
 * iPhone, Ioánninan kortti auki koko artikkelina, sanatarkasti:
 * *"Nosto häviää edelleen näkyvistä, jos vieritän mistään muualta
 * kohdasta kuin kuvaa painamalla."*). Kuva edellä -kortilla oli OMA
 * haara js/fokuskohteet.js:n pointerdownissa, joka sulki kortin
 * suoraan ilman mitään ele-ehtoa. Kuvan päältä alkava veto meni läpi
 * vain siksi, että kuva on `button`; ylärivi, otsikko, leipäteksti ja
 * lähderivi sulkivat kortin heti. Siksi tämä savuke vetää nyt myös
 * YLÄRIVISTÄ JA OTSIKOSTA ja tarkistaa vaiheen erikseen.
 *
 * VARTIOT (kolme näyttömittaa x kolme korttityyppiä, kortti vaiheessa 2):
 *   0. KORTTI ON VAIHEESSA 2 (koko artikkeli näkyvissä) — muuten
 *      vetokokeet mittaisivat väärää korttia.
 *   1. PYSTYVETO KUVAN päällä ei sulje korttia.
 *   2. PYSTYVETO YLÄRIVIN päällä ei sulje korttia.
 *   3. PYSTYVETO OTSIKON päällä ei sulje korttia.
 *   4. PYSTYVETO LEIPÄTEKSTIN päällä ei sulje korttia.
 *   5. PYSTYVETO KORTIN ULKOPUOLELTA (kartta/pallo kortin vieressä) ei
 *      sulje korttia — tämä on se vika, jonka omistaja näki ensin.
 *   6. LYHYT NAPAUTUS kortin ulkopuolelle kartalle SULKEE kortin
 *      (omistajan linjaus 31.8.2026 pysyy voimassa).
 *   7. SAMA NAPAUTUS EI AVAA MITÄÄN UUTTA (31.8.2026) — nielu säilyy.
 *
 * Lisäksi kirjataan KORTIN YLÄREUNAN etäisyys ruudun yläreunasta
 * vaiheessa 2 (omistaja 12.9.2026: *"noston yläpuolelle ei jää tyhjää
 * tilaa, mistä kartta näkyy hieman"*) — katto on js/nostokuva.js
 * NOSTOKUVA_YLAVARA, ja sama luku mitataan korttityypeittäin
 * tools/mittaa-nostokuva.mjs:llä.
 *
 * Korjaus: js/ui-apurit.js kuunteleSulkevaNapautus (kynnys
 * RAAHAUKSEN_KYNNYS, sama luku kuin kartan raahausvahdissa
 * js/kartta.js) — sekä kortin ulkopuoliselle eleelle että kuva edellä
 * -kortin OMALLE eleelle (js/fokuskohteet.js kuvanNapautus).
 * Selaimeton osa säännöstä: tests/kortin-veto.test.mjs.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kortin-veto.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NOSTOKUVA_MARGINAALI, NOSTOKUVA_YLAVARA } from '../../js/nostokuva.js';

/** Kortin yläreunan katto vaiheessa 2 (ks. tiedoston alku). */
const YLAKATTO = NOSTOKUVA_MARGINAALI + NOSTOKUVA_YLAVARA;

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = req.url.split('?')[0];
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const portti = palvelin.address().port;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/** Pelitallenne: Fogg seisoo Ateenassa, Kreikan fokuslehti kartalla. */
function tallenne(lauta, id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }], pack: packById(lauta), seed: 11,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
/* Ämpäri ja Commons Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1):
 * ilman oikeita kuvia kortti jäisi matalaksi eikä mittaisi mitään. */
const valimuisti = new Map();
const noudaVerkosta = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: Buffer.from(await v.arrayBuffer()),
    })).catch(() => ({ status: 200, contentType: 'image/png', body: PIKSELI })));
  }
  return valimuisti.get(url);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaaSivu(nakyma, kosketus) {
  const ctx = await selain.newContext({
    viewport: nakyma, hasTouch: kosketus, isMobile: kosketus, serviceWorkers: 'block',
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try { localStorage.setItem('matkakirja-save-v1', data); } catch { /* yksityinen tila */ }
  }, tallenne('maailmankartta', 'ateena'));
  const sivu = await ctx.newPage();
  await sivu.route(/media\.matkakirja\.app|r2\.dev|wikimedia\.org|wikipedia\.org/,
    async (route) => route.fulfill(await noudaVerkosta(route.request().url())));
  await sivu.route('**workers.dev/**', (route) => route.abort());
  await sivu.goto(`http://localhost:${portti}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui, null, { timeout: 60000 });
  await sivu.waitForTimeout(4000);
  /*
   * KUPLAT JA TRAILERI POIS TYYLILLÄ (sama kaava kuin
   * savuke-valikon-sulussa): ne peittäisivät juuri ne kohdat, joista
   * tämä savuke vetää sormella.
   */
  await sivu.addStyleTag({
    content: '.saapumistraileri, .pollo-paneeli, .pollo-nappi, .fokusvirta-kupla,'
      + ' .pollo-vihje, .pollo-kuplapino-kehys, .fact-card { display: none !important; }',
  });
  return { ctx, sivu };
}

/* Pallon WebGL voi viivyttää kuittausta; tapahtuma lähtee silti. */
const laheta = (cdp, viesti) => Promise.race([
  cdp.send('Input.dispatchTouchEvent', viesti).catch(() => {}),
  new Promise((ok) => { setTimeout(ok, 700); }),
]);

/*
 * ELEEN KELLO TULEE MEILTÄ, EI KONTIN KELLOSTA (mitattu 12.9.2026).
 *
 * Kontti renderöi SwiftShaderilla 2–3 fps, ja yksi
 * `Input.dispatchTouchEvent` kuittaantuu vasta ~0,8 s kuluttua. Ilman
 * omaa aikaleimaa napautuksen touchStart ja touchEnd saivat siis
 * lähes sekunnin välin, ja peli luki eleen aivan oikein PITKÄKSI
 * PAINALLUKSEKSI (js/ui-apurit.js NAPAUTUKSEN_KESTO_MS = 700) — kortti
 * ei sulkeutunut, vaikka oikealla laitteella napautus kestää 60–120 ms.
 * CDP:n `timestamp` (sekunteja epookista) päätyy tapahtuman
 * timeStampiin, joten ele saa täällä saman keston kuin sormella.
 */
const CDP_ALKU = Date.now() / 1000;
const hetki = (ms) => CDP_ALKU + ms / 1000;

/** Pystyveto: kosketuksella CDP:llä, työpöydällä hiirellä. */
async function veto(sivu, cdp, x, y, dy, { askeleet = 8, kesto = 30 } = {}) {
  if (cdp) {
    let ms = (Date.now() / 1000 - CDP_ALKU) * 1000;
    await laheta(cdp, { type: 'touchStart', touchPoints: [{ x, y }], timestamp: hetki(ms) });
    for (let i = 1; i <= askeleet; i += 1) {
      ms += kesto;
      await laheta(cdp, {
        type: 'touchMove',
        touchPoints: [{ x, y: y + Math.round((dy * i) / askeleet) }],
        timestamp: hetki(ms),
      });
      await new Promise((ok) => { setTimeout(ok, kesto); });
    }
    await laheta(cdp, { type: 'touchEnd', touchPoints: [], timestamp: hetki(ms + kesto) });
  } else {
    await sivu.mouse.move(x, y);
    await sivu.mouse.down();
    for (let i = 1; i <= askeleet; i += 1) {
      await sivu.mouse.move(x, y + Math.round((dy * i) / askeleet));
      await new Promise((ok) => { setTimeout(ok, kesto); });
    }
    await sivu.mouse.up();
  }
  await sivu.waitForTimeout(400);
}

/** Lyhyt napautus: sama piste, sormi ylös heti. */
async function napautus(sivu, cdp, x, y) {
  if (cdp) {
    // Napautus on 60 ms pitkä — ELEEN omassa ajassa, ei kontin (ks. hetki).
    const ms = (Date.now() / 1000 - CDP_ALKU) * 1000;
    await laheta(cdp, { type: 'touchStart', touchPoints: [{ x, y }], timestamp: hetki(ms) });
    await laheta(cdp, { type: 'touchEnd', touchPoints: [], timestamp: hetki(ms + 60) });
  } else {
    await sivu.mouse.click(x, y);
  }
  await sivu.waitForTimeout(500);
}

const KORTIT = '.fokuskohde-popup, .fokusnosto-kortti, .elaintaky-kortti';

/** Auki olevan kortin mitat ja vierittävän kotelon tila. */
const tila = (sivu) => sivu.evaluate((valitsin) => {
  const kortti = document.querySelector(valitsin);
  if (!kortti) return { auki: false };
  const r = kortti.getBoundingClientRect();
  const kotelo = kortti.querySelector('.fokuskohde-sisalto, .fokusnosto-sisalto');
  return {
    auki: true,
    // Kuva edellä -kortin vaihe: 2 = koko artikkeli näkyvissä.
    vaihe2: kortti.classList.contains('nostokuva-vaihe2'),
    /*
     * KORTIN HENKILÖLLISYYS — ILMAN TÄTÄ VARTIO EI NÄE VIKAA.
     * Vanha sulku tapahtui pointerdownissa, ja SAMA ele avasi kartalta
     * uuden kortin sormen alle. Pelkkä "onko jokin kortti auki" näki
     * silloin vihreää, vaikka omistajan kortti oli juuri kadonnut
     * (mitattu 12.9.2026). Nimi luetaan kortin omasta otsikosta.
     */
    nimi: kortti.getAttribute('aria-label')
      ?? kortti.querySelector('h3')?.textContent ?? '',
    kuvaKortti: kortti.classList.contains('nostokuva-kortti'),
    laatikko: {
      x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height),
    },
    vieritys: kotelo
      ? {
        scrollH: kotelo.scrollHeight,
        clientH: kotelo.clientHeight,
        kortinSisalla: kortti.contains(kotelo),
      }
      : null,
  };
}, KORTIT);

/**
 * Kortin ULKOPUOLINEN KARTTAPISTE, jonka osuma ei ole kortissa.
 *
 * KOSKETUKSEN OIKAISU ON OTETTAVA HUOMIOON (mitattu 12.9.2026): Chromium
 * napsauttaa mobiilinäkymässä kosketuksen lähimpään napautettavaan
 * kohteeseen parinkymmenen pikselin säteellä, joten kortin reunasta 6 px
 * päässä oleva "ulkopuoli" osuikin korttiin — ja koe mittasi aivan muuta
 * kuin luuli. Piste otetaan siksi vähintään KOSKETUSVARAn päästä kortin
 * laatikosta ja sen on oltava kartalla (`#board`), joka on se pinta,
 * josta omistajan sääntö 31.8.2026 puhuu. Jos kortti peittää koko
 * kartan, pistettä ei ole — silloin kortista poistutaan ruksista, eikä
 * tätä koetta voi tehdä.
 */
const KOSKETUSVARA = 24;
const ulkoPiste = (sivu) => sivu.evaluate(([valitsin, vara]) => {
  const kortti = document.querySelector(valitsin);
  if (!kortti) return null;
  const r = kortti.getBoundingClientRect();
  const W = window.innerWidth;
  const H = window.innerHeight;
  const kaukana = (p) => p.x < r.left - vara || p.x > r.right + vara
    || p.y < r.top - vara || p.y > r.bottom + vara;
  const ehdokkaat = [
    { x: Math.round(r.left + r.width / 2), y: Math.round(r.bottom + vara + 10) },
    { x: Math.round(r.left + r.width / 2), y: Math.round(r.top - vara - 10) },
    { x: Math.round(r.left / 2), y: Math.round(r.top + r.height / 2) },
    { x: Math.round((r.right + W) / 2), y: Math.round(r.top + r.height / 2) },
    { x: Math.round(W / 2), y: H - 20 },
  ];
  for (const p of ehdokkaat) {
    if (p.x < 4 || p.y < 60 || p.x > W - 4 || p.y > H - 4) continue;
    if (!kaukana(p)) continue;
    const e = document.elementFromPoint(p.x, p.y);
    if (!e || kortti.contains(e)) continue;
    // Pöllö ja suurennos ovat kortin työpareja, eivät "ulkopuolta".
    if (e.closest('.pollo-nappi, .pollo-paneeli, .fokuskohde-zoom')) continue;
    return { ...p, nimi: e.nodeName, kartalla: Boolean(e.closest('#board')) };
  }
  return null;
}, [KORTIT, KOSKETUSVARA]);

/**
 * Kuvan, ylärivin, otsikon ja leipätekstin keskipisteet kortilta.
 *
 * YLÄRIVI JA OTSIKKO OVAT OMA KOKEENSA: ne ovat tavallisessa kortissa
 * raahauskahva (css/fokuskohteet.css touch-action: none) ja kuva
 * edellä -kortissa vierityspintaa, ja juuri niiden päältä omistajan
 * vieritys sulki kortin.
 */
const sisapisteet = (sivu) => sivu.evaluate((valitsin) => {
  const kortti = document.querySelector(valitsin);
  if (!kortti) return { kuva: null, ylarivi: null, otsikko: null, teksti: null };
  /*
   * PISTE KELPAA, JOS SE OSUU KORTTIIN. Ennen tässä oli kiinteä
   * `top > 60` yläpalkin väistöksi, mutta kuva edellä -kortti alkaa nyt
   * ruudun yläreunasta (js/nostokuva.js NOSTOKUVA_YLAVARA) — ehto
   * hylkäsi juuri ne ylärivin ja otsikon pisteet, joiden takia tämä
   * savuke on olemassa. Osuma luetaan siksi ruudulta: jos jokin muu
   * pinta (yläpalkki, kupla) peittää kohdan, piste ei kelpaa.
   */
  const keski = (r) => {
    if (!r || r.height <= 10 || r.top < 0 || r.bottom > window.innerHeight) return null;
    const p = { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    const e = document.elementFromPoint(p.x, p.y);
    return e && kortti.contains(e) ? p : null;
  };
  const ota = (...valitsimet) => valitsimet
    .map((v) => keski(kortti.querySelector(v)?.getBoundingClientRect()))
    .find(Boolean) ?? null;
  const kuva = kortti.querySelector('img')?.getBoundingClientRect();
  const teksti = [...kortti.querySelectorAll('.fokuskohde-sisalto p, .fokusnosto-sisalto p')]
    .map((p) => p.getBoundingClientRect())
    .filter((r) => r.height > 24)
    .map(keski)
    .find(Boolean)
    ?? [...kortti.querySelectorAll('p')].map((p) => p.getBoundingClientRect())
      .map(keski).find(Boolean) ?? null;
  return {
    kuva: keski(kuva),
    ylarivi: ota('.fokuskohde-ylarivi', '.fokusnosto-ylarivi', '.elaintaky-ylarivi'),
    otsikko: ota('.fokuskohde-otsikko', '.fokusnosto-otsikko', '.elaintaky-otsikko', 'h3'),
    teksti,
  };
}, KORTIT);

/** Kortti auki: kohdekortti, täkynosto tai eläintäky — vaiheeseen 2. */
async function avaaKortti(sivu, tyyppi) {
  await sivu.evaluate(async (t) => {
    const ui = window.matkakirja.ui;
    const { avaaFokuskohde, maanKohdetiedot, suljeFokuskohde } = await import('/js/fokuskohteet.js');
    if (t === 'kohde') {
      const kohteet = [...(maanKohdetiedot(ui, 'GRC')?.values() ?? [])];
      avaaFokuskohde(ui, kohteet.find((k) => /parnass/i.test(k.nimi ?? '')) ?? kohteet[0]);
    } else if (t === 'elain') {
      const { avaaElaintaky } = await import('/js/elaintaky.js');
      avaaElaintaky(ui, 'GRC');
    } else {
      /*
       * TÄKYNOSTO SUORINTA TIETÄ: täkypoolista se nosto, joka nimeää
       * kartan kohteen, ja sen kohteen kortista Livian leikekirja
       * -nappi (js/fokuskohteet.js piirraKohteenNosto). Nappi avaa
       * saman noston kuin kartan nostomerkki.
       */
      const { nostoKaupunginPooli } = await import('/js/fokusnosto.js');
      const pooli = nostoKaupunginPooli('GRC', ui.game?.player?.city ?? 'ateena');
      const tiedot = maanKohdetiedot(ui, 'GRC');
      for (const nosto of pooli) {
        const kohde = nosto?.kohde ? tiedot?.get(nosto.kohde) : null;
        if (!kohde) continue;
        avaaFokuskohde(ui, kohde);
        await new Promise((ok) => { setTimeout(ok, 400); });
        /*
         * KOHTEEN KORTTI ON ITSEKIN KUVA EDELLÄ (js/nostokuva.js):
         * Livian leikekirja -nappi latoutuu vasta VAIHEESSA 2, joten
         * kuvaesittely on avattava ennen kuin nappia voi etsiä. Ilman
         * tätä täkynosto ei auennut lainkaan — savuke raportoi kolme
         * kertaa "korttia ei saatu auki" (mitattu 12.9.2026).
         */
        document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
        await new Promise((ok) => { setTimeout(ok, 400); });
        const nappi = document.querySelector('.fokuskohde-leikekirja');
        if (nappi) { nappi.click(); break; }
        suljeFokuskohde(ui);
      }
    }
  }, tyyppi);
  await sivu.waitForTimeout(1500);
  /*
   * KUVA EDELLÄ (js/nostokuva.js): vaihe 2 on se, jossa omistaja yritti
   * vierittää — kuva, ylärivi, otsikko, leipäteksti ja pöllön
   * kysymykset. Nappi haetaan KORTIN OMASTA luokasta eikä tekstihaulla
   * koko dokumentista: tekstihaku osui ajoittain aivan muuhun "Lisää"-
   * alkuiseen painikkeeseen, ja kortti jäi vaiheeseen 1.
   */
  await sivu.evaluate((valitsin) => {
    const kortti = document.querySelector(valitsin);
    const lisaa = kortti?.querySelector('.nostokuva-lisaa')
      ?? document.querySelector('.nostokuva-lisaa');
    lisaa?.click();
  }, KORTIT);
  await sivu.waitForTimeout(1500);
}

const NAKYMAT = [
  { nimi: 'iPhone 390x844', nakyma: { width: 390, height: 844 }, kosketus: true },
  { nimi: 'iPad 834x1194', nakyma: { width: 834, height: 1194 }, kosketus: true },
  { nimi: 'tyopoyta 1280x800', nakyma: { width: 1280, height: 800 }, kosketus: false },
];
const TYYPIT_KORTIT = [
  ['kohde', 'kohdekortti'], ['nosto', 'täkynosto'], ['elain', 'eläintäky'],
];

for (const n of NAKYMAT) {
  for (const [tyyppi, korttinimi] of TYYPIT_KORTIT) {
    // eslint-disable-next-line no-await-in-loop
    const { ctx, sivu } = await avaaSivu(n.nakyma, n.kosketus);
    // eslint-disable-next-line no-await-in-loop
    const cdp = n.kosketus ? await ctx.newCDPSession(sivu) : null;
    // eslint-disable-next-line no-await-in-loop
    await avaaKortti(sivu, tyyppi);
    // eslint-disable-next-line no-await-in-loop
    const alku = await tila(sivu);
    if (!alku.auki) {
      vaadi(`${n.nimi} / ${korttinimi} aukeaa`, false, 'korttia ei saatu auki');
      // eslint-disable-next-line no-await-in-loop
      await ctx.close();
      continue;
    }
    tieto(`${n.nimi} / ${korttinimi}`,
      `kortti ${JSON.stringify(alku.laatikko)} vieritys ${JSON.stringify(alku.vieritys)}`);

    // eslint-disable-next-line no-await-in-loop
    const sisalla = await sisapisteet(sivu);
    // eslint-disable-next-line no-await-in-loop
    const ulkona = await ulkoPiste(sivu);
    vaadi(`${n.nimi} / ${korttinimi}: kortti on vaiheessa 2 (koko artikkeli)`,
      !alku.kuvaKortti || alku.vaihe2, 'Lisää-nappi ei vienyt vaiheeseen 2');
    if (alku.kuvaKortti) {
      /*
       * KORTIN YLÄREUNA VAIHEESSA 2 (omistaja 12.9.2026). Katto on
       * js/nostokuva.js NOSTOKUVA_MARGINAALI + NOSTOKUVA_YLAVARA: sitä
       * korkeammalle jäävä kaistale näyttäisi karttaa kortin päältä.
       */
      vaadi(`${n.nimi} / ${korttinimi}: kortin yläreuna vaiheessa 2 enintään ${YLAKATTO} px`,
        alku.laatikko.y <= YLAKATTO, `yläreuna ${alku.laatikko.y} px — kartta näkyy kortin päältä`);
    }
    const kokeet = [
      ['kuva', sisalla.kuva], ['ylärivi', sisalla.ylarivi], ['otsikko', sisalla.otsikko],
      ['teksti', sisalla.teksti], ['ulkopuoli', ulkona],
    ];
    for (const [mista, piste] of kokeet) {
      if (!piste) { tieto(`${n.nimi} / ${korttinimi} / ${mista}`, 'ei mitattavaa pistettä'); continue; }
      // eslint-disable-next-line no-await-in-loop
      await veto(sivu, cdp, piste.x, piste.y, -160);
      // eslint-disable-next-line no-await-in-loop
      const j = await tila(sivu);
      vaadi(`${n.nimi} / ${korttinimi}: pystyveto ${mista} (${piste.x},${piste.y}) EI sulje korttia`,
        j.auki && j.nimi === alku.nimi,
        j.auki ? `kortti vaihtui: "${alku.nimi}" → "${j.nimi}"` : 'kortti katosi vedosta');
      if (!j.auki || j.nimi !== alku.nimi) {
        // eslint-disable-next-line no-await-in-loop
        await avaaKortti(sivu, tyyppi);
      }
    }

    // eslint-disable-next-line no-await-in-loop
    const piste = (await tila(sivu)).auki ? await ulkoPiste(sivu) : null;
    if (!piste) {
      tieto(`${n.nimi} / ${korttinimi} / napautus`,
        'kortti peittää kartan — ulkopuolista karttapistettä ei ole (sulku on ruksista)');
    }
    if (piste) {
      // eslint-disable-next-line no-await-in-loop
      await napautus(sivu, cdp, piste.x, piste.y);
      // eslint-disable-next-line no-await-in-loop
      const j = await tila(sivu);
      vaadi(`${n.nimi} / ${korttinimi}: lyhyt napautus ulkopuolelle SULKEE`, !j.auki,
        'kortti jäi auki');
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(600);
      // eslint-disable-next-line no-await-in-loop
      const j2 = await tila(sivu);
      vaadi(`${n.nimi} / ${korttinimi}: sama napautus ei avaa uutta`, !j2.auki,
        'napautus avasi uuden kortin');
    }
    if (KUVAKANSIO) {
      // eslint-disable-next-line no-await-in-loop
      await sivu.screenshot({ path: join(KUVAKANSIO, `kortin-veto-${tyyppi}-${n.nakyma.width}.png`) });
    }
    // eslint-disable-next-line no-await-in-loop
    await ctx.close();
  }
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
