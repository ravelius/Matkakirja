/*
 * SELAINSAVUKE: IHMISEN MATKA — PULU POIS, LYHYET KAPPALEET, HITAAMPI
 * MAAPALLON ZOOM.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-ihmisen-kappaleet.mjs
 *
 * OMISTAJA 16.9.2026 klo 15.40 UTC (kaksi iPhone-kuvaa avaruusvaiheen
 * jälkeen, 95 521 ja 81 675 v. sitten), sanatarkasti: *"Ota pulu pois
 * näkyvistä ja ota simpukka kommentti pois kokonaan. Pulu näkyviin
 * vasta kun linssin animaatio on ohi. Tee tekstityksestä lyhyempiä
 * kappaleita, että ei mene niin paljon kartan päälle."* — ja saman
 * päivän JATKO 3: *"Zoomaa maapallo hitaammin näkymään. Aloita
 * nykyisestä hetkestä mutta zoomaus voi valmistua viisi sekuntia
 * myöhemmin. … Pienen tauon jälkeen kartta voisi hyvin hitaasti alkaa
 * zoomata jo kohti Marokkoa ja alkaa kiihtyä…"*
 *
 * MIKSI OMA SAVUKE. savuke-ihmisen-kehys.mjs mittaa kehyksen paluun
 * avaruusvaiheessa (0–20 s). Tässä katsotaan koko esityksen mittaa:
 * pulun näkyvyys, tekstilaatikon korkeus JOKAISESSA näytetyssä osassa
 * ja kameran korkeuden aikasarja.
 *
 * VÄITTEET (390 × 844 ja 1400 × 900):
 *   1. PULU EI NÄY ESITYKSEN AIKANA. Sarjassa (3 s:n välein mustasta
 *      kartta-animaatioon) jokainen näyte kertoo pulun napin,
 *      paneelin ja kasvokankaan olevan `visibility: hidden` ja
 *      body-luokan `aikajana-pulu-piilossa` olevan päällä. Näytteitä
 *      vähintään viisi.
 *   1b. PULU TULEE LOPUSSA. Aikaselaimesta hypätään viimeiseen
 *      jaksoon; kun esitys päättyy, pulu kävelee ruudulle ja on
 *      mitattavissa näkyvänä.
 *   1c. VASTAKOE: kun piiloluokka otetaan käsin pois kesken esityksen,
 *      pulu on heti näkyvissä — eli mitta osoittaa oikeaa asiaa.
 *   1d. PLUSKUPLA (.pollo-kuplapalautus) on samassa nipussa: se on
 *      `position: fixed` -nappi BODYN suorana lapsena, ja se jäi
 *      omistajan puhelimella kellumaan esityksen päälle. Mitataan
 *      `visibility` ja `pointer-events` — ja vastakokeena sama nappi
 *      ilman piiloluokkaa.
 *   2. SIMPUKKAVIRKE EI OLE DOMISSA missään esityksen kohdassa
 *      ('arabia'-jakso mukaan lukien): ei "simpukanku", ei "okraa
 *      punaiseksi".
 *   3. LAATIKKO ON MATALA. Jokaisen kaanonin osan teksti ladotaan
 *      oikeaan laatikkoon oikealla ruudulla, ja mitattu korkeus on
 *      enintään 30 % kartan korkeudesta. 390 px on se mitta, jonka
 *      omistaja näki (kuvissa laatikko vei ~45 %).
 *   3b. VASTAKOE: koko kappale yhtenä laatikkona (vanha käytös) on
 *      selvästi korkeampi — pisin kappale ylittää rajan.
 *   4. ZOOMI KESTÄÄ VIISI SEKUNTIA PIDEMPÄÄN. Esityksen omista
 *      mittareista luettu `avauksenVaiheet` kertoo `zoomKesto`n
 *      olevan vähintään vanha (`zoomPerus`) + 4 000 ms.
 *   5. KAMERAN KÄYRÄ (vain 390 px, ks. KAMERASARJA_LEVEYDET). Zoomin
 *      aikasarjassa korkeus laskee monotonisesti eikä siinä ole
 *      tasannetta; tasanne on vain zoomin jälkeisessä tauossa, jonka
 *      esitys kertoo lipulla `kohdeajoOdottaa`. Marokon ajon
 *      ensimmäisellä kolmanneksella kuljetaan alle neljännes matkasta
 *      — ja aina eteenpäin.
 *   6. MAROKON SAAPUMINEN EI MYÖHÄSTY: kamera on maalissa viimeistään
 *      silloin, kun 'jebel-irhoud'-jakso alkaa (ajon päätepiste on
 *      kohteeseenAsti, jota zoomin jatko ja tauko vain lyhentävät).
 *   7. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET-kansio):
 *   savuke-ihmisen-kappaleet-<leveys>.jpg       Arabia-kohta, ei pulua
 *   savuke-ihmisen-kappaleet-vastakoe-<leveys>.png  koko kappale kerralla
 *   savuke-ihmisen-kappaleet-<leveys>.json      sarjat ja mitat
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const JUURI = join(import.meta.dirname, '..', '..');
const PORTTI = 8766;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/** Hiljaisuus WAV:na — ämpärissä ei ole kertomusluentoja (ks. esityssavuke). */
function hiljaisuusWav(sekunteja = 3, hz = 8000) {
  const tavuja = hz * sekunteja * 2;
  const p = Buffer.alloc(44 + tavuja);
  p.write('RIFF', 0); p.writeUInt32LE(36 + tavuja, 4); p.write('WAVE', 8); p.write('fmt ', 12);
  p.writeUInt32LE(16, 16); p.writeUInt16LE(1, 20); p.writeUInt16LE(1, 22);
  p.writeUInt32LE(hz, 24); p.writeUInt32LE(hz * 2, 28); p.writeUInt16LE(2, 32);
  p.writeUInt16LE(16, 34); p.write('data', 36); p.writeUInt32LE(tavuja, 40);
  return p;
}
const HILJAISUUS = hiljaisuusWav(3);
const HILJAISUUS_AVAUS = hiljaisuusWav(18);

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const virheet = [];
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* Kaanoni ja jakofunktio suoraan lähteestä: savuke mittaa sitä, mitä peli näyttää. */
const { IHMISEN_MATKA_KERTOMUS } = await import(join(JUURI, 'js/linssit/ihmisen-matka-kertomus.js'));
const { jaaOsiin, OSAN_MERKIT } = await import(join(JUURI, 'js/linssit/ihmisen-matka-esitys.js'));
const KAIKKI_OSAT = IHMISEN_MATKA_KERTOMUS.flatMap((j) => jaaOsiin(j.teksti)
  .map((o, i) => ({ jakso: j.id, osa: i, teksti: o.teksti })));
const SIMPUKKA = /simpukanku|okraa punaiseksi|helmiksi/i;
/** Ruudut, joilla kameran aikasarja on tarpeeksi tiheä mitattavaksi. */
const KAMERASARJA_LEVEYDET = [390];
/*
 * VASTAKOKEEN VERTAILUKOHTA: 'arabia'-kappale SELLAISENA kuin se oli
 * ennen 16.9.2026 — simpukkavirke mukana ja koko kappale yhdessä
 * laatikossa. Juuri tämä näkyi omistajan iPhone-kuvassa.
 */
const ARABIA_ENNEN = {
  id: 'arabia (ennen 16.9.)',
  teksti: 'Sitten kului taas pitkä aika. Etelän rannikolla ehdittiin hioa okraa '
    + 'punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin ylitys Arabian '
    + 'niemimaalle onnistui. Silloin Arabia oli vihreä: autiomaan paikalla oli '
    + 'järviä ja ruohoa. Yhden järven rannalta on löydetty yksi ainoa sormiluu. '
    + 'Se riittää todisteeksi. Tästä ihmiset lähtivät kohti Aasiaa, eivätkä enää '
    + 'palanneet.',
};

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

/** Sivu pystyyn yhdelle näkymälle: samat reitit kuin kehyssavukkeella. */
async function avaaSivu(leveys, korkeus) {
  const konteksti = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(`${leveys}px: ${e}`));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
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
  return { s, konteksti };
}

/** Peli auki, pelaaja Ateenaan, pallolauta pystyyn ja linssi laukusta. */
async function avaaLinssi(s) {
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
  const lahto = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) { if (ui.aikajana) break; await new Promise((r) => setTimeout(r, 25)); }
    const ajo = ui.aikajana;
    if (!ajo?.virrat) return { ok: false };
    await ajo.virrat.valmis;
    return { ok: true, vanoja: ajo.virrat.tila().vanoja };
  });
  return { pallo, lahto };
}

/** Yksi näyte: pulun näkyvyys, teksti ruudulla, kameran korkeus. */
const NAYTE = () => {
  const juuri = document.querySelector('.aikajana');
  const nappi = document.querySelector('.pollo-nappi');
  const paneeli = document.querySelector('.pollo-paneeli');
  const kasvot = document.querySelector('.livia-kasvot-pinta');
  // Pluskupla: position:fixed -nappi bodyn suorana lapsena (js/pollo.js).
  const kupla = document.querySelector('.pollo-kuplapalautus');
  const laatikko = juuri?.querySelector('.aikajana-kertomusteksti-sisus');
  const rivi = juuri?.querySelector('.aikajana-kertomusteksti');
  const nakyy = (el) => (el ? getComputedStyle(el).visibility !== 'hidden' : null);
  const laatikonRuutu = laatikko?.getBoundingClientRect();
  const karttaRuutu = juuri?.getBoundingClientRect();
  const t = window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? {};
  const pov = window.matkakirja.ui.pallolauta?.pallo?.pointOfView?.() ?? null;
  return {
    piiloluokka: document.body.classList.contains('aikajana-pulu-piilossa'),
    puluNappi: nakyy(nappi),
    puluPaneeli: nakyy(paneeli),
    puluKasvot: nakyy(kasvot),
    puluKupla: kupla ? nakyy(kupla) : null,
    // Pulu on NÄKYVISSÄ vain, jos nappi on olemassa eikä ole piilotettu.
    puluNakyy: Boolean(nappi) && nakyy(nappi) === true,
    teksti: laatikko?.textContent ?? '',
    tekstiNakyy: Boolean(laatikko && Number(getComputedStyle(laatikko).opacity) > 0.05
      && Number(getComputedStyle(rivi).opacity) > 0.05),
    laatikko: laatikonRuutu ? Math.round(laatikonRuutu.height) : 0,
    kartta: karttaRuutu ? Math.round(karttaRuutu.height) : 0,
    jakso: t.jakso ?? null,
    vaihe: t.vaihe ?? null,
    paattynyt: Boolean(t.paattynyt),
    puluPiilossa: Boolean(t.puluPiilossa),
    puluTullut: Boolean(t.puluTullut),
    kohdeajoOdottaa: Boolean(t.kohdeajoOdottaa),
    kohdeajo: t.kohdeajo ?? null,
    vaiheet: t.avauksenVaiheet ?? null,
    alt: pov ? +pov.altitude.toFixed(4) : null,
    lat: pov ? +pov.lat.toFixed(3) : null,
    lng: pov ? +pov.lng.toFixed(3) : null,
  };
};

async function mittaa(leveys, korkeus) {
  const { s, konteksti } = await avaaSivu(leveys, korkeus);
  const { pallo, lahto } = await avaaLinssi(s);
  vaadi(`${leveys}px: linssi laukusta, vanat valmiina`, pallo && lahto.ok && lahto.vanoja >= 15, JSON.stringify(lahto));
  if (!pallo || !lahto.ok) { await konteksti.close(); return null; }

  /*
   * KAMERAN AIKASARJA SIVUN SISÄLLÄ. Jokainen evaluate maksaa kontissa
   * oman aikansa, joten 250 ms:n näytteenotto ei onnistuisi
   * evaluate-silmukalla: sarja kerätään sivulla omalla ajastimellaan ja
   * luetaan kerralla ulos.
   */
  await s.evaluate(() => {
    window.__kamerasarja = [];
    const t0 = performance.now();
    window.__kameravahti = setInterval(() => {
      const pov = window.matkakirja.ui.pallolauta?.pallo?.pointOfView?.();
      const t = window.matkakirja.ui.aikajana?.esitys?.tila?.() ?? {};
      if (!pov) return;
      window.__kamerasarja.push({
        ms: Math.round(performance.now() - t0),
        alt: +pov.altitude.toFixed(4),
        lat: +pov.lat.toFixed(3),
        lng: +pov.lng.toFixed(3),
        jakso: t.jakso ?? null,
        odottaa: Boolean(t.kohdeajoOdottaa),
        vaiheet: t.avauksenVaiheet ?? null,
        kohdeajo: t.kohdeajo ?? null,
      });
    }, 250);
  });

  /* Käynnistä-nappi: musta ruutu, avausluenta, avaruusvaihe. */
  await s.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());

  /* --- 1. PULU POISSA: näytteet 3 s:n välein koko alkuesityksen ajan --- */
  const sarja = [];
  for (let n = 0; n < 12; n += 1) {
    sarja.push(await s.evaluate(NAYTE));
    if (sarja[sarja.length - 1].paattynyt) break;
    await s.waitForTimeout(3000);
  }
  const kamerasarja = await s.evaluate(() => {
    clearInterval(window.__kameravahti);
    return window.__kamerasarja;
  });

  const esityksessa = sarja.filter((r) => !r.paattynyt);
  const vuotaa = esityksessa.filter((r) => r.puluNakyy || !r.piiloluokka
    || r.puluPiilossa !== true || r.puluKupla === true);
  vaadi(`${leveys}px: pulu ei näy kertaakaan esityksen aikana (${esityksessa.length} näytettä)`,
    esityksessa.length >= 5 && vuotaa.length === 0,
    JSON.stringify({ naytteita: esityksessa.length, vuotoja: vuotaa.length, vuoto: vuotaa.slice(0, 2) }));

  /*
   * 1d. PLUSKUPLA ON SAMASSA NIPUSSA (omistaja 16.9.2026, puhelimella).
   * `.pollo-kuplapalautus` syntyy js/pollo.js:ssä vasta, kun pelaaja on
   * sulkenut puhekuplan — savuke ei voi luottaa siihen, että niin on
   * käynyt, joten jos nappia ei ole, tehdään koekappale samalla
   * luokalla. Juuri sitä CSS-sääntö katsoo. Vastakoe samassa mitassa:
   * ilman piiloluokkaa sama nappi on näkyvissä.
   */
  const pluskupla = await s.evaluate(() => {
    const oma = document.querySelector('.pollo-kuplapalautus');
    const el = oma ?? document.createElement('button');
    if (!oma) {
      el.className = 'pollo-kuplapalautus';
      el.textContent = '+';
      document.body.appendChild(el);
    }
    const lue = () => {
      const t = getComputedStyle(el);
      return { nakyvyys: t.visibility, osoitin: t.pointerEvents };
    };
    const piilossa = lue();
    document.body.classList.remove('aikajana-pulu-piilossa');
    const paljaana = lue();
    document.body.classList.add('aikajana-pulu-piilossa');
    if (!oma) el.remove();
    return { oliValmiina: Boolean(oma), piilossa, paljaana };
  });
  vaadi(`${leveys}px: pulun pluskupla on piilossa esityksen aikana (ja näkyy ilman luokkaa)`,
    pluskupla.piilossa.nakyvyys === 'hidden' && pluskupla.piilossa.osoitin === 'none'
      && pluskupla.paljaana.nakyvyys === 'visible',
    JSON.stringify(pluskupla));

  /* --- 2. SIMPUKKAVIRKE EI OLE DOMISSA --- */
  const simpukkaSarjassa = sarja.filter((r) => SIMPUKKA.test(r.teksti));
  vaadi(`${leveys}px: simpukkavirke ei ole ruudulla missään näytteessä`,
    simpukkaSarjassa.length === 0, JSON.stringify(simpukkaSarjassa.map((r) => r.teksti)));

  /* --- 4–6. KAMERA: zoomin kesto, tasainen lasku, saapumishetki --- */
  const vaiheet = kamerasarja.map((r) => r.vaiheet).find(Boolean) ?? null;
  vaadi(`${leveys}px: zoomi kestää vähintään neljä sekuntia entistä pidempään`,
    Boolean(vaiheet) && vaiheet.zoomKesto >= vaiheet.zoomPerus + 4000,
    JSON.stringify(vaiheet));

  /*
   * KAMERAN AIKASARJA KOLMEEN OSAAN. Marokon ajo alkaa siitä
   * näytteestä, jossa `kohdeajo` (ajon kesto) ilmestyy mittareihin;
   * sitä ennen on zoomi ja sen jälkeinen pieni tauko, jonka esitys
   * kertoo lipulla `kohdeajoOdottaa`.
   *
   * KORKEUS ON LOGARITMINEN SUURE: pallo lähtee lukemasta 300
   * (AVARUUDEN_KORKEUS) ja päätyy noin 0,14:ään. Siksi vertailut ovat
   * SUHTEELLISIA — absoluuttinen 0,02:n toleranssi olisi lähdössä
   * olematon ja lopussa valtava.
   */
  const lasku = kamerasarja.filter((r) => Number.isFinite(r.alt));
  const ajonAlku = lasku.findIndex((r) => Number.isFinite(r.kohdeajo) && r.kohdeajo > 0);
  const ennenAjoa = ajonAlku > 0 ? lasku.slice(0, ajonAlku) : lasku;
  const ajossa = ajonAlku > 0 ? lasku.slice(ajonAlku) : [];

  /*
   * AIKASARJAN MITTAUS VAIN KAPEALLA RUUDULLA. 1400 px:n
   * ohjelmisto-WebGL vie kontin pääsäikeen niin tiukasti, että 250 ms:n
   * näytteenotto venyy 2–3 sekuntiin: mitattuna zoomista saatiin neljä
   * näytettä ja 1,2 sekunnin tauosta ei yhtäkään, eikä Marokon ajo
   * ehtinyt sarjaan lainkaan. Leveällä ruudulla mitataan siis mallin
   * luvut (zoomin kesto yllä), pulu ja laatikoiden korkeudet — kameran
   * KÄYRÄ mitataan siellä, missä omistajakin sen näki.
   */
  if (!KAMERASARJA_LEVEYDET.includes(leveys)) {
    console.log(`      (kameran aikasarja mitataan vain ${KAMERASARJA_LEVEYDET.join(', ')} px:llä — `
      + `tässä ${lasku.length} näytettä ${Math.round((lasku.at(-1)?.ms ?? 0) / 1000)} sekunnissa)`);
  } else {
  /*
   * ZOOMI LASKEE TASAISESTI. Zoomin katsotaan alkaneen siitä
   * näytteestä, jossa korkeus on ensi kertaa alle lähtökorkeuden: sitä
   * ennen ruutu on musta ja tähtitaivas, ja pallo seisoo paikallaan
   * täysin oikeutetusti.
   */
  const alkuKorkeus = lasku[0]?.alt ?? 0;
  const zoomAlkoi = ennenAjoa.findIndex((r) => r.alt < alkuKorkeus * 0.999);
  const zoomissa = zoomAlkoi >= 0 ? ennenAjoa.slice(zoomAlkoi) : [];
  const nousut = zoomissa.filter((r, i) => i > 0 && r.alt > zoomissa[i - 1].alt * 1.01);
  vaadi(`${leveys}px: maapallon zoomi laskee tasaisesti, ei nousuja (${zoomissa.length} näytettä)`,
    zoomissa.length >= 4 && nousut.length === 0
      && zoomissa[0].alt > zoomissa.at(-1).alt * 100,
    JSON.stringify({
      naytteita: zoomissa.length, nousuja: nousut.length,
      alku: zoomissa[0]?.alt ?? null, loppu: zoomissa.at(-1)?.alt ?? null,
      kestoMs: zoomissa.length ? zoomissa.at(-1).ms - zoomissa[0].ms : null,
    }));

  /*
   * ZOOMIN AIKANA EI OLE TASANNETTA, TAUON AIKANA ON. Tauko luetaan
   * esityksen omasta lipusta (`kohdeajoOdottaa`), joten mitta ei nojaa
   * kontin kehystahtiin. Zoomin aikana korkeus muuttuu joka
   * näytteessä — ei kolmea peräkkäistä samaa lukemaa.
   */
  const taukoNaytteet = lasku.filter((r) => r.odottaa === true);
  const seisoo = zoomissa.filter((r, i) => i >= 2 && !r.odottaa
    && Math.abs(r.alt - zoomissa[i - 1].alt) < zoomissa[i - 1].alt * 0.001
    && Math.abs(r.alt - zoomissa[i - 2].alt) < zoomissa[i - 2].alt * 0.001);
  vaadi(`${leveys}px: zoomin jälkeen on pieni tauko eikä zoomin aikana tasannetta`,
    taukoNaytteet.length >= 1 && taukoNaytteet.length <= 12 && seisoo.length === 0,
    JSON.stringify({ taukoNaytteita: taukoNaytteet.length, tasanteita: seisoo.length }));

  /*
   * ESIVAIHE ON HYVIN HIDAS (marokonKaari). Etenemistä EI mitata
   * korkeudesta vaan matkasta: kamera kiertää pallon pintaa pitkin
   * (leveys- ja pituuspiiri), ja korkeus nousee kaarella matkan puolessa
   * välissä — juuri niin kuin pallolaudan oma ajo on aina tehnyt.
   * Ajon ensimmäisellä kolmanneksella on kuljettava selvästi alle
   * kolmannes matkasta, mutta koko ajan eteenpäin.
   */
  const matka = (a, b2) => Math.hypot(b2.lat - a.lat, b2.lng - a.lng);
  const perillaNayte = ajossa.length ? ajossa.at(-1) : null;
  // Ajon loppu = se näyte, jossa kohde on saavutettu (matka ei enää muutu).
  const maali = ajossa.reduce((a, r) => (matka(ajossa[0], r) > matka(ajossa[0], a) ? r : a),
    ajossa[0] ?? { lat: 0, lng: 0 });
  const koko = ajossa.length ? matka(ajossa[0], maali) : 0;
  const kolmannes = ajossa.slice(0, Math.max(2, Math.ceil(ajossa.findIndex((r) => r === maali) / 3)));
  const esiMatka = kolmannes.length >= 2 ? matka(ajossa[0], kolmannes.at(-1)) : 0;
  const taaksepain = kolmannes.filter((r, i) => i > 0
    && matka(ajossa[0], r) < matka(ajossa[0], kolmannes[i - 1]) - 0.05);
  vaadi(`${leveys}px: Marokon ajon esivaihe etenee hitaasti, muttei peruuta`,
    kolmannes.length >= 2 && koko > 5 && esiMatka > 0
      && esiMatka < koko * 0.25 && taaksepain.length === 0,
    JSON.stringify({
      naytteita: kolmannes.length,
      esivaihe: +esiMatka.toFixed(2),
      koko: +koko.toFixed(2),
      osuus: `${Math.round((esiMatka / koko) * 100)} %`,
      taaksepain: taaksepain.length,
    }));

  /*
   * SAAPUMISHETKI EI OLE MYÖHÄSTYNYT. Ajon PÄÄTEPISTE on aina
   * 'jebel-irhoud'-jakson alku (kohteeseenAsti), ja zoomin jatko sekä
   * tauko LYHENTÄVÄT ajoa — ne eivät siirrä saapumista. Mitataan se,
   * mikä selaimessa on mitattavissa: kamera on maalissa viimeistään
   * silloin, kun jakso vaihtuu, eikä ajo ole vielä kesken.
   */
  const jaksoVaihtui = lasku.find((r) => r.jakso === 'jebel-irhoud');
  const maalissa = ajossa.find((r) => matka(r, maali) < 0.5);
  vaadi(`${leveys}px: kamera on Marokossa viimeistään kun 'jebel-irhoud' alkaa`,
    Boolean(jaksoVaihtui && maalissa) && maalissa.ms <= jaksoVaihtui.ms + 250
      && maalissa.ms > (taukoNaytteet.at(-1)?.ms ?? 0),
    JSON.stringify({
      ajonAlkuMs: lasku[ajonAlku]?.ms ?? null,
      mallinKestoMs: lasku[ajonAlku]?.kohdeajo ?? null,
      maalissaMs: maalissa?.ms ?? null,
      jaksoMs: jaksoVaihtui?.ms ?? null,
      perilla: perillaNayte ? { lat: perillaNayte.lat, lng: perillaNayte.lng } : null,
    }));

  }

  /* --- 3. LAATIKON KORKEUS: kaanonin JOKAINEN osa oikeassa laatikossa --- */
  const mitat = await s.evaluate((osat) => {
    const juuri = document.querySelector('.aikajana');
    const rivi = juuri.querySelector('.aikajana-kertomusteksti');
    const laatikko = rivi.querySelector('.aikajana-kertomusteksti-sisus');
    // Alalaidan asu (ei keskitystä): juuri se, jossa kappale näytetään.
    rivi.classList.remove('keskella');
    rivi.classList.add('esilla');
    laatikko.classList.add('nakyy');
    const vanha = laatikko.textContent;
    const kartta = Math.round(juuri.getBoundingClientRect().height);
    const ulos = osat.map((o) => {
      laatikko.textContent = o.teksti;
      return { ...o, korkeus: Math.round(laatikko.getBoundingClientRect().height) };
    });
    laatikko.textContent = vanha;
    return { kartta, ulos };
  }, KAIKKI_OSAT);
  const raja = mitat.kartta * 0.3;
  const liianKorkeat = mitat.ulos.filter((o) => o.korkeus > raja);
  const korkein = mitat.ulos.reduce((a, b) => (b.korkeus > a.korkeus ? b : a), mitat.ulos[0]);
  vaadi(`${leveys}px: jokainen osa mahtuu 30 %:iin kartasta (${mitat.kartta} px → raja ${Math.round(raja)} px)`,
    mitat.ulos.length >= 25 && liianKorkeat.length === 0,
    JSON.stringify({
      osia: mitat.ulos.length,
      korkein: `${korkein.jakso}#${korkein.osa} ${korkein.korkeus} px `
        + `(${Math.round((korkein.korkeus / mitat.kartta) * 100)} %)`,
      ylitti: liianKorkeat.slice(0, 3),
    }));

  /* 3b. VASTAKOE: koko kappale yhtenä laatikkona (vanha käytös). */
  const vastakoe = await s.evaluate((jaksot) => {
    const juuri = document.querySelector('.aikajana');
    const rivi = juuri.querySelector('.aikajana-kertomusteksti');
    const laatikko = rivi.querySelector('.aikajana-kertomusteksti-sisus');
    const vanha = laatikko.textContent;
    const kartta = Math.round(juuri.getBoundingClientRect().height);
    const ulos = jaksot.map((j) => {
      laatikko.textContent = j.teksti;
      return { id: j.id, korkeus: Math.round(laatikko.getBoundingClientRect().height) };
    });
    laatikko.textContent = vanha;
    return { kartta, ulos };
  }, [...IHMISEN_MATKA_KERTOMUS.map((j) => ({ id: j.id, teksti: j.teksti })), ARABIA_ENNEN]);
  const vanhaKorkein = vastakoe.ulos.reduce((a, b) => (b.korkeus > a.korkeus ? b : a), vastakoe.ulos[0]);
  vaadi(`${leveys}px: VASTAKOE — koko kappale yhtenä laatikkona on korkeampi kuin osissa`,
    vanhaKorkein.korkeus > korkein.korkeus,
    JSON.stringify({
      vanha: `${vanhaKorkein.id} ${vanhaKorkein.korkeus} px `
        + `(${Math.round((vanhaKorkein.korkeus / vastakoe.kartta) * 100)} %)`,
      uusi: `${korkein.korkeus} px`,
    }));

  /* --- KUVA: Arabia-kohta, lyhyt laatikko, ei pulua --- */
  await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.valitse('arabia'));
  /*
   * JAKSO PYSÄYTETÄÄN KUVAA VARTEN. Savukkeen väärennetty äänite on
   * kolme sekuntia pitkä, joten ilman taukoa esitys ehtii seuraavaan
   * jaksoon ennen kuin kaappaus valmistuu — ensimmäinen versio kuvasta
   * näytti 'intian-rannat'-kappaleen.
   */
  await s.waitForTimeout(1500);
  await s.evaluate(() => window.matkakirja.ui.aikajana.esitys.tauko());
  await s.waitForTimeout(600);
  const arabia = await s.evaluate(NAYTE);
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kappaleet-${leveys}.jpg`), type: 'jpeg', quality: 72 });
  vaadi(`${leveys}px: Arabia-jaksossa laatikko on matala eikä simpukkavirkettä ole`,
    arabia.jakso === 'arabia' && !SIMPUKKA.test(arabia.teksti)
      && arabia.laatikko <= arabia.kartta * 0.3 && arabia.puluNakyy === false,
    JSON.stringify({
      teksti: arabia.teksti.slice(0, 60), laatikko: arabia.laatikko, kartta: arabia.kartta,
      osuus: `${Math.round((arabia.laatikko / arabia.kartta) * 100)} %`, pulu: arabia.puluNakyy,
    }));

  /* 1c. VASTAKOE: ilman piiloluokkaa pulu on heti näkyvissä. */
  await s.evaluate(() => document.body.classList.remove('aikajana-pulu-piilossa'));
  await s.waitForTimeout(400);
  const paljas = await s.evaluate(NAYTE);
  await s.screenshot({ path: join(ULOS, `savuke-ihmisen-kappaleet-vastakoe-${leveys}.png`) });
  await s.evaluate(() => document.body.classList.add('aikajana-pulu-piilossa'));
  vaadi(`${leveys}px: VASTAKOE — ilman piiloluokkaa pulu on näkyvissä kesken esityksen`,
    paljas.puluNakyy === true, JSON.stringify({ nappi: paljas.puluNappi, kasvot: paljas.puluKasvot }));

  /* --- 1b. PULU TULEE, KUN ESITYS PÄÄTTYY --- */
  await s.evaluate(() => {
    const e = window.matkakirja.ui.aikajana.esitys;
    const viimeinen = window.matkakirja.ui.aikajana.kaari.kertomus.at(-1).id;
    e.valitse(viimeinen);
  });
  const loppui = await s.waitForFunction(
    () => window.matkakirja.ui.aikajana?.esitys?.tila?.()?.paattynyt === true,
    null, { timeout: 60000, polling: 250 },
  ).then(() => true).catch(() => false);
  // Sisääntulo: PULUN_SISAANTULO_MS (2 s) + kävelyele (2,2 s).
  await s.waitForTimeout(5000);
  const lopussa = await s.evaluate(NAYTE);
  vaadi(`${leveys}px: pulu on ruudulla, kun esitys on päättynyt`,
    loppui && lopussa.paattynyt === true && lopussa.puluPiilossa === false
      && lopussa.piiloluokka === false && lopussa.puluNakyy === true,
    JSON.stringify({
      loppui, paattynyt: lopussa.paattynyt, piilossa: lopussa.puluPiilossa,
      luokka: lopussa.piiloluokka, nakyy: lopussa.puluNakyy, tullut: lopussa.puluTullut,
    }));

  writeFileSync(join(ULOS, `savuke-ihmisen-kappaleet-${leveys}.json`), JSON.stringify({
    sarja, kamerasarja, mitat, vastakoe, arabia, lopussa,
  }, null, 1));
  await konteksti.close();
  return { kamerasarja, mitat, korkein, vanhaKorkein, vaiheet };
}

/* KOOT=390 ajaa vain kapean ruudun (nopeampi silmukka työn aikana). */
const KOOT = (process.env.KOOT ? process.env.KOOT.split(',').map(Number) : [390, 1400])
  .map((w) => (w === 390 ? [390, 844] : [w, 900]));
const yhteenveto = [];
for (const [leveys, korkeus] of KOOT) yhteenveto.push([leveys, await mittaa(leveys, korkeus)]);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
vaadi('jakofunktio pitää 240 merkin rajan', KAIKKI_OSAT.every((o) => o.teksti.length <= OSAN_MERKIT),
  `pisin ${Math.max(...KAIKKI_OSAT.map((o) => o.teksti.length))} merkkiä`);

for (const [leveys, tulos] of yhteenveto) {
  if (!tulos) continue;
  console.log(`\n── ${leveys} px ──`);
  console.log(`   kartta ${tulos.mitat.kartta} px, korkein osa ${tulos.korkein.korkeus} px `
    + `(${Math.round((tulos.korkein.korkeus / tulos.mitat.kartta) * 100)} %), `
    + `vanha käytös ${tulos.vanhaKorkein.korkeus} px `
    + `(${Math.round((tulos.vanhaKorkein.korkeus / tulos.mitat.kartta) * 100)} %)`);
  if (tulos.vaiheet) {
    console.log(`   zoomi ${Math.round(tulos.vaiheet.zoomPerus)} → `
      + `${Math.round(tulos.vaiheet.zoomKesto)} ms (+${Math.round(tulos.vaiheet.zoomKesto - tulos.vaiheet.zoomPerus)})`);
  }
}

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi. Kuvat: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
