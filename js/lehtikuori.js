/*
 * LEHTIKUORI: PELKKÄ KAUPUNKILEHTI NATIIVIN PELIN WEB-NÄKYMÄÄN
 * (omistajan linjaus 23.9.2026: natiiviin mahdollisimman pian; Fablen
 * työnjako: kaupunkilehti natiivissa WKWebView-kuoressa, web-lehti
 * sellaisenaan aluksi).
 *
 * `index.html?lehti=<kaupunki-id>` avaa kaupungin lehden ilman lautaa:
 *   - peli rakennetaan kuten kehittäjän pikatiellä (js/kehittaja-pikatie.js
 *     rakennaPikatiePeli): yksi pelaaja kaupungissa, toimintavaihe, ei
 *     saapumisesitystä;
 *   - mitään ei tallenneta (onChange tyhjä) — laitteen oma verkkopeli ei
 *     muutu, jos sama selain avaa kuoren;
 *   - lautaa ei avata (ui.lehtikuori → paivitaPallolauta palaa heti), eikä
 *     WebGL-pallo tai tasokartta pyöri lehden alla;
 *   - `.app` on piilossa (css body.lehtikuori), dialogit toimivat: lehti,
 *     Wikipedia-artikkeli, nähtävyys ja kuvan suurennos ovat bodyn suoria
 *     lapsia.
 *
 * NATIIVILLE: kun pelaaja sulkee lehden, kuori lähettää viestin
 * `{ tapahtuma: 'lehti-suljettu', kaupunki }` WKWebViewn käsittelijälle
 * `matkakirja` (window.webkit.messageHandlers.matkakirja) ja samalla
 * sivutapahtuman `matkakirja-lehti-suljettu` (testit ja selain).
 *
 * TEKO-SILTA (23.9.2026): lehden kauppa- ja palkkioteot (kulttuurivisa,
 * minitehtävä, nostolaskuri, aarrepisteohje, pulla, eläintäky, juliste)
 * kulkevat natiiville viestinä `{ tapahtuma: 'teko', teko, args }`;
 * natiivi toistaa ne omalla pelilogiikallaan (C#-portti Kaupat.cs, samat
 * avaimet), joten raha ja kirjanpito pysyvät natiivin tallennuksessa. Natiivi
 * antaa lehdelle alkutilan osoitteen risuaidassa `#tila=<base64url JSON>`
 * ({ raha, kaupat: { kulttuuri, minitehtavat, minitehtavatOikein,
 * nostotehtavat, aarrepisteOhje, pullat, elaintayt, julisteet } } — sama muoto
 * kuin natiivin tallennuksen `kaupat`), jotta jo ostettu ei näy uudelleen.
 *
 * Sisältöpaketin juuri (Siirtoseppä, tools/vienti/web-riippuvuudet.mjs
 * WEB_NAKYMAT): index.html + js/main.js — kuori on sama sovellus eri
 * tilassa eikä oma kopio käyttöliittymästä.
 */

export const LEHTIKUORI_TAPAHTUMA = 'matkakirja-lehti-suljettu';

/** Kaupunki osoitteesta `?lehti=<id>` tai null (tunnus kuten pikatiellä). */
export function lehtikuorenKaupunki(search = globalThis.location?.search ?? '') {
  try {
    const arvo = new URLSearchParams(search).get('lehti');
    return arvo && /^[a-z0-9-]{2,40}$/.test(arvo) ? arvo : null;
  } catch {
    return null;
  }
}

/**
 * Maalehti kuoressa: `?lehti=<kaupunki>&maa=<ISO3>[&sivu=<aihe-id>]` avaa
 * kaupungin sijaan maan lehden (kartuscha, natiivin Natiivi-UI), aiheen
 * sivulta jos annettu. Kaupunki pysyy pelin sijaintina (pikatie tarvitsee
 * kaupungin). Palauttaa { maa, sivu } tai null.
 */
export function lehtikuorenMaa(search = globalThis.location?.search ?? '') {
  try {
    const q = new URLSearchParams(search);
    const maa = q.get('maa');
    if (!maa || !/^[A-Z]{3}$/.test(maa)) return null;
    const sivu = q.get('sivu');
    return { maa, sivu: sivu && /^[a-z0-9-]{1,60}$/.test(sivu) ? sivu : null };
  } catch {
    return null;
  }
}

/** Viesti natiiville kuorelle; selaimessa pelkkä sivutapahtuma. */
export function ilmoitaNatiiville(tapahtuma, tiedot = {}, ikkuna = globalThis) {
  const viesti = { tapahtuma, ...tiedot };
  try { ikkuna.webkit?.messageHandlers?.matkakirja?.postMessage?.(viesti); } catch { /* ei kuorta */ }
  try { ikkuna.dispatchEvent?.(new CustomEvent(LEHTIKUORI_TAPAHTUMA, { detail: viesti })); } catch { /* ei ikkunaa */ }
  return viesti;
}

/**
 * Avaa kaupungin lehden ja kytkee sulkemisen natiiville. `ui` on jo
 * asennettu (mount) ja `ui.lehtikuori` tosi.
 */
export function avaaLehtikuori(ui, kaupunki, maalehti = lehtikuorenMaa()) {
  const city = ui.game.board.cityById.get(kaupunki);
  if (!city) return false;
  const maa = maalehti?.maa && ui.game.pack?.map?.countryShapes?.[maalehti.maa] ? maalehti : null;
  const dialogi = ui.arrivalDialog;
  dialogi?.addEventListener('close', () => {
    ilmoitaNatiiville('lehti-suljettu', { kaupunki, ...(maa ? { maa: maa.maa } : {}) });
  }, { once: true });
  if (maa) ui.avaaMaalehti(maa.maa, { sivu: maa.sivu });
  else ui.openArrival(city, { ohitaLehtilukko: true });
  ilmoitaNatiiville('lehti-auki', { kaupunki, ...(maa ? { maa: maa.maa } : {}) });
  return true;
}

/*
 * Teot, jotka natiivi toistaa (Kaupat.cs). Palautusarvo kertoo, muuttiko
 * teko tilaa: { ok } ja { ok, uusi: false } (eläintäky, juliste jo ennestään)
 * erotetaan, jotta natiivi ei kirjaa samaa kahdesti; kirjaaNostotehtava
 * palauttaa laskurin, merkitseAarrepisteOhje true vain ensimmäisellä kerralla.
 */
export const LEHDEN_TEOT = Object.freeze([
  'actionKulttuuri', 'actionMinitehtava', 'kirjaaNostotehtava', 'merkitseAarrepisteOhje',
  'actionPullaVinkki', 'actionPullaOstos', 'actionElaintaky', 'myonnaJuliste',
]);

function tekoMuuttiTilaa(tulos) {
  if (tulos === true) return true;
  if (typeof tulos === 'number') return true;
  if (!tulos || typeof tulos !== 'object' || !tulos.ok) return false;
  return tulos.uusi !== false;
}

/** Kytkee lehden teot natiiville (kerran per peli). Palauttaa kytkettyjen nimet. */
export function kytkeTekoSilta(game, ikkuna = globalThis) {
  if (!game || game.__tekoSilta) return [];
  game.__tekoSilta = true;
  const kytketyt = [];
  for (const nimi of LEHDEN_TEOT) {
    const alkuperainen = game[nimi];
    if (typeof alkuperainen !== 'function') continue;
    game[nimi] = function tekoSillanKautta(...args) {
      const tulos = alkuperainen.apply(this, args);
      if (tekoMuuttiTilaa(tulos)) ilmoitaNatiiville('teko', { teko: nimi, args }, ikkuna);
      return tulos;
    };
    kytketyt.push(nimi);
  }
  return kytketyt;
}

/** Natiivin antama alkutila osoitteen risuaidasta `#tila=<base64url>` tai null. */
export function lehtikuorenTila(hash = globalThis.location?.hash ?? '') {
  try {
    const arvo = new URLSearchParams(String(hash).replace(/^#/, '')).get('tila');
    if (!arvo) return null;
    const b64 = arvo.replace(/-/g, '+').replace(/_/g, '/');
    const tavut = Uint8Array.from(atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4)), (c) => c.charCodeAt(0));
    const tila = JSON.parse(new TextDecoder().decode(tavut));
    return tila && typeof tila === 'object' ? tila : null;
  } catch {
    return null;
  }
}

/** Asettaa natiivin tilan lehden peliin (raha ja kauppojen kirjanpito). */
export function asetaLehtikuorenTila(game, tila) {
  if (!game || !tila) return false;
  if (Number.isFinite(tila.raha) && game.player) game.player.money = tila.raha;
  const k = tila.kaupat ?? {};
  const joukko = (arvo) => new Set(Array.isArray(arvo) ? arvo.filter((x) => typeof x === 'string') : []);
  game.kulttuuriVastatut = joukko(k.kulttuuri);
  game.minitehtavatVastatut = joukko(k.minitehtavat);
  game.minitehtavatOikein = joukko(k.minitehtavatOikein);
  game.nostotehtavatRatkaistu = Number.isFinite(k.nostotehtavat) ? k.nostotehtavat : 0;
  game.aarrepisteOhjeNahty = k.aarrepisteOhje === true;
  game.pullaVinkit = joukko(k.pullat);
  game.elaintakyLunastetut = joukko(k.elaintayt);
  game.julisteet = joukko(k.julisteet);
  return true;
}
