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
  pallonKaupungit, pallonLepokerros, pallonNostoOnPoltettu, rakennaPallo, webglTuettu,
} from '../pallo.js';
import { luoPallovektorit, pallovektoritPaalla } from '../pallovektorit.js';
import { asemoiFokuskohde } from '../fokuskohteet.js';
import { laudaltaAsteiksi } from '../fokusmitat.js';
import { packById } from '../pack.js';
import { pixelOf, posKey } from '../rules.js';
import {
  PALLON_TURVATILAN_UNOHDUS_MS, kehittajaMaailmaPaalla, kehittajaTilaPaalla,
  nollaaPallonKaatumiset, palloKaatui,
} from '../ui-apurit.js';
import { PALLOKAMERAN_AJO_MS, PALLO_KORKEUS_MAX, luoPallokamera } from './kamera.js';
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
import { liukuPehmennys, luoAloituslennonKohtaus } from './avaus.js';

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
/**
 * Kaupunkipisteen säde Globe.gl:n pointRadius-yksiköissä — karttavakio,
 * kasvaa lähennettäessä. Suunnitelma sanoi 0,12°, mutta kirjaston
 * yksikkö on mitatusti isompi kuin aste: 0,12 piirtyi saapumisnäkymässä
 * (leveys 240) ~50 px:n täplänä, 0,03 on ~12 px eli kartan
 * kaupunkipisteen kokoa (savuke-pallolauta, kaappaus pallolauta-sofia).
 */
export const KAUPUNKIPISTEEN_SADE = 0.03;
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
/**
 * LÄHTÖVALINNAN NÄKYMÄ (aalto 3A, ks. aloitusnakyma alempana):
 * marginaali laatikon ympärille ja ruudun alalaitaan jätettävä kaista,
 * jottei Livian kuplapino peitä valittavia kaupunkeja.
 *
 * MARGINAALI 0,8 → 0,12 (omistaja 5.9.2026 klo 00.30 työpöytäselaimesta
 * 2000 × 1300, sanatarkasti: *"kartan zoom taso heti aloituksessa
 * lähemmäksi"*). Kaksi syytä samaan lukuun: kameran kaava sai
 * kuvasuhteen (js/pallolauta/kamera.js), joten pyydetty leveys on nyt
 * ruudun leveys eikä 1,6-kertainen kaista, ja tilalle jäävä marginaali
 * mitoitettiin omistajan kuvan mukaan — Lontoo–Ateena-pari ja koko
 * Eurooppa Irlannista Mustallemerelle täyttävät ruudun (mitattu
 * Chromiumilla 4 377 km ruudun leveydellä 2000 × 1300, ennen 13 143 km;
 * 1400 × 900 4 592 km ja 390 × 844 3 418 km).
 */
export const ALOITUSVALINNAN_MARGINAALI = 0.12;
/**
 * KUPLAVARA ON PIKSELEITÄ, EI OSUUS RUUDUSTA. Livian kuplapino on
 * TEKSTIÄ ruudun oikeassa alanurkassa: mitattuna kolme kuplaa vievät
 * 336 × 129 px (2000 × 1300) ja 336 × 180 px (390 × 844) riippumatta
 * ruudun koosta, joten osuutena (ennen 0,34 ruudun korkeudesta) vara
 * oli työpöydällä moninkertainen tarpeeseen nähden ja söi juuri sen
 * zoomin, jota omistaja pyysi.
 *
 * SIIRTO ON VINO, koska kuplat ovat NURKASSA: sisältö nousee ja siirtyy
 * vasemmalle puolella kuplakaistasta — kumpaankin suuntaan enintään
 * neljänneksen siitä ilmasta, joka laatikon ja ruudun reunan väliin jää
 * (muuten Lontoo nousisi yläreunan yli tai valuisi vasemmalle ulos).
 * Puhelimella vaakasiirto jää siksi itsestään nollaan: siellä laatikon
 * leveys sitoo rajauksen eikä ilmaa ole.
 */
export const ALOITUSVALINNAN_KUPLAVARA_PX = 190;
export const ALOITUSVALINNAN_KUPLALEVEYS_PX = 336;
/**
 * PALLO PYÖRII HITAASTI VALINTANÄKYMÄSSÄ (omistaja 5.9.2026 klo 00.30:
 * *"karttapallo saisi pyöriä hitaast täydessä terävyydessä"*). Kamera
 * liukuu itään tämän verran sekunnissa. Terävä tila (js/pallo.js
 * pakotaPallonLaatu) on pakotettuna päällä koko valinnan ajan, joten
 * laatat eivät pudota tasoa liikkeessä. Reduced motion: ei pyörintää.
 *
 * 0,4 → 0,16 °/s (omistaja 6.9.2026 aamupäivä: *"Kohdemaan valinnassa
 * hitaampi pallon liike"*). PERUSTELU LUVULLE ON RUUDUN MITTA EIKÄ
 * MAKU. Valintanäkymä on mitattuna (Chromium 6.9.2026) 1 200
 * lautayksikköä eli 36,0° työpöydällä (1280 × 800) ja 986 yksikköä eli
 * 29,6° puhelimella (390 × 844) — yksi pituusaste on siis 36 ja 13
 * ruutupikseliä. 0,4 °/s liikutti kuvaa 14 px/s työpöydällä ja
 * 5 px/s puhelimella, ja se luki silmässä *liikkeenä*, jota katse
 * joutui seuraamaan; 0,16 °/s on 5,7 ja 2,1 px/s — pallo on
 * pikemminkin *elossa* kuin liikkeessä. Täysi kierros kestää
 * 37 minuuttia, joten valinta ei karkaa kuvasta odottaessakaan.
 */
export const ALOITUKSEN_PYORINTA_AST_S = 0.16;
/** Pysähtymisen kesto (ms), kun pelaaja koskee palloon: pehmeä ease-out. */
export const ALOITUKSEN_PYSAYTYS_MS = 900;
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

/** Pisteen väri: käyty kultaa, aloituskaupunki vaaleaa, muut mustetta. */
export function kaupunkipisteenVari(kaupunki) {
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

/** Laudan kohta (x, y) asteiksi ({ lat, lon }) — yksi totuus on lauta. */
export function pallonAsteet(kohta) {
  if (!kohta || !Number.isFinite(kohta.x) || !Number.isFinite(kohta.y)) return null;
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
  const edessa = (lat, lng) => {
    const p = pallo.getCoords(lat, lng, 0);
    const k = pallo.camera().position;
    return (k.x - p.x) * p.x + (k.y - p.y) * p.y + (k.z - p.z) * p.z > 0;
  };
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
  const merkit = luoMerkit({
    pallo, ui, siirtyma, asteet: pallonAsteet, kotelo,
  });
  const reitit = luoReitit({ pallo, ui, siirtyma, asteet: pallonAsteet });
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
    return { key: `aloitus:${city.id}`, x: k.x, y: k.y, city };
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
   * VALINTANÄKYMÄN RAJAUS: Lontoo ja valittavat kaupungit samassa
   * laatikossa — pallon vastine tasokartan aloituskartalle.
   *
   * KAMERA TÄHTÄÄ LAATIKON ALAPUOLELLE. Livian avausrepliikit
   * pinoutuvat ruudun alalaitaan (js/livia.js, js/pollo.js), ja
   * keskitettynä Ateena jäi täsmälleen kuplapinon alle (mitattu
   * Chromiumilla 390 × 844, kaappaus 3a-2-valintatila). Siksi
   * keskipiste siirretään etelään: sisältö nousee ruudulla kuplien
   * yläpuolelle. Omistajan sääntö on sama molemmilla laudoilla —
   * *"kuplat eivät estä valintaa"* (29.8.2026). Vara on PIKSELEITÄ
   * (ALOITUSVALINNAN_KUPLAVARA_PX ja -_KUPLALEVEYS_PX), koska kupla on
   * tekstiä eikä osuus ruudusta, ja siirto on VINO — kuplat ovat
   * nurkassa, joten sisältö nousee ja siirtyy vasemmalle. Kumpikin
   * rajataan neljännekseen laatikon ja reunan välistä, jottei Lontoo
   * nouse yläreunan yli eikä valu vasemmalle ulos.
   *
   * ZOOM LÄHEMMÄS (omistaja 5.9.2026 klo 00.30, ks.
   * ALOITUSVALINNAN_MARGINAALI): marginaali on nyt lennon rajausta
   * tiukempi (0,35 → 0,12) ja kameran kaava tuntee kuvasuhteen, joten
   * pyydetty leveys on todella se, mikä ruudulla näkyy.
   */
  const aloitusnakyma = ({ kesto = 0 } = {}) => {
    const nakyvat = aloitusNakyvat();
    const pisteet = [...(nakyvat ?? [])].map((id) => packKaupunki.get(id)).filter(Boolean);
    if (pisteet.length < 2) return Promise.resolve(false);
    const xs = pisteet.map((c) => c.x);
    const ys = pisteet.map((c) => c.y);
    const x0 = Math.min(...xs);
    const y0 = Math.min(...ys);
    const w = Math.max(...xs) - x0;
    const h = Math.max(...ys) - y0;
    const ruutuW = Math.max(1, kotelo.clientWidth);
    const ruutuH = Math.max(1, kotelo.clientHeight);
    // Sama kaava kuin kameran bbox-haarassa (js/pallolauta/kamera.js
    // kameranKohde), mutta näkyvä leveys tarvitaan tässä myös siirtoon.
    const vara = 1 + 2 * ALOITUSVALINNAN_MARGINAALI;
    const leveys = Math.max(w * vara, (h * vara * ruutuW) / ruutuH);
    const korkeus = (leveys * ruutuH) / ruutuW;
    // Kuplavara pikseleistä lautayksiköiksi kumpaankin suuntaan;
    // enintään neljännes siitä ilmasta, joka laatikon ja reunan väliin
    // jää. Etelään + itään = sisältö nousee ja siirtyy vasemmalle,
    // poispäin kuplien nurkasta.
    const kuplavaraY = (ALOITUSVALINNAN_KUPLAVARA_PX / 2) * (korkeus / ruutuH);
    const kuplavaraX = (ALOITUSVALINNAN_KUPLALEVEYS_PX / 2) * (leveys / ruutuW);
    const siirtoY = Math.min(kuplavaraY, Math.max(0, (korkeus - h) / 4));
    const siirtoX = Math.min(kuplavaraX, Math.max(0, (leveys - w) / 4));
    // Terävä tila päälle heti: valinnassa pallo pyörii, eikä liike saa
    // pudottaa laattatasoa (omistaja: *"täydessä terävyydessä"*).
    pyydaAloituksenLaatu();
    const ajo = kamera.ajaKamera({ x: x0 + w / 2 + siirtoX, y: y0 + h / 2 + siirtoY, leveys }, { kesto });
    void ajo.then((valmis) => { if (valmis) aloitaAloituksenPyorinta(); });
    return ajo;
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * PALLO PYÖRII HITAASTI VALINTANÄKYMÄSSÄ (omistaja 5.9.2026 klo 00.30
   * työpöytäselaimesta: *"karttapallo saisi pyöriä hitaast täydessä
   * terävyydessä"*)
   * ══════════════════════════════════════════════════════════════════
   *
   * Pyörintä on OMA rAF-silmukkansa eikä kamera-ajo: ajo on matka
   * pisteestä toiseen (kesto ja pehmennys), tämä on tasainen liuku, joka
   * jatkuu kunnes valinta tehdään. Kierto luetaan ja kirjoitetaan
   * pointOfView'lla kehys kerrallaan SEINÄKELLOSTA (astetta sekunnissa),
   * joten hidas kehysväli ei hidasta pyörintää — ja koska nykyinen kohta
   * luetaan joka kehyksellä, pelaajan oma veto ja nipistys jäävät
   * voimaan (kirjaston OrbitControls kirjoittaa saman kameran).
   *
   * KOLME PYSÄYTINTÄ. (1) Sormi tai rulla koteloon → PEHMEÄ hidastus
   * (ALOITUKSEN_PYSAYTYS_MS, sama pehmennys kuin avauslennon zoomilla,
   * js/pallolauta/avaus.js liukuPehmennys) — ei nykäisyä. (2) Toinen
   * kamera-ajo omistaa kuvan (kaupungin napautus, avauslento) → seis
   * heti samassa kehyksessä,
   * jotta kaksi kirjoittajaa eivät kamppaile. (3) Vaihe vaihtuu tai
   * lauta menee piiloon → seis ja terävän tilan pakotus pois.
   *
   * NAPAUTUS EI KÄRSI: merkit ja nimet ovat kirjaston CSS2D-pisteitä,
   * jotka seuraavat pintaa itsestään, ja osuma lasketaan napautuksen
   * hetkellä ruudulta (R-malli), joten pyörivä pallo on yhtä
   * napautettava kuin paikallaan oleva.
   */
  let pyorinta = null;
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
  const seisAloituksenPyorinta = () => {
    if (!pyorinta) return;
    cancelAnimationFrame(pyorinta.kehys);
    pyorinta = null;
  };
  /** Valinta ohi: pyörintä seis ja terävän tilan pakotus pois. */
  const paataAloitusvalinta = () => {
    seisAloituksenPyorinta();
    vapautaAloituksenLaatu();
  };
  /** Pehmeä pysähdys (ease-out) — pelaaja koski palloon. */
  const hidastaAloituksenPyorinta = () => {
    if (pyorinta && !pyorinta.hidastus) pyorinta.hidastus = performance.now();
  };
  const aloitaAloituksenPyorinta = () => {
    if (pyorinta || ui.dead || ui.reducedMotion) return false;
    if (ui.game.phase !== 'pickstart' || kuori.hidden) return false;
    const oma = { kehys: 0, hidastus: 0, edellinen: performance.now() };
    pyorinta = oma;
    const askel = (hetki) => {
      if (pyorinta !== oma) return;
      // Kehysväli katkaistaan: taustavälilehdestä palaava ruutu ei saa
      // hypäyttää palloa sekuntien verran kerralla.
      const dt = Math.min(100, Math.max(0, hetki - oma.edellinen));
      oma.edellinen = hetki;
      if (ui.dead || ui.game.phase !== 'pickstart' || kuori.hidden) { paataAloitusvalinta(); return; }
      if (kamera.kameraAjossa()) { seisAloituksenPyorinta(); return; }
      let kerroin = 1;
      if (oma.hidastus) {
        const t = Math.min(1, (hetki - oma.hidastus) / ALOITUKSEN_PYSAYTYS_MS);
        if (t >= 1) { seisAloituksenPyorinta(); return; }
        kerroin = 1 - liukuPehmennys(t);
      }
      const pov = pallo.pointOfView();
      if (pov) {
        pallo.pointOfView({
          lat: pov.lat,
          lng: pov.lng + ALOITUKSEN_PYORINTA_AST_S * kerroin * (dt / 1000),
          altitude: pov.altitude,
        }, 0);
      }
      oma.kehys = requestAnimationFrame(askel);
    };
    heraa();
    oma.kehys = requestAnimationFrame(askel);
    return true;
  };
  kotelo.addEventListener('pointerdown', hidastaAloituksenPyorinta);
  kotelo.addEventListener('wheel', hidastaAloituksenPyorinta, { passive: true, capture: true });

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
    if (ui.game.pack?.id === pack?.id) return ui.game.board ? pixelOf(ui.game.board, pos) : null;
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

  /** Lähin merkki ruudulla napautuskohdasta (R-osuma, ≥ 44 px). */
  const lahin = (lat, lng, ehdokkaat, latOf, lngOf) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    let paras = null;
    let parasMatka = NAPAUTUKSEN_SADE_PX;
    for (const e of ehdokkaat) {
      const p = pallo.getScreenCoords(latOf(e), lngOf(e), 0);
      if (!p) continue;
      const d = Math.hypot(p.x - kohta.x, p.y - kohta.y);
      if (d < parasMatka) { parasMatka = d; paras = e; }
    }
    return paras;
  };
  const lahinKohde = (lat, lng) => lahin(lat, lng, merkit.kohteet(), (k) => k.lat, (k) => k.lng);
  /**
   * Kaupungit ja nostot SAMASSA kilpailussa (js/fokusniput.js sääntö 9:
   * lähin keskipiste voittaa) — vain näkyvät: nimetty kaupunki, oma
   * kaupunki, ruudulla oleva nosto, eläintäky tai kohtaamispiste.
   */
  const lahinMerkki = (lat, lng) => {
    const ehdokkaat = [];
    for (const k of kaupungit) {
      if (pisteNakyy(k)) ehdokkaat.push({ laji: 'kaupunki', lat: k.lat, lng: k.lon, k });
    }
    for (const o of nostot.osumat()) ehdokkaat.push({ laji: 'nosto', lat: o.lat, lng: o.lng, o });
    return lahin(lat, lng, ehdokkaat, (e) => e.lat, (e) => e.lng);
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
      return KAUPUNKIPISTEEN_SADE;
    })
    .pointResolution(16)
    .pointsMerge(false)
    .pointsTransitionDuration(siirtyma)
    .onPointClick((d) => {
      if (eleet.sormet.nipistys) return;
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
   * Nostot ensin (niiden laatikot ovat nimien varauksia), nimet sitten
   * budjetilla, joka jää pelin merkkien ja nostojen jälkeen; lopuksi
   * pisteet nimettyjen mukaan ja auki oleva kortti ankkurinsa perään.
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
    paivitaPisteet();
    if (ui.fokuskohdeAuki?.ankkuri) asemoiFokuskohde(ui);
    return { nostot: nostoTulos, nimet: nimiTulos };
  };
  const pyydaLadonta = () => {
    clearTimeout(lepoAjastin);
    lepoAjastin = setTimeout(ladoLevossa, LADONNAN_LEPOVIIVE_MS);
  };
  // Kamera liikkui (ele, ajo, liuku): ladonta vasta levossa.
  const ohjaimet = pallo.controls();
  ohjaimet.addEventListener('change', pyydaLadonta);
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
    return (game.moveOptions?.() ?? []).map((opt) => {
      const { x, y } = pixelOf(game.board, opt.pos);
      return { key: opt.key, x, y, city: opt.city ?? null };
    });
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
     * Lähtövalinnan näkymä (aalto 3A): kamera Lontoon ja valittavien
     * kaupunkien laatikkoon. js/ui.js avaaPallolauta kutsuu tätä
     * `kotiin`-ajon sijasta, kun peli on vielä pickstart-vaiheessa.
     */
    aloitusnakyma,
    /** Pyöriikö valintanäkymä juuri nyt (savukkeet ja vartijat). */
    aloitusvalinnanPyorinta: () => Boolean(pyorinta),
    napautaKaupunki: (id) => napautaKaupunki(kaupunkiId.get(id)),
    napautaKohde: (key) => napautaKohde(merkit.kohteet().find((k) => k.key === key)),
    napautaNosto: (id) => napautaNosto(nostot.osumat().find((o) => o.id === id)),
    kaupunki: (id) => kaupunkiId.get(id) ?? null,
    paalla: () => !kuori.hidden,
    nayta: () => { kuori.hidden = false; mitoita(); noppaKuoreen(); tahdistaLepo(); },
    piilota: () => { kuori.hidden = true; noppaTakaisin(); tahdistaLepo(); },
    pura: () => {
      doc.body.classList.remove('pallolauta-paalla');
      // Valintanäkymän pyörintä ja terävän tilan pakotus pois ENSIN:
      // pakotus on istunnon laskuri (js/pallo.js), eikä se saa jäädä
      // päälle puretun laudan jälkeen.
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
