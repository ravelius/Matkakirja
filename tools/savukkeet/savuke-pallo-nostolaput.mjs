/*
 * Savuke: NOSTOJEN LAPUT VÄISTÄVÄT KAUPUNGIN NIMEÄ.
 *
 * Omistajan vikailmoitus 7.9.2026 (kuvakaappaus Bukarestista,
 * sanatarkasti): *"kaupungin nimi menee nostojen päälle"*. Kuvassa
 * kaupunkipiste on keskellä, nimi BUKAREST harvennettuna sen alla ja
 * nostot molemmin puolin — ja oikean noston lappu makasi nimen päällä.
 *
 * Fablen linjaus (Raamattu, KAUPUNGIN NIMI NOSTOJEN PAALLA): pallolla
 * kaupungin nimi ja nostojen nimilaput eivät saa mennä päällekkäin.
 * Kaupungin nimi on ensisijainen; laput väistävät (vaihtoehtoinen
 * kylki → pieni siirto → lappu piiloon). Toteutus:
 * js/pallolauta/sovittelu.js, kutsu js/pallolauta/lauta.js ladoLevossa.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. LAPPU EI OLE NIMEN PÄÄLLÄ. Yksikään elävän noston nimilappu ei
 *      leikkaa yhdenkään kaupunkinimen laatikkoa neljässä tiheässä
 *      paikassa (Bukarest, Ateena, Helsinki, Istanbul).
 *   2. NIMI EI OLE LIIKKUMATTOMAN MUSTEEN PÄÄLLÄ. Poltettu nosto ja
 *      elävän noston ikoni eivät voi väistää, joten ne ovat nimen
 *      varauksia — yksikään nimi ei leikkaa niitä.
 *   3. NIMET EIVÄT KADONNEET SOVITTELUUN. Jokaisessa näkymässä on
 *      nimiä — väistön hinta ei saa olla mykkä kartta.
 *   6. LAPUN TEKSTI OTTAA NAPAUTUKSEN (Raamattu, VIAT v1672;
 *      omistaja 7.9.2026: *"Karttanostoissa teksti ei ota klikkausta
 *      ainoastaan kuvake. Saisiko myös tekstit klikattaviksi?"*).
 *      Oikea napautus lapun ulkokolmannekseen avaa saman noston —
 *      sekä elävällä (CSS2D-elementti) että poltetulla musteella.
 *   7. LAPPU ON KOSKETUSKOKOINEN (vika v1680; omistaja 7.9.2026 ilta,
 *      iPad: *"Symboli ottaa klikkauksen mutta teksti ei."*). Sama
 *      napautus KOSKETUSPOIKKEAMA_PX:n päässä musteen keskiviivasta —
 *      musteen ulkopuolelta, mutta sieltä mistä sormi tähtää — avaa
 *      saman noston. Vaakalapun muste on vain 11,4 px korkea, joten
 *      ilman osumatestin kosketusvaraa (js/pallolauta/lauta.js
 *      LAPUN_KOSKETUSVARA_PX) tämä napautus ei avaa mitään.
 *
 *   4. LAPPU LIUKUU, EI HYPPÄÄ. Sovittelun siirto kirjoitetaan
 *      `.pallolauta-nosto-siirto`-ryhmän CSS-muunnokseen, ja ryhmällä
 *      on 200 ms:n transform-siirtymä.
 *
 *   RAPORTIN TIETOJA: kuinka moni lappu vaihtoi kyljen, kuinka moni
 *   siirtyi ja kuinka moni jäi ilman nimeä kussakin näkymässä.
 *
 * MITTA TULEE KAAVASTA, EI RUUDULTA. Merkin oma <svg> on 1 x 1 px ja
 * ylivuotava, joten getBoundingClientRect ei kerro lapusta mitään;
 * kerros antaa laatikkonsa itse (nostot.lappuLaatikot, nostot.laatikot,
 * nimet.laatikot) samasta kaavasta, jolla sovittelu ne laski.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-nostolaput.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Näkymät: omistajan Bukarest ja kolme muuta tiheää paikkaa. */
const NAKYMAT = [
  { nimi: 'Bukarest', lat: 44.43, lng: 26.10 },
  { nimi: 'Ateena', lat: 37.98, lng: 23.73 },
  { nimi: 'Helsinki', lat: 60.17, lng: 24.94 },
  { nimi: 'Istanbul', lat: 41.01, lng: 28.98 },
];
/** Korkeudet, joilla jokainen näkymä mitataan (lähikuva ja maan mitta). */
const KORKEUDET = [0.05, 0.12];

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

/* Tallenne: Fogg Bukarestissa (omistajan näkymä), aarre löydetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'bukarest' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('bukarest');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
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
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));

if (auki) {
  await sivu.waitForTimeout(3500);

  /** Yksi näkymä: kamera paikalleen, ladonta heti, laatikot talteen. */
  const mittaa = (nakyma, korkeus) => sivu.evaluate(async ({ lat, lng, alt }) => {
    const l = window.matkakirja.ui.pallolauta;
    l.pallo.pointOfView({ lat, lng, altitude: alt }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
    const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    const nimet = l.nimet.laatikot();
    const laput = l.nostot.lappuLaatikot();
    const kiinteat = l.nostot.laatikot();
    const lappuNimi = [];
    for (const lappu of laput) {
      for (const n of nimet) if (limittyy(lappu, n)) lappuNimi.push(lappu.nimi || lappu.id);
    }
    const nimiKiintea = [];
    for (const n of nimet) {
      for (const k of kiinteat) if (limittyy(n, k)) nimiKiintea.push(`${n.x0.toFixed(0)},${n.y0.toFixed(0)}`);
    }
    // Piirtyikö sovittelun asento myös elementtiin (muunnos ja kylki)?
    let elementitTasmaa = true;
    for (const d of l.pallo.htmlElementsData()) {
      if (d.laji !== 'nosto' || !d.el?.isConnected || d.poistuu) continue;
      const g = d.el.querySelector('.pallolauta-nosto-siirto');
      if (!g) { elementitTasmaa = false; continue; }
      // Selain normalisoi muunnoksen tekstin (0.00px -> 0px), joten
      // luvut luetaan eikä merkkijonoa verrata.
      const luvut = /translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(g.style.transform || '');
      if (!luvut || Math.abs(Number(luvut[1]) - (d.dx ?? 0)) > 0.01
        || Math.abs(Number(luvut[2]) - (d.dy ?? 0)) > 0.01) elementitTasmaa = false;
      const kuva = g.querySelector('.nostosym-rasteri');
      if (kuva && d.nimioNakyy && d.nimi && kuva.dataset.puoli !== d.puoli) elementitTasmaa = false;
    }
    /*
     * PAKOTETTU VÄISTÖ: kaupungin nimen laatikko asetetaan lapun
     * ULKOPÄÄHÄN ja sovittelu ajetaan uudelleen. Oikeassa näkymässä
     * törmäyksiä on harvoin (laattaladonta on jo hyvä), joten ilman
     * pakotusta vartio ei todistaisi väistöstä mitään.
     *
     * ESTE ON LAPUN PÄÄ, EI KOKO LAATIKKO. Lapun laatikko on ikonin ja
     * nimiön YHDISTE, joten koko laatikon kokoinen este peittäisi myös
     * ikonin ruudun — ja koska ikoni on joka kyljellä samassa kohdassa,
     * yksikään vaihtoehto ei kelpaisi ja sovittelu menisi suoraan
     * piilotukseen. Nimen laatikko on oikeasti nimiön mittainen, joten
     * este on lapun uloin kolmannes sillä kyljellä, jolla nimiö on.
     *
     * Väistön jälkeen yksikään NÄKYVÄ lappu ei saa enää olla esteen
     * päällä — piiloon mennyt lappu ei ole enää näkyvä lappu.
     */
    // Todellisen näkymän luvut TALTEEN ennen pakotusta: pakotettu ajo
    // kirjoittaa saman mittarin yli.
    const sovitteluTodellinen = l.nostot.sovittelunTulos();
    const ennen = l.nostot.lappuLaatikot();
    const pakoteEsteet = ennen.map((r) => {
      const w = (r.x1 - r.x0) * 0.3;
      const h = (r.y1 - r.y0) * 0.3;
      if (r.puoli === 'vasen') return { x0: r.x0, x1: r.x0 + w, y0: r.y0, y1: r.y1 };
      if (r.puoli === 'yla') return { x0: r.x0, x1: r.x1, y0: r.y0, y1: r.y0 + h };
      if (r.puoli === 'ala') return { x0: r.x0, x1: r.x1, y0: r.y1 - h, y1: r.y1 };
      return { x0: r.x1 - w, x1: r.x1, y0: r.y0, y1: r.y1 };
    });
    let pakoteLimityksia = 0;
    let pakoteTulos = { siirretty: 0, piilotettu: 0, kylkiVaihtui: 0 };
    if (pakoteEsteet.length) {
      pakoteTulos = l.nostot.sovittele({ nimet: pakoteEsteet });
      for (const r of l.nostot.lappuLaatikot()) {
        for (const e of pakoteEsteet) if (limittyy(r, e)) pakoteLimityksia += 1;
      }
    }
    const g0 = document.querySelector('.pallolauta-nosto-siirto');
    return {
      pakotettuja: pakoteEsteet.length,
      pakoteLimityksia,
      pakoteTulos,
      nimia: nimet.length,
      lappuja: laput.length,
      kiinteita: kiinteat.length,
      lappuNimi,
      nimiKiintea,
      elementitTasmaa,
      sovittelu: sovitteluTodellinen,
      siirtyma: g0 ? getComputedStyle(g0).transitionDuration : null,
    };
  }, { lat: nakyma.lat, lng: nakyma.lng, alt: korkeus });

  let lappuNimiYht = 0;
  let nimiKiinteaYht = 0;
  let nimettomia = 0;
  let tasmaa = true;
  let siirtyma = null;
  let pakotettuja = 0;
  let pakoteLimityksia = 0;
  let pakoteKasitellyt = 0;
  for (const nakyma of NAKYMAT) {
    for (const korkeus of KORKEUDET) {
      // eslint-disable-next-line no-await-in-loop
      const m = await mittaa(nakyma, korkeus);
      lappuNimiYht += m.lappuNimi.length;
      nimiKiinteaYht += m.nimiKiintea.length;
      if (!(m.nimia > 0)) nimettomia += 1;
      if (!m.elementitTasmaa) tasmaa = false;
      pakotettuja += m.pakotettuja;
      pakoteLimityksia += m.pakoteLimityksia;
      pakoteKasitellyt += m.pakoteTulos.siirretty + m.pakoteTulos.piilotettu;
      siirtyma = m.siirtyma ?? siirtyma;
      tieto(`${nakyma.nimi} (korkeus ${korkeus})`,
        `nimiä ${m.nimia}, lappuja ${m.lappuja}, kiinteää mustetta ${m.kiinteita}, `
        + `kylki vaihtui ${m.sovittelu.kylkiVaihtui}, siirtoja ${m.sovittelu.siirretty}, `
        + `lappu piilossa ${m.sovittelu.piilotettu}, limityksiä ${m.lappuNimi.length}`);
      if (m.pakotettuja) {
        tieto(`  pakotettu väistö ${nakyma.nimi}`,
          `${m.pakotettuja} lappua: kylki ${m.pakoteTulos.kylkiVaihtui}, `
          + `siirto ${m.pakoteTulos.siirretty - m.pakoteTulos.kylkiVaihtui}, `
          + `piiloon ${m.pakoteTulos.piilotettu}`);
      }
      if (m.lappuNimi.length) tieto(`  limittyvät laput ${nakyma.nimi}`, m.lappuNimi.join(', '));
      if (KUVAKANSIO && korkeus === KORKEUDET[0]) {
        // eslint-disable-next-line no-await-in-loop
        await sivu.screenshot({ path: join(KUVAKANSIO, `pallo-nostolaput-${nakyma.nimi.toLowerCase()}.png`) });
      }
    }
  }
  vaadi('1. yksikään nostolappu ei leikkaa kaupungin nimen laatikkoa',
    lappuNimiYht === 0, `limityksiä ${lappuNimiYht}`);
  vaadi('2. yksikään kaupunkinimi ei leikkaa liikkumatonta mustetta (poltettu nosto, elävän ikoni)',
    nimiKiinteaYht === 0, `limityksiä ${nimiKiinteaYht}`);
  vaadi('3. jokaisessa näkymässä on nimiä (väistön hinta ei ole mykkä kartta)',
    nimettomia === 0, `nimettömiä näkymiä ${nimettomia}`);
  vaadi('4. sovittelun asento on myös elementissä (muunnos ja kylki) ja lappu liukuu 200 ms',
    tasmaa && siirtyma === '0.2s', `tasmaa=${tasmaa} siirtyma=${siirtyma}`);
  vaadi('5. pakotettu väistö toimii: este lapun päähän, eikä näkyvä lappu jää sen alle',
    pakotettuja > 0 && pakoteLimityksia === 0 && pakoteKasitellyt === pakotettuja,
    `pakotettuja ${pakotettuja}, käsiteltyjä ${pakoteKasitellyt}, limityksiä ${pakoteLimityksia}`);
  /*
   * 6. NAPAUTUS LAPUN TEKSTIIN AVAA SAMAN NOSTON (Raamattu, VIAT v1672;
   *    omistaja 7.9.2026 illalla sanatarkasti: *"Karttanostoissa teksti
   *    ei ota klikkausta ainoastaan kuvake. Saisiko myös tekstit
   *    klikattaviksi?"*).
   *
   *    NAPAUTUS ON OIKEA HIIREN NAPAUTUS KANKAALLE, ei kutsu laudan
   *    metodiin: sama polku kuin sormella (Globe.gl onGlobeClick →
   *    js/pallolauta/lauta.js napautaPintaan → lahinMerkki →
   *    lappuunOsunut).
   *
   *    MITTA ON OSUMAN OHJAUTUMINEN, EI KORTIN AUKEAMINEN. Kortin
   *    sisältö (skandaalikortti, nähtävyyskortti) syntyy pakan ja
   *    ämpärin datasta, jota tämä savuke ei tarjoile; vika ja korjaus
   *    ovat osumatestissä. Siksi jokaisen ruudulla olevan noston oma
   *    `avaa` kääritään mittariin, ja vartio lukee, KENELLE napautus
   *    meni.
   *
   *    KOLME LAPPUA KUSTAKIN NÄKYMÄSTÄ:
   *      a) omistajan nimeämä lappu (Bukarest "Strousberg", Helsinki
   *         "Kirjasota", Istanbul "Mustameri") tekstin keskeltä;
   *      b) ensimmäinen ELÄVÄ lappu (polttamaton nosto, jolla on oma
   *         CSS2D-elementti) — poltettu ja elävä muste kulkevat eri
   *         polkua, ja molempien on otettava napautus;
   *      c) lappu, jonka ULOMPI PÄÄ jäi vanhan säännön (lähin merkki
   *         44 px) ulottumattomiin tai osui TOISEEN nostoon — juuri se
   *         tilanne, josta omistaja kirjoitti. Mitattu 7.9.2026:
   *         Bukarestissa yhdeksän lappua yhdestätoista, mm. "Draculan
   *         alaviite" ja "Nadia Comăneci", eivät saaneet ulkopäästään
   *         mitään; "Branin linna" ja "Balkanvuoret" avasivat naapurin.
   *
   *    JOKAINEN LAPPU NAPAUTETAAN KAHDESTI: täsmälleen musteen
   *    keskiviivalta JA SORMEN POIKKEAMALLA (KOSKETUSPOIKKEAMA_PX
   *    kohtisuoraan tekstistä ulos). Poikkeama on se, mikä vian
   *    v1680 paljasti (omistaja 7.9.2026 ilta, iPad: *"Symboli ottaa
   *    klikkauksen mutta teksti ei."*): vaakalapun muste on vain
   *    11,4 px korkea, ja siitä meni jopa 3,9 px napautuksen oman
   *    ruutupisteen projektioeroon — sormelle jäi pari pikseliä.
   *    Osumatestin kosketusvara (js/pallolauta/lauta.js
   *    LAPUN_KOSKETUSVARA_PX) antaa tekstille saman 44 px:n
   *    kosketuspinnan, joka kuvakkeella on säteenään; ilman sitä
   *    poikkeamanapautukset eivät avaa mitään.
   */
  const LAPPUNAKYMAT = [
    { nimi: 'Bukarest', lat: 44.43, lng: 26.10, etsi: 'strousberg' },
    { nimi: 'Helsinki', lat: 60.17, lng: 24.94, etsi: 'kirjasota' },
    { nimi: 'Istanbul', lat: 41.01, lng: 28.98, etsi: 'mustameri' },
  ];
  /** Sormen poikkeama tekstin keskiviivasta kohtisuoraan ulos (px). */
  const KOSKETUSPOIKKEAMA_PX = 8;
  /** Yksi näkymä: kamera, ladonta ja napautuskohteet lapuista. */
  const lappukohteet = (nakyma, korkeus) => sivu.evaluate(async ({
    lat, lng, alt, etsi, poikkeama,
  }) => {
    const l = window.matkakirja.ui.pallolauta;
    l.pallo.pointOfView({ lat, lng, altitude: alt }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
    const p = l.pallo;
    const koti = l.kotelo.getBoundingClientRect();
    /*
     * OSUMALAATIKOT, EI VAIN ELÄVÄT LAPUT: tiheässä näkymässä nostot
     * ovat jo POLTETTU laattaan eikä niillä ole elementtiä — mutta
     * niiden nimiö on yhtä lailla ruudulla ja sormen alla. Kerros
     * antaa saman laatikon, jota osumatesti käyttää.
     */
    const laput = l.nostot.osumaLaatikot().filter((r) => r.perhe === 'nosto' && r.nimi);
    /**
     * Napautuspiste lapun tekstistä: `osuus` 0,5 = keskeltä, 1 =
     * ulkopää; `sivuun` siirtää pistettä kohtisuoraan tekstistä ulos
     * (sormen poikkeama).
     */
    const kohta = (r, osuus, sivuun = 0) => {
      const puoli = r.puoli ?? 'oikea';
      const w = (r.x1 - r.x0) * 0.3;
      const h = (r.y1 - r.y0) * 0.3;
      const ky = (r.y0 + r.y1) / 2 + sivuun;
      const kx = (r.x0 + r.x1) / 2 + sivuun;
      if (puoli === 'vasen') return { x: r.x0 + w * (1 - osuus) + 2, y: ky };
      if (puoli === 'yla') return { x: kx, y: r.y0 + h * (1 - osuus) + 2 };
      if (puoli === 'ala') return { x: kx, y: r.y1 - h * (1 - osuus) - 2 };
      return { x: r.x1 - w * (1 - osuus) - 2, y: ky };
    };
    /** Kenelle VANHA sääntö (lähin merkki 44 px) antaisi tämän pisteen? */
    const vanhaVoittaja = (piste) => {
      let paras = null;
      let matka = 44;
      for (const o of l.nostot.osumat()) {
        const s = p.getScreenCoords(o.lat, o.lng, 0);
        if (!s) continue;
        const d = Math.hypot(s.x - piste.x, s.y - piste.y);
        if (d < matka) { matka = d; paras = o.id; }
      }
      return paras;
    };
    const rivi = (r, osuus, sivuun, laji) => {
      const piste = kohta(r, osuus, sivuun);
      const vanha = vanhaVoittaja(piste);
      return {
        laji,
        id: r.id,
        nimi: r.nimi,
        poltettu: r.poltettu,
        sormella: sivuun !== 0,
        vanha: vanha === r.id ? 'sama' : (vanha ? 'toinen' : 'ei mitään'),
        x: koti.left + piste.x,
        y: koti.top + piste.y,
      };
    };
    /** Valitut laput: nimetty, ensimmäinen elävä ja ulottumaton pää. */
    const valitut = [];
    const lisaa = (r, laji, osuus) => {
      if (!r || valitut.some((v) => v.r.id === r.id)) return;
      valitut.push({ r, laji, osuus });
    };
    lisaa(laput.find((v) => v.nimi.toLowerCase().includes(etsi)), 'nimetty', 0.5);
    lisaa(laput.find((v) => !v.poltettu), 'elävä', 0.5);
    // Ensimmäinen, jonka ULKOPÄÄ jäi vanhalta säännöltä saamatta.
    for (const r of laput) {
      if (rivi(r, 1, 0, 'ulottumaton').vanha === 'sama') continue;
      lisaa(r, 'ulottumaton', 1);
      break;
    }
    // Kumpikin: muste keskeltä ja sormen poikkeamalla musteen ulkopuolelta.
    const ulos = [];
    for (const v of valitut) {
      ulos.push(rivi(v.r, v.osuus, 0, v.laji));
      ulos.push(rivi(v.r, v.osuus, poikkeama, `${v.laji}+sormi`));
    }
    return ulos;
  }, {
    lat: nakyma.lat,
    lng: nakyma.lng,
    alt: korkeus,
    etsi: nakyma.etsi,
    poikkeama: KOSKETUSPOIKKEAMA_PX,
  });

  // Musteen napautukset (vartio 6) ja sormen poikkeamat (vartio 7)
  // lasketaan erikseen, jotta vartiot mittaavat eri asiaa.
  let lappuKokeita = 0;
  let lappuOsui = 0;
  let ulottumattomia = 0;
  let sormiKokeita = 0;
  let sormiOsui = 0;
  let sormiElavia = 0;
  let sormiPoltettuja = 0;
  for (const nakyma of LAPPUNAKYMAT) {
    // eslint-disable-next-line no-await-in-loop
    const kohteet = await lappukohteet(nakyma, KORKEUDET[1]);
    for (const kohde of kohteet) {
      /*
       * MITTARI JOKAISEN NOSTON `avaa`:iin. Osumat pysyvät samoina,
       * koska kamera ei liiku napautusten välissä (ladonta ajetaan vain
       * levossa kameran liikuttua).
       */
      // eslint-disable-next-line no-await-in-loop
      await sivu.evaluate(async () => {
        const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
        suljeFokuskohde(window.matkakirja.ui);
        // Auki jäänyt kortti nielaisisi seuraavan napautuksen
        // (js/pallolauta/lauta.js korttivahti).
        for (const el of document.querySelectorAll(
          '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
          + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup',
        )) el.remove();
        window.__avattu = [];
        for (const o of window.matkakirja.ui.pallolauta.nostot.osumat()) {
          if (o.__mittari) continue;
          const alkuperainen = o.avaa;
          o.__mittari = true;
          o.avaa = (ankkuri) => { window.__avattu.push(o.id); return alkuperainen(ankkuri); };
        }
      });
      if (kohde.sormella) {
        sormiKokeita += 1;
        if (kohde.poltettu) sormiPoltettuja += 1; else sormiElavia += 1;
      } else {
        lappuKokeita += 1;
        if (kohde.laji === 'ulottumaton') ulottumattomia += 1;
      }
      // eslint-disable-next-line no-await-in-loop
      await sivu.mouse.click(kohde.x, kohde.y);
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(500);
      // eslint-disable-next-line no-await-in-loop
      const avattu = await sivu.evaluate(() => window.__avattu ?? []);
      const oikein = avattu.length === 1 && avattu[0] === kohde.id;
      if (oikein && kohde.sormella) sormiOsui += 1;
      else if (oikein) lappuOsui += 1;
      tieto(`  napautus ${nakyma.nimi} (${kohde.laji})`,
        `"${kohde.nimi}"${kohde.poltettu ? ' (poltettu)' : ''}, vanha sääntö: ${kohde.vanha} `
        + `→ avautui ${avattu.join(', ') || 'ei mitään'}`);
    }
  }
  vaadi('6. napautus nimilapun tekstiin avaa saman noston (myös kuvakkeen ulottumattomissa)',
    lappuKokeita >= 3 && ulottumattomia >= 1 && lappuOsui === lappuKokeita,
    `napautuksia ${lappuKokeita} (joista vanhan säännön ulottumattomissa ${ulottumattomia}), `
    + `oikein ${lappuOsui}`);
  /*
   * 7. LAPUN TEKSTI ON KOSKETUSKOKOINEN (vika v1680; omistaja 7.9.2026
   *    ilta, iPad: *"Symboli ottaa klikkauksen mutta teksti ei."*).
   *    Napautus KOSKETUSPOIKKEAMA_PX:n päässä musteen keskiviivasta —
   *    eli musteen ulkopuolelta, mutta sieltä mistä sormi lappua
   *    tähtää — avaa saman noston kuin muste itse, sekä elävällä että
   *    poltetulla musteella. Ennen kosketusvaraa (js/pallolauta/lauta.js
   *    LAPUN_KOSKETUSVARA_PX) nämä napautukset eivät avanneet mitään:
   *    vaakalapun muste on vain 11,4 px korkea.
   */
  vaadi('7. lapun teksti ottaa napautuksen myös sormen poikkeamalla '
    + `(${KOSKETUSPOIKKEAMA_PX} px musteen ulkopuolelta), elävällä ja poltetulla musteella`,
    sormiKokeita >= 3 && sormiElavia >= 1 && sormiPoltettuja >= 1 && sormiOsui === sormiKokeita,
    `poikkeamanapautuksia ${sormiKokeita} (eläviä ${sormiElavia}, poltettuja `
    + `${sormiPoltettuja}), oikein ${sormiOsui}`);

  tieto('sivun virheet', virheet.length ? virheet.join(' | ') : 'ei yhtään');
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
