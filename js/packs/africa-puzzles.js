// Isoisän luonnoskirjan pulmat (Afrikka).
//
// Pulma on päättelytehtävä tietovisan rinnalla: kortissa on piirros, isoisän
// käsin kirjoittama rivi ja neljä vaihtoehtoa. Pulma aukeaa kerran pelissä,
// kun kaupunkiin saavutaan ensimmäistä kertaa, eikä se koskaan estä
// etenemistä — väärästä vastauksesta ei rangaista, oikea ratkaisu näytetään.
//
// Piirrokset tehdään koodina: inline-SVG samalla mustetyylillä kuin kartan
// koristeet. EI ulkoisia kuvia eikä verkkohakuja, jotta standalone-versio ja
// offline toimivat.
//
// Tärkeintä: pulma on ratkaistavissa pelkästä piirroksesta. Hieroglyfipulmassa
// järjestelmä päätellään annetuista esimerkeistä, ei ennakkotiedosta.

import { el } from '../mapart.js';

const ink = (d, parent) => el('path', { d, class: 'ink' }, parent);
const fill = (d, parent) => el('path', { d, class: 'ink-fill' }, parent);
const text = (x, y, s, parent, size = 13) => {
  const t = el('text', { x, y, class: 'ink-text', 'font-size': size }, parent);
  t.textContent = s;
  return t;
};

// --- hieroglyfimerkit -------------------------------------------------------
// Sauva = 1, kaari (karjan jalkaköysi) = 10, köysikiehkura = 100. Arvoja ei
// kerrota pelaajalle: järjestelmä päätellään kolmesta esimerkkirivistä.

/** Pystysauva. */
const sauva = (x, y, p) => ink(`M${x},${y - 8} L${x},${y + 8}`, p);

/** Kaari: ylösalaisin oleva U. */
const kaari = (x, y, p) => ink(`M${x - 6},${y + 8} L${x - 6},${y - 2} q6,-9 12,0 L${x + 6},${y + 8}`, p);

/** Köysikiehkura: kaksikierroksinen spiraali. */
const kiehkura = (x, y, p) =>
  ink(`M${x + 7},${y + 5} q-13,3 -12,-6 q1,-8 9,-7 q7,1 6,7 q-1,5 -6,4 q-4,-1 -3,-4`, p);


/** Hieroglyfirivin [sadat, kymmenet, ykköset] lukuarvona. */
export function arvoksi([sadat, kymmenet, ykkoset]) {
  return sadat * 100 + kymmenet * 10 + ykkoset;
}

/**
 * Kuunvaihe: pimeä osa varjostetaan ohuilla viivoilla, valaistu jää tyhjäksi.
 * `valaistu` on 0…1 ja kasvaa oikeasta reunasta, kuten pohjoisella
 * pallonpuoliskolla. Erillinen funktio, koska sitä tarvitaan sekä sarjassa
 * että vastausvaihtoehdoissa.
 */
export function piirraKuu(parent, cx, cy, valaistu, { peilaa = false, r = 20 } = {}) {
  // Vähenevä kuu on kasvavan peilikuva. Peilaus tehdään muunnoksella eikä
  // negatiivisella valaistusarvolla: negatiivinen luku rikkoisi kaaren
  // parametrit ja kuu piirtyisi kokonaan pimeänä.
  const g = peilaa
    ? el('g', { transform: `translate(${2 * cx},0) scale(-1,1)` }, parent)
    : parent;
  el('circle', { cx, cy, r, class: 'ink' }, g);
  if (valaistu >= 1) return;

  const id = `kuu-${cx}-${cy}-${Math.round(valaistu * 100)}-${peilaa ? 'p' : 'n'}`;
  const clip = el('clipPath', { id }, g);
  if (valaistu <= 0) {
    // Uusikuu: koko kiekko pimeä.
    el('circle', { cx, cy, r }, clip);
  } else {
    // Terminaattori on ellipsi, jonka leveys kertoo vaiheen. Pimeä osa on
    // vasemmalla, joten valaistu reuna kasvaa oikealta.
    const leveys = Math.abs(r * (1 - 2 * valaistu));
    const kaari = valaistu < 0.5 ? 0 : 1;
    el('path', {
      d: `M${cx},${cy - r} a${r},${r} 0 0,0 0,${2 * r} `
        + `a${leveys},${r} 0 0,${kaari} 0,${-2 * r} z`,
    }, clip);
  }
  const varjo = el('g', { 'clip-path': `url(#${id})` }, g);
  for (let y = cy - r; y <= cy + r; y += 4) {
    ink(`M${cx - r},${y} L${cx + r},${y}`, varjo);
  }
}

// --- piirrokset -------------------------------------------------------------

const SKETCHES = {
  /**
   * Kairo: neljä lukua allekkain. Kolme ensimmäistä opettavat järjestelmän
   * arvoineen, neljäs kysyy. Merkit suurimmasta pienimpään vasemmalta
   * oikealle, jotta rivit ovat keskenään vertailukelpoisia.
   */
  hieroglyfit: (svg, data = {}) => {
    // Rivit tulevat pulmadatasta: [sadat, kymmenet, ykköset] ja arvo.
    const {
      esimerkit = [[0, 0, 3], [0, 2, 3], [1, 3, 1]],
      kysytty = [2, 1, 3],
    } = data;
    const g = el('g', {}, svg);
    /** Yksi rivi: merkkiryhmä vasemmalle, arvo oikealle. */
    const rivi = (y, [sadat, kymmenet, ykkoset], arvo) => {
      let x = 30;
      for (const [piirra, kpl] of [[kiehkura, sadat], [kaari, kymmenet], [sauva, ykkoset]]) {
        for (let i = 0; i < kpl; i++) {
          piirra(x, y, g);
          x += 16;
        }
        if (kpl) x += 8; // väli merkkilajien välissä
      }
      text(258, y + 5, arvo, g, 15);
    };
    esimerkit.forEach((r, i) => rivi(22 + i * 34, r, String(arvoksi(r))));
    ink('M24,108 L286,108', g);
    rivi(132, kysytty, '?');
  },

  /**
   * Kumasi: kaksivartinen vaaka tavoitetilassa eli tasan vaakasuorassa.
   * Luvut tulevat pulmadatasta, jottei piirros ja vaihtoehdot voi eriytyä.
   */
  punnukset: (svg, data = {}) => {
    const { kulta = 10, vasen = 2, oikea = [5, 4] } = data;
    const g = el('g', { transform: 'translate(160,20)' }, svg);
    // Tolppa, jalka ja vaakasuora varsi.
    ink('M0,96 L0,10 M-78,10 L78,10', g);
    fill('M-14,104 L14,104 L8,96 L-8,96 z', g);
    // Narut ja matalat vadit.
    ink('M-78,10 L-78,30 M78,10 L78,30', g);
    // Oikea vati on leveämpi: siihen mahtuu kolme punnusta lukuineen.
    ink('M-104,30 q26,20 52,0 M40,30 q38,22 76,0', g);

    // Vasen vati: nyöritetty kultahiekkapussi ja yksi punnus.
    fill('M-96,30 q-6,-16 7,-20 q10,-4 14,6 q4,11 -4,14 z', g);
    ink('M-90,12 L-82,12', g);
    text(-86, 52, String(kulta), g, 12);
    el('rect', { x: -68, y: 14, width: 16, height: 16, class: 'ink' }, g);
    text(-60, 27, String(vasen), g, 12);

    // Oikea vati: kaksi tunnettua punnusta ja katkoviivalla kysytty.
    // Luvut kirjoitetaan punnusten ALLE, koska kaksinumeroinen arvo ei mahdu
    // pienen kolmion tai vinoneliön sisään.
    ink('M44,26 L62,26 L53,8 z', g);
    text(53, 46, String(oikea[0]), g, 12);
    ink('M70,17 L79,6 L88,17 L79,28 z', g);
    text(79, 46, String(oikea[1]), g, 12);
    el('rect', {
      x: 96, y: 8, width: 18, height: 18, class: 'ink', 'stroke-dasharray': '3 3',
    }, g);
    text(105, 46, '?', g, 13);
  },

  /**
   * Kapkaupunki: kolme suun poikkileikkausta samalla kaavalla. Piste kertoo
   * kosketuskohdan ja nuoli ilman purkaussuunnan. Kaikki kolme merkkiä
   * näkyvät — kysymys on, millä niistä sana isiXhosa alkaa.
   */
  naksutus: (svg, data = {}) => {
    const suu = (x, merkki, kohta) => {
      const g = el('g', { transform: `translate(${x},14)` }, svg);
      // Kitalaki ja leuka; katse vasemmalle.
      ink('M-30,6 q30,-12 58,2', g);
      ink('M-30,52 q30,12 58,-4', g);
      // Ylähampaat edessä, poskihampaat takana.
      ink('M-26,6 L-26,15 M-20,7 L-20,16', g);
      ink('M8,3 L8,12 M16,4 L16,13', g);
      // Kieli.
      fill('M-20,40 q20,-12 40,-6 q-16,12 -40,6 z', g);

      // 0 = etuhampaat, 1 = poskihampaat sivulle, 2 = hammasvalli alas.
      if (kohta === 0) {
        el('circle', { cx: -24, cy: 14, r: 2.6, class: 'ink-fill' }, g);
        ink('M-30,22 L-46,22', g);
        fill('M-46,22 l7,-3 l0,6 z', g);
      } else if (kohta === 1) {
        el('circle', { cx: 10, cy: 14, r: 2.6, class: 'ink-fill' }, g);
        ink('M10,14 q10,-10 22,-14', g);
        fill('M32,0 l-7,1 l3,5 z', g);
      } else {
        el('circle', { cx: -6, cy: 12, r: 2.6, class: 'ink-fill' }, g);
        ink('M-6,16 L-6,34', g);
        fill('M-6,34 l-3,-7 l6,0 z', g);
      }
      text(0, 74, merkki, g, 17);
    };
    // Suuprofiilien järjestys vaihtelee varianteittain, jotta sama kuva ei
    // toistu joka pelikerralla samassa asennossa.
    const merkit = [['c', 0], ['x', 1], ['q', 2]];
    (data.jarjestys ?? [0, 1, 2]).forEach((idx, i) => {
      const [merkki, kohta] = merkit[idx];
      suu(56 + i * 104, merkki, kohta);
    });
  },

  /**
   * Timbuktu: käsikirjoitussivu ja kuunvaiheiden sarja. Pimeä osa on
   * varjostettu, valaistu jätetty tyhjäksi. Valaistu reuna kasvaa oikealta,
   * kuten pohjoisella pallonpuoliskolla.
   */
  kuunvaiheet: (svg, data = {}) => {
    // Sarja tulee datasta: kolme vaihetta valaistusosuuksina 0…1.
    const { sarja = [{ v: 0 }, { v: 0.18 }, { v: 0.5 }] } = data;
    const g = el('g', {}, svg);
    // Kaksoisviivakehys.
    ink('M10,6 L310,6 L310,144 L10,144 z', g);
    ink('M15,11 L305,11 L305,139 L15,139 z', g);
    // Käsinkirjoitetut rivit oikealta vasemmalle, alin lyhyempi.
    ink('M120,26 q30,4 60,0 q40,-4 100,0', g);
    ink('M120,36 q30,4 60,0 q40,-4 100,0', g);
    ink('M186,46 q24,4 48,0 q30,-4 46,0', g);
    // Nelisakaraiset tähdet yläkulmissa.
    for (const [sx, sy] of [[32, 26], [288, 26]]) {
      ink(`M${sx},${sy - 6} L${sx},${sy + 6} M${sx - 6},${sy} L${sx + 6},${sy}`, g);
    }
    sarja.forEach((k, i) => piirraKuu(g, 70 + i * 60, 92, k.v, { peilaa: k.peilaa }));
    // Neljäs: tyhjä kehä ja kysymysmerkki.
    el('circle', { cx: 70 + sarja.length * 60, cy: 92, r: 20, class: 'ink' }, g);
    text(70 + sarja.length * 60, 99, '?', g, 20);
    ink('M50,124 L270,124', g);
  },

  /**
   * Sahara: kaksi nahkaleiliä, 3 ja 5 mittaa. EI asteikkoa eikä poikkiviivoja
   * kyljissä — koko pulman idea on, ettei leileistä voi lukea välimittoja.
   */
  vesileilit: (svg, data = {}) => {
    const { tavoite = 4 } = data;
    /** Leili: pussimainen vartalo, kapea kaula ja kantolenkit. */
    const leili = (x, y, koko, merkki) => {
      const g = el('g', { transform: `translate(${x},${y}) scale(${koko})` }, svg);
      ink('M0,-26 q-30,6 -30,30 q0,26 30,26 q30,0 30,-26 q0,-24 -30,-30 z', g);
      // Kaula ja nyöri suulla.
      ink('M-7,-27 L-7,-40 q7,-4 14,0 L7,-27', g);
      ink('M-9,-38 q9,5 18,0', g);
      // Kantolenkit kyljissä.
      ink('M-30,0 q-7,4 0,8 M30,0 q7,4 0,8', g);
      text(0, 12, merkki, g, 22);
    };
    leili(78, 62, 0.78, '3');
    leili(226, 56, 1, '5');
    // Tavoite ympyröitynä leilien alle.
    el('circle', { cx: 160, cy: 132, r: 14, class: 'ink' }, svg);
    text(160, 139, String(tavoite), svg, 17);
  },
};



// --- arvonta ----------------------------------------------------------------
//
// Sama pulma on joka pelikerralla vähän erilainen. Arvonta tapahtuu vain
// avaushetkellä pelin omalla rng:llä (js/game.js openPuzzle), joten
// tallennettu peli jatkuu samasta pulmasta. `fact` ei koskaan vaihdu: se on
// tarkistettu fakta.

/** Kokonaisluku väliltä [min, max]. */
const arvoLuku = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));

/** Poimii yhden alkion listasta. */
const poimi = (rng, lista) => lista[Math.floor(rng() * lista.length)];

/** Sekoittaa listan kopion. */
function sekoita(rng, lista) {
  const t = [...lista];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

/**
 * Hieroglyfit: arvotaan kolme esimerkkiä ja kysytty luku. Numerot pysyvät
 * välillä 0–3, jotta glyfirivit ovat lyhyitä ja piirrettäviä. Väärät
 * vaihtoehdot ovat uskottavia lukuvirheitä — numeroiden permutaatioita ja
 * ±10/±100 — eivät satunnaislukuja.
 */
function arvoHieroglyfit(rng) {
  const numerot = () => [arvoLuku(rng, 0, 3), arvoLuku(rng, 0, 3), arvoLuku(rng, 0, 3)];
  /** Kelpo rivi: ei pelkkiä nollia. */
  const rivi = () => {
    let r = numerot();
    while (arvoksi(r) === 0) r = numerot();
    return r;
  };

  const esimerkit = [];
  // Ensimmäinen esimerkki pidetään pienenä, jotta järjestelmä on helppo
  // lukea; kaksi seuraavaa saavat olla mitä tahansa.
  esimerkit.push([0, 0, arvoLuku(rng, 2, 3)]);
  while (esimerkit.length < 3) {
    const r = rivi();
    if (!esimerkit.some((e) => arvoksi(e) === arvoksi(r))) esimerkit.push(r);
  }
  // Kysytty luku on kolminumeroinen, jotta kaikkia kolmea merkkiä tarvitaan,
  // eikä se saa olla sama kuin mikään esimerkki.
  let kysytty = [arvoLuku(rng, 1, 3), arvoLuku(rng, 1, 3), arvoLuku(rng, 1, 3)];
  while (esimerkit.some((e) => arvoksi(e) === arvoksi(kysytty))) {
    kysytty = [arvoLuku(rng, 1, 3), arvoLuku(rng, 1, 3), arvoLuku(rng, 1, 3)];
  }

  const oikea = arvoksi(kysytty);
  const [a, b, c] = kysytty;
  // Uskottavat lukuvirheet: numerot väärässä järjestyksessä tai yksi
  // merkkilaji laskettu väärin.
  const ehdokkaat = [
    arvoksi([c, b, a]), arvoksi([b, a, c]), arvoksi([a, c, b]),
    oikea + 10, oikea - 10, oikea + 100, oikea - 100,
  ];
  const vaarat = [];
  for (const v of ehdokkaat) {
    if (v !== oikea && v > 0 && !vaarat.includes(v)) vaarat.push(v);
  }
  const options = sekoita(rng, [oikea, ...vaarat.slice(0, 3)]).map(String);
  return {
    sketch: { esimerkit, kysytty },
    options,
    correct: options.indexOf(String(oikea)),
  };
}

/**
 * Kultapunnukset: arvotaan pussin paino ja punnukset niin, että täsmälleen
 * yksi tarjolla oleva punnus tasapainottaa vaa'an. Arvot ovat akanien
 * punnussarjojen tapaan pieniä kokonaislukuja.
 */
function arvoPunnukset(rng) {
  const SARJA = [1, 2, 3, 4, 5, 6, 8, 10, 12];
  const kulta = poimi(rng, [8, 10, 12, 14, 16]);
  const vasen = poimi(rng, [1, 2, 3, 4]);
  const yhteensa = kulta + vasen;

  // Kaksi tunnettua punnusta oikealle niin, että puuttuva on kelvollinen.
  let oikea; let puuttuva;
  do {
    oikea = sekoita(rng, SARJA).slice(0, 2);
    puuttuva = yhteensa - oikea[0] - oikea[1];
  } while (!SARJA.includes(puuttuva));

  // Väärät vaihtoehdot ovat lähellä oikeaa — ei satunnaislukuja.
  const vaarat = [];
  for (const d of sekoita(rng, [1, -1, 2, -2, 3, -3])) {
    const v = puuttuva + d;
    if (v > 0 && v !== puuttuva && !vaarat.includes(v)) vaarat.push(v);
    if (vaarat.length === 3) break;
  }
  const options = sekoita(rng, [puuttuva, ...vaarat]).map(String);
  return {
    sketch: { kulta, vasen, oikea },
    options,
    correct: options.indexOf(String(puuttuva)),
  };
}

// Kuun kahdeksan vaihetta järjestyksessä: nimi, valaistu osuus 0…1 ja tieto
// siitä, kummalla puolella valaistu reuna on. Kasvavassa kuussa valo on
// oikealla, vähenevässä vasemmalla (pohjoinen pallonpuolisko).
const KUUT = [
  { nimi: 'uusikuu', v: 0, peilaa: false },
  { nimi: 'kasvava sirppi', v: 0.18, peilaa: false },
  { nimi: 'ensimmäinen neljännes', v: 0.5, peilaa: false },
  { nimi: 'kasvava kupera kuu', v: 0.82, peilaa: false },
  { nimi: 'täysikuu', v: 1, peilaa: false },
  { nimi: 'vähenevä kupera kuu', v: 0.82, peilaa: true },
  { nimi: 'viimeinen neljännes', v: 0.5, peilaa: true },
  { nimi: 'vähenevä sirppi', v: 0.18, peilaa: true },
];

/**
 * Kuunvaiheet: arvotaan kohta kierrosta, josta sarja alkaa. Sarja etenee
 * AINA eteenpäin — kuu ei kulje takaperin, ja taaksepäin luettu sarja antaisi
 * vähenevälle kuulle "kasvava"-nimet. Aloituskohta ratkaisee, osuuko sarja
 * kasvavaan vai vähenevään puoliskoon.
 */
function arvoKuunvaiheet(rng) {
  const alku = arvoLuku(rng, 0, 7);
  const indeksi = (i) => (alku + i) % 8;

  const sarja = [0, 1, 2].map((i) => KUUT[indeksi(i)]);
  const vastaus = KUUT[indeksi(3)];
  // Väärät vaihtoehdot ovat saman kierron muita vaiheita: uskottavia, koska
  // ne kuuluvat samaan sarjaan, mutta väärässä kohdassa.
  const vaarat = [];
  for (const i of [2, 4, 5, 1, 6]) {
    const ehdokas = KUUT[indeksi(i)];
    if (ehdokas.nimi !== vastaus.nimi && !vaarat.includes(ehdokas.nimi)) {
      vaarat.push(ehdokas.nimi);
    }
    if (vaarat.length === 3) break;
  }
  const options = sekoita(rng, [vastaus.nimi, ...vaarat]);
  return {
    sketch: { sarja: sarja.map((k) => ({ v: k.v, peilaa: k.peilaa })) },
    options,
    correct: options.indexOf(vastaus.nimi),
  };
}

/**
 * Naksutusmerkit: kolme käsin kirjoitettua varianttia. Kysytään vuoroin c, x
 * tai q, ja suuprofiilien järjestys vaihtelee. Sanat ja artikulaatiokuvaukset
 * on kirjoitettu käsin, koska ne ovat kielitiedettä eivätkä arvattavia.
 */
const NAKSUTUSVARIANTIT = [
  {
    q: 'Piirsin muistiin kolme kohtaa, joista kieli irtoaa naksahtaen; jokaisella on oma kirjaimensa. Kansan kielen nimi on isiXhosa, ja sen keskellä kuuluu naksaus — kirjainpari Xh. Mikä näistä se on?',
    vastaus: 'x — kielen sivu poskihampailta',
    muut: [
      'c — kielen kärki etuhampailta',
      'q — kielen kärki hammasvallilta',
      'c — kielen sivu poskihampailta',
    ],
    jarjestys: [0, 1, 2],
    hint: 'Nimi on kirjoitettu kysymykseen: isiXhosa. Mikä naksauskirjain sen keskeltä löytyy?',
  },
  {
    q: 'Kolme naksausta, kolme kirjainta. Sana cela — pyytää — alkaa kevyimmällä niistä, samalla jolla englantilainen paheksuu. Mikä se on?',
    vastaus: 'c — kielen kärki ylähampaiden takaa',
    muut: [
      'x — kielen sivu poskihampailta',
      'q — kielen kärki hammasvallilta',
      'c — kielen kärki hammasvallilta',
    ],
    jarjestys: [2, 0, 1],
    hint: 'Sana cela alkaa c:llä — ja paheksuva "ts, ts" syntyy kielen kärjellä ylähampaiden takana.',
  },
  {
    q: 'Kolmas naksaus on syvin: kieli irtoaa kitalaen etuosasta ja poksahtaa kuin korkki pullosta. Sana qala — aloittaa — alkaa sillä. Mikä kirjain?',
    vastaus: 'q — kielen kärki hammasvallilta',
    muut: [
      'c — kielen kärki etuhampailta',
      'x — kielen sivu poskihampailta',
      'q — kielen sivu poskihampailta',
    ],
    jarjestys: [1, 2, 0],
    hint: 'Sana qala alkaa q:lla — korkin poksahdus syntyy kielen kärjellä hammasvallilta.',
  },
];

function arvoNaksutus(rng) {
  const v = poimi(rng, NAKSUTUSVARIANTIT);
  const options = sekoita(rng, [v.vastaus, ...v.muut]);
  return {
    sketch: { jarjestys: v.jarjestys },
    q: v.q,
    options,
    correct: options.indexOf(v.vastaus),
    hint: v.hint,
  };
}

/**
 * Vesileilit: valmiiksi kirjoitetut tavoitteet toimintosarjoineen. Sarjat on
 * tarkistettu käsin simuloimalla — koneella generoitu toimintosarja tuottaisi
 * kömpelöä kieltä, ja testi tarkistaa jokaisen sarjan lopputuloksen.
 */
const LEILIVARIANTIT = [
  {
    tavoite: 4,
    hint: 'Kun täydestä viitosesta kaadetaan kolmonen täyteen, viitoseen jää kaksi mittaa. Mieti, mihin ne kaksi saadaan talteen.',
    q: 'Leilejä on kaksi, toiseen menee kolme mittaa ja toiseen viisi, eikä kummankaan kyljessä ole yhtään viivaa. Oppaani tarvitsee tasan neljä ennen kuin lähdemme.',
    vastaus: 'Täytä 5, kaada 3 täyteen, tyhjennä 3, kaada loput 3:een, täytä 5, kaada 3 täyteen',
    muut: [
      'Täytä 3, kaada 5:een, täytä 3, kaada 5 täyteen, tyhjennä 5, kaada loput viitoseen',
      'Täytä 5, kaada 3 täyteen, tyhjennä 5, kaada 3 viitoseen',
      'Täytä 5, kaada 3 täyteen, tyhjennä 3, kaada loput 3:een, täytä 3',
    ],
  },
  {
    tavoite: 2,
    hint: 'Paljonko viitoseen jää, kun siitä kaadetaan kolmonen täyteen?',
    q: 'Kolmen ja viiden mitan leilit, ei yhtään viivaa kyljessä. Tällä kertaa oppaani tahtoo tasan kaksi mittaa.',
    vastaus: 'Täytä 5, kaada 3 täyteen',
    muut: [
      'Täytä 3, kaada 5:een, täytä 3',
      'Täytä 5, kaada 3 täyteen, kaada 5 pois',
      'Täytä 3, kaada 5:een',
    ],
  },
  {
    tavoite: 1,
    hint: 'Täytä kolmonen kahdesti ja kaada molemmat viitoseen — toisella kerralla kaikki ei enää mahdu.',
    q: 'Samat kaksi leiliä, kolme ja viisi mittaa. Nyt tarvitaan tasan yksi mitta — sen verran vettä menee teekannuun.',
    vastaus: 'Täytä 3, kaada 5:een, täytä 3, kaada 5 täyteen',
    muut: [
      'Täytä 5, kaada 3 täyteen, tyhjennä 3',
      'Täytä 3, kaada 5:een, tyhjennä 5',
      'Täytä 5, kaada 3 täyteen, kaada 5 pois',
    ],
  },
];

function arvoVesileilit(rng) {
  const v = poimi(rng, LEILIVARIANTIT);
  const options = sekoita(rng, [v.vastaus, ...v.muut]);
  return {
    sketch: { tavoite: v.tavoite },
    q: v.q,
    options,
    correct: options.indexOf(v.vastaus),
    hint: v.hint,
  };
}

export const GENERATORS = {
  hieroglyfit: arvoHieroglyfit,
  punnukset: arvoPunnukset,
  kuunvaiheet: arvoKuunvaiheet,
  naksutus: arvoNaksutus,
  vesileilit: arvoVesileilit,
};

/**
 * Afrikan viisi pulmaa. `sketch` välitetään piirrokselle, jotta piirroksen
 * luvut tulevat samasta paikasta kuin vastausvaihtoehdot.
 */
export const AFRICA_PUZZLES = [
  {
    id: 'hieroglyfit',
    generate: GENERATORS.hieroglyfit,
    city: 'kairo',
    title: 'Hieroglyfien luvut',
    selite: 'Piirroksessa: seinän lukumerkit — sauva, kaari ja köysikiehkura. Kolmen ensimmäisen rivin arvo lukee vieressä; neljäs on ratkaistava.',
    hint: 'Sauva on yksi, kaari kymmenen ja kiehkura sata. Merkit lasketaan yhteen.',
    q: 'Temppelin seinään on hakattu lukuja, ja opas luki kolme niistä minulle ääneen. Neljättä hän ei lukenut — sanoi, että pärjään kyllä itsekin.',
    options: ['312', '2103', '213', '231'],
    correct: 2,
    fact: 'Sauva on 1, kaari — karjan jalkaköysi — on 10 ja köysikiehkura 100. Merkkejä ei aseteta paikoilleen vaan lasketaan yhteen, joten kaksi kiehkuraa, yksi kaari ja kolme sauvaa tekevät 213. Nollaa ei ole eikä paikka-arvoa, mikä on nokkelaa pienillä luvuilla ja tuskaista suurilla: miljoonaan riittää yksi merkki, mutta lukuun 999 999 tarvitaan viisikymmentäneljä.',
    source: [
      'https://en.wikipedia.org/wiki/Egyptian_numerals',
      'MacTutor, University of St Andrews: Egyptian numerals',
    ],
  },
  {
    id: 'punnukset',
    generate: GENERATORS.punnukset,
    city: 'kumasi',
    title: 'Kultapunnusten vaaka',
    selite: 'Piirroksessa: vaaka. Vasemmalla vadissa kultahiekka ja punnus, oikealla punnukset — luvut ovat punnusten arvoja.',
    hint: 'Laske ensin valmiin vadin summa. Puuttuva punnus on erotus.',
    q: 'Kauppias punnitsee kultahiekkaa messinkipunnuksilla, joiden arvot hän tuntee ulkoa. Toinen vati on valmis, toisesta puuttuu vielä yksi punnus — mikä?',
    options: ['2', '3', '4', '6'],
    correct: 1,
    sketch: { kulta: 10, vasen: 2, oikea: [5, 4] },
    fact: 'Vasemmalla on 10 + 2 = 12, joten oikealle tarvitaan 5 + 4 + 3. Akanien kultapunnukset — abrammuo — valettiin messingistä kadotetun vahan menetelmällä, ja täydessä sarjassa oli yli kuusikymmentä eri arvoa. Kultahiekka oli maksuväline, ja punnusten muotoihin valettiin sananlaskuja, joten esine oli yhtä aikaa mitta ja muistisääntö.',
    source: [
      'https://en.wikipedia.org/wiki/Akan_goldweights',
      'Maxwell Museum, University of New Mexico: Asante Gold Weights',
    ],
  },
  {
    id: 'naksutus',
    generate: GENERATORS.naksutus,
    city: 'kapkaupunki',
    title: 'Kolme naksausta',
    selite: 'Piirroksessa: suu sivulta kolmesti — ylhäällä hampaat ja kitalaki, alhaalla kieli. Nuoli näyttää, mistä kohtaa kieli irtoaa naksahtaen; alla naksauksen kirjain.',
    hint: 'Katso kysytty kirjain ja etsi vaihtoehto, jonka kuvaus vastaa sen nuolta piirroksessa.',
    q: 'Piirsin muistiin kolme kohtaa, joista kieli irtoaa naksahtaen; jokaisella on oma kirjaimensa. Kansa kutsuu kieltään nimellä isiXhosa — mikä näistä on sen Xh?',
    options: [
      'c — kielen kärki etuhampailta',
      'q — kielen kärki hammasvallilta',
      'c — kielen sivu poskihampailta',
      'x — kielen sivu poskihampailta',
    ],
    correct: 3,
    fact: 'Xhosan kolme naksausta eroavat toisistaan vain irrotuskohdan mukaan: c on dentaalinen (kielen etuosa etuhampaiden takaa, kuin paheksuva "ts"), x on lateraalinen (kieli poskihampaita vasten ja ilma purkautuu kielen sivulta, kuin hevosta hoputettaessa) ja q on postalveolaarinen (kielen kärki hammasvallilla, vedetään alas, poksahtaa kuin korkki). Nimessä isiXhosa naksaus on Xh-kirjainparissa, ei sanan alussa: se ääntyy suunnilleen isi-ǁhoosa. Yhden laskutavan mukaan joka kymmenennessä xhosan perussanassa on naksaus — enemmän kuin lähes missään muussa bantukielessä; vain yeyi yltää suunnilleen samaan. Isoisä kirjoitti muistiin kolme kuvaa ja luuli sitä kieliopiksi.',
    source: [
      'https://en.wikipedia.org/wiki/Xhosa_language',
      'https://en.wikipedia.org/wiki/Lateral_click',
    ],
  },
  {
    id: 'kuunvaiheet',
    generate: GENERATORS.kuunvaiheet,
    city: 'timbuktu',
    title: 'Kuu käsikirjoituksen sivulla',
    selite: 'Piirroksessa: kuun vaiheet järjestyksessä vasemmalta oikealle — viimeinen on jätetty tyhjäksi.',
    hint: 'Katso paljonko valo kasvaa tai vähenee askelten välillä, ja jatka sarjaa yhdellä askeleella.',
    q: 'Kirjaston mestari käänsi eteeni sivun, jolle kuu on piirretty neljä kertaa peräkkäin. Kolme ensimmäistä ymmärrän; neljäs on jätetty tyhjäksi, ja hän odottaa minun sanovan sen ääneen.',
    options: ['kasvava kupera kuu', 'täysikuu', 'kasvava sirppi', 'vähenevä puolikuu'],
    correct: 0,
    fact: 'Sarja etenee neljänneksittäin: pimeä uusikuu, kasvava sirppi, puolikuu — ja seuraavana kasvava kupera kuu, jossa yli puolet kiekosta on valaistu mutta reuna ei ole vielä täysi. Timbuktussa tähtitiede ei ollut koristetta: Mamma Haidaran kirjaston käsikirjoitus Kashf al-Ghummah fi Nafa al-Ummah, kopioitu 1733, opettaa laskemaan vuodenaikojen alut tähtien liikkeistä, ja sen sivulla on kaavio taivaan kierrosta. Isoisän klubilla kaupungin nimeä käytettiin tarkoittamaan paikkaa, jota ei ole; samassa paikassa käytiin oppikirjaa läpi rivi riviltä.',
    source: [
      'Library of Congress: Ancient Manuscripts from the Desert Libraries of Timbuktu',
    ],
  },
  {
    id: 'vesileilit',
    generate: GENERATORS.vesileilit,
    city: 'sahara',
    title: 'Neljä mittaa vettä',
    selite: 'Piirroksessa: kaksi leiliä — pienempään mahtuu kolme mittaa, isompaan viisi. Kaataa saa leilistä toiseen, täyttää ja tyhjentää saa vapaasti.',
    hint: 'Kun täydestä viitosesta kaadetaan kolmonen täyteen, viitoseen jää kaksi mittaa. Mieti, mihin ne kaksi saadaan talteen.',
    q: 'Leilejä on kaksi, kolmosleiliin menee kolme mittaa ja viitosleiliin viisi, eikä kummankaan kyljessä ole yhtään viivaa. Oppaani tarvitsee tasan neljä mittaa toiseen leiliin ennen kuin lähdemme.',
    options: [
      'Täytä kolmonen, kaada se viitoseen, täytä kolmonen, kaada viitonen täyteen, tyhjennä viitonen, kaada kolmosen loput viitoseen',
      'Täytä viitonen, kaada siitä kolmonen täyteen, tyhjennä viitonen, kaada kolmonen viitoseen',
      'Täytä viitonen, kaada siitä kolmonen täyteen, tyhjennä kolmonen, kaada viitosen loput kolmoseen, täytä viitonen, kaada siitä kolmonen täyteen',
      'Täytä viitonen, kaada siitä kolmonen täyteen, tyhjennä kolmonen, kaada viitosen loput kolmoseen, täytä kolmonen',
    ],
    correct: 2,
    fact: 'Kun täydestä viitosesta kaadetaan kolmonen täyteen, viitoseen jää 2. Tyhjennä kolmonen, siirrä ne kaksi mittaa sinne ja täytä viitonen uudelleen: kolmoseen mahtuu enää yksi, ja viitoseen jää tasan neljä. Muut sarjat päätyvät yhteen, kolmeen tai viiteen mittaan — ne eivät ole vääriä kaatoja, ne vain loppuvat väärään lukuun. Karavaanissa vesi mitataan tarkkaan, koska seuraava kaivo on siellä missä se on, ei siellä missä isoisän kartassa lukee.',
    source: 'Klassinen kahden astian mittapulma',
  },
];

/**
 * Piirtää pulman luonnoksen annettuun SVG-elementtiin. `data` välitetään
 * piirrokselle, jotta luvut tulevat pulmadatasta eivätkä piirroskoodista —
 * näin piirros ja vastausvaihtoehdot eivät voi eriytyä toisistaan.
 */
export function piirraAfrikanPulma(svg, id, data) {
  SKETCHES[id]?.(svg, data);
}

/** Onko pulmalle olemassa piirros? Testit vartioivat tätä. */
export function onAfrikanPulma(id) {
  return typeof SKETCHES[id] === 'function';
}
