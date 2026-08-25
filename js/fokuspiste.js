/*
 * VIHREÄ HEHKUVA PISTE — kohtaamispaikka kartalla.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 24.8.2026, ilta): *"Aarteen avaus -tehtävän suoritus sytyttää
 * kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN, jota klikkaamalla tapaa
 * henkilön ja yrittää aarteen avausta."*
 *
 * Piste on kokeilun ainoa uusi asia kartalla, ja se on tarkoituksella
 * ainoa: kevyt kulku purkaa korttiannostelun, ja jäljelle jää yksi
 * paikka, jonne pelaajan katse viedään. Vinjettiviuhka jää siksi pois
 * (ks. js/fokusvirta.js lipun perustelu).
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (this.svg:n suora lapsi). Kiertävän
 *    laudan <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Merkki piirretään siksi
 *    oikeana elementtinä jokaiseen kiertokohtaan (ui.kiertoKohdat) —
 *    sama ratkaisu kuin kohderenkailla, vinjeteillä ja fokuskohteilla.
 *
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. HEHKU ON SIIS
 *    CSS-ANIMAATIO eikä feGaussianBlur: kolme sisäkkäistä ympyrää,
 *    joiden `opacity` ja `r` sykkivät (css/fokusvirta.css). Kartan
 *    rasterointi ei kilpaile sen kanssa — animoituvat vain ne kaksi
 *    ominaisuutta, jotka kompositori osaa yksin.
 *
 * 3. KIINTEÄ KOKO RUUDULLA. Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan zoomin käänteisluvulla, jolloin merkin lapset ovat
 *    ruudun pikseleitä. Osuma-alueen r = 22 on siis 44 px läpimitta
 *    joka zoomilla — sama sormisääntö kuin kaupungin laatalla
 *    (js/ui.js FOKUS_LAATTA_OSUMA_PX).
 *
 * ── MITÄ TÄMÄ EI TEE ───────────────────────────────────────────────
 *
 * Ei laattamekaniikkaa. Napautus avaa kohtaamiskortin
 * (js/fokusvirta.js avaaFokusKohtaaminen), ja sen "Tapaa Nikos" -nappi
 * kutsuu tismalleen samaa game.actionQuizia kuin ennenkin. Piste ei
 * myöskään päätä omaa näkyvyyttään: ehdot lasketaan yhdessä paikassa
 * (fokusvirtaKohtaamispiste), jotta piste, pelinappula ja kortti ovat
 * aina samaa mieltä siitä, onko kohtaaminen auki.
 */
import { el } from './mapart.js';
import { avaaFokusKohtaaminen, fokusvirtaKohtaamispiste } from './fokusvirta.js';
import { sfx } from './sound.js';

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const PISTE_OSUMA_R = 22;

/** Tyylitiedoston tunnus — sama tiedosto kuin fokusvirran korteilla. */
const PISTE_TYYLIN_TUNNUS = 'fokusvirta-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole.
 *
 * Sama kaava ja sama syy kuin fokusvirralla ja fokuskohteilla:
 * css/styles.css on toisen työvaiheen hallussa. Tunnus on sama kuin
 * fokusvirran lataajalla, joten tiedosto ladataan enintään kerran
 * kummasta tahansa moduulista — kevyessä kulussa korttipintaa ei
 * välttämättä avata koskaan, joten piste ei voi jäädä sen varaan.
 *
 * NIMET ON PREFIKSOITU (lataaPisteTyyli, PISTE_*), koska yhden
 * tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs).
 */
function lataaPisteTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PISTE_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa tyylit ovat jo sivun <style>-lohkossa.
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = PISTE_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusvirta.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function varmistaPistekerros(ui) {
  if (!ui.svg) return null;
  if (!ui.fokuspisteKerros?.isConnected || ui.fokuspisteKerros.ownerSVGElement !== ui.svg) {
    ui.fokuspisteKerros = el('g', { class: 'fokuspisteet' }, ui.svg);
    ui.fokuspisteAvain = null;
  }
  // Kerros on napautettava, joten sen on pysyttävä päällimmäisenä myös
  // silloin kun jokin muu kerros on lisätty sen jälkeen.
  if (ui.fokuspisteKerros.nextSibling) ui.svg.appendChild(ui.fokuspisteKerros);
  return ui.fokuspisteKerros;
}

/** Yksi merkki: näkymätön osuma-alue, kaksi hehkukehää ja ydin. */
function piirraPiste(ui, ryhma, city, nimi) {
  const g = el('g', { class: 'fokuspiste' }, ryhma);
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${nimi}: tapaa paikallinen`);
  el('circle', { class: 'fokuspiste-osuma', r: PISTE_OSUMA_R }, g);
  // Mitat kasvatettu 25.8.2026: omistaja ei löytänyt pistettä iPadilta
  // ("kartalla ei näy vihreää pistettä") — merkin on erottava
  // käsivarren mitalta, ei vasta etsimällä.
  el('circle', { class: 'fokuspiste-hehku', r: 13 }, g);
  el('circle', { class: 'fokuspiste-keha', r: 7.2 }, g);
  el('circle', { class: 'fokuspiste-ydin', r: 3.4 }, g);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    // Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
    // napautuksia vastaan — sama kiireen esto kuin kaupungin laatalla.
    if (ui.busy) return;
    sfx.play('paper');
    avaaFokusKohtaaminen(ui, city);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * Piste kartalle ja sen koko zoomin mukaan.
 *
 * KUTSUTAAN SAMASTA KOHDASTA KUIN VINJETIT JA FOKUSKOHTEET (js/ui.js
 * paivitaMaastonimet ja render) sekä suoraan siitä hetkestä, jolloin
 * AARTEEN AVAUS ratkeaa (js/fokustehtavat.js) — muuten piste odottaisi
 * seuraavaa kartan liikettä.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain ankkuri-
 * ryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaFokuspiste(ui) {
  if (typeof document === 'undefined') return;
  const kerros = varmistaPistekerros(ui);
  if (!kerros) return;
  const city = ui.katselu ? null : ui.game?.cityOf?.();
  const piste = city ? fokusvirtaKohtaamispiste(ui, city) : null;
  const avain = piste
    ? `${ui.game.pack.id}:${city.id}:${piste.x}:${piste.y}`
    : 'tyhja';
  if (ui.fokuspisteAvain !== avain) {
    ui.fokuspisteAvain = avain;
    kerros.textContent = '';
    ui.fokuspisteRyhmat = [];
    if (piste) {
      lataaPisteTyyli();
      // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
      for (const x of ui.kiertoKohdat?.(piste.x) ?? [piste.x]) {
        const ryhma = el('g', { class: 'fokuspiste-ryhma' }, kerros);
        ui.fokuspisteRyhmat.push({ g: ryhma, x, y: piste.y });
        piirraPiste(ui, ryhma, city, piste.nimi);
      }
    }
  }
  const skaala = ui.nakyvaAlue?.()?.skaala;
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!skaala || !Number.isFinite(skaala) || skaala <= 0) return;
  const zoom = (1 / skaala).toFixed(4);
  for (const ryhma of ui.fokuspisteRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
  }
}

/** Laudan vaihto tai uusi peli: piste pois ja muisti nollille. */
export function nollaaFokuspiste(ui) {
  ui.fokuspisteAvain = null;
  ui.fokuspisteRyhmat = [];
  if (ui.fokuspisteKerros?.isConnected) ui.fokuspisteKerros.textContent = '';
}
