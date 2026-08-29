/*
 * Savuke: lehden alareunan ankkuri-invariantit (18.8.2026, koko
 * v784–v851-perheen purku) ja taustapaluun sovitus.
 *
 * INVARIANTTI: lehtiarkin alareuna = näkyvän alueen alareuna −
 * turva-ala − 0.8rem (leveä ruutu) tai täsmälleen näkyvä alareuna
 * (kapea ruutu) — EIKÄ se saa riippua yhdestäkään JS-mittauksesta.
 *
 *  1. Leveä ruutu: kortin ylä- ja alareuna ankkureissa, ei inline-mittoja.
 *  2. Roskamittaus EI liikuta alareunaa (vanha juurisyy: liikutti).
 *  3. Kierto vaakaan ja takaisin: invariantti pätee molemmissa.
 *  4. Kapea ruutu: kortti täyttää näkymän tarkalleen.
 *  5. Taustapaluu ajaa kartan sovituksen (fitViewBox) heti ja
 *     jälkitarkistuksissa, eikä nollaa käsipanorointia kun koko ei
 *     muuttunut.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// iPad pysty; WKWebView'n turva-alueet simuloidaan --turva-muuttujiin,
// koska env() ei anna Chromiumissa arvoja.
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
});
const sivu = await ctx.newPage();
// Pöllöpalvelin katkaistaan: esilataus ei saa kuluttaa kiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  document.documentElement.style.setProperty('--turva-yla', '24px');
  document.documentElement.style.setProperty('--turva-ala', '20px');
});

/** Kortin geometria ja invarianttipoikkeamat nykyisillä turvilla. */
const mittaa = () => sivu.evaluate(() => {
  const d = document.getElementById('arrival-dialog');
  const kortti = d?.querySelector('.dialog-card');
  const r = kortti?.getBoundingClientRect();
  const juuri = getComputedStyle(document.documentElement);
  const turva = (nimi) => parseFloat(juuri.getPropertyValue(nimi)) || 0;
  const rem = parseFloat(juuri.fontSize) || 16;
  const rako = 0.8 * rem;
  return {
    leveä: window.innerWidth >= 700,
    ylaVirhe: r ? Math.abs(r.top - (turva('--turva-yla') + rako)) : 1e9,
    alaVirhe: r ? Math.abs((window.innerHeight - turva('--turva-ala') - rako) - r.bottom) : 1e9,
    kapeaYla: r ? Math.abs(r.top) : 1e9,
    kapeaAla: r ? Math.abs(window.innerHeight - r.bottom) : 1e9,
    inline: {
      h: d?.style.height ?? null,
      mh: d?.style.maxHeight ?? null,
      kh: kortti?.style.height ?? null,
      kmh: kortti?.style.maxHeight ?? null,
    },
  };
});

/** Onko lehti oikeasti auki juuri nyt? */
const lehtiAuki = () => sivu.evaluate(() => Boolean(document.getElementById('arrival-dialog')?.open));

// 1. Leveä ruutu: ankkuri-invariantti ja ei inline-korkeuksia.
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  /*
   * LEHTILUKKO AUKI ENNEN AVAUSTA (v1323-linjaus, 29.8.2026 —
   * "Fokusvirran kortit pelaajan polkuun", FOKUSVIRTA_KORTIT = true).
   * Lontoo on aallon 2 fokusvirtakaupunki: korttiannostelun päällä
   * lehtilukko (js/fokusvirta.js fokusvirtaOhittaaLehden) ottaa lehden
   * paikan niin kauan kuin laatta on kääntämättä, jolloin openArrival
   * palaa heti eikä #arrival-dialogia avata lainkaan — ja kaikki
   * arkkigeometrian väitteet mittasivat mainissa olematonta korttia
   * (ylaVirhe 36.8, alaVirhe 1079.2 = 1e9:n sijaan puolityhjä mitta).
   * Laatta poistetaan siis ennen avausta: se on täsmälleen se tila,
   * jossa pelaaja lehden oikeasti avaa. Mitattava asia on lehtiarkin
   * alareuna, ei se kumpi pinta saapumisen omistaa.
   */
  ui.game.tokens?.delete('lontoo');
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 400));
});
await sivu.waitForTimeout(600);
// Vartio vartioille: ilman auki olevaa lehteä tapaukset 1–4 mittaavat tyhjää.
vaadi('lehti on auki arkkimittausten ajan (lehtilukko ei ohita)', await lehtiAuki());
let t = await mittaa();
vaadi('leveä: yläreuna = turva-ylä + 0.8rem', t.ylaVirhe <= 2, JSON.stringify(t));
vaadi('leveä: alareuna = näkyvä alareuna − turva-ala − 0.8rem', t.alaVirhe <= 2, JSON.stringify(t));
vaadi('leveä: lehtiarkilla ei inline-korkeuksia',
  !t.inline.h && !t.inline.mh && !t.inline.kh && !t.inline.kmh, JSON.stringify(t.inline));

// 2. Roskamittaus ei liikuta alareunaa (vanha juurisyy: 139 px kaista).
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.oikeaKorkeusmitta = ui.mittaaNakymanKorkeus;
  ui.mittaaNakymanKorkeus = () => 834; // jumiutunut vaakamitta
  ui.mitoitaArkinKorkeus();
});
await sivu.waitForTimeout(200);
t = await mittaa();
vaadi('jumiutunut mittaus ei liikuta alareunaa', t.alaVirhe <= 2 && t.ylaVirhe <= 2,
  JSON.stringify(t));
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.mittaaNakymanKorkeus = ui.oikeaKorkeusmitta;
  ui.mitoitaArkinKorkeus();
});

// 3. Kierto vaakaan ja takaisin pystyyn.
await sivu.setViewportSize({ width: 1112, height: 834 });
await sivu.waitForTimeout(900);
t = await mittaa();
vaadi('vaaka: alareuna ankkurissa', t.alaVirhe <= 2, JSON.stringify(t));
await sivu.setViewportSize({ width: 834, height: 1112 });
await sivu.waitForTimeout(900);
t = await mittaa();
vaadi('pysty kierron jälkeen: alareuna ankkurissa', t.alaVirhe <= 2, JSON.stringify(t));

// 4. Kapea ruutu: kortti täyttää näkymän tarkalleen (turvat pehmusteena).
await sivu.setViewportSize({ width: 390, height: 844 });
await sivu.waitForTimeout(900);
vaadi('lehti on yhä auki kierrosten jälkeen (lehtilukko ei ohita)', await lehtiAuki());
t = await mittaa();
vaadi('kapea: kortti täyttää näkymän', t.kapeaYla <= 1 && t.kapeaAla <= 1, JSON.stringify(t));
await sivu.setViewportSize({ width: 834, height: 1112 });
await sivu.waitForTimeout(900);

// 5. Taustapaluun sovitus: fitViewBox heti + jälkitarkistukset, pan säilyy.
const sovitus = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.arrivalDialog.close();
  await new Promise((r) => setTimeout(r, 200));
  let ajoja = 0;
  const alkuperainen = ui.kartta.fitViewBox.bind(ui.kartta);
  ui.kartta.fitViewBox = () => { ajoja += 1; alkuperainen(); };
  const panEnnen = ui.panX;
  document.dispatchEvent(new Event('visibilitychange'));
  const heti = ajoja;
  await new Promise((r) => setTimeout(r, 1800));
  const tulos = { heti, ajoja, panEnnen, panJalkeen: ui.panX };
  ui.kartta.fitViewBox = alkuperainen;
  return tulos;
});
vaadi('taustapaluu sovittaa kartan heti', sovitus.heti >= 1, JSON.stringify(sovitus));
vaadi('taustapaluun jälkitarkistukset ajavat sovituksen uudelleen',
  sovitus.ajoja >= 3, JSON.stringify(sovitus));
vaadi('sovitus ei nollaa panorointia kun koko ei muuttunut',
  (sovitus.panEnnen == null && sovitus.panJalkeen == null)
  || Math.abs((sovitus.panEnnen ?? 0) - (sovitus.panJalkeen ?? 0)) <= 1,
  JSON.stringify(sovitus));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
