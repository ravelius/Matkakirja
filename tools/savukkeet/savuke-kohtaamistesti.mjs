/*
 * Savuke: KEHITTÄJÄN KOHTAAMISLISTA (omistajan tilaus 5.9.2026
 * sanatarkasti: *"Tarvitaan joku kehittäjätila missä pääsen testaamaan
 * kaikki aarre kohtaamiset ja niiden tehtävä pelit listasta
 * valitsemalla. Lajittele listat maanosien mukaan."*).
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *  1. Ratasvalikon Kohtaamiset-nappi avaa lehden, jossa on kaikki
 *     seitsemän mannerryhmää MANNER_NIMET-järjestyksessä (Eurooppa
 *     ensin ja avattuna) ja Euroopan ensimmäinen rivi on lehden oma
 *     järjestys (aakkoset).
 *  2. Mannerryhmä aukeaa ja sulkeutuu napautuksesta.
 *  3. Ensimmäinen Euroopan kohtaaminen aukeaa listalta: kortilla on
 *     isoisän saapumisteksti ja kolme nappia (Tapaa / Seuraava /
 *     Takaisin listaan), ja Tapaa avaa pelin OMAN tehtäväkortin
 *     (#quiz-dialog) kaaren kohtaamistekstillä. Lehti jää kortin alle.
 *  4. Tehtäväpeli pelataan läpi: Aloita peli → kysymys →
 *     oikea vastaus → AARRE (kaaren aarreteksti ruudulla).
 *  5. Seuraava-nappi avaa listan SEURAAVAN kohtaamisen (lehden oma
 *     järjestys), ja Takaisin listaan palaa listaan.
 *  6. Kuvallinen kohtaaminen näyttää kohtaamiskuvan
 *     (#quiz-kohtaaminen-kuva, ämpärin valokuva ladattuna).
 *  7. TALLENNE EI MUUTU: localStoragen matkakirja-save-v1 on merkki
 *     merkiltä sama koko testin ajan.
 *  8. Lehden sulku palauttaa oikean pelin: nappula on yhä
 *     lähtökaupungissa, eikä raha, tietäjäpisteet, päivät tai löydöt
 *     ole liikkuneet.
 *  9. Sama toimii sekä oletuslaudalla (pallo) että ?lauta=kartta.
 *
 * ODOTUS ON EHTOJEN VARASSA, EI KELLON. Kortti kirjoittuu
 * kirjoituskoneella (js/visa.js QUIZ_TYPE_MS), ja pitkä tervehdys vie
 * useita sekunteja — kiinteä uni napauttaisi piilossa olevaa nappia ja
 * savuke kaatuisi satunnaisesti.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Palvelutyöntekijä
 * estetään (serviceWorkers: 'block'), koska sen fetch ohittaisi
 * page.routen.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kohtaamistesti.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { kohtaamistestinRyhmat } from '../../js/kohtaamistesti.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Ämpäri Noden kautta selaimelle (kohtaamiskuvat ovat R2:ssa). */
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

/* Lehden oma järjestys: sama funktio kuin pelissä, ei kopiota. */
const eurooppa = kohtaamistestinRyhmat()[0];
const ekaEurooppa = eurooppa.rivit[0];
const ekaKuvallinen = eurooppa.rivit.find((r) => r.kuva === 'valokuva' && r.pelissa);
tieto('Euroopan ensimmäinen rivi', `${ekaEurooppa.kaupunki} (kuva: ${ekaEurooppa.kuva ?? 'ei'})`);
tieto('Euroopan ensimmäinen kuvallinen', ekaKuvallinen?.kaupunki ?? '—');

/* Tallenne: Fogg Lontoossa maailmankartalla, peli käynnissä. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

async function avaaSivu(lauta) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/wikipedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
    });
  });
  const url = lauta ? `${osoite}?lauta=${lauta}` : osoite;
  await sivu.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForTimeout(1500);
  return { ctx, sivu, virheet };
}

/*
 * Odottaa ehdon; palauttaa false eikä kaadu, jotta rivi raportoidaan.
 * Katto on väljä (60 s): kirjoituskone hidastuu kuormitetussa kontissa,
 * eikä savuke saa kaatua siitä että kone on hetken kiireinen.
 */
const odota = (sivu, fn, arg = null, timeout = 60000) => sivu
  .waitForFunction(fn, arg, { timeout, polling: 120 })
  .then(() => true).catch(() => false);

/**
 * Avaa kohtaamisen listalta pelin omalle kortille ja odottaa, että
 * tervehdys on kirjoitettu loppuun (Aloita peli näkyvissä).
 */
async function avaaKohtaaminen(sivu, id) {
  await sivu.evaluate((kohde) => {
    document.querySelector(`#kohtaamistesti-sisalto .kt-rivi[data-kohtaaminen="${kohde}"]`)?.click();
  }, id);
  const kortti = await odota(sivu, () => Boolean(document.querySelector('#kohtaamistesti-sisalto .kt-avaa')));
  if (!kortti) return false;
  await sivu.evaluate(() => document.querySelector('#kohtaamistesti-sisalto .kt-avaa')?.click());
  return odota(sivu, () => {
    const nappi = document.getElementById('quiz-aloita');
    return Boolean(document.getElementById('quiz-dialog')?.open) && nappi && !nappi.hidden;
  });
}

/**
 * Yhden laudan kierros. `taysi` = pelataan tehtäväpeli aarteeseen asti
 * ja tarkistetaan kohtaamiskuva.
 */
async function aja(lauta, { taysi }) {
  const nimio = lauta ? `?lauta=${lauta}` : 'oletuslauta';
  const { ctx, sivu, virheet } = await avaaSivu(lauta);

  const ennenTallenne = await sivu.evaluate(() => localStorage.getItem('matkakirja-save-v1'));
  const ennenTila = await sivu.evaluate(() => {
    const { game } = window.matkakirja.ui;
    return {
      raha: game.player.money,
      xp: game.player.xp,
      paivat: game.dayCount(),
      loydot: game.player.finds.length,
      kaupunki: game.cityOf()?.id ?? null,
    };
  });

  // 1. Nappi avaa lehden.
  await sivu.evaluate(() => {
    document.getElementById('kehittaja-valikko-btn')?.click();
    document.getElementById('kehittaja-kohtaamiset-btn')?.click();
  });
  await odota(sivu, () => Boolean(document.getElementById('kohtaamistesti-dialog')?.open));
  if (taysi) {
    mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
    await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/kohtaamistesti-lista.png' });
  }
  const lehti = await sivu.evaluate(() => {
    const nakyvat = [...document.querySelectorAll('#kohtaamistesti-sisalto .kt-rivi')]
      .filter((r) => !r.closest('.kt-rivit').hidden);
    return {
      auki: Boolean(document.getElementById('kohtaamistesti-dialog')?.open),
      otsikot: [...document.querySelectorAll('#kohtaamistesti-sisalto .kt-ryhma-nimi')]
        .map((e) => e.textContent),
      euroopanRivit: nakyvat.length,
      ekaRivi: nakyvat[0]?.dataset.kohtaaminen,
      selite: document.getElementById('kohtaamistesti-selite')?.textContent ?? '',
    };
  });
  vaadi(`${nimio} · 1. Kohtaamiset-nappi avaa lehden maanosaryhmineen`,
    lehti.auki && lehti.otsikot[0] === 'Eurooppa' && lehti.otsikot.length === 7
    && lehti.euroopanRivit > 30 && lehti.ekaRivi === ekaEurooppa.id
    && /kohtaamista/.test(lehti.selite),
    JSON.stringify(lehti));

  // 2. Ryhmä kiinni ja auki.
  const vetolaatikko = await sivu.evaluate(() => {
    const nakyvia = () => [...document.querySelectorAll('#kohtaamistesti-sisalto .kt-rivi')]
      .filter((r) => !r.closest('.kt-rivit').hidden).length;
    const otsikko = document.querySelector('#kohtaamistesti-sisalto .kt-ryhma-otsikko');
    const alku = nakyvia();
    otsikko.click();
    const kiinni = nakyvia();
    otsikko.click();
    return { alku, kiinni, uudelleen: nakyvia() };
  });
  vaadi(`${nimio} · 2. mannerryhmä aukeaa ja sulkeutuu`,
    vetolaatikko.alku > 0 && vetolaatikko.kiinni === 0
    && vetolaatikko.uudelleen === vetolaatikko.alku,
    JSON.stringify(vetolaatikko));

  // 3. Ensimmäinen Euroopan kohtaaminen: kortti → pelin tehtäväkortti.
  const auki = await avaaKohtaaminen(sivu, ekaEurooppa.id);
  const kortti = await sivu.evaluate(() => ({
    saapuminen: (document.querySelector('#kohtaamistesti-sisalto .kt-teksti')?.textContent ?? '').length,
    napit: [...document.querySelectorAll('#kohtaamistesti-sisalto .kt-napit button')]
      .map((b) => b.textContent),
    lehtiYhaAuki: Boolean(document.getElementById('kohtaamistesti-dialog')?.open),
    otsikko: document.getElementById('quiz-city')?.textContent ?? '',
    tervehdys: (document.getElementById('quiz-kohtaaminen')?.textContent ?? '').length,
    kaupunki: window.matkakirja.ui.game.cityOf()?.id ?? null,
    kaari: window.matkakirja.ui.game.quiz?.kaari ?? null,
    hiekkalaatikko: window.matkakirja.ui.kohtaamistesti === true,
  }));
  vaadi(`${nimio} · 3. rivi avaa kohtaamisen pelin omalla kortilla`,
    auki && kortti.saapuminen > 60 && kortti.napit.length === 3
    && /Seuraava/.test(kortti.napit[1]) && /Takaisin listaan/.test(kortti.napit[2])
    && kortti.lehtiYhaAuki && kortti.kaari === true
    && kortti.kaupunki === ekaEurooppa.id && kortti.hiekkalaatikko
    && kortti.tervehdys > 40 && /kohtaaminen/.test(kortti.otsikko),
    JSON.stringify({ auki, ...kortti }));

  if (taysi) {
    // 4. Tehtäväpeli läpi aarteeseen asti.
    await sivu.evaluate(() => document.getElementById('quiz-aloita')?.click());
    const vaihtoehdot = await odota(sivu, () => {
      const lista = document.getElementById('quiz-options');
      return lista && !lista.hidden && lista.querySelectorAll('button').length >= 3;
    });
    const kysymys = await sivu.evaluate(() => ({
      teksti: (document.getElementById('quiz-question')?.textContent ?? '').length,
      vaihtoehtoja: document.querySelectorAll('#quiz-options button').length,
      tiimalasi: !document.getElementById('quiz-timer')?.hidden,
    }));
    await sivu.evaluate(() => {
      const oikea = window.matkakirja.ui.game.quiz?.correct ?? 0;
      document.querySelectorAll('#quiz-options button')[oikea]?.click();
    });
    // Aarre: laatan paljastuskortti (reveal-isoisa) tai laatattoman
    // löydön tuloskortti (kohtaaminen-repliikki) — molemmat kelpaavat.
    const aarre = await odota(sivu, () => Boolean(
      document.querySelector('#quiz-dialog .reveal-isoisa')
      || document.querySelector('#quiz-result .kohtaaminen-repliikki'),
    ));
    const tulos = await sivu.evaluate(() => ({
      oikein: window.matkakirja.ui.game.quiz?.right ?? null,
      aarreteksti: (document.querySelector('#quiz-dialog .reveal-isoisa')
        ?? document.querySelector('#quiz-result .kohtaaminen-repliikki'))?.textContent?.length ?? 0,
    }));
    vaadi(`${nimio} · 4. tehtäväpeli pelataan läpi aarteeseen asti`,
      vaihtoehdot && kysymys.teksti > 20 && kysymys.vaihtoehtoja >= 3
      && kysymys.tiimalasi && tulos.oikein === true && aarre && tulos.aarreteksti > 40,
      JSON.stringify({ vaihtoehdot, kysymys, aarre, tulos }));
    mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
    await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/kohtaamistesti-aarre.png' });

    /*
     * Kortti kiinni kahdessa vaiheessa. Paljastuskortti odottaa
     * pelaajaa (js/ui.js playTokenReveal), ja SE ODOTUS PITÄÄ UI:N
     * BUSY-tilassa — jatkonapin painallus samassa tikissä olisi
     * tyhjä. Siksi ensin Jatka matkaa, sitten odotus kunnes peitto on
     * poissa, ja vasta lopuksi visan oma jatkonappi.
     */
    // Jatka matkaa kuuntelee vasta kun paljastuksen animaatio on ohi
    // (js/ui.js odotaPaljastuksenSulku lisää luokan `nakyy` juuri ennen
    // kuuntelijoita) — aiempi napautus katoaisi tyhjään.
    const jatkaValmis = await odota(sivu, () => {
      const nappi = document.querySelector('#quiz-dialog .reveal-jatka');
      return !document.querySelector('#quiz-dialog .reveal-overlay')
        || Boolean(nappi && nappi.classList.contains('nakyy'));
    });
    if (!jatkaValmis) tieto('paljastuksen jatkonappi', 'ei ehtinyt näkyviin');
    await sivu.evaluate(() => document.querySelector('#quiz-dialog .reveal-jatka')?.click());
    await odota(sivu, () => !document.querySelector('#quiz-dialog .reveal-overlay'));
    await odota(sivu, () => window.matkakirja?.ui?.busy !== true);
    await sivu.evaluate(() => document.getElementById('quiz-continue')?.click());
    await odota(sivu, () => !document.getElementById('quiz-dialog')?.open);

    // 5. Seuraava vie listan seuraavaan kohtaamiseen ja avaa sen.
    const seuraavaRivi = eurooppa.rivit.filter((r) => r.pelissa)[1];
    await sivu.evaluate(() => document.querySelector('#kohtaamistesti-sisalto .kt-seuraava')?.click());
    const seuraavaAuki = await odota(sivu, (id) => {
      const nappi = document.getElementById('quiz-aloita');
      return Boolean(document.getElementById('quiz-dialog')?.open) && nappi && !nappi.hidden
        && window.matkakirja.ui.game.cityOf()?.id === id;
    }, seuraavaRivi.id);
    const seuraava = await sivu.evaluate(() => ({
      kaupunki: window.matkakirja.ui.game.cityOf()?.id ?? null,
      kaari: window.matkakirja.ui.game.quiz?.kaari ?? null,
    }));
    vaadi(`${nimio} · 5. Seuraava avaa listan seuraavan kohtaamisen`,
      seuraavaAuki && seuraava.kaupunki === seuraavaRivi.id && seuraava.kaari === true,
      JSON.stringify({ odotettu: seuraavaRivi.id, ...seuraava }));

    // 6. Kuvallinen kohtaaminen: kuva kortille ämpäristä. Takaisin
    //    listaan -nappi vie ensin lehden listanäkymään.
    if (ekaKuvallinen) {
      await sivu.evaluate(() => document.getElementById('quiz-continue')?.click());
      await odota(sivu, () => !document.getElementById('quiz-dialog')?.open);
      await sivu.evaluate(() => document.querySelector('#kohtaamistesti-sisalto .kt-takaisin')?.click());
      await odota(sivu, () => Boolean(document.querySelector('#kohtaamistesti-sisalto .kt-ryhma')));
      const kuvaAuki = await avaaKohtaaminen(sivu, ekaKuvallinen.id);
      const kuva = await sivu.evaluate(() => {
        const img = document.getElementById('quiz-kohtaaminen-kuva');
        return {
          nakyy: Boolean(img) && !document.getElementById('quiz-kohtaaminen-kuvio').hidden,
          leveys: img?.naturalWidth ?? 0,
          ampari: (img?.getAttribute('src') ?? '').includes('r2.dev'),
        };
      });
      vaadi(`${nimio} · 6. kuvallinen kohtaaminen näyttää kohtaamiskuvan`,
        kuvaAuki && kuva.nakyy && kuva.leveys > 100 && kuva.ampari,
        JSON.stringify({ kuvaAuki, ...kuva }));
      await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/kohtaamistesti-kuva.png' });
      await sivu.evaluate(() => document.getElementById('quiz-continue')?.click());
      await odota(sivu, () => !document.getElementById('quiz-dialog')?.open);
    } else {
      tieto('6. kuvavartio', 'ohitettu — yhdelläkään Euroopan rivillä ei ole valokuvaa');
    }
  } else {
    await sivu.evaluate(() => document.getElementById('quiz-continue')?.click());
    await odota(sivu, () => !document.getElementById('quiz-dialog')?.open);
  }

  // 7. Tallenne ei muutu.
  const tallenneNyt = await sivu.evaluate(() => localStorage.getItem('matkakirja-save-v1'));
  vaadi(`${nimio} · 7. tallenne ei muutu hiekkalaatikossa`,
    tallenneNyt === ennenTallenne,
    `tallenne muuttui (${(tallenneNyt ?? '').length} vs ${(ennenTallenne ?? '').length} merkkiä)`);

  // 8. Lehden sulku palauttaa oikean pelin.
  await sivu.evaluate(() => document.getElementById('kohtaamistesti-sulje')?.click());
  // dialog.close() nollaa openin heti, mutta close-tapahtuma (ja sen
  // mukana pelin palautus) tulee vasta seuraavalla tehtäväjonon
  // kierroksella — odotetaan lippua, ei dialogin tilaa.
  await odota(sivu, () => window.matkakirja?.ui?.kohtaamistesti !== true);
  const sulku = await sivu.evaluate((ennen) => {
    const { game } = window.matkakirja.ui;
    return {
      lehtiKiinni: !document.getElementById('kohtaamistesti-dialog')?.open,
      lippu: window.matkakirja.ui.kohtaamistesti === true,
      raha: game.player.money,
      xp: game.player.xp,
      paivat: game.dayCount(),
      loydot: game.player.finds.length,
      kaupunki: game.cityOf()?.id ?? null,
      tallenne: localStorage.getItem('matkakirja-save-v1') === ennen,
    };
  }, ennenTallenne);
  vaadi(`${nimio} · 8. lehden sulku palauttaa oikean pelin koskemattomana`,
    sulku.lehtiKiinni && !sulku.lippu && sulku.kaupunki === ennenTila.kaupunki
    && sulku.raha === ennenTila.raha && sulku.xp === ennenTila.xp
    && sulku.paivat === ennenTila.paivat && sulku.loydot === ennenTila.loydot
    && sulku.tallenne,
    JSON.stringify({ ennenTila, sulku }));

  if (virheet.length) tieto(`${nimio} · sivun virheet`, virheet.slice(0, 4).join(' | '));
  await ctx.close();
}

await aja(null, { taysi: true });
await aja('kartta', { taysi: false });

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
