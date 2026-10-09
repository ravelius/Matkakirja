/*
 * MIKSERIN TASOT KAIKILLE PELAAJILLE (omistaja 9.10.2026 klo 09.5x, sanatarkasti PT:n kautta: "joku worker tai joku muu
 * tapa suoraan tallentaa minun tekemät asetukset peliin kaikille käyttäjille vain nappia painamalla... vain, kun on se
 * kehittäjäkoodi päällä"). Natiivi-UI tekee mikserin napin; tämä on palvelinpuoli.
 *
 *   GET  /mikseri/tasot   julkinen luku (natiivi ilman Originia tai sallittu Origin), välimuisti 60 s.
 *                         Tyhjänä { versio: 0, tasot: {} } → appi käyttää omia oletuksiaan.
 *   POST /mikseri/tasot   tallennus VAIN kehittäjäkoodilla (otsake x-pollo-kehittaja === POLLO_KEHITTAJAKOODI,
 *                         vakioaikainen vertailu rajat.js vertaaSalaisuus). Koodi on workerin salaisuus: ei repoon,
 *                         ei lokiin, ei vastaukseen.
 *
 * SKEEMA (versio 1):
 *   { versio: <kokonaisluku, palvelin asettaa>, paivitetty: <ISO, palvelin>, skeema: 1,
 *     tasot: { <konteksti>: { ryhmat: { <ryhmä>: <kerroin> }, aanet: { <äänitunnus>: <kerroin> } } } }
 *   konteksti esim. "kartta", "pallo", "olavinlinna", "linssi:iss"; ryhmä esim. "musiikki", "tausta", "tehosteet",
 *   "lukija"; äänitunnus esim. "aanet/sonniss-aanet-v3/kolikot-1". Kerroin 0–4 (1 = ennallaan), lineaarinen.
 *   POST-runko: { tasot, pohjaVersio? }. Jos pohjaVersio annetaan ja se ei ole nykyinen versio → 409 (toisen tallennus
 *   ei jää huomaamatta). Kaikki muut kentät ohitetaan.
 *
 * TALLENNUS: R2 (PUHE_R2) mikseri/tasot.json (voimassa oleva) + mikseri/historia/<versio>.json (jokainen tallennus,
 * palautusta varten). Vanhat appit eivät tunne reittiä, joten niille ei muutu mitään.
 */
import { vertaaSalaisuus } from './rajat.js';

export const MIKSERI_POLKU = '/mikseri/tasot';
export const MIKSERI_AVAIN = 'mikseri/tasot.json';
export const MIKSERI_HISTORIA = (v) => `mikseri/historia/${String(v).padStart(6, '0')}.json`;
export const MIKSERI_OTSAKE = 'x-pollo-kehittaja';
const TUNNUS = /^[a-z0-9][a-z0-9._:/-]{0,95}$/;
const RAJAT = { konteksteja: 64, ryhmia: 64, aania: 1024, tavuja: 128 * 1024 };
export const TYHJA = Object.freeze({ versio: 0, skeema: 1, paivitetty: null, tasot: {} });

/** Tarkistaa ja normalisoi tasot. Palauttaa { tasot } tai { virhe }. Ei heitä. */
export function tarkistaTasot(tasot) {
  if (!tasot || typeof tasot !== 'object' || Array.isArray(tasot)) return { virhe: 'tasot puuttuu tai ei ole olio' };
  const kontekstit = Object.entries(tasot);
  if (kontekstit.length > RAJAT.konteksteja) return { virhe: `liikaa konteksteja (yli ${RAJAT.konteksteja})` };
  const ulos = {};
  for (const [konteksti, k] of kontekstit) {
    if (!TUNNUS.test(konteksti)) return { virhe: `virheellinen konteksti: ${String(konteksti).slice(0, 40)}` };
    if (!k || typeof k !== 'object' || Array.isArray(k)) return { virhe: `konteksti ${konteksti} ei ole olio` };
    const o = { ryhmat: {}, aanet: {} };
    for (const laji of ['ryhmat', 'aanet']) {
      const arvot = k[laji] ?? {};
      if (typeof arvot !== 'object' || Array.isArray(arvot)) return { virhe: `${konteksti}.${laji} ei ole olio` };
      const rivit = Object.entries(arvot);
      if (rivit.length > (laji === 'ryhmat' ? RAJAT.ryhmia : RAJAT.aania)) return { virhe: `${konteksti}.${laji}: liikaa rivejä` };
      for (const [tunnus, arvo] of rivit) {
        if (!TUNNUS.test(tunnus)) return { virhe: `virheellinen tunnus: ${String(tunnus).slice(0, 40)}` };
        if (typeof arvo !== 'number' || !Number.isFinite(arvo) || arvo < 0 || arvo > 4) return { virhe: `${konteksti}.${laji}.${tunnus}: kerroin 0–4` };
        o[laji][tunnus] = Math.round(arvo * 1000) / 1000;
      }
    }
    ulos[konteksti] = o;
  }
  return { tasot: ulos };
}

async function lueNykyinen(r2) {
  if (!r2) return { ...TYHJA };
  const o = await r2.get(MIKSERI_AVAIN).catch(() => null);
  if (!o) return { ...TYHJA };
  try { const d = JSON.parse(await o.text()); return d && typeof d === 'object' && d.tasot ? d : { ...TYHJA }; } catch { return { ...TYHJA }; }
}

const json = (data, status, otsakkeet) => new Response(JSON.stringify(data), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', ...otsakkeet } });

/** GET: voimassa olevat tasot. otsakkeet = CORS-otsakkeet kutsujalta. */
export async function hoidaMikseriLuku(env, otsakkeet = {}) {
  const d = await lueNykyinen(env.PUHE_R2);
  return json(d, 200, { ...otsakkeet, 'cache-control': 'public, max-age=60' });
}

/** POST: tallennus kehittäjäkoodilla. */
export async function hoidaMikseriTallennus(pyynto, env, otsakkeet = {}, nyt = new Date()) {
  const ei = { ...otsakkeet, 'cache-control': 'no-store' };
  if (!env.POLLO_KEHITTAJAKOODI || !vertaaSalaisuus(pyynto.headers.get(MIKSERI_OTSAKE), env.POLLO_KEHITTAJAKOODI)) {
    return json({ virhe: 'koodi', viesti: 'Vain kehittäjälle.' }, 403, ei);
  }
  if (!env.PUHE_R2) return json({ virhe: 'tallennus', viesti: 'Tallennuspaikka puuttuu.' }, 503, ei);
  const teksti = await pyynto.text();
  if (teksti.length > RAJAT.tavuja) return json({ virhe: 'koko', viesti: 'Liian suuri.' }, 413, ei);
  let runko;
  try { runko = JSON.parse(teksti); } catch { return json({ virhe: 'kysely', viesti: 'Pyyntö ei ollut JSONia.' }, 400, ei); }
  const t = tarkistaTasot(runko?.tasot);
  if (t.virhe) return json({ virhe: 'skeema', viesti: t.virhe }, 400, ei);
  const nykyinen = await lueNykyinen(env.PUHE_R2);
  if (runko.pohjaVersio !== undefined && runko.pohjaVersio !== nykyinen.versio) {
    return json({ virhe: 'versio', viesti: 'Tasot ovat muuttuneet välillä.', versio: nykyinen.versio }, 409, ei);
  }
  const uusi = { versio: (Number(nykyinen.versio) || 0) + 1, skeema: 1, paivitetty: nyt.toISOString(), tasot: t.tasot };
  const data = JSON.stringify(uusi);
  await env.PUHE_R2.put(MIKSERI_HISTORIA(uusi.versio), data, { httpMetadata: { contentType: 'application/json' } });
  await env.PUHE_R2.put(MIKSERI_AVAIN, data, { httpMetadata: { contentType: 'application/json' } });
  return json({ ok: true, versio: uusi.versio, paivitetty: uusi.paivitetty }, 200, ei);
}
