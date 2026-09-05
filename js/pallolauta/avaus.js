/*
 * PALLOLAUDAN AVAUSLENTO — Lontoo → aloituskaupunki karttapallolla
 * (vaihe 5b, docs/moduulit/karttapallo.md luku 4 rivi "Aloituslento
 * Lontoosta" ja luku 7 vaihe 5).
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ───────────────────────────────────────
 *
 * Avauslennon KOREOGRAFIA — pergamenttiarkki, kamera-ajo rajaukseen,
 * kertojan luenta, matkustamon äänimaisema, repliikin kirjoitus,
 * isoisän valokuva, ohitusnuoli, saapumiskortti ja pöllön kuplat — on
 * yhdessä paikassa js/ui.js:ssä (aloituslentoSisalla) kummallekin
 * laudalle. Tämä moduuli on sen LAUDAN OMA OSA, täsmälleen samalla
 * jaolla kuin siirrossa (js/ui.js nappulanKuljettaja,
 * js/pallolauta/siirto.js): ui.js kertoo mitä tapahtuu ja milloin,
 * lauta kertoo miltä se näyttää.
 *
 * Kohtauksen sopimus (js/ui.js aloituslennonKohtaus):
 *   rajaus        { bbox, marginaali } laudan yksiköissä — null tarkoittaa,
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
 *   3. ISOISÄN KUVA — kortin koko ja reunojen häivytys ovat css
 *      (.lento-valokuva), ei tämän moduulin asia.
 *
 * ── KOLME OMISTAJAN TILAUSTA 5.9.2026 KLO 23.10 ───────────────────
 *
 * Työpöytäkaappauksesta avauslennolta (Lontoo → Ateena), sanatarkasti:
 * *"lentokone saisi tehdä saman paksun viivan kuin etusivulla. näkymä
 * saisi olla zoomautunut hieman lähemmäs. pallo voisi pyöriä hitaasti
 * lennon aikana."* Kolme lukua alempana vastaa kutakin:
 *
 *   AVAUSLENNON_VIIVAN_PX      paksu punainen viiva koneen perässä
 *   AVAUSLENNON_RAJAUKSEN_MARGINAALI   tiukempi rajaus kuin muilla lennoilla
 *   AVAUSLENNON_PYORINTA_AST   pallon hidas kierto lennon aikana
 *
 * Kolme tilausta kytkeytyvät toisiinsa: mitä tiukempi rajaus, sitä
 * vähemmän pyörinnälle jää varaa ennen kuin Lontoo tai Ateena valuu
 * ulos kuvasta. Näkymä lähtee siksi puoli pyörintää lännempää ja päätyy
 * puoli pyörintää idemmäs: kamera SEURAA konetta, ja kone on kuvassa
 * lennon molemmissa päissä. Reitin toinen pää saa valua kuvasta lennon
 * kuluessa — jälki on jälki. Mitattu Chromiumilla 1400 × 900 ja
 * 390 × 844 (luvut alempana kunkin vakion kohdalla).
 *
 * ── KAMERA ON JO RAJAUKSESSA, KUN KONE LÄHTEE ─────────────────────
 *
 * Tasokartalla lennon kamera ASETTUU pergamenttiarkin takana eikä aja
 * (omistajan tilaus 25.8.2026), ja lennon ajan kuva on paikallaan.
 * Pallolla tehdään sama: ui.js ajaa kameran tämän kohtauksen antamaan
 * rajaukseen kestolla 0 arkin takana. Rajaus on lähtö- ja kohdekaupungin
 * laatikko samalla kaavalla kuin pallon omalla lennolla (siirto.js
 * lennonRajaus) — mutta AVAUKSELLA ON OMA MARGINAALINSA ja oma
 * lähtökeskipisteensä (5.9.2026, kolme tilausta alla). Kuljettajan oma
 * kamera-ajo (siirto.js hyppaa, LENNON_KAMERA_MS) osuisi siksi eri
 * kohteeseen — mutta se ei ehdi maalata kertaakaan: `lenna` käynnistää
 * heti perään pyörinnän ajon, ja ajaKamera pysäyttää edellisen ajon
 * samassa kehyksessä. Kamera ei siis nytkähdä koneen lähtiessä.
 * Perillä kuljettajan `laske()` sukeltaa kohdekaupunkiin
 * saapumisnäkymään; se tapahtuu saapumiskortin alla, joten kartta
 * "feidautuu sisään suoraan oikeassa zoomitilassa" kuten kartalla.
 */

import { pakotaPallonLaatu } from '../pallo.js';
import { hypynVaihe } from '../siirtokoreografia.js';
import { PALLOLAUDAN_LEVEYS } from './kamera.js';
import { REITIN_KORKEUS, lentokaarenKohta } from './reitit.js';
import { lennonRajaus } from './siirto.js';

/**
 * AVAUSLENNON RAJAUS ON TIUKEMPI KUIN MUIDEN LENTOJEN (omistaja
 * 5.9.2026: *"näkymä saisi olla zoomautunut hieman lähemmäs"*).
 * Tavallinen lento käyttää LENNON_RAJAUKSEN_MARGINAALIa (0,35), joka
 * jättää kaupunkien ympärille reilusti ilmaa; avauksessa pallo saa
 * täyttää enemmän ruutua, koska kuvassa on vain kaksi kaupunkia ja
 * yksi kaari. Mitattuna Lontoo → Ateena: 44,3° → 36,5° (1400 × 900) ja
 * 40,6° → 33,4° (390 × 844), eli noin viidennes lähempänä.
 */
export const AVAUSLENNON_RAJAUKSEN_MARGINAALI = 0.2;
/**
 * PALLO PYÖRII HITAASTI LENNON AIKANA (omistaja 5.9.2026). Kamera
 * liukuu tämän verran itään koko lennon mitalla — puolet ennen ja
 * puolet jälkeen bbox:n keskikohdan, jolloin liike SEURAA konetta eikä
 * vain siirrä kuvaa. Lennon kesto on 4,8–20 s, joten kulmanopeus on
 * enintään noin asteen sekunnissa: liike näkyy, mutta se ei kiirehdi.
 * Reduced motion: ei pyörintää lainkaan.
 */
export const AVAUSLENNON_PYORINTA_AST = 5;
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
 * pikselin levyiseksi eli näkymättömiin. AVOIN: samat "asteina"-
 * kommentit ovat myös reitit.js:n ja linssien paksuusvakioissa
 * (MATKAREITIN_PAKSUUS_AST 0,05 jne.) — ne ovat siis paljon ohuempia
 * kuin oli tarkoitus, mutta niiden korjaus on oma työnsä eikä kuulu
 * tähän tilaukseen.
 */
export const AVAUSLENNON_VIIVAN_PX = 11;
/** Jäljen pisteitä koko kaarella; kasvava jälki saa niistä osuutensa. */
export const AVAUSLENNON_JALJEN_PISTEET = 64;
/** Lautayksiköitä yhdessä pituusasteessa pallolaudalla. */
const YKSIKKOA_ASTEESSA = PALLOLAUDAN_LEVEYS / 360;

/**
 * Pyörinnän pehmennys: liikkeelle ja pysähdykseen pehmeästi, välissä
 * lähes tasainen. Ei siirtoajon trapetsia — se on tehty lyhyille
 * kamera-ajoille, ei koko lennon mittaiselle liu'ulle.
 */
export function pyorinnanPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
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

  /*
   * NÄKYMÄ LÄHTEE PUOLI PYÖRINTÄÄ LÄNNEMPÄÄ. Rajauslaatikkoa siirretään
   * länteen puolella pyörinnästä, jolloin kamera on lennon alussa
   * Lontoon puolella ja lopussa Ateenan puolella: liike SEURAA konetta,
   * ja kone on kuvassa lennon molemmissa päissä. Laatikon LEVEYS ei
   * muutu, joten zoomi on tasan se, minkä marginaali antaa.
   *
   * KAPEALLA RUUDULLA TÄMÄ ON PARANNUS. Mitattu Chromiumilla 5.9.2026
   * (kotelo 374 × 777): ennen tätä Ateena jäi 11 px kotelon oikean
   * reunan ULKOPUOLELLE koko lennon ajan, eli kone laskeutui ruudun
   * ulkopuolelle; nyt kone on kuvassa sekä lähdössä (x 115) että
   * perillä (x 356). Reitin toinen pää saa valua kuvasta lennon
   * kuluessa — jälki on jälki. Työpöydällä (1379 × 826) varaa on
   * reunaan 183 px joka suuntaan.
   */
  const bbox = lennonRajaus(board, lahtoPos, kohdePos);
  const pyorinta = ui.reducedMotion ? 0 : AVAUSLENNON_PYORINTA_AST;
  const rajaus = {
    bbox: { ...bbox, x: bbox.x - (pyorinta / 2) * YKSIKKOA_ASTEESSA },
    marginaali: AVAUSLENNON_RAJAUKSEN_MARGINAALI,
  };

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
       * kun kamera liukuu koko lennon läpi (AVAUSLENNON_PYORINTA_AST).
       * Sama vipu kuin keksintölinssin ajolla (js/pallo.js
       * pakotaPallonLaatu, omistaja 5.9.2026: *"pidä kokoajan terävä
       * tila päällä"*); pyytäjiä lasketaan, joten vapautus `pura`:ssa
       * ei voi sammuttaa toisen pyytäjän terävyyttä.
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
      kuljettaja = ui.nappulanKuljettaja(ui.game.player, { lento: true });
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
      const nyt = lauta.kamera.kameranTila();
      const alkuhetki = performance.now();
      const perilla = kuljettaja.hyppaa(lahtoPos, kohdePos, kesto);

      /*
       * ══════════════════════════════════════════════════════════════
       * PALLO PYÖRII HITAASTI LENNON AIKANA (omistaja 5.9.2026)
       * ══════════════════════════════════════════════════════════════
       *
       * Ajo lähtee VASTA kuljettajan oman ajon jälkeen ja korvaa sen.
       * Kuljettaja ajaa kameran lennon rajaukseen (siirto.js hyppaa,
       * LENNON_KAMERA_MS) — avauksessa kamera on jo siellä, joten se ajo
       * ei liikuttaisi mitään, ja tämä pidempi liuku ottaa sen paikan
       * samassa kehyksessä (ajaKamera pysäyttää edellisen ajon eikä
       * kumpikaan ehdi maalata). Ele koteloon pysäyttää pyörinnän kuten
       * minkä tahansa kamera-ajon.
       */
      if (!ui.reducedMotion && nyt) {
        void lauta.kamera.ajaKamera(
          { lat: nyt.lat, lng: nyt.lng + AVAUSLENNON_PYORINTA_AST, korkeus: nyt.korkeus },
          { kesto, pehmennys: pyorinnanPehmennys },
        );
      }

      /*
       * ══════════════════════════════════════════════════════════════
       * PAKSU PUNAINEN VIIVA KONEEN PERÄSSÄ (omistaja 5.9.2026)
       * ══════════════════════════════════════════════════════════════
       *
       * Sanatarkasti: *"lentokone saisi tehdä saman paksun viivan kuin
       * etusivulla."* Jälki kasvaa samasta kellosta kuin kone
       * (hypynVaihe) ja samalla kaarella (reitit.js lentokaarenKohta),
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
        piirraJalki(hypynVaihe(0).e);
        const askel = (hetki) => {
          if (purettu || ui.dead) return;
          const t = Math.min(1, (hetki - alkuhetki) / Math.max(1, kesto));
          piirraJalki(hypynVaihe(t).e);
          jalkiKehys = t < 1 ? requestAnimationFrame(askel) : 0;
        };
        jalkiKehys = requestAnimationFrame(askel);
      }

      /*
       * OHITUS PUHUU SAMAA KIELTÄ MOLEMMILLA LAUDOILLA. js/ui.js:n
       * `ohitaLento` vie lennon animaatiot loppuun kutsulla `finish()`;
       * pallolla lento on rAF-silmukka, ja sen loppuun vienti on
       * kuljettajan `paata()` — ja jäljen sama loppuun vienti, ettei
       * viiva jäisi kasvamaan jo perillä olevan koneen perään.
       */
      return {
        animaatiot: [{
          finish: () => {
            paataJalki();
            kuljettaja?.paata?.();
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
