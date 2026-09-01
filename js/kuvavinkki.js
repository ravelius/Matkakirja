/*
 * KUVIEN SYÖTTÖPUTKI — pelaajan ja pro-tuottajan kuvat samaan jonoon
 * (omistajan tilaus 1.9.2026: *"kuvien syöttöputki tarvitaan myös pro
 * sisällön tuottajille, joten otetaan se työnalle heti. pelaajat voivat
 * vinkata myös mielenkiintoisista paikoista kuvien kautta"* —
 * esimerkkinä omistajan kännykkäkuva Ritavuoren muistolaatasta).
 *
 * KOLME SISÄÄNKÄYNTIÄ, YKSI LOMAKE JA YKSI REITTI:
 *
 *   1. "Vinkkaa paikasta kuvalla" hampurilaisvalikossa, ehdotusosion
 *      rinnalla (js/ui.js lisaaEhdotusOsio).
 *   2. SAMA LOMAKE PRO-TUNNUKSELLA rikastettuna: laitteen muistissa
 *      oleva sähköposti + koodi kulkee mukana, ja worker merkitsee
 *      lähetyksen pro-lähteeksi. Tuottajan ei tarvitse kirjautua
 *      uudestaan — pari on jo muistissa pro-osiosta.
 *   3. HAVAINNEKUVAN PALAUTE (js/havainnekuva.js): selitepopupin nappi
 *      avaa saman lomakkeen esitäytettynä, kuvan tunnus mukanaan.
 *
 * MIKSI OMA MODUULI: ehdotukset.js on jo talon kolmanneksi suurin
 * lomaketiedosto, ja tämä on eri kanava eri pakollisilla kentillä.
 * Yhteinen osa (workerin osoite, kuvien skaalaus, postitus, pro-tunnus)
 * tuodaan sieltä eikä kirjoiteta uudestaan.
 *
 * OIKEUSVALINNAT OVAT PAKOLLISET (omistajan tilaus). Kaksi asiaa, ja
 * molemmat kysytään lomakkeessa eikä jälkikäteen sähköpostilla:
 *
 *   (a) vakuutus omista oikeuksista — rasti, ilman sitä ei lähetetä;
 *   (b) käyttölupa — "sellaisenaan" vai "vain taustatiedoksi".
 *
 * Tarkistus on sekä täällä (heti, ilman verkkoa) että workerissa
 * (koska selaimeen ei voi luottaa).
 *
 * EI JULKAISUAUTOMATIIKKAA: kuva menee jonoon, ihminen poimii sen.
 */

import { html } from './ui-apurit.js';
import { avaaMinipopup } from './minipopup.js';
import {
  EHDOTUS_KUVIA, ehdotusKaytossa, postita, proTunnus, skaalaaEhdotusKuva, tarkistaPro,
} from './ehdotukset.js';

/**
 * KÄYTTÖLUVAT — sama suljettu lista kuin workerissa
 * (worker/ehdotukset/kuvavinkki.js: KAYTTOLUVAT). Valinta listasta on
 * kirjaus; vapaa teksti ei ole.
 */
export const KAYTTOLUVAT = [
  {
    arvo: 'sellaisenaan',
    nimi: 'Kuvaa saa käyttää pelissä sellaisenaan',
  },
  {
    arvo: 'taustatieto',
    nimi: 'Vain taustatiedoksi kohteesta — kuvaa ei julkaista',
  },
];

/** Käyttöluvan ihmisluettava nimi tunnuksesta. */
export function kayttoluvanNimi(arvo) {
  return KAYTTOLUVAT.find((k) => k.arvo === arvo)?.nimi ?? arvo ?? '';
}

/**
 * Kuvavinkin pisin sivu. Isompi kuin tavallisen ehdotuksen 2048, koska
 * vinkin koko sisältö on kuva ja työhuoneessa siitä pitää pystyä
 * arvioimaan, kelpaako se lehteen.
 */
export const KUVAVINKIN_SIVU = 2400;

/** Kuvien katto lomakkeessa — sama raja kuin workerissa. */
export const KUVAVINKIN_KUVIA = EHDOTUS_KUVIA;

/* ------------------------------------------------------------------ *
 * Lähetys
 * ------------------------------------------------------------------ */

/**
 * Lähettää kuvavinkin tai havainnekuvan palautteen workerille.
 *
 * Reitti on sama molemmille: worker päättelee lajin kuvatunnuksesta.
 *
 * @param {object} v { kuvat, paikka, teksti, nimimerkki, sahkoposti,
 *   saaKrediitteihin, omaKuva, kayttolupa, kuvatunnus, kuvalahde,
 *   sahkoposti, koodi, hunaja }
 * @returns {Promise<object>} workerin vastaus
 */
export function lahetaKuvavinkki(v) {
  const lomake = new FormData();
  lomake.append('paikka', v.paikka ?? '');
  lomake.append('teksti', v.teksti ?? '');
  lomake.append('nimimerkki', v.nimimerkki ?? '');
  lomake.append('sahkoposti', v.sahkoposti ?? '');
  lomake.append('saaKrediitteihin', v.saaKrediitteihin ? 'on' : '');
  lomake.append('omakuva', v.omaKuva ? 'on' : '');
  lomake.append('kayttolupa', v.kayttolupa ?? '');
  lomake.append('kuvatunnus', v.kuvatunnus ?? '');
  lomake.append('kuvalahde', v.kuvalahde ?? '');
  // Pro-tunnus kulkee mukana vain jos se on; worker torjuu väärän parin.
  if (v.koodi) lomake.append('koodi', v.koodi);
  // Hunajapurkki: piilokenttä, jonka vain robotti täyttää.
  lomake.append('hunaja', v.hunaja ?? '');
  for (const kuva of v.kuvat ?? []) lomake.append('kuvat', kuva);

  return postita('/kuvavinkki', lomake);
}

/**
 * Lähetysvirhe pelaajan kielellä.
 *
 * Verkkokatko ei tule workerilta vaan selaimelta, ja silloin
 * `err.message` on selaimen oma englanninkielinen teksti ("Failed to
 * fetch", "NetworkError when attempting to fetch resource"). Se on
 * pelaajalle sekä käsittämätön että väärä: mitään ei mennyt rikki, verkko
 * vain puuttuu. Workerin omat virheet ovat sen sijaan suomeksi ja
 * kertovat mitä lomakkeesta puuttuu, joten ne näytetään sellaisenaan.
 *
 * @param {Error} err kiinni otettu virhe
 * @returns {string} viesti pelaajalle
 */
export function lahetysvirheViesti(err) {
  const viesti = String(err?.message ?? '');
  const verkotta = err instanceof TypeError
    || /failed to fetch|networkerror|load failed|network request failed/i.test(viesti);
  if (verkotta) {
    return 'Lähetys ei onnistunut: yhteyttä ei saatu. '
      + 'Kokeile hetken päästä uudelleen.';
  }
  return `Lähetys ei onnistunut: ${viesti}. Kokeile hetken päästä uudelleen.`;
}

/* ------------------------------------------------------------------ *
 * Lomake
 * ------------------------------------------------------------------ */

/**
 * Kuvavinkkilomake — yksi rakennin, kaksi käyttötapaa.
 *
 * Ilman `kuvatunnus`-kenttää tämä on pelaajan (tai pro-tuottajan)
 * paikkavinkki: kuva on pakollinen ja paikka kysytään. Kuvatunnuksen
 * kanssa sama lomake on palaute nimetystä havainnekuvasta: kuva on
 * vapaaehtoinen liite ja teksti se, mitä oikeasti odotetaan.
 *
 * @param {object} p
 * @param {string} [p.kuvatunnus] palautteen kohde (havainnekuvan polku)
 * @param {string} [p.kuvalahde] kohteen lähderivi sellaisenaan
 * @param {string} [p.sivu] pelin nykyinen näkymä (kirjataan mukaan)
 * @param {() => void} [p.onnistui] kutsutaan onnistuneen lähetyksen jälkeen
 * @returns {HTMLElement|null} lomake tai null, jos kanavaa ei ole
 */
export function kuvavinkkiLomake({
  kuvatunnus = '', kuvalahde = '', sivu = '', onnistui = null,
} = {}) {
  if (!ehdotusKaytossa()) return null;
  const palaute = Boolean(kuvatunnus);

  const lohko = html('div', `periaate-ehdotus kuvavinkki${palaute ? ' kuvavinkki-palaute' : ''}`);

  const johdanto = html('p', 'periaate-teksti');
  johdanto.textContent = palaute
    ? 'Kerro, mikä kuvassa on pielessä — tai lähetä oma valokuvasi '
      + 'kohteesta. Molemmat auttavat: teksti kertoo mitä korjata, kuva '
      + 'näyttää sen.'
    : 'Näitkö paikan, joka kuuluisi peliin? Muistolaatta, patsas, '
      + 'rakennus tai näkymä — lähetä kuva ja kerro, missä se on. '
      + 'Tiimi käy vinkit läpi.';
  lohko.appendChild(johdanto);

  // Palautteessa näytetään, mistä kuvasta on kyse — pelaaja on voinut
  // ehtiä sulkea kuvan popupin takaa.
  if (palaute && kuvalahde) {
    const kohde = html('p', 'periaate-huomio kuvavinkki-kohde');
    kohde.textContent = `Palaute koskee kuvaa: ${kuvalahde}`;
    lohko.appendChild(kohde);
  }

  /* --- kuvat --- */
  const kuvaNimio = html('label', 'periaate-nimio',
    palaute ? `Oma valokuvasi kohteesta (vapaaehtoinen, enintään ${KUVAVINKIN_KUVIA})`
      : `Kuva paikasta (enintään ${KUVAVINKIN_KUVIA})`);
  const kuvaKentta = html('input', 'periaate-kentta kuvavinkki-kuvat');
  kuvaKentta.type = 'file';
  // HEIC mukaan: iPhonen oletusmuoto. Selain muuntaa sen canvasilla
  // jpeg:ksi, jos osaa purkaa — muuten se lähtee sellaisenaan ja worker
  // ottaa sen vastaan HEIC-tyyppinä.
  kuvaKentta.accept = 'image/jpeg,image/png,image/webp,image/heic,image/heif';
  kuvaKentta.multiple = true;
  kuvaNimio.appendChild(kuvaKentta);
  lohko.appendChild(kuvaNimio);

  const kuvaTieto = html('p', 'periaate-huomio kuvavinkki-tieto');
  kuvaTieto.setAttribute('role', 'status');
  lohko.appendChild(kuvaTieto);

  /* --- paikka --- */
  const paikka = html('input', 'periaate-kentta kuvavinkki-paikka');
  paikka.type = 'text';
  paikka.placeholder = palaute
    ? 'Paikka tai kaupunki (vapaaehtoinen)'
    : 'Paikka ja kaupunki — esim. "Ritavuoren muistolaatta, Helsinki"';
  paikka.setAttribute('aria-label', 'Paikka ja kaupunki');
  lohko.appendChild(paikka);

  /* --- vapaa teksti --- */
  const teksti = html('textarea', 'periaate-kentta kuvavinkki-teksti');
  teksti.rows = 4;
  teksti.placeholder = palaute
    ? 'Mikä kuvassa ei vastaa todellisuutta?'
    : 'Mikä paikka tämä on ja miksi se kiinnostaisi? (vapaaehtoinen)';
  teksti.setAttribute('aria-label', palaute ? 'Palaute kuvasta' : 'Kuvaus paikasta');
  lohko.appendChild(teksti);

  /* --- OIKEUDET: molemmat pakollisia, kun kuvia on mukana --- */
  const oikeudet = html('div', 'kuvavinkki-oikeudet');
  oikeudet.appendChild(html('h4', 'periaate-valiotsikko', 'Kuvan oikeudet'));

  const omaNimio = html('label', 'periaate-rasti');
  const omaRasti = document.createElement('input');
  omaRasti.type = 'checkbox';
  omaRasti.className = 'kuvavinkki-omakuva';
  omaNimio.appendChild(omaRasti);
  omaNimio.appendChild(html('span', '',
    'Kuva on itse ottamani ja omistan siihen oikeudet.'));
  oikeudet.appendChild(omaNimio);

  const lupaNimio = html('label', 'periaate-nimio', 'Käyttölupa');
  const lupa = html('select', 'periaate-kentta kuvavinkki-kayttolupa');
  /*
   * TYHJÄ ENSIMMÄISENÄ, jotta valinta on oikeasti valinta. Valmiiksi
   * valittu "saa käyttää sellaisenaan" olisi lupa, jota kukaan ei
   * antanut — juuri se, mitä oikeusvakuutuksella yritetään estää.
   */
  const tyhja = document.createElement('option');
  tyhja.value = '';
  tyhja.textContent = 'Valitse…';
  lupa.appendChild(tyhja);
  for (const vaihtoehto of KAYTTOLUVAT) {
    const rivi = document.createElement('option');
    rivi.value = vaihtoehto.arvo;
    rivi.textContent = vaihtoehto.nimi;
    lupa.appendChild(rivi);
  }
  lupaNimio.appendChild(lupa);
  oikeudet.appendChild(lupaNimio);
  // Palautteessa oikeuslohko on piilossa, kunnes kuva valitaan: pelkkä
  // tekstipalaute ei tarvitse lupaa mihinkään.
  oikeudet.hidden = palaute;
  lohko.appendChild(oikeudet);

  /* --- nimimerkki, krediitit ja sähköposti --- */
  const nimimerkki = html('input', 'periaate-kentta kuvavinkki-nimimerkki');
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

  const sahkoposti = html('input', 'periaate-kentta kuvavinkki-sahkoposti');
  sahkoposti.type = 'email';
  sahkoposti.placeholder = 'Sähköposti (vapaaehtoinen)';
  sahkoposti.setAttribute('aria-label', 'Sähköpostiosoite, vapaaehtoinen');
  lohko.appendChild(sahkoposti);

  lohko.appendChild(html('p', 'periaate-huomio',
    'Sähköposti on vain ilmoitusta varten — sitä ei julkaista eikä '
    + 'käytetä mihinkään muuhun.'));

  /* --- pro-tuottajan tilarivi --- */
  const proRivi = html('p', 'periaate-huomio kuvavinkki-pro');
  proRivi.setAttribute('role', 'status');
  proRivi.hidden = true;
  lohko.appendChild(proRivi);

  /* --- hunajapurkki: piilossa, vain robotille --- */
  const hunaja = html('input', 'periaate-hunaja');
  hunaja.type = 'text';
  hunaja.tabIndex = -1;
  hunaja.autocomplete = 'off';
  hunaja.setAttribute('aria-hidden', 'true');
  hunaja.hidden = true;
  lohko.appendChild(hunaja);

  const nappi = html('button', 'primary periaate-laheta kuvavinkki-laheta',
    palaute ? 'Lähetä palaute' : 'Lähetä vinkki');
  nappi.type = 'button';
  lohko.appendChild(nappi);

  const huomio = html('p', 'periaate-huomio kuvavinkki-huomio');
  huomio.setAttribute('role', 'status');
  lohko.appendChild(huomio);

  /* --- PRO-RIKASTUS: laitteen muistissa oleva tunnuspari --- *
   *
   * Tuottaja on jo kirjautunut pro-osiossa, eikä häntä panna
   * kirjautumaan toista kertaa. Pari tarkistetaan workerilta kerran
   * lomaketta rakennettaessa; jos tarkistus ei onnistu, lomake toimii
   * täsmälleen kuten pelaajalla — vinkki menee nimettömänä eikä
   * kaadu siihen, että pro-reitti on nurin.
   */
  let pro = null;
  const muistissa = proTunnus();
  if (muistissa) {
    tarkistaPro(muistissa.sahkoposti, muistissa.koodi).then((tiedot) => {
      if (!lohko.isConnected && !palaute) return;
      pro = { ...muistissa, nimi: tiedot?.nimi ?? '' };
      proRivi.hidden = false;
      proRivi.textContent = `Lähetät pro-tuottajana: ${pro.nimi || muistissa.sahkoposti}. `
        + 'Kuva merkitään pro-lähteeksi.';
      // Tuottajan osoite on jo tiedossa — ei kysytä sitä uudestaan.
      if (!sahkoposti.value) sahkoposti.value = muistissa.sahkoposti;
      if (!nimimerkki.value && pro.nimi) nimimerkki.value = pro.nimi;
    }).catch((err) => {
      console.warn('Pro-tunnuksen tarkistus ei onnistunut:', err);
    });
  }

  /* --- toiminta --- */
  let valitut = [];
  kuvaKentta.addEventListener('change', async () => {
    const tiedostot = [...(kuvaKentta.files ?? [])];
    if (tiedostot.length > KUVAVINKIN_KUVIA) {
      valitut = [];
      kuvaTieto.textContent = `Valitse enintään ${KUVAVINKIN_KUVIA} kuvaa.`;
      if (palaute) oikeudet.hidden = true;
      return;
    }
    if (!tiedostot.length) {
      valitut = [];
      kuvaTieto.textContent = '';
      if (palaute) oikeudet.hidden = true;
      return;
    }
    kuvaTieto.textContent = 'Valmistellaan kuvia…';
    valitut = [];
    for (const tiedosto of tiedostot) {
      // eslint-disable-next-line no-await-in-loop
      valitut.push(await skaalaaEhdotusKuva(tiedosto, KUVAVINKIN_SIVU));
    }
    const megat = valitut.reduce((summa, k) => summa + (k.size ?? 0), 0) / (1024 * 1024);
    kuvaTieto.textContent = `${valitut.length} kuvaa valmiina (${megat.toFixed(1)} Mt).`;
    oikeudet.hidden = false;
  });

  nappi.addEventListener('click', async () => {
    // Puutteet kerrotaan lomakkeen järjestyksessä ylhäältä alas —
    // pelaajaa ei hyppyytetä.
    const puute = (viesti, kentta) => {
      huomio.textContent = viesti;
      kentta?.focus();
    };
    if (!valitut.length && !palaute) {
      puute('Valitse kuva paikasta, josta haluat vinkata.', kuvaKentta);
      return;
    }
    if (palaute && !valitut.length && !teksti.value.trim()) {
      puute('Kirjoita palaute tai liitä kuva.', teksti);
      return;
    }
    if (!palaute && !paikka.value.trim()) {
      puute('Kerro, missä paikka on.', paikka);
      return;
    }
    if (valitut.length && !omaRasti.checked) {
      puute('Vahvista vielä, että kuva on itse ottamasi ja omistat oikeudet.', omaRasti);
      return;
    }
    if (valitut.length && !lupa.value) {
      puute('Valitse, saako kuvaa käyttää pelissä vai onko se vain taustatietoa.', lupa);
      return;
    }

    nappi.disabled = true;
    huomio.textContent = 'Lähetetään…';
    try {
      await lahetaKuvavinkki({
        kuvat: valitut,
        paikka: paikka.value.trim(),
        teksti: teksti.value.trim(),
        nimimerkki: nimimerkki.value.trim(),
        sahkoposti: sahkoposti.value.trim(),
        saaKrediitteihin: krediittiRasti.checked,
        omaKuva: omaRasti.checked,
        kayttolupa: lupa.value,
        kuvatunnus,
        // Lähderivi ja pelin näkymä kulkevat samassa kentässä: työhuone
        // näkee yhdellä silmäyksellä, mistä kuvasta ja mistä kohtaa
        // peliä palaute tuli.
        kuvalahde: [kuvalahde, sivu].filter(Boolean).join(' · '),
        koodi: pro?.koodi ?? '',
        hunaja: hunaja.value,
      });
      valitut = [];
      kuvaKentta.value = '';
      paikka.value = '';
      teksti.value = '';
      kuvaTieto.textContent = '';
      omaRasti.checked = false;
      lupa.value = '';
      if (palaute) oikeudet.hidden = true;
      nappi.textContent = 'Lähetetty';
      huomio.textContent = palaute
        ? 'Kiitos! Palaute on perillä ja se luetaan. Jos kuva on pielessä, '
          + 'se korjataan.'
        : 'Kiitos! Vinkki on perillä. Tiimi käy sen läpi — jätä sähköpostisi, '
          + 'niin kuulet jos paikka päätyy peliin.';
      onnistui?.();
    } catch (err) {
      console.warn('Kuvavinkin lähetys ei onnistunut:', err);
      nappi.disabled = false;
      huomio.textContent = lahetysvirheViesti(err);
    }
  });

  return lohko;
}

/**
 * "Vinkkaa paikasta kuvalla" -osio hampurilaisvalikkoon.
 *
 * Väkäsen takana ehdotusosion rinnalla: valikon lomake on jo pitkä,
 * eikä toinen aina auki oleva kuvalomake mahdu siihen ilman että
 * kumpikin hukkuu. Otsikko kertoo mitä sisällä on.
 *
 * @param {string} sivu pelin nykyinen näkymä
 * @returns {HTMLElement|null} osio tai null, jos kanavaa ei ole
 */
export function kuvavinkkiOsio(sivu = '') {
  if (!ehdotusKaytossa()) return null;
  const lohko = html('details', 'periaate-ehdotus periaate-kuvavinkki');
  lohko.appendChild(html('summary', 'periaate-valiotsikko', 'Vinkkaa paikasta kuvalla'));
  // Lomake rakennetaan vasta kun osio avataan: pro-tarkistus on
  // verkkopyyntö, eikä sitä tehdä valikon avaamisen yhteydessä.
  let rakennettu = false;
  lohko.addEventListener('toggle', () => {
    if (!lohko.open || rakennettu) return;
    rakennettu = true;
    const lomake = kuvavinkkiLomake({ sivu });
    if (lomake) lohko.appendChild(lomake);
  });
  return lohko;
}

/**
 * Avaa kuvavinkkilomakkeen minipopupissa, esitäytettynä sen kuvan
 * tunnuksella, josta palaute annetaan (js/havainnekuva.js).
 *
 * @param {object} p { kuvatunnus, kuvalahde, sivu }
 * @returns {HTMLDialogElement|null} auennut ikkuna
 */
export function avaaKuvapalaute({ kuvatunnus = '', kuvalahde = '', sivu = '' } = {}) {
  const lomake = kuvavinkkiLomake({ kuvatunnus, kuvalahde, sivu });
  if (!lomake) return null;
  return avaaMinipopup({
    otsikko: 'Lähetä palautetta tästä kuvasta',
    sisalto: lomake,
    luokka: 'kuvavinkki-popup',
  });
}
