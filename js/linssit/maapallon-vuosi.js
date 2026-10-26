/*
 * MAAPALLON VUOSI -LINSSI (työnimi; omistaja 28.9.2026 klo 13.17, loki "MAAPALLON VUOSI -LINSSI TYÖN ALLE NYT").
 *
 * Pyöritettävä maapallo kuukausi kerrallaan: pohjana NASA Blue Marble Next Generation -kuukausikuvat (BMNG 2004, PD;
 * Karttasepän/Julkaisijan data/bmng/<kk>-4096.jpg, .github/workflows/iss-bmng.yml), kuukausiliukusäädin tammi–joulu
 * pehmeällä ristihäivytyksellä, ja päälle valittava datakerros Karttasepän datakokeesta (NASA NEO -kuukausiaineistot:
 * kasvillisuus, lumi ja jää, meren lämpötila, sade, pilvisyys, palot, yövalot; tasakulmainen 4096 × 2048 PNG alfalla,
 * läpinäkyvyys säädettävä). Kerrosluettelo on ämpärissä (KERROSLUETTELO), joten uusi kerros ei vaadi koodimuutosta.
 *
 * TILA: EI VIELÄ REKISTERISSÄ (Päätoimittaja 28.9.: ei pelaajille), joten pelaaja ei voi avata linssiä. Rekisteririvi
 * (hiomassa tai valmis) muuttaa natiivin kultaisen linssijäljen, joten se lisätään natiivin rekisterin kanssa samalla
 * kertaa (Pelikoodarin tiivisteet, tools/natiivi-kultaiset). Kehitys ja kuvasarjat: maapallon-vuosi.html (?kk=7&kerros=<tunnus>&peitto=0.7). Natiivi (Linssiseppä)
 * tehdään myöhemmin tämän web-mallin mukaan.
 *
 * TOTEUTUS: kuukausi A, kuukausi B (häivytys t) ja kerros (peitto) yhdistetään yhdeksi 4096 × 2048 -tekstuuriksi
 * canvasilla ja annetaan pallon omalle materiaalille (globeMaterial().map). Ei lisägeometriaa eikä omaa varjostinta:
 * sama pinta kuin Globe.gl:n pallossa, ja päivitys on yksi drawImage-sarja + tekstuurin lataus näytönohjaimelle.
 */

const R2 = 'https://media.matkakirja.app/';

export const KUUKAUDET = Object.freeze(['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä',
  'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu']);
export const KUUKAUSINIMET = Object.freeze(KUUKAUDET.map((k) => `${k}kuu`));

/** Pohjakuvan leveys ja korkeus (tasakulmainen 2:1), sama kuin datakokeen kerroksilla. */
export const LEVEYS = 4096;
export const KORKEUS = 2048;
/** Kuukauden vaihdon ristihäivytys (ms); reduced motion: 0. */
export const HAIVYTYS_MS = 650;
/**
 * Aloitusnäkymän korkeus (Globe.gl altitude, pallon säteinä pinnasta), jolla koko pallo mahtuu ruutuun kapeammankin
 * sivun suunnassa (Linssiseppä 2, natiivi KokoPallonKorkeus: puhelin pystyssä pallo ei leikkaudu). Pystysuora
 * näkökenttä fov astetta; vara = pallon halkaisija suhteessa kapeampaan näkökenttään (1,12 = 12 % reunaa).
 */
export function kokoPallonKorkeus(leveys, korkeus, fov = 50, vara = 1.12) {
  const pysty = (fov * Math.PI) / 180;
  const vaaka = 2 * Math.atan(Math.tan(pysty / 2) * (leveys > 0 && korkeus > 0 ? leveys / korkeus : 1));
  return vara / Math.sin(Math.min(pysty, vaaka) / 2) - 1;
}

/** Vuoden toisto: kuukausi näin monta ms (häivytys mukaan lukien). */
export const TOISTON_KUUKAUSI_MS = 1400;

/** Globe.gl samasta ämpärin vendor-kopiosta kuin karttapallo (js/pallo.js PALLO_KIRJASTO). */
export const GLOBE_KIRJASTO = `${R2}vendor/globe.gl-2.46.2.min.js`;

/** BMNG-kuukausikuva ämpäristä: kk 1–12 → data/bmng/01-4096.jpg. */
export function kuukaudenPohja(kk, juuri = R2) {
  const n = ((Math.round(kk) - 1) % 12 + 12) % 12 + 1;
  return `${juuri}data/bmng/${String(n).padStart(2, '0')}-4096.jpg`;
}

/** Datakokeen kerrosluettelo (Karttaseppä): { kerrokset: [{ tunnus, nimi, lahde, lisenssi, osoite: "…/{kk}.png" }] }. */
export const KERROSLUETTELO = 'data/maapallon-vuosi/kerrokset.json';

/**
 * Kerroksen kuukausikuva luettelon osoitekaavasta. Suhteellinen polku ämpärin juuresta, {kk} = 01…12.
 * @param {{ osoite: string }} kerros
 */
export function kerroksenKuva(kerros, kk, juuri = R2) {
  if (!kerros?.osoite) return null;
  const n = ((Math.round(kk) - 1) % 12 + 12) % 12 + 1;
  const polku = kerros.osoite.replace('{kk}', String(n).padStart(2, '0'));
  return /^https?:\/\//.test(polku) ? polku : `${juuri}${polku.replace(/^\//, '')}`;
}

/**
 * Luettelon tarkistus: vain kelvolliset rivit (tunnus, nimi, osoite, jossa {kk}); muut ohitetaan ja kerrotaan.
 * @returns {{ kerrokset: Array<object>, ohitetut: string[] }}
 */
export function lueKerrosluettelo(json) {
  const ohitetut = [];
  const rivit = Array.isArray(json?.kerrokset) ? json.kerrokset : [];
  const kerrokset = rivit.filter((k) => {
    const ok = k && typeof k.tunnus === 'string' && typeof k.nimi === 'string' && typeof k.osoite === 'string'
      && k.osoite.includes('{kk}');
    if (!ok) ohitetut.push(k?.tunnus ?? JSON.stringify(k)?.slice(0, 40));
    return ok;
  });
  return { kerrokset, ohitetut };
}

/**
 * Häivytyksen tila: kuukaudesta `mista` kuukauteen `mihin` osuudella t (0…1, pehmeä käyrä).
 * @returns {{ a: number, b: number, t: number }}
 */
export function haivytys(mista, mihin, kulunutMs, kestoMs = HAIVYTYS_MS) {
  if (!(kestoMs > 0) || mista === mihin) return { a: mihin, b: mihin, t: 1 };
  const x = Math.max(0, Math.min(1, kulunutMs / kestoMs));
  // smoothstep: alku ja loppu pehmeät, ei nykäystä liukusäätimen vapautuksessa.
  return { a: mista, b: mihin, t: x * x * (3 - 2 * x) };
}

/**
 * Yhdistelmä canvasille: pohja A, pohja B alfalla t, kerros alfalla peitto (samoin häivytettynä, jos kuukausi vaihtuu).
 * Palauttaa piirtokomennot (testattava ilman canvasia): [{ kuva, alfa }].
 */
export function piirtojarjestys({ pohjaA, pohjaB, t, kerrosA = null, kerrosB = null, peitto = 0 }) {
  const k = [{ kuva: pohjaA, alfa: 1 }];
  if (pohjaB && pohjaB !== pohjaA && t > 0) k.push({ kuva: pohjaB, alfa: t });
  if (peitto > 0) {
    if (!kerrosB || kerrosB === kerrosA) k.push({ kuva: kerrosA, alfa: peitto });
    else {
      // Kuukausi vaihtuu: vanha kerros himmenee ja uusi kirkastuu samalla t:llä kuin pohja.
      k.push({ kuva: kerrosA, alfa: peitto * (1 - t) });
      k.push({ kuva: kerrosB, alfa: peitto * t });
    }
  }
  return k.filter((x) => x.kuva && x.alfa > 0.001);
}

export const LINSSI = {
  tunnus: 'maapallon-vuosi',
  jarjestys: 60,
  kerros: false,
  nimi: 'Maapallon vuosi',
  lyhyt: 'Pyöritä maapalloa kuukausi kerrallaan: lumiraja, vihertyminen ja jäät vuoden kierrossa.',
  // Pallo ja sen ympäri kiertävä vuoden kaari (neljä vuodenaikaa pisteinä).
  ikoni: '<circle cx="12" cy="12" r="5.5"/>'
    + '<path d="M6.5 12h11M12 6.5c-2 1.6-2 9.4 0 11M12 6.5c2 1.6 2 9.4 0 11"/>'
    + '<path d="M3 12a9 9 0 0 1 9-9M21 12a9 9 0 0 1-9 9" stroke-dasharray="1.5 2.5"/>',
  valokuva: false,
  laudat: ['maailmankartta'],
  lahde: {
    aineisto: 'NASA Blue Marble Next Generation (2004) -kuukausikuvat; datakerrokset NASA Earth Observations (NEO)',
    lisenssi: 'Public domain (NASA)',
    osoite: 'https://visibleearth.nasa.gov/collection/1484/blue-marble',
    haettu: '2026-09-28',
  },
};

/* ═══════════════════════════ NÄKYMÄ ═══════════════════════════ */

/** Globe.gl ilman karttapallon moduulia (js/pallo.js tuo mukanaan pelin äänet ja etusivun). */
function lataaGlobe(doc, ikkuna) {
  if (ikkuna.Globe) return Promise.resolve(ikkuna.Globe);
  return new Promise((ok, ei) => {
    const s = doc.createElement('script');
    s.src = GLOBE_KIRJASTO;
    s.async = true;
    s.onload = () => (ikkuna.Globe ? ok(ikkuna.Globe) : ei(new Error('Globe.gl ei latautunut')));
    s.onerror = () => ei(new Error('Globe.gl ei latautunut'));
    doc.head.append(s);
  });
}

function lataaKuva(osoite, ikkuna) {
  return new Promise((ok) => {
    const img = new ikkuna.Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => ok(img);
    img.onerror = () => ok(null);
    img.src = osoite;
  });
}

/**
 * Avaa linssin näkymän annettuun koteloon.
 * @param {object} p
 * @param {HTMLElement} p.kotelo
 * @param {number} [p.kk] aloituskuukausi 1–12 (oletus kuluva)
 * @param {string|null} [p.kerros] aloituskerroksen tunnus
 * @param {number} [p.peitto] kerroksen läpinäkyvyys 0–1
 * @param {() => void} [p.sulje]
 * @param {string} [p.luettelo] kerrosluettelon osoite (kehityssivu: paikallinen datakoe ennen ämpäriä)
 * @param {string} [p.kerrosJuuri] luettelon suhteellisten osoitteiden juuri
 * @param {boolean} [p.pyorita] hidas automaattinen pyöritys (kuvasarjoissa pois)
 * @param {(kk: number) => string} [p.pohja] kuukauden pohjakuvan osoite (kehityssivu: paikallinen kopio, ämpärin CORS)
 * @returns {Promise<{ asetaKuukausi, asetaKerros, asetaPeitto, tila, pura }>}
 */
export async function avaaMaapallonVuosi({ kotelo, kk = new Date().getMonth() + 1, kerros = null, peitto = 0.7,
  sulje = null, ikkuna = globalThis, luettelo = `${R2}${KERROSLUETTELO}`, kerrosJuuri = R2,
  pohja = (n) => kuukaudenPohja(n), pyorita = true } = {}) {
  const doc = ikkuna.document;
  const reduced = Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  const Globe = await lataaGlobe(doc, ikkuna);

  kotelo.classList.add('mv-kotelo');
  const pinta = doc.createElement('div');
  pinta.className = 'mv-pallo';
  const ui = doc.createElement('div');
  ui.className = 'mv-ui';
  ui.innerHTML = `
    <div class="mv-rivi mv-kuukausi">
      <button type="button" class="mv-toista" aria-label="Toista vuosi">▶</button>
      <input type="range" class="mv-liuku" min="1" max="12" step="1" aria-label="Kuukausi">
      <span class="mv-nimi" aria-live="polite"></span>
    </div>
    <div class="mv-rivi mv-kerros">
      <select class="mv-valinta" aria-label="Datakerros"><option value="">Ei kerrosta</option></select>
      <input type="range" class="mv-peitto" min="0" max="1" step="0.05" aria-label="Kerroksen läpinäkyvyys">
    </div>
    <div class="mv-lahde"></div>
    ${sulje ? '<button type="button" class="mv-sulje" aria-label="Sulje">×</button>' : ''}`;
  kotelo.append(pinta, ui);
  const $ = (s) => ui.querySelector(s);

  const leveys = () => kotelo.clientWidth || ikkuna.innerWidth;
  const korkeus = () => kotelo.clientHeight || ikkuna.innerHeight;
  const pallo = Globe({ animateIn: false })(pinta)
    .width(leveys()).height(korkeus())
    .backgroundColor('#05070d')
    .showAtmosphere(true).atmosphereColor('#8fb4ff').atmosphereAltitude(0.16)
    .globeImageUrl(pohja(kk));
  pallo.pointOfView({ lat: 30, lng: 15, altitude: kokoPallonKorkeus(leveys(), korkeus(), pallo.camera()?.fov ?? 50) }, 0);
  const ohjaimet = pallo.controls();
  ohjaimet.autoRotate = pyorita && !reduced;
  ohjaimet.autoRotateSpeed = 0.35;

  const kangas = doc.createElement('canvas');
  kangas.width = LEVEYS; kangas.height = KORKEUS;
  const ctx = kangas.getContext('2d');
  const kuvat = new Map();
  const hae = (osoite) => {
    if (!osoite) return Promise.resolve(null);
    if (!kuvat.has(osoite)) kuvat.set(osoite, lataaKuva(osoite, ikkuna));
    return kuvat.get(osoite);
  };

  let kerrokset = [];
  try {
    const r = await ikkuna.fetch(luettelo, { cache: 'no-cache' });
    if (r.ok) kerrokset = lueKerrosluettelo(await r.json()).kerrokset;
  } catch { /* ei luetteloa vielä: vain pohja */ }
  const valinta = $('.mv-valinta');
  for (const k of kerrokset) {
    const o = doc.createElement('option');
    o.value = k.tunnus; o.textContent = k.nimi;
    valinta.append(o);
  }

  const tila = { kk, kerros: kerrokset.some((k) => k.tunnus === kerros) ? kerros : null, peitto, mista: kk,
    alku: 0, vuoro: 0, piirretty: null, piirtoja: 0, tekstuuri: null, purettu: false };
  let toisto = 0;
  let kehys = 0;

  async function piirra() {
    if (tila.purettu) return;
    const kulunut = (ikkuna.performance?.now?.() ?? Date.now()) - tila.alku;
    const h = haivytys(tila.mista, tila.kk, kulunut, reduced ? 0 : HAIVYTYS_MS);
    const k = kerrokset.find((x) => x.tunnus === tila.kerros) ?? null;
    const [pA, pB, kA, kB] = await Promise.all([hae(pohja(h.a)), hae(pohja(h.b)),
      hae(k ? kerroksenKuva(k, h.a, kerrosJuuri) : null), hae(k ? kerroksenKuva(k, h.b, kerrosJuuri) : null)]);
    if (tila.purettu || !pA) return;
    const komennot = piirtojarjestys({ pohjaA: pA, pohjaB: pB, t: h.t, kerrosA: kA, kerrosB: kB, peitto: k ? tila.peitto : 0 });
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, LEVEYS, KORKEUS);
    for (const c of komennot) { ctx.globalAlpha = c.alfa; ctx.drawImage(c.kuva, 0, 0, LEVEYS, KORKEUS); }
    ctx.globalAlpha = 1;
    const mat = pallo.globeMaterial();
    if (mat?.map && !tila.tekstuuri) {
      // Globe.gl:n oma tekstuuriluokka ja väriavaruus, ei omaa three.js-kopiota.
      const T = mat.map.constructor;
      tila.tekstuuri = new T(kangas);
      tila.tekstuuri.colorSpace = mat.map.colorSpace;
      tila.tekstuuri.anisotropy = mat.map.anisotropy;
      mat.map = tila.tekstuuri;
    }
    if (tila.tekstuuri) { tila.tekstuuri.needsUpdate = true; mat.needsUpdate = true; }
    tila.piirretty = { a: h.a, b: h.b, t: h.t, kerros: k?.tunnus ?? null, peitto: k ? tila.peitto : 0, komentoja: komennot.length };
    tila.piirtoja += 1;
    if (h.t < 1) kehys = ikkuna.requestAnimationFrame(() => { void piirra(); });
  }

  function nimet() {
    $('.mv-liuku').value = String(tila.kk);
    $('.mv-nimi').textContent = KUUKAUSINIMET[tila.kk - 1];
    valinta.value = tila.kerros ?? '';
    $('.mv-peitto').value = String(tila.peitto);
    $('.mv-peitto').disabled = !tila.kerros;
    const k = kerrokset.find((x) => x.tunnus === tila.kerros);
    $('.mv-lahde').textContent = `NASA Blue Marble NG (PD)${k ? ` · ${k.nimi}: ${k.lahde ?? 'NASA NEO'}${k.lisenssi ? ` (${k.lisenssi})` : ''}` : ''}`;
  }

  function asetaKuukausi(uusi) {
    const n = ((Math.round(uusi) - 1) % 12 + 12) % 12 + 1;
    if (n === tila.kk) return;
    // Kesken häivytyksen: uusi vaihto alkaa siitä, mikä ruudulla nyt pääosin näkyy.
    tila.mista = tila.piirretty && tila.piirretty.t < 0.5 ? tila.piirretty.a : tila.kk;
    tila.kk = n;
    ikkuna.cancelAnimationFrame?.(kehys);
    nimet();
    // Häivytys alkaa vasta, kun uuden kuukauden kuvat ovat ladattu (Linssiseppä 2): hitaalla verkolla kello ei saa
    // kulua latauksen aikana, jolloin t hyppäisi suoraan 1:een. Uudempi valinta ohittaa kesken jääneen.
    const vuoro = ++tila.vuoro;
    const k = kerrokset.find((x) => x.tunnus === tila.kerros);
    void Promise.all([hae(pohja(n)), k ? hae(kerroksenKuva(k, n, kerrosJuuri)) : null]).then(() => {
      if (vuoro !== tila.vuoro || tila.purettu) return;
      tila.alku = ikkuna.performance?.now?.() ?? Date.now();
      void piirra();
    });
    // Seuraava kuukausi valmiiksi välimuistiin, ettei toisto odota verkkoa.
    void hae(pohja((n % 12) + 1));
  }
  function asetaKerros(tunnus) { tila.kerros = kerrokset.some((k) => k.tunnus === tunnus) ? tunnus : null; nimet(); void piirra(); }
  function asetaPeitto(p) { tila.peitto = Math.max(0, Math.min(1, Number(p) || 0)); nimet(); void piirra(); }

  $('.mv-liuku').addEventListener('input', (e) => asetaKuukausi(Number(e.target.value)));
  valinta.addEventListener('change', (e) => asetaKerros(e.target.value || null));
  $('.mv-peitto').addEventListener('input', (e) => asetaPeitto(e.target.value));
  $('.mv-toista').addEventListener('click', () => {
    if (toisto) { ikkuna.clearInterval(toisto); toisto = 0; $('.mv-toista').textContent = '▶'; return; }
    $('.mv-toista').textContent = '❚❚';
    toisto = ikkuna.setInterval(() => asetaKuukausi(tila.kk + 1), TOISTON_KUUKAUSI_MS);
  });
  if (sulje) $('.mv-sulje').addEventListener('click', () => sulje());
  const koko = () => pallo.width(leveys()).height(korkeus());
  ikkuna.addEventListener('resize', koko);

  nimet();
  tila.alku = -Infinity;
  // Globe.gl lataa oman tekstuurinsa ensin (globeImageUrl): odotetaan sitä, sitten canvas-tekstuuri tilalle.
  for (let i = 0; i < 100 && !pallo.globeMaterial()?.map; i++) await new Promise((r) => ikkuna.setTimeout(r, 50));
  await piirra();

  return {
    asetaKuukausi, asetaKerros, asetaPeitto,
    tila: () => ({ kk: tila.kk, kerros: tila.kerros, peitto: tila.peitto, piirretty: tila.piirretty, piirtoja: tila.piirtoja,
      kerroksia: kerrokset.map((k) => k.tunnus) }),
    pura() {
      tila.purettu = true;
      ikkuna.clearInterval(toisto);
      ikkuna.cancelAnimationFrame?.(kehys);
      ikkuna.removeEventListener('resize', koko);
      pallo._destructor?.();
      tila.tekstuuri?.dispose?.();
      kotelo.replaceChildren();
      kotelo.classList.remove('mv-kotelo');
    },
  };
}
