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
 * NOSTOT (vaihe 3): sama jako `nostot(datumit)`-kutsulla. Nosto on
 * kaksi spriteä samassa maapisteessä — ikoni ja nimiö (nimiorasterit.js
 * haeNosto: sama rasteri ja avain kuin CSS2D:n kuvilla) — ja molemmat
 * saavat sovittelun siirron (dx, dy) ja mitan (skaala = mitta / porras,
 * katto { a, b } kuten --nimio-a/-b). Nimiön piilotus (nimioNakyy) ja
 * merkin piilotus listan tai liuskan alla ovat peittoja; KYLKIVAIHTO on
 * crossfade (E3): vanha nimiö jää häipymään NOSTON_HAIVYTYS_MS ja uusi
 * tulee häivytyksellä, ikoni ei liiku. CSS2D:hen jäävät ankkurit,
 * aihemerkit ja avatut viuhkat, luonnokset (löytämisen sumu) ja pisteet.
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

/** Kylkivaihdon ja piilotuksen häivytys (ms) — sama kuin CSS2D:n E3-siirtymä. */
export const NOSTON_HAIVYTYS_MS = 180;

/** Onko nosto GL-kelpoinen: vain tavallinen nosto ikonilla, ei liuskaa eikä luonnosta. */
export function glNostoKelpaa(d) {
  return d?.laji === 'nosto' && !d.ankkuri && !d.luonnos && !d.avattu
    && !(Array.isArray(d.viuhka) && d.viuhka.length) && typeof d.kategoria === 'string';
}

/** Noston merkin peitto: listan tai liuskan alla piilossa, lunastettu haalea (css .lunastettu 0,55). */
export function glNostonPeitto(d) {
  if (d.piiloListanAlla || d.piiloLiuskanAlla) return 0;
  return d.lunastettu ? 0.55 : 1;
}

/**
 * Noston osan (ikoni | nimiö) instanssi. Tunnus kantaa osan, jotta
 * runko pitää ikonin paikallaan, kun nimiö vaihtaa kylkeä.
 */
export function glNostonInstanssi(d, sprite, osa, opacity) {
  return {
    tunnus: `${glInstanssinTunnus(d)}#${osa}`,
    lat: d.lat,
    lng: d.lng,
    avain: sprite.avain,
    rasteri: sprite,
    skaala: sprite.skaala,
    dx: Number(d.dx) || 0,
    dy: Number(d.dy) || 0,
    katto: sprite.katto ?? null,
    opacity,
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
  let viimeiset = null; // viimeisimmän jaon datumit (nimet)
  let kunValmis = null;
  let viimeisetNostot = null; // viimeisimmän jaon datumit (nostot)
  let kunNostoValmis = null;
  let pyynto = false;
  let purettu = false;
  const luvut = { gl: 0, css2d: 0, tayntyi: 0, jakoja: 0, nostotGl: 0, nostotCss2d: 0, nostojakoja: 0 };
  /** Nimet ja nostot ovat yksi lista rungolle: kumpikin jako säilyttää toisen. */
  let nimiInstanssit = [];
  let nostoInstanssit = [];
  /** tunnus → nimiön avain viime jaossa (kylkivaihdon tunnistus). */
  const nimiot = new Map();
  /** Häipyvät nimiöt: tunnus → { instanssi, alku, mista, mihin, poistu } */
  const haivytykset = new Map();
  const nyt = () => globalThis.performance?.now?.() ?? Date.now();

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
        skaala: i.skaala, dx: i.dx, dy: i.dy, katto: i.katto,
      });
      if (ok !== false) tunnukset.add(i.tunnus);
    }
  };
  /** Koko lista (nimet + nostot + häipyvät) rungolle. */
  // Häipyvä vanha nimiö on oma instanssinsa; tuleva nimiö on jo nostoInstansseissa.
  const vieKaikki = (k) => vieRungolle(k, [
    ...nimiInstanssit, ...nostoInstanssit,
    ...[...haivytykset.values()].filter((h) => h.poistu && h.instanssi).map((h) => h.instanssi),
  ]);
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
    nimiInstanssit = gl;
    vieKaikki(k);
    luvut.gl = gl.length;
    luvut.css2d = css2d.length;
    luvut.tayntyi = tayntyi;
    luvut.jakoja += 1;
    return css2d;
  };

  /**
   * Nostojen jako: ikoni + nimiö rungolle, CSS2D:hen jäävät takaisin.
   * Kylkivaihto: edellinen nimiö (eri avain samalla tunnuksella) jää
   * häipymään, uusi tulee häivytyksellä.
   */
  const jaaNostot = (datumit) => {
    const k = purettu ? null : kerros?.();
    if (!k) {
      luvut.nostotGl = 0;
      luvut.nostotCss2d = datumit.length;
      return datumit;
    }
    const gl = [];
    const css2d = [];
    const hetki = nyt();
    const nakyvat = new Set();
    for (const d of datumit) {
      if (!glNostoKelpaa(d)) { css2d.push(d); continue; }
      const spritet = lahde.haeNosto(d);
      const ikoni = spritet.find((x) => x.osa === 'ikoni');
      const nimio = spritet.find((x) => x.osa === 'nimio') ?? null;
      const valmiit = spritet.every((x) => x?.valmis);
      if (!ikoni || !valmiit || !spritet.every((x) => varaa(k, x))) { css2d.push(d); continue; }
      const peitto = glNostonPeitto(d);
      const tunnus = glInstanssinTunnus(d);
      nakyvat.add(tunnus);
      gl.push(glNostonInstanssi(d, ikoni, 'ikoni', peitto));
      if (nimio) {
        const nimioNakyy = Boolean(d.nimioNakyy && d.nimi);
        const edellinen = nimiot.get(tunnus);
        const vaihtui = edellinen && edellinen.avain !== nimio.avain && edellinen.nakyy && nimioNakyy;
        if (vaihtui) {
          // Vanha nimiö häipyy paikallaan (E3): sama sprite, sama siirto kuin ennen.
          haivytykset.set(`${tunnus}#nimio-vanha`, {
            instanssi: { ...edellinen.instanssi, tunnus: `${tunnus}#nimio-vanha`, opacity: edellinen.instanssi.opacity },
            alku: hetki, mista: edellinen.instanssi.opacity, mihin: 0, poistu: true,
          });
          haivytykset.set(`${tunnus}#nimio`, { alku: hetki, mista: 0, mihin: peitto, poistu: false });
        }
        const haivytys = haivytykset.get(`${tunnus}#nimio`);
        const nimioPeitto = nimioNakyy ? (haivytys && !haivytys.poistu ? haivytys.mista : peitto) : 0;
        const instanssi = glNostonInstanssi(d, nimio, 'nimio', nimioPeitto);
        if (haivytys && !haivytys.poistu) haivytys.instanssi = instanssi;
        gl.push(instanssi);
        nimiot.set(tunnus, { avain: nimio.avain, nakyy: nimioNakyy, instanssi });
      }
    }
    for (const t of [...nimiot.keys()]) if (!nakyvat.has(t)) nimiot.delete(t);
    // Häivytys elää vain, kun sen nosto on yhä rungolla.
    for (const [t, h] of haivytykset) {
      const emo = t.replace(/#nimio(-vanha)?$/, '');
      if (!nakyvat.has(emo)) haivytykset.delete(t);
      else if (!h.poistu && !gl.some((i) => i.tunnus === t)) haivytykset.delete(t);
    }
    nostoInstanssit = gl.filter((i) => !haivytykset.get(i.tunnus)?.poistu);
    vieKaikki(k);
    luvut.nostotGl = nakyvat.size;
    luvut.nostotCss2d = css2d.length;
    luvut.nostojakoja += 1;
    return css2d;
  };

  /** Häivytysten eteneminen (kehyskoukusta): peitto ajan mukaan, valmiit pois. */
  const etenaHaivytykset = (k) => {
    if (!haivytykset.size) return;
    const hetki = nyt();
    let poistettiin = false;
    for (const [t, h] of haivytykset) {
      const osuus = Math.min(1, (hetki - h.alku) / NOSTON_HAIVYTYS_MS);
      const peitto = h.mista + (h.mihin - h.mista) * osuus;
      if (h.instanssi) h.instanssi.opacity = peitto;
      k.peitto?.(t, peitto);
      if (osuus >= 1) { haivytykset.delete(t); if (h.poistu) poistettiin = true; }
    }
    if (poistettiin) vieKaikki(k);
  };

  // Kesken ollut rasteri valmistui: sama jako uudestaan seuraavassa kehyksessä.
  const irrota = lahde.tilaaRasterit(() => {
    if (purettu || (!viimeiset && !viimeisetNostot) || pyynto) return;
    pyynto = true;
    ajasta(() => {
      pyynto = false;
      if (purettu) return;
      if (viimeiset) kunValmis?.();
      if (viimeisetNostot) kunNostoValmis?.();
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
    /**
     * Nostojen datumit → CSS2D:hen jäävät (ks. NOSTOT). `kutsuKunValmis`
     * kuten nimillä: kesken ollut rasteri valmistui → sama jako uudestaan.
     */
    nostot(datumit, kutsuKunValmis = null) {
      viimeisetNostot = datumit;
      if (kutsuKunValmis) kunNostoValmis = kutsuKunValmis;
      return jaaNostot(datumit);
    },
    /** Kehyskoukku: kuoren kerroin rungon uniformiin (E2 --nimiokerroin) ja häivytykset. */
    kehys() {
      const k = purettu ? null : kerros?.();
      if (!k) return;
      k.kerroin?.(lahde.kuorenKerroin());
      etenaHaivytykset(k);
    },
    /** Käynnissä olevat häivytykset (savukkeet). */
    haivytykset: () => new Map(haivytykset),
    /** Rungolla olevat instanssitunnukset (savukkeet, osumatesti). */
    rungolla: () => new Set(tunnukset),
    onRungolla: (tunnus) => tunnukset.has(tunnus),
    lahde: () => lahde,
    /** Viimeisimmän jaon datumit (savukkeet, osumatesti). */
    viimeiset: () => viimeiset ?? [],
    viimeisetNostot: () => viimeisetNostot ?? [],
    tila: () => ({ ...luvut, rasterit: lahde.tila() }),
    pura() {
      purettu = true;
      irrota();
      viimeiset = null;
      kunValmis = null;
      viimeisetNostot = null;
      kunNostoValmis = null;
      nimiInstanssit = [];
      nostoInstanssit = [];
      haivytykset.clear();
      nimiot.clear();
      const k = kerros?.();
      if (k && typeof k.asetaKaikki === 'function') k.asetaKaikki([]);
      else for (const t of tunnukset) k?.poista?.(t);
      tunnukset.clear();
      lahde.pura();
    },
  };
}
