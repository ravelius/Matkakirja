/*
 * NOSTOVALIKON AIHETAGIT (skeema 1.72; suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/
 * 20261117-nostovalikko.md kohdat 2.1 ja 7; omistaja 17.11.2026 klo 11.46: seitsemän tagia, Uskonnot mukana).
 *
 * Yksi kenttä `tagi` karttavaloille, kohdekarttojen kohteille ja niiden linkeille. Natiivin nostovalikko rajaa
 * luettelon, nuolet ja AUTO-kierron tagilla. Datan oma `tagi` voittaa; muuten tagi johdetaan nykyisistä kentistä:
 *
 *   valon / linkin aihe             kohdekartan tarinapaikan merkki
 *   ihmeet          → kadonneet     tiimalasi tai puuttuu → historia
 *   historia, hetket → historia     lamppu    → tiede
 *   kauppa          → tiede         lyyra     → kulttuuri
 *   kulttuuri       → kulttuuri     skandaali → skandaalit
 *   luonto, elaimet → luonto
 *   skandaalit      → skandaalit
 *   kaupungit       → null (kaupunki ei ole paikka luettelossa)
 *
 * Uskonnot tulee vain datasta (SK:n lista: kirkot, temppelit, luostarit siirtyvät Historiasta). Kartan merkit ja
 * Kartta-välilehden kytkimet käyttävät edelleen aihe-, laji- ja merkki-kenttiä; niihin ei kosketa.
 */

/** Tagit valikon järjestyksessä (natiivi UI/NostoMerkit.cs Tagit samassa järjestyksessä). */
export const TAGIT = ['kadonneet', 'historia', 'tiede', 'kulttuuri', 'luonto', 'skandaalit', 'uskonnot'];

const AIHEESTA = {
  ihmeet: 'kadonneet', historia: 'historia', hetket: 'historia', kauppa: 'tiede',
  kulttuuri: 'kulttuuri', luonto: 'luonto', elaimet: 'luonto', skandaalit: 'skandaalit',
};
const MERKISTA = { tiimalasi: 'historia', lamppu: 'tiede', lyyra: 'kulttuuri', skandaali: 'skandaalit' };

/**
 * Tagi datan omasta kentästä tai johdettuna. `tarinapaikka` = kohdekartan tarinakohde (merkki ratkaisee, puuttuva
 * merkki = tiimalasi = historia). Palauttaa null, jos tagia ei voi päätellä (esim. nähtävyys ilman linkin aihetta:
 * SK antaa sen datassa). Tuntematon datan tagi tai merkki on virhe, jotta kirjoitusvirhe ei katoa hiljaa.
 */
export function johdaTagi({ tagi = null, aihe = null, merkki = null, tarinapaikka = false } = {}, kuka = '') {
  if (tagi != null) {
    if (!TAGIT.includes(tagi)) throw new Error(`tagi: tuntematon tagi '${tagi}' (${kuka}); sallitut ${TAGIT.join(', ')}`);
    return tagi;
  }
  if (tarinapaikka) {
    if (merkki == null) return 'historia';
    if (!MERKISTA[merkki]) throw new Error(`tagi: tuntematon merkki '${merkki}' (${kuka})`);
    return MERKISTA[merkki];
  }
  return AIHEESTA[aihe] ?? null;
}

export const TAGI_KUVAUS = 'tagi (skeema 1.72) = nostovalikon aihetagi: kadonneet | historia | tiede | kulttuuri | luonto | '
  + 'skandaalit | uskonnot | null. Datan oma tagi voittaa; muuten johdettu (tools/vienti/tagit.mjs): aihe ihmeet → kadonneet, '
  + 'historia ja hetket → historia, kauppa → tiede, kulttuuri → kulttuuri, luonto ja elaimet → luonto, skandaalit → '
  + 'skandaalit, kaupungit → null; kohdekartan tarinapaikka merkin mukaan (tiimalasi tai puuttuu → historia, lamppu → '
  + 'tiede, lyyra → kulttuuri, skandaali → skandaalit). Uskonnot vain datasta.';
