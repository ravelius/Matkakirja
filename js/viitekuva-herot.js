/*
 * Viitekuviin ankkuroidut herokuvat: YKSI TOTUUS kahdelle näkymälle.
 *
 * Taulukkoa lukee kaksi paikkaa: työhuoneen MANTEREET-taulukko
 * (js/tyohuone-tilastot.js, oranssi solu) ja maailmankartta
 * kehittäjätilassa (js/ui.js, oranssi laatta). Lista asui aluksi vain
 * tilastoissa, ja kartan merkintä olisi tarvinnut siitä kopion.
 * Kopiot ovat tässä projektissa jo kerran ehtineet erkaantua
 * (herokuvien kuvakulma oli kopioitu parillekymmenelle työlistalle,
 * ja omistajan kalibrointi olisi pitänyt tehdä joka kopioon), joten
 * sääntö on täällä ja näkymät tuovat sen.
 *
 * MITÄ LUKU TARKOITTAA: montako kaupungin herokuvaa on generoitu
 * kohteen OMISTA Commons-valokuvista viitteinä. Vertailu kaupungin
 * herokuvien kokonaismäärään kertoo, onko erä kokonaan vai osittain
 * ankkuroitu — täysi erä näkyy täytenä oranssina, osittainen
 * haaleampana.
 *
 * MIKSI TÄTÄ MERKITÄÄN: viitteetön generointi tuotti Kašgariin
 * Samarkandin tyylisen timuridimausoleumin, vaikka kuvateksti lupasi
 * Yusuf Balasagunin mausoleumia — malli ei tuntenut kohdetta ja täytti
 * aukon alueen arkkityypillä. Ankkuroitu ja ankkuroimaton kuva ovat
 * siis eri luotettavuustasoa, ja se ero pitää näkyä silmällä eikä
 * vain muistin varassa.
 *
 * PÄIVITYS: kun uusi viitekuvallinen erä valmistuu ja kytketään
 * lehden avauskuviin, lisää kaupunki tähän SAMASSA versiossa. Merkintä
 * ei saa luvata kuvia, joita pelissä ei vielä ole.
 */
export const VIITEKUVA_HEROT = new Map([
  // Koko erä viitekuvilla (24.8.2026, kierros 21).
  ['melbourne', 3], ['vancouver', 3], ['brisbane', 3],
  ['chicago', 3], ['perth', 3], ['kabul', 3],
  // Tampere: neljä kuvaa, ensimmäinen viitekuvallinen erä (23.8.2026).
  ['tampere', 4],
  // Yksittäinen korjattu kuva, muut kaupungin herot ovat vanhoja.
  ['helsinki', 1], ['kashgar', 1], ['mekka', 1], ['petra', 1],
  ['damaskos', 1],
]);

/**
 * Kaupungin ankkurointitila laattaa ja taulukkosolua varten.
 *
 * @param {string} id       kaupungin id
 * @param {number} kaikki   kaupungin herokuvien kokonaismäärä
 * @returns {{ankkuroitu: number, taysi: boolean}|null} null jos ei ankkuroituja
 */
export function viitekuvaTila(id, kaikki) {
  const ankkuroitu = VIITEKUVA_HEROT.get(id) ?? 0;
  if (!ankkuroitu) return null;
  return { ankkuroitu, taysi: kaikki > 0 && ankkuroitu >= kaikki };
}
