/*
 * GL-NIMIÖIDEN SOVITIN — LADONNASTA INSTANSSILISTAKSI (GL-kerros vaihe
 * 2, Pelikoodari; docs/raportit/gl-kerros-suunnitelma-20260921.md).
 *
 * Karttasepän runko (js/pallonimiot-gl.js) piirtää spritet, Pelikoodarin
 * rasterilähde (js/pallolauta/nimiorasterit.js) tietää miltä ne
 * näyttävät, ja LADONTA (js/pallolauta/nimet.js) päättää paikan ja
 * kyljen. Tämä moduuli on niiden välissä: se ottaa ladonnan datumit
 * sellaisinaan, hakee jokaiselle rasterin ja rakentaa rungolle
 * instanssilistan
 *
 *   { tunnus, lat, lng, avain, rasteri, skaala, dx, dy, katto, opacity }
 *
 * missä (dx, dy) on ladonnan siirtymä maapisteestä CSS-pikseleinä
 * (sama kuin CSS2D:n translate), skaala CSS-pikseliä per rasterin
 * pikseli ja katto nostojen { a, b } (nimillä null). Runko kertoo
 * siirtymän ja koon kuoren kertoimella k joka kehys (`kerros.kerroin`),
 * kuten CSS skaalaa nimen svg:n `--nimiokerroin`illa (E2).
 *
 * JAKO GL:N JA CSS2D:N VÄLILLÄ. Rasteri syntyy vasta `document.fonts
 * .ready`n jälkeen ja ImageBitmapin valmistuttua; siihen asti nimi
 * piirretään CSS2D:nä kuten ennenkin (Fablen linjaus 21.9.2026: ei
 * fonttien odotusta — CSS2D on perääntymistie). `nimet(datumit)`
 * palauttaa siis ne datumit, jotka JÄÄVÄT CSS2D:hen, ja vie loput
 * rungolle. Kun kesken ollut rasteri valmistuu, sovitin pyytää
 * ladonnan tulosta uudestaan (`kunValmis`), jolloin nimi siirtyy
 * GL-kerrokseen ilman uutta ladontaa. Atlaksen täyttyminen (runko
 * palauttaa null) jättää nimen samoin CSS2D:hen.
 *
 * RUNGON RAJAPINTA (sovittu Karttasepän kanssa 21.9.2026):
 *   kerros.asetaKaikki(instanssit)          koko lista kerralla
 *   kerros.atlas.hae(avain) / varaa(avain, kuva, w, h, ankkuriX, ankkuriY)
 *                                            → tietue | null (täynnä)
 *   kerros.kerroin(k)                        kuoren kerroin uniformiin
 * Vaiheen 1 runko (aseta(id, { lat, lng, avain, rasteri, peitto }))
 * kelpaa myös: sovitin tunnistaa sen ja kutsuu instanssi kerrallaan.
 */

import { luoRasterilahde } from './nimiorasterit.js';

/** Instanssin tunnus datumista: sama kuin merkkirekisterin avain. */
export function glInstanssinTunnus(d) {
  return d.avain ?? `${d.laji ?? 'nimi'}:${d.id}`;
}

/**
 * Nimen datum + valmis rasteri → rungon instanssi. Puhdas funktio
 * (testit). `opacity` on 1: piilotus ja kylkivaihdon häivytys tulevat
 * vaiheessa 3 sovittelusta.
 */
export function glNimenInstanssi(d, sprite) {
  return {
    tunnus: glInstanssinTunnus(d),
    lat: d.lat,
    lng: d.lng,
    avain: sprite.avain,
    rasteri: sprite,
    skaala: sprite.skaala,
    dx: Number(d.dx) || 0,
    dy: Number(d.dy) || 0,
    katto: sprite.katto ?? null,
    opacity: 1,
  };
}

/**
 * Sovitin yhdelle laudalle. `kerros()` antaa rungon tai null (runko
 * syntyy laiskasti, kun kirjaston luokat ovat scenessä); siihen asti
 * kaikki jää CSS2D:hen. `rasterilahde` voi tulla ulkoa (testit).
 */
export function luoGlNimiosovitin({
  kotelo, kerros, rasterilahde = null, dpr = globalThis.devicePixelRatio || 1,
  ajasta = (f) => (globalThis.requestAnimationFrame ?? setTimeout)(f),
} = {}) {
  const lahde = rasterilahde ?? luoRasterilahde({ kotelo, dpr });
  const tunnukset = new Set(); // rungolla olevat instanssit
  let viimeiset = null; // viimeisimmän jaon datumit
  let kunValmis = null;
  let pyynto = false;
  let purettu = false;
  const luvut = { gl: 0, css2d: 0, tayntyi: 0, jakoja: 0 };

  /** Rasteri atlakseen rungon rajapinnalla; false = ei tilaa. */
  const varaa = (k, sprite) => {
    const atlas = k.atlas;
    if (!atlas) return true; // vaiheen 1 runko: rasteri kulkee instanssissa
    if (atlas.hae?.(sprite.avain)) return true;
    return Boolean(atlas.varaa(sprite.avain, sprite.kuva, sprite.w, sprite.h, sprite.ankkuriX, sprite.ankkuriY));
  };

  /** Lista rungolle: asetaKaikki, tai vaiheen 1 aseta/poista instanssi kerrallaan. */
  const vieRungolle = (k, instanssit) => {
    if (typeof k.asetaKaikki === 'function') {
      k.asetaKaikki(instanssit);
      tunnukset.clear();
      for (const i of instanssit) tunnukset.add(i.tunnus);
      return;
    }
    const uudet = new Set(instanssit.map((i) => i.tunnus));
    for (const t of tunnukset) if (!uudet.has(t)) k.poista?.(t);
    tunnukset.clear();
    for (const i of instanssit) {
      const ok = k.aseta?.(i.tunnus, {
        lat: i.lat, lng: i.lng, avain: i.avain, rasteri: i.rasteri, peitto: i.opacity,
      });
      if (ok !== false) tunnukset.add(i.tunnus);
    }
  };

  /** Jako: GL-instanssit rungolle, CSS2D:hen jäävät datumit takaisin. */
  const jaa = (datumit) => {
    const k = purettu ? null : kerros?.();
    if (!k) {
      luvut.gl = 0;
      luvut.css2d = datumit.length;
      return datumit;
    }
    const gl = [];
    const css2d = [];
    let tayntyi = 0;
    for (const d of datumit) {
      const sprite = lahde.haeNimi(d)[0];
      if (!sprite?.valmis || !varaa(k, sprite)) {
        if (sprite?.valmis) tayntyi += 1;
        css2d.push(d);
        continue;
      }
      gl.push(glNimenInstanssi(d, sprite));
    }
    vieRungolle(k, gl);
    luvut.gl = gl.length;
    luvut.css2d = css2d.length;
    luvut.tayntyi = tayntyi;
    luvut.jakoja += 1;
    return css2d;
  };

  // Kesken ollut rasteri valmistui: sama jako uudestaan seuraavassa kehyksessä.
  const irrota = lahde.tilaaRasterit(() => {
    if (purettu || !viimeiset || pyynto) return;
    pyynto = true;
    ajasta(() => {
      pyynto = false;
      if (purettu || !viimeiset) return;
      kunValmis?.();
    });
  });

  return {
    /**
     * Ladonnan datumit → CSS2D:hen jäävät. `kunValmis` kutsutaan, kun
     * jokin kesken ollut rasteri valmistuu (kutsuja tekee `nimet`-kutsun
     * uudestaan samoilla datumeilla).
     */
    nimet(datumit, kutsuKunValmis = null) {
      viimeiset = datumit;
      if (kutsuKunValmis) kunValmis = kutsuKunValmis;
      return jaa(datumit);
    },
    /** Kehyskoukku: kuoren kerroin rungon uniformiin (E2 --nimiokerroin). */
    kehys() {
      const k = purettu ? null : kerros?.();
      k?.kerroin?.(lahde.kuorenKerroin());
    },
    /** Rungolla olevat instanssitunnukset (savukkeet, osumatesti). */
    rungolla: () => new Set(tunnukset),
    onRungolla: (tunnus) => tunnukset.has(tunnus),
    lahde: () => lahde,
    /** Viimeisimmän jaon datumit (savukkeet, osumatesti). */
    viimeiset: () => viimeiset ?? [],
    tila: () => ({ ...luvut, rasterit: lahde.tila() }),
    pura() {
      purettu = true;
      irrota();
      viimeiset = null;
      kunValmis = null;
      const k = kerros?.();
      if (k && typeof k.asetaKaikki === 'function') k.asetaKaikki([]);
      else for (const t of tunnukset) k?.poista?.(t);
      tunnukset.clear();
      lahde.pura();
    },
  };
}
