/*
 * LINSSIN HAMPURILAISVALIKKO — palkin oikea laita.
 *
 * Omistajan linjaus 8.9.2026 (Raamattu "LINSSIEN HAMPURILAINEN
 * OIKEASSA YLAKULMASSA"), sanatarkasti: *"Kummankin linssin ja myös
 * tulevien linssien oikeaan yläreunaan voisi laittaa hampurilaisen,
 * mistä löytyisi järjestyksessä ylhäältä alas: poistu, aloita alusta,
 * kertoja (on/off) ja taustamusiikki (on/off). Poistu ja aloita alusta
 * napit voi ottaa yläpalkista siten pois näkyvistä."*
 *
 * ── MIKSI OMA TOTEUTUS EIKÄ MATKAKIRJAN PÄÄVALIKKO ─────────────────
 *
 * Matkakirjan oma hampurilainen (#menu-btn, #paavalikko) asuu
 * yläpalkissa, ja linssin ajan koko yläpalkki on piilossa
 * (css/aikajana.css body.aikajana-palkki-auki .topbar). Linssi tarvitsee
 * siis oman napin omaan palkkiinsa. IKONI JA PUDOTUSVALIKON KAAVA OVAT
 * SAMAT — kolme viivaa (`.viiva-ikoni`, css/styles.css), pudotus napin
 * alle oikeaan reunaan, sulku ulkopuolisesta napautuksesta ja Escistä —
 * jotta pelaaja tunnistaa saman valikon myös linssissä.
 *
 * ── NELJÄ KOHTAA, YKSI JÄRJESTYS ───────────────────────────────────
 *
 *   1. Poistu           sama teko kuin entisellä ✕:llä (ui.pysaytaAikajana)
 *   2. Aloita alusta    sama teko kuin entisellä ↺:llä (ajo.aloitaAlusta)
 *   3. Kertoja          js/luenta.js luentaKytkinPaalla / asetaLuentaKytkin
 *   4. Taustamusiikki   js/musiikkivalitsin.js musiikkiPaalla / asetaMusiikkiPaalla
 *
 * Kaksi ensimmäistä ovat komentoja (role="menuitem"), kaksi jälkimmäistä
 * kytkimiä (role="menuitemcheckbox" + aria-checked). Kytkimet ovat PELIN
 * OMIA kytkimiä eivätkä linssin paikallisia: sama kertoja vaikenee
 * matkakirjan merkinnöissä ja sama musiikki hiljenee kartalla — linssin
 * valikko on vain toinen kahva samaan asiaan (sama kaava kuin
 * matkakirjakortin kaiuttimella, js/luenta.js).
 *
 * KAIKKI KOHDAT SULKEVAT VALIKON valinnasta (myös kytkimet), ja
 * kytkimen tila kirjoitetaan riville ENNEN sulkua, joten seuraava avaus
 * näyttää aina totuuden. Tila luetaan uudestaan joka avauksella
 * (`paivita`) — kytkintä voi kääntää muualtakin.
 *
 * ── TILA ON DOM:SSA, EI MUUTTUJASSA ────────────────────────────────
 *
 * `auki()` lukee `valikko.hidden`-tiedon eikä omaa lippua, koska valikon
 * voi sulkea myös yhteinen vartija (js/ui-apurit.js
 * suljeAvoimetValikot), joka kirjoittaa suoraan `hidden`- ja
 * `aria-expanded`-tiedot. Yksi totuus, ei kahta.
 */

import { el } from './mapart.js';
import { asetaLuentaKytkin, luentaKytkinPaalla } from './luenta.js';
import { asetaMusiikkiPaalla, musiikkiPaalla } from './musiikkivalitsin.js';
import { pysaytaLinssiluenta } from './linssipuhe.js';
import { pysaytaLukija } from './lukija.js';

/** Pudotusvalikon tunnus (aria-controls, js/ui-apurit.js VALIKKOKERROKSET). */
export const VALIKON_TUNNUS = 'aikajana-valikko';

/** Hampurilaisnapin luokka (savukkeet ja yhteinen sulkuvartija). */
export const VALIKON_NAPPI_LUOKKA = 'aikajana-valikko-nappi';

function solmu(tag, luokka, teksti) {
  const e = document.createElement(tag);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/**
 * Kolme viivaa samalla kynällä kuin Matkakirjan päävalikossa
 * (index.html #menu-btn). Rakennetaan solmuina eikä innerHTML:llä,
 * jotta sama koodi kelpaa myös tynkäselaimen testeissä.
 */
function viivaIkoni() {
  const kuori = solmu('span', 'viiva-ikoni');
  const svg = el('svg', { viewBox: '0 0 24 24' });
  el('path', { d: 'M4.5 7h15M4.5 12h15M4.5 17h15' }, svg);
  svg.setAttribute('aria-hidden', 'true');
  kuori.appendChild(svg);
  return kuori;
}

/**
 * Linssin valikko: nappi + pudotusvalikko yhtenä koteloituna osana.
 *
 * @param {object} asetukset
 * @param {object} asetukset.ui pelin UI (kertojan pysäytys)
 * @param {Function} asetukset.onPoistu Poistu-kohdan teko
 * @param {Function} asetukset.onAlusta Aloita alusta -kohdan teko
 * @param {Function} [asetukset.onMusiikki] kutsutaan kytkimen uudella
 *   tilalla, jotta linssin oma raita tottelee samaa kytkintä
 * @returns {object} kahvat: kotelo, nappi, valikko, kohtien napit,
 *   auki/avaa/sulje/vaihda/paivita/pura
 */
export function luoLinssivalikko({
  ui = null, onPoistu = null, onAlusta = null, onMusiikki = null,
} = {}) {
  const kotelo = solmu('div', 'aikajana-valikko-kotelo');
  const nappi = solmu('button', `aikajana-nappi ${VALIKON_NAPPI_LUOKKA}`);
  nappi.type = 'button';
  nappi.title = 'Valikko';
  nappi.setAttribute('aria-label', 'Valikko');
  nappi.setAttribute('aria-haspopup', 'true');
  nappi.setAttribute('aria-expanded', 'false');
  nappi.setAttribute('aria-controls', VALIKON_TUNNUS);
  nappi.appendChild(viivaIkoni());

  const valikko = solmu('div', 'aikajana-valikko');
  valikko.id = VALIKON_TUNNUS;
  valikko.setAttribute('role', 'menu');
  valikko.setAttribute('aria-label', 'Linssin valikko');
  valikko.hidden = true;

  const auki = () => !valikko.hidden;
  const sulje = () => {
    if (!auki()) return false;
    valikko.hidden = true;
    nappi.setAttribute('aria-expanded', 'false');
    return true;
  };

  /** Komento: yksi teko ja valikko kiinni. */
  const komento = (luokka, teksti, teko) => {
    const rivi = solmu('button', `aikajana-valikko-kohta ${luokka}`, teksti);
    rivi.type = 'button';
    rivi.setAttribute('role', 'menuitem');
    rivi.addEventListener('click', () => { sulje(); teko?.(); });
    valikko.appendChild(rivi);
    return rivi;
  };

  /*
   * Kytkinrivi: nimi vasemmalla, tila oikealla ("päällä"/"pois").
   * Nimi ja tila ovat omat solmunsa, jotta tilan voi ladota eri
   * sävyllä ilman että riviä kirjoitetaan uusiksi.
   */
  const kytkin = (luokka, nimi, lue, kirjoita) => {
    const rivi = solmu('button', `aikajana-valikko-kohta aikajana-valikko-kytkin ${luokka}`);
    rivi.type = 'button';
    rivi.setAttribute('role', 'menuitemcheckbox');
    const nimiSolmu = solmu('span', 'aikajana-valikko-nimi', nimi);
    const tilaSolmu = solmu('span', 'aikajana-valikko-tila');
    rivi.append(nimiSolmu, tilaSolmu);
    rivi.paivita = () => {
      const paalla = Boolean(lue());
      rivi.setAttribute('aria-checked', paalla ? 'true' : 'false');
      rivi.classList.toggle('valittu', paalla);
      tilaSolmu.textContent = paalla ? 'päällä' : 'pois';
      rivi.title = `${nimi}: ${paalla ? 'päällä' : 'pois'}`;
      rivi.setAttribute('aria-label', rivi.title);
    };
    rivi.addEventListener('click', () => {
      kirjoita(!lue());
      // Tila riville heti, vasta sitten sulku: seuraava avaus näyttää
      // totuuden, eikä rivi jää kertomaan vanhaa.
      rivi.paivita();
      sulje();
    });
    rivi.paivita();
    valikko.appendChild(rivi);
    return rivi;
  };

  // 1. Poistu — entinen ✕.
  const poistuNappi = komento('aikajana-valikko-poistu', 'Poistu', () => onPoistu?.());
  // 2. Aloita alusta — entinen ↺.
  const alustaNappi = komento('aikajana-valikko-alusta', 'Aloita alusta', () => onAlusta?.());
  /*
   * 3. Kertoja. Pois kesken luennan tarkoittaa hiljaisuutta HETI eikä
   * lauseen lopusta: linssin luenta pysäytetään samalla kahvalla kuin
   * muuallakin (js/linssipuhe.js pysaytaLinssiluenta) ja lukija
   * vaiennetaan. Kello ja esitys jatkavat ilman ääntä.
   */
  const kertojaNappi = kytkin('aikajana-valikko-kertoja', 'Kertoja', luentaKytkinPaalla, (paalla) => {
    asetaLuentaKytkin(paalla);
    if (!paalla) { pysaytaLinssiluenta(ui); pysaytaLukija(); }
  });
  /*
   * 4. Taustamusiikki. Kytkin on pelin oma (js/musiikkivalitsin.js), ja
   * sen kuuntelijat hoitavat pohjaraidan. Linssin oma raita
   * (js/siirtymamusiikki.js) ei ole kuuntelijoiden joukossa, joten se
   * saa käskyn tästä takaisinkutsusta.
   */
  const musiikkiNappi = kytkin('aikajana-valikko-musiikki', 'Taustamusiikki', musiikkiPaalla, (paalla) => {
    asetaMusiikkiPaalla(paalla);
    onMusiikki?.(paalla);
  });

  const paivita = () => {
    kertojaNappi.paivita();
    musiikkiNappi.paivita();
  };

  const avaa = () => {
    paivita();
    valikko.hidden = false;
    nappi.setAttribute('aria-expanded', 'true');
  };
  const vaihda = () => { if (auki()) sulje(); else avaa(); };

  nappi.addEventListener('click', vaihda);
  kotelo.append(nappi, valikko);

  /*
   * ULKOPUOLINEN NAPAUTUS SULKEE. Kartalle osuvan napautuksen hoitaa jo
   * yhteinen vartija (js/ui-apurit.js asennaValikonSulkuvartija, joka
   * lukee VALIKKOKERROKSET-listan ja nielaisee saman napautuksen, jottei
   * kartalta aukea kohdetta valikon sulkiessa) — tämä kuuntelija kattaa
   * lopun ruudusta ja on sama kaava kuin päävalikolla (js/main.js).
   */
  const ulkopuolella = (e) => {
    if (!auki()) return;
    if (e.target?.closest?.('.aikajana-valikko-kotelo')) return;
    sulje();
  };
  document.addEventListener?.('pointerdown', ulkopuolella);

  return {
    kotelo,
    nappi,
    valikko,
    poistuNappi,
    alustaNappi,
    kertojaNappi,
    musiikkiNappi,
    auki,
    avaa,
    sulje,
    vaihda,
    paivita,
    pura() {
      document.removeEventListener?.('pointerdown', ulkopuolella);
      kotelo.remove?.();
    },
  };
}
