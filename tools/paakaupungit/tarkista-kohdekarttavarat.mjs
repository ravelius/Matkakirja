// Kohdekarttojen reunavara- ja käyttöliittymätarkistus pelin omalla piirrolla (Karttaseppä 13.10.2026, PT juna 189, #4573).
//
//   node tools/paakaupungit/tarkista-kohdekarttavarat.mjs iphone|ipad <id>… [--json ulos.json]
//   node tools/paakaupungit/tarkista-kohdekarttavarat.mjs iphone --pk   (kaikki pääkaupunkikartat: piirra-kaupunkikartta.mjs:n
//        KAUPUNGIT-taulu PÄÄKAUPUNKIPISTEET-otsikosta loppuun, 73 karttaa 13.10.2026)
//
// MIKSI SELAIMELLA. Canberran kohdekartalla (7 km) Mount Majura jäi iPhonella osin "Napauta nähtävyyttä" -opasteen alle
// ja Black Mountain aivan reunaan, vaikka kohdekartat.mjs piti 150 m:n reunavaran. Opasteet ovat pikseleitä ja kartta
// prosentteja, joten metrivara ei kerro mitään: sama 150 m on 7 km:n kartalla 8 px ja 1,5 km:n kartalla 37 px. Tämä
// työkalu piirtää kartan js/nahtavyydet.js:n piirraKaupunkiKartta-funktiolla laitteen levyiseen kehykseen ja mittaa
// numeroympyrät ja opasteet getBoundingClientRectillä — sama kuva, jonka pelaaja näkee.
//
// RIKKEET (paluuarvo 1): numeroympyrä alle REUNA_PX:n päässä kehyksen reunasta, tai ympyrä opasteen
// (.kartta-opaste, .kartta-ihmeselite, .kartta-suurennusvihje) tai mittajanan päällä. Kohteen nimilappu opasteen
// alla on HUOMIO (ei rike): nimi siirtyy merkin toiselle puolelle (nimiPuoli) ja näkyy kohdelistassa.
// Kehysleveydet: iPhone 360 px (390 px:n näyttö, kuten tools/tarkista-karttapisteet.mjs), iPad 1008 px
// (1032 px:n näyttö, 12 px:n reunus kuten Pelikoodarin kuva-arkki).
import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '../..');
export const REUNA_PX = 8;
export const LAITTEET = {
  iphone: { viewport: { width: 390, height: 844 }, kehys: 360 },
  ipad: { viewport: { width: 1032, height: 1376 }, kehys: 1008 },
};

const arg = process.argv.slice(2);
const LAITE = arg[0];
const jsonUlos = arg.includes('--json') ? arg[arg.indexOf('--json') + 1] : null;
let idt = arg.slice(1).filter((a, i, l) => !a.startsWith('--') && l[i - 1] !== '--json');
if (arg.includes('--pk')) idt = paakaupunkikartat();
if (!LAITTEET[LAITE] || !idt.length) { console.error('käyttö: tarkista-kohdekarttavarat.mjs iphone|ipad <id>… | --pk'); process.exit(2); }

export function paakaupunkikartat() {
  const s = readFileSync(join(JUURI, 'tools/piirra-kaupunkikartta.mjs'), 'utf8');
  const a = s.indexOf('const KAUPUNGIT = {'), loppu = s.indexOf('\n};', a), alku = s.indexOf('PÄÄKAUPUNKIPISTEET', a);
  return [...s.slice(alku, loppu).matchAll(/^  ([a-z0-9]+): \{/gm)].map((m) => m[1]);
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(0, '127.0.0.1', r));
const portti = palvelin.address().port;
const { avaaChromium } = await import(join(JUURI, 'tools/selain.mjs'));
const selain = await avaaChromium({});
const L = LAITTEET[LAITE];
const ctx = await selain.newContext({ viewport: L.viewport, deviceScaleFactor: 1, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1/.test(url.href), (route) => route.abort()); // vain paikalliset tiedostot
await sivu.goto(`http://127.0.0.1:${portti}/index.html?lauta=maailmankartta`, { waitUntil: 'load' });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.game?.phase), null, { timeout: 60000 });

const tulos = {};
let rikkeita = 0;
for (const id of idt) {
  const m = await sivu.evaluate(async ({ cid, leveys, REUNA }) => {
    const { piirraKaupunkiKartta } = await import('/js/nahtavyydet.js');
    document.getElementById('kv-testi')?.remove();
    const pohja = document.createElement('div');
    pohja.id = 'kv-testi';
    pohja.style.cssText = `position:absolute;left:0;top:0;width:${leveys}px;z-index:99999;background:#efe6d2`;
    document.body.appendChild(pohja);
    piirraKaupunkiKartta(window.matkakirja.ui, pohja, { cityId: cid });
    const kuva = pohja.querySelector('.kartta-kehys img');
    if (kuva && !kuva.complete) await new Promise((r) => { kuva.onload = r; kuva.onerror = r; setTimeout(r, 8000); });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const kehys = pohja.querySelector('.kartta-kehys');
    if (!kehys) return { virhe: 'ei kehystä' };
    const k = kehys.getBoundingClientRect();
    const suhde = (r) => ({ x: r.left - k.left, y: r.top - k.top, w: r.width, h: r.height });
    const esteet = [];
    for (const [nimi, sel] of [['opaste', '.kartta-opaste'], ['ihmeselite', '.kartta-ihmeselite'], ['kokoruutu', '.kartta-suurennusvihje'],
      ['mittajana', '.kartta-mittajana'], ['mittajanan teksti', '.kartta-mittajana-teksti']]) {
      for (const e of kehys.querySelectorAll(sel)) { const r = e.getBoundingClientRect(); if (r.width && r.height) esteet.push({ nimi, ...suhde(r) }); }
    }
    const osuu = (a, b, v = 1) => a.x < b.x + b.w + v && a.x + a.w + v > b.x && a.y < b.y + b.h + v && a.y + a.h + v > b.y;
    const kohteet = [];
    for (const p of kehys.querySelectorAll('.kaupunki-kohde')) {
      const r = suhde(p.getBoundingClientRect());
      const nimiEl = p.querySelector('.kohde-nimi');
      const n = nimiEl ? suhde(nimiEl.getBoundingClientRect()) : null;
      const reuna = Math.min(r.x, r.y, k.width - r.x - r.w, k.height - r.y - r.h);
      const rikkeet = [];
      if (reuna < REUNA) rikkeet.push(`reuna ${Math.round(reuna)} px`);
      for (const e of esteet) if (osuu(r, e)) rikkeet.push(`${e.nimi} päällä`);
      const huomiot = n && n.w ? esteet.filter((e) => osuu(n, e, 0)).map((e) => `nimi ${e.nimi} alla`) : [];
      kohteet.push({ nimi: (nimiEl?.textContent || p.getAttribute('aria-label') || '').trim(), x: Math.round(r.x + r.w / 2),
        y: Math.round(r.y + r.h / 2), w: Math.round(r.w), h: Math.round(r.h), reuna: Math.round(reuna), rikkeet, huomiot,
        ...(n && n.w ? { nimilappu: [Math.round(n.x), Math.round(n.y), Math.round(n.w), Math.round(n.h)] } : {}) });
    }
    return { kehys: [Math.round(k.width), Math.round(k.height)], esteet: esteet.map((e) => ({ ...e, x: Math.round(e.x), y: Math.round(e.y), w: Math.round(e.w), h: Math.round(e.h) })), kohteet };
  }, { cid: id, leveys: L.kehys, REUNA: REUNA_PX });
  tulos[id] = m;
  const r = (m.kohteet || []).filter((x) => x.rikkeet.length);
  rikkeita += r.length;
  const h = (m.kohteet || []).filter((x) => x.huomiot.length);
  console.log(`${id.padEnd(22)} ${m.virhe ?? `${m.kehys.join('×')} px, ${m.kohteet.length} kohdetta`}${r.length ? `  RIKE: ${r.map((x) => `${x.nimi} (${x.rikkeet.join(', ')})`).join('; ')}` : '  ok'}${h.length ? `  huom: ${h.map((x) => `${x.nimi} (${x.huomiot.join(', ')})`).join('; ')}` : ''}`);
  if (m.virhe) rikkeita += 1; // pääkaupunkikartta ilman kehystä = virhe (kartta puuttuu pelistä)
}
if (jsonUlos) writeFileSync(jsonUlos, JSON.stringify({ laite: LAITE, kehys_px: L.kehys, reuna_px: REUNA_PX, kartat: tulos }, null, 1) + '\n');
console.log(`\n${LAITE}: ${idt.length} karttaa, ${rikkeita} rikettä`);
await selain.close();
palvelin.close();
process.exitCode = rikkeita ? 1 : 0;
