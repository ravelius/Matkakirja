/*
 * Savuke: LISÄKAUPUNGIN KAUPUNKIKORTTI (Raamattu, osio "Kaupungit":
 * KARTTAUUDISTUKSEN PAATOKSET 16; js/kaupunkinosto.js
 * latoLisakaupunginKortti, js/packs/nakyvat-kaupungit-fra.js,
 * js/fokuskohteet.js avaaFokuskohde).
 *
 * Omistaja 14.9.2026 sanatarkasti: *"Yhdista nuo kaksi ens.
 * Vaihtoehtoa ja pyyda putkelta kuhunkin kaupunkiin hero kuva.
 * Esittelyn jalkeen voi siis tulla yksi nosto teksti. Jos useampi olisi
 * tarjolla niin jatetaan seuraavat kartalle omiksi nostoikseen."*
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI: lupaus on se, mitä pelaaja näkee kun
 * hän napauttaa kartalta Lyonia. Merkki on pallon merkkikerroksen
 * datum, napautus kulkee pallon osumalistan kautta, ja kortti on
 * karttaruudun päällä kelluva paperi — mitään näistä ei ole ilman
 * selainta. Napautus on aito: sormi osuu kankaaseen siinä
 * ruutupisteessä, johon kaupunki projisoituu.
 *
 * ── VARTIOT (390 × 844 ja 1400 × 900) ─────────────────────────────
 *   1. LYONIN NAPAUTUS AVAA KAUPUNKIKORTIN lehden kehyksessä
 *      (.kaupunkipopup.kaupunkipopup-lisakaupunki), ja kortti on
 *      karttaruudun sisällä. Otsikko on kaupungin nimi.
 *   2. HEROKUVA LATAUTUU JA KREDITTI NÄKYY. Kuvaputki toimitti
 *      seitsemän Commons-alkuperäistä 14.9.2026 (manifesti
 *      posti/kuvatoimitus-ranska7-20260914.json), ja jokaisen
 *      seitsemän kortin kuva on kytketty: <img> on kortissa,
 *      naturalWidth > 0 (kuva todella dekoodautui), lähderivi
 *      (.lehti-kuvalahde) on näkyvissä ja sen teksti on datan oma
 *      merkilleen, eikä kuvateksti väitä vuotta 1873.
 *   2b. KUVAA EI RAJATA: piirtoalan kuvasuhde on kuvan oman
 *      luonnollisen suhteen sisällä ±2 % (contain, toimituksen ehto).
 *   2c. VASTAKOE: kun `herokuva` nollataan ajon ajaksi, kortti piirtää
 *      paikkamerkin (.kaupunkipopup-heropaikka) eikä hae yhtään
 *      ulkoista kuvaa — paikkamerkki jää tyhjän kentän varaksi.
 *   3. NOSTOLOHKO ON DATAN OMA TEKSTI MERKILLEEN: otsikko ja leipä
 *      ovat js/packs/maalehtinostot-fra.js:n `maalehti-cinematographe`
 *      sanasta sanaan, nostokortin omilla luokilla.
 *   4. ESITTELY ON KORTISSA SANASTA SANAAN DATAN OMA (Fable hyväksyi
 *      seitsemän esittelyä 14.9.2026 klo 21.25 UTC).
 *   4b. VASTAKOE: kun `esittely` tyhjennetään ajon ajaksi, koko
 *      esittelylohko katoaa kortista — tyhjää kehystä ei jätetä.
 *   5. LILLE — KAUPUNKI ILMAN ANKKUROITUA NOSTOA — avaa saman kortin
 *      ILMAN nostolohkoa. Tämä on vartion 3 luonnollinen vastapari.
 *   6. VASTAKOE: kun Lyonin `korttiNosto` nollataan ajon ajaksi,
 *      nostolohko katoaa Lyoninkin kortista — vartio 3 mittaa siis
 *      dataa eikä kortin rakennetta.
 *   7. LISÄKAUPUNGIT EIVÄT OLE MATKAKOHTEITA: kumpikaan ei ole laudan
 *      CITIES-listalla eikä nopanheiton siirtovaihtoehdoissa.
 *   8. EI SIVUVIRHEITÄ.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä pallo ei aukea ja savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-kaupunkikortit.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { jaaKappaleiksi } from '../../js/ui-apurit.js';
import { NAKYVAT_KAUPUNGIT_FRA } from '../../js/packs/nakyvat-kaupungit-fra.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Lyonilla on ankkuroitu nosto, Lillellä ei (mitattu, ks. datatiedosto). */
const kaupunki = (id) => NAKYVAT_KAUPUNGIT_FRA.find((k) => k.id === id);
const LYON = kaupunki('nakyva-kaupunki-lyon');
const LILLE = kaupunki('nakyva-kaupunki-lille');
const RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];

/** Noston teksti niin kuin kortti sen latoo: kappaleet peräkkäin. */
const nostonTeksti = (n) => {
  const koko = n?.teksti ?? (Array.isArray(n?.lunastus)
    ? n.lunastus.map((k) => String(k ?? '').trim()).filter(Boolean).join('\n\n')
    : String(n?.lunastus ?? ''));
  return jaaKappaleiksi(koko).join('');
};

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

/*
 * VARTIOT 2, 2a ja 2b YHDESSÄ PAIKASSA, koska sama mitta ajetaan sekä
 * napautetuille korteille (Lyon, Lille) että koko seitsikon
 * läpikäynnille. `hero` on lueKortin lukema DOM-mitta, `kohde` pakan
 * rivi — kaikki odotukset tulevat siis datasta, eivät tästä
 * tiedostosta.
 */
const tarkastaHero = (tunnus, kohde, hero) => {
  const odote = kohde.herokuva ?? null;
  vaadi(`${tunnus}: 2. herokuva on kortissa ja latautui`,
    Boolean(hero) && hero.ladattu && hero.osoite === odote?.osoite,
    `hero ${JSON.stringify(hero && { osoite: hero.osoite, ladattu: hero.ladattu })}`);
  if (!hero) return;
  vaadi(`${tunnus}: 2a. kuvateksti ja lähderivi ovat datan omat merkilleen`,
    hero.kuvateksti === `${odote.lyhyt}${odote.lahde}`
    && hero.lahdeTeksti === odote.lahde && hero.lahdeNakyy,
    `kortissa "${hero.kuvateksti}"`);
  vaadi(`${tunnus}: 2a2. kuvateksti ei väitä vuotta 1873`,
    !`${hero.kuvateksti}`.includes('1873'), hero.kuvateksti);
  const suhde = hero.luonnollinen > 0 ? hero.piirretty / hero.luonnollinen : 0;
  tieto(`${tunnus} kuvasuhde`,
    `luonnollinen ${hero.luonnollinen.toFixed(3)}, piirretty `
    + `${hero.piirretty.toFixed(3)} (${hero.leveys}×${hero.korkeus} px)`);
  vaadi(`${tunnus}: 2b. kuvaa ei rajata — piirtosuhde ±2 % luonnollisesta`,
    Math.abs(suhde - 1) <= 0.02, `poikkeama ${((suhde - 1) * 100).toFixed(2)} %`);
};

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

/* ---------------- Node-vartio 7: ei matkakohteita ---------------- */
const pakka = packById('maailmankartta');
const laudanKaupungit = new Set((pakka?.map?.cities ?? pakka?.cities ?? []).map((c) => c.id));
const kohteina = NAKYVAT_KAUPUNGIT_FRA.filter((k) => laudanKaupungit.has(k.id));
tieto('laudan kaupunkeja pakassa', laudanKaupungit.size);
vaadi('7. yksikään lisäkaupunki ei ole laudan matkakohde',
  laudanKaupungit.size > 0 && kohteina.length === 0, kohteina.map((k) => k.id).join(', '));

/* ---------------- selainvartiot ---------------- */
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/*
 * KUVA MITATAAN VASTA KUN SE ON DEKOODATTU. `loading="lazy"` ja ämpärin
 * välitys tarkoittavat, että kortti on DOMissa ennen kuin kuva on
 * ladattu; mitattu 15.9.2026 (1400 × 900: naturalWidth 0 ja piirtoala
 * 928 × 6 px heti napautuksen jälkeen). Raja on väljä (40 s), koska
 * toimitetut vedokset ovat 0,4–4,5 Mt ja kulkevat ämpärin kautta:
 * mitattu 15.9.2026, että Toulouse (3,0 Mt) ei ehtinyt 15 sekunnissa
 * puhelinruudulla. Odotin ei piilota vikaa — lataamaton kuva jää yhä
 * `ladattu: false`ksi ja kaataa vartion 2.
 */
const odotaHero = (sivu) => sivu.evaluate(async () => {
  const kuva = () => document.querySelector('.kaupunkipopup-lisakaupunki .lehti-kuva img');
  if (!kuva()) return false;
  for (let i = 0; i < 160; i += 1) {
    const el = kuva();
    if (el?.complete && el.naturalWidth > 0) return true;
    await new Promise((v) => setTimeout(v, 250));
  }
  return false;
});

/** Yhden kortin mitat DOMista. */
const lueKortti = (sivu) => sivu.evaluate(() => {
  const p = document.querySelector('.kaupunkipopup-lisakaupunki');
  if (!p) return null;
  const pane = document.querySelector('.map-pane').getBoundingClientRect();
  const r = p.getBoundingClientRect();
  const nakyy = (el) => Boolean(el) && el.getClientRects().length > 0;
  const paikka = p.querySelector('.kaupunkipopup-heropaikka');
  return {
    otsikko: p.querySelector('.kaupunkipopup-otsikko')?.textContent ?? '',
    paikkamerkki: nakyy(paikka),
    paikkamerkinTeksti: paikka?.textContent ?? '',
    kuvia: p.querySelectorAll('img').length,
    hero: (() => {
      const k = p.querySelector('.lehti-paakuva .lehti-kuva img');
      if (!k) return null;
      const r = k.getBoundingClientRect();
      const lahde = p.querySelector('.lehti-kuvalahde');
      return {
        osoite: k.currentSrc || k.src,
        ladattu: k.complete && k.naturalWidth > 0,
        luonnollinen: k.naturalWidth / Math.max(1, k.naturalHeight),
        piirretty: r.width / Math.max(1, r.height),
        leveys: Math.round(r.width),
        korkeus: Math.round(r.height),
        alt: k.alt,
        kuvateksti: p.querySelector('.lehti-kuva .kuvateksti')?.textContent ?? '',
        lahdeTeksti: lahde?.textContent ?? '',
        lahdeNakyy: Boolean(lahde) && lahde.getClientRects().length > 0,
      };
    })(),
    esittelyja: p.querySelectorAll('.arrival-intro').length,
    esittelyTeksti: p.querySelector('.arrival-intro')?.textContent ?? null,
    nostoOtsikko: p.querySelector('.fokusnosto-kortti-otsikko')?.textContent ?? null,
    nostoTeksti: p.querySelector('.fokusnosto-teksti')?.textContent ?? null,
    nostolohkoja: p.querySelectorAll('.fokusnosto-teksti').length,
    ruudulla: r.left >= pane.left - 1 && r.right <= pane.right + 1
      && r.top >= pane.top - 1 && r.bottom <= pane.bottom + 1,
  };
});

/**
 * Merkin ruutupiste pallon osumalistalta (sama kaava kuin nostoilla).
 *
 * MITTA UUSITAAN, KUNNES LADONTA ON ASETTUNUT. Osumalista syntyy vasta
 * kun pallo on pysähtynyt ja `ladoHeti` on ajanut; isolla ruudulla ja
 * kuormitetulla koneella ensimmäinen luku osui mitatusti tyhjään
 * listaan (savukeajo 14.9.2026, 1400 × 900: molemmat kaupungit `null`,
 * vaikka erillinen mittaus näytti ne listalla ruutupisteessä 871, 521).
 * Silmukka ajaa ladonnan uudestaan ja lukee saman listan viisi kertaa —
 * se ei piilota vikaa, koska tyhjä lista viiden kierroksen jälkeen jää
 * yhä `null`iksi ja kaataa vartion.
 */
const piste = async (sivu, id) => {
  for (let i = 0; i < 5; i += 1) {
    /* eslint-disable no-await-in-loop */
    const p = await sivu.evaluate(async (tunnus) => {
      const l = window.matkakirja.ui.pallolauta;
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 250));
      const o = l.nostot.osumat().find((x) => x.id === tunnus);
      if (!o) return null;
      /*
       * KOHDE KÄÄNNETÄÄN RUUDUN KESKELLE ENNEN MITTAA. Mitattu
       * 15.9.2026 (390 × 844): Lillen merkki osui pallon yläreunaan
       * ruutupisteeseen (231, 122), jossa päällimmäisenä on pelin oma
       * palkki (elementFromPoint → SPAN.typed) — sormi ei siis olisi
       * osunut karttaan lainkaan, ja vartio 1 jäi punaiseksi ilman
       * mitään vikaa kortissa. Keskitys ei laimenna vartiota: napautus
       * on yhä aito sormi kankaalla siinä pisteessä, johon kaupunki
       * projisoituu.
       */
      const pov = l.pallo.pointOfView();
      l.pallo.pointOfView({ lat: o.lat, lng: o.lng, altitude: pov.altitude }, 0);
      await new Promise((v) => setTimeout(v, 500));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 250));
      const uusi = l.nostot.osumat().find((x) => x.id === tunnus) ?? o;
      const s = l.pallo.getScreenCoords(uusi.lat, uusi.lng, 0);
      if (!s) return null;
      const kr = l.pallo.renderer().domElement.getBoundingClientRect();
      const px = Math.round(s.x + kr.x);
      const py = Math.round(s.y + kr.y);
      // Piste kelpaa vain jos sormi todella osuisi karttakankaaseen.
      const alla = document.elementFromPoint(px, py);
      if (!alla || alla.tagName !== 'CANVAS') return null;
      return { px, py };
    }, id);
    if (p) return p;
    await sivu.waitForTimeout(400);
    /* eslint-enable no-await-in-loop */
  }
  return null;
};

const sulje = async (sivu) => {
  for (let i = 0; i < 4; i += 1) {
    const auki = await sivu.evaluate(() => Boolean(document.querySelector('.kaupunkipopup')));
    if (!auki) return;
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(220);
  }
  await sivu.evaluate(() => {
    for (const e of document.querySelectorAll('.kaupunkipopup')) e.remove();
  });
};

for (const ruutu of RUUDUT) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete('pariisi');
  const tallenne = JSON.stringify(peli.toJSON());

  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
    hasTouch: true,
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
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  await sivu.waitForTimeout(3500);
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    await l.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1400));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 350));
  });

  /* --- 7b. eivät ole nopanheiton siirtovaihtoehtoja --- */
  const siirrot = await sivu.evaluate(() => {
    const g = window.matkakirja.ui.game;
    return (g.moveOptions?.() ?? []).map((o) => o.city?.id ?? null).filter(Boolean);
  });
  const lisatSiirroissa = NAKYVAT_KAUPUNGIT_FRA
    .map((k) => k.id).filter((id) => siirrot.includes(id));
  tieto(`${ruutu.nimi} siirtovaihtoehtoja`, siirrot.length);
  vaadi(`${ruutu.nimi}: 7b. yksikään lisäkaupunki ei ole siirtovaihtoehto`,
    lisatSiirroissa.length === 0, lisatSiirroissa.join(', '));

  /* --- 1–4. Lyon: kortti, paikkamerkki, nosto, ei esittelyä --- */
  for (const [kohde, onNosto] of [[LYON, true], [LILLE, false]]) {
    await sulje(sivu);
    const p = await piste(sivu, kohde.id);
    vaadi(`${ruutu.nimi} ${kohde.nimi}: merkki on osumalistalla ja ruudulla`,
      Boolean(p) && p.px > 0 && p.py > 0 && p.px < ruutu.width && p.py < ruutu.height,
      JSON.stringify(p));
    if (!p) continue;
    /*
     * NAPAUTUS UUSITAAN KERRAN. Merkki on pallon pinnalla ja kortti
     * avautuu osumalistan kautta; mitattu 15.9.2026, että 390 px:n
     * ruudulla yksi napautus meni kerran ohi (Lille). Uusinta ei
     * piilota vikaa: jos kortti ei aukea kahdestikaan, vartio 1 on
     * punainen.
     */
    for (let yritys = 0; yritys < 3; yritys += 1) {
      /* eslint-disable no-await-in-loop */
      // Piste mitataan joka yrityksellä uudestaan: pallo pyörii itsestään,
      // ja edellisen kortin kuvan lataus vei sekunteja — vanha ruutupiste
      // olisi silloin jo väärässä paikassa (mitattu 15.9.2026, 390 px Lille).
      const kohta = yritys === 0 ? p : await piste(sivu, kohde.id);
      if (kohta) await sivu.mouse.click(kohta.px, kohta.py);
      await sivu.waitForTimeout(900);
      const auki = await sivu.evaluate(
        () => Boolean(document.querySelector('.kaupunkipopup-lisakaupunki')),
      );
      if (auki) break;
      await sulje(sivu);
      /* eslint-enable no-await-in-loop */
    }
    await odotaHero(sivu);
    const kortti = await lueKortti(sivu);
    vaadi(`${ruutu.nimi} ${kohde.nimi}: 1. napautus avaa kaupunkikortin lehden kehyksessä`,
      Boolean(kortti), virheet.join(' | '));
    if (!kortti) continue;
    vaadi(`${ruutu.nimi} ${kohde.nimi}: 1b. otsikko on kaupungin nimi ja kortti on karttaruudussa`,
      kortti.otsikko === kohde.nimi && kortti.ruudulla,
      `"${kortti.otsikko}", ruudulla ${kortti.ruudulla}`);
    tarkastaHero(`${ruutu.nimi} ${kohde.nimi}`, kohde, kortti.hero);
    const esittelyOdote = jaaKappaleiksi(kohde.esittely ?? '').join('');
    tieto(`${ruutu.nimi} ${kohde.nimi} esittelyn pituus`, `${(kohde.esittely ?? '').length} merkkiä`);
    vaadi(`${ruutu.nimi} ${kohde.nimi}: 4. esittely on kortissa datan oma merkilleen`,
      kortti.esittelyja === 1 && kortti.esittelyTeksti === esittelyOdote
      && esittelyOdote.length >= 180 && esittelyOdote.length <= 260,
      `lohkoja ${kortti.esittelyja}, kortissa ${kortti.esittelyTeksti?.length ?? 0},`
      + ` datassa ${esittelyOdote.length} merkkiä`);
    if (onNosto) {
      const odote = nostonTeksti(kohde.korttiNosto);
      tieto(`${ruutu.nimi} ${kohde.nimi} noston tunnus`, kohde.korttiNosto?.id ?? '-');
      vaadi(`${ruutu.nimi} ${kohde.nimi}: 3. nostolohkon otsikko on datan oma`,
        kortti.nostoOtsikko === kohde.korttiNosto.otsikko,
        `kortissa "${kortti.nostoOtsikko}"`);
      vaadi(`${ruutu.nimi} ${kohde.nimi}: 3b. nostolohkon teksti on datan oma merkilleen`,
        kortti.nostoTeksti === odote && odote.length > 0,
        `kortissa ${kortti.nostoTeksti?.length ?? 0}, datassa ${odote.length} merkkiä`);
    } else {
      vaadi(`${ruutu.nimi} ${kohde.nimi}: 5. VASTAPARI — ei nostolohkoa ilman ankkuroitua nostoa`,
        kohde.korttiNosto === null && kortti.nostolohkoja === 0,
        `${kortti.nostolohkoja} lohkoa`);
    }
    if (KUVAKANSIO) {
      /*
       * KUVA ON JPEG JA AIKARAJA VÄLJÄ. Raportin kuvat mahtuvat repoon
       * vain pakattuina (kuvakiintiö 300 kt), ja Playwrightin
       * kuvakaappaus odottaa fonttien latautumista — ämpärin takaa se
       * kestää puhelinruudulla yli 15 sekuntia. Kuva on raportin lisä
       * eikä vartio, joten epäonnistuminen ei kaada ajoa.
       */
      await sivu.screenshot({
        path: join(KUVAKANSIO, `kaupunkikortti-${kohde.id}-${ruutu.width}.jpg`),
        type: 'jpeg',
        quality: 72,
        scale: 'css',
        animations: 'disabled',
        timeout: 60000,
      }).catch((e) => tieto(`${kohde.nimi}: kuvakaappaus ei onnistunut`, String(e.message ?? e)));
    }
  }

  /* --- 2. KOKO SEITSIKKO: jokaisen kortin kuva latautuu ja krediitti näkyy ---
   *
   * Napautus mitataan Lyonilla ja Lillellä yllä; tämä kierros avaa
   * loputkin viisi samalla koodipolulla kuin napautus
   * (js/fokuskohteet.js avaaFokuskohde) ja lukee kuvan DOMista vasta
   * kun selain on dekoodannut sen. Kuvat tulevat oikeasta ämpäristä
   * (route-välitys yllä), joten mitta koskee toimitettuja tiedostoja.
   */
  for (const kohde of NAKYVAT_KAUPUNGIT_FRA) {
    await sulje(sivu);
    /* eslint-disable no-await-in-loop */
    const avautui = await sivu.evaluate(async (id) => {
      const { KOHDE_MAAT, kohteidenNykyinenIso, avaaFokuskohde } = await import('/js/fokuskohteet.js');
      const ui = window.matkakirja.ui;
      const kohteet = KOHDE_MAAT[kohteidenNykyinenIso(ui)] ?? [];
      const k = kohteet.find((x) => x.id === id);
      if (!k) return false;
      avaaFokuskohde(ui, k, {});
      return true;
    }, kohde.id);
    await odotaHero(sivu);
    vaadi(`${ruutu.nimi} ${kohde.nimi}: kortti aukesi kuvamittausta varten`, avautui);
    if (!avautui) continue;
    const kortti = await lueKortti(sivu);
    tarkastaHero(`${ruutu.nimi} ${kohde.nimi}`, kohde, kortti?.hero ?? null);
    /* eslint-enable no-await-in-loop */
  }

  /* --- 4b ja 6. VASTAKOKEET: datakenttä pois ajon ajaksi --- */
  await sulje(sivu);
  /*
   * Avaa Lyonin kortin niin, että annettu datakenttä on mittauksen
   * ajaksi tyhjä, ja palauttaa kentän heti perään. Vartiot 3, 3b ja 4
   * mittaavat siis DATAA eivätkä kortin rakennetta: jos kortti piirtäisi
   * lohkon datasta riippumatta, tämä koe olisi punainen.
   */
  const ilmanKenttaa = (kentta) => sivu.evaluate(async ([id, nimi]) => {
    const { KOHDE_MAAT, kohteidenNykyinenIso, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    const ui = window.matkakirja.ui;
    const iso = kohteidenNykyinenIso(ui);
    const kohde = (KOHDE_MAAT[iso] ?? []).find((k) => k.id === id);
    if (!kohde) return null;
    const talteen = kohde[nimi];
    kohde[nimi] = null;
    avaaFokuskohde(ui, kohde, {});
    await new Promise((v) => setTimeout(v, 500));
    const p = document.querySelector('.kaupunkipopup-lisakaupunki');
    const paikka = p?.querySelector('.kaupunkipopup-heropaikka') ?? null;
    const tulos = {
      kortti: Boolean(p),
      nostolohkoja: p ? p.querySelectorAll('.fokusnosto-teksti').length : -1,
      esittelyja: p ? p.querySelectorAll('.arrival-intro').length : -1,
      paikkamerkki: Boolean(paikka) && paikka.getClientRects().length > 0,
      kuvia: p ? p.querySelectorAll('img').length : -1,
    };
    kohde[nimi] = talteen;
    return tulos;
  }, [LYON.id, kentta]);

  const koeEsittely = await ilmanKenttaa('esittely');
  vaadi(`${ruutu.nimi}: 4b. VASTAKOE — ilman \`esittely\`ä kortissa ei ole esittelylohkoa`,
    Boolean(koeEsittely?.kortti) && koeEsittely.esittelyja === 0, JSON.stringify(koeEsittely));
  await sulje(sivu);
  await sulje(sivu);
  const koeKuva = await ilmanKenttaa('herokuva');
  vaadi(`${ruutu.nimi}: 2c. VASTAKOE — ilman \`herokuva\`a kortti piirtää paikkamerkin`,
    Boolean(koeKuva?.kortti) && koeKuva.paikkamerkki && koeKuva.kuvia === 0,
    JSON.stringify(koeKuva));
  await sulje(sivu);
  const koe = await ilmanKenttaa('korttiNosto');
  vaadi(`${ruutu.nimi}: 6. VASTAKOE — ilman \`korttiNosto\`a Lyonin kortissa ei ole nostolohkoa`,
    Boolean(koe?.kortti) && koe.nostolohkoja === 0, JSON.stringify(koe));

  const kaatui = virheet.filter((v) => !/globe|WebGL|texture/i.test(v));
  vaadi(`${ruutu.nimi}: 8. ei sivuvirheitä`, kaatui.length === 0, kaatui.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
