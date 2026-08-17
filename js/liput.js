/*
 * Lippusivut: maan lipun, sen symboliikan, historiallisten asujen ja
 * vaakunoiden ikkuna. Siirretty js/ui.js:stä 17.8.2026 (remontin M3,
 * mallin B pilotti — docs/moduulirakenne-suunnitelma.md). Ei lue eikä
 * kirjoita pelitilaa: data tulee lipputiedot-paketista ja ikkuna elää
 * omassa <dialog>-elementissään.
 */

import { LIPPUTIEDOT } from './packs/lipputiedot.js';
import { lippuUrl, lippuVara } from './packs/africa-valokuvat.js';
import { asetaKuva } from './media.js';
import { html } from './ui-apurit.js';

/**
 * LIPPUIKKUNA (omistajan tilaus 15.8.2026: "Tee lipusta klikattava
 * jolloin lippu aukeaa isompana omaan ikkunaan otsikkona maan nimi.
 * Lipun alla tietoja ja selitys lipun historiasta ja sen
 * merkityksistä. Alle pienempiä lippuja jos on historiallisia tai
 * eri versioita nykyisestä lipusta (puolustusvoimat yms)").
 *
 * Oma <dialog> selaimen ylimmässä kerroksessa (sama syy kuin pöllön
 * kuvapopupissa: lehti on modaali, jonka päälle tavallinen kerros ei
 * nousisi). Pikkulipun napautus nostaa sen isoon paikkaan ja näyttää
 * sen selitteen; ensimmäinen rivi on aina nykyinen lippu. Sisällöt:
 * js/packs/lipputiedot.js. Pilotti: Suomi ja Saksa.
 */
export function avaaLippuikkuna(tiedosto) {
  const tiedot = LIPPUTIEDOT[tiedosto];
  if (!tiedot) return;
  document.querySelector('.lippu-ikkuna')?.remove();
  const dialogi = document.createElement('dialog');
  dialogi.className = 'lippu-ikkuna';
  dialogi.addEventListener('click', (e) => {
    if (e.target === dialogi) dialogi.close();
  });
  dialogi.addEventListener('close', () => dialogi.remove());

  const kortti = html('div', 'lippu-kortti');
  const yla = html('div', 'lippu-ylarivi');
  yla.appendChild(html('h2', 'lippu-otsikko', tiedot.maa));
  const x = html('button', 'lippu-sulje', '×');
  x.type = 'button';
  x.title = 'Sulje';
  x.setAttribute('aria-label', 'Sulje');
  x.addEventListener('click', () => dialogi.close());
  yla.appendChild(x);
  kortti.appendChild(yla);

  /*
   * Iso lippu on AINA nykyinen lippu (omistajan linjaus 15.8.2026:
   * "muut liput eivät aukeaisi päänlipun paikalle koskaan").
   */
  const iso = document.createElement('img');
  iso.className = 'lippu-iso';
  iso.decoding = 'async';
  iso.draggable = false;
  asetaKuva(iso, lippuUrl(tiedosto, 640), lippuVara(tiedosto, 640));
  iso.alt = `${tiedot.maa} — nykyinen lippu`;
  kortti.appendChild(iso);
  kortti.appendChild(html('p', 'lippu-valinta', 'Nykyinen lippu'));

  /*
   * Symboliikka boldatuin otsikoin ENNEN historiakappaleita
   * (omistajan tilaus 15.8.2026: "Symboliikka saisi tulla
   * selkeämmin. Voisi olla boldattuna otsikot: sininen =,
   * valkoinen =, ja niin edelleen").
   */
  if ((tiedot.symboliikka ?? []).length) {
    const symbolit = html('div', 'lippu-symbolit');
    for (const s of tiedot.symboliikka) {
      const rivi = html('p', 'lippu-symboli');
      rivi.appendChild(html('strong', '', `${s.osa} = `));
      rivi.appendChild(document.createTextNode(s.selite));
      symbolit.appendChild(rivi);
    }
    kortti.appendChild(symbolit);
  }

  // Historia ja merkitykset — sama kaikilla asuilla.
  for (const kpl of tiedot.kappaleet ?? []) {
    kortti.appendChild(html('p', 'lippu-kappale', kpl));
  }

  /*
   * TARKENNUS (omistajan linjaus 15.8.2026): versiolipun tai
   * vaakunan napautus kasvattaa sen paikallaan ja näyttää selitteen
   * sen alla; muu kortti sumenee (CSS: .tarkennus + .tarkennettu +
   * .terava-haara). Uusi napautus tai napautus sumeaan palauttaa.
   */
  const tyhjennaTarkennus = () => {
    kortti.classList.remove('tarkennus');
    kortti.querySelectorAll('.tarkennettu, .terava-haara')
      .forEach((t) => t.classList.remove('tarkennettu', 'terava-haara'));
  };
  const tarkenna = (elementti) => {
    const auki = elementti.classList.contains('tarkennettu');
    tyhjennaTarkennus();
    if (auki) return;
    kortti.classList.add('tarkennus');
    elementti.classList.add('tarkennettu');
    elementti.parentElement.classList.add('terava-haara');
    requestAnimationFrame(() => elementti.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  };
  kortti.addEventListener('click', (e) => {
    if (!kortti.classList.contains('tarkennus')) return;
    if (e.target.closest?.('.lippu-versio, .lippu-tunnus, .lippu-sulje')) return;
    tyhjennaTarkennus();
  });

  if ((tiedot.versiot ?? []).length) {
    kortti.appendChild(html('h3', 'lippu-versiot-otsikko', 'Muut asut ja historialliset liput'));
    const rivi = html('div', 'lippu-versiot');
    for (const versio of tiedot.versiot) {
      const nappi = html('button', 'lippu-versio');
      nappi.type = 'button';
      nappi.title = versio.nimi;
      const pikku = document.createElement('img');
      pikku.className = 'lippu-versio-kuva';
      pikku.alt = versio.nimi;
      pikku.decoding = 'async';
      pikku.draggable = false;
      pikku.src = versio.polku;
      nappi.appendChild(pikku);
      nappi.appendChild(html('span', 'lippu-versio-nimi', versio.nimi));
      nappi.appendChild(html('span', 'lippu-versio-selite', versio.selite));
      nappi.addEventListener('click', () => tarkenna(nappi));
      rivi.appendChild(nappi);
    }
    kortti.appendChild(rivi);
  }

  /*
   * Vaakunat ja muut tunnukset (omistajan tilaus 15.8.2026: "Maan
   * vaakuna olisi kiva lisätä myös sekä mikäli maalla on joitain
   * muitakin mielenkiintoisia vastaavia"). Kuva + nimi + selite
   * riveinä; kuvat repossa, lisenssit tarkistettu Commonsista.
   */
  if ((tiedot.tunnukset ?? []).length) {
    kortti.appendChild(html('h3', 'lippu-versiot-otsikko', 'Vaakunat ja tunnukset'));
    const tunnukset = html('div', 'lippu-tunnukset');
    for (const t of tiedot.tunnukset) {
      // Nappi (omistajan tilaus 15.8.2026: "klikkaamalla vaakunoita
      // ne voisivat suurentua omalla paikallaan").
      const kohta = html('button', 'lippu-tunnus');
      kohta.type = 'button';
      kohta.title = t.nimi;
      const kuvaEl = document.createElement('img');
      kuvaEl.className = 'lippu-tunnus-kuva';
      kuvaEl.alt = t.nimi;
      kuvaEl.decoding = 'async';
      kuvaEl.draggable = false;
      kuvaEl.src = t.polku;
      kohta.appendChild(kuvaEl);
      const teksti = html('div', 'lippu-tunnus-teksti');
      teksti.appendChild(html('p', 'lippu-tunnus-nimi', t.nimi));
      teksti.appendChild(html('p', 'lippu-tunnus-selite', t.selite));
      kohta.appendChild(teksti);
      kohta.addEventListener('click', () => tarkenna(kohta));
      tunnukset.appendChild(kohta);
    }
    kortti.appendChild(tunnukset);
  }
  if (tiedot.lahde) kortti.appendChild(html('p', 'lahde', tiedot.lahde));

  dialogi.appendChild(kortti);
  document.body.appendChild(dialogi);
  try {
    dialogi.showModal();
  } catch {
    dialogi.setAttribute('open', '');
  }
}
