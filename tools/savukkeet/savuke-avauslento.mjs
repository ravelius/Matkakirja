/*
 * Savuke: AVAUSLENTO (Lontoo → kohdekaupunki) kolmelta osin.
 *
 *   node tools/savukkeet/savuke-avauslento.mjs [--kohde sarajevo]
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-avauslento.mjs --lauta pallo
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
 * === KAKSI LAUTAA, SAMA AVAUS (pallolauta vaihe 5b) ================
 *
 * `--lauta pallo` lentää saman avauksen KARTTAPALLOLLA
 * (docs/moduulit/karttapallo.md luku 4 rivi "Aloituslento Lontoosta",
 * luku 7 vaihe 5). Silloin L-vartioiden tilalle tulevat P-vartiot,
 * koska niukkuus, nimet ja kone ovat pallon omissa kerroksissa:
 *
 *   P1  TASOKARTTA EI HERÄÄ LAINKAAN. svg#board on tyhjä joka
 *       näytteessä napautuksesta perille, eikä laattapyramidiin lähde
 *       yhtäkään pyyntöä (omistaja: *"vanha kartta pysyy pois tieltä"*).
 *   P2  LENTO ON PALLOLLA. Lennon aikana pallolla on yksi kaari
 *       (arcsData) ja yksi kone (.pallolauta-kone) — samat kerrokset
 *       kuin vaiheen 2 lennolla.
 *   P3  EI SUMENNUSTA. Pallolla ei ole lennon aikana harsoa eikä
 *       muutakaan kalvoa kotelon päällä (omistaja 5.9.2026 klo 00.35:
 *       *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta"*),
 *       ja terävä laatutila on pakotettuna päälle koko lennon ajan.
 *   P4  EI YHTÄÄN YLIMÄÄRÄISTÄ NIMEÄ, EI PELITILAA. Lennon aikana
 *       pallolla saa olla vain Lontoon ja kohdekaupungin nimet — ei
 *       nappulaa eikä kohteita; perillä nappula on takaisin.
 *
 *       KAKSI NIMEÄ EI ENÄÄ KELPAA VAATIMUKSEKSI (6.9.2026). Kamera
 *       seuraa nyt konetta lähikuvassa (js/pallolauta/avaus.js), joten
 *       reitin toinen pää on kuvan ulkopuolella suurimman osan lennosta
 *       eikä sen nimeä ladota lainkaan: mitattuna lennon keskellä
 *       ruudulla oli vain kohdekaupungin nimi. Vartio mittaa siksi sitä,
 *       mikä on sääntö — että MIKÄÄN MUU kaupunki ei saa nimeä.
 *   P5  TEKSTIT JA ÄÄNET SAMOISTA KOUKUISTA. Lentokalvo, repliikin rivi
 *       ja kertojan äänite (puhe-lento-alku.mp3) ovat samat kuin
 *       tasokartalla — koreografia on yhteinen (js/ui.js).
 *   P6  PERILLÄ LEHTI AUKEAA. Kohdekaupungin napautus pallolta avaa
 *       kaupunkilehden (omistaja 2.9.2026).
 *   P7  KAMERA PERILLÄ. Näkymän keskipiste on kohdekaupungissa ±5 %
 *       näkyvästä leveydestä ja leveys on saapumisporras ±5 %.
 *
 * VERKKO: laatat ja äänet tulevat ämpäristä. Kontissa selain ohjataan
 * agenttiproxyn läpi (HTTPS_PROXY) — ilman sitä kartta jäisi tyhjäksi
 * eikä L1 mittaisi mitään. Pallolla ämpäri on pakollinen: Globe.gl ja
 * laatat tulevat sieltä.
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
const LAUTA = valitsin('lauta', 'kartta');
if (!['kartta', 'pallo'].includes(LAUTA)) {
  console.error(`tuntematon lauta: ${LAUTA} (kartta|pallo)`);
  process.exit(2);
}
const PALLOLLA = LAUTA === 'pallo';
const HIDASTUS = Number(valitsin('hidastus', '1')) || 1;
const KAAPPAUS = valitsin('kaappaus',
  join(JUURI, `tools/savukkeet/kaappaukset/avauslento${PALLOLLA ? '-pallo' : ''}.png`));

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
const osoite = `http://127.0.0.1:${palvelin.address().port}/?lauta=${LAUTA}`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  /*
   * WebGL ohjelmistorasteroijalla, kuten savuke-etusivupallossa: ilman
   * näitä lippuja Globe.gl ei rakenna kontekstia kontissa, ja
   * `--lauta pallo` mittaisi varapolkua eikä avauslentoa. Kartalla
   * liput eivät vaikuta mihinkään.
   */
  args: ['--autoplay-policy=no-user-gesture-required',
    '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
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
/*
 * ÄMPÄRIN OSOITE ON media.matkakirja.app, EI pub-*.r2.dev (korjattu
 * 6.9.2026). Reitti kuunteli yhä vanhaa r2.dev-isäntää, joten kaikki
 * ämpäriliikenne — Globe.gl, laatat, kuvat — meni selaimen omaan
 * verkkoon ja kaatui ERR_CONNECTION_RESETiin: `--lauta pallo` mittasi
 * 0/7, koska palloa ei koskaan rakennettu. Molemmat isännät kelpaavat,
 * jottei vanha osoite jää kiinni jos se vielä jossain elää.
 *
 * CORS-OTSAKE ON PAKOLLINEN. Laatat ladataan THREE:n tekstuurina
 * (crossOrigin), joten ilman `access-control-allow-origin`-otsaketta
 * selain hylkää täytetyn vastauksen ja pallo jää mustaksi — mitattu
 * 6.9.2026: ilman otsaketta laattapyyntöjä 2, otsakkeen kanssa 673.
 */
const valimuisti = new Map();
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const url = route.request().url();
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
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
// Pyramidipyynnöt lasketaan verkosta: pallolaudalla niitä ei saa olla
// yhtäkään koko avauksesta perille (P1).
const pyynnot = { pyramidi: 0, pallolaatat: 0 };
sivu.on('request', (r) => {
  const url = r.url();
  if (url.includes('julisteet/pyramidi')) pyynnot.pyramidi += 1;
  if (url.includes('julisteet/pallo/laatat')) pyynnot.pallolaatat += 1;
});

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
await sivu.evaluate(async (kohde) => {
  const ui = window.matkakirja.ui;
  /*
   * Terävän laatutilan pakotus (js/pallo.js pakotaPallonLaatu) ei näy
   * DOMissa, joten moduuli tuodaan samasta osoitteesta kuin peli — sama
   * URL, sama moduuli-instanssi, sama laskuri (P3).
   */
  window.__pallo = await import('/js/pallo.js').catch(() => null);
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
  // Pallolaudan omat luvut samaan näytteeseen (vaihe 5b): kartalla ne
  // ovat nollia eivätkä häiritse L-vartioita.
  const pallonTila = () => ({
    pallo: Boolean(ui.pallolauta),
    svgLapsia: ui.svg?.childElementCount ?? 0,
    kaaria: ui.pallonInstanssi?.arcsData?.().length ?? 0,
    koneita: document.querySelectorAll('.pallolauta-kone').length,
    harso: Boolean(document.querySelector('.pallolauta-harso')),
    laatuPakotettu: Boolean(window.__pallo?.pallonLaatuPakotettu?.()),
    pallonimia: [...document.querySelectorAll('.pallolauta-nimi')]
      .map((e) => e.dataset.kaupunki),
    nappuloita: document.querySelectorAll('.pallolauta-nappula').length,
    kohteita: document.querySelectorAll('.pallolauta-kohde').length,
    kalvo: Boolean(document.querySelector('.flight-overlay')),
    repliikki: document.querySelector('.flight-line')?.textContent ?? '',
  });
  window.__vahti = setInterval(() => {
    const verho = Boolean(ui.aloitusverho?.isConnected);
    const lento = document.body.classList.contains('kartalento');
    const nayte = {
      t: nyt(), verho, lento, kesken: kesken(), laattoja: laattoja(),
      nimia: nimet().length, nimet: nimet(), lentonimet: lentonimet(),
      ...pallonTila(),
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

/*
 * KAAPPAUS KESKELTÄ LENTOA. Kartalla lento alkaa muutamassa sekunnissa;
 * pallolla arkin takana ladataan vielä Globe.gl ja ensimmäiset laatat,
 * joten hetki haetaan koneesta eikä kellosta.
 */
if (PALLOLLA) {
  await sivu.waitForFunction(() => document.querySelectorAll('.pallolauta-kone').length > 0,
    null, { timeout: 90000 }).catch(() => console.log('HUOM  konetta ei näkynyt 90 s:ssa'));
  // Arkki väistyy vasta kun laatat ovat perillä; kaappaus on lennosta,
  // ei pergamentista.
  await sivu.waitForFunction(() => !document.querySelector('.aloitusverho'),
    null, { timeout: 60000 }).catch(() => console.log('HUOM  arkki ei väistynyt 60 s:ssa'));
  await sivu.waitForTimeout(2500);
} else {
  await sivu.waitForTimeout(6500);
}
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
    // Pallolaudan lentotila (vaihe 5b).
    pallo: Boolean(ui.pallolauta),
    svgLapsia: ui.svg?.childElementCount ?? 0,
    kaaria: ui.pallonInstanssi?.arcsData?.().length ?? 0,
    koneita: document.querySelectorAll('.pallolauta-kone').length,
    harso: Boolean(document.querySelector('.pallolauta-harso')),
    laatuPakotettu: Boolean(window.__pallo?.pallonLaatuPakotettu?.()),
    pallonimia: [...document.querySelectorAll('.pallolauta-nimi')].map((e) => e.dataset.kaupunki),
    nappuloita: document.querySelectorAll('.pallolauta-nappula').length,
    kohteita: document.querySelectorAll('.pallolauta-kohde').length,
    kalvo: Boolean(document.querySelector('.flight-overlay')),
    repliikki: document.querySelector('.flight-line')?.textContent ?? '',
  };
});

// Lento loppuun ja saapuminen.
if (PALLOLLA) {
  await sivu.waitForFunction(() => !document.body.classList.contains('kartalento'),
    null, { timeout: 90000 }).catch(() => console.log('HUOM  lento ei päättynyt 90 s:ssa'));
  await sivu.waitForTimeout(6000);
} else {
  await sivu.waitForTimeout(16000);
}
const tulos = await sivu.evaluate((kohde) => {
  clearInterval(window.__vahti);
  const ui = window.matkakirja.ui;
  const kaupunki = window.matkakirja.game.board.cityById.get(kohde);
  const kamera = ui.pallolauta?.kamera?.kameranTila?.() ?? null;
  return {
    nayte: window.__nayte,
    vaihe: window.__vaihe,
    aanet: window.__aanet,
    perillaNimia: (ui.karttanimiKerros?.querySelectorAll('text') ?? []).length,
    kartalento: document.body.classList.contains('kartalento'),
    // Perillä pallolla: kamera kohdekaupungissa, nappula takaisin,
    // harso poissa ja svg#board yhä tyhjä.
    pallo: Boolean(ui.pallolauta),
    pallolautaPaalla: Boolean(ui.pallolautaPaalla?.()),
    svgLapsia: ui.svg?.childElementCount ?? 0,
    harso: Boolean(document.querySelector('.pallolauta-harso')),
    laatuPakotettu: Boolean(window.__pallo?.pallonLaatuPakotettu?.()),
    koneita: document.querySelectorAll('.pallolauta-kone').length,
    nappuloita: document.querySelectorAll('.pallolauta-nappula').length,
    kaaria: ui.pallonInstanssi?.arcsData?.().length ?? 0,
    kamera,
    kaupunki: kaupunki ? { x: kaupunki.x, y: kaupunki.y, name: kaupunki.name } : null,
    paikka: ui.game?.player?.pos?.city ?? null,
  };
}, KOHDE);
await sivu.screenshot({ path: KAAPPAUS.replace(/\.png$/, '-perilla.png'), scale: 'css' });

// P6: kohdekaupungin napautus pallolta avaa kaupunkilehden.
const lehti = PALLOLLA ? await sivu.evaluate(async (kohde) => {
  const ui = window.matkakirja.ui;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  // Saapumisen annosteluvirta (kuplat, kortit) varaa pelin hetkeksi;
  // napautus otetaan vastaan vasta kun peli on vapaa.
  for (let i = 0; i < 40 && ui.busy; i += 1) await odota(250);
  const tulos = ui.pallolauta?.napautaKaupunki(kohde);
  await odota(1500);
  return {
    tulos: Boolean(tulos),
    busy: Boolean(ui.busy),
    auki: Boolean(ui.arrivalDialog?.open),
    lehti: ui.lehtitila?.arrivalShownFor ?? null,
  };
}, KOHDE) : null;

/* ---------------------------------------------------------- vartiot */

const verhoPois = tulos.vaihe.verhoPois;
if (PALLOLLA) {
  console.log('\nNÄYTTEET (t, verho, lento, svg#board, kaaria, koneita, harso, nimet)');
  for (const n of tulos.nayte) {
    console.log(`  ${String(n.t).padStart(6)}  ${n.verho ? 'arkki' : '     '} `
      + `${n.lento ? 'lento' : '     '}  svg=${String(n.svgLapsia).padStart(3)} `
      + `kaaria=${n.kaaria} koneita=${n.koneita} harso=${n.harso ? 'on' : '- '} `
      + `laatu=${n.laatuPakotettu ? 'terävä' : '-     '}`
      + `  nimet=[${n.pallonimia.join(', ')}]  nappula=${n.nappuloita} kohteet=${n.kohteita}`);
  }
  /*
   * P1 mittaa laudan vaihdosta eteenpäin. Aloitusnäyttö (pickstart) on
   * yhä oma pieni tasolautansa (js/packs/maailma.js) tekstin takana —
   * etusivun esirenderöity pallo on eri erä (karttapallo.md luku 0
   * kohta 5) — joten ensimmäisissä näytteissä svg#board on vielä sen.
   * Napautuksesta eteenpäin sen pitää olla tyhjä eikä maailmankartan
   * pyramidiin saa lähteä yhtäkään pyyntöä.
   */
  const avauksenJalkeen = tulos.nayte.filter((n) => n.pallo || n.lento);
  const svgSuurin = Math.max(0, ...avauksenJalkeen.map((n) => n.svgLapsia));
  const svgIntro = Math.max(0, ...tulos.nayte.map((n) => n.svgLapsia));

  // Lepokerros (js/pallo.js luoLepokerros) pyytää levossa pyramidin
  // laattoja samoista osoitteista kuin tasokartta: tasokartan pyynnöt
  // ovat erotus (savuke-pallolauta, vartio 2).
  const lepokerroksenPyynnot = await sivu.evaluate(() => {
    const m = window.matkakirja.ui.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
    return m ? m.pyyntoja + (m.luettelo ? 1 : 0) : 0;
  });
  const tasokartanPyynnot = pyynnot.pyramidi - lepokerroksenPyynnot;
  vaadi('P1 tasokartta ei herää: svg#board tyhjä ja tasokartan pyramidipyyntöjä 0',
    svgSuurin === 0 && tasokartanPyynnot <= 0 && tulos.svgLapsia === 0,
    `svg#board enimmillään ${svgSuurin} lasta, tasokartan pyramidipyyntöjä ${tasokartanPyynnot} (lepokerros ${lepokerroksenPyynnot})`);
  console.log(`INFO  aloitusnäytön oma lauta ennen vaihdosta: svg#board enintään ${svgIntro} lasta`);
  vaadi('P2 lento pallolla: kaari ja kone',
    lennonTila.pallo && lennonTila.kaaria === 1 && lennonTila.koneita === 1,
    `pallo=${lennonTila.pallo} kaaria=${lennonTila.kaaria} koneita=${lennonTila.koneita}`);
  vaadi('P3 ei sumennusta lennolla; terävä laatu pakotettuna ja vapautettuna perillä',
    !lennonTila.harso && !tulos.harso && lennonTila.laatuPakotettu && !tulos.laatuPakotettu,
    `harso lennolla=${lennonTila.harso} perillä=${tulos.harso}, `
    + `laatu pakotettu lennolla=${lennonTila.laatuPakotettu} perillä=${tulos.laatuPakotettu}`);
  const sallitutNimet = new Set(['lontoo', KOHDE]);
  const ylimaaraiset = lennonTila.pallonimia.filter((id) => !sallitutNimet.has(id));
  vaadi('P4 vain Lontoo ja kohde, ei pelitilaa lennon aikana',
    lennonTila.pallonimia.length > 0 && ylimaaraiset.length === 0
      && lennonTila.nappuloita === 0 && lennonTila.kohteita === 0,
    `nimet=[${lennonTila.pallonimia.join(', ')}] ylimääräiset=[${ylimaaraiset.join(', ')}] `
    + `nappula=${lennonTila.nappuloita} kohteet=${lennonTila.kohteita}`);
  const kertojaP = tulos.aanet.find((a) => /puhe-lento-alku/.test(a.src));
  vaadi('P5 tekstit ja äänet samoista koukuista (kalvo, repliikki, kertoja)',
    lennonTila.kalvo && lennonTila.repliikki.trim().length > 0 && Boolean(kertojaP?.soi),
    `kalvo=${lennonTila.kalvo} repliikki="${lennonTila.repliikki.slice(0, 40)}" kertoja=${kertojaP?.soi}`);
  vaadi('P6 perillä kaupunkilehti aukeaa napautuksesta',
    Boolean(lehti?.auki) && lehti?.lehti === KOHDE, `lehti=${JSON.stringify(lehti)}`);
  const kamera = tulos.kamera;
  const kaupunki = tulos.kaupunki;
  const poikkeama = kamera && kaupunki
    ? Math.hypot(kamera.x - kaupunki.x, kamera.y - kaupunki.y) / kamera.leveys : Infinity;
  const leveysero = kamera ? Math.abs(kamera.leveys - 240) / 240 : Infinity;
  vaadi('P7 kamera perillä kohdekaupungissa ±5 %',
    poikkeama <= 0.05 && leveysero <= 0.05,
    `poikkeama ${(poikkeama * 100).toFixed(1)} % näkyvästä leveydestä, leveys ${kamera?.leveys?.toFixed(1)} (odotus 240)`);
  console.log(`\nINFO  nappula perillä: ${tulos.nappuloita}, kaaria perillä: ${tulos.kaaria}, `
    + `kone perillä: ${tulos.koneita}, pallolaattoja pyydetty: ${pyynnot.pallolaatat}`);
  console.log('\nÄÄNET:');
  for (const a of tulos.aanet) console.log(`  ${a.ms ?? '-'} ms  soi=${a.soi} virhe=${a.virhe} ${a.src}`);
  const varoituksetP = lokit.filter((r) => /warn|error|pageerror/i.test(r));
  if (varoituksetP.length) {
    console.log('\nLOKI:');
    for (const r of varoituksetP.slice(0, 20)) console.log(`  ${r}`);
  }
  console.log(`\nKAAPPAUS ${KAAPPAUS}`);
  console.log(`\n${lapi}/${kaikki} vartiota läpi`);
  await selain.close();
  palvelin.close();
  process.exit(lapi === kaikki ? 0 : 1);
}

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
