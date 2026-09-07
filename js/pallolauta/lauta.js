/*
 * PALLOLAUTA — karttapallo pelin lautana (vaihe 1: perusta ja kytkin;
 * vaihe 2: siirrot pallolla; vaihe 3: merkit — nimet ja nostot).
 *
 * OMISTAJAN LINJAUS 5.9.2026 (Raamattu, KARTTAPALLO ON PELILAUTA,
 * sanatarkasti): *"Voisiko pallon vaihtaa pelin kartaksi suoraan?"* /
 * *"Linssit voi olla vanhalla kartalla."* / *"Kunhan vanha kartta pysyy
 * pois tieltä eikä hidasta ollenkaan uuden kartan toimintaa. Mutta jos
 * pallo ei toimi niin pidetään optio palauttaa se."* Suunnitelma ja
 * vaiheistus: docs/moduulit/karttapallo.md.
 *
 * MITÄ TÄMÄ MODUULI ON. Sama Globe.gl-runko ja samat eleet kuin
 * matkalaukun valikkopallolla (js/pallo.js rakennaPallo,
 * asennaPallonEleet), mutta kuori asuu KARTTARUUDUSSA tasokartan
 * paikalla — ilman tummaa pohjaa ja ilman Sulje-nappia, koska lauta ei
 * ole ikkuna, joka suljetaan. Tasokartta nukkuu sen alla tyhjänä
 * (js/kartta.js lepotila) ja herää linssikartaksi vain linssin ajaksi
 * (js/pallolauta/linssikartta.js, ui.avaaLinssikartta delegoi sinne).
 *
 * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026, täsmennys "ei mitään
 * pinnoitteen päälle"): reittiverkko, rajat ja maasto ovat laatoissa,
 * eikä niitä piirretä pallolle kerroksena. Pallolle piirretään vain PELI
 * — se, mikä vaihtuu pelin edetessä tai ottaa vastaan kosketuksen.
 * Vaiheen 3 jälkeen se on: kaupunkipisteet, askelhelmet ja aihevalot
 * (pointsData), nappula, nopanheiton kohteet, KAUPUNKIEN NIMET, elävät
 * nostot, eläintäyt ja kohtaamispiste (htmlElementsData,
 * js/pallolauta/{merkit,nimet,nostot}.js), naapurireitit (pathsData) ja
 * lentokaaret (arcsData). Sallitut kerrokset ovat PALLOLAUDAN_KERROKSET,
 * ja tests/pallolauta.test.mjs vartioi, ettei muita synny. Kaupunkien
 * nimet ovat pelin merkkejä omistajan kortin vastauksella 5.9.2026
 * (*"kaupunkien nimet pallolaudalla ELAVINA tekstielementteina
 * laattojen paalla"*).
 *
 * PISTE VAIN NIMEN KANSSA (omistaja 31.8.2026): pistekerroksessa on vain
 * ne kaupungit, jotka saivat nimen ladonnassa (js/pallolauta/nimet.js),
 * pelaajan oma kaupunki (nappula nimeää sen) ja kehittäjän
 * maailmanäkymässä kaikki (silloin jokainen kaupunki on napautettava
 * hyppy, ui.maailmanakyma).
 *
 * LADONTA LEVOSSA. Nimet ja nostot ladotaan uudelleen vasta kun kamera
 * on pysähtynyt (js/pallo.js LAATU_LEPOVIIVE_MS, sama hetki kuin laadun
 * palautus) — ei joka kehys eikä joka eleessä. Liikkeessä merkit
 * seuraavat pistettään kirjaston CSS2D-kerroksessa.
 *
 * NAPAUTUS ON YKSI OSUMATESTI (R-malli, karttapallo.md riski 3): pallon
 * oma onGlobeClick/onPointClick antaa asteet, ja lähin merkki 44 px:n
 * sisällä voittaa — nopanheiton kohde ennen muita (se on kehotus
 * toimia), sitten kaupungit, nostot (elävät ja poltetut), eläintäyt ja
 * kohtaamispiste samassa kilpailussa (fokusniput sääntö 9: lähin
 * keskipiste voittaa). Sulkeva napautus ei avaa mitään uutta (omistaja
 * 31.8.2026): jos kortti oli auki sormen laskeutuessa, napautus vain
 * sulkee sen.
 *
 * KAIKKI LIIKE ANIMOIDAAN (Raamattu): merkkien ilmestyminen,
 * poistuminen ja paikanvaihto 250 ms, kamera-ajot trapetsilla
 * (js/pallolauta/kamera.js); reduced motion pudottaa kaiken nollaan.
 *
 * RENDER-SILMUKKA LEPÄÄ, KUN PALLOA EI KATSOTA (karttapallo.md luku 6):
 * Globe.gl piirtää rAF:lla jatkuvasti ja söisi akkua lehden takana.
 * Kun kaupunkilehti on auki, kuori piilossa (linssikartta) tai sivu
 * taustalla, kutsutaan pauseAnimation; kosketus, kamera-ajo ja
 * datan muutos herättävät.
 */

import {
  LAATU_LEPOVIIVE_MS, PALLO_LAATTATASO_MAX, PALLO_LAUTA, asennaPallonEleet, esilataaPallolaatat,
  laatatSaatavilla, laattatasoMax, lataaPallokirjasto, pakotaPallonLaatu,
  laudanPisteenAvain, pallonKaupungit, pallonLepokerros, pallonNostoOnPoltettu,
  pallonOmatPisteet, rakennaPallo, webglTuettu,
} from '../pallo.js';
import { luoPallovektorit, pallovektoritPaalla } from '../pallovektorit.js';
// Tarkistusapu: kaupungit, joiden uusi pulukulku on kuunneltavissa.
import { livianKorostetutKaupungit } from '../liviapuhe.js';
import { asemoiFokuskohde } from '../fokuskohteet.js';
import { laudaltaAsteiksi } from '../fokusmitat.js';
import { packById } from '../pack.js';
import { pixelOf, pointAlong, posKey } from '../rules.js';
import {
  PALLON_TURVATILAN_UNOHDUS_MS, kehittajaMaailmaPaalla, kehittajaTilaPaalla,
  nollaaPallonKaatumiset, palloKaatui, valikkoSulkeutuiNapautuksesta,
} from '../ui-apurit.js';
import {
  PALLOKAMERAN_AJO_MS, PALLO_FOV, PALLO_KORKEUS_MAX, luoPallokamera,
} from './kamera.js';
import { MERKIN_KORKEUS, luoMerkit } from './merkit.js';
import { NIMIEN_KATTO, luoNimet } from './nimet.js';
import {
  NOSTOJEN_KATTO, VALON_KORKEUS, VALON_SADE, luoNostot,
} from './nostot.js';
import {
  HELMEN_VARI, REITIN_VARIT, REITTIHELMEN_KORKEUS, REITTIHELMEN_SADE, luoReitit,
} from './reitit.js';
import { luoLinssikartta } from './linssikartta.js';
import { luoLinssit } from './linssit.js';
import { luoNappulanKuljettaja } from './siirto.js';
import { luoAloituslennonKohtaus } from './avaus.js';

/**
 * Sallitut Globe.gl-kerrokset pallolaudalla (vaihe 3): pisteet
 * (kaupungit, askelhelmet, aihevalot), html-merkit (nappula, kohteet,
 * nimet, elävät nostot, kohtaamispiste), polut (naapurireitit) ja
 * kaaret (lennot). Ei labelsData-nimiä, ei renkaita — kartta on
 * laatoissa. Vaihe 3 ei tarvinnut yhtään uutta kerrosta.
 *
 * LINSSIT 5.9.2026 (karttapallo.md luku 10, aalto 1A): monikulmiot
 * (polygonsData) tulivat listalle, koska linssi piirtää pallolle maat ja
 * järvet (js/pallolauta/linssit.js polygonit). Se on LINSSIN kerros eikä
 * kartan: peli ei piirrä sinne mitään, ja kerros on tyhjä aina kun
 * linssiä ei ole päällä.
 */
export const PALLOLAUDAN_KERROKSET = ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData', 'polygonsData'];
/*
 * ══════════════════════════════════════════════════════════════════
 * KAUPUNKIPISTE ON RUUDUN VAKIO, EI KARTAN (omistaja 7.9.2026, iPad:
 * Tampereen kohdalla iso musta ympyrä)
 * ══════════════════════════════════════════════════════════════════
 *
 * Globe.gl:n `pointRadius` on ASTEMITTA: kirjasto skaalaa pisteen
 * `säde × 2π · R / 360` yksiköksi pallon pinnalle (mitattu kirjaston
 * lähteestä, ks. PISTEEN_SKAALA), joten piste kasvaa ruudulla kääntäen
 * verrannollisena kameran korkeuteen. Vanha vakio 0,03 oli puhelimella
 * 2,7 px tavallisessa pelinäkymässä (korkeus 0,35) mutta 13,7 px
 * lähimmällä zoomilla ja iPadin korkeammalla ruudulla noin 30 px —
 * sama piste oli eri kokoinen joka laitteella ja joka zoomilla.
 * Raamattu sanoo pallon merkeistä, että koko on ruutuvakio;
 * kaupunkipiste oli ainoa, joka ei sitä ollut.
 *
 * KORJAUS: säde lasketaan kameran korkeudesta niin, että RUUTUHALKAISIJA
 * on sama kaikilla korkeuksilla ja kaikilla laitteilla
 * (kaupunkipisteenSade). Luku 7 px on valittu näin: se on vanhan
 * puhelinhaarukan (2,7…13,7 px) sisällä, viidesosa nappulasta (32 px),
 * joten nappula peittää pisteen kuten ennenkin, ja lähikuvassa
 * suunnilleen askelhelmen kokoinen — eikä se voi enää kasvaa iPadin
 * 30 pikseliin.
 */
export const KAUPUNKIPISTEEN_HALKAISIJA_PX = 7;
/**
 * Kirjaston pistemitta: `pointRadius` → olion skaala pallon yksiköissä.
 * Globe.gl 2.46: `scale.x = scale.y = min(30, r) · 2π · R / 360`, missä
 * R = 100 (kirjaston GLOBE_RADIUS). Sama luku molemmissa suunnissa:
 * pointRadius-luennassa ja suorassa skaalauksessa zoomin muuttuessa.
 */
export const PISTEEN_SKAALA = (2 * Math.PI * 100) / 360;
/** Kirjaston oma katto pisteen säteelle (min(30, r)). */
export const PISTEEN_SADE_MAX = 30;

/**
 * Kaupunkipisteen säde (Globe.gl:n pointRadius-yksikköä), joka antaa
 * halutun RUUTUHALKAISIJAN annetulla kameran korkeudella.
 *
 * Kamera on pinnasta `R · korkeus` yksikön päässä ja näkee siinä
 * kohdassa `2 · R · korkeus · tan(fov/2)` yksikköä ruudun korkeudella,
 * joten yksi yksikkö on `H / (2 · R · korkeus · tan(fov/2))` pikseliä.
 * Piste on `2 · säde · 2π · R / 360` yksikköä leveä, ja näiden tulo on
 * haluttu halkaisija — R supistuu pois:
 *
 *   säde = halkaisija · korkeus · tan(fov/2) · (180 / π) / H
 *
 * Tarkistus vanhaan mittaukseen: 7 px, korkeus 0,35, H 844 → 0,0776,
 * ja vanha 0,03 vastaa samalla kaavalla 2,7 px:ää (luku 12.3).
 */
export function kaupunkipisteenSade(korkeus, ruudunKorkeusPx, {
  halkaisijaPx = KAUPUNKIPISTEEN_HALKAISIJA_PX, fov = PALLO_FOV,
} = {}) {
  if (!(korkeus > 0) || !(ruudunKorkeusPx > 0)) return 0;
  const sade = (halkaisijaPx * korkeus * Math.tan((fov / 2) * (Math.PI / 180)) * (180 / Math.PI))
    / ruudunKorkeusPx;
  return Math.min(PISTEEN_SADE_MAX, sade);
}
/*
 * PISTE ON LEVY, EI TAPPI (omistaja 6.9.2026 ilta, iPhone, sanatarkasti:
 * *"piste venyy kun karttaa panoroi"*). Globe.gl piirtää pointsDatan
 * LIERIÖNÄ pinnasta korkeuteen: kaupunkipiste on 0,3 yksikköä korkea
 * (0,003 × säde 100) mutta vain 0,105 leveä eli kolme kertaa korkeampi
 * kuin leveä — tappi, ei täplä (askelhelmi 0,25 × 0,05, viisinkertainen).
 * Lähikuvassa kamera on vain 8 yksikön päässä pinnasta, joten ruudun
 * keskellä tappi näkyy päästä (pyöreänä) mutta laidalla sivusta: vaippa
 * piirtyy pinnan pisteestä kohti kattoa kapseliksi, ja nappulan jalka
 * (html-merkki korkeudella 0,004) on vielä kauempana. Levossa nappula
 * seisoo pisteen päällä ruudun keskellä, joten vika näkyy vasta kun
 * karttaa panoroi ja piste siirtyy laidalle. Mitattu 6.9.2026 (Chromium
 * 390 × 844 dpr 2, korkeus 0,08, erotuskuva piste näkyvissä/piilossa,
 * nappula piilotettuna): keskellä 22 × 22 laitepikseliä; 334 css-px
 * keskustasta lieriö 22 × 50, pääakselien suhde 2,2 (v1640: 22 × 41 —
 * sen 1,001-säteinen lepokerros peitti vaipan juuren, liikkeessä sekin
 * oli poissa; lepokerros ei siis ole syy vaan geometria). Levynä samasta
 * paikasta 22 × 23, suhde 1,0.
 *
 * KORJAUS: jokaisen pisteen geometria vaihdetaan LEVYYN — pelkkä lieriön
 * kansi sen yläpäässä (kirjaston paikallinen z = −1, jonka scale.z vie
 * korkeuteen), ei vaippaa. Levy on täsmälleen siinä, missä lieriön kansi
 * oli, joten korkeus, väri, napautus (raycast kanteen) ja siirtymät
 * (pointsTransitionDuration skaalaa z:aa) ovat ennallaan. Vaihto tehdään
 * pointRadius-luennassa: kirjasto sitoo olion datumiin ennen luentaa
 * (data-joint: createObj → updateObj), ja luenta ajetaan täsmälleen
 * silloin kun olio päivittyy — ei ylimääräistä kehyssilmukkaa. Geometria
 * rakennetaan kirjaston omilla luokilla ensimmäisestä lieriöstä, koska
 * pallolaudalla ei ole omaa THREE-tuontia (vrt. js/pallo.js
 * kolmiulotteinen). HYLÄTTY: pointAltitude pienemmäksi — kirjaston
 * lattia on 0,1 yksikköä (yhä lähes leveyden mittainen vaippa) ja
 * korkeus on pisteiden piirtojärjestys; oma Object3D-kerros omilla
 * levyillä — toinen napautus- ja siirtymäpolku samalle asialle.
 */
export const PISTELEVYN_SIVUT = 24;
/** Merkkien ilmestymisen ja paikanvaihdon kesto (ms). */
export const MERKKIEN_SIIRTYMA_MS = 250;
/** Napautuksen osuma ruudulla: lähin kaupunki tai kohde tämän säteen sisällä (px). */
export const NAPAUTUKSEN_SADE_PX = 44;
/*
 * PALLON TAKAPUOLI EI OTA NAPAUTUKSIA (vika v1664; omistaja 7.9.2026
 * aamu, sanatarkasti: *"Kartta saattaa lennähtää myös aivan eri maahan,
 * jos klikkaan jotain karttanostoa. Äsken klikkasin Japanin kohdalla
 * jotain kohdetta ja se lensikin Etelä-Amerikkaan."*)
 *
 * `getScreenCoords` projisoi MYÖS pallon takapuolen pisteet ruudulle, ja
 * perspektiivissä sormen säde leikkaa pallon kahdesti: napautettu piste
 * edessä ja sen vastapiste takana projisoituvat samaan ruutupikseliin.
 * Napautuksen osumatesti mittasi pelkkää ruutuetäisyyttä, joten
 * VASTAPISTEEN seutu voitti kilpailun. Mitattu 7.9.2026 (puhelin
 * 390 × 844, kamera Japanin yllä 36° N 140° I korkeudella 0,6, napautus
 * ruudun keskellä): Tokio 9,3 px — mutta heti perässä Porto Alegre
 * 64,1 px, Montevideo 73,7 px ja Rio de Janeiro 75,7 px, kaikki pallon
 * TAKANA. Japanin rannikolla 50 px sivussa Tokiosta napautus osui siis
 * Etelä-Amerikkaan, ja `doMove` vei nappulan sinne.
 *
 * Korjaus: osumatesti hyväksyy vain kameran puolella olevat merkit
 * (pisteEdessa). Sama sääntö oli jo linssin merkeillä (lahinLinssimerkki
 * suodatti `edessa`llä); nyt se on osumatestissä itsessään, joten se
 * koskee kaupunkeja, nostoja ja nopanheiton kohteita yhtä lailla.
 */
/**
 * Onko pinnan piste kameran puolella palloa? Puhdas kaava (pallon
 * pinnan normaali on piste itse, koska pallo on origokeskinen):
 * näkyvyys = (kamera − piste) · piste > 0.
 */
export function pisteEdessa(kameranPaikka, piste) {
  if (!kameranPaikka || !piste) return false;
  return (kameranPaikka.x - piste.x) * piste.x
    + (kameranPaikka.y - piste.y) * piste.y
    + (kameranPaikka.z - piste.z) * piste.z > 0;
}
/*
 * ══════════════════════════════════════════════════════════════════
 * LÄHTÖVALINNAN RAJAUS: PALLO PAIKALLAAN, OMISTAJAN KUVAN NÄKYMÄ
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA 7.9.2026 iltapäivä (työpöytäselain, sanatarkasti):
 * *"Kartta voisi sittenkin pysyä ihan paikallaan tässä, kun pelaaja
 * valitsee, minne hän haluaa lentää. Kartan zoomaustason voisikin
 * muuttaa tällaiseksi, mikä nyt näkyy kuvassa."*
 *
 * RAJAUS EI OLE ENÄÄ LAATIKKO VAAN NÄKYMÄ. Aiemmin (aalto 3A) kamera
 * sovitti Lontoon ja valittavien YHTEISEN LAATIKON ruudulle
 * (ALOITUSVALINNAN_MARGINAALI, kuplavarat). Se toimi, kun valittavia
 * oli yksi: laatikko oli Lontoo–Ateena eli Eurooppa. Kun kohteita on
 * neljätoista (js/ui-apurit.js ETUSIVUN_KOHTEET, omistajan koe
 * 7.9.2026), sama laatikko olisi koko maapallo — ja rajaus karkaisi
 * juuri siitä kuvasta, jonka omistaja pyysi. Näkymä on siksi nyt
 * KIINTEÄ: keskipiste ja korkeus, ei sovitusta.
 *
 * KESKIPISTE (30° N, 17° E) on omistajan kuvan keskiö: Välimeren ja
 * Saharan raja. Siitä katsottuna kuvassa ovat Eurooppa, Afrikka ja
 * Lähi-itä, Atlantti vasemmassa reunassa, Lontoo ylhäällä vasemmalla
 * keskeltä ja Ateena keskellä oikealla — mitattuna työpöydän
 * 2000 × 1125 ruudulla Lontoo (−0,31, +0,63) ja Ateena (+0,16, +0,25)
 * ruudun puolikkaina keskipisteestä.
 *
 * KORKEUS PALLON KOOSTA, EI LAUTAYKSIKÖISTÄ. Omistajan kuvassa pallo
 * täyttää ruudun korkeuden ja hieman ylikin, joten mitta on pallon
 * SÄDE ruudulla — 0,55 × ruudun korkeus, eli halkaisija 1,1 ruutua.
 * Globe.gl:n fov on PYSTYSUUNNAN kulma, joten sama korkeus antaa
 * saman pallon koron myös puhelimella; leveyssuunnassa pallo silloin
 * vuotaa reunojen yli, mikä on juuri se, mitä puhelimelta pyydettiin
 * (*"pallon leveys täyttää ruudun"*).
 *
 * ANKKURIT OVAT TURVAVERKKO. Kapealla ruudulla (kuvasuhde alle ~0,34)
 * kiinteä korkeus työntäisi Lontoon ulos kuvasta, joten kamera vetäytyy
 * niin kauas, että ankkurikaupungit — Lontoo ja Ateena — mahtuvat
 * ALOITUSVALINNAN_ANKKURIVARAN sisään. Mitatuilla ruuduilla (2000 × 1125
 * ja 390 × 844) ehto ei sido: pallon koko ratkaisee.
 */
/** Valintanäkymän keskipiste asteina (omistajan kuvan keskiö). */
export const ALOITUSVALINNAN_LAT = 30;
export const ALOITUSVALINNAN_LON = 17;
/** Pallon säde ruudulla osuutena ruudun KORKEUDESTA (yli 0,5 = ylivuoto). */
export const ALOITUSVALINNAN_PALLON_OSUUS = 0.55;
/** Ankkurikaupungit, joiden on mahduttava kuvaan kapeallakin ruudulla. */
export const ALOITUSVALINNAN_ANKKURIT = ['lontoo', 'ateena'];
/** Osuus ruudun puolikkaasta, jonka sisään ankkurin on mahduttava. */
export const ALOITUSVALINNAN_ANKKURIVARA = 0.78;

/** Asteet radiaaneiksi. */
const AST = Math.PI / 180;

/**
 * Piste yksikköpallolla paikallisessa ITÄ–POHJOINEN–YLÖS-kehyksessä,
 * jonka origo on kameran tähtäyspiste (lat0, lon0). `u` on kohti
 * kameraa, joten ruutupaikka on (e, n) / (etäisyys − u).
 */
function ankkurinKehys(lat0, lon0, lat, lon) {
  const [a0, b0, a, b] = [lat0 * AST, lon0 * AST, lat * AST, lon * AST];
  const v = [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
  const keskus = [Math.cos(a0) * Math.cos(b0), Math.cos(a0) * Math.sin(b0), Math.sin(a0)];
  const ita = [-Math.sin(b0), Math.cos(b0), 0];
  const pohjoinen = [-Math.sin(a0) * Math.cos(b0), -Math.sin(a0) * Math.sin(b0), Math.cos(a0)];
  const piste = (akseli) => v[0] * akseli[0] + v[1] * akseli[1] + v[2] * akseli[2];
  return { e: piste(ita), n: piste(pohjoinen), u: piste(keskus) };
}

/**
 * LÄHTÖVALINNAN KAMERAN KORKEUS (Globe.gl:n altitude).
 *
 * Kaksi ehtoa, kummastakin kauimmainen voittaa:
 *
 *   1. PALLON KOKO. Silhuetin kulmasäde ruudulla on
 *      atan(2 · osuus · tan(fov/2)) puolikkaina, ja pallon geometriasta
 *      etäisyys = 1 / sin(kulmasäde).
 *   2. ANKKURIT. Piste (e, n, u) osuu ruudulla kohtaan
 *      (e, n) / ((etäisyys − u) · tan(fov/2)) ruudun PUOLIKKAINA, joten
 *      ehdosta |x| ≤ vara · (leveys/korkeus) ja |y| ≤ vara seuraa
 *      etäisyys ≥ u + |e| / (varaX · tan) ja u + |n| / (vara · tan).
 *
 * @param {object} valinnat mitat ja tähtäys
 * @param {number} valinnat.leveysPx kotelon leveys pikseleinä
 * @param {number} valinnat.korkeusPx kotelon korkeus pikseleinä
 * @param {number} [valinnat.lat] tähtäyspisteen leveysaste
 * @param {number} [valinnat.lon] tähtäyspisteen pituusaste
 * @param {{lat: number, lon: number}[]} [valinnat.ankkurit] pisteet, joiden
 *   on mahduttava kuvaan
 * @returns {number} altitude (pallon säteinä pinnasta)
 */
export function aloitusvalinnanKorkeus({
  leveysPx, korkeusPx, lat = ALOITUSVALINNAN_LAT, lon = ALOITUSVALINNAN_LON,
  ankkurit = [], osuus = ALOITUSVALINNAN_PALLON_OSUUS, vara = ALOITUSVALINNAN_ANKKURIVARA,
  fov = PALLO_FOV,
} = {}) {
  const tan = Math.tan((fov / 2) * AST);
  const kuvasuhde = Math.max(0.05, (leveysPx || 1) / Math.max(1, korkeusPx || 1));
  // 1. Pallo täyttää ruudun korkeuden (hieman yli).
  const kulmasade = Math.atan(2 * osuus * tan);
  let etaisyys = 1 / Math.max(1e-6, Math.sin(kulmasade));
  // 2. Ankkurit mahtuvat kuvaan myös kapealla ruudulla.
  for (const ankkuri of ankkurit) {
    if (!Number.isFinite(ankkuri?.lat) || !Number.isFinite(ankkuri?.lon)) continue;
    const { e, n, u } = ankkurinKehys(lat, lon, ankkuri.lat, ankkuri.lon);
    etaisyys = Math.max(
      etaisyys,
      u + Math.abs(e) / Math.max(1e-6, vara * kuvasuhde * tan),
      u + Math.abs(n) / Math.max(1e-6, vara * tan),
    );
  }
  return Math.min(PALLO_KORKEUS_MAX, Math.max(0, etaisyys - 1));
}
/**
 * CSS2D-elementtejä pallolla enintään (karttapallo.md luku 6: nimet 40,
 * kohteet 12, elävät nostot 40 → priorisoidaan). Pelin merkit ja nostot
 * ensin, nimikatto laskee, kun nostoja on.
 */
export const HTML_MERKKIEN_KATTO = 60;
/** Ladonnan lepoviive: sama hetki kuin laadun palautus (js/pallo.js). */
export const LADONNAN_LEPOVIIVE_MS = LAATU_LEPOVIIVE_MS;
/**
 * Laattojen esilataus (vaihe 5c) käynnistetään vasta tämän jälkeen: ensin
 * pelaajan oma näkymä latautuu, sitten karkea maailma taustalle koriin.
 */
export const ESILATAUKSEN_VIIVE_MS = 3000;
/**
 * Hover-raycast pois kosketuslaitteilla (karttapallo.md luku 6): Globe.gl
 * raycastaa 261 pistettä + polut JOKA KEHYS niin kauan kuin
 * enablePointerInteraction on päällä (kirjaston oma silmukka, jarru 50 ms)
 * — hiirettömällä laitteella siitä ei ole mitään hyötyä, koska
 * hiirivihjettä ei ole. Napautus tarvitsee sen silti: kirjasto lukee
 * klikissä viimeisimmän osuman (hoverObj), joten raycast kytketään päälle
 * sormen laskeutuessa (documentin kaappausvaiheessa, ennen kirjaston omaa
 * pointerdown-kuuntelijaa, jotta kirjasto ehtii lukea sormen paikan) ja
 * pois tämän viiveen jälkeen, kun kirjaston oma klikki on käsitelty.
 */
export const OSOITTIMEN_JALKIVIIVE_MS = 400;

/**
 * TARKISTUSKOROSTUS (omistajan tilaus 7.9.2026, väliaikainen).
 *
 * Kaupunki, jonka uusi pulukulku on kirjoitettu JA äänitetty, näkyy
 * pallolla kirkkaan kultaisena pisteenä, jotta omistaja löytää
 * tarkistettavat kohteet yhdellä silmäyksellä. Korostus on VAIN väri:
 * pisteen koko, osumapinta ja nimien sovittelu pysyvät ennallaan, joten
 * kaupunkilehti- ja nosto-osumatestit eivät muutu. Päätoimittaja
 * kääntää LIVIAN_KOROSTUS_KAYTOSSA falseksi tarkistuksen jälkeen.
 */
const TARKISTUSVARI = '#f7c948';

/** Pisteen väri: tarkistettava kirkasta kultaa, käyty kultaa, alku vaaleaa. */
export function kaupunkipisteenVari(kaupunki) {
  if (livianKorostetutKaupungit().has(kaupunki.id)) return TARKISTUSVARI;
  if (kaupunki.kayty) return '#d9a13b';
  if (kaupunki.alku) return '#b28a4a';
  return '#3a2716';
}

/**
 * Levyn kärjet, normaalit ja kolmiot kirjaston lieriön paikallisessa
 * kehyksessä (ks. PISTE ON LEVY): kansi tasossa z = −1 eli lieriön
 * yläpäässä (kirjasto skaalaa z:n korkeudeksi ja kääntää +z:n pallon
 * keskustaan, joten −z on pinnasta ulospäin), normaali −z, kolmiot
 * vastapäivään ulkoa katsottuna (FrontSide). Säde 1: scale.x/y antaa
 * pisteen säteen kuten lieriöllä.
 */
export function pistelevynPuskurit(sivut = PISTELEVYN_SIVUT) {
  const paikat = new Float32Array((sivut + 1) * 3);
  const normaalit = new Float32Array((sivut + 1) * 3);
  paikat[2] = -1;
  normaalit[2] = -1;
  for (let i = 0; i < sivut; i += 1) {
    const kulma = (i / sivut) * 2 * Math.PI;
    const k = (i + 1) * 3;
    paikat[k] = Math.cos(kulma);
    paikat[k + 1] = Math.sin(kulma);
    paikat[k + 2] = -1;
    normaalit[k + 2] = -1;
  }
  const indeksit = [];
  // Keskipiste, seuraava, nykyinen: myötäpäivään +z:sta katsottuna on
  // vastapäivään −z:sta eli ulkoa katsottuna.
  for (let i = 0; i < sivut; i += 1) indeksit.push(0, ((i + 1) % sivut) + 1, i + 1);
  return { paikat, normaalit, indeksit };
}

/**
 * Levygeometria kirjaston omilla luokilla mallilieriöstä: BufferGeometry
 * on lieriön kantaluokka ja attribuutin luokka luetaan sen position-
 * attribuutista (sama kaava kuin js/pallo.js kolmiulotteinen). Null,
 * jos kirjaston muoto on vaihtunut — piste jää silloin lieriöksi.
 */
export function pistelevyGeometria(malli) {
  const Geometria = Object.getPrototypeOf(malli?.constructor?.prototype ?? {})?.constructor;
  const Attribuutti = malli?.attributes?.position?.constructor;
  if (typeof Geometria !== 'function' || typeof Attribuutti !== 'function') return null;
  const { paikat, normaalit, indeksit } = pistelevynPuskurit();
  const levy = new Geometria();
  levy.setAttribute('position', new Attribuutti(paikat, 3));
  levy.setAttribute('normal', new Attribuutti(normaalit, 3));
  levy.setIndex(indeksit);
  levy.userData = { ...(levy.userData ?? {}), pistelevy: true };
  return levy;
}

/**
 * Pisteiden litistäjä yhdelle pallolle: vaihtaa datumin olion lieriön
 * yhteiseen levyyn kerran per olio (ks. PISTE ON LEVY). Levy rakennetaan
 * ensimmäisestä lieriöstä ja puretaan laudan mukana.
 */
export function luoPisteidenLitistaja() {
  let levy = null;
  return {
    litista(d) {
      const o = d?.__threeObjPoint;
      if (!o?.geometry || o.geometry.userData?.pistelevy) return false;
      levy ??= pistelevyGeometria(o.geometry);
      if (!levy) return false;
      o.geometry = levy;
      return true;
    },
    levy: () => levy,
    pura() { levy?.dispose?.(); levy = null; },
  };
}

/*
 * KAUPUNGIN OMA PISTE ON LAUDAN EDELLÄ. Hakemisto (js/pallo.js
 * pallonOmatPisteet) täytetään laudan avautuessa ja tyhjennetään
 * purussa: se on laudan tilaa, ei moduulin, mutta `pallonAsteet` on
 * yhden argumentin funktio, jonka jokainen kerros saa `asteet`-nimellä
 * (merkit, nimet, nostot, reitit) — pakan pujottaminen niiden läpi vain
 * tämän vuoksi olisi sama tieto kuudessa paikassa. Tyhjä hakemisto
 * palauttaa käytöksen ennalleen.
 */
let omatPisteet = new Map();

/** Laudan kohta (x, y) asteiksi ({ lat, lon }) — yksi totuus on lauta. */
export function pallonAsteet(kohta) {
  if (!kohta || !Number.isFinite(kohta.x) || !Number.isFinite(kohta.y)) return null;
  const oma = omatPisteet.get(laudanPisteenAvain(kohta.x, kohta.y));
  if (oma) return { lat: oma.lat, lon: oma.lon };
  return laudaltaAsteiksi(PALLO_LAUTA, kohta.x, kohta.y);
}

/*
 * Kuinka monta kertaa pallo on rakennettu uudestaan WebGL-kontekstin
 * menetyksen jälkeen TÄSSÄ istunnossa. Yksi yritys riittää: toinen
 * menetys tarkoittaa, ettei laite jaksa palloa juuri nyt, ja peli
 * putoaa tasokartalle (ui.pallolautaVarapolku).
 */
let uudelleenrakennuksia = 0;

/** Avoinna oleva kelluva kortti (nielu: sulkeva napautus ei avaa uutta). */
const KORTTIVALITSIN = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup';

/**
 * Avaa pallolaudan karttaruutuun. Palauttaa lauta-olion, tai null jos
 * kirjasto ei latautunut (ui.js kääntää sen varapolkuun). Kuori ja
 * "Ladataan karttapalloa…" näkyvät heti, jotta ruutu ei ole tyhjä
 * kirjaston latauksen ajan.
 */
export async function avaaPallolauta(ui) {
  if (ui.dead || ui.pallolauta || !ui.mapPane) return null;
  const kuori = document.createElement('div');
  kuori.className = 'pallo-kuori pallolauta';
  kuori.setAttribute('role', 'region');
  kuori.setAttribute('aria-label', 'Karttapallo, pelin lauta');
  kuori.innerHTML = `
    <div class="pallo-kotelo"></div>
    <p class="pallo-tila">Ladataan karttapalloa…</p>`;
  ui.mapPane.appendChild(kuori);
  // Kuori näkyy heti ("esilla" häivyttää sisään kuten valikkopallossa).
  void kuori.getBoundingClientRect();
  kuori.classList.add('esilla');

  /*
   * WEBGL PUUTTUU (vaihe 5c): vanha selain tai laite, jolta WebGL on
   * kytketty pois. Kuori pois ja varapolku — kaatuva Globe.gl jättäisi
   * pelin tyhjän ruudun ääreen. Tämä lasketaan kaatumiseksi: toinen
   * peräkkäinen vie turvatilaan (js/ui-apurit.js).
   */
  if (!webglTuettu(document)) {
    palloKaatui();
    kuori.remove();
    return null;
  }
  let Globe = null;
  try {
    Globe = await lataaPallokirjasto();
  } catch {
    kuori.remove();
    return null;
  }
  const laatat = await laatatSaatavilla();
  if (ui.dead || ui.pallolauta) { kuori.remove(); return null; }

  const kotelo = kuori.querySelector('.pallo-kotelo');
  const tila = kuori.querySelector('.pallo-tila');
  let pallo = null;
  try {
    pallo = rakennaPallo(Globe, kotelo, laatat);
  } catch (syy) {
    // Kirjasto latautui mutta konteksti ei syntynyt (muisti loppu,
    // ohjain kaatui): sama tie kuin puuttuvalla WebGL:llä.
    console.warn('Karttapalloa ei voitu rakentaa.', syy);
    palloKaatui();
    kuori.remove();
    return null;
  }
  const eleet = asennaPallonEleet(pallo, kotelo, ui);
  // Lauta ei pyöri itsekseen: se on pelilauta, ei näyteikkuna.
  pallo.controls().autoRotate = false;
  const siirtyma = ui.reducedMotion ? 0 : MERKKIEN_SIIRTYMA_MS;

  /* ---- render-silmukan lepo ---------------------------------------- */
  let tauolla = false;
  const heraa = () => {
    if (!tauolla) return;
    tauolla = false;
    pallo.resumeAnimation?.();
  };
  const lepaa = () => {
    if (tauolla) return;
    tauolla = true;
    pallo.pauseAnimation?.();
  };
  /** Nukkuuko pallo: lehti auki, kuori piilossa tai sivu taustalla. */
  const lepoTarpeen = () => kuori.hidden
    || document.visibilityState === 'hidden'
    || Boolean(ui.arrivalDialog?.open);
  const tahdistaLepo = () => { if (lepoTarpeen()) lepaa(); else heraa(); };
  kotelo.addEventListener('pointerdown', heraa);
  // Rulla herättää samoin: työpöydällä panorointi ja zoom tulevat
  // wheelinä (js/pallo.js asennaPallonEleet), eikä nukkuva silmukka
  // piirtäisi liikettä. Kaappausvaihe, koska panorointi katkaisee
  // wheelin kuplinnan kotelossa.
  kotelo.addEventListener('wheel', heraa, { passive: true, capture: true });
  /*
   * PÄIVÄKIRJA LAATIKOSSA JA RIVIKSI VEDOSTA (omistaja 5.9.2026:
   * *"Päiväkirja pitäisi olla laatikossa ja rullautua ylös kuten
   * ennen"*). Tasokartalla kortin paperilaatikko tulee body.manner-zoom-
   * luokasta ja kutistuminen yhdelle riville kartan vedosta
   * (js/kartta.js asennaPanorointi) — kumpikaan ei aja nukkuvalla
   * kartalla. Pallolauta merkitsee bodyn (css: sama paperi) ja kutistaa
   * kortin, kun sormi lähtee liikkeelle pallolla; kortin oma napautus
   * avaa sen takaisin kuten ennen.
   */
  const doc = kuori.ownerDocument;
  doc.body.classList.add('pallolauta-paalla');
  let vetoAlku = null;
  kotelo.addEventListener('pointerdown', (e) => { vetoAlku = { x: e.clientX, y: e.clientY }; });
  kotelo.addEventListener('pointermove', (e) => {
    if (!vetoAlku) return;
    if (Math.abs(e.clientX - vetoAlku.x) > 6 || Math.abs(e.clientY - vetoAlku.y) > 6) {
      vetoAlku = null;
      ui.asetaPaivakirjanKoko?.(true);
    }
  });
  const vetoLoppu = () => { vetoAlku = null; };
  kotelo.addEventListener('pointerup', vetoLoppu);
  kotelo.addEventListener('pointercancel', vetoLoppu);
  document.addEventListener('visibilitychange', tahdistaLepo);
  // Lehden avaus ja sulku: dialogin open-attribuutti vaihtuu.
  const lehtivahti = ui.arrivalDialog ? new MutationObserver(tahdistaLepo) : null;
  lehtivahti?.observe(ui.arrivalDialog, { attributes: true, attributeFilter: ['open'] });

  /* ---- kamera ------------------------------------------------------ */
  /*
   * LÄHIN KORKEUS TULEE LAATOISTA (vaihe 5c, karttapallo.md luku 6):
   * kamera ei mene laattojen tarkkuuden alle. Syvin taso on
   * laattaluettelon oma (laatat.json tasot.max, katto
   * PALLO_LAATTATASO_MAX = 8); ilman luetteloa pallo piirtyy
   * z4-varatekstuurista, jolloin raja lasketaan Z7:stä — muuten
   * pelaaja jäisi katsomaan koko palloa.
   */
  const laattataso = laatat ? laattatasoMax(laatat) : PALLO_LAATTATASO_MAX - 1;
  const kamera = luoPallokamera({
    pallo, kotelo, ui, lauta: PALLO_LAUTA, heraa, laattataso,
  });
  /*
   * SAMA RAJA MYÖS SORMELLE: kamera-ajot kulkevat kameran kautta, mutta
   * nipistys ja rulla kulkevat OrbitControlsin läpi. minDistance on
   * kirjaston oma katto pallon säteessä (etäisyys = säde · (1 + korkeus)).
   */
  const pallonSade = pallo.getGlobeRadius();
  const tahdistaZoomirajat = () => {
    const ohj = pallo.controls();
    ohj.minDistance = pallonSade * (1 + kamera.korkeusMin());
    ohj.maxDistance = pallonSade * (1 + PALLO_KORKEUS_MAX);
  };
  tahdistaZoomirajat();

  /* ---- WebGL-kontekstin menetys: yksi uudelleenrakennus, sitten varapolku --- */
  /*
   * KONTEKSTI VOI KUOLLA KESKEN PELIN (karttapallo.md luku 6 ja riski 1):
   * WKWebView vapauttaa GPU-muistia taustalta palatessa tai muistipiikissä,
   * ja silloin selain lähettää canvasille webglcontextlost — kuva jäätyy
   * mustaksi eikä three.js palaudu itsestään. Ensimmäisellä kerralla pallo
   * rakennetaan kerran uudestaan (kuori pois, avaaPallolauta uudestaan);
   * jos konteksti kuolee heti uudestaan, pudotaan tasokartalle tälle
   * istunnolle. Kumpikin kirjataan kaatumislaskuriin: kaksi peräkkäistä
   * sulkee pallon tältä laitteelta (turvatila, js/ui-apurit.js).
   */
  const kangas = pallo.renderer?.()?.domElement ?? null;
  let konteksiMennyt = false;
  /** Valmis lauta-olio (asetetaan lopussa) — kontekstin purkua varten. */
  let omaLauta = null;
  const kontekstiKuoli = (e) => {
    // preventDefault sallii selaimen palauttaa kontekstin (webglcontextrestored).
    e?.preventDefault?.();
    if (konteksiMennyt) return;
    konteksiMennyt = true;
    palloKaatui();
    clearTimeout(vakausAjastin);
    // omaLauta asetetaan vasta lopussa: jos konteksti kuolee kesken
    // rakentamisen, puretaan pelkkä kuori (lauta-oliota ei vielä ole).
    if (omaLauta) {
      if (ui.pallolauta === omaLauta) ui.pallolauta = null;
      omaLauta.pura();
    } else {
      kuori.remove();
    }
    // Uudelleenrakennus vain kerran per istunto (modulin oma laskuri).
    if (uudelleenrakennuksia < 1) {
      uudelleenrakennuksia += 1;
      void ui.avaaPallolauta?.();
      return;
    }
    ui.pallolautaVarapolku?.();
  };
  kangas?.addEventListener('webglcontextlost', kontekstiKuoli);

  /* ---- hover-raycast pois kosketuslaitteilla (OSOITTIMEN_JALKIVIIVE_MS) --- */
  const kosketuslaite = Boolean(globalThis.matchMedia?.('(hover: none)')?.matches);
  let osoitinAjastin = 0;
  const osoitinPaalle = (e) => {
    if (!kotelo.contains(e.target)) return;
    clearTimeout(osoitinAjastin);
    pallo.enablePointerInteraction?.(true);
  };
  const osoitinPois = () => {
    clearTimeout(osoitinAjastin);
    osoitinAjastin = setTimeout(() => {
      if (!eleet.sormet.alhaalla) pallo.enablePointerInteraction?.(false);
    }, OSOITTIMEN_JALKIVIIVE_MS);
  };
  if (kosketuslaite) {
    pallo.enablePointerInteraction?.(false);
    // Kaappausvaiheessa dokumentista: kirjaston oma pointerdown-kuuntelija
    // on kotelossa ja lukee sormen paikan vasta jos raycast on jo päällä.
    document.addEventListener('pointerdown', osoitinPaalle, true);
    kotelo.addEventListener('pointerup', osoitinPois);
    kotelo.addEventListener('pointercancel', osoitinPois);
  }

  /* ---- laattojen esilataus ja vakaa istunto ------------------------- */
  /*
   * KARKEA MAAILMA KORIIN (vaihe 5c): palvelutyöntekijä hakee taustalla
   * tasot 0–3 ja oman kaupungin ympäristön, jotta lentotilassa avattu peli
   * näyttää pallon eikä tyhjää palloa (js/pallo.js esilataaPallolaatat,
   * sw.js esilataaLaatat). Vasta pelaajan oman näkymän jälkeen.
   */
  const esilatausAjastin = setTimeout(() => {
    const oma = ui.game?.cityOf?.();
    const asteet = pallonAsteet(oma ? pallonKohta({ type: 'city', city: oma.id }) : null);
    void esilataaPallolaatat(asteet ? { lat: asteet.lat, lon: asteet.lon } : {});
  }, ESILATAUKSEN_VIIVE_MS);
  /*
   * VAKAA ISTUNTO NOLLAA KAATUMISLASKURIN: turvatila koskee vain kahta
   * PERÄKKÄISTÄ kaatumista (js/ui-apurit.js). Kun pallo on ollut pystyssä
   * PALLON_TURVATILAN_UNOHDUS_MS, edelliset kaatumiset unohdetaan.
   */
  const vakausAjastin = setTimeout(() => nollaaPallonKaatumiset(), PALLON_TURVATILAN_UNOHDUS_MS);

  /* ---- ruutupisteet ------------------------------------------------ */
  /**
   * Onko pinnan piste kameran puolella palloa? CSS2D ja getScreenCoords
   * projisoivat myös takapuolen pisteet ruudulle; tämä erottaa ne.
   */
  const edessa = (lat, lng) => pisteEdessa(pallo.camera().position, pallo.getCoords(lat, lng, 0));
  /**
   * Pinnan piste kotelon pikseleinä, tai null jos se on pallon takana
   * tai `vara` pikseliä ruudun ulkopuolella.
   */
  const ruudulla = (lat, lng, vara = 0) => {
    if (!edessa(lat, lng)) return null;
    const p = pallo.getScreenCoords(lat, lng, 0);
    if (!p || !Number.isFinite(p.x)) return null;
    if (p.x < -vara || p.y < -vara || p.x > kotelo.clientWidth + vara || p.y > kotelo.clientHeight + vara) return null;
    return p;
  };
  /** Pinnan piste RUUDUN (client) pikseleinä korttien ankkuriksi. */
  const ankkuri = (lat, lng) => () => {
    const p = pallo.getScreenCoords(lat, lng, MERKIN_KORKEUS);
    const r = kotelo.getBoundingClientRect();
    return p ? { x: r.left + p.x, y: r.top + p.y } : null;
  };

  /* ---- kerrokset: kaupungit + helmet + valot (P), merkit (H), reitit (T, A) --- */
  let kaupungit = [];
  const kaupunkiId = new Map(); // id → pallon kaupunki
  /*
   * PALLON LAUTA ON AINA MAAILMANKARTTA (js/pallo.js PALLO_LAUTA): se on
   * ainoa lauta, jolla on maantieteellinen projektio. Pelin lauta on sama
   * paitsi LÄHTÖVALINNASSA (aalto 3A), jossa peli on vielä aloitusnäytön
   * omalla laudalla (js/packs/maailma.js) — eri koordinaatistossa, eikä
   * sen pisteitä voi projisoida pallolle. Valinta astuu joka tapauksessa
   * maailmankartalle heti (maailma.js links → 'maailmankartta'), joten
   * pallo piirtää sen kaupungit alusta asti: valinnan jälkeen mikään ei
   * vaihdu eikä 261 pistettä synny uudestaan.
   */
  const pack = ui.game.pack?.id === PALLO_LAUTA ? ui.game.pack : packById(PALLO_LAUTA);
  /** Laudan kaupunki tunnuksella (lähtövalinnan kohteet, ks. aloitusKohteet). */
  const packKaupunki = new Map((pack?.cities ?? []).map((c) => [c.id, c]));
  /*
   * KAUPUNKIEN OMAT PALLOPISTEET käyttöön koko laudan ajaksi (ks.
   * pallonAsteet yllä). `siirtymat` menee reittikerrokselle, joka
   * korjaa polyn päät samaan pisteeseen.
   */
  const { pisteet: laudanOmatPisteet, siirtymat } = pallonOmatPisteet(pack);
  omatPisteet = laudanOmatPisteet;
  const merkit = luoMerkit({
    pallo, ui, siirtyma, asteet: pallonAsteet, kotelo,
  });
  const reitit = luoReitit({
    pallo, ui, siirtyma, asteet: pallonAsteet, siirtymat,
  });
  /*
   * VEKTORIVIIVAT LAATTOJEN PÄÄLLE (Raamattu "VEKTORIT SAMALLA",
   * suunnitelma docs/moduulit/pallon-vektoriviivat.md luku 4):
   * rantaviiva ja maiden rajat piirtyvät Line2-nauhoina tasan
   * tavoiteleveytensä laitepikseleinä joka korkeudella — kerros lukee
   * Line2-luokat reittikerroksen kautta, joten se on luotava vasta
   * reittien jälkeen. `?vektorit=0` jättää kerroksen pois.
   */
  const vektorit = pallovektoritPaalla() ? luoPallovektorit({ pallo, kotelo, reitit }) : null;
  const nimet = luoNimet({
    ui, merkit, asteet: pallonAsteet, ruudulla, kotelo, pack,
  });
  const nostot = luoNostot({
    ui, merkit, asteet: pallonAsteet, ruudulla, onPoltettu: pallonNostoOnPoltettu,
  });

  /* ---- avauslennon tila (vaihe 5b) --------------------------------- */
  /*
   * NIUKKA PALLO AVAUSLENNON AJAKSI (Raamattu, ALOITUSLENTO UUSIKSI;
   * docs/moduulit/karttapallo.md luku 4, rivi "Aloituslento Lontoosta").
   *
   * Tasokartalla lennon niukkuus on kaksi asiaa: tasainen harso koko
   * laudan päälle ja kaksi ainoaa nimeä, Lontoo ja kohdekaupunki
   * (js/kartta.js aloituslennonNiukkuus; omistaja 3.9.2026 sanatarkasti:
   * *"lennon aikana kartalla näkyy Lontoo pisteenä + Lontoo-teksti ja
   * Ateena pisteenä + Ateena-teksti. Ei muita pisteitä eikä nimiä."*).
   * Pallolla sama sääntö tehdään pallon omilla kerroksilla: nimikatto
   * on kaksi ja pisteitä on vain nimien alla — HARSOA EI OLE (ks.
   * KARTTA NÄKYY TERÄVÄNÄ alla). Peli — nappula,
   * kohteet, nostot, eläintäyt — jää kokonaan pois, koska peli on jo
   * siirtänyt matkaajan perille (actionPickStart) eikä määränpää saa
   * paljastua ennen konetta.
   *
   * KAAREN PIIRTÄÄ SAMA SÄÄNTÖ KUIN MUUTKIN LENNOT. Reittikerros ottaa
   * valintansa ui.matkareittienValinnasta, mutta avauksessa peli on
   * vaiheessa 'action' eikä valinta anna mitään; lentotila antaa siksi
   * kerrokselle valmiin valinnan (yksi kaari, ei naapurireittejä), ja
   * ui.lentoKaari tekee siitä elävän katkojäljen kuten doFlyssä.
   */
  let lento = null; // { nimet: Set, valinta } avauslennon ajan

  const aloitaLentotila = ({ lahto, kohde }) => {
    if (!lahto || !kohde) return false;
    lento = {
      nimet: new Set([lahto.id, kohde.id]),
      valinta: {
        reittiTunnukset: [],
        lennot: [kohde.id],
        lentoLahto: lahto.id,
        avain: `aloituslento:${lahto.id}>${kohde.id}`,
        // Hento suunnitteluviiva paksun jäljen alle (omistaja 5.9.2026
        // klo 23.10): kaari kertoo minne kone on menossa, ja
        // js/pallolauta/avaus.js piirtää sen päälle sen, missä kone on
        // jo käynyt.
        kaarenVari: REITIN_VARIT.avauslennonSuunnitelma,
      },
    };
    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTA NÄKYY TERÄVÄNÄ LENNON AIKANA (omistaja 5.9.2026 klo 00.35)
     * ══════════════════════════════════════════════════════════════
     *
     * Sanatarkasti: *"lentokonekohtauksessa kartta voi näkyä ilman
     * sumennusta."*
     *
     * TÄSSÄ OLI KALVO. Vaihe 5b laski kotelon päälle pergamentin
     * värisen harson (css .pallolauta-harso, peittävyys 0,62), joka
     * jäljitteli tasokartan lentoharsoa (js/kartta.js
     * aloituslennonNiukkuus). Pallolla se peitti juuri sen, mitä
     * avauksessa on tarkoitus katsoa — laattakartan maapallon — ja
     * omistaja pyysi sen pois. Harso on poistettu kokonaan (elementti,
     * luokka ja css), joten lennon aikana pallolla ei ole yhtäkään
     * kalvoa eikä suodatinta.
     *
     * NIUKKUUS EI KATOA HARSON MUKANA: kaksi nimeä, ei muita pisteitä
     * eikä pelitilaa (nappula, kohteet, nostot) — se on lennon oma
     * sääntö ja tulee tästä samasta lentotilasta. Vanha kartta
     * (?lauta=kartta) pitää oman harsonsa: se on kartan lentokerroksen
     * omaa eikä tämän laudan asia.
     *
     * TARKAT LAATAT PIDETÄÄN PÄÄLLÄ LENNON AJAN (js/pallolauta/avaus.js
     * pakotaPallonLaatu): terävä kartta on nyt näkyvissä, joten se ei
     * saa olla liikelaadullaan röpeliäinen juuri silloin kun sitä
     * katsotaan.
     *
     * Merkit (nimet, kone) pelin muiden kerrosten päälle pinontatasolla.
     */
    kuori.classList.add('pallolauta-lennossa');
    merkkiAvain = null;
    paivita();
    return true;
  };

  /** Kohtaus väistyy: kone häipyy saapumiskortin alla. */
  const lennonPoistuma = () => { kuori.classList.add('pallolauta-lento-poistuu'); };

  /** Lentotila pois: kaari ja niukkuus katoavat, peli palaa. */
  const paataLentotila = () => {
    kuori.classList.remove('pallolauta-lento-poistuu', 'pallolauta-lennossa');
    if (!lento) return false;
    lento = null;
    merkkiAvain = null;
    paivita();
    return true;
  };

  /* ---- lähtökaupungin valinta (aalto 3A) --------------------------- */
  /*
   * LÄHTÖVALINTA ON PALLON OMA NÄKYMÄ (docs/moduulit/karttapallo.md luku
   * 10.3; omistaja 5.9.2026: *"Käännä kaikki pallolle, niin voidaan
   * sulkea vanha kartta kokonaan."*). Se on niukka samalla säännöllä
   * kuin avauslento: näkyvissä ovat vain Lontoo ja valittavat kaupungit
   * (js/ui.js ETUSIVUN_NAKYVAT, tasokartalla paivitaAloituskaupungit),
   * ja valittavat saavat saman kohdemerkin kuin nopanheiton kohteet
   * (js/pallolauta/merkit.js kohdeElementti) — sama muoto, sama väri ja
   * sama nimi kuin tasokartan aloituskartalla.
   *
   * Tila ei ole tämän moduulin kenttä vaan pelin vaihe: ui.js päättää
   * (aloitusvalinnanKohteet, aloitusvalinnanNakyvat), lauta piirtää.
   */
  /** Lähtövalinnan näkyvät kaupungit tai null, kun valintaa ei ole. */
  const aloitusNakyvat = () => ui.aloitusvalinnanNakyvat?.() ?? null;
  /**
   * Valittavat aloituskaupungit pallon kohdemerkeiksi. Paikka tulee
   * MAAILMANKARTAN koordinaateista (`packKaupunki`), koska pelin oma
   * lauta on tässä vaiheessa aloitusnäytön eikä sitä voi projisoida;
   * `city` on pelin laudan kaupunki, jonka doPickStart tarvitsee.
   */
  const aloitusKohteet = () => (ui.aloitusvalinnanKohteet?.() ?? []).map((city) => {
    const k = packKaupunki.get(city.id);
    if (!k) return null;
    // `huomio`: valittava saa kohdemerkin lisäksi sykkivän kultarenkaan
    // (js/pallolauta/merkit.js KOHDEMERKIN_HUOMIO_PX). Nopanheiton
    // kohteet eivät sitä saa — siellä merkki on jo lähikuvassa.
    return { key: `aloitus:${city.id}`, x: k.x, y: k.y, city, huomio: true };
  }).filter(Boolean);
  /*
   * VALITTAVAN KAUPUNGIN NIMI TULEE MERKISTÄ, EI NIMIKERROKSESTA
   * (omistajan kaappaus 5.9.2026 klo 00.30: Ateenan kohdalla luki KAKSI
   * nimeä päällekkäin — harmaa kapiteeli "ATEENA" nimikerroksesta ja
   * tumma lihavoitu "Ateena" kohdemerkin omasta lapusta). Molemmat ovat
   * pysyviä: nimikerros latoo lähtövalinnassa Lontoon ja valittavat
   * (aloitusNakyvat), ja kohdemerkki piirtää nimensä aina
   * (js/pallolauta/merkit.js kohdeElementti, sama .target-nimi kuin
   * tasokartan kohderenkaassa). MERKIN NIMI VOITTAA: se on kehotus
   * toimia, se on lähempänä silmää ja se on sama molemmilla laudoilla —
   * karttanimi jää siis pois valittavilta kaupungeilta. Lontoo on
   * lähtöpiste eikä valinta, joten se pitää karttanimensä.
   */
  const aloitusNimet = () => {
    const nakyvat = aloitusNakyvat();
    if (!nakyvat) return null;
    const kohteet = new Set(aloitusKohteet().map((k) => k.city.id));
    if (!kohteet.size) return nakyvat;
    return new Set([...nakyvat].filter((id) => !kohteet.has(id)));
  };
  /**
   * VALINTANÄKYMÄN RAJAUS: KIINTEÄ NÄKYMÄ, EI SOVITUSTA (omistaja
   * 7.9.2026; ks. ALOITUSVALINNAN_LAT yllä). Kamera ajetaan aina
   * samaan pisteeseen ja samaan korkeuteen — Välimeren yllä olevaan
   * kuvaan, jossa Eurooppa, Afrikka ja Lähi-itä ovat esillä ja pallo
   * täyttää ruudun korkeuden. Kohteiden määrä ei enää vaikuta
   * rajaukseen, joten neljätoista valittavaa näkyy samasta kuvasta
   * kuin yksi.
   *
   * KUPLAVARAA EI ENÄÄ TARVITA. Aiemmin keskipistettä siirrettiin
   * etelään ja itään, jottei Livian kuplapino (oikea alanurkka) peittäisi
   * ainoaa valittavaa kaupunkia. Uudessa rajauksessa Lontoo ja Ateena
   * ovat molemmat ruudun YLÄpuoliskossa (mitattu: Ateena +0,25 ruudun
   * puolikasta keskipisteestä ylös), eli kaukana kuplista; loput
   * kohteet ovat hajallaan pallolla, ja pelaaja kääntää palloa
   * itse — sama sääntö kuin pelin muissakin valinnoissa.
   *
   * PALLO PYSYY PAIKALLAAN. Kamera-ajo on ainoa liike, ja senkin
   * jälkeen mikään ei pyöritä palloa (ks. valinnan pyörinnän poisto
   * alempana): pelaajan oma panorointi ja nipistys jäävät kuvan
   * ainoiksi liikuttajiksi.
   */
  const aloitusnakyma = ({ kesto = 0 } = {}) => {
    const nakyvat = aloitusNakyvat();
    if (!nakyvat) return Promise.resolve(false);
    const ankkurit = ALOITUSVALINNAN_ANKKURIT
      .map((id) => packKaupunki.get(id))
      .filter(Boolean)
      .map((c) => pallonAsteet(c))
      .filter(Boolean);
    const korkeus = aloitusvalinnanKorkeus({
      leveysPx: Math.max(1, kotelo.clientWidth),
      korkeusPx: Math.max(1, kotelo.clientHeight),
      ankkurit,
    });
    // Terävä tila päälle heti: valinta on pysähtynyt kuva, ja se
    // katsotaan täydessä terävyydessä (omistaja 5.9.2026).
    pyydaAloituksenLaatu();
    return kamera.ajaKamera({
      lat: ALOITUSVALINNAN_LAT, lng: ALOITUSVALINNAN_LON, korkeus,
    }, { kesto });
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * PALLO PYSYY PAIKALLAAN VALINNASSA (omistaja 7.9.2026 iltapäivä:
   * *"Kartta voisi sittenkin pysyä ihan paikallaan tässä, kun pelaaja
   * valitsee, minne hän haluaa lentää."*)
   * ══════════════════════════════════════════════════════════════════
   *
   * TÄSSÄ OLI HIDAS PYÖRINTÄ. Valintanäkymä liukui 5.9.2026 alkaen
   * itään 0,16 astetta sekunnissa omalla rAF-silmukallaan, ja sillä
   * oli kolme pysäytintä: pehmeä hidastus sormesta, seis
   * toisesta kamera-ajosta ja seis vaiheen vaihtuessa. Omistaja kumosi
   * sen: valinta on lukutilanne, ja liikkuva kartta pakottaa katseen
   * seuraamaan. Kun kohteita on neljätoista, liike myös veisi kohteita
   * pois kuvasta odottavalta pelaajalta.
   *
   * PELAAJA SAA YHÄ LIIKUTTAA. Pallo on täysin panoroitava ja
   * zoomattava (kirjaston OrbitControls, js/pallo.js asennaPallonEleet)
   * — vain automaattinen liike on poissa. Juuri sitä neljätoista
   * kohdetta vaativat: takapuolen kaupungit haetaan kääntämällä.
   *
   * TERÄVÄ TILA JÄÄ. Laatujen pakotus (pakotaPallonLaatu) oli
   * pyörinnän pari, mutta se ei ollut sen takia: valintakuva katsotaan
   * täydessä terävyydessä, olkoon se liikkeessä tai ei. Pakotus
   * puretaan kahdesta paikasta (piirto kun kaupunki on valittu, ja
   * laudan purku), joten istunnon laskuri ei jää päälle.
   */
  let aloituksenLaatu = false;
  const pyydaAloituksenLaatu = () => {
    if (aloituksenLaatu) return;
    aloituksenLaatu = true;
    pakotaPallonLaatu(true);
  };
  const vapautaAloituksenLaatu = () => {
    if (!aloituksenLaatu) return;
    aloituksenLaatu = false;
    pakotaPallonLaatu(false);
  };
  /** Valinta ohi: terävän tilan pakotus pois. */
  const paataAloitusvalinta = () => {
    vapautaAloituksenLaatu();
  };

  /**
   * Pelin paikka (pos) PALLON laudan koordinaateiksi. Muulloin se on
   * pelkkä pixelOf, mutta lähtövalinnassa peli on aloitusnäytön laudalla
   * (js/packs/maailma.js), jonka x/y ei ole pallon projektiossa —
   * kaupunki haetaan silloin tunnuksella pallon omasta laudasta. Ilman
   * tätä matkaajan nappula seisoi lähtövalinnassa Tyynellämerellä
   * (mitattu Chromiumilla 5.9.2026).
   */
  const pallonKohta = (pos) => {
    if (!pos) return null;
    if (ui.game.pack?.id === pack?.id) {
      /*
       * REITILLÄ LEPÄÄVÄ PAIKKA LUETAAN KORJATULTA POLYLTA (kaupungin
       * oma pallopiste, js/pallolauta/reitit.js korjattuPoly), jotta
       * levossa seisova nappula on samalla viivalla, jota pitkin se
       * juuri kulki. Kaupungin oman pisteen hoitaa pallonAsteet.
       */
      const { board } = ui.game;
      if (!board) return null;
      const reitti = pos.type === 'edge' ? board.edgeById.get(pos.edge) : null;
      if (reitti?.poly?.length) return pointAlong(reitit.poly(reitti), pos.idx / reitti.steps);
      return pixelOf(board, pos);
    }
    if (pos.type !== 'city') return null;
    const c = packKaupunki.get(pos.city);
    return c ? { x: c.x, y: c.y } : null;
  };

  /** Laudan kaupunki (x, y, id, name) pallon kaupungista. */
  const laudanKaupunki = (k) => ui.game.board?.cityById?.get(k.id) ?? null;
  /**
   * Näkyykö kaupungin piste: nimetty, oma tai kehittäjän maailmanäkymä.
   * Avauslennolla vain reitin kaksi päätä ja lähtövalinnassa vain Lontoo
   * ja valittavat (PISTE VAIN NIMEN KANSSA pitää silloinkin: nimet ovat
   * täsmälleen samat kaupungit).
   */
  const pisteNakyy = (k) => {
    if (lento) return lento.nimet.has(k.id);
    const valinta = aloitusNakyvat();
    if (valinta) return valinta.has(k.id);
    return nimet.nimetty(k.id)
      || ui.game.cityOf?.()?.id === k.id
      || Boolean(ui.maailmanakyma?.());
  };

  /**
   * NAPAUTUS KAUPUNKIIN — sama teko kuin tasokartalla: nykyinen kaupunki
   * avaa kaupunkilehden (ui.avaaTutkinta, omistaja 2.9.: *"Kohdekaupunki
   * avaa aina kaupunkilehden"*), nopanheiton kohde valitsee kohteen
   * (doMove) ja kehittäjän maailmanäkymä hyppää mihin tahansa kaupunkiin
   * (doKehittajaSiirto). Muu kaupunki: kamera sukeltaa sen ylle, jotta
   * pelaaja voi katsoa laattoja. Lehti ei odota kameraa.
   */
  const napautaKaupunki = (k) => {
    if (ui.dead || ui.busy || !k) return false;
    /*
     * RADIOTILASSA KAUPUNGIT OVAT PLAY-NAPPEJA (js/linssit/radio.js
     * pallolle; omistaja 4.8.2026: *"kaikki muu toiminto häviää"*).
     * Napautuksen ottaa radion oma nappi, eikä pinnan napautus saa avata
     * lehteä tai sukeltaa kameralla — sama sääntö kuin tasokartalla,
     * jossa drawTargets piirtää radiotilassa vain radion napit.
     */
    if (ui.radioPaalla?.()) return false;
    const city = laudanKaupunki(k);
    if (!city) return false;
    /*
     * LÄHTÖVALINNASSA VAIN KOHTEET OVAT NAPAUTETTAVIA (aalto 3A): sama
     * sääntö kuin tasokartalla, jossa drawTargets piirtää pickstart-
     * vaiheessa vain aloituskohteiden renkaat. Lontoo on lähtöpiste eikä
     * valinta, eikä kamera saa sukeltaa sen ylle valintanäkymästä.
     * Kehittäjän maailmanäkymä ohittaa tämän kuten kartallakin
     * (doKehittajaSiirto → doPickStart).
     */
    if (ui.game.phase === 'pickstart'
      && !(kehittajaTilaPaalla() && kehittajaMaailmaPaalla() && !ui.katselu)) return false;
    heraa();
    const { game } = ui;
    const oma = game.cityOf?.();
    void kamera.ajaKamera({ x: city.x, y: city.y, leveys: kamera.kameranTila()?.leveys }, {});
    if (oma && oma.id === city.id) {
      ui.avaaTutkinta(city);
      return true;
    }
    if (game.phase === 'move' && !game.player?.isBot) {
      const kohde = game.moveOptions?.().find((opt) => opt.city?.id === city.id);
      if (kohde) { ui.doMove(kohde.key); return true; }
    }
    if (kehittajaTilaPaalla() && kehittajaMaailmaPaalla() && !ui.katselu) {
      ui.doKehittajaSiirto(city);
      return true;
    }
    return true;
  };

  /**
   * NAPAUTUS KOHTEESEEN (vaihe 2): nopanheiton kohde — kaupunki tai
   * askelpiste reitin varrella — valitaan napauttamalla sen merkkiä.
   * Osuma on R-malli (karttapallo.md riski 3): lähin kohde 44 px:n
   * sisällä pallon omasta napautuksesta, ei merkin oma click, jotta
   * doMove kutsutaan täsmälleen kerran.
   */
  const napautaKohde = (kohde) => {
    if (ui.dead || ui.busy || !kohde) return false;
    // Radiotilassa kartalla ei liikuta (sama portti kuin ui.doRollissa
    // ja napautaKaupungissa): kohteet ovat myös piilossa (css/radio.css).
    if (ui.radioPaalla?.()) return false;
    const { game } = ui;
    /*
     * LÄHTÖKAUPUNGIN VALINTA (aalto 3A): napautus tekee täsmälleen sen,
     * minkä tasokartan kohderengas teki — doPickStart pelin laudan
     * kaupungilla, ja avauslento lähtee siitä (js/ui.js doPickStart).
     */
    if (game.phase === 'pickstart') {
      if (!kohde.city) return false;
      heraa();
      ui.doPickStart(kohde.city);
      return true;
    }
    if (game.phase !== 'move' || game.player?.isBot) return false;
    heraa();
    ui.doMove(kohde.key);
    return true;
  };

  /** NAPAUTUS NOSTOON (vaihe 3): kortti aukeaa merkin ruutupisteestä. */
  const napautaNosto = (osuma) => {
    if (ui.dead || ui.busy || !osuma) return false;
    heraa();
    osuma.avaa(ankkuri(osuma.lat, osuma.lng));
    return true;
  };

  /**
   * Lähin merkki ruudulla napautuskohdasta (R-osuma, ≥ 44 px). VAIN
   * KAMERAN PUOLELTA: pallon takapuolen merkki projisoituu samaan
   * pikseliin kuin napautettu piste (ks. PALLON TAKAPUOLI EI OTA
   * NAPAUTUKSIA), ja ilman tätä se voitti kilpailun.
   */
  const lahin = (lat, lng, ehdokkaat, latOf, lngOf) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    let paras = null;
    let parasMatka = NAPAUTUKSEN_SADE_PX;
    for (const e of ehdokkaat) {
      if (!edessa(latOf(e), lngOf(e))) continue;
      const p = pallo.getScreenCoords(latOf(e), lngOf(e), 0);
      if (!p) continue;
      const d = Math.hypot(p.x - kohta.x, p.y - kohta.y);
      if (d < parasMatka) { parasMatka = d; paras = e; }
    }
    return paras;
  };
  const lahinKohde = (lat, lng) => lahin(lat, lng, merkit.kohteet(), (k) => k.lat, (k) => k.lng);
  /** Onko napautus enintään `sade` px:n päässä merkin ruutupisteestä? */
  const lahella = (lat, lng, merkki, sade) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    const p = pallo.getScreenCoords(merkki.lat, merkki.lng, 0);
    if (!kohta || !p) return false;
    return Math.hypot(p.x - kohta.x, p.y - kohta.y) <= sade;
  };

  /*
   * NAPAUTUS NOSTON NIMILAPPUUN (Raamattu, VIAT v1672; omistaja
   * 7.9.2026 illalla: *"Karttanostoissa teksti ei ota klikkausta
   * ainoastaan kuvake. Saisiko myös tekstit klikattaviksi?"*).
   *
   * Merkin osuma on ruutuetäisyys sen omaan pisteeseen, mutta nimilappu
   * piirtyy kuvakkeen KYLKEEN ja voi ulottua kauas siitä: pitkän nimen
   * ulkopää jää 44 px:n säteen ulkopuolelle (tai lähemmäs naapurin
   * keskipistettä), jolloin tekstin napautus ei tehnyt mitään. Nyt
   * osumatesti tarkistaa myös lapun LAATIKON — sen saman, jonka
   * sovittelu laski (js/pallolauta/nostot.js `lappu(p)`), samassa
   * ruutukoordinaatistossa. Piiloon sovitellulla lapulla laatikkoa ei
   * ole, jolloin jäljellä on vain kuvake, kuten ennen.
   *
   * Kahden lapun mennessä päällekkäin voittaa se, jonka laatikon
   * keskipiste on lähinnä — sama sääntö kuin merkeillä (js/fokusniput.js
   * sääntö 9), jotta kaksi reittiä samaan nostoon ei voi eri mieltä.
   */
  const lappuunOsunut = (lat, lng) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    let paras = null;
    let parasMatka = Infinity;
    for (const o of nostot.osumat()) {
      if (typeof o.lappu !== 'function' || !edessa(o.lat, o.lng)) continue;
      const p = pallo.getScreenCoords(o.lat, o.lng, 0);
      if (!p) continue;
      const r = o.lappu(p);
      if (!r || kohta.x < r.x0 || kohta.x > r.x1 || kohta.y < r.y0 || kohta.y > r.y1) continue;
      const d = Math.hypot((r.x0 + r.x1) / 2 - kohta.x, (r.y0 + r.y1) / 2 - kohta.y);
      if (d < parasMatka) { parasMatka = d; paras = { laji: 'nosto', lat: o.lat, lng: o.lng, o }; }
    }
    return paras;
  };

  /**
   * Kaupungit ja nostot SAMASSA kilpailussa (js/fokusniput.js sääntö 9:
   * lähin keskipiste voittaa) — vain näkyvät: nimetty kaupunki, oma
   * kaupunki, ruudulla oleva nosto, eläintäky tai kohtaamispiste.
   * NOSTON NIMILAPPU ON MUKANA (VIAT v1672): jos merkin oma piste ei
   * vie osumaa, katsotaan vielä, osuiko sormi piirretyn lapun päälle.
   */
  const lahinMerkki = (lat, lng) => {
    const ehdokkaat = [];
    for (const k of kaupungit) {
      if (pisteNakyy(k)) ehdokkaat.push({ laji: 'kaupunki', lat: k.lat, lng: k.lon, k });
    }
    for (const o of nostot.osumat()) ehdokkaat.push({ laji: 'nosto', lat: o.lat, lng: o.lng, o });
    const voittaja = lahin(lat, lng, ehdokkaat, (e) => e.lat, (e) => e.lng);
    /*
     * KAUPUNKIPISTEEN OMA MUSTE VOITTAA LAPUN. Piste on 7 px leveä
     * levy (KAUPUNKIPISTEEN_HALKAISIJA_PX), ja jos sormi on sen päällä,
     * pelaaja tähtäsi kaupunkiin — sama myönnytys kuin aarrepisteen
     * sivusiirrolla (js/fokuspiste.js). Kaikkialla muualla piirretty
     * teksti voittaa pelkän 44 px:n läheisyyden.
     */
    if (voittaja?.laji === 'kaupunki' && lahella(lat, lng, voittaja, KAUPUNKIPISTEEN_HALKAISIJA_PX / 2)) {
      return voittaja;
    }
    /*
     * KOHTAAMISPISTE PITÄÄ PAIKKANSA. Vihreä tuike on kevyen kulun oma
     * merkki, joka on jo kerran siirretty sivuun nappulan alta
     * (js/fokuspiste.js fokuspisteenSiirto, omistaja 6.9.2026:
     * *"aarteen piste syttyy liian lähelle ateenaa, ei pysty
     * painamaan"*) — se ei väisty vielä toistamiseen naapurin nimiön
     * alta. Lappu voittaa siis vain toisen noston tai tyhjän.
     */
    if (voittaja?.o?.perhe === 'piste') return voittaja;
    return lappuunOsunut(lat, lng) ?? voittaja;
  };

  /**
   * LINSSIN MERKKI VOITTAA (aalto 2A). Linssin merkki
   * (js/pallolauta/linssit.js merkit, datumissa `napautus`) on
   * napautettava kuten tasokartalla — aikajanan lamppu siirtää
   * pysäkkiin (omistaja 3.9.2026: *"kartan pisteet saisivat olla myös
   * klikattavissa"*) — ja se ratkaistaan ENNEN kaupunkeja ja nostoja:
   * linssi on oma näkymänsä, jonka aikana muu peli on kiinni, ja moni
   * lamppu istuu täsmälleen kaupungin päällä. Pallon takana oleva
   * merkki ei ota osumia.
   */
  const lahinLinssimerkki = (lat, lng) => {
    const ehdokkaat = merkit.napautettavat().filter((d) => edessa(d.lat, d.lng));
    return ehdokkaat.length ? lahin(lat, lng, ehdokkaat, (d) => d.lat, (d) => d.lng) : null;
  };

  /*
   * SULKEVA NAPAUTUS EI AVAA MITÄÄN UUTTA (omistaja 31.8.2026): kortin
   * oma kuuntelija sulkee kortin jo pointerdownissa, ja ilman tätä
   * lippua sama napautus avaisi klikissä seuraavan merkin.
   */
  let korttiOliAuki = false;
  // DOKUMENTIN kaappausvaiheessa ja ennen kortin omaa kuuntelijaa
  // (rekisteröity aiemmin): kortti on vielä DOMissa, kun tämä lukee.
  const korttivahti = (e) => {
    if (!kotelo.contains(e.target)) return;
    korttiOliAuki = Boolean(document.querySelector(KORTTIVALITSIN));
  };
  document.addEventListener('pointerdown', korttivahti, true);

  /** Napautus pallon pintaan: kohde ennen muita (kohde on kehotus toimia). */
  const napautaPintaan = (lat, lng) => {
    /*
     * VALIKON SULKU EI AVAA MITÄÄN (omistaja 7.9.2026): kysytään ENNEN
     * osumatestiä. Vartija (js/ui-apurit.js asennaValikonSulkuvartija)
     * sulki valikon jo tämän napautuksen pointerdownissa ja nielaisi
     * clickin; lippu on toinen lukko sen varalta, että nielu ei ehdi.
     */
    if (valikkoSulkeutuiNapautuksesta()) { korttiOliAuki = false; return; }
    if (korttiOliAuki) { korttiOliAuki = false; return; }
    const kohde = lahinKohde(lat, lng);
    if (kohde) { napautaKohde(kohde); return; }
    const linssimerkki = lahinLinssimerkki(lat, lng);
    if (linssimerkki) { heraa(); linssimerkki.napautus(linssimerkki); return; }
    const voittaja = lahinMerkki(lat, lng);
    if (!voittaja) return;
    if (voittaja.laji === 'kaupunki') napautaKaupunki(voittaja.k);
    else napautaNosto(voittaja.o);
  };

  /*
   * KAUPUNKIPISTEEN KOKO SEURAA KAMERAA (ks. KAUPUNKIPISTE ON RUUDUN
   * VAKIO yllä). Kirjasto lukee `pointRadius`-luennan vain datan
   * päivittyessä, joten zoomin muuttuessa säde kirjoitetaan suoraan
   * olion skaalaan — sama luku kuin luenta antaisi (PISTEEN_SKAALA), ei
   * uutta pistedataa eikä siirtymää, jolloin koko pysyy paikallaan
   * pehmeästi läpi zoomin.
   */
  let asetettuSade = 0;
  const pisteenSade = () => {
    asetettuSade = kaupunkipisteenSade(
      pallo.pointOfView()?.altitude ?? PALLO_KORKEUS_MAX, kotelo.clientHeight,
    );
    return asetettuSade;
  };
  const tahdistaPisteidenKoko = () => {
    const edellinen = asetettuSade;
    const sade = pisteenSade();
    if (!sade) return;
    /*
     * KIRJOITETAAN AINA, HERÄTETÄÄN VAIN MUUTOKSESTA. Kirjaston oma
     * siirtymä (pointsTransitionDuration) kirjoittaa uuden pisteen
     * skaalan kehys kerrallaan 250 ms:n ajan siitä säteestä, joka luvun
     * hetkellä oli voimassa; jos zoomi osuu siihen ikkunaan, tämä
     * kirjoitus jäisi sen alle. Ehdoton kirjoitus jokaisella
     * kamera-tapahtumalla ja ladonnalla korjaa senkin.
     */
    const skaala = sade * PISTEEN_SKAALA;
    for (const d of pallo.pointsData()) {
      if (d.laji === 'helmi' || d.laji === 'valo') continue;
      const o = d.__threeObjPoint;
      if (!o) continue;
      o.scale.x = skaala;
      o.scale.y = skaala;
    }
    if (Math.abs(sade - edellinen) >= 1e-6) heraa();
  };

  const litistaja = luoPisteidenLitistaja();
  pallo
    .pointsData([])
    .pointLat('lat').pointLng('lon')
    .pointColor((d) => {
      if (d.laji === 'helmi') return HELMEN_VARI;
      if (d.laji === 'valo') return d.vari;
      return kaupunkipisteenVari(d);
    })
    .pointAltitude((d) => {
      if (d.laji === 'helmi') return REITTIHELMEN_KORKEUS;
      if (d.laji === 'valo') return VALON_KORKEUS;
      return 0.003;
    })
    .pointRadius((d) => {
      // Lieriö levyksi tässä luennassa (PISTE ON LEVY): olio on jo
      // sidottu datumiin, ja luenta osuu täsmälleen olion päivitykseen.
      litistaja.litista(d);
      if (d.laji === 'helmi') return REITTIHELMEN_SADE;
      if (d.laji === 'valo') return VALON_SADE;
      // Kaupunkipiste on ruudun vakio: säde luetaan kameran korkeudesta
      // (tahdistaPisteidenKoko pitää sen samana zoomin muuttuessa).
      return pisteenSade();
    })
    .pointResolution(16)
    .pointsMerge(false)
    .pointsTransitionDuration(siirtyma)
    .onPointClick((d) => {
      if (eleet.sormet.nipistys) return;
      // Valikon sulku ei avaa kaupunkia (sama sääntö kuin pinnalla).
      if (valikkoSulkeutuiNapautuksesta()) { korttiOliAuki = false; return; }
      // Askelhelmi ja valo ovat koristeita: napautus niistä menee pinnalle.
      if (d.laji === 'helmi' || d.laji === 'valo') napautaPintaan(d.lat, d.lon);
      else if (korttiOliAuki) korttiOliAuki = false;
      // Linssin merkki kaupungin päällä (aikajanan lamppu) saa napautuksen
      // sen sijaan: sama sääntö kuin pinnan napautuksessa.
      else if (lahinLinssimerkki(d.lat, d.lon)) napautaPintaan(d.lat, d.lon);
      else napautaKaupunki(d);
    })
    .onGlobeClick(({ lat, lng }) => {
      // Nipistys ei ole napautus (js/pallo.js asennaPallonEleet); muuten
      // lähin kohde tai merkki 44 px:n sisällä saa napautuksen —
      // pisteet ovat karttavakio, joten ne ovat pienet kaukaa katsottuna.
      if (eleet.sormet.nipistys) return;
      napautaPintaan(lat, lng);
    });

  /* ---- pisteet: nimetyt kaupungit, helmet ja valot ------------------ */
  let pisteAvain = null;
  let helmet = [];
  const paivitaPisteet = () => {
    const nakyvat = kaupungit.filter(pisteNakyy);
    const valot = nostot.valot();
    const avain = [
      nakyvat.map((k) => `${k.id}${k.kayty ? '*' : ''}`).join(','),
      helmet.map((h) => h.id).join(','),
      valot.map((v) => v.id).join(','),
    ].join('|');
    if (avain === pisteAvain) return;
    pisteAvain = avain;
    heraa();
    pallo.pointsData([...valot, ...nakyvat, ...helmet]);
  };

  /* ---- ladonta levossa ---------------------------------------------- */
  let lepoAjastin = 0;
  /**
   * KOLME VAIHETTA YHDESSÄ LEVOSSA (Raamattu, KAUPUNGIN NIMI NOSTOJEN
   * PAALLA; docs/moduulit/karttapallo.md luku 14):
   *
   *   1. NOSTOT valitsevat, ketkä mahtuvat kerrokseen, ja antavat
   *      KIINTEÄN musteensa laatikot — poltettu muste ja elävien
   *      nostojen ikonit. Elävän noston LAPPU ei ole varaus.
   *   2. NIMET ladotaan budjetilla, joka jää pelin merkkien ja nostojen
   *      jälkeen. Nimi väistää vain sitä, mikä ei voi väistää itse.
   *   3. NOSTOJEN LAPUT SOVITELLAAN nyt kiinteiden nimilaatikoiden
   *      ympärille (kylki → pieni siirto → lappu piiloon). Kaupungin
   *      nimi on ensisijainen eikä liiku enää tässä vaiheessa.
   *
   * Lopuksi pisteet nimettyjen mukaan ja auki oleva kortti ankkurinsa
   * perään.
   */
  const ladoLevossa = () => {
    lepoAjastin = 0;
    if (ui.dead || kuori.hidden) return null;
    const nakyva = kamera.nakyvaAlue();
    const keskipiste = { x: kotelo.clientWidth / 2, y: kotelo.clientHeight / 2 };
    const pelia = merkit.maara('peli');
    const nostoTulos = nostot.paivita({
      nakyva,
      keskipiste,
      // Avauslennolla ei yhtään nostoa: lento on kartan niukin hetki.
      katto: lento ? 0 : Math.min(NOSTOJEN_KATTO, Math.max(0, HTML_MERKKIEN_KATTO - pelia)),
    });
    // Niukka nimijoukko: avauslennolla kaksi päätä, lähtövalinnassa
    // Lontoo (aalto 3A) — muulloin koko lauta budjetilla.
    const vain = lento?.nimet ?? aloitusNimet();
    const katto = vain
      ? vain.size
      : Math.min(NIMIEN_KATTO, Math.max(0, HTML_MERKKIEN_KATTO - pelia - nostoTulos.maara));
    const nimiTulos = nimet.lado({
      varaukset: nostoTulos.laatikot,
      pinot: merkit.laatikot('peli'),
      katto,
      vain,
    });
    const sovittelu = nostot.sovittele({ nimet: nimet.laatikot() });
    paivitaPisteet();
    // Ladonta ajetaan levossa, siirtymän jo mentyä: viimeinen sana
    // kaupunkipisteen koosta on tässä (ks. tahdistaPisteidenKoko).
    tahdistaPisteidenKoko();
    if (ui.fokuskohdeAuki?.ankkuri) asemoiFokuskohde(ui);
    return { nostot: nostoTulos, nimet: nimiTulos, sovittelu };
  };
  const pyydaLadonta = () => {
    clearTimeout(lepoAjastin);
    lepoAjastin = setTimeout(ladoLevossa, LADONNAN_LEPOVIIVE_MS);
  };
  // Kamera liikkui (ele, ajo, liuku): ladonta vasta levossa.
  const ohjaimet = pallo.controls();
  ohjaimet.addEventListener('change', pyydaLadonta);
  // Zoomi muuttaa kaupunkipisteen säteen heti, ei vasta levossa.
  ohjaimet.addEventListener('change', tahdistaPisteidenKoko);
  // Aihevalot: selitteen väripallo vaihtaa bodyn luokan.
  let valoAvain = '';
  const valovahti = new MutationObserver(() => {
    const avain = [...document.body.classList].filter((l) => l.startsWith('valot-')).sort().join(' ');
    if (avain === valoAvain) return;
    valoAvain = avain;
    nostot.paivitaValot();
    paivitaPisteet();
  });
  valovahti.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  // Selitevalikon kappalemäärät pallolta (js/karttavalot.js karttavalotLaskurit).
  ui.karttavaloLaskuri = () => nostot.laskurit();

  /* ---- merkit pelitilasta ------------------------------------------- */
  let merkkiAvain = null;
  /** posKey siitä paikasta, jossa nappula viimeksi NÄHTIIN laudalla. */
  let nappulanPaikka = null;
  const merkitseNappulanPaikka = (pos) => { nappulanPaikka = pos ? posKey(pos) : null; };

  /** Nopanheiton kohteet: sama sääntö kuin drawTargets (siirtovaihe, ei botti). */
  const kohdevalinta = () => {
    const { game } = ui;
    // Lähtövalinnassa kohteita ovat valittavat aloituskaupungit (aalto 3A).
    if (game.phase === 'pickstart') return aloitusKohteet();
    if (game.phase !== 'move' || game.player?.isBot || ui.katselu) return [];
    /*
     * KOHDE ON SAMASSA PISTEESSÄ KUIN ASKELHELMI JA NAPPULA: paikka
     * luetaan pallonKohdalla, joka lukee reitin korjatun polyn ja
     * kaupungin oman pallopisteen (js/pallo.js pallonOmatPisteet).
     * Suoralla pixelOfilla kohderengas jäisi vanhaan viivaan.
     */
    return (game.moveOptions?.() ?? []).map((opt) => {
      const kohta = pallonKohta(opt.pos);
      if (!kohta) return null;
      return { key: opt.key, x: kohta.x, y: kohta.y, city: opt.city ?? null };
    }).filter(Boolean);
  };

  /**
   * Merkit pelitilasta: käydyt kaupungit, askelhelmet, reitit, kohteet
   * ja nappula. Kutsutaan joka piirrossa (ui.paivitaPallolauta) ja
   * reittien vaihtuessa (ui.paivitaMatkareitit); avain karsii turhat.
   * Nimet ja nostot ladotaan perässä levossa (pyydaLadonta).
   */
  const paivita = () => {
    if (ui.dead) return;
    /*
     * LÄHTÖVALINTA OHI (kaupunki valittu): pyörintä ja terävän tilan
     * pakotus pois myös silloin, kun silmukka oli jo pysähtynyt sormeen
     * — pakotus on istunnon laskuri eikä saa jäädä päälle.
     */
    if (aloituksenLaatu && ui.game.phase !== 'pickstart') paataAloitusvalinta();
    const { game } = ui;
    const kaydyt = game.world?.visited ?? new Set();
    const pos = game.player?.pos ?? null;
    const kohta = pallonKohta(pos);
    // Pelaajan id on 0, joten totuusarvo ei kelpaa: null tarkoittaa lepoa.
    const liikkuu = ui.movingPlayerId != null;
    // Avauslennolla lauta on niukka: ei kohteita, ei nappulaa, ja
    // reittikerros saa lennon oman valinnan (yksi kaari).
    const kohteet = lento ? [] : kohdevalinta();
    const valinta = lento ? lento.valinta : ui.matkareittienValinta();
    const posAvain = pos ? posKey(pos) : '';
    const avain = [
      [...kaydyt].sort().join(','), posAvain, liikkuu ? 'liikkuu' : '',
      kohteet.map((k) => k.key).join(','), valinta.avain, ui.lentoKaari?.b ?? '',
      game.phase, ui.maailmanakyma?.() ? 'maailma' : '', lento ? 'lento' : '',
    ].join('|');
    if (avain === merkkiAvain) return;
    merkkiAvain = avain;
    heraa();
    // Kaupungit kerran; käyntitieto päivitetään SAMOIHIN olioihin, jotta
    // Globe.gl siirtää värin tweenillä eikä luo 261 pistettä uudestaan.
    if (!kaupungit.length) {
      kaupungit = pallonKaupungit(pack, kaydyt);
      kaupunkiId.clear();
      for (const k of kaupungit) kaupunkiId.set(k.id, k);
    } else {
      for (const k of kaupungit) k.kayty = kaydyt.has(k.id);
    }
    helmet = reitit.paivita(valinta);
    merkit.paivita({ nappula: liikkuu || lento ? null : kohta, kohteet });
    paivitaPisteet();
    pyydaLadonta();
    /*
     * KAMERA SEURAA TELEPORTTIA. Siirron kuljettaja kirjaa perillä
     * paikkansa (merkitseNappulanPaikka), joten tavallinen siirto ei
     * osu tähän — kamera jää sinne minne saatto sen vei (omistaja
     * 1.9.2026). Jos paikka vaihtui ILMAN siirtoa (kehittäjäsiirto,
     * tallenteen lataus kesken pelin), kamera sukeltaa perään.
     *
     * AVAUSLENNOLLA EI KOSKAAN: peli siirtää matkaajan perille jo
     * lennon alussa (actionPickStart), joten tämä veisi kameran
     * kohdekaupunkiin ennen kuin kone on lähtenyt Lontoosta. Lennon
     * kamera on lennon omassa kohtauksessa (js/pallolauta/avaus.js).
     */
    if (!liikkuu && !lento && pos) {
      if (nappulanPaikka !== null && nappulanPaikka !== posAvain) {
        void kamera.kotiin({ kesto: PALLOKAMERAN_AJO_MS });
      }
      nappulanPaikka = posAvain;
    }
  };

  /** Pelin paikan (pos) piste ruudulla (kotelon px) — nopan lähtö. */
  const ruutupiste = (pos) => {
    const a = pallonAsteet(pallonKohta(pos));
    if (!a) return null;
    return pallo.getScreenCoords(a.lat, a.lon, 0);
  };

  /* ---- noppa kuoreen laudan ajaksi -------------------------------- */
  /*
   * Noppa (js/die.js) asuu tasokartan siirtokuoressa, joka on tämän
   * kuoren alla. Laudan ajaksi sen kerros siirretään tähän kuoreen
   * pallon päälle (paikat ovat ruudun pikseleitä, ks. ui.animateDie) ja
   * palautetaan, kun kuori piilotetaan tai puretaan.
   */
  const noppaKuoreen = () => {
    const kerros = ui.boardDie?.layer;
    if (kerros && kerros.parentElement !== kuori) kuori.appendChild(kerros);
  };
  const noppaTakaisin = () => {
    const kerros = ui.boardDie?.layer;
    const koti = ui.karttaKuori ?? ui.mapPane;
    if (kerros && koti && kerros.parentElement === kuori) koti.appendChild(kerros);
  };

  /* ---- mitat, näkyvyys ja purku -------------------------------------- */
  const mitoita = () => {
    pallo.width(kotelo.clientWidth).height(kotelo.clientHeight);
    // Ruudun leveys on osa laattojen tarkkuusrajaa (vaihe 5c).
    tahdistaZoomirajat();
    // Ruudun korkeus on osa kaupunkipisteen ruutuvakiota.
    tahdistaPisteidenKoko();
    pyydaLadonta();
  };
  const kokovahti = new ResizeObserver(mitoita);
  kokovahti.observe(kotelo);

  const lauta = {
    kuori,
    kotelo,
    pallo,
    kamera,
    merkit,
    reitit,
    nimet,
    nostot,
    heraa,
    asteet: pallonAsteet,
    /**
     * Kaupunkien omien pallopisteiden siirtymä laudan yksikköinä
     * (js/pallo.js pallonOmatPisteet): nappulan kuljettaja lukee tästä,
     * mihin kaupunki pallolla oikeasti asettuu.
     */
    siirtymat,
    paivita,
    ruutupiste,
    ruudulla,
    merkitseNappulanPaikka,
    /** Ladonta heti ilman lepoviivettä (savukkeet ja vartijat). */
    ladoHeti: () => { clearTimeout(lepoAjastin); return ladoLevossa(); },
    /**
     * Lepokerroksen kahva (js/pallo.js luoLepokerros: mittarit, kokoa,
     * piilota) tai null ennen kuin laatunosto on asentunut. Funktio eikä
     * kenttä, koska asennus odottaa kirjaston laattamoottoria.
     */
    lepokerros: () => pallonLepokerros(pallo),
    /**
     * Vektorikerroksen kahva (js/pallovektorit.js: mittarit, paivita)
     * tai null, jos kerros on pois (`?vektorit=0`) — mittarit
     * savukkeille ja vartijalle kuten lepokerros.
     */
    vektorit: () => vektorit,
    /** Siirron kuljettaja (ui.nappulanKuljettaja → js/pallolauta/siirto.js). */
    nappulanKuljettaja: (player, valinnat) => luoNappulanKuljettaja({
      ui, lauta, player, ...valinnat,
    }),
    /**
     * Avauslennon kohtaus (ui.aloituslennonKohtaus →
     * js/pallolauta/avaus.js): rajaus, kaari ja kone. Lennon
     * koreografia — repliikki, kertoja, ohitus, saapumiskortti — on
     * js/ui.js:ssä yhtenä kappaleena kummallekin laudalle.
     */
    aloituslennonKohtaus: (tiedot) => luoAloituslennonKohtaus({ ui, lauta, ...tiedot }),
    /** Lennon niukkuus laudalla (js/pallolauta/avaus.js kutsuu). */
    lento: {
      aloita: aloitaLentotila,
      poistuma: lennonPoistuma,
      paata: paataLentotila,
      paalla: () => Boolean(lento),
    },
    /**
     * Lähtövalinnan näkymä: kamera omistajan kuvan rajaukseen
     * (ALOITUSVALINNAN_LAT/-_LON ja pallon koko ruudulla). js/ui.js
     * avaaPallolauta kutsuu tätä `kotiin`-ajon sijasta, kun peli on
     * vielä pickstart-vaiheessa.
     */
    aloitusnakyma,
    /**
     * Pyöriikö valintanäkymä juuri nyt (savukkeet ja vartijat).
     *
     * PALLO EI ENÄÄ PYÖRI VALINNASSA (omistaja 7.9.2026), joten tämä
     * on aina false. Kysymys jää rajapintaan, koska se on savukkeiden
     * vartio: jos automaattinen liike joskus palaa vahingossa, vastaus
     * muuttuu ja savuke huomaa sen.
     */
    aloitusvalinnanPyorinta: () => false,
    napautaKaupunki: (id) => napautaKaupunki(kaupunkiId.get(id)),
    napautaKohde: (key) => napautaKohde(merkit.kohteet().find((k) => k.key === key)),
    napautaNosto: (id) => napautaNosto(nostot.osumat().find((o) => o.id === id)),
    kaupunki: (id) => kaupunkiId.get(id) ?? null,
    paalla: () => !kuori.hidden,
    nayta: () => { kuori.hidden = false; mitoita(); noppaKuoreen(); tahdistaLepo(); },
    piilota: () => { kuori.hidden = true; noppaTakaisin(); tahdistaLepo(); },
    pura: () => {
      doc.body.classList.remove('pallolauta-paalla');
      // Valintanäkymän terävän tilan pakotus pois ENSIN: pakotus on
      // istunnon laskuri (js/pallo.js), eikä se saa jäädä päälle
      // puretun laudan jälkeen.
      paataAloitusvalinta();
      clearTimeout(lepoAjastin);
      clearTimeout(esilatausAjastin);
      clearTimeout(vakausAjastin);
      clearTimeout(osoitinAjastin);
      kangas?.removeEventListener('webglcontextlost', kontekstiKuoli);
      if (kosketuslaite) {
        document.removeEventListener('pointerdown', osoitinPaalle, true);
        kotelo.removeEventListener('pointerup', osoitinPois);
        kotelo.removeEventListener('pointercancel', osoitinPois);
      }
      document.removeEventListener('pointerdown', korttivahti, true);
      ohjaimet.removeEventListener('change', pyydaLadonta);
      ohjaimet.removeEventListener('change', tahdistaPisteidenKoko);
      // Omat pallopisteet ovat tämän laudan tilaa (ks. pallonAsteet).
      if (omatPisteet === laudanOmatPisteet) omatPisteet = new Map();
      valovahti.disconnect();
      if (ui.karttavaloLaskuri) delete ui.karttavaloLaskuri;
      kokovahti.disconnect();
      lehtivahti?.disconnect();
      document.removeEventListener('visibilitychange', tahdistaLepo);
      kamera.pysaytaKameraAjo();
      eleet.pura();
      litistaja.pura();
      merkit.pura();
      noppaTakaisin();
      lauta.linssit?.pura();
      vektorit?.pura();
      pallo._destructor?.();
      kuori.remove();
      lauta.linssikartta?.pura();
      if (ui.pallonInstanssi === pallo) ui.pallonInstanssi = null;
    },
  };
  /*
   * LINSSIKARTTA (vaihe 4, js/pallolauta/linssikartta.js): tasokartta
   * herää pallon päälle linssin ajaksi ja palaa tähän kuoreen, kun
   * linssi suljetaan. ui.avaaLinssikartta / ui.suljeLinssikartta
   * delegoivat tänne; kuori tuntee pallon kameran ja tämän kuoren.
   */
  lauta.linssikartta = luoLinssikartta({ ui, lauta });
  /*
   * LINSSIT PALLOLLE (karttapallo.md luku 10, aalto 1A; omistaja
   * 5.9.2026: *"Käännä kaikki pallolle, niin voidaan sulkea vanha kartta
   * kokonaan"*). Linssimoottori on laudan oma apuri: linssin
   * `pallolle(lauta, tila)` pyytää siltä kalvon, polut, polygonit tai
   * merkit eikä koske Globe.gl-instanssiin. Luodaan vasta tässä, koska
   * se tarvitsee valmiin lauta-olion (ruudulla, heraa).
   */
  lauta.linssit = luoLinssit({
    pallo, ui, lauta, merkit, reitit, siirtyma, kotelo,
  });
  // Instanssi talteen mittausta ja savukkeita varten (sama kenttä kuin
  // valikkopallolla).
  ui.pallonInstanssi = pallo;
  /*
   * MATKAKIRJA VASEMPAAN YLÄNURKKAAN MYÖS PALLOLLA (omistajan iPhone-
   * havainto 5.9.2026: *"Matkakirja on väärässä paikassa"*). Nurkan
   * asettaa tasokartalla Kartta.placeFactCard (omistaja 5.8.2026:
   * "Matkakirja saisi olla aina kartan yläreunassa"), mutta se ajetaan
   * vain fitViewBoxista, joka ei koskaan aja nukkuvalla kartalla —
   * pallolaudalla kortti jäi HTML:n oletusnurkkaan alas Kreetan ja
   * pöllön päälle. Sama päätös tehdään tässä, ja linssin selite väistää
   * sitä kuten kartalla.
   */
  if (ui.factCard) {
    ui.factCard.dataset.corner = 'tl';
    ui.sijoitaLinssiSelite?.();
  }
  omaLauta = lauta;
  paivita();
  tila.textContent = '';
  tila.hidden = true;
  return lauta;
}
