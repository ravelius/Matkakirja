/*
 * Savuke: TÄKYNOSTOJEN PORTTI kaupungissa, jolla EI ole fokusvirtaa
 * (js/fokusnosto.js nostoJaljella, js/fokusnosto-symbolit.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA (v1298). Maapoolin (NOSTO_MAAT)
 * täkynostot näkyivät kartalla vain niissä kaupungeissa, joilla on rivi
 * js/packs/fokusvirrat.js:ssä — Ateenassa ja Sofiassa. Portti oli
 * nostoJaljella-ehdossa `!fokusvirtaSisalto(ui, city)`, ja kun v1297 toi
 * pooliin kymmenen täkyä neljään maahan (ESP/AUT/FRA/DEU), yhtäkään
 * niistä ei nähnyt pelissä: Madridilla, Wienillä, Pariisilla eikä
 * Berliinillä ole fokusvirtariviä. Vika ei näkynyt yhdessäkään portissa,
 * koska yksikkötestit lukevat dataa ja savukkeet ajoivat Kreikassa.
 *
 * Raamatun linjaus (js/tyohuone-raamattu.js, TÄKYPISTEET): kaikki nostot
 * ovat täkyjä ja pisteet ovat AINA näkyvissä kartalla. Tämä savuke
 * vartioi juuri sitä polkua, jota mikään muu koe ei aja — MAAPOOLI ILMAN
 * FOKUSVIRTAA — eikä siihen tarvita fokuslehteä: piste piirtyy kartan
 * omaan kerrokseen (fokusnosto-symbolit), ei lehden päälle.
 *
 * KAUPUNGIT VAIHTUIVAT v1301:SSÄ. Savuke ajoi Madridissa ja Pariisissa,
 * mutta molemmat saivat oman fokusvirtansa (Eurooppa kauttaaltaan
 * valmiiksi, aalto 1), eivätkä ne siis enää ole esimerkkejä kaupungista
 * ILMAN fokusvirtaa. Samalla maapoolin ESP- ja FRA-rivit alkoivat
 * osoittaa noiden kaupunkien pakettien `takynostot`-kenttiin
 * (js/fokusnosto.js NOSTO_MAAT). Savuke ajaa siksi nyt SEVILLASSA ja
 * MARSEILLESSA: ne ovat saman maan kaupunkeja ilman omaa fokusvirtaa,
 * joten ne mittaavat yhtä aikaa vanhan portin JA sen, ettei siirto
 * paketteihin vienyt täkyjä maan muilta kaupungeilta.
 *
 * VARTIOT:
 *   1. PORTTI AUKI. Sevillassa (Euroopan lauta, ei fokusvirtaa) Espanjan
 *      poolin kaikki kolme pistettä ovat kartalla, jokaisella kartan
 *      nimiö, ja niistä TASAN YKSI tuikkii (huomio yksi kerrallaan).
 *   2. PISTEET EIVÄT OLE PÄÄLLEKKÄIN. Varapolulla ei ole kohdemerkkien
 *      kasauspassia, joten kaksi lähekkäistä täkyä osuisi samaan
 *      paikkaan — ja alempi jäisi tavoittamattomiin
 *      (js/fokusnosto-symbolit.js nostosymOmaanRiviin). Mitataan
 *      Ranskassa, jonka molempien täkyjen oma paikka on Pariisissa
 *      runsaan lautayksikön päässä toisistaan.
 *   3. KORTTI AUKEAA PISTEESTÄ, ja siinä on LUNASTUS (monikappaleinen
 *      teksti, ei pelkkä otsikko) sekä pöllön kysymysnapit.
 *   4. LUETTU JÄÄ KARTALLE. Kortin sulun jälkeen luettu piste on yhä
 *      kartalla vaimeana, seuraava katsomaton alkaa tuikkia, ja luetun
 *      napautus avaa kortin uudelleen.
 *   5. BOTTI EI SAA TÄKYJÄ. Portin toinen puoli: ehto "fokusmoodi
 *      päällä ja pelaaja ihminen" oli ennen fokusvirtaSisallon sisällä,
 *      ja se on säilytettävä — fokusmoodi pois ⇒ ei yhtäkään pistettä.
 *
 * Peli istutetaan kaupunkiin pelitallenteen kautta, kuten muissakin
 * savukkeissa: lentoa ei voi odottaa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

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

/** Pelitallenne: Fogg seisoo annetussa Euroopan laudan kaupungissa. */
function tallenneKaupunkiin(id) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: packById('europe'),
    seed: 11,
  });
  // Laatta käännetty: aarre on löytynyt, joten huomio-ohjaus (tuike) on
  // päällä samalla tavalla kuin fokusvirtakaupungissa aarteen jälkeen.
  peli.tokens.set(id, 'topaz');
  peli.revealed.delete(id);
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi sivu valmiiksi ladattuna annettuun kaupunkiin. */
async function avaaSivu(kaupunki, fokus = true) {
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 },
    reducedMotion: 'reduce',
  });
  await ctx.addInitScript(([data, paalla]) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      // Lähtötila on pelaaja, joka ei ole vielä katsonut yhtään täkyä.
      localStorage.removeItem('matkakirja-takynostot-luetut');
      if (paalla) localStorage.removeItem('matkakirja-fokusmoodi');
      else localStorage.setItem('matkakirja-fokusmoodi', '0');
    } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
  }, [tallenneKaupunkiin(kaupunki), fokus]);
  const sivu = await ctx.newPage();
  /*
   * KUVAPALVELIN KORVATAAN PIKSELILLÄ: kontin selain ei pääse ämpäriin
   * eikä Commonsiin, eikä savuke saa mitata verkkoyhteyttä.
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
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  return sivu;
}

/** Kartan täkypisteet: tunnus, nimiö, tuike, ruutupaikka ja osuma-alue. */
const pisteet = (sivu) => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const keskipiste = (el) => {
    const r = el?.getBoundingClientRect?.();
    return r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
  };
  return (ui.nostosymRyhmat ?? []).map((r) => ({
    id: r.id,
    luettu: !!r.luettu,
    vaimea: !!r.g.querySelector('.nostosym-luettu'),
    nimio: r.g.querySelector('.nostosym-takynimio text')?.textContent ?? '',
    nimioNakyy: Boolean(r.nimio?.nakyy),
    tuikkii: Boolean(r.g.querySelector('.nostosym-tuike-paalla')),
    keski: keskipiste(r.g.querySelector('.nostosym-tuike-osuma')),
    lapimitta: r.g.querySelector('.nostosym-tuike-osuma')?.getBoundingClientRect().width ?? 0,
  }));
});

/** Auki olevan lunastuskortin sisältö, tai null. */
const kortti = (sivu) => sivu.evaluate(() => {
  const k = document.querySelector('.fokusnosto-kortti');
  if (!k) return null;
  return {
    otsikko: k.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? '',
    kappaleita: [...k.querySelectorAll('.fokusnosto-teksti p')]
      .filter((p) => (p.textContent ?? '').trim().length > 60).length,
    kysymyksia: k.querySelectorAll('.fokusnosto-kysymykset button').length,
    // Isoisän karttaliite: onko arkkia, ja onko sillä otsake, kuva ja
    // lähderivi. Kortti ilman `kartta`-kenttää palauttaa liite: false.
    liite: Boolean(k.querySelector('.fokusnosto-liite')),
    liiteOtsake: k.querySelector('.fokusnosto-liite-otsake')?.textContent ?? '',
    liiteLahde: k.querySelector('.fokusnosto-liite .fokusnosto-kuvalahde')?.textContent ?? '',
    liiteKuva: k.querySelector('.fokusnosto-liitekuva')?.getAttribute('src') ?? '',
  };
});

/* --- 1: portti auki Sevillassa (Espanja, ei fokusvirtaa) --- */

const madrid = await avaaSivu('sevilla');
const espanja = await pisteet(madrid);
vaadi('maapoolin täkypisteet ovat kartalla ilman fokusvirtaa',
  espanja.length === 3 && espanja.every((p) => !p.luettu && p.keski),
  `${espanja.length} pistettä: ${JSON.stringify(espanja.map((p) => p.id))}`);
vaadi('jokaisella pisteellä on kartan nimiö',
  espanja.length > 0 && espanja.every((p) => p.nimio.length > 0 && p.nimioNakyy),
  JSON.stringify(espanja.map((p) => `${p.nimio}${p.nimioNakyy ? '' : ' (piilossa)'}`)));
vaadi('tuike on tasan yhden pisteen päällä',
  espanja.filter((p) => p.tuikkii).length === 1,
  JSON.stringify(espanja.map((p) => ({ id: p.id, t: p.tuikkii }))));
vaadi('osuma-alue on sormen mitta (≥44 px)',
  espanja.every((p) => p.lapimitta >= 43.5),
  JSON.stringify(espanja.map((p) => Math.round(p.lapimitta))));

/* --- 2: kortti aukeaa pisteestä, lunastus ja kysymysnapit --- */

const tuikkiva = espanja.find((p) => p.tuikkii) ?? espanja[0];
await madrid.mouse.click(Math.round(tuikkiva.keski.x), Math.round(tuikkiva.keski.y));
await madrid.waitForTimeout(700);
const avattu = await kortti(madrid);
vaadi('täkypisteen napautus avaa lunastuskortin',
  Boolean(avattu?.otsikko?.length),
  JSON.stringify(avattu));
vaadi('kortissa on lunastusteksti eikä pelkkä otsikko',
  (avattu?.kappaleita ?? 0) >= 2, `${avattu?.kappaleita} kappaletta`);
vaadi('kortissa on pöllön kysymysnapit',
  (avattu?.kysymyksia ?? 0) === 3, `${avattu?.kysymyksia} nappia`);
// Karttaliite on valinnainen kenttä: ilman sitä kortti latoutuu kuten
// ennenkin eikä arkkia synny tyhjänä (ks. vartio 6).
vaadi('täky ilman karttaliitettä latoo kortin ilman liitearkkia',
  avattu?.liite === false, JSON.stringify(avattu));

/* --- 3: luettu jää kartalle, seuraava syttyy, kortti aukeaa uudelleen --- */

await madrid.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await madrid.waitForTimeout(800);
const luennanJalkeen = await pisteet(madrid);
const luettu = luennanJalkeen.find((p) => p.id === tuikkiva.id);
vaadi('luettu täky jää kartalle vaimeana eikä tuiki',
  Boolean(luettu?.luettu && luettu.vaimea && !luettu.tuikkii),
  JSON.stringify(luettu));
vaadi('seuraava katsomaton alkaa tuikkia',
  luennanJalkeen.filter((p) => p.tuikkii).length === 1
  && !luennanJalkeen.find((p) => p.tuikkii)?.luettu,
  JSON.stringify(luennanJalkeen.map((p) => ({ id: p.id, t: p.tuikkii }))));
if (luettu?.keski) {
  await madrid.mouse.click(Math.round(luettu.keski.x), Math.round(luettu.keski.y));
  await madrid.waitForTimeout(700);
}
const uudelleen = await kortti(madrid);
vaadi('luetun pisteen napautus avaa kortin uudelleen',
  Boolean(uudelleen?.otsikko?.length), JSON.stringify(uudelleen));
await madrid.evaluate(() => document.querySelector('.fokusnosto-kortti-sulje')?.click());
await madrid.context().close();

/* --- 4: kaksi lähekkäistä täkyä eivät jää päällekkäin (Marseille) --- */

const pariisi = await avaaSivu('marseille');
const ranska = await pisteet(pariisi);
vaadi('Ranskan molemmat täyt ovat kartalla',
  ranska.length === 2 && ranska.every((p) => p.keski),
  JSON.stringify(ranska.map((p) => p.id)));
const etaisyys = ranska.length === 2 && ranska[0].keski && ranska[1].keski
  ? Math.hypot(ranska[0].keski.x - ranska[1].keski.x, ranska[0].keski.y - ranska[1].keski.y)
  : 0;
vaadi('varapolun pisteet eivät jää päällekkäin (sormialueet erillään)',
  etaisyys >= (ranska[0]?.lapimitta ?? 44) - 0.5,
  `etäisyys ${Math.round(etaisyys)} px, läpimitta ${Math.round(ranska[0]?.lapimitta ?? 0)} px`);
vaadi('molempien nimiöt näkyvät, kun pisteet ovat erillään',
  ranska.every((p) => p.nimio.length > 0 && p.nimioNakyy),
  JSON.stringify(ranska.map((p) => `${p.nimio}${p.nimioNakyy ? '' : ' (piilossa)'}`)));
await pariisi.context().close();

/* --- 5: portin toinen puoli — fokusmoodi pois, ei pisteitä --- */

const pois = await avaaSivu('sevilla', false);
const ilmanFokusta = await pisteet(pois);
vaadi('fokusmoodi pois: ei täkypisteitä',
  ilmanFokusta.length === 0, `${ilmanFokusta.length} pistettä`);
await pois.context().close();

/* --- 6: isoisän karttaliite Wienin maailmannäyttelytäyssä --- */

/*
 * KOLMAS KUVA, JOTA LUETAAN. Raamatun linjaus 29.8.2026 antaa
 * kaiverretulle aikalaiskartalle oman roolinsa (paikka sellaisena kuin
 * isoisä sen tunsi), ja pilotti on Wienin maailmannäyttely 1873. Liite
 * on repon oma tiedosto ilman Commons-varareittiä, ja sen suurennos
 * kulkee kartan kohteiden mekanismilla (js/fokuskohteet.js
 * avaaKohdeSuurennos) — kumpikaan ei näy yhdessäkään datatestissä.
 */
const wien = await avaaSivu('wien');
const itavalta = await pisteet(wien);
const nayttely = itavalta.find((p) => p.id === 'maailmannayttely-1873');
vaadi('Wienin maailmannäyttelytäky on kartalla',
  Boolean(nayttely?.keski), JSON.stringify(itavalta.map((p) => p.id)));
if (nayttely?.keski) {
  await wien.mouse.click(Math.round(nayttely.keski.x), Math.round(nayttely.keski.y));
  await wien.waitForTimeout(900);
}
const liitekortti = await kortti(wien);
vaadi('kortissa on isoisän karttaliite otsakkeineen',
  Boolean(liitekortti?.liite) && /liite/i.test(liitekortti?.liiteOtsake ?? ''),
  JSON.stringify(liitekortti));
vaadi('karttaliitteen kuva on repon oma tiedosto',
  (liitekortti?.liiteKuva ?? '').includes('karttaliitteet/'),
  liitekortti?.liiteKuva ?? '(ei kuvaa)');
vaadi('karttaliitteessä on lähderivi lisensseineen',
  /public domain|CC /i.test(liitekortti?.liiteLahde ?? ''),
  liitekortti?.liiteLahde ?? '(ei lähdettä)');

await wien.evaluate(() => document.querySelector('.fokusnosto-liitenappi')?.click());
await wien.waitForTimeout(900);
const suurennettu = await wien.evaluate(() => ({
  zoom: Boolean(document.querySelector('.fokuskohde-zoom')),
  kuva: document.querySelector('.fokuskohde-zoom img')?.getAttribute('src') ?? '',
  kortti: Boolean(document.querySelector('.fokusnosto-kortti')),
}));
vaadi('liitteen napautus avaa kartan suurennoksen',
  suurennettu.zoom && suurennettu.kuva.includes('karttaliitteet/'),
  JSON.stringify(suurennettu));
vaadi('kortti jää suurennoksen taakse auki', suurennettu.kortti, JSON.stringify(suurennettu));

// Escape sulkee ENSIN suurennoksen — ei koko korttia sen alta.
await wien.keyboard.press('Escape');
await wien.waitForTimeout(700);
const escin_jalkeen = await wien.evaluate(() => ({
  zoom: Boolean(document.querySelector('.fokuskohde-zoom')),
  kortti: Boolean(document.querySelector('.fokusnosto-kortti')),
}));
vaadi('Esc sulkee suurennoksen mutta jättää kortin auki',
  !escin_jalkeen.zoom && escin_jalkeen.kortti, JSON.stringify(escin_jalkeen));
await wien.context().close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
