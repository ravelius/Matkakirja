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
 *   2. EI KUVIA tässä erässä (Fablen katselmointi) — kortti on
 *      ylärivi, otsikko, paikka–vuosi-rivi, teksti ja minivisa.
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
import { rekisteroiLisakohteet } from './fokuskohteet.js';
import { nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { TAKY_PALKKIO } from './fokusvirta.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { sfx } from './sound.js';

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
 * SKANDAALIN SISUS — otsikko, paikka–vuosi-rivi, tarina, lähde ja
 * minivisa.
 *
 * Erotettu omaksi funktiokseen 31.8.2026 (kategoria per kaupunki):
 * sama sisus latoutuu joko oman kortin ylärivin alle tai osiona
 * yhdistetyllä lehdellä (js/fokuskohteet.js piirraRyhmanOsiot). Tyyli
 * ladataan tässä samasta syystä kuin syvennystarinalla — osiona
 * kutsuttaessa korttia ei avata lainkaan.
 *
 * LÄHDERIVI ON SAMA RIVI KUIN TÄKYNOSTOLLA (1.9.2026, nostoaudit):
 * sama luokka `fokusnosto-lahde` ja sama paikka — tekstin jälkeen,
 * ennen visaa — kuin js/fokusnosto.js piirraNostonSisus. Kortin
 * yläreunan `paikka · vuosi` on metarivi eikä lähde, vaikka se lainaa
 * samaa tyyliä; siksi rivejä on nyt kaksi ja lähde on alempi.
 */
function piirraSkandaalinSisus(ui, sailio, iso, skandaali) {
  skandaaliLataaTyyli();
  sailio.appendChild(html('h3', 'fokusnosto-kortti-otsikko', skandaali.otsikko));
  const meta = [skandaali.paikka, skandaali.vuosi].filter(Boolean).join(' · ');
  if (meta) sailio.appendChild(html('p', 'fokusnosto-lahde', meta));
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(skandaali.kortti ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  sailio.appendChild(teksti);
  if (skandaali.lahde) sailio.appendChild(html('p', 'fokusnosto-lahde', skandaali.lahde));
  piirraSkandaaliVisa(ui, sailio, iso, skandaali);
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
