// DIORAAMAN RESEPTIT (Linnanrakentaja 29.9.2026): kokoaa reseptitiedostot yhdeksi RESEPTIT-tauluksi ja sijoittaa
// palikan maailmaan. Speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 2 ja 3b.
//   reseptit-rakenne.mjs   laatta, seina, torni, porras
//   reseptit-maasto.mjs    kartiokatto, harjakatto, kallio, vesi
//   reseptit-kalusteet.mjs poyta, penkki, tynnyri, pata, sakki, tulisija, hylly
//   reseptit-lattiat.mjs   kivilattia, lankkulattia (erä 2b, kohta 3)
//   reseptit-rekvisiitta.mjs orsileivat, yrttinippu, riippupata, kattila, kauha, leikkuulauta, veitsi, kala,
//                          leipa, nauriskori, puukasa, vesisanko, saavi, kirnu, huhmar, suolalaatikko,
//                          kynttilanjalka, oljylamppu, vati, ruukku, pullo, luuta, hiillospihdit (erä 2b, kohta 3)
//   reseptit-linna.mjs     kiekko, kierreportaat, sakarat, paalu, laiturikansi, vene, lippu, rako, kupoli (erä 3)
//   reseptit-kalusteet2.mjs linnan tilojen kalusteet ja rekvisiitta (erä 3, kohta 2)
//   reseptit-etsinta.mjs   sinettisormus, kaiverrus (voudin sinetti -etsintä 29.9.)
//   reseptit-aitta.mjs     kangaspakka, vaatepino, vaateorsi (fatabuuri vaateaitaksi 29.9.)
// Jokainen resepti tuottaa kolmiot paikallisessa kehyksessä (u, y, w) oikeakätisenä (reseptit-apu.mjs).
import * as rakenne from './reseptit-rakenne.mjs';
import * as maasto from './reseptit-maasto.mjs';
import * as kalusteet from './reseptit-kalusteet.mjs';
import * as lattiat from './reseptit-lattiat.mjs';
import * as rekvisiitta from './reseptit-rekvisiitta.mjs';
import * as linna from './reseptit-linna.mjs';
import * as kalusteet2 from './reseptit-kalusteet2.mjs';
import * as etsinta from './reseptit-etsinta.mjs';
import * as aitta from './reseptit-aitta.mjs';

export const RESEPTIT = {
  ...rakenne.RESEPTIT, ...maasto.RESEPTIT, ...kalusteet.RESEPTIT, ...lattiat.RESEPTIT, ...rekvisiitta.RESEPTIT,
  ...linna.RESEPTIT, ...kalusteet2.RESEPTIT, ...etsinta.RESEPTIT, ...aitta.RESEPTIT,
};
export const OLETUSPINNAT = {
  ...rakenne.OLETUSPINNAT, ...maasto.OLETUSPINNAT, ...kalusteet.OLETUSPINNAT, ...lattiat.OLETUSPINNAT,
  ...rekvisiitta.OLETUSPINNAT, ...linna.OLETUSPINNAT, ...kalusteet2.OLETUSPINNAT, ...etsinta.OLETUSPINNAT, ...aitta.OLETUSPINNAT,
};

const RAD = Math.PI / 180;

/**
 * Palikka maailmaan: maailma = paikka + u·r + y·(0,1,0) + w·f, r = (cos s, 0, sin s), f = (sin s, 0, −cos s).
 * (r, ylös, f) on vasenkätinen, joten kiertosuunta vaihdetaan (b ↔ c) ja normaalit kuvataan samalla
 * lineaarikuvauksella (ortogonaalinen, joten normaalimatriisi = sama). Rooli → pinta: instanssi.pinnat[rooli] ??
 * OLETUSPINNAT[resepti][rooli] ?? rooli.
 *
 * uv_m (erä 2, speksin kohta "UV"): kopioidaan SELLAISENAAN (vain kärkijärjestys vaihtuu b ↔ c:n
 * mukana, kuten n:llä) — kaarenpituus ja korkeus (a, b) eivät muutu jäykässä siirrossa/kierrossa,
 * joten resepti (torni, kartiokatto) on jo laskenut oikeat arvot paikallisessa kehyksessä.
 *
 * osa (erä 2b, kohta 1): kopioidaan SELLAISENAAN, jos resepti antoi sen (esim. lattioiden
 * yksittäinen laatta/lankku) — rakenna.mjs arpoo siitä COLOR_0.B:n. Puuttuessa rakenna.mjs
 * täyttää oletuksen (koko palikka kerrallaan) itse ennen ryhmittelyä.
 */
export function sijoita(instanssi) {
  const resepti = RESEPTIT[instanssi.resepti];
  if (!resepti) throw new Error(`tuntematon resepti: ${instanssi.resepti}`);
  const s = (instanssi.suunta || 0) * RAD;
  const r = [Math.cos(s), 0, Math.sin(s)], f = [Math.sin(s), 0, -Math.cos(s)];
  const [px, py, pz] = instanssi.paikka || [0, 0, 0];
  const kuvaa = (v) => [px + v[0] * r[0] + v[2] * f[0], py + v[1], pz + v[0] * r[2] + v[2] * f[2]];
  const suunta = (n) => [n[0] * r[0] + n[2] * f[0], n[1], n[0] * r[2] + n[2] * f[2]];
  const oletus = OLETUSPINNAT[instanssi.resepti] || {};
  const ohitus = instanssi.pinnat || {};
  const tulos = [];
  const kolmiot = resepti(instanssi); // luettu talteen: .valo (era2b kohta 3) luetaan tästä lopuksi
  for (const k of kolmiot) {
    const t = { p: [kuvaa(k.p[0]), kuvaa(k.p[2]), kuvaa(k.p[1])], rooli: k.rooli };
    if (k.n) t.n = [suunta(k.n[0]), suunta(k.n[2]), suunta(k.n[1])];
    if (k.uv_m) t.uv_m = [k.uv_m[0], k.uv_m[2], k.uv_m[1]];
    if (k.osa) t.osa = k.osa;
    t.pinta = ohitus[k.rooli] ?? oletus[k.rooli] ?? k.rooli;
    tulos.push(t);
  }
  // .valo (era2b kohta 3, reseptit-rekvisiitta.mjs: kynttilänjalka/öljylamppu): ei Kolmio-alkio,
  // kuljetetaan samana ei-enumeroituvana ominaisuutena — paikka_paikallinen muunnetaan maailmaan
  // SAMALLA kaavalla (kuvaa()) kuin kärjet; sade/voima/vari kopioidaan sellaisenaan (skalaareja/väri,
  // eivät muutu jäykässä siirrossa/kierrossa).
  if (kolmiot.valo) {
    tulos.valo = {
      paikka: kuvaa(kolmiot.valo.paikka_paikallinen),
      sade: kolmiot.valo.sade,
      voima: kolmiot.valo.voima,
      vari: kolmiot.valo.vari,
    };
  }
  return tulos;
}
