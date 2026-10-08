/*
 * KULUSUUNNITELMA K1 (Päätoimittaja 8.10.2026, docs/raportit/kustannussuunnitelma-20261008.md): testi- ja kehitysliikenne
 * ei käytä Sonnetia, ja jokaisesta mallikutsusta jää kululokirivi.
 *
 * Mittaus 6.–8.10.: oppaan mallikutsuista ~90 % tuli roolien simulaattoreista ja skripteistä. Proto3d-käännökset
 * lähettävät kutsunsa ilman testiotsaketta, joten testiliikenne tunnistetaan myös User-Agentista:
 *   - "Matkakirja/0.1.0 (app.matkakirja.proto3d)", "app.matkakirja.proto3d/1" = proto-käännös (simut, Laitetestaajan iPad)
 *   - "Matkakirja/0.1.0 (fi.matkakirja.peli.kehitys)" = kehityskäännös
 *   - "node", "curl/…" = savukkeet, todistusajot ja Actions
 *   - x-matkakirja-testi tai x-matkakirja-testitunnus -otsake (arvoa ei tarvitse tarkistaa: väärennös saa vain halvemman mallin)
 * TestFlight-appi ("Matkakirja/1.1 (fi.matkakirja.peli)") on peliä myös kehittäjäotsakkeella: omistajan oma pelaaminen
 * pysyy Sonnetilla.
 *
 * JAETUT VÄLIMUISTIT käyttävät aina tuotantomallia (kutsun `jaettu: true`): kaupungin kohteet, Liiku-lista, paikan
 * valmiit kysymykset ja maailman suosikit generoidaan kerran ja tarjotaan kaikille pelaajille, joten testiliikenteen
 * Haiku ei saa kirjoittaa niitä.
 */

export const KULU_TESTIMALLI_OLETUS = 'claude-haiku-5-5';

const TESTI_UA = /proto3d|matkakirja\.peli\.kehitys|^node\b|^curl\//i;

/** 'testi' tai 'peli'. */
export function kuluLuokka({ ua = '', testi = false, testitunnus = false } = {}) {
  return testi || testitunnus || TESTI_UA.test(String(ua ?? '')) ? 'testi' : 'peli';
}

/**
 * Pyynnön kuluympäristö: luokka ja reitti lokiin, testiliikenteelle testimalli (env.OPAS_TESTI_MALLI, oletus Haiku 5.5;
 * arvo "pois" palauttaa tuotantomallin kaikille).
 */
export function kuluKentat(env, { ua, testi, testitunnus, reitti }) {
  const luokka = kuluLuokka({ ua, testi, testitunnus });
  const testimalli = env?.OPAS_TESTI_MALLI === 'pois' ? null : env?.OPAS_TESTI_MALLI || KULU_TESTIMALLI_OLETUS;
  return { KULU_LUOKKA: luokka, KULU_REITTI: reitti, ...(luokka === 'testi' && testimalli ? { KULU_TESTIMALLI: testimalli } : {}) };
}

/** Kutsun malli: testimalli (paitsi jaetuille välimuisteille), muuten kutsujan ohitus, POLLO_MALLI tai oletus. */
export function valitseMalli(env, { malliOhitus = null, jaettu = false, oletus }) {
  return (!jaettu && env?.KULU_TESTIMALLI) || malliOhitus || env?.POLLO_MALLI || oletus;
}

/**
 * Kululokirivi (Cloudflaren lokit → päivittäinen erittely): "kulu: <reitti> <luokka> <malli> in=… cw=… cr=… out=…".
 * Ei pelaajan tekstiä, vain tokenimäärät.
 */
export function kuluRivi(env, malli, kaytto) {
  const k = kaytto ?? {};
  const cw = (k.cache_creation_input_tokens ?? 0);
  return `kulu: ${env?.KULU_REITTI ?? '?'} ${env?.KULU_LUOKKA ?? '?'} ${malli} in=${k.input_tokens ?? 0} cw=${cw} `
    + `cr=${k.cache_read_input_tokens ?? 0} out=${k.output_tokens ?? 0}`;
}
