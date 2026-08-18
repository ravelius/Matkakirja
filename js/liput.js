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

/*
 * ISON LIPUN LEVEYS PIKSELEINÄ.
 *
 * Kortti on enintään 27 rem (432 px) leveä ja lippu sen pehmusteiden
 * sisällä 404 px; iPadin kaksinkertaisella pikselitiheydellä se on 809
 * ja iPhonen kolminkertaisella 1213 laitepikseliä. 1280 riittää siis
 * terävään kuvaan kaikilla omistajan laitteilla ilman ylimääräistä
 * latausta.
 */
const ISO_LIPPU_LEVEYS = 1280;

/*
 * Vieritysvara kortin reunaan, kun tarkennettu tuodaan näkyviin.
 * Sama suuruusluokka kuin kortin pehmuste (0,8 rem), jotta laatta ei
 * liimaudu kiinni reunaviivaan.
 */
const TARKENNUS_REUNUS = 10;

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

  /*
   * KEHYS JA VIERITYSKOTELO OVAT ERI ELEMENTIT (omistajan iPad-havainto
   * 18.8.2026: "läpinäkyvyys bugi vieläkin"). Kehys maalaa paperin,
   * reunan ja varjon; kortti vierittää ja LEIKKAA sisällön pyöristetyn
   * reunan sisään myös silloin, kun sisältö on filterin takia noussut
   * omalle piirtokerrokselleen. Perustelut: css/styles.css, .lippu-kehys.
   * Kortti pitää entisen luokkansa, joten kaikki .lippu-kortti-säännöt
   * ja tarkennuslogiikka osuvat samaan elementtiin kuin ennenkin.
   */
  const kehys = html('div', 'lippu-kehys');
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
  /*
   * SUURENNOS HAETAAN COMMONSISTA, PAIKALLISKOPIO ON VARA.
   *
   * lippuUrl palauttaa repon paikalliskopion, ja se on tallennettu
   * SAAPUMISKORTIN kokoiseksi: 149 lipusta 169:stä on 120 px leveitä,
   * loput 250 px (tools/fetch-flags.mjs). Leveysparametri ei vaikuta
   * siihen lainkaan — sama ansa kuin valokuvien suurennoksessa
   * (omistajan havainto 13.8.2026). Lippuikkuna venytti 120 px:n
   * kuvan 404 CSS-pikseliin, mikä on iPadilla 809 laitepikseliä eli
   * 6,7-kertainen suurennos: mitattu iPad-emuloinnilla 17.8.2026, ja
   * juuri siltä lippu näytti — sumealta ja porrastuneelta.
   *
   * Ikkunassa on kerrallaan yksi lippu, joten Commonsin pyyntöraja
   * (se, minkä takia liput ylipäätään ovat repossa) ei ole tässä
   * ongelma. Vaakunat ja versioliput ovat repossa jo valmiiksi
   * suurina (480 ja 960 px), joten ne pysyvät paikallisina.
   * Yhteydettä paikalliskopio kelpaa varaksi: pienenä, mutta näkyy.
   */
  asetaKuva(iso, lippuVara(tiedosto, ISO_LIPPU_LEVEYS), lippuUrl(tiedosto, ISO_LIPPU_LEVEYS));
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
  /*
   * TARKENNETTU VIERITETÄÄN NÄKYVIIN VASTA TÄYDESSÄ KOOSSAAN.
   *
   * Vanha rivi ajoi scrollIntoView'n heti seuraavassa ruudussa, jolloin
   * kasvu oli vasta alkanut: vaakuna oli animaation alussa 0,55-kokoinen
   * ja versiolippu vielä skaalaamaton, joten selain mittasi laatan
   * PIENENÄ, totesi sen mahtuvan näkyviin eikä vierittänyt mitään.
   * Kymmenesosasekuntia myöhemmin laatta oli täysikokoinen ja työntyi
   * kortin näkyvän alueen ohi — mitattu iPad-emuloinnilla (834 × 1112,
   * dsf 2) ennen korjausta: Etelä-Korean vaakuna ulottui 52,9 px,
   * Japanin 67,8 px ja Saksan 254,1 px kortin alareunan alapuolelle.
   * Kortin pyöristetty alalaita katkaisi kuvatekstin kesken rivin, ja
   * juuri se näytti siltä kuin laatikko työntyisi ulos ikkunasta.
   *
   * Nyt odotetaan, että laatan omat animaatiot ja siirtymät ovat ohi, ja
   * vieritetään sen jälkeen mitatun geometrian mukaan. Absoluuttisesti
   * sijoitettu selite roikkuu laatan laatikon ULKOPUOLELLA, joten se
   * mitataan erikseen. Jos tarkennettu on korkeampi kuin kortin näkyvä
   * alue, yläreuna voittaa: mieluummin leikkaus alalaidasta kuin kuva,
   * jonka yläosa on jo vieritetty pois.
   */
  const vieritaNakyviin = (elementti) => {
    if (!kortti.isConnected || !elementti.classList.contains('tarkennettu')) return;
    /*
     * Näkyvä alue mitataan KEHYKSESTÄ, ei vierityskotelosta: kehyksen
     * reunalaatikko on se ikkunan reuna, jonka pelaaja näkee (kotelo on
     * reunaviivan verran sisempänä). Näin vieritys osuu samaan pikseliin
     * kuin ennen kehyksen ja kotelon eriyttämistä.
     */
    const k = kehys.getBoundingClientRect();
    const laatikot = [elementti, ...elementti.querySelectorAll('.lippu-versio-selite')]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0);
    if (!laatikot.length) return;
    const ala = Math.max(...laatikot.map((r) => r.bottom));
    const yla = Math.min(...laatikot.map((r) => r.top));
    let siirto = 0;
    if (ala > k.bottom - TARKENNUS_REUNUS) siirto = ala - (k.bottom - TARKENNUS_REUNUS);
    if (yla - siirto < k.top + TARKENNUS_REUNUS) siirto = yla - (k.top + TARKENNUS_REUNUS);
    if (Math.abs(siirto) < 1) return;
    const rauhallisesti = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    kortti.scrollBy({ top: siirto, behavior: rauhallisesti ? 'auto' : 'smooth' });
  };
  /*
   * Animaatiot ja siirtymät syntyvät vasta tyylilaskennassa, joka ajetaan
   * requestAnimationFrame-kutsujen JÄLKEEN — siksi ne kysytään vasta
   * toisessa ruudussa. Varakello pitää huolen siitä, että vieritys tulee
   * silloinkin, kun animaatio perutaan kesken (esim. uusi napautus).
   */
  const vieritaKunKasvanut = (elementti) => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const animaatiot = elementti.getAnimations?.({ subtree: true }) ?? [];
      const odotus = Promise.allSettled(animaatiot.map((a) => a.finished));
      const varakello = new Promise((valmis) => { setTimeout(valmis, 600); });
      Promise.race([odotus, varakello]).then(() => vieritaNakyviin(elementti));
    }));
  };
  const tarkenna = (elementti) => {
    const auki = elementti.classList.contains('tarkennettu');
    tyhjennaTarkennus();
    if (auki) return;
    kortti.classList.add('tarkennus');
    elementti.classList.add('tarkennettu');
    elementti.parentElement.classList.add('terava-haara');
    vieritaKunKasvanut(elementti);
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

  kehys.appendChild(kortti);
  dialogi.appendChild(kehys);
  document.body.appendChild(dialogi);
  try {
    dialogi.showModal();
  } catch {
    dialogi.setAttribute('open', '');
  }
}
