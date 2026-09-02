/*
 * Savuke: JOKAINEN KOHDEKAUPUNKI ON KARTALLA, JA SEN NIMI ON OMANSA.
 *
 * OMISTAJAN BUGIRAPORTTI 2.9.2026 ilta (kuvakaappaukset pääkartalta
 * uuden polton jälkeen), kolme havaintoa neljästä:
 *
 *   A  *"Kaikki kohdekaupungit saisi olla koko ajan noilla
 *      harvennetuilla kapitaaleilla kirjoitettuna"* — Ateena pysyi
 *      kapiteelilla, Sofia vaihtoi asua sen mukaan, seisoiko nappula
 *      siinä.
 *   B  *"osa kaupungeista ei näy kartalla ollenkaan"* (Euroopan
 *      yleisnäkymä, mittajana 1000 km).
 *   D  *"Sofia menee päällekkäin jonkun noston tekstin kanssa
 *      kartalla"* (mittajana 50 km, laattaan poltettu Vitošan nimi).
 *
 * ── MIKSI SAVUKE EIKÄ PELKKÄ YKSIKKÖTESTI ─────────────────────────
 *
 * Ladonnan oman puolen todistaa yksikkötesti (tests/karttanimet.test.mjs)
 * kaikilla mittakaavoilla kerralla. Se ei kuitenkaan näe kahta asiaa,
 * jotka ovat juuri tämän bugiraportin ydin:
 *
 *   1. LAATTAAN POLTETTUA MUSTETTA. Poltettu nosto ei ole ladonnan
 *      syötettä ennen kuin kohdekerros ilmoittaa sen varauksena
 *      (js/fokuskohteet.js poltettujenNostojenVaraukset), ja se ketju
 *      kulkee UI:n asettumisen läpi — sitä ei ole olemassa Nodessa.
 *      Siksi tämä savuke lataa OIKEAN laattaluettelon ämpäristä: ilman
 *      sitä yksikään nosto ei ole poltettu ja väite D menee läpi
 *      tyhjänä.
 *   2. KIRJASINTA. Asu (`font-variant: small-caps`) ja harvennus ovat
 *      elementin määreitä, ja niiden on selvittävä ladonnasta piirtoon
 *      asti. Sen näkee vain ruudulta.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. EI KADONNEITA KOHDEKAUPUNKEJA. Jokainen laudan kaupunki, joka
 *      on näkymän sisällä, on kartalla NIMENÄ. (Merkki seuraa nimeä:
 *      js/karttanimet.js piirtää pisteen vain nimen saaneelle.)
 *   2. JOKAINEN KOHDEKAUPUNGIN NIMI ON HARVENNETTU KAPITEELI, myös
 *      se, jossa nappula ei seiso.
 *   3. YKSIKÄÄN KAUPUNGIN NIMI EI OSU LAATTAAN POLTETTUUN NOSTOON.
 *      Varaukset tulevat kohdekerrokselta; tämä lukee ne ruudulta ja
 *      vertaa nimiöiden laatikoihin.
 *   4. YKSIKÄÄN NIMI EI OSU TOISEEN NIMEEN. Yksi ladonta, yksi
 *      törmäysjoukko — päällekkäisyys tarkoittaisi, että jokin kerros
 *      on livennyt ladonnan ohi.
 *   5. MUSTE ON POLTETUN LAATAN MUSTETTA (omistaja: *"vähän
 *      haaleammalla sävyllä jotta sopisivat noiden poltettujen
 *      tekstien kanssa paremmin"*). Mitattu sävy on
 *      css/styles.css --karttamuste; tämä lukee sen ruudulta.
 *   6. KOHDEKAUPUNGIN NIMI ON ISOMPI KUIN KOHTEIDEN NIMET (omistaja:
 *      *"Kohdekaupungin nimi voi kyllä olla hieman isommalla kuin
 *      muiden kohteiden nimet"*).
 *   7. WIEN EI LEIKKAA NAAPURIMAAN POLTETTUA NOSTOA (omistajan päätös
 *      2.9.2026 ilta: *"Korjaa: lataa naapurimaat"*). Bulgarian
 *      näkymässä ruudun laidassa on Wien, ja sen nimi leikkasi
 *      ITÄVALLAN laattaan poltettua nostonimiötä — varaus tunsi siihen
 *      asti vain sen maan nostot, jossa pelaaja seisoo
 *      (js/fokuskohteet.js naapurienPoltetutVaraukset).
 *
 * KOLME NÄKYMÄÄ, KAIKKI OMISTAJAN KAAPPAUKSISTA: Euroopan yleisnäkymä
 * (~1000 km), Bulgarian maalehti (~200 km) ja Sofian lähikuva
 * (~50 km).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kohdekaupungit.mjs [kuvakansio]
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

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
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

/*
 * ÄMPÄRI KULKEE NODEN KAUTTA, EI SELAIMEN. Kontin selain ei osaa
 * agenttivälityspalvelinta eikä sen juurivarmennetta, mutta Noden fetch
 * osaa (CLAUDE.md: NODE_USE_ENV_PROXY=1). Reititys hakee tavut täällä ja
 * antaa ne selaimelle — silloin näkymässä on OIKEA laattaluettelo ja
 * OIKEAT nostolaatat, ja väite 3 mittaa sitä mustetta, jonka omistaja
 * ruudullaan näkee.
 */
const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
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
/* Onko ämpäri tavoitettavissa? Ilman sitä väite 3 on sokea. */
const luettelo = await ampariHaku(`${AMPARI}julisteet/pyramidi/pyramidi.json`);
const AMPARI_TOIMII = luettelo?.status === 200;
if (!AMPARI_TOIMII) {
  console.log('HUOM  ämpäri ei vastaa — poltettuja nostoja ei ole, väite 3 jää tyhjäksi');
}

/*
 * NÄKYMÄ VALITAAN MITTAJANASTA, EI ASKELMÄÄRÄSTÄ. Zoomiportaikko
 * riippuu ruudun leveydestä (js/kartta.js zoomiTasot), joten kiinteä
 * askelluku osuisi eri näkymään eri laitteella — ja juuri mittajana on
 * se luku, jonka omistaja kaappauksiinsa kirjoitti.
 */
const NAKYMAT = [
  { nimi: 'Eurooppa', jana: '1000 km', tiedosto: 'n1-eurooppa.png' },
  { nimi: 'Bulgaria', jana: '200 km', tiedosto: 'n1-bulgaria.png' },
  { nimi: 'Sofia', jana: '50 km', tiedosto: 'n1-sofia.png' },
];

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'sofia' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('sofia', 'topaz');
peli.revealed.delete('sofia');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 }, deviceScaleFactor: 2, reducedMotion: 'reduce',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-fokusmoodi');
    /* Kehittäjän maailmanappi: yleisnäkymässä koko lauta on kartalla,
     * kuten omistajan kaappauksessa. */
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
  });
});
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
await sivu.waitForTimeout(4000);

/*
 * KELLUVAT KORTIT POIS TYYLILLÄ, EI SOLMUJA POISTAMALLA. Pöllön paneeli
 * ja matkapäiväkirjan lappu palaavat jokaisen asettumisen jälkeen
 * (moduulit pitävät solmuunsa viitettä ja liittävät sen takaisin), joten
 * poisto ei pysy — CSS pysyy. Sääntö koskee VAIN kartan päällä kelluvia
 * kortteja; SVG-kerrokset, joita tämä savuke mittaa, eivät kuulu siihen
 * eikä niiden ladonta muutu tästä millään tavalla.
 */
await sivu.addStyleTag({
  content: '.pollo-paneeli, .pollo-nappi, .fokusvirta-kupla, .fact-card,'
    + ' .minipopup, .pollo-vihje { display: none !important; }',
});

/*
 * KARTTA NÄKYVIIN. Päiväkirjan lappu, pöllön kupla ja saapumisruutu
 * peittävät osan kartasta, ja niiden alla oleva nimi näyttäisi
 * kadonneelta. Poistumistie on jokaisella sama: *"Jatka"*-nappi tai
 * Escape.
 */
const siivoa = async () => {
  for (let i = 0; i < 8; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const painoi = await sivu.evaluate(() => {
      /* NÄKYVYYS getClientRectsilla eikä offsetParentilla: minipopup on
       * <dialog> eli position: fixed, ja fixed-elementin offsetParent on
       * null — sulkuruksi jäi siksi löytymättä ja kortti kartan päälle. */
      const nappi = [...document.querySelectorAll('button')].find((b) => b.getClientRects().length
        && (/^Jatka/.test(b.textContent?.trim() ?? '')
          || b.classList.contains('minipopup-sulje')
          || b.getAttribute('aria-label') === 'Sulje'));
      if (!nappi) return false;
      nappi.click();
      return true;
    });
    /*
     * VIIMEINEN KEINO: kortti pois solmuna. Pöllön kortti avautuu
     * saapumisesta ja palaa jokaisen asettumisen jälkeen, eikä sen
     * sulkeminen ole tämän savukkeen aihe — kartta on. Poisto koskee
     * vain kartan PÄÄLLÄ kelluvaa korttia; SVG-kerroksiin, joita tämä
     * mittaa, se ei koske millään tavalla.
     */
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => {
      for (const solmu of document.querySelectorAll(
        '.minipopup, .pollo-paneeli, .paivakirjalappu, .reveal',
      )) solmu.remove();
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.keyboard.press('Escape');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
    if (!painoi && i > 2) break;
  }
};

/*
 * NÄKYMÄ PELAAJAN KAUPUNKIIN. Zoomipainike tarttuu näkymän
 * keskipisteeseen eli maan ikkunan keskukseen, ja Sofia jää sieltä
 * ruudun ulkopuolelle — juuri se näkymä on omistajan kaappauksissa.
 *
 * SIIRTO TEHDÄÄN KARTAN OMALLA KAHVALLA (ui.kartta.asetaPan) EIKÄ
 * HIIRELLÄ. Raahaus ruudun keskeltä osui kartalla oleviin merkkeihin ja
 * avasi niiden kortteja — kaappauksessa oli kortti eikä karttaa. Sama
 * kaava kuin kartan omassa keskityksessä (js/kartta.js
 * nykyinenKeskipiste, käänteisenä), ja sen jälkeen sama asettuminen
 * kuin eleen päättyessä (ui.taydennaTaide).
 */
const keskitaKaupunkiin = async (tunnus) => {
  await sivu.evaluate((id) => {
    const ui = window.matkakirja.ui;
    const kaupunki = (ui.game.pack.cities ?? []).find((c) => c.id === id);
    if (!kaupunki) return;
    /*
     * SAMA KOLME RIVIÄ KUIN MANTEREELLE ZOOMATESSA (js/kartta.js
     * zoomaaMantereelle): kohde, tyhjä pan ja uusi sovitus. Suora
     * asetaPan ei riitä — pan on rajattu lavaikkunaan, joka on rakennettu
     * EDELLISEN näkymän ympärille, eikä Sofia mahdu siihen sen jälkeen kun
     * zoomi on tarttunut maailmannäkymän keskipisteeseen.
     */
    ui.zoomKohde = { x: kaupunki.x, y: kaupunki.y, id: kaupunki.id };
    ui.panX = null;
    ui.panY = null;
    ui.kartta.fitViewBox();
    ui.taydennaTaide({ heti: true });
  }, tunnus);
  await sivu.waitForTimeout(2000);
};

await siivoa();

/** Mittaus yhdestä näkymästä: kaikki luvut samasta kuvasta. */
const mittaa = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const nak = ui.nakyvaAlue();
  const rk = (e) => {
    const r = e.getBoundingClientRect();
    return {
      x0: +r.x.toFixed(1), y0: +r.y.toFixed(1), x1: +(r.x + r.width).toFixed(1),
      y1: +(r.y + r.height).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
    };
  };
  const ruudulla = (r) => r.w > 0 && r.h > 0 && r.x1 > 0 && r.x0 < window.innerWidth
    && r.y1 > 0 && r.y0 < window.innerHeight;

  /*
   * NÄKYMÄN SISÄLLÄ = RUUDULLA, EI LAUDAN LAATIKOSSA. Kartta on
   * kierrettävä ja sitä siirretään kompositorilla, joten ainoa
   * varmasti oikea vastaus on se, minkä selain itse laskee.
   * Kaupungin paikka luetaan sen omasta laattasolmusta (.cities),
   * jonka lauta piirtää joka tapauksessa.
   */
  const laudanKaupungit = ui.game.pack.cities ?? [];
  const nimet = [...document.querySelectorAll('.karttanimet text.karttanimi')]
    .map((e) => {
      const tyyli = getComputedStyle(e);
      return {
        teksti: e.textContent,
        laji: (e.getAttribute('class') ?? '').replace('karttanimi karttanimi-', ''),
        variantti: tyyli.fontVariantCaps || tyyli.fontVariant,
        harvennus: tyyli.letterSpacing,
        vari: tyyli.fill,
        koko: +parseFloat(tyyli.fontSize || '0').toFixed(2),
        ...rk(e),
      };
    })
    .filter((n) => ruudulla(n));
  const nimiTekstit = new Set(nimet.map((n) => n.teksti));

  /*
   * MIKÄ KAUPUNKI ON NÄKYMÄSSÄ. Laudan koordinaatit muunnetaan
   * ruuduksi samalla kaavalla kuin nimikerros: (x - nak.x) * skaala.
   * Reunalle jätetään puolen nimen levyinen kaista, koska nimikerros
   * tekee solmun vain näkymään — reunan takana oleva kaupunki
   * näyttäisi kadonneelta ilman että mikään on vialla.
   */
  /*
   * LAUDAN KOORDINAATIT RUUDULLE NIMIKERROKSEN OMALLA MUUNNOKSELLA.
   * Nimien laatikot luetaan getBoundingClientRectillä eli ikkunan
   * koordinaateissa; (x - nak.x) * skaala ei kelpaa vertailukohdaksi,
   * koska se jättää huomiotta karttaruudun oman paikan sivulla
   * (otsikkopalkki, marginaalit) — ero on satakunta pikseliä, ja se
   * riittää tekemään törmäysmittauksesta pelkkää kohinaa. getScreenCTM
   * antaa täsmälleen sen muunnoksen, jolla selain nimet piirtää.
   */
  const kerros = document.querySelector('.karttanimet');
  const ctm = kerros?.getScreenCTM?.();
  const ruudulle = (x, y) => (ctm
    ? { x: ctm.a * x + ctm.c * y + ctm.e, y: ctm.b * x + ctm.d * y + ctm.f }
    : { x: (x - nak.x) * nak.skaala, y: (y - nak.y) * nak.skaala });

  const REUNA = 60;
  const kartalla = [];
  const puuttuu = [];
  for (const c of laudanKaupungit) {
    const r = ruudulle(c.x, c.y);
    if (r.x < REUNA || r.y < REUNA || r.x > window.innerWidth - REUNA
      || r.y > window.innerHeight - REUNA) continue;
    (nimiTekstit.has(c.name) ? kartalla : puuttuu).push(c.name);
  }

  const poltetut = (ui.poltetutNostovaraukset ?? []).map((v) => {
    const a = ruudulle(v.x0, v.y0);
    const b = ruudulle(v.x1, v.y1);
    return {
      x0: Math.min(a.x, b.x), y0: Math.min(a.y, b.y),
      x1: Math.max(a.x, b.x), y1: Math.max(a.y, b.y),
    };
  });

  const limittyy = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
  const poltonPaalla = nimet
    .filter((n) => poltetut.some((p) => limittyy(n, p)))
    .map((n) => {
      const osuvat = poltetut.filter((p) => limittyy(n, p))
        .map((p) => `[${p.x0.toFixed(0)},${p.y0.toFixed(0)}-${p.x1.toFixed(0)},${p.y1.toFixed(0)}]`);
      return `${n.laji}/${n.teksti} nimi[${n.x0.toFixed(0)},${n.y0.toFixed(0)}-`
        + `${n.x1.toFixed(0)},${n.y1.toFixed(0)}] vs ${osuvat.join(' ')}`;
    });
  /*
   * WIEN ERIKSEEN (omistajan päätös 2.9.2026 ilta: *"Korjaa: lataa
   * naapurimaat"*). Bulgarian maalehtinäkymässä ruudun vasemmassa
   * laidassa on Wien, ja sen nimi leikkasi NAAPURIMAAN eli Itävallan
   * laattaan poltetun nostonimiön — varaus kattoi siihen asti vain sen
   * maan, jossa pelaaja seisoo. Väite 3 löytäisi tämän joukosta, mutta
   * nimetty väite kertoo suoraan, onko juuri se korjaus voimassa.
   */
  const wien = nimet.find((n) => n.teksti === 'Wien') ?? null;
  const wienOsumat = wien
    ? poltetut.filter((p) => limittyy(wien, p)).map(
      (p) => `[${p.x0.toFixed(0)},${p.y0.toFixed(0)}-${p.x1.toFixed(0)},${p.y1.toFixed(0)}]`,
    )
    : [];
  const nimiParit = [];
  for (let i = 0; i < nimet.length; i += 1) {
    for (let j = i + 1; j < nimet.length; j += 1) {
      if (limittyy(nimet[i], nimet[j])) {
        nimiParit.push(`${nimet[i].teksti} x ${nimet[j].teksti}`);
      }
    }
  }

  const kaupunkiNimet = nimet.filter((n) => n.laji === 'kaupunki');
  const kohdeNimet = nimet.filter((n) => n.laji === 'kohde');
  const kokoja = (lista) => (lista.length
    ? { min: Math.min(...lista.map((n) => n.koko)), max: Math.max(...lista.map((n) => n.koko)) }
    : null);
  return {
    skaala: +nak.skaala.toFixed(4),
    /* Ladonnan oma lukema: montako nimiötä jouduttiin pakottamaan. */
    ladonta: window.__karttanimienMitat?.() ?? null,
    mittajana: document.querySelector('.fokus-jana-maksimi')?.textContent ?? null,
    nimia: nimet.length,
    kaupunkiNimia: kaupunkiNimet.length,
    kohdeNimia: kohdeNimet.length,
    kartalla: kartalla.length,
    puuttuu,
    /* Asu: jokaisen kaupungin nimen on oltava harvennettu kapiteeli. */
    ilmanKapiteelia: kaupunkiNimet
      .filter((n) => !/small-caps/.test(n.variantti)).map((n) => n.teksti),
    ilmanHarvennusta: kaupunkiNimet
      .filter((n) => !(parseFloat(n.harvennus) > 0)).map((n) => n.teksti),
    varit: [...new Set(nimet.map((n) => n.vari))],
    kaupunginKoko: kokoja(kaupunkiNimet),
    kohteenKoko: kokoja(kohdeNimet),
    /* Kaikkien lajien koot samasta kuvasta: kaupungin on oltava suurin. */
    lajienKoot: Object.fromEntries([...new Set(nimet.map((n) => n.laji))]
      .map((laji) => [laji, kokoja(nimet.filter((n) => n.laji === laji))])),
    poltettujaVarauksia: poltetut.length,
    poltonPaalla,
    wienNakyy: Boolean(wien),
    wienOsumat,
    nimiParit,
  };
});

const jana = () => sivu.evaluate(
  () => document.querySelector('.fokus-jana-maksimi')?.textContent ?? null,
);
/** Mittajanan luku kilometreinä ("1000 km" -> 1000). */
const janaKm = (teksti) => Number(String(teksti ?? '').replace(',', '.').replace(/[^\d.]/g, ''));

/*
 * ZOOMAA JA KESKITÄ, KUNNES MITTAJANA ON HALUTTU.
 *
 * KUMPIKIN SUUNTA, KOSKA JANA EI OLE MONOTONINEN ASKELISSA. Jana on
 * kilometrejä ja kilometri riippuu leveysasteesta, joten keskitys
 * Sofiaan MUUTTAA janaa vaikka mittakaava pysyy: sama porras luki
 * Saharan kohdalla 1000 km ja Sofian kohdalla 500 km. Siksi keskitys ja
 * zoomaus vuorottelevat, ja askel valitaan lukemasta eikä oletuksesta.
 */
const zoomaaJanaan = async (tavoite) => {
  const km = janaKm(tavoite);
  for (let i = 0; i < 24; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await keskitaKaupunkiin('sofia');
    // eslint-disable-next-line no-await-in-loop
    const nyt = janaKm(await jana());
    if (nyt === km) return true;
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate((suunta) => window.matkakirja.ui.kartta.zoomaaPainikkeella(suunta),
      nyt > km ? 1 : -1);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(700);
  }
  return janaKm(await jana()) === km;
};

/*
 * KESKITYS ENNEN ZOOMAUSTA, JA SE ON JÄRJESTYSVAATIMUS. Mittajana on
 * kilometrejä, ja kilometri lautayksikköä kohti riippuu LEVEYSASTEESTA
 * (js/fokusmitat.js: 111,32 x cos(lat)). Sama mittakaava on Saharassa
 * "1000 km" ja Sofiassa "500 km" — jos näkymä keskitettäisiin vasta
 * zoomauksen jälkeen, savuke mittaisi eri näkymää kuin se, jonka
 * mittajanan se tarkisti.
 */
await keskitaKaupunkiin('sofia');
await siivoa();

for (const nakyma of NAKYMAT) {
  // eslint-disable-next-line no-await-in-loop
  const osui = await zoomaaJanaan(nakyma.jana);
  // eslint-disable-next-line no-await-in-loop
  await siivoa();
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(2500);
  vaadi(`${nakyma.nimi}: mittajana on ${nakyma.jana} kuten kaappauksessa`,
    osui, `jana ${await jana()}`);
  // eslint-disable-next-line no-await-in-loop
  const m = await mittaa();
  const nimi = `${nakyma.nimi} (${m.mittajana ?? '?'}, skaala ${m.skaala})`;
  console.log(`\n=== ${nimi} ===`);
  console.log(JSON.stringify(m, null, 1));
  if (KUVAKANSIO) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({ path: join(KUVAKANSIO, nakyma.tiedosto) });
  }

  vaadi(`${nimi}: jokainen kohdekaupunki on kartalla`,
    m.puuttuu.length === 0,
    `${m.puuttuu.length} puuttuu: ${m.puuttuu.join(', ')}`);
  vaadi(`${nimi}: jokainen kohdekaupunki harvennetulla kapiteelilla`,
    m.ilmanKapiteelia.length === 0 && m.ilmanHarvennusta.length === 0,
    `ilman kapiteelia: ${m.ilmanKapiteelia.join(', ')} / `
      + `ilman harvennusta: ${m.ilmanHarvennusta.join(', ')}`);
  vaadi(`${nimi}: yksikään nimi ei osu poltettuun nostoon`,
    m.poltonPaalla.length === 0,
    `${m.poltonPaalla.length} osumaa (${m.poltettujaVarauksia} varausta): `
      + m.poltonPaalla.join(', '));
  /*
   * NAAPURIMAAN POLTETTU NOSTO (2.9.2026 ilta). Bulgarian näkymässä
   * Wien on ruudun laidassa, ja juuri sen nimi leikkasi Itävallan
   * laattaan poltettua nostonimiötä. Mittaus vain siitä näkymästä,
   * josta omistajan kaappaus on.
   */
  if (nakyma.nimi === 'Bulgaria') {
    vaadi(`${nimi}: WIEN ei leikkaa yhtäkään poltettua nostolaatikkoa`,
      m.wienNakyy && m.wienOsumat.length === 0,
      m.wienNakyy
        ? `${m.wienOsumat.length} osumaa: ${m.wienOsumat.join(' ')}`
        : 'Wien ei ollut näkymässä — mittaus sokea');
  }
  vaadi(`${nimi}: yksikään nimi ei osu toiseen nimeen`,
    m.nimiParit.length === 0,
    `${m.nimiParit.length} paria: ${m.nimiParit.slice(0, 6).join('; ')}`);
  vaadi(`${nimi}: muste on poltetun laatan sävyä`,
    m.varit.every((v) => /103, *88, *73/.test(v) || /70, *86, *96/.test(v)),
    `sävyt: ${m.varit.join(' | ')}`);
  if (m.kohteenKoko && m.kaupunginKoko) {
    vaadi(`${nimi}: kohdekaupungin nimi on kohteiden nimiä isompi`,
      m.kaupunginKoko.min > m.kohteenKoko.max,
      `kaupunki ${m.kaupunginKoko.min}…${m.kaupunginKoko.max} vs `
        + `kohde ${m.kohteenKoko.min}…${m.kohteenKoko.max} (lautayksiköitä)`);
  }
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} väitettä läpi`);
if (lapi !== kaikki) process.exitCode = 1;
