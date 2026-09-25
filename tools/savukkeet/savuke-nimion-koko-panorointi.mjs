/*
 * SAVUKE: NOSTONIMIÖN KOKO EI RIIPU LADONNASTA EIKÄ PANOROINNISTA
 * (omistajan löydös 21.9.2026, v2021 natiivi iPhone, Camargue z8–9:
 * "Camarguenvarsa" 14 px ja "Camarguen hevoset" 40 px samassa kuvassa;
 * pienen panoroinnin jälkeen "Camarguenvarsa" isona. Fable: nimiön koko
 * riippuu vain kameran korkeudesta ja noston luokasta, ei ladonnasta
 * eikä siitä, mitä muita nimiä ruudussa on; sovittelu saa piilottaa tai
 * siirtää, ei skaalata.)
 *
 * JUURISYY: js/pallolauta/nimiorasterit.js talletti noston `skaala`n ja
 * katon rasterin välimuistiin ENSIMMÄISEN datumin mitasta; saman
 * kategorian ikonit ja sama nosto joka zoomilla lukivat sen vanhan koon.
 *
 * Avaa pallolaudan (GL oletus) WebKitillä puhelinkoossa, vie kameran
 * Camargueen (z8–9), odottaa ladonnan ja rasterit, lukee rungon jokaisen
 * nimiön ruutukorkeuden sovittimen `nostotRungolla()`-listasta (sama
 * kaava kuin shaderissa), panoroi 200 px ja lukee uudestaan. Vartiot:
 *   1. nimiöitä rungolla ≥ 5 (syvimmällä ≥ 3);
 *   2. samalla zoomilla kaikkien nimiöiden korkeus / luokan kerroin on
 *      sama (hajonta ≤ 3 %) — koko ei riipu ladonnasta;
 *   3. panoroinnin (200 px) jälkeen jokaisen ruudulle jääneen nimiön
 *      korkeus on sama kuin ennen (±1 %);
 *   4. panoroinnin jälkeenkin luokan sisäinen hajonta ≤ 3 % (uudet
 *      ruutuun tulleet nimiöt samaa kokoa kuin vanhat);
 *   5. ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=<playwright/index.js> node tools/savukkeet/savuke-nimion-koko-panorointi.mjs
 *       SAVUKE_MOOTTORI=webkit|chromium (oletus webkit)  NAKYMA=puhelin|tyopoyta  ULOS=<kansio>
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const NAKYMA = process.env.NAKYMA ?? 'puhelin';
const ULOS = process.env.ULOS ?? process.argv[2] ?? '/tmp/matkakirja-kaappaukset/nimion-koko-panorointi';
mkdirSync(ULOS, { recursive: true });
const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 },
};
/** Camargue (Rhônen suisto), z8–9 puhelimella: korkeus saapumisnäkymän (0,2) neljäsosa. */
const CAMARGUE = { lat: 43.55, lng: 4.5, altitude: 0.05 };
const PANOROINTI_PX = 120; // 200 px veisi puhelimella (390 px) kaikki Camarguen nimiöt ruudulta; 120 px jättää osan vertailuun.
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: [] });
const virheet = [];
const ctx = await selain.newContext({ ...NAKYMAT[NAKYMA], serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage();
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
sivu.on('console', (m) => { const t = m.text(); if (m.type() === 'error' && /THREE|shader|WebGL|glnimiot|rasteri/i.test(t)) virheet.push(t.slice(0, 600)); });
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
await sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, CAMARGUE);
await sivu.waitForTimeout(5000);

const tulos = { moottori: MOOTTORI, nakyma: NAKYMA, vartiot: [] };
const vartio = (nimi, ok, tieto) => { tulos.vartiot.push({ nimi, ok: Boolean(ok), tieto }); console.log(`${ok ? '✓' : '✗'} ${MOOTTORI}: ${nimi} ${tieto ?? ''}`); };
const p = (x, n = 2) => (Number.isFinite(x) ? x.toFixed(n) : String(x));

/** Odottaa, että jako on tehty ja kaikki kelpoiset nostot ovat rungolla (rasterit valmiit). */
const odotaRunko = async () => {
  await sivu.waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 }).catch(() => {});
  await sivu.waitForFunction(() => {
    const l = window.matkakirja.ui.pallolauta; const s = l.glSovitin?.(); const t = s?.tila?.();
    if (!t || !(t.nostojakoja > 0) || !(t.nostotGl > 0)) return false;
    const dom = [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu')).length;
    return dom === t.nostotCss2d;
  }, null, { timeout: 20000 }).catch(() => {});
  await sivu.waitForTimeout(800);
};
/**
 * Rungon nimiöt: tunnus → { nimi, korkeus, kerroin }. Kerroin on noston
 * luokan oma (nostot.js merkinKerroin: kaupunki 1,35, taso 1 1,3, muu 1),
 * jotta eri luokat vertautuvat samaan mittaan.
 */
const lueNimiot = () => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta; const s = l.glSovitin();
  const { merkinKerroin } = await import('/js/pallolauta/nostot.js');
  const { NOSTOSYM_NIMIO_KOKO, nostosymNimionKattoPxNyt } = await import('/js/fokusnosto-symbolit.js');
  const datumit = new Map(s.viimeisetNostot().map((d) => [d.avain ?? `${d.laji}:${d.id}`, d]));
  const pov = ui.pallonInstanssi.pointOfView();
  const nimiot = s.nostotRungolla()
    .filter((i) => i.tunnus.endsWith('#nimio') && i.opacity > 0)
    .map((i) => {
      const d = datumit.get(i.tunnus.replace(/#nimio$/u, ''));
      // Fontti ruudulla: kirjaston nimiökoko × yksikön ruutumitta (kuori mukana).
      return { tunnus: i.tunnus, nimi: d?.nimi ?? '?', fontti: NOSTOSYM_NIMIO_KOKO * i.mitta, korkeus: i.korkeus, kerroin: merkinKerroin(d), lat: i.lat, lng: i.lng };
    });
  // Katto on kameran kertoimen funktio (fokusnosto-symbolit.js KATTO NOUSEE LÄHIZOOMISSA); luetaan joka mittauksessa.
  return { pov, katto: nostosymNimionKattoPxNyt(), kuori: s.lahde().kuorenKerroin(), nimiot };
});
/*
 * Luokan kerroin puree vain katon alla: katossa (16 px) kaikki luokat
 * ovat tasan katon kokoisia (nostot.js NIMIÖLLÄ ON RUUTUPIKSELIKATTO).
 * Perusmitta = fontti / kerroin katon alla; katossa oleva antaa vain
 * alarajan katto / kerroin.
 */
const hajonta = (nimiot, katto) => {
  const alla = nimiot.filter((n) => n.fontti < katto - 0.05);
  const arvot = alla.map((n) => n.fontti / n.kerroin);
  const keski = arvot.length ? arvot.reduce((a, b) => a + b, 0) / arvot.length : katto;
  const ero = arvot.length >= 2 ? (Math.max(...arvot) - Math.min(...arvot)) / keski : 0;
  // Katossa oleva ei saa olla katossa, jos perusmitta × kerroin jäisi selvästi katon alle.
  const katossaVaarin = nimiot.filter((n) => n.fontti >= katto - 0.05 && arvot.length && keski * n.kerroin < katto * 0.97);
  // Katossa olevat ovat kaikki täsmälleen katon kokoisia (kuoren kerroin sallitaan ±1 %).
  const katossaEriKokoa = nimiot.filter((n) => n.fontti >= katto - 0.05 && Math.abs(n.fontti - katto) > 0.01 * katto);
  return { keski, ero, min: arvot.length ? Math.min(...arvot) : katto, max: arvot.length ? Math.max(...arvot) : katto, alla: alla.length, katossa: nimiot.length - alla.length, katossaVaarin: [...katossaVaarin, ...katossaEriKokoa] };
};
const kuvaa = (nimiot) => nimiot.map((n) => `${n.nimi} ${p(n.fontti, 1)}${n.kerroin !== 1 ? `×${n.kerroin}` : ''}`).join(', ');
const hajontaTeksti = (h) => `hajonta ${p(100 * h.ero, 1)} % (${h.alla} katon alla, ${h.katossa} katossa), perusmitta ${p(h.min, 2)}–${p(h.max, 2)} px`
  + (h.katossaVaarin.length ? `, katossa väärin: ${h.katossaVaarin.map((n) => n.nimi).join(', ')}` : '');
const { width, height } = NAKYMAT[NAKYMA].viewport;
const x0 = width / 2; const y0 = height / 2;
/** Yksi kierros: kamera korkeuteen, mittaus, panorointi hiirellä (OrbitControls ottaa hiiren myös kosketusnäkymässä), mittaus. */
const kierros = async (alt, tunniste, panPx = PANOROINTI_PX, vahintaan = 5) => {
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0), { ...CAMARGUE, altitude: alt });
  await sivu.waitForTimeout(3000);
  await odotaRunko();
  const ennen = await lueNimiot();
  await sivu.screenshot({ path: join(ULOS, `nimion-koko-${MOOTTORI}-${NAKYMA}-${tunniste}-ennen.png`) });
  const camargue = ennen.nimiot.filter((n) => /camargue/iu.test(n.nimi));
  console.log(`INFO  ${MOOTTORI} ${tunniste}: ennen: alt ${p(ennen.pov.altitude, 4)}, kuori ${p(ennen.kuori, 3)}, katto ${p(ennen.katto, 1)} px, nimiöitä ${ennen.nimiot.length}: ${kuvaa(ennen.nimiot)}`);
  // Camarguen nimiöt voivat olla sovittelun piilottamia (ikonit ovat esteitä 22.9.2026): vain määrä vaaditaan.
  vartio(`${tunniste} 1. nimiöitä rungolla ≥ ${vahintaan}`, ennen.nimiot.length >= vahintaan,
    `Camargue ${camargue.length} (${camargue.map((n) => n.nimi).join(', ')}), nimiöitä ${ennen.nimiot.length}`);
  const h1 = hajonta(ennen.nimiot, ennen.katto);
  vartio(`${tunniste} 2. samalla zoomilla nimiön perusmitta sama kaikilla luokasta riippumatta (≤ 3 %)`, h1.ero <= 0.03 && !h1.katossaVaarin.length, hajontaTeksti(h1));
  await sivu.mouse.move(x0, y0); await sivu.mouse.down();
  for (let i = 1; i <= 20; i += 1) { await sivu.mouse.move(x0 - (panPx * i) / 20, y0); await sivu.waitForTimeout(16); }
  await sivu.mouse.up();
  await sivu.waitForTimeout(2500);
  await odotaRunko();
  const jalkeen = await lueNimiot();
  await sivu.screenshot({ path: join(ULOS, `nimion-koko-${MOOTTORI}-${NAKYMA}-${tunniste}-jalkeen.png`) });
  const siirtyi = Math.abs(jalkeen.pov.lng - ennen.pov.lng) > 0.01 || Math.abs(jalkeen.pov.lat - ennen.pov.lat) > 0.01;
  console.log(`INFO  ${MOOTTORI} ${tunniste}: jälkeen: alt ${p(jalkeen.pov.altitude, 4)} (lng ${p(ennen.pov.lng, 3)} → ${p(jalkeen.pov.lng, 3)}), kuori ${p(jalkeen.kuori, 3)}, nimiöitä ${jalkeen.nimiot.length}: ${kuvaa(jalkeen.nimiot)}`);
  const ennenKartta = new Map(ennen.nimiot.map((n) => [n.tunnus, n]));
  const yhteiset = jalkeen.nimiot.filter((n) => ennenKartta.has(n.tunnus));
  const muuttuneet = yhteiset
    .map((n) => ({ nimi: n.nimi, ennen: ennenKartta.get(n.tunnus).fontti, jalkeen: n.fontti }))
    .filter((m) => Math.abs(m.jalkeen - m.ennen) > 0.01 * m.ennen);
  vartio(`${tunniste} 3. panoroinnin jälkeen jokaisen ruudulle jääneen nimiön fontti on sama kuin ennen (±1 %)`,
    siirtyi && yhteiset.length >= 1 && muuttuneet.length === 0,
    `siirtyi ${siirtyi}, yhteisiä ${yhteiset.length}, muuttui ${muuttuneet.length}`
    + (muuttuneet.length ? `: ${muuttuneet.map((m) => `${m.nimi} ${p(m.ennen, 1)} → ${p(m.jalkeen, 1)}`).join(', ')}` : ''));
  const h2 = hajonta(jalkeen.nimiot, jalkeen.katto);
  vartio(`${tunniste} 4. panoroinnin jälkeen nimiön perusmitta sama kaikilla (≤ 3 %)`, h2.ero <= 0.03 && !h2.katossaVaarin.length, hajontaTeksti(h2));
  return { alt, ennen, jalkeen };
};
// Kolme korkeutta: saapumisnäkymä (kerroin 1, katon alla), z7 (kerroin 2, katto 16 px) ja z9 (syvin sallittu, kerroin n. 4,3, katto 22 px; omistajan kuvat).
// Syvimmällä nimiöitä on vähän ja ruutu on kapea: lyhyempi veto, jotta osa jää vertailuun.
tulos.kierrokset = [await kierros(0.2, 'z6'), await kierros(0.1, 'z7'), await kierros(0.025, 'z9', 50, 3)];
tulos.virheet = virheet;
vartio('5. ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
writeFileSync(join(ULOS, `nimion-koko-${MOOTTORI}-${NAKYMA}.json`), JSON.stringify(tulos, null, 1));
await ctx.close();
await selain.close(); palvelin.close();
const kaatui = tulos.vartiot.filter((v) => !v.ok).length;
console.log(`nimion-koko-panorointi ${MOOTTORI}/${NAKYMA}: ${tulos.vartiot.length - kaatui}/${tulos.vartiot.length}`);
process.exit(kaatui ? 1 : 0);
