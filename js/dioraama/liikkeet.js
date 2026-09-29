/*
 * Dioraaman liikesilmukoiden PUHDAS LOGIIKKA (Linnanrakentaja, erä 2b, ali-agentti
 * P4a, 29.9.2026). Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md
 * kohta 4 "3D-HAHMOT". Data: js/dioraama/pankit/liikkeet.js (LIIKKEET).
 *
 * nivelKulmat(silmukka, t) -> { [nivel]: [rx,ry,rz] } (asteina). `t` on t01
 * (0..1, SAMA aikajana kuin LIIKKEET[silmukka].avaimet) - tämä funktio EI tiedä
 * kelloista/kesto_s:stä; kutsuja muuntaa reaaliajan t01:ksi (esim. (aika %
 * kesto_s) / kesto_s). Nivel, jota avaimet ei mainitse, palautuu levossa
 * [0, 0, 0] (ei virhe - ei kaikkien silmukoiden tarvitse liikuttaa kaikkia niveliä).
 *
 * juuriNousu(silmukka, t) -> pystysuora nousu metreinä (0 jos silmukalla ei ole
 * juuri-kenttää). Kaksi "pomppua" per silmukka (yksi per askel) - |sin(2*pi*t)|
 * on 0 kohdissa t=0, 0.5, 1 ja huipussaan (=nousu_m) kohdissa t=0.25, 0.75.
 *
 * Näytteistys: SMOOTHSTEP avainten välillä (ei lineaarinen) - pehmeä liike,
 * sopii "jäykän pienoisfiguurin askel askelelta" -tyyliin. C#-portti:
 * Ydin/Dioraama/Liikkeet.cs (toisen agentin tehtävä; kultaiset vektorit
 * tools/dioraama/tee-liikevektorit.mjs varmistavat pariteetin).
 */
import { LIIKKEET } from './pankit/liikkeet.js';

// Kaikki 16 niveltä (SAMA lista kuin tools/dioraama/hahmot3d.mjs:n nivelPuu() -
// tarkoituksella oma kopionsa, ei importtia tools/-puolelta: tämä tiedosto on
// "puhdas logiikka" -pari C#-portille Ydin/Dioraama/Liikkeet.cs:lle, ei riipu
// rakennuskoneesta). nivelKulmat palauttaa AINA kaikki 16 - myös nivelet, joita
// silmukka ei liikuta, tulevat levossa [0,0,0] (kutsuja ei tarvitse fallbackia).
const NIVELET = [
  'lantio', 'selka', 'kaula', 'paa',
  'olka_v', 'kyynar_v', 'kasi_v', 'olka_o', 'kyynar_o', 'kasi_o',
  'lonkka_v', 'polvi_v', 'nilkka_v', 'lonkka_o', 'polvi_o', 'nilkka_o',
];

/** Kolmion hermiittimäinen pehmennys [0,1] -> [0,1] (nopeus 0 molemmissa päissä). */
function smoothstep(f) {
  return f * f * (3 - 2 * f);
}

/**
 * Yhden nivelen avainlista ([[t01,rx,ry,rz], ...], t01 KASVAVA) -> [rx,ry,rz]
 * annetulla t:llä. t ennen ensimmäistä/jälkeen viimeisen avaimen -> reunan arvo
 * (ei ekstrapolointia). Avaimet-taulukko olettaa kattavansa [0,1] (kaikki
 * js/dioraama/pankit/liikkeet.js:n silmukat tekevät niin), mutta funktio on
 * turvallinen myös suppeammalle listalle.
 */
function nivelenKulma(avaimet, t) {
  if (!avaimet || avaimet.length === 0) return [0, 0, 0];
  if (avaimet.length === 1 || t <= avaimet[0][0]) return avaimet[0].slice(1);
  const viimeinen = avaimet[avaimet.length - 1];
  if (t >= viimeinen[0]) return viimeinen.slice(1);
  for (let i = 0; i < avaimet.length - 1; i++) {
    const a = avaimet[i];
    const b = avaimet[i + 1];
    if (t >= a[0] && t <= b[0]) {
      const vali = b[0] - a[0];
      const f = vali > 1e-9 ? smoothstep((t - a[0]) / vali) : 0;
      return [
        a[1] + (b[1] - a[1]) * f,
        a[2] + (b[2] - a[2]) * f,
        a[3] + (b[3] - a[3]) * f,
      ];
    }
  }
  return viimeinen.slice(1); // ei pitäisi tapahtua (avaimet[0][0]<=t<=viimeinen[0] jo käsitelty yllä)
}

/** Kaikkien 16 nivelen kulmat annetulla t01:llä (0..1) - levossa [0,0,0], jos silmukka ei liikuta nivelta. */
export function nivelKulmat(silmukka, t) {
  const liike = LIIKKEET[silmukka];
  if (!liike) throw new Error(`nivelKulmat: tuntematon silmukka '${silmukka}'`);
  const tulos = {};
  for (const nivel of NIVELET) {
    const avaimet = liike.avaimet[nivel];
    tulos[nivel] = avaimet ? nivelenKulma(avaimet, t) : [0, 0, 0];
  }
  return tulos;
}

/** Juuren pystysuora nousu (m) - 0 jos silmukalla ei ole juuri.nousu_m-kenttää. */
export function juuriNousu(silmukka, t) {
  const liike = LIIKKEET[silmukka];
  if (!liike) throw new Error(`juuriNousu: tuntematon silmukka '${silmukka}'`);
  const nousu = liike.juuri?.nousu_m;
  if (!nousu) return 0;
  return nousu * Math.abs(Math.sin(2 * Math.PI * t));
}
