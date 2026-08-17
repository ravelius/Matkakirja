/*
 * Vertailutila ja Maiden tiedot -tila: kartan tilat, joissa kaupungit
 * väistyvät ja maat ovat napautettavia. Siirretty js/ui.js:stä
 * 17.8.2026 (remontin M3, mallin B pilotti). Funktiot saavat
 * ui-olion ensimmäisenä parametrinaan: ne LUKEVAT ui:n tilaa ja
 * kutsuvat sen julkisia metodeja, mutta KIRJOITTAVAT vain oman
 * piirteensä kenttiä (ui.vertailu*, ui.maatiedot*) — tämä on mallin
 * B omistajuussääntö.
 */

import { el } from './mapart.js';
import { sfx } from './sound.js';
import { MAATIEDOT } from './sisaltotaulut.js';
import { TOAST_MS, html } from './ui-apurit.js';

/*
 * Vertailun värit valintajärjestyksessä: sama lista kuin
 * js/maakayrat.js:n VERTAILUVARIT. Se on tässä toisintona, koska
 * karttanäkymän alapalkki tarvitsee värit heti eikä maakayrat.js
 * lataudu ennen kuin vertailunäkymä avataan (laiska tuonti, ks.
 * piirraMaaNumerotSivu). Testi vahtii, etteivät listat eriydy.
 */
const VERTAILUVARIT = [
  'maakayra-viiva', 'maakayra-toinen', 'maakayra-kolmas', 'maakayra-neljas',
];
/*
 * ===================================================================
 * VERTAILUTILA (v321)
 * ===================================================================
 *
 * Omistajan malli 7.8.2026: *"vertailulinssi vois toimia hieman eri
 * tavalla kuin nyt. eli ei upoteta näkymää tutki osioon vaan linssi
 * toimisi suoraan karttanäkymässä mutta muuttaisi sen niin että
 * kaupungit poistuisivat ja maiden rajat näkyisivät selvemmin."*
 *
 * Tila on rakennettu radiotilan mallin mukaan: bodyn luokka piilottaa
 * muun toiminnan, kartalle tulee oma kerros ja alanapit korvautuvat
 * omalla palkilla. Näin tila purkautuu varmasti myös silloin, kun
 * linssi sammuu jotain muuta kautta.
 *
 * Valinta on enintään kolme maata + Suomi valmiina vaihtoehtona.
 * Suomi ei ole erikoistapaus koodissa: se on tavallinen valinta,
 * joka vain asetetaan valmiiksi, ja sen voi ottaa poiskin.
 */
export function vertailuPaalla() {
  return document.body.classList.contains('vertailu-tila');
}

/** Enimmäismäärä: kolme maata + Suomi valmiina. */
export const VERTAILU_MAX = 4;

/** Kytkee vertailutilan päälle tai pois. */
export function tahdistaVertailu(ui, halutaan) {
  if (halutaan === vertailuPaalla()) {
    if (halutaan) rakennaVertailuPalkki(ui);
    return;
  }
  document.body.classList.toggle('vertailu-tila', halutaan);
  if (halutaan) {
    /*
     * Suomi valmiina vaihtoehtona (omistajan toive). Se otetaan
     * mukaan vain, jos laudalla on Suomen muoto — Afrikan laudalla
     * ei ole, eikä tyhjää valintaa kannata tehdä.
     */
    if (!ui.vertailuValinnat?.length) {
      const suomiOn = Boolean(ui.game.pack.map?.countryShapes?.FIN);
      ui.vertailuValinnat = suomiOn ? ['FIN'] : [];
    }
    piirraVertailuMaat(ui);
    rakennaVertailuPalkki(ui);
  } else {
    ui.vertailuKerros?.remove();
    ui.vertailuKerros = null;
    ui.vertailuPalkki?.remove();
    ui.vertailuPalkki = null;
    suljeVertailuNakyma();
  }
  ui.drawTargets();
}

/**
 * Kaikkien maiden muodot omaan kerrokseensa napautettavina.
 *
 * Kerros menee kaupunkien tilalle samaan juureen: se kiertyy ja
 * zoomautuu kartan mukana ilman omaa laskentaa. Nimi kirjoitetaan
 * vain maille, joiden muoto on tarpeeksi leveä — muuten pikkuvaltiot
 * täyttäisivät kartan kaunokirjoituksella.
 */
export function piirraVertailuMaat(ui) {
  const map = ui.game.pack.map;
  const muodot = map?.countryShapes;
  if (!muodot || !ui.svg) return;
  ui.vertailuKerros?.remove();
  ui.vertailuKerros = el('g', { class: 'vertailu-maat' }, ui.boardRoot ?? ui.svg);
  for (const [iso, maa] of Object.entries(muodot)) {
    if (!maa?.renkaat?.length) continue;
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    const valittu = ui.vertailuValinnat?.includes(iso);
    const polku = el('path', {
      d,
      class: `vertailu-maa${valittu ? ' valittu' : ''}`,
      'aria-label': maa.nimi,
    }, ui.vertailuKerros);
    polku.addEventListener('click', (e) => {
      // Napautus ei saa vuotaa kartalle: maailmankartalla se
      // zoomaisi ja muualla kutistaisi päiväkirjan.
      e.stopPropagation();
      valitseVertailuMaa(ui, iso);
    });
    if (maa.leveys >= 60) {
      const koko = Math.max(11, Math.min(22, (maa.leveys * 0.8) / Math.max(4, maa.nimi.length)));
      const nimi = el('text', {
        x: maa.keskus[0],
        y: maa.keskus[1],
        class: 'vertailu-maa-nimi',
        'text-anchor': 'middle',
        'font-size': koko.toFixed(0),
      }, ui.vertailuKerros);
      nimi.textContent = maa.nimi;
    }
  }
}

/**
 * MAIDEN TIEDOT -TILA (v350).
 *
 * Sama kartan tila kuin vertailussa — kaupungit väistyvät ja maat
 * ovat napautettavia — mutta ele tarkoittaa eri asiaa: vertailu
 * KERÄÄ maita listalle, tämä AVAA yhden maan luettavaksi.
 *
 * Napautus valitsee maan: sen rajat korostuvat ja oikean yläkulman
 * maakyltti näyttää nimen ja lipun — kyltistä maan lehti aukeaa
 * (omistajan tarkennus 14.8.2026; aiemmin nimi ja "i" piirtyivät
 * kartalle). Kaksi vaihetta yhden sijaan siksi, että kartalla osuu
 * helposti väärään maahan — ensimmäinen napautus näyttää mihin
 * osui, vasta kyltti avaa lehden.
 */
export function tahdistaMaatiedot(ui, halutaan) {
  const paalla = document.body.classList.contains('maatiedot-tila');
  if (halutaan === paalla) return;
  document.body.classList.toggle('maatiedot-tila', halutaan);
  if (halutaan) {
    ui.maatiedotValittu = null;
    piirraMaatiedotMaat(ui);
  } else {
    ui.maatiedotKerros?.remove();
    ui.maatiedotKerros = null;
    ui.maatiedotValittu = null;
    // Selailu on voinut viedä pillerin toiseen maahan — takaisin
    // pelaajan omaan, kun tila suljetaan.
    palautaPilleriPelaajalle(ui);
  }
  ui.drawTargets();
}

/** Pilleri takaisin pelaajan nykyiseen maahan (maaselaimen jäljiltä). */
export function palautaPilleriPelaajalle(ui) {
  const map = ui.game.pack.map;
  const city = ui.game.cityOf?.();
  const iso = city ? map.cityCountry?.[city.id] : null;
  ui.paivitaMaaPilleri(iso ? map.countryShapes?.[iso] : null, iso ?? null);
}

/** Maiden muodot napautettavina; valitulle nimi ja "i". */
export function piirraMaatiedotMaat(ui) {
  const muodot = ui.game.pack.map?.countryShapes;
  if (!muodot || !ui.svg) return;
  ui.maatiedotKerros?.remove();
  ui.maatiedotKerros = el('g', { class: 'maatiedot-maat' }, ui.boardRoot ?? ui.svg);
  for (const [iso, maa] of Object.entries(muodot)) {
    if (!maa?.renkaat?.length) continue;
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    const valittu = ui.maatiedotValittu === iso;
    const polku = el('path', {
      d,
      class: `maatiedot-maa${valittu ? ' valittu' : ''}`,
      'aria-label': maa.nimi,
    }, ui.maatiedotKerros);
    polku.addEventListener('click', (e) => {
      // Napautus ei saa vuotaa kartalle (zoom, päiväkirjan kutistus).
      e.stopPropagation();
      ui.maatiedotValittu = valittu ? null : iso;
      sfx.play('paper');
      piirraMaatiedotMaat(ui);
    });
  }
  /*
   * Valitun maan nimi ja lippu MAAKYLTTIIN, ei kartalle (omistaja
   * 14.8.2026: "oikealla saisi näkyä sama maakyltti kuin normaali-
   * tilassa"). Kartalle jää vain rajakorostus; kyltti kertoo mihin
   * osui, ja kyltin napautus avaa maan lehden — sama nappi, sama
   * ele kuin normaalitilassa. Ilman valintaa kyltti näyttää pelaajan
   * oman maan kuten muulloinkin.
   */
  const valittuIso = ui.maatiedotValittu;
  if (valittuIso) ui.paivitaMaaPilleri(muodot[valittuIso], valittuIso);
  else palautaPilleriPelaajalle(ui);
}

/** Maa valintaan tai pois siitä. Täysi lista ei ota enempää. */
export function valitseVertailuMaa(ui, iso) {
  const lista = ui.vertailuValinnat ?? [];
  if (lista.includes(iso)) {
    ui.vertailuValinnat = lista.filter((k) => k !== iso);
  } else {
    if (lista.length >= VERTAILU_MAX) {
      const laatikko = ui.buildToast({
        kind: 'info',
        text: `Vertailuun mahtuu ${VERTAILU_MAX} maata`,
        sub: 'Poista ensin jokin lappu alapalkista.',
      });
      setTimeout(() => ui.removeToast(laatikko), TOAST_MS.default);
      return;
    }
    ui.vertailuValinnat = [...lista, iso];
  }
  sfx.play('paper');
  piirraVertailuMaat(ui);
  rakennaVertailuPalkki(ui);
}

/**
 * Alapalkki Tutki- ja nopanheittonappien tilalle: valitut maat
 * lappuina ja oikeassa reunassa Vertaa-nappi.
 *
 * Palkki on bodyn lapsi eikä kartan: se ei saa vieriä kartan mukana
 * eikä kadota kosketuskohteitaan zoomatessa (sama ratkaisu kuin
 * Tutki-ikkunan sivunavigaatiossa).
 */
export function rakennaVertailuPalkki(ui) {
  if (!vertailuPaalla()) return;
  if (!ui.vertailuPalkki) {
    ui.vertailuPalkki = html('div', 'vertailu-palkki');
    document.body.appendChild(ui.vertailuPalkki);
  }
  const palkki = ui.vertailuPalkki;
  palkki.replaceChildren();
  const valitut = ui.vertailuValinnat ?? [];
  const muodot = ui.game.pack.map?.countryShapes ?? {};
  if (!valitut.length) {
    palkki.appendChild(html('p', 'vertailu-ohje', 'Napauta kartalta maat, joita haluat verrata.'));
    return;
  }
  for (const [i, iso] of valitut.entries()) {
    const lappu = html('button', 'vertailu-lappu');
    lappu.type = 'button';
    lappu.title = 'Poista vertailusta';
    const laatta = html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`);
    lappu.appendChild(laatta);
    lappu.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
    lappu.addEventListener('click', () => valitseVertailuMaa(ui, iso));
    palkki.appendChild(lappu);
  }
  const vertaa = html('button', 'primary vertailu-vertaa', 'Vertaa');
  vertaa.type = 'button';
  vertaa.disabled = valitut.length < 2;
  vertaa.title = valitut.length < 2 ? 'Valitse vähintään kaksi maata' : 'Avaa vertailu';
  vertaa.addEventListener('click', () => avaaVertailuNakyma(ui));
  palkki.appendChild(vertaa);
}

/**
 * Vertailunäkymä: valitut maat rinnakkain samoilla asteikoilla.
 *
 * Yläreunassa maiden napit (kytke päälle tai pois) ja "Muuta
 * valintoja", joka palaa kartalle — vertailu on siis kaksisuuntainen
 * eikä umpikuja (omistajan malli). Ylärivin napit eivät muuta
 * KARTAN valintaa vaan sitä, mitkä valituista piirretään: kartalta
 * poistaminen on eri asia kuin viivan sammuttaminen hetkeksi.
 *
 * Aineisto ja piirtäjä haetaan laiskasti kuten Maa numeroina
 * -sivulla: yhden tiedoston versio jää ilman kumpaakin ja saa saman
 * kohteliaan verkkoyhteysrivin.
 */
export async function avaaVertailuNakyma(ui) {
  const dialogi = document.getElementById('vertailu-dialog');
  const sisalto = document.getElementById('vertailu-sisalto');
  const ylarivi = document.getElementById('vertailu-ylarivi');
  if (!dialogi || !sisalto || !ylarivi) return;
  ui.vertailuPois ??= new Set();
  if (!dialogi.open) dialogi.showModal();
  ui.nollaaDialoginVieritys(dialogi);
  sisalto.replaceChildren(html('p', 'johdanto', 'Haetaan tilastoja…'));
  rakennaVertailuYlarivi(ui);
  try {
    const { lataaMaakayrat, piirraVertailu } = await import('./maakayrat.js');
    const data = await lataaMaakayrat();
    if (!dialogi.open) return;
    if (!data) {
      sisalto.replaceChildren(html('p', 'johdanto',
        'Tämä näkymä tarvitsee verkkoyhteyden ensimmäisellä avauksella '
        + '— luvut haetaan silloin talteen.'));
      return;
    }
    const isot = (ui.vertailuValinnat ?? []).filter((iso) => !ui.vertailuPois.has(iso));
    const kortit = {};
    const muodot = ui.game.pack.map?.countryShapes ?? {};
    for (const iso of isot) {
      kortit[iso] = {
        nimi: muodot[iso]?.nimi ?? iso,
        kartta: ui.piirraMaakartta(iso, null),
        tunnusluvut: rakennaVertailuTunnusluvut(ui, iso),
      };
    }
    piirraVertailu(sisalto, isot, data, { kortit });
  } catch (syy) {
    console.error(syy);
    sisalto.replaceChildren(html('p', 'johdanto', 'Tilastoja ei saatu haettua.'));
  }
}

/** Ylärivin napit: maat päälle/pois ja paluu kartalle. */
export function rakennaVertailuYlarivi(ui) {
  const ylarivi = document.getElementById('vertailu-ylarivi');
  if (!ylarivi) return;
  ylarivi.replaceChildren();
  const muodot = ui.game.pack.map?.countryShapes ?? {};
  for (const [i, iso] of (ui.vertailuValinnat ?? []).entries()) {
    const paalla = !ui.vertailuPois.has(iso);
    const nappi = html('button', 'vertailu-lappu');
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', paalla ? 'true' : 'false');
    nappi.appendChild(html('span', `vertailu-laatta ${VERTAILUVARIT[i] ?? ''}-laatta`));
    nappi.appendChild(document.createTextNode(muodot[iso]?.nimi ?? iso));
    nappi.addEventListener('click', () => {
      if (ui.vertailuPois.has(iso)) ui.vertailuPois.delete(iso);
      else ui.vertailuPois.add(iso);
      void avaaVertailuNakyma(ui);
    });
    ylarivi.appendChild(nappi);
  }
  const muuta = html('button', 'ghost vertailu-muuta', 'Muuta valintoja');
  muuta.type = 'button';
  muuta.addEventListener('click', () => suljeVertailuNakyma());
  ylarivi.appendChild(muuta);
}

/** Sulkee näkymän ja palaa karttaan valitsemaan maita. */
export function suljeVertailuNakyma() {
  const dialogi = document.getElementById('vertailu-dialog');
  if (dialogi?.open) dialogi.close();
}

/**
 * Maan tunnusluvut vertailukorttiin tiiviinä rivinä.
 *
 * Erillään maaosaston naytaMaaTunnusluvut-piirrosta tarkoituksella:
 * se rakentaa palkit, tervehdykset ja V-Dem-infoikkunan kiinteisiin
 * elementteihin, eikä kortille kuulu niistä yksikään. Yhteistä on
 * vain lähde (MAATIEDOT), ja luvut näytetään samassa muodossa.
 */
export function rakennaVertailuTunnusluvut(ui, iso) {
  const tiedot = (MAATIEDOT[ui.game.pack.id] ?? {})[iso] ?? null;
  if (!tiedot) return null;
  const lista = html('ul', 'vertailu-luvut');
  const rivi = (nimio, arvo) => {
    if (!arvo) return;
    const li = html('li', '');
    li.appendChild(html('span', 'vertailu-luku-nimio', nimio));
    li.appendChild(document.createTextNode(arvo));
    lista.appendChild(li);
  };
  rivi('Väkiluku ', tiedot.vakiluku);
  rivi('Pinta-ala ', tiedot.pintaAla);
  rivi('Tulot ', tiedot.keskitulo?.arvo);
  rivi('V-Dem ', tiedot.demokratia?.arvo);
  return lista.children.length ? lista : null;
}

