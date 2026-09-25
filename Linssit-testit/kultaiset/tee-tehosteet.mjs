// Linssien tehosteäänten kultaiset näytteet verkkopelin omasta äänikoneesta (js/sound.js: SOUNDS.keksinto ja
// SOUNDS.vuosi → tone, hissNopea, knock). Selain (oletus Chromium) renderöi äänet OfflineAudioContextissa pelin oman
// Sound-luokan kautta; muutettu on vain kaksi asiaa, jotta C# voi verrata näyte näytteeltä:
//   - satunnaisheitto (sfx.jitter) pois: taajuudet ja voimakkuudet ovat reseptin luvut sellaisenaan
//   - kohinapuskuri täytetään xorshift32-sarjalla (siemen alla), sama kuin natiivin Linssit/Ydin/Aanet/Synteesi.Kohina
// Mitattava signaali on tehosteväylä (sfx.bus) ennen kuivaa haaraa (0,82), kaikua, masteria (0,24) ja kompressoria.
// Tiedostot luetaan gitistä (oletus origin/main), joten työpuun tila ei vaikuta.
//
// SELAIMEN RENDERÖINTIJAKSO (mitattu 26.9.2026, Chromium ja WebKit): kilahduksen oktaavisävel alkaa 10 ms myöhässä
// (delay 0.01), ja sen taajuus (setValueAtTime) tulee voimaan vasta seuraavan 128 näytteen renderöintijakson alussa:
// jakson loppu soi oskillaattorin oletustaajuudella 440 Hz (48 kHz: 32 näytettä ≈ 0,67 ms, taso ~1e-4 eli −80 dB),
// ja koko oktaavi jää siksi vakiovaiheeseen. WebKit aloittaa sävelen näytettä myöhemmin (481). Natiivi soittaa
// oktaavin puhtaana alusta (vaihe-ero ei kuulu), joten testi vertaa kilahdusta näyte näytteeltä vain ennen oktaavia
// (0–10 ms) ja koko kestolta 2 ms:n RMS-verhona. Naksahdus täsmää kummassakin selaimessa näyte näytteeltä.
//
// Käyttö: PLAYWRIGHT_JS=…/playwright/index.js [SELAIN=chromium|webkit] node Linssit-testit/kultaiset/tee-tehosteet.mjs
//         [pelin git-juuri] [ref]
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const REF = process.argv[3] ?? 'origin/main';
const TAAJUUS = 48000;
const SIEMEN = 0x2545f491;
const PORTTI = Number(process.env.PORTTI ?? 8779);

const sivu = '<!doctype html><meta charset="utf-8"><title>tehosteet</title>';
const palvelin = createServer((req, res) => {
  const polku = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
  if (!polku) { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(sivu); return; }
  try {
    const sisalto = execFileSync('git', ['-C', JUURI, 'show', `${REF}:${polku}`], { maxBuffer: 64 << 20 });
    res.writeHead(200, { 'content-type': extname(polku) === '.json' ? 'application/json' : 'text/javascript' });
    res.end(sisalto);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => palvelin.listen(PORTTI, '127.0.0.1', r));

const pw = await import(process.env.PLAYWRIGHT_JS ?? '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const SELAIN = process.env.SELAIN ?? 'chromium';
const moottori = pw[SELAIN] ?? pw.default?.[SELAIN];
const selain = await moottori.launch(SELAIN === 'chromium' ? { args: ['--autoplay-policy=no-user-gesture-required'] } : {});
const s = await selain.newPage();
// Ämpärin äänitteitä (loadRealSamples) ei tarvita: synteesi ei käytä niitä.
await s.route(/media\.matkakirja\.app|r2\.dev/, (r) => r.abort());
await s.goto(`http://127.0.0.1:${PORTTI}/`);

const tulos = await s.evaluate(async ({ taajuus, siemen }) => {
  let x = siemen >>> 0;
  const kohina = () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5; x >>>= 0;
    return (x / 4294967296) * 2 - 1;
  };
  const renderoi = async (nimi, sekuntia) => {
    const ctx = new OfflineAudioContext(1, Math.round(sekuntia * taajuus), taajuus);
    window.AudioContext = function AudioContext() { return ctx; };
    const { sfx } = await import(`/js/sound.js?${nimi}`);
    sfx.enabled = true;
    sfx.jitter = (arvo) => arvo;
    sfx.ensureContext();
    x = siemen >>> 0;
    const d = sfx.noise.getChannelData(0);
    for (let i = 0; i < d.length; i += 1) d[i] = kohina();
    // Väylä suoraan ulos: kuiva/märkä-haarat ja master irti.
    sfx.bus.disconnect();
    sfx.master.disconnect();
    sfx.bus.connect(ctx.destination);
    sfx.play(nimi);
    const puskuri = await ctx.startRendering();
    return Array.from(puskuri.getChannelData(0));
  };
  x = siemen >>> 0;
  const ensimmaiset = [kohina(), kohina(), kohina(), kohina()].map((v) => Math.fround(v));
  return {
    ensimmaiset,
    keksinto: await renderoi('keksinto', 0.5),
    vuosi: await renderoi('vuosi', 0.1),
  };
}, { taajuus: TAAJUUS, siemen: SIEMEN });
await selain.close();
palvelin.close();

// Kokonaisluvuiksi (× 1e8): pienet arvot säilyvät, tiedosto pysyy pienenä.
const K = 1e8;
const kok = (a) => a.map((v) => Math.round(v * K));
const alku = 1920;   // 40 ms näyte näytteeltä (molempien sävelten nousu)
const ikkuna = 96;   // RMS-verho 2 ms:n ikkunoin koko kestolta
const keksintoPituus = Math.round(0.46 * TAAJUUS);
const rms = (a) => {
  const r = [];
  for (let i = 0; i + ikkuna <= a.length; i += ikkuna) {
    let s = 0;
    for (let j = i; j < i + ikkuna; j += 1) s += a[j] * a[j];
    r.push(Math.sqrt(s / ikkuna));
  }
  return r;
};
const ulos = {
  lahde: `${REF} js/sound.js, ${SELAIN}`,
  taajuus: TAAJUUS,
  siemen: SIEMEN,
  kerroin: K,
  kohina: tulos.ensimmaiset,
  keksinto: {
    pituus: keksintoPituus,
    alku: kok(tulos.keksinto.slice(0, alku)),
    ikkuna,
    rms: kok(rms(tulos.keksinto.slice(0, keksintoPituus))),
    hiljaaJalkeen: tulos.keksinto.slice(keksintoPituus).every((v) => v === 0),
  },
  vuosi: {
    pituus: Math.round(0.082 * TAAJUUS),
    // Kierrätetty suhinakanava soi tämänkin jälkeen tasolla 0,0001 (web hissNopea), joten loppua ei ole.
    naytteet: kok(tulos.vuosi.slice(0, Math.round(0.082 * TAAJUUS))),
  },
};
const huippu = (a) => a.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)), process.env.ULOS ?? 'tehosteet.json'), JSON.stringify(ulos));
console.log(`${process.env.ULOS ?? 'tehosteet.json'} (${SELAIN}): keksinto huippu ${huippu(tulos.keksinto).toFixed(5)}, `
  + `vuosi huippu ${huippu(tulos.vuosi).toFixed(5)}, kilahdus hiljaa lopun jälkeen ${ulos.keksinto.hiljaaJalkeen}`);
