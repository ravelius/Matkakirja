/*
 * Savuke: AVAUSLENTO (Lontoo → kohdekaupunki) kolmelta osin.
 *
 *   node tools/savukkeet/savuke-avauslento.mjs [--kohde sarajevo]
 *
 * Omistajan tilaus 3.9.2026 (Raamattu, AVAUSLENTO VALMIIKSI LADATTUNA):
 * *"kartta pitää ladata etukäteen, nyt se rakentui pikkuhiljaa
 * taustalla valmiiksi. lisäksi muiden kaupunkien kuin lontoon ja
 * kohdekaupungin nimiä ei tarvita. jostain syystä myös kertojan ääni
 * jäi kuulumattomiin vaikka kohdekaupungissa kyllä sitten taas
 * kuului."*
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 *   L1  KARTTA ON VALMIS ENNEN FEIDIÄ. Sillä hetkellä kun
 *       pergamenttiarkki väistyy, näkyvän alueen laatoista ei ole
 *       yhtäkään kesken (js/laattapyramidi.js pyramidinKesken).
 *   L2  VAIN KAKSI NIMEÄ. Lennon aikana kartalla on Lontoo ja
 *       kohdekaupunki — nimikerros (js/karttanimet.js) on lentotilassa
 *       vaiti, eikä ruudulla ole yhtään muuta kaupunki- tai
 *       maastonimeä.
 *   L3  KERTOJA KUULUU. Avauslennon luenta (puhe-lento-alku.mp3)
 *       käynnistyy lennon aikana eikä jää ajastimen taakse.
 *   L4  NIMET PALAAVAT PERILLÄ. Saapumisen jälkeen nimikerros latoo
 *       taas normaalisti.
 *
 * VERKKO: laatat ja äänet tulevat ämpäristä. Kontissa selain ohjataan
 * agenttiproxyn läpi (HTTPS_PROXY) — ilman sitä kartta jäisi tyhjäksi
 * eikä L1 mittaisi mitään.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const KOHDE = valitsin('kohde', 'ateena');
const HIDASTUS = Number(valitsin('hidastus', '1')) || 1;
const KAAPPAUS = valitsin('kaappaus',
  join(JUURI, 'tools/savukkeet/kaappaukset/avauslento.png'));

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = req.url.split('?')[0];
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {
    'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream',
  });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1194 },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
  ignoreHTTPSErrors: true,
});
const sivu = await ctx.newPage();

/*
 * ÄÄNIVAHTI ENNEN MODUULEJA. Jokainen Audio-olio kirjaa osoitteensa ja
 * sen, meniko play() läpi — juuri sitä L3 mittaa, eikä sitä voi lukea
 * jälkikäteen mistään (soinut ääni ei jätä jälkeä DOMiin).
 */
await sivu.addInitScript(() => {
  window.__aanet = [];
  const alku = performance.now();
  const OikeaAudio = window.Audio;
  const kirjaa = (audio) => {
    const rivi = { src: '', soi: false, virhe: null, ms: null };
    window.__aanet.push(rivi);
    const paivitaSrc = () => { rivi.src = audio.getAttribute('src') ?? audio.src ?? ''; };
    const oikeaPlay = audio.play.bind(audio);
    // eslint-disable-next-line no-param-reassign
    audio.play = () => {
      paivitaSrc();
      rivi.ms = Math.round(performance.now() - alku);
      return oikeaPlay().then((v) => { rivi.soi = true; return v; })
        .catch((e) => { rivi.virhe = e?.name ?? String(e); throw e; });
    };
    paivitaSrc();
    return audio;
  };
  window.Audio = function Audio(...args) {
    return kirjaa(new OikeaAudio(...args));
  };
  window.Audio.prototype = OikeaAudio.prototype;
});

/*
 * ÄMPÄRI NODEN KAUTTA. Kontin selain ei pääse verkkoon (agenttiproxy
 * ottaa vain CONNECT-tunneleita), mutta Noden fetch pääsee
 * (NODE_USE_ENV_PROXY=1). Sama osoite haetaan kerran ja tarjoillaan
 * välimuistista, joten lento ei mittaa verkon hitautta vaan pelin
 * odotusta.
 */
const valimuisti = new Map();
await sivu.route('**r2.dev/**', async (route) => {
  const url = route.request().url();
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      body: Buffer.from(await v.arrayBuffer()),
    })).catch((e) => ({ status: 502, contentType: 'text/plain', body: Buffer.from(String(e)) })));
  }
  route.fulfill(await valimuisti.get(url));
});
// Pöllöpalvelin ei kuulu lentokohtaukseen.
await sivu.route('**workers.dev/**', (route) => route.abort());

/*
 * PÄÄSÄIKEEN HIDASTUS (--hidastus 6) jäljittelee omistajan iPadia:
 * juuri sen alla ajastimeen ripustettu luenta myöhästyy lennon ohi.
 */
if (HIDASTUS > 1) {
  const cdp = await ctx.newCDPSession(sivu);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: HIDASTUS });
}

const lokit = [];
sivu.on('console', (v) => lokit.push(`${v.type()}: ${v.text()}`));
sivu.on('pageerror', (v) => lokit.push(`pageerror: ${v.message}`));

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

// Aloitusportti (äänet päälle) ja sen jälkeen kartalle.
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => { window.matkakirja.ui.aloitaKartalta(); });
await sivu.waitForTimeout(2500);

/*
 * MITTAUS ALKAA NAPAUTUKSESTA. Näytteet otetaan 200 ms välein koko
 * lennon ajan: arkin väistymisen hetki (aloitusverho poistuu DOMista)
 * on se, jota L1 katsoo, eikä sitä voi odottaa jälkikäteen.
 */
await sivu.evaluate((kohde) => {
  const ui = window.matkakirja.ui;
  window.__nayte = [];
  window.__vaihe = { verhoPois: null, lentoAlkoi: null };
  const nyt = () => Math.round(performance.now());
  const nimet = () => [...(ui.karttanimiKerros?.querySelectorAll('text') ?? [])]
    .map((t) => t.textContent);
  const lentonimet = () => [...(ui.flightLayer?.querySelectorAll('.aloituslento-nimi') ?? [])]
    .map((t) => t.textContent);
  const kesken = () => {
    let n = 0;
    for (const tila of [ui.pyramidiKarkea, ui.pyramidiTarkka]) {
      if (!tila) continue;
      for (const kuva of tila.laatat.values()) {
        if (kuva.dataset.odottaa === '1' && kuva.dataset.ladattu !== '1') n += 1;
      }
    }
    return n;
  };
  const laattoja = () => (ui.pyramidiTarkka?.laatat?.size ?? 0)
    + (ui.pyramidiKarkea?.laatat?.size ?? 0);
  window.__vahti = setInterval(() => {
    const verho = Boolean(ui.aloitusverho?.isConnected);
    const lento = document.body.classList.contains('kartalento');
    const nayte = {
      t: nyt(), verho, lento, kesken: kesken(), laattoja: laattoja(),
      nimia: nimet().length, nimet: nimet(), lentonimet: lentonimet(),
    };
    window.__nayte.push(nayte);
    if (!verho && window.__vaihe.verhoPois === null && window.__nayte.length > 1) {
      window.__vaihe.verhoPois = nayte;
    }
    if (lento && window.__vaihe.lentoAlkoi === null) window.__vaihe.lentoAlkoi = nayte;
  }, 200);
  const city = window.matkakirja.game.board.cityById.get(kohde);
  ui.doPickStart(city);
}, KOHDE);

// Kaappaus keskeltä lentoa.
await sivu.waitForTimeout(6500);
mkdirSync(dirname(KAAPPAUS), { recursive: true });
// scale: 'css' pitää kaappauksen repokelpoisen kokoisena (ei dpr-kertaa).
await sivu.screenshot({ path: KAAPPAUS, scale: 'css' });
const lennonTila = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    kartalento: document.body.classList.contains('kartalento'),
    nimet: [...(ui.karttanimiKerros?.querySelectorAll('text') ?? [])].map((t) => t.textContent),
    lentonimet: [...(ui.flightLayer?.querySelectorAll('.aloituslento-nimi') ?? [])]
      .map((t) => t.textContent),
    merkkeja: ui.karttanimiKerros?.querySelectorAll('.karttamerkki').length ?? 0,
    maastonimia: [...(ui.maastonimiKerros?.querySelectorAll('text') ?? [])]
      .map((t) => t.textContent),
  };
});

// Lento loppuun ja saapuminen.
await sivu.waitForTimeout(16000);
const tulos = await sivu.evaluate(() => {
  clearInterval(window.__vahti);
  const ui = window.matkakirja.ui;
  return {
    nayte: window.__nayte,
    vaihe: window.__vaihe,
    aanet: window.__aanet,
    perillaNimia: (ui.karttanimiKerros?.querySelectorAll('text') ?? []).length,
    kartalento: document.body.classList.contains('kartalento'),
  };
});
await sivu.screenshot({ path: KAAPPAUS.replace(/\.png$/, '-perilla.png'), scale: 'css' });

/* ---------------------------------------------------------- vartiot */

const verhoPois = tulos.vaihe.verhoPois;
console.log('\nNÄYTTEET (t, verho, lento, keskenLaattoja, laattoja, nimiä)');
for (const n of tulos.nayte.slice(0, 40)) {
  console.log(`  ${String(n.t).padStart(6)}  ${n.verho ? 'arkki' : '     '} `
    + `${n.lento ? 'lento' : '     '}  kesken=${String(n.kesken).padStart(3)} `
    + `laattoja=${String(n.laattoja).padStart(3)}  nimiä=${n.nimia}`
    + `  lentonimet=[${n.lentonimet.join(', ')}]`);
}

vaadi('L1 kartta valmis ennen feidiä',
  verhoPois != null && verhoPois.kesken === 0 && verhoPois.laattoja > 0,
  verhoPois ? `kesken=${verhoPois.kesken} laattoja=${verhoPois.laattoja}`
    : 'arkin väistymistä ei havaittu');

const lennonNimet = lennonTila.nimet;
vaadi('L2 nimikerros vaiti lennon aikana', lennonNimet.length === 0,
  `kerroksessa ${lennonNimet.length} nimeä: ${lennonNimet.slice(0, 12).join(', ')}`);
vaadi('L2b Lontoo ja kohde näkyvät lennon omalla kerroksella',
  lennonTila.lentonimet.length === 2,
  `lentonimet: [${lennonTila.lentonimet.join(', ')}]`);
vaadi('L2c ei karttamerkkejä lennon aikana', lennonTila.merkkeja === 0,
  `${lennonTila.merkkeja} merkkiä`);
vaadi('L2d ei maastonimiä lennon aikana', lennonTila.maastonimia.length === 0,
  `maastonimet: ${lennonTila.maastonimia.slice(0, 10).join(', ')}`);

const kertoja = tulos.aanet.find((a) => /puhe-lento-alku/.test(a.src));
vaadi('L3 kertojan luenta käynnistyi', Boolean(kertoja?.soi),
  kertoja ? `virhe=${kertoja.virhe} src=${kertoja.src}` : 'ääntä ei luotu lainkaan');

vaadi('L4 nimet palaavat perillä', tulos.perillaNimia > 0,
  `perillä ${tulos.perillaNimia} nimeä`);

console.log('\nÄÄNET:');
for (const a of tulos.aanet) console.log(`  ${a.ms ?? '-'} ms  soi=${a.soi} virhe=${a.virhe} ${a.src}`);
const varoitukset = lokit.filter((r) => /warn|error|pageerror/i.test(r));
if (varoitukset.length) {
  console.log('\nLOKI:');
  for (const r of varoitukset.slice(0, 20)) console.log(`  ${r}`);
}
console.log(`\nKAAPPAUS ${KAAPPAUS}`);
console.log(`\n${lapi}/${kaikki} vartiota läpi`);

await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
