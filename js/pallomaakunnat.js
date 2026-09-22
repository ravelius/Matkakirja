/*
 * ======== MAAKUNTAVEKTORIT PALLOLLA (erä M1) ========================
 *
 * OMISTAJAN TOIVE (maakuntalinssi, Karttasepän luovutus 21.9.2026
 * kohta 4; Fable 22.9.2026: M1-kytkentä maapolygonien jälkeen):
 * nykyiset maakunnat pallon pinnalle VEKTORITASONA — admin-1-alueet
 * kolmioituna, väri kärkiattribuuttina, yksi piirtokutsu per maa,
 * napautus = piste polygonissa CPU:lla. Ei poltettua värilaattatasoa.
 *
 * AINEISTO (erä M0, tools/tee-maakuntavektorit.mjs): ämpärissä
 * `julisteet/pallo/maakunnat/<versio>/<ISO>.bin` (MKV1: float32 lon/lat,
 * uint16 alue, uint32 kolmiot) ja `<ISO>.json` (alueet: nimi, `vari`
 * 0…4 naapureista eri, keskipiste, laatikko, renkaiden kärkivälit).
 * Purkaja `puraMaa` ja osumatesti `pisteAlueessa` ovat SAMA KOPIO kuin
 * työkalussa; tests/maakuntavektorit-aineisto.test.mjs vertaa rungot
 * tekstinä (sama vartio kuin puraDelta, js/pallovektorit.js).
 *
 * MITEN:
 *  - Yksi Mesh per maa: BufferGeometry, jonka kärjet ovat pallon
 *    pinnalla `pallonPiste`-kaavalla (sama kuin laatoilla ja
 *    vektoreilla) ja väri kärkiattribuuttina (MeshBasicMaterial
 *    vertexColors, läpinäkyvä). Väri = alueen `vari` → PALETTI.
 *  - KOROTUS 1,2e-4 × säde: litteä kolmio painuu pinnan alle
 *    (1,5°:n särmän jänne 8,6e-5 × R); korotettuna kolmio pysyy koko
 *    matkaltaan pinnan päällä, ja loput hoitaa syvyyssiirto (−12 kuten
 *    viivoilla). Vektoriviivat (renderOrder −0,5) piirtyvät täytön
 *    (−0,6) päälle, koska kumpikaan ei kirjoita syvyyttä.
 *  - Maa vaihtuu pallolaudan `paivita`-ohjauksesta (asetaMaa), sama
 *    hetki kuin pelaajan maan korostuskehä (js/maanaariviivat.js).
 *    Aineisto haetaan kerran maata kohti ja pidetään muistissa
 *    (MAAKUNNAT_MUISTI maata), vaihto häipyy sisään.
 *  - OSUMA: `osuma(lat, lng)` käy maan alueet laatikko ensin ja sitten
 *    renkaat (reiät pois) — CPU:lla, ei säteenjäljitystä; päivämäärärajan
 *    ylittävät alueet (`saumassa`) luetaan pituusaste kierrettynä.
 *  - `valitse(indeksi)` korostaa yhden alueen (väri vahvemmaksi):
 *    linssin napautusvaste. Kerros ei tunne pelitilaa — linssi (Pelikoodari)
 *    päättää, mitä napautuksesta seuraa.
 *
 * OLETUKSENA POIS (`?maakunnat=1` tai localStorage-avain '1' kytkee):
 * sulavuus ensin (Raamattu 21.9.2026), ja aineisto viedään ämpäriin
 * vasta Fablen käskystä. Kerros ei koske muihin kerroksiin.
 */

import { kolmiulotteinen, pallonPiste } from './pallo.js';

/** Pelin ämpäri (sama osoite kuin js/pallo.js:ssä). */
const R2 = 'https://media.matkakirja.app/';
/** Aineiston versio = tools/tee-maakuntavektorit.mjs:n ajon kansio. */
export const PALLOMAAKUNNAT_VERSIO = '2026-09-22a';
export const PALLOMAAKUNNAT_JUURI = `${R2}julisteet/pallo/maakunnat/${PALLOMAAKUNNAT_VERSIO}/`;
export const PALLOMAAKUNNAT_OLETUS = false;
export const PALLOMAAKUNNAT_AVAIN = 'matkakirja-pallomaakunnat';
/** Korotus säteen osana: yli 1,5°:n särmän jänteen notkon (8,6e-5). */
export const MAAKUNNAT_KORKEUS = 1.2e-4;
/** Läpinäkyvien jonossa vektoriviivojen (−0,5) alla. */
export const MAAKUNNAT_RENDER_ORDER = -0.6;
/*
 * Syvyyssiirto: sama kuin vektoriviivoilla (−12). Laatat ovat −8 ja
 * hienommat tasot −10 (js/pallolaatat.js laatanSyvyyssiirto); −10:llä
 * täyttö JÄI LAATTOJEN ALLE (mitattu savukkeella: olio scenessä, peitto
 * 0,34, ei pikseliäkään), koska korotus 1,2e-4 × R on syvyyspuskurissa
 * alle yhden askeleen. Viivat piirtyvät silti täytön päälle: kumpikaan
 * ei kirjoita syvyyttä ja järjestys tulee renderOrderista.
 */
export const MAAKUNNAT_SYVYYSSIIRTO = -12;
export const MAAKUNNAT_PEITTO = 0.34;
export const MAAKUNNAT_VALITTU_PEITTO = 0.62;
export const MAAKUNNAT_HAIVE_MS = 260;
/** Muistissa pidettävät maat (puskurit puretaan vanhimmasta). */
export const MAAKUNNAT_MUISTI = 3;
/**
 * Paletti vanhan kartan sävyihin (pergamentin päälle 34 %:n peitolla):
 * ruoste, sammal, savi, taivas, okra. Työkalun `vari` on 0…4.
 */
export const MAAKUNNAT_PALETTI = Object.freeze([
  [0.72, 0.42, 0.28], [0.45, 0.58, 0.38], [0.70, 0.56, 0.36], [0.46, 0.56, 0.68], [0.78, 0.66, 0.30],
]);

/** Onko kerros päällä: `?maakunnat=0|1` voittaa muistetun, muistettu oletuksen. */
export function pallomaakunnatPaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('maakunnat');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch { /* ei osoitetta */ }
  try {
    const muistettu = ikkuna.localStorage?.getItem(PALLOMAAKUNNAT_AVAIN);
    if (muistettu === '0') return false;
    if (muistettu === '1') return true;
  } catch { /* yksityinen selaus */ }
  return PALLOMAAKUNNAT_OLETUS;
}

/* ---------------- aineiston purku (kopio työkalusta) ---------------- */

/** MKV1-puskuri takaisin kärjiksi, alueiksi ja kolmioiksi (pelin lukijan malli). */
export function puraMaa(puskuri) {
  const dv = new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== 'MKV1') throw new Error('ei MKV1');
  const K = dv.getUint32(4, true); const T = dv.getUint32(8, true); const A = dv.getUint32(12, true);
  const paikat = new Float32Array(K * 2); const alue = new Uint16Array(K); const kolmiot = new Uint32Array(T * 3);
  let o = 16;
  for (let i = 0; i < K * 2; i += 1) { paikat[i] = dv.getFloat32(o, true); o += 4; }
  for (let i = 0; i < K; i += 1) { alue[i] = dv.getUint16(o, true); o += 2; }
  o = 16 + K * 8 + Math.ceil((K * 2) / 4) * 4;
  for (let i = 0; i < T * 3; i += 1) { kolmiot[i] = dv.getUint32(o, true); o += 4; }
  return { paikat, alue, kolmiot, alueita: A };
}

/** Piste alueessa: ulkorenkaissa parillinen/pariton, reiät vähentävät. */
export function pisteAlueessa(paikat, renkaat, lon, lat) {
  let sisalla = false;
  for (const [alku, loppu] of renkaat) {
    for (let i = alku, j = loppu - 1; i < loppu; j = i, i += 1) {
      const xi = paikat[i * 2]; const yi = paikat[i * 2 + 1];
      const xj = paikat[j * 2]; const yj = paikat[j * 2 + 1];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) sisalla = !sisalla;
    }
  }
  return sisalla;
}

/* ---------------- puhtaat apurit ------------------------------------ */

/**
 * Alue, johon piste osuu, tai null. Laatikko ensin; päivämäärärajan
 * alueille (`saumassa`) pituusaste luetaan 0…360.
 */
export function osumaAlueissa(paikat, alueet, lon, lat) {
  for (let i = 0; i < alueet.length; i += 1) {
    const a = alueet[i];
    const [x0, y0, x1, y1] = a.laatikko;
    if (lat < y0 || lat > y1) continue;
    if (!a.saumassa && (lon < x0 || lon > x1)) continue;
    if (pisteAlueessa(paikat, a.renkaat, lon, lat)) return i;
    if (a.saumassa && pisteAlueessa(paikat, a.renkaat, lon > 0 ? lon - 360 : lon + 360, lat)) return i;
  }
  return null;
}

/**
 * Kärkien paikat pallolla (Float32, xyz) ja värit (Float32, rgb) —
 * puhdas muunnos puskurista geometriaksi, testattavissa ilman three.js:ää.
 */
export function maakuntienKarjet(maa, alueet, sade, valittu = null, paletti = MAAKUNNAT_PALETTI) {
  const K = maa.alue.length;
  const paikat = new Float32Array(K * 3);
  const varit = new Float32Array(K * 3);
  const r = sade * (1 + MAAKUNNAT_KORKEUS);
  for (let i = 0; i < K; i += 1) {
    const p = pallonPiste(maa.paikat[i * 2 + 1], maa.paikat[i * 2], r);
    paikat[i * 3] = p.x; paikat[i * 3 + 1] = p.y; paikat[i * 3 + 2] = p.z;
    const alue = maa.alue[i];
    const vari = paletti[(alueet[alue]?.vari ?? 0) % paletti.length];
    // Valittu alue vahvemmalla: väri kohti täyttä sävyä (peitto on materiaalissa yhteinen).
    const k = alue === valittu ? MAAKUNNAT_VALITTU_PEITTO / MAAKUNNAT_PEITTO : 1;
    varit[i * 3] = Math.min(1, vari[0] * k); varit[i * 3 + 1] = Math.min(1, vari[1] * k); varit[i * 3 + 2] = Math.min(1, vari[2] * k);
  }
  return { paikat, varit };
}

/**
 * INDEKSIN LUOKKA. `kolmiulotteinen` lukee attribuutin luokan elävän
 * laatan position-attribuutista, ja se on Float32BufferAttribute: se
 * MUUNTAA annetun taulukon Float32:ksi. Kolmioiden indeksit menivät
 * sillä liukuluvuiksi eikä WebGL piirtänyt kolmiotakaan (mitattu:
 * olio scenessä, index.array Float32Array, ei pikseliä edes depthTest
 * pois). Kantaluokka BufferAttribute säilyttää Uint32Arrayn: noustaan
 * prototyyppiketjua, kunnes luokka ei muunna.
 */
export function indeksiluokka(Attribuutti) {
  let L = Attribuutti;
  for (let i = 0; L && i < 4; i += 1) {
    try {
      const koe = new L(new Uint32Array([1, 2, 3]), 1);
      if (koe.array instanceof Uint32Array) return L;
    } catch { /* ei kelpaa */ }
    L = Object.getPrototypeOf(L.prototype)?.constructor ?? null;
  }
  return Attribuutti;
}

/* ---------------- kerros ------------------------------------------------ */

/**
 * @param {{ pallo: object, kotelo: Element, ikkuna?: object, juuri?: string }} p
 * @returns {{ asetaMaa: function, osuma: function, valitse: function, mittarit: function, pura: function, valmis: Promise }}
 */
export function luoPallomaakunnat({ pallo, ikkuna = globalThis, juuri = PALLOMAAKUNNAT_JUURI }) {
  const mittarit = {
    tila: 'kaynnistyy', syy: '', maa: null, alueita: 0, karkia: 0, kolmioita: 0, tavua: 0,
    pyyntoja: 0, rakennusMs: 0, valittu: null, muistissa: 0, nakyy: false,
  };
  /** iso → { maa, alueet, olio, geometria, materiaali, tavua, kaytto } */
  const muisti = new Map();
  let kolmi = null;
  let nykyinen = null;
  let valittu = null;
  let purettu = false;
  let kello = 0;
  const nyt = () => ikkuna.performance?.now?.() ?? Date.now();
  const reduced = () => Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

  const luokat = () => {
    if (kolmi) return kolmi;
    const k = kolmiulotteinen(pallo);
    if (!k?.Mesh || !k.BufferGeometry || !k.BufferAttribute || !k.PerusMateriaali) return null;
    kolmi = { ...k, Indeksi: indeksiluokka(k.BufferAttribute) };
    return kolmi;
  };

  const hae = async (iso) => {
    mittarit.pyyntoja += 2;
    const [bin, json] = await Promise.all([
      ikkuna.fetch(`${juuri}${iso}.bin`, { mode: 'cors', credentials: 'omit' }),
      ikkuna.fetch(`${juuri}${iso}.json`, { mode: 'cors', credentials: 'omit' }),
    ]);
    if (!bin.ok || !json.ok) throw new Error(`maakunnat ${iso}: ${bin.status}/${json.status}`);
    const puskuri = new Uint8Array(await bin.arrayBuffer());
    const alueet = (await json.json()).alueet ?? [];
    return { maa: puraMaa(puskuri), alueet, tavua: puskuri.byteLength };
  };

  const piilota = (tietue) => {
    if (!tietue?.olio) return;
    tietue.olio.visible = false;
  };

  const vapauta = (tietue) => {
    if (!tietue) return;
    tietue.olio?.parent?.remove(tietue.olio);
    tietue.geometria?.dispose?.();
    tietue.materiaali?.dispose?.();
    tietue.olio = null; tietue.geometria = null; tietue.materiaali = null;
  };

  /** Rakentaa (tai päivittää värit) maan olion; palauttaa true kun scenessä. */
  const rakenna = (iso, tietue) => {
    const k = luokat();
    if (!k) return false;
    const alku = nyt();
    const sade = pallo.getGlobeRadius();
    const { paikat, varit } = maakuntienKarjet(tietue.maa, tietue.alueet, sade, iso === nykyinen ? valittu : null);
    if (!tietue.olio) {
      const geometria = new k.BufferGeometry();
      geometria.setAttribute('position', new k.BufferAttribute(paikat, 3));
      geometria.setAttribute('color', new k.BufferAttribute(varit, 3));
      geometria.setIndex(new k.Indeksi(tietue.maa.kolmiot, 1));
      const materiaali = new k.PerusMateriaali({
        vertexColors: true, transparent: true, opacity: 0, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: MAAKUNNAT_SYVYYSSIIRTO,
      });
      const olio = new k.Mesh(geometria, materiaali);
      olio.renderOrder = MAAKUNNAT_RENDER_ORDER;
      olio.frustumCulled = false;
      olio.name = `maakunnat-${iso}`;
      k.juuri.add(olio);
      Object.assign(tietue, { olio, geometria, materiaali });
    } else {
      tietue.geometria.attributes.color.array.set(varit);
      tietue.geometria.attributes.color.needsUpdate = true;
    }
    mittarit.rakennusMs = Math.round((nyt() - alku) * 10) / 10;
    return true;
  };

  /** Häive sisään (reduced motion: heti). */
  const haivyta = (tietue) => {
    if (!tietue.materiaali) return;
    tietue.olio.visible = true;
    if (reduced() || !ikkuna.requestAnimationFrame) { tietue.materiaali.opacity = MAAKUNNAT_PEITTO; return; }
    const alku = nyt(); const tunnus = (kello += 1);
    const askel = () => {
      if (purettu || tietue.haive !== tunnus || !tietue.materiaali) return;
      const t = Math.min(1, (nyt() - alku) / MAAKUNNAT_HAIVE_MS);
      tietue.materiaali.opacity = MAAKUNNAT_PEITTO * (1 - (1 - t) * (1 - t));
      if (t < 1) ikkuna.requestAnimationFrame(askel);
    };
    tietue.haive = tunnus;
    ikkuna.requestAnimationFrame(askel);
  };

  const siivoaMuisti = () => {
    while (muisti.size > MAAKUNNAT_MUISTI) {
      let vanhin = null;
      for (const [iso, t] of muisti) if (iso !== nykyinen && (!vanhin || t.kaytto < muisti.get(vanhin).kaytto)) vanhin = iso;
      if (!vanhin) break;
      vapauta(muisti.get(vanhin));
      muisti.delete(vanhin);
    }
    mittarit.muistissa = muisti.size;
  };

  const nayta = (iso) => {
    const tietue = muisti.get(iso);
    if (!tietue || iso !== nykyinen) return;
    tietue.kaytto = nyt();
    if (!rakenna(iso, tietue)) {
      // Kirjaston scene ei ole vielä valmis: yritetään seuraavassa kehyksessä.
      mittarit.tila = 'odottaa';
      ikkuna.setTimeout?.(() => nayta(iso), 250);
      return;
    }
    haivyta(tietue);
    Object.assign(mittarit, {
      tila: 'nakyy', maa: iso, alueita: tietue.alueet.length, karkia: tietue.maa.alue.length,
      kolmioita: tietue.maa.kolmiot.length / 3, tavua: tietue.tavua, nakyy: true,
    });
  };

  let valmisRatkaisu = null;
  const valmis = new Promise((ok) => { valmisRatkaisu = ok; });

  const asetaMaa = (iso) => {
    const uusi = iso || null;
    if (uusi === nykyinen) return false;
    if (nykyinen) piilota(muisti.get(nykyinen));
    nykyinen = uusi;
    valittu = null;
    mittarit.valittu = null;
    mittarit.nakyy = false;
    if (!uusi) { mittarit.tila = 'tyhja'; mittarit.maa = null; return true; }
    if (muisti.has(uusi)) { nayta(uusi); return true; }
    mittarit.tila = 'lataa';
    hae(uusi).then((t) => {
      if (purettu) return;
      muisti.set(uusi, { ...t, kaytto: nyt(), olio: null });
      siivoaMuisti();
      nayta(uusi);
      valmisRatkaisu?.();
    }).catch((syy) => {
      if (purettu) return;
      mittarit.tila = 'virhe';
      mittarit.syy = String(syy?.message ?? syy);
      valmisRatkaisu?.();
    });
    return true;
  };

  return {
    valmis,
    asetaMaa,
    /** Alue pisteessä (lat, lng) nykyisessä maassa: { indeksi, ...alue } tai null. */
    osuma(lat, lng) {
      const tietue = nykyinen ? muisti.get(nykyinen) : null;
      if (!tietue) return null;
      const i = osumaAlueissa(tietue.maa.paikat, tietue.alueet, lng, lat);
      return i === null ? null : { indeksi: i, ...tietue.alueet[i] };
    },
    /** Korostaa alueen (indeksi) tai poistaa korostuksen (null). */
    valitse(indeksi) {
      const uusi = Number.isInteger(indeksi) ? indeksi : null;
      if (uusi === valittu) return false;
      valittu = uusi;
      mittarit.valittu = uusi;
      const tietue = nykyinen ? muisti.get(nykyinen) : null;
      if (tietue?.olio) rakenna(nykyinen, tietue);
      return true;
    },
    /** Nykyisen maan alueet (linssin lista) tai tyhjä. */
    alueet: () => (nykyinen && muisti.get(nykyinen)?.alueet) || [],
    mittarit: () => ({ ...mittarit }),
    pura() {
      purettu = true;
      for (const t of muisti.values()) vapauta(t);
      muisti.clear();
      nykyinen = null;
      mittarit.tila = 'purettu';
    },
  };
}
