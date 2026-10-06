/*
 * REUNAMUISTI JA KV-KESTÄVYYS (Päätoimittaja 6.10.2026 aamu: Cloudflaren hälytys "KV daily operation limit 50% reached";
 * ilmaistaso 1 000 kirjoitusta/vrk, nollaus 03.00). Opas kirjoitti KV:hen useita kertoja pysähdystä kohden.
 *
 * 1) Lyhytikäinen istunto- ja lukkotieto (kierros, suunnat, isoisä, tuotantolukot, Nominatimin vuoro) asuu reunan
 *    Cache API:ssa (caches.default): ei KV-kiintiötä, säilyy saman PoP:n sisällä, ja pelaajan laite osuu käytännössä
 *    aina samaan PoP:hen. Ilman Cache API:a (testit, paikallinen ajo) isolaatin muisti.
 * 2) Kaikki KV-kutsut fail-open: luku- tai kirjoitusvirhe (raja ylittyi) ei koskaan kaada pyyntöä.
 */

const REUNA_JUURI = 'https://pollo-reuna.invalid/';
const muisti = new Map(); // avain → { arvo, vanhenee }

function reunaPyynto(avain) {
  return new Request(REUNA_JUURI + encodeURIComponent(avain));
}

function reunaValimuisti() {
  try {
    return typeof caches !== 'undefined' && caches?.default ? caches.default : null;
  } catch {
    return null;
  }
}

/** Reunamuistin luku: merkkijono tai null. Ei koskaan heitä. */
export async function reunaLue(avain, nyt = Date.now()) {
  const m = muisti.get(avain);
  if (m && m.vanhenee > nyt) return m.arvo;
  if (m) muisti.delete(avain);
  const c = reunaValimuisti();
  if (!c) return null;
  try {
    const osuma = await c.match(reunaPyynto(avain));
    return osuma ? await osuma.text() : null;
  } catch {
    return null;
  }
}

/** Reunamuistin kirjoitus (ttlS sekuntia). Ei koskaan heitä. */
export async function reunaKirjoita(avain, arvo, ttlS, nyt = Date.now()) {
  muisti.set(avain, { arvo: String(arvo), vanhenee: nyt + ttlS * 1000 });
  if (muisti.size > 5000) muisti.delete(muisti.keys().next().value);
  const c = reunaValimuisti();
  if (!c) return;
  try {
    await c.put(reunaPyynto(avain), new Response(String(arvo), {
      headers: { 'cache-control': `max-age=${Math.max(1, Math.round(ttlS))}`, 'content-type': 'text/plain; charset=utf-8' },
    }));
  } catch { /* fail-open */ }
}

/** Reunamuistin poisto. Ei koskaan heitä. */
export async function reunaPoista(avain) {
  muisti.delete(avain);
  const c = reunaValimuisti();
  if (!c) return;
  try { await c.delete(reunaPyynto(avain)); } catch { /* fail-open */ }
}

/** KV-luku fail-open: arvo tai null (ei KV:tä / virhe / raja). */
export async function kvLue(kv, avain) {
  if (!kv) return null;
  try {
    return (await kv.get(avain)) ?? null;
  } catch (virhe) {
    console.log(`pollo: KV-luku epäonnistui (${avain.split(':').slice(0, 2).join(':')}): ${virhe?.message ?? virhe}`);
    return null;
  }
}

/** KV-kirjoitus fail-open: true onnistui, false ei (ei KV:tä / virhe / päiväraja). */
export async function kvKirjoita(kv, avain, arvo, asetukset) {
  if (!kv) return false;
  try {
    await kv.put(avain, arvo, asetukset);
    return true;
  } catch (virhe) {
    console.log(`pollo: KV-kirjoitus epäonnistui (${avain.split(':').slice(0, 2).join(':')}): ${virhe?.message ?? virhe}`);
    return false;
  }
}

/** Testeille: tyhjennä isolaatin reunamuisti. */
export function tyhjennaReunamuisti() {
  muisti.clear();
}
