/*
 * SELAINSAVUKE: KUVAN LÄHDE JA HAVAINNEKUVAMERKINTÄ VAIN SUURENNOKSESSA.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kuvalahteet.mjs [kuvakansio]
 *
 * Omistaja 19.9.2026 klo 19.04 Suomen aikaa (Loire-kohdekortti),
 * sanatarkasti: "Havainnekuva ja lähteet saa näkyä vasta kun kuva
 * klikataan isoksi. Tsekkaa kaikkialta läpi". Toteutus: js/tekijakortti.js
 * kortinKuvalahde. Per pinta 390 px: kortilla EI näkyvää lähde- tai
 * havainnekuvariviä; kuvan napautus avaa suurennoksen, jossa rivi ON.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const NOSTO = 'maalehti-montgolfier';

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
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());


const RIVI = /Valokuva:|Matkakirjan havainnekuva|Commons|\bCC[ -](?:BY|0)|public domain|\(PD\)|Library of Congress/i;
const PINNAT = [
  { nimi: 'kohdekortti Loire', avaa: 'kohde:FRA:loire', kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'hahmotelma Texel', avaa: 'kohde:NLD:hahmotelma-texel', kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'kohdekortti Loire (vaihe 2)', avaa: 'kohde:FRA:loire', lisaa: true, kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'hahmotelma Texel (vaihe 2)', avaa: 'kohde:NLD:hahmotelma-texel', lisaa: true, kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'maalehtinosto Montgolfier (vaihe 1)', avaa: 'nosto:maalehti-montgolfier', kortti: '.fokusnosto-kortti', kuva: '.nostokuva-nappi, .fokusnosto-kuvanappi' },
  { nimi: 'maalehtinosto Montgolfier (vaihe 2)', avaa: 'nosto:maalehti-montgolfier', lisaa: true, kortti: '.fokusnosto-kortti', kuva: '.nostokuva-nappi, .fokusnosto-kuvanappi' },
  { nimi: 'Ihmisen matka Toba (lisänosto)', avaa: 'ihmisen:toba', kortti: '.ihmisen-nostokortti', kuva: '.ihmisen-nostokortti-kuvakehys.suurennettava img' },
  /*
   * ERÄ 2 (Fable 19.9.2026 klo 21.43): loput pinnat. Kortin kuva on
   * pinnan ensimmäinen näkyvä <img>, ellei muuta anneta.
   */
  { nimi: 'historian hetki', avaa: 'hetki', kortti: '.hetki-kortti', kuva: 'img' },
  { nimi: 'eläintäky FIN', avaa: 'taky:FIN', kortti: '.elaintaky-kortti', kuva: 'img' },
  // Fokusvirran korttipinta on pois käytöstä (js/fokusvirta.js FOKUSVIRTA_KORTIT
  // = false, avaaFokusvirta palauttaa false), eikä aikajanan avauslaatikon
  // kuvaa (esittely.kuva) käytä yksikään linssi: kumpaakaan ei piirry.
  // Lehden etusivulla on useita kuvia: jokainen näkyvä kuva napautetaan erikseen.
  { nimi: 'kaupunkilehti Pariisi', avaa: 'lehti:pariisi', kortti: 'dialog.lehti[open]', kuva: 'img', kaikkiKuvat: true },
];
const selain = await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
await ctx.addInitScript((d) => {
  try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
}, tallenne);
const s = await ctx.newPage();
await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname), (r) => r.abort());
await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
  const v = await ampariHaku(r.request().url());
  if (!v) { r.abort(); return; }
  r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
});
await s.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 }).then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki);
await s.waitForTimeout(3000);
// PINNAT_VAIN=regex rajaa ajon (työn aikainen silmukka).
const VAIN = process.env.PINNAT_VAIN ? new RegExp(process.env.PINNAT_VAIN, 'i') : null;
for (const p of PINNAT.filter((x) => !VAIN || VAIN.test(x.nimi))) {
  const tulos = await s.evaluate(async ({ p, rivi }) => {
    const RE = new RegExp(rivi, 'i');
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros, [class*="zoomkerros"], [class*="fokuskohde-zoom"]')) el.remove();
    const [laji, a, b] = p.avaa.split(':');
    if (laji === 'ihmisen') {
      const { ui } = window.matkakirja;
      ui.busy = false;
      if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
      if (!ui.aikajana) ui.valitseLinssi('ihmisen-matka');
      for (let i = 0; i < 600 && !ui.nostokortti; i += 1) await odota(25);
      await ui.aikajana?.virrat?.valmis;
      ui.nostokortti?.avaa(a);
      await odota(1500);
    } else if (laji === 'hetki') {
      const { HISTORIAN_HETKET } = await import('/js/packs/historian-hetket.js');
      const { avaaHetki } = await import('/js/historian-hetket.js');
      const h = HISTORIAN_HETKET.find((x) => x.kuvat?.length);
      avaaHetki(window.matkakirja.ui, h.iso, h);
    } else if (laji === 'taky') {
      const { avaaElaintaky } = await import('/js/elaintaky.js');
      avaaElaintaky(window.matkakirja.ui, a);
    } else if (laji === 'virta') {
      const { avaaFokusvirta } = await import('/js/fokusvirta.js');
      const g = window.matkakirja.game;
      const city = g.board.cityById.get(a);
      avaaFokusvirta(window.matkakirja.ui, city);
      await odota(1500);
    } else if (laji === 'lehti') {
      const g = window.matkakirja.game;
      const city = g.board.cityById.get(a);
      window.matkakirja.ui.openArrival(city, { ohitaLehtilukko: true });
      await odota(1500);
    } else if (laji === 'avaus') {
      const { ui } = window.matkakirja;
      ui.busy = false;
      if (!ui.game.player.linssit.includes(a)) ui.game.player.linssit.push(a);
      ui.aikajana?.pura?.();
      ui.valitseLinssi(a);
      for (let i = 0; i < 400 && !document.querySelector('.aikajana-avaus-kuva img'); i += 1) await odota(25);
      await odota(800);
    } else if (laji === 'kohde') {
      const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
      const kohde = (KOHDE_MAAT[a] ?? []).find((k) => k.id === b);
      if (!kohde) return { virhe: 'ei kohdetta' };
      avaaFokuskohde(window.matkakirja.ui, kohde);
    } else {
      const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
      avaaNostonTunnuksella(window.matkakirja.ui, a);
    }
    await odota(700);
    if (p.lisaa) { document.querySelector(`${p.kortti} .nostokuva-lisaa`)?.click(); await odota(700); }
    const kortti = [...document.querySelectorAll(p.kortti)].find((e) => e.querySelector('img')) ?? document.querySelector(p.kortti);
    if (!kortti) return { virhe: 'ei korttia' };
    const nakyva = (e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
    const rivit = [...kortti.querySelectorAll('*')]
      .filter((e) => nakyva(e) && [...e.childNodes].some((c) => c.nodeType === 3 && RE.test(c.textContent)))
      .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}: ${e.textContent.trim().slice(0, 50)}`);
    const nappi = kortti.querySelector(p.kuva);
    /*
     * SUURENNOS = napautuksen jälkeen näkyviin tulleet lähderivit missä
     * tahansa. Lehden suurennos (ui.js openLightbox) avautuu dialogin
     * SISÄÄN, joten "kortin ulkopuolella" ei riitä rajaukseksi.
     */
    const lahderivit = () => [...document.body.querySelectorAll('*')].filter((e) => nakyva(e)
      && [...e.childNodes].some((c) => c.nodeType === 3 && RE.test(c.textContent)));
    const ennenNapautusta = new Set(lahderivit());
    const suurennoksessa = () => lahderivit().filter((e) => !ennenNapautusta.has(e));
    /*
     * NAPAUTUS KUTEN SORMELLA: pelin napautuksesta-apuri (js/ui.js) vaatii
     * pointerdownin samasta kohdasta ennen clickiä, muuten se tulkitsee
     * klikkauksen vieritykseksi. Pelkkä el.click() ohitti lehden kuvat.
     */
    const napauta = (el) => {
      el?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
      el?.click();
    };
    const nakyvaKuva = () => [...kortti.querySelectorAll(p.kuva)].find(nakyva) ?? kortti.querySelector(p.kuva);
    if (p.kaikkiKuvat) {
      const kuvat = [...kortti.querySelectorAll(p.kuva)].filter(nakyva);
      const perKuva = [];
      for (const kuva of kuvat) {
        kuva.scrollIntoView({ block: 'center' });
        await odota(200);
        const ennen = new Set(lahderivit());
        napauta(kuva);
        await odota(1000);
        let uudet = lahderivit().filter((e) => !ennen.has(e));
        /*
         * MATKAILIJALLE-KUVA ON OPPAAN OVI (omistaja 16.8.2026, js/nahtavyydet.js):
         * napautus avaa Matkaoppaan, jossa sama kuva on. Lähde on silloin
         * yhden napautuksen päässä oppaan kuvan suurennoksessa.
         */
        let reitti = 'suurennos';
        const opas = document.querySelector('dialog.opas-arkki[open]');
        if (!uudet.length && opas) {
          reitti = 'opas → suurennos';
          const oppaanKuva = [...opas.querySelectorAll('img')].find(nakyva);
          oppaanKuva?.scrollIntoView({ block: 'center' });
          await odota(200);
          const ennen2 = new Set(lahderivit());
          napauta(oppaanKuva);
          await odota(1000);
          uudet = lahderivit().filter((e) => !ennen2.has(e));
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          await odota(300);
          opas.close?.();
        }
        perKuva.push({ kuva: String(kuva.parentElement?.className).split(' ')[0], reitti, rivit: uudet.length });
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        document.querySelector('.lightbox-sulje, [class*="lightbox"] button')?.click?.();
        await odota(500);
      }
      return {
        rivit, kuvanappi: kuvat.length > 0, perKuva,
        suurennoksessa: perKuva.every((k) => k.rivit > 0) ? perKuva.map((k) => k.kuva) : [],
      };
    }
    // Kuva edellä -kortissa ensimmäinen napautus voi avata jutun; toinen avaa suurennoksen.
    let kaikki = [];
    for (let i = 0; i < 2 && !kaikki.length; i += 1) {
      napauta(nakyvaKuva() ?? nappi);
      await odota(900);
      kaikki = suurennoksessa();
    }
    return { rivit, kuvanappi: Boolean(nappi), suurennoksessa: kaikki.map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`).slice(0, 4) };
  }, { p, rivi: RIVI.source });
  tieto(p.nimi, JSON.stringify(tulos));
  vaadi(`${p.nimi}: kortilla ei lähde- eikä havainnekuvariviä`, !tulos.virhe && tulos.rivit.length === 0, JSON.stringify(tulos.rivit ?? tulos));
  vaadi(`${p.nimi}: suurennoksessa lähderivi on`, !tulos.virhe && tulos.kuvanappi && tulos.suurennoksessa.length > 0, JSON.stringify(tulos));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `kuvalahteet-${p.nimi.replace(/[^a-z0-9]+/gi, '-')}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  await s.keyboard.press('Escape');
  await s.waitForTimeout(300);
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
