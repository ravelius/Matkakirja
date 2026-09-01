/*
 * REITTIEN RINNAKKAISKARSINTA — sama korridori piirretään kerran.
 *
 * === MIKSI (omistaja 1.9.2026, kuvakaappaus Italiasta) ==============
 *
 * Sanatarkasti: *"Laivareittejä näyttää menemään liikaa."* Kaappauksessa
 * Sisilian eteläpuolella kulkee neljä lähes yhdensuuntaista kaarta, ja
 * MITATTU SYY EI OLE KAKSOISDATA vaan pelilaudan oma verkko:
 *
 *   sisilia|ateena   kiertää Sisilian länsi- ja eteläpuolitse
 *   kreeta|sisilia   kiertää saman mutkan samaa uraa
 *   dubrovnik|rooma  kiertää koko saappaan JA Sisilian samaa uraa
 *   rooma|sisilia    tulee Tyrrhenanmeren yli samaan solmuun
 *
 * Kaupunkipareja on 408 ja jokainen esiintyy TASAN KERRAN (mitattu:
 * ei yhtään kaksoiskaarta), eikä yksikään reitti ole toisen kanssa
 * päällekkäin koko pituudeltaan (mitattu: 0 reittiä 95 %:n peitolla
 * 14 lautayksikön etäisyydellä). Karsinta ei siis voi olla reitin
 * poisto — se on OSUUSKARSINTA: se stretch, jonka toinen reitti jo
 * piirtää, jätetään piirtämättä, ja verkko itse jää koskemattomaksi.
 *
 * === TÄMÄ EI KOSKE PELIMOOTTORIA ===================================
 *
 * Karsinta muuttaa VAIN sitä, mitä laattaan poltetaan. `edge.poly`,
 * askelmien paikat ja pelin kävelemä käyrä ovat entiset — nappula
 * kulkee yhä koko reitin, ja pelitilan elävä kerros piirtää sen.
 * Tämä moduuli saa syötteenä pelkkiä murtoviivoja laudan yksiköissä
 * eikä tunne kaupunkeja, matkustustapoja eikä pelin sääntöjä.
 *
 * === SÄÄNTÖ ON MITATTU JA DETERMINISTINEN ==========================
 *
 * Järjestys on PITUUS LASKEVASTI ja tasapelissä tunnus — ei siis
 * mitään arvottua eikä syötteen järjestykseen sidottua. Pisin reitti
 * piirtyy aina kokonaisena, ja lyhyempi väistää sen. Sama syöte antaa
 * saman tuloksen joka ajolla ja joka laatalla; laatta ei näy tänne
 * lainkaan, joten laattaraja ei voi katkaista viivaa (sama sääntö
 * kuin katkokuvion vaiheella, maailmapiirto.js).
 *
 * Neljä lukua, ja jokaisella on mitattu peruste (lautayksikkö on
 * päiväntasaajalla noin 3,34 km):
 *
 *   ETAISYYS 16   53 km. Alaraja tulee siitä, että 8 yksikköä (27 km)
 *                 jätti Sisilian nipun kolmeksi viivaksi; yläraja
 *                 siitä, että 20 yksikköä alkoi niputtaa Egeanmeren
 *                 saaristoreittejä, jotka ovat oikeasti eri väyliä.
 *   KULMA 30°     rinnakkaisuus, ei risteys. Ilman kulmaehtoa jokainen
 *                 ristikkäin menevä reitti katkaisisi toisen.
 *   VAHIN 40      134 km. Lyhyempi peitto jätetään piirtoon: muuten
 *                 viivaan tulisi rokonarpia joka risteyksestä.
 *   TYNGAT 20     67 km. Reitin ensimmäiset ja viimeiset yksiköt
 *                 piirretään AINA. Kaupungista on lähdettävä näkyvä
 *                 viiva, tai lyhyt rinnakkainen reitti (esim.
 *                 tanger|fes pitkän tanger|ahaggarin vieressä)
 *                 näyttäisi siltä, ettei kaupunkiin tule tietä.
 */

/** Karsinnan mitat lautayksikköinä. Vapaana oliona, jotta koe voi mitata. */
export const KARSINTA = Object.freeze({
  etaisyys: 16,   // kuinka lähelle toista reittiä saa tulla
  kulma: 30,      // asteina: rinnakkaisuuden raja
  vahin: 40,      // lyhyempää peittoa ei karsita
  tyngat: 20,     // reitin päistä aina piirtyvä osuus
});

/** Murtoviivan pituus laudan yksiköissä. */
function pituus(poly) {
  let L = 0;
  for (let i = 1; i < poly.length; i += 1) {
    L += Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
  }
  return L;
}

/**
 * Jo piirrettyjen janojen ruudukkohakemisto.
 *
 * Ilman hakemistoa tämä olisi 408 reittiä × 127 pistettä × kaikki
 * janat = kymmeniä miljoonia vertailuja ja minuutteja; ruudukolla se
 * on sekunnin murto-osa. Ruudun sivu on karsintaetäisyys, joten
 * pisteen naapurusto on 3 × 3 ruutua.
 */
class Hakemisto {
  constructor(ruutu) {
    this.ruutu = ruutu;
    this.solut = new Map();
  }

  lisaa(ax, ay, bx, by) {
    const jana = [ax, ay, bx, by];
    const s0 = Math.floor(Math.min(ax, bx) / this.ruutu);
    const s1 = Math.floor(Math.max(ax, bx) / this.ruutu);
    const r0 = Math.floor(Math.min(ay, by) / this.ruutu);
    const r1 = Math.floor(Math.max(ay, by) / this.ruutu);
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const avain = `${s}:${r}`;
        let lista = this.solut.get(avain);
        if (!lista) { lista = []; this.solut.set(avain, lista); }
        lista.push(jana);
      }
    }
  }

  /** Onko pisteessä (x,y) suuntaan (ux,uy) kulkeva jana lähellä? */
  peitossa(x, y, ux, uy, etaisyys, cosRaja) {
    const s0 = Math.floor((x - etaisyys) / this.ruutu);
    const s1 = Math.floor((x + etaisyys) / this.ruutu);
    const r0 = Math.floor((y - etaisyys) / this.ruutu);
    const r1 = Math.floor((y + etaisyys) / this.ruutu);
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const lista = this.solut.get(`${s}:${r}`);
        if (!lista) continue;
        for (const [ax, ay, bx, by] of lista) {
          const vx = bx - ax;
          const vy = by - ay;
          const L2 = vx * vx + vy * vy;
          let t = L2 ? ((x - ax) * vx + (y - ay) * vy) / L2 : 0;
          t = t < 0 ? 0 : (t > 1 ? 1 : t);
          const d = Math.hypot(x - (ax + vx * t), y - (ay + vy * t));
          if (d > etaisyys) continue;
          const L = Math.sqrt(L2) || 1;
          const c = Math.abs((vx / L) * ux + (vy / L) * uy);
          if (c >= cosRaja) return true;
        }
      }
    }
    return false;
  }
}

/**
 * Merkitsee jokaiselle reitille ne murtoviivan välit, jotka poltetaan.
 *
 * Reitit muuttuvat paikallaan: jokainen saa kentät
 *   `piirtoValit`  [[i0,i1], …] piirrettävät indeksivälit (aina
 *                  vähintään yksi; koko reitti = [[0, n-1]])
 *   `askelmat`     karsitut askelhelmet (piirtoväleillä olevat)
 * ja alkuperäiset `poly`, `solmut`, `siemen` jäävät koskematta.
 *
 * @param {Array<{poly:Array<[number,number]>, askelmat?:Array}>} reitit
 * @param {object} [asetukset] KARSINNAN osittainen korvaus (koetta varten)
 * @returns {{reitteja:number, katkottuja:number, pituus:number,
 *            karsittu:number, askelmat:number, karsitutAskelmat:number}}
 */
export function karsiRinnakkaiset(reitit, asetukset = null) {
  const M = asetukset ? { ...KARSINTA, ...asetukset } : KARSINTA;
  const cosRaja = Math.cos((M.kulma * Math.PI) / 180);
  const hakemisto = new Hakemisto(Math.max(1, M.etaisyys));
  /*
   * JÄRJESTYS EI SAA TULLA SYÖTTEEN JÄRJESTYKSESTÄ. Pituus ratkaisee,
   * ja tasapelin ratkaisee reitin oma tunnusluku (`siemen`, sama joka
   * antaa kynänpaineen ja katkokuvion) ja viimeisenä sen ensimmäinen
   * piste. Jos tasapeli ratkeaisi listan indeksillä, sama lauta eri
   * järjestyksessä antaisi eri kuvan.
   */
  const jarjestys = reitit
    .map((r) => ({ r, L: pituus(r.poly) }))
    .sort((a, b) => (b.L - a.L)
      || ((a.r.siemen ?? 0) - (b.r.siemen ?? 0))
      || (a.r.poly[0][0] - b.r.poly[0][0])
      || (a.r.poly[0][1] - b.r.poly[0][1]));

  const tilasto = {
    reitteja: reitit.length,
    katkottuja: 0,
    pituus: 0,
    karsittu: 0,
    askelmat: 0,
    karsitutAskelmat: 0,
  };

  for (const { r, L } of jarjestys) {
    tilasto.pituus += L;
    const poly = r.poly;
    const n = poly.length;
    /* Kaarenpituus pisteittäin: tyngät ja vähimmäispituus mitataan siitä. */
    const s = new Float64Array(n);
    for (let i = 1; i < n; i += 1) {
      s[i] = s[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    }
    const peitossa = new Uint8Array(n);
    for (let i = 0; i < n; i += 1) {
      // Päiden tyngät piirtyvät aina: kaupungista lähtee näkyvä viiva.
      if (s[i] < M.tyngat || (L - s[i]) < M.tyngat) continue;
      const a = poly[i > 0 ? i - 1 : 0];
      const b = poly[i < n - 1 ? i + 1 : n - 1];
      let ux = b[0] - a[0];
      let uy = b[1] - a[1];
      const ul = Math.hypot(ux, uy) || 1;
      ux /= ul;
      uy /= ul;
      if (hakemisto.peitossa(poly[i][0], poly[i][1], ux, uy, M.etaisyys, cosRaja)) {
        peitossa[i] = 1;
      }
    }
    /* Lyhyet peitot palautetaan piirtoon (ks. VAHIN). */
    let i = 0;
    let karsittu = 0;
    while (i < n) {
      if (!peitossa[i]) { i += 1; continue; }
      let j = i;
      while (j + 1 < n && peitossa[j + 1]) j += 1;
      const jakso = s[j] - s[i];
      if (jakso >= M.vahin) karsittu += jakso;
      else for (let k = i; k <= j; k += 1) peitossa[k] = 0;
      i = j + 1;
    }
    tilasto.karsittu += karsittu;
    if (karsittu > 0) tilasto.katkottuja += 1;

    /* Piirtovälit: peittämättömien pisteiden yhtenäiset jaksot. */
    const valit = [];
    i = 0;
    while (i < n) {
      if (peitossa[i]) { i += 1; continue; }
      let j = i;
      while (j + 1 < n && !peitossa[j + 1]) j += 1;
      if (j > i) valit.push([i, j]);
      i = j + 1;
    }
    r.piirtoValit = valit.length ? valit : [[0, n - 1]];

    /* Piirretyt janat hakemistoon seuraavia reittejä varten. */
    for (const [i0, i1] of r.piirtoValit) {
      for (let k = i0 + 1; k <= i1; k += 1) {
        hakemisto.lisaa(poly[k - 1][0], poly[k - 1][1], poly[k][0], poly[k][1]);
      }
    }

    /*
     * ASKELHELMET SEURAAVAT VIIVAA. Karsitulla osuudella viivaa ei ole,
     * ja helmi ilman viivaa olisi merkki tyhjässä meressä — vieläpä
     * kymmenkunta yksikköä sen viivan sivussa, joka sen korvaa. Peli
     * kävelee yhä kaikki askelmat (js/rules.js); tämä koskee vain
     * poltettua kuvaa.
     */
    if (r.askelmat?.length) {
      tilasto.askelmat += r.askelmat.length;
      const alat = r.piirtoValit.map(([i0, i1]) => [s[i0], s[i1]]);
      // Askelma idx: kaarenpituus (idx/steps) — sama kaava kuin
      // sisalto.mjs:n pointAlong, mutta tässä riittää lähin piste.
      const jaljella = r.askelmat.filter(([bx, by]) => {
        let paras = 0;
        let parasD = Infinity;
        for (let k = 0; k < n; k += 1) {
          const d = Math.hypot(poly[k][0] - bx, poly[k][1] - by);
          if (d < parasD) { parasD = d; paras = k; }
        }
        const sp = s[paras];
        return alat.some(([a0, a1]) => sp >= a0 && sp <= a1);
      });
      tilasto.karsitutAskelmat += r.askelmat.length - jaljella.length;
      r.askelmat = jaljella;
    }
  }
  return tilasto;
}
