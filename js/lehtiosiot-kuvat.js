/**
 * OSIOHAKEMISTON NOSTOKUVAT (js/lehtiosiot.js).
 *
 * Oma moduuli tuontisyklin takia: osiohakemisto kuuluu lehteen, jonka
 * kaupunkinosto tuo, mutta nostojen kuvat asuvat fokusmoduuleissa, jotka
 * itse tuovat kaupunkinoston. Tämä moduuli on niiden kaikkien jälkeen ja
 * rekisteröi haun lehdelle käynnistyksessä (main.js kytkeOsiohakKuvat).
 */
import { asetaOsiohakNostonKuva } from './lehtiosiot.js';
import { KOHDE_MAAT } from './fokuskohteet.js';
import { NOSTO_MAAT, nostonKuvat } from './fokusnosto.js';
import { hetkenKuvat, HISTORIAN_HETKET } from './packs/historian-hetket.js';
import { SKANDAALIT } from './packs/skandaalit.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { KAUPUNKIKARTAT } from './packs/maakartat.js';

/**
 * Noston kuva tunnuksen mukaan (liuskan rivit): historian hetki, täkynosto,
 * skandaali tai kaupunkikartan tarinakohteen nähtävyysjuttu.
 */
export function osiohakNostonKuva(id, { iso = null, cityId = null } = {}) {
  const tunnus = String(id ?? '');
  if (tunnus.startsWith('hetki-')) {
    const h = HISTORIAN_HETKET.find((x) => x.id === tunnus.slice(6));
    const k = h ? hetkenKuvat(h)[0] : null;
    if (k?.osoite) return { osoite: k.osoite, suora: true };
  }
  if (tunnus.startsWith('nosto-') && iso) {
    const n = (NOSTO_MAAT[iso] ?? []).find((x) => x.id === tunnus.slice(6));
    const k = n ? nostonKuvat(n)[0] : null;
    if (k) return k;
  }
  if (tunnus.startsWith('skandaali-') && iso) {
    const s = (SKANDAALIT[iso] ?? []).find((x) => x.id === tunnus.slice(10));
    if (s?.kuva?.osoite || s?.kuva?.tiedosto) return s.kuva;
  }
  // Kadonnut ihme tai muu kohde, jolla on oma kuva (ihmeen loistoaika).
  const kohde0 = Object.values(KOHDE_MAAT).flat().find((k) => k?.id === tunnus);
  if (kohde0?.ihme?.osoite) return { osoite: kohde0.ihme.osoite, suora: true };
  if (kohde0?.kuva?.osoite || kohde0?.kuva?.tiedosto) return kohde0.kuva;
  // Kaupunkikartan kohde, joka kantaa tämän noston: sen juttu kuvineen.
  if (cityId) {
    const kohde = (KAUPUNKIKARTAT[cityId]?.kohteet ?? []).find((k) => (Array.isArray(k.nosto) ? k.nosto : [k.nosto]).includes(tunnus));
    const juttu = kohde ? NAHTAVYYSJUTUT[cityId]?.[kohde.nimi] : null;
    const k = juttu?.kuvat?.[0] ?? null;
    if (k?.osoite || k?.tiedosto) return k;
  }
  return null;
}

/** Kytkee haun lehden osiohakemistoon (main.js, testit). */
export function kytkeOsiohakKuvat() { asetaOsiohakNostonKuva(osiohakNostonKuva); }
