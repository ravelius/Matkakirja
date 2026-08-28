/*
 * Savuke: MAAN OMA AARREKUVA PALJASTUSKORTILLA (28.8.2026).
 *
 * Euroopan 58 paikallisaarteella on oma kuva (js/packs/paikallisaarteet.js
 * kuva-kenttä, assets/aarteet/paikallis/). Yksikkötestit vahtivat polkuja;
 * tämä savuke vahtii sen, mitä testi ei näe — että kuva todella latautuu
 * selaimessa ja päätyy pelin omalle paljastuskortille oikean nimen kanssa.
 * Vartiot:
 *  1. game.aarreTyyppi antaa Helsingissä Suomen oman parin: nimi, fakta JA
 *     kuva samasta rivistä — maan kuva voittaa laudan yleiskuvan.
 *  2. Sama isolle aarteelle Kööpenhaminassa (Gallehusin kultasarvet).
 *  3. Kortti rakennetaan pelin omalla UI.prototype.rakennaPaljastus-
 *     metodilla, ja kuva latautuu oikeasti (naturalWidth > 0) — rikkinäinen
 *     polku putoaisi tässä, sillä pelin oma virhepolku poistaa kuvan.
 *  4. Kirjoittamaton manner ei saa maan kuvaa vaan laudan oman (Tanger).
 * Kaappaukset: aarrekuva-fin-pieni.png ja aarrekuva-dnk-iso.png.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

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
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const pyydetty = req.url.split('?')[0];
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
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await selain.newPage({ viewport: { width: 900, height: 900 } });
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });

/** Yksi paljastuskortti pelin omalla koodilla; palauttaa mitatut tiedot. */
const paljasta = (kaupunki, tyyppi) => sivu.evaluate(async ([city, type]) => {
  const { Game } = await import('./js/game.js');
  const { packById } = await import('./js/pack.js');
  const { UI } = await import('./js/ui.js');
  const peli = new Game({
    players: [{ name: 'Savuke', color: '#f00', start: null }],
    pack: packById('europe'),
    seed: 12,
  });
  const token = peli.aarreTyyppi(type, city);
  document.querySelector('.reveal-overlay')?.remove();
  // Sama mallivalinta kuin playTokenReveal (28.8.2026): pääaarre saa
  // diplomin, maan oma paikalliskuva vinjetointimallin, muut tumman.
  const malli = type === 'star' ? 'diplomi'
    : (token.kuva?.startsWith('assets/aarteet/paikallis/') ? 'paikallis' : 'tumma');
  const lisat = malli === 'diplomi' ? {
    otsake: 'Aarnin luettelo',
    alaotsake: 'EUROOPPA · UNOHDETTU AARRE',
    alanauha: 'Arvo 2000 puntaa',
    leima: 'Löydetty',
    leimaPvm: '28 · VIII',
  } : {};
  // rakennaPaljastus ei käytä this:iä — kortin saa siksi pelin omalla
  // metodilla ilman koko UI:n käynnistämistä.
  const {
    overlay, kuvaEl, caption, pohja, leima,
  } = UI.prototype.rakennaPaljastus(token.kuva, token.name, malli, lisat);
  caption.appendChild(Object.assign(document.createElement('strong'), {
    textContent: token.name,
  }));
  if (token.fakta) {
    const p = document.createElement('p');
    p.className = 'reveal-fakta';
    p.textContent = token.fakta;
    caption.appendChild(p);
  }
  document.body.appendChild(overlay);
  if (kuvaEl) {
    await new Promise((valmis) => {
      if (kuvaEl.complete) { valmis(); return; }
      kuvaEl.addEventListener('load', valmis, { once: true });
      kuvaEl.addEventListener('error', valmis, { once: true });
      setTimeout(valmis, 4000);
    });
  }
  // Sama kahva kuin playTokenReveal: .shown tuo kuvan ja tekstin esiin;
  // diplomilla myös leima lyödään ja pohja kirkastuu lopputilaansa.
  pohja.classList.add('shown');
  kuvaEl?.classList.add('shown');
  caption.classList.add('shown');
  leima?.classList.add('lyoty');
  if (malli === 'diplomi') overlay.classList.add('kirkas');
  await new Promise((v) => setTimeout(v, 1600));
  const yha = document.querySelector('.reveal-aarrekuva');
  const kehys = document.querySelector('.reveal-kehys');
  return {
    nimi: token.name,
    kuva: token.kuva,
    fakta: token.fakta ?? null,
    ladattu: !!yha && yha.naturalWidth > 0,
    leveys: yha?.naturalWidth ?? 0,
    malli,
    kehysLadattu: !!kehys && kehys.naturalWidth > 0,
    leimaNakyy: !!document.querySelector('.reveal-leima'),
  };
}, [kaupunki, tyyppi]);

const fin = await paljasta('helsinki', 'pieniAarre');
vaadi('FIN pieni: nimi on maan oma', fin.nimi === 'Korillinen mustikoita', fin.nimi);
vaadi('FIN pieni: kuva on maan oma', fin.kuva === 'assets/aarteet/paikallis/fin-pieni.jpg', fin.kuva);
vaadi('FIN pieni: kuva latautui', fin.ladattu && fin.leveys === 640, `leveys ${fin.leveys}`);
vaadi('FIN pieni: fakta tuli mukaan', (fin.fakta ?? '').includes('mustikka'), fin.fakta);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-fin-pieni.png') });

const dnk = await paljasta('kobenhavn', 'isoAarre');
vaadi('DNK iso: kuva on maan oma', dnk.kuva === 'assets/aarteet/paikallis/dnk-iso.jpg', dnk.kuva);
vaadi('DNK iso: kuva latautui', dnk.ladattu && dnk.leveys === 640, `leveys ${dnk.leveys}`);
vaadi('DNK iso: nimi on kultasarvet', /sarve/i.test(dnk.nimi), dnk.nimi);
vaadi('DNK iso: vinjetointimalli', dnk.malli === 'paikallis', dnk.malli);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-dnk-iso.png') });

// Pääaarre: Aarnin luettelon diplomi kehyksineen ja leimoineen
// (leiskapäätökset 28.8.2026 — diplomi VAIN pääaarteille).
const tahti = await paljasta('ateena', 'star');
vaadi('star: diplomimalli', tahti.malli === 'diplomi', tahti.malli);
vaadi('star: kaiverruskehys latautui', tahti.kehysLadattu, 'aarnin-luettelo-kehys.jpg');
vaadi('star: LÖYDETTY-leima kortilla', tahti.leimaNakyy);
vaadi('star: aarrekuva latautui', tahti.ladattu, tahti.kuva);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-star-diplomi.png') });

// Kirjoittamaton manner: kuva jää laudan omaksi (Afrikka, Tanger).
const mar = await sivu.evaluate(async () => {
  const { Game } = await import('./js/game.js');
  const { packById } = await import('./js/pack.js');
  const peli = new Game({
    players: [{ name: 'Savuke', color: '#f00', start: null }],
    pack: packById('africa'),
    seed: 12,
  });
  return peli.aarreTyyppi('pieniAarre', 'tanger').kuva;
});
vaadi('kirjoittamaton maa saa yhä laudan kuvan', mar === 'assets/aarteet/aarre-africa-topaz.jpg', mar);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
