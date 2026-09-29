/*
 * DELTASARJA — VAIN MUUTTUNEET LAATAT ÄMPÄRIIN (Karttaseppä 29.9.2026,
 * Päätoimittajan hyväksyntä R2-raportin jälkeen: syyskuun Class A -lasku
 * tuli siitä, että jokainen poltto vietiin kokonaan uuteen kansioon, noin
 * miljoona PUTia).
 *
 * Poltto on tavulleen toistettava: 27- ja 30-pohjan (vain Euroopan joet
 * erosivat) z8-laatoista 95,8 % oli identtisiä. Uusi sarja vie siis vain
 * muuttuneet laatat, ja luettelo kertoo, mitkä laatat haetaan PERUSSARJASTA:
 *
 *   "delta": { "perus": "<perussarjan kansio/versio>",
 *              "muuttuneet": { "<taso>": "<base64-bittikartta>" | null } }
 *
 * Bitti 1 = laatta on muuttunut ja asuu uuden sarjan kansiossa; bitti 0 =
 * sama tiedosto kuin perussarjassa, osoite on perussarjan. Bittijärjestys on
 * sama kuin pyramidin `laatasto`-kartassa: i = rivi · sarakkeita + sarake,
 * tavu i >> 3, bitti i & 7 (vähiten merkitsevä ensin). `null` tai puuttuva
 * taso = koko taso uudessa kansiossa (esim. z0–z4, joissa lähes kaikki
 * muuttuu). Ketjun syvyys on aina yksi: perussarja on täysi sarja, eikä
 * delta viittaa toiseen deltaan (tools/vie-delta.mjs).
 *
 * Sama muoto pallon laatat.json:ssa (sarakkeita = 2^taso) ja pyramidin
 * luettelossa (pohja, viivataso, rantataso, jokitaso; sarakkeita tason
 * `sarakkeita`). Natiivi lukee saman kentän (Natiiviseppä).
 */

/** Purettu bittikartta tasolle (muistetaan delta-olioon). */
function bitit(delta, taso) {
  const muisti = delta.__bitit ?? (delta.__bitit = new Map());
  if (muisti.has(taso)) return muisti.get(taso);
  const b64 = delta.muuttuneet?.[taso];
  let tulos = null;
  if (typeof b64 === 'string') {
    try {
      const raaka = atob(b64);
      tulos = new Uint8Array(raaka.length);
      for (let i = 0; i < raaka.length; i += 1) tulos[i] = raaka.charCodeAt(i);
    } catch {
      tulos = null;
    }
  }
  muisti.set(taso, tulos);
  return tulos;
}

/**
 * Onko laatta muuttunut perussarjasta (eli asuuko se uuden sarjan kansiossa)?
 * Ilman deltaa, tai kun tason kartta puuttuu, vastaus on aina kyllä.
 */
export function laattaMuuttunut(delta, taso, sarake, rivi, sarakkeita) {
  if (!delta?.perus) return true;
  const b = bitit(delta, taso);
  if (!b) return true;
  const i = rivi * sarakkeita + sarake;
  const t = b[i >> 3];
  return t !== undefined && ((t >> (i & 7)) & 1) === 1;
}

/** Laatan kansio: uusi, jos laatta muuttui, muuten perussarjan. */
export function deltanKansio(delta, uusi, taso, sarake, rivi, sarakkeita) {
  return laattaMuuttunut(delta, taso, sarake, rivi, sarakkeita) ? uusi : delta.perus;
}
