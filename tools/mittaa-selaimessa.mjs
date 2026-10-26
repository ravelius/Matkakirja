/*
 * Äänenvoimakkuuden mittaus selaimessa — yhteinen osa.
 *
 * Sekä tools/mittaa-aanet.mjs (nykyisten tasaus) että
 * tools/etsi-korvaajat.mjs (uusien haku) mittaavat samalla mittarilla.
 * Jos ne eriytyisivät, uudet ehdokkaat valittaisiin eri asteikolla kuin
 * millä vanhat on tasattu — ja koko tasaus menisi pilalle.
 *
 * Mittaus tehdään Chromiumissa `decodeAudioDatalla`, koska se on sama
 * polku, jolla peli äänen soittaa. Playwrightin mukana tuleva ffmpeg on
 * riisuttu build, jossa ei ole mp3-dekooderia eikä loudness-suodattimia.
 *
 * Taso lasketaan ITU-R BS.1770:n tapaan K-painotettuna: ylähyllykorotus
 * ~1500 Hz ja ylipäästö ~38 Hz, sitten portitettu tehollisarvo 400 ms:n
 * lohkoissa. Pelkkä RMS antaisi bassovoittoisille äänille (meri, tuuli)
 * liian ison lukeman, jolloin ne jäisivät pelissä liian hiljaisiksi.
 */
import { avaaChromium } from './selain.mjs';


/** Avaa selaimen mittausta varten. Palauttaa sivun ja sulkijan. */
export async function avaaSelain() {
  // Suoraan polusta tuotuna Playwright on CommonJS-paketti, jolloin
  // kaikki on default-avaimen takana; nimettynä pakettina se purkautuu
  // suoraan. Kelpuutetaan kumpikin muoto.
  const selain = await avaaChromium();
  const sivu = await (await selain.newContext()).newPage();
  await sivu.goto('about:blank');
  return { sivu, sulje: () => selain.close() };
}

/**
 * Mittausfunktio, joka ajetaan selaimessa.
 *
 * Tämä on oikea funktio eikä merkkijono: Playwright sarjallistaa
 * funktion lähdekoodin ja kutsuu sitä argumentilla, mutta merkkijonon se
 * vain evaluoi lausekkeena eikä välitä argumenttia lainkaan.
 */
/* eslint-disable no-undef */
export const MITTAA_SELAIMESSA = async (base64) => {
  // Tavut tulevat Nodesta base64:na eikä selaimen fetchillä: ämpärin
  // CORS-sääntö sallii vain pelin oman osoitteen, joten mittaussivu ei
  // saisi tiedostoa haettua. Nodea CORS ei koske.
  const binaari = atob(base64);
  const tavut = new Uint8Array(binaari.length);
  for (let i = 0; i < binaari.length; i++) tavut[i] = binaari.charCodeAt(i);

  const purku = new OfflineAudioContext(1, 1, 48000);
  let raaka;
  try { raaka = await purku.decodeAudioData(tavut.buffer); } catch (e) {
    return { virhe: `purku ei onnistunut: ${e.message}` };
  }

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

  /*
   * Sisäinen dynamiikka: kuinka paljon kovimmat kohdat nousevat yli
   * keskitason. Tämä on eri asia kuin äänitteiden välinen tasaus —
   * juuri tämä saa yksittäisen äänitteen hyppäämään kertojan päälle,
   * vaikka sen keskitaso olisi oikea. Iso luku tarkoittaa, että äänite
   * hyötyisi kompressoinnista tai on muuten levoton taustaksi.
   */
  const jarjestetty = [...lopulliset].sort((a, b) => a - b);
  const prosentti = (p) => lufs(jarjestetty[Math.min(jarjestetty.length - 1,
    Math.floor(jarjestetty.length * p))] ?? 0);
  const dynamiikka = Number((prosentti(0.95) - prosentti(0.1)).toFixed(1));

  // Huippuarvo kertoo, kestääkö äänite vahvistusta ilman säröä.
  let huippu = 0;
  const alkuperainen = raaka.getChannelData(0);
  for (let i = 0; i < alkuperainen.length; i++) {
    const a = Math.abs(alkuperainen[i]);
    if (a > huippu) huippu = a;
  }

  return {
    lufs: Number(integroitu.toFixed(2)),
    dynamiikka,
    huippuDb: Number((20 * Math.log10(Math.max(huippu, 1e-9))).toFixed(2)),
    kesto: Number(raaka.duration.toFixed(1)),
  };
};
/* eslint-enable no-undef */

/**
 * Hakee äänitteen tavut ja mittaa sen. Peili ensin, sitten alkuperäinen
 * lähde — sama varareitti kuin pelillä.
 */
export async function MITTAA(sivu, url, aaniOsoite = (u) => u) {
  for (const osoite of [aaniOsoite(url), url]) {
    const vastaus = await fetch(osoite).catch(() => null);
    if (!vastaus?.ok) continue;
    const base64 = Buffer.from(await vastaus.arrayBuffer()).toString('base64');
    return sivu.evaluate(MITTAA_SELAIMESSA, base64);
  }
  return { virhe: 'ei latautunut' };
}
