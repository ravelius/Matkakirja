/**
 * Savuke: KAUPUNGIN AVAUSKORTTI, KUTSUMINIATYYRI JA LEHDEN OSIOHAKEMISTO
 * (omistaja 27.9.2026 klo 23.1x–23.4x, kortilla hyväksytty mock;
 * js/kaupunkinosto.js avaaAvauskortti, js/pallolauta/lauta.js
 * paivitaKaupunkikortinKutsu, js/lehtiosiot.js).
 *
 * Korvaa kaupunkiliuskan ja vanhan kaupunkipop-upin savukkeet
 * (savuke-pariisi-lahizoom liuska-lohko, savuke-kaupunkipopup).
 *
 * ── VARTIOT (Pariisi ja Ateena, puhelin 390 × 844 ja iPad 834 × 1194) ──
 *
 *   1. KUTSU KARTALLA: kaupungin viereen tulee miniatyyri (herokuva +
 *      nimi), joka on ruudulla eikä peitä Pulua, Liiku-riviä eikä
 *      nappulaa. LÄHELLÄ (omistaja 27.9. klo 11.2x): väli nappulaan
 *      ≤ KUTSUN_VALI_MAX px. Nostojen ikonin peitto sallitaan, jos
 *      vapaata asentoa ei ole (lauta.js toinen kierros); se kirjataan.
 *   2. KUTSUN NAPAUTUS KASVATTAA KORTIN: avauskortti aukeaa.
 *   3. KORTISSA KOLME OSAA ja se mahtuu ruutuun ilman vieritystä:
 *      herokuva, esittely (≤ 2 lausetta) + Lue kaupunkilehti, kartta,
 *      turisti-info.
 *   3b. KARTTA 35 % RUUDUN KORKEUDESTA ja täyttää kaistan ilman tyhjää reunaa.
 *   4. KARTALLA EI TEKSTEJÄ: ei legendaa, vihjettä, mittakaavaa eikä
 *      Kokoruutu-nappia.
 *   5. KARTAN NAPAUTUS AVAA SUURENNOKSEN: lähes koko ruutu, sumennettu
 *      huntu taustalla.
 *   6. KAUPUNGIN NAPAUTUS (merkki) avaa saman kortin eikä liuskaa.
 *   7. LEHDEN ETUSIVULLA OSIOHAKEMISTO: osioita ≥ 3, jokaisella kuva, ei
 *      kahta samaa kuvaa; kaupunkilehden radiorivi ei näy.
 *   8. Ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-avauskortti.mjs [kuvakansio]
 *   SAVUKE_RUUTU=390|834 rajaa yhteen ruutuun.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNGIT = ['pariisi', 'ateena'];
// Kutsun suurin väli nappulaan (lauta.js KUTSUN_ASENNOT: uloin rengas 36 px + asennon siirto).
const KUTSUN_VALI_MAX = 48;
const KAIKKI_RUUDUT = [
  { nimi: 'puhelin', w: 390, h: 844 },
  { nimi: 'ipad', w: 834, h: 1194 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.w) === String(process.env.SAVUKE_RUUTU)) : KAIKKI_RUUDUT;

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

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const leikkaa = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

for (const ruutu of RUUDUT) {
  for (const kaupunki of KAUPUNGIT) {
    const nimi = `${kaupunki} @ ${ruutu.nimi}`;
    const peli = new Game({
      players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
      pack: packById('maailmankartta'),
      seed: 5,
    });
    peli.phase = 'action';
    peli.tokens.delete(kaupunki);
    const ctx = await selain.newContext({
      viewport: { width: ruutu.w, height: ruutu.h }, deviceScaleFactor: 2, serviceWorkers: 'block',
    });
    // Kuormitetulla koneella (poltot) kuvakaappaus voi kestää yli oletuksen 30 s.
    ctx.setDefaultTimeout(120000);
    await ctx.addInitScript((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, JSON.stringify(peli.toJSON()));
    const sivu = await ctx.newPage();
    const virheet = [];
    sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
    await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
    await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
      const v = await ampariHaku(route.request().url());
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
    await sivu.goto(`${osoite}?lauta=pallo&glnimiot=0`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
    await sivu.waitForTimeout(30000);
    // Saapumisen traileri ja postikortit pois tieltä (ne eivät kuulu tähän vartioon).
    await sivu.evaluate(() => {
      document.querySelectorAll('.saapumistraileri, .postikortti').forEach((e) => e.remove());
      for (const b of document.querySelectorAll('button')) if (b.textContent.trim() === 'Ohita') b.click();
    });
    await sivu.waitForTimeout(2500);

    // 1. Kutsu kartalla.
    const kutsu = await sivu.evaluate(() => {
      const k = document.querySelector('.kaupunkikortin-kutsu-kortti');
      if (!k) return null;
      const r = k.getBoundingClientRect();
      const laatikko = (el) => { const b = el.getBoundingClientRect(); return { x0: b.left, y0: b.top, x1: b.right, y1: b.bottom }; };
      const nakyvat = (v) => [...document.querySelectorAll(v)].filter((el) => el.getBoundingClientRect().width > 0).map(laatikko);
      const muut = nakyvat('.pollo-nappi, .liiku-rivi');
      const ikonit = nakyvat('.pallolauta-nosto .nostosym-ikoni');
      /*
       * Nappula piirretään GL-kankaalle (DOM-elementti on ruudun ulkopuolella),
       * joten väli lasketaan kutsun siirtymästä kaupungin ankkuriin nähden:
       * kortin left/top = asennon dx/dy, nappulan laatikko ankkurista kuten
       * lauta.js paivitaKaupunkikortinKutsu (x ±14, y −46…+10).
       */
      const dx = parseFloat(k.style.left);
      const dy = parseFloat(k.style.top);
      const nappula = Number.isFinite(dx) && Number.isFinite(dy)
        ? { x0: r.left - dx - 14, y0: r.top - dy - 46, x1: r.left - dx + 14, y1: r.top - dy + 10 } : null;
      return {
        r: { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom }, muut, ikonit, nappula,
        kuva: Boolean(k.querySelector('img')?.naturalWidth), nimi: k.textContent.trim(),
        leveys: innerWidth, korkeus: innerHeight,
      };
    });
    if (kutsu) {
      const peittaa = kutsu.muut.filter((m) => leikkaa(kutsu.r, m)).length;
      const ikoneita = kutsu.ikonit.filter((m) => leikkaa(kutsu.r, m)).length;
      const n = kutsu.nappula;
      const vali = n ? Math.max(0, kutsu.r.x0 - n.x1, n.x0 - kutsu.r.x1, kutsu.r.y0 - n.y1, n.y0 - kutsu.r.y1) : null;
      vaadi(`1. ${nimi}: kutsuminiatyyri kartalla, ruudulla, ei peitä Pulua/Liikua/nappulaa, lähellä kaupunkia`,
        kutsu.kuva && kutsu.r.x0 >= 0 && kutsu.r.y0 >= 0 && kutsu.r.x1 <= kutsu.leveys && kutsu.r.y1 <= kutsu.korkeus
          && peittaa === 0 && vali !== null && vali <= KUTSUN_VALI_MAX,
        `kuva ${kutsu.kuva}, laatikko ${JSON.stringify(kutsu.r)}, peittää ${peittaa}, väli nappulaan ${vali} px`
          + ` (≤ ${KUTSUN_VALI_MAX}), nostoikoneita alla ${ikoneita}`);
      if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `avauskortti-${kaupunki}-${ruutu.w}-0-kutsu.png`) });
      // 2. Kutsun napautus kasvattaa kortin.
      await sivu.mouse.click((kutsu.r.x0 + kutsu.r.x1) / 2, (kutsu.r.y0 + kutsu.r.y1) / 2);
      await sivu.waitForTimeout(1500);
      vaadi(`2. ${nimi}: kutsun napautus avaa avauskortin`,
        Boolean(await sivu.$('.kaupunkipopup-avaus')), 'korttia ei ole');
    } else {
      vaadi(`1. ${nimi}: kutsuminiatyyri kartalla, ruudulla, ei peitä merkkejä`, false, 'kutsua ei ole');
      await sivu.evaluate((id) => window.matkakirja.ui.pallolauta.napautaKaupunki?.(id), kaupunki);
      await sivu.waitForTimeout(1500);
    }

    // 3–4. Kortin osat, mahtuminen ja kartan tekstittömyys.
    const kortti = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-avaus');
      if (!p) return null;
      const s = p.querySelector('.kaupunkipopup-sisalto');
      const kartta = p.querySelector('.avauskortti-kartta');
      const teksti = p.querySelector('.avauskortti-teksti')?.textContent ?? '';
      return {
        hero: Boolean(p.querySelector('.avauskortti-hero-kuva')?.naturalWidth),
        lehti: Boolean(p.querySelector('.avauskortti-lehti')),
        kartta: Boolean(kartta?.querySelector('.kartta-kehys')),
        opas: Boolean(p.querySelector('.avauskortti-opas')),
        lauseita: (teksti.match(/[.!?](\s|$)/g) ?? []).length,
        mahtuu: s ? s.scrollHeight <= s.clientHeight + 1 : false,
        // 3b. Kaista on 35 % ruudun korkeudesta, ja kartta peittää sen.
        kaista: (() => {
          const k = kartta?.getBoundingClientRect();
          const r = kartta?.querySelector('.kartta-kehys')?.getBoundingClientRect();
          if (!k || !r) return null;
          return {
            osuus: Number((k.height / innerHeight).toFixed(3)),
            peittaa: r.left <= k.left + 1.5 && r.right >= k.right - 1.5
              && r.top <= k.top + 1.5 && r.bottom >= k.bottom - 1.5,
          };
        })(),
        tekstit: kartta ? ['.kartta-opaste', '.kartta-ihmeselite', '.kartta-mittajana', '.kartta-kokoruutu-nappi']
          .filter((v) => kartta.querySelector(v)) : ['ei karttaa'],
      };
    });
    vaadi(`3. ${nimi}: kortissa herokuva, esittely + lehtilinkki, kartta ja turisti-info; mahtuu ruutuun`,
      kortti && kortti.hero && kortti.lehti && kortti.kartta && kortti.opas && kortti.lauseita <= 2 && kortti.mahtuu,
      JSON.stringify(kortti));
    vaadi(`3b. ${nimi}: kortin kartta on 35 % ruudun korkeudesta ja täyttää kaistan`,
      Boolean(kortti?.kaista) && Math.abs(kortti.kaista.osuus - 0.35) <= 0.02 && kortti.kaista.peittaa,
      JSON.stringify(kortti?.kaista));
    vaadi(`4. ${nimi}: kortin kartalla ei tekstejä (legenda, vihje, jana, Kokoruutu)`,
      kortti && kortti.tekstit.length === 0, JSON.stringify(kortti?.tekstit));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `avauskortti-${kaupunki}-${ruutu.w}-1-kortti.png`) });

    // 5. Kartan napautus → suurennos sumennetun hunnun päällä.
    // Kehys voi olla kaistaa suurempi (rajaus), joten napautus osuu kaistaan.
    const kehys = await sivu.$('.avauskortti-kartta');
    if (kehys) {
      const b = await kehys.boundingBox();
      await sivu.mouse.click(b.x + b.width * 0.5, b.y + b.height * 0.55);
      await sivu.waitForTimeout(1500);
    }
    const suurennos = await sivu.evaluate(() => {
      const s = document.querySelector('.kartta-suurennos-kortista');
      const h = document.querySelector('.kartta-suurennos-huntu');
      if (!s) return null;
      const r = s.getBoundingClientRect();
      return { osuus: (r.width * r.height) / (innerWidth * innerHeight), huntu: Boolean(h), sumennus: h ? getComputedStyle(h).backdropFilter : '' };
    });
    vaadi(`5. ${nimi}: kartan napautus avaa lähes koko ruudun suurennoksen sumennetun taustan päällä`,
      suurennos && suurennos.osuus > 0.6 && suurennos.huntu && /blur/.test(suurennos.sumennus),
      JSON.stringify(suurennos));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `avauskortti-${kaupunki}-${ruutu.w}-2-kartta.png`) });
    await sivu.evaluate(() => window.matkakirja.ui.suljeKulttuuriKuva?.());
    await sivu.waitForTimeout(400);

    // 6. Kaupungin merkin napautus avaa saman kortin (ei liuskaa).
    await sivu.evaluate(async () => { (await import('/js/kaupunkinosto.js')).suljeKaupunkipopup(window.matkakirja.ui); });
    await sivu.waitForTimeout(600);
    const merkista = await sivu.evaluate(async (id) => {
      const l = window.matkakirja.ui.pallolauta;
      l.napautaKaupunki?.(id);
      await new Promise((v) => setTimeout(v, 1200));
      return { kortti: Boolean(document.querySelector('.kaupunkipopup-avaus')), liuska: l.nostot?.liuskaAuki?.() ?? null };
    }, kaupunki);
    vaadi(`6. ${nimi}: kaupungin merkin napautus avaa avauskortin eikä liuskaa`,
      merkista.kortti && !merkista.liuska, JSON.stringify(merkista));

    // 7. Lehti kortin linkistä: etusivun osiohakemisto, ei radioriviä.
    const peittaja = await sivu.evaluate(() => {
      const a = document.querySelector('.avauskortti-lehti'); if (!a) return 'ei linkkiä';
      const r = a.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return a.contains(e) ? null : `${e?.tagName}.${String(e?.className ?? '').slice(0, 60)}`;
    });
    if (peittaja) tieto(`${nimi} · lehtilinkin päällä`, peittaja);
    const linkki = await sivu.$('.avauskortti-lehti');
    if (linkki) { await linkki.click({ timeout: 5000 }).catch(() => sivu.evaluate(() => document.querySelector('.avauskortti-lehti')?.click())); await sivu.waitForTimeout(5000); }
    const lehti = await sivu.evaluate(() => {
      const el = document.querySelector('.lehti-osiohakemisto');
      if (!el) return null;
      el.scrollIntoView({ block: 'start' });
      const kuvat = [...el.querySelectorAll('.lehti-osio-kuva img')].map((i) => i.currentSrc || i.src);
      return {
        osioita: el.querySelectorAll('.lehti-osio').length, kuvia: kuvat.length, eri: new Set(kuvat).size,
        tyhjia: el.querySelectorAll('.lehti-osio-kuva.tyhja').length,
        radio: [...document.querySelectorAll('#arrival-media-kaupunki, .arrival-media-kaupunki')].some((r) => !r.hidden && r.getBoundingClientRect().height > 0),
      };
    });
    await sivu.waitForTimeout(1500);
    vaadi(`7. ${nimi}: lehden etusivulla osiohakemisto, oma kuva joka osiolla, ei radioriviä`,
      lehti && lehti.osioita >= 3 && lehti.kuvia === lehti.osioita && lehti.eri === lehti.kuvia && lehti.tyhjia === 0 && !lehti.radio,
      JSON.stringify(lehti));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `avauskortti-${kaupunki}-${ruutu.w}-3-lehti.png`) });

    vaadi(`8. ${nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' | '));
    await ctx.close();
  }
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
