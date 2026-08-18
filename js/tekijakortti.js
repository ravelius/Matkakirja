/*
 * TEKIJÄSIVU — pro-sisällöntuottajan kortti kuvan lähderiviltä.
 *
 * Omistaja kutsuu peliin ammattilaisia (valokuvaajia, tutkijoita).
 * Vastineeksi laadukkaasta sisällöstä he saavat krediitin JA oman
 * tekijäsivun: kuva, esittely ja linkit omille kotisivuilleen. Tämä
 * moduuli on se sivu pelin puolella — worker (worker/ehdotukset/pro.js)
 * palvelee vain julkaistuja profiileja, joten mitään hyväksymätöntä ei
 * voi päätyä tänne edes vahingossa.
 *
 * MITEN SE AUKEAA: kuvan lähderivi on tavallista tekstiä, kunnes
 * paketissa on kenttä `tekijaId`. Silloin tekijän nimi lähderivillä
 * muuttuu painikkeeksi ja avaa kortin. Kenttä `tekija` kertoo, mikä
 * osa lähderivistä on nimi — ilman sitä rivin perään tulee erillinen
 * pieni "Tekijästä"-painike, jottei nimeä tarvitse arvata.
 *
 *   { tiedosto: '…jpg', lahde: 'Aino Valokuvaaja (CC BY 4.0)',
 *     tekija: 'Aino Valokuvaaja', tekijaId: 'k7m2p9xr4t' }
 *
 * YKSIKÄÄN PELIN KUVA EI VIELÄ KANNA tekijaId:tä. Tämä on valmius:
 * kun ensimmäinen pro-kuva julkaistaan, riittää että pakkiin lisätään
 * kaksi kenttää. Ilman kenttää lähderivi näyttää täsmälleen samalta
 * kuin ennen.
 *
 * VERKOTTA: kortti kertoo siististi, ettei tekijäsivu ole juuri nyt
 * saatavilla. Lehti ja kuva pysyvät auki — tekijäsivu on lisä, ei
 * ehto.
 */

import { EHDOTUS_OSOITE, ehdotusKaytossa } from './ehdotukset.js';
import { html } from './ui-apurit.js';

/*
 * Istunnon välimuisti. Sama tekijä esiintyy helposti kymmenessä
 * kuvassa saman lehden sisällä, eikä samaa profiilia haeta uudestaan
 * joka napautuksella. Muisti elää vain sivulatauksen ajan: julkaistu
 * profiili voi muuttua, eikä sitä saa jäädä pysyvään säilöön.
 */
const VALIMUISTI = new Map();

/** Testien ja savukkeiden koukku: tyhjentää istunnon välimuistin. */
export function nollaaTekijaValimuisti() {
  VALIMUISTI.clear();
}

/**
 * Hakee julkaistun tekijäprofiilin workerilta.
 *
 * @param {string} id tekijätunnus (paketin kenttä `tekijaId`)
 * @returns {Promise<object|null>} profiili tai null, jos sitä ei ole
 */
export async function haeTekija(id) {
  if (!id || !ehdotusKaytossa()) return null;
  if (VALIMUISTI.has(id)) return VALIMUISTI.get(id);
  const lupaus = (async () => {
    const vastaus = await fetch(`${EHDOTUS_OSOITE}/tekija/${encodeURIComponent(id)}`);
    if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
    const data = await vastaus.json();
    return data?.tekija ?? null;
  })();
  /*
   * Lupaus talteen jo ennen ratkeamista: kaksi nopeaa napautusta ei
   * tee kahta hakua. Epäonnistunut haku poistetaan, jotta seuraava
   * yritys pääsee oikeasti verkkoon (esimerkiksi kun lentokone laskeutuu).
   */
  VALIMUISTI.set(id, lupaus);
  try {
    const tekija = await lupaus;
    VALIMUISTI.set(id, tekija);
    return tekija;
  } catch (err) {
    VALIMUISTI.delete(id);
    throw err;
  }
}

/** Ulkoinen linkki pelin tyyliin: uusi välilehti ja ↗-merkintä (CSS). */
function ulkoinenLinkki(linkki) {
  const a = html('a', 'tekija-linkki', linkki.nimi || linkki.url);
  a.href = linkki.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

/**
 * Avaa tekijäsivun omassa dialogissaan.
 *
 * Sama kerrosratkaisu kuin lippuikkunassa (js/liput.js): oma <dialog>
 * selaimen ylimmässä kerroksessa, koska kortti avautuu modaalin lehden
 * päältä eikä tavallinen kerros nousisi sen yli.
 *
 * @param {string} id tekijätunnus
 * @param {string} nimi lähderiviltä tuttu nimi (näkyy heti, ennen hakua)
 * @returns {HTMLDialogElement} avattu dialogi
 */
export function avaaTekijaKortti(id, nimi = '') {
  document.querySelector('.tekija-ikkuna')?.remove();
  const dialogi = document.createElement('dialog');
  dialogi.className = 'tekija-ikkuna';
  dialogi.addEventListener('click', (e) => {
    if (e.target === dialogi) dialogi.close();
  });
  dialogi.addEventListener('close', () => dialogi.remove());

  const kortti = html('div', 'tekija-kortti');
  const yla = html('div', 'tekija-ylarivi');
  const otsikko = html('h2', 'tekija-otsikko', nimi || 'Tekijä');
  yla.appendChild(otsikko);
  const x = html('button', 'tekija-sulje', '×');
  x.type = 'button';
  x.title = 'Sulje';
  x.setAttribute('aria-label', 'Sulje');
  x.addEventListener('click', () => dialogi.close());
  yla.appendChild(x);
  kortti.appendChild(yla);

  const sisus = html('div', 'tekija-sisus');
  sisus.appendChild(html('p', 'tekija-tila', 'Haetaan tekijän tietoja…'));
  kortti.appendChild(sisus);
  dialogi.appendChild(kortti);
  document.body.appendChild(dialogi);
  dialogi.showModal();

  haeTekija(id).then((tekija) => {
    if (!dialogi.isConnected) return;
    if (!tekija) {
      sisus.replaceChildren(html('p', 'tekija-tila',
        'Tekijäsivua ei löytynyt.'));
      return;
    }
    otsikko.textContent = tekija.nimi || nimi || 'Tekijä';
    sisus.replaceChildren();
    if (tekija.kuva) {
      const kuva = document.createElement('img');
      kuva.className = 'tekija-kuva';
      kuva.decoding = 'async';
      kuva.draggable = false;
      kuva.alt = tekija.nimi ? `${tekija.nimi} — kuva` : 'Tekijän kuva';
      // Worker palauttaa polun; osoite kootaan samasta juuresta kuin haku.
      kuva.src = `${EHDOTUS_OSOITE}${tekija.kuva}`;
      // Rikkinäinen kuva ei saa jättää tyhjää laatikkoa kortin päälle.
      kuva.addEventListener('error', () => kuva.remove(), { once: true });
      sisus.appendChild(kuva);
    }
    if (tekija.esittely) {
      for (const kpl of String(tekija.esittely).split(/\n{2,}/)) {
        if (kpl.trim()) sisus.appendChild(html('p', 'tekija-esittely', kpl.trim()));
      }
    }
    if ((tekija.linkit ?? []).length) {
      const lista = html('ul', 'tekija-linkkilista');
      for (const linkki of tekija.linkit) {
        const rivi = html('li', 'tekija-linkkirivi');
        rivi.appendChild(ulkoinenLinkki(linkki));
        lista.appendChild(rivi);
      }
      sisus.appendChild(lista);
    }
    sisus.appendChild(html('p', 'tekija-huomio',
      'Pelin kutsuma sisällöntuottaja. Kuva on julkaistu pelissä '
      + 'tekijän luvalla; oikeudet ovat hänen.'));
  }).catch((err) => {
    console.warn('Tekijäsivun haku ei onnistunut:', err);
    if (!dialogi.isConnected) return;
    sisus.replaceChildren(html('p', 'tekija-tila',
      'Tekijäsivu ei ole saatavilla juuri nyt. Kokeile uudelleen, kun '
      + 'verkkoyhteys palaa.'));
  });

  return dialogi;
}

/**
 * Täyttää kuvan lähderivin niin, että tekijän nimi on painettava, jos
 * kuvalla on `tekijaId`.
 *
 * Ilman kenttää elementti saa pelkän tekstin täsmälleen kuten ennen —
 * tämä on siis turvallinen korvaaja `el.textContent = lahde`:lle
 * kaikkialla, missä lähderivi piirretään.
 *
 * @param {HTMLElement} el lähderivin elementti (tyhjennetään)
 * @param {string} lahde lähderivin teksti
 * @param {object} kohde kuva tai nosto, josta luetaan tekijaId ja tekija
 * @returns {HTMLElement} sama elementti
 */
export function taytaLahderivi(el, lahde, kohde = {}) {
  const teksti = String(lahde ?? '');
  const id = kohde?.tekijaId;
  if (!id || !ehdotusKaytossa()) {
    el.textContent = teksti;
    return el;
  }

  const avaa = (nappiTeksti) => {
    const nappi = html('button', 'tekija-nappi', nappiTeksti);
    nappi.type = 'button';
    nappi.title = 'Avaa tekijäsivu';
    nappi.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      avaaTekijaKortti(id, kohde.tekija ?? '');
    });
    return nappi;
  };

  const nimi = String(kohde.tekija ?? '').trim();
  const kohta = nimi ? teksti.indexOf(nimi) : -1;
  el.replaceChildren();
  if (kohta >= 0) {
    if (kohta > 0) el.appendChild(document.createTextNode(teksti.slice(0, kohta)));
    el.appendChild(avaa(nimi));
    const loppu = teksti.slice(kohta + nimi.length);
    if (loppu) el.appendChild(document.createTextNode(loppu));
  } else {
    // Nimeä ei tunnistettu rivistä: erillinen pieni painike perään.
    if (teksti) el.appendChild(document.createTextNode(`${teksti} `));
    el.appendChild(avaa('Tekijästä'));
  }
  return el;
}
