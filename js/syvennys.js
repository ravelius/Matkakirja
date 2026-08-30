/*
 * SYVENNYSTARINAT KARTALLA — fokusvirran täkytarinat kohdemerkkeinä.
 *
 * Raamatun kirjaus SYVENNYSTARINAT KARTALLE (omistaja 29.8.2026 ilta,
 * "Sopii"): *"v1326:ssa reitittömiksi jääneet fokusvirtatäkyt —
 * syvennystarinat kuvineen ja 50 punnan minivisoineen … siirretään
 * KARTALLE MERKEIKSI. Lähes kaikki ovat oikeita paikkoja (Niken
 * temppeli, Agora, Korintin kanava), joten jokainen täky saa oman
 * merkin kaupungin ympärille omalla symbolillaan."*
 *
 * Tarinat kirjoitettiin fokusvirran valintavaiheeseen (js/fokusvirta.js
 * `takyt`), mutta valinta on pois käytöstä (FOKUSVIRTA_VALINTA =
 * false) eikä niihin ollut mitään reittiä. Tämä moduuli antaa reitin
 * YHTENÄISEN KOHDEMALLIN mukaisesti (Raamattu 29.8.2026): tarina on
 * kartan tavallinen kohdemerkki, joka piirtyy kohteiden omaan
 * kerrokseen (js/fokuskohteet.js, rekisteröinti kytkeSyvennys) ja
 * löytyy selitevalikon aihevaloilla aihesymbolinsa kautta — ei uutta
 * merkkilajia, ei uutta mekaniikkaa.
 *
 * ── MISTÄ MIKÄKIN TULEE ────────────────────────────────────────────
 *
 *   sisältö     js/packs/fokusvirta-*.js `takyt` (otsikko, teksti,
 *               kuva, visa) — tämä moduuli ei muuta siitä sanaakaan.
 *   paikka      js/packs/syvennyspaikat.js (lat/lon, aihesymboli,
 *               karttanimiö). Laudalle projisoidaan ajossa samalla
 *               kaavalla kuin eläintäyt (js/fokusmitat.js
 *               projisoiLaudalle). Tarina ilman paikkariviä ei saa
 *               merkkiä — se odottaa omaa kartoitusosuuttaan.
 *   kortti      täkynoston lunastuskortin luokat (css/fokusnosto.css)
 *               ja kohdemallin yhteinen ylärivi
 *               (js/fokusnosto-symbolit.js nostosymKortinYlarivi) —
 *               sama visuaalinen malli kuin nostoilla ja eläintäyillä,
 *               erot ovat sisällön laajuus ja aihesymboli.
 *   palkkio     minivisa maksaa TAKY_PALKKIO (50 puntaa) samalla
 *               kirjanpidolla kuin fokusvirran oma visa
 *               (game.actionMinitehtava, avain `fokus:<täky>`): sama
 *               avain, joten sama visa ei voi maksaa kahdesti,
 *               tultiinpa siihen kummasta reitistä tahansa.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * SYVENNYS_/syvennys-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS,
} from './ui-apurit.js';
import { natiiviVastaus } from './natiivi.js';
import { kaupunginJuliste } from './packs/julisteet.js';
import { FOKUSVIRRAT } from './packs/fokusvirrat.js';
import { SYVENNYSPAIKAT } from './packs/syvennyspaikat.js';
import { rekisteroiLisakohteet, suljeKohdeSuurennos } from './fokuskohteet.js';
import { nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { piirraNostonKuva } from './fokusnosto.js';
import { TAKY_PALKKIO } from './fokusvirta.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { sfx } from './sound.js';

/*
 * KAKSI TYYLITIEDOSTOA, MOLEMMAT LAINASSA: kortin kuori ja sisus ovat
 * täkynoston (css/fokusnosto.css) ja minivisa fokusvirran
 * (css/fokusvirta.css) luokkia. Tunnukset ovat samat kuin omistajilla
 * (js/fokusnosto.js, js/fokusvirta.js), joten kumpikin tiedosto
 * ladataan sivulle enintään kerran riippumatta siitä, mikä moduuli
 * ehtii ensin. Yhden tiedoston versiossa tyylit ovat jo <style>-lohkossa.
 */
const SYVENNYS_TYYLIT = [
  ['fokusnosto-tyyli', 'fokusnosto.css'],
  ['fokusvirta-tyyli', 'fokusvirta.css'],
];

function syvennysLataaTyyli() {
  if (typeof document === 'undefined') return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  for (const [tunnus, tiedosto] of SYVENNYS_TYYLIT) {
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
 * NYKYISEN MAAN SYVENNYSTARINAT LISÄKOHTEIKSI.
 *
 * Sama näkyvyysehto kuin täkynostoilla (js/fokusnosto.js nostoPooli):
 * fokusmoodi päällä ja pelaaja ihminen. Maa luetaan laudan omasta
 * taulusta (cityCountry) — tarinat kuuluvat kaupungilleen, mutta
 * kartta näyttää maan, joten maan kaikkien fokuskaupunkien tarinat
 * piirtyvät yhtä aikaa (nyt kartoitetuissa maissa kaupunkeja on yksi).
 */
function syvennysLisakohteet(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  const taulu = ui.game.pack?.map?.cityCountry;
  const iso = (taulu && taulu[city.id]) || null;
  if (!iso) return [];
  const lauta = ui.game.pack?.id;
  const rivit = [];
  for (const [cityId, paikat] of Object.entries(SYVENNYSPAIKAT)) {
    if (taulu[cityId] !== iso) continue;
    for (const taky of FOKUSVIRRAT[cityId]?.takyt ?? []) {
      const tiedot = paikat[taky.id];
      if (!tiedot) continue;
      const paikka = projisoiLaudalle(lauta, tiedot.lon, tiedot.lat);
      if (!paikka) continue;
      rivit.push({
        kohde: {
          id: `syvennys-${cityId}-${taky.id}`,
          nimi: tiedot.nimio ?? taky.otsikko,
          nimio: tiedot.nimio ?? null,
          tyyppi: 'syvennys',
          symboli: tiedot.symboli,
          avaa: (kaytto) => avaaSyvennys(kaytto ?? ui, cityId, taky, tiedot),
        },
        paikka: { x: paikka.x, y: paikka.y },
      });
    }
  }
  return rivit;
}

/* ==================== KORTTI ==================== */

/**
 * SYVENNYSTARINAN KORTTI — ylärivi, otsikko, kuva, tarina ja minivisa.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali —
 * sama sääntö, samat sisusluokat ja sama sulkusopimus kuin täkynoston
 * lunastuskortilla (js/fokusnosto.js avaaNostonKortti) ja eläintäyllä
 * (js/elaintaky.js). Ulkokuori on oma (`syvennys-*`), koska kukin
 * korttiperhe siivoaa omat kerroksensa valitsimella.
 */
export function avaaSyvennys(ui, cityId, taky, tiedot) {
  if (!taky) return;
  sfx.play('paper');
  syvennysLataaTyyli();
  suljeSyvennys(ui);

  const kerros = html('div', 'syvennys-kerros');
  const kortti = html('div', 'syvennys-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', taky.otsikko ?? taky.nappi ?? 'Syvennystarina');

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Kohdemallin yhteinen ylärivi: aihesymboli ja luokan nimi.
  sisalto.appendChild(nostosymKortinYlarivi(tiedot?.symboli, 'fokusnosto-ylarivi'));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', taky.otsikko ?? taky.nappi));
  if (taky.kuva) piirraNostonKuva(ui, sisalto, taky.kuva, 'fokusnosto-kuva', 800, 'syvennysZoom');
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(taky.teksti ?? '')) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  piirraSyvennysVisa(ui, sisalto, cityId, taky);

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeSyvennys(ui);
  };
  sulje.addEventListener('click', kiinni);
  // Napautus kortin ULKOPUOLELLE sulkee; nielu estää saman napautuksen
  // valumisen kartalle (ks. ui-apurit nielaiseSulkevaNapautus).
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.syvennys-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    // Kuvan suurennos sulkeutuu ensin — sama väistö kuin täkynostolla.
    if (ui?.syvennysZoom) return;
    tapahtuma.stopPropagation();
    suljeSyvennys(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.syvennysKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('syvennys-auki');
}

/**
 * MINIVISA JA PALKKIO — sama kirjanpito ja SAMA AVAIN kuin fokusvirran
 * omalla visalla (js/fokusvirta.js piirraMinivisa): `fokus:<täky>` ei
 * voi maksaa kahdesti, tultiinpa korttiin kartalta tai virrasta.
 * Juliste myönnetään ensimmäisestä oikeasta vastauksesta samoin kuin
 * virrassa (game.myonnaJuliste).
 */
function piirraSyvennysVisa(ui, sisalto, cityId, taky) {
  const visa = taky.visa;
  if (!visa) return;
  const laatikko = html('div', 'fokusvirta-visa syvennys-visa');
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  const avain = `${ui.game.pack.id}:${cityId}:fokus:${taky.id}`;
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = visa.fakta ?? 'Tähän on jo vastattu.';
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
      const vastaus = ui.game.actionMinitehtava(cityId, `fokus:${taky.id}`, oikein, TAKY_PALKKIO);
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.className = `fokusvirta-visa-tulos ${oikein ? 'oikein-tulos' : 'vaarin-tulos'}`;
      tulos.textContent = (oikein
        ? `Oikein! +${TAKY_PALKKIO} puntaa. `
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}. `) + (visa.fakta ?? '');
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const leima = ui.buildToast?.({
          kind: 'stamp', icon: 'kukkaro',
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Livian täky ratkesi',
        });
        if (leima) setTimeout(() => ui.removeToast(leima), TOAST_MS.default);
        const juliste = kaupunginJuliste(cityId);
        if (juliste && !ui.game.julisteet?.has(cityId)) {
          ui.game.myonnaJuliste(cityId);
          ui.elavoitaLaukku?.();
          const lunasta = html('button', '', 'Lunasta juliste');
          lunasta.type = 'button';
          lunasta.addEventListener('click', () => ui.naytaJuliste(cityId));
          laatikko.appendChild(lunasta);
        }
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
export function suljeSyvennys(ui) {
  const auki = ui?.syvennysKortti;
  if (ui) ui.syvennysKortti = null;
  auki?.purku?.();
  // Kuvan suurennos on kortin oma jatke — sama siivous kuin
  // täkynostolla (js/fokusnosto.js suljeNostonKortti).
  suljeKohdeSuurennos(ui, 'syvennysZoom');
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.syvennys-kerros')) vanha.remove();
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä — sama kaava ja sama perustelu kuin
 * täkynostolla (js/fokusnosto.js kytkeFokusnosto): rekisteröinti tekee
 * tarinoista kohdekerroksen lisäkohteita, ja niputuksen vartija näkee
 * staattisen tuonnin.
 */
export function kytkeSyvennys() {
  rekisteroiLisakohteet(syvennysLisakohteet);
}

/** Laudan vaihto tai uusi peli: kortti pois. */
export function nollaaSyvennys(ui) {
  suljeSyvennys(ui);
}
