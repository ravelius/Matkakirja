/*
 * Savuke: AVAUKSEN ÄÄNI — mitä portin painalluksesta kuuluu.
 *
 * OMISTAJAN TILAUS 7.9.2026, sanatarkasti: *"Pelin aloitussivulla, heti
 * kun pelaaja on painanut "aloita seikkailu" nappia, niin musiikki
 * saisi hiljentyä hieman ja mukaan saisi tulla se terminaalin
 * äänimaisema voimakkaasti mukaan ja siitä lähtisi omalla ajallaan
 * kertojan luenta myös käyntiin."*
 *
 * Yksikkötesti (tests/ambienssi.test.mjs) mittaa tasot tynkäselaimessa;
 * tämä mittaa saman OIKEASSA selaimessa oikeine mediaelementteineen,
 * oikeine ajastimineen ja oikeassa järjestyksessä — juuri se järjestys
 * on tilauksen ydin.
 *
 * MITÄ MITATAAN
 *  1. Ennen painallusta molemmat soivat omalla tasollaan.
 *  2. Painalluksesta MUSIIKKI LASKEE ja TERMINAALI NOUSEE — eri
 *     suuntiin, samasta eleestä.
 *  3. Lasku on LIUKU EIKÄ HYPPY: kesken liu'un mitattu taso on
 *     lähtötason ja lopputason välissä.
 *  4. Musiikki ei vaikene: se hiljenee "hieman", ei pois.
 *  5. KERTOJAN LUENTA ALKAA VASTA VIIVEEN JÄLKEEN (js/ui.js
 *     AVAUS_KERTOMUS_MS 2850 ms) eli vasta äänimaiseman noustua.
 *  6. Luennan päätyttyä sekoitus palaa pelin tavalliseen käytäntöön.
 *  7. Taustaäänten ollessa pois avauksen kutsut eivät tee eivätkä
 *     riko mitään (äänivalikon asetuksia kunnioitetaan).
 *
 *   node tools/savukkeet/savuke-etusivun-aani.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/** Hiljainen 8-bittinen wav (8 kHz) — dekoodautuu oikeasti selaimessa. */
function hiljainenWav(sekunnit) {
  const taajuus = 8000;
  const naytteita = Math.round(taajuus * sekunnit);
  const tavut = Buffer.alloc(44 + naytteita, 128);
  tavut.write('RIFF', 0, 'ascii');
  tavut.writeUInt32LE(36 + naytteita, 4);
  tavut.write('WAVEfmt ', 8, 'ascii');
  tavut.writeUInt32LE(16, 16);
  tavut.writeUInt16LE(1, 20);
  tavut.writeUInt16LE(1, 22);
  tavut.writeUInt32LE(taajuus, 24);
  tavut.writeUInt32LE(taajuus, 28);
  tavut.writeUInt16LE(1, 32);
  tavut.writeUInt16LE(8, 34);
  tavut.write('data', 36, 'ascii');
  tavut.writeUInt32LE(naytteita, 40);
  return tavut;
}

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/*
 * Tarkkailu ennen sivun skriptejä: jokainen soitin talteen ja jokaisen
 * ensimmäinen play() aikaleimattuna. Luennan alkuhetki on koko
 * tilauksen kolmas kohta ("siitä lähtisi omalla ajallaan kertojan
 * luenta"), eikä sitä voi lukea mistään muualta.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  const tieto = { el, soitettu: null };
  window.__aanet.push(tieto);
  const play = el.play.bind(el);
  el.play = function (...p) {
    if (tieto.soitettu === null) tieto.soitettu = performance.now();
    return play(...p);
  };
  return el;
};
/*
 * Kuuluva taso kummallakin polulla: reititetty soitin (kompressori +
 * vahvistin) kertoo tasonsa gain-solmussa, reitittämätön elementin
 * omassa volumessa. Vertailut tehdään aina saman soittimen sisällä,
 * joten polkujen välistä kerrointa (VOLUME_POLUN_KORVAUS) ei tarvitse
 * purkaa.
 */
window.__taso = (el) => (el?.aaniVahvistin ? el.aaniVahvistin.gain.value : (el?.volume ?? 0));
window.__soitin = (osuma) => window.__aanet.find(
  (t) => osuma.test(String(t.el.currentSrc || t.el.src || '')),
) ?? null;
/** Etusivun äänimaisema: ei musiikki, ei luenta, ei tehoste. */
window.__maisema = () => window.__aanet.find((t) => {
  const src = String(t.el.currentSrc || t.el.src || '');
  return src && !/musa-|intro-puhe|efekti-|data:/.test(src);
}) ?? null;
window.__tasot = () => ({
  musa: window.__taso(window.__soitin(/musa-/)?.el),
  maisema: window.__taso(window.__maisema()?.el),
  maisemaSoi: window.__maisema()?.el?.paused === false,
  musaSoi: window.__soitin(/musa-/)?.el?.paused === false,
});
`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// serviceWorkers: 'block' — muuten sw sieppaa pyynnöt ja ajo mittaa välimuistia.
const ctx = await selain.newContext({ viewport: { width: 1024, height: 768 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
await sivu.addInitScript(TARKKAILU);
// Ulkomaailma poikki: ajo ei saa riippua verkosta.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (reitti) => reitti.abort());
/*
 * Äänitteet mockataan hiljaisuudella — myös ämpäriin osoittavat, koska
 * ne ovat ulkomaailmaa. Reitit rekisteröidään katkaisun JÄLKEEN
 * (Playwright kokeilee käänteisessä järjestyksessä).
 *
 * LUENTA ON LYHYT (2 s) TARKOITUKSELLA: savukkeen on ehdittävä nähdä
 * myös se, mitä luennan PÄÄTYTTYÄ tapahtuu.
 */
const aani = (sekunnit) => ({
  status: 200,
  contentType: 'audio/wav',
  headers: { 'access-control-allow-origin': '*' },
  body: hiljainenWav(sekunnit),
});
await sivu.route(/\.(mp3|wav)(\?|$)/i, (reitti) => reitti.fulfill(
  /intro-puhe/.test(reitti.request().url()) ? aani(2) : aani(60),
));
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForSelector('.start-btn', { timeout: 15000 });
await sivu.waitForTimeout(1200);

vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

/*
 * ENSIMMÄINEN ELE PORTIN SISÄLLÄ, EI NAPPIA. Selain sallii äänet vasta
 * eleestä, ja tämä savuke haluaa mitata NAPIN vaikutuksen — siis
 * tilanteen, jossa musiikki ja maisema jo soivat omalla tasollaan.
 * Napautus osuu portin ääniviihjeeseen ("Laita äänet päälle"), joka ei
 * tee mitään muuta.
 */
await sivu.click('.start-aanet');
await sivu.evaluate(() => window.matkakirja?.ui?.syncAmbience?.());
// Pohjavireen oma nousu on 4 s (POHJA_NOUSU_MS) — odotetaan se loppuun.
await sivu.waitForTimeout(5200);

const ennen = await sivu.evaluate(() => window.__tasot());
vaadi('ennen painallusta musiikki soi', ennen.musaSoi === true && ennen.musa > 0,
  JSON.stringify(ennen));
vaadi('ennen painallusta terminaalin äänimaisema soi',
  ennen.maisemaSoi === true && ennen.maisema > 0, JSON.stringify(ennen));

// --- PAINALLUS ---------------------------------------------------------------
/*
 * Kello nollataan kaappausvaiheen kuuntelijassa, joka ehtii ennen napin
 * omaa käsittelijää: näin luennan viive mitataan juuri painalluksesta.
 */
await sivu.evaluate(() => {
  window.__t0 = null;
  document.querySelector('.start-btn').addEventListener('click', () => {
    window.__t0 = performance.now();
  }, true);
});
await sivu.click('.start-btn');

// Kesken liukua (liuku on 1,3 s): tason pitää olla matkalla, ei perillä.
await sivu.waitForTimeout(350);
const kesken = await sivu.evaluate(() => window.__tasot());
// Liu'un jälkeen: sekoitus on paikallaan.
await sivu.waitForTimeout(1250);
const avaus = await sivu.evaluate(() => window.__tasot());

vaadi('painalluksesta MUSIIKKI LASKEE', avaus.musa < ennen.musa * 0.9,
  JSON.stringify({ ennen, avaus }));
vaadi('musiikki hiljenee mutta EI VAIKENE', avaus.musa > 0, JSON.stringify(avaus));
vaadi('painalluksesta TERMINAALIN ÄÄNIMAISEMA NOUSEE', avaus.maisema > ennen.maisema * 1.1,
  JSON.stringify({ ennen, avaus }));
vaadi('maisema soi yhä painalluksen jälkeen', avaus.maisemaSoi === true, JSON.stringify(avaus));
vaadi('lasku on LIUKU eikä hyppy (kesken liu\'un välissä)',
  kesken.musa < ennen.musa && kesken.musa > avaus.musa,
  JSON.stringify({ ennen: ennen.musa, kesken: kesken.musa, avaus: avaus.musa }));

// --- LUENTA ALKAA VASTA VIIVEEN JÄLKEEN --------------------------------------
const luenta = await sivu.waitForFunction(() => {
  const t = window.__aanet.find(
    (a) => /intro-puhe/.test(String(a.el.currentSrc || a.el.src || '')) && a.soitettu !== null,
  );
  return t ? { alkoi: t.soitettu - window.__t0 } : null;
}, null, { timeout: 20000 }).then((k) => k.jsonValue()).catch(() => null);

vaadi('kertojan luenta lähti käyntiin', luenta !== null, 'luentaa ei alkanut');
vaadi('LUENTA ALKAA VASTA VIIVEEN JÄLKEEN (≥ 2850 ms painalluksesta)',
  luenta !== null && luenta.alkoi >= 2850, JSON.stringify(luenta));
vaadi('luenta alkaa vasta äänimaiseman nousun jälkeen (nousu mitattu 1,6 s kohdalla)',
  luenta !== null && luenta.alkoi > 1600, JSON.stringify(luenta));

// --- LUENNAN JÄLKEEN SEKOITUS PALAA ------------------------------------------
/*
 * Mockattu luenta kestää 2 s, ja sen päätyttyä purkautuu sekä puheen
 * väistö että avauksen oma nosto. Odotetaan kummankin liuku loppuun.
 */
await sivu.waitForFunction(() => {
  const t = window.__aanet.find(
    (a) => /intro-puhe/.test(String(a.el.currentSrc || a.el.src || '')),
  );
  return !!t && t.el.paused;
}, null, { timeout: 20000 }).catch(() => null);
await sivu.waitForTimeout(2600);
const jalkeen = await sivu.evaluate(() => window.__tasot());
const lahella = (a, b) => Math.abs(a - b) <= Math.max(b * 0.08, 0.002);
vaadi('luennan jälkeen musiikki palaa entiseen tasoonsa', lahella(jalkeen.musa, ennen.musa),
  JSON.stringify({ ennen: ennen.musa, jalkeen: jalkeen.musa }));
vaadi('luennan jälkeen maisema palaa entiseen tasoonsa', lahella(jalkeen.maisema, ennen.maisema),
  JSON.stringify({ ennen: ennen.maisema, jalkeen: jalkeen.maisema }));

// --- ÄÄNIVALIKON ASETUKSIA KUNNIOITETAAN -------------------------------------
/*
 * Taustaäänet pois: avauksen kutsuilla ei ole mitään nostettavaa eikä
 * hiljennettävää, eivätkä ne saa heittää. Sama koskee kertojaa: ilman
 * luentaa nosto purkautuu vasta pelaajan edetessä, eikä mikään jää
 * roikkumaan.
 */
const kytkin = await sivu.evaluate(async () => {
  const virta = await import('/js/ambience-stream.js');
  const { sfx } = await import('/js/sound.js');
  const oli = sfx.enabled;
  sfx.enabled = false;
  virta.stopPlaceStream();
  virta.stopPohjaMusiikki();
  let heitti = false;
  try {
    virta.aloitaAvauksenAani();
    virta.lopetaAvauksenAani();
  } catch (e) {
    heitti = String(e);
  }
  sfx.enabled = oli;
  return { heitti, paalla: virta.avauksenAaniPaalla() };
});
vaadi('taustaäänten ollessa pois avaus ei heitä', kytkin.heitti === false, String(kytkin.heitti));
vaadi('avauksen lippu ei jää päälle', kytkin.paalla === false, JSON.stringify(kytkin));

vaadi('sivu ei kaatunut ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

// Mitatut tasot näkyviin: sekoituksen hienosäätö on kuulokokeen nuppi,
// ja seuraava säätäjä näkee tästä, mistä mihin luvut liikkuivat.
console.log('\nmitatut tasot (musiikki / maisema):');
for (const [nimi, t] of [['ennen', ennen], ['kesken', kesken], ['avaus', avaus], ['jälkeen', jalkeen]]) {
  console.log(`  ${nimi.padEnd(7)} ${t.musa.toFixed(4)} / ${t.maisema.toFixed(4)}`);
}
if (luenta) console.log(`  luenta alkoi ${Math.round(luenta.alkoi)} ms painalluksesta`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
