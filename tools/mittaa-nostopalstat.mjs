#!/usr/bin/env node
/*
 * KAKSI PALSTAA KAIKILLE NOSTOILLE — SELAINMITTARI (Karttaseppä 22.9.2026).
 *
 * Omistaja klo 23.06, sanatarkasti: *"Kaikkiin nostoihin kaksi palstaa.
 * Ja niin että ensin Kuva avautuu isona ja kun klikkaa niin sitten kuva
 * pienenee ja tulee teksti palsta mukaan oikealle."*
 *
 * Yksikkötesti (tests/nostokuva-kortit.test.mjs) vartioi rakenteen
 * pienessä DOM-mallissa; tämä mittaa OIKEASSA selaimessa, että palstat
 * todella ovat vierekkäin, kuva pienenee ja kortti pysyy katon alla —
 * ja kaappaa yhden kortin (Camarguen eläintäky, FRA) kummastakin
 * vaiheesta omistajalle.
 *
 * Kortit avataan suoraan moduulien avausfunktioilla tynkä-ui:lla kuten
 * tools/mittaa-nostokuva.mjs. Ämpärin osoitteet välitetään Noden kautta
 * (ämpärin CORS ei päästä paikallista originia).
 *
 *   PLAYWRIGHT_JS=… [SAVUKE_MOOTTORI=webkit|chromium] [ULOS=<kansio>]
 *     node tools/mittaa-nostopalstat.mjs
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..');
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/nostopalstat';
mkdirSync(ULOS, { recursive: true });

const SIVU = `<!doctype html>
<html lang="fi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/styles.css">
<style>html,body{margin:0;height:100%;background:#cdbb97}</style>
</head><body>
<script type="module">
import { avaaSkandaali } from '/js/skandaalit.js';
import { avaaHetki } from '/js/historian-hetket.js';
import { avaaSyvennys } from '/js/syvennys.js';
import { avaaElaintaky } from '/js/elaintaky.js';
const ui = {
  game: {
    pack: { id: 'mittari', map: { countryShapes: { FRA: { nimi: 'Ranska' }, FIN: { nimi: 'Suomi' } } } },
    minitehtavatVastatut: new Set(),
    actionMinitehtava: () => ({ ok: true }),
    actionElaintaky: () => ({ ok: true, uusi: false }),
  },
  buildToast: () => null, removeToast: () => {}, onChange: () => {}, renderTurnPill: () => {},
};
const kuva = { osoite: '/assets/elaimet/elain-fra.jpg', selite: 'Mittarin kuva — lyhyt kuvateksti', lahde: 'Matkakirjan havainnekuva' };
const teksti = ['Ensimmäinen kappale mittausta varten. '.repeat(8), 'Toinen kappale mittausta varten. '.repeat(8)].join('\\n\\n');
const visa = { kysymys: 'Mittarin kysymys?', vaihtoehdot: ['a', 'b', 'c'], oikea: 0 };
window.__avaa = (tyyppi) => {
  if (tyyppi === 'elain-fra') return avaaElaintaky(ui, 'FRA');
  if (tyyppi === 'skandaali') return avaaSkandaali(ui, 'FIN', { id: 'm', otsikko: 'Mittarin skandaali', nimio: 'Mittari', paikka: 'Mittarila', vuosi: 1873, kortti: 'Ingressi. '.repeat(6), teksti, visa, kuvat: [kuva] });
  if (tyyppi === 'syvennys') return avaaSyvennys(ui, 'mittarila', { id: 'm', otsikko: 'Mittarin syvennys', teksti, visa, kuva }, { symboli: 'huuto' });
  if (tyyppi === 'hetki') return avaaHetki(ui, 'FIN', { id: 'm', otsikko: 'Mittarin hetki', paikka: 'Mittarila', paivays: '1. tammikuuta 1873', teksti, visa, kuvat: [{ tiedosto: 'mittari1.jpg', kuvateksti: 'Hetken kuva' }] });
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

for (const [leveys, korkeus] of [[1400, 900], [1920, 1080], [900, 1100]]) {
  for (const tyyppi of ['elain-fra', 'skandaali', 'syvennys', 'hetki']) {
    const ctx = await selain.newContext({ viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1 });
    const sivu = await ctx.newPage();
    await sivu.route(/media\.matkakirja\.app/, async (r) => {
      try {
        const v = await fetch(r.request().url());
        r.fulfill({ status: v.status, body: Buffer.from(await v.arrayBuffer()), headers: { 'content-type': v.headers.get('content-type') ?? 'image/jpeg', 'access-control-allow-origin': '*' } });
      } catch { r.abort(); }
    });
    // Hetken kuvat tulevat ämpäristä nimellä (hetkenKuvaOsoite): mittauksessa
    // paikallinen kuva. Rekisteröity VIIMEISENÄ, koska Playwright kokeilee
    // viimeksi lisättyä reittiä ensin — muuten ämpärireitti nappaisi sen.
    await sivu.route('**/mittari*.jpg', (r) => r.fulfill({ status: 200, contentType: 'image/jpeg', body: readFileSync(join(JUURI, 'assets/elaimet/elain-fra.jpg')) }));
    const virheet = [];
    sivu.on('pageerror', (e) => virheet.push(String(e.message)));
    await sivu.goto(osoite);
    await sivu.waitForFunction(() => window.__valmis);
    await sivu.evaluate((t) => window.__avaa(t), tyyppi);
    await sivu.waitForFunction(() => { const i = document.querySelector('.nostokuva-img'); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 15000 }).catch(() => {});
    await sivu.waitForTimeout(300);
    if (!(await sivu.$('.nostokuva-img'))) {
      vartio(`${tyyppi} ${leveys}x${korkeus}: kortti avautui kuvalla`, false, virheet.join(' | ') || 'ei kuvaa, ei virheitä');
      await ctx.close();
      continue;
    }
    const v1 = await sivu.evaluate(() => {
      const i = document.querySelector('.nostokuva-img').getBoundingClientRect();
      const k = document.querySelector('.nostokuva-kortti').getBoundingClientRect();
      return { kuva: [Math.round(i.width), Math.round(i.height)], kortti: Math.round(k.width) };
    });
    const leveaRuutu = leveys >= 1100;
    const merkki = `${tyyppi} ${leveys}x${korkeus}`;
    if (tyyppi === 'elain-fra' && leveys === 1400) await sivu.screenshot({ path: join(ULOS, `nostopalstat-elain-fra-1400-vaihe1-${MOOTTORI}.png`) });
    // Klikkaus ja ensimmäinen kehys: FLIP-alku = kuva vielä vanhassa laatikossaan.
    const alku = await sivu.evaluate(() => new Promise((ok) => {
      const img = document.querySelector('.nostokuva-img');
      const ennen = img.getBoundingClientRect();
      document.querySelector('.nostokuva-lisaa').click();
      const heti = img.getBoundingClientRect();
      ok({ dx: Math.round(heti.left - ennen.left), dy: Math.round(heti.top - ennen.top), dw: Math.round(heti.width - ennen.width) });
    }));
    await sivu.waitForTimeout(500);
    const v2 = await sivu.evaluate(() => {
      const img = document.querySelector('.nostokuva-img');
      const i = img.getBoundingClientRect();
      const k = document.querySelector('.nostokuva-kortti').getBoundingClientRect();
      const rivi = document.querySelector('.nostokuva-kortti .fokusnosto-rivi');
      const kp = rivi?.querySelector(':scope > .fokusnosto-kuvapalsta')?.getBoundingClientRect();
      const tp = rivi?.querySelector(':scope > .fokusnosto-tekstipalsta')?.getBoundingClientRect();
      return {
        kuva: [Math.round(i.width), Math.round(i.height)], kortti: Math.round(k.width),
        kortinOikea: Math.round(k.right), ruutu: innerWidth,
        rivi: rivi ? getComputedStyle(rivi).display : null,
        vierekkain: kp && tp ? (kp.right <= tp.left + 1 && Math.abs(kp.top - tp.top) < 2) : false,
        kuvaPalstassa: Boolean(rivi?.querySelector('.fokusnosto-kuvapalsta .nostokuva-img')),
        tekstiPalstassa: Boolean(rivi?.querySelector('.fokusnosto-tekstipalsta .fokusnosto-teksti')),
        muunnos: img.style.transform || '',
      };
    });
    if (tyyppi === 'elain-fra' && leveys === 1400) await sivu.screenshot({ path: join(ULOS, `nostopalstat-elain-fra-1400-vaihe2-${MOOTTORI}.png`) });
    tulokset.push({ merkki, v1, alku, v2 });
    if (leveaRuutu) {
      vartio(`${merkki}: vaiheen 1 kuva on iso`, v1.kuva[0] > leveys * 0.5 || v1.kuva[1] > korkeus * 0.6, `${v1.kuva.join('x')}`);
      vartio(`${merkki}: palstat vierekkäin`, v2.rivi === 'flex' && v2.vierekkain && v2.kuvaPalstassa && v2.tekstiPalstassa, JSON.stringify({ rivi: v2.rivi, vierekkain: v2.vierekkain }));
      vartio(`${merkki}: kuva pieneni`, v2.kuva[0] < v1.kuva[0], `${v1.kuva[0]} → ${v2.kuva[0]}`);
      vartio(`${merkki}: kortti ≤ 1100 px ja ruudulla`, v2.kortti <= 1100 && v2.kortinOikea <= v2.ruutu, `${v2.kortti} px`);
      vartio(`${merkki}: ei hyppyä ensimmäisessä kehyksessä`, Math.abs(alku.dx) <= 1 && Math.abs(alku.dy) <= 1 && Math.abs(alku.dw) <= 1, JSON.stringify(alku));
      vartio(`${merkki}: kutistus päättyi`, v2.muunnos === '', v2.muunnos);
    } else {
      vartio(`${merkki}: kapealla pino, ei palstoja`, v2.rivi === null, String(v2.rivi));
    }
    await ctx.close();
  }
}
writeFileSync(join(ULOS, `nostopalstat-${MOOTTORI}.json`), JSON.stringify(tulokset, null, 1));
await selain.close();
palvelin.close();
console.log(`Kaappaukset: ${ULOS}`);
process.exit(viat ? 1 : 0);
