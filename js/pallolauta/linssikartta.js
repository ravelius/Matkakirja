/*
 * LINSSIKARTTA — tasokartta herää pallon päälle LINSSIN AJAKSI
 * (pallolauta vaihe 4; docs/moduulit/karttapallo.md luku 5
 * "Linssikartalle ja takaisin" ja luku 7 rivi 4).
 *
 * OMISTAJAN LINJAUKSET SANATARKASTI. 5.9.2026 (Raamattu KARTTAPALLO ON
 * PELILAUTA, LINSSIT VANHALLA KARTALLA): *"Linssit voi olla vanhalla
 * kartalla."* / *"Kunhan vanha kartta pysyy pois tieltä eikä hidasta
 * ollenkaan uuden kartan toimintaa."* 4.9.2026 (LINSSI BLOKKAA MUUN):
 * *"itse käynnistin linssin kesken kaiken mutta silti pitää kaikki muu
 * blokata varmuuden vuoksi kun linssi alkaa."*
 *
 * MITÄ KUORI ON. Linssin valinta matkalaukusta (js/ui.js valitseLinssi)
 * avaa tasokartan pallon päälle: Kartta herää lepotilasta (js/kartta.js
 * heraa → drawBoardFor), kamera jatkaa pallon näkymästä ilman ajoa, ja
 * linssi syttyy kartalle täsmälleen kuten ?lauta=kartta-pelissä
 * (js/linssit/*: kerrokset, radio, vertailu, maatiedot, aikajana).
 * Kehys on ohut: otsikkorivi (linssin nimi ja lyhyt selite) ja
 * Sulje-nappi samassa kulmassa, jossa vaiheen 1 väliaikainen "Palaa
 * pallolle" oli. Sulje on sama teko kuin laukun "Ei linssiä"
 * (valitseLinssi(null)). Aikajanan oma Sulje ja radion OFF päätyvät
 * samaan (js/ui.js pysaytaAikajana, tahdistaRadio → valitseLinssi(null)).
 *
 * KAMERA MOLEMPIIN SUUNTIIN. Avatessa pallon kameranTila (keskipiste
 * laudalla + näkyvä leveys lautayksikköinä) ajetaan kartalle kestolla 0
 * (pallonNakymaKartalle). Suljettaessa kartan viimeinen näkymä
 * (Kartta.kameranTila: keskipiste + skaala px/yks → leveys = ruudun
 * leveys / skaala) ajetaan pallolle kestolla 0 häivytyksen alla
 * (kartanNakymaPallolle). Vartija: tests/linssikartta.test.mjs ±5 %.
 *
 * SIIRTYMÄT ANIMOIDAAN (Raamattu KAIKKI LIIKE ANIMOIDAAN PEHMEÄSTI):
 * avatessa pallo häipyy LINSSIKARTAN_SIIRTYMA_MS heränneen kartan päältä
 * ja kehys häivyttyy sisään; pallon kuori piilotetaan (render-silmukka
 * tauolle) vasta häivytyksen jälkeen. Suljettaessa pallo näytetään
 * läpinäkyvänä kartan päällä, kamera asetetaan, ja häivytys sisään —
 * kartta puretaan (nuku → puraLauta → svg#board tyhjä, pyramidi seis)
 * vasta kun pallo peittää sen. Reduced motion: 0 ms, kaikki samassa
 * vuorossa. Tila (ui.linssikartta, body.linssikartta-auki, Kartta hereillä)
 * vaihtuu aina HETI kutsussa — häivytys on pelkkä kuva.
 *
 * LINSSI BLOKKAA MUUN: kuoren ajaksi Liiku (ui.vaihdaLiuku, Matkusta-
 * nappi) ja lehtien avaajat (ui.avaaTutkinta: kaupungin napautus ja
 * Tutki-nappi) ovat kiinni; sulkeminen palauttaa. Portit ovat ui.js:ssä
 * ja lukevat ui.linssikartta-kenttää — yksi kenttä, ei hajautettuja
 * lippuja.
 */

/** Pallon ja kehyksen häivytys (ms); reduced motion → 0. */
export const LINSSIKARTAN_SIIRTYMA_MS = 250;

/**
 * Pallon näkymä kartan ajoksi: pallokamera.kameranTila() antaa
 * keskipisteen laudalla ja näkyvän leveyden lautayksiköinä — juuri
 * se, mitä Kartta.ajaKamera({ x, y, leveys }) pyytää.
 */
export function pallonNakymaKartalle(tila) {
  if (!tila || !Number.isFinite(tila.x) || !Number.isFinite(tila.y) || !(tila.leveys > 0)) return null;
  return { x: tila.x, y: tila.y, leveys: tila.leveys };
}

/**
 * Kartan viimeinen näkymä pallon ajoksi: Kartta.kameranTila() antaa
 * keskipisteen ja skaalan (px / lautayksikkö), joten näkyvä leveys
 * lautayksiköinä on ruudun leveys jaettuna skaalalla.
 */
export function kartanNakymaPallolle(tila, ruudunLeveys) {
  if (!tila || !Number.isFinite(tila.x) || !Number.isFinite(tila.y)) return null;
  if (!(tila.skaala > 0) || !(ruudunLeveys > 0)) return null;
  return { x: tila.x, y: tila.y, leveys: ruudunLeveys / tila.skaala };
}

/**
 * Linssikartan kuori pallolaudalle. `ui` on pelin UI, `lauta`
 * js/pallolauta/lauta.js:n olio (kuori, kamera, nayta, piilota).
 * `doc` on testattavuutta varten: Node-testi antaa pienen
 * DOM-jäljitelmän (tests/linssikartta.test.mjs).
 */
export function luoLinssikartta({ ui, lauta, doc = (typeof document === 'undefined' ? null : document) }) {
  let kehys = null; // kuoren kehys karttaruudussa
  let nimi = null; // otsikkorivin linssin nimi
  let selite = null; // otsikkorivin lyhyt selite
  let poistuva = null; // sulkemisen häivytyksessä poistuva kehys
  let ajastin = null; // häivytyksen loppu (piilotus tai purku)

  const kesto = () => (ui.reducedMotion ? 0 : LINSSIKARTAN_SIIRTYMA_MS);

  /** Häivytyksen jälkeen; kesto 0 → heti samassa vuorossa. */
  const haivytyksenJalkeen = (tee) => {
    clearTimeout(ajastin);
    ajastin = null;
    const ms = kesto();
    if (ms <= 0) { tee(); return; }
    ajastin = setTimeout(() => { ajastin = null; if (!ui.dead) tee(); }, ms);
  };

  /** Otsikkorivi seuraa valittua linssiä (ui.paivitaLinssiTiedot kutsuu). */
  const paivita = () => {
    if (!nimi || !selite) return;
    const linssi = ui.paallaOlevaLinssi?.() ?? null;
    nimi.textContent = linssi?.nimi ?? 'Isoisän kartta';
    selite.textContent = linssi?.lyhyt ?? 'Linssit ovat vanhalla kartalla; pallo odottaa alla.';
  };

  const rakennaKehys = () => {
    if (!doc || !ui.mapPane) return null;
    const el = doc.createElement('div');
    el.className = 'linssikartta-kehys';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'Linssikartta');
    const otsikko = doc.createElement('div');
    otsikko.className = 'linssikartta-otsikko';
    nimi = doc.createElement('span');
    nimi.className = 'linssikartta-nimi';
    selite = doc.createElement('span');
    selite.className = 'linssikartta-selite';
    otsikko.append(nimi, selite);
    const sulje = doc.createElement('button');
    sulje.type = 'button';
    sulje.className = 'linssikartta-sulje';
    sulje.textContent = 'Sulje';
    sulje.title = 'Sulje linssi ja palaa pallolle';
    sulje.setAttribute('aria-label', 'Sulje linssi ja palaa pallolle');
    // Linssin kuori suljetaan linssin kautta ("Ei linssiä"), jotta radio,
    // vertailu ja aikajana sammuvat samasta portista kuin laukusta.
    // Ilman linssiä avattu kuori (savukkeet) suljetaan suoraan.
    sulje.addEventListener('click', () => {
      if (ui.linssikartta?.linssi && ui.linssiValittu) ui.valitseLinssi(null);
      else ui.suljeLinssikartta();
    });
    el.append(otsikko, sulje);
    return el;
  };

  /**
   * Avaa kuoren: Kartta herää pallon näkymään, kehys päälle, pallo häipyy.
   * `tiedot.linssi` = true, kun avaus tuli linssin valinnasta (Sulje
   * kulkee silloin valitseLinssi(null):n kautta).
   */
  const avaa = (tiedot = {}) => {
    if (ui.dead || ui.linssikartta || !lauta) return false;
    const nakyma = lauta.kamera.kameranTila();
    ui.linssikartta = {
      lahto: ui.game.cityOf?.()?.id ?? null, linssi: false, ...tiedot, nakyma,
    };
    clearTimeout(ajastin);
    ajastin = null;
    poistuva?.remove();
    poistuva = null;
    doc?.body?.classList.add('linssikartta-auki');
    // Liiku kiinni: kuoressa ei matkusteta (linssi blokkaa muun).
    ui.suljeLiuku?.();
    // Kartta hereille pallon alle ja kamera pallon näkymään heti.
    ui.kartta.heraa();
    const kohde = pallonNakymaKartalle(nakyma);
    if (kohde) void ui.kartta.ajaKamera(kohde, { kesto: 0 });
    kehys?.remove();
    kehys = rakennaKehys();
    if (kehys) {
      ui.mapPane.appendChild(kehys);
      paivita();
      // Pakotettu asettelu: selain näkee alkuasennon omana tilanaan.
      void kehys.getBoundingClientRect?.();
      kehys.classList.add('esilla');
    }
    // Pallo häipyy heränneen kartan päältä; piiloon (render tauolle)
    // vasta häivytyksen jälkeen.
    lauta.kuori.classList.add('linssin-alla');
    haivytyksenJalkeen(() => lauta.piilota());
    ui.render();
    return true;
  };

  /**
   * Sulkee kuoren: pallon kamera kartan viimeiseen näkymään, pallo
   * häivyttyy kartan päälle, kartta puretaan häivytyksen jälkeen.
   * Kesken siirtoanimaation ei vaihdeta lautaa.
   */
  const sulje = () => {
    if (!ui.linssikartta || !lauta) return false;
    if (ui.busy || ui.movingPlayerId != null) return false;
    const takaisin = kartanNakymaPallolle(ui.kartta.kameranTila(), ui.mapPane?.clientWidth)
      ?? pallonNakymaKartalle(ui.linssikartta.nakyma);
    clearTimeout(ajastin);
    ajastin = null;
    ui.linssikartta = null;
    doc?.body?.classList.remove('linssikartta-auki');
    ui.suljeLiuku?.();
    kehys?.classList.remove('esilla');
    poistuva?.remove();
    poistuva = kehys;
    kehys = null;
    nimi = null;
    selite = null;
    // Pallo näkyviin läpinäkyvänä, kamera kartan näkymään, sitten
    // häivytys sisään — pakotettu asettelu alkuasennon väliin.
    lauta.kuori.classList.add('linssin-alla');
    lauta.nayta();
    if (takaisin) void lauta.kamera.ajaKamera(takaisin, { kesto: 0 });
    else void lauta.kamera.kotiin();
    void lauta.kuori.getBoundingClientRect?.();
    lauta.kuori.classList.remove('linssin-alla');
    haivytyksenJalkeen(() => {
      poistuva?.remove();
      poistuva = null;
      // Purku (nuku → ui.puraLauta): kerrokset pois, svg#board tyhjäksi,
      // pyramidi seis — vasta kun pallo peittää kartan.
      ui.kartta.nuku();
      ui.render();
    });
    return true;
  };

  const pura = () => {
    clearTimeout(ajastin);
    ajastin = null;
    kehys?.remove();
    poistuva?.remove();
    kehys = null;
    poistuva = null;
    nimi = null;
    selite = null;
    doc?.body?.classList.remove('linssikartta-auki');
    ui.linssikartta = null;
  };

  return {
    avaa,
    sulje,
    paivita,
    pura,
    auki: () => Boolean(ui.linssikartta),
    /** Kehys mittausta varten (savukkeet). */
    get kehys() { return kehys; },
  };
}
