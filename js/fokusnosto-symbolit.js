/*
 * TÄKYSYMBOLIT — poolin muut täyt kartan omina merkkeinä.
 *
 * Raamatun osio "Fokusmoodi", kohta TÄKYSYMBOLIT (omistaja 25.8.2026):
 * *"kartalla on tekstikuplassa VAIN YKSI täkynosto kerrallaan; muut
 * vastaavat täkykohteet merkitään yksinkertaisilla symboleilla —
 * keltainen huutomerkki tms. skandaalille/uskomattomalle, ja SÖPÖILLE
 * eläinkohteille PÖLLÖVAUVAN kuva; muitakin symboleita voidaan
 * kehittää. Symbolit tehdään kartan henkeen ja samalla tyylillä
 * (seepiamuste, aikakauden karttamerkki)."*
 *
 * ── MITÄ TÄMÄ TIEDOSTO ON ──────────────────────────────────────────
 *
 * Pelkkä KARTTAKERROS. Se ei tiedä poolista, lukemisista eikä siitä,
 * milloin täky saa näkyä: kaikki se on täkynoston omassa kirjanpidossa
 * (js/fokusnosto.js), joka kutsuu tätä valmiilla listalla. Näin
 * näkyvyysehdot pysyvät yhdessä paikassa, kuten liuskan aikana.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (ui.svg:n suora lapsi). Kiertävän laudan
 *    <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Merkki piirretään siksi
 *    oikeana elementtinä jokaiseen kiertokohtaan (ui.kiertoKohdat) —
 *    sama ratkaisu kuin kohderenkailla, vinjeteillä, fokuskohteilla ja
 *    vihreällä pisteellä (js/fokuspiste.js).
 *
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. Symbolit ovat
 *    siis pelkkiä täyttöjä ja viivoja — paperinvaalea aluslaatta on oma
 *    ympyränsä eikä varjo.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu). Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan VAKIOLLA (js/ui.js fokusMerkkiSkaala), jolloin merkin
 *    lapset ovat ruudun pikseleitä LEHDEN PERUSTASOLLA ja elävät siitä
 *    kartan mukana. Osuma-alueen r = 22 on 44 px läpimitta perustasolla
 *    — sama sormisääntö kuin muualla.
 *
 * ── KERROS EI TAPPELE Z-JÄRJESTYKSESTÄ ─────────────────────────────
 *
 * js/fokuspiste.js siirtää oman kerroksensa takaisin viimeiseksi aina
 * kun sen perässä on jotain. Jos tämä kerros tekisi samoin, kaksi
 * kerrosta vaihtaisi paikkaa joka piirrossa loputtomiin. Siksi tämä
 * kerros asetetaan syntyessään vihreän pisteen ETEEN, jos piste on jo
 * olemassa — ja jos ei ole, piste syntyy myöhemmin luonnostaan tämän
 * perään. Kummassakin tapauksessa järjestys asettuu kerralla.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTOSYM_/nostosym-etuliitteellä.
 */
import { el } from './mapart.js';
import { sfx } from './sound.js';

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const NOSTOSYM_OSUMA_R = 22;

/**
 * SYMBOLIN PIIRTÄJÄT.
 *
 * Kumpikin piirtää ruudun pikseleissä ORIGON YMPÄRILLE — ankkuriryhmä
 * hoitaa paikan ja vakioskaalauksen. Mitat on valittu niin,
 * että merkki on suunnilleen kohdemerkin kokoinen (halkaisija ~21 px):
 * pienempi katoaisi karttaan, isompi kilpailisi kaupungin laatan kanssa.
 */

/**
 * KELTAINEN HUUTOMERKKI — skandaali tai uskomaton tositarina.
 *
 * Väri on okrankeltainen, joka taittuu seepiaan (css/fokusnosto.css
 * --nosto-okra): puhdas keltainen olisi liikennemerkki kartalla, jonka
 * koko paletti on musteen ja paperin väliltä. Muoto on aikakauden
 * karttamerkin mukainen — pyöreä laatta, musteviivainen kehä ja sen
 * sisällä kapeneva palkki ja piste.
 */
function piirraNostosymHuuto(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  el('path', {
    class: 'nostosym-huuto',
    d: 'M-1.75 -6.6 L1.75 -6.6 L1.15 1.7 L-1.15 1.7 Z',
  }, g);
  el('circle', { class: 'nostosym-huuto', cx: 0, cy: 5.1, r: 1.6 }, g);
}

/**
 * PÖLLÖVAUVA — söpö eläinkohde.
 *
 * Ei värikuvaa vaan musteesta piirretty pöllönpoikanen: pyöreä
 * untuvainen kroppa, kaksi isoa silmää, nokka ja muutama viiva. Sama
 * karaktääri kuin pelin omalla pöllöllä (Raamattu, PÖLLÖN KARAKTÄÄRI),
 * mutta poikasena: korvatupsut ovat vasta töpöt ja kroppa on melkein
 * pallo.
 *
 * Kreikan poolissa ei ole vielä yhtäkään eläintäkyä, mutta symboli on
 * valmiina: uusi täky saa sen kentällä `symboli: 'elain'` ilman että
 * tähän tiedostoon kosketaan.
 */
function piirraNostosymPollo(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Korvatupsut ensin, jotta kroppa peittää niiden juuret.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-4.6 -6.0 L-6.5 -8.8 M4.6 -6.0 L6.5 -8.8',
  }, g);
  // Untuvainen kroppa: pää ja vartalo ovat poikasella sama pallo.
  el('path', {
    class: 'nostosym-pollo',
    d: 'M0 -7.7 C4.9 -7.7 7.6 -4.2 7.6 0.3 C7.6 4.9 4.4 8.0 0 8.0 '
      + 'C-4.4 8.0 -7.6 4.9 -7.6 0.3 C-7.6 -4.2 -4.9 -7.7 0 -7.7 Z',
  }, g);
  // Isot silmät: vaalea kehä musteviivalla ja tumma terä.
  el('circle', { class: 'nostosym-silma', cx: -3.0, cy: -1.6, r: 2.9 }, g);
  el('circle', { class: 'nostosym-silma', cx: 3.0, cy: -1.6, r: 2.9 }, g);
  el('circle', { class: 'nostosym-tera', cx: -3.0, cy: -1.6, r: 1.35 }, g);
  el('circle', { class: 'nostosym-tera', cx: 3.0, cy: -1.6, r: 1.35 }, g);
  // Nokka silmien välissä ja pari untuvaviivaa rinnassa.
  el('path', { class: 'nostosym-nokka', d: 'M0 0.9 L-1.5 -0.7 L1.5 -0.7 Z' }, g);
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-3.5 3.4 q1.3 1.2 2.6 0 M0.9 3.4 q1.3 1.2 2.6 0',
  }, g);
  // Varpaat: poikanen seisoo omilla jaloillaan.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-2.4 7.6 L-2.4 9.4 M2.4 7.6 L2.4 9.4',
  }, g);
}

/**
 * SILMÄ — NÄHTÄVYYS- JA MULTIMEDIAKOHDE (omistajan tilaus v1119, kohdat
 * 19 ja 20: *"SILMÄ-ikoni … piirretään samaan symboliperheeseen"*).
 *
 * Sama pyöreä laatta ja musteviivainen kehä kuin huutomerkillä ja
 * pöllövauvalla; sisällä vanhan kartografian silmä: kaksi kaarta, terä
 * ja pieni kiilto. Symboli lupaa katsottavaa — kierroksen, kuvan tai
 * paikan, joka avautuu omaan ikkunaansa.
 */
function piirraNostosymSilma(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Silmän kehä: kaksi vastakkaista kaarta, ei ellipsiä — kartografin
  // kynänjälki on kaari, ei sujuva muotti.
  el('path', {
    class: 'nostosym-silmakaari',
    d: 'M-7.4 0 C-4.6 -4.6 4.6 -4.6 7.4 0 C4.6 4.6 -4.6 4.6 -7.4 0 Z',
  }, g);
  el('circle', { class: 'nostosym-silma', cx: 0, cy: 0, r: 3.0 }, g);
  el('circle', { class: 'nostosym-tera', cx: 0, cy: 0, r: 1.5 }, g);
  // Kiilto: yksi vaalea piste, jotta terä ei ole pelkkä musta läiskä.
  el('circle', { class: 'nostosym-kiilto', cx: 1.1, cy: -1.1, r: 0.55 }, g);
}

/**
 * AKTIIVISEN TÄYN ANKKURI — pieni mustepiste, jonka päälle kupla
 * asettuu ja johon sen nokka osoittaa.
 *
 * Piste on tarkoituksella hillitty: kupla on jo iso ja se kertoo
 * itsestään, joten kartalle jää vain merkintä siitä KOHDASTA, jota
 * juttu koskee. Piste ei ota napautuksia vastaan (css: pointer-events),
 * koska kupla on sen päällä ja sen oma nappi vie lunastukseen.
 */
function piirraNostosymAnkkuri(g) {
  el('circle', { class: 'nostosym-laatta', r: 5.6 }, g);
  el('circle', { class: 'nostosym-kehys', r: 5.6 }, g);
  el('circle', { class: 'nostosym-ankkuripiste', r: 2.0 }, g);
}

/* ==================== KERROS ==================== */

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function nostosymKerros(ui) {
  if (!ui?.svg) return null;
  if (!ui.nostosymKerros?.isConnected || ui.nostosymKerros.ownerSVGElement !== ui.svg) {
    const kerros = el('g', { class: 'fokusnosto-symbolit' });
    /*
     * Vihreä piste pitää itsensä viimeisenä (js/fokuspiste.js
     * varmistaPistekerros). Jos se on jo olemassa, mennään sen eteen —
     * muuten kaksi kerrosta vaihtaisi paikkaa joka piirrossa.
     */
    const piste = ui.fokuspisteKerros?.isConnected
      && ui.fokuspisteKerros.ownerSVGElement === ui.svg ? ui.fokuspisteKerros : null;
    if (piste) ui.svg.insertBefore(kerros, piste);
    else ui.svg.appendChild(kerros);
    ui.nostosymKerros = kerros;
    ui.nostosymAvain = null;
  }
  return ui.nostosymKerros;
}

/** Yksi symbolimerkki: näkymätön osuma-alue ja sen päällä kuva. */
function piirraNostosymMerkki(ui, ryhma, merkinta, valitse) {
  /*
   * TYYPPILUOKKA ON OMA NIMENSÄ (`nostosym-tyyppi-*`) eikä sama kuin
   * muodon luokka: SVG:ssä `fill` ja `stroke` PERIYTYVÄT, joten ryhmälle
   * osunut muototyyli valuisi myös näkymättömään osuma-alueeseen ja
   * piirtäisi sen ympärille kehän.
   */
  const g = el('g', { class: `fokusnosto-symboli nostosym-tyyppi-${merkinta.symboli}` }, ryhma);
  g.dataset.nosto = merkinta.id;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${merkinta.otsikko} — nosta esiin`);
  el('circle', { class: 'nostosym-osuma', r: NOSTOSYM_OSUMA_R }, g);
  if (merkinta.symboli === 'elain') piirraNostosymPollo(g);
  else if (merkinta.symboli === 'silma') piirraNostosymSilma(g);
  else piirraNostosymHuuto(g);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    // Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
    // napautuksia vastaan — sama kiireen esto kuin vihreällä pisteellä.
    if (ui.busy) return;
    sfx.play('paper');
    valitse?.(merkinta.id);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * SYMBOLIT JA AKTIIVISEN ANKKURI KARTALLE.
 *
 * @param {object} ui
 * @param {object} tila
 * @param {Array} tila.merkinnat  [{ id, otsikko, symboli, paikka:{x,y} }]
 *   — järjestyksessä; aktiivinen mukana, jos sillä on paikka.
 * @param {string|null} tila.aktiivinen  Kuplassa olevan täyn tunnus.
 * @param {(id:string)=>void} tila.valitse  Symbolin napautus.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI, kuten muillakin kerroksilla:
 * zoomi muuttaa vain ankkuriryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaNostosymbolit(ui, tila = {}) {
  if (typeof document === 'undefined') return;
  const kerros = nostosymKerros(ui);
  if (!kerros) return;
  const merkinnat = Array.isArray(tila.merkinnat) ? tila.merkinnat : [];
  const avain = merkinnat.length
    ? `${ui.game?.pack?.id}:${tila.aktiivinen ?? '-'}:`
      + merkinnat.map((m) => `${m.id}@${m.paikka.x},${m.paikka.y}/${m.symboli}`).join('|')
    : 'tyhja';
  if (ui.nostosymAvain !== avain) {
    ui.nostosymAvain = avain;
    kerros.textContent = '';
    ui.nostosymRyhmat = [];
    ui.nostosymAnkkurit = [];
    for (const merkinta of merkinnat) {
      const onAktiivinen = merkinta.id === tila.aktiivinen;
      // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
      for (const x of ui.kiertoKohdat?.(merkinta.paikka.x) ?? [merkinta.paikka.x]) {
        const ryhma = el('g', { class: 'fokusnosto-symboliryhma' }, kerros);
        ui.nostosymRyhmat.push({ g: ryhma, x, y: merkinta.paikka.y });
        if (onAktiivinen) {
          const ankkuri = el('g', { class: 'fokusnosto-ankkuri' }, ryhma);
          piirraNostosymAnkkuri(ankkuri);
          ui.nostosymAnkkurit.push(ankkuri);
        } else {
          piirraNostosymMerkki(ui, ryhma, merkinta, tila.valitse);
        }
      }
    }
  }
  asemoiNostosymbolit(ui);
}

/**
 * VAIN MUUNNOKSET UUSIKSI — kutsutaan myös silloin, kun kartta liikkuu
 * ilman uutta piirtoa (js/fokusnosto.js kartan vahti). Yksi
 * setAttribute per ryhmä, ei yhtäkään uutta solmua.
 */
export function asemoiNostosymbolit(ui, suhde = 1) {
  /*
   * MITTAKAAVA ON VAKIO, EI ZOOMIN KÄÄNTEISLUKU (omistajan LOPULLINEN
   * linjaus 26.8.2026, Raamattu): täkysymbolit elävät kartan mukana
   * kuten muutkin lehden merkit. `suhde` (nipistyseleen kerroin) on
   * merkitsevä vain lehdettömällä varapolulla — ks. js/ui.js
   * fokusMerkkiSkaala.
   */
  const s = ui?.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  const zoom = s.toFixed(4);
  for (const ryhma of ui.nostosymRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
  }
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit):
  // varapolku on yhä ruutumitassa ja tarvitsee vastaskaalan.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.nostosymVastaskaala ??= (s) => asemoiNostosymbolit(ui, s));
}

/**
 * Aktiivisen täyn ankkuri RUUDULLA — se kopio, joka on lähimpänä
 * näkymän keskustaa.
 *
 * Kiertävällä laudalla sama paikka on kartalla kahdesti, ja kupla on
 * asetettava sen kopion viereen, joka pelaajalla oikeasti on edessään.
 */
export function nostosymAnkkuri(ui) {
  const ankkurit = (ui?.nostosymAnkkurit ?? []).filter((a) => a.isConnected);
  if (!ankkurit.length) return null;
  if (ankkurit.length === 1) return ankkurit[0];
  const keski = (globalThis.innerWidth ?? 0) / 2;
  let paras = null;
  let parasEro = Infinity;
  for (const ankkuri of ankkurit) {
    const laatikko = ankkuri.getBoundingClientRect();
    if (!(laatikko.width > 0)) continue;
    const ero = Math.abs(laatikko.left + laatikko.width / 2 - keski);
    if (ero < parasEro) { parasEro = ero; paras = ankkuri; }
  }
  return paras ?? ankkurit[0];
}

/** Symbolit pois. Kerros jää paikalleen tyhjänä, kuten muillakin. */
export function nollaaNostosymbolit(ui) {
  if (!ui) return;
  ui.nostosymAvain = null;
  ui.nostosymRyhmat = [];
  ui.nostosymAnkkurit = [];
  if (ui.nostosymKerros?.isConnected) ui.nostosymKerros.textContent = '';
}
