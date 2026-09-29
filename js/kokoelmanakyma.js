/*
 * ══════════════════════════════════════════════════════════════════
 * YHTEINEN KOKOELMANÄKYMÄ: LINSSIT JA AARTEET
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN TILAUS 29.9.2026 (pillerivalikkouudistus, ks.
 * js/pilleri-valikko.js): Linssit- ja Aarteet-näkymillä on sama
 * kaksivaiheinen napautus — "1. napautus: paneelin VASEMMALLE puolelle
 * nousee esikatselukortti ... ja rivi muuttuu samassa kohdassa
 * napiksi. 2. napautus samaan kohtaan ... [tekee toiminnon]." Linssit
 * käyttivät tätä kaavaa jo ennestään matkalaukussa (omistaja 5.9.2026,
 * tests/matkalaukun-linssit.test.mjs) — tämä moduuli yleistää saman
 * piirtimen kahdelle käyttäjälle sen sijaan että sama logiikka
 * kirjoitettaisiin kahdesti.
 *
 * EI OMAA TILAA. Kutsuja (js/ui.js) omistaa sen, mikä rivi on
 * esikatseltu, ja piirtää tämän uudelleen joka muutoksella — sama malli
 * kuin ennen rakennaLinssivalikko. Näin Linssit-näkymä voi jatkaa
 * olemassa olevien linssitietojen (js/linssit/omistus.js) käyttöä
 * sellaisenaan; tämä moduuli ei tiedä mitään linsseistä tai aarteista,
 * vain riveistä ja ryhmistä.
 */

import { html } from './ui-apurit.js';

/**
 * Piirtää kokoelmanäkymän annettuun koteloon.
 *
 * @param {HTMLElement} kotelo elementti, jonka SISÄLLE näkymä piirretään
 * @param {Array<{otsikko?: string, luku?: string, rivit: Array<{
 *   id: string, nimi: string, kuva?: string|null, kuvakeSvg?: string,
 *   kuvaPieni?: string|null, kuvakePieni?: string, selite?: string,
 * }>}>} ryhmat yksi tai useampi ryhmä; otsikko jää pois flättinä listana
 *   (Linssit), näkyy Aarteet-tyylisenä otsikkona kun se on annettu.
 * @param {object} tila
 * @param {string|null} tila.esikatseltu esikatseltavan rivin id, tai null
 * @param {(id: string) => void} tila.esikatsele napautus riviin, jota EI vielä esikatseltu
 * @param {(id: string) => void} tila.aktivoi napautus jo esikatseltuun riviin
 * @param {(rivi: object) => string} tila.nappiteksti esikatsellun/aktiivisen rivin nappiteksti
 * @param {string} [tila.tyhjaTeksti] näytetään, jos riviä ei ole yhtään
 */
export function piirraKokoelma(kotelo, ryhmat, tila) {
  kotelo.replaceChildren();
  const kaikkiRivit = ryhmat.flatMap((r) => r.rivit);
  if (!kaikkiRivit.length) {
    kotelo.appendChild(html('p', 'muted kokoelma-tyhja', tila.tyhjaTeksti ?? 'Ei vielä mitään näytettävää.'));
    return;
  }

  /*
   * KAKSI SARAKETTA: esikatselu vasemmalla, lista oikealla (omistajan
   * sanamuoto "paneelin VASEMMALLE puolelle"). CSS (.kokoelma-runko)
   * hoitaa asettelun; kun mitään ei ole esikatseltu, esikatselusarake on
   * `hidden` ja lista saa koko leveyden.
   */
  const runko = html('div', 'kokoelma-runko');
  const esikatseluKotelo = html('div', 'kokoelma-esikatselu');
  const lista = html('div', 'kokoelma-lista');

  const esikatseltuRivi = kaikkiRivit.find((r) => r.id === tila.esikatseltu) ?? null;
  esikatseluKotelo.hidden = !esikatseltuRivi;
  if (esikatseltuRivi) {
    if (esikatseltuRivi.kuva) {
      const img = document.createElement('img');
      img.className = 'kokoelma-esikatselu-kuva';
      img.alt = '';
      img.decoding = 'async';
      img.src = esikatseltuRivi.kuva;
      esikatseluKotelo.appendChild(img);
    } else if (esikatseltuRivi.kuvakeSvg) {
      const kehys = html('div', 'kokoelma-esikatselu-ikoni');
      kehys.innerHTML = esikatseltuRivi.kuvakeSvg;
      esikatseluKotelo.appendChild(kehys);
    }
    esikatseluKotelo.appendChild(html('h3', 'kokoelma-esikatselu-nimi', esikatseltuRivi.nimi));
    if (esikatseltuRivi.selite) {
      esikatseluKotelo.appendChild(html('p', 'kokoelma-esikatselu-selite', esikatseltuRivi.selite));
    }
    const nappi = html('button', 'kokoelma-toiminto', tila.nappiteksti(esikatseltuRivi));
    nappi.type = 'button';
    nappi.addEventListener('click', () => tila.aktivoi(esikatseltuRivi.id));
    esikatseluKotelo.appendChild(nappi);
  }

  for (const ryhma of ryhmat) {
    if (!ryhma.rivit.length) continue;
    if (ryhma.otsikko) {
      const otsikkoRivi = html('p', 'kokoelma-otsikko');
      otsikkoRivi.appendChild(html('span', 'kokoelma-otsikko-nimi', ryhma.otsikko));
      if (ryhma.luku) otsikkoRivi.appendChild(html('span', 'kokoelma-otsikko-luku', ryhma.luku));
      lista.appendChild(otsikkoRivi);
    }
    const ryhmaLista = html('div', 'kokoelma-ryhma');
    for (const rivi of ryhma.rivit) {
      const nappi = html('button', 'kokoelma-rivi');
      nappi.type = 'button';
      nappi.dataset.id = rivi.id;
      const esikatseltuna = tila.esikatseltu === rivi.id;
      nappi.classList.toggle('esikatselu', esikatseltuna);
      // Valinnainen "tämä on päällä juuri nyt" -merkki (Linssit): eri
      // asia kuin esikatselu, ja ne voivat osua eri riviin yhtä aikaa.
      nappi.classList.toggle('aktiivinen', Boolean(rivi.aktiivinen));
      nappi.setAttribute('aria-label', esikatseltuna ? `${rivi.nimi}: ${tila.nappiteksti(rivi)}` : rivi.nimi);
      if (rivi.kuvaPieni || rivi.kuvakePieni) {
        const kuvake = html('span', 'kokoelma-rivi-kuvake');
        if (rivi.kuvaPieni) {
          const img = document.createElement('img');
          img.alt = '';
          img.decoding = 'async';
          img.src = rivi.kuvaPieni;
          kuvake.appendChild(img);
        } else {
          kuvake.innerHTML = rivi.kuvakePieni;
        }
        nappi.appendChild(kuvake);
      }
      // Rivi muuttuu paikallaan toimintonapiksi, kun se on esikatseltu
      // (omistaja: "rivi muuttuu samassa kohdassa 'Aktivoi'-napiksi").
      nappi.appendChild(html('span', 'kokoelma-rivi-nimi', esikatseltuna ? tila.nappiteksti(rivi) : rivi.nimi));
      nappi.addEventListener('click', () => {
        if (tila.esikatseltu === rivi.id) tila.aktivoi(rivi.id);
        else tila.esikatsele(rivi.id);
      });
      ryhmaLista.appendChild(nappi);
    }
    lista.appendChild(ryhmaLista);
  }

  runko.appendChild(esikatseluKotelo);
  runko.appendChild(lista);
  kotelo.appendChild(runko);
}
