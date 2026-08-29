/*
 * Savuke: maastokohteet — maiden vuoret, meret ja joet napautettavina.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Ensimmäinen erä on Euroopan lauta.
 *
 * MIKSI OMA SAVUKE EIKÄ RIVI savuke-fokuskohteet.mjs:ÄÄN: se savuke
 * mittaa Kreikkaa, ja Kreikka on koko pelin helpoin tapaus — kuratoitu
 * lehti, käsin kirjoitettu pakki ja lehteen poltetut nimet, joiden
 * päälle merkit asettuvat. Tämän erän riski on toisaalla ja se on
 * kahdenlainen:
 *
 *   1. MAA, JOLLA EI OLLUT PAKKIA LAINKAAN. Kahdeksantoista tämän erän
 *      maata ei ollut KOHDE_MAAT-taulussa ennen erää, ja niiden lehti on
 *      YLEISEN reitin kuva: siinä ei ole yhtään poltettua maastonimeä
 *      eikä yhtään hachure-kolmiota. Merkin nimiö on siis maastonimen
 *      AINOA esiintymä kartalla, ja jos ketju uusi tiedosto → hakemisto
 *      → KOHDE_MAAT katkeaa missä tahansa kohdassa, maa jää täsmälleen
 *      yhtä tyhjäksi kuin ennenkin eikä mikään yksikkötesti huomaa sitä.
 *      Norja on tässä koekaniini (Galdhøpiggen, Norjanmeri,
 *      Barentsinmeri, Glomma).
 *
 *   2. MAA, JOTA TÄYDENNETTIIN. Italialla oli jo fokuskohteet-ita.js,
 *      ja sen kohteet tulevat eri tiedostosta kuin uudet meret. Jos
 *      liitos (js/fokuskohteet.js) korvaisi listan yhdistämisen sijaan,
 *      Vesuvius katoaisi kartalta — ja juuri sen huomaa vasta pelissä.
 *
 * VARTIOT:
 *   1. NORJA SAA MERKIT. Maalla, jolla ei ollut pakkia, on nyt kaikki
 *      neljä maastokohdettaan kartalla omilla tunnuksillaan.
 *   2. MERKILLÄ ON NIMI. Yleisen reitin lehdellä nimiö on ainoa nimi,
 *      joten se on myös piirrettävä.
 *   3. NAPAUTUS AVAA TIETORUUDUN, jossa on nimi, tyyppirivi, oikeaa
 *      leipätekstiä ja lähderivi — ei tyhjää korttia.
 *   4. TEKSTI ON KOHTEEN OMA. Avatun kortin teksti täsmää pakin
 *      dataan, eli kortti ei näytä jonkin toisen kohteen tekstiä.
 *   5. ITALIA SÄILYTTI VANHAT. Vesuvius (vanha pakki) ja Adrianmeri
 *      (uusi tiedosto) ovat molemmat kartalla samaan aikaan.
 *   6. EI KAKSOISNIMIÄ. Yhdenkään maan yhdistetyssä listassa ei ole
 *      samaa tunnusta eikä samaa nimeä kahdesti.
 *   7. KAIKKI KOHTEET OSUVAT LEHDEN IKKUNAAN. Rajauksen ulkopuolinen
 *      merkki olisi olemassa mutta pelaajan ulottumattomissa; tämä on
 *      koko erän aineistotarkistus, ja se ajetaan kaikille maille.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';
import { MAASTOKOHTEET } from '../../js/packs/maastokohteet.js';
import { osuuLehteen } from '../johda-maastokohteet.mjs';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ---------------------------------------------- 7. aineistotarkistus */

/*
 * TÄMÄ VARTIO EI TARVITSE SELAINTA, ja se ajetaan ensin: jos aineisto
 * on väärin, selainkokeen tulos ei kerro mitään. Sama tarkistus kuin
 * tools/johda-maastokohteet.mjs tekee generoidessaan — täällä se on
 * portti, joka ei päästä ohi.
 */
{
  const ulkona = [];
  const kaksoiset = [];
  for (const [iso, lista] of Object.entries(MAASTOKOHTEET)) {
    const nahdyt = new Set();
    for (const kohde of lista) {
      if (osuuLehteen(iso, kohde.laudat) === false) ulkona.push(`${iso}/${kohde.nimi}`);
      const avain = `${kohde.id}|${kohde.nimi.toLowerCase()}`;
      if (nahdyt.has(avain)) kaksoiset.push(`${iso}/${kohde.id}`);
      nahdyt.add(avain);
      if (!kohde.teksti || kohde.teksti.length < 60) kaksoiset.push(`${iso}/${kohde.id} lyhyt teksti`);
      if (!kohde.lahde) kaksoiset.push(`${iso}/${kohde.id} lähde puuttuu`);
      if (!FOKUS_POHJAT[iso]) ulkona.push(`${iso} ei ole FOKUS_POHJAT-taulussa`);
    }
  }
  vaadi('7a. jokainen kohde osuu maansa fokuslehden rajaukseen',
    ulkona.length === 0, ulkona.join(', '));
  vaadi('7b. ei kaksoistunnuksia, teksti ja lähde joka kohteella',
    kaksoiset.length === 0, kaksoiset.join(', '));
}

/* ------------------------------------------------------- selainkoe */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/** Yksi sivu, pelaaja seisomassa annetussa kaupungissa maailmankartalla. */
async function avaaSivu(kaupunki, maa) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(2000);
  /*
   * KAMERA ON AJETTAVA LEHDELLE, MUUTEN MITTAUS OLISI TYHJÄSTÄ.
   * Yleislehtipohjan aikakaudella (Raamattu, "YLEISLEHTI ON KARTAN
   * POHJA") maalehteä ei piirretä kaukozoomissa lainkaan, ja kesken
   * pelin ladattu sivu jää nimenomaan yleiskuvaan: `fokusPohjaBbox` on
   * tyhjä eivätkä merkit ole syttyneet. Sama ajo ja sama perustelu kuin
   * savuke-fokuskohteet.mjs:n `ajaLehdelle` — rajaus otetaan datasta,
   * koska pelin oma rajaus on tässä vaiheessa vielä tyhjä.
   */
  await sivu.evaluate((varakohde) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({
      bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? varakohde,
      marginaali: 0,
    });
  }, FOKUS_POHJAT[maa].rajaus);
  await sivu.waitForTimeout(4200);
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 30000 }).catch(() => {});
  /*
   * SAAPUMISPORTTI (js/fokuskohteet.js PORTIN_VIIVE_MS) pitää merkit
   * pimeinä vielä hetken lehden ilmestymisen jälkeen — odotetaan se yli.
   */
  await sivu.waitForTimeout(3000);
  return sivu;
}

/** Kartan kohdemerkkien tunnukset ja niiden nimiöt. */
const merkit = (sivu) => sivu.evaluate(() => {
  const g = [...document.querySelectorAll('.fokuskohde')];
  return {
    tunnukset: [...new Set(g.map((k) => k.dataset.kohde))],
    /*
     * NIMIÖ ON RASTERI EIKÄ TEKSTIÄ. Merkki piirretään kartalle yhtenä
     * kuvana (js/fokusnosto-symbolit.js nostosymVirkistaRasterit), ja
     * nimi kulkee sen `data-nimio`-määreessä; <text> on vain varapolku.
     * Sama lukutapa kuin savuke-fokuskohteet.mjs:ssä.
     */
    nimiot: [...document.querySelectorAll('.fokuskohde')].map((g) => {
      const r = g.querySelector('.nostosym-rasteri');
      const t = g.querySelector('.nostosym-nimio');
      return r ? (r.dataset.nimio ?? '') : (t?.textContent ?? '');
    }).filter(Boolean),
  };
});

/** Auki olevan tietoruudun sisältö. */
const popup = (sivu) => sivu.evaluate(() => {
  const el = document.querySelector('.fokuskohde-popup');
  if (!el) return null;
  return {
    ylarivi: el.querySelector('.fokuskohde-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokuskohde-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokuskohde-teksti')?.textContent ?? '',
    lahde: el.querySelector('.fokuskohde-lahde')?.textContent ?? '',
  };
});

/** Napauttaa kohteen merkkiä tunnuksella. */
async function napauta(sivu, tunnus) {
  const laatikko = await sivu.evaluate((id) => {
    const g = document.querySelector(`.fokuskohde[data-kohde="${id}"] .fokuskohde-osuma`);
    if (!g) return null;
    const r = g.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, tunnus);
  if (!laatikko) return false;
  await sivu.mouse.click(laatikko.x, laatikko.y);
  await sivu.waitForTimeout(600);
  return true;
}

/* ------------------------------ 1.–4. Norja: maa ilman aiempaa pakkia */

const nor = await avaaSivu('oslo', 'NOR');
const norOdotetut = MAASTOKOHTEET.NOR.map((k) => k.id);
const norMerkit = await merkit(nor);
const norPuuttuu = norOdotetut.filter((id) => !norMerkit.tunnukset.includes(id));
vaadi('1. Norja — kaikki neljä maastokohdetta ovat kartalla',
  norPuuttuu.length === 0,
  `puuttuu ${norPuuttuu.join(', ')} (kartalla ${norMerkit.tunnukset.join(', ') || 'ei mitään'})`);

vaadi('2. merkillä on nimiö (yleisellä lehdellä ainoa nimi kartalla)',
  norMerkit.nimiot.some((n) => n.includes('Galdh')),
  `nimiöt: ${norMerkit.nimiot.slice(0, 8).join(' | ')}`);

const galdh = MAASTOKOHTEET.NOR.find((k) => k.id === 'galdhpiggen') ?? MAASTOKOHTEET.NOR[0];
const avautui = await napauta(nor, galdh.id);
const kortti = avautui ? await popup(nor) : null;
vaadi('3. napautus avaa tietoruudun, jossa on nimi, teksti ja lähde',
  Boolean(kortti && kortti.otsikko.includes(galdh.nimi)
    && kortti.teksti.length > 60 && kortti.lahde.length > 5),
  JSON.stringify(kortti));
vaadi('4. kortin teksti on kohteen oma eikä naapurin',
  Boolean(kortti && galdh.teksti.startsWith(kortti.teksti.slice(0, 40))),
  `kortti: ${kortti?.teksti?.slice(0, 60)} | data: ${galdh.teksti.slice(0, 60)}`);
await nor.context().close();

/* ---------------------------- 5. Italia: täydennetty maa säilytti vanhat */

const ita = await avaaSivu('rooma', 'ITA');
const itaMerkit = await merkit(ita);
vaadi('5. Italia — vanha Vesuvius ja uusi Adrianmeri ovat molemmat kartalla',
  itaMerkit.tunnukset.includes('vesuvius') && itaMerkit.tunnukset.includes('adrianmeri'),
  itaMerkit.tunnukset.join(', '));
await ita.context().close();

/* ------------------------------------------------ 6. ei kaksoisnimiä */

/*
 * Vaarallisin kaksoiskappale ei ole uuden listan sisällä vaan sen ja
 * maan VANHAN pakin välillä: sama meri kahdesti kartalla, kaksi merkkiä
 * päällekkäin. Vanha pakki luetaan tekstinä (sen tuonti vetäisi mukanaan
 * selainkoodia, jota Node ei käännä).
 */
{
  const tormaykset = [];
  for (const [iso, lista] of Object.entries(MAASTOKOHTEET)) {
    const vanha = join(JUURI, 'js', 'packs', `fokuskohteet-${iso.toLowerCase()}.js`);
    const vanhatNimet = existsSync(vanha)
      ? new Set([...readFileSync(vanha, 'utf8').matchAll(/^\s{4}nimi: '([^']+)'/gm)]
        .map(([, n]) => n.toLowerCase()))
      : new Set();
    const nahdyt = new Set();
    for (const kohde of lista) {
      const avain = kohde.nimi.toLowerCase();
      if (nahdyt.has(avain) || vanhatNimet.has(avain)) tormaykset.push(`${iso}/${kohde.nimi}`);
      nahdyt.add(avain);
    }
  }
  vaadi('6. uusi kohde ei toista maan vanhan pakin nimeä eikä itseään',
    tormaykset.length === 0, tormaykset.join(', '));
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
