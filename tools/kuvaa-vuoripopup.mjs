/*
 * Kuvakaappaus vuorikohteen kuvakarusellista.
 *
 *   node tools/kuvaa-vuoripopup.mjs kaukasus [kuva-indeksi]
 *
 * Avaa pelin, käynnistää uuden pelin ja avaa maastonimen Lue lisää
 * -ikkunan täsmälleen sillä kutsulla, jolla kartan i-nappi sen avaa
 * (ui.avaaMaastonimi). Kaappaukset menevät tools/vuorikuva-taulut/ ja
 * ne KATSOTAAN — kuvakaappaus, jota ei katsota, ei todista mitään.
 *
 * Kartalta klikkaaminen vaatisi zoomauksen oikeaan kohtaan ja
 * nimilapun osumisen; se testaisi kartan piirtoa, ei karusellia.
 * Ikkuna avataan siksi suoraan, mutta pelin omalla polulla eikä
 * koodia ohittaen.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const SELAIN = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';
const avain = process.argv[2] ?? 'kaukasus';
const kuvaIndeksi = Number(process.argv[3] ?? 0);

const TYYPIT = {
  html: 'text/html', js: 'text/javascript', css: 'text/css',
  json: 'application/json', svg: 'image/svg+xml', png: 'image/png',
  jpg: 'image/jpeg', webmanifest: 'application/manifest+json',
};

// Oma palvelin: peli on ES-moduuleja, joita file:-osoitteesta ei saa ladata.
const palvelin = createServer((pyynto, vastaus) => {
  const polku = decodeURIComponent(pyynto.url.split('?')[0]);
  const tiedosto = join(JUURI, polku === '/' ? 'index.html' : polku);
  try {
    const data = readFileSync(tiedosto);
    vastaus.writeHead(200, { 'content-type': TYYPIT[tiedosto.split('.').pop()] ?? 'application/octet-stream' });
    vastaus.end(data);
  } catch {
    vastaus.writeHead(404).end('ei löydy');
  }
});
await new Promise((r) => palvelin.listen(0, r));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

const paketti = await import('playwright');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: SELAIN });
const konteksti = await selain.newContext({ viewport: { width: 900, height: 1100 } });
const sivu = await konteksti.newPage();
sivu.on('console', (v) => { if (v.type() === 'error') console.log(`  konsoli: ${v.text()}`); });
sivu.on('pageerror', (v) => console.log(`  SIVUVIRHE: ${v.message}`));

/*
 * ULKOISET PYYNNÖT NODEN KAUTTA.
 *
 * Konttiympäristössä ulos pääsee vain agenttivälityspalvelimen kautta.
 * Node osaa käyttää sitä (NODE_USE_ENV_PROXY=1), Chromium ei — sen
 * pyynnöt katkesivat ERR_CONNECTION_RESET-virheeseen, ja kaappaus
 * näytti siltä kuin kuva olisi rikki, vaikka vika oli verkossa.
 *
 * Sieppaus koskee vain repon ulkopuolisia osoitteita: peli itse tulee
 * omalta palvelimelta ja latautuu selaimen omalla polulla. Tämä
 * todistaa siis sen, että ikkuna näyttää kuvat oikein — ei sitä,
 * pääseekö pelaajan selain peiliin. Peilin kunto tarkistetaan
 * tools/tarkista-kuvatiedostot.mjs:llä.
 */
await sivu.route((url) => !url.hostname.startsWith('127.0.0.1'), async (reitti) => {
  try {
    const vastaus = await fetch(reitti.request().url(), {
      headers: { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' },
    });
    reitti.fulfill({
      status: vastaus.status,
      headers: { 'content-type': vastaus.headers.get('content-type') ?? 'application/octet-stream' },
      body: Buffer.from(await vastaus.arrayBuffer()),
    });
  } catch {
    reitti.abort();
  }
});

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForFunction(() => window.matkakirja?.ui, null, { timeout: 30000 });

const tulos = await sivu.evaluate(async ([tunnus, i]) => {
  const { VUORISTONIMET } = await import('./js/packs/maasto-nimet-vuoret.js');
  const kohde = VUORISTONIMET.find((v) => v.avain === tunnus);
  if (!kohde) return { virhe: `tuntematon kohde ${tunnus}` };
  window.matkakirja.ui.avaaMaastonimi(kohde);
  await new Promise((r) => { setTimeout(r, 1200); });
  for (let n = 0; n < i; n += 1) {
    document.getElementById('wiki-kuva-seuraava').click();
    await new Promise((r) => { setTimeout(r, 400); });
  }
  const kuva = document.getElementById('wiki-image');
  /*
   * Odotetaan kunnes kuva on OIKEASTI perillä, enintään 20 sekuntia.
   * Uudet kuvat eivät ole vielä peilissä, joten ensimmäinen osoite
   * vastaa virheellä ja peli siirtyy varareitille (Commons) — ja juuri
   * se vaihto on tässä se, mikä pitää nähdä toimivan.
   */
  const takaraja = Date.now() + 20000;
  while (!(kuva.complete && kuva.naturalWidth > 0) && Date.now() < takaraja) {
    await new Promise((r) => { setTimeout(r, 500); });
  }
  return {
    nimi: kohde.nimi,
    laskuri: document.getElementById('wiki-kuva-laskuri').textContent,
    kuvateksti: document.getElementById('wiki-kuvateksti').textContent,
    piilossa: document.getElementById('wiki-kuvateksti').hidden,
    src: kuva.getAttribute('src'),
    // Kuva on oikeasti perillä vasta kun selain tietää sen mitat.
    ladattu: kuva.complete && kuva.naturalWidth > 0,
    leveys: kuva.naturalWidth,
  };
}, [avain, kuvaIndeksi]);

console.log(tulos);
const ulos = join(JUURI, 'tools', 'vuorikuva-taulut', `popup-${avain}-${kuvaIndeksi}.png`);
await sivu.locator('#wiki-dialog').screenshot({ path: ulos });
console.log(ulos);
await selain.close();
palvelin.close();
