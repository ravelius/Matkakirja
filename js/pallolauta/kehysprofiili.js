/*
 * KEHYSPROFIILI — PÄÄSÄIE VAI GPU? (Pelikoodari 22.9.2026, VAIN
 * MITTAUKSEEN: asennetaan, kun `?kerrokset=` tai `?koe=` on osoitteessa.)
 *
 * Ablaatiotikas nimeää pitkän kehyksen syyksi "piirto", kun mikään
 * kerroslaskuri ei muuttunut. Tämä profiili jakaa jokaisen kehyksen
 * kahtia, jotta laitteella nähdään, onko pitkä kehys pääsäikeen työtä
 * vai odotusta:
 *
 *   varattu  rAF-takaisinkutsun alusta siihen, kun pääsäie vapautuu
 *            (MessageChannel-viesti ajetaan vasta rAF-jonon, tyylin,
 *            asettelun ja maalauksen jälkeen) — pääsäikeen työ
 *   vapaa    dt − varattu — odotus GPU:lta / vsync
 *
 * Joka kehyksestä myös absoluuttiset laskurit: drawcalls, kolmiot,
 * laattoja scenessä, häipyviä (kaksi kerrosta päällekkäin), näkyviä,
 * taso, päivityksiä, pyyntöjä, rasterit, jakoja.
 *
 * Käyttö (konsoli tai laiteharness, tools/savukkeet/mittaa-zoomipiirto.mjs):
 *   __kehysprofiili.aloita(); … liike … ; const t = __kehysprofiili.lopeta();
 *   __kehysprofiili.tiivista(t)  → { mediaani, p95, max, yli50, yli25,
 *     varattuMed, varattuP95, pitkatVarattuOsuus, pisimmat[12] }
 *   __kehysprofiili.teksti(t)    → sama yhtenä rivistönä (näytölle)
 */

const prosenttipiste = (arvot, q) => {
  if (!arvot.length) return NaN;
  const s = [...arvot].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * (s.length - 1)))];
};

/**
 * @param {object|Function} uiTaiHaku window.matkakirja.ui (pallolauta, pallonInstanssi, pallolautaGL) tai sen hakija
 * @param {object} [ikkuna] globalThis (testit)
 */
export function luoKehysprofiili(uiTaiHaku, ikkuna = globalThis) {
  const haeUi = typeof uiTaiHaku === 'function' ? uiTaiHaku : () => uiTaiHaku;
  const lue = () => {
    const ui = haeUi();
    const l = ui?.pallolauta;
    const laatat = l?.lepokerros?.()?.mittarit?.() ?? {};
    const st = l?.glSovitin?.()?.tila?.() ?? {};
    const k = ui?.pallolautaGL?.()?.mittarit?.() ?? {};
    const info = ui?.pallonInstanssi?.renderer?.()?.info ?? {};
    return {
      pyyntoja: laatat.pyyntoja ?? 0, purettuja: laatat.purettuja ?? 0, paivityksia: laatat.paivityksia ?? 0,
      scenessa: laatat.scenessa ?? 0, hapyvia: laatat.hapyvia ?? 0, nakyvia: laatat.nakyvia ?? 0, taso: laatat.taso ?? null,
      jakoja: (st.jakoja ?? 0) + (st.nostojakoja ?? 0), rasterit: st.rasterit?.valmiita ?? 0,
      rakennuksia: k.rakennuksia ?? 0, tekstuurit: info.memory?.textures ?? 0,
      drawcalls: info.render?.calls ?? 0, kolmiot: info.render?.triangles ?? 0,
    };
  };
  const kanava = typeof ikkuna.MessageChannel === 'function' ? new ikkuna.MessageChannel() : null;
  let tila = null;
  let odottaa = null;
  if (kanava) kanava.port1.onmessage = () => { if (odottaa) { odottaa.kehys.varattu = ikkuna.performance.now() - odottaa.alku; odottaa = null; } };
  const nyt = () => ikkuna.performance.now();
  const aloita = () => {
    tila = { kehykset: [], kaynnissa: true, t: nyt(), alku: nyt() };
    const askel = () => {
      if (!tila?.kaynnissa) return;
      const t = nyt(); const dt = t - tila.t; tila.t = t;
      const kehys = { t: t - tila.alku, dt, varattu: null, ...lue() };
      tila.kehykset.push(kehys);
      if (kanava) { odottaa = { alku: t, kehys }; kanava.port2.postMessage(0); }
      ikkuna.requestAnimationFrame(askel);
    };
    ikkuna.requestAnimationFrame(askel);
  };
  const lopeta = () => {
    if (!tila) return null;
    tila.kaynnissa = false;
    // Ensimmäinen kehys sisältää aloituksen viiveen: pois.
    const tulos = { alku: tila.alku, kehykset: tila.kehykset.slice(1) };
    tila = null;
    return tulos;
  };
  const tiivista = (tulos) => {
    const kehykset = tulos?.kehykset ?? [];
    const dts = kehykset.map((k) => k.dt);
    const pitkat = kehykset.filter((k) => k.dt > 25);
    return {
      kehyksia: dts.length, mediaani: prosenttipiste(dts, 0.5), p95: prosenttipiste(dts, 0.95), max: dts.length ? Math.max(...dts) : NaN,
      yli50: dts.filter((d) => d > 50).length, yli25: pitkat.length,
      varattuMed: prosenttipiste(kehykset.map((k) => k.varattu ?? 0), 0.5),
      varattuP95: prosenttipiste(kehykset.map((k) => k.varattu ?? 0), 0.95),
      // Pitkien kehysten jako: kuinka suuri osa dt:stä oli pääsäikeen työtä.
      pitkatVarattuOsuus: pitkat.length ? pitkat.reduce((a, k) => a + (k.varattu ?? 0), 0) / pitkat.reduce((a, k) => a + k.dt, 0) : null,
      pisimmat: [...kehykset].sort((a, b) => b.dt - a.dt).slice(0, 12).map((k) => ({
        t: Math.round(k.t), dt: Math.round(k.dt), varattu: Math.round(k.varattu ?? -1), drawcalls: k.drawcalls, kolmiot: k.kolmiot,
        scenessa: k.scenessa, hapyvia: k.hapyvia, nakyvia: k.nakyvia, taso: k.taso, paivityksia: k.paivityksia, pyyntoja: k.pyyntoja, rasterit: k.rasterit, jakoja: k.jakoja,
      })),
      drawcallsMax: kehykset.length ? Math.max(...kehykset.map((k) => k.drawcalls)) : 0,
      scenessaMax: kehykset.length ? Math.max(...kehykset.map((k) => k.scenessa)) : 0,
      hapyviaMax: kehykset.length ? Math.max(...kehykset.map((k) => k.hapyvia)) : 0,
    };
  };
  const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');
  const teksti = (tulos) => {
    const r = tiivista(tulos);
    const rivit = [`med ${p(r.mediaani)} p95 ${p(r.p95)} max ${p(r.max)} ms, >50: ${r.yli50}, >25: ${r.yli25}/${r.kehyksia} | varattu med ${p(r.varattuMed)} p95 ${p(r.varattuP95)} | pitkien varattu-osuus ${r.pitkatVarattuOsuus == null ? '—' : `${Math.round(r.pitkatVarattuOsuus * 100)} %`} | dc ≤ ${r.drawcallsMax} scenessä ≤ ${r.scenessaMax} häipyviä ≤ ${r.hapyviaMax}`];
    for (const k of r.pisimmat.slice(0, 6)) rivit.push(`t ${k.t} dt ${k.dt} varattu ${k.varattu} | dc ${k.drawcalls} tri ${k.kolmiot} sc ${k.scenessa} häipyy ${k.hapyvia} näk ${k.nakyvia} taso ${k.taso} päiv ${k.paivityksia} pyynt ${k.pyyntoja} rast ${k.rasterit} jak ${k.jakoja}`);
    return rivit.join('\n');
  };
  return { aloita, lopeta, tiivista, teksti, lue };
}

/** Asenna `globalThis.__kehysprofiili` (kerran). */
export function asennaKehysprofiili(ui, ikkuna = globalThis) {
  if (ikkuna.__kehysprofiili) return ikkuna.__kehysprofiili;
  ikkuna.__kehysprofiili = luoKehysprofiili(ui, ikkuna);
  return ikkuna.__kehysprofiili;
}
