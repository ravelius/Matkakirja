/*
 * PIENI LIIKE KARTALLE (Fable 21.9.2026): hillitty elämä laudalla, ei
 * jatkuvaa animaatiota, kytkin asetuksissa (hampurilainen → Kartta →
 * Pieni liike; avain LIIKE_AVAIN, oletus päällä; prefers-reduced-motion
 * sammuttaa kaiken kytkimestä riippumatta).
 *
 * Kolme osaa, kaikki DOM-kerroksia pallon päällä (.pallolauta-liike,
 * pointer-events: none) — pallon render-silmukkaa ei herätetä eikä
 * kuormiteta; liike on selaimen komposiittoria (transform, opacity):
 *
 *   a) PULU LENTÄÄ HARVOIN KARTAN YLI: kerran PULUN_VALI_MIN–MAX_MS:n
 *      välein levossa, PULUN_LENTO_MS:n suora lento reunasta reunaan
 *      siivet läpättäen (css @keyframes pallolauta-pulu-siipi), ei kun
 *      kortti tai linssi on auki. Siluetti on pieni ja tumma — pulu
 *      nähdään kaukaa ylhäältä, ei kasvoja.
 *   b) PILVEN VARJO liukuu reliefin päällä hitaasti: yksi pehmeä varjo
 *      (radiaaligradientti, multiply, peitto PILVEN_PEITTO ≤ 0,08),
 *      matka kotelon yli PILVEN_MATKA_MS. Varjo pysähtyy (animation-
 *      play-state: paused), kun lauta ei ole levossa.
 *   c) ILLAN SÄVY KELLONAJAN MUKAAN: pelin vuorokaudenaika
 *      (game.timeOfDay: aamu, keskipäivä, ilta, yö) värjää kartan hyvin
 *      kevyesti — aamu viileä, ilta lämmin, yö sinertävä, keskipäivä
 *      ei mitään (SAVYT). Sävy vaihtuu pehmeästi (css transition).
 *
 * LEPO: ei avointa dialogia, korttia (fokuskohde, nostokortti,
 * kaupunkiliuska), linssiä, lentoa/siirtoa, raahausta eikä kamera-ajoa,
 * ja sivu näkyvissä. Tila luetaan kerran sekunnissa (LEPOVAHDIN_MS) —
 * ei kehyskohtaisia kuuntelijoita.
 */

export const LIIKE_AVAIN = 'matkakirja-kartan-liike';

export const PULUN_VALI_MIN_MS = 60000;
export const PULUN_VALI_MAX_MS = 120000;
export const PULUN_LENTO_MS = 2000;
export const PULUN_KOKO_PX = 26;
export const PILVEN_MATKA_MS = 40000;
export const PILVEN_PEITTO = 0.08;
export const LEPOVAHDIN_MS = 1000;

/** Vuorokaudenajan sävy: [väri, peitto]. Keskipäivällä ei sävyä. */
export const SAVYT = {
  aamu: ['rgb(120, 150, 200)', 0.07],
  'keskipäivä': [null, 0],
  ilta: ['rgb(232, 150, 70)', 0.09],
  'yö': ['rgb(40, 60, 130)', 0.12],
};

/** Bodyn luokat, joiden aikana lauta ei ole levossa. */
export const LEVON_ESTEET = [
  'linssi-paalla', 'nosto-popup-auki', 'lento-kesken', 'flight-active',
  'aikajana-paalla', 'maataulu-auki', 'laukku-auki', 'animaatio-kaynnissa',
  'kartta-raahaus', 'zoom-kaynnissa', 'luenta-huntu', 'aloitusverho-paalla',
  'aloitusnakyma', 'pallolauta-lennossa',
];
/** Kortit, joiden ollessa näkyvissä pulu ei lennä. */
export const KORTTIVALITSIN = 'dialog[open], .fokuskohde-popup, .fokusnosto-kerros';

let liikeMuisti = null;

/** Onko pieni liike päällä (asetus; reduced-motion ohittaa). */
export function liikePaalla() {
  if (liikeMuisti !== null) return liikeMuisti;
  try {
    const param = new URLSearchParams(globalThis.location?.search ?? '').get('liike');
    if (param != null) liikeMuisti = !/^(0|off|false|pois)$/.test(param);
    else liikeMuisti = globalThis.localStorage?.getItem(LIIKE_AVAIN) !== '0';
  } catch { liikeMuisti = true; }
  return liikeMuisti;
}

/** Asetus päälle/pois (valikko). Ilmoittaa laudalle tapahtumalla. */
export function asetaLiike(paalla) {
  liikeMuisti = Boolean(paalla);
  try { globalThis.localStorage?.setItem(LIIKE_AVAIN, liikeMuisti ? '1' : '0'); } catch { /* ei muistia */ }
  globalThis.dispatchEvent?.(new CustomEvent('matkakirja-kartan-liike', { detail: { paalla: liikeMuisti } }));
}

/** Pulun siluetti ylhäältä: runko, pyrstö ja kaksi siipeä (läpätys css:llä). */
function pulunSvg() {
  return `<svg viewBox="-16 -12 32 24" width="${PULUN_KOKO_PX}" height="${PULUN_KOKO_PX * 0.75}" aria-hidden="true">
    <g class="pallolauta-pulu-siipi pallolauta-pulu-siipi-v" transform-origin="0 0">
      <path d="M0,-1 C-5,-9 -11,-11 -15,-9 C-12,-6 -7,-2 0,1 z"/>
    </g>
    <g class="pallolauta-pulu-siipi pallolauta-pulu-siipi-o" transform-origin="0 0">
      <path d="M0,-1 C5,-9 11,-11 15,-9 C12,-6 7,-2 0,1 z"/>
    </g>
    <path d="M-1.6,-5 C0,-7 1.6,-5 1.6,-3 L1.4,4 C1,6.5 -1,6.5 -1.4,4 z"/>
    <path d="M-2.4,3.5 L2.4,3.5 L1.6,8.5 L-1.6,8.5 z"/>
  </svg>`;
}

/**
 * @param {object} p
 * @param {object} p.ui
 * @param {HTMLElement} p.kotelo         .pallo-kotelo
 * @param {() => boolean} p.tauolla     nukkuuko pallon silmukka
 * @param {() => boolean} p.eleKaynnissa sormi alhaalla tai kamera-ajo
 * @param {() => boolean} [p.korttiAuki] laudan oma kortti (kaupunkiliuska) auki
 * @param {() => number} [p.satunnainen]  0–1 (savukkeet)
 */
export function luoKartanLiike({
  ui, kotelo, tauolla = () => false, eleKaynnissa = () => false, korttiAuki = () => false,
  satunnainen = Math.random,
  /** Ablaatiotikas (js/pallolauta/kerrokset.js): false = kerrosta ei rakenneta lainkaan. */
  rakenna = true,
} = {}) {
  if (!rakenna) {
    return {
      kerros: null, paivita() {}, lennata() {}, levossa: () => false, tila: () => ({ pois: true }), pura() {},
    };
  }
  const doc = kotelo.ownerDocument;
  const kerros = doc.createElement('div');
  kerros.className = 'pallolauta-liike';
  kerros.setAttribute('aria-hidden', 'true');
  kerros.innerHTML = `
    <div class="pallolauta-liike-savy"></div>
    <div class="pallolauta-liike-pilvi"></div>
    <div class="pallolauta-liike-pulu">${pulunSvg()}</div>`;
  const savy = kerros.querySelector('.pallolauta-liike-savy');
  const pilvi = kerros.querySelector('.pallolauta-liike-pilvi');
  const pulu = kerros.querySelector('.pallolauta-liike-pulu');
  pilvi.style.setProperty('--pilven-matka-ms', `${PILVEN_MATKA_MS}ms`);
  pilvi.style.setProperty('--pilven-peitto', String(PILVEN_PEITTO));
  pulu.style.setProperty('--pulun-lento-ms', `${PULUN_LENTO_MS}ms`);
  // Kerros heti pallon kankaan päälle, merkkikerrosten alle DOM-järjestyksessä.
  const kangas = kotelo.firstElementChild;
  if (kangas) kangas.after(kerros); else kotelo.appendChild(kerros);

  let purettu = false;
  let puluAjastin = 0;
  let puluLennossa = 0;
  let lentoja = 0;
  let vahti = 0;
  let paalla = false;
  let levossaNyt = false;
  let savyNyt = null;

  const reducedMotion = () => Boolean(ui?.reducedMotion)
    || Boolean(doc.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

  /** Onko lauta levossa: ei korttia, linssiä, liikettä eikä piilossa. */
  const levossa = () => {
    if (purettu || tauolla() || eleKaynnissa()) return false;
    if (doc.visibilityState === 'hidden') return false;
    if (ui?.fokuskohdeAuki || korttiAuki()) return false;
    const body = doc.body;
    if (LEVON_ESTEET.some((l) => body.classList.contains(l))) return false;
    if (doc.querySelector(KORTTIVALITSIN)) return false;
    const rect = kotelo.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  const seuraavaVali = () => PULUN_VALI_MIN_MS + satunnainen() * (PULUN_VALI_MAX_MS - PULUN_VALI_MIN_MS);

  /**
   * Pulun lento reunasta reunaan; palauttaa false, jos ei levossa.
   * `kestoMs` on savukkeille (kaappaus hitaalla lennolla); pelissä
   * PULUN_LENTO_MS.
   */
  const lennata = (kestoMs = PULUN_LENTO_MS) => {
    if (!paalla || puluLennossa || !levossa()) return false;
    const w = kotelo.clientWidth;
    const h = kotelo.clientHeight;
    if (!w || !h) return false;
    const vasemmalta = satunnainen() < 0.5;
    const y0 = h * (0.2 + satunnainen() * 0.5);
    const y1 = y0 + (satunnainen() - 0.5) * h * 0.3;
    const x0 = vasemmalta ? -PULUN_KOKO_PX * 2 : w + PULUN_KOKO_PX * 2;
    const x1 = vasemmalta ? w + PULUN_KOKO_PX * 2 : -PULUN_KOKO_PX * 2;
    const kulma = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI + 90;
    pulu.style.setProperty('--pulun-lento-ms', `${kestoMs}ms`);
    pulu.style.transition = 'none';
    pulu.style.transform = `translate(${x0}px, ${y0}px) rotate(${kulma.toFixed(1)}deg)`;
    pulu.classList.add('lennossa');
    // Kaksi kehystä: lähtöasento maalataan ennen siirtymän alkua.
    void pulu.offsetWidth;
    pulu.style.transition = '';
    pulu.style.transform = `translate(${x1}px, ${y1}px) rotate(${kulma.toFixed(1)}deg)`;
    lentoja += 1;
    puluLennossa = setTimeout(() => {
      puluLennossa = 0;
      pulu.classList.remove('lennossa');
    }, kestoMs + 100);
    return true;
  };

  const ajastaPulu = () => {
    clearTimeout(puluAjastin);
    puluAjastin = 0;
    if (!paalla) return;
    puluAjastin = setTimeout(() => {
      puluAjastin = 0;
      // Ei levossa: uusi arpa — lento ei jää jonoon kortin taakse.
      lennata();
      ajastaPulu();
    }, seuraavaVali());
  };

  /** Kellonajan sävy pelitilasta. */
  const paivitaSavy = () => {
    const aika = paalla ? (ui?.game?.timeOfDay?.() ?? null) : null;
    const [vari, peitto] = SAVYT[aika] ?? [null, 0];
    const avain = vari ? `${vari}|${peitto}` : null;
    if (avain === savyNyt) return;
    savyNyt = avain;
    savy.style.background = vari ?? 'transparent';
    savy.style.opacity = String(peitto);
    savy.dataset.aika = aika ?? '';
  };

  /** Lepovahti: pilvi liikkuu vain levossa; pulu keskeytyy, jos kortti aukeaa. */
  const vahdi = () => {
    const nyt = paalla && levossa();
    if (nyt !== levossaNyt) {
      levossaNyt = nyt;
      kerros.classList.toggle('levossa', nyt);
      if (!nyt && puluLennossa) {
        clearTimeout(puluLennossa);
        puluLennossa = 0;
        pulu.classList.remove('lennossa');
      }
    }
    paivitaSavy();
  };

  const kaynnista = () => {
    const uusi = liikePaalla() && !reducedMotion();
    if (uusi === paalla) return;
    paalla = uusi;
    kerros.classList.toggle('paalla', paalla);
    clearInterval(vahti);
    vahti = 0;
    if (paalla) {
      vahti = setInterval(vahdi, LEPOVAHDIN_MS);
      ajastaPulu();
    } else {
      clearTimeout(puluAjastin);
      puluAjastin = 0;
      clearTimeout(puluLennossa);
      puluLennossa = 0;
      pulu.classList.remove('lennossa');
      levossaNyt = false;
      kerros.classList.remove('levossa');
    }
    vahdi();
  };
  const asetusVaihtui = () => kaynnista();
  doc.defaultView?.addEventListener('matkakirja-kartan-liike', asetusVaihtui);
  kaynnista();

  return {
    kerros,
    /** Pelitila päivittyi (lauta.js paivita): sävy ja lepo uudelleen. */
    paivita: () => { if (!purettu) vahdi(); },
    /** Savukkeet: lennätä pulu heti (jos levossa); kesto ms valinnainen. */
    lennata,
    levossa,
    tila: () => ({
      paalla, levossa: levossaNyt, lentoja, puluLennossa: Boolean(puluLennossa), savy: savyNyt,
    }),
    pura() {
      if (purettu) return;
      purettu = true;
      doc.defaultView?.removeEventListener('matkakirja-kartan-liike', asetusVaihtui);
      clearInterval(vahti);
      clearTimeout(puluAjastin);
      clearTimeout(puluLennossa);
      kerros.remove();
    },
  };
}
