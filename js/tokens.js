// Laatat: jalokivet, tähti, hevosenkengät, ryöstäjät ja tyhjät.
//
// Laattatyyppien tunnisteet (star, ruby, …) ovat samat kaikilla laudoilla,
// jotta kuvakkeet ja tyylit toimivat sellaisenaan. Lauta voi antaa tyypeille
// oman nimen ja värin themedTokenTypes-apurilla, ja laattojen määrät
// määritellään laudan paketissa niin, että niitä on yksi jokaiseen
// aarrekaupunkiin.

export const TOKEN_TYPES = {
  // Oletusnimi on tarkoituksella yleinen: jokainen lauta antaa pääaarteelleen
  // oman nimen themedTokenTypes-apurilla. Jos oletus jää ruudulle näkyviin,
  // se on merkki puuttuvasta nimestä eikä toisen pelin lainasta.
  star: { id: 'star', name: 'Unohdettu aarre', symbol: '◈', value: 0, color: '#f6c445' },
  horseshoe: { id: 'horseshoe', name: 'Hevosenkenkä', symbol: 'Ω', value: 0, color: '#c9d1d9' },
  robber: { id: 'robber', name: 'Ryöstäjä', symbol: '☠', value: 0, color: '#8a8f98' },
  ruby: { id: 'ruby', name: 'Rubiini', symbol: '◆', value: 1000, color: '#e0413e' },
  emerald: { id: 'emerald', name: 'Smaragdi', symbol: '◆', value: 600, color: '#2fa36b' },
  topaz: { id: 'topaz', name: 'Topaasi', symbol: '◆', value: 300, color: '#e8a020' },
  empty: { id: 'empty', name: 'Tyhjä', symbol: '·', value: 0, color: '#6f5b45' },
  // Taikalasi on katselutapa eikä jalokivi: sen arvo puntina on nolla,
  // ja juuri siksi sillä on oltava revealTokenissa oma haara ennen
  // defaultia. Ilman sitä laatta maksaisi "+0 puntaa" ja kuulostaisi
  // pettymykseltä (js/game.js, docs/moduulit/linssit.md luku 4.1).
  linssi: { id: 'linssi', name: 'Taikalasi', symbol: '◉', value: 0, color: '#7fb3c8' },
};

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
