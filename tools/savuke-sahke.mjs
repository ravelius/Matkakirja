/*
 * SELAINSAVUKE: SÄHKEJÄRJESTELMÄ (js/sahke.js, css/sahke.css).
 *
 *   node tools/savuke-sahke.mjs
 *
 * Raamatun osio SÄHKEJÄRJESTELMÄ (omistaja 25.8.2026). Yksikkötestit
 * eivät näe verkkoa eivätkä DOMia, joten tämä ajaa koko ketjun läpi
 * oikeassa selaimessa VALEWORKERIA vasten (page.route → fulfill):
 * worker/-kansioon ei kosketa, ja rajapinta on täsmälleen se, jonka
 * mukaan toinen agentti rakentaa oikean workerin.
 *
 * VÄITTEET:
 *   1. LINJA KIINNI: kun worker ei vastaa, retkikuntaosio on yksi rivi
 *      tekstiä ("Sähkelinja avataan pian") EIKÄ YHTÄÄN nappia — eikä
 *      peli kaadu (ei sivuvirheitä).
 *   2. LINJA AUKI: osio tarjoaa kolme GENERAATTORIN nimimerkkiä
 *      ("Adjektiivi Substantiivi"), eikä missään ole tekstikenttää
 *      nimimerkille.
 *   3. Retkikunnan perustus tallettaa koodin, jäsentunnuksen ja
 *      avaimen laitteelle ja näyttää liittymiskoodin.
 *   4. AUTOMAATTISÄHKE: uuteen maahan saapuminen lähettää
 *      POST /sahke pohjaId "saavuin".
 *   5. SAAPUVA SÄHKE nousee paperiliuskana pöllön saatteen kanssa, ja
 *      teksti on STOP-tyylinen pohjateksti — ei mitään verkosta tullutta
 *      vapaata tekstiä.
 *   6. KAVERIAPU, KYSYJÄN PÄÄ: nappi näkyy vasta kun retkikunta on
 *      olemassa ja rahaa on ≥ 25; painallus veloittaa 25 puntaa, lähettää
 *      POST /apu/kysy ja PYSÄYTTÄÄ TIIMALASIN.
 *   7. Saapuva veikkaus korostaa kaverin vaihtoehdon mutta EI vastaa:
 *      kaikki vastausnapit pysyvät auki.
 *   8. KAVERIAPU, VASTAANOTTOPÄÄ: apupyyntö nousee liuskana, ja
 *      vaihtoehdon napautus lähettää POST /apu/vastaa VEIKKAUKSEN
 *      INDEKSILLÄ.
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};

const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8741, r));

/* ==================== VALEWORKER ==================== */

/*
 * Workerin osoite luetaan js/sahke.js:stä, jotta savuke ei voi jäädä
 * eloon osoitteen vaihtuessa: jos vakion nimi tai arvo muuttuu, tämä
 * kaatuu heti eikä hiljaa mittaa väärää osoitetta.
 */
const lahde = readFileSync(join(JUURI, 'js/sahke.js'), 'utf8');
const osoite = lahde.match(/export const SAHKE_OSOITE = '([^']*)'/)?.[1];
if (!osoite) throw new Error('SAHKE_OSOITE-vakiota ei löytynyt js/sahke.js:stä');

/** Valeworkerin koko tila. Nollataan ajon vaiheiden välissä. */
const w = {
  paalla: false,
  koodi: 'BCDFGH',
  jasenet: ['Utelias Ilves'],
  sahkeet: [],
  apupyynnot: [],
  apuvastaukset: [],
  /** Kirjanpito siitä, mitä peli oikeasti lähetti. */
  loki: [],
};

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();

// Ulkopuoliset osoitteet (kuvat, äänet) katki, jottei ajo riipu verkosta.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

// Valeworkerin reitti REKISTERÖIDÄÄN VIIMEISENÄ: Playwrightissa
// viimeksi lisätty reitti voittaa, joten tämä ohittaa yllä olevan
// katkaisijan juuri sähkeosoitteen kohdalla.
await sivu.route(`${osoite}/**`, async (route) => {
  const pyynto = route.request();
  if (!w.paalla) { await route.abort(); return; }
  const polku = new URL(pyynto.url()).pathname;
  const metodi = pyynto.method();
  let runko = {};
  try { runko = pyynto.postDataJSON() ?? {}; } catch { runko = {}; }
  w.loki.push({ polku, metodi, runko });

  const vastaa = (data) => route.fulfill({
    status: 200,
    contentType: 'application/json; charset=utf-8',
    body: JSON.stringify(data),
  });

  if (metodi === 'HEAD') { await route.fulfill({ status: 200, body: '' }); return; }
  if (polku === '/retkikunta/luo') {
    await vastaa({ koodi: w.koodi, jasenId: 'jasen-1', avain: 'avain-1' });
    return;
  }
  if (polku === '/retkikunta/liity') {
    await vastaa({ jasenId: 'jasen-2', avain: 'avain-2', jasenet: w.jasenet });
    return;
  }
  if (polku === '/retkikunta/tila') {
    await vastaa({
      jasenet: w.jasenet,
      sahkeet: w.sahkeet,
      apupyynnot: w.apupyynnot,
      apuvastaukset: w.apuvastaukset,
    });
    return;
  }
  await vastaa({ ok: true });
});

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Peli käyntiin ja nappula Ateenaan. */
async function peliKayntiin() {
  await sivu.goto('http://127.0.0.1:8741/index.html', { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  return sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.player.money = 500;
    game.phase = 'action';
    ui.render();
    return { kaupunki: game.cityOf()?.id ?? '' };
  });
}

/** Retkikuntaosio ruudulle valikon omasta lomakkeesta (js/ui.js). */
function osioRuudulle() {
  return sivu.evaluate(() => {
    document.getElementById('savuke-osio')?.remove();
    const kehys = document.createElement('div');
    kehys.id = 'savuke-osio';
    kehys.appendChild(window.matkakirja.ui.palauteKentat(''));
    document.body.appendChild(kehys);
    const osio = kehys.querySelector('.sahke-osio');
    return {
      loytyi: Boolean(osio),
      teksti: (osio?.textContent ?? '').slice(0, 120),
      nappeja: osio?.querySelectorAll('button').length ?? 0,
      nimia: [...(osio?.querySelectorAll('.sahke-nimi') ?? [])].map((b) => b.textContent),
      kenttia: osio?.querySelectorAll('input, textarea').length ?? 0,
      koodi: osio?.querySelector('.sahke-koodiarvo')?.textContent ?? '',
    };
  });
}

/* ==================== 1. LINJA KIINNI ==================== */

w.paalla = false;
await peliKayntiin();
await sivu.waitForTimeout(1200);
const kiinni = await osioRuudulle();
vaadi('linja kiinni: osio kertoo "Sähkelinja avataan pian" eikä tarjoa nappeja',
  kiinni.loytyi && /Sähkelinja avataan pian/.test(kiinni.teksti) && kiinni.nappeja === 0,
  JSON.stringify(kiinni));
vaadi('linja kiinni: peli ei kaadu', virheet.length === 0, virheet.join(' | '));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-linja-kiinni.png') });

/* ==================== 2. LINJA AUKI ==================== */

w.paalla = true;
virheet.length = 0;
await sivu.evaluate(() => localStorage.clear());
await peliKayntiin();
await sivu.waitForTimeout(1500);

const auki = await osioRuudulle();
const nimetOk = auki.nimia.length === 3
  && auki.nimia.every((n) => /^[A-ZÄÖ][a-zäöå]+ [A-ZÄÖ][a-zäöå]+$/.test(n));
vaadi('linja auki: kolme generaattorin nimimerkkiä, ei nimimerkkikenttää',
  nimetOk && auki.kenttia === 1, JSON.stringify(auki.nimia));

/* ==================== 3. RETKIKUNNAN PERUSTUS ==================== */

const perustettu = await sivu.evaluate(async () => {
  const osio = document.querySelector('#savuke-osio .sahke-osio');
  osio.querySelector('.sahke-nimi').click();
  [...osio.querySelectorAll('button')].find((b) => /perusta retkikunta/i.test(b.textContent)).click();
  // Verkkokutsu kulkee valeworkerin kautta: odotetaan koodirivin
  // ilmestymistä enintään kolme sekuntia sen sijaan että arvattaisiin.
  for (let i = 0; i < 30 && !osio.querySelector('.sahke-koodiarvo'); i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 100));
  }
  let muisti = null;
  try { muisti = JSON.parse(localStorage.getItem('matkakirja-retkikunta')); } catch { muisti = null; }
  return {
    koodi: osio.querySelector('.sahke-koodiarvo')?.textContent ?? '',
    muisti,
  };
});
vaadi('perustus tallettaa koodin, jäsentunnuksen ja avaimen laitteelle',
  perustettu.koodi === w.koodi && perustettu.muisti?.jasenId === 'jasen-1'
  && perustettu.muisti?.avain === 'avain-1' && Boolean(perustettu.muisti?.nimimerkki),
  JSON.stringify(perustettu));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-retkikunta.png') });

/* ==================== 4. AUTOMAATTISÄHKE UUDESTA MAASTA ==================== */

w.loki.length = 0;
await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  // Ensimmäinen piirto kirjaa lähtötilanteen; toinen huomaa maanvaihdon.
  ui.render();
  await new Promise((r) => setTimeout(r, 200));
  const toinen = game.pack.cities.find((c) => game.pack.map.cityCountry?.[c.id]
    && game.pack.map.cityCountry[c.id] !== game.pack.map.cityCountry.ateena);
  game.player.pos = { type: 'city', city: toinen.id };
  game.world.visited.add(toinen.id);
  ui.render();
  await new Promise((r) => setTimeout(r, 700));
});
const saapumis = w.loki.filter((r) => r.polku === '/sahke' && r.runko.pohjaId === 'saavuin');
vaadi('uuteen maahan saapuminen lähettää automaattisähkeen "saavuin"',
  saapumis.length === 1 && Boolean(saapumis[0].runko.paikkaId)
  && saapumis[0].runko.avain === 'avain-1',
  JSON.stringify(saapumis[0]?.runko ?? null));

/* ==================== 5. SAAPUVA SÄHKE PAPERILIUSKANA ==================== */

w.sahkeet = [{
  id: 's1',
  lahettaja: 'Höyryävä Majakka',
  pohjaId: 'aarre-loytyi',
  paikkaId: 'ateena',
  aika: new Date().toISOString(),
}];
const liuska = await sivu.evaluate(async () => {
  document.dispatchEvent(new Event('visibilitychange'));
  await new Promise((r) => setTimeout(r, 900));
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 400));
  const el = document.querySelector('.sahke-liuska');
  return {
    onko: Boolean(el),
    saate: el?.querySelector('.sahke-saate')?.textContent ?? '',
    teksti: el?.querySelector('.sahke-teksti')?.textContent ?? '',
    alarivi: el?.querySelector('.sahke-alarivi')?.textContent ?? '',
  };
});
vaadi('saapuva sähke nousee liuskana pöllön saatteella ja STOP-tekstillä',
  liuska.onko && /STOP$/.test(liuska.teksti) && /AARRE LÖYTYNYT ATEENA/.test(liuska.teksti)
  && liuska.saate.length > 0 && !/!/.test(liuska.saate)
  && /Höyryävä Majakka/.test(liuska.alarivi),
  JSON.stringify(liuska));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-liuska.png') });

await sivu.evaluate(() => document.querySelector('.sahke-sulje')?.click());
w.sahkeet = [];

/* ==================== 6. KAVERIAPU: KYSYJÄN PÄÄ ==================== */

/** Laattakysymys auki ja vaihtoehdot esillä (kirjoituskone ajettu läpi). */
const kysymys = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  ui.busy = false;
  game.player.pos = { type: 'city', city: 'ateena' };
  game.phase = 'action';
  if (!game.tokens.has('ateena')) game.world.tokens.set('ateena', 'coin');
  game.actionQuiz({ form: 'quiz' });
  ui.render();
  // Kortti paljastuu vaiheittain; "Aloita peli" -portti painetaan ja
  // vaihtoehtoja odotetaan enintään 15 s.
  for (let i = 0; i < 150; i += 1) {
    const aloita = document.getElementById('quiz-aloita');
    if (aloita && !aloita.hidden) aloita.click();
    if (!document.getElementById('quiz-options').hidden) break;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 100));
  }
  ui.render();
  const nappi = document.getElementById('quiz-kaveriapu');
  return {
    vaihe: game.phase,
    vaihtoehtoja: game.quiz?.options?.length ?? 0,
    nappi: Boolean(nappi) && !nappi.hidden,
    teksti: nappi?.textContent ?? '',
  };
});
vaadi('kysymysdialogissa on "Kysy kaverilta (25 £)" -nappi',
  kysymys.nappi && /Kysy kaverilta \(25 £\)/.test(kysymys.teksti), JSON.stringify(kysymys));

w.loki.length = 0;
const kysytty = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  const rahaEnnen = game.player.money;
  ui.busy = false;
  document.getElementById('quiz-kaveriapu').click();
  await new Promise((r) => setTimeout(r, 900));
  return {
    rahaEnnen,
    rahaJalkeen: game.player.money,
    kello: ui.quizTimer,
    kortti: Boolean(document.getElementById('sahke-apukortti'))
      && !document.getElementById('sahke-apukortti').hidden,
    kortinTeksti: document.getElementById('sahke-apukortti')?.textContent ?? '',
  };
});
const kysyLoki = w.loki.find((r) => r.polku === '/apu/kysy');
vaadi('kaveriapu veloittaa 25 puntaa pelin omalla kirjanpidolla',
  kysytty.rahaEnnen - kysytty.rahaJalkeen === 25, JSON.stringify(kysytty));
vaadi('kaveriapu lähettää /apu/kysy kysymyksen ja vaihtoehtojen kanssa',
  Boolean(kysyLoki) && typeof kysyLoki.runko.kysymys === 'string'
  && Array.isArray(kysyLoki.runko.vaihtoehdot) && kysyLoki.runko.vaihtoehdot.length >= 2
  && typeof kysyLoki.runko.apuId === 'string',
  JSON.stringify({ apuId: kysyLoki?.runko?.apuId, n: kysyLoki?.runko?.vaihtoehdot?.length }));
vaadi('aika pysähtyy: tiimalasi ei käy odotuksen aikana',
  kysytty.kello === null && kysytty.kortti && /Aika on pysähtynyt/.test(kysytty.kortinTeksti),
  JSON.stringify({ kello: kysytty.kello, kortti: kysytty.kortti }));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-kaveriapu-odottaa.png') });

/* ==================== 7. VEIKKAUS SAAPUU ==================== */

w.apuvastaukset = [{
  apuId: kysyLoki.runko.apuId,
  vastaaja: 'Utelias Ilves',
  veikkaus: 1,
  aika: new Date().toISOString(),
}];
const veikkaus = await sivu.evaluate(async () => {
  document.dispatchEvent(new Event('visibilitychange'));
  await new Promise((r) => setTimeout(r, 900));
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 300));
  const napit = [...document.querySelectorAll('.quiz-option')];
  return {
    kortti: document.getElementById('sahke-apukortti')?.textContent ?? '',
    korostettu: napit.findIndex((b) => b.classList.contains('sahke-veikattu')),
    lukittuja: napit.filter((b) => b.disabled).length,
    nappeja: napit.length,
    kelloYha: window.matkakirja.ui.quizTimer,
  };
});
vaadi('kaverin veikkaus korostaa vaihtoehdon ja kertoo kuka veikkaa',
  veikkaus.korostettu === 1 && /Utelias Ilves veikkaa:/.test(veikkaus.kortti),
  JSON.stringify(veikkaus));
vaadi('veikkaus ei vastaa puolesta: kaikki vaihtoehdot pysyvät auki',
  veikkaus.lukittuja === 0 && veikkaus.nappeja >= 2, JSON.stringify(veikkaus));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-veikkaus.png') });

/* ==================== 8. KAVERIAPU: VASTAANOTTOPÄÄ ==================== */

// Odotus pois ja kysymys kiinni, jotta liuska saa vapaan ruudun.
w.apuvastaukset = [];
await sivu.evaluate(async () => {
  [...document.querySelectorAll('#sahke-apukortti button')]
    .find((b) => /selvä/i.test(b.textContent))?.click();
  const { game, ui } = window.matkakirja;
  game.quiz = null;
  game.phase = 'action';
  ui.busy = false;
  ui.render();
  await new Promise((r) => setTimeout(r, 300));
});

w.apupyynnot = [{
  apuId: 'apu-kaverilta',
  kysyja: 'Vaitelias Kompassi',
  kysymys: 'Minkä joen varrella Kairo sijaitsee?',
  vaihtoehdot: ['Niili', 'Kongo', 'Niger'],
  aika: new Date().toISOString(),
}];
w.loki.length = 0;
const pyynto = await sivu.evaluate(async () => {
  document.dispatchEvent(new Event('visibilitychange'));
  await new Promise((r) => setTimeout(r, 900));
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 400));
  const el = document.querySelector('.sahke-liuska.sahke-apupyynto');
  return {
    onko: Boolean(el),
    saate: el?.querySelector('.sahke-saate')?.textContent ?? '',
    kysymys: el?.querySelector('.sahke-kysymys')?.textContent ?? '',
    vaihtoehtoja: el?.querySelectorAll('.sahke-vaihtoehto').length ?? 0,
    kenttia: el?.querySelectorAll('input, textarea').length ?? 0,
  };
});
vaadi('apupyyntö nousee liuskana kysymyksineen ja vaihtoehtoineen',
  pyynto.onko && pyynto.vaihtoehtoja === 3 && pyynto.kenttia === 0
  && /pyytävät apua arvoitukseen/.test(pyynto.saate),
  JSON.stringify(pyynto));
await sivu.screenshot({ path: join(ULOS, 'savuke-sahke-apupyynto.png') });

await sivu.evaluate(async () => {
  document.querySelectorAll('.sahke-vaihtoehto')[2].click();
  await new Promise((r) => setTimeout(r, 700));
});
const vastausLoki = w.loki.find((r) => r.polku === '/apu/vastaa');
vaadi('vaihtoehdon napautus lähettää veikkauksen INDEKSINÄ',
  vastausLoki?.runko?.veikkaus === 2 && vastausLoki?.runko?.apuId === 'apu-kaverilta',
  JSON.stringify(vastausLoki?.runko ?? null));

const liuskaJaljella = await sivu.evaluate(() => document.querySelectorAll('.sahke-liuska').length);
vaadi('vastattu apupyyntö sulkeutuu ruudulta', liuskaJaljella === 0, String(liuskaJaljella));

vaadi('ei sivuvirheitä sähkeajossa', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
