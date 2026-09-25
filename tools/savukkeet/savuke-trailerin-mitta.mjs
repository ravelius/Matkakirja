/*
 * Savuke: saapumistrailerin herokuvan koko EI saa muuttua siitä, onko
 * pelaaja käynyt välillä toisessa sovelluksessa.
 *
 * Omistaja 11.9.2026 klo 23.18 (iPad-kaappaus Bukarestin trailerista),
 * sanatarkasti: *"Nyt taas näkyy kuvat pienempänä vaikka välissä näkyi
 * isompana. Syy on ilmeisesti siinä jos käyn toisessa apissa ja palaan
 * matkakirjaan niin sitten kuvien koko muuttuu pienemmäksi"*.
 *
 * JUURISYY. WKWebView jättää sovellusvaihdon jälkeen ASETTELU-
 * VIEWPORTIN vanhaan, kapeampaan mittaan, kunnes joku pakottaa
 * laskennan uusiksi (sama vika, jota js/ui.js mittaaNakyma ja
 * vahdiNakymanKokoa paikkaavat lehdelle ja kartalle). `96vw` on 96 %
 * VIEWPORTISTA eikä ruudusta, joten koko traileri kutistui sen mukana.
 *
 * MITÄ TÄMÄ MITTAA. Maalatun kuvan leveys suhteessa RUUDUN todelliseen
 * leveyteen — ei laatikon leveyttä (object-fit: contain voi kutistaa
 * kuvan laatikon sisään) eikä viewportin leveyttä (juuri se valehtelee).
 * Vika jäljitellään antamalla sivulle kapea asetteluviewportti samalla
 * kun visualViewport ja innerWidth kertovat ruudun oikean koon —
 * täsmälleen se tila, jossa iOS on paluun jälkeen.
 *
 * Mitattu Chromiumilla 11.9.2026 (834 × 1194, asetteluviewportti jäänyt
 * 480 px:iin): ennen korjausta 461 px = 55,2 % ruudusta, korjattuna
 * 801 px = 96,0 %.
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
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg',
};

/*
 * Traileri nostetaan ruudulle omalla koesivullaan eikä koko pelin
 * kautta: mitattava asia on päällyksen mitoitus, ja koko saapumisen
 * ajaminen toisi mukaan lautakytkimet, äänet ja verkkohaut, jotka eivät
 * kerro kuvan koosta mitään.
 */
const KOESIVU = `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<link rel="stylesheet" href="/css/styles.css">
<style>html,body{margin:0;background:#111}</style>
<script type="module">
import { naytaSaapumistraileri } from '/js/saapumistraileri.js';
window.ui = {};
window.aloita = (id, nimi) => { naytaSaapumistraileri(window.ui, { id, name: nimi }); };
window.valmis = true;
</script>`;

const palvelin = http.createServer((req, res) => {
  const polku = req.url.split('?')[0];
  if (polku === '/' || polku === '/traileri.html') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(KOESIVU);
    return;
  }
  const tiedosto = join(JUURI, polku);
  if (!existsSync(tiedosto)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(tiedosto)] ?? 'application/octet-stream' });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, ok));
const portti = palvelin.address().port;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Koekuva 3:2 — sama suhde kuin lehden herokuvilla. */
const koekuva = {
  status: 200,
  contentType: 'image/svg+xml',
  body: '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">'
    + '<rect width="100%" height="100%" fill="#c86"/></svg>',
};

/** Maalatun kuvan leveys prosentteina ruudun todellisesta leveydestä. */
const MITTA = `(() => {
  const kotelo = document.querySelector('.saapumistraileri-kuva.keskella')
    || document.querySelector('.saapumistraileri-kuva');
  if (!kotelo) return { osuus: 0, px: 0, asettelu: 0 };
  const img = kotelo.querySelector('img');
  const r = img.getBoundingClientRect();
  const suhde = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
  const maalattu = suhde ? Math.min(r.width, r.height * suhde) : 0;
  return {
    px: Math.round(maalattu),
    osuus: +(100 * maalattu / window.__ruutuLeveys).toFixed(1),
    asettelu: document.documentElement.clientWidth,
  };
})()`;

/**
 * Sivu, jonka ASETTELUviewportti on `asettelu` mutta jonka ruutu
 * (visualViewport, innerWidth) on `ruutu` — iOS:n paluutila.
 */
async function avaa(asettelu, ruutu) {
  const konteksti = await selain.newContext({
    viewport: { width: asettelu[0], height: asettelu[1] },
    deviceScaleFactor: 2,
  });
  await konteksti.addInitScript(([leveys, korkeus]) => {
    window.__ruutuLeveys = leveys;
    window.__ruutuKorkeus = korkeus;
    const maarita = (kohde, nimi, arvo) => {
      try {
        Object.defineProperty(kohde, nimi, { configurable: true, get: arvo });
      } catch { /* selain ei anna — mittaus kaatuu ääneen alempana */ }
    };
    maarita(window, 'innerWidth', () => window.__ruutuLeveys);
    maarita(window, 'innerHeight', () => window.__ruutuKorkeus);
    if (window.VisualViewport) {
      maarita(VisualViewport.prototype, 'width', () => window.__ruutuLeveys);
      maarita(VisualViewport.prototype, 'height', () => window.__ruutuKorkeus);
      maarita(VisualViewport.prototype, 'scale', () => 1);
    }
  }, [ruutu[0], ruutu[1]]);
  const sivu = await konteksti.newPage();
  await sivu.route('**/julisteet/**', (reitti) => reitti.fulfill(koekuva));
  await sivu.goto(`http://localhost:${portti}/traileri.html`, { waitUntil: 'load' });
  await sivu.waitForFunction(() => window.valmis);
  return sivu;
}

/** Ruudut, joilla omistaja pelaa (pysty ja vaaka) + vanhentunut leveys. */
const RUUDUT = [
  ['iPad pysty 834×1194', [834, 1194], [480, 700]],
  ['iPad vaaka 1194×834', [1194, 834], [480, 700]],
  ['iPad pysty 1024×1366', [1024, 1366], [507, 800]],
  ['iPad vaaka 1366×1024', [1366, 1024], [507, 800]],
];

/** Kuvan on täytettävä vähintään tämä osuus ruudusta. */
const VAHINTAAN = 94;

for (const [nimi, ruutu, vanhentunut] of RUUDUT) {
  const sivu = await avaa(ruutu, ruutu);
  await sivu.evaluate(() => { window.aloita('bukarest', 'BUKAREST'); });
  await sivu.waitForTimeout(1200);
  const ennen = await sivu.evaluate(MITTA);
  vaadi(`${nimi}: kuva täyttää ruudun normaalisti`, ennen.osuus >= VAHINTAAN,
    `maalattu kuva ${ennen.osuus} % ruudusta (${ennen.px} px)`);

  // Sovellusvaihto: asetteluviewportti jää vanhaan kapeaan mittaan.
  await sivu.setViewportSize({ width: vanhentunut[0], height: vanhentunut[1] });
  await sivu.evaluate(() => {
    document.dispatchEvent(new Event('visibilitychange'));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await sivu.waitForTimeout(600);
  const jalkeen = await sivu.evaluate(MITTA);
  vaadi(`${nimi}: kuva ei kutistu sovellusvaihdossa`,
    jalkeen.osuus >= VAHINTAAN && Math.abs(jalkeen.px - ennen.px) <= 2,
    `ennen ${ennen.px} px (${ennen.osuus} %), jälkeen ${jalkeen.px} px `
    + `(${jalkeen.osuus} %) — asetteluviewportti ${jalkeen.asettelu} px`);
  await sivu.context().close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
