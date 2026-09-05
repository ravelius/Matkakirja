/*
 * TEHOSTEKETJUT — Web Audio -efektiketjut Tuna-kirjastolla.
 *
 * OMISTAJAN PÄÄTÖS 5.9.2026 (kirjastokartoituksen
 * docs/raportit/valmiit-palikat-2026-09-04.md TOP 6, järjestys
 * *"Tee 2. Ensin"* → *"Sitten 5. Sitten 6. Ja 3."*): kohta 5 on
 * Tuna 1.1.3 (MIT, DinahMoe AB & Oskar Eriksson) — *"megafoni kuulostaa
 * megafonilta, radiolinssin asema rätisee oikein, ja Livian ääni luolassa
 * saa luolan kaiun"* (kartoitus 5.1).
 *
 * ── MITÄ TÄMÄ ON ────────────────────────────────────────────────────
 *
 * Nimettyjä ketjuja, joita peli pyytää lähteen ja kuulijan väliin:
 *
 *   megafoni   kaistanpäästö ~300–3400 Hz + kevyt särö + pieni kaiku
 *   radio      kapea kaista + bitcrusher + kohina + hyvin kevyt tremolo
 *              (1870–1920-lukujen vastaanotin, ei rikkinäinen laite)
 *   puhelin    kaista 300–3000 Hz
 *   luola      pitkä kaiku (generoitu impulssi kuten js/sound.js:n oma
 *              reverb) + vaimea yläpää + lyhyt läpsy
 *   ulkoilma   lyhyt heijastus
 *
 * Ketju on { input, output, nimi, pura() }. Lähde kytketään inputiin ja
 * output on jo kytketty kutsujan antamaan päätteeseen. Sisällä on aina
 * KAKSI reittiä, kuiva ja märkä, ja niiden välillä 200 ms:n tasatehoinen
 * ristihäivytys: ketju alkaa kuivana ja liukuu märäksi, ja pura() liukuu
 * takaisin kuivaan ennen kuin efektisolmut irrotetaan. Näin ei napsahda
 * kumpaankaan suuntaan, eikä kesken puheen purettu ketju katkaise ääntä:
 * kuiva reitti jää paikalleen, kunnes lähteet ovat soineet loppuun.
 *
 * ── SÄÄNNÖT VALMIILLE KIRJASTOILLE (Raamattu 5.9.2026, "VALMIIT
 *    KIRJASTOT: STPAGEFLIP ENSIN") ───────────────────────────────────
 *
 *   1. Kirjasto tulee ämpärin vendor/-polusta (TUNA_KIRJASTO), ei
 *      reposta eikä CDN:stä tuotannossa.
 *   2. Laiska lataus ja virhehaara (lataaTuna): puuttuva kirjasto ei
 *      kaada mitään — tehosteketju() palauttaa null ja ääni kulkee
 *      suoraan kuten ennen.
 *   3. Lisenssiteksti on ämpärissä kirjaston rinnalla
 *      (vendor/tuna-1.1.3.LICENSE.txt) ja maininta lähdesivulla
 *      (js/lahteet.js).
 *   4. Reduced motion ei koske ääntä; pelin äänet pois -asetus koskee
 *      kaikkea kuten nyt (kutsujat kysyvät sen — tämä moduuli ei soita
 *      mitään itse, paitsi kehittäjän kuuntelunappi, joka kysyy sfx:ltä).
 *   6. Yhden tiedoston versio jää ilman kirjastoa: lataaTuna ei edes
 *      yritä, kun sivulla ei ole manifest-linkkiä (sama tunniste kuin
 *      js/main.js:n palvelutyöntekijän rekisteröinnillä).
 *
 * ── MIKSI KAKSI LATAUSTAPAA ─────────────────────────────────────────
 *
 * Ämpärin tiedosto on Tunan ES-moduulilähde (`export default function
 * Tuna`), ei UMD: npm-paketin `main` on dist/tuna.umd.cjs ja `module`
 * on tuna.js, ja vienti otti jälkimmäisen. ES-moduulia ei voi ladata
 * tavallisella <script>-elementillä (SyntaxError), ja moduulituonti
 * (import()) vaatii ämpäriltä CORS-luvan, joka on annettu vain
 * ravelius.github.io-alkuperälle (mitattu 5.9.2026: Access-Control-
 * Allow-Origin vastaa vain sille; localhost ei saa otsaketta). Siksi
 * järjestys on: import() ensin — se toimii julkaistussa pelissä ja
 * iOS-kuoressa (sama alkuperä) ja kelpaa myös UMD-tiedostolle, jonka
 * kääre kirjoittaa globalThis.Tunan — ja <script> varalla, jos ämpäriin
 * viedään myöhemmin UMD-versio ja tuonti ei jostain syystä onnistu.
 * Kummankin epäonnistuminen on virhehaara (null), ei virhe.
 *
 * ── MIKSI KAIKU EI OLE TUNAN CONVOLVER ──────────────────────────────
 *
 * Tunan Convolver hyväksyy impulssin VAIN osoitteena: sen buffer-
 * asettaja tekee XMLHttpRequestin ja dekoodaa vastauksen, eikä
 * valmista AudioBufferia voi antaa. Peli generoi impulssinsa itse
 * (js/sound.js makeImpulse: ei äänitiedostoa, offline toimii), joten
 * kaiku on ketjun sisällä natiivi ConvolverNode samalla impulssikaavalla
 * — Tunan solmut tekevät kaiun edessä ja perässä sen värin (Filter),
 * läpsyn (Delay) ja säröt (Overdrive, Bitcrusher, Tremolo).
 *
 * ── TUNAN GLOBAALI KONTEKSTI ────────────────────────────────────────
 *
 * Tuna pitää kontekstin moduulinlaajuisessa muuttujassa (userContext),
 * jonka `new Tuna(ctx)` asettaa. Peli käyttää KAHTA kontekstia —
 * tehosteet (js/sound.js sfx.ctx) ja lukijaääni (js/puhe.js piiri) —
 * joten Tuna-olio luodaan aina juuri ennen ketjun rakentamista ja ketju
 * rakennetaan synkronisesti loppuun. Toista AudioContextia tämä moduuli
 * ei luo koskaan: konteksti tulee aina kutsujalta.
 */

import { PEILI_JUURI } from './media.js';
import { sfx } from './sound.js';

/** Tuna 1.1.3 pelin ämpärissä (workflow vie-vendor). */
export const TUNA_KIRJASTO = `${PEILI_JUURI}vendor/tuna-1.1.3.js`;

/** Ketjujen nimet siinä järjestyksessä, jossa kuuntelunappi soittaa ne. */
export const TEHOSTEKETJUT = Object.freeze(['megafoni', 'radio', 'puhelin', 'luola', 'ulkoilma']);

/** Ristihäivytys ketjuun ja ketjusta pois — ei napsahdusta. */
export const KETJUN_HAIVYTYS_S = 0.2;

/** Kohteen akustiikka, joka tunnistetaan datasta (js/packs/fokuskohteet-*.js `akustiikka`). */
export const AKUSTIIKAT = Object.freeze(['luola', 'ulkoilma']);

/*
 * null = ei vielä yritetty, muuten lupaus, joka ratkeaa Tunaan tai
 * nulliin (ei koskaan hylkäydy). Epäonnistunut yritys nollaa lupauksen,
 * jotta seuraava tarve yrittää uudestaan — verkko voi palata.
 */
let tunaLupaus = null;
let tunaNyt = null;

/** Onko sivu yhden tiedoston versio (ei manifest-linkkiä, ks. js/main.js). */
function yhdenTiedostonVersio(doc) {
  if (!doc || typeof doc.querySelector !== 'function') return false;
  try {
    return !doc.querySelector('link[rel="manifest"]');
  } catch {
    return false;
  }
}

/** Lataa kirjaston <script>-elementillä (UMD-varapolku); ratkeaa Tunaan tai nulliin. */
function lataaSkriptina(doc) {
  return new Promise((ok) => {
    let s;
    try {
      s = doc.createElement('script');
    } catch {
      ok(null);
      return;
    }
    s.src = TUNA_KIRJASTO;
    s.async = true;
    s.addEventListener('load', () => ok(globalThis.Tuna ?? null));
    s.addEventListener('error', () => ok(null));
    try {
      doc.head.appendChild(s);
    } catch {
      ok(null);
    }
  });
}

/**
 * Lataa Tunan kerran (memoized). Palauttaa lupauksen Tuna-rakentimeen
 * tai nulliin — EI koskaan hylkäydy, koska puuttuva kirjasto on
 * hyväksytty tila (offline, yhden tiedoston versio, vanha selain).
 *
 * @param {object} [asetukset]
 * @param {Document|null} [asetukset.doc]   sivu; puuttuessa ei ladata
 * @param {(url: string) => Promise<any>} [asetukset.tuo]  moduulituoja
 *        (testit antavat oman; oletus on selaimen import())
 */
export function lataaTuna({ doc = globalThis.document ?? null, tuo = null } = {}) {
  if (tunaNyt) return Promise.resolve(tunaNyt);
  if (typeof globalThis.Tuna === 'function') {
    tunaNyt = globalThis.Tuna;
    return Promise.resolve(tunaNyt);
  }
  if (tunaLupaus) return tunaLupaus;
  if (!doc || yhdenTiedostonVersio(doc)) return Promise.resolve(null);
  const tuoja = tuo ?? ((url) => import(/* webpackIgnore: true */ url));
  tunaLupaus = Promise.resolve()
    .then(() => tuoja(TUNA_KIRJASTO))
    .then((m) => (typeof m?.default === 'function' ? m.default : null) ?? globalThis.Tuna ?? null)
    .catch(() => null)
    .then((Tuna) => (Tuna ? Tuna : lataaSkriptina(doc)))
    .then((Tuna) => {
      tunaNyt = typeof Tuna === 'function' ? Tuna : null;
      if (!tunaNyt) tunaLupaus = null;
      return tunaNyt;
    });
  return tunaLupaus;
}

/** Tuna-rakennin, jos kirjasto on jo ladattu; muuten null (ei lataa). */
export function tunaValmis() {
  if (tunaNyt) return tunaNyt;
  if (typeof globalThis.Tuna === 'function') tunaNyt = globalThis.Tuna;
  return tunaNyt;
}

/** Testejä varten: unohtaa ladatun kirjaston. */
export function unohdaTuna() {
  tunaNyt = null;
  tunaLupaus = null;
}

/*
 * ── AKUSTIIKKA: MISSÄ PUHUJA SEISOO ─────────────────────────────────
 *
 * Kohdekortti asettaa tilan avautuessaan (js/fokuskohteet.js
 * avaaFokuskohde: kohteen `akustiikka`-kenttä) ja nollaa sen
 * sulkeutuessaan. Lukijaääni (js/puhe.js luoPuheSoitin) kysyy tilan
 * jokaista palaa aikatauluttaessaan — niin Livian vastaus ja kertojan
 * luenta kuuluvat luolasta, kun luolan kortti on auki, ja palaavat
 * kuiviksi, kun kortti sulkeutuu. Tila on moduulitasolla eikä
 * parametrina, jotta lukijan ja lehden koodiin ei tarvitse koskea:
 * puhe.js on ainoa, joka lukee sen.
 *
 * Asettaminen käynnistää kirjaston latauksen heti, jotta se on
 * paikalla, kun pelaaja napauttaa kaiutinta tai kysyy Livialta.
 */
let akustiikkaNyt = null;

/** Asettaa (tai nollaa, null) puhujan akustiikan. Tuntematon nimi = null. */
export function asetaAkustiikka(nimi) {
  akustiikkaNyt = AKUSTIIKAT.includes(nimi) ? nimi : null;
  if (akustiikkaNyt) lataaTuna();
  return akustiikkaNyt;
}

/** Puhujan akustiikka juuri nyt: ketjun nimi tai null. */
export function akustiikka() {
  return akustiikkaNyt;
}

/**
 * Kaiun impulssivaste: eksponentiaalisesti vaimeneva kohinapulssi —
 * sama kaava kuin js/sound.js makeImpulse, mutta jyrkkyys on säädettävä:
 * luolan häntä vaimenee loivemmin (pitkä), ulkoilman heijastus jyrkästi.
 */
export function ketjunImpulssi(ctx, sekuntia, jyrkkyys = 3.2, arvonta = Math.random) {
  const rate = ctx.sampleRate || 44100;
  const frames = Math.max(1, Math.floor(rate * sekuntia));
  const buf = ctx.createBuffer(2, frames, rate);
  for (let ch = 0; ch < 2; ch += 1) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < frames; i += 1) {
      data[i] = (arvonta() * 2 - 1) * (1 - i / frames) ** jyrkkyys;
    }
  }
  return buf;
}

/** Sekunnin valkoinen kohina radion rätinää varten. */
function kohinaPuskuri(ctx, arvonta = Math.random) {
  const rate = ctx.sampleRate || 44100;
  const buf = ctx.createBuffer(1, rate, rate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = arvonta() * 2 - 1;
  return buf;
}

/* ---------------------------------------------------------------- */
/* Reseptit                                                          */
/* ---------------------------------------------------------------- */

/**
 * Apurit reseptien kirjoittamiseen. Jokainen palauttaa {input, output}
 * -parin natiiveina solmuina, joten kytkentä on aina
 * `edellinen.output.connect(seuraava.input)` riippumatta siitä, onko
 * solmu Tunan vai selaimen oma. Tunan solmuilla on juuri nämä kentät.
 *
 * Solmun rakennus on try/catchissa: jos jokin Tunan solmu ei synny
 * (esim. ScriptProcessor puuttuu), efekti jää ketjusta pois ja loput
 * soivat — kelvollinen ääni ilman yhtä väriä on parempi kuin ei ääntä.
 */
function suodatin(tuna, ctx, tyyppi, taajuus, Q = 0.9) {
  try {
    return new tuna.Filter({ frequency: taajuus, Q, gain: 0, filterType: tyyppi, bypass: false });
  } catch {
    const f = ctx.createBiquadFilter();
    f.type = tyyppi;
    f.frequency.value = taajuus;
    f.Q.value = Q;
    return { input: f, output: f };
  }
}

function tunaSolmu(rakenna) {
  try {
    return rakenna();
  } catch {
    return null;
  }
}

/** Rinnakkainen kaiku: kuiva ohi, märkä konvoluution läpi, molemmat ulos. */
function kaiku(ctx, { sekuntia, jyrkkyys, marka, kuiva, ylaraja = null }) {
  const sisaan = ctx.createGain();
  const ulos = ctx.createGain();
  const conv = ctx.createConvolver();
  conv.buffer = ketjunImpulssi(ctx, sekuntia, jyrkkyys);
  const wet = ctx.createGain();
  wet.gain.value = marka;
  const dry = ctx.createGain();
  dry.gain.value = kuiva;
  sisaan.connect(dry).connect(ulos);
  if (ylaraja) {
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = ylaraja;
    sisaan.connect(lp).connect(conv);
  } else {
    sisaan.connect(conv);
  }
  conv.connect(wet).connect(ulos);
  return { input: sisaan, output: ulos, solmut: [sisaan, ulos, conv, wet, dry] };
}

/**
 * Ketjureseptit: nimi → (tuna, ctx) → { vaiheet: [{input, output}],
 * lisat: [{solmu, kohde}], lahteet: [BufferSource] }. `vaiheet`
 * kytketään sarjaan, `lisat` summataan märkään ulostuloon (radion
 * kohina), `lahteet` käynnistetään heti ja pysäytetään purussa.
 */
const KETJURESEPTIT = {
  megafoni: (tuna, ctx) => ({
    vaiheet: [
      suodatin(tuna, ctx, 'highpass', 300, 0.9),
      suodatin(tuna, ctx, 'lowpass', 3400, 1.1),
      // Kevyt särö: torvi soi kovaa, ja kalvo leikkaa huiput. drive on
      // Tunan asteikolla 0–1 ja outputGain desibeleinä (−46…0).
      tunaSolmu(() => new tuna.Overdrive({
        outputGain: -7, drive: 0.32, curveAmount: 0.55, algorithmIndex: 0, bypass: false,
      })),
      // Pieni kaiku: torven oma kotelo ja katos, ei sali.
      kaiku(ctx, { sekuntia: 0.32, jyrkkyys: 3.6, marka: 0.16, kuiva: 1 }),
    ].filter(Boolean),
  }),
  radio: (tuna, ctx) => {
    const kohina = ctx.createBufferSource();
    kohina.buffer = kohinaPuskuri(ctx);
    kohina.loop = true;
    const kohinanKaista = ctx.createBiquadFilter();
    kohinanKaista.type = 'bandpass';
    kohinanKaista.frequency.value = 1800;
    kohinanKaista.Q.value = 0.5;
    const kohinanVoima = ctx.createGain();
    // Hyvin hiljainen: rätinä on kaistan takana, ei sen päällä.
    kohinanVoima.gain.value = 0.012;
    kohina.connect(kohinanKaista).connect(kohinanVoima);
    return {
      vaiheet: [
        suodatin(tuna, ctx, 'highpass', 420, 1.0),
        suodatin(tuna, ctx, 'lowpass', 2600, 1.2),
        // Karkea näytteistys: 7 bittiä ja noin kolmasosa näytteenotosta —
        // vanhan vastaanottimen rakeisuus, ei rikkinäinen laite (4 bittiä
        // olisi sitä).
        tunaSolmu(() => new tuna.Bitcrusher({ bits: 7, normfreq: 0.36, bufferSize: 4096, bypass: false })),
        // Hyvin kevyt huojunta: kaukainen asema hengittää.
        tunaSolmu(() => new tuna.Tremolo({ intensity: 0.1, rate: 3.2, stereoPhase: 0, bypass: false })),
      ].filter(Boolean),
      lisat: [{ solmu: kohinanVoima }],
      lahteet: [kohina],
    };
  },
  puhelin: (tuna, ctx) => ({
    vaiheet: [
      suodatin(tuna, ctx, 'highpass', 300, 1.2),
      suodatin(tuna, ctx, 'lowpass', 3000, 1.2),
    ],
  }),
  luola: (tuna, ctx) => ({
    vaiheet: [
      // Lyhyt läpsy seinästä ennen pitkää häntää: Tunan Delay sarjassa
      // kaiun edellä (kuiva 1 + läpsy 0,28), ja koko märkä reitti summautuu
      // ketjun omaan kuivaan reittiin ristihäivytyksen mukaan.
      tunaSolmu(() => new tuna.Delay({
        delayTime: 95, feedback: 0.2, cutoff: 3200, wetLevel: 0.28, dryLevel: 1, bypass: false,
      })),
      // Pitkä häntä, loiva vaimeneminen; kivi syö yläpään.
      kaiku(ctx, { sekuntia: 3.2, jyrkkyys: 2.2, marka: 0.5, kuiva: 0.72, ylaraja: 4200 }),
    ].filter(Boolean),
  }),
  ulkoilma: (tuna, ctx) => ({
    vaiheet: [
      // Lyhyt heijastus maasta ja lähiseinistä, ei hännän häntää.
      kaiku(ctx, { sekuntia: 0.28, jyrkkyys: 4.5, marka: 0.14, kuiva: 1 }),
    ],
  }),
};

/**
 * Rakentaa nimetyn ketjun annettuun kontekstiin ja kytkee sen ulostulon
 * päätteeseen. Palauttaa null, jos nimeä ei ole, kirjasto ei ole ladattu
 * (ks. lataaTuna / tunaValmis) tai rakennus epäonnistuu — silloin
 * kutsuja kytkee lähteensä suoraan päätteeseen kuten ennen.
 *
 * @param {BaseAudioContext} ctx   pelin oma konteksti (sfx.ctx tai puhe.js piiri)
 * @param {string} nimi            TEHOSTEKETJUT-nimi
 * @param {AudioNode} paate        mihin ketjun ulostulo kytketään
 * @param {object} [asetukset]
 * @param {Function} [asetukset.Tuna]  rakennin (testit); oletus tunaValmis()
 */
export function tehosteketju(ctx, nimi, paate, { Tuna = null } = {}) {
  const resepti = KETJURESEPTIT[nimi];
  const Rakennin = Tuna ?? tunaValmis();
  if (!resepti || !ctx || !paate || typeof Rakennin !== 'function') return null;
  let osat;
  let tuna;
  try {
    // Tuna sitoo kontekstin moduulimuuttujaan: olio luodaan aina tähän
    // kontekstiin juuri ennen rakennusta (ks. otsakkeen selitys).
    tuna = new Rakennin(ctx);
    osat = resepti(tuna, ctx);
  } catch {
    return null;
  }
  const vaiheet = osat.vaiheet ?? [];
  if (!vaiheet.length) return null;

  const t0 = ctx.currentTime ?? 0;
  const input = ctx.createGain();
  const output = ctx.createGain();
  const kuiva = ctx.createGain();
  const marka = ctx.createGain();
  // Alku kuivana; ristihäivytys märäksi 200 ms:ssa. Tasatehoinen
  // pari (sini/kosini), ks. js/linssit/radio.js RISTIHÄIVYTYS.
  kuiva.gain.setValueAtTime(1, t0);
  marka.gain.setValueAtTime(0, t0);
  input.connect(kuiva).connect(output);
  input.connect(marka);
  let edellinen = marka;
  for (const vaihe of vaiheet) {
    edellinen.connect(vaihe.input);
    edellinen = vaihe.output;
  }
  edellinen.connect(output);
  for (const lisa of osat.lisat ?? []) lisa.solmu.connect(output);
  for (const lahde of osat.lahteet ?? []) {
    try { lahde.start(t0); } catch { /* lähde ei käynnistynyt — ei kohinaa */ }
  }
  output.connect(paate);

  const liu = (solmu, arvo, mista) => {
    try {
      const t = ctx.currentTime ?? 0;
      solmu.gain.cancelScheduledValues(t);
      solmu.gain.setValueAtTime(mista, t);
      solmu.gain.linearRampToValueAtTime(arvo, t + KETJUN_HAIVYTYS_S);
    } catch { /* solmu oli jo irti */ }
  };
  liu(marka, 1, 0);
  liu(kuiva, 0, 1);

  let purettu = false;
  const irrota = () => {
    for (const lahde of osat.lahteet ?? []) {
      try { lahde.stop(); } catch { /* jo pysäytetty */ }
    }
    for (const vaihe of vaiheet) {
      try { vaihe.output.disconnect(); } catch { /* jo irti */ }
      for (const s of vaihe.solmut ?? []) {
        try { s.disconnect(); } catch { /* jo irti */ }
      }
    }
    for (const lisa of osat.lisat ?? []) {
      try { lisa.solmu.disconnect(); } catch { /* jo irti */ }
    }
    try { marka.disconnect(); } catch { /* jo irti */ }
  };

  return {
    nimi,
    input,
    output,
    /**
     * Purkaa ketjun: 200 ms:n liuku kuivaan, sitten efektisolmut irti.
     * Kuiva reitti (input → output → pääte) JÄÄ paikalleen: ketjuun
     * kytketty lähde soi loppuun kuivana eikä katkea. Solmut vapautuvat
     * roskienkeruulle, kun lähteet ovat päättyneet.
     */
    pura() {
      if (purettu) return;
      purettu = true;
      liu(kuiva, 1, kuiva.gain.value ?? 0);
      liu(marka, 0, marka.gain.value ?? 1);
      const ajastin = setTimeout(irrota, Math.round(KETJUN_HAIVYTYS_S * 1000) + 50);
      if (typeof ajastin?.unref === 'function') ajastin.unref();
    },
    purettu: () => purettu,
  };
}

/* ---------------------------------------------------------------- */
/* Kehittäjän kuuntelunappi                                          */
/* ---------------------------------------------------------------- */

/** Ketjun kesto kuuntelussa ja väli seuraavaan. */
export const KUUNTELUN_ASKEL_S = 1.4;

/**
 * Lyhyt puheenkaltainen testiääni: kaksi säveltä ja suhahdus — samat
 * rakennuspalat kuin js/sound.js:n tone/hiss, mutta kytkettynä annettuun
 * solmuun eikä sfx.busiin, jotta ääni kulkee ketjun läpi.
 */
function testiaani(ctx, kohde, t0) {
  const soita = (freq, alku, kesto, tyyppi, voima) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = tyyppi;
    osc.frequency.setValueAtTime(freq, t0 + alku);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.92, t0 + alku + kesto);
    g.gain.setValueAtTime(0.0001, t0 + alku);
    g.gain.exponentialRampToValueAtTime(voima, t0 + alku + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + alku + kesto);
    osc.connect(g).connect(kohde);
    osc.start(t0 + alku);
    osc.stop(t0 + alku + kesto + 0.05);
  };
  soita(196, 0, 0.28, 'sawtooth', 0.09);
  soita(262, 0.34, 0.22, 'triangle', 0.1);
  const noise = sfx.noise;
  if (noise) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 3200;
    f.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + 0.62);
    g.gain.exponentialRampToValueAtTime(0.05, t0 + 0.66);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
    src.connect(f).connect(g).connect(kohde);
    src.start(t0 + 0.62);
    src.stop(t0 + 0.95);
  }
}

/**
 * Soittaa testiäänen ensin suoraan ja sitten jokaisen ketjun läpi
 * (KUUNTELUN_ASKEL_S välein), jotta omistaja voi kuunnella ketjut
 * iPhonella hammasratasvalikosta. Palauttaa tilakoodin vihjeriville:
 *   'ok'            soitto käynnissä
 *   'aanet-pois'    pelin äänet on vaiennettu (sfx.enabled = false)
 *   'ei-kirjastoa'  Tuna ei latautunut — testiääni soi vain suoraan
 */
export async function kuunteleTehosteketjut() {
  const ctx = sfx.ensureContext();
  if (!ctx) return 'aanet-pois';
  const Tuna = await lataaTuna();
  const alku = ctx.currentTime + 0.05;
  testiaani(ctx, sfx.bus, alku);
  if (!Tuna) return 'ei-kirjastoa';
  TEHOSTEKETJUT.forEach((nimi, i) => {
    const t = alku + (i + 1) * KUUNTELUN_ASKEL_S;
    const viive = Math.max(0, (t - ctx.currentTime - 0.25) * 1000);
    setTimeout(() => {
      const ketju = tehosteketju(ctx, nimi, sfx.bus, { Tuna });
      testiaani(ctx, ketju ? ketju.input : sfx.bus, Math.max(t, ctx.currentTime + 0.02));
      if (ketju) setTimeout(() => ketju.pura(), (KUUNTELUN_ASKEL_S - 0.25) * 1000);
    }, viive);
  });
  return 'ok';
}
