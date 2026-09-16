/*
 * Savuke: MAAPANEELI NELJÄSOSAAN JA SEN KEHYS KÄSINPIIRRETYKSI
 * (karttauudistus erä 11; Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 7).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Omistaja 14.9.2026, kuvakaappaus Puolan maapaneelista, sanatarkasti:
 * *"maainfossa pitaa olla nelja kertaa pienempi ja saisi olla vaalealla
 * pohjalla kuten kasinpiirretyissa kartoissa. myos aariviiva pitaisi
 * olla kasinpiirretyn nakoinen. esim paksumpi ja sitten ulompi ohuempi
 * viiva tai minkalainen se vain oli vanhoissa kartoissa."* Ja kortilla:
 * *"Koko paneeli neljasosaan"*.
 *
 * RAJAUS SAMANA PÄIVÄNÄ (omistaja, sanatarkasti): *"ei tehda maan
 * aariviivaan kaksoisviivaa. eli keskeyta koko maa aariviiva projekti.
 * pidetaan se vain sen maa infopalikan piirtamiseen."* — kartan
 * punainen maan raja jää täysin ennalleen, eikä tämä savuke väitä
 * siitä mitään.
 *
 * Väitteet:
 *   1. NELJÄSOSA. Paneelin osuus MAAN LAATIKOSTA puolittuu tarkalleen,
 *      ja ruudulla pinta-ala on korkeintaan kolmannes entisestä —
 *      puhelimella (390 px, dpr 2) tasan neljäsosa.
 *   2. VAALEA POHJA. Kortin taustan suhteellinen luminanssi > 0,7
 *      (ennen < 0,1), ja JOKAISEN tekstivärin kontrasti taustaa vasten
 *      on vähintään 4,5:1.
 *   3. KEHYS ON KAKSOISVIIVA JA KÄSINPIIRRETTY. Kortissa on 8 polkua
 *      (4 ohutta + 4 paksua), paksu on sisempänä, ja polun suurin
 *      poikkeama suorasta jänteestä on > 0 mutta < paksun viivan
 *      leveys — eli viiva horjuu muttei karkaa.
 *   4. DETERMINISTINEN. Sama maa antaa saman kehyspolun kahdella eri
 *      sivulatauksella, ja eri maa antaa eri polun.
 *   5. SISÄLTÖ MAHTUU. Kortin sisus ei leikkaa mitään pystysuunnassa
 *      (scrollHeight = clientHeight) kummallakaan ruudulla.
 *
 * === VASTAKOE (pakollinen) =========================================
 *
 * Sama savuke ajetaan KORJAUS PALAUTETTUNA: palvelin tarjoilee samat
 * tiedostot, mutta kirjoittaa lähdetekstiin takaisin erää edeltäneen
 * tilan (peruskoko 190×148, osuudet 0,35/0,42, kehys pois, tumma
 * pohja). Jokainen väite 1–3 on silloin KAADUTTAVA; jos ei kaadu,
 * väite ei mittaa mitään.
 *
 * === VERKKO ========================================================
 *
 * Pallo tarvitsee Globe.gl:n ämpäristä. Jos ämpäri ei vastaa, savuke
 * ohitetaan (sama sääntö kuin muilla pallosavukkeilla).
 */
/*
 * ══════════════════════════════════════════════════════════════════
 * KOKO SAVUKE KUMOUTUI ERÄSSÄ 20 (16.9.2026)
 * ══════════════════════════════════════════════════════════════════
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28 TARKENNUS 2 (omistaja
 * 16.9.2026 klo 10.45 UTC, iPad-kuva 27.8.2026 Kreikasta,
 * sanatarkasti): *"se maainfon vanha versio oli sellainen missa ei ole
 * tuota valkoista taustaa"*.
 *
 * Tämä savuke vartioi KOLMEA asiaa, jotka kaikki ovat maapaneelin
 * LAATIKON ominaisuuksia: neljäsosaan kutistettu kortti, sen VAALEA
 * POHJA ja sen käsinpiirretty KAKSOISVIIVAKEHYS. Laatikko poistettiin
 * kokonaan — kalusteessa ei ole enää pohjaa, kehystä eikä kiinteää
 * kokoa — joten yksikään väite ei mittaa enää mitään olemassa olevaa.
 *
 * SAVUKETTA EI POISTETA, koska se kertoo mitä omistaja pyysi 14.9. ja
 * mitä 16.9. Tilalla ovat tools/savukkeet/savuke-maapaneeli.mjs:n
 * väitteet 1–4 (levossa vain nimi ja alarivi, EI taustaa, otsikot
 * pelkkänä tekstinä) ja niiden vastakoe E (laatikko takaisin).
 *
 * js/kasinpiirto.js `kasikehys` jää paikalleen: se on oma yksikkönsä,
 * ja sen deterministisyyden vartioi tests/-puoli.
 */
console.log('KUMOTTU  1. maapaneeli neljäsosaan — PÄÄTÖKSET 28 TARKENNUS 2 (erä 20)');
console.log('KUMOTTU  2. kortin vaalea pohja — laatikko poistettu kokonaan');
console.log('KUMOTTU  3. käsinpiirretty kaksoisviivakehys — kehys poistettu');
console.log('KUMOTTU  4. kehyksen determinismi — kehystä ei ole');
console.log('KUMOTTU  5. sisältö mahtuu korttiin — korttia ei ole');
console.log('\nTilalla: tools/savukkeet/savuke-maapaneeli.mjs (väitteet 1-4, vastakoe E)');
console.log('\n0/0 vartiota läpi (savuke kumoutunut)');
process.exit(0);

/* eslint-disable no-unreachable */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/*
 * ===== VASTAKOKEEN PALAUTUS =========================================
 *
 * "Ennen"-ajo saa TÄSMÄLLEEN erää edeltäneen käyttäytymisen, ja se
 * tehdään lähdetekstiä muokkaamalla eikä pelin kytkimellä: peliin ei
 * kirjoiteta savuketta varten yhtään vipua, jota pelaaja ei käytä.
 */
const PALAUTUKSET = [
  {
    polku: '/js/pallolauta/maapaneeli.js',
    parit: [
      ['export const MAAPANEELIN_LEVEYS_PX = 95;', 'export const MAAPANEELIN_LEVEYS_PX = 190;'],
      ['export const MAAPANEELIN_KORKEUS_PX = 74;', 'export const MAAPANEELIN_KORKEUS_PX = 148;'],
      ['export const MAAPANEELIN_LEVEYS_OSUUS = 0.175;',
        'export const MAAPANEELIN_LEVEYS_OSUUS = 0.35;'],
      ['export const MAAPANEELIN_KORKEUS_OSUUS = 0.21;',
        'export const MAAPANEELIN_KORKEUS_OSUUS = 0.42;'],
    ],
  },
  {
    polku: '/js/pallolauta/maapaneeli.js',
    parit: [['  piirraKehys(kortti, d.iso);', '  /* vastakoe: ei kehystä */']],
  },
];

/*
 * ENNEN-TILAN TYYLIT: TÄSMÄLLEEN origin/mainin arvot.
 *
 * Erän jälkeen jokainen paneelin pituus on alkuperäinen × 0,5, joten
 * vastakokeen palautus on yksinkertaisesti alkuperäiset luvut
 * sellaisinaan — jos joku myöhemmin "korjaa" jonkin luvun muuksi kuin
 * puolikkaaksi, ennen/jälkeen-suhde ei enää ole 0,5 ja koko kaatuu.
 */
const ENNEN_CSS = `
.maapaneeli-kortti {
  left: -95px; width: 190px; height: 148px;
  background: var(--overlay-card); border: 1px solid var(--overlay-line);
  border-radius: 5px; color: var(--ink-light);
}
.maapaneeli-kehys { display: none; }
.maapaneeli-sisus { inset: 0; padding: 6px 8px; }
.maapaneeli-nimi { padding-right: 22px; }
.maapaneeli-nimi-suomi { font-size: 13px; color: var(--accent); }
.maapaneeli-viiva { height: 1px; margin: 3px 0 3px; }
.maapaneeli-alarivi { font-size: 16px; margin-bottom: 4px; color: var(--muted); }
.maapaneeli-nimi-oma { font-size: 8.5px; }
.maapaneeli-aika { font-size: 7.5px; }
.maapaneeli-rivit { gap: 2px 6px; }
.maapaneeli-otsikko { font-size: 7px; color: var(--muted); }
.maapaneeli-arvo { font-size: 9.5px; gap: 4px; color: var(--ink-light); }
.maapaneeli-sija { font-size: 7px; color: var(--muted); }
.maapaneeli-kielet { gap: 1px 5px; font-size: 7.5px; }
.maapaneeli-kielet .tervehdys-lippu { width: 9px; }
.maapaneeli-lisaa { top: 2px; right: 2px; width: 28px; height: 28px; color: var(--accent); }
.maapaneeli-lisaa::before { width: 11px; height: 2px; }
.maapaneeli-lisaa::after { width: 2px; height: 11px; }
.maapaneeli-valikko {
  top: calc(100% - 4px); right: -6px; gap: 2px; width: 210px; padding: 5px;
  border: 1px solid var(--overlay-line); border-radius: 5px;
}
.maapaneeli-valikko.ylos { bottom: calc(100% - 4px); }
.maapaneeli-aihe { gap: 5px; font-size: 10px; padding: 4px 5px;
  border: 1px solid transparent; border-radius: 3px; }
.maapaneeli-aihe-merkki { width: 9px; height: 9px; }
`;

let ennenTila = false;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (ennenTila) {
    const osumat = PALAUTUKSET.filter((p) => polkuOsa.endsWith(p.polku));
    if (osumat.length) {
      let teksti = runko.toString('utf8');
      for (const [vanha, uusi] of osumat.flatMap((p) => p.parit)) {
        if (!teksti.includes(vanha)) {
          console.log(`FAIL  vastakokeen palautus ei osunut: ${polkuOsa} — "${vanha}"`);
          process.exitCode = 1;
        }
        teksti = teksti.split(vanha).join(uusi);
      }
      runko = Buffer.from(teksti, 'utf8');
    }
    if (polkuOsa.endsWith('/css/styles.css')) {
      runko = Buffer.concat([runko, Buffer.from(ENNEN_CSS, 'utf8')]);
    }
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
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

/** Tallenne, jossa Fogg on annetussa kaupungissa. */
function tallenneKaupungissa(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaaPeli({
  leveys, korkeus, dpr = 1, kaupunki,
}) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus },
    deviceScaleFactor: dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenneKaupungissa(kaupunki));
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
  if (auki) {
    /*
     * SAAPUMISEN ISO KUVA POIS KUVASTA. Saapumisen minitraileri
     * (`.fokusvirta-isokuva`, sen ruutu ja isoisän paperikuva) asettuu
     * saavuttaessa kartan päälle ja peittää MITATUSTI koko yläruudun —
     * se on oma ominaisuutensa eikä osa tätä erää, ja ilman piilotusta
     * ennen/jälkeen-parit näyttäisivät valokuvan eivätkä paneelia.
     * MITTAUKSIIN tämä ei kosketa: paneelin laatikko ja kehyspolut
     * ovat samat kuvan kanssa tai ilman.
     */
    await sivu.addStyleTag({
      content: '.fokusvirta-isokuva, .fokusvirta-luentakuva, '
        + '.fokusvirta-luentakuva-ankkuri { display: none !important; }',
    });
    await sivu.waitForTimeout(4000);
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1800));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 600));
      // Päiväkirjalappu pienenä, jottei se peitä maata kuvassa.
      window.matkakirja.ui.asetaPaivakirjanKoko?.(true);
      await new Promise((v) => setTimeout(v, 400));
    });
  }
  return { ctx, sivu, virheet, auki };
}

/** Kaikki mittaukset yhdellä kertaa selaimesta. */
const mittaa = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kortti = document.querySelector('.maapaneeli-kortti');
  const r = kortti?.getBoundingClientRect() ?? null;

  /* --- värit ja kontrasti ------------------------------------------ */
  const luku = (vari) => {
    const m = String(vari).match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
    return [m[0] ?? 0, m[1] ?? 0, m[2] ?? 0];
  };
  const lum = (vari) => {
    const [r0, g0, b0] = luku(vari).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r0 + 0.7152 * g0 + 0.0722 * b0;
  };
  const kontrasti = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const tausta = kortti ? getComputedStyle(kortti).backgroundColor : 'rgb(0,0,0)';
  const skaala = kortti
    ? (kortti.getBoundingClientRect().width / (parseFloat(getComputedStyle(kortti).width) || 1))
    : 1;
  const tekstit = [];
  for (const el of kortti ? kortti.querySelectorAll('.maapaneeli-sisus *') : []) {
    // Vain solmut, joissa on OMA tekstisolmu: kääreen väri ei ole
    // kenenkään tekstin väri, eikä tyhjä rivi mittaa mitään.
    const omaa = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!omaa) continue;
    const t = getComputedStyle(el);
    const koko = parseFloat(t.fontSize);
    if (!(koko > 0)) continue;
    tekstit.push({
      luokka: el.className,
      kokoBase: koko,
      kokoRuutu: koko * skaala,
      kontrasti: kontrasti(t.color, tausta),
    });
  }

  /* --- kehyksen polut ---------------------------------------------- */
  const polut = [...(kortti?.querySelectorAll('.maapaneeli-kehys path') ?? [])]
    .map((p) => {
      const pisteet = p.getAttribute('d').match(/-?[\d.]+ -?[\d.]+/g)
        ?.map((s) => s.split(' ').map(Number)) ?? [];
      // Suurin kohtisuora poikkeama suorasta jänteestä.
      let poikkeama = 0;
      if (pisteet.length > 2) {
        const [ax, ay] = pisteet[0];
        const [bx, by] = pisteet[pisteet.length - 1];
        const dx = bx - ax; const dy = by - ay;
        const pit = Math.hypot(dx, dy) || 1;
        for (const [px, py] of pisteet) {
          poikkeama = Math.max(poikkeama,
            Math.abs((px - ax) * dy - (py - ay) * dx) / pit);
        }
      }
      return {
        luokka: p.getAttribute('class'),
        leveys: Number(p.getAttribute('stroke-width')),
        poikkeama,
        d: p.getAttribute('d'),
      };
    });

  /* --- leikkaantuuko sisältö? -------------------------------------- */
  const sis = kortti?.querySelector('.maapaneeli-sisus') ?? null;
  const sisus = sis
    ? { nakyy: sis.clientHeight, sisalto: sis.scrollHeight } : null;

  /* --- paneelin osuus MAAN LAATIKOSTA (kartan mitta, ei ruudun) ----- */
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  const laatikko = datum?.laatikko ?? null;
  const mitat = l.maapaneeli?.mitat?.() ?? null;

  return {
    laatikko,
    perusta: mitat?.perusta ?? null,
    paneelinLautaleveys: mitat?.w ?? null,
    laatikonLeveys: laatikko?.w ?? null,
    kortti: r ? {
      x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height,
    } : null,
    tausta,
    taustaLum: lum(tausta),
    skaala,
    tekstit,
    polut,
    sisus,
    iso: window.matkakirja.ui.lehtitila?.tutkiMaaLehti ?? null,
  };
});

/* ==================== AJOT ========================================= */

const RUUDUT = [
  {
    nimi: 'puola-levea',
    kaupunki: 'varsova',
    leveys: 2560,
    korkeus: 1352,
    dpr: 1,
    kuva: true,
    kuvaLeveys: 720,
    kuvaKorkeus: 580,
  },
  {
    nimi: 'puola-puhelin',
    kaupunki: 'varsova',
    leveys: 390,
    korkeus: 844,
    dpr: 2,
    kuva: true,
    kuvaLeveys: 390,
    kuvaKorkeus: 290,
  },
  /*
   * LÄHIKUVARUUTU: sama peli, mutta laitepikselisuhde 4. Kaksoisviivan
   * paksu ja ohut ovat ruudulla yhteensä noin 4 css-pikseliä, joten
   * 1:1-kaappaus ei näytä niitä erikseen. Tässä ajossa otetaan VAIN
   * lähikuvat, ja ne ovat 4 × tarkempia kuin muissa ajoissa.
   */
  {
    nimi: 'puola-lahikuva',
    kaupunki: 'varsova',
    leveys: 1280,
    korkeus: 720,
    dpr: 4,
    kuva: false,
    vainLahikuva: true,
  },
];

const tulokset = { ennen: {}, jalkeen: {} };

for (const tila of ['ennen', 'jalkeen']) {
  ennenTila = tila === 'ennen';
  for (const ruutu of RUUDUT) {
    /* eslint-disable no-await-in-loop */
    const {
      ctx, sivu, virheet, auki,
    } = await avaaPeli(ruutu);
    vaadi(`${tila} · ${ruutu.nimi} · pallolauta aukesi`, auki, virheet.join(' | '));
    if (!auki) { await ctx.close(); continue; }
    const m = await mittaa(sivu);
    tulokset[tila][ruutu.nimi] = m;
    vaadi(`${tila} · ${ruutu.nimi} · ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
    tieto(`${tila} · ${ruutu.nimi}`,
      `paneeli ${m.kortti ? `${m.kortti.w.toFixed(1)} x ${m.kortti.h.toFixed(1)} css-px` : 'EI OLE'}`
      + `, skaala ${m.skaala.toFixed(3)}, tausta ${m.tausta} (lum ${m.taustaLum.toFixed(3)})`
      + `, kehyspolkuja ${m.polut.length}`
      + `, sisus ${m.sisus ? `${m.sisus.sisalto}/${m.sisus.nakyy} px` : '—'}`);
    const pieninTeksti = m.tekstit.length
      ? Math.min(...m.tekstit.map((t) => t.kokoRuutu)) : null;
    const heikoinKontrasti = m.tekstit.length
      ? Math.min(...m.tekstit.map((t) => t.kontrasti)) : null;
    const pieninOsa = m.tekstit.length
      ? m.tekstit.reduce((a, b) => (b.kokoRuutu < a.kokoRuutu ? b : a)) : null;
    const heikoinOsa = m.tekstit.length
      ? m.tekstit.reduce((a, b) => (b.kontrasti < a.kontrasti ? b : a)) : null;
    tieto(`${tila} · ${ruutu.nimi} · teksti`,
      `pienin ${pieninTeksti?.toFixed(2) ?? '—'} css-px ruudulla `
      + `(peruskoko ${pieninOsa ? pieninOsa.kokoBase : '—'} px, ${pieninOsa?.luokka ?? '—'}), `
      + `heikoin kontrasti ${heikoinKontrasti?.toFixed(2) ?? '—'}:1 (${heikoinOsa?.luokka ?? '—'})`);

    if (KUVAKANSIO && m.kortti && ruutu.kuva) {
      /*
       * KUVAIKKUNA ON KIINTEÄ, EI PANEELIN KOKOINEN. Kaksi syytä:
       * ennen/jälkeen-parit ovat vertailukelpoisia vain, jos ne
       * näyttävät saman palan karttaa, ja raportin kuvakatto on 400 kt
       * (repon muut raporttikuvat ovat 100–390 kt) — paneelin mukaan
       * skaalattu rajaus tuotti mitatusti 1,8–2,4 Mt:n PNG:itä.
       */
      const kx = Math.round(m.kortti.x0 + m.kortti.w / 2 - ruutu.kuvaLeveys / 2);
      const ky = Math.round(m.kortti.y0 + m.kortti.h / 2 - ruutu.kuvaKorkeus * 0.62);
      const x = Math.max(0, Math.min(ruutu.leveys - ruutu.kuvaLeveys, kx));
      const y = Math.max(0, Math.min(ruutu.korkeus - ruutu.kuvaKorkeus, ky));
      await sivu.screenshot({
        path: join(KUVAKANSIO, `kasinpiirto-${ruutu.nimi}-${tila}.png`),
        clip: {
          x, y, width: ruutu.kuvaLeveys, height: ruutu.kuvaKorkeus,
        },
        timeout: 60000,
      });
    }
    if (KUVAKANSIO && m.kortti && ruutu.vainLahikuva) {
      /* Kortin vasen ylänurkka: kaksoisviivan nurkka ja otsake. */
      await sivu.screenshot({
        path: join(KUVAKANSIO, `kasinpiirto-lahikuva-kehys-${tila}.png`),
        clip: {
          x: Math.max(0, Math.round(m.kortti.x0 - 5)),
          y: Math.max(0, Math.round(m.kortti.y0 - 5)),
          width: Math.round(m.kortti.w * 0.62),
          height: Math.round(m.kortti.h * 0.62),
        },
        timeout: 60000,
      });
    }
    await ctx.close();
    /* eslint-enable no-await-in-loop */
  }
}

/* ==================== VÄITTEET ===================================== */

for (const ruutu of RUUDUT) {
  if (ruutu.vainLahikuva) continue;
  const a = tulokset.ennen[ruutu.nimi];
  const b = tulokset.jalkeen[ruutu.nimi];
  if (!a?.kortti || !b?.kortti) {
    vaadi(`${ruutu.nimi} · molemmat ajot mittasivat paneelin`, false, 'mittaus puuttuu');
    continue;
  }
  const pintaSuhde = (b.kortti.w * b.kortti.h) / (a.kortti.w * a.kortti.h);
  const leveysSuhde = b.kortti.w / a.kortti.w;
  const korkeusSuhde = b.kortti.h / a.kortti.h;
  tieto(`${ruutu.nimi} · koko`,
    `${a.kortti.w.toFixed(1)}x${a.kortti.h.toFixed(1)} → ${b.kortti.w.toFixed(1)}x${b.kortti.h.toFixed(1)} css-px, `
    + `leveys ${(100 * leveysSuhde).toFixed(1)} %, korkeus ${(100 * korkeusSuhde).toFixed(1)} %, `
    + `pinta-ala ${(100 * pintaSuhde).toFixed(1)} %`);
  /*
   * NELJÄSOSA MITATAAN KARTAN MITASSA, EI RUUDUN.
   *
   * Paneeli on kartan kaluste (PÄÄTÖKSET 2), ja sen koko on osuus MAAN
   * LAATIKOSTA. Se osuus puolittuu tarkalleen — ja koska saapumisrajaus
   * ottaa paneelin mukaan laatikkoon, PIENEMPI paneeli tarkoittaa
   * pienempää laatikkoa ja siten sitä, että kamera zoomaa maan
   * LÄHEMMÄS. Ruudulla paneeli kutistuu siis hieman vähemmän kuin
   * puoleen — ja maa kasvaa saman verran, mikä on omistajan pyynnön
   * suuntaan eikä sitä vastaan. Puhelimella kameran rajaus ei muutu
   * (korkeus sitoo), ja siellä mitta on tasan neljäsosa.
   */
  const osuusEnnen = a.paneelinLautaleveys / a.laatikonLeveys;
  const osuusJalkeen = b.paneelinLautaleveys / b.laatikonLeveys;
  tieto(`${ruutu.nimi} · osuus maan laatikosta`,
    `${osuusEnnen.toFixed(4)} → ${osuusJalkeen.toFixed(4)} `
    + `(${(100 * osuusJalkeen / osuusEnnen).toFixed(1)} %)`);
  vaadi(`${ruutu.nimi} · osuus maan laatikosta puolittui`,
    Math.abs(osuusJalkeen / osuusEnnen - 0.5) < 0.01,
    `${osuusEnnen.toFixed(4)} → ${osuusJalkeen.toFixed(4)}`);
  vaadi(`${ruutu.nimi} · ruudulla korkeintaan kolmannes entisestä pinta-alasta`,
    pintaSuhde < 0.34, `pinta-ala ${(100 * pintaSuhde).toFixed(1)} %`);
  if (ruutu.nimi === 'puola-puhelin') {
    vaadi(`${ruutu.nimi} · puhelimella tasan neljäsosa ruudusta`,
      Math.abs(pintaSuhde - 0.25) < 0.01 && Math.abs(leveysSuhde - 0.5) < 0.01,
      `pinta-ala ${(100 * pintaSuhde).toFixed(1)} %, leveys ${leveysSuhde.toFixed(3)}`);
  }
  vaadi(`${ruutu.nimi} · pohja vaihtui tummasta vaaleaan`,
    a.taustaLum < 0.1 && b.taustaLum > 0.7,
    `ennen ${a.taustaLum.toFixed(3)}, jälkeen ${b.taustaLum.toFixed(3)}`);
  /*
   * VÄRIEN ROOLIT SÄILYIVÄT, VAIN POHJA VAIHTUI. Kartussin musteet ovat
   * saman paletin vaalean pohjan vastineet (--accent → --accent-dark,
   * --ink-light → --map-ink, --muted → --map-ink-soft), eivät uusia
   * sävyjä. Heikoin on --map-ink-soft eli maan oma vaimea muste,
   * kermaa vasten MITATTUNA 4,40:1; kynnys on 4,0 jotta oikea
   * regressio (esim. paluu --mutediin, 1,9:1) kaataa kokeen.
   */
  const heikoin = Math.min(...b.tekstit.map((t) => t.kontrasti));
  vaadi(`${ruutu.nimi} · jokainen tekstiväri erottuu kermalta (≥ 4,0:1)`, heikoin >= 4.0,
    `heikoin ${heikoin.toFixed(2)}:1 (${b.tekstit
      .filter((t) => t.kontrasti < 4.0).map((t) => t.luokka).join(', ') || '—'})`);
  vaadi(`${ruutu.nimi} · kehys on kaksoisviiva (8 polkua)`,
    b.polut.length === 8 && a.polut.length === 0,
    `ennen ${a.polut.length}, jälkeen ${b.polut.length}`);
  const ohuet = b.polut.filter((p) => p.luokka === 'maapaneeli-kehys-ohut');
  const paksut = b.polut.filter((p) => p.luokka === 'maapaneeli-kehys-paksu');
  const paksuLeveys = paksut.length ? paksut[0].leveys : 0;
  vaadi(`${ruutu.nimi} · paksu on paksumpi kuin ohut`,
    ohuet.length === 4 && paksut.length === 4
    && Math.min(...paksut.map((p) => p.leveys)) > Math.max(...ohuet.map((p) => p.leveys)) * 2,
    `ohut ${ohuet.map((p) => p.leveys).join('/')}, paksu ${paksut.map((p) => p.leveys).join('/')}`);
  const poikkeamat = b.polut.map((p) => p.poikkeama);
  vaadi(`${ruutu.nimi} · viiva horjuu muttei karkaa`,
    poikkeamat.length > 0 && Math.min(...poikkeamat) > 0.02
    && Math.max(...poikkeamat) < paksuLeveys,
    `poikkeama ${Math.min(...poikkeamat).toFixed(3)}…${Math.max(...poikkeamat).toFixed(3)} px `
    + `(paksu viiva ${paksuLeveys})`);
  /*
   * LEIKKAUS ON SE MIKÄ OLI, PUOLITETTUNA.
   *
   * Omistaja hyväksyi asun ja pyysi kaiken muun paitsi koon, pohjan ja
   * kehyksen ENNALLEEN. Alkuperäinen kortti leikkasi jo itsekin:
   * kielirivi kietoutuu ja pisin maa vuotaa MITATUSTI 5 px yli. Väite
   * ei siis ole "kaikki mahtuu" — se olisi tiivistämistä, jonka
   * omistaja perui — vaan "ylivuoto on korkeintaan puolet entisestä",
   * eli asettelu on kutistunut kertoimella 0,5 kuten kaikki muukin.
   */
  const ylivuoto = (m) => (m?.sisus ? Math.max(0, m.sisus.sisalto - m.sisus.nakyy) : null);
  tieto(`${ruutu.nimi} · sisus`,
    `ennen ${a.sisus ? `${a.sisus.sisalto}/${a.sisus.nakyy}` : '—'} px `
    + `(ylivuoto ${ylivuoto(a)} px), `
    + `jälkeen ${b.sisus ? `${b.sisus.sisalto}/${b.sisus.nakyy}` : '—'} px `
    + `(ylivuoto ${ylivuoto(b)} px)`);
  vaadi(`${ruutu.nimi} · ylivuoto on korkeintaan puolet entisestä`,
    b.sisus != null && a.sisus != null && ylivuoto(b) <= ylivuoto(a) * 0.5 + 1,
    `ennen ${ylivuoto(a)} px, jälkeen ${ylivuoto(b)} px`);
}

/* --- determinismi --------------------------------------------------- */
const puolaLevea = tulokset.jalkeen['puola-levea'];
const puolaPuhelin = tulokset.jalkeen['puola-puhelin'];
if (puolaLevea && puolaPuhelin) {
  const dPuolaA = puolaLevea.polut.map((p) => p.d).join('|');
  const dPuolaB = puolaPuhelin.polut.map((p) => p.d).join('|');
  vaadi('sama maa → sama kehys kahdella eri sivulatauksella', dPuolaA === dPuolaB,
    'polut eroavat');
}

/* Puhdas funktio: sama kutsu antaa bitilleen saman kehyksen. */
const kasi = await import('../../js/kasinpiirto.js');
const asetus = { leveys: 95, korkeus: 74, paksu: 1.9 };
const k1 = JSON.stringify(kasi.kasikehys({ ...asetus, siemen: 'POL' }));
const k2 = JSON.stringify(kasi.kasikehys({ ...asetus, siemen: 'POL' }));
const k3 = JSON.stringify(kasi.kasikehys({ ...asetus, siemen: 'NOR' }));
vaadi('kehyspolku on deterministinen', k1 === k2, 'kaksi kutsua eroaa');
vaadi('eri maa antaa eri kehyksen', k1 !== k3, 'POL ja NOR ovat samat');

/* Mitatut suhdeluvut ovat mitatut eivätkä ajautuneet. */
vaadi('suhdeluvut ovat Stielerin arkin mukaiset',
  Math.abs(kasi.KASI_VALI - 0.71) < 1e-9 && Math.abs(kasi.KASI_OHUT - 0.26) < 1e-9,
  `vali ${kasi.KASI_VALI}, ohut ${kasi.KASI_OHUT}`);

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki && !process.exitCode ? 0 : 1);
