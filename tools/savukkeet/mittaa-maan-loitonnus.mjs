/*
 * MITTAUS: MAAN LOITONNUKSEN KATTO (omistaja 28.9.2026 klo 17.2x: "vaakamuotoisia
 * valtioita ei näe kerralla kokonaan"). Pelaaja Pariisissa, ruutu 390 × 844 ja
 * 1400 × 900: rulla ulos niin pitkälle kuin kamera antaa, korkeus ja maan
 * laatikon näkyvyys (länsi- ja itäreuna ruudulla) talteen + kuva.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/mittaa-maan-loitonnus.mjs [ULOS=<kansio>]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { LIUSKAN_AJO_MS } from '../../js/pallolauta/kamera.js';
import { avaaChromium } from '../selain.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
// Julkaisusarjassa kaappauskansio tulee ajurilta (tools/savukkeet/
// aja-sarja.mjs asettaa KAAPPAUKSET), paikallisesti oma kansio.
const KAAPPAUKSET = process.env.KAAPPAUKSET
  || join(JUURI, 'tools/savukkeet/kaappaukset/kohdevalinta');
mkdirSync(KAAPPAUKSET, { recursive: true });

/**
 * LONTOO, MAAREITTI, SILMÄLUKU 4 — omistajan iPad-kuvan tilanne.
 * Tällä heitolla Pariisi on kohdekaupunki (findMoves: c:pariisi) ja
 * samalla laudalla on kaupunkeja, jotka EIVÄT ole kohteita (vartio 2).
 */
const LAHTO = 'lontoo';
const KOHDE = 'pariisi';
const SILMA = 4;

/*
 * ── MUIDEN MAIDEN KAUPUNGIT OVAT PIILOSSA (PAATOKSET 43 kohta 8) ───
 *
 * v1947 piilottaa pelinäkymässä kohdemaan ULKOPUOLISET kaupungit,
 * kun siirtovaihe ei ole päällä (js/pallolauta/lauta.js
 * `pelinKaupunkirajaus` = kohdemaa + oma kaupunki + tarjolla olevat
 * kohteet). Tämä savuke napautti aiemmin Pariisia ilman noppaa
 * (vartio 1) ja Amsterdamia/Alppeja ei-kohteena (vartio 2) — ne ovat
 * nyt oikein piilossa, joten napautus meni paljaaseen CANVASiin ja
 * kumpikin vartio oli punainen syystä, joka EI ollut PAATOKSET 42:n
 * väite. Napautettavat kaupungit valitaan siksi samasta lähteestä
 * kuin rajaus itse: KOHDEMAAN kaupungeista (`pack.map.cityCountry`).
 *
 *   vartio 1 (ilman noppaa): kohdemaan kaupunki, joka ei ole oma
 *     (Lontoosta Edinburgh) — ja jos pallon laudalla ei ole yhdelläkään
 *     niistä pistettä, varalla on OMA kaupunki, joka on aina näkyvissä
 *     ja avaa liuskan siirtovaiheen ulkopuolella (kohta 4). Valinta
 *     kirjataan lokiin, jotta vihreästä näkee, kumpi mitattiin.
 *   vartio 2 (siirtovaiheessa): kohdemaan kaupunki, joka EI ole
 *     nopanheiton kohde eikä oma (Lontoosta silmällä 4: Bermuda tai
 *     Falkland — Edinburgh ja Pariisi ovat kohteita).
 *
 * Väite säilyy sanasta sanaan: kohdekaupungin napautus valitsee
 * siirron (vartiot 4–6), muu kaupunki avaa liuskan (1–3).
 */
const KARTTA = packById('maailmankartta');
const MAATAULU = KARTTA?.map?.cityCountry ?? {};
const KOHDEMAA = MAATAULU[LAHTO] ?? null;
const KOHDEMAAN_KAUPUNGIT = Object.keys(MAATAULU).filter((id) => MAATAULU[id] === KOHDEMAA);
/** Kuinka kauan liuskan avautumista odotetaan (kamera-ajo 1400 ms + ladonta). */
const LIUSKAN_ODOTUS_MS = 3500;
/** Kuinka kauan siirron alkua odotetaan napautuksen jälkeen. */
const SIIRRON_ODOTUS_MS = 6000;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); return; }
  console.log(`FAIL  ${nimi} — ${lisa}`);
  console.log(`::warning::${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
  .catch(() => null);
const chromium = paketti?.chromium ?? paketti?.default?.chromium ?? null;
const lopeta = (koodi) => {
  console.log(`\n${lapi}/${kaikki} vartiota läpi`);
  process.exit(koodi);
};
if (!chromium) {
  console.log('OHITUS  playwright puuttuu — savuke ohitetaan');
  lopeta(0);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata');
  palvelin.close();
  lopeta(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: LAHTO }],
  pack: KARTTA,
  seed: 5,
});
peli.phase = 'action';
const TALLENNE = JSON.stringify(peli.toJSON());

const konttiSelain = '/opt/pw-browsers/chromium';
const selainPolku = process.env.CHROMIUM
  ?? (existsSync(konttiSelain) ? konttiSelain : chromium.executablePath());
const selain = await avaaChromium({ executablePath: selainPolku });

/**
 * Kaupungin ruutupiste LUETAAN AINA TUOREENA (sama syy kuin
 * savuke-kaupunkipopupissa): liuskan avaus ajaa kameran, joten vanha
 * piste osoittaa seuraavalla napautuksella väärään paikkaan.
 */
const kaupunkiPiste = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const k = l.kaupunki(tunnus);
  if (!k) return null;
  const p = l.pallo.getScreenCoords(k.lat, k.lon, 0);
  const r = l.kotelo.getBoundingClientRect();
  return p ? { x: r.left + p.x, y: r.top + p.y } : null;
}, id);

/**
 * KAMERA LÄHDÖN JA KOHTEEN VÄLIIN, annetulla näkyvällä leveydellä.
 *
 * `saavu` rajaa PELAAJAN MAAHAN (mitattu: Britannia, 200 lautayksikköä),
 * jolloin Pariisi jäi ruudun ulkopuolelle eikä napautettavaa ollut.
 * Rajaus tehdään siksi kahden kaupungin välistä. `kerroin` avaa
 * näkymän laajemmalle silloin, kun mittaus tarvitsee muitakin
 * kaupunkeja kuin heiton kohteet (vartio 2).
 */
const rajaa = (sivu, kerroin) => sivu.evaluate(async ({ lahto, kohde, k }) => {
  const { ui, game: g } = window.matkakirja;
  const a = g.board.cityById.get(lahto);
  const b = g.board.cityById.get(kohde);
  const matka = Math.hypot(b.x - a.x, b.y - a.y);
  await ui.kamera().ajaKamera(
    { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, leveys: Math.max(matka * k, 150) },
    { kesto: 0 },
  );
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 1400));
}, { lahto: LAHTO, kohde: KOHDE, k: kerroin });

/**
 * KAMERA KAUPUNGIN PÄÄLLE ENNEN NAPAUTUSTA.
 *
 * Ruudun laidoilla on kalusteita, jotka OTTAVAT NAPAUTUKSEN: mitattu
 * 390 px:llä (Amsterdam kuplapinon P.fact-textin alla) ja 1400 px:llä
 * (Pariisi jäi rajauksessa kaluste-elementin alle, eikä napautus
 * päässyt pallon pinnalle — `viimeinenNapautus` jäi nulliksi eikä
 * yhtään kamera-ajoa lähtenyt). Ruudun keskusta on vapaa kaikilla
 * ruuduilla, joten mittaus vie merkin sinne. Tämä ei ole osa väitettä
 * — väite on se, mitä NAPAUTUS merkkiin tekee.
 */
const keskita = (sivu, id) => sivu.evaluate(async (tunnus) => {
  const { ui, game: g } = window.matkakirja;
  const c = g.board.cityById.get(tunnus);
  await ui.kamera().ajaKamera({ x: c.x, y: c.y, leveys: 200 }, { kesto: 0 });
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 1400));
}, id);

/**
 * ENSIMMÄINEN EHDOKAS, JOLLA ON OIKEASTI PISTE PALLOLLA.
 *
 * Pisteetöntä kaupunkia ei voi napauttaa (js/pallolauta/lauta.js
 * `pisteNakyy`), ja PAATOKSET 43 kohta 8:n rajauksen jälkeen piste on
 * vain kohdemaalla, omalla kaupungilla ja heiton kohteilla — lisäksi
 * nimikerros karsii kaukaiset. Kamera viedään siksi kunkin ehdokkaan
 * päälle ja piste luetaan laudan omasta pistekerroksesta, samasta
 * lähteestä kuin peli piirtää. Palauttaa valitun tunnuksen tai null.
 */
async function valitseNakyva(sivu, ehdokkaat) {
  const katsotut = [];
  for (const id of ehdokkaat) {
    /* eslint-disable no-await-in-loop */
    await keskita(sivu, id);
    const on = await sivu.evaluate((tunnus) => {
      const l = window.matkakirja.ui.pallolauta;
      return (l.pallo.pointsData() ?? []).some((d) => d?.id === tunnus);
    }, id);
    katsotut.push(`${id}:${on ? 'piste' : 'ei pistettä'}`);
    if (on) return { id, katsotut };
    /* eslint-enable no-await-in-loop */
  }
  return { id: null, katsotut };
}

/*
 * KAUPUNGIN AVAUSKORTTI KORVAA LIUSKAN (omistaja 27.9.2026 klo 23.4x, PR
 * #3364, js/pallolauta/lauta.js KAUPUNKILIUSKA = false): kaupunkimerkin
 * napautus avaa nyt avauskortin (.kaupunkipopup-avaus). Vartioiden väite
 * on sama kuin ennen — ei-kohde ja oma kaupunki avaavat kaupungin oman
 * näkymän, kohdekaupunki aloittaa siirron eikä avaa sitä — joten "auki"
 * tarkoittaa liuskaa TAI avauskorttia sen mukaan, kumpi on käytössä.
 * Auki jäänyt kortti peitti ennen seuraavat napautukset (osuma
 * IMG.kulttuuri-kuva-nappi, main-savuke 36405304787), joten suljeLiuska
 * sulkee myös kortin.
 */
/** Kaupunkinäkymän tila yhtenä lukemana: liuska tai avauskortti ja DOMin rivit. */
const liuskanTila = (sivu) => sivu.evaluate(() => {
  const liuska = window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null;
  const kortti = Boolean(document.querySelector('.kaupunkipopup-avaus'));
  return {
    auki: liuska || kortti || (liuska === null ? null : false),
    kortti,
    rivit: document.querySelectorAll('.pallolauta-liuska-rivi').length,
  };
});

/** Sulkee liuskan kerroksesta (ei kartan napautuksella: `korttiOliAuki`). */
const suljeLiuska = (sivu) => sivu.evaluate(async () => {
  window.matkakirja.ui.pallolauta.nostot.suljeLiuska?.();
  window.matkakirja.ui.suljeKulttuuriKuva?.();
  (await import('/js/kaupunkinosto.js')).suljeKaupunkipopup(window.matkakirja.ui);
});

/** Nopanheitto ilman noppa-animaatiota: sama tila kuin heiton jälkeen. */
const heitaNoppa = (sivu, silma) => sivu.evaluate(async ({ s, lahto }) => {
  const { ui, game: g } = window.matkakirja;
  const { findMoves } = await import('./js/rules.js');
  clearTimeout(ui.automaattiheittoAjastin);
  ui.automaattiheittoAjastin = null;
  g.player.pos = { type: 'city', city: lahto };
  g.phase = 'action';
  g.autoTravel = false;
  if (!g.actionTravel('land').ok) return { ok: false, syy: 'ei maareittiä' };
  g.die = s;
  g.phase = 'move';
  g.moves = findMoves(g.board, g.player.pos, s, { mode: 'land' });
  ui.render();
  await new Promise((r) => setTimeout(r, 800));
  ui.pallolauta.ladoHeti?.();
  await new Promise((r) => setTimeout(r, 800));
  return {
    ok: true,
    kohteet: (g.moves ? [...g.moves.keys()] : []),
    merkkeja: ui.pallolauta.merkit.kohteet().length,
  };
}, { s: silma, lahto: LAHTO });

/**
 * Yksi ruutukoko: kolme napautusta ja niiden seuraukset.
 *
 * Järjestys on tarkka. Vartio 1 mitataan ENNEN noppaa (sen jälkeen
 * Pariisi on kohde), vartio 2 heiton jälkeen ei-kohteeseen ja vartiot
 * 3–5 vasta viimeisenä, koska siirto muuttaa pelaajan paikan.
 */
async function mittaa(ruutu) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h }, deviceScaleFactor: 2, serviceWorkers: 'block',
    isMobile: ruutu.w < 700, hasTouch: ruutu.w < 700,
  });
  await ctx.addInitScript((d) => {
    try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(5000);
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin); ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'pariisi' }; g.world.visited.add('pariisi');
    g.phase = 'action'; g.autoTravel = false; ui.render();
    await new Promise((r) => setTimeout(r, 4000));
  });
  // Saapumisesittely ja kortit pois kuvan edestä.
  for (let i = 0; i < 3; i += 1) { await sivu.keyboard.press('Escape'); await sivu.waitForTimeout(400); }
  await sivu.evaluate(async () => {
    document.querySelectorAll('dialog[open]').forEach((d) => d.close?.());
    try { (await import('/js/kaupunkinosto.js')).suljeKaupunkipopup(window.matkakirja.ui); } catch { /* */ }
    document.querySelectorAll('.kaupunkiesittely, .saapumisesittely, [class*="esittely"]').forEach((e) => { e.style.display = 'none'; });
  });
  await sivu.waitForTimeout(800);
  const saapuminen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  // Loitonnus pyytämällä kaukaa (rulla ei liiku headless-puhelimessa): lauta rajaa katon.
  for (let i = 0; i < 3; i += 1) {
    await sivu.evaluate(() => { const p = window.matkakirja.ui.pallolauta.pallo; const c = p.controls?.(); const R = p.getGlobeRadius?.() ?? 100; const pov = p.pointOfView(); p.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: c ? (c.maxDistance / R) - 1 : 5 }, 0); });
    await sivu.waitForTimeout(800);
  }
  const tulos = await sivu.evaluate(() => {
    const p = window.matkakirja.ui.pallolauta.pallo;
    const pov = p.pointOfView();
    const ruutu = (lat, lng) => { const s = p.getScreenCoords?.(lat, lng, 0); return s ? { x: Math.round(s.x), y: Math.round(s.y) } : null; };
    // Ranskan manner: Brestin länsikärki, Strasbourgin itäraja, pohjoinen Dunkerque, etelä Perpignan.
    const c = p.controls?.(); const R = p.getGlobeRadius?.() ?? 100;
    return { maxKorkeus: c ? +((c.maxDistance / R) - 1).toFixed(3) : null, korkeus: +pov.altitude.toFixed(3), lansi: ruutu(48.39, -4.49), ita: ruutu(48.97, 8.23), pohjoinen: ruutu(51.03, 2.37), etela: ruutu(42.43, 2.9), leveys: innerWidth, kork: innerHeight };
  });
  const nakyy = (q) => q && q.x >= 0 && q.x <= tulos.leveys && q.y >= 0 && q.y <= tulos.kork;
  console.log(`${ruutu.nimi}: saapuminen ${saapuminen.altitude.toFixed(3)}, korkeus rullan jälkeen ${tulos.korkeus}, maxDistance-katto ${tulos.maxKorkeus}; Brest ${JSON.stringify(tulos.lansi)} ${nakyy(tulos.lansi) ? 'NÄKYY' : 'ULKONA'}, Strasbourg ${JSON.stringify(tulos.ita)} ${nakyy(tulos.ita) ? 'NÄKYY' : 'ULKONA'}, pohjoinen ${nakyy(tulos.pohjoinen) ? 'NÄKYY' : 'ULKONA'}, etelä ${nakyy(tulos.etela) ? 'NÄKYY' : 'ULKONA'}`);
  if (process.env.ULOS) await sivu.screenshot({ path: join(process.env.ULOS, `maan-loitonnus-${ruutu.nimi}.png`) });
  await ctx.close();
}

for (const ruutu of [{ nimi: '390', w: 390, h: 844 }, { nimi: '1400', w: 1400, h: 900 }]) await mittaa(ruutu);
await selain.close();
palvelin.close();
