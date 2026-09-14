/*
 * Savuke: TIIVISTETTY KAUPUNKIETUSIVU LEHDEN KEHYKSESSÄ + TURISTI-INFO
 * (Raamattu, osio "Kaupungit": KARTTAUUDISTUKSEN PAATOKSET 10 ja 11;
 * js/kaupunkinosto.js latoTiivisEtusivu / avaaTuristiOpas,
 * js/lehti.js avaaTiivisLehtiarkki, js/pallolauta/lauta.js).
 *
 * Omistaja 14.9.2026 sanatarkasti (PAATOKSET 10):
 * *"kohdekaupunkia klikkaamalla voisi avautua kaupunkilehden vanha
 * etusivu mutta ilman matkailu liitetta ja alaosan navigointia. Saasta
 * vanha kaupunki lehti koskemattomana. Tee siita vain uusi tiivistetty
 * kopio. Ota myos ne kaksi ennen ja nyt vertailukuvat pois ja siirra
 * kaupungin leipateksti vasta kaupunki kartan jalkeen ja nayta siita
 * vain ensimmainen kappale ja loppuun lisaa nappi joka jatkaa tekstin
 * loppuun asti."*
 *
 * Omistaja 14.9.2026 sanatarkasti (PAATOKSET 11, kohdat 3–4):
 * *"kaupunkia klikkaamalla piti avautua muutettu kaupunkilehti. sisalto
 * on oikea, mutta sen ulkoasu saisi olla tasmalleen sama kuin
 * kaupunkilehdessa kaikilta osin (myos pop upin leveys)"* ja *"turisti
 * info nappi pitaisi olla pariisin vieressa ja se saisi suoraan aueta
 * isoon muotoon (jata pienempi vali popup pois kokonaan)"*.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: lupaus on se, MITÄ PELAAJA NÄKEE
 * kaupunkia napauttaessaan. "Täsmälleen sama ulkoasu" ei ole koodirivi
 * vaan MITTA: pop-upin leveys, pehmuste, paperi, kehys ja kirjasimet
 * ovat samat kuin kaupunkilehdellä — ja se voidaan todeta vain
 * avaamalla molemmat samassa selaimessa ja vertaamalla laskettuja
 * tyylejä. Samoin "Pariisin vieressä" on pikselietäisyys kartalla,
 * ei asteluku koodissa. Napautus on aito: sormi osuu kankaaseen siinä
 * ruutupisteessä, johon kaupunki (tai merkki) projisoituu.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *   1. NAPAUTUS AVAA TIIVISTETYN ETUSIVUN, ja se on KAUPUNKILEHDEN
 *      KEHYS: dialogilla samat luokat (dialog · lehti · arkki) ja
 *      kortilla sama .dialog-card.arrival-card kuin kaupunkilehdellä.
 *      Masto on paikallaan: kicker "Unohdettu aarre", nimiö ja
 *      päiväysrivi — tässä järjestyksessä ja herokuvien YLÄPUOLELLA.
 *   2. KEHYS JA MASTO OVAT MITALLEEN SAMAT: leveys, pehmuste,
 *      taustaväri, taustakuvio, kehysviiva, pyöristys, otsikon ja
 *      leipätekstin kirjasin (perhe, koko, paino) sekä maston kummankin
 *      rivin teksti, kirjasin, kirjainväli, suuraakkostus, väri,
 *      marginaalit, viivat ja korkeus — erotus 0 kaikissa.
 *      → TÄMÄ ON PAATOKSET 11 kohdan 3 vartio.
 *   3. HEROKUVAT ovat kortissa kuten vanhassa etusivussa.
 *   4. KOHDEKARTTA on kortissa numeropisteineen JA ENNEN leipätekstiä.
 *   5. LEIPÄTEKSTISTÄ NÄKYY TASAN YKSI KAPPALE, datan ensimmäinen.
 *   6. EI ENNEN/NYT -PARIA, vaikka Pariisin datassa pari on.
 *      → TÄMÄ ON PAATOKSET 10:n VASTAKOKEEN VARTIO.
 *   7. EI MATKAILULIITETTÄ eikä alaosan navigointia.
 *   8. NAPPI TUO LOPUT KAPPALEET paikalleen.
 *   9. Kortin koko teksti on merkilleen ARTIKKELIT[...].intro.
 *  10. TURISTI-INFON MERKKI ON KAUPUNGIN VIERESSÄ: etäisyys
 *      kaupunkipisteeseen on TURISTI_INFO_ETAISYYS_MAX px:n sisällä
 *      MOLEMMILLA ruuduilla (ennen erää 11: 36 px puhelimella, 103 px
 *      työpöydällä), eikä sen laatikko limity kaupungin nimen kanssa.
 *  11. MERKIN NAPAUTUS AVAA SUORAAN ISON OPPAAN (#nahtavyys-dialog
 *      auki), eikä välipop-upia (.kaupunkipopup-info) ole DOMissa.
 *      → TÄMÄ ON PAATOKSET 11 kohdan 4 vartio.
 *
 * VASTAKOKEET (ajetaan käsin, kirjataan raporttiin):
 *   A. js/kaupunkinosto.js avaaTiivisKaupunkietusivu -> takaisin
 *      avaaKortti-kehykseen → vartio 2 punaiseksi.
 *   B. js/pallolauta/lauta.js turisti-infon `avaa` -> avaaTuristiInfo
 *      → vartio 11 punaiseksi.
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

/*
 * TURISTI-INFO ON "PARIISIN VIERESSÄ" (omistaja 14.9.2026). Mitta on
 * js/kaupunkinosto.js TURISTI_INFO_RUUTUSIIRTO = 36/16 px ≈ 39 px, ja
 * tämä katto (48 px) on sille vara: merkin paikka lasketaan kamerasta
 * mitatuista näytteistä, joten pyöristys ja kameran hienoliike saavat
 * heilauttaa muutaman pikselin. Katto on silti reilusti alle sen, mitä
 * asteissa ilmaistu siirto antoi työpöydällä ennen erää 11 (103 px).
 */
const TURISTI_INFO_ETAISYYS_MAX = 48;
/* Alaraja: kaksi erillistä napautuskohdetta. Osumatesti on lähin merkki
 * 44 px:n sisällä (js/pallolauta/lauta.js), joten merkkien on oltava
 * selvästi erillään — alle 20 px tekisi niistä yhden sormenpään. */
const TURISTI_INFO_ETAISYYS_MIN = 20;

/** Kehyksen mitat, jotka VANHAN ja UUDEN on oltava samat (erotus 0). */
const KEHYKSEN_MITAT = [
  'leveys', 'padding', 'taustavari', 'taustakuvio', 'kehys', 'pyoristys',
  'otsikkoFontti', 'leipaFontti',
  // LEHDEN MASTO (Fablen päätös 14.9.2026): kicker ja päiväysrivi ovat
  // osa "täsmälleen samaa ulkoasua", joten ne mitataan samalla
  // erotus-0-vaatimuksella kuin kehys.
  'kickerTeksti', 'kickerTyyli', 'kickerLaatikko',
  'pvmMaa', 'pvmPaiva', 'pvmLeveys',
  'mastoJarjestys',
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
    /* ---- VANHAN KAUPUNKILEHDEN KEHYS: vertailun mitta -------------- */
    const KEHYSMITTA = `(dialogi) => {
      if (!dialogi) return null;
      const kortti = dialogi.querySelector('.dialog-card') ?? dialogi;
      const k = getComputedStyle(kortti);
      const otsikko = dialogi.querySelector('.lehti-nimio');
      const leipa = dialogi.querySelector('.lehti-leipa');
      const kicker = dialogi.querySelector('.lehti-ylarivi');
      const pvmrivi = dialogi.querySelector('.lehti-alarivi');
      const f = (el) => { const c = el ? getComputedStyle(el) : null;
        return c ? c.fontFamily + ' | ' + c.fontSize + ' | ' + c.fontWeight : ''; };
      // Masto mitataan tekstiä myöten: kirjasin, koko, kirjainväli,
      // suuraakkostus, väri JA rivin omat marginaalit/viivat — juuri ne,
      // joista "pikselintarkasti sama" koostuu.
      const m = (el) => { const c = el ? getComputedStyle(el) : null;
        return c ? [f(el), c.letterSpacing, c.textTransform, c.textAlign, c.color,
          c.margin, c.padding, c.borderTop, c.borderBottom].join(' | ') : ''; };
      return {
        luokat: [...dialogi.classList].filter((x) => x === 'dialog' || x === 'lehti' || x === 'arkki').sort().join(' '),
        kortinLuokat: [...kortti.classList].sort().join(' '),
        // offsetWidth eikä getBoundingClientRect: avausanimaation
        // (card-in) skaalaus ei saa sekoittua LADONNAN leveyteen, joka
        // on se mitta, jota omistaja tarkoittaa "pop upin leveydellä".
        leveys: kortti.offsetWidth,
        padding: k.padding,
        taustavari: k.backgroundColor,
        taustakuvio: k.backgroundImage.slice(0, 48),
        kehys: k.border,
        pyoristys: k.borderRadius,
        otsikkoFontti: f(otsikko),
        leipaFontti: f(leipa),
        kickerTeksti: kicker && kicker.getClientRects().length ? kicker.textContent : '',
        kickerTyyli: m(kicker),
        // offsetWidth/Height eikä getBoundingClientRect: ladottu laatikko,
        // ei avausanimaation kiertämä ja skaalattu ruutulaatikko.
        kickerLaatikko: kicker ? kicker.offsetWidth + ' x ' + kicker.offsetHeight : '',
        pvmMaa: pvmrivi?.querySelector('.pvm-maa')?.textContent ?? '',
        // Päiväysrivistä verrataan matkapäivän osuutta: VANHASSA rivissä
        // on lisäksi liitelinkki (.maa-linkki), joka on alaosan
        // navigointia ja jonka omistaja rajasi erässä 10 pois. Se on
        // rivin ainoa ero, ja siksi se rajataan tässä ulos nimeltä.
        pvmPaiva: pvmrivi && pvmrivi.getClientRects().length
          ? pvmrivi.textContent
            .replace(pvmrivi.querySelector('.pvm-maa')?.textContent ?? '~', '')
            .replace(pvmrivi.querySelector('.maa-linkki')?.textContent ?? '~', '')
          : '',
        pvmTyyli: m(pvmrivi),
        pvmLeveys: pvmrivi ? pvmrivi.offsetWidth : -1,
        // Maston ja ensimmäisen herokuvan väli: "herokuvien yläpuolelle
        // kuten vanhassa" on juuri tämä rako.
        mastoJarjestys: [...dialogi.querySelectorAll(
          '.lehti-ylarivi, .lehti-nimio, .lehti-alarivi, .lehti-paakuva',
        )].map((el) => el.className.split(' ')[0]).join(','),
      };
    }`;
    await sivu.evaluate(() => {
      const ui = window.matkakirja.ui;
      ui.avaaTutkinta(ui.game.cityOf());
    });
    await sivu.waitForTimeout(1400);
    const vanha = await sivu.evaluate((m) => {
      // eslint-disable-next-line no-eval
      const mitta = eval(m);
      const d = document.getElementById('arrival-dialog');
      return d?.open ? mitta(d) : null;
    }, KEHYSMITTA);
    vaadi(`${tunnus}: vanha kaupunkilehti aukeaa vertailtavaksi`, Boolean(vanha),
      virheet.join(' | '));
    await sivu.evaluate(() => document.getElementById('arrival-dialog')?.close());
    await sivu.waitForTimeout(600);

    await sivu.mouse.click(piste.x, piste.y);
    // Avausanimaatio (card-in, 0,32 s) loppuun ennen mittaa.
    await sivu.waitForTimeout(1500);

    /* ---- vartio 1–2: sama kehys, samat mitat ----------------------- */
    const uusi = await sivu.evaluate((m) => {
      // eslint-disable-next-line no-eval
      const mitta = eval(m);
      const d = document.querySelector('.kaupunkipopup-tiivis');
      return d?.open ? mitta(d) : null;
    }, KEHYSMITTA);
    vaadi(`${tunnus}: lehden masto on kortissa (kicker + päiväysrivi)`,
      Boolean(uusi) && uusi.kickerTeksti === 'Unohdettu aarre'
      && uusi.pvmPaiva.includes('matkapäivä')
      && uusi.mastoJarjestys === 'lehti-ylarivi,lehti-nimio,lehti-alarivi,lehti-paakuva',
      JSON.stringify(uusi && [uusi.kickerTeksti, uusi.pvmMaa, uusi.pvmPaiva,
        uusi.mastoJarjestys]));
    vaadi(`${tunnus}: tiivis etusivu on kaupunkilehden kehyksessä`,
      Boolean(uusi) && uusi.luokat === vanha?.luokat
      && uusi.kortinLuokat === vanha?.kortinLuokat,
      `uusi ${JSON.stringify(uusi && [uusi.luokat, uusi.kortinLuokat])}`
      + ` vanha ${JSON.stringify(vanha && [vanha.luokat, vanha.kortinLuokat])}`);
    if (vanha && uusi) {
      /*
       * Päiväysrivin TYYLI verrataan vain silloin, kun vanhassa rivissä
       * ei ole liitelinkkiä näkyvissä: `.lehti-alarivi:has(button
       * .maa-linkki:not([hidden]))` vaihtaa kapealla ruudulla rivin
       * flexiksi ja tasaa vasemmalle. Tiivis kortti noudattaa saman
       * säännön PERUSMUOTOA (keskitetty), koska sillä ei ole linkkiä —
       * ero on siis linkin, ei ulkoasun.
       */
      const liite = vanha.pvmTyyli.includes('| left |');
      const mitat = liite ? KEHYKSEN_MITAT : [...KEHYKSEN_MITAT, 'pvmTyyli'];
      if (liite) tieto(`${tunnus}: pvmTyyli`, 'VANHASSA liitelinkki vaihtaa rivin taiton — ohitettu');
      for (const mitta of mitat) {
        tieto(`${tunnus}: ${mitta}`, `VANHA ${vanha[mitta]} / UUSI ${uusi[mitta]}`);
        vaadi(`${tunnus}: ${mitta} sama kuin kaupunkilehdellä`,
          String(vanha[mitta]) === String(uusi[mitta]),
          `VANHA "${vanha[mitta]}" ≠ UUSI "${uusi[mitta]}"`);
      }
    }

    const kortti = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-tiivis');
      if (!p) return null;
      const r = (p.querySelector('.dialog-card') ?? p).getBoundingClientRect();
      const nakyy = (el) => el.getClientRects().length > 0;
      const kappaleet = [...p.querySelectorAll('.lehti-leipa > p')];
      const jarjestys = [...p.querySelectorAll(
        '.lehti-paakuva, .tiivis-kartta, .lehti-leipa',
      )].map((el) => el.className.split(' ')[0]);
      return {
        otsikko: p.querySelector('.lehti-nimio')?.firstChild?.textContent ?? '',
        kuvia: p.querySelectorAll('.lehti-paakuva img, .lehti-kuvarivi img').length,
        heroKorkeus: Math.round(
          p.querySelector('.lehti-paakuva')?.getBoundingClientRect().height ?? -1,
        ),
        kartta: Boolean(p.querySelector('.tiivis-kartta .kartta-kehys')),
        kohteita: p.querySelectorAll('.kaupunkikartta .maakartta-piste').length,
        jarjestys,
        kappaleita: kappaleet.length,
        nakyvat: kappaleet.filter(nakyy).map((el) => el.textContent),
        kokoTeksti: p.querySelector('.lehti-leipa')?.textContent ?? '',
        ennenNyt: p.querySelectorAll('.lehti-kuva-ennen, .lehti-kuva-nyt').length,
        matkailijalle: p.querySelectorAll('.matkailijalle').length,
        navi: p.querySelectorAll(
          '.kaupunkipopup-lehti, .lehti-hampurilainen, .lehti-sisallys,'
          + ' .tutki-navi, .tutki-alapalkki, .tutki-alanapit, .arrival-liuskat,'
          + ' .maa-liite-nappi',
        ).length,
        nappeja: p.querySelectorAll('.tiivis-jatka').length,
        nappiTeksti: p.querySelector('.tiivis-jatka')?.textContent ?? '',
        ruudulla: r.left >= -1 && r.top >= -1
          && r.right <= globalThis.innerWidth + 1 && r.bottom <= globalThis.innerHeight + 1,
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
    vaadi(`${tunnus}: kortti on ruudun sisällä`, kortti.ruudulla);
    vaadi(`${tunnus}: herokuvat kortissa`, kortti.kuvia > 0 && kortti.heroKorkeus > 0,
      `kuvia ${kortti.kuvia}, korkeus ${kortti.heroKorkeus}`);
    vaadi(`${tunnus}: kohdekartta kortissa numeropisteineen`,
      kortti.kartta && kortti.kohteita > 0, `kehys ${kortti.kartta}, ${kortti.kohteita} pistettä`);
    vaadi(`${tunnus}: kohdekartta ENNEN leipätekstiä`,
      kortti.jarjestys.join(',') === 'lehti-paakuva,tiivis-kartta,arrival-intro',
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
    await sivu.click('.tiivis-jatka', { timeout: 5000 })
      .catch(() => sivu.evaluate(() => document.querySelector('.tiivis-jatka')?.click()));
    await sivu.waitForTimeout(400);
    const jalkeen = await sivu.evaluate(() => {
      const p = document.querySelector('.kaupunkipopup-tiivis');
      if (!p) return null;
      const nakyy = (el) => el.getClientRects().length > 0;
      const kappaleet = [...p.querySelectorAll('.lehti-leipa > p')];
      return {
        nakyvat: kappaleet.filter(nakyy).map((el) => el.textContent),
        nappeja: p.querySelectorAll('.tiivis-jatka').length,
        kartta: Boolean(p.querySelector('.tiivis-kartta .kartta-kehys')),
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

    /* --- vartiot 10–11: turisti-info kaupungin vieressä ------------- */
    await sivu.evaluate(() => {
      // Vastakokeessa kortti voi olla div eikä dialogi — savuke ei saa
      // kaatua siihen, koska juuri silloin sen on kerrottava tulos.
      const el = document.querySelector('.kaupunkipopup-tiivis');
      if (typeof el?.close === 'function') el.close(); else el?.remove();
    });
    // Kartalle pääsee vasta kun modaali on oikeasti kiinni — muuten
    // sormi osuu sulkeutuvaan arkkiin eikä merkkiin.
    await sivu.waitForFunction(() => !document.querySelector('dialog[open]'),
      null, { timeout: 5000 }).catch(() => {});
    await sivu.evaluate(async () => {
      window.matkakirja.ui.pallolauta.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
    const merkki = await sivu.evaluate((id) => {
      const l = window.matkakirja.ui.pallolauta;
      const el = document.querySelector('.pallolauta-turisti-info');
      if (!el) return null;
      const kot = l.kotelo.getBoundingClientRect();
      const k = l.kaupunki(id);
      const kp = l.pallo.getScreenCoords(k.lat, k.lon, 0);
      const r = el.getBoundingClientRect();
      const limittyy = (a2, b2) => a2 && b2 && a2.x0 < b2.x1 && b2.x0 < a2.x1
        && a2.y0 < b2.y1 && b2.y0 < a2.y1;
      const info = l.merkit.laatikot('turistiinfo')[0] ?? null;
      const nimet = l.nimet.laatikot() ?? [];
      return {
        merkki: { x: r.left + r.width / 2, y: r.top + r.height / 2 },
        kaupunki: { x: kot.left + kp.x, y: kot.top + kp.y },
        infoLaatikko: info,
        nimiaOsuu: nimet.filter((n) => limittyy(info, n)).length,
        nimia: nimet.length,
        valipopup: document.querySelectorAll('.kaupunkipopup-info').length,
      };
    }, kaupunki.id);
    vaadi(`${tunnus}: turisti-infon merkki on kartalla`, Boolean(merkki),
      'merkkiä ei löytynyt');
    if (merkki) {
      const etaisyys = Math.round(Math.hypot(
        merkki.merkki.x - merkki.kaupunki.x, merkki.merkki.y - merkki.kaupunki.y,
      ));
      tieto(`${tunnus}: turisti-info ${kaupunki.nimi}n merkistä`, `${etaisyys} px`);
      vaadi(`${tunnus}: turisti-info on kaupungin VIERESSÄ (< ${TURISTI_INFO_ETAISYYS_MAX} px)`,
        etaisyys <= TURISTI_INFO_ETAISYYS_MAX, `${etaisyys} px`);
      vaadi(`${tunnus}: turisti-info on oma napautuskohteensa (> ${TURISTI_INFO_ETAISYYS_MIN} px)`,
        etaisyys >= TURISTI_INFO_ETAISYYS_MIN, `${etaisyys} px`);
      vaadi(`${tunnus}: turisti-info ei mene kaupungin nimen päälle`,
        merkki.nimiaOsuu === 0, `${merkki.nimiaOsuu}/${merkki.nimia} nimeä limittyy`);
      await sivu.mouse.click(merkki.merkki.x, merkki.merkki.y);
      // Opas on modaali arkki: odotetaan sen avautumista eikä kelloa.
      await sivu.waitForFunction(
        () => document.getElementById('nahtavyys-dialog')?.open === true,
        null, { timeout: 6000 },
      ).catch(() => {});
      const opas = await sivu.evaluate(() => {
        const d = document.getElementById('nahtavyys-dialog');
        return {
          auki: Boolean(d?.open),
          opasArkki: Boolean(d?.classList.contains('opas-arkki')),
          otsikko: document.getElementById('nahtavyys-otsikko')?.textContent ?? '',
          jaksoja: d?.querySelectorAll('.opas-jakso, .nahtavyys-kappale').length ?? 0,
          valipopup: document.querySelectorAll('.kaupunkipopup-info').length,
        };
      });
      tieto(`${tunnus}: oppaan otsikko`, opas.otsikko);
      vaadi(`${tunnus}: merkin napautus avaa SUORAAN ison oppaan`,
        opas.auki && opas.jaksoja > 0, JSON.stringify(opas));
      vaadi(`${tunnus}: välipop-upia ei ole DOMissa`, opas.valipopup === 0,
        `${opas.valipopup} kpl`);
      if (KUVAKANSIO) {
        await sivu.screenshot({
          path: join(KUVAKANSIO, `turisti-opas-${kaupunki.id}-${ruutu.width}.png`),
          scale: 'css',
          animations: 'disabled',
          timeout: 15000,
        }).catch(() => {});
      }
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
