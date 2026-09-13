/*
 * Savuke: PUHEKUPLAT SULKEUTUVAT NAPAUTUKSESTA JA IMEYTYVÄT PLUSKUPLAAN.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Ota pulun puhekuplista
 * sulkemis ruksi pois. Ja muuta toiminto niin että Puhekuplat voi
 * sulkea napauttamalla niitä. Saisiko sulkemisen animoitua niin että
 * kuplat ihan kuin imeytyisivät pienen puhekuplan sisälle joka jää
 * jäljelle sulkeutumisen jälkeen ja jossa on se pieni + symboli
 * uudelleen avausta varten."*
 *
 * MITÄ TÄMÄ MITTAA, jota yksikkötesti ei näe: oikean selaimen
 * transitionin. Kuplan TODELLISEN muunnoksen kesken lennon (siirtyykö
 * se pluskuplaa kohti ja kutistuuko), pluskuplan näkyvyyden lennon
 * jälkeen, sen ettei ruksia enää ole, ja sen että palautettu kupla on
 * oikeasti näkyvä eikä imeytymisen jäljiltä läpinäkyvä tynkä.
 *
 * VASTAKOE kuuluu ajoon.
 *
 *   node tools/savukkeet/savuke-kuplan-imu.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForSelector('.start-btn', { timeout: 15000 });
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(4000);
vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

/* Kolme puhekuplaa pinoon pelin omalla rajapinnalla. */
const luotu = await sivu.evaluate(async () => {
  // Pöllön ilmentymä on omassa globaalissaan (js/pollo.js).
  const pollo = window.matkakirjaPollo ?? window.matkakirja?.ui?.pollo;
  if (!pollo) return { virhe: 'pöllöä ei ole' };
  // Ajastettu piilotus pois tieltä: mittaamme napautusta, ei kelloa.
  pollo.peruKuplanPiilotus();
  /*
   * PULUN NAPPI ON PIILOSSA LÄHTÖKAUPUNGIN VALINNASSA, ja piilossa
   * oleva pulu ei puhu (naytaPuheenvuoro palaa falsena). Mitattava
   * asia on kuplan sulkumekaniikka eikä vaiheen portti, joten nappi
   * paljastetaan tässä — muuten ajo joutuisi pelaamaan itsensä
   * kaupunkiin asti ja mittaisi matkalla kaiken muunkin.
   */
  if (pollo.nappi) pollo.nappi.hidden = false;
  // Pelin oma rajapinta: puheenvuoro kolmena osana yhteen pinoon.
  pollo.naytaPuheenvuoro(['Eka repliikki', 'Toka repliikki', 'Kolmas repliikki']);
  await new Promise((r) => setTimeout(r, 2500));
  pollo.peruKuplanPiilotus();
  return {
    kuplia: document.querySelectorAll('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]').length,
    ruksi: document.querySelectorAll('.pollo-kuplapino-sulje').length,
  };
});
vaadi('puhekuplia saatiin pinoon', (luotu.kuplia ?? 0) > 0, JSON.stringify(luotu));
vaadi('sulkuruksia ei ole enää lainkaan', luotu.ruksi === 0, JSON.stringify(luotu));

/* Napautus kuplaan: mitataan muunnos kesken lennon. */
const lento = await sivu.evaluate(async () => {
  const kupla = document.querySelector('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]');
  if (!kupla) return { virhe: 'kuplaa ei ole' };
  const ennen = kupla.getBoundingClientRect();
  const tapahtuma = (tyyppi, lisa = {}) => kupla.dispatchEvent(new PointerEvent(tyyppi, {
    bubbles: true, cancelable: true, pointerId: 1, clientX: ennen.left + 10,
    clientY: ennen.top + 10, ...lisa,
  }));
  tapahtuma('pointerdown');
  tapahtuma('pointerup');
  // Kesken lennon: transition on käynnissä 320 ms, mitataan puolivälissä.
  await new Promise((r) => setTimeout(r, 140));
  const tyyli = getComputedStyle(kupla);
  const palautus = document.querySelector('.pollo-kuplapalautus');
  const pRect = palautus?.getBoundingClientRect() ?? null;
  const kRect = kupla.getBoundingClientRect();
  return {
    muunnos: tyyli.transform,
    lapinakyvyys: Number(tyyli.opacity),
    palautusNakyy: Boolean(palautus && !palautus.hidden),
    palautusMerkki: palautus?.textContent ?? '',
    // Etäisyys pluskuplaan ennen ja kesken lennon: sen pitää pienentyä.
    etaisyysEnnen: pRect ? Math.hypot(
      (ennen.left + ennen.width / 2) - (pRect.left + pRect.width / 2),
      (ennen.top + ennen.height / 2) - (pRect.top + pRect.height / 2),
    ) : null,
    etaisyysNyt: pRect ? Math.hypot(
      (kRect.left + kRect.width / 2) - (pRect.left + pRect.width / 2),
      (kRect.top + kRect.height / 2) - (pRect.top + pRect.height / 2),
    ) : null,
  };
});

vaadi('napautus käynnisti muunnoksen', lento.muunnos && lento.muunnos !== 'none',
  JSON.stringify(lento.muunnos));
vaadi('kupla kutistuu lennon aikana',
  /matrix\(([\d.]+)/.test(lento.muunnos) && Number(/matrix\(([\d.]+)/.exec(lento.muunnos)[1]) < 0.95,
  JSON.stringify(lento.muunnos));
vaadi('kupla häipyy lennon aikana', lento.lapinakyvyys < 0.95, String(lento.lapinakyvyys));
vaadi('kupla liikkuu pluskuplaa kohti',
  lento.etaisyysNyt !== null && lento.etaisyysNyt < lento.etaisyysEnnen,
  JSON.stringify({ ennen: lento.etaisyysEnnen, nyt: lento.etaisyysNyt }));
vaadi('pluskupla on näkyvissä lennon aikana', lento.palautusNakyy, JSON.stringify(lento));
vaadi('pluskuplassa on + merkki', (lento.palautusMerkki ?? '').trim() === '+',
  JSON.stringify(lento.palautusMerkki));

/* Lennon jälkeen: kuplat poissa, pluskupla jäi. */
await sivu.waitForTimeout(700);
const jalkeen = await sivu.evaluate(() => ({
  kuplia: document.querySelectorAll('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]').length,
  palautusNakyy: (() => {
    const p = document.querySelector('.pollo-kuplapalautus');
    return Boolean(p && !p.hidden && p.getBoundingClientRect().width > 0);
  })(),
  chatAuki: Boolean(document.querySelector('.pollo-chat:not([hidden])')),
}));
vaadi('kuplat katosivat lennon jälkeen', jalkeen.kuplia === 0, JSON.stringify(jalkeen));
vaadi('pluskupla jäi ruudulle', jalkeen.palautusNakyy, JSON.stringify(jalkeen));
vaadi('napautus EI avannut chattia', !jalkeen.chatAuki, JSON.stringify(jalkeen));

/*
 * PLUSKUPLA EI SAA KADOTA ITSESTÄÄN. Napautus voi osua kesken osiin
 * jaettua puheenvuoroa; jos sitä ei katkaista, loput osat saapuvat
 * sekunnin päästä, avaavat pinon uudelleen ja syövät juuri syntyneen
 * pluskuplan. Mitattu ennen korjausta: pluskupla katosi 400 ms:n
 * jälkeen itsestään.
 */
const pysyy = await sivu.evaluate(async () => {
  const nayta = () => {
    const el = document.querySelector('.pollo-kuplapalautus');
    return Boolean(el && !el.hidden && el.getBoundingClientRect().width > 0);
  };
  const a = nayta();
  await new Promise((r) => setTimeout(r, 1800));
  return { heti: a, myohemmin: nayta() };
});
vaadi('pluskupla ei katoa itsestään sulkemisen jälkeen',
  pysyy.heti && pysyy.myohemmin, JSON.stringify(pysyy));

/* Pluskuplasta takaisin: palautetun kuplan pitää olla oikeasti näkyvä. */
const palautettu = await sivu.evaluate(async () => {
  document.querySelector('.pollo-kuplapalautus')?.click();
  await new Promise((r) => setTimeout(r, 500));
  const kupla = document.querySelector('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]');
  if (!kupla) return { on: false };
  const t = getComputedStyle(kupla);
  const r = kupla.getBoundingClientRect();
  return {
    on: true, lapinakyvyys: Number(t.opacity), muunnos: t.transform,
    leveys: r.width, korkeus: r.height, osoitin: t.pointerEvents,
  };
});
vaadi('pluskupla palauttaa kuplan', palautettu.on, JSON.stringify(palautettu));
vaadi('palautettu kupla on näkyvä eikä imeytymisen tynkä',
  palautettu.on && palautettu.lapinakyvyys > 0.9 && palautettu.leveys > 40
    && palautettu.korkeus > 10 && palautettu.osoitin !== 'none',
  JSON.stringify(palautettu));

vaadi('ei poikkeuksia ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
