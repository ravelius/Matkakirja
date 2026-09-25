/*
 * SELAINSAVUKE: IHMISEN MATKAN PULU KYSYY SIITÄ, MISSÄ PELAAJA ON
 * (Raamattu, "IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET JOKA JAKSOON",
 * omistaja 19.9.2026 klo 18.02; js/linssit/ihmisen-matka-pulukysymykset.js,
 * js/pollo.js naytaLinssinValmiit / vastaaLinssinValmiilla).
 *
 *   PLAYWRIGHT_JS=<polku>/playwright/index.js CHROMIUM=<selain> \
 *     node tools/savukkeet/savuke-ihmisen-pulukysymykset.mjs
 *
 * VÄITTEET (390 × 844):
 *   1. Tutkimusvaiheessa (muisti) pulun paneeli aukeaa ILMAN yleistä
 *      tervehdystä, ja sen tilalla ovat viimeisen jakson (aotearoa)
 *      kolme valmista kysymystä nappeina.
 *   2. Napautus näyttää kysymyksen ja ESIKIRJOITETUN vastauksen
 *      lähdelinkkeineen, eikä sivulta lähde yhtään POST-pyyntöä
 *      (ei mallikutsua); kaksi muuta kysymystä jäävät tarjolle.
 *   3. Nostokortti (denisova) auki → paneelin kysymykset vaihtuvat
 *      noston omiin.
 *   4. Lisänoston kortti (toba) → sen `kysymykset`-kentän kysymykset.
 *   5. Linssin sulku → kysely pois ui:sta (tavallinen tervehdys palaa).
 *   6. Ei sivuvirheitä.
 *   7. Kortti esityksen aikana: kysymys vastaa kortissa, ✕ sulkee,
 *      esitys jatkuu (Sonnet 1:n kierros 11, kuva 08).
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI_VALIMUISTI = new Map();
async function ampariHaku(url) {
  if (AMPARI_VALIMUISTI.has(url)) return AMPARI_VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI_VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8771, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** Omistajan katselumitat: iPad-luokan ruutu ja puhelin. */
const NAKYMAT = {
  tabletti: { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virhelista) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    /*
     * PUUTTUVA KUVA ON 404 EIKÄ KATKO. Lisänostojen kuvituskuvat ovat
     * vielä kuvaputkella (aikajana/ihmisen-matka/nosto/<tunnus>.jpg),
     * ja kortin varapaikka syntyy nimenomaan img-alkion `error`-
     * tapahtumasta: abort ei laukaise sitä kaikissa selaimissa.
     */
    if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virhelista.push(String(e)));
  return { konteksti, sivu };
}
async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8771/index.html?lauta=pallo', { waitUntil: 'load' });
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
    // Pöllö on aarre: ilman löytöä valmiit kysymykset eivät lähtisi.
    game.polloLoydetty = true;
    ui.render();
  });
  await s.waitForTimeout(1200);
  return s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
}
async function avaaLinssi(s) {
  return s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) {
      if (ui.aikajana) break;
      await new Promise((r) => setTimeout(r, 25));
    }
    const ajo = ui.aikajana;
    if (!ajo?.virrat) return { virhe: 'aikajana tai virrat puuttuvat' };
    await ajo.virrat.valmis;
    return {
      avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
      esitys: ajo.esitys?.tila?.() ?? null,
    };
  });
}

/** Paneelin näkyvä tila: tervehdys, napit, viimeiset viestit, lähteet. */
const PANEELI = () => {
  const virta = document.querySelector('.pollo-paneeli .pollo-virta') ?? document.querySelector('.pollo-virta');
  const napit = [...(virta?.querySelectorAll('.pollo-linssin-valmiit .pollo-valmis') ?? [])].map((b) => b.textContent);
  const viestit = [...(virta?.querySelectorAll('.pollo-viesti') ?? [])]
    .filter((v) => !v.classList.contains('pollo-historiaviesti'))
    .map((v) => ({ luokka: v.className, teksti: v.textContent.slice(0, 80) }));
  return {
    auki: Boolean(window.matkakirjaPollo?.auki),
    tervehdys: Boolean(virta?.querySelector('.pollo-tervehdys')),
    napit,
    viestit,
    lahteet: [...(virta?.querySelectorAll('.pollo-valmislahteet a') ?? [])].map((a) => a.href),
    kysely: typeof window.matkakirja?.ui?.pulunLinssikysymykset === 'function',
  };
};

const virheet = [];
const { konteksti, sivu: s } = await avaaSivu({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }, virheet);
let posteja = 0;
s.on('request', (r) => { if (r.method() === 'POST') posteja += 1; });
vaadi('peli aukesi', await avaaPeli(s));
const avaus = await avaaLinssi(s);
vaadi('linssi aukesi', !avaus?.virhe, JSON.stringify(avaus));
// Tutkimusvaiheeseen muistin kautta, kuten toisella avauksella: tila
// tutkimukseen, poistu (muisti tallentuu) ja avaa uudestaan.
await s.evaluate(async () => {
  window.matkakirja.ui.aikajana.esitys.aloita({ muisti: { vaihe: 'tutkimus' } });
  await new Promise((r) => setTimeout(r, 800));
  document.querySelector('.aikajana-valikko-nappi')?.click();
  document.querySelector('.aikajana-valikko-poistu')?.click();
  await new Promise((r) => setTimeout(r, 1200));
  for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
});
const toinen = await avaaLinssi(s);
await s.waitForTimeout(2500);
const alku = await s.evaluate(() => ({
  tutkimus: Boolean(window.matkakirja.ui.tutkimusvaihe),
  avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
}));
vaadi('toinen avaus jatkaa tutkimusvaiheesta', alku.tutkimus && !alku.avausnappi && !toinen?.virhe,
  JSON.stringify(alku));

/* 1. tervehdyksen tilalla viimeisen jakson kysymykset */
const p1 = await s.evaluate(async (PANEELI_T) => {
  // eslint-disable-next-line no-new-func
  const lue = new Function(`return (${PANEELI_T})();`);
  const pollo = window.matkakirjaPollo;
  pollo.virta.querySelectorAll('.pollo-viesti:not(.pollo-historiaviesti)').forEach((v) => v.remove());
  pollo.avaa();
  await new Promise((r) => setTimeout(r, 400));
  return { ...lue(), jakso: window.matkakirja.ui.aikajana.esitys.tila().jakso };
}, PANEELI.toString());
vaadi('tervehdys väistyy ja viimeisen jakson kolme kysymystä ovat nappeina',
  p1.auki && !p1.tervehdys && p1.napit.length === 3 && /Wairau/.test(p1.napit[0]), JSON.stringify(p1));
await s.screenshot({ path: join(ULOS, 'ihmisen-pulukysymykset-1-napit.png') });

/* 2. napautus → esikirjoitettu vastaus, ei POSTia */
const postitEnnen = posteja;
const p2 = await s.evaluate(async (PANEELI_T) => {
  const lue = new Function(`return (${PANEELI_T})();`);
  const nappi = document.querySelector('.pollo-linssin-valmiit .pollo-valmis');
  const teksti = nappi.textContent;
  nappi.click();
  await new Promise((r) => setTimeout(r, 600));
  return { teksti, ...lue(), kesken: Boolean(window.matkakirjaPollo.kesken) };
}, PANEELI.toString());
const kayttaja = p2.viestit.find((v) => /pollo-kayttaja/.test(v.luokka));
const vastaus = p2.viestit.find((v) => /pollo-valmisvastaus/.test(v.luokka));
vaadi('napautus antaa esikirjoitetun vastauksen lähteineen ilman mallikutsua',
  kayttaja?.teksti === p2.teksti.slice(0, 80) && Boolean(vastaus?.teksti) && !p2.kesken
    && p2.lahteet.length >= 1 && p2.lahteet.every((u) => u.startsWith('https://'))
    && posteja === postitEnnen,
  JSON.stringify({ ...p2, posteja: posteja - postitEnnen }));
vaadi('kaksi muuta kysymystä jäävät tarjolle', p2.napit.length === 2 && !p2.napit.includes(p2.teksti),
  JSON.stringify(p2.napit));
await s.screenshot({ path: join(ULOS, 'ihmisen-pulukysymykset-2-vastaus.png') });

/* 3. nostokortti vaihtaa kysymykset */
const p3 = await s.evaluate(async (PANEELI_T) => {
  const lue = new Function(`return (${PANEELI_T})();`);
  const { ui } = window.matkakirja;
  ui.nostokortti.avaa('denisova');
  await new Promise((r) => setTimeout(r, 400));
  if (!window.matkakirjaPollo.auki) window.matkakirjaPollo.avaa();
  await new Promise((r) => setTimeout(r, 300));
  return lue();
}, PANEELI.toString());
vaadi('nostokortti (Denisova) vaihtaa paneelin kysymykset', p3.napit.length === 3
  && p3.napit.some((k) => /denisovalai|luunsiru|13-vuotiaan/i.test(k)), JSON.stringify(p3.napit));

/* 4. lisänosto → sen omat kysymykset */
const p4 = await s.evaluate(async (PANEELI_T) => {
  const lue = new Function(`return (${PANEELI_T})();`);
  const { ui } = window.matkakirja;
  ui.nostokortti.sulje();
  ui.nostokortti.avaa('toba');
  await new Promise((r) => setTimeout(r, 400));
  if (!window.matkakirjaPollo.auki) window.matkakirjaPollo.avaa();
  await new Promise((r) => setTimeout(r, 300));
  const { IHMISEN_MATKA_LISANOSTOT } = await import('/js/linssit/ihmisen-matka-data.js');
  return { ...lue(), odotetut: IHMISEN_MATKA_LISANOSTOT.find((l) => l.tunnus === 'toba')?.kysymykset ?? [] };
}, PANEELI.toString());
vaadi('lisänosto (Toba) näyttää omat kysymyksensä',
  p4.napit.length >= 2 && p4.napit.every((k) => p4.odotetut.includes(k)), JSON.stringify(p4.napit));
await s.screenshot({ path: join(ULOS, 'ihmisen-pulukysymykset-4-lisanosto.png') });

/* 5. linssin sulku purkaa kyselyn */
const p5 = await s.evaluate(async (PANEELI_T) => {
  const lue = new Function(`return (${PANEELI_T})();`);
  const { ui } = window.matkakirja;
  ui.nostokortti?.sulje?.();
  ui.valitseLinssi(null);
  await new Promise((r) => setTimeout(r, 800));
  return lue();
}, PANEELI.toString());
vaadi('linssin sulku purkaa kyselyn', !p5.kysely, JSON.stringify({ kysely: p5.kysely }));

/*
 * 7. KORTTI ESITYKSEN AIKANA (Fablen kiireellinen erä 19.9.2026 klo
 * 19.57; Sonnet 1:n kierros 11, kuva 08): pulu on esityksen ajan
 * piilossa, joten kortin kysymys vastaa kortin omaan kuplaan. Denisovan
 * kortti avataan kesken esityksen, ensimmäinen kysymys NAPAUTETAAN
 * (kosketus), ja vastaus lähteineen on kortissa ilman POST-pyyntöä.
 * Sen jälkeen ✕ sulkee kortin ja esitys jatkuu.
 */
await konteksti.close();
const sivu7 = await avaaSivu({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true }, virheet);
const s2 = sivu7.sivu;
let posteja2 = 0;
s2.on('request', (r) => { if (r.method() === 'POST') posteja2 += 1; });
await avaaPeli(s2);
await avaaLinssi(s2);
await s2.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
await s2.waitForTimeout(4000);
await s2.evaluate(() => window.matkakirja.ui.nostokortti.avaa('denisova'));
await s2.waitForTimeout(800);
const ennen7 = await s2.evaluate(() => ({
  tauolla: window.matkakirja.ui.aikajana.esitys.tila().tauolla,
  pulupiilossa: document.body.classList.contains('aikajana-pulu-piilossa'),
  napit: [...document.querySelectorAll('.ihmisen-nostokysymys')].map((b) => b.textContent),
}));
const nappi7 = s2.locator('.ihmisen-nostokysymys').first();
await nappi7.scrollIntoViewIfNeeded().catch(() => {});
const postit7 = posteja2;
await nappi7.tap({ timeout: 5000 });
await s2.waitForTimeout(700);
const vastaus7 = await s2.evaluate(() => {
  const k = document.querySelector('.ihmisen-nostokortti-vastaus');
  const r = k?.getBoundingClientRect();
  return {
    teksti: k?.querySelector('.ihmisen-nostokortti-vastausteksti')?.textContent ?? '',
    lahteet: [...(k?.querySelectorAll('a') ?? [])].map((a) => a.href),
    nakyy: Boolean(r && r.width > 0 && r.height > 0),
    paneeliAuki: Boolean(window.matkakirjaPollo?.auki),
  };
});
vaadi('kortin kysymys esityksen aikana: esikirjoitettu vastaus kortissa, ei mallikutsua, ei paneelia',
  ennen7.tauolla && ennen7.pulupiilossa && ennen7.napit.length === 3
    && vastaus7.nakyy && vastaus7.teksti.length > 40 && vastaus7.lahteet.length >= 1
    && !vastaus7.paneeliAuki && posteja2 === postit7,
  JSON.stringify({ ennen7, vastaus7, posteja: posteja2 - postit7 }));
await s2.locator('.ihmisen-nostokortti-sulje').tap({ timeout: 5000 });
await s2.waitForTimeout(800);
const jalkeen7 = await s2.evaluate(() => ({
  kortti: window.matkakirja.ui.nostokortti.tila().auki,
  kaynnissa: window.matkakirja.ui.aikajana.esitys.tila().kaynnissa,
}));
vaadi('kortin ✕ sulkee ja esitys jatkuu kysymyksen jälkeen', jalkeen7.kortti === null && jalkeen7.kaynnissa,
  JSON.stringify(jalkeen7));
await sivu7.konteksti.close();

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
palvelin.close();
const hylatyt = tulokset.filter((t) => !t.ok).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi`);
process.exit(hylatyt ? 1 : 0);
