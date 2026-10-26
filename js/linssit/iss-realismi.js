/*
 * ISS-KYYDIN REALISMI WEBISSÄ (Siirtoseppä 28.9.2026; loki "OMISTAJA: ISS-REALISMI — KAIKKI NELJÄ", 28.9. klo 12.17).
 *
 * Omistajan järjestys kaupunkien valojen jälkeen: 1) auringon heijastus ja pinnan valaistus, 2) päivän oikeat pilvet
 * (NASA GIBS), 3) ilmakehän horisonttikaari + revontulet (NOAA SWPC OVATION), 4) vuodenaika (Blue Marble NG
 * -kuukausikuvat) + Kuu + tähdet. Linssiseppä tekee natiivin ensin (Unity), ja tämä moduuli siirtää webiin samat
 * arvot: WEB–NATIIVI-kuvapari per kohta. Kaikki lähteet PD (NASA/NOAA).
 *
 * Kytkentä (Pelikoodarin koukut, js/linssit/iss-kyyti-nakyma.js): luoIssKyytiNakyma({ realismi }) kutsuu
 *   rakenna({ pallo, luokat, metri, R })    kerran, kun Globe.gl:n THREE-luokat on löydetty (etsiLuokat)
 *   paivita({ osuus, ms, tila, iss, silma, kamera })  joka kehys, myös kaukotilassa (osuus 0…1 = kyydin siirtymä);
 *                                            ms on SIMULOITU aika (iss-rata.js SIMUKELLO, nopeutus 1–1000×)
 *   pura()
 * Kutsut ovat näkymän try/catchissa; tämä moduuli eristää lisäksi jokaisen kerroksen, ettei yhden virhe kaada muita.
 *
 * Kerros on olio { nimi, rakenna(y), paivita(y, k), pura() }, jossa y on yhteinen tila (pallo, luokat, metri, R) ja k
 * kehyksen tiedot + auringon suunta pallon koordinaateissa (yksikkövektori). Aurinko lasketaan simuloidusta ajasta
 * samalla kaavalla kuin näkymän horisonttikaari (auringonAlihajapiste ∘ jdHetkesta), kerran sekunnissa simuloitua aikaa.
 */

/** Auringon suunta päivitetään, kun simuloitu aika on muuttunut näin paljon (ms): 0,25°/min, sama kuin kaarella. */
export const AURINGON_VALI_MS = 1000;

/**
 * Auringon suunta pallon koordinaateissa: alihajapiste (lat, lon) pallon pisteeksi ja yksikkövektoriksi.
 * @param {{ getCoords: (lat: number, lon: number, alt: number) => { x: number, y: number, z: number } }} pallo
 * @param {{ lat: number, lon: number }} alihaja
 */
export function auringonSuunta(pallo, alihaja) {
  const p = pallo.getCoords(alihaja.lat, alihaja.lon, 0);
  const l = Math.hypot(p.x, p.y, p.z) || 1;
  return [p.x / l, p.y / l, p.z / l];
}

/**
 * @param {object} p
 * @param {(ms: number) => { lat: number, lon: number }} p.aurinko simuloidun hetken auringon alihajapiste
 *   (satelliitti-avaruus.js antaa: ms => auringonAlihajapiste(jdHetkesta(ms)))
 * @param {Array<object>} [p.kerrokset] realismikerrokset järjestyksessä
 * @param {(viesti: string, virhe: unknown) => void} [p.varoita]
 */
export function luoIssRealismi({ aurinko, kerrokset = [], varoita = () => {} } = {}) {
  if (typeof aurinko !== 'function') throw new Error('iss-realismi: aurinko(ms) puuttuu');
  let yhteinen = null;
  let aurinkoMs = -Infinity;
  let suunta = [1, 0, 0];
  let osuusNyt = 0;
  const virheet = new Map();
  const mittari = { kehyksia: 0, virheita: 0 };

  const eristetty = (kerros, nimi, ...arg) => {
    if (typeof kerros[nimi] !== 'function' || virheet.get(kerros.nimi) >= 3) return;
    try { kerros[nimi](...arg); } catch (e) {
      mittari.virheita += 1;
      const n = (virheet.get(kerros.nimi) ?? 0) + 1;
      virheet.set(kerros.nimi, n);
      // Kolmas virhe sammuttaa kerroksen tältä kyydiltä (virhe joka kehys täyttäisi konsolin).
      if (n === 1 || n === 3) varoita(`ISS-realismi ${kerros.nimi}.${nimi}${n === 3 ? ' (kerros pois)' : ''}`, e);
    }
  };

  // Korvaa-liput Pelikoodarin näkymälle (aa80fc1ea): kerros, jonka nimi on tässä, korvaa näkymän oman.
  const nimet = new Set(kerrokset.map((k) => k.nimi));
  return {
    korvaa: Object.freeze({ yokuori: nimet.has('yokuori'), kaari: nimet.has('ilmakaari'), pilvet: nimet.has('pilvet') }),
    /** A/B-säätimet kerroksittain (savukkeet ja vertailukuvat): ab('yokuori').valot = 0. */
    ab: (nimi) => kerrokset.find((k) => k.nimi === nimi)?.ab ?? null,
    rakenna({ pallo, luokat, metri, R } = {}) {
      if (!pallo?.getCoords) return;
      yhteinen = { pallo, luokat: luokat ?? {}, metri, R };
      for (const k of kerrokset) eristetty(k, 'rakenna', yhteinen);
    },
    paivita({ osuus = 0, ms, tila, iss, silma, kamera } = {}) {
      if (!yhteinen || !Number.isFinite(ms)) return;
      mittari.kehyksia += 1;
      if (Math.abs(ms - aurinkoMs) >= AURINGON_VALI_MS) {
        aurinkoMs = ms;
        suunta = auringonSuunta(yhteinen.pallo, aurinko(ms));
      }
      osuusNyt = Math.min(1, Math.max(0, osuus || 0));
      const kehys = { osuus, ms, tila, iss, silma, kamera, aurinko: suunta };
      for (const k of kerrokset) eristetty(k, 'paivita', yhteinen, kehys);
    },
    pura() {
      for (const k of kerrokset) eristetty(k, 'pura', yhteinen);
      yhteinen = null;
      aurinkoMs = -Infinity;
      osuusNyt = 0;
      virheet.clear();
    },
    /**
     * Satunnaisen tähtikentän kerroin (satelliitti-avaruus.js taivas.paivita): kun oikeat tähdet ovat valmiina
     * (iss-realismi-taivas.js tahdet.korvaaTahdet), kenttä häipyy kyydissä pois (1 − osuus); muuten 1.
     */
    satunnaisetTahdet() {
      return kerrokset.some((k) => k.korvaaTahdet?.()) ? 1 - osuusNyt : 1;
    },
    /** Savukkeille ja testeille: kerrokset, kehykset, virheet, viimeisin auringon suunta. */
    tila() {
      return { kerrokset: kerrokset.map((k) => ({ nimi: k.nimi, ...(k.tila?.() ?? {}) })), ...mittari, aurinko: [...suunta],
        rakennettu: Boolean(yhteinen) };
    },
  };
}
