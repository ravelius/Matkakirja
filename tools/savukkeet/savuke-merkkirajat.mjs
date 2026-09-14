/*
 * Savuke: PÄÄKARTAN MERKKIRAJA JA LÄHIZOOMIPORTTI.
 *
 * Karttauudistuksen erän 10 avoimet kohdat 11.5 ja 11.7.5
 * (docs/raportit/viesti-fable-karttauudistus-era10-20260913.md): 21
 * merkin raja oli rikki seitsemässä maassa, eikä suunnitelman luvun 4.5
 * lupaamaa per-nosto-porttia `nosto.lahi` ollut olemassa. Molemmat
 * ratkaistaan samalla portilla (js/pallolauta/nostot.js merkkiPortti):
 * uloimmalla zoomilla piirtyy enintään 21 tärkeintä merkkiä, loput
 * tulevat näkyviin zoomatessa.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   0. KATTO PITÄÄ KAIKISSA MAISSA. Pelin omalla passilla
 *      (tools/tarkista-nostopaikat.mjs paakartanNostot) ja pelin omalla
 *      portilla (merkkiPortti): yksikään maailman 112 maasta ei päästä
 *      uloimmalla zoomilla yli PAAKARTAN_MERKKIKATTO merkkiä.
 *   0b. VASTAKOE (väite): sama mittaus ILMAN porttia palauttaa
 *      alkuperäiset ylitykset (GRC 33, TUR 29, DEU 28, ESP 25, HRV 23,
 *      ITA 22, RUS 22). Jos ei palauta, vartio 0 ei mittaa porttia.
 *   0c. KOHDEKARTAN KATTO. Maakohtainen luku ≤ KOHDEKARTAN_KATTO ja
 *      yksittäisen kohdekartan pistemäärä ≤ KOHDEKARTAN_PISTEKATTO
 *      (Pariisin mitta, ks. KOHDEKARTAN KATTO alla).
 *   1. ULOIMMALLA ZOOMILLA ENINTÄÄN 21 (selain). Espanja on ainoa
 *      katon ylittävä maa, jonka merkeistä yhtäkään EI ole poltettu
 *      laattoihin (mitattu 14.9.2026), joten se on ainoa maa, jossa
 *      portin vaikutus näkyy ruudulla tänään. Saapumisnäkymässä
 *      Espanjan omia merkkejä on enintään 21.
 *   2. LÄHIZOOMILLA KAIKKI. Yksi zoomiporras sisäänpäin (näkyvä leveys
 *      puoleen) tuo loput näkyviin.
 *   3. `lahi`-NOSTO ON PIILOSSA SAAPUMISNÄKYMÄSSÄ. Yhdelle Espanjan
 *      kohteelle asetetaan ajon ajaksi `lahi: true`: sen on kadottava
 *      saapumisnäkymästä ja palattava lähizoomilla.
 *   3b. VASTAKOE (väite): kun lippu poistetaan, sama kohde palaa
 *      saapumisnäkymään — vartio 3 mittaa siis juuri lippua.
 *   4. KYNNYS ON MITOITETTU RANSKAN SAAPUMISNÄKYMÄSTÄ. Ranskassa
 *      portti on KIINNI saapumisnäkymässä ja AUKI yhden zoomiportaan
 *      päässä; mitatut leveydet tulostetaan INFO-riveille.
 *   5. KOHDEKARTTA PYSYY LUETTAVANA. Rooman ja Pariisin kohdekartta
 *      avataan puhelinruudulla 390 × 844 ja kuvataan — Pariisin 31
 *      pistettä on se mitattu asettelutodiste, jonka takia maakohtainen
 *      katto 17 sai nousta.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä selainvartiot OHITETAAN, Node-vartiot ajetaan.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-merkkirajat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import {
  PAAKARTAN_MERKKIKATTO, merkkiPortti,
} from '../../js/pallolauta/nostot.js';
import { paakartanNostot, kohdekarttojenNostot } from '../tarkista-nostopaikat.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/*
 * ══ KOHDEKARTAN KATTO: MIKSI 17 NOUSI 24:ÄÄN ══════════════════════
 *
 * Erä 10 raportoi Italian kohdekartan olevan "17/17 täynnä". Katto 17
 * oli savukkeen oma vakio (savuke-kaupunkien-nostot.mjs
 * KOHDEKARTAN_KATTO), joka tuli erän 5 suunnitelman valmiusehdosta
 * (karttauudistus-suunnitelma-20260913.md: *"pääkartan merkkimäärä
 * Ranskassa ≤ 21, kohdekartalla ≤ 17"*) eli siitä, mihin Pariisin jako
 * sillä kerralla päätyi. Koodissa lukua ei ole missään: kohdekartan
 * piirto (js/nahtavyydet.js) ei rajaa pisteiden määrää mitenkään.
 *
 * EIKÄ LUKU EDES KOSKE YHTÄ KARTTAA. Se on MAAN nostojen summa kaikilta
 * sen kohdekaupungeilta: Italian 17 jakautuu kolmelle kartalle (Rooma
 * 11, Firenze 3, Venetsia 3) ja Ranskan 17 kahdelle (Pariisi 16,
 * Marseille 1). "Täynnä" ei siis kuvannut mitään asettelun rajaa.
 *
 * ASETTELUN MITTA ON KARTAN PISTEMÄÄRÄ, ja siitä on olemassa mitattu
 * yläraja: Pariisin kohdekartalla on 31 pistettä (Lontoo 24, Wien,
 * Berliini, Madrid ja Rooma 16), ja se on ollut pelissä erästä 5 asti.
 * Katto on siksi kaksiosainen: maakohtainen 24 ja kartan oma 31.
 */
const KOHDEKARTAN_KATTO = 24;
const KOHDEKARTAN_PISTEKATTO = 31;
/** Erän 10 mittaama lähtötila (origin/main): maa → merkkejä pääkartalla. */
const LAHTOTASO = {
  GRC: 33, TUR: 29, DEU: 28, ESP: 25, HRV: 23, ITA: 22, RUS: 22,
};
/**
 * Selainvartioiden maat. Espanja on portin näkyvä koe (0 poltettua
 * merkkiä 25:stä); Ranska on kynnyksen mitoitusmaa.
 */
const KOE = { iso: 'ESP', kaupunki: 'madrid' };
const MITTAMAA = { iso: 'FRA', kaupunki: 'pariisi' };
/** Kohdekartat, joista otetaan puhelinkuva (ks. vartio 5). */
const KUVAKARTAT = ['rooma', 'pariisi'];

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ==================== VARTIOT 0: NODE ==================== */

const { kaikki: rivit, kartalla } = paakartanNostot(MAAILMANKARTTA);
const maat = [...new Set(rivit.map((r) => r.iso))].sort();
const maanMerkit = (iso) => rivit.filter((r) => r.iso === iso && kartalla.has(r.id));

const yli = [];
const ylikoe = [];
for (const iso of maat) {
  const merkit = maanMerkit(iso);
  // Portti saa rivin itsensä kohdeoliona: `tyyppi`, `ihme` ja `lahi`
  // kulkevat rivillä (tools/tarkista-nostopaikat.mjs).
  const portti = merkkiPortti(merkit, false, (m) => m);
  const paastaa = portti.merkit.length - portti.polttovelka.length;
  if (paastaa > PAAKARTAN_MERKKIKATTO) yli.push(`${iso} ${paastaa}`);
  // Vastakoe: portti auki = ei karsintaa lainkaan.
  if (merkkiPortti(merkit, true).merkit.length > PAAKARTAN_MERKKIKATTO) {
    ylikoe.push(`${iso} ${merkit.length}`);
  }
  if (LAHTOTASO[iso]) {
    tieto(`${iso} pääkartalla ennen / jälkeen`,
      `${merkit.length} / ${paastaa} (lähizoomiin ${portti.piiloon.length})`);
  }
}
tieto('maita laudalla', `${maat.length}`);
vaadi(`0. yksikään maa ei päästä yli ${PAAKARTAN_MERKKIKATTO} merkkiä uloimmalla zoomilla`,
  yli.length === 0, yli.join(', '));
vaadi('0b. VASTAKOE — ilman porttia ylitykset ovat yhä siellä',
  ylikoe.length === Object.keys(LAHTOTASO).length,
  `${ylikoe.length} maata: ${ylikoe.join(', ')}`);
for (const [iso, ennen] of Object.entries(LAHTOTASO)) {
  vaadi(`0b-${iso}: lähtötaso on yhä ${ennen} (data ei kadonnut)`,
    maanMerkit(iso).length === ennen, `${maanMerkit(iso).length}`);
}

const linkit = kohdekarttojenNostot();
const kohdeYli = maat.filter((iso) => rivit
  .filter((r) => r.iso === iso && !kartalla.has(r.id) && linkit.has(r.id))
  .length > KOHDEKARTAN_KATTO);
const pisteet = Object.entries(KAUPUNKIKARTAT)
  .map(([k, v]) => [k, (v.kohteet ?? []).length])
  .sort((a, b) => b[1] - a[1]);
tieto('kohdekarttojen pisteet (5 suurinta)',
  pisteet.slice(0, 5).map(([k, n]) => `${k} ${n}`).join(', '));
vaadi(`0c. kohdekartan merkkejä maata kohti ≤ ${KOHDEKARTAN_KATTO}`,
  kohdeYli.length === 0, kohdeYli.join(', '));
vaadi(`0c2. yhdenkään kohdekartan pisteet eivät ylitä ${KOHDEKARTAN_PISTEKATTO}:tä`,
  pisteet[0][1] <= KOHDEKARTAN_PISTEKATTO, `${pisteet[0][0]} ${pisteet[0][1]}`);

/* ==================== VARTIOT 1–5: SELAIN ==================== */

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
}

const tallenne = (aloitus) => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: aloitus }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(aloitus);
  return JSON.stringify(peli.toJSON());
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Peli auki pallolaudalla annetusta kaupungista; palauttaa sivun ja kontekstin. */
async function avaaPeli(kaupunki) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(`${kaupunki}: ${String(e.message ?? e)}`));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${kaupunki}: pallolauta aukesi`, auki);
  if (auki) await sivu.waitForTimeout(3500);
  return { ctx, sivu, auki };
}

/**
 * Yksi mittaus: saapumisnäkymä (`porras` 0) tai N zoomiporrasta
 * sisäänpäin. Palauttaa portin päätöksen ja maan omat merkit ruudulla.
 *
 * `lahiLippu` asettaa annetulle kohdetunnukselle `lahi`-lipun ennen
 * ladontaa ja poistaa sen mittauksen jälkeen (vartiot 3 ja 3b).
 */
const mittaa = (sivu, porras, lahiLippu = null) => sivu.evaluate(async ([n, lippu]) => {
  const l = window.matkakirja.ui.pallolauta;
  const { KOHDE_MAAT, kohteidenNykyinenIso } = await import('/js/fokuskohteet.js');
  const iso = kohteidenNykyinenIso(window.matkakirja.ui);
  const kohde = lippu ? (KOHDE_MAAT[iso] ?? []).find((k) => k.id === lippu) : null;
  if (kohde) kohde.lahi = true;
  await l.saavu({ kesto: 0 });
  await new Promise((v) => setTimeout(v, 1500));
  for (let i = 0; i < n; i += 1) {
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ ...pov, altitude: pov.altitude / 2 }, 0);
    await new Promise((v) => setTimeout(v, 1200));
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
  const portti = l.nostot.portti();
  const osumat = l.nostot.osumat().map((o) => o.id);
  if (kohde) delete kohde.lahi;
  return {
    iso,
    leveys: Math.round(l.kamera.nakyvaAlue().w * 10) / 10,
    uloinOsuus: Math.round((portti?.uloinOsuus ?? 0) * 1000) / 1000,
    paastetyt: portti ? portti.merkit.length - portti.polttovelka.length : null,
    piiloon: portti?.piiloon ?? [],
    polttovelka: portti?.polttovelka ?? [],
    ruudulla: osumat,
  };
}, [porras, lahiLippu]);

/* ---------- VARTIOT 1–3: ESPANJA ---------- */

const koe = await avaaPeli(KOE.kaupunki);
if (koe.auki) {
  const saapuminen = await mittaa(koe.sivu, 0);
  const lahi = await mittaa(koe.sivu, 1);
  tieto(`${KOE.iso} saapumisnäkymä`,
    `leveys ${saapuminen.leveys} (osuus uloimmasta ${saapuminen.uloinOsuus}), portti päästää `
    + `${saapuminen.paastetyt}, lähizoomiin ${saapuminen.piiloon.length}, `
    + `polttovelkaa ${saapuminen.polttovelka.length}`);
  tieto(`${KOE.iso} yksi porras sisään`,
    `leveys ${lahi.leveys} (osuus ${lahi.uloinOsuus}), portti päästää ${lahi.paastetyt}, `
    + `lähizoomiin ${lahi.piiloon.length}`);
  vaadi(`1. ${KOE.iso}: uloimmalla zoomilla enintään ${PAAKARTAN_MERKKIKATTO} merkkiä`,
    saapuminen.paastetyt !== null && saapuminen.paastetyt <= PAAKARTAN_MERKKIKATTO,
    `${saapuminen.paastetyt}`);
  vaadi(`1b. ${KOE.iso}: piilotetut merkit ovat oikeasti poissa ruudulta`,
    saapuminen.piiloon.length > 0
      && saapuminen.piiloon.every((id) => !saapuminen.ruudulla.includes(id)),
    `piilossa ${saapuminen.piiloon.length}`);
  vaadi(`2. ${KOE.iso}: lähizoomilla ylimääräiset tulevat näkyviin`,
    lahi.piiloon.length === 0 && lahi.paastetyt > saapuminen.paastetyt,
    JSON.stringify({ saapuminen: saapuminen.paastetyt, lahi: lahi.paastetyt }));

  // Vartiot 3 ja 3b: `lahi`-lippu yhdelle saapumisnäkymässä näkyvälle
  // kohteelle. Valinta on ensimmäinen ei-kaupunkimerkki, jotta koe ei
  // osu tärkeysjärjestyksen suojattuun luokkaan.
  const kohdeId = await koe.sivu.evaluate(async () => {
    const { KOHDE_MAAT, kohteidenNykyinenIso } = await import('/js/fokuskohteet.js');
    const iso = kohteidenNykyinenIso(window.matkakirja.ui);
    const nakyy = new Set(window.matkakirja.ui.pallolauta.nostot.osumat().map((o) => o.id));
    return (KOHDE_MAAT[iso] ?? [])
      .find((k) => k.tyyppi !== 'kaupunki' && nakyy.has(k.id))?.id ?? null;
  });
  tieto(`${KOE.iso} lahi-kokeen kohde`, kohdeId ?? '(ei löytynyt)');
  vaadi('3c. lahi-kokeelle löytyi kohde', Boolean(kohdeId));
  if (kohdeId) {
    const lipulla = await mittaa(koe.sivu, 0, kohdeId);
    const ilman = await mittaa(koe.sivu, 0);
    const lipullaLahi = await mittaa(koe.sivu, 1, kohdeId);
    vaadi(`3. ${kohdeId}: lahi-nosto on piilossa saapumisnäkymässä`,
      !lipulla.ruudulla.includes(kohdeId) && lipulla.piiloon.includes(kohdeId),
      JSON.stringify({ ruudulla: lipulla.ruudulla.includes(kohdeId) }));
    vaadi(`3b. VASTAKOE — ilman lippua ${kohdeId} on saapumisnäkymässä`,
      ilman.ruudulla.includes(kohdeId), 'ei palannut');
    vaadi(`3d. ${kohdeId}: lahi-nosto palaa lähizoomilla`,
      lipullaLahi.ruudulla.includes(kohdeId), 'ei näy lähizoomilla');
  }
}
await koe.ctx.close();

/* ---------- VARTIO 4: RANSKA, KYNNYKSEN MITOITUS ---------- */

const mitta = await avaaPeli(MITTAMAA.kaupunki);
if (mitta.auki) {
  const saapuminen = await mittaa(mitta.sivu, 0);
  const porras = await mittaa(mitta.sivu, 1);
  tieto(`${MITTAMAA.iso} kynnys`,
    `saapuminen ${saapuminen.leveys} (osuus ${saapuminen.uloinOsuus}), `
    + `porras ${porras.leveys} (osuus ${porras.uloinOsuus})`);
  vaadi(`4. ${MITTAMAA.iso}: portti on kiinni saapumisnäkymässä`,
    saapuminen.piiloon.length > 0 || saapuminen.paastetyt <= PAAKARTAN_MERKKIKATTO,
    `päästi ${saapuminen.paastetyt}`);
  vaadi(`4b. ${MITTAMAA.iso}: portti on auki yhden zoomiportaan päässä`,
    porras.piiloon.length === 0, `piilossa ${porras.piiloon.length}`);
}
await mitta.ctx.close();

/* ---------- VARTIO 5: KOHDEKARTTA PUHELIMESSA ---------- */

for (const kaupunki of KUVAKARTAT) {
  const sessio = await avaaPeli(kaupunki);
  if (sessio.auki) {
    const lehti = await sessio.sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      ui.avaaTutkinta(game.cityOf());
      await new Promise((v) => setTimeout(v, 2600));
      return {
        auki: Boolean(document.querySelector('.kartta-kehys')),
        pisteita: document.querySelectorAll('.kartta-kehys .maakartta-piste').length,
      };
    });
    tieto(`${kaupunki}: kohdekartta 390 × 844`, `pisteitä ${lehti.pisteita}`);
    vaadi(`5. ${kaupunki}: kohdekartta piirtää pisteensä puhelinruudulla`,
      lehti.auki && lehti.pisteita > 0, JSON.stringify(lehti));
    if (KUVAKANSIO && lehti.auki) {
      /*
       * KUVA EI SAA KAATAA AJOA. Kohdekartalla on hengittäviä merkkejä,
       * ja Playwrightin "waiting for element to be stable" jäi kerran
       * odottamaan niitä (Pariisi, 31 pistettä) — vartiot oli jo
       * mitattu, joten kuvan epäonnistuminen on INFO eikä FAIL.
       */
      await sessio.sivu.waitForTimeout(800);
      try {
        await sessio.sivu.locator('.kartta-kehys').first().screenshot({
          path: join(KUVAKANSIO, `merkkirajat-kohdekartta-${kaupunki}.png`),
          scale: 'css',
          animations: 'disabled',
          timeout: 30000,
        });
      } catch (e) {
        tieto(`${kaupunki}: kuvakaappaus ei onnistunut`, String(e.message ?? e).split('\n')[0]);
      }
    }
  }
  await sessio.ctx.close();
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
