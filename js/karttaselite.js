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
import { el } from './mapart.js';
import { piirraNostosymMini } from './fokusnosto-symbolit.js';
import {
  KARTTAVALO_AIHEET, karttavaloAseta, karttavaloPaalla, karttavaloVari,
  karttavalotKaikki, karttavalotLaskurit, karttavalotSovita,
} from './karttavalot.js';

/*
 * SELITE NÄYTTÄÄ KARTAN OMAN MERKIN (2.9.2026).
 *
 * Rivillä oli 26.8.2026 asti kirjaston ISO KAIVERRUS
 * (piirraNostosymboli, ~21 px) — sama kuva, joka on kohdekortin
 * ylärivillä. Se oli oikein niin kauan kuin kartallakin oli kaiverrus,
 * mutta kartan merkki keveni 27.8.2026 viivamerkiksi ja 2.9.2026
 * yhdentoista kategorian osalta pelkäksi värilliseksi pisteeksi. Rivi
 * ja kartta eivät siis enää olleet sama kuva — pahimmillaan selite
 * lupasi pöllöä, kun kartalla on tassunjälki.
 *
 * SELITE ON KARTAN AVAIN, joten se latoo nyt saman minimerkin kuin
 * kartta (piirraNostosymMini): pisteytetyt rivit näyttävät pisteen
 * omassa värissään ja viisi säilynyttä merkkiä oman muotonsa. Kortin
 * ylärivi pitää kaiverruksensa — KORTTI EI OLE KARTTA.
 *
 * Minimerkki latoo origon ympärille noin 13 yksikön levyisen kuvan
 * (NOSTOSYM_MINI_R = 6,5), joten ruutu on −8…8: merkki mahtuu
 * kokonaan ja sen ympärille jää saman verran ilmaa kuin kartalla.
 */
const KARTTASELITE_RUUTU = '-8 -8 16 16';

/**
 * LUONNOLLA ON KARTALLA KAKSI MUOTOA (js/fokusnosto-symbolit.js
 * NOSTOSYM_MINI_LAJIT): kolmio kalliolle ja aalto vedelle. Rivin kuva
 * näyttää molemmat päällekkäin — kuten aikakauden atlaksen oma
 * merkkiselite — jottei kumpikaan jää selitteen ulkopuolelle.
 */
const KARTTASELITE_LUONTO = [
  { laji: 'vuori', y: -3.4 },
  { laji: 'meri', y: 3.6 },
];

/**
 * Yhden seliterivin symbolimerkki: ryhmän kärkisymboli kartan omalla
 * minimerkillä.
 *
 * Kaikilla yhdeksällä aiheella on symboli, koska aihe ON symbolien
 * sukukunta (js/fokusnosto-symbolit.js NOSTOSYM_PAAKATEGORIAT).
 * Symbolittomat merkit — vihreä kohtaamispiste ja musteympyrä — eivät
 * ole listalla eivätkä siis tarvitse omaa piirtoaan tänne.
 */
function karttaseliteSymboli(rivi) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', KARTTASELITE_RUUTU);
  svg.setAttribute('class', 'karttaselite-symboli');
  svg.setAttribute('aria-hidden', 'true');
  if (rivi.symboli === 'luonto') {
    for (const { laji, y } of KARTTASELITE_LUONTO) {
      const g = el('g', { transform: `translate(0 ${y}) scale(0.62)` }, svg);
      piirraNostosymMini(g, 'luonto', laji);
    }
    return svg;
  }
  piirraNostosymMini(el('g', {}, svg), rivi.symboli, null);
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
    /*
     * NAPPI VASTA PELITILASSA (omistajan testikierros 30.8.2026:
     * *"Karttaselite näkyviin vasta Ateenasta alkaen, ei
     * aloitusruuduilla"*). Sama ehto kuin yläpalkin pillerillä
     * (js/ui.js renderTurnPill): lähtöpisteen valinnassa ja
     * avauslennolla kartta ei ole pelattavassa tilassa, eikä selite
     * saa luvata valikkoa, jonka merkit eivät ole vielä kartalla.
     * Kartalento-luokka on mukana varalta: avauslennon aikana
     * paivita voi osua kehykseen, jossa lippu on jo ehditty laskea
     * (css/styles.css piilottaa saman lennon joka kehyksessä).
     */
    const piilossa = ui?.game?.phase === 'pickstart'
      || Boolean(ui?.aloituslentoKesken)
      || Boolean(document.body?.classList?.contains('kartalento'));
    kotelo.hidden = piilossa;
    if (piilossa) {
      sulje();
      return;
    }
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
