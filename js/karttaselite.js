/*
 * KARTTASELITEVALIKKO — mitä kartan merkit tarkoittavat, ja valo päälle.
 *
 * Omistajan tilaus 29.8.2026: *"Kartan oikeaan yläkulmaan
 * popup-valikko, josta rullautuu alas KARTTASELITTEET — mitä mikin
 * symboli tarkoittaa. Jokaisen seliterivin väripalloa painamalla
 * syttyy VALO kaikkiin sen aiheen kohteisiin kartalla."*
 *
 * UUDISTUS 22.9.2026 (omistajan päätös, Fablen välittämä): valikossa
 * on nyt KAKSI VÄLILEHTEÄ, "Nostot" ja "Maakunnat" — tämä tiedosto
 * rakentaa Nostot-välilehden (vanha selitelista, ks. alla) ja pelkän
 * KYTKENTÄPISTEEN Maakunnat-välilehdelle; sen sisällön rakentaa
 * js/karttatyokalu-maakunnat.js (ks. `asetaMaakunnat`). Samassa
 * erässä OFF/ALL-napit poistuivat ja monivalinta vaihtui YHTEEN
 * KERRALLAAN -valintaan, jota näyttää uusi liukukahva, PEUKALOLEVY
 * (js/karttaselite-levy.js). Valojen koneisto (js/karttavalot.js) ei
 * muuttunut: se tietää yhä vain aiheista, `'kaikki'`- ja `'ei'`-
 * erikoisarvot ja body-luokat ovat ennallaan.
 *
 * Lisätilaus 29.8.2026: *"selitevalikossa voisi näkyä myös
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
 * PANEELI PEITTÄÄ AVAUSNAPIN (22.9.2026): auki levy alkaa kotelon
 * yläreunasta eli täsmälleen napin yläreunasta (css/styles.css
 * `.karttaselite-levy.auki { top: 0; }`), joten nappi jää sen alle.
 * Levyn omassa yläkulmassa on siksi oma ✕-nappi sulkemiseen — kartan
 * napautus ja Escape toimivat kuten ennenkin.
 *
 * ── SELITE ON PYSYVÄ, LUVUT ELÄVÄT ─────────────────────────────────
 *
 * Rivit ovat aina kaikki, myös ne joita tällä kartalla ei ole. Nostot-
 * välilehti on KARTAN SELITE: se kertoo mitä symbolit tarkoittavat, ja
 * se lakkaisi olemasta selite, jos rivit vaihtuisivat maan mukana.
 * Sen sijaan rivin oikeassa laidassa oleva LUKU kertoo, montako
 * kappaletta tällä kartalla on; tyhjä rivi näyttää "0" (ei ajatusviivaa
 * — omistajan päätös 22.9.2026, jotta luku on aina luku).
 *
 * Luvut lasketaan vain kun ne ovat näkyvissä (Nostot-välilehti auki):
 * laskuri lukee kartan merkkikerrokset läpi, eikä sitä ole syytä tehdä
 * kehyksissä, joissa kukaan ei katso.
 *
 * ── VALINTA ON YKSI KERRALLAAN ──────────────────────────────────────
 *
 * Monivalinta (jokainen rivi oma kytkimensä, OFF/ALL-napit) poistui
 * 22.9.2026. Rivit ovat nyt KARTTASELITE_JARJESTYS-taulun mukaisessa
 * järjestyksessä, "Kaikki" ja "Ei mitään" mukaan lukien niin kuin ne
 * olisivat tavallisia rivejä, ja täsmälleen yksi niistä on aina
 * valittuna (js/karttavalot.js karttavaloValinta). Rivin napautus
 * valitsee sen; PEUKALOLEVY (js/karttaselite-levy.js) näyttää saman
 * asian liukukahvana ja tarjoaa raahauksen ja nuolinäppäimet.
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
// Ilmepaketti (omistaja 5.9.2026): selitteen levy saa käsin piirretyn kehyksen.
import { karheaKehys } from './ilme.js';
import { el } from './mapart.js';
import { piirraNostosymMini, nostosymKuvamerkki } from './fokusnosto-symbolit.js';
import {
  KARTTAVALO_AIHEET, KARTTAVALO_TYYPIT, karttavaloVari,
  karttavalotLaskurit, karttavalotSovita, karttavaloValitse, karttavaloValinta,
} from './karttavalot.js';
import { luoPeukalolevy } from './karttaselite-levy.js';

/*
 * RIVIJÄRJESTYS — YKSI PAIKKA KOKO VALIKOLLE (omistajan päätös
 * 22.9.2026). KARTTAVALO_AIHEET pysyy ENNALLAAN (js/karttavalot.js: se
 * on myös kartan oma ryhmittelytaulu, jota muu koodi lukee), mutta
 * VALIKON rivijärjestys on eri — pelaaja etsii ensin kaupunkeja ja
 * menneisyyttä, vasta sitten luontoa ja ihmisen tekemisiä — ja siihen
 * lisätään "Kaikki" ylimmäksi ja "Ei mitään" alimmaksi RIVEINÄ, ei
 * enää erillisinä OFF/ALL-nappeina.
 */
export const KARTTASELITE_JARJESTYS = [
  'kaikki',
  'kaupungit',
  'historia',
  'ihmeet',
  'hetket',
  'skandaalit',
  'luonto',
  'elaimet',
  'kulttuuri',
  'kauppa',
  'ei',
];

/** Sama järjestys ilman kahta erikoisriviä — karttavaloValinnan normalisointiin. */
const KARTTASELITE_AIHEJARJESTYS = KARTTASELITE_JARJESTYS
  .filter((id) => id !== 'kaikki' && id !== 'ei');

/** Rivin suomenkielinen nimi: aiheet KARTTAVALO_AIHEET-taulusta, kaksi lisää tässä. */
const KARTTASELITE_NIMET = {
  ...Object.fromEntries(KARTTAVALO_AIHEET.map((r) => [r.aihe, r.nimi])),
  kaikki: 'Kaikki',
  ei: 'Ei mitään',
};

const KARTTASELITE_RUUTU = '-8 -8 16 16';

/**
 * TYYPPIMERKIT (omistajan päätös 22.9.2026): samat Codexin kuvamerkit
 * kuin kartalla (js/fokusnosto-symbolit.js NOSTOSYM_KUVAMERKIT), paitsi
 * neljällä rivillä, joille ei ole kuvaa — ne saavat kartan oman
 * minimerkin (piirraNostosymMini). Kaupungit-rivi EI ole tässä
 * taulussa: se pitää pelkän pisteen (karttaselite-pallo), koska
 * kartallakin kaupunki on vain piste eikä oma merkkinsä.
 */
const KARTTASELITE_MERKIT = {
  historia: { kuvat: ['historia'] },
  luonto: { kuvat: ['vuori', 'meri'] },
  kulttuuri: { kuvat: ['kulttuuri', 'ruoka'] },
  kauppa: { kuvat: ['kauppa', 'tekniikka', 'merenkulku'] },
  elaimet: { mini: 'elain' },
  ihmeet: { mini: 'ihme' },
  hetket: { mini: 'hetki' },
  skandaalit: { mini: 'huuto' },
};

/**
 * Rivin väriympyrä. Aihe-rivit käyttävät kartan omaa mustetta
 * (karttavaloVari, sama kuin ennen); "Kaikki" ja "Ei mitään" eivät ole
 * aiheita eikä niillä ole omaa mustetta kartalla, joten ne saavat
 * neutraalin — täytetyn musteen "Kaikki"-rivillä, himmeän ääriviivan
 * "Ei mitään" -rivillä. Täyttö tulee samasta CSS-säännöstä kuin muilla
 * riveillä (`[aria-pressed='true']`), joten tänne riittää pelkkä väri.
 */
function karttaseliteVari(id) {
  if (id === 'kaikki') return 'var(--map-ink, #3a2a17)';
  if (id === 'ei') return 'rgba(70, 51, 31, 0.35)';
  return karttavaloVari(id);
}

/** Yhden rivin tyyppimerkki: kuvamerkki(t), kartan oma minimerkki, tai ei mitään. */
function karttaseliteMerkki(id) {
  const tieto = KARTTASELITE_MERKIT[id];
  if (!tieto) return html('span', 'karttaselite-merkki');
  const kotelo = html('span', 'karttaselite-merkki');
  if (tieto.kuvat) {
    for (const laji of tieto.kuvat) {
      const kuva = document.createElement('img');
      kuva.src = nostosymKuvamerkki(null, laji);
      kuva.alt = '';
      kuva.loading = 'lazy';
      kuva.className = 'karttaselite-kuvamerkki';
      kotelo.appendChild(kuva);
    }
    return kotelo;
  }
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', KARTTASELITE_RUUTU);
  svg.setAttribute('class', 'karttaselite-symboli');
  svg.setAttribute('aria-hidden', 'true');
  piirraNostosymMini(el('g', {}, svg), tieto.mini, null);
  kotelo.appendChild(svg);
  return kotelo;
}

/** Yksi seliterivi: väripallo, tyyppimerkki, nimi ja kappalemäärä. */
function karttaseliteRivi(id, vaihda) {
  const nappi = html('button', 'karttaselite-rivi');
  nappi.type = 'button';
  nappi.dataset.valinta = id;
  // data-aihe säilyy aihe-riveillä yhteensopivuuden vuoksi (savukkeet,
  // js/pallolauta savuke-pallolauta.mjs lukevat sitä rivin tunnuksena).
  if (KARTTAVALO_TYYPIT.has(id)) nappi.dataset.aihe = id;
  const pallo = html('span', 'karttaselite-pallo');
  pallo.style.setProperty('--valo', karttaseliteVari(id));
  nappi.append(pallo, karttaseliteMerkki(id), html('span', 'karttaselite-nimi', KARTTASELITE_NIMET[id]));
  nappi.appendChild(html('span', 'karttaselite-luku', ''));
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    vaihda(id);
  });
  return nappi;
}

/**
 * VALIKKO KARTTARUUTUUN — nappi oikeaan yläkulmaan, levy sen alle.
 *
 * @returns {?object} { paivita, sulje, avaa, levy, nappi, valilehdet,
 *   asetaMaakunnat } tai null, jos karttaruutua ei ole (aloitusnäkymä).
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
   * (`top: calc(100% + …)` kiinni, `top: 0` auki) eikä karttaruudun
   * mitoilla: nappi on sormenmittainen (40 px) ja sen korkeus tulee
   * minimimitoista, joten käsin laskettu etäisyys ruudun yläreunasta
   * menisi rikki heti kun napin kokoa säädetään. Kotelo on myös se,
   * mitä maakyltti väistää.
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

  /*
   * VÄLILEHDET "NOSTOT | MAAKUNNAT" (omistajan päätös 22.9.2026)
   * korvasivat vanhan otsikkorivin. Nostot on tämän tiedoston oma
   * selitelista; Maakunnat rakennetaan js/karttatyokalu-maakunnat.js:stä
   * (ks. asetaMaakunnat alempana) — tämä tiedosto tuntee siitä vain
   * kytkentäpisteen.
   */
  const ylarivi = html('div', 'karttaselite-ylarivi');
  const valilehdet = html('div', 'karttaselite-valilehdet');
  valilehdet.setAttribute('role', 'tablist');
  valilehdet.setAttribute('aria-label', 'Karttaselitteiden välilehdet');

  const valilehtiNostot = html('button', 'karttaselite-valilehti', 'Nostot');
  valilehtiNostot.type = 'button';
  valilehtiNostot.id = 'karttaselite-valilehti-nostot';
  valilehtiNostot.setAttribute('role', 'tab');
  valilehtiNostot.setAttribute('aria-controls', 'karttaselite-paneeli-nostot');

  const valilehtiMaakunnat = html('button', 'karttaselite-valilehti', 'Maakunnat');
  valilehtiMaakunnat.type = 'button';
  valilehtiMaakunnat.id = 'karttaselite-valilehti-maakunnat';
  valilehtiMaakunnat.setAttribute('role', 'tab');
  valilehtiMaakunnat.setAttribute('aria-controls', 'karttaselite-paneeli-maakunnat');

  valilehdet.append(valilehtiNostot, valilehtiMaakunnat);

  const sulje2 = html('button', 'karttaselite-sulje', '✕');
  sulje2.type = 'button';
  sulje2.setAttribute('aria-label', 'Sulje karttaselitteet');

  ylarivi.append(valilehdet, sulje2);
  levy.appendChild(ylarivi);

  const paneeliNostot = html('div', 'karttaselite-paneeli karttaselite-paneeli-nostot');
  paneeliNostot.id = 'karttaselite-paneeli-nostot';
  paneeliNostot.setAttribute('role', 'tabpanel');
  paneeliNostot.setAttribute('aria-labelledby', 'karttaselite-valilehti-nostot');

  const lista = html('div', 'karttaselite-lista');
  paneeliNostot.appendChild(lista);
  /*
   * VIHJE KERTOO, MITÄ VALO ON. Yksi hiljainen lause riittää: valo
   * on hakuväline eikä pelin tapahtuma, eikä sitä pidä selittää
   * kartan päällä (omistajan linjaus 13.8.2026 kartan ohjeteksteistä
   * koskee KARTTAA — tämä on valikon sisällä).
   */
  paneeliNostot.appendChild(html('p', 'karttaselite-vihje',
    'Yksi rivi kerrallaan sytyttää valot sen aiheen kohteisiin. Valo jää päälle.'));

  /*
   * TYHJÄ TABPANEL MAAKUNNILLE — vain kytkentäpiste. Sisällön rakentaa
   * js/karttatyokalu-maakunnat.js kutsumalla `asetaMaakunnat`; tämä
   * tiedosto ei tiedä siitä mitään muuta.
   */
  const paneeliMaakunnat = html('div', 'karttaselite-paneeli karttaselite-paneeli-maakunnat');
  paneeliMaakunnat.id = 'karttaselite-paneeli-maakunnat';
  paneeliMaakunnat.setAttribute('role', 'tabpanel');
  paneeliMaakunnat.setAttribute('aria-labelledby', 'karttaselite-valilehti-maakunnat');
  paneeliMaakunnat.hidden = true;

  levy.append(paneeliNostot, paneeliMaakunnat);

  const rivit = new Map();
  const vaihda = (id) => {
    karttavaloValitse(id);
    paivita();
  };
  for (const id of KARTTASELITE_JARJESTYS) {
    const solmu = karttaseliteRivi(id, vaihda);
    rivit.set(id, solmu);
    lista.appendChild(solmu);
  }

  // Peukalolevy: sama moduuli kuin Maakunnat-välilehti saa (asetaMaakunnat).
  const peukalo = luoPeukalolevy({
    lista,
    rivit,
    valittu: karttavaloValinta(KARTTASELITE_AIHEJARJESTYS),
    valitse: vaihda,
  });

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
    const nyt = karttavaloValinta(KARTTASELITE_AIHEJARJESTYS);
    for (const [id, solmu] of rivit) {
      solmu.setAttribute('aria-pressed', String(id === nyt));
    }
    if (levy.classList.contains('auki') && !paneeliNostot.hidden) peukalo.paivita(nyt);
    if (!levy.classList.contains('auki') || paneeliNostot.hidden) return;
    const luvut = karttavalotLaskurit(ui);
    let summa = 0;
    for (const [id, solmu] of rivit) {
      if (!KARTTAVALO_TYYPIT.has(id)) continue;
      const luku = luvut.get(id) ?? 0;
      summa += luku;
      solmu.querySelector('.karttaselite-luku').textContent = String(luku);
      solmu.classList.toggle('karttaselite-tyhja', luku === 0);
    }
    rivit.get('kaikki').querySelector('.karttaselite-luku').textContent = String(summa);
  }

  const avaa = () => {
    levy.classList.add('auki');
    nappi.setAttribute('aria-expanded', 'true');
    paivita();
    // Käsin piirretty kehys ensimmäisellä avauksella (js/ilme.js, Rough.js);
    // ilman kirjastoa levy pitää CSS-reunansa.
    if (!levy.ilmeKehys) {
      levy.ilmeKehys = karheaKehys(levy, { sade: 8, reunus: 1.5, paksuus: 1.2, vari: 'rgba(70, 51, 31, 0.78)' });
    }
  };
  const sulje = () => {
    if (!levy.classList.contains('auki')) return;
    levy.classList.remove('auki');
    nappi.setAttribute('aria-expanded', 'false');
  };

  /* ── VÄLILEHTIEN TILA ── */
  const VALILEHTI_TALLE = 'matkakirja-karttaselite-valilehti';
  let valilehtiNyt = 'nostot';
  try {
    if (localStorage.getItem(VALILEHTI_TALLE) === 'maakunnat') valilehtiNyt = 'maakunnat';
  } catch { /* yksityinen selaus — oletus on Nostot */ }

  let maakunnatRakentaja = null;
  let maakunnatRakennettu = false;

  const vaihdaValilehti = (nimi) => {
    if (nimi !== 'nostot' && nimi !== 'maakunnat') return;
    valilehtiNyt = nimi;
    const nostotAuki = nimi === 'nostot';
    valilehtiNostot.setAttribute('aria-selected', String(nostotAuki));
    valilehtiMaakunnat.setAttribute('aria-selected', String(!nostotAuki));
    paneeliNostot.hidden = !nostotAuki;
    paneeliMaakunnat.hidden = nostotAuki;
    try { localStorage.setItem(VALILEHTI_TALLE, nimi); } catch { /* yksityinen selaus */ }
    if (!nostotAuki && !maakunnatRakennettu && maakunnatRakentaja) {
      maakunnatRakennettu = true;
      maakunnatRakentaja(paneeliMaakunnat, { levy: luoPeukalolevy });
    }
    if (nostotAuki) paivita();
  };
  valilehtiNostot.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    vaihdaValilehti('nostot');
  });
  valilehtiMaakunnat.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    vaihdaValilehti('maakunnat');
  });
  vaihdaValilehti(valilehtiNyt);

  /**
   * KYTKENTÄPISTE MAAKUNNAT-VÄLILEHDELLE. js/karttatyokalu-maakunnat.js
   * kutsuu tätä kerran rekisteröidäkseen rakentajansa; `rakenna`
   * kutsutaan silloin kun välilehti avataan ENSIMMÄISTÄ kertaa (myös
   * heti, jos välilehti oli laitteen muistista jo auki, ks.
   * vaihdaValilehti yllä). `{ levy: luoPeukalolevy }` antaa Maakunnat-
   * moduulille saman liukukahvan kuin Nostot-listalla, jottei
   * kahta kilpailevaa toteutusta synny.
   */
  function asetaMaakunnat(rakenna) {
    maakunnatRakentaja = rakenna;
    if (valilehtiNyt === 'maakunnat' && !maakunnatRakennettu) {
      maakunnatRakennettu = true;
      rakenna(paneeliMaakunnat, { levy: luoPeukalolevy });
    }
  }

  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (levy.classList.contains('auki')) sulje(); else avaa();
  });
  sulje2.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    sulje();
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
    asetaMaakunnat,
    valilehdet: {
      get nykyinen() { return valilehtiNyt; },
      vaihda: vaihdaValilehti,
    },
    sammuta: () => {
      document.removeEventListener('pointerdown', ulos, true);
      document.removeEventListener('keydown', nappain, true);
      peukalo.pura();
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
 * laske mitään — laskuri herää vasta, kun Nostot-välilehti on auki.
 */
export function paivitaKarttaselite(ui) {
  ui?.karttaselite?.paivita?.();
}
