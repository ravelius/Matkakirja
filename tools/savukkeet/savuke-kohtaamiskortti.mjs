/*
 * Savuke: KOHTAAMISKORTIN ISO KUVA JA KUVATEKSTI (omistajan tilaus
 * 1.9.2026: *"nuo aarrekuvat vaativat pelissä isomman kuva-alan …
 * voisit suunnitella kohtaamiskortin uudelleen niin että kuva näkyy
 * siinä isona. idea oli kai että kuvan alle tulee myös
 * kuvatekstiä"*).
 *
 * Yksikkötestit (tests/kohtaamiskuvat.test.mjs) vahtivat katalogin ja
 * kytkennän tarinakaareen, mutta eivät sitä mitä tämä paketti oikeasti
 * lupaa: kuvan koon kortilla, kuvatekstin ja lähderivin kuvan alla,
 * kortin pysymisen ruudulla kapealla laitteella ja sen, ettei kuvaton
 * kohtaaminen jätä korttiin tyhjää aukkoa.
 *
 * Vartiot:
 *   1. MADRID (tarkistettu kohtaamiskuva R2:ssa): kuva on kortin
 *      sisällön levyinen ja tervehdyksen YLÄPUOLELLA.
 *   2. Kuvateksti on kuvan alla katalogin sanoin ja lähderivi
 *      "Matkakirjan kuvitus" sen jatkeena.
 *   3. iPhone 390 × 844: kuva vie korkeintaan 45 % ruudusta ja koko
 *      kortti — Aloita peli -nappia myöten — mahtuu näkymään; kortti
 *      pysyy ruudun keskellä (v1107).
 *   4. iPad: kuva on komea (yli 500 px leveä).
 *   5. Napautus avaa OLEMASSA OLEVAN suurennoksen (.lightbox) samalla
 *      kuvatekstillä ja lähteellä — ei uutta suurennuskonetta.
 *   6. WIEN (kaari ilman kuvaa): kuvio on piilossa eikä korttiin jää
 *      aukkoa — tervehdys alkaa heti otsikkorivin alta.
 *   7. VERKKOVIRHE (yhteydetön / yhden tiedoston versio levyltä):
 *      latauksen kaatuminen piilottaa koko kuvion, ei jätä rikkinäisen
 *      kuvan kuvaketta.
 *   8. KAKSINTAISTELU ei näytä kohtaamiskuvaa (js/visa.js renderDuel).
 *
 * KUVA TULEE PAIKALLISESTI: kontin selain ei pääse R2-ämpäriin, joten
 * r2.dev-osoitteet täytetään oikean kokoisella (1536 × 1536) SVG:llä.
 * Osoitteiden oikeellisuutta vartioi katalogin yksikkötesti.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { kohtaamiskuvaKohteelle } from '../../js/kohtaamiskuvat-data.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAAPPAUKSET = process.env.KAAPPAUSKANSIO ?? join(JUURI, 'tools/savukkeet/kaappaukset');
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.geojson': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const pyydetty = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyydetty === '/' ? 'index.html' : pyydetty);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

mkdirSync(KAAPPAUKSET, { recursive: true });

/* Kohtaamiskuvan sijainen: oikean aineiston mitat (1536 × 1536). */
const SIJAISKUVA = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1536"
 viewBox="0 0 1536 1536"><rect width="1536" height="1536" fill="#6d5a3c"/>
 <circle cx="768" cy="640" r="300" fill="#c9b489"/></svg>`;

/** Pelitallenne, jossa Fogg seisoo annetussa kaupungissa toimintavaiheessa. */
const tallenne = (kaupunki) => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 9,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Uusi sivu, jossa peli on istutettu kaupunkiin ja kohtaamisen kortti
 * avattu. `kuvaTilalle` = null antaa R2-pyynnön kaatua (verkkovirhe).
 */
const avaaKohtaaminen = async (kaupunki, asetukset, { kuvaTilalle = SIJAISKUVA } = {}) => {
  const konteksti = await selain.newContext({ reducedMotion: 'reduce', ...asetukset });
  await konteksti.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, tallenne(kaupunki));
  const sivu = await konteksti.newPage();
  await sivu.route(/r2\.dev\/kohtaamiset\//, (route) => (kuvaTilalle
    ? route.fulfill({ status: 200, contentType: 'image/svg+xml', body: kuvaTilalle })
    : route.abort()));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  const avaus = await sivu.evaluate(() => {
    const tulos = window.matkakirja.game.actionQuiz();
    window.matkakirja.ui.render();
    return { ok: tulos.ok, kaari: tulos.quiz?.kaari ?? false };
  });
  // Kirjoituskoneketju (otsikko → tauko → tervehdys) on liikkeen
  // vähennyksellä pelkkiä taukoja, mutta ne on silti odotettava.
  await sivu.waitForTimeout(2500);
  return { konteksti, sivu, avaus };
};

/** Kortin ja kuvan mitatut tiedot. */
const mittaa = (sivu) => sivu.evaluate(() => {
  const kortti = document.querySelector('#quiz-dialog .dialog-card');
  const kuvio = document.getElementById('quiz-kohtaaminen-kuvio');
  const kuva = document.getElementById('quiz-kohtaaminen-kuva');
  const teksti = document.getElementById('quiz-kohtaaminen');
  const aloita = document.getElementById('quiz-aloita');
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      ylin: Math.round(r.top),
      alin: Math.round(r.bottom),
      vasen: Math.round(r.left),
      oikea: Math.round(r.right),
      leveys: Math.round(r.width),
      korkeus: Math.round(r.height),
    };
  };
  const sisus = kortti ? getComputedStyle(kortti) : null;
  return {
    kuvioNakyy: Boolean(kuvio && !kuvio.hidden),
    kortti: laatikko(kortti),
    kuva: laatikko(kuva),
    teksti: laatikko(teksti),
    aloita: aloita && !aloita.hidden ? laatikko(aloita) : null,
    sisaltoLeveys: kortti && sisus
      ? Math.round(kortti.getBoundingClientRect().width
        - parseFloat(sisus.paddingLeft) - parseFloat(sisus.paddingRight))
      : 0,
    kuvateksti: document.getElementById('quiz-kohtaaminen-selite')?.textContent ?? '',
    kuvatekstiNakyy: !document.getElementById('quiz-kohtaaminen-kuvateksti')?.hidden,
    lahde: document.querySelector('#quiz-kohtaaminen-kuvateksti .kuvalahde')?.textContent ?? '',
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
  };
});

/* ---------- 1–3. iPhone: iso kuva, kuvateksti, kortti ruudulla ---------- */

const madridData = kohtaamiskuvaKohteelle('madrid');
const puhelin = await avaaKohtaaminen('madrid', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
});
vaadi('Madridin kohtaaminen aukeaa kaaren kysymyksellä',
  puhelin.avaus.ok && puhelin.avaus.kaari, JSON.stringify(puhelin.avaus));

const p = await mittaa(puhelin.sivu);
vaadi('kohtaamiskuva näkyy kortilla', p.kuvioNakyy && p.kuva.leveys > 1, JSON.stringify(p.kuva));
vaadi('kuva on kortin sisällön levyinen',
  p.kuva.leveys >= p.sisaltoLeveys * 0.92,
  `kuva ${p.kuva.leveys} px, sisältö ${p.sisaltoLeveys} px`);
vaadi('kuva on tervehdyksen yläpuolella',
  p.kuva.alin <= p.teksti.ylin, `kuva ${p.kuva.alin}, tervehdys ${p.teksti.ylin}`);
vaadi('kuvateksti on katalogin sanoin kuvan alla',
  p.kuvatekstiNakyy && p.kuvateksti === madridData.kuvateksti, p.kuvateksti.slice(0, 60));
vaadi('lähderivi kertoo kuvituksen', p.lahde === 'Matkakirjan kuvitus', p.lahde);
vaadi('kuva vie korkeintaan 45 % kapeasta ruudusta',
  p.kuva.korkeus <= p.ikkuna.h * 0.45, `kuva ${p.kuva.korkeus} px, ruutu ${p.ikkuna.h} px`);
vaadi('koko kortti Aloita peli -nappia myöten mahtuu ruudulle',
  p.aloita && p.aloita.alin <= p.ikkuna.h && p.kortti.ylin >= 0,
  JSON.stringify({ kortti: p.kortti, aloita: p.aloita }));
vaadi('kortti pysyy ruudun keskellä (v1107)',
  Math.abs((p.kortti.vasen + p.kortti.oikea) / 2 - p.ikkuna.w / 2) <= 8
  && Math.abs((p.kortti.ylin + p.kortti.alin) / 2 - p.ikkuna.h / 2) <= 12,
  JSON.stringify(p.kortti));

await puhelin.sivu.screenshot({ path: join(KAAPPAUKSET, 'kohtaamiskortti-iphone.png') });

/* ---------- 5. napautus avaa olemassa olevan suurennoksen ---------- */

await puhelin.sivu.click('#quiz-kohtaaminen-kuva');
await puhelin.sivu.waitForTimeout(600);
const suurennos = await puhelin.sivu.evaluate(() => {
  const kerros = document.querySelector('.lightbox');
  return {
    auki: Boolean(kerros),
    // Suurennos on liitettävä visan modaaliin, muuten se jää sen taakse.
    visassa: Boolean(kerros?.closest('#quiz-dialog')),
    caption: kerros?.querySelector('.lightbox-caption')?.textContent ?? '',
    lahde: kerros?.querySelector('.lightbox-lahde')?.textContent ?? '',
    kuvia: document.querySelectorAll('.lightbox').length,
  };
});
vaadi('napautus avaa pelin oman suurennoksen visan sisään',
  suurennos.auki && suurennos.visassa && suurennos.kuvia === 1, JSON.stringify(suurennos));
vaadi('suurennoksessa on sama kuvateksti ja lähde',
  suurennos.caption.startsWith(madridData.kuvateksti)
  && suurennos.lahde === 'Matkakirjan kuvitus',
  JSON.stringify(suurennos).slice(0, 160));
await puhelin.konteksti.close();

/* ---------- 4. iPad: kuva saa olla komea ---------- */

const tabletti = await avaaKohtaaminen('madrid', {
  viewport: { width: 1024, height: 1366 }, deviceScaleFactor: 2,
});
const t = await mittaa(tabletti.sivu);
vaadi('iPadilla kuva on komea', t.kuvioNakyy && t.kuva.leveys >= 500, JSON.stringify(t.kuva));
vaadi('iPadilla kortti pysyy keskellä',
  Math.abs((t.kortti.vasen + t.kortti.oikea) / 2 - t.ikkuna.w / 2) <= 8, JSON.stringify(t.kortti));
await tabletti.sivu.screenshot({ path: join(KAAPPAUKSET, 'kohtaamiskortti-ipad.png') });

/* ---------- 8. kaksintaistelu ei näytä kohtaamiskuvaa ---------- */

const duelli = await tabletti.sivu.evaluate(() => {
  window.matkakirja.game.beginDuel();
  window.matkakirja.ui.render();
  const kuvio = document.getElementById('quiz-kohtaaminen-kuvio');
  return {
    kuvio: Boolean(kuvio && !kuvio.hidden),
    tervehdys: !document.getElementById('quiz-kohtaaminen')?.hidden,
  };
});
vaadi('kaksintaistelussa ei ole kohtaamiskuvaa eikä tervehdystä',
  !duelli.kuvio && !duelli.tervehdys, JSON.stringify(duelli));
await tabletti.konteksti.close();

/* ---------- 6. kuvaton kohtaaminen ennallaan ---------- */

vaadi('Wienille ei ole tarkistettua kohtaamiskuvaa (testin lähtökohta)',
  kohtaamiskuvaKohteelle('wien') === null);
const kuvaton = await avaaKohtaaminen('wien', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
});
const w = await mittaa(kuvaton.sivu);
vaadi('kuvaton kohtaaminen aukeaa normaalisti', kuvaton.avaus.ok && kuvaton.avaus.kaari,
  JSON.stringify(kuvaton.avaus));
vaadi('kuvattomalla kortilla kuvio on piilossa', !w.kuvioNakyy);
vaadi('kuvaton kortti ei jätä tyhjää aukkoa otsikon ja tervehdyksen väliin',
  w.teksti.ylin - w.kortti.ylin < 90, `väli ${w.teksti.ylin - w.kortti.ylin} px`);
await kuvaton.konteksti.close();

/* ---------- 7. verkkovirhe piilottaa kuvion ---------- */

const yhteydeton = await avaaKohtaaminen('madrid', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
}, { kuvaTilalle: null });
const y = await mittaa(yhteydeton.sivu);
vaadi('kuvan latausvirhe piilottaa koko kuvion', !y.kuvioNakyy, JSON.stringify(y.kuva));
vaadi('yhteydetön kortti näyttää silti tervehdyksen', y.teksti.korkeus > 0);
await yhteydeton.konteksti.close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
