import { livianSvgAsento, livianSvgKuva } from './livia-svg.js';

let sarja = 0;

/**
 * Sama Pulu rajatulla näyttämöllä. Koko tarkoittaa SVG-laatikon korkeutta:
 * oletus 56/84 px tuottaa noin 49/74 px korkean näkyvän linnun.
 * Alkuperäinen 152 × 304 on lentonäyttämö, ei linnun kuvasuhde.
 * Kutsuja sijoittaa elementin; tämä ei käynnistä ääntä tai kuplia.
 */
export function luoMinipulu(container, { koko = 'auto', suunta = 'vasen' } = {}) {
  const doc = container.ownerDocument;
  const win = doc.defaultView;
  const pieniRuutu = win.matchMedia('(max-width: 620px), (max-height: 500px)');
  const liikePois = win.matchMedia('(prefers-reduced-motion: reduce)');
  const prefix = `minipulu-${++sarja}-`;
  const elementti = doc.createElement('span');
  elementti.className = 'minipulu';
  elementti.setAttribute('aria-hidden', 'true');
  Object.assign(elementti.style, {
    display: 'inline-block', flex: '0 0 auto', lineHeight: '0',
    pointerEvents: 'none', userSelect: 'none', verticalAlign: 'bottom',
    filter: 'drop-shadow(0 0 1px rgba(240,246,249,.7)) drop-shadow(0 2px 2px rgba(0,0,0,.8))',
  });
  let tila = 'idle';
  let kehys = null;
  let tuhottu = false;

  function asetaKoko(arvo = 'auto') {
    if (arvo !== 'auto' && (!Number.isFinite(arvo) || arvo < 24 || arvo > 160)) {
      throw new RangeError('Minipulun koko: auto tai 24–160 px.');
    }
    koko = arvo;
    const korkeus = koko === 'auto' ? (pieniRuutu.matches ? 56 : 84) : koko;
    elementti.style.height = `${korkeus}px`;
    elementti.style.width = `${korkeus * 58 / 70}px`;
  }

  function piirra(p = 0) {
    if (tuhottu) return;
    const s = livianSvgAsento('blink', 0);
    if (tila === 'look' || (tila === 'reaction' && p > 0 && p < 1)) {
      s.frame = 'up';
    }
    if (tila === 'reaction') s.tilt = Math.sin(Math.PI * p) * .55;
    elementti.dataset.tila = tila;
    elementti.innerHTML = livianSvgKuva(s, { prefix });
    const svg = elementti.firstElementChild;
    // Sama vakiorajaus kaikissa kolmessa asennossa: ei koon pumppausta.
    svg.setAttribute('viewBox', '96 236 58 70');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    svg.style.transform = suunta === 'oikea' ? 'scaleX(-1)' : '';
  }

  function pysayta() {
    if (kehys !== null) win.cancelAnimationFrame(kehys);
    kehys = null;
  }

  function lepo() {
    pysayta();
    tila = 'idle';
    piirra();
  }

  function katso(uusiSuunta = suunta) {
    if (!['vasen', 'oikea'].includes(uusiSuunta)) {
      throw new RangeError('Katseen suunta: vasen tai oikea.');
    }
    pysayta();
    suunta = uusiSuunta;
    tila = 'look';
    piirra();
  }

  function reagoi() {
    if (tuhottu || liikePois.matches || doc.hidden) return false;
    pysayta();
    tila = 'reaction';
    const alku = win.performance.now();
    const askel = (aika) => {
      if (tuhottu) return;
      const p = Math.min(1, Math.max(0, (aika - alku) / 700));
      if (p >= 1) { lepo(); return; }
      piirra(p);
      kehys = win.requestAnimationFrame(askel);
    };
    kehys = win.requestAnimationFrame(askel);
    return true;
  }

  const kokoMuuttui = () => asetaKoko(koko);
  const liikeMuuttui = () => { if (liikePois.matches) lepo(); };
  const nakyvyysMuuttui = () => { if (doc.hidden) lepo(); };
  if (!['vasen', 'oikea'].includes(suunta)) throw new RangeError('Katseen suunta: vasen tai oikea.');
  asetaKoko(koko);
  piirra();
  container.appendChild(elementti);
  pieniRuutu.addEventListener('change', kokoMuuttui);
  liikePois.addEventListener('change', liikeMuuttui);
  doc.addEventListener('visibilitychange', nakyvyysMuuttui);

  return {
    elementti, asetaKoko, lepo, katso, reagoi,
    tuhoa() {
      if (tuhottu) return;
      tuhottu = true;
      pysayta();
      pieniRuutu.removeEventListener('change', kokoMuuttui);
      liikePois.removeEventListener('change', liikeMuuttui);
      doc.removeEventListener('visibilitychange', nakyvyysMuuttui);
      elementti.remove();
    },
  };
}
