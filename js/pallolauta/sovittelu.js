/*
 * NIMIÖLAPPUJEN SOVITTELU — GOOGLE EARTHIN MALLI (Fable 21.9.2026,
 * omistaja v1985: *"Ranskan karttanostot pomppivat kun panoroi tai
 * zoomaa, todella häiritsevää"*). Aiempi historia: docs/moduulit/
 * karttapallo.md luku 14 (kaupungin nimi on ensisijainen, laput
 * väistävät) — se sääntö on yhä voimassa, vain väistön TAPA muuttui.
 *
 * Vanha malli ratkaisi asennot uudestaan jokaisessa ladonnassa myös
 * eleen aikana (reunasääntö, keskinäinen väistö, pienet siirrot), ja
 * kun lappujoukko tai reunan ylittäjät vaihtuivat kehyksittäin, kyljet
 * ja siirrot vaihtuivat niiden mukana — nimiöt hyppivät sormen alla.
 *
 * UUSI SÄÄNTÖ (tekninen toteutus Fablen linjaukselle):
 *
 *   1. ASENTO VALITAAN ANKKURIN YMPÄRILTÄ KERRAN JA PIDETÄÄN. Lapulla
 *      on kahdeksan ehdokasasentoa (NOSTOSYM_NIMIO_ASENNOT: neljä kylkeä
 *      ja neljä kulmaa) ilman vapaata siirtoa. Valinta tehdään vain
 *      LEVOSSA (js/pallolauta/nostot.js `sovittele({ lepo })`);
 *      eleen aikana lappu seuraa ankkuria samassa asennossa, ja ruudun
 *      reunan yli saa mennä. Levossa reunasääntö vaihtaa ehdokasta.
 *
 *   2. TÖRMÄYS RATKAISTAAN NÄKYVYYDELLÄ, EI SIIRROLLA. Kun kahdelle
 *      lapulle ei löydy vapaita asentoja, heikompi häivytetään (nostot.js
 *      pitää ikonin ja häivyttää vain nimiön, css ≤ 200 ms) ja palaa,
 *      kun tilaa taas on. Prioriteetti on kiinteä: taso 1 > kaupunki >
 *      taso 2 > taso 3 — TÄSMENNYS 21.9.2026: kaupunki > taso 1 > taso 2
 *      > taso 3 — sitten lyhyempi nimi ensin (sovittelunPainoarvo).
 *
 *   3. HYSTEREESI. Lukittu asento pidetään, jos se on yhä kelvollinen —
 *      lappu ei palaa "omaan" kylkeensä vain siksi, että tilaa vapautui.
 *      Häivytetty lappu palaa vasta, kun jokin ehdokas on vapaa
 *      SOVITTELUN_HYSTEREESI_PX:n marginaalilla, jottei rajatapaus vilku.
 *
 *   4. YKKÖSTASO EI HÄIVY EIKÄ VAIHDA ASENTOA, ellei se osu toiseen
 *      ykköstasoon tai ruudun reunaan. Muut laput väistävät sitä.
 *      Ainoa, mikä sen häivyttää, on kaupungin nimi (kiinteä muste):
 *      silloin ikoni jää ja nimiö häipyy (Fable 21.9.2026).
 *
 * Meren lappu (`meri: true`) pitää rantaviivan esteenä samoin kuin
 * ennen: sen ehdokas ei saa leikata kohdemaan korostuskehää. Aihenosto
 * (`este: true`) sovitellaan viimeisenä kuten ennen.
 *
 * ── MIKSI SOVITTELU ON OMASSA TIEDOSTOSSAAN ────────────────────────
 *
 * Sama päätössarja koskee kahta kerrosta, jotka eivät saa tuntea
 * toisiaan: nimikerros (js/pallolauta/nimet.js) latoo nimet ja on
 * tämän jälkeen KIINTEÄ, nostokerros (js/pallolauta/nostot.js) asettaa
 * omat lappunsa sen ympärille. Kaikki tässä on puhdasta laskentaa
 * ruutulaatikoilla (tests/pallosovittelu.test.mjs); ruudun mitat,
 * ankkurit ja esteet antaa kutsuja, joka myös kantaa lukon ladonnasta
 * toiseen.
 */
import { NOSTOSYM_NIMIO_ASENNOT } from '../fokusnosto-symbolit.js';

/** Ehdokasasennot kokeilujärjestyksessä (kyljet ensin, kulmat perässä). */
export const SOVITTELUN_KYLJET = Object.freeze([...NOSTOSYM_NIMIO_ASENNOT]);
/** Häivytetyn lapun paluun marginaali (px): ehdokas on vapaa tällä varalla. */
export const SOVITTELUN_HYSTEREESI_PX = 6;
/** Prioriteettiluokat (pienempi ensin). */
/*
 * KAUPUNGIN NIMI VOITTAA YKKÖSTASON (Fable 21.9.2026, päätös avoimeen
 * kohtaan): järjestys on kaupunki > taso 1 > taso 2 > taso 3, ja
 * ykköstaso saa häipyä vain kaupungin nimen (kiinteän musteen) tieltä —
 * ikoni jää — ei muiden lappujen.
 */
export const SOVITTELUN_LUOKAT = Object.freeze({
  kaupunki: 0, taso1: 1, taso2: 2, taso3: 3,
});

/** Kelpaako ruutulaatikko ({ x0, y0, x1, y1 }) törmäystestiin. */
export const laatikkoKelpaa = (r) => Boolean(r)
  && Number.isFinite(r.x0) && Number.isFinite(r.y0)
  && Number.isFinite(r.x1) && Number.isFinite(r.y1)
  && r.x1 > r.x0 && r.y1 > r.y0;

/** Kahden ruutulaatikon leikkaus — sama ehto kuin varausruudukossa. */
export const laatikotLimittyvat = (a, b) => laatikkoKelpaa(a) && laatikkoKelpaa(b)
  && a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** Onko laatikko kokonaan reunan sisällä (null-reuna = ei rajaa). */
export const laatikkoSisalla = (r, reuna) => !reuna || !laatikkoKelpaa(r)
  || (r.x0 >= reuna.x0 && r.y0 >= reuna.y0 && r.x1 <= reuna.x1 && r.y1 <= reuna.y1);

/** Pienin siirto, joka toisi laatikon reunan sisään ({ dx, dy }) — mittari. */
export function reunaanSiirto(r, reuna) {
  if (!reuna || !laatikkoKelpaa(r)) return { dx: 0, dy: 0 };
  const dx = r.x0 < reuna.x0 ? reuna.x0 - r.x0 : (r.x1 > reuna.x1 ? reuna.x1 - r.x1 : 0);
  const dy = r.y0 < reuna.y0 ? reuna.y0 - r.y0 : (r.y1 > reuna.y1 ? reuna.y1 - r.y1 : 0);
  return { dx, dy };
}

/** Laatikko kasvatettuna joka suuntaan `vara` pikseliä. */
export const laatikkoVaralla = (r, vara) => (laatikkoKelpaa(r) && vara ? {
  x0: r.x0 - vara, y0: r.y0 - vara, x1: r.x1 + vara, y1: r.y1 + vara,
} : r);

/** Laatikon keskipiste. */
const keski = (r) => ({ x: (r.x0 + r.x1) / 2, y: (r.y0 + r.y1) / 2 });

/** Lyhin keskipiste-etäisyys laatikosta esteisiin (Infinity, jos ei esteitä). */
export function lahinEste(r, esteet) {
  if (!laatikkoKelpaa(r)) return Infinity;
  const k = keski(r);
  let vahin = Infinity;
  for (const e of esteet) {
    const p = keski(e);
    vahin = Math.min(vahin, Math.hypot(p.x - k.x, p.y - k.y));
  }
  return vahin;
}

/**
 * Lapun painoarvo jonossa: pienempi ensin. Luokka ensin (taso 1,
 * kaupunki, taso 2, taso 3), sitten lyhyempi nimi — lyhyt lappu mahtuu
 * useammin ja peittää vähemmän.
 *
 * @param {{ taso?: number, kaupunki?: boolean, nimi?: string }} l
 * @returns {number}
 */
export function sovittelunPainoarvo(l) {
  let luokka = SOVITTELUN_LUOKAT.taso2;
  if (l?.kaupunki) luokka = SOVITTELUN_LUOKAT.kaupunki;
  else if (l?.taso === 1) luokka = SOVITTELUN_LUOKAT.taso1;
  else if (l?.taso === 3) luokka = SOVITTELUN_LUOKAT.taso3;
  const pituus = Math.min(999, String(l?.nimi ?? '').length);
  return luokka * 1000 + pituus;
}

/**
 * Ehdokasasennot lapulle kokeilujärjestyksessä: lukittu asento (jos on),
 * oma kylki, sitten muut kyljet ja kulmat vakiojärjestyksessä.
 */
export function sovittelunEhdokkaat(l, lukittu = null, kyljet = SOVITTELUN_KYLJET) {
  const ulos = [];
  const lisaa = (k) => { if (k && kyljet.includes(k) && !ulos.includes(k)) ulos.push(k); };
  lisaa(lukittu);
  lisaa(l.kylki);
  for (const k of kyljet) lisaa(k);
  return ulos;
}

/**
 * SOVITTELE LAPUT — ks. tiedoston alku.
 *
 * @param {object} p
 * @param {Array} p.laput  [{ avain, kylki, laatikko(kylki, dx, dy, nimio),
 *   taso?, kaupunki?, nimi?, meri?, este? }]
 *   `laatikko` palauttaa lapun ruutulaatikon annetussa asennossa tai
 *   null; `nimio` false tarkoittaa pelkkää ikonia.
 * @param {Array} p.esteet  kiinteän musteen laatikot (nimet, kyltit)
 * @param {Map} [p.lukot]  edellisen sovittelun asennot avaimittain
 *   ({ kylki, nimio }); lukittu kelvollinen asento pidetään (hystereesi)
 * @param {object|null} [p.reuna]  ruudun reuna { x0, y0, x1, y1 } tai null
 * @param {Array} [p.rantaviiva]  kehän laatikot, joita meren lappu väistää
 * @param {Array} [p.kyljet]
 * @param {number} [p.hystereesi]  häivytetyn paluun marginaali (px)
 * @returns {{ asennot: Map, piilotettu: number, kylkiVaihtui: number,
 *   siirretty: number, jaljella: number, reunalta: number, kokeiltuja: number }}
 *   `siirretty` on aina 0 (ei vapaata siirtoa); kenttä jää mittareille.
 */
export function sovitteleLaput({
  laput = [], esteet = [], lukot = null, reuna = null, rantaviiva = [],
  kyljet = SOVITTELUN_KYLJET, hystereesi = SOVITTELUN_HYSTEREESI_PX,
} = {}) {
  /*
   * IKONIT OVAT ESTEITÄ (nostot.js TYYPPIMERKIT LÄHIZOOMISSA, Fable
   * 21.9.2026: *"merkit eivät osu nimiöiden päälle"*). Ikoni ei väistä
   * ketään — se on kiinni pisteessään — joten nimiön on väistettävä
   * muiden nostojen ikoneja. Laatikko on lapun oma ilman nimiötä
   * (`laatikko(kylki, 0, 0, false)`); oma ikoni ei estä omaa nimiötä
   * (`avain`, ks. estaa).
   */
  const ikonit = laput.map((l) => (typeof l.laatikko === 'function'
    ? { ...l.laatikko(l.kylki, 0, 0, false), avain: l.avain } : null)).filter(laatikkoKelpaa);
  const kiinteat = [...esteet, ...ikonit].filter(laatikkoKelpaa);
  const ranta = rantaviiva.filter(laatikkoKelpaa);
  const asennot = new Map();
  const sijoitetut = []; // jo asetettujen lappujen laatikot (näkyvät nimiöt)
  let kylkiVaihtui = 0;
  let piilotettu = 0;
  let reunalta = 0;
  let kokeiltuja = 0;

  const rannalla = (r, l) => Boolean(l?.meri) && ranta.some((e) => laatikotLimittyvat(r, e));
  // Ikoni (este, jolla on avain) ei estä lappua itseään eikä kaupunkia
  // tai ykköstasoa: ne väistävät vain nimiä, kiinteää mustetta ja
  // toisiaan (sääntö 4 alla), muut laput väistävät niitä — myös ikonia.
  const vahva = (l) => Boolean(l?.kaupunki) || l?.taso === 1;
  const estaa = (rr, l) => kiinteat.some((e) => (!e.avain || (!vahva(l) && e.avain !== l?.avain)) && laatikotLimittyvat(rr, e));
  /*
   * LIIKEVARA (omistaja 21.9.2026, työpöytä v2026: nostot tupsahtavat
   * panoroitaessa jälkikäteen): ruudun ulkopuolella liikevarassa oleva
   * lappu (`l.reuna`, nostot.js LIIKEVARA) sovitellaan omaa laajempaa
   * reunaansa vasten — ruudun reuna koskee vain ruudussa olevia.
   */
  const reunaLle = (l) => l?.reuna ?? reuna;
  const vapaa = (r, l, vara = 0) => {
    const rr = laatikkoVaralla(r, vara);
    return laatikkoSisalla(r, reunaLle(l))
      && !rannalla(r, l)
      && !estaa(rr, l)
      && !sijoitetut.some((e) => laatikotLimittyvat(rr, e));
  };

  /*
   * JONO: `este`-laput (aihenostot) viimeisenä kuten ennen; muut
   * painoarvon mukaan (taso 1, kaupunki, taso 2, taso 3; lyhyt nimi
   * ensin) ja tasapelissä lähinnä kiinteää mustetta oleva ensin.
   */
  /*
   * RUUDUSSA OLEVA VOITTAA TULOKKAAN (LIIKEVARA, Fable 21.9.2026:
   * *"ruudussa olevien koko ja paikka eivät muutu"*): lappu, jolla on
   * jo näkyvä lukittu asento, käsitellään ennen lukotonta tulokasta
   * (samassa este-luokassa), jotta liikevarasta ruutuun tullut nimiö
   * väistää tai häipyy — ei se, joka pelaajalla oli jo silmissä.
   * Ykköstason pakkosääntö (alla) pysyy voimassa tulokkaillekin.
   */
  const lukittuNakyva = (l) => { const k = lukot?.get(l.avain); return Boolean(k) && k.nimio !== false; };
  const jono = laput
    .map((l) => ({
      l,
      paino: sovittelunPainoarvo(l),
      d: lahinEste(l.laatikko(l.kylki, 0, 0, true), kiinteat),
      vanha: lukittuNakyva(l) ? 0 : 1,
    }))
    .sort((a, b) => (Number(Boolean(a.l.este)) - Number(Boolean(b.l.este)))
      || (a.vanha - b.vanha) || (a.paino - b.paino) || (a.d - b.d))
    .map((rivi) => rivi.l);

  for (const l of jono) {
    const lukko = lukot?.get(l.avain) ?? null;
    const oliPiilossa = Boolean(lukko) && lukko.nimio === false;
    const lahto = lukko?.kylki ?? l.kylki;
    // Häivytetty palaa vain marginaalilla (hystereesi); näkyvä pitää
    // asentonsa ilman marginaalia, jottei se ala väistää turhaan.
    const vara = oliPiilossa ? hystereesi : 0;
    let valittu = null;
    for (const k of sovittelunEhdokkaat(l, oliPiilossa ? null : (lukko?.kylki ?? null), kyljet)) {
      const r = l.laatikko(k, 0, 0, true);
      kokeiltuja += 1;
      if (!laatikkoKelpaa(r)) continue;
      if (vapaa(r, l, vara)) { valittu = { kylki: k, r }; break; }
    }
    if (!valittu && l.taso === 1) {
      /*
       * YKKÖSTASO EI HÄIVY MUIDEN LAPPUJEN TIELTÄ (sääntö 4): jos
       * yksikään ehdokas ei ole vapaa, se pitää asentonsa reunan
       * sisällä kiinteästä musteesta vapaana (osuu vain toisiin
       * lappuihin, jotka väistävät sitä). VAIN KAUPUNGIN NIMI JA REUNA
       * VOITTAVAT (Fable 21.9.2026): jos jokainen reunan sisällä oleva
       * ehdokas osuu kiinteään musteeseen — tai yksikään ei mahdu
       * reunan sisään — nimiö häivytetään ja ikoni jää.
       */
      const ehdokkaat = sovittelunEhdokkaat(l, lahto, kyljet);
      const kelpaa = (e, { sisalla, musteeton }) => {
        const r = l.laatikko(e, 0, 0, true);
        if (!laatikkoKelpaa(r)) return false;
        if (sisalla && !laatikkoSisalla(r, reunaLle(l))) return false;
        return !musteeton || (!rannalla(r, l) && !estaa(r, l));
      };
      const k = ehdokkaat.find((e) => kelpaa(e, { sisalla: true, musteeton: true })) ?? null;
      const r = k ? l.laatikko(k, 0, 0, true) : null;
      if (laatikkoKelpaa(r)) valittu = { kylki: k, r, pakko: true };
    }
    if (valittu) {
      const vaihtui = valittu.kylki !== lahto;
      if (vaihtui) {
        kylkiVaihtui += 1;
        if (!laatikkoSisalla(l.laatikko(lahto, 0, 0, true), reunaLle(l))) reunalta += 1;
      }
      sijoitetut.push(valittu.r);
      asennot.set(l.avain, {
        kylki: valittu.kylki,
        dx: 0,
        dy: 0,
        nimio: true,
        syy: valittu.pakko ? 'pakko' : (vaihtui ? 'kylki' : (lukko ? 'lukko' : 'oma')),
      });
      continue;
    }
    // Häivytys: nimiö pois, ikoni jää samaan asentoon. Ikoni ei ole
    // este muille — se on pieni ja kiinni omassa pisteessään.
    piilotettu += 1;
    // Mittareille: mikä esti oman kyljen (reuna, ranta, kiinteä muste vai toinen lappu).
    const oma = l.laatikko(lahto, 0, 0, true);
    const este = !laatikkoKelpaa(oma) ? 'laatikko'
      : !laatikkoSisalla(oma, reunaLle(l)) ? 'reuna'
        : rannalla(oma, l) ? 'ranta'
          : kiinteat.some((e) => laatikotLimittyvat(oma, e)) ? 'kiintea' : 'lappu';
    asennot.set(l.avain, {
      kylki: lahto, dx: 0, dy: 0, nimio: false, syy: 'piilossa', este,
    });
  }
  return {
    asennot, piilotettu, kylkiVaihtui, siirretty: 0, jaljella: 0, reunalta, kokeiltuja,
  };
}
