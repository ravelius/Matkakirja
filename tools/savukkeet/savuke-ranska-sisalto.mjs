/*
 * Savuke: RANSKAN SISÄLTÖPILOTTI — maalehden sivut nostoiksi, näkyvät
 * kaupungit, Pariisin nostot lähizoomille.
 *
 * OMISTAJA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 13), sanatarkasti:
 * *"maalehden sivut voi siirtaa nostoiksi vaikka kaikki. pida kuitenkin
 * kopio nykyisesta maalehdesta olemassa."* ja *"kartalle olisi lisaksi
 * hyva tuoda lisaa kaupunkeja nakyviin, ainakin tarkeimmat."*
 *
 * ── VARTIOT (Node) ────────────────────────────────────────────────
 *
 *   0.  KORTTI ON LEHDEN TEKSTI MERKKI MERKILTÄ. Jokaisen uuden noston
 *       otsikko, leipäteksti ja kuvatiedosto ovat `===`-vertailussa
 *       samat kuin maalehden oma nosto.
 *   0b. VASTAKOE: sama vertailu NAAPURINOSTOON eroaa jokaisessa
 *       tapauksessa — vartio 0 vertaa siis oikeasti tekstiä eikä
 *       palauta tyhjää tosi-arvoa.
 *   0c. MAALEHTI ON KOSKEMATON: sivuja on yhä 8 ja nostoja 24, eikä
 *       yhtäkään lehden nostoa ole poistettu.
 *   1.  MINIKYSYMYSTEN KIINTIÖ. Visoja on vähintään floor(nostoja/3).
 *   1b. SPOILERISÄÄNTÖ. Oikea vaihtoehto löytyy noston OMASTA
 *       tekstistä, eikä yksikään väärä vaihtoehto ole siinä.
 *   2.  NÄKYVÄT KAUPUNGIT EIVÄT OLE MATKAKOHTEITA. Yksikään seitsemästä
 *       ei ole laudan kaupunki (js/packs/maailmankartta.js CITIES),
 *       joten reitit, noppa, bussi ja Liiku-valikko eivät näe niitä.
 *   3.  PÄÄKARTAN RAJA PITÄÄ. Ranskan 62 merkistä portti päästää
 *       saapumisnäkymässä enintään 21, ja lähizoomilla kaikki.
 *   3b. VASTAKOE: ilman porttia sama joukko on 62 — raja on siis
 *       portin eikä datan ansiota.
 *
 * ── VARTIOT (selain, 390 × 844 ja 1400 × 900) ─────────────────────
 *
 *   4.  SAAPUMISNÄKYMÄSSÄ ENINTÄÄN 21 RANSKAN OMAA MERKKIÄ.
 *   5.  LÄHIZOOMILLA UUDET TULEVAT NÄKYVIIN (vähintään LAHI_VAHINTAAN).
 *   6.  NIMIÖT EIVÄT MENE PÄÄLLEKKÄIN (osumalaatikoiden leikkaus).
 *   7.  JOKAINEN UUSI NOSTO AVAA OMAN KORTTINSA — hiirellä ja
 *       kosketuksella, merkin omasta ruutupisteestä.
 *   8.  LISÄKAUPUNGIT NÄKYVÄT KARTALLA mutta EIVÄT OLE OSUMALISTALLA
 *       (nimikyltti ilman korttia, `vainNimi`).
 *   8b. VASTAKOE: kun `vainNimi` poistetaan ajon ajaksi, sama kaupunki
 *       ilmestyy osumalistalle — vartio 8 mittaa siis juuri lippua.
 *   9.  MINIKYSYMYS MAKSAA. Noston visaan vastataan oikein, ja pelaajan
 *       rahat kasvavat NOSTON_VISA_PALKKIO:n verran.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä selainvartiot OHITETAAN, Node-vartiot ajetaan.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-ranska-sisalto.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MAA_KATEGORIAT } from '../../js/packs/maa-kategoriat.js';
import { MAALEHTINOSTOT_FRA, MAALEHTIJAKO_FRA } from '../../js/packs/maalehtinostot-fra.js';
import { NAKYVAT_KAUPUNGIT_FRA } from '../../js/packs/nakyvat-kaupungit-fra.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { PAAKARTAN_MERKKIKATTO, merkkiPortti } from '../../js/pallolauta/nostot.js';
import { paakartanNostot } from '../tarkista-nostopaikat.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Lehden sivuja ja nostoja ennen erää — luvut eivät saa laskea. */
const LEHDEN_SIVUJA = 8;
const LEHDEN_NOSTOJA = 24;
/** Ranskan merkit pääkartalla ilman porttia (ks. savuke-merkkirajat). */
const FRA_MERKKEJA = 62;
/** Lähizoomilla vähintään näin monta Ranskan omaa merkkiä ruudulla. */
const LAHI_VAHINTAAN = 40;
/** Visan palkkio (js/fokusnosto.js NOSTON_VISA_PALKKIO). */
const VISAN_PALKKIO = 25;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ==================== VARTIOT 0–3: NODE ==================== */

const sivut = MAA_KATEGORIAT.FRA ?? [];
const lehdenNostot = sivut.flatMap((k) => k.nostot ?? []);
tieto('maalehden sivuja / nostoja', `${sivut.length} / ${lehdenNostot.length}`);
tieto('uusia karttanostoja', `${MAALEHTINOSTOT_FRA.length}`);

const eroja = [];
const vastakoeSamat = [];
MAALEHTIJAKO_FRA.forEach((rivi, i) => {
  const lahde = (sivut.find((k) => k.id === rivi.sivu)?.nostot ?? [])[rivi.nosto];
  const kortti = MAALEHTINOSTOT_FRA.find((n) => n.id === rivi.id);
  if (!lahde || !kortti) { eroja.push(`${rivi.id}: lähde puuttuu`); return; }
  if (kortti.otsikko !== lahde.otsikko) eroja.push(`${rivi.id}: otsikko`);
  if (kortti.lunastus.join('\n\n') !== lahde.teksti) eroja.push(`${rivi.id}: teksti`);
  if ((kortti.kuva?.tiedosto ?? null) !== (lahde.tiedosto ?? null)) eroja.push(`${rivi.id}: kuva`);
  /*
   * VASTAKOE: sama vertailu NAAPURIRIVIN lähteeseen. Jos sekin menee
   * läpi, vertailu ei mittaa mitään — se olisi esimerkiksi aina tyhjä.
   */
  const naapuri = MAALEHTIJAKO_FRA[(i + 1) % MAALEHTIJAKO_FRA.length];
  const toinen = (sivut.find((k) => k.id === naapuri.sivu)?.nostot ?? [])[naapuri.nosto];
  if (toinen && kortti.lunastus.join('\n\n') === toinen.teksti) vastakoeSamat.push(rivi.id);
});
vaadi('0. jokaisen kortin teksti, otsikko ja kuva ovat lehden omat merkki merkiltä',
  eroja.length === 0, eroja.join(', '));
vaadi('0b. VASTAKOE — sama vertailu naapurinostoon eroaa joka kerta',
  vastakoeSamat.length === 0, vastakoeSamat.join(', '));
vaadi(`0c. maalehti on koskematon (${LEHDEN_SIVUJA} sivua, ${LEHDEN_NOSTOJA} nostoa)`,
  sivut.length >= LEHDEN_SIVUJA && lehdenNostot.length >= LEHDEN_NOSTOJA,
  `${sivut.length} / ${lehdenNostot.length}`);

const visat = MAALEHTINOSTOT_FRA.filter((n) => n.visa);
const kiintio = Math.floor(MAALEHTINOSTOT_FRA.length / 3);
tieto('minikysymyksiä / kiintiö', `${visat.length} / ${kiintio}`);
vaadi(`1. minikysymyksiä on vähintään kiintiö (${kiintio})`,
  visat.length >= kiintio, `${visat.length}`);

const spoilerit = [];
for (const n of visat) {
  const teksti = n.lunastus.join(' ').toLowerCase();
  const oikea = n.visa.vaihtoehdot[n.visa.oikea].toLowerCase();
  if (!teksti.includes(oikea)) spoilerit.push(`${n.id}: oikea vastaus ei ole tekstissä`);
  n.visa.vaihtoehdot.forEach((v, i) => {
    if (i !== n.visa.oikea && teksti.includes(v.toLowerCase())) {
      spoilerit.push(`${n.id}: väärä vaihtoehto "${v}" on tekstissä`);
    }
  });
}
vaadi('1b. oikea vastaus löytyy noston omasta tekstistä, väärät eivät',
  spoilerit.length === 0, spoilerit.join(', '));

const laudanKaupungit = new Set((MAAILMANKARTTA.cities ?? []).map((c) => String(c.name)));
const matkakohteina = NAKYVAT_KAUPUNGIT_FRA.filter((k) => laudanKaupungit.has(k.nimi));
tieto('näkyviä kaupunkeja', NAKYVAT_KAUPUNGIT_FRA.map((k) => k.nimi).join(', '));
vaadi('2. yksikään näkyvä kaupunki ei ole laudan matkakohde',
  matkakohteina.length === 0, matkakohteina.map((k) => k.nimi).join(', '));

const { kaikki: rivit, kartalla } = paakartanNostot(MAAILMANKARTTA);
const fra = rivit.filter((r) => r.iso === 'FRA' && kartalla.has(r.id));
const portti = merkkiPortti(fra, false, (m) => m);
const auki = merkkiPortti(fra, true, (m) => m);
tieto('FRA merkit pääkartalla', `${fra.length} (saapumisessa ${portti.merkit.length}, `
  + `lähizoomiin ${portti.piiloon.length})`);
vaadi(`3. saapumisnäkymässä enintään ${PAAKARTAN_MERKKIKATTO} merkkiä`,
  portti.merkit.length <= PAAKARTAN_MERKKIKATTO, `${portti.merkit.length}`);
vaadi(`3b. VASTAKOE — ilman porttia merkkejä on ${FRA_MERKKEJA}`,
  auki.merkit.length === FRA_MERKKEJA && fra.length === FRA_MERKKEJA,
  `${auki.merkit.length} / ${fra.length}`);

/* ==================== SELAINVARTIOT ==================== */

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
const lopeta = () => {
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
};
if ((await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`))?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  lopeta();
}

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const tallenne = (aloitus) => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: aloitus }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(aloitus);
  return JSON.stringify(peli.toJSON());
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

async function avaaPeli(kaupunki, leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    hasTouch: true,
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
  const sivu = await ctx.newPage();
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
  const aukesi = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (aukesi) await sivu.waitForTimeout(1800);
  return { ctx, sivu, auki: aukesi };
}

const KORTIT = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup, .kaupunkipopup';
const avoinna = (sivu) => sivu.evaluate((sel) => {
  const el = document.querySelector(sel);
  const dialogi = el?.querySelector?.('[role="dialog"]') ?? null;
  return {
    fokus: window.matkakirja.ui.fokuskohdeAuki?.id ?? null,
    kortti: el ? String(el.className?.baseVal ?? el.className ?? el.tagName) : null,
    otsikko: dialogi?.getAttribute('aria-label') ?? null,
  };
}, KORTIT);
const tunniste = (a) => (a?.fokus ?? null)
  ?? (a?.otsikko ? `${a.kortti}|${a.otsikko}` : a?.kortti ?? null);
async function sulje(sivu) {
  for (let i = 0; i < 6; i += 1) {
    const t = await avoinna(sivu);
    if (!t.fokus && !t.kortti) return;
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(220);
  }
  await sivu.evaluate(async (sel) => {
    const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    for (const e of document.querySelectorAll(sel)) e.remove();
  }, KORTIT);
  await sivu.waitForTimeout(200);
}

/**
 * Yksi mittaus: saapumisnäkymä (`porras` 0) tai N zoomiporrasta
 * sisäänpäin. Sama kaava kuin savuke-merkkirajat.mjs:ssä.
 *
 * `paljasta` poistaa annetulta kohteelta `vainNimi`-lipun mittauksen
 * ajaksi (vastakoe 8b).
 */
const mittaa = (sivu, porras, paljasta = null) => sivu.evaluate(async ([n, tunnus]) => {
  const l = window.matkakirja.ui.pallolauta;
  const { KOHDE_MAAT, kohteidenNykyinenIso } = await import('/js/fokuskohteet.js');
  const iso = kohteidenNykyinenIso(window.matkakirja.ui);
  const kohde = tunnus ? (KOHDE_MAAT[iso] ?? []).find((k) => k.id === tunnus) : null;
  if (kohde) delete kohde.vainNimi;
  /*
   * ODOTA KAMERAN PYSÄHTYMISTÄ, ÄLÄ KELLOA. `saavu({ kesto: 0 })`
   * palaa ennen kuin kamera on paikallaan, ja kiinteä uni luki
   * satunnaisesti LENNOSSA olevan näkymän: mitattu 14.9.2026 samassa
   * ikkunassa peräkkäin 388,6 (oikea) ja 60,0 (kesken lennon)
   * lautayksikköä, ja jälkimmäisellä lähizoomiportti on auki jo
   * "saapumisessa". Näkymä luetaan siksi kunnes kaksi peräkkäistä
   * lukemaa ovat samat.
   */
  const rauhoitu = async () => {
    let edellinen = null;
    for (let i = 0; i < 25; i += 1) {
      await new Promise((v) => setTimeout(v, 200));
      const w = l.kamera.nakyvaAlue().w;
      if (edellinen !== null && Math.abs(w - edellinen) < 0.5) return;
      edellinen = w;
    }
  };
  await l.saavu({ kesto: 0 });
  await rauhoitu();
  for (let i = 0; i < n; i += 1) {
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ ...pov, altitude: pov.altitude / 2 }, 0);
    await rauhoitu();
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 300));
  const p = l.nostot.portti();
  const osumat = l.nostot.osumat();
  const laatikot = l.nostot.osumaLaatikot?.() ?? [];
  if (kohde) kohde.vainNimi = true;
  return {
    iso,
    leveys: Math.round(l.kamera.nakyvaAlue().w * 10) / 10,
    paastetyt: p ? p.merkit.length - p.polttovelka.length : null,
    piiloon: p?.piiloon?.length ?? 0,
    omat: osumat.filter((o) => o.avain.startsWith('nosto:')).map((o) => o.id),
    kartalla: p ? p.merkit.map((m) => m.id) : [],
    laatikot: laatikot.map((b) => ({
      id: b.id, x0: b.x0, y0: b.y0, x1: b.x1, y1: b.y1,
    })),
  };
}, [porras, paljasta]);

/**
 * NÄKYMÄN NOPEA PALAUTUS. `mittaa` ajaa saavu()n ja zoomiportaat, mikä
 * kestää viitisen sekuntia; napautuskierros tarvitsee saman näkymän
 * kymmeniä kertoja. Kameran asento otetaan siksi talteen kerran ja
 * palautetaan sellaisenaan (kesto 0) — sama näkymä, murto-osa ajasta.
 */
const otaNakyma = (sivu) => sivu.evaluate(
  () => window.matkakirja.ui.pallolauta.pallo.pointOfView(),
);
const palautaNakyma = (sivu, pov) => sivu.evaluate(async (p) => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView(p, 0);
  // Sama rauhoittuminen kuin `mittaa`ssa, lyhyempänä: asento on jo
  // valmis luku eikä kehystystä, joten kamera pysähtyy nopeasti.
  let edellinen = null;
  for (let i = 0; i < 12; i += 1) {
    await new Promise((v) => setTimeout(v, 150));
    const w = l.kamera.nakyvaAlue().w;
    if (edellinen !== null && Math.abs(w - edellinen) < 0.5) break;
    edellinen = w;
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 180));
}, pov);

/** Merkin tuore ruutupiste SIVUN koordinaateissa. */
const tuore = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const o = l.nostot.osumat().find((x) => x.id === tunnus);
  if (!o) return null;
  const p = l.pallo.getScreenCoords(o.lat, o.lng, 0);
  const kr = l.pallo.renderer().domElement.getBoundingClientRect();
  return { px: Math.round(p.x + kr.x), py: Math.round(p.y + kr.y) };
}, id);

async function odotettu(sivu, id) {
  await sulje(sivu);
  await sivu.evaluate((tunnus) => window.matkakirja.ui.pallolauta.napautaNosto(tunnus), id);
  await sivu.waitForTimeout(550);
  const a = await avoinna(sivu);
  await sulje(sivu);
  return tunniste(a);
}

/*
 * KAKSI RUUTUA, YKSI SIVUNLATAUS. Pallon avaaminen ämpärin läpi kestää
 * yli minuutin, ja kahtena latauksena savuke ei mahdu kymmeneen
 * minuuttiin. Ruutukoko vaihdetaan siksi kesken ajon
 * (`setViewportSize`), ja jokainen mittaus alkaa joka tapauksessa
 * omalla `saavu()`-kutsullaan — näkymä ladotaan uudestaan, joten
 * mittaus on sama kuin omalla latauksellaan.
 */
const RUUDUT = [{ w: 390, h: 844 }, { w: 1400, h: 900 }];
let istunto = null;
for (const koko of RUUDUT) {
  const nimi = `${koko.w}x${koko.h}`;
  if (!istunto) istunto = await avaaPeli('pariisi', koko.w, koko.h);
  else {
    await istunto.sivu.setViewportSize({ width: koko.w, height: koko.h });
    await istunto.sivu.waitForTimeout(1200);
  }
  const { ctx, sivu, auki: aukesi } = istunto;
  vaadi(`${nimi}: pallolauta aukesi`, aukesi, virheet.join(' | '));
  if (!aukesi) { await ctx.close(); break; }

  const saapuminen = await mittaa(sivu, 0);
  tieto(`${nimi} saapuminen`, `${saapuminen.iso}, leveys ${saapuminen.leveys}, `
    + `portti päästää ${saapuminen.paastetyt}, lähizoomiin ${saapuminen.piiloon}, `
    + `osumia ${saapuminen.omat.length}`);
  vaadi(`${nimi}: 4. saapumisnäkymässä enintään ${PAAKARTAN_MERKKIKATTO} merkkiä`,
    saapuminen.paastetyt <= PAAKARTAN_MERKKIKATTO, `${saapuminen.paastetyt}`);

  const lahi = await mittaa(sivu, 2);
  tieto(`${nimi} lähizoomi`, `leveys ${lahi.leveys}, portti päästää ${lahi.paastetyt}, `
    + `piilossa ${lahi.piiloon}, osumia ${lahi.omat.length}`);
  vaadi(`${nimi}: 5. lähizoomilla vähintään ${LAHI_VAHINTAAN} merkkiä`,
    lahi.paastetyt >= LAHI_VAHINTAAN, `${lahi.paastetyt}`);

  /*
   * NIMIÖIDEN PÄÄLLEKKÄISYYS. Osumalaatikko ON nimiön laatikko
   * (js/pallolauta/nostot.js nostonLaatikko), joten kahden laatikon
   * leikkaus on kahden nimiön leikkaus. Sovittelu
   * (js/pallolauta/sovittelu.js) väistää ne; tämä vartio mittaa, että
   * väistö riittää myös uusien merkkien kanssa.
   */
  const leikkaukset = (laatikot) => {
    const parit = [];
    for (let i = 0; i < laatikot.length; i += 1) {
      for (let j = i + 1; j < laatikot.length; j += 1) {
        const a = laatikot[i];
        const b = laatikot[j];
        const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
        const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
        if (w > 0 && h > 0) parit.push(`${a.id}×${b.id}`);
      }
    }
    return parit;
  };
  /*
   * MITTA ON SAAPUMISNÄKYMÄ. Se on se näkymä, jonka pelaaja näkee
   * maahan tullessaan ja jota 21 merkin raja suojaa. Lähizoomissa
   * merkkejä on kolminkertaisesti ja Pariisin seutu on tiheä — siellä
   * mitattu päällekkäisyys kirjataan INFOna, koska se koskee myös
   * ennestään olleita merkkejä eikä ole tämän erän tekemä.
   */
  /*
   * MITTA ON TÄMÄN ERÄN MERKIT. Nimiöiden leikkauksia on ruudulla
   * ennestään (mitattu samalla ajolla, INFO-riveillä): ne ovat
   * vanhojen merkkien keskinäisiä eivätkä tämän erän tekemiä. Vartio
   * vaatii siksi sen, mitä erä voi luvata — yksikään uusi merkki ei
   * lisää päällekkäisyyttä saapumisnäkymään.
   */
  const uusiMerkki = (id) => /^(nosto-maalehti-|nakyva-kaupunki-)/.test(id);
  const uudenParit = (parit) => parit.filter((pari) => pari.split('×').some(uusiMerkki));
  const paallekkain = leikkaukset(saapuminen.laatikot);
  const lahiParit = leikkaukset(lahi.laatikot);
  tieto(`${nimi} nimiölaatikoita saapumisessa / lähizoomissa`,
    `${saapuminen.laatikot.length} / ${lahi.laatikot.length}`);
  tieto(`${nimi} nimiöiden leikkauksia saapumisessa (kaikki / uusia)`,
    `${paallekkain.length} / ${uudenParit(paallekkain).length}`
    + (paallekkain.length ? ` — ${paallekkain.slice(0, 6).join(', ')}` : ''));
  if (lahiParit.length) {
    tieto(`${nimi} nimiöiden leikkauksia lähizoomissa (kaikki / uusia)`,
      `${lahiParit.length} / ${uudenParit(lahiParit).length}`
      + ` — ${lahiParit.slice(0, 6).join(', ')}`);
  }
  vaadi(`${nimi}: 6. yksikään tämän erän merkki ei mene päällekkäin saapumisnäkymässä`,
    uudenParit(paallekkain).length === 0, uudenParit(paallekkain).join(', '));

  /* --- 7. uudet nostot avautuvat --- */
  const uudet = MAALEHTINOSTOT_FRA.map((n) => `nosto-${n.id}`)
    .filter((id) => lahi.omat.includes(id));
  tieto(`${nimi} uusia nostoja lähizoomin osumalistalla`,
    `${uudet.length} / ${MAALEHTINOSTOT_FRA.length}`);
  const vaaratHiiri = [];
  const vaaratKosketus = [];
  const ohi = [];
  const paneelissa = [];
  /*
   * NAPAUTUSKIERROS AJETAAN VAIN PUHELINRUUDULLA. Se on tiukempi mitta
   * (merkit ovat lähempänä toisiaan) ja kaksinkertaisena se veisi
   * savukkeelta yli kymmenen minuuttia; työpöytäruudulla mitataan
   * merkkimäärät, nimiöt ja kaupungit.
   */
  const pov = await otaNakyma(sivu);
  for (const id of (koko.w <= 400 ? uudet : [])) {
    const odote = await odotettu(sivu, id);
    for (const tapa of ['hiiri', 'kosketus']) {
      await sulje(sivu);
      await palautaNakyma(sivu, pov);
      const t = await tuore(sivu, id);
      if (!t || t.px < 0 || t.py < 0 || t.px > koko.w || t.py > koko.h) {
        if (tapa === 'hiiri') ohi.push(id);
        continue;
      }
      /*
       * MAAPANEELIN ALLE JÄÄVÄ KUVAKE EI OLE OSUMAREITITYKSEN ASIA
       * (sama havainto kuin savuke-nostoklikkaus.mjs, Biskajanlahti):
       * maapaneeli on kartan päällä oleva kortti, eikä napautus yllä
       * sen läpi palloon asti.
       */
      /*
       * KÄYTTÖLIITTYMÄN ALLE JÄÄVÄ KUVAKE EI OLE OSUMAREITITYKSEN ASIA
       * (sama havainto kuin savuke-nostoklikkaus.mjs:n Biskajanlahti,
       * joka jäi maapaneelin alle). Pallolaudan päällä on paneeleita —
       * maapaneeli ja faktarivi (#fact-text) — joiden läpi napautus ei
       * yllä palloon asti lainkaan. Ehto on siksi yleinen: jos sormen
       * alla EI ole pallon kangas eikä merkkielementti, napautus ei voi
       * tavoittaa karttaa, ja vartio kirjaa sen INFOna.
       */
      const alla = await sivu.evaluate(([xx, yy]) => {
        const e = document.elementFromPoint(xx, yy);
        if (!e) return 'peitossa:ei elementtiä';
        const kangas = window.matkakirja.ui.pallolauta.pallo.renderer().domElement;
        const kartalla2 = e === kangas || e.closest?.('.pallolauta-nosto, .pallolauta-nappula');
        return `${kartalla2 ? '' : 'peitossa:'}${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}`;
      }, [t.px, t.py]);
      if (String(alla).startsWith('peitossa:')) {
        if (tapa === 'hiiri') paneelissa.push(`${id} (${String(alla).slice(9, 32)})`);
        continue;
      }
      if (tapa === 'hiiri') await sivu.mouse.click(t.px, t.py);
      else await sivu.touchscreen.tap(t.px, t.py);
      await sivu.waitForTimeout(500);
      const a = tunniste(await avoinna(sivu));
      if (a !== odote) {
        (tapa === 'hiiri' ? vaaratHiiri : vaaratKosketus)
          .push(`${id}→${a ?? '-'} (odotettu ${odote ?? '-'}, alla ${String(alla).slice(0, 30)})`);
      }
    }
  }
  if (ohi.length) tieto(`${nimi} ruudun ulkopuolella (ohitettu)`, ohi.join(', '));
  if (paneelissa.length) tieto(`${nimi} käyttöliittymän paneelin alla (ohitettu)`, paneelissa.join(', '));
  vaadi(`${nimi}: 7. jokainen uusi nosto avaa OMAN korttinsa hiirellä`,
    vaaratHiiri.length === 0, vaaratHiiri.join(', '));
  vaadi(`${nimi}: 7b. sama kosketuksella`,
    vaaratKosketus.length === 0, vaaratKosketus.join(', '));

  /* --- 8. lisäkaupungit näkyvät mutta eivät ota napautusta --- */
  await sulje(sivu);
  const kaupunkitunnukset = NAKYVAT_KAUPUNGIT_FRA.map((k) => k.id);
  const saap = await mittaa(sivu, 0);
  const kartalla2 = kaupunkitunnukset.filter((id) => saap.kartalla.includes(id));
  const osumissa = kaupunkitunnukset.filter((id) => saap.omat.includes(id));
  tieto(`${nimi} lisäkaupungit kartalla / osumalistalla`,
    `${kartalla2.length} / ${osumissa.length}`);
  vaadi(`${nimi}: 8. kaikki ${kaupunkitunnukset.length} lisäkaupunkia ovat kartalla`,
    kartalla2.length === kaupunkitunnukset.length, kartalla2.join(', '));
  vaadi(`${nimi}: 8a. lisäkaupunki ei ole osumalistalla (nimikyltti ilman korttia)`,
    osumissa.length === 0, osumissa.join(', '));
  const koe = await mittaa(sivu, 0, kaupunkitunnukset[0]);
  vaadi(`${nimi}: 8b. VASTAKOE — ilman \`vainNimi\`-lippua ${kaupunkitunnukset[0]} on osumalistalla`,
    koe.omat.includes(kaupunkitunnukset[0]), koe.omat.filter((i) => i.startsWith('nakyva')).join(', '));

  /* --- 9. minikysymys maksaa (pelilogiikkaa, mitataan yhdellä ruudulla) --- */
  if (koko.w > 400) { continue; }
  await sulje(sivu);
  await mittaa(sivu, 2);
  /*
   * VISAKOE OTETAAN KAUPUNGIN ULKOPUOLELTA. Roquefort on 205
   * lautayksikköä Pariisista, joten sen kortti ei kilpaile kaupungin
   * pisteen eikä maapaneelin kanssa.
   */
  const visakoe = visat.find((n) => n.id === 'maalehti-roquefort') ?? visat[0];
  const visaId = `nosto-${visakoe.id}`;
  const tulos = await sivu.evaluate(async ([tunnus, oikea]) => {
    const ui = window.matkakirja.ui;
    const ennen = ui.game.player?.money ?? ui.game.players?.[0]?.money ?? null;
    ui.pallolauta.napautaNosto(tunnus);
    await new Promise((v) => setTimeout(v, 900));
    /*
     * KUVA EDELLÄ -KORTTI (js/nostokuva.js): kun nostolla on kuva,
     * kortti avautuu ensin kuvana ja "Lisää"-nappi vie koko juttuun,
     * jonka lopussa minikysymys on. Maalehden nostoilla on kuva lähes
     * aina, joten nappi on painettava ennen kuin visaa on olemassa.
     */
    const lisaa = document.querySelector('.nostokuva-lisaa');
    if (lisaa) {
      lisaa.click();
      await new Promise((v) => setTimeout(v, 900));
    }
    const lipukkeet = [...document.querySelectorAll('.fokusnosto-visa button')];
    const nappi = lipukkeet[oikea] ?? null;
    if (!nappi) return { ennen, jalkeen: ennen, lipukkeita: lipukkeet.length };
    nappi.click();
    await new Promise((v) => setTimeout(v, 900));
    return {
      ennen,
      jalkeen: ui.game.player?.money ?? ui.game.players?.[0]?.money ?? null,
      lipukkeita: lipukkeet.length,
    };
  }, [visaId, visakoe.visa.oikea]);
  tieto(`${nimi} visa ${visaId}`,
    `lipukkeita ${tulos.lipukkeita}, rahat ${tulos.ennen} → ${tulos.jalkeen}`);
  vaadi(`${nimi}: 9. oikea vastaus maksaa +${VISAN_PALKKIO}`,
    tulos.jalkeen - tulos.ennen === VISAN_PALKKIO,
    `${tulos.ennen} → ${tulos.jalkeen}`);

  if (KUVAKANSIO && koko.w <= 400) {
    await sulje(sivu);
    await mittaa(sivu, 2);
    try {
      const cdp = await ctx.newCDPSession(sivu);
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
      writeFileSync(join(KUVAKANSIO, `ranska-sisalto-lahi-${nimi}.jpg`), Buffer.from(data, 'base64'));
      await cdp.detach();
    } catch (e) { console.log(`INFO  ${nimi} kuva jäi ottamatta: ${e.message}`); }
  }

  /* konteksti suljetaan vasta silmukan jälkeen (yksi sivunlataus) */
}

vaadi('sivulla ei skriptivirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
lopeta();
