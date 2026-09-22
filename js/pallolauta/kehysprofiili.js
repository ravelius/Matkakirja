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
    /*
     * PIIRRETTIINKÖ TÄMÄ KEHYS (Fablen kysymys 22.9.2026: ovatko pitkät
     * kehykset juuri lepopiirron ohittamia?). Lepopiirron laskuri on
     * kumulatiivinen, joten kehyksen oma vastaus on kahden peräkkäisen
     * lukeman erotus — se lasketaan tiivistyksessä, tässä vain luetaan.
     */
    const lepo = ui?.pallonInstanssi?.__piirto?.tila?.() ?? null;
    return {
      piirtolaskuri: lepo?.piirtoja ?? null, ohituslaskuri: lepo?.ohitettuja ?? null,
      pyyntoja: laatat.pyyntoja ?? 0, purettuja: laatat.purettuja ?? 0, paivityksia: laatat.paivityksia ?? 0,
      scenessa: laatat.scenessa ?? 0, hapyvia: laatat.hapyvia ?? 0, nakyvia: laatat.nakyvia ?? 0, taso: laatat.taso ?? null,
      valmisteluja: laatat.valmisteluja ?? 0, vaistoja: laatat.valmisteluVaistoja ?? 0,
      jakoja: (st.jakoja ?? 0) + (st.nostojakoja ?? 0), rasterit: st.rasterit?.valmiita ?? 0,
      rakennuksia: k.rakennuksia ?? 0, tekstuurit: info.memory?.textures ?? 0,
      /* GL-rungon kirjoitukset (Safarin GPU-prosessi: bufferSubData on kallis). */
      puskurikirjoituksia: k.puskurikirjoituksia ?? null,
      uniformeja: k.uniformeja ?? null,
      glVienteja: k.vienteja ?? null,
      drawcalls: info.render?.calls ?? 0, kolmiot: info.render?.triangles ?? 0,
    };
  };
  const kanava = typeof ikkuna.MessageChannel === 'function' ? new ikkuna.MessageChannel() : null;
  let tila = null;
  let odottaa = null;
  /*
   * PÄÄSÄIKEEN TYÖ NIMETÄÄN ILMAN PROFILOIJAA (Safari): mittauksen ajaksi
   * requestAnimationFrame kääritään niin, että jokaisen takaisinkutsun
   * kesto kirjataan kehykseen nimellä (funktion nimi tai lähteen alku),
   * ja three.js:n `renderer.render` erikseen. Kehyksen `varattu` −
   * (rAF-kutsut + render) = tyyli, asettelu ja maalaus + muut tehtävät.
   */
  const alkuperainenRaf = ikkuna.requestAnimationFrame;
  const nimi = (fn) => fn?.name || String(fn).replace(/\s+/g, ' ').slice(0, 48);
  let kehysNyt = null;
  /** Elossa olevat mittausketjut (ks. YKSI KETJU PER MITTAUS). */
  let ketjuja = 0;
  /*
   * KEHYSTEN KATTO. Ruutunäyttö (js/pallolauta/profiilinaytto.js) pitää
   * mittausta auki niin kauan kuin peli on auki, joten taulukolla on
   * oltava yläraja. 4000 kehystä on yli minuutti 60 Hz:llä — pidempää
   * otosta ei lue kukaan.
   */
  const KEHYSKATTO = 4000;
  const kirjaa = (avain, ms) => {
    if (!kehysNyt) return;
    kehysNyt.js = (kehysNyt.js ?? 0) + ms;
    kehysNyt.kutsut ??= {};
    kehysNyt.kutsut[avain] = (kehysNyt.kutsut[avain] ?? 0) + ms;
  };
  const kaariRaf = () => {
    ikkuna.requestAnimationFrame = (fn) => alkuperainenRaf.call(ikkuna, (t) => {
      const a = nyt();
      /*
       * KUINKA MONTA rAF-SILMUKKAA ON ELOSSA (Fable 22.9.2026): jokainen
       * kehyksessä ajettu kääritty takaisinkutsu on yhden silmukan
       * askel — kirjaston tick, lepopiirron kello, kartan liike.
       * Keskiarvo kehystä kohti kertoo, moninkertaistuiko jokin niistä.
       */
      if (kehysNyt) kehysNyt.rafKutsuja = (kehysNyt.rafKutsuja ?? 0) + 1;
      try { return fn(t); } finally { kirjaa(nimi(fn), nyt() - a); }
    });
  };
  const puraRaf = () => { ikkuna.requestAnimationFrame = alkuperainenRaf; };
  let renderPurku = null;
  const kaariRender = () => {
    const r = haeUi()?.pallonInstanssi?.renderer?.();
    if (!r?.render || r.__kehysprofiili) return;
    const alkuperainen = r.render;
    r.render = function render(...args) { const a = nyt(); try { return alkuperainen.apply(this, args); } finally { kirjaa('three.render', nyt() - a); if (kehysNyt) kehysNyt.render = (kehysNyt.render ?? 0) + (nyt() - a); } };
    r.__kehysprofiili = true;
    renderPurku = () => { r.render = alkuperainen; delete r.__kehysprofiili; };
  };
  if (kanava) kanava.port1.onmessage = () => { if (odottaa) { odottaa.kehys.varattu = ikkuna.performance.now() - odottaa.alku; odottaa = null; } };
  const nyt = () => ikkuna.performance.now();
  /*
   * ══ YKSI KETJU PER MITTAUS (v2123:n vika, omistajan kaappaus) ══════
   *
   * Vanha askel tarkisti vain `tila?.kaynnissa`. Kun profiili suljetaan
   * ja avataan uudelleen (rollaava ikkuna, js/pallolauta/profiilinaytto.js),
   * `tila` osoittaa jo UUTEEN mittaukseen, jonka `kaynnissa` on tosi —
   * joten vanha ketju jatkoi ja syötti kehyksensä uuteen taulukkoon.
   * Jokainen jakso siis LISÄSI yhden rAF-ketjun: omistajan puhelimessa
   * mittari näytti "rAF 500 Hz (dt p50 2,0)" ja 4130 kehystä kolmessa
   * sekunnissa, mikä on mahdotonta yhdelle ketjulle.
   *
   * Korjaus: ketju tuntee OMAN mittauksensa ja lopettaa heti, jos
   * voimassa on toinen. Laskuri `ketjuja` on vartija: sen on oltava 1.
   */
  const aloita = () => {
    const oma = { kehykset: [], kaynnissa: true, t: nyt(), alku: nyt() };
    tila = oma;
    kaariRaf(); kaariRender();
    ketjuja += 1;
    const askel = () => {
      if (tila !== oma || !oma.kaynnissa) { ketjuja = Math.max(0, ketjuja - 1); return; }
      const t = nyt(); const dt = t - oma.t; oma.t = t;
      const kehys = { t: t - oma.alku, dt, varattu: null, js: 0, render: 0, ...lue() };
      oma.kehykset.push(kehys);
      // Ruutunäyttö pitää mittausta auki pitkään; katto estää taulukkoa kasvamasta rajatta.
      if (oma.kehykset.length > KEHYSKATTO) oma.kehykset.splice(0, oma.kehykset.length - KEHYSKATTO);
      kehysNyt = kehys;
      if (kanava) { odottaa = { alku: t, kehys }; kanava.port2.postMessage(0); }
      // Oma askel ensimmäisenä rAF-jonossa: muut saman kehyksen kutsut kirjautuvat tähän kehykseen.
      alkuperainenRaf.call(ikkuna, askel);
    };
    alkuperainenRaf.call(ikkuna, askel);
  };
  const lopeta = () => {
    if (!tila) return null;
    tila.kaynnissa = false;
    puraRaf(); renderPurku?.(); renderPurku = null; kehysNyt = null;
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
      // Pääsäikeen jako pitkissä kehyksissä: rAF-kutsut (js), joista three.render, ja loppu = tyyli/asettelu/maalaus + muut tehtävät.
      pitkatJs: pitkat.length ? pitkat.reduce((a, k) => a + (k.js ?? 0), 0) / pitkat.length : null,
      pitkatRender: pitkat.length ? pitkat.reduce((a, k) => a + (k.render ?? 0), 0) / pitkat.length : null,
      pitkatMuu: pitkat.length ? pitkat.reduce((a, k) => a + Math.max(0, (k.varattu ?? 0) - (k.js ?? 0)), 0) / pitkat.length : null,
      kutsut: (() => { const s = {}; for (const k of pitkat) for (const [n, ms] of Object.entries(k.kutsut ?? {})) s[n] = (s[n] ?? 0) + ms; return Object.entries(s).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([n, ms]) => ({ n, ms: Math.round(ms) })); })(),
      pisimmat: [...kehykset].sort((a, b) => b.dt - a.dt).slice(0, 12).map((k) => ({
        t: Math.round(k.t), dt: Math.round(k.dt), varattu: Math.round(k.varattu ?? -1), js: Math.round(k.js ?? 0), render: Math.round(k.render ?? 0), drawcalls: k.drawcalls, kolmiot: k.kolmiot,
        scenessa: k.scenessa, hapyvia: k.hapyvia, nakyvia: k.nakyvia, taso: k.taso, paivityksia: k.paivityksia, pyyntoja: k.pyyntoja, rasterit: k.rasterit, jakoja: k.jakoja,
      })),
      drawcallsMax: kehykset.length ? Math.max(...kehykset.map((k) => k.drawcalls)) : 0,
      scenessaMax: kehykset.length ? Math.max(...kehykset.map((k) => k.scenessa)) : 0,
      hapyviaMax: kehykset.length ? Math.max(...kehykset.map((k) => k.hapyvia)) : 0,
      valmisteluja: kehykset.length ? kehykset.at(-1).valmisteluja - kehykset[0].valmisteluja : 0,
      vaistoja: kehykset.length ? kehykset.at(-1).vaistoja - kehykset[0].vaistoja : 0,
    };
  };
  const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');
  const teksti = (tulos) => {
    const r = tiivista(tulos);
    const rivit = [`med ${p(r.mediaani)} p95 ${p(r.p95)} max ${p(r.max)} ms, >50: ${r.yli50}, >25: ${r.yli25}/${r.kehyksia} | varattu med ${p(r.varattuMed)} p95 ${p(r.varattuP95)} | pitkien varattu-osuus ${r.pitkatVarattuOsuus == null ? '—' : `${Math.round(r.pitkatVarattuOsuus * 100)} %`} | dc ≤ ${r.drawcallsMax} scenessä ≤ ${r.scenessaMax} häipyviä ≤ ${r.hapyviaMax} | valmisteluja ${r.valmisteluja}, väistöjä ${r.vaistoja}`];
    rivit.push(`pitkien kehysten pääsäie/kehys: rAF-kutsut ${p(r.pitkatJs)} ms (three.render ${p(r.pitkatRender)}) + tyyli/asettelu/maalaus ym. ${p(r.pitkatMuu)} ms | kutsut: ${r.kutsut.map((k) => `${k.n} ${k.ms}`).join(', ')}`);
    for (const k of r.pisimmat.slice(0, 6)) rivit.push(`t ${k.t} dt ${k.dt} varattu ${k.varattu} js ${k.js} render ${k.render} | dc ${k.drawcalls} tri ${k.kolmiot} sc ${k.scenessa} häipyy ${k.hapyvia} näk ${k.nakyvia} taso ${k.taso} päiv ${k.paivityksia} pyynt ${k.pyyntoja} rast ${k.rasterit} jak ${k.jakoja}`);
    return rivit.join('\n');
  };
  /*
   * TASAISUUSMITTARI (Fable 22.9.2026: "kehysajan p95 ei tavoita
   * panoroinnin nykimistä"). Synteettinen kosketusveto vakionopeudella
   * sivun sisältä (PointerEvent kankaalle joka kehyksellä, ei Node-
   * kierroksia): joka kehyksestä kirjataan kameran siirtymä ruudulla
   * (kiinteän maapisteen ruutukoordinaatti getScreenCoordsilla) ja
   * kehyksen kesto. Google Earth -taso = sama siirtymä joka kehyksessä:
   * mittarit ovat siirtymän keskiarvo ja hajonta/keskiarvo, pysähdykset
   * (siirtymä < 0,25 px vaikka sormi liikkui) ja pisin pysähdys ms.
   */
  const veto = async ({ kesto = 3000, nopeusPx = 80, suunta = [1, 0.3], pointerType = 'touch' } = {}) => {
    const ui = haeUi();
    const pallo = ui?.pallonInstanssi;
    const kohde = pallo?.renderer?.()?.domElement ?? ui?.pallolauta?.kotelo;
    if (!pallo?.getScreenCoords || !kohde?.dispatchEvent) return null;
    const r = kohde.getBoundingClientRect();
    let x = r.left + r.width * 0.3; let y = r.top + r.height * 0.55;
    const pov = pallo.pointOfView();
    const viite = { lat: pov.lat, lng: pov.lng };
    const pituus = Math.hypot(suunta[0], suunta[1]) || 1;
    const dx = suunta[0] / pituus; const dy = suunta[1] / pituus;
    const tapahtuma = (tyyppi, lisa = {}) => kohde.dispatchEvent(new ikkuna.PointerEvent(tyyppi, {
      bubbles: true, cancelable: true, composed: true, pointerId: 7, pointerType, isPrimary: true,
      clientX: x, clientY: y, buttons: tyyppi === 'pointerup' ? 0 : 1, button: 0, ...lisa,
    }));
    const ruutu = () => { const p = pallo.getScreenCoords(viite.lat, viite.lng); return p ? { x: p.x, y: p.y } : null; };
    aloita();
    tapahtuma('pointerdown');
    const alku = nyt();
    let edellinenRuutu = ruutu();
    let edellinenT = alku;
    await new Promise((valmis) => {
      const askel = () => {
        const t = nyt(); const dt = t - edellinenT; edellinenT = t;
        x += dx * nopeusPx * dt / 1000; y += dy * nopeusPx * dt / 1000;
        tapahtuma('pointermove');
        const nykyinen = ruutu();
        const kehys = tila?.kehykset.at(-1);
        if (kehys && nykyinen && edellinenRuutu) kehys.siirtyma = Math.hypot(nykyinen.x - edellinenRuutu.x, nykyinen.y - edellinenRuutu.y);
        edellinenRuutu = nykyinen;
        if (t - alku < kesto) alkuperainenRaf.call(ikkuna, askel); else valmis();
      };
      alkuperainenRaf.call(ikkuna, askel);
    });
    tapahtuma('pointerup');
    const tulos = lopeta();
    return { ...tulos, tasaisuus: tasaisuus(tulos), nopeusPx, pointerType };
  };
  const tasaisuus = (tulos) => {
    const k = (tulos?.kehykset ?? []).filter((f) => Number.isFinite(f.siirtyma)).slice(2);
    if (!k.length) return null;
    const s = k.map((f) => f.siirtyma);
    const ka = s.reduce((a, b) => a + b, 0) / s.length;
    const hajonta = Math.sqrt(s.reduce((a, b) => a + (b - ka) ** 2, 0) / s.length);
    const pysahdykset = k.filter((f) => f.siirtyma < 0.25);
    let pisin = 0; let jakso = 0;
    for (const f of k) { if (f.siirtyma < 0.25) { jakso += f.dt; pisin = Math.max(pisin, jakso); } else jakso = 0; }
    // Siirtymä kehyksen kestoon suhteutettuna: tasainen liike = vakio px/ms.
    const nopeudet = k.map((f) => f.siirtyma / Math.max(1, f.dt));
    const nka = nopeudet.reduce((a, b) => a + b, 0) / nopeudet.length;
    const nhajonta = Math.sqrt(nopeudet.reduce((a, b) => a + (b - nka) ** 2, 0) / nopeudet.length);
    return {
      kehyksia: k.length, siirtymaKa: ka, siirtymaHajonta: hajonta, vaihtelu: ka ? hajonta / ka : null,
      nopeusVaihtelu: nka ? nhajonta / nka : null, pysahdyksia: pysahdykset.length, pisinPysahdysMs: pisin,
      dtP95: prosenttipiste(k.map((f) => f.dt), 0.95),
    };
  };
  const vetoTeksti = (v) => {
    const t = v?.tasaisuus; if (!t) return 'ei vetoa';
    return `veto ${v.nopeusPx} px/s (${v.pointerType}): siirtymä/kehys ka ${p(t.siirtymaKa, 2)} px, hajonta/ka ${p((t.vaihtelu ?? 0) * 100, 0)} % (px/ms-vaihtelu ${p((t.nopeusVaihtelu ?? 0) * 100, 0)} %), pysähdyksiä ${t.pysahdyksia}/${t.kehyksia}, pisin ${p(t.pisinPysahdysMs, 0)} ms, dt p95 ${p(t.dtP95)}`;
  };
  /*
   * ══ OTOS EI KATKAISE MITTAUSTA (Laitetestaajan löydös 22.9.2026) ══
   *
   * Ruutunäyttö sulki ja avasi mittauksen kolmen sekunnin välein, ja
   * koska profiili on SINGLETON, se katkaisi samalla mittauspalvelimen
   * otoksen: neljä eri koetta sai kukin saman ~47 kehyksen pätkän,
   * vaikka harness pyysi kymmenen sekuntia.
   *
   * Nyt mittaus jää auki ja lukijat ottavat siitä VIIPALEITA: `otos(ms)`
   * palauttaa viimeiset ms millisekuntia samassa muodossa kuin
   * `lopeta()`, koskematta mittaukseen. Kumpikin lukija näkee siis oman
   * ikkunansa, eikä harnessin `lopeta()` jää ruutunäytön jalkoihin.
   */
  return {
    aloita,
    lopeta,
    tiivista,
    teksti,
    lue,
    veto,
    tasaisuus,
    vetoTeksti,
    ketjuja: () => ketjuja,
    /** Onko mittaus käynnissä (ruutunäyttö ei käynnistä päälle). */
    kaynnissa: () => Boolean(tila?.kaynnissa),
    /**
     * Viimeisten `ms` millisekuntien kehykset ilman, että mittaus
     * pysähtyy. Sama muoto kuin `lopeta()`, joten `tiivista` kelpaa.
     */
    otos: (ms) => {
      if (!tila) return null;
      const kehykset = tila.kehykset;
      const loppu = kehykset.length ? kehykset[kehykset.length - 1].t : 0;
      const raja = loppu - Math.max(0, Number(ms) || 0);
      const alku = kehykset.findIndex((k) => k.t >= raja);
      return { alku: tila.alku, kehykset: alku < 0 ? [] : kehykset.slice(alku) };
    },
  };
}

/** Asenna `globalThis.__kehysprofiili` (kerran). */
export function asennaKehysprofiili(ui, ikkuna = globalThis) {
  if (ikkuna.__kehysprofiili) return ikkuna.__kehysprofiili;
  ikkuna.__kehysprofiili = luoKehysprofiili(ui, ikkuna);
  return ikkuna.__kehysprofiili;
}
