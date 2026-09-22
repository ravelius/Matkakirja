/*
 * KEHYSPROFIILI RUUDULLE JA MITTAUSPALVELIMELLE (`?koe=profiili`;
 * omistajan tilaus Fablen kautta 22.9.2026).
 *
 * MIKSI. iPhonen nykimisen syy on tähän asti pitänyt lukea Web
 * Inspectorilla kiinni kytketystä puhelimesta — työläs ketju, joka
 * katkeaa aina kun kaapeli tai Safarin kehittäjätila ei ole käsillä.
 * Peli osaa jo mitata itsensä (js/pallolauta/kehysprofiili.js: jokaisen
 * kehyksen varattu/vapaa-jako, rAF-kutsut nimineen ja three.render
 * erikseen), joten puuttuva pala on pelkkä NÄYTTÖ ja LÄHETYS — ei uutta
 * mittauskoodia.
 *
 * KAKSI ULOSTULOA, SAMA TIIVISTE:
 *   1. pieni overlay kartan päällä: pisin kehys syineen, jakauma ja
 *      voimassa olevat asetukset. Omistajan kuvakaappaus kertoo näin
 *      itsessään, missä tilassa peli oli — ilman erillistä muistiinpanoa.
 *   2. POST `/__profiili` samaan origin-palvelimeen (mittauspalvelimen
 *      kaava, tools/mittaus/profiili-palvelin.mjs). Epäonnistuminen on
 *      normaali tilanne (tuotanto-osoite, ei palvelinta) eikä saa näkyä
 *      pelaajalle millään tavalla.
 *
 * ROLLAAVA IKKUNA, EI KERTAMITTAUS. Profiili suljetaan ja avataan
 * uudelleen JAKSO_MS:n välein: jokainen jakso on oma tiivisteensä, joten
 * ruudulla näkyy se, mitä juuri nyt tapahtui — ei sekunteja sitten
 * alkaneen ajon keskiarvo, jossa yksittäinen piikki hukkuu.
 *
 * RUUDULLE EI LASKETA MITÄÄN RASKASTA: tiiviste on sama funktio, jota
 * savukkeet käyttävät, ja se ajetaan kerran jaksossa (oletus 3 s).
 */

/** Rollaavan ikkunan pituus (ms). */
export const PROFIILIN_JAKSO_MS = 3000;
/** Polku, johon yhteenveto lähetetään (sama origin). */
export const PROFIILIN_POLKU = '/__profiili';

const p = (x, n = 0) => (Number.isFinite(x) ? x.toFixed(n) : '—');

/**
 * Overlayn rivit tiivisteestä. PUHDAS funktio: ei DOMia, ei kelloa —
 * juuri tämä on se osa, joka voi mennä hiljaa rikki (kentän nimi
 * vaihtuu, luku puuttuu), joten se on testattavissa ilman selainta.
 *
 * @param {object} p0
 * @param {object} p0.tiiviste  __kehysprofiili.tiivista(tulos)
 * @param {object} [p0.asetukset] { veto, tarkkuus } valikkojen valinnat
 * @param {object} [p0.lepo]     lepopiirron tila()
 * @returns {string[]} rivit ylhäältä alas
 */
export function profiilirivit({ tiiviste, asetukset = {}, lepo = null } = {}) {
  if (!tiiviste || !tiiviste.kehyksia) return ['profiili: ei kehyksiä'];
  const pisin = tiiviste.pisimmat?.[0] ?? null;
  const rivit = [];
  if (pisin) {
    /*
     * PISIN KEHYS ON SE, JONKA OMISTAJA TUNTEE. Jakauma kertoo heti,
     * onko syy pääsäikeessä (varattu) vai odotuksessa: js = rAF-kutsut,
     * render = three.js, muu = tyyli, asettelu ja maalaus.
     */
    const muu = Math.max(0, (pisin.varattu ?? 0) - (pisin.js ?? 0));
    rivit.push(`pisin ${p(pisin.dt)} ms · varattu ${p(pisin.varattu)} `
      + `(js ${p(pisin.js)} · render ${p(pisin.render)} · muu ${p(muu)})`);
    rivit.push(`dc ${pisin.drawcalls ?? '—'} · scenessä ${pisin.scenessa ?? '—'} `
      + `· häipyy ${pisin.hapyvia ?? '—'} · taso ${pisin.taso ?? '—'} · rast ${pisin.rasterit ?? '—'}`);
  }
  const kutsut = (tiiviste.kutsut ?? []).slice(0, 3).map((k) => `${k.n} ${k.ms}`).join(' · ');
  rivit.push(`syy: ${kutsut || '—'}`);
  rivit.push(`med ${p(tiiviste.mediaani)} · p95 ${p(tiiviste.p95)} · >25 ms: `
    + `${tiiviste.yli25}/${tiiviste.kehyksia}`);
  const tila = [];
  if (asetukset.veto) tila.push(`veto ${asetukset.veto}`);
  if (asetukset.tarkkuus) tila.push(`tarkkuus ${asetukset.tarkkuus}`);
  if (lepo) {
    tila.push(`lepo ${lepo.paalla ? 'päällä' : 'pois'}${lepo.unessa ? ' (uni)' : ''}`);
    if (Number.isFinite(lepo.ohitettuja)) tila.push(`ohitettuja ${lepo.ohitettuja}`);
  }
  if (tila.length) rivit.push(tila.join(' · '));
  return rivit;
}

/**
 * Yhteenveto lähetystä varten. Pieni ja litteä: jsonl-rivi, joka kelpaa
 * suoraan taulukkoon — ei koko kehyslistaa, joka olisi satoja rivejä
 * jokaista jaksoa kohti.
 */
export function profiilitiiviste({ tiiviste, asetukset = {}, lepo = null, ua = '' } = {}) {
  const pisin = tiiviste?.pisimmat?.[0] ?? null;
  return {
    t: Date.now(),
    ua,
    kehyksia: tiiviste?.kehyksia ?? 0,
    mediaani: tiiviste?.mediaani ?? null,
    p95: tiiviste?.p95 ?? null,
    max: tiiviste?.max ?? null,
    yli25: tiiviste?.yli25 ?? null,
    yli50: tiiviste?.yli50 ?? null,
    varattuMed: tiiviste?.varattuMed ?? null,
    varattuP95: tiiviste?.varattuP95 ?? null,
    pitkatVarattuOsuus: tiiviste?.pitkatVarattuOsuus ?? null,
    kutsut: (tiiviste?.kutsut ?? []).slice(0, 8),
    pisin: pisin ? {
      dt: pisin.dt, varattu: pisin.varattu, js: pisin.js, render: pisin.render,
      drawcalls: pisin.drawcalls, scenessa: pisin.scenessa, hapyvia: pisin.hapyvia,
      taso: pisin.taso, rasterit: pisin.rasterit, paivityksia: pisin.paivityksia,
    } : null,
    asetukset,
    lepo: lepo ? {
      paalla: lepo.paalla, unessa: lepo.unessa, piirtoja: lepo.piirtoja, ohitettuja: lepo.ohitettuja,
    } : null,
  };
}

/**
 * Overlay ja lähetys. Palauttaa purkufunktion.
 *
 * @param {object} p0
 * @param {object} p0.profiili   globalThis.__kehysprofiili
 * @param {Element} p0.kotelo    pallon kotelo (overlay lisätään tähän)
 * @param {() => object} [p0.asetukset] valikkojen valinnat riville
 * @param {() => ?object} [p0.lepo]     lepopiirron tila()
 * @param {(data: object) => void} [p0.laheta] oma lähetin (testit)
 */
export function luoProfiilinaytto({
  profiili, kotelo, asetukset = () => ({}), lepo = () => null,
  jaksoMs = PROFIILIN_JAKSO_MS, laheta = null, ikkuna = globalThis,
} = {}) {
  const doc = kotelo?.ownerDocument ?? ikkuna.document;
  if (!profiili?.aloita || !doc?.createElement || !kotelo?.appendChild) return () => {};
  const kerros = doc.createElement('div');
  kerros.className = 'profiilinaytto';
  kerros.setAttribute('aria-hidden', 'true');
  kotelo.appendChild(kerros);

  /*
   * LÄHETYS ON HILJAINEN. Tuotanto-osoitteessa polkua ei ole, ja se on
   * odotettu tila — virhe ei saa päätyä konsoliin asti, koska sama
   * lippu on omistajan käsissä puhelimella.
   */
  const lahetaOletus = (data) => {
    try {
      ikkuna.fetch?.(PROFIILIN_POLKU, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      })?.catch?.(() => {});
    } catch { /* ei palvelinta */ }
  };
  const lahetin = laheta ?? lahetaOletus;

  let purettu = false;
  let ajastin = 0;
  const jakso = () => {
    if (purettu) return;
    let tiiviste = null;
    try {
      const tulos = profiili.lopeta();
      tiiviste = profiili.tiivista(tulos);
    } catch { tiiviste = null; }
    const nykyAsetukset = (() => { try { return asetukset() ?? {}; } catch { return {}; } })();
    const nykyLepo = (() => { try { return lepo() ?? null; } catch { return null; } })();
    kerros.textContent = '';
    for (const rivi of profiilirivit({ tiiviste, asetukset: nykyAsetukset, lepo: nykyLepo })) {
      const r = doc.createElement('div');
      r.textContent = rivi;
      kerros.appendChild(r);
    }
    if (tiiviste?.kehyksia) {
      lahetin(profiilitiiviste({
        tiiviste, asetukset: nykyAsetukset, lepo: nykyLepo, ua: ikkuna.navigator?.userAgent ?? '',
      }));
    }
    try { profiili.aloita(); } catch { /* ei mittausta */ }
    ajastin = ikkuna.setTimeout(jakso, jaksoMs);
  };
  try { profiili.aloita(); } catch { /* ei mittausta */ }
  ajastin = ikkuna.setTimeout(jakso, jaksoMs);

  return () => {
    if (purettu) return;
    purettu = true;
    ikkuna.clearTimeout(ajastin);
    try { profiili.lopeta(); } catch { /* jo suljettu */ }
    kerros.remove();
  };
}
