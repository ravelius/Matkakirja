/*
 * ══════════════════════════════════════════════════════════════════
 * YLÄPALKKI PIILOON VAAKAPUHELIMELLA
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Kännykän vaakanäkymässä
 * yläpalkin voisi piilottaa niin että vain kolme päällekköistä väkästä
 * näkyy kartalla oik. yläreunassa ja sitä painamalla Yläpalkki tulee
 * näkyviin väliaikaisesti muun sisällön päälle mutta katoaa heti kun
 * pelaaja klikkaa jotain kohtaa palkin ulkopuolelta. Jotta väkäset
 * mahtuvat ruudulle, pitää kartta selite nappia siirtää hieman
 * vasemmalle. Uusi nappi saisi olla saman korkuinen kuin kartta
 * selite."*
 *
 * MIKSI VAAKAPUHELIMELLA. Matalalla ruudulla yläpalkki syö saman
 * pystytilan kuin pystyssä, mutta jäljellä on puolet vähemmän: kartta
 * jää kaistaleeksi. Palkki ei kuitenkaan ole turha — rahat, päivä ja
 * valikko ovat siinä — joten se piilotetaan eikä poisteta.
 *
 * TYÖNJAKO CSS:N KANSSA. Tämä moduuli ei mittaa ruutua eikä kuuntele
 * kokoa: se vain luo napin ja pitää kirjaa siitä, onko palkki auki
 * (body.ylapalkki-auki). NÄKYYKÖ nappi ja väistyykö palkki, on yksin
 * CSS:n media-kyselyn asia (css/styles.css: matala ruutu TAI
 * kosketuslaite iPadin levyisellä ruudulla, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 43 kohta 9). Kahdessa paikassa
 * laskettu sama raja menisi ennen pitkää eri suuntiin — siksi
 * täällä ei ole yhtään mittalukua.
 *
 * SULKU ON POINTERDOWN EIKÄ CLICK. Napautus kartalla saa sulkea
 * palkin ilman että se samalla valitsee kohteen alta — pointerdown
 * ehtii ensin, ja sulku tapahtuu ennen kuin klikin kohde reagoi.
 * Kuuntelija on kaappausvaiheessa samasta syystä.
 */
import { html } from './ui-apurit.js';
import { vakasikoninSvg } from './vakasikoni.js';

/** Bodyn luokka, jolla CSS tietää palkin olevan auki. */
export const YLAPALKKI_AUKI = 'ylapalkki-auki';

/**
 * Onko napautus tullut yläpalkin sisältä. Palkin päällä olevat valikot
 * (päävalikko, hammasratas, matkalaukku) avautuvat palkin ULKOPUOLELLE
 * dialogeina — jos ne laskettaisiin ulkopuolisiksi, palkki sulkeutuisi
 * juuri kun pelaaja avaa sieltä jotain.
 */
export function napautusPalkinSisalla(kohde) {
  if (!kohde?.closest) return false;
  return Boolean(
    kohde.closest('.topbar')
    || kohde.closest('.ylapalkki-nappi')
    || kohde.closest('dialog')
    || kohde.closest('.valikko-levy, .kehittaja-levy, #paavalikko'),
  );
}

/**
 * Luo kartan oikean yläkulman napin ja kytkee avauksen/sulun.
 *
 * @param {object} ui pelin käyttöliittymä (tarvitaan vain mapPane)
 * @returns {?object} { nappi, avaa, sulje, auki } tai null
 */
export function kaynnistaYlapalkkiVaaka(ui) {
  if (typeof document === 'undefined') return null;
  const ruutu = ui?.mapPane;
  if (!ruutu) return null;
  if (ui.ylapalkkiVaaka?.nappi?.isConnected) return ui.ylapalkkiVaaka;
  for (const vanha of ruutu.querySelectorAll('.ylapalkki-nappi')) vanha.remove();

  const nappi = html('button', 'ylapalkki-nappi');
  nappi.type = 'button';
  nappi.title = 'Näytä yläpalkki';
  nappi.setAttribute('aria-label', 'Näytä yläpalkki: rahat, päivä ja valikko');
  nappi.setAttribute('aria-expanded', 'false');
  /*
   * KOLME LEVEÄÄ V:TÄ eli sama väkäsikoni kuin päävalikossa ja
   * linssien valikossa (js/vakasikoni.js): pelaaja tunnistaa merkin,
   * ja se kertoo mitä napin takaa löytyy.
   */
  nappi.innerHTML = vakasikoninSvg();

  const auki = () => document.body.classList.contains(YLAPALKKI_AUKI);

  function sulje() {
    if (!auki()) return;
    document.body.classList.remove(YLAPALKKI_AUKI);
    nappi.setAttribute('aria-expanded', 'false');
    nappi.title = 'Näytä yläpalkki';
  }

  function avaa() {
    if (auki()) return;
    document.body.classList.add(YLAPALKKI_AUKI);
    nappi.setAttribute('aria-expanded', 'true');
    nappi.title = 'Piilota yläpalkki';
  }

  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (auki()) sulje(); else avaa();
  });

  /*
   * Ulkopuolinen napautus sulkee. Kaappausvaihe, jotta sulku ehtii
   * ennen kartan omia käsittelijöitä; ilman sitä palkki jäisi auki
   * siihen asti, kunnes kartta on jo reagoinut napautukseen.
   */
  const ulkopuolelta = (tapahtuma) => {
    if (!auki()) return;
    if (napautusPalkinSisalla(tapahtuma.target)) return;
    sulje();
  };
  document.addEventListener('pointerdown', ulkopuolelta, true);

  // Esc on sama ele näppäimistöllä: palkki on väliaikainen kerros.
  const nappainpurku = (tapahtuma) => {
    if (tapahtuma.key === 'Escape') sulje();
  };
  document.addEventListener('keydown', nappainpurku);

  ruutu.appendChild(nappi);
  ui.ylapalkkiVaaka = {
    nappi,
    avaa,
    sulje,
    auki,
    purku() {
      document.removeEventListener('pointerdown', ulkopuolelta, true);
      document.removeEventListener('keydown', nappainpurku);
      nappi.remove();
      sulje();
      ui.ylapalkkiVaaka = null;
    },
  };
  return ui.ylapalkkiVaaka;
}
