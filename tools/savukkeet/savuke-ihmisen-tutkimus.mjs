/*
 * SELAINSAVUKE: IHMISEN MATKAN PALKKI, KORTTI, MUISTI JA TUTKIMUSVAIHE
 * (js/aikajana.js rakennaPalkki, js/linssit/ihmisen-matka-kortti.js,
 * js/linssit/ihmisen-matka-muisti.js, js/linssit/ihmisen-matka-
 * tutkimus.js; omistaja 7.9.2026 ilta, Raamattu "IHMISEN MATKA: KAARI
 * HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA, PULUN VALIHUOMIOT" ja
 * "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN NOSTOIHIN KUVA,
 * LINSSI MUISTAA PAIKKANSA").
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-tutkimus.mjs
 *
 * KOKO ESITYSTÄ EI AJETA (se on savuke-ihmisen-esitys.mjs:n työ).
 * Tämä savuke katsoo, mitä pelaajan SORMEN alla tapahtuu: palkki
 * yläpalkin tilalla, kortti kartan kohdasta, linssin muisti sulun yli
 * ja tutkimusvaihe. Tutkimusvaiheeseen mennään SITÄ TIETÄ, jonka
 * pelaaja kulkee toisella avauksella: koukku kerran, sulku, ja muisti
 * jatkaa suoraan tutkimusvaiheesta ilman mustaa alkua.
 *
 * VÄITTEET (kummassakin näkymässä, 834 × 1100 ja 390 × 844):
 *   1. YKSI PALKKI: Matkakirjan yläpalkki on piilossa mutta ruudukossa
 *      (kartta ei kutistu), ja linssin palkissa ovat nimi, kello,
 *      viisi väripilkkua ja ✕. Alareunan karusellia ei ole.
 *   2. AITO NAPAUTUS ESITYKSEN AIKANA: kartan lampun napautus
 *      RUUTUKOORDINAATILLA (page.mouse, ei elementin dispatch) avaa
 *      noston kortin ja panee esityksen tauolle; sulku jatkaa.
 *   2b. AIKASELAIN (7.9.2026, Raamattu LINSSIEN AIKASELAIN ALAREUNAAN):
 *      alareunan nauhalla on 22 viivaa tasavälein, aalto valitun
 *      ympärillä ja vuosiluku sen päällä; AITO VETO ruutukoordinaateilla
 *      kelaa kellon ja vaientaa kertojan, ja irrotus vaihtaa jakson ja
 *      jatkaa esitystä siitä. Tutkimusvaiheessa (5a) sama valinta on
 *      pelkkä kelaus ilman kertojaa.
 *   3. MUISTI, ESITYS: ✕ ja uusi avaus jatkavat samasta jaksosta —
 *      ei mustaa peitettä, ei Käynnistä-nappia.
 *   4. MUISTI, TUTKIMUS: kun sulku tapahtui tutkimusvaiheessa, uusi
 *      avaus alkaa suoraan tutkimusvaiheesta (nostot kartalla).
 *   5. NOSTOT: kartalla on 40 hehkuvaa nostoa useassa sävyssä, ja
 *      hehkun napautus RUUTUKOORDINAATILLA avaa kortin.
 *   6. KORTTI: ajoitus, otsikko, kuva-alue (löytöpaikalla kaksi
 *      kehystä, lisänostolla kuvituskuva tai sen varapaikka), teksti,
 *      lähde ja 2–3 valmista kysymystä; kysymys menee pulun chattiin.
 *   7. LUE LISÄÄ: löytöpaikan kortista aukeaa Tiedeliite, jonka
 *      sisällys on YKSI aikajärjestyksen lista väripilkkuineen.
 *   8. VIISI NAPPIA: V3 (Siperia) kääntää kameran, korostaa vanan ja
 *      avaa lapun; toinen napautus palauttaa kaikki.
 *   9. ALOITA ALUSTA (↺): muisti tyhjenee ja linssi alkaa alusta.
 *  10. Linssin sulku (✕) purkaa kaiken ja palauttaa yläpalkin.
 *  11. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET: palkki esityksen aikana, kortti esityksen päällä,
 * aikaselain vedossa, tutkimusvaihe, aikaselain tutkimusvaiheessa,
 * löytöpaikan kortti, lisänoston kortti, Tiedeliitteen sisällys, vana
 * valittuna.
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

/** Linssi laukusta ja vanat valmiiksi laskettuina. */
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

/**
 * RUUTUKOORDINAATTI KARTAN KOHDASTA (omistajan vika 7.9.2026: *"jos
 * klikkaa valopalloa kartalla, niin tällä hetkellä ei tapahdu
 * mitään"*). Elementin oma `click()` ei kelpaa vartioksi: merkkikerros
 * on pointer-events: none, ja pelaajan napautus kulkee pallon pinnan
 * osumatestin kautta (js/pallolauta/lauta.js napautaPintaan). Siksi
 * haetaan PALLON ETUPUOLELLA oleva merkki (kirjasto merkitsee takana
 * olevat luokalla `pallolauta-takana`) reilusti ruudun sisältä ja
 * napautetaan sitä page.mouse-koordinaatilla.
 */
async function ruutupaikka(s, valitsin) {
  return s.evaluate((v) => {
    const varaa = 12;
    const ehdokkaat = [...document.querySelectorAll(`${v}:not(.pallolauta-takana)`)]
      .map((e) => ({ e, r: e.getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && r.height > 0
        && r.top > 130 && r.bottom < window.innerHeight - 90
        && r.left > 40 && r.right < window.innerWidth - 40);
    if (!ehdokkaat.length) return null;
    // Keskimmäinen: reunimmaiset ovat pallon kaarella ja liikkuvat eniten.
    const { e, r } = ehdokkaat[Math.floor(ehdokkaat.length / 2)];
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const paalla = document.elementFromPoint(x, y);
    return {
      x, y, varaa, ehdokkaita: ehdokkaat.length,
      otsikko: e.getAttribute('title') ?? e.getAttribute('aria-label') ?? null,
      paalla: paalla?.tagName ?? null,
    };
  }, valitsin);
}

/** Kortin sisältö mittarina. */
async function kortinTila(s) {
  return s.evaluate(() => {
    const el = document.querySelector('.ihmisen-nostokortti');
    const r = el?.getBoundingClientRect();
    return {
      auki: Boolean(el && !el.hidden),
      laji: el?.dataset?.laji ?? null,
      otsikko: el?.querySelector('.ihmisen-nostokortti-otsikko')?.textContent ?? null,
      ajoitus: el?.querySelector('.ihmisen-nostokortti-ajoitus')?.textContent ?? null,
      lahde: el?.querySelector('.ihmisen-nostokortti-lahde')?.textContent ?? null,
      teksti: (el?.querySelector('.ihmisen-nostokortti-teksti')?.textContent ?? '').length,
      kehyksia: el?.querySelectorAll('.ihmisen-nostokortti-kuvakehys').length ?? 0,
      varapaikkoja: el?.querySelectorAll('.ihmisen-nostokortti-varakuva').length ?? 0,
      kuvia: el?.querySelectorAll('.ihmisen-nostokortti-kuva').length ?? 0,
      lue: Boolean(el?.querySelector('.ihmisen-nostokortti-lue')),
      kysymyksia: el?.querySelectorAll('.ihmisen-nostokysymys').length ?? 0,
      mahtuu: r ? (r.bottom <= window.innerHeight + 1 && r.right <= window.innerWidth + 1 && r.top >= 0) : false,
    };
  });
}

for (const nakyma of ['tabletti', 'puhelin']) {
  const virhelista = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakyma], virhelista);
  const kuva = (tunnus) => join(ULOS, `savuke-ihmisen-tutkimus-${nakyma}-${tunnus}.png`);
  const nimessa = (teksti) => `${teksti} (${nakyma})`;

  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt 45 s:ssa');

  /* --- 1. Linssi auki, palkki yläpalkin tilalle ---------------------- */
  const avaus = await avaaLinssi(s);
  const esitykseen = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.aikajana-avaus-nappi')?.click();
    // Pimeä väistyy avausjakson jälkeen (VALOJEN_MS); vasta sitten
    // kartta on napautettavissa ja palkki mitattavissa.
    for (let i = 0; i < 240; i += 1) {
      if (ui.aikajana?.esitys?.tila?.().vaihe === 'matka') break;
      await new Promise((r) => setTimeout(r, 250));
    }
    await new Promise((r) => setTimeout(r, 1500));
    const palkki = document.querySelector('.aikajana-ylarivi');
    const topbar = document.querySelector('.topbar');
    const kartta = document.querySelector('.pallo-kotelo') ?? ui.mapPane;
    const nauha = document.querySelector('.aikajana-nauha');
    return {
      vaihe: ui.aikajana?.esitys?.tila?.().vaihe ?? null,
      jakso: ui.aikajana?.esitys?.tila?.().jakso ?? null,
      palkki: palkki?.classList.contains('aikajana-palkki') ?? false,
      palkkiKorkeus: Math.round(palkki?.getBoundingClientRect().height ?? 0),
      palkkiLeveys: Math.round(palkki?.getBoundingClientRect().width ?? 0),
      otsikko: palkki?.querySelector('.aikajana-otsikko')?.textContent ?? null,
      kello: Boolean(palkki?.querySelector('.aikajana-kello')),
      pilkkuja: palkki?.querySelectorAll('.ihmisen-vananappi-pilkku').length ?? 0,
      sulje: Boolean(palkki?.querySelector('.aikajana-sulje')),
      alusta: Boolean(palkki?.querySelector('.aikajana-alusta')),
      topbarNakyvyys: topbar ? getComputedStyle(topbar).visibility : null,
      topbarKorkeus: Math.round(topbar?.getBoundingClientRect().height ?? -1),
      karuselli: nauha ? getComputedStyle(nauha).display : 'ei-nauhaa',
      karttaKorkeus: Math.round(kartta?.getBoundingClientRect().height ?? 0),
      ikkuna: window.innerHeight,
      peite: Boolean(document.querySelector('.aikajana-esitys-peite')),
      hampurilainen: document.querySelector('.topbar .menu-btn, .topbar button')
        ? getComputedStyle(document.querySelector('.topbar')).visibility : null,
    };
  });
  /*
   * KARTTA EI SAA KUTISTUA. Yläpalkki jää ruudukkoon nollan korkuisena
   * (css/aikajana.css: visibility, ei display) — display: none pudotti
   * kartan riville 1 ja auto-korkeuteen (mitattu 834 × 1100: 814 px
   * korkea neliö). Kartan on siis oltava lähes ikkunan korkuinen.
   */
  vaadi(nimessa('yksi palkki: yläpalkki piilossa, kartta ei kutistu, karusellia ei ole'),
    esitykseen.palkki && esitykseen.topbarNakyvyys === 'hidden' && esitykseen.topbarKorkeus === 0
      && esitykseen.karuselli === 'none' && esitykseen.karttaKorkeus > esitykseen.ikkuna * 0.9
      && !esitykseen.peite,
    JSON.stringify(esitykseen));
  vaadi(nimessa('palkissa nimi, kello, viisi väripilkkua ja ✕'),
    /IHMISEN MATKA/i.test(esitykseen.otsikko ?? '') && esitykseen.kello
      && esitykseen.pilkkuja === 5 && esitykseen.sulje && esitykseen.alusta
      && avaus.avausnappi,
    JSON.stringify({ otsikko: esitykseen.otsikko, pilkkuja: esitykseen.pilkkuja, avausnappi: avaus.avausnappi }));
  await s.screenshot({ path: kuva('palkki') });

  /* --- 2. AITO NAPAUTUS: lamppu esityksen aikana --------------------- */
  const lampunPaikka = await ruutupaikka(s, '.aikajana-valo-pallolla');
  if (lampunPaikka) await s.mouse.click(lampunPaikka.x, lampunPaikka.y);
  await s.waitForTimeout(900);
  const lampunKortti = await kortinTila(s);
  const taukoTila = await s.evaluate(() => window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? null);
  vaadi(nimessa('lampun napautus ruutukoordinaatilla avaa kortin ja panee esityksen tauolle'),
    Boolean(lampunPaikka) && lampunKortti.auki && lampunKortti.kehyksia >= 1 && taukoTila?.tauolla === true,
    JSON.stringify({ lampunPaikka, lampunKortti, tauolla: taukoTila?.tauolla }));
  await s.screenshot({ path: kuva('kortti-esityksessa') });
  const jatkui = await s.evaluate(async () => {
    document.querySelector('.ihmisen-nostokortti-sulje')?.click();
    await new Promise((r) => setTimeout(r, 600));
    return window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? null;
  });
  vaadi(nimessa('kortin sulku jatkaa esitystä'), jatkui?.tauolla === false && jatkui?.kaynnissa === true,
    JSON.stringify(jatkui));

  /* --- 2b. AIKASELAIN: veto kelaa, irrotus jatkaa -------------------- */
  /*
   * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN" (omistaja 7.9.2026 klo
   * 20.55). Veto tehdään AIDOILLA RUUTUKOORDINAATEILLA (page.mouse) eikä
   * elementin dispatchilla: nauhan koko idea on yksi kosketuspinta, joka
   * ottaa osoittimen kiinni (setPointerCapture) eikä päästä palloa
   * panoroimaan altaan — sitä ei voi todistaa muuten kuin sormella.
   * Yksikkötestit näkevät asettelun ja aallon (tests/aikaselain.test.mjs),
   * mutta eivät sitä, kelaako kello ja vaihtuuko jakso.
   */
  const nauhanMitat = await s.evaluate(() => {
    const nauha = document.querySelector('.aikaselain');
    if (!nauha) return null;
    const r = nauha.getBoundingClientRect();
    const viivat = [...nauha.querySelectorAll('.aikaselain-viiva')]
      .map((v) => v.getBoundingClientRect());
    const teksti = document.querySelector('.aikajana-kertomusteksti')?.getBoundingClientRect() ?? null;
    return {
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      pohjassa: Math.round(window.innerHeight - r.bottom),
      viivoja: viivat.length,
      vali: viivat.length > 1 ? Math.round((viivat[1].left - viivat[0].left) * 10) / 10 : null,
      korkein: Math.round(Math.max(...viivat.map((v) => v.height))),
      matalin: Math.round(Math.min(...viivat.map((v) => v.height))),
      vuosi: nauha.querySelector('.aikaselain-vuosi')?.textContent ?? null,
      // Kertojan teksti ei saa jäädä nauhan alle.
      tekstiPaallekkain: teksti ? teksti.bottom > r.top : null,
      leveysOsuus: Math.round((r.width / window.innerWidth) * 100),
    };
  });
  /*
   * VIIVAT MAHTUVAT SORMELLE. Puhelimella (390 px) 22 viivaa on noin
   * 15 px:n välein; tabletilla väljemmin. Alaraja 12 px on omistajan
   * mitta tehtävänannossa.
   */
  vaadi(nimessa('aikaselain: nauha alalaidassa, 22 viivaa tasavälein, aalto valitun ympärillä'),
    Boolean(nauhanMitat) && nauhanMitat.viivoja === 22 && nauhanMitat.vali >= 12
      && nauhanMitat.leveysOsuus >= 90 && nauhanMitat.pohjassa <= 20
      && nauhanMitat.korkein >= nauhanMitat.matalin * 2
      && /v\. sitten|jaa\.|eKr\./.test(nauhanMitat.vuosi ?? '')
      && nauhanMitat.tekstiPaallekkain === false,
    JSON.stringify(nauhanMitat));

  const vetoLahto = await s.evaluate(() => {
    const r = document.querySelector('.aikaselain').getBoundingClientRect();
    return {
      y: Math.round(r.top + r.height * 0.62),
      alku: Math.round(r.left + r.width * 0.12),
      loppu: Math.round(r.left + r.width * 0.62),
      jakso: window.matkakirja.ui.aikajana?.esitys?.tila?.().jakso ?? null,
      vuosia: window.matkakirja.ui.aikajana?.esitys?.tila?.().vuosia ?? null,
    };
  });
  await s.mouse.move(vetoLahto.alku, vetoLahto.y);
  await s.mouse.down();
  await s.mouse.move(vetoLahto.alku + 30, vetoLahto.y, { steps: 4 });
  await s.mouse.move(vetoLahto.loppu, vetoLahto.y, { steps: 12 });
  await s.waitForTimeout(700);
  const vedossa = await s.evaluate(() => ({
    esitys: window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? null,
    selain: window.matkakirja.ui.aikajana?.aikaselain?.tila?.() ?? null,
    // Vanat seuraavat sormea: kärkien määrä kertoo, mihin asti on piirretty.
    vuosi: document.querySelector('.aikaselain-vuosi')?.textContent ?? null,
  }));
  await s.screenshot({ path: kuva('aikaselain-vedossa') });
  vaadi(nimessa('aikaselain: veto kelaa kellon ja vaientaa kertojan'),
    vedossa.esitys?.selaus === true && vedossa.esitys?.kaynnissa === false
      && vedossa.selain?.vedossa === true && vedossa.selain?.esikatselu
      && vedossa.esitys?.vuosia < vetoLahto.vuosia,
    JSON.stringify({
      ennen: { jakso: vetoLahto.jakso, vuosia: vetoLahto.vuosia },
      nyt: {
        jakso: vedossa.esitys?.jakso,
        vuosia: vedossa.esitys?.vuosia,
        selaus: vedossa.esitys?.selaus,
        kaynnissa: vedossa.esitys?.kaynnissa,
      },
      selain: vedossa.selain,
    }));

  await s.mouse.up();
  await s.waitForTimeout(1600);
  const irrotus = await s.evaluate(() => ({
    esitys: window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? null,
    selain: window.matkakirja.ui.aikajana?.aikaselain?.tila?.() ?? null,
  }));
  vaadi(nimessa('aikaselain: irrotus vaihtaa jakson ja esitys jatkaa siitä'),
    irrotus.esitys?.selaus === false && irrotus.esitys?.kaynnissa === true
      && irrotus.esitys?.jakso === vedossa.selain?.esikatselu
      && irrotus.selain?.valittu === irrotus.esitys?.jakso,
    JSON.stringify({
      jakso: irrotus.esitys?.jakso,
      odotettu: vedossa.selain?.esikatselu,
      kaynnissa: irrotus.esitys?.kaynnissa,
      valittu: irrotus.selain?.valittu,
    }));

  /* --- 3. MUISTI, ESITYS: sulku ja uusi avaus ------------------------ */
  /*
   * JAKSO LUETAAN JUURI ENNEN SULKUA, ei aiemmasta mittauksesta.
   * Väliin tuli 7.9.2026 aikaselaimen veto (2b), joka vaihtaa jakson —
   * vanha `jatkui.jakso` teki muistiväitteestä mittausvirheen.
   */
  const jaksoEnnen = await s.evaluate(
    () => window.matkakirja.ui.aikajana?.esitys?.tila?.().jakso ?? null,
  );
  await s.evaluate(async () => {
    document.querySelector('.aikajana-sulje')?.click();
    await new Promise((r) => setTimeout(r, 1200));
  });
  const muistiEsitys = await s.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('matkakirja-linssimuisti-ihmisen-matka') ?? 'null'); } catch { return null; }
  });
  await avaaLinssi(s);
  await s.waitForTimeout(2500);
  const jatko = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    return {
      avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
      peite: Boolean(document.querySelector('.aikajana-esitys-peite')),
      pimea: document.querySelector('.aikajana')?.classList.contains('esitys-pimea') ?? null,
      esitys: ui.aikajana?.esitys?.tila?.() ?? null,
      topbarNakyvyys: getComputedStyle(document.querySelector('.topbar')).visibility,
    };
  });
  vaadi(nimessa('muisti: sulku ja uusi avaus jatkavat samasta jaksosta ilman mustaa'),
    muistiEsitys?.vaihe === 'esitys' && muistiEsitys?.jakso === jaksoEnnen
      && !jatko.avausnappi && !jatko.peite && jatko.pimea === false
      && jatko.esitys?.muistista === true && jatko.esitys?.jakso === jaksoEnnen,
    JSON.stringify({ jaksoEnnen, muistiEsitys, jatko }));

  /* --- 4. MUISTI, TUTKIMUS: koukku, sulku, uusi avaus ---------------- */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    /*
     * KOUKKU KERRAN (kertomusmoottori tekee saman esityksen lopuksi;
     * ks. savuke-ihmisen-esitys.mjs). Kenttä luetaan ensin muuttujaan:
     * `ui.aloitaTutkimusvaihe` ei ole UI-luokan metodi vaan ajon
     * asettama kenttä (tools/tarkista-savukkeet.mjs).
     */
    const aloita = ui.aloitaTutkimusvaihe;
    if (typeof aloita === 'function') aloita();
    await new Promise((r) => setTimeout(r, 800));
    document.querySelector('.aikajana-sulje')?.click();
    await new Promise((r) => setTimeout(r, 1200));
  });
  const muistiTutkimus = await s.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('matkakirja-linssimuisti-ihmisen-matka') ?? 'null'); } catch { return null; }
  });
  await avaaLinssi(s);
  const alku = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    // Kirjasto rakentaa merkkien elementit seuraavassa piirrossa, ja
    // kontin ohjelmisto-WebGL piirtää harvakseltaan: odotetaan ruutua,
    // ei kelloa.
    for (let i = 0; i < 150; i += 1) {
      if (document.querySelectorAll('.ihmisen-nosto').length >= 40) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    const ajo = ui.aikajana;
    return {
      tila: ui.tutkimusvaihe?.tila?.() ?? null,
      avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
      peite: Boolean(document.querySelector('.aikajana-esitys-peite')),
      kaynnissa: Boolean(ajo?.kaynnissa),
      seuraa: Boolean(ajo?.virrat?.ohjaaKameraa()),
      nostoja: document.querySelectorAll('.ihmisen-nosto').length,
      nappeja: document.querySelectorAll('.ihmisen-vananappi').length,
      savyja: new Set([...document.querySelectorAll('.ihmisen-nosto')]
        .map((el) => el.style.getPropertyValue('--nosto-savy'))).size,
      chattiAuki: document.body.classList.contains('aikajana-tutkimus-auki'),
    };
  });
  vaadi(nimessa('muisti: tutkimusvaihe jatkuu suoraan, kello seis, kamera vapaa'),
    muistiTutkimus?.vaihe === 'tutkimus' && !alku.avausnappi && !alku.peite
      && Boolean(alku.tila) && alku.kaynnissa === false && alku.seuraa === false && alku.chattiAuki,
    JSON.stringify({ muistiTutkimus, alku }));

  /* --- 5. Nostot kartalla ------------------------------------------- */
  vaadi(nimessa('kartalla 40 hehkuvaa nostoa, useita sävyjä'),
    alku.nostoja === 40 && alku.savyja >= 3 && alku.nappeja === 5,
    `nostoja ${alku.nostoja}, sävyjä ${alku.savyja}, nappeja ${alku.nappeja}, mittari ${JSON.stringify(alku.tila)}`);

  await rauhoitu(s, 12);
  await s.screenshot({ path: kuva('vaihe') });

  /* --- 5a. AIKASELAIN TUTKIMUSVAIHEESSA: kelaus ilman kertojaa ------- */
  /*
   * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN": *"nopea sormella valita
   * aikapiste ja kelata esityksen eri vaiheita ja projisoida
   * levinneisyyttä maapallolla"*. Esityksen jälkeen sama nauha on
   * pelkkä kelaus: kello ja vanat siirtyvät hetkeen, kertoja on vaiti
   * eikä esitys lähde uudestaan käyntiin. HUOM: virtamoduulin oma
   * silmukka ei enää lue kelloa tutkimusvaiheessa (lukema on siellä
   * vakio 0), joten tämä väite todistaa nimenomaan sen suoran
   * vanat().paivita-kutsun, joka esityksessä olisi turha.
   */
  const kelausTutkimuksessa = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const nauha = document.querySelector('.aikaselain');
    if (!nauha) return { virhe: 'nauhaa ei ole tutkimusvaiheessa' };
    const ennen = ui.aikajana?.esitys?.tila?.() ?? null;
    return { ennenVuosia: ennen?.vuosia ?? null, ennenJakso: ennen?.jakso ?? null };
  });
  const nauhanKeski = await s.evaluate(() => {
    const r = document.querySelector('.aikaselain')?.getBoundingClientRect();
    return r ? { x: Math.round(r.left + r.width * 0.32), y: Math.round(r.top + r.height * 0.62) } : null;
  });
  if (nauhanKeski) await s.mouse.click(nauhanKeski.x, nauhanKeski.y);
  await s.waitForTimeout(900);
  const kelattu = await s.evaluate(() => ({
    esitys: window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? null,
    selain: window.matkakirja.ui.aikajana?.aikaselain?.tila?.() ?? null,
    kello: (document.querySelector('.aikajana-kello')?.textContent ?? '').replace(/\s+/g, ' '),
  }));
  vaadi(nimessa('aikaselain tutkimusvaiheessa: valinta kelaa kellon, kertoja pysyy vaiti'),
    Boolean(nauhanKeski) && kelattu.esitys?.paattynyt === true
      && kelattu.esitys?.kaynnissa === false
      && kelattu.esitys?.vuosia > (kelausTutkimuksessa.ennenVuosia ?? 0)
      && kelattu.selain?.valittu === kelattu.esitys?.jakso,
    JSON.stringify({ ennen: kelausTutkimuksessa, nyt: {
      jakso: kelattu.esitys?.jakso,
      vuosia: kelattu.esitys?.vuosia,
      kaynnissa: kelattu.esitys?.kaynnissa,
      valittu: kelattu.selain?.valittu,
    } }));
  await s.screenshot({ path: kuva('aikaselain-tutkimus') });

  /* --- 5b. AITO NAPAUTUS: hehku tutkimusvaiheessa -------------------- */
  /*
   * KAMERA KAUEMMAS ENSIN. Muistista jatkettu tutkimusvaihe perii sen
   * näkymän, johon esitys jäi (mitattu: korkeus 0,66 eli tiukka
   * lähikuva Afrikkaan), ja silloin ruudun sisällä saattaa olla vain
   * pari hehkua — kaikki reunavaran ulkopuolella. Vedetään kamera
   * kauas laudan omalla rajapinnalla, kuten vanan nappikin tekee.
   */
  await s.evaluate(async () => {
    window.matkakirja.ui.aikajana?.kamera?.()?.ajaKamera?.(
      { lat: 20, lng: 40, korkeus: 1.9 }, { kesto: 900 },
    );
    await new Promise((r) => setTimeout(r, 1200));
  });
  await rauhoitu(s, 15);
  const hehkunPaikka = await ruutupaikka(s, '.ihmisen-nosto');
  if (hehkunPaikka) await s.mouse.click(hehkunPaikka.x, hehkunPaikka.y);
  await s.waitForTimeout(900);
  const hehkunKortti = await kortinTila(s);
  vaadi(nimessa('hehkun napautus ruutukoordinaatilla avaa kortin'),
    Boolean(hehkunPaikka) && hehkunKortti.auki && hehkunKortti.kehyksia >= 1 && hehkunKortti.mahtuu,
    JSON.stringify({ hehkunPaikka, hehkunKortti }));

  /* --- 6. Kortti: löytöpaikka ja lisänosto samalla mallilla ---------- */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.nostokortti.sulje();
    ui.nostokortti.avaa('jebel-irhoud');
    await new Promise((r) => setTimeout(r, 900));
  });
  const loytopaikka = await kortinTila(s);
  vaadi(nimessa('löytöpaikan kortti: kuva-alue, teksti, lähde, Lue lisää ja kysymykset'),
    loytopaikka.auki && loytopaikka.laji === 'loytopaikka' && loytopaikka.kehyksia >= 2
      && loytopaikka.teksti > 100 && /en-Wikipedia/.test(loytopaikka.lahde ?? '')
      && loytopaikka.lue && loytopaikka.kysymyksia >= 2 && loytopaikka.kysymyksia <= 3
      && loytopaikka.mahtuu,
    JSON.stringify(loytopaikka));
  await s.screenshot({ path: kuva('kortti-loytopaikka') });

  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.nostokortti.sulje();
    ui.nostokortti.avaa('toba');
    // Kuvituskuva on vielä kuvaputkella: 404 vaihtaa kehyksen
    // varapaikaksi vasta img-alkion error-tapahtumasta.
    await new Promise((r) => setTimeout(r, 2500));
  });
  const lisanosto = await kortinTila(s);
  vaadi(nimessa('lisänoston kortti: sama malli ja kuva-alue (varapaikka, ei nimikirjainlaattaa)'),
    lisanosto.auki && lisanosto.laji === 'lisanosto' && lisanosto.kehyksia === 1
      && lisanosto.varapaikkoja === 1 && lisanosto.kuvia === 0
      && /Tulivuori/.test(lisanosto.otsikko ?? '') && lisanosto.teksti > 100
      && lisanosto.kysymyksia >= 2 && lisanosto.mahtuu,
    JSON.stringify(lisanosto));
  await s.screenshot({ path: kuva('kortti-lisanosto') });

  /* --- 6b. Kysymys pulun chattiin ----------------------------------- */
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
      kysymyksia: window.matkakirja.ui.tutkimusvaihe?.tila?.().kysymyksia ?? 0,
    };
  });
  vaadi(nimessa('kysymysnappi vie kysymyksen pulun chattiin'),
    kysymys.merkitty && kysymys.chatissa && kysymys.kysymyksia === 1,
    JSON.stringify(kysymys));

  /* --- 7. Lue lisää: Tiedeliite yhtenä listana ---------------------- */
  const liite = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.nostokortti.sulje();
    ui.nostokortti.avaa('jebel-irhoud');
    await new Promise((r) => setTimeout(r, 500));
    document.querySelector('.ihmisen-nostokortti-lue')?.click();
    await new Promise((r) => setTimeout(r, 900));
    document.querySelector('.tiedeliite-hampurilainen')?.click();
    await new Promise((r) => setTimeout(r, 700));
    const sis = document.querySelector('.tiedeliite-sisallys');
    const rivit = [...(sis?.querySelectorAll('.tiedeliite-sisallysrivi') ?? [])];
    // Päällekkäisyys: kahden peräkkäisen rivin laatikot eivät saa leikata.
    const paallekkain = rivit.slice(1).filter((r, i) => {
      const a = rivit[i].getBoundingClientRect();
      const b = r.getBoundingClientRect();
      return b.top < a.bottom - 1;
    }).length;
    return {
      kortti: Boolean(document.querySelector('.tiedeliite-kortti')),
      sisallys: Boolean(sis && !sis.hidden),
      lista: sis?.classList.contains('lista') ?? null,
      palstat: sis ? getComputedStyle(sis).columnCount : null,
      rivit: rivit.length,
      pilkkuja: sis?.querySelectorAll('.tiedeliite-sisallyspilkku').length ?? 0,
      paallekkain,
      // Ylivuotopalsta näkyy siinä, että rivit alkavat eri x:stä ja
      // toinen puoli listaa on laatikon ulkopuolella (ks. css).
      palstoja: new Set(rivit.map((r) => Math.round(r.getBoundingClientRect().left))).size,
      ulkona: rivit.filter((r) => r.getBoundingClientRect().right
        > (sis?.getBoundingClientRect().right ?? 0) + 1).length,
      ekaAjoitus: sis?.querySelector('.tiedeliite-sisallysvuosi')?.textContent ?? null,
    };
  });
  vaadi(nimessa('Lue lisää avaa Tiedeliitteen, jonka sisällys on yksi lista väripilkuin'),
    liite.kortti && liite.sisallys && liite.lista === true && liite.palstat === 'auto'
      && liite.rivit >= 15 && liite.pilkkuja === liite.rivit && liite.paallekkain === 0
      && liite.palstoja === 1 && liite.ulkona === 0
      && /v\./.test(liite.ekaAjoitus ?? ''),
    JSON.stringify(liite));
  await s.screenshot({ path: kuva('tiedeliite-sisallys') });

  /* --- 8. Nappi V3 (Siperia) kääntää kameran ja korostaa ------------- */
  const ennen = await s.evaluate(async () => {
    // Tiedeliite kiinni ja kortti pois kameran tieltä.
    document.querySelector('.tiedeliite-kortti .fokusnosto-kortti-sulje')?.click();
    await new Promise((r) => setTimeout(r, 600));
    window.matkakirja.ui.nostokortti.sulje();
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
      mahtuu: lappu ? (lappu.getBoundingClientRect().top > 0
        && lappu.getBoundingClientRect().bottom <= window.innerHeight + 1) : false,
      tila: window.matkakirja.ui.tutkimusvaihe.tila(),
    };
  });
  const liikkui = Math.abs(valinta.alue.x - ennen.x) > 20 || Math.abs(valinta.alue.y - ennen.y) > 20
    || Math.abs(Math.log(valinta.alue.skaala / ennen.skaala)) > 0.05;
  vaadi(nimessa('V3 Siperia: kamera kääntyy, vana korostuu, lappu kertoo yhteenvedon'),
    liikkui && valinta.valittuKolmas && valinta.valittuja === 1 && valinta.lappuAuki
      && valinta.otsikko === 'Siperia' && valinta.yhteenveto > 150 && valinta.mahtuu
      && valinta.tila.valittu === 'siperia' && valinta.tila.palkissa === true,
    JSON.stringify({ liikkui, ennen, ...valinta }));
  await s.screenshot({ path: kuva('vana-v3') });

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

  /* --- 9. Aloita alusta (↺) ----------------------------------------- */
  const alusta = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.aikajana-alusta')?.click();
    for (let i = 0; i < 200; i += 1) {
      if (document.querySelector('.aikajana-avaus-nappi')) break;
      await new Promise((r) => setTimeout(r, 50));
    }
    return {
      muisti: localStorage.getItem('matkakirja-linssimuisti-ihmisen-matka'),
      avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
      tutkimusvaihe: Boolean(ui.tutkimusvaihe),
      aikajana: Boolean(ui.aikajana),
      nostoja: document.querySelectorAll('.ihmisen-nosto').length,
    };
  });
  vaadi(nimessa('Aloita alusta tyhjentää muistin ja aloittaa linssin alusta'),
    alusta.muisti === null && alusta.avausnappi && !alusta.tutkimusvaihe && alusta.aikajana,
    JSON.stringify(alusta));

  /* --- 10. Sulku purkaa kaiken -------------------------------------- */
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
      nostokortti: Boolean(window.matkakirja.ui.nostokortti),
      nostoja: document.querySelectorAll('.ihmisen-nosto').length,
      nappeja: document.querySelectorAll('.ihmisen-vananappi').length,
      kortteja: document.querySelectorAll('.ihmisen-nostokortti').length,
      kerros: document.querySelectorAll('.ihmisen-tutkimus').length,
      luokka: document.body.classList.contains('aikajana-tutkimus-auki'),
      palkkiluokka: document.body.classList.contains('aikajana-palkki-auki'),
      topbarNakyvyys: getComputedStyle(document.querySelector('.topbar')).visibility,
      pallo: Boolean(window.matkakirja.ui.pallolauta),
    };
  });
  vaadi(nimessa('sulku (✕) purkaa kaiken ja palauttaa yläpalkin'),
    !sulku.aikajana && !sulku.tutkimusvaihe && !sulku.nostokortti && sulku.nostoja === 0
      && sulku.listalla === 0 && sulku.nappeja === 0 && sulku.kortteja === 0
      && sulku.kerros === 0 && !sulku.luokka && !sulku.palkkiluokka
      && sulku.topbarNakyvyys === 'visible' && sulku.pallo, JSON.stringify(sulku));

  vaadi(nimessa('ei sivuvirheitä'), virhelista.length === 0, virhelista.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
