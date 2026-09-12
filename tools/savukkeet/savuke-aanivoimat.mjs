/*
 * Savuke: ASETUSVALIKON VIISI ÄÄNILIUKUA MUUTTAVAT KUULUVAA TASOA.
 *
 * OMISTAJAN VIKAILMOITUS 12.9.2026, sanatarkasti: *"äänien
 * voimakkuussäädin ei muuten toimi. Saisiko sen korjattua ensi
 * tilassa?"*
 *
 * Liu'ut (index.html #aanivoimat) ovat Äänitehosteet, Pulun ääni,
 * Lukija, Taustamusiikki ja Taustaäänet. Neljä niistä toimi
 * mitattaessa; Lukija ei, ja kahdesta eri syystä (ks. korjauksen
 * perustelut js/luenta.js paivitaLuentojenVoima ja js/puhe.js
 * paivitaLukijanVoima). Yksikkötesti (tests/lukijaliuku.test.mjs)
 * vartioi kytkentää; TÄMÄ mittaa sen, mitä yksikkötesti ei näe: oikea
 * selain, oikeat mediaelementit, oikea Web Audio -ketju ja oikea
 * HIIRIVETO valikossa, joka on auki niin kuin pelaajalla.
 *
 * MITÄ MITATAAN — jokaiselta viideltä liu'ulta kolme lukemaa:
 * taso ENNEN vetoa, HETI vedon jälkeen ja KOLMEN SEKUNNIN kuluttua.
 * Viimeinen on tässä siksi, että kumoutuva säätö (ristihäivytys,
 * väistö, uudelleen käynnistyvä ääni) näyttäisi hetken toimivalta.
 *
 * MISTÄ TASO LUETAAN: soivan äänen omasta kahvasta — Web Audio
 * -vahvistimen gainista, jos soitin on reititetty, muuten elementin
 * volumesta. Vertailut tehdään aina saman soittimen sisällä, joten
 * polkujen välistä kerrointa ei tarvitse purkaa.
 *
 *   node tools/savukkeet/savuke-aanivoimat.mjs
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
 * Tarkkailu ennen sivun skriptejä:
 *  - jokainen soitin talteen (ne eivät ole DOMissa),
 *  - jokainen äänipiiri ja sen ENSIMMÄINEN vahvistin talteen:
 *    striimatun lukijan taso asuu juuri siinä solmussa (js/puhe.js
 *    kytkeVahvistin), eikä sitä voi lukea mistään muualta.
 */
const TARKKAILU = `
window.__aanet = [];
const AlkuperainenAudio = window.Audio;
window.Audio = function Audio(...a) {
  const el = new AlkuperainenAudio(...a);
  window.__aanet.push(el);
  return el;
};
window.__piirit = [];
for (const nimi of ['AudioContext', 'webkitAudioContext']) {
  const Alku = window[nimi];
  if (typeof Alku !== 'function') continue;
  window[nimi] = function Piiri(...a) {
    const ctx = new Alku(...a);
    const tehdas = ctx.createGain.bind(ctx);
    ctx.createGain = (...g) => {
      const solmu = tehdas(...g);
      if (!ctx.__ekaVahvistin) ctx.__ekaVahvistin = solmu;
      return solmu;
    };
    window.__piirit.push(ctx);
    return ctx;
  };
}
/** Kuuluva taso: reititetty soitin kertoo gainissa, muu elementissä. */
window.__taso = (el) => (el?.aaniVahvistin ? el.aaniVahvistin.gain.value : (el?.volume ?? 0));
/** Viimeisin SOIVA soitin, jonka lähde täsmää. */
window.__soiva = (kaava) => window.__aanet.filter(
  (e) => new RegExp(kaava, 'i').test(String(e.currentSrc || e.src || '')) && !e.paused,
).pop() ?? null;
`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// serviceWorkers: 'block' — muuten sw sieppaa pyynnöt ja ajo mittaa välimuistia.
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 900 }, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
await sivu.addInitScript(TARKKAILU);
// Ulkomaailma poikki: ajo ei saa riippua verkosta.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (reitti) => reitti.abort());
/*
 * Äänitteet mockataan hiljaisuudella — myös ämpäriin osoittavat, koska
 * ne ovat ulkomaailmaa. CORS-otsake on PAKOLLINEN: ilman sitä selain
 * pitää soitinta saastuneena eikä Web Audio -reititys (kompressori ja
 * vahvistin) onnistu lainkaan, ja mittaus lukisi väärää kahvaa.
 * Reitit rekisteröidään katkaisun JÄLKEEN (Playwright kokeilee
 * käänteisessä järjestyksessä). Nauhat ovat pitkiä, jotta ne soivat yhä
 * kolmen sekunnin jälkimittauksessa.
 */
const aani = (sekunnit) => ({
  status: 200,
  contentType: 'audio/wav',
  headers: { 'access-control-allow-origin': '*' },
  body: hiljainenWav(sekunnit),
});
await sivu.route(/\.(mp3|wav|m4a)(\?|$)/i, (reitti) => reitti.fulfill(aani(240)));
// Pöllön puhepalvelin (js/packs/pollo-asetukset.js): striimattu lukija
// ilman verkkoa.
await sivu.route(/matkakirja-pollo/, (reitti) => reitti.fulfill(aani(60)));

await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForSelector('.start-btn', { timeout: 15000 });
await sivu.waitForTimeout(1200);
vaadi('sivu latautui ilman poikkeuksia', virheet.length === 0, virheet.join(' | ').slice(0, 300));

/*
 * ENSIMMÄINEN ELE PORTIN ÄÄNIVIHJEESEEN: selain sallii äänet vasta
 * eleestä. Sen jälkeen "Aloita seikkailu", jotta myös kertojan luenta
 * ja pulun repliikki ovat käynnissä — liukuja mitataan SOIVAAN ääneen.
 */
await sivu.click('.start-aanet');
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(7000);

// --- valikko auki niin kuin pelaajalla --------------------------------------
await sivu.evaluate(() => {
  // Ratas näkyy pelaajalle heti kun peli on käynnissä; aloitusruudussa
  // se voi olla vielä piilossa.
  const kotelo = document.getElementById('kehittaja-valikko-kotelo');
  if (kotelo) kotelo.hidden = false;
});
await sivu.click('#kehittaja-valikko-btn');
await sivu.waitForTimeout(400);

const LIUUT = [
  { id: 'voima-tehosteet', nimi: 'Äänitehosteet' },
  { id: 'voima-pulu', nimi: 'Pulun ääni' },
  { id: 'voima-lukija', nimi: 'Lukija' },
  { id: 'kehittaja-musiikki-liuku', nimi: 'Taustamusiikki' },
  { id: 'voima-tausta', nimi: 'Taustaäänet' },
];
const nakyvyys = await sivu.evaluate((idt) => idt.map((id) => {
  const el = document.getElementById(id);
  return { id, nakyy: Boolean(el && el.offsetParent), arvo: el?.value ?? null };
}), LIUUT.map((l) => l.id));
vaadi('kaikki viisi liukua ovat auki valikossa',
  nakyvyys.every((n) => n.nakyy), JSON.stringify(nakyvyys));

/** Kunkin liu'un kuuluva taso yhtenä lukemana. */
const MITTARIT = `async () => {
  const { sfx } = await import('/js/sound.js');
  const t = window.__taso;
  const lukijapiiri = window.__piirit.find((c) => c !== sfx.ctx && c.__ekaVahvistin);
  const luku = (kaava) => { const e = window.__soiva(kaava); return e ? t(e) : null; };
  return {
    // Tehosteiden masterketju: yksi kerroin kaikille tehosteille.
    tehosteet: sfx.master ? sfx.master.gain.value : null,
    pulu: luku('livia-'),
    // Äänitteenä soiva kertoja (avausteksti).
    lukija: luku('intro-puhe'),
    // Striimattu lukija: js/puhe.js kytkeVahvistin -solmu.
    lukijastriimi: lukijapiiri ? lukijapiiri.__ekaVahvistin.gain.value : null,
    musiikki: luku('musa-'),
    tausta: luku('freesound|aporee'),
  };
}`;
const mittaa = () => sivu.evaluate(`(${MITTARIT})()`);

/** Hiirellä vedetty liuku: pelaajan ele, ei ohjelmallinen arvon asetus. */
async function veda(id, oikealle) {
  const laatikko = await sivu.locator(`#${id}`).boundingBox();
  await sivu.mouse.move(laatikko.x + laatikko.width / 2, laatikko.y + laatikko.height / 2);
  await sivu.mouse.down();
  await sivu.mouse.move(
    laatikko.x + (oikealle ? laatikko.width - 2 : 2),
    laatikko.y + laatikko.height / 2,
    { steps: 12 },
  );
  await sivu.mouse.up();
}

/** Käynnistää sen äänen, jota liuku säätää — mittaus tehdään soivaan. */
async function varmistaAani(id) {
  if (id === 'voima-pulu') {
    await sivu.evaluate(async () => {
      const { stopIntroVoice } = await import('/js/luenta.js');
      const { soitaLivianAani } = await import('/js/liviapuhe.js');
      const ui = window.matkakirja.ui;
      // Pulu ei ala kertojan päälle (js/luenta.js puhujaAanessa).
      stopIntroVoice(ui);
      await new Promise((r) => setTimeout(r, 900));
      soitaLivianAani(ui, 'avaus', 1);
    });
    await sivu.waitForTimeout(1400);
  }
  if (id === 'voima-lukija') {
    await sivu.evaluate(async () => {
      const { playIntroVoice } = await import('/js/luenta.js');
      const lukija = await import('/js/lukija.js');
      playIntroVoice(window.matkakirja.ui);
      lukija.lueAaneen('Tokiossa astuin risteykseen. Sade alkoi heti.', null,
        { persoona: 'merkinnat' });
    });
    await sivu.waitForTimeout(2200);
  }
}

const mitat = [];
for (const { id, nimi } of LIUUT) {
  await varmistaAani(id);
  const valikossa = await sivu.evaluate(() => !document.getElementById('kehittaja-valikko').hidden);
  if (!valikossa) { await sivu.click('#kehittaja-valikko-btn'); await sivu.waitForTimeout(300); }
  const alku = Number(await sivu.evaluate((i) => document.getElementById(i).value, id));
  const ennen = await mittaa();
  await veda(id, alku < 50);
  await sivu.waitForTimeout(500);
  const heti = await mittaa();
  await sivu.waitForTimeout(3000);
  const kolme = await mittaa();
  const loppu = Number(await sivu.evaluate((i) => document.getElementById(i).value, id));
  mitat.push({
    nimi, id, alku, loppu, ennen, heti, kolme,
  });
}

/** Mitatut luvut talteen raporttiin — savuke on myös mittari. */
const luku = (x) => (x === null ? '—' : x.toFixed(5));
console.log('\nliuku            %       ennen      heti        3 s');
for (const m of mitat) {
  const avain = m.id === 'kehittaja-musiikki-liuku' ? 'musiikki' : m.id.replace('voima-', '');
  console.log(`${m.nimi.padEnd(15)} ${String(m.alku).padStart(3)}→${String(m.loppu).padEnd(4)}`
    + ` ${luku(m.ennen[avain]).padStart(9)} ${luku(m.heti[avain]).padStart(9)}`
    + ` ${luku(m.kolme[avain]).padStart(9)}`);
}
console.log('');

for (const m of mitat) {
  const avain = m.id === 'kehittaja-musiikki-liuku' ? 'musiikki' : m.id.replace('voima-', '');
  const nimet = avain === 'lukija' ? ['lukija', 'lukijastriimi'] : [avain];
  for (const kentta of nimet) {
    const a = m.ennen[kentta]; const b = m.heti[kentta]; const c = m.kolme[kentta];
    const otsikko = `${m.nimi}${kentta === 'lukijastriimi' ? ' (striimattu lukija)' : ''}`;
    const tiedot = JSON.stringify({ alku: m.alku, loppu: m.loppu, a, b, c });
    vaadi(`${otsikko}: ääni soi mittaushetkellä`, a !== null && a > 0, tiedot);
    vaadi(`${otsikko}: veto muuttaa kuuluvaa tasoa heti`,
      a !== null && b !== null && Math.abs(b - a) > 1e-4, tiedot);
    // Suunta: liuku vasemmalle hiljentää, oikealle voimistaa.
    vaadi(`${otsikko}: taso liikkui liu'un suuntaan`,
      a !== null && b !== null && (m.loppu > m.alku ? b > a : b < a), tiedot);
    vaadi(`${otsikko}: säätö EI kumoudu kolmessa sekunnissa`,
      b !== null && c !== null && Math.abs(c - b) < Math.max(1e-4, Math.abs(b - a) * 0.25),
      tiedot);
  }
}

vaadi('sivu ei kaatunut ajon aikana', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
