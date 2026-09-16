/*
 * Savuke: LUENTAKUVAN KERROS JA PULUCAM-SARJAN KETJU.
 *
 * Kaksi omistajan vikailmoitusta 12.9.2026, sanatarkasti:
 *   *"kuva saisi jäädä matkakirjan alle. pulun kuvat eivät tule
 *   jostain syystä isoisän kuvien jälkeen näkyville"*
 * ja saman päivän tarkennus:
 *   *"kun tullaan ateenaan niin isoisän kuvat saisi tulla vasta kun
 *   isoisän luenta alkaa"*.
 *
 * VARTIOT:
 *   1. KERROS: iso luentakuva EI maalaudu matkakirjakortin päälle.
 *      Mitataan kolmella ruudulla kortin TEKSTIALASTA pisteotannalla —
 *      ei geometrialla, koska kuva saa yhä olla kortin takana.
 *   2. KUVA ON YHÄ ISO: kotelo täyttää vähintään puolet ruudun
 *      lyhyemmästä sivusta. Kerroskorjaus ei saa muuttua kuvan
 *      pienentämiseksi (omistaja tilasi ISOT luentakuvat).
 *   3. KETJU: isoisän kuva → (luenta loppuu) → pulun kommentti →
 *      PULUCAM-KUVAT ISOINA → pieni pakka kartalle. Juuri kolmas
 *      lenkki katkesi: kommentti tuli vasta sen jälkeen, kun sarja oli
 *      jo purkautunut, eikä yksikään vartio nähnyt sitä.
 *   4. JÄRJESTYS: isoisän kuva ei tule ennen isoisän luentaa.
 *   5. LUENNAN HUNTU (korjaus 15.9.2026, omistajan vikailmoitus:
 *      Dubrovnikin saapumisluenta, kaiutin näkyy mutta kartta ei
 *      tummene eikä sumene). Mitattu juurisyy: `js/ui.js`
 *      kaynnistaLuentavahti katsoi vain pientä, kartalle ANKKUROITUA
 *      pakkaa (`.fokusvirta-luentakuva.nakyy`), joka piirtyy vasta
 *      SARJAN LOPUKSI — isoisän ÄÄNEN aikana ruudulla on ISO
 *      keskipäällys (`.fokusvirta-isokuva`, `.stage`:ssa `.map-panen`
 *      vierellä), jota vahti ei koskaan nähnyt. Vartio mittaa PIKSELIN
 *      kirkkauden kartalta huntu päällä ja ilman (luokka pois PÄÄLLE
 *      OTETUSTA ruudusta, ei koodimuutos) — vastakoe samassa ajossa.
 *   6. ISO LUENTAKUVA EI SUMENE HUNNUN ALLA (korjaus 15.9.2026,
 *      omistajan iPhone-vikailmoitus: *"luennan huntu sumentaa myös
 *      isoisän ison luentakuvan"*). Mitattu juurisyy: `.map-pane` ei
 *      luonut pinontayhteyttä (position: relative, z-index: auto),
 *      joten huntu (`::after`, z 4) karkasi `.app`-pinoon ja ohitti
 *      siellä ison luentapäällyksen (`.fokusvirta-isokuva`, z 3).
 *      Korjaus on css/styles.css `.map-pane { isolation: isolate }`.
 *      Vartio mittaa KUVAN ALUEEN Laplacian-varianssin huntu päällä ja
 *      ilman — saa poiketa enintään 2 % — ja tekee VASTAKOKEEN samassa
 *      ajossa: eristys pois (`style.isolation = 'auto'`) palauttaa vian,
 *      ja varianssin ON romahdettava. Ilman vastakoetta mittari
 *      näyttäisi vihreää myös silloin, kun se ei mittaa mitään.
 *
 * KOEKAUPUNKI ON VENETSIA: sillä on isoisän kaksi luentakuvaa ja VIISI
 * PuluCam-kuvaa eli pisin mahdollinen sarja. Juuri Venetsiassa ketju
 * mitattiin katkenneeksi (kommentti 44,4 s, sarja purkautui 35,2 s).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-luentakuvan-kerros.mjs [kuvakansio]
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
// Pakkavartiot kääntyvät tästä kytkimestä (ks. ketjun viimeinen lenkki).
import { LUENTAKUVAPAKKA_KARTALLA } from '../../js/fokusvirta.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'venetsia';
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tabletti', width: 834, height: 1194 },
  { nimi: 'tyopoyta', width: 1280, height: 800 },
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
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
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

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Avaa pelin, saapuu koekaupunkiin ja palauttaa sivun apureineen. */
async function avaaAjo(viewport, { lykkays = false } = {}) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const cdp = await ctx.newCDPSession(sivu);
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
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(([id, lykkays]) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    /*
     * ENSISAAPUMISEN LYKKÄYS (js/livia.js odotaLuenta): luenta odottaa
     * pulun kahta aloituskuplaa. Savuke nostaa saman lipun kuin peli,
     * koska juuri tässä tilassa isoisän kuva tuli ennen aikojaan.
     */
    if (lykkays) ui.luennanLykkays = true;
    ui.render();
  }, [KAUPUNKI, lykkays]);
  return { ctx, sivu, cdp };
}

/* ================================================================
   1–2. KERROS JA KOKO KOLMELLA RUUDULLA
   ================================================================ */
for (const ruutu of RUUDUT) {
  const { ctx, sivu, cdp } = await avaaAjo({ width: ruutu.width, height: ruutu.height });
  // Sarja tulee vasta luennan alkaessa; odotetaan se ja varmistetaan.
  await sivu.waitForFunction(() => Boolean(document.querySelector('.fokusvirta-isokuva-ruutu')),
    null, { timeout: 30000 }).catch(() => {});
  await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    if (ui.luentakuvasarja) return;
    const m = await import('/js/fokusvirta.js');
    m.naytaLuentakuvasarja(ui, game.cityOf());
    ui.diaryVoice = { paused: false, currentTime: 1, ended: false, error: null };
  });
  await sivu.waitForTimeout(1500);

  const mitta = await sivu.evaluate(() => {
    const laatikko = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    };
    const kortti = document.querySelector('.fact-card');
    const kehys = document.querySelector('.fokusvirta-isokuva');
    const kotelo = document.querySelector('.fokusvirta-isokuva-ruutu.nakyy .fokusvirta-isokuva-kotelo')
      ?? document.querySelector('.fokusvirta-isokuva-kotelo');
    const osat = [...(kortti?.querySelectorAll('h2, .fact-text, p') ?? [])]
      .map(laatikko).filter((b) => b && b.w > 4 && b.h > 4);
    /*
     * TODELLINEN NÄKYVYYS PISTEOTANNALLA. Kuva saa olla kortin takana,
     * joten geometrinen leikkaus ei kerro mitään — vain se, kumpi
     * maalautuu päälle.
     *
     * OSOITINTAPAHTUMAT KYTKETÄÄN KUVAAN, EI KEHYKSEEN. Kehys on koko
     * ruudun kokoinen ja läpinäkyvä; jos se ottaisi napautukset, otanta
     * osuisi siihen myös siellä, missä kuvaa ei ole, ja mittari
     * näyttäisi nollaa jokaisella ruudulla. Mitattava on KUVA.
     */
    let nakyvia = 0;
    let yhteensa = 0;
    if (kotelo && osat.length) {
      const vanha = kotelo.style.pointerEvents;
      kotelo.style.pointerEvents = 'auto';
      for (const o of osat) {
        for (let sy = 0; sy < 10; sy += 1) {
          for (let sx = 0; sx < 10; sx += 1) {
            const el = document.elementFromPoint(
              o.x + (o.w * (sx + 0.5)) / 10, o.y + (o.h * (sy + 0.5)) / 10,
            );
            yhteensa += 1;
            if (el?.closest?.('.fact-card')) nakyvia += 1;
          }
        }
      }
      kotelo.style.pointerEvents = vanha;
    }
    return {
      kortti: Boolean(kortti),
      kotelo: laatikko(kotelo),
      nakyvyys: yhteensa ? Math.round((nakyvia / yhteensa) * 100) : null,
      zKehys: kehys ? getComputedStyle(kehys).zIndex : null,
    };
  });
  tieto(`${ruutu.nimi} ${ruutu.width}×${ruutu.height}`, JSON.stringify(mitta));
  vaadi(`${ruutu.nimi}: matkakirjakortin teksti näkyy kokonaan`,
    mitta.nakyvyys === 100, `näkyvissä ${mitta.nakyvyys} %`);
  const lyhyt = Math.min(ruutu.width, ruutu.height);
  vaadi(`${ruutu.nimi}: luentakuva on yhä ISO`,
    Boolean(mitta.kotelo) && Math.max(mitta.kotelo.w, mitta.kotelo.h) >= lyhyt * 0.5,
    JSON.stringify(mitta.kotelo));
  if (KUVAKANSIO) {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(KUVAKANSIO, `luentakuvan-kerros-${ruutu.nimi}.png`),
      Buffer.from(data, 'base64'));
  }
  await ctx.close();
}

/* ================================================================
   3–4. KETJU: JÄRJESTYS JA PULUCAM-KUVIEN ILMESTYMINEN
   ================================================================ */
const { ctx, sivu } = await avaaAjo({ width: 1280, height: 800 });
const t0 = Date.now();
const hetket = {};
/*
 * NÄYTTEENOTTO 400 ms:n VÄLEIN, ei kiinteitä odotuksia: ketjun kellot
 * ovat sekuntien mittaisia ja vaihtelevat äänitteen pituuden mukaan,
 * joten savuke katsoo mitä ruudulla TAPAHTUU eikä oleta milloin.
 */
for (let i = 0; i < 200; i += 1) {
  const tila = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const ruudut = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')];
    return {
      luenta: ui.luentaKesken?.() === true,
      isoisa: ruudut.some((r) => !r.querySelector('.pulucam-merkki-iso')),
      pulu: ruudut.some((r) => r.querySelector('.pulucam-merkki-iso')),
      pakka: document.querySelectorAll('.pulucam-kortti').length > 0,
      // Pulun ISO sarja on ohi, kun päällys on poistunut ruudulta.
      puluOhi: ruudut.length === 0,
    };
  });
  const t = Date.now() - t0;
  for (const [nimi, arvo] of Object.entries(tila)) {
    if (arvo && hetket[nimi] === undefined) hetket[nimi] = t;
  }
  /*
   * LOPETUSEHTO KYTKIMEN MUKAAN (16.9.2026, Raamattu KARTTAUUDISTUKSEN
   * PAATOKSET 31 kohta 1). Ketju päättyi ennen pieneen pakkaan, ja
   * silmukka odotti juuri sitä. Pakka on nyt piilotettu
   * (js/fokusvirta.js LUENTAKUVAPAKKA_KARTALLA = false), joten ketjun
   * VIIMEINEN mitattava lenkki on pulun oman ison sarjan päättyminen —
   * sama hetki, vain ilman kartalle jäävää jälkeä.
   */
  if (hetket.pakka !== undefined) break;
  if (!LUENTAKUVAPAKKA_KARTALLA && hetket.pulu !== undefined && tila.puluOhi) break;
  await sivu.waitForTimeout(400);
}
tieto('ketjun hetket (ms saapumisesta)', JSON.stringify(hetket));
vaadi('isoisän luenta alkaa', hetket.luenta !== undefined);
vaadi('isoisän kuva tulee ruudulle', hetket.isoisa !== undefined);
vaadi('isoisän kuva EI tule ennen isoisän luentaa',
  hetket.isoisa >= hetket.luenta, `kuva ${hetket.isoisa} ms, luenta ${hetket.luenta} ms`);
vaadi('PULUCAM-KUVAT TULEVAT ISOINA isoisän kuvien jälkeen',
  hetket.pulu !== undefined && hetket.pulu > hetket.isoisa,
  `pulu ${hetket.pulu} ms, isoisä ${hetket.isoisa} ms`);
/*
 * PAKKAVARTIO KYTKIMEN MUKAAN (omistaja 16.9.2026, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 31 kohta 1: *"Piilotetaan nuo kuvat
 * kartalta toistaiseksi"*). Väite oli ennen "pieni pakka jää kartalle
 * vasta pulun kuvien jälkeen"; se on KUMOTTU niin kauan kuin
 * js/fokusvirta.js LUENTAKUVAPAKKA_KARTALLA on false, ja tilalla on
 * sen kääntöpuoli: kartalle ei jää pakkaa lainkaan. Kun omistaja
 * antaa kuville paremman paikan ja kytkin kääntyy, vanha väite palaa
 * sellaisenaan.
 */
if (LUENTAKUVAPAKKA_KARTALLA) {
  vaadi('pieni pakka jää kartalle vasta pulun kuvien jälkeen',
    hetket.pakka !== undefined && hetket.pakka > hetket.pulu,
    `pakka ${hetket.pakka} ms, pulu ${hetket.pulu} ms`);
} else {
  vaadi('KUMOTTU (LUENTAKUVAPAKKA_KARTALLA=false): pakkaa ei jää kartalle',
    hetket.pakka === undefined, `pakka ilmestyi ${hetket.pakka} ms kohdalla`);
}
await ctx.close();

/* ================================================================
   5. LUENNAN HUNTU: KARTTA TUMMENEE JA SUMENEE KUVAN TAKANA
   ================================================================

   Omistajan vikailmoitus 15.9.2026 (Dubrovnikin saapumisluenta,
   iPhone-kuvakaappaus): kaiutin näkyi (luenta käynnissä) mutta kartta
   pysyi terävänä ja vaaleana isoisän kuvan takana — huntu (js/ui.js
   kaynnistaLuentavahti, css/fokusvirta.css body.luenta-huntu
   .map-pane::after) ei nostanut lainkaan. */
{
  const ajo = await avaaAjo({ width: 390, height: 844 });
  await ajo.sivu.waitForFunction(() => document.body.classList.contains('kertoja-aanessa')
    && Boolean(document.querySelector('.fokusvirta-isokuva.nakyy, .fokusvirta-luentakuva.nakyy')),
  null, { timeout: 30000 }).catch(() => console.log('HUOM  isoisän luenta+kuva ei ehtinyt ruudulle 30 s:ssa'));
  await ajo.sivu.waitForTimeout(300);

  const tila = await ajo.sivu.evaluate(() => {
    const mapPane = document.querySelector('.map-pane');
    const after = mapPane ? getComputedStyle(mapPane, '::after') : null;
    return {
      kertojaAanessa: document.body.classList.contains('kertoja-aanessa'),
      huntuPaalla: document.body.classList.contains('luenta-huntu'),
      afterContent: after?.content ?? null,
      afterBackdrop: after ? (after.backdropFilter || after.webkitBackdropFilter) : null,
    };
  });
  tieto('luennan huntu -tila', JSON.stringify(tila));
  vaadi('kertoja on äänessä (mittauksen ehto)', tila.kertojaAanessa === true);
  vaadi('luenta-huntu on päällä isoisän luennan aikana', tila.huntuPaalla === true);
  vaadi('::after ei ole content:none', tila.afterContent !== 'none', String(tila.afterContent));
  vaadi('::after sumentaa (backdrop-filter blur)', /blur/.test(tila.afterBackdrop ?? ''),
    String(tila.afterBackdrop));

  // PIKSELIMITTAUS: kartan kirkkaus huntu päällä vs. ilman (vastakoe
  // SAMASSA ajossa — luokka pois vain mittauksen ajaksi, ei koodimuutos).
  //
  // HILA, EI YKSI PISTE. Yksi kiinteä piste osui toistuvasti väärään
  // kohtaan (kortti, ylapalkin nappi, isoisän kuvan keskikohta — kaikki
  // pysyvät samana huntu päällä/pois ja näyttäisivät vahingossa
  // nollaeron eikä huntu-vikaa; mitattu Venetsian 390×844-ruudulla
  // kolmesti). Sen sijaan otetaan 7×9 pisteen hila `.map-panen` alalta
  // KUMMASTAKIN kuvakaappauksesta ja katsotaan SUURIN kirkkausero
  // hilan yli — jossain nurkassa kartta on aina näkyvissä ilman kortin,
  // kuvan tai napin peittoa, joten suurin ero paljastaa hunnun
  // vaikutuksen luotettavasti riippumatta kaupungin asettelusta.
  const kirkkausHila = async (b64, rect) => {
    const p = await ajo.ctx.newPage();
    await p.setContent(`<img id="k" src="data:image/png;base64,${b64}">`);
    const arvot = await p.evaluate(([r]) => new Promise((resolve) => {
      const img = document.getElementById('k');
      const valmis = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const cx = c.getContext('2d');
        cx.drawImage(img, 0, 0);
        const tulos = [];
        for (let gy = 1; gy <= 9; gy += 1) {
          for (let gx = 1; gx <= 7; gx += 1) {
            const x = Math.round(r.x + (r.width * gx) / 8);
            const y = Math.round(r.y + (r.height * gy) / 10);
            const d = cx.getImageData(x, y, 1, 1).data;
            tulos.push((d[0] + d[1] + d[2]) / 3);
          }
        }
        resolve(tulos);
      };
      if (img.complete) valmis(); else img.onload = valmis;
    }), [rect]);
    await p.close();
    return arvot;
  };
  const mapRect = await ajo.sivu.evaluate(() => {
    const r = document.querySelector('.map-pane').getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const kuvaPaalla = await ajo.cdp.send('Page.captureScreenshot', { format: 'png' });
  /*
   * VAHTI PYSÄYTETTÄVÄ ENNEN LUOKAN POISTOA (korjaus 15.9.2026, mitattu
   * julkaisuhaarassa: kirkkausero 0,0 KAHDESTI PERÄKKÄIN, jokaisessa
   * hilan 63 pisteessä identtisenä — ei kohdistusvirhe vaan täysi
   * nollatulos). JUURISYY: `kaynnistaLuentavahti` (js/ui.js) ajaa
   * `setInterval`-kyselyn `LUENTAVAHDIN_VALI_MS` (200 ms) välein, ja
   * kysely näkee yhä `kertoja && kuvaRuudulla` totena — se PALAUTTAA
   * `luenta-huntu`-luokan kartalle jo ennen 450 ms:n odotuksen
   * loppua, jolloin "huntu pois" -kuvakaappaus näyttääkin huntua
   * PÄÄLLÄ. Testi ei siis mitannut väärää pistettä eikä
   * backdrop-filterin puutetta headlessissä — se mittasi kahta
   * IDENTTISTÄ tilaa. Vahdin ajastin pysäytetään tässä ajaksi, jotta
   * manuaalinen luokanpoisto pysyy voimassa koko mittauksen ajan;
   * ajastinta ei tarvitse käynnistää uudelleen, koska tämä ajo (`ajo`)
   * suljetaan tämän lohkon lopussa.
   */
  await ajo.sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    if (ui.luentavahti) { clearInterval(ui.luentavahti); ui.luentavahti = null; }
    document.body.classList.remove('luenta-huntu');
  });
  await ajo.sivu.waitForTimeout(450); // opacity-siirtymä (400 ms) ehtii pois
  const kuvaPois = await ajo.cdp.send('Page.captureScreenshot', { format: 'png' });
  await ajo.sivu.evaluate(() => document.body.classList.add('luenta-huntu'));

  /*
   * TERÄVYYS LAPLACIAN-VARIANSSINA. Sumennus tasoittaa naapuripikselien
   * erot, joten toisen derivaatan (Laplace-ytimen) varianssi romahtaa —
   * se on suora mitta sille, onko alue terävä vai huntuinen. Pelkkä
   * kirkkaus ei riittäisi: huntu myös tummentaa, ja tummeneminen yksin
   * ei kerro sumennuksesta mitään.
   */
  const teravyys = async (b64, rect) => {
    if (!rect) return null;
    const p = await ajo.ctx.newPage();
    await p.setContent(`<img id="k" src="data:image/png;base64,${b64}">`);
    const v = await p.evaluate(([r]) => new Promise((resolve) => {
      const img = document.getElementById('k');
      const valmis = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const cx = c.getContext('2d');
        cx.drawImage(img, 0, 0);
        const x = Math.max(0, Math.round(r.x));
        const y = Math.max(0, Math.round(r.y));
        const w = Math.min(c.width - x, Math.round(r.width));
        const h = Math.min(c.height - y, Math.round(r.height));
        if (w < 5 || h < 5) { resolve(null); return; }
        const d = cx.getImageData(x, y, w, h).data;
        const g = new Float64Array(w * h);
        for (let i = 0; i < w * h; i += 1) {
          g[i] = d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114;
        }
        let s = 0; let s2 = 0; let n = 0;
        for (let yy = 1; yy < h - 1; yy += 1) {
          for (let xx = 1; xx < w - 1; xx += 1) {
            const i = yy * w + xx;
            const L = 4 * g[i] - g[i - 1] - g[i + 1] - g[i - w] - g[i + w];
            s += L; s2 += L * L; n += 1;
          }
        }
        resolve(s2 / n - ((s / n) ** 2));
      };
      if (img.complete) valmis(); else img.onload = valmis;
    }), [rect]);
    await p.close();
    return v;
  };

  /* Mitattava alue on KUVAN SISUS (reunat 15 % pois): kehys ja
     kuvateksti eivät sotke mittaria, ja rajaus on sama kummassakin
     kuvakaappauksessa, koska kuva ei liiku mittauksen aikana. */
  const isokuvaRect = await ajo.sivu.evaluate(() => {
    const el = document.querySelector('.fokusvirta-isokuva-ruutu.nakyy .fokusvirta-isokuva-kuva')
      ?? document.querySelector('.fokusvirta-isokuva-kuva');
    if (!el) return null;
    const b = el.getBoundingClientRect();
    if (b.width < 40 || b.height < 40) return null;
    return {
      x: b.x + b.width * 0.15,
      y: b.y + b.height * 0.15,
      width: b.width * 0.7,
      height: b.height * 0.7,
    };
  });
  vaadi('iso luentakuva on ruudulla (mittauksen ehto)', Boolean(isokuvaRect),
    'isokuvan kuvaelementtiä ei löytynyt');
  if (isokuvaRect) {
    const teravaPaalla = await teravyys(kuvaPaalla.data, isokuvaRect);
    const teravaPois = await teravyys(kuvaPois.data, isokuvaRect);
    const muutos = teravaPois ? ((teravaPaalla - teravaPois) / teravaPois) * 100 : null;
    tieto('isokuvan terävyys (Laplacian-varianssi)',
      `huntu päällä ${teravaPaalla?.toFixed(1)}, huntu pois ${teravaPois?.toFixed(1)}, `
      + `muutos ${muutos?.toFixed(2)} %`);
    vaadi('ISO LUENTAKUVA EI SUMENE HUNNUN ALLA (±2 %)',
      teravaPois > 20 && Math.abs(muutos) <= 2,
      `päällä ${teravaPaalla?.toFixed(1)}, pois ${teravaPois?.toFixed(1)} (${muutos?.toFixed(2)} %)`);

    /*
     * VASTAKOE: eristys pois `.map-panelta` → huntu karkaa `.app`-pinoon
     * ja ohittaa isokuvan (z 4 > 3), kuten ennen korjausta. Varianssin
     * on romahdettava; jos se ei romahda, mittari ei mittaa kuvaa.
     */
    await ajo.sivu.evaluate(() => {
      document.querySelector('.map-pane').style.isolation = 'auto';
    });
    await ajo.sivu.waitForTimeout(300);
    const rikki = await ajo.cdp.send('Page.captureScreenshot', { format: 'png' });
    const teravaRikki = await teravyys(rikki.data, isokuvaRect);
    await ajo.sivu.evaluate(() => {
      document.querySelector('.map-pane').style.isolation = '';
    });
    tieto('vastakoe: eristys pois', `varianssi ${teravaRikki?.toFixed(1)}`);
    vaadi('VASTAKOE: ilman .map-panen eristystä kuva TODELLA sumenee',
      teravaRikki !== null && teravaRikki < teravaPois * 0.5,
      `rikki ${teravaRikki?.toFixed(1)}, ehjä ${teravaPois?.toFixed(1)}`);
  }

  const hilaPaalla = await kirkkausHila(kuvaPaalla.data, mapRect);
  const hilaPois = await kirkkausHila(kuvaPois.data, mapRect);
  const erot = hilaPaalla.map((v, i) => hilaPois[i] - v);
  const suurinEro = Math.max(...erot);
  const suurinIdx = erot.indexOf(suurinEro);
  tieto('hilan suurin kirkkausero (pois − päällä)',
    `${suurinEro.toFixed(1)} (piste ${suurinIdx}: päällä ${hilaPaalla[suurinIdx].toFixed(1)}, `
    + `pois ${hilaPois[suurinIdx].toFixed(1)})`);
  vaadi('huntu tummentaa karttaa mitattavasti jossain hilan pisteessä (vastakoe: luokka pois)',
    suurinEro >= 20, `suurin ero ${suurinEro.toFixed(1)}`);

  if (KUVAKANSIO) {
    writeFileSync(join(KUVAKANSIO, 'huntu-paalla.png'), Buffer.from(kuvaPaalla.data, 'base64'));
    writeFileSync(join(KUVAKANSIO, 'huntu-pois.png'), Buffer.from(kuvaPois.data, 'base64'));
  }
  await ajo.ctx.close();
}

/* ================================================================
   6. LUENNAN HUNTU EI NOUSE KEHITTÄJÄN MAAILMANÄKYMÄSSÄ
   ================================================================

   Omistajan päätös 15.9.2026 (Raamattu "KARTTATAUSTA LUENNAN JA
   KAUPUNKIESITTELYN AIKANA", POIKKEUS-kohta): kun kehittäjän
   maailmanäkymä on päällä, luennan huntua (body.luenta-huntu) ei
   nosteta lainkaan — muut luennan merkit (kaiutin, tekstipiilo,
   Liiku-piilo) pysyvät. Korjaus js/ui.js kaynnistaLuentavahti:
   huntu-ehtoon lisätty `&& !(kehittajaTilaPaalla() &&
   kehittajaMaailmaPaalla())`. */
{
  const ajo = await avaaAjo({ width: 390, height: 844 });
  await ajo.sivu.waitForFunction(() => document.body.classList.contains('kertoja-aanessa')
    && Boolean(document.querySelector('.fokusvirta-isokuva.nakyy, .fokusvirta-luentakuva.nakyy')),
  null, { timeout: 30000 }).catch(() => console.log('HUOM  isoisän luenta+kuva ei ehtinyt ruudulle 30 s:ssa'));
  await ajo.sivu.waitForTimeout(300);

  const ennenMaailmaa = await ajo.sivu.evaluate(() => ({
    kertojaAanessa: document.body.classList.contains('kertoja-aanessa'),
    kuvaRuudulla: Boolean(document.querySelector(
      '.fokusvirta-luentakuva.nakyy, .fokusvirta-isokuva.nakyy',
    )),
    huntuPaalla: document.body.classList.contains('luenta-huntu'),
  }));
  tieto('tila ennen kehittäjän maailmanäkymää', JSON.stringify(ennenMaailmaa));
  vaadi('mittauksen ehto: kertoja äänessä ja kuva ruudulla', ennenMaailmaa.kertojaAanessa
    && ennenMaailmaa.kuvaRuudulla, JSON.stringify(ennenMaailmaa));
  /*
   * VASTAKOE (ehto pois olisi näyttänyt huntua): koska kertoja on
   * äänessä ja kuva ruudulla ILMAN kehittäjän maailmanäkymää, huntu on
   * tässä tilassa oikeasti päällä — juuri se todistaa, ettei alempi
   * "huntu pois" -tulos johdu siitä, että kertoja tai kuva sattuisivat
   * olemaan epätosia.
   */
  vaadi('vastakoe: huntu on päällä ilman kehittäjän maailmanäkymää (ehto olisi punainen)',
    ennenMaailmaa.huntuPaalla === true, JSON.stringify(ennenMaailmaa));

  // Kehittäjätila JA maailmanäkymä päälle KESKEN LUENNAN (js/ui-apurit.js).
  await ajo.sivu.evaluate(async () => {
    const apurit = await import('/js/ui-apurit.js');
    apurit.asetaKehittajaTila(true);
    apurit.asetaKehittajaMaailma(true);
  });
  // Vahti kysyy LUENTAVAHDIN_VALI_MS (200 ms) välein: 700 ms antaa
  // reilusti tilaa CI:n hitaammalle koneelle (mitattu flakki 400 ms:llä).
  await ajo.sivu.waitForTimeout(700);
  const maailmaPaalla = await ajo.sivu.evaluate(() => {
    const mapPane = document.querySelector('.map-pane');
    const after = mapPane ? getComputedStyle(mapPane, '::after') : null;
    return {
      kertojaAanessa: document.body.classList.contains('kertoja-aanessa'),
      kuvaRuudulla: Boolean(document.querySelector(
        '.fokusvirta-luentakuva.nakyy, .fokusvirta-isokuva.nakyy',
      )),
      huntuPaalla: document.body.classList.contains('luenta-huntu'),
      afterContent: after?.content ?? null,
    };
  });
  tieto('tila kehittäjän maailmanäkymässä', JSON.stringify(maailmaPaalla));
  vaadi('mittauksen ehto pysyy: kertoja yhä äänessä ja kuva ruudulla',
    maailmaPaalla.kertojaAanessa && maailmaPaalla.kuvaRuudulla, JSON.stringify(maailmaPaalla));
  vaadi('luenta-huntu EI ole päällä kehittäjän maailmanäkymässä',
    maailmaPaalla.huntuPaalla === false, JSON.stringify(maailmaPaalla));
  vaadi('::after content on none kehittäjän maailmanäkymässä',
    maailmaPaalla.afterContent === 'none', String(maailmaPaalla.afterContent));

  // Maailmanäkymä pois kesken luennan: huntu palaa heti (vahti 200 ms).
  await ajo.sivu.evaluate(async () => {
    const apurit = await import('/js/ui-apurit.js');
    apurit.asetaKehittajaMaailma(false);
  });
  await ajo.sivu.waitForTimeout(700);
  const maailmaPois = await ajo.sivu.evaluate(async () => {
    const apurit = await import('/js/ui-apurit.js');
    return {
      kertojaAanessa: document.body.classList.contains('kertoja-aanessa'),
      kuvaRuudulla: Boolean(document.querySelector(
        '.fokusvirta-luentakuva.nakyy, .fokusvirta-isokuva.nakyy',
      )),
      huntuPaalla: document.body.classList.contains('luenta-huntu'),
      dev: apurit.kehittajaTilaPaalla(),
      world: apurit.kehittajaMaailmaPaalla(),
      lsDev: localStorage.getItem('matkakirja-kehittaja'),
      lsWorld: localStorage.getItem('matkakirja-kehittaja-maailma'),
    };
  });
  tieto('tila maailmanäkymän sammuttamisen jälkeen', JSON.stringify(maailmaPois));
  if (maailmaPois.kertojaAanessa && maailmaPois.kuvaRuudulla) {
    vaadi('luenta-huntu PALAA kun maailmanäkymä kytketään pois kesken luennan',
      maailmaPois.huntuPaalla === true, JSON.stringify(maailmaPois));
  } else {
    console.log('HUOM  luenta ehti loppua ennen maailmanäkymän sammuttamista — paluuväite ohitettu');
  }

  await ajo.ctx.close();
}

/* ================================================================
   7. ENSISAAPUMINEN: KUVA VASTA LYKÄTYN LUENNAN ALKAESSA
   ================================================================

   Omistaja 12.9.2026: *"kun tullaan ateenaan niin isoisän kuvat saisi
   tulla vasta kun isoisän luenta alkaa. nyt ne tulivat heti kun
   ateenaan oli saavuttu ja pulun aloituskommentit vasta alkoivat"*.

   Mitattu ennen korjausta (Ateena, 8 s lykkäys): isoisän kuva 2,4 s,
   luenta 8,8 s — kuva oli ruudulla 6,4 sekuntia liian aikaisin. */
{
  const ajo = await avaaAjo({ width: 1280, height: 800 }, { lykkays: true });
  await ajo.sivu.waitForTimeout(6000);
  const kesken = await ajo.sivu.evaluate(() => ({
    paallys: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
    lykkays: window.matkakirja.ui.luennanLykkays === true,
  }));
  tieto('lykkäyksen aikana', JSON.stringify(kesken));
  vaadi('lykkäys on yhä päällä 6 s kuluttua', kesken.lykkays === true);
  vaadi('isoisän kuva EI ole ruudulla lykkäyksen aikana', kesken.paallys === 0,
    `ruutuja ${kesken.paallys}`);

  // Pulun kuplat sanottu: luenta lähtee — ja vasta nyt kuva.
  await ajo.sivu.evaluate(() => window.matkakirja.ui.aloitaLykattyLuenta());
  await ajo.sivu.waitForFunction(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length > 0,
    null, { timeout: 15000 },
  ).catch(() => {});
  const jalkeen = await ajo.sivu.evaluate(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
  );
  vaadi('isoisän kuva tulee heti lykätyn luennan alettua', jalkeen > 0, `ruutuja ${jalkeen}`);
  await ajo.ctx.close();
}

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
