/*
 * Savuke: PUHEKUPLAT SULKEUTUVAT NAPAUTUKSESTA.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Ota pulun puhekuplista
 * sulkemis ruksi pois. Ja muuta toiminto niin että Puhekuplat voi
 * sulkea napauttamalla niitä."*
 *
 * PLUSKUPLA POISTETTIIN 18.9.2026 (omistaja, Raamattu "KARTTAUUDISTUKSEN
 * PAATOKSET 34" kohta 20 a): imeytymisen kohdetta ei enää piirretä,
 * joten kuplat vain sulkeutuvat paikallaan. Paluureitti repliikkeihin
 * on chatin ylärivin "Näytä puhekuplat" — sen oma mittari on
 * tools/savukkeet/savuke-nayta-puhekuplat.mjs.
 *
 * MITÄ TÄMÄ MITTAA, jota yksikkötesti ei näe: oikean selaimen
 * sulkemisliikkeen. Kuplan TODELLISEN häipymisen napautuksen jälkeen,
 * sen ettei ruksia eikä pluskuplaa enää ole, ja sen ettei napautus
 * avaa chattia.
 *
 * VASTAKOE kuuluu ajoon.
 *
 *   PLAYWRIGHT_JS=<polku> CHROMIUM=<polku> \
 *     node tools/savukkeet/savuke-kuplan-imu.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
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

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
/*
 * TYÖPÖYDÄN RUUTU, EI PUHELIMEN. Puhelimella (ja kertojan luennan
 * aikana) pulun kupla ALOITTAA suljettuna — js/ui-apurit.js
 * tekstitPiilossa → js/pollo.js imePuhelimenKuplaan — joten 390 px:n
 * ruudulla pinoon ei jää kuplaa, jota napauttaa. Mitattava asia on
 * napautuksen sulkumekaniikka, joten se mitataan siellä missä kupla
 * jää ruudulle. Puhelimen oma sopimus: savuke-nayta-puhekuplat.mjs.
 */
const ctx = await selain.newContext({ viewport: { width: 1400, height: 900 }, serviceWorkers: 'block' });
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

/* Napautus kuplaan: mitataan häipyminen kesken sulkemisen. */
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
  // Kesken sulkemisen: siirtymä on käynnissä, mitataan puolivälissä.
  await new Promise((r) => setTimeout(r, 80));
  const tyyli = getComputedStyle(kupla);
  return {
    lapinakyvyys: Number(tyyli.opacity),
    // Kohta 20 a: pluskuplaa ei saa olla DOMissa missään vaiheessa.
    pluskuplia: document.querySelectorAll('.pollo-kuplapalautus').length,
  };
});

vaadi('kupla häipyy sulkemisen aikana', lento.lapinakyvyys < 0.95,
  JSON.stringify(lento));
vaadi('pluskuplaa ei synny sulkemisesta', lento.pluskuplia === 0,
  JSON.stringify(lento));

/* Sulkemisen jälkeen: kuplat poissa, chatti kiinni, ei pluskuplaa. */
await sivu.waitForTimeout(700);
const jalkeen = await sivu.evaluate(() => ({
  kuplia: document.querySelectorAll('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]').length,
  pluskuplia: document.querySelectorAll('.pollo-kuplapalautus').length,
  chatAuki: Boolean(document.querySelector('.pollo-paneeli:not([hidden])')),
}));
vaadi('kuplat katosivat sulkemisen jälkeen', jalkeen.kuplia === 0, JSON.stringify(jalkeen));
vaadi('pluskuplaa ei jäänyt ruudulle', jalkeen.pluskuplia === 0, JSON.stringify(jalkeen));
vaadi('napautus EI avannut chattia', !jalkeen.chatAuki, JSON.stringify(jalkeen));

/*
 * MUISTI JÄÄ, VAIKKA KUPLA KATOAA. Sulku katkaisee kesken olevan
 * puheenvuoron (peruPuheenvuoro); ilman sitä loput osat saapuisivat
 * sekunnin päästä ja avaisivat pinon uudelleen. Muistin varassa on
 * chatin ylärivin nappi, joten se mitataan tässä suoraan.
 */
const muisti = await sivu.evaluate(async () => {
  const pollo = window.matkakirjaPollo ?? window.matkakirja?.ui?.pollo;
  const lue = () => Boolean(pollo?.viimeisinPiilotettuKupla);
  const heti = lue();
  await new Promise((r) => setTimeout(r, 1800));
  return {
    heti,
    myohemmin: lue(),
    kuplia: document.querySelectorAll('.pollo-kuplapino .pollo-vihje[data-laji="puhe"]').length,
  };
});
vaadi('viimeisin repliikki jää muistiin palautusta varten',
  muisti.heti && muisti.myohemmin, JSON.stringify(muisti));
vaadi('kuplat eivät palaa itsestään', muisti.kuplia === 0, JSON.stringify(muisti));

/* Palautus pelin omalla polulla: kuplan pitää olla oikeasti näkyvä. */
const palautettu = await sivu.evaluate(async () => {
  const pollo = window.matkakirjaPollo ?? window.matkakirja?.ui?.pollo;
  pollo?.naytaPuhekuplatUudelleen();
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
vaadi('palautus tuo kuplan takaisin', palautettu.on, JSON.stringify(palautettu));
vaadi('palautettu kupla on näkyvä eikä sulkemisen tynkä',
  palautettu.on && palautettu.lapinakyvyys > 0.9 && palautettu.leveys > 40
    && palautettu.korkeus > 10 && palautettu.osoitin !== 'none',
  JSON.stringify(palautettu));

vaadi('ei poikkeuksia ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
