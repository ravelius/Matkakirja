/*
 * TESTIVEKTORIT DIORAAMAN LIIKESILMUKOIDEN PUHTAALLE LOGIIKALLE (Linnanrakentaja,
 * erä 2b, ali-agentti P4a, 29.9.2026). Speksi: docs/raportit/dioraama-rajapinnat-
 * era2b-20260929.md kohta 4 "3D-HAHMOT".
 *
 * Ajaa js/dioraama/liikkeet.js:n (nivelKulmat, juuriNousu) OIKEANA moduulina ja
 * kirjoittaa syötteet + tulokset SUORAAN C#-puolen kultaisten jälkien kansioon:
 * /Users/Shared/Claude/wt/proto-linnanrakentaja-keittio/Linssit-testit/kultaiset/
 * dioraama-liikkeet-vektorit.json (ERI tiedosto kuin dioraama-vektorit.json/
 * tee-vektorit.mjs — tämä koskee VAIN liikesilmukoita). C#-portti (Ydin/Dioraama/
 * Liikkeet.cs + Linssit-testit/Testit/DioraamaLiikkeetTestit.cs) on TOISEN
 * agentin tehtävä — tämä skripti tuottaa vain vertailudatan.
 *
 * Deterministinen: ei satunnaisuutta, ei kelloa. Sama ajo tuottaa aina saman
 * tiedoston. Käyttö: node tools/dioraama/tee-liikevektorit.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

import { nivelKulmat, juuriNousu } from '../../js/dioraama/liikkeet.js';
import { LIIKKEET } from '../../js/dioraama/pankit/liikkeet.js';

const ULOS = '/Users/Shared/Claude/wt/proto-linnanrakentaja-keittio/Linssit-testit/kultaiset/dioraama-liikkeet-vektorit.json';

// --- pyöristys 1e-9 tarkkuuteen (rekursiivisesti, koko rakenteen läpi) ---
function pyorista(arvo) {
  if (typeof arvo === 'number') {
    if (!Number.isFinite(arvo)) return arvo;
    const p = Number(arvo.toFixed(9));
    return p === 0 ? 0 : p; // normalisoi -0 -> 0
  }
  if (Array.isArray(arvo)) return arvo.map(pyorista);
  if (arvo && typeof arvo === 'object') {
    return Object.fromEntries(Object.entries(arvo).map(([k, v]) => [k, pyorista(v)]));
  }
  return arvo;
}

// t01-näytteet: 0, 0.1, ..., 1.0 (11 näytettä) - kattaa avainten sisäpisteet ja
// molemmat reunat (silmukan sulkeutuminen näkyy naytteet[0] === naytteet[10]).
const T_GRID = Array.from({ length: 11 }, (_, i) => i / 10);

const silmukatVektorit = Object.keys(LIIKKEET).sort().map((silmukka) => ({
  silmukka,
  kesto_s: LIIKKEET[silmukka].kesto_s,
  juuri_nousu_m: LIIKKEET[silmukka].juuri?.nousu_m ?? null,
  naytteet: T_GRID.map((t) => ({
    t,
    nivelet: nivelKulmat(silmukka, t),
    juuriNousu: juuriNousu(silmukka, t),
  })),
}));

const TULKINNAT = [
  {
    aihe: 'silmukan sulkeutuminen',
    tulkinta: 'naytteet[0].nivelet/juuriNousu == naytteet[10].nivelet/juuriNousu (t=0 ja t=1) joka silmukalla - '
      + 'testattu myös JS-puolella (tests/dioraama-hahmot3d.test.mjs).',
  },
  {
    aihe: 'nivel, jota LIIKKEET[silmukka].avaimet ei mainitse',
    tulkinta: 'nivelKulmat palauttaa AINA kaikki 16 niveltä (js/dioraama/liikkeet.js:n NIVELET-lista) - '
      + 'mainitsematon nivel on levossa [0,0,0], ei puuttuva avain.',
  },
  {
    aihe: 'juuriNousu silmukalla, jolla ei ole juuri-kenttää',
    tulkinta: 'palauttaa 0.0 (ei null/NaN) - ks. tämän tiedoston juuri_nousu_m: null kirjaa erikseen puuttuvan amplitudin.',
  },
  {
    aihe: 'näytteistys avainten välillä',
    tulkinta: 'smoothstep (f*f*(3-2f)) kunkin nivelen OMIEN avainten paikallisella t01-osuudella, ei koko silmukan t:llä.',
  },
];

const MUOTO = {
  yleista: 'Kaikki liukuluvut pyöristetty 1e-9 tarkkuuteen. Kulmat asteina (rx,ry,rz), t/t01 0..1, '
    + 'juuriNousu metreinä. Nivelnimet: lantio, selka, kaula, paa, olka_v/_o, kyynar_v/_o, kasi_v/_o, '
    + 'lonkka_v/_o, polvi_v/_o, nilkka_v/_o (_v=vasen, _o=oikea) - tools/dioraama/hahmot3d.mjs:n nivelPuu().',
  silmukat: 'silmukat[i] = { silmukka, kesto_s, juuri_nousu_m (null jos ei juuri-kenttää), naytteet: '
    + '[{ t, nivelet: nivelKulmat(silmukka,t), juuriNousu: juuriNousu(silmukka,t) }] }. naytteet[j].t = j/10, j=0..10.',
};

const ULOSTULO = {
  $kuvaus: 'Dioraaman liikesilmukoiden testivektorit (tools/dioraama/tee-liikevektorit.mjs, älä muokkaa käsin - '
    + 'aja skripti uudelleen). C#-portti Ydin/Dioraama/Liikkeet.cs varmistaa pariteetin näitä vektoreita vasten '
    + '(docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4).',
  tarkkuus: 1e-9,
  muoto: MUOTO,
  tulkinnat: TULKINNAT,
  silmukat: silmukatVektorit,
};

mkdirSync(dirname(ULOS), { recursive: true });
writeFileSync(ULOS, `${JSON.stringify(pyorista(ULOSTULO), null, 1)}\n`);
console.log(`${ULOS}: ${silmukatVektorit.length} silmukkaa x ${T_GRID.length} näytettä`);
