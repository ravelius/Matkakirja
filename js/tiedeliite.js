/*
 * TIEDELIITE — keksijän oma lehtisivu Keksinnöt-linssistä.
 *
 * Raamattu, Karttalinssit, KEKSIJAT LINSSIN ALARIVILLA JA TIEDELIITE
 * (omistaja 3.9.2026, sanatarkasti): *"sitten kun henkilo klikkaa,
 * niin siella voisi olla generoidun kuvan lisaksi myos se oikea kuva
 * ja ne kaikki kuvat olisi kiva taittaa lehden muotoon samalle
 * sivulle. lehden otsikko voisi olla tiede-liite tms. pelaaja voisi
 * liikkua myos lehden sivuilla alanappien ja hampurilaisen kautta
 * edellisiin ja seuraaviin keksijoihin"*.
 *
 * ── MUOTO ─────────────────────────────────────────────────────────
 *
 * Sivu on LISÄLEHDEN TAITTOPERHETTÄ (css/fokusnosto.css osio 9,
 * luokat looppi-*): sama nimiö-, päiväys-, otsikko-, ingressi- ja
 * palstasääntö kuin skandaalin lööpillä (js/skandaalit.js
 * piirraSkandaalinSisus) — vain nimiö on "Tiedeliite" ja kuori oma
 * (.tiedeliite-kerros / .tiedeliite-kortti, css/aikajana.css), koska
 * jokainen korttiperhe siivoaa omat kerroksensa valitsimella.
 * Rakenne ylhäältä alas:
 *
 *   ☰ (hampurilainen)                    nimiö "Tiedeliite"          ✕
 *   päiväysrivi kaksoisviivoin           vuosi · paikka
 *   PÄÄOTSIKKO                           keksintö
 *   ingressi                             linssin lyhyt selite
 *   KASVOT vierekkäin                    generoitu muotokuva (+ toinen
 *                                        keksijä) JA aito Commons-kuva
 *   ilmiökuva(t) kuvateksteineen         ilmio, ilmioLisa
 *   leipäteksti palstoina                juttu
 *   lähderivi                            lahde
 *   ‹ edellinen keksijä | seuraava ›     alanapit
 *
 * Kaikki kuvat ovat samalla sivulla, kuten omistaja tilasi: generoitu
 * ja aito muotokuva rinnakkain (aito on todiste, generoitu on
 * tunnistettava kasvo), ilmiökuvat niiden alla lehden kuvina.
 *
 * ── LIIKKUMINEN ───────────────────────────────────────────────────
 *
 * Alanapit vievät edelliseen ja seuraavaan keksijään; hampurilainen
 * avaa sisällyksen, jossa kaikki keksijät vuosineen. Merkkipaalu
 * (1873, isoisän lähtö) ohitetaan, koska sillä ei ole keksijää eikä
 * juttua. Sivun vaihto on ristihäivytys samassa kortissa (Raamattu:
 * KAIKKI LIIKE ANIMOIDAAN PEHMEASTI) — kortti ei sulkeudu ja avaudu
 * uudelleen. Kutsuja saa tiedon vaihdosta (`kunVaihtuu`), jotta
 * linssin paneeli ja valo voivat seurata sivua.
 *
 * ── MITÄ TÄMÄ EI OLE ──────────────────────────────────────────────
 *
 * Ei kaupunkilehden sivu (js/lehti.js) eikä nähtävyyskortti
 * (js/nahtavyydet.js): Tiedeliite on linssin oma lehti, joka elää
 * aikajanan päällä ja katoaa sen mukana (js/aikajana.js pura →
 * suljeTiedeliite).
 */

import { html, jaaKappaleiksi, nielaiseSulkevaNapautus } from './ui-apurit.js';
import { asetaNostonKuva, piirraNostonKuva } from './fokusnosto.js';
import { taytaLahderivi } from './tekijakortti.js';
import { avaaKohdeSuurennos, suljeKohdeSuurennos } from './fokuskohteet.js';
import { sfx } from './sound.js';

/** Ilmiökuvan leveys sivulla (sama kuin skandaalin kortilla). */
const TIEDELIITE_KUVA_PX = 800;
/** Muotokuvan leveys kasvoriveissä — kolme rinnakkain 40 rem:n sivulla. */
const TIEDELIITE_KASVO_PX = 400;
/** Kuvan suurennoksen ui-avain (sulkusiivous ja Esc-väistö). */
const ZOOM_AVAIN = 'tiedeliiteZoom';

/*
 * KAKSI TYYLITIEDOSTOA LAINASSA — sama järjestely kuin skandaalilla
 * (js/skandaalit.js SKANDAALI_TYYLIT): lööpin luokat ovat täkynoston
 * (css/fokusnosto.css), kuori ja kasvorivi linssin omassa tiedostossa
 * (css/aikajana.css). Tunnukset ovat samat kuin omistajilla, joten
 * kumpikin ladataan sivulle enintään kerran.
 */
const TIEDELIITE_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['aikajana-tyyli', 'aikajana.css'],
];

function tiedeliiteLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of TIEDELIITE_TYYLIT) {
    if (document.getElementById(tunnus)) continue;
    const linkki = document.createElement('link');
    linkki.id = tunnus;
    linkki.rel = 'stylesheet';
    linkki.href = new URL(tiedosto, peruslinkki.href).href;
    document.head.appendChild(linkki);
  }
}

/* ==================== PUHTAAT APURIT ==================== */

/** Onko kuvatiedolla lähde: Commons-tiedosto tai valmis ämpäriosoite. */
const onKuva = (kuva) => Boolean(kuva?.tiedosto || kuva?.osoite);

/** Sivullinen pysäkki: keksijä, jolla on juttu — merkkipaalu ei ole. */
export function onTiedeliitteenSivu(t) {
  return Boolean(t && !t.paalu && t.juttu);
}

/**
 * Sivun kuvat kolmessa ryhmässä. Kasvorivillä ovat generoidut
 * muotokuvat (`kuva`, `kuvaToinen`) ja niiden perässä aito Commons-
 * kuva (`kuvaAito`); ilmiökuvat (`ilmio`, `ilmioLisa`) tulevat omalle
 * rivilleen. Kuvaton kenttä karsiutuu, joten rivi ei koskaan varaa
 * paikkaa kuvalle, jota ei ole.
 */
export function tiedeliitteenKuvat(t) {
  return {
    kasvot: [t?.kuva, t?.kuvaToinen, t?.kuvaAito].filter(onKuva),
    ilmiot: [t?.ilmio, t?.ilmioLisa].filter(onKuva),
  };
}

/**
 * Edellinen ja seuraava sivullinen pysäkki indeksistä `i`; -1 kun
 * kaaren pää tulee vastaan. Merkkipaalut hypätään yli molempiin
 * suuntiin.
 */
export function tiedeliitteenNaapurit(tapahtumat, i) {
  const etsi = (suunta) => {
    for (let j = i + suunta; j >= 0 && j < tapahtumat.length; j += suunta) {
      if (onTiedeliitteenSivu(tapahtumat[j])) return j;
    }
    return -1;
  };
  return { edellinen: etsi(-1), seuraava: etsi(1) };
}

/** Kaupungin nimi tapahtumasta (paikka on datan kenttä). */
const paikka = (t) => t.paikka ?? t.kaupunki ?? '';

/* ==================== SIVUN SISUS ==================== */

/**
 * KASVORIVI: generoitu muotokuva, mahdollinen toinen keksijä ja aito
 * kuva vierekkäin, jokaisella oma kuvateksti ja lähderivi. Napautus
 * suurentaa kuten kortin muillakin kuvilla; latautumaton kuva
 * pudotetaan riviltä (kehys piiloon), jottei paperille jää tyhjää
 * laatikkoa.
 */
function piirraKasvot(ui, sailio, kuvat, henkilo) {
  if (!kuvat.length) return;
  const rivi = html('div', 'tiedeliite-kasvot');
  rivi.dataset.maara = String(kuvat.length);
  for (const kuva of kuvat) {
    const kehys = html('figure', 'tiedeliite-kasvo');
    const nappi = html('button', 'fokusnosto-kuvanappi');
    nappi.type = 'button';
    nappi.title = 'Katso kuva suurempana';
    nappi.setAttribute('aria-label', `${kuva.selite ?? henkilo ?? 'Kuva'} — avaa suurena`);
    const img = document.createElement('img');
    img.alt = kuva.selite ?? henkilo ?? '';
    img.decoding = 'async';
    img.draggable = false;
    asetaNostonKuva(img, kuva, TIEDELIITE_KASVO_PX, () => { kehys.hidden = true; });
    nappi.appendChild(img);
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      avaaKohdeSuurennos(ui, kuva, () => nappi, ZOOM_AVAIN);
    });
    kehys.appendChild(nappi);
    const teksti = html('figcaption', 'fokusnosto-kuvateksti');
    teksti.append(
      html('span', 'fokusnosto-kuvaselite', kuva.selite ?? ''),
      taytaLahderivi(html('span', 'fokusnosto-kuvalahde'), kuva.lahde ?? '', kuva),
    );
    kehys.appendChild(teksti);
    rivi.appendChild(kehys);
  }
  sailio.appendChild(rivi);
}

/** Yhden keksijän sivu lööpin riveinä. */
function piirraTiedeliitteenSivu(ui, sailio, t, lahdeVara) {
  sailio.appendChild(html('p', 'looppi-nimio', 'Tiedeliite'));
  const paivays = [t.vuosi, paikka(t)].filter(Boolean).join(' · ');
  if (paivays) sailio.appendChild(html('p', 'looppi-paivays', paivays));
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko looppi-otsikko', t.otsikko));
  if (t.henkilo) sailio.appendChild(html('p', 'tiedeliite-henkilo', t.henkilo));
  for (const kappale of jaaKappaleiksi(t.selite ?? '')) {
    sailio.appendChild(html('p', 'looppi-ingressi', kappale));
  }
  const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
  piirraKasvot(ui, sailio, kasvot, t.henkilo);
  for (const kuva of ilmiot) {
    piirraNostonKuva(ui, sailio, kuva, 'fokusnosto-kuva', TIEDELIITE_KUVA_PX, ZOOM_AVAIN);
  }
  const teksti = html('div', 'fokusnosto-teksti looppi-leipa');
  for (const kappale of jaaKappaleiksi(t.juttu ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  if (teksti.childElementCount) sailio.appendChild(teksti);
  const lahde = t.lahde ?? lahdeVara;
  if (lahde) sailio.appendChild(taytaLahderivi(html('p', 'fokusnosto-lahde'), lahde, t));
}

/* ==================== AVAUS JA SULKU ==================== */

/**
 * Avaa Tiedeliitteen pysäkille `i`. Palauttaa ohjaimen, jolla kutsuja
 * voi vaihtaa sivua (`vaihda(j)`), tai null jos pysäkillä ei ole
 * sivua.
 *
 * @param {object} ui pelin ui-olio (kortin kirjanpito ui.tiedeliite)
 * @param {object[]} tapahtumat linssin tapahtumat järjestyksessä
 * @param {number} i avattava pysäkki
 * @param {object} [asetukset]
 * @param {string} [asetukset.lahdeVara] lähderivi, jos pysäkillä ei omaa
 * @param {(j: number) => void} [asetukset.kunVaihtuu] sivu vaihtui
 * @param {() => void} [asetukset.kunSuljetaan] kortti suljettiin
 */
export function avaaTiedeliite(ui, tapahtumat, i, {
  lahdeVara = null, kunVaihtuu = null, kunSuljetaan = null,
} = {}) {
  if (typeof document === 'undefined') return null;
  if (!onTiedeliitteenSivu(tapahtumat?.[i])) return null;
  sfx.play('paper');
  tiedeliiteLataaTyyli();
  suljeTiedeliite(ui);

  const kerros = html('div', 'tiedeliite-kerros');
  const kortti = html('div', 'tiedeliite-kortti fokusnosto-looppi');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  /*
   * HAMPURILAINEN JA SISÄLLYS: sama mustepiirros kuin lehden nimiössä
   * (css/styles.css .lehti-hampurilainen), tässä kortin vasemmassa
   * yläkulmassa. Levy listaa kaikki keksijät vuosineen; nykyinen on
   * lihavoitu. Napautus levyn ulkopuolelle sulkee levyn, ei korttia.
   */
  const hampurilainen = html('button', 'tiedeliite-hampurilainen');
  hampurilainen.type = 'button';
  hampurilainen.title = 'Sisällys';
  hampurilainen.setAttribute('aria-label', 'Sisällys: kaikki keksijät');
  hampurilainen.setAttribute('aria-expanded', 'false');
  hampurilainen.append(html('span'), html('span'), html('span'));
  kortti.appendChild(hampurilainen);

  const sisallys = html('nav', 'tiedeliite-sisallys');
  sisallys.hidden = true;
  sisallys.setAttribute('aria-label', 'Keksijät');
  kortti.appendChild(sisallys);

  const sisalto = html('div', 'fokusnosto-sisalto tiedeliite-sisalto');
  kortti.appendChild(sisalto);

  const navi = html('div', 'tiedeliite-navi');
  const edellinenNappi = html('button', 'tiedeliite-navinappi edellinen');
  const seuraavaNappi = html('button', 'tiedeliite-navinappi seuraava');
  edellinenNappi.type = 'button';
  seuraavaNappi.type = 'button';
  navi.append(edellinenNappi, seuraavaNappi);
  kortti.appendChild(navi);

  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  let nykyinen = -1;
  let sivu = null;

  const naviteksti = (nappi, j, merkki, ennen) => {
    const t = tapahtumat[j];
    nappi.disabled = !t;
    nappi.textContent = '';
    if (!t) {
      nappi.textContent = ennen ? `${merkki} Kaaren alku` : `Kaaren loppu ${merkki}`;
      nappi.setAttribute('aria-label', ennen ? 'Ei edellistä keksijää' : 'Ei seuraavaa keksijää');
      return;
    }
    const nimi = t.henkilo ?? t.otsikko;
    nappi.append(
      html('span', 'tiedeliite-navimerkki', merkki),
      html('span', 'tiedeliite-navinimi', `${t.vuosi} ${nimi}`),
    );
    nappi.setAttribute('aria-label', `${ennen ? 'Edellinen' : 'Seuraava'} keksijä: ${t.vuosi} ${nimi}`);
  };

  const suljeSisallys = () => {
    sisallys.hidden = true;
    hampurilainen.setAttribute('aria-expanded', 'false');
  };

  const taytaSisallys = () => {
    sisallys.textContent = '';
    tapahtumat.forEach((t, j) => {
      if (!onTiedeliitteenSivu(t)) return;
      const rivi = html('button', `tiedeliite-sisallysrivi${j === nykyinen ? ' nykyinen' : ''}`);
      rivi.type = 'button';
      rivi.append(
        html('span', 'tiedeliite-sisallysvuosi', String(t.vuosi)),
        html('span', 'tiedeliite-sisallysnimi', t.henkilo ?? t.otsikko),
      );
      if (j === nykyinen) rivi.setAttribute('aria-current', 'page');
      rivi.addEventListener('click', () => { suljeSisallys(); vaihda(j); });
      sisallys.appendChild(rivi);
    });
  };

  /**
   * SIVUN VAIHTO RISTIHÄIVYTYKSENÄ: vanha sivu häipyy, uusi tulee
   * tilalle ja vieritys palaa alkuun. Kesto tulee CSS:stä
   * (.tiedeliite-sivu), reduced motion vaihtaa heti.
   */
  const vaihda = (j, { heti = false } = {}) => {
    const t = tapahtumat[j];
    if (!onTiedeliitteenSivu(t) || j === nykyinen) return;
    nykyinen = j;
    kortti.setAttribute('aria-label', `Tiedeliite: ${t.otsikko}`);
    const uusi = html('div', 'tiedeliite-sivu');
    piirraTiedeliitteenSivu(ui, uusi, t, lahdeVara);
    const vanha = sivu;
    sivu = uusi;
    const { edellinen, seuraava } = tiedeliitteenNaapurit(tapahtumat, j);
    naviteksti(edellinenNappi, edellinen, '‹', true);
    naviteksti(seuraavaNappi, seuraava, '›', false);
    edellinenNappi.onclick = () => { if (edellinen >= 0) { sfx.play('paper'); vaihda(edellinen); } };
    seuraavaNappi.onclick = () => { if (seuraava >= 0) { sfx.play('paper'); vaihda(seuraava); } };
    if (!vanha || heti) {
      sisalto.textContent = '';
      sisalto.appendChild(uusi);
    } else {
      suljeKohdeSuurennos(ui, ZOOM_AVAIN);
      vanha.classList.add('vaihtuu');
      uusi.classList.add('tulossa');
      sisalto.appendChild(uusi);
      void uusi.offsetWidth;
      uusi.classList.remove('tulossa');
      const pois = () => vanha.remove();
      vanha.addEventListener('transitionend', pois, { once: true });
      setTimeout(pois, 400);
    }
    sisalto.scrollTop = 0;
    kunVaihtuu?.(j);
  };

  const kiinni = () => {
    sfx.play('paper');
    suljeTiedeliite(ui);
  };
  sulje.addEventListener('click', kiinni);
  hampurilainen.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (sisallys.hidden) {
      taytaSisallys();
      sisallys.hidden = false;
      hampurilainen.setAttribute('aria-expanded', 'true');
    } else {
      suljeSisallys();
    }
  });
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus). Kortin
  // sisällä napautus levyn ulkopuolelle sulkee vain levyn.
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.tiedeliite-kortti')) {
      if (!sisallys.hidden && !tapahtuma.target.closest('.tiedeliite-sisallys, .tiedeliite-hampurilainen')) {
        suljeSisallys();
      }
      return;
    }
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key === 'Escape') {
      // Kuvan suurennos ja sisällyslevy sulkeutuvat ensin.
      if (ui?.[ZOOM_AVAIN]) return;
      tapahtuma.stopPropagation();
      if (!sisallys.hidden) { suljeSisallys(); return; }
      suljeTiedeliite(ui);
      return;
    }
    if (tapahtuma.key === 'ArrowLeft' && !edellinenNappi.disabled) edellinenNappi.click();
    if (tapahtuma.key === 'ArrowRight' && !seuraavaNappi.disabled) seuraavaNappi.click();
  };
  document.addEventListener('keydown', nappain, true);

  ui.tiedeliite = {
    kerros,
    vaihda,
    purku: () => {
      document.removeEventListener('keydown', nappain, true);
      kunSuljetaan?.();
    },
  };

  vaihda(i, { heti: true });
  void kerros.offsetWidth;
  kerros.classList.add('tiedeliite-auki');
  return ui.tiedeliite;
}

/** Sulkee Tiedeliitteen; turvallinen myös kun mitään ei ole auki. */
export function suljeTiedeliite(ui) {
  const auki = ui?.tiedeliite;
  if (ui) ui.tiedeliite = null;
  auki?.purku?.();
  suljeKohdeSuurennos(ui, ZOOM_AVAIN);
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.tiedeliite-kerros')) vanha.remove();
}

/** Onko Tiedeliite auki. */
export function tiedeliitePaalla(ui) {
  return Boolean(ui?.tiedeliite);
}
