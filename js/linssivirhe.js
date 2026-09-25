/*
 * ══════════════════════════════════════════════════════════════════
 * LINSSIN AVAUS EI VALMISTUNUT — NÄKYVÄ ILMOITUS TYHJÄN RUUDUN TILALLE
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU VIKA (Raamattu, ASTRONAUTIN KAMERA LISÄYS 11 kohta 34,
 * Codexin live-QA 16.9.2026): asennetussa macOS Safari -sovelluksessa
 * Astronautin kameran aktivointi jätti ruudulle pelkän tumman pohjan
 * ja sulkevan ✕:n. Maapalloa, pisteitä eikä virheilmoitusta ei tullut
 * — pelaajalla ei ollut mitään keinoa tietää, mikä meni pieleen.
 *
 * SÄÄNTÖ, JOKA TÄSTÄ SEURAA: linssin avaus ei saa jäädä ikuisesti
 * kesken. Jokaisella odotuksella on aikakatko, ja kun katko laukeaa,
 * pelaaja näkee TÄMÄN — yhden lauseen, syyn ja napin ulos. Sama
 * ilmoitus kelpaa jokaiselle linssille, joten se asuu omassa
 * moduulissaan eikä satelliittilinssin sisällä.
 *
 * ILMOITUS EI OLE DIALOGI. `<dialog>` vie kohdistuksen ja sulkee
 * pelin muun käyttöliittymän; tässä pelaajan on nimenomaan päästävä
 * painamaan myös linssin omaa ✕:ää. Siksi tavallinen kelluva laatikko,
 * jolla on oma nappi ulos.
 *
 * VAIHELOKI NÄKYY VAIN LIPULLA. `?pallodiag=1` lisää ilmoitukseen
 * avausketjun vaiheet, jotta QA saa ne oikeasta laitteesta ilman
 * konsolia (js/pallodiag.js).
 */
import { pallodiagPaalla, pallodiagTeksti } from './pallodiag.js';

/** Ilmoituksen elementin tunnus — yksi kerrallaan. */
export const LINSSIVIRHEEN_TUNNUS = 'linssivirhe';

/*
 * TYYLI TULEE MUKANA, EI VERKOSTA. Ilmoitus kertoo nimenomaan siitä,
 * että jokin ei latautunut; sen oma ulkoasu ei saa olla saman
 * epäonnistumisen varassa (sama oppi kuin satelliittilinssin
 * KRIITTINEN_TYYLI).
 */
const KEHYKSEN_TYYLI = [
  'position:fixed',
  'left:50%',
  'top:50%',
  'transform:translate(-50%,-50%)',
  'z-index:2147483646',
  'max-width:min(28rem, calc(100vw - 2.5rem))',
  'box-sizing:border-box',
  'padding:1rem 1.15rem',
  'border-radius:0.7rem',
  'border:1px solid rgba(217,161,59,0.45)',
  'background:rgba(20,15,9,0.94)',
  'color:#f0e3c8',
  'font:0.95rem/1.45 system-ui,-apple-system,Segoe UI,sans-serif',
  'text-align:center',
  'box-shadow:0 0.6rem 1.8rem rgba(0,0,0,0.55)',
].join(';');

const NAPIN_TYYLI = [
  'margin-top:0.85rem',
  'min-height:2.4rem',
  'padding:0.4rem 1.1rem',
  'border-radius:0.5rem',
  'border:1px solid rgba(217,161,59,0.6)',
  'background:rgba(217,161,59,0.16)',
  'color:#f3c661',
  'font:inherit',
  'cursor:pointer',
].join(';');

const LOKIN_TYYLI = [
  'margin-top:0.8rem',
  'max-height:9rem',
  'overflow:auto',
  'text-align:left',
  'white-space:pre-wrap',
  'font:11px/1.35 ui-monospace,monospace',
  'color:#bcd',
  'opacity:0.85',
].join(';');

/**
 * Näyttää ilmoituksen. Palauttaa kahvan, jonka `pura()` ottaa sen
 * pois — sama kahva kelpaa myös silloin, kun näkymä valmistuukin
 * myöhässä ja ilmoitus on syytä poistaa itsestään.
 *
 * @param {{ otsikko?: string, syy?: string, nappi?: string,
 *   onSulje?: () => void, doc?: Document, ikkuna?: object }} asetukset
 */
export function naytaLinssivirhe({
  otsikko = 'Linssi ei käynnistynyt',
  syy = '',
  nappi = 'Poistu linssistä',
  onSulje = null,
  doc = typeof document === 'undefined' ? null : document,
  ikkuna = globalThis,
} = {}) {
  if (!doc?.body) return { el: null, pura: () => {} };
  poistaLinssivirhe(doc);
  const kehys = doc.createElement('div');
  kehys.id = LINSSIVIRHEEN_TUNNUS;
  kehys.setAttribute('role', 'alert');
  kehys.setAttribute('style', KEHYKSEN_TYYLI);

  const rivi = doc.createElement('div');
  rivi.textContent = otsikko;
  rivi.setAttribute('style', 'font-weight:600;letter-spacing:0.01em;');
  kehys.appendChild(rivi);

  if (syy) {
    const selite = doc.createElement('div');
    selite.textContent = syy;
    selite.setAttribute('style', 'margin-top:0.35rem;opacity:0.85;font-size:0.88rem;');
    kehys.appendChild(selite);
  }

  const ulos = doc.createElement('button');
  ulos.type = 'button';
  ulos.textContent = nappi;
  ulos.setAttribute('style', NAPIN_TYYLI);
  ulos.addEventListener('click', () => {
    poistaLinssivirhe(doc);
    try { onSulje?.(); } catch { /* sulkeminen on kutsujan asia */ }
  });
  kehys.appendChild(ulos);

  if (pallodiagPaalla(ikkuna)) {
    const loki = doc.createElement('div');
    loki.setAttribute('style', LOKIN_TYYLI);
    loki.textContent = pallodiagTeksti();
    kehys.appendChild(loki);
  }

  doc.body.appendChild(kehys);
  return { el: kehys, pura: () => poistaLinssivirhe(doc) };
}

/** Ilmoitus pois (näkymä valmistuikin, linssi suljettiin). */
export function poistaLinssivirhe(doc = typeof document === 'undefined' ? null : document) {
  try { doc?.getElementById?.(LINSSIVIRHEEN_TUNNUS)?.remove?.(); } catch { /* jo poissa */ }
}

/** Onko ilmoitus ruudulla? Savukkeet ja vartijat lukevat tämän. */
export function linssivirheNakyy(doc = typeof document === 'undefined' ? null : document) {
  return Boolean(doc?.getElementById?.(LINSSIVIRHEEN_TUNNUS));
}
