/*
 * ══════════════════════════════════════════════════════════════════
 * VAAKATILASSA EI YLÄPALKKIA: HAMPURILAINEN AVAA PÄÄVALIKON NAPIN PÄÄLLE
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA 2.10.2026 klo 23.07 (Raamatun loki "VAAKATILASSA EI YLÄPALKKIA"), sanatarkasti: *"tajusin että
 * vaakatilassa ei tarvita koko yläpalkkia. nappi voisi avata suoraan valikon napin päälle, koska valikossa näkyy nyt
 * kaikki tarvittavat tiedot. eli poista palkki kokonaan ja avaa valikko suoraan napin päälle"*; klo 23.08:
 * *"väkäshampurilaisen voi vaihtaa samalla normaaliksi hampurilaiseksi"*.
 *
 * Kumoaa 13.9.2026 tilauksen, jossa väkäsnappi toi palkin väliaikaisesti näkyviin. Nyt:
 *   - palkkia ei ole lainkaan (css/styles.css: sama media-kysely kuin ennen piilotti palkin)
 *   - oikean yläkulman nappi on tavallinen hampurilainen (40 pt, sama paikka karttaselitteen vieressä)
 *   - nappi avaa päävalikon (#paavalikko, valikko V2: taso- ja päivärivi, rahat) suoraan napin päälle
 *     oikeaan yläkulmaan (js/pilleri-paneeli.js asemoi ankkuroi paneelin näkyvään nappiin)
 *   - valikko sulkeutuu ulkopuolisesta napautuksesta ja Escistä (js/main.js, sama kuin päävalikolla muuallakin)
 *
 * TYÖNJAKO CSS:N KANSSA. Tämä moduuli ei mittaa ruutua: NÄKYYKÖ nappi ja onko palkki poissa, on yksin CSS:n
 * media-kyselyn asia (matala vaakaruutu TAI vaaka-iPad kosketuksella). Avaus kulkee tapahtumana js/main.js:n
 * päävalikolle, jotta valikolla on yksi omistaja.
 */
import { html } from './ui-apurit.js';
import { hampurilaisenSvg } from './vakasikoni.js';

/** Tapahtuma, jolla nappi pyytää js/main.js:ää avaamaan tai sulkemaan päävalikon (detail.lahde = nappi). */
export const PAAVALIKKO_NAPILTA = 'matkakirja-paavalikko-napilta';
/** Bodyn luokka, kun päävalikko on auki (css/styles.css: Pulun hahmo väistyy vaakatilassa). */
export const PAAVALIKKO_AUKI = 'paavalikko-auki';

/**
 * Luo kartan oikean yläkulman hampurilaisen.
 *
 * @param {object} ui pelin käyttöliittymä (tarvitaan vain mapPane)
 * @returns {?object} { nappi, purku } tai null
 */
export function kaynnistaYlapalkkiVaaka(ui) {
  if (typeof document === 'undefined') return null;
  const ruutu = ui?.mapPane;
  if (!ruutu) return null;
  if (ui.ylapalkkiVaaka?.nappi?.isConnected) return ui.ylapalkkiVaaka;
  for (const vanha of ruutu.querySelectorAll('.ylapalkki-nappi')) vanha.remove();

  const nappi = html('button', 'ylapalkki-nappi');
  nappi.type = 'button';
  nappi.title = 'Valikko';
  nappi.setAttribute('aria-label', 'Valikko');
  nappi.setAttribute('aria-haspopup', 'true');
  nappi.setAttribute('aria-expanded', 'false');
  nappi.setAttribute('aria-controls', 'paavalikko');
  nappi.innerHTML = hampurilaisenSvg();
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    document.dispatchEvent(new CustomEvent(PAAVALIKKO_NAPILTA, { detail: { lahde: nappi } }));
  });

  /*
   * Napin tila seuraa paneelia: valikon voi sulkea moni (valinta, Esc, ulkopuolinen napautus tai kartan yhteinen
   * vartija js/ui-apurit.js, joka kirjoittaa hidden-tiedon suoraan), joten totuus luetaan paneelista.
   */
  const paneeli = document.getElementById('paavalikko');
  const tila = () => {
    const auki = Boolean(paneeli && !paneeli.hidden);
    nappi.setAttribute('aria-expanded', String(auki));
    // css/styles.css: vaakatilassa Pulun hahmo väistyy auki olevan valikon alta (bodyn pinta on .app:n yläpuolella).
    document.body.classList.toggle(PAAVALIKKO_AUKI, auki);
  };
  const vahti = paneeli && typeof MutationObserver === 'function' ? new MutationObserver(tila) : null;
  vahti?.observe(paneeli, { attributes: true, attributeFilter: ['hidden'] });
  tila();

  ruutu.appendChild(nappi);
  ui.ylapalkkiVaaka = {
    nappi,
    purku() {
      vahti?.disconnect();
      document.body.classList.remove(PAAVALIKKO_AUKI);
      nappi.remove();
      ui.ylapalkkiVaaka = null;
    },
  };
  return ui.ylapalkkiVaaka;
}
