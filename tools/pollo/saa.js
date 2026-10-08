/*
 * PALLON SÄÄ "AUTOMAATTI" (omistaja 8.10.2026, Päätoimittaja: kohteen todellinen sää; natiivi junaan 166). Nykyinen sää
 * koordinaateista MET Norwayn Locationforecast 2.0 -rajapinnasta (api.met.no, data CC BY 4.0, kaupallinen käyttö sallittu;
 * Open-Meteon ilmaisversio on vain ei-kaupalliseen käyttöön). Ehdot (api.met.no/doc/TermsOfService): tunnistava
 * User-Agent, enintään 4 desimaalia, välimuisti ja Expires-otsakkeen kunnioitus, alle 20 pyyntöä/s koko sovellukselta —
 * siksi haku kulkee workerin kautta ja tulos on välimuistissa 15 min kaupunkia (tai ~1 km:n ruutua) kohden.
 * Lähteet-sivulle: "Säätiedot: MET Norway (Norjan ilmatieteen laitos), CC BY 4.0".
 */

export const SAA_RAJAPINTA = 'https://api.met.no/weatherapi/locationforecast/2.0/complete';
export const SAA_UA = 'Matkakirja-opas/1.0 (https://matkakirja.app; peli@matkakirja.app)';
export const SAA_VALIMUISTI_S = 15 * 60;
export const SAA_LAHDE = { nimi: 'MET Norway (Norjan ilmatieteen laitos)', lisenssi: 'CC BY 4.0', url: 'https://api.met.no/' };
export const SAA_TILAT = ['selkea', 'pilvinen', 'sade', 'sumu', 'lumi', 'ukkonen'];

const pyorista = (x, d) => Math.round(Number(x) * 10 ** d) / 10 ** d;

/** Välimuistiavain: kaupunki nimellä (pienaakkosin) tai koordinaatit kahdella desimaalilla (~1 km). */
export function saaAvain({ kaupunki, lat, lon }) {
  const k = String(kaupunki ?? '').trim().toLowerCase();
  return k ? `saa:k:${k}` : `saa:p:${pyorista(lat, 2).toFixed(2)},${pyorista(lon, 2).toFixed(2)}`;
}

/**
 * MET:n symbolikoodi (clearsky_day, rainshowers_night, heavyrainandthunder, fog, …) ja mittaukset → pelin tila:
 * ukkonen > lumi > sade > sumu > pilvinen > selkea. Räntä (sleet) on sadetta, paitsi pakkasella lunta.
 */
export function saaTila({ symboli = '', pilvisyys = null, sumu = null, sade = null, lampotila = null } = {}) {
  const s = String(symboli).toLowerCase();
  if (s.includes('thunder')) return 'ukkonen';
  if (s.includes('snow')) return 'lumi';
  if (s.includes('sleet')) return lampotila !== null && lampotila <= 0 ? 'lumi' : 'sade';
  if (s.includes('rain') || (sade !== null && sade >= 0.3)) return 'sade';
  if (s.startsWith('fog') || (sumu !== null && sumu >= 50)) return 'sumu';
  if (s.startsWith('cloudy') || (pilvisyys !== null && pilvisyys >= 70)) return 'pilvinen';
  return 'selkea';
}

/** Locationforecastin vastaus → pelin säätietue (lähin aikapiste nyt-hetkeä). null, jos aikasarja puuttuu. */
export function jasennaSaa(data, nyt = Date.now()) {
  const sarja = data?.properties?.timeseries;
  if (!Array.isArray(sarja) || !sarja.length) return null;
  const piste = sarja.reduce((paras, x) => (Math.abs(Date.parse(x.time) - nyt) < Math.abs(Date.parse(paras.time) - nyt) ? x : paras));
  const d = piste.data?.instant?.details ?? {};
  const tunti = piste.data?.next_1_hours ?? piste.data?.next_6_hours ?? {};
  const symboli = tunti.summary?.symbol_code ?? '';
  const sade = tunti.details?.precipitation_amount ?? null;
  const luku = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : null);
  const tietue = {
    aika: piste.time,
    saakoodi: symboli || null,
    pilvisyys_pct: luku(d.cloud_area_fraction),
    sumu_pct: luku(d.fog_area_fraction),
    sade_mm_h: luku(sade),
    lumi: /snow/.test(symboli) || (/sleet/.test(symboli) && luku(d.air_temperature) !== null && d.air_temperature <= 0),
    ukkonen: /thunder/.test(symboli),
    tuuli_ms: luku(d.wind_speed),
    tuulen_suunta_ast: luku(d.wind_from_direction),
    lampotila_c: luku(d.air_temperature),
    paiva: !/_night/.test(symboli),
  };
  tietue.tila = saaTila({ symboli, pilvisyys: tietue.pilvisyys_pct, sumu: tietue.sumu_pct, sade: tietue.sade_mm_h, lampotila: tietue.lampotila_c });
  return tietue;
}
