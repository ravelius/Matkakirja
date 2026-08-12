// Isoisän luonnoskirjan pulmat (Eurooppa).
//
// Sama rakenne kuin AFRICA_PUZZLES: piirros, isoisän rivi ja neljä
// vaihtoehtoa. Pulma aukeaa kerran pelissä, kun kaupunkiin saavutaan
// ensimmäistä kertaa, eikä se koskaan estä etenemistä.
//
// Piirrokset tehdään koodina inline-SVG:nä, jotta standalone- ja
// offline-versiot toimivat ilman verkkoa.
//
// Tärkein sääntö on sama kuin Afrikassa — ja Afrikan pulmista opittu
// (omistajan havainto: kuvat olivat liian kryptisiä): **pulma on
// ratkaistavissa pelkästä piirroksesta**, ja piirroksessa lukee
// selväsanaisesti mitä siinä katsotaan. Jokaisessa on esimerkkirivejä
// tai nimilaput, joista järjestelmän voi päätellä ilman ennakkotietoa.

import { el } from '../mapart.js';

const euroInk = (d, parent) => el('path', { d, class: 'ink' }, parent);
const euroFill = (d, parent) => el('path', { d, class: 'ink-fill' }, parent);
const euroText = (x, y, s, parent, size = 13, anchor = 'middle') => {
  const t = el('text', {
    x, y, class: 'ink-text', 'font-size': size, 'text-anchor': anchor,
  }, parent);
  t.textContent = s;
  return t;
};

const euroPoimi = (rng, lista) => lista[Math.floor(rng() * lista.length)];
const euroSekoita = (rng, lista) => {
  const ulos = [...lista];
  for (let i = ulos.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ulos[i], ulos[j]] = [ulos[j], ulos[i]];
  }
  return ulos;
};

// --- 1. Roomalaiset numerot -------------------------------------------------
// Kolme esimerkkiriviä arvoineen opettaa järjestelmän: merkit lasketaan
// yhteen, mutta pienempi ennen suurempaa vähennetään. Neljäs ratkaistaan.

const ROMAANIT = [
  { rivit: ['VII', 'XXIV', 'LX'], arvot: [7, 24, 60], kysytty: 'XLII', oikea: 42, muut: [62, 52, 38] },
  { rivit: ['VI', 'XIX', 'XL'], arvot: [6, 19, 40], kysytty: 'XCIV', oikea: 94, muut: [114, 84, 96] },
  { rivit: ['IX', 'XXXI', 'LXX'], arvot: [9, 31, 70], kysytty: 'XXIX', oikea: 29, muut: [31, 21, 39] },
];

function arvoRoomalaiset(rng) {
  const v = euroPoimi(rng, ROMAANIT);
  const options = euroSekoita(rng, [v.oikea, ...v.muut]).map(String);
  return {
    sketch: { rivit: v.rivit, arvot: v.arvot, kysytty: v.kysytty },
    options,
    correct: options.indexOf(String(v.oikea)),
  };
}

const piirraRoomalaiset = (svg, data) => {
  const d = data ?? ROMAANIT[0];
  const rivit = d.rivit ?? ROMAANIT[0].rivit;
  const arvot = d.arvot ?? ROMAANIT[0].arvot;
  svg.setAttribute('viewBox', '0 0 260 150');
  euroText(130, 18, 'KIVEEN HAKATUT LUVUT', svg, 11);
  euroInk('M28,26 L232,26', svg);
  rivit.forEach((rivi, i) => {
    const y = 52 + i * 26;
    euroText(72, y, rivi, svg, 19);
    euroText(128, y, '=', svg, 14);
    euroText(172, y, String(arvot[i]), svg, 17);
  });
  euroInk('M28,124 L232,124', svg);
  const y = 143;
  euroText(72, y, d.kysytty ?? ROMAANIT[0].kysytty, svg, 19);
  euroText(128, y, '=', svg, 14);
  euroText(172, y, '?', svg, 19);
};

// --- 2. Pylväiden päät ------------------------------------------------------
// Kolme pylvästä nimilappuineen, neljäs kysymysmerkillä. Vastaus näkyy
// piirroksesta: sama pää kuin jollakin nimetyistä.

const PYLVAAT = ['doorilainen', 'joonialainen', 'korinttilainen'];

const piirraPaa = (x, y, tyyli, p) => {
  // Runko: uurrettu pylväs.
  euroFill(`M${x - 11},${y} L${x + 11},${y} L${x + 9},${y + 46} L${x - 9},${y + 46} Z`, p);
  for (const dx of [-5, 0, 5]) euroInk(`M${x + dx},${y + 4} L${x + dx},${y + 44}`, p);
  if (tyyli === 'doorilainen') {
    // Koruton laatta.
    euroFill(`M${x - 15},${y - 10} L${x + 15},${y - 10} L${x + 15},${y} L${x - 15},${y} Z`, p);
  } else if (tyyli === 'joonialainen') {
    // Kaksi kiehkuraa eli voluuttaa.
    euroInk(`M${x - 15},${y - 4} L${x + 15},${y - 4}`, p);
    euroInk(`M${x - 8},${y - 6} q-9,-2 -8,-7 q1,-5 6,-4 q4,1 3,4`, p);
    euroInk(`M${x + 8},${y - 6} q9,-2 8,-7 q-1,-5 -6,-4 q-4,1 -3,4`, p);
  } else {
    // Akantuksen lehdet.
    euroInk(`M${x - 14},${y - 2} L${x + 14},${y - 2}`, p);
    for (const dx of [-9, 0, 9]) {
      euroInk(`M${x + dx},${y - 3} q-4,-8 0,-14 q4,6 0,14`, p);
    }
  }
};

/*
 * VALOKUVAPULMA (omistajan tilaus 10.8.2026, sanasto
 * docs/mantereen-resepti.md): vastausvaihtoehdot ovat oikeita
 * valokuvia piirrosten sijaan. Isoisä piirsi luonnoksen yhdestä
 * pylväänpäästä; pelaaja etsii valokuvista sen, jossa on sama pää.
 * Kaikki kolme kuvaa ovat Ateenan omia pylväitä (Erekhtheionin pää
 * kuvattuna British Museumissa) — tarkistettu Commonsista ja
 * katsottu silmin, kulkevat peilin kautta kuten muutkin kuvat.
 */
const PYLVASKUVAT = [
  {
    tyyli: 'doorilainen',
    tiedosto: 'Parthenon (30276156187).jpg',
    nimi: 'Parthenonin pylväikkö',
    lahde: 'Phanatic (CC BY-SA 2.0)',
  },
  {
    tyyli: 'joonialainen',
    tiedosto: 'Ionic capital from the Erechtheum at the British Museum.jpg',
    nimi: 'Erekhtheionin pylväänpää',
    lahde: 'Yair Haklai (CC BY-SA 4.0)',
  },
  {
    tyyli: 'korinttilainen',
    tiedosto: 'A Corinthian capital (Temple of Olympian Zeus) on August 10, 2022.jpg',
    nimi: 'Olympieionin pylväs',
    lahde: 'George E. Koronaios (CC BY-SA 4.0)',
  },
  {
    /*
     * Neljäs vaihtoehto on harhautus kuten vanhan version
     * "roomalainen": karyatidi on Erekhtheionin pylväs, joka on
     * kokonainen naishahmo — se ei ole koskaan oikea vastaus, koska
     * luonnos näyttää aina yhden kolmesta pylväsjärjestelmästä.
     */
    tyyli: 'karyatidi',
    tiedosto: 'Caryatid - Flickr - George M. Groutas.jpg',
    nimi: 'Erekhtheionin karyatidi',
    lahde: 'George M. Groutas (CC BY 2.0)',
  },
];

function arvoPylvaat(rng) {
  const kysytty = euroPoimi(rng, PYLVAAT);
  const jarjestys = euroSekoita(rng, PYLVASKUVAT);
  return {
    sketch: { kysytty },
    options: jarjestys.map((k) => k.nimi),
    kuvat: jarjestys.map((k) => ({ tiedosto: k.tiedosto, selite: k.nimi })),
    correct: jarjestys.findIndex((k) => k.tyyli === kysytty),
  };
}

/*
 * Valokuvapulman luonnos: YKSI pylväänpää isona, ilman nimeä — pelaaja
 * vertaa piirrosta vaihtoehtojen valokuviin. Vanha neljän pylvään
 * nimilappuversio poistui, kun vaihtoehdot muuttuivat valokuviksi
 * (omistajan tilaus 10.8.2026).
 */
const piirraPylvaat = (svg, data) => {
  const kysytty = data?.kysytty ?? PYLVAAT[1];
  svg.setAttribute('viewBox', '0 0 200 120');
  euroText(100, 16, 'ISOISÄN LUONNOS', svg, 11);
  piirraPaa(100, 44, kysytty, svg);
  euroText(100, 112, 'Mikä valokuvista näyttää saman pään?', svg, 9);
};

// --- 3. Suola-altaat --------------------------------------------------------
// Neljä allasta, joissa lukee vedenpinta senttimetreinä. Piirroksessa
// kerrotaan haihtumisnopeus ja päivien määrä; valmis on se, jonka vesi
// on juuri haihtunut loppuun.

function arvoSuolaaltaat(rng) {
  const haihtuu = 2 + Math.floor(rng() * 2); // 2 tai 3 cm päivässä
  const paivia = 4 + Math.floor(rng() * 3);  // 4–6 päivää
  const oikea = haihtuu * paivia;
  const muut = [oikea + haihtuu, oikea - haihtuu, oikea + haihtuu * 2];
  const syvyydet = euroSekoita(rng, [oikea, ...muut]);
  const kirjaimet = ['A', 'B', 'C', 'D'];
  const options = kirjaimet.map((k, i) => `Allas ${k} (${syvyydet[i]} cm)`);
  return {
    sketch: { syvyydet, haihtuu, paivia, kirjaimet },
    options,
    correct: syvyydet.indexOf(oikea),
  };
}

const piirraSuolaaltaat = (svg, data) => {
  const d = data ?? { syvyydet: [8, 10, 12, 14], haihtuu: 2, paivia: 5, kirjaimet: ['A', 'B', 'C', 'D'] };
  svg.setAttribute('viewBox', '0 0 260 160');
  euroText(130, 16, 'SUOLA-ALTAAT — VEDEN SYVYYS', svg, 11);
  d.syvyydet.forEach((cm, i) => {
    const x = 26 + i * 58;
    // Allas: matala laatikko, jonka pohjalla vettä.
    euroInk(`M${x},44 L${x},96 L${x + 44},96 L${x + 44},44`, svg);
    euroFill(`M${x + 2},${96 - Math.min(48, cm * 3)} L${x + 42},${96 - Math.min(48, cm * 3)} L${x + 42},94 L${x + 2},94 Z`, svg);
    euroText(x + 22, 112, `${cm} cm`, svg, 12);
    euroText(x + 22, 36, d.kirjaimet[i], svg, 13);
  });
  euroInk('M14,124 L246,124', svg);
  euroText(130, 140, `Vettä haihtuu ${d.haihtuu} cm päivässä.`, svg, 11);
  euroText(130, 154, `Suola on valmista, kun allas on kuiva ${d.paivia} päivän kuluttua.`, svg, 11);
};

// --- 4. Geysirin kello ------------------------------------------------------
// Strokkur purkautuu tasaisin väliajoin. Kolme aikaa opettaa välin, neljäs
// ratkaistaan. Aritmeettinen jono minuuteissa — eri mekaniikka kuin muilla.

function lisaaMinuutit(hhmm, min) {
  const [h, m] = hhmm.split(':').map(Number);
  const kaikki = h * 60 + m + min;
  const hh = Math.floor(kaikki / 60) % 24;
  const mm = kaikki % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function arvoGeysir(rng) {
  const vali = 6 + Math.floor(rng() * 3); // 6–8 min
  const alkuH = 9 + Math.floor(rng() * 7); // klo 9–15
  const alkuM = Math.floor(rng() * 6) * 5; // tasaminuutti
  const alku = `${String(alkuH).padStart(2, '0')}:${String(alkuM).padStart(2, '0')}`;
  const ajat = [alku, lisaaMinuutit(alku, vali), lisaaMinuutit(alku, vali * 2)];
  const oikea = lisaaMinuutit(alku, vali * 3);
  const muut = [
    lisaaMinuutit(alku, vali * 3 - 1),
    lisaaMinuutit(alku, vali * 3 + 2),
    lisaaMinuutit(alku, vali * 4),
  ];
  const options = euroSekoita(rng, [oikea, ...muut]);
  return { sketch: { ajat }, options, correct: options.indexOf(oikea) };
}

const piirraGeysir = (svg, data) => {
  const ajat = data?.ajat ?? ['10:00', '10:07', '10:14'];
  svg.setAttribute('viewBox', '0 0 300 158');
  euroText(150, 16, 'GEYSIRIN PURKAUKSET', svg, 11);
  euroInk('M20,106 L280,106', svg);
  const xs = [56, 118, 180, 242];
  xs.forEach((x, i) => {
    if (i < 3) {
      // Vesipatsas ylös maasta.
      euroInk(`M${x},106 L${x - 7},74 L${x - 2},66 L${x},56 L${x + 3},68 L${x + 7},78 L${x},106`, svg);
      euroText(x, 124, ajat[i], svg, 13);
    } else {
      euroText(x, 82, '?', svg, 22);
      euroText(x, 124, '?', svg, 14);
    }
  });
  euroInk('M20,136 L280,136', svg);
  euroText(150, 151, 'Purkausten väli on aina sama.', svg, 11);
};

// --- 5. Vuoroveden laiturit -------------------------------------------------
// Acqua alta nostaa vettä; neljä kulkusiltaa eri korkeuksilla. Oikea on
// matalin silta, joka jää vielä veden yläpuolelle — vertailua, ei laskua.

function arvoLaiturit(rng) {
  const vesi = 70 + Math.floor(rng() * 6) * 5; // 70–95 cm
  const yli1 = vesi + 5 + Math.floor(rng() * 2) * 5;
  const yli2 = yli1 + 10 + Math.floor(rng() * 2) * 5;
  const ali1 = vesi - 5 - Math.floor(rng() * 2) * 5;
  const ali2 = ali1 - 10 - Math.floor(rng() * 2) * 5;
  const korkeudet = euroSekoita(rng, [yli1, yli2, ali1, ali2]);
  const options = korkeudet.map((cm) => `${cm} cm`);
  return { sketch: { korkeudet, vesi }, options, correct: korkeudet.indexOf(yli1) };
}

const piirraLaiturit = (svg, data) => {
  const d = data ?? { korkeudet: [80, 95, 110, 65], vesi: 90 };
  const pohja = 138;
  const y = (cm) => pohja - cm * 0.7;
  svg.setAttribute('viewBox', '0 0 300 168');
  euroText(150, 16, 'VUOROVESI JA KULKUSILLAT', svg, 11);
  const yv = y(d.vesi);
  euroFill(`M14,${yv.toFixed(1)} L286,${yv.toFixed(1)} L286,${pohja} L14,${pohja} Z`, svg);
  euroInk(`M14,${yv.toFixed(1)} L286,${yv.toFixed(1)}`, svg);
  const xs = [50, 118, 186, 254];
  d.korkeudet.forEach((cm, i) => {
    const x = xs[i];
    const yp = y(cm).toFixed(1);
    euroInk(`M${x - 16},${yp} L${x + 16},${yp}`, svg);
    euroInk(`M${x - 12},${yp} L${x - 12},${pohja}`, svg);
    euroInk(`M${x + 12},${yp} L${x + 12},${pohja}`, svg);
    euroText(x, y(cm) - 6, `${cm} cm`, svg, 11);
  });
  euroText(150, pohja + 16, `Vesi nousee ${d.vesi} cm.`, svg, 11);
};

// --- 6. Tuulikukko ----------------------------------------------------------
// Kirkontornin tuuliviirin kukko osoittaa yhteen ilmansuuntaan. Piirroksesta
// luetaan suunta — spatiaalinen, ei laskennallinen mekaniikka.

const SUUNNAT = [
  { avain: 'pohjoinen', kulma: -90 },
  { avain: 'koillinen', kulma: -45 },
  { avain: 'itä', kulma: 0 },
  { avain: 'kaakko', kulma: 45 },
  { avain: 'etelä', kulma: 90 },
  { avain: 'lounas', kulma: 135 },
  { avain: 'länsi', kulma: 180 },
  { avain: 'luode', kulma: -135 },
];

function arvoKukko(rng) {
  const oikea = euroPoimi(rng, SUUNNAT);
  const muut = euroSekoita(rng, SUUNNAT.filter((s) => s.avain !== oikea.avain)).slice(0, 3);
  const options = euroSekoita(rng, [oikea, ...muut]).map((s) => s.avain);
  return { sketch: { kulma: oikea.kulma }, options, correct: options.indexOf(oikea.avain) };
}

const piirraKukko = (svg, data) => {
  const kulma = data?.kulma ?? -45;
  const cx = 100;
  const cy = 106;
  svg.setAttribute('viewBox', '0 0 200 200');
  euroText(cx, 18, 'TUULIKUKKO', svg, 11);
  // Pääilmansuunnat kirjaimin.
  euroText(cx, cy - 72, 'P', svg, 13);
  euroText(cx + 80, cy + 4, 'I', svg, 13);
  euroText(cx, cy + 84, 'E', svg, 13);
  euroText(cx - 80, cy + 4, 'L', svg, 13);
  euroInk(`M${cx},${cy - 62} L${cx},${cy + 62}`, svg);
  euroInk(`M${cx - 62},${cy} L${cx + 62},${cy}`, svg);
  const rad = (kulma * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const P = (a, p) => `${(cx + ux * a - uy * p).toFixed(1)},${(cy + uy * a + ux * p).toFixed(1)}`;
  // Runko: lyhyt varsi, jonka päässä kukko. Pyrstö jää tahallaan pieneksi,
  // jottei se muistuta toista nuolenkärkeä — suunnan kertoo umpinainen nokka.
  euroInk(`M${P(-30, 0)} L${P(30, 0)}`, svg);
  // Vartalo pyöreänä möykkynä.
  euroFill(`M${P(30, 7)} L${P(6, 8)} L${P(-18, 5)} L${P(-18, -5)} L${P(6, -8)} L${P(30, -7)} Z`, svg);
  // Nokka: iso umpinainen kärki eteenpäin — tämä on suunnan osoitin.
  euroFill(`M${P(56, 0)} L${P(34, 9)} L${P(34, -9)} Z`, svg);
  // Harja kahtena piikkinä nokan takana yläpuolella.
  euroInk(`M${P(30, -7)} L${P(35, -14)} M${P(22, -8)} L${P(26, -15)}`, svg);
  // Pyrstö: kaksi lyhyttä sulkaa taakse, selvästi nokkaa pienempi.
  euroInk(`M${P(-18, -3)} L${P(-32, -10)}`, svg);
  euroInk(`M${P(-18, 3)} L${P(-32, 10)}`, svg);
};

export const EUROPE_GENERATORS = {
  roomalaiset: arvoRoomalaiset,
  pylvaat: arvoPylvaat,
  suolaaltaat: arvoSuolaaltaat,
  geysir: arvoGeysir,
  laiturit: arvoLaiturit,
  kukko: arvoKukko,
};

const EUROPE_SKETCHES = {
  roomalaiset: piirraRoomalaiset,
  pylvaat: piirraPylvaat,
  suolaaltaat: piirraSuolaaltaat,
  geysir: piirraGeysir,
  laiturit: piirraLaiturit,
  kukko: piirraKukko,
};

/** Euroopan pulmat. Sama muoto kuin AFRICA_PUZZLES. */
export const EUROPE_PUZZLES = [
  {
    id: 'roomalaiset',
    generate: EUROPE_GENERATORS.roomalaiset,
    city: 'rooma',
    title: 'Kiveen hakatut luvut',
    selite: 'Piirroksessa: neljä kiveen hakattua lukua. Kolmen ensimmäisen arvo lukee vieressä; neljäs on ratkaistava.',
    hint: 'Merkit lasketaan yhteen vasemmalta oikealle — paitsi kun pienempi merkki on suuremman edessä, jolloin se vähennetään.',
    q: 'Forumin kivissä on lukuja kaikkialla. Opas luki kolme niistä ääneen ja jätti neljännen minun ratkaistavakseni.',
    fact: 'Roomalaisissa numeroissa I on 1, V on 5, X on 10, L on 50, C on 100. Merkit lasketaan yhteen, mutta pienempi suuremman edessä vähennetään: IV on 4 ja XL on 40. Järjestelmässä ei ole nollaa lainkaan, mikä teki laskemisesta työlästä — siksi roomalaiset käyttivät laskemiseen helmitaulua. Nykyiset numeromme tulivat Eurooppaan vasta keskiajalla arabien välityksellä Intiasta.',
    source: 'Roomalaiset numerot',
  },
  {
    id: 'pylvaat',
    generate: EUROPE_GENERATORS.pylvaat,
    city: 'ateena',
    title: 'Pylväiden päät',
    selite: 'Piirroksessa: isoisän luonnos yhdestä pylväänpäästä. Vaihtoehdot ovat oikeita valokuvia — valitse se, jossa on samanlainen pää.',
    hint: 'Katso pään muotoa: koruton laatta, kaksi kiehkuraa vai kokonainen lehtikimppu? Etsi sama muoto valokuvista.',
    q: 'Piirsin luonnoskirjaani yhden pylväänpään, mutta unohdin kirjoittaa mistä temppelistä se oli. Etsi valokuvista pylväs, jolla on samanlainen pää.',
    kuvaLahteet: 'Valokuvat: Phanatic (CC BY-SA 2.0), Yair Haklai (CC BY-SA 4.0), George E. Koronaios (CC BY-SA 4.0) ja George M. Groutas (CC BY 2.0), Wikimedia Commons.',
    fact: 'Kreikkalaisia pylväitä on kolmea päätyyliä. Doorilainen on koruton ja jykevä — sellaisia ovat Parthenonin pylväät. Joonialaisessa on kaksi kiehkuraa eli voluuttaa, ja korinttilaisessa akantuksen lehtiä. Roomalaiset lainasivat kaikki kolme ja pitivät korinttilaisesta eniten, koska se oli komein.',
    source: 'Antiikin arkkitehtuurin pylväsjärjestelmät',
  },
  {
    id: 'suolaaltaat',
    generate: EUROPE_GENERATORS.suolaaltaat,
    city: 'dubrovnik',
    title: 'Stonin suola-altaat',
    selite: 'Piirroksessa: neljä allasta, joissa lukee veden syvyys senttimetreinä. Alla lukee, montako senttiä haihtuu päivässä ja monenko päivän kuluttua suolan pitää olla valmis.',
    hint: 'Kerro haihtuminen päivien määrällä. Se allas on oikea, jonka vesi loppuu juuri silloin.',
    q: 'Suolamestari näytti neljä allasta ja sanoi, että vain yksi on juuri oikeassa syvyydessä tämän viikon satoon. Muut ovat liian täynnä tai jo liian tyhjiä.',
    fact: 'Stonissa on kerätty suolaa 1300-luvulta asti samalla tavalla: merivesi johdetaan matalille kentille ja aurinko haihduttaa sen. Suola oli Dubrovnikin tasavallan tärkein tulonlähde — niin tärkeä, että sitä suojaamaan rakennettiin viiden kilometrin muuri, Euroopan pisin linnoitusmuuri Kiinan muurin jälkeen.',
    source: 'Stonin suola-altaat',
  },
  {
    id: 'geysir',
    generate: EUROPE_GENERATORS.geysir,
    city: 'islanti',
    title: 'Geysirin kello',
    selite: 'Piirroksessa: neljä purkausta kellonaikoineen. Kolmen aika lukee alla; neljäs on ratkaistava.',
    hint: 'Laske, montako minuuttia on kahden purkauksen välissä. Sama väli toistuu joka kerta.',
    q: 'Strokkur syöksee kuumaa vettä ilmaan tasaisin väliajoin. Merkitsin kolme purkausaikaa muistiin. Milloin se purkautuu seuraavan kerran?',
    fact: 'Strokkur on kuuma lähde Islannin Haukadalurin laaksossa. Se purkautuu 6–10 minuutin välein ja sinkoaa kiehuvaa vettä 15–20 metriä ilmaan. Nimi geysir tulee viereisestä Geysir-lähteestä, ja siitä on tullut koko ilmiön kansainvälinen nimi — englannin geyser. Islannin maanalainen lämpö nousee pintaan, koska saari istuu kahden mannerlaatan saumakohdassa.',
    source: 'Strokkur',
  },
  {
    id: 'laiturit',
    generate: EUROPE_GENERATORS.laiturit,
    city: 'venetsia',
    title: 'Vuoroveden laiturit',
    selite: 'Piirroksessa: vedenpinta ja neljä kulkusiltaa eri korkeuksilla senttimetreinä. Oikea on matalin silta, joka jää vielä veden yläpuolelle.',
    hint: 'Sillat, joiden luku on veden lukua pienempi, jäävät veden alle. Ota jäljelle jäävistä matalin.',
    q: 'Venetsiassa on acqua alta, tulva. Kaupunki nostaa kaduille puiset kulkusillat. Mikä silloista on matalin, joka pysyy juuri ja juuri kuivana?',
    fact: 'Venetsia rakennettiin laguunin liejumatalikoille miljoonien puupaalujen varaan. Syksyisin ja talvisin korkea vuorovesi ja etelätuuli nostavat meren kaupungin kaduille — sitä sanotaan nimellä acqua alta. Matalin kohta on Pyhän Markuksen aukio, joka tulvii ensimmäisenä. Vuodesta 2020 kaupunkia suojaavat MOSE-tulvapadot, jotka nousevat laguunin suulla merenpohjasta pystyyn.',
    source: 'Acqua alta',
  },
  {
    id: 'kukko',
    generate: EUROPE_GENERATORS.kukko,
    city: 'pariisi',
    title: 'Tuulikukko',
    selite: 'Piirroksessa: kirkontornin tuulikukko ja pääilmansuunnat (P pohjoinen, I itä, E etelä, L länsi). Oikea on suunta, johon kukon nokka osoittaa.',
    hint: 'Katso, minkä kirjaimen suuntaan nokka osoittaa. Kahden kirjaimen välissä ovat koillinen, kaakko, lounas ja luode.',
    q: 'Kirkontornin huipulla on kukko, joka kääntyy tuulessa. Nyt se on pysähtynyt paikoilleen. Mihin ilmansuuntaan sen nokka osoittaa?',
    fact: 'Kukko on Ranskan vanha tunnus. Latinan sana gallus tarkoittaa sekä kukkoa että gallialaista, ja siksi juuri kukko nostettiin monen ranskalaisen kirkon torninhuippuun tuuliviiriksi. Viiri kääntyy tuulen mukana, ja sen alla olevat neljä kirjainta ovat pääilmansuunnat. Ranskan urheilujoukkueitakin kutsutaan yhä kukoiksi.',
    source: 'Galliankukko',
  },
];

/** Piirtää Euroopan pulman luonnoksen annettuun SVG-elementtiin. */
export function piirraEuroopanPulma(svg, id, data) {
  EUROPE_SKETCHES[id]?.(svg, data);
}

/** Onko pulmalle olemassa piirros? Testit vartioivat tätä. */
export function onEuroopanPulma(id) {
  return typeof EUROPE_SKETCHES[id] === 'function';
}
