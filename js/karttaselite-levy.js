/*
 * PEUKALOLEVY — pystysuuntainen liukukahva selitelistan oikeaan
 * reunaan (omistajan päätös 22.9.2026 karttaselitteen uudistuksesta:
 * *"monivalinta pois, tilalle mekaanisen näköinen liuku"*). Levy
 * osoittaa AINA tasan yhteen riviin — siihen, joka on valittuna — ja
 * napsahtaa uuden rivin kohdalle, kun valinta vaihtuu.
 *
 * MODUULI ON PUHDAS RAKENNIN. Se ei tunne aiheita, värejä eikä
 * karttavaloja: se saa valmiit rivielementit sisään ja kertoo
 * ulospäin vain, mihin riviin pelaaja koski. Näin sama levy kelpaa
 * sekä Nostot- että Maakunnat-välilehdelle (js/karttaselite.js
 * asetaMaakunnat antaa Maakunnat-rakentajalle `{ levy: luoPeukalolevy
 * }`, jotta kummallakin välilehdellä on sama liukukahva eikä kahta
 * kilpailevaa toteutusta).
 *
 * KAKSI VUOROVAIKUTUSTA:
 *   (a) pointerdown levyllä + pystyraahaus (setPointerCapture) — levy
 *       seuraa sormea, ja pointerup napsahtaa lähimpään riviin.
 *   (b) napautus mihin tahansa riviin — rivit ovat omia nappejaan
 *       (kutsuja hoitaa niiden click-kuuntelun), ja tämä moduuli vain
 *       siirtää levyn perässä, kun kutsuja ilmoittaa uuden valinnan
 *       `paivita`-kutsulla.
 *
 * ASEMOINTI LASKETAAN VAIN AVATESSA TAI VALINNAN VAIHTUESSA (omistajan
 * rajaus), EI KEHYKSITTÄIN: `offsetTop` pakottaa selaimen laskemaan
 * asettelun (reflow), eikä sitä pidä tehdä useammin kuin on pakko.
 * Siksi rivien sijainnit luetaan vasta `sijoita`-funktion sisällä eikä
 * esimerkiksi resize- tai scroll-kuuntelijassa.
 *
 * REDUCED MOTION on CSS:n asia (css/styles.css
 * `@media (prefers-reduced-motion: reduce)`), ei tämän moduulin —
 * sama työnjako kuin muualla pelissä (ei matchMedia-kutsuja täällä).
 *
 * NIMET EIVÄT OLE PREFIKSOITU TALON TAVAN MUKAAN (karttaselite-/
 * KARTTASELITE_), koska funktioiden nimet (`lahinRivi`,
 * `luoPeukalolevy`) ovat omistajan tilauksen omat täsmälliset nimet ja
 * testien tuomia sellaisenaan (tests/karttaselite-levy.test.mjs).
 * Kumpikaan nimi ei törmää mihinkään muuhun niputettuun tiedostoon
 * (tools/tarkista-niputus.mjs vahtii tämän koneellisesti).
 */
import { html } from './ui-apurit.js';

/**
 * Lähin rivi pystykoordinaattia `y` kohti.
 *
 * Puhdas funktio: ei DOMia, ei sivuvaikutuksia. `rivienYt` on lista
 * `{ valinta, y }` -pareja (rivin oma tunnus ja sen pystykeskikohta
 * samassa koordinaatistossa kuin `y`) — juuri se, mitä `luoPeukalolevy`
 * mittaa rivielementeistä, mutta viety ulos testattavaksi ilman DOMia.
 *
 * @param {number} y
 * @param {Array<{ valinta: string, y: number }>} rivienYt
 * @returns {?string} lähimmän rivin `valinta`, tai null tyhjälle listalle.
 */
export function lahinRivi(y, rivienYt) {
  let paras = null;
  let pieninEtaisyys = Infinity;
  for (const rivi of rivienYt) {
    const etaisyys = Math.abs(rivi.y - y);
    if (etaisyys < pieninEtaisyys) {
      pieninEtaisyys = etaisyys;
      paras = rivi;
    }
  }
  return paras ? paras.valinta : null;
}

/**
 * Peukalolevy yhteen rivilistaan.
 *
 * @param {object} asetukset
 * @param {Element} asetukset.lista   rivien säiliö. CSS:ssä
 *   `position: relative` (css/styles.css .karttaselite-lista) — levy
 *   lisätään sen lapseksi ja asemoidaan sen sisällä `position:
 *   absolute`illa.
 * @param {Map<string, Element>} asetukset.rivit  valinnan tunnus →
 *   rivielementti, DOM-järjestyksessä ylhäältä alas. Näppäinnuolet
 *   kulkevat tätä järjestystä.
 * @param {string} asetukset.valittu  alkuvalinta (ei siirtymää).
 * @param {(valinta: string) => void} asetukset.valitse  kutsutaan kun
 *   levy raahataan lähimpään riviin tai näppäimistö siirtää valintaa.
 *   Kutsuja päättää, mitä valinta tarkoittaa, ja kertoo levylle uuden
 *   tilan takaisin `paivita`-kutsulla — levy ei koskaan päätä
 *   valintaa itse, se vain ehdottaa sitä.
 * @returns {{ paivita(valittu: string): void, pura(): void }}
 */
export function luoPeukalolevy({
  lista, rivit, valittu, valitse,
}) {
  const jarjestys = [...rivit.keys()];

  const levy = html('div', 'karttaselite-peukalolevy');
  levy.setAttribute('role', 'slider');
  levy.setAttribute('tabindex', '0');
  levy.setAttribute('aria-valuemin', '0');
  levy.setAttribute('aria-valuemax', String(Math.max(0, jarjestys.length - 1)));
  /*
   * LINSSI (omistaja 22.9.2026): vedin on läpinäkyvä, ja sen keskellä on
   * pieni pyöreä linssi, jossa valitun rivin luku näkyy hieman
   * suurennettuna pallopyöristymällä (CSS: säteittäinen kiilto ja
   * reunan varjo — ei kuvaa). Luku kopioidaan rivin lukusolusta, koska
   * oikea suurennus vaatisi kankaan; kopio linssin sisällä riittää.
   */
  const linssi = html('span', 'karttaselite-peukalolevy-linssi');
  linssi.setAttribute('aria-hidden', 'true');
  levy.appendChild(linssi);
  lista.appendChild(levy);

  let nykyinen = valittu;
  let raahataan = false;

  /*
   * RIVIN OMA LUKU PIILOON LINSSIN ALTA (omistaja 22.9.2026,
   * sanatarkasti: *"Suurennoslasin alta paistaa myös se pienempi
   * numero."*). Linssissä on sama luku suurennettuna, joten rivin oma
   * luku näkyi sen takaa kahtena. Piilotus on `visibility`, ei
   * `display`: rivin ladelma ei saa hypätä, kun levy liukuu sen yli.
   *
   * Luokka menee RIVILLE eikä lukusolulle, jotta sama sääntö kelpaa
   * molemmille välilehdille (.karttaselite-luku ja .maakunnat-luku).
   * Nimi on `luku-linssin-alla`, koska `.linssin-alla` on jo varattu
   * pallokuoren omaksi tilaksi (css/styles.css .pallo-kuori).
   */
  const LINSSIN_ALLA = 'luku-linssin-alla';
  function merkitseLinssinAlla(valinta) {
    for (const [tunnus, rivi] of rivit) {
      rivi.classList.toggle(LINSSIN_ALLA, !levy.hidden && tunnus === valinta);
    }
  }

  /** Rivien pystykeskikohdat `lista`-elementin omassa koordinaatistossa. */
  function rivienYt() {
    // Piilossa oleva rivi (suljettu maaryhmä, offsetHeight 0) ei ole ehdokas.
    return jarjestys.filter((valinta) => rivit.get(valinta)?.offsetHeight > 0).map((valinta) => {
      const rivi = rivit.get(valinta);
      return { valinta, y: rivi.offsetTop + (rivi.offsetHeight / 2) };
    });
  }

  /** Levy nykyisen valinnan rivin kohdalle. */
  function sijoita(animoi) {
    const rivi = rivit.get(nykyinen);
    // Ei valintaa tai valittu rivi piilossa (suljettu ryhmä): levy pois näkyvistä.
    levy.hidden = !rivi || !(rivi.offsetHeight > 0);
    if (levy.hidden) {
      // Levy pois: yksikään rivi ei ole linssin alla, joten luvut takaisin.
      merkitseLinssinAlla(null);
      return;
    }
    levy.classList.toggle('ei-siirtyma', !animoi);
    levy.style.height = `${rivi.offsetHeight}px`;
    levy.style.transform = `translateY(${rivi.offsetTop}px)`;
    paivitaLinssi();
  }

  /** Linssin luku, aria-teksti ja rivin oman luvun piilotus. */
  function paivitaLinssi() {
    const rivi = rivit.get(nykyinen);
    if (!rivi) return;
    const nimi = rivi.querySelector('.karttaselite-nimi')?.textContent ?? rivi.textContent ?? '';
    levy.setAttribute('aria-valuetext', nimi.trim());
    levy.setAttribute('aria-valuenow', String(Math.max(0, jarjestys.indexOf(nykyinen))));
    // Luku luetaan RIVILTÄ ennen piilotusta: visibility ei tyhjennä tekstiä.
    linssi.textContent = (rivi.querySelector('.karttaselite-luku, .maakunnat-luku')?.textContent ?? '').trim();
    merkitseLinssinAlla(nykyinen);
  }
  sijoita(false);

  levy.addEventListener('pointerdown', (tapahtuma) => {
    raahataan = true;
    levy.classList.add('ei-siirtyma');
    levy.setPointerCapture(tapahtuma.pointerId);
  });
  levy.addEventListener('pointermove', (tapahtuma) => {
    if (!raahataan) return;
    const laatikko = lista.getBoundingClientRect();
    const katto = Math.max(0, lista.scrollHeight - levy.offsetHeight);
    const y = tapahtuma.clientY - laatikko.top - (levy.offsetHeight / 2);
    levy.style.transform = `translateY(${Math.min(Math.max(0, y), katto)}px)`;
    /*
     * VALINTA VAIHTUU JO RAAHATESSA (omistaja 22.9.2026, sanatarkasti:
     * *"vipu liikkuisi sormen mukana, jos siitä ottaa kiinni
     * reaaliajassa, ja kartalla vaihtuisi myös tiedot reaaliajassa"*).
     * Ennen valinta vaihtui vasta irrotuksessa, joten kartta oli koko
     * raahauksen ajan väärässä tilassa. Kutsu lähtee VAIN rivin
     * vaihtuessa — valojen koneisto käy läpi kartan merkit, eikä sitä
     * saa ajaa joka pointermovella.
     */
    const uusi = lahinRivi(tapahtuma.clientY - laatikko.top, rivienYt());
    if (uusi && uusi !== nykyinen) valitse(uusi);
  });
  const lopetaRaahaus = (tapahtuma) => {
    if (!raahataan) return;
    raahataan = false;
    levy.classList.remove('ei-siirtyma');
    const laatikko = lista.getBoundingClientRect();
    const y = tapahtuma.clientY - laatikko.top;
    const uusi = lahinRivi(y, rivienYt());
    if (uusi) valitse(uusi); else sijoita(true);
  };
  levy.addEventListener('pointerup', lopetaRaahaus);
  levy.addEventListener('pointercancel', lopetaRaahaus);

  levy.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key !== 'ArrowUp' && tapahtuma.key !== 'ArrowDown') return;
    tapahtuma.preventDefault();
    const idx = jarjestys.indexOf(nykyinen);
    const seuraava = jarjestys[idx + (tapahtuma.key === 'ArrowDown' ? 1 : -1)];
    if (seuraava) valitse(seuraava);
  });

  return {
    /** Kutsuja ilmoittaa uuden valinnan — levy napsahtaa sen kohdalle. */
    paivita(uusiValittu) {
      nykyinen = uusiValittu;
      /*
       * KESKEN RAAHAUKSEN LEVY SEURAA SORMEA, EI VALINTAA. Reaaliaikainen
       * valinta kutsuu tätä kesken vedon, ja `sijoita` nykäisisi levyn
       * rivin kohdalle sormen alta — juuri se tökkiminen, jonka
       * raahauksen piti poistaa. Linssin luku ja piilotus päivittyvät
       * silti heti.
       */
      if (raahataan) { paivitaLinssi(); return; }
      sijoita(true);
    },
    /** Levy pois DOM:sta (välilehden/valikon purkaminen). */
    pura() {
      for (const rivi of rivit.values()) rivi.classList.remove(LINSSIN_ALLA);
      levy.remove();
    },
  };
}
