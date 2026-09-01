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
 * JATKO-OSA (omistajan tilaus 1.9.2026 ilta: *"kuvan voi pienentää ja
 * voi jättää edellisellä sivulla näkyneet tekstit pois … edellisellä
 * sivulla pitäisi olla kysymys, mikäli ensimmäinen vastauskerta on
 * mennyt väärin … jos vastaus menee väärin, niin pelaajaa voi
 * ohjeistaa että voi vielä yhden kerran yrittää uudestaan"*):
 *   9. KYSYMYSSIVU PELKISTYY: Aloita peli kutistaa kuvan pieneksi ja
 *      poistaa tervehdyksen, kuvatekstin ja lähderivin näkyvistä.
 *  10. Kysymys + KAIKKI vaihtoehdot + tiimalasi mahtuvat iPhonen
 *      390 × 844 ruudulle ilman rullausta.
 *  11. ENSIMMÄISELLÄ YRITYKSELLÄ ei varoitusta ja nappi on "Aloita peli".
 *  12. TOISELLA YRITYKSELLÄ tervehdyssivulla on varoitus viimeisestä
 *      mahdollisuudesta ja nappi myöntää sen.
 *  13. ENSIMMÄISEN VÄÄRÄN jälkeen tuloskortti ohjeistaa yrittämään
 *      vielä kerran; TOISEN väärän jälkeen ohjausta ei ole, vaan
 *      lopullinen menetys (v1107-linja) jää voimaan.
 *  14. Kuvaton kohtaaminen pelkistyy samalla tavalla ilman kuvaa.
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
const avaaKohtaaminen = async (kaupunki, asetukset,
  { kuvaTilalle = SIJAISKUVA, yrityksia = 0 } = {}) => {
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
  /*
   * `yrityksia` istuttaa kaaren yrityslaskurin lähtötilan (0 = tuore
   * kohtaaminen, 1 = ensimmäinen vastaus on jo mennyt väärin).
   * actionQuiz kasvattaa laskuria yhdellä, joten 1 antaa yrityksen 2/2.
   */
  const avaus = await sivu.evaluate((edelliset) => {
    const { game } = window.matkakirja;
    if (edelliset > 0) {
      game.kaariYritykset ??= new Map();
      game.kaariYritykset.set(`${game.pack.id}:${game.player.pos.city}`,
        { yritykset: edelliset, onnistui: false });
    }
    const tulos = game.actionQuiz();
    window.matkakirja.ui.render();
    return {
      ok: tulos.ok,
      kaari: tulos.quiz?.kaari ?? false,
      yritys: game.kaariYritysLuku?.(tulos.quiz?.cityId) ?? null,
    };
  }, yrityksia);
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
  const varoitus = document.getElementById('quiz-varoitus');
  const kysymys = document.getElementById('quiz-question');
  const optiot = document.getElementById('quiz-options');
  const ajastin = document.getElementById('quiz-timer');
  const tulos = document.getElementById('quiz-result');
  return {
    kuvioNakyy: Boolean(kuvio && !kuvio.hidden),
    kortti: laatikko(kortti),
    kuva: laatikko(kuva),
    teksti: laatikko(teksti),
    aloita: aloita && !aloita.hidden ? laatikko(aloita) : null,
    // --- jatko-osa 1.9.2026: kysymyssivu, varoitus ja uusi yritys ---
    aloitaTeksti: aloita?.textContent ?? '',
    tervehdysNakyy: Boolean(teksti && !teksti.hidden),
    varoitusNakyy: Boolean(varoitus && !varoitus.hidden),
    varoitusTeksti: varoitus?.textContent ?? '',
    varoitusLaatikko: varoitus && !varoitus.hidden ? laatikko(varoitus) : null,
    pelkistetty: document.getElementById('quiz-dialog').classList.contains('kysymysvaihe'),
    kysymys: kysymys && !kysymys.hidden ? laatikko(kysymys) : null,
    kysymysTeksti: kysymys?.textContent ?? '',
    optiot: optiot && !optiot.hidden ? laatikko(optiot) : null,
    optioita: optiot ? optiot.querySelectorAll('.quiz-option').length : 0,
    ajastin: ajastin && !ajastin.hidden ? laatikko(ajastin) : null,
    /*
     * Kortin oma vierintätarve. `.dialog-card::before` on koristereunus,
     * joka istuu 6 px kortin ulkopuolella (css/styles.css) ja kasvattaa
     * scrollHeightiä muutamalla pikselillä joka kortilla — se ei ole
     * sisältöä eikä pelaajalle näy, joten kynnys on 12 px.
     */
    vierintaTarve: kortti ? kortti.scrollHeight - kortti.clientHeight : 0,
    tulosTeksti: tulos && !tulos.hidden ? tulos.textContent : '',
    uusiYritys: document.querySelector('.quiz-uusi-yritys')?.textContent ?? '',
    lukkoTeksti: document.querySelector('.quiz-lukko')?.textContent ?? '',
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

/* 11. Ensimmäisellä yrityksellä varoitusta EI ole (omistaja 1.9.2026:
      "ensimmäisellä kerralla varoitusta ei tarvita"). */
vaadi('ensimmäinen yritys on menossa (testin lähtökohta)',
  puhelin.avaus.yritys?.nyt === 1, JSON.stringify(puhelin.avaus.yritys));
vaadi('ensimmäisellä yrityksellä ei varoitusta',
  !p.varoitusNakyy && p.varoitusTeksti === '', p.varoitusTeksti);
vaadi('ensimmäisellä yrityksellä nappi on tuttu Aloita peli',
  p.aloitaTeksti === 'Aloita peli', p.aloitaTeksti);
vaadi('tervehdyssivu näyttää kuvatekstin ja tervehdyksen',
  p.kuvatekstiNakyy && p.tervehdysNakyy && !p.pelkistetty,
  JSON.stringify({ kt: p.kuvatekstiNakyy, t: p.tervehdysNakyy, pelk: p.pelkistetty }));

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

/* ---------- 9–10. KYSYMYSSIVU PELKISTYY JA MAHTUU RUUDULLE ---------- */

/**
 * Painaa Aloita peli ja odottaa, että kysymys ja vaihtoehdot ovat
 * kirjoittuneet esiin (kirjoituskone + kaksi taukoa).
 */
const aloitaPeli = async (sivu) => {
  await sivu.click('#quiz-aloita');
  await sivu.waitForFunction(() => {
    const optiot = document.getElementById('quiz-options');
    return optiot && !optiot.hidden && optiot.querySelectorAll('.quiz-option').length > 0;
  }, null, { timeout: 15000 });
  await sivu.waitForTimeout(600);
};

const kysyva = await avaaKohtaaminen('madrid', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
});
await aloitaPeli(kysyva.sivu);
const k = await mittaa(kysyva.sivu);
vaadi('kysymyssivulla kortti on pelkistetyssä tilassa', k.pelkistetty);
vaadi('kysymyssivulla kuva on pieni tunniste (enintään 130 px)',
  k.kuvioNakyy && k.kuva.korkeus > 0 && k.kuva.korkeus <= 130 && k.kuva.leveys <= 130,
  JSON.stringify(k.kuva));
vaadi('kysymyssivulla kuva on selvästi pienempi kuin tervehdyssivulla',
  k.kuva.korkeus < p.kuva.korkeus * 0.6,
  `kysymyssivu ${k.kuva.korkeus} px, tervehdyssivu ${p.kuva.korkeus} px`);
vaadi('kysymyssivulla tervehdys on poissa näkyvistä', !k.tervehdysNakyy);
vaadi('kysymyssivulla kuvateksti ja lähderivi ovat poissa näkyvistä', !k.kuvatekstiNakyy);
vaadi('kysymyssivulla varoitusta ei ole (ensimmäinen yritys)', !k.varoitusNakyy);
vaadi('kysymyssivulla Aloita peli -nappi on poissa', k.aloita === null);
vaadi('kysymys, neljä vaihtoehtoa ja tiimalasi ovat esillä',
  Boolean(k.kysymys && k.optiot && k.ajastin) && k.optioita === 4
  && k.kysymysTeksti.length > 10,
  JSON.stringify({ optioita: k.optioita, kysymys: k.kysymysTeksti.slice(0, 40) }));
vaadi('kysymys + kaikki vaihtoehdot + tiimalasi mahtuvat iPhonen ruudulle',
  k.kortti.ylin >= 0 && k.kortti.alin <= k.ikkuna.h
  && k.ajastin.ylin >= 0 && k.optiot.alin <= k.ikkuna.h,
  JSON.stringify({ kortti: k.kortti, optiot: k.optiot, ruutu: k.ikkuna.h }));
vaadi('kysymyssivua ei tarvitse rullata',
  k.vierintaTarve <= 12, `vierintätarve ${k.vierintaTarve} px`);
await kysyva.sivu.screenshot({
  path: join(KAAPPAUKSET, 'kohtaamiskortti-kysymysvaihe-iphone.png'),
});

/* ---------- 13. ENSIMMÄINEN VÄÄRÄ: vielä yksi yritys ---------- */

/**
 * Vastaa tahallaan väärin PELAAJAN POLKUA (napin napautus) ja odottaa
 * tuloskortin paljastuksen.
 */
const vastaaVaarin = async (sivu) => {
  const oikea = await sivu.evaluate(() => window.matkakirja.game.quiz.correct);
  const napit = await sivu.$$('#quiz-options .quiz-option');
  await napit[(oikea + 1) % napit.length].click();
  await sivu.waitForFunction(() => {
    const tulos = document.getElementById('quiz-result');
    return tulos && !tulos.hidden && tulos.textContent.includes('Oikea vastaus oli');
  }, null, { timeout: 15000 });
  await sivu.waitForTimeout(400);
};

await vastaaVaarin(kysyva.sivu);
const v = await mittaa(kysyva.sivu);
vaadi('ensimmäisen väärän vastauksen tuloskortti ohjeistaa yrittämään vielä',
  v.uusiYritys.includes('Yksi yritys on vielä jäljellä')
  && v.uusiYritys.includes('ikuisiksi ajoiksi piiloon'), v.uusiYritys);
vaadi('ensimmäisen väärän jälkeen aarretta ei ole vielä menetetty',
  v.lukkoTeksti === '', v.lukkoTeksti);
await kysyva.sivu.screenshot({
  path: join(KAAPPAUKSET, 'kohtaamiskortti-vaara-vastaus-iphone.png'),
});
await kysyva.konteksti.close();

/* ---------- 12. TOINEN YRITYS: varoitus tervehdyssivulla ---------- */

const toinen = await avaaKohtaaminen('madrid', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
}, { yrityksia: 1 });
const t2 = await mittaa(toinen.sivu);
vaadi('toinen yritys on menossa (testin lähtökohta)',
  toinen.avaus.yritys?.nyt === 2 && toinen.avaus.yritys?.kaikki === 2,
  JSON.stringify(toinen.avaus.yritys));
vaadi('toisella yrityksellä tervehdyssivulla on varoitus',
  t2.varoitusNakyy && t2.varoitusTeksti.includes('viimeinen mahdollisuutesi')
  && t2.varoitusTeksti.includes('ikuisiksi ajoiksi piiloon'), t2.varoitusTeksti);
vaadi('varoitus on Aloita peli -napin yläpuolella',
  Boolean(t2.aloita && t2.varoitusLaatikko)
  && t2.varoitusLaatikko.alin <= t2.aloita.ylin,
  JSON.stringify({ varoitus: t2.varoitusLaatikko, nappi: t2.aloita }));
vaadi('toisella yrityksellä nappi myöntää viimeisen kerran',
  t2.aloitaTeksti === 'Yritä viimeistä kertaa', t2.aloitaTeksti);
vaadi('toisen yrityksen otsikko kertoo yrityksen 2/2',
  (await toinen.sivu.textContent('#quiz-city')).includes('yritys 2/2'),
  await toinen.sivu.textContent('#quiz-city'));
await toinen.sivu.screenshot({ path: join(KAAPPAUKSET, 'kohtaamiskortti-varoitus-iphone.png') });

/* 13b. TOINEN VÄÄRÄ: ohjausta ei enää ole, menetys jää voimaan. */
await aloitaPeli(toinen.sivu);
await vastaaVaarin(toinen.sivu);
const v2 = await mittaa(toinen.sivu);
vaadi('toisen väärän jälkeen ei luvata uutta yritystä', v2.uusiYritys === '', v2.uusiYritys);
vaadi('toisen väärän jälkeen kortti kertoo lopullisen menetyksen (v1107)',
  v2.lukkoTeksti.includes('Aarre jäi löytymättä'), v2.lukkoTeksti);
await toinen.konteksti.close();

/* ---------- 14. Kuvaton kohtaaminen pelkistyy samalla tavalla ---------- */

const kuvatonKysymys = await avaaKohtaaminen('wien', {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
});
await aloitaPeli(kuvatonKysymys.sivu);
const wk = await mittaa(kuvatonKysymys.sivu);
vaadi('kuvattomalla kortilla kysymyssivu pelkistyy samoin',
  wk.pelkistetty && !wk.tervehdysNakyy && !wk.kuvioNakyy,
  JSON.stringify({ pelk: wk.pelkistetty, t: wk.tervehdysNakyy, kuvio: wk.kuvioNakyy }));
vaadi('kuvattomalla kortilla kysymys ja vaihtoehdot mahtuvat ruudulle',
  wk.optioita === 4 && wk.kortti.ylin >= 0 && wk.optiot.alin <= wk.ikkuna.h,
  JSON.stringify({ kortti: wk.kortti, optiot: wk.optiot }));
await kuvatonKysymys.konteksti.close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi — kaappaukset: ${KAAPPAUKSET}`);
process.exit(lapi === kaikki ? 0 : 1);
