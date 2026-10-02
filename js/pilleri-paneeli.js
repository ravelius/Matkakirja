/**
 * PILLERIVALIKKO PANEELI-POHJALLA (Natiivi-UI 1.10.2026; natiivin järjestys, omistaja 29.9.2026, 1.0.56):
 *
 *   ÄÄNET [Kertoja | Musiikki | Äänimaisema] → [Matka | Aarteet | Linssit] → [Uusi peli | Asetukset] → versio
 *   Asetukset-alinäkymä: Äänentasot (liu'ut), Kartta (kytkimet), Muut (Ehdota sisältöä)
 *   Matka-alinäkymä: pillerin tiedot (sijainti, kukkaro, tietäjätaso, tilastot)
 *
 * Olemassa oleva #paavalikko PUETAAN ja järjestetään kerran: elementit siirtyvät uusiin ryhmiin, mutta tunnisteet,
 * kuuntelijat ja tilan päivitykset (js/main.js, js/ui.js) pysyvät ennallaan. Peruttava: ?paneeli=vanha tai
 * localStorage matkakirja-paneeli=vanha. Retkikunta-nappia ei ole webissä vielä: retkikunta asuu palautekortissa.
 */
import { pohjatLataaTyyli } from './pohjat/pohjat.js';

const PANEELI_POHJA = true;

/** Onko pillerivalikko PANEELI-pohjalla (oletus kyllä; ?paneeli=vanha palauttaa vanhan). */
export function paneeliPohjalla() {
  try {
    const valinta = new URLSearchParams(globalThis.location?.search ?? '').get('paneeli')
      ?? globalThis.localStorage?.getItem('matkakirja-paneeli');
    if (valinta === 'vanha') return false;
    if (valinta === 'pohja') return true;
  } catch { /* yksityinen selaus */ }
  return PANEELI_POHJA;
}

/*
 * VALIKKO V2 (omistaja 2.10.2026: vedos klo 14.0x, hyväksytty muutoksin klo 14.37 ja tarkennus heti perään; oletus,
 * vanha järjestys ?valikko=vanha tai localStorage matkakirja-valikko=vanha): ÄÄNET (kevyt kytkinrivi, päällä =
 * pehmeä pergamenttitäyttö ilman tummaa reunaa) → tasorivi ilman otsikkoa (avatar ja "Untuvikko (80 tp)", avaa
 * tasonäkymän) → MATKALAUKKU [Aarteet (N), Julisteet (N)] → PELI [Retkikunta, Asetukset] → alarivi yhdellä rivillä
 * (Uusi peli vasemmalla, ↻ ja versio oikealla). Luettelorivit: ikoni, nimi, nuoli, ohut viiva välissä. Ei kapseleita
 * (EI OVAALEJA 2.10.). Linssit lähtee valikosta omaksi kartan napikseen (omistaja 13.56, erillinen erä).
 */
export function valikkoV2() {
  try {
    const valinta = new URLSearchParams(globalThis.location?.search ?? '').get('valikko')
      ?? globalThis.localStorage?.getItem('matkakirja-valikko');
    return valinta !== 'vanha';
  } catch { return true; }
}

/** Navigointirivin viivaikonit (24 × 24, viiva currentColor; samat kuin tyylikirjasivun esimerkissä). */
const PILLERI_IKONI = {
  matka: '<circle cx="7" cy="7" r="2"/><path d="M9 7h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8"/>',
  aarteet: '<path d="M4 11h16v7H4zM4 11a8 5 0 0 1 16 0M10.5 13.5h3"/>',
  linssit: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/>',
  julisteet: '<path d="M6 3.5h12v17H6z"/><path d="M8.5 7h7M8.5 10h7"/><path d="m8.5 17 2.5-3.5 2 2.5 1.5-1.5 1 2.5"/>',
  retkikunta: '<circle cx="8.5" cy="8" r="2.5"/><circle cx="15.5" cy="8" r="2.5"/><path d="M3.5 19c.6-3.4 2.6-5.2 5-5.2s4.4 1.8 5 5.2M10.5 19c.6-3.4 2.6-5.2 5-5.2s4.4 1.8 5 5.2"/>',
  asetukset: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M6 18l1.8-1.8M16.2 7.8 18 6"/>',
};

function pilleriSolmu(tagi, luokka, teksti) {
  const e = document.createElement(tagi);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** Navigointi- tai toimintonappi segmenttiriviin: ikoni + nimi, vanha tunniste säilyy. */
function puePilleriNappi(nappi, nimi, ikoni = '') {
  nappi.className = 'tk-paneeli-rivi tk-paneeli-rivi--navigointi';
  nappi.textContent = '';
  if (ikoni) {
    const kehys = pilleriSolmu('span', 'tk-paneeli-ikoni');
    kehys.setAttribute('aria-hidden', 'true');
    kehys.innerHTML = `<svg viewBox="0 0 24 24" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ikoni}</svg>`;
    nappi.appendChild(kehys);
  }
  nappi.appendChild(pilleriSolmu('span', 'tk-paneeli-rivi__nimi', nimi));
  return nappi;
}

/** V2-luettelorivi: navigointi + nuoli oikeaan reunaan. */
function pueLuetteloRivi(nappi, nimi, ikoni) {
  puePilleriNappi(nappi, nimi, ikoni);
  const nuoli = pilleriSolmu('span', 'tk-paneeli-rivi__nuoli', '›');
  nuoli.setAttribute('aria-hidden', 'true');
  nappi.appendChild(nuoli);
  return nappi;
}

/** Kytkinrivit (.aanikytkin): pohjan luokat, mutta tilarivin luokka pysyy (js/main.js päivittää sen). */
function puePilleriKytkimet(ryhma) {
  for (const rivi of ryhma.querySelectorAll('button[role="switch"]')) {
    const valittu = rivi.classList.contains('valittu');
    rivi.className = `tk-paneeli-rivi tk-paneeli-rivi--kytkin${valittu ? ' valittu' : ''}`;
    rivi.querySelector('.viiva-ikoni')?.classList.add('tk-paneeli-ikoni');
    rivi.querySelector('.aanikytkin-nimi')?.classList.add('tk-paneeli-rivi__nimi');
    rivi.querySelector('.aanikytkin-tila')?.classList.add('tk-paneeli-rivi__tila');
  }
}

/** Alinäkymän ylärivi: ‹ Takaisin ja kapiteeli (sama kuin Linssit- ja Aarteet-näkymissä). */
function puePilleriYlarivi(nakyma) {
  const yla = nakyma.querySelector('.pilleri-alanakyma-otsikko');
  if (!yla) return;
  yla.classList.add('tk-paneeli__yla');
  yla.querySelector('.pilleri-takaisin')?.classList.add('tk-paneeli__takaisin');
  const h = yla.querySelector('h2');
  if (h) h.className = 'tk-kapiteeli';
}

function uusiPilleriNakyma(tunnus, otsikko, haeUi) {
  const nakyma = pilleriSolmu('div', 'pilleri-alanakyma');
  nakyma.id = tunnus;
  nakyma.hidden = true;
  const yla = pilleriSolmu('div', 'pilleri-alanakyma-otsikko');
  const takaisin = pilleriSolmu('button', 'pilleri-takaisin', '‹ Takaisin');
  takaisin.type = 'button';
  takaisin.setAttribute('aria-label', 'Takaisin valikkoon');
  takaisin.addEventListener('click', () => haeUi()?.naytaPilleriNakyma('paa'));
  yla.append(takaisin, pilleriSolmu('h2', null, otsikko));
  nakyma.appendChild(yla);
  puePilleriYlarivi(nakyma);
  return nakyma;
}

const pilleriRyhmaOtsikko = (otsikko) => [pilleriSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', otsikko)];

function pilleriRyhma(otsikko, ...lapset) {
  const osat = [];
  if (otsikko) osat.push(pilleriSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', otsikko));
  const ryhma = pilleriSolmu('div', 'tk-paneeli__ryhma');
  for (const l of lapset) if (l) ryhma.appendChild(l);
  osat.push(ryhma);
  return osat;
}

/**
 * Puetaan #paavalikko PANEELIKSI kerran (js/main.js käynnistyksessä UI:n luonnin jälkeen).
 * @param {() => object} haeUi nykyinen js/ui.js UI (uusi peli luo uuden; naytaPilleriNakyma)
 */
export function puePilleriPaneeliksi(haeUi) {
  const pv = document.getElementById('paavalikko');
  const paa = document.getElementById('pilleri-paanakyma');
  if (!pv || !paa || pv.dataset.pohja) return false;
  pv.dataset.pohja = 'paneeli';
  pohjatLataaTyyli();
  pv.classList.add('tk-paneeli', 'tk-paneeli--paikallaan', 'tk-teema-paperi');
  // Ankkuri (Natiivi-UI): yläpalkin alareuna ja ruudun oikea reuna turvavälin kanssa (CSS max(--tk-vali-m, 0)).
  // Pohjan kiinteä asemointi lukee sen avattaessa ja ruudun muuttuessa.
  const asemoi = () => {
    if (pv.hidden) return;
    const palkki = document.querySelector('.topbar') ?? pv.parentElement ?? pv;
    pv.style.setProperty('--tk-paneeli-yla', `${Math.round(palkki.getBoundingClientRect().bottom)}px`);
    pv.style.setProperty('--tk-paneeli-oikea', '0px');
  };
  new MutationObserver(asemoi).observe(pv, { attributes: true, attributeFilter: ['hidden'] });
  window.addEventListener('resize', asemoi);
  asemoi();

  // Asetukset- ja Matka-alinäkymät paneelin uusiksi kasvoiksi (js/ui.js naytaPilleriNakyma).
  const asetukset = uusiPilleriNakyma('pilleri-asetukset-nakyma', 'Asetukset', haeUi);
  const matka = uusiPilleriNakyma('pilleri-matka-nakyma', 'Matka', haeUi);
  for (const n of pv.querySelectorAll('.pilleri-alanakyma')) puePilleriYlarivi(n);

  // ÄÄNET: kolme kytkintä vierekkäin.
  const kertoja = document.getElementById('kertoja-valikko');
  const aanetOtsikko = pilleriSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', 'Äänet');
  kertoja.className = 'tk-paneeli__ryhma tk-paneeli__ryhma--vierekkain';
  kertoja.dataset.paneeliPysy = '';
  puePilleriKytkimet(kertoja);

  // [Matka | Aarteet | Linssit]: uusi Matka-nappi ja vanhat Aarteet- ja Linssit-napit.
  const matkaNappi = puePilleriNappi(pilleriSolmu('button'), 'Matka', PILLERI_IKONI.matka);
  matkaNappi.type = 'button';
  matkaNappi.id = 'pilleri-matka-btn';
  matkaNappi.addEventListener('click', () => haeUi()?.naytaPilleriNakyma('matka'));
  const nav = pilleriSolmu('div', 'tk-paneeli__ryhma tk-paneeli__ryhma--vierekkain pilleri-pikanapit');
  const aarteet = document.getElementById('pilleri-aarteet-btn');
  const linssit = document.getElementById('pilleri-linssit-btn');
  nav.append(matkaNappi, puePilleriNappi(aarteet, 'Aarteet', PILLERI_IKONI.aarteet),
    puePilleriNappi(linssit, 'Linssit', PILLERI_IKONI.linssit));

  // [Uusi peli | Asetukset].
  const uusiPeli = document.getElementById('newgame-btn');
  uusiPeli.className = 'tk-paneeli-rivi tk-paneeli-rivi--toiminto';
  uusiPeli.textContent = 'Uusi peli';
  const asetuksetNappi = pilleriSolmu('button', 'tk-paneeli-rivi tk-paneeli-rivi--toiminto', 'Asetukset');
  asetuksetNappi.type = 'button';
  asetuksetNappi.id = 'pilleri-asetukset-btn';
  asetuksetNappi.dataset.paneeliPysy = '';
  asetuksetNappi.addEventListener('click', () => haeUi()?.naytaPilleriNakyma('asetukset'));
  const toiminnot = pilleriSolmu('div', 'tk-paneeli__ryhma tk-paneeli__ryhma--vierekkain');
  toiminnot.append(uusiPeli, asetuksetNappi);
  const erotin = pilleriSolmu('div', 'tk-paneeli__erotin');

  // Alarivi: versio ja päivitys.
  const pohjarivi = paa.querySelector('.valikko-pohjarivi');
  pohjarivi?.classList.add('tk-paneeli__alarivi');

  // Asetukset: Äänentasot, Kartta, Muut.
  const voimat = document.getElementById('aanivoimat');
  for (const v of voimat.querySelectorAll('.aanivoima')) v.classList.add('tk-paneeli-rivi', 'tk-paneeli-rivi--saadin');
  voimat.className = 'aanivoimat tk-paneeli__ryhma';
  const kartta = document.getElementById('kartta-valikko');
  kartta.className = 'tk-paneeli__ryhma';
  puePilleriKytkimet(kartta);
  const ehdota = document.getElementById('palaute-kulma');
  puePilleriNappi(ehdota, 'Ehdota sisältöä');
  ehdota.classList.replace('tk-paneeli-rivi--navigointi', 'tk-paneeli-rivi--toiminto');
  ehdota.dataset.paneeliSulje = '';
  asetukset.append(
    pilleriSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', 'Äänentasot'), voimat,
    pilleriSolmu('p', 'tk-kapiteeli tk-paneeli__ryhmaotsikko', 'Kartta'), kartta,
    ...pilleriRyhma('Muut', ehdota),
  );
  matka.appendChild(document.getElementById('pilleri-tiedot'));

  // Pääsivu uuteen järjestykseen; vanhat kotelot (tyhjät) pois näkyvistä.
  for (const vanha of paa.querySelectorAll('.kertoja-kotelo, .valikko-alarivi')) vanha.hidden = true;
  if (valikkoV2()) {
    pv.classList.add('tk-paneeli--v2');
    const matkaOtsikko = matka.querySelector('.tk-kapiteeli');
    if (matkaOtsikko) matkaOtsikko.textContent = 'Tietäjätaso';
    // Tasorivi ilman otsikkoa: avatar ja "Untuvikko (80 tp)" (js/ui.js renderValikkoTaso täyttää), avaa tasonäkymän.
    pueLuetteloRivi(matkaNappi, 'Matka', '');
    matkaNappi.classList.add('valikko-tasorivi');
    const avatar = pilleriSolmu('img', 'valikko-tasorivi-avatar');
    avatar.alt = '';
    avatar.decoding = 'async';
    avatar.draggable = false;
    matkaNappi.prepend(avatar);
    const tasoRyhma = pilleriSolmu('div', 'tk-paneeli__ryhma tk-paneeli__ryhma--luettelo pilleri-pikanapit');
    tasoRyhma.append(matkaNappi);
    // MATKALAUKKU: Aarteet (N) ja Julisteet (N) (Julisteet asuvat toistaiseksi Aarteet-näkymässä).
    pueLuetteloRivi(aarteet, 'Aarteet', PILLERI_IKONI.aarteet);
    const julisteet = pueLuetteloRivi(pilleriSolmu('button'), 'Julisteet', PILLERI_IKONI.julisteet);
    julisteet.type = 'button';
    julisteet.id = 'pilleri-julisteet-btn';
    // Julisteet avaa julistegallerian (voitetut aikakausjulisteet; omistaja 13.56). Valikko sulkeutuu sen alta.
    julisteet.dataset.paneeliSulje = '';
    julisteet.addEventListener('click', () => haeUi()?.avaaJulisteGalleria?.());
    linssit.hidden = true;
    const laukkuRyhma = pilleriSolmu('div', 'tk-paneeli__ryhma tk-paneeli__ryhma--luettelo pilleri-pikanapit');
    laukkuRyhma.append(aarteet, julisteet, linssit);
    // PELI: Retkikunta (asuu palautekortissa, kuten ennen) ja Asetukset.
    const retkikunta = pueLuetteloRivi(pilleriSolmu('button'), 'Retkikunta', PILLERI_IKONI.retkikunta);
    retkikunta.type = 'button';
    retkikunta.id = 'pilleri-retkikunta-btn';
    retkikunta.dataset.paneeliSulje = '';
    retkikunta.addEventListener('click', () => ehdota.click());
    pueLuetteloRivi(asetuksetNappi, 'Asetukset', PILLERI_IKONI.asetukset);
    const peliRyhma = pilleriSolmu('div', 'tk-paneeli__ryhma tk-paneeli__ryhma--luettelo');
    peliRyhma.append(retkikunta, asetuksetNappi);
    // Alarivi yhdelle riville (omistaja 14.37): Uusi peli vasemmalla, ↻ (vain web) ja versio oikealla.
    uusiPeli.classList.add('valikko-alarivi-uusi');
    if (pohjarivi) pohjarivi.prepend(uusiPeli);
    paa.prepend(aanetOtsikko, kertoja, tasoRyhma,
      ...pilleriRyhmaOtsikko('Matkalaukku'), laukkuRyhma,
      ...pilleriRyhmaOtsikko('Peli'), peliRyhma, erotin);
    if (pohjarivi) paa.appendChild(pohjarivi);
    pv.append(asetukset, matka);
    return true;
  }
  paa.prepend(aanetOtsikko, kertoja, nav, erotin, toiminnot);
  if (pohjarivi) paa.appendChild(pohjarivi);
  pv.append(asetukset, matka);
  return true;
}
