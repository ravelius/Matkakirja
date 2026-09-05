/*
 * PALLOLAUDAN SIIRTO — nappulan (ja lennolla koneen) kuljettaja pallolla
 * (vaihe 2, docs/moduulit/karttapallo.md luku 4.2: nappula liikkeessä
 * **D** = pelin oma DOM-elementti kotelon päällä, paikka joka kehys
 * getScreenCoords-kutsulla; lento = kaari **A** + kone **D**).
 *
 * KOREOGRAFIA EI OLE TÄÄLLÄ. Ennakkozoomi, saatto, nappulan lähdön
 * viive, äänet, siirtymämusiikki ja tauot ovat js/ui.js
 * animatePawnSisalla — yhdessä paikassa kummallekin laudalle — ja tämä
 * moduuli toteuttaa vain kuljettajan sopimuksen (ui.nappulanKuljettaja):
 * nosta / aseta / hyppaa / laske. Luvut ja käyrät tulevat
 * js/siirtokoreografia.js:stä (hypynVaihe, hypynHuippu), joten hyppy on
 * täsmälleen sama kaari kuin tasokartan hyppaaAskel — vaaka ease-in-out,
 * pysty paraabeli, varjo kutistuu ja haalenee laella (#100).
 *
 * NAPPULA PYSYY PALLON PINNALLA. Elementin paikka lasketaan JOKA KEHYS
 * pallon pinnan pisteestä (getScreenCoords), myös silloin kun nappula
 * seisoo paikallaan lähtöruudussaan saaton alkaessa (300 ms viive) —
 * kamera liikkuu, nappula pysyy maassa. Hypyn aikana pinnan piste
 * kulkee REITIN POLYA pitkin (js/rules.js pointAlong, sama kaava kuin
 * pixelOf ja askelhelmillä), joten pitkä merireitti kaartaa pallolla
 * samalla viivalla kuin reittihelmet, ja korkeus lisätään ruudun
 * y-suuntaan. Hypyn huippu mitataan ruudun pikseleinä (hypynHuippu:
 * sama 9–30 haarukka kuin tasokartalla laudan yksikköinä).
 *
 * LENTO: kone lentää isoympyrää lähtökaupungista kohteeseen samalla
 * kaarella, jonka js/pallolauta/reitit.js piirtää (arcsData,
 * lentokaarenKorkeus), ja kamera ajaa ensin rajaukseen, johon lähtö ja
 * kohde mahtuvat (tasokartan maidenBbox-vastine: kaupunkiparin laatikko
 * marginaalilla — pallolla ei ole maiden monikulmioita, ja Kartta-olion
 * sisäisiä metodeja ei kutsuta ristiin). Perillä kamera sukeltaa
 * kohteeseen (kotiin) ja nappula ilmestyy H-merkkinä (lauta.paivita).
 *
 * Reduced motion: aseta hyppää perille, kamera-ajot ovat hyppyjä
 * (kamera.js), kone ei lennä vaan ilmestyy perille.
 *
 * AVAUSLENTO KÄYTTÄÄ SAMAA KULJETTAJAA (vaihe 5b,
 * js/pallolauta/avaus.js): Lontoo → aloituskaupunki on pallolla sama
 * kaari ja sama kone kuin mikä tahansa lento, ja js/ui.js:n avauksen
 * koreografia — repliikki, kertoja, kabiiniääni, ohitus, saapumiskortti
 * — pysyy yhdessä paikassa kummallekin laudalle. Ohitus tarvitsee
 * kuljettajalta yhden lisän: `paata()` alla.
 */

import { pixelOf, pointAlong } from '../rules.js';
import { hypynHuippu, hypynVaihe } from '../siirtokoreografia.js';
import { PALLOKAMERAN_AJO_MS } from './kamera.js';
import { nappulaElementti, MERKIN_KORKEUS } from './merkit.js';
import { isoympyranPiste } from './reitit.js';

/** Liikkuvan nappulan svg:n mitat (nappulaElementti): jalka alareunassa. */
const NAPPULAN_LEVEYS_PX = 32;
const NAPPULAN_KORKEUS_PX = 36;
/** Jalusta hitusen pisteen alapuolella kuten tasokartalla (NAPPULAN_JALKA_Y). */
const NAPPULAN_JALKA_Y = 3.5;
/** Lennon kamera-ajo rajaukseen: ripeä, jotta kone lähtee kartan jo liikkuessa. */
export const LENNON_KAMERA_MS = 900;
/** Lennon rajauksen marginaali (osuus laatikosta joka reunalla). */
export const LENNON_RAJAUKSEN_MARGINAALI = 0.35;
/** Koneen koko ruudulla (px) ja kaaren korkeuden ruutuvastine pallon säteinä. */
const KONEEN_KOKO_PX = 44;

/**
 * Reitin osuudet, joilla `pos` on reitillä `reitti`: 0 = reitin a-pää,
 * 1 = b-pää, välipiste idx/steps. Null, jos pos ei ole tällä reitillä.
 */
function reitinOsuus(reitti, pos) {
  if (!reitti) return null;
  if (pos.type === 'edge') return pos.edge === reitti.id ? pos.idx / reitti.steps : null;
  if (pos.type === 'city') {
    if (reitti.a === pos.city) return 0;
    if (reitti.b === pos.city) return 1;
  }
  return null;
}

/**
 * Lennon rajaus: lähtö ja kohde laudan yksiköissä (marginaali erikseen,
 * LENNON_RAJAUKSEN_MARGINAALI). Vietynä, koska AVAUSLENTO PALLOLLA
 * (js/pallolauta/avaus.js) tarvitsee TÄSMÄLLEEN saman laatikon: se ajaa
 * kameran rajaukseen jo pergamenttiarkin takana, ja kun kuljettajan oma
 * ajo (hyppaa alla) laskee saman kohteen, ajo on nolla-ajo eikä kamera
 * nytkähdä koneen lähtiessä.
 */
export function lennonRajaus(board, a, b) {
  const pa = pixelOf(board, a);
  const pb = pixelOf(board, b);
  const x = Math.min(pa.x, pb.x);
  const y = Math.min(pa.y, pb.y);
  return { x, y, w: Math.abs(pb.x - pa.x), h: Math.abs(pb.y - pa.y) };
}

/** Reitti, jolla kaksi peräkkäistä paikkaa ovat (askel on aina yhdellä reitillä). */
function yhteinenReitti(board, a, b) {
  const ehdokkaat = [];
  if (a.type === 'edge') ehdokkaat.push(a.edge);
  if (b.type === 'edge') ehdokkaat.push(b.edge);
  if (a.type === 'city' && b.type === 'city') {
    ehdokkaat.push(`${a.city}|${b.city}`, `${b.city}|${a.city}`);
  }
  for (const id of ehdokkaat) {
    const reitti = board.edgeById.get(id);
    if (!reitti?.poly?.length) continue;
    if (reitinOsuus(reitti, a) !== null && reitinOsuus(reitti, b) !== null) return reitti;
  }
  return null;
}

/**
 * Kuljettaja pallolle. `lauta` antaa pallon, kotelon, kameran, asteet ja
 * merkkien päivityksen (js/pallolauta/lauta.js).
 */
export function luoNappulanKuljettaja({ ui, lauta, player, lento = false }) {
  const { pallo, kotelo, kamera } = lauta;
  const { board } = ui.game;
  let el = null;
  let hahmo = null;
  let varjo = null;
  let ankkuri = null; // pos, jossa nappula lepää (ei hypyssä)
  let hyppy = null; // { a, b, reitti, ta, tb, alku, kesto, huippu, valmis }
  let kehys = 0;
  let edellinenRuutu = null; // koneen suunta

  /** Pallon pinnan piste ruudulla (kotelon px) laudan kohdasta. */
  const ruutu = (kohta, korkeus = MERKIN_KORKEUS) => {
    const a = lauta.asteet(kohta);
    if (!a) return null;
    return pallo.getScreenCoords(a.lat, a.lon, korkeus);
  };

  /** Laudan kohta hypyn osuudella e: reitin polya pitkin tai suoraan. */
  const hypynKohta = (h, e) => {
    if (h.reitti) return pointAlong(h.reitti.poly, h.ta + (h.tb - h.ta) * e);
    const a = pixelOf(board, h.a);
    const b = pixelOf(board, h.b);
    return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e };
  };

  /* ---- nappula ------------------------------------------------------ */

  const piirraNappula = (hetki) => {
    let p = null;
    let korkeus = 0;
    let osuus = 0;
    if (hyppy) {
      const t = Math.min(1, (hetki - hyppy.alku) / hyppy.kesto);
      const { e, nousu } = hypynVaihe(t);
      p = ruutu(hypynKohta(hyppy, e));
      korkeus = hyppy.huippu * nousu;
      osuus = nousu;
      if (t >= 1) {
        ankkuri = hyppy.b;
        const { valmis } = hyppy;
        hyppy = null;
        valmis();
      }
    } else if (ankkuri) {
      p = ruutu(pixelOf(board, ankkuri));
    }
    if (!p) return;
    el.style.transform = `translate(${(p.x - NAPPULAN_LEVEYS_PX / 2).toFixed(2)}px, ${(p.y - NAPPULAN_KORKEUS_PX).toFixed(2)}px)`;
    // Sama kolmijako kuin tasokartalla (js/ui.js hyppaaAskel): vain
    // hahmo nousee, varjo jää pintaan, kutistuu ja haalenee.
    hahmo?.setAttribute('transform', `translate(0,${(-korkeus).toFixed(2)})`);
    varjo?.setAttribute('transform', `translate(2,${NAPPULAN_JALKA_Y}) scale(${(1 - 0.4 * osuus).toFixed(3)})`);
    if (varjo) varjo.style.opacity = (1 - 0.55 * osuus).toFixed(3);
  };

  /* ---- kone (lento) -------------------------------------------------- */

  const koneElementti = () => {
    const kone = document.createElement('div');
    kone.className = 'pallolauta-kone pawn-moving';
    kone.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-22 -22 44 44');
    svg.setAttribute('width', String(KONEEN_KOKO_PX));
    svg.setAttribute('height', String(KONEEN_KOKO_PX));
    // Sama kone kuin lentokalvolla ja avauslennolla (js/ui.js
    // animateFlightSisalla): runko, siivet ja pyrstö ylhäältä.
    const polku = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    polku.setAttribute('d', 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
      + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z');
    polku.setAttribute('class', 'flight-plane-body');
    polku.setAttribute('transform', 'scale(1.3)');
    svg.appendChild(polku);
    kone.appendChild(svg);
    return kone;
  };

  const piirraKone = (hetki) => {
    let piste = null;
    if (hyppy) {
      const t = Math.min(1, (hetki - hyppy.alku) / hyppy.kesto);
      const { e } = hypynVaihe(t);
      const { kaari } = hyppy;
      const kohta = isoympyranPiste(kaari.alku, kaari.loppu, e);
      // Kone kaaren korkeudella: sama paraabeli kuin kaaren muodolla.
      const korkeus = kaari.korkeus * 4 * e * (1 - e) + MERKIN_KORKEUS;
      piste = pallo.getScreenCoords(kohta.lat, kohta.lng, korkeus);
      if (t >= 1) {
        ankkuri = hyppy.b;
        const { valmis } = hyppy;
        hyppy = null;
        valmis();
      }
    } else if (ankkuri) {
      piste = ruutu(pixelOf(board, ankkuri));
    }
    if (!piste) return;
    let kulma = 0;
    if (edellinenRuutu) {
      const dx = piste.x - edellinenRuutu.x;
      const dy = piste.y - edellinenRuutu.y;
      if (Math.hypot(dx, dy) > 0.5) kulma = (Math.atan2(dy, dx) * 180) / Math.PI;
      else kulma = edellinenRuutu.kulma;
    }
    edellinenRuutu = { x: piste.x, y: piste.y, kulma };
    el.style.transform = `translate(${(piste.x - KONEEN_KOKO_PX / 2).toFixed(2)}px, `
      + `${(piste.y - KONEEN_KOKO_PX / 2).toFixed(2)}px) rotate(${kulma.toFixed(1)}deg)`;
  };

  /* ---- silmukka ------------------------------------------------------ */

  const silmukka = (hetki) => {
    if (!el) return;
    if (ui.dead) { pura(); return; }
    if (lento) piirraKone(hetki); else piirraNappula(hetki);
    kehys = requestAnimationFrame(silmukka);
  };

  function pura() {
    cancelAnimationFrame(kehys);
    kehys = 0;
    if (hyppy) {
      // Kuollut peli tai keskeytys: hyppy loppuun heti, ettei siirto jää
      // odottamaan lupausta ikuisesti.
      const { valmis } = hyppy;
      hyppy = null;
      valmis();
    }
    el?.remove();
    el = null;
  }

  return {
    nosta: () => {
      if (el) return;
      lauta.heraa();
      el = lento
        ? koneElementti()
        : nappulaElementti(ui, 'pallolauta-nappula pallolauta-liikkuva pawn-moving', false);
      el.dataset.vaihe = 'lepo';
      if (!lento) {
        hahmo = el.querySelector('.pawn-hahmo');
        varjo = el.querySelector('.pawn-varjo');
      }
      kotelo.appendChild(el);
      kehys = requestAnimationFrame(silmukka);
    },
    aseta: (pos) => {
      ankkuri = pos;
      hyppy = null;
      el.dataset.vaihe = 'lepo';
      if (lento) piirraKone(performance.now()); else piirraNappula(performance.now());
    },
    hyppaa: (a, b, kesto) => new Promise((valmis) => {
      if (!el || ui.reducedMotion) {
        ankkuri = b;
        valmis();
        return;
      }
      lauta.heraa();
      el.dataset.vaihe = 'hyppy';
      if (lento) {
        const lahto = a.type === 'city' ? board.cityById.get(a.city) : null;
        const kohde = b.type === 'city' ? board.cityById.get(b.city) : null;
        const kaari = lahto && kohde ? lauta.reitit.lentokaari(lahto, kohde) : null;
        if (!kaari) { ankkuri = b; valmis(); return; }
        // Kamera rajaukseen, johon lähtö ja kohde mahtuvat; ajoa ei
        // odoteta — kone lähtee kartan jo liikkuessa, ja paikka lasketaan
        // joka kehys, joten kone pysyy kaarellaan kameran liikkuessa.
        void kamera.ajaKamera(
          { bbox: lennonRajaus(board, a, b), marginaali: LENNON_RAJAUKSEN_MARGINAALI },
          { kesto: LENNON_KAMERA_MS },
        );
        edellinenRuutu = null;
        hyppy = { a, b, kaari, alku: performance.now(), kesto, valmis };
        return;
      }
      const reitti = yhteinenReitti(board, a, b);
      const pa = ruutu(pixelOf(board, a));
      const pb = ruutu(pixelOf(board, b));
      const matka = pa && pb ? Math.hypot(pb.x - pa.x, pb.y - pa.y) : 0;
      hyppy = {
        a,
        b,
        reitti,
        ta: reitti ? reitinOsuus(reitti, a) : 0,
        tb: reitti ? reitinOsuus(reitti, b) : 1,
        alku: performance.now(),
        kesto,
        huippu: hypynHuippu(matka),
        valmis,
      };
    }),
    /**
     * OHITUS VIE HYPYN LOPPUUN HETI (js/ui.js ohitaLento, omistaja
     * 26.8.2026: *"napauttamalla ruutua animaatio katkeaa kesken ja
     * pelaaja pääsee siirtymään mantereelle välittömästi"*).
     *
     * Tasokartalla lento on selaimen oma animaatio ja ohitus on sen
     * `finish()`; pallolla kone kulkee rAF-silmukassa, joten sama teko
     * on tämä: kesken oleva hyppy päätetään perille, lupaus ratkeaa ja
     * kone piirretään kohteen ylle. Ilman tätä ohitus jäisi odottamaan
     * juuri sitä lentoa, jonka pelaaja äsken katkaisi.
     */
    paata: () => {
      if (!hyppy) return;
      const { b, valmis } = hyppy;
      hyppy = null;
      ankkuri = b;
      valmis();
      if (el) { if (lento) piirraKone(performance.now()); else piirraNappula(performance.now()); }
    },
    laske: () => {
      const perilla = ankkuri;
      pura();
      // Paikallaan oleva nappula ilmestyy perille lauta.paivitassa; tämä
      // kertoo, ettei se ole teleportti (kamera ei sukella perään)…
      if (perilla) lauta.merkitseNappulanPaikka(perilla);
      // …paitsi lennolla: laskeutumisen jälkeen kamera sukeltaa
      // kohteeseen saapumisnäkymään, kuten kartalla maanvaihdon ajo.
      if (lento) void kamera.kotiin({ kesto: PALLOKAMERAN_AJO_MS });
    },
  };
}
