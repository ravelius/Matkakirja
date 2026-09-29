// DIORAAMAN RESEPTIT (Linnanrakentaja 29.9.2026): kokoaa reseptitiedostot yhdeksi RESEPTIT-tauluksi ja sijoittaa
// palikan maailmaan. Speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 2 ja 3b.
//   reseptit-rakenne.mjs   laatta, seina, torni, porras
//   reseptit-maasto.mjs    kartiokatto, harjakatto, kallio, vesi
//   reseptit-kalusteet.mjs poyta, penkki, tynnyri, pata, sakki, tulisija, hylly
// Jokainen resepti tuottaa kolmiot paikallisessa kehyksessä (u, y, w) oikeakätisenä (reseptit-apu.mjs).
import * as rakenne from './reseptit-rakenne.mjs';
import * as maasto from './reseptit-maasto.mjs';
import * as kalusteet from './reseptit-kalusteet.mjs';

export const RESEPTIT = { ...rakenne.RESEPTIT, ...maasto.RESEPTIT, ...kalusteet.RESEPTIT };
export const OLETUSPINNAT = { ...rakenne.OLETUSPINNAT, ...maasto.OLETUSPINNAT, ...kalusteet.OLETUSPINNAT };

const RAD = Math.PI / 180;

/**
 * Palikka maailmaan: maailma = paikka + u·r + y·(0,1,0) + w·f, r = (cos s, 0, sin s), f = (sin s, 0, −cos s).
 * (r, ylös, f) on vasenkätinen, joten kiertosuunta vaihdetaan (b ↔ c) ja normaalit kuvataan samalla
 * lineaarikuvauksella (ortogonaalinen, joten normaalimatriisi = sama). Rooli → pinta: instanssi.pinnat[rooli] ??
 * OLETUSPINNAT[resepti][rooli] ?? rooli.
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
  for (const k of resepti(instanssi)) {
    const t = { p: [kuvaa(k.p[0]), kuvaa(k.p[2]), kuvaa(k.p[1])], rooli: k.rooli };
    if (k.n) t.n = [suunta(k.n[0]), suunta(k.n[2]), suunta(k.n[1])];
    t.pinta = ohitus[k.rooli] ?? oletus[k.rooli] ?? k.rooli;
    tulos.push(t);
  }
  return tulos;
}
