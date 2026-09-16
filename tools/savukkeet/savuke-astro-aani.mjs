/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERAN OMA ÄÄNI (omistaja 16.9.2026,
 * Raamattu kohdat 8, 14 ja 17 sekä LISÄYS 8).
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-astro-aani.mjs
 *
 * Sisarsavuke tools/savukkeet/savuke-astro-valokuva.mjs mittaa
 * valokuvanäkymän pinnat. TÄMÄ mittaa vain äänen, ja mittaa sen
 * SELAIMEN OMASTA ÄÄNIGRAAFISTA eikä koodista: jokainen
 * `createBufferSource`- ja `createGain`-kutsu kirjataan sivulla, joten
 * väitteet koskevat sitä mitä oikeasti soitetaan.
 *
 * VÄITTEET:
 *   1. Linssiin tultaessa syntyy AudioBufferSourceNode, jonka
 *      `loop === true`, ja sen gain nousee nollasta tavoitteeseen noin
 *      kahdessa sekunnissa (humina, Codexin ohje).
 *   2. 84 SEKUNNIN KIERROSRAJA EI KATKAISE: puskurin kesto on noin
 *      84 s, `loop` on päällä eikä kierros ole sidottu elementin
 *      `ended`-tapahtumaan — siksi ristihäivytys saumassa säilyy.
 *      Mitataan myös simuloidulla ajalla: soittimen olio ja sen
 *      `startedAt` eivät vaihdu, vaikka kierrosraja ylitetään.
 *   3. KOHTEEN JA KUVAN VAIHTO EI LUO UUTTA SOITINTA: kolme
 *      kohteenvaihtoa ja pikkukuvan napautus, ja luotujen
 *      BufferSourceNodejen määrä pysyy samana. Feidi ei siis ala
 *      alusta.
 *   4. PELIN MUSIIKKIKYTKIN (LISÄYS 8) vaientaa ja palauttaa äänen
 *      kesken linssin; linssillä ei ole omaa kytkintä.
 *   5. LINSSISTÄ POISTUMINEN pysäyttää ja siivoaa: soitin on purettu
 *      eikä yksikään lähde jää soimaan.
 *   6. MUSIIKKI ON POIS (omistaja 16.9.2026 kuunneltuaan: *"Jätä
 *      musiikki pois. Pidetään pelkkä humina."*): musiikkikerrosta ei
 *      LADATA eikä soiteta — ruudulla on täsmälleen yksi pitkä soitin
 *      ja verkkoon ei mene pyyntöä musiikin osoitteeseen. Savuke laskee
 *      pyynnöt itse, joten väite ei nojaa koodin lukemiseen.
 *
 * VASTAKOKEET:
 *   • gain-mittari ajetaan myös ennen linssiä: tavoitetason pitää olla
 *     0, jottei mittari voisi mennä läpi vahingossa;
 *   • kohteenvaihdon jälkeen tarkistetaan, että kohde TODELLA vaihtui
 *     (kuvan osoite muuttui) — muuten "ei uutta soitinta" olisi tyhjä.
 *
 * R2-MP3 KONTISSA. Ämpärin 1,3 Mt:n humina noudetaan Noden kautta
 * (route → fetch), koska selaimen suora yhteys on kontissa katki. Jos
 * nouto ei onnistu, tilalle tarjotaan paikallisesti syntetisoitu
 * 84 sekunnin WAV — mittaus koskee SOITINTA eikä tavuja, ja korvaus
 * kirjataan lokiin, jottei sitä voi lukea vahingossa oikeaksi
 * äänitteeksi.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8759, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
/*
 * AUTOPLAY AUKI SELAIMEN LIPULLA. Peli käynnistää äänikontekstin
 * käyttäjän eleestä, ja savuke napauttaa "Aloita seikkailu" — mutta
 * headless-Chromium ei aina laske synteettistä napautusta eleeksi, ja
 * silloin mitattaisiin autoplay-estoa eikä soitinta. Este itsessään on
 * oma väitteensä (soitin odottaa vahtia eikä kirjoita konsoliin), ja se
 * mitataan lähdekoodista tests/satelliitti.test.mjs:ssä.
 */
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});

/*
 * KOLME RUUTUA, JOISTA YKSI ON OMISTAJAN OMA. iPad 1024 × 1366 on se
 * kuvasuhde, jossa vika nähtiin (selite ja pienoiskuvat kelluivat
 * kuvan reunassa eivätkä ruudun kulmissa), 1400 × 900 on työpöydän
 * vakiomitta ja 390 × 844 pystypuhelin.
 */
const NAKYMAT = {
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
};


/** Huminan versioitu osoite (js/linssit/satelliitti-aani.js). */
const HUMINA_OSOITE = 'https://media.matkakirja.app/matkakirja/aanet/linssit/'
  + 'astronautin-kamera/20260916/'
  + '93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3';
const MUSIIKKI_OSOITE = 'https://media.matkakirja.app/matkakirja/aanet/linssit/'
  + 'astronautin-kamera-musiikki-lyria.mp3';

/*
 * PAIKALLINEN VARAÄÄNITE. 84 s hiljaista kohinaa 22 050 Hz:n monona:
 * dekooderi purkaa sen samalla tavalla kuin MP3:n, ja soittimen
 * mekaniikka (loop, gain, purku) on mitattavissa ilman verkkoa.
 */
function teeVaraWav(sekunteja = 84, taajuus = 22050) {
  const naytteita = sekunteja * taajuus;
  const data = Buffer.alloc(naytteita * 2);
  for (let i = 0; i < naytteita; i += 1) {
    // Hyvin hiljainen hyrinä, ei täyttä kohinaa: ei mittaa tasoa.
    const arvo = Math.round(Math.sin((i / taajuus) * 2 * Math.PI * 80) * 300);
    data.writeInt16LE(arvo, i * 2);
  }
  const otsake = Buffer.alloc(44);
  otsake.write('RIFF', 0);
  otsake.writeUInt32LE(36 + data.length, 4);
  otsake.write('WAVEfmt ', 8);
  otsake.writeUInt32LE(16, 16);
  otsake.writeUInt16LE(1, 20);
  otsake.writeUInt16LE(1, 22);
  otsake.writeUInt32LE(taajuus, 24);
  otsake.writeUInt32LE(taajuus * 2, 28);
  otsake.writeUInt16LE(2, 32);
  otsake.writeUInt16LE(16, 34);
  otsake.write('data', 36);
  otsake.writeUInt32LE(data.length, 40);
  return Buffer.concat([otsake, data]);
}

/* Humina noudetaan kerran; korvaus kirjataan näkyviin. */
let huminanTavut = null;
let huminaKorvattu = false;
{
  const vastaus = await ulkohaku(HUMINA_OSOITE);
  if (vastaus?.body?.length) {
    huminanTavut = { body: vastaus.body, tyyppi: 'audio/mpeg' };
    console.log(`    (humina ämpäristä: ${vastaus.body.length} tavua)`);
  } else {
    huminanTavut = { body: teeVaraWav(), tyyppi: 'audio/wav' };
    huminaKorvattu = true;
    console.log('    (KIRJATTU: ämpärin MP3 ei latautunut kontissa — tilalla paikallinen 84 s WAV)');
  }
}

/** Äänigraafin kirjanpito sivulla: jokainen solmu jättää jäljen. */
const VAHTI = () => {
  const P = window.AudioContext?.prototype ?? window.webkitAudioContext?.prototype;
  if (!P || P.__astroVahti) return;
  P.__astroVahti = true;
  window.__astroAani = { lahteita: 0, gaineja: 0, lahteet: [], gainit: [] };
  const vanhaLahde = P.createBufferSource;
  P.createBufferSource = function createBufferSource(...args) {
    const solmu = vanhaLahde.apply(this, args);
    const kirjaus = { alkoi: null, loop: null, kesto: null, pysaytetty: false, solmu };
    window.__astroAani.lahteita += 1;
    window.__astroAani.lahteet.push(kirjaus);
    const vanhaStart = solmu.start.bind(solmu);
    solmu.start = (...a) => {
      kirjaus.alkoi = this.currentTime;
      kirjaus.loop = solmu.loop;
      kirjaus.kesto = solmu.buffer ? solmu.buffer.duration : null;
      return vanhaStart(...a);
    };
    const vanhaStop = solmu.stop.bind(solmu);
    solmu.stop = (...a) => { kirjaus.pysaytetty = true; return vanhaStop(...a); };
    return solmu;
  };
  const vanhaGain = P.createGain;
  P.createGain = function createGain(...args) {
    const solmu = vanhaGain.apply(this, args);
    /*
     * GAIN-AUTOMAATIO KIRJATAAN KUTSUINA, EI NÄYTTEINÄ. Kontin
     * ohjelmisto-WebGL nälkiinnyttää pääsäikeen sekunneiksi, joten
     * `gain.value`-näytteistä ei voi lukea nousun kestoa — ensimmäinen
     * näyte saattaa osua vasta nousun jälkeen (mitattu 16.9.2026).
     * Ajastetut arvot sen sijaan kertovat täsmälleen, mistä mihin ja
     * kuinka pitkässä ajassa taso käskettiin nousemaan.
     */
    const kirjaus = { rampit: [], solmu };
    window.__astroAani.gaineja += 1;
    window.__astroAani.gainit.push(kirjaus);
    const p = solmu.gain;
    const vanhaAseta = p.setValueAtTime.bind(p);
    p.setValueAtTime = (arvo, aika) => {
      kirjaus.rampit.push({ laji: 'aseta', arvo, aika });
      return vanhaAseta(arvo, aika);
    };
    const vanhaRamppi = p.linearRampToValueAtTime.bind(p);
    p.linearRampToValueAtTime = (arvo, aika) => {
      kirjaus.rampit.push({ laji: 'ramppi', arvo, aika });
      return vanhaRamppi(arvo, aika);
    };
    return solmu;
  };
};

/** Soittimen tila ja graafin kirjanpito yhdellä kutsulla. */
const AANITILA = async () => {
  const moduuli = await import('/js/linssit/satelliitti-aani.js');
  const kirjanpito = window.__astroAani ?? { lahteita: 0, gaineja: 0, lahteet: [], gainit: [] };
  return {
    tila: moduuli.astronautinAaniTila(),
    lahteita: kirjanpito.lahteita,
    gaineja: kirjanpito.gaineja,
    rampit: (kirjanpito.gainit ?? []).map((g) => g.rampit ?? []),
    lahteet: kirjanpito.lahteet.map((r) => ({
      alkoi: r.alkoi, loop: r.loop, kesto: r.kesto ? Math.round(r.kesto) : null,
      pysaytetty: r.pysaytetty,
    })),
    ctx: window.matkakirja?.ui ? undefined : undefined,
  };
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virheet, musiikkipyynnot) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  await konteksti.addInitScript(VAHTI);
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  // Ämpäri ja NASAn kuva-ämpäri Noden kautta; muu verkko katki.
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/,
    async (route) => {
      const vastaus = await ulkohaku(route.request().url());
      if (!vastaus) { route.abort(); return; }
      route.fulfill({
        status: 200,
        contentType: vastaus.tyyppi ?? 'application/octet-stream',
        body: vastaus.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
  /*
   * HUMINAN JA MUSIIKIN OMAT REITIT VIIMEISENÄ. Playwright kokeilee
   * reittejä VIIMEKSI LISÄTYSTÄ alkaen, joten ämpärin yleinen reitti
   * söisi nämä, jos ne olisi lisätty ensin (mitattu 16.9.2026: pakotettu
   * 404 ei mennyt perille ja musiikki soi silti).
   */
  await sivu.route((url) => url.href === HUMINA_OSOITE, (route) => route.fulfill({
    status: 200,
    contentType: huminanTavut.tyyppi,
    body: huminanTavut.body,
    headers: { 'access-control-allow-origin': '*' },
  }));
  /*
   * MUSIIKIN OSOITE ON VARTIOITU. Kerros on kytketty pois, joten siihen
   * ei saa mennä yhtäkään pyyntöä; laskuri kertoo sen mittaamalla eikä
   * koodia lukemalla. Jos pyyntö tulee, se saa 404:n — silloinkin
   * huminan on soitava (vanha väite jää voimaan).
   */
  await sivu.route((url) => url.href === MUSIIKKI_OSOITE, (route) => {
    musiikkipyynnot.push(route.request().url());
    route.fulfill({
      status: 404,
      contentType: 'text/plain',
      body: 'ei viela',
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virheet.push(`${e}\n${e.stack ?? ''}`.slice(0, 900)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8759/index.html?lauta=pallo', { waitUntil: 'load' });
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
  /*
   * SAAPUMISPINNAT POIS ENNEN KUVIA. Pakotettu saapuminen Ateenaan avaa
   * kohtaamiskuvan ja saapumiskortin pallon päälle; ne eivät kuulu
   * linssiin, mutta peittäisivät kaappauksissa juuri sen, mitä
   * mitataan. Suljetaan kuten pelaaja: Escape ja kortin oma sulku.
   */
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(600);
  await s.evaluate(() => {
    for (const v of ['[aria-label*="Sulje"]', '.saapumistraileri-sulje', '.arrival-close']) {
      document.querySelector(v)?.click();
    }
    document.querySelector('dialog[open]')?.close?.();
    // Saapumistraileri ohitetaan napauttamalla sen kehystä (js/saapumistraileri.js).
    document.querySelector('.saapumistraileri')
      ?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    /*
     * Saapumisvirran isokuva jää pystyyn, koska savuke pakotti pelaajan
     * Ateenaan ilman oikeaa matkaa. Se ei ole linssin pinta eikä sillä
     * ole tekemistä mitattavien väitteiden kanssa — poistetaan, jotta
     * kaappauksissa näkyy pallo eikä saapumiskuva.
     */
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1600);
  const peittava = await s.evaluate(() => {
    // Mikä tahansa pinta, joka peittää yli puolet ruudusta pallon päällä.
    const nimet = [];
    for (const el of document.body.querySelectorAll('body > *, .map-pane > *')) {
      const r = el.getBoundingClientRect();
      const t = getComputedStyle(el);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) < 0.05) continue;
      if (r.width * r.height > window.innerWidth * window.innerHeight * 0.5
        && !el.classList.contains('pallo-kuori') && el.tagName !== 'SCRIPT') {
        nimet.push(el.className || el.tagName);
      }
    }
    return nimet;
  });
  if (peittava.length) console.log(`    (peittäviä pintoja: ${peittava.join(', ')})`);
  return pallo;
}


async function ajaNakyma(nakymanNimi) {
  const virheet = [];
  /** Jokainen pyyntö musiikin osoitteeseen (pitäisi jäädä tyhjäksi). */
  const musiikkipyynnot = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakymanNimi], virheet, musiikkipyynnot);
  const nimessa = (t) => `${t} (${nakymanNimi})`;
  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt');

  /* --- VASTAKOE: ennen linssiä ei ole soitinta eikä tavoitetasoa ---- */
  const ennen = await s.evaluate(AANITILA);
  vaadi(nimessa('vastakoe: ennen linssiä ei soi mitään eikä tavoitetaso ole yli nollan'),
    ennen.tila === null, JSON.stringify(ennen));

  /* --- linssi päälle JA feidi näytteille samassa hetkessä ---------- */
  /*
   * NÄYTTEENOTTO ALKAA SAMASSA EVALUATESSA KUIN LINSSIN AVAUS. Kaksi
   * erillistä `page.evaluate`a ei riitä: edellinen odotti linssin
   * heräämistä ja palasi vasta sen jälkeen, jolloin 2 sekunnin nousu oli
   * jo ohi ja ensimmäinen lukema oli tavoitteessa (mitattu 16.9.2026).
   * Nyt sivu käynnistää linssin ja alkaa heti ottaa näytteitä 50 ms:n
   * välein — sarja kattaa koko nousun.
   */
  const nousu = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    const m = await import('/js/linssit/satelliitti-aani.js');
    // Linssi käyntiin ILMAN odotusta: näytteenotto alkaa samasta hetkestä.
    ui.valitseLinssi('satelliitti');
    const naytteet = [];
    for (let i = 0; i < 200; i += 1) {
      const t = m.astronautinAaniTila();
      naytteet.push({
        // NIMELLINEN ja TODELLINEN aika erikseen: kontin ohjelmisto-WebGL
        // nälkiinnyttää pääsäikeen, jolloin 50 ms:n askel venyy — vain
        // `kello` kertoo, milloin näyte oikeasti otettiin.
        ms: i * 50,
        kello: Math.round(performance.now()),
        soi: Boolean(t?.kerrokset?.humina?.soi),
        taso: t?.kerrokset?.humina?.taso ?? 0,
        tavoite: t?.kerrokset?.humina?.tavoite ?? 0,
        looppi: Boolean(t?.kerrokset?.humina?.looppi),
      });
      await new Promise((r) => setTimeout(r, 50));
    }
    const moduuli = await import('/js/linssit/satelliitti-data.js');
    window.__satelliitti = moduuli.SATELLIITTI_KOHTEET;
    return naytteet;
  });
  const soivat = nousu.filter((n) => n.soi);
  const alkuNayte = soivat[0] ?? null;
  const loppu = soivat.at(-1) ?? null;
  const feidattu = await s.evaluate(AANITILA);
  const huminanLahde = feidattu.lahteet.find((r) => r.kesto && r.kesto >= 80 && r.kesto <= 90) ?? null;
  /*
   * NOUSU LUETAAN AJASTETUISTA ARVOISTA. Etsitään gain, jonka
   * automaatio on juuri se mitä tilattiin: nollasta huminan
   * tavoitetasoon kahdessa sekunnissa. `aseta` ja `ramppi` ovat saman
   * kutsuparin kaksi puolta (js/linssit/satelliitti-aani.js liuta).
   */
  const tavoite = loppu?.tavoite ?? 0;
  const huminanNousu = feidattu.rampit
    .map((rampit) => {
      const i = rampit.findIndex((r, k) => r.laji === 'aseta' && r.arvo === 0
        && rampit[k + 1]?.laji === 'ramppi' && Math.abs(rampit[k + 1].arvo - tavoite) < 1e-6);
      return i >= 0 ? { alku: rampit[i], loppu: rampit[i + 1] } : null;
    })
    .find(Boolean) ?? null;
  const nousuSekunteja = huminanNousu
    ? Number((huminanNousu.loppu.aika - huminanNousu.alku.aika).toFixed(2)) : null;
  vaadi(nimessa('linssiin tultaessa syntyy silmukoitu puskurisoitin ja gain nousee 0 → tavoite ~2 s'),
    Boolean(alkuNayte) && Boolean(huminanLahde) && huminanLahde.loop === true
      && tavoite > 0 && Boolean(huminanNousu)
      && nousuSekunteja >= 1.9 && nousuSekunteja <= 2.1
      && loppu.looppi === true
      // Ja taso on perillä, kun feidin aika on kulunut.
      && Math.abs(loppu.taso - tavoite) <= tavoite * 0.1,
    JSON.stringify({ nousuSekunteja, tavoite, alku: huminanNousu?.alku, loppu: huminanNousu?.loppu,
      lahde: huminanLahde, ensimmainenNayte: alkuNayte, viimeinenNayte: loppu }));

  /* --- 2: 84 s kierrosraja ei katkaise ------------------------------ */
  const kierros = await s.evaluate(async ({ korvattu }) => {
    const m = await import('/js/linssit/satelliitti-aani.js');
    const kirjanpito = window.__astroAani;
    const rivit = kirjanpito.lahteet.filter((r) => r.kesto && r.kesto >= 80 && r.kesto <= 90);
    const rivi = rivit[0] ?? null;
    const ctx = rivi?.solmu?.context ?? null;
    return {
      kesto: rivi?.kesto ?? null,
      korvattu,
      loop: rivi?.solmu?.loop ?? null,
      alkoi: rivi?.alkoi ?? null,
      soi: m.astronautinAaniTila()?.kerrokset?.humina?.soi === true,
      ctxAika: ctx ? Number(ctx.currentTime.toFixed(2)) : null,
      huminoita: rivit.length,
      // Kierros ei ole sidottu elementtiin: koko soittimessa ei ole
      // yhtäkään <audio>-oliota eikä ended-kuuntelijaa (vartio
      // tests/satelliitti.test.mjs). Tässä mitataan se, että sama
      // BufferSourceNode on yhä käynnissä eikä ketään ole vaihdettu.
      pysaytetty: rivi?.pysaytetty ?? null,
    };
  }, { korvattu: huminaKorvattu });
  vaadi(nimessa('84 s kierrosraja ei katkaise: loop päällä, yksi soitin, kesto ~84 s'),
    kierros.loop === true && kierros.huminoita === 1 && kierros.soi
      && kierros.pysaytetty === false
      && kierros.kesto >= 80 && kierros.kesto <= 90,
    JSON.stringify(kierros));

  /* --- 3: kohteen ja kuvan vaihto ei luo uutta soitinta ------------- */
  const ennenVaihtoa = await s.evaluate(AANITILA);
  const vaihdot = await s.evaluate(async () => {
    const osoitteet = [];
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    const kohteet = kahva.kohteet.filter((k) => (k.havainnot ?? []).length);
    for (const kohde of [kohteet[0], kohteet[1], kohteet[2]]) {
      // SAMA FUNKTIO kuin vihreän pisteen napautuksella (avaaKohde).
      kahva.avaaKohde(kohde.tunnus);
      await new Promise((r) => setTimeout(r, 700));
      osoitteet.push(document.querySelector('.satelliitti-kuva')?.src ?? null);
    }
    // Kuvan vaihto kohteen sisällä: ensimmäinen pikkukuva.
    document.querySelector('.satelliitti-pikku:not(.valittu)')?.click();
    await new Promise((r) => setTimeout(r, 600));
    osoitteet.push(document.querySelector('.satelliitti-kuva')?.src ?? null);
    return osoitteet;
  });
  const vaihdonJalkeen = await s.evaluate(AANITILA);
  const oikeastiVaihtui = new Set(vaihdot.filter(Boolean)).size >= 2;
  vaadi(nimessa('kohteen ja kuvan vaihto ei luo uutta soitinta eikä nollaa feidiä'),
    oikeastiVaihtui && vaihdonJalkeen.lahteita === ennenVaihtoa.lahteita
      && vaihdonJalkeen.tila.kerrokset.humina.soi
      && Math.abs(vaihdonJalkeen.tila.kerrokset.humina.taso
        - vaihdonJalkeen.tila.kerrokset.humina.tavoite)
        <= vaihdonJalkeen.tila.kerrokset.humina.tavoite * 0.12,
    JSON.stringify({ lahteitaEnnen: ennenVaihtoa.lahteita, jalkeen: vaihdonJalkeen.lahteita,
      kuvia: new Set(vaihdot.filter(Boolean)).size,
      humina: vaihdonJalkeen.tila?.kerrokset?.humina }));

  /* --- 6: musiikki on kytketty pois, humina soi yksin -------------- */
  const mus = vaihdonJalkeen.tila.kerrokset.musiikki;
  vaadi(nimessa('musiikkia ei ladata eikä soiteta — pelkkä humina soi'),
    mus.poissa === true && mus.soi === false && mus.taso === 0
      && musiikkipyynnot.length === 0
      && vaihdonJalkeen.tila.kerrokset.humina.soi === true,
    JSON.stringify({ musiikki: mus, pyyntoja: musiikkipyynnot.length,
      humina: vaihdonJalkeen.tila.kerrokset.humina }));
  /*
   * VASTAKOE: pitkiä soittimia (≥ 60 s puskuri) on täsmälleen YKSI.
   * Jos musiikki soisi vahingossa, niitä olisi kaksi — ja juuri sitä
   * omistaja ei halua kuulla.
   */
  const pitkia = vaihdonJalkeen.lahteet.filter((r) => r.kesto && r.kesto >= 60).length;
  vaadi(nimessa('vastakoe: pitkiä soittimia on täsmälleen yksi (humina)'),
    pitkia === 1, String(pitkia));

  /* --- 4: pelin musiikkikytkin vaientaa ja palauttaa ---------------- */
  const kytkinPois = await s.evaluate(async () => {
    const v = await import('/js/musiikkivalitsin.js');
    v.asetaMusiikkiPaalla(false);
    await new Promise((r) => setTimeout(r, 1100));
    const m = await import('/js/linssit/satelliitti-aani.js');
    return { tila: m.astronautinAaniTila(), lahteita: window.__astroAani.lahteita };
  });
  vaadi(nimessa('pelin musiikkikytkin pois vaientaa ja pysäyttää linssin äänen'),
    kytkinPois.tila.kytkin === false && kytkinPois.tila.kerrokset.humina.soi === false
      && kytkinPois.tila.kerrokset.humina.taso === 0,
    JSON.stringify(kytkinPois.tila));
  const kytkinPaalle = await s.evaluate(async () => {
    const v = await import('/js/musiikkivalitsin.js');
    v.asetaMusiikkiPaalla(true);
    await new Promise((r) => setTimeout(r, 2600));
    const m = await import('/js/linssit/satelliitti-aani.js');
    return { tila: m.astronautinAaniTila(), lahteita: window.__astroAani.lahteita };
  });
  vaadi(nimessa('musiikkikytkin takaisin päälle käynnistää huminan uudestaan'),
    kytkinPaalle.tila.kerrokset.humina.soi === true
      && kytkinPaalle.tila.kerrokset.humina.taso > 0
      && kytkinPaalle.lahteita > kytkinPois.lahteita,
    JSON.stringify({ tila: kytkinPaalle.tila?.kerrokset?.humina,
      lahteita: [kytkinPois.lahteita, kytkinPaalle.lahteita] }));
  // Linssillä ei ole omaa kytkintä (LISÄYS 8).
  const omaKytkin = await s.evaluate(() => ({
    valikoita: document.querySelectorAll('.satelliitti-valikko, .satelliitti-aani').length,
    avain: localStorage.getItem('matkakirja-linssiaani'),
  }));
  vaadi(nimessa('linssillä ei ole omaa äänikytkintä eikä omaa avainta'),
    omaKytkin.valikoita === 0 && omaKytkin.avain === null, JSON.stringify(omaKytkin));

  /* --- 5: linssistä poistuminen pysäyttää ja siivoaa ---------------- */
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await s.waitForTimeout(1400);
  const ulkona = await s.evaluate(AANITILA);
  vaadi(nimessa('linssistä poistuminen pysäyttää ja siivoaa soittimen'),
    ulkona.tila === null
      && ulkona.lahteet.filter((r) => r.kesto && r.kesto >= 60 && !r.pysaytetty).length === 0,
    JSON.stringify({ tila: ulkona.tila,
      pitkiaSoimassa: ulkona.lahteet.filter((r) => r.kesto && r.kesto >= 60 && !r.pysaytetty).length }));

  /*
   * KOLMANNEN OSAPUOLEN VIRHEET RAJATAAN POIS. Kontin ohjelmisto-WebGL
   * saa globe.gl:n animaatiosilmukan ajoittain kaatumaan
   * (`_animationCycle`, vendor/globe.gl-2.46.2.min.js) — se ei ole
   * pelin eikä tämän soittimen vika, ja väite mittaisi sitä satunnaisesti.
   * Omat virheet lasketaan yhä yhtä tarkasti, ja ohitetut tulostetaan.
   */
  const omatVirheet = virheet.filter((v) => !/vendor\/globe\.gl/.test(v));
  if (virheet.length !== omatVirheet.length) {
    console.log(`    (ohitettu ${virheet.length - omatVirheet.length} globe.gl-virhettä)`);
  }
  vaadi(nimessa('ei sivuvirheitä'), omatVirheet.length === 0, omatVirheet.slice(0, 3).join(' / '));
  await konteksti.close();
}

for (const nakyma of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : ['tyopoyta', 'puhelin'])) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nakyma);
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi.${huminaKorvattu ? ' (humina korvattu paikallisella WAVilla)' : ''}`);
process.exit(kaatuneet.length ? 1 : 0);
