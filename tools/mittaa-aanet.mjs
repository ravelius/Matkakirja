/*
 * Mittaa taustaäänten kuultu voimakkuus ja laskee niille tasaiset
 * voima-kertoimet.
 *
 *   node tools/mittaa-aanet.mjs [--kirjoita] [--tavoite -23]
 *
 * Omistajan havainto 2.8.2026: "Toiset tausta-äänet ovat aika hiljaisia
 * ja toiset taas häiritsevät liikaa puhetta." Syy on yksinkertainen:
 * js/aani-ehdokkaat.js:n `#voima=`-kertoimet on asetettu korvakuulolta
 * yksi kerrallaan, eikä korva muista edellistä äänitettä. Kertoimissa on
 * nyt 0.3:n ja 3:n välillä kymmenkertainen ero, mutta ne eivät vastaa
 * äänitteiden omia eroja.
 *
 * --- miksi selain eikä ffmpeg ---
 *
 * Tämä ajetaan Chromiumissa Playwrightilla: äänite haetaan ämpäristä,
 * puretaan decodeAudioDatalla ja mitataan. Se on TÄSMÄLLEEN sama polku,
 * jolla peli äänen soittaa, joten mitattu luku vastaa sitä mitä pelaaja
 * kuulee. (Playwrightin mukana tuleva ffmpeg on riisuttu build, jossa ei
 * ole mp3-dekooderia eikä loudness-suodattimia lainkaan.)
 *
 * --- miksi K-painotus eikä pelkkä RMS ---
 *
 * Korva ei kuule bassoa yhtä voimakkaana kuin keskiääniä. Taustaäänissä
 * on sekä matalaa jyminää (meri, tuuli, juna) että kirkasta hälyä (tori,
 * linnut, basaari). Pelkkä RMS antaisi merelle ja tuulelle liian ison
 * lukeman ja ne jäisivät pelissä liian hiljaisiksi — juuri se vika, joka
 * on tarkoitus korjata.
 *
 * Siksi mitataan ITU-R BS.1770:n tapaan: signaali ajetaan ensin
 * K-painotuksen läpi (ylähyllykorotus ~1500 Hz ja ylipäästö ~38 Hz) ja
 * vasta sitten lasketaan tehollisarvo 400 ms:n lohkoissa. Hiljaiset
 * lohkot portitetaan pois, ettei äänitteen alussa oleva tauko vetäisi
 * lukemaa alas.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// Playwright tuodaan vasta ajossa (alempana), jottei sitä tarvita
// pelkkien laskufunktioiden käyttöön — tests/aanitasot.test.mjs tuo
// tämän tiedoston eikä selainta ole testiajossa saatavilla.

/*
 * Konttiympäristössä Noden fetch ei lue HTTPS_PROXYa ilman
 * NODE_USE_ENV_PROXY=1 (sama pätkä kuin hae-satelliittikartat.mjs).
 * Ilman tätä jokainen lataus kaatui hiljaa "ei latautunut" -riville
 * (havaittu 15.8.2026, kun mittaus ajettiin kontista).
 *
 * Vartija ohitetaan testiajossa: tests/aanitasot.test.mjs tuo tämän
 * tiedoston moduulina, eikä tuonti saa käynnistää prosessia uudelleen.
 */
if (process.argv[1] === fileURLToPath(import.meta.url)
  && !process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arvo = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  return i >= 0 ? argv[i + 1] : oletus;
};
const KIRJOITA = argv.includes('--kirjoita');
const SELAIN = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';

/*
 * Tavoitetaso (LUFS). Taustaäänen kuuluu jäädä selvästi kertojan alle:
 * se on tunnelmaa, ei sisältöä.
 *
 * -33 LUFS on noin 10 dB tavallisen puhemiksauksen (-23) alapuolella.
 *
 * Portaat: -30 (ensimmäinen arvio) → -33 → -36 → takaisin -33.
 * Viimeinen nosto on omistajan päätös kuuntelun jälkeen: "voit nostaa
 * kolme desibeliä takaisin, ilmeisesti kompressointi ja muut hiljensivät
 * sen verran jo muutenkin". Havainto on oikea — kompressointi laskee
 * huippuja ja kertojan väistö hoitaa puhehetket, joten sama luku
 * kuulostaa nyt hiljaisemmalta kuin ennen niitä. Tämä on koko taustakerroksen ainoa säädin: yksi luku
 * tässä ja mittaus uudestaan, niin kaikki 124 äänitettä siirtyvät
 * yhdessä eivätkä keskinäiset suhteet muutu.
 */
const TAVOITE = Number(arvo('--tavoite', -33));

/*
 * Kertoimen ylärajan sanelee soitinketju, ei maku. Taustaääni soi
 * tasolla `VOIMA * voima` (js/ambience-stream.js), jossa VOIMA on 0.14,
 * ja HTML-soittimen volume ei voi ylittää ykköstä. Kerroin yli 7,1 siis
 * vain leikkautuisi pois — 6 jättää varaa eikä lupaa mitään, mitä ketju
 * ei pysty toteuttamaan.
 *
 * Alaraja on maun asia: alle 0,15 on niin hiljaista, ettei äänitettä
 * kannata soittaa lainkaan.
 *
 * Äänite, joka ei yllä tavoitteeseen ylärajallakaan, on parempi VAIHTAA
 * kuin vahvistaa: sen oma kohina nousisi kuuluviin ennen sisältöä.
 */
const VOIMA_MIN = 0.15;
const VOIMA_MAX = 6;

/** Kaikki ehdokasosoitteet lähdetiedostosta, säätöineen. */
export function keraaOsoitteet(lahde) {
  const rivit = [...lahde.matchAll(/'(https:\/\/[^']+\.mp3(?:#[^']*)?)'/g)];
  const ulos = new Map();
  for (const [, kokonainen] of rivit) {
    const risu = kokonainen.indexOf('#');
    const url = risu < 0 ? kokonainen : kokonainen.slice(0, risu);
    const osat = risu < 0 ? {} : Object.fromEntries(
      kokonainen.slice(risu + 1).split('&').map((p) => p.split('=')).filter((p) => p.length === 2),
    );
    // Sama osoite esiintyy tiedostossa useasti: oletuskorissa säätöineen
    // ja ehdokaslistoissa usein ilman. Mittaus koskee äänitettä, joten se
    // tehdään kerran — mutta nykyiseksi kertoimeksi otetaan se, joka on
    // oikeasti asetettu, ei se joka sattuu olemaan tiedostossa ensin.
    const voima = Number(osat.voima) || null;
    const nyt = ulos.get(url);
    if (!nyt) {
      ulos.set(url, {
        url, voima: voima ?? 1, asetettu: voima != null, esiintymat: 1,
      });
    } else {
      nyt.esiintymat += 1;
      if (voima != null && !nyt.asetettu) { nyt.voima = voima; nyt.asetettu = true; }
    }
  }
  return [...ulos.values()];
}

/**
 * Mittausfunktio, joka ajetaan selaimessa. Palauttaa LUFS-arvion.
 *
 * Tämä on oikea funktio eikä merkkijono: Playwright sarjallistaa
 * funktion lähdekoodin ja kutsuu sitä argumentilla, mutta merkkijonon se
 * vain evaluoi lausekkeena eikä välitä argumenttia lainkaan.
 *
 * Selaimen globaalit (fetch, OfflineAudioContext) eivät ole Nodessa
 * olemassa, mutta se ei haittaa — tätä ei ajeta täällä.
 */
/* eslint-disable no-undef */
const MITTAA_SELAIMESSA = async (base64) => {
  // Tavut tulevat Nodesta base64:na eikä selaimen fetchillä: ämpärin
  // CORS-sääntö sallii vain pelin oman osoitteen, joten mittaussivu ei
  // saisi tiedostoa haettua. Nodea CORS ei koske.
  const binaari = atob(base64);
  const tavut = new Uint8Array(binaari.length);
  for (let i = 0; i < binaari.length; i++) tavut[i] = binaari.charCodeAt(i);

  // Puretaan kerran, jotta saadaan kesto ja näytetaajuus.
  const purku = new OfflineAudioContext(1, 1, 48000);
  let raaka;
  try { raaka = await purku.decodeAudioData(tavut.buffer); }
  catch (e) { return { virhe: 'purku ei onnistunut: ' + e.message }; }

  // K-painotus BS.1770:n tapaan: ylähyllykorotus ja ylipäästö.
  const ctx = new OfflineAudioContext(1, raaka.length, raaka.sampleRate);
  const lahde = ctx.createBufferSource();
  lahde.buffer = raaka;
  const hylly = ctx.createBiquadFilter();
  hylly.type = 'highshelf';
  hylly.frequency.value = 1500;
  hylly.gain.value = 4;
  const ylipaasto = ctx.createBiquadFilter();
  ylipaasto.type = 'highpass';
  ylipaasto.frequency.value = 38;
  ylipaasto.Q.value = 0.5;
  lahde.connect(hylly).connect(ylipaasto).connect(ctx.destination);
  lahde.start();
  const painotettu = await ctx.startRendering();

  const data = painotettu.getChannelData(0);
  const lohko = Math.round(painotettu.sampleRate * 0.4);
  const tehot = [];
  for (let i = 0; i + lohko <= data.length; i += lohko) {
    let summa = 0;
    for (let j = i; j < i + lohko; j++) summa += data[j] * data[j];
    tehot.push(summa / lohko);
  }
  if (!tehot.length) return { virhe: 'liian lyhyt' };

  const lufs = (teho) => -0.691 + 10 * Math.log10(Math.max(teho, 1e-12));

  // Absoluuttinen portti -70 LUFS, sitten suhteellinen portti -10 LU.
  const yliAbsoluuttisen = tehot.filter((t) => lufs(t) > -70);
  if (!yliAbsoluuttisen.length) return { virhe: 'kauttaaltaan hiljainen' };
  const keskiarvo = (l) => l.reduce((s, x) => s + x, 0) / l.length;
  const alustava = lufs(keskiarvo(yliAbsoluuttisen));
  const portti = alustava - 10;
  const lopulliset = yliAbsoluuttisen.filter((t) => lufs(t) > portti);
  const integroitu = lufs(keskiarvo(lopulliset.length ? lopulliset : yliAbsoluuttisen));

  // Huippuarvo kertoo, kestääkö äänite vahvistusta ilman säröä.
  let huippu = 0;
  const alkuperainen = raaka.getChannelData(0);
  for (let i = 0; i < alkuperainen.length; i++) {
    const a = Math.abs(alkuperainen[i]);
    if (a > huippu) huippu = a;
  }

  return {
    lufs: Number(integroitu.toFixed(2)),
    huippuDb: Number((20 * Math.log10(Math.max(huippu, 1e-9))).toFixed(2)),
    kesto: Number(raaka.duration.toFixed(1)),
  };
};
/* eslint-enable no-undef */

/** Pyöristää kertoimen siihen tarkkuuteen, jolla se tiedostoon kirjoitetaan. */
export function pyorista(voima) {
  return Number(Math.min(VOIMA_MAX, Math.max(VOIMA_MIN, voima)).toFixed(2));
}

/** Kerroin, joka vie mitatun tason tavoitteeseen. */
export function voimaTasolle(lufs, tavoite = TAVOITE) {
  return pyorista(10 ** ((tavoite - lufs) / 20));
}

// --- ajo ---------------------------------------------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
  const polku = join(JUURI, 'js/aani-ehdokkaat.js');
  const lahde = readFileSync(polku, 'utf8');
  const osoitteet = keraaOsoitteet(lahde);
  console.log(`äänitteitä: ${osoitteet.length}, tavoite ${TAVOITE} LUFS\n`);

  const { aaniOsoite } = await import('../js/media.js');
  // Playwright voi olla asennettuna globaalisti eikä repon sisään.
  // ESM ei katso NODE_PATHia, joten varareittinä on suora polku, jonka
  // voi antaa myös ympäristömuuttujalla.
  // Suoraan polusta tuotuna Playwright on CommonJS-paketti, jolloin
  // kaikki on default-avaimen takana; nimettynä pakettina se purkautuu
  // suoraan. Kelpuutetaan kumpikin muoto.
  const paketti = await import('playwright')
    .catch(() => import(process.env.PLAYWRIGHT_JS
      ?? '/opt/node22/lib/node_modules/playwright/index.js'));
  const chromium = paketti.chromium ?? paketti.default?.chromium;
  if (!chromium) throw new Error('Playwrightia ei löydy; anna polku PLAYWRIGHT_JS-muuttujassa');
  const selain = await chromium.launch({ executablePath: SELAIN });
  const sivu = await (await selain.newContext()).newPage();
  // Tyhjä sivu ämpärin alkuperästä ei ole tarpeen: fetch menee CORSin
  // läpi, koska ämpäri sallii GETin — ja epäonnistuessa kokeillaan
  // alkuperäistä lähdettä kuten pelikin tekee.
  await sivu.goto('about:blank');

  /** Hakee tavut peilistä ja putoaa alkuperäiseen lähteeseen kuten pelikin. */
  const hae = async (url) => {
    for (const osoite of [aaniOsoite(url), url]) {
      const vastaus = await fetch(osoite).catch(() => null);
      if (vastaus?.ok) return Buffer.from(await vastaus.arrayBuffer()).toString('base64');
    }
    return null;
  };

  const tulokset = [];
  for (const [i, o] of osoitteet.entries()) {
    const base64 = await hae(o.url);
    const mittaus = base64
      ? await sivu.evaluate(MITTAA_SELAIMESSA, base64)
      : { virhe: 'ei latautunut' };
    const nimi = o.url.split('/').pop().slice(0, 28);
    if (mittaus.virhe) {
      console.log(`${String(i + 1).padStart(3)}/${osoitteet.length} ${nimi.padEnd(30)} ${mittaus.virhe}`);
      tulokset.push({ ...o, ...mittaus });
      continue;
    }
    const uusi = voimaTasolle(mittaus.lufs);
    const merkki = Math.abs(uusi - o.voima) >= 0.3 ? ' <-- muuttuu' : '';
    console.log(`${String(i + 1).padStart(3)}/${osoitteet.length} ${nimi.padEnd(30)}`
      + ` ${String(mittaus.lufs).padStart(7)} LUFS  huippu ${String(mittaus.huippuDb).padStart(6)} dB`
      + `  voima ${String(o.voima).padStart(4)} -> ${String(uusi).padStart(4)}${merkki}`);
    tulokset.push({ ...o, ...mittaus, uusiVoima: uusi });
  }
  await selain.close();

  const mitatut = tulokset.filter((t) => t.lufs != null);
  const tasot = mitatut.map((t) => t.lufs).sort((a, b) => a - b);
  console.log(`\nmitattu ${mitatut.length}/${osoitteet.length}`);
  if (tasot.length) {
    console.log(`ennen: ${tasot[0].toFixed(1)} … ${tasot[tasot.length - 1].toFixed(1)} LUFS`
      + `  (hajonta ${(tasot[tasot.length - 1] - tasot[0]).toFixed(1)} dB)`);
    // Kertoimen jälkeen jäävä hajonta: rajoihin osuneet eivät yllä perille.
    const jaljella = mitatut.map((t) => t.lufs + 20 * Math.log10(t.uusiVoima));
    const min = Math.min(...jaljella); const max = Math.max(...jaljella);
    console.log(`jälkeen: ${min.toFixed(1)} … ${max.toFixed(1)} LUFS`
      + `  (hajonta ${(max - min).toFixed(1)} dB)`);
  }

  writeFileSync(
    join(JUURI, 'tools/aanitasot.json'),
    `${JSON.stringify({ tavoite: TAVOITE, mitattu: tulokset }, null, 2)}\n`,
  );
  console.log('mittaukset: tools/aanitasot.json');

  if (KIRJOITA) {
    let uusi = lahde;
    let muutettu = 0;
    for (const t of mitatut) {
      // Korvataan tämän osoitteen kaikki esiintymät säätöineen.
      const pako = t.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      uusi = uusi.replace(new RegExp(`'${pako}(#[^']*)?'`, 'g'), (_, hanta) => {
        const osat = Object.fromEntries(
          (hanta ?? '').replace(/^#/, '').split('&').map((p) => p.split('='))
            .filter((p) => p.length === 2),
        );
        osat.voima = String(t.uusiVoima);
        // alku säilyy: se on omistajan valitsema kohta äänitteestä eikä
        // liity voimakkuuteen mitenkään.
        const jarjestys = ['alku', 'voima'].filter((k) => osat[k] != null && osat[k] !== '');
        muutettu += 1;
        return `'${t.url}#${jarjestys.map((k) => `${k}=${osat[k]}`).join('&')}'`;
      });
    }
    writeFileSync(polku, uusi);
    console.log(`kirjoitettu js/aani-ehdokkaat.js — ${muutettu} kohtaa`);
  } else {
    console.log('\n(ei kirjoitettu; --kirjoita tekee muutokset)');
  }
}
