/*
 * LAATAT: PÄÄAARRE, MANTEREEN AARRE, PAIKALLISAARTEET JA RYÖSTÄJÄ.
 *
 * Raamatun osio "Aarteet ja eteneminen": laatta on joka kaupungissa ja
 * sen alta löytyy AINA aarre. Siksi täällä ei ole enää tyhjää laattaa,
 * hevosenkenkää, jalokivien arvotaulua eikä linssilaattaa — varusteet
 * ostetaan kaupasta, eivät löydy kätköistä.
 *
 * Laattatyyppien tunnisteet ovat samat kaikilla laudoilla, jotta
 * kuvakkeet ja tyylit toimivat sellaisenaan. Lauta voi antaa tyypeille
 * oman nimen ja värin themedTokenTypes-apurilla, ja laattojen määrät
 * määritellään laudan paketissa niin, että niitä on yksi jokaiseen
 * kaupunkiin.
 *
 * ARVO EI OLE TYYPIN OMINAISUUS kuin kiinteillä aarteilla. Pieni ja iso
 * paikallisaarre arvotaan löytöhetkellä (arvoAarteenArvo), joten niiden
 * `value` on nolla: se ei ole hinta vaan merkki siitä, ettei sitä lueta
 * täältä. Kutsuja kysyy arvon aina löydön yhteydessä.
 */

export const MANNER_AARRE_ARVO = 1000; // kiinteä: mantereen oma aarre
// Löytöhetkellä arvottavat vaihteluvälit, kymmenen punnan tarkkuudella.
export const PIENI_AARRE_ARVO = { min: 100, max: 250 };
export const ISO_AARRE_ARVO = { min: 500, max: 800 };

export const TOKEN_TYPES = {
  // Oletusnimi on tarkoituksella yleinen: jokainen lauta antaa pääaarteelleen
  // oman nimen themedTokenTypes-apurilla. Jos oletus jää ruudulle näkyviin,
  // se on merkki puuttuvasta nimestä eikä toisen pelin lainasta.
  star: { id: 'star', name: 'Unohdettu aarre', symbol: '◈', value: 0, color: '#f6c445' },
  robber: { id: 'robber', name: 'Ryöstäjä', symbol: '☠', value: 0, color: '#8a8f98' },
  // Mantereen oma aarre: yksi laatta per manner, kiinteä 1000 puntaa.
  // Nimen, värin ja kuvan antaa lauta (themedTokenTypes).
  mannerAarre: {
    id: 'mannerAarre', name: 'Mantereen aarre', symbol: '◆',
    value: MANNER_AARRE_ARVO, color: '#e0b02a',
  },
  /*
   * Paikallisaarteet. Oletusnimi on yleinen varanimi: maakohtaiset parit
   * (js/packs/paikallisaarteet.js) tulevat päätoimittajalta myöhemmin, ja
   * siihen asti jokainen maa käyttää samaa aikakauden henkistä nimeä.
   */
  isoAarre: {
    id: 'isoAarre', name: 'Kätketty matka-arkku', symbol: '◆',
    value: 0, color: '#c98a2b',
  },
  pieniAarre: {
    id: 'pieniAarre', name: 'Kourallinen hopeakolikoita', symbol: '◇',
    value: 0, color: '#c9ccd4',
  },
  /*
   * SISÄINEN MERKKI, EI AARRE: pöllöaarteen (js/game.js polloPaljastus)
   * korvaama laatta kirjataan tällä, jotta kartta ja matkalaukku pysyvät
   * ehjinä. Pelaaja ei näe sitä koskaan aarteena — mekaniikka on
   * lisäksi tauolla (POLLO_ON_AARRE).
   */
  empty: { id: 'empty', name: 'Tyhjä', symbol: '·', value: 0, color: '#6f5b45' },
};

/**
 * Laatat, joiden alta löytyy aarre. Erottelu ratkaisee mm. iOS-kuoren
 * juhlatärähdyksen ja matkalaukun rivit; ryöstäjä ja sisäinen tyhjä
 * merkki eivät ole aarteita.
 */
export const AARRETYYPIT = new Set(['star', 'mannerAarre', 'isoAarre', 'pieniAarre']);

export function onAarre(type) {
  return AARRETYYPIT.has(type);
}

/**
 * Aarteen arvo puntina löytöhetkellä. Pieni ja iso paikallisaarre
 * arvotaan väliltään kymmenen punnan tarkkuudella, jotta sama nimi ei
 * tarkoita joka kerta samaa summaa; kiinteitä ovat vain mantereen aarre
 * ja pääaarre (STAR_PRIZE, js/game.js).
 */
export function arvoAarteenArvo(type, rng = Math.random) {
  const vali = type === 'pieniAarre' ? PIENI_AARRE_ARVO
    : type === 'isoAarre' ? ISO_AARRE_ARVO : null;
  if (!vali) return TOKEN_TYPES[type]?.value ?? 0;
  const askelia = (vali.max - vali.min) / 10 + 1;
  return vali.min + Math.floor(rng() * askelia) * 10;
}

/** Laattatyypit laudan omilla nimillä ja väreillä. */
export function themedTokenTypes(overrides = {}) {
  const out = {};
  for (const [id, type] of Object.entries(TOKEN_TYPES)) {
    out[id] = { ...type, ...(overrides[id] ?? {}) };
  }
  return out;
}

export function tokenPileTemplate(counts) {
  const pile = [];
  for (const [type, count] of Object.entries(counts)) {
    for (let i = 0; i < count; i++) pile.push(type);
  }
  return pile;
}

/** Sekoittaa laattapinon (Fisher–Yates). */
export function createTokenPile(counts, rng = Math.random) {
  const pile = tokenPileTemplate(counts);
  for (let i = pile.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pile[i], pile[j]] = [pile[j], pile[i]];
  }
  return pile;
}
