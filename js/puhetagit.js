/*
 * PULUN PUHETAGIT POIS NÄYTÖLTÄ (omistaja 27.9.2026: xAI-puhetagit
 * hyväksytty — huokaus, nauru, innostus).
 *
 * Livia saa merkitä vastauksensa omaan ääneen enintään yhden xAI:n
 * puhetagin: pistetagin [sigh] / [laugh] tai kääreen <fast>…</fast>
 * (tools/pollo/worker.js PUHETAGIKEHOTE). Tagi on ÄÄNTÄ VARTEN: se
 * kulkee lukijaäänelle (js/puhe.js → workerin puhe-tehtävä, joka
 * suodattaa sallitut, tools/pollo/rajat.js suodataPuhetagit), mutta
 * pelaaja ei saa nähdä sitä koskaan — ei kuplassa, historiassa,
 * lokissa, poiminnassa eikä laitteen omassa äänessä, joka lukisi sen
 * kirjaimellisesti.
 *
 * Tämä on se yksi jaettu siivous. Se poistaa KAIKKI tagin näköiset
 * merkinnät, ei vain sallittuja: näytölle ei kuulu mikään niistä.
 *
 * KÄSITELINKIT SÄILYVÄT: [[käsite]] ei ole tagi. Yksinkertainen
 * hakasulkupari hyväksytään tagiksi vain, kun sen vieressä ei ole
 * toista hakasulkua, joten tämän voi ajaa myös raakatekstille ennen
 * käsitteiden jäsennystä (js/pollo.js jasennaKasitteet).
 *
 * STRIIMISSÄ tagi voi tulla kahdessa palassa ("[si" + "gh]"). Siksi
 * siivotaan aina KERTYNYT teksti eikä yksittäinen pala, ja `kesken`
 * pidättää lopun keskeneräisen [- tai <-alun, kunnes se sulkeutuu tai
 * striimi päättyy. Puolikas tagi ei vilahda ruudulla kertaakaan.
 */

/** Tagin näköinen merkintä: [sigh], [long-pause], <fast>, </fast>. [[käsite]] ei ole tagi. */
const TAGI = /(?<!\[)\[[a-z-]{2,20}\](?!\])|<\/?[a-z-]{1,20}>/g;
/** Poistetun tagin paikkamerkki (ohjausmerkki, ei esiinny vastauksessa). */
const POISTETTU = '\u0000';
/** Peräkkäiset poistetut tagit väleineen yhtenä kohtana. */
const POISTOKOHTA = /[ \t]*(?:\u0000[ \t]*)+/g;
/** Striimin lopussa keskeneräinen tagin alku: "[", "[si", "<", "</fa". */
const KESKEN_ALKU = /(?:(?<!\[)\[[a-z-]{0,20}|<\/?[a-z-]{0,20})$/;

/**
 * Poistokohdan korvaaja: ei tuplaväliä, ei väliä rivin alkuun eikä
 * väliä välimerkin eteen ("Pulu. [sigh] No." → "Pulu. No."). Muualla
 * tekstiin ei kosketa. Sama sääntö kuin workerin suodattimessa
 * (tools/pollo/rajat.js suodataPuhetagit).
 */
function korvaaPoistokohta(kohta, alku, koko) {
  const edellinen = koko[alku - 1];
  const seuraava = koko[alku + kohta.length];
  if (edellinen === undefined || edellinen === '\n') return '';
  if (seuraava === undefined || seuraava === '\n' || /[.,;:!?…]/.test(seuraava)) return '';
  return /[ \t]/.test(kohta) ? ' ' : '';
}

/**
 * Teksti ilman puhetageja pelaajan silmille.
 *
 * @param {string} teksti Pulun vastaus (tagillinen tai tagiton).
 * @param {{kesken?: boolean}} asetukset `kesken`: striimi jatkuu vielä,
 *   joten lopun keskeneräinen tagin alku pidätetään.
 * @returns {string}
 */
export function poistaPuhetagit(teksti, { kesken = false } = {}) {
  const raaka = String(teksti ?? '').replaceAll(POISTETTU, '');
  const merkitty = raaka.replace(TAGI, POISTETTU);
  const puhdas = merkitty === raaka ? raaka : merkitty.replace(POISTOKOHTA, korvaaPoistokohta);
  return kesken ? puhdas.replace(KESKEN_ALKU, '') : puhdas;
}
