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
  pallonOmatPisteet, pallonPiste, rakennaPallo, webglTuettu,
} from '../pallo.js';
import { luoPallovektorit, pallovektoritPaalla } from '../pallovektorit.js';
import {
  lataaMaapolygonit, maanLautalaatikko, nollaaPallonMaakorostus, paivitaPallonMaakorostus,
} from '../maanaariviivat.js';
// Tarkistusapu: kaupungit, joiden uusi pulukulku on kuunneltavissa.
import { livianKorostetutKaupungit } from '../liviapuhe.js';
import { asemoiFokuskohde, kohteidenNykyinenIso } from '../fokuskohteet.js';
import { laudaltaAsteiksi, nollaaFokusmitat, paivitaFokusmitat } from '../fokusmitat.js';
import { packById } from '../pack.js';
import { pixelOf, pointAlong, posKey } from '../rules.js';
import {
  PALLON_TURVATILAN_UNOHDUS_MS, kehittajaMaailmaPaalla, kehittajaTilaPaalla,
  nollaaPallonKaatumiset, palloKaatui, valikkoSulkeutuiNapautuksesta,
} from '../ui-apurit.js';
import { KARTTANIMI_KOOT } from '../karttanimet.js';
import { NOSTOLADONTA_POLTON_TIHEYS } from '../nostoladonta.js';
import { LEHDEN_VAHIN_OSUUS } from '../fokuskohteet.js';
import {
  PALLOKAMERAN_AJO_MS, PALLO_FOV, PALLO_KORKEUS_MAX, PALLON_SALLITTU_VENYTYS,
  laattojenVenytys, luoPallokamera,
} from './kamera.js';
import { MERKIN_KORKEUS, luoMerkit } from './merkit.js';
import { NIMIEN_KATTO, luoNimet } from './nimet.js';
import {
  KOHDEMERKIN_RUUTU_PX, NOSTOJEN_KATTO, VALON_KORKEUS, VALON_SADE, luoNostot,
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
 *
 * AVARUUS 7.9.2026 (Raamattu "IHMISEN MATKA: MUSTA ALKU ON AVARUUS,
 * PALLO ZOOMAUTUU PIMEYDESTA AFRIKKA EDELLA"): hiukkaset
 * (particlesData) tulivat listalle tähtitaivasta varten
 * (js/pallolauta/tahdet.js). Se ei ole kartta EIKÄ pinnoitteen päällä:
 * pisteet ovat pallon YLÄPUOLELLA, korkeudella 2,6–6,5 pallonsädettä,
 * eli kaukana avaruudessa. Kerros elää vain kertomusesityksen avauksen
 * ajan ja tyhjennetään heti sen jälkeen.
 */
export const PALLOLAUDAN_KERROKSET = [
  'pointsData', 'htmlElementsData', 'pathsData', 'arcsData', 'polygonsData', 'particlesData',
];
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
/*
 * ══════════════════════════════════════════════════════════════════
 * KOHDEKAUPUNKI ON SELVÄSTI SUUREMPI KUIN KOHDEMERKIT (omistaja
 * 8.9.2026, iPad-kaappaus Riiasta)
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA, SANATARKASTI: *"Miksi kohdekaupunki näkyy noin pienenä
 * pallona? Se saisi olla selvästi suurempi."* Ja saman päivän lisäys
 * klo 15.45: *"tee samoin myös kohdekaupungin tekstille joka jää
 * lähellä liian pieneksi."*
 *
 * ── MIKÄ VIKA OLI, MITATTUNA ──────────────────────────────────────
 *
 * Kaappauksessa (Riika, iPad 834 x 1210 css, dpr 2) RIIKA oli pieni
 * keltainen täplä ja sen ympärillä olevat karttanostot selvästi
 * suurempia palloja. Mitattuna omistajan kuvasta pikselitasolla:
 *
 *     kaupunkipiste (RIIKA)      14 laitepikseliä =  7,0 css-px
 *     kohdemerkki (Alberta iela) 22 laitepikseliä = 11,0 css-px
 *     kohteen nimi (poltettu)    33 laitepikseliä = 16,4 css-px
 *     kaupungin nimi (elävä)     27 laitepikseliä = 13,5 css-px
 *
 * Kaksi eri juurisyytä samassa kuvassa:
 *
 *   1. PISTE ON PIENEMPI KUIN KOHDEMERKKI JOKA ZOOMILLA. 7 px valittiin
 *      7.9.2026 yleisnäkymän ehdolla (*"Tampereen kohdalla iso musta
 *      ympyrä"*) eikä sitä koskaan verrattu kohdemerkkiin, joka on
 *      ruutuvakiona 11,44 px (KOHDEMERKIN_RUUTU_PX). Kaupunki — se,
 *      johon matkustetaan — oli siis kartan PIENIN merkki.
 *   2. NIMI EI SEURAA POLTETTUA MUSTETTA LÄHIKUVASSA. Kaupungin nimi
 *      on paperivakio (13,5 css-px, js/karttanimet.js KOKO.kaupunki),
 *      mutta kohteiden nimet ovat laatoissa POLTETTUINA: kun kamera
 *      menee syvimmän laattatason (z8) sisään, laattaa venytetään
 *      (js/pallolauta/kamera.js laattojenVenytys, iPadilla lähimmässä
 *      näkymässä 1,93x) ja poltettu 8,5 px:n nimiö on ruudulla 16,4 px.
 *      Maanäkymässä suhde on tilattu 13,5 : 8,5, lähikuvassa se oli
 *      kääntynyt ympäri.
 *
 * ── SÄÄNTÖ: LATTIA, EI UUTTA VAKIOTA ──────────────────────────────
 *
 * Kaupungin piste ja nimi saavat LATTIAN, joka mitataan siitä, mitä
 * kartalla juuri nyt on:
 *
 *     piste >= KOHDEKAUPUNGIN_PISTE_SUHDE x kohdemerkin halkaisija
 *     nimi  >= KOHDEKAUPUNGIN_NIMI_SUHDE  x kohdenimiön ruutukoko
 *
 * LATTIA EI KOSKAAN PIENENNÄ MITÄÄN (Math.max): yleisnäkymässä piste
 * on tavulleen entinen 7 px ja nimi entinen 13,5 px.
 *
 * PISTEEN LATTIA KOSKEE VAIN LÄHIKUVAA, jossa kohdemerkkejä oikeasti
 * on. Portti on sama luku kuin merkeillä itsellään (js/pallolauta/
 * nostot.js lehdenOsuus >= LEHDEN_VAHIN_OSUUS) — vertailua ei ole
 * olemassa siellä, missä verrattavaa ei ole, eikä yleisnäkymän 7 px
 * siis muutu pikseliäkään (omistajan 7.9. korjaus säilyy). Liu'utus
 * KOHDEKAUPUNGIN_TAYSI_OSUUS:een asti tekee muutoksesta jatkuvan:
 * piste kasvaa portin auetessa asteittain eikä hyppää.
 *
 * ── KORJAUS 8.9.2026 ILLALLA: LATTIA ON YHDEN PISTEEN SÄÄNTÖ ──────
 *
 * OMISTAJA, SANATARKASTI (Mac, koko Eurooppa ruudulla, Fogg Kiovassa):
 * *"tällä zoom tasolla kaupunki pallot jäävät liian isoiksi"*.
 *
 * Ensimmäinen toteutus laski lattian kerran näkymästä ja kirjoitti
 * SAMAN säteen kaikille 261 pisteelle (pisteenSade,
 * tahdistaPisteidenKoko). Portti on maan lehden osuus näkymästä, ja
 * Ukrainan levyinen lehti täyttää puolet ruudusta jo koko Euroopan
 * zoomilla: mitattu omistajan näkymästä (Chromium 1419 × 821 css,
 * korkeus 0,42) lehdenOsuus 0,82 — siis yli KOHDEKAUPUNGIN_TAYSI_OSUUS,
 * ja JOKAINEN kaupunki oli kasvanut lattiaansa 17,2 pikseliin. Omistajan
 * kuvasta mitattu 14 laitepikseliä = 7,0 css-px on se, mitä muiden
 * kaupunkien piti olla.
 *
 * SÄÄNTÖ ON PISTEKOHTAINEN. Lattia koskee VAIN pelaajan nykyistä
 * kaupunkia (ui.game.cityOf) — sitä yhtä, jonka lehteä kartalla juuri
 * nyt luetaan ja jonka kohdemerkkejä vasten mitta otetaan. Kaikki muut
 * kaupungit ovat KAUPUNKIPISTEEN_HALKAISIJA_PX joka zoomilla, myös
 * osuudella 1. Mitta lasketaan yhä kerran näkymästä (välimuisti
 * kaupunkiAvain), mutta se luetaan pisteelle vasta, kun piste ON se
 * kaupunki; kun pelaaja siirtyy, vanhan kaupungin piste palaa 7 px:ään
 * ja uusi kasvaa (avaimessa on pelaajan kaupunki).
 *
 * PORTTI ON MYÖS PELITILAN PORTTI. Lattia ei ala ennen kuin
 * kohdemerkkejä oikeasti piirretään: nostot.lehdenOsuus palauttaa 0
 * niissä tiloissa, joissa keräys ei tuota yhtään merkkiä (katselutila,
 * lähtövalinta, avauslento, siirto kesken) — sama ehto kuin nostot.js:n
 * lehtiNakyy. Yleisnäkymän 7 px ja lähikuvan lattia eivät muutu.
 *
 * NIMEN LATTIA EI TARVITSE PORTTIA. Se puree vasta kun poltettu muste
 * on venytettyä (suurennus > 1,59), eli täsmälleen siinä lähikuvassa,
 * josta omistaja kirjoitti; kaukonäkymässä kerroin on 1.
 *
 * OSUMA-ALUEET EIVÄT MUUTU: napautus on 44 px:n säde ruudulla
 * (NAPAUTUKSEN_SADE_PX) eikä se ole koskaan lukenut pisteen kokoa.
 * NAPPULA EI OLE SIDOTTU PISTEESEEN pallolla (se on oma H-merkkinsä,
 * js/pallolauta/merkit.js), joten sen koko ei muutu; 17,2 px:n piste
 * jää yhä nappulan (32 px) alle, mutta reunaa jää nyt näkyviin — sama
 * suhde kuin tasokartan laatalla, jonka alta omistaja halusi laatan
 * näkyvän (js/ui.js FOKUS_NAPPULA_PX).
 */
/*
 * ══════════════════════════════════════════════════════════════════
 * LÄHIZOOMISSA JOKAINEN PELIKAUPUNKI EROTTUU KOHDEPISTEISTÄ
 * (omistaja 9.9.2026, työpöytäkaappaus Euroopan lähizoomista)
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA, SANATARKASTI: *"kohdekaupunkien pisteet saisivat puolestaan
 * tässä zoom tasossa olla isommalla, nyt niitä ei erota muista
 * palloista."* Kaappauksessa näkyvät pelikaupungit isoilla
 * kapiteelinimillä (WIEN, BUDAPEST, VENETSIA, SARAJEVO, SOFIA,
 * BUKAREST, ISTANBUL) ja niiden ympärillä sadat fokuskohteiden pisteet
 * kursiivinimineen (Hallstatt, Melk, Pécs). Kaupunkipiste oli 7 px ja
 * kohdemerkki 11,44 px (KOHDEMERKIN_RUUTU_PX): kaupunki oli yhä kartan
 * pienin merkki — 8.9. korjaus nosti vain PELAAJAN oman kaupungin.
 *
 * ── MIKÄ ZOOMI ON "LÄHIZOOMI" — MITTAKAAVA, EI LEHDEN OSUUS ───────
 *
 * 8.9. illan sääntö (LATTIA ON YHDEN PISTEEN SÄÄNTÖ) syntyi siitä,
 * että lattian portti oli `nostot.lehdenOsuus`: maan lehden leveys
 * näkymästä. Se ei kerro zoomia lainkaan — Ukrainan levyinen lehti
 * täyttää puolet ruudusta jo koko Euroopan zoomilla, ja juuri siksi
 * omistaja näki 8.9. jokaisen pisteen 17,2 pikselinä liian kaukaa.
 * Sama portti tekisi saman virheen uudestaan.
 *
 * Mitta on siksi KAMERAN OMA MITTAKAAVA (kamera.nakyvaAlue().skaala =
 * ruudun pikseliä yhtä lautayksikköä kohden). Mitattu Chromiumilla
 * 1419 x 821 css (kotelo 1398 x 742), sama ruutu kuin omistajalla:
 *
 *     korkeus 0,42  skaala 0,99   koko Eurooppa   (8.9. "liian isoja")
 *     korkeus 0,30  skaala 1,39
 *     korkeus 0,22  skaala 1,89   Venetsia-Istanbul (9.9. kaappaus)
 *     korkeus 0,16  skaala 2,60
 *
 * Liuku alkaa 8.9. näkymän YLÄPUOLELTA (LAHIZOOMIN_SKAALA_ALKU 1,2) ja
 * on täydessä mitassaan omistajan 9.9. näkymässä (…_TAYSI 1,8), joten
 * 8.9. korjaus säilyy tavulleen: koko Euroopan zoomilla muut kuin
 * pelaajan kaupunki ovat yhä 7 px. Liuku on jatkuva — piste kasvaa
 * pehmeästi eikä hyppää missään kohdassa.
 *
 * ── TAVOITEKOKO: KAKSI KOHDEPISTETTÄ ──────────────────────────────
 *
 * *"nyt niitä ei erota muista palloista"* on erotettavuuden vaatimus,
 * ja se mitataan siitä, mihin kaupunki sekoittui: kohdemerkkiin.
 * Täysi lähizoomikoko on LAHIZOOMIN_PISTE_SUHDE x KOHDEMERKIN_RUUTU_PX
 * = 22,87 px eli kaksi kohdepisteen halkaisijaa. Nappula on 32 px, joten
 * piste jää yhä sen alle.
 *
 * PELAAJAN KAUPUNGIN LATTIA ON ENNALLAAN (8.9.): se lasketaan yhä
 * lehden osuudesta, ja pelaajan piste on näiden kahden SUUREMPI — se ei
 * siis pienene mistään, eikä 8.9. mitattu 17,2 px muutu siellä, missä
 * lähizoomiliuku on vielä nolla.
 */
/** Piste lähikuvassa vähintään tämän verran kohdemerkin halkaisijasta. */
export const KOHDEKAUPUNGIN_PISTE_SUHDE = 1.5;
/** Lähizoomissa jokainen pelikaupunki on tämän verran kohdemerkistä. */
export const LAHIZOOMIN_PISTE_SUHDE = 2;
/** Mittakaava (px / lautayksikkö), jossa lähizoomin kasvu alkaa. */
export const LAHIZOOMIN_SKAALA_ALKU = 1.2;
/** Mittakaava, jossa lähizoomin koko on täysi. */
export const LAHIZOOMIN_SKAALA_TAYSI = 1.8;
/**
 * Lähizoomiliu'un asento 0…1 kameran mittakaavasta (ks. lohko yllä).
 * Jatkuva ja kasvava: ei hyppyä missään zoomin kohdassa.
 *
 * @param {number} skaala ruudun pikseliä lautayksikköä kohden
 */
export function lahizoominOsuus(skaala) {
  if (!(skaala > 0)) return 0;
  const vali = LAHIZOOMIN_SKAALA_TAYSI - LAHIZOOMIN_SKAALA_ALKU;
  if (!(vali > 0)) return Number(skaala >= LAHIZOOMIN_SKAALA_TAYSI);
  return Math.min(1, Math.max(0, (skaala - LAHIZOOMIN_SKAALA_ALKU) / vali));
}
/** Nimi vähintään tämän verran kohdenimiön ruutukoosta. */
export const KOHDEKAUPUNGIN_NIMI_SUHDE = 1.3;
/**
 * Osuus, jolla pisteen lattia on täydessä mitassaan. Portti aukeaa
 * LEHDEN_VAHIN_OSUUS:ssa (0,5) ja tämä on liu'un yläpää: siihen asti
 * piste kasvaa 7 pikselistä lattiaansa, eikä koko hyppää portilla.
 */
export const KOHDEKAUPUNGIN_TAYSI_OSUUS = 0.75;
/**
 * POLTETUN MUSTEEN SUURENNUS RUUDULLA — montako kertaa suurempana
 * laattaan poltettu merkintä näkyy kuin se poltettiin.
 *
 * Poltto olettaa dpr 2:n (js/nostoladonta.js NOSTOLADONTA_POLTON_TIHEYS),
 * joten poltettu 8,5 css-px:n nimiö on laatassa 17 pikseliä korkea.
 * `laattojenVenytys` kertoo, montako LAITEpikseliä on yksi laatan
 * pikseli, joten ruudulla nimiö on 17 x venytys laitepikseliä eli
 * 8,5 x venytys x 2 / dpr css-pikseliä — ja juuri se kerroin on tässä.
 *
 * Tarkistettu omistajan kaappauksesta: iPad 834 css, dpr 2, lähin
 * näkymä → venytys 1,93 (tests/pallo.test.mjs) → suurennus 1,93 →
 * poltettu nimiö 16,4 css-px. Mitattu kuvasta 16,4.
 *
 * KATTO ON LAATTOJEN OMA SALLITTU VENYTYS (PALLON_SALLITTU_VENYTYS):
 * sitä syvemmällä laatta on jo pelkkää sumua, eikä kaupungin merkin
 * pidä kasvaa sumun mukana rajatta. Lattia on 1 — suurennus ei koskaan
 * pienennä mitään.
 */
export function poltetunMusteenSuurennus({
  leveysPx, dpr = 1, leveysYks, katto = PALLON_SALLITTU_VENYTYS,
} = {}) {
  if (!(leveysPx > 0) || !(leveysYks > 0)) return 1;
  const venytys = laattojenVenytys({ leveysPx, dpr, leveysYks });
  const suurennus = venytys * (NOSTOLADONTA_POLTON_TIHEYS / Math.max(1, dpr));
  return Math.min(katto, Math.max(1, suurennus));
}
/**
 * KOHDEKAUPUNGIN MITAT RUUDULLA: pisteen halkaisija ja nimen kerroin.
 *
 * @param {number} osuus     maan lehden osuus näkymästä (nostot.js
 *   lehdenOsuus) — portti ja liuku, ks. lohko yllä
 * @param {number} suurennus poltetun musteen suurennus
 *   (poltetunMusteenSuurennus)
 * @param {number} skaala    kameran mittakaava (px / lautayksikkö,
 *   kamera.nakyvaAlue().skaala) — lähizoomiliuku, ks. LÄHIZOOMISSA
 *   JOKAINEN PELIKAUPUNKI EROTTUU
 * @returns {{halkaisijaPx: number, lahiHalkaisijaPx: number,
 *   nimiKerroin: number}} halkaisijaPx on PELAAJAN kaupungin piste,
 *   lahiHalkaisijaPx jokaisen muun
 */
export function kohdekaupunginMitat({ osuus = 0, suurennus = 1, skaala = 0 } = {}) {
  const vali = KOHDEKAUPUNGIN_TAYSI_OSUUS - LEHDEN_VAHIN_OSUUS;
  const lahella = vali > 0
    ? Math.min(1, Math.max(0, (osuus - LEHDEN_VAHIN_OSUUS) / vali))
    : Number(osuus >= LEHDEN_VAHIN_OSUUS);
  const lattia = KOHDEKAUPUNGIN_PISTE_SUHDE * KOHDEMERKIN_RUUTU_PX;
  const omanLattia = KAUPUNKIPISTEEN_HALKAISIJA_PX
    + lahella * Math.max(0, lattia - KAUPUNKIPISTEEN_HALKAISIJA_PX);
  // Lähizoomi koskee JOKAISTA pelikaupunkia (omistaja 9.9.2026).
  const lahizoomi = LAHIZOOMIN_PISTE_SUHDE * KOHDEMERKIN_RUUTU_PX;
  const lahiHalkaisijaPx = KAUPUNKIPISTEEN_HALKAISIJA_PX
    + lahizoominOsuus(skaala) * Math.max(0, lahizoomi - KAUPUNKIPISTEEN_HALKAISIJA_PX);
  // Pelaajan piste on näiden kahden suurempi: kumpikaan ei pienennä.
  const halkaisijaPx = Math.max(omanLattia, lahiHalkaisijaPx);
  const nimiLattia = KOHDEKAUPUNGIN_NIMI_SUHDE * KARTTANIMI_KOOT.kohde
    * Math.max(1, suurennus);
  const nimiKerroin = Math.max(1, nimiLattia / KARTTANIMI_KOOT.kaupunki);
  return { halkaisijaPx, lahiHalkaisijaPx, nimiKerroin };
}
/**
 * YHDEN pisteen ruutuhalkaisija. Lehden osuudesta laskettu lattia
 * koskee vain pelaajan omaa kaupunkia (LATTIA ON YHDEN PISTEEN SÄÄNTÖ),
 * mutta LÄHIZOOMIN koko koskee jokaista pelikaupunkia (omistaja
 * 9.9.2026) — kaukaa katsottuna se on KAUPUNKIPISTEEN_HALKAISIJA_PX.
 *
 * @param {object} d      pistedatum (kaupungilla on id)
 * @param {string|null} oma  pelaajan nykyisen kaupungin id
 * @param {{halkaisijaPx: number, lahiHalkaisijaPx: number}} mitat
 *   kohdekaupungin mitat juuri nyt
 * @returns {number} halkaisija ruudun pikseleinä
 */
export function kaupunkipisteenHalkaisijaPx(d, oma, mitat) {
  const lahi = Math.max(KAUPUNKIPISTEEN_HALKAISIJA_PX, mitat?.lahiHalkaisijaPx ?? 0);
  if (!d?.id || !oma || d.id !== oma) return lahi;
  return Math.max(lahi, mitat?.halkaisijaPx ?? 0);
}
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
 * ══════════════════════════════════════════════════════════════════
 * NIMILAPUN KOSKETUSVARA (vika v1680; omistaja 7.9.2026 ilta, iPad:
 * *"Symboli ottaa klikkauksen mutta teksti ei."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * v1673 lisäsi osumatestiin lapun laatikon (musteeseenOsunut), mutta
 * laatikko on TÄSMÄLLEEN PIIRRETTY MUSTE eikä kosketuspinta. Mitattu
 * 7.9.2026 (Chromium 834 × 1100 dpr 2, aidot CDP-kosketukset,
 * Istanbul ja Bukarest):
 *
 *   - vaakakyljen lapun laatikko on 33…80 px LEVEÄ mutta vain
 *     11,4 px KORKEA (2 × NOSTOSYM_MINI_RUUTU × NOSTON_MITTA), eli
 *     sormella on pystysuunnassa varaa ±5,7 px;
 *   - napautuksen oma ruutupiste ei ole sormen kohta vaan
 *     kirjaston säteen osuma pallon pintaan, joka projisoidaan
 *     takaisin (getScreenCoords): ero sormeen oli yleiskuvassa
 *     0,5…2,8 px ja lähikuvassa (korkeus 0,05) jopa 3,9 px
 *     pystysuunnassa.
 *
 * Pystyvarasta jäi siis sormelle 1,8…4 px, kun KUVAKKEELLA on koko
 * NAPAUTUKSEN_SADE_PX. Siksi teksti ei ottanut napautusta, vaikka
 * laatikko oli oikeassa paikassa.
 *
 * KORJAUS: osumatestin laatikkoa venytetään tällä varalla joka
 * suuntaan (vain osumatestissä — sovittelu, piirto ja lappuLaatikot
 * käyttävät edelleen musteen mittaa). 16 px on valittu niin, että
 * vaakalapun osumapinta on 11,4 + 2 × 16 = 43,4 px korkea eli
 * suunnilleen sama 44 px:n kosketusvakio, joka kuvakkeella on
 * säteenään.
 */
export const LAPUN_KOSKETUSVARA_PX = 16;
/** Sormen etäisyys ruutulaatikkoon (0, jos sormi on sen sisällä). */
export function laatikonEtaisyys(kohta, r) {
  return Math.hypot(
    Math.max(r.x0 - kohta.x, 0, kohta.x - r.x1),
    Math.max(r.y0 - kohta.y, 0, kohta.y - r.y1),
  );
}
/**
 * PIIRRETYN MUSTEEN VOITTAJA — yksi sääntö noston nimilapulle ja
 * kaupungin nimelle (js/pallolauta/lauta.js musteeseenOsunut; omistaja
 * 9.9.2026: *"kaupungin nimi saisi olla myös klikattavaa aluetta"*).
 *
 * Osuma mitataan ETÄISYYTENÄ LAATIKKOON (musteen päällä 0) ja kelpaa
 * kosketusvaran sisällä; pienin etäisyys voittaa, ja tasapelissä se,
 * jonka laatikon keskipiste on lähinnä (js/fokusniput.js sääntö 9).
 * Musteen päällä oleva sormi voittaa siis aina naapurin pelkän varan.
 *
 * @param {{x: number, y: number}} kohta napautuksen ruutupiste
 * @param {Array<{r: object, voittaja: object}>} ehdokkaat laatikot nyt
 * @param {number} vara kosketusvara pikseleinä
 * @returns {object|null} voittajan tietue tai null
 */
export function musteenVoittaja(kohta, ehdokkaat, vara = LAPUN_KOSKETUSVARA_PX) {
  let paras = null;
  let parasMatka = Infinity;
  let parasKeski = Infinity;
  for (const e of ehdokkaat) {
    const r = e?.r;
    if (!r) continue;
    const matka = laatikonEtaisyys(kohta, r);
    if (matka > vara) continue;
    const keski = Math.hypot((r.x0 + r.x1) / 2 - kohta.x, (r.y0 + r.y1) / 2 - kohta.y);
    if (matka > parasMatka + 1e-6) continue;
    if (Math.abs(matka - parasMatka) <= 1e-6 && keski >= parasKeski) continue;
    parasMatka = matka;
    parasKeski = keski;
    paras = e.voittaja;
  }
  return paras;
}
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

/*
 * KÄYMÄTTÖMÄN KAUPUNGIN PISTE ON VAALEA RUSKEA, EI MUSTA (omistaja
 * 8.9.2026 klo 16.40, sanatarkasti: *"kaupunkien mustat pisteet saisivat
 * näkyä selvästi vaaleampina, nyt hyppäävät liikaa kartalta"*). Entinen
 * #3a2716 luki paperilla mustana täplänä; nyt piste on kartan omaa
 * seepiaa (#8c6d4e), joka erottuu pohjasta mutta ei huuda. Käyty (kulta)
 * ja alku (vaalea kulta) pysyvät sitä vaaleampina ja lämpimämpinä, joten
 * kolme tilaa erottuvat yhä toisistaan.
 */
export const KAUPUNKIPISTEEN_VARI = '#8c6d4e';

/*
 * SINISET KAUPUNKILAATAT POIS (omistaja 11.9.2026: *"siniset
 * kaupunkilaatat voi palauttaa takaisin alkuperäiseen väriin"*).
 *
 * Sininen oli 9.9.2026 tehty TYÖMERKINTÄ: se kertoi, missä kaupungeissa
 * isoisän luentakuva jo oli. Kuvat ovat nyt kaikissa 45 Euroopan
 * kaupungissa (v1766), joten merkintä väritti koko reitin eikä
 * erottanut enää mitään — jäljelle jäi vain sininen kartalla, joka ei
 * kuulu seepiaan.
 */
/** Pisteen väri: tarkistettava kirkasta kultaa, käyty kultaa, alku vaaleaa. */
export function kaupunkipisteenVari(kaupunki) {
  if (livianKorostetutKaupungit().has(kaupunki.id)) return TARKISTUSVARI;
  if (kaupunki.kayty) return '#d9a13b';
  if (kaupunki.alku) return '#b28a4a';
  return KAUPUNKIPISTEEN_VARI;
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

/*
 * ══════════════════════════════════════════════════════════════════
 * LEVY KATSESÄTEELLE — PISTE PYSYY KAUPUNKINSA PÄÄLLÄ (omistaja
 * 8.9.2026 ilta, Mac-kaappaus Venetsiasta)
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJA, SANATARKASTI: *"kaupunkien pisteet eivät myöskään pysy
 * paikallaan, vaan liikkuvat panoroitaessa. minusta tuo korjattiin jo
 * aiemmin mutta on ilmeisesti taas palannut."*
 *
 * 6.9.2026 korjattiin VENYMINEN (lieriö → levy, ks. PISTE ON LEVY).
 * Tämä on eri vika samassa paikassa: PARALLAKSI. Kirjasto asettaa olion
 * PINNAN pisteeseen ja kääntää sen +z:n pallon keskustaan, joten levy
 * (paikallinen z = −1, skaalattuna scale.z:lla) jää 0,3 yksikköä pinnan
 * yläpuolelle PINTANORMAALIN suuntaan. Lähikuvassa kamera on vain
 * korkeus × 100 yksikön päässä pinnasta, jolloin normaalin suuntainen
 * nosto siirtää levyä ruudulla ULOSPÄIN keskustasta — juuri kuten
 * omistajan kuvassa, jossa piste on Venetsian ja sen nimen
 * luoteispuolella ruudun laidalla.
 *
 * MITATTU ENNEN (Chromium 1440 × 900 css, dpr 2, Venetsia; levyn
 * keskipiste projisoituna vs. pinnan piste getScreenCoords):
 *
 *     korkeus 0,08,  16 px keskustasta →  0,7 px sivuun (4,21 %)
 *     korkeus 0,08, 197 px keskustasta →  8,3 px sivuun (4,20 %)
 *     korkeus 0,08, 294 px keskustasta → 12,3 px sivuun (4,19 %)
 *     korkeus 0,60, 130 px keskustasta →  1,0 px sivuun (0,80 %)
 *
 * Virhe on siis VAKIO-OSUUS etäisyydestä ruudun keskustaan (4,2 %
 * lähikuvassa), eli Macin leveällä ruudulla laidalla kymmeniä
 * pikseleitä — ruudun keskellä nolla, ja siksi vika näkyy vasta kun
 * karttaa panoroi.
 *
 * KORJAUS: levy ei nouse pinnasta ULOS vaan siirtyy KATSESÄTEELLE.
 * Olion paikasta vähennetään sama matka normaalia pitkin, joka siihen
 * lisätään kameran suuntaan (katsesateenPaikka), jolloin levy on
 * täsmälleen sillä säteellä, joka kulkee kaupungin pinnan pisteen läpi:
 * projektio osuu pinnan pisteeseen tarkalleen, joka zoomilla ja ruudun
 * joka kohdassa. MITATTU JÄLKEEN: 0,00 px sivuun kaikissa neljässä
 * mittauksessa yllä.
 *
 * KORKEUS SÄILYY, JA SEN KANSSA PIIRTOJÄRJESTYS. Levy on yhä scale.z
 * yksikköä pinnasta, nyt vain kameran suuntaan: se on kameraa kohti
 * täydet 0,3 yksikköä siellä missä ennen oli 0,3 × cos(kulma), joten
 * piste on yhä laattojen (pinta), aihevalojen (0,15), reittien (0,2) ja
 * askelhelmien (0,25) päällä — nyt jopa varmemmin. Napautus osuu
 * (raycast käy levyyn, joka on katsesäteellä), ja siirtymät toimivat
 * kuten ennen (kirjasto skaalaa z:aa).
 *
 * OLION ASENTOON EI KOSKETA. Levy jää pintanormaalin suuntaiseksi eikä
 * käänny kameraa kohti, vaikka se olisi yhtä helppo tehdä (lookAt).
 * Syy on VALO: pisteen materiaali on kirjaston MeshLambert ja
 * suuntavalo on kiinteästi pohjoisnavan suunnassa (mitattu scenestä:
 * DirectionalLight kohdassa 0, 1, 0), joten normaalista riippuva sävy
 * on nyt kaupungin leveysasteen vakio. Kameraa katsova levy vaihtaisi
 * sävyään panoroitaessa — uusi vika vanhan tilalle.
 *
 * MIKSI EI PIENEMPI KORKEUS: kirjaston lattia scale.z:lle on 0,1
 * yksikköä (Globe.gl 2.46: scale.z = max(alt · R, 0,1)) eikä sekään
 * riitä — sama kaava antaa samalla korkeudella 1,3 %:n virheen, ja
 * Macin laidalla se on yhä toistakymmentä pikseliä. Sitä paitsi 0,1
 * yksikön levy painuisi aihevalon (0,15) ja reitin (0,2) alle.
 *
 * MIKSI EI LEVYÄ PINNALLE (paikallinen z = 0): silloin levy olisi
 * täsmälleen laattakerroksen tasossa, ja kerroksen syvyyssiirto
 * (js/pallo.js PIIRTOJÄRJESTYS, LAATTAKERROS_SYVYYSSIIRTO −8) vetäisi
 * kartan sen päälle.
 *
 * PAIKKA KIRJOITETAAN JOKAISESTA KAMERAN LIIKKEESTÄ
 * (tahdistaPisteidenKoko), ladonnasta ja ruudun koon muutoksesta — ja
 * vielä kerran kirjaston oman siirtymän jälkeen
 * (tahdistaSiirtymanJalkeen, jonka kutsuvat pistedatan vaihto ja pallon
 * herätys): siirtymä kirjoittaa olion paikan takaisin pinnalle joka
 * kehyksellä 250 ms:n ajan, ja nukkuvalla silmukalla vasta herätyksen
 * jälkeen. Laskenta lähtee AINA datumin lat/lonista (pallonPiste), ei
 * olion nykyisestä paikasta, joten toistuva kirjoitus ei kasaa siirtoa
 * siirron päälle.
 */
export function katsesateenPaikka(pinta, kameranPaikka, korkeus) {
  if (!pinta || !kameranPaikka || !(korkeus > 0)) return pinta ?? null;
  const sade = Math.hypot(pinta.x, pinta.y, pinta.z);
  const dx = kameranPaikka.x - pinta.x;
  const dy = kameranPaikka.y - pinta.y;
  const dz = kameranPaikka.z - pinta.z;
  const matka = Math.hypot(dx, dy, dz);
  if (!(sade > 0) || !(matka > 0)) return pinta;
  // Pois normaalin suuntaan (kirjasto lisää sen takaisin levyn
  // korkeutena), tilalle sama matka kameraa kohti.
  return {
    x: pinta.x + korkeus * (dx / matka - pinta.x / sade),
    y: pinta.y + korkeus * (dy / matka - pinta.y / sade),
    z: pinta.z + korkeus * (dz / matka - pinta.z / sade),
  };
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
  /**
   * Pisteiden paikan tahdistus kirjaston siirtymän jälkeen (asetetaan
   * alempana, kun tahdistaPisteidenKoko on olemassa). Nukkuvalla
   * silmukalla siirtymä JÄÄTYY ja kirjoittaa pisteiden paikat takaisin
   * pinnalle vasta ensimmäisellä kehyksellä herätyksen jälkeen — siksi
   * katsesäde (ks. LEVY KATSESÄTEELLE) asetetaan uudestaan aina, kun
   * pallo herää tai pistedata vaihtuu.
   */
  let siirtymaAjastin = 0;
  let tahdistaSiirtymanJalkeen = () => {};
  const heraa = () => {
    if (!tauolla) return;
    tauolla = false;
    pallo.resumeAnimation?.();
    tahdistaSiirtymanJalkeen();
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
      // Sama mekanismi kuin tasokartalla: luennan aikana kortti palaa
      // auki, kun veto loppuu (js/ui.js kutistaKortinLiikkeesta).
      ui.kutistaKortinLiikkeesta?.();
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
    /*
     * KEHITTÄJÄN MAAILMANÄKYMÄSSÄ NAPAUTUS ON SAAPUMINEN (omistaja
     * 11.9.2026 ilta). Muissa tapauksissa kamera vain sukeltaa
     * kaupungin ylle SAMALLA leveydellä, jotta pelaaja voi katsoa
     * laattoja siirtymättä — mutta maailmanäkymässä napautus siirtää
     * matkaajan, ja silloin sama "jää siihen leveyteen, jossa jo
     * olet" jätti kameran maailmankuvaan. Tämä haara siis OHITTAA
     * paikallaanpysyvän zoomin ja jättää kameran teleporttihaaralle
     * (paivita), joka ajaa saapumisrajauksen uudessa maassa.
     */
    const maailmahyppy = kehittajaTilaPaalla() && kehittajaMaailmaPaalla() && !ui.katselu
      && !(oma && oma.id === city.id)
      && !(game.phase === 'move' && !game.player?.isBot
        && game.moveOptions?.().some((opt) => opt.city?.id === city.id));
    if (maailmahyppy) {
      /*
       * KAMERAA EI AJETA TÄSTÄ. Siirto on pelin toimi (doAction), joten
       * pelaajan maa vaihtuu vasta sen jälkeen — tästä laukaistu ajo
       * rajaisi vielä LÄHTÖMAAN laatikon (mitattu: Ateenasta Sofiaan
       * hypättäessä kamera jäi Kreikkaan). Saapumisrajauksen ajaa
       * teleporttihaara `paivita`ssa, joka näkee jo uuden paikan.
       */
      ui.doKehittajaSiirto(city);
      return true;
    }
    void kamera.ajaKamera({ x: city.x, y: city.y, leveys: kamera.kameranTila()?.leveys }, {});
    if (oma && oma.id === city.id) {
      ui.avaaTutkinta(city);
      return true;
    }
    if (game.phase === 'move' && !game.player?.isBot) {
      const kohde = game.moveOptions?.().find((opt) => opt.city?.id === city.id);
      if (kohde) { ui.doMove(kohde.key); return true; }
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
   * ruutukoordinaatistossa. Piiloon sovitellulla lapulla laatikko on
   * pelkkä kuvakkeen ruutu, kuten ennen.
   *
   * LAATIKKO ON MUSTE, OSUMAPINTA ON MUSTE + KOSKETUSVARA (vika v1680,
   * ks. LAPUN_KOSKETUSVARA_PX): pelkkä muste on vaakakyljellä 11,4 px
   * korkea, ja siitä meni jopa 3,9 px napautuksen oman ruutupisteen
   * projektioeroon — sormelle jäi pari pikseliä. Osuma mitataan siksi
   * ETÄISYYTENÄ LAATIKKOON (sisällä 0), ja se kelpaa varan sisällä.
   *
   * Kahden lapun mennessä päällekkäin voittaa PIENIN etäisyys, ja
   * tasapelissä (esim. molempien musteen päällä, kumpikin 0) se, jonka
   * laatikon keskipiste on lähinnä — sama sääntö kuin merkeillä
   * (js/fokusniput.js sääntö 9), jotta kaksi reittiä samaan nostoon ei
   * voi eri mieltä. Musteen päällä oleva sormi voittaa siis aina
   * naapurin pelkän varan.
   *
   * ── KAUPUNGIN NIMI ON SAMASSA KILPAILUSSA (omistaja 9.9.2026) ─────
   *
   * OMISTAJA, SANATARKASTI: *"lisäksi kaupungin nimi saisi olla myös
   * klikattavaa aluetta"*. Kaupungin nimi on ladottu piirtomerkki
   * täsmälleen kuten noston nimilappu — vain eri kerroksessa
   * (js/pallolauta/nimet.js, CSS2D-solmu, pointer-events: none) — joten
   * se tulee samaan vertailuun samalla säännöllä: etäisyys laatikkoon,
   * kosketusvara, pienin voittaa ja tasapelissä lähin keskipiste. Nimen
   * napautus palauttaa saman voittajan kuin pisteen napautus
   * (`{ laji: 'kaupunki', k }` → napautaKaupunki), joten teko on sama.
   *
   * FOKUSKOHTEIDEN NIMET EIVÄT VUODA KAUPUNKIIN: kohteen nimilappu on
   * oma ehdokkaansa (`laji: 'nosto'`) ja voittaa oman musteensa päällä,
   * eikä nimien ja lappujen laatikoita edes lasketa päällekkäin —
   * sovittelu pitää kaupungin nimen kiinteänä esteenä, jota lappu
   * väistää (js/pallolauta/sovittelu.js).
   */
  /**
   * Piirretty muste napautuskohdan alla: noston nimilappu tai kaupungin
   * nimi. Yksi vertailu molemmille (ks. lohko yllä ja musteenVoittaja).
   */
  const musteeseenOsunut = (lat, lng) => {
    const kohta = pallo.getScreenCoords(lat, lng, 0);
    if (!kohta) return null;
    const ehdokkaat = [];
    /** Ehdokkaan laatikko juuri nyt: merkin oma ruutupiste + sen muste. */
    const lisaa = (osuma, laatikko, voittaja) => {
      if (typeof laatikko !== 'function' || !edessa(osuma.lat, osuma.lng)) return;
      const p = pallo.getScreenCoords(osuma.lat, osuma.lng, 0);
      const r = p ? laatikko(p) : null;
      if (r) ehdokkaat.push({ r, voittaja });
    };
    for (const o of nostot.osumat()) {
      lisaa(o, o.lappu, { laji: 'nosto', lat: o.lat, lng: o.lng, o });
    }
    // Linssin ajaksi nimet ovat piilossa (css/aikajana.css display:none),
    // eikä näkymätön muste ota napautuksia.
    if (!linssiPaalla()) {
      for (const n of nimet.osumat()) {
        const k = kaupunkiId.get(n.id);
        if (!k || !pisteNakyy(k)) continue;
        lisaa(n, n.laatikko, { laji: 'kaupunki', lat: n.lat, lng: n.lng, k });
      }
    }
    return musteenVoittaja(kohta, ehdokkaat);
  };

  /**
   * Kaupungit ja nostot SAMASSA kilpailussa (js/fokusniput.js sääntö 9:
   * lähin keskipiste voittaa) — vain näkyvät: nimetty kaupunki, oma
   * kaupunki, ruudulla oleva nosto, eläintäky tai kohtaamispiste.
   * PIIRRETTY MUSTE ON MUKANA (VIAT v1672 ja omistaja 9.9.2026): jos
   * merkin oma piste ei vie osumaa, katsotaan vielä, osuiko sormi
   * noston nimilapun tai KAUPUNGIN NIMEN päälle (musteeseenOsunut) —
   * nimen napautus on kaupungin napautus.
   */
  const lahinMerkki = (lat, lng) => {
    const ehdokkaat = [];
    for (const k of kaupungit) {
      if (pisteNakyy(k)) ehdokkaat.push({ laji: 'kaupunki', lat: k.lat, lng: k.lon, k });
    }
    for (const o of nostot.osumat()) ehdokkaat.push({ laji: 'nosto', lat: o.lat, lng: o.lng, o });
    const voittaja = lahin(lat, lng, ehdokkaat, (e) => e.lat, (e) => e.lng);
    /*
     * KAUPUNKIPISTEEN OMA MUSTE VOITTAA LAPUN. Jos sormi on pisteen
     * päällä, pelaaja tähtäsi kaupunkiin — sama myönnytys kuin
     * aarrepisteen sivusiirrolla (js/fokuspiste.js). Kaikkialla muualla
     * piirretty teksti voittaa pelkän 44 px:n läheisyyden. Säde on
     * pisteen OMA ruutuhalkaisija juuri nyt (lähizoomissa suurempi kuin
     * 7 px, omistaja 9.9.2026), yhdestä ja samasta lähteestä kuin piirto.
     */
    const pisteenPx = voittaja?.laji === 'kaupunki'
      ? kaupunkipisteenHalkaisijaPx(voittaja.k, pelaajanKaupunki(), kohdekaupunki())
      : 0;
    if (voittaja?.laji === 'kaupunki' && lahella(lat, lng, voittaja, pisteenPx / 2)) {
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
    return musteeseenOsunut(lat, lng) ?? voittaja;
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
  /*
   * KAUPUNKIPISTEET PIILOON LINSSIN AJAKSI (omistaja 7.9.2026 ilta,
   * sanatarkasti: *"Linssin kartan mustat kaupunki pisteet voi
   * piilottaa, koska niistä ei tapahdu mitään"*): kun body kantaa
   * luokkaa aikajana-paalla, kaupunkipisteen skaala on 0 — piste on
   * three.js-olio, ei DOM-merkki, joten css ei siihen yllä. Helmet ja
   * aihevalot eivät kuulu tähän. Luokan vaihto tahdistaa heti
   * (linssivahti alla), ja skaala palaa, kun linssi suljetaan.
   */
  const linssiPaalla = () => document.body.classList.contains('aikajana-paalla');
  let asetettuSade = 0;
  let asetettuKohdeSade = 0;
  let asetettuLinssi = false;
  /**
   * Pelaajan nykyinen kaupunki (id) tai null — se yksi piste, jota
   * lattia koskee (ks. LATTIA ON YHDEN PISTEEN SÄÄNTÖ). Sama lähde kuin
   * pisteen näkyvyydellä (pisteNakyy): ui.game.cityOf.
   */
  const pelaajanKaupunki = () => ui.game?.cityOf?.()?.id ?? null;
  /*
   * KOHDEKAUPUNGIN MITAT JUURI NYT (ks. KOHDEKAUPUNKI ON SELVÄSTI
   * SUUREMPI KUIN KOHDEMERKIT): pisteen halkaisija ruudulla ja nimen
   * kerroin. Luku lasketaan kameran tilasta, joten se on tuore
   * jokaisessa zoomissa — sama kutsu palvelee sekä pistettä
   * (pisteenSade) että ladontaa (ladoLevossa).
   *
   * VÄLIMUISTI: sama vastaus samasta näkymästä. `pointRadius`-luenta
   * ajetaan kerran JOKAISELLE 261 pisteelle datan päivittyessä, eikä
   * yksikään niistä muuta kameraa — ilman avainta sama jakolasku (ja
   * `clientWidth`-asettelunluku) tehtäisiin 261 kertaa peräkkäin.
   * Avaimessa on kaikki, mistä mitat riippuvat: kameran korkeus,
   * ruudun leveys ja pelaajan kaupunki (maa, jonka lehteä verrataan).
   */
  let kaupunkiAvain = null;
  let kaupunkiMitat = kohdekaupunginMitat({});
  const kohdekaupunki = () => {
    const korkeus = pallo.pointOfView()?.altitude ?? PALLO_KORKEUS_MAX;
    const leveysPx = kotelo.clientWidth;
    // Avaimessa on kaikki, mistä mitat riippuvat — myös kesken oleva
    // siirto, joka sulkee kohdemerkkien portin (nostot.lehdenOsuus), ja
    // ruudun korkeus, joka on osa kameran mittakaavaa (kuvasuhde).
    const korkeusPx = kotelo.clientHeight;
    const avain = `${korkeus.toFixed(5)}:${leveysPx}x${korkeusPx}:${pelaajanKaupunki() ?? ''}:${ui.movingPlayerId ?? ''}`;
    if (avain === kaupunkiAvain) return kaupunkiMitat;
    const nakyva = kamera.nakyvaAlue();
    kaupunkiAvain = avain;
    kaupunkiMitat = kohdekaupunginMitat({
      osuus: nostot.lehdenOsuus(nakyva),
      // Lähizoomin liuku on kameran oma mittakaava (px / lautayksikkö),
      // ei lehden osuus (ks. MIKÄ ZOOMI ON "LÄHIZOOMI").
      skaala: nakyva?.skaala ?? 0,
      suurennus: poltetunMusteenSuurennus({
        leveysPx,
        dpr: globalThis.devicePixelRatio || 1,
        leveysYks: nakyva?.w ?? 0,
      }),
    });
    return kaupunkiMitat;
  };
  /** Säde (pointRadius-yksikköä), joka antaa halutun ruutuhalkaisijan nyt. */
  const sadeRuudulta = (halkaisijaPx) => kaupunkipisteenSade(
    pallo.pointOfView()?.altitude ?? PALLO_KORKEUS_MAX, kotelo.clientHeight,
    { halkaisijaPx },
  );
  /**
   * YHDEN pisteen säde: lattia vain pelaajan kaupungille, kaikille
   * muille KAUPUNKIPISTEEN_HALKAISIJA_PX joka zoomilla (ks. LATTIA ON
   * YHDEN PISTEEN SÄÄNTÖ).
   */
  const pisteenSade = (d) => sadeRuudulta(
    kaupunkipisteenHalkaisijaPx(d, pelaajanKaupunki(), kohdekaupunki()),
  );
  const tahdistaPisteidenKoko = () => {
    const edellinen = asetettuSade;
    const edellinenKohde = asetettuKohdeSade;
    const edellinenLinssi = asetettuLinssi;
    const mitat = kohdekaupunki();
    // Kaksi kokoa, samasta funktiosta kuin pointRadius-luennassa: muut
    // kaupungit (lähizoomin liuku) ja pelaajan oma (myös lehden lattia).
    const muidenPx = kaupunkipisteenHalkaisijaPx(null, null, mitat);
    const sade = sadeRuudulta(muidenPx);
    const kohdeSade = sadeRuudulta(mitat.halkaisijaPx);
    if (!sade) return;
    asetettuSade = sade;
    asetettuKohdeSade = kohdeSade;
    asetettuLinssi = linssiPaalla();
    /*
     * KIRJOITETAAN AINA, HERÄTETÄÄN VAIN MUUTOKSESTA. Kirjaston oma
     * siirtymä (pointsTransitionDuration) kirjoittaa uuden pisteen
     * skaalan JA paikan kehys kerrallaan 250 ms:n ajan siitä arvosta,
     * joka luvun hetkellä oli voimassa; jos zoomi osuu siihen ikkunaan,
     * tämä kirjoitus jäisi sen alle. Ehdoton kirjoitus jokaisella
     * kamera-tapahtumalla ja ladonnalla korjaa senkin.
     */
    const skaala = asetettuLinssi ? 0 : sade * PISTEEN_SKAALA;
    const kohdeSkaala = asetettuLinssi ? 0 : kohdeSade * PISTEEN_SKAALA;
    const oma = pelaajanKaupunki();
    const kameranPaikka = pallo.camera()?.position ?? null;
    const pallonSade = pallo.getGlobeRadius?.() ?? 100;
    for (const d of pallo.pointsData()) {
      const o = d.__threeObjPoint;
      if (!o) continue;
      /*
       * Parallaksi pois JOKAISELTA pisteeltä — kaupungeilta, helmiltä ja
       * aihevaloilta (ks. LEVY KATSESÄTEELLE). Paikka lasketaan aina
       * datumin asteista, ei olion nykyisestä paikasta.
       */
      const paikka = katsesateenPaikka(
        pallonPiste(d.lat, d.lon, pallonSade), kameranPaikka, o.scale.z,
      );
      if (paikka) o.position.set(paikka.x, paikka.y, paikka.z);
      // Koko on kaupunkipisteen asia: helmellä ja valolla on omansa.
      if (d.laji === 'helmi' || d.laji === 'valo') continue;
      // Sama sääntö kuin pointRadius-luennassa, yhdestä paikasta: kaksi
      // valmista skaalaa, joista lehden lattia kuuluu vain pelaajan
      // kaupungille (lähizoomin koko on jo molemmissa).
      const s = kaupunkipisteenHalkaisijaPx(d, oma, mitat) > muidenPx ? kohdeSkaala : skaala;
      o.scale.x = s;
      o.scale.y = s;
    }
    if (Math.abs(sade - edellinen) >= 1e-6 || Math.abs(kohdeSade - edellinenKohde) >= 1e-6
      || asetettuLinssi !== edellinenLinssi) heraa();
  };
  tahdistaSiirtymanJalkeen = () => {
    clearTimeout(siirtymaAjastin);
    siirtymaAjastin = setTimeout(tahdistaPisteidenKoko, siirtyma + 50);
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
      // (tahdistaPisteidenKoko pitää sen samana zoomin muuttuessa) ja
      // lattia vain pelaajan omalle kaupungille.
      return pisteenSade(d);
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
    /*
     * Kirjaston siirtymä kirjoittaa olion paikan takaisin pinnalle joka
     * kehyksellä siirtymän ajan (ks. LEVY KATSESÄTEELLE), joten
     * katsesäde asetetaan vielä kerran siirtymän mentyä — muuten uusi
     * piste jäisi parallaksiin seuraavaan kameran liikkeeseen asti.
     */
    tahdistaSiirtymanJalkeen();
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
    /*
     * KOHDEKAUPUNGIN LATTIA LADONTAAN (omistaja 8.9.2026): nimen koko
     * ja pisteen säde tulevat samasta laskusta kuin itse piste
     * (kohdekaupunki), jotta ladonta varaa nimelle ja pisteelle sen
     * tilan, joka niillä ruudulla oikeasti on — muuten suurempi piste
     * jäisi oman nimensä alle.
     */
    const kaupunginMitat = kohdekaupunki();
    const nimiTulos = nimet.lado({
      varaukset: nostoTulos.laatikot,
      pinot: merkit.laatikot('peli'),
      katto,
      vain,
      kokoKerroin: kaupunginMitat.nimiKerroin,
      pisteSade: kaupunginMitat.halkaisijaPx / 2,
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
  // Linssin avaus/sulku (body.aikajana-paalla) piilottaa ja palauttaa kaupunkipisteet.
  const linssivahti = new MutationObserver(() => {
    if (linssiPaalla() !== asetettuLinssi) tahdistaPisteidenKoko();
  });
  linssivahti.observe(document.body, { attributes: true, attributeFilter: ['class'] });
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
    /*
     * MAAN KARTUUTSI, MAATAULU JA MAALEHTILINKKI VASEMPAAN ALANURKKAAN
     * (omistaja 11.9.2026 ilta; js/fokusmitat.js osio "KARTUUTSI
     * PALLOLLA"). Kutsu on ENNEN avaintarkistusta, koska kalusteet
     * voidaan nollata laudan alta (js/ui.js puraLauta, linssikartan
     * sulku) ilman että pelin tila muuttuu — silloin sama avain palaisi
     * eivätkä ne palaisi koskaan. Työ on mikrotehtävä ja palaa heti,
     * jos maa ei vaihtunut (paivitaFokusmitat).
     */
    paivitaFokusmitat(ui);
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
     * PELAAJAN MAAN RAJA VAHVEMMALLA (omistaja 11.9.2026, sanatarkasti:
     * *"Peli voisi piirtää vahvemmalla aina kyseisen valtion rajat
     * jossa pelaaja on"*).
     *
     * Korostus seuraa pelaajaa eikä ole valikkokytkin, joten se
     * päivitetään TÄSTÄ eikä omasta tapahtumastaan: `paivita` ajetaan
     * aina kun pelin tila muuttuu (avaimessa on pelaajan paikka), ja
     * maa luetaan samasta taulusta kuin kartan kohteet
     * (js/fokuskohteet.js nykyinenIso). Sama maa palaa ilman työtä
     * (js/maanaariviivat.js).
     */
    paivitaPallonMaakorostus({
      vektorit,
      // Avauslento on kartan niukin hetki: ei korostusta lennon ajaksi.
      iso: lento ? null : kohteidenNykyinenIso(ui),
      asteet: pallonAsteet,
      lataa: lataaMaapolygonit,
    });
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
        void saavu({ kesto: PALLOKAMERAN_AJO_MS });
      }
      nappulanPaikka = posAvain;
    }
  };

  /*
   * ===== SAAPUMISRAJAUS: MAA MAHDOLLISIMMAN ISONA =================
   *
   * OMISTAJA 11.9.2026 ilta, sanatarkasti: *"Kartta saisi muuten
   * zoomautuu niin kun saavutaan uuteen kaupunkiin niin että maa näkyy
   * mahdollisimman isoksi zoomattuna näytöllä. Normaali pelissä tämä
   * tulee jo mutta kehittäjä näkymään tämä pitää lisätä kun maailma
   * tila on päällä."*
   *
   * MIKÄ OLI ENNEN. Saapumisajo (kamera.kotiin) vei kaupungin ylle
   * KIINTEÄLLÄ leveydellä (PALLOLAUDAN_SAAPUMISLEVEYS 240 yksikköä,
   * noin 7°). Kreikan kokoisella maalla se sattuu olemaan suunnilleen
   * maan kokoinen — siitä omistajan havainto *"normaalissa pelissä
   * tämä tulee jo"* — mutta Bulgarialle se on liian väljä ja
   * Ranskalle liian tiukka, eikä kehittäjän maailmanäkymässä laukea
   * mikään, koska kaupungin napautus jätti kameran siihen leveyteen,
   * jossa se jo oli (napautaKaupunki).
   *
   * MITEN NYT. Rajaus on MAAN LAATIKKO laudan yksiköissä, luettuna
   * samasta aineistosta kuin maan vahvistettu ääriviiva
   * (js/maanaariviivat.js maanLautalaatikko). Kamera sovittaa laatikon
   * ruutuun molempiin suuntiin (js/pallolauta/kamera.js kameranKohde),
   * joten pystynäytöllä rajaa korkeus ja vaakanäytöllä leveys — juuri
   * siksi kiinteä leveys ei voinut tehdä tätä oikein.
   *
   * LAATIKKO MUISTETAAN MAATA KOHTI. Aineisto puretaan kerran (1,4 MB
   * on jo ladattu korostusta varten) ja tulos jää muistiin laudan
   * ajaksi; sama maa ei laske laatikkoa kahdesti. Muisti on
   * maakohtainen, koska yhden maan kaupungit ovat samalla mantereella
   * — merentakaiset osat karsii maanLautalaatikko itse.
   *
   * TUNTEMATON MAA EI RIKO MITÄÄN: ilman laatikkoa kamera.kotiin ajaa
   * entisen kaupunkinäkymän (kamera.js).
   */
  const maalaatikot = new Map();
  const saapumisrajaus = async () => {
    const iso = kohteidenNykyinenIso(ui);
    if (!iso) return null;
    if (maalaatikot.has(iso)) return maalaatikot.get(iso);
    const data = await lataaMaapolygonit();
    const pos = ui.game?.player?.pos ?? null;
    const kohta = pos && ui.game?.board ? pixelOf(ui.game.board, pos) : null;
    const laatikko = data ? maanLautalaatikko(data, iso, { kohta }) : null;
    maalaatikot.set(iso, laatikko);
    return laatikko;
  };

  /** Saapumisajo: maan laatikko ruutuun, tai entinen kaupunkinäkymä. */
  const saavu = async ({ kesto = 0 } = {}) => kamera.kotiin({
    kesto, bbox: await saapumisrajaus(),
  });

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
    /** Saapumisajo: maan laatikko ruutuun (ks. saapumisrajaus). */
    saavu,
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
      clearTimeout(siirtymaAjastin);
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
      linssivahti.disconnect();
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
      // Maakorostuksen muisti on moduulitasolla (yksi pallo
      // kerrallaan): seuraava lauta latoo korostuksen alusta.
      nollaaPallonMaakorostus();
      // Kartuutsi ja maataulu ovat karttaruudun lapsia (js/fokusmitat.js),
      // eivät pallon kuoressa: ne on poistettava erikseen.
      nollaaFokusmitat(ui);
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
