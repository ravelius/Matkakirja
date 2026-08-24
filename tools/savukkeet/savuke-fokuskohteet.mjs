/*
 * Savuke: fokuslehden klikattavat karttakohteet (js/fokuskohteet.js).
 *
 * Omistajan tilaus 24.8.2026: *"Tee kartalla näkyvistä kohteista
 * klikattava pop up infoja"*. Raamatun osio "Fokusmoodi", kohdat
 * ETENEMINEN (*"kartan erityiskohteista … aukeaa pienet
 * pop-up-tietoruudut"*) ja KOHDEKOROSTUS.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: kohteiden data on tarkistettavissa
 * ilman selainta (tests/fokusvirta.test.mjs vahtii rakenteen), mutta
 * koko paketin idea on geometriaa ja osumia — merkin on oltava
 * NAPAUTETTAVISSA lehden päällä, oikean kokoinen ruudulla joka
 * zoomilla, ja pop-upin on pysyttävä ruudun sisällä alanappeja
 * peittämättä. Sitä ei voi mitata ilman oikeaa asettelua.
 *
 * VARTIOT:
 *   1. LEHTI TUO MERKIT. Kun Kreikan fokuslehti on kartalla, jokainen
 *      maan kohde saa merkin — ja kiertävällä laudalla merkit ovat
 *      MOLEMMISSA kohdissa, koska <use>-kopiosta ei voi napauttaa
 *      mitään.
 *   2. EI SUODATTIMIA (tests/rules.test.mjs:n sääntö kartan kerroksille).
 *   3. OSUMA-ALUE ON ≥44 px JA PYSYY SELLAISENA ZOOMATESSA.
 *   4. NAPAUTUS AVAA POP-UPIN: nimi, teksti ja lähderivi, ja merkki
 *      korostuu (KOHDEKOROSTUS).
 *   5. POP-UP PYSYY RUUDULLA eikä peitä vuorolaatikon nappeja.
 *   6. VAIN YKSI KERRALLAAN: toisen merkin napautus vaihtaa kohdetta.
 *   7. SULKU: rasti, Esc ja napautus kortin päälle.
 *   8. FOKUSVIRTA VOITTAA: kortin tai kuplan ilmestyminen sulkee
 *      tietoruudun.
 *   9. EI LEHTEÄ, EI MERKKEJÄ — kumpikaan suunta ei jää päälle.
 *
 * Peli istutetaan Ateenaan MAAILMANKARTALLE, koska Kreikan fokuslehti
 * on tehty sille laudalle (js/packs/fokus-grc.js FOKUS_POHJAT.lauta) —
 * Euroopan laudalla peli hylkää pohjan tarkoituksella.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSKOHTEET_GRC } from '../../js/packs/fokuskohteet-grc.js';

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

/* Valmis peli: Herra Fogg seisoo Ateenassa maailmankartalla. */
const peli = new Game({
  players: [{ name: 'Herra Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Yksi sivu valmiiksi ladattuna. `fokus` false sammuttaa fokusmoodin,
 * jolloin lehteä — eikä siis merkkejäkään — ei pitäisi olla.
 */
async function avaaSivu(fokus = true) {
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript(([data, paalla]) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      if (paalla) localStorage.removeItem('matkakirja-fokusmoodi');
      else localStorage.setItem('matkakirja-fokusmoodi', '0');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, [tallenne, fokus]);
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ. Kontin selain ei pääse ämpäriin
   * eikä Commonsiin; ilman korvausta savuke mittaisi verkkoyhteyttä.
   * Fokuslehti EI piirry lainkaan ilman latautuvaa kuvaa
   * (js/fokuskartta.js lataaKuva), joten tämä on paketin ehto eikä
   * mukavuus. Osoitteiden oikeellisuus tarkistetaan erikseen.
   */
  const PIKSELI = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  );
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  // Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  /*
   * `domcontentloaded` eikä `load`: maailmankartta lataa taustalla
   * kuvia ja ääniä, joista osa jää korvatun reitin varaan, eikä
   * ikkunan load-tapahtuma ole luotettava merkki siitä että peli on
   * pystyssä. Peli odotetaan siitä, mikä oikeasti kertoo sen — laudan
   * SVG ja fokuslehden rajaus.
   */
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  if (fokus) {
    await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
      null, { timeout: 60000 }).catch(() => {});
  }
  await sivu.waitForTimeout(2500);
  return sivu;
}

const sivu = await avaaSivu(true);

/** Kartan kohdemerkit: määrä, koko ruudulla ja korostus. */
const merkit = () => sivu.evaluate(() => {
  const kaikki = [...document.querySelectorAll('.fokuskohde')];
  const osumat = kaikki.map((g) => {
    const r = g.querySelector('.fokuskohde-osuma').getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  return {
    maara: kaikki.length,
    tunnukset: [...new Set(kaikki.map((g) => g.dataset.kohde))],
    // Kerros on juuriryhmän ULKOPUOLELLA, kuten maastonimet ja vinjetit.
    juuressa: kaikki.some((g) => g.closest('.board-root')),
    suodattimia: kaikki.filter((g) => g.getAttribute('filter')
      || g.querySelector('[filter]')).length,
    osumat,
    auki: kaikki.filter((g) => g.classList.contains('auki')).map((g) => g.dataset.kohde),
    ryhmat: [...document.querySelectorAll('.fokuskohde-ryhma')]
      .map((g) => g.getAttribute('transform') ?? ''),
  };
});

/** Auki olevan tietoruudun sisältö ja paikka. */
const popup = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokuskohde-popup');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const pane = document.querySelector('.map-pane')?.getBoundingClientRect();
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  return {
    ylarivi: el.querySelector('.fokuskohde-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokuskohde-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokuskohde-teksti')?.textContent ?? '',
    lahde: el.querySelector('.fokuskohde-lahde')?.textContent ?? '',
    kuvia: el.querySelectorAll('.fokuskohde-kuva img').length,
    kuvalahde: el.querySelector('.fokuskohde-kuvalahde')?.textContent ?? '',
    pohja: getComputedStyle(el).backgroundColor,
    karttapinnassa: Boolean(el.closest('.map-pane')),
    laatikko: {
      ylin: Math.round(r.top),
      alin: Math.round(r.bottom),
      vasen: Math.round(r.left),
      oikea: Math.round(r.right),
    },
    pane: pane ? {
      ylin: Math.round(pane.top),
      alin: Math.round(pane.bottom),
      vasen: Math.round(pane.left),
      oikea: Math.round(pane.right),
    } : null,
    nappienYlin: napit && napit.height > 0 ? Math.round(napit.top) : null,
    ikkuna: { w: window.innerWidth, h: window.innerHeight },
  };
});

/**
 * Napauttaa kohteen merkkiä OIKEALLA HIIRELLÄ sen ruutupaikkaan.
 *
 * Ei `locator.click()`: kiertävällä laudalla samasta kohteesta on kaksi
 * merkkiä, joista toinen on aina ruudun ulkopuolella (sauman takana),
 * ja valitsimen ensimmäinen osuma voi olla juuri se. Paikka etsitään
 * siksi ruudulta ja napautus tehdään koordinaatteihin — silloin koe
 * mittaa myös sen, ettei merkin päällä ole mitään muuta.
 */
async function napauta(tunnus) {
  const kohta = await sivu.evaluate((id) => {
    for (const g of document.querySelectorAll(`.fokuskohde[data-kohde="${id}"]`)) {
      const r = g.querySelector('.fokuskohde-osuma').getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight) {
        return { x: Math.round(x), y: Math.round(y) };
      }
    }
    return null;
  }, tunnus);
  if (!kohta) throw new Error(`merkki ${tunnus} ei ole ruudulla`);
  await sivu.mouse.click(kohta.x, kohta.y);
  await sivu.waitForTimeout(400);
}

/*
 * Onko `rgb(...)`-väri vaaleaa paperia? Sama raja ja sama syy kuin
 * fokusvirran savukkeella: kortin on oltava pergamenttia eikä tummaa
 * massaa (omistajan pelitestipalaute 24.8.2026).
 */
const vaalea = (vari) => {
  const osat = String(vari ?? '').match(/[\d.]+/g)?.map(Number) ?? [];
  if (osat.length < 3) return false;
  if (osat.length > 3 && osat[3] < 0.5) return false;
  return (osat[0] * 0.299 + osat[1] * 0.587 + osat[2] * 0.114) > 190;
};

/** Kamera lehden päälle ja odotus, kunnes ajo on ohi (ZOOM_MS 3,4 s). */
async function ajaLehdelle() {
  await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({ bbox: ui.fokusPohjaBbox, marginaali: 0 });
  });
  await sivu.waitForTimeout(4200);
}

/* --- 1: lehti tuo merkit --- */

const lehtiNakyy = await sivu.evaluate(() => Boolean(window.matkakirja.ui.fokusPohjaBbox));
vaadi('Kreikan fokuslehti on kartalla', lehtiNakyy === true, 'lehteä ei piirretty');

/*
 * YLEISKUVASSA EI MERKKEJÄ. Sivun lataus kesken pelin ei aja kameraa
 * (js/fokuskartta.js: ensimmäinen piirto jättää ajon väliin), joten
 * kartta on tässä vaiheessa yleiskuvassa — ja silloin kaikkien
 * kohteiden osuma-alueet olisivat samassa läiskässä Ateenan laatan
 * päällä. Merkit saavat syttyä vasta kun lehti on lähikuvassa.
 */
const yleiskuvassa = await sivu.evaluate(() => {
  const kerros = document.querySelector('.fokuskohteet');
  const merkki = document.querySelector('.fokuskohde-osuma');
  return {
    piilossa: Boolean(kerros?.classList.contains('fokuskohteet-piilossa')),
    /*
     * Näkyvyys mitataan GEOMETRIASTA eikä `display`-arvosta: kerroksen
     * `display: none` ei periydy lapsen laskettuun arvoon, mutta
     * piilotetun alipuun osuma-alueella ei ole mittoja lainkaan.
     */
    kerroksenTyyli: kerros ? getComputedStyle(kerros).display : '',
    nakyy: merkki ? merkki.getBoundingClientRect().width > 0 : false,
    osuus: (() => {
      const ui = window.matkakirja.ui;
      const n = ui.nakyvaAlue?.();
      return n?.w ? Number((ui.fokusPohjaBbox.w / n.w).toFixed(3)) : null;
    })(),
  };
});
vaadi('yleiskuvassa merkit ovat piilossa eivätkä syö napautuksia',
  yleiskuvassa.piilossa === true && yleiskuvassa.nakyy === false,
  JSON.stringify(yleiskuvassa));

await ajaLehdelle();

let m = await merkit();
vaadi('jokainen maan kohde sai merkin',
  m.tunnukset.length === FOKUSKOHTEET_GRC.length,
  `${m.tunnukset.length}/${FOKUSKOHTEET_GRC.length}: ${m.tunnukset.join(',')}`);
vaadi('kiertävällä laudalla merkit ovat molemmissa kohdissa',
  m.maara === m.tunnukset.length * 2, `${m.maara} merkkiä`);
vaadi('kerros on juuriryhmän ulkopuolella (<use>-kopio ei syö napautusta)',
  m.juuressa === false);
vaadi('ei suodattimia kartan kerroksessa', m.suodattimia === 0);
vaadi('osuma-alue on vähintään 44 px',
  m.osumat.length > 0 && m.osumat.every((o) => o.w >= 44 && o.h >= 44),
  JSON.stringify(m.osumat.slice(0, 3)));

/* --- 2: koko pysyy zoomatessa --- */

const ennenZoomia = m.osumat[0];
await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
// Zoomiajo kestää ZOOM_MS (3,4 s): mitta otetaan vasta kun kartta on
// asettunut, tai se mittaisi liikkeen keskikohtaa.
await sivu.waitForTimeout(4200);
m = await merkit();
const zoomiMuutti = await sivu.evaluate(() => window.matkakirja.ui.zoomSkaala);
vaadi('merkki on yhtä suuri zoomin jälkeen',
  m.osumat[0] && Math.abs(m.osumat[0].w - ennenZoomia.w) <= 2,
  `${JSON.stringify(ennenZoomia)} → ${JSON.stringify(m.osumat[0])} (skaala ${zoomiMuutti})`);

/* --- 3: napautus avaa tietoruudun --- */

// Näkymä takaisin lehden rajaukseen: lähikuvassa osa kohteista on
// ruudun ulkopuolella, eikä tässä ole tarkoitus mitata panorointia.
await ajaLehdelle();

await napauta('olympos');
let p = await popup();
m = await merkit();
vaadi('napautus avaa tietoruudun', p !== null, 'pop-up ei auennut');
vaadi('tietoruudussa on nimi, tyyppi, teksti ja lähde',
  p?.otsikko === 'Ólympos' && /vuori/i.test(p.ylarivi)
  && p.teksti.includes('jumalten koti') && p.lahde.includes('Wikipedia'),
  JSON.stringify(p));
vaadi('tietoruudussa on kuva ja sen lähderivi',
  p?.kuvia === 1 && p.kuvalahde.includes('CC BY'), JSON.stringify(p?.kuvalahde));
vaadi('tietoruutu on vaaleaa paperia', vaalea(p?.pohja), p?.pohja);
vaadi('KOHDEKOROSTUS: auki oleva merkki korostuu',
  m.auki.length > 0 && m.auki.every((id) => id === 'olympos'), JSON.stringify(m.auki));

/* --- 4: tietoruutu pysyy ruudulla eikä peitä alanappeja --- */

vaadi('tietoruutu asuu karttapinnassa', p?.karttapinnassa === true);
vaadi('tietoruutu ei valu ruudun ulkopuolelle',
  p && p.laatikko.vasen >= p.pane.vasen && p.laatikko.oikea <= p.pane.oikea
  && p.laatikko.ylin >= p.pane.ylin && p.laatikko.alin <= p.pane.alin,
  JSON.stringify(p?.laatikko));
vaadi('tietoruutu ei peitä alanappeja',
  p && (p.nappienYlin === null || p.laatikko.alin <= p.nappienYlin),
  `kortin alin ${p?.laatikko.alin}, nappien ylin ${p?.nappienYlin}`);

/* --- 5: vain yksi kerrallaan --- */

await napauta('delfoi');
p = await popup();
m = await merkit();
const montako = await sivu.evaluate(() => document.querySelectorAll('.fokuskohde-popup').length);
vaadi('toisen merkin napautus vaihtaa kohdetta',
  p?.otsikko === 'Delfoi' && montako === 1, `${p?.otsikko}, ${montako} korttia`);
vaadi('edellinen korostus purkautui',
  m.auki.every((id) => id === 'delfoi'), JSON.stringify(m.auki));

/* --- 6: sulku kolmella tavalla --- */

await sivu.locator('.fokuskohde-sulje').click();
await sivu.waitForTimeout(250);
vaadi('rasti sulkee tietoruudun', (await popup()) === null);
vaadi('sulku purkaa myös korostuksen', (await merkit()).auki.length === 0);

await napauta('delfoi');
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(250);
vaadi('Esc sulkee tietoruudun', (await popup()) === null);

await napauta('delfoi');
await sivu.locator('.fokuskohde-popup .fokuskohde-teksti').click();
await sivu.waitForTimeout(250);
vaadi('napautus kortin päälle sulkee sen', (await popup()) === null);

/* --- 7: saman merkin toinen napautus sulkee --- */

await napauta('santorini');
vaadi('kolmas kohde aukeaa', (await popup())?.otsikko === 'Santoríni');
await napauta('santorini');
vaadi('saman merkin napautus uudestaan sulkee', (await popup()) === null);

/* --- 8: fokusvirran pinta sulkee tietoruudun --- */

await napauta('thessaloniki');
vaadi('neljäs kohde aukeaa ennen virtakoetta', (await popup()) !== null);
/*
 * Kupla luodaan tässä KÄSIN eikä virran kautta: vahti on
 * MutationObserver, joka katsoo vain luokkaa (js/fokuskohteet.js
 * kuunteleKohdetta), eikä tämä paketti saanut koskea js/fokusvirta.js:ään.
 * Koe mittaa juuri sen sopimuksen, joka koodissa on.
 */
await sivu.evaluate(() => {
  const kupla = document.createElement('div');
  kupla.className = 'fokusvirta-kupla';
  document.body.appendChild(kupla);
});
await sivu.waitForTimeout(250);
vaadi('fokusvirran kuplan avautuminen sulkee tietoruudun', (await popup()) === null);

/* --- 9: ilman lehteä ei merkkejä --- */

await sivu.evaluate(() => window.matkakirja.ui.paivitaFokusPohja(null));
await sivu.waitForTimeout(300);
vaadi('lehden lähtiessä merkit katoavat', (await merkit()).maara === 0);

await sivu.context().close();

const pois = await avaaSivu(false);
const merkkejaIlmanFokusta = await pois.evaluate(
  () => document.querySelectorAll('.fokuskohde').length,
);
const lehtiIlmanFokusta = await pois.evaluate(
  () => Boolean(window.matkakirja.ui.fokusPohjaBbox),
);
vaadi('fokusmoodi pois: ei lehteä eikä merkkejä',
  merkkejaIlmanFokusta === 0 && lehtiIlmanFokusta === false,
  `${merkkejaIlmanFokusta} merkkiä, lehti ${lehtiIlmanFokusta}`);
await pois.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
