/*
 * KARTTAMERKKIEN PORTTI — jokaisella merkillä on nimi ja napautus.
 *
 * OMISTAJAN HAVAINTO 2.9.2026 (Bosnia ja Hertsegovina, 50 km:n näkymä,
 * pelaaja Sarajevossa), sanatarkasti: *"kaksi tekstitöntä huutomerkkiä
 * sekä Dinaariset Alpit mitä ei voi klikata. samoin Dinara ja Sveti Jure
 * eivät ole klikattavissa. voi olla myös muitakin. nyt nämä Euroopan
 * kaikki karttakohteet on huolella tarkistettava. olen pyytänyt tätä jo
 * pari kertaa mutta silti kartalta löytyy paljon viallisia kohtia. tämä
 * on äärimmäisen tärkeää saada kuntoon."*
 *
 * ── SÄÄNTÖ, JOTA TÄMÄ VARTIOI ──────────────────────────────────────
 *
 * Jokaisella PÄÄKARTALLA näkyvällä merkillä — poltetulla tai elävällä,
 * olipa se nosto, skandaalin huutomerkki, eläintäyn tassu, vuorikolmio,
 * joen tai järven vesimerkki, maastonimi, historian hetki tai kohde —
 * on
 *
 *   (a) NÄKYVÄ NIMI ruudulla, ja
 *   (b) NAPAUTUS, joka avaa kortin tai minipopupin.
 *
 * POIKKEUS on laudan kaupunki ja maan nimi: niillä on omat
 * mekaniikkansa (laatta, maataulu). Kohdekaupungin kohdalla olevia
 * nostoja ei ole pääkartalla lainkaan (karsiKaupunkikartanNostot,
 * v1467) eikä niitä saa tuoda takaisin.
 *
 * ── MIKSI SELAIN EIKÄ YKSIKKÖTESTI ─────────────────────────────────
 *
 * Kolme neljästä mustelähteestä on näkymättömissä Nodelle:
 *
 *   1. LAATTAAN POLTETTU MUSTE. Poltettu merkki ei ole DOMissa
 *      lainkaan; sen olemassaolon kertoo ämpärin laattaluettelo ja sen
 *      nimiön kohtalon sama ladonta, jolla se poltettiin. Siksi tämä
 *      työkalu hakee OIKEAN luettelon ämpäristä (Noden fetch,
 *      NODE_USE_ENV_PROXY=1) ja tarjoilee sen selaimelle — sama kaava
 *      kuin tools/savukkeet/savuke-kohdekaupungit.mjs ja
 *      savuke-nostolaatat.mjs.
 *   2. LADONNAN PUDOTUKSET. Nimi voi kadota törmäykseen vasta siinä
 *      mittakaavassa, jossa pelaaja seisoo.
 *   3. OSUMAMUODOT. Napautettavuus on selaimen osumatesti
 *      (elementFromPoint) eikä koodin lupaus.
 *
 * ── AJO ────────────────────────────────────────────────────────────
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-karttamerkit.mjs
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-karttamerkit.mjs --maa BIH
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-karttamerkit.mjs --kuvat /tmp/k
 *
 * Poistumiskoodi 0 = ei löydöksiä. Ajo käy jokaisen Euroopan laudan
 * maan, jossa on laudan kaupunki, KAHDESSA mittakaavassa: maan koko
 * näkymä ja 50 km pelaajan kaupungista. Se saa kestää — kymmenisen
 * minuuttia on normaali.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;

/* ------------------------------------------------------------ liput */

const argv = process.argv.slice(2);
const lippu = (nimi) => {
  const i = argv.indexOf(nimi);
  return i >= 0 ? argv[i + 1] ?? '' : null;
};
const VAIN_MAA = (lippu('--maa') ?? '').toUpperCase() || null;
const KUVAKANSIO = lippu('--kuvat');
const NAPAUTUKSIA = Number(lippu('--napautukset') ?? 4);
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/*
 * EUROOPAN LAUTA. Eksplisiittinen lista, koska FOKUS_POHJAT kattaa
 * myös Afrikan, Aasian ja Amerikat — omistajan tilaus koski Eurooppaa.
 */
const EUROOPPA = [
  'ALB', 'AUT', 'BEL', 'BGR', 'BIH', 'BLR', 'CHE', 'CYP', 'CZE', 'DEU',
  'DNK', 'ESP', 'EST', 'FIN', 'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL',
  'ISL', 'ITA', 'LTU', 'LUX', 'LVA', 'MDA', 'MKD', 'MNE', 'NLD', 'NOR',
  'POL', 'PRT', 'ROU', 'SRB', 'SVK', 'SVN', 'SWE', 'TUR', 'UKR',
];

const pack = packById('maailmankartta');
const cityCountry = pack.map?.cityCountry ?? {};
const kaupungitMaittain = {};
for (const c of pack.cities ?? []) {
  const iso = cityCountry[c.id];
  if (iso) (kaupungitMaittain[iso] ??= []).push(c);
}

/*
 * FOKUSMOODI TARVITSEE KAUPUNGIN. Maan ikkuna luetaan siitä maasta,
 * jossa pelaajan nappula seisoo (js/ui.js maanIkkuna), joten maa ilman
 * laudan kaupunkia ei voi olla fokusmoodin maa. Sen muste ei jää
 * mittaamatta: se on naapurin poltettua mustetta jossakin toisessa
 * näkymässä, ja naapurit mitataan joka näkymässä.
 */
const MAAT = EUROOPPA
  .filter((iso) => FOKUS_POHJAT[iso]?.lauta === 'maailmankartta')
  .filter((iso) => (kaupungitMaittain[iso] ?? []).length > 0)
  .filter((iso) => !VAIN_MAA || iso === VAIN_MAA);

if (!MAAT.length) {
  console.error(`Ei maita ajettavaksi${VAIN_MAA ? ` (--maa ${VAIN_MAA})` : ''}.`);
  process.exit(2);
}

/* --------------------------------------------------------- palvelin */

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.geojson': 'application/json',
  '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/* ----------------------------------------------------------- ämpäri */

/*
 * ÄMPÄRI KULKEE NODEN KAUTTA, EI SELAIMEN (sama perustelu kuin
 * savuke-kohdekaupungit): kontin selain ei osaa agenttivälitystä, Noden
 * fetch osaa. Ilman oikeaa luetteloa yksikään nosto ei olisi poltettu,
 * ja juuri poltetut merkit ovat tämän portin toinen puoli.
 */
const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
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
const luettelo = await ampariHaku(`${AMPARI}julisteet/pyramidi/pyramidi.json`);
if (luettelo?.status !== 200) {
  console.error('Ämpäri ei vastaa — mitään ei olisi poltettu, eikä portti mittaisi puoltakaan.');
  console.error('Aja NODE_USE_ENV_PROXY=1 ja tarkista verkko.');
  palvelin.close();
  process.exit(2);
}
console.log(`Laattaluettelo ämpäristä: ${JSON.parse(luettelo.body.toString()).versio}`);

/* ---------------------------------------------------------- selain */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 }, deviceScaleFactor: 2, reducedMotion: 'reduce',
});
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
  });
});
await sivu.route(/wikimedia\.org/, (route) => route.abort());

/** Pelitila, jossa nappula seisoo annetussa kaupungissa. */
function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

/*
 * KELLUVAT KORTIT POIS TYYLILLÄ (sama perustelu kuin savukkeissa):
 * pöllön paneeli ja päiväkirjan lappu palaavat jokaisen asettumisen
 * jälkeen, joten poisto ei pysy — CSS pysyy. Kartan omiin kerroksiin
 * tämä ei koske.
 */
const PEITTO_POIS = '.pollo-paneeli, .pollo-nappi, .fokusvirta-kupla, .fact-card,'
  + ' .pollo-vihje, .paivakirjalappu, .reveal { display: none !important; }';

/** Kartta esiin: kortit kiinni, kunnes mikään ei enää sulkeudu. */
async function siivoa() {
  for (let i = 0; i < 8; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const painoi = await sivu.evaluate(() => {
      const nappi = [...document.querySelectorAll('button')].find((b) => b.getClientRects().length
        && (/^Jatka/.test(b.textContent?.trim() ?? '')
          || b.classList.contains('minipopup-sulje')
          || b.classList.contains('fokuskohde-sulje')
          || b.getAttribute('aria-label') === 'Sulje'));
      if (!nappi) return false;
      nappi.click();
      return true;
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => {
      for (const solmu of document.querySelectorAll(
        '.minipopup, .pollo-paneeli, .paivakirjalappu, .reveal, .fokuskohde-popup',
      )) solmu.remove();
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.keyboard.press('Escape');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(180);
    if (!painoi && i > 2) break;
  }
}

/** Näkymä pelaajan kaupunkiin (sama kaava kuin savuke-kohdekaupungit). */
async function keskitaKaupunkiin(tunnus) {
  await sivu.evaluate((id) => {
    const ui = window.matkakirja.ui;
    const kaupunki = (ui.game.pack.cities ?? []).find((c) => c.id === id);
    if (!kaupunki) return;
    ui.zoomKohde = { x: kaupunki.x, y: kaupunki.y, id: kaupunki.id };
    ui.panX = null;
    ui.panY = null;
    ui.kartta.fitViewBox();
    ui.taydennaTaide({ heti: true });
  }, tunnus);
  await sivu.waitForTimeout(1100);
}

const jana = () => sivu.evaluate(
  () => document.querySelector('.fokus-jana-maksimi')?.textContent ?? null,
);
const janaKm = (teksti) => Number(String(teksti ?? '').replace(',', '.').replace(/[^\d.]/g, ''));

/** Zoomaa ja keskitä, kunnes mittajana on haluttu (savuke-kohdekaupungit). */
async function zoomaaJanaan(kaupunki, tavoiteKm) {
  for (let i = 0; i < 24; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await keskitaKaupunkiin(kaupunki);
    // eslint-disable-next-line no-await-in-loop
    const nyt = janaKm(await jana());
    if (nyt === tavoiteKm) return true;
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate((suunta) => window.matkakirja.ui.kartta.zoomaaPainikkeella(suunta),
      nyt > tavoiteKm ? 1 : -1);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(550);
  }
  return janaKm(await jana()) === tavoiteKm;
}

/** Maan koko näkymä: kamera maan omaan ikkunaan. */
async function ajaMaanIkkunaan() {
  await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const bbox = ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox;
    if (!bbox) return;
    ui.kartta.ajaKamera({ bbox, marginaali: 0 });
  });
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(() => window.matkakirja.ui.taydennaTaide({ heti: true }));
  await sivu.waitForTimeout(1100);
}

/* =================================================================
 *  MITTAUS RUUDULTA
 * ================================================================= */

/*
 * MERKKIEN KERUU TAPAHTUU SELAIMESSA, KOSKA VAIN SIELLÄ ON RUUTU.
 * Yksi rivi merkkiä kohti: laji, tunnus, nimi, ruutupaikka, näkyykö
 * nimi ja mitä selaimen osumatesti merkin kohdalta löytää.
 */
const KERAA = async () => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const M = await import('/js/fokuskohteet.js');
  const nakyva = ui.nakyvaAlue?.();
  const kerros = document.querySelector('.karttanimet');
  const ctm = kerros?.getScreenCTM?.();
  const ruudulle = (x, y) => (ctm
    ? { x: ctm.a * x + ctm.c * y + ctm.e, y: ctm.b * x + ctm.d * y + ctm.f }
    : { x: NaN, y: NaN });
  const W = window.innerWidth;
  const H = window.innerHeight;
  /*
   * REUNAKAISTA POIS. Nimikerros tekee solmun vain näkymään, ja
   * kohdekerros piirtää merkin hieman reunan yli — aivan laidassa oleva
   * merkki näyttäisi nimettömältä ilman että mikään on vialla. Sama
   * vara kuin savuke-kohdekaupungeilla.
   */
  const REUNA = 70;
  const ruudulla = (x, y) => x > REUNA && x < W - REUNA && y > REUNA && y < H - REUNA;

  const norm = (s) => String(s ?? '').normalize('NFC').replace(/…/g, '')
    .replace(/\s+/g, ' ').trim().toLowerCase();

  /* Kaikki nimikerroksen tekstit ruudulla — elävän nimen todiste. */
  const tekstit = [...(kerros?.querySelectorAll('text.karttanimi') ?? [])].map((e) => {
    const r = e.getBoundingClientRect();
    return {
      teksti: e.textContent ?? '',
      norm: norm(e.textContent),
      laji: (e.getAttribute('class') ?? '').replace('karttanimi karttanimi-', ''),
      kohde: e.dataset.kohde ?? null,
      cx: r.x + r.width / 2,
      cy: r.y + r.height / 2,
      r,
    };
  }).filter((t) => t.r.width > 0 && t.r.height > 0);

  /** Onko tämä nimi ruudulla merkin lähellä? */
  const NIMEN_SADE = 90;
  const nimiLahella = (nimi, x, y) => {
    const n = norm(nimi);
    if (!n) return null;
    let paras = null;
    for (const t of tekstit) {
      if (t.norm !== n && !t.norm.startsWith(n.slice(0, Math.min(n.length, 10)))) continue;
      const d = Math.hypot(t.cx - x, t.cy - y);
      if (d <= NIMEN_SADE && (!paras || d < paras.d)) paras = { t, d };
    }
    return paras;
  };

  /** Mitä selaimen osumatesti tästä kohdasta löytää? */
  const osumaKohdassa = (x, y) => {
    const e = document.elementFromPoint(x, y);
    if (!e) return { loytyi: false, ketju: 'null' };
    const kohde = e.closest?.('[data-kohde]');
    const elain = e.closest?.('[data-elaintaky]');
    const maasto = e.closest?.('[data-maasto]');
    return {
      loytyi: Boolean(kohde || elain || maasto),
      kohde: kohde?.getAttribute('data-kohde') ?? null,
      elain: elain?.getAttribute('data-elaintaky') ?? null,
      maasto: maasto?.getAttribute('data-maasto') ?? null,
      ketju: `${e.tagName}.${(e.getAttribute?.('class') ?? '').slice(0, 60)}`,
    };
  };

  const merkit = [];
  const lisaa = (rivi) => {
    if (!Number.isFinite(rivi.x) || !Number.isFinite(rivi.y)) return;
    if (!ruudulla(rivi.x, rivi.y)) return;
    merkit.push(rivi);
  };

  /* ---- 1. OMAN MAAN KOHDEMERKIT (elävät ja poltetut) ------------- */
  const tietueet = new Map((ui.fokuskohdeRyhmat ?? []).map((r) => [r.id, r]));
  const kerrosPiilossa = Boolean(ui.fokuskohdeKerros?.classList?.contains('fokuskohteet-piilossa'));
  if (!kerrosPiilossa) {
    for (const g of ui.fokuskohdeKerros?.querySelectorAll('.fokuskohde') ?? []) {
      /*
       * NAAPURIN OSUMAMUODOT OVAT SAMASSA KERROKSESSA mutta eivät
       * saman ladonnan tietueita (js/fokuskohteet.js
       * asetaNaapurinOsumat) — niiden nimen todiste on laatan
       * poltettu nimiö, jonka kohta 2 lukee ladonnasta.
       */
      if (g.classList.contains('fokuskohde-naapuri')) continue;
      const id = g.dataset.kohde;
      const r = tietueet.get(id);
      const kohde = ui.fokuskohdeTiedot?.get(id);
      const osuma = g.querySelector('.fokuskohde-osuma');
      const laatikko = osuma?.getBoundingClientRect();
      if (!laatikko || !(laatikko.width > 0)) continue;
      const x = laatikko.x + laatikko.width / 2;
      const y = laatikko.y + laatikko.height / 2;
      const nimi = r?.nimi ?? kohde?.nimio ?? '';
      /*
       * POLTETUN NIMIÖN TODISTE ON SEN NAPAUTUSALUE. Nimi on laatan
       * pikseleitä eikä DOMissa; peli laskee sen laatikon samalla
       * ladonnalla, jolla se poltettiin (asetaPoltetutTekstiOsumat), ja
       * leveydetön alue tarkoittaa: nimiö EI mahtunut laattaan.
       */
      const poltettuLaatikko = r?.poltettu
        ? r.tekstiOsuma?.getBoundingClientRect() ?? null
        : null;
      const poltettuNimi = Boolean(poltettuLaatikko && poltettuLaatikko.width > 1);
      const elavaNimi = nimiLahella(nimi, x, y);
      lisaa({
        lahde: 'kohde',
        laji: kohde?.tyyppi ?? 'kohde',
        symboli: r?.symboli ?? null,
        poltettu: Boolean(r?.poltettu),
        id,
        nimi,
        x,
        y,
        nimiNakyy: Boolean(elavaNimi) || poltettuNimi,
        /*
         * KAUPUNKIKOHTEELLA NIMI ON LAUDAN OMA KAUPUNGINNIMI, eikä
         * ladonta anna sille erillistä nimiötä (Raamattu: kaupunki on
         * poikkeus). Nimetön kohde ei siis ole löydös.
         */
        nimiVapaaehtoinen: !nimi,
        /*
         * POLTTOVELKA: nimiö on LADONNASSA mutta tingitty naapurin
         * symbolin päälle (js/fokuskohteet.js SYMBOLI EI JÄÄ ILMAN
         * NIMEÄ). Poltetulla merkillä se tarkoittaa, että LAATASSA
         * nimeä ei vielä ole — ruudulla on paljas symboli, kunnes
         * nostotaso poltetaan uudestaan.
         */
        polttovelka: Boolean(r?.poltettu && r?.nimioPakotettu),
        osuma: osumaKohdassa(x, y),
      });
    }
  }

  /* ---- 2. NAAPURIMAIDEN POLTETUT MERKIT -------------------------- */
  /*
   * VAIN KUN NOSTOTASO ON RUUDULLA. Poltettu nosto on nostotason
   * laattojen mustetta; yleiskuvassa niitä laattoja ei ole, eikä
   * naapurin merkkiä silloin näy kartalla — laskematon merkki olisi
   * pelkkää kohinaa raportissa.
   */
  const nostotasoNakyy = Boolean(document.querySelector('.pyramidi-nostotaso image'));
  for (const m of (nostotasoNakyy ? M.naapurienPoltetutMerkit?.(ui, nakyva) : null) ?? []) {
    const p = ruudulle(m.x, m.y);
    const nimioPaikka = m.nimio
      ? ruudulle((m.nimio.x0 + m.nimio.x1) / 2, (m.nimio.y0 + m.nimio.y1) / 2)
      : null;
    lisaa({
      lahde: 'naapuri',
      laji: m.kohde?.tyyppi ?? 'kohde',
      symboli: m.kohde?.symboli ?? null,
      poltettu: true,
      iso: m.iso,
      id: m.id,
      nimi: m.nimi ?? '',
      x: p.x,
      y: p.y,
      nimiNakyy: Boolean(m.nimio),
      nimiVapaaehtoinen: !m.nimi,
      polttovelka: Boolean(m.pakotettu),
      osuma: osumaKohdassa(p.x, p.y),
      nimionOsuma: nimioPaikka ? osumaKohdassa(nimioPaikka.x, nimioPaikka.y) : null,
    });
  }

  /* ---- 3. NIMIKERROKSEN VUORIKOLMIOT ----------------------------- */
  for (const e of kerros?.querySelectorAll('.karttamerkki-vuori') ?? []) {
    const r = e.getBoundingClientRect();
    const x = r.x + r.width / 2;
    const y = r.y + r.height / 2;
    /* Kolmio on ladottu nimensä kanssa; nimi on lähin maastonimi. */
    let lahin = null;
    for (const t of tekstit) {
      if (t.laji !== 'vuori') continue;
      const d = Math.hypot(t.cx - x, t.cy - y);
      if (!lahin || d < lahin.d) lahin = { t, d };
    }
    const nimetty = Boolean(lahin && lahin.d < 120);
    lisaa({
      lahde: 'maasto',
      laji: 'vuorikolmio',
      id: nimetty ? lahin.t.teksti : null,
      nimi: nimetty ? lahin.t.teksti : '',
      x,
      y,
      nimiNakyy: nimetty,
      osuma: osumaKohdassa(x, y),
    });
  }

  /* ---- 4. MAASTONIMET (vuori, järvi, joki) ----------------------- */
  for (const t of tekstit) {
    if (t.laji === 'kaupunki' || t.laji === 'kohde') continue;
    lisaa({
      lahde: 'maastonimi',
      laji: t.laji,
      id: t.teksti,
      nimi: t.teksti,
      x: t.cx,
      y: t.cy,
      nimiNakyy: true,
      osuma: osumaKohdassa(t.cx, t.cy),
    });
  }

  /* ---- 5. ELÄINTÄYT --------------------------------------------- */
  const elainKerros = ui.elaintakyKerros;
  if (elainKerros?.isConnected && getComputedStyle(elainKerros).display !== 'none') {
    for (const g of elainKerros.querySelectorAll('.elaintaky-merkki')) {
      const osuma = g.querySelector('.elaintaky-osuma');
      const r = osuma?.getBoundingClientRect();
      if (!r || !(r.width > 0)) continue;
      const x = r.x + r.width / 2;
      const y = r.y + r.height / 2;
      lisaa({
        lahde: 'elain',
        laji: 'elaintaky',
        id: g.dataset.elaintaky ?? null,
        nimi: (g.getAttribute('aria-label') ?? '').split(': ').pop() ?? '',
        x,
        y,
        /*
         * SYMBOLI JA NIMIÖ OVAT SAMASSA RASTERISSA tai samassa laatassa:
         * eläinmerkin olemassaolo on sen nimen olemassaolo.
         */
        nimiNakyy: true,
        osuma: osumaKohdassa(x, y),
      });
    }
  }

  return {
    jana: document.querySelector('.fokus-jana-maksimi')?.textContent ?? null,
    skaala: nakyva ? +nakyva.skaala.toFixed(4) : null,
    merkit,
    tekstit: tekstit.length,
  };
});

/** Napautus ruudulle ja tieto siitä, aukesiko jokin kortti. */
async function napautaJaKatso(x, y) {
  await sivu.mouse.click(x, y);
  await sivu.waitForTimeout(450);
  const auki = await sivu.evaluate(() => {
    const kortit = [
      '.fokuskohde-popup', '.minipopup', '.elaintaky-kortti', '.hetki-kortti',
      '.skandaali-kortti', '.fokusnosto-kortti', '.syvennys-kortti',
    ];
    for (const v of kortit) {
      const e = document.querySelector(v);
      if (e && e.getClientRects().length) {
        return {
          valitsin: v,
          otsikko: (e.querySelector('h2, h3, .fokuskohde-otsikko, .minipopup-otsikko')
            ?.textContent ?? '').trim(),
        };
      }
    }
    return null;
  });
  await siivoa();
  return auki;
}

/* =================================================================
 *  AJO
 * ================================================================= */

const loydokset = [];
const yhteenveto = [];
/*
 * POLTTOVELKA ON OMA LUETTELONSA EIKÄ LÖYDÖS. Ladonta antaa merkille
 * nimen, mutta poltettu laatta on vanhempi kuin ladonta — ruudulla on
 * paljas symboli siihen asti, kunnes nostotaso poltetaan uudestaan.
 * Portti ei saa merkitä sitä vihreäksi hiljaa eikä punaiseksi
 * korjattuna: se raportoidaan erikseen ja nimeltä.
 */
const polttovelka = new Map();

/*
 * YKSI MAA EI SAA VIEDÄ KOKO AJOA. Portti kestää kymmenisen minuuttia
 * ja käy 37 maata; yksi aikakatkaisu (hidas laattahaku, roikkuva
 * kirjasin) veisi mukanaan kaiken siihen asti mitatun. Kaatunut maa
 * kirjataan LÖYDÖKSEKSI — mittaamaton maa ei ole puhdas maa.
 */
for (const iso of MAAT) {
  const kaupunki = kaupungitMaittain[iso][0];
  /* eslint-disable no-await-in-loop */
  try {
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.evaluate((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki.id));
  await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(3500);
  await sivu.addStyleTag({ content: PEITTO_POIS });
  await siivoa();

  let maanLoydot = 0;
  for (const nakyma of ['maa', '50km']) {
    if (nakyma === 'maa') {
      await keskitaKaupunkiin(kaupunki.id);
      await ajaMaanIkkunaan();
    } else {
      await zoomaaJanaan(kaupunki.id, 50);
    }
    await siivoa();
    await sivu.waitForTimeout(1400);

    const tulos = await KERAA();
    for (const m of tulos.merkit) {
      if (m.polttovelka) polttovelka.set(`${m.iso ?? iso}/${m.id}`, m.nimi);
    }
    const rikki = tulos.merkit.filter((m) => (!m.nimiNakyy && !m.nimiVapaaehtoinen)
      || !m.osuma.loytyi);
    for (const m of rikki) {
      loydokset.push({
        maa: iso,
        nakyma,
        jana: tulos.jana,
        lahde: m.lahde,
        laji: m.laji,
        symboli: m.symboli ?? null,
        id: m.id,
        nimi: m.nimi,
        x: Math.round(m.x),
        y: Math.round(m.y),
        puuttuu: [
          ...(!m.nimiNakyy && !m.nimiVapaaehtoinen ? ['nimi'] : []),
          ...(!m.osuma.loytyi ? ['napautus'] : []),
        ],
        osuma: m.osuma.ketju,
      });
    }
    maanLoydot += rikki.length;

    /*
     * NAPAUTUS TODEKSI OTOKSELLA. elementFromPoint kertoo, että merkin
     * kohdalla ON osumamuoto; vasta klikkaus kertoo, että se AVAA
     * kortin. Otos riittää, koska avaustie on kaikilla sama — ja koko
     * joukon klikkaaminen kestäisi tunteja.
     */
    const otos = tulos.merkit.filter((m) => m.osuma.loytyi).slice(0, NAPAUTUKSIA);
    for (const m of otos) {
      const auki = await napautaJaKatso(m.x, m.y);
      if (!auki) {
        loydokset.push({
          maa: iso,
          nakyma,
          jana: tulos.jana,
          lahde: m.lahde,
          laji: m.laji,
          id: m.id,
          nimi: m.nimi,
          x: Math.round(m.x),
          y: Math.round(m.y),
          puuttuu: ['kortti'],
          osuma: m.osuma.ketju,
        });
        maanLoydot += 1;
      }
    }

    if (KUVAKANSIO) {
      /*
       * KAAPPAUS ON TODISTE, EI MITTA. Playwright odottaa ennen
       * kaappausta kirjasinten latautumista, ja kartan omat webfontit
       * voivat jäädä roikkumaan kun ämpäri ja Commons on katkaistu —
       * mitattu AUT:ssa 30 s:n aikakatkaisu, joka kaatoi koko ajon
       * toisen maan kohdalla. Epäonnistunut kaappaus ei saa viedä
       * mukanaan 37 maan mittausta.
       */
      await sivu.screenshot({
        path: join(KUVAKANSIO, `k1-${iso}-${nakyma}.png`), timeout: 15000,
      }).catch((virhe) => console.log(`   (kaappaus ei onnistunut: ${virhe.name})`));
    }
    yhteenveto.push({
      maa: iso, nakyma, jana: tulos.jana, merkkeja: tulos.merkit.length, loydoksia: rikki.length,
    });
    console.log(`${iso} ${nakyma.padEnd(5)} jana ${String(tulos.jana).padEnd(8)}`
      + ` merkkejä ${String(tulos.merkit.length).padStart(3)}`
      + ` löydöksiä ${String(rikki.length).padStart(3)}`);
  }
  if (maanLoydot) {
    for (const l of loydokset.filter((v) => v.maa === iso)) {
      console.log(`   ${l.nakyma.padEnd(5)} ${l.lahde}/${l.laji}`
        + ` ${String(l.id ?? '-').padEnd(34)} "${l.nimi}"`
        + ` (${l.x},${l.y}) puuttuu: ${l.puuttuu.join('+')} [${l.osuma}]`);
    }
  }
  } catch (virhe) {
    console.log(`${iso} KAATUI — ${virhe.name}: ${String(virhe.message).split('\n')[0]}`);
    loydokset.push({
      maa: iso, nakyma: '-', lahde: 'ajo', laji: 'virhe', id: null, nimi: virhe.name, puuttuu: ['mittaus'], osuma: '',
    });
  }
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();

/* --------------------------------------------------------- raportti */

console.log('\n================ RAPORTTI ================');
const maittain = {};
for (const l of loydokset) maittain[l.maa] = (maittain[l.maa] ?? 0) + 1;
for (const rivi of yhteenveto) {
  console.log(`${rivi.maa} ${rivi.nakyma.padEnd(5)} merkkejä ${String(rivi.merkkeja).padStart(3)}`
    + ` löydöksiä ${String(rivi.loydoksia).padStart(3)}`);
}
console.log(`\nLöydöksiä yhteensä ${loydokset.length} / maita ${MAAT.length}`);
for (const [maa, n] of Object.entries(maittain).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${maa}: ${n}`);
}
if (polttovelka.size) {
  console.log(`\nPOLTTOVELKA ${polttovelka.size} merkkiä — nimiö on LADONNASSA mutta`);
  console.log('laatta on vanhempi: ruudulla paljas symboli, kunnes nostotaso');
  console.log('poltetaan uudestaan (js/fokuskohteet.js SYMBOLI EI JÄÄ ILMAN NIMEÄ).');
  for (const [avain, nimi] of [...polttovelka].sort()) console.log(`  ${avain} "${nimi}"`);
}
if (KUVAKANSIO) {
  writeFileSync(join(KUVAKANSIO, 'karttamerkit.json'),
    JSON.stringify({
      yhteenveto, loydokset, polttovelka: [...polttovelka],
    }, null, 1));
}
process.exit(loydokset.length ? 1 : 0);
