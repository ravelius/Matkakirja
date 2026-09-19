/**
 * IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET SIITÄ KOHDASTA, MISSÄ PELAAJA ON
 * (Raamattu, "IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET JOKA JAKSOON",
 * omistaja 19.9.2026 klo 18.02 Suomen aikaa, sanatarkasti: *"Tässä
 * pitäisi olla tuon tekstin tilalla muutama valmis kysymys riippuen
 * siitä missä kohtaa pelaaja on. Ne voisi tehdä valmiiksi etukäteen joka
 * paikkaan Linssissä."*).
 *
 * Pulun keskustelupaneeli (js/pollo.js) ei tunne linssejä. Linssin ajo
 * (js/aikajana.js kaynnistaAikajana) kytkee siksi ui:hin yhden kyselyn,
 * `ui.pulunLinssikysymykset()`, ja paneeli lukee sen avautuessaan:
 *
 *   null  → tavallinen tervehdys ja tavallinen tarjonta, kuten ennen.
 *   olio  → { avain, tunnus, kysymykset, vastaus(kysymys) }
 *           tervehdyksen TILALLA kysymysnapit. `vastaus` antaa
 *           ESIKIRJOITETUN vastauksen lähteineen (ei mallikutsua), tai
 *           null, jolloin kysymys menee pulun tavallista reittiä.
 *
 * MISSÄ PELAAJA ON, järjestyksessä:
 *   1. AUKI OLEVA NOSTOKORTTI (js/linssit/ihmisen-matka-kortti.js):
 *      pääjakson kortti antaa jakson kolme kysymystä vastauksineen;
 *      LISÄNOSTON kortti antaa oman `kysymykset`-kenttänsä
 *      (IHMISEN_MATKA_LISANOSTOT), joille ei ole esikirjoitettua
 *      vastausta — ne kulkevat pulun mallireittiä kuten kortin omat
 *      napit.
 *   2. ESITYKSEN JAKSO: kertomuksen nykyinen jakso tai, siirtymä- ja
 *      alue-jaksoilla, lähin sitä EDELTÄVÄ löytöpaikka. Esitys jatkaa
 *      tutkimusvaiheessa viimeiseen jaksoonsa, ja aikaselain kelaa
 *      saman indeksin — kysymykset seuraavat sitä.
 *   3. Ennen ensimmäistä löytöpaikkaa (avaus, Afrikan valot) ei ole
 *      paikkaa, josta kysyä: tavallinen tervehdys.
 */
import {
  IHMISEN_MATKAN_KYSYMYKSET, haeIhmisenMatkanKysymykset, haeIhmisenMatkanVastaus,
} from './ihmisen-matka-kysymykset.js';
import { IHMISEN_MATKA_LISANOSTOT } from './ihmisen-matka-data.js';

/** Linssin tunnus, jonka ajolle kysely kytketään. */
export const PULUKYSYMYSTEN_LINSSI = 'ihmisen-matka';

/**
 * Kertomuksen jakso → löytöpaikan tunnus, jolla on valmiit kysymykset.
 * Siirtymäjaksolla (kohde null) katsotaan taaksepäin: pelaaja on juuri
 * lähtenyt edellisestä löytöpaikasta, eikä seuraava ole vielä ruudulla.
 *
 * @param {Array<{kohde?: string|null}>} kertomus
 * @param {number} indeksi
 * @returns {string|null}
 */
export function jaksonKysymystunnus(kertomus, indeksi) {
  if (!Array.isArray(kertomus) || !Number.isInteger(indeksi)) return null;
  for (let i = Math.min(indeksi, kertomus.length - 1); i >= 0; i -= 1) {
    const kohde = kertomus[i]?.kohde;
    if (kohde && IHMISEN_MATKAN_KYSYMYKSET[kohde]) return kohde;
  }
  return null;
}

/**
 * Pulun kysymystilanne puhtaista tiedoista (testattava ilman DOMia).
 *
 * @param {{ kertomus?: Array, indeksi?: number, avoinNosto?: string|null }} tiedot
 * @returns {{ avain: string, tunnus: string, lisanosto: boolean,
 *   kysymykset: string[], vastaus: (k: string) => object|null } | null}
 */
export function pulunKysymystilanne({ kertomus = [], indeksi = -1, avoinNosto = null } = {}) {
  if (avoinNosto) {
    const lisa = IHMISEN_MATKA_LISANOSTOT.find((l) => l.tunnus === avoinNosto);
    if (lisa) {
      const kysymykset = (lisa.kysymykset ?? []).filter(Boolean).slice(0, 3);
      if (kysymykset.length) {
        return {
          avain: `lisanosto:${lisa.tunnus}`,
          tunnus: lisa.tunnus,
          lisanosto: true,
          kysymykset,
          vastaus: () => null,
        };
      }
    }
    if (IHMISEN_MATKAN_KYSYMYKSET[avoinNosto]) return jaksonTilanne(avoinNosto);
  }
  const tunnus = jaksonKysymystunnus(kertomus, indeksi);
  return tunnus ? jaksonTilanne(tunnus) : null;
}

function jaksonTilanne(tunnus) {
  const kysymykset = haeIhmisenMatkanKysymykset(tunnus);
  if (!kysymykset.length) return null;
  return {
    avain: `jakso:${tunnus}`,
    tunnus,
    lisanosto: false,
    kysymykset,
    vastaus: (kysymys) => haeIhmisenMatkanVastaus(tunnus, kysymys),
  };
}

/**
 * Kytkee kyselyn ui:hin linssin ajaksi. Palauttaa purun, joka poistaa
 * vain oman kyselynsä (uusi ajo on voinut jo kytkeä omansa).
 *
 * @param {object} ui
 * @param {object} ajo aikajanan ajo (kaari.kertomus, esitys)
 * @returns {() => void}
 */
export function kytkePulunKysymykset(ui, ajo) {
  if (!ui || !ajo) return () => {};
  const kysely = () => {
    const kortti = ui.nostokortti?.tila?.() ?? null;
    const esitys = ajo.esitys?.tila?.() ?? null;
    return pulunKysymystilanne({
      kertomus: ajo.kaari?.kertomus ?? [],
      indeksi: Number.isInteger(esitys?.indeksi) ? esitys.indeksi : -1,
      avoinNosto: kortti?.auki ?? null,
    });
  };
  ui.pulunLinssikysymykset = kysely;
  return () => {
    if (ui.pulunLinssikysymykset === kysely) ui.pulunLinssikysymykset = null;
  };
}
