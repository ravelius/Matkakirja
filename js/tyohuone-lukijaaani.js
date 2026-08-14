/*
 * Lukijaääni-välilehti: äänen generoinnin säätö (omistajan tilaus
 * 14.8.2026: "työhuoneeseen uusi välilehti äänen generoinnille, missä
 * voin itse säätää äänen kaikkia ominaisuuksia — erottele pöllö,
 * matkakirja ja kaikki muut lukuäänet").
 *
 * Kolme persoonaa säädetään erikseen: ääni (11 vaihtoehtoa), ohjeistus
 * ja koeteksti kuunteluineen. Kuuntelu kutsuu pöllön workerin
 * puhereittiä suoraan; säädöt tottelevat vain kehittäjäkoodilla
 * (tools/pollo/worker.js — ilman koodia worker lukee pelin
 * oletusäänellä, joten kokeilu ei koskaan avaa julkista säätöpintaa).
 *
 * "Käytä pelissä tällä laitteella" tallettaa valinnan localStorageen,
 * josta peli (js/puhe.js) lukee sen joka puhepyyntöön — omalla
 * laitteella pelin ääni vaihtuu heti. KAIKILLE pelaajille valinta
 * viedään kirjaamalla se workerin PUHE_PERSOONAT-tauluun (kerro
 * Fablelle) — tämä sivu näyttää valitut arvot valmiina rivinä.
 *
 * Voimakkuus on myös laitekohtainen (js/puhe.js lukee sen joka palaan)
 * — pelin oletus kaikille on koodissa (VOIMA_OLETUS).
 */

import {
  PUHE_ASETUS_AVAIN, PUHE_KOODI_AVAIN, asetaPuheenVoima, puheenVoima,
} from './puhe.js';
import { POLLOPALVELIN } from './packs/pollo-asetukset.js';

const AANET = ['alloy', 'ash', 'ballad', 'coral', 'echo', 'fable',
  'nova', 'onyx', 'sage', 'shimmer', 'verse'];

const PERSOONAT = [
  {
    id: 'merkinnat',
    nimi: 'Matkakirja — isoisän merkinnät',
    kuvaus: 'Saapumis- ja havaintomerkintöjen lukija matkakirjakortilla.',
    oletusAani: 'onyx',
    testi: 'Saavuimme Irkutskiin illansuussa. Puutalojen ikkunanpuitteet '
      + 'oli leikattu pitsiksi, ja teekaravaanin kellot kilisivät kadulla '
      + 'vielä pimeän tultua.',
  },
  {
    id: 'kertoja',
    nimi: 'Kaikki muut lukuäänet — lehdet ja sivut',
    kuvaus: 'Lehtien sivut, artikkelit ja kaikki kaiutinnapit.',
    oletusAani: 'onyx',
    testi: 'Egyptin historia. Niilin tulva toi mudan pelloille joka '
      + 'kesä, ja koko valtakunnan verokalenteri laskettiin sen mukaan.',
  },
  {
    id: 'pollo',
    nimi: 'Viisas Pöllö',
    kuvaus: 'Pöllön vastausten luenta striimin tahdissa.',
    oletusAani: 'sage',
    testi: 'Hyvä kysymys! Baikal on maailman syvin järvi — sen syvin '
      + 'kohta on yli tuhat kuusisataa metriä.',
  },
];

/* --- pienet apurit ---------------------------------------------------- */

function el(tagi, luokka = '', teksti = '') {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti) e.textContent = teksti;
  return e;
}

function lueAsetukset() {
  try {
    const arvo = JSON.parse(localStorage.getItem(PUHE_ASETUS_AVAIN) ?? '{}');
    return arvo && typeof arvo === 'object' ? arvo : {};
  } catch {
    return {};
  }
}

function tallennaAsetukset(asetukset) {
  const siivottu = {};
  for (const [avain, arvo] of Object.entries(asetukset)) {
    if (arvo && (arvo.aani || arvo.ohje)) siivottu[avain] = arvo;
  }
  if (Object.keys(siivottu).length) {
    localStorage.setItem(PUHE_ASETUS_AVAIN, JSON.stringify(siivottu));
  } else {
    localStorage.removeItem(PUHE_ASETUS_AVAIN);
  }
}

/** Yksi jaettu audioelementti koekuunteluille; uusi kuuntelu katkaisee. */
const koeAudio = new Audio();

async function kuuntele({ persoona, aani, ohje, teksti }, tilaRivi) {
  tilaRivi.textContent = 'Generoidaan…';
  try {
    const otsakkeet = { 'content-type': 'application/json' };
    const koodi = localStorage.getItem(PUHE_KOODI_AVAIN);
    if (koodi) otsakkeet['x-pollo-kehittaja'] = koodi;
    const vastaus = await fetch(POLLOPALVELIN, {
      method: 'POST',
      headers: otsakkeet,
      body: JSON.stringify({
        tehtava: 'puhe',
        teksti,
        persoona,
        aani: aani || undefined,
        ohje: ohje || undefined,
      }),
    });
    if (!vastaus.ok) {
      const virhe = await vastaus.json().catch(() => null);
      tilaRivi.textContent = virhe?.viesti ?? `Ei onnistunut (HTTP ${vastaus.status}).`;
      return;
    }
    const osoite = URL.createObjectURL(await vastaus.blob());
    koeAudio.pause();
    koeAudio.src = osoite;
    koeAudio.volume = Math.min(1, puheenVoima());
    await koeAudio.play();
    tilaRivi.textContent = (aani || ohje) && !koodi
      ? 'Soi — HUOM: ilman kehittäjäkoodia kuulet pelin oletusäänen.'
      : 'Soi.';
    koeAudio.onended = () => {
      tilaRivi.textContent = '';
      URL.revokeObjectURL(osoite);
    };
  } catch {
    tilaRivi.textContent = 'Verkkovirhe — yritä uudelleen.';
  }
}

/* --- osiot ------------------------------------------------------------ */

function voimakkuusOsio() {
  const kortti = el('div', 'kortti');
  kortti.append(el('h3', '', 'Voimakkuus'));
  kortti.append(el('p', 'pieni', 'Lukijaäänen vahvistus tällä laitteella. '
    + 'Pelin oletus kaikille on 1,6× — pysyvä muutos kaikille tehdään '
    + 'koodiin (kerro Fablelle).'));
  const rivi = el('div', 'lukijaaani-rivi');
  const liuku = el('input');
  liuku.type = 'range';
  liuku.min = '0.25';
  liuku.max = '2.5';
  liuku.step = '0.05';
  liuku.value = String(puheenVoima());
  const arvo = el('b', '', `${puheenVoima().toFixed(2)}×`);
  liuku.addEventListener('input', () => {
    const voima = asetaPuheenVoima(Number(liuku.value));
    arvo.textContent = `${voima.toFixed(2)}×`;
  });
  rivi.append(liuku, arvo);
  kortti.append(rivi);
  return kortti;
}

function koodiOsio() {
  const kortti = el('div', 'kortti');
  kortti.append(el('h3', '', 'Kehittäjäkoodi'));
  kortti.append(el('p', 'pieni', 'Sama koodi kuin pöllön kehittäjätilassa '
    + '(workerin salaisuus POLLO_KEHITTAJAKOODI). Ilman koodia worker '
    + 'lukee aina pelin oletusäänillä — säädöt eivät tee mitään. Koodi '
    + 'jää vain tälle laitteelle.'));
  const rivi = el('div', 'lukijaaani-rivi');
  const kentta = el('input');
  kentta.type = 'password';
  kentta.autocomplete = 'off';
  kentta.placeholder = 'kehittäjäkoodi';
  kentta.value = localStorage.getItem(PUHE_KOODI_AVAIN) ?? '';
  const tila = el('span', 'pieni');
  kentta.addEventListener('change', () => {
    if (kentta.value.trim()) {
      localStorage.setItem(PUHE_KOODI_AVAIN, kentta.value.trim());
      tila.textContent = 'Tallennettu laitteelle.';
    } else {
      localStorage.removeItem(PUHE_KOODI_AVAIN);
      tila.textContent = 'Poistettu.';
    }
  });
  rivi.append(kentta, tila);
  kortti.append(rivi);
  return kortti;
}

function persoonaOsio(persoona) {
  const asetukset = lueAsetukset();
  const oma = asetukset[persoona.id] ?? {};

  const kortti = el('div', 'kortti lukijaaani-persoona');
  kortti.append(el('h3', '', persoona.nimi));
  kortti.append(el('p', 'pieni', `${persoona.kuvaus} Pelin oletusääni: ${persoona.oletusAani}.`));

  // Ääni.
  const aaniRivi = el('div', 'lukijaaani-rivi');
  aaniRivi.append(el('span', '', 'Ääni'));
  const valinta = el('select');
  const oletus = el('option', '', `(pelin oletus: ${persoona.oletusAani})`);
  oletus.value = '';
  valinta.append(oletus);
  for (const aani of AANET) {
    const o = el('option', '', aani);
    o.value = aani;
    valinta.append(o);
  }
  valinta.value = oma.aani ?? '';
  aaniRivi.append(valinta);
  kortti.append(aaniRivi);

  // Ohjeistus.
  kortti.append(el('p', 'pieni', 'Ohjeistus (sävy, tahti, luonne — '
    + 'englanti toimii varmimmin; tyhjä = pelin oletus):'));
  const ohje = el('textarea');
  ohje.rows = 3;
  ohje.placeholder = 'esim. Speak Finnish. Calm, low, gravelly voice of an old explorer…';
  ohje.value = oma.ohje ?? '';
  kortti.append(ohje);

  // Koeteksti ja napit.
  kortti.append(el('p', 'pieni', 'Koeteksti:'));
  const testi = el('textarea');
  testi.rows = 2;
  testi.value = persoona.testi;
  kortti.append(testi);

  const napit = el('div', 'lukijaaani-rivi');
  const tila = el('span', 'pieni');
  const kuunteleNappi = el('button', '', 'Kuuntele');
  kuunteleNappi.type = 'button';
  kuunteleNappi.addEventListener('click', () => kuuntele({
    persoona: persoona.id,
    aani: valinta.value,
    ohje: ohje.value.trim(),
    teksti: testi.value.trim() || persoona.testi,
  }, tila));
  const kayta = el('button', '', 'Käytä pelissä tällä laitteella');
  kayta.type = 'button';
  kayta.addEventListener('click', () => {
    const kaikki = lueAsetukset();
    kaikki[persoona.id] = { aani: valinta.value || null, ohje: ohje.value.trim() || null };
    tallennaAsetukset(kaikki);
    const kaytossa = valinta.value || ohje.value.trim();
    tila.textContent = kaytossa
      ? `Käytössä tällä laitteella: ${valinta.value || persoona.oletusAani}`
        + `${ohje.value.trim() ? ' + oma ohje' : ''}. Kaikille pelaajille: kerro valinta Fablelle.`
      : 'Palautettu pelin oletukseen.';
  });
  const palauta = el('button', '', 'Palauta oletus');
  palauta.type = 'button';
  palauta.addEventListener('click', () => {
    const kaikki = lueAsetukset();
    delete kaikki[persoona.id];
    tallennaAsetukset(kaikki);
    valinta.value = '';
    ohje.value = '';
    tila.textContent = 'Palautettu pelin oletukseen.';
  });
  napit.append(kuunteleNappi, kayta, palauta, tila);
  kortti.append(napit);
  return kortti;
}

/* --- käynnistys -------------------------------------------------------- */

export function kaynnistaLukijaaani(kohde) {
  kohde.replaceChildren();
  kohde.append(el('h2', '', 'Lukijaääni'));
  kohde.append(el('p', '', 'Pelin luennat generoidaan lennossa (OpenAI '
    + 'gpt-4o-mini-tts pöllön workerin kautta). Tässä säädetään äänet: '
    + 'kokeile, kuuntele ja ota käyttöön. Laitekohtaiset valinnat '
    + 'vaikuttavat heti omaan peliisi; kaikille pelaajille valinta '
    + 'viedään workerin persoonatauluun (kerro Fablelle mitä valitsit).'));
  if (!POLLOPALVELIN) {
    kohde.append(el('p', 'puuttuu', 'POLLOPALVELIN-osoitetta ei ole '
      + 'asetettu — kuuntelu ei toimi.'));
  }
  kohde.append(voimakkuusOsio());
  kohde.append(koodiOsio());
  for (const persoona of PERSOONAT) kohde.append(persoonaOsio(persoona));
}
