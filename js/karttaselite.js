/*
 * KARTTASELITEVALIKKO — mitä kartan merkit tarkoittavat, ja valo päälle.
 *
 * Omistajan tilaus 29.8.2026: *"Kartan oikeaan yläkulmaan
 * popup-valikko, josta rullautuu alas KARTTASELITTEET — mitä mikin
 * symboli tarkoittaa. Jokaisen seliterivin väripalloa painamalla
 * syttyy VALO kaikkiin sen aiheen kohteisiin kartalla … Valikossa OFF-
 * ja ALL-napit … päälle kytketyn aiheen väripallo syttyy myös valikon
 * seliterivillä — valikko näyttää aina mitkä valot ovat päällä. Popup
 * LIUKUU YLÖS PIILOON kun karttaa klikataan; valot jäävät päälle."*
 *
 * Lisätilaus samana päivänä: *"selitevalikossa voisi näkyä myös
 * kappalemäärä kyseisen maan kohdalla"* — jokainen rivi kertoo, montako
 * sen aiheen merkkiä kartalla juuri nyt on (karttavalotLaskurit).
 *
 * Valojen koneisto on js/karttavalot.js; tämä tiedosto on pelkkä
 * kytkin ja selite. Jako on sama kuin symbolikirjastolla ja sen
 * kutsujilla.
 *
 * ── VALIKKO ON YKSI PYSYVÄ LEVY, EI JOKA AVAUKSELLA UUSI ───────────
 *
 * Levy rakennetaan kerran karttaruutuun ja jää sinne. Avaus ja sulku
 * ovat luokanvaihto (.auki), koska omistaja pyysi LIU'UN: elementin
 * poistaminen DOM:sta lopettaisi siirtymän kesken. Suljettuna levy on
 * `visibility: hidden`, joten se ei ota napautuksia eikä
 * näppäimistöfokusta — se on siis piilossa myös apuvälineeltä, vaikka
 * solmu on olemassa.
 *
 * ── SELITE ON PYSYVÄ, LUVUT ELÄVÄT ─────────────────────────────────
 *
 * Rivit ovat aina kaikki kahdeksan, myös ne joita tällä kartalla ei
 * ole. Selitelista on KARTAN SELITE: se kertoo mitä symbolit
 * tarkoittavat, ja se lakkaisi olemasta selite, jos rivit vaihtuisivat
 * maan mukana. Sen sijaan rivin oikeassa laidassa oleva LUKU kertoo,
 * montako kappaletta tällä kartalla on, ja nollarivi himmenee.
 *
 * Luvut lasketaan vain kun ne ovat näkyvissä (valikko auki): laskuri
 * lukee kartan merkkikerrokset läpi, eikä sitä ole syytä tehdä
 * kehyksissä, joissa kukaan ei katso.
 *
 * ── KARTAN NAPAUTUS SULKEE, VALOT JÄÄVÄT ───────────────────────────
 *
 * Sulkeminen kuunnellaan `pointerdown`ista koko dokumentista ja
 * ohitetaan silloin, kun napautus osui valikkoon tai sen nappiin.
 * Kartan omaa napautusta EI nielaista: valikko liukuu ylös ja kartta
 * saa napautuksensa normaalisti. Se on tarkoituksellista — valikko on
 * kartan päällä kelluva paperi, ei modaali.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten top-level-nimet alkavat
 * KARTTASELITE_/karttaselite-etuliitteellä.
 */
import { html } from './ui-apurit.js';
import { piirraNostosymboli } from './fokusnosto-symbolit.js';
import {
  KARTTAVALO_AIHEET, karttavaloAseta, karttavaloPaalla, karttavaloVari,
  karttavalotKaikki, karttavalotLaskurit, karttavalotSovita,
} from './karttavalot.js';

/*
 * Seliterivin symboli piirretään kirjaston omalla piirtäjällä, joka
 * latoo merkin origon ympärille noin 21 px:n kokoisena (NOSTOSYM_R
 * = 10.4). Ruutu on siksi −12…12 molempiin suuntiin: merkki mahtuu
 * kokonaan ilman leikkausta myös silloin, kun kaiverruskuva täyttää
 * koko alansa.
 */
const KARTTASELITE_RUUTU = '-12 -12 24 24';

/**
 * Yhden seliterivin symbolimerkki: ryhmän kärkisymboli kirjaston omalla
 * piirtäjällä.
 *
 * Kaikilla kahdeksalla aiheella on symboli, koska aihe ON symbolien
 * sukukunta (js/fokusnosto-symbolit.js NOSTOSYM_PAAKATEGORIAT).
 * Symbolittomat merkit — vihreä kohtaamispiste ja musteympyrä — eivät
 * ole listalla eivätkä siis tarvitse omaa piirtoaan tänne.
 */
function karttaseliteSymboli(rivi) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', KARTTASELITE_RUUTU);
  svg.setAttribute('class', 'karttaselite-symboli');
  svg.setAttribute('aria-hidden', 'true');
  piirraNostosymboli(svg, rivi.symboli);
  return svg;
}

/** Yksi seliterivi: väripallo, symboli, selite ja kappalemäärä. */
function karttaseliteRivi(rivi, vaihda) {
  const nappi = html('button', 'karttaselite-rivi');
  nappi.type = 'button';
  nappi.dataset.aihe = rivi.aihe;
  /*
   * PALLO ON RIVIN VÄRI JA RIVIN TILA. Väri tulee symbolikirjaston
   * omasta muuttujasta (karttavaloVari), joten pallo on kirjaimellisesti
   * se muste, jolla merkki on kartalle piirretty. Syttyminen on CSS:n
   * asia (.karttaselite-rivi[aria-pressed='true']); tässä annetaan vain
   * väri, jotta sitä ei tarvitse toistaa tyylitiedostossa kahdeksassa
   * säännössä.
   */
  const pallo = html('span', 'karttaselite-pallo');
  pallo.style.setProperty('--valo', karttavaloVari(rivi.aihe));
  nappi.append(pallo, karttaseliteSymboli(rivi), html('span', 'karttaselite-nimi', rivi.nimi));
  nappi.appendChild(html('span', 'karttaselite-luku', ''));
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    vaihda(rivi.aihe);
  });
  return nappi;
}

/**
 * VALIKKO KARTTARUUTUUN — nappi oikeaan yläkulmaan, levy sen alle.
 *
 * @returns {?object} { paivita, sulje, avaa, levy, nappi } tai null,
 *   jos karttaruutua ei ole (aloitusnäkymä).
 */
export function kaynnistaKarttaselite(ui) {
  if (typeof document === 'undefined') return null;
  const ruutu = ui?.mapPane;
  if (!ruutu) return null;
  if (ui.karttaselite?.nappi?.isConnected) {
    ui.karttaselite.paivita();
    return ui.karttaselite;
  }
  for (const vanha of ruutu.querySelectorAll('.karttaselite')) vanha.remove();

  /*
   * NAPPI JA LEVY SAMASSA KOTELOSSA. Levy asemoidaan napin alle
   * (`top: calc(100% + …)`) eikä karttaruudun mitoilla: nappi on
   * sormenmittainen (40 px) ja sen korkeus tulee minimimitoista, joten
   * käsin laskettu etäisyys ruudun yläreunasta menisi rikki heti kun
   * napin kokoa säädetään. Kotelo on myös se, mitä maakyltti väistää.
   */
  const kotelo = html('div', 'karttaselite');

  const nappi = html('button', 'karttaselite-nappi');
  nappi.type = 'button';
  nappi.title = 'Karttaselitteet';
  nappi.setAttribute('aria-label', 'Karttaselitteet: mitä kartan merkit tarkoittavat');
  nappi.setAttribute('aria-expanded', 'false');
  /*
   * KUVAKE ON SELITELISTA ITSE: kolme riviä, joilla on pallo ja viiva.
   * Sama piirtotapa kuin maalehtinapilla (index.html): inline-svg,
   * currentColor ja `stroke-width: 1.6` — kartan napit ovat yhtä
   * perhettä.
   */
  nappi.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" '
    + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">'
    + '<circle cx="6" cy="6.5" r="2.1"/><path d="M11 6.5h8"/>'
    + '<circle cx="6" cy="12" r="2.1"/><path d="M11 12h8"/>'
    + '<circle cx="6" cy="17.5" r="2.1"/><path d="M11 17.5h8"/></svg>';

  const levy = html('div', 'karttaselite-levy');
  levy.setAttribute('role', 'group');
  levy.setAttribute('aria-label', 'Karttaselitteet');

  const ylarivi = html('div', 'karttaselite-ylarivi');
  ylarivi.appendChild(html('span', 'karttaselite-otsikko', 'Karttaselitteet'));
  const pois = html('button', 'karttaselite-kaikki', 'OFF');
  pois.type = 'button';
  pois.title = 'Sammuta kaikki valot';
  const kaikki = html('button', 'karttaselite-kaikki', 'ALL');
  kaikki.type = 'button';
  kaikki.title = 'Sytytä kaikki valot';
  ylarivi.append(pois, kaikki);
  levy.appendChild(ylarivi);

  const lista = html('div', 'karttaselite-lista');
  levy.appendChild(lista);
  /*
   * ALARIVI KERTOO, MITÄ VALO ON. Yksi hiljainen lause riittää: valo
   * on hakuväline eikä pelin tapahtuma, eikä sitä pidä selittää
   * kartan päällä (omistajan linjaus 13.8.2026 kartan ohjeteksteistä
   * koskee KARTTAA — tämä on valikon sisällä).
   */
  levy.appendChild(html('p', 'karttaselite-vihje',
    'Väripallo sytyttää valot aiheen kohteisiin. Valot jäävät päälle.'));

  const rivit = new Map();
  const vaihda = (aihe) => {
    karttavaloAseta(aihe);
    paivita();
  };
  for (const rivi of KARTTAVALO_AIHEET) {
    const solmu = karttaseliteRivi(rivi, vaihda);
    rivit.set(rivi.aihe, solmu);
    lista.appendChild(solmu);
  }

  /** Rivien tila ja luvut ajan tasalle — vain kun valikko on auki. */
  function paivita() {
    for (const [aihe, solmu] of rivit) {
      solmu.setAttribute('aria-pressed', String(karttavaloPaalla(aihe)));
    }
    if (!levy.classList.contains('auki')) return;
    const luvut = karttavalotLaskurit(ui);
    for (const [aihe, solmu] of rivit) {
      const luku = luvut.get(aihe) ?? 0;
      solmu.querySelector('.karttaselite-luku').textContent = luku ? String(luku) : '–';
      solmu.classList.toggle('karttaselite-tyhja', luku === 0);
    }
  }

  const avaa = () => {
    levy.classList.add('auki');
    nappi.setAttribute('aria-expanded', 'true');
    paivita();
  };
  const sulje = () => {
    if (!levy.classList.contains('auki')) return;
    levy.classList.remove('auki');
    nappi.setAttribute('aria-expanded', 'false');
  };

  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (levy.classList.contains('auki')) sulje(); else avaa();
  });
  pois.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    karttavalotKaikki(false);
    paivita();
  });
  kaikki.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    karttavalotKaikki(true);
    paivita();
  });
  /*
   * KARTAN NAPAUTUS SULKEE. Kuuntelu on dokumentissa eikä kartassa,
   * jotta myös lehden, ylärivin ja valikoiden napautukset sulkevat
   * levyn — auki jäänyt selite peittäisi kartan nurkan.
   *
   * KAAPPAUSVAIHEESSA, ja siksi oma poikkeus on pakko kirjoittaa
   * tähän: kaappaus kulkee dokumentista kohdetta kohti, joten levyn
   * omassa kuuntelijassa tehty `stopPropagation` tulisi liian myöhään
   * eikä valikon rivejä voisi painaa kertaakaan.
   */
  const ulos = (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.karttaselite-nappi, .karttaselite-levy')) return;
    sulje();
  };
  document.addEventListener('pointerdown', ulos, true);
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    if (!levy.classList.contains('auki')) return;
    tapahtuma.stopPropagation();
    sulje();
  };
  document.addEventListener('keydown', nappain, true);

  kotelo.append(nappi, levy);
  ruutu.appendChild(kotelo);
  karttavalotSovita();
  paivita();

  ui.karttaselite = {
    nappi,
    levy,
    kotelo,
    avaa,
    sulje,
    paivita,
    sammuta: () => {
      document.removeEventListener('pointerdown', ulos, true);
      document.removeEventListener('keydown', nappain, true);
      kotelo.remove();
      ui.karttaselite = null;
    },
  };
  return ui.karttaselite;
}

/**
 * Kartta muuttui: luvut ja rivien tila ajan tasalle.
 *
 * Kutsutaan samasta kohdasta kuin muidenkin merkkikerrosten päivitys
 * (js/ui.js). Suljettuna tämä on kaksi luokanvaihtoa riviä kohti eikä
 * laske mitään — laskuri herää vasta, kun valikko on auki.
 */
export function paivitaKarttaselite(ui) {
  ui?.karttaselite?.paivita?.();
}
