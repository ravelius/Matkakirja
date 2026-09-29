/*
 * DIORAAMAN OHJAAJA — puhdas logiikka (käsikirjoituksen eteneminen ja
 * pulun lentokaari, ei DOM:ia, ei THREE:ta).
 *
 * Viitetoteutus (docs/raportit/dioraama-rajapinnat-20260929.md kohta 4);
 * natiivi pari on C#-luokka Ohjaaja
 * (Assets/Matkakirja/Linssit/Ydin/Dioraama/Ohjaaja.cs). Pariteettia
 * vartioidaan testivektorein (tools/dioraama/tee-vektorit.mjs →
 * tests/fixtures/dioraama/vektorit.json). smootherstep tuodaan
 * kamera.js:stä — sama käyrä, yksi lähde.
 *
 * `rak` (Rakennus) oletetaan koostetuksi (ks. heratys.js:n kommentti):
 * rak.aanet on hakemisto ääni-id → { kesto_s, ... } (kuten C#:n
 * Rakennus-malli ja rakennettu rakennus.json).
 */
import { smootherstep } from './kamera.js';

function vahenna(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function pituus(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function keskipiste(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

/**
 * askeleenKesto(askel, tila, rak) → sekuntia.
 * pulu-lenna 1,8; taulu 0,25; kohta = max(3, 0,06·merkit) tilan
 * taulun kohdat[n].tekstistä; repliikki/reaktio = max(2, 0,06·merkit)
 * hahmon tekstistä; odota = askel.s.
 *
 * TULKINTA (merkkien lähde 'repliikki'-askeleessa): ASKEL yksilöi vain
 * hahmon (`hahmo: id`), ei rivi-indeksiä, vaikka hahmolla voi olla
 * useampi repliikki. Yksinkertaisin selvä valinta: käytetään AINA
 * hahmo.repliikit[0] (ensimmäinen rivi). 'reaktio' on yksiselitteinen
 * (hahmo.reaktio, yksi rivi).
 * TULKINTA (merkit = teksti.length, UTF-16-yksiköt; ei erillistä
 * graafeemi-/koodipistelaskentaa — sama kuin C#:n string.Length).
 *
 * Kun rivillä on ääni (aani ≠ null), kesto tulee äänestä:
 * rak.aanet[aani].kesto_s korvaa tekstipohjaisen arvion kokonaan.
 */
export function askeleenKesto(askel, tila, rak) {
  switch (askel.tee) {
    case 'pulu-lenna':
      return 1.8;
    case 'taulu':
      return 0.25;
    case 'kohta': {
      const kohta = tila.taulu.kohdat[askel.n];
      return Math.max(3, 0.06 * kohta.teksti.length);
    }
    case 'repliikki':
    case 'reaktio': {
      const hahmo = tila.hahmot.find((h) => h.id === askel.hahmo);
      const rivi = askel.tee === 'reaktio' ? hahmo.reaktio : hahmo.repliikit[0];
      if (rivi.aani) return rak.aanet[rivi.aani].kesto_s;
      return Math.max(2, 0.06 * rivi.teksti.length);
    }
    case 'odota':
      return askel.s;
    default:
      throw new Error(`ohjaaja: tuntematon askel.tee "${askel.tee}"`);
  }
}

/**
 * kasikirjoitusHetkella(askeleet, kestot, napautukset, t)
 *   → { indeksi, alku, paikallinen, valmis }.
 *
 * `kestot[i]` on askeleen i luonnollinen kesto (askeleenKesto etukäteen
 * laskettuna joka askeleelle). Napautus päättää MENEILLÄÄN OLEVAN
 * askeleen napautushetkellä: jos napautus osuu askeleen luonnolliseen
 * ikkunaan [alku, luonnollinenLoppu), askel loppuu napautushetkellä ja
 * seuraava alkaa siitä. TULKINTA: napautukset kulutetaan aikajärjestyk-
 * sessä yksi kerrallaan — jos kaksi napautusta osuisi samaan alkuperäi-
 * seen ikkunaan, vain ensimmäinen vaikuttaa, koska askel on tuolloin jo
 * päättynyt kun seuraava napautus tulisi käsittelyyn.
 *
 * TULKINTA (parametri `askeleet`): speksin kohdan 4 teksti listaa
 * `askeleet`-parametrin, mutta kohdan 5 C#-allekirjoituksessa
 * (Ohjaaja.KasikirjoitusHetkella) sitä ei ole — vain kestot, napautukset
 * ja t. Funktio EI käytä askeleet-parametrin sisältöä (vain kestot.length
 * ratkaisee askelmäärän); parametri säilytetään JS:ssä nimen ja
 * rajapintakuvauksen mukaisesti, mutta C# voi jättää sen pois samalla
 * tuloksella.
 */
export function kasikirjoitusHetkella(askeleet, kestot, napautukset, t) {
  const napit = [...napautukset].sort((a, b) => a - b);
  let napIdx = 0;
  let alku = 0;
  for (let i = 0; i < kestot.length; i++) {
    let loppu = alku + kestot[i];
    if (napIdx < napit.length && napit[napIdx] >= alku && napit[napIdx] < loppu) {
      loppu = napit[napIdx];
      napIdx++;
    }
    const viimeinen = i === kestot.length - 1;
    if (t < loppu || viimeinen) {
      return { indeksi: i, alku, paikallinen: t - alku, valmis: viimeinen && t >= loppu };
    }
    alku = loppu;
  }
  // kestot tyhjä: ei askelia.
  return { indeksi: -1, alku: 0, paikallinen: 0, valmis: true };
}

/**
 * puluLento(alku, loppu, t01) → [x,y,z]. Toisen asteen Bézier-käyrä:
 * P0 = alku, P1 = keskipiste + (0, 0,3·|loppu − alku| + 1, 0) (huippu),
 * P2 = loppu, parametri s = smootherstep(t01).
 * TULKINTA (nollamatka): jos alku === loppu, |loppu − alku| = 0 ja
 * huippu on silti keskipiste + (0,1,0) — pelkkä pystynousu paikallaan,
 * koska nostokaava on 0,3·d + 1 (vakiotermi +1 ei koskaan häviä).
 */
export function puluLento(alku, loppu, t01) {
  const d = pituus(vahenna(loppu, alku));
  const keski = keskipiste(alku, loppu);
  const huippu = [keski[0], keski[1] + 0.3 * d + 1, keski[2]];
  const s = smootherstep(t01);
  const inv = 1 - s;
  const p0 = inv * inv;
  const p1 = 2 * inv * s;
  const p2 = s * s;
  return [
    p0 * alku[0] + p1 * huippu[0] + p2 * loppu[0],
    p0 * alku[1] + p1 * huippu[1] + p2 * loppu[1],
    p0 * alku[2] + p1 * huippu[2] + p2 * loppu[2],
  ];
}
