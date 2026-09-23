/*
 * PIIRTOKOE JA KEHYSPROFIILI RATASVALIKKOON (omistajan tilaus Fablen
 * kautta 22.9.2026 klo 20.15: *"laita Piirtokoe-valikko ja
 * kehysprofiilin kytkin peliin HETI"*).
 *
 * MIKSI VALIKKOON EIKÄ VAIN OSOITTEESEEN. Kokeet ovat tähän asti olleet
 * `?koe=`-lippuja, ja omistaja testaa puhelimella: pitkän osoitteen
 * naputtelu iPhonen näppäimistöllä on juuri se este, jonka takia koe jää
 * ajamatta. Valikosta valittu koe jää laitteelle ja pysyy latauksen yli.
 *
 * YKSI TOTUUS, KAKSI LÄHDETTÄ. Moduulit lukevat koelippunsa kahdesta
 * apurista (`laattakerroksenKokeet`, `piirtokokeet`); molemmat lisäävät
 * tähän tallennetut valinnat samaan joukkoon, joten peli käyttäytyy
 * täsmälleen kuin lippu olisi osoitteessa. OSOITE VOITTAA silloin kun
 * apurille annetaan hakumerkkijono erikseen (savukkeet ja testit), jotta
 * mittausajo ei koskaan lue laitteen muistia.
 *
 * KOKEET OVAT MITTAUSTA. Jokainen muuttaa ulkoasua tai tarkkuutta vedon
 * aikana; oletus on aina `normaali`, eikä mikään niistä saa jäädä
 * päälle ilman omistajan päätöstä.
 */

export const PIIRTOKOE_AVAIN = 'matkakirja-piirtokoe';
export const KEHYSPROFIILI_AVAIN = 'matkakirja-kehysprofiili';
export const PIIRTOKOE_TAPAHTUMA = 'matkakirja-piirtokoe';

/**
 * Valittavat kokeet. `lippu` on se `?koe=`-arvo, jonka valinta lisää.
 * Jokainen koe tulee voimaan vasta latauksessa; valikko lataa sivun
 * itse (luoKoevaihdonLataaja alla).
 */
/*
 * SYÖTEKOE VALIKOSSA (omistaja 23.9.2026 klo 08.34 Fablen kautta).
 * Piirtokokeet (eipuskuri, eivienti, eihaivevedossa, vientibudjetti) on
 * mitattu eivätkä ne poistaneet nähtyä nykimistä; ne toimivat yhä
 * osoitteessa (`?koe=`). Valikossa ovat nyt syöteputken kokeet, koska
 * `?koe=syotetouch` oli ainoa myönteinen signaali:
 *   1 Oletus            aikaleimainterpolointi pointermovesta (interp)
 *   2 Kosketus suoraan  näytteet touchmovesta (iOS tahdistaa sen rAF:iin)
 *   3 Yhteinen kello    kohta-aika kehyksen yhteisestä kellosta
 *   4 Molemmat          2 + 3
 * `lippu` voi olla useampi lippu pilkulla eroteltuna. Tallennettu entinen
 * piirtokoe palautuu Oletukseen (unohdaPoistetutValinnat). Avain ja
 * tallennuspaikka ovat entiset (`matkakirja-piirtokoe`), jottei
 * automaattilataus ja kehysprofiilin tilarivi muutu.
 */
export const PIIRTOKOKEIDEN_VAIHTOEHDOT = [
  {
    avain: 'normaali',
    nimi: 'Oletus',
    seloste: 'Sormen paikka osoitintapahtumista kehyksen hetkelle (interp)',
    lippu: null,
    ikoni: '<circle cx="12" cy="12" r="7"/>',
  },
  {
    avain: 'syotetouch',
    nimi: 'Kosketus suoraan',
    seloste: 'Sormen paikka kosketustapahtumista, jotka iOS tahdistaa ruudun päivitykseen',
    lippu: 'syotetouch',
    ikoni: '<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10"/><path d="M12 10V8.5a1.5 1.5 0 0 1 3 0V11"/><path d="M15 11v-1a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 14.5a1.5 1.5 0 0 1 2.5-1.6L9 15V11"/>',
  },
  {
    avain: 'syotekello',
    nimi: 'Yhteinen kello',
    seloste: 'Kohta-aika koko kehykselle yhteisestä kellosta, ei päivityksen hetkestä',
    lippu: 'syotekello',
    ikoni: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
  },
  {
    avain: 'molemmat',
    nimi: 'Molemmat',
    seloste: 'Kosketus suoraan ja yhteinen kello yhdessä',
    lippu: 'syotetouch,syotekello',
    ikoni: '<circle cx="8.5" cy="12" r="4.5"/><circle cx="15.5" cy="12" r="4.5"/>',
  },
  /*
   * PALJAS KARTTA JA PUOLITUS (omistaja 23.9.2026 klo 09.20: "riisutaan
   * kartalta kaikki ylimääräiset elementit ja katsotaan loppuuko
   * tökkiminen"). Paljas = vain laatat ja veto; 6–8 lisäävät kukin yhden
   * ryhmän takaisin. Kerrokset: js/pallolauta/kerrokset.js PALJAAT_TILAT;
   * muut riisunnat: PALJAAN_LISAKOKEET alla.
   */
  {
    avain: 'paljas',
    nimi: 'Paljas kartta',
    seloste: 'Vain laatat ja veto: ei nimiöitä, symboleita, viivoja, pulua eikä DOM-kerroksia',
    lippu: 'paljas',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/>',
  },
  {
    avain: 'paljasnimet',
    nimi: 'Paljas + nimiöt',
    seloste: 'Paljas kartta ja paikkojen nimet',
    lippu: 'paljasnimet',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/><path d="M8 12h8"/>',
  },
  {
    avain: 'paljassymbolit',
    nimi: 'Paljas + symbolit',
    seloste: 'Paljas kartta ja nostojen symbolit ja pisteet',
    lippu: 'paljassymbolit',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/><circle cx="12" cy="12" r="2"/>',
  },
  {
    avain: 'paljasdom',
    nimi: 'Paljas + DOM-kerrokset',
    seloste: 'Paljas kartta ja kartan päällä olevat sivun elementit',
    lippu: 'paljasdom',
    ikoni: '<path d="M4.5 5.5h15v13h-15z"/><path d="M4.5 9.5h15"/>',
  },
];

/** Paljaan kartan tilat (lippu = avain). */
export const PALJAAT_KOKEET = Object.freeze(['paljas', 'paljasnimet', 'paljassymbolit', 'paljasdom']);
/*
 * Riisunnat, jotka eivät ole ablaatiotikkaan kerroksia: häivytys pois,
 * piirto joka rAF:ssa (lepopiirto pois), kirjaston pohja ja ilmakehä pois,
 * kaiutinmittari seis. Jokainen paljas tila asettaa ne kaikki.
 */
export const PALJAAN_LISAKOKEET = Object.freeze(['eihaive', 'levovanha', 'eipohja', 'eiilmakeha', 'eikaiutin']);

/** Laajenna koejoukko: paljas tila tuo lisäriisunnat. Muokkaa ja palauttaa joukon. */
export function laajennaKokeet(joukko) {
  if (PALJAAT_KOKEET.some((k) => joukko.has(k))) for (const k of PALJAAN_LISAKOKEET) joukko.add(k);
  return joukko;
}

export const PIIRTOKOKEEN_OLETUS = 'normaali';

const lueMuisti = (avain) => {
  try { return globalThis.localStorage?.getItem(avain) ?? null; } catch { return null; }
};
const kirjoitaMuisti = (avain, arvo) => {
  try { globalThis.localStorage?.setItem(avain, arvo); } catch { /* ei muistia */ }
};

/** Laitteelle muistettu koe (oletus normaali; tuntematon arvo = oletus). */
export function piirtokoeValinta() {
  const arvo = lueMuisti(PIIRTOKOE_AVAIN);
  return PIIRTOKOKEIDEN_VAIHTOEHDOT.some((k) => k.avain === arvo) ? arvo : PIIRTOKOKEEN_OLETUS;
}

/** Valinta laitteelle ja ilmoitus. Palauttaa voimaan jääneen. */
export function asetaPiirtokoe(avain) {
  const uusi = PIIRTOKOKEIDEN_VAIHTOEHDOT.some((k) => k.avain === avain) ? avain : PIIRTOKOKEEN_OLETUS;
  kirjoitaMuisti(PIIRTOKOE_AVAIN, uusi);
  globalThis.dispatchEvent?.(new CustomEvent(PIIRTOKOE_TAPAHTUMA, { detail: { koe: uusi } }));
  return uusi;
}

/** Näytetäänkö kehysprofiilin overlay (sama kuin ?koe=profiili). */
export function kehysprofiiliPaalla() {
  return lueMuisti(KEHYSPROFIILI_AVAIN) === '1';
}

/** Overlay päälle/pois laitteelle. */
export function asetaKehysprofiili(paalla) {
  kirjoitaMuisti(KEHYSPROFIILI_AVAIN, paalla ? '1' : '0');
  globalThis.dispatchEvent?.(new CustomEvent(PIIRTOKOE_TAPAHTUMA, { detail: { profiili: Boolean(paalla) } }));
  return Boolean(paalla);
}

/**
 * Valikosta tulevat koeliput joukkona. Tämä yhdistetään osoitteen
 * `?koe=`-lippuihin (js/pallolaatat.js, js/pallolauta/kerrokset.js).
 */
export function tallennetutKokeet() {
  const joukko = new Set();
  const koe = PIIRTOKOKEIDEN_VAIHTOEHDOT.find((k) => k.avain === piirtokoeValinta());
  // "Molemmat": useampi lippu pilkulla eroteltuna.
  for (const lippu of String(koe?.lippu ?? '').split(',').map((l) => l.trim()).filter(Boolean)) joukko.add(lippu);
  if (kehysprofiiliPaalla()) joukko.add('profiili');
  return joukko;
}

/*
 * VALIKOSTA POISTETUT VIVUT (omistaja 22.9.2026 klo 22.30: "Poista kaikki
 * ylimääräiset vivut valikosta niin löydän testattavat vaihtoehdot
 * paremmin."). Vedon seuranta ja Tarkkuus liikkeessä olivat laitteelle
 * tallentuvia valintoja; ilman valikkoriviä niitä ei voisi enää nähdä eikä
 * vaihtaa, joten tallennettu arvo poistetaan käynnistyksessä ja peli
 * palaa oletukseen (veto interp, tarkkuus terävä). Liput toimivat yhä
 * osoitteessa (`?koe=`, `?tarkkuus=`). Avaimet ovat samat kuin
 * js/vedon-seuranta.js ja js/tarkkuus-asetus.js (testi valvoo), mutta
 * tämä moduuli pysyy lehtenä eikä tuo niitä.
 */
export const POISTETUT_VALINTA_AVAIMET = Object.freeze([
  'matkakirja-vedon-seuranta',
  'matkakirja-tarkkuus-liikkeessa',
]);

/** Poista valikosta poistettujen vipujen ja kokeiden tallennukset. Palauttaa nollattujen määrän. */
export function unohdaPoistetutValinnat(varasto = (() => { try { return globalThis.localStorage; } catch { return null; } })()) {
  let n = 0;
  for (const avain of POISTETUT_VALINTA_AVAIMET) {
    try {
      if (varasto?.getItem(avain) != null) { varasto.removeItem(avain); n += 1; }
    } catch { /* ei muistia */ }
  }
  // Valikosta poistettu koe (22.9.2026 klo 23.08 ja 23.9.2026 klo 08.34) → Oletus.
  try {
    const koe = varasto?.getItem(PIIRTOKOE_AVAIN);
    if (koe != null && !PIIRTOKOKEIDEN_VAIHTOEHDOT.some((k) => k.avain === koe)) {
      varasto.setItem(PIIRTOKOE_AVAIN, PIIRTOKOKEEN_OLETUS);
      n += 1;
    }
  } catch { /* ei muistia */ }
  return n;
}

/*
 * VALINTA LATAA SIVUN (omistaja 22.9.2026 klo 23.05 Fablen kautta: kolme
 * viidestä kaappauksesta jäi vanhaan kokeeseen, koska sivua ei ladattu).
 * Jokainen koe luetaan KERROSTEN LUONNISSA (laattakerros, nimiörunko,
 * konteksti) ja kehysprofiilin näyttö laudan rakennuksessa, joten mikä
 * tahansa muutos tulee voimaan vasta latauksessa. Valikko lataa sivun
 * itse pienen viiveen jälkeen ("Ladataan…"); peli on jo tallessa, koska
 * jokainen siirto tallennetaan (main.js saveGame). Jos valinta palaa
 * viiveen aikana latauksessa voimassa olleeseen, lataus perutaan.
 */
export const PIIRTOKOE_LATAUS_VIIVE_MS = 600;

/** Valikon koetila yhtenä avaimena: koe + kehysprofiilin kytkin. */
export function koetilanAvain() {
  return `${piirtokoeValinta()}|${kehysprofiiliPaalla() ? 1 : 0}`;
}

/**
 * Lataaja: `muuttui()` kutsutaan jokaisen valinnan jälkeen. Palauttaa
 * true, jos lataus on ajastettu. PUHDAS riippuvuuksiltaan (testit).
 *
 * @param {object} p0
 * @param {string} p0.alussa      koetilanAvain() sivun latautuessa
 * @param {() => string} [p0.nyt]  nykyinen avain
 * @param {() => void} p0.lataa    location.reload
 * @param {(n: boolean) => void} [p0.nayta] "Ladataan…" näkyviin / pois
 */
export function luoKoevaihdonLataaja({
  alussa, nyt = koetilanAvain, lataa, nayta = () => {},
  viive = PIIRTOKOE_LATAUS_VIIVE_MS, ajasta = globalThis.setTimeout, peru = globalThis.clearTimeout,
}) {
  let ajastin = null;
  return {
    muuttui() {
      const tarvitaan = nyt() !== alussa;
      if (ajastin !== null) { peru(ajastin); ajastin = null; }
      nayta(tarvitaan);
      if (tarvitaan) ajastin = ajasta(() => { ajastin = null; lataa(); }, viive);
      return tarvitaan;
    },
    odottaa: () => ajastin !== null,
  };
}

/**
 * Osoitteen `?koe=`-liput ja (ilman omaa hakua) valikon tallennus, paljaan
 * kartan lisäriisunnat mukaan. Lehtimoduuleille (lepopiirto,
 * kaiutinmittari), jotka eivät tuo js/pallolaatat.js:ää.
 */
export function voimassaOlevatKokeet(haku) {
  const h = haku ?? (() => { try { return globalThis.location?.search ?? ''; } catch { return ''; } })();
  let arvo = '';
  try { arvo = new URLSearchParams(h).get('koe') ?? ''; } catch { arvo = ''; }
  const joukko = new Set(arvo.split(',').map((k) => k.trim()).filter(Boolean));
  if (haku === undefined) for (const lippu of tallennetutKokeet()) joukko.add(lippu);
  return laajennaKokeet(joukko);
}
