/*
 * AIKAJANAMOOTTORI — linssien yhteinen juokseva vuosiluku kartan päällä.
 *
 * Raamattu, Karttalinssit: *"Linssi = animoitu visualisointi kartalla
 * juoksevine vuosilukuineen"* ja AIKAJANA-AJO (omistaja 17.8.2026):
 * *"animaatiolinsseillä yhteinen aikajanamoottori juoksevine
 * vuosilukuineen — pelaajan käynnistämä, ele keskeyttää."*
 *
 * ENSIMMÄINEN AIKAJANALINSSI on keksinnöt (js/linssit/keksinnot.js,
 * omistajan tilaus 2.9.2026 ilta). Tämä moduuli ei tiedä keksinnöistä
 * mitään: se saa linssiltä KAAREN (otsikko, alku- ja loppuvuosi) ja
 * TAPAHTUMAT (vuosi, paikka laudalla, henkilö, otsikko, selite, kuvat)
 * ja ajaa ne kartan päällä. Seuraava aikajanalinssi (rautatiet,
 * silkkitiet, ihmisen leviäminen) antaa saman muodon eikä tarvitse
 * tästä riviäkään.
 *
 * ── NELJÄ PINTAA (omistajan kuvaus 2.9.2026 ilta, sanatarkasti
 *    olennaisilta osin) ──────────────────────────────────────────────
 *
 *   1. KELLO ylälaidassa: rullaava vuosiluku, joka juoksee tyhjien
 *      vuosien yli ja pysähtyy jokaiseen tapahtumaan. Napautus
 *      pysäyttää ja jatkaa. Kellon alla kaaren nimi ja nykyinen paikka.
 *   2. VALOT kartalla: *"kartalle syttyisi valo siihen kaupunkiin,
 *      missä se on tehty"*. Valo jää palamaan — kaaren lopussa kartalla
 *      on koko kaaren valokartta.
 *   3. FILMINAUHA alalaidassa. Ensimmäinen muoto oli omistajan kuvaus
 *      2.9.2026 illalta: *"aina seuraava kuva on vasemmassa reunassa
 *      blurrattuna ja nykyinen kuva heti sen oikealla puolella. Ja
 *      siitä oikealle päin näkyisi aiemmat kuvat ja keksinnön nimi,
 *      keksijä ja vuosiluku … vähän pienemmässä koossa."*
 *      KARUSELLI korvasi sen 3.9.2026 (omistaja, sanatarkasti):
 *      *"nuo henkiloiden kuvat voisi tayttaa koko alarivin niin etta
 *      nykyinen henkilo on aina keskella ruutua ja kaikki vasemmalla
 *      ja oikealla puolella olevat ovat merkittavasti pienempia ja
 *      kaikki vasemmalla puolella ovat kevyesti blurattuja."*
 *      Nauha on siis KRONOLOGINEN: menneet vasemmalla (sumennettuina),
 *      nykyinen keskellä ruutua isona, tulevat oikealla (tarkkoina
 *      mutta pienempinä ja vaimeampina). Vuoden vaihtuessa koko rivi
 *      liukuu yhden askeleen vasemmalle — ks. karusellinPaikat ja
 *      asettele. Nauhan kortit ovat keksijän KUVAPUTKEN GENEROIMIA
 *      studiomuotokuvia (omistajan tilaus 3.9.2026, datan kentät
 *      `kuva` ja kaksoispysäkillä `kuvaToinen`); aito Commons-kuva
 *      (`kuvaAito`) jää datassa odottamaan Tiedeliitettä.
 *   4. ILMIÖPANEELI oikeassa yläkulmassa: *"visualisoitu se keksintö
 *      tai joku muu kuva, joka selittäisi sitä itse ilmiötä … sen
 *      generoidun kuvan alle voisi tulla se keksinnön selite ja …
 *      keksijän nimi."* Kuva on datan kenttä (`ilmio`), joten
 *      generoitu kuva vaihdetaan yhdellä rivillä, kun se on R2:ssa.
 *
 *   *"Kaikki vaihdokset pitäisi mennä nätisti liukuen ja animoiden."*
 *   Siirtymät ovat CSS-siirtymiä (css/aikajana.css): kortti liukuu
 *   paikasta toiseen, paneeli ristihäivyttää, valo syttyy kerran.
 *
 * ── VIIDES PINTA: MUSIIKKI (omistajan tilaus 2.9.2026 ilta,
 *    *"Generoi linssille oma musiikki"*) ────────────────────────────
 *
 * Ajolla on oma raita, jonka laji tulee kaaresta (`aikajana.musiikki`,
 * keksinnöillä 'keksinnot'). Soittimen omistaa js/siirtymamusiikki.js
 * — sama koneisto kuin siirtymän musiikilla, koska vaatimukset ovat
 * samat: kaksi polkua ämpäriin, puuttuva raita hiljaisena
 * normaalitilana, väistö pöllön ja kertojan alta. Tämä moduuli vain
 * kertoo, milloin musiikki on tarpeen:
 *
 *   käynnistys      musiikki alkaa heti, kamera-ajon kanssa yhtä
 *                   aikaa — ennen kuin kello lähtee.
 *   tauko           EI katkaisua vaan himmennys puoleen: pelaaja
 *                   pysäytti kellon lukeakseen, ei vaientaakseen.
 *                   Sama koskee kaaren loppua.
 *   juttu auki      raita feidataan pois nähtävyyskortin ajaksi
 *                   (kortti on oma näkymänsä, jolla on oma äänensä)
 *                   ja palaa, kun kortti suljetaan ja ajo jatkuu.
 *   sulkeminen      feidaus pois purussa (pura()), myös silloin kun
 *                   koko lauta vaihtuu alta.
 *
 * Kaari ilman `musiikki`-kenttää on hiljainen eikä koske soittimeen
 * lainkaan — silloin siirtymän oma raita saa soida rauhassa.
 *
 * ── LINSSITILAN ÄÄNIMAAILMA (omistajan tilaus 3.9.2026, sanatarkasti:
 *    *"Kun linssitila menee päälle, niin kaikki muut äänet saisi
 *    vaieta taustalta ja oma linssin generoitu musiikki saisi alkaa
 *    toistua taustalla."*) ───────────────────────────────────────────
 *
 * Ajo on OMA NÄKYMÄNSÄ siinä missä pöllön paneeli (js/pollo.js avaa):
 *
 *   käynnistys   hiljennaAmbienssi(LINSSIN_HILJENNYS) vie kaupungin
 *                äänimaiseman, pohjavireen, visamusiikin ja radion
 *                yhdellä ja samalla syyllä alas; pysaytaLukija()
 *                vaientaa kesken olevan luennan. Linssin oma raita ei
 *                väisty tätä hiljennystä — se on sen itsensä pyytämä
 *                (js/siirtymamusiikki.js lajinVaisto).
 *   sulkeminen   palautaAmbienssi(LINSSIN_HILJENNYS) purussa, samalla
 *                syyllä. Syy on joukon alkio eikä laskuri, joten
 *                kahdesti purettu ajo ei nosta taustaa kahdesti.
 *
 * Vuoden vaihtuessa soi KOHAHDUS (omistaja: *"joku uuu-huudahdus,
 * aivan kuin yleisö kohahtaisi, kun uusi hieno keksintö saapuu
 * maailmaan"*) — neljä ämpärissä olevaa varianttia, joista sama ei
 * toistu peräkkäin (js/tehosteet.js). Kun varianttia ei ole ladattu,
 * soi kellon oma syntetisoitu naksahdus (naksahda). Ääni tulee vain
 * ELÄVÄSTÄ vaihdoksesta: rakentaminen ja Alusta asettavat kellon
 * vuosiluvun ilman ääntä.
 *
 * ── MITÄ MOOTTORI EI TEE ──────────────────────────────────────────
 *
 *   • Ei RASKASTA animaatiota SVG-kartalla. Linssisopimuksen sääntö
 *     (docs/moduulit/linssit.md 1.7) kieltää suodattimet ja
 *     kehyskohtaisen JS-työn karttakerroksessa; omistaja tilasi
 *     3.9.2026 nimenomaan sykkivän merkin, ja se tehdään CSS-
 *     keyframeilla YHDELLE merkille kerrallaan (nykyinen keksintö) —
 *     ei ajastimilla, ei suodattimilla, ei jokaiselle merkille.
 *     Jäljelle jääneet merkit ovat liikkumattomia. prefers-reduced-
 *     motion sammuttaa sykkeen kokonaan.
 *     Kello, nauha ja paneeli ovat tavallista DOM:ia kartan päällä.
 *   • Ei kosketa pelitilaan eikä tallennukseen: aikajana on
 *     katselutila, ja sulkeminen palauttaa kartan sellaisenaan.
 *   • Ei omia eleitä kartalla: pelaaja saa panoroida ja zoomata
 *     aikajanan aikana; valot skaalautuvat kuten muutkin merkit.
 *
 * ── KYTKENTÄ ──────────────────────────────────────────────────────
 *
 * js/ui.js kaynnistaAikajana(tunnus) tuo tämän ja linssin
 * dynaamisesti (yhden tiedoston versio ei niputa linssejä, ks.
 * linssit.md 2.1) ja kutsuu kaynnistaAikajana(ui, linssi). Nyt
 * käynnistin on kehittäjävalikon rivi (index.html
 * #kehittaja-aikajana-btn); pelillinen ovi (Raamattu, PAIKKASIDONTA)
 * päätetään myöhemmin.
 */

import { el, maare } from './mapart.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { asetaKuva } from './media.js';
import { sfx } from './sound.js';
import { hiljennaAmbienssi, palautaAmbienssi } from './ambience-stream.js';
import { pysaytaLukija } from './lukija.js';
import { esilataaKohahdukset, soitaKohahdus } from './tehosteet.js';
import { esilataaKuvat } from './ui-apurit.js';
import {
  aloitaSiirtymamusiikki, himmennaSiirtymamusiikki, lopetaSiirtymamusiikki,
  LINSSIN_HILJENNYS,
} from './siirtymamusiikki.js';

/* ==================== TAHTI ==================== */

/**
 * Tyhjä vuosi kestää tämän verran; tapahtuman kohdalla kello seisoo
 * VIIVE_MS. Tahti on tapahtumittain eikä vuosittain: 1780–1820 on
 * harva ja 1890-luku tiheä, ja kumpikin saa saman lukurauhan.
 */
export const AIKAJANA_VUOSI_MS = 260;
export const AIKAJANA_VIIVE_MS = 4600;
/** Merkkipaalu (ei valoa, esim. isoisän matka 1873) pysäyttää lyhyemmin. */
export const AIKAJANA_PAALU_MS = 3200;

/**
 * Tauolla musiikki jää soimaan PUOLEEN tasoon (omistajan tilaus:
 * *"jatkuu pysäytyksen yli hiljennettynä puoleen"*). Vakio on tässä
 * eikä soittimessa: se on tämän linssin tapa, ei musiikkimoduulin.
 */
export const AIKAJANA_TAUKO_HIMMENNYS = 0.5;

/*
 * ── KEKSINNÖN PAIKKAMERKKI KARTALLA (omistajan tilaus 3.9.2026) ────
 *
 * Sanatarkasti: *"Keksinnön paikka ei näy oikein kartalla. Saisi olla
 * ensin todella selkeä vilkkuva pallo ja sitten kun siirrytään
 * seuraavaan vuoteen, niin pallo voisi hieman himmentyä ja lopettaa
 * vilkkumisen, mutta silti hehkua kartalla."*
 *
 * MIKSI SE EI NÄKYNYT OIKEIN. Merkin sisusryhmä skaalattiin
 * CSS-muunnoksella (`scale(0)` → `scale(1)`, nykyisellä `scale(1.35)`)
 * ja muunnoksen keskipiste haettiin parilla
 * `transform-box: fill-box; transform-origin: center`. Jos selain ei
 * tue `fill-box`-arvoa — vanhempi WebKit, eli juuri omistajan iPad —
 * `center` lasketaan SVG:N VIEWPORTIN keskeltä, ja jokainen ykkösestä
 * poikkeava skaalaus siirtää merkin kauas oikealta paikaltaan.
 * Vakioskaalassa (1) virhe on nolla, joten vika näkyi vain
 * NYKYISESSÄ merkissä — täsmälleen se, mistä omistaja raportoi.
 *
 * Korjaus on poistaa koko riippuvuus: kaikki kolme ympyrää ovat
 * keskipisteessä (0,0), jolloin skaalaus origon ympäri ON skaalaus
 * merkin keskipisteen ympäri, eikä `transform-box`-tukea tarvita
 * missään. Paikan antaa yksin ryhmän oma `translate` (paivitaMittakaava).
 *
 * TOINEN SYY oli MITTA, ja se selittää tyhjän kartan silloinkin kun
 * skaalaus osui oikeaan: merkki luki kokonsa lehden omasta vakiosta,
 * joka on aivan liian pieni koko Euroopan näkymässä (mitattu 1,5 px).
 * Mitta tulee nyt suoraan ruudusta — ks. merkkiSkaala.
 *
 * MITAT ovat siis RUUDUN PIKSELEITÄ: pallon säde ~7 px ja pehmeä
 * ulkohehku vajaat kaksi kertaa se. Syke laajenee CSS-keyframeilla
 * 2,4-kertaiseksi (css/aikajana.css).
 */
export const MERKIN_SADE = 7;
export const HEHKUN_SUHDE = 1.9;

/**
 * Naksahduksia enintään kahdeksan sekunnissa (omistajan tilaus
 * 3.9.2026). Tahti voi tuottaa vaihdon joka kehyksellä — nopeutetulla
 * tahdilla tai reduced motion -tilassa jopa 25 vuotta sekunnissa —
 * eikä laskurin naksu saa muuttua konekivääriksi.
 */
export const AIKAJANA_NAKSU_VALI_MS = 125;

/**
 * Puhdas askel: vie kelloa dt millisekuntia ja kertoo, mikä tapahtuma
 * (jos mikään) syttyy. DOM:iton, jotta tahti on testattavissa
 * (tests/aikajana.test.mjs).
 *
 * @param {{vuosi:number, i:number, viive:number}} tila
 * @param {number} dt millisekuntia edellisestä kehyksestä
 * @param {Array<{vuosi:number, paalu?:boolean}>} tapahtumat
 * @param {{vuosiMs?:number, viiveMs?:number, paaluMs?:number}} [tahti]
 * @returns {{tila:object, syttyi:number|null, loppu:boolean}}
 */
export function aikajanaAskel(tila, dt, tapahtumat, tahti = {}) {
  const vuosiMs = tahti.vuosiMs ?? AIKAJANA_VUOSI_MS;
  const viiveMs = tahti.viiveMs ?? AIKAJANA_VIIVE_MS;
  const paaluMs = tahti.paaluMs ?? AIKAJANA_PAALU_MS;
  let { vuosi, i, viive } = tila;
  if (viive > 0) {
    viive = Math.max(0, viive - dt);
    if (viive > 0) return { tila: { vuosi, i, viive }, syttyi: null, loppu: false };
    if (i >= tapahtumat.length - 1) return { tila: { vuosi, i, viive: 0 }, syttyi: null, loppu: true };
    dt = 0;
  }
  const seuraava = tapahtumat[i + 1];
  if (!seuraava) return { tila: { vuosi, i, viive: 0 }, syttyi: null, loppu: true };
  vuosi += dt / vuosiMs;
  if (vuosi < seuraava.vuosi) return { tila: { vuosi, i, viive: 0 }, syttyi: null, loppu: false };
  i += 1;
  return {
    tila: { vuosi: seuraava.vuosi, i, viive: seuraava.paalu ? paaluMs : viiveMs },
    syttyi: i,
    loppu: false,
  };
}

/* ==================== TYYLI ==================== */

const TYYLIN_TUNNUS = 'aikajana-tyyli';

function lataaTyyli() {
  if (typeof document === 'undefined') return null;
  if (document.getElementById(TYYLIN_TUNNUS)) return null;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return null;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('aikajana.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
  return linkki;
}

/* ==================== APURIT ==================== */

function solmu(tag, luokka, teksti) {
  const e = document.createElement(tag);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** Onko kuvatiedolla lähde: Commons-tiedosto tai valmis ämpäriosoite. */
function onKuva(kuvatieto) {
  return Boolean(kuvatieto?.tiedosto || kuvatieto?.osoite);
}

/* ==================== PIENI KUVAVERSIO ==================== */

/**
 * ÄMPÄRIOSOITTEEN PIENI VERSIO (Raamattu, KEKSIJAT LINSSIN ALARIVILLA
 * kohta 4: *"LINSSIKUVAT ESILADATAAN pienina (640 px WebP, ampari
 * aikajana/keksinnot/pieni/) linssin avautuessa; iso kuva vasta Lue
 * juttu -napista."*).
 *
 * Sääntö on täsmälleen sama kuin pienennystyökalulla
 * (tools/tee-pienet-kuvat.mjs `runkoOsoitteesta` + `ampariAvain`):
 * pieni versio menee ALKUPERÄISEN OMAN kansion `pieni/`-alikansioon ja
 * saa saman rungon WebP-päätteellä. Siksi kaksi kansiota kulkee
 * samalla säännöllä eikä nimilistaa tarvita:
 *
 *   …/aikajana/keksinnot/1769-watt.jpg
 *     → …/aikajana/keksinnot/pieni/1769-watt.webp
 *   …/aikajana/keksinnot/muotokuva/1769-james-watt.jpg
 *     → …/aikajana/keksinnot/muotokuva/pieni/1769-james-watt.webp
 *
 * PALAUTTAA SYÖTTEEN SELLAISENAAN, jos se ei ole URL, jos nimessä ei
 * ole päätettä tai jos osoite on jo pienessä kansiossa. Peli ei saa
 * kaatua kuvan takia — puuttuvan pienen version hoitaa kuvaelementin
 * kertaluontoinen varareitti (asetaAmpariKuva).
 *
 * @param {string} osoite
 * @returns {string}
 */
export function pieniOsoite(osoite) {
  if (typeof osoite !== 'string' || !osoite) return osoite;
  let url;
  try {
    url = new URL(osoite);
  } catch {
    return osoite;
  }
  const osat = url.pathname.split('/');
  const nimi = osat.pop() ?? '';
  const runko = nimi.replace(/\.[a-z0-9]+$/i, '');
  // Ei päätettä (runko === nimi) tai ei nimeä lainkaan: ei kosketa.
  if (!runko || runko === nimi) return osoite;
  if (osat.at(-1) === 'pieni') return osoite;
  url.pathname = [...osat, 'pieni', `${runko}.webp`].join('/');
  return url.href;
}

/**
 * Suurin leveys, jossa pieni versio (640 px) riittää. Sitä isompi
 * pyyntö — käytännössä vain jutun galleria — saa alkuperäisen.
 */
export const PIENEN_KATTO = 640;

/**
 * Ämpärikuva elementtiin: pieni versio ensin, alkuperäinen VARANA
 * KERRAN. Kertaluontoinen kuuntelija (`once`) on tässä olennainen:
 * jos varakin kaatuu, uutta yritystä ei tule eikä synny silmukkaa.
 */
function asetaAmpariKuva(kuva, osoite, leveys) {
  const pieni = leveys <= PIENEN_KATTO ? pieniOsoite(osoite) : osoite;
  if (pieni !== osoite) {
    kuva.addEventListener('error', () => { kuva.src = osoite; }, { once: true });
  }
  kuva.src = pieni;
}

/** Kuva pergamentille; ilman lähdettä nimikirjainlaatta. */
function kuvaTaiLaatta(kuvatieto, nimi, leveys, luokka) {
  const kehys = solmu('div', `aikajana-kuvakehys ${luokka}`);
  if (onKuva(kuvatieto)) {
    const kuva = document.createElement('img');
    kuva.alt = kuvatieto.selite ?? nimi ?? '';
    kuva.decoding = 'async';
    kuva.loading = 'eager';
    /*
     * Generoitu kuva (kuvaputki, ämpäri) kulkee valmiina `osoite`-
     * kenttänä ilman thumb-putkea — sama sopimus kuin historian
     * hetkillä (js/historian-hetket.js) — mutta pienenä versiona ja
     * alkuperäinen varana (asetaAmpariKuva). Commons-kuva
     * (`tiedosto`) menee peilin ja Commonsin portaita kuten ennen.
     */
    if (kuvatieto.osoite) asetaAmpariKuva(kuva, kuvatieto.osoite, leveys);
    else asetaKuva(kuva, valokuvaUrl(kuvatieto.tiedosto, leveys), valokuvaVara(kuvatieto.tiedosto, leveys));
    kehys.appendChild(kuva);
  } else {
    const kirjaimet = String(nimi ?? '?').split(/\s+/).map((s) => s[0] ?? '').join('').slice(0, 3);
    kehys.classList.add('tyhja');
    kehys.appendChild(solmu('span', 'aikajana-monogrammi', kirjaimet.toUpperCase()));
  }
  return kehys;
}

/**
 * Pysäkin keksijöiden muotokuvat järjestyksessä. Kaksoispysäkillä
 * (Montgolfier, Cooke ja Wheatstone, Lumière) tekijöitä on kaksi, ja
 * molemmat kuuluvat näkyviin: yksi kasvo kahdesta olisi väärä tieto.
 */
const muotokuvat = (t) => [t.kuva, t.kuvaToinen].filter(onKuva);

/**
 * MUOTOKUVAKEHYS: yksi tai kaksi rintakuvaa samassa kehyksessä.
 *
 * Kaksi kuvaa menee vierekkäin (CSS .kaksi), ei päällekkäin — kortti
 * on kapea, joten päällekkäisyys peittäisi toisen kasvot. Ilman
 * yhtäkään kuvaa palataan nimikirjainlaattaan, joka on merkkipaalun
 * ainoa esitys.
 */
function muotokuvaKehys(t, leveys, luokka) {
  const kuvat = muotokuvat(t);
  if (kuvat.length < 2) return kuvaTaiLaatta(kuvat[0] ?? null, t.henkilo ?? t.otsikko, leveys, luokka);
  const kehys = solmu('div', `aikajana-kuvakehys ${luokka} kaksi`);
  for (const kuvatieto of kuvat) {
    const kuva = document.createElement('img');
    kuva.alt = kuvatieto.selite ?? t.henkilo ?? '';
    kuva.decoding = 'async';
    kuva.loading = 'eager';
    if (kuvatieto.osoite) asetaAmpariKuva(kuva, kuvatieto.osoite, leveys);
    else asetaKuva(kuva, valokuvaUrl(kuvatieto.tiedosto, leveys), valokuvaVara(kuvatieto.tiedosto, leveys));
    kehys.appendChild(kuva);
  }
  return kehys;
}

/** Kaupungin nimi tapahtumasta (paikka on datan kenttä). */
const paikka = (t) => t.paikka ?? t.kaupunki ?? '';

/* ==================== KARUSELLI ==================== */

/*
 * ALARIVI ON KARUSELLI (omistaja 3.9.2026, sanatarkasti: *"nuo
 * henkiloiden kuvat voisi tayttaa koko alarivin niin etta nykyinen
 * henkilo on aina keskella ruutua ja kaikki vasemmalla ja oikealla
 * puolella olevat ovat merkittavasti pienempia ja kaikki vasemmalla
 * puolella ovat kevyesti blurattuja"*).
 *
 * MIKSI PUHTAANA FUNKTIONA. Koko asettelu on yhtä laskentaa: kuinka
 * kaukana keskeltä kortti on, kuinka pieni se on, näkyykö se ja
 * kuinka sumea se on. Laskenta rikkoutuu hiljaa (kortti liukuu ruudun
 * ulkopuolelle tai keskikortti ei ole keskellä), joten se on tässä
 * DOM:ittomana ja testattavana — kuten tahti ja vuosiluvun rullaus.
 * DOM saa vain valmiit luvut CSS-muuttujiin (asettele).
 */

/**
 * Kortin mitta etäisyyden mukaan: nykyinen täysi, naapurit
 * *"merkittavasti pienempia"* ja kauempana vielä pienempiä. Neljäs
 * arvo on pohja — sitä kauempana kortti ei enää kutistu, jotta
 * kasvot pysyvät tunnistettavina reunaan asti.
 */
export const KARUSELLIN_MITAT = [1, 0.62, 0.52, 0.44];

/** Korttien väli: peräkkäisten korttien keskimitta + 5 % rakoa. */
export const KARUSELLIN_VALI = 1.05;

export function karusellinMitta(etaisyys) {
  const d = Math.min(Math.abs(Math.trunc(etaisyys)), KARUSELLIN_MITAT.length - 1);
  return KARUSELLIN_MITAT[d];
}

/**
 * Kortin keskipisteen etäisyys nauhan keskeltä KORTIN LEVEYKSINÄ.
 *
 * Kertyvä summa eikä vakioaskel: kun kortit kutistuvat ulospäin,
 * vakioaskel jättäisi reunoille ammottavat raot. Kahden vierekkäisen
 * kortin väli on niiden mittojen keskiarvo, joten karuselli pakkautuu
 * tasaisesti reunaa kohti.
 */
export function karusellinEtaisyys(d) {
  let x = 0;
  for (let k = 1; k <= Math.abs(d); k += 1) {
    x += ((karusellinMitta(k - 1) + karusellinMitta(k)) / 2) * KARUSELLIN_VALI;
  }
  return x;
}

/**
 * Yhden kortin paikka karusellissa.
 *
 * @param {number} i kortin järjestysnumero (kronologinen)
 * @param {number} nyt nykyisen pysäkin numero (-1 ennen ensimmäistä)
 * @param {number} leveysKortteina nauhan leveys kortin leveyksinä
 * @returns {{paikka:number, mitta:number, luokka:string,
 *   himmeys:number, sumennus:number, jarjestys:number}}
 *   `paikka` on negatiivinen menneille (vasemmalle) ja positiivinen
 *   tuleville (oikealle), yksikkönä kortin leveys.
 */
export function karusellinPaikat(i, nyt, leveysKortteina) {
  const ero = i - nyt;
  const d = Math.abs(ero);
  const mitta = karusellinMitta(d);
  const paikka = Math.sign(ero) * karusellinEtaisyys(d);
  // Mahtuuko kortti kokonaan ruudulle? Nykyinen mahtuu aina — se on
  // keskellä, ja ilman sitä nauha olisi tyhjä kapeimmalla puhelimella.
  const puolikas = Math.max(1, leveysKortteina || 0) / 2;
  const mahtuu = ero === 0 || Math.abs(paikka) + mitta / 2 <= puolikas;
  let luokka = 'piilossa';
  if (ero === 0) luokka = 'nykyinen';
  else if (mahtuu) luokka = ero < 0 ? 'mennyt' : 'tuleva';
  /*
   * MENNEET SUMENTUVAT, TULEVAT EIVÄT (omistajan sanamuoto: *"kaikki
   * vasemmalla puolella ovat kevyesti blurattuja"*). Sumennus on
   * kevyt — 1,5–2 px — jotta kasvot yhä erottuvat: kyse on syvyydestä,
   * ei salaamisesta. Tulevat erottuvat pelkällä koolla ja vaimeudella.
   */
  const sumennus = ero < 0 ? Math.min(2, 1.5 + (d - 1) * 0.25) : 0;
  let himmeys = 1;
  if (ero < 0) himmeys = Math.max(0.4, 0.82 - (d - 1) * 0.14);
  else if (ero > 0) himmeys = Math.max(0.5, 0.9 - (d - 1) * 0.12);
  if (luokka === 'piilossa') himmeys = 0;
  return {
    paikka,
    mitta,
    luokka,
    himmeys,
    sumennus,
    // Lähempänä keskustaa oleva kortti peittää kauempana olevan.
    jarjestys: 100 - d,
  };
}

/* ==================== VUOSILUKU RULLAA ==================== */

/**
 * VUOSILUVUN RULLAUS (omistajan tilaus 3.9.2026: *"sen vuosiluvun
 * animoida niin, että numero pyörähtää ylhäältä alas, kuin
 * hedelmäpeli automaatissa"*).
 *
 * Jokainen numeromerkki on oma rulla (span.vuosi-numero), jonka
 * sisällä on kaksi päällekkäistä riviä: näkyvä merkki ja sen alle
 * väistyvä vanha. Vaihdossa vanha liukuu ikkunasta alas ja uusi tulee
 * ylhäältä sen tilalle — yksi liike myös silloin, kun vuosi hyppää
 * monta askelta (kortista toiseen kelaus): välivuosia ei käydä läpi.
 *
 * VAIN MUUTTUNEET NUMEROT LIIKKUVAT: 1769 → 1770 rullaa kaksi oikeaa
 * numeroa, vuosituhat ja -sata seisovat paikallaan. Kesto ja kaari
 * ovat Raamatun animaatiosäännön rajoissa (nopeutus ja hidastus,
 * 200–400 ms); `heti` on sekä linssin avaus että
 * prefers-reduced-motion, joissa merkki vaihtuu ilman liikettä.
 *
 * DOM:iton siltä osin kuin mahdollista: rulla on pelkkä
 * `{ vanha, uusi, merkki }` -pari, joten tahdin tapaan tämäkin on
 * testattavissa tyngällä (tests/aikajana.test.mjs).
 */
export const VUOSI_RULLAUS_MS = 320;
export const VUOSI_RULLAUS_KAARI = 'cubic-bezier(0.22, 0.9, 0.24, 1)';

function asetaRivi(rivi, y, siirtyma) {
  rivi.style.transition = siirtyma;
  rivi.style.transform = `translateY(${y}%)`;
}

/**
 * Näyttää vuosiluvun rullissa ja palauttaa ne rullat, jotka liikkuivat.
 *
 * @param {Array<{vanha:object, uusi:object, merkki:?string}>} rullat
 * @param {string} teksti nelimerkkinen vuosiluku ('1769')
 * @param {{heti?:boolean}} [asetukset]
 */
export function rullaaVuosi(rullat, teksti, { heti = false } = {}) {
  const muuttuneet = [];
  rullat.forEach((rulla, k) => {
    const merkki = teksti[k] ?? '';
    if (rulla.merkki === merkki) return;
    rulla.vanha.textContent = rulla.merkki ?? '';
    rulla.uusi.textContent = merkki;
    rulla.merkki = merkki;
    muuttuneet.push(rulla);
  });
  if (!muuttuneet.length) return muuttuneet;
  // Lähtöasento ilman siirtymää: vanha merkki vielä ikkunassa, uusi
  // sen yläpuolella piilossa.
  for (const rulla of muuttuneet) {
    asetaRivi(rulla.vanha, 0, 'none');
    asetaRivi(rulla.uusi, -100, 'none');
  }
  /*
   * Yksi pakotettu asettelu koko ryhmälle: ilman lukua selain laskisi
   * lähtö- ja loppuasennon samassa tyylilaskennassa eikä siirtymä
   * lähtisi lainkaan (numerot vain vaihtuisivat).
   */
  void muuttuneet[0].uusi.offsetHeight;
  const siirtyma = heti ? 'none' : `transform ${VUOSI_RULLAUS_MS}ms ${VUOSI_RULLAUS_KAARI}`;
  for (const rulla of muuttuneet) {
    asetaRivi(rulla.vanha, 100, siirtyma);
    asetaRivi(rulla.uusi, 0, siirtyma);
  }
  return muuttuneet;
}

/* ==================== MOOTTORI ==================== */

class Aikajana {
  constructor(ui, linssi) {
    this.ui = ui;
    this.linssi = linssi;
    const kaari = linssi.aikajana;
    this.kaari = kaari;
    // Vuosi ratkaisee järjestyksen; saman vuoden sisällä datan järjestys.
    this.tapahtumat = [...kaari.tapahtumat]
      .map((t, n) => ({ ...t, n }))
      .sort((a, b) => (a.vuosi - b.vuosi) || (a.n - b.n));
    this.tila = { vuosi: kaari.alku, i: -1, viive: 0 };
    this.kaynnissa = false;
    this.loppu = false;
    this.raf = 0;
    this.viime = 0;
    this.kortit = [];
    this.valot = [];
    // Naksahduksen katto: nolla on "kauan sitten", koska kello
    // käynnistyy vasta kamera-ajon jälkeen.
    this.viimeNaksu = 0;
    this.skaala = null;
    // Kaari kertoo raidan; ilman kenttää ajo on hiljainen.
    this.musiikkiLaji = kaari.musiikki ?? null;
    this.reducedMotion = Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  }

  /* ---------- rakentaminen ---------- */

  rakenna() {
    const { ui } = this;
    lataaTyyli();
    const koti = ui.mapPane;
    if (!koti) return false;
    this.juuri = solmu('div', 'aikajana');
    this.juuri.setAttribute('role', 'region');
    this.juuri.setAttribute('aria-label', this.kaari.otsikko);

    // 1. Kello ja ohjaimet
    const ylarivi = solmu('div', 'aikajana-ylarivi');
    this.kello = solmu('button', 'aikajana-kello');
    this.kello.type = 'button';
    this.kello.title = 'Pysäytä tai jatka';
    this.kello.setAttribute('aria-live', 'off');
    // Neljä rullaa, joissa kaksi päällekkäistä riviä (ks. rullaaVuosi).
    this.rullat = [];
    for (let k = 0; k < 4; k += 1) {
      const rulla = solmu('span', 'vuosi-numero');
      const vanha = solmu('span', 'vuosi-merkki');
      const uusi = solmu('span', 'vuosi-merkki');
      rulla.append(vanha, uusi);
      this.kello.appendChild(rulla);
      this.rullat.push({ vanha, uusi, merkki: null });
    }
    this.kello.addEventListener('click', () => (this.kaynnissa ? this.pysayta() : this.jatka()));
    const otsikot = solmu('div', 'aikajana-otsikot');
    this.otsikko = solmu('div', 'aikajana-otsikko', this.kaari.otsikko);
    this.paikkarivi = solmu('div', 'aikajana-paikka', `${this.kaari.alku}–${this.kaari.loppu}`);
    otsikot.append(this.otsikko, this.paikkarivi);
    const ohjaimet = solmu('div', 'aikajana-ohjaimet');
    this.taukoNappi = solmu('button', 'aikajana-nappi', 'Tauko');
    this.taukoNappi.type = 'button';
    this.taukoNappi.addEventListener('click', () => (this.kaynnissa ? this.pysayta() : this.jatka()));
    const alusta = solmu('button', 'aikajana-nappi', 'Alusta');
    alusta.type = 'button';
    alusta.addEventListener('click', () => this.alusta());
    const sulje = solmu('button', 'aikajana-nappi aikajana-sulje', 'Sulje');
    sulje.type = 'button';
    sulje.addEventListener('click', () => ui.pysaytaAikajana?.());
    ohjaimet.append(this.taukoNappi, alusta, sulje);
    ylarivi.append(otsikot, this.kello, ohjaimet);

    // 4. Ilmiöpaneeli
    this.paneeli = solmu('div', 'aikajana-ilmio');
    this.paneeli.hidden = true;

    // 3. Filminauha
    this.nauha = solmu('div', 'aikajana-nauha');
    this.tapahtumat.forEach((t, i) => {
      const kortti = solmu('button', `aikajana-kortti${t.paalu ? ' paalu' : ''}`);
      kortti.type = 'button';
      kortti.dataset.i = String(i);
      kortti.appendChild(muotokuvaKehys(t, 400, 'aikajana-muotokuva'));
      const teksti = solmu('div', 'aikajana-korttiteksti');
      teksti.append(
        solmu('div', 'aikajana-kortti-vuosi', String(t.vuosi)),
        solmu('div', 'aikajana-kortti-otsikko', t.otsikko),
        solmu('div', 'aikajana-kortti-henkilo', t.henkilo ?? paikka(t)),
      );
      kortti.appendChild(teksti);
      kortti.setAttribute('aria-label', `${t.vuosi}: ${t.otsikko}${t.henkilo ? `, ${t.henkilo}` : ''}`);
      kortti.addEventListener('click', () => this.napautaKorttia(i));
      this.nauha.appendChild(kortti);
      this.kortit.push(kortti);
    });

    this.juuri.append(ylarivi, this.paneeli, this.nauha);
    koti.appendChild(this.juuri);
    document.body.classList.add('aikajana-paalla');

    /*
     * KOON MUUTOS ASETTELEE KARUSELLIN UUDELLEEN. Ruudulle mahtuvien
     * korttien määrä tulee mitatusta leveydestä, joten ikkunan koon
     * muutos (myös puhelimen kääntö) on ainoa hetki, jolloin asettelu
     * pitää laskea ilman että pysäkki vaihtuu. Kuuntelija, ei ajastin
     * eikä kehyskohtainen työ.
     */
    this.koonMuutos = () => { if (this.juuri?.isConnected) this.asettele(); };
    globalThis.addEventListener?.('resize', this.koonMuutos);

    // 2. Valot kartalle
    this.rakennaValot();
    this.asettele();
    this.naytaVuosi(this.kaari.alku, true);
    return true;
  }

  rakennaValot() {
    const { ui } = this;
    if (!ui.svg) return;
    this.valokerros = el('g', { class: 'aikajana-valot' }, ui.svg);
    this.valot = this.tapahtumat.map((t) => {
      if (t.paalu || !Number.isFinite(t.x) || !Number.isFinite(t.y)) return null;
      const g = el('g', { class: 'aikajana-valo' }, this.valokerros);
      const sisus = el('g', { class: 'aikajana-valo-sisus' }, g);
      /*
       * KOLME YMPYRÄÄ, KAIKKI KESKIPISTEESSÄ (0,0) — ks. MERKIN_SADE.
       * Piirtojärjestys on alhaalta ylös: sykkivä rengas taimmaisena,
       * pehmeä hehku sen päällä ja täytetty pallo päällimmäisenä.
       */
      el('circle', { class: 'aikajana-valo-syke', r: MERKIN_SADE }, sisus);
      el('circle', { class: 'aikajana-valo-hehku', r: MERKIN_SADE * HEHKUN_SUHDE }, sisus);
      el('circle', { class: 'aikajana-valo-pallo', r: MERKIN_SADE }, sisus);
      return { g, x: t.x, y: t.y };
    });
    this.paivitaMittakaava();
    (ui.nipistysVastaskaalaajat ??= new Set()).add(this.vastaskaala ??= (suhde) => this.paivitaMittakaava(suhde));
  }

  /**
   * MERKIN MITTA ON RUUDUN PIKSELI, EI LEHDEN PIKSELI.
   *
   * === TOINEN SYY SIIHEN, ETTEI PAIKKA NÄKYNYT (mitattu 3.9.2026) ===
   *
   * Merkki luki mittansa `fokusMerkkiSkaalaKartalle`-parista, joka on
   * LEHDEN oma vakio: se mitoittaa merkin siihen näkymään, johon
   * saapumisajo maahan päätyy (js/ui.js fokusMerkkiSkaala). Aikajana
   * ei ole siinä näkymässä — se vapauttaa kameran (vapautaKamera) ja
   * sovittaa ruutuun koko Euroopan.
   *
   * Mitattu Ateenasta avattuna (1280 x 800, Kreikan lehti voimassa):
   * kerroin oli 0,4056 ja kartan oma mittakaava 0,512, joten 7
   * lautayksikön pallo oli ruudulla 1,5 PIKSELIÄ. Kaari näytti
   * tyhjältä kartalta — täsmälleen omistajan raportti.
   *
   * Aikajana mitoittaa merkkinsä siksi suoraan RUUTUUN (näkyvän alueen
   * mittakaavan käänteisluku, sama varapolku jota lehdetön näkymä
   * käyttää), jolloin MERKIN_SADE on ruudun pikseleitä joka zoomilla ja
   * jokaisella laudalla. `suhde` on nipistyseleen kerroin, ja tässä
   * haarassa se merkitsee (js/kartta.js vastaskaalaaMerkit).
   * Lehtipari jää varareitiksi näkymään, jota ei voi mitata.
   */
  merkkiSkaala(suhde = 1) {
    const skaala = this.ui.nakyvaAlue?.()?.skaala;
    if (Number.isFinite(skaala) && skaala > 0) return 1 / (skaala * (suhde > 0 ? suhde : 1));
    return this.ui.fokusMerkkiSkaalaKartalle?.(suhde) ?? this.ui.fokusMerkkiSkaala?.(suhde) ?? 0;
  }

  paivitaMittakaava(suhde = 1) {
    const s = this.merkkiSkaala(suhde);
    if (!(s > 0)) return;
    const zoom = s.toFixed(4);
    if (zoom === this.skaala) return;
    this.skaala = zoom;
    for (const valo of this.valot) {
      if (valo) valo.g.setAttribute('transform', `translate(${valo.x} ${valo.y}) scale(${zoom})`);
    }
  }

  /* ---------- kamera ---------- */

  /**
   * KAMERA VAPAAKSI AJON AJAKSI. Fokusmoodissa kamera on lukittu maan
   * ikkunaan (js/kartta.js fokusRajaukset, panorointiVapaa); kaari
   * kattaa monta maata, joten lukko avataan lipulla ja suljetaan
   * purussa. Rajaus ja zoomin pohja lasketaan lipun vaihtuessa
   * uudestaan samoin kuin kehittäjän maailmanäkymässä.
   */
  vapautaKamera(vapaa) {
    const { ui } = this;
    ui.kameraVapaa = vapaa;
    ui.fokusAvain = null;
    ui.paivitaMaailmanRajaus?.();
    ui.kartta?.tarkistaFokusZoom?.();
  }

  sovitaKaareen() {
    const { ui } = this;
    const alue = this.kaari.alue;
    if (!alue || !ui.kartta?.ajaKamera) return;
    // Nauha peittää alalaidan: laatikkoa jatketaan alas sen verran, että
    // kaaren eteläisimmät valot jäävät nauhan yläpuolelle.
    const laatikko = { x: alue.x, y: alue.y, w: alue.w, h: alue.h * 1.28 };
    void ui.kartta.ajaKamera(
      { bbox: laatikko, marginaali: 0.05 },
      { kesto: this.reducedMotion ? 0 : 1400 },
    );
  }

  /* ---------- musiikki (js/siirtymamusiikki.js) ---------- */

  /**
   * Käynnistää kaaren oman raidan ja asettaa sen heti oikeaan tasoon.
   * Turvallinen kutsua uudelleen: soittimen oma sääntö on, ettei sama
   * laji ala alusta, joten tämä ei nykäise raitaa (esim. kun juttu
   * suljetaan ja ajo jatkuu).
   */
  aloitaMusiikki(ajossa = this.kaynnissa) {
    if (!this.musiikkiLaji) return;
    aloitaSiirtymamusiikki(this.musiikkiLaji);
    this.saadaMusiikki(ajossa);
  }

  /**
   * Taso ajon tilan mukaan: täysi ajossa, puolet tauolla ja lopussa.
   * `ajossa` annetaan käsin vain käynnistyksessä, jossa kello ei ole
   * vielä lähtenyt mutta musiikki kuuluu jo täydellä — kamera-ajo on
   * osa ajoa, ei taukoa.
   */
  saadaMusiikki(ajossa = this.kaynnissa) {
    if (!this.musiikkiLaji) return;
    himmennaSiirtymamusiikki(ajossa ? 1 : AIKAJANA_TAUKO_HIMMENNYS);
  }

  /** Feidaus pois: sulkeminen, laudan vaihto tai avattu nähtävyyskortti. */
  lopetaMusiikki() {
    if (!this.musiikkiLaji) return;
    lopetaSiirtymamusiikki();
  }

  /**
   * NÄHTÄVYYSKORTTI ON OMA NÄKYMÄNSÄ: kun juttu avataan isommaksi
   * nostoksi, aikajanan musiikki väistyy kokonaan ja palaa vasta kun
   * kortti suljetaan. Paluu tehdään dialogin omasta `close`-
   * tapahtumasta eikä ajastimella, koska kortin voi sulkea monella
   * tavalla (nappi, tausta, Esc) — ja jos aikajana on sillä välin
   * purettu, paluu jää tekemättä.
   */
  vaimennaJutunAjaksi() {
    if (!this.musiikkiLaji) return;
    const dialogi = document.getElementById('nahtavyys-dialog');
    // Kortti ei auennut: musiikki jatkaa niin kuin mitään ei olisi.
    if (!dialogi?.open) return;
    this.lopetaMusiikki();
    dialogi.addEventListener('close', () => {
      if (!this.juuri?.isConnected) return;
      this.aloitaMusiikki();
    }, { once: true });
  }

  /* ---------- ajo ---------- */

  /**
   * TAUSTA VAIKENEE LINSSIN AJAKSI (omistaja 3.9.2026). Sama syy
   * molemmissa päissä, jotta purku osaa nostaa taustan takaisin;
   * kesken oleva luenta pysäytetään kuten pöllön paneelia avattaessa
   * (js/pollo.js avaa → pysaytaLukija).
   */
  avaaAanimaailma() {
    hiljennaAmbienssi(LINSSIN_HILJENNYS);
    pysaytaLukija();
    // Kohahduksen variantit metadataan jo nyt: ensimmäinen vuosi
    // vaihtuu sekunnin sisällä, eikä lataus saa myöhästyä siitä.
    esilataaKohahdukset();
  }

  /** Tausta takaisin samalla syyllä kuin se vietiin. */
  suljeAanimaailma() {
    palautaAmbienssi(LINSSIN_HILJENNYS);
  }

  kaynnista() {
    if (!this.rakenna()) return false;
    // Koko kaaren pienet kuvat taustalle jo kamera-ajon aikana.
    this.esilataaPienet();
    this.avaaAanimaailma();
    // Musiikki lähtee kamera-ajon kanssa, ennen kelloa: linssi alkaa
    // äänestä eikä vasta ensimmäisestä valosta.
    this.aloitaMusiikki(true);
    this.vapautaKamera(true);
    this.sovitaKaareen();
    // Kamera-ajo ensin, kello lähtee sen jälkeen — pelaaja näkee mistä
    // aloitetaan ennen kuin ensimmäinen valo syttyy.
    setTimeout(() => { if (this.juuri?.isConnected && !this.loppu) this.jatka(); }, this.reducedMotion ? 200 : 1500);
    return true;
  }

  jatka() {
    if (this.loppu || this.kaynnissa) return;
    this.kaynnissa = true;
    this.saadaMusiikki();
    this.viime = performance.now();
    this.taukoNappi.textContent = 'Tauko';
    this.juuri.classList.remove('tauolla');
    this.raf = requestAnimationFrame((t) => this.kehys(t));
  }

  pysayta() {
    if (!this.kaynnissa) return;
    this.kaynnissa = false;
    this.saadaMusiikki();
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.taukoNappi.textContent = this.loppu ? 'Loppu' : 'Jatka';
    this.juuri.classList.add('tauolla');
  }

  alusta() {
    this.pysayta();
    this.loppu = false;
    this.tila = { vuosi: this.kaari.alku, i: -1, viive: 0 };
    for (const valo of this.valot) valo?.g.classList.remove('palaa', 'nykyinen');
    this.paneeli.hidden = true;
    this.paneeli.replaceChildren();
    this.juuri.classList.remove('lopussa');
    this.paikkarivi.textContent = `${this.kaari.alku}–${this.kaari.loppu}`;
    this.asettele();
    this.naytaVuosi(this.kaari.alku, true);
    this.sovitaKaareen();
    this.jatka();
  }

  kehys(nyt) {
    if (!this.kaynnissa) return;
    const dt = Math.min(200, nyt - this.viime);
    this.viime = nyt;
    const { tila, syttyi, loppu } = aikajanaAskel(this.tila, dt, this.tapahtumat, this.reducedMotion
      ? { vuosiMs: 40 } : {});
    this.tila = tila;
    this.naytaVuosi(Math.floor(tila.vuosi));
    if (syttyi !== null) this.sytyta(syttyi);
    this.paivitaMittakaava();
    if (loppu) {
      this.lopeta();
      return;
    }
    this.raf = requestAnimationFrame((t) => this.kehys(t));
  }

  lopeta() {
    this.loppu = true;
    this.pysayta();
    this.juuri.classList.add('lopussa');
    for (const valo of this.valot) valo?.g.classList.remove('nykyinen');
    const loppu = this.kaari.loppusanat;
    if (loppu) {
      this.vaihdaPaneeli({
        otsikko: loppu.otsikko ?? `${this.kaari.alku}–${this.kaari.loppu}`,
        henkilo: this.kaari.otsikko,
        selite: loppu.teksti,
        ilmio: loppu.kuva ?? null,
        vuosi: this.kaari.loppu,
      });
    }
    this.paikkarivi.textContent = `${this.kaari.alku}–${this.kaari.loppu} · ${this.valot.filter(Boolean).length} valoa`;
    sfx.play('paper');
  }

  /* ---------- näyttö ---------- */

  naytaVuosi(vuosi, heti = false) {
    const teksti = String(Math.max(0, Math.round(vuosi))).padStart(4, '0');
    if (teksti === this.kelloTeksti) return;
    // ELÄVÄ VAIHDOS = kello liikkui itse. Rakentaminen ja Alusta
    // asettavat luvun `heti`-lipulla ilman rullausta, eikä
    // ensimmäinen asetus (ei edellistä lukemaa) ole vaihdos lainkaan.
    const elava = !heti && this.kelloTeksti !== undefined;
    this.kelloTeksti = teksti;
    rullaaVuosi(this.rullat, teksti, { heti: heti || this.reducedMotion });
    this.kello.setAttribute('aria-label', `Vuosi ${Number(teksti)}`);
    // Ääni vain elävästä vaihdosta: avaus ja alustus ovat `heti`,
    // ja pysäytetty kello on hiljainen (kortista toiseen kelaus myös).
    if (elava && this.kaynnissa) this.vuosiAani();
  }

  /**
   * VUODEN VAIHTUMISEN ÄÄNI: kohahdus, varana naksahdus.
   *
   * Omistaja 3.9.2026: *"se efektiääni vuodenvaihtuessa voisi olla
   * joku uuu-huudahdus, aivan kuin yleisö kohahtaisi."* Kohahdus on
   * ämpärissä neljänä varianttina (js/tehosteet.js), eikä sama variantti
   * toistu peräkkäin. `soitaKohahdus` palauttaa false, jos varianttia
   * ei ole ladattu, ääni on mykistetty, peli on taustalla tai edellinen
   * kohahdus soi vielä — vain SILLOIN naksautetaan, jottei kaksi ääntä
   * soi päällekkäin.
   */
  vuosiAani() {
    if (soitaKohahdus()) return;
    this.naksahda();
  }

  /**
   * MEKAANISEN LASKURIN NAKSAHDUS vuoden vaihtuessa (omistajan tilaus
   * 3.9.2026: *"kun vuosiluku vaihtuu, niin siinäkin voisi olla pieni
   * ääniefekti taustalla"*). Ääni on js/sound.js:n 'vuosi' — hyvin
   * hiljainen, ja mykistyksen sekä taustatilan hoitaa SoundKit itse.
   * Liian tiheät ohitetaan (AIKAJANA_NAKSU_VALI_MS). Varaääni:
   * kohahdus (vuosiAani) soi tämän sijaan, kun se on ladattu.
   */
  naksahda() {
    const nyt = performance.now();
    if (nyt - this.viimeNaksu < AIKAJANA_NAKSU_VALI_MS) return false;
    this.viimeNaksu = nyt;
    sfx.play('vuosi');
    return true;
  }

  /**
   * ESILATAUS: KOKO KAARI PIENENÄ, HETI (omistajan havainto 3.9.2026:
   * *"kaikki kuvat pitää ladata ennakkoon taustalle ainakin tuossa
   * pienemmässä koossa mikä näkyy linssin animaation aikana"*, ja
   * Raamatun kohta 4: *"LINSSIKUVAT ESILADATAAN pienina … linssin
   * avautuessa; iso kuva vasta Lue juttu -napista."*).
   *
   * AIEMPI "kolme pysäkkiä edellä" oli kiertotie sille, että
   * alkuperäiset ovat 400–760 kt kappale: koko kaari niinä olisi yli
   * 14 Mt. Pieninä WebP-versioina (640 px, alle 90 kt) sama sarja on
   * 3–5 Mt, ja se ladataan taustalle kerralla kamera-ajon aikana.
   * Silloin karuselli ei enää odota verkkoa missään kohtaa — myöskään
   * silloin kun pelaaja hyppää kortista kauas eteenpäin.
   *
   * Isoja ei esiladata lainkaan: ne kuuluvat vasta jutun galleriaan.
   * Sama kirjanpito kuin muualla pelissä (ui-apurit esilataaKuvat):
   * yksi pyyntö per osoite per istunto.
   */
  esilataaPienet() {
    const osoitteet = [];
    for (const t of this.tapahtumat) {
      for (const kuva of [t.kuva, t.kuvaToinen, t.ilmio, t.ilmioLisa]) {
        if (kuva?.osoite) osoitteet.push(pieniOsoite(kuva.osoite));
      }
    }
    esilataaKuvat(osoitteet);
  }

  sytyta(i) {
    const t = this.tapahtumat[i];
    for (const valo of this.valot) valo?.g.classList.remove('nykyinen');
    const valo = this.valot[i];
    if (valo) {
      valo.g.classList.add('palaa', 'nykyinen');
      // Palava valo päällimmäiseksi, jottei myöhempi naapuri peitä sitä.
      this.valokerros.appendChild(valo.g);
      sfx.play('star');
    } else {
      sfx.play('paper');
    }
    this.paikkarivi.textContent = [t.vuosi, paikka(t)].filter(Boolean).join(' · ');
    this.vaihdaPaneeli(t);
    this.asettele();
  }

  /**
   * Ilmiöpaneelin ristihäivytys: uusi sisältö tulee alta esiin, vanha
   * häipyy ja poistuu siirtymän jälkeen (css .aikajana-ilmio-sivu).
   */
  vaihdaPaneeli(t) {
    const sivu = solmu('div', 'aikajana-ilmio-sivu');
    // Paneelissa kuva vain jos sellainen on: nimikirjainlaatta kuuluu
    // nauhan kortille, ei selitteen ylle.
    if (onKuva(t.ilmio)) sivu.appendChild(kuvaTaiLaatta(t.ilmio, t.otsikko, 640, 'aikajana-ilmiokuva'));
    const teksti = solmu('div', 'aikajana-ilmio-teksti');
    /*
     * HENKILÖRIVI: keksijän kasvot nimen vieressä. Muotokuva on
     * pieni rintakuva, jotta katse pysyy ilmiökuvassa; kaksoispysäkin
     * molemmat kasvot mahtuvat samalle riville vierekkäin.
     */
    const henkilorivi = solmu('div', 'aikajana-ilmio-henkilo');
    if (muotokuvat(t).length) henkilorivi.appendChild(muotokuvaKehys(t, 200, 'aikajana-ilmio-kasvot'));
    henkilorivi.appendChild(solmu('span', 'aikajana-ilmio-nimi', t.henkilo ?? ''));
    teksti.append(
      henkilorivi,
      solmu('h3', 'aikajana-ilmio-otsikko', t.otsikko),
      solmu('p', 'aikajana-ilmio-selite', t.selite ?? ''),
    );
    if (t.ilmio?.selite) teksti.appendChild(solmu('div', 'aikajana-ilmio-kuvateksti', t.ilmio.selite));
    if (t.juttu) {
      const lue = solmu('button', 'aikajana-lue', 'Lue juttu');
      lue.type = 'button';
      lue.addEventListener('click', () => this.avaaJuttu(t));
      teksti.appendChild(lue);
    }
    sivu.append(teksti);
    const vanhat = [...this.paneeli.children];
    this.paneeli.hidden = false;
    this.paneeli.appendChild(sivu);
    requestAnimationFrame(() => {
      sivu.classList.add('esilla');
      for (const v of vanhat) {
        v.classList.remove('esilla');
        v.classList.add('poistuu');
        setTimeout(() => v.remove(), 700);
      }
    });
  }

  /**
   * NAUHAN LEVEYS KORTIN LEVEYKSINÄ. Kortin leveys on CSS-muuttuja
   * (`--aikajana-kortti-w`, clamp-arvo), joten se luetaan mitattuna
   * eikä arvattuna: sama laskenta pätee sekä 1280 px:n työpöydällä
   * että 390 px:n puhelimella. `offsetWidth` on ASETTELUN leveys eikä
   * skaalattu, joten kutistettu kortti ei sotke mittaa.
   */
  nauhanLeveysKortteina() {
    const nauha = this.nauha?.clientWidth ?? 0;
    const kortti = this.kortit[0]?.offsetWidth ?? 0;
    if (!(nauha > 0) || !(kortti > 0)) return 0;
    return nauha / kortti;
  }

  /**
   * KARUSELLIN ASETTELU. Nykyinen kortti on aina nauhan keskellä,
   * menneet vasemmalla ja tulevat oikealla kronologisessa
   * järjestyksessä (karusellinPaikat). Paikat, mitat, sumennus ja
   * himmeys menevät CSS-muuttujina, ja tyylitiedosto liu'uttaa koko
   * rivin uuteen asentoon yhdellä siirtymällä — vuoden vaihtuessa
   * rivi liukuu askeleen vasemmalle (Raamatun animaatiosääntö).
   *
   * Ruudun ulkopuolelle jäävät kortit saavat OMAN oikean paikkansa ja
   * pelkän läpinäkyvyyden nollaksi: silloin reunan takaa saapuva
   * kortti liukuu sisään oikeasta suunnasta eikä ilmesty tyhjästä.
   * Ne eivät ole napautettavia eivätkä fokusoitavia (aria-hidden).
   */
  asettele() {
    const nyt = this.tila.i;
    const leveys = this.nauhanLeveysKortteina();
    this.kortit.forEach((kortti, i) => {
      const { paikka: paikkaX, mitta, luokka, himmeys, sumennus, jarjestys } = karusellinPaikat(i, nyt, leveys);
      kortti.className = `aikajana-kortti ${luokka}${this.tapahtumat[i].paalu ? ' paalu' : ''}`;
      kortti.style.setProperty('--paikka', paikkaX.toFixed(3));
      kortti.style.setProperty('--mitta', mitta.toFixed(2));
      kortti.style.setProperty('--himmeys', himmeys.toFixed(2));
      kortti.style.setProperty('--sumennus', `${sumennus.toFixed(2)}px`);
      kortti.style.zIndex = String(jarjestys);
      const piilossa = luokka === 'piilossa';
      kortti.setAttribute('aria-hidden', piilossa ? 'true' : 'false');
      kortti.tabIndex = piilossa ? -1 : 0;
    });
    this.nauha.classList.toggle('tyhja', nyt < 0);
  }

  napautaKorttia(i) {
    const t = this.tapahtumat[i];
    if (!t) return;
    if (i === this.tila.i) {
      // Nykyinen kortti: pysäytä ja avaa juttu isommaksi nostoksi.
      this.pysayta();
      if (t.juttu) this.avaaJuttu(t);
      return;
    }
    if (i < this.tila.i) {
      // Mennyt kortti: pysäytä ja näytä se paneelissa uudelleen — kello
      // ei kelaa taaksepäin, valot jäävät.
      this.pysayta();
      this.vaihdaPaneeli(t);
      this.paikkarivi.textContent = [t.vuosi, paikka(t)].filter(Boolean).join(' · ');
      return;
    }
    // Tuleva kortti (karusellin oikea puoli): hyppää siihen heti.
    this.pysayta();
    this.tila = { vuosi: t.vuosi, i, viive: this.tapahtumat[i].paalu ? AIKAJANA_PAALU_MS : AIKAJANA_VIIVE_MS };
    this.naytaVuosi(t.vuosi);
    this.sytyta(i);
    if (i < this.tapahtumat.length - 1) this.jatka(); else this.lopeta();
  }

  avaaJuttu(t) {
    /*
     * Jutun kuvat: ilmiö ensin, sitten keksijän muotokuvat ja
     * viimeisenä aito Commons-kuva. Aito kuva ei enää näy kortissa,
     * mutta se ei myöskään katoa pelaajalta ennen kuin Tiedeliite
     * ottaa sen omakseen.
     */
    const kuvat = [t.ilmio, ...muotokuvat(t), t.kuvaAito].filter(onKuva);
    this.ui.avaaNahtavyys?.({
      nimi: t.otsikko,
      aika: [t.vuosi, paikka(t), t.henkilo].filter(Boolean).join(' · '),
      teksti: t.juttu,
      kuvat,
      lahde: t.lahde ?? this.linssi.lahde?.aineisto ?? 'Wikipedia',
    }, null, { valikko: false });
    this.vaimennaJutunAjaksi();
  }

  /* ---------- purku ---------- */

  pura() {
    this.pysayta();
    this.lopetaMusiikki();
    this.suljeAanimaailma();
    if (this.koonMuutos) globalThis.removeEventListener?.('resize', this.koonMuutos);
    this.koonMuutos = null;
    this.juuri?.remove();
    this.valokerros?.remove();
    if (this.vastaskaala) this.ui.nipistysVastaskaalaajat?.delete(this.vastaskaala);
    document.body.classList.remove('aikajana-paalla');
    if (this.ui.kameraVapaa) this.vapautaKamera(false);
    this.juuri = null;
    this.valokerros = null;
  }
}

/* ==================== JULKINEN RAJAPINTA ==================== */

/**
 * Käynnistää linssin aikajanan kartan päälle. Edellinen aikajana
 * puretaan ensin: kartalla on kerrallaan yksi kello.
 *
 * @returns {boolean} lähtikö ajo
 */
export function kaynnistaAikajana(ui, linssi) {
  if (typeof document === 'undefined' || !ui || !linssi?.aikajana) return false;
  pysaytaAikajana(ui);
  const ajo = new Aikajana(ui, linssi);
  if (!ajo.kaynnista()) return false;
  ui.aikajana = ajo;
  return true;
}

export function pysaytaAikajana(ui) {
  if (!ui?.aikajana) return false;
  ui.aikajana.pura();
  ui.aikajana = null;
  return true;
}

export function aikajanaPaalla(ui) {
  return Boolean(ui?.aikajana?.juuri?.isConnected);
}
