/*
 * SELATTAVA KUVASARJA KORTILLE — YKSI TOTEUTUS, KOLME KÄYTTÄJÄÄ.
 *
 * Tämä oli js/fokusnosto.js:n piirraNostonKuvasarja (skandaalikortin
 * galleria 2.9.2026, täkynoston `galleria` erässä 10). Siirretty omaan
 * moduuliinsa 20.9.2026, kun omistaja tilasi saman karusellin myös
 * KOHDEKORTILLE (js/fokuskohteet.js: Avignonin paavinpalatsi näytti
 * `kuva` + `kuvat` kahtena kuvana allekkain) — fokuskohteet.js ei voi
 * tuoda fokusnosto.js:ää (tuonti kulkee toiseen suuntaan), joten runko
 * asuu tässä ja kumpikin kutsuja antaa omat riippuvuutensa parametreina:
 * kuvan LATAAJA (`lataa`: nostot assetOsoite('nostot'), kohteet
 * assetOsoite('ihmeet')), SUURENNOKSEN AVAAJA (`avaaSuurennos`) ja
 * kuvakohtaisen KORISTEEN (`koristele`: ihmenauha kohdekortilla).
 *
 * VALMIS KUVAKEHYS ON SARJAN PÄÄKUVA (js/nostokuva.js). Vaiheessa 1
 * kortissa on pelkkä sarjan ENSIMMÄINEN kuva isona, lyhyt kuvateksti ja
 * "Lisää" — ei nuolia. Vaiheessa 2 sarja rakennetaan SAMAN kehyksen
 * ympärille: sama figure, sama nappi, sama img ja sama src, joten kuva
 * ei liiku eikä lataudu uudestaan. Nuolet ja laskuri ilmaantuvat kuvan
 * päälle, ja kuvatekstin sekä lähderivin paikan ottavat kehyksen omat
 * rivit (.nostokuva-teksti, .nostokuva-lahde), joita selaus päivittää
 * kuvan mukana.
 *
 * PUUTTUVA KUVA POISTUU SARJASTA. Havainnekuva syntyy kuvajonossa kohde
 * kerrallaan, joten sarjassa voi olla osoite, jota ämpärissä ei vielä
 * ole. Virheen sattuessa kuva pudotetaan listalta ja seuraava
 * näytetään; jos yksikään ei lataudu, koko kehys piiloutuu.
 *
 * ── PYYHKÄISY JA NUOLINÄPPÄIMET (omistaja 20.9.2026, kohta 5) ──────
 *
 * Reunanuolet eivät riitä puhelimella: sarjaa selataan myös
 * pyyhkäisemällä (pointer-eleet: vaakasiirto ≥ PYYHKAISY_PX ja enemmän
 * vaakaa kuin pystyä) ja nuolinäppäimillä (vasen/oikea, kun kortti on
 * auki eikä kohdistus ole tekstikentässä). Pyyhkäisyn päättävä click
 * nielaistaan, jottei se avaa suurennosta. Näppäinkuuntelija on
 * dokumentissa vain niin kauan kuin kehys on sivulla — se tarkistaa
 * `isConnected` joka painalluksella ja poistaa itsensä, kun kortti on
 * suljettu.
 */

import { html } from './ui-apurit.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import { kortinKuvalahde } from './tekijakortti.js';
import { lisaaHavainnekuvaMerkki } from './havainnekuva.js';
import { sfx } from './sound.js';

/** Pyyhkäisyn vähimmäismatka vaakasuunnassa (px). */
export const PYYHKAISY_PX = 30;

/**
 * @param {object} ui pelin ui
 * @param {Element} sailio kortin sisus
 * @param {object[]} kuvat sarjan kuvat (vähintään kaksi)
 * @param {object} asetukset
 * @param {string} asetukset.otsikko varateksti alt-riville
 * @param {Element} [asetukset.valmisKehys] KUVA EDELLÄ -avauksen kehys
 * @param {string} asetukset.kehysLuokka figuren luokat
 * @param {string} asetukset.nuoliLuokka selailunuolen luokka
 * @param {string} asetukset.laskuriLuokka laskurin luokka
 * @param {number} asetukset.leveys kuvan pyydetty leveys pikseleinä
 * @param {(img, kuva, leveys, onVirhe) => void} asetukset.lataa kuvan lataaja
 * @param {(ui, kuva, ankkuri: () => Element) => void} asetukset.avaaSuurennos
 * @param {(nappi: Element, kuva: object) => void} [asetukset.koristele]
 *   kuvakohtainen koriste napin sisään (esim. ihmenauha); kutsutaan
 *   joka näytöllä, edellinen koriste (`.kuvasarja-koriste`) poistetaan
 * @param {string} [asetukset.kuvatekstiLuokka] kuvatekstin span-luokka
 * @param {string} [asetukset.lahdeLuokka] lähderivin span-luokka
 * @param {string} [asetukset.kuvatekstiKaare] figcaption-luokka
 * @param {string} [asetukset.nappiLuokka] kuvanapin luokka
 * @returns {{ seuraava: () => void, edellinen: () => void, kohdalla: () => number }}
 */
export function piirraKuvasarja(ui, sailio, kuvat, {
  otsikko = '', valmisKehys = undefined, kehysLuokka, nuoliLuokka,
  laskuriLuokka, leveys, lataa, avaaSuurennos, koristele = null,
  kuvatekstiLuokka = 'fokusnosto-kuvaselite', lahdeLuokka = 'fokusnosto-kuvalahde',
  kuvatekstiKaare = 'fokusnosto-kuvateksti', nappiLuokka = 'fokusnosto-kuvanappi',
}) {
  const jaljella = [...kuvat];
  const kehys = valmisKehys ?? html('figure', kehysLuokka);
  const nappi = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-nappi')
    : html('button', nappiLuokka);
  const img = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-img')
    : document.createElement('img');
  if (valmisKehys) {
    for (const luokka of kehysLuokka.split(' ')) {
      if (luokka) kehys.classList.add(luokka);
    }
  } else {
    nappi.type = 'button';
    nappi.title = 'Katso kuva suurempana';
    img.decoding = 'async';
    img.draggable = false;
    nappi.appendChild(img);
    kehys.appendChild(nappi);
  }

  const selite = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-teksti')
    : html('span', kuvatekstiLuokka);
  const lahderivi = valmisKehys
    ? valmisKehys.querySelector('.nostokuva-lahde')
    : html('span', lahdeLuokka);
  if (!valmisKehys) {
    const kuvateksti = html('figcaption', kuvatekstiKaare);
    kuvateksti.append(selite, lahderivi);
    kehys.appendChild(kuvateksti);
  }

  const laskuri = html('span', laskuriLuokka);
  let kohdalla = 0;

  /**
   * @param {boolean} [lataaKuva] `false` jättää kuvan koskematta: valmis
   *   kehys näyttää jo oikeaa kuvaa, eikä src:ää saa kirjoittaa
   *   uudestaan (selain lataisi kuvan ja se välähtäisi).
   */
  const nayta = (lataaKuva = true) => {
    if (!jaljella.length) {
      kehys.hidden = true;
      return;
    }
    kohdalla = ((kohdalla % jaljella.length) + jaljella.length) % jaljella.length;
    const kuva = jaljella[kohdalla];
    // Kortilla lyhyt, suurennoksessa pitkä (js/kuvatekstit.js).
    img.alt = kuvatekstiLyhyt(kuva) || otsikko || '';
    nappi.setAttribute('aria-label', `${kuvatekstiLyhyt(kuva) || 'Kuva'} — avaa suurena`);
    selite.textContent = kuvatekstiLyhyt(kuva);
    // Generoitu kuva kertoo sen jo kortilla (js/havainnekuva.js).
    lisaaHavainnekuvaMerkki(selite, kuva);
    /*
     * LÄHDERIVI ON KUVAN OMA, ja se kulkee taytaLahderivin läpi, joten
     * "Matkakirjan havainnekuva" saa painettavan selitteen joka kerta
     * (js/havainnekuva.js) ja Commons-kuvan tekijä näkyy niin kuin
     * lisenssi vaatii.
     */
    kortinKuvalahde(lahderivi, kuva.lahde ?? '', kuva);
    laskuri.textContent = jaljella.length > 1 ? `${kohdalla + 1} / ${jaljella.length}` : '';
    laskuri.hidden = jaljella.length < 2;
    // Suurennos näyttää sen kuvan, joka on kohdalla — myös silloin kun
    // napin avaa js/nostokuva.js.
    kehys.nostokuvaKuva = kuva;
    if (koristele) {
      nappi.querySelector('.kuvasarja-koriste')?.remove();
      koristele(nappi, kuva);
    }
    if (!lataaKuva) return;
    lataa(img, kuva, leveys, () => {
      const paikka = jaljella.indexOf(kuva);
      if (paikka < 0) return;
      jaljella.splice(paikka, 1);
      if (kohdalla > paikka) kohdalla -= 1;
      nayta();
    });
  };
  nayta(!valmisKehys);

  const siirry = (suunta) => {
    if (jaljella.length < 2) return;
    kohdalla += suunta;
    sfx.play('paper');
    nayta();
  };

  // Pyyhkäisyn päättävä click ei saa avata suurennosta.
  let pyyhkaisty = 0;
  const nieleClick = () => pyyhkaisty && Date.now() - pyyhkaisty < 400;

  // Napautus suurentaa, kuten kortin muillakin kuvilla; suurennos saa
  // sen kuvan, joka on kohdalla. Valmiilla kehyksellä kuuntelija on jo
  // paikallaan (js/nostokuva.js) eikä sitä saa lisätä toista kertaa —
  // mutta pyyhkäisyn nielaisu kuuluu silloinkin ENNEN sitä (capture).
  nappi.addEventListener('click', (tapahtuma) => {
    if (nieleClick()) { tapahtuma.stopImmediatePropagation(); tapahtuma.preventDefault(); }
  }, true);
  if (!valmisKehys) {
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (!jaljella.length) return;
      avaaSuurennos(ui, jaljella[kohdalla], () => nappi);
    });
  }

  /* ── pyyhkäisy ─────────────────────────────────────────────────── */
  let alku = null;
  nappi.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button !== 0) return;
    alku = { x: e.clientX, y: e.clientY, id: e.pointerId };
  });
  const paata = (e) => {
    if (!alku || (e.pointerId != null && alku.id != null && e.pointerId !== alku.id)) return;
    const dx = e.clientX - alku.x;
    const dy = e.clientY - alku.y;
    alku = null;
    if (Math.abs(dx) < PYYHKAISY_PX || Math.abs(dx) <= Math.abs(dy)) return;
    pyyhkaisty = Date.now();
    siirry(dx < 0 ? 1 : -1);
  };
  nappi.addEventListener('pointerup', paata);
  nappi.addEventListener('pointercancel', () => { alku = null; });

  /* ── nuolinäppäimet ─────────────────────────────────────────────── */
  const nappain = (e) => {
    if (!kehys.isConnected) { document.removeEventListener('keydown', nappain); return; }
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const kohde = e.target;
    if (kohde instanceof Element && kohde.closest('input, textarea, select, [contenteditable="true"]')) return;
    // Piilotettu kehys (esim. peittävä suurennos tai toinen kortti
    // päällä) ei vastaa näppäimiin.
    if (kehys.hidden || !(kehys.getClientRects?.().length)) return;
    e.preventDefault();
    siirry(e.key === 'ArrowRight' ? 1 : -1);
  };
  if (typeof document !== 'undefined') document.addEventListener('keydown', nappain);

  const nuoli = (luokka, merkki, nimi, suunta) => {
    const nap = html('button', `${nuoliLuokka} ${luokka}`, merkki);
    nap.type = 'button';
    nap.setAttribute('aria-label', nimi);
    nap.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      siirry(suunta);
    });
    nappi.appendChild(nap);
  };
  nuoli('edellinen', '‹', 'Edellinen kuva', -1);
  nuoli('seuraava', '›', 'Seuraava kuva', 1);
  nappi.appendChild(laskuri);

  sailio.appendChild(kehys);
  return { seuraava: () => siirry(1), edellinen: () => siirry(-1), kohdalla: () => kohdalla };
}
