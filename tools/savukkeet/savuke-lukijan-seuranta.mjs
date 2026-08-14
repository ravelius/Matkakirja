/*
 * Savuke: lukijan seuranta (omistajan tilaukset 14.8.2026).
 *  1. Väliotsikko liittyy seuraavaan leipätekstiin — lehden oikeassa
 *     DOMissa syntyy yhdistettyjä kohtia (osat ≥ 2).
 *  2. Luenta alkaa näytöllä olevasta kohdasta: kun sivu on vieritetty
 *     alas ja kaiutinta painetaan, laskuri ei ala ykkösestä.
 *  3. Kuuluvat virkkeet maalataan (CSS Highlight 'lukija-luenta') ja
 *     kohta saa .lukija-kohdalla-luokan.
 *  4. Sivu vierii luennan perässä: kappalehyppy siirtää näkymän
 *     kohdan alkuun.
 *  5. Pysäytys siivoaa maalauksen ja luokat.
 *
 * TTS on tynkä: pöllöpalvelimen puhevastaukset korvataan lyhyellä
 * hiljaisella WAV:lla (page.route), joten savuke ei kuluta kiintiötä
 * eikä riipu verkosta.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

/*
 * 1,5 sekunnin hiljainen WAV (8 kHz, mono, 16-bit). Riittävän pitkä,
 * ettei koko luenta ehdi loppua ennen tarkistuksia — liian lyhyellä
 * tyngällä siivous ehti ajaa ja savuke näki vain tyhjää.
 */
const hiljainenWav = () => {
  const naytteita = 12000;
  const data = naytteita * 2;
  const b = Buffer.alloc(44 + data);
  b.write('RIFF', 0); b.writeUInt32LE(36 + data, 4); b.write('WAVE', 8);
  b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(data, 40);
  return b;
};

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const konteksti = await selain.newContext({ viewport: { width: 390, height: 844 } });
await konteksti.route('**samireivinen.workers.dev/**', (route) => route.fulfill({
  status: 200,
  contentType: 'audio/wav',
  body: hiljainenWav(),
}));
const sivu = await konteksti.newPage();
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1800);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(1500);

// Lehti auki ja aihesivulle, jolla on väliotsikoita ja pitkä teksti.
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await odota(800);
  ui.vaihdaTutkiSivu(1);
  await odota(500);
});

// 1. Kohtien rakenne oikeassa DOMissa.
const kohtia = await sivu.evaluate(async () => {
  const m = await import('/js/lukija.js');
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  const kohdat = m.kokoaLuettavatKohdat(kortti);
  return {
    maara: kohdat.length,
    yhdistettyja: kohdat.filter((k) => (k.osat?.length ?? 0) >= 2).length,
    osatKunnossa: kohdat.every((k) => k.osat?.every?.((o) => o.solmu && o.pituus > 0)),
  };
});
vaadi('lehden sivulta syntyy kohtia ja väliotsikot yhdistyvät leipätekstiin',
  kohtia.maara >= 3 && kohtia.yhdistettyja >= 1 && kohtia.osatKunnossa,
  JSON.stringify(kohtia));

// 2. Vieritetään alas ja käynnistetään luenta — laskuri ei ala ykkösestä.
await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  kortti.scrollTop = Math.floor(kortti.scrollHeight * 0.45);
});
await sivu.waitForTimeout(400);
await sivu.evaluate(() => {
  document.querySelector('#arrival-dialog .lukija-nappi')?.click();
});
await sivu.waitForTimeout(1200);
const kaynnissa = await sivu.evaluate(() => {
  const rivi = document.querySelector('.lukija-paneeli .lukija-kappalerivi');
  const kohdalla = document.querySelector('.lukija-kohdalla');
  return {
    laskuri: rivi?.textContent ?? '',
    kohdallaOn: Boolean(kohdalla),
    maalattu: Boolean(window.CSS?.highlights?.has?.('lukija-luenta')),
    lukee: Boolean(document.querySelector('#arrival-dialog .lukija-nappi.lukee')),
  };
});
const laskurinAlku = Number(kaynnissa.laskuri.split('/')[0] || 0);
vaadi('luenta käynnistyi ja alkoi näytöllä olevasta kohdasta (laskuri > 1)',
  kaynnissa.lukee && laskurinAlku > 1, JSON.stringify(kaynnissa));
vaadi('kuuluva kohta on merkitty ja virkkeet maalattu',
  kaynnissa.kohdallaOn && kaynnissa.maalattu, JSON.stringify(kaynnissa));

// 3. Kappalehyppy vie näkymän kohdan alkuun (sivu seuraa lukijaa).
const seuranta = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  const napit = [...document.querySelectorAll('.lukija-paneeli .lukija-paneeli-nappi')];
  const seuraava = napit.find((b) => /Seuraava kappale/.test(b.title));
  seuraava?.click();
  await odota(1600);
  const kohdalla = document.querySelector('.lukija-kohdalla');
  const r = kohdalla?.getBoundingClientRect?.();
  return {
    hyppasi: Boolean(seuraava),
    kohdallaYlhaalla: Boolean(r) && r.top > -20 && r.top < 260,
    scrollTop: Math.round(kortti.scrollTop),
    laskuri: document.querySelector('.lukija-paneeli .lukija-kappalerivi')?.textContent ?? '',
  };
});
vaadi('kappalehypyn jälkeen kuuluva kohta on näkymän yläosassa (sivu seuraa lukijaa)',
  seuranta.hyppasi && seuranta.kohdallaYlhaalla, JSON.stringify(seuranta));

mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/lukijan-seuranta.png' });

// 4. Kaiutin vipuaa soittimen piiloon ja näkyviin luentaa katkaisematta.
//    (Paneeli voi olla jo piiloutunut itsekseen — testataan tilan
//    kääntyminen kahdesti, ei tiettyä alkutilaa.)
const vipu = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const nappi = document.querySelector('#arrival-dialog .lukija-nappi.lukee');
  const tila = () => document.querySelector('.lukija-paneeli')?.hidden === true;
  const alku = tila();
  nappi?.click();
  await odota(250);
  const kaantyi = tila() === !alku;
  const lukeeYha = Boolean(document.querySelector('#arrival-dialog .lukija-nappi.lukee'));
  nappi?.click();
  await odota(250);
  const palasi = tila() === alku;
  return { alku, kaantyi, lukeeYha, palasi };
});
vaadi('kaiutin piilottaa ja näyttää soittimen luentaa katkaisematta',
  vipu.kaantyi && vipu.lukeeYha && vipu.palasi, JSON.stringify(vipu));

// 5. Pysäytys (paneelin rasti) siivoaa maalauksen.
const siivous = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const napit = [...document.querySelectorAll('.lukija-paneeli .lukija-paneeli-nappi')];
  napit.find((b) => /Lopeta kuuntelu/.test(b.title))?.click();
  await odota(400);
  return {
    kohdallaJaljella: Boolean(document.querySelector('.lukija-kohdalla')),
    maalattu: Boolean(window.CSS?.highlights?.has?.('lukija-luenta')),
    paneeli: Boolean(document.querySelector('.lukija-paneeli')),
    lukee: Boolean(document.querySelector('#arrival-dialog .lukija-nappi.lukee')),
  };
});
vaadi('pysäytys (paneelin rasti) poistaa maalauksen, kohtaluokan ja paneelin',
  !siivous.kohdallaJaljella && !siivous.maalattu && !siivous.paneeli && !siivous.lukee,
  JSON.stringify(siivous));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
