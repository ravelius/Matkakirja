/*
 * Savuke: KAUPUNGIN ISO POP-UP JA TURISTI-INFO PALLOLLA (karttauudistus
 * erä 4, 13.9.2026; js/kaupunkinosto.js, js/pallolauta/lauta.js).
 *
 * Omistaja 13.9.2026 (Raamattu, osio "Kaupungit": KARTTAUUDISTUS,
 * sanatarkasti): *"Kaupunkia klikkaamalla pelaajalle avautuu isossa pop
 * up ikkunassa Kaupunkilehden herokuvat ja esittelyteksti sekä
 * nähtävyyskartta. Kaupungin viereen kartalle tulee oma 'turisti info'
 * merkki ja teksti ja sitä klikkaamalla avautuu pelkkä nykyisen lehden
 * tursti ja matkustusopas omassa pop upissa."*
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: sisällön lähteet ovat tarkistettavissa
 * ilman selainta, mutta koko erän lupaus on GEOMETRIAA JA OSUMIA —
 * kaupungin merkin on otettava napautus pallon pinnalta, turisti-infon
 * merkin on oltava kaupungin VIERESSÄ eikä päällä, kortin on aukeavaa
 * merkin ruutupisteeseen ja pysyttävä ruudulla, ja kohdekartan zoomin on
 * toimittava kortin sisällä. Sitä ei voi mitata ilman oikeaa asettelua
 * eikä ilman oikeita napautuksia.
 *
 * NAPAUTUKSET OVAT AITOJA: sormi osuu kankaaseen siinä ruutupisteessä,
 * johon merkki projisoituu (pallo.getScreenCoords), eikä savuke kutsu
 * avaajia suoraan. Juuri siksi vastakoe 2 (merkin kytkennän riisuminen)
 * kaataa tämän ajon.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. KAUPUNGIN NAPAUTUS AVAA ISON POP-UPIN. Pariisissa kortissa on
 *      herokuvat, esittelyteksti ja kohdekartta; kortti on karttaruudun
 *      sisällä.
 *   2. ESITTELYTEKSTI TÄSMÄÄ LEHTIDATAAN MERKILLEEN. Kortin teksti on
 *      merkki merkiltä sama kuin ARTIKKELIT[kaupunki].intro (lihavoinnin
 *      merkinnät ja kappalerajat poistettuina, kuten piirraLeipateksti
 *      ne latoo). Tämä on erän tärkein vartio: pop-up ei saa keksiä
 *      yhtään uutta tekstiä.
 *   3. KOHDEKARTAN ZOOM TOIMII KORTIN SISÄLLÄ: plus-näppäin suurentaa
 *      lavaa ja kehys saa luokan `zoomattu`, nolla palauttaa.
 *   4. KORTTI SULKEUTUU rastista (iso) ja Escapesta (turisti-info).
 *   5. TURISTI-INFON MERKKI ON KAUPUNGIN VIERESSÄ, EI PÄÄLLÄ: merkin
 *      ruutupiste on erillään kaupunkipisteestä, ja sen napautus avaa
 *      kortin, jossa on PELKKÄ matkailijalle-lohko — ei herokuvia, ei
 *      kohdekarttaa.
 *   6. MERKKI SKAALAUTUU ZOOMATESSA (PAATOKSET 2): lähikuvassa merkin
 *      mittakaava on suurempi kuin maan näkymässä.
 *   7. MOLEMMAT KAUPUNGIT: sama kulku Pariisissa (paksu lehti) ja
 *      Marseillessa (ohut lehti).
 *   8. PULU JÄÄ PÄÄLLE: kuplapinon kehys on korkeammalla kerroksella
 *      kuin kortti, eikä kortti peitä sitä.
 *   9. VASTAKOE 1 (ajetaan tässä samassa ajossa): Marseillen herokuvat
 *      poistetaan lehtidatasta, kortti avataan uudelleen — kortin on
 *      auettava JA hero-lohkon korkeuden on oltava 0 px. Ilman
 *      `hero.hidden`-sääntöä lohko jäisi korttiin tyhjänä kehyksenä.
 *
 * VASTAKOE 2 (ajetaan käsin, kirjataan raporttiin): poista
 * js/pallolauta/lauta.js:n paivitaTuristiInfo-datumin `napautus`-kenttä
 * → vartiot 5 ja 7 punaisiksi.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-kaupunkipopup.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ARTIKKELIT } from '../../js/sisaltotaulut.js';
import { KULTTUURI_KATEGORIAT } from '../../js/packs/kulttuuri-kategoriat.js';
import { NOSTOSYM_MITAN_KATTO } from '../../js/fokusnosto-symbolit.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Pilotti: Pariisi (9 osastoa) ja Marseille (2 osastoa, ohut lehti). */
const KAUPUNGIT = [
  { id: 'pariisi', nimi: 'Pariisi', lat: 48.86, lng: 2.35 },
  { id: 'marseille', nimi: 'Marseille', lat: 43.3, lng: 5.37 },
];
/** Kaksi ruutua: puhelin ja työpöytä (valmis-kriteeri). */
const RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];

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

const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

/**
 * ODOTETTU ESITTELYTEKSTI suoraan lehtidatasta — sama kaava kuin
 * js/ui-apurit.js piirraLeipateksti latoo: kappaleet peräkkäin ilman
 * erotinta, lihavoinnin tähdet pois.
 */
const odotettuEsittely = (nimi) => (ARTIKKELIT[nimi]?.intro ?? '')
  .split('\n\n').map((k) => k.trim()).filter(Boolean).join('')
  .replaceAll('**', '');

/** Kansiosasto lehtidatasta — vartio 9 tarvitsee tietää, mitä poistetaan. */
const kansiOsasto = (id) => (KULTTUURI_KATEGORIAT[id] ?? []).find((k) => k.id === 'kaupunki');

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/* ---------------------------------------------------------------- ajo */

for (const ruutu of RUUDUT) {
  for (const kaupunki of KAUPUNGIT) {
    const peli = new Game({
      players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki.id }],
      pack: packById('maailmankartta'),
      seed: 5,
    });
    peli.phase = 'action';
    // Laatta käännetyksi: lehtilukko auki ja Liiku-nappi näkyvissä
    // (js/ui.js) — sama tallennemalli kuin muissa pallosavukkeissa.
    peli.tokens.delete(kaupunki.id);
    const tallenne = JSON.stringify(peli.toJSON());

    const ctx = await selain.newContext({
      viewport: { width: ruutu.width, height: ruutu.height },
      deviceScaleFactor: ruutu.dpr,
      serviceWorkers: 'block',
    });
    await ctx.addInitScript((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, tallenne);
    const sivu = await ctx.newPage();
    const virheet = [];
    sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
    await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
    await sivu.route(/wikimedia\.org/, (r) => r.abort());
    await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
      const v = await ampariHaku(route.request().url());
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200,
        contentType: v.tyyppi ?? 'application/octet-stream',
        body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
    const tunnus = `${kaupunki.nimi} @ ${ruutu.nimi}`;
    await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
    const auki = await sivu
      .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
      .then(() => true).catch(() => false);
    vaadi(`${tunnus}: pallolauta aukesi`, auki, virheet.join(' | '));
    if (!auki) { await ctx.close(); continue; }
    await sivu.waitForTimeout(3500);

    /* --- vartio 6: merkin mittakaava kasvaa lähikuvassa ---------------
     *
     * VERTAILU TEHDÄÄN OIKEASTA SAAPUMISNÄKYMÄSTÄ (l.saavu), ei arvatusta
     * korkeudesta: juuri siitä näkymästä mittakaava on laskettu (maan
     * laatikko × 1,15), ja saapumisajo on myös se, joka lämmittää
     * laatikkomuistin. Lähikuva on kymmenesosa siitä.
     */
    const mitat = await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      const lue = () => l.pallo.htmlElementsData()
        .find((d) => d.laji === 'turistiinfo')?.mitta ?? null;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1200));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 300));
      const maanNakyma = lue();
      const korkeus = l.pallo.pointOfView().altitude;
      l.pallo.pointOfView({ altitude: korkeus / 8 }, 0);
      await new Promise((v) => setTimeout(v, 1200));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 300));
      const lahikuva = lue();
      return { maanNakyma, lahikuva, korkeus };
    });
    tieto(`${tunnus}: saapumiskorkeus`, mitat.korkeus?.toFixed?.(3) ?? mitat.korkeus);
    tieto(`${tunnus}: merkin mitta (maa / lähi)`,
      `${mitat.maanNakyma} / ${mitat.lahikuva}`);
    /*
     * KATTO ON OSA SÄÄNTÖÄ (PAATOKSET 31 TARKENNUS 1 kohta 3,
     * 16.9.2026). Merkki skaalautuu yhä kuin painettu kartta, mutta
     * enintään ruutupikselikattoon asti (js/fokusnosto-symbolit.js
     * NOSTOSYM_MITAN_KATTO): sen yläpuolella se seisoo, jottei kyltti
     * leikkaudu ruudun laidasta. MITATTU 16.9.2026: puhelimella
     * (390 × 844) Pariisin ja Marseillen kyltti on jo SAAPUMISNÄKYMÄSSÄ
     * katossa (1,4545), koska sen vertailuleveys on maan laatikko × 1,15
     * eikä laitteen oma näkymä — työpöydällä samassa näkymässä mitta on
     * 0,75. Väite on siis kaksiosainen: mitta ei koskaan ylitä kattoa,
     * ja se kasvaa lähikuvassa AINA kun katto ei jo pure.
     */
    const kattoPurree = mitat.maanNakyma >= NOSTOSYM_MITAN_KATTO - 1e-6;
    vaadi(`${tunnus}: merkki skaalautuu zoomatessa (katto ${NOSTOSYM_MITAN_KATTO.toFixed(4)})`,
      Number.isFinite(mitat.maanNakyma) && Number.isFinite(mitat.lahikuva)
      && mitat.lahikuva <= NOSTOSYM_MITAN_KATTO + 1e-6
      && (kattoPurree
        ? mitat.lahikuva === mitat.maanNakyma
        : mitat.lahikuva > mitat.maanNakyma),
      `mitat ${JSON.stringify(mitat)}${kattoPurree ? ' (katto puree jo maan näkymässä)' : ''}`);

    // Napautukset tehdään SAAPUMISNÄKYMÄSTÄ: se on se näkymä, jossa
    // pelaaja kaupunkiin saapuu, ja siinä merkki on suunnitellun
    // etäisyyden päässä kaupunkipisteestä.
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1400));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 350));
    });

    /*
     * RUUTUPISTEET LUETAAN AINA TUOREENA. Kaupungin napautus ajaa kameran
     * kaupungin ylle (js/pallolauta/lauta.js napautaKaupunki), joten
     * ensimmäisen napautuksen jälkeen vanha ruutupiste osoittaa väärään
     * paikkaan — mitattu 13.9.2026: toinen napautus samaan pisteeseen ei
     * osunut enää mihinkään.
     */
    const kaupunkiPiste = () => sivu.evaluate((id) => {
      const l = window.matkakirja.ui.pallolauta;
      const k = l.kaupunki(id);
      if (!k) return null;
      const p = l.pallo.getScreenCoords(k.lat, k.lon, 0);
      const r = l.kotelo.getBoundingClientRect();
      return p ? { x: r.left + p.x, y: r.top + p.y } : null;
    }, kaupunki.id);
    /** Turisti-infon merkin ruutupiste (datum `avattavat`-luettelosta). */
    const infoPiste = () => sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const d = l.merkit.avattavat().find((x) => x.laji === 'turistiinfo');
      if (!d) return null;
      const p = l.pallo.getScreenCoords(d.lat, d.lng, 0);
      const r = l.kotelo.getBoundingClientRect();
      return p ? { x: r.left + p.x, y: r.top + p.y, lat: d.lat, lng: d.lng } : null;
    });

    /* --- vartio 5a: merkki on kaupungin VIERESSÄ (sama hetki) --------- */
    const kaupunkiAlussa = await kaupunkiPiste();
    const merkkiAlussa = await infoPiste();
    vaadi(`${tunnus}: kaupunkipiste on ruudulla`, Boolean(kaupunkiAlussa));
    vaadi(`${tunnus}: turisti-info-merkki on kartalla`, Boolean(merkkiAlussa),
      'merkkiä ei löytynyt avattavista');
    if (kaupunkiAlussa && merkkiAlussa) {
      const etaisyys = Math.hypot(merkkiAlussa.x - kaupunkiAlussa.x,
        merkkiAlussa.y - kaupunkiAlussa.y);
      tieto(`${tunnus}: merkin etäisyys kaupunkipisteestä`, `${etaisyys.toFixed(1)} px`);
      vaadi(`${tunnus}: merkki on kaupungin VIERESSÄ, ei päällä`, etaisyys > 24,
        `${etaisyys.toFixed(1)} px`);
      const teksti = await sivu.evaluate(() => document
        .querySelector('.pallolauta-turisti-info .nostosym-rasteri')?.dataset?.nimio
        ?? document.querySelector('.pallolauta-turisti-info')?.getAttribute('aria-label') ?? '');
      tieto(`${tunnus}: merkin teksti`, teksti);
      vaadi(`${tunnus}: merkissä on teksti`, /Turisti-info/i.test(teksti), teksti);
    }

    /* --- vartio 1, 2, 3, 4: ISO POP-UP (PAATOKSET 10: tiivistetty) ---- */
    if (kaupunkiAlussa) {
      await sivu.mouse.click(kaupunkiAlussa.x, kaupunkiAlussa.y);
      await sivu.waitForTimeout(900);
    }
    const iso = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-kaupunki');
      if (!p) return null;
      const pane = document.querySelector('.map-pane').getBoundingClientRect();
      const r = p.getBoundingClientRect();
      const hero = p.querySelector('.kaupunkipopup-hero');
      const kartta = p.querySelector('.kaupunkipopup-kartta .kartta-kehys');
      return {
        otsikko: p.querySelector('.kaupunkipopup-otsikko')?.textContent ?? '',
        esittely: p.querySelector('.arrival-intro')?.textContent ?? '',
        heroKorkeus: hero ? Math.round(hero.getBoundingClientRect().height) : -1,
        kuvia: p.querySelectorAll('.kaupunkipopup-hero img').length,
        kartta: Boolean(kartta),
        kohteita: p.querySelectorAll('.kaupunkikartta .maakartta-piste').length,
        ruudulla: r.left >= pane.left - 1 && r.right <= pane.right + 1
          && r.top >= pane.top - 1 && r.bottom <= pane.bottom + 1,
        lehtiOvi: Boolean(p.querySelector('.kaupunkipopup-lehti')),
      };
    });
    vaadi(`${tunnus}: iso pop-up aukesi`, Boolean(iso), virheet.join(' | '));
    if (iso) {
      vaadi(`${tunnus}: otsikko on kaupungin nimi`, iso.otsikko === kaupunki.nimi, iso.otsikko);
      vaadi(`${tunnus}: herokuvat kortissa`, iso.kuvia > 0 && iso.heroKorkeus > 0,
        `kuvia ${iso.kuvia}, korkeus ${iso.heroKorkeus}`);
      const odotettu = odotettuEsittely(kaupunki.nimi);
      vaadi(`${tunnus}: esittelyteksti täsmää lehtidataan merkilleen`,
        odotettu.length > 0 && iso.esittely === odotettu,
        `kortissa ${iso.esittely.length} merkkiä, datassa ${odotettu.length}`);
      vaadi(`${tunnus}: kohdekartta kortissa`, iso.kartta && iso.kohteita > 0,
        `kehys ${iso.kartta}, kohteita ${iso.kohteita}`);
      vaadi(`${tunnus}: kortti on karttaruudun sisällä`, iso.ruudulla);
      /*
       * ALAOSAN NAVIGOINTI ON POISSA (PAATOKSET 10, omistaja 14.9.2026:
       * *"ilman matkailu liitetta ja alaosan navigointia"*): kaupungin
       * napautus avaa tiivistetyn etusivun (js/kaupunkinosto.js
       * latoTiivisEtusivu), jossa vanhaa ovea kaupunkilehteen ei enää
       * ole. Vartio kääntyi siis päinvastoin — ennen se vaati oven,
       * nyt se vaatii, ettei sitä ole. Vanha `latoKaupunkiSisalto` ovineen
       * on yhä koodissa koskemattomana, mutta kartta ei avaa sitä.
       */
      vaadi(`${tunnus}: kortissa ei ole alaosan navigointia (PAATOKSET 10)`, !iso.lehtiOvi);
      tieto(`${tunnus}: kohdekartan kohteita`, iso.kohteita);
    }

    // Kuvakaappaus HETI avauksesta, ennen zoomia ja Pulun paneelia:
    // raporttikuvan on näytettävä kortti siinä asussa, jossa se aukeaa.
    if (KUVAKANSIO && ruutu.width === 390 && iso) {
      await sivu.screenshot({
        path: join(KUVAKANSIO, `karttauudistus-4-${kaupunki.id}-popup.png`),
        // CSS-pikseleinä: dpr 2 nelinkertaistaisi tiedostokoon, ja
        // raporttikuvan katto on 400 kt.
        scale: 'css',
      });
    }

    /* --- vartio 3: kohdekartan zoom ----------------------------------- */
    if (iso?.kartta) {
      /*
       * KERROIN LUETAAN MUUNNOKSESTA, EI PELKÄSTÄ LUOKASTA. `zoomattu`
       * kertoo vain, että tila vaihtui; lupaus on että KARTTA SUURENEE.
       * Kerrointa odotetaan (siirtymä on animoitu, js/karttazoom.js),
       * jottei mittaus osu liikkeen ensimmäiseen kehykseen — mitattu
       * 13.9.2026: 350 ms:n kiinteä odotus antoi kerran identiteetin.
       */
      const lueKerroin = () => sivu.evaluate(() => {
        const lava = document.querySelector('.kaupunkipopup-kartta .kartta-lava');
        const m = new DOMMatrixReadOnly(getComputedStyle(lava).transform);
        return m.a;
      });
      const ennen = await lueKerroin();
      await sivu.evaluate(() => {
        const kehys = document.querySelector('.kaupunkipopup-kartta .kartta-kehys');
        kehys.focus();
        kehys.dispatchEvent(new KeyboardEvent('keydown', { key: '+', bubbles: true }));
      });
      const kasvoi = await sivu.waitForFunction(() => {
        const lava = document.querySelector('.kaupunkipopup-kartta .kartta-lava');
        const m = new DOMMatrixReadOnly(getComputedStyle(lava).transform);
        return m.a > 1.05;
      }, null, { timeout: 3000 }).then(() => true).catch(() => false);
      const jalkeen = await lueKerroin();
      const zoomattu = await sivu.evaluate(() => document
        .querySelector('.kaupunkipopup-kartta .kartta-kehys').classList.contains('zoomattu'));
      tieto(`${tunnus}: kartan kerroin`, `${ennen.toFixed(2)} → ${jalkeen.toFixed(2)}`);
      vaadi(`${tunnus}: kohdekartan zoom toimii kortissa`, kasvoi && zoomattu,
        `kerroin ${jalkeen.toFixed(2)}, zoomattu ${zoomattu}`);
      await sivu.evaluate(() => {
        const kehys = document.querySelector('.kaupunkipopup-kartta .kartta-kehys');
        kehys.dispatchEvent(new KeyboardEvent('keydown', { key: '0', bubbles: true }));
      });
      const palasi = await sivu.waitForFunction(() => !document
        .querySelector('.kaupunkipopup-kartta .kartta-kehys').classList.contains('zoomattu'),
      null, { timeout: 3000 }).then(() => true).catch(() => false);
      vaadi(`${tunnus}: nolla palauttaa kartan`, palasi);
    }

    /* --- vartio 8: Pulu jää kortin päälle -----------------------------
     *
     * PULUN PANEELI AVATAAN OIKEASTI (valmis-kriteeri: *"Pulun chat ja
     * kuplat eivät jää pop-upin alle"*). Kaksi mittaa: paneelin kerros on
     * kortin kerrosta korkeampi, JA kortti on väistänyt paneelia
     * asettelussa (js/kaupunkinosto.js asemoiKaupunkipopup) eli laatikot
     * eivät leikkaa. Kuplapinon sääntö on samassa kerroksessa 40
     * (css/styles.css .pollo-kuplapino-kehys), joten sama mitta kattaa
     * kuplat — pinoa ei voi pakottaa esiin ilman pulun omaa viestiä.
     */
    await sivu.click('.pollo-nappi').catch(() => {});
    await sivu.waitForTimeout(900);
    const kerrokset = await sivu.evaluate(() => {
      const kortti = document.querySelector('.kaupunkipopup');
      const paneeli = document.querySelector('.pollo-paneeli');
      const limittyy = (a, b) => a.left < b.right && b.left < a.right
        && a.top < b.bottom && b.top < a.bottom;
      const kr = kortti?.getBoundingClientRect();
      const pr = paneeli && !paneeli.hidden ? paneeli.getBoundingClientRect() : null;
      return {
        kortti: kortti ? Number(getComputedStyle(kortti).zIndex) : null,
        paneeli: paneeli && !paneeli.hidden ? Number(getComputedStyle(paneeli).zIndex) : null,
        paneeliAuki: Boolean(pr && pr.width > 0),
        limittyy: Boolean(kr && pr && limittyy(kr, pr)),
      };
    });
    tieto(`${tunnus}: kerrokset (kortti / Pulun paneeli)`,
      `${kerrokset.kortti} / ${kerrokset.paneeli} (auki=${kerrokset.paneeliAuki})`);
    vaadi(`${tunnus}: Pulun paneeli on kortin päällä`,
      kerrokset.kortti !== null && kerrokset.paneeli !== null
      && kerrokset.paneeli > kerrokset.kortti,
      JSON.stringify(kerrokset));
    vaadi(`${tunnus}: kortti väistää Pulun paneelia`, !kerrokset.limittyy,
      JSON.stringify(kerrokset));
    // Paneeli kiinni, jotta seuraavat vartiot mittaavat puhtaan kartan.
    await sivu.click('.pollo-nappi').catch(() => {});
    await sivu.waitForTimeout(500);
    vaadi(`${tunnus}: kortti jäi auki Pulun napista`,
      await sivu.evaluate(() => Boolean(document.querySelector('.kaupunkipopup-kaupunki'))));

    /* --- vartio 4: rasti sulkee --------------------------------------- */
    await sivu.click('.kaupunkipopup-sulje').catch(() => {});
    await sivu.waitForTimeout(400);
    vaadi(`${tunnus}: rasti sulkee ison pop-upin`,
      await sivu.evaluate(() => !document.querySelector('.kaupunkipopup')));

    /* --- vartio 5b: TURISTI-INFON NAPAUTUS ---------------------------- */
    const merkki = await infoPiste();
    if (merkki) {
      await sivu.mouse.click(merkki.x, merkki.y);
      await sivu.waitForTimeout(600);
      const info = await sivu.evaluate(() => {
        const p = document.querySelector('.kaupunkipopup-info');
        if (!p) return null;
        return {
          otsikko: p.querySelector('.kaupunkipopup-otsikko')?.textContent ?? '',
          opas: Boolean(p.querySelector('.matkailijalle')),
          kappaleita: p.querySelectorAll('.matkailijalle .kaupunkikartta-esittely').length,
          hero: Boolean(p.querySelector('.kaupunkipopup-hero')),
          kartta: Boolean(p.querySelector('.kaupunkipopup-kartta')),
        };
      });
      vaadi(`${tunnus}: turisti-info aukesi napautuksesta`, Boolean(info), virheet.join(' | '));
      if (info) {
        vaadi(`${tunnus}: kortissa on matkustusopas`, info.opas && info.kappaleita > 0,
          JSON.stringify(info));
        vaadi(`${tunnus}: kortissa on PELKKÄ opas`, !info.hero && !info.kartta,
          JSON.stringify(info));
        if (KUVAKANSIO && ruutu.width === 390) {
          await sivu.screenshot({
            path: join(KUVAKANSIO, `karttauudistus-4-${kaupunki.id}-turisti-info.png`),
            scale: 'css',
          });
        }
      }
      await sivu.keyboard.press('Escape');
      await sivu.waitForTimeout(400);
      vaadi(`${tunnus}: Escape sulkee turisti-infon`,
        await sivu.evaluate(() => !document.querySelector('.kaupunkipopup')));
    }

    /* --- vartio 9: VASTAKOE — ohut lehti ilman herokuvia -------------- */
    if (kaupunki.id === 'marseille' && ruutu.width === 390) {
      const oli = kansiOsasto('marseille');
      tieto('vastakoe 1: Marseillen herokuvia datassa',
        `${oli?.kansikuvat?.length ?? 0} kansikuvaa, ${oli?.avauskuvat?.length ?? 0} avauskuvaa`);
      await sivu.evaluate(async () => {
        const m = await import('/js/packs/kulttuuri-kategoriat.js');
        const kansi = m.KULTTUURI_KATEGORIAT.marseille.find((k) => k.id === 'kaupunki');
        kansi.kansikuvat = [];
        kansi.avauskuvat = [];
        kansi.ennenNyt = null;
      });
      const poisto = await sivu.evaluate(async () => {
        const m = await import('/js/packs/kulttuuri-kategoriat.js');
        const kansi = m.KULTTUURI_KATEGORIAT.marseille.find((k) => k.id === 'kaupunki');
        return { kansikuvat: kansi.kansikuvat.length, avauskuvat: kansi.avauskuvat?.length ?? 0 };
      });
      tieto('vastakoe 1: datassa poiston jälkeen',
        `${poisto.kansikuvat} kansikuvaa, ${poisto.avauskuvat} avauskuvaa`);
      const uusi = await kaupunkiPiste();
      if (uusi) {
        await sivu.mouse.click(uusi.x, uusi.y);
        await sivu.waitForTimeout(900);
      }
      const tila = await sivu.evaluate(() => {
        const ui = window.matkakirja.ui;
        return {
          kortteja: document.querySelectorAll('.kaupunkipopup').length,
          busy: Boolean(ui.busy),
          dead: Boolean(ui.dead),
          vaihe: ui.game?.phase ?? '',
          arkki: Boolean(document.querySelector('#arrival-dialog[open]')),
        };
      });
      tieto('vastakoe 1: tila napautuksen jälkeen', JSON.stringify(tila));
      const kuvaton = await sivu.evaluate(() => {
        const p = document.querySelector('.kaupunkipopup-kaupunki');
        if (!p) return null;
        const hero = p.querySelector('.kaupunkipopup-hero');
        return {
          hero: hero ? Math.round(hero.getBoundingClientRect().height) : -1,
          piilossa: hero ? hero.hidden : null,
          esittely: (p.querySelector('.arrival-intro')?.textContent ?? '').length,
          kartta: Boolean(p.querySelector('.kaupunkipopup-kartta .kartta-kehys')),
        };
      });
      vaadi('vastakoe 1: kuvaton kaupunki avaa pop-upin silti', Boolean(kuvaton),
        virheet.join(' | '));
      if (kuvaton) {
        tieto('vastakoe 1: hero-lohkon korkeus', `${kuvaton.hero} px (hidden=${kuvaton.piilossa})`);
        vaadi('vastakoe 1: hero-lohko ei jätä tyhjää tilaa',
          kuvaton.hero === 0 && kuvaton.piilossa === true,
          `korkeus ${kuvaton.hero}, hidden ${kuvaton.piilossa}`);
        vaadi('vastakoe 1: esittely ja kartta ovat yhä kortissa',
          kuvaton.esittely > 100 && kuvaton.kartta, JSON.stringify(kuvaton));
      }
      await sivu.keyboard.press('Escape');
    }

    const kaatui = virheet.filter((v) => !/globe|WebGL|texture/i.test(v));
    vaadi(`${tunnus}: ei sivuvirheitä`, kaatui.length === 0, kaatui.join(' | '));
    await ctx.close();
  }
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
