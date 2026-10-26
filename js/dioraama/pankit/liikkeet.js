// DIORAAMAN LIIKESILMUKKAPANKKI (Linnanrakentaja, erä 2b, ali-agentti P4a, 29.9.2026).
// Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT".
//
// LIIKKEET[silmukka] = { kesto_s, avaimet: { <nivel>: [[t01,rx,ry,rz], ...] },
//   juuri?: { nousu_m } }. Nivelnimet SAMAT kuin tools/dioraama/hahmot3d.mjs:n
// nivelPuu() (lantio, selka, kaula, paa, olka_v/_o, kyynar_v/_o, kasi_v/_o,
// lonkka_v/_o, polvi_v/_o, nilkka_v/_o; _v=vasen, _o=oikea). Kulmat ASTEINA
// (rx,ry,rz nivelen omassa kehyksessä), t01 KASVAVA 0..1. JOKAINEN nivelen
// avainlista SULKEUTUU: ensimmäinen ja viimeinen arvo ovat samat, jotta silmukka
// ei nykähdä kierron vaihtuessa (testattu tests/dioraama-hahmot3d.test.mjs:ssä).
// Nivel, jota avaimet ei mainitse, pysyy levossa [0,0,0] (js/dioraama/liikkeet.js).
// juuri.nousu_m = pystysuoran "pompun" amplitudi (kavely/kanto) - KAKSI pomppua
// per silmukka (askel), ks. js/dioraama/liikkeet.js:n juuriNousu().
//
// Näytteistys avainten välillä: smoothstep (ei lineaarinen) - pehmeä pysähdys/
// lähtö jokaisella avaimella, sopii jäykän pienoisfiguurin "askel askelelta"
// -tyyliin paremmin kuin nykivä lineaarinen interpolointi.
export const LIIKKEET = {
  // idle: hengitys/huojunta - hyvin pieni, ei juuren nousua.
  idle: {
    kesto_s: 4.0,
    avaimet: {
      selka: [[0, 0, 0, 0], [0.5, 1.5, 0, 0], [1, 0, 0, 0]],
      paa: [[0, 0, 0, 0], [0.5, 0, 2, 0], [1, 0, 0, 0]],
      olka_v: [[0, 0, 0, 0], [0.5, 2, 0, 0], [1, 0, 0, 0]],
      olka_o: [[0, 0, 0, 0], [0.5, 2, 0, 0], [1, 0, 0, 0]],
    },
  },

  // tyo: hämmennys - oikea käsi kiertää (kehä), vartalo myötäilee kevyesti.
  tyo: {
    kesto_s: 2.0,
    avaimet: {
      olka_o: [[0, 20, 0, 10], [0.25, 35, 0, -15], [0.5, 20, 0, -30], [0.75, 5, 0, -15], [1, 20, 0, 10]],
      kyynar_o: [[0, 40, 0, 0], [0.25, 55, 0, 0], [0.5, 40, 0, 0], [0.75, 25, 0, 0], [1, 40, 0, 0]],
      kasi_o: [[0, 0, 0, 10], [0.5, 0, 0, -10], [1, 0, 0, 10]],
      selka: [[0, 0, 0, 0], [0.25, 0, 0, 3], [0.5, 0, 0, 0], [0.75, 0, 0, -3], [1, 0, 0, 0]],
      paa: [[0, 0, 0, 0], [0.5, 3, 0, 0], [1, 0, 0, 0]],
    },
  },

  // kavely: käynti - lonkat vastavaiheessa, polvet koukistuvat heilahdusvaiheessa,
  // kädet vastaheiluvat, selkä keikahtaa hieman tasapainoksi. juuri: 2 pomppua.
  kavely: {
    kesto_s: 1.0,
    juuri: { nousu_m: 0.03 },
    avaimet: {
      lonkka_v: [[0, 25, 0, 0], [0.25, -5, 0, 0], [0.5, -25, 0, 0], [0.75, -5, 0, 0], [1, 25, 0, 0]],
      lonkka_o: [[0, -25, 0, 0], [0.25, -5, 0, 0], [0.5, 25, 0, 0], [0.75, -5, 0, 0], [1, -25, 0, 0]],
      polvi_v: [[0, 8, 0, 0], [0.5, 8, 0, 0], [0.75, 50, 0, 0], [1, 8, 0, 0]],
      polvi_o: [[0, 8, 0, 0], [0.25, 50, 0, 0], [0.5, 8, 0, 0], [1, 8, 0, 0]],
      olka_v: [[0, -15, 0, 0], [0.25, -3, 0, 0], [0.5, 15, 0, 0], [0.75, -3, 0, 0], [1, -15, 0, 0]],
      olka_o: [[0, 15, 0, 0], [0.25, 3, 0, 0], [0.5, -15, 0, 0], [0.75, 3, 0, 0], [1, 15, 0, 0]],
      kyynar_v: [[0, 15, 0, 0], [0.5, 20, 0, 0], [1, 15, 0, 0]],
      kyynar_o: [[0, 15, 0, 0], [0.5, 20, 0, 0], [1, 15, 0, 0]],
      selka: [[0, 0, 0, 3], [0.25, 0, 0, 0], [0.5, 0, 0, -3], [0.75, 0, 0, 0], [1, 0, 0, 3]],
      paa: [[0, 0, 0, 0], [0.5, 2, 0, 0], [1, 0, 0, 0]],
    },
  },

  // kanto: kävely + sanko - samat lonkat/polvet/selkä/pää kuin kavely, mutta
  // oikea käsi (sanko) pysyy tuettuna eikä heilu; vasen käsi heiluu tasapainoksi.
  kanto: {
    kesto_s: 1.0,
    juuri: { nousu_m: 0.025 },
    avaimet: {
      lonkka_v: [[0, 25, 0, 0], [0.25, -5, 0, 0], [0.5, -25, 0, 0], [0.75, -5, 0, 0], [1, 25, 0, 0]],
      lonkka_o: [[0, -25, 0, 0], [0.25, -5, 0, 0], [0.5, 25, 0, 0], [0.75, -5, 0, 0], [1, -25, 0, 0]],
      polvi_v: [[0, 8, 0, 0], [0.5, 8, 0, 0], [0.75, 50, 0, 0], [1, 8, 0, 0]],
      polvi_o: [[0, 8, 0, 0], [0.25, 50, 0, 0], [0.5, 8, 0, 0], [1, 8, 0, 0]],
      olka_v: [[0, -10, 0, 0], [0.5, 10, 0, 0], [1, -10, 0, 0]],
      kyynar_v: [[0, 20, 0, 0], [0.5, 25, 0, 0], [1, 20, 0, 0]],
      olka_o: [[0, 10, 0, 0], [1, 10, 0, 0]],
      kyynar_o: [[0, 60, 0, 0], [1, 60, 0, 0]],
      selka: [[0, 0, 0, 3], [0.25, 0, 0, 0], [0.5, 0, 0, -3], [0.75, 0, 0, 0], [1, 0, 0, 3]],
      paa: [[0, 0, 0, 0], [0.5, 2, 0, 0], [1, 0, 0, 0]],
    },
  },

  // puhe: pää + käsi elehtii - ei juuren nousua.
  puhe: {
    kesto_s: 3.0,
    avaimet: {
      paa: [[0, 0, 0, 0], [0.25, 3, 4, 0], [0.5, -2, -3, 0], [0.75, 2, 3, 0], [1, 0, 0, 0]],
      olka_o: [[0, 10, 0, 0], [0.3, 30, 0, 15], [0.6, 15, 0, -10], [1, 10, 0, 0]],
      kyynar_o: [[0, 30, 0, 0], [0.3, 70, 0, 0], [0.6, 50, 0, 0], [1, 30, 0, 0]],
    },
  },
};
