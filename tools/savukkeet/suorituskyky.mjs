/*
 * SUORITUSKYKYVARTIOT POIS PR-PORTISTA (omistaja 20.9.2026 klo 18.05).
 *
 * Aikaa tai kehystahtia mittaavat väitteet (fps, kehysajan p95, "alle
 * N ms napautuksesta") flakkasivat PR-portissa v1976/v1979, kun
 * simulaattorit ja agenttien selaimet veivät Mac-runnerin suorittimen
 * (~80 %). Mittari ei ollut väärässä — kone oli kuormassa — mutta portti
 * kaatui vaikka koodi ei muuttunut.
 *
 * Mekanismi: savuke kääri aikaväitteensä `suorituskykyVaatija(vaadi)`-
 * apurilla. Kun SAVUKE_SUORITUSKYKY=1 (sarjat.json 'suorituskyky'-sarja,
 * schedule kerran päivässä mainista), väite on tavallinen OK/FAIL. Muuten
 * (PR-portti) sama mittaus tulostetaan INFO-rivinä, jotta luku jää lokiin
 * eikä yhtään vartiota poisteta — se vain ei kaada porttia.
 *
 * Toiminnalliset osat (liuska aukesi, kamera liikkui, reliefi tuli
 * pinnalle) jäävät aina tavallisiksi väitteiksi: jaa sekaväite kahtia
 * ennen kuin käärit aikaosan.
 */
export const SUORITUSKYKY_PAALLA = process.env.SAVUKE_SUORITUSKYKY === '1';

/**
 * Käärii savukkeen oman `vaadi(nimi, ok, lisa)`-funktion aikaväitteille.
 *
 * @param {(nimi: string, ok: boolean, lisa?: string) => unknown} vaadi
 * @returns {(nimi: string, ok: boolean, lisa?: string) => boolean}
 */
export function suorituskykyVaatija(vaadi) {
  return (nimi, ok, lisa = '') => {
    if (SUORITUSKYKY_PAALLA) { vaadi(nimi, ok, lisa); return Boolean(ok); }
    console.log(`INFO  suorituskyky ${ok ? 'rajoissa' : 'YLITYS'} (ei PR-portissa; SAVUKE_SUORITUSKYKY=1 vartioi): ${nimi}${lisa ? ` — ${lisa}` : ''}`);
    return Boolean(ok);
  };
}
