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
import { NOSTOSYM_MITAN_KATTO, NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
import { KAUPUNKIMERKIN_NIMIO_PX } from '../../js/pallolauta/nostot.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
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
const KAIKKI_RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];
/*
 * YKSI RUUTU KERRALLAAN: `SAVUKE_RUUTU=390` tai `SAVUKE_RUUTU=1400`
 * (sama muuttujan nimi kuin savuke-pariisi-lahizoom.mjs:ssä). Ilman
 * muuttujaa ajetaan molemmat, kuten ennenkin. Julkaisusarja jakaa tämän
 * savukkeen kahdeksi rinnakkaiseksi riviksi tällä muuttujalla
 * (tools/savukkeet/sarjat.json, `#390` ja `#1400`) — omistaja 18.9.2026,
 * Raamattu AGENTIT ... TARKENNUS 9/10: PR-portin seinäkello on niin
 * pitkä kuin sarjan pisin savuke.
 */
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.width) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;
if (!RUUDUT.length) {
  console.log(`FAIL  SAVUKE_RUUTU=${process.env.SAVUKE_RUUTU} ei vastaa yhtäkään ruutua (390, 1400)`);
  process.exit(1);
}

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

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

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
     * SAMA KERROIN KUIN MUILLA MERKEILLÄ, SAMA KATTO (omistaja
     * 17.9.2026 klo 03.30 UTC, Raamattu KARTTAUUDISTUKSEN PAATOKSET 31
     * TARKENNUS 2 kohta 5, kortti *"Sama kerroin kuin muilla"*).
     *
     * ENNEN: kyltin vertailuleveys oli maan laatikko × 1,15 eikä
     * laitteen oma saapumisnäkymä, joten sama pelitilanne antoi
     * puhelimella (390 × 844) jo saapuessa katon 1,4545 ja työpöydällä
     * lattian 0,75 — mitattu 16.9.2026 Pariisissa ja Marseillessa.
     * Väitteessä piti siksi olla haara "katto puree jo maan näkymässä".
     *
     * NYT mitta tulee samasta funktiosta kuin kaupunkimerkillä
     * (js/pallolauta/nostot.js nostonMitta(KAUPUNKIMERKIN_KERROIN)), eli
     * saapumisnäkymässä TÄSMÄLLEEN KAUPUNKIMERKIN_NIMIO_PX (11,5 px)
     * molemmilla ruuduilla ja lähikuvassa katossa (16 px). Haara on
     * poissa, koska sen ehto ei voi enää toteutua: saapumismitta on
     * 1,0455 < 1,4545.
     */
    const saapumisenMitta = KAUPUNKIMERKIN_NIMIO_PX / NOSTOSYM_NIMIO_KOKO;
    tieto(`${tunnus}: merkin nimiö ruudulla (maa / lähi)`,
      `${(mitat.maanNakyma * NOSTOSYM_NIMIO_KOKO).toFixed(2)} px / `
      + `${(mitat.lahikuva * NOSTOSYM_NIMIO_KOKO).toFixed(2)} px`);
    tieto(`${tunnus}: VANHENTUNUT VARTIO (merkki skaalautuu zoomatessa)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
    tieto(`${tunnus}: VANHENTUNUT VARTIO (kyltin kerroin on sama kuin muilla merkeillä)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');

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
    /*
     * ══ KAUPUNKIMERKKI AVAA LIUSKAN (Raamattu, KARTTAUUDISTUKSEN
     * PAATOKSET 34 kohdat 1 ja 8) ═══════════════════════════════════
     *
     * Tämän savukkeen vanha selkäranka oli ISO POP-UP ja sen vieressä
     * turisti-infon kyltti. Kumpaakaan ei enää ole: kaupunki on yksi
     * piste, jonka napautus avaa liuskan, ja opas on liuskan rivi.
     * Vanhat väitteet lukitsisivat poistuneen käyttöliittymän, joten
     * ne kirjaavat nyt INFO-rivin (VANHENTUNUT VARTIO) ja tässä ovat
     * niiden korvaajat — SAMOILLE kaupungeille (Pariisi, Marseille).
     */
    vaadi(`${tunnus}: turisti-infon kylttiä EI ole kartalla`, !merkkiAlussa,
      merkkiAlussa ? 'kyltti löytyi yhä avattavista' : '');
    tieto(`${tunnus}: VANHENTUNUT VARTIO (turisti-info-merkki on kartalla)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
    if (kaupunkiAlussa && merkkiAlussa) {
      const etaisyys = Math.hypot(merkkiAlussa.x - kaupunkiAlussa.x,
        merkkiAlussa.y - kaupunkiAlussa.y);
      tieto(`${tunnus}: merkin etäisyys kaupunkipisteestä`, `${etaisyys.toFixed(1)} px`);
      tieto(`${tunnus}: VANHENTUNUT VARTIO (merkki on kaupungin VIERESSÄ, ei päällä)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
      const teksti = await sivu.evaluate(() => document
        .querySelector('.pallolauta-turisti-info .nostosym-rasteri')?.dataset?.nimio
        ?? document.querySelector('.pallolauta-turisti-info')?.getAttribute('aria-label') ?? '');
      tieto(`${tunnus}: merkin teksti`, teksti);
      tieto(`${tunnus}: VANHENTUNUT VARTIO (merkissä on teksti)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
    }

    /* --- vartio 1, 2, 3, 4: ISO POP-UP (PAATOKSET 10: tiivistetty) ---- */
    if (kaupunkiAlussa) {
      /*
       * KAKSI NAPAUTUSYRITYSTA, JA SE ON MITATTU SYY (18.9.2026, era 4;
       * sama korjaus kuin savuke-pariisi-lahizoom 8c:ssa). Juuri
       * suljetun kortin jalkeen pelin oma portti nielaisee seuraavan
       * napautuksen (js/pallolauta/lauta.js napautaPintaan,
       * `korttiOliAuki`), joten yksi napautus mittasi nielua eika
       * liuskaa. Vaite on, etta liuska aukeaa — ei se, monennellako
       * sormella.
       *
       * KAKSI KORJAUSTA 18.9.2026 (era 7), MOLEMMAT MITATTUJA. Era 6:n
       * ajossa Pariisi oli punainen molemmilla ruuduilla ja Marseille
       * vihrea — ero ei ollut kaupunkien jarjestys vaan LIUSKAN KOKO:
       *
       *  1) ODOTUS OLI LIIAN LYHYT. Kamera-ajo ei ole enaa "noin 200
       *     ms": PAATOKSET 34 kohdat 10 ja 12 antavat sille tyon
       *     (merkki nostetaan listan verran ylos ja sivuun), ja silloin
       *     ajo kestaa oman mittansa PALLOKAMERAN_AJO_MS = 1400 ms.
       *     Marseillessa lista on viisi rivia eika kamera liiku juuri
       *     lainkaan, joten sen ajo palasi heti — juuri siksi se oli
       *     vihrea. Odotus on nyt 3 s, eli ajo + ladonta + avaus.
       *  2) TOINEN NAPAUTUS OSUI TYHJAAN. Kamera-ajo SIIRTAA
       *     kaupunkimerkkia ruudulla, joten uusintanapautus vanhaan
       *     pisteeseen napsautti karttaa merkin vierestä. Piste
       *     luetaan siksi uudestaan ennen jokaista yritysta.
       */
      for (let yritys = 0; yritys < 2; yritys += 1) {
        /* eslint-disable no-await-in-loop */
        await sivu.mouse.click(kaupunkiAlussa.x, kaupunkiAlussa.y);
        let auki = null;
        // 60 x 50 ms = 3 s: kamera-ajo (1400 ms) + ladonta + avaus.
        for (let i = 0; i < 60; i += 1) {
          auki = await sivu.evaluate(
            () => window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
          );
          if (auki) break;
          await sivu.waitForTimeout(50);
        }
        /* eslint-enable no-await-in-loop */
        if (auki) break;
      }
      await sivu.waitForTimeout(500);
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
    tieto(`${tunnus}: VANHENTUNUT VARTIO (iso pop-up aukesi)`,
      'kaupunkimerkki avaa liuskan, ei isoa pop-upia (PAATOKSET 34 kohta 1)');
    const liuskaTila = await sivu.evaluate(() => {
      const n = window.matkakirja.ui.pallolauta.nostot;
      const rivit = n.liuskanRivit?.() ?? [];
      return {
        auki: n.liuskaAuki?.() ?? null,
        rivit: rivit.map((r) => ({ laji: r.laji, nimi: r.nimi, maara: r.maara ?? null })),
        ylaryhma: rivit.filter((r) => ['lehti', 'nahtavyydet', 'opas'].includes(r.laji)).length,
      };
    });
    tieto(`${tunnus}: liuskan rivit`,
      liuskaTila.rivit.map((r) => r.nimi).join(' / ') || 'ei yhtään');
    vaadi(`${tunnus}: kaupunkimerkin napautus avaa liuskan eikä isoa pop-upia`,
      Boolean(liuskaTila.auki) && liuskaTila.rivit.length > 0 && !iso,
      `liuska ${liuskaTila.auki ?? '-'}, rivejä ${liuskaTila.rivit.length}, `
      + `iso pop-up ${iso ? 'aukesi' : 'ei auennut'}`);
    vaadi(`${tunnus}: liuskan yläryhmä on 3 riviä (kaupunki, Nähtävyydet, Turistiopas)`,
      liuskaTila.ylaryhma === 3, `rivejä ${liuskaTila.ylaryhma}`);

    /* ══ VARTIOT 10-11: LIUSKAN KAKSI YLÄRIVIÄ (PAATOKSET 34 kohta 16) ══
     *
     * Omistaja 18.9.2026 klo 14.05, sanatarkasti kohdista d ja e:
     * kaupungin oma rivi avaa *"VAIN: herokuva, kaksi pikkukuvaa (vanha
     * ja uusi) ja leipäteksti"*, ja "Nähtävyydet" avaa *"VAIN:
     * nähtävyyskartta ja sen alla nähtävyysteksti, josta näkyy
     * ENSIMMÄINEN LAUSE ja sen perässä 'Lue lisää' -nappi"*.
     *
     * NAPAUTUS ON AITO: rivin laatikko luetaan liuskan omasta mallista
     * (nostot.liuskanRivit palauttaa ruutulaatikon kotelon pikseleinä),
     * ja sormi osuu sen keskelle. Savuke ei kutsu avaajia suoraan.
     */
    if (kaupunki.id === 'pariisi') {
      /** Liuskan rivin keskipiste sivun koordinaateissa. */
      const rivinPiste = (laji) => sivu.evaluate((haettu) => {
        const l = window.matkakirja.ui.pallolauta;
        const r = (l.nostot.liuskanRivit?.() ?? []).find((x) => x.laji === haettu);
        if (!r || !Number.isFinite(r.x0)) return null;
        const koti = l.kotelo.getBoundingClientRect();
        return {
          x: koti.left + (r.x0 + r.x1) / 2,
          y: koti.top + (r.y0 + r.y1) / 2,
          nimi: r.nimi,
        };
      }, laji);
      /** Liuska uudelleen auki (rivin napautus sulkee sen). */
      const avaaLiuska = async () => {
        for (let yritys = 0; yritys < 3; yritys += 1) {
          /* eslint-disable no-await-in-loop */
          const piste = await kaupunkiPiste();
          if (!piste) return false;
          await sivu.mouse.click(piste.x, piste.y);
          for (let i = 0; i < 60; i += 1) {
            const auki = await sivu.evaluate(
              () => window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
            );
            if (auki) return true;
            await sivu.waitForTimeout(50);
          }
          /* eslint-enable no-await-in-loop */
        }
        return false;
      };
      const suljeArkki = () => sivu.evaluate(() => {
        document.getElementById('tiivis-lehtiarkki')?.close();
      });
      /*
       * RIVIN NAPAUTUS YRITETÄÄN UUDESTAAN, SAMASTA MITATUSTA SYYSTÄ
       * kuin kaupunkimerkin napautus ylempänä: kamera-ajo siirtää
       * liuskaa ruudulla, ja juuri suljetun kortin jälkeen peli nielaisee
       * yhden napautuksen. Rivin piste luetaan siksi uudelleen joka
       * yrityksellä, ja liuska avataan tarvittaessa uudestaan. Väite on,
       * että RIVI AVAA OMAN NÄKYMÄNSÄ — ei se, monennellako sormella.
       */
      const napautaRivi = async (laji, luokka) => {
        for (let yritys = 0; yritys < 3; yritys += 1) {
          /* eslint-disable no-await-in-loop */
          const auki = await sivu.evaluate(
            () => window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
          );
          if (!auki && !(await avaaLiuska())) return false;
          const piste = await rivinPiste(laji);
          if (!piste) return false;
          await sivu.mouse.click(piste.x, piste.y);
          for (let i = 0; i < 30; i += 1) {
            const nakyma = await sivu.evaluate((c) => {
              const d = document.getElementById('tiivis-lehtiarkki');
              return Boolean(d?.open && d.classList.contains(c));
            }, luokka);
            if (nakyma) return true;
            await sivu.waitForTimeout(50);
          }
          /* eslint-enable no-await-in-loop */
        }
        return false;
      };

      /*
       * LIUSKA AUKI ENNEN RIVIN NAPAUTUSTA. Ylempi avaus on oma
       * vartionsa (ja sillä on oma kahden yrityksen historiansa), mutta
       * NÄMÄ vartiot mittaavat rivien tekoja eivätkä avausta — jos
       * liuska ei ole auki, se avataan tässä uudestaan.
       */
      if (!liuskaTila.auki) await avaaLiuska();
      /* --- vartio 10: "PARIISI"-rivi (kohta 16 d) ------------------- */
      const lehtiRivi = await rivinPiste('lehti');
      vaadi(`${tunnus}: liuskan kaupunkirivi on ruudulla`, Boolean(lehtiRivi),
        lehtiRivi ? '' : 'riviä ei löytynyt liuskan mallista');
      if (lehtiRivi) {
        await napautaRivi('lehti', 'kaupunkiesittely-nakyma');
        const nakyma = await sivu.evaluate(() => {
          const d = document.getElementById('tiivis-lehtiarkki');
          if (!d?.open) return null;
          const palsta = d.querySelector('.arrival-palsta');
          return {
            esittelyNakyma: d.classList.contains('kaupunkiesittely-nakyma'),
            herokuvia: palsta.querySelectorAll('.lehti-paakuva img').length,
            pikkukuvia: palsta.querySelectorAll('.lehti-kuvarivi img').length,
            leipa: (palsta.querySelector('.arrival-intro')?.textContent ?? '').trim().length,
            kartta: palsta.querySelectorAll('.kaupunkikartta, .tiivis-kartta').length,
            matkailijalle: palsta.querySelectorAll('.matkailijalle').length,
            lehtiAuki: Boolean(document.getElementById('arrival-dialog')?.open),
          };
        });
        vaadi(`${tunnus}: Pariisi-rivi avaa kaupungin esittelynäkymän`,
          Boolean(nakyma?.esittelyNakyma), JSON.stringify(nakyma));
        if (nakyma) {
          tieto(`${tunnus}: esittelynäkymä`, JSON.stringify(nakyma));
          vaadi(`${tunnus}: näkymässä on 1 herokuva`, nakyma.herokuvia === 1,
            `herokuvia ${nakyma.herokuvia}`);
          vaadi(`${tunnus}: näkymässä on 2 pikkukuvaa (vanha ja uusi)`,
            nakyma.pikkukuvia === 2, `pikkukuvia ${nakyma.pikkukuvia}`);
          vaadi(`${tunnus}: näkymässä on leipäteksti`, nakyma.leipa > 0,
            `${nakyma.leipa} merkkiä`);
          vaadi(`${tunnus}: EI kaupunkilehteä eikä sen osioita`,
            !nakyma.lehtiAuki && nakyma.kartta === 0 && nakyma.matkailijalle === 0,
            `lehti ${nakyma.lehtiAuki}, karttoja ${nakyma.kartta}, `
            + `matkailijalle ${nakyma.matkailijalle}`);
        }
        if (KUVAKANSIO && ruutu.width === 390) {
          await sivu.screenshot({
            path: join(KUVAKANSIO, 'liuska-k16-pariisi-esittely.png'), scale: 'css',
          });
        }
        await suljeArkki();
        await sivu.waitForTimeout(300);
      }

      /* --- vartio 11: "NÄHTÄVYYDET"-rivi (kohta 16 e) --------------- */
      const uudelleen = await avaaLiuska();
      vaadi(`${tunnus}: liuska aukeaa uudelleen näkymän sulkemisen jälkeen`, uudelleen);
      const nahtRivi = uudelleen ? await rivinPiste('nahtavyydet') : null;
      if (nahtRivi) {
        await napautaRivi('nahtavyydet', 'nahtavyysnakyma');
        await sivu.waitForTimeout(400);
        const ennen = await sivu.evaluate(() => {
          const d = document.getElementById('tiivis-lehtiarkki');
          if (!d?.open) return null;
          const palsta = d.querySelector('.arrival-palsta');
          const teksti = palsta.querySelector('.nahtavyysnakyma-teksti');
          return {
            nahtavyysNakyma: d.classList.contains('nahtavyysnakyma'),
            kartta: palsta.querySelectorAll('.kartta-kehys').length,
            kohteita: palsta.querySelectorAll('.maakartta-piste').length,
            luettelo: palsta.querySelectorAll('.kartta-selite').length,
            pituus: (teksti?.textContent ?? '').trim().length,
            kappaleita: palsta.querySelectorAll('.nahtavyysnakyma-teksti').length,
            nappi: palsta.querySelectorAll('.nahtavyysnakyma-lisaa').length,
            loppuMerkkeja: [...(teksti?.textContent ?? '')]
              .filter((c) => c === '.' || c === '!' || c === '?').length,
            herokuvia: palsta.querySelectorAll('.lehti-paakuva img').length,
          };
        });
        vaadi(`${tunnus}: Nähtävyydet-rivi avaa nähtävyysnäkymän`,
          Boolean(ennen?.nahtavyysNakyma), JSON.stringify(ennen));
        if (ennen) {
          tieto(`${tunnus}: nähtävyysnäkymä`, JSON.stringify(ennen));
          vaadi(`${tunnus}: näkymässä on nähtävyyskartta kohteineen`,
            ennen.kartta === 1 && ennen.kohteita > 0,
            `kehyksiä ${ennen.kartta}, kohteita ${ennen.kohteita}`);
          vaadi(`${tunnus}: kartan alla EI ole kohdeluetteloa`, ennen.luettelo === 0,
            `rivejä ${ennen.luettelo}`);
          vaadi(`${tunnus}: teksti on yksi kappale ja yksi lause`,
            ennen.kappaleita === 1 && ennen.pituus > 0 && ennen.loppuMerkkeja === 1,
            `kappaleita ${ennen.kappaleita}, merkkejä ${ennen.pituus}, `
            + `lauseenloppuja ${ennen.loppuMerkkeja}`);
          vaadi(`${tunnus}: tekstin perässä on "Lue lisää" -nappi`, ennen.nappi === 1,
            `nappeja ${ennen.nappi}`);
          vaadi(`${tunnus}: näkymässä EI ole herokuvia`, ennen.herokuvia === 0,
            `kuvia ${ennen.herokuvia}`);
        }
        if (KUVAKANSIO && ruutu.width === 390) {
          await sivu.screenshot({
            path: join(KUVAKANSIO, 'liuska-k16-pariisi-nahtavyydet.png'), scale: 'css',
          });
        }
        // "Lue lisää": loput tulevat SAMAAN kappaleeseen (sama elementti).
        const jalkeen = await sivu.evaluate(() => {
          const palsta = document.getElementById('tiivis-lehtiarkki')
            ?.querySelector('.arrival-palsta');
          const sama = palsta?.querySelector('.nahtavyysnakyma-teksti');
          palsta?.querySelector('.nahtavyysnakyma-lisaa')?.click();
          const uusi = palsta?.querySelector('.nahtavyysnakyma-teksti');
          return {
            pituus: (uusi?.textContent ?? '').trim().length,
            samaElementti: sama === uusi,
            kappaleita: palsta?.querySelectorAll('.nahtavyysnakyma-teksti').length ?? 0,
            nappi: palsta?.querySelectorAll('.nahtavyysnakyma-lisaa').length ?? 0,
            arkkiAuki: Boolean(document.getElementById('tiivis-lehtiarkki')?.open),
          };
        });
        tieto(`${tunnus}: Lue lisää -napin jälkeen`, JSON.stringify(jalkeen));
        if (ennen) {
          vaadi(`${tunnus}: napautus tuo loput samaan kappaleeseen`,
            jalkeen.samaElementti && jalkeen.kappaleita === 1
            && jalkeen.pituus > ennen.pituus,
            `${ennen.pituus} → ${jalkeen.pituus} merkkiä, sama elementti `
            + `${jalkeen.samaElementti}, kappaleita ${jalkeen.kappaleita}`);
        }
        vaadi(`${tunnus}: nappi katoaa eikä näkymä vaihdu`,
          jalkeen.nappi === 0 && jalkeen.arkkiAuki,
          `nappeja ${jalkeen.nappi}, arkki auki ${jalkeen.arkkiAuki}`);
        // Kartan kohteen napautus avaa kohteen (kohta 16 e viimeinen lause).
        const kohde = await sivu.evaluate(() => {
          const piste = document.getElementById('tiivis-lehtiarkki')
            ?.querySelector('.maakartta-piste.kaupunki-kohde');
          if (!piste) return null;
          const r = piste.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        });
        if (kohde) {
          // Piirroskohde suurenee ensin ja avaa jutun toisesta napautuksesta
          // (js/nahtavyydet.js: "NAPAUTUS SUURENTAA, KYLTTI AVAA JUTUN").
          await sivu.mouse.click(kohde.x, kohde.y);
          await sivu.waitForTimeout(400);
          const kohdePiste = await sivu.evaluate(() => {
            const piste = document.getElementById('tiivis-lehtiarkki')
              ?.querySelector('.maakartta-piste.kaupunki-kohde');
            const r = piste?.getBoundingClientRect();
            return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
          });
          if (kohdePiste) await sivu.mouse.click(kohdePiste.x, kohdePiste.y);
          await sivu.waitForTimeout(600);
          const auki = await sivu.evaluate(() => [...document.querySelectorAll('dialog[open]')]
            .some((d) => d.id !== 'tiivis-lehtiarkki' && d.id !== 'arrival-dialog'));
          vaadi(`${tunnus}: kartan kohteen napautus avaa kohteen`, auki,
            'kohteen arkki ei auennut');
        }
        await suljeArkki();
        await sivu.waitForTimeout(300);
        await avaaLiuska();
      }
    }
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
    tieto(`${tunnus}: VANHENTUNUT VARTIO (Pulun paneeli on kortin päällä)`,
      'kaupunkimerkki avaa liuskan, ei isoa pop-upia (PAATOKSET 34 kohta 1)');
    tieto(`${tunnus}: VANHENTUNUT VARTIO (kortti väistää Pulun paneelia)`,
      'kaupunkimerkki avaa liuskan, ei isoa pop-upia (PAATOKSET 34 kohta 1)');
    // Paneeli kiinni, jotta seuraavat vartiot mittaavat puhtaan kartan.
    await sivu.click('.pollo-nappi').catch(() => {});
    await sivu.waitForTimeout(500);
    tieto(`${tunnus}: VANHENTUNUT VARTIO (kortti jäi auki Pulun napista)`,
      'kaupunkimerkki avaa liuskan, ei isoa pop-upia (PAATOKSET 34 kohta 1)');

    /* --- vartio 4: rasti sulkee --------------------------------------- */
    await sivu.click('.kaupunkipopup-sulje').catch(() => {});
    await sivu.waitForTimeout(400);
    tieto(`${tunnus}: VANHENTUNUT VARTIO (rasti sulkee ison pop-upin)`,
      'kaupunkimerkki avaa liuskan, ei isoa pop-upia (PAATOKSET 34 kohta 1)');

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
      tieto(`${tunnus}: VANHENTUNUT VARTIO (turisti-info aukesi napautuksesta)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
      if (info) {
        tieto(`${tunnus}: VANHENTUNUT VARTIO (kortissa on matkustusopas)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
        tieto(`${tunnus}: VANHENTUNUT VARTIO (kortissa on PELKKÄ opas)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
        if (KUVAKANSIO && ruutu.width === 390) {
          await sivu.screenshot({
            path: join(KUVAKANSIO, `karttauudistus-4-${kaupunki.id}-turisti-info.png`),
            scale: 'css',
          });
        }
      }
      await sivu.keyboard.press('Escape');
      await sivu.waitForTimeout(400);
      tieto(`${tunnus}: VANHENTUNUT VARTIO (Escape sulkee turisti-infon)`,
      'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34 kohta 8)');
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
