/*
 * TÄHTITAIVAS JA AVARUUSPÖLY — pistepilvi pallon ympärille.
 *
 * Raamattu "IHMISEN MATKA: MUSTA ALKU ON AVARUUS, PALLO ZOOMAUTUU
 * PIMEYDESTA AFRIKKA EDELLA" (omistaja 7.9.2026 ilta, sanatarkasti:
 * *"Ja se pimeys on avaruus"*): kertomusesityksen musta alku ei ole
 * musta ruutu vaan avaruus, jossa Maa näkyy kaukana pienenä ja tummana
 * ja kasvaa kertojan puhuessa täyteen kokoon Afrikka keskellä.
 *
 * ── MIKSI KIRJASTON OMA HIUKKASKERROS ─────────────────────────────
 *
 * Globe.gl 2.46 kantaa three.js:n SISÄLLÄÄN eikä vie sitä ulos
 * (js/pallo.js kolmiulotteinen kertoo saman): `THREE.Points` ja
 * `THREE.PointsMaterial` eivät ole saatavilla globaalista, eikä niitä
 * voi lukea pallon omista verkoista (ne ovat Meshejä). Kirjastossa on
 * kuitenkin VALMIS hiukkaskerros (`particlesData`), joka rakentaa
 * täsmälleen `new Points(new BufferGeometry, new PointsMaterial)`
 * jokaiselle joukolle ja merkitsee ne kentällä `__globeObjType`. Tämä
 * moduuli käyttää sitä kerrosta ja hakee syntyneet Points-oliot
 * näyttämöltä, jotta niiden materiaaliin voi asettaa additiivisen
 * sekoituksen, peittävyyden ja hitaan ajautumisen. Uutta moottoria ei
 * siis tehdä eikä kuvatiedostoja tarvita.
 *
 * ── KAKSI ETÄISYYTTÄ, JOTTA ZOOM TUNTUU ───────────────────────────
 *
 * Kaukaiset tähdet ovat korkeudella 4,8–6,5 pallonsädettä ja pysyvät
 * paikoillaan; lähempi pöly on 2,6–3,4:ssä ja ajautuu hyvin hitaasti
 * napa-akselinsa ympäri. Kun kamera tulee korkeudelta 2,5 lähikuvaan,
 * lähempi kerros liikkuu ruudulla enemmän kuin kaukainen — se on koko
 * parallaksin idea, ja se saadaan ilmaiseksi perspektiivistä.
 *
 * ── KEHYSTAHTI ────────────────────────────────────────────────────
 *
 * Kolme piirtokutsua ja noin 2 250 pistettä. Pisteitä ei lasketa
 * uudestaan kertaakaan: geometria syntyy kerran, ja jokaisella
 * kehyksellä muuttuu vain yhden olion `rotation.y` ja materiaalien
 * `opacity`. Mittari on tools/savukkeet/savuke-pallo-kehystahti.mjs.
 */

/** Kerrokset: pistemäärä, korkeusväli (pallonsäteinä), koko ja sävy. */
export const TAHTIKERROKSET = [
  {
    tunnus: 'kaukaiset', maara: 1200, korkeus: [5.4, 6.5], koko: 0.9, vari: '#c9d4e8', ajautuu: false,
  },
  {
    tunnus: 'kirkkaat', maara: 260, korkeus: [4.8, 5.8], koko: 1.35, vari: '#ffffff', ajautuu: false,
  },
  {
    tunnus: 'poly', maara: 730, korkeus: [2.6, 3.4], koko: 1.3, vari: '#93a6c4', ajautuu: true,
  },
];

/** Pölykerroksen ajautuma: kierrosta sekunnissa (hyvin hidas). */
export const POLYN_AJAUTUMA_KIERROSTA_S = 0.0016;

/**
 * Toistettava satunnaisluku (mulberry32). Sama siemen antaa aina saman
 * taivaan, joten kuvakaappaukset ja savukkeet vertautuvat keskenään.
 */
export function siemenluvut(siemen) {
  let t = siemen >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let v = t;
    v = Math.imul(v ^ (v >>> 15), v | 1);
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61);
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Yhden kerroksen pisteet pallon pinnan koordinaatteina.
 *
 * PUHDAS FUNKTIO (tests/tahdet.test.mjs). Leveysaste otetaan SINISTÄ
 * eikä tasaisesti asteista: tasainen arvonta kasaisi pisteet napoihin,
 * ja taivas näyttäisi kahdelta tähtiryppäältä.
 */
export function tahtipisteet({
  maara = 100, korkeus = [5, 6], siemen = 1,
} = {}) {
  const arpa = siemenluvut(siemen);
  const ulos = [];
  for (let i = 0; i < maara; i += 1) {
    const lat = (Math.asin(2 * arpa() - 1) * 180) / Math.PI;
    const lng = arpa() * 360 - 180;
    const alt = korkeus[0] + arpa() * (korkeus[1] - korkeus[0]);
    ulos.push({ lat, lng, alt });
  }
  return ulos;
}

/** Kerrokset valmiina joukkoina kirjaston hiukkaskerrokselle. */
export function tahtijoukot(kerrokset = TAHTIKERROKSET, siemen = 20260907) {
  return kerrokset.map((k, i) => ({
    tunnus: k.tunnus,
    koko: k.koko,
    vari: k.vari,
    ajautuu: Boolean(k.ajautuu),
    pisteet: tahtipisteet({ maara: k.maara, korkeus: k.korkeus, siemen: siemen + i * 7919 }),
  }));
}

/**
 * Tähtitaivas pallon näyttämölle.
 *
 * @param {object} pallo Globe.gl-instanssi (ui.pallonInstanssi)
 * @param {{ reducedMotion?: boolean, ikkuna?: object }} asetukset
 * @returns {{ paivita: (dt: number, peitto: number) => void,
 *   tila: () => object, pura: () => void }|null}
 */
export function luoTahtitaivas(pallo, { reducedMotion = false, ikkuna = globalThis } = {}) {
  if (!pallo?.particlesData || !pallo.scene) return null;
  const joukot = tahtijoukot();
  const sade = pallo.getGlobeRadius?.() ?? 100;
  const mittakaava = sade / 100;
  try {
    pallo
      .particlesData(joukot)
      .particlesList((j) => j.pisteet)
      .particleLat('lat')
      .particleLng('lng')
      .particleAltitude('alt')
      .particlesSize((j) => j.koko * mittakaava)
      .particlesSizeAttenuation(true)
      .particlesColor((j) => j.vari);
  } catch {
    // Kirjaston kerros puuttuu tai muuttui: taivas jää pois, avaus
    // toimii silti (musta pohja ja pallon zoomi ovat erikseen).
    return null;
  }

  /*
   * OLIOT LÖYTYVÄT VASTA KUN KIRJASTO ON KOONNUT NE. Sama kuvio kuin
   * napakansilla (js/pallo.js asennaNapakannet): yritetään pienin
   * välein, kunnes Points-oliot ovat näyttämöllä.
   */
  const oliot = [];
  let purettu = false;
  const etsi = () => {
    if (purettu || oliot.length) return;
    const loydot = [];
    pallo.scene?.()?.traverse?.((o) => {
      if (o?.__globeObjType === 'particles' && o.geometry) loydot.push(o);
    });
    if (!loydot.length) return;
    // Järjestys joukkojen mukaan pistemäärästä: kirjaston oma järjestys
    // ei ole sopimus, mutta pistemäärä on.
    for (const joukko of joukot) {
      const o = loydot.find((x) => (x.geometry.attributes?.position?.count ?? 0) === joukko.pisteet.length
        && !oliot.some((v) => v.olio === x));
      if (!o) continue;
      const m = o.material;
      if (m) {
        m.transparent = true;
        m.opacity = 1;
        m.depthWrite = false;
        // THREE.AdditiveBlending === 2: tähdet kirkastavat taustaa
        // eivätkä piirry mustina laatikoina toistensa päälle.
        m.blending = 2;
        m.needsUpdate = true;
      }
      oliot.push({ olio: o, joukko });
    }
  };
  let yritys = 0;
  const yrita = () => {
    if (purettu) return;
    etsi();
    if (!oliot.length && (yritys += 1) < 60) ikkuna.setTimeout?.(yrita, 100);
  };
  yrita();

  let kierto = 0;
  return {
    /**
     * Yksi kehys: pölyn ajautuma ja koko taivaan peittävyys.
     *
     * @param {number} dt kulunut aika sekunteina
     * @param {number} peitto 0…1 (1 = täysi taivas, 0 = häipynyt)
     */
    paivita(dt, peitto = 1) {
      if (purettu) return;
      if (!oliot.length) etsi();
      const p = Math.max(0, Math.min(1, Number(peitto) || 0));
      if (!reducedMotion && Number.isFinite(dt)) {
        kierto += dt * POLYN_AJAUTUMA_KIERROSTA_S * Math.PI * 2;
      }
      for (const { olio, joukko } of oliot) {
        if (joukko.ajautuu && olio.rotation) olio.rotation.y = kierto;
        if (olio.material) olio.material.opacity = p;
        olio.visible = p > 0.01;
      }
    },
    /** Mittarit savukkeelle ja testeille. */
    tila: () => ({
      kerroksia: oliot.length,
      pisteita: joukot.reduce((n, j) => n + j.pisteet.length, 0),
      peitto: oliot[0]?.olio?.material?.opacity ?? null,
      kierto,
    }),
    pura() {
      if (purettu) return;
      purettu = true;
      oliot.length = 0;
      try { pallo.particlesData([]); } catch { /* kerros oli jo poissa */ }
    },
  };
}
