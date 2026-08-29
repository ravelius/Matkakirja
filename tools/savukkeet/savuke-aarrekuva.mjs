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
 *  5. Pääaarre (star) on tummassa mallissa ILMAN diplomin ulkoasua,
 *     mutta luettelon TEKSTIT ovat mukana ja näkyvissä: otsake, manner,
 *     arvo ja LÖYDETTY-leima (omistajan tilaus 28.8.2026 ilta).
 * Kaappaukset: aarrekuva-fin-pieni.png, aarrekuva-dnk-iso.png ja
 * aarrekuva-star-tumma.png.
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
  const { REVEAL_SUB } = await import('./js/ui-apurit.js');
  const { arvoAarteenArvo } = await import('./js/tokens.js');
  const peli = new Game({
    players: [{ name: 'Savuke', color: '#f00', start: null }],
    pack: packById('europe'),
    seed: 12,
  });
  const token = peli.aarreTyyppi(type, city);
  document.querySelector('.reveal-overlay')?.remove();
  // Sama mallivalinta kuin playTokenReveal (28.8.2026 ilta): maan oma
  // paikalliskuva saa vinjetointimallin, kaikki muut — pääaarre mukaan
  // lukien — tumman. Diplomi jäi koodiin, muttei enää käyttöön.
  const malli = token.kuva?.startsWith('assets/aarteet/paikallis/')
    ? 'paikallis' : 'tumma';
  // Luettelon tekstit kuuluvat pääaarteelle myös tummassa mallissa
  // (omistajan tilaus 28.8.2026 ilta) — sama `lisat` kuin pelissä.
  const lisat = type === 'star' ? {
    otsake: 'Aarnin luettelo',
    alaotsake: 'EUROOPPA · UNOHDETTU AARRE',
    alanauha: 'Arvo 2000 puntaa',
    leima: 'Löydetty',
    leimaPvm: '28 · VIII',
  } : {};
  // rakennaPaljastus ei käytä this:iä — kortin saa siksi pelin omalla
  // metodilla ilman koko UI:n käynnistämistä.
  const {
    overlay, kuvaEl, caption, pohja, leima, jatka,
  } = UI.prototype.rakennaPaljastus(token.kuva, token.name, malli, lisat);
  caption.appendChild(Object.assign(document.createElement('strong'), {
    textContent: token.name,
  }));
  // Sama selite kuin playTokenReveal ladoo: pääaarteella oma rivinsä,
  // muilla löytöhetken arvo. Kaappaus näyttää siten koko kortin.
  caption.appendChild(Object.assign(document.createElement('span'), {
    textContent: REVEAL_SUB[type] ?? `+${arvoAarteenArvo(type, () => 0.5)} puntaa`,
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
  // leima lyödään erikseen. Kirkastuminen on vain diplomin.
  pohja.classList.add('shown');
  kuvaEl?.classList.add('shown');
  caption.classList.add('shown');
  leima?.classList.add('lyoty');
  // Jatka matkaa -nappi kuuluu valmiiseen korttiin (odotaPaljastuksenSulku
  // lisää saman luokan pelissä) — kaappaus näyttää siten lopputilan.
  jatka.classList.add('nakyy');
  if (malli === 'diplomi') overlay.classList.add('kirkas');
  await new Promise((v) => setTimeout(v, 1600));
  const yha = document.querySelector('.reveal-aarrekuva');
  const kehys = document.querySelector('.reveal-kehys');
  const leimaEl = document.querySelector('.reveal-leima');
  const nakyy = (el) => !!el && getComputedStyle(el).opacity > 0.05;
  const teksti = (valitsin) => document.querySelector(valitsin)?.textContent ?? null;
  return {
    nimi: token.name,
    kuva: token.kuva,
    fakta: token.fakta ?? null,
    ladattu: !!yha && yha.naturalWidth > 0,
    leveys: yha?.naturalWidth ?? 0,
    malli,
    kehysLadattu: !!kehys && kehys.naturalWidth > 0,
    leimaNakyy: !!leimaEl,
    // Tumman mallin luettelotekstit: teksti JA se, että ne ovat
    // oikeasti näkyvissä (läpinäkyvä rivi olisi sama kuin puuttuva).
    otsake: teksti('.reveal-tunnus-otsake'),
    alaotsake: teksti('.reveal-tunnus-alaotsake'),
    arvo: teksti('.reveal-arvo'),
    leimaTeksti: leimaEl?.textContent ?? null,
    tunnusNakyy: nakyy(document.querySelector('.reveal-tunnus')),
    jalkaNakyy: nakyy(document.querySelector('.reveal-loyto')),
    leimaLyoty: nakyy(leimaEl),
    // Vaalean diplomin jäljet: näitä EI saa olla tummalla kortilla.
    plansiNakyy: !!document.querySelector('.reveal-plansi'),
    kirkas: overlay.classList.contains('kirkas'),
  };
}, [kaupunki, tyyppi]);

/*
 * SUOMEN PARI SEURAA HELSINGIN KAANONTEKSTEJÄ (v1320): pieni aarre
 * on tervatynnyrin pohjalta löytynyt hopeariksi ja iso Ivalojoen
 * kultahippu, samat esineet jotka isoisän merkintä ja aarremerkintä
 * nimeävät (js/packs/paikallisaarteet.js FIN).
 *
 * MAAN OMA KUVA ON NYT OLEMASSA (v1333): v1320:ssa fin-*.jpg esitti
 * vielä edellistä paria (mustikkakori ja Sammon siru), joten kuvakenttä
 * oli tyhjä ja peli näytti laudan oman aarrekuvan; tämä vartio mittasi
 * silloin sitä välitilaa. Kuvat on generoitu uusiksi nimien mukaisiksi,
 * joten väite on käännetty: kuva on maan oma, kuten muillakin 29
 * maalla.
 */
const fin = await paljasta('helsinki', 'pieniAarre');
vaadi('FIN pieni: nimi on maan oma', /hopeariksi/i.test(fin.nimi ?? ''), fin.nimi);
vaadi('FIN pieni: kuva on maan oma',
  fin.kuva === 'assets/aarteet/paikallis/fin-pieni.jpg', fin.kuva);
vaadi('FIN pieni: kuva latautui', fin.ladattu, `leveys ${fin.leveys}`);
vaadi('FIN pieni: fakta tuli mukaan', (fin.fakta ?? '').includes('Terva'), fin.fakta);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-fin-pieni.png') });

const dnk = await paljasta('kobenhavn', 'isoAarre');
vaadi('DNK iso: kuva on maan oma', dnk.kuva === 'assets/aarteet/paikallis/dnk-iso.jpg', dnk.kuva);
vaadi('DNK iso: kuva latautui', dnk.ladattu && dnk.leveys === 640, `leveys ${dnk.leveys}`);
vaadi('DNK iso: nimi on kultasarvet', /sarve/i.test(dnk.nimi), dnk.nimi);
vaadi('DNK iso: vinjetointimalli', dnk.malli === 'paikallis', dnk.malli);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-dnk-iso.png') });

/*
 * PÄÄAARRE ON TUMMASSA MALLISSA, MUTTA TEKSTIT MUKANA (omistaja
 * 28.8.2026 ilta: *"yksinkertainen tumma tausta jatkamaan esineen
 * tummaa taustaa on paras"* ja *"laita kaikki tekstit mukaan tuohon
 * aarteen esikatseluun"*). Kaksi vartiosarjaa siis samasta kortista:
 *  - diplomin ULKOASUA ei saa olla (kaiverruskehys, pergamenttiarkki,
 *    vaaleneva pohja) — kuvan tumman taustan on jatkuttava overlayhin;
 *  - luettelon TEKSTIEN on oltava paikallaan ja näkyvissä (otsake,
 *    manner, arvo, LÖYDETTY-leima roomalaisine kuukausineen).
 */
const tahti = await paljasta('ateena', 'star');
vaadi('star: tumma malli', tahti.malli === 'tumma', tahti.malli);
vaadi('star: ei diplomin kaiverruskehystä', !tahti.kehysLadattu);
vaadi('star: ei pergamenttiarkkia', !tahti.plansiNakyy);
vaadi('star: pohja ei vaalene', !tahti.kirkas);
vaadi('star: aarrekuva latautui', tahti.ladattu, tahti.kuva);
vaadi('star: kuva on laudan pääaarrekuva',
  /assets\/aarteet\/aarre-europe-star\.jpg$/.test(tahti.kuva ?? ''), tahti.kuva);
vaadi('star: otsake on Aarnin luettelo', tahti.otsake === 'Aarnin luettelo', tahti.otsake);
vaadi('star: alaotsake on manner ja unohdettu aarre',
  tahti.alaotsake === 'EUROOPPA · UNOHDETTU AARRE', tahti.alaotsake);
vaadi('star: nimiö on näkyvissä', tahti.tunnusNakyy);
vaadi('star: arvorivi on STAR_PRIZE', tahti.arvo === 'Arvo 2000 puntaa', tahti.arvo);
vaadi('star: jalka on näkyvissä', tahti.jalkaNakyy);
vaadi('star: LÖYDETTY-leima roomalaisin kuukausin',
  /^Löydetty\d+ · [IVX]+$/.test(tahti.leimaTeksti ?? ''), tahti.leimaTeksti);
vaadi('star: leima on lyöty näkyviin', tahti.leimaLyoty);
await sivu.screenshot({ path: join(KAAPPAUKSET, 'aarrekuva-star-tumma.png') });

/*
 * Luettelon nimiö on VAIN pääaarteella: mantereen aarre ja
 * paikallisaarteet eivät ole Aarnin luettelossa (kaanoni).
 */
vaadi('FIN pieni: ei luettelon nimiötä', fin.otsake === null, fin.otsake);
vaadi('DNK iso: ei luettelon nimiötä', dnk.otsake === null, dnk.otsake);
vaadi('DNK iso: ei LÖYDETTY-leimaa', !dnk.leimaNakyy);

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
