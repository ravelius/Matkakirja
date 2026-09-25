/**
 * LAUSERAJA: mistä tekstin ENSIMMÄINEN LAUSE loppuu.
 *
 * Omistajan päätös (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 16,
 * 18.9.2026): kaupunkiliuskan "Nähtävyydet"-rivin näkymässä
 * nähtävyystekstistä näkyy ensin VAIN ensimmäinen lause ja sen perässä
 * "Lue lisää" -nappi, joka tuo loput samaan kappaleeseen.
 *
 * SÄÄNTÖ ON OMISTAJAN OMA, SANATARKASTI: *"ensimmäinen lause päättyy
 * pisteeseen, huuto- tai kysymysmerkkiin, jota seuraa välilyönti ja iso
 * kirjain — lyhenteet (esim. 'n.', 'v.', 'ns.') eivät katkaise"*.
 *
 * MIKSI OMA MODUULI. Sääntö on puhdasta tekstinkäsittelyä ilman DOMia,
 * joten se on yksikkötestattavissa ilman selainta
 * (tests/lauseraja.test.mjs) — ja juuri siksi se ei asu ladonnan
 * sisällä. Moduuli ei tuo mitään, joten se on niputuksessa (MODULES,
 * tools/build-standalone.mjs) ennen jokaista tuojaansa.
 */

/**
 * LYHENTEET, JOTKA EIVÄT KATKAISE LAUSETTA. Lista on suomen yleisimmät
 * lyhenteet sellaisina kuin ne pelin teksteissä esiintyvät (piste on
 * osa lyhennettä, ei lauseen loppu). Vertailu on pienaakkosilla.
 *
 * Listan ulkopuolella on kaksi sääntöä, jotka kattavat loput ilman
 * luetteloa: YKSI KIRJAIN ennen pistettä on nimikirjain ("J. K. Paasikivi")
 * ja NUMERO ennen pistettä on järjestysluku ("1. kerros").
 */
export const LYHENTEET = Object.freeze([
  'n', 'v', 'ns', 'esim', 'mm', 'jne', 'ym', 'yms', 'tms', 'ks', 'vrt',
  'eaa', 'jaa', 'ap', 'ip', 'nk', 'ts', 'ent', 'huom', 'klo',
  'ko', 'ml', 'mrd', 'milj', 'nro', 'os', 'puh', 'srk', 'em', 'ao',
  'alk', 'jkv', 'lk', 'ok', 'yht', 'n:o',
]);

const LYHENNE_AVAIMET = new Set(LYHENTEET.map((s) => s.toLocaleLowerCase('fi')));

/** Lauseen loppumerkin perään saa jäädä sulkeva lainaus tai sulku. */
const SULKEVAT = '”»"\')]}';

/** Onko merkki iso kirjain (myös Å, Ä, Ö ja muut kielet)? */
const isoKirjain = (merkki) => Boolean(merkki) && /\p{Lu}/u.test(merkki);

/**
 * ENSIMMÄINEN LAUSE JA LOPUT.
 *
 * Palauttaa `{ ensimmainen, loput }`, joissa `ensimmainen` sisältää
 * lauseen loppumerkin ja `loput` on tyhjä merkkijono, jos tekstissä ei
 * ole yhtään sääntöön käyvää rajaa (silloin koko teksti on yksi lause).
 *
 * @param {string} teksti
 * @returns {{ensimmainen: string, loput: string}}
 */
export function ensimmainenLause(teksti) {
  const koko = String(teksti ?? '').trim();
  if (!koko) return { ensimmainen: '', loput: '' };
  for (let i = 0; i < koko.length; i += 1) {
    const merkki = koko[i];
    if (merkki !== '.' && merkki !== '!' && merkki !== '?') continue;
    if (merkki === '.' && onLyhenne(koko, i)) continue;
    // Sulkevat merkit kuuluvat vielä lauseeseen: ...tuli."  Seuraava...
    let j = i + 1;
    while (j < koko.length && SULKEVAT.includes(koko[j])) j += 1;
    // Peräkkäiset loppumerkit ("?!") kuuluvat samaan rajaan.
    while (j < koko.length && (koko[j] === '.' || koko[j] === '!' || koko[j] === '?')) j += 1;
    if (j >= koko.length) break;
    if (koko[j] !== ' ' && koko[j] !== '\n' && koko[j] !== '\t') continue;
    let k = j;
    while (k < koko.length && /\s/u.test(koko[k])) k += 1;
    if (k >= koko.length) break;
    if (!isoKirjain(koko[k])) continue;
    return { ensimmainen: koko.slice(0, j).trim(), loput: koko.slice(k).trim() };
  }
  return { ensimmainen: koko, loput: '' };
}

/**
 * Onko kohdassa `i` oleva piste LYHENTEEN piste eikä lauseen loppu?
 * Kolme polkua: tunnettu lyhenne, yksikirjaiminen nimikirjain ja
 * järjestysluku.
 */
function onLyhenne(teksti, i) {
  const edella = teksti.slice(0, i);
  if (/\d$/u.test(edella)) return true;
  const sana = edella.match(/[\p{L}:]+$/u)?.[0] ?? '';
  if (!sana) return false;
  if (sana.length === 1) return true;
  return LYHENNE_AVAIMET.has(sana.toLocaleLowerCase('fi'));
}
