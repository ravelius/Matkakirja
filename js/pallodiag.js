/*
 * ══════════════════════════════════════════════════════════════════
 * PALLODIAG — VAIHELOKI, JONKA SAA NÄKYVIIN ILMAN KONSOLIA
 * ══════════════════════════════════════════════════════════════════
 *
 * MUSTA PALLO EI KERRO ITSESTÄÄN MITÄÄN. Kun jokin pallon tai
 * Astronautin kameran avausketjun vaihe epäonnistuu WebKitissä, se
 * epäonnistuu HILJAA: kangas jää tyhjäksi, `toBlob` onnistuu, osoite
 * syntyy — eikä yksikään virhehaara laukea. Omistaja ei voi avata
 * puhelimesta tai asennetusta Safari-sovelluksesta konsolia, joten
 * ketju kirjoittaa itsestään lokia, jonka saa näkyviin osoiteriviltä:
 * `?pallodiag=1`.
 *
 * Loki kerätään AINA (muutama kymmenen riviä, ei mittaustaakkaa);
 * lippu ratkaisee vain sen, tulostetaanko se konsoliin ja ruudulle.
 * Savukkeet ja linssin `tila()` lukevat saman taulukon.
 *
 * ── MIKSI OMA MODUULI (16.9.2026, WebKit-haara) ───────────────────
 *
 * Loki asui js/linssit/satelliitti-avaruus.js:ssä, joka on LINSSIN
 * moduuli ja latautuu vasta kun linssi avataan. Asennetun Safari-
 * sovelluksen tyhjä linssinäkymä (Raamattu, ASTRONAUTIN KAMERA
 * LISÄYS 11 kohta 34) katkeaa kuitenkin jo ENNEN sitä: kirjaston
 * lataus (js/pallo.js) ja laudan rakennus tapahtuvat linssistä
 * riippumatta, eikä niistä saanut yhtään riviä. Ydin on siksi täällä,
 * ja satelliitti-avaruus vie samat nimet edelleen ulos — yksikään
 * tuonti ei muuttunut.
 */

/** Kuinka monta riviä lokissa säilytetään. */
export const DIAGIN_RIVIT = 60;

const diaginLoki = [];

/** Onko `?pallodiag=1` osoiterivillä? */
export function pallodiagPaalla(ikkuna = globalThis) {
  try {
    return /[?&]pallodiag=1(?:&|$)/.test(String(ikkuna?.location?.search ?? ''));
  } catch { return false; }
}

/** Kerätty loki kopiona (savuke ja tila lukevat tämän). */
export function pallodiagLoki() { return diaginLoki.slice(); }

/** Loki yhtenä tekstilohkona — virheilmoitus näyttää tämän. */
export function pallodiagTeksti(rivit = DIAGIN_RIVIT) {
  return diaginLoki.slice(-rivit).map((r) => {
    const { vaihe, ...tiedot } = r;
    const osat = Object.entries(tiedot).map(([k, v]) => `${k}=${v}`).join(' ');
    return osat ? `${vaihe} ${osat}` : String(vaihe);
  }).join('\n');
}

function diagRuudulle(rivi, ikkuna) {
  const doc = ikkuna?.document;
  if (!doc?.createElement) return;
  try {
    let laatikko = doc.getElementById?.('pallodiag');
    if (!laatikko) {
      laatikko = doc.createElement('div');
      laatikko.id = 'pallodiag';
      laatikko.setAttribute('style', [
        'position:fixed', 'left:4px', 'bottom:4px', 'z-index:2147483647',
        'max-width:calc(100vw - 8px)', 'max-height:38vh', 'overflow:auto',
        'font:11px/1.35 ui-monospace,monospace', 'color:#cfe',
        'background:rgba(0,0,0,.72)', 'padding:4px 6px', 'border-radius:6px',
        'pointer-events:none', 'white-space:pre-wrap',
      ].join(';'));
      doc.body?.appendChild?.(laatikko);
    }
    laatikko.textContent = `${laatikko.textContent}${rivi}\n`.split('\n').slice(-DIAGIN_RIVIT).join('\n');
  } catch { /* ruutuloki on lisä, ei ehto */ }
}

/** Yksi vaihe lokiin (ja lipun ollessa päällä konsoliin ja ruudulle). */
export function pallodiag(vaihe, tiedot = {}, ikkuna = globalThis) {
  const rivi = { vaihe, ...tiedot };
  diaginLoki.push(rivi);
  if (diaginLoki.length > DIAGIN_RIVIT) diaginLoki.shift();
  if (!pallodiagPaalla(ikkuna)) return rivi;
  const teksti = `${vaihe} ${Object.entries(tiedot).map(([k, v]) => `${k}=${v}`).join(' ')}`;
  try { ikkuna?.console?.log?.(`[pallodiag] ${teksti}`); } catch { /* ei konsolia */ }
  diagRuudulle(teksti, ikkuna);
  return rivi;
}

/** Kello, joka ei kaadu ilman `performance`a. */
export function diagNyt(ikkuna = globalThis) {
  try {
    const t = ikkuna?.performance?.now?.();
    if (Number.isFinite(t)) return t;
  } catch { /* ei performancea */ }
  return Date.now();
}
