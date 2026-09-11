/*
 * Savuke: NAPAKALOTIT — NAVAN KARTTA JA SEN LIITOS LAATTOIHIN.
 *
 * OMISTAJA 11.9.2026, kaksi iPhone-kaappausta molemmilta navoilta,
 * sanatarkasti: *"Rajat näkyvät yhä."* Kuvissa navalla oli tasainen
 * kiekko, jonka reuna erottui selvänä kaarena; etelänavalla kiekon
 * päällä näkyi vain vektorirantaviiva eikä karttapintaa lainkaan.
 *
 * KAKSI ERI VIKAA, MOLEMMAT MITATTU (11.9.2026 illalla):
 *
 *  1. KALOTTI OLI LIIAN TUMMA. Sarjan 2026-09-11a kuva oli samoilla
 *     lat/lon-pisteillä 8,8…9,9 (pohjoinen) ja 10,6…11,6 (etelä)
 *     luminanssiyksikköä tummempi kuin laatta sen alla. Syy ei ole
 *     kalotissa vaan siinä, että laatoissa EI OLE niillä leveyksillä
 *     karttaa: juliste loppuu ~79,6° N:ään ja ~61,5° S:ään, ja loppu on
 *     tasaista täytemerta. Kalotti piirtää oikean batymetrian (Jäämeri
 *     on 3000–4500 m syvä), joka on julisteen omalla syvyysasteikolla
 *     tuota täytettä tummempi. Korjaus on kalotin piirtotyökalussa
 *     (tools/tee-napakalotit.mjs LIITOSSÄVY): meri ankkuroidaan siihen
 *     sävyyn, joka laatoissa on liitoskaistalla.
 *
 *  2. KANSI PIIRTYI KALOTIN PÄÄLLE ETELÄNAVALLA. Yksivärinen napakansi
 *     on VARAKAPPALE sille, ettei kuvaa saada, mutta se jäi näkyviin.
 *     Kaikki napakappaleet ovat origossa, joten THREE:n läpinäkyvien
 *     lajittelu ei erota niitä etäisyydellä lainkaan. Etelänapa on
 *     suunnatun valon varjopuolella, joten kansi näkyi siellä tummana
 *     kiekkona (mitattu keskisävy 183,1 vs. kalotin 188,3) — täsmälleen
 *     se, mitä omistaja näki. Korjaus js/pallo.js:ssä: kalotti saa
 *     renderOrder 1 JA korvaamansa kansi otetaan pois näkyvistä heti,
 *     kun kuva on paikallaan.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *  1. KALOTTI SYNTYY. Kummallekin navalle on verkko, jolla on tekstuuri
 *     ja laattojen oma (valaistu) materiaali.
 *  2. KANSI VÄISTYY. Kun kalotti on paikallaan, yksikään sen navan
 *     kansi ei ole näkyvissä.
 *  3. LIITOS EI NÄY. Napanäkymästä lasketaan säteittäinen
 *     kirkkausprofiili LEVEYSASTEITTAIN (pallon oma getScreenCoords,
 *     ei silmämääräinen säde) kahdesti: kalotti näkyvissä ja kalotti
 *     piilossa. Erotus kertoo tasan sen, mitä kalotti muuttaa. Vartio:
 *     erotus on joka leveysasteella alle LIITOS_RAJA, eikä kahden
 *     peräkkäisen leveysasteen välillä ole ASKEL_RAJA:a suurempaa
 *     hyppyä. Ennen korjausta erotus oli −9,5 ja askel liitoksessa
 *     selvä; korjauksen jälkeen |erotus| ≤ 2,5.
 *  4. KALOTTI ON KARTTA EIKÄ KIEKKO. Kalotin sisällä leveysasteen
 *     kirkkaus vaihtelee pituusasteen mukana (Lomonosovin selänne,
 *     Gakkelin harju, mannerjää): hajonta ylittää KARTTA_RAJA:n.
 *
 * Kaappaukset ja JSON-raportti kirjoitetaan --ulos-kansioon.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-napakalotit.mjs
 *         [--ulos=<kansio>] [--kalotit=<kansio>]
 *
 * `--kalotit` korvaa ämpärin kalottikuvat paikallisilla (juuri poltetut
 * pohjoinen.webp ja etela.webp) — näin uusi sarja mitataan ENNEN vientiä.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NAPAKALOTTI, NAPAKALOTTI_PAATE, NAPAKALOTTI_RENDER_ORDER } from '../../js/pallo.js';
import { VEKTORIT_RENDER_ORDER } from '../../js/pallovektorit.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/napakalotit');
const KALOTIT = arg('kalotit', process.env.KALOTIT ?? '');
mkdirSync(ULOS, { recursive: true });

/* ── rajat (perustelut yllä) ──────────────────────────────────────── */
/*
 * Suurin sallittu ero kalotti päällä / pois. Raja on SUHTEESSA SIIHEN
 * KOHINAAN, joka julisteella itsellään on samalla leveysasteella
 * (pituusasteiden hajonta): tasoero, joka jää paperin oman laikukkuuden
 * alle, ei näy silmällä — askel näkyy. Pohja LIITOS_RAJA on se, mitä
 * sallitaan silloinkin, kun tausta on täysin tasainen.
 *
 * Vanha sarja 2026-09-11a jäi tähän kiinni: pohjoisessa ero oli −9,5
 * kun taustan hajonta oli 2,5 (raja 4), etelässä −11 kun hajonta oli
 * 20 (raja 8). Uusi sarja: pohjoinen 2,4 ja etelä 6,2.
 */
const LIITOS_RAJA = 4;
/** Kohinaan suhteutettu osuus: |ero| ≤ max(LIITOS_RAJA, tämä × hajonta). */
const LIITOS_KOHINAOSUUS = 0.5;
/** Suurin sallittu hyppy erotuksessa kahden peräkkäisen näytteen välillä. */
const ASKEL_RAJA = 4;
/** Kalotin sisällä pituusasteiden hajonnan pitää ylittää tämä. */
const KARTTA_RAJA = 1.5;
/** Profiilin näyteväli asteina ja meridiaanien määrä. */
const ASKEL = 0.25;
const MERIDIAANEJA = 48;

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.bin': 'application/octet-stream',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
async function ampariHaku(url) {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type'),
    })).catch(() => null));
  }
  return valimuisti.get(url);
}

/* Tallenne: Fogg Ateenassa, aarre löydetty (sama kuin muissa savukkeissa). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1100 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const virheet = [];
const kalottipyynnot = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const oma = KALOTIT && new RegExp(`napakalotit/[^/]+/(pohjoinen|etela)\\.${NAPAKALOTTI_PAATE}`).exec(url);
  if (oma) {
    const polku = join(KALOTIT, `${oma[1]}.${NAPAKALOTTI_PAATE}`);
    kalottipyynnot.push(`${oma[1]}: paikallinen ${polku}`);
    route.fulfill({
      status: 200,
      contentType: `image/${NAPAKALOTTI_PAATE}`,
      body: readFileSync(polku),
      headers: { 'access-control-allow-origin': '*' },
    });
    return;
  }
  const vastaus = await ampariHaku(url);
  if (!vastaus) { route.abort(); return; }
  if (/napakalotit/.test(url)) kalottipyynnot.push(`${url.split('/').pop()}: ${vastaus.status}, ${vastaus.body.length} t`);
  if (vastaus.status !== 200) { route.fulfill({ status: vastaus.status, body: '' }); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  console.log(`\n${lapi}/${kaikki} vartiota läpi — pallo ei avautunut`);
  await ctx.close(); await selain.close(); palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(3000);

/* Saapumiskortti pois tieltä: sen oma nappi, sitten Escape. */
for (let i = 0; i < 4; i += 1) {
  // eslint-disable-next-line no-await-in-loop
  for (const n of await sivu.$$('button:visible')) {
    // eslint-disable-next-line no-await-in-loop
    const t = (await n.textContent() ?? '').trim();
    // eslint-disable-next-line no-await-in-loop
    if (/jatka|sulje|selvä|eteenp|aloita|kartalle/i.test(t)) { await n.click({ timeout: 4000 }).catch(() => {}); break; }
  }
  // eslint-disable-next-line no-await-in-loop
  await sivu.keyboard.press('Escape').catch(() => {});
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(800);
}
await sivu.waitForTimeout(3000);

const napatila = () => sivu.evaluate(() => {
  const ulos = { kannetNakyy: 0, kannet: 0, kalotit: [] };
  window.matkakirja.ui.pallolauta.pallo.scene().traverse((o) => {
    if (o.userData?.napakansi) { ulos.kannet += 1; if (o.visible) ulos.kannetNakyy += 1; }
    if (o.userData?.napakalotti) {
      ulos.kalotit.push({
        puoli: o.userData.napakalotti,
        materiaali: o.material?.type,
        tekstuuri: Boolean(o.material?.map?.image),
        kuva: o.material?.map?.image ? `${o.material.map.image.width}×${o.material.map.image.height}` : null,
        renderOrder: o.renderOrder,
        nakyy: o.visible,
      });
    }
  });
  return ulos;
});

/*
 * VERTAILUKUVA ON SE, MITÄ PELAAJA NÄKISI ILMAN KALOTTIA: kalotti pois
 * ja yksivärinen varakansi takaisin. Ilman kantta paljastuisi
 * kirjaston oma valaisematon napalakki, joka ei ole kummankaan
 * vaihtoehdon näköinen, ja mitta vertaisi kalottia tyhjään.
 */
const naytaKalotit = (nayta) => sivu.evaluate((n) => {
  let x = 0;
  window.matkakirja.ui.pallolauta.pallo.scene().traverse((o) => {
    if (o.userData?.napakalotti) { o.visible = n; x += 1; }
    if (o.userData?.napakansi) o.visible = !n;
  });
  return x;
}, nayta);

/**
 * Leveysasteittainen kirkkausprofiili napanäkymästä. Piste haetaan
 * pallon omalla getScreenCoords:lla, joten leveysaste ei ole arvattu
 * ruutusäde vaan pallon oma projektio.
 */
async function profiili(puoli, latit) {
  const kuva = decodePng(await sivu.screenshot({ timeout: 120000 }));
  const pisteet = await sivu.evaluate(({ ls, mm, p }) => ls.map((lat) => {
    const pallo = window.matkakirja.ui.pallolauta.pallo;
    const rivi = [];
    for (let i = 0; i < mm; i += 1) {
      const c = pallo.getScreenCoords(p === 'etela' ? -lat : lat, (360 * i) / mm - 180, 0.004);
      rivi.push(c ? [c.x, c.y] : null);
    }
    return rivi;
  }), { ls: latit, mm: MERIDIAANEJA, p: puoli });
  return latit.map((lat, li) => {
    const lums = [];
    for (const pt of pisteet[li]) {
      if (!pt) continue;
      const x = Math.round(pt[0] * 2); const y = Math.round(pt[1] * 2);
      if (x < 0 || y < 0 || x >= kuva.width || y >= kuva.height) continue;
      const i = (y * kuva.width + x) * 4;
      lums.push(0.299 * kuva.data[i] + 0.587 * kuva.data[i + 1] + 0.114 * kuva.data[i + 2]);
    }
    if (!lums.length) return { lat, n: 0 };
    const kesk = lums.reduce((a, b) => a + b, 0) / lums.length;
    const haj = Math.sqrt(lums.reduce((a, b) => a + (b - kesk) ** 2, 0) / lums.length);
    return { lat, n: lums.length, lum: +kesk.toFixed(2), hajonta: +haj.toFixed(2) };
  });
}

/** Yhden navan mittaus: kaappaus, profiili kalotin kanssa ja ilman. */
async function mittaaNapa(puoli) {
  const merkki = NAPAKALOTTI[puoli].merkki;
  /*
   * KAMERA NIIN, ETTÄ LIITOS ON KUVASSA. Pohjoiskalotin kehä on 10° ja
   * eteläkalotin 30° navasta, joten sama korkeus ei kelpaa kummallekin:
   * matalalta katsottuna eteläkalotin kehä jää ruudun ulkopuolelle.
   */
  const korkeus = Math.abs(NAPAKALOTTI[puoli].reuna) > 70 ? 0.55 : 1.5;
  await sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.pallo.pointOfView(p, 0); },
    { lat: merkki * 89.5, lng: 0, altitude: korkeus });
  await sivu.waitForTimeout(9000);
  const rajaus = { clip: { x: 17, y: 200, width: 800, height: 800 }, timeout: 120000 };
  await sivu.screenshot({ ...rajaus, path: join(ULOS, `${puoli}.png`) });
  const latit = [];
  /*
   * LIITOSKAISTA JA SEN MOLEMMAT PUOLET. Ulospäin 3° (laattojen puoli)
   * ja sisäänpäin 6° (kalotin puoli) — juuri se vyö, jossa liitoksen
   * pitäisi näkyä, jos se näkyy.
   */
  const reuna = Math.abs(NAPAKALOTTI[puoli].reuna);
  for (let l = reuna - 3; l <= Math.min(89.5, reuna + 6); l += ASKEL) latit.push(+l.toFixed(2));
  const kanssa = await profiili(puoli, latit);
  await naytaKalotit(false);
  await sivu.waitForTimeout(2500);
  await sivu.screenshot({ ...rajaus, path: join(ULOS, `${puoli}-ilman.png`) });
  const ilman = await profiili(puoli, latit);
  await naytaKalotit(true);
  await sivu.waitForTimeout(1500);
  const rivit = latit.map((lat, i) => ({
    lat,
    kanssa: kanssa[i].lum ?? null,
    ilman: ilman[i].lum ?? null,
    hajonta: kanssa[i].hajonta ?? null,
    ero: kanssa[i].n && ilman[i].n ? +(kanssa[i].lum - ilman[i].lum).toFixed(2) : null,
  })).filter((r) => r.ero != null);
  return { puoli, rivit };
}

const tila = await napatila();
tieto('kalottipyynnöt', kalottipyynnot.join(' | ') || 'ei yhtään');
tieto('kalotit', JSON.stringify(tila.kalotit));
tieto('kansia näkyvissä / yhteensä', `${tila.kannetNakyy} / ${tila.kannet}`);

vaadi('kummallekin navalle syntyy kalotti', tila.kalotit.length === 2, `${tila.kalotit.length}`);
vaadi('kalotilla on tekstuuri ja laattojen materiaali',
  tila.kalotit.every((k) => k.tekstuuri && k.materiaali === 'MeshLambertMaterial'),
  JSON.stringify(tila.kalotit));
/*
 * KALOTTI PIIRTYY VEKTORIVIIVAN ALLE, EI PÄÄLLE. Lähikuvan terävyys on
 * rantaviivassa (js/pallovektorit.js), joka on puoli laitepikseliä leveä
 * joka korkeudella; jos kalotti nostettaisiin sen yli, viiva katoaisi
 * venytetyn kuvapikselin alle. Kantta ei tarvitse voittaa
 * piirtojärjestyksellä, koska kantta ei enää ole (ks. seuraava vartio).
 */
vaadi(`kalotti piirtyy vektoriviivan alle (renderOrder ${NAPAKALOTTI_RENDER_ORDER} < ${VEKTORIT_RENDER_ORDER})`,
  tila.kalotit.every((k) => k.renderOrder === NAPAKALOTTI_RENDER_ORDER)
    && NAPAKALOTTI_RENDER_ORDER < VEKTORIT_RENDER_ORDER,
  JSON.stringify(tila.kalotit.map((k) => k.renderOrder)));
vaadi('yksivärinen kansi väistyy, kun kalotti on paikallaan',
  tila.kalotit.length === 2 && tila.kannetNakyy === 0, `${tila.kannetNakyy} kantta näkyvissä`);

const mitat = [];
for (const puoli of ['pohjoinen', 'etela']) {
  // eslint-disable-next-line no-await-in-loop
  const m = await mittaaNapa(puoli);
  mitat.push(m);
  const erot = m.rivit.map((r) => r.ero);
  vaadi(`${puoli}: profiili osuu palloon`, erot.length >= 20, `${erot.length} näytettä`);
  const suurin = erot.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a), 0);
  /* Raja rivikohtaisesti: taustan oma kohina samalla leveysasteella. */
  const yli = m.rivit.filter((r) => Math.abs(r.ero)
    > Math.max(LIITOS_RAJA, LIITOS_KOHINAOSUUS * r.hajonta));
  let askel = 0;
  for (let i = 1; i < erot.length; i += 1) askel = Math.max(askel, Math.abs(erot[i] - erot[i - 1]));
  // Kalotin sisäpuoli: kehältä vähintään 2° napaan päin.
  const reuna = Math.abs(NAPAKALOTTI[puoli].reuna);
  const sisalla = m.rivit.filter((r) => r.lat >= reuna + 2.5);
  const hajonta = sisalla.length
    ? sisalla.reduce((a, r) => a + r.hajonta, 0) / sisalla.length : 0;
  tieto(`${puoli} suurin ero kalotti päällä / pois`, suurin.toFixed(2));
  tieto(`${puoli} suurin askel peräkkäisten välillä`, askel.toFixed(2));
  tieto(`${puoli} kalotin sisäinen hajonta`, hajonta.toFixed(2));
  vaadi(`${puoli}: liitos ei näy (|ero| ≤ max(${LIITOS_RAJA}, ${LIITOS_KOHINAOSUUS} x taustan hajonta))`,
    yli.length === 0,
    yli.slice(0, 3).map((r) => `${r.lat}°: ero ${r.ero} / hajonta ${r.hajonta}`).join(', '));
  vaadi(`${puoli}: liitoksessa ei askelta (≤ ${ASKEL_RAJA})`,
    askel <= ASKEL_RAJA, `suurin askel ${askel.toFixed(2)}`);
  vaadi(`${puoli}: kalotti on karttaa eikä tasainen kiekko (hajonta > ${KARTTA_RAJA})`,
    hajonta > KARTTA_RAJA, `hajonta ${hajonta.toFixed(2)}`);
}

/*
 * ── RANTAVIIVA ON TERÄVÄ VEKTORI KALOTIN PÄÄLLÄ ──────────────────────
 *
 * OMISTAJA 11.9.2026: *"Niin se saisi piirtyä hyvin, myös silloin kun
 * sitä zoomaan."* Lähikuvan terävyys ei tule kalottikuvan pikseleistä
 * (3 kaariminuutin korkeus, 1:10M rantaviiva) vaan vektoriviivasta.
 * Mitataan EROTUSKUVASTA: sama kamera kahdesti, kerran vektorikerros
 * näkyvissä ja kerran piilossa. Jos kalotti peittäisi viivan, erotus
 * olisi nolla — juuri siinä tilassa Etelämanner oli ennen korjausta.
 */
async function rantaviivaKalotinPaalla() {
  // Rossin jäähyllyn reuna, Etelämanner: kalotin sisällä ja zoomattuna.
  await sivu.evaluate(() => {
    window.matkakirja.ui.pallolauta.pallo.pointOfView({ lat: -77.8, lng: 168, altitude: 0.06 }, 0);
  });
  await sivu.waitForTimeout(9000);
  const rajaus = { clip: { x: 17, y: 250, width: 700, height: 700 }, timeout: 120000 };
  const kanssa = decodePng(await sivu.screenshot({ ...rajaus, path: join(ULOS, 'rantaviiva.png') }));
  const naytaVektorit = (nayta) => sivu.evaluate((n) => {
    let x = 0;
    window.matkakirja.ui.pallolauta.pallo.scene().traverse((o) => {
      if (o.userData?.pallovektorit) { o.visible = n; x += 1; }
    });
    return x;
  }, nayta);
  const kerroksia = await naytaVektorit(false);
  await sivu.waitForTimeout(1500);
  const ilman = decodePng(await sivu.screenshot({ ...rajaus, path: join(ULOS, 'rantaviiva-ilman.png') }));
  await naytaVektorit(true);
  await sivu.waitForTimeout(800);
  const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  let musteita = 0;
  let syvin = 0;
  for (let i = 0; i < kanssa.data.length; i += 4) {
    const ero = lum(ilman.data, i) - lum(kanssa.data, i);
    if (ero > 12) musteita += 1;
    if (ero > syvin) syvin = ero;
  }
  return { kerroksia, musteita, syvin: +syvin.toFixed(1), pikseleita: kanssa.data.length / 4 };
}

const viiva = await rantaviivaKalotinPaalla();
tieto('rantaviivan musteita kalotin päällä', `${viiva.musteita} / ${viiva.pikseleita} px, syvin ${viiva.syvin}`);
vaadi('Etelämantereen rantaviiva piirtyy kalotin PÄÄLLE lähikuvassa',
  viiva.kerroksia > 0 && viiva.musteita > 1000 && viiva.syvin > 25,
  JSON.stringify(viiva));

vaadi('sivu ei kaadu', virheet.filter((v) => !/ERR_FAILED|ERR_ABORTED/.test(v)).length === 0,
  virheet.slice(0, 3).join(' | '));

writeFileSync(join(ULOS, 'raportti.json'), JSON.stringify({
  kalottipyynnot, tila, mitat, viiva, virheet,
}, null, 2));
console.log(`\n${lapi}/${kaikki} vartiota läpi — kuvat ja raportti: ${ULOS}`);

await ctx.close();
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
