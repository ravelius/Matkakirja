/*
 * SELAINSAVUKE: LINSSIN LAPPU VÄISTYY KARTAN KOSKETUKSESTA.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-linssin-lappu.mjs
 *
 * OMISTAJA 7.9.2026 ILTA (Ihmisen matkan "Matka päättyy" -kortti,
 * sanatarkasti): *"Tuo lappu saisi hävitä, kun pelaaja alkaa tutkimaan
 * karttaa, tai se saisi vain rullautua ylös piiloon ja otetaan pois
 * tuo suljen nappi siitä ja siirretään se kartan oikeaan yläkulmaan,
 * mistä tämän linssin voi sitten sulkea milloin vain."*
 *
 * MIKSI OMA SAVUKE: yksikkötestit näkevät lähteen (tests/aikajana.mjs
 * lukee luokat ja css:n tekstinä), mutta eivät sitä, TULEEKO pallon
 * veto perille kaappausvaiheeseen, KUTISTUUKO lappu oikeasti ruudulta
 * pois ja jääkö sulkeva ✕ jonkin toisen napin alle puhelimella. Ne
 * mitataan tässä oikealla moottorilla kahdessa näkymässä — tabletti
 * 834 × 1100 (omistajan iPad-kaappauksen kokoluokka) ja puhelin
 * 390 × 844 (talon ahtain ruutu).
 *
 * VÄITTEET (kummassakin näkymässä):
 *   1. Ihmisen matka ajetaan loppuun asti ja loppulappu on ruudulla.
 *   2. LAPUSSA EI OLE SULJE-NAPPIA: nappirivillä on vain "Katso löydöt".
 *   3. PALLON VETO PIILOTTAA LAPUN: veto kartalla (pointerdown →
 *      liike → ylös) rullaa lapun ylös — laatikon näkyvä korkeus on
 *      alle 5 % entisestä ja `visibility` on `hidden` — ja otsikko-
 *      riviin ilmestyy kahva, jonka nimi on "Matka päättyy" ja merkki
 *      ▾ (kapealla ruudulla nimi on vain aria-labelissa).
 *   4. KAHVA TUO LAPUN TAKAISIN: napautus palauttaa lapun täyteen
 *      mittaansa ja kahva katoaa palkista.
 *   5. RULLA (wheel) PIILOTTAA MYÖS: sama väistyminen zoomatessa.
 *   6. ✕ ON KARTAN OIKEASSA YLÄKULMASSA: kartta-alueen oikeassa
 *      neljänneksessä ylhäällä, osumapinta ≥ 44 × 44 px, EIKÄ SE OSU
 *      YHTEENKÄÄN toiseen kartan päällä olevaan nappiin.
 *   7. ✕ SULKEE LINSSIN: ui.aikajana null, kello ja valot poissa.
 *   8. Ei sivuvirheitä.
 *
 * KUVAT (KAAPPAUKSET-kansio): loppulappu, lappu rullattuna (kahva
 * näkyvissä), lappu palautettuna ja kartan oikea yläkulma lähikuvana.
 *
 * TAHTI: sama kikka kuin savuke-aikajanassa — palvelin kirjoittaa
 * js/aikajana.js:n vakiot nopeiksi, jotta 300 000 vuoden kaari ehtii
 * ajaa läpi kontin ohjelmisto-WebGL:llä (pallo piirtyy noin kehyksen
 * sekunnissa). Kuvahetkiä ei pysäytellä: tämä savuke ei mittaa
 * kameraa vaan lappua, ja kamera on savuke-aikajanan vartiossa.
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
  let sisalto = readFileSync(polku);
  // Nopeutettu tahti (ks. tiedoston alku): kaari läpi minuuteissa.
  if (suhteellinen === 'js/aikajana.js') {
    sisalto = String(sisalto)
      .replace('export const AIKAJANA_VUOSI_MS = 260;', 'export const AIKAJANA_VUOSI_MS = 4;')
      .replace('export const AIKAJANA_VIIVE_MS = 4600;', 'export const AIKAJANA_VIIVE_MS = 400;')
      .replace('export const AIKAJANA_PAALU_MS = 3200;', 'export const AIKAJANA_PAALU_MS = 40;')
      .replace('export const LUENNAN_PISIN_MS = 14000;', 'export const LUENNAN_PISIN_MS = 200;');
  }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
await new Promise((r) => palvelin.listen(8752, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/*
 * NÄKYMÄT: tabletti on omistajan kaappauksen kokoluokka (834 × 1100,
 * jossa lappu ja sen Sulje-nappi nähtiin), puhelin talon ahtain ruutu.
 */
const NAKYMAT = {
  tabletti: { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
};
/*
 * `--nakyma puhelin` ajaa vain yhden näkymän. Oletus on molemmat: yksi
 * kaari kestää kontissa noin puolitoista minuuttia, ja omistaja arvioi
 * kulman kummastakin. Vipu on kehitystä varten (yhden korjauksen
 * uusinta), ei ohitusta varten — portti ajaa savukkeen ilman sitä.
 */
const VALITTU = process.argv[process.argv.indexOf('--nakyma') + 1];
const AJETTAVAT = NAKYMAT[VALITTU] ? [VALITTU] : ['tabletti', 'puhelin'];

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virhelista) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const uusi = await konteksti.newPage();
  await uusi.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await uusi.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  uusi.on('pageerror', (e) => virhelista.push(String(e)));
  return { konteksti, sivu: uusi };
}

/** Peli auki pallolaudalle Ateenaan (sama avaus kuin savuke-aikajanassa). */
async function avaaPeli(kohde) {
  await kohde.goto('http://127.0.0.1:8752/index.html?lauta=pallo', { waitUntil: 'load' });
  await kohde.waitForTimeout(2500);
  await kohde.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await kohde.waitForTimeout(2500);
  await kohde.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await kohde.waitForTimeout(1200);
  const pallo = await kohde.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await kohde.waitForTimeout(1500);
  return pallo;
}

/** Lapun mitta ruudulla: näkyvä korkeus, luokka ja kahvan tila. */
const LUE_LAPPU = () => {
  const lappu = document.querySelector('.aikajana-ilmio');
  const kahva = document.querySelector('.aikajana-kahva');
  const r = lappu?.getBoundingClientRect();
  return {
    on: Boolean(lappu),
    piilossa: Boolean(lappu?.classList.contains('piilossa')),
    korkeus: r ? Math.round(r.height) : 0,
    nakyvyys: lappu ? getComputedStyle(lappu).visibility : null,
    kahvaNakyy: Boolean(kahva) && !kahva.hidden,
    // Näkyvä teksti kutistuu kapealla ruudulla pelkäksi nuoleksi, joten
    // nimi luetaan saavutettavasta nimestä (aria-label).
    kahvanTeksti: kahva?.textContent ?? '',
    kahvanNimi: kahva?.getAttribute('aria-label') ?? '',
    napit: [...document.querySelectorAll('.aikajana-loppunappi')].map((n) => n.textContent),
  };
};

/**
 * LAPPU LUETAAN VASTA KUN LIUKU ON PERILLÄ. Rullaus on 300 ms:n
 * CSS-siirtymä, mutta kontin ohjelmisto-WebGL piirtää pallon noin
 * kehyksen sekunnissa — siirtymä etenee vain kehyksissä, joten
 * kiinteä odotus lukisi lapun kesken matkan (mitattu 7.9.2026:
 * takaisin auetessa 700 ms:n jälkeen korkeus oli yhä 5 px). Sama
 * kaava kuin savuke-aikajanan `rauhoitu`: luetaan kunnes ehto täyttyy
 * tai katto tulee vastaan, ja tulos kertoo kumpi.
 */
async function lueLappuKunnes(kohde, ehto, kierroksia = 40) {
  let tila = await kohde.evaluate(LUE_LAPPU);
  for (let i = 0; i < kierroksia && !ehto(tila); i += 1) {
    await kohde.waitForTimeout(300);
    tila = await kohde.evaluate(LUE_LAPPU);
  }
  return tila;
}

/**
 * KUVA EI SAA KAATAA VARTIOTA. Kontissa pallo piirtyy noin kehyksen
 * sekunnissa ja rinnakkaiset savukeajot vievät loput: page.screenshot
 * ylitti 30 s:n oletuskaton kesken puhelinajon 7.9.2026. Kuvat ovat
 * omistajalle, väitteet on jo luettu DOMista — jäänyt kuva kirjataan
 * INFO-rivinä eikä keskeytä ajoa.
 */
async function kaappaa(kohde, polku, rajaus = null) {
  try {
    await kohde.screenshot(rajaus ? { path: polku, clip: rajaus, timeout: 120000 } : { path: polku, timeout: 120000 });
    return true;
  } catch (virhe) {
    console.log(`INFO  kuva jäi ottamatta (${polku}): ${String(virhe).split('\n')[0]}`);
    return false;
  }
}

/**
 * Kartan piste, jossa ei ole linssin omaa kalustoa: haetaan ruudulta
 * ylhäältä alas, ja ensimmäinen kohta, jonka `elementFromPoint` ei
 * osoita `.aikajana`-juuren sisälle, kelpaa vedon aloituspisteeksi.
 */
const ETSI_KARTTAPISTE = () => {
  const juuri = document.querySelector('.aikajana');
  const pane = document.querySelector('.map-pane');
  if (!juuri || !pane) return null;
  const r = pane.getBoundingClientRect();
  for (const osuusY of [0.5, 0.42, 0.58, 0.35, 0.65]) {
    for (const osuusX of [0.22, 0.3, 0.5, 0.15]) {
      const x = Math.round(r.left + r.width * osuusX);
      const y = Math.round(r.top + r.height * osuusY);
      const kohde = document.elementFromPoint(x, y);
      if (kohde && !juuri.contains(kohde)) return { x, y, tunnus: kohde.className || kohde.tagName };
    }
  }
  return null;
};

for (const nakyma of AJETTAVAT) {
  const virhelista = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakyma], virhelista);
  const kuva = (tunnus) => join(ULOS, `savuke-linssin-lappu-${nakyma}-${tunnus}.png`);
  const nimessa = (teksti) => `${teksti} (${nakyma})`;

  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, pallo ? '' : 'ui.pallolauta ei syntynyt 45 s:ssa');

  /* Linssi laukusta ja vanat valmiiksi ennen Käynnistä-nappia. */
  const lahto = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) {
      if (ui.aikajana) break;
      await new Promise((r) => setTimeout(r, 25));
    }
    const ajo = ui.aikajana;
    if (!ajo?.virrat) return { aikajana: Boolean(ajo) };
    await ajo.virrat.valmis;
    return { aikajana: true, avausnappi: Boolean(document.querySelector('.aikajana-avaus-nappi')) };
  });
  vaadi(nimessa('Ihmisen matka käynnistyy laukusta'), Boolean(lahto.aikajana && lahto.avausnappi),
    JSON.stringify(lahto));

  /* 1. Kaari läpi loppuun asti (välinäytökset jatketaan kuten pelaaja). */
  await s.evaluate(() => { document.querySelector('.aikajana-avaus-nappi')?.click(); });
  const alkoi = Date.now();
  let paattyi = false;
  while (Date.now() - alkoi < 420000) {
    const tila = await s.evaluate(() => {
      const ajo = window.matkakirja.ui.aikajana;
      if (!ajo) return null;
      if (ajo.valinaytos) ajo.jatkaValinaytoksesta();
      return { loppu: Boolean(ajo.loppu) };
    });
    if (!tila) break;
    if (tila.loppu) { paattyi = true; break; }
    await s.waitForTimeout(250);
  }
  const loppu = await lueLappuKunnes(s, (t) => t.on && !t.piilossa && t.korkeus > 60);
  await kaappaa(s, kuva('loppulappu'));
  vaadi(nimessa('esitys päättyy ja loppulappu on ruudulla'),
    paattyi && loppu.on && !loppu.piilossa && loppu.korkeus > 60 && loppu.nakyvyys === 'visible'
      && !loppu.kahvaNakyy,
    `${((Date.now() - alkoi) / 1000).toFixed(1)} s, ${JSON.stringify(loppu)}`);

  /* 2. Lapussa vain "Katso löydöt" — Sulje-nappi on poistettu. */
  vaadi(nimessa('loppulapussa on vain Katso löydöt, ei Sulje-nappia'),
    loppu.napit.length === 1 && loppu.napit[0] === 'Katso löydöt',
    JSON.stringify(loppu.napit));

  /* 3. Pallon veto rullaa lapun ylös ja tuo kahvan palkkiin. */
  const piste = await s.evaluate(ETSI_KARTTAPISTE);
  vaadi(nimessa('kartalta löytyy piste linssin kaluston ulkopuolelta'), Boolean(piste),
    JSON.stringify(piste));
  if (piste) {
    await s.mouse.move(piste.x, piste.y);
    await s.mouse.down();
    for (let i = 1; i <= 6; i += 1) await s.mouse.move(piste.x + i * 12, piste.y + i * 4);
    await s.mouse.up();
  }
  const vedonJalkeen = await lueLappuKunnes(s, (t) => t.piilossa && t.korkeus < 10);
  await kaappaa(s, kuva('lappu-rullattuna'));
  vaadi(nimessa('pallon veto rullaa lapun ylös piiloon ja kahva ilmestyy palkkiin'),
    vedonJalkeen.piilossa && vedonJalkeen.nakyvyys === 'hidden'
      && vedonJalkeen.korkeus < Math.max(8, loppu.korkeus * 0.05)
      && vedonJalkeen.kahvaNakyy && /Matka päättyy/.test(vedonJalkeen.kahvanNimi)
      && vedonJalkeen.kahvanTeksti.includes('▾'),
    `${JSON.stringify(vedonJalkeen)} (lappu oli ${loppu.korkeus} px)`);

  /* 4. Kahva tuo lapun takaisin. */
  await s.evaluate(() => { document.querySelector('.aikajana-kahva')?.click(); });
  const paluu = await lueLappuKunnes(s, (t) => !t.piilossa && t.korkeus > 60);
  await kaappaa(s, kuva('lappu-palautettuna'));
  vaadi(nimessa('kahvan napautus tuo lapun takaisin ja kahva katoaa'),
    !paluu.piilossa && paluu.nakyvyys === 'visible' && paluu.korkeus > 60 && !paluu.kahvaNakyy,
    JSON.stringify(paluu));

  /* 5. Rullan zoomi piilottaa saman lapun. */
  if (piste) {
    await s.mouse.move(piste.x, piste.y);
    await s.mouse.wheel(0, -240);
  }
  const rullanJalkeen = await lueLappuKunnes(s, (t) => t.piilossa && t.korkeus < 10);
  vaadi(nimessa('kartan rulla (zoomi) rullaa lapun ylös piiloon'),
    rullanJalkeen.piilossa && rullanJalkeen.kahvaNakyy,
    JSON.stringify(rullanJalkeen));

  /*
   * 6. ✕ kartan oikeassa yläkulmassa: kartta-alueen oikeassa
   * neljänneksessä ylhäällä, 44 px osumapinta, eikä osu yhteenkään
   * toiseen kartan päällä olevaan nappiin (päällekkäisyys on juuri se,
   * mitä omistaja ei näe ennen kuin sormi osuu väärään).
   */
  const kulma = await s.evaluate(() => {
    const x = document.querySelector('.aikajana-sulje');
    const pane = document.querySelector('.map-pane');
    if (!x || !pane) return null;
    const r = x.getBoundingClientRect();
    const p = pane.getBoundingClientRect();
    /*
     * PÄÄLLEKKÄISYYS LASKETAAN VAIN NÄKYVISTÄ JA PAINETTAVISTA
     * NAPEISTA. Kartan oikeassa yläkulmassa asuu myös karttaselitteen
     * nappi (`.karttaselite`, css/styles.css), mutta linssin ajan se on
     * `opacity: 0; pointer-events: none` — sitä ei näe eikä siihen voi
     * osua, joten se ei ole päällekkäisyys vaan pelkkä laatikko. Muut
     * piilotustavat (`hidden`, `display`, `visibility`) karsitaan
     * samalla; ohitetut kerrotaan `ohitettu`-kentässä, jottei vartio
     * vaikene väärästä syystä.
     */
    const laatikot = [...document.querySelectorAll('.map-pane button, .map-pane [role="button"]')]
      .filter((n) => n !== x && !n.hidden && n.getBoundingClientRect().width > 0)
      .filter((n) => {
        const b = n.getBoundingClientRect();
        return b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top;
      });
    const nakyva = (n) => {
      const t = getComputedStyle(n);
      return t.visibility !== 'hidden' && t.display !== 'none'
        && Number(t.opacity) > 0.05 && t.pointerEvents !== 'none';
    };
    const osuu = laatikot.filter(nakyva).map((n) => n.className || n.tagName);
    const ohitettu = laatikot.filter((n) => !nakyva(n)).map((n) => n.className || n.tagName);
    return {
      leveys: Math.round(r.width),
      korkeus: Math.round(r.height),
      oikealla: Number(((r.left - p.left) / p.width).toFixed(3)),
      ylhaalla: Number(((r.top - p.top) / p.height).toFixed(3)),
      marginaaliOikealta: Math.round(p.right - r.right),
      ohitettu,
      osuu,
    };
  });
  const kulmakuva = kulma ? {
    x: Math.max(0, NAKYMAT[nakyma].viewport.width - 200), y: 0, width: 200, height: 200,
  } : null;
  if (kulmakuva) await kaappaa(s, kuva('oikea-ylakulma'), kulmakuva);
  vaadi(nimessa('sulkeva ✕ on kartan oikeassa yläkulmassa, 44 px ala, ei päällekkäin muiden nappien kanssa'),
    Boolean(kulma) && kulma.leveys >= 44 && kulma.korkeus >= 44
      && kulma.oikealla > 0.7 && kulma.ylhaalla < 0.12 && kulma.marginaaliOikealta >= 0
      && kulma.osuu.length === 0,
    JSON.stringify(kulma));

  /* 7. ✕ sulkee linssin milloin vain (myös lappu rullattuna). */
  const sulku = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.aikajana-sulje')?.click();
    for (let i = 0; i < 80; i += 1) {
      if (!ui.aikajana && !document.querySelectorAll('.aikajana-valo').length) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    return {
      aikajana: Boolean(ui.aikajana),
      kello: document.querySelectorAll('.aikajana-kello').length,
      valot: document.querySelectorAll('.aikajana-valo').length,
      luokka: document.body.classList.contains('aikajana-paalla'),
      pallolinssi: ui.pallolinssi?.tunnus ?? null,
    };
  });
  vaadi(nimessa('✕ sulkee linssin: kello, valot ja pallolinssi pois'),
    !sulku.aikajana && sulku.kello === 0 && sulku.valot === 0 && !sulku.luokka
      && sulku.pallolinssi === null,
    JSON.stringify(sulku));

  vaadi(nimessa('ei sivuvirheitä'), virhelista.length === 0, virhelista.join(' | ').slice(0, 300));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
