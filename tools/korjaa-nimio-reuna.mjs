/*
 * NIMIÖIDEN REUNAKORJAUS — siirtää docs/raportit/nimiot-reunassa-
 * 20260920.md:n listaamat reunaan osuvat nimiöt sisäänpäin.
 *
 * MENETELMÄ: kohdemaan kartta avataan `?lauta=pallo`-tilassa
 * (`l.saavu()`), nimiön NYKYINEN ruutupiste luetaan
 * `l.nostot.osumat()`:sta ja sen laatikon ylitys mitataan jokaisessa
 * raportissa merkityssä ruutukoossa UUDELLEEN (vanha mitattu px-arvo
 * oli osoittautunut hieman kohinaiseksi ajojen välillä). Pahimmasta
 * ruutukoosta lasketaan tavoitepiste (nykyinen piste siirrettynä
 * ylityksen + turvamarginaalin verran sisäänpäin), ja se muunnetaan
 * takaisin lat/lng-koordinaatiksi globe.gl:n OMALLA käänteisprojektio-
 * funktiolla `pallo.toGlobeCoords(x, y)` — ei arvattua kaavaa. Uusi
 * lat/lng muunnetaan laudan yksiköiksi SAMALLA Millerin lieriö-
 * kaavalla, jolla data on alun perin tuotettu
 * (tools/johda-maastokohteet.mjs `laudat`).
 *
 * SOVELTAA VAIN js/packs/maastokohteet-*.js- ja maalehtinostot-*.js-
 * tyyppisiin `laudat.maailmankartta.{x,y}`-kenttiin. Yhdeksän löydöstä
 * (kolme monitulkintaista nimeä, kuusi risteysmaiden eläintäky-
 * merkkiä) on jätetty POIS tästä erästä — ks. raportin "Ei korjattu
 * tässä erässä" -osio.
 *
 * AJO: PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js \
 *   node tools/korjaa-nimio-reuna.mjs [--kuivaharjoitus]
 */
import http from 'node:http';
import {
  readFileSync, existsSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { laudat as miller } from './johda-maastokohteet.mjs';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;
const KUIVA = process.argv.includes('--kuivaharjoitus');

const resolved = JSON.parse(readFileSync('/tmp/resolved.json', 'utf8'));

const pack = packById('maailmankartta');
const cityCountry = pack.map?.cityCountry ?? {};
const kaupungitMaittain = {};
for (const c of pack.cities ?? []) {
  const iso = cityCountry[c.id];
  if (iso) (kaupungitMaittain[iso] ??= []).push(c);
}

const maittain = new Map();
for (const r of resolved) {
  if (!maittain.has(r.maa)) maittain.set(r.maa, []);
  maittain.get(r.maa).push(r);
}

/* --------------------------------------------------------- palvelin */

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {
    'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream',
    /* Tiedostot muuttuvat kesken ajon (korjaus kirjoittaa levylle) —
     * selain ei saa tarjoilla vanhaa moduulia välimuistista. */
    'cache-control': 'no-store',
  });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/* ----------------------------------------------------------- ämpäri */

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
  console.error('Ämpäri ei vastaa. Tarkista verkko.');
  palvelin.close();
  process.exit(2);
}

/* ---------------------------------------------------------- selain */

const selain = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const ctx = await selain.newContext({
  viewport: { width: 480, height: 854 }, deviceScaleFactor: 2, serviceWorkers: 'block', reducedMotion: 'reduce',
});
const sivu = await ctx.newPage();
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

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const NAKYMAT = {
  '480px': { width: 480, height: 854 },
  puhelin: { width: 390, height: 844 },
  'iPad-pysty': { width: 820, height: 1180 },
  'iPad-vaaka': { width: 1180, height: 820 },
};

const RAJA_PX = 4;
const MARGIN_PX = 24;

/** Nimiön laatikko ja ylitys nykyisessä ruutukoossa. */
const MITTAA_YKSI = (nimi) => sivu.evaluate(async (haettuNimi) => {
  const l = window.matkakirja.ui.pallolauta;
  const M = await import('/js/pallolauta/nostot.js');
  const osumat = l.nostot.osumat?.() ?? [];
  const o = osumat.find((x) => x.nimi === haettuNimi && x.nimioNakyy);
  if (!o) return null;
  const laatikko = o.poltettu ? M.nostonLaatikko(o.p, o) : (() => {
    const lappu = l.nostot.lappuLaatikot().find((r) => r.nimi === haettuNimi);
    return lappu ?? M.nostonLaatikko(o.p, o);
  })();
  const W = window.innerWidth;
  const H = window.innerHeight;
  const yli = {
    vasen: Math.max(0, -laatikko.x0),
    oikea: Math.max(0, laatikko.x1 - W),
    yla: Math.max(0, -laatikko.y0),
    ala: Math.max(0, laatikko.y1 - H),
  };
  return {
    px: o.p.x, py: o.p.y, W, H, yli, maxYli: Math.max(yli.vasen, yli.oikea, yli.yla, yli.ala),
  };
}, nimi);

const kaikkiTulokset = [];
const virheet = [];

for (const [iso, loydokset] of maittain) {
  const kaupunki = kaupungitMaittain[iso]?.[0];
  if (!kaupunki) { virheet.push(`${iso}: ei lautakaupunkia`); continue; }
  /* eslint-disable no-await-in-loop */
  try {
    await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.evaluate((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, tallenne(kaupunki.id));
    await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
    await sivu.waitForTimeout(3500);

    for (const loydos of loydokset) {
      /* Katso kaikki näkymät, joissa nimiö alun perin havaittiin
       * reunalla — pahin TUORE mittaus ratkaisee korjauksen. */
      let pahin = null;
      for (const nakymaNimi of loydos.nakymat) {
        const koko = NAKYMAT[nakymaNimi];
        if (!koko) continue;
        await sivu.setViewportSize(koko);
        await sivu.waitForTimeout(200);
        await sivu.evaluate(async () => {
          const l = window.matkakirja.ui.pallolauta;
          await l.saavu({ kesto: 0 });
          l.ladoHeti();
        });
        await sivu.waitForTimeout(300);
        const m = await MITTAA_YKSI(loydos.nimi);
        if (m && m.maxYli > RAJA_PX && (!pahin || m.maxYli > pahin.maxYli)) {
          pahin = { ...m, nakyma: nakymaNimi };
        }
      }
      if (!pahin) {
        console.log(`${iso} "${loydos.nimi}": ei toistunut tuoreessa mittauksessa, ohitetaan`);
        kaikkiTulokset.push({
          ...loydos, tila: 'ei-toistunut',
        });
        continue;
      }

      const kohdeX = pahin.px + (pahin.yli.vasen > RAJA_PX ? (pahin.yli.vasen + MARGIN_PX)
        : pahin.yli.oikea > RAJA_PX ? -(pahin.yli.oikea + MARGIN_PX) : 0);
      const kohdeY = pahin.py + (pahin.yli.yla > RAJA_PX ? (pahin.yli.yla + MARGIN_PX)
        : pahin.yli.ala > RAJA_PX ? -(pahin.yli.ala + MARGIN_PX) : 0);

      /* Varmista pahimman näkymän koko on yhä asetettuna. */
      await sivu.setViewportSize(NAKYMAT[pahin.nakyma]);
      await sivu.waitForTimeout(150);
      const uusiLatLng = await sivu.evaluate(({ x, y }) => {
        const g = window.matkakirja.ui.pallolauta.pallo;
        return g.toGlobeCoords(x, y);
      }, { x: kohdeX, y: kohdeY });

      if (!uusiLatLng) {
        console.log(`${iso} "${loydos.nimi}": tavoitepiste pallon ulkopuolella, ohitetaan`);
        kaikkiTulokset.push({ ...loydos, tila: 'pallon-ulkopuolella', pahin });
        continue;
      }

      const uusi = miller(uusiLatLng.lng, uusiLatLng.lat);
      const uusiLatPyor = Math.round(uusiLatLng.lat * 10000) / 10000;
      const uusiLonPyor = Math.round(uusiLatLng.lng * 10000) / 10000;

      /* Etsi kohta tiedostosta: (A) laudat.maailmankartta.{x,y} -kentät
       * (esikäsitelty Millerin lieriö, kirjoitetaan uusiksi samalla
       * kaavalla) tai (B) raaka lat/lon-pari (kirjoitetaan suoraan
       * uusi lat/lon). Ikkuna 80 riviä nimen jälkeen, koska osalla
       * kohteista on paljon kuvametatietoa nimen ja koordinaatin
       * välissä (esim. hahmotelma-*.js). */
      const polku = join(JUURI, 'js/packs', loydos.file);
      const sisalto = readFileSync(polku, 'utf8');
      const rivit = sisalto.split('\n');
      const nimiKentta = loydos.nimi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const nimiRe = new RegExp(`(nimi|nimio):\\s*'${nimiKentta}'`);
      let nimiIdx = -1;
      for (let i = 0; i < rivit.length; i += 1) {
        if (nimiRe.test(rivit[i])) { nimiIdx = i; break; }
      }
      if (nimiIdx === -1) {
        console.log(`${iso} "${loydos.nimi}": nimeä ei löytynyt tiedostosta ${loydos.file} kirjoitushetkellä`);
        kaikkiTulokset.push({ ...loydos, tila: 'nimea-ei-loytynyt' });
        continue;
      }
      const IKKUNA = 80;
      const koordRe = /maailmankartta:\s*\{\s*x:\s*(-?[\d.]+),\s*y:\s*(-?[\d.]+)\s*\}/;
      const latlonRe = /\b(lat|lon):\s*-?[\d.]+,\s*(lat|lon):\s*-?[\d.]+/;
      let koordIdx = -1;
      let tyyppi = null;
      for (let i = nimiIdx; i < Math.min(nimiIdx + IKKUNA, rivit.length); i += 1) {
        if (koordRe.test(rivit[i])) { koordIdx = i; tyyppi = 'A'; break; }
        if (latlonRe.test(rivit[i])) { koordIdx = i; tyyppi = 'B'; break; }
      }
      if (koordIdx === -1) {
        console.log(`${iso} "${loydos.nimi}": ei koordinaattikenttää tiedostossa ${loydos.file} (${IKKUNA} rivin ikkuna)`);
        kaikkiTulokset.push({ ...loydos, tila: 'koordinaattia-ei-loytynyt' });
        continue;
      }

      kaikkiTulokset.push({
        ...loydos, tila: 'korjattu', pahin, uusiLatLng, uusiXY: uusi, tyyppi,
      });

      if (!KUIVA) {
        if (tyyppi === 'A') {
          rivit[koordIdx] = rivit[koordIdx].replace(
            koordRe,
            `maailmankartta: { x: ${uusi.maailmankartta.x}, y: ${uusi.maailmankartta.y} }`,
          );
        } else {
          rivit[koordIdx] = rivit[koordIdx].replace(
            /\blat:\s*-?[\d.]+/, `lat: ${uusiLatPyor}`,
          ).replace(/\blon:\s*-?[\d.]+/, `lon: ${uusiLonPyor}`);
        }
        writeFileSync(polku, rivit.join('\n'));
      }

      console.log(`${iso} "${loydos.nimi}" [${loydos.file}] (${tyyppi}): yli ${Math.round(pahin.maxYli)}px `
        + `(${pahin.nakyma}) -> ${tyyppi === 'A' ? `maailmankartta ${uusi.maailmankartta.x}/${uusi.maailmankartta.y}` : `lat/lon ${uusiLatPyor}/${uusiLonPyor}`}`);
    }
  } catch (virhe) {
    console.log(`${iso} KAATUI — ${virhe.name}: ${String(virhe.message).split('\n')[0]}`);
    virheet.push(`${iso}: ${virhe.name}`);
  }
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();

writeFileSync('/tmp/korjaus-tulos.json', JSON.stringify(kaikkiTulokset, null, 1));
console.log('\n================ YHTEENVETO ================');
const tilat = {};
for (const t of kaikkiTulokset) tilat[t.tila] = (tilat[t.tila] ?? 0) + 1;
console.log(tilat);
if (virheet.length) console.log('Virheet:', virheet);
console.log(`Kuivaharjoitus: ${KUIVA}`);
