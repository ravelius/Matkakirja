/*
 * Savuke: lehden tarttuva nimiö ja ylälaidan hampurilainen.
 *  1. Kaupunkilehdessä nimi jää yläreunaan vieritettäessä; kicker vierii piiloon.
 *  2. Nimi pysyy yläreunassa myös SIVUN POHJALLE asti vieritettäessä
 *     (radiorivi ja kohdekartta palstan ulkopuolella katkaisivat
 *     tarttuman ennen — omistajan Lontoo-kaappaus 14.8.2026).
 *  3. Hampurilainen on nimiön sisällä ja täsmälleen otsikon rivillä
 *     sekä levossa että vieritettynä.
 *  4. Napautus avaa sisällyksen YLÄreunaan; toinen napautus sulkee.
 *  5. Napautus levyn ULKOPUOLELLE sulkee sisällyksen.
 *  6. Maalehdessä sama nappi; alapalkin hampurilainen ennallaan.
 *  7. Leveällä ruudulla (iPad) kortissa on tarttuva sumea kaista
 *     nimiön yläpuolisessa raossa.
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
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const kaynnista = async (viewport) => {
  const sivu = await (await selain.newContext({ viewport })).newPage();
  await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
  await sivu.waitForTimeout(1800);
  // Peli käyntiin: muodot ja maalehdet latautuvat vasta pelin alettua.
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
  return sivu;
};

const sivu = await kaynnista({ width: 390, height: 844 });

const kaupunki = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await odota(800);
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  const nimi = document.getElementById('arrival-city');
  const hampurilainen = nimi.querySelector(':scope > .lehti-hampurilainen');
  const keskiero = () => {
    const n = nimi.getBoundingClientRect();
    const h = hampurilainen.getBoundingClientRect();
    return Math.abs((n.top + n.bottom) / 2 - (h.top + h.bottom) / 2);
  };
  const alku = {
    nimiNakyy: nimi.getBoundingClientRect().top >= 0,
    hampurilainenNakyy: Boolean(hampurilainen && !hampurilainen.hidden
      && hampurilainen.getBoundingClientRect().height > 0),
    keskieroLevossa: hampurilainen ? keskiero() : 999,
    radioRivi: Boolean(document.querySelector('#arrival-media-kaupunki:not([hidden])')),
    // Viivojen on alettava samasta kohdasta kuin tekstin (omistaja
    // 14.8.2026) — vertailukohtana maston rivi, joka alkaa sisällön
    // vasemmasta reunasta.
    vasenEro: Math.abs(hampurilainen.querySelector('svg').getBoundingClientRect().left
      - document.getElementById('arrival-lehti-yla').getBoundingClientRect().left),
  };
  kortti.scrollTop = 600;
  await odota(300);
  const kicker = document.getElementById('arrival-lehti-yla');
  const n = nimi.getBoundingClientRect();
  const vieritys = {
    nimiYlhaalla: n.top >= 0 && n.top < 60,
    kickerPiilossa: kicker.getBoundingClientRect().bottom < n.top + 1,
    keskieroVieritettyna: keskiero(),
  };
  // Pohjalle asti: radiorivi ja kohdekartta ovat palstan ulkopuolella,
  // eikä tarttuma saa katketa niiden kohdalla.
  kortti.scrollTop = kortti.scrollHeight;
  await odota(300);
  const pohjalla = {
    scrollTop: kortti.scrollTop,
    nimiYlhaalla: (() => { const r = nimi.getBoundingClientRect(); return r.top >= 0 && r.top < 60; })(),
  };
  hampurilainen.click();
  await odota(300);
  const levy = document.querySelector('#arrival-dialog > .sisallys-levy');
  // Kaupunkilehden valikossa on myös ETUSIVU-rivi (omistajan havainto
  // 14.8.2026) — ensimmäisenä, ja se vie kanteen.
  const ekaRivi = levy?.querySelector('.sisallys-rivi .sisallys-otsikko');
  const auki = {
    levyOn: Boolean(levy),
    ylhaalla: Boolean(levy?.classList.contains('ylhaalla')),
    ylareunassa: levy ? levy.getBoundingClientRect().top < 5 : false,
    riveja: levy?.querySelectorAll('button, a').length ?? 0,
    ekaOtsikko: ekaRivi?.textContent ?? '',
  };
  // Etusivurivi vie kanteen: siirry ensin aihesivulle, avaa valikko
  // uudelleen ja napauta Etusivua.
  document.querySelector('#arrival-dialog > .sisallys-levy')?.remove();
  ui.vaihdaTutkiSivu(1);
  await odota(500);
  document.querySelector('.lehti-hampurilainen')?.click();
  await odota(300);
  const rivit = [...document.querySelectorAll('#arrival-dialog > .sisallys-levy .sisallys-rivi')];
  rivit.find((r) => r.textContent.includes('Etusivu'))?.click();
  await odota(500);
  const etusivulle = {
    sivu: ui.tutkiSivu,
    levySulkeutui: !document.querySelector('#arrival-dialog > .sisallys-levy'),
  };
  // Ulkopuolinen napautus sulkee (omistaja 14.8.2026): avataan levy
  // uudelleen ja napautetaan korttiin levyn alapuolelle.
  hampurilainen.click();
  await odota(300);
  const aukesiUlkosulkuun = Boolean(document.querySelector('#arrival-dialog > .sisallys-levy'));
  kortti.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  await odota(200);
  const ulkosulku = aukesiUlkosulkuun && !document.querySelector('#arrival-dialog > .sisallys-levy');
  // Hampurilaisvipu: avaa uudelleen ja sulje samasta napista.
  hampurilainen.click();
  await odota(200);
  const uudelleenAuki = Boolean(document.querySelector('#arrival-dialog > .sisallys-levy'));
  hampurilainen.click();
  await odota(200);
  const kiinni = !document.querySelector('#arrival-dialog > .sisallys-levy');
  kortti.scrollTop = 0;
  await odota(200);
  // Aihesivulla nimiö on piilossa — napin on muutettava aihe-nimeen
  // ja alettava sisällön vasemmasta reunasta.
  ui.vaihdaTutkiSivu(1);
  await odota(500);
  const aiheNappi = document.querySelector('.lehti-hampurilainen');
  const aiheNimi = aiheNappi?.closest('.aihe-nimi');
  const aihesivu = {
    otsikossa: Boolean(aiheNimi),
    nakyy: Boolean(aiheNappi) && aiheNappi.getBoundingClientRect().height > 0,
    vasenEro: aiheNimi ? Math.abs(aiheNappi.querySelector('svg').getBoundingClientRect().left
      - aiheNimi.getBoundingClientRect().left) : 999,
  };
  ui.vaihdaTutkiSivu(-1);
  await odota(400);
  const takaisinNimiossa = Boolean(document.querySelector('#arrival-city > .lehti-hampurilainen'));
  return { alku, vieritys, pohjalla, auki, etusivulle, ulkosulku, uudelleenAuki, kiinni, aihesivu, takaisinNimiossa };
});
vaadi("valikon ensimmäinen rivi on 'Etusivu'", kaupunki.auki.ekaOtsikko === 'Etusivu',
  JSON.stringify({ ekaOtsikko: kaupunki.auki.ekaOtsikko }));
vaadi('Etusivu-rivi vie kanteen ja sulkee valikon',
  kaupunki.etusivulle.sivu === 0 && kaupunki.etusivulle.levySulkeutui,
  JSON.stringify(kaupunki.etusivulle));
vaadi('nimiö ja hampurilainen näkyvät avattaessa',
  kaupunki.alku.nimiNakyy && kaupunki.alku.hampurilainenNakyy, JSON.stringify(kaupunki.alku));
vaadi('viivat alkavat samasta kohdasta kuin teksti (ero ≤ 2 px)',
  kaupunki.alku.vasenEro <= 2, JSON.stringify({ vasenEro: kaupunki.alku.vasenEro }));
vaadi('aihesivulla nappi muuttaa aihe-nimeen, näkyy ja on tekstin reunassa',
  kaupunki.aihesivu.otsikossa && kaupunki.aihesivu.nakyy && kaupunki.aihesivu.vasenEro <= 2,
  JSON.stringify(kaupunki.aihesivu));
vaadi('etusivulle palatessa nappi palaa nimiöön', kaupunki.takaisinNimiossa === true);
vaadi('hampurilainen on otsikon rivillä levossa ja vieritettynä (ero ≤ 3 px)',
  kaupunki.alku.keskieroLevossa <= 3 && kaupunki.vieritys.keskieroVieritettyna <= 3,
  JSON.stringify({ levossa: kaupunki.alku.keskieroLevossa, vieritettyna: kaupunki.vieritys.keskieroVieritettyna }));
vaadi('vieritettäessä nimi jää yläreunaan ja kicker piiloutuu',
  kaupunki.vieritys.nimiYlhaalla && kaupunki.vieritys.kickerPiilossa,
  JSON.stringify(kaupunki.vieritys));
vaadi('nimi pysyy yläreunassa sivun pohjalle asti (radiorivi + kartta eivät katkaise)',
  kaupunki.pohjalla.nimiYlhaalla && kaupunki.pohjalla.scrollTop > 600,
  JSON.stringify({ ...kaupunki.pohjalla, radioRivi: kaupunki.alku.radioRivi }));
vaadi('sisällys aukeaa yläreunaan ja siinä on rivejä',
  kaupunki.auki.levyOn && kaupunki.auki.ylhaalla && kaupunki.auki.ylareunassa
  && kaupunki.auki.riveja >= 2, JSON.stringify(kaupunki.auki));
vaadi('napautus levyn ulkopuolelle sulkee sisällyksen', kaupunki.ulkosulku === true);
vaadi('hampurilainen avaa uudelleen ja toinen napautus sulkee',
  kaupunki.uudelleenAuki && kaupunki.kiinni, JSON.stringify({ auki: kaupunki.uudelleenAuki, kiinni: kaupunki.kiinni }));

await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/lehti-tarttuva-nimio.png' });

const maalehti = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  ui.closeArrival();
  await odota(300);
  ui.avaaMaalehti('GBR');
  // Aihesivut latautuvat asynkronisesti — odotetaan kunnes sisällystä
  // on tarpeeksi (alapalkin hampurilainen vaatii ≥3 sivua).
  for (let i = 0; i < 100 && (ui.tutkiSivut?.length ?? 0) < 3; i += 1) await odota(100);
  await odota(400);
  const hampurilainen = document.querySelector('.lehti-hampurilainen');
  const alapalkinNappi = document.querySelector('.tutki-alanapit .sisallysnappi');
  hampurilainen?.click();
  await odota(300);
  const levy = document.querySelector('#arrival-dialog > .sisallys-levy');
  const tulos = {
    // Maalehdessä ei ole etusivua eikä nimiötä — napin on asuttava
    // aihe-nimessä ja OIKEASTI näyttävä (omistajan havainto
    // 14.8.2026: nappi ei näkynyt maalehdessä lainkaan, koska se oli
    // naulattu piilossa olevaan nimiöön).
    hampurilainenNakyy: Boolean(hampurilainen && !hampurilainen.hidden
      && hampurilainen.getBoundingClientRect().height > 0),
    aiheNimessa: Boolean(hampurilainen?.closest('.aihe-nimi')),
    alapalkkiEnnallaan: Boolean(alapalkinNappi && !alapalkinNappi.hidden),
    levyYlhaalla: Boolean(levy?.classList.contains('ylhaalla')),
    // Maalehdellä ei ole kantta — Etusivu-riviä ei saa olla.
    eiEtusivuRivia: ![...(levy?.querySelectorAll('.sisallys-otsikko') ?? [])]
      .some((o) => o.textContent === 'Etusivu'),
  };
  levy?.remove();
  ui.closeArrival();
  return tulos;
});
vaadi('maalehdessä ylähampurilainen näkyy aihe-nimessä ja avaa ylhäältä',
  maalehti.hampurilainenNakyy && maalehti.aiheNimessa && maalehti.levyYlhaalla,
  JSON.stringify(maalehti));
vaadi('maalehden valikossa ei ole Etusivu-riviä', maalehti.eiEtusivuRivia === true,
  JSON.stringify(maalehti));
vaadi('maalehden alapalkin hampurilainen on ennallaan',
  maalehti.alapalkkiEnnallaan === true, JSON.stringify(maalehti));

// Leveä ruutu (iPad): sumea kaista nimiön yläpuolisessa raossa.
const ipad = await kaynnista({ width: 834, height: 1194 });
const kaista = await ipad.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await odota(800);
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  const tyyli = getComputedStyle(kortti, '::before');
  kortti.scrollTop = 600;
  await odota(300);
  const nimiEl = document.getElementById('arrival-city');
  const nimi = nimiEl.getBoundingClientRect();
  return {
    asema: tyyli.position,
    sumennus: tyyli.backdropFilter || tyyli.webkitBackdropFilter || 'none',
    tausta: tyyli.backgroundColor,
    otsikonTausta: getComputedStyle(nimiEl).backgroundColor,
    korkeus: parseFloat(tyyli.height),
    nimiYlhaalla: nimi.top >= 0 && nimi.top < 80,
  };
});
vaadi('iPadilla kaista on tarttuva, EI sumea, ja otsikon paperia',
  kaista.asema === 'sticky' && !/blur/.test(kaista.sumennus)
  && kaista.tausta === kaista.otsikonTausta && kaista.korkeus > 4,
  JSON.stringify(kaista));
vaadi('iPadilla nimi tarttuu yläreunaan', kaista.nimiYlhaalla === true, JSON.stringify(kaista));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
