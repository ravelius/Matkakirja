// KONTAKTIARKIN WEBIN KUVAT samoilla siirroilla kuin natiivin laitetesti.sh kontakti:
//   keksinnöt: Käynnistä → siirry(10) → 12 s → siirry(11) → 12 s → kuva (kontakti-keksinnot-1873)
//              siirry(25) → jatka → 12 s → kuva (kontakti-keksinnot-loppu)
//   ihmisen matka: Käynnistä → valitse('levantti') → 12 s → tauko → kuva
//   KIINTEA=satelliitti: linssin oma avaus, kuva 15 s kohdalla
//   KIINTEA=radio: radio auki (50/10/6000 km) ja Lontoon asema äänettömänä
//   KIINTEA=maat: vertailu (FIN; +SWE, NOR, DNK) ja maatiedot (JPN)
//   KIINTEA=topografia|vesistot: vain se näkymä (45/10/8000 km tai 0/20/9000 km) tuoreella sivulla
// Oikeat ajastimet (ei nopeutusta), pelaaja Lontoossa kuten natiivin "ui aloita lontoo" (KAUPUNKI=lontoo laitetesti.sh:ssa; webin pallopakassa ei ole Pariisia),
// iPad Pro 11 -mitta 834 × 1194 pt, dpr 2, GPU Metalilla. Ämpäri Noden kautta (CORS).
//
// Käyttö: PLAYWRIGHT_JS=…/playwright/index.js node Linssit-testit/kontakti-web.mjs <ulos> [pelin checkout]
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const ULOS = process.argv[2] ?? '/Users/Shared/Claude/proto-3d/lokit/kontakti-web2';
const JUURI = process.argv[3] ?? '/Users/Shared/Claude/wt/linssiseppa-webmain';
const PORTTI = Number(process.env.PORTTI ?? 8761);
const ODOTUS = Number(process.env.ODOTUS_MS ?? 12000);
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const valimuisti = new Map();
const ampari = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  }
  return valimuisti.get(url);
};

const pw = await import(process.env.PLAYWRIGHT_JS ?? '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const chromium = pw.chromium ?? pw.default?.chromium;
const selain = await chromium.launch({
  args: ['--autoplay-policy=no-user-gesture-required', '--use-angle=metal', '--disable-features=AudioServiceOutOfProcess'],
});
const k = await selain.newContext({ viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
const s = await k.newPage();
const virheet = [];
s.on('pageerror', (e) => virheet.push(String(e)));
// Radion asemavirrat ovat ulkoisia (audio ilman CORSia): radiotilassa ne päästetään läpi.
if (process.env.KIINTEA !== 'radio') await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const v = await ampari(route.request().url());
  if (!v) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
    headers: { 'access-control-allow-origin': '*' } });
});

const ehto = (fn, arg, ms = 90000) => s.waitForFunction(fn, arg, { timeout: ms }).then(() => true).catch(() => false);
const odota = (ms) => s.waitForTimeout(ms);
const kuva = async (nimi) => { await ohita(); await s.screenshot({ path: join(ULOS, `kontakti-${nimi}.png`) }); console.log('kuva', nimi); };

await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
await ehto(() => [...document.querySelectorAll('button')].some((b) => /aloita seikkailu/i.test(b.textContent)));
await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
await ehto(() => Boolean(window.matkakirja?.game?.pack?.cities?.length && window.matkakirja?.ui));
const alku = await s.evaluate(() => {
  const { game, ui } = window.matkakirja;
  const pariisi = game.pack.cities.find((c) => c.id === (window.__kaupunki ?? 'lontoo')) ?? game.pack.cities.find((c) => /lontoo|london/i.test(`${c.id} ${c.name}`));
  if (!pariisi) return `ei Pariisia: ${game.pack.id ?? game.pack.name} ${game.pack.cities.slice(0, 12).map((c) => c.id).join(',')}`;
  if (game.phase === 'pickstart') game.actionPickStart(pariisi.id, 0);
  game.player.pos = { type: 'city', city: pariisi.id };
  game.phase = 'action';
  ui.render();
  return pariisi.id;
});
console.log('pelaaja', alku);
/*
 * Saapumisen luentakuvat ("Lontoo, 1873 …", js/fokusvirta.js) pois Ohita-napista: ne tulevat
 * viiveellä ja jäisivät linssin päälle. Kutsutaan ennen linssejä ja ennen jokaista kuvaa.
 */
const ohita = async () => {
  for (let i = 0; i < 4; i += 1) {
    const n = await s.evaluate(() => {
      const napit = [...document.querySelectorAll('.fokusvirta-ohitanappi')];
      napit.forEach((b) => b.click());
      return napit.length;
    });
    if (!n) return;
    await odota(800);
  }
};
await odota(12000);
await ohita();
await ehto(() => {
  const p = window.matkakirja?.ui?.pallonInstanssi;
  return Boolean(p?.pointOfView && Number.isFinite(p.pointOfView()?.altitude) && window.matkakirja.ui.pallolauta?.zoomirajat);
});

async function avaa(tunnus) {
  await s.evaluate((t) => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes(t)) ui.game.player.linssit.push(t);
    ui.valitseLinssi(t);
  }, tunnus);
  await ehto(() => Boolean(window.matkakirja.ui.aikajana));
  await s.evaluate(async () => { await window.matkakirja.ui.aikajana?.virrat?.valmis; });
  await ehto(() => Boolean(document.querySelector('.aikajana-avaus-nappi')), undefined, 30000);
  await odota(1500);
  await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
}

/*
 * KIINTEÄT NÄKYMÄT (natiivin laitetesti.sh: "kamera lat lon km"): globe.gl:n altitude on maan
 * säteinä. Natiivin kameran näkökenttä on 40° (webin PALLO_FOV 50°), joten samalla korkeudella
 * natiivi näyttää kapeamman alueen: ero kuuluu kameralle, ei linssille.
 */
async function kiintea(tunnus, lat, lng, km, nimi) {
  await s.evaluate((t) => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes(t)) ui.game.player.linssit.push(t);
    ui.valitseLinssi(t);
  }, tunnus);
  await odota(8000);
  // Saapumisen lähikuva voi viedä kameran: Ohita ja kamera kahdesti, viimeksi juuri ennen kuvaa.
  // Pelin oma loitonnusraja (pelaajan maa) sitoo vesistölinssiä; topografia ja satelliitti ohittavat
  // sen itse. Kontaktikuvaa varten sama syrjäytys kaikille (natiivin kamera-komento ei rajaa).
  const aseta = () => s.evaluate(([la, ln, k]) => {
    const u = window.matkakirja.ui;
    u.pallolauta?.zoomirajat?.({ max: 2.5 });
    u.pallonInstanssi.pointOfView({ lat: la, lng: ln, altitude: k / 6371 }, 0);
  }, [lat, lng, km]);
  await ohita();
  await aseta();
  await odota(8000);
  await ohita();
  await aseta();
  await odota(3000);
  console.log(nimi, 'kamera', JSON.stringify(await s.evaluate(() => {
    const u = window.matkakirja.ui;
    return { pov: u.pallonInstanssi?.pointOfView?.(), lauta: u.lauta ?? u.laudanTila ?? null, pallolla: Boolean(u.pallolauta?.aktiivinen ?? u.pallolauta) };
  })));
  await kuva(nimi);
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi?.(null));
  await odota(2000);
}
// Yksi kiinteä näkymä ajoa kohti (KIINTEA=topografia|vesistot): linssin sulku käynnistää
// saapumisen lähikuvan, joka vie seuraavan näkymän tasokartalle.
const KIINTEAT = { topografia: [45, 10, 8000], vesistot: [0, 20, 9000] };
/*
 * MAAT (natiivin laitetesti.sh maat): vertailu kamera 60/15/5000 km, Suomi oletuksena, sitten
 * SWE, NOR, DNK (js/vertailu.js valitseVertailuMaa); maatiedot 36/138/4000 km ja Japani.
 */
/*
 * RADIO (natiivi: linssi radio, radio aani 0, kamera 50 10 6000, radio kaupunki lontoo): linssi
 * auki kiinteällä kameralla, sitten Lontoon asema äänettömänä (js/linssit/radio.js).
 */
/* SATELLIITTI (natiivi: linssi satelliitti, 15 s omaa avausajoa, ei kiinteää kameraa). */
if (process.env.KIINTEA === 'satelliitti') {
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
  });
  await odota(15000);
  await kuva('satelliitti');
  await selain.close(); palvelin.close(); process.exit(0);
}
if (process.env.KIINTEA === 'radio') {
  const kamera = () => s.evaluate(() => {
    const u = window.matkakirja.ui;
    u.pallolauta?.zoomirajat?.({ max: 2.5 });
    u.pallonInstanssi.pointOfView({ lat: 50, lng: 10, altitude: 6000 / 6371 }, 0);
  });
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('radio')) ui.game.player.linssit.push('radio');
    ui.valitseLinssi('radio');
  });
  await odota(6000); await ohita();
  await s.evaluate(async () => { const r = await import('/js/linssit/radio.js'); r.asetaAani(0); });
  await kamera(); await odota(5000);
  await kuva('radio-auki');
  const soi = await s.evaluate(async () => {
    const r = await import('/js/linssit/radio.js');
    r.asetaAani(0);
    return { kanava: Boolean(r.kanavaKaupungille('lontoo')), tulos: String(r.soitaKaupunki('lontoo')) };
  });
  console.log('radio lontoo', JSON.stringify(soi));
  await odota(12000); await kamera(); await odota(2000);
  await kuva('radio-lontoo');
  console.log('radio tila', JSON.stringify(await s.evaluate(async () => (await import('/js/linssit/radio.js')).tilanne?.())));
  await selain.close(); palvelin.close(); process.exit(0);
}
if (process.env.KIINTEA === 'maat') {
  const kamera = (la, ln, km) => s.evaluate(([a, b, k]) => {
    const u = window.matkakirja.ui;
    u.pallolauta?.zoomirajat?.({ max: 2.5 });
    u.pallonInstanssi.pointOfView({ lat: a, lng: b, altitude: k / 6371 }, 0);
  }, [la, ln, km]);
  const valitse = (t) => s.evaluate((x) => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes(x)) ui.game.player.linssit.push(x);
    ui.valitseLinssi(x);
  }, t);
  await valitse('vertailu');
  await odota(5000); await ohita(); await kamera(60, 15, 5000); await odota(6000);
  await kuva('vertailu-fin');
  await s.evaluate(async () => {
    const v = await import('/js/vertailu.js');
    for (const iso of ['SWE', 'NOR', 'DNK']) v.valitseVertailuMaa(window.matkakirja.ui, iso);
  });
  await odota(4000); await kamera(60, 15, 5000); await odota(2000);
  await kuva('vertailu');
  await valitse('maatiedot');
  await odota(5000); await ohita(); await kamera(36, 138, 4000); await odota(5000);
  await s.evaluate(async () => {
    const v = await import('/js/vertailu.js');
    const { ui } = window.matkakirja;
    ui.maatiedotValittu = 'JPN';
    v.piirraMaatiedotMaat(ui);
  });
  await odota(4000); await kamera(36, 138, 4000); await odota(2000);
  await kuva('maatiedot');
  await selain.close(); palvelin.close(); process.exit(0);
}
if (process.env.KIINTEA) {
  const [la, ln, km] = KIINTEAT[process.env.KIINTEA];
  await kiintea(process.env.KIINTEA, la, ln, km, process.env.KIINTEA);
  await selain.close(); palvelin.close(); process.exit(0);
}

/* Keksinnöt */
await avaa('keksinnot');
await odota(3000);
// 1873 on merkkipaalu ilman paikkaa: kamera jää edellisen pysäkin (10, Pietari) lähikuvaan.
await s.evaluate(() => window.matkakirja.ui.aikajana.siirry(10));
await odota(ODOTUS);
await s.evaluate(() => window.matkakirja.ui.aikajana.siirry(11));
await odota(ODOTUS);
await kuva('keksinnot-1873');
await s.evaluate(() => { const a = window.matkakirja.ui.aikajana; a.siirry(25); a.jatka(); });
await ehto(() => window.matkakirja.ui.aikajana?.loppu === true, undefined, 60000);
await odota(ODOTUS);
await kuva('keksinnot-loppu');
await s.evaluate(() => window.matkakirja.ui.valitseLinssi?.(null));
await odota(3000);

/* Ihmisen matka */
await avaa('ihmisen-matka');
/* Avaus (musta, zoomi, Marokko) ensin loppuun: hyppy kesken avauksen menee webissä Marokkoon. */
const t0 = Date.now();
await ehto(() => (window.matkakirja.ui.aikajana?.esitys?.tila?.().indeksi ?? -1) >= 3, undefined, 120000);
console.log('jakso 3 alkoi', Math.round((Date.now() - t0) / 1000), 's Käynnistä-napista');
await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.valitse('levantti'));
await odota(ODOTUS);
await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tauko?.());
await odota(1500);
await kuva('ihmisen-matka-levantti');
const tila = await s.evaluate(() => {
  const p = window.matkakirja.ui.pallonInstanssi?.pointOfView?.();
  return { kamera: p, esitys: window.matkakirja.ui.aikajana?.esitys?.tila?.() };
});
console.log('levantti', JSON.stringify({ kamera: tila.kamera, jakso: tila.esitys?.jakso }));
console.log('sivuvirheitä', virheet.length, virheet.slice(0, 3).join(' | '));
await selain.close();
palvelin.close();
