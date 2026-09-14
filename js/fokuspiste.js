/*
 * VIHREÄ HEHKUVA PISTE — kohtaamispaikka kartalla.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 24.8.2026, ilta): *"Aarteen avaus -tehtävän suoritus sytyttää
 * kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN, jota klikkaamalla tapaa
 * henkilön ja yrittää aarteen avausta."*
 *
 * Piste on kokeilun ainoa uusi asia kartalla, ja se on tarkoituksella
 * ainoa: kevyt kulku purkaa korttiannostelun, ja jäljelle jää yksi
 * paikka, jonne pelaajan katse viedään. Vinjettiviuhka jää siksi pois
 * (ks. js/fokusvirta.js lipun perustelu).
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (this.svg:n suora lapsi). Kiertävän
 *    laudan <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Merkki piirretään siksi
 *    oikeana elementtinä jokaiseen kiertokohtaan (ui.kiertoKohdat) —
 *    sama ratkaisu kuin kohderenkailla, vinjeteillä ja fokuskohteilla.
 *
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. HEHKU ON SIIS
 *    CSS-ANIMAATIO eikä feGaussianBlur: kolme sisäkkäistä ympyrää,
 *    joiden `opacity` ja `transform` TUIKKIVAT (css/fokusvirta.css
 *    fokuspiste-tuike). Kartan rasterointi ei kilpaile sen kanssa —
 *    animoituvat vain ne kaksi ominaisuutta, jotka kompositori osaa
 *    yksin.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu). Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan VAKIOLLA (js/ui.js fokusMerkkiSkaala), jolloin merkin
 *    lapset ovat ruudun pikseleitä LEHDEN PERUSTASOLLA ja kasvavat tai
 *    kutistuvat siitä kartan mukana. Osuma-alueen r = 22 on siis 44 px
 *    läpimitta perustasolla — sama sormisääntö kuin kaupungin laatalla
 *    (js/ui.js FOKUS_LAATTA_OSUMA_PX) — ja lähizoomilla, jossa piste
 *    oikeasti napautetaan, sitä isompi.
 *
 * ── MITÄ TÄMÄ EI TEE ───────────────────────────────────────────────
 *
 * Ei laattamekaniikkaa. Napautus avaa kohtaamiskortin
 * (js/fokusvirta.js avaaFokusKohtaaminen), ja sen "Tapaa Nikos" -nappi
 * kutsuu tismalleen samaa game.actionQuizia kuin ennenkin. Piste ei
 * myöskään päätä omaa näkyvyyttään: ehdot lasketaan yhdessä paikassa
 * (fokusvirtaKohtaamispiste), jotta piste, pelinappula ja kortti ovat
 * aina samaa mieltä siitä, onko kohtaaminen auki.
 */
import { el, maare } from './mapart.js';
import {
  avaaFokusKohtaaminen, fokusvirtaAarrepisteLukko, fokusvirtaAarrepisteOhje,
  fokusvirtaKohtaamispiste,
} from './fokusvirta.js';
import { sfx } from './sound.js';

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const PISTE_OSUMA_R = 22;

/*
 * MERKKI ON PIENI JA TUIKKIVA (omistajan pelitestitilaus 26.8.2026,
 * iPhone: *"se voisi kyllä olla paljon pienempi, kun se on aarrepiste,
 * kohan se tuikkii"*).
 *
 * Mitat pienenivät kolmasosaan (hehku 13 → 5,5; kehä 7,2 → 3,2; ydin
 * 3,4 → 1,8): 25.8. mitat kasvatettiin, koska pistettä ei löytynyt
 * iPadilta, mutta löytämisen hoitaa nyt TUIKE eikä koko. Osuma-alue on
 * ennallaan 44 px, joten sormi osuu yhtä hyvin kuin ennenkin.
 */
const PISTE_HEHKU_R = 5.5;
const PISTE_KEHA_R = 3.2;
const PISTE_YDIN_R = 1.8;

/*
 * PISTE POIS KAUPUNGIN LAATAN PÄÄLTÄ (omistajan pelitestitilaus
 * 26.8.2026: *"Vihreä piste on hämäävä, kun se korvaa Ateenan
 * pisteen... Piste kannattaisi siirtää jonnekin muualle"*).
 *
 * Kohtaamispaikan koordinaatit ovat DATAA (js/packs/fokusvirta-*.js
 * kohtaamispiste.laudat) ja ne kertovat, missä henkilö oikeasti on —
 * useassa maassa keskustassa eli kaupungin laatan kohdalla (Ateena,
 * Sofia, Istanbul, Rooma, Sarajevo, Bukarest). Kartalla kaksi merkkiä
 * samassa pisteessä on kuitenkin yksi merkki: vihreä piste näytti
 * korvaavan Ateenan.
 *
 * SIIRTO ON ESITYSTÄ, EI DATAA. Jos piste osuu PISTE_ERO_MIN yksikön
 * sisään laatasta, PIIRRETTY merkki siirretään kiinteästi koilliseen
 * (oikealle ja ylös) niin että molemmat näkyvät erikseen; datan
 * koordinaatteihin ei kosketa, eikä sääntö tarvitse yhtään
 * maakohtaista poikkeusta.
 */
const PISTE_ERO_MIN = 14;
const PISTE_SIIRTO_X = 14;
const PISTE_SIIRTO_Y = -10;

/**
 * PIIRRETYN PISTEEN SIVUSIIRTO laudan yksiköissä — YKSI SÄÄNTÖ MOLEMMILLE
 * LAUDOILLE (omistaja 6.9.2026 ilta, iPhone, sanatarkasti: *"aarteen
 * piste syttyy liian lähelle ateenaa, ei pysty painamaan"* ja *"sama
 * ongelma myös sofiassa"*). Tasokartalla piste on siirretty laatan
 * vierestä koilliseen 26.8.2026 lähtien (ks. yllä); karttapallo
 * (js/pallolauta/nostot.js) piirsi sen datan koordinaatteihin eli
 * täsmälleen nappulan jalkaan, ja pallon osumatesti (lähin merkki,
 * js/pallolauta/lauta.js lahinMerkki) antoi tasapelin kaupungille.
 * Siirto lasketaan nyt täällä ja pallo kysyy sen samasta funktiosta:
 * etäisyys mitataan kaupungin keskipisteestä, siirto on vakio, eikä
 * datan koordinaatteihin kosketa kummallakaan laudalla.
 *
 * TASOKARTAN OMA MITTA (14.9.2026). Tämä funktio jäi TASOKARTAN
 * säännöksi: siellä laudan yksikkö on se sama yksikkö, jossa merkit
 * piirretään, ja zoomi kertoo koko näkymän samalla kertoimella.
 * Pallolla laudan yksikkö ei ole enää merkin mitta (ks.
 * fokuspisteenAsteet alla), joten pallo kysyy nyt sisarfunktiota.
 *
 * @returns {{ x: number, y: number }} lisättävä siirto (0, 0 kaukana)
 */
export function fokuspisteenSiirto(city, piste) {
  const lahella = Number.isFinite(city?.x) && Number.isFinite(city?.y)
    && Number.isFinite(piste?.x) && Number.isFinite(piste?.y)
    && Math.hypot(piste.x - city.x, piste.y - city.y) < PISTE_ERO_MIN;
  return lahella ? { x: PISTE_SIIRTO_X, y: PISTE_SIIRTO_Y } : { x: 0, y: 0 };
}

/*
 * ══════════════════════════════════════════════════════════════════
 * SAMA SÄÄNTÖ PALLOLLA — MUTTA PALLON OMASSA MITASSA (ASTEITA)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU 14.9.2026 (maailmankartta, 390 × 844 -profiili, ruutuero
 * kaupungin PIIRRETYSTÄ pallopisteestä):
 *
 *   Barcelona 0,1 px · Budapest 0,2 px · Marseille 0,5 px ·
 *   Helsinki 1,9 px  — vihreä piste on kaupungin merkin ALLA.
 *
 * KAKSI ERI SYYTÄ, YKSI JUURI: laudan yksikkö ei ole pallon mitta.
 *
 * 1. KYNNYS MITATTIIN VÄÄRÄSTÄ PISTEESTÄ. Kaupunki EI ole pallolla
 *    laudan kohdassaan: sillä on oma pallopiste (js/pallo.js
 *    pallonOmatPisteet, `c.pallo`), joka siirtää merkin jopa 236 km
 *    laudan pisteestä. `fokuspisteenSiirto` vertaa kohtaamispistettä
 *    laudan pisteeseen, joten Budapestin 32,45 laudan yksikköä
 *    putosivat kynnyksen (14) yli — vaikka pallolla piste ja kaupunki
 *    ovat samassa pikselissä.
 * 2. SIIRTO OLI VAKIO LAUDAN YKSIKÖISSÄ. Pituusaste kutistuu ruudulla
 *    kertoimella cos(lat): sama 14 yksikön siirto oli Ateenassa
 *    22,4 px ja Helsingissä 15,3 px eli sama sääntö antoi eri
 *    sormenvaran eri leveysasteilla.
 *
 * TÄMÄ ON TÄSMÄLLEEN SAMA KAAVA KUIN TURISTI-INFOLLA — EI UUTTA
 * KEKSINTÖÄ (js/kaupunkinosto.js turistiInfonAsteet, TURISTI_INFO_*):
 * siirto on ASTEITA, pituusaste jaetaan kosinilla (lattia napa-alueelle)
 * ja mitta on valittu MITTAAMALLA ruudulta. Turisti-info menee
 * kaakkoon (lon +1,5 / lat −0,75 ≈ 39 px saapumisnäkymässä),
 * kohtaamispiste koilliseen — eri suunta, sama kaava, ei päällekkäin.
 *
 * MITTA ON OMISTAJAN JO HYVÄKSYMÄ ERO, EI UUSI (ks. raportti):
 * hypot(0,26; 0,33) = 0,42° on täsmälleen se ruutuero, jonka Ateena
 * sai vanhalla säännöllä (0,4125° = 22,4 px) ja jonka omistaja
 * hyväksyi 6.9.2026. Nyt jokainen kaupunki saa sen — ei enemmän eikä
 * vähemmän.
 *
 * KYNNYS 0,35° on sama ruutuero laudan vanhana kynnyksenä: 14 laudan
 * yksikköä oli Ateenan leveydellä 0,33–0,36° ruutumitassa. Yli sen
 * olevaa pistettä EI siirretä: silloin kohtaamispaikka on oikeasti
 * muualla (Oslo 43 px, Riika 97 px) ja datan suunta on sen oma tieto.
 */
/** Sivusiirto pallolla asteina: koilliseen (itään ja pohjoiseen). */
export const FOKUSPISTE_SIIRTO_AST = Object.freeze({ lon: 0.33, lat: 0.26 });
/** Alle tämän ruutueron (astetta) piste siirretään; yli sen ei. */
export const FOKUSPISTE_ERO_MIN_AST = 0.35;
/** Kosinin lattia — sama kuin turisti-infolla (napa ei karkaa). */
export const FOKUSPISTE_KOSINIRAJA = 0.25;
/**
 * Pisteen OMAN MUSTEEN säde ruudun pikseleinä (hehkukehä). Pallon
 * osumatesti (js/pallolauta/lauta.js lahinMerkki) lukee tämän: sormi
 * merkin musteen päällä tarkoittaa merkkiä, sama myönnytys kuin
 * kaupunkipisteellä on omasta halkaisijastaan.
 */
export const FOKUSPISTE_MUSTE_R_PX = PISTE_HEHKU_R;

/**
 * PIIRRETYN PISTEEN PAIKKA PALLOLLA asteina. Kaupungin PIIRRETTY
 * pallopiste sisään (sama, jonka merkki saa), kohtaamispisteen omat
 * asteet sisään — ulos se kohta, johon merkki ja sen osuma piirretään.
 * Datan koordinaatteihin ei kosketa täälläkään.
 *
 * @param {{lat:number, lon:number}|null} kaupunki kaupungin pallopiste
 * @param {{lat:number, lon:number}|null} piste kohtaamispisteen asteet
 * @returns {{lat:number, lon:number}|null}
 */
export function fokuspisteenAsteet(kaupunki, piste) {
  if (!Number.isFinite(piste?.lat) || !Number.isFinite(piste?.lon)) return null;
  if (!Number.isFinite(kaupunki?.lat) || !Number.isFinite(kaupunki?.lon)) return piste;
  const kosini = Math.max(FOKUSPISTE_KOSINIRAJA, Math.cos((kaupunki.lat * Math.PI) / 180));
  // Ruutuero: pituusasteen osuus kutistuu kosinilla, aivan kuten ruudulla.
  const ero = Math.hypot(piste.lat - kaupunki.lat, (piste.lon - kaupunki.lon) * kosini);
  if (ero >= FOKUSPISTE_ERO_MIN_AST) return piste;
  return {
    lat: kaupunki.lat + FOKUSPISTE_SIIRTO_AST.lat,
    lon: kaupunki.lon + FOKUSPISTE_SIIRTO_AST.lon / kosini,
  };
}

/** Tyylitiedoston tunnus — sama tiedosto kuin fokusvirran korteilla. */
const PISTE_TYYLIN_TUNNUS = 'fokusvirta-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole.
 *
 * Sama kaava ja sama syy kuin fokusvirralla ja fokuskohteilla:
 * css/styles.css on toisen työvaiheen hallussa. Tunnus on sama kuin
 * fokusvirran lataajalla, joten tiedosto ladataan enintään kerran
 * kummasta tahansa moduulista — kevyessä kulussa korttipintaa ei
 * välttämättä avata koskaan, joten piste ei voi jäädä sen varaan.
 *
 * NIMET ON PREFIKSOITU (lataaPisteTyyli, PISTE_*), koska yhden
 * tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs).
 */
function lataaPisteTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PISTE_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa tyylit ovat jo sivun <style>-lohkossa.
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = PISTE_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusvirta.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/**
 * PISTEEN NAPAUTUS — yksi avaaja kartalle ja pallolle
 * (js/pallolauta/nostot.js). Kesken animaation (nopan pyörähdys,
 * siirtymä) kartta ottaa yhä napautuksia vastaan — sama kiireen esto
 * kuin kaupungin laatalla. Sama selkeä avausääni kuin kohdepopupeilla,
 * ja ENNEN kortin rakentamista (v1119, kohta 17).
 */
export function avaaFokuspiste(ui, city) {
  if (ui.busy) return false;
  /*
   * LUKKO VASTAA, EI KOHTAAMINEN (karttauudistuksen erä 7, 13.9.2026).
   * Piste on kartalla myös ennen kuin sen saa yrittää
   * (js/fokusvirta.js fokusvirtaKohtaamispiste `lukittu`), ja silloin
   * napautus kertoo lyhyesti, mitä puuttuu. Ehto luetaan samasta
   * paikasta kuin piirto, joten himmeä piste ja vastaus eivät voi olla
   * eri mieltä. Ääni on sama napautusääni molemmissa: pelaaja sai
   * kosketuksestaan kuittauksen, vaikka ovi ei auennut.
   */
  if (fokusvirtaKohtaamispiste(ui, city)?.lukittu) {
    sfx.play('popup');
    fokusvirtaAarrepisteLukko(ui);
    return false;
  }
  sfx.play('popup');
  return avaaFokusKohtaaminen(ui, city);
}

/**
 * PISTEEN KUVIO ILMAN OSUMA-ALUETTA — karttapallon H-elementti
 * (js/pallolauta/nostot.js) piirtää saman tuikkivan merkin samoilla
 * luokilla (css/fokusvirta.css fokuspiste-tuike) omaan pieneen
 * svg:hen; osuma on siellä pallon oma (R-malli). Tyyli ladataan
 * samalla, jotta merkki ei jää ilman tuikettaan.
 */
export function fokuspisteKuvio(g, { lukittu = false } = {}) {
  lataaPisteTyyli();
  // Lukko on yksi luokka samaan merkkiin (css/fokusvirta.css
  // .fokuspiste-lukittu): himmennys ja tuikkeen sammutus, ei toista
  // kuviota — pelaajan on tunnistettava sama piste ennen ja jälkeen.
  if (lukittu) g.classList.add('fokuspiste-lukittu');
  el('circle', { class: 'fokuspiste-hehku', r: PISTE_HEHKU_R }, g);
  el('circle', { class: 'fokuspiste-keha', r: PISTE_KEHA_R }, g);
  el('circle', { class: 'fokuspiste-ydin', r: PISTE_YDIN_R }, g);
  return g;
}

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function varmistaPistekerros(ui) {
  if (!ui.svg) return null;
  if (!ui.fokuspisteKerros?.isConnected || ui.fokuspisteKerros.ownerSVGElement !== ui.svg) {
    ui.fokuspisteKerros = el('g', { class: 'fokuspisteet' }, ui.svg);
    ui.fokuspisteAvain = null;
  }
  // Kerros on napautettava, joten sen on pysyttävä päällimmäisenä myös
  // silloin kun jokin muu kerros on lisätty sen jälkeen.
  if (ui.fokuspisteKerros.nextSibling) ui.svg.appendChild(ui.fokuspisteKerros);
  return ui.fokuspisteKerros;
}

/** Yksi merkki: näkymätön osuma-alue, kaksi hehkukehää ja ydin. */
function piirraPiste(ui, ryhma, city, nimi, teko = 'tapaa paikallinen', lukittu = false) {
  const g = el('g', { class: `fokuspiste${lukittu ? ' fokuspiste-lukittu' : ''}` }, ryhma);
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  // Teko tulee datasta: sähkekaupungissa pisteen takana ei ole ketään
  // tavattavaa vaan pöllön sähke (js/fokusvirta.js kohtaamispiste).
  g.setAttribute('aria-label', `${nimi}: ${teko}`);
  el('circle', { class: 'fokuspiste-osuma', r: PISTE_OSUMA_R }, g);
  // Pieni merkki, joka löytyy tuikkeesta eikä koosta (ks. PISTE_*_R).
  el('circle', { class: 'fokuspiste-hehku', r: PISTE_HEHKU_R }, g);
  el('circle', { class: 'fokuspiste-keha', r: PISTE_KEHA_R }, g);
  el('circle', { class: 'fokuspiste-ydin', r: PISTE_YDIN_R }, g);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    avaaFokuspiste(ui, city);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * Piste kartalle ja sen koko zoomin mukaan.
 *
 * KUTSUTAAN SAMASTA KOHDASTA KUIN VINJETIT JA FOKUSKOHTEET (js/ui.js
 * paivitaMaastonimet ja render) sekä suoraan siitä hetkestä, jolloin
 * AARTEEN AVAUS ratkeaa (js/fokustehtavat.js) — muuten piste odottaisi
 * seuraavaa kartan liikettä.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain ankkuri-
 * ryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaFokuspiste(ui) {
  if (typeof document === 'undefined') return;
  const nykyinen = ui.katselu ? null : ui.game?.cityOf?.();
  /*
   * PULUN KARTTAOHJE (erä 7) LÄHTEE TÄSTÄ, EI SAAPUMISKETJUSTA.
   * Ohje puhuu lukitusta pisteestä, joten se kuuluu sinne, missä
   * pisteen tila lasketaan — ja tulee silloin annetuksi juuri siinä
   * ensimmäisessä kaupungissa, jossa lukittu piste on kartalla.
   * Kutsu on halpa: kertalippu ja ajastin sulkevat sen heti
   * (js/fokusvirta.js fokusvirtaAarrepisteOhje).
   */
  fokusvirtaAarrepisteOhje(ui, nykyinen);
  const kerros = varmistaPistekerros(ui);
  if (!kerros) return;
  const city = nykyinen;
  const piste = city ? fokusvirtaKohtaamispiste(ui, city) : null;
  // Lukko kuuluu avaimeen: sen avautuminen on ainoa muutos, joka ei
  // siirrä pistettä eikä vaihda kaupunkia (erä 7).
  const avain = piste
    ? `${ui.game.pack.id}:${city.id}:${piste.x}:${piste.y}:${piste.lukittu ? 'lukko' : 'auki'}`
    : 'tyhja';
  if (ui.fokuspisteAvain !== avain) {
    ui.fokuspisteAvain = avain;
    kerros.textContent = '';
    ui.fokuspisteRyhmat = [];
    if (piste) {
      lataaPisteTyyli();
      /*
       * SIVUSIIRTO VAIN LÄHELLÄ LAATTAA (ks. PISTE_ERO_MIN). Etäisyys
       * mitataan kaupungin keskipisteestä, eli siitä samasta kohdasta,
       * johon laatta ja käännetyn laatan aarremerkki piirtyvät.
       */
      const { x: sx, y: sy } = fokuspisteenSiirto(city, piste);
      // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
      for (const x of ui.kiertoKohdat?.(piste.x) ?? [piste.x]) {
        const ryhma = el('g', { class: 'fokuspiste-ryhma' }, kerros);
        ui.fokuspisteRyhmat.push({ g: ryhma, x: x + sx, y: piste.y + sy });
        piirraPiste(ui, ryhma, city, piste.nimi, piste.teko, piste.lukittu);
      }
    }
  }
  asetaPisteMittakaava(ui, 1);
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit),
  // vaikka vakioskaala ei enää tarvitse vastaskaalaa: varapolku
  // (lehdetön näkymä) on yhä ruutumitassa ja tarvitsee sen.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.fokuspisteVastaskaala ??= (suhde) => asetaPisteMittakaava(ui, suhde));
}

/**
 * Päivittää kohtaamispisteen kummallekin laudalle samasta julkisesta
 * portista. Lehtipalkinto ei tee koko renderiä, joten pallon oma
 * nostokerros on herätettävä tässä eikä vasta kameran liikkeestä.
 */
export function paivitaFokuspisteKaikillaLaudoilla(ui) {
  const tasokartta = paivitaFokuspiste(ui);
  ui?.pallolauta?.paivitaFokuspiste?.();
  return tasokartta;
}

/**
 * Ankkuriryhmien mittakaava — VAKIO, ei zoomin käänteisluku.
 *
 * `suhde` on käynnissä olevan nipistyseleen kerroin (1 = ei elettä), ja
 * vakioskaalassa se ohitetaan: ele suurentaa pisteen kartan mukana.
 * Vain lehdetön varapolku (js/ui.js fokusMerkkiSkaala) käyttää sitä.
 */
function asetaPisteMittakaava(ui, suhde) {
  /*
   * KATETTU SKAALA (omistaja 28.8.2026, js/ui.js
   * fokusMerkkiSkaalaKartalle): piste on kartan merkintä muiden
   * joukossa, eikä kapea ruutu saa paisuttaa sitä yli lehden omien
   * symbolien. Osuma-ympyrä pidetään sormen mitassa kertomalla säde
   * takaisin ylös — sama kahden mitan sääntö kuin kohdemerkeillä.
   */
  const s = ui.fokusMerkkiSkaalaKartalle?.(suhde) ?? ui.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  const osumaR = PISTE_OSUMA_R * (ui.fokusMerkkiOsumaKerroin?.(suhde) ?? 1);
  const zoom = s.toFixed(4);
  for (const ryhma of ui.fokuspisteRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
    const osuma = ryhma.g.querySelector?.('.fokuspiste-osuma');
    if (osuma) maare(osuma, 'r', osumaR.toFixed(2));
  }
}

/** Laudan vaihto tai uusi peli: piste pois ja muisti nollille. */
export function nollaaFokuspiste(ui) {
  ui.fokuspisteAvain = null;
  ui.fokuspisteRyhmat = [];
  if (ui.fokuspisteKerros?.isConnected) ui.fokuspisteKerros.textContent = '';
}
