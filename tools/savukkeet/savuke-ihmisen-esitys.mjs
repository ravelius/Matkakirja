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
 *   2. MUSTA ALKU (8.9.2026): Käynnistä-napin jälkeen ruutu on KOKONAAN
 *      musta — ei palloa, ei tähtiä — ja kertoja puhuu jo.
 *   2a. TÄHDET: pistepilvi feidautuu esiin mustan laskiessa harsoksi
 *      ENSIMMÄISEN VIRKKEEN jälkeen, pallo on tähtien keskellä
 *      pisteenä (korkeus 300, n. 6 px), ja avausjakson lauseet tulevat
 *      YKSITELLEN KESKELLE RUUTUA isolla kirjasimella.
 *   2b. AFRIKKA-SANA: zoomi PÄÄTTYY neljännen lauseen ("Afrikasta.")
 *      kohdalle — pallo kasvaa pisteestä ruudun täyttäväksi Afrikka
 *      keskellä juuri silloin kun sana kuuluu — ja samalla hetkellä
 *      kamera lähtee kohti Marokkoa (MAROKKO-väite kohdassa 3).
 *   2c. TAUKO/JATKA: kello, luenta JA zoomi pysähtyvät samasta kohdasta
 *      ja jatkuvat siitä.
 *   3. VALOT: musta väistyy vasta kun pallo on perillä, kamera on
 *      rajattuna koko Afrikkaan ja musiikki on käynnistetty.
 *   3b. TEKSTI ALAS: ensimmäisessä kohteessa rivi laskeutuu alalaitaan.
 *   4. MATKA: jaksot etenevät ilman käyttäjän toimia viimeiseen asti.
 *   5. KUVA: kohteellisella jaksolla kuva on esillä ja pieni (noin 22 %
 *      ruudun leveydestä); kohteettomalla jaksolla se on poissa.
 *   6. KELLO: lukema etenee (pienenee) ja AIKAHYPYSSÄ kelaa taaksepäin
 *      14 500 → 50 000.
 *   7. PULU: välihuomiot sanotaan (neljä kuplaa) eikä esitys pysähdy.
 *   7b. AIKASELAIN (7.9.2026): nauha on pimeässä piilossa mutta
 *      rakennettu (yksi viiva per jakso, 21 kpl), ja sen valinta seuraa
 *      esitystä jakso jaksolta viimeiseen asti. Aito veto on savukkeessa
 *      savuke-ihmisen-tutkimus.mjs (väite 2b).
 *   8. LOPPU: kamera koko pallossa, esinerivi palaa ja
 *      ui.aloitaTutkimusvaihe on kutsuttu tasan kerran.
 *   8b. KÄRKI KUVASSA: kulkevan vanan kärki pysyy ruudulla jokaisessa
 *      jaksossa (Raamattu ETELA-AFRIKASSA KAMERA ULOS).
 *   9. Sulje purkaa kaiken: ei kelloa, ei peitettä, ei body-luokkaa.
 *  10. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio): musta alku, tähdet, Afrikka
 * pisteenä, tauko, zoomi puolivälissä, valot Afrikkaan, teksti alhaalla,
 * kuva kohteen vieressä, aikahyppy ja loppu koko pallossa.
 *
 * VAIN_AVAUS=1 ajaa vain avausosan (musta → ensimmäinen kohde) ja
 * lopettaa siihen: koko esitys kestää kontissa 10–20 minuuttia.
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
/*
 * AVAUSJAKSOT SAAVAT OIKEAN MITTAISEN HILJAISUUDEN (8.9.2026). Muille
 * jaksoille kolme sekuntia riittää, mutta avaus, afrikka ja ensimmäinen
 * kohde ovat se kohta, jossa ajoitus on koko juju: musta kestää
 * ensimmäisen virkkeen, tähdet nousevat sen jälkeen ja zoomi PÄÄTTYY
 * sanaan "Afrikasta" (n. 79 % avausjakson luennasta) — kolmen sekunnin
 * luennalla nämä kolme vaihetta puristuisivat päällekkäin eikä savuke
 * mittaisi sitä, mitä pelaaja näkee. Yhdeksän sekuntia vastaa tekstin
 * omaa mittaa (kertomuksenVarakesto: 8,4 s ja 7,8 s).
 *
 * KAKSINKERTAINEN MITTA 9.9.2026. Kun zoomi PÄÄTTYY sanaan "Afrikasta"
 * eikä lähde siitä (ALKUANIMAATIO), sen kestoksi jää tekstin omalla
 * mitalla vain noin kaksi sekuntia — juuri niin nopea kuin omistaja
 * pyysi, mutta kontissa se on vain kaksi kehystä, eikä tauko-väite ehdi
 * mitata pysähtynyttä ajoa (mitattu: zoomi ehti perille kahden
 * Playwright-kutsun välissä). Mock on siksi 18 s: vaiheiden SUHTEET
 * ovat samat kuin pelissä, mutta jokainen niistä kestää monta kehystä.
 */
const HILJAISUUS_AVAUS = hiljaisuusWav(18);

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
  status: 200,
  contentType: 'audio/wav',
  body: /kertomus-(avaus|afrikka|jebel-irhoud)\./.test(route.request().url()) ? HILJAISUUS_AVAUS : HILJAISUUS,
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
  /*
   * KÄRKI EI SAA POISTUA KUVASTA (Raamattu "IHMISEN MATKA:
   * ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA HUKKUA", omistaja
   * 7.9.2026 klo 18.15: *"kartta voisi zoomautua ulospäin, jotta ei
   * hukattaisi sitä viivaa, jossa oltiin menossa niin pahasti"*).
   *
   * Kärki lasketaan SELKÄRANGAN kärkilistasta (vana 0) sillä
   * lukemalla, johon kello on syvimmillään ehtinyt (`pitoMin`):
   * pito pitää piirretyn pituuden, joten kärki on siinä eikä
   * nykyisessä lukemassa. Ruudulla-olo mitataan pallon omalla
   * projektiolla ja etupuolen testillä (js/pallolauta/lauta.js
   * pisteEdessa) — takapuolen piste projisoituu ruudulle, muttei näy.
   *
   * RINTAMALLA-lippu erottaa ne näytteet, joissa vana KASVAA
   * (kello on syvimmässä lukemassaan). Kelauksen jälkeen (aikahyppy)
   * selkärangan kärki on Chilessä eikä ole enää rintama — silloin
   * kameran ei kuulukaan pitää sitä kuvassa (ks. jaksonRajaus).
   */
  const pisteet = ui.aikajana?.virrat?.vanat?.()?.pisteet?.() ?? [];
  window.__selkaranka = pisteet[0]?.pisteet ?? [];
  window.__karki = (nyt) => {
    const p = window.__selkaranka;
    // Ei vielä alkanut — eikä enää kasva: perillä oleva selkäranka on
    // vanhaa väestöä, ja Tyynenmeren jaksoissa rintama on toisessa
    // vanassa (meri, uusi-seelanti). Kummassakin päässä kärki on null.
    if (!p.length || nyt >= p[0][2] || nyt <= p[p.length - 1][2]) return null;
    const kierra = (v) => ((v + 540) % 360) - 180;
    for (let i = 1; i < p.length; i += 1) {
      if (p[i][2] <= nyt) {
        const a = p[i - 1];
        const b = p[i];
        const f = (a[2] - b[2]) ? (a[2] - nyt) / (a[2] - b[2]) : 0;
        return { lat: a[0] + (b[0] - a[0]) * f, lng: kierra(a[1] + kierra(b[1] - a[1]) * f) };
      }
    }
    return { lat: p[p.length - 1][0], lng: p[p.length - 1][1] };
  };
  window.__ruudulla = (piste) => {
    const pallo = ui.pallonInstanssi;
    if (!pallo || !piste) return null;
    const k = pallo.getCoords(piste.lat, piste.lng, 0);
    const kamera = pallo.camera()?.position;
    const edessa = kamera
      && (kamera.x - k.x) * k.x + (kamera.y - k.y) * k.y + (kamera.z - k.z) * k.z > 0;
    if (!edessa) return false;
    const r = pallo.getScreenCoords(piste.lat, piste.lng, 0);
    // Reunavara: kärki ei riitä olla juuri ja juuri ruudun laidassa.
    const vara = 24;
    return r.x > vara && r.x < window.innerWidth - vara
      && r.y > vara && r.y < window.innerHeight - vara;
  };
  window.__nayte = [];
  window.__poiminta = setInterval(() => {
    const ajo = window.matkakirja.ui.aikajana;
    const t = ajo?.esitys?.tila?.();
    if (!t) return;
    const kuvake = document.querySelector('.aikajana-kertomuskuva');
    const pito = Number.isFinite(t.pitoMin) ? t.pitoMin : t.vuosia;
    const karki = window.__karki(pito);
    window.__nayte.push({
      ...t,
      aika: Math.round(performance.now()),
      kuvaLeveys: kuvake ? Math.round(kuvake.getBoundingClientRect().width) : 0,
      alue: ui.nakyvaAlue ? Math.round(ui.nakyvaAlue().w) : null,
      karki,
      karkiRuudulla: window.__ruudulla(karki),
      /*
       * Rintama = kello on syvimmässä lukemassaan (vana kasvaa nyt).
       * Hyppyjakso ei ole rintamaa vaikka kello seisoisi pohjassaan
       * kelauksen ensimmäisillä kehyksillä: kamera on jo matkalla
       * Keski-Aasiaan, ja Chilen kärki on tarkoituksella takana.
       */
      rintamalla: karki ? (t.vuosia <= pito + 1 && t.vaihe !== 'hyppy') : false,
    });
    // Tiheämpi otos kuin kerran viidessäsadassa: kelaus kestää 2,4 s,
    // ja kontissa ajastin nälkiintyy pallon piirron alle.
  }, 120);
});

/* ------------------------- 2. musta alku, tähdet, piste, Afrikka-sana */

/*
 * AVAUS ON NELJÄ ERI HETKEÄ (Raamattu "IHMISEN MATKA: … AVAUS MUSTASTA
 * TAHTIIN JA AFRIKKAAN SANAN KOHDALLA", omistaja 8.9.2026,
 * sanatarkasti: *"Linssin aloitus voisi olla kokonaan musta ruutu ja
 * sitten siihen feidautuisi ensin tähtiä ja sitten ihan pienestä
 * pisteestä zoomautuisi afrikka esiin juuri sillä hetkellä kun kertoja
 * mainitsee sanan afrikka. Jokainen lause voisi tulla tämän kappaleen
 * loppuun asti yksitellen keskelle ruutua. Vasta kun siirrytään
 * ensimmäiseen kohteeseen tekstit hyppäävät alas nykyiselle
 * paikalleen."*).
 *
 * Jokainen hetki mitataan omalla kierroksellaan, koska ne ovat eri
 * aikoina eikä kontin kehystahdilla (noin kehys sekunnissa) voi
 * odottaa, että kaksi mittausta osuisi samaan tilaan.
 */

/**
 * Odottaa esityksen tila()-kentältä ehtoa JA PYSÄYTTÄÄ ESITYKSEN SAMALLA
 * KIERROKSELLA.
 *
 * MITATTU 8.9.2026: erillinen odotus ja erillinen mittaus eivät kelpaa.
 * Kontin ohjelmisto-WebGL piirtää pallon noin kehyksen sekunnissa, ja
 * sivun ajastimet nälkiintyvät sen alle — ensimmäisessä ajossa
 * "tähdet esillä" -ehto täyttyi, mutta seuraavaan `evaluate`-kutsuun
 * mennessä esitys oli jo zoomannut Afrikkaan (korkeus 50 → 31). Nyt
 * ehdon täyttyessä esitys pysäytetään samassa silmukassa, jolloin
 * mittaus ja kuva ovat siitä hetkestä. `jatkaEsitys()` päästää menemään.
 */
async function odotaJaPysayta(kentta, op, arvo, kierroksia = 900) {
  return s.evaluate(async ([k, o, a, n]) => {
    const { ui } = window.matkakirja;
    const tayttyy = (t) => {
      const v = t?.[k];
      if (o === '>=') return typeof v === 'number' && v >= a;
      if (o === '<=') return typeof v === 'number' && v <= a;
      return v === a;
    };
    for (let i = 0; i < n; i += 1) {
      const t = ui.aikajana?.esitys?.tila?.();
      if (!t || t.paattynyt) break;
      if (tayttyy(t)) {
        ui.aikajana.esitys.tauko();
        return { osui: true, ...ui.aikajana.esitys.tila() };
      }
      await new Promise((r) => setTimeout(r, 60));
    }
    return { osui: false, ...(ui.aikajana?.esitys?.tila?.() ?? {}) };
  }, [kentta, op, arvo, kierroksia]);
}
const jatkaEsitys = () => s.evaluate(() => window.matkakirja.ui.aikajana?.esitys?.jatka());

/** Ruudun pinnat yhtenä otoksena: peite, tähdet, kamera ja tekstirivi. */
const mittaaPinnat = () => s.evaluate(() => {
  const { ui } = window.matkakirja;
  const tyyli = (el) => (el ? Number(getComputedStyle(el).opacity) : null);
  const peite = document.querySelector('.aikajana-esitys-peite');
  const rivi = document.querySelector('.aikajana-kertomusteksti');
  const sisus = document.querySelector('.aikajana-kertomusteksti-sisus');
  const laatikko = sisus?.getBoundingClientRect() ?? null;
  const pov = ui.pallonInstanssi?.pointOfView?.() ?? null;
  const t = ui.aikajana?.esitys?.tila?.() ?? {};
  return {
    peite: tyyli(peite),
    peiteOn: Boolean(peite),
    musta: Boolean(peite?.classList.contains('musta')),
    mustaLevy: tyyli(document.querySelector('.aikajana-avaruus')),
    tahtienPeitto: t.tahdet?.peitto ?? null,
    tahtiEsiin: t.tahtiEsiin ?? null,
    korkeus: pov ? Math.round(pov.altitude * 1000) / 1000 : null,
    lat: pov ? Math.round(pov.lat * 10) / 10 : null,
    lng: pov ? Math.round(pov.lng * 10) / 10 : null,
    jakso: t.jakso ?? null,
    lause: t.lause ?? null,
    lauseita: t.lauseita ?? null,
    teksti: t.teksti ?? null,
    keskella: t.keskella ?? null,
    tekstiNakyy: t.tekstiNakyy ?? null,
    avausOdottaa: t.avausOdottaa ?? null,
    zoominHetki: t.zoominHetki ?? null,
    kulunut: t.kulunut ?? null,
    avaruusOsuus: t.avaruusOsuus ?? null,
    riviYla: rivi ? Math.round(rivi.getBoundingClientRect().top) : null,
    tekstiKeskiY: laatikko ? Math.round(laatikko.top + laatikko.height / 2) : null,
    ruutuKorkeus: window.innerHeight,
    kirjasin: sisus ? Math.round(parseFloat(getComputedStyle(sisus).fontSize)) : null,
  };
});

await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
/*
 * MITTA HETI, KUVA VASTA SEN JÄLKEEN. Musta pysyy nyt koko ENSIMMÄISEN
 * VIRKKEEN ajan (omistaja 9.9.2026, ALKUANIMAATIO), mutta kuvakaappaus
 * pakottaa kehyksen, joka kontissa kestää sekunnin — mittaus otetaan
 * siksi ensin.
 */
await s.waitForTimeout(200);
const musta = await mittaaPinnat();
await s.screenshot({ path: kuva('0-musta') });
/*
 * PALLO ON PISTE. Kamera on korkeudella 300 (AVARUUDEN_KORKEUS),
 * jolloin pallon kulmahalkaisija on 2·asin(1/301) ≈ 0,38° eli 0,76 %
 * ruudun korkeudesta (fov 50°) — noin 6 px, ja mustan peitteen alla ei
 * näy sitäkään.
 *
 * LUOKKA `musta` ON NYT MYÖS VÄITE: se poistetaan vasta kun kertoja on
 * lukenut ensimmäisen virkkeen loppuun (avauksenVaiheet.musta), joten
 * 200 ms:n kohdalla sen on oltava vielä paikallaan.
 */
vaadi('MUSTA ALKU: ensimmäinen virke luetaan kokonaan mustalle ruudulle',
  musta.peiteOn && musta.peite > 0.9 && musta.musta === true
    && (musta.tahtienPeitto === null || musta.tahtienPeitto < 0.1)
    && musta.korkeus > 25 && musta.avausOdottaa === true
    && musta.jakso === 'avaus',
  JSON.stringify(musta));

/* ------------------------------------------------------ tähdet esiin */

const tahtiHetki = await odotaJaPysayta('tahtiEsiin', '>=', 0.9, 600);
const tahdet = await mittaaPinnat();
await s.screenshot({ path: kuva('1-tahdet') });
/*
 * `avausOdottaa` EI OLE OSA VÄITETTÄ. Tähdet ovat täydessä
 * peittävyydessä 2,1 sekunnin kohdalla ja sana "Afrikasta" tulee vasta
 * 7,1 sekunnin kohdalla, mutta kontissa sivun ajastimet nälkiintyvät
 * pallon piirron alle: kolmesta ajosta yhdessä ensimmäinen näyte osui
 * vasta zoomin lähtöön. Väite on siis "tähdet ovat esillä ja pallo on
 * yhä piste" — lähtöhetken tarkkuutta vartioi AFRIKKA-SANA erikseen.
 */
vaadi('TÄHDET: pistepilvi feidautuu esiin mustan laskiessa harsoksi',
  tahtiHetki.osui && tahdet.tahtienPeitto > 0.5 && tahdet.peite < 0.6
    && tahdet.musta === false && tahdet.mustaLevy >= 0.9
    && tahdet.korkeus > 25,
  JSON.stringify({
    tahtiEsiin: tahdet.tahtiEsiin,
    peitto: tahdet.tahtienPeitto,
    harso: tahdet.peite,
    korkeus: tahdet.korkeus,
    musta: tahdet.musta,
    mustaLevy: tahdet.mustaLevy,
    avausOdottaa: tahdet.avausOdottaa,
  }));
/*
 * LAUSE KERRALLAAN KESKELLE. Rivi on ruudun keskikolmanneksessa ja
 * kirjasin isompi kuin alalaidan 1,02 rem (16 px perusluvulla).
 */
vaadi('LAUSEET: avausjakson lause on yksin ruudun keskellä ja isolla',
  tahdet.keskella === true && tahdet.lauseita === 5
    && tahdet.lause >= 0 && String(tahdet.teksti ?? '').length > 5
    && tahdet.kirjasin >= 18
    && Math.abs(tahdet.tekstiKeskiY - tahdet.ruutuKorkeus / 2) < tahdet.ruutuKorkeus * 0.18,
  JSON.stringify({
    keskella: tahdet.keskella,
    lause: tahdet.lause,
    lauseita: tahdet.lauseita,
    teksti: tahdet.teksti,
    kirjasin: tahdet.kirjasin,
    keskiY: tahdet.tekstiKeskiY,
    ruutu: tahdet.ruutuKorkeus,
  }));
/*
 * AIKASELAIN ON PIMEÄSSÄ PIILOSSA kuten kello ja Tauko-nappi (Raamattu
 * LINSSIEN AIKASELAIN ALAREUNAAN + ALKAA MUSTASTA RUUDUSTA). Nauha on
 * silti rakennettu, jottei se pompahda esiin valojen syttyessä.
 * Peittävyys mitataan kynnyksellä: liu'un kello etenee kontissa piirron
 * tahdissa eikä ole tasan nolla.
 */
const pimea = await s.evaluate(() => {
  const juuri = document.querySelector('.aikajana');
  const tyyli = (el) => (el ? Number(getComputedStyle(el).opacity) : null);
  return {
    pimeaLuokka: Boolean(juuri?.classList.contains('esitys-pimea')),
    kelloNakyy: tyyli(document.querySelector('.aikajana-kello')),
    suljeNakyy: tyyli(document.querySelector('.aikajana-valikko-nappi')),
    nauhaOlemassa: Boolean(document.querySelector('.aikaselain')),
    nauhaNakyy: tyyli(document.querySelector('.aikaselain')),
    nauhanViivoja: document.querySelectorAll('.aikaselain-viiva').length,
    // Musta pohja on KARTTARUUDUN ensimmäinen lapsi eli pallon alla.
    mustaEnsin: (() => {
      const levy = document.querySelector('.aikajana-avaruus');
      return levy ? levy.parentElement?.firstElementChild === levy : null;
    })(),
  };
});
vaadi('PIMEÄ: kartta ja käyttöliittymä piilossa, hampurilainen käytettävissä',
  pimea.pimeaLuokka && pimea.kelloNakyy === 0 && pimea.suljeNakyy === 1
    && pimea.mustaEnsin === true,
  JSON.stringify(pimea));
/*
 * VIIVOJA ON YHTÄ MONTA KUIN JAKSOJA. Luku oli 22 siihen asti, kun
 * Blombos oli oma jaksonsa; 8.9.2026 Etelä-Afrikassa käydään enää
 * kerran (Raamattu ETELA-AFRIKKA VAIN KERRAN), joten jaksoja on 21.
 */
vaadi('AIKASELAIN: nauha on rakennettu mutta pimeässä piilossa',
  pimea.nauhaOlemassa && pimea.nauhaNakyy < 0.15
    && pimea.nauhanViivoja === lahto.jaksoja,
  JSON.stringify({
    olemassa: pimea.nauhaOlemassa, nakyy: pimea.nauhaNakyy, viivoja: pimea.nauhanViivoja,
  }));
await jatkaEsitys();

/* ------------------------------------------- zoomi lähtee Afrikka-sanasta */

/*
 * ZOOMI PÄÄTTYY SANAAN (Raamattu ALKUANIMAATIO, omistaja 9.9.2026:
 * *"afrikka täyttää koko peli-ikkunan sillä hetkellä kun lukija
 * mainitsee afrikan ensimmäistä kertaa"*). Ennen zoomin lähtöä
 * `avausOdottaa` on tosi ja kamera seisoo korkeudella 300; ajo lähtee
 * hetkellä `kulunut` ja on perillä hetkellä `hetki` (sanan aikaleima
 * tai arvio luennan merkkiosuudesta).
 */
const zoomHetki = await odotaJaPysayta('avausOdottaa', '===', false, 900);
const piste = await mittaaPinnat();
await s.screenshot({ path: kuva('2-afrikka-pisteena') });
/*
 * LÄHTÖHETKI LUETAAN OHJAAJAN KIRJAUKSESTA (tila().zoomLahti) EIKÄ
 * NÄYTTEESTÄ: zoomi kestää vain pari sekuntia, eikä kontin
 * näytteenotto mahdu siihen. Ohjaaja kirjaa hetken silloin kun se
 * tapahtuu, joten väite on tarkka riippumatta kehystahdista.
 */
vaadi('AFRIKKA-SANA: zoomi päättyy neljännen lauseen kohdalle',
  zoomHetki.osui && zoomHetki.zoomLahti?.jakso === 'avaus'
    && zoomHetki.zoomLahti.hetki > 0
    // Ajo lähtee ENNEN sanaa ja on perillä sanan kohdalla (±150 ms).
    && zoomHetki.zoomLahti.kulunut < zoomHetki.zoomLahti.hetki
    && Math.abs((zoomHetki.zoomLahti.kulunut + zoomHetki.zoomLahti.kesto)
      - zoomHetki.zoomLahti.hetki) < 60
    // Sana on jakson loppupuolella: musta virke ja piste ehtivät ensin.
    && zoomHetki.zoomLahti.hetki > zoomHetki.zoomLahti.luenta * 0.55
    /*
     * Pallo on yhä kaukana sillä hetkellä, kun ajo lähtee. Raja on
     * väljä (lähtö 300, maali 2,5): zoomi kestää enää pari sekuntia, ja
     * kontin kehysväli on lähes sekunti — yksi kehys ehtii kulua ennen
     * kuin näytteenotto huomaa lähdön ja pysäyttää ajon.
     */
    && piste.korkeus > 10,
  JSON.stringify({ ...zoomHetki.zoomLahti, korkeus: piste.korkeus, teksti: zoomHetki.teksti }));
await jatkaEsitys();

/* ------------------------------------------------ tauko keskellä avausta */

/*
 * TAUKO PYSÄYTTÄÄ MYÖS ZOOMIN (omistaja 8.9.2026). Kamera-ajo elää
 * laudan omassa silmukassa, joten se on pysäytettävä erikseen —
 * korkeuden on seistävä tauolla ja jatkuttava jatkosta.
 */
const tauolla = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.aikajana.esitys.tauko();
  const lue = () => ({
    ...ui.aikajana.esitys.tila(),
    korkeus: Math.round((ui.pallonInstanssi?.pointOfView?.()?.altitude ?? 0) * 100) / 100,
  });
  const ennen = lue();
  await new Promise((r) => setTimeout(r, 1500));
  const seisoi = lue();
  return {
    ennen, seisoi, nappi: ui.aikajana?.taukoNappi?.textContent ?? null,
  };
});
await s.screenshot({ path: kuva('3-tauko-avauksessa') });
const jatkui = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  const ennen = ui.aikajana.esitys.tila();
  ui.aikajana.esitys.jatka();
  /*
   * JATKON TODISTE MITATAAN VÄLJÄSTI: silmukka on
   * requestAnimationFramessa, ja kontin ohjelmisto-WebGL piirtää pallon
   * noin kehyksen sekunnissa.
   */
  await new Promise((r) => setTimeout(r, 3000));
  const t = ui.aikajana.esitys.tila();
  return {
    ennen: ennen.kulunut,
    jalkeen: t.kulunut,
    jakso: t.jakso,
    ennenJakso: ennen.jakso,
    kaynnissa: t.kaynnissa,
    korkeus: Math.round((ui.pallonInstanssi?.pointOfView?.()?.altitude ?? 0) * 100) / 100,
  };
});
vaadi('TAUKO: lauseet, kello JA zoomi pysähtyvät samasta kohdasta',
  tauolla.ennen.tauolla === true && tauolla.ennen.kaynnissa === false
    && tauolla.nappi === 'Jatka'
    && tauolla.seisoi.kulunut === tauolla.ennen.kulunut
    && tauolla.seisoi.jakso === tauolla.ennen.jakso
    && tauolla.seisoi.korkeus === tauolla.ennen.korkeus
    && jatkui.kaynnissa === true
    && (jatkui.jalkeen > tauolla.ennen.kulunut || jatkui.jakso !== tauolla.ennen.jakso)
    && jatkui.korkeus < tauolla.seisoi.korkeus,
  JSON.stringify({
    kulunut: [tauolla.ennen.kulunut, tauolla.seisoi.kulunut, jatkui.jalkeen],
    korkeus: [tauolla.ennen.korkeus, tauolla.seisoi.korkeus, jatkui.korkeus],
    nappi: tauolla.nappi,
  }));

/* --------------------------------------------------- zoomi puolivälissä */

const puoliHetki = await odotaJaPysayta('avaruusOsuus', '>=', 0.45, 900);
const puolivali = await mittaaPinnat();
await s.screenshot({ path: kuva('4-afrikka-puolivalissa') });
vaadi('ZOOMI: pallo kasvaa pisteestä ja Afrikka pysyy keskellä',
  puoliHetki.osui && puolivali.korkeus < piste.korkeus / 2
    && Math.abs(puolivali.lat) < 10 && Math.abs(puolivali.lng - 17) < 10
    // Lauseet ovat yhä keskellä: afrikka-jakso kuuluu avaukseen.
    && puolivali.keskella === true,
  JSON.stringify({
    osuus: puolivali.avaruusOsuus,
    korkeus: [piste.korkeus, puolivali.korkeus],
    lat: puolivali.lat,
    lng: puolivali.lng,
    jakso: puolivali.jakso,
    keskella: puolivali.keskella,
  }));
await jatkaEsitys();

/* ------------------------------------------------------ 3. valot syttyvät */

/*
 * VALOT VASTA PERILLÄ (8.9.2026). Ennen valot syttyivät 'afrikka'-jakson
 * alkaessa; nyt zoomi jatkuu sen puolelle, ja valot odottavat pallon
 * perille tuloa. Rajaus mitataan siis silloin, kun `pimea` kääntyy
 * epätodeksi — ei jakson vaihtuessa.
 */
const valot = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  let nakyma = null;
  let t = null;
  for (let i = 0; i < 1200; i += 1) {
    t = ui.aikajana?.esitys?.tila() ?? null;
    if (t && t.pimea === false) { nakyma = ui.nakyvaAlue(); break; }
    await new Promise((r) => setTimeout(r, 60));
  }
  const heti = {
    vaihe: t?.vaihe ?? null,
    jakso: t?.jakso ?? null,
    pimea: t?.pimea,
    osuus: t?.avaruusOsuus ?? null,
    leveys: nakyma ? Math.round(nakyma.w) : null,
    keskiX: nakyma ? Math.round(nakyma.x + nakyma.w / 2) : null,
    keskiY: nakyma ? Math.round(nakyma.y + nakyma.h / 2) : null,
    pito: ui.aikajana?.virrat?.tila().pito,
    // Kamera lähtee Marokkoon samalla hetkellä (ALKUANIMAATIO 9.9.2026).
    kohdeajo: t?.kohdeajo ?? null,
  };
  // Musta häipyy 2,6 sekunnissa (VALOJEN_MS) — kuva otetaan sen jälkeen.
  await new Promise((r) => setTimeout(r, 2800));
  /*
   * KUVA OTETAAN TAUOLLA. Kontissa yksi kuvakaappaus maksaa lähes
   * minuutin (ohjelmisto-WebGL, koko ruudun täyttävä pallo), ja
   * käynnissä oleva esitys ehtii sillä välin loppuun asti — mitattu
   * 8.9.2026: seuraava mittaus osui jaksoon 'loppu'.
   */
  ui.aikajana.esitys.tauko();
  return { ...heti, peite: Boolean(document.querySelector('.aikajana-esitys-peite')) };
});
await s.screenshot({ path: kuva('5-valot-afrikkaan') });
/*
 * AFRIKKA TÄYTTÄÄ RUUDUN. Laatikko on laudan yksiköissä keskipisteessä
 * (6400, 3173) ja 2 333 × 2 508 yksikköä; 4 %:n marginaalilla ja
 * näkymän 834 × 1100 kuvasuhteella kamera pyytää noin 2 520 yksikön
 * leveyttä. Väljä haarukka, koska pallon geometria ja laattojen
 * tarkkuusraja saavat siirtää korkeutta kummallekin puolelle.
 */
vaadi('VALOT: musta väistyy vasta kun pallo on rajattuna koko Afrikkaan',
  valot.pimea === false && !valot.peite && heti(valot.vaihe)
    && valot.leveys > 1800 && valot.leveys < 4500
    && Math.abs(valot.keskiX - 6400) < 700 && Math.abs(valot.keskiY - 3173) < 700,
  JSON.stringify(valot));
vaadi('VALOT: vanojen pito kytkeytyy päälle (rintama ei katoa kelauksessa)',
  valot.pito === true, JSON.stringify({ pito: valot.pito }));
/*
 * KAMERA LÄHTEE MAROKKOON SAMALLA HETKELLÄ (Raamattu ALKUANIMAATIO,
 * omistaja 9.9.2026: *"tämän jälkeen kamera saa alkaa hitaasti liikkua
 * kohti ensimmäistä kohdetta marokossa"*). Ajon kesto on aika
 * 'jebel-irhoud'-jakson alkuun, eli useita sekunteja — hidas lähtö,
 * kiihtyvä keskiosa, jarrutus perille.
 */
vaadi('MAROKKO: kamera lähtee ensimmäistä kohdetta kohti heti valojen kanssa',
  Number.isFinite(valot.kohdeajo) && valot.kohdeajo >= 1600,
  JSON.stringify({ kohdeajo: valot.kohdeajo }));

/* --------------------------------- teksti hyppää alas ensimmäisessä kohteessa */

/*
 * ODOTUS, VIIVE JA PYSÄYTYS YHDESSÄ KUTSUSSA. Rivi liukuu keskeltä alas
 * 900 ms:ssä ja uusi kappale tulee näkyviin laskun loppupuolella, joten
 * mittaus on otettava vasta sen jälkeen — mutta kahden erillisen kutsun
 * väliin ehtii kontissa useita jaksoja (mitattu 8.9.2026: mittaus osui
 * jaksoon 'loppu'). Sivun oma silmukka odottaa, nukkuu ja pysäyttää.
 */
const kohdeHetki = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.aikajana.esitys.jatka();
  for (let i = 0; i < 1200; i += 1) {
    const t = ui.aikajana?.esitys?.tila?.();
    if (!t || t.paattynyt) break;
    if (t.jakso === 'jebel-irhoud') {
      await new Promise((r) => setTimeout(r, 1500));
      ui.aikajana.esitys.tauko();
      return { osui: true, ...ui.aikajana.esitys.tila() };
    }
    await new Promise((r) => setTimeout(r, 60));
  }
  return { osui: false, ...(ui.aikajana?.esitys?.tila?.() ?? {}) };
});
const alhaalla = await mittaaPinnat();
await s.screenshot({ path: kuva('6-teksti-alhaalla') });
vaadi('TEKSTI: rivi laskeutuu alalaitaan ensimmäisessä kohteessa',
  kohdeHetki.osui && alhaalla.keskella === false
    && alhaalla.tekstiKeskiY > alhaalla.ruutuKorkeus * 0.7
    && String(alhaalla.teksti ?? '').startsWith('…on löydetty'),
  JSON.stringify({
    jakso: alhaalla.jakso,
    keskella: alhaalla.keskella,
    keskiY: alhaalla.tekstiKeskiY,
    ruutu: alhaalla.ruutuKorkeus,
    kirjasin: alhaalla.kirjasin,
    teksti: String(alhaalla.teksti ?? '').slice(0, 30),
  }));
await jatkaEsitys();

/*
 * VAIN AVAUS (ympäristömuuttuja VAIN_AVAUS=1). Koko esitys kestää
 * kontissa 10–20 minuuttia; avausosan voi ajaa erikseen, kun työn alla
 * on nimenomaan avaus.
 */
if (process.env.VAIN_AVAUS) {
  await selain.close().catch(() => {});
  palvelin.close();
  const kaatui = tulokset.filter((t) => !t.ok);
  console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi (vain avaus). Kaappaukset: ${ULOS}`);
  process.exit(kaatui.length ? 1 : 0);
}

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

/* Odotus ja pysäytys: odotaJaPysayta / jatkaEsitys, ks. avausosa yllä. */

/* 5. KUVA: löytökuva kohteen vieressä. */
const kuvahetki = await odotaJaPysayta('kuvaEsilla', '===', true);
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
if (kuvahetki.osui) await s.screenshot({ path: kuva('7-kuva-kohteen-vieressa') });
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
const hyppyhetki = await odotaJaPysayta('vaihe', '===', 'hyppy', 2400);
if (hyppyhetki.osui) await s.screenshot({ path: kuva('8-aikahyppy') });
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
    /*
     * LOPPUNÄKYMÄ MITATAAN VASTA KUN LIUKU ON PERILLÄ (mittausvirhe,
     * korjattu 7.9.2026): `paata` merkitsee esityksen päättyneeksi
     * ENNEN kuin ajaa loppurajauksen (LOPUN_ASETUS_MS 1,2 s), joten
     * silmukan heti lukema leveys oli kesken liu'un — mitattu 2 254
     * yksikköä, vaikka perillä ollaan yli 3 000:ssa. Odotetaan, että
     * kaksi peräkkäistä lukemaa ovat samat.
     */
    let edellinen = -1;
    for (let i = 0; i < 40; i += 1) {
      const nyt = Math.round(ui.nakyvaAlue().w);
      if (nyt === edellinen) break;
      edellinen = nyt;
      await new Promise((r) => setTimeout(r, 250));
    }
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
      // Aikaselaimen valinta on seurannut esitystä jakso jaksolta.
      selain: ui.aikajana?.aikaselain?.tila?.() ?? null,
    };
  });
  const nayte = await s.evaluate(() => window.__nayte);
  await s.screenshot({ path: kuva('9-loppu-koko-pallo') });

  const jaksot = [...new Set(nayte.map((n) => n.jakso).filter(Boolean))];
  vaadi('MATKA: jaksot etenevät loppuun asti ilman käyttäjän toimia',
    loppu.tila?.paattynyt === true && jaksot.length >= 20,
    `${jaksot.length} jaksoa: ${jaksot.slice(0, 3).join(', ')} … ${jaksot.slice(-2).join(', ')}`);

  // Pisteitä on yhtä monta kuin jaksoja (21 sen jälkeen, kun Blombos
  // lakkasi olemasta oma jaksonsa 8.9.2026).
  vaadi('AIKASELAIN: nauhan valinta seuraa esitystä viimeiseen jaksoon asti',
    loppu.selain?.pisteita === lahto.jaksoja && loppu.selain?.valittu === 'loppu'
      && loppu.selain?.vedossa === false,
    JSON.stringify(loppu.selain && {
      pisteita: loppu.selain.pisteita, valittu: loppu.selain.valittu, vuosi: loppu.selain.vuosi,
    }));

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
   * 2,4 s ja näytteitä otetaan ajastimella, joka kontissa nälkiintyy
   * pallon piirron alle — ramppi voi jäädä kokonaan otosten väliin
   * (mitattuna 7.9.2026: kummatkin näytteet olivat jo perillä,
   * 49 949 ja 49 724).
   *
   * EHTO "hyppyMax > 14500" POISTUI (7.9.2026 ilta, kolme ajoa): se
   * vaati otoksen osumista kelauksen ramppiin, vaikka sama kommentti
   * yllä sanoo rampin voivan jäädä kokonaan näytteiden väliin. Niin
   * kävi: mitattu hyppyMax 14 500 ja euroopanHuippu 45 000 — kelaus
   * meni siis perille asti, mutta väite kaatui mittaukseen. Kelauksen
   * todiste on OR-ehto alla, ja alaraja (>= 14 500) vartioi yhä sen,
   * ettei kello valu kelauksen lähdön alle.
   *
   * KELAUKSEN PERILLE PÄÄSY LUETAAN EUROOPAN JAKSOSTA (7.9.2026 ilta,
   * neljä ajoa). Eurooppa alkaa kaanonin mukaan 45 000:sta ja laskee
   * siitä; sinne ei pääse muuten kuin kelaamalla, sillä ennen hyppyä
   * kello oli 14 500:ssa. Näyte >= 40 000 Euroopan jaksossa on siis
   * kelauksen todiste sellaisenaan.
   *
   * TIUKEMPI EHTO (>= 45 000 kummassa tahansa jaksossa) POISTUI: se
   * osui täsmälleen Euroopan jakson LÄHTÖLUKEMAAN, joten se vaati
   * otoksen osumista jakson ensimmäiseen kehykseen. Neljästä ajosta
   * kolme kaatui siihen, vaikka kelaus oli joka kerta mennyt perille
   * (mitatut huiput: 42 709 · 45 000 · 43 575).
   */
  vaadi('KELLO: lukema etenee 300 000:sta nollaan ja kelaa aikahypyssä taaksepäin',
    alkuLukema > 200000 && (loppu.tila?.vuosia ?? 1e9) < 2000
      && chile.at(-1) === 14500
      && hypyt.length > 0 && Math.min(...hypyt) >= 14500
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
  /*
   * KÄRKI KUVASSA JOKAISESSA JAKSOSSA. Väite koskee niitä näytteitä,
   * joissa vana KASVAA (rintamalla): kelauksen jälkeen piirretty osuus
   * on vanhaa väestöä eikä rintamaa, eikä kameran kuulu seurata sitä.
   * Jaksokohtainen ehto on tiukempi kuin kokonaisosuus: yhdenkin
   * jakson hukkuva kärki (Etelä-Afrikan alkujaksot ennen korjausta)
   * kaataa väitteen, vaikka muut jaksot olisivat kunnossa.
   */
  const rintama = nayte.filter((n) => n.rintamalla && n.karki);
  const jaksoittain = new Map();
  for (const n of rintama) {
    if (!jaksoittain.has(n.jakso)) jaksoittain.set(n.jakso, []);
    jaksoittain.get(n.jakso).push(n);
  }
  /*
   * VÄITE ON "EI HUKU KOKO JAKSOKSI", EI "JOKAISESSA NÄYTTEESSÄ".
   *
   * MITATTU (kontti 7.9.2026): otos on harva — 120 ms:n ajastin
   * nälkiintyy ohjelmisto-WebGL:n alle noin yhteen näytteeseen
   * kolmessa sekunnissa, joten jaksoa kohti tulee vain 2–4
   * rintamanäytettä. Kamera liukuu jakson alussa uuteen rajaukseen
   * 1–2 sekuntia, ja sellaisella otoksella myös jakson VIIMEINEN
   * näyte osuu usein keskelle liukua (intian-rannat 1/3, chile 2/3).
   * Väite on siksi: jokaisessa jaksossa kärki on kuvassa ainakin
   * kerran — juuri se, mikä oli rikki ennen korjausta, jolloin kärki
   * oli 50–65° päässä kohteesta eikä osunut kuvaan KERTAAKAAN koko
   * jakson aikana (ranta, arabia, denisova). Kokonaisosuus on toinen
   * vahti sen varalta, että kärki vilahtaisi kuvassa vain hetken.
   */
  const hukkuneet = [...jaksoittain.entries()]
    .map(([jakso, otos]) => {
      const ruudulla = otos.filter((n) => n.karkiRuudulla).length;
      const vika = otos.at(-1);
      return {
        jakso,
        otos: otos.length,
        ruudulla,
        viimeinen: vika.karkiRuudulla === true,
        // Diagnostiikka: mitä kärkiä kameran rajaus otti mukaan.
        karjet: vika.karjet?.length ?? 0,
        karki: vika.karki ? [Math.round(vika.karki.lat), Math.round(vika.karki.lng)] : null,
      };
    })
    /*
     * YHDEN NÄYTTEEN JAKSO EI OLE TODISTE (7.9.2026 ilta, kolme ajoa).
     * Kun jaksoon osuu vain yksi rintamanäyte, "ainakin kerran kuvassa"
     * kutistuu ehdoksi "juuri se yksi näyte on kuvassa" — juuri se
     * mitä kommentti yllä sanoo vääräksi mitaksi. Mitattu: kaatuja oli
     * eri jakso joka ajolla (siirtyma-afrikka, chauvet), aina otos 1 ja
     * aina kesken jakson alun kameraliu'un. Kokonaisosuus (>= 0,6)
     * vartioi nämä jaksot yhdessä muiden kanssa.
     */
    .filter((r) => r.ruudulla === 0 && r.otos >= 2);
  const osuus = rintama.length ? rintama.filter((n) => n.karkiRuudulla).length / rintama.length : 0;
  vaadi('KÄRKI KUVASSA: kulkevan vanan kärki pysyy ruudulla jokaisessa jaksossa',
    rintama.length >= 20 && jaksoittain.size >= 8 && hukkuneet.length === 0 && osuus >= 0.6,
    JSON.stringify({
      naytteita: rintama.length,
      jaksoja: jaksoittain.size,
      osuus: Number(osuus.toFixed(2)),
      hukkuneet: hukkuneet.slice(0, 5),
    }));

  /* ------------------------------------------------------- 9. purku */

  await s.evaluate(() => {
    document.querySelector('.aikajana-valikko-nappi')?.click();
    document.querySelector('.aikajana-valikko-poistu')?.click();
  });
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
