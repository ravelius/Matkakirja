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
      // Laattojen tekstuuriviennit näytönohjaimelle (initTexture), kumulatiivinen.
      laattaVienteja: laatat.vienteja ?? 0, vientejaOdottaa: laatat.vientejaOdottaa ?? 0,
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
  /*
   * KIRJASTON NIMETTÖMÄT SILMUKAT NIMELLÄ (omistajan kaappaukset v2126:
   * "syy: function(){for(var t,n=arguments.length,r=new Ar"). Globe.gl on
   * kapsule-olio, jonka jokainen metodi on sama nimetön kääre, ja sen
   * kerrokset (arcs, paths, rings + neljä latauksessa luotua oletusoliota)
   * pyörittävät frame-tickereitä nimettömällä nuolella. Ilman nimeä
   * kolme eri asiaa näkyi yhtenä "Ar"-rivinä:
   *   globe.tick    globe.gl _animationCycle: ohjaimet + three.render
   *   globe.tweenit three-globe _animationCycle: tweenGroup.update
   *   globe.ticker  frame-tickerin onFrame (kerrosten animaatiot)
   * Nimi lasketaan kerran funktiota kohti (WeakMap): sama funktio-olio
   * rekisteröidään joka kehyksellä uudelleen.
   */
  const nimet = new WeakMap();
  const nimi = (fn) => {
    if (typeof fn !== 'function') return String(fn);
    const muistettu = nimet.get(fn);
    if (muistettu) return muistettu;
    const lahde = String(fn).replace(/\s+/g, ' ');
    let n = fn.name;
    if (!n) {
      if (fn === haeUi()?.pallonInstanssi?._animationCycle) n = 'globe.tick';
      else if (lahde.startsWith('function(){for(var t,n=arguments.length')) n = 'globe.tweenit';
      else if (lahde === 'function(){return e.onFrame()}') n = 'globe.ticker';
      else n = lahde.slice(0, 48);
    }
    nimet.set(fn, n);
    return n;
  };
  let kehysNyt = null;
  /** rAF-takaisinkutsun sisällä: sisäkkäinen render on jo kutsun ajassa. */
  let rafSyvyys = 0;
  /** Elossa olevat mittausketjut (ks. YKSI KETJU PER MITTAUS). */
  let ketjuja = 0;
  /*
   * KEHYSTEN KATTO. Ruutunäyttö (js/pallolauta/profiilinaytto.js) pitää
   * mittausta auki niin kauan kuin peli on auki, joten taulukolla on
   * oltava yläraja. 4000 kehystä on yli minuutti 60 Hz:llä — pidempää
   * otosta ei lue kukaan.
   */
  const KEHYSKATTO = 4000;
  const kirjaa = (avain, ms, sisakkainen = false) => {
    if (!kehysNyt) return;
    /*
     * js = rAF-kutsujen aika KERRAN. three.render ajetaan globe.tick-
     * kutsun sisällä, joten sen lisääminen js:ään laski renderin kahdesti
     * (v2126-kaappausten "js ka 4,0" sisälsi render 0,9 kahteen kertaan).
     */
    if (!sisakkainen) kehysNyt.js = (kehysNyt.js ?? 0) + ms;
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
      rafSyvyys += 1;
      try { return fn(t); } finally { rafSyvyys -= 1; kirjaa(nimi(fn), nyt() - a); }
    });
  };
  const puraRaf = () => { ikkuna.requestAnimationFrame = alkuperainenRaf; };
  let renderPurku = null;
  const kaariRender = () => {
    const r = haeUi()?.pallonInstanssi?.renderer?.();
    if (!r?.render || r.__kehysprofiili) return;
    const alkuperainen = r.render;
    r.render = function render(...args) { const a = nyt(); try { return alkuperainen.apply(this, args); } finally { kirjaa('three.render', nyt() - a, rafSyvyys > 0); if (kehysNyt) kehysNyt.render = (kehysNyt.render ?? 0) + (nyt() - a); kirjaaLiike(); } };
    r.__kehysprofiili = true;
    renderPurku = () => { r.render = alkuperainen; delete r.__kehysprofiili; };
  };
  if (kanava) kanava.port1.onmessage = () => { if (odottaa) { odottaa.kehys.varattu = ikkuna.performance.now() - odottaa.alku; odottaa = null; } };
  const nyt = () => ikkuna.performance.now();
  /*
   * ══ LIIKKEEN TASAISUUS: SORMI JA KARTTA SAMASSA KEHYKSESSÄ ══════════
   * (omistaja ja Fable 23.9.2026: kehysaika ei mittaa nähtyä nykimistä —
   * yli 20 ms:n kehysten putoaminen 25 % → 8 % ei muuttanut tuntumaa.)
   *
   * Vedon alussa otetaan talteen maapiste sormen alla (tartunta). Joka
   * renderin JÄLKEEN luetaan, missä se piste on ruudulla, ja samalla
   * sormen viimeisin paikka: ideaalissa piste pysyy sormen alla, joten
   *   - kartan siirtymä kehystä kohti = pisteen liike ruudulla (px)
   *   - liikevirhe = pisteen ja sormen etäisyys (ka = viive, sd = nyky)
   * Kehyksen alussa kirjataan, montako osoitin-/kosketustapahtumaa tuli
   * edellisen kehyksen jälkeen, ja syötteen ikä (viimeisimmän
   * tapahtuman aikaleimasta).
   *
   * KUUNTELIJAT PYSYVÄT: ruutunäyttö sulkee ja avaa mittauksen 3 s:n
   * välein, eikä veto saa katketa jakson rajalla. Kuuntelijat ovat
   * passiivisia ja kaappausvaiheessa, eivätkä ne koske tapahtumaan.
   */
  const sormi = {
    alhaalla: false, tartunta: null, x: 0, y: 0, ts: 0, tapahtumia: 0, kosketuksia: 0, vasen: 0, yla: 0, osoittimet: new Set(),
  };
  let sormiKuuntelee = false;
  const kuunteleSormea = () => {
    if (sormiKuuntelee || typeof ikkuna.addEventListener !== 'function') return;
    sormiKuuntelee = true;
    const kangas = () => haeUi()?.pallonInstanssi?.renderer?.()?.domElement ?? null;
    const alas = (e) => {
      sormi.osoittimet.add(e.pointerId);
      const el = kangas();
      const pallo = haeUi()?.pallonInstanssi;
      // Kaksi sormea = nipistys, ei vetoa: tartunta pois, kunnes kaikki nousevat.
      if (!el || !pallo || sormi.osoittimet.size !== 1) { sormi.tartunta = null; sormi.alhaalla = false; return; }
      const kotelo = haeUi()?.pallolauta?.kotelo ?? el.parentElement;
      if (kotelo?.contains && e.target && !kotelo.contains(e.target)) return;
      const r = el.getBoundingClientRect();
      sormi.vasen = r.left; sormi.yla = r.top;
      sormi.x = e.clientX - r.left; sormi.y = e.clientY - r.top; sormi.ts = e.timeStamp;
      let g = null;
      try { g = pallo.toGlobeCoords?.(sormi.x, sormi.y) ?? null; } catch { g = null; }
      sormi.tartunta = g && Number.isFinite(g.lat) && Number.isFinite(g.lng) ? { lat: g.lat, lng: g.lng } : null;
      sormi.alhaalla = Boolean(sormi.tartunta);
    };
    const liikkuu = (e) => {
      if (!sormi.alhaalla || e.isPrimary === false) return;
      sormi.x = e.clientX - sormi.vasen; sormi.y = e.clientY - sormi.yla; sormi.ts = e.timeStamp;
      sormi.tapahtumia += 1;
    };
    const kosketus = () => { if (sormi.alhaalla) sormi.kosketuksia += 1; };
    const ylos = (e) => {
      sormi.osoittimet.delete(e.pointerId);
      sormi.alhaalla = false; sormi.tartunta = null;
    };
    const valinnat = { capture: true, passive: true };
    ikkuna.addEventListener('pointerdown', alas, valinnat);
    ikkuna.addEventListener('pointermove', liikkuu, valinnat);
    ikkuna.addEventListener('touchmove', kosketus, valinnat);
    ikkuna.addEventListener('pointerup', ylos, valinnat);
    ikkuna.addEventListener('pointercancel', ylos, valinnat);
  };
  /** Renderin jälkeen: tartuntapisteen ruutupaikka ja sormi samaan kehykseen. */
  const kirjaaLiike = () => {
    if (!kehysNyt || !sormi.alhaalla || !sormi.tartunta) return;
    let p = null;
    try { p = haeUi()?.pallonInstanssi?.getScreenCoords?.(sormi.tartunta.lat, sormi.tartunta.lng) ?? null; } catch { p = null; }
    if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
    kehysNyt.kartta = { x: p.x, y: p.y };
    kehysNyt.sormi = { x: sormi.x, y: sormi.y };
    kehysNyt.syoteIka = nyt() - sormi.ts;
  };
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
    kaariRaf(); kaariRender(); kuunteleSormea();
    ketjuja += 1;
    const askel = () => {
      if (tila !== oma || !oma.kaynnissa) { ketjuja = Math.max(0, ketjuja - 1); return; }
      const t = nyt(); const dt = t - oma.t; oma.t = t;
      const kehys = { t: t - oma.alku, dt, varattu: null, js: 0, render: 0, ...lue() };
      // Syötteet edellisen kehyksen jälkeen (ks. LIIKKEEN TASAISUUS).
      kehys.alhaalla = sormi.alhaalla;
      kehys.syotteita = sormi.tapahtumia; sormi.tapahtumia = 0;
      kehys.kosketuksia = sormi.kosketuksia; sormi.kosketuksia = 0;
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
  /*
   * iOS-TYYLINEN SYÖTE (p5): `syote: 'ajastin'` lähettää pointermoven
   * omalla ajastimellaan `vali` ms:n välein rAF:sta riippumatta (iOS ei
   * tahdista pointermovea rAF:iin — ks. v2123), jolloin kehykseen osuu
   * vuoroin 0, 1 tai 2 tapahtumaa. `kuorma` (ms) = satunnainen 0…kuorma
   * ms:n pääsäikeen työ joka kehyksessä, joka siirtää kirjaston tickin
   * alkuhetkeä kuten laitteen muu työ.
   */
  const veto = async ({
    kesto = 3000, nopeusPx = 80, suunta = [1, 0.3], pointerType = 'touch', syote = 'raf', vali = 17.4, kuorma = 0,
  } = {}) => {
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
    let ajastin = 0;
    if (syote === 'ajastin') {
      let edellinen = nyt();
      const lahetä = () => {
        const t = nyt(); const d = t - edellinen; edellinen = t;
        x += dx * nopeusPx * d / 1000; y += dy * nopeusPx * d / 1000;
        tapahtuma('pointermove');
        ajastin = ikkuna.setTimeout(lahetä, vali);
      };
      ajastin = ikkuna.setTimeout(lahetä, vali);
    }
    await new Promise((valmis) => {
      const askel = () => {
        const t = nyt(); const dt = t - edellinenT; edellinenT = t;
        if (kuorma > 0) { const loppu = nyt() + Math.random() * kuorma; while (nyt() < loppu) { /* kuorma */ } }
        if (syote !== 'ajastin') {
          x += dx * nopeusPx * dt / 1000; y += dy * nopeusPx * dt / 1000;
          tapahtuma('pointermove');
        }
        const nykyinen = ruutu();
        const kehys = tila?.kehykset.at(-1);
        if (kehys && nykyinen && edellinenRuutu) kehys.siirtyma = Math.hypot(nykyinen.x - edellinenRuutu.x, nykyinen.y - edellinenRuutu.y);
        edellinenRuutu = nykyinen;
        if (t - alku < kesto) alkuperainenRaf.call(ikkuna, askel); else valmis();
      };
      alkuperainenRaf.call(ikkuna, askel);
    });
    if (ajastin) ikkuna.clearTimeout(ajastin);
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
