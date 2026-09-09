/*
 * SELAINSAVUKE: IHMISEN MATKAN ALOITUSKORTTI (Ken Burns -tausta, paperi ilman kuvaa).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-avaus.mjs
 *
 * OMISTAJAN TILAUS 9.9.2026 klo 15.40, sanatarkasti: *"tähän aloitukseen
 * voisi tuoda muutamia kuvia isona taustalle niin että ne liikkuvat
 * hitaasti ja vaihtuvat muutaman sekunnin välein (ken burns tyylinen
 * liike + ristihäivytys). kuvien tulisi feidautua mustaan reuna-alueilla
 * ja kuvat hieman sumennettuina ja tummennettuina. sitten paperi ja
 * teksti näiden päälle ilman kuvaa. ota tekstistä pois muoto 'tulet
 * seuraavaksi näkemään' ja tekstiä voi muutenkin lyhentää hieman.
 * käynnistä nappi alimpana. ihmisen matka otsikko hieman isommalla."*
 * (Raamattu › "IHMISEN MATKAN ALOITUSKORTTI: KEN BURNS -KUVAT
 * TAUSTALLA, PAPERI JA LYHYEMPI TEKSTI PÄÄLLÄ, KÄYNNISTÄ ALIMPANA").
 *
 * TÄMÄ SAVUKE KÄÄNTYI 9.9.2026. Aiemmin (7.9.2026) se vaati, että
 * paperilla ON havainnekuva tekstin rinnalla ja että palstoja on kaksi.
 * Omistaja siirsi kuvat paperin TAAKSE, joten väitteet on käännetty
 * eikä poistettu: kuva ei saa palata paperille takaovesta.
 *
 * MIKSI OMA SAVUKE. tools/savukkeet/savuke-aikajana.mjs ajaa koko
 * kaaren minuutissa ja toteaa avausjaksosta vain, että Käynnistä-nappi
 * on olemassa. Tässä mitataan se, mitä yksikkötesti ei näe: latautuvatko
 * taustakuvat, lähteekö kierros vasta niiden jälkeen, jääkö paperi
 * luettavaksi sumeiden kuvien päällä ja pysähtyykö tausta Käynnistästä.
 *
 * NÄKYMÄT: työpöytä 1600 × 1000 ja puhelin 430 × 930.
 *
 * VÄITTEET:
 *   1. Laatikko avautuu, eikä siinä ole enää kuvaa (.aikajana-avaus-kuva)
 *      eikä `.on-kuva`-luokkaa — paperi on entinen yhden palstan arkki.
 *   2. Taustalla on kuusi kerrosta, jokaisen kuva ladattu, ja kierros on
 *      käynnissä (luokka `kaynnissa`) vasta latauksen jälkeen.
 *   3. Tausta on mustan peitteen PÄÄLLÄ ja paperin ALLA (DOM-järjestys
 *      ja z-index), ja sen reunat häipyvät mustaan (mask-image).
 *   4. Kuvat ovat sumennettuja ja tummennettuja (filter blur+brightness).
 *   5. Ken Burns liikkuu: kerroksen transform-matriisi muuttuu sekunnissa.
 *   6. Teksti ei ala muodolla "Tulet seuraavaksi" ja päättyy omistajan
 *      lauseeseen "…toisella puolella maapalloa."
 *   7. Otsikko on isommalla kuin leipäteksti (+20 % entisestä).
 *   8. Käynnistä-nappi on laatikon VIIMEINEN lapsi ja sen alin elementti.
 *   9. Paperi mahtuu ruutuun kokonaan.
 *  10. Käynnistä pysäyttää taustan ja häivyttää sen (luokka `pois`).
 *  11. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET: ihmisen-matka-aloitus-{tyopoyta,puhelin}.png kansioon
 * KAAPPAUKSET (oletus /tmp/matkakirja-kaappaukset).
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

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1) — pallo ja taustakuvat. */
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
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8749, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** Työpöytä ja puhelin omistajan pyytämillä mitoilla (kaappaus 1:1). */
const NAKYMAT = {
  tyopoyta: { viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 430, height: 930 }, deviceScaleFactor: 1 },
};

/** Kuvia taustalla — sama luku kuin CSS:n kierros olettaa (6 × 6,5 s = 39 s). */
const TAUSTAKUVIA = 6;

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virhelista) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  // Ämpäri (Globe.gl, laatat JA aloituskortin taustakuvat) Noden kautta.
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

/** Peli auki pallolaudalle Ateenaan (sama kaava kuin savuke-aikajana). */
async function avaaPeli(sivu) {
  await sivu.goto('http://127.0.0.1:8749/index.html?lauta=pallo', { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await sivu.waitForTimeout(1200);
  return sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
}

for (const nakyma of Object.keys(NAKYMAT)) {
  const virheet = [];
  const { konteksti, sivu } = await avaaSivu(NAKYMAT[nakyma], virheet);
  const nimessa = (teksti) => `${teksti} (${nakyma})`;
  const pallo = await avaaPeli(sivu);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt 45 s:ssa');

  // Linssi laukusta; avausjakso jää auki (Käynnistä-nappia EI vielä paineta).
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) {
      if (document.querySelector('.aikajana-avaus.laatikko-nakyy')) break;
      await new Promise((r) => setTimeout(r, 25));
    }
  });
  /*
   * KIERROS ODOTETAAN LIIKKEELLE. Moottori päästää animaatiot irti
   * (luokka `kaynnissa`) vasta kun kaikki taustakuvat ovat ladanneet;
   * kylmällä välimuistilla se kestää ämpäristä pari sekuntia.
   */
  await sivu.waitForFunction(() => Boolean(document.querySelector('.aikajana-avaus-tausta.kaynnissa')),
    null, { timeout: 30000 }).catch(() => null);
  // Kolme sekuntia kierrosta: ensimmäinen kuva on täydessä näkyvyydessä ja liikkeessä.
  await sivu.waitForTimeout(3000);
  await sivu.screenshot({ path: join(ULOS, `ihmisen-matka-aloitus-${nakyma}.png`) });

  const mitat = await sivu.evaluate(() => {
    const laatuun = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
    const kehys = document.querySelector('.aikajana-avaus-kehys');
    const laatikko = document.querySelector('.aikajana-avaus-laatikko');
    const otsikko = document.querySelector('.aikajana-avaus-otsikko');
    const teksti = document.querySelector('.aikajana-avaus-teksti');
    const nappi = document.querySelector('.aikajana-avaus-nappi');
    const tausta = document.querySelector('.aikajana-avaus-tausta');
    const peite = document.querySelector('.aikajana-avaus-peite');
    const kerrokset = [...document.querySelectorAll('.aikajana-avaus-taustakuva')];
    const koko = (el) => (el ? parseFloat(getComputedStyle(el).fontSize) : null);
    const tyyli = tausta ? getComputedStyle(tausta) : null;
    const kuvatyyli = kerrokset[0] ? getComputedStyle(kerrokset[0].querySelector('img')) : null;
    return {
      auki: Boolean(document.querySelector('.aikajana-avaus.laatikko-nakyy')),
      kuvaPaperilla: Boolean(document.querySelector('.aikajana-avaus-kuva')),
      onKuvaLuokka: (kehys?.classList.contains('on-kuva') ?? false)
        || (laatikko?.classList.contains('on-kuva') ?? false),
      kerroksia: kerrokset.length,
      ladattu: kerrokset.filter((k) => {
        const img = k.querySelector('img');
        return Boolean(img && img.complete && img.naturalWidth > 0);
      }).length,
      kaynnissa: tausta?.classList.contains('kaynnissa') ?? false,
      ajotila: kerrokset[0] ? getComputedStyle(kerrokset[0]).animationPlayState : null,
      // Peite ensin, tausta sen jälkeen, kehys viimeisenä.
      jarjestys: [...(tausta?.parentElement?.children ?? [])].map((el) => el.className),
      // Tausta täyttää koko linssin alueen (avauskerroksen, ei ikkunan).
      avaus: laatuun(document.querySelector('.aikajana-avaus')),
      taustaZ: tyyli?.zIndex ?? null,
      kehysZ: kehys ? getComputedStyle(kehys).zIndex : null,
      peiteVari: peite ? getComputedStyle(peite).backgroundColor : null,
      maski: (tyyli?.maskImage && tyyli.maskImage !== 'none' ? tyyli.maskImage : tyyli?.webkitMaskImage) ?? '',
      suodatin: kuvatyyli?.filter ?? '',
      otsikkoTeksti: otsikko?.textContent ?? '',
      otsikkoKoko: koko(otsikko),
      tekstinKoko: koko(teksti),
      tekstinSisalto: teksti?.textContent ?? '',
      viimeinen: laatikko?.lastElementChild?.className ?? '',
      r: {
        kehys: laatuun(kehys), laatikko: laatuun(laatikko), otsikko: laatuun(otsikko),
        teksti: laatuun(teksti), nappi: laatuun(nappi), tausta: laatuun(tausta),
      },
      ruutu: { w: window.innerWidth, h: window.innerHeight },
    };
  });

  const { r } = mitat;
  vaadi(nimessa('kortti on auki eikä paperilla ole kuvaa'),
    mitat.auki && !mitat.kuvaPaperilla && !mitat.onKuvaLuokka,
    JSON.stringify({ auki: mitat.auki, kuva: mitat.kuvaPaperilla, onKuva: mitat.onKuvaLuokka }));

  vaadi(nimessa(`taustalla on ${TAUSTAKUVIA} ladattua kuvaa ja kierros on käynnissä`),
    mitat.kerroksia === TAUSTAKUVIA && mitat.ladattu === TAUSTAKUVIA
      && mitat.kaynnissa && mitat.ajotila === 'running',
    JSON.stringify({
      kerroksia: mitat.kerroksia, ladattu: mitat.ladattu,
      kaynnissa: mitat.kaynnissa, ajotila: mitat.ajotila,
    }));

  const paikallaan = mitat.jarjestys.length === 3
    && /avaus-peite/.test(mitat.jarjestys[0]) && /avaus-tausta/.test(mitat.jarjestys[1])
    && /avaus-kehys/.test(mitat.jarjestys[2]);
  vaadi(nimessa('tausta on mustan päällä ja paperin alla, reunat häipyvät mustaan'),
    paikallaan && Number(mitat.taustaZ) < Number(mitat.kehysZ)
      && /rgb\(0, 0, 0\)/.test(mitat.peiteVari) && /radial-gradient/.test(mitat.maski)
      && r.tausta.width >= mitat.avaus.width - 1 && r.tausta.height >= mitat.avaus.height - 1,
    JSON.stringify({
      jarjestys: mitat.jarjestys, z: [mitat.taustaZ, mitat.kehysZ], peite: mitat.peiteVari,
      maski: mitat.maski.slice(0, 48),
      tausta: [Math.round(r.tausta.width), Math.round(r.tausta.height)],
      avaus: [Math.round(mitat.avaus.width), Math.round(mitat.avaus.height)],
    }));

  vaadi(nimessa('taustakuvat ovat sumennettuja ja tummennettuja'),
    /blur\(3px\)/.test(mitat.suodatin) && /brightness\(0\.55\)/.test(mitat.suodatin),
    mitat.suodatin);

  /*
   * KEN BURNS: NÄKYVÄ kerros on sekunnin päästä eri kohdassa. Kerrosta ei
   * saa poimia järjestysnumerolla — kierros on 39 s pitkä, ja mikä tahansa
   * yksittäinen kerros on suurimman osan ajasta häivytettynä ja siis
   * paikallaan (liike kestää vain sen 8 s, jonka kuva näkyy).
   */
  const liike = await sivu.evaluate(async () => {
    const nakyva = () => [...document.querySelectorAll('.aikajana-avaus-taustakuva')]
      .map((el) => ({ el, op: Number(getComputedStyle(el).opacity) }))
      .sort((a, b) => b.op - a.op)[0];
    const kerros = nakyva();
    const lue = () => getComputedStyle(kerros.el).transform;
    const ennen = lue();
    await new Promise((r2) => setTimeout(r2, 1000));
    return { ennen, jalkeen: lue(), peittavyys: kerros.op };
  });
  vaadi(nimessa('Ken Burns -liike etenee (näkyvän kerroksen transform muuttuu sekunnissa)'),
    liike.ennen !== liike.jalkeen && liike.ennen !== 'none' && liike.peittavyys > 0.5,
    `${liike.ennen} → ${liike.jalkeen} (opacity ${liike.peittavyys})`);

  const sisalto = mitat.tekstinSisalto.trim();
  vaadi(nimessa('teksti ei ala muodolla "Tulet seuraavaksi" ja päättyy maapallo-lauseeseen'),
    !/^Tulet seuraavaksi/i.test(sisalto)
      && sisalto.endsWith('tuhat sukupolvea myöhemmin oltiin toisella puolella maapalloa.'),
    `${sisalto.slice(0, 42)}… (${sisalto.length} merkkiä)`);

  vaadi(nimessa('otsikko on isommalla kuin leipäteksti'),
    /Ihmisen matka/i.test(mitat.otsikkoTeksti) && mitat.otsikkoKoko > mitat.tekstinKoko * 1.25,
    JSON.stringify({ otsikko: mitat.otsikkoKoko, teksti: mitat.tekstinKoko }));

  vaadi(nimessa('Käynnistä on kortin viimeinen ja alin elementti'),
    /avaus-nappi/.test(mitat.viimeinen) && r.nappi.top >= r.teksti.bottom - 1
      && r.nappi.top >= r.otsikko.bottom - 1 && r.nappi.bottom <= r.laatikko.bottom + 1,
    JSON.stringify({
      viimeinen: mitat.viimeinen, nappiTop: Math.round(r.nappi.top),
      tekstiBottom: Math.round(r.teksti.bottom), laatikkoBottom: Math.round(r.laatikko.bottom),
    }));

  vaadi(nimessa('paperi mahtuu ruutuun kokonaan'),
    r.kehys.left >= -1 && r.kehys.right <= mitat.ruutu.w + 1
      && r.kehys.top >= -1 && r.kehys.bottom <= mitat.ruutu.h + 1,
    JSON.stringify({ kehys: [Math.round(r.kehys.width), Math.round(r.kehys.height)], ruutu: mitat.ruutu }));

  /*
   * KÄYNNISTÄ: tausta pysähtyy ja häipyy samalla kun paperi väistyy. Tilaa
   * seurataan silmukassa eikä yhdellä otoksella: häivytys kestää 550 ms ja
   * koko kerros irrotetaan 700 ms:n kohdalla (AVAUS_POISTUMA_MS), joten
   * yksi kiinteä odotus osuu milloin mihinkin kohtaan.
   */
  const jalkeen = await sivu.evaluate(async () => {
    const kerros = document.querySelector('.aikajana-avaus-taustakuva');
    const ajotilat = new Set();
    document.querySelector('.aikajana-avaus-nappi')?.click();
    let pois = false;
    let peittavyys = 1;
    for (let i = 0; i < 30; i += 1) {
      await new Promise((r2) => setTimeout(r2, 60));
      pois = pois || Boolean(document.querySelector('.aikajana-avaus.pois'));
      if (kerros.isConnected) ajotilat.add(getComputedStyle(kerros).animationPlayState);
      const tausta = document.querySelector('.aikajana-avaus-tausta');
      peittavyys = tausta ? Number(getComputedStyle(tausta).opacity) : 0;
      if (!tausta || peittavyys <= 0.05) break;
    }
    return { pois, peittavyys, ajotilat: [...ajotilat] };
  });
  vaadi(nimessa('Käynnistä pysäyttää ja häivyttää taustan'),
    jalkeen.pois && !jalkeen.ajotilat.includes('running') && jalkeen.peittavyys <= 0.05,
    JSON.stringify(jalkeen));

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
