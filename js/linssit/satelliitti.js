/*
 * SATELLIITTILINSSI — oikeita tutkahavaintoja pallolta.
 *
 * OMISTAJAN TILAUS 12.9.2026, sanatarkasti: *"Satelliittilinssi:
 * nykyinen maapallo, vain havaintokohteet. Ei haittaa vaikka
 * karttapohjalla näkyy muitakin tietoja. Uudet kohteet näkyisivät
 * hohtavina vihreinä pisteinä pallolla mitä klikkaamalla avautuu kukin
 * näkymä. Onko yhdestä kohteesta useampia kuvia ja jos on niin miten ne
 * kannattaisi näyttää pelissä? Koska kyseessä on pelin linssi niin
 * silloin koko Yläpalkki vaihtuu erilaiseen kuten pelin kahdessa
 * uudessa ihmis- ja tiedekeksintö linssissä"*
 *
 * Pelaaja suuntaa leikillisesti avaruudesta Maahan katsovan
 * kaukoputken kohteeseen ja näkee oikean tutkahavainnon.
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ───────────────────────────────────────
 *
 * TÄMÄ EI OLE LIVE-NÄKYMÄ eikä kuvaustilaus. Jokainen kuva on
 * ARKISTOHAVAINTO ICEYEn avoimesta aineistosta, ja sen mukana kulkee
 * aina aineiston nimi, kuvausaika (UTC), alue, käsittelyselite,
 * lisenssi ja suora linkki lähdetietueeseen. Kortissa lukee
 * "Arkistohavainto · ICEYE · tutkakuva". Pelaajalle ei luvata, että
 * satelliitti kuvaisi juuri nyt.
 *
 * ── YKSI PISTE PER KOHDE, GALLERIA PISTEEN SISÄLLÄ ────────────────
 *
 * Aineiston ryhmittely on tehty jalanjäljestä eikä nimestä
 * (tools/hae-satelliittihavainnot.mjs kertoo säännön auki). Kolme
 * asiaa pidetään erillään:
 *
 *   (A) sama kohde eri kuvausaikoina → saman pisteen galleria,
 *   (B) saman havainnon eri tuotteet (SLC, GRD, QLK, CSI) → EIVÄT ole
 *       neljä havaintoa, vaan yhden havainnon `tuotteet`-luettelo,
 *   (C) vierekkäiset eri kuvausalueet → ERI pisteet.
 *
 * Galleriassa oletuskuva on paras yleiskuva (parasHavainto alla), ei
 * automaattisesti uusin. Sen alla ovat päivämäärälliset pikkukuvat,
 * laskuri ja edellinen/seuraava. Saman päivän havainnot erottuvat
 * kellonajasta, ja aikavyöhyke (UTC) on näkyvissä.
 *
 * "Vertaa" avaa kaksi havaintoa RINNAKKAIN. Päällekkäistä
 * pyyhkäisyliukuria ei ole: se vaatisi, että alue ja geometrinen
 * kohdistus ovat oikeasti kunnossa, ja eri katselukulmista otetut
 * tutkakuvat eivät ole pikselintarkasti samassa ruudukossa — liukuri
 * loisi virheellisen vaikutelman muutoksesta.
 *
 * ── YLÄPALKIN ELINKAARI ───────────────────────────────────────────
 *
 * Sama kuin Ihmisen matka- ja Keksinnöt-linsseillä (js/aikajana.js
 * rakennaPalkki): Matkakirjan oma palkki piilotetaan body-luokalla
 * `aikajana-palkki-auki`, linssin palkki saa SEN mitatun korkeuden
 * (--aikajana-palkki-korkeus), ja luokka `aikajana-paalla` panee
 * pelin muut pinnat kiinni (js/ui-apurit.js linssiEstaa,
 * js/pallolauta/lauta.js kaupunkipisteet, css/aikajana.css merkit).
 * Sulkeminen poistaa molemmat luokat ja palauttaa pelitilan
 * täsmälleen; tallennukseen ei kosketa lainkaan.
 *
 * ── LINSSIN MERKIT EIVÄT KULUTA PELIVUOROA ────────────────────────
 *
 * Havaintopiste on `laji: 'linssi'` -merkki, jonka napautuksen laskee
 * pallon oma osumatesti (js/pallolauta/lauta.js lahinLinssimerkki) —
 * ja se hyväksyy vain kameran puolella olevat merkit, joten pallon
 * takapuolen piste ei ota napautuksia. Matkustus ja lehdet ovat
 * linssin ajan kiinni saman portin takana kuin linssikartalla
 * (js/ui.js linssikarttaEstaa, joka lukee myös linssiEstaa()).
 */

import { html } from '../ui-apurit.js';
import { nostokuvaAloita } from '../nostokuva.js';
import { SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE } from './satelliitti-data.js';

/** Linssiosan nimi laudan linssiapurissa (lauta.linssit.merkit/pura). */
export const SATELLIITTI_OSA = 'satelliitti';

/** Oman tyylitiedoston tunnus (sama kaava kuin muilla kelluvilla pinnoilla). */
const TYYLIN_TUNNUS = 'satelliitti-tyyli';

/** Kameran lähikuva kohteeseen laudan yksiköinä (noin 900 km ruudulla). */
export const SATELLIITTI_LAHIKUVA = 250;

/** Kuvaustilan järjestys: tarkin ensin (spotlight ≈ dwell > stripmap > scan). */
export const TILAN_TARKKUUS = {
  spotlight: 3, dwell: 3, stripmap: 2, scan: 1,
};

/** Kuvaustilan suomenkielinen nimi. */
export const TILAN_NIMI = {
  spotlight: 'pistekuvaus (spotlight)',
  dwell: 'pistekuvaus (dwell)',
  stripmap: 'kaistakuvaus (stripmap)',
  scan: 'laajakuvaus (scan)',
};

/**
 * PARAS YLEISKUVA — oletuskuvan valintasääntö, kirjoitettu auki.
 *
 * EI "uusin", koska uusin voi olla kapea, vino tai heikkolaatuinen
 * rajaus; pelaajan ensimmäisen silmäyksen pitää olla kohteen paras
 * yleiskuva. Järjestys on kolmiportainen ja kaikki portaat luetaan
 * havainnon omista mittausarvoista:
 *
 *   1. TARKIN KUVAUSTILA (TILAN_TARKKUUS). Pistekuvaus erottaa metrin
 *      kokoiset kohteet, laajakuvaus kymmeniä metrejä.
 *   2. PIENIN KATSELUKULMA (view:incidence_angle). Mitä lähempänä
 *      kohtisuoraa, sitä vähemmän tutkavarjoja ja sitä
 *      karttamaisempi kuva.
 *   3. UUSIN — vasta tasatilanteessa.
 *
 * Puhdas funktio: sama sääntö pelissä, aineistotyökalussa ja testissä.
 */
export function parasHavainto(havainnot = []) {
  let paras = null;
  for (const h of havainnot) {
    if (!h) continue;
    if (!paras) { paras = h; continue; }
    const a = [TILAN_TARKKUUS[h.tila] ?? 0, -(h.katselukulma ?? 90), h.aika ?? ''];
    const b = [TILAN_TARKKUUS[paras.tila] ?? 0, -(paras.katselukulma ?? 90), paras.aika ?? ''];
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) continue;
      if (a[i] > b[i]) paras = h;
      break;
    }
  }
  return paras;
}

/** Oletushavainnon indeksi kohteessa (aineiston `oletus` tai laatusääntö). */
export function oletusIndeksi(kohde) {
  const lista = kohde?.havainnot ?? [];
  const nimetty = lista.findIndex((h) => h.id === kohde?.oletus);
  if (nimetty >= 0) return nimetty;
  const paras = parasHavainto(lista);
  const i = lista.indexOf(paras);
  return i >= 0 ? i : 0;
}

/**
 * Kuvausaika ihmisen luettavaksi, aikavyöhyke NÄKYVISSÄ.
 *
 * Saman päivän havainnot erottuvat vain kellonajasta (Krakovassa
 * 4.10.2025 on kolme eri kuvausta), joten kellonaika on aina mukana ja
 * vyöhyke sanotaan ääneen — muuten lukija olettaisi oman aikansa.
 */
export function aikateksti(iso) {
  const t = String(iso ?? '');
  const m = t.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return t;
  const [, v, kk, pp, hh, mm] = m;
  return `${Number(pp)}.${Number(kk)}.${v} klo ${hh}.${mm} UTC`;
}

/** Lyhyt päiväys pikkukuvan alle (sama kello mukana, sama syy). */
export function paivateksti(iso) {
  const t = String(iso ?? '');
  const m = t.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return t;
  const [, v, kk, pp, hh, mm] = m;
  return `${Number(pp)}.${Number(kk)}.${v.slice(2)} ${hh}.${mm}`;
}

/** Alue asteina, esim. "45,41–45,47° N · 12,29–12,38° E". */
export function alueteksti(alue) {
  if (!Array.isArray(alue) || alue.length < 4) return '';
  const luku = (x) => Math.abs(x).toFixed(2).replace('.', ',');
  const lat = `${luku(alue[1])}–${luku(alue[3])}° ${alue[3] >= 0 ? 'N' : 'S'}`;
  const lon = `${luku(alue[0])}–${luku(alue[2])}° ${alue[2] >= 0 ? 'E' : 'W'}`;
  return `${lat} · ${lon}`;
}

/** Oma tyylitiedosto sivulle, jos sitä ei vielä ole. */
function lataaSatelliittiTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('satelliitti.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Ulkoinen linkki, joka ei vie pelaajaa pois pelistä. */
function ulkolinkki(teksti, osoite) {
  const a = html('a', 'satelliitti-linkki', teksti);
  a.href = osoite;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

/** Yhden merkin elementti: sädekehä, rengas, ydin ja nimi. */
function merkkiElementti(kohde) {
  const el = html('div', 'satelliitti-piste');
  el.append(
    html('span', 'satelliitti-hehku'),
    html('span', 'satelliitti-rengas'),
    html('span', 'satelliitti-ydin'),
    html('span', 'satelliitti-nimi', kohde.nimi),
  );
  el.setAttribute('aria-hidden', 'true');
  return el;
}

/**
 * Kuvan mukana kulkeva kuvatieto (js/nostokuva.js lukee `lyhyt`,
 * `selite` ja `lahde`). Lähdetiedot ovat aina löydettävissä: lyhyt
 * teksti kertoo kohteen ja hetken, pitkä lisää aineiston ja lisenssin.
 */
export function kuvatiedot(kohde, havainto) {
  return {
    lyhyt: `${kohde.nimi} ${aikateksti(havainto.aika)}`,
    selite: `${kohde.nimi} (${kohde.seutu}) — ${SATELLIITTI_LAHDE.aineisto}, `
      + `${aikateksti(havainto.aika)}. ${kohde.selite}`,
    lahde: `${SATELLIITTI_LAHDE.tekija}, ${SATELLIITTI_LAHDE.lisenssi}`,
    osoite: havainto.kuva,
  };
}

/**
 * Havaintokortti: kuva ensin, sitten koko havainto (v1783–v1785:n
 * kaksivaiheinen avaus, js/nostokuva.js).
 *
 * KUVA EI LIIKU VAIHEENVAIHDOSSA eikä havaintoa vaihdettaessa: kuvan
 * laatikko jäädytetään vaiheessa 1 pikseleiksi, ja gallerian vaihto
 * kirjoittaa VAIN `src`:n ja tekstit — elementtiä ei rakenneta uudeksi.
 * Siksi kuva on `object-fit: contain` (css/satelliitti.css): eri
 * muotoiset havainnot mahtuvat samaan laatikkoon vääristymättä.
 */
function avaaHavaintokortti({ kohde, ui, onSuljettu }) {
  lataaSatelliittiTyyli();
  const kortti = html('div', 'satelliitti-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-label', `${kohde.nimi}: tutkahavainto`);
  const sisus = html('div', 'satelliitti-sisus');
  kortti.appendChild(sisus);
  document.body.appendChild(kortti);

  let indeksi = oletusIndeksi(kohde);
  const havainnot = kohde.havainnot ?? [];
  let kuvaElementti = null;
  let paivitaSisalto = () => {};

  /*
   * KUVA SULKEUTUU MISTÄ TAHANSA KARTAN KOHDASTA (v1783:n sääntö), ja
   * SAMA painallus ei saa avata uutta pistettä. Lippu luetaan linssin
   * omassa napautuskäsittelijässä (avaa-funktio alla).
   */
  const ulkopuoli = (e) => {
    if (kortti.contains(e.target)) return;
    sulje();
  };
  const nappain = (e) => {
    if (e.key === 'Escape') { sulje(); return; }
    if (e.key === 'ArrowRight') nayta(indeksi + 1);
    if (e.key === 'ArrowLeft') nayta(indeksi - 1);
  };

  function sulje() {
    if (!kortti.isConnected) return;
    kortti.nostokuvaPurku?.();
    kortti.remove();
    document.removeEventListener('pointerdown', ulkopuoli, true);
    document.removeEventListener('keydown', nappain);
    onSuljettu?.();
  }
  kortti.satelliittiSulje = sulje;
  document.addEventListener('pointerdown', ulkopuoli, true);
  document.addEventListener('keydown', nappain);

  const nayta = (uusi) => {
    if (!havainnot.length) return;
    indeksi = Math.max(0, Math.min(havainnot.length - 1, uusi));
    const h = havainnot[indeksi];
    const tiedot = kuvatiedot(kohde, h);
    if (kuvaElementti && kuvaElementti.src !== h.kuva) {
      kuvaElementti.src = h.kuva;
      kuvaElementti.alt = tiedot.lyhyt;
    }
    /*
     * KUVATEKSTI SEURAA KUVAA. Nostokuva-apuri latoo kuvatekstin kerran
     * vaiheessa 1, eikä se tiedä galleriasta mitään — ilman tätä kuvan
     * alla luki yhä ensimmäisen havainnon päiväys, vaikka ruudulla oli
     * jo toinen kuvaus (kaappaus 12.9.2026, Krakova 3/5). Väärä
     * päiväys oikean kuvan alla on pahin mahdollinen virhe tässä
     * linssissä, joten teksti kirjoitetaan samassa vaiheessa kuin src.
     */
    const teksti = kortti.querySelector('.nostokuva-teksti');
    if (teksti) teksti.textContent = tiedot.lyhyt;
    paivitaSisalto();
  };

  /** Vertailu: kaksi havaintoa rinnakkain, ei liukuria (ks. tiedoston alku). */
  const vertaa = () => {
    const toinen = havainnot[(indeksi + 1) % havainnot.length];
    const nyt = havainnot[indeksi];
    const kerros = html('div', 'satelliitti-vertailu');
    kerros.setAttribute('role', 'dialog');
    kerros.setAttribute('aria-label', `${kohde.nimi}: kaksi havaintoa rinnakkain`);
    const otsikko = html('div', 'satelliitti-otsikko', `${kohde.nimi} — kaksi havaintoa rinnakkain`);
    const parit = html('div', 'satelliitti-vertailu-parit');
    for (const h of [nyt, toinen]) {
      const kuvio = html('figure');
      const img = document.createElement('img');
      img.src = h.kuva;
      img.alt = `${kohde.nimi} ${aikateksti(h.aika)}`;
      img.decoding = 'async';
      kuvio.append(img, html('figcaption', null, `${aikateksti(h.aika)} · ${TILAN_NIMI[h.tila] ?? h.tila}`));
      parit.appendChild(kuvio);
    }
    const takaisin = html('button', 'satelliitti-nuoli', 'Sulje vertailu');
    takaisin.type = 'button';
    takaisin.addEventListener('click', () => kerros.remove());
    kerros.append(otsikko, parit, takaisin);
    document.body.appendChild(kerros);
  };

  /** Vaiheen 2 ladonta: kuvakehys paikalleen, tiedot sen ympärille. */
  const latoNosto = (kotelo, kuvakehys) => {
    const h = havainnot[indeksi] ?? {};
    kotelo.replaceChildren();
    const otsikko = html('h2', 'satelliitti-otsikko', kohde.nimi);
    otsikko.appendChild(html('span', 'satelliitti-seutu', ` — ${kohde.seutu}`));
    kotelo.append(otsikko);
    if (kuvakehys) kotelo.appendChild(kuvakehys);

    if (havainnot.length > 1) {
      const selaus = html('div', 'satelliitti-selaus');
      const edellinen = html('button', 'satelliitti-nuoli satelliitti-edellinen', '‹ Edellinen');
      edellinen.type = 'button';
      edellinen.disabled = indeksi <= 0;
      edellinen.addEventListener('click', () => nayta(indeksi - 1));
      const laskuri = html('span', 'satelliitti-laskuri',
        `Havainto ${indeksi + 1} / ${havainnot.length}`);
      const seuraava = html('button', 'satelliitti-nuoli satelliitti-seuraava', 'Seuraava ›');
      seuraava.type = 'button';
      seuraava.disabled = indeksi >= havainnot.length - 1;
      seuraava.addEventListener('click', () => nayta(indeksi + 1));
      const vertaaNappi = html('button', 'satelliitti-vertaa', 'Vertaa');
      vertaaNappi.type = 'button';
      vertaaNappi.title = 'Näytä kaksi havaintoa rinnakkain';
      vertaaNappi.addEventListener('click', vertaa);
      selaus.append(edellinen, laskuri, seuraava, vertaaNappi);
      kotelo.appendChild(selaus);

      const nauha = html('div', 'satelliitti-nauha');
      havainnot.forEach((toinen, i) => {
        const nappi = html('button', `satelliitti-pikku${i === indeksi ? ' valittu' : ''}`);
        nappi.type = 'button';
        const pikku = document.createElement('img');
        pikku.src = toinen.kuva;
        pikku.loading = 'lazy';
        pikku.decoding = 'async';
        pikku.alt = '';
        nappi.append(pikku, html('span', null, paivateksti(toinen.aika)));
        nappi.title = aikateksti(toinen.aika);
        nappi.setAttribute('aria-label', `${aikateksti(toinen.aika)} — näytä tämä havainto`);
        nappi.addEventListener('click', () => nayta(i));
        nauha.appendChild(nappi);
      });
      kotelo.appendChild(nauha);
    }

    const tiedot = html('div', 'satelliitti-tiedot');
    const rivi = (nimi, arvo) => {
      if (!arvo) return;
      const d = html('div');
      d.append(html('b', null, `${nimi}: `), typeof arvo === 'string' ? document.createTextNode(arvo) : arvo);
      tiedot.appendChild(d);
    };
    rivi('Aineisto', `${SATELLIITTI_LAHDE.aineisto}, ${SATELLIITTI_LAHDE.tekija}`);
    rivi('Kuvausaika', aikateksti(h.aika));
    rivi('Alue', alueteksti(h.alue));
    rivi('Kuvaustapa', [TILAN_NIMI[h.tila] ?? h.tila, h.satelliitti,
      h.kaista ? `${h.kaista}-kaista` : null, h.polarisaatio,
      Number.isFinite(h.katselukulma) ? `katselukulma ${String(h.katselukulma).replace('.', ',')}°` : null,
    ].filter(Boolean).join(' · '));
    rivi('Käsittely', [h.kasittely, (h.tuotteet ?? []).length
      ? `tuotteet ${h.tuotteet.join(', ')} (saman kuvauksen eri versiot)` : null].filter(Boolean).join(' · '));
    rivi('Lisenssi', SATELLIITTI_LAHDE.lisenssi);
    if (h.stac) rivi('Lähde', ulkolinkki('STAC-tietue', h.stac));
    rivi('Dokumentaatio', ulkolinkki('ICEYE Open Data', SATELLIITTI_LAHDE.osoite));
    tiedot.appendChild(html('div', null, `${kohde.selite}`));
    kotelo.appendChild(tiedot);
  };

  const aloitus = havainnot[indeksi];
  if (!aloitus) { sulje(); return null; }
  const kahva = nostokuvaAloita({
    kortti,
    sisalto: sisus,
    kuva: kuvatiedot(kohde, aloitus),
    aseta: (img, _leveys, onVirhe) => {
      kuvaElementti = img;
      img.addEventListener('error', onVirhe, { once: true });
      img.src = aloitus.kuva;
    },
    latoNosto,
    /*
     * ARKISTOLEIMA KUVAN PÄÄLLE, EI TEKSTIN SEKAAN. Kortti on kuvan
     * korkuinen ja vierittyy, joten leipätekstin joukossa oleva leima
     * valui ruudun ulkopuolelle heti kun "Lisää" avasi koko havainnon
     * (kaappaus 12.9.2026). Kuvan kulmassa se on näkyvissä molemmissa
     * vaiheissa — juuri siellä missä pelaaja katsoo — eikä pelaajalle
     * voi jäädä käsitystä live-näkymästä.
     */
    koristele: (nappi) => {
      nappi.appendChild(html('span', 'satelliitti-leima', 'Arkistohavainto · ICEYE · tutkakuva'));
    },
    onKuvatta: () => {
      // Kuva jäi tulematta: kortti on jo ladottu tekstinä, eikä
      // pelaajalle luvata kuvaa jota ei ole.
      kortti.classList.add('satelliitti-kuvatta');
    },
  });
  paivitaSisalto = () => {
    if (kahva?.vaihe() === 'nosto') latoNosto(sisus, kahva.kehys);
  };
  return kortti;
}

/**
 * Linssin oma yläpalkki Matkakirjan palkin TILALLE (ks. tiedoston
 * alku). Palauttaa { el, pura }.
 */
export function rakennaPalkki({ ui, kohteet, onValinta, onSulje, doc = document }) {
  const palkki = doc.createElement('div');
  palkki.className = 'satelliittipalkki';
  palkki.setAttribute('role', 'group');
  palkki.setAttribute('aria-label', 'Satelliittilinssi');

  const nimi = doc.createElement('span');
  nimi.className = 'satelliittipalkki-nimi';
  nimi.textContent = 'Satelliittilinssi';

  const valinta = doc.createElement('select');
  valinta.className = 'satelliittipalkki-valinta';
  valinta.setAttribute('aria-label', 'Valitse havaintokohde');
  const tyhja = doc.createElement('option');
  tyhja.value = '';
  tyhja.textContent = `Valitse kohde (${kohteet.length})`;
  valinta.appendChild(tyhja);
  for (const kohde of kohteet) {
    const o = doc.createElement('option');
    o.value = kohde.tunnus;
    const maara = kohde.havainnot?.length ?? 0;
    o.textContent = `${kohde.nimi} — ${kohde.seutu} (${maara})`;
    valinta.appendChild(o);
  }
  valinta.addEventListener('change', () => {
    const kohde = kohteet.find((k) => k.tunnus === valinta.value);
    if (kohde) onValinta?.(kohde);
  });

  const ohje = doc.createElement('span');
  ohje.className = 'satelliittipalkki-ohje';
  ohje.textContent = 'Napauta hohtavaa vihreää pistettä: arkistohavainto avautuu.';

  const sulje = doc.createElement('button');
  sulje.type = 'button';
  sulje.className = 'satelliittipalkki-sulje';
  sulje.textContent = 'Sulje linssi';
  sulje.title = 'Sulje linssi ja palaa peliin';
  sulje.addEventListener('click', () => onSulje?.());

  palkki.append(nimi, valinta, ohje, sulje);

  /*
   * YLÄPALKIN KORKEUS MITATAAN ENNEN PIILOTUSTA — sama kaava kuin
   * js/aikajana.js rakennaPalkki, jotta kartta ei hyppää ja linssin
   * palkki istuu täsmälleen Matkakirjan palkin paikalle.
   */
  const topbar = doc.querySelector('.topbar');
  const korkeus = topbar?.getBoundingClientRect?.().height ?? 0;
  if (korkeus > 0) {
    doc.body.style.setProperty('--aikajana-palkki-korkeus', `${Math.round(korkeus)}px`);
  }
  doc.body.classList.add('aikajana-palkki-auki', 'aikajana-paalla');
  (ui?.mapPane ?? doc.body).appendChild(palkki);

  return {
    el: palkki,
    valinta,
    pura: () => {
      palkki.remove();
      doc.body.classList.remove('aikajana-palkki-auki', 'aikajana-paalla');
      doc.body.style.removeProperty('--aikajana-palkki-korkeus');
    },
  };
}

/**
 * Linssi pallolle. `ui` tulee kolmantena js/ui.js:n sytytaLinssistä.
 */
function avaa(lauta, tila, ui) {
  lataaSatelliittiTyyli();
  const kohteet = SATELLIITTI_KOHTEET.filter((k) => (k.havainnot ?? []).length);
  let kortti = null;
  let suljettiin = 0;

  const suljeKortti = () => {
    if (!kortti) return;
    const vanha = kortti;
    kortti = null;
    vanha.satelliittiSulje?.();
  };

  const avaaKohde = (kohde) => {
    /*
     * SULKEVA NAPAUTUS EI AVAA UUTTA (v1783:n sääntö). Kortin oma
     * ulkopuolikuuntelija sulki kortin jo pointerdownissa; ilman tätä
     * lippua sama napautus avaisi clickissä seuraavan pisteen.
     */
    if (Date.now() - suljettiin < 350) return;
    suljeKortti();
    kortti = avaaHavaintokortti({
      kohde,
      ui,
      onSuljettu: () => { suljettiin = Date.now(); kortti = null; },
    });
  };

  const merkit = kohteet.map((kohde) => ({
    avain: `satelliitti:${kohde.tunnus}`,
    lat: kohde.lat,
    lng: kohde.lon,
    elementti: () => merkkiElementti(kohde),
    napautus: () => avaaKohde(kohde),
  }));
  lauta?.linssit?.merkit?.(SATELLIITTI_OSA, merkit);

  const palkki = rakennaPalkki({
    ui,
    kohteet,
    onValinta: (kohde) => {
      // Kamera kohteen ylle; kortti aukeaa vasta pisteen napautuksesta,
      // jotta valinta ei peitä juuri sitä näkymää, johon lennettiin.
      lauta?.kamera?.ajaKamera?.({ lat: kohde.lat, lng: kohde.lon, leveys: SATELLIITTI_LAHIKUVA }, {});
    },
    onSulje: () => ui?.valitseLinssi?.(null),
  });

  return {
    kohteet,
    palkki,
    pura: () => {
      suljeKortti();
      document.querySelectorAll('.satelliitti-vertailu').forEach((el) => el.remove());
      palkki.pura();
      lauta?.linssit?.pura?.(SATELLIITTI_OSA);
      /*
       * MERKIT HÄIVYTETÄÄN ULOS (js/pallolauta/merkit.js poista), ja
       * elementit poistuvat vasta siirtymän jälkeen seuraavassa
       * piirrossa. Pallon silmukka nukkuu lepotilassa, joten se
       * herätetään kahdesti: heti ja häivytyksen päätteeksi — muuten
       * hohtavat pisteet jäisivät ruudulle linssin sulkemisen jälkeen
       * (mitattu 12.9.2026: 21 pistettä jäi yhä DOMiin).
       */
      lauta?.heraa?.();
      setTimeout(() => lauta?.heraa?.(), 400);
    },
  };
}

export const LINSSI = {
  tunnus: 'satelliitti',
  jarjestys: 27,
  // Kerrokseton: linssi ei piirrä tasokartalle kerrosta vaan asuu
  // pallon pinnalla (pallolle alla), kuten radio ja aikajanalinssit.
  kerros: false,
  nimi: 'Satelliittilinssi',
  lyhyt: 'Suuntaa tutkasatelliitin kaukoputki Maahan ja katso oikea arkistohavainto.',
  // Kaukoputki, jonka päässä hohtaa piste.
  ikoni: '<path d="M3.6 15.1 8 6.4l10.9 4.2-3.3 6.5z"/>'
    + '<path d="M9.4 17.6 12 20.6M7.1 20.6h9.4"/>'
    + '<circle cx="19.6" cy="5.1" r="1.6"/>',
  valokuva: false,
  laudat: ['*'],
  lahde: {
    aineisto: SATELLIITTI_LAHDE.aineisto,
    lisenssi: `${SATELLIITTI_LAHDE.lisenssi} (${SATELLIITTI_LAHDE.tekija})`,
    osoite: SATELLIITTI_LAHDE.osoite,
    haettu: SATELLIITTI_LAHDE.haettu,
  },
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};
