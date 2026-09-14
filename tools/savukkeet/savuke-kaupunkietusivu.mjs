/*
 * Savuke: TIIVISTETTY KAUPUNKIETUSIVU (Raamattu, osio "Kaupungit":
 * KARTTAUUDISTUKSEN PAATOKSET 10; js/kaupunkinosto.js
 * latoTiivisEtusivu, js/pallolauta/lauta.js napautaKaupunki).
 *
 * Omistaja 14.9.2026 sanatarkasti: *"kohdekaupunkia klikkaamalla voisi
 * avautua kaupunkilehden vanha etusivu mutta ilman matkailu liitetta ja
 * alaosan navigointia. Saasta vanha kaupunki lehti koskemattomana. Tee
 * siita vain uusi tiivistetty kopio. Ota myos ne kaksi ennen ja nyt
 * vertailukuvat pois ja siirra kaupungin leipateksti vasta kaupunki
 * kartan jalkeen ja nayta siita vain ensimmainen kappale ja loppuun
 * lisaa nappi joka jatkaa tekstin loppuun asti."*
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: lupaus on se, MITÄ PELAAJA NÄKEE
 * kaupunkia napauttaessaan. "Vain ensimmäinen kappale" ei ole DOM-solmujen
 * määrä vaan NÄKYVIEN kappaleiden määrä (loput ovat DOMissa piilossa,
 * jotta nappi ei lado tekstiä uudestaan), ja "ei ennen/nyt -kuvia" on
 * mitattava juuri Pariisista, jolla PARI ON DATASSA — ilman selainta
 * kumpaakaan ei voi mitata. Napautus on aito: sormi osuu kankaaseen
 * siinä ruutupisteessä, johon kaupunki projisoituu.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *   1. NAPAUTUS AVAA TIIVISTETYN ETUSIVUN (.kaupunkipopup-tiivis), ja
 *      kortti on karttaruudun sisällä.
 *   2. HEROKUVAT ovat kortissa kuten vanhassa etusivussa.
 *   3. KOHDEKARTTA on kortissa numeropisteineen JA ENNEN leipätekstiä
 *      (omistajan järjestys).
 *   4. LEIPÄTEKSTISTÄ NÄKYY TASAN YKSI KAPPALE, ja se on datan
 *      ensimmäinen kappale merkki merkiltä.
 *   5. EI ENNEN/NYT -PARIA, vaikka Pariisin datassa pari on.
 *      → TÄMÄ ON VASTAKOKEEN VARTIO.
 *   6. EI MATKAILULIITETTÄ (.matkailijalle) eikä alaosan navigointia
 *      (sivunvaihto, sisällysvalikko, hampurilainen, ovi kaupunkilehteen).
 *   7. NAPPI TUO LOPUT KAPPALEET paikalleen: kaikki datan kappaleet
 *      näkyvissä, nappi poissa, ei sivunvaihtoa (kortti on sama).
 *   8. Kaupunkilehden oma data ei muutu: kortin koko teksti (näkyvä +
 *      piilotettu) on merkilleen ARTIKKELIT[...].intro.
 *
 * VASTAKOE (ajetaan käsin, kirjataan raporttiin): vaihda
 * js/kaupunkinosto.js latoTiivisEtusivu -> latoLehtiKuvat(… ennenNyt:
 * kansi?.ennenNyt ?? null …) eli jätä ennen/nyt-suodatus pois → vartio 5
 * punaiseksi.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-kaupunkietusivu.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ARTIKKELIT } from '../../js/sisaltotaulut.js';
import { KULTTUURI_KATEGORIAT } from '../../js/packs/kulttuuri-kategoriat.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Pilotti: Pariisi (ennen/nyt datassa) ja Marseille (ohuempi lehti). */
const KAUPUNGIT = [
  { id: 'pariisi', nimi: 'Pariisi' },
  { id: 'marseille', nimi: 'Marseille' },
];
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

/** Datan kappaleet samassa muodossa kuin piirraLeipateksti ne latoo. */
const kappaleetDatasta = (nimi) => (ARTIKKELIT[nimi]?.intro ?? '')
  .split('\n\n').map((k) => k.trim()).filter(Boolean)
  .map((k) => k.replaceAll('**', ''));
const kansiOsasto = (id) => (KULTTUURI_KATEGORIAT[id] ?? []).find((k) => k.id === 'kaupunki');

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const ruutu of RUUDUT) {
  for (const kaupunki of KAUPUNGIT) {
    const peli = new Game({
      players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki.id }],
      pack: packById('maailmankartta'),
      seed: 5,
    });
    peli.phase = 'action';
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

    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1400));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 350));
    });

    const piste = await sivu.evaluate((id) => {
      const l = window.matkakirja.ui.pallolauta;
      const k = l.kaupunki(id);
      if (!k) return null;
      const p = l.pallo.getScreenCoords(k.lat, k.lon, 0);
      const r = l.kotelo.getBoundingClientRect();
      return p ? { x: r.left + p.x, y: r.top + p.y } : null;
    }, kaupunki.id);
    vaadi(`${tunnus}: kaupunkipiste on ruudulla`, Boolean(piste));
    if (!piste) { await ctx.close(); continue; }
    await sivu.mouse.click(piste.x, piste.y);
    await sivu.waitForTimeout(1000);

    const kortti = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-tiivis');
      if (!p) return null;
      const pane = document.querySelector('.map-pane').getBoundingClientRect();
      const r = p.getBoundingClientRect();
      const nakyy = (el) => el.getClientRects().length > 0;
      const kappaleet = [...p.querySelectorAll('.arrival-intro > p')];
      const jarjestys = [...p.querySelectorAll(
        '.kaupunkipopup-hero, .kaupunkipopup-kartta, .arrival-intro',
      )].map((el) => el.className.split(' ')[0]);
      return {
        otsikko: p.querySelector('.kaupunkipopup-otsikko')?.textContent ?? '',
        kuvia: p.querySelectorAll('.kaupunkipopup-hero img').length,
        heroKorkeus: Math.round(
          p.querySelector('.kaupunkipopup-hero')?.getBoundingClientRect().height ?? -1,
        ),
        kartta: Boolean(p.querySelector('.kaupunkipopup-kartta .kartta-kehys')),
        kohteita: p.querySelectorAll('.kaupunkikartta .maakartta-piste').length,
        jarjestys,
        kappaleita: kappaleet.length,
        nakyvat: kappaleet.filter(nakyy).map((el) => el.textContent),
        kokoTeksti: p.querySelector('.arrival-intro')?.textContent ?? '',
        ennenNyt: p.querySelectorAll('.lehti-kuva-ennen, .lehti-kuva-nyt').length,
        matkailijalle: p.querySelectorAll('.matkailijalle').length,
        navi: p.querySelectorAll(
          '.kaupunkipopup-lehti, .lehti-hampurilainen, .lehti-sisallys,'
          + ' .tutki-navi, .tutki-alapalkki, .arrival-liuskat',
        ).length,
        nappeja: p.querySelectorAll('.kaupunkipopup-jatka').length,
        nappiTeksti: p.querySelector('.kaupunkipopup-jatka')?.textContent ?? '',
        ruudulla: r.left >= pane.left - 1 && r.right <= pane.right + 1
          && r.top >= pane.top - 1 && r.bottom <= pane.bottom + 1,
      };
    });
    vaadi(`${tunnus}: tiivistetty etusivu aukesi napautuksesta`, Boolean(kortti),
      virheet.join(' | '));
    if (!kortti) { await ctx.close(); continue; }
    const datankappaleet = kappaleetDatasta(kaupunki.nimi);
    const pari = kansiOsasto(kaupunki.id)?.ennenNyt ?? null;
    tieto(`${tunnus}: ennen/nyt datassa`, `${pari?.length ?? 0} kuvaa`);
    tieto(`${tunnus}: lohkojen järjestys`, kortti.jarjestys.join(' → '));
    tieto(`${tunnus}: kappaleita (data / kortti / näkyvissä)`,
      `${datankappaleet.length} / ${kortti.kappaleita} / ${kortti.nakyvat.length}`);

    vaadi(`${tunnus}: otsikko on kaupungin nimi`, kortti.otsikko === kaupunki.nimi, kortti.otsikko);
    vaadi(`${tunnus}: kortti on karttaruudun sisällä`, kortti.ruudulla);
    vaadi(`${tunnus}: herokuvat kortissa`, kortti.kuvia > 0 && kortti.heroKorkeus > 0,
      `kuvia ${kortti.kuvia}, korkeus ${kortti.heroKorkeus}`);
    vaadi(`${tunnus}: kohdekartta kortissa numeropisteineen`,
      kortti.kartta && kortti.kohteita > 0, `kehys ${kortti.kartta}, ${kortti.kohteita} pistettä`);
    vaadi(`${tunnus}: kohdekartta ENNEN leipätekstiä`,
      kortti.jarjestys.join(',') === 'kaupunkipopup-hero,kaupunkipopup-kartta,arrival-intro',
      kortti.jarjestys.join(','));
    vaadi(`${tunnus}: leipätekstistä näkyy TASAN yksi kappale`,
      kortti.nakyvat.length === 1, `${kortti.nakyvat.length} näkyvissä`);
    vaadi(`${tunnus}: näkyvä kappale on datan ensimmäinen merkilleen`,
      kortti.nakyvat[0] === datankappaleet[0],
      `kortissa "${(kortti.nakyvat[0] ?? '').slice(0, 40)}…"`);
    vaadi(`${tunnus}: koko teksti on merkilleen lehtidatan intro`,
      kortti.kokoTeksti === datankappaleet.join(''),
      `kortissa ${kortti.kokoTeksti.length} merkkiä, datassa ${datankappaleet.join('').length}`);
    vaadi(`${tunnus}: EI ennen/nyt -paria vaikka data sen antaisi`,
      kortti.ennenNyt === 0 && (pari?.length ?? 0) >= 2,
      `kortissa ${kortti.ennenNyt} rooli-kuvaa, datassa ${pari?.length ?? 0}`);
    vaadi(`${tunnus}: EI matkailuliitettä`, kortti.matkailijalle === 0);
    vaadi(`${tunnus}: EI alaosan navigointia`, kortti.navi === 0, `${kortti.navi} elementtiä`);
    vaadi(`${tunnus}: "Lue loppuun" -nappi on kortissa`,
      kortti.nappeja === 1 && kortti.nappiTeksti.length > 0, kortti.nappiTeksti);

    if (KUVAKANSIO) {
      // Fonttien lataus voi jäädä roikkumaan ämpärin takana; kuva on
      // raportin lisä eikä vartio, joten se ei saa kaataa ajoa.
      await sivu.screenshot({
        path: join(KUVAKANSIO, `kaupunkietusivu-${kaupunki.id}-${ruutu.width}.png`),
        scale: 'css',
        animations: 'disabled',
        timeout: 15000,
      }).catch((e) => tieto(`${tunnus}: kuvakaappaus ei onnistunut`, String(e.message ?? e)));
    }

    /* --- vartio 7: nappi tuo loput kappaleet paikalleen -------------- */
    await sivu.click('.kaupunkipopup-jatka').catch(() => {});
    await sivu.waitForTimeout(400);
    const jalkeen = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-tiivis');
      if (!p) return null;
      const nakyy = (el) => el.getClientRects().length > 0;
      const kappaleet = [...p.querySelectorAll('.arrival-intro > p')];
      return {
        nakyvat: kappaleet.filter(nakyy).map((el) => el.textContent),
        nappeja: p.querySelectorAll('.kaupunkipopup-jatka').length,
        kartta: Boolean(p.querySelector('.kaupunkipopup-kartta .kartta-kehys')),
      };
    });
    vaadi(`${tunnus}: kortti on yhä auki napin jälkeen`, Boolean(jalkeen), 'kortti katosi');
    if (jalkeen) {
      vaadi(`${tunnus}: nappi näyttää loput kappaleet paikalleen`,
        jalkeen.nakyvat.join('') === datankappaleet.join('')
        && jalkeen.nakyvat.length === datankappaleet.length,
        `näkyvissä ${jalkeen.nakyvat.length}/${datankappaleet.length}`);
      vaadi(`${tunnus}: nappi poistuu käytön jälkeen`, jalkeen.nappeja === 0);
      vaadi(`${tunnus}: ei sivunvaihtoa — kartta on yhä samassa kortissa`, jalkeen.kartta);
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
