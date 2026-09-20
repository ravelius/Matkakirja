/*
 * Savuke: ASTRONAUTIN KAMERAN KAKSI KORJAUSTA (omistaja 20.9.2026).
 *
 *  1. KLO 12.00: pallonäkymässä ✕:n alla näkyi kermanvärinen kolmen
 *     väkäsen nappi (kaappaus astro-vakaset-ipad.png). Se on
 *     karttaselitteiden avaaja (.karttaselite-nappi, "Karttaselitteet"),
 *     joka selittää laudan karttamerkit — avaruudessa niitä ei ole.
 *     Sen pitää olla poissa linssin ajan kaikilla näytöillä ja palata
 *     linssin jälkeen.
 *
 *  2. KLO 12.05: valokuvanäkymän pienennetty inforuutu venyi iPadilla
 *     lähes koko ruudun leveydelle. Sen ei pidä olla avattua leveämpi.
 *
 * Mitat kolmella leveydellä: 390, 1024 ja 1400.
 *
 * Aja:  node tools/savukkeet/savuke-astro-vakaset.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'ipad', width: 1024, height: 1366 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/** Ulkoverkko Noden kautta (ämpärin CORS ei päästä selainta suoraan). */
const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
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
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('lontoo');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch(
  process.env.CHROMIUM || existsSync('/opt/pw-browsers/chromium')
    ? { executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' } : {},
);

/** Näkyykö elementti oikeasti (laskettu tyyli + mitta), ei pelkkä luokka. */
const NAKYVYYS = (valitsin) => {
  const el = document.querySelector(valitsin);
  if (!el) return { on: false, syy: 'ei elementtiä' };
  const t = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    on: t.visibility !== 'hidden' && t.display !== 'none' && Number(t.opacity) > 0.01
      && r.width > 0 && r.height > 0 && t.pointerEvents !== 'none',
    visibility: t.visibility,
    opacity: Number(t.opacity),
    osoitin: t.pointerEvents,
    koko: [Math.round(r.width), Math.round(r.height)],
  };
};

for (const ruutu of RUUDUT) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height }, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  /*
   * ÄMPÄRIN KUVAT NODEN KAUTTA (sama kuvio kuin savuke-astro-valokuva):
   * valokuvanäkymä rakentuu vasta kun kuva latautuu, eikä selaimen oma
   * haku pääse ämpäriin CORSin takia. Ilman tätä leveysmitta jäisi
   * kokonaan ajamatta — juuri se, mitä tämä savuke on tilattu mittaamaan.
   */
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const vastaus = await ulkohaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);
  const nimessa = (t) => `${t} (${ruutu.nimi})`;

  /* VASTAKOE ENSIN: kartalla karttaselite on olemassa ja näkyvissä. */
  const kartalla = await sivu.evaluate((m) => new Function(`return (${m})`)()('.karttaselite-nappi'), NAKYVYYS.toString());
  tieto(nimessa('karttaselite kartalla'), JSON.stringify(kartalla));
  vaadi(nimessa('vastakoe: karttaselite näkyy kartalla'), kartalla.on === true, JSON.stringify(kartalla));

  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
    for (let i = 0; i < 400; i += 1) {
      if (ui.pallolinssi?.tunnus === 'satelliitti') break;
      await new Promise((r) => setTimeout(r, 25));
    }
    await new Promise((r) => setTimeout(r, 2500));
  });

  const linssissa = await sivu.evaluate((m) => {
    const nak = new Function(`return (${m})`)();
    return {
      luokka: document.body.classList.contains('linssi-satelliitti'),
      selite: nak('.karttaselite-nappi'),
      kotelo: nak('.karttaselite'),
    };
  }, NAKYVYYS.toString());
  tieto(nimessa('karttaselite linssissä'), JSON.stringify(linssissa));
  vaadi(nimessa('rungolla on linssin luokka'), linssissa.luokka, JSON.stringify(linssissa));
  vaadi(nimessa('karttaselitteen nappi ei näy linssin aikana'),
    linssissa.selite.on === false, JSON.stringify(linssissa.selite));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `pallo-${ruutu.nimi}.png`) });

  /* --- 2. valokuvanäkymän inforuudun leveys ------------------------ */
  const avattu = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const moduuli = await import('/js/linssit/satelliitti-data.js');
    // Pitkä nimi: juuri sellaisella laatikko osuu kattoonsa, ja vain
    // silloin mitta kertoo katosta eikä tekstin pituudesta.
    const kohde = moduuli.SATELLIITTI_KOHTEET.find((k) => `${k.nimi} — ${k.seutu}`.length >= 28)
      ?? moduuli.SATELLIITTI_KOHTEET[0];
    ui.pallolinssi?.kahva?.avaaKohde?.(kohde.tunnus);
    await new Promise((r) => setTimeout(r, 2500));
    const el = document.querySelector('.satelliitti-selite');
    if (!el) return { auki: null };
    /*
     * LAATIKKO ON AVATTAVA ENNEN MITTAUSTA. Vinkkiavaus kelaa selitteen
     * itsestään 1,5 s:n kuluttua (ja toinen avaus alkaa suoraan
     * kelattuna), joten tässä kohtaa se on jo kiinni — ilman tätä
     * "auki" ja "kiinni" olisivat sama laatikko ja vertailu vertaisi
     * mittaa itseensä.
     */
    if (el.classList.contains('satelliitti-selite-kiinni')) {
      el.click();
      await new Promise((r) => setTimeout(r, 900));
    }
    return {
      otsikko: el.querySelector('.satelliitti-selite-otsikko')?.textContent ?? null,
      auki: Math.round(el.getBoundingClientRect().width),
      kiinniLuokka: el.classList.contains('satelliitti-selite-kiinni'),
    };
  });
  if (avattu.auki === null) {
    tieto(nimessa('valokuvanäkymä'), 'ei auennut ohjelmallisesti — leveysmitta ohitettu');
  } else {
    // Kelaus: sama laatikko suljettuna. Napautus kelaa selitteen.
    const kiinni = await sivu.evaluate(async () => {
      const el = document.querySelector('.satelliitti-selite');
      if (!el.classList.contains('satelliitti-selite-kiinni')) el.click();
      await new Promise((r) => setTimeout(r, 900));
      return {
        kiinniLuokka: el.classList.contains('satelliitti-selite-kiinni'),
        leveys: Math.round(el.getBoundingClientRect().width),
      };
    });
    tieto(nimessa('inforuudun leveydet'),
      JSON.stringify({ otsikko: avattu.otsikko, auki: avattu.auki, ...kiinni, ruutu: ruutu.width }));
    vaadi(nimessa('mitattu laatikko oli oikeasti auki ennen kelausta'),
      avattu.kiinniLuokka === false, JSON.stringify(avattu));
    vaadi(nimessa('selite kelautuu napautuksesta'), kiinni.kiinniLuokka === true, JSON.stringify(kiinni));
    /*
     * KAPEA RUUTU ON ERI SÄÄNTÖ. Omistaja 16.9.2026: kelattu laatikko
     * saa kasvaa ✕:ään asti, ja ≤ 620 px:ssä avattukin on lähes ruudun
     * levyinen (css @media max-width 620px). Siellä mitataan vain, ettei
     * laatikko mene ✕:n alle; kattojen samuus koskee leveitä ruutuja,
     * joissa vika oli.
     */
    if (ruutu.width > 620) {
      /*
       * OMISTAJA 20.9.2026 klo 12.08: leveillä näytöillä avattu
       * inforuutu saa olla enintään noin 60 % ruudun leveydestä, ja
       * pienennetty seuraa samaa leveyttä. Katto mitataan molemmille.
       */
      vaadi(nimessa('avattu inforuutu on enintään 60 % ruudun leveydestä'),
        avattu.auki <= ruutu.width * 0.6,
        `${avattu.auki} / ${ruutu.width} = ${Math.round((avattu.auki / ruutu.width) * 100)} %`);
      vaadi(nimessa('pienennetty inforuutu on enintään 60 % ruudun leveydestä'),
        kiinni.leveys <= ruutu.width * 0.6,
        `${kiinni.leveys} / ${ruutu.width} = ${Math.round((kiinni.leveys / ruutu.width) * 100)} %`);
      vaadi(nimessa('pienennetty ja avattu ovat samalla leveydellä'),
        Math.abs(kiinni.leveys - avattu.auki) <= 1, `auki ${avattu.auki} vs kiinni ${kiinni.leveys}`);
      vaadi(nimessa('pienennetty inforuutu ei ole avattua leveämpi'),
        kiinni.leveys <= avattu.auki + 1, `kiinni ${kiinni.leveys} > auki ${avattu.auki}`);
      vaadi(nimessa('pienennetty inforuutu ei veny ruudun levyiseksi'),
        kiinni.leveys <= ruutu.width * 0.6, `${kiinni.leveys} / ${ruutu.width}`);
    } else {
      vaadi(nimessa('kapealla ruudulla kelattu laatikko pysyy ✕:n vasemmalla'),
        kiinni.leveys <= ruutu.width - 48, `${kiinni.leveys} / ${ruutu.width}`);
    }
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `inforuutu-${ruutu.nimi}.png`) });
  }

  /* --- karttaselite palaa linssin jälkeen -------------------------- */
  // Linssi pois samalla reitillä kuin se pantiin päälle.
  await sivu.evaluate(() => window.matkakirja.ui.valitseLinssi?.(null));
  await sivu.waitForTimeout(1500);
  const jalkeen = await sivu.evaluate((m) => {
    const nak = new Function(`return (${m})`)();
    return { luokka: document.body.classList.contains('linssi-satelliitti'), selite: nak('.karttaselite-nappi') };
  }, NAKYVYYS.toString());
  tieto(nimessa('karttaselite linssin jälkeen'), JSON.stringify(jalkeen));
  vaadi(nimessa('karttaselite palaa linssin jälkeen'),
    jalkeen.luokka === false && jalkeen.selite.on === true, JSON.stringify(jalkeen));
  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
