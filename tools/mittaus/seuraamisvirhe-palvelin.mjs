#!/usr/bin/env node
/*
 * SEURAAMISVIRHE-PALVELIN (Laitetestaaja, 22.9.2026) — pysyvä työkalu
 * sulavuuskatsauksen kohdan 13 (docs/raportit/sulavuus-katsaus-20260922.md:
 * "kamera kirjoitetaan joka tapahtumasta, ei kerran kehyksessä") mittaamiseen
 * ja Pelikoodarin korjauksen todentamiseen. Katso myös
 * docs/raportit/seuraamisvirhe-v2106-20260922.md (ensimmäinen ajo, jonka
 * pohjalta tämä työkalu kirjoitettiin).
 *
 * MIKÄ TÄMÄ MITTAA. Peli avataan lähiverkon/localhostin palvelimelta (sama
 * CORS-temppu kuin tools/laitepalvelin.mjs: ämpäri media.matkakirja.app
 * välitetään /ampari/-polusta, jotta WebGL-tekstuurit eivät hylkäänny).
 * Sivulle asennetaan tilapäinen mittausharnessi (injektoidaan index.html:ään
 * PALVELIMEN TOIMESTA, EI committoituna tiedostoon), joka:
 *
 *   1. Poistaa saapumiskortin/aloitusverhon automaattisesti (jotta koko
 *      kartta on vapaana), siirtää kameran mittauspisteeseen.
 *   2. Kuuntelee (EI dispatchaa) oikeat pointerdown/move/up-tapahtumat
 *      kartan kotelolta (.pallo-kotelo) aikaleimoineen — vain AITO OS-
 *      tason hiiri/sormi kelpaa, ei Playwright/CGEvent-synteettinen syöte
 *      (ks. avoin kohta alla, miksi CGEvent ei kelpaa tähän).
 *   3. Lukee kameran ruutukoordinaatin (getScreenCoords) kiinteästä lat/lng-
 *      pisteestä joka rAF-kehyksellä ja laskee SEURAAMISVIRHEEN: kameran
 *      siirtymä / osoittimen siirtymä samassa aikaikkunassa (ihanne 1,0).
 *   4. POSTaa jokaisen kierroksen tuloksen /__mittaus-polkuun, joka
 *      kirjoittaa rivin suoraan docs/raportit/data/-kansioon (EI /tmp:hen —
 *      omistajan sääntö 22.9.2026 klo 16.34: Mac kaatui ja /tmp tyhjeni,
 *      ensimmäisen ajon raakadata menetettiin).
 *
 * MIKSI AITO SYÖTE ON PAKOLLINEN. CGEventPost (macOS:n synteettinen HID-
 * tapahtuma) ei tässä ympäristössä vaikuttanut mihinkään — testattu sekä
 * omalla napilla että Safarin natiivilla sivupalkkinapilla, kumpikaan ei
 * reagoinut vaikka komento palautti onnistuneesti (ks. seuraamisvirhe-
 * raportin Menetelmä-osio). Playwrightin dispatchEvent/CDP-syöte taas ei
 * kelpaa, koska juuri sen synteettisyyttä epäiltiin syyksi liian siistille
 * tulokselle. Ainoa luotettava reitti on omistajan oma käsi TÄLLÄ työkalulla
 * avatussa oikeassa Safarissa/Chromessa.
 *
 * KÄYTTÖ:
 *   node tools/mittaus/seuraamisvirhe-palvelin.mjs [--portti 8794]
 *       [--kierroksia 8] [--kesto 2200] [--lat 46.5] [--lng 2.5] [--alt 0.2]
 *       [--dev marseille] [--koe mittaus] [--tiedosto <nimi>]
 *
 *   Avaa laitteella/selaimessa tulostettu osoite, esim.
 *     http://127.0.0.1:8794/?lauta=pallo&dev=marseille&koe=mittaus&luonnollinen=1
 *   ja vedä hiirellä/sormella kartalla jatkuvasti koko tallennusikkunan ajan
 *   (kierroksia × (kesto + 400 ms), tallennus alkaa itsestään ~8–9 s
 *   sivun latauksesta). Sama uudestaan toisella selaimella/moottorilla.
 *
 * TARKISTUS (jälkikäteen, ei vaadi palvelinta):
 *   node tools/mittaus/seuraamisvirhe-palvelin.mjs --tarkista <tiedosto.jsonl>
 *       [--p10 0.7] [--p90 1.4]
 *   Tulostaa PASS/FAIL per kierros ja kokonaisuutena hyväksymisrajaa vasten
 *   (omistajan/Fablen raja 22.9.2026: p10 > 0,7 JA p90 < 1,4 sekä Safarissa
 *   että Chromessa — nykyinen perustaso, ENNEN Pelikoodarin interpolointi-
 *   korjausta, on p10 = 0 kaikissa kierroksissa kummallakin moottorilla).
 *
 * AVOIN: mittauspiste ja dev-kaupunki on oletuksena Ranska/Marseille;
 * Camarguen z8-pisteelle aja `--lat 43.55 --lng 4.5 --alt 0.05`.
 */
import http from 'node:http';
import os from 'node:os';
import { createReadStream, existsSync, readFileSync, statSync, appendFileSync, mkdirSync } from 'node:fs';
import { extname, join, normalize, resolve, sep, dirname } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const AMPARI = 'https://media.matkakirja.app/';
const AMPARIPOLKU = '/ampari/';

const argv = process.argv.slice(2);
const arg = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : oletus;
};

// --- TARKISTUSTILA: lue jsonl ja vertaa hyväksymisrajaan, ei palvelinta ---
if (argv.includes('--tarkista')) {
  const polku = arg('tarkista');
  const p10Raja = Number(arg('p10', '0.7'));
  const p90Raja = Number(arg('p90', '1.4'));
  const rivit = readFileSync(polku, 'utf8').split('\n').filter(Boolean).map((r) => JSON.parse(r));
  const p = (x, n = 2) => (Number.isFinite(x) ? x.toFixed(n) : '—');
  let virheita = 0;
  for (const d of rivit) {
    const ua = d.ua ?? '';
    const moottori = ua.includes('Chrome') ? 'Chromium' : (ua.includes('Safari') ? 'WebKit' : ua);
    const s = d.seuranta ?? {};
    const ok = (s.suhdeP10 ?? -1) > p10Raja && (s.suhdeP90 ?? Infinity) < p90Raja;
    if (!ok) virheita += 1;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${moottori} kierros ${d.kierros}: p10 ${p(s.suhdeP10)} (> ${p10Raja}?) p90 ${p(s.suhdeP90)} (< ${p90Raja}?)`);
  }
  console.log(virheita === 0 ? `\nKAIKKI ${rivit.length} KIERROSTA HYVÄKSYTTY (p10 > ${p10Raja}, p90 < ${p90Raja}).` : `\n${virheita}/${rivit.length} kierrosta EI täytä hyväksymisrajaa.`);
  process.exit(virheita === 0 ? 0 : 1);
}

// --- PALVELINTILA ---
const PORTTI = Number(arg('portti', '8794'));
const KIERROKSIA = Number(arg('kierroksia', '8'));
const KESTO = Number(arg('kesto', '2200'));
const LAT = arg('lat', '46.5');
const LNG = arg('lng', '2.5');
const ALT = arg('alt', '0.2');
const DEV = arg('dev', 'marseille');
const KOE = arg('koe', 'mittaus');
const TIEDOSTO = arg('tiedosto', `seuraamisvirhe-${new Date().toISOString().slice(0, 10)}.jsonl`);
const DATAKANSIO = join(JUURI, 'docs', 'raportit', 'data');
const DATAPOLKU = join(DATAKANSIO, TIEDOSTO);
mkdirSync(DATAKANSIO, { recursive: true });

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const SW_STUBI = "self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',(e)=>{e.waitUntil((async()=>{for(const c of await caches.keys())await caches.delete(c);await self.registration.unregister();for(const cl of await self.clients.matchAll())cl.navigate(cl.url);})());});";

const HARNESSI = `
<script type="module">
  // SEURAAMISVIRHE-HARNESSI (injektoitu palvelimelta, ei tiedostossa).
  if (new URLSearchParams(location.search).get('luonnollinen') === '1') {
    const KIERROKSIA = ${KIERROKSIA}; const KESTO = ${KESTO};
    const VIITE = { lat: ${LAT}, lng: ${LNG} }; const ALTITUDE = ${ALT};
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
    const kohde = document.querySelector('.pallo-kotelo') ?? window.matkakirja?.ui?.pallonInstanssi?.renderer?.()?.domElement ?? document.body;
    let osoitin = []; let pointerdownT = null;
    const kirjaaOsoitin = (e) => { if (e.type === 'pointerdown') pointerdownT = e.timeStamp; osoitin.push({ t: e.timeStamp, x: e.clientX, y: e.clientY, tyyppi: e.type }); };
    kohde.addEventListener('pointerdown', kirjaaOsoitin, { passive: true });
    kohde.addEventListener('pointermove', kirjaaOsoitin, { passive: true });
    kohde.addEventListener('pointerup', kirjaaOsoitin, { passive: true });
    const osoitinKohdassa = (t) => { let viim = osoitin[0] ?? null; for (const s of osoitin) { if (s.t <= t) viim = s; else break; } return viim; };
    const seurantaVirhe = (kamera) => {
      if (osoitin.length < 2) return null;
      const rivit = [];
      for (let i = 1; i < kamera.length; i += 1) {
        const a = kamera[i - 1]; const b = kamera[i];
        const camD = (a.x != null && b.x != null) ? Math.hypot(b.x - a.x, b.y - a.y) : NaN;
        const pa = osoitinKohdassa(a.t); const pb = osoitinKohdassa(b.t);
        const ptrD = (pa && pb) ? Math.hypot(pb.x - pa.x, pb.y - pa.y) : NaN;
        rivit.push({ t: Math.round(b.t), camD: Number.isFinite(camD) ? +camD.toFixed(2) : null, ptrD: Number.isFinite(ptrD) ? +ptrD.toFixed(2) : null, suhde: (ptrD > 0.5 && Number.isFinite(camD)) ? +(camD / ptrD).toFixed(2) : null, pysahdys: ptrD > 2 && camD < 0.25 });
      }
      return rivit;
    };
    const ajaKierros = () => new Promise((valmis) => {
      const pallo = window.matkakirja.ui.pallonInstanssi;
      const kamera = []; osoitin = []; pointerdownT = null;
      const kp = window.__kehysprofiili;
      kp.aloita();
      const alku = performance.now();
      const askel = () => {
        const nyt = pallo.getScreenCoords(VIITE.lat, VIITE.lng);
        kamera.push({ t: performance.now(), x: nyt ? nyt.x : null, y: nyt ? nyt.y : null });
        if (performance.now() - alku < KESTO) requestAnimationFrame(askel); else loppu();
      };
      const loppu = () => {
        const tulos = kp.lopeta();
        const rivit = seurantaVirhe(kamera) ?? [];
        const kehykset = tulos.kehykset.map((k, i) => ({ ...k, siirtyma: kamera[i + 1] && kamera[i] && kamera[i + 1].x != null && kamera[i].x != null ? Math.hypot(kamera[i + 1].x - kamera[i].x, kamera[i + 1].y - kamera[i].y) : NaN }));
        const tas = kp.tasaisuus({ kehykset });
        const prof = kp.tiivista(tulos);
        const suhteet = rivit.map((r) => r.suhde).filter((v) => v != null).sort((a, b) => a - b);
        const pct = (arr, q) => arr.length ? arr[Math.min(arr.length - 1, Math.floor(q * (arr.length - 1)))] : null;
        const pysahdyksiaSeuranta = rivit.filter((r) => r.pysahdys).length;
        const alkuIndeksi = pointerdownT != null ? rivit.findIndex((r) => r.t >= pointerdownT) : -1;
        const alku10 = alkuIndeksi >= 0 ? rivit.slice(alkuIndeksi, alkuIndeksi + 10) : rivit.slice(0, 10);
        valmis({ tas, prof, seuranta: { suhdeMed: pct(suhteet, 0.5), suhdeP10: pct(suhteet, 0.1), suhdeP90: pct(suhteet, 0.9), pysahdyksiaSeuranta, rivitaKpl: rivit.length, alku10, osoitinKpl: osoitin.length } });
      };
      requestAnimationFrame(askel);
    });
    const aja = async () => {
      poistaVerho();
      const moottori = navigator.userAgent.includes('Chrome') ? 'Chromium' : (navigator.userAgent.includes('Safari') ? 'WebKit/Safari' : navigator.userAgent);
      for (let i = 0; i < KIERROKSIA; i += 1) {
        poistaVerho();
        kirjoita(\`\${moottori}: tallennetaan kierros \${i + 1}/\${KIERROKSIA}...\`);
        const { tas, prof, seuranta } = await ajaKierros();
        const teksti = \`\${moottori} kierros \${i + 1}/\${KIERROKSIA}\n\`
          + \`px/ms-vaihtelu \${tas ? Math.round((tas.nopeusVaihtelu ?? 0) * 100) : '—'} %, pysähdyksiä \${tas?.pysahdyksia ?? '—'}/\${tas?.kehyksia ?? '—'}, dt p95 \${tas?.dtP95?.toFixed(1) ?? '—'}\n\`
          + \`kehys med \${prof.mediaani?.toFixed(1)} p95 \${prof.p95?.toFixed(1)} max \${prof.max?.toFixed(1)} ms, >25ms: \${prof.yli25}/\${prof.kehyksia}\n\`
          + \`seuranta: suhde med \${seuranta.suhdeMed ?? '—'} (p10 \${seuranta.suhdeP10 ?? '—'}, p90 \${seuranta.suhdeP90 ?? '—'}), pysähdyksiä \${seuranta.pysahdyksiaSeuranta}/\${seuranta.rivitaKpl}\`;
        kirjoita(teksti);
        laheta({ aika: new Date().toISOString(), ua: navigator.userAgent, kierros: i + 1, tasaisuus: tas, profiili: prof, seuranta });
        await new Promise((r) => setTimeout(r, 400));
      }
      kirjoita(\`\${moottori}: KAIKKI \${KIERROKSIA} KIERROSTA VALMIIT.\`);
    };
    const ohitusAjastin = setInterval(() => {
      const ui = window.matkakirja?.ui;
      const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
      if (n) n.click();
      poistaVerho();
    }, 150);
    odota(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili))
      .then(() => new Promise((r) => setTimeout(r, 2500)))
      .then(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }))
      .then(() => new Promise((r) => setTimeout(r, 1000)))
      .then(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: VIITE.lat, lng: VIITE.lng, altitude: ALTITUDE }, 0))
      .then(() => new Promise((r) => setTimeout(r, 1000)))
      .then(() => { clearInterval(ohitusAjastin); poistaVerho(); })
      .then(() => kirjoita('valmis — tallennus alkaa 3 s kuluttua, vedä hiirellä/sormella pallosta koko ajan'))
      .then(() => new Promise((r) => setTimeout(r, 3000)))
      .then(() => aja())
      .catch((e) => kirjoita('Virhe: ' + e.message));
  }
</script>`;

const AMPARIVALITTAJA = (polku) => {
  const url = AMPARI + polku.replace(/^\/+/, '');
  return url;
};

const valitaAmpariin = async (req, res, polku) => {
  try {
    const otsakkeet = {};
    if (req.headers.range) otsakkeet.range = req.headers.range;
    const vastaus = await fetch(AMPARIVALITTAJA(polku), { headers: otsakkeet });
    if (!vastaus.ok && vastaus.status !== 206) {
      res.writeHead(vastaus.status, { 'content-type': 'text/plain' });
      res.end(`ämpäri: ${vastaus.status}`);
      return;
    }
    const ulos = { 'content-type': vastaus.headers.get('content-type') ?? 'application/octet-stream', 'access-control-allow-origin': '*' };
    if (vastaus.headers.get('content-length')) ulos['content-length'] = vastaus.headers.get('content-length');
    if (vastaus.headers.get('content-range')) ulos['content-range'] = vastaus.headers.get('content-range');
    if (vastaus.headers.get('accept-ranges')) ulos['accept-ranges'] = vastaus.headers.get('accept-ranges');
    res.writeHead(vastaus.status, ulos);
    if (!vastaus.body || req.method === 'HEAD') { res.end(); return; }
    const virta = Readable.fromWeb(vastaus.body);
    virta.pipe(res);
    virta.on('error', () => res.destroy());
    res.on('close', () => { if (!res.writableFinished) virta.destroy(); });
  } catch (syy) {
    res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`ämpäri ei vastaa: ${syy?.message ?? syy}`);
  }
};

/** Tiedostot, joissa ämpärin osoite kirjoitetaan omaksi poluksi (sama
 * temppu kuin tools/laitepalvelin.mjs:ssä — muuten WebKit hylkää ristiin
 * originin ämpäristä haetut WebGL-tekstuurit ja äänet CORSin nojalla). */
const UUDELLEENKIRJOITETTAVAT = new Set(['.js', '.mjs', '.html', '.css', '.json', '.webmanifest']);
const kirjoitaAmpari = (teksti, origin) => teksti.split(AMPARI).join(`${origin}${AMPARIPOLKU}`);

const palveleTiedosto = (req, res, polku, origin) => {
  const suhteellinen = polku === '/' ? '/index.html' : polku;
  const tiedosto = normalize(join(JUURI, suhteellinen));
  if (!tiedosto.startsWith(JUURI)) { res.writeHead(403); res.end(); return; }
  if (suhteellinen === '/sw.js') {
    res.writeHead(200, { 'content-type': TYYPIT['.js'] });
    res.end(SW_STUBI);
    return;
  }
  if (!existsSync(tiedosto) || statSync(tiedosto).isDirectory()) { res.writeHead(404); res.end('ei löydy'); return; }
  const paate = extname(tiedosto);
  const tyyppi = TYYPIT[paate] ?? 'application/octet-stream';
  if (suhteellinen === '/index.html') {
    const teksti = kirjoitaAmpari(readFileSync(tiedosto, 'utf8'), origin).replace('</body>', `${HARNESSI}\n</body>`);
    res.writeHead(200, { 'content-type': tyyppi, 'access-control-allow-origin': '*' });
    res.end(teksti);
    return;
  }
  if (UUDELLEENKIRJOITETTAVAT.has(paate)) {
    const teksti = kirjoitaAmpari(readFileSync(tiedosto, 'utf8'), origin);
    res.writeHead(200, { 'content-type': tyyppi, 'access-control-allow-origin': '*' });
    res.end(teksti);
    return;
  }
  const koko = statSync(tiedosto).size;
  res.writeHead(200, { 'content-type': tyyppi, 'content-length': koko, 'access-control-allow-origin': '*' });
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(tiedosto).pipe(res);
};

process.on('uncaughtException', (syy) => console.warn(`seuraamisvirhe-palvelin: karannut virhe — ${syy?.code ?? syy?.message ?? syy}`));
process.on('unhandledRejection', (syy) => console.warn(`seuraamisvirhe-palvelin: karannut lupaus — ${syy?.code ?? syy?.message ?? syy}`));

const palvelin = http.createServer((req, res) => {
  const origin = `http://${req.headers.host ?? `localhost:${PORTTI}`}`;
  const polku = (req.url ?? '/').split('?')[0];
  if (polku === '/__mittaus' && req.method === 'POST') {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => {
      console.log('MITTAUS:', data.slice(0, 200), '...');
      appendFileSync(DATAPOLKU, data + '\n');
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('ok');
    });
    return;
  }
  if (polku.startsWith(AMPARIPOLKU)) { void valitaAmpariin(req, res, polku.slice(AMPARIPOLKU.length)); return; }
  palveleTiedosto(req, res, polku, origin);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  palvelin.listen(PORTTI, '0.0.0.0', () => {
    const osoitteet = Object.values(os.networkInterfaces()).flat()
      .filter((v) => v && v.family === 'IPv4' && !v.internal).map((v) => v.address);
    console.log(`Seuraamisvirhe-palvelin: ${JUURI}`);
    for (const ip of [...osoitteet, '127.0.0.1']) {
      console.log(`  http://${ip}:${PORTTI}/?lauta=pallo&dev=${DEV}&koe=${KOE}&luonnollinen=1`);
    }
    console.log(`Tulokset: ${DATAPOLKU}`);
    console.log(`Tarkistus: node tools/mittaus/seuraamisvirhe-palvelin.mjs --tarkista ${DATAPOLKU}`);
    console.log('Ämpäri välitetään polusta /ampari/ (media.matkakirja.app). Ctrl-C lopettaa.');
  });
}

export { palvelin };
