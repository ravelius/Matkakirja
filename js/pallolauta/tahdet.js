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

/*
 * ── PAIKALLAAN PYSYVÄ TAIVAS JA KESYTETTY PÖLY (Raamattu ASTRONAUTIN
 *    KAMERA LISÄYS 15, kohdat 39, 40 ja 44) ─────────────────────────
 *
 * OMISTAJA 17.9.2026, sanatarkasti: *"Linssin alussa näytön halki
 * lentää neliöitä. Ne voisi jättää kokonaan pois. Lisäksi tähdet pitää
 * pysyä paikallaan, paitsi silloin kun maapalloa pyöritetään."* ja klo
 * 22.40: *"Pölykerros kuulostaa kivalta jos sen saa toimimaan niin
 * lisää takaisin"*.
 *
 * NELIÖT OLIVAT PÖLYKERROS — kolmesta syystä yhtä aikaa: (1)
 * `PointsMaterial` ilman tekstuuria piirtää pisteen NELIÖNÄ, (2)
 * `particlesSizeAttenuation` suurentaa lähimmät pisteet rajatta, ja
 * pöly on lähin kerros (2,6–3,4 pallonsädettä), joten kun kamera
 * zoomaa sen ohi, yksittäinen hiukkanen kasvaa kymmeniksi pikseleiksi,
 * ja (3) pöly oli ainoa AJAUTUVA kerros, joten ne myös lensivät.
 *
 * KOLME KORJAUSTA, YKSI PER SYY: pyöristävä sävytin (`pyoristaPiste`),
 * `kattoPx` = sama sävytin rajaa `gl_PointSize`in kattoon, jolloin
 * etäisyysvaimennus antaa yhä syvyysvaikutelman (kaukana pienempi)
 * mutta lähelläkään hiukkanen ei kasva tähteä suuremmaksi, ja
 * `ajautuu: false`, jolloin kerros kääntyy vain kameran mukana.
 * Peruskoko on tähtiä pienempi (0,85 < 0,9 < 1,35), joten kaukaa
 * katsottuna pöly on aina hienovaraisin kerros.
 *
 * IHMISEN MATKA -linssin avaus käyttää yhä alkuperäistä sarjaa: siellä
 * pöly ajautuu ja antaa parallaksin zoomin aikana (ks. tiedoston alku),
 * eikä omistajan huomio koskenut sitä.
 */
export const TAHTIKERROKSET_PAIKALLAAN = TAHTIKERROKSET
  .map((k) => (k.tunnus === 'poly'
    ? { ...k, koko: 0.85, ajautuu: false, kattoPx: 2.2 }
    : { ...k, ajautuu: false }));

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

/**
 * Kerrokset valmiina joukkoina kirjaston hiukkaskerrokselle.
 *
 * `kerroin` VENYTTÄÄ TAIVAAN KAUEMMAS (avausjakso, 8.9.2026). Kerroin 1
 * on laudan oma taivas pallon lähellä; avauksessa kamera on kymmenien
 * pallonsäteiden päässä (js/linssit/ihmisen-matka-esitys.js
 * AVARUUDEN_KORKEUS), ja ilman venytystä koko taivas kutistuisi pieneksi
 * ryppääksi ruudun keskelle pallon viereen. Kerroin siirtää kirkkaat
 * kerrokset kameran TAAKSE (säde > kameran etäisyys), jolloin tähtiä on
 * joka suunnassa kuten yötaivaalla, ja pölykerros jää eteen antamaan
 * parallaksin zoomin aikana.
 */
export function tahtijoukot(kerrokset = TAHTIKERROKSET, siemen = 20260907, kerroin = 1) {
  const k0 = Number.isFinite(kerroin) && kerroin > 0 ? kerroin : 1;
  return kerrokset.map((k, i) => ({
    tunnus: k.tunnus,
    // KOKO KASVAA SAMASSA SUHTEESSA: pisteen koko pienenee etäisyyden
    // mukaan (particlesSizeAttenuation), joten venytetty taivas olisi
    // muuten yhtä paljon himmeämpi kuin se on kauempana.
    koko: k.koko * k0,
    vari: k.vari,
    ajautuu: Boolean(k.ajautuu),
    /*
     * KATTO EI SKAALAUDU KERTOIMELLA: se on ruutupikseleitä, ei
     * maailman mittoja (LISÄYS 15 kohta 44).
     */
    kattoPx: Number.isFinite(k.kattoPx) ? k.kattoPx : 0,
    pisteet: tahtipisteet({
      maara: k.maara, korkeus: [k.korkeus[0] * k0, k.korkeus[1] * k0], siemen: siemen + i * 7919,
    }),
  }));
}

/*
 * ── TÄHTI ON PYÖREÄ, EI NELIÖ (LISÄYS 15 kohta 39) ────────────────
 *
 * `THREE.PointsMaterial` ilman `map`-tekstuuria piirtää jokaisen
 * pisteen NELIÖNÄ: piste on ruudulla neliön kokoinen sirpale, ja koko
 * sirpale värittyy. Tekstuuria ei voi tehdä ilman `THREE.Texture`-
 * luokkaa, jota globe.gl ei vie ulos (ks. tiedoston alku) — mutta
 * sävyttimeen pääsee käsiksi ilman kirjastoa: `onBeforeCompile` saa
 * valmiin `points`-sävyttimen lähdekoodin, ja siihen voi lisätä
 * `gl_PointCoord`-etäisyystestin. Kulmat hylätään (`discard`) ja alfa
 * pehmenee reunaa kohti, joten piste on pyöreä ja keskeltä kirkas.
 *
 * Paikkaus on puhdas lisäys kirjaston omaan koodiin: jos ankkuririvi
 * jonain päivänä katoaa, `korvattu` jää epätodeksi ja tähdet piirtyvät
 * kuten ennenkin (ei kaatumista). Vartio lukee `tila().pyoreita`.
 */
export function pyoristaPiste(materiaali, kattoPx = 0) {
  try {
    if (!materiaali || materiaali.__tahtiPyoristetty) return false;
    const ankkuri = '#include <clipping_planes_fragment>';
    const kattoAnkkuri = '#include <logdepthbuf_vertex>';
    const katto = Number.isFinite(kattoPx) && kattoPx > 0 ? kattoPx : 0;
    materiaali.onBeforeCompile = (savytin) => {
      if (!savytin?.fragmentShader?.includes(ankkuri)) return;
      savytin.fragmentShader = savytin.fragmentShader.replace(
        ankkuri,
        `${ankkuri}
        vec2 tahtiKeskus = gl_PointCoord - vec2(0.5);
        float tahtiSade = length(tahtiKeskus);
        if (tahtiSade > 0.5) discard;
        diffuseColor.a *= smoothstep(0.5, 0.18, tahtiSade);`,
      );
      /*
       * KOKOKATTO (LISÄYS 15 kohta 44). `gl_PointSize` on jo laskettu
       * etäisyysvaimennuksella, kun sävyttimen kulku saapuu tähän
       * ankkuriin — katto siis SÄILYTTÄÄ syvyysvaikutelman (kauempana
       * pienempi) ja leikkaa vain lähikasvun. Luku on piirtopuskurin
       * pikseleitä, samoin kuin gl_PointSize.
       */
      if (katto && savytin.vertexShader?.includes(kattoAnkkuri)) {
        savytin.vertexShader = savytin.vertexShader.replace(
          kattoAnkkuri,
          `gl_PointSize = min(gl_PointSize, ${katto.toFixed(2)});
        ${kattoAnkkuri}`,
        );
        materiaali.__tahtiKatto = katto;
      }
      materiaali.__tahtiKaannetty = true;
    };
    materiaali.__tahtiPyoristetty = true;
    materiaali.needsUpdate = true;
    return true;
  } catch { return false; }
}

/**
 * Tähtitaivas pallon näyttämölle.
 *
 * @param {object} pallo Globe.gl-instanssi (ui.pallonInstanssi)
 * @param {{ reducedMotion?: boolean, ikkuna?: object, kerroin?: number }} asetukset
 * @returns {{ paivita: (dt: number, peitto: number) => void,
 *   tila: () => object, pura: () => void }|null}
 */
export function luoTahtitaivas(pallo, {
  reducedMotion = false, ikkuna = globalThis, kerroin = 1,
  kerrokset = TAHTIKERROKSET, ajautuma = true,
} = {}) {
  if (!pallo?.particlesData || !pallo.scene) return null;
  const joukot = tahtijoukot(kerrokset, undefined, kerroin);
  const sade = pallo.getGlobeRadius?.() ?? 100;
  const mittakaava = sade / 100;
  const pikselitiheys = (() => {
    try { return pallo.renderer?.()?.getPixelRatio?.() || 1; } catch { return 1; }
  })();
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
  let pyoreita = 0;
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
        /*
         * KATTO PIIRTOPUSKURIN PIKSELEINÄ: `gl_PointSize` on
         * fyysisiä pikseleitä, ja kirjasto kertoo pistekoon
         * pikselitiheydellä, joten sama kerroin tarvitaan kattoon —
         * muuten pöly olisi retinalla kolmanneksen halutusta.
         */
        if (pyoristaPiste(m, joukko.kattoPx * pikselitiheys)) pyoreita += 1;
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

  /*
   * ── HIUKKASEN KOKO RUUDULLA (LISÄYS 15 kohta 44:n vartio) ────────
   *
   * Sama kaava kuin three.js:n points-sävyttimessä: koko kerrotaan
   * `scale / -mvPosition.z`, missä scale = kankaan korkeus / 2 ja
   * -mvPosition.z on syvyys kameran akselilla (EI etäisyys, siksi
   * käänteinen näkymämatriisi eikä Pythagoras). Tulos on CSS-
   * pikseleitä: kirjaston pikselitiheyskerroin ja katon sama kerroin
   * kumoavat toisensa, joten luku vertautuu suoraan kohdepisteen
   * kokoon ruudulla. Lasketaan vain mittaushetkellä.
   *
   * VAIN RUUDULLA NÄKYVÄT PISTEET. Sivusuunnassa olevan pisteen
   * näkymäsyvyys lähestyy nollaa, jolloin kaava antaa kymmeniä
   * tuhansia pikseleitä — piste on kuitenkin kaukana ruudun ulkopuolella
   * eikä koskaan piirry. Ilman rajausta vartion "suurin tähti" olisi
   * juuri tuollainen haamuluku, ja vertailu pölyyn menisi läpi aina.
   * Siksi piste kelpaa vain, jos se osuu näkymäpyramidiin (|x| ≤ w,
   * |y| ≤ w projisoinnin jälkeen).
   */
  const kokoRuudulla = () => {
    const kamera = pallo.camera?.();
    const piirtaja = pallo.renderer?.();
    const korkeus = piirtaja?.domElement?.clientHeight
      || piirtaja?.domElement?.height || 0;
    if (!kamera || !korkeus || !oliot.length) return [];
    kamera.updateMatrixWorld?.();
    const e = kamera.matrixWorldInverse?.elements;
    const pr = kamera.projectionMatrix?.elements;
    if (!e || !pr) return [];
    const puoliskoi = korkeus * 0.5;
    return oliot.map(({ olio, joukko }) => {
      olio.updateMatrixWorld?.();
      const m = olio.matrixWorld?.elements;
      const pos = olio.geometry?.attributes?.position;
      const koko = (olio.material?.size ?? 0) / pikselitiheys;
      let suurin = 0;
      for (let i = 0; pos && i < pos.count; i += 1) {
        const x0 = pos.getX(i); const y0 = pos.getY(i); const z0 = pos.getZ(i);
        const x = m ? m[0] * x0 + m[4] * y0 + m[8] * z0 + m[12] : x0;
        const y = m ? m[1] * x0 + m[5] * y0 + m[9] * z0 + m[13] : y0;
        const z = m ? m[2] * x0 + m[6] * y0 + m[10] * z0 + m[14] : z0;
        const nx = e[0] * x + e[4] * y + e[8] * z + e[12];
        const ny = e[1] * x + e[5] * y + e[9] * z + e[13];
        const nz = e[2] * x + e[6] * y + e[10] * z + e[14];
        const syvyys = -nz;
        if (!(syvyys > 0.001)) continue;
        const cx = pr[0] * nx + pr[4] * ny + pr[8] * nz + pr[12];
        const cy = pr[1] * nx + pr[5] * ny + pr[9] * nz + pr[13];
        const cw = pr[3] * nx + pr[7] * ny + pr[11] * nz + pr[15];
        if (!(cw > 0) || Math.abs(cx) > cw || Math.abs(cy) > cw) continue;
        const px = (koko * puoliskoi) / syvyys;
        if (px > suurin) suurin = px;
      }
      const katto = joukko.kattoPx > 0 ? joukko.kattoPx : Infinity;
      return {
        tunnus: joukko.tunnus,
        kattoPx: joukko.kattoPx || 0,
        suurinPx: +Math.min(suurin, katto).toFixed(2),
        rajaamatonPx: +suurin.toFixed(2),
      };
    });
  };

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
      /*
       * AJAUTUMA ON KYTKIN (LISÄYS 15 kohta 40). Astronautin kamera
       * antaa `ajautuma: false`, jolloin taivas ei liiku itsestään
       * lainkaan — tähdet kääntyvät vain kameran mukana, kun pelaaja
       * pyörittää palloa.
       */
      if (ajautuma && !reducedMotion && Number.isFinite(dt)) {
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
      /* Vartioiden luvut (LISÄYS 15): ajautuvia 0 ja pyöreitä = kerroksia. */
      ajautuvia: oliot.filter(({ joukko }) => joukko.ajautuu).length,
      ajautuma: Boolean(ajautuma),
      pyoreita,
      kaannettyja: oliot.filter(({ olio }) => Boolean(olio?.material?.__tahtiKaannetty)).length,
      pisteita: joukot.reduce((n, j) => n + j.pisteet.length, 0),
      /* LISÄYS 15 kohta 44: pölykerros mukana ja sen koko ruudulla. */
      polya: oliot.filter(({ joukko }) => joukko.tunnus === 'poly').length,
      koot: kokoRuudulla(),
      peitto: oliot[0]?.olio?.material?.opacity ?? null,
      kierto,
    }),
    pura() {
      if (purettu) return;
      purettu = true;
      oliot.length = 0;
      /*
       * VAIN OMA TAIVAS PURETAAN. Häivytys päättyy ajastimella
       * (js/linssit/ihmisen-matka-esitys.js suljeAvaruus), ja "Aloita
       * alusta" voi ehtiä väliin: silloin kerroksessa on jo UUDEN ajon
       * taivas, eikä vanhan ajastimen kuulu tyhjentää sitä.
       */
      try {
        if (pallo.particlesData() === joukot) pallo.particlesData([]);
      } catch { /* kerros oli jo poissa */ }
    },
  };
}
