#!/usr/bin/env node
/*
 * LEHTIPALSTAT PITKÄLLE NOSTOTEKSTILLE — SELAINMITTARI (Karttaseppä 22.9.2026).
 *
 * Omistaja klo 23.48 (iPad pystyssä): skandaalikortin lehtipalstat —
 * leipäteksti kahdessa CSS-palstassa, anfangi, palstaväli — kaikkiin
 * pidempiin nostoihin. Tämä mittaa OIKEASSA selaimessa, että
 *   - pitkä teksti saa kaksi palstaa, kun tekstin oma leveys riittää
 *     (iPad pystyssä 1024 px, kuvakortti pinona);
 *   - lyhyt teksti pysyy yhtenä palstana;
 *   - puhelimella (390 px) yksi palsta;
 *   - ≥ 1100 px:n kuva/teksti-taitossa tekstipalsta (~500 px) yksi palsta;
 *   - kuva ei liiku vaiheenvaihdossa pinona (1024 ja 390 px).
 * ja kaappaa Chartresin katedraalin kohdekortin vaiheen 2 (1024 px).
 *
 *   PLAYWRIGHT_JS=… [SAVUKE_MOOTTORI=webkit] [ULOS=<kansio>]
 *     node tools/mittaa-lehtipalstat.mjs
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..');
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/lehtipalstat';
mkdirSync(ULOS, { recursive: true });

const SIVU = `<!doctype html>
<html lang="fi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/styles.css">
<style>html,body{margin:0;height:100%;background:#cdbb97}</style>
</head><body>
<script type="module">
import { avaaFokuskohde } from '/js/fokuskohteet.js';
import { avaaElaintaky } from '/js/elaintaky.js';
import { avaaSyvennys } from '/js/syvennys.js';
import { MAASTOKOHTEET_FRA } from '/js/packs/maastokohteet-fra.js';
import { ELAINTAKYT } from '/js/packs/elaintakyt.js';
const ui = {
  game: {
    pack: { id: 'maailmankartta', map: { countryShapes: { FRA: { nimi: 'Ranska' } } } },
    minitehtavatVastatut: new Set(),
    actionMinitehtava: () => ({ ok: true }),
    actionElaintaky: () => ({ ok: true, uusi: false }),
  },
  buildToast: () => null, removeToast: () => {}, onChange: () => {}, renderTurnPill: () => {},
  fokuskohdeMerkit: new Map(),
};
const chartres = MAASTOKOHTEET_FRA.find((k) => k.id === 'chartres' || k.nimi === 'Chartresin katedraali');
const pitka = ['Ensimmäinen kappale mittausta varten, jossa on riittävästi tekstiä. '.repeat(5),
  'Toinen kappale mittausta varten, yhtä lailla pitkä. '.repeat(5)].join('\\n\\n');
ELAINTAKYT.__PITKA = { ...ELAINTAKYT.FRA, teksti: pitka };
window.__avaa = (tyyppi) => {
  if (tyyppi === 'chartres') return avaaFokuskohde(ui, chartres);
  if (tyyppi === 'kohde-lyhyt') return avaaFokuskohde(ui, { ...chartres, id: 'chartres-lyhyt', teksti: 'Lyhyt teksti. Toinen virke. Kolmas virke, joka ei vielä tee tekstistä pitkää.' });
  if (tyyppi === 'elain-lyhyt') return avaaElaintaky(ui, 'FRA');
  if (tyyppi === 'elain-pitka') return avaaElaintaky(ui, '__PITKA');
  if (tyyppi === 'syvennys-pitka') return avaaSyvennys(ui, 'mittarila', { id: 'm', otsikko: 'Mittarin syvennys', teksti: pitka, kuva: { osoite: '/assets/elaimet/elain-fra.jpg', selite: 'Mittarin kuva', lahde: 'Matkakirjan havainnekuva' } }, { symboli: 'huuto' });
};
window.__valmis = true;
</script></body></html>`;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const palvelin = http.createServer((req, res) => {
  const polku = decodeURIComponent(req.url.split('?')[0]);
  if (polku === '/') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(SIVU); return; }
  const tiedosto = join(JUURI, polku);
  if (!existsSync(tiedosto)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(tiedosto)] ?? 'application/octet-stream' });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const selain = await paketti[MOOTTORI].launch();
const tulokset = [];
let viat = 0;
const vartio = (nimi, ehto, tieto) => { if (!ehto) viat += 1; console.log(`${ehto ? 'OK ' : 'VIKA'} ${nimi}${tieto ? ` — ${tieto}` : ''}`); };

/** [tyyppi, odotus pinona (1024), odotus puhelimella, odotus 1400] */
const TAPAUKSET = [
  ['chartres', 2, 1, 1],
  ['kohde-lyhyt', 1, 1, 1],
  ['elain-lyhyt', 1, 1, 1],
  ['elain-pitka', 2, 1, 1],
  ['syvennys-pitka', 2, 1, 1],
];
const RUUDUT = [['ipad-pysty', 1024, 1366, 1], ['puhelin', 390, 844, 2], ['tyopoyta', 1400, 900, 3]];

for (const [ruutu, leveys, korkeus, sarake] of RUUDUT) {
  for (const tapaus of TAPAUKSET) {
    const [tyyppi] = tapaus;
    const odotus = tapaus[sarake];
    const ctx = await selain.newContext({ viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1 });
    const sivu = await ctx.newPage();
    const virheet = [];
    sivu.on('pageerror', (e) => virheet.push(String(e.message)));
    await sivu.route(/media\.matkakirja\.app/, async (r) => {
      try {
        const v = await fetch(r.request().url());
        r.fulfill({ status: v.status, body: Buffer.from(await v.arrayBuffer()), headers: { 'content-type': v.headers.get('content-type') ?? 'image/jpeg', 'access-control-allow-origin': '*' } });
      } catch { r.abort(); }
    });
    await sivu.route(/upload\.wikimedia\.org|commons\.wikimedia\.org/, (r) => r.abort());
    await sivu.goto(osoite);
    await sivu.waitForFunction(() => window.__valmis);
    await sivu.evaluate((t) => window.__avaa(t), tyyppi);
    await sivu.waitForFunction(() => { const i = document.querySelector('.nostokuva-img'); return !i || (i.complete && i.naturalWidth > 0); }, null, { timeout: 20000 }).catch(() => {});
    await sivu.waitForTimeout(400);
    const merkki = `${tyyppi} ${ruutu} ${leveys}px`;
    const kuvallinen = Boolean(await sivu.$('.nostokuva-lisaa'));
    let siirto = null;
    if (kuvallinen) {
      siirto = await sivu.evaluate(() => {
        const img = document.querySelector('.nostokuva-img');
        const e = img.getBoundingClientRect();
        document.querySelector('.nostokuva-lisaa').click();
        const j = img.getBoundingClientRect();
        return { dx: Math.round(j.left - e.left), dy: Math.round(j.top - e.top), dw: Math.round(j.width - e.width) };
      });
      await sivu.waitForTimeout(500);
    }
    const m = await sivu.evaluate(() => {
      const kotelo = document.querySelector('.lehtipalsta-kotelo');
      const teksti = document.querySelector('.lehtipalsta') ?? document.querySelector('.fokusnosto-teksti, .fokuskohde-teksti');
      const cs = teksti ? getComputedStyle(teksti) : null;
      const palstoja = cs && cs.columnCount !== 'auto' ? Number(cs.columnCount) : 1;
      return { kotelo: Boolean(kotelo), koteloLeveys: kotelo ? Math.round(kotelo.getBoundingClientRect().width) : null, palstoja };
    });
    tulokset.push({ merkki, kuvallinen, siirto, ...m, virheet });
    vartio(`${merkki}: ${odotus} palsta${odotus > 1 ? 'a' : ''}`, m.palstoja === odotus && !virheet.length,
      `palstoja ${m.palstoja}, tekstikotelo ${m.koteloLeveys ?? '-'} px${virheet.length ? `, virhe: ${virheet[0]}` : ''}`);
    if (kuvallinen && leveys < 1100) {
      vartio(`${merkki}: kuva ei liiku vaiheenvaihdossa`, siirto && siirto.dx === 0 && siirto.dw === 0 && siirto.dy >= 0, JSON.stringify(siirto));
    }
    if (tyyppi === 'chartres' && ruutu === 'ipad-pysty') {
      await sivu.screenshot({ path: join(ULOS, `lehtipalstat-chartres-1024-vaihe2-${MOOTTORI}.png`) });
    }
    await ctx.close();
  }
}
writeFileSync(join(ULOS, `lehtipalstat-${MOOTTORI}.json`), JSON.stringify(tulokset, null, 1));
await selain.close();
palvelin.close();
console.log(`Kaappaukset: ${ULOS}`);
process.exit(viat ? 1 : 0);
