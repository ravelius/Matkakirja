/*
 * Savuke: YLÄPALKKI PIILOSSA VAAKAPUHELIMELLA JA IPADILLA, VÄKÄSNAPPI
 * KARTALLA.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Kännykän vaakanäkymässä
 * yläpalkin voisi piilottaa niin että vain kolme päällekköistä väkästä
 * näkyy kartalla oik. yläreunassa ja sitä painamalla Yläpalkki tulee
 * näkyviin väliaikaisesti muun sisällön päälle mutta katoaa heti kun
 * pelaaja klikkaa jotain kohtaa palkin ulkopuolelta. Jotta väkäset
 * mahtuvat ruudulle, pitää kartta selite nappia siirtää hieman
 * vasemmalle. Uusi nappi saisi olla saman korkuinen kuin kartta
 * selite."*
 *
 * MITÄ TÄMÄ MITTAA, jota yksikkötesti ei näe: oikean selaimen
 * asettelun. Napin ja karttaselitteen TODELLISET kehysmitat, se ettei
 * ne mene päällekkäin eivätkä ulos ruudulta, palkin todellinen
 * näkyvyys ja se, että napautus kartalla sulkee sen.
 *
 * LAAJENNUS IPADIIN 18.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
 * 43 kohta 9; omistaja sanatarkasti: *"Ylapalkin voisi piilottaa myos
 * ipadilla niin kuin iphonella on."*). Neljä ruutua: vaakapuhelin
 * 844 × 390, pystypuhelin 390 × 844, iPad 1024 × 1366 ja 1366 × 1024
 * kosketuksella sekä työpöytä 1400 × 900 hiirellä. Kaksi viimeistä
 * ovat vastinpari: iPadilla säännön on osuttava KOSKETUSEHDOSTA (ei
 * matalasta ruudusta) ja työpöydällä ei kummastakaan.
 *
 * VASTAKOE kuuluu ajoon: säännöt riisutaan ja mitataan uudelleen. Jos
 * mittari näyttää vihreää ilman niitä, se ei mittaa mitään.
 *
 *   node tools/savukkeet/savuke-ylapalkki-vaaka.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
/** Kuvakansio (valinnainen): kaappaukset iPadin kummastakin suunnasta. */
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
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

/** Vaakapuhelin: iPhone-luokan ruutu kyljellään (korkeus alle 520 px). */
const VAAKA = { width: 844, height: 390 };
/** Pysty: sama laite toisin päin — palkin pitää olla siinä ennallaan. */
const PYSTY = { width: 390, height: 844 };
/*
 * IPAD MOLEMMISSA SUUNNISSA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 43
 * kohta 9; omistaja 18.9.2026: *"Ylapalkin voisi piilottaa myos
 * ipadilla niin kuin iphonella on."*). iPad Pro 12,9" on rajan uloin
 * laite (1366 px vaakasuunnassa), joten se on se, joka mitataan.
 * `hasTouch` on se, mikä tekee ruudusta `pointer: coarse` -laitteen —
 * ilman sitä sama ruutu on hiiriruutu eikä osu sääntöön.
 */
const IPAD_PYSTY = { width: 1024, height: 1366 };
const IPAD_VAAKA = { width: 1366, height: 1024 };
/** Työpöytä hiirellä: säännön on jätettävä tämä täsmälleen ennalleen. */
const TYOPOYTA = { width: 1400, height: 900 };

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/** Avaa pelin karttanäkymään annetulla ruudulla (`kosketus` = iPad). */
async function avaaPeli(viewport, { kosketus = false } = {}) {
  const ctx = await selain.newContext({ viewport, hasTouch: kosketus, serviceWorkers: 'block' });
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
  return { ctx, sivu, virheet };
}

/*
 * Napin, selitteen ja palkin todelliset mitat samasta hetkestä.
 *
 * KARTTASELITE ON PIILOSSA ALOITUSNÄKYMÄSSÄ (js/karttaselite.js
 * paivita: `kotelo.hidden` pickstartissa), joten sen kehys on siellä
 * nolla. Asettelun mittaamiseksi se paljastetaan hetkeksi — mitattava
 * asia on CSS:n sijoittelu, ei pelin vaihe. Väkäsnappi sen sijaan ei
 * saa koskaan piiloutua: vaakanäkymässä se on ainoa tie valikkoon.
 */
const MITAT = `() => {
  const kotelo = document.querySelector('.karttaselite');
  const oliPiilossa = kotelo?.hidden ?? false;
  if (kotelo) kotelo.hidden = false;
  const kehys = (v) => (v ? (({x, y, width, height}) =>
    ({x, y, width, height}))(v.getBoundingClientRect()) : null);
  const nappi = document.querySelector('.ylapalkki-nappi');
  // Mitataan NAPPI eikä kotelo: kotelo on position:absolute ja sen
  // sisältö on nappi + absoluuttinen levy, joten kotelon oma kehys
  // voi jäädä nollaksi. Pelaaja näkee ja osuu nappiin.
  const selite = document.querySelector('.karttaselite-nappi');
  const palkki = document.querySelector('.topbar');
  const tyyli = palkki ? getComputedStyle(palkki) : null;
  const mitat = {
    nappi: kehys(nappi),
    nappiNakyy: Boolean(nappi && nappi.offsetParent),
    selite: kehys(selite),
    palkki: kehys(palkki),
    palkkiNakyvyys: tyyli?.visibility ?? null,
    palkkiAuki: document.body.classList.contains('ylapalkki-auki'),
    leveys: window.innerWidth,
    korkeus: window.innerHeight,
    seliteOliPiilossa: oliPiilossa,
    // Kumpi ehto sääntölohkosta osui: matala ruutu vai kosketus-iPad.
    matalaRuutu: matchMedia('(max-height: 520px)').matches,
    kosketusIpad: matchMedia('(pointer: coarse) and (min-width: 700px) and (max-width: 1366px)').matches,
  };
  if (kotelo) kotelo.hidden = oliPiilossa;
  return mitat;
}`;

/* ── 1. VAAKA: nappi näkyy, palkki piilossa ────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(VAAKA);
  vaadi('vaaka: sivu latautui ilman poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));

  const alku = await sivu.evaluate(`(${MITAT})()`);
  vaadi('vaaka: väkäsnappi näkyy kartalla', alku.nappiNakyy, JSON.stringify(alku.nappi));
  vaadi('vaaka: yläpalkki on piilossa aluksi',
    alku.palkkiNakyvyys === 'hidden', `visibility=${alku.palkkiNakyvyys}`);

  // Sama korkeus kuin karttaselitteellä — omistajan nimenomainen ehto.
  const ero = alku.nappi && alku.selite
    ? Math.abs(alku.nappi.height - alku.selite.height) : null;
  vaadi('vaaka: nappi on karttaselitteen korkuinen', ero !== null && ero < 1,
    JSON.stringify({ nappi: alku.nappi?.height, selite: alku.selite?.height }));

  // Selite väistyi vasemmalle eivätkä napit ole päällekkäin.
  const rako = alku.nappi && alku.selite
    ? alku.nappi.x - (alku.selite.x + alku.selite.width) : null;
  vaadi('vaaka: karttaselite on napin vasemmalla puolella', rako !== null && rako >= 0,
    JSON.stringify({ rako, selite: alku.selite, nappi: alku.nappi }));
  vaadi('vaaka: molemmat mahtuvat ruudulle',
    alku.nappi && alku.nappi.x + alku.nappi.width <= alku.leveys + 0.5
      && alku.selite && alku.selite.x >= -0.5,
    JSON.stringify({ leveys: alku.leveys, nappi: alku.nappi, selite: alku.selite }));

  /* ── napista palkki näkyviin ── */
  await sivu.click('.ylapalkki-nappi');
  await sivu.waitForTimeout(400);
  const auki = await sivu.evaluate(`(${MITAT})()`);
  vaadi('vaaka: nappi avaa palkin', auki.palkkiNakyvyys === 'visible' && auki.palkkiAuki,
    JSON.stringify({ nakyvyys: auki.palkkiNakyvyys, auki: auki.palkkiAuki }));
  vaadi('vaaka: avattu palkki on ruudun yläreunassa sisällön päällä',
    auki.palkki && auki.palkki.y >= -0.5 && auki.palkki.y < 8 && auki.palkki.height > 20,
    JSON.stringify(auki.palkki));

  /* ── napautus palkin ulkopuolelta sulkee ── */
  await sivu.mouse.click(Math.round(VAAKA.width / 2), Math.round(VAAKA.height - 40));
  await sivu.waitForTimeout(400);
  const kiinni = await sivu.evaluate(`(${MITAT})()`);
  vaadi('vaaka: napautus palkin ulkopuolelta sulkee sen',
    kiinni.palkkiNakyvyys === 'hidden' && !kiinni.palkkiAuki,
    JSON.stringify({ nakyvyys: kiinni.palkkiNakyvyys, auki: kiinni.palkkiAuki }));

  /* ── napautus palkin SISÄLTÄ ei sulje ── */
  await sivu.click('.ylapalkki-nappi');
  await sivu.waitForTimeout(400);
  const palkki = await sivu.evaluate(`(${MITAT})()`);
  await sivu.mouse.click(
    Math.round(palkki.palkki.x + palkki.palkki.width / 2),
    Math.round(palkki.palkki.y + palkki.palkki.height / 2),
  );
  await sivu.waitForTimeout(400);
  const yha = await sivu.evaluate(`(${MITAT})()`);
  vaadi('vaaka: napautus palkin sisältä EI sulje sitä', yha.palkkiAuki,
    JSON.stringify({ auki: yha.palkkiAuki }));

  /*
   * Nappi ei saa kadota silloinkaan kun karttaselite on piilossa:
   * vaakanäkymässä se on ainoa tie valikkoon, rahoihin ja päivään.
   */
  vaadi('vaaka: väkäsnappi näkyy myös aloitusnäkymässä, jossa selite on piilossa',
    alku.nappiNakyy && alku.seliteOliPiilossa,
    JSON.stringify({ nappi: alku.nappiNakyy, selitePiilossa: alku.seliteOliPiilossa }));

  vaadi('vaaka: ei poikkeuksia ajon aikana', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 2. PYSTY: mikään ei muuttunut ─────────────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(PYSTY);
  const p = await sivu.evaluate(`(${MITAT})()`);
  vaadi('pysty: yläpalkki näkyy normaalisti',
    p.palkkiNakyvyys === 'visible' && p.palkki && p.palkki.height > 20,
    JSON.stringify({ nakyvyys: p.palkkiNakyvyys, palkki: p.palkki }));
  vaadi('pysty: väkäsnappi on piilossa', !p.nappiNakyy, JSON.stringify(p.nappi));
  vaadi('pysty: karttaselite on ennallaan oikeassa reunassa',
    p.selite && p.selite.x + p.selite.width > p.leveys - 40,
    JSON.stringify({ leveys: p.leveys, selite: p.selite }));
  vaadi('pysty: ei poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 3. IPAD, MOLEMMAT SUUNNAT: sama nappi, sama sulkusääntö ────────
 *
 * (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 43 kohta 9.) Ehto ei ole enää
 * ruudun korkeus vaan laitelaatu ja leveys, joten vartio mittaa
 * MOLEMMAT: että sääntö osuu oikeasta syystä (`kosketusIpad`, ei
 * `matalaRuutu`) ja että asettelu on sama kuin vaakapuhelimella.
 */
for (const [nimi, ruutu] of [['iPad pysty', IPAD_PYSTY], ['iPad vaaka', IPAD_VAAKA]]) {
  const { ctx, sivu, virheet } = await avaaPeli(ruutu, { kosketus: true });
  const alku = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: sääntö osuu kosketusehdosta eikä matalasta ruudusta`,
    alku.kosketusIpad && !alku.matalaRuutu,
    JSON.stringify({ kosketus: alku.kosketusIpad, matala: alku.matalaRuutu, korkeus: alku.korkeus }));
  vaadi(`${nimi}: yläpalkki on piilossa`, alku.palkkiNakyvyys === 'hidden',
    `visibility=${alku.palkkiNakyvyys}`);
  vaadi(`${nimi}: väkäsnappi näkyy kartalla`, alku.nappiNakyy, JSON.stringify(alku.nappi));

  // Nappi ei saa peittää kartan oikean yläkulman muita nappeja:
  // karttaselite on ainoa naapuri ja se väistyy vasemmalle.
  const rako = alku.nappi && alku.selite
    ? alku.nappi.x - (alku.selite.x + alku.selite.width) : null;
  vaadi(`${nimi}: karttaselite väistyy napin vasemmalle puolelle`,
    rako !== null && rako >= 0, JSON.stringify({ rako, selite: alku.selite, nappi: alku.nappi }));
  vaadi(`${nimi}: molemmat mahtuvat ruudulle`,
    alku.nappi && alku.nappi.x + alku.nappi.width <= alku.leveys + 0.5
      && alku.selite && alku.selite.x >= -0.5,
    JSON.stringify({ leveys: alku.leveys, nappi: alku.nappi, selite: alku.selite }));

  await sivu.click('.ylapalkki-nappi');
  await sivu.waitForTimeout(400);
  const auki = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: nappi avaa palkin sisällön päälle`,
    auki.palkkiNakyvyys === 'visible' && auki.palkkiAuki
      && auki.palkki && auki.palkki.y >= -0.5 && auki.palkki.y < 8,
    JSON.stringify({ nakyvyys: auki.palkkiNakyvyys, palkki: auki.palkki }));
  if (KUVAKANSIO) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `ylapalkki-${nimi.replace(/\s+/g, '-').toLowerCase()}-auki.png`),
    });
  }

  await sivu.mouse.click(Math.round(ruutu.width / 2), Math.round(ruutu.height - 60));
  await sivu.waitForTimeout(400);
  const kiinni = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: napautus palkin ulkopuolelta sulkee sen`,
    kiinni.palkkiNakyvyys === 'hidden' && !kiinni.palkkiAuki,
    JSON.stringify({ nakyvyys: kiinni.palkkiNakyvyys, auki: kiinni.palkkiAuki }));
  if (KUVAKANSIO) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `ylapalkki-${nimi.replace(/\s+/g, '-').toLowerCase()}-kiinni.png`),
    });
  }
  vaadi(`${nimi}: ei poikkeuksia`, virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 4. TYÖPÖYTÄ HIIRELLÄ: ei saa muuttua ──────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(TYOPOYTA);
  const t = await sivu.evaluate(`(${MITAT})()`);
  vaadi('työpöytä 1400 × 900: kumpikaan sääntöehto ei osu',
    !t.matalaRuutu && !t.kosketusIpad,
    JSON.stringify({ matala: t.matalaRuutu, kosketus: t.kosketusIpad }));
  vaadi('työpöytä 1400 × 900: yläpalkki näkyy',
    t.palkkiNakyvyys === 'visible' && t.palkki && t.palkki.height > 20,
    JSON.stringify({ nakyvyys: t.palkkiNakyvyys, palkki: t.palkki }));
  vaadi('työpöytä 1400 × 900: väkäsnappi on piilossa', !t.nappiNakyy, JSON.stringify(t.nappi));
  vaadi('työpöytä 1400 × 900: karttaselite on ennallaan oikeassa reunassa',
    t.selite && t.selite.x + t.selite.width > t.leveys - 40,
    JSON.stringify({ leveys: t.leveys, selite: t.selite }));
  vaadi('työpöytä 1400 × 900: ei poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
