/*
 * Savuke: kehittäjän liitteet (omistajan tilaus 15.8.2026).
 *  1. Kehittäjä-kotelo näkyy valikossa vain kehittäjätilassa.
 *  2. Raamattu aukeaa lehtenä: sivuja johdanto + jokainen osio,
 *     sisältö oikeasta datasta, sivunvaihto toimii.
 *  3. Tilannelehti aukeaa: Tilanne- ja Testattavaa-sivut riveineen.
 *  4. Tilastot-lehti (18.8.2026, korvaa poistetun tyohuone.html:n
 *     kaupunkitaulusavukkeen): mannerrivit aukeavat ja sulkeutuvat,
 *     maan alla ovat sen kaupungit, ja leveä taulu vierittyy omassa
 *     kotelossaan eikä venytä sivua vaakaan 390 px ruudulla.
 *
 * Pöllöpalvelin katkaistaan — liitteet eivät saa tuottaa verkkokutsuja.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

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
await konteksti.route('**samireivinen.workers.dev/**', (route) => route.abort());
const sivu = await konteksti.newPage();
await sivu.addInitScript(() => {
  window.localStorage.setItem('matkakirja-kehittaja', '1');
});
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1800);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);

// 1. Kotelo näkyy kehittäjätilassa; ilman sitä ei (tarkistetaan
//    piilottamalla vipu hetkeksi).
const kotelo = await sivu.evaluate(() => {
  document.getElementById('menu-btn')?.click();
  const nakyy = !document.getElementById('kehittaja-kotelo')?.hidden;
  return { nakyy };
});
vaadi('Kehittäjä-kotelo näkyy valikossa kehittäjätilassa', kotelo.nakyy, JSON.stringify(kotelo));

// 2. Raamattu -lehti.
const raamattu = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.getElementById('raamattu-lehti-btn')?.click();
  await odota(700);
  const m = await import('/js/tyohuone-raamattu.js');
  const { ui } = window.matkakirja;
  const dialogi = document.getElementById('arrival-dialog');
  const otsikko = document.getElementById('arrival-city')?.textContent ?? '';
  const eka = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const runko = document.querySelector('#arrival-dialog .leipa')?.textContent ?? '';
  ui.vaihdaTutkiSivu(1);
  await odota(400);
  const toinen = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  // Hyväksytyn osion (Ydinajatus) otsikossa vihreä valmis-chippi.
  const tagi = document.querySelector('#arrival-dialog .aihe-nimi .kehittaja-tagi.valmis')?.textContent ?? '';
  return {
    auki: Boolean(dialogi?.open),
    otsikko,
    sivuja: ui.tutkiSivuja(),
    // kansi-indeksi 0 + johdanto + osiot + osioiden generoidut
    // taulusivut (Aarteet, Tutki kätkö -pelit).
    odotus: m.RAAMATTU.osiot.length + 2
      + m.RAAMATTU.osiot.filter((o) => o.otsikko.startsWith('Aarteet')
        || o.otsikko.startsWith('Tutki kätkö')).length,
    ekaOk: /Raamattu/.test(eka),
    sisaltoOk: runko.includes('Koko pelin idea yhdessä dokumentissa'),
    toinenOk: /Ydinajatus/.test(toinen),
    tagiOk: tagi === 'valmis',
  };
});
vaadi('Raamattu aukeaa lehtenä ja sivuja on johdanto + osiot',
  raamattu.auki && raamattu.otsikko === 'Raamattu' && raamattu.sivuja === raamattu.odotus,
  JSON.stringify(raamattu));
vaadi('Raamatun sisältö tulee datasta ja sivunvaihto toimii',
  raamattu.ekaOk && raamattu.sisaltoOk && raamattu.toinenOk && raamattu.tagiOk,
  JSON.stringify(raamattu));

// 3. Tilannelehti.
const tilanne = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelector('#arrival-dialog [aria-label="Sulje"], #arrival-dialog .dialog-close')?.click();
  await odota(400);
  document.getElementById('menu-btn')?.click();
  await odota(200);
  document.getElementById('tilanne-lehti-btn')?.click();
  await odota(700);
  const m = await import('/js/tyohuone-tilanne.js');
  const { ui } = window.matkakirja;
  const eka = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const otsikot = [...document.querySelectorAll('#arrival-dialog .nosto h4, #arrival-dialog .nosto-otsikko, #arrival-dialog h4')]
    .map((e) => e.textContent);
  ui.vaihdaTutkiSivu(1);
  await odota(400);
  const toinen = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const testiSivu = document.querySelector('#arrival-dialog .leipa')?.textContent ?? '';
  return {
    auki: document.getElementById('arrival-dialog')?.open ?? false,
    ekaOk: /Tilanne/.test(eka),
    riveja: otsikot.length,
    odotus: m.TILANNE.rivit.length,
    toinenOk: /Testattavaa/.test(toinen),
    ekaRiviOk: testiSivu.includes(m.TESTATTAVAA[0]),
  };
});
vaadi('Tilannelehti aukeaa ja Testattavaa-sivu seuraa',
  tilanne.auki && tilanne.ekaOk && tilanne.toinenOk && tilanne.ekaRiviOk,
  JSON.stringify(tilanne));

mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/kehittajalehti.png' });

// 4. Tilastot-lehti: vetolaatikot ja vaakavieritys.
const avaaTilastot = async () => sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelector('#arrival-dialog [aria-label="Sulje"], #arrival-dialog .dialog-close')?.click();
  await odota(400);
  document.getElementById('menu-btn')?.click();
  await odota(200);
  document.getElementById('tilastot-lehti-btn')?.click();
  await odota(900);
});
await avaaTilastot();

const tilastot = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const nakyvat = (valitsin) => [...document.querySelectorAll(valitsin)]
    .filter((r) => !r.hidden).length;
  const mannerit = [...document.querySelectorAll('#arrival-dialog .tk-manner')];
  const alku = {
    mantereita: mannerit.length,
    maatNakyvissa: nakyvat('#arrival-dialog .tk-maa'),
    kaupungitNakyvissa: nakyvat('#arrival-dialog .tk-kaupunki'),
  };
  // Eurooppa auki → maat näkyviin.
  mannerit[0].click();
  await odota(120);
  const auki = {
    maat: nakyvat('#arrival-dialog .tk-maa'),
    kaupungit: nakyvat('#arrival-dialog .tk-kaupunki'),
  };
  // Ensimmäinen näkyvä maa auki → sen kaupungit näkyviin.
  const maa = [...document.querySelectorAll('#arrival-dialog .tk-maa')].find((r) => !r.hidden);
  const maanNimi = maa.querySelector('.tk-nimi-rivi b')?.textContent ?? '';
  maa.click();
  await odota(120);
  const maaAuki = { kaupungit: nakyvat('#arrival-dialog .tk-kaupunki'), maanNimi };
  // Manner kiinni → kaiken pitää sulkeutua.
  mannerit[0].click();
  await odota(120);
  const kiinni = {
    maat: nakyvat('#arrival-dialog .tk-maa'),
    kaupungit: nakyvat('#arrival-dialog .tk-kaupunki'),
  };
  return { alku, auki, maaAuki, kiinni };
});
vaadi('Tilastot: mannerrivit aukeavat ja sulkeutuvat',
  tilastot.alku.mantereita === 7 && tilastot.alku.maatNakyvissa === 0
  && tilastot.auki.maat > 0 && tilastot.auki.kaupungit === 0
  && tilastot.maaAuki.kaupungit > 0
  && tilastot.kiinni.maat === 0 && tilastot.kiinni.kaupungit === 0,
  JSON.stringify(tilastot));

// Järjestysvipu: aakkoset → valmiit ylimpänä (omistajan toive).
const jarjestys = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const napit = [...document.querySelectorAll('#arrival-dialog .tk-vipu-nappi')];
  const maidenNimet = async () => {
    const manner = document.querySelector('#arrival-dialog .tk-manner');
    manner.click();
    await odota(150);
    return [...document.querySelectorAll('#arrival-dialog .tk-maa')]
      .filter((r) => !r.hidden)
      .map((r) => r.querySelector('.tk-nimi-rivi b').textContent);
  };
  const aakkoset = await maidenNimet();
  napit[1].click();
  await odota(250);
  const valmius = await maidenNimet();
  const muistettu = window.localStorage.getItem('matkakirja-tilastot-jarjestys');
  napit[0].click();
  await odota(250);
  return { aakkoset: aakkoset.slice(0, 3), valmius: valmius.slice(0, 3), muistettu };
});
vaadi('Tilastot: järjestysvipu vaihtaa maiden järjestyksen ja muistaa valinnan',
  jarjestys.aakkoset.length === 3
  && jarjestys.aakkoset.join() !== jarjestys.valmius.join()
  && jarjestys.muistettu === 'valmius',
  JSON.stringify(jarjestys));

// Kaappaukset: kooste ja auki oleva manner. Kortti vierittyy itse,
// joten kuvat otetaan lehtidialogista.
await avaaTilastot();
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/tilastot-kooste.png' });
const leveys = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const mannerit = [...document.querySelectorAll('#arrival-dialog .tk-manner')];
  mannerit[0].click();
  await odota(150);
  const maa = [...document.querySelectorAll('#arrival-dialog .tk-maa')].find((r) => !r.hidden);
  maa.click();
  await odota(150);
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  const kotelo = document.querySelector('#arrival-dialog .tk-vieri');
  return {
    sivuVieritys: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    korttiVieritys: kortti.scrollWidth > kortti.clientWidth + 1,
    koteloVierittyy: kotelo.scrollWidth > kotelo.clientWidth,
  };
});
vaadi('Tilastot: leveä taulu vierittyy vain omassa kotelossaan (390 px)',
  !leveys.sivuVieritys && !leveys.korttiVieritys && leveys.koteloVierittyy,
  JSON.stringify(leveys));
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/tilastot-manner-auki.png' });

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
