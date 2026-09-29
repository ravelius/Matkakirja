/*
 * SELAINSAVUKE: PULUN TERVETULO ASTRONAUTIN KAMERASSA (A–C).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader" \
 *     node tools/savukkeet/savuke-astro-pulu.mjs
 *
 * Käsikirjoitus: päätoimittaja 28.9.2026 (docs/raportit/
 * pulu-iss-kasikirjoitus-20260928.md); logiikka js/linssit/pulu-tervetulo.js,
 * yksikkötestit tests/pulu-iss.test.mjs. Yksikkötestit näkevät ajoituksen
 * tynkäkellolla; TÄMÄ mittaa oikealla pallolla, oikeilla eleven_v4-
 * äänitteillä ja pelin omalla kuplalla, että jakso oikeasti tapahtuu.
 *
 * VÄITTEET (ajo 1, koko jakso):
 *   1. Ensimmäisellä avauksella Livia sanoo A1–C2 järjestyksessä, ja
 *      jokainen repliikki näkyy pelin kuplana kaanonin tekstillä.
 *   2. Soitin hakee jokaisen repliikin versioidusta R2-avaimesta
 *      (js/liviapuhe.js LIVIAN_VERSIOIDUT_AANET), ja ämpäri vastaa.
 *   3. B2 pyöräyttää kameran Venetsian ylle (≤ 3°).
 *   4. C1 avaa väärän kohteen valokuvan (Saharan silmä) — oikea näkymän
 *      vaihto — ja C2 sulkee sen.
 *   4b. LÖYDÖS (Linssiseppä 1 / Päätoimittaja 29.9.2026, PR #3575): C1:n
 *      kuva EI käynnistä selitteen automaattista luentaa (js/lukija.js
 *      lukijaLukee() pysyy epätotena koko C1:n ja C2:n ajan), koska
 *      js/liviapuhe.js:n soitaLivianAani väistäisi muuten sitä eikä C2:n
 *      Livian ääni soisi ollenkaan. C2:n Livian ääni SOI oikeasti
 *      (ui.liviaAani.currentTime kasvaa nollasta — ei luoteta play()-
 *      kutsuun, ks. muistio aanimittaus-currenttime).
 *   5. Jakson lopussa kamera on poissa Venetsiasta, aseman seuranta on
 *      taas päällä (aloitusnäkymä) ja ohitusten kuuntelijat ovat poissa.
 *   6. Muisti: toinen avaus ei aloita tervetuloa.
 * VÄITTEET (ajo 2, mykistys ja ohitus):
 *   7. Mykistettynä jakso ei ala eikä muistia kuluteta.
 *   8. Ääni päällä jakso alkaa; napautus vaientaa Livian heti eikä uutta
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

const { LIVIAN_ISS } = await import('../../js/livia.js');
const { LIVIAN_VERSIOIDUT_AANET } = await import('../../js/liviapuhe.js');
const { PULUN_SUOSIKKI, PULUN_TERVETULO_TALLE } = await import('../../js/linssit/pulu-tervetulo.js');

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Kaaren etäisyys asteina (pallon pinnalla). */
const kulmaEro = (a, b) => {
  const r = Math.PI / 180;
  const c = Math.sin(a.lat * r) * Math.sin(b.lat * r)
    + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.cos((a.lng - b.lng) * r);
  return Math.acos(Math.max(-1, Math.min(1, c))) / r;
};

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
    const kuplat = [...document.querySelectorAll('.pulu-iss-kupla')].map((k) => k.textContent.trim());
    // Pinossa voi olla monta kuplaa; kaikki kirjataan, jotta lyhytkin näkyy.
    const kaikkiKuplat = kuplat.slice();
    naytteet.push({
      ms: Math.round(performance.now() - alku),
      vaihe: t?.vaihe, sanotut: t?.sanotut ?? [], toimet: t?.toimitetut ?? [],
      pov: pov ? { lat: pov.lat, lng: pov.lng } : null,
      kuvaAuki: document.body.classList.contains('satelliitti-kuva-auki'),
      kuvanNimi: document.body.classList.contains('satelliitti-kuva-auki')
        ? (document.body.innerText.match(/Saharan silmä/) ? 'Saharan silmä' : 'muu') : null,
      kupla: kuplat.at(-1) ?? null,
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
  const odotetut = ['iss-a-1', 'iss-a-2', 'iss-b-1', 'iss-b-2', 'iss-c-1', 'iss-c-2'];
  vaadi('1. A1–C2 järjestyksessä, jakso valmis',
    viimeinen.vaihe === 'valmis' && JSON.stringify(viimeinen.sanotut) === JSON.stringify(odotetut),
    `${viimeinen.vaihe} ${JSON.stringify(viimeinen.sanotut)} (${viimeinen.ms} ms)`);
  const nahdytKuplat = new Set(naytteet.flatMap((n) => n.kuplat ?? []).filter(Boolean));
  const tekstit = [...LIVIAN_ISS.a, ...LIVIAN_ISS.b, ...LIVIAN_ISS.c];
  // Kupla ladotaan kappaleiksi (<p>), joten välilyönnit verrataan pois.
  const tiivis = (t) => String(t).replace(/\s+/g, '');
  const puuttuvat = tekstit.filter((t) => ![...nahdytKuplat].some((k) => tiivis(k) === tiivis(t)));
  vaadi('1. jokainen repliikki näkyi kuplana kaanonin tekstillä', puuttuvat.length === 0,
    puuttuvat.length ? `puuttuu: ${puuttuvat.map((t) => t.slice(0, 30)).join(' | ')}` : `${nahdytKuplat.size} kuplaa`);

  const soitot = await s.evaluate(() => window.__puluSoitot ?? []);
  const soitetut = odotetut.filter((avain) => soitot.some((x) => x.src.includes(LIVIAN_VERSIOIDUT_AANET[avain])));
  vaadi('2. jokainen repliikki soi versioidusta R2-avaimesta', soitetut.length === odotetut.length,
    `${soitetut.length}/${odotetut.length}`);
  vaadi('2. ämpäri vastasi jokaiseen ISS-äänitteeseen', haetut.length >= odotetut.length && haetut.every((h) => h.ok),
    `${haetut.filter((h) => h.ok).length}/${haetut.length}`);

  const pyorayta = naytteet.findIndex((n) => n.toimet.includes('pyorayta'));
  const rappaise = naytteet.findIndex((n) => n.toimet.includes('rappaise'));
  const lahin = naytteet.slice(pyorayta, rappaise > 0 ? rappaise : undefined)
    .filter((n) => n.pov).map((n) => kulmaEro(n.pov, { lat: PULUN_SUOSIKKI.lat, lng: PULUN_SUOSIKKI.lon }));
  const lahinEro = lahin.length ? Math.min(...lahin) : Infinity;
  vaadi('3. B2 pyöräyttää kameran Venetsian ylle', pyorayta >= 0 && lahinEro <= 3,
    `lähin ${lahinEro.toFixed(2)}°`);
  const vaaraKuva = naytteet.slice(rappaise).some((n) => n.kuvanNimi === 'Saharan silmä');
  vaadi('4. C1 avaa väärän kohteen valokuvan (Saharan silmä)', rappaise >= 0 && vaaraKuva);
  vaadi('4. C2 sulkee valokuvan', viimeinen.kuvaAuki === false);
  // 4b. Kuva on auki C1:n ja C2:n ajan (kunnes C2 sulkee sen): selitteen
  // automaattinen luenta ei saa käynnistyä sinä aikana, koska se veisi
  // puhevuoron C2:n Livian äänen tieltä (soitaLivianAani väistää kertojaa).
  const kuvaAukiNaytteet = naytteet.slice(rappaise).filter((n) => n.kuvaAuki);
  const seliteLuettiin = kuvaAukiNaytteet.filter((n) => n.lukijaLukee);
  vaadi('4b. C1:n kuva ei käynnistä selitteen automaattista luentaa', rappaise >= 0 && seliteLuettiin.length === 0,
    seliteLuettiin.length ? `luettiin ${seliteLuettiin.length}/${kuvaAukiNaytteet.length} näytteessä` : '');
  const c2Naytteet = naytteet.filter((n) => n.sanotut.includes('iss-c-2'));
  const c2LiviaHuippu = Math.max(0, ...c2Naytteet.map((n) => n.liviaCurrentTime ?? 0));
  vaadi('4b. C2:n Livian ääni soi (currentTime kasvaa nollasta)', c2Naytteet.length > 0 && c2LiviaHuippu > 0,
    `currentTime huippu ${c2LiviaHuippu.toFixed(2)} s (${c2Naytteet.length} näytettä)`);
  const loppuEro = viimeinen.pov ? kulmaEro(viimeinen.pov, { lat: PULUN_SUOSIKKI.lat, lng: PULUN_SUOSIKKI.lon }) : 0;
  vaadi('5. lopuksi kamera on poissa Venetsiasta ja aseman seuranta jatkuu',
    loppuEro > 5 && issSeuranta === true, `ero ${loppuEro.toFixed(1)}°, seuranta ${issSeuranta}`);
  const muisti = await s.evaluate((k) => localStorage.getItem(k), PULUN_TERVETULO_TALLE);
  vaadi('6. muisti kirjattu laitteeseen', muisti === '1');
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1500);
  const toinen = await avaaLinssi(s);
  vaadi('6. toinen avaus ei aloita tervetuloa', toinen.avattu && !toinen.tervetulo, JSON.stringify(toinen));
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
  vaadi('7. mykistettynä tervetulo ei ala eikä muistia kuluteta', mykka.avattu && !mykka.tervetulo && muistiMykka === null,
    JSON.stringify({ ...mykka, muistiMykka }));
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1500);
  await s.evaluate(async () => {
    const { asetaLuentaKytkin } = await import('/js/luenta.js');
    asetaLuentaKytkin(true);
  });
  const paalla = await avaaLinssi(s);
  vaadi('8. ääni päällä tervetulo alkaa', paalla.tervetulo);
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
  vaadi('8. A1 soi ennen napautusta', alkoi && ennen.soi, JSON.stringify(ennen));
  vaadi('8. napautus ohittaa: Livia vaikenee heti', jalkeen.tila?.vaihe === 'ohitettu' && !jalkeen.liviaAani,
    JSON.stringify({ vaihe: jalkeen.tila?.vaihe, liviaAani: jalkeen.liviaAani }));
  await s.waitForTimeout(15000);
  const myohemmin = await s.evaluate(() => window.matkakirja.ui.pallolinssi?.kahva?.tervetulo?.tila?.().sanotut ?? []);
  vaadi('8. ohituksen jälkeen ei uusia repliikkejä', myohemmin.length === 1, JSON.stringify(myohemmin));
  vaadi('ajo 2: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const lapi = tulokset.filter((t) => t.ok).length;
console.log(`\nSavuke astro-pulu: ${lapi}/${tulokset.length} läpi.`);
process.exit(lapi === tulokset.length ? 0 : 1);
