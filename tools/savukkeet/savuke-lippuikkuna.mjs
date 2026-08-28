/*
 * Savuke: lippuikkunan pikselit (omistajan iPad-havainto 17.8.2026 —
 * Soulin lehti, Etelä-Korea: "lipun kuva sumea" ja "vaakunalaatikko
 * työntyy ulos kortin alareunasta").
 *
 * Vartioi kahta mitattua takea:
 *
 *  1. TERÄVYYS. Iso lippu ei saa tulla saapumiskortin pikkukopiosta.
 *     Repon liput ovat 120 tai 250 px leveitä, ja ikkuna näyttää lipun
 *     404 CSS-pikselin levyisenä — iPadilla 809 laitepikseliä. Kuvan on
 *     siis tultava Commonsista pyydetyllä leveydellä (js/liput.js:
 *     ISO_LIPPU_LEVEYS), ja jos se ehtii latautua, sen luonnollisen
 *     leveyden on katettava näytön laitepikselit.
 *
 *  2. LEIKKAUSRAKENNE. Kehys (paperi, reuna, varjo) ja vierityskotelo
 *     (overflow + clip-path) ovat eri elementit. Yhdistettyinä toinen
 *     tehtävä syö toisen: leikkaus söisi varjon, ja ilman leikkausta
 *     WebKit päästää sumennetun sisällön kortin pyöristetyn reunan yli
 *     (omistajan iPad-havainto 18.8.2026).
 *
 *  3. RAJAUS. Napautettu vaakuna tai versiolippu kasvaa animaationa;
 *     ennen korjausta vieritys mitattiin kesken kasvun, jolloin laatta
 *     jäi osittain kortin näkyvän alueen ULKOPUOLELLE (Etelä-Korea
 *     52,9 px, Japani 67,8 px, Saksa 254,1 px alareunan alapuolelle) ja
 *     kortin pyöristetty alalaita katkaisi kuvatekstin kesken rivin.
 *     Tarkennetun on mahduttava kortin sisään kummassakin asennossa.
 *
 * Verkkoa ei tarvita: ilman yhteyttä kuva jää paikalliskopioon, jolloin
 * terävyysväite ohitetaan erikseen merkittynä — osoitteen oikeellisuus
 * tarkistetaan silti.
 *
 *   node tools/savukkeet/savuke-lippuikkuna.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/*
 * Konttiympäristössä Chromium ei pääse ulos ilman välityspalvelinta,
 * joten ulkoiset pyynnöt kierrätetään Noden kautta (sama kaava kuin
 * tools/kuvaa-vuoripopup.mjs). Palvelutyöntekijä estetään: se sieppaisi
 * kuvapyynnöt omaan noutoonsa, joka ei kulje tämän reitityksen läpi.
 */
const LIPUT = [
  ['Flag of South Korea.svg', 'Etelä-Korea'],
  ['Flag of Japan.svg', 'Japani'],
  ['Flag of Germany.svg', 'Saksa'],
];
const ASENNOT = [
  ['pysty', { width: 834, height: 1112 }],
  ['vaaka', { width: 1112, height: 834 }],
];

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [asento, viewport] of ASENNOT) {
  const ctx = await selain.newContext({
    viewport, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block',
  });
  const sivu = await ctx.newPage();
  await sivu.route((url) => !['localhost', '127.0.0.1'].includes(url.hostname), async (reitti) => {
    try {
      const vastaus = await fetch(reitti.request().url(), {
        headers: { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' },
      });
      reitti.fulfill({
        status: vastaus.status,
        headers: { 'content-type': vastaus.headers.get('content-type') ?? 'application/octet-stream' },
        body: Buffer.from(await vastaus.arrayBuffer()),
      });
    } catch { reitti.abort(); }
  });
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForFunction(() => window.matkakirja, null, { timeout: 30000 });

  for (const [tiedosto, maa] of LIPUT) {
    /*
     * Osoite luetaan PYYNNÖISTÄ eikä lopullisesta src:stä: jos verkko ei
     * vastaa, media.js siirtyy varareitille (paikalliskopio) ja src
     * kertoisi vain siitä. Ensin pyydetty osoite kertoo, mitä peli
     * yrittää näyttää — ja juuri se on tässä vartioitava asia.
     */
    const pyynnot = [];
    const kirjaa = (pyynto) => pyynnot.push(pyynto.url());
    sivu.on('request', kirjaa);
    const tulos = await sivu.evaluate(async (avain) => {
      document.querySelector('.lippu-ikkuna')?.remove();
      const moduuli = await import('./js/liput.js');
      moduuli.avaaLippuikkuna(avain);
      const kuva = document.querySelector('.lippu-iso');
      const takaraja = Date.now() + 25000;
      while (!(kuva.complete && kuva.naturalWidth > 0) && Date.now() < takaraja) {
        await new Promise((valmis) => { setTimeout(valmis, 200); });
      }
      const kortti = document.querySelector('.lippu-kortti');
      const mitta = {
        src: kuva.getAttribute('src') ?? '',
        luonnollinen: kuva.naturalWidth,
        laitepikselit: Math.round(kuva.getBoundingClientRect().width * window.devicePixelRatio),
      };
      // Tarkennus: napautetaan vaakunaa (tai versiolippua, jos vaakunaa
      // ei ole) ja odotetaan kasvu + vieritys loppuun.
      const laatta = document.querySelector('.lippu-tunnus, .lippu-versio');
      if (!laatta) return { ...mitta, tarkennus: null };
      laatta.click();
      await new Promise((valmis) => { setTimeout(valmis, 1800); });
      const k = kortti.getBoundingClientRect();
      const laatikot = [laatta, ...laatta.querySelectorAll('.lippu-versio-selite')]
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.height > 0);
      /*
       * Kehyksen ja vierityskotelon työnjako: kehys heittää varjon eikä
       * leikkaa, kotelo leikkaa eikä heitä varjoa. Jos ne joskus
       * yhdistetään takaisin yhdeksi elementiksi, sumennettu sisältö
       * karkaa taas WebKitissä kortin pyöristetyn reunan yli.
       */
      const kehys = document.querySelector('.lippu-kehys');
      const kehyksenTyyli = kehys && getComputedStyle(kehys);
      const kortinTyyli = getComputedStyle(kortti);
      /*
       * VAAKARAJAUS JOKAISELLE LAATALLE (omistajan bugiraportti
       * 28.8.2026: "lippuikkunan suurennoksen kuvateksti leikkautuu
       * vasemmalta"). Yllä oleva mittaus koskee vain ensimmäistä
       * laattaa, ja vika osui nimenomaan ruudukon REUNIMMAISIIN
       * sarakkeisiin: keskipisteensä ympäri kasvava laatta ja sitä
       * leveämpi selite venyivät kortin leikkauksen ulkopuolelle
       * (mitattu ennen korjausta 390 px ruudulla 68,2 px ja 834 px
       * ruudulla 74,7 px vasemmalle). Vaakasiirto lasketaan jo
       * napautuksessa, joten tässä riittää odottaa siirtymä (200 ms)
       * loppuun — pystyvieritystä ei tarvitse jäädä vahtimaan.
       */
      let ohiSivulta = -Infinity;
      for (const laatta2 of document.querySelectorAll('.lippu-versio, .lippu-tunnus')) {
        if (!laatta2.classList.contains('tarkennettu')) laatta2.click();
        await new Promise((valmis) => { setTimeout(valmis, 320); });
        const kk = kortti.getBoundingClientRect();
        const osat = [laatta2, ...laatta2.querySelectorAll('.lippu-versio-selite')]
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.width > 0 && r.height > 0);
        ohiSivulta = Math.max(
          ohiSivulta,
          kk.left - Math.min(...osat.map((r) => r.left)),
          Math.max(...osat.map((r) => r.right)) - kk.right,
        );
      }
      return {
        ohiSivulta: +ohiSivulta.toFixed(1),
        ...mitta,
        rakenne: {
          kehysOnVanhempi: kortti.parentElement === kehys,
          kehyksellaVarjo: Boolean(kehyksenTyyli && kehyksenTyyli.boxShadow !== 'none'),
          // Kehys ei saa leikata itseään: clip-path tai maski söisi varjon.
          kehysEiLeikkaaItseaan: Boolean(kehyksenTyyli
            && kehyksenTyyli.clipPath === 'none' && kehyksenTyyli.maskImage === 'none'),
          kotelonLeikkaus: kortinTyyli.clipPath,
          koteloEiVarjoa: kortinTyyli.boxShadow === 'none',
          sumennettuKotelonSisalla: kortti.contains(document.querySelector('.lippu-iso')),
        },
        tarkennus: {
          paalla: kortti.classList.contains('tarkennus'),
          ohiAlta: +(Math.max(...laatikot.map((r) => r.bottom)) - k.bottom).toFixed(1),
          ohiPaalta: +(k.top - Math.min(...laatikot.map((r) => r.top))).toFixed(1),
          ohiOikealta: +(Math.max(...laatikot.map((r) => r.right)) - k.right).toFixed(1),
        },
      };
    }, tiedosto);

    sivu.off('request', kirjaa);
    const paikallinen = tulos.src.startsWith('assets/');
    const suurennos = pyynnot.find((u) => u.includes('commons.wikimedia.org/wiki/Special:FilePath/')
      && u.includes(encodeURIComponent(tiedosto)));
    vaadi(`${maa} ${asento}: iso lippu pyydetään suurena (ei saapumiskortin kopiota)`,
      Boolean(suurennos) && Number(suurennos.match(/width=(\d+)/)?.[1] ?? 0) >= 1280,
      `pyydetyt osoitteet: ${pyynnot.filter((u) => u.includes('Flag') || u.includes('liput')).join(' , ') || '(ei yhtään)'}`);
    if (paikallinen) {
      console.log(`      (ohitettu terävyysmittaus: ${maa} jäi varareitille, ei verkkoa)`);
    } else {
      vaadi(`${maa} ${asento}: lipun luonnollinen leveys kattaa laitepikselit`,
        tulos.luonnollinen >= tulos.laitepikselit,
        `luonnollinen ${tulos.luonnollinen} px < näytöllä ${tulos.laitepikselit} px`);
    }
    vaadi(`${maa} ${asento}: kehys varjoineen ja leikkaava vierityskotelo erillään`,
      tulos.rakenne?.kehysOnVanhempi === true
        && tulos.rakenne.kehyksellaVarjo === true
        && tulos.rakenne.kehysEiLeikkaaItseaan === true
        && /^inset\(/.test(tulos.rakenne.kotelonLeikkaus ?? '')
        && tulos.rakenne.koteloEiVarjoa === true
        && tulos.rakenne.sumennettuKotelonSisalla === true,
      JSON.stringify(tulos.rakenne));
    vaadi(`${maa} ${asento}: tarkennettu laatta mahtuu kortin sisään`,
      tulos.tarkennus?.paalla === true
        && tulos.tarkennus.ohiAlta <= 0
        && tulos.tarkennus.ohiPaalta <= 0
        && tulos.tarkennus.ohiOikealta <= 0,
      JSON.stringify(tulos.tarkennus));
    if (tulos.tarkennus) {
      vaadi(`${maa} ${asento}: jokainen tarkennettu laatta mahtuu kortin leveyteen`,
        tulos.ohiSivulta <= 0,
        `pahin sivuylitys ${tulos.ohiSivulta} px (selite tai laatta leikkautuu reunasta)`);
    }
  }
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
