/*
 * PELIDEMOT — työhuoneen Pelit-välilehden pelattavat esimerkit.
 *
 * Omistajan tilaus 11.8.2026: jokaisesta tutki kätkö -pelityypistä pitää
 * päästä kokeilemaan oikeaa peliä työhuoneessa, jotta niistä voi antaa
 * palautetta avaamatta koko peliä ja etsimättä oikeaa kaupunkia.
 *
 * PERIAATE: demo ei jäljittele mitään. Se luo oikean Game-instanssin
 * (js/game.js) oikealla laudalla (maailmankartta) ja kutsuu samoja
 * moottorin funktioita kuin peli itse — actionQuiz, openPuzzle,
 * beginDuel, answerQuiz, answerDuel. Sisältö tulee siis paketeista
 * sellaisenaan, eikä demo voi näyttää mitään, mitä pelissä ei ole.
 *
 * Miksi irrallinen Game on turvallinen: konstruktori ei kirjoita
 * localStorageen (tallennus on main.js:ssä) eikä demo kutsu
 * closeQuiz/closeDuel-funktioita, jotka päättäisivät vuoron. Jokainen
 * demon avaus ja "Arvo uusi" tekee UUDEN pelin, joten arvonnat ovat
 * joka kerta eri — ja kohtaamisen yrityskiintiö (KAARI_YRITYKSET) on
 * aina koskematon.
 *
 * Vain yksi demo on näkyvissä kerrallaan (omistajan vaatimus): napit
 * vaihtavat korttia, eivät kasaa niitä peräkkäin.
 *
 * EI ÄÄNTÄ eikä ajastinta: työhuone on tarkastelupöytä, ei peli-ikkuna.
 */

import { Game } from './game.js';
import { packById } from './pack.js';
import { TARINAKAARI } from './packs/tarinakaari.js';
import { asetaKuva } from './media.js';
import { drawPuzzle as piirraAfrikanPulma, hasSketch as afrikanPulma } from './packs/africa-puzzles.js';
import { drawPuzzle as piirraEuroopanPulma } from './packs/europe-puzzles.js';
import {
  AFRICA_VALOKUVAT, lippuUrl, lippuVara, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import { EUROPE_VALOKUVAT } from './packs/europe-valokuvat.js';
import { ASIA_VALOKUVAT } from './packs/asia-valokuvat.js';
import { ASIA_LISAT_VALOKUVAT } from './packs/asia-lisat-valokuvat.js';
import { NORTHAMERICA_VALOKUVAT } from './packs/northamerica-valokuvat.js';
import { SOUTHAMERICA_VALOKUVAT } from './packs/southamerica-valokuvat.js';
import { OCEANIA_VALOKUVAT } from './packs/oceania-valokuvat.js';

// --- pikkuapurit --------------------------------------------------------

const el = (tagi, luokka, teksti) => {
  const n = document.createElement(tagi);
  if (luokka) n.className = luokka;
  if (teksti != null) n.textContent = teksti;
  return n;
};

const nappi = (luokka, teksti) => {
  const n = el('button', luokka, teksti);
  n.type = 'button';
  return n;
};

const arvo = (lista) => lista[Math.floor(Math.random() * lista.length)];

const sekoita = (lista) => {
  const kopio = [...lista];
  for (let i = kopio.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
  }
  return kopio;
};

const KIRJAIMET = 'ABCDEFGH';

// --- laudat ja kuvat ----------------------------------------------------

const LAUTA = packById('maailmankartta');

/*
 * Sama kuvakokoelma kuin pelissä (ui.js: KAIKKI_VALOKUVAT). Valokuva-
 * kysymys tarvitsee poolin, jonka käyttöliittymä syöttää moottorille —
 * ilman sitä muoto putoaisi pois eikä demoa olisi.
 */
const KAIKKI_VALOKUVAT = {
  ...AFRICA_VALOKUVAT, ...EUROPE_VALOKUVAT, ...ASIA_VALOKUVAT, ...ASIA_LISAT_VALOKUVAT,
  ...NORTHAMERICA_VALOKUVAT, ...SOUTHAMERICA_VALOKUVAT, ...OCEANIA_VALOKUVAT,
};

/*
 * Kuvat, jotka eivät kelpaa "mikä paikka tämä on" -kysymykseen. Sama
 * lista kuin ui.js:ssä (EI_VALOKUVAKYSYMYKSEEN); se on siellä moduulin
 * sisäinen vakio, joten demo toistaa sen. Jos listaa muutetaan, muuta
 * molemmat — muuten työhuone näyttäisi kysymyksen, jota pelissä ei ole.
 */
const EI_VALOKUVAKYSYMYKSEEN = new Set([
  'rashafun', 'sanambrosio', 'alkufra', 'bahrelghazal',
]);

const kuvapoolit = new Map();

function kuvapooli(pack) {
  if (kuvapoolit.has(pack.id)) return kuvapoolit.get(pack.id);
  const kuvat = new Map();
  for (const c of pack.cities) {
    if (EI_VALOKUVAKYSYMYKSEEN.has(c.id)) continue;
    const valokuva = KAIKKI_VALOKUVAT[c.id];
    // Nykykuva ensin, vanha vedos varalle — kuten pelissä.
    const valittu = valokuva?.uusi?.tiedosto ? valokuva.uusi : valokuva;
    if (!valittu?.tiedosto) continue;
    kuvat.set(c.id, { tiedosto: valittu.tiedosto, lahde: valittu.lahde ?? null });
  }
  kuvapoolit.set(pack.id, kuvat);
  return kuvat;
}

/** Pulman piirros oikeasta laudasta — sama jako kuin ui.js:ssä. */
function piirraPulma(svg, id, data) {
  if (afrikanPulma(id)) piirraAfrikanPulma(svg, id, data);
  else piirraEuroopanPulma(svg, id, data);
}

// --- pelin luonti -------------------------------------------------------

/**
 * Uusi peli demoa varten: yksi pelaaja annetussa kaupungissa, vuoro
 * toimintavaiheessa. Vaellustila päällä, jottei demopeli voi päättyä
 * kesken kaiken laatan kääntyessä tähdeksi.
 */
function uusiPeli(cityId, pack = LAUTA) {
  const peli = new Game({
    players: [{ name: 'Työhuone', color: '#b3401f', start: cityId }],
    pack,
    roaming: true,
  });
  // beginTurn on voinut valita matkustustavan valmiiksi; demo tarvitsee
  // pelaajan paikallaan ja vuoron toimintavaiheessa.
  peli.players[0].pos = { type: 'city', city: cityId };
  peli.phase = 'action';
  peli.autoTravel = false;
  peli.travelMode = null;
  const kuvat = kuvapooli(pack);
  peli.setPhotoPool([...kuvat.keys()], kuvat);
  return peli;
}

const kaupunginNimi = (peli, cityId) => peli.board.cityById.get(cityId)?.name ?? cityId;

/** Kaupungit, joissa on tarinakaaren kohtaaminen — ja kaikki muut. */
const KAARIKAUPUNGIT = LAUTA.cities.filter((c) => TARINAKAARI[c.id]?.kysymys).map((c) => c.id);
const TAVALLISET = LAUTA.cities.filter((c) => !TARINAKAARI[c.id]?.kysymys).map((c) => c.id);

// --- kortin osat --------------------------------------------------------

/** Vastauksen tulos: oikein/väärin ja fakta pienellä. */
function naytaTulos(kohde, data) {
  kohde.textContent = '';
  const oikea = data.options[data.correct];
  const rivi = el('p', 'pelidemo-tulos');
  rivi.classList.add(data.right ? 'oikein' : 'vaarin');
  rivi.textContent = data.right ? 'Oikein!' : `Väärin — oikea: ${oikea}`;
  kohde.append(rivi);
  const fakta = typeof data.fact === 'string' ? data.fact : data.fact?.text;
  if (fakta) kohde.append(el('p', 'pieni', fakta));
}

/**
 * Vastausnapit. `data` on moottorin quiz- tai duel-olio, joten
 * kuvalliset vaihtoehdot (valokuvapulma) tulevat samasta kentästä kuin
 * pelissä.
 */
function vaihtoehdot(data, onValinta) {
  const laatikko = el('div', 'pelidemo-vaihtoehdot');
  const napit = data.options.map((teksti, i) => {
    const b = nappi('pelidemo-vaihtoehto');
    const kuva = data.kuvat?.[i];
    if (kuva?.tiedosto) {
      b.classList.add('kuvallinen');
      const img = document.createElement('img');
      img.className = 'pelidemo-vaihtoehto-kuva';
      img.alt = kuva.selite ?? '';
      img.draggable = false;
      img.addEventListener('error', () => { img.hidden = true; });
      asetaKuva(img, valokuvaUrl(kuva.tiedosto, 560), valokuvaVara(kuva.tiedosto, 560));
      b.append(img);
    }
    b.append(el('span', 'kirjain', KIRJAIMET[i] ?? String(i + 1)));
    b.append(el('span', 'teksti', teksti));
    b.addEventListener('click', () => onValinta(i, napit));
    return b;
  });
  for (const b of napit) laatikko.append(b);
  if (data.kuvaLahteet) laatikko.append(el('p', 'pieni', data.kuvaLahteet));
  return laatikko;
}

/** Merkitsee valinnan napeille ja lukitsee ne. */
function merkitseValinta(napit, data, valittu) {
  napit.forEach((b, i) => {
    b.disabled = true;
    if (i === data.correct) b.classList.add('oikein');
    if (i === valittu && !data.right) b.classList.add('vaarin');
    if (i === valittu) b.classList.add('valittu');
  });
}

/**
 * Yhteinen visakortti: otsikko, mahdollinen tervehdys kursiivilla,
 * mahdollinen kuva tai piirros, kysymys, vaihtoehdot ja tulos.
 */
function visaKortti({
  otsikko, tervehdys, selite, kuva, piirros, data, vastaa,
}) {
  const pala = document.createDocumentFragment();
  pala.append(el('p', 'pelidemo-otsikko', otsikko));
  if (tervehdys) pala.append(el('p', 'pelidemo-tervehdys', tervehdys));

  if (piirros) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'pelidemo-sketch');
    svg.setAttribute('viewBox', '0 0 320 150');
    svg.setAttribute('aria-hidden', 'true');
    piirraPulma(svg, piirros.puzzleId, piirros.sketchData);
    pala.append(svg);
  }
  if (selite) pala.append(el('p', 'pieni', selite));

  if (kuva?.osoite) {
    const img = document.createElement('img');
    img.className = kuva.lippu ? 'pelidemo-kuva lippu' : 'pelidemo-kuva';
    img.alt = kuva.alt ?? '';
    img.addEventListener('error', () => { img.hidden = true; });
    asetaKuva(img, kuva.osoite, kuva.vara);
    pala.append(img);
  }

  pala.append(el('p', 'pelidemo-kysymys', data.question));
  const tulos = el('div', 'pelidemo-tulosalue');
  pala.append(vaihtoehdot(data, (i, napit) => {
    const res = vastaa(i);
    if (!res?.ok) return;
    merkitseValinta(napit, data, i);
    naytaTulos(tulos, data);
  }));
  pala.append(tulos);
  return pala;
}

/** Virheilmoitus kortin sisällöksi, jos moottori ei antanut peliä. */
const virheKortti = (teksti) => {
  const pala = document.createDocumentFragment();
  pala.append(el('p', 'puuttuu', teksti));
  return pala;
};

// --- demot --------------------------------------------------------------
//
// Jokainen rakenna() palauttaa kortin sisällön ja luo oman pelinsä, joten
// sama nappi antaa joka painalluksella eri kaupungin ja eri kysymyksen.

const DEMOT = [
  {
    id: 'kohtaaminen',
    nimi: 'Kohtaamisvisa',
    selite: 'Kaupungin ensimmäinen peli: tarinakaaren henkilö tervehtii, ja '
      + 'hänen repliikkinsä päättyy kysymykseen. Pelissä tämä luetaan ääneen; '
      + 'demossa ääntä ei ole.',
    rakenna() {
      const city = arvo(KAARIKAUPUNGIT);
      const peli = uusiPeli(city);
      const res = peli.actionQuiz({});
      if (!res.ok || !res.quiz?.kaari) {
        return virheKortti(`Kohtaamista ei saatu auki (${res.error ?? 'ei kaarta'}).`);
      }
      return visaKortti({
        otsikko: `${kaupunginNimi(peli, city)} — kohtaaminen`,
        tervehdys: TARINAKAARI[city]?.kohtaaminen ?? null,
        data: res.quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'tietovisa',
    nimi: 'Tietovisa',
    selite: 'Monivalinta kaupungin omasta kysymyspankista. Demo arpoo '
      + 'kaupungin, jolla ei ole kaarta — muuten kohtaaminen menisi aina edelle.',
    rakenna() {
      const city = arvo(TAVALLISET);
      const peli = uusiPeli(city);
      const res = peli.actionQuiz({ form: 'quiz' });
      if (!res.ok) return virheKortti(`Tietovisaa ei saatu auki (${res.error}).`);
      return visaKortti({
        otsikko: `${kaupunginNimi(peli, city)} — ${res.quiz.frame ?? 'tietovisa'}`,
        data: res.quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'vaittama',
    nimi: 'Isoisän väittämä',
    selite: 'Päiväkirjamerkintä vuodelta 1873 ja kysymys: pitääkö se yhä '
      + 'paikkansa? Kaksi vaihtoehtoa neljän sijaan.',
    rakenna() {
      const city = arvo(TAVALLISET);
      const peli = uusiPeli(city);
      const res = peli.actionQuiz({ form: 'claim' });
      if (!res.ok || res.quiz?.kind !== 'claim') {
        return virheKortti(`Väittämää ei saatu auki (${res.error ?? 'ei väittämäpankkia'}).`);
      }
      const paikka = res.quiz.place ? ` · ${res.quiz.place}` : '';
      return visaKortti({
        otsikko: `Isoisän päiväkirjasta, 1873${paikka} — pitääkö tämä yhä paikkansa?`,
        data: res.quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'valokuva',
    nimi: 'Valokuvakysymys',
    selite: 'Matkavalokuvaajan vedos oikeasta paikasta ja kysymys, mikä paikka '
      + 'kuvassa on. Kuvat ovat laudan omat, käsin tarkistetut.',
    rakenna() {
      const city = arvo(TAVALLISET);
      const peli = uusiPeli(city);
      const res = peli.actionQuiz({ form: 'photo' });
      if (!res.ok || res.quiz?.kind !== 'photo') {
        return virheKortti(`Valokuvakysymystä ei saatu auki (${res.error ?? 'ei kuvia'}).`);
      }
      return visaKortti({
        otsikko: `${kaupunginNimi(peli, city)} — ${res.quiz.frame}`,
        kuva: res.quiz.photoFile ? {
          osoite: valokuvaUrl(res.quiz.photoFile, 640),
          vara: valokuvaVara(res.quiz.photoFile, 640),
          alt: 'Matkavalokuvaajan vedos',
        } : null,
        data: res.quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'lippu',
    nimi: 'Lippukysymys',
    selite: 'Tullimies näyttää lipun. Vaihtoehdot ovat laudan omia maita, ja '
      + 'liput ovat repossa — kysymys toimii ilman verkkoa.',
    rakenna() {
      const city = arvo(TAVALLISET);
      const peli = uusiPeli(city);
      const res = peli.actionQuiz({ form: 'flag' });
      if (!res.ok || res.quiz?.kind !== 'flag') {
        return virheKortti(`Lippukysymystä ei saatu auki (${res.error ?? 'ei lippuja'}).`);
      }
      return visaKortti({
        otsikko: `${kaupunginNimi(peli, city)} — ${res.quiz.frame}`,
        kuva: {
          osoite: lippuUrl(res.quiz.flagFile, 320),
          vara: lippuVara(res.quiz.flagFile, 320),
          alt: 'Tullimiehen näyttämä lippu',
          lippu: true,
        },
        data: res.quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'tapahtuma',
    nimi: 'Tapahtumakortti',
    selite: 'Kysymyksen sijaan tapahtuu jotain, ja vaikutus kerrotaan kortin '
      + 'lopussa. HUOM: maailmankartalla ei ole tapahtumapakkaa lainkaan, '
      + 'joten demo näyttää Afrikka-paketin kortit — pelissä tämä muoto ei '
      + 'tällä hetkellä tule vastaan.',
    rakenna() {
      const pack = packById('africa');
      const city = arvo(pack.cities.map((c) => c.id));
      const peli = uusiPeli(city, pack);
      const res = peli.actionQuiz({ form: 'event' });
      if (!res.ok || !res.event) {
        return virheKortti(`Tapahtumakorttia ei saatu auki (${res.error ?? 'ei tapahtumapakkaa'}).`);
      }
      const selitteet = {
        viive: 'Matka viivästyy yhdellä vuorolla.',
        kyyti: 'Saat ilmaisen kyydin naapurikaupunkiin.',
      };
      const { effect } = res.event;
      const vaikutus = effect?.kind === 'raha'
        ? (effect.amount >= 0
          ? `Kukkaroon +${effect.amount} puntaa.`
          : `Kukkarosta ${effect.amount} puntaa.`)
        : (selitteet[effect?.kind] ?? '');
      const pala = document.createDocumentFragment();
      pala.append(el('p', 'pelidemo-otsikko', `${kaupunginNimi(peli, city)} — tapahtuma`));
      pala.append(el('p', 'pelidemo-kysymys', res.event.text));
      pala.append(el('p', 'pelidemo-tulos oikein', vaikutus));
      pala.append(el('p', 'pieni', 'Tapahtumakorttiin ei vastata: se luetaan ja vaikutus toteutuu.'));
      return pala;
    },
  },
  {
    id: 'pulma',
    nimi: 'Piirrospulma',
    selite: 'Isoisän luonnoskirjan tehtävä, joka ratkeaa piirroksesta. Luvut '
      + 'ja asennot arvotaan joka kerta uudelleen.',
    rakenna() {
      const osuma = pulmaDemo(false);
      if (!osuma) return virheKortti('Piirrospulmaa ei saatu auki.');
      const { peli, quiz } = osuma;
      return visaKortti({
        otsikko: `Isoisän luonnoskirjasta — ${quiz.title}`,
        selite: quiz.selite,
        piirros: { puzzleId: quiz.puzzleId, sketchData: quiz.sketchData },
        data: quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'kuvapulma',
    nimi: 'Valokuvapulma',
    selite: 'Luonnos ja neljä oikeaa valokuvaa: mikä niistä on sama kohde? '
      + 'Pilotti on Ateenan pylväänpäät.',
    rakenna() {
      const osuma = pulmaDemo(true);
      if (!osuma) return virheKortti('Valokuvapulmaa ei saatu auki.');
      const { peli, quiz } = osuma;
      return visaKortti({
        otsikko: `Isoisän luonnoskirjasta — ${quiz.title}`,
        selite: quiz.selite,
        piirros: { puzzleId: quiz.puzzleId, sketchData: quiz.sketchData },
        data: quiz,
        vastaa: (i) => peli.answerQuiz(i),
      });
    },
  },
  {
    id: 'vaikea',
    nimi: 'Vaikea kysymys',
    selite: 'Pelaajan oma valinta: isompi riski, rahapalkkio. Aina monivalinta '
      + 'kaupungin vaikeista kysymyksistä.',
    rakenna() {
      for (const city of sekoita(TAVALLISET).slice(0, 30)) {
        const peli = uusiPeli(city);
        if (!peli.hardAvailable(city)) continue;
        const res = peli.actionQuiz({ hard: true });
        if (!res.ok) continue;
        return visaKortti({
          otsikko: `${kaupunginNimi(peli, city)} — ${res.quiz.frame ?? 'vaikea kysymys'} (vaikea)`,
          data: res.quiz,
          vastaa: (i) => peli.answerQuiz(i),
        });
      }
      return virheKortti('Vaikeaa kysymystä ei saatu auki.');
    },
  },
  {
    id: 'rosvo',
    nimi: 'Rosvon kaksintaistelu',
    selite: 'Kiperä kysymys ja kahdeksan vaihtoehtoa, panoksena rahat. Pelissä '
      + 'mukana ovat myös helpotus ja hevosenkenkäohitus; demossa vain kysymys.',
    rakenna() {
      const peli = uusiPeli(arvo(TAVALLISET));
      const res = peli.beginDuel();
      if (!res.ok) return virheKortti(`Kaksintaistelua ei saatu auki (${res.error}).`);
      return visaKortti({
        otsikko: 'Rosvo astuu tielle',
        data: res.duel,
        vastaa: (i) => peli.answerDuel(i),
      });
    },
  },
];

/**
 * Avaa pulman, jossa vaihtoehdot ovat kuvia (kuvallinen = true) tai
 * tekstiä (false). Kysymys ratkaistaan moottorin arpomasta pulmasta
 * eikä tunnistelistasta, joten uusi valokuvapulma tulee demoon mukaan
 * ilman muutoksia tähän tiedostoon.
 */
function pulmaDemo(kuvallinen) {
  for (const city of sekoita((LAUTA.puzzles ?? []).map((p) => p.city))) {
    const peli = uusiPeli(city);
    const res = peli.openPuzzle();
    if (!res.ok) continue;
    if (Boolean(res.quiz.kuvat) === kuvallinen) return { peli, quiz: res.quiz };
  }
  return null;
}

// --- käynnistys ---------------------------------------------------------

/**
 * Rakentaa nappirivin ja demoalueen annettuun elementtiin. Kutsutaan
 * kerran, kun Pelit-välilehti avataan ensimmäistä kertaa.
 */
export function kaynnistaPelidemot(kohde) {
  if (!kohde || kohde.dataset.valmis === '1') return;
  kohde.dataset.valmis = '1';
  kohde.classList.add('pelidemot');

  const napit = el('div', 'rivi pelidemo-napit');
  const alue = el('div', 'pelidemo-alue');
  kohde.append(napit, alue);

  let valittu = null;

  const nayta = (demo) => {
    valittu = demo;
    for (const b of napit.children) b.classList.toggle('paalla', b.dataset.demo === demo.id);
    alue.textContent = '';
    const kortti = el('div', 'kortti pelidemo-kortti');
    kortti.append(el('p', 'pieni', demo.selite));
    let sisalto;
    try {
      sisalto = demo.rakenna();
    } catch (virhe) {
      sisalto = virheKortti(`Demo kaatui: ${virhe.message}`);
    }
    kortti.append(sisalto);
    const uusi = nappi('toiminto pelidemo-uusi', 'Arvo uusi');
    uusi.addEventListener('click', () => nayta(valittu));
    kortti.append(uusi);
    alue.append(kortti);
  };

  for (const demo of DEMOT) {
    const b = nappi('toiminto', demo.nimi);
    b.dataset.demo = demo.id;
    b.addEventListener('click', () => nayta(demo));
    napit.append(b);
  }

  alue.append(el('p', 'pieni', 'Valitse peli napista — vain yksi demo on '
    + 'kerrallaan näkyvissä ja pelattavissa.'));
}
