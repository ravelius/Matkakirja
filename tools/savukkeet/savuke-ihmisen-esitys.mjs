/*
 * SELAINSAVUKE: IHMISEN MATKA — ESITYS YHTENÄ KAARENA.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-esitys.mjs
 *
 * Raamattu IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA + ALKAA MUSTASTA
 * RUUDUSTA (omistaja 7.9.2026). Yksikkötestit näkevät kaanonin,
 * kellon käännöksen ja nimet (tests/ihmisen-matka-esitys.test.mjs),
 * mutta eivät sitä, MENEEKÖ ESITYS LÄPI ILMAN PELAAJAA: pimeneekö
 * ruutu, syttyvätkö valot Afrikkaan, eteneekö kello, kelaako se
 * aikahypyssä taaksepäin, nouseeko kuva pieneksi kohteen viereen ja
 * kutsutaanko lopuksi tutkimusvaiheen koukku. Kaikki nämä rikkoutuvat
 * hiljaa: mikään ei kaadu, esitys vain jää kesken tai jumiin.
 *
 * ÄÄNITTEET MOCKATAAN: kertojan jaksot ja pulun välihuomiot palautetaan
 * KOLMEN SEKUNNIN HILJAISUUTENA (ämpärissä ei ole vielä yhtään
 * kertomusluentaa — Fable ajaa generoinnin erikseen). Kolme sekuntia on
 * oikea mitta myös siksi, että esitys lukee jakson keston nimenomaan
 * äänitteestä: mock todistaa sen polun, jota varakesto ei todista.
 * Koko esitys kestää siis noin 22 × 3 s + pulujen hännät ≈ 80 s.
 * KONTISSA AJO ON PALJON HITAAMPI (10–20 min): ohjelmisto-WebGL piirtää
 * pallon noin kehyksen sekunnissa ja jokainen kuvakaappaus odottaa
 * kehystä. Kuvat otetaan siksi yksi kerrallaan ja aina esitys
 * pysäytettynä (ks. odotaJaPysayta).
 *
 * VÄITTEET:
 *   1. Linssi laukusta: vanat valmiit ja Käynnistä-nappi ruudulla.
 *   2. PIMEÄ: Käynnistä-napin jälkeen ruutu on musta, kartta ja
 *      käyttöliittymä piilossa, vain sulkunappi käytettävissä.
 *   2b. TAUKO/JATKA: kello ja luenta pysähtyvät samasta kohdasta ja
 *      jatkuvat siitä (kuva otetaan tauolla, ks. alempaa).
 *   3. VALOT: musta väistyy, kamera on rajattuna koko Afrikkaan ja
 *      musiikki on käynnistetty.
 *   4. MATKA: jaksot etenevät ilman käyttäjän toimia viimeiseen asti.
 *   5. KUVA: kohteellisella jaksolla kuva on esillä ja pieni (noin 22 %
 *      ruudun leveydestä); kohteettomalla jaksolla se on poissa.
 *   6. KELLO: lukema etenee (pienenee) ja AIKAHYPYSSÄ kelaa taaksepäin
 *      14 500 → 50 000.
 *   7. PULU: välihuomiot sanotaan (neljä kuplaa) eikä esitys pysähdy.
 *   8. LOPPU: kamera koko pallossa, esinerivi palaa ja
 *      ui.aloitaTutkimusvaihe on kutsuttu tasan kerran.
 *   9. Sulje purkaa kaiken: ei kelloa, ei peitettä, ei body-luokkaa.
 *  10. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio): pimeä alku, valot Afrikkaan,
 * kuva kohteen vieressä, aikahyppy ja loppu koko pallossa.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PORTTI = 8747;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/** Näkymä: omistajan arviointimitta esitykselle (834 × 1100). */
const NAKYMA = { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 };

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/**
 * KOLMEN SEKUNNIN HILJAISUUS (16-bittinen mono-WAV). Selain päättää
 * muodon SISÄLLÖSTÄ eikä osoitteen päätteestä, joten tämä kelpaa myös
 * .mp3-pyyntöön — ja WAV syntyy ilman ffmpegiä, jota kontissa ei ole.
 */
function hiljaisuusWav(sekunteja = 3, hz = 8000) {
  const tavuja = hz * sekunteja * 2;
  const puskuri = Buffer.alloc(44 + tavuja);
  puskuri.write('RIFF', 0);
  puskuri.writeUInt32LE(36 + tavuja, 4);
  puskuri.write('WAVE', 8);
  puskuri.write('fmt ', 12);
  puskuri.writeUInt32LE(16, 16);
  puskuri.writeUInt16LE(1, 20);
  puskuri.writeUInt16LE(1, 22);
  puskuri.writeUInt32LE(hz, 24);
  puskuri.writeUInt32LE(hz * 2, 28);
  puskuri.writeUInt16LE(2, 32);
  puskuri.writeUInt16LE(16, 34);
  puskuri.write('data', 36);
  puskuri.writeUInt32LE(tavuja, 40);
  return puskuri;
}
const HILJAISUUS = hiljaisuusWav(3);

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

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  const sisalto = readFileSync(polku);
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const virheet = [];
const konteksti = await selain.newContext({ ...NAKYMA, serviceWorkers: 'block' });
const s = await konteksti.newPage();
s.on('pageerror', (e) => virheet.push(String(e)));
await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
/*
 * ÄÄNITTEET ENSIN, MUU ÄMPÄRI SEN JÄLKEEN (jälkimmäinen reitti voittaa
 * Playwrightissa, joten hiljaisuus rekisteröidään VIIMEISENÄ).
 */
await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus) { route.abort(); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await s.route(/\/puhe\/|\/aanet\//, (route) => route.fulfill({
  status: 200, contentType: 'audio/wav', body: HILJAISUUS,
  headers: { 'access-control-allow-origin': '*' },
}));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};
const kuva = (tunnus) => join(ULOS, `savuke-ihmisen-esitys-${tunnus}.png`);
/** Vaihe on jokin muu kuin pimeä eli valot ehtivät syttyä. */
const heti = (vaihe) => Boolean(vaihe) && vaihe !== 'pimea';

/* ---------------------------------------------------------- peli auki */

await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
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
  ui.render();
});
await s.waitForTimeout(1200);
const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
  .then(() => true).catch(() => false);
await s.waitForTimeout(1500);

/* ---------------------------------------------------- 1. linssi laukusta */

const lahto = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  /*
   * PULU NÄKYVIIN. Pöllö on aarre (js/pollo.js nakyyko): peli alkaa
   * ilman sitä, ja piilossa olevan napin vierestä ei näytetä kuplia.
   * Välihuomiot ovat osa esitystä, joten savuke löytää pulun puolesta.
   */
  ui.game.polloLoydetty = true;
  window.matkakirjaPollo?.paivitaNakyvyys?.();
  if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
  ui.valitseLinssi('ihmisen-matka');
  for (let i = 0; i < 600; i += 1) {
    if (ui.aikajana) break;
    await new Promise((r) => setTimeout(r, 25));
  }
  const ajo = ui.aikajana;
  if (!ajo?.virrat) return { aikajana: Boolean(ajo), virrat: false };
  await ajo.virrat.valmis;
  return {
    aikajana: true,
    virrat: true,
    esitys: Boolean(ajo.esitys),
    jaksoja: ajo.kaari.kertomus?.length ?? 0,
    vanoja: ajo.virrat.tila().vanoja,
    avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')),
  };
});
vaadi('linssi laukusta: kertomus, ohjaaja ja vanat valmiina ennen Käynnistä-nappia',
  pallo && lahto.aikajana && lahto.esitys && lahto.jaksoja >= 20
    && lahto.vanoja >= 15 && lahto.avausnappi,
  JSON.stringify(lahto));

/* ------------------------------------------------- näytteenotto sivulle */

await s.evaluate(() => {
  const { ui } = window.matkakirja;
  // Koukun monkeypatch: tutkimusvaihe on toisen moduulin työtä, savuke
  // vain laskee, kutsutaanko se — ja tasan kerran.
  window.__tutkimus = 0;
  ui.aloitaTutkimusvaihe = () => { window.__tutkimus += 1; };
  window.__nayte = [];
  window.__poiminta = setInterval(() => {
    const ajo = window.matkakirja.ui.aikajana;
    const t = ajo?.esitys?.tila?.();
    if (!t) return;
    const kuvake = document.querySelector('.aikajana-kertomuskuva');
    window.__nayte.push({
      ...t,
      aika: Math.round(performance.now()),
      kuvaLeveys: kuvake ? Math.round(kuvake.getBoundingClientRect().width) : 0,
      alue: ui.nakyvaAlue ? Math.round(ui.nakyvaAlue().w) : null,
    });
  }, 200);
});

/* -------------------------------------------------------- 2. pimeä alku */

await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
// Liu'ut (peite 500 ms, käyttöliittymän väistö 500 ms) ehtivät loppuun
// hyvin ennen avausjakson kolmen sekunnin luentaa.
await s.waitForTimeout(1800);
const pimea = await s.evaluate(() => {
  const juuri = document.querySelector('.aikajana');
  const peite = document.querySelector('.aikajana-esitys-peite');
  const sulje = document.querySelector('.aikajana-sulje');
  const kello = document.querySelector('.aikajana-kello');
  const tyyli = (el) => (el ? Number(getComputedStyle(el).opacity) : null);
  return {
    peite: Boolean(peite),
    peiteMusta: tyyli(peite),
    pimeaLuokka: Boolean(juuri?.classList.contains('esitys-pimea')),
    kelloNakyy: tyyli(kello),
    suljeNakyy: tyyli(sulje),
    jakso: window.matkakirja.ui.aikajana?.esitys?.tila()?.jakso ?? null,
    // Diagnostiikka: kummassa juuressa kello on ja onko tyyli ladattu.
    kelloJuuressa: Boolean(juuri && kello && juuri.contains(kello)),
    tyylissaSaantoja: [...document.styleSheets]
      .filter((sh) => String(sh.href ?? '').includes('aikajana.css'))
      .reduce((n, sh) => {
        try {
          return n + [...sh.cssRules].filter((r) => String(r.selectorText ?? '').includes('esitys-pimea')).length;
        } catch { return n; }
      }, 0),
  };
});
/*
 * KUVA OTETAAN TAUOLLA. Kontin ohjelmisto-WebGL piirtää pallon noin
 * kehyksen sekunnissa, ja screenshot odottaa piirtoa: käynnissä oleva
 * esitys ehtii sillä välin jaksosta toiseen, ja "pimeä alku" -kuva
 * tulisi jo valoista. Tauko pysäyttää kellon ja luennan samasta
 * kohdasta, joten kuva on siitä hetkestä, jonka väitteet yllä
 * mittasivat — ja samalla tulee todistettua tauko ja jatko.
 *
 * TAUKO OTETAAN OHJAAJAN RAJAPINNASTA EIKÄ NAPISTA: pimeässä
 * Tauko-nappi on piilossa (vain sulkunappi on käytettävissä), joten
 * napin painaminen tässä olisi sellaista, mitä pelaaja ei voi tehdä.
 * Napin kytkentä ohjaajaan on vartioitu yksikkötestissä
 * (tests/ihmisen-matka-esitys.test.mjs: taukoTaiJatka-portti).
 */
const tauolla = await s.evaluate(() => {
  const { ui } = window.matkakirja;
  ui.aikajana.esitys.tauko();
  const t = ui.aikajana.esitys.tila();
  /*
   * NAPIN TEKSTI LUETAAN AJOLTA, EI ENSIMMÄISELTÄ .aikajana-napilta.
   * Ohjainrivin ensimmäinen nappi on 7.9.2026 alkaen LAPUN KAHVA
   * ("Matka päättyy ▾", js/aikajana.js lappuKahva), joten valitsin
   * palautti "▾" eikä "Jatka" — savuke luuli Tauon rikkoutuneen,
   * vaikka rikki oli mittaus.
   */
  return { ...t, nappi: ui.aikajana?.taukoNappi?.textContent ?? null };
});
await s.screenshot({ path: kuva('1-pimea') });
const jatkui = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  const ennen = ui.aikajana.esitys.tila();
  // Tauko ei saa juoksuttaa kelloa: pitkäkin odotus jää kuluneeseen.
  await new Promise((r) => setTimeout(r, 1200));
  const seisoi = ui.aikajana.esitys.tila();
  ui.aikajana.esitys.jatka();
  /*
   * JATKON TODISTE MITATAAN VÄLJÄSTI. Esityksen silmukka on
   * requestAnimationFramessa, ja kontin ohjelmisto-WebGL piirtää
   * pallon noin kehyksen sekunnissa: lyhyt odotus ei takaa yhtäkään
   * kehystä. Kolme sekuntia riittää sekä hitaassa kontissa että
   * oikealla laitteella.
   */
  await new Promise((r) => setTimeout(r, 3000));
  const t = ui.aikajana.esitys.tila();
  return {
    ennen: ennen.kulunut,
    ennenJakso: ennen.jakso,
    seisoi: seisoi.kulunut,
    seisoiJakso: seisoi.jakso,
    jalkeen: t.kulunut,
    jakso: t.jakso,
    kaynnissa: t.kaynnissa,
    vuosia: t.vuosia,
    ennenVuosia: ennen.vuosia,
  };
});
vaadi('TAUKO: kello ja luenta pysähtyvät samasta kohdasta, jatko jatkaa siitä',
  tauolla.tauolla === true && tauolla.kaynnissa === false && tauolla.nappi === 'Jatka'
    // Tauolla mikään ei liiku: sama jakso, sama kulunut, sama lukema.
    && jatkui.seisoi === jatkui.ennen && jatkui.seisoiJakso === jatkui.ennenJakso
    // Jatko lähtee samasta kohdasta ja esitys etenee siitä eteenpäin.
    && jatkui.kaynnissa === true
    && (jatkui.jalkeen > jatkui.ennen || jatkui.jakso !== jatkui.ennenJakso),
  JSON.stringify({ tauolla: { tauolla: tauolla.tauolla, nappi: tauolla.nappi }, jatkui }));
vaadi('PIMEÄ: ruutu musta, kartta ja käyttöliittymä piilossa, sulkunappi käytettävissä',
  pimea.peite && pimea.peiteMusta === 1 && pimea.pimeaLuokka
    && pimea.kelloNakyy === 0 && pimea.suljeNakyy === 1 && pimea.jakso === 'avaus',
  JSON.stringify(pimea));

/* ------------------------------------------------------ 3. valot syttyvät */

const valot = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  /*
   * RAJAUS MITATAAN SILLÄ HETKELLÄ, KUN VALOT SYTTYVÄT. Kamera on
   * ajettu Afrikkaan jo pimeässä (kesto 0), ja seuraava jakso vie sen
   * jo Marokkoon — kolmen sekunnin kuluttua mittaus kertoisi
   * lähikuvasta eikä mantereesta.
   */
  let nakyma = null;
  let vaihe = null;
  for (let i = 0; i < 900; i += 1) {
    vaihe = ui.aikajana?.esitys?.tila()?.vaihe ?? null;
    if (vaihe && vaihe !== 'pimea') { nakyma = ui.nakyvaAlue(); break; }
    await new Promise((r) => setTimeout(r, 40));
  }
  const heti = {
    vaihe,
    pimea: ui.aikajana?.esitys?.tila()?.pimea,
    leveys: nakyma ? Math.round(nakyma.w) : null,
    keskiX: nakyma ? Math.round(nakyma.x + nakyma.w / 2) : null,
    keskiY: nakyma ? Math.round(nakyma.y + nakyma.h / 2) : null,
    pito: ui.aikajana?.virrat?.tila().pito,
  };
  // Musta häipyy 2,6 sekunnissa (VALOJEN_MS) — kuva otetaan sen jälkeen.
  await new Promise((r) => setTimeout(r, 2800));
  return { ...heti, peite: Boolean(document.querySelector('.aikajana-esitys-peite')) };
});
await s.screenshot({ path: kuva('2-valot-afrikkaan') });
/*
 * AFRIKKA TÄYTTÄÄ RUUDUN. Laatikko on laudan yksiköissä keskipisteessä
 * (6400, 3173) ja 2 333 × 2 508 yksikköä; 4 %:n marginaalilla ja
 * näkymän 834 × 1100 kuvasuhteella kamera pyytää noin 2 520 yksikön
 * leveyttä. Väljä haarukka, koska pallon geometria ja laattojen
 * tarkkuusraja saavat siirtää korkeutta kummallekin puolelle.
 */
vaadi('VALOT: musta väistyy ja pallo on rajattuna koko Afrikkaan',
  heti(valot.vaihe) && valot.pimea === false && !valot.peite
    && valot.leveys > 1800 && valot.leveys < 4500
    && Math.abs(valot.keskiX - 6400) < 700 && Math.abs(valot.keskiY - 3173) < 700,
  JSON.stringify(valot));
vaadi('VALOT: vanojen pito kytkeytyy päälle (rintama ei katoa kelauksessa)',
  valot.pito === true, JSON.stringify({ pito: valot.pito }));

/* -------------------------------------- 4.–7. esitys kulkee itsestään loppuun */

/*
 * KUVAT OTETAAN YKSI KERRALLAAN JA AINA TAUOLLA.
 *
 * Ensimmäinen versio odotti hetkiä rinnakkaisilla lupauksilla ja
 * kuvasi ne siinä missä esitys oli menossa. Kontissa se JUMITTI ajon:
 * screenshot pakottaa kehyksen ohjelmisto-WebGL:llä (noin sekunti per
 * kehys), ja kaksi päällekkäistä kuvausta pysäytti requestAnimationFramen
 * — jolla esityksen silmukka käy — minuuteiksi. Nyt jokainen hetki
 * odotetaan, esitys pysäytetään, kuva otetaan ja esitys jatkaa.
 */

/**
 * Odottaa sivulla ehtoa esityksen tilassa, pysäyttää esityksen ja
 * palauttaa tilan; `jatka` päästää sen taas menemään.
 *
 * @param {string} kentta esityksen tila()-kentän nimi
 * @param {string|boolean} arvo odotettu arvo
 */
async function odotaJaPysayta(kentta, arvo, kierroksia = 1200) {
  return s.evaluate(async ([k, a, n]) => {
    const { ui } = window.matkakirja;
    for (let i = 0; i < n; i += 1) {
      const t = ui.aikajana?.esitys?.tila();
      if (!t || t.paattynyt) break;
      if (t[k] === a) {
        ui.aikajana.esitys.tauko();
        return { ...ui.aikajana.esitys.tila(), osui: true };
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    return { osui: false, ...(ui.aikajana?.esitys?.tila() ?? {}) };
  }, [kentta, arvo, kierroksia]);
}
const jatkaEsitys = () => s.evaluate(() => window.matkakirja.ui.aikajana?.esitys?.jatka());

/* 5. KUVA: löytökuva kohteen vieressä. */
const kuvahetki = await odotaJaPysayta('kuvaEsilla', true);
/*
 * MITTA VASTA KUN POKSAHDUS ON PERILLÄ. Kehys tulee esiin
 * scale(0,6) → scale(1) -siirtymällä (0,5 s), joten liikkeen aikana
 * mitattu leveys on mitä tahansa väliltä 110–183 px. Odotetaan, että
 * kaksi peräkkäistä mittausta ovat samat.
 */
const kuvamitat = await s.evaluate(async () => {
  const lue = () => {
    const el = document.querySelector('.aikajana-kertomuskuva');
    const laatikko = el?.getBoundingClientRect();
    return laatikko ? Math.round(laatikko.width) : 0;
  };
  let edellinen = -1;
  for (let i = 0; i < 40; i += 1) {
    const nyt = lue();
    if (nyt > 0 && nyt === edellinen) break;
    edellinen = nyt;
    await new Promise((r) => setTimeout(r, 150));
  }
  const leveys = lue();
  return { leveys, osuus: Number((leveys / window.innerWidth).toFixed(3)) };
});
if (kuvahetki.osui) await s.screenshot({ path: kuva('3-kuva-kohteen-vieressa') });
await jatkaEsitys();
/*
 * PIENI KUVA: 22 % ruudun leveydestä (KUVAN_OSUUS), katto 260 px.
 * 834 px:n näkymässä osuus voittaa katon vasta 1 182 px:ssä, joten
 * mitta on tässä 183 px — sivuosassa, ei näyttämön keskellä.
 */
vaadi('KUVA: löytökuva nousee pienenä kohteen viereen',
  kuvahetki.osui && kuvamitat.leveys > 100 && kuvamitat.leveys < 300
    && kuvamitat.osuus > 0.15 && kuvamitat.osuus < 0.3,
  JSON.stringify({ jakso: kuvahetki.jakso, ...kuvamitat }));

/* 6. HYPPY: kello kelaa taaksepäin. */
const hyppyhetki = await odotaJaPysayta('vaihe', 'hyppy', 2400);
if (hyppyhetki.osui) await s.screenshot({ path: kuva('4-aikahyppy') });
await jatkaEsitys();

/*
 * 8. LOPPU: esitys ajaa itsensä loppuun.
 *
 * SELAIN VOI KUOLLA ALTA. Esitys kestää mockatuilla äänillä noin 80 s
 * ja kontissa moninkertaisesti sen; kuormitetussa ympäristössä
 * Chromium on kaatunut kesken odotuksen ("Target page, context or
 * browser has been closed"). Ilman tätä nielua savuke päättyi
 * jäsentämättömään pinojälkeen eikä kertonut, mitkä väitteet ehtivät
 * mennä läpi. Nyt kaatuminen on YKSI FAIL-rivi ja yhteenveto tulee
 * silti näkyviin.
 */
try {
  const loppu = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    for (let i = 0; i < 3000; i += 1) {
      if (ui.aikajana?.esitys?.tila()?.paattynyt) break;
      await new Promise((r) => setTimeout(r, 200));
    }
    clearInterval(window.__poiminta);
    // Esinerivin peittävyys on mittarina mukana (ks. LOPPU-väite).
    const nauha = document.querySelector('.aikajana-nauha');
    const peitto = () => (nauha ? Number(getComputedStyle(nauha).opacity) : null);
    const t = ui.aikajana?.esitys?.tila() ?? null;
    return {
      tila: t,
      tutkimus: window.__tutkimus,
      nauhaNakyy: peitto(),
      // Luokan poisto on varsinainen väite; peittävyys on sen liuku.
      esitysLuokka: Boolean(document.querySelector('.aikajana')?.classList.contains('esitys-kaynnissa')),
      leveys: Math.round(ui.nakyvaAlue().w),
      naytteita: window.__nayte.length,
    };
  });
  const nayte = await s.evaluate(() => window.__nayte);
  await s.screenshot({ path: kuva('5-loppu-koko-pallo') });

  const jaksot = [...new Set(nayte.map((n) => n.jakso).filter(Boolean))];
  vaadi('MATKA: jaksot etenevät loppuun asti ilman käyttäjän toimia',
    loppu.tila?.paattynyt === true && jaksot.length >= 20,
    `${jaksot.length} jaksoa: ${jaksot.slice(0, 3).join(', ')} … ${jaksot.slice(-2).join(', ')}`);

  vaadi('KUVA: kuva katoaa kohteettomalla jaksolla eikä jää roikkumaan',
    nayte.some((n) => n.jakso === 'siirtyma-afrikka' && !n.kuvaEsilla)
      && (loppu.tila?.kuvia ?? 0) >= 15 && loppu.tila?.kuvaEsilla === false,
    JSON.stringify({ kuvia: loppu.tila?.kuvia, lopussaEsilla: loppu.tila?.kuvaEsilla }));

  /*
   * KELLO ETENEE JA KELAA. Kaanoni palaa ajassa taaksepäin kahdesti
   * (Karmelvuori ja aikahyppy), joten "aina laskeva" ei ole väite —
   * väite on, että lukema kulkee 300 000:sta nollaan JA että hypyssä se
   * nousee 14 500:sta 50 000:een.
   */
  const alkuLukema = nayte.find((n) => n.jakso === 'jebel-irhoud')?.vuosia ?? null;
  const hypyt = nayte.filter((n) => n.vaihe === 'hyppy').map((n) => n.vuosia);
  const chile = nayte.filter((n) => n.jakso === 'chile').map((n) => n.vuosia);
  const eurooppa = nayte.filter((n) => n.jakso === 'eurooppa').map((n) => n.vuosia);
  /*
   * KELAUS MITATAAN SUUNNASTA JA LOPPUTULOKSESTA, EI YKSITTÄISESTÄ
   * NÄYTTEESTÄ. Näytteenotto on 200 ms:n setInterval, ja kontissa se
   * nälkiintyy pallon piirron alle: kelauksen (2,4 s) molempia päitä ei
   * voi luvata osuvan otokseen — eikä tarvitse. Väitteet ovat:
   *   1. Chilen jakso PYSYY lukemassaan 14 500 (ei kelaa itse).
   *   2. Hyppyjaksossa lukema on käynyt kelauksen PERILLÄ (≥ 45 000)
   *      eikä koskaan alittanut kelauksen LÄHTÖÄ (14 500). Lähtöluku
   *      itse on kelvollinen näyte: jakson ensimmäisellä kehyksellä
   *      kello on vielä siinä, mistä kelaus alkaa.
   *   3. Euroopan jakso jatkaa kelauksen perältä (≥ 40 000).
   *   4. Kaari alkaa 300 000:sta ja päättyy nykyaikaan.
   *
   * "Lukema kasvaa näytteestä toiseen" EI ole väite: kelaus kestää
   * 2,4 s ja näytteitä otetaan 200 ms:n välein ajastimella, joka
   * kontissa nälkiintyy pallon piirron alle — ramppi voi jäädä
   * kokonaan otosten väliin (mitattuna 7.9.2026: kummatkin näytteet
   * olivat jo perillä, 49 949 ja 49 724).
   */
  vaadi('KELLO: lukema etenee 300 000:sta nollaan ja kelaa aikahypyssä taaksepäin',
    alkuLukema > 200000 && (loppu.tila?.vuosia ?? 1e9) < 2000
      && chile.at(-1) === 14500
      && hypyt.length > 0 && Math.min(...hypyt) >= 14500 && Math.max(...hypyt) >= 45000
      && eurooppa.length > 0 && Math.max(...eurooppa) >= 40000
      && hyppyhetki.osui,
    JSON.stringify({
      alku: alkuLukema,
      chileLoppu: chile.at(-1),
      hyppyMin: hypyt.length ? Math.min(...hypyt) : null,
      hyppyMax: hypyt.length ? Math.max(...hypyt) : null,
      euroopanHuippu: eurooppa.length ? Math.max(...eurooppa) : null,
      loppu: loppu.tila?.vuosia,
    }));

  vaadi('PULU: välihuomiot sanotaan kertojan päälle eikä esitys pysähdy',
    (loppu.tila?.puluja ?? 0) >= 3, JSON.stringify({ puluja: loppu.tila?.puluja }));

  /*
   * KOKO PALLO EI OLE 12 000 LAUTAYKSIKKÖÄ. Pallon kaukaisin korkeus on
   * 2,5 (js/pallolauta/kamera.js PALLO_KORKEUS_MAX), jolloin ruudulla
   * näkyy noin puolet pallosta — mitattuna 3 500 yksikön luokkaa. Väite
   * on siis "kamera on vetäytynyt kauas", ei tarkka luku: lopun näkymä
   * on moninkertainen jakson lähikuvaan (1 200) nähden.
   *
   * ESINERIVI: väite on, että esitys PÄÄSTÄÄ SEN IRTI (luokka
   * `esitys-kaynnissa` pois), ei että kortteja näkyisi. Nauhalla on oma
   * `tyhja`-tila niin kauan kuin pysäkkikello ei ole käynyt
   * (js/aikajana.js asettele), eikä kertomusesityksessä se käy koskaan
   * — mitä alarivillä lopulta näkyy, on tutkimusvaiheen asia.
   */
  vaadi('LOPPU: kamera vetäytyy koko palloon, esitys päästää esinerivin irti ja tutkimusvaihe kutsutaan kerran',
    loppu.leveys > 3000 && loppu.esitysLuokka === false && loppu.tutkimus === 1,
    JSON.stringify({
      leveys: loppu.leveys,
      esitysLuokka: loppu.esitysLuokka,
      nauha: loppu.nauhaNakyy,
      tutkimus: loppu.tutkimus,
    }));
  /* ------------------------------------------------------- 9. purku */

  await s.evaluate(() => document.querySelector('.aikajana-sulje')?.click());
  await s.waitForTimeout(1600);
  const purku = await s.evaluate(() => ({
    kello: Boolean(document.querySelector('.aikajana-kello')),
    peite: Boolean(document.querySelector('.aikajana-esitys-peite')),
    teksti: Boolean(document.querySelector('.aikajana-kertomusteksti')),
    luokka: document.body.classList.contains('aikajana-paalla'),
    aikajana: Boolean(window.matkakirja.ui.aikajana),
  }));
  vaadi('SULJE purkaa kaiken: ei kelloa, ei peitettä, ei body-luokkaa',
    !purku.kello && !purku.peite && !purku.teksti && !purku.luokka && !purku.aikajana,
    JSON.stringify(purku));
} catch (syy) {
  vaadi('esitys ajautuu loppuun asti (selain pysyi pystyssä)', false, String(syy?.message ?? syy));
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close().catch(() => {});
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
