/*
 * ETSI AARRE -NAPPI KARTALLA KAUPUNGIN LAATAN VIERESSÄ.
 *
 * OMISTAJAN TILAUS 9.9.2026 (Raamattu, PULUN KOMMENTIN JALKEEN
 * KARTALLE NAPPI "ETSI AARRE" KAUPUNGIN LAATAN VIEREEN, sanatarkasti):
 * *"kun pulun kommentti on tullut, kartalle saisi tulla kaupungin
 * laatan viereen nappi: Etsi aarre, mikä avaisi kaupunkilehden."*
 *
 * Saapumisen kulku kartalla on siis: matkakirjan luenta (+ luentakuva)
 * → pulun kommenttikupla → TÄMÄ NAPPI kaupungin laatan (pallolla
 * pisteen) viereen. Nappi on kartalla se ovi, jonka pelaaja saa itse
 * valita — mikään ei ponnahda auki sen takaa itsestään.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA EIVÄT NÄY DIFFISTÄ ────────────────────────
 *
 *  1. VASTA KOMMENTIN JÄLKEEN. Kytkentä on siinä yhdessä kohdassa,
 *     jossa kommenttikupla oikeasti nousee ruudulle (js/fokusvirta.js
 *     fokusvirtaSaapumiskupla → nayta), ei kutsuhetkellä. Luenta voi
 *     kestää minuutin, ja nappi ennen kommenttia veisi katseen pois
 *     isoisän merkinnästä.
 *
 *  2. SAMA OVI KUIN KORTIN "ETSI KÄTKÖ" — SAMA FUNKTIO, EI KOPIOTA.
 *     Painallus kutsuu `ui.etsiKatko()`, jonka takana on täsmälleen se
 *     ketju, jonka saapumiskortin nappi ajaa (js/ui.js). Kopioitu
 *     ketju ajautuisi ensimmäisessä muutoksessa erilleen, ja kaupungin
 *     lehteen olisi kaksi eri tietä.
 *
 *  3. SAMA EHTO KUIN KORTIN NAPILLA. Kaupunki, jossa ei ole enää
 *     kätköä etsittävänä, ei saa nappia (js/game.js tehtavaTarjolla →
 *     js/ui.js tehtavaNapinTila): harmaa tai valheellinen nappi
 *     kartalla olisi pahempi kuin ei nappia lainkaan.
 *
 * ── MIKSI HTML EIKÄ SVG ────────────────────────────────────────────
 *
 * Nappi elää karttaruudun päällä HTML-kerroksena samalla kaavalla kuin
 * pulun paikkamerkki (js/pulu-paikka.js): paikka lasketaan joka
 * kehyksellä näkyvästä alueesta
 *
 *     ruutuX = paneW/2 + (kaupunki.x - keskus.x) * skaala
 *
 * jolloin SAMA KOODI PALVELEE MOLEMPIA LAUTOJA — tasokartan SVG-solmu
 * ei kelpaisi pallolle eikä pallon pintamerkki tasokartalle. Näkyvä
 * alue tulee `ui.nakyvaAlue()`-kahvasta, jonka js/ui.js delegoi
 * pallolle pallon ollessa hereillä. Tässä tiedostossa ei siis ole
 * lautahaaraa.
 *
 * TUONTILISTA ON YKSI RIVI TARKOITUKSELLA. Sama näkymän keskus luetaan
 * pulun paikkamerkissä (js/pulu-paikka.js lahtonakyma), mutta sitä EI
 * voi tuoda tänne: js/fokusvirta.js tuo tämän moduulin, ja
 * pulu-paikka → js/fokuskohteet.js → js/fokusvirta.js sulkisi
 * tuontirenkaan (fokuskohteet kutsuu asetaKohdehakemistoa jo
 * latautuessaan, ja rengas kaataisi koko pelin käynnistyksen). Kolme
 * riviä kaavaa on halvempi kuin rengas — kaava itse on kirjattu yllä.
 */

import { html } from './ui-apurit.js';

/** Napin teksti on omistajan sanelema, eikä se vaihdu kaupungin mukaan. */
export const ETSI_AARRE_TEKSTI = 'Etsi aarre';

/** Kehysten väli, jolla ehto ja ruudun mitat tarkistetaan uudelleen. */
const TARKISTUSVALI_KEHYKSIA = 6;

/**
 * Onko kaupungissa vielä kätkö etsittävänä — SAMA EHTO KUIN KORTIN
 * NAPILLA (js/ui.js tehtavaNapinTila; sen pohjalla js/game.js
 * tehtavaTarjolla). `pois` tarkoittaa kortilla harmaata nappia:
 * kartalla harmaata ei ole, vaan nappi jää silloin kokonaan pois.
 */
export function etsiAarreTarjolla(ui, city) {
  if (!ui || !city) return false;
  const tila = ui.tehtavaNapinTila?.(city);
  return Boolean(tila && !tila.pois);
}

/**
 * Näkymän keskus ja skaala laudan yksiköissä (sama luku kuin
 * js/pulu-paikka.js lahtonakyma; ks. tuontilista tiedoston alussa).
 */
function napinNakymanKeskus(ui) {
  const alue = ui?.nakyvaAlue?.();
  if (!alue || !(alue.w > 0) || !Number.isFinite(alue.x) || !Number.isFinite(alue.y)) return null;
  return { x: alue.x + alue.w / 2, y: alue.y + alue.h / 2, skaala: alue.skaala };
}

/** Ankkurin ruutupaikka näkyvästä alueesta; null jos mittaa ei ole. */
function ruutupaikka(ui, city, mitat) {
  const tila = napinNakymanKeskus(ui);
  if (!tila || !(tila.skaala > 0) || !mitat?.w || !mitat?.h) return null;
  /*
   * KIERTÄVÄ LAUTA: maailmankartta toistuu laudan leveyden välein, ja
   * nappi kuuluu siihen kopioon, joka on lähinnä näkymän keskipistettä
   * (sama korjaus kuin pulun paikkamerkillä).
   */
  const jakso = ui.contentBox?.w ?? 0;
  let dx = city.x - tila.x;
  if (jakso > 0) dx -= Math.round(dx / jakso) * jakso;
  return {
    x: mitat.w / 2 + dx * tila.skaala,
    y: mitat.h / 2 + (city.y - tila.y) * tila.skaala,
  };
}

/** Kirjoittaa ankkurin muunnoksen ja häivyttää ruudun ulkopuolella. */
function paivitaPaikka(naytto) {
  const paikka = ruutupaikka(naytto.ui, naytto.city, naytto.mitat);
  if (!paikka) return;
  const { x, y } = paikka;
  naytto.ankkuri.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  /*
   * Ruudun ulkopuolella nappi ei näyttäisi mitään, ja pallolla se on
   * kaukana keskeltä myös epätarkka: silloin se häivytetään pois sen
   * sijaan että se valehtelisi paikan (sama sääntö kuin pulun
   * paikkamerkillä). Häivytys ei pura nappia — pelaaja saa sen takaisin
   * vetämällä kaupungin näkyviin.
   */
  const { w, h } = naytto.mitat;
  const hukassa = x < 0 || y < 0 || x > w || y > h;
  naytto.ankkuri.classList.toggle('hukassa', hukassa);
}

/**
 * Kehyssilmukka: nappi seuraa karttaa panoroitaessa ja zoomatessa, ja
 * poistuu itsestään jos pelaaja siirtyy pois kaupungista tai kätkö
 * ehditään löytää muuta kautta.
 *
 * Ilman requestAnimationFramea (testiympäristö, taustavälilehti) nappi
 * jää aloituspaikkaansa — se on oikea paikka siihen asti, kunnes
 * karttaa liikutetaan.
 */
function seuraaKarttaa(naytto) {
  let laskuri = 0;
  const askel = () => {
    if (naytto.ui?.etsiAarreNappi !== naytto) return;
    if (laskuri % TARKISTUSVALI_KEHYKSIA === 0) {
      const pane = naytto.ui?.mapPane;
      naytto.mitat = { w: pane?.clientWidth ?? 0, h: pane?.clientHeight ?? 0 };
      // Kaupunki vaihtui tai kätkö löytyi: nappi ei jää valehtelemaan.
      if (naytto.ui.game?.cityOf?.()?.id !== naytto.city.id
        || !etsiAarreTarjolla(naytto.ui, naytto.city)) {
        piilotaEtsiAarreNappi(naytto.ui);
        return;
      }
    }
    paivitaPaikka(naytto);
    laskuri += 1;
    naytto.kehys = globalThis.requestAnimationFrame?.(askel) ?? 0;
  };
  naytto.kehys = globalThis.requestAnimationFrame?.(askel) ?? 0;
}

/**
 * Nostaa napin kartalle kaupungin laatan viereen.
 *
 * @param {object} ui pelin käyttöliittymä
 * @param {object} city kaupunki, jonka kommentti juuri tuli ruudulle
 * @returns {boolean} nousiko nappi ruudulle
 */
export function naytaEtsiAarreNappi(ui, city) {
  if (typeof document === 'undefined' || !ui || !city) return false;
  if (!etsiAarreTarjolla(ui, city)) return false;
  const pane = ui.mapPane ?? document.querySelector?.('.map-pane') ?? null;
  if (!pane) return false;
  // Sama kaupunki kahdesti (paluukäynti, toinen kupla) ei tee toista nappia.
  if (ui.etsiAarreNappi?.city?.id === city.id) return true;
  piilotaEtsiAarreNappi(ui);

  /*
   * ANKKURI ON NOLLAN KOKOINEN ja istuu täsmälleen kaupungin kohdalla;
   * skripti kirjoittaa vain sen muunnoksen. Nappi kasvaa ankkurista
   * alas oikealle (css .etsi-aarre-nappi) riippumatta tekstin
   * pituudesta: nimi ja piste jäävät sen yläpuolelle vasemmalle.
   */
  const ankkuri = html('div', 'etsi-aarre-ankkuri');
  const nappi = html('button', 'etsi-aarre-nappi', ETSI_AARRE_TEKSTI);
  nappi.type = 'button';
  nappi.title = `${city.name}: avaa kaupungin lehti`;
  nappi.setAttribute('aria-label', `Etsi aarre: ${city.name}`);
  ankkuri.appendChild(nappi);

  const naytto = {
    ui,
    city,
    ankkuri,
    nappi,
    mitat: { w: pane.clientWidth ?? 0, h: pane.clientHeight ?? 0 },
    kehys: 0,
  };

  nappi.addEventListener('click', () => {
    // Nappi väistyy heti: lehti on auki, eikä sen alle jää ovea samaan
    // paikkaan. Sama ovi kuin kortin "Etsi kätkö" — sama funktio.
    piilotaEtsiAarreNappi(ui);
    ui.etsiKatko?.();
  });

  pane.appendChild(ankkuri);
  ui.etsiAarreNappi = naytto;
  paivitaPaikka(naytto);
  /*
   * NOUSU ON LUOKANVAIHTO, EI ANIMAATIO (sama kaava kuin luentakuvalla):
   * nappi ladotaan läpinäkyvänä ja saa `nakyy`-luokan seuraavassa
   * kehyksessä, jolloin css:n siirtymä hoitaa nousun. Varmistus
   * ajastimella siltä varalta, ettei requestAnimationFrame ole
   * käytössä (testiympäristö, taustavälilehti).
   */
  const nayta = () => { if (ui.etsiAarreNappi === naytto) ankkuri.classList.add('nakyy'); };
  globalThis.requestAnimationFrame?.(nayta);
  setTimeout(nayta, 50);
  seuraaKarttaa(naytto);
  return true;
}

/**
 * Nappi pois kartalta: kaupungista lähdettäessä (js/fokusvirta.js
 * vaiennaLivianKaupunkipuhe), lehden auetessa napista ja kätkön
 * löydyttyä muuta kautta.
 */
export function piilotaEtsiAarreNappi(ui) {
  if (!ui) return;
  const naytto = ui.etsiAarreNappi;
  ui.etsiAarreNappi = null;
  if (!naytto) return;
  if (naytto.kehys) globalThis.cancelAnimationFrame?.(naytto.kehys);
  naytto.ankkuri.remove();
}
