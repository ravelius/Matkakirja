// KOHDEKARTAN REUNAVARA PIKSELEINÄ (Karttaseppä 13.10.2026, PT juna 189, #4573:n Canberra-löydös).
//
// Kiinteä 150 m:n reunavara (kohdekartat.mjs REUNA) on 7 km:n kartalla iPhonella 8 px — vähemmän kuin numeroympyrän
// säde — ja oikean ylänurkan opaste "Napauta nähtävyyttä, saat lisätietoja." peittää kapealla ruudulla 55 % kartan
// leveydestä. Siksi vara mitataan laitteen pikseleinä: kartta näytetään kehyksen levyisenä (korkeus kuvasuhteesta),
// joten kohteen paikka pikseleinä on suoraPiste(rajat) × kehyksen koko, ja opasteet ovat kiinteitä pikselilaatikoita.
//
// Mitat on MITATTU pelin omasta piirrosta (tools/paakaupungit/tarkista-kohdekarttavarat.mjs, getBoundingClientRect,
// 13.10.2026): numeromerkki on soikio 26 × 46 px (Bratislavan kuva iPhonella); opaste iPhonella 197 × 34 px (kaksi riviä), iPadilla 203 × 21 px, 7 px reunasta;
// Kokoruutu-vihje 78 × 20 px oikeassa alakulmassa 6 px reunasta; mittajana vasemmassa alakulmassa (left 3,2 %,
// bottom 5 %, leveys mittakaava().ydinOsuus) ja sen teksti 10 px janan yllä. Ihmeen selite (vasen ylänurkka) näkyy vain
// kartalla, jolla on ihmekohteita — pääkaupunkikartoilla ei ole (13.10.), joten se tarkistetaan vain lipulla.
//
// Väli opasteeseen 2 px (1 px jätti Andorran Santa Coloman pyöristyksen varaan).
//
// korjaaVarat() laajentaa rajausta sivu kerrallaan: jokaiselle rikkeelle kokeillaan kahta sivua (opaste: ylä tai oikea,
// Kokoruutu: ala tai oikea, mittajana: ala tai vasen, reuna: se reuna) ja valitaan pienin pinta-alan kasvu. Kohde ei
// siirry — kartta kasvaa sen ympärillä (kuten Masqatissa ja Samarkandissa käsin, tools/tarkista-karttapisteet.mjs).
import { karttaKuvasuhde, mittakaava } from '../../js/packs/maakartat.js';

export const MERKKI_RX = 13; // px, numeromerkin (soikio) puolileveys
export const MERKKI_RY = 23; // px, puolikorkeus
export const REUNA_PX = 8;   // px, ympyrän reunasta kehyksen reunaan vähintään
export const LAITTEET = { iphone: 360, ipad: 1008 }; // kehyksen leveys px (ks. tarkista-kohdekarttavarat.mjs)
const mLat = 110574;
const mLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180);

function esteet(W, H, kartta, ihmeita) {
  const o = W < 600 ? { w: 197, h: 34 } : { w: 203, h: 21 };
  const e = [
    { nimi: 'opaste', x: W - 7 - o.w, y: 7, w: o.w, h: o.h, sivut: ['pohjoinen', 'ita'] },
    { nimi: 'kokoruutu', x: W - 84, y: H - 26, w: 78, h: 20, sivut: ['etela', 'ita'] },
  ];
  if (ihmeita) e.push({ nimi: 'ihmeselite', x: 6, y: 7, w: 130, h: 18, sivut: ['pohjoinen', 'lansi'] });
  const jana = mittakaava(kartta);
  if (jana) {
    const jx = 0.032 * W, jw = (jana.ydinOsuus / 100) * W, jy = 0.95 * H - 6;
    const tw = jana.teksti.length * 5.5 + 6;
    e.push({ nimi: 'mittajana', x: jx, y: jy, w: jw, h: 6, sivut: ['etela', 'lansi'] });
    e.push({ nimi: 'mittajanan teksti', x: jx + jw / 2 - tw / 2, y: jy - 11, w: tw, h: 10, sivut: ['etela', 'lansi'] });
  }
  return e;
}

/** Rikkeet yhdellä laitteella: [{ kohde, nimi, sivut }]. pisteet = [{ nimi, lat, lon }]. */
export function rikkeet(rajat, pisteet, W, { ihmeita = false, laajennus = null } = {}) {
  const H = W / karttaKuvasuhde(rajat);
  const kartta = { rajat, ...(laajennus ? { piirtoRajat: laajenna(rajat, laajennus) } : {}) };
  const E = esteet(W, H, kartta, ihmeita), RX = MERKKI_RX, RY = MERKKI_RY, ulos = [];
  for (const p of pisteet) {
    // p.siirto[W] = { dx, dy }: pelin hajautuksen (nahtavyydet.js hajautaPiirrospisteet, merkkien väli 46 px) mitattu
    // siirtymä tällä kehysleveydellä (korjaa-kohdekarttavarat.mjs --mitattu). Malli ei laske hajautusta itse.
    const s = p.siirto?.[W] ?? { dx: 0, dy: 0 };
    const x = ((p.lon - rajat.lansi) / (rajat.ita - rajat.lansi)) * W + s.dx;
    const y = ((rajat.pohjoinen - p.lat) / (rajat.pohjoinen - rajat.etela)) * H + s.dy;
    if (x < RX + REUNA_PX) ulos.push({ kohde: p.nimi, nimi: 'reuna', sivut: ['lansi'] });
    if (W - x < RX + REUNA_PX) ulos.push({ kohde: p.nimi, nimi: 'reuna', sivut: ['ita'] });
    if (y < RY + REUNA_PX) ulos.push({ kohde: p.nimi, nimi: 'reuna', sivut: ['pohjoinen'] });
    if (H - y < RY + REUNA_PX) ulos.push({ kohde: p.nimi, nimi: 'reuna', sivut: ['etela'] });
    for (const e of E) {
      if (x + RX + 2 > e.x && x - RX - 2 < e.x + e.w && y + RY + 2 > e.y && y - RY - 2 < e.y + e.h) ulos.push({ kohde: p.nimi, nimi: e.nimi, sivut: e.sivut });
    }
  }
  return ulos;
}

export const kaikkiRikkeet = (rajat, pisteet, opt = {}) =>
  Object.entries(LAITTEET).flatMap(([laite, W]) => rikkeet(rajat, pisteet, W, opt).map((r) => ({ ...r, laite })));

/** Sama laajennus kuin piirtäjässä (tools/piirra-kaupunkikartta.mjs piirretytRajat): keskeltä kertoimella. */
export function laajenna(r, k) {
  const cLat = (r.pohjoinen + r.etela) / 2, cLon = (r.ita + r.lansi) / 2;
  const dLat = ((r.pohjoinen - r.etela) / 2) * k, dLon = ((r.ita - r.lansi) / 2) * k;
  const p = (v) => Math.round(v * 1e5) / 1e5;
  return { pohjoinen: p(cLat + dLat), etela: p(cLat - dLat), lansi: p(cLon - dLon), ita: p(cLon + dLon) };
}

const pyorista = (r) => {
  const p = (v, ylos) => (ylos ? Math.ceil(v * 1e4 - 1e-9) : Math.floor(v * 1e4 + 1e-9)) / 1e4;
  return { pohjoinen: p(r.pohjoinen, true), etela: p(r.etela, false), lansi: p(r.lansi, false), ita: p(r.ita, true) };
};
const ala = (r) => (r.pohjoinen - r.etela) * (r.ita - r.lansi);
function siirra(r, sivu, osuus) {
  const n = { ...r }, dLat = (r.pohjoinen - r.etela) * osuus, dLon = (r.ita - r.lansi) * osuus;
  if (sivu === 'pohjoinen') n.pohjoinen += dLat; else if (sivu === 'etela') n.etela -= dLat;
  else if (sivu === 'ita') n.ita += dLon; else n.lansi -= dLon;
  return n;
}
function kuvasuhteeseen(r, min = 0.6, max = 1.4) { // korkeus/leveys metreinä 0,6–1,4 kuten kohdekartat.mjs
  const lat0 = (r.pohjoinen + r.etela) / 2, n = { ...r };
  const w = (n.ita - n.lansi) * mLon(lat0), h = (n.pohjoinen - n.etela) * mLat;
  if (h / w > max) { const d = (h / max - w) / 2 / mLon(lat0); n.ita += d; n.lansi -= d; }
  if (h / w < min) { const d = (w * min - h) / 2 / mLat; n.pohjoinen += d; n.etela -= d; }
  return n;
}

/**
 * Laajenna rajausta, kunnes yhdelläkään laitteella ei ole rikettä. Palauttaa { rajat, muuttui, jaljella }.
 * Kuvasuhdetta ei pakoteta, jos alkuperäinen on jo rajojen ulkopuolella (vanhat kartat, Bern 2,25:1) — silloin vain
 * estetään sen kasvu entisestään.
 */
export function korjaaVarat(rajat0, pisteet, opt = {}) {
  if (!kaikkiRikkeet(rajat0, pisteet, opt).length) return { rajat: { ...rajat0 }, muuttui: false, jaljella: [] };
  let r = { ...rajat0 };
  const lat0 = (r.pohjoinen + r.etela) / 2, h0 = (r.pohjoinen - r.etela) * mLat / ((r.ita - r.lansi) * mLon(lat0));
  const sMin = Math.min(0.6, h0), sMax = Math.max(1.4, h0);
  for (let kierros = 0; kierros < 80; kierros += 1) {
    const rr = kaikkiRikkeet(r, pisteet, opt);
    if (!rr.length) break;
    const kohde = rr[0];
    let paras = null;
    for (const sivu of kohde.sivut) {
      for (let osuus = 0.01; osuus <= 0.6; osuus += 0.01) {
        const n = kuvasuhteeseen(siirra(r, sivu, osuus), sMin, sMax);
        const jaa = kaikkiRikkeet(n, pisteet, opt).some((x) => x.kohde === kohde.kohde && x.nimi === kohde.nimi && x.laite === kohde.laite && x.sivut.join() === kohde.sivut.join());
        if (!jaa) { if (!paras || ala(n) < ala(paras)) paras = n; break; }
      }
    }
    if (!paras) break;
    r = pyorista(paras); // pyöristys ulospäin heti, ettei se lopussa palauta rikettä (Gaborone: lansi alas → Kgale Hill janan tekstiin)
  }
  const ulos = r;
  const muuttui = ['pohjoinen', 'etela', 'lansi', 'ita'].some((k) => Math.abs(ulos[k] - rajat0[k]) > 1e-9);
  return { rajat: muuttui ? ulos : { ...rajat0 }, muuttui, jaljella: kaikkiRikkeet(muuttui ? ulos : rajat0, pisteet, opt) };
}
