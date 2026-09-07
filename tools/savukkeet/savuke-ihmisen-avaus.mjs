/*
 * SELAINSAVUKE: IHMISEN MATKAN AVAUSLAATIKKO (teksti + kuva rinnalla).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ihmisen-avaus.mjs
 *
 * OMISTAJAN TILAUS 7.9.2026 ilta, sanatarkasti: *"Tästä
 * aloitustekstistä voi poistaa kaiken tekstin lauseen, joka loppuu:
 * 'Tuhat sukupolvea myöhemmin oltiin toisella puolella maapalloa',
 * niin sen jälkeen koko lopputeksti pois. Mutta tuohon tekstin
 * rinnalle voisi nostaa jonkun hienon kuvan, mitä jo on generoitu
 * tuohon tuota linssiä varten, ja samalla voisi tehdä suuremmaksi tuon
 * Itse paperin, missä tuo teksti on, jotta se kuvakin mahtuu
 * paremmin."* (Raamattu › "IHMISEN MATKAN AVAUSTEKSTI LYHYEKSI, KUVA
 * RINNALLE").
 *
 * MIKSI OMA SAVUKE. tools/savukkeet/savuke-aikajana.mjs ajaa koko
 * kaaren minuutissa ja toteaa avausjaksosta vain, että Käynnistä-nappi
 * on olemassa. Tässä mitataan ASETTELU, joka rikkoutuu hiljaa:
 * yksikkötesti näkee tekstin ja luokat, muttei sitä, seisovatko teksti
 * ja kuva vierekkäin, mahtuuko nappi niiden alle vai valuuko paperi
 * ruudun ulkopuolelle. Ajo pysähtyy avauslaatikkoon eikä paina
 * Käynnistä-nappia — koko esitys on jo savuke-aikajanan asia.
 *
 * NÄKYMÄT (omistajan laitteet): iPad 834 × 1100 ja iPhone 390 × 844.
 * Työpöytä on iPadin kanssa sama haara (kaksi palstaa), puhelin on
 * `@media (max-width: 640px)` -haara (yksi palsta, kuva ylhäällä).
 *
 * VÄITTEET:
 *   1. Laatikko avautuu ja siinä on `.on-kuva`-luokka (kehys ja
 *      paperi) — muutos on rajattu tähän kaareen, ei jaettuun css:ään.
 *   2. Teksti päättyy omistajan lauseeseen "...toisella puolella
 *      maapalloa." eikä siinä ole enää kartan lukuohjetta.
 *   3. Kuva on ladattu (naturalWidth > 0) ja näkyvissä, kuvateksti
 *      pienemmällä kuin leipäteksti.
 *   4. ASETTELU: iPadilla kuva on tekstin RINNALLA (palstat menevät
 *      vaakasuunnassa limittäin ajassa 0 ja pystysuunnassa päällekkäin),
 *      puhelimessa kuva on tekstin YLÄPUOLELLA (yksi palsta).
 *   5. Paperi on SUUREMPI kuin vanha min(31rem, 88%) = 496 px, mutta
 *      mahtuu ruutuun; koko laatikko on näkyvissä pystysuunnassa.
 *   6. Käynnistä-nappi on ruudukon ALLA ja vaakasuunnassa keskellä
 *      paperia.
 *   7. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET: savuke-ihmisen-avaus-<nakyma>.png kansioon
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

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1) — pallo ja avauskuva. */
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

/** Omistajan kaksi laitetta. iPad on sama haara kuin työpöytä. */
const NAKYMAT = {
  ipad: { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
};

/** Vanha paperin leveys: min(31rem, 88%) = 496 px isolla ruudulla. */
const VANHA_LEVEYS_PX = 496;

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virhelista) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  // Ämpäri (Globe.gl, laatat JA avauslaatikon havainnekuva) Noden kautta.
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

  // Linssi laukusta; avausjakso jää auki (Käynnistä-nappia EI paineta).
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
   * KUVA ODOTETAAN PERILLE ennen mittausta: havainnekuva tulee
   * ämpäristä Noden fetchin kautta, ja ensimmäisellä kierroksella
   * (kylmä välimuisti) se saapuu vasta parin sekunnin kuluttua.
   * Kiinteä odotus kuvasi tyhjän kehyksen.
   */
  await sivu.waitForFunction(() => {
    const img = document.querySelector('.aikajana-avaus-kuva img');
    return Boolean(img && img.complete && img.naturalWidth > 0);
  }, null, { timeout: 30000 }).catch(() => null);
  await sivu.waitForTimeout(600);
  await sivu.screenshot({ path: join(ULOS, `savuke-ihmisen-avaus-${nakyma}.png`) });

  const mitat = await sivu.evaluate(() => {
    const laatuun = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
    const kehys = document.querySelector('.aikajana-avaus-kehys');
    const laatikko = document.querySelector('.aikajana-avaus-laatikko');
    const teksti = document.querySelector('.aikajana-avaus-teksti');
    const kuvakehys = document.querySelector('.aikajana-avaus-kuva');
    const img = document.querySelector('.aikajana-avaus-kuva img');
    const selite = document.querySelector('.aikajana-avaus-kuvateksti');
    const nappi = document.querySelector('.aikajana-avaus-nappi');
    const koko = (el) => (el ? parseFloat(getComputedStyle(el).fontSize) : null);
    return {
      auki: Boolean(document.querySelector('.aikajana-avaus.laatikko-nakyy')),
      kehysLuokka: kehys?.classList.contains('on-kuva') ?? false,
      laatikkoLuokka: laatikko?.classList.contains('on-kuva') ?? false,
      tekstinSisalto: teksti?.textContent ?? '',
      kuvaLadattu: Boolean(img && img.naturalWidth > 0),
      kuvaOsoite: img?.currentSrc ?? img?.src ?? null,
      seliteTeksti: selite?.textContent ?? '',
      tekstinKoko: koko(teksti),
      seliteKoko: koko(selite),
      palstoja: kuvakehys ? getComputedStyle(kuvakehys.parentElement).gridTemplateColumns.split(' ').length : 0,
      r: {
        kehys: laatuun(kehys), laatikko: laatuun(laatikko), teksti: laatuun(teksti),
        kuva: laatuun(kuvakehys), nappi: laatuun(nappi),
      },
      ruutu: { w: window.innerWidth, h: window.innerHeight },
    };
  });

  const { r } = mitat;
  vaadi(nimessa('avauslaatikko on auki ja merkitty kuvalliseksi (.on-kuva)'),
    mitat.auki && mitat.kehysLuokka && mitat.laatikkoLuokka,
    JSON.stringify({ auki: mitat.auki, kehys: mitat.kehysLuokka, laatikko: mitat.laatikkoLuokka }));

  const paattyy = mitat.tekstinSisalto.trim()
    .endsWith('tuhat sukupolvea myöhemmin oltiin toisella puolella maapalloa.');
  vaadi(nimessa('teksti päättyy omistajan lauseeseen eikä selitä karttaa'),
    paattyy && !/vana|Harmaa|Löytöpaikat/.test(mitat.tekstinSisalto),
    `…${mitat.tekstinSisalto.trim().slice(-64)}`);

  vaadi(nimessa('kuva on ladattu ja kuvateksti pienempi kuin leipäteksti'),
    mitat.kuvaLadattu && r.kuva?.width > 120 && mitat.seliteTeksti.length > 5
      && mitat.seliteKoko < mitat.tekstinKoko,
    JSON.stringify({
      osoite: mitat.kuvaOsoite, leveys: Math.round(r.kuva?.width ?? 0),
      selite: mitat.seliteTeksti.slice(0, 48), koot: [mitat.tekstinKoko, mitat.seliteKoko],
    }));

  /*
   * ASETTELU. Vierekkäin = laatikot menevät PYSTYSUUNNASSA päällekkäin
   * mutta eivät vaakasuunnassa; päällekkäin = päinvastoin. Yksi mitta
   * kelpaa kumpaankin haaraan, joten sama vartija tunnistaa myös sen,
   * jos media query putoaa pois.
   */
  const vaakaLimi = Math.min(r.teksti.right, r.kuva.right) - Math.max(r.teksti.left, r.kuva.left);
  const pystyLimi = Math.min(r.teksti.bottom, r.kuva.bottom) - Math.max(r.teksti.top, r.kuva.top);
  if (nakyma === 'puhelin') {
    vaadi(nimessa('kuva on tekstin YLÄPUOLELLA (yksi palsta)'),
      r.kuva.bottom <= r.teksti.top + 1 && vaakaLimi > 40 && mitat.palstoja === 1,
      JSON.stringify({ vaakaLimi: Math.round(vaakaLimi), palstoja: mitat.palstoja }));
  } else {
    vaadi(nimessa('kuva on tekstin RINNALLA (kaksi palstaa)'),
      vaakaLimi <= 0 && pystyLimi > 60 && mitat.palstoja === 2,
      JSON.stringify({
        vaakaLimi: Math.round(vaakaLimi), pystyLimi: Math.round(pystyLimi), palstoja: mitat.palstoja,
      }));
  }

  const mahtuu = r.kehys.left >= -1 && r.kehys.right <= mitat.ruutu.w + 1
    && r.kehys.top >= -1 && r.kehys.bottom <= mitat.ruutu.h + 1;
  if (nakyma === 'puhelin') {
    vaadi(nimessa('paperi mahtuu ruutuun kokonaan'), mahtuu,
      JSON.stringify({ kehys: [Math.round(r.kehys.width), Math.round(r.kehys.height)], ruutu: mitat.ruutu }));
  } else {
    vaadi(nimessa(`paperi on suurempi kuin vanha ${VANHA_LEVEYS_PX} px ja mahtuu ruutuun`),
      r.kehys.width > VANHA_LEVEYS_PX && mahtuu,
      JSON.stringify({ leveys: Math.round(r.kehys.width), korkeus: Math.round(r.kehys.height), ruutu: mitat.ruutu }));
  }

  const nappiKeskella = Math.abs(
    (r.nappi.left + r.nappi.right) / 2 - (r.laatikko.left + r.laatikko.right) / 2,
  ) < 12;
  vaadi(nimessa('Käynnistä-nappi on ruudukon alla keskellä'),
    r.nappi.top >= r.kuva.bottom - 1 && r.nappi.top >= r.teksti.bottom - 1 && nappiKeskella
      && r.nappi.bottom <= r.laatikko.bottom + 1,
    JSON.stringify({
      nappiTop: Math.round(r.nappi.top), kuvaBottom: Math.round(r.kuva.bottom),
      tekstiBottom: Math.round(r.teksti.bottom), keskella: nappiKeskella,
    }));

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
