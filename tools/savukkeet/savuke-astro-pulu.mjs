/*
 * SELAINSAVUKE: PULUN TERVETULO ASTRONAUTIN KAMERASSA (A1–A2).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader" \
 *     node tools/savukkeet/savuke-astro-pulu.mjs
 *
 * Käsikirjoitus: päätoimittaja 28.9.2026 (docs/raportit/
 * pulu-iss-kasikirjoitus-20260928.md), lyhennetty omistajan palautteella
 * 29.9.2026 (B ja C pois, ei kuplia, taulu auki puheen ajan); logiikka
 * js/linssit/pulu-tervetulo.js, yksikkötestit tests/pulu-iss.test.mjs.
 * Yksikkötestit näkevät ajoituksen tynkäkellolla; TÄMÄ mittaa oikealla
 * pallolla ja oikeilla eleven_v4-äänitteillä, että jakso oikeasti tapahtuu.
 *
 * VÄITTEET (ajo 1, koko jakso):
 *   1. Ensimmäisellä avauksella Livia sanoo A1–A2 järjestyksessä.
 *   1b. Ruudulla ei ole Pulun kuplaa koko jakson aikana (omistaja 29.9.).
 *   1c. Pulun taulu on auki, kun Livia puhuu (omistaja 29.9.).
 *   2. Soitin hakee jokaisen repliikin versioidusta R2-avaimesta
 *      (js/liviapuhe.js LIVIAN_VERSIOIDUT_AANET), ja ämpäri vastaa.
 *   3. Livian ääni SOI oikeasti (ui.liviaAani.currentTime kasvaa nollasta —
 *      ei luoteta play()-kutsuun, ks. muistio aanimittaus-currenttime).
 *   4. Tervetulo ei liikuta kameraa: aseman seuranta on lopuksi päällä.
 *   5. Muisti: toinen avaus ei aloita tervetuloa.
 * VÄITTEET (ajo 2, mykistys ja ohitus):
 *   6. Mykistettynä jakso ei ala eikä muistia kuluteta.
 *   7. Ääni päällä jakso alkaa; napautus vaientaa Livian heti eikä uutta
 *      repliikkiä tule.
 *
 * VERKKO: ämpäri Noden fetchin kautta (äänet, Globe.gl, tekstuurit), muu katki.
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
function ulkohaku(url) {
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
const PORTTI = Number(process.env.PORTTI ?? 8771);
await new Promise((r) => palvelin.listen(PORTTI, r));

// Rivikohtaiset Chromium-liput (SAVUKE_CHROMIUM_LIPUT) samalla shimillä kuin sarja-ajossa.
await import('./chromium-liput.mjs');
const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const { LIVIAN_VERSIOIDUT_AANET } = await import('../../js/liviapuhe.js');
const { PULUN_TERVETULO_TALLE } = await import('../../js/linssit/pulu-tervetulo.js');

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Kaaren etäisyys asteina (pallon pinnalla). */

/* Soittimen haut sivulla: jokainen play() jättää osoitteensa. */
const VAHTI = () => {
  window.__puluSoitot = [];
  const vanha = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function play(...a) {
    window.__puluSoitot.push({ src: String(this.currentSrc || this.src || ''), t: Math.round(performance.now()) });
    return vanha.apply(this, a);
  };
};

async function avaaSivu(virheet, haetut) {
  const konteksti = await selain.newContext({
    viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  await konteksti.addInitScript(() => {
    try {
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  });
  await konteksti.addInitScript(VAHTI);
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const url = route.request().url();
    const vastaus = await ulkohaku(url);
    if (/livia-iss-/.test(url)) haetut.push({ url, ok: Boolean(vastaus) });
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virheet.push(String(e?.message ?? e).slice(0, 300)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
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
    ui.render();
  });
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
    // Livia on pelissä: pöllö löydetty ja nappi näkyvissä (kupla tarvitsee sen).
    window.matkakirja.game.polloLoydetty = true;
    window.matkakirjaPollo?.paivitaNakyvyys?.();
  });
  await s.waitForTimeout(1200);
  return pallo;
}

/** Linssi päälle ja odotus, kunnes sen kahva on olemassa (avaus on asynkroninen). */
const avaaLinssi = async (s) => {
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
  });
  await s.waitForFunction(() => Boolean(window.matkakirja.ui.pallolinssi?.kahva), null, { timeout: 30000 })
    .catch(() => {});
  return s.evaluate(() => {
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    return { avattu: Boolean(kahva), tervetulo: Boolean(kahva?.tervetulo) };
  });
};

/** Näytteet sivulla, kunnes jakso on ohi tai katto täynnä. */
const seuraaJaksoa = (s, kattoMs) => s.evaluate(async (katto) => {
  const { lukijaLukee } = await import('/js/lukija.js');
  const kahva = window.matkakirja.ui.pallolinssi?.kahva;
  const naytteet = [];
  const alku = performance.now();
  for (;;) {
    const t = kahva?.tervetulo?.tila?.();
    const pov = window.matkakirja.ui.pallolauta?.pallo?.pointOfView?.();
    // Kaikki Pulun kuplat (pollo.js luoKupla: .pollo-vihje): tervetulon aikana ei yhtään.
    const kaikkiKuplat = [...document.querySelectorAll('.pollo-vihje')].map((k) => k.textContent.trim());
    naytteet.push({
      ms: Math.round(performance.now() - alku),
      vaihe: t?.vaihe, sanotut: t?.sanotut ?? [], puhuu: Boolean(t?.puhuu),
      tauluAuki: Boolean(kahva?.taulu?.tila?.()?.auki),
      pov: pov ? { lat: pov.lat, lng: pov.lng } : null,
      kuvaAuki: document.body.classList.contains('satelliitti-kuva-auki'),
      kuvanNimi: document.body.classList.contains('satelliitti-kuva-auki')
        ? (document.body.innerText.match(/Saharan silmä/) ? 'Saharan silmä' : 'muu') : null,
      kuplat: kaikkiKuplat,
      // 4b: selitteen automaattinen luenta (js/linssit/satelliitti.js
      // lueSelite) ja Livian ääni (currentTime, ei play()-kutsu).
      lukijaLukee: lukijaLukee(),
      liviaCurrentTime: window.matkakirja.ui.liviaAani?.currentTime ?? null,
    });
    if (!t || ['valmis', 'ohitettu', 'pois', 'purettu'].includes(t.vaihe)) break;
    if (performance.now() - alku > katto) break;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => { setTimeout(r, 200); });
  }
  const tila = kahva?.avaruus?.tila?.();
  return { naytteet, issSeuranta: tila?.issSeuranta ?? null };
}, kattoMs);

/* ════════════════ AJO 1: koko jakso ════════════════ */
{
  const virheet = [];
  const haetut = [];
  const { konteksti, sivu: s } = await avaaSivu(virheet, haetut);
  vaadi('pallolauta avautuu', await avaaPeli(s));
  const nappi = await s.evaluate(() => {
    const n = document.querySelector('.pollo-nappi');
    return Boolean(n && !n.hidden);
  });
  vaadi('alkuehto: Livia on pelissä (pöllön nappi näkyy)', nappi);
  const avaus = await avaaLinssi(s);
  vaadi('1. ensimmäinen avaus aloittaa tervetulon', avaus.tervetulo, JSON.stringify(avaus));
  const { naytteet, issSeuranta } = await seuraaJaksoa(s, 150000);
  const viimeinen = naytteet.at(-1) ?? {};
  const odotetut = ['iss-a-1', 'iss-a-2'];
  vaadi('1. A1–A2 järjestyksessä, jakso valmis',
    viimeinen.vaihe === 'valmis' && JSON.stringify(viimeinen.sanotut) === JSON.stringify(odotetut),
    `${viimeinen.vaihe} ${JSON.stringify(viimeinen.sanotut)} (${viimeinen.ms} ms)`);
  const kuplaNaytteet = naytteet.filter((n) => n.vaihe === 'puhuu' && (n.kuplat ?? []).length > 0);
  vaadi('1b. ei Pulun kuplaa tervetulon aikana', kuplaNaytteet.length === 0,
    kuplaNaytteet.length ? `kupla ${kuplaNaytteet.length} näytteessä: ${kuplaNaytteet[0].kuplat[0].slice(0, 40)}` : '');
  const puheNaytteet = naytteet.filter((n) => n.puhuu);
  const tauluKiinni = puheNaytteet.filter((n) => !n.tauluAuki);
  vaadi('1c. Pulun taulu on auki, kun Livia puhuu', puheNaytteet.length > 0 && tauluKiinni.length === 0,
    `${puheNaytteet.length - tauluKiinni.length}/${puheNaytteet.length} näytettä`);

  const soitot = await s.evaluate(() => window.__puluSoitot ?? []);
  const soitetut = odotetut.filter((avain) => soitot.some((x) => x.src.includes(LIVIAN_VERSIOIDUT_AANET[avain])));
  vaadi('2. jokainen repliikki soi versioidusta R2-avaimesta', soitetut.length === odotetut.length,
    `${soitetut.length}/${odotetut.length}`);
  vaadi('2. ämpäri vastasi jokaiseen ISS-äänitteeseen', haetut.length >= odotetut.length && haetut.every((h) => h.ok),
    `${haetut.filter((h) => h.ok).length}/${haetut.length}`);
  const huippu = Math.max(0, ...puheNaytteet.map((n) => n.liviaCurrentTime ?? 0));
  vaadi('3. Livian ääni soi (currentTime kasvaa nollasta)', huippu > 0, `currentTime huippu ${huippu.toFixed(2)} s`);
  vaadi('4. tervetulo ei liikuta kameraa: aseman seuranta jatkuu', issSeuranta === true, `seuranta ${issSeuranta}`);
  const muisti = await s.evaluate((k) => localStorage.getItem(k), PULUN_TERVETULO_TALLE);
  vaadi('5. muisti kirjattu laitteeseen', muisti === '1');
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1500);
  const toinen = await avaaLinssi(s);
  vaadi('5. toinen avaus ei aloita tervetuloa', toinen.avattu && !toinen.tervetulo, JSON.stringify(toinen));
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  vaadi('ajo 1: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

/* ════════════════ AJO 2: mykistys ja ohitus ════════════════ */
{
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(virheet, []);
  await avaaPeli(s);
  await s.evaluate(async () => {
    const { asetaLuentaKytkin } = await import('/js/luenta.js');
    asetaLuentaKytkin(false);
  });
  const mykka = await avaaLinssi(s);
  const muistiMykka = await s.evaluate((k) => localStorage.getItem(k), PULUN_TERVETULO_TALLE);
  vaadi('6. mykistettynä tervetulo ei ala eikä muistia kuluteta', mykka.avattu && !mykka.tervetulo && muistiMykka === null,
    JSON.stringify({ ...mykka, muistiMykka }));
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1500);
  await s.evaluate(async () => {
    const { asetaLuentaKytkin } = await import('/js/luenta.js');
    asetaLuentaKytkin(true);
  });
  const paalla = await avaaLinssi(s);
  vaadi('7. ääni päällä tervetulo alkaa', paalla.tervetulo);
  const alkoi = await s.waitForFunction(
    () => (window.matkakirja.ui.pallolinssi?.kahva?.tervetulo?.tila?.().sanotut?.length ?? 0) >= 1,
    null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  await s.waitForTimeout(2500);
  const ennen = await s.evaluate(() => {
    const a = window.matkakirja.ui.liviaAani;
    return { soi: Boolean(a && !a.paused), aika: a?.currentTime ?? null };
  });
  await s.mouse.click(700, 450);
  await s.waitForTimeout(400);
  const jalkeen = await s.evaluate(() => ({
    tila: window.matkakirja.ui.pallolinssi?.kahva?.tervetulo?.tila?.(),
    liviaAani: Boolean(window.matkakirja.ui.liviaAani),
  }));
  vaadi('7. A1 soi ennen napautusta', alkoi && ennen.soi, JSON.stringify(ennen));
  vaadi('7. napautus ohittaa: Livia vaikenee heti', jalkeen.tila?.vaihe === 'ohitettu' && !jalkeen.liviaAani,
    JSON.stringify({ vaihe: jalkeen.tila?.vaihe, liviaAani: jalkeen.liviaAani }));
  await s.waitForTimeout(15000);
  const myohemmin = await s.evaluate(() => window.matkakirja.ui.pallolinssi?.kahva?.tervetulo?.tila?.().sanotut ?? []);
  vaadi('7. ohituksen jälkeen ei uusia repliikkejä', myohemmin.length === 1, JSON.stringify(myohemmin));
  vaadi('ajo 2: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const lapi = tulokset.filter((t) => t.ok).length;
console.log(`\nSavuke astro-pulu: ${lapi}/${tulokset.length} läpi.`);
process.exit(lapi === tulokset.length ? 0 : 1);
