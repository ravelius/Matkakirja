/*
 * Savuke: lehden asettelu v666 (omistaja 14.8.2026: "Maa sivulla
 * lipun voisi keskittää otsikon kanssa ja lukita lukija napin oikeaan
 * reunaan samalle korkeudelle. Kaupunki lehti samoin. ... Nuoli alas
 * ja ala navigointi pois kokonaan. Ala ja yläreunan napautus
 * scrollaamaan alas ja ylös").
 *  1. Sivupilleriä (.tutki-navi) ja pohjaväkästä (.tutki-pohjaan)
 *     ei ole dialogissa.
 *  2. Lukijan kaiutin asuu tarttuvassa otsikkorivissä ja on otsikon
 *     rivillä oikeassa reunassa — etusivulla ja aihesivulla, sekä
 *     kaupunki- että maalehdessä.
 *  3. Maalehden lippu kulkee otsikkotekstin perässä rivin sisällä
 *     (ei enää naulattuna oikeaan reunaan).
 *  4. Alareunan napautus vierittää sivun pohjaan ja otsikon napautus
 *     takaisin alkuun; napautus napin päällä ei vieritä.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
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
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const konteksti = await selain.newContext({ viewport: { width: 390, height: 844 } });
/*
 * Lukijaääni pois pelistä: kaiuttimen napautus käynnistäisi muuten
 * luennan ja sen seurantavieritys sotkisi reunanapautustestin.
 * Tämä savuke mittaa asettelua, ei luentaa (ks.
 * savuke-lukijan-seuranta.mjs) — puhepyynnöt katkaistaan, jolloin
 * luenta putoaa laitteen omalle äänelle, joka ei vieritä.
 */
await konteksti.route('**samireivinen.workers.dev/**', (route) => route.abort());
const sivu = await konteksti.newPage();
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1800);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(1500);

/* Kaiuttimen mitat suhteessa otsikkoriviinsä. */
const NAPPIMITAT = `(() => {
  const nappi = document.querySelector('#arrival-dialog .lukija-nappi');
  if (!nappi) return null;
  const koti = nappi.parentElement;
  const n = nappi.getBoundingClientRect();
  const k = koti.getBoundingClientRect();
  return {
    kodissa: koti.matches('#arrival-city, .aihe-nimi'),
    keskiero: Math.abs((k.top + k.bottom) / 2 - (n.top + n.bottom) / 2),
    oikeaEtaisyys: k.right - n.right,
  };
})()`;

const kaupunki = await sivu.evaluate(async (NAPPI) => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const mittaa = () => eval(NAPPI); // eslint-disable-line no-eval
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await odota(800);
  const dialogi = document.getElementById('arrival-dialog');
  const etusivu = mittaa();
  ui.vaihdaTutkiSivu(1);
  await odota(500);
  const aihesivu = mittaa();
  const aiheNimessa = Boolean(document.querySelector('.aihe-nimi > .lukija-nappi'));
  return {
    eiPilleria: !dialogi.querySelector('.tutki-navi'),
    eiVakasta: !dialogi.querySelector('.tutki-pohjaan'),
    etusivu,
    aihesivu,
    aiheNimessa,
  };
}, NAPPIMITAT);
vaadi('sivupilleri ja pohjaväkänen poissa', kaupunki.eiPilleria && kaupunki.eiVakasta,
  JSON.stringify({ pilleri: !kaupunki.eiPilleria, vakanen: !kaupunki.eiVakasta }));
vaadi('etusivulla kaiutin on nimiössä otsikon rivillä (ero ≤ 3 px)',
  Boolean(kaupunki.etusivu?.kodissa) && kaupunki.etusivu.keskiero <= 3,
  JSON.stringify(kaupunki.etusivu));
vaadi('aihesivulla kaiutin on aihe-nimessä otsikon rivillä (ero ≤ 3 px)',
  kaupunki.aiheNimessa && Boolean(kaupunki.aihesivu?.kodissa) && kaupunki.aihesivu.keskiero <= 3,
  JSON.stringify(kaupunki.aihesivu));
vaadi('kaiutin on lukittu oikeaan reunaan molemmilla sivuilla (etäisyys ≤ 24 px)',
  kaupunki.etusivu?.oikeaEtaisyys >= -1 && kaupunki.etusivu.oikeaEtaisyys <= 24
  && kaupunki.aihesivu?.oikeaEtaisyys >= -1 && kaupunki.aihesivu.oikeaEtaisyys <= 24,
  JSON.stringify({ etusivu: kaupunki.etusivu?.oikeaEtaisyys, aihesivu: kaupunki.aihesivu?.oikeaEtaisyys }));

/* Reunanapautukset aihesivulla (tekstiä riittää vieritettäväksi). */
const alkuTop = await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  kortti.scrollTop = 0;
  return kortti.scrollTop;
});
await sivu.mouse.click(195, 838);
// Piilotetun sivun ajastimet viivästyvät headlessissa — varapolku
// (ui.js vierita, 220 ms) voi laueta vasta sekuntien päästä.
await sivu.waitForTimeout(2500);
const pohjassa = await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  return {
    scrollTop: kortti.scrollTop,
    pohjassa: kortti.scrollTop + kortti.clientHeight >= kortti.scrollHeight - 8,
  };
});
vaadi('alareunan napautus vierittää sivun pohjaan',
  alkuTop === 0 && pohjassa.pohjassa && pohjassa.scrollTop > 200, JSON.stringify(pohjassa));
const otsikkoKeskelle = await sivu.evaluate(() => {
  const r = document.querySelector('#arrival-dialog .aihe-nimi').getBoundingClientRect();
  return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
});
await sivu.mouse.click(otsikkoKeskelle.x, otsikkoKeskelle.y);
await sivu.waitForTimeout(2500);
const ylhaalla = await sivu.evaluate(
  () => document.querySelector('#arrival-dialog .dialog-card').scrollTop,
);
vaadi('otsikon napautus vierittää takaisin alkuun', ylhaalla === 0,
  JSON.stringify({ scrollTop: ylhaalla }));
/*
 * Napautus napin päällä ei saa laukaista reunakaistaa: hampurilainen
 * istuu keskellä yläkaistaa, mutta napit voittavat kaistan.
 * (Kaiutinta ei käytetä tähän — sen napautus käynnistää luennan, ja
 * luennan seuranta vierittää tarkoituksella kohdan alkuun.)
 */
await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  kortti.scrollTop = 40;
});
const hampurilaisKohta = await sivu.evaluate(() => {
  const r = document.querySelector('#arrival-dialog .lehti-hampurilainen').getBoundingClientRect();
  return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
});
await sivu.mouse.click(hampurilaisKohta.x, hampurilaisKohta.y);
await sivu.waitForTimeout(600);
const nappiJalkeen = await sivu.evaluate(() => ({
  scrollTop: document.querySelector('#arrival-dialog .dialog-card').scrollTop,
  levyAuki: Boolean(document.querySelector('#arrival-dialog > .sisallys-levy')),
}));
vaadi('napautus napin päällä ei vieritä (hampurilainen avaa valikon, kaista ei laukea)',
  nappiJalkeen.scrollTop === 40 && nappiJalkeen.levyAuki,
  JSON.stringify(nappiJalkeen));
await sivu.evaluate(() => {
  document.querySelector('#arrival-dialog > .sisallys-levy')?.remove();
});

mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/lehtiasettelu-kaupunki.png' });

const maalehti = await sivu.evaluate(async (NAPPI) => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const mittaa = () => eval(NAPPI); // eslint-disable-line no-eval
  ui.closeArrival();
  await odota(300);
  ui.avaaMaalehti('GBR');
  for (let i = 0; i < 100 && (ui.tutkiSivut?.length ?? 0) < 3; i += 1) await odota(100);
  await odota(400);
  // Ensimmäinen sivu on kartta, jolla ei ole lippua — lippu asuu
  // aihesivujen otsikoissa (avaaMaalehti: maaLippu vain aiheille).
  ui.vaihdaTutkiSivu(1);
  await odota(500);
  const dialogi = document.getElementById('arrival-dialog');
  const nimi = dialogi.querySelector('.wiki-kategoria .aihe-nimi:not([hidden])')
    ?? dialogi.querySelector('.aihe-nimi');
  const lippu = nimi?.querySelector('.aihe-lippu');
  const nappi = mittaa();
  let lipputulos = null;
  if (lippu) {
    const l = lippu.getBoundingClientRect();
    const n = nimi.getBoundingClientRect();
    lipputulos = {
      asema: getComputedStyle(lippu).position,
      // Rivin sisällä kulkeva lippu EI ole naulattu oikeaan reunaan:
      // otsikko on keskitetty, joten lipun ja reunan väliin jää tilaa.
      etaisyysOikeasta: n.right - l.right,
      otsikonRivilla: Math.abs((n.top + n.bottom) / 2 - (l.top + l.bottom) / 2) <= 8,
    };
  }
  return {
    eiPilleria: !dialogi.querySelector('.tutki-navi'),
    lippuOn: Boolean(lippu),
    lippu: lipputulos,
    nappi,
  };
}, NAPPIMITAT);
vaadi('maalehdessä sivupilleri poissa', maalehti.eiPilleria === true);
vaadi('maalehden lippu kulkee otsikon rivissä eikä ole naulattu reunaan',
  maalehti.lippuOn && maalehti.lippu?.asema === 'static'
  && maalehti.lippu.otsikonRivilla && maalehti.lippu.etaisyysOikeasta > 40,
  JSON.stringify(maalehti.lippu ?? { lippuOn: maalehti.lippuOn }));
vaadi('maalehdessä kaiutin on aihe-nimessä otsikon rivillä oikeassa reunassa',
  Boolean(maalehti.nappi?.kodissa) && maalehti.nappi.keskiero <= 3
  && maalehti.nappi.oikeaEtaisyys >= 0 && maalehti.nappi.oikeaEtaisyys <= 24,
  JSON.stringify(maalehti.nappi));

await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/lehtiasettelu-maa.png' });

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
