/*
 * AIKASELAIN — LINSSIEN YHTEINEN AIKANAUHA RUUDUN ALAREUNAAN.
 *
 * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN" (omistaja 7.9.2026 ilta
 * klo 20.55, sanatarkasti):
 *
 *   *"Onko alas mahdollista tehdä yksinkertaista aikaselainta, mikä
 *   olisi täynnä pystyviivoja ja valittu aika olisi pidempi viiva?
 *   Siitä olisi nopea sormella valita aikapiste ja kelata esityksen
 *   eri vaiheita ja projisoida levinneisyyttä maapallolla. Vuosiluku
 *   saa säilyä ylhäällä mutta se voisi toistua pienellä sen
 *   korkeamman viivan päällä. … Korkean viivan viereiset viivat
 *   voisivat olla vähän koholla. … Sama elementti toimisi
 *   tulevissakin linsseissä."*
 *
 * ── MODUULI EI TIEDÄ KAARESTA MITÄÄN ──────────────────────────────
 *
 * Tämä on PELKKÄ PINTA. Se ei tunne kelloa, vanoja, kameraa eikä
 * kertomusta: se saa listan pisteitä ja kertoo kutsujalle, mihin
 * sormi osoittaa. Sama elementti kelpaa siksi kertomuskaarelle
 * (Ihmisen matka), pysäkkiajolle (keksinnöt) ja tuleville linsseille
 * — kytkentä tehdään kutsupaikassa, ei täällä.
 *
 *   luoAikaselain({ pisteet, nykyinen, onEsikatselu, onValinta })
 *     pisteet      [{ id, otsikko, vuosia }] JAKSOJÄRJESTYKSESSÄ
 *     nykyinen     valitun pisteen id (tai null)
 *     onEsikatselu (id, osuus) sormen liikkuessa: id on lähin piste ja
 *                  osuus JATKUVA sijainti nauhalla (0 = ensimmäinen
 *                  viiva, 1 = viimeinen). Kutsuja päättää, mitä
 *                  välisijainti tarkoittaa — vuosiluvun tulkinta ei
 *                  kuulu selaimelle.
 *     onValinta    (id) sormen irrotessa tai napautuksesta
 *     teksti       (vuosia) → vuosiluvun muoto valitun viivan päällä;
 *                  oletus "50 000" (kutsuja antaa kellon oman muodon)
 *   → { el, aseta(id), tila(), pura() }
 *
 * ── VIIVAT OVAT JAKSOJÄRJESTYKSESSÄ, EIVÄT AJASSA ─────────────────
 *
 * Välit ovat tasan yhtä suuret. Aika on epälineaarinen (Ihmisen matkan
 * kaari kulkee 300 000 vuodesta nollaan ja kelaa kahdesti taaksepäin),
 * eikä ajan mukaan sijoitettu nauha olisi selattava: ensimmäiset
 * kaksikymmentä jaksoa kasautuisivat vasempaan laitaan. Nauha on siis
 * KERTOMUKSEN sisällysluettelo, ei mittatikku.
 *
 * ── AALTO ─────────────────────────────────────────────────────────
 *
 * Valittu viiva on selvästi korkein, ja sen naapurit nousevat
 * laskevana aaltona (aallonTaso) — omistajan "suurennuslasi sormelle".
 * Kaikki liike on CSS-siirtymiä (Raamattu: kaikki liike pehmeästi);
 * `prefers-reduced-motion` katkaisee ne luokalla `ei-liiketta`.
 *
 * ── YKSI KOSKETUSPINTA ────────────────────────────────────────────
 *
 * Koko nauha on yksi pinta, ei kahtakymmentä nappia: sormi tarttuu
 * mihin tahansa ja vetää. Osoitin OTETAAN KIINNI (setPointerCapture),
 * jolloin veto pysyy nauhalla, vaikka sormi lipsahtaisi kartan päälle
 * — ja `touch-action: none` (css) estää selainta tulkitsemasta vetoa
 * vieritykseksi. Tapahtumat pysäytetään (stopPropagation), jottei
 * pallo saa niitä panorointina; nauhan ULKOPUOLELLA selain ei kuuntele
 * mitään, joten pallon oma panorointi on ennallaan.
 */

/** Montako viivaa kummallakin puolella nousee valitun mukana. */
export const AALLON_LEVEYS = 3;

/**
 * Aallon korkeus etäisyydellä `d` valitusta viivasta (0…1).
 *
 * PUHDAS FUNKTIO (tests/aikaselain.test.mjs). Kosinipehmennys eikä
 * porras: viereiset viivat laskevat tasaisesti nollaan, jolloin
 * nauha näyttää suurennuslasilta eikä portaikolta.
 */
export function aallonTaso(d, leveys = AALLON_LEVEYS) {
  const etaisyys = Math.abs(Number(d) || 0);
  if (!(leveys > 0)) return etaisyys === 0 ? 1 : 0;
  if (etaisyys > leveys) return 0;
  return (Math.cos((etaisyys / (leveys + 1)) * Math.PI) + 1) / 2;
}

/**
 * Viivan keskikohta nauhalla prosentteina.
 *
 * PUHDAS FUNKTIO. Viivat jaetaan tasavälein niin, että ensimmäisen ja
 * viimeisen ulkopuolelle jää puoli väliä — muuten laidan viiva olisi
 * kiinni reunassa eikä sitä voisi napauttaa sormella.
 */
export function viivanPaikka(i, maara) {
  if (!(maara > 0)) return 0;
  return ((Number(i) + 0.5) / maara) * 100;
}

/**
 * Sormen paikka nauhalla jatkuvana osuutena 0…1.
 *
 * PUHDAS FUNKTIO. `x` on etäisyys nauhan vasemmasta laidasta, `leveys`
 * nauhan leveys ja `maara` viivojen määrä. Nolla osuu ensimmäisen
 * viivan keskikohtaan ja yksi viimeisen — laidan puolikkaat välit
 * kuuluvat siis laidan viivalle, kuten sormi olettaa.
 */
export function osuusPaikasta(x, leveys, maara) {
  if (!(maara > 1) || !(leveys > 0)) return 0;
  const vali = leveys / maara;
  const matka = (maara - 1) * vali;
  return Math.max(0, Math.min(1, (Number(x) - vali / 2) / matka));
}

/**
 * Lähin viiva jatkuvasta osuudesta.
 *
 * PUHDAS FUNKTIO.
 */
export function lahinIndeksi(osuus, maara) {
  if (!(maara > 0)) return -1;
  const t = Math.max(0, Math.min(1, Number(osuus) || 0)) * (maara - 1);
  return Math.max(0, Math.min(maara - 1, Math.round(t)));
}

/** Vuosiluvun oletusmuoto: tuhaterotin, ei yksikköä (kutsuja antaa omansa). */
function oletusTeksti(vuosia) {
  const v = Number(vuosia);
  if (!Number.isFinite(v)) return '';
  return String(Math.round(Math.abs(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function solmu(tag, luokka) {
  const el = document.createElement(tag);
  if (luokka) el.className = luokka;
  return el;
}

/**
 * Aikaselain yhdelle ajolle.
 *
 * @param {object} asetukset
 * @param {Array<{id:string, otsikko?:string, vuosia?:number}>} asetukset.pisteet
 * @param {string|null} [asetukset.nykyinen] valittu piste
 * @param {(id:string, osuus:number) => void} [asetukset.onEsikatselu]
 * @param {(id:string) => void} [asetukset.onValinta]
 * @param {(vuosia:number) => string} [asetukset.teksti] vuosiluvun muoto
 * @param {string} [asetukset.nimi] aria-label
 * @param {boolean} [asetukset.reducedMotion]
 * @returns {{el: Element, aseta: (id: string|null) => void,
 *   tila: () => object, pura: () => void}|null}
 */
export function luoAikaselain({
  pisteet = [],
  nykyinen = null,
  onEsikatselu = null,
  onValinta = null,
  teksti = oletusTeksti,
  nimi = 'Aikaselain',
  reducedMotion = false,
} = {}) {
  if (typeof document === 'undefined') return null;
  const lista = pisteet.filter((p) => p && p.id != null);
  if (!lista.length) return null;

  const el = solmu('div', 'aikaselain');
  el.setAttribute('role', 'slider');
  el.setAttribute('aria-label', nimi);
  el.setAttribute('aria-valuemin', '1');
  el.setAttribute('aria-valuemax', String(lista.length));
  el.tabIndex = 0;
  if (reducedMotion) el.classList.add('ei-liiketta');

  const rivi = solmu('div', 'aikaselain-viivat');
  const viivat = lista.map((piste, i) => {
    const v = solmu('span', 'aikaselain-viiva');
    v.style.setProperty('left', `${viivanPaikka(i, lista.length)}%`);
    v.style.setProperty('--taso', '0');
    v.dataset.id = String(piste.id);
    v.setAttribute('aria-hidden', 'true');
    rivi.appendChild(v);
    return v;
  });
  el.appendChild(rivi);

  const vuosilaatikko = solmu('div', 'aikaselain-vuosi');
  vuosilaatikko.setAttribute('aria-hidden', 'true');
  el.appendChild(vuosilaatikko);

  const tila = {
    valittu: -1,
    /** Esikatseltu viiva vedon aikana (irrotessa siitä tulee valinta). */
    esikatselu: -1,
    vedossa: false,
    osoitin: null,
    purettu: false,
    /** Mittarit savukkeelle ja testeille. */
    esikatseluja: 0,
    valintoja: 0,
  };

  /** Aalto ja vuosiluku annetun viivan ympärille. */
  const piirra = (i) => {
    for (let k = 0; k < viivat.length; k += 1) {
      const taso = aallonTaso(k - i);
      viivat[k].style.setProperty('--taso', String(Math.round(taso * 1000) / 1000));
      viivat[k].classList.toggle('valittu', k === i);
    }
    const piste = lista[i];
    vuosilaatikko.style.setProperty('left', `${viivanPaikka(i, lista.length)}%`);
    vuosilaatikko.textContent = piste ? teksti(piste.vuosia) : '';
    el.setAttribute('aria-valuenow', String(i + 1));
    el.setAttribute('aria-valuetext', `${piste?.otsikko ?? piste?.id ?? ''}: ${vuosilaatikko.textContent}`);
  };

  /** Näytetty viiva: vedon aikana esikatselu, muuten valinta. */
  const nakyva = () => (tila.esikatselu >= 0 ? tila.esikatselu : tila.valittu);

  const osuusTapahtumasta = (e) => {
    const laatikko = el.getBoundingClientRect?.();
    if (!laatikko || !(laatikko.width > 0)) return 0;
    return osuusPaikasta(e.clientX - laatikko.left, laatikko.width, lista.length);
  };

  const esikatsele = (e) => {
    const osuus = osuusTapahtumasta(e);
    const i = lahinIndeksi(osuus, lista.length);
    if (i !== tila.esikatselu) {
      tila.esikatselu = i;
      piirra(i);
    }
    tila.esikatseluja += 1;
    onEsikatselu?.(lista[i].id, osuus);
  };

  const paataVeto = () => {
    if (!tila.vedossa) return;
    tila.vedossa = false;
    try { el.releasePointerCapture?.(tila.osoitin); } catch { /* osoitin oli jo poissa */ }
    tila.osoitin = null;
    const i = tila.esikatselu;
    tila.esikatselu = -1;
    if (i < 0) return;
    tila.valittu = i;
    piirra(i);
    tila.valintoja += 1;
    onValinta?.(lista[i].id);
  };

  const alku = (e) => {
    if (tila.purettu) return;
    // Nauha omii vedon: pallo ei saa panoroida sen alla, eikä selain
    // ota mitään nauhan ulkopuolelta.
    e.preventDefault?.();
    e.stopPropagation?.();
    tila.vedossa = true;
    tila.osoitin = e.pointerId;
    try { el.setPointerCapture?.(e.pointerId); } catch { /* ei kaappausta: veto toimii silti */ }
    el.classList.add('vedossa');
    esikatsele(e);
  };

  const liike = (e) => {
    if (!tila.vedossa || tila.purettu) return;
    e.preventDefault?.();
    e.stopPropagation?.();
    esikatsele(e);
  };

  const loppu = (e) => {
    if (!tila.vedossa || tila.purettu) return;
    e.preventDefault?.();
    e.stopPropagation?.();
    el.classList.remove('vedossa');
    /*
     * IRROTUSKOHTA ON SE, JOKA VALITAAN. Sormi voi liikahtaa vielä
     * viimeisen `pointermove`-tapahtuman jälkeen — ja nopeassa
     * napautuksessa liikettä ei tule lainkaan — joten valinta luetaan
     * irrotustapahtumasta eikä viimeisestä esikatselusta.
     */
    if (Number.isFinite(e.clientX)) esikatsele(e);
    paataVeto();
  };

  /*
   * NÄPPÄIMISTÖ: nuolet siirtävät valintaa yhden viivan. Kertomuskaari
   * ei käytä nuolia mihinkään muuhun (js/aikajana.js nappain palaa
   * esityksessä heti), joten tämä ei vie mitään pois — ja nauha on
   * ainoa ohjain, jolla ilman sitä ei pärjäisi näppäimistöllä.
   */
  const nappain = (e) => {
    if (tila.purettu) return;
    const suunta = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
    if (!suunta) return;
    e.preventDefault?.();
    e.stopPropagation?.();
    const i = Math.max(0, Math.min(lista.length - 1, (nakyva() < 0 ? 0 : nakyva()) + suunta));
    tila.esikatselu = -1;
    tila.valittu = i;
    piirra(i);
    tila.valintoja += 1;
    onValinta?.(lista[i].id);
  };

  el.addEventListener('pointerdown', alku);
  el.addEventListener('pointermove', liike);
  el.addEventListener('pointerup', loppu);
  el.addEventListener('pointercancel', loppu);
  el.addEventListener('keydown', nappain);

  const aseta = (id) => {
    const i = lista.findIndex((p) => String(p.id) === String(id));
    if (i < 0) return false;
    tila.valittu = i;
    // Veto on pelaajan käsissä: esitys ei saa nykiä nauhaa kesken vedon.
    if (!tila.vedossa) piirra(i);
    return true;
  };
  if (nykyinen != null) aseta(nykyinen);
  else piirra(0);

  return {
    el,
    aseta,
    /** Mittarit savukkeelle ja testeille. */
    tila: () => ({
      pisteita: lista.length,
      valittu: tila.valittu >= 0 ? lista[tila.valittu].id : null,
      esikatselu: tila.esikatselu >= 0 ? lista[tila.esikatselu].id : null,
      vedossa: tila.vedossa,
      esikatseluja: tila.esikatseluja,
      valintoja: tila.valintoja,
      vuosi: vuosilaatikko.textContent,
      tasot: viivat.map((v) => Number(v.style.getPropertyValue('--taso'))),
    }),
    pura: () => {
      tila.purettu = true;
      el.removeEventListener('pointerdown', alku);
      el.removeEventListener('pointermove', liike);
      el.removeEventListener('pointerup', loppu);
      el.removeEventListener('pointercancel', loppu);
      el.removeEventListener('keydown', nappain);
      el.remove();
    },
  };
}
