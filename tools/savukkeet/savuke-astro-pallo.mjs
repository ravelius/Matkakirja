/*
 * SELAINSAVUKE: AVARUUSVAIHEEN PALLO — ISS, AURINKO SIVULTA,
 * KYLLÄISYYS.
 *
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
 *     node tools/savukkeet/savuke-astro-pallo.mjs
 *
 * Raamattu, "ASTRONAUTIN KAMERA: VALOKUVANÄKYMÄ UUSIKSI 2",
 * PALLONÄKYMÄ 11–13. Yksikkötestit (tests/satelliitti-avaruus.test.mjs)
 * näkevät kaavat; tämä savuke katsoo RUUTUA kahdella näytöllä
 * (1400 × 900 ja 390 × 844).
 *
 * VÄITTEET:
 *   1. ISS ON RUUDULLA. Merkki on DOMissa pallon kotelossa, sen
 *      ruutupaikka on pallon sisällä ja se MUUTTUU kahdessa
 *      sekunnissa. Ratakaari on piirretty (svg-polku) ja sen
 *      takapuoli on karsittu — näkyviä pisteitä on vähemmän kuin koko
 *      radalla.
 *   2. VASTAKOE LIIKKEELLE: liikkeenvähennyksellä (prefers-reduced-
 *      motion) sama merkki on paikallaan. Jos mittari näyttäisi
 *      liikettä myös silloin, se mittaisi kohinaa eikä rataa.
 *   3. AURINKO SIVULTA. Kolme näytettä molemmilta reunoilta ja kolme
 *      keskustasta, luettuna kuvakaappauksen pikseleistä: varjon
 *      puolella reuna TUMMUU ja valon puolella KIRKASTUU, kun
 *      varjostus kytketään päälle — ja keskusta ei muutu.
 *   4. VASTAKOE VARJOLLE: kytkin pois → samat pikselit palaavat
 *      lähtöarvoonsa. Mittari osaa siis mennä punaiseksi.
 *   5. KYLLÄISYYS ALAS. Reliefin keskimääräinen kylläisyys mitataan
 *      selaimessa ennen ja jälkeen suodattimen: jälkeen on pienempi
 *      ja suhde on lähellä RELIEFIN_SATURAATIOta.
 *   6. KOHDEPISTEET EIVÄT KÄRSI. Vihreitä pisteitä on yhä ruudulla,
 *      myös varjon puolella, ja napautus menee kalvon LÄPI (kalvo on
 *      merkkikerroksen alla ja pointer-events: none) — piste on siis
 *      yhä klikattavissa.
 *   7. RELIEFIN TARKKUUS: leveä ruutu saa 8k-kuvan, puhelin 4k:n, ja
 *      latauksen kesto kirjataan.
 *   8. PALLO EI OLE MUSTA (v1924, iPhone). Pinnalla on osoite kahdeksan
 *      sekunnin sisällä JA pallon keskipiste on kirkkaampi kuin 20.
 *      Vartio ajetaan lisäksi SAFARIN RAJOILLA: `ctx.filter` pois
 *      käytöstä ja kankaan katto 2048 × 1024 — silloin varapolun on
 *      kannettava, eikä mustaa palloa saa syntyä.
 *
 * VERKKO: ämpäri (laatat, Globe.gl, reliefi) Noden fetchin kautta, muu
 * katki. Ympäristömuuttuja NAKYMAT rajaa ajettavat näytöt
 * (esim. NAKYMAT=tyopoyta).
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, luminanssi } from './pallon-liike-mittarit.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8754, r));

/*
 * Playwright kahdesta paikasta (README: älä kirjoita kiinteää
 * ../../node_modules-polkua).
 */
let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
const chromium = paketti?.chromium ?? paketti?.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });


const NAKYMAT = {
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
};
const VALITUT = (process.env.NAKYMAT ?? '').split(',').map((x) => x.trim()).filter(Boolean);

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/*
 * PIKSELIT LUETAAN KUVAKAAPPAUKSESTA. WebGL-kangas ei anna
 * toDataURLia ilman preserveDrawingBufferia (eikä sitä saa kytkeä
 * päälle pelin takia), ja auringon kalvo on kankaan PÄÄLLÄ mutta
 * merkkien ALLA — kaappaus on ainoa paikka, jossa nämä kolme kerrosta
 * ovat samassa kuvassa niin kuin pelaajalla.
 */
const kirkkaus = (kuva, x, y, sade = 3) => {
  let summa = 0;
  let n = 0;
  for (let dy = -sade; dy <= sade; dy += 1) {
    for (let dx = -sade; dx <= sade; dx += 1) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= kuva.width || py >= kuva.height) continue;
      summa += luminanssi(kuva.data, (py * kuva.width + px) * 4);
      n += 1;
    }
  }
  return n ? summa / n : 0;
};

/**
 * Kolme näytettä reunan tuntumasta (osuus säteestä) annetulla puolella
 * ja kolme keskustasta. Kulmat ovat vaakasuoran molemmin puolin, jotta
 * näytteet eivät osu samaan maastoon.
 */
const NAYTEKULMAT = [-22, 0, 22];
const NAYTTEEN_SADE = 0.94;
function naytteet(kuva, { keskiX, keskiY, sade, dpr }) {
  const ota = (suunta) => NAYTEKULMAT.map((k) => {
    const a = (k * Math.PI) / 180;
    const x = keskiX + suunta * Math.cos(a) * sade * NAYTTEEN_SADE;
    const y = keskiY + Math.sin(a) * sade * NAYTTEEN_SADE;
    return kirkkaus(kuva, x * dpr, y * dpr);
  });
  /*
   * PUOLIVÄLIN RENGAS (0,5 × säde) on oma näytteensä: varjo saa
   * koskea vain reunan kaistaa, joten tässä ei saa tapahtua mitään.
   * Se on ainoa tapa erottaa reunavarjo koko pallon himmennyksestä.
   */
  const puolivali = (suunta) => NAYTEKULMAT.map((k) => {
    const a = (k * Math.PI) / 180;
    return kirkkaus(
      kuva, (keskiX + suunta * Math.cos(a) * sade * 0.5) * dpr,
      (keskiY + Math.sin(a) * sade * 0.5) * dpr,
    );
  });
  const keski = NAYTEKULMAT.map((k, i) => kirkkaus(
    kuva, (keskiX + (i - 1) * sade * 0.12) * dpr, (keskiY + k * 0.4) * dpr,
  ));
  const ka = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  return {
    vasen: ota(-1).map((v) => +v.toFixed(1)),
    oikea: ota(1).map((v) => +v.toFixed(1)),
    keskusta: keski.map((v) => +v.toFixed(1)),
    vasenKa: +ka(ota(-1)).toFixed(1),
    oikeaKa: +ka(ota(1)).toFixed(1),
    keskustaKa: +ka(keski).toFixed(1),
    puolivaliVasenKa: +ka(puolivali(-1)).toFixed(1),
    puolivaliOikeaKa: +ka(puolivali(1)).toFixed(1),
  };
}

/** Avaruusvaiheen mitatut luvut: kalvo, ISS, pisteet ja reliefi. */
const MITAT = () => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori');
  const r = kotelo.getBoundingClientRect();
  const iss = document.querySelector('.astro-iss');
  const rata = document.querySelector('.astro-rata path');
  const kalvo = document.querySelector('.astro-kalvo');
  const d = rata?.getAttribute('d') ?? '';
  const maalattu = (el) => {
    let p = el;
    while (p && p.nodeType === 1) {
      const t = getComputedStyle(p);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) <= 0.05) return false;
      p = p.parentElement;
    }
    const b = el.getBoundingClientRect();
    return b.width > 0 && b.height > 0;
  };
  /*
   * PISTEEN OMA RUUTUPAIKKA: kohdemerkit ovat CSS2D-elementtejä, joten
   * niiden laatikko kertoo, missä pelaaja ne näkee. Varjon puoli on
   * kotelon vasen laita (AURINGON_PUOLI = 'oikea').
   */
  const pisteet = [...document.querySelectorAll('.satelliitti-piste')]
    .filter((el) => !el.classList.contains('pallolauta-takana')
      && !el.closest('.pallolauta-takana'))
    .map((el) => {
      /*
       * MERKIN OMA LAATIKKO ON NOLLA (css/satelliitti.css:
       * .satelliitti-piste { width: 0; height: 0 }) — se on ankkuri,
       * ja pelaajan näkemä pinta on sen YDIN. Mitta luetaan siis
       * ytimestä; muuten mittari ilmoittaisi nollaa näkyvää pistettä
       * silloinkin kun ruutu on niitä täynnä (mitattu 16.9.2026).
       */
      const ydin = el.querySelector('.satelliitti-ydin') ?? el;
      const b = ydin.getBoundingClientRect();
      return {
        x: +(b.left + b.width / 2 - r.left).toFixed(1),
        y: +(b.top + b.height / 2 - r.top).toFixed(1),
        koko: +b.width.toFixed(1),
        nakyy: maalattu(ydin),
      };
    })
    .filter((p) => p.x > 0 && p.y > 0 && p.x < r.width && p.y < r.height);
  const nakyvat = pisteet.filter((p) => p.nakyy);
  /*
   * KLIKATTAVUUS: mikä elementti on pisteen kohdalla päällimmäisenä?
   * Kalvo EI saa olla se — muuten varjo söisi napautuksen. Merkit ovat
   * pointer-events: none, joten oikea vastaus on pallon oma kangas tai
   * sen kotelo (napautus lasketaan lähimpään kohteeseen).
   */
  const kohdalla = nakyvat.slice(0, 3).map((p) => {
    const el = document.elementFromPoint(r.left + p.x, r.top + p.y);
    return el ? `${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? '').toString().split(' ')[0]}` : 'null';
  });
  const kalvonTyyli = kalvo ? getComputedStyle(kalvo) : null;
  /*
   * PISTEEN ULKOASU MAALATUSTA TULOKSESTA (omistaja 16.9.2026: pelkkä
   * vihreä piste ilman ympyrää ja hohtoa). Luetaan ensimmäisestä
   * kameran puolen merkistä; kaikki merkit saavat saman säännön.
   */
  const ekaMerkki = [...document.querySelectorAll('.satelliitti-piste')]
    .find((el) => !el.closest('.pallolauta-takana'));
  const ydin = ekaMerkki?.querySelector('.satelliitti-ydin');
  const osumaAla = ekaMerkki?.querySelector('.satelliitti-osuma');
  const yt = ydin ? getComputedStyle(ydin) : null;
  const ot = osumaAla ? getComputedStyle(osumaAla) : null;
  const piste = {
    halkaisija: yt ? +parseFloat(yt.width).toFixed(1) : null,
    tausta: yt?.backgroundColor ?? null,
    varjo: yt?.boxShadow ?? null,
    reunanLeveys: yt ? +parseFloat(yt.borderTopWidth).toFixed(1) : null,
    reunanVari: yt?.borderTopColor ?? null,
    osumanLeveys: ot ? +parseFloat(ot.width).toFixed(1) : null,
    osumanTausta: ot?.backgroundColor ?? null,
    renkaita: document.querySelectorAll('.satelliitti-rengas, .satelliitti-hehku').length,
    // Hohtoa voi tulla myös suodattimesta tai ulommasta kääreestä.
    suodatin: yt?.filter ?? null,
    merkinVarjo: ekaMerkki ? getComputedStyle(ekaMerkki).boxShadow : null,
  };
  return {
    piste,
    kotelo: { leveys: Math.round(r.width), korkeus: Math.round(r.height) },
    kalvoDomissa: Boolean(kalvo),
    kalvonOsoitin: kalvonTyyli?.pointerEvents ?? null,
    kalvoMerkkienAlla: Boolean(kalvo?.nextElementSibling),
    issDomissa: Boolean(iss),
    issPeitto: iss ? Number(getComputedStyle(iss).opacity) : null,
    issLeveys: iss ? Math.round(iss.getBoundingClientRect().width) : 0,
    radanPituus: d.length,
    radanJaksoja: d ? d.split('M').length - 1 : 0,
    radanPisteita: d ? d.split('L').length - 1 : 0,
    pisteita: pisteet.length,
    pisteitaNakyvissa: nakyvat.length,
    pisteitaVarjonPuolella: nakyvat.filter((p) => p.x < r.width / 2).length,
    kohdalla,
    korkeus: +pallo.pointOfView().altitude.toFixed(3),
    avaruus: ui.pallolinssi?.kahva?.avaruus?.tila?.() ?? null,
  };
};

/*
 * KYLLÄISYYS MITATAAN SIITÄ SAMASTA KUVASTA, jonka linssi lataa —
 * pienennettynä 256 × 128:aan, koska keskiarvo ei tarvitse kahdeksaa
 * miljoonaa pikseliä. Sama kuva ladotaan kahdesti: ilman suodatinta ja
 * suodattimella, ja molemmista lasketaan HSL-kylläisyyden keskiarvo
 * (vain läpinäkymättömistä pikseleistä — navat ovat alfaltaan nolla).
 */
const KYLLAISYYS = async ([osoite, kerroin]) => {
  const kuva = await new Promise((valmis, virhe) => {
    const k = new Image();
    k.crossOrigin = 'anonymous';
    k.onload = () => valmis(k);
    k.onerror = virhe;
    k.src = osoite;
  });
  const mittaa = (suodatin) => {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.filter = suodatin;
    const tuettu = ctx.filter === suodatin;
    ctx.drawImage(kuva, 0, 0, 256, 128);
    const d = ctx.getImageData(0, 0, 256, 128).data;
    let summa = 0; let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      const r = d[i] / 255; const g = d[i + 1] / 255; const b = d[i + 2] / 255;
      const max = Math.max(r, g, b); const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const s = max === min ? 0 : (max - min) / (l > 0.5 ? 2 - max - min : max + min);
      summa += s; n += 1;
    }
    return { kyllaisyys: n ? summa / n : 0, pikseleita: n, tuettu };
  };
  const ennen = mittaa('none');
  const jalkeen = mittaa(`saturate(${kerroin})`);
  return {
    ennen: +ennen.kyllaisyys.toFixed(4),
    jalkeen: +jalkeen.kyllaisyys.toFixed(4),
    suhde: +(jalkeen.kyllaisyys / (ennen.kyllaisyys || 1)).toFixed(3),
    suodatinTuettu: jalkeen.tuettu,
    pikseleita: ennen.pikseleita,
  };
};
/*
 * KEHYSTEN ODOTUS ENNEN MITTAUSTA. Linssi sulkee karttapinnat OMASSA
 * kehyssilmukassaan, ja laattakerros luo uuden verkon aina kun sen
 * tekstuuri saapuu verkosta. Oikealla laitteella väli on yksi kehys
 * (16 ms) eikä näy, mutta konttiympäristön SwiftShader piirtää 2–3
 * kehystä sekunnissa, jolloin juuri saapunut laatta ehtii olla
 * ruudulla kolmanneksen sekunnin. Mittaus odottaa siksi, että laattojen
 * pyyntöjono on tyhjentynyt ja sen jälkeen kolme kehystä.
 */
async function rauhoitu(s) {
  await s.waitForTimeout(2500);
  await s.evaluate(() => new Promise((r) => {
    let n = 3;
    const askel = () => { n -= 1; if (n <= 0) r(); else requestAnimationFrame(askel); };
    requestAnimationFrame(askel);
  }));
}

const PELITILA = () => {
  const { game } = window.matkakirja;
  return JSON.stringify({
    vaihe: game.phase, paikka: game.player.pos, rahat: game.player.money,
    tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
  });
};

async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8754/index.html?lauta=pallo', { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    /*
     * LINSSI LAUKKUUN. Pelaaja löytää sen pelistä (js/linssit/omistus.js);
     * savuke ei pelaa sitä läpi vaan antaa linssin samalla kentällä,
     * johon myonna() sen kirjoittaa. AVAAMINEN tehdään sen jälkeen
     * pelaajan omilla eleillä (avaaLinssiEleella).
     */
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1800);
  // Saapumispinnat pois: ne peittäisivät pallon eivätkä kuulu linssiin.
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
  return ok;
}

/*
 * LINSSI AUKI PELAAJAN OMILLA ELEILLÄ (ks. tiedoston alku, kohta A).
 *
 * Kolme napautusta, samat kuin pelaajalla:
 *   1. #turn-pill avaa matkalaukun (js/ui.js, index.html),
 *   2. button[data-linssi="satelliitti"] valitsee ruudun laukussa
 *      (js/ui.js linssiLiuska) — tämä EI vielä sytytä linssiä,
 *   3. .linssi-aktivoi sytyttää sen ja sulkee laukun (aktivoiLinssi).
 *
 * Jos jokin näistä puuttuu, savuke kaatuu tähän — ja juuri se on
 * tarkoitus: silloin pelaaja ei pääse linssiin lainkaan, eikä muilla
 * väitteillä ole väliä.
 */
async function avaaLinssiEleella(s, odota = 4500) {
  /*
   * NAPAUTUS ELI EI MITÄÄN MUUTA. Kontin ohjelmisto-WebGL piirtää
   * puhelinmitalla (dpr 2) pari kehystä sekunnissa, ja Playwrightin
   * oma odotus napautuksen jälkeen ehtii aikakatkaista vaikka
   * painallus on jo mennyt perille (mitattu 16.9.2026). Sama ele
   * tehdään silloin suoraan elementistä — pelaajan reitti ei muutu,
   * vain savukkeen tapa painaa.
   */
  await s.click('#turn-pill', { timeout: 20000 })
    .catch(() => s.evaluate(() => document.getElementById('turn-pill')?.click()));
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('button[data-linssi="satelliitti"]')?.click()));
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  await aktivoi.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('.linssi-aktivoi')?.click()));
  await s.waitForTimeout(odota);
  return s.evaluate(() => ({
    linssi: window.matkakirja.ui.linssiValittu,
    laukku: Boolean(document.getElementById('passport-dialog')?.open),
  }));
}

/*
 * ── SAFARIN RAJAT SELAIMEEN (väite 8) ─────────────────────────────
 *
 * Kontissa on vain Chromium, joten iOS Safarin kaksi kohtalokasta
 * ominaisuutta pannaan päälle käsin ennen yhtään sivuskriptiä:
 *
 *   1. `ctx.filter` ei ole olemassa (Safari 16 ja vanhemmat).
 *   2. Kangas, joka ylittää katon, on TYHJÄ ilman poikkeusta — juuri
 *      tämä hiljainen epäonnistuminen teki pallosta mustan.
 *
 * Jäljitelmä on karkea mutta osuu siihen, mikä merkitsee: ketju ei saa
 * jäädä mustaan, vaan sen on pudottava generoituun vyöhykepalloon tai
 * pienempään kankaaseen.
 */
const SAFARI_JARJESTELY = (kattoPx) => `(() => {
  const P = CanvasRenderingContext2D.prototype;
  try { Object.defineProperty(P, 'filter', { get: () => 'none', set: () => {}, configurable: true }); } catch (e) {}
  const alku = P.getImageData;
  P.getImageData = function (x, y, w, h) {
    const c = this.canvas;
    if (c && c.width * c.height > ${kattoPx}) {
      return new ImageData(new Uint8ClampedArray(4 * Math.max(1, w) * Math.max(1, h)), Math.max(1, w), Math.max(1, h));
    }
    return alku.call(this, x, y, w, h);
  };
})()`;

/** Pallon keskipisteen kirkkaus kuvakaappauksesta. */
function keskipisteenKirkkaus(kuva, { keskiX, keskiY, dpr }) {
  return kirkkaus(kuva, keskiX * dpr, keskiY * dpr, 6);
}

async function ajaNakyma(nimi) {
  const virheet = [];
  const konteksti = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(String(e)));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const t = (x) => `${x} (${nimi})`;
  const dpr = NAKYMAT[nimi].deviceScaleFactor ?? 1;

  await avaaPeli(s);
  /*
   * AVAUSAJO MITATAAN HETI. Odotus on lyhyt (600 ms) eikä 4,5 s, koska
   * ajo kestää viisi sekuntia: pitkä odotus katsoisi vasta valmista
   * loppuasentoa eikä näkisi alkua lainkaan. Kahva haetaan kyselyllä,
   * jotta mittaus osuu heti kun linssi on olemassa.
   */
  const ele = await avaaLinssiEleella(s, 600);
  vaadi(t('linssi aukeaa pelaajan omalla eleellä'), ele.linssi === 'satelliitti',
    `linssi ${ele.linssi}`);
  await s.waitForFunction(
    () => Boolean(window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.()),
    null, { timeout: 60000 },
  ).catch(() => {});
  const alku = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila());
  vaadi(t('avausajo on käynnissä ja pallo näkyy ensin kokonaan'),
    alku?.avausajo?.kaynnissa === true && alku.avausajo.osuus < 0.6
      && alku.halkaisijaAlussaPx / Math.min(alku.kotelo.leveys, alku.kotelo.korkeus) >= 0.6
      && alku.halkaisijaAlussaPx / Math.min(alku.kotelo.leveys, alku.kotelo.korkeus) <= 0.7,
    `osuus ${alku?.avausajo?.osuus} (${alku?.avausajo?.kulunutMs} ms ajettu),`
    + ` halkaisija alussa ${alku?.halkaisijaAlussaPx} px /`
    + ` ruutu ${alku?.kotelo?.leveys} × ${alku?.kotelo?.korkeus},`
    + ` nyt ${alku?.halkaisijaNytPx} px, säde ${alku?.kalvo?.sadePx}`);
  // Ajo perille (kesto 5 s + kontin hitaus): odotetaan sen loppumista.
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila()?.avausajo?.kaynnissa === false,
    null, { timeout: 120000 },
  ).catch(() => {});
  const loppu = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila());
  const kapein = Math.min(loppu.kotelo.leveys, loppu.kotelo.korkeus);
  const kasvu = loppu.halkaisijaNytPx / (alku.halkaisijaAlussaPx || 1);
  vaadi(t('pallo kasvaa avausajossa vähintään 1,3× ja peittää melkein koko ruudun'),
    kasvu >= 1.3 && loppu.halkaisijaNytPx / kapein >= 0.9
      && loppu.halkaisijaNytPx / kapein <= 0.95,
    `${alku.halkaisijaAlussaPx} → ${loppu.halkaisijaNytPx} px (${kasvu.toFixed(2)}×,`
    + ` ${(100 * loppu.halkaisijaNytPx / kapein).toFixed(1)} % ruudusta)`);
  /*
   * REUNAVARJON SÄDE LUETAAN KAMERAN KORKEUDESTA JOKA KEHYKSELLÄ.
   * Väite: kalvon säde kasvoi samassa suhteessa kuin pallo. Jos se
   * luettaisiin vain avattaessa, varjo jäisi zoomin jälkeen pallon
   * sisään renkaaksi.
   */
  const sadeKasvu = (loppu.kalvo?.sadePx ?? 0) / (alku.kalvo?.sadePx || 1);
  vaadi(t('reunavarjon säde seuraa zoomia'),
    Math.abs(loppu.kalvo.sadePx * 2 - loppu.halkaisijaNytPx) <= 2 && sadeKasvu > 1.15,
    `säde ${alku.kalvo?.sadePx} → ${loppu.kalvo?.sadePx} px (${sadeKasvu.toFixed(2)}×),`
    + ` pallo ${loppu.halkaisijaNytPx} px`);

  /* ---- hidas pyöriminen ja sen pysähtyminen ------------------------ */
  const lng = () => s.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView().lng);
  const kulma = (a, b) => {
    let d = b - a;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
  };
  const a1 = await lng();
  await s.waitForTimeout(4000);
  const a2 = await lng();
  const nopeus = Math.abs(kulma(a1, a2)) / 4;
  vaadi(t('pallo jää pyörimään hitaasti ajon jälkeen'),
    loppu.pyorii === true && nopeus > 0.05 && nopeus < 0.6,
    `${a1.toFixed(3)}° → ${a2.toFixed(3)}° = ${nopeus.toFixed(3)} °/s`
    + ` (tilaus 0,16; kirjaston autoRotateSpeed ${loppu.pyorimisenNopeus})`);
  /*
   * PELAAJAN OTE PYSÄYTTÄÄ. Veto pallon yli: sormi alas, liike, ylös —
   * sama ele, jolla pelaaja kääntää palloa. Liu'un annetaan ensin
   * sammua (js/pallo.js vauhti), ja vasta sen jälkeen mitataan, ettei
   * kulma enää muutu kahdessa sekunnissa.
   */
  const keskiX = Math.round(NAKYMAT[nimi].viewport.width / 2);
  const keskiY = Math.round(NAKYMAT[nimi].viewport.height / 2);
  await s.mouse.move(keskiX, keskiY);
  await s.mouse.down();
  for (let i = 1; i <= 5; i += 1) await s.mouse.move(keskiX - i * 8, keskiY);
  await s.mouse.up();
  await s.waitForTimeout(2000);
  const b1 = await lng();
  await s.waitForTimeout(2000);
  const b2 = await lng();
  const jaljella = Math.abs(kulma(b1, b2));
  const pyoriiEnaa = await s.evaluate(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila().pyorii,
  );
  vaadi(t('pyöriminen loppuu, kun pelaaja tarttuu palloon'),
    pyoriiEnaa === false && jaljella < 0.05,
    `pyörii ${pyoriiEnaa}, kulma ${b1.toFixed(3)}° → ${b2.toFixed(3)}° (${jaljella.toFixed(3)}°)`);
  vaadi(t('VASTAKOE: sama mittari näki liikkeen ennen tarttumista'),
    Math.abs(kulma(a1, a2)) > jaljella * 4 && Math.abs(kulma(a1, a2)) > 0.2,
    `ennen ${Math.abs(kulma(a1, a2)).toFixed(3)}°, jälkeen ${jaljella.toFixed(3)}° (2 s)`);

  await rauhoitu(s);
  const linssi = await s.evaluate(MITAT);

  /* ---- 1. ISS ------------------------------------------------------ */
  vaadi(t('ISS-merkki on DOMissa pallon kotelossa'),
    linssi.issDomissa && linssi.issLeveys >= 6 && linssi.issLeveys <= 10,
    `merkki ${linssi.issDomissa}, halkaisija ${linssi.issLeveys} px`);
  /*
   * PALLO KÄÄNNETÄÄN ISS:N KOHDALLE. Rata kiertää koko pallon, joten
   * merkki on puolet kierroksesta takapuolella — mittari ei saa
   * riippua siitä, mihin kohtaan rataa savuke sattuu osumaan. Kamera
   * viedään merkin pituuspiirille, jolloin se on varmasti edessä.
   */
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const tila = ui.pallolinssi.kahva.avaruus.tila();
    const iss = tila?.kalvo?.iss;
    if (!iss) return;
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, lat: 0, lng: iss.lng }, 0);
    ui.pallolauta.heraa();
  });
  await s.waitForTimeout(1200);
  const paikka1 = (await s.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  await s.waitForTimeout(2000);
  const mitat2 = await s.evaluate(MITAT);
  const paikka2 = mitat2.avaruus?.kalvo?.iss ?? null;
  const siirtyi = paikka1?.x != null && paikka2?.x != null
    ? Math.hypot(paikka2.x - paikka1.x, paikka2.y - paikka1.y) : 0;
  vaadi(t('ISS:n ruutupaikka muuttuu kahdessa sekunnissa'),
    Boolean(paikka1) && Boolean(paikka2) && siirtyi > 2,
    `${JSON.stringify(paikka1)} → ${JSON.stringify(paikka2)}, ${siirtyi.toFixed(1)} px`);
  vaadi(t('ISS näkyy pallon etupuolella ja piiloutuu taakse'),
    paikka1?.nakyvissa === true && mitat2.issPeitto > 0,
    `nakyvissa ${paikka1?.nakyvissa}, merkin peittävyys ${mitat2.issPeitto}`);
  const kalvo1 = linssi.avaruus?.kalvo ?? {};
  vaadi(t('ratakaari on piirretty ja takapuoli karsittu'),
    linssi.radanPisteita > 10 && kalvo1.kaarenPisteita > 0
      && kalvo1.kaarenPisteita < 241,
    `svg-pisteitä ${linssi.radanPisteita}, näkyviä ${kalvo1.kaarenPisteita}/241,`
    + ` jaksoja ${linssi.radanJaksoja}`);

  /* ---- 3. auringon sivuvalo pikseleistä ----------------------------- */
  const sade = kalvo1.sadePx ?? 0;
  const keski = { keskiX: linssi.kotelo.leveys / 2, keskiY: linssi.kotelo.korkeus / 2, sade, dpr };
  const kaappaaKotelo = async () => {
    const puskuri = await s.locator('.pallo-kotelo, .pallo-kuori').first()
      .screenshot({ timeout: 120000 });
    return decodePng(puskuri);
  };
  const paalla = naytteet(await kaappaaKotelo(), keski);
  await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.asetaVarjostus(false));
  await s.waitForTimeout(600);
  const pois = naytteet(await kaappaaKotelo(), keski);
  await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.asetaVarjostus(true));
  await s.waitForTimeout(600);
  const takaisin = naytteet(await kaappaaKotelo(), keski);

  vaadi(t('varjon puoli tummuu reunan tuntumassa'),
    paalla.vasenKa < pois.vasenKa * 0.92,
    `vasen ${pois.vasenKa} → ${paalla.vasenKa} (näytteet ${pois.vasen} → ${paalla.vasen})`);
  vaadi(t('valon puoli kirkastuu reunan tuntumassa'),
    paalla.oikeaKa > pois.oikeaKa + 1,
    `oikea ${pois.oikeaKa} → ${paalla.oikeaKa} (näytteet ${pois.oikea} → ${paalla.oikea})`);
  vaadi(t('keskusta jää koskematta'),
    Math.abs(paalla.keskustaKa - pois.keskustaKa) < 2,
    `keskusta ${pois.keskustaKa} → ${paalla.keskustaKa}`);
  /*
   * VARJO ON REUNAN OMA. Puolivälissä (0,5 × säde) ei saa tapahtua
   * mitään — muuten kyseessä olisi koko pallon himmennys eikä
   * auringon sivuvalo. Reunan ja keskustan SUORA vertailu ei kelpaa
   * väitteeksi (mitattu 16.9.2026 puhelimella: varjon puolella sattui
   * olemaan kirkasta maata, 113 vs. keskusta 83) — maasto vaihtelee
   * enemmän kuin varjo, joten mittari lukee saman pikselin ennen ja
   * jälkeen.
   */
  vaadi(t('varjo ei ulotu puoliväliin asti'),
    Math.abs(paalla.puolivaliVasenKa - pois.puolivaliVasenKa) < 2
      && Math.abs(paalla.puolivaliOikeaKa - pois.puolivaliOikeaKa) < 2,
    `puoliväli vasen ${pois.puolivaliVasenKa} → ${paalla.puolivaliVasenKa},`
    + ` oikea ${pois.puolivaliOikeaKa} → ${paalla.puolivaliOikeaKa}`);
  vaadi(t('varjon syvyys on tilauksen luokkaa reunan tuntumassa'),
    (pois.vasenKa - paalla.vasenKa) / (pois.vasenKa || 1) > 0.08,
    `pudotus ${(100 * (pois.vasenKa - paalla.vasenKa) / (pois.vasenKa || 1)).toFixed(0)} %`
    + ` (reuna ${pois.vasenKa} → ${paalla.vasenKa}, keskusta ${paalla.keskustaKa})`);
  vaadi(t('VASTAKOE: kytkin pois palauttaa pikselit'),
    Math.abs(takaisin.vasenKa - paalla.vasenKa) < 3 && pois.vasenKa > paalla.vasenKa,
    `päällä ${paalla.vasenKa}, pois ${pois.vasenKa}, takaisin ${takaisin.vasenKa}`);

  /* ---- 5. kylläisyys ------------------------------------------------ */
  const kylla = await s.evaluate(KYLLAISYYS, [linssi.avaruus?.reliefinOsoite, 0.8]);
  vaadi(t('reliefin kylläisyys on mitattu alas'),
    kylla.jalkeen < kylla.ennen && kylla.suhde < 0.95,
    `${kylla.ennen} → ${kylla.jalkeen} (suhde ${kylla.suhde}, suodatin ${kylla.suodatinTuettu})`);

  /* ---- 6. kohdepisteet ---------------------------------------------- */
  vaadi(t('kohdepisteet ovat yhä ruudulla, myös varjon puolella'),
    linssi.pisteitaNakyvissa >= 5 && linssi.pisteitaVarjonPuolella >= 1,
    `${linssi.pisteitaNakyvissa}/${linssi.pisteita} näkyvissä, varjon puolella `
    + `${linssi.pisteitaVarjonPuolella}`);
  /*
   * PELKKÄ VIHREÄ PISTE. Väite luetaan maalatusta tuloksesta eikä
   * tyylitiedostosta: pisteen halkaisija ≤ 9 px, tausta se sama
   * vihreä, `box-shadow` none, reunan leveys 0 — eikä sädekehää tai
   * rengasta ole enää olemassa.
   */
  vaadi(t('kohdepiste on pelkkä vihreä piste ilman rengasta ja hohtoa'),
    linssi.piste?.halkaisija > 0 && linssi.piste.halkaisija <= 9
      && /rgb\(93, 255, 168\)/.test(linssi.piste.tausta ?? '')
      && linssi.piste.varjo === 'none' && linssi.piste.merkinVarjo === 'none'
      && linssi.piste.reunanLeveys === 0 && linssi.piste.renkaita === 0
      && (linssi.piste.suodatin === 'none' || !linssi.piste.suodatin),
    JSON.stringify(linssi.piste));
  vaadi(t('osuma-ala on yhä sormen kokoinen'),
    linssi.piste?.osumanLeveys >= 32
      && /rgba\(0, 0, 0, 0\)|transparent/.test(linssi.piste.osumanTausta ?? ''),
    `osuma ${linssi.piste?.osumanLeveys} px, tausta ${linssi.piste?.osumanTausta}`);
  /*
   * VASTAKOE: mittari osaa mennä punaiseksi. Pisteelle annetaan
   * hetkeksi rengas ja hohto — jos mittari näyttää silloinkin
   * vihreää, se ei mittaa mitään. Tyyli poistetaan heti perään.
   */
  const vastakoe = await s.evaluate(() => {
    const tyyli = document.createElement('style');
    tyyli.id = 'astro-vastakoe';
    tyyli.textContent = '.satelliitti-ydin { border: 2px solid #5dffa8;'
      + ' box-shadow: 0 0 8px rgba(93,255,168,0.9); width: 18px; height: 18px; }';
    document.head.appendChild(tyyli);
    const ydin = document.querySelector('.satelliitti-piste .satelliitti-ydin');
    const t = ydin ? getComputedStyle(ydin) : null;
    const ulos = {
      halkaisija: t ? +parseFloat(t.width).toFixed(1) : null,
      varjo: t?.boxShadow ?? null,
      reunanLeveys: t ? +parseFloat(t.borderTopWidth).toFixed(1) : null,
    };
    tyyli.remove();
    return ulos;
  });
  vaadi(t('VASTAKOE: mittari näkee renkaan ja hohdon, jos ne palaavat'),
    vastakoe.halkaisija > 9 && vastakoe.varjo !== 'none' && vastakoe.reunanLeveys > 0,
    JSON.stringify(vastakoe));
  const palasi = (await s.evaluate(MITAT)).piste;
  vaadi(t('VASTAKOE purkautui: piste on taas pelkkä piste'),
    palasi?.halkaisija <= 9 && palasi.varjo === 'none' && palasi.reunanLeveys === 0,
    JSON.stringify(palasi));

  vaadi(t('kalvo ei syö napautusta eikä ole merkkien päällä'),
    linssi.kalvonOsoitin === 'none' && linssi.kalvoMerkkienAlla
      && !linssi.kohdalla.some((x) => x.includes('astro-')),
    `osoitin ${linssi.kalvonOsoitin}, merkkien alla ${linssi.kalvoMerkkienAlla},`
    + ` pisteen kohdalla ${linssi.kohdalla.join(', ')}`);
  // Napautus pisteeseen: linssin oma kortti aukeaa (osuma lasketaan
  // pallon napautuksesta, joten kalvo ei saa olla tiellä).
  /*
   * NAPAUTUS OTETAAN PALLON KESKELTÄ: reunalla merkin ruutupaikka
   * liikkuu vielä kehyksen verran (SwiftShader piirtää kontissa pari
   * kehystä sekunnissa), ja osumasäde on 44 px. Piste haetaan sen
   * jälkeen, kun paikka on ollut kaksi lukemaa paikallaan.
   */
  const vakaaPiste = async () => {
    let edellinen = null;
    for (let i = 0; i < 12; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const p = await s.evaluate(() => {
        const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori');
        const r = kotelo.getBoundingClientRect();
        const keski = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        const ehdokkaat = [...document.querySelectorAll('.satelliitti-piste')]
          .filter((e) => !e.closest('.pallolauta-takana'))
          .map((e) => (e.querySelector('.satelliitti-ydin') ?? e).getBoundingClientRect())
          .filter((b) => b.width > 0)
          .map((b) => ({ x: b.left + b.width / 2, y: b.top + b.height / 2 }))
          .map((p2) => ({ ...p2, etaisyys: Math.hypot(p2.x - keski.x, p2.y - keski.y) }))
          .sort((a, b) => a.etaisyys - b.etaisyys);
        return ehdokkaat[0] ?? null;
      });
      if (p && edellinen && Math.abs(p.x - edellinen.x) < 2 && Math.abs(p.y - edellinen.y) < 2) return p;
      edellinen = p;
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(400);
    }
    return edellinen;
  };
  const AUKI = () => [...document.querySelectorAll(
    '.satelliitti-katselu, .satelliitti-kortti, .satelliitti-popup, .linssikartta-kortti, dialog[open]',
  )].map((e) => e.className || e.tagName);
  const piste = await vakaaPiste();
  const auki0 = await s.evaluate(AUKI);
  let auki1 = [];
  if (piste) {
    await s.mouse.click(piste.x, piste.y);
    await s.waitForTimeout(2500);
    auki1 = await s.evaluate(AUKI);
    // LISÄYS 8: `.satelliitti-sulku` osuu vain KUVAN sulkuun; linssin
    // oma ✕ on `.satelliitti-linssisulku` eikä sitä saa napauttaa tässä.
    await s.evaluate(() => document.querySelector('.satelliitti-katselu .satelliitti-sulku')?.click());
    await s.keyboard.press('Escape');
    await s.waitForTimeout(1000);
  }
  vaadi(t('kohdepiste on yhä klikattavissa'), auki1.length > auki0.length,
    `piste ${JSON.stringify(piste)}, ennen [${auki0}], jälkeen [${auki1}]`);

  /* ---- 7. reliefin tarkkuus ----------------------------------------- */
  const odotettu = NAKYMAT[nimi].viewport.width >= 1024 ? '8k' : '4k';
  vaadi(t(`reliefin tarkkuus on ${odotettu}`),
    linssi.avaruus?.reliefinTarkkuus === odotettu,
    `${linssi.avaruus?.reliefinTarkkuus}, lataus + ladonta `
    + `${linssi.avaruus?.reliefinKestoMs} ms, reliefi pinnalla ${linssi.avaruus?.reliefi}`);
  vaadi(t('reliefi ehti pallon pinnalle'), linssi.avaruus?.reliefi === true,
    `reliefi ${linssi.avaruus?.reliefi}`);

  /* ---- 7b. reliefin kaksi tarkkuutta samalla koneella ---------------- */
  /*
   * VERTAILU MITATAAN SIVULLA: sama ketju (lataus, valo- ja napaliuku,
   * kylläisyys, PNG-blob) ajetaan molemmilla tarkkuuksilla, jotta
   * 8k-päätös nojaa lukuun eikä arvaukseen.
   */
  const ketju = await s.evaluate(async () => {
    const m = await import('/js/linssit/satelliitti-avaruus.js');
    const aja = async (leveys, korkeus, osoite) => {
      const t0 = performance.now();
      // ruudunLeveys mukaan, tai ladonta putoaisi aina puhelinkattoon.
      const url = await m.reliefiTekstuuri({ leveys, korkeus, osoite, ruudunLeveys: innerWidth });
      const kesto = Math.round(performance.now() - t0);
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
      return { kesto, onnistui: Boolean(url) };
    };
    const nelja = await aja(m.RELIEFIN_LEVEYS, m.RELIEFIN_KORKEUS, m.RELIEFIN_OSOITE);
    const kasi = await aja(m.RELIEFIN_8K_LEVEYS, m.RELIEFIN_8K_KORKEUS, m.RELIEFIN_OSOITE_8K);
    const muisti = performance.memory
      ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null;
    return {
      nelja, kasi, muistiMt: muisti,
      // Purettu RGBA-puskuri megatavuina: leveys × korkeus × 4.
      neljaMt: Math.round((m.RELIEFIN_LEVEYS * m.RELIEFIN_KORKEUS * 4) / 1048576),
      kasiMt: Math.round((m.RELIEFIN_8K_LEVEYS * m.RELIEFIN_8K_KORKEUS * 4) / 1048576),
    };
  }).catch((e) => ({ virhe: String(e).split('\n')[0] }));
  vaadi(t('molemmat reliefitarkkuudet latautuvat samalla ketjulla'),
    Boolean(ketju?.nelja?.onnistui && ketju?.kasi?.onnistui),
    JSON.stringify(ketju));

  /* ---- 8. PALLO EI OLE MUSTA ---------------------------------------- */
  /*
   * KAKSI MITTARIA, KOSKA YKSI EI RIITÄ. Osoite pinnalla kertoo, että
   * ketju päätyi johonkin; pikseli kertoo, ettei se johonkin ollut
   * tyhjä kangas. v1924:ssä ensimmäinen olisi ollut vihreä ja toinen
   * punainen — juuri siksi vika ei näkynyt missään mittarissa.
   */
  vaadi(t('pallon pinnalla on osoite (ei mustaa)'),
    Boolean(linssi.avaruus?.pinnanOsoite) && linssi.avaruus.pinnanOsoite !== 'null',
    `pinnanOsoite "${linssi.avaruus?.pinnanOsoite}", reliefi ${linssi.avaruus?.reliefi},`
    + ` kesto ${linssi.avaruus?.reliefinKestoMs} ms`);
  vaadi(t('reliefi ehti pinnalle kahdeksassa sekunnissa'),
    linssi.avaruus?.reliefinKestoMs > 0 && linssi.avaruus.reliefinKestoMs <= 8000,
    `${linssi.avaruus?.reliefinKestoMs} ms`);
  const keskiKuva = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  const keskiKirkkaus = keskipisteenKirkkaus(keskiKuva, { keskiX, keskiY, dpr });
  vaadi(t('pallon keskipiste ei ole musta'), keskiKirkkaus > 20,
    `kirkkaus ${keskiKirkkaus.toFixed(1)} (kynnys 20)`);

  /* ---- kuva raporttiin ---------------------------------------------- */
  if (ULOS) {
    await s.screenshot({
      path: join(ULOS, `astro-pallo-${NAKYMAT[nimi].viewport.width}-20260916.jpg`),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch((e) => console.log(`    (kaappaus ei onnistunut: ${e.message.split('\n')[0]})`));
  }

  vaadi(t('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' | '));
  console.log(`    MITAT ${JSON.stringify(linssi)}`);
  console.log(`    PIKSELIT päällä ${JSON.stringify(paalla)}`);
  console.log(`    PIKSELIT pois   ${JSON.stringify(pois)}`);
  console.log(`    KYLLÄISYYS ${JSON.stringify(kylla)}`);
  console.log(`    RELIEFIKETJU ${JSON.stringify(ketju)}`);
  await konteksti.close();

  /* ---- 2. vastakoe: liikkeenvähennys jäädyttää ISS:n ---------------- */
  const hidas = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'reduce',
  });
  const h = await hidas.newPage();
  await h.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await h.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(h);
  await avaaLinssiEleella(h, 1500);
  /*
   * LIIKKEENVÄHENNYS: zoom on hyppy eikä ajo, eikä pallo pyöri. Mittaus
   * heti avauksen jälkeen — jos ajo olisi käynnissä, se näkyisi tässä.
   */
  const hidasTila = await h.evaluate(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila(),
  );
  vaadi(t('VASTAKOE: liikkeenvähennyksellä zoom on heti perillä eikä pallo pyöri'),
    hidasTila?.avausajo?.kaynnissa === false && hidasTila.avausajo.osuus === 1
      && hidasTila.pyorii === false
      && Math.abs(hidasTila.korkeusNyt - hidasTila.avauskorkeus) < 0.01,
    `ajo ${JSON.stringify(hidasTila?.avausajo)}, pyörii ${hidasTila?.pyorii},`
    + ` korkeus ${hidasTila?.korkeusNyt} (loppu ${hidasTila?.avauskorkeus},`
    + ` alku ${hidasTila?.aloituskorkeus})`);
  await rauhoitu(h);
  const h1 = (await h.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  await h.waitForTimeout(2500);
  const h2 = (await h.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  const liike = h1 && h2 ? Math.hypot(h2.x - h1.x, h2.y - h1.y) : -1;
  vaadi(t('VASTAKOE: liikkeenvähennyksellä ISS on paikallaan mutta näkyvissä'),
    Boolean(h1) && Boolean(h2) && liike < 0.5,
    `${JSON.stringify(h1)} → ${JSON.stringify(h2)}, ${liike.toFixed(2)} px`);
  await hidas.close();

  /* ---- 8b. SAFARIN RAJAT: varapolun on kannettava ------------------- */
  /*
   * Sama linssi, mutta selain teeskentelee iOS Safaria: ei
   * `ctx.filter`ia, ja yli 2048 × 1024 -kankaat ovat tyhjiä. Ennen
   * korjausta tämä tuotti täsmälleen omistajan kuvan — musta pallo,
   * vihreät pisteet ja ISS päällä. Nyt ketju joko ladotaan pienemmälle
   * kankaalle tai jätetään generoituun vyöhykepalloon; kumpikin on
   * väriä, eikä kumpikaan ole musta.
   */
  const safari = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const f = await safari.newPage();
  const safariVirheet = [];
  f.on('pageerror', (e) => safariVirheet.push(String(e)));
  await f.addInitScript(SAFARI_JARJESTELY(2048 * 1024));
  await f.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await f.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(f);
  await avaaLinssiEleella(f, 4500);
  await rauhoitu(f);
  const safariTila = await f.evaluate(MITAT);
  const safariKuva = decodePng(await f.screenshot({ type: 'png', timeout: 120000 }));
  const safariKirkkaus = keskipisteenKirkkaus(safariKuva, { keskiX, keskiY, dpr });
  vaadi(t('SAFARIN RAJOILLA: pallon pinnalla on yhä osoite'),
    Boolean(safariTila.avaruus?.pinnanOsoite) && safariTila.avaruus.pinnanOsoite !== 'null',
    `pinnanOsoite "${safariTila.avaruus?.pinnanOsoite}", reliefi ${safariTila.avaruus?.reliefi}`);
  vaadi(t('SAFARIN RAJOILLA: pallo ei ole musta'), safariKirkkaus > 20,
    `kirkkaus ${safariKirkkaus.toFixed(1)} (kynnys 20), reliefi `
    + `${safariTila.avaruus?.reliefi}, kesto ${safariTila.avaruus?.reliefinKestoMs} ms`);
  vaadi(t('SAFARIN RAJOILLA: ei sivuvirheitä'), safariVirheet.length === 0,
    safariVirheet.slice(0, 2).join(' | '));
  console.log(`    SAFARI-DIAG ${JSON.stringify(safariTila.avaruus?.diag ?? [])}`);
  if (ULOS) {
    await f.screenshot({
      path: join(ULOS, `astro-pallo-safari-${NAKYMAT[nimi].viewport.width}-20260916.jpg`),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch(() => {});
  }
  await safari.close();
}

for (const nimi of Object.keys(NAKYMAT)) {
  if (VALITUT.length && !VALITUT.includes(nimi)) continue;
  await ajaNakyma(nimi);
}

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((r) => !r.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi`);
process.exit(kaatui.length ? 1 : 0);
