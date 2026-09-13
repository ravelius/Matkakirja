/*
 * Savuke: MAAPANEELI JA LISÄÄ-VALIKKO KARTALLA (karttauudistus erä 3).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 2 kohta 2 (omistaja 13.9.2026,
 * sanatarkasti): *"maan tiedot, lisaa-valikko, nostot ja muut elementit
 * KIINNITETAAN KARTTAAN (karttakoordinaatit, skaalautuvat zoomatessa
 * kuin painettu kartta), maan reunan ulkopuolelle tai rajalle, ei
 * ruutuun."* Ja KARTTAUUDISTUS: *"plus ikoni muutetaan lisaa napiksi,
 * josta aukeaa ... varikoodattu valikko ... Niita painamalla maalehden
 * kyseinen sivu aukeaa."*
 *
 * Väitteet (suunnitelman luku 3.2 valmis-kriteeri):
 *
 *   1. PANEELI ON MAAN LAATIKON ULKOPUOLELLA. Kortin yläreuna on maan
 *      laatikon eteläreunan ALAPUOLELLA ruudulla, ja koko kortti on
 *      ruudun sisällä — molemmilla kuvasuhteilla (390 ja 1400 px).
 *   2. PANEELI SKAALAUTUU KUIN PAINETTU KARTTA. Sama kortti on
 *      LÄHEMMÄLLÄ zoomilla LEVEÄMPI kuin uloimmalla. Jos leveys on
 *      sama, kaluste on ruutuvakio eikä kartassa kiinni.
 *   3. JOKAINEN OTSIKKO AVAA OMAN SIVUNSA. Valikon kaikki rivit
 *      napautetaan OIKEALLA hiiren napautuksella (ei kutsulla
 *      avaaMaalehti-funktioon), ja avautunut sivu todennetaan
 *      lehtitilasta: sivun tunnuksen on oltava sama kuin rivin.
 *   4. VÄRIT OVAT KARTAN OMAT. Jokaisen rivin merkin väri on jokin
 *      --sym-* -muuttujan sävy, ei uusi kirkas väri.
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. MAA ILMAN MAA_KATEGORIAT-RIVIÄ. Palvelin tarjoilee saman pelin
 *      moduulilla, jonka lopussa on `delete MAA_KATEGORIAT.FRA` — rivi
 *      on siis oikeasti poissa, ei piilotettu. Väite: paneeli on yhä
 *      kartalla, Lisää-nappia EI ole, valikko ei aukea eikä sivulle
 *      tule yhtään virhettä.
 *   B. KARTTAAN KIINNITYS POIS (`?maapaneeli=nurkka`, js/fokusmitat.js
 *      MAAPANEELI_KARTASSA). Silloin kaluste on entiseen tapaan ruudun
 *      nurkassa eikä kartassa, ja VÄITTEIDEN 1 JA 2 ON KAADUTTAVA. Jos
 *      ne menevät läpi ilman kartta-ankkuria, väite ei mittaa mitään.
 *
 * === VERKKO ========================================================
 *
 * Pallo tarvitsee Globe.gl:n ämpäristä. Jos ämpäri ei vastaa, savuke
 * ohitetaan (sama sääntö kuin muilla pallosavukkeilla).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/*
 * VASTAKOE A:n kytkin palvelimessa. Kun tämä on maan tunnus, moduulin
 * loppuun kirjoitetaan rivin poisto — maalla ei silloin OIKEASTI ole
 * aihesivuja, eikä valikolla ole mitään mistä rakentua.
 */
let poistaKategoriat = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (poistaKategoriat && polkuOsa.endsWith('/js/packs/maa-kategoriat.js')) {
    runko = Buffer.concat([runko,
      Buffer.from(`\ndelete MAA_KATEGORIAT[${JSON.stringify(poistaKategoriat)}];\n`)]);
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
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

/* Tallenne: Fogg Pariisissa — pilottimaa on Ranska (suunnitelman 3.2). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi ajo: konteksti, peli Pariisissa, pallolauta auki. */
async function avaaPeli({ leveys, korkeus, lisaparametrit = '' }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
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
  await sivu.goto(`${osoite}?lauta=pallo${lisaparametrit}`,
    { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) {
    await sivu.waitForTimeout(4000);
    /*
     * SAAPUMISNÄKYMÄ ON SE "ULOIN ZOOMI", jota vasten luettavuus
     * mitoitetaan (PÄÄTÖKSET 2). Tallenteen lataus ei aja
     * saapumisajoa (nappulan paikka ei vaihdu), joten se ajetaan
     * tässä laudan omalla kutsulla — samalla laatikolla ja samalla
     * marginaalilla kuin kaupunkiin saavuttaessa.
     */
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1500));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
  }
  return { ctx, sivu, virheet, auki };
}

/**
 * Kortin ruutulaatikko ja maan laatikon eteläreuna samassa mitassa.
 * Molemmat luetaan LIVENÄ selaimesta: laatikko projisoidaan pallon
 * omalla getScreenCoordsilla, jotta vertailu on ruudun pikseleissä.
 */
const mittaaPaneeli = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kortti = document.querySelector('.maapaneeli-kortti');
  const mitat = l.maapaneeli?.mitat?.() ?? null;
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  const laatikko = datum?.laatikko ?? null;
  const r = kortti?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();
  // Maan laatikon eteläreunan keskipiste ruudulla (sama piste, josta
  // paneelin ankkuri lasketaan, mutta ilman rakoa).
  let etelaY = null;
  if (laatikko) {
    const a = l.asteet({ x: laatikko.x + laatikko.w / 2, y: laatikko.y + laatikko.h });
    const p = a ? l.pallo.getScreenCoords(a.lat, a.lon ?? a.lng, 0) : null;
    etelaY = p ? p.y : null;
  }
  return {
    onKortti: Boolean(kortti),
    kortti: r ? {
      x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height,
    } : null,
    kotelo: { w: kotelo.width, h: kotelo.height, x0: kotelo.left, y0: kotelo.top },
    etelaY,
    perusta: mitat?.perusta ?? null,
    skaala: datum?.skaala ?? null,
    korkeus: l.pallo.pointOfView()?.altitude ?? null,
    // Nurkkatilan kaluste (vastakoe B): sama tieto samalta ruudulta.
    nurkassa: Boolean(document.querySelector('.fokus-kartuutsi')
      && !document.querySelector('.fokusmitat')?.hidden),
  };
});

/** Zoom sisään: sama keskipiste, puolet korkeudesta. */
const zoomaaSisaan = (sivu, kerroin) => sivu.evaluate(async (k) => {
  const l = window.matkakirja.ui.pallolauta;
  const pov = l.pallo.pointOfView();
  l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * k }, 0);
  await new Promise((v) => setTimeout(v, 1200));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
}, kerroin);

/* ==================== PÄÄAJO: 390 px ja 1400 px ==================== */

/*
 * `sivuvara` ja `ylavara` ovat KUVAN rajaus, eivät mittaus: raportin
 * kuvakatto on 400 kt, ja koko 1400 px:n ruutu on PNG:nä 780 kt —
 * lähes kaikki siitä on laattapinnan rakeista pergamenttia paneelin
 * ympärillä. Rajaus jättää kuvaan maan eteläreunan ja koko paneelin.
 */
const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844, sivuvara: 90, ylavara: 360 },
  { nimi: '1400', leveys: 1400, korkeus: 900, sivuvara: 40, ylavara: 100 },
];

const sijaintiOk = [];
const skaalausOk = [];
const otsikkoTulokset = [];
let variVirheita = 0;
let variRiveja = 0;
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { /* eslint-disable-next-line no-await-in-loop */ await ctx.close(); continue; }

  /* --- 1. paikka: maan laatikon eteläreunan ulkopuolella ---------- */
  // eslint-disable-next-line no-await-in-loop
  const ulko = await mittaaPaneeli(sivu);
  const paikallaan = Boolean(ulko.onKortti && ulko.kortti && Number.isFinite(ulko.etelaY)
    && ulko.kortti.y0 >= ulko.etelaY - 1
    && ulko.kortti.y1 <= ulko.kotelo.y0 + ulko.kotelo.h + 1
    && ulko.kortti.x0 >= ulko.kotelo.x0 - 1
    && ulko.kortti.x1 <= ulko.kotelo.x0 + ulko.kotelo.w + 1);
  sijaintiOk.push({
    ruutu: ruutu.nimi,
    ok: paikallaan,
    ulkopuolella: Boolean(ulko.kortti && ulko.kortti.y0 >= ulko.etelaY - 1),
    ruudulla: Boolean(ulko.kortti && ulko.kortti.y1 <= ulko.kotelo.y0 + ulko.kotelo.h + 1
      && ulko.kortti.x0 >= ulko.kotelo.x0 - 1
      && ulko.kortti.x1 <= ulko.kotelo.x0 + ulko.kotelo.w + 1),
  });
  tieto(`${ruutu.nimi} px · uloin zoomi`,
    `kortti ${ulko.kortti ? `${Math.round(ulko.kortti.w)} x ${Math.round(ulko.kortti.h)} px `
      + `(y ${Math.round(ulko.kortti.y0)}…${Math.round(ulko.kortti.y1)})` : 'EI OLE'}, `
    + `x ${ulko.kortti ? `${Math.round(ulko.kortti.x0)}…${Math.round(ulko.kortti.x1)}` : '—'}, `
    + `karttaruutu x ${Math.round(ulko.kotelo.x0)}…${Math.round(ulko.kotelo.x0 + ulko.kotelo.w)} `
    + `y ${Math.round(ulko.kotelo.y0)}…${Math.round(ulko.kotelo.y0 + ulko.kotelo.h)}, `
    + `maan eteläreuna y ${ulko.etelaY == null ? '—' : Math.round(ulko.etelaY)}, `
    + `skaala ${ulko.skaala?.toFixed(3) ?? '—'}, korkeus ${ulko.korkeus?.toFixed(4) ?? '—'}`);

  if (KUVAKANSIO && ulko.kortti) {
    /*
     * MATKAPÄIVÄKIRJA KUTISTETAAN KUVAA VARTEN. Päiväkirjalappu
     * (.fact-card) asettuu sille kartan nurkalle, jossa on eniten
     * merta (js/kartta.js placeFactCard), ja pallolaudalla se osuu
     * Pariisissa keskelle ruutua — valokuva peittää koko Ranskan ja
     * paneelin yläreunan. Kutistus on PELIN OMA TILA (ui.
     * asetaPaivakirjanKoko, sama minkä kartan veto tekee), ei kuvan
     * väärentämistä: näin kuva näyttää sen, mitä pelaaja näkee
     * heti ensimmäisen panoroinnin jälkeen. Päällekkäisyys itsessään
     * on kirjattu raporttiin avoimena asiana.
     */
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko(true));
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(500);
    /*
     * KUVA RAJATAAN MAAHAN JA PANEELIIN. Koko ruudun PNG on 1400 px
     * leveänä yli puoli megatavua (raportin kuvakatto on 400 kt), ja
     * suurin osa siitä on tyhjää merta paneelin ympärillä. Rajaus
     * lasketaan mitatuista laatikoista, joten se osuu samaan kohtaan
     * kummallakin kuvasuhteella.
     */
    const x = Math.max(0, Math.round(ulko.kortti.x0 - ruutu.sivuvara));
    const y = Math.max(0, Math.round(ulko.kortti.y0 - ruutu.ylavara));
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({
      path: join(KUVAKANSIO, `karttauudistus-3-${ruutu.nimi}.png`),
      clip: {
        x,
        y,
        width: Math.min(ruutu.leveys - x, Math.round(ulko.kortti.w + 2 * ruutu.sivuvara)),
        height: Math.min(ruutu.korkeus - y, Math.round(ulko.kortti.y1 + 25 - y)),
      },
    });
  }

  /* --- 2. skaalautuminen: sama kortti isompana lähempää ----------- */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 0.5);
  // eslint-disable-next-line no-await-in-loop
  const lahi = await mittaaPaneeli(sivu);
  const kasvoi = Boolean(ulko.kortti && lahi.kortti && lahi.kortti.w > ulko.kortti.w + 1);
  skaalausOk.push(kasvoi);
  tieto(`${ruutu.nimi} px · lähempi zoomi`,
    `kortti ${lahi.kortti ? `${Math.round(lahi.kortti.w)} x ${Math.round(lahi.kortti.h)} px` : 'EI OLE'}, `
    + `skaala ${lahi.skaala?.toFixed(3) ?? '—'} (uloin ${ulko.skaala?.toFixed(3) ?? '—'})`);

  /* --- 3. jokainen otsikko avaa oman sivunsa ---------------------- */
  // eslint-disable-next-line no-await-in-loop
  await zoomaaSisaan(sivu, 2); // takaisin uloimpaan
  if (ruutu.nimi === '390') {
    /*
     * Napautukset tehdään VAIN kapealla ruudulla, koska ne ovat sama
     * DOM-polku molemmilla eikä lehden avaus riipu kuvasuhteesta —
     * ja koska kapea ruutu on se, jolla valikon on ahtainta mahtua.
     */
    // eslint-disable-next-line no-await-in-loop
    const aiheet = await sivu.$$eval('.maapaneeli-aihe', (nodet) => nodet.map((n) => ({
      id: n.dataset.aihe,
      nimi: n.textContent.trim(),
    })));
    tieto('valikon rivit ennen avausta', `${aiheet.length} (piilossa)`);
    // eslint-disable-next-line no-await-in-loop
    await sivu.click('.maapaneeli-lisaa');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
    // eslint-disable-next-line no-await-in-loop
    const rivit = await sivu.$$eval('.maapaneeli-valikko:not([hidden]) .maapaneeli-aihe',
      (nodet) => nodet.map((n) => ({
        id: n.dataset.aihe,
        nimi: n.querySelector('.maapaneeli-aihe-nimi')?.textContent ?? '',
        vari: getComputedStyle(n.querySelector('.maapaneeli-aihe-merkki')).backgroundColor,
      })));
    tieto('Ranskan valikon otsikot', rivit.map((r) => r.nimi).join(' · ') || 'EI YHTÄÄN');

    /*
     * VÄRIT OVAT KARTAN OMAT. Sallittu joukko luetaan juuresta
     * (--sym-*), joten koe kaatuu heti, jos valikkoon ilmestyy väri,
     * jota kartalla ei ole.
     */
    // eslint-disable-next-line no-await-in-loop
    const sallitut = await sivu.evaluate(() => {
      const juuri = getComputedStyle(document.documentElement);
      const nimet = ['historia', 'ruoka', 'kulttuuri', 'luonto', 'elain', 'urheilu',
        'tekniikka', 'kauppa', 'sana', 'merenkulku', 'kaupunki', 'hetki', 'silma'];
      const muunna = (arvo) => {
        const d = document.createElement('div');
        d.style.color = arvo;
        document.body.appendChild(d);
        const v = getComputedStyle(d).color;
        d.remove();
        return v;
      };
      return nimet.map((n) => muunna(juuri.getPropertyValue(`--sym-${n}`).trim()));
    });
    variRiveja += rivit.length;
    for (const r of rivit) if (!sallitut.includes(r.vari)) variVirheita += 1;

    for (const rivi of rivit) {
      /* eslint-disable no-await-in-loop */
      await sivu.click(`.maapaneeli-aihe[data-aihe="${rivi.id}"]`);
      await sivu.waitForTimeout(500);
      const tulos = await sivu.evaluate(() => {
        const { ui } = window.matkakirja;
        const i = ui.lehtitila.tutkiSivu;
        const sivut = ui.lehtitila.tutkiSivut ?? [];
        return {
          auki: Boolean(ui.arrivalDialog?.open),
          maa: ui.lehtitila.tutkiMaaLehti,
          sivu: i,
          id: sivut[i - 1]?.id ?? null,
          otsikko: sivut[i - 1]?.nimi ?? null,
        };
      });
      otsikkoTulokset.push({ pyydetty: rivi.id, ...tulos });
      tieto(`otsikko "${rivi.nimi}"`,
        `lehti auki ${tulos.auki}, maa ${tulos.maa}, sivu ${tulos.sivu} = ${tulos.id}`);
      /*
       * Lehti kiinni ja valikko auki seuraavaa riviä varten. Sulku
       * tehdään dialogin omalla metodilla eikä Escillä: modaali
       * dialogi nielee näppäimen lukijan ja sivunkäännön kuuntelijoihin
       * eikä sulkeudu joka kerta, ja silloin seuraava napautus osuisi
       * lehden tekstiin.
       */
      await sivu.evaluate(() => window.matkakirja.ui.arrivalDialog?.close());
      await sivu.waitForTimeout(500);
      const valikkoAuki = await sivu.evaluate(
        () => !document.querySelector('.maapaneeli-valikko')?.hidden,
      );
      if (!valikkoAuki) {
        await sivu.click('.maapaneeli-lisaa');
        await sivu.waitForTimeout(200);
      }
      /* eslint-enable no-await-in-loop */
    }
  }

  paaVirheet = paaVirheet.concat(virheet);
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
}

vaadi('1. paneeli on kartalla maan laatikon ETELÄREUNAN ULKOPUOLELLA ja kokonaan ruudulla '
  + '(390 px ja 1400 px)',
sijaintiOk.length === RUUDUT.length && sijaintiOk.every((t) => t.ok),
`tulokset ${JSON.stringify(sijaintiOk)}`);
vaadi('2. paneeli skaalautuu kuin painettu kartta (lähempänä leveämpi kuin uloimmalla)',
  skaalausOk.length === RUUDUT.length && skaalausOk.every(Boolean),
  `tulokset ${JSON.stringify(skaalausOk)}`);

const otsikotOsui = otsikkoTulokset.filter(
  (t) => t.auki && t.maa === 'FRA' && t.id === t.pyydetty,
).length;
vaadi('3. jokainen valikon otsikko avaa maalehden OMAN sivunsa',
  otsikkoTulokset.length >= 8 && otsikotOsui === otsikkoTulokset.length,
  `otsikoita ${otsikkoTulokset.length}, oikein ${otsikotOsui}: `
  + JSON.stringify(otsikkoTulokset.filter((t) => t.id !== t.pyydetty)));
vaadi('4. valikon värit ovat kartan omia --sym-sävyjä (ei uusia kirkkaita)',
  variRiveja >= 8 && variVirheita === 0, `rivejä ${variRiveja}, vieraita värejä ${variVirheita}`);
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('5. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ==================== VASTAKOE A: maa ilman aiheita ================ */

poistaKategoriat = 'FRA';
{
  const { ctx, sivu, virheet, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const tulos = auki ? await sivu.evaluate(() => ({
    kortti: Boolean(document.querySelector('.maapaneeli-kortti')),
    lisaa: Boolean(document.querySelector('.maapaneeli-lisaa:not([hidden])')),
    rivit: document.querySelectorAll('.maapaneeli-aihe').length,
    nimi: document.querySelector('.maapaneeli-nimi-suomi')?.textContent ?? '',
  })) : null;
  tieto('vastakoe A (Ranska ilman MAA_KATEGORIAT-riviä)',
    tulos ? `kortti ${tulos.kortti} ("${tulos.nimi}"), Lisää-nappi ${tulos.lisaa}, `
      + `valikkorivejä ${tulos.rivit}, virheitä ${virheet.length}` : 'lauta ei auennut');
  vaadi('VASTAKOE A: maa ilman aiheita → paneeli on, valikkoa ei, peli ei kaadu',
    Boolean(auki && tulos?.kortti && !tulos.lisaa && tulos.rivit === 0 && virheet.length === 0),
    JSON.stringify({ auki, tulos, virheet }));
  await ctx.close();
}
poistaKategoriat = null;

/* ============ VASTAKOE B: karttaan kiinnitys pois ================== */
/*
 * `?maapaneeli=nurkka` palauttaa kalusteen ruudun nurkkaan
 * (js/fokusmitat.js MAAPANEELI_KARTASSA). Väitteiden 1 ja 2 ON
 * kaaduttava: kartalla ei ole paneelia, jonka sijaintia maan laatikkoon
 * voisi verrata, eikä ruutuvakio skaalaudu zoomatessa.
 */
{
  const { ctx, sivu, auki } = await avaaPeli({
    leveys: 390, korkeus: 844, lisaparametrit: '&maapaneeli=nurkka',
  });
  const ulko = auki ? await mittaaPaneeli(sivu) : null;
  await zoomaaSisaan(sivu, 0.5);
  const lahi = auki ? await mittaaPaneeli(sivu) : null;
  const vaite1 = Boolean(ulko?.onKortti && ulko.kortti && Number.isFinite(ulko.etelaY)
    && ulko.kortti.y0 >= ulko.etelaY - 1);
  const vaite2 = Boolean(ulko?.kortti && lahi?.kortti && lahi.kortti.w > ulko.kortti.w + 1);
  tieto('vastakoe B (?maapaneeli=nurkka)',
    `kartalla kortti ${Boolean(ulko?.onKortti)}, nurkkakaluste ${Boolean(ulko?.nurkassa)}, `
    + `väite 1 ${vaite1 ? 'LÄPI (paha)' : 'PUNAINEN'}, väite 2 ${vaite2 ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE B: ilman karttaan kiinnitystä sijainti- ja skaalausväite kaatuvat',
    Boolean(auki) && !vaite1 && !vaite2 && Boolean(ulko?.nurkassa),
    JSON.stringify({ auki, vaite1, vaite2, nurkassa: ulko?.nurkassa }));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
