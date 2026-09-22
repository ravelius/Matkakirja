#!/usr/bin/env node
/*
 * PIIRTOKOE-MITTAUS (Laitetestaaja 22.9.2026) — Pelikoodarin piirtokoe-
 * lippujen (?koe=eipuskuri|dpr15|eivienti, PR #2845/#2843) mittaus Macin
 * OMALLA Safarilla. Käyttää pelin SISÄÄNRAKENNETTUA synteettistä vetoa
 * (window.__kehysprofiili.veto — dispatchaa PointerEventit itse), koska
 * CGEvent ei liikuta karttaa tässä ympäristössä (ks. tools/mac/aikajana-
 * mittaus.md) — synteettinen veto on tässä TARKOITUKSELLA oikea valinta,
 * sillä tavoite on ajaa piirtopolku/GPU-prosessi toistettavasti, ei
 * mitata käden seurantavirhettä.
 *
 * KÄYTTÖ: node tools/mittaus/piirtokoe-mittaus.mjs [--portti 8801]
 *   Avaa tulostetut 4 osoitetta VUOROTELLEN Macin Safarissa (open -a Safari),
 *   odota ~13 s per osoite, tulokset docs/raportit/data/piirtokoe-mac-
 *   safari-<pvm>.jsonl.
 */
import http from 'node:http';
import os from 'node:os';
import { createReadStream, existsSync, readFileSync, statSync, appendFileSync, mkdirSync } from 'node:fs';
import { extname, join, normalize, dirname } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const JUURI = dirname(fileURLToPath(import.meta.url)).replace(/\/tools\/mittaus$/, '');
const AMPARI = 'https://media.matkakirja.app/';
const AMPARIPOLKU = '/ampari/';
const argv = process.argv.slice(2);
const arg = (nimi, oletus) => { const i = argv.indexOf(`--${nimi}`); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : oletus; };
const PORTTI = Number(arg('portti', '8801'));
const KESTO = Number(arg('kesto', '10000'));
const TIEDOSTO = arg('tiedosto', `piirtokoe-mac-safari-${new Date().toISOString().slice(0, 10)}.jsonl`);
const DATAKANSIO = join(JUURI, 'docs', 'raportit', 'data');
const DATAPOLKU = join(DATAKANSIO, TIEDOSTO);
mkdirSync(DATAKANSIO, { recursive: true });

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const UUDELLEENKIRJOITETTAVAT = new Set(['.js', '.mjs', '.html', '.css', '.json', '.webmanifest']);
const kirjoitaAmpari = (teksti, origin) => teksti.split(AMPARI).join(`${origin}${AMPARIPOLKU}`);
const SW_STUBI = "self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',(e)=>{e.waitUntil((async()=>{for(const c of await caches.keys())await caches.delete(c);await self.registration.unregister();for(const cl of await self.clients.matchAll())cl.navigate(cl.url);})());});";

const HARNESSI = `
<script type="module">
  if (new URLSearchParams(location.search).get('piirtokoe') === '1') {
    const kerros = document.createElement('div');
    kerros.style.cssText = 'position:fixed;inset:auto 0 0 0;z-index:99999;background:#000d;color:#0f0;font:12px/1.4 monospace;padding:10px;max-height:50vh;overflow:auto;white-space:pre-wrap';
    kerros.textContent = 'odotetaan palloa...';
    document.body.append(kerros);
    const kirjoita = (t) => { kerros.textContent = t; };
    const laheta = (data) => fetch('/__mittaus', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
    const odota = (ehto, aikakatkaisu = 60000) => new Promise((ok, ei) => {
      const alku = performance.now();
      const askel = () => { if (ehto()) return ok(); if (performance.now() - alku > aikakatkaisu) return ei(new Error('aikakatkaisu')); requestAnimationFrame(askel); };
      askel();
    });
    const poistaVerho = () => {
      try { window.matkakirja?.ui?.piilotaAloitusverho?.(); } catch { /* ei verhoa */ }
      for (const el of document.querySelectorAll('.aloitusverho, .saapumiskortti')) el.remove();
      document.body.classList.remove('aloitusverho-paalla');
    };
    const ohitusAjastin = setInterval(() => {
      const ui = window.matkakirja?.ui;
      const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
      if (n) n.click();
      poistaVerho();
    }, 150);
    const koe = new URLSearchParams(location.search).get('koe') ?? '';
    odota(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili))
      .then(() => new Promise((r) => setTimeout(r, 2500)))
      .then(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }))
      .then(() => new Promise((r) => setTimeout(r, 1000)))
      .then(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 46.5, lng: 2.5, altitude: 0.2 }, 0))
      .then(() => new Promise((r) => setTimeout(r, 1000)))
      .then(() => { clearInterval(ohitusAjastin); poistaVerho(); })
      .then(() => new Promise((r) => setTimeout(r, 2000)))
      .then(async () => {
        kirjoita('vedetään ' + ${KESTO} + ' ms...');
        const v = await window.__kehysprofiili.veto({ kesto: ${KESTO}, nopeusPx: 80, suunta: [1, 0.3], pointerType: 'mouse' });
        const kehykset = v.kehykset ?? [];
        const dts = kehykset.map((k) => k.dt).filter(Number.isFinite).sort((a, b) => a - b);
        const pct = (arr, q) => arr.length ? arr[Math.min(arr.length - 1, Math.floor(q * (arr.length - 1)))] : null;
        const ka = (sel) => { const xs = kehykset.map(sel).filter((x) => x != null && Number.isFinite(x)); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null; };
        /*
         * KASVU JAKSON YLI, EI RAAKA KESKIARVO (Pelikoodari 22.9.2026):
         * puskurikirjoitukset/uniformit/glViennit/jaot ovat LATAUKSESTA
         * ASTI kumulatiivisia laskureita (js/pallolauta/kehysprofiili.js
         * lue(), sama lähde kuin profiilinaytto.js:n profiiliTahti() —
         * ks. sen kasvu()). Näiden RAAKA-arvon ka() summaisi kasvavia
         * lukemia, ei mittaisi mitään todellista — sama virhe kuin
         * aiempi 'profiili'-lippu-anomalia, mutta laskennassa eikä
         * mittauksessa. Oikea luku on jakson kasvu jaettuna kehyksillä.
         */
        const kasvu = (sel) => {
          const eka = kehykset.find((k) => Number.isFinite(sel(k)));
          const vika = [...kehykset].reverse().find((k) => Number.isFinite(sel(k)));
          return eka && vika ? sel(vika) - sel(eka) : null;
        };
        const kasvuPerKehys = (sel) => { const k = kasvu(sel); return k != null && kehykset.length ? k / kehykset.length : null; };
        const yli20 = dts.filter((d) => d > 20).length;
        const tulos = {
          koe, moottori: navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') ? 'WebKit/Safari' : navigator.userAgent,
          dtP50: pct(dts, 0.5), dtP95: pct(dts, 0.95), dtMax: dts.length ? Math.max(...dts) : null,
          yli20msOsuus: dts.length ? yli20 / dts.length : null, kehyksia: dts.length,
          jsKa: ka((k) => k.js), renderKa: ka((k) => k.render), varattuKa: ka((k) => k.varattu),
          puskurikirjoituksiaKa: kasvuPerKehys((k) => k.puskurikirjoituksia), uniformejaKa: kasvuPerKehys((k) => k.uniformeja),
          glVienteja: kasvu((k) => k.glVienteja), jakojaKa: kasvuPerKehys((k) => k.jakoja),
          tasaisuus: v.tasaisuus,
        };
        kirjoita('valmis:\\n' + JSON.stringify(tulos, null, 1));
        laheta({ aika: new Date().toISOString(), ...tulos });
      })
      .catch((e) => {
        kirjoita('Virhe: ' + e.message);
        laheta({ aika: new Date().toISOString(), koe, virhe: e.message, virhePino: String(e.stack ?? '') });
      });
  }
</script>`;

const valitaAmpariin = async (req, res, polku) => {
  try {
    const otsakkeet = {};
    if (req.headers.range) otsakkeet.range = req.headers.range;
    const vastaus = await fetch(AMPARI + polku.replace(/^\/+/, ''), { headers: otsakkeet });
    if (!vastaus.ok && vastaus.status !== 206) { res.writeHead(vastaus.status, { 'content-type': 'text/plain' }); res.end(`ämpäri: ${vastaus.status}`); return; }
    const ulos = { 'content-type': vastaus.headers.get('content-type') ?? 'application/octet-stream', 'access-control-allow-origin': '*' };
    if (vastaus.headers.get('content-length')) ulos['content-length'] = vastaus.headers.get('content-length');
    if (vastaus.headers.get('content-range')) ulos['content-range'] = vastaus.headers.get('content-range');
    if (vastaus.headers.get('accept-ranges')) ulos['accept-ranges'] = vastaus.headers.get('accept-ranges');
    res.writeHead(vastaus.status, ulos);
    if (!vastaus.body || req.method === 'HEAD') { res.end(); return; }
    const virta = Readable.fromWeb(vastaus.body);
    virta.pipe(res); virta.on('error', () => res.destroy());
    res.on('close', () => { if (!res.writableFinished) virta.destroy(); });
  } catch (syy) { res.writeHead(502, { 'content-type': 'text/plain' }); res.end(`ämpäri ei vastaa: ${syy?.message ?? syy}`); }
};

const palveleTiedosto = (req, res, polku, origin) => {
  const suhteellinen = polku === '/' ? '/index.html' : polku;
  const tiedosto = normalize(join(JUURI, suhteellinen));
  if (!tiedosto.startsWith(JUURI)) { res.writeHead(403); res.end(); return; }
  if (suhteellinen === '/sw.js') { res.writeHead(200, { 'content-type': TYYPIT['.js'] }); res.end(SW_STUBI); return; }
  if (!existsSync(tiedosto) || statSync(tiedosto).isDirectory()) { res.writeHead(404); res.end('ei löydy'); return; }
  const paate = extname(tiedosto);
  const tyyppi = TYYPIT[paate] ?? 'application/octet-stream';
  if (suhteellinen === '/index.html') {
    const teksti = kirjoitaAmpari(readFileSync(tiedosto, 'utf8'), origin).replace('</body>', `${HARNESSI}\n</body>`);
    res.writeHead(200, { 'content-type': tyyppi, 'access-control-allow-origin': '*' }); res.end(teksti); return;
  }
  if (UUDELLEENKIRJOITETTAVAT.has(paate)) {
    const teksti = kirjoitaAmpari(readFileSync(tiedosto, 'utf8'), origin);
    res.writeHead(200, { 'content-type': tyyppi, 'access-control-allow-origin': '*' }); res.end(teksti); return;
  }
  const koko = statSync(tiedosto).size;
  res.writeHead(200, { 'content-type': tyyppi, 'content-length': koko, 'access-control-allow-origin': '*' });
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(tiedosto).pipe(res);
};

const palvelin = http.createServer((req, res) => {
  const origin = `http://${req.headers.host ?? `localhost:${PORTTI}`}`;
  const polku = (req.url ?? '/').split('?')[0];
  if (polku === '/__mittaus' && req.method === 'POST') {
    let data = ''; req.on('data', (c) => { data += c; });
    req.on('end', () => { console.log('MITTAUS:', data); appendFileSync(DATAPOLKU, data + '\n'); res.writeHead(200, { 'content-type': 'text/plain' }); res.end('ok'); });
    return;
  }
  if (polku.startsWith(AMPARIPOLKU)) { void valitaAmpariin(req, res, polku.slice(AMPARIPOLKU.length)); return; }
  palveleTiedosto(req, res, polku, origin);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  palvelin.listen(PORTTI, '0.0.0.0', async () => {
    console.log(`Piirtokoe-palvelin: ${JUURI}`);
    console.log(`Tulokset: ${DATAPOLKU}`);
    /*
     * EI 'profiili'-LIPPUA (kehysmäärä-anomalian juurisyy, Laitetestaaja
     * 22.9.2026): `?koe=profiili` asentaa js/pallolauta/profiilinaytto.js:n
     * rullaavan ruutunäytön, joka sulkee ja avaa saman globaalin
     * `__kehysprofiili`-singletonin uudestaan 3000 ms:n välein
     * (PROFIILIN_JAKSO_MS, lauta.js `luoProfiilinaytto`). Se kilpailee tämän
     * työkalun oman `__kehysprofiili.veto()`-kutsun aloita()/lopeta()-parista
     * samasta `tila`-muuttujasta, joten `lopeta()` palauttaakin ruutunäytön
     * senhetkisen ~3 s:n jakson kehykset, ei koko `kesto`:n mittaista otosta
     * (siksi kaikissa neljässä mittauksessa oli sama ~47 kehyksen otos
     * riippumatta `kesto`-parametrista). `asennaKehysprofiili()` (lauta.js)
     * asentuu MILLÄ TAHANSA `koe=`-arvolla (piirtokokeet().size riittää),
     * joten `mittaus` on tässä pelkkä placeholder-lippu kantaa vailla.
     */
    const LIPUT = [
      ['normaali', 'mittaus'],
      ['eipuskuri', 'eipuskuri'],
      ['dpr15', 'dpr15'],
      ['eivienti', 'eivienti'],
    ];
    for (const [nimi, koe] of LIPUT) {
      const url = `http://127.0.0.1:${PORTTI}/?lauta=pallo&dev=marseille&koe=${encodeURIComponent(koe)}&piirtokoe=1`;
      console.log(`\n=== ${nimi}: ${url} ===`);
      console.log('Avaa tämä osoite Macin Safarissa (open -a Safari), odota n. 13 s, sulje välilehti, jatka seuraavaan.');
    }
    console.log('\nCtrl-C lopettaa.');
  });
}

export { palvelin };
