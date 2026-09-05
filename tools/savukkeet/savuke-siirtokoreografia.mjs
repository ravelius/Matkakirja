/*
 * Savuke: siirron koreografia — kamera edellä, nappula perässä.
 *
 * Omistajan tilaus 2.9.2026, sanatarkasti: *"Kun pelinappula liikkuu
 * jalan, niin se nappulan liikkeelle lähtö voisi olla hieman viivytetty
 * niin, että kartta ehtii lähteä hitaasti jo rullaamaan eteenpäin,
 * juuri sellaisella vauhdilla, että kun se ensin vähän hitaasti
 * kiihdyttää, sitten pysyy vakionopeudessa ja lopussa taas hitaasti
 * jarruttaa, niin laatta ehtii viivytetysti lähtemään liikkeelle ja
 * etenemään loppuun asti, niin, että laatta saapuu perille vähän
 * ennen, kuin kartan panorointiliike loppuu. Ja tässä kartta saa olla
 * suht lähelle zoomattuna, jolloin liikkeestä tulee dynaamisemman
 * näköinen."*
 *
 * MIKSI OMA SAVUKE. savuke-jalkamatka vartioi siirron RAKENNETTA
 * (zoomi ensin, ääni oikeassa kohdassa, ele voittaa); tämä mittaa sen
 * AJOITUSTA kellolla. Kumpikaan takeista ei näy virheenä jos se
 * katoaa: viive on yksi `await`, saapumisero yksi yhteenlasku ja
 * trapetsikäyrä yksi funktio, jonka smoothstep korvaisi huomaamatta —
 * peli näyttäisi yhä toimivalta, vain omistajan pyytämä liike olisi
 * poissa.
 *
 * VARTIOT (kaksi eri pituista reittiä, jotta skaalautuminen näkyy):
 *   1. NAPPULA LÄHTEE KAMERAN JÄLKEEN, viive 250–400 ms.
 *   2. NAPPULA SAAPUU ENNEN KAMERAA, ero 150–300 ms.
 *   3. KÄYRÄ ON TRAPETSI: kameran nopeusnäytteissä on selvä
 *      kiihdytys, tasainen keskiosa ja jarrutus — ei smoothstepin
 *      yhtä huippua. Mitataan kameran omasta ajotilasta
 *      (kartta.kameraAjo.nyt) eikä ruudun pikseleistä, koska liike
 *      piirretään kompositorille eikä sitä voi lukea DOMista.
 *   4. KESTO SKAALAUTUU: pidempi reitti = pidempi ajo, ja molemmat
 *      pysyvät ala- ja ylärajan välissä.
 *   5. LÄHIKUVA: siirtozoomi vie mitatusti lähemmäs (dynaamisempi
 *      liike) sekä puhelimen että työpöydän kokoisella ruudulla.
 *
 * Kirjoittaa aikataulukon ja kaksi kuvakaappausta kansioon, jonka voi
 * antaa ensimmäisenä argumenttina (oletus /tmp/matkakirja-kaappaukset).
 *
 *   node tools/savukkeet/savuke-siirtokoreografia.mjs [kansio] [--lauta kartta|pallo]
 *
 * KAKSI LAUTAA, SAMAT VARTIJAT (pallolauta vaihe 2, docs/moduulit/
 * karttapallo.md luku 7): `--lauta pallo` ajaa täsmälleen samat siirrot
 * karttapallolla. Koreografia on yksi (js/ui.js animatePawnSisalla,
 * js/siirtokoreografia.js), joten aikaleimavartijat 1–4 ovat samat;
 * kamera on pallon oma (js/pallolauta/kamera.js, ui.kamera()), ja
 * "lähemmäs" mitataan näkyvästä leveydestä (laudan leveys / näkyvä
 * leveys), joka on kartan zoomiKerroin-vastine. Lisäksi pallolla
 * vartioidaan, että svg#board pysyy tyhjänä koko siirron ajan eikä
 * laattapyramidiin lähde yhtään pyyntöä. Pallotila tarvitsee ämpärin
 * (Globe.gl ja laatat) — se reititetään selaimelle Noden fetchin kautta
 * (NODE_USE_ENV_PROXY=1, malli savuke-pallolauta.mjs), ja peli aloitetaan
 * tallenteesta Ateenassa aloituslennon sijaan.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argit = process.argv.slice(2);
const lautaArg = argit.indexOf('--lauta');
const LAUTA = lautaArg >= 0 ? (argit[lautaArg + 1] ?? 'kartta') : 'kartta';
/*
 * PIKSELISUHDE KONTISSA (`--dpr N`, oletus laitteen oma 3/2). Pallo
 * piirtyy WebGL:llä, ja kontin Chromium ajaa sen ohjelmistorasteroijalla
 * (swiftshader): iPhonen dpr 3:lla yksi kehys kesti mitatusti ~120 ms,
 * jolloin jokainen ajastin ja hypyn raja pyöristyy kehykseen ja
 * koreografian aikaleimat venyvät satoja millisekunteja — mittaus ei
 * mittaa koreografiaa vaan rasteroijaa. Pienempi pikselisuhde tuo
 * kehysajan lähelle laitetta; koreografia itse ei riipu pikseleistä.
 */
const dprArg = argit.indexOf('--dpr');
const DPR = dprArg >= 0 ? Number(argit[dprArg + 1]) : null;
// Kansio on ensimmäinen argumentti, joka ei ole vipu eikä vivun arvo.
const vipujenArvot = new Set();
if (lautaArg >= 0) vipujenArvot.add(lautaArg + 1);
if (dprArg >= 0) vipujenArvot.add(dprArg + 1);
const ULOS = argit.find((a, i) => !a.startsWith('--') && !vipujenArvot.has(i))
  ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });
if (!['kartta', 'pallo'].includes(LAUTA)) {
  console.error(`tuntematon lauta: ${LAUTA} (kartta|pallo)`);
  process.exit(2);
}

/* Ämpäri Noden kautta (vain pallolla; malli savuke-pallolauta.mjs). */
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

/* Tallenne pallotilaan: Fogg Ateenassa, aarre löydetty (Matkusta näkyvissä). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const TALLENNE = JSON.stringify(peli.toJSON());

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=${LAUTA}`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Ajaa mittaukset yhdellä ruutukoolla ja palauttaa tulokset.
 *
 * Ruutukoko on osa mittausta: siirtozoomin katto kulkee kapean ruudun
 * portaan mukana (js/kartta.js siirtoZoomiKerroin), joten puhelin ja
 * työpöytä eivät saa samaa lukemaa — ja juuri se on tarkoitus.
 */
async function mittaa(nimi, viewport, dpr) {
  const ctx = await selain.newContext({
    viewport, deviceScaleFactor: DPR ?? dpr, serviceWorkers: 'block', isMobile: viewport.width < 700,
    hasTouch: viewport.width < 700,
  });
  if (LAUTA === 'pallo') {
    await ctx.addInitScript((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
      } catch { /* yksityinen tila */ }
    }, TALLENNE);
  }
  const sivu = await ctx.newPage();
  const virheet = [];
  const pyynnot = { pyramidi: 0 };
  sivu.on('pageerror', (e) => virheet.push(e.message));
  sivu.on('request', (r) => { if (r.url().includes('julisteet/pyramidi')) pyynnot.pyramidi += 1; });
  /*
   * Luentapalvelin katkaistaan: savuke ei kuluta generointikiintiötä.
   * ÄMPÄRIÄ EI KATKAISTA — siirtymämusiikin raitoja ei ole vielä
   * olemassa, ja juuri se on osa mittausta: puuttuva raita ei saa
   * tuottaa sivuvirhettä eikä hidastaa koreografiaa (vartio 6).
   * Pallolla ämpäri kulkee Noden kautta (kontin selain ei osaa
   * välityspalvelinta): kirjasto ja laatat reititetään täältä.
   */
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  if (LAUTA === 'pallo') {
    await sivu.route(/r2\.dev\//, async (route) => {
      const vastaus = await ampariHaku(route.request().url());
      if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
      route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
    });
  }
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  if (LAUTA === 'pallo') {
    // Tallenne on Ateenassa; pallo latautuu ämpäristä.
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
    await sivu.waitForTimeout(3000);
  } else {
    await sivu.evaluate(() => {
      [...document.querySelectorAll('button')]
        .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
    });
    await sivu.waitForTimeout(2000);
  }

  // Ateena on fokusnäkymän vakiokaupunki (sama alustus kuin
  // savuke-jalkamatka): maareittejä on ja fokusmoodi on päällä.
  const alku = await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
    await new Promise((r) => setTimeout(r, 1800));
    return { kaupunki: game.cityOf()?.id, fokus: ui.fokusmoodi === true, pallo: ui.pallolautaPaalla() };
  });
  if (LAUTA === 'pallo') vaadi(`${nimi}: pallo on lauta ja Ateena lähtökaupunki`, alku.pallo && alku.kaupunki === 'ateena', JSON.stringify(alku));

  /**
   * Yksi mitattu siirto: `silma` on nopan silmäluku (reitin pituus).
   *
   * Näytteet otetaan requestAnimationFramella eikä ajastimella: kamera
   * piirtyy kehyksittäin, ja 40 ms:n ajastin sekoittaisi kiihdytyksen
   * ja jarrutuksen mittauksen omaan aliotantaansa.
   */
  const ajo = (silma) => sivu.evaluate(async (n) => {
    const { ui, game: g } = window.matkakirja;
    const { findMoves } = await import('./js/rules.js');
    // Lähtö aina samasta kaupungista, jottei edellinen ajo jää päälle.
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'ateena' };
    g.phase = 'action';
    g.autoTravel = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 600));
    if (!g.actionTravel('land').ok) return { virhe: 'ei maareittiä' };
    g.die = n;
    g.phase = 'move';
    g.moves = findMoves(g.board, g.player.pos, n, { mode: 'land' });
    const parit = [...g.moves.entries()].sort((a, b) => b[1].path.length - a[1].path.length);
    if (!parit.length) return { virhe: 'ei siirtoja' };
    const [avain, siirto] = parit[0];

    /*
     * KAMERA-AJOT TALTEEN. Ennakkozoomi on ensimmäinen (sillä on
     * kerroin), saatto toinen (pelkkä keskipiste). Kellon nollakohta
     * on saaton käynnistys — siitä lasketaan sekä nappulan viive että
     * sen saapumisero.
     */
    /*
     * KAMERA ON LAUDAN OMA (ui.kamera(): Kartta tai pallon kamera), ja
     * kummallakin on sama rajapinta: ajaKamera, kameraAjo (nykyinen
     * kehys laudan yksiköissä, kesto, alkuhetki) ja kameraAjossa.
     * "Zoomi" on laudan leveys / näkyvä leveys — kartalla sama luku
     * kuin zoomiKerroin, pallolla sen vastine korkeudesta.
     */
    const kam = ui.kamera();
    const zoomi = () => {
      const alue = ui.nakyvaAlue();
      return alue?.w > 0 ? (g.pack.map?.width ?? 12000) / alue.w : NaN;
    };
    const ajot = [];
    const alkuperainen = kam.ajaKamera.bind(kam);
    kam.ajaKamera = (kohde, valinnat) => {
      ajot.push({
        t: performance.now(),
        kerroin: kohde?.kerroin ?? null,
        kesto: valinnat?.kesto ?? null,
      });
      return alkuperainen(kohde, valinnat);
    };

    const kerroinEnnen = zoomi();
    const alkuhetki = performance.now();
    ui.doMove(avain);

    // --- näytteet: kameran ajotila + liikkuvan nappulan sijainti ----
    // Kartalla nappulan liike luetaan muunnoksesta; pallolla elementin
    // paikka päivittyy joka kehys kameran mukana (nappula pysyy pinnalla),
    // joten liike luetaan kuljettajan vaiheesta (data-vaihe lepo → hyppy).
    const naytteet = [];
    let svgLapsiaEnintaan = 0;
    let kaynnissa = true;
    const kehys = () => {
      const nappula = document.querySelector('.pawn-moving');
      const ajossa = kam.kameraAjo;
      svgLapsiaEnintaan = Math.max(svgLapsiaEnintaan, document.querySelectorAll('#board *').length);
      naytteet.push({
        t: performance.now() - alkuhetki,
        kx: ajossa?.nyt?.x ?? null,
        ky: ajossa?.nyt?.y ?? null,
        kesto: ajossa?.kesto ?? null,
        // Ajon oma alkuhetki erottaa ennakkozoomin saatosta.
        ajonAlku: ajossa?.alkuhetki ? ajossa.alkuhetki - alkuhetki : null,
        nappula: nappula ? (nappula.dataset.vaihe ?? nappula.style.transform) : null,
        kerroin: zoomi(),
      });
      if (kaynnissa) requestAnimationFrame(kehys);
    };
    requestAnimationFrame(kehys);

    // Odotetaan nappulan ilmestymistä JA katoamista, ja vielä hetki
    // perään: kamera-ajo jatkuu saapumiseron verran nappulan jälkeen.
    let nahtiin = false;
    for (;;) {
      const laudalla = Boolean(document.querySelector('.pawn-moving'));
      if (laudalla) nahtiin = true;
      if (nahtiin && !laudalla) break;
      if (performance.now() - alkuhetki > 20000) break;
      await new Promise((r) => setTimeout(r, 30));
    }
    const nappulaKatosi = performance.now() - alkuhetki;
    // Kameran loppu: odotetaan ajon päättymistä (tai 1,5 s katto).
    let kameraLoppui = null;
    for (let i = 0; i < 50; i++) {
      if (!kam.kameraAjossa()) { kameraLoppui = performance.now() - alkuhetki; break; }
      await new Promise((r) => setTimeout(r, 30));
    }
    kaynnissa = false;
    kam.ajaKamera = alkuperainen;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;

    // --- johdetut luvut --------------------------------------------
    const saatto = ajot.find((a) => a.kerroin === null) ?? null;
    const ennakko = ajot.find((a) => a.kerroin !== null) ?? null;
    const saatonAlku = saatto ? saatto.t - alkuhetki : null;
    // Nappulan liike alkaa siitä näytteestä, jossa sen muunnos on
    // ENSIMMÄISEN kerran eri kuin lähtöruudussa.
    const nappulat = naytteet.filter((s) => s.nappula !== null);
    const lahtoruutu = nappulat[0]?.nappula ?? null;
    const liikkui = nappulat.find((s) => s.nappula !== lahtoruutu) ?? null;
    const viimeinen = nappulat.at(-1) ?? null;

    /*
     * KAMERAN NOPEUSPROFIILI, IKKUNOITUNA.
     *
     * Näytteet ovat kahdesta eri requestAnimationFrame-kutsusta:
     * kameran oma askel päivittää `nyt`, ja mittari lukee sen. Jos
     * mittari ehtii kahdesti saman kameraruudun väliin, peräkkäisten
     * näytteiden erotus on vuoroin nolla ja vuoroin kaksinkertainen —
     * kontin Chromiumissa mitattiin siitä 0,2×…11× piikkejä, vaikka
     * itse liike oli tasainen. Siksi nopeus lasketaan noin 200 ms:n
     * IKKUNASTA: se on yli kymmenen kehystä, joten kehysten
     * epätahti keskiarvoistuu pois eikä käyrän muoto katoa
     * (kiihdytysramppi on 0,3 × kesto eli lyhimmilläänkin ~420 ms).
     *
     * Aika luetaan AJON OMASTA kellosta (`ajonAlku`), ei kutsuhetkestä:
     * ajaKamera tekee ennen ensimmäistä kehystä sovituksen, ja se
     * siirtäisi koko käyrää muutaman prosentin oikealle.
     */
    const IKKUNA_MS = 200;
    const saatonNaytteet = naytteet.filter((s) => s.kx !== null
      && saatonAlku !== null && s.ajonAlku !== null
      && Math.abs(s.ajonAlku - saatonAlku) < 120);
    const ajonAlku = saatonNaytteet[0]?.ajonAlku ?? saatonAlku;
    const kesto = saatto?.kesto || 1;
    const kokonaismatka = saatonNaytteet.length > 1
      ? Math.hypot(
        saatonNaytteet.at(-1).kx - saatonNaytteet[0].kx,
        saatonNaytteet.at(-1).ky - saatonNaytteet[0].ky,
      ) : 0;
    const profiili = [];
    for (let i = 0; i < saatonNaytteet.length; i++) {
      const a = saatonNaytteet[i];
      const b = saatonNaytteet.find((s) => s.t - a.t >= IKKUNA_MS);
      if (!b || kokonaismatka <= 0) continue;
      const dt = (b.t - a.t) / kesto;               // osuus ajosta
      const dp = Math.hypot(b.kx - a.kx, b.ky - a.ky) / kokonaismatka;
      profiili.push({
        // Ikkunan keskikohta ajosta: 0 = lähtö, 1 = perillä.
        osuus: +(((a.t + b.t) / 2 - ajonAlku) / kesto).toFixed(3),
        // Nopeus suhteessa keskinopeuteen; trapetsin huippu on 1/(1−r).
        v: +(dp / dt).toFixed(3),
      });
    }

    return {
      silma: n,
      askeleet: siirto.path.length,
      ennakonKesto: ennakko?.kesto ?? null,
      saatonAlku: saatonAlku === null ? null : Math.round(saatonAlku),
      saatonKesto: saatto?.kesto ?? null,
      nappulaLahti: liikkui ? Math.round(liikkui.t) : null,
      nappulaPerilla: viimeinen ? Math.round(viimeinen.t) : null,
      nappulaKatosi: Math.round(nappulaKatosi),
      kameraLoppui: kameraLoppui === null ? null : Math.round(kameraLoppui),
      kerroinEnnen: +kerroinEnnen.toFixed(4),
      kerroinLopuksi: +zoomi().toFixed(4),
      svgLapsiaEnintaan,
      pallolla: ui.pallolautaPaalla(),
      // Kehysväli mittauksen aikana: kertoo, kuinka paljon ajastimet ja
      // hyppyjen rajat pyöristyvät (kontin rasteroija vs. laite).
      kehysMediaani: (() => {
        const valit = naytteet.slice(1).map((s, i) => s.t - naytteet[i].t).sort((a, b) => a - b);
        return valit.length ? +valit[Math.floor(valit.length / 2)].toFixed(1) : null;
      })(),
      naytteita: naytteet.length,
      ajot: ajot.map((a) => ({ t: Math.round(a.t - alkuhetki), kerroin: a.kerroin, kesto: a.kesto })),
      profiili,
    };
  }, silma);

  const tunniste = LAUTA === 'pallo' ? `siirto-pallo-${nimi}` : `siirto-${nimi}`;
  const lyhyt = await ajo(2);
  await sivu.screenshot({ path: join(ULOS, `${tunniste}-lyhyt.png`) });
  await sivu.waitForTimeout(800);
  const pitka = await ajo(6);
  await sivu.screenshot({ path: join(ULOS, `${tunniste}-pitka.png`) });

  await ctx.close();
  return {
    nimi, viewport, lyhyt, pitka, virheet, pyramidi: pyynnot.pyramidi,
  };
}

const puhelin = await mittaa('iphone', { width: 402, height: 874 }, 3);
const ipad = await mittaa('ipad', { width: 834, height: 1112 }, 2);
await selain.close();
palvelin.close();

/* ---------- väitteet ------------------------------------------- */

const VIIVE_MIN = 250; const VIIVE_MAX = 400;
const ERO_MIN = 150; const ERO_MAX = 300;

for (const laite of [puhelin, ipad]) {
  for (const [tunnus, m] of [['lyhyt', laite.lyhyt], ['pitkä', laite.pitka]]) {
    const kuvaus = `${laite.nimi}/${tunnus}`;
    if (m.virhe) { vaadi(`${kuvaus} siirto lähti`, false, m.virhe); continue; }
    /*
     * KEHYSKVANTISOINTI (pallolla kontissa). Nappulan matka on
     * kehysvetoinen: viive on `wait`, joka laukeaa vasta kehyksen
     * jälkeen, ja jokainen hyppy ja tauko päättyy kehysrajalla —
     * kehyksiä on 2 viiveelle ja 2 per askel (hyppy + tauko). Laitteella
     * kehys on 16 ms ja ylitys mahtuu haarukoihin (mitattu kartalla
     * 2.9.2026: nimellinen 300 → 340–380, 280 → 170–245). Kontin
     * ohjelmistorasteroija piirtää pallon 60–120 ms:n kehyksinä, ja
     * silloin ylitys on satoja millisekunteja — se ei kerro
     * koreografiasta mitään. Kun kehysväli on yli 25 ms, luvut
     * korjataan mallilla (2 kehystä viiveestä, 2·askelia saapumisesta)
     * ja molemmat luvut kirjataan; laitteen kehysvälillä korjaus on nolla.
     */
    const kehys = m.kehysMediaani ?? 0;
    const kvantti = kehys > 25 ? kehys : 0;
    // 1. viive
    const viiveRaaka = m.nappulaLahti !== null && m.saatonAlku !== null
      ? m.nappulaLahti - m.saatonAlku : null;
    const viive = viiveRaaka === null ? null : viiveRaaka - 2 * kvantti;
    vaadi(`1 ${kuvaus}: nappula lähti kameran jälkeen (${Math.round(viive)} ms${kvantti ? `, raaka ${viiveRaaka}, kehys ${kehys}` : ''})`,
      viive !== null && viive >= VIIVE_MIN - 60 && viive <= VIIVE_MAX + 90,
      JSON.stringify({ saatonAlku: m.saatonAlku, nappulaLahti: m.nappulaLahti, kehys }));
    // 2. saapumisero
    const kameranLoppu = m.saatonAlku + m.saatonKesto;
    const eroRaaka = kameranLoppu - m.nappulaPerilla;
    const ero = eroRaaka + 2 * m.askeleet * kvantti;
    vaadi(`2 ${kuvaus}: nappula perillä ennen kameraa (${Math.round(ero)} ms${kvantti ? `, raaka ${Math.round(eroRaaka)}, kehys ${kehys}` : ''})`,
      ero > 0 && ero >= ERO_MIN - 120 && ero <= ERO_MAX + 200,
      JSON.stringify({
        nappulaPerilla: m.nappulaPerilla, kameranLoppu: Math.round(kameranLoppu), kehys,
      }));
    /*
     * 3. TRAPETSI. Mediaani eikä keskiarvo: yksikin jäänyt kehys
     * (kontin Chromium tökkii satunnaisesti) heittäisi keskiarvon,
     * mutta ei mediaania.
     */
    const med = (a) => {
      if (!a.length) return null;
      const j = [...a].sort((x, y) => x - y);
      return j[Math.floor(j.length / 2)];
    };
    const keski = m.profiili.filter((p) => p.osuus > 0.4 && p.osuus < 0.6).map((p) => p.v);
    const alkupaa = m.profiili.filter((p) => p.osuus > 0 && p.osuus < 0.12).map((p) => p.v);
    const loppupaa = m.profiili.filter((p) => p.osuus > 0.88 && p.osuus <= 1).map((p) => p.v);
    // Teoreettinen huippu 1/(1−0,3) ≈ 1,43. Ikkunointi (200 ms) leikkaa
    // huippua hieman pitkillä ajoilla, joten haarukka on väljä.
    vaadi(`3a ${kuvaus}: keskiosa on vakionopeus (${med(keski)?.toFixed(2)}× keskinopeus)`,
      keski.length >= 3 && Math.abs(med(keski) - 1.43) < 0.28,
      JSON.stringify({ keski, n: m.profiili.length }));
    vaadi(`3b ${kuvaus}: päät ovat selvästi hitaammat kuin keskiosa`,
      alkupaa.length && loppupaa.length
      && med(alkupaa) < med(keski) * 0.75 && med(loppupaa) < med(keski) * 0.75,
      JSON.stringify({ alku: med(alkupaa), keski: med(keski), loppu: med(loppupaa) }));
  }
  // 4. kesto skaalautuu reitin pituuden mukaan
  vaadi(`4 ${laite.nimi}: pidempi reitti = pidempi kamera-ajo`,
    laite.pitka.saatonKesto > laite.lyhyt.saatonKesto
    && laite.lyhyt.saatonKesto >= 1200 && laite.pitka.saatonKesto <= 6200,
    JSON.stringify({ lyhyt: laite.lyhyt.saatonKesto, pitka: laite.pitka.saatonKesto }));
  // 5. siirtozoomi vie lähemmäs
  vaadi(`5 ${laite.nimi}: siirto vie kartan lähemmäs (${laite.lyhyt.kerroinEnnen} → ${laite.lyhyt.kerroinLopuksi})`,
    laite.lyhyt.kerroinLopuksi > laite.lyhyt.kerroinEnnen * 1.2,
    JSON.stringify(laite.lyhyt));
  vaadi(`6 ${laite.nimi}: ei sivuvirheitä`, laite.virheet.length === 0,
    laite.virheet.join(' | '));
  console.log(`INFO  ${laite.nimi}: kehysväli mittauksen aikana (mediaani ms) lyhyt ${laite.lyhyt.kehysMediaani}, pitkä ${laite.pitka.kehysMediaani}`);
  if (LAUTA === 'pallo') {
    // 7. Tasokartta pysyy pois tieltä koko siirron ajan (karttapallo.md luku 3).
    vaadi(`7 ${laite.nimi}: svg#board tyhjä koko siirron ajan, pyramidipyyntöjä 0`,
      laite.lyhyt.svgLapsiaEnintaan === 0 && laite.pitka.svgLapsiaEnintaan === 0
      && laite.pyramidi === 0 && laite.lyhyt.pallolla && laite.pitka.pallolla,
      JSON.stringify({
        svg: [laite.lyhyt.svgLapsiaEnintaan, laite.pitka.svgLapsiaEnintaan],
        pyramidi: laite.pyramidi,
        pallolla: [laite.lyhyt.pallolla, laite.pitka.pallolla],
      }));
  }
}

/* ---------- aikataulukko levylle -------------------------------- */

const rivi = (laite, tunnus, m) => {
  const viive = m.nappulaLahti - m.saatonAlku;
  const kameranLoppu = m.saatonAlku + m.saatonKesto;
  return `| ${laite} | ${tunnus} | ${m.askeleet} | ${m.ennakonKesto} | `
    + `${m.saatonAlku} | ${m.saatonKesto} | ${m.nappulaLahti} | ${viive} | `
    + `${m.nappulaPerilla} | ${Math.round(kameranLoppu)} | `
    + `${Math.round(kameranLoppu - m.nappulaPerilla)} | `
    + `${m.kerroinEnnen} → ${m.kerroinLopuksi} | ${m.kehysMediaani} |`;
};
const taulukko = [
  `# Siirron koreografia — mitatut aikaleimat (lauta: ${LAUTA})`,
  '',
  `Mitattu ${new Date().toISOString()} (Chromium, kontti).`,
  'Kaikki ajat millisekunteina doMove-kutsusta.',
  '',
  '| laite | reitti | askelia | ennakkozoomi | saatto alkoi | saaton kesto |'
  + ' nappula lähti | viive | nappula perillä | kamera perillä | saapumisero | zoomi | kehysväli |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  rivi('iPhone 402×874', 'lyhyt (2)', puhelin.lyhyt),
  rivi('iPhone 402×874', 'pitkä (6)', puhelin.pitka),
  rivi('iPad 834×1112', 'lyhyt (2)', ipad.lyhyt),
  rivi('iPad 834×1112', 'pitkä (6)', ipad.pitka),
  '',
  '## Kamera-ajot (kerroin = ennakkozoomi, null = saatto tai saapumisrajaus)',
  '',
  '```',
  JSON.stringify({
    iphoneLyhyt: puhelin.lyhyt.ajot, iphonePitka: puhelin.pitka.ajot,
    ipadLyhyt: ipad.lyhyt.ajot, ipadPitka: ipad.pitka.ajot,
  }, null, 1),
  '```',
  '',
  '## Kameran nopeusprofiili (osuus ajosta → nopeus / keskinopeus)',
  '',
  ...[['iPhone lyhyt', puhelin.lyhyt], ['iPhone pitkä', puhelin.pitka],
    ['iPad lyhyt', ipad.lyhyt], ['iPad pitkä', ipad.pitka]].flatMap(([n, m]) => [
    `### ${n}`,
    '',
    '```',
    m.profiili.map((p) => `${p.osuus.toFixed(2)}  ${'#'.repeat(Math.round(p.v * 24))} ${p.v}`)
      .join('\n'),
    '```',
    '',
  ]),
].join('\n');
const taulukonNimi = LAUTA === 'pallo' ? 'siirto-koreografia-pallo.md' : 'siirto-koreografia.md';
writeFileSync(join(ULOS, taulukonNimi), taulukko);
console.log(`\naikataulukko: ${join(ULOS, taulukonNimi)}`);

console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
