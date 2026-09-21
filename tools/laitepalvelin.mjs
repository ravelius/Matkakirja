#!/usr/bin/env node
/*
 * LAITEPALVELIN — pelin kehitysversio iPadille ja iPhonelle samasta
 * lähiverkosta (Laitetestaaja, 21.9.2026).
 *
 * MIKSI PELKKÄ http.server EI RIITÄ. Pallon kirjasto, laatat, äänet ja
 * kuvat haetaan ämpäristä https://media.matkakirja.app/. Kun peli
 * avataan lokaalista originista (http://<mac>:8791), WebKit hylkää
 * ämpärin WebGL-tekstuurit CORS-sääntöjen nojalla HILJAA — ei
 * virhetapahtumaa — jolloin three-globe ei koskaan ilmoita palloa
 * valmiiksi (waitForGlobeReady): pallon juuri jää visible=false, WebGL
 * ei piirrä palloa eikä CSS2DRenderer liitä yhtään merkkiä DOMiin.
 * Mitattu iPad Pro 11" 21.9.2026 (docs/raportit/laitemittaus-sulavuus-
 * 20260921-e2.md; js/pallolauta/lauta.js tila().pallonJuuri.nakyva).
 * Chromium-savukkeet eivät näe tätä, koska Playwright reitittää ämpärin
 * Noden kautta.
 *
 * MITÄ TÄMÄ TEKEE. Sama temppu kuin savukkeissa, mutta laitteelle:
 *   1. palvelee repon tiedostot 0.0.0.0:<portti>ssa;
 *   2. kirjoittaa palveltaviin .js/.html/.css-tiedostoihin ämpärin
 *      osoitteen tilalle oman /ampari/-polkunsa (sama origin → ei
 *      CORSia);
 *   3. välittää /ampari/<polku> -pyynnöt ämpäriin (Range-otsake ja
 *      206 kulkevat läpi äänille) ja lisää access-control-allow-origin;
 *   4. palvelee sw.js:n tilalla itsensä purkavan stubin, jottei
 *      laitteelle aiemmin asennettu service worker tarjoile vanhaa
 *      kuorta tai ämpärin alkuperäisiä osoitteita.
 *
 * Aja repon juuressa:
 *   node tools/laitepalvelin.mjs [--portti 8791]
 * ja avaa laitteella tulostettu osoite, esim.
 *   http://192.168.1.20:8791/?lauta=pallo&dev=marseille
 * (kehittäjän pikatie, js/kehittaja-pikatie.js). Ei tuotantoon: ei
 * välimuistia, ei pakkausta, ei todennusta — vain lähiverkkoon.
 */
import http from 'node:http';
import os from 'node:os';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { Readable } from 'node:stream';

const JUURI = resolve(new URL('..', import.meta.url).pathname);
const AMPARI = 'https://media.matkakirja.app/';
const AMPARIPOLKU = '/ampari/';
const argv = process.argv.slice(2);
const porttiArg = argv.indexOf('--portti');
const PORTTI = porttiArg >= 0 ? Number(argv[porttiArg + 1]) : Number(process.env.PORTTI ?? 8791);

const TYYPIT = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
};
/** Tiedostot, joissa ämpärin osoite kirjoitetaan omaksi poluksi. */
const UUDELLEENKIRJOITETTAVAT = new Set(['.js', '.mjs', '.html', '.css', '.json', '.webmanifest']);
/** Service workerin stubi: purkaa itsensä ja vapauttaa sivut. */
const SW_STUBI = `self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.registration.unregister().then(() => self.clients.matchAll())
  .then((cs) => cs.forEach((c) => c.navigate?.(c.url)))));
`;

/** Ämpärin osoite tämän palvelimen omaksi poluksi (sama origin). */
export function kirjoitaAmpari(teksti, origin) {
  return teksti.split(AMPARI).join(`${origin}${AMPARIPOLKU}`);
}

const yhteiset = { 'access-control-allow-origin': '*', 'cache-control': 'no-store' };

async function valitaAmpariin(req, res, polku) {
  const kohde = `${AMPARI}${polku}`;
  const otsakkeet = {};
  if (req.headers.range) otsakkeet.range = req.headers.range;
  let vastaus;
  try {
    vastaus = await fetch(kohde, { headers: otsakkeet });
  } catch (syy) {
    res.writeHead(502, yhteiset);
    res.end(`ämpäri ei vastaa: ${syy?.message ?? syy}`);
    return;
  }
  const ulos = { ...yhteiset };
  for (const nimi of ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']) {
    const arvo = vastaus.headers.get(nimi);
    if (arvo) ulos[nimi] = arvo;
  }
  res.writeHead(vastaus.status, ulos);
  if (!vastaus.body || req.method === 'HEAD') { res.end(); return; }
  Readable.fromWeb(vastaus.body).pipe(res);
}

function palveleTiedosto(req, res, polku, origin) {
  const suhteellinen = normalize(decodeURIComponent(polku)).replace(/^(\.\.[/\\])+/, '');
  let tiedosto = join(JUURI, suhteellinen === sep || suhteellinen === '/' ? 'index.html' : suhteellinen);
  if (!tiedosto.startsWith(JUURI)) { res.writeHead(403, yhteiset); res.end(); return; }
  if (existsSync(tiedosto) && statSync(tiedosto).isDirectory()) tiedosto = join(tiedosto, 'index.html');
  if (!existsSync(tiedosto)) { res.writeHead(404, yhteiset); res.end('ei löydy'); return; }
  const paate = extname(tiedosto).toLowerCase();
  const tyyppi = TYYPIT[paate] ?? 'application/octet-stream';
  if (suhteellinen.replace(/\\/g, '/') === '/sw.js') {
    res.writeHead(200, { ...yhteiset, 'content-type': TYYPIT['.js'] });
    res.end(SW_STUBI);
    return;
  }
  if (UUDELLEENKIRJOITETTAVAT.has(paate)) {
    const teksti = kirjoitaAmpari(readFileSync(tiedosto, 'utf8'), origin);
    res.writeHead(200, { ...yhteiset, 'content-type': tyyppi });
    res.end(teksti);
    return;
  }
  const koko = statSync(tiedosto).size;
  res.writeHead(200, { ...yhteiset, 'content-type': tyyppi, 'content-length': koko });
  if (req.method === 'HEAD') { res.end(); return; }
  createReadStream(tiedosto).pipe(res);
}

const palvelin = http.createServer((req, res) => {
  const origin = `http://${req.headers.host ?? `localhost:${PORTTI}`}`;
  const polku = (req.url ?? '/').split('?')[0];
  if (polku.startsWith(AMPARIPOLKU)) { void valitaAmpariin(req, res, polku.slice(AMPARIPOLKU.length)); return; }
  palveleTiedosto(req, res, polku, origin);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  palvelin.listen(PORTTI, '0.0.0.0', () => {
    const osoitteet = Object.values(os.networkInterfaces()).flat()
      .filter((v) => v && v.family === 'IPv4' && !v.internal).map((v) => v.address);
    console.log(`Laitepalvelin: ${JUURI}`);
    for (const ip of [...osoitteet, '127.0.0.1']) {
      console.log(`  http://${ip}:${PORTTI}/?lauta=pallo&dev=marseille`);
    }
    console.log('Ämpäri välitetään polusta /ampari/ (media.matkakirja.app). Ctrl-C lopettaa.');
  });
}

export { palvelin };
