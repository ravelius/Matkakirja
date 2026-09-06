/*
 * PALLOLAUDAN AVAUSLENTO — Lontoo → aloituskaupunki karttapallolla
 * (vaihe 5b, docs/moduulit/karttapallo.md luku 4 rivi "Aloituslento
 * Lontoosta" ja luku 7 vaihe 5).
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ───────────────────────────────────────
 *
 * Avauslennon KOREOGRAFIA — pergamenttiarkki, kamera-ajo rajaukseen,
 * kertojan luenta, matkustamon äänimaisema, repliikin kirjoitus,
 * ohitusnuoli, saapumiskortti ja pöllön kuplat — on
 * yhdessä paikassa js/ui.js:ssä (aloituslentoSisalla) kummallekin
 * laudalle. Tämä moduuli on sen LAUDAN OMA OSA, täsmälleen samalla
 * jaolla kuin siirrossa (js/ui.js nappulanKuljettaja,
 * js/pallolauta/siirto.js): ui.js kertoo mitä tapahtuu ja milloin,
 * lauta kertoo miltä se näyttää.
 *
 * Kohtauksen sopimus (js/ui.js aloituslennonKohtaus):
 *   rajaus        { x, y, leveys } laudan yksiköissä — null tarkoittaa,
 *                 ettei tällä laudalla voi lentää (silloin vanha kalvo)
 *   valmistele()  lauta lennon tilaan (niukat nimet, kaari, tarkka laatu)
 *   odotaKartta() valinnainen: laudan oma "kartta on valmis" arkin takana
 *   rakenna()     kone kiitoradalle kamera-ajon jälkeen
 *   lenna(kesto)  { animaatiot, perilla } — kone matkaan
 *   poistuma()    kohtaus häipyy saapumiskortin alla
 *   pura()        kohtaus pois, lauta takaisin pelitilaan (idempotentti)
 *
 * ── KONE JA KAARI OVAT SAMAT KUIN MUUSSAKIN LENNOSSA ──────────────
 *
 * Kaari on arcsData (js/pallolauta/reitit.js) ja kone pelin oma
 * DOM-elementti kotelon päällä (js/pallolauta/siirto.js) — sama
 * lentokaari, sama isoympyrä, sama koneen piirros ja sama rAF-silmukka
 * kuin vaiheen 2 lennolla. Kuljettaja pyydetään ui.nappulanKuljettajalta
 * (`{ lento: true }`), jolloin sama sopimus palvelee molempia lentoja
 * eikä koneen kuljetusta ole kahdessa paikassa.
 *
 * ── KOLME OMISTAJAN TILAUSTA 5.9.2026 KLO 00.35 ───────────────────
 *
 * Uusi kaappaus samasta lennosta (v1601), sanatarkasti:
 * *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta.
 * lentokoneen ei tarvitse kääntyä alussa vaan voi lehtää heti oikeaan
 * suuntaa ja jättää paksun punaisen viivan. isoisän kuva pitää
 * häivyttää joka reunastaan läpinäkyväksi ja tehdä vähän isommaksi"*
 *
 *   1. SUMENNUS POIS — niukkuusharso poistettiin pallolta kokonaan
 *      (js/pallolauta/lauta.js aloitaLentotila), ja koska kartta on nyt
 *      näkyvissä terävänä, `valmistele` PYYTÄÄ TARKAN LAATUTILAN koko
 *      lennon ajaksi (`pakotaPallonLaatu`, js/pallo.js) ja `pura`
 *      vapauttaa sen laskeutumisessa.
 *   2. SUORA LÄHTÖ — koneen asento luetaan kaaresta eikä edellisestä
 *      kehyksestä, ja käännöksen kesto on nolla (js/pallolauta/siirto.js
 *      KONEEN_KAANNOKSEN_MS). Kone on lentosuunnassa jo ilmestyessään,
 *      ja paksu viiva alkaa kasvaa samalla kehyksellä kuin lento.
 *   3. ISOISÄN KUVA — kortti oli css:ää (.lento-valokuva), ei tämän
 *      moduulin asia; omistaja poisti sen avauslennolta kokonaan
 *      6.9.2026 illalla (ks. alempana).
 *
 * ══════════════════════════════════════════════════════════════════
 * KAMERA LENTÄÄ YHDEN KAAREN, EI SEURAA KONEEN NYKÄISYJÄ (omistaja
 * 6.9.2026 ilta)
 * ══════════════════════════════════════════════════════════════════
 *
 * Sanatarkasti: *"kartta liikuu siinä liian pikkutarkasti seuraten
 * koneen alku ja loppu nykäisyjä. kartta saisi lentää yhden tasaisen
 * reitin ja zoom muutoksen alusta loppuun."*
 *
 * MISTÄ NYKÄISYT TULIVAT — NELJÄ ERI LIIKETTÄ SAMASSA KUVASSA. Kamera
 * oli SEURAAJA: se laski joka kehyksellä koneen paikan ja hakeutui
 * sinne. Summaan tuli siis
 *
 *   1. KONEEN OMA KÄYRÄ. Kone kulki `hypynVaihe`lla (easeInOutQuad,
 *      js/siirtokoreografia.js), jonka KIIHTYVYYS hyppää lennon alussa
 *      nollasta täyteen, kääntyy kerralla puolivälissä ja putoaa
 *      nollaan lopussa. Ne ovat täsmälleen omistajan näkemät "alku ja
 *      loppu nykäisyt" — ja kamera toisti ne suurennettuna, koska koko
 *      kuva liikkui koneen mukana.
 *   2. SILOTUKSEN JÄLKIJÄTTÖ. Seuranta oli ensimmäisen kertaluvun
 *      viive (aikavakio 260 ms): se jäi lähdössä jälkeen, kiri kiinni
 *      keskellä ja viimeisellä kehyksellä kamera napsautettiin koneen
 *      kohdalle kerralla.
 *   3. KONEEN NOSTO. Kone nostettiin keskilinjan yläpuolelle
 *      trapetsilla, joka ajettiin sisään lennon ensimmäisellä ja ulos
 *      viimeisellä 15 %:lla — oma pikku liikkeensä juuri lennon
 *      päissä.
 *   4. KULJETTAJAN OMA KAMERA-AJO. `hyppaa` käynnisti yhä ajon
 *      kaupunkiparin laatikkoon (siirto.js), ja seuranta pysäytti sen
 *      seuraavassa kehyksessä.
 *
 * NYT KAMERA SAA YHDEN SUUNNITELMAN. Lennon alkaessa lasketaan KERRAN
 * lähtö (paikka, korkeus) ja perillä (paikka, korkeus), ja koko lento
 * luetaan pelkästä ajasta yhtenä kaarena:
 *
 *   PAIKKA   isoympyrää pitkin (`lentokaarenKohta`), vaihe
 *            `lennonVaihe` = liukuPehmennys eli ease-in-out, jonka
 *            kiihtyvyys on rajallinen ja vaihtaa merkkiä vain kerran,
 *            lennon puolivälissä.
 *   KORKEUS  `lennonKorkeus`: nousu lähtökorkeudesta huippuun
 *            (AVAUSLENNON_HUIPPULEVEYS) osuudella 0…35 % ja sen
 *            jälkeen lasku saapumisnäkymään. Molemmat osuudet ovat
 *            logaritmisia ja samalla ease-in-out-käyrällä, joten
 *            käyrällä on TÄSMÄLLEEN YKSI MAKSIMI, se on molemmin
 *            puolin monotoninen ja tasaantuu huipun ja päiden
 *            ympärillä: yksi zoomin muutos alusta loppuun.
 *
 * KONE PIIRTYY SUUNNITELMAN PÄÄLLE, EI TOISIN PÄIN. Kone
 * (js/pallolauta/siirto.js) ja paksu punainen jälki lukevat SAMAN
 * vaiheen `lennonVaihe`, joten kone on joka kehyksellä täsmälleen
 * siinä pisteessä, jota kamera katsoo — kaaren oma korkeus nostaa sen
 * hitusen keskilinjan yläpuolelle, ja muuta suhteellista liikettä
 * kuvassa ei ole. Kuljettaja ei myöskään aja omaa kameraansa:
 * `omaKamera` kertoo, että kohtaus vastaa kamerasta.
 *
 * KONEEN NOSTO ON POISSA. Se oli olemassa isoisän valokuvakorttia
 * varten (kone ei saanut jäädä kortin taakse). Omistaja poisti kortin
 * ensimmäiseltä lennolta samana iltana (*"ens. lentokohtauksesta, ota
 * isoisän kuva pois"*, js/ui.js aloituslentoSisalla), joten kamera
 * katsoo taas suoraan reittiä.
 *
 * LOPPUKORKEUS ON SAAPUMISNÄKYMÄ, EIKÄ SIIRTYMÄ HYPI. Laskeutumisessa
 * kuljettaja ajaa kameran kohdekaupunkiin saapumisnäkymään
 * (js/pallolauta/siirto.js laske → kamera.kotiin,
 * PALLOLAUDAN_SAAPUMISLEVEYS). Suunnitelman viimeinen kehys on
 * TÄSMÄLLEEN sama paikka ja sama korkeus, joten tuo ajo on nolla-ajo:
 * kamera.js tunnistaa liikkumattoman ajon ja kirjoittaa näkymän
 * kerralla.
 *
 * LÄHIN KORKEUS ON LAATTOJEN, EI TÄMÄN MODUULIN. Kaikki kolme
 * korkeutta lasketaan `kamera.kameranKohde`lla, joka sitoo korkeuden
 * laitteen ja laattaluettelon syvimmän tason rajaan (kamera.js
 * lahinKorkeus). Jos raja purisi, lento zoomaa siihen asti eikä sen
 * läpi.
 *
 * REDUCED MOTION: KAMERA HYPPÄÄ KOHTEESEEN. Kone ei lennä lainkaan
 * (siirto.js hyppaa), joten suunnitelmallakaan ei ole mitään ajettavaa:
 * `rajaus` on silloin suoraan kohdekaupungin saapumisnäkymä, ja ui.js
 * asettaa sen kerralla arkin takana.
 *
 * LAATAT ETUKÄTEEN KORIIN. Lähempi kuva pyytää syvempiä laattoja (Z7 ja
 * lopussa Z8) pitkin koko reittiä, eikä laattamoottori hae mitään ennen
 * kuin kamera on jo siellä. Siksi `valmistele` lähettää koneen reitin
 * käytävän palvelutyöntekijälle heti (js/pallo.js esilataaLentoreitti) —
 * arkin takana on sekunteja aikaa, ja kori on lennon alkaessa valmis.
 */

import { esilataaLentoreitti, pakotaPallonLaatu } from '../pallo.js';
import { pixelOf } from '../rules.js';
import { PALLOLAUDAN_SAAPUMISLEVEYS } from './kamera.js';
import { REITIN_KORKEUS, lentokaarenKohta } from './reitit.js';

/**
 * NÄKYMÄN LEVEYS LENNON ALUSSA (lautayksikköä ruudun leveydellä;
 * 600 ≈ 18°). Omistaja 6.9.2026: *"paljon lähempi zoom aste"*.
 *
 * MITTA. Vanha rajaus (kaupunkiparin laatikko marginaalilla 0,2) antoi
 * Lontoo → Ateena -lennolle 1 306 lautayksikköä työpöydällä (39,2°) ja
 * 1 113 puhelimella (33,4°) — molemmat päät kuvassa, kone pieni.
 * Puolittaminen on juuri se "paljon lähempi": 600 yksikköä näyttää
 * lähtökaupungin ympäristön (Etelä-Englanti ja Kanaali kokonaan), eikä
 * kuvaan tarvitse mahtua muuta — reitin toinen pää tulee vastaan
 * matkalla. Loppuleveys on saapumisnäkymä 240, joten lento zoomaa
 * kaikkiaan 2,5-kertaisesti (huipulta 3,2-kertaisesti) — yksi zoomin
 * muutos koko lennon mitalla (4,8–20 s).
 */
export const AVAUSLENNON_ALKULEVEYS = 600;
/**
 * NÄKYMÄN LEVEYS LENNON HUIPULLA (lautayksikköä ruudun leveydellä;
 * 760 ≈ 22,8°).
 *
 * KAMERA NOUSEE KONEEN MUKANA JA LASKEUTUU SEN MUKANA (omistaja
 * 6.9.2026 ilta: *"kartta saisi lentää yhden tasaisen reitin ja zoom
 * muutoksen alusta loppuun"*). Lennolla on siis sama profiili kuin
 * koneella: nousu lähtökaupungin yltä (600) hitusen ylemmäs, tasainen
 * matkalento ja lasku saapumisnäkymään (240).
 *
 * MIKSI 760 EIKÄ ENEMPÄÄ. Nousu on 1,27-kertainen eli neljännes
 * ulospäin: sen verran, että kuvaan tulee matkan tuntu ja reitin
 * edestä näkyy enemmän maata, muttei niin paljon, että omistajan
 * samana aamuna tilaama *"paljon lähempi zoom aste"* katoaisi — 760 on
 * yhä selvästi alle vanhan kaupunkiparin rajauksen (1 113–1 306).
 * Huipun jälkeen jäljellä on 3,2-kertainen lähentyminen, joka on koko
 * lennon näkyvin liike.
 */
export const AVAUSLENNON_HUIPPULEVEYS = 760;
/**
 * MILLOIN KAAREN HUIPPU SAAVUTETAAN (osuus lennosta). Nousu on lennon
 * ensimmäinen kolmannes ja lasku loput; kummankin osuuden oma
 * ease-in-out (liukuPehmennys) tasaa liikkeen huipun molemmin puolin,
 * joten noin 35–65 %:n kohdalla kuva on käytännössä tasainen — juuri se
 * "tasainen reitti", jota omistaja pyysi.
 */
export const AVAUSLENNON_HUIPUN_KOHTA = 0.35;
/**
 * PAKSU PUNAINEN VIIVA KUTEN ETUSIVULLA (omistaja 5.9.2026: *"lentokone
 * saisi tehdä saman paksun viivan kuin etusivulla"*). Etusivun viiva on
 * css .etusivupallo-viiva, stroke-width 11 — ja tämä on sama luku.
 *
 * PATHSTROKE ON RUUTUPIKSELEITÄ, EI ASTEITA. Mitattu Chromiumilla
 * 5.9.2026: Globe.gl 2.46 rakentaa viivan Line2:na, jonka
 * LineMaterialissa `worldUnits` on epätosi ja `resolution` on kotelon
 * KOKO CSS-pikseleinä (mitattu 374 × 777) — varjostin laskee
 * `offset *= linewidth; offset /= resolution.y`, eli luku on
 * css-pikseleitä ruudulla. Ensimmäinen toteutus laski paksuuden
 * asteina (0,89) tämän moduulin kommenttien mukaan, ja viiva jäi alle
 * pikselin levyiseksi eli näkymättömiin. Samat "asteina"-kommentit
 * olivat myös reitit.js:n ja linssien paksuusvakioissa
 * (MATKAREITIN_PAKSUUS_AST 0,05 jne.); ne on sittemmin korjattu
 * `_PX`-nimisiksi ruutupikseleiksi (karttapallo.md luku 10.3,
 * "Viivapaksuudet pallolla"). Sama mittaus osoitti myös, ettei
 * laitepikselisuhde vaikuta lukuun: 11 piirtyi puhelimella (dpr 2)
 * 22 laitepikseliä eli tasan 11 css-pikseliä.
 */
export const AVAUSLENNON_VIIVAN_PX = 11;
/** Jäljen pisteitä koko kaarella; kasvava jälki saa niistä osuutensa. */
export const AVAUSLENNON_JALJEN_PISTEET = 64;
/**
 * Reitin näytteitä laattojen esilatausta varten. 24 näytettä on
 * Lontoo → Ateena -mitalla noin 100 km:n välein, eli tiheämmin kuin
 * yksi Z7-laatta (2,8° ≈ 250 km) — käytävään ei jää reikiä.
 */
export const AVAUSLENNON_REITTINAYTTEET = 24;

/**
 * Pehmennys pitkille liu'uille: liikkeelle ja pysähdykseen pehmeästi,
 * välissä lähes tasainen. Ei siirtoajon trapetsia — se on tehty lyhyille
 * kamera-ajoille, ei koko lennon mittaiselle zoomille. Sama käyrä
 * hidastaa aloitusvalinnan pyörinnän (js/pallolauta/lauta.js).
 */
export function liukuPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/**
 * LENNON YKSI VAIHE. Kamera, kone ja paksu punainen jälki lukevat
 * TÄSMÄLLEEN tämän käyrän samasta kellosta, joten kone on aina siinä
 * pisteessä, jota kamera katsoo, ja jäljen kärki koneen alla.
 *
 * Käyrä on `liukuPehmennys` (smoothstep) eikä siirron `hypynVaihe`
 * (easeInOutQuad): jälkimmäisen KIIHTYVYYS hyppää nollasta täyteen
 * lennon alussa ja putoaa nollaan lopussa, ja juuri ne nykäisyt kamera
 * ennen toisti (omistaja 6.9.2026 ilta). Smoothstepin kiihtyvyys on
 * nolla molemmissa päissä ja vaihtaa merkkiä vain kerran, lennon
 * puolivälissä.
 */
export function lennonVaihe(t) {
  return liukuPehmennys(t);
}

/** Logaritminen liuku a → b osuudella e: silmä lukee zoomista suhteen. */
function korkeusLiuku(a, b, e) {
  return Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * e);
}

/**
 * KAMERAN KORKEUS LENNON OSUUDELLA t — YKSI KAARI, YKSI HUIPPU.
 *
 * Nousu `alku` → `huippu` osuudella 0…`huipunKohta` ja lasku `huippu` →
 * `loppu` siitä maaliin, kumpikin logaritmisena liukuna omalla
 * ease-in-out-käyrällään. Käyrällä on siis täsmälleen yksi maksimi
 * (huipunKohta), se on monotoninen molemmin puolin, ja koska
 * pehmennyksen derivaatta on nolla kummankin osuuden päissä, kuva on
 * tasainen sekä huipulla että lennon päissä — ei nykäisyä siirryttäessä
 * noususta laskuun eikä laskeuduttaessa saapumisnäkymään.
 */
export function lennonKorkeus(t, {
  alku, huippu, loppu, huipunKohta = AVAUSLENNON_HUIPUN_KOHTA,
}) {
  const x = Math.max(0, Math.min(1, t));
  const k = Math.max(0.01, Math.min(0.99, huipunKohta));
  if (x <= k) return korkeusLiuku(alku, huippu, liukuPehmennys(x / k));
  return korkeusLiuku(huippu, loppu, liukuPehmennys((x - k) / (1 - k)));
}

/**
 * KOKO LENNON KAMERASUUNNITELMA YHTENÄ FUNKTIONA: t (0…1) →
 * { lat, lng, altitude, e }. Paikka on isoympyrän piste vaiheella
 * `lennonVaihe` ja korkeus `lennonKorkeus` — ei seurantaa, ei
 * silotusta, ei kehyskohtaista kohdetta, joten kamera ei voi nykäistä
 * koneen perässä (omistaja 6.9.2026 ilta).
 *
 * `korkeudet` on { alku, huippu, loppu } kameran omina korkeuksina
 * (kamera.kameranKohde on jo sitonut ne laattojen tarkkuusrajaan).
 */
export function lennonSuunnitelma(kaari, korkeudet) {
  return (t) => {
    const e = lennonVaihe(t);
    const kohta = lentokaarenKohta(kaari, e);
    return {
      lat: Math.max(-89.5, Math.min(89.5, kohta.lat)),
      lng: kohta.lng,
      altitude: lennonKorkeus(t, korkeudet),
      e,
    };
  };
}

/**
 * Avauslennon kohtaus pallolle. `lahto` ja `kohde` ovat laudan
 * kaupunkeja (js/game.js board.cityById).
 */
export function luoAloituslennonKohtaus({ ui, lauta, lahto, kohde }) {
  const { board } = ui.game;
  if (!board || !lahto || !kohde || lahto.id === kohde.id) return null;
  const lahtoPos = { type: 'city', city: lahto.id };
  const kohdePos = { type: 'city', city: kohde.id };
  let kuljettaja = null;
  let purettu = false;
  let jalkiKehys = 0;
  let laatuPyydetty = false;
  let kameraAjo = null; // { kehys, maali } kesken olevalle kamerasuunnitelmalle

  /**
   * Kameran näkymä kaupungin yllä annetulla leveydellä:
   * { lat, lng, altitude }. Korkeuden sitominen laattojen tarkkuuteen
   * tapahtuu kamerassa (kamera.js kameranKohde → lahinKorkeus), joten
   * lento ei koskaan pyydä lähempää kuin lauta antaa.
   */
  const nakyma = (pos, leveys) => lauta.kamera.kameranKohde({ ...pixelOf(board, pos), leveys });

  /*
   * LENTO ALKAA LÄHTÖKAUPUNGIN YLTÄ, EI KAUPUNKIPARIN LAATIKOSTA
   * (omistaja 6.9.2026). Kamerasuunnitelma lähtee koneen lähtöpaikasta
   * lennon alkuleveydellä — laatikkoa ei enää tarvita, ja koska tämä on
   * suunnitelman ensimmäinen kehys, arkin väistyessä ei ole mitään
   * loikkaa.
   *
   * Reduced motionissa kone ei lennä lainkaan, joten kamera hyppää
   * suoraan kohteeseen: rajaus on silloin kohdekaupungin
   * saapumisnäkymä, eli täsmälleen se kuva, johon liikkuva lento
   * päättyisi.
   */
  const rajaus = ui.reducedMotion
    ? { ...pixelOf(board, kohdePos), leveys: PALLOLAUDAN_SAAPUMISLEVEYS }
    : { ...pixelOf(board, lahtoPos), leveys: AVAUSLENNON_ALKULEVEYS };

  /** Kaaren geometria koneelle ja jäljelle (sama olio molemmille). */
  const lentokaari = () => lauta.reitit.lentokaari(lahto, kohde);

  /**
   * Koko kaari pisteinä [lat, lng, korkeus]. Lista tehdään KERRAN ja
   * annetaan viivakerrokselle sellaisenaan; kasvu hoidetaan katkoviivan
   * osuudella (reitit.js jalki), koska geometrian uudelleenkirjoitus
   * joka kehys jätti viivan Lontoon viereen (mitattu 5.9.2026).
   */
  const kaarenPisteet = (kaari) => {
    const pisteet = [];
    for (let i = 0; i <= AVAUSLENNON_JALJEN_PISTEET; i += 1) {
      const k = lentokaarenKohta(kaari, i / AVAUSLENNON_JALJEN_PISTEET, REITIN_KORKEUS);
      pisteet.push([k.lat, k.lng, k.korkeus]);
    }
    return pisteet;
  };

  /** Reitin näytepisteet laattojen esilataukselle ({ lat, lon }). */
  const reitinPisteet = (kaari) => {
    const pisteet = [];
    for (let i = 0; i <= AVAUSLENNON_REITTINAYTTEET; i += 1) {
      const k = lentokaarenKohta(kaari, i / AVAUSLENNON_REITTINAYTTEET);
      pisteet.push({ lat: k.lat, lon: k.lng });
    }
    return pisteet;
  };

  /** Kamerasuunnitelma seis; ohituksessa kamera viedään samalla maaliin. */
  const paataKameraAjo = (maaliin = false) => {
    if (!kameraAjo) return;
    const oma = kameraAjo;
    kameraAjo = null;
    cancelAnimationFrame(oma.kehys);
    if (maaliin && oma.maali) lauta.pallo.pointOfView(oma.maali, 0);
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * YKSI KAARI ALUSTA LOPPUUN (omistaja 6.9.2026 ilta)
   * ══════════════════════════════════════════════════════════════════
   *
   * Oma rAF-silmukkansa eikä kamera.ajaKamera, koska tavallinen ajo on
   * suora liuku pisteestä toiseen: tässä paikka kulkee ISOYMPYRÄÄ ja
   * korkeus käy huipun kautta. Silmukka ei kuitenkaan enää SEURAA
   * mitään — se lukee kellosta osuuden ja kirjoittaa suunnitelman
   * (`lennonSuunnitelma`) arvon sellaisenaan, joten kameran rata on
   * päätetty kokonaan ennen ensimmäistä kehystä eikä kehysvälillä ole
   * liikkeeseen mitään vaikutusta.
   *
   * KOLME KORKEUTTA LASKETAAN KERRAN: lähtö (AVAUSLENNON_ALKULEVEYS),
   * huippu (AVAUSLENNON_HUIPPULEVEYS) ja saapumisnäkymä
   * (PALLOLAUDAN_SAAPUMISLEVEYS) — kaikki kameran omalla kaavalla, joka
   * sitoo ne laattojen tarkkuusrajaan.
   *
   * ELE EI KILPAILE TÄMÄN KANSSA. Tavallinen kamera-ajo pysähtyy
   * sormeen (kamera.js kuuntelee koteloa), mutta lennon ajan kotelon
   * päällä on koko ruudun lentokalvo (js/ui.js `.flight-overlay`), joka
   * ottaa napautuksen ja OHITTAA lennon. Pallo ei siis ole vedettävissä
   * lennon aikana; ohitus vie kameran maaliin (`paataKameraAjo(true)`).
   */
  const ajaKamerasuunnitelma = (kaari, kesto, alkuhetki) => {
    const kamera = lauta.kamera;
    kamera.pysaytaKameraAjo();
    const alkuKorkeus = nakyma(lahtoPos, AVAUSLENNON_ALKULEVEYS)?.altitude;
    const huippuKorkeus = nakyma(lahtoPos, AVAUSLENNON_HUIPPULEVEYS)?.altitude;
    const maali = nakyma(kohdePos, PALLOLAUDAN_SAAPUMISLEVEYS);
    if (!(alkuKorkeus > 0) || !(huippuKorkeus > 0) || !(maali?.altitude > 0)) return;
    /*
     * HUIPPU ON AINA YLIN. Jos laite rajaisi korkeudet niin, ettei
     * huippu jäisi päiden yläpuolelle, kaari menettäisi maksiminsa ja
     * zoomi kääntyisi kesken lennon; Math.max pitää käyrän muodon.
     */
    const suunnitelma = lennonSuunnitelma(kaari, {
      alku: alkuKorkeus,
      huippu: Math.max(huippuKorkeus, alkuKorkeus, maali.altitude),
      loppu: maali.altitude,
    });
    const oma = { kehys: 0, maali };
    kameraAjo = oma;
    const askel = (hetki) => {
      if (kameraAjo !== oma) return;
      if (purettu || ui.dead) { paataKameraAjo(); return; }
      const t = Math.min(1, (hetki - alkuhetki) / Math.max(1, kesto));
      const kohta = suunnitelma(t);
      lauta.pallo.pointOfView(
        { lat: kohta.lat, lng: kohta.lng, altitude: kohta.altitude }, 0,
      );
      if (t < 1) { oma.kehys = requestAnimationFrame(askel); return; }
      kameraAjo = null;
    };
    lauta.heraa();
    oma.kehys = requestAnimationFrame(askel);
  };

  return {
    rajaus,

    valmistele() {
      /*
       * NIUKKA LAUTA ENNEN KAMERA-AJOA, kuten tasokartalla: kahden
       * nimen sääntö on voimassa jo silloin kun kuva asettuu
       * rajaukseen, eikä nimiä ehdi ladota kesken liikkeen. Harsoa ei
       * ole (omistaja 5.9.2026 klo 00.35), joten niukkuus on vain tämä.
       */
      lauta.lento.aloita({ lahto, kohde });
      /*
       * TARKAT LAATAT KOKO LENNON AJAN (omistaja 5.9.2026 klo 00.35:
       * *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta"*).
       * Harso on poissa, joten laattakartta on lennon pääosassa — eikä
       * se saa olla liikkeen ajan lepolaatua karkeampi juuri silloin,
       * kun kamera seuraa konetta koko lennon läpi. Sama vipu kuin
       * keksintölinssin ajolla (js/pallo.js pakotaPallonLaatu, omistaja
       * 5.9.2026: *"pidä kokoajan terävä tila päällä"*); pyytäjiä
       * lasketaan, joten vapautus `pura`:ssa ei voi sammuttaa toisen
       * pyytäjän terävyyttä.
       */
      if (!laatuPyydetty) {
        laatuPyydetty = true;
        pakotaPallonLaatu(true);
      }
      /*
       * ELÄVÄ KAARI, EI LAATTOJEN LENTOREITTI (omistaja 1.9.2026:
       * *"Piirretään ne näkyviin reaaliajassa vasta sitten jos pelaaja
       * päättää mennä lentokoneella."*). lentoKaari on sama lippu, jolla
       * doFly sytyttää kaaren katkojäljen kiertämään — avauslento on
       * pelin ensimmäinen lento eikä ansaitse omaa merkintätapaa.
       */
      ui.lentoKaari = { a: lahto.id, b: kohde.id };
      /*
       * REITIN LAATAT KORIIN HETI (omistaja 6.9.2026, ks. moduulin
       * otsikko): lähempi kamera pyytää lennon aikana Z7:ää ja lopussa
       * Z8:aa pitkin koko kaarta, ja laattamoottori hakee vasta kun
       * kamera on jo paikalla. Tämä on ainoa hetki, jolloin haku ehtii
       * tapahtua pergamenttiarkin takana. Ilman palvelutyöntekijää
       * (yhden tiedoston versio, kehitys) kutsu ei tee mitään.
       */
      const kaari = lentokaari();
      if (kaari) void esilataaLentoreitti(reitinPisteet(kaari));
      lauta.paivita();
    },

    /*
     * KARTTA VALMIIKSI ENNEN FEIDIÄ, PALLON MITALLA (omistaja 3.9.2026:
     * *"kartta pitää ladata etukäteen, nyt se rakentui pikkuhiljaa
     * taustalla valmiiksi."*).
     *
     * Tasokartalla odotus on laattapyramidin oma (js/laattapyramidi.js
     * odotaPyramidi): se tietää, montako näkyvän alueen laattaa on yhä
     * kesken. Globe.gl:n laattamoottori ei kerro siitä mitään, joten
     * pallon mitta on TEKSTUURIEN MÄÄRÄ: jokainen saapunut laatta on
     * yksi tekstuuri lisää, ja kun luku ei enää kasva kahteen
     * peräkkäiseen näytteeseen, näkymä on valmis. Katto on pakollinen
     * samasta syystä kuin kartalla — yksi saapumatta jäävä laatta ei saa
     * jättää pergamenttiarkkia ruudulle. Ohitus katkaisee odotuksen:
     * kiirehtivä pelaaja ei jää katsomaan arkkia.
     */
    async odotaKartta({ katto = 6000, keskeytys = null } = {}) {
      const takaraja = performance.now() + katto;
      let edellinen = -1;
      let vakaita = 0;
      while (!ui.dead && !keskeytys?.() && performance.now() < takaraja) {
        const n = lauta.pallo?.renderer?.()?.info?.memory?.textures ?? 0;
        if (n > 1 && n === edellinen) {
          vakaita += 1;
          if (vakaita >= 2) break;
        } else {
          vakaita = 0;
        }
        edellinen = n;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((valmis) => { setTimeout(valmis, 120); });
      }
      // Kiinnitetty ei ole vielä maalattu: kaksi kehystä, sama varmistus
      // kuin kartalla (odotaPyramidi).
      await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    },

    rakenna() {
      // Kamera on nyt rajauksessa: nimet ladotaan tähän kuvaan heti
      // eikä vasta lepoviiveen päästä, koska arkki väistyy pian.
      lauta.ladoHeti();
      /*
       * KOHTAUS VASTAA KAMERASTA (`omaKamera`). Ilman lippua kuljettaja
       * käynnistäisi lähdössä oman ajonsa kaupunkiparin laatikkoon
       * (siirto.js hyppaa, LENNON_KAMERA_MS) — ajo, joka ennen
       * pysäytettiin heti seuraavassa kehyksessä ja joka ehti sitä
       * ennen nykäistä kuvaa.
       */
      kuljettaja = ui.nappulanKuljettaja(ui.game.player, { lento: true, omaKamera: true });
      kuljettaja.nosta();
      /*
       * KONE KIITORADALLE JO LENTOSUUNNASSA (omistaja 5.9.2026 klo
       * 00.35: *"lentokoneen ei tarvitse kääntyä alussa vaan voi lehtää
       * heti oikeaan suuntaa"*). Kaari annetaan `aseta`lle, jolloin
       * kuljettaja lukee asennon siitä eikä liikkeestä
       * (siirto.js koneenKulma): kone on ruudulla oikeassa asennossa jo
       * ennen kuin arkki väistyy, eikä lähdössä ole kaartoa.
       */
      kuljettaja.aseta(lahtoPos, lentokaari());
    },

    lenna(kesto) {
      if (!kuljettaja) return { animaatiot: [], perilla: Promise.resolve() };
      const kaari = lentokaari();
      const paksuus = AVAUSLENNON_VIIVAN_PX;
      const alkuhetki = performance.now();
      /*
       * KONE KULKEE KAMERAN VAIHEELLA (`lennonVaihe`) eikä siirron
       * omalla hypynVaiheella: kone ja kamera ovat silloin samassa
       * pisteessä joka kehyksellä eikä kuvassa ole suhteellista
       * liikettä (omistaja 6.9.2026 ilta).
       */
      const perilla = kuljettaja.hyppaa(lahtoPos, kohdePos, kesto, { vaihe: lennonVaihe });

      // Kamera samasta kellosta ja samasta kaaresta yhtenä suunnitelmana.
      if (!ui.reducedMotion && kaari) ajaKamerasuunnitelma(kaari, kesto, alkuhetki);

      /*
       * ══════════════════════════════════════════════════════════════
       * PAKSU PUNAINEN VIIVA KONEEN PERÄSSÄ (omistaja 5.9.2026)
       * ══════════════════════════════════════════════════════════════
       *
       * Sanatarkasti: *"lentokone saisi tehdä saman paksun viivan kuin
       * etusivulla."* Jälki kasvaa samasta kellosta kuin kone ja kamera
       * (lennonVaihe) ja samalla kaarella (reitit.js lentokaarenKohta),
       * joten viivan kärki on koneen alla koko lennon. Reduced motion:
       * kone ei lennä lainkaan, joten jälki piirretään kerralla
       * valmiiksi.
       *
       * (Osuus on kaaren PARAMETRI ja katko mitataan viivan PITUUDESTA;
       * kaaren korkeusnyppylä tekee näiden väliin muutaman prosentin
       * eron lennon puolivälissä. Silmä ei erota sitä, koska kone on
       * viivan kärjen kokoinen.)
       */
      const pisteet = kaari ? kaarenPisteet(kaari) : null;
      const piirraJalki = (e) => lauta.reitit.jalki(pisteet, { paksuus, osuus: e });
      const paataJalki = () => {
        cancelAnimationFrame(jalkiKehys);
        jalkiKehys = 0;
        if (kaari) piirraJalki(1);
      };
      if (kaari && ui.reducedMotion) {
        piirraJalki(1);
      } else if (kaari) {
        // Viiva alkaa lähdöstä eikä vasta ensimmäisestä kehyksestä:
        // kerros on olemassa samalla hetkellä kuin kone lähtee
        // (omistaja 5.9.2026: *"lehtää heti … ja jättää paksun punaisen
        // viivan"*).
        piirraJalki(lennonVaihe(0));
        const askel = (hetki) => {
          if (purettu || ui.dead) return;
          const t = Math.min(1, (hetki - alkuhetki) / Math.max(1, kesto));
          piirraJalki(lennonVaihe(t));
          jalkiKehys = t < 1 ? requestAnimationFrame(askel) : 0;
        };
        jalkiKehys = requestAnimationFrame(askel);
      }

      /*
       * OHITUS PUHUU SAMAA KIELTÄ MOLEMMILLA LAUDOILLA. js/ui.js:n
       * `ohitaLento` vie lennon animaatiot loppuun kutsulla `finish()`;
       * pallolla lento on rAF-silmukka, ja sen loppuun vienti on
       * kuljettajan `paata()` — jäljen sama loppuun vienti, ettei viiva
       * jäisi kasvamaan jo perillä olevan koneen perään, ja
       * kamerasuunnitelman vienti maaliin, ettei kuva jää puoliväliin
       * reittiä.
       */
      return {
        animaatiot: [{
          finish: () => {
            paataJalki();
            kuljettaja?.paata?.();
            paataKameraAjo(true);
          },
        }],
        perilla,
      };
    },

    poistuma() { lauta.lento.poistuma(); },

    pura() {
      if (purettu) return;
      purettu = true;
      /*
       * VIIVA JÄÄ NÄKYVIIN LENNON PÄÄTYTTYÄ ja katoaa vasta tässä, kun
       * saapumiskortti on jo ruudulla ja lauta palaa pelitilaan.
       * Poistuminen on kerroksen oma siirtymä (reitit.js jalki palauttaa
       * pathTransitionDurationin), joten viiva häipyy pehmeästi eikä
       * välähdä pois.
       */
      cancelAnimationFrame(jalkiKehys);
      jalkiKehys = 0;
      lauta.reitit.jalki(null);
      // Kamerasuunnitelma seis ennen laskeutumista: kamera on jo
      // saapumisnäkymässä (sama korkeus ja sama paikka), joten
      // kuljettajan `laske()`:n ajo on nolla-ajo eikä siirtymä hypi.
      paataKameraAjo(true);
      // Kone pois ja kamera sukeltaa kohdekaupunkiin (siirto.js laske).
      kuljettaja?.laske();
      kuljettaja = null;
      // Terävä tila vapautetaan laskeutumisessa: pallo palaa omaan
      // liike/lepo-rytmiinsä (js/pallo.js asetaTila).
      if (laatuPyydetty) {
        laatuPyydetty = false;
        pakotaPallonLaatu(false);
      }
      ui.lentoKaari = null;
      lauta.lento.paata();
    },
  };
}
