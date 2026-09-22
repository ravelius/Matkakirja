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
/**
 * Kehysprofiilin (mittarin) versio overlayn ylimmälle riville. NOSTA
 * aina, kun jonkin luvun merkitys muuttuu (v2124: rollaava ikkuna,
 * v2126: valmistumisviive, 22.9.2026 ilta: koetila riville) — muuten
 * eri päivien kaappauksia verrataan kuin ne mittaisivat samaa.
 */
export const PROFIILIN_VERSIO = 3;

/**
 * Koeliput overlayn nimeksi: `profiili` (itse näyttö) pois, loput
 * aakkosjärjestyksessä; ei yhtään = `normaali` (sama kuin valikon oletus).
 */
export function koetilanNimi(kokeet) {
  const nimet = [...(kokeet ?? [])].filter((k) => k && k !== 'profiili').sort();
  return nimet.length ? nimet.join(',') : 'normaali';
}

/**
 * YLIN RIVI: missä tilassa peli oli (omistajan kaappaukset Fablen kautta
 * 22.9.2026: ilman tätä kaappausta ei voinut kohdistaa kokeeseen).
 * `koe` on latauksessa voimaan tullut tila — kokeet luetaan kerrosten
 * luonnissa — ja `seuraava` valikon nykyinen valinta, jos se eroaa.
 */
export function koetilarivi({ koe, seuraava = null, versio = '' } = {}) {
  const nyt = koe || 'normaali';
  const vaihto = seuraava && seuraava !== nyt ? ` (seuraavassa latauksessa: ${seuraava})` : '';
  return `koe: ${nyt}${vaihto} · profiili p${PROFIILIN_VERSIO}${versio ? ` · ${versio}` : ''}`;
}

const p = (x, n = 0) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const prosenttipiste = (arvot, q) => {
  if (!arvot.length) return NaN;
  const s = [...arvot].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * (s.length - 1)))];
};

/**
 * RAAKA rAF-TAHTI JA PIIRTOJEN OSUUS (omistajan iPhone-havainto
 * 22.9.2026: nykiminen on tasaista koko vedon ajan, eikä se ole
 * syöteputki, dpr eikä laattojen saapuminen — Fablen hypoteesi:
 * rAF käy 120 Hz:ssä ja peli piirtää ~60, jolloin joka toinen kehys
 * putoaa epätasaisesti).
 *
 * Kehysprofiilin oma askel on rAF-ketjussa joka kehyksellä, joten sen
 * `dt` ON raaka rAF-väli — mediaani kertoo suoraan, onko näyttö 60 vai
 * 120 Hz. Piirtojen osuus luetaan lepopiirron laskureista (piirtoja /
 * ohitettuja) jakson yli, koska juuri se kerros päättää, piirretäänkö
 * kehys — kolmiulotteisen `render`-kääre kirjaa ajan myös ohitetusta
 * kutsusta eikä siksi kelpaa mittariksi.
 *
 * PUHDAS: kehykset sisään, luvut ulos.
 *
 * @param {object} tulos  __kehysprofiili.lopeta()
 * @param {?object} [lepoDelta] { piirtoja, ohitettuja } jakson yli
 */
export function profiiliTahti(tulos, lepoDelta = null) {
  const kehykset = tulos?.kehykset ?? [];
  const dts = kehykset.map((k) => k.dt).filter((d) => Number.isFinite(d) && d > 0);
  const dtP50 = prosenttipiste(dts, 0.5);
  /*
   * PITKÄT KEHYKSET: PIIRRETTY VAI OHITETTU (Fablen kysymys 22.9.2026).
   * Lepopiirron laskurit ovat kumulatiivisia, joten kehyksen oma vastaus
   * on edelliseen kehykseen verrattu erotus. Jos pitkät kehykset ovat
   * ohitettuja, vika on tickin tauossa; jos piirrettyjä, se on työssä.
   */
  let pitkatPiirretty = 0;
  let pitkatOhitettu = 0;
  /*
   * SILMUKOIDEN MÄÄRÄ JA LAATTAVIENNIT (Fable 22.9.2026). Käärityt
   * rAF-takaisinkutsut kehyksessä = elossa olevat silmukat (kirjaston
   * tick, lepopiirron kello, kartan liike, mittaus itse); laattaviennit
   * = `paivityksia`-laskurin kasvu jakson yli, eli montako laattaa
   * vietiin GPU:lle mitattuna aikana.
   */
  const kutsuja = kehykset.map((k) => k.rafKutsuja ?? 0).filter((n) => n > 0);
  const ketjuja = kutsuja.length ? kutsuja.reduce((a, b) => a + b, 0) / kutsuja.length : null;
  /** Kumulatiivisen laskurin kasvu jakson yli (null, jos laskuria ei ole). */
  const kasvu = (kentta) => {
    const eka = kehykset.find((k) => Number.isFinite(k[kentta]))?.[kentta] ?? null;
    const vika = [...kehykset].reverse().find((k) => Number.isFinite(k[kentta]))?.[kentta] ?? null;
    return Number.isFinite(eka) && Number.isFinite(vika) ? vika - eka : null;
  };
  const vienteja = kasvu('paivityksia');
  const kehyksiaN = Math.max(1, kehykset.length);
  const puskuriKehys = kasvu('puskurikirjoituksia') != null ? kasvu('puskurikirjoituksia') / kehyksiaN : null;
  const uniformiKehys = kasvu('uniformeja') != null ? kasvu('uniformeja') / kehyksiaN : null;
  const glVienteja = kasvu('glVienteja');
  for (let i = 1; i < kehykset.length; i += 1) {
    const k = kehykset[i];
    if (!(k.dt > 25)) continue;
    const edel = kehykset[i - 1];
    if (!Number.isFinite(k.piirtolaskuri) || !Number.isFinite(edel?.piirtolaskuri)) continue;
    if (k.piirtolaskuri > edel.piirtolaskuri) pitkatPiirretty += 1; else pitkatOhitettu += 1;
  }
  const piirtoja = lepoDelta?.piirtoja ?? null;
  const ohitettuja = lepoDelta?.ohitettuja ?? null;
  const yhteensa = Number.isFinite(piirtoja) && Number.isFinite(ohitettuja) ? piirtoja + ohitettuja : null;
  return {
    kehyksia: dts.length,
    hz: Number.isFinite(dtP50) && dtP50 > 0 ? Math.round(1000 / dtP50) : null,
    dtP50,
    dtP95: prosenttipiste(dts, 0.95),
    dtMax: dts.length ? Math.max(...dts) : NaN,
    yli20: dts.filter((d) => d > 20).length,
    jsKa: kehykset.length ? kehykset.reduce((a, k) => a + (k.js ?? 0), 0) / kehykset.length : NaN,
    renderKa: kehykset.length ? kehykset.reduce((a, k) => a + (k.render ?? 0), 0) / kehykset.length : NaN,
    piirtoja,
    ohitettuja,
    piirtoOsuus: yhteensa ? piirtoja / yhteensa : null,
    pitkatPiirretty,
    pitkatOhitettu,
    ketjuja,
    vienteja,
    puskuriKehys,
    uniformiKehys,
    glVienteja,
    /*
     * KEHYKSEN VALMISTUMISVIIVE (Fable 22.9.2026): rAF-väli miinus se
     * aika, jonka pääsäie oli mitattavasti töissä. Safarissa ei ole
     * EXT_disjoint_timer_query_webgl2:ta, joten tämä on paras saatava
     * arvio GPU:n ja komposiittorin osuudesta: jos js ja render ovat
     * ~0 mutta dt on 50 ms, aika kuluu kehyksen valmistumiseen.
     */
    viiveKa: kehykset.length
      ? kehykset.reduce((a, k) => a + Math.max(0, (k.dt ?? 0) - (k.js ?? 0) - (k.render ?? 0)), 0) / kehykset.length
      : NaN,
  };
}


/**
 * Overlayn rivit tiivisteestä. PUHDAS funktio: ei DOMia, ei kelloa —
 * juuri tämä on se osa, joka voi mennä hiljaa rikki (kentän nimi
 * vaihtuu, luku puuttuu), joten se on testattavissa ilman selainta.
 *
 * @param {object} p0
 * @param {object} p0.tiiviste  __kehysprofiili.tiivista(tulos)
 * @param {object} [p0.asetukset] { veto, tarkkuus } valikkojen valinnat
 * @param {object} [p0.lepo]     lepopiirron tila()
 * @param {object} [p0.tila]     { koe, seuraava, versio } ks. koetilarivi
 * @returns {string[]} rivit ylhäältä alas
 */
export function profiilirivit({
  tiiviste, asetukset = {}, lepo = null, tahti = null, tila: koetila = {},
} = {}) {
  const rivit = [koetilarivi(koetila ?? {})];
  if (!tiiviste || !tiiviste.kehyksia) return [...rivit, 'profiili: ei kehyksiä'];
  const pisin = tiiviste.pisimmat?.[0] ?? null;
  if (tahti) {
    /*
     * TÄRKEIN MITTAUSRIVI HETI TILAN JÄLKEEN: näytön tahti ja se, piirretäänkö JOKA
     * rAF-kehys. Jos rAF on 120 Hz ja piirto-osuus on noin puolet,
     * nykiminen on tahdin eikä kuorman vika.
     */
    const piirto = tahti.piirtoOsuus == null
      ? 'piirto —'
      : `piirto ${tahti.piirtoja}/${tahti.piirtoja + tahti.ohitettuja} (${Math.round(tahti.piirtoOsuus * 100)} %)`;
    rivit.push(`rAF ${tahti.hz ?? '—'} Hz (dt p50 ${p(tahti.dtP50, 1)}) · ${piirto}`);
    rivit.push(`dt p95 ${p(tahti.dtP95, 1)} · max ${p(tahti.dtMax)} · >20 ms: ${tahti.yli20}/${tahti.kehyksia}`
      + ` · js ka ${p(tahti.jsKa, 1)} · render ka ${p(tahti.renderKa, 1)}`);
    if (tahti.pitkatPiirretty + tahti.pitkatOhitettu > 0) {
      rivit.push(`pitkät (>25 ms): piirretty ${tahti.pitkatPiirretty} · ohitettu ${tahti.pitkatOhitettu}`);
    }
    rivit.push(`silmukoita ${p(tahti.ketjuja, 1)} · laattavientejä ${tahti.vienteja ?? '—'}`
      + ` · valmistumisviive ${p(tahti.viiveKa, 1)} ms`);
    if (tahti.puskuriKehys != null || tahti.uniformiKehys != null) {
      rivit.push(`puskurikirj./kehys ${p(tahti.puskuriKehys, 2)} · uniformeja/kehys ${p(tahti.uniformiKehys, 1)}`
        + ` · GL-vientejä ${tahti.glVienteja ?? '—'}`);
    }
  }
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
export function profiilitiiviste({
  tiiviste, asetukset = {}, lepo = null, ua = '', tahti = null, tila: koetila = {},
} = {}) {
  const pisin = tiiviste?.pisimmat?.[0] ?? null;
  return {
    t: Date.now(),
    ua,
    koe: koetila?.koe || 'normaali',
    koeSeuraava: koetila?.seuraava ?? null,
    profiiliVersio: PROFIILIN_VERSIO,
    versio: koetila?.versio ?? '',
    tahti: tahti ? {
      hz: tahti.hz, dtP50: tahti.dtP50, dtP95: tahti.dtP95, dtMax: tahti.dtMax, yli20: tahti.yli20,
      jsKa: tahti.jsKa, renderKa: tahti.renderKa,
      piirtoja: tahti.piirtoja, ohitettuja: tahti.ohitettuja, piirtoOsuus: tahti.piirtoOsuus,
      pitkatPiirretty: tahti.pitkatPiirretty, pitkatOhitettu: tahti.pitkatOhitettu,
      ketjuja: tahti.ketjuja, vienteja: tahti.vienteja, viiveKa: tahti.viiveKa,
      puskuriKehys: tahti.puskuriKehys, uniformiKehys: tahti.uniformiKehys, glVienteja: tahti.glVienteja,
    } : null,
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
 * @param {() => ?object} [p0.tila]     { koe, seuraava, versio } ylimmälle riville
 * @param {(data: object) => void} [p0.laheta] oma lähetin (testit)
 */
export function luoProfiilinaytto({
  profiili, kotelo, asetukset = () => ({}), lepo = () => null, tila = () => null,
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
  /*
   * Lepopiirron laskurit ovat KUMULATIIVISIA, joten jakson piirrot ja
   * ohitukset ovat kahden lukeman erotus. Ensimmäinen jakso vertaa
   * asennushetkeen.
   */
  const lueLepo = () => { try { return lepo() ?? null; } catch { return null; } };
  let edellinenLepo = lueLepo();
  const lepoDelta = (nyt) => {
    if (!nyt || !edellinenLepo) return null;
    const d = {
      piirtoja: (nyt.piirtoja ?? 0) - (edellinenLepo.piirtoja ?? 0),
      ohitettuja: (nyt.ohitettuja ?? 0) - (edellinenLepo.ohitettuja ?? 0),
    };
    return d.piirtoja >= 0 && d.ohitettuja >= 0 ? d : null;
  };
  const jakso = () => {
    if (purettu) return;
    let tiiviste = null;
    let tahti = null;
    const nykyLepo = lueLepo();
    try {
      const tulos = profiili.lopeta();
      tiiviste = profiili.tiivista(tulos);
      tahti = profiiliTahti(tulos, lepoDelta(nykyLepo));
    } catch { tiiviste = null; }
    edellinenLepo = nykyLepo;
    const nykyAsetukset = (() => { try { return asetukset() ?? {}; } catch { return {}; } })();
    const nykyTila = (() => { try { return tila() ?? {}; } catch { return {}; } })();
    kerros.textContent = '';
    for (const rivi of profiilirivit({
      tiiviste, asetukset: nykyAsetukset, lepo: nykyLepo, tahti, tila: nykyTila,
    })) {
      const r = doc.createElement('div');
      r.textContent = rivi;
      kerros.appendChild(r);
    }
    if (tiiviste?.kehyksia) {
      lahetin(profiilitiiviste({
        tiiviste, asetukset: nykyAsetukset, lepo: nykyLepo, tahti, tila: nykyTila, ua: ikkuna.navigator?.userAgent ?? '',
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
