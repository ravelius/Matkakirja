#!/usr/bin/env node
/*
 * KUUKAUSIKESKILÄMPÖ JA -SADEMÄÄRÄ -> js/packs/saatiedot.js kantarivit
 * (keskilampo[12], sade[12]). Täydentää tools/hae-saanormaalit.mjs:ää,
 * joka laskee ylimmän/alimman vain riveille, joilla keskilampo on
 * jo olemassa — tämä työkalu tekee sen ensimmäisen rivin.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-saaperusdata.mjs --tiedosto <polku.json>
 *
 * Syöte on JSON-taulukko [{ id, lat, lon }, ...] (lat/lon TODELLISET
 * koordinaatit, eivät laudan x/y-pikselit). Tuloste tulostetaan
 * stdouttiin valmiina js/packs/saatiedot.js-lohkoina (liitä käsin —
 * työkalu ei kirjoita pakettiin, koska kommenttilohkon sanamuoto ja
 * lahde-kentän tarve (ks. paketin otsikko) vaativat harkintaa).
 *
 * Menetelmä: kolme otosvuotta (1992, 2006, 2020) hajautettuna yli
 * normaalikauden 1991–2020, KOKO VUOSI per vuosi (ei 14 vrk kuten
 * hae-saanormaalit.mjs) — sademäärän kuukausisumma tarvitsee koko
 * kuukauden, toisin kuin lämmön vaihteluväli. Kolmen vuoden keskiarvo
 * per kuukausi. Lähde: Open-Meteon archive-api (ERA5).
 *
 * Kustannus: paikkoja × 2 muuttujaa × 365 vrk / 14 = "kutsuja" per
 * vuosipyyntö (Open-Meteon laskutusyksikkö). Viiden kaupungin erä
 * painaa noin 261 kutsua per vuosi, 783 kolmelta vuodelta — pysyy
 * reilusti minuutti- (600) ja tuntikatossa (5000). ÄLÄ kasvata
 * kerralla haettavien paikkojen määrää yli kymmeneen (yksi pyyntö ei
 * saa ylittää n. 520 kutsua, ettei se yksinään laukaisisi 429:ää).
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const OSOITE = 'https://archive-api.open-meteo.com/v1/archive';
const VUODET = [1992, 2006, 2020];

function valitsin(nimi) {
  const i = process.argv.indexOf('--' + nimi);
  return i < 0 ? null : process.argv[i + 1];
}

const tiedostoPolku = valitsin('tiedosto');
if (!tiedostoPolku) {
  process.stderr.write('kaytto: --tiedosto <polku.json>  ([{id,lat,lon}, ...])\n');
  process.exit(1);
}
const PAIKAT = JSON.parse(readFileSync(tiedostoPolku, 'utf8'));
if (PAIKAT.length > 10) {
  process.stderr.write(`liikaa paikkoja kerralla (${PAIKAT.length} > 10) — jaa pienempiin ajoihin\n`);
  process.exit(1);
}

async function haeVuosi(vuosi) {
  const osoite = `${OSOITE}?latitude=${PAIKAT.map((p) => p.lat).join(',')}`
    + `&longitude=${PAIKAT.map((p) => p.lon).join(',')}`
    + `&start_date=${vuosi}-01-01&end_date=${vuosi}-12-31`
    + '&daily=temperature_2m_mean,precipitation_sum&timezone=UTC';
  let jonotus = 0;
  let virheita = 0;
  for (;;) {
    let vastaus;
    try {
      vastaus = await fetch(osoite, { signal: AbortSignal.timeout(120000) });
    } catch (e) {
      virheita += 1;
      if (virheita >= 10) throw e;
      process.stderr.write(`  uusiksi (${virheita}): ${e.message}\n`);
      await new Promise((r) => setTimeout(r, 3000 * virheita));
      continue;
    }
    if (vastaus.status === 429) {
      jonotus += 1;
      if (jonotus > 10) throw new Error('kiintiö ei vapautunut');
      const odota = Math.min(300000, 30000 * jonotus);
      process.stderr.write(`  kiintiö täynnä, odotetaan ${Math.round(odota / 1000)} s\n`);
      await new Promise((r) => setTimeout(r, odota));
      continue;
    }
    if (!vastaus.ok) throw new Error('HTTP ' + vastaus.status);
    const raaka = await vastaus.json();
    return Array.isArray(raaka) ? raaka : [raaka];
  }
}

function kuukausittain(paivat, arvot) {
  const kk = Array.from({ length: 12 }, () => []);
  paivat.forEach((pvm, i) => {
    const kuukausi = Number(pvm.slice(5, 7)) - 1;
    if (Number.isFinite(arvot[i])) kk[kuukausi].push(arvot[i]);
  });
  return kk;
}

const keskilampoSummat = PAIKAT.map(() => Array.from({ length: 12 }, () => []));
const sadeSummat = PAIKAT.map(() => Array.from({ length: 12 }, () => 0));

for (const vuosi of VUODET) {
  process.stderr.write(`haetaan ${vuosi}...\n`);
  const data = await haeVuosi(vuosi);
  data.forEach((paikka, i) => {
    const lampoKk = kuukausittain(paikka.daily.time, paikka.daily.temperature_2m_mean);
    const sadeKk = kuukausittain(paikka.daily.time, paikka.daily.precipitation_sum);
    lampoKk.forEach((arvot, kk) => keskilampoSummat[i][kk].push(...arvot));
    sadeKk.forEach((arvot, kk) => {
      sadeSummat[i][kk] += arvot.reduce((a, b) => a + b, 0);
    });
  });
}

for (let i = 0; i < PAIKAT.length; i += 1) {
  const keskilampo = keskilampoSummat[i].map((arvot) => {
    const ka = arvot.reduce((a, b) => a + b, 0) / arvot.length;
    return Math.round(ka * 10) / 10;
  });
  const sade = sadeSummat[i].map((summa) => Math.round(summa / VUODET.length));
  console.log(`  ${PAIKAT[i].id}: { lat: ${PAIKAT[i].lat}, lon: ${PAIKAT[i].lon}, keskilampo: [${keskilampo.join(', ')}], sade: [${sade.join(', ')}] },`);
}
