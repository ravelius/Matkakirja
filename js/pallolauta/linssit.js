/*
 * PALLOLAUDAN LINSSIMOOTTORI — linssi pallon pinnalle
 * (docs/moduulit/karttapallo.md luku 10, aalto 1A).
 *
 * OMISTAJAN LINJAUS 5.9.2026 (Raamattu, KAIKKI PALLOLLE, VANHA KARTTA
 * SULJETAAN, sanatarkasti): *"Käännä kaikki pallolle, niin voidaan
 * sulkea vanha kartta kokonaan"* / *"Käytä agenttia parvia"*. Linssit
 * eivät siis jää tasokartalle: jokainen niistä saa `pallolle(lauta,
 * tila)`, ja tämä moduuli on AINOA tie pallon pinnalle. Linssi ei koske
 * Globe.gl-instanssiin — se pyytää kalvon, polut, polygonit tai merkit
 * ja saa kahvan, jonka `pura()` ottaa ne pois.
 *
 * SOPIMUS ON LUVUN 10.1 TAULUKKO, eikä sitä laajenneta täältä käsin:
 *
 *   kalvo(osa, { kuva, peittavyys })  oma pallokuori pinnan päälle
 *                                    (valinnainen `ikkuna` rajaa kuoren
 *                                     pelkäksi palaksi, ks. kalvo)
 *   polut(osa, lista)                 pathsData (reitit.js osarekisteri)
 *   polygonit(osa, lista)             polygonsData
 *   merkit(osa, lista)                htmlElementsData (merkit.js aseta)
 *   kalvoRuudulle(osa, { reika })     CSS-kalvo kotelon päälle
 *   pura(osa)                         kaikki osan kerrokset pois
 *
 * YKSI KERROS, MONTA OSAA. Globe.gl:llä on kutakin lajia tasan yksi
 * kerros, joten jokainen kutsu kirjaa listansa OSAN nimellä ja kerros
 * kootaan osista (sama kuvio kuin js/pallolauta/merkit.js:ssä). Peli
 * omistaa osan `peli`; linssit lisäävät omansa perään, eikä linssi voi
 * pyyhkiä pelin reittejä pois.
 *
 * KAIKKI LIIKE ANIMOIDAAN (Raamattu). Kalvo häivytetään sisään ja ulos
 * `siirtyma` millisekunnissa (peittävyysanimaatio requestAnimationFramella
 * — sama tapa kuin lennon harsolla, ei uutta three.js-tweeniä); polut,
 * polygonit ja merkit saavat kirjaston omat siirtymät. Reduced motion
 * tulee laudalta valmiiksi nollana, jolloin kaikki tapahtuu heti.
 *
 * MISTÄ THREE SAADAAN. Globe.gl kantaa three.js:n sisällään EIKÄ vie
 * sitä ulos (kirjasto lukee `window.THREE`:a vain jos joku muu on sen
 * ladannut). Kalvo tarvitsee kolme luokkaa — Mesh, materiaali ja
 * Texture — ja ne haetaan HEIJASTUKSELLA pallon omasta näyttämöstä:
 * pinnan pallomeshin `constructor` antaa Meshin, sen geometria
 * kelpaa sellaisenaan (oikea säde, oikeat UV:t ja sama kierto kuin
 * pinnalla), ja jonkin materiaalin `map` antaa Texturen. Kirjastoa ei
 * siis versioida kahteen kertaan eikä sivulle ladata toista three.js:ää.
 */

/**
 * Kalvon säde pinnan säteinä.
 *
 * Sopimus (luku 10.1) sanoo 1,002. Reittiviivat piirretään korkeudelle
 * 0,002 (js/pallolauta/reitit.js REITIN_KORKEUS) eli TÄSMÄLLEEN samaan
 * pintaan, ja kaksi samalla syvyydellä olevaa pintaa välkkyy toistensa
 * läpi kameran liikkuessa. Kalvo jää siksi hiuksenverran alle: 1,0015 on
 * silmälle sama paikka mutta jättää reitit, askelhelmet (0,0025) ja
 * kaupunkipisteet (0,003) kalvon PÄÄLLE, kuten tasokartalla linssin
 * päällä.
 */
export const KALVON_SADE = 1.0015;
/**
 * KALVON SYVYYSSIIRTO — polygonOffsetUnits laattakerroksen EDELLE.
 *
 * VIKA v1647–v1649 (omistaja 6.9.2026 ilta, iPad Safari, Ihmisen matka,
 * sanatarkasti: *"Ainakin selaimella täyttöväri ei pysy ihmis
 * linssissä"*): kalvo näkyi vain tähtimäisinä laikkuina säännöllisen
 * ruudukon kärkien ympärillä. Syy MITATTU (scratchpad/kalvo,
 * Chromium 390 × 844 dpr 3): laattakerros piirtyy TÄSMÄLLEEN pinnan
 * säteellä mutta vetää itsensä syvyyspuskurissa kameraa kohti
 * (LAATTAKERROS_SYVYYSSIIRTO −8), ja se siirto on MAAILMAN mitassa
 * d² (1/near − 1/far) / 2²⁴ eli korkeudella 1,1 noin 0,12 yksikköä —
 * enemmän kuin kalvon oma nosto pinnasta (0,15 yksikköä kärjissä,
 * mutta jänteen painuma vie sen 0,028:aan kirjaston 90 × 45 -pallon
 * ruutujen keskellä). Laatta voitti siis syvyystestin kaikkialla
 * paitsi aivan kalvon kärkien lähellä → tähtikuvio. Ennen laattoja
 * (v1645) sama kalvo näkyi ehjänä, koska lepokerros jää yleiskuvassa
 * kokoamatta (LEPOKERROS_KORKEUSRAJA) eikä pohjapallolla ole siirtoa.
 *
 * KORJAUS ON SAMA KUIN VEKTOREILLA (js/pallovektorit.js
 * VEKTORIT_SYVYYSSIIRTO −12): kalvo saa oman, laattoja NEGATIIVISEMMAN
 * siirron, jolloin sen etumatka on 4 syvyysaskelta + oma nostonsa
 * KAIKILLA etäisyyksillä (siirto skaalautuu samalla d²:lla kuin
 * laattojen). Sädekorotus ei kelpaa (näkyisi hyppynä ja parallaksina,
 * v1641:n oppi), eikä syvyystestin sammuttaminen (kalvo peittäisi
 * kaupunkipisteet ja nappulan ja vuotaisi horisontin yli). Syvyystesti
 * jää päälle, joten pallon takapuoli leikkautuu kuten ennen.
 */
export const KALVON_SYVYYSSIIRTO = -12;
/** Polygonin oletuskorkeus, kun linssi ei kerro omaansa (luku 10.1). */
export const POLYGONIN_KORKEUS = 0.004;
/** Ruutukalvon reiän oletussäde pikseleinä. */
export const REIAN_SADE_PX = 140;
/**
 * Reiän pehmeä reuna: osuus säteestä, joka on TÄYSIN kirkas ennen kuin
 * tummennus alkaa nousta. Tasokartalla sama profiili tulee maskin
 * liukuvärista (js/aikajana.js #aikajana-reika: musta 0 %, harmaa 50 %,
 * valkoinen 100 %), joten reunan on oltava pitkä eikä terävä.
 */
export const REIAN_KIRKAS_OSUUS = 0.12;
/** Puolivälin sävyn oletus, kun kutsuja ei anna omaansa (ks. kalvoRuudulle). */
export const REIAN_KESKI_OSUUS = 0.5;
/**
 * Ruutukalvon päivitysjarru (ms). Reikä seuraa kameraa, mutta kotelon
 * pikselipaikka lasketaan enintään näin tiheästi — 30 kertaa sekunnissa
 * riittää silmälle ja jättää kehyksen pelille.
 */
export const KALVON_JARRU_MS = 33;

/* ------------------------------------------------- three heijastuksella */

/**
 * Pinnan pallomesh näyttämöltä: sen geometria ja kierto ovat oikeat.
 *
 * Näyttämöllä on mitattuna (Chromium, laattamoottori päällä) kolme
 * ehdokasta: taustapallo säteellä 50000, pinnan oma pallo säteellä 100
 * (PIILOTETTU, koska laatat piirtävät sen päälle) ja laattojen alla
 * oleva täytepallo säteellä 99 — sekä 216 laattaliuskaa, jotka eivät
 * ole kokonaisia palloja. Oikea on se, jonka säde on lähinnä
 * getGlobeRadius():ia, eikä näkyvyys kelpaa valintaperusteeksi:
 * kalvo on sen SISARUS ja saa oman näkyvyytensä.
 */
function pallonPinta(pallo) {
  const nayttamo = pallo.scene?.();
  if (!nayttamo?.traverse) return null;
  const sade = pallo.getGlobeRadius?.() ?? 100;
  let osuma = null;
  let ero = Infinity;
  nayttamo.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry;
    if (g?.type !== 'SphereGeometry') return;
    const p = g.parameters ?? {};
    // Koko pallo, ei laattaliuska: puolikkaat ja sektorit ohitetaan.
    if (p.phiLength != null && p.phiLength < Math.PI * 1.9) return;
    if (p.thetaLength != null && p.thetaLength < Math.PI * 0.9) return;
    const oma = Math.abs((p.radius ?? 0) * (o.scale?.x ?? 1) - sade);
    if (oma < ero) { ero = oma; osuma = o; }
  });
  // Yli 10 % pielessä ei ole pinta vaan taustapallo tai kehä.
  return ero <= sade * 0.1 ? osuma : null;
}

/** Ensimmäinen näyttämön olio, jonka materiaali täyttää ehdon. */
function etsiMateriaali(pallo, ehto) {
  const nayttamo = pallo.scene?.();
  if (!nayttamo?.traverse) return null;
  let osuma = null;
  nayttamo.traverse((o) => {
    if (osuma) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (m && ehto(m)) { osuma = m; return; }
    }
  });
  return osuma;
}

/**
 * Tekstuuri kuvasta. `globalThis.THREE` jos joku on sen ladannut, muuten
 * mallikappale näyttämöltä: tavallinen Texture (ei data- eikä
 * pakattu tekstuuri), jonka konstruktori ottaa kuvan sellaisenaan.
 */
function teeTekstuuri(pallo, kuva) {
  const T = globalThis.THREE;
  let tekstuuri = null;
  if (T?.Texture) tekstuuri = new T.Texture(kuva);
  else {
    const malli = etsiMateriaali(
      pallo,
      (m) => m.map?.isTexture && !m.map.isDataTexture && !m.map.isCompressedTexture && !m.map.isCubeTexture,
    )?.map;
    if (!malli) return null;
    tekstuuri = new malli.constructor(kuva);
    // Väriavaruus mallista: eri three-versiot nimeävät kentän eri tavoin.
    if ('colorSpace' in malli) tekstuuri.colorSpace = malli.colorSpace;
    else if ('encoding' in malli) tekstuuri.encoding = malli.encoding;
  }
  tekstuuri.needsUpdate = true;
  return tekstuuri;
}

/**
 * Kalvon materiaali: valaisematon kuva, läpinäkyvyys päällä ja
 * peittävyys nollasta (häivytys sisään).
 *
 * MeshBasicMaterial on oikea valinta (sopimus 10.1), koska kalvo on
 * kuva eikä pinta: valo ei saa varjostaa sitä. Jos sitä ei löydy
 * näyttämöltä eikä `window.THREE`:sta, pinnan oma materiaali kloonataan
 * ja kuva pannaan sen HOHTOKANAVAAN (emissive valkoinen, väri musta) —
 * lopputulos on sama valaisematon kuva ilman uutta luokkaa.
 */
function teeMateriaali(pallo, tekstuuri, pinta) {
  const T = globalThis.THREE;
  const asetukset = {
    map: tekstuuri, transparent: true, opacity: 0, depthWrite: false,
    depthTest: true,
    polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: KALVON_SYVYYSSIIRTO,
  };
  if (T?.MeshBasicMaterial) return new T.MeshBasicMaterial(asetukset);
  const perus = etsiMateriaali(pallo, (m) => m.type === 'MeshBasicMaterial');
  if (perus) return new perus.constructor(asetukset);
  const malli = pinta?.material;
  const kopio = Array.isArray(malli) ? malli[0]?.clone?.() : malli?.clone?.();
  if (!kopio) return null;
  kopio.transparent = true;
  kopio.opacity = 0;
  kopio.depthWrite = false;
  kopio.depthTest = true;
  // Sama siirto myös varapolulla: kloonattu pintamateriaali jäisi muuten
  // laattojen alle (ks. KALVON_SYVYYSSIIRTO).
  kopio.polygonOffset = true;
  kopio.polygonOffsetFactor = 0;
  kopio.polygonOffsetUnits = KALVON_SYVYYSSIIRTO;
  if (kopio.emissive) {
    kopio.map = null;
    kopio.color?.set?.(0x000000);
    kopio.emissive.set(0xffffff);
    kopio.emissiveMap = tekstuuri;
    kopio.emissiveIntensity = 1;
  } else {
    kopio.map = tekstuuri;
  }
  kopio.needsUpdate = true;
  return kopio;
}

/**
 * IKKUNAN GEOMETRIA — PALLOKUOREN PALA, EI KOKO KUORTA.
 *
 * TARKENNUSLAASTARI (Raamattu, TOPOGRAFIALINSSI: TARKKUUS EI NAY).
 * Koko pallon kalvo on yksi tasavälinen kuva, ja sen tarkkuudelle on
 * kova katto: gl.MAX_TEXTURE_SIZE on mitattuna 8192 (Chromium,
 * 16.9.2026), ja 8192 × 4096 RGBA veisi 134 Mt näytönohjaimelta. Koko
 * pallon kuva ei siis voi olla tarkempi kuin noin 11 pikseliä astetta
 * kohti — ja lähizoomilla ruudulla on 178 pikseliä astetta kohti.
 *
 * Laastari on sama kalvo mutta VAIN NÄKYVÄLLE IKKUNALLE: pallokuoren
 * pala, jonka oma tekstuuri on lähdeaineiston omassa tiheydessä. Pieni
 * tekstuuri, koko tarkkuus.
 *
 * KULMAT TULEVAT SUORAAN SPHEREGEOMETRIAN SOPIMUKSESTA. Pinnan oma
 * pallo on kokonainen SphereGeometry, jonka uv-kartta on tasavälinen:
 * u kasvaa phin mukana (u = 0 on pituusaste -180) ja v ylhäältä alas
 * (v = 1 on pohjoisnapa). Osapallo saa samat uv:t 0…1 OMAN kaistansa
 * yli, joten laastarin kangas menee siihen sellaisenaan, kunhan
 * kankaan ylin rivi on pohjoisin leveysaste.
 *
 * Ruutujako seuraa ikkunan kokoa (vähintään 24 kumpaankin suuntaan):
 * pieni pala isolla jaolla olisi tuhlausta, iso pala pienellä jaolla
 * näkyisi kulmikkaana reunana pallon kaarella.
 *
 * @param pinta  pallon pinnan mesh (geometrian malli ja säde)
 * @param ikkuna { lat0, lat1, lng0, lng1 } asteina, lat1 > lat0
 * @returns uusi geometria tai null, jos mallia ei saatu
 */
function ikkunanGeometria(pinta, ikkuna) {
  const malli = pinta?.geometry;
  const G = malli?.constructor;
  if (typeof G !== 'function') return null;
  const p = malli.parameters ?? {};
  const aste = Math.PI / 180;
  const lat0 = Math.max(-90, Math.min(90, Number(ikkuna.lat0)));
  const lat1 = Math.max(-90, Math.min(90, Number(ikkuna.lat1)));
  const lng0 = Number(ikkuna.lng0);
  const lng1 = Number(ikkuna.lng1);
  if (!(lat1 > lat0) || !(lng1 > lng0)) return null;
  const jako = (ala) => Math.max(24, Math.min(96, Math.round(ala / 2)));
  try {
    return new G(
      p.radius ?? 100,
      jako(lng1 - lng0),
      jako(lat1 - lat0),
      (lng0 + 180) * aste,
      (lng1 - lng0) * aste,
      (90 - lat1) * aste,
      (lat1 - lat0) * aste,
    );
  } catch {
    return null;
  }
}

/** Kuva ladattuna ja purettuna. Palauttaa null, jos haku epäonnistui. */
function lataaKuva(osoite) {
  return new Promise((valmis) => {
    const kuva = new Image();
    // Sama alkuperä (assets/) tai CORS-kelpoinen ämpäri: ilman tätä
    // WebGL kieltäytyy tekstuuroimasta kuvaa ("tainted canvas").
    kuva.crossOrigin = 'anonymous';
    kuva.addEventListener('load', () => valmis(kuva));
    kuva.addEventListener('error', () => valmis(null));
    kuva.src = osoite;
  });
}

/* ------------------------------------------------------------ moottori */

/**
 * Linssikerrokset pallolle.
 *
 * @param pallo    Globe.gl-instanssi
 * @param ui       pelin käyttöliittymä (reduced motion, heräytys)
 * @param lauta    pallolauta (ruudulla, heraa)
 * @param merkit   js/pallolauta/merkit.js luoMerkit
 * @param reitit   js/pallolauta/reitit.js luoReitit
 * @param siirtyma animaation kesto ms (0 = reduced motion)
 * @param kotelo   pallon kotelo-div (ruutukalvot)
 */
export function luoLinssit({
  pallo, ui, lauta, merkit, reitit, siirtyma = 0, kotelo = null,
}) {
  /** osan nimi → { kalvo, polygonit, merkit, ruutukalvo } */
  const osat = new Map();
  const osa = (nimi) => {
    let o = osat.get(nimi);
    if (!o) { o = { nimi }; osat.set(nimi, o); }
    return o;
  };
  let polygonitAlustettu = false;

  /** Peittävyysanimaatio: rAF, ei kirjastoa. Reduced motion → heti. */
  const haivyta = (kohde, mihin, valmis = null) => {
    const alku = kohde.opacity ?? 0;
    if (!(siirtyma > 0)) {
      kohde.opacity = mihin;
      lauta?.heraa?.();
      valmis?.();
      return null;
    }
    const t0 = performance.now();
    let kehys = 0;
    /*
     * VARMISTIN: HÄIVYTYS EI SAA JÄÄDÄ PUOLITIEHEN.
     *
     * Häivytys nojaa requestAnimationFrameen, ja kuormitetussa
     * selaimessa (ohjelmistorenderöinti, monta rinnakkaista näkymää)
     * kehys voi jäädä tulematta sekunneiksi. Mitattuna 16.9.2026: koko
     * pallon kalvon peittävyys jäi NOLLAAN, kun laastarin vaihdossa
     * aloitettu häivytys ei saanut yhtään kehystä — linssi näytti
     * tyhjältä eikä lokissa ollut mitään. Ajastin vie arvon perille
     * vaikka kehyksiä ei tulisi, ja `valmis` (mesh pois) ajetaan sekin,
     * jottei näyttämölle jää kuoria. Se ei korvaa animaatiota vaan
     * varmistaa sen lopputuloksen.
     */
    let vartija = 0;
    const paata = () => {
      if (kehys) cancelAnimationFrame(kehys);
      kehys = 0;
      clearTimeout(vartija);
      vartija = 0;
      kohde.opacity = mihin;
      lauta?.heraa?.();
      valmis?.();
    };
    vartija = setTimeout(paata, siirtyma + 120);
    const askel = (nyt) => {
      const t = Math.min(1, (nyt - t0) / siirtyma);
      /*
       * PEITTÄVYYS EI SAA KARATA VÄLIN ULKOPUOLELLE. Kun samaan
       * materiaaliin osuu kaksi häivytystä (kalvo sammutetaan ja
       * sytytetään nopeasti peräkkäin, kuten topografian laastarin
       * vaihtuessa), välitulos voi jäädä miinukselle — mitattuna
       * 16.9.2026 koko pallon kalvo jäi arvoon −0,09 eli näkymättömäksi
       * ilman yhtään virhettä. Leikkaus on yksi rivi ja tekee tilasta
       * mahdottoman.
       */
      kohde.opacity = Math.max(0, Math.min(1, alku + (mihin - alku) * t));
      lauta?.heraa?.();
      if (t < 1) { kehys = requestAnimationFrame(askel); return; }
      kehys = 0;
      clearTimeout(vartija);
      vartija = 0;
      valmis?.();
    };
    kehys = requestAnimationFrame(askel);
    return () => {
      if (kehys) cancelAnimationFrame(kehys);
      kehys = 0;
      clearTimeout(vartija);
      vartija = 0;
    };
  };

  /* ---------------------------------------------------------- kalvo --- */

  /**
   * Rasterikalvo pallon pinnalle: tasavälinen (equirectangular, 2:1)
   * kuva omana pallokuorenaan pinnan päällä.
   *
   * Kuva ladataan tästä eikä linssistä: linssi kertoo vain osoitteen ja
   * peittävyyden. Kahvan `pura()` häivyttää kuoren ulos ja vapauttaa
   * tekstuurin — geometria on pinnan omaa eikä sitä saa vapauteta.
   *
   * KUVA SAA OLLA MYÖS CANVAS-ELEMENTTI (Ihmisen matka -virrat,
   * js/aikajana-virrat.js): silloin mitään ei ladata, kangas menee
   * tekstuuriksi sellaisenaan ja kahvan `paivita()` nostaa muuttuneen
   * kankaan näytönohjaimelle (`needsUpdate`) ja herättää laudan. Yksi
   * 720 × 360 -tekstuuri kymmenen kertaa sekunnissa on laattojen
   * rinnalla pieni (suunnitelman luku 7.2).
   *
   * IKKUNA TEKEE KALVOSTA PALAN (16.9.2026, topografian
   * tarkennuslaastari). `ikkuna` = { lat0, lat1, lng0, lng1 } asteina:
   * kuori kattaa vain sen kaistan, ja kuva menee siihen sellaisenaan
   * (ks. ikkunanGeometria). `sade` ja `jarjestys` kertovat, mihin
   * kohtaan pinoa pala tulee — pala on koko pallon kalvon PÄÄLLÄ, jos
   * molemmat ovat hetken näkyvissä.
   */
  const kalvo = (nimi, {
    kuva, peittavyys = 0.72, ikkuna = null, sade = KALVON_SADE, jarjestys = 1,
  } = {}) => {
    const o = osa(nimi);
    puraKalvo(o);
    const tila = {
      peruttu: false, mesh: null, materiaali: null, tekstuuri: null, geometria: null,
      /*
       * Tavoitepeittävyys elää TILASSA eikä sulkeumassa: kutsuja voi
       * vaihtaa sen jo ennen kuin kuva on ladattu (kahvan `peittavyys`),
       * ja silloin kalvo häivyttyy suoraan oikeaan arvoonsa sen sijaan
       * että välähtäisi ensin näkyviin.
       */
      peittavyys,
    };
    o.kalvo = tila;
    const onKangas = Boolean(kuva) && typeof kuva === 'object' && typeof kuva.getContext === 'function';
    void (async () => {
      const kuvaOlio = onKangas ? kuva : await lataaKuva(kuva);
      if (tila.peruttu || !kuvaOlio) {
        if (!kuvaOlio) console.warn(`Linssikalvon kuvaa ei saatu: ${kuva}`);
        return;
      }
      const pinta = pallonPinta(pallo);
      const tekstuuri = pinta ? teeTekstuuri(pallo, kuvaOlio) : null;
      const materiaali = tekstuuri ? teeMateriaali(pallo, tekstuuri, pinta) : null;
      if (!materiaali) {
        console.warn('Linssikalvoa ei voitu rakentaa: three.js ei ollut tavoitettavissa.');
        return;
      }
      /*
       * KALVO ON PINNAN SISARUS, EI LAPSI. Sama kierto ja paikka kuin
       * pinnalla (kopioidaan kerran), mutta oma näkyvyys: laattamoottori
       * voi piilottaa pinnan meshin, eikä kalvo saa kadota sen mukana.
       */
      const isanta = pinta.parent ?? pallo.scene();
      const geometria = ikkuna ? ikkunanGeometria(pinta, ikkuna) : null;
      if (ikkuna && !geometria) {
        console.warn('Linssin tarkennuslaastarille ei saatu geometriaa.');
        return;
      }
      const mesh = new pinta.constructor(geometria ?? pinta.geometry, materiaali);
      mesh.rotation.copy(pinta.rotation);
      mesh.position.copy(pinta.position);
      mesh.scale.copy(pinta.scale).multiplyScalar(sade);
      mesh.renderOrder = jarjestys;
      isanta.add(mesh);
      tila.mesh = mesh;
      // Oma geometria vapautetaan purussa; pinnan omaa EI (ks. puraKalvo).
      tila.geometria = geometria;
      tila.materiaali = materiaali;
      tila.tekstuuri = tekstuuri;
      /*
       * KALVO EHTI VANHENTUA LATAUKSEN AIKANA. Silloin puretaan TÄMÄ
       * kalvo eikä osaa — `o.kalvo` on jo se uusi, jonka kutsuja on
       * pannut tilalle, ja sen purkaminen jättäisi juuri tämän meshin
       * näyttämölle ikuisiksi ajoiksi (mitattu 16.9.2026: pallolle jäi
       * kaksi tarkennuslaastaria päällekkäin).
       */
      if (tila.peruttu) { vapautaKalvo(tila); return; }
      tila.peru = haivyta(materiaali, tila.peittavyys);
    })();
    return {
      pura: () => pura(nimi),
      /** Kankaan sisältö muuttui: tekstuuri uudelleen näytönohjaimelle. */
      paivita: () => {
        if (!tila.tekstuuri || tila.peruttu) return;
        tila.tekstuuri.needsUpdate = true;
        lauta?.heraa?.();
      },
      /**
       * Kalvo pois näkyvistä ja takaisin PURKAMATTA sitä.
       *
       * Topografian tarkennuslaastari tarvitsee juuri tämän: laastarin
       * ollessa päällä koko pallon kalvo ei saa näkyä (kaksi kalvoa
       * päällekkäin rikkoisi sovitun 0,72 peittävyyden), mutta sen
       * purkaminen ja rakentaminen uudestaan joka zoomilla latauttaisi
       * ja purkaisi kuvan turhaan — ja jätti kalvon mitattuna
       * näkymättömäksi kahden häivytyksen jäädessä päällekkäin.
       * Häivytys korvaa edellisen, ei kilpaile sen kanssa.
       */
      /** Kalvon TODELLINEN peittävyys juuri nyt (savukkeet, vartijat). */
      nakyvyys: () => (tila.peruttu ? 0 : (tila.materiaali?.opacity ?? null)),
      peittavyys: (arvo) => {
        if (tila.peruttu) return;
        tila.peittavyys = Math.max(0, Math.min(1, arvo));
        if (!tila.materiaali) return;
        tila.peru?.();
        tila.peru = haivyta(tila.materiaali, tila.peittavyys);
      },
    };
  };

  /** Yhden kalvon mesh, materiaali ja oma geometria pois heti. */
  function vapautaKalvo(tila) {
    if (tila.mesh) tila.mesh.parent?.remove(tila.mesh);
    tila.materiaali?.dispose?.();
    tila.tekstuuri?.dispose?.();
    // Pinnan oma geometria EI kuulu tänne; laastarin oma kuuluu.
    tila.geometria?.dispose?.();
    tila.geometria = null;
    tila.mesh = null;
    lauta?.heraa?.();
  }

  /** Kalvo pois: häivytys ulos, sitten mesh, materiaali ja tekstuuri. */
  function puraKalvo(o) {
    const tila = o.kalvo;
    if (!tila) return;
    o.kalvo = null;
    tila.peruttu = true;
    tila.peru?.();
    if (tila.materiaali) haivyta(tila.materiaali, 0, () => vapautaKalvo(tila));
    else vapautaKalvo(tila);
  }

  /* ---------------------------------------------------------- polut --- */

  /**
   * Viivat pallolle (pathsData). Datum { avain, pisteet: [[lat, lng]…],
   * vari, paksuus, katko } — reittikerroksen osarekisteri yhdistää nämä
   * pelin omiin naapurireitteihin.
   */
  const polut = (nimi, lista = []) => {
    osa(nimi).polut = true;
    reitit.aseta(nimi, lista);
    return { pura: () => pura(nimi) };
  };

  /* ----------------------------------------------------- polygonit --- */

  const alustaPolygonit = () => {
    if (polygonitAlustettu) return;
    polygonitAlustettu = true;
    pallo
      .polygonsData([])
      .polygonGeoJsonGeometry('geometry')
      .polygonCapColor((d) => d.vari)
      // Sivu läpinäkyvä: polygoni on väriläikkä pinnalla, ei pilvenpiirtäjä.
      .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
      .polygonStrokeColor((d) => d.reuna ?? false)
      .polygonAltitude((d) => d.korkeus ?? POLYGONIN_KORKEUS)
      .onPolygonClick((d) => d?.napautus?.(d))
      .polygonsTransitionDuration(siirtyma);
  };

  const polygoniOsat = new Map(); // osan nimi → datumit
  const tyonnaPolygonit = () => {
    const kaikki = [];
    for (const lista of polygoniOsat.values()) kaikki.push(...lista);
    pallo.polygonsData(kaikki);
  };

  /**
   * Maapolygonit pallolle. Datum { avain, geometry (GeoJSON Polygon tai
   * MultiPolygon), vari, reuna, korkeus, napautus(d) }.
   */
  const polygonit = (nimi, lista = []) => {
    alustaPolygonit();
    osa(nimi).polygonit = true;
    polygoniOsat.set(nimi, lista);
    tyonnaPolygonit();
    return { pura: () => pura(nimi) };
  };

  /* --------------------------------------------------------- merkit --- */

  /**
   * Elävät merkit pallolle (htmlElementsData). Datum { avain, lat, lng,
   * elementti(d), asettele?(el, d) } — laji on aina `linssi`, jolloin
   * merkkikerros pyytää elementin datumilta itseltään.
   */
  const linssimerkit = (nimi, lista = []) => {
    osa(nimi).merkit = true;
    merkit.aseta(nimi, lista.map((d) => ({ ...d, laji: 'linssi' })));
    return { pura: () => pura(nimi) };
  };

  /* -------------------------------------------------- ruudun kalvo --- */

  /**
   * Kirjaston CSS2D-kerros kotelon sisällä eli se elementti, jonka
   * lapsina merkit ovat (mitattu Chromiumilla 5.9.2026:
   * `.pallo-kotelo > div > div > .scene-container > div`). Palauttaa
   * null, jos yhtään merkkiä ei vielä ole piirretty.
   */
  const merkkikerros = () => {
    const merkki = kotelo?.querySelector?.('.pallolauta-merkki');
    const kerros = merkki?.parentElement ?? null;
    return kerros && kerros !== kotelo && kotelo.contains(kerros) ? kerros : null;
  };

  /**
   * Ruutukalvon paikka pinossa. Oletus on kotelon päällimmäisenä (kuten
   * lennon harso). `alle` panee kalvon kirjaston CSS2D-kerroksen ETEEN
   * samaan vanhempaan: silloin se peittää pallon pinnan ja
   * kaupunkipisteet (WebGL-kangas) mutta jää DOM-merkkien alle, jolloin
   * aikajanan lamput hehkuvat tummennuksen PÄÄLLÄ kuten tasokartalla
   * (siellä valokerros on tummennuksen jälkeen samassa svg:ssä).
   * Kerros syntyy vasta ensimmäisestä merkistä, joten paikka
   * tarkistetaan uudelleen silmukassa, kunnes se löytyy.
   */
  const sijoitaKalvo = (el, alle) => {
    const kerros = alle ? merkkikerros() : null;
    if (kerros?.parentElement) {
      kerros.parentElement.insertBefore(el, kerros);
      return true;
    }
    kotelo.appendChild(el);
    return !alle;
  };

  /**
   * Tummennus kotelon päälle, reikä yhden pisteen kohdalla (aikajanan
   * valokiila). CSS-kalvo eikä SVG-maski: sama syy kuin lennon harsolla
   * (js/pallolauta/lauta.js) — ei uutta three.js-oliota, ei suodatinta,
   * ja häivytys on pelkkää peittävyyttä kompositorissa.
   *
   * Reikä on { lat, lng, sade } tai null (tasainen tummennus). Piste
   * lasketaan pallon pinnasta ruudulle (lauta.ruudulla) ja päivitetään
   * kameran liikkuessa jarrutettuna (KALVON_JARRU_MS). `vari` on reiän
   * ULKOPUOLINEN sävy ja `keski` puolivälin sävy — kaksi pysäkkiä tekee
   * reunasta pehmeän niin kuin tasokartan maskin liukuväri.
   */
  const kalvoRuudulle = (nimi, {
    reika = null, vari = 'rgba(18, 14, 8, 0.55)', keski = null, peittavyys = 1, alle = false,
  } = {}) => {
    const o = osa(nimi);
    puraRuutukalvo(o);
    if (!kotelo) return { pura: () => {}, paivita: () => {} };
    const el = document.createElement('div');
    el.className = 'pallolauta-kalvo';
    el.style.cssText = `position:absolute;inset:0;z-index:${alle ? 0 : 2};pointer-events:none;opacity:0;`
      + `transition:opacity ${siirtyma}ms ease;`;
    const tila = {
      el, reika, vari, keski, peittavyys, alle, paikallaan: false,
      edellinen: null, viimeksi: 0, kehys: 0, peruttu: false,
    };
    tila.paikallaan = sijoitaKalvo(el, alle);
    o.ruutukalvo = tila;

    const maalaa = () => {
      const r = tila.reika;
      const piste = r ? lauta?.ruudulla?.(r.lat, r.lng, REIAN_SADE_PX) : null;
      if (!r || !piste) {
        el.style.background = tila.vari;
        tila.edellinen = null;
        return;
      }
      const sade = r.sade ?? REIAN_SADE_PX;
      const kirkas = Math.round(REIAN_KIRKAS_OSUUS * 100);
      const keskiSavy = tila.keski ?? tila.vari;
      el.style.background = `radial-gradient(circle ${Math.round(sade)}px at ${Math.round(piste.x)}px `
        + `${Math.round(piste.y)}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${kirkas}%, `
        + `${keskiSavy} ${Math.round(REIAN_KESKI_OSUUS * 100)}%, ${tila.vari} 100%)`;
      tila.edellinen = piste;
    };
    const silmukka = (nyt) => {
      if (tila.peruttu) return;
      if (nyt - tila.viimeksi >= KALVON_JARRU_MS) {
        tila.viimeksi = nyt;
        // Merkkikerros syntyy vasta ensimmäisestä merkistä: kalvo
        // siirretään sen alle heti kun kerros on olemassa.
        if (!tila.paikallaan) tila.paikallaan = sijoitaKalvo(el, tila.alle);
        const r = tila.reika;
        const piste = r ? lauta?.ruudulla?.(r.lat, r.lng, REIAN_SADE_PX) : null;
        const e = tila.edellinen;
        const liikkui = Boolean(piste) !== Boolean(e)
          || (piste && e && (Math.abs(piste.x - e.x) > 1 || Math.abs(piste.y - e.y) > 1));
        if (liikkui) maalaa();
      }
      tila.kehys = requestAnimationFrame(silmukka);
    };
    maalaa();
    // Peittävyys vasta seuraavassa kehyksessä, jotta siirtymä ajaa.
    requestAnimationFrame(() => { if (!tila.peruttu) el.style.opacity = String(tila.peittavyys); });
    tila.kehys = requestAnimationFrame(silmukka);
    return {
      pura: () => pura(nimi),
      /** Reiän paikka vaihtuu (aikajana siirtyy kaupungista toiseen). */
      paivita: (uusi) => { tila.reika = uusi; maalaa(); },
    };
  };

  function puraRuutukalvo(o) {
    const tila = o.ruutukalvo;
    if (!tila) return;
    o.ruutukalvo = null;
    tila.peruttu = true;
    cancelAnimationFrame(tila.kehys);
    const { el } = tila;
    el.style.opacity = '0';
    if (siirtyma > 0) setTimeout(() => el.remove(), siirtyma);
    else el.remove();
  }

  /* ----------------------------------------------------------- purku --- */

  /** Osan kaikki kerrokset pois siirtymällä. Ilman nimeä: kaikki osat. */
  function pura(nimi = null) {
    if (nimi == null) {
      for (const avain of [...osat.keys()]) pura(avain);
      return;
    }
    const o = osat.get(nimi);
    if (!o) return;
    puraKalvo(o);
    puraRuutukalvo(o);
    if (o.polut) reitit.aseta(nimi, []);
    if (o.polygonit) { polygoniOsat.delete(nimi); tyonnaPolygonit(); }
    if (o.merkit) merkit.aseta(nimi, []);
    osat.delete(nimi);
  }

  return {
    kalvo,
    polut,
    polygonit,
    merkit: linssimerkit,
    kalvoRuudulle,
    pura,
    /** Onko osalla kerroksia (savukkeet ja vartijat). */
    paalla: (nimi) => osat.has(nimi),
    reducedMotion: () => !(siirtyma > 0) || Boolean(ui?.reducedMotion),
  };
}
