/*
 * NIMIÖIDEN SULAVUUSMITTARI (omistaja 21.9.2026, Raamatun loki "KARTAN
 * SULAVUUS ENSIN"; Fablen erä E1).
 *
 * Google Earthin mitta: nimiö pysyy kiinni maapisteessään panoroinnissa
 * ja zoomissa ilman hyppyjä tai jälkeen jäämistä, ja sen koko muuttuu
 * zoomin aikana jatkuvasti, ei portaina. Sama kaupunkien nimille
 * (.pallolauta-nimi) ja nostojen nimiöille (.pallolauta-nosto).
 *
 * Mittari on sivun sisällä, joten sama luku saadaan savukkeesta
 * (tools/savukkeet/savuke-nimiot-sulavat.mjs, ikkunallinen Chromium)
 * JA oikealta laitteelta (Laitetestaaja: kehittäjätilassa
 * `matkakirja.ui.pallolauta.sulavuus.aloita()`, ele, `.lopeta()` →
 * yhteenveto konsoliin). Näyte otetaan joka kehyksessä
 * requestAnimationFramella, joka rekisteröidään pallon silmukan
 * jälkeen: se näkee saman kehyksen DOM-tilan, jonka CSS2D-kerros
 * juuri kirjoitti. Jokaisesta merkistä luetaan
 *
 *   - maapisteen ruutukohta  = pallo.getScreenCoords(lat, lng)
 *   - nimiön ruutukohta      = sisäryhmän (.pallolauta-*-siirto)
 *                              getBoundingClientRect-keskipiste
 *   - koko                   = nostolla ryhmän scale(), nimellä font-size,
 *                              kumpikin kerrottuna SVG-kuoren skaalalla
 *                              (E2: kuori liukuu joka kehys, nimet.js
 *                              KOKO LIUKUU JOKA KEHYKSESSÄ).
 *
 * SIIRTYMÄ NORMALISOIDAAN KOOLLA (siirtymanMuutokset): nimiö istuu
 * ikoninsa kyljessä koon verran sivussa, ja zoomissa etäisyys kasvaa
 * koon mukana — se on geometriaa, ei hyppy. Kun nimiö pysyy kiinni
 * maassa, kokoon skaalattu siirtymä on vakio, ja mittari on sen suurin
 * muutos eleen ensimmäiseen kehykseen nähden (mediaani ja p95, px).
 *
 * KOON LIUKUVUUS (koonLiukuvuus): kehykset, joissa kamera liikkui —
 * kuinka monessa koko muuttui (liukuva koko: lähes kaikissa); PORRAS on
 * yhden kehyksen kokohyppy, joka on selvästi suurempi kuin kameran
 * mittakaavan muutos samassa kehyksessä (liikeaskel), tai levossa
 * tuleva hyppy kun kamera ei liiku (lepoaskel).
 */

/** Elementin laskettu skaala (matrix-muunnoksen a-alkio), 1 jos ei muunnosta. */
function laskettuSkaala(el) {
  if (!el) return 1;
  const m = /matrix\(([-\d.e]+),/.exec(getComputedStyle(el).transform ?? '');
  return m ? Math.abs(Number(m[1])) : 1;
}

/**
 * Ennustettu maapiste (Karttasepän E4b): kun kehyksen mitoissa on
 * `ennuste.pov` ja lauta antaa `ruutupisteEnnusteesta(pov, lat, lng)`,
 * nimiön paikkaa verrataan MYÖS siihen. Ilman ennustetta null.
 */
function ennustettuMaa(s, l) {
  const ennuste = l.viimeisinKehys?.()?.ennuste ?? null;
  if (!ennuste?.pov || typeof l.ruutupisteEnnusteesta !== 'function') return null;
  const p = l.ruutupisteEnnusteesta(ennuste.pov, s.lat, s.lng);
  return p && Number.isFinite(p.x) ? p : null;
}

/** Yhden merkin näyte: siirtymä maapisteestä (px), ennustevirhe ja koko. */
function lueMerkki(s, l, koti) {
  const maa = l.pallo.getScreenCoords(s.lat, s.lng, 0);
  if (!maa) return null;
  const ennuste = ennustettuMaa(s, l);
  const r = s.g.getBoundingClientRect();
  if (!r.width && !r.height) return null;
  // Kuori (svg) liukuu kehyksittäin; pohja on sisäryhmässä (E2).
  const kuori = laskettuSkaala(s.g.closest('svg'));
  let koko = 0;
  if (s.laji === 'nosto') {
    koko = laskettuSkaala(s.g) * kuori;
  } else {
    koko = (Number(s.teksti?.getAttribute('font-size') ?? 0)
      || parseFloat(getComputedStyle(s.teksti ?? s.g).fontSize) || 0) * kuori;
  }
  const x = r.left + r.width / 2 - koti.left;
  const y = r.top + r.height / 2 - koti.top;
  return {
    dx: x - maa.x,
    dy: y - maa.y,
    // Ennustevirhe: nimiö vs. ennustettu maapiste (E4b). Puuttuu ilman ennustetta.
    ...(ennuste ? { edx: x - ennuste.x, edy: y - ennuste.y } : {}),
    koko,
  };
}

/**
 * Mittari laudalle. `lauta` = ui.pallolauta (kotelo, pallo, kamera, merkit).
 */
export function luoSulavuusmittari(lauta, doc = globalThis.document) {
  let tila = null;
  const aloita = () => {
    if (tila?.kaynnissa) return tila.seurattavia;
    const kaikki = [...doc.querySelectorAll('.pallolauta-nosto[data-nosto], .pallolauta-nimi[data-kaupunki]')];
    const seurattavat = kaikki.map((el) => {
      const d = lauta.merkit?.datum?.(el);
      const g = el.querySelector('.pallolauta-nosto-siirto, .pallolauta-nimi-siirto');
      if (!d || !g || !Number.isFinite(d.lat) || !Number.isFinite(d.lng)) return null;
      return {
        el, g, teksti: el.querySelector('text'),
        avain: el.dataset.nosto ?? `kaupunki:${el.dataset.kaupunki}`,
        lat: d.lat, lng: d.lng, laji: el.dataset.nosto ? 'nosto' : 'nimi',
      };
    }).filter(Boolean);
    tila = { naytteet: [], kaynnissa: true, seurattavia: seurattavat.length };
    const askel = () => {
      if (!tila.kaynnissa) return;
      const koti = lauta.kotelo.getBoundingClientRect();
      const skaala = lauta.kamera?.nakyvaAlue?.()?.skaala ?? 0;
      const merkit = {};
      for (const s of seurattavat) {
        if (!s.el.isConnected || s.el.classList.contains('pallolauta-poistuu')) continue;
        const m = lueMerkki(s, lauta, koti);
        if (m) merkit[s.avain] = m;
      }
      tila.naytteet.push({ t: globalThis.performance.now(), skaala, merkit });
      globalThis.requestAnimationFrame(askel);
    };
    globalThis.requestAnimationFrame(askel);
    return seurattavat.length;
  };
  const lopeta = () => {
    if (!tila) return [];
    tila.kaynnissa = false;
    return tila.naytteet;
  };
  return {
    aloita,
    lopeta,
    /** Laitetestaajalle: lopeta ja tulosta yhteenveto. */
    yhteenveto: () => {
      const naytteet = lopeta();
      const ulos = {
        kehyksia: naytteet.length,
        fps: kehysnopeus(naytteet),
        siirtyma: siirtymanMuutokset(naytteet),
        // E4b: nimiö vs. ennustettu maapiste (null ilman ennustetta).
        ennustevirhe: ennustevirhe(naytteet),
        koko: koonLiukuvuus(naytteet),
      };
      globalThis.console?.log?.('sulavuus', JSON.stringify(ulos));
      return ulos;
    },
  };
}

/** Kehyksiä sekunnissa näytteistä. */
export function kehysnopeus(naytteet) {
  if (naytteet.length < 2) return 0;
  const kesto = (naytteet.at(-1).t - naytteet[0].t) / 1000;
  return kesto > 0 ? Number(((naytteet.length - 1) / kesto).toFixed(1)) : 0;
}

/** Siirtymän muutos eleen ensimmäiseen kehykseen nähden: mediaani ja p95 (px). */
export function siirtymanMuutokset(naytteet) {
  if (naytteet.length < 2) return { mediaani: 0, p95: 0, n: 0, pahin: null };
  const alku = naytteet[0].merkit;
  const arvot = [];
  let pahin = null;
  for (const n of naytteet.slice(1)) {
    for (const [avain, m] of Object.entries(n.merkit)) {
      const a = alku[avain];
      if (!a) continue;
      const k = a.koko && m.koko ? a.koko / m.koko : 1;
      const ero = Math.hypot(m.dx * k - a.dx, m.dy * k - a.dy);
      arvot.push(ero);
      if (!pahin || ero > pahin.ero) pahin = { avain, ero: Number(ero.toFixed(2)), t: Math.round(n.t - naytteet[0].t) };
    }
  }
  arvot.sort((x, y) => x - y);
  const q = (p) => arvot[Math.min(arvot.length - 1, Math.floor(arvot.length * p))] ?? 0;
  return { mediaani: Number(q(0.5).toFixed(2)), p95: Number(q(0.95).toFixed(2)), n: arvot.length, pahin };
}

/**
 * Ennustevirhe (E4b): nimiön siirtymä ENNUSTETUSTA maapisteestä —
 * sen muutos eleen ensimmäiseen kehykseen nähden (mediaani ja p95,
 * px). Kun Karttasepän koukku siirtää merkit ennusteeseen, tämän pitää
 * olla ~0 ja "siirtymä todellisesta" näyttää yhden kehyksen johdon.
 * Null, jos näytteissä ei ole ennustetta.
 */
export function ennustevirhe(naytteet) {
  // Sama mitta kuin siirtymanMuutokset: nimiö istuu ikoninsa kyljessä,
  // joten raaka etäisyys maapisteestä on sovittelun offset — mitataan
  // sen MUUTOS ensimmäiseen kehykseen nähden, koolla normalisoituna.
  const alku = naytteet.find((n) => Object.values(n.merkit).some((m) => Number.isFinite(m.edx)))?.merkit;
  if (!alku) return null;
  const arvot = [];
  for (const n of naytteet) {
    for (const [avain, m] of Object.entries(n.merkit)) {
      const a = alku[avain];
      if (!a || !Number.isFinite(m.edx) || !Number.isFinite(a.edx)) continue;
      const k = a.koko && m.koko ? a.koko / m.koko : 1;
      arvot.push(Math.hypot(m.edx * k - a.edx, m.edy * k - a.edy));
    }
  }
  if (!arvot.length) return null;
  arvot.sort((x, y) => x - y);
  const q = (p) => arvot[Math.min(arvot.length - 1, Math.floor(arvot.length * p))] ?? 0;
  return { mediaani: Number(q(0.5).toFixed(2)), p95: Number(q(0.95).toFixed(2)), n: arvot.length };
}

/** Koon liukuvuus: osuus liikkeen kehyksistä, joissa koko muuttui, ja portaat. */
export function koonLiukuvuus(naytteet) {
  let liikkui = 0;
  let liikkuiJaKokoMuuttui = 0;
  let suurinLepoaskel = 0;
  let suurinLiikeaskel = 0;
  for (let i = 1; i < naytteet.length; i += 1) {
    const e = naytteet[i - 1];
    const n = naytteet[i];
    const kameraLiikkui = Math.abs(n.skaala - e.skaala) > 1e-9;
    const skaalanMuutos = e.skaala ? Math.abs(n.skaala / e.skaala - 1) : 0;
    let kokoMuuttui = false;
    let suurin = 0;
    for (const [avain, m] of Object.entries(n.merkit)) {
      const a = e.merkit[avain];
      if (!a || !a.koko || !m.koko) continue;
      const suhde = Math.abs(m.koko / a.koko - 1);
      if (suhde > 1e-4) kokoMuuttui = true;
      suurin = Math.max(suurin, suhde);
    }
    if (kameraLiikkui) {
      liikkui += 1;
      if (kokoMuuttui) liikkuiJaKokoMuuttui += 1;
      suurinLiikeaskel = Math.max(suurinLiikeaskel, Math.max(0, suurin - 3 * skaalanMuutos));
    } else {
      suurinLepoaskel = Math.max(suurinLepoaskel, suurin);
    }
  }
  return {
    liikkui,
    liikkuiJaKokoMuuttui,
    osuus: liikkui ? Number((liikkuiJaKokoMuuttui / liikkui).toFixed(2)) : 0,
    lepoaskel: Number(suurinLepoaskel.toFixed(3)),
    liikeaskel: Number(suurinLiikeaskel.toFixed(3)),
  };
}
