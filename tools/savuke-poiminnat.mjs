/*
 * SELAINSAVUKE: pöllöpoiminnat (omistajan tilaus 23.8.2026).
 *
 * Yksikkötestit näkevät avaimet, kuratointirajan ja vientilohkon, mutta
 * eivät sitä, ilmestyykö pilleri oikeaan paikkaan oikeassa selaimessa.
 * Tämä ajaa ketjun läpi:
 *
 *   1. KEHITTÄJÄTILA: laitteelle tallennettu pari näkyy pillerinä
 *      nähtävyysjutun lopussa, ja napautus avaa minipopupin, jossa on
 *      kysymys otsikkona ja tallennettu vastaus tekstinä
 *   2. AIHESIVU: sama pilleri kaupunkilehden aihesivun lopussa
 *   3. VIENTI: Tilannelehden Pöllöpoiminnat-sivu näyttää parin ja siitä
 *      lasketun POLLO_POIMINNAT-lohkon
 *   4. PELITILA: ilman kehittäjätilaa laitteen omat parit EIVÄT näy —
 *      kuratoimatonta sisältöä ei näytetä pelaajille
 *   5. PELAAJAN EHDOTUS: pöllön vastauksen alla on "Ehdota
 *      tallennettavaksi", ja se lähtee ehdotuskanavan /laheta-päätteeseen
 *      kysymys, vastaus ja artikkelitunniste mukanaan
 *
 * Verkkoa ei tarvita: ehdotuspääte siepataan routella ja pöllön vastaus
 * tulee mockatusta rajapinnasta.
 *
 *   node tools/savuke-poiminnat.mjs
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const POLLO_URL = 'https://pollo.testi.invalid';
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (polku.endsWith('js/packs/pollo-asetukset.js')) {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(`export const POLLOPALVELIN = '${POLLO_URL}';\n`);
    return;
  }
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8736, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const PARI = {
  kysymys: 'Miksi sillan tornit ovat goottilaiset?',
  vastaus: 'Viktoriaaninen Lontoo halusi uuden tekniikan näyttävän vanhalta.'
    + '\n\nKivikuori peittää teräsrungon.',
};
const AVAIN = 'juttu:lontoo:Tower Bridge';
const AIHE_AVAIN_ODOTUS = /^aihe:lontoo:/;

/** Avaa pelin ja vie pelaajan Lontooseen. */
async function avaaPeli(ctx, { kehittaja }) {
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    virheet.push(`konsoli: ${m.text()}`);
  });
  await sivu.addInitScript(([paalla, avain, pari]) => {
    if (paalla) localStorage.setItem('matkakirja-kehittaja', '1');
    else localStorage.removeItem('matkakirja-kehittaja');
    localStorage.setItem('matkakirja-pollo-poiminnat', JSON.stringify({ [avain]: [pari] }));
  }, [kehittaja, AVAIN, PARI]);
  await sivu.route((url) => !/127\.0\.0\.1|localhost|pollo\.testi\.invalid|matkakirja-ehdotukset/.test(url.href),
    (route) => route.abort());
  await sivu.goto('http://127.0.0.1:8736/index.html', { waitUntil: 'load' });
  await sivu.waitForTimeout(2200);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('lontoo', null);
    g.player.money = 2000;
    g.polloLoydetty = true;
    window.matkakirja.ui.render();
    window.matkakirjaPollo?.paivitaNakyvyys?.();
  });
  await sivu.waitForTimeout(900);
  return { sivu, virheet };
}

/** Avaa Tower Bridgen jutun samalla reitillä kuin peli itse. */
async function avaaJuttu(sivu) {
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const { NAHTAVYYSJUTUT } = await import('./js/packs/nahtavyysjutut.js');
    ui.lehtitila.arrivalShownFor = 'lontoo';
    ui.avaaNahtavyys({ nimi: 'Tower Bridge', ...NAHTAVYYSJUTUT.lontoo['Tower Bridge'] },
      null, { henkilolinkit: [] });
  });
  await sivu.waitForTimeout(600);
}

/* ================================================================== */
/* 1) Kehittäjätila: pilleri jutun lopussa ja minipopup                */
/* ================================================================== */

const kehCtx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const { sivu, virheet } = await avaaPeli(kehCtx, { kehittaja: true });
await avaaJuttu(sivu);

const juttu = await sivu.evaluate(() => {
  const sisalto = document.getElementById('nahtavyys-sisalto');
  const rivi = sisalto?.querySelector('.pollo-poiminnat');
  return {
    pillereita: rivi?.querySelectorAll('.pollo-pilleri').length ?? 0,
    teksti: rivi?.querySelector('.pollo-pilleri')?.textContent ?? '',
    viimeinen: sisalto?.lastElementChild?.className ?? '',
    polloEsto: rivi?.getAttribute('data-pollo') ?? '',
    lukijaLeipa: rivi?.querySelectorAll('[data-lukija]').length ?? 0,
  };
});
vaadi('pilleri ilmestyy nähtävyysjutun loppuun', juttu.pillereita === 1 && juttu.teksti === PARI.kysymys,
  JSON.stringify(juttu));
vaadi('rivi on jutun viimeinen elementti', /pollo-poiminnat/.test(juttu.viimeinen), juttu.viimeinen);
vaadi('pillerit eivät päädy pöllön kontekstiin eivätkä luentaan',
  juttu.polloEsto === 'ei' && juttu.lukijaLeipa === 0, JSON.stringify(juttu));
// Pilleririvi on jutun lopussa: kaappaus otetaan sieltä, missä se on.
await sivu.evaluate(() => {
  const kortti = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
  // Yläreunan vahti (js/nahtavyydet.js) nollaa liukuman, kunnes
  // käyttäjä itse tarttuu korttiin — savuke tekee saman eleen.
  kortti.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
  kortti.scrollTop = kortti.scrollHeight;
});
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'poiminnat-juttu-pilleri.png') });

await sivu.evaluate(() => document.querySelector('#nahtavyys-sisalto .pollo-pilleri').click());
await sivu.waitForTimeout(400);
const popup = await sivu.evaluate(() => {
  const p = document.querySelector('dialog.minipopup');
  return {
    auki: p ? (p.open ? 1 : 0) : -1,
    otsikko: p?.querySelector('.minipopup-otsikko')?.textContent ?? '',
    kappaleita: p?.querySelectorAll('.minipopup-sisalto p').length ?? 0,
    teksti: p?.querySelector('.minipopup-sisalto p')?.textContent ?? '',
  };
});
vaadi('napautus avaa minipopupin kysymys otsikkona', popup.auki === 1 && popup.otsikko === PARI.kysymys,
  JSON.stringify(popup));
vaadi('popupissa on tallennettu vastaus kappaleittain',
  popup.kappaleita === 2 && PARI.vastaus.startsWith(popup.teksti), JSON.stringify(popup));
await sivu.screenshot({ path: join(ULOS, 'poiminnat-minipopup.png') });
await sivu.evaluate(() => document.querySelector('dialog.minipopup .minipopup-sulje').click());
await sivu.waitForTimeout(300);

/* --- kehittäjän tallennus pöllön chatista ------------------------- */

await sivu.route(`${POLLO_URL}/**`, (route) => route.fulfill({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify({
    vastaus: 'Maksu perittiin vain jalankulkijoilta yläkäytävillä.',
    jatkot: [], ehdotukset: [],
  }),
}));
await sivu.route(POLLO_URL, (route) => route.fallback());
await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await sivu.waitForTimeout(600);
await sivu.evaluate(() => window.matkakirjaPollo.kysy('Maksoiko sillan ylitys?'));
await sivu.waitForTimeout(2500);
const tallennus = await sivu.evaluate(() => ({
  nappi: document.querySelector('.pollo-poimintanappi')?.textContent ?? '',
}));
vaadi('kehittäjätilassa vastauksen alla on Tallenna juttuun',
  tallennus.nappi === 'Tallenna juttuun', JSON.stringify(tallennus));
await sivu.screenshot({ path: join(ULOS, 'poiminnat-tallennusnappi.png') });

await sivu.evaluate(() => document.querySelector('.pollo-poimintanappi').click());
await sivu.waitForTimeout(500);
const tallennettu = await sivu.evaluate(() => ({
  kuittaus: document.querySelector('.pollo-poimintatila')?.textContent ?? '',
  pillereita: document.querySelectorAll('#nahtavyys-sisalto .pollo-pilleri').length,
  varastossa: (JSON.parse(localStorage.getItem('matkakirja-pollo-poiminnat') ?? '{}')['juttu:lontoo:Tower Bridge'] ?? []).length,
}));
vaadi('tallennus vie parin laitteelle ja pilleri ilmestyy heti',
  /tallennettu/i.test(tallennettu.kuittaus) && tallennettu.pillereita === 2
  && tallennettu.varastossa === 2, JSON.stringify(tallennettu));
await sivu.evaluate(() => window.matkakirjaPollo.sulje());
await sivu.waitForTimeout(300);
await sivu.evaluate(() => {
  const kortti = document.querySelector('#nahtavyys-dialog .nahtavyys-kortti');
  kortti.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
  kortti.scrollTop = kortti.scrollHeight;
});
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'poiminnat-kaksi-pilleria.png') });

await sivu.evaluate(() => document.getElementById('nahtavyys-dialog').close());

/* ================================================================== */
/* 2) Aihesivu: pilleri lehden jutun loppuun                           */
/* ================================================================== */

const aihe = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const city = ui.game.board.cityById.get('lontoo');
  ui.openArrival(city);
  await new Promise((r) => setTimeout(r, 900));
  const { naytaTutkiSivu } = await import('./js/lehti.js');
  const { nykyinenPoimintaAvain } = await import('./js/pollopoiminnat.js');
  const { tallennaPoiminta } = await import('./js/pollopoiminnat.js');
  naytaTutkiSivu(ui, 1, { heti: true });
  const avain = nykyinenPoimintaAvain(ui);
  tallennaPoiminta(avain, 'Kuinka vanha lehti tämä on?', 'Se on vuodelta 1873.');
  naytaTutkiSivu(ui, 1, { heti: true });
  const kohde = document.getElementById('arrival-kategoria');
  const rivi = kohde.querySelector('.pollo-poiminnat');
  return {
    avain,
    pillereita: rivi?.querySelectorAll('.pollo-pilleri').length ?? 0,
    ennenTehtavaa: Boolean(rivi && (!kohde.querySelector('.minitehtava')
      || (rivi.compareDocumentPosition(kohde.querySelector('.minitehtava')) & 4) !== 0)),
  };
});
vaadi('aihesivun avain on sovittua muotoa', AIHE_AVAIN_ODOTUS.test(aihe.avain ?? ''), aihe.avain);
vaadi('pilleri ilmestyy aihesivun loppuun', aihe.pillereita === 1, JSON.stringify(aihe));
vaadi('pilleririvi on ennen minitehtävää', aihe.ennenTehtavaa === true, JSON.stringify(aihe));
await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  if (kortti) kortti.scrollTop = kortti.scrollHeight;
});
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, 'poiminnat-aihesivu.png') });

/* ================================================================== */
/* 3) Vienti: Tilannelehden Pöllöpoiminnat-sivu                        */
/* ================================================================== */

const vienti = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { avaaTilanneLehti, naytaTutkiSivu } = await import('./js/lehti.js');
  avaaTilanneLehti(ui);
  const i = ui.lehtitila.tutkiSivut.findIndex((s) => s.id === 'tilanne-poiminnat');
  naytaTutkiSivu(ui, i + 1, { heti: true });
  const lohko = document.querySelector('.poimintavienti-lohko');
  return {
    sivu: ui.lehtitila.tutkiSivut[i]?.nimi ?? '',
    avaimia: document.querySelectorAll('.poimintavienti-avain').length,
    lohko: lohko?.textContent ?? '',
    napit: [...document.querySelectorAll('.poimintavienti-napit button')].map((b) => b.textContent),
  };
});
vaadi('Tilannelehdessä on Pöllöpoiminnat-sivu', vienti.sivu === 'Pöllöpoiminnat', vienti.sivu);
vaadi('vientilohko sisältää tallennetun parin',
  vienti.lohko.includes('export const POLLO_POIMINNAT')
  && vienti.lohko.includes(PARI.kysymys) && vienti.lohko.includes(AVAIN),
  `${vienti.avaimia} avainta, ${vienti.lohko.length} merkkiä`);
vaadi('sivulla on Tyhjennä-nappi', vienti.napit.includes('Tyhjennä'), JSON.stringify(vienti.napit));
await sivu.screenshot({ path: join(ULOS, 'poiminnat-vienti.png') });

vaadi('kehittäjätilan ajo ilman virheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));

/* ================================================================== */
/* 4) Pelitila: kuratoimaton pari EI näy — ja ehdotusnappi näkyy       */
/* ================================================================== */

const peliCtx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const { sivu: peliSivu, virheet: peliVirheet } = await avaaPeli(peliCtx, { kehittaja: false });

// Pöllön rajapinta: yksi valmis vastaus ilman verkkoa.
await peliSivu.route(`${POLLO_URL}/**`, (route) => route.fulfill({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify({
    vastaus: 'Tornit ovat kivikuorta teräsrungon päällä.',
    jatkot: [], ehdotukset: [],
  }),
}));
await peliSivu.route(POLLO_URL, (route) => route.fallback());
// Ehdotuskanava siepataan: payload luetaan siitä, mitä peli oikeasti lähettää.
const ehdotukset = [];
await peliSivu.route('**/matkakirja-ehdotukset*/**', async (route) => {
  const pyynto = route.request();
  ehdotukset.push({ url: pyynto.url(), runko: pyynto.postData() ?? '' });
  await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
});

await avaaJuttu(peliSivu);
const pelitila = await peliSivu.evaluate(() => ({
  pillereita: document.querySelectorAll('#nahtavyys-sisalto .pollo-pilleri').length,
  omia: (JSON.parse(localStorage.getItem('matkakirja-pollo-poiminnat') ?? '{}')['juttu:lontoo:Tower Bridge'] ?? []).length,
}));
vaadi('pelitilassa laitteen oma pari EI näy pillerinä',
  pelitila.pillereita === 0 && pelitila.omia === 1, JSON.stringify(pelitila));
await peliSivu.screenshot({ path: join(ULOS, 'poiminnat-pelitila-ei-pilleria.png') });

// Pöllö auki jutun päältä ja yksi kysymys.
await peliSivu.evaluate(() => {
  document.querySelector('#nahtavyys-dialog .pollo-nappi, .pollo-nappi')?.click();
});
await peliSivu.waitForTimeout(600);
await peliSivu.evaluate(() => window.matkakirjaPollo.kysy('Miksi tornit ovat goottilaiset?'));
await peliSivu.waitForTimeout(2500);

const nappi = await peliSivu.evaluate(() => {
  const rivi = document.querySelector('.pollo-poimintarivi');
  return { on: Boolean(rivi), teksti: rivi?.querySelector('button')?.textContent ?? '' };
});
vaadi('pelitilassa vastauksen alla on ehdotusnappi',
  nappi.on && /ehdota/i.test(nappi.teksti), JSON.stringify(nappi));
await peliSivu.screenshot({ path: join(ULOS, 'poiminnat-ehdotusnappi.png') });

await peliSivu.evaluate(() => document.querySelector('.pollo-poimintanappi').click());
await peliSivu.waitForTimeout(1200);
const payload = ehdotukset[0]?.runko ?? '';
vaadi('ehdotus lähtee ehdotuskanavan /laheta-päätteeseen',
  /\/laheta$/.test(ehdotukset[0]?.url ?? ''), ehdotukset[0]?.url ?? 'ei pyyntöä');
vaadi('payloadissa on kysymys, vastaus ja artikkelitunniste',
  payload.includes('Miksi tornit ovat goottilaiset?')
  && payload.includes('Tornit ovat kivikuorta')
  && payload.includes(AVAIN) && payload.includes('Pöllöpoiminta'),
  `${payload.length} merkkiä`);
const kuittaus = await peliSivu.evaluate(() => document.querySelector('.pollo-poimintatila')?.textContent ?? '');
vaadi('pelaaja saa kuittauksen eikä pöllö kaadu', /kiitos/i.test(kuittaus), kuittaus);
await peliSivu.screenshot({ path: join(ULOS, 'poiminnat-ehdotus-lahetetty.png') });
vaadi('pelitilan ajo ilman virheitä', peliVirheet.length === 0, peliVirheet.slice(0, 2).join(' | '));

/* ================================================================== */

await selain.close();
palvelin.close();
const lapi = tulokset.filter((t) => t.ok).length;
console.log(`\n${lapi}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(lapi === tulokset.length ? 0 : 1);
