/*
 * Savuke: HISTORIAN HETKET — tiimalasimerkki, kortti ja kuvakaruselli
 * (js/historian-hetket.js, js/packs/historian-hetket.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA. Datatesti
 * (tests/historian-hetket.test.mjs) vartioi tunnukset, kuvat ja
 * lehtisivut, mutta ei sitä, mitä ruudulle piirtyy. Juuri siihen tuli
 * 3.9.2026 uusi riski: photo-v3-erän mukana hetki sai KOLMANNEN kuvan,
 * aikakauden lehtisivun rekonstruktion, ja se on PYSTYKUVA
 * (1024 × 1536) kahden vaakakuvan rinnalla. Pystykuva on juuri se
 * tapaus, jossa kortin kuvakehys leikkasi ennen pään pois (omistajan
 * havainto 1.9.2026, Sofian patsas), ja leikkaus näkyy vain kuvasta —
 * ei yhdestäkään datatestistä.
 *
 * VARTIOT:
 *   1. MERKIT KARTALLA. Espanjan neljä historian hetkeä ovat kartan
 *      kohdekerroksessa tiimalasisymbolilla ja sormenmittaisella
 *      osumalla.
 *   2. KORTTI AUKEAA MERKISTÄ, ja siinä on ylärivi, otsikko,
 *      paikka–päiväys-rivi, kuva kuvatekstineen ja lähderiveineen sekä
 *      minivisa.
 *   3. KARUSELLI NÄYTTÄÄ 2–3 KUVAA. Trafalgarilla on kolme (lähi,
 *      kauko, lehti) ja laskuri sanoo sen; nuoli vaihtaa kuvan, ja
 *      kuvateksti sekä lähderivi vaihtuvat sen mukana.
 *   4. PYSTYKUVA EI LEIKKAANNU. Lehtikuvan renderöity kuvasuhde on
 *      sama kuin tiedoston oma (± 2 %), kuva mahtuu kortin sisään
 *      kokonaan, eivätkä selailunuolet leiju kuvan ulkopuolella.
 *   5. SUURENNOS SÄILYTTÄÄ SUHTEEN. Napautus avaa saman pystykuvan
 *      koko ruudulle ilman rajausta.
 *
 * KUVAT HAETAAN OIKEASTI, JOS VERKKO ANTAA. Kuvasuhdetta ei voi mitata
 * 1 × 1 -korvikkeella, jota muut savukkeet käyttävät, joten tämä hakee
 * ämpärin kuvat curlilla ja tarjoilee ne selaimelle. Jos verkkoa ei
 * ole, tilalle tehdään oikean kokoinen yksivärinen PNG — kuvasuhde on
 * silloinkin tosi, mutta kaappauksesta ei näe sommittelua.
 */
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { deflateSync } from 'node:zlib';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { HISTORIAN_HETKET, hetkenKuvat } from '../../js/packs/historian-hetket.js';
import { TAKY_PALKKIO } from '../../js/fokusvirta.js';

/** Hetki, jolla on kolme kuvaa — mittauskohde on sen lehtikuva. */
const KOLMIKUVAINEN = 'trafalgar-victory-1805';

/** Kaupunki, jonka maan (ESP) hetket kartalle piirtyvät. */
const KAUPUNKI = 'sevilla';

/** Kuvien luonnolliset mitat: vaakakuvat 1536 × 1024, lehtikuva 1024 × 1536. */
const MITAT = { lahi: [1536, 1024], kauko: [1536, 1024], lehti: [1024, 1536] };

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset/historian-hetket';
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

mkdirSync(KAAPPAUKSET, { recursive: true });

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ==================== KUVAT SELAIMELLE ==================== */

/** CRC-taulu PNG-lohkoille. */
const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (puskuri) => {
  let c = 0xffffffff;
  for (const tavu of puskuri) c = CRC[(c ^ tavu) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const lohko = (tyyppi, data) => {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const runko = Buffer.concat([Buffer.from(tyyppi, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(runko));
  return Buffer.concat([pituus, runko, crc]);
};

/** Yksivärinen PNG annetun kokoisena — oikea kuvasuhde ilman verkkoa. */
function paikkaPng(leveys, korkeus) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8 bittiä, RGB
  const rivi = Buffer.alloc(leveys * 3 + 1, 0x9a);
  rivi[0] = 0;
  const raaka = Buffer.concat(Array.from({ length: korkeus }, () => rivi));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka)),
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * Ämpärin kuvat muistiin: oikea kuva jos verkko vastaa, muuten oikean
 * kokoinen paikkakuva. Kumpikin antaa mittaukselle todet mitat.
 */
const varasto = new Map();
let oikeita = 0;
for (const hetki of HISTORIAN_HETKET) {
  for (const kuva of hetkenKuvat(hetki)) {
    const [w, h] = MITAT[kuva.rooli] ?? [1536, 1024];
    let tavut = null;
    try {
      /*
       * curl eikä fetch: Noden oma fetch kulkee välityspalvelimen läpi
       * vain, jos NODE_USE_ENV_PROXY on asetettu ENNEN prosessin
       * käynnistystä (CLAUDE.md). curl lukee HTTPS_PROXY:n
       * sellaisenaan, joten savuke toimii ilman ajokohtaista ympäristöä.
       */
      const ulos = execFileSync('curl', ['-sfL', '--max-time', '30', kuva.osoite],
        { maxBuffer: 32 * 1024 * 1024, encoding: 'buffer' });
      if (ulos?.length > 1000) tavut = Buffer.from(ulos);
    } catch { /* offline — paikkakuva riittää mittaukseen */ }
    if (tavut) oikeita += 1;
    varasto.set(new URL(kuva.osoite).pathname, {
      tyyppi: tavut ? 'image/jpeg' : 'image/png',
      tavut: tavut ?? paikkaPng(w, h),
    });
  }
}
console.log(`kuvia varastossa ${varasto.size}, niistä ämpäristä ${oikeita}\n`);

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/* ==================== PELI PYSTYYN ==================== */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Pelitallenne: Fogg seisoo annetussa kaupungissa. */
function tallenne(id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 },
  reducedMotion: 'reduce',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-fokusmoodi');
  } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
}, tallenne(KAUPUNKI));
const sivu = await ctx.newPage();
/*
 * HETKIKUVAT TARJOILLAAN VARASTOSTA, muut ämpärin ja Commonsin kuvat
 * korvataan pikselillä kuten muissakin savukkeissa. Tarkempi reitti on
 * rekisteröitävä ENSIN yleisemmän jälkeen (Playwright kokeilee
 * reittejä käänteisessä järjestyksessä).
 */
await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
  status: 200, contentType: 'image/png', body: PIKSELI,
}));
await sivu.route('**/kohtaamiset/historian-hetket/**', (route) => {
  const kuva = varasto.get(new URL(route.request().url()).pathname);
  if (!kuva) { route.fulfill({ status: 404, body: '' }); return; }
  route.fulfill({ status: 200, contentType: kuva.tyyppi, body: kuva.tavut });
});
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
  null, { timeout: 60000 }).catch(() => {});
await sivu.waitForTimeout(2500);
// Kamera maan fokusikkunaan, kuten savuke-fokuskohteessa: merkkien
// peruskoko on ankkuroitu juuri siihen näkymään (js/ui.js).
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.ajaKamera({ bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox, marginaali: 0 });
});
await sivu.waitForTimeout(4200);

/* ==================== 1: MERKIT KARTALLA ==================== */

const hetkimerkit = () => sivu.evaluate(() => [...document.querySelectorAll('.fokuskohde')]
  .filter((g) => (g.dataset.kohde ?? '').startsWith('hetki-'))
  .map((g) => {
    const osuma = g.querySelector('.fokuskohde-osuma')?.getBoundingClientRect();
    const rasteri = g.querySelector('.nostosym-rasteri');
    return {
      id: g.dataset.kohde,
      symboli: rasteri?.dataset.symboli ?? null,
      nimio: rasteri?.dataset.nimio ?? null,
      lapimitta: osuma ? Math.round(osuma.width) : 0,
      keski: osuma && osuma.width > 0
        ? { x: osuma.left + osuma.width / 2, y: osuma.top + osuma.height / 2 }
        : null,
      ruudulla: Boolean(osuma && osuma.width > 0 && osuma.left > 20 && osuma.top > 20
        && osuma.right < window.innerWidth - 20 && osuma.bottom < window.innerHeight - 20),
    };
  }));

const merkit = await hetkimerkit();
const espanjanHetket = HISTORIAN_HETKET.filter((h) => h.kartalla && h.iso === 'ESP');
const tunnukset = new Set(merkit.map((m) => m.id));
vaadi('Espanjan kaikki historian hetket ovat kartalla',
  espanjanHetket.every((h) => tunnukset.has(`hetki-${h.id}`)),
  `${[...tunnukset].join(', ')} — odotettiin ${espanjanHetket.map((h) => h.id).join(', ')}`);
vaadi('merkki on tiimalasi ja kantaa hetken nimiön',
  merkit.length > 0 && merkit.every((m) => m.symboli === 'hetki' && (m.nimio ?? '').length > 0),
  JSON.stringify(merkit.map((m) => [m.symboli, m.nimio]).slice(0, 4)));
vaadi('osuma-alue on sormen mitta (≥ 44 px)',
  merkit.every((m) => m.lapimitta >= 43.5),
  JSON.stringify(merkit.map((m) => m.lapimitta)));

/* ==================== 2–4: KORTTI JA KARUSELLI ==================== */

/** Auki olevan hetkikortin sisältö ja kuvan mitat. */
const kortti = () => sivu.evaluate(() => {
  const k = document.querySelector('.hetki-kortti');
  if (!k) return null;
  const img = k.querySelector('.hetki-kuva img');
  const r = img?.getBoundingClientRect();
  const nappi = k.querySelector('.hetki-kuva .fokusnosto-kuvanappi')?.getBoundingClientRect();
  const kortinKehys = k.getBoundingClientRect();
  return {
    ylarivi: k.querySelector('.fokusnosto-ylarivi')?.textContent ?? '',
    otsikko: k.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    meta: k.querySelector('.fokusnosto-lahde')?.textContent ?? '',
    teksti: [...k.querySelectorAll('.fokusnosto-teksti p')]
      .map((p) => (p.textContent ?? '').trim()).join(' '),
    kuvateksti: k.querySelector('.fokusnosto-kuvaselite')?.textContent ?? '',
    kuvalahde: k.querySelector('.fokusnosto-kuvalahde')?.textContent ?? '',
    havainnekuvaNappi: Boolean(k.querySelector('.havainnekuva-selite')),
    laskuri: k.querySelector('.hetki-kuvalaskuri')?.textContent ?? '',
    nuolia: k.querySelectorAll('.hetki-kuvanuoli').length,
    visa: k.querySelector('.fokusvirta-visa-kysymys')?.textContent ?? '',
    vaihtoehtoja: k.querySelectorAll('.fokusvirta-vaihtoehdot button').length,
    kuva: img ? {
      src: img.getAttribute('src') ?? '',
      luonnollinen: img.naturalWidth && img.naturalHeight
        ? img.naturalWidth / img.naturalHeight : null,
      renderoity: r && r.height ? r.width / r.height : null,
      leveys: r ? Math.round(r.width) : 0,
      korkeus: r ? Math.round(r.height) : 0,
      kortissa: Boolean(r && kortinKehys
        && r.left >= kortinKehys.left - 1 && r.right <= kortinKehys.right + 1),
      ruudulla: Boolean(r && r.top >= -1 && r.bottom <= window.innerHeight + 1),
      // Nuolet ja laskuri asemoituvat kuvanappiin: jos nappi on kuvaa
      // leveämpi, nuolet leijuvat kortin pohjan päällä eivätkä kuvassa.
      nappiaLeveampi: Boolean(nappi && r && nappi.width - r.width > 2),
    } : null,
  };
});

const kolme = merkit.find((m) => m.id === `hetki-${KOLMIKUVAINEN}` && m.keski);
vaadi(`${KOLMIKUVAINEN} on ruudulla napautettavissa`,
  Boolean(kolme), JSON.stringify(merkit.map((m) => [m.id, m.ruudulla])));

await sivu.mouse.click(Math.round(kolme.keski.x), Math.round(kolme.keski.y));
await sivu.waitForTimeout(1200);
const auki = await kortti();
const hetki = HISTORIAN_HETKET.find((h) => h.id === KOLMIKUVAINEN);
const kuvat = hetkenKuvat(hetki);

vaadi('kortti aukeaa merkistä', Boolean(auki), 'korttia ei löytynyt');
vaadi('kortissa on ylärivi, otsikko ja paikka–päiväys-rivi',
  auki?.ylarivi.includes('Historian hetket') && auki?.otsikko === hetki.otsikko
  && auki?.meta.includes(hetki.paivays),
  JSON.stringify([auki?.ylarivi, auki?.otsikko, auki?.meta]));
vaadi('kortin teksti on pakan teksti',
  (auki?.teksti ?? '').replace(/\s+/g, ' ') === hetki.teksti.replace(/\s+/g, ' '),
  `${(auki?.teksti ?? '').slice(0, 60)}…`);
vaadi('kortissa on minivisa kolmella vaihtoehdolla',
  auki?.visa === hetki.visa.kysymys && auki?.vaihtoehtoja === 3,
  `${auki?.visa} (${auki?.vaihtoehtoja})`);
vaadi('pääkuva on lähikuva ja sen kuvateksti pakasta',
  (auki?.kuva?.src ?? '').endsWith(kuvat[0].tiedosto)
  && auki?.kuvateksti === kuvat[0].kuvateksti,
  auki?.kuva?.src);
vaadi('lähderivistä kasvaa havainnekuvan selite',
  auki?.havainnekuvaNappi, auki?.kuvalahde);
vaadi('karuselli kertoo kuvien määrän ja tarjoaa nuolet',
  auki?.laskuri === `1 / ${kuvat.length}` && auki?.nuolia === 2 && kuvat.length === 3,
  `${auki?.laskuri}, nuolia ${auki?.nuolia}`);

await sivu.screenshot({ path: join(KAAPPAUKSET, 'hetki-kortti-lahikuva.png') });

/** Selaa karusellia yksi askel eteenpäin. */
async function seuraavaKuva() {
  await sivu.evaluate(() => document.querySelector('.hetki-kuvanuoli.seuraava')?.click());
  await sivu.waitForTimeout(700);
  return kortti();
}

const kaukokuva = await seuraavaKuva();
vaadi('nuoli vaihtaa kaukokuvaan, ja kuvateksti vaihtuu mukana',
  (kaukokuva?.kuva?.src ?? '').endsWith(kuvat[1].tiedosto)
  && kaukokuva?.kuvateksti === kuvat[1].kuvateksti
  && kaukokuva?.laskuri === `2 / ${kuvat.length}`,
  `${kaukokuva?.laskuri}: ${(kaukokuva?.kuvateksti ?? '').slice(0, 50)}…`);

const lehtikuva = await seuraavaKuva();
vaadi('kolmas kuva on aikakauden lehtisivu',
  (lehtikuva?.kuva?.src ?? '').endsWith(kuvat[2].tiedosto)
  && lehtikuva?.laskuri === `3 / ${kuvat.length}`,
  `${lehtikuva?.laskuri}: ${lehtikuva?.kuva?.src}`);

/* --- 4: pystykuva ei leikkaannu --- */

const k = lehtikuva?.kuva ?? {};
vaadi('lehtikuva on pystykuva myös selaimen mielestä',
  Boolean(k.luonnollinen) && k.luonnollinen < 0.8,
  `luonnollinen suhde ${k.luonnollinen}`);
vaadi('renderöity kuvasuhde on sama kuin tiedoston (ei rajausta)',
  Boolean(k.luonnollinen && k.renderoity)
  && Math.abs(k.renderoity - k.luonnollinen) / k.luonnollinen < 0.02,
  `luonnollinen ${k.luonnollinen?.toFixed(3)} vs renderöity ${k.renderoity?.toFixed(3)}`);
vaadi('pystykuva mahtuu kortin sisään kokonaan',
  Boolean(k.kortissa && k.ruudulla),
  `${k.leveys} × ${k.korkeus}, kortissa=${k.kortissa}, ruudulla=${k.ruudulla}`);
vaadi('selailunuolet asemoituvat kuvaan eivätkä sen viereiseen tyhjään',
  k.nappiaLeveampi === false,
  `kuvanappi on ${k.nappiaLeveampi ? 'leveämpi kuin' : 'kuvan levyinen'} kuva`);

await sivu.screenshot({ path: join(KAAPPAUKSET, 'hetki-kortti-lehtikuva.png') });

/* ==================== 5: SUURENNOS ==================== */

await sivu.evaluate(() => document.querySelector('.hetki-kuva .fokusnosto-kuvanappi')?.click());
await sivu.waitForTimeout(1400);
const zoom = await sivu.evaluate(() => {
  const img = document.querySelector('.fokuskohde-zoom .fokuskohde-zoomkuva');
  if (!img) return null;
  const r = img.getBoundingClientRect();
  return {
    src: img.getAttribute('src') ?? '',
    luonnollinen: img.naturalWidth && img.naturalHeight
      ? img.naturalWidth / img.naturalHeight : null,
    renderoity: r.height ? r.width / r.height : null,
    ruudulla: r.top >= -1 && r.bottom <= window.innerHeight + 1
      && r.left >= -1 && r.right <= window.innerWidth + 1,
  };
});
vaadi('napautus avaa saman pystykuvan suurennoksena',
  Boolean(zoom) && zoom.src.endsWith(kuvat[2].tiedosto), zoom?.src);
vaadi('suurennos säilyttää kuvasuhteen eikä valu ruudun ulkopuolelle',
  Boolean(zoom?.luonnollinen && zoom?.renderoity)
  && Math.abs(zoom.renderoity - zoom.luonnollinen) / zoom.luonnollinen < 0.02
  && zoom.ruudulla,
  `${zoom?.luonnollinen?.toFixed(3)} vs ${zoom?.renderoity?.toFixed(3)}, ruudulla=${zoom?.ruudulla}`);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'hetki-suurennos-lehtikuva.png') });

/* ==================== 6: VISA MAKSAA KERRAN ==================== */

await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(700);
const rahaEnnen = await sivu.evaluate(() => window.matkakirja.ui.game.player.money);
await sivu.evaluate((oikea) => {
  document.querySelectorAll('.fokusvirta-vaihtoehdot button')[oikea]?.click();
}, hetki.visa.oikea);
await sivu.waitForTimeout(900);
const rahaJalkeen = await sivu.evaluate(() => window.matkakirja.ui.game.player.money);
vaadi('oikea vastaus maksaa minivisan palkkion',
  rahaJalkeen === rahaEnnen + TAKY_PALKKIO, `${rahaEnnen} → ${rahaJalkeen}`);

await sivu.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await sivu.waitForTimeout(600);
await sivu.mouse.click(Math.round(kolme.keski.x), Math.round(kolme.keski.y));
await sivu.waitForTimeout(1000);
const uudelleen = await sivu.evaluate(() => (
  document.querySelector('.hetki-kortti .fokusvirta-visa-tulos')?.textContent ?? ''
));
vaadi('toinen avaus kertoo visaan jo vastatun',
  uudelleen.includes('jo vastattu'), uudelleen);
vaadi('toinen avaus ei tuplaa palkkiota',
  (await sivu.evaluate(() => window.matkakirja.ui.game.player.money)) === rahaJalkeen,
  `${rahaJalkeen}`);

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
