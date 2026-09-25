/*
 * PALLON VEKTORIVIIVAT — RANNIKON NAULAUS TYÖSÄIKEESSÄ (Web Worker).
 *
 * Sulavuuserä E1 (Karttaseppä 21.9.2026, omistajan päätös "KARTAN
 * SULAVUUS ENSIN"): pelaajan maan korostuksen naulaus rantaan
 * (js/pallovektorit-naulaus.js naulaaKorostus) oli mitattuna 350–390 ms:n
 * yksittäinen tehtävä puhelimen tehoilla (CPU 4×) juuri zoomin
 * ylittäessä naulauksen tiheysrajan — se on nykäys keskellä nipistystä.
 * Tässä säikeessä sama laskenta ei pysäytä kehystä; pääsäie saa valmiit
 * viivat viestinä ja rakentaa niistä geometrian (murto-osa solusta).
 *
 * Rannikkosolut pidetään täällä muistissa, jotta jokainen naulaus ei
 * kopioi koko rannikkoa säikeiden välillä: pääsäie lähettää solun
 * kerran sen latautuessa ja pyytää naulausta pelkillä solujen
 * tunnuksilla.
 *
 * Viestit sisään:
 *   { tyyppi: 'solu', id, viivat }         rannikkosolu muistiin
 *   { tyyppi: 'poista', id }               solu pois muistista
 *   { tyyppi: 'naulaa', pyynto, renkaat, solut: [id…], asetukset }
 * Viesti ulos:
 *   { tyyppi: 'naulattu', pyynto, viivat, pudotettuja, rannikkojanoja }
 *   tai { tyyppi: 'virhe', pyynto, viesti }.
 */
import { naulaaKorostus } from './pallovektorit-naulaus.js';

const solut = new Map();

self.addEventListener('message', (e) => {
  const v = e.data ?? {};
  try {
    if (v.tyyppi === 'solu') { solut.set(v.id, Array.isArray(v.viivat) ? v.viivat : []); return; }
    if (v.tyyppi === 'poista') { solut.delete(v.id); return; }
    if (v.tyyppi !== 'naulaa') return;
    const rannikot = [];
    for (const id of v.solut ?? []) { const viivat = solut.get(id); if (viivat) for (const viiva of viivat) rannikot.push(viiva); }
    const tulos = naulaaKorostus(v.renkaat ?? [], rannikot, v.asetukset ?? {});
    self.postMessage({
      tyyppi: 'naulattu', pyynto: v.pyynto, viivat: tulos.viivat,
      pudotettuja: tulos.pudotettuja, rannikkojanoja: tulos.rannikkojanoja, rannikkoja: rannikot.length,
    });
  } catch (syy) {
    self.postMessage({ tyyppi: 'virhe', pyynto: v.pyynto, viesti: String(syy?.message ?? syy) });
  }
});
