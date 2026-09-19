/*
 * PULU HYPPÄÄ AVOIMEN PANEELIN YLÄPUOLELLE.
 *
 * Omistaja 19.9.2026 klo 18.01 Suomen aikaa (Ihmisen matka -linssin
 * Siperia-kortti, iPhone), sanatarkasti: *"Pulu voisi hypähtää tuon info
 * palkin yläpuolelle jotta teksti näkyy kokonaan kun sellainen
 * avautuu"*. Raamattu KARTTAUUDISTUKSEN PAATOKSET 50: kun mikä tahansa
 * alalaidan tekstipaneeli tai kortti avautuu, pulu hyppää sen yläreunan
 * päälle kartan puolelle eikä koskaan peitä tekstiä; paneelin
 * sulkeutuessa pulu palaa.
 *
 * YLEINEN, EI KORTTI KERRALLAAN. Moduuli ei tunne yhtään korttia
 * nimeltä. Se katsoo, mitä pulun OLETUSPAIKAN alla on
 * (`elementsFromPoint`), ja hakee sieltä lähimmän kiinteän tai
 * absoluuttisen laatikon, jossa on luettavaa tekstiä ja läpinäkymätön
 * tausta — se on paneeli. Uusi kortti tai infopalkki saa saman
 * käytöksen ilman koodimuutosta.
 *
 * EI HEILURIA. Kun pulu on nostettu, sen alla ei enää ole paneelia, ja
 * uusi mittaus vapauttaisi sen takaisin. Siksi löydetty paneeli
 * pidetään muistissa, ja pulu palaa vasta, kun juuri se paneeli on
 * suljettu, piilotettu tai siirtynyt pois oletuspaikan alta.
 *
 * Kutsuja: js/pollo.js (napin luonti).
 */

/** Rako paneelin yläreunan ja pulun alareunan välissä (px). */
export const PULUN_RAKO_PX = 8;
/** Näin monta merkkiä tekstiä tekee laatikosta paneelin. */
export const PANEELIN_TEKSTI_MIN = 20;
/** Tarkistusväli (ms): kortit avautuvat animoiden, ruutu kääntyy. */
export const PULUN_TARKISTUSVALI_MS = 200;

/**
 * Pulun uusi alareuna (CSS `bottom`, px ikkunan alareunasta) paneelin
 * yläpuolella, tai null, jos pulu ei mahdu paneelin ja yläpalkin väliin.
 * Puhdas funktio (tests/pulu-paneelin-ylla.test.mjs).
 *
 * @param {{ paneelinYla: number, puluKorkeus: number, ikkunanKorkeus: number,
 *   ylaraja?: number, rako?: number }} p
 */
export function pulunAlareunaPaneelinYlla({
  paneelinYla, puluKorkeus, ikkunanKorkeus, ylaraja = 0, rako = PULUN_RAKO_PX,
}) {
  if (![paneelinYla, puluKorkeus, ikkunanKorkeus].every(Number.isFinite)) return null;
  const puluYla = paneelinYla - rako - puluKorkeus;
  if (puluYla < ylaraja) return null;
  return Math.round(ikkunanKorkeus - paneelinYla + rako);
}

const LAPINAKYVA = /^(transparent|rgba\([^)]*,\s*0\))$/;

/** Onko elementti tekstipaneeli (kiinteä/absoluuttinen, taustallinen, tekstiä)? */
function onPaneeli(e, win) {
  const tyyli = win.getComputedStyle(e);
  if (!['fixed', 'absolute', 'sticky'].includes(tyyli.position)) return false;
  if (tyyli.visibility === 'hidden' || Number(tyyli.opacity) === 0) return false;
  const tausta = tyyli.backgroundColor;
  const kuvallinen = tyyli.backgroundImage && tyyli.backgroundImage !== 'none';
  if (LAPINAKYVA.test(tausta ?? 'transparent') && !kuvallinen) return false;
  return (e.innerText ?? '').trim().length >= PANEELIN_TEKSTI_MIN;
}

/** Paneeli pisteessä (x, y) pulun alla, tai null. */
function paneeliPisteessa(doc, win, nappi, x, y) {
  const pino = doc.elementsFromPoint?.(x, y) ?? [];
  for (const e of pino) {
    if (nappi.contains(e) || e === doc.body || e === doc.documentElement) continue;
    for (let a = e; a && a !== doc.body; a = a.parentElement) {
      if (onPaneeli(a, win)) return a;
    }
  }
  return null;
}

const nakyvissa = (e, win) => e?.isConnected && e.getClientRects().length > 0
  && win.getComputedStyle(e).visibility !== 'hidden';

/**
 * Asentaa vahdin pulun napille. Palauttaa { paivita, tila, pura }.
 * `tila()` on savukkeiden mittari.
 */
export function asennaPuluPaneelinYlla(nappi, doc = globalThis.document) {
  const win = doc?.defaultView;
  if (!nappi || !win || typeof doc.elementsFromPoint !== 'function') return null;
  let paneeli = null;
  let oletus = null;
  let hyppyja = 0;

  const vapauta = () => {
    paneeli = null;
    oletus = null;
    nappi.classList.remove('pulu-paneelin-ylla', 'pulu-paneelin-alla-piilossa');
    nappi.style.removeProperty('--pulu-paneelin-ylla-bottom');
  };

  const paivita = () => {
    if (!nakyvissa(nappi, win) || !nappi.classList.contains('pollo-kelluu')) {
      if (paneeli) vapauta();
      return;
    }
    if (paneeli) {
      // Muistettu paneeli: pysyykö se yhä oletuspaikan alla?
      const r = paneeli.getBoundingClientRect();
      const alla = nakyvissa(paneeli, win) && r.top < oletus.bottom && r.bottom > oletus.top
        && r.left < oletus.right && r.right > oletus.left;
      if (!alla) { vapauta(); return; }
    } else {
      const r = nappi.getBoundingClientRect();
      const loydetty = paneeliPisteessa(doc, win, nappi, r.left + r.width / 2, r.top + r.height / 2);
      if (!loydetty) return;
      paneeli = loydetty;
      oletus = { top: r.top, bottom: r.bottom, left: r.left, right: r.right, korkeus: r.height };
      hyppyja += 1;
    }
    const ylapalkki = doc.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0;
    const bottom = pulunAlareunaPaneelinYlla({
      paneelinYla: paneeli.getBoundingClientRect().top,
      puluKorkeus: oletus.korkeus,
      ikkunanKorkeus: win.innerHeight,
      ylaraja: ylapalkki,
    });
    /*
     * KORKEA PANEELI: pulu ei mahdu sen yläpuolelle (nostokortti ja
     * kohdekortti ovat 390 px:n ruudulla lähes koko ruudun korkuisia,
     * mitattu 19.9.2026: yläreuna 12 px ja 53 px). Silloin pulu väistyy
     * näkyvistä paneelin ajaksi — tekstin peittäminen on aina väärin —
     * ja palaa, kun paneeli sulkeutuu.
     */
    if (bottom === null) {
      nappi.classList.remove('pulu-paneelin-ylla');
      nappi.classList.add('pulu-paneelin-alla-piilossa');
      return;
    }
    nappi.classList.remove('pulu-paneelin-alla-piilossa');
    nappi.style.setProperty('--pulu-paneelin-ylla-bottom', `${bottom}px`);
    nappi.classList.add('pulu-paneelin-ylla');
  };

  const ajastin = win.setInterval(paivita, PULUN_TARKISTUSVALI_MS);
  win.addEventListener('resize', paivita);
  paivita();
  return {
    paivita,
    tila: () => ({ ylla: nappi.classList.contains('pulu-paneelin-ylla'), piilossa: nappi.classList.contains('pulu-paneelin-alla-piilossa'), hyppyja, paneeli: paneeli?.className ?? null }),
    pura() {
      win.clearInterval(ajastin);
      win.removeEventListener('resize', paivita);
      vapauta();
    },
  };
}
