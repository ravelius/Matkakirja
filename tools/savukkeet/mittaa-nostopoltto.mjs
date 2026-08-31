/*
 * MITTANAUHA: POLTETTU MERKKI JA ELÄVÄ OSUMAMUOTO SAMASSA PISTEESSÄ.
 *
 * Tämä ei ole savuke vaan MITTA, ja se on olemassa yhtä lukua varten:
 * kuinka monen ruutupikselin päässä laattaan poltettu merkki on siitä
 * näkymättömästä ympyrästä, jota sormi napauttaa. Raamattu (omistaja
 * 31.8.2026, KARTTANOSTOT POLTETAAN LAATTOIHIN) vaatii, että ne tulevat
 * samasta laskennasta; tämä kertoo, onnistuiko se.
 *
 * === MIKSI LAATTAA EI RENDERÖIDÄ TÄSSÄ ============================
 *
 * Laattapyramidin ajo on erikseen luvitettava työnkulku (omistaja
 * 31.8.2026: *"omistaja antaa luvan ajoon erikseen"*), eikä sitä saa
 * käynnistää tarkistuksen sivutuotteena. Poltettu kerros piirretään
 * siksi TÄSSÄ, samalla funktiolla ja samasta datasta kuin laatassa
 * (js/fokusnosto-symbolit.js piirraNostosymPolttoon,
 * tools/fokuskartta/nostot.mjs) — vain kangas on eri. Se on juuri se
 * osa, jota mittaus koskee: sijainti ja koko, eivät webp-pakkaus tai
 * patina.
 *
 * Kangas asetellaan kartan omalla muunnoksella (`getScreenCTM`), joten
 * yksi lautayksikkö on kankaalla täsmälleen yhtä monta pikseliä kuin
 * pelin kartalla. Laatassa sama suhde tulee tason tiheydestä.
 *
 * === MITÄ AJO TUOTTAA ==============================================
 *
 *   1. luvut: pahin ja mediaani poikkeama pikseleinä
 *   2. kuvat: elävä, poltettu ja rinnakkain
 *
 * Ajo: node tools/savukkeet/mittaa-nostopoltto.mjs [kohdekansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { keraaNostot, nostojenYhteenveto } from '../fokuskartta/nostot.mjs';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';

/** Kameran varakohde kaupungeittain, jos peli ei ole vielä ladannut lehteä. */
const POHJAT = {
  ateena: FOKUS_POHJAT.GRC.rajaus,
  dubrovnik: FOKUS_POHJAT.HRV.rajaus,
  rooma: FOKUS_POHJAT.ITA.rajaus,
};

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const ULOS = process.argv[2] ?? join(JUURI, 'kaappaukset-nostopoltto');
mkdirSync(ULOS, { recursive: true });

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/* --------------------------------------------------- poltettava erä */

const poltto = keraaNostot(MAAILMANKARTTA);
console.log(nostojenYhteenveto(poltto.tilasto));
const poltettavat = poltto.merkit.filter((m) => m.poltettava);

/*
 * LUETTELO, JOKA KERTOO MITKÄ NOSTOT ON POLTETTU. Peli lukee sen
 * verkosta (js/laattapyramidi.js haeLuettelo), joten koe tarjoilee sen
 * samalta osoitteelta — ei kiertotietä pelin sisään.
 *
 * `tasot` on tyhjää mutta kelvollista geometriaa: koe ei lataa yhtään
 * laattaa, koska poltettu kerros piirretään tässä.
 */
const LUETTELO = {
  versio: 'koe',
  lauta: 'maailmankartta',
  laatta: 512,
  muoto: 'webp',
  arkki: { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 },
  nimiot: false,
  nostot: poltto.luettelo,
  tasot: [{
    z: 0, leveys: 675, korkeus: 411, pikseliaPerYksikko: 0.05625,
    sarakkeita: 2, riveja: 1, laatasto: null,
  }],
};

/* ------------------------------------------------------------ selain */

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaa(kaupunki, ruutu, poltettuna) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  const ctx = await selain.newContext({ viewport: ruutu, reducedMotion: 'reduce' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, JSON.stringify(peli.toJSON()));
  const sivu = await ctx.newPage();
  /*
   * JÄRJESTYS ON TÄRKEÄ: Playwright kokeilee reittejä VIIMEKSI
   * REKISTERÖIDYSTÄ ALKAEN, ja luettelo asuu samassa ämpärissä kuin
   * kuvat. Jos kuvareitti rekisteröitäisiin jälkimmäisenä, se
   * vastaisi pyramidi.jsoniin yhdellä pikselillä ja koko koe mittaisi
   * tilaa, jossa mitään ei ole poltettu.
   */
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route(/pyramidi\.json/, (route) => route.fulfill({
    status: poltettuna ? 200 : 404,
    contentType: 'application/json',
    body: JSON.stringify(LUETTELO),
  }));
  /*
   * LAATTOJA EI OLE. Koe ei renderöi pyramidia (ks. tiedoston alku),
   * joten laattapyyntöihin vastataan 404 eikä korvikepikselillä —
   * yksi venytetty pikseli maalaisi kartan yli ja peittäisi juuri sen,
   * mitä ollaan katsomassa. Ilman laattoja alla on pelin oma
   * pergamentti, ja poltettu kerros näkyy sellaisenaan.
   */
  await sivu.route(/\/pyramidi\/koe\//, (route) => route.fulfill({ status: 404, body: '' }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(2500);
  /*
   * KAMERA LEHDEN IKKUNAAN. Sivun lataus kesken pelin ei aja kameraa
   * (js/fokuskartta.js), joten kartta jää yleiskuvaan — ja siellä
   * merkkikerros on tarkoituksella piilossa (js/fokuskohteet.js
   * LEHDEN_VAHIN_OSUUS). Ajo on sama kuin savuke-fokuskohteet.mjs:llä,
   * ja se päättyy siihen näkymään, johon pelin oma saapuminen päättyy.
   */
  await sivu.evaluate((rajaus) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({ bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? rajaus, marginaali: 0 });
  }, POHJAT[kaupunki] ?? null);
  await sivu.waitForTimeout(4200);
  /*
   * PELIN OMAT PANEELIT POIS KUVASTA. Pöllön kupla ja matkapäiväkirja
   * ovat kartan päällä eivätkä kuulu tähän mittaan; ne peittäisivät
   * juuri sen ryppään, jota katsotaan.
   */
  await sivu.addStyleTag({
    content: '.pollo-paneeli, .fokusvirta-kortti, .fokusvirta-kupla,'
      + ' .matkakirjakortti, .matkakirja-kortti, .lehtivinkki'
      + ' { display: none !important; }',
  });
  await sivu.waitForTimeout(300);
  return { ctx, sivu };
}

/**
 * POLTETTU KERROS KANKAALLE — sama funktio ja sama data kuin laatassa.
 *
 * Kangas menee kartan SVG:n ALLE (z-index), jolloin ruudulla on
 * täsmälleen se kerrosjärjestys, joka pelissä on: laatta pohjalla,
 * pelitila päällä.
 */
async function piirraPoltettu(sivu, merkit) {
  return sivu.evaluate(async ([data]) => {
    const { piirraNostosymPolttoon } = await import('./js/fokusnosto-symbolit.js');
    const ui = window.matkakirja.ui;
    const svg = ui.svg;
    const ctm = svg.getScreenCTM();
    const dpr = window.devicePixelRatio || 1;
    const vanha = document.getElementById('koe-poltto');
    if (vanha) vanha.remove();
    const kangas = document.createElement('canvas');
    kangas.id = 'koe-poltto';
    kangas.width = Math.round(window.innerWidth * dpr);
    kangas.height = Math.round(window.innerHeight * dpr);
    Object.assign(kangas.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      pointerEvents: 'none',
      zIndex: '1',
    });
    document.body.appendChild(kangas);
    const ctx = kangas.getContext('2d');
    ctx.scale(dpr, dpr);
    // Laudan piste ruudun pikseleiksi kartan omalla muunnoksella.
    const ruutuX = (x, y) => ctm.a * x + ctm.c * y + ctm.e;
    const ruutuY = (x, y) => ctm.b * x + ctm.d * y + ctm.f;
    const skaala = Math.hypot(ctm.a, ctm.b);
    const paikat = {};
    for (const m of data) {
      const mx = ruutuX(m.x, m.y);
      const my = ruutuY(m.x, m.y);
      paikat[m.tunnus] = { x: mx, y: my };
      if (mx < -200 || my < -200 || mx > window.innerWidth + 200
        || my > window.innerHeight + 200) continue;
      const v = m.viiva;
      if (v) {
        ctx.save();
        ctx.strokeStyle = v.vari;
        ctx.globalAlpha = v.himmeys;
        ctx.lineCap = 'round';
        ctx.lineWidth = Math.max(0.2, v.leveys * skaala);
        ctx.setLineDash([v.katko * skaala, v.katko * skaala]);
        ctx.beginPath();
        ctx.moveTo(ruutuX(v.x1, v.y1), ruutuY(v.x1, v.y1));
        ctx.lineTo(ruutuX(v.x2, v.y2), ruutuY(v.x2, v.y2));
        ctx.stroke();
        ctx.restore();
      }
      ctx.save();
      ctx.translate(mx, my);
      piirraNostosymPolttoon(ctx, m, m.porras * skaala);
      ctx.restore();
    }
    return { paikat, skaala };
  }, [merkit]);
}

/**
 * LÄHIKUVAN RAJAUS: nykyisen kaupungin laatta ja sen sarake ruudulla.
 * Rypäs on se kohta, jota omistaja katsoo — koko lehden kaappauksessa
 * merkit ovat muutaman pikselin kokoisia.
 */
const ryppaanRajaus = (sivu, kaupunki) => sivu.evaluate((id) => {
  const ui = window.matkakirja.ui;
  const city = (ui.game.pack.cities ?? []).find((k) => k.id === id);
  if (!city) return null;
  const ctm = ui.svg.getScreenCTM();
  const x = ctm.a * city.x + ctm.c * city.y + ctm.e;
  const y = ctm.b * city.x + ctm.d * city.y + ctm.f;
  const w = 420;
  const h = 340;
  return {
    x: Math.max(0, Math.min(window.innerWidth - w, x - w * 0.35)),
    y: Math.max(0, Math.min(window.innerHeight - h, y - h / 2)),
    width: w,
    height: h,
  };
}, kaupunki);

/** Elävien osumamuotojen keskipisteet ruudun pikseleinä. */
const osumat = (sivu) => sivu.evaluate(() => {
  const ulos = {};
  for (const g of document.querySelectorAll('.fokuskohde')) {
    const muoto = g.querySelector('.fokuskohde-osuma');
    if (!muoto) continue;
    const r = muoto.getBoundingClientRect();
    if (!(r.width > 0)) continue;
    const p = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    // Kiertävällä laudalla sama tunnus on kahdesti; lähempi ruudun
    // keskustaan on se kopio, jota katsotaan.
    const vanha = ulos[g.dataset.kohde];
    const keski = Math.abs(p.x - window.innerWidth / 2);
    if (!vanha || keski < vanha.keski) ulos[g.dataset.kohde] = { ...p, keski };
  }
  return ulos;
});

const RUUTU = { width: 834, height: 1112 };
const KOKEET = [
  { nimi: 'ateena', kaupunki: 'ateena', iso: 'GRC' },
  { nimi: 'dubrovnik', kaupunki: 'dubrovnik', iso: 'HRV' },
  { nimi: 'rooma', kaupunki: 'rooma', iso: 'ITA' },
];

const rivit = [];
for (const koe of KOKEET) {
  /* ---- 1. elävä perustila (luetteloa ei ole: mitään ei ole poltettu) */
  // eslint-disable-next-line no-await-in-loop
  const elava = await avaa(koe.kaupunki, RUUTU, false);
  // eslint-disable-next-line no-await-in-loop
  await elava.sivu.screenshot({ path: join(ULOS, `nostopoltto-${koe.nimi}-elava.png`) });
  // eslint-disable-next-line no-await-in-loop
  const rypas = await ryppaanRajaus(elava.sivu, koe.kaupunki);
  // eslint-disable-next-line no-await-in-loop
  if (rypas) {
    await elava.sivu.screenshot({
      path: join(ULOS, `nostopoltto-${koe.nimi}-elava-lahi.png`), clip: rypas,
    });
  }
  // eslint-disable-next-line no-await-in-loop
  const elavatOsumat = await osumat(elava.sivu);
  // eslint-disable-next-line no-await-in-loop
  await elava.ctx.close();

  /* ---- 2. poltettu: luettelo kertoo, mitkä merkit ovat laatassa */
  // eslint-disable-next-line no-await-in-loop
  const poltettu = await avaa(koe.kaupunki, RUUTU, true);
  // eslint-disable-next-line no-await-in-loop
  const { paikat, skaala } = await piirraPoltettu(poltettu.sivu, poltettavat);
  // eslint-disable-next-line no-await-in-loop
  await poltettu.sivu.screenshot({ path: join(ULOS, `nostopoltto-${koe.nimi}-poltettu.png`) });
  // eslint-disable-next-line no-await-in-loop
  const rypas2 = await ryppaanRajaus(poltettu.sivu, koe.kaupunki);
  // eslint-disable-next-line no-await-in-loop
  if (rypas2) {
    await poltettu.sivu.screenshot({
      path: join(ULOS, `nostopoltto-${koe.nimi}-poltettu-lahi.png`), clip: rypas2,
    });
  }
  /*
   * KUMMAT MERKIT OVAT ELÄVIÄ TÄSSÄ NÄKYMÄSSÄ? Poltetun ja elävän
   * kerroksen on tarkoitus olla kartalla rinnakkain (omistaja
   * 31.8.2026), ja tämä kertoo, mitkä merkit näkyvässä ryppäässä
   * kuuluvat kumpaan.
   */
  // eslint-disable-next-line no-await-in-loop
  const elavatNyt = await poltettu.sivu.evaluate(() => [...document.querySelectorAll('.fokuskohde')]
    // Luokka on ANKKURIRYHMÄSSÄ (js/fokuskohteet.js merkitsePoltetutNostot),
    // koska se on se solmu, jonka tietueen passi tuntee.
    .filter((g) => !g.parentNode?.classList?.contains('fokuskohde-poltettu'))
    .map((g) => g.dataset.kohde));
  // eslint-disable-next-line no-await-in-loop
  const poltetutOsumat = await osumat(poltettu.sivu);
  // eslint-disable-next-line no-await-in-loop
  await poltettu.ctx.close();

  /* ---- 3. mitta: poltetun merkin ja elävän osumamuodon ero ---------- */
  const erot = [];
  for (const [tunnus, p] of Object.entries(paikat)) {
    const o = poltetutOsumat[tunnus];
    if (!o) continue;
    erot.push({ tunnus, ero: Math.hypot(p.x - o.x, p.y - o.y) });
  }
  erot.sort((a, b) => a.ero - b.ero);
  const pahin = erot[erot.length - 1];
  const mediaani = erot.length ? erot[Math.floor(erot.length / 2)].ero : 0;
  rivit.push({
    elavaksiJaaneet: [...new Set(elavatNyt)],
    koe: koe.nimi,
    iso: koe.iso,
    skaala,
    verrattuja: erot.length,
    elavia: Object.keys(elavatOsumat).length,
    poltettuja: Object.keys(poltetutOsumat).length,
    pahin: pahin?.ero ?? 0,
    pahinTunnus: pahin?.tunnus ?? '-',
    mediaani,
  });
}

console.log('');
console.log('kaupunki    merkkejä  ruutuskaala  verrattuja  mediaaniero  pahin ero (px)');
for (const r of rivit) {
  console.log(`${r.koe.padEnd(12)}${String(r.poltettuja).padEnd(10)}`
    + `${r.skaala.toFixed(3).padEnd(13)}${String(r.verrattuja).padEnd(12)}`
    + `${r.mediaani.toFixed(4).padEnd(13)}${r.pahin.toFixed(4)} (${r.pahinTunnus})`);
}
writeFileSync(join(ULOS, 'mitat.json'), JSON.stringify(rivit, null, 1));

await selain.close();
palvelin.close();
