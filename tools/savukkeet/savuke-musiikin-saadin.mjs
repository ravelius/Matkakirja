/*
 * SAVUKE: musiikin säädin oikeassa selaimessa (omistaja 9.9.2026).
 *
 * Kysyy kaksi asiaa, joita yksikkötesti ei voi kysyä:
 *   1. Onko soiva musiikkielementti oikeasti kytketty GainNodeen
 *      (MediaElementAudioSourceNode → GainNode → …)?
 *   2. Muuttuuko gain, kun rattaan liukua liikuttaa?
 *
 * Ajo:
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-musiikin-saadin.mjs
 *
 * Vaatii paikallisen palvelimen (python3 -m http.server) ja Chromiumin
 * polusta /opt/pw-browsers/chromium. Kaappaus kirjoitetaan
 * /tmp/matkakirja-kaappaukset/musiikkisaadin.png.
 */
import { mkdirSync } from 'node:fs';

// Sama kaksoispolku kuin muissa savukkeissa: repon oma asennus tai
// kontin globaali Playwright.
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const OSOITE = process.env.SAVUKE_OSOITE ?? 'http://localhost:8123/';
const KAAPPAUS = '/tmp/matkakirja-kaappaukset';

mkdirSync(KAAPPAUS, { recursive: true });

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
});
const sivu = await selain.newPage({ viewport: { width: 900, height: 800 } });

/*
 * Vakoilu ENNEN sivun koodia: kirjataan jokainen createMediaElementSource
 * ja createGain sekä niiden kytkennät, jotta ketju voidaan lukea jälkeen
 * päin. Peli ei paljasta soittimiaan ulos, joten tämä on ainoa tapa
 * nähdä, meneekö musiikki oikeasti vahvistimen läpi.
 */
await sivu.addInitScript(() => {
  try { localStorage.setItem('matkakirja-kehittaja', '1'); } catch { /* ei muistia */ }
  window.__musa = { lahteet: [], gainit: [], kytkennat: [] };
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const alkuLahde = AC.prototype.createMediaElementSource;
  AC.prototype.createMediaElementSource = function (el) {
    const solmu = alkuLahde.call(this, el);
    solmu.__media = el;
    window.__musa.lahteet.push(solmu);
    return solmu;
  };
  const alkuGain = AC.prototype.createGain;
  AC.prototype.createGain = function () {
    const g = alkuGain.call(this);
    window.__musa.gainit.push(g);
    return g;
  };
  const alkuConnect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (kohde, ...loput) {
    window.__musa.kytkennat.push([this, kohde]);
    return alkuConnect.call(this, kohde, ...loput);
  };
});

sivu.on('pageerror', (e) => console.log('SIVUVIRHE:', e.message));

await sivu.goto(OSOITE, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);

/* 1. Moduulitason tarkistus oikeassa selaimessa. */
const moduuli = await sivu.evaluate(async () => {
  const valitsin = await import('/js/musiikkivalitsin.js');
  const vahvistin = await import('/js/musiikkivahvistin.js');
  return {
    vahvistus35: valitsin.musiikinVahvistus(35),
    vahvistus0: valitsin.musiikinVahvistus(0),
    vahvistus100: valitsin.musiikinVahvistus(100),
    liuku: valitsin.musiikinLiuku(),
    kerroin: valitsin.musiikinKerroin(),
    volumeToimii: vahvistin.volumeToimii(),
  };
});
console.log('MODUULI:', JSON.stringify(moduuli));

/* 2. Käyttäjän ele: äänikonteksti herää ja peli alkaa. */
await sivu.mouse.click(450, 400);
await sivu.waitForTimeout(500);
const aloita = sivu.locator('button', { hasText: /Aloita seikkailu/i }).first();
if (await aloita.count()) {
  await aloita.click().catch(() => {});
  await sivu.waitForTimeout(3500);
}
await sivu.mouse.click(450, 500);
await sivu.waitForTimeout(3000);

/* 3. Onko musiikkielementti kytketty gainiin? */
const lue = () => sivu.evaluate(() => {
  const m = window.__musa ?? { lahteet: [], kytkennat: [] };
  const rivit = m.lahteet.map((lahde) => {
    const seuraava = m.kytkennat.find(([a]) => a === lahde)?.[1];
    const onGain = Boolean(seuraava && seuraava.gain);
    return {
      src: (lahde.__media?.currentSrc || lahde.__media?.src || '').split('/').pop(),
      paused: lahde.__media?.paused ?? null,
      elementinVolume: lahde.__media?.volume ?? null,
      kytkettyGainiin: onGain,
      gain: onGain ? seuraava.gain.value : null,
    };
  });
  return { ctxTila: window.__ctxTila ?? null, rivit };
});

const ennen = await lue();
console.log('KETJU ENNEN SÄÄTÖÄ:', JSON.stringify(ennen, null, 1));

/* 4. Liu'un veto: muuttuuko soivan raidan gain? */
await sivu.evaluate(async () => {
  const valitsin = await import('/js/musiikkivalitsin.js');
  valitsin.asetaMusiikinLiuku(90);
});
await sivu.waitForTimeout(900);
const kovaa = await lue();
console.log('GAIN LIU\'ULLA 90:', JSON.stringify(kovaa.rivit.map((r) => r.gain)));

await sivu.evaluate(async () => {
  const valitsin = await import('/js/musiikkivalitsin.js');
  valitsin.asetaMusiikinLiuku(5);
});
await sivu.waitForTimeout(900);
const hiljaa = await lue();
console.log('GAIN LIU\'ULLA 5:', JSON.stringify(hiljaa.rivit.map((r) => r.gain)));

/* 5. Kaappaus säätimestä: ratasvalikko auki. */
const ratas = sivu.locator('#kehittaja-valikko-btn');
if (await ratas.count()) {
  await ratas.click().catch(() => {});
  await sivu.waitForTimeout(600);

  /*
   * SÄÄDIN ITSE, EI VAIN MODUULI. Liu'un arvo asetetaan elementtiin ja
   * lähetetään `input`-tapahtuma täsmälleen kuten sormi tekisi — näin
   * myös js/main.js:n kytkentä tulee mitatuksi.
   */
  await sivu.evaluate(() => {
    const vipu = document.getElementById('kehittaja-musiikki-liuku');
    vipu.value = '60';
    vipu.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await sivu.waitForTimeout(900);
  const vivusta = await lue();
  const lukema = await sivu.locator('#kehittaja-musiikki-liuku')
    .locator('xpath=following-sibling::span').first().textContent()
    .catch(() => null);
  console.log('SÄÄTIMESTÄ (liuku 60):', JSON.stringify(vivusta.rivit.map((r) => r.gain)),
    'lukema:', lukema);

  await sivu.evaluate(() => {
    const vipu = document.getElementById('kehittaja-musiikki-liuku');
    vipu.value = '35';
    vipu.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await sivu.waitForTimeout(400);
  const valikko = sivu.locator('#kehittaja-valikko');
  await valikko.screenshot({ path: `${KAAPPAUS}/musiikkisaadin.png` }).catch(async () => {
    await sivu.screenshot({ path: `${KAAPPAUS}/musiikkisaadin.png` });
  });
  console.log('KAAPPAUS:', `${KAAPPAUS}/musiikkisaadin.png`);
}

await selain.close();
