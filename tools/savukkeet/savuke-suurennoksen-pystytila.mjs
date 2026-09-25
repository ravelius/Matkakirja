/*
 * Savuke: SUURENNOKSEN PYSTYTILA JA LYHYEN KUVATEKSTIN LINKKI.
 *
 * Omistajan vikailmoitus 12.9.2026, sanatarkasti: *"Näissä kuvissa on
 * turhaan ylhäällä ja alhaalla pieni marginaali. Lisäksi tässä
 * lyhyessä kuvatekstissä ei saa olla tuota havainnekuvalinkkiä. Se
 * näkyy vasta pidemmässä kuvatekstissä."* (iPhone-kaappaus: Ateena,
 * PuluCam-kuva suurennettuna isoisän ja Pulun albumissa.)
 *
 * MIKSI TÄMÄ ON SELAINSAVUKE EIKÄ YKSIKKÖTESTI. Turha pystytila ei
 * ollut CSS:n marginaali eikä täyte vaan KUVAELEMENTIN SISÄINEN
 * kirjekuori: JS antaa kehykselle ja kuvalle saman leveysluvun
 * (js/fokusvirta.js avaaSuurennos mitoita), ja niin kauan kuin kehys
 * oli `border-box`, kuva kutistui `max-width: 100%` -säännöllä
 * sisennyksen verran kapeammaksi mutta säilytti JS:n antaman
 * korkeuden. Kuvasuhde ei enää täsmännyt, ja `object-fit: contain`
 * piirsi eron kuvan ylä- ja alalaitaan. Sellaista eroa ei näe
 * mistään DOM-puusta — se on mitattava oikealla selaimella
 * vertaamalla kuvaelementin laatikkoa kuvan omaan kuvasuhteeseen.
 *
 * VARTIOT (jokainen kolmella ruudulla ja kummallakin kuvasuunnalla):
 *   1. KIRJEKUORI ON NOLLA: kuvaelementin sisällä piirretty kuva
 *      täyttää elementin pystysuunnassa (ero alle 1 px).
 *   2. KEHYS ON KIINNI KUVASSA: kuvan yläreunan ja kehyksen yläreunan
 *      väliin jää vain paperireunus (alle 12 px), samoin kuvatekstin
 *      alareunan ja kehyksen alareunan väliin.
 *   3. KUVATEKSTIPALKKI ON YHÄ OLEMASSA JA LUETTAVA (korkeus > 12 px)
 *      — omistajan linjaus 24.8.2026: teksti on mustetta paperilla.
 *   4. LYHYESSÄ KUVATEKSTISSÄ EI OLE HAVAINNEKUVALINKKIÄ, vaikka
 *      kuvan lähde on "Matkakirjan havainnekuva".
 *   5. KORTTI MAHTUU RUUDULLE (kehys ei valu laitojen yli).
 *
 * KOEKUVAT PIIRRETÄÄN TÄSSÄ (yksivärinen PNG kahdessa kuvasuhteessa):
 * repoon ei tuoda mediaa, ja tunnettu kuvasuhde on koko mittauksen
 * ydin — PYSTYKUVA on se, joka paljastaa väärän suhteen selvimmin.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-suurennoksen-pystytila.mjs
 */
import http from 'node:http';
import zlib from 'node:zlib';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;

/* ---------- koekuvat: yksivärinen PNG tunnetussa kuvasuhteessa ---------- */

const CRC = (() => {
  const t = [];
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let crc = 0xffffffff;
  for (const b of buf) crc = CRC[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function pala(tyyppi, data) {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const runko = Buffer.concat([Buffer.from(tyyppi, 'ascii'), data]);
  const tarke = Buffer.alloc(4);
  tarke.writeUInt32BE(crc32(runko));
  return Buffer.concat([pituus, runko, tarke]);
}
function teePng(leveys, korkeus, [r, g, b]) {
  const rivi = Buffer.alloc(1 + leveys * 3);
  for (let x = 0; x < leveys; x += 1) {
    rivi[1 + x * 3] = r; rivi[2 + x * 3] = g; rivi[3 + x * 3] = b;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pala('IHDR', ihdr),
    pala('IDAT', zlib.deflateSync(Buffer.concat(Array.from({ length: korkeus }, () => rivi)))),
    pala('IEND', Buffer.alloc(0)),
  ]);
}
const KUVAT = {
  vaaka: { png: teePng(1600, 1000, [150, 100, 50]), suhde: 1.6 },
  pysty: { png: teePng(1000, 1600, [60, 100, 150]), suhde: 0.625 },
};

/* ---------- palvelin ---------- */

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  if (p === '/koe/vaaka.png' || p === '/koe/pysty.png') {
    res.writeHead(200, { 'content-type': 'image/png' });
    res.end(p.includes('vaaka') ? KUVAT.vaaka.png : KUVAT.pysty.png);
    return;
  }
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

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
if (kirjasto?.status !== 200) console.log('HUOM  ämpäri ei vastaa — pallo ei lataudu');

/* ---------- vartiot ---------- */

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const KAUPUNKI = 'ateena';
/*
 * KAIKKIEN KOEKUVIEN LÄHDE ON HAVAINNEKUVA: vartio 4 katsoo juuri
 * sitä, ettei linkki tule lyhyeen kuvatekstiin edes silloin, kun
 * lähde sen sanoisi.
 */
const koekuvat = (suunta) => ({
  luentakuva: {
    osoite: `/koe/${suunta}.png`,
    lyhyt: 'Ateena: kultaa sisällä, hyvä varjo puutarhassa.',
    selite: 'Koekuva isoisän matkakirjasta: Ateena auringossa.',
    lahde: 'Matkakirjan havainnekuva',
  },
  kuvat: [
    {
      osoite: `/koe/${suunta}.png`,
      lyhyt: 'Pulu portailla.',
      selite: 'PULU-CAM: pulu portailla, ihastus jo toisaalla.',
      lahde: 'Matkakirjan havainnekuva',
    },
    {
      osoite: `/koe/${suunta}.png`,
      lyhyt: 'Pulu katolla.',
      selite: 'PULU-CAM: pulu katolla, kaupunki auringossa.',
      lahde: 'Matkakirjan havainnekuva',
    },
  ],
});

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const RUUDUT = [
  ['puhelin 390x844', { width: 390, height: 844 }],
  ['iPad 834x1194', { width: 834, height: 1194 }],
  ['työpöytä 1280x800', { width: 1280, height: 800 }],
];

/** Suurennoksen laatikot ja kuvan oma kuvasuhde yhdellä lukemalla. */
const LUE = () => {
  const laatikko = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {
      x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1),
      ala: +b.bottom.toFixed(1), oikea: +b.right.toFixed(1),
    };
  };
  const kehys = document.querySelector('.fokuszoom-kehys');
  const img = document.querySelector('.fokuszoom-kuva');
  const teksti = document.querySelector('.fokuszoom-teksti');
  if (!kehys || !img) return null;
  const kb = img.getBoundingClientRect();
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  // object-fit: contain — paljonko kuvasta OIKEASTI piirtyy elementtiin.
  const k = nw && nh ? Math.min(kb.width / nw, kb.height / nh) : 0;
  return {
    kehys: laatikko(kehys),
    kuvatila: laatikko(document.querySelector('.fokuszoom-kuvatila')),
    kuva: laatikko(img),
    teksti: laatikko(teksti),
    natural: { w: nw, h: nh },
    piirretty: { w: +(nw * k).toFixed(1), h: +(nh * k).toFixed(1) },
    linkkeja: document.querySelectorAll('.fokuszoom-selite .havainnekuva-linkki,'
      + ' .fokuszoom-selite .havainnekuva-selite').length,
    selite: document.querySelector('.fokuszoom-selite')?.textContent ?? '',
    ruutu: { w: window.innerWidth, h: window.innerHeight },
  };
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function mittaa(viewport, suunta) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
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
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(6000);

  await sivu.evaluate(async ([id, koe]) => {
    const { FOKUSVIRRAT } = await import('/js/packs/fokusvirrat.js');
    FOKUSVIRRAT[id].matkakirja.luentakuva = koe.luentakuva;
    FOKUSVIRRAT[id].pollo.kuvat = koe.kuvat;
  }, [KAUPUNKI, koekuvat(suunta)]);

  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
  }, KAUPUNKI);
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { window.matkakirja.ui.diaryVoice?.pause(); });

  // Pakka nousee pulun kommentin myötä; odota kunnes kortit ovat ruudulla.
  for (let i = 0; i < 250; i += 1) {
    const n = await sivu.evaluate(() => document.querySelectorAll('.pulucam-kuva').length);
    if (n >= 2) break;
    await sivu.waitForTimeout(200);
  }

  /*
   * ENSIMMÄINEN NAPAUTUS voi vain nostaa kortin päälle (pakan oma
   * sääntö); karuselli aukeaa vasta päällimmäisen napautuksesta.
   */
  const napauta = () => sivu.evaluate(() => {
    const kortti = document.querySelector('.pulucam-kortti.pulucam-paalla .pulucam-kuva')
      ?? document.querySelector('.pulucam-kuva')
      ?? document.querySelector('.fokusvirta-luentakuva .fokusvirta-kuva');
    if (!kortti) return false;
    kortti.click();
    return true;
  });
  for (let i = 0; i < 5; i += 1) {
    if (await sivu.evaluate(() => Boolean(document.querySelector('.fokuszoom')))) break;
    await napauta();
    await sivu.waitForTimeout(900);
  }
  /*
   * KASVUANIMAATIO ON ODOTETTAVA LOPPUUN: kesken muunnoksen
   * getBoundingClientRect palauttaa ankkurin mitat eikä kortin omia.
   */
  await sivu.waitForFunction(() => {
    const k = document.querySelector('.fokuszoom-kehys');
    return k && getComputedStyle(k).transform === 'none';
  }, null, { timeout: 15000 }).catch(() => console.log('HUOM  kasvuanimaatio ei asettunut'));
  await sivu.waitForTimeout(400);

  const mitat = await sivu.evaluate(LUE);
  await ctx.close();
  return mitat;
}

for (const suunta of ['vaaka', 'pysty']) {
  for (const [nimi, viewport] of RUUDUT) {
    const m = await mittaa(viewport, suunta);
    const tunnus = `${suunta} / ${nimi}`;
    if (!m) { vaadi(`${tunnus}: suurennos aukesi`, false, 'kerrosta ei syntynyt'); continue; }
    const kirjekuori = +((m.kuva.h - m.piirretty.h) / 2).toFixed(1);
    const ylavali = +(m.kuva.y - m.kehys.y).toFixed(1);
    const alavali = +(m.kehys.ala - (m.teksti?.ala ?? m.kuva.ala)).toFixed(1);
    console.log(`INFO  ${tunnus}: kehys ${m.kehys.w}x${m.kehys.h}, kuva ${m.kuva.w}x${m.kuva.h}, `
      + `piirretty ${m.piirretty.w}x${m.piirretty.h}, kirjekuori ${kirjekuori} px, `
      + `ylä ${ylavali} px, ala ${alavali} px, teksti ${m.teksti?.h ?? 0} px`);
    vaadi(`${tunnus}: kuvassa ei kirjekuorireunoja`, kirjekuori <= 1,
      `kuvan ylä- ja alalaitaan jäi ${kirjekuori} px turhaa tilaa`);
    vaadi(`${tunnus}: kehys on kiinni kuvassa`, ylavali >= 0 && ylavali <= 12,
      `kuvan yläpuolelle jäi ${ylavali} px`);
    vaadi(`${tunnus}: kehyksen alareuna on kiinni tekstissä`, alavali >= 0 && alavali <= 12,
      `tekstin alapuolelle jäi ${alavali} px`);
    vaadi(`${tunnus}: kuvatekstipalkki on luettava`, (m.teksti?.h ?? 0) > 12,
      `kuvatekstipalkki kutistui ${m.teksti?.h ?? 0} px korkeaksi`);
    vaadi(`${tunnus}: lyhyessä kuvatekstissä ei ole havainnekuvalinkkiä`, m.linkkeja === 0,
      `selitteessä on ${m.linkkeja} linkkiä: "${m.selite}"`);
    vaadi(`${tunnus}: kortti mahtuu ruudulle`,
      m.kehys.x >= -1 && m.kehys.y >= -1
      && m.kehys.oikea <= m.ruutu.w + 1 && m.kehys.ala <= m.ruutu.h + 1,
      `kehys ${JSON.stringify(m.kehys)} ruudulla ${JSON.stringify(m.ruutu)}`);
  }
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
