/*
 * SKANDAALIT KARTALLA — maan kohut ja huijaukset kohdemerkkeinä.
 *
 * Raamatun kirjaus (SYMBOLITAKSONOMIA → Skandaalit-pääkategoria):
 * kartan selitevalikon Skandaalit-rivi (huuto-symboli) saa oman
 * sisältönsä — opettavia skandaaleja, kohuja ja kuuluisia huijauksia,
 * 2–3 per maa. Data on js/packs/skandaalit.js (maa → skandaalit,
 * Fablen katselmoima erä 30.8.2026); tämä moduuli piirtää ne kartalle
 * ja avaa kortin.
 *
 * Reitti on YHTENÄISEN KOHDEMALLIN mukainen ja seuraa syvennys-
 * tarinoita (js/syvennys.js) rivi riviltä: skandaali on kohteiden
 * kerroksen tavallinen lisäkohde (js/fokuskohteet.js
 * rekisteroiLisakohteet), joka löytyy selitevalikon aihevalolla
 * huuto-symbolinsa kautta — ei uutta merkkilajia, ei uutta
 * mekaniikkaa. Laudalle projisoidaan ajossa (js/fokusmitat.js
 * projisoiLaudalle), joten sama data palvelee jokaista lautaa.
 *
 * ── MIKÄ EROAA SYVENNYKSISTÄ ───────────────────────────────────────
 *
 *   1. AVAIN ON MAA, EI KAUPUNKI. Syvennystarinat kuuluvat fokus-
 *      kaupungeilleen; skandaalit kuuluvat maalleen, joten lähde lukee
 *      SKANDAALIT[iso]-listan suoraan eikä kierrä kaupunkien kautta.
 *   2. KUVIA ON LISTA, JA LISTA ON VALINNAINEN. Erä 30.8.2026 tehtiin
 *      kuvattomana, ja kuvaton kortti piirtyy yhä ennallaan: ylärivi,
 *      otsikko, paikka–vuosi-rivi, teksti ja minivisa. Kuvat asuvat
 *      `kuvat`-listassa (`[{ osoite | tiedosto, selite, lahde }]`),
 *      jonka ensimmäinen on Matkakirjan oma havainnekuva ja loput
 *      aikalaiskuvia Commonsista (omistajan linjaus 2.9.2026:
 *      *"ensimmäisenä kuvana generoitu parempilaatuinen kuva, ja jos
 *      valokuvia/aikalaiskuvia on, ne liitetään mukaan"*). Yhden kuvan
 *      skandaali piirtyy samalla apurilla kuin syvennystarina
 *      (js/fokusnosto.js piirraNostonKuva), useamman kuvan skandaali
 *      saa selailunuolet ja laskurin kuten historian hetki
 *      (js/historian-hetket.js) ja lehden nostogalleria (js/ui.js
 *      kaariNostoGalleria). Vanha yhden kuvan `kuva`-kenttä kelpaa
 *      yhä: se luetaan yhden alkion listana (skandaalinKuvat), joten
 *      erän 1.9.2026 kolme Wienin havainnekuvaa toimivat ennallaan.
 *   3. MINITEHTÄVÄAVAIN on skandaali:<id> (kirjanpito game.js
 *      actionMinitehtava, koko avain <lauta>:<maa>:skandaali:<id>),
 *      joten sama visa ei voi maksaa kahdesti. Palkkio on sama
 *      TAKY_PALKKIO (50 puntaa) kuin syvennysvisassa — sisar-
 *      mekaniikka, sama hinta. Julistetta ei myönnetä: juliste on
 *      kaupungin palkinto, ja skandaali on maan juttu.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * SKANDAALI_/skandaali-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS,
} from './ui-apurit.js';
import { natiiviVastaus } from './natiivi.js';
import { SKANDAALIT } from './packs/skandaalit.js';
import {
  avaaKohdeSuurennos, rekisteroiLisakohteet, suljeKohdeSuurennos,
} from './fokuskohteet.js';
import { nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { asetaNostonKuva, piirraNostonKuva } from './fokusnosto.js';
import { taytaLahderivi } from './tekijakortti.js';
import { TAKY_PALKKIO } from './fokusvirta.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { sfx } from './sound.js';

/** Kortin kuvan leveys (sama kuin syvennystarinalla). */
const SKANDAALI_KUVA_PX = 800;

/*
 * KAKSI TYYLITIEDOSTOA, MOLEMMAT LAINASSA — sama järjestely ja sama
 * perustelu kuin syvennystarinoilla (js/syvennys.js): kortin sisus on
 * täkynoston (css/fokusnosto.css) ja minivisa fokusvirran
 * (css/fokusvirta.css) luokkia, ja tunnukset ovat samat kuin
 * omistajilla, joten kumpikin tiedosto ladataan sivulle enintään
 * kerran. Yhden tiedoston versiossa tyylit ovat jo <style>-lohkossa.
 */
const SKANDAALI_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['fokusvirta-tyyli', 'fokusvirta.css'],
];

function skandaaliLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of SKANDAALI_TYYLIT) {
    if (document.getElementById(tunnus)) continue;
    const linkki = document.createElement('link');
    linkki.id = tunnus;
    linkki.rel = 'stylesheet';
    linkki.href = new URL(tiedosto, peruslinkki.href).href;
    document.head.appendChild(linkki);
  }
}

/* ==================== MERKIT KOHDEKERROKSEEN ==================== */

/**
 * MAAN SKANDAALIT KARTTARIVEIKSI — LAUDAN DATASTA, ILMAN PELIÄ.
 *
 * Viety ulos 31.8.2026 samasta syystä kuin syvennystarinoilla
 * (js/syvennys.js syvennysKarttarivit): laattageneraattori polttaa
 * nämä merkit, ja niiden tunnus, nimi, symboli ja paikka on saatava
 * samasta koodista kuin pelin oma merkki.
 */
export function skandaaliKarttarivit(iso, lauta) {
  const rivit = [];
  for (const skandaali of SKANDAALIT[iso] ?? []) {
    const paikka = projisoiLaudalle(lauta, skandaali.lon, skandaali.lat);
    if (!paikka) continue;
    rivit.push({
      skandaali,
      kohde: {
        id: `skandaali-${skandaali.id}`,
        nimi: skandaali.nimio ?? skandaali.otsikko,
        nimio: skandaali.nimio ?? null,
        tyyppi: 'skandaali',
        symboli: 'huuto',
      },
      paikka: { x: paikka.x, y: paikka.y },
    });
  }
  return rivit;
}

/**
 * NYKYISEN MAAN SKANDAALIT LISÄKOHTEIKSI.
 *
 * Sama näkyvyysehto kuin syvennystarinoilla (js/syvennys.js
 * syvennysLisakohteet): fokusmoodi päällä ja pelaaja ihminen. Maa
 * luetaan laudan omasta taulusta (cityCountry) — kartta näyttää maan,
 * joten maan kaikki skandaalit piirtyvät yhtä aikaa.
 */
function skandaaliLisakohteet(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  const iso = ui.game.pack?.map?.cityCountry?.[city.id] || null;
  if (!iso) return [];
  return skandaaliKarttarivit(iso, ui.game.pack?.id)
    .map(({ skandaali, kohde, paikka }) => ({
      kohde: {
        ...kohde,
        avaa: (kaytto) => avaaSkandaali(kaytto ?? ui, iso, skandaali),
      },
      paikka,
    }));
}

/* ==================== KORTTI ==================== */

/**
 * SKANDAALIKORTTI — ylärivi, otsikko, paikka–vuosi-rivi, tarina ja
 * minivisa.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali —
 * sama sääntö, samat sisusluokat ja sama sulkusopimus kuin
 * syvennystarinalla (js/syvennys.js avaaSyvennys). Ulkokuori on oma
 * (`skandaali-*`), koska kukin korttiperhe siivoaa omat kerroksensa
 * valitsimella. Paikka ja vuosi latoutuvat lähderivin luokalla
 * (css/fokusnosto.css .fokusnosto-lahde) otsikon alle — hiljainen
 * pikkurivi, ei uutta UI-kieltä.
 */
export function avaaSkandaali(ui, iso, skandaali) {
  if (!skandaali) return;
  sfx.play('paper');
  skandaaliLataaTyyli();
  suljeSkandaali(ui);

  const kerros = html('div', 'skandaali-kerros');
  const kortti = html('div', 'skandaali-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', skandaali.otsikko ?? 'Skandaali');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Kohdemallin yhteinen ylärivi: aihesymboli ja luokan nimi.
  sisalto.appendChild(nostosymKortinYlarivi('huuto', 'fokusnosto-ylarivi'));
  piirraSkandaalinSisus(ui, sisalto, iso, skandaali);

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeSkandaali(ui);
  };
  sulje.addEventListener('click', kiinni);
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus).
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.skandaali-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    // Kuvan suurennos sulkeutuu ensin — sama väistö kuin syvennyksellä.
    if (ui?.skandaaliZoom) return;
    tapahtuma.stopPropagation();
    suljeSkandaali(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.skandaaliKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('skandaali-auki');
}

/**
 * SKANDAALIN SISUS — otsikko, paikka–vuosi-rivi, tarina ja minivisa.
 *
 * Erotettu omaksi funktiokseen 31.8.2026 (kategoria per kaupunki):
 * sama sisus latoutuu joko oman kortin ylärivin alle tai osiona
 * yhdistetyllä lehdellä (js/fokuskohteet.js piirraRyhmanOsiot). Tyyli
 * ladataan tässä samasta syystä kuin syvennystarinalla — osiona
 * kutsuttaessa korttia ei avata lainkaan.
 */
function piirraSkandaalinSisus(ui, sailio, iso, skandaali) {
  skandaaliLataaTyyli();
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko', skandaali.otsikko));
  // Paikka ja vuosi otsikon alle (ks. funktion otsake). Metarivi on
  // ennen kuvaa, jotta kuvan alla oleva kuvateksti ja lähderivi eivät
  // jää kahden pikkurivin väliin.
  const meta = [skandaali.paikka, skandaali.vuosi].filter(Boolean).join(' · ');
  if (meta) sailio.appendChild(html('p', 'fokusnosto-lahde', meta));
  piirraSkandaalinKuvat(ui, sailio, skandaali);
  const teksti = html('div', 'fokusnosto-teksti');
  /*
   * INGRESSI ENSIN, SITTEN JUTTU (omistajan havainto 2.9.2026: kortti
   * "näyttää tyngältä, puuttuu tekstiä"). `kortti` on Fablen hyväksymä
   * 3–4 virkkeen ingressi ja `teksti` sen alle latoutuva juttu, joten
   * ingressi erottuu omalla luokallaan ja juttu jakautuu kappaleisiin
   * kirjoittajan omista tyhjistä riveistä (ui-apurit jaaKappaleiksi).
   * Ilman `teksti`-kenttää kortti latoo pelkän ingressin kuten ennen.
   */
  for (const kappale of jaaKappaleiksi(skandaali.kortti ?? '')) {
    teksti.appendChild(html('p', 'skandaali-ingressi', kappale));
  }
  for (const kappale of jaaKappaleiksi(skandaali.teksti ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  sailio.appendChild(teksti);
  piirraSkandaaliVisa(ui, sailio, iso, skandaali);
}

/**
 * KORTIN KUVAT YHTENÄ LISTANA.
 *
 * Uusi `kuvat` voittaa, vanha yhden kuvan `kuva` kelpaa yhä (ks.
 * moduulin otsake, kohta 2). Kuvaton alkio karsitaan tässä, jotta
 * galleria ei koskaan näytä laskurissa kuvaa, jota ei ole.
 *
 * @param {object} skandaali skandaalin tietue
 * @returns {object[]} kuvat piirtojärjestyksessä
 */
export function skandaalinKuvat(skandaali) {
  const lista = Array.isArray(skandaali?.kuvat) ? skandaali.kuvat : [];
  if (lista.length) return lista.filter((kuva) => kuva?.osoite || kuva?.tiedosto);
  return skandaali?.kuva ? [skandaali.kuva] : [];
}

/**
 * KUVAT KORTTIIN: yksi kuva entiseen tapaan, useampi selailunuolin.
 *
 * Yhden kuvan reitti on tarkoituksella muuttumaton — se on sama kutsu,
 * sama leveys ja sama zoomiavain kuin syvennystarinalla (js/syvennys.js
 * piirraSyvennysSisus), joten Wienin kolme havainnekuvaa piirtyvät
 * täsmälleen kuten ennen. Galleria on oma haaransa ja seuraa historian
 * hetken mallia (js/historian-hetket.js piirraHetkenKuvat): pääkuva
 * isona, nuolet ja laskuri kuvan päällä, kuvateksti ja lähderivi
 * vaihtuvat kuvan mukana.
 */
function piirraSkandaalinKuvat(ui, sailio, skandaali) {
  const kuvat = skandaalinKuvat(skandaali);
  if (!kuvat.length) return;
  if (kuvat.length === 1) {
    piirraNostonKuva(ui, sailio, kuvat[0], 'fokusnosto-kuva', SKANDAALI_KUVA_PX, 'skandaaliZoom');
    return;
  }
  piirraSkandaalinGalleria(ui, sailio, skandaali, kuvat);
}

/**
 * SELATTAVA KUVASARJA.
 *
 * PUUTTUVA KUVA POISTUU SARJASTA. Havainnekuva syntyy kuvajonossa
 * skandaali kerrallaan, joten sarjassa voi olla osoite, jota ämpärissä
 * ei vielä ole. Virheen sattuessa kuva pudotetaan listalta ja
 * seuraava näytetään; jos yksikään ei lataudu, koko kehys piiloutuu
 * eikä kortille jää tyhjää laatikkoa lupaamaan kuvaa, jota ei ole.
 */
function piirraSkandaalinGalleria(ui, sailio, skandaali, kuvat) {
  const jaljella = [...kuvat];
  const kehys = html('figure', 'fokusnosto-kuva skandaali-kuva');
  const nappi = html('button', 'fokusnosto-kuvanappi');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const img = document.createElement('img');
  img.decoding = 'async';
  img.draggable = false;
  nappi.appendChild(img);
  kehys.appendChild(nappi);

  const kuvateksti = html('figcaption', 'fokusnosto-kuvateksti');
  const selite = html('span', 'fokusnosto-kuvaselite');
  const lahderivi = html('span', 'fokusnosto-kuvalahde');
  kuvateksti.append(selite, lahderivi);
  kehys.appendChild(kuvateksti);

  const laskuri = html('span', 'skandaali-kuvalaskuri');
  let kohdalla = 0;

  const nayta = () => {
    if (!jaljella.length) {
      kehys.hidden = true;
      return;
    }
    kohdalla = ((kohdalla % jaljella.length) + jaljella.length) % jaljella.length;
    const kuva = jaljella[kohdalla];
    img.alt = kuva.selite ?? skandaali.otsikko ?? '';
    nappi.setAttribute('aria-label', `${kuva.selite ?? 'Kuva'} — avaa suurena`);
    selite.textContent = kuva.selite ?? '';
    /*
     * LÄHDERIVI ON KUVAN OMA, ja se kulkee taytaLahderivin läpi, joten
     * "Matkakirjan havainnekuva" saa painettavan selitteen joka kerta
     * (js/havainnekuva.js) ja Commons-kuvan tekijä näkyy niin kuin
     * lisenssi vaatii.
     */
    taytaLahderivi(lahderivi, kuva.lahde ?? '', kuva);
    laskuri.textContent = jaljella.length > 1 ? `${kohdalla + 1} / ${jaljella.length}` : '';
    laskuri.hidden = jaljella.length < 2;
    asetaNostonKuva(img, kuva, SKANDAALI_KUVA_PX, () => {
      const paikka = jaljella.indexOf(kuva);
      if (paikka < 0) return;
      jaljella.splice(paikka, 1);
      if (kohdalla > paikka) kohdalla -= 1;
      nayta();
    });
  };
  nayta();

  // Napautus suurentaa, kuten kortin muillakin kuvilla; suurennos saa
  // sen kuvan, joka on kohdalla.
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (!jaljella.length) return;
    avaaKohdeSuurennos(ui, jaljella[kohdalla], () => nappi, 'skandaaliZoom');
  });

  const nuoli = (luokka, merkki, nimi, suunta) => {
    const nap = html('button', `skandaali-kuvanuoli ${luokka}`, merkki);
    nap.type = 'button';
    nap.setAttribute('aria-label', nimi);
    nap.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (jaljella.length < 2) return;
      kohdalla += suunta;
      sfx.play('paper');
      nayta();
    });
    nappi.appendChild(nap);
  };
  nuoli('edellinen', '‹', 'Edellinen kuva', -1);
  nuoli('seuraava', '›', 'Seuraava kuva', 1);
  nappi.appendChild(laskuri);

  sailio.appendChild(kehys);
}

/**
 * MINIVISA JA PALKKIO — sama kirjanpito kuin syvennysvisassa
 * (js/syvennys.js piirraSyvennysVisa), avain skandaali:<id>. Jo
 * maksettu visa näyttää kuittauksen eikä nappeja.
 */
function piirraSkandaaliVisa(ui, sisalto, iso, skandaali) {
  const visa = skandaali.visa;
  if (!visa) return;
  const laatikko = html('div', 'fokusvirta-visa skandaali-visa');
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  const avain = `${ui.game.pack.id}:${iso}:skandaali:${skandaali.id}`;
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = 'Tähän on jo vastattu.';
    laatikko.appendChild(tulos);
    sisalto.appendChild(laatikko);
    return;
  }
  // Palkkio näkyviin ennen vastaamista, kuten syvennysvisassa
  // (omistaja 1.9.2026: "lopussa oleva kysymys ei mainitse, mitä
  // siitä voi voittaa").
  laatikko.appendChild(html('p', 'fokusvirta-visa-palkkio',
    `Oikeasta vastauksesta saat ${TAKY_PALKKIO} puntaa.`));
  const vaihtoehdot = html('div', 'fokusvirta-vaihtoehdot');
  visa.vaihtoehdot.forEach((tekstiRivi, i) => {
    const nap = html('button', '', tekstiRivi);
    nap.type = 'button';
    nap.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(
        iso, `skandaali:${skandaali.id}`, oikein, TAKY_PALKKIO,
      );
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.className = `fokusvirta-visa-tulos ${oikein ? 'oikein-tulos' : 'vaarin-tulos'}`;
      tulos.textContent = oikein
        ? `Oikein! +${TAKY_PALKKIO} puntaa.`
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}.`;
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const leima = ui.buildToast?.({
          kind: 'stamp', icon: 'kukkaro',
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Skandaali selvisi',
        });
        if (leima) setTimeout(() => ui.removeToast(leima), TOAST_MS.default);
      }
      ui.onChange?.(ui.game);
      ui.renderTurnPill?.();
    });
    vaihtoehdot.appendChild(nap);
  });
  laatikko.append(vaihtoehdot, tulos);
  sisalto.appendChild(laatikko);
}

/** Kortti pois ja kuuntelijat puretaan. */
export function suljeSkandaali(ui) {
  const auki = ui?.skandaaliKortti;
  if (ui) ui.skandaaliKortti = null;
  auki?.purku?.();
  // Kuvan suurennos on kortin oma jatke — sama siivous kuin
  // syvennystarinalla (js/syvennys.js suljeSyvennys).
  suljeKohdeSuurennos(ui, 'skandaaliZoom');
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.skandaali-kerros')) vanha.remove();
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä — sama kaava ja sama perustelu kuin
 * syvennystarinoilla (js/syvennys.js kytkeSyvennys): rekisteröinti
 * tekee skandaaleista kohdekerroksen lisäkohteita, ja niputuksen
 * vartija näkee staattisen tuonnin.
 */
export function kytkeSkandaalit() {
  rekisteroiLisakohteet(skandaaliLisakohteet);
}

/** Laudan vaihto tai uusi peli: kortti pois. */
export function nollaaSkandaalit(ui) {
  suljeSkandaali(ui);
}
