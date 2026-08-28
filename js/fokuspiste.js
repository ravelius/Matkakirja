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
 *    joiden `opacity` ja `transform` TUIKKIVAT (css/fokusvirta.css
 *    fokuspiste-tuike). Kartan rasterointi ei kilpaile sen kanssa —
 *    animoituvat vain ne kaksi ominaisuutta, jotka kompositori osaa
 *    yksin.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu). Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan VAKIOLLA (js/ui.js fokusMerkkiSkaala), jolloin merkin
 *    lapset ovat ruudun pikseleitä LEHDEN PERUSTASOLLA ja kasvavat tai
 *    kutistuvat siitä kartan mukana. Osuma-alueen r = 22 on siis 44 px
 *    läpimitta perustasolla — sama sormisääntö kuin kaupungin laatalla
 *    (js/ui.js FOKUS_LAATTA_OSUMA_PX) — ja lähizoomilla, jossa piste
 *    oikeasti napautetaan, sitä isompi.
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
import { el, maare } from './mapart.js';
import { avaaFokusKohtaaminen, fokusvirtaKohtaamispiste } from './fokusvirta.js';
import { sfx } from './sound.js';

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const PISTE_OSUMA_R = 22;

/*
 * MERKKI ON PIENI JA TUIKKIVA (omistajan pelitestitilaus 26.8.2026,
 * iPhone: *"se voisi kyllä olla paljon pienempi, kun se on aarrepiste,
 * kohan se tuikkii"*).
 *
 * Mitat pienenivät kolmasosaan (hehku 13 → 5,5; kehä 7,2 → 3,2; ydin
 * 3,4 → 1,8): 25.8. mitat kasvatettiin, koska pistettä ei löytynyt
 * iPadilta, mutta löytämisen hoitaa nyt TUIKE eikä koko. Osuma-alue on
 * ennallaan 44 px, joten sormi osuu yhtä hyvin kuin ennenkin.
 */
const PISTE_HEHKU_R = 5.5;
const PISTE_KEHA_R = 3.2;
const PISTE_YDIN_R = 1.8;

/*
 * PISTE POIS KAUPUNGIN LAATAN PÄÄLTÄ (omistajan pelitestitilaus
 * 26.8.2026: *"Vihreä piste on hämäävä, kun se korvaa Ateenan
 * pisteen... Piste kannattaisi siirtää jonnekin muualle"*).
 *
 * Kohtaamispaikan koordinaatit ovat DATAA (js/packs/fokusvirta-*.js
 * kohtaamispiste.laudat) ja ne kertovat, missä henkilö oikeasti on —
 * useassa maassa keskustassa eli kaupungin laatan kohdalla (Ateena,
 * Sofia, Istanbul, Rooma, Sarajevo, Bukarest). Kartalla kaksi merkkiä
 * samassa pisteessä on kuitenkin yksi merkki: vihreä piste näytti
 * korvaavan Ateenan.
 *
 * SIIRTO ON ESITYSTÄ, EI DATAA. Jos piste osuu PISTE_ERO_MIN yksikön
 * sisään laatasta, PIIRRETTY merkki siirretään kiinteästi koilliseen
 * (oikealle ja ylös) niin että molemmat näkyvät erikseen; datan
 * koordinaatteihin ei kosketa, eikä sääntö tarvitse yhtään
 * maakohtaista poikkeusta.
 */
const PISTE_ERO_MIN = 14;
const PISTE_SIIRTO_X = 14;
const PISTE_SIIRTO_Y = -10;

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
  // Pieni merkki, joka löytyy tuikkeesta eikä koosta (ks. PISTE_*_R).
  el('circle', { class: 'fokuspiste-hehku', r: PISTE_HEHKU_R }, g);
  el('circle', { class: 'fokuspiste-keha', r: PISTE_KEHA_R }, g);
  el('circle', { class: 'fokuspiste-ydin', r: PISTE_YDIN_R }, g);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    // Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
    // napautuksia vastaan — sama kiireen esto kuin kaupungin laatalla.
    if (ui.busy) return;
    // Sama selkeä avausääni kuin kohdepopupeilla, ja ENNEN kortin
    // rakentamista (v1119, kohta 17).
    sfx.play('popup');
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
      /*
       * SIVUSIIRTO VAIN LÄHELLÄ LAATTAA (ks. PISTE_ERO_MIN). Etäisyys
       * mitataan kaupungin keskipisteestä, eli siitä samasta kohdasta,
       * johon laatta ja käännetyn laatan aarremerkki piirtyvät.
       */
      const lahella = Number.isFinite(city.x) && Number.isFinite(city.y)
        && Math.hypot(piste.x - city.x, piste.y - city.y) < PISTE_ERO_MIN;
      const sx = lahella ? PISTE_SIIRTO_X : 0;
      const sy = lahella ? PISTE_SIIRTO_Y : 0;
      // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
      for (const x of ui.kiertoKohdat?.(piste.x) ?? [piste.x]) {
        const ryhma = el('g', { class: 'fokuspiste-ryhma' }, kerros);
        ui.fokuspisteRyhmat.push({ g: ryhma, x: x + sx, y: piste.y + sy });
        piirraPiste(ui, ryhma, city, piste.nimi);
      }
    }
  }
  asetaPisteMittakaava(ui, 1);
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit),
  // vaikka vakioskaala ei enää tarvitse vastaskaalaa: varapolku
  // (lehdetön näkymä) on yhä ruutumitassa ja tarvitsee sen.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.fokuspisteVastaskaala ??= (suhde) => asetaPisteMittakaava(ui, suhde));
}

/**
 * Ankkuriryhmien mittakaava — VAKIO, ei zoomin käänteisluku.
 *
 * `suhde` on käynnissä olevan nipistyseleen kerroin (1 = ei elettä), ja
 * vakioskaalassa se ohitetaan: ele suurentaa pisteen kartan mukana.
 * Vain lehdetön varapolku (js/ui.js fokusMerkkiSkaala) käyttää sitä.
 */
function asetaPisteMittakaava(ui, suhde) {
  /*
   * KATETTU SKAALA (omistaja 28.8.2026, js/ui.js
   * fokusMerkkiSkaalaKartalle): piste on kartan merkintä muiden
   * joukossa, eikä kapea ruutu saa paisuttaa sitä yli lehden omien
   * symbolien. Osuma-ympyrä pidetään sormen mitassa kertomalla säde
   * takaisin ylös — sama kahden mitan sääntö kuin kohdemerkeillä.
   */
  const s = ui.fokusMerkkiSkaalaKartalle?.(suhde) ?? ui.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  const osumaR = PISTE_OSUMA_R * (ui.fokusMerkkiOsumaKerroin?.(suhde) ?? 1);
  const zoom = s.toFixed(4);
  for (const ryhma of ui.fokuspisteRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
    const osuma = ryhma.g.querySelector?.('.fokuspiste-osuma');
    if (osuma) maare(osuma, 'r', osumaR.toFixed(2));
  }
}

/** Laudan vaihto tai uusi peli: piste pois ja muisti nollille. */
export function nollaaFokuspiste(ui) {
  ui.fokuspisteAvain = null;
  ui.fokuspisteRyhmat = [];
  if (ui.fokuspisteKerros?.isConnected) ui.fokuspisteKerros.textContent = '';
}
