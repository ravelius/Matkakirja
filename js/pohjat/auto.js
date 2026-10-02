/**
 * NOSTOKORTTI-pohjan osa AUTO (tyylikirja.json pohjat.NOSTOKORTTI.osat: "AUTO (luenta, siirtyy seuraavaan 3 s)";
 * natiivi UI/Nostoselain.cs). Webissä ensimmäinen käyttäjä on Astronautin kamera (omistaja 2.10.2026).
 *
 *   kytkin   pilleri "● AUTO" (TOIMINTO; päällä toimintovärillä), aria-pressed
 *   siirto   TUMMA lappu "Seuraava: <nimi> 3 s · Pysäytä" etenemispalkilla; 3 s:n jälkeen kutsutaan teko()
 *
 * Asetus on sama kuin lehden jatkuvalla luennalla ja natiivissa (localStorage matkakirja-lukija-auto), joten AUTO on
 * päällä kaikkialla, missä se on päällä. Pelaajan napautus, nipistys tai nuoli pysäyttää AUTOn (kutsuja: asetaAuto
 * (false)); Pysäytä tekee saman.
 */
export const POHJA_AUTO_AVAIN = 'matkakirja-lukija-auto';
export const POHJA_AUTO_SIIRTO_MS = 3000;
const POHJA_AUTO_TAHTI_MS = 100;

/** Onko AUTO päällä (laitekohtainen asetus). */
export function autoPaalla() {
  try { return globalThis.localStorage?.getItem(POHJA_AUTO_AVAIN) === '1'; } catch { return false; }
}

/** AUTO päälle tai pois; kuuntelijat saavat tapahtuman matkakirja-auto (detail: päällä). */
export function asetaAuto(paalle) {
  try {
    if (paalle) globalThis.localStorage?.setItem(POHJA_AUTO_AVAIN, '1');
    else globalThis.localStorage?.removeItem(POHJA_AUTO_AVAIN);
  } catch { /* yksityinen selaus: asetus elää vain tämän ajon */ }
  try { globalThis.dispatchEvent?.(new CustomEvent('matkakirja-auto', { detail: Boolean(paalle) })); } catch { /* ei DOMia */ }
}

function autoSolmu(tagi, luokka, teksti) {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/**
 * AUTO-kytkin. `muuttui(päällä)` kutsutaan pelaajan napautuksesta; kytkin seuraa myös muualta tulevaa muutosta.
 * Palauttaa { el, paivita, pura }.
 */
export function luoAutoKytkin({ muuttui = null } = {}) {
  const el = autoSolmu('button', 'tk-auto');
  el.type = 'button';
  el.title = 'Auto: lukee kohteen ja siirtyy seuraavaan';
  el.setAttribute('aria-label', 'Auto: lukee kohteen ja siirtyy seuraavaan');
  el.append(autoSolmu('span', 'tk-auto__piste'), autoSolmu('span', 'tk-auto__teksti', 'Auto'));
  const paivita = () => el.setAttribute('aria-pressed', autoPaalla() ? 'true' : 'false');
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const paalle = !autoPaalla();
    asetaAuto(paalle);
    muuttui?.(paalle);
  });
  globalThis.addEventListener?.('matkakirja-auto', paivita);
  paivita();
  return { el, paivita, pura: () => globalThis.removeEventListener?.('matkakirja-auto', paivita) };
}

/**
 * Siirtolappu kortin alalaitaan (isä). `aloita(nimi, teko)` näyttää lapun ja kutsuu teko() 3 s:n kuluttua;
 * `lopeta()` piilottaa ja peruu. Pysäytä kytkee AUTOn pois. Palauttaa { el, aloita, lopeta, get kaynnissa }.
 */
export function luoAutoSiirto({ pysaytetty = null } = {}) {
  const el = autoSolmu('div', 'tk-auto-lappu tk-teema-tumma');
  el.hidden = true;
  el.setAttribute('role', 'status');
  const teksti = autoSolmu('span', 'tk-auto-lappu__teksti');
  const nimi = autoSolmu('span', 'tk-auto-lappu__nimi');
  const aika = autoSolmu('span', 'tk-auto-lappu__aika');
  // Pitkä nimi lyhenee, aika ei (aika on oma solmunsa tekstin ulkopuolella).
  teksti.append('Seuraava: ', nimi);
  const pysayta = autoSolmu('button', 'tk-nappi tk-auto-lappu__pysayta', 'Pysäytä');
  pysayta.type = 'button';
  const palkki = autoSolmu('span', 'tk-auto-lappu__palkki');
  el.append(teksti, aika, pysayta, palkki);
  let ajastin = null;
  let alku = 0;
  const lopeta = () => {
    if (ajastin) clearInterval(ajastin);
    ajastin = null;
    el.hidden = true;
  };
  pysayta.addEventListener('click', (e) => {
    e.stopPropagation();
    lopeta();
    asetaAuto(false);
    pysaytetty?.();
  });
  el.addEventListener('pointerdown', (e) => e.stopPropagation());
  const aloita = (seuraava, teko) => {
    lopeta();
    nimi.textContent = seuraava;
    aika.textContent = `${Math.ceil(POHJA_AUTO_SIIRTO_MS / 1000)} s`;
    palkki.style.width = '0%';
    el.hidden = false;
    alku = Date.now();
    ajastin = setInterval(() => {
      const t = Date.now() - alku;
      if (t >= POHJA_AUTO_SIIRTO_MS) { lopeta(); teko?.(); return; }
      aika.textContent = `${Math.ceil((POHJA_AUTO_SIIRTO_MS - t) / 1000)} s`;
      palkki.style.width = `${Math.round((100 * t) / POHJA_AUTO_SIIRTO_MS)}%`;
    }, POHJA_AUTO_TAHTI_MS);
  };
  return { el, aloita, lopeta, get kaynnissa() { return Boolean(ajastin); } };
}
