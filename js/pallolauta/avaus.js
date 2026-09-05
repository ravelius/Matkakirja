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
 *   valmistele()  lauta lennon tilaan (harso, niukat nimet, kaari)
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
 * ── KAMERA ON JO RAJAUKSESSA, KUN KONE LÄHTEE ─────────────────────
 *
 * Tasokartalla lennon kamera ASETTUU pergamenttiarkin takana eikä aja
 * (omistajan tilaus 25.8.2026), ja lennon ajan kuva on paikallaan.
 * Pallolla tehdään sama: ui.js ajaa kameran tämän kohtauksen antamaan
 * rajaukseen kestolla 0 arkin takana. Rajaus on lähtö- ja
 * kohdekaupungin laatikko täsmälleen samalla kaavalla ja marginaalilla
 * kuin pallon omalla lennolla (siirto.js lennonRajaus,
 * LENNON_RAJAUKSEN_MARGINAALI), joten kuljettajan oma kamera-ajo osuu
 * samaan kohteeseen ja jää nolla-ajoksi — kamera ei nytkähdä koneen
 * lähtiessä. Perillä kuljettajan `laske()` sukeltaa kohdekaupunkiin
 * saapumisnäkymään; se tapahtuu saapumiskortin alla, joten kartta
 * "feidautuu sisään suoraan oikeassa zoomitilassa" kuten kartalla.
 */

import { LENNON_RAJAUKSEN_MARGINAALI, lennonRajaus } from './siirto.js';

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

  return {
    rajaus: {
      bbox: lennonRajaus(board, lahtoPos, kohdePos),
      marginaali: LENNON_RAJAUKSEN_MARGINAALI,
    },

    valmistele() {
      /*
       * NIUKKA LAUTA ENNEN KAMERA-AJOA, kuten tasokartalla: harso ja
       * kahden nimen sääntö ovat voimassa jo silloin kun kuva asettuu
       * rajaukseen, eikä maailma himmene kesken liikkeen.
       */
      lauta.lento.aloita({ lahto, kohde });
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
      // Kone kiitoradalle Lontoon ylle: se on ruudulla jo ennen kuin
      // arkki väistyy, kuten tasokartalla (kone.style.transform).
      kuljettaja.aseta(lahtoPos);
    },

    lenna(kesto) {
      if (!kuljettaja) return { animaatiot: [], perilla: Promise.resolve() };
      const perilla = kuljettaja.hyppaa(lahtoPos, kohdePos, kesto);
      /*
       * OHITUS PUHUU SAMAA KIELTÄ MOLEMMILLA LAUDOILLA. js/ui.js:n
       * `ohitaLento` vie lennon animaatiot loppuun kutsulla `finish()`;
       * pallolla lento on rAF-silmukka, ja sen loppuun vienti on
       * kuljettajan `paata()`.
       */
      return { animaatiot: [{ finish: () => kuljettaja?.paata?.() }], perilla };
    },

    poistuma() { lauta.lento.poistuma(); },

    pura() {
      if (purettu) return;
      purettu = true;
      // Kone pois ja kamera sukeltaa kohdekaupunkiin (siirto.js laske).
      kuljettaja?.laske();
      kuljettaja = null;
      ui.lentoKaari = null;
      lauta.lento.paata();
    },
  };
}
