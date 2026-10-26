/*
 * Savuke: VAAKATILASSA EI YLÄPALKKIA — KARTAN HAMPURILAINEN AVAA
 * PÄÄVALIKON SUORAAN NAPIN PÄÄLLE.
 *
 * OMISTAJAN PÄÄTÖS 2.10.2026 klo 23.07 ja 23.08, sanatarkasti: *"tajusin
 * että vaakatilassa ei tarvita koko yläpalkkia. nappi voisi avata suoraan
 * valikon napin päälle, koska valikossa näkyy nyt kaikki tarvittavat
 * tiedot. eli poista palkki kokonaan ja avaa valikko suoraan napin päälle"*
 * ja *"väkäshampurilaisen voi vaihtaa samalla normaaliksi
 * hampurilaiseksi"*.
 *
 * KUMOAA omistajan 13.9.2026 tilauksen (väkäsnappi toi yläpalkin
 * väliaikaisesti näkyviin muun sisällön päälle). Nyt vaaka-asennossa
 * (matala ruutu TAI vaaka-iPad kosketuksella) yläpalkkia ei ole eikä sitä
 * voi avata; kartan oikean yläkulman nappi on tavallinen hampurilainen
 * (yksi polku, kolme suoraa viivaa) ja sen napautus avaa #paavalikko-
 * paneelin napin päälle: paneelin oikea yläkulma on napin oikea yläkulma
 * (±2 px). Valikko sulkeutuu napautuksesta sen ulkopuolelta (kartalle) ja
 * Escistä; napautus valikon sisältä ei sulje sitä.
 *
 * MITÄ TÄMÄ MITTAA, jota yksikkötesti ei näe: oikean selaimen
 * asettelun. Napin ja karttaselitteen TODELLISET kehysmitat, se ettei
 * ne mene päällekkäin eivätkä ulos ruudulta, palkin todellinen
 * piilossaolo (aluksi ja napin painalluksen jälkeen), valikon todellinen
 * sijainti napin päällä sekä avaus ja sulku.
 *
 * LAAJENNUS IPADIIN 18.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
 * 43 kohta 9; omistaja sanatarkasti: *"Ylapalkin voisi piilottaa myos
 * ipadilla niin kuin iphonella on."*). Ruudut: vaakapuhelin
 * 844 × 390, pystypuhelin 390 × 844, iPad 1194 × 834 ja 1366 × 1024
 * kosketuksella (sekä pysty 834 × 1194) sekä työpöytä 1400 × 900 hiirellä.
 * iPadilla säännön on osuttava KOSKETUSEHDOSTA (ei matalasta ruudusta) ja
 * työpöydällä ei kummastakaan.
 *
 * VASTAKOE: `--vastakoe` palvelee css/styles.css:stä kopion, josta
 * vaaka-asennon media-kysely on riisuttu (`@media not all`), ja mittaa
 * uudelleen. Vaakalohkojen väitteiden pitää silloin kaatua (FAIL-rivejä);
 * jos kaikki on vihreää ilman sääntöä, mittari ei mittaa mitään. Vastakoe
 * palauttaa 0 jos ainakin yksi väite kaatui, muuten 1.
 *
 *   node tools/savukkeet/savuke-ylapalkki-vaaka.mjs [kuvakansio] [--vastakoe]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { avaaChromium } from '../selain.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
/** Kuvakansio (valinnainen): kaappaukset iPadin kummastakin suunnasta. */
const VASTAKOE = process.argv.includes('--vastakoe');
const KUVAKANSIO = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? null;
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
  if (VASTAKOE && polku === join(JUURI, 'css/styles.css')) {
    // Riisutaan vaaka-asennon sääntö: kysely, joka ei koskaan osu.
    const ehto = /@media \(orientation: landscape\) and \(max-height: 520px\),\s*\(orientation: landscape\) and \(pointer: coarse\) and \(max-width: 1366px\) \{/;
    const lahde = readFileSync(polku, 'utf8');
    if (!ehto.test(lahde)) { console.log('FAIL  vastakoe: vaakasäännön media-kyselyä ei löytynyt css/styles.css:stä'); process.exit(2); }
    res.end(lahde.replace(ehto, '@media not all {'));
    return;
  }
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
 * IPAD VAIN VAAKASUUNNASSA (omistaja 21.9.2026, Raamatun loki "BUGI:
 * IPADIN YLAPALKKI POISSA MYOS PYSTYASENNOSSA": *"tarkoitus oli poistaa
 * ylapalkki vain vaaka tilassa iphonella ja ipadilla"*). Mitataan
 * omistajan pyytämät 834 × 1194 (pysty: palkki näkyy, hampurilainen)
 * ja 1194 × 834 (vaaka: ei palkkia, hampurilainen avaa valikon) sekä rajan uloin
 * iPad Pro 12,9" 1366 × 1024 vaakana. `hasTouch` on se, mikä tekee
 * ruudusta `pointer: coarse` -laitteen — ilman sitä sama ruutu on
 * hiiriruutu eikä osu sääntöön.
 */
const IPAD_PYSTY = { width: 834, height: 1194 };
const IPAD_VAAKA = { width: 1194, height: 834 };
const IPAD_PRO_VAAKA = { width: 1366, height: 1024 };
/** Työpöytä hiirellä: säännön on jätettävä tämä täsmälleen ennalleen. */
const TYOPOYTA = { width: 1400, height: 900 };

const selain = await avaaChromium();

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
  const paneeli = document.getElementById('paavalikko');
  const tyyli = palkki ? getComputedStyle(palkki) : null;
  const mitat = {
    nappi: kehys(nappi),
    nappiNakyy: Boolean(nappi && nappi.offsetParent),
    selite: kehys(selite),
    palkki: kehys(palkki),
    palkkiNakyvyys: tyyli?.visibility ?? null,
    palkkiKorkeus: palkki ? palkki.getBoundingClientRect().height : null,
    // Päävalikko-paneeli (#paavalikko): auki, kehys ja body-luokka.
    valikkoAuki: Boolean(paneeli && !paneeli.hidden && paneeli.getBoundingClientRect().height > 0),
    valikko: paneeli && !paneeli.hidden ? kehys(paneeli) : null,
    valikkoLuokka: document.body.classList.contains('paavalikko-auki'),
    nappiAria: nappi?.getAttribute('aria-expanded') ?? null,
    leveys: window.innerWidth,
    korkeus: window.innerHeight,
    seliteOliPiilossa: oliPiilossa,
    // Kumpi ehto sääntölohkosta osui: matala ruutu vai kosketus-iPad.
    matalaRuutu: matchMedia('(orientation: landscape) and (max-height: 520px)').matches,
    kosketusIpad: matchMedia('(orientation: landscape) and (pointer: coarse) and (max-width: 1366px)').matches,
    // Valikon kuvake: yläpalkin #menu-btn on hampurilainen (h-viivat);
    // kartan nappi on nyt myös TAVALLINEN hampurilainen: yksi polku, kolme
    // M-alkuista suoraa viivaa, ei väkäsiä (L-murtoviivoja) eikä kaaria.
    menuHampurilainen: /h15/.test(document.querySelector('#menu-btn svg path')?.getAttribute('d') ?? ''),
    nappiPolut: [...(nappi?.querySelectorAll('svg path') ?? [])].map((p) => p.getAttribute('d') ?? ''),
    nappiHampurilainen: (() => {
      const polut = [...(nappi?.querySelectorAll('svg path') ?? [])].map((p) => p.getAttribute('d') ?? '');
      return polut.length === 1 && polut[0].split('M').length - 1 === 3
        && /^M/.test(polut[0]) && /h/.test(polut[0]) && !/[LlCcSsQqTtAaZz]/.test(polut[0]);
    })(),
  };
  if (kotelo) kotelo.hidden = oliPiilossa;
  return mitat;
}`;

/** Napauttaa kartan hampurilaista; näkymätön nappi ei jumita ajoa (vastakoe), väite kaatuu itse. */
const napauta = (sivu) => sivu.click('.ylapalkki-nappi', { timeout: 2000 }).catch(() => {});

/** Palkki on piilossa, kun se on näkymätön tai nollakorkuinen. */
const palkkiPiilossa = (m) => m.palkkiNakyvyys === 'hidden' || !(m.palkkiKorkeus > 0);

/**
 * Napin avaama päävalikko vaaka-asennossa: avautuu napin päälle, palkki
 * pysyy piilossa, ulkopuolinen napautus ja Esc sulkevat, sisäpuolinen ei.
 */
async function tarkistaValikko(nimi, sivu, ruutu, kuvaNimi) {
  await napauta(sivu);
  await sivu.waitForTimeout(500);
  const auki = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: nappi avaa päävalikon`,
    auki.valikkoAuki && auki.valikkoLuokka && auki.nappiAria === 'true',
    JSON.stringify({ auki: auki.valikkoAuki, luokka: auki.valikkoLuokka, aria: auki.nappiAria }));
  vaadi(`${nimi}: yläpalkki pysyy piilossa napin painalluksen jälkeen`,
    palkkiPiilossa(auki),
    JSON.stringify({ nakyvyys: auki.palkkiNakyvyys, korkeus: auki.palkkiKorkeus }));
  // Valikon oikea yläkulma napin oikean yläkulman kohdalla (±2 px).
  const dx = auki.valikko && auki.nappi
    ? (auki.valikko.x + auki.valikko.width) - (auki.nappi.x + auki.nappi.width) : null;
  const dy = auki.valikko && auki.nappi ? auki.valikko.y - auki.nappi.y : null;
  vaadi(`${nimi}: valikon oikea yläkulma on napin oikean yläkulman kohdalla (±2 px)`,
    dx !== null && Math.abs(dx) <= 2 && Math.abs(dy) <= 2,
    JSON.stringify({ dx, dy, valikko: auki.valikko, nappi: auki.nappi }));
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, `ylapalkki-${kuvaNimi}-valikko-auki.png`) });
  }

  /* ── napautus valikon SISÄLTÄ (ei painiketta) ei sulje ── */
  const sisapiste = await sivu.evaluate(() => {
    const v = document.getElementById('paavalikko');
    const r = v.getBoundingClientRect();
    for (let y = r.top + 6; y < r.bottom - 4; y += 6) {
      for (let x = r.left + 6; x < r.right - 4; x += 6) {
        const el = document.elementFromPoint(x, y);
        if (el && v.contains(el) && !el.closest('button, a, input, select, label, summary, [role="button"], [tabindex]')) {
          return { x: Math.round(x), y: Math.round(y) };
        }
      }
    }
    return { x: Math.round(r.left + 3), y: Math.round(r.top + 3) };
  });
  await sivu.mouse.click(sisapiste.x, sisapiste.y);
  await sivu.waitForTimeout(400);
  const sisalla = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: napautus valikon sisältä EI sulje sitä`, sisalla.valikkoAuki,
    JSON.stringify({ piste: sisapiste, auki: sisalla.valikkoAuki }));

  /* ── napautus kartalle (valikon ulkopuolelle) sulkee ── */
  const ulko = { x: Math.round(ruutu.width / 2), y: Math.round(ruutu.height - 40) };
  const osuuko = sisalla.valikko && ulko.x >= sisalla.valikko.x && ulko.x <= sisalla.valikko.x + sisalla.valikko.width
    && ulko.y >= sisalla.valikko.y && ulko.y <= sisalla.valikko.y + sisalla.valikko.height;
  await sivu.mouse.click(ulko.x, ulko.y);
  await sivu.waitForTimeout(400);
  const kiinni = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: napautus valikon ulkopuolelta (kartalle) sulkee sen`,
    !osuuko && !kiinni.valikkoAuki && !kiinni.valikkoLuokka && kiinni.nappiAria === 'false',
    JSON.stringify({ auki: kiinni.valikkoAuki, luokka: kiinni.valikkoLuokka, aria: kiinni.nappiAria, osuuko }));
  vaadi(`${nimi}: yläpalkki piilossa myös valikon sulkemisen jälkeen`, palkkiPiilossa(kiinni),
    JSON.stringify({ nakyvyys: kiinni.palkkiNakyvyys, korkeus: kiinni.palkkiKorkeus }));

  /* ── Esc sulkee ── */
  await napauta(sivu);
  await sivu.waitForTimeout(400);
  const uudelleen = await sivu.evaluate(`(${MITAT})()`);
  await sivu.keyboard.press('Escape');
  await sivu.waitForTimeout(400);
  const escin = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: Esc sulkee valikon`, uudelleen.valikkoAuki && !escin.valikkoAuki,
    JSON.stringify({ ennen: uudelleen.valikkoAuki, jalkeen: escin.valikkoAuki }));
}

/* ── 1. VAAKA: nappi näkyy (tavallinen hampurilainen), palkki piilossa ── */
{
  const { ctx, sivu, virheet } = await avaaPeli(VAAKA);
  vaadi('vaaka: sivu latautui ilman poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));

  const alku = await sivu.evaluate(`(${MITAT})()`);
  vaadi('vaaka: nappi näkyy kartalla', alku.nappiNakyy, JSON.stringify(alku.nappi));
  vaadi('vaaka: napin kuvake on tavallinen hampurilainen (yksi polku, kolme suoraa M-viivaa, ei väkäsiä)',
    alku.nappiHampurilainen, JSON.stringify(alku.nappiPolut));
  vaadi('vaaka: yläpalkki on piilossa aluksi', palkkiPiilossa(alku),
    JSON.stringify({ nakyvyys: alku.palkkiNakyvyys, korkeus: alku.palkkiKorkeus }));

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

  /*
   * Nappi ei saa kadota silloinkaan kun karttaselite on piilossa:
   * vaakanäkymässä se on ainoa tie valikkoon, rahoihin ja päivään.
   */
  vaadi('vaaka: hampurilainen näkyy myös aloitusnäkymässä, jossa selite on piilossa',
    alku.nappiNakyy && alku.seliteOliPiilossa,
    JSON.stringify({ nappi: alku.nappiNakyy, selitePiilossa: alku.seliteOliPiilossa }));

  await tarkistaValikko('vaaka', sivu, VAAKA, 'vaaka');

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
  vaadi('pysty: kartan hampurilaisnappi on piilossa', !p.nappiNakyy, JSON.stringify(p.nappi));
  vaadi('pysty: yläpalkin valikon kuvake on hampurilainen', p.menuHampurilainen);
  vaadi('pysty: karttaselite on ennallaan oikeassa reunassa',
    p.selite && p.selite.x + p.selite.width > p.leveys - 40,
    JSON.stringify({ leveys: p.leveys, selite: p.selite }));
  vaadi('pysty: ei poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 3. IPAD VAAKA: sama nappi, sama sulkusääntö ───────────────────
 *
 * (Omistaja 21.9.2026.) Ehto on vaaka-asento ja kosketus, joten vartio
 * mittaa MOLEMMAT: että sääntö osuu oikeasta syystä (`kosketusIpad`,
 * ei `matalaRuutu`) ja että asettelu on sama kuin vaakapuhelimella.
 */
for (const [nimi, ruutu] of [['iPad vaaka', IPAD_VAAKA], ['iPad Pro vaaka', IPAD_PRO_VAAKA]]) {
  const { ctx, sivu, virheet } = await avaaPeli(ruutu, { kosketus: true });
  const alku = await sivu.evaluate(`(${MITAT})()`);
  vaadi(`${nimi}: sääntö osuu kosketusehdosta eikä matalasta ruudusta`,
    alku.kosketusIpad && !alku.matalaRuutu,
    JSON.stringify({ kosketus: alku.kosketusIpad, matala: alku.matalaRuutu, korkeus: alku.korkeus }));
  vaadi(`${nimi}: yläpalkki on piilossa aluksi`, palkkiPiilossa(alku),
    JSON.stringify({ nakyvyys: alku.palkkiNakyvyys, korkeus: alku.palkkiKorkeus }));
  vaadi(`${nimi}: nappi näkyy kartalla ja sen kuvake on tavallinen hampurilainen`,
    alku.nappiNakyy && alku.nappiHampurilainen,
    JSON.stringify({ nappi: alku.nappi, polut: alku.nappiPolut }));
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

  await tarkistaValikko(nimi, sivu, ruutu, nimi.replace(/\s+/g, '-').toLowerCase());
  vaadi(`${nimi}: ei poikkeuksia`, virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 3b. IPAD PYSTY: palkki näkyy, hampurilainen, ei väkäsiä ────────
 *
 * Juuri tämä oli omistajan bugi 21.9.2026: iPad pystyssä oli ilman
 * yläpalkkia. Pystyasennossa palkki on aina näkyvissä ja valikon
 * kuvake on tavallinen hampurilainen; kelluvaa väkäsnappia ei ole.
 */
{
  const { ctx, sivu, virheet } = await avaaPeli(IPAD_PYSTY, { kosketus: true });
  const p = await sivu.evaluate(`(${MITAT})()`);
  vaadi('iPad pysty 834 × 1194: kumpikaan sääntöehto ei osu',
    !p.matalaRuutu && !p.kosketusIpad, JSON.stringify({ matala: p.matalaRuutu, kosketus: p.kosketusIpad }));
  vaadi('iPad pysty: yläpalkki näkyy',
    p.palkkiNakyvyys === 'visible' && p.palkki && p.palkki.height > 20,
    JSON.stringify({ nakyvyys: p.palkkiNakyvyys, palkki: p.palkki }));
  vaadi('iPad pysty: kartan hampurilaisnappi on piilossa', !p.nappiNakyy, JSON.stringify(p.nappi));
  vaadi('iPad pysty: yläpalkin valikon kuvake on hampurilainen', p.menuHampurilainen);
  vaadi('iPad pysty: karttaselite on ennallaan oikeassa reunassa',
    p.selite && p.selite.x + p.selite.width > p.leveys - 40,
    JSON.stringify({ leveys: p.leveys, selite: p.selite }));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'ylapalkki-ipad-pysty.png') });
  vaadi('iPad pysty: ei poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));
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
  vaadi('työpöytä 1400 × 900: kartan hampurilaisnappi on piilossa', !t.nappiNakyy, JSON.stringify(t.nappi));
  vaadi('työpöytä 1400 × 900: karttaselite on ennallaan oikeassa reunassa',
    t.selite && t.selite.x + t.selite.width > t.leveys - 40,
    JSON.stringify({ leveys: t.leveys, selite: t.selite }));
  vaadi('työpöytä 1400 × 900: ei poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

/* ── 5. KORTTI JA LINSSI AUKI: sääntö ei muutu (Fable 21.9.2026) ───
 *
 * Neljä ruutua (iPhone pysty/vaaka, iPad pysty/vaaka) tallennetulla
 * pelillä Marseillessa: lehti auki (arrival-dialog, "kortti") ja
 * keksintölinssi päällä. Palkin näkyvyys seuraa yhä vain asentoa, ja
 * linssin oma yläpalkki näyttää tavallisen hampurilaisen, ei väkäsiä.
 */
{
  const { Game } = await import('../../js/game.js');
  const { packById } = await import('../../js/pack.js');
  const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
  peli.phase = 'action';
  peli.tokens.delete('marseille');
  const tallenne = JSON.stringify(peli.toJSON());
  const RUUDUT5 = [
    ['iPhone pysty', PYSTY, false], ['iPhone vaaka', VAAKA, true],
    ['iPad pysty', IPAD_PYSTY, false], ['iPad vaaka', IPAD_VAAKA, true],
  ];
  for (const [nimi, ruutu, piilossa] of RUUDUT5) {
    const ctx = await selain.newContext({ viewport: ruutu, hasTouch: true, serviceWorkers: 'block' });
    await ctx.addInitScript((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, tallenne);
    const sivu = await ctx.newPage();
    const virheet = [];
    sivu.on('pageerror', (e) => virheet.push(String(e)));
    await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
    await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded' });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.game), null, { timeout: 60000 }).catch(() => {});
    await sivu.waitForTimeout(2500);
    const odotettu = piilossa ? 'hidden' : 'visible';
    // a) kortti: lehti auki
    await sivu.evaluate(() => {
      const { ui } = window.matkakirja;
      clearTimeout(ui.automaattiheittoAjastin);
      ui.automaattiheittoAjastin = null;
      if (!ui.arrivalDialog.open) ui.arrivalDialog.showModal();
    });
    await sivu.waitForTimeout(400);
    const kortti = await sivu.evaluate(`(${MITAT})()`);
    vaadi(`${nimi}, lehti auki: yläpalkki ${piilossa ? 'piilossa' : 'näkyy'} ja kartan hampurilainen ${piilossa ? 'näkyy' : 'piilossa'}`,
      kortti.palkkiNakyvyys === odotettu && kortti.nappiNakyy === piilossa
        && (piilossa ? kortti.nappiHampurilainen : kortti.menuHampurilainen),
      JSON.stringify({ nakyvyys: kortti.palkkiNakyvyys, nappi: kortti.nappiNakyy, napinKuvake: kortti.nappiHampurilainen, hampurilainen: kortti.menuHampurilainen }));
    await sivu.evaluate(() => document.getElementById('arrival-dialog')?.close());
    // b) linssi päällä (keksinnöt: linssin oma yläpalkki ja valikko)
    const linssi = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      ui.busy = false;
      if (!ui.game.player.linssit.includes('keksinnot')) ui.game.player.linssit.push('keksinnot');
      ui.valitseLinssi('keksinnot');
      for (let i = 0; i < 400; i += 1) {
        if (ui.aikajana) break;
        await new Promise((r) => setTimeout(r, 25));
      }
      await new Promise((r) => setTimeout(r, 600));
      const nappi = document.querySelector('.aikajana-valikko-nappi');
      const d = nappi?.querySelector('svg path')?.getAttribute('d') ?? '';
      return {
        paalla: document.body.classList.contains('aikajana-paalla'),
        valikkoNakyy: Boolean(nappi && nappi.offsetParent),
        hampurilainen: /h15/.test(d),
        vakaset: /L12/.test(d),
      };
    });
    const linssiMitat = await sivu.evaluate(`(${MITAT})()`);
    vaadi(`${nimi}, linssi auki: linssin valikon kuvake on hampurilainen, ei väkäset`,
      linssi.paalla && linssi.valikkoNakyy && linssi.hampurilainen && !linssi.vakaset,
      JSON.stringify(linssi));
    // Linssin oma palkki korvaa pelin yläpalkin (css/aikajana.css), joten
    // ruudulla on palkki hampurilaisineen: hampurilaisnappia ei ole kummassakaan
    // asennossa (css/styles.css body.aikajana-palkki-auki .ylapalkki-nappi).
    vaadi(`${nimi}, linssi auki: pelin yläpalkki väistyy linssin palkin tieltä eikä kartan hampurilaista ole`,
      linssiMitat.palkkiNakyvyys === 'hidden' && !linssiMitat.nappiNakyy,
      JSON.stringify({ nakyvyys: linssiMitat.palkkiNakyvyys, nappi: linssiMitat.nappiNakyy }));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `ylapalkki-linssi-${nimi.replace(/\s+/g, '-').toLowerCase()}.png`) });
    vaadi(`${nimi}, kortti ja linssi: ei poikkeuksia`, virheet.length === 0, virheet.join(' | ').slice(0, 300));
    await ctx.close();
  }
}

await selain.close();
palvelin.close();
if (VASTAKOE) {
  const kaatui = kaikki - lapi;
  console.log(`\n${lapi}/${kaikki} läpi — VASTAKOE (vaakasääntö riisuttu): ${kaatui} väitettä kaatui${kaatui > 0 ? ' (odotettu)' : ' — MITTARI EI MITTAA MITÄÄN'}`);
  process.exit(kaatui > 0 ? 0 : 1);
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
