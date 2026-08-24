/*
 * FOKUSKOHTEET — kartan erityiskohteet klikattaviksi.
 *
 * Omistajan tilaus 24.8.2026: *"Tee kartalla näkyvistä kohteista
 * klikattava pop up infoja"*. Raamatun osio "Fokusmoodi", kohta
 * ETENEMINEN: *"kartan erityiskohteista (vuoret, joet, muut kaupungit)
 * aukeaa pienet pop-up-tietoruudut"*, ja kohta KOHDEKOROSTUS: auki
 * oleva kohde nostetaan esiin.
 *
 * === MIKÄ ON KLIKATTAVA JA MIKÄ EI ===
 *
 * Fokuslehti (js/fokuskartta.js) on YKSI KUVA. Olympos, Thessaloniki ja
 * merten nimet ovat siihen poltettua painojälkeä — ei elementtejä,
 * joihin voisi ripustaa tapahtumankuuntelijan. Siksi tämä moduuli
 * piirtää lehden päälle oman kerroksensa, jossa jokaista kohdetta
 * kohti on pieni musteympyrä ja sen alla NÄKYMÄTÖN ≥44 px osuma-alue.
 * Merkki on se klikkauskohde, ja se istuu kuvan oman nimen viereen.
 *
 * === MIKSI OMA KERROS EIKÄ FOKUSVIRRAN VINJETTIKERROS ===
 *
 * Vinjetit (js/fokusvirta.js paivitaFokuskuvat) ovat virran
 * matkamuistoja: ne kertyvät sitä mukaa kun pöllö puhuu. Nämä merkit
 * ovat kartan omaisuutta ja näkyvät heti kun lehti on auki, riippumatta
 * siitä missä vaiheessa virta on. Kaksi eri elinkaarta, kaksi kerrosta.
 *
 * === KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ===
 *
 * 1. JUURIRYHMÄN ULKOPUOLELLE (this.svg:n suora lapsi), koska kiertävän
 *    laudan <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Napautettavat merkit
 *    piirretään siksi oikeina elementteinä molempiin kohtiin
 *    (ui.kiertoKohdat) — sama ratkaisu kuin kohderenkailla.
 *
 * 2. EI SUODATTIMIA (tests/rules.test.mjs): suodatettu kerros palaa
 *    iOS:n taustalta tyhjänä. Vaalea kehä merkin alla on oma ympyränsä.
 *
 * 3. KIINTEÄ KOKO RUUDULLA. Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan zoomin käänteisluvulla, jolloin merkin lapset ovat
 *    ruudun pikseleitä — sama tekniikka kuin vinjeteillä. Osuma-alueen
 *    r = 22 on siis 44 px läpimitta joka zoomilla.
 *
 * === MITÄ TÄSSÄ EI OLE ===
 *
 * KUVAN SUURENNOS. Fokusvirran `avaaSuurennos` ei ole vientilistalla
 * (js/fokusvirta.js: funktio on moduulin sisäinen), eikä tämä paketti
 * saanut muokata sitä tiedostoa. Pop-upin kuva on siksi katsottava
 * pienenä; suurennos on yhden rivin päässä sinä päivänä kun
 * avaaSuurennos viedään ulos.
 *
 * TÄYSI NIUKKA-KARTTA-KOROSTUS. Raamatun KOHDEKOROSTUS lupaa kartan
 * piirtyvän muuten niukkana ja nostavan yhden kohteen esiin. Tässä
 * vaiheessa korostus on kevyt rengas auki olevan kohteen ympärillä.
 */
import { el } from './mapart.js';
import { asetaKuva } from './media.js';
import { html, jaaKappaleiksi } from './ui-apurit.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { FOKUSKOHTEET_GRC } from './packs/fokuskohteet-grc.js';
import { sfx } from './sound.js';

/*
 * Maakohtaiset kohdelistat ISO-tunnuksella. Sama tunnus kuin
 * fokuskartan pohjilla (js/fokuskartta.js nykyinenMaa), jotta lehti ja
 * sen kohteet ovat aina samasta maasta. Uusi maa on yksi rivi tähän ja
 * yksi pakettitiedosto sen viereen.
 */
const KOHDE_MAAT = { GRC: FOKUSKOHTEET_GRC };

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const KOHDE_OSUMA_R = 22;

/** Pop-upin reunavara ja merkin ja kortin väliin jäävä rako. */
const KOHDE_MARGINAALI = 8;
const KOHDE_RAKO = 12;

/** Pop-upin kuvan pyyntöleveys: pieni viite, ei kortin iso kuva. */
const KOHDE_KUVAN_PX = 480;

/** Tyyppien ylärivit. Tuntematon tyyppi saa yleisen otsikon. */
const KOHDE_TYYPIT = {
  kaupunki: 'Kaupunki',
  vuori: 'Vuori',
  meri: 'Meri',
  saari: 'Saari',
  joki: 'Joki',
  muu: 'Kartalla',
};

/* ==================== TYYLI ==================== */

const KOHDE_TYYLIN_TUNNUS = 'fokuskohteet-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla (js/fokusvirta.js lataaTyyli): css/styles.css
 * on toisen työvaiheen hallussa. Yhden tiedoston versiossa erillistä
 * linkkiä ei ole, koska tyylit ovat jo sivun <style>-lohkossa.
 *
 * NIMI ON PREFIKSOITU (lataaKohdeTyyli, KOHDE_*), koska yhden tiedoston
 * versio ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: sama nimi
 * kahdessa tiedostossa olisi niputuksessa uudelleenjulistus
 * (tools/tarkista-niputus.mjs).
 */
function lataaKohdeTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KOHDE_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = KOHDE_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokuskohteet.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MITKÄ KOHTEET NÄKYVÄT ==================== */

/**
 * Minkä maan kohteet kuuluvat juuri nyt kartalle?
 *
 * Ehto on LEHTI, ei fokusmoodi sinänsä: merkit ovat lehden päällä
 * olevia merkintöjä, ja ilman lehteä ne leijuisivat pelilaudan
 * grafiikan päällä ilman mitään mihin tarttua. `fokusPohjaBbox` on
 * sama tieto, jolla peli piilottaa pallot lehden alta (js/ui.js
 * paivitaFokusPallot) — yksi totuus, ei toista ehtoa.
 *
 * Maa luetaan laudan omasta taulusta eikä fokuskartan muistikentästä:
 * sama päättely kuin js/fokuskartta.js nykyinenMaa, mutta ilman
 * riippuvuutta sen sisäiseen tilaan.
 */
function nykyisenMaanKohteet(ui) {
  if (!ui?.fokusPohjaBbox) return [];
  const taulu = ui.game?.pack?.map?.cityCountry;
  const kaupunki = ui.game?.cityOf?.();
  const iso = (taulu && kaupunki && taulu[kaupunki.id]) || null;
  const lista = iso ? KOHDE_MAAT[iso] : null;
  if (!lista) return [];
  const lauta = ui.game?.pack?.id;
  return lista
    .map((kohde) => ({ kohde, paikka: kohde.laudat?.[lauta] }))
    .filter(({ paikka }) => Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y))
    /*
     * Vain lehden alueella olevat. Lehti on maan ikkuna, ja sen
     * ulkopuolelle jäävä merkki osuisi laudan omaan grafiikkaan —
     * pelaajalle se näyttäisi merkiltä ilman karttaa.
     */
    .filter(({ paikka }) => ui.fokusPohjanAlla?.(paikka.x, paikka.y));
}

/* ==================== MERKIT KARTALLE ==================== */

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function varmistaKohdekerros(ui) {
  if (!ui.svg) return null;
  if (!ui.fokuskohdeKerros?.isConnected || ui.fokuskohdeKerros.ownerSVGElement !== ui.svg) {
    ui.fokuskohdeKerros = el('g', { class: 'fokuskohteet' }, ui.svg);
    ui.fokuskohdeAvain = null;
  }
  return ui.fokuskohdeKerros;
}

/**
 * Yksi merkki: näkymätön osuma-alue, vaalea kehä, musteympyrä ja piste.
 * Korostusrengas on valmiina paikallaan läpinäkyvänä — auki oleva
 * kohde saa sen näkyviin luokalla eikä uudella elementillä.
 */
function piirraKohdemerkki(ui, ryhma, kohde) {
  const g = el('g', { class: `fokuskohde fokuskohde-${kohde.tyyppi ?? 'muu'}` }, ryhma);
  g.dataset.kohde = kohde.id;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${kohde.nimi}: avaa tietoruutu`);
  el('circle', { class: 'fokuskohde-osuma', r: KOHDE_OSUMA_R }, g);
  el('circle', { class: 'fokuskohde-korostus', r: 9.5 }, g);
  el('circle', { class: 'fokuskohde-halo', r: 6.6 }, g);
  el('circle', { class: 'fokuskohde-rengas', r: 4.6 }, g);
  el('circle', { class: 'fokuskohde-piste', r: 1.5 }, g);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    if (ui.fokuskohdeAuki?.id === kohde.id) suljeFokuskohde(ui);
    else avaaFokuskohde(ui, kohde);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * Merkit kartalle ja niiden koko zoomin mukaan.
 *
 * KUTSUTAAN SAMASTA KOHDASTA KUIN VINJETIT (js/ui.js paivitaMaastonimet)
 * ja lisäksi silloin kun lehti saapuu verkosta (paivitaFokusPohja) —
 * muuten merkit odottaisivat seuraavaa kartan liikettä.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain ankkuri-
 * ryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaFokuskohteet(ui) {
  if (typeof document === 'undefined') return;
  const kerros = varmistaKohdekerros(ui);
  if (!kerros) return;
  const kohteet = nykyisenMaanKohteet(ui);
  const avain = kohteet.length
    ? `${ui.game.pack.id}:${kohteet.map(({ kohde }) => kohde.id).join('|')}`
    : 'tyhja';
  if (ui.fokuskohdeAvain !== avain) {
    ui.fokuskohdeAvain = avain;
    kerros.textContent = '';
    ui.fokuskohdeRyhmat = [];
    ui.fokuskohdeMerkit = new Map();
    if (!kohteet.length) suljeFokuskohde(ui);
    else lataaKohdeTyyli();
    for (const { kohde, paikka } of kohteet) {
      const merkit = [];
      // Kiertävällä laudalla sama merkki molempiin kohtiin: kopiosta ei
      // voi napauttaa mitään (ks. tiedoston alku, sääntö 1).
      for (const x of ui.kiertoKohdat?.(paikka.x) ?? [paikka.x]) {
        const ryhma = el('g', { class: 'fokuskohde-ryhma' }, kerros);
        ui.fokuskohdeRyhmat.push({ g: ryhma, x, y: paikka.y });
        merkit.push(piirraKohdemerkki(ui, ryhma, kohde));
      }
      ui.fokuskohdeMerkit.set(kohde.id, merkit);
    }
    // Auki ollut pop-up osoittaa nyt poistettuun solmuun: uusi merkki
    // samalle kohteelle otetaan korostukseen, muuten kortti sulkeutuu.
    if (ui.fokuskohdeAuki) {
      const merkki = ui.fokuskohdeMerkit.get(ui.fokuskohdeAuki.id)?.[0];
      if (merkki) {
        ui.fokuskohdeAuki.merkki = merkki;
        merkki.classList.add('auki');
      } else suljeFokuskohde(ui);
    }
  }
  const nakyva = ui.nakyvaAlue?.();
  const skaala = nakyva?.skaala;
  if (!skaala || !Number.isFinite(skaala) || skaala <= 0) return;
  const zoom = (1 / skaala).toFixed(4);
  for (const ryhma of ui.fokuskohdeRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
  }
  paivitaNakyvyys(ui, kerros, nakyva);
  // Kartta liikkui: auki oleva kortti seuraa merkkiään.
  if (ui.fokuskohdeAuki) asetaKohteenPaikka(ui);
}

/**
 * MERKIT SYTTYVÄT VASTA KUN LEHTI ON LÄHIKUVASSA.
 *
 * Yleiskuvassa koko Kreikka on parinkymmenen pikselin läiskä, ja
 * kaikkien kohteiden 44 pikselin osuma-alueet kasautuisivat samaan
 * kohtaan — pahimmillaan Ateenan oman laatan päälle, jolloin merkit
 * söisivät pelaajan napautuksen pelikohteesta. Sama oppi ja sama
 * ratkaisu kuin fokusnimillä (js/fokuskartta.js paivitaFokusNimet):
 * kerros piilotetaan luokalla, kun se ei ole käyttökelpoinen, eikä
 * yhtäkään solmua pureta.
 *
 * MITTA ON OSUUS, EI ZOOMITASO. Sama lauta on eri kokoinen puhelimessa
 * ja työpöydällä; ehto on siksi "kuinka suuren osan näkyvästä
 * kartasta lehti täyttää", jolloin raja tarkoittaa samaa asiaa
 * jokaisella ruudulla.
 *
 * TIEDOSSA OLEVA RAJA: Delfoi ja Parnassos ovat laudalla noin viiden
 * yksikön päässä toisistaan (pyhäkkö on vuoren rinteellä), joten
 * lehden peruszoomilla niiden osuma-alueet menevät päällekkäin ja
 * päällimmäinen — jälkimmäisenä piirretty — voittaa. Lähemmäs
 * zoomatessa ne erkanevat. Kummankin osuma pidetään mieluummin
 * täysikokoisena kuin kutistetaan sormelle liian pieneksi.
 */
const LEHDEN_VAHIN_OSUUS = 0.5;

function paivitaNakyvyys(ui, kerros, nakyva) {
  const pohja = ui.fokusPohjaBbox;
  const osuus = pohja && nakyva?.w > 0 ? pohja.w / nakyva.w : 0;
  const piiloon = osuus < LEHDEN_VAHIN_OSUUS;
  kerros.classList.toggle('fokuskohteet-piilossa', piiloon);
  if (piiloon) suljeFokuskohde(ui);
}

/** Laudan vaihto tai uusi peli: merkit pois ja muisti nollille. */
export function nollaaFokuskohteet(ui) {
  suljeFokuskohde(ui);
  ui.fokuskohdeAvain = null;
  ui.fokuskohdeRyhmat = [];
  ui.fokuskohdeMerkit = new Map();
  if (ui.fokuskohdeKerros?.isConnected) ui.fokuskohdeKerros.textContent = '';
}

/* ==================== POP-UP ==================== */

/** Sulkee auki olevan tietoruudun ja purkaa sen kuuntelijat. */
export function suljeFokuskohde(ui) {
  const auki = ui?.fokuskohdeAuki;
  if (!auki) return;
  ui.fokuskohdeAuki = null;
  auki.merkki?.classList.remove('auki');
  auki.popup?.remove();
  if (auki.purku) auki.purku();
}

/**
 * Kortin paikka merkin viereen.
 *
 * KOLME PAKKOA: kortti ei valu ruudun (karttapaneelin) ulkopuolelle,
 * se ei peitä alanappeja — vuorolaatikko luetaan ruudulta eikä
 * arvata — ja jos pystysuunnassa on ahdasta, kortti saa oman kattonsa
 * ja loppu vieritetään sen sisällä. Vaakasuunnassa kortti menee
 * mieluiten merkin OIKEALLE puolelle ja kääntyy vasemmalle vasta jos
 * ei mahdu; niin merkki jää näkyviin kortin viereen.
 */
function asetaKohteenPaikka(ui) {
  const auki = ui.fokuskohdeAuki;
  if (!auki?.popup?.isConnected || !auki.merkki?.isConnected) return;
  const koti = auki.popup.offsetParent ?? auki.popup.parentNode;
  const pane = koti?.getBoundingClientRect?.();
  if (!pane || !(pane.width > 0)) return;
  const m = auki.merkki.getBoundingClientRect();

  // Alanapit: vuorolaatikko kelluu kapealla ruudulla kartan päällä.
  let alaraja = pane.bottom - KOHDE_MARGINAALI;
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  if (napit && napit.height > 0 && napit.right > pane.left && napit.left < pane.right
    && napit.top > pane.top) {
    alaraja = Math.min(alaraja, napit.top - KOHDE_MARGINAALI);
  }
  const katto = Math.max(140, Math.round(alaraja - pane.top - KOHDE_MARGINAALI));
  auki.popup.style.maxHeight = `${katto}px`;

  const laatikko = auki.popup.getBoundingClientRect();
  const leveys = laatikko.width;
  const korkeus = laatikko.height;
  let vasen = m.right + KOHDE_RAKO;
  if (vasen + leveys > pane.right - KOHDE_MARGINAALI) vasen = m.left - KOHDE_RAKO - leveys;
  vasen = Math.max(pane.left + KOHDE_MARGINAALI,
    Math.min(vasen, pane.right - KOHDE_MARGINAALI - leveys));
  let ylin = m.top + m.height / 2 - korkeus / 2;
  ylin = Math.min(ylin, alaraja - korkeus);
  ylin = Math.max(pane.top + KOHDE_MARGINAALI, ylin);
  auki.popup.style.left = `${Math.round(vasen - pane.left)}px`;
  auki.popup.style.top = `${Math.round(ylin - pane.top)}px`;
}

/**
 * Kortin kuva: pieni viite, ei kortin täysleveä kuva.
 *
 * PUUTTUVA KUVA POISTAA KUVAPAIKAN kokonaan, kuten fokusvirran kortilla:
 * tyhjä kehys ja sitä selittävä kuvateksti olisi pahempi kuin pelkkä
 * teksti. Peilin ja Commonsin välinen porras on median omassa
 * asettajassa (js/media.js asetaKuva), joten sitä ei kirjoiteta tähän
 * uudestaan.
 */
function piirraKohdeKuva(sisalto, kuva) {
  if (!kuva?.tiedosto) return;
  const kehys = html('figure', 'fokuskohde-kuva');
  const img = document.createElement('img');
  img.decoding = 'async';
  img.draggable = false;
  img.alt = kuva.selite ?? '';
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, KOHDE_KUVAN_PX),
    valokuvaVara(kuva.tiedosto, KOHDE_KUVAN_PX), () => kehys.remove());
  kehys.appendChild(img);
  if (kuva.selite || kuva.lahde) {
    const teksti = html('figcaption', 'fokuskohde-kuvateksti', kuva.selite ?? '');
    // CC BY vaatii tekijän maininnan: lähde on aina kuvan vieressä.
    if (kuva.lahde) teksti.appendChild(html('span', 'fokuskohde-kuvalahde', kuva.lahde));
    kehys.appendChild(teksti);
  }
  sisalto.appendChild(kehys);
}

/**
 * Avaa yhden kohteen tietoruudun. Vain yksi kerrallaan: uusi napautus
 * sulkee edellisen, ja fokusvirran kortin tai kuplan avautuminen sulkee
 * tämän (ks. vahdiVirtaa).
 */
export function avaaFokuskohde(ui, kohde) {
  if (typeof document === 'undefined' || !kohde) return null;
  lataaKohdeTyyli();
  suljeFokuskohde(ui);
  const merkki = ui.fokuskohdeMerkit?.get(kohde.id)?.[0];
  const koti = document.querySelector('.map-pane') ?? document.body;

  const popup = html('div', 'fokuskohde-popup');
  popup.setAttribute('role', 'group');
  popup.setAttribute('aria-label', `${kohde.nimi}: tietoruutu`);
  /*
   * NAPAUTUS SULKEE, PAINIKE EI. Sama sopimus kuin pöllön kuplalla
   * (js/fokusvirta.js piirraKupla): kortin päällä napautus on sulku,
   * mutta painikkeen tai linkin päällä se on valinta.
   */
  popup.addEventListener('pointerdown', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (tapahtuma.target?.closest?.('button, a')) return;
    sfx.play('paper');
    suljeFokuskohde(ui);
  });

  const sulje = html('button', 'fokuskohde-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', `Sulje ${kohde.nimi}`);
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    suljeFokuskohde(ui);
  });
  popup.appendChild(sulje);

  const sisalto = html('div', 'fokuskohde-sisalto');
  sisalto.appendChild(html('p', 'fokuskohde-ylarivi',
    KOHDE_TYYPIT[kohde.tyyppi] ?? KOHDE_TYYPIT.muu));
  sisalto.appendChild(html('h3', 'fokuskohde-otsikko', kohde.nimi));
  piirraKohdeKuva(sisalto, kohde.kuva);
  const teksti = html('div', 'fokuskohde-teksti');
  for (const kappale of jaaKappaleiksi(kohde.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  if (kohde.lahde) sisalto.appendChild(html('p', 'fokuskohde-lahde', kohde.lahde));
  popup.appendChild(sisalto);
  koti.appendChild(popup);

  merkki?.classList.add('auki');
  ui.fokuskohdeAuki = { id: kohde.id, popup, merkki, purku: null };
  ui.fokuskohdeAuki.purku = kuunteleKohdetta(ui, popup);
  asetaKohteenPaikka(ui);
  // Mitta uudelleen, kun asettelu ja tyyli ovat valmiit: ensimmäinen
  // mitta voi osua hetkeen, jolloin tyylitiedosto on vasta matkalla.
  globalThis.requestAnimationFrame?.(() => asetaKohteenPaikka(ui));
  setTimeout(() => asetaKohteenPaikka(ui), 200);
  sfx.play('paper');
  return popup;
}

/**
 * Kortin kuuntelijat: Esc, napautus kortin ulkopuolelle, ikkunan koko
 * ja fokusvirran pinnat. Palauttaa purkufunktion — jokainen tähän
 * lisätty kuuntelija on purettava, tai suljettu kortti jäisi
 * kuuntelemaan ikkunaa ikuisesti.
 */
function kuunteleKohdetta(ui, popup) {
  const nappain = (tapahtuma) => {
    if (tapahtuma.key === 'Escape') {
      tapahtuma.stopPropagation();
      suljeFokuskohde(ui);
    }
  };
  const ulos = (tapahtuma) => {
    if (popup.contains(tapahtuma.target)) return;
    // Toisen merkin napautus vaihtaa kohdetta; merkki hoitaa sulun itse.
    if (tapahtuma.target?.closest?.('.fokuskohde')) return;
    suljeFokuskohde(ui);
  };
  const asemoi = () => asetaKohteenPaikka(ui);
  /*
   * FOKUSVIRTA VOITTAA. Kun pöllö puhuu kuplasta tai annostelukortti
   * aukeaa, tietoruutu väistyy — kaksi paperia päällekkäin kartan
   * päällä olisi juuri sitä raskautta, jota omistaja moitti. Vahti on
   * MutationObserver eikä kutsu js/fokusvirta.js:ään: se tiedosto on
   * toisen työvaiheen hallussa, eikä tämä paketti saanut koskea siihen.
   */
  const vahti = new MutationObserver((muutokset) => {
    for (const muutos of muutokset) {
      for (const solmu of muutos.addedNodes ?? []) {
        if (solmu.nodeType !== 1) continue;
        if (solmu.matches?.('.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom')
          || solmu.querySelector?.('.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom')) {
          suljeFokuskohde(ui);
          return;
        }
      }
    }
  });
  document.addEventListener('keydown', nappain, true);
  document.addEventListener('pointerdown', ulos, true);
  globalThis.addEventListener?.('resize', asemoi);
  globalThis.addEventListener?.('orientationchange', asemoi);
  vahti.observe(document.body, { childList: true, subtree: true });
  return () => {
    document.removeEventListener('keydown', nappain, true);
    document.removeEventListener('pointerdown', ulos, true);
    globalThis.removeEventListener?.('resize', asemoi);
    globalThis.removeEventListener?.('orientationchange', asemoi);
    vahti.disconnect();
  };
}
