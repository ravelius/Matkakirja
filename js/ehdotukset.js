/*
 * LUKIJOIDEN EHDOTUKSET — pelaajan kanava lehtiin (Raamattu, osio
 * "Lukijoiden ehdotukset").
 *
 * Pelaaja voi lähettää palautelomakkeen laajennuksella kuvan tai
 * juttuidean siihen lehteen, jota hän on juuri lukemassa. Saman
 * lomakkeen perässä on PRO-OSIO: omistajan henkilökohtaisesti
 * hyväksymä ammattilainen (valokuvaaja, tutkija) kirjautuu
 * sähköpostillaan ja pysyvällä koodillaan ja saa oman tekijäsivun
 * (js/tekijakortti.js) vastineeksi laadukkaasta sisällöstä. Lähetys
 * menee Cloudflare Workerin kautta yksityiseen ämpäriin
 * (worker/ehdotukset/), josta omistaja lukee sen työhuoneen
 * Lukijoilta-lehdellä. Mikään ei päädy peliin ennen omistajan
 * hyväksyntää.
 *
 * OMA MODUULI, EI ui.js: ui.js on talon suurin tiedosto, eikä uusi
 * kanava kuulu sinne. ui.js kutsuu tästä kolmea asiaa: lomakkeen
 * osio, työhuoneen haku ja pöllön kupla.
 *
 * KUN EHDOTUS_OSOITE ON TYHJÄ, MITÄÄN EI NÄY. Sama malli kuin
 * PALAUTE_LOMAKE-vakiolla (js/ui.js): puolivalmis kanava on kiinni,
 * ei auki, eikä pelaaja näe rikkinäistä lomaketta.
 */

import { html } from './ui-apurit.js';

/*
 * Workerin osoite. Tyhjänä lomakkeen ehdotusosio ja työhuoneen
 * Lukijoilta-lehti ovat piilossa.
 *
 * Käyttöönotto: aja .github/workflows/ehdotukset-worker.yml
 * (workflow_dispatch), poimi ajon yhteenvedosta workers.dev-osoite ja
 * liitä se tähän, esimerkiksi
 * 'https://matkakirja-ehdotukset.tunnus.workers.dev'.
 * Ohje kokonaisuudessaan: docs/moduulit/lukijoilta.md.
 */
export const EHDOTUS_OSOITE = 'https://matkakirja-ehdotukset.samireivinen.workers.dev';

/** Kuratointiavain laitteen muistissa (työhuoneen Lukijoilta-lehti). */
export const EHDOTUS_AVAIN_TALLE = 'matkakirja-ehdotus-avain';

/** Lippu siitä, että kupla on jo näytetty tälle pelaajalle. */
const EHDOTUS_KUPLA_TALLE = 'matkakirja-ehdotus-kupla';

/** Kuvia enintään — sama raja kuin workerissa. */
export const EHDOTUS_KUVIA = 3;

/** Selaimessa skaalatun kuvan pisin sivu ja jpeg-laatu. */
const EHDOTUS_KUVAN_SIVU = 2048;
const EHDOTUS_KUVAN_LAATU = 0.85;

/*
 * PRO-SISÄLLÖNTUOTTAJAT.
 *
 * Tuottajan tunnus (sähköposti + koodi) laitteen muistissa. Koodi on
 * PYSYVÄ, joten muistin tyhjentyminen ei ole vahinko: sama pari
 * kirjautuu uudestaan. Siksi tämä on mukavuus eikä istunto — koodia
 * ei uusita eikä vanhenneta.
 */
export const PRO_TALLE = 'matkakirja-pro-tunnus';

/** Profiilikuvan pisin sivu: tekijäsivun kuva on pieni muotokuva. */
const PRO_KUVAN_SIVU = 1024;

/** Linkkejä enintään — sama raja kuin workerissa. */
export const PRO_LINKKEJA = 3;

/** Esittelyn merkkikatto — sama raja kuin workerissa. */
export const PRO_ESITTELY = 600;

/** Kupla vasta, kun peliä on pelattu tämän verran. */
const EHDOTUS_KUPLAN_VIIVE_MS = 10 * 60 * 1000;

/** Pöllön minipuhekupla — sama kiinteä tekstin malli kuin valintavihjeellä. */
export const EHDOTUS_KUPLAN_TEKSTI = 'Haluatko osallistua pelin rakentamiseen? '
  + 'Lähetä kuva tai juttuidea!';

/** Onko kanava kytketty? */
export function ehdotusKaytossa() {
  return Boolean(EHDOTUS_OSOITE);
}

/* ------------------------------------------------------------------ *
 * Avain laitteen muistissa
 * ------------------------------------------------------------------ */

export function ehdotusAvain() {
  try {
    return localStorage.getItem(EHDOTUS_AVAIN_TALLE) ?? '';
  } catch {
    return ''; // yksityinen selaus
  }
}

export function asetaEhdotusAvain(avain) {
  try {
    if (avain) localStorage.setItem(EHDOTUS_AVAIN_TALLE, avain);
    else localStorage.removeItem(EHDOTUS_AVAIN_TALLE);
  } catch {
    /* yksityinen selaus: avain kysytään uudestaan seuraavalla kerralla */
  }
}

/* ------------------------------------------------------------------ *
 * Kuvien skaalaus selaimessa
 * ------------------------------------------------------------------ */

/**
 * Pienentää kuvan ennen lähetystä: pisin sivu 2048 px, jpeg 0.85.
 *
 * Puhelimen kamerakuva on helposti 5–10 Mt, ja workerin raja on 8 Mt
 * — mutta tärkeämpää on, ettei pelaajan mobiiliyhteydellä siirretä
 * turhaa. Jos skaalaus ei jostain syystä onnistu (HEIC, jota selain ei
 * osaa purkaa), alkuperäinen tiedosto lähtee sellaisenaan ja worker
 * torjuu sen tarvittaessa selkeällä viestillä.
 *
 * Pisin sivu on parametri, koska pro-tuottajan omakuva on pieni
 * muotokuva tekijäsivulle (1024 px riittää) eikä lehteen taitettava
 * valokuva.
 *
 * @param {File} tiedosto valittu kuva
 * @param {number} sivu pisin sivu pikseleinä
 * @returns {Promise<Blob|File>} skaalattu kuva tai alkuperäinen
 */
export async function skaalaaEhdotusKuva(tiedosto, sivu = EHDOTUS_KUVAN_SIVU) {
  try {
    const kuva = await new Promise((valmis, virhe) => {
      const osoite = URL.createObjectURL(tiedosto);
      const elementti = new Image();
      elementti.onload = () => { URL.revokeObjectURL(osoite); valmis(elementti); };
      elementti.onerror = () => { URL.revokeObjectURL(osoite); virhe(new Error('kuvaa ei voi lukea')); };
      elementti.src = osoite;
    });
    const suurin = Math.max(kuva.naturalWidth, kuva.naturalHeight);
    const kerroin = suurin > sivu ? sivu / suurin : 1;
    // Jo valmiiksi pieni jpeg kannattaa lähettää sellaisenaan: uudelleen
    // pakkaaminen vain huonontaa sitä.
    if (kerroin === 1 && tiedosto.type === 'image/jpeg') return tiedosto;
    const kangas = document.createElement('canvas');
    kangas.width = Math.round(kuva.naturalWidth * kerroin);
    kangas.height = Math.round(kuva.naturalHeight * kerroin);
    kangas.getContext('2d').drawImage(kuva, 0, 0, kangas.width, kangas.height);
    const pala = await new Promise((valmis) => {
      kangas.toBlob(valmis, 'image/jpeg', EHDOTUS_KUVAN_LAATU);
    });
    if (!pala) return tiedosto;
    return new File([pala], `${(tiedosto.name ?? 'kuva').replace(/\.\w+$/, '')}.jpg`,
      { type: 'image/jpeg' });
  } catch (err) {
    console.warn('Kuvan pienennys ei onnistunut, lähetetään alkuperäinen:', err);
    return tiedosto;
  }
}

/* ------------------------------------------------------------------ *
 * Lähetys
 * ------------------------------------------------------------------ */

/**
 * Lähettää ehdotuksen workerille.
 *
 * @param {object} ehdotus kentät lomakkeesta
 * @returns {Promise<object>} workerin vastaus
 */
export async function lahetaEhdotus(ehdotus) {
  const lomake = new FormData();
  lomake.append('teksti', ehdotus.teksti ?? '');
  lomake.append('sivu', ehdotus.sivu ?? '');
  lomake.append('tarkenne', ehdotus.tarkenne ?? '');
  lomake.append('nimimerkki', ehdotus.nimimerkki ?? '');
  lomake.append('sahkoposti', ehdotus.sahkoposti ?? '');
  lomake.append('saaKrediitteihin', ehdotus.saaKrediitteihin ? 'on' : '');
  lomake.append('lisenssivakuutus', ehdotus.lisenssivakuutus ? 'on' : '');
  // Hunajapurkki: piilokenttä, jonka vain robotti täyttää.
  lomake.append('hunaja', ehdotus.hunaja ?? '');
  for (const kuva of ehdotus.kuvat ?? []) lomake.append('kuvat', kuva);

  const vastaus = await fetch(`${EHDOTUS_OSOITE}/laheta`, { method: 'POST', body: lomake });
  let data = null;
  try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
  if (!vastaus.ok) {
    throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
  }
  return data ?? { ok: true };
}

/* ------------------------------------------------------------------ *
 * Työhuoneen haku (Lukijoilta-lehti)
 * ------------------------------------------------------------------ */

/**
 * Hakee ehdotukset uusin ensin.
 *
 * @param {string} avain kuratointiavain
 * @returns {Promise<Array<object>>} ehdotusten metat
 */
export async function haeEhdotukset(avain) {
  const vastaus = await fetch(`${EHDOTUS_OSOITE}/lista?avain=${encodeURIComponent(avain)}`);
  if (vastaus.status === 401) throw new Error('Avain ei kelpaa.');
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  return data.ehdotukset ?? [];
}

/** Kuvan osoite työhuoneelle (kulkee avaimen kanssa workerin kautta). */
export function ehdotusKuvaOsoite(kansio, tiedosto, avain) {
  return `${EHDOTUS_OSOITE}/kohde/${encodeURIComponent(`${kansio}/${tiedosto}`)}`
    + `?avain=${encodeURIComponent(avain)}`;
}

/* ------------------------------------------------------------------ *
 * Työhuoneen pro-osio (omistajan reitit, EHDOTUS_AVAIN)
 * ------------------------------------------------------------------ */

/** Yhteinen virheenkäsittely omistajan pro-kutsuille. */
async function omistajanKutsu(polku, avain, asetukset = {}) {
  const erotin = polku.includes('?') ? '&' : '?';
  const vastaus = await fetch(
    `${EHDOTUS_OSOITE}${polku}${erotin}avain=${encodeURIComponent(avain)}`, asetukset,
  );
  let data = null;
  try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
  if (vastaus.status === 401) throw new Error('Avain ei kelpaa.');
  if (!vastaus.ok) throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
  return data ?? {};
}

/**
 * Kaikki pro-tuottajat koodeineen ja profiilitiloineen.
 *
 * @param {string} avain kuratointiavain
 * @returns {Promise<Array<object>>} tuottajien tietueet
 */
export async function haeProTuottajat(avain) {
  const data = await omistajanKutsu('/pro-lista', avain);
  return data.tuottajat ?? [];
}

/**
 * Lisää tuottajan (tai palauttaa olemassa olevan koodin).
 *
 * @param {string} avain kuratointiavain
 * @param {string} sahkoposti tuottajan osoite
 * @param {string} nimi näkyvä nimi (vapaaehtoinen)
 * @returns {Promise<object>} { ok, uusi, tuottaja }
 */
export function lisaaProTuottaja(avain, sahkoposti, nimi = '') {
  return omistajanKutsu('/pro-tuottaja', avain, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sahkoposti, nimi }),
  });
}

/**
 * Omistajan päätös odottavasta profiilista.
 *
 * @param {string} avain kuratointiavain
 * @param {string} sahkoposti tuottajan osoite
 * @param {'julkaistu'|'hylatty'} tila päätös
 * @param {string} kommentti vapaaehtoinen viesti tuottajalle
 * @returns {Promise<object>} { ok, tuottaja }
 */
export function paataProProfiili(avain, sahkoposti, tila, kommentti = '') {
  return omistajanKutsu('/pro-hyvaksy', avain, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sahkoposti, tila, kommentti }),
  });
}

/** Odottavan profiilikuvan osoite työhuoneelle (kulkee avaimen kanssa). */
export function proKuvaOsoite(tekijaId, avain) {
  return `${EHDOTUS_OSOITE}/pro-kuva/${encodeURIComponent(tekijaId)}`
    + `?avain=${encodeURIComponent(avain)}`;
}

/** Ihmisluettava aika listaan. */
export function ehdotusAika(iso) {
  try {
    return new Date(iso).toLocaleString('fi-FI', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso ?? '';
  }
}

/* ------------------------------------------------------------------ *
 * Pöllön minipuhekupla
 * ------------------------------------------------------------------ */

/**
 * Ajastaa pöllön kutsun osallistua — KERRAN PELAAJAA KOHDEN.
 *
 * Sääntö on Raamatusta: pöllö saa joskus ehdottaa osallistumista,
 * mutta kupla ei saa muuttua muistutusrummutukseksi. Siksi kolme
 * porttia: kanavan pitää olla kytketty, peliä pitää olla pelattu
 * kymmenen minuuttia, ja localStorage-lippu estää toisen kerran
 * ikuisesti.
 *
 * @param {(teksti: string) => void} nayta kuplan näyttäjä (pöllö)
 * @returns {number|null} ajastimen tunnus tai null jos kuplaa ei tule
 */
export function ajastaEhdotusKupla(nayta) {
  if (!ehdotusKaytossa()) return null;
  let nahty = false;
  try { nahty = localStorage.getItem(EHDOTUS_KUPLA_TALLE) === '1'; } catch { nahty = true; }
  if (nahty) return null;
  return setTimeout(() => {
    try { localStorage.setItem(EHDOTUS_KUPLA_TALLE, '1'); } catch { /* yksityinen selaus */ }
    nayta(EHDOTUS_KUPLAN_TEKSTI);
  }, EHDOTUS_KUPLAN_VIIVE_MS);
}

/* ------------------------------------------------------------------ *
 * Lomakkeen osio
 * ------------------------------------------------------------------ */

/**
 * "Ehdota lehteen" -osio palautedialogin loppuun.
 *
 * Rakenne on lehden tyyliä: lyhyt johdanto, kuvavalitsin, juttuidea,
 * automaattinen sivuehdotus (pelaajan nykyinen näkymä), vapaa
 * tarkennus, nimimerkki krediitteihin ja sähköposti ilmoitusta
 * varten. Lisenssivakuutus on pakollinen heti kun kuvia on valittu.
 *
 * @param {string} sivu pelin nykyinen näkymä (lauta · kaupunki · lehti)
 * @returns {HTMLElement|null} osio tai null, jos kanavaa ei ole
 */
export function ehdotusOsio(sivu = '') {
  if (!ehdotusKaytossa()) return null;

  // Omistajan päätös 18.8.2026: osio näkyy suoraan ilman otsikkoa ja
  // vipua — vain pro-osio on vivun takana.
  const lohko = html('div', 'periaate-ehdotus');

  const johdanto = html('p', 'periaate-teksti');
  johdanto.textContent = 'Näitkö matkallasi kuvan tai aiheen, joka kuuluisi '
    + 'johonkin pelin lehteen? Lähetä se tästä. Omistaja käy ehdotukset läpi '
    + 'eikä mitään julkaista ilman hänen hyväksyntäänsä.';
  lohko.appendChild(johdanto);

  /* --- kuvat --- */
  const kuvaNimio = html('label', 'periaate-nimio', `Kuvat (enintään ${EHDOTUS_KUVIA})`);
  const kuvaKentta = html('input', 'periaate-kentta periaate-kuvat');
  kuvaKentta.type = 'file';
  kuvaKentta.accept = 'image/jpeg,image/png,image/webp,image/heic,image/heif';
  kuvaKentta.multiple = true;
  kuvaNimio.appendChild(kuvaKentta);
  lohko.appendChild(kuvaNimio);

  const kuvaTieto = html('p', 'periaate-huomio');
  kuvaTieto.setAttribute('role', 'status');
  lohko.appendChild(kuvaTieto);

  /* --- juttuidea --- */
  const teksti = html('textarea', 'periaate-kentta');
  teksti.rows = 4;
  teksti.placeholder = 'Juttuidea tai kuvateksti — mistä kuva on ja miksi se sopisi lehteen?';
  teksti.setAttribute('aria-label', 'Juttuidea tai kuvateksti');
  lohko.appendChild(teksti);

  /* --- sivuehdotus ja tarkenne --- */
  const sivuRivi = html('p', 'periaate-huomio');
  sivuRivi.textContent = sivu
    ? `Ehdotus kohdistuu sivulle: ${sivu}`
    : 'Ehdotus kohdistuu koko peliin (et ole juuri nyt lehdessä).';
  lohko.appendChild(sivuRivi);

  const tarkenne = html('input', 'periaate-kentta');
  tarkenne.type = 'text';
  tarkenne.placeholder = 'Tarkennus: mille sivulle tai osastolle? (vapaaehtoinen)';
  tarkenne.setAttribute('aria-label', 'Tarkennus, vapaaehtoinen');
  lohko.appendChild(tarkenne);

  /* --- nimimerkki ja krediitit --- */
  const nimimerkki = html('input', 'periaate-kentta');
  nimimerkki.type = 'text';
  nimimerkki.placeholder = 'Nimi tai nimimerkki (vapaaehtoinen)';
  nimimerkki.setAttribute('aria-label', 'Nimi tai nimimerkki, vapaaehtoinen');
  lohko.appendChild(nimimerkki);

  const krediitit = html('label', 'periaate-rasti');
  const krediittiRasti = document.createElement('input');
  krediittiRasti.type = 'checkbox';
  krediitit.appendChild(krediittiRasti);
  krediitit.appendChild(html('span', '', 'Nimeni saa näkyä pelin krediiteissä'));
  lohko.appendChild(krediitit);

  /* --- sähköposti --- */
  const sahkoposti = html('input', 'periaate-kentta');
  sahkoposti.type = 'email';
  sahkoposti.placeholder = 'Sähköposti (vapaaehtoinen)';
  sahkoposti.setAttribute('aria-label', 'Sähköpostiosoite, vapaaehtoinen');
  lohko.appendChild(sahkoposti);

  const seloste = html('p', 'periaate-huomio',
    'Sähköposti on vain ilmoitusta varten — sitä ei julkaista eikä käytetä mihinkään muuhun.');
  lohko.appendChild(seloste);

  /* --- lisenssivakuutus --- */
  const lisenssi = html('label', 'periaate-rasti');
  const lisenssiRasti = document.createElement('input');
  lisenssiRasti.type = 'checkbox';
  lisenssi.appendChild(lisenssiRasti);
  lisenssi.appendChild(html('span', '',
    'Kuva on ottamani tai minulla on oikeus antaa se peliin, ja se saa julkaista '
    + 'pelissä tekijän nimellä (CC BY -henkisesti).'));
  lisenssi.hidden = true;
  lohko.appendChild(lisenssi);

  /* --- hunajapurkki: piilossa, vain robotille --- */
  const hunaja = html('input', 'periaate-hunaja');
  hunaja.type = 'text';
  hunaja.tabIndex = -1;
  hunaja.autocomplete = 'off';
  hunaja.setAttribute('aria-hidden', 'true');
  hunaja.hidden = true;
  lohko.appendChild(hunaja);

  const nappi = html('button', 'primary periaate-laheta', 'Lähetä ehdotus');
  nappi.type = 'button';
  lohko.appendChild(nappi);

  const huomio = html('p', 'periaate-huomio');
  huomio.setAttribute('role', 'status');
  lohko.appendChild(huomio);

  /* --- toiminta --- */
  let valitut = [];
  kuvaKentta.addEventListener('change', async () => {
    const tiedostot = [...(kuvaKentta.files ?? [])];
    if (tiedostot.length > EHDOTUS_KUVIA) {
      kuvaTieto.textContent = `Valitse enintään ${EHDOTUS_KUVIA} kuvaa.`;
      valitut = [];
      lisenssi.hidden = true;
      return;
    }
    if (!tiedostot.length) {
      valitut = [];
      kuvaTieto.textContent = '';
      lisenssi.hidden = true;
      return;
    }
    kuvaTieto.textContent = 'Valmistellaan kuvia…';
    valitut = [];
    for (const tiedosto of tiedostot) {
      // eslint-disable-next-line no-await-in-loop
      valitut.push(await skaalaaEhdotusKuva(tiedosto));
    }
    const megat = valitut.reduce((summa, k) => summa + (k.size ?? 0), 0) / (1024 * 1024);
    kuvaTieto.textContent = `${valitut.length} kuvaa valmiina (${megat.toFixed(1)} Mt).`;
    lisenssi.hidden = false;
  });

  nappi.addEventListener('click', async () => {
    if (!valitut.length && !teksti.value.trim()) {
      huomio.textContent = 'Kirjoita juttuidea tai valitse kuva.';
      teksti.focus();
      return;
    }
    if (valitut.length && !lisenssiRasti.checked) {
      huomio.textContent = 'Vahvista vielä, että kuvan saa julkaista.';
      return;
    }
    nappi.disabled = true;
    huomio.textContent = 'Lähetetään…';
    try {
      await lahetaEhdotus({
        teksti: teksti.value.trim(),
        sivu,
        tarkenne: tarkenne.value.trim(),
        nimimerkki: nimimerkki.value.trim(),
        sahkoposti: sahkoposti.value.trim(),
        saaKrediitteihin: krediittiRasti.checked,
        lisenssivakuutus: lisenssiRasti.checked,
        hunaja: hunaja.value,
        kuvat: valitut,
      });
      teksti.value = '';
      tarkenne.value = '';
      valitut = [];
      kuvaKentta.value = '';
      kuvaTieto.textContent = '';
      lisenssi.hidden = true;
      nappi.textContent = 'Lähetetty';
      // Palkkiosta kerrotaan vasta onnistumisen jälkeen (päätoimittajan
      // tarkennus 18.8.2026): lupausta ei mainosteta etukäteen.
      huomio.textContent = 'Kiitos! Ehdotus on perillä. Jos ehdotuksesi päätyy '
        + 'lehteen, saat palkkioksi pelirahaa — jätä sähköpostisi niin kuulet siitä.';
    } catch (err) {
      console.warn('Ehdotuksen lähetys ei onnistunut:', err);
      nappi.disabled = false;
      huomio.textContent = `Lähetys ei onnistunut: ${err.message}. Kokeile hetken päästä uudelleen.`;
    }
  });

  return lohko;
}

/* ------------------------------------------------------------------ *
 * PRO-SISÄLLÖNTUOTTAJAT
 *
 * Kutsuttu ammattilainen (valokuvaaja, tutkija) kirjautuu
 * sähköpostilla ja omistajalta saamallaan pysyvällä koodilla. Sen
 * jälkeen hän voi lähettää oman tekijäsivunsa: kuva, esittely ja
 * 1–3 linkkiä. Profiili menee jonoon — omistaja päättää, mikä
 * julkaistaan (worker/ehdotukset/pro.js).
 *
 * MIKSI SAMASSA LOMAKKEESSA: pro-tuottajakin on ensin pelaaja, ja
 * hänelle on kerrottu missä kanava on. Erillinen kirjautumissivu
 * olisi pelin ulkopuolinen liite; taitettu osio ei näy kenellekään,
 * joka ei sitä etsi.
 * ------------------------------------------------------------------ */

/** Tuottajan tunnuspari laitteen muistista. */
export function proTunnus() {
  try {
    const teksti = localStorage.getItem(PRO_TALLE);
    if (!teksti) return null;
    const tunnus = JSON.parse(teksti);
    return tunnus?.sahkoposti && tunnus?.koodi ? tunnus : null;
  } catch {
    return null; // yksityinen selaus tai rikkinäinen arvo
  }
}

/** Talteen tai pois (tyhjä arvo unohtaa parin). */
export function asetaProTunnus(tunnus) {
  try {
    if (tunnus?.sahkoposti && tunnus?.koodi) {
      localStorage.setItem(PRO_TALLE, JSON.stringify({
        sahkoposti: tunnus.sahkoposti, koodi: tunnus.koodi,
      }));
    } else {
      localStorage.removeItem(PRO_TALLE);
    }
  } catch {
    /* yksityinen selaus: pari kysytään uudestaan seuraavalla kerralla */
  }
}

/**
 * Tarkistaa sähköposti–koodi-parin workerilta.
 *
 * @param {string} sahkoposti tuottajan osoite
 * @param {string} koodi omistajalta saatu pysyvä koodi
 * @returns {Promise<object>} { ok, nimi, tekijaId, tila, profiili }
 */
export async function tarkistaPro(sahkoposti, koodi) {
  const vastaus = await fetch(`${EHDOTUS_OSOITE}/pro-tarkista`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sahkoposti, koodi }),
  });
  let data = null;
  try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
  if (!vastaus.ok) throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
  return data ?? { ok: true };
}

/**
 * Lähettää tuottajan profiilin (kuva + esittely + linkit).
 *
 * @param {object} profiili { sahkoposti, koodi, esittely, linkit, kuva }
 * @returns {Promise<object>} workerin vastaus
 */
export async function lahetaProProfiili(profiili) {
  const lomake = new FormData();
  lomake.append('sahkoposti', profiili.sahkoposti ?? '');
  lomake.append('koodi', profiili.koodi ?? '');
  lomake.append('esittely', profiili.esittely ?? '');
  for (const linkki of profiili.linkit ?? []) lomake.append('linkit', linkki);
  if (profiili.kuva) lomake.append('kuva', profiili.kuva);

  const vastaus = await fetch(`${EHDOTUS_OSOITE}/pro-profiili`, {
    method: 'POST', body: lomake,
  });
  let data = null;
  try { data = await vastaus.json(); } catch { /* tyhjä runko */ }
  if (!vastaus.ok) throw new Error(data?.virhe ?? `HTTP ${vastaus.status}`);
  return data ?? { ok: true };
}

/** Tuottajan tilan suomeksi lomakkeen tilariville. */
function proTilaTeksti(tila) {
  if (tila === 'odottaa') return 'Profiili odottaa julkaisua.';
  if (tila === 'julkaistu') return 'Tekijäsivusi on julkaistu pelissä.';
  if (tila === 'hylatty') return 'Profiilia ei julkaistu — voit lähettää uuden.';
  return 'Et ole vielä lähettänyt profiilia.';
}

/**
 * Kirjautuneen tuottajan näkymä: omakuva, esittely ja linkit.
 *
 * @param {object} tunnus { sahkoposti, koodi }
 * @param {object} tiedot workerin /pro-tarkista-vastaus
 * @returns {HTMLElement} näkymä
 */
function proNakyma(tunnus, tiedot) {
  const lohko = html('div', 'pro-nakyma');

  const tervehdys = html('p', 'periaate-teksti',
    `Hei ${tiedot.nimi || tunnus.sahkoposti}! Tässä on oma tekijäsivusi. `
    + 'Se näkyy pelaajalle kuviesi lähderiviltä.');
  lohko.appendChild(tervehdys);

  const tila = html('p', 'periaate-huomio', proTilaTeksti(tiedot.tila));
  tila.setAttribute('role', 'status');
  lohko.appendChild(tila);
  if (tiedot.kommentti) {
    lohko.appendChild(html('p', 'periaate-huomio', `Omistajan viesti: ${tiedot.kommentti}`));
  }

  /* --- omakuva --- */
  const kuvaNimio = html('label', 'periaate-nimio', 'Oma kuva (1 kpl)');
  const kuvaKentta = html('input', 'periaate-kentta');
  kuvaKentta.type = 'file';
  kuvaKentta.accept = 'image/jpeg,image/png,image/webp';
  kuvaNimio.appendChild(kuvaKentta);
  lohko.appendChild(kuvaNimio);
  const kuvaTieto = html('p', 'periaate-huomio',
    tiedot.profiili?.kuva ? 'Kuva on tallessa. Uusi valinta korvaa sen.' : '');
  kuvaTieto.setAttribute('role', 'status');
  lohko.appendChild(kuvaTieto);

  /* --- esittely --- */
  const esittely = html('textarea', 'periaate-kentta');
  esittely.rows = 4;
  esittely.maxLength = PRO_ESITTELY;
  esittely.placeholder = `Lyhyt esittely (enintään ${PRO_ESITTELY} merkkiä)`;
  esittely.setAttribute('aria-label', 'Esittely');
  esittely.value = tiedot.profiili?.esittely ?? '';
  lohko.appendChild(esittely);

  /* --- linkit --- */
  lohko.appendChild(html('p', 'periaate-huomio',
    `Linkit omille sivuillesi (enintään ${PRO_LINKKEJA}, http- tai https-osoite).`));
  const linkkiKentat = [];
  for (let i = 0; i < PRO_LINKKEJA; i += 1) {
    const kentta = html('input', 'periaate-kentta');
    kentta.type = 'url';
    kentta.placeholder = i === 0 ? 'https://omatsivut.fi' : 'Lisälinkki (vapaaehtoinen)';
    kentta.setAttribute('aria-label', `Linkki ${i + 1}`);
    kentta.value = tiedot.profiili?.linkit?.[i]?.url ?? '';
    linkkiKentat.push(kentta);
    lohko.appendChild(kentta);
  }

  const nappi = html('button', 'primary periaate-laheta', 'Lähetä profiili');
  nappi.type = 'button';
  lohko.appendChild(nappi);

  const ulos = html('button', 'ghost pro-ulos', 'Unohda tunnukseni tältä laitteelta');
  ulos.type = 'button';
  lohko.appendChild(ulos);

  const huomio = html('p', 'periaate-huomio');
  huomio.setAttribute('role', 'status');
  lohko.appendChild(huomio);

  let valittu = null;
  kuvaKentta.addEventListener('change', async () => {
    const tiedosto = (kuvaKentta.files ?? [])[0];
    if (!tiedosto) { valittu = null; kuvaTieto.textContent = ''; return; }
    kuvaTieto.textContent = 'Valmistellaan kuvaa…';
    valittu = await skaalaaEhdotusKuva(tiedosto, PRO_KUVAN_SIVU);
    const megat = (valittu.size ?? 0) / (1024 * 1024);
    kuvaTieto.textContent = `Kuva valmiina (${megat.toFixed(1)} Mt).`;
  });

  nappi.addEventListener('click', async () => {
    if (!esittely.value.trim()) {
      huomio.textContent = 'Kirjoita lyhyt esittely.';
      esittely.focus();
      return;
    }
    nappi.disabled = true;
    huomio.textContent = 'Lähetetään…';
    try {
      const vastaus = await lahetaProProfiili({
        ...tunnus,
        esittely: esittely.value.trim(),
        linkit: linkkiKentat.map((k) => k.value.trim()).filter(Boolean),
        kuva: valittu,
      });
      nappi.disabled = false;
      valittu = null;
      kuvaKentta.value = '';
      tila.textContent = proTilaTeksti('odottaa');
      huomio.textContent = vastaus.viesti
        ?? 'Profiili odottaa julkaisua — saat krediitin kun ensimmäinen '
          + 'kuvasi julkaistaan lehdessä.';
    } catch (err) {
      console.warn('Pro-profiilin lähetys ei onnistunut:', err);
      nappi.disabled = false;
      huomio.textContent = `Lähetys ei onnistunut: ${err.message}`;
    }
  });

  ulos.addEventListener('click', () => {
    asetaProTunnus(null);
    huomio.textContent = 'Tunnukset unohdettu. Avaa osio uudelleen ja kirjaudu koodillasi.';
    nappi.disabled = true;
  });

  return lohko;
}

/**
 * "Olen pro-sisällöntuottaja" -osio palautelomakkeen loppuun.
 *
 * Kirjautuminen on sähköposti + koodi. Pari talletetaan laitteelle
 * vasta kun worker on vahvistanut sen — väärä pari ei jää muistiin
 * kummittelemaan. Jos muisti on tyhjentynyt, sama pari kirjautuu
 * uudestaan: koodi on pysyvä.
 *
 * @returns {HTMLElement|null} osio tai null, jos kanavaa ei ole
 */
export function proOsio() {
  if (!ehdotusKaytossa()) return null;

  const lohko = html('details', 'periaate-ehdotus periaate-pro');
  lohko.appendChild(html('summary', 'periaate-valiotsikko', 'Olen pro-sisällöntuottaja'));

  const johdanto = html('p', 'periaate-teksti');
  johdanto.textContent = 'Omistaja kutsuu peliin ammattilaisia — valokuvaajia ja '
    + 'tutkijoita. Kutsutut saavat sähköpostiinsa koodin, jolla pääsee '
    + 'rakentamaan oman tekijäsivun: kuva, esittely ja linkit omille sivuille. '
    + 'Sivu avautuu pelaajalle kuvasi lähderiviltä.';
  lohko.appendChild(johdanto);

  const sisus = html('div', 'pro-sisus');
  lohko.appendChild(sisus);

  const kirjautuminen = html('div', 'pro-kirjautuminen');
  const posti = html('input', 'periaate-kentta');
  posti.type = 'email';
  posti.placeholder = 'Sähköposti';
  posti.setAttribute('aria-label', 'Pro-tuottajan sähköposti');
  kirjautuminen.appendChild(posti);

  const koodi = html('input', 'periaate-kentta');
  koodi.type = 'text';
  koodi.autocapitalize = 'characters';
  koodi.spellcheck = false;
  koodi.placeholder = 'Koodi (8 merkkiä)';
  koodi.setAttribute('aria-label', 'Pro-tuottajan koodi');
  kirjautuminen.appendChild(koodi);

  const nappi = html('button', 'primary periaate-laheta', 'Kirjaudu');
  nappi.type = 'button';
  kirjautuminen.appendChild(nappi);

  const huomio = html('p', 'periaate-huomio');
  huomio.setAttribute('role', 'status');
  kirjautuminen.appendChild(huomio);
  sisus.appendChild(kirjautuminen);

  const avaa = async (tunnus, { hiljaa = false } = {}) => {
    try {
      const tiedot = await tarkistaPro(tunnus.sahkoposti, tunnus.koodi);
      asetaProTunnus(tunnus);
      sisus.replaceChildren(proNakyma(tunnus, tiedot));
      return true;
    } catch (err) {
      // Muistista tullut pari on voinut vanhentua (omistaja poistanut
      // tuottajan). Unohdetaan se, mutta ei säikäytetä pelaajaa
      // virheviestillä, jota hän ei pyytänyt.
      asetaProTunnus(null);
      if (!hiljaa) huomio.textContent = err.message;
      return false;
    }
  };

  nappi.addEventListener('click', async () => {
    const tunnus = { sahkoposti: posti.value.trim(), koodi: koodi.value.trim() };
    if (!tunnus.sahkoposti || !tunnus.koodi) {
      huomio.textContent = 'Kirjoita sähköposti ja koodi.';
      return;
    }
    nappi.disabled = true;
    huomio.textContent = 'Tarkistetaan…';
    const ok = await avaa(tunnus);
    if (!ok) nappi.disabled = false;
  });

  // Muistissa oleva pari avaa näkymän suoraan, kun osio avataan
  // ensimmäisen kerran — ei turhaa verkkopyyntöä ennen sitä.
  let kokeiltu = false;
  lohko.addEventListener('toggle', () => {
    if (!lohko.open || kokeiltu) return;
    kokeiltu = true;
    const muistissa = proTunnus();
    if (muistissa) avaa(muistissa, { hiljaa: true });
  });

  return lohko;
}
