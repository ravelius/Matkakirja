/*
 * SELAINSAVUKE: IHMISEN MATKAN TUTKIMUSVAIHE
 * (js/linssit/ihmisen-matka-tutkimus.js; omistaja 7.9.2026 ilta,
 * Raamattu "IHMISEN MATKA: KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI
 * NAPPIA, PULUN VALIHUOMIOT").
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-tutkimus.mjs
 *
 * ESITYSTÄ EI AJETA. Tutkimusvaihe alkaa yhdestä kutsusta
 * (`ui.aloitaTutkimusvaihe()`), jonka kertomusmoottori tekee esityksen
 * päätteeksi — savuke tekee saman kutsun heti Käynnistä-napin jälkeen,
 * jolloin vartio mittaa vain tutkimusvaihetta eikä neljän minuutin
 * kertomusta. Vanojen on silti oltava valmiit (virrat.valmis), koska
 * nostojen sävy ja nappien rajaus luetaan niistä.
 *
 * VÄITTEET (kummassakin näkymässä, 834 × 1100 ja 390 × 844):
 *   1. Tutkimusvaihe käynnistyy ja kello seisoo: vanat ovat kokonaan
 *      piirretyt eikä kamera enää seuraa ketään.
 *   2. NOSTOT: kartalla on vähintään 30 hehkuvaa nostoa (20
 *      löytöpaikkaa + lisänostot), ja jokaisella on oma sävynsä.
 *   3. KORTTI: noston napautus (laudan oma linssimerkkipolku) avaa
 *      kortin, jossa on otsikko, ajoitus, teksti, lähde ja 2–3
 *      valmista kysymystä.
 *   4. KYSYMYS: kysymysnapin painallus vie kysymyksen pulun chattiin
 *      (viesti näkyy virrassa pelaajan omana repliikkinä).
 *   5. NAPPI V3 (Siperia): kamera kääntyy niin että vana näkyy, vana
 *      korostuu ja pergamenttilappu kertoo yhteenvedon.
 *   6. Toinen napautus samaan nappiin palauttaa kaikki.
 *   7. Esinerivi (karuselli) on näkyvissä tutkimusvaiheessa.
 *   8. Linssin sulku (✕) purkaa kaiken: ei nostoja, ei nappeja, ei
 *      body-luokkaa.
 *   9. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET: tutkimusvaihe auki, kortti auki, vana valittuna.
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
await new Promise((r) => palvelin.listen(8749, r));

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
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virhelista.push(String(e)));
  return { konteksti, sivu };
}

/** Peli auki pallolaudalle Ateenaan; pöllö löydettynä (kysymysnapit). */
async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8749/index.html?lauta=pallo', { waitUntil: 'load' });
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

/** Kameran liuku perille (kontin ohjelmisto-WebGL piirtää hitaasti). */
async function rauhoitu(s, kierroksia = 25) {
  await s.evaluate(async (n) => {
    const { ui } = window.matkakirja;
    const lue = () => {
      const a = ui.nakyvaAlue();
      return `${Math.round(a.x)},${Math.round(a.y)},${a.skaala.toFixed(5)}`;
    };
    let edellinen = null;
    for (let i = 0; i < n; i += 1) {
      await new Promise((r) => setTimeout(r, 400));
      const nyt = lue();
      if (nyt === edellinen && i > 1) break;
      edellinen = nyt;
    }
  }, kierroksia);
}

for (const nakyma of ['tabletti', 'puhelin']) {
  const virhelista = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakyma], virhelista);
  const kuva = (tunnus) => join(ULOS, `savuke-ihmisen-tutkimus-${nakyma}-${tunnus}.png`);
  const nimessa = (teksti) => `${teksti} (${nakyma})`;

  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt 45 s:ssa');

  /* --- 1. Linssi käyntiin ja tutkimusvaihe heti perään --------------- */
  const alku = await s.evaluate(async () => {
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
    // Käynnistä vie mustan peitteen pois; esitystä ei ajeta pidemmälle.
    document.querySelector('.aikajana-avaus-nappi')?.click();
    await new Promise((r) => setTimeout(r, 600));
    /*
     * KENTTÄ LUETAAN ENSIN MUUTTUJAAN. `ui.aloitaTutkimusvaihe` ei ole
     * UI-luokan metodi vaan kenttä, jonka js/aikajana.js asettaa ajon
     * ajaksi — savukevartija (tools/tarkista-savukkeet.mjs) vaatii
     * kutsulta luokan metodin, joten kenttää kutsutaan lukemalla se.
     */
    const aloita = ui.aloitaTutkimusvaihe;
    const lahti = typeof aloita === 'function' ? aloita() : false;
    // Kirjasto rakentaa merkkien elementit seuraavassa piirrossa, ja
    // kontin ohjelmisto-WebGL piirtää harvakseltaan: odotetaan ruutua,
    // ei kelloa.
    for (let i = 0; i < 100; i += 1) {
      if (document.querySelectorAll('.ihmisen-nosto').length >= 30) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    const tila = ui.tutkimusvaihe?.tila?.() ?? null;
    return {
      lahti: Boolean(lahti),
      tila,
      kaynnissa: Boolean(ajo.kaynnissa),
      seuraa: Boolean(ajo.virrat.ohjaaKameraa()),
      nostoja: document.querySelectorAll('.ihmisen-nosto').length,
      nappeja: document.querySelectorAll('.ihmisen-vananappi').length,
      savyja: new Set([...document.querySelectorAll('.ihmisen-nosto')]
        .map((el) => el.style.getPropertyValue('--nosto-savy'))).size,
      nauha: Boolean(document.querySelector('.aikajana-nauha')),
      nauhaTyhja: document.querySelector('.aikajana-nauha')?.classList.contains('tyhja') ?? null,
      chattiAuki: document.body.classList.contains('aikajana-tutkimus-auki'),
    };
  });
  vaadi(nimessa('tutkimusvaihe käynnistyy: kello seis, kamera vapaa'),
    alku.lahti && alku.kaynnissa === false && alku.seuraa === false && alku.chattiAuki,
    JSON.stringify({ lahti: alku.lahti, kaynnissa: alku.kaynnissa, seuraa: alku.seuraa, virhe: alku.virhe }));

  /* --- 2. Nostot kartalla ------------------------------------------- */
  vaadi(nimessa('kartalla vähintään 30 hehkuvaa nostoa, useita sävyjä'),
    alku.nostoja >= 30 && alku.savyja >= 3 && alku.nappeja === 5,
    `nostoja ${alku.nostoja}, sävyjä ${alku.savyja}, nappeja ${alku.nappeja}, mittari ${JSON.stringify(alku.tila)}`);

  /* --- 7. Esinerivi näkyvissä --------------------------------------- */
  vaadi(nimessa('esinerivi (karuselli) on näkyvissä tutkimusvaiheessa'),
    alku.nauha === true && alku.nauhaTyhja === false, `nauha ${alku.nauha}, tyhjä ${alku.nauhaTyhja}`);

  await rauhoitu(s, 12);
  await s.screenshot({ path: kuva('vaihe') });

  /* --- 3. Kortti auki laudan omalla napautuspolulla ------------------ */
  const kortti = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    // Sama tie kuin pelaajan sormella: laudan linssimerkin `napautus`
    // (js/pallolauta/lauta.js lahinLinssimerkki → napautus(d)).
    const merkit = ui.pallolauta.merkit.napautettavat();
    const merkki = merkit.find((d) => d.avain === 'tutkimus:toba');
    if (!merkki) return { virhe: `linssimerkkejä ${merkit.length}, tutkimus:toba puuttuu` };
    merkki.napautus(merkki);
    await new Promise((r) => setTimeout(r, 400));
    const el = document.querySelector('.ihmisen-nostokortti');
    return {
      auki: Boolean(el && !el.hidden),
      otsikko: el?.querySelector('.ihmisen-nostokortti-otsikko')?.textContent ?? null,
      ajoitus: el?.querySelector('.ihmisen-nostokortti-ajoitus')?.textContent ?? null,
      lahde: el?.querySelector('.ihmisen-nostokortti-lahde')?.textContent ?? null,
      teksti: (el?.querySelector('.ihmisen-nostokortti-teksti')?.textContent ?? '').length,
      kysymyksia: el?.querySelectorAll('.ihmisen-nostokysymys').length ?? 0,
      // Kortti ei saa valua ruudun ulkopuolelle kummassakaan näkymässä.
      mahtuu: el ? (el.getBoundingClientRect().bottom <= window.innerHeight + 1
        && el.getBoundingClientRect().right <= window.innerWidth + 1) : false,
    };
  });
  vaadi(nimessa('noston napautus avaa kortin kysymyksineen'),
    kortti.auki && /Tulivuori/.test(kortti.otsikko ?? '') && kortti.teksti > 100
      && kortti.kysymyksia >= 2 && kortti.kysymyksia <= 3 && /en-Wikipedia/.test(kortti.lahde ?? '')
      && kortti.mahtuu,
    JSON.stringify(kortti));
  await s.screenshot({ path: kuva('kortti') });

  /* --- 4. Kysymys pulun chattiin ------------------------------------ */
  const kysymys = await s.evaluate(async () => {
    const nappi = document.querySelector('.ihmisen-nostokysymys');
    const teksti = nappi?.textContent ?? '';
    nappi?.click();
    await new Promise((r) => setTimeout(r, 700));
    const viestit = [...document.querySelectorAll('.pollo-viesti.pollo-kayttaja')].map((v) => v.textContent);
    return {
      teksti,
      merkitty: Boolean(nappi?.classList.contains('lahetetty')),
      chatissa: viestit.some((v) => v.trim() === teksti.trim()),
      paneeli: Boolean(document.querySelector('.pollo-paneeli')),
      kysymyksia: window.matkakirja.ui.tutkimusvaihe?.tila?.().kysymyksia ?? 0,
    };
  });
  vaadi(nimessa('kysymysnappi vie kysymyksen pulun chattiin'),
    kysymys.merkitty && kysymys.chatissa && kysymys.kysymyksia === 1,
    JSON.stringify(kysymys));

  /* --- 5. Nappi V3 (Siperia) kääntää kameran ja korostaa ------------- */
  const ennen = await s.evaluate(() => {
    const a = window.matkakirja.ui.nakyvaAlue();
    return { x: a.x, y: a.y, skaala: a.skaala };
  });
  await s.evaluate(() => {
    // Kolmas nappi = kolmas virta (V3 Siperia).
    document.querySelectorAll('.ihmisen-vananappi')[2].click();
  });
  await rauhoitu(s, 20);
  const valinta = await s.evaluate(() => {
    const napit = [...document.querySelectorAll('.ihmisen-vananappi')];
    const a = window.matkakirja.ui.nakyvaAlue();
    const lappu = document.querySelector('.ihmisen-vanalappu');
    return {
      alue: { x: a.x, y: a.y, skaala: a.skaala },
      valittuja: napit.filter((n) => n.classList.contains('valittu')).length,
      valittuKolmas: napit[2].classList.contains('valittu'),
      lappuAuki: Boolean(lappu && !lappu.hidden && lappu.classList.contains('esilla')),
      otsikko: lappu?.querySelector('.ihmisen-vanalappu-otsikko')?.textContent ?? null,
      yhteenveto: (lappu?.querySelector('.ihmisen-vanalappu-teksti')?.textContent ?? '').length,
      mahtuu: lappu ? lappu.getBoundingClientRect().top > 0 : false,
      // Vanojen korostus: valitun peittävyys 1, muiden 0,35-kertainen.
      tila: window.matkakirja.ui.tutkimusvaihe.tila(),
    };
  });
  const liikkui = Math.abs(valinta.alue.x - ennen.x) > 20 || Math.abs(valinta.alue.y - ennen.y) > 20
    || Math.abs(Math.log(valinta.alue.skaala / ennen.skaala)) > 0.05;
  vaadi(nimessa('V3 Siperia: kamera kääntyy, vana korostuu, lappu kertoo yhteenvedon'),
    liikkui && valinta.valittuKolmas && valinta.valittuja === 1 && valinta.lappuAuki
      && valinta.otsikko === 'Siperia' && valinta.yhteenveto > 150 && valinta.mahtuu
      && valinta.tila.valittu === 'siperia',
    JSON.stringify({ liikkui, ennen, ...valinta }));
  await s.screenshot({ path: kuva('vana-v3') });

  /* --- 6. Toinen napautus palauttaa kaikki -------------------------- */
  const paluu = await s.evaluate(async () => {
    document.querySelectorAll('.ihmisen-vananappi')[2].click();
    await new Promise((r) => setTimeout(r, 400));
    const lappu = document.querySelector('.ihmisen-vanalappu');
    return {
      valittuja: [...document.querySelectorAll('.ihmisen-vananappi')].filter((n) => n.classList.contains('valittu')).length,
      lappuPiilossa: Boolean(lappu?.hidden),
      valittu: window.matkakirja.ui.tutkimusvaihe.tila().valittu,
    };
  });
  vaadi(nimessa('toinen napautus samaan nappiin palauttaa kaikki'),
    paluu.valittuja === 0 && paluu.lappuPiilossa && paluu.valittu === null, JSON.stringify(paluu));

  /* --- 8. Sulku purkaa kaiken --------------------------------------- */
  const sulku = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.aikajana-sulje')?.click();
    /*
     * PURKU ON SIIRTYMÄN MITTAINEN JA PALLO SAA NUKKUA (sama odotus
     * kuin savuke-aikajana.mjs:n Sulje-vartiossa): merkit poistuvat
     * listalta heti, mutta kirjasto siivoaa niiden elementit vasta
     * seuraavalla piirrolla — ja kontissa se voi olla sekuntien päässä.
     */
    for (let i = 0; i < 80; i += 1) {
      if (!ui.aikajana && !document.querySelectorAll('.ihmisen-nosto').length) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    return {
      listalla: (ui.pallonInstanssi?.htmlElementsData?.() ?? [])
        .filter((d) => String(d.avain ?? '').startsWith('tutkimus:')).length,
      aikajana: Boolean(window.matkakirja.ui.aikajana),
      tutkimusvaihe: Boolean(window.matkakirja.ui.tutkimusvaihe),
      nostoja: document.querySelectorAll('.ihmisen-nosto').length,
      nappeja: document.querySelectorAll('.ihmisen-vananappi').length,
      kerros: document.querySelectorAll('.ihmisen-tutkimus').length,
      luokka: document.body.classList.contains('aikajana-tutkimus-auki'),
      pallo: Boolean(window.matkakirja.ui.pallolauta),
    };
  });
  vaadi(nimessa('sulku (✕) purkaa tutkimusvaiheen ja jättää pallon'),
    !sulku.aikajana && !sulku.tutkimusvaihe && sulku.nostoja === 0 && sulku.listalla === 0
      && sulku.nappeja === 0
      && sulku.kerros === 0 && !sulku.luokka && sulku.pallo, JSON.stringify(sulku));

  vaadi(nimessa('ei sivuvirheitä'), virhelista.length === 0, virhelista.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
