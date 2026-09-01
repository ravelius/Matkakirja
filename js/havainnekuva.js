/*
 * HAVAINNEKUVAN SELITE — miksi tässä pelissä on piirrettyjä kuvia
 * (omistajan hyväksyntä kysymyskortilla 1.9.2026).
 *
 * Pelin kuvista osa on Matkakirjan itse kokoamia havainnekuvia. Ne
 * näyttävät valokuvalta, ja lähderivi sanoo "Matkakirjan havainnekuva"
 * — mutta pelkkä merkintä ei kerro pelaajalle, MIKSI kuva on tehty
 * itse eikä otettu. Siksi jokainen tällainen lähderivi saa kevyen
 * pisteviiva-alleviivauksen, ja napautus avaa selitteen.
 *
 * YKSI APUFUNKTIO, EI KOPIOITA. Lähderivi piirretään talossa yli
 * kymmenessä paikassa (fokusnostot, karusellit, postikortit,
 * kohtaamiskortit, ihmeet, miniatyyrit, suurennokset). Kaikki kulkevat
 * `taytaLahderivi`-apurin kautta (js/tekijakortti.js), ja tämä moduuli
 * kytkeytyy siihen yhdessä kohdassa: kutsupaikat eivät tiedä tästä
 * mitään eikä niihin jää kopioita. Uusi lähderivin piirtäjä saa
 * selitteen automaattisesti, kunhan käyttää samaa apuria.
 *
 * KAKSI VARIANTTIA (omistajan lisäys 1.9.2026). Kadonneen ihmeen
 * loistoaikarekonstruktio on eri asia kuin tavallinen havainnekuva:
 * siinä ei ole valokuvaa, jota olisi voitu käyttää, koska kohde
 * tuhoutui ennen kameroita. Sillä on siksi oma tekstinsä.
 *
 * VARIANTIN VALINTA on ensisijaisesti DATASSA eikä tekstissä: kuva-olio
 * kantaa `ihmekuva`-lipun, jonka `kohteenIhmekuva` (js/fokuskohteet.js)
 * asettaa yhdessä paikassa — se on ainoa tehdas, joka ihmekuvia tekee,
 * joten lippu kulkee kaikkien renderöijien läpi ilman että yksikään
 * niistä tietää asiasta. Lähderivin tekstiä katsotaan vain varalta:
 * fokusnostojen loistoaikakuvat ("kohde loistoaikansa asussa") eivät
 * kulje ihmetehtaan kautta, ja omistaja nimesi juuri sen sanaparin.
 * Tekstisniffaus yksin olisi hauras — lähderivit ovat sisältöä ja ne
 * muuttuvat; lippu yksin ei riittäisi, koska nostot eivät sitä saa.
 */

import { html } from './ui-apurit.js';
import { avaaMinipopup } from './minipopup.js';
import { avaaKuvapalaute } from './kuvavinkki.js';
import { ehdotusKaytossa } from './ehdotukset.js';

/**
 * Lähderivin tunnistus. Kaksi sanamuotoa, jotka pelin data käyttää:
 * "Matkakirjan havainnekuva" (425 esiintymää pakoissa) ja "Matkakirjan
 * kuvitus". Jälkimmäistä ei vielä käytetä, mutta se on omistajan
 * nimeämä toinen muoto, ja tunnistus on halvempi tehdä kerralla
 * molemmille kuin lisätä myöhemmin toinen haku.
 *
 * Kaksoispisteellinen jatke ("…: kohde loistoaikansa asussa") jää
 * osumasta pois tarkoituksella: alleviivataan se, mikä on kuvalaji,
 * ei koko riviä.
 */
export const HAVAINNEKUVA_RE = /Matkakirjan (?:havainnekuva|kuvitus)/;

/** Sanapari, joka merkitsee loistoaikarekonstruktion ilman ihmelippua. */
const LOISTOAIKA_RE = /loistoaikansa asussa/i;

/**
 * Kumpi selite tälle kuvalle kuuluu?
 *
 * @param {string} lahde lähderivin teksti
 * @param {object} kohde kuva- tai nosto-olio
 * @returns {'ihme'|'havainnekuva'} variantti
 */
export function havainnekuvaLaji(lahde, kohde = {}) {
  if (kohde?.ihmekuva) return 'ihme';
  if (LOISTOAIKA_RE.test(String(lahde ?? ''))) return 'ihme';
  return 'havainnekuva';
}

/* ------------------------------------------------------------------ *
 * Selitetekstit — omistajan hyväksymät sanatarkasti (1.9.2026).
 *
 * Näitä ei muokata ilman omistajan päätöstä: teksti on hyväksytty
 * kysymyskortilla otsikkoa, kolmea kappaletta ja napin tekstiä myöten.
 * ------------------------------------------------------------------ */

/** Kolmas kappale on kummassakin variantissa oma — eri aineistosanat. */
const SELITTEET = {
  havainnekuva: {
    otsikko: 'Miksi Matkakirjassa on havainnekuvia?',
    kappaleet: [
      'Vapaasti käytettäviä valokuvia on maailman kohteista vain '
        + 'rajallisesti, ja niiden laatu vaihtelee. Siksi Matkakirja luo '
        + 'osan kuvistaan itse: havainnekuva kootaan useista kohteen '
        + 'valokuvista ja kirjallisista lähteistä niin totuudenmukaiseksi '
        + 'kuin mahdollista — ja samalla yhtenäiseksi, kiinnostavaksi ja '
        + 'kuvakulmaltaan kertovammaksi kuin sattumanvarainen arkistokuva.',
      'Havainnekuva ei koskaan vastaa todellisuutta täydellisesti, mutta '
        + 'se on niin lähellä kuin osaamme päästä. Jokainen kuva käy läpi '
        + 'ihmisen tarkistuksen; koska kukaan ei tunne kaikkia maailman '
        + 'paikkoja, virheitä silti jää. Havainnekuvien rinnalla käytetään '
        + 'aitoja valokuvia aina kun hyviä on saatavilla.',
      'Jos kuva ei mielestäsi vastaa todellisuutta, kerro siitä — '
        + 'korjaamme sen. Jos sinulla on kohteesta omia valokuvia, otamme '
        + 'ne kiitollisina vastaan: kerro samalla, saako kuviasi käyttää '
        + 'pelissä sellaisenaan vai vain taustatietona, ja omistatko itse '
        + 'kuvien oikeudet.',
    ],
  },
  ihme: {
    otsikko: 'Mihin ihmeen kuva perustuu?',
    kappaleet: [
      'Kadonneesta ihmeestä ei ole valokuvaa — kohde on tuhoutunut tai '
        + 'muuttunut kauan ennen kameroita. Siksi Matkakirja rakentaa '
        + 'ihmeen loistoajan asun havainnekuvana: pohjana ovat '
        + 'arkeologiset löydöt, aikalaiskuvaukset ja tutkijoiden '
        + 'rekonstruktiot, joita täydennetään useilla kuva- ja '
        + 'tekstilähteillä.',
      'Tällainen kuva on aina tulkinta. Tutkijatkin ovat monista '
        + 'yksityiskohdista eri mieltä, ja siellä missä tieto loppuu, kuva '
        + 'täyttää aukon aikakauden tyylin mukaan. Jokainen kuva käy '
        + 'ihmisen tarkistuksen läpi, mutta varmuudella ihmeen ulkonäköä '
        + 'ei tiedä kukaan.',
      'Jos kuva ei mielestäsi vastaa tutkittua tietoa, kerro siitä — '
        + 'korjaamme sen. Jos sinulla on kohteesta omia valokuvia tai '
        + 'tietoa, otamme ne kiitollisina vastaan: kerro samalla, saako '
        + 'aineistoasi käyttää pelissä sellaisenaan vai vain '
        + 'taustatietona, ja omistatko itse oikeudet.',
    ],
  },
};

/** Napin teksti on sama kummassakin variantissa. */
export const PALAUTENAPIN_TEKSTI = 'Lähetä palautetta tästä kuvasta';

/**
 * Kuvan tunnus palautetta varten.
 *
 * Ensisijaisesti datasta: `osoite` on repon oma generoitu kuva ja juuri
 * se, mistä havainnekuvapalaute annetaan. Jos kenttää ei ole, tunnus
 * haetaan DOMista napin lähimmästä kuvakehyksestä — silloinkin
 * työhuone saa tietää, mistä kuvasta palaute tuli.
 *
 * @param {object} kohde kuva-olio
 * @param {HTMLElement|null} el lähderivin elementti
 * @returns {string} tunnus (polku tai tiedostonimi)
 */
export function havainnekuvanTunnus(kohde = {}, el = null) {
  const suora = kohde?.osoite ?? kohde?.tiedosto ?? kohde?.ampari ?? '';
  if (suora) return String(suora).slice(0, 300);
  const kuva = el?.closest?.('figure, .kuvakehys, .nahtavyys-kuvakehys, .fokusnosto-kuva')
    ?.querySelector?.('img');
  const src = kuva?.getAttribute?.('src') ?? '';
  // Absoluuttisesta osoitteesta riittää polku — isäntä on pelin oma.
  try {
    return src ? new URL(src, 'https://x/').pathname.replace(/^\//, '').slice(0, 300) : '';
  } catch {
    return String(src).slice(0, 300);
  }
}

/**
 * Avaa havainnekuvan selitteen.
 *
 * @param {object} p
 * @param {'ihme'|'havainnekuva'} [p.laji] variantti
 * @param {string} [p.kuvatunnus] kuvan tunnus palautetta varten
 * @param {string} [p.kuvalahde] lähderivi sellaisenaan
 * @returns {HTMLDialogElement|null} auennut ikkuna
 */
export function avaaHavainnekuvaSelite({
  laji = 'havainnekuva', kuvatunnus = '', kuvalahde = '',
} = {}) {
  const selite = SELITTEET[laji] ?? SELITTEET.havainnekuva;
  const sisalto = selite.kappaleet.map((kpl) => html('p', 'minipopup-teksti', kpl));

  /*
   * PALAUTENAPPI on osa selitettä eikä erillinen kanava: kolmas kappale
   * pyytää palautetta, ja napin pitää olla siinä, missä pyyntö on.
   * Nappi vaihtaa popupin sisällön lomakkeeksi — kanavan ollessa kiinni
   * (EHDOTUS_OSOITE tyhjä) nappia ei ole, koska lomaketta ei ole.
   */
  if (ehdotusKaytossa()) {
    const nappi = html('button', 'primary havainnekuva-palautenappi', PALAUTENAPIN_TEKSTI);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      avaaKuvapalaute({ kuvatunnus, kuvalahde });
    });
    sisalto.push(nappi);
  }

  return avaaMinipopup({
    otsikko: selite.otsikko,
    sisalto,
    luokka: `havainnekuva-selite-popup havainnekuva-${laji}`,
  });
}

/* ------------------------------------------------------------------ *
 * Merkintä lähderiviin
 * ------------------------------------------------------------------ */

/**
 * Kääri lähderivin havainnekuvamaininta painettavaksi selitteeksi.
 *
 * Kutsutaan YHDESTÄ paikasta: `taytaLahderivi` (js/tekijakortti.js).
 * Elementti on jo täytetty tekstillä (ja mahdollisella tekijänapilla),
 * joten tässä käydään läpi vain tekstisolmut — tekijänappia ei
 * kosketa, eikä sama rivi voi saada kahta selitettä, koska osuma
 * korvataan napilla eikä tekstiä jää jäljelle.
 *
 * @param {HTMLElement} el lähderivin elementti
 * @param {string} lahde lähderivin teksti (variantin päättelyyn)
 * @param {object} kohde kuva- tai nosto-olio
 * @returns {HTMLElement} sama elementti
 */
export function merkitseHavainnekuva(el, lahde, kohde = {}) {
  if (!el || typeof document === 'undefined') return el;
  // Jo merkitty rivi (uudelleenpiirto ilman tyhjennystä) ohitetaan.
  if (el.querySelector?.('.havainnekuva-selite')) return el;

  const solmu = [...(el.childNodes ?? [])]
    .find((n) => n.nodeType === 3 && HAVAINNEKUVA_RE.test(n.nodeValue ?? ''));
  if (!solmu) return el;

  const teksti = solmu.nodeValue;
  const osuma = teksti.match(HAVAINNEKUVA_RE);
  const alku = osuma.index;
  const loppu = alku + osuma[0].length;

  const laji = havainnekuvaLaji(lahde, kohde);
  const nappi = html('button', 'havainnekuva-selite', osuma[0]);
  nappi.type = 'button';
  nappi.title = laji === 'ihme'
    ? 'Mihin ihmeen kuva perustuu?'
    : 'Miksi Matkakirjassa on havainnekuvia?';
  nappi.setAttribute('aria-label', `${osuma[0]} — avaa selite`);
  nappi.addEventListener('click', (e) => {
    /*
     * Lähderivi on usein napautettavan kuvan sisällä (suurennos aukeaa
     * kuvaa napauttamalla). Selite ei saa avata suurennosta alleen,
     * joten tapahtuma pysäytetään tähän — sama tapa kuin
     * tekijänapilla (js/tekijakortti.js).
     */
    e.preventDefault();
    e.stopPropagation();
    avaaHavainnekuvaSelite({
      laji,
      kuvatunnus: havainnekuvanTunnus(kohde, el),
      kuvalahde: String(lahde ?? ''),
    });
  });

  const emo = solmu.parentNode;
  emo.insertBefore(document.createTextNode(teksti.slice(0, alku)), solmu);
  emo.insertBefore(nappi, solmu);
  emo.insertBefore(document.createTextNode(teksti.slice(loppu)), solmu);
  emo.removeChild(solmu);
  return el;
}
