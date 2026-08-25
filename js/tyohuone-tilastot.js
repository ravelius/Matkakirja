/*
 * TILASTOT — kehittäjän liite, joka kertoo missä rakennustyö menee
 * (omistajan tilaus 18.8.2026: "siirrä työhuonesivuston tarpeellinen
 * sisältö pelin kehittäjätilaan ja poista erillissivusto").
 *
 * Erillinen tyohuone.html poistettiin tämän myötä kokonaan. Sen kaksi
 * aidosti käytössä ollutta taulua — Laudat ja Kaupunkilehdet
 * mantereittain — yhdistyvät tässä yhdeksi vetolaatikkotauluksi, joka
 * on rakennettu omistajan pyytämään järjestykseen:
 *
 *   MANNER  →  sen MAAT  →  kunkin maan KAUPUNGIT
 *
 * Mannerrivi on nappi. Auki klikattaessa paljastuvat sen maat, ja
 * maarivi taas paljastaa omat kaupunkinsa. Näin lehdet ryhmittyvät
 * niin, että maan rivin alla näkyvät aina juuri sen kaupungit.
 *
 * TILA LASKETAAN AINA PELIDATASTA, EI KÄSIN YLLÄPIDETYSTÄ LISTASTA.
 * Jokainen sarake lukee saman paketin kuin peli itse (ks. LAHTEET
 * alla), joten taulu ei voi näyttää vanhentunutta tietoa: kun paketti
 * muuttuu, luku muuttuu samalla latauksella. Tämä oli erillisen
 * työhuoneen paras piirre ja se säilyy sellaisenaan.
 *
 * LAHTEET sarakkeittain:
 *   Lehti        KULTTUURI_KATEGORIAT[kaupunki], osio id 'kaupunki'
 *   Aihesivut    saman listan muut osiot
 *   Kartta       KAUPUNKIKARTAT[kaupunki]
 *   Jutut        NAHTAVYYSJUTUT[kaupunki][kohde].teksti tai kohteen oma
 *   Miniat.      MINIATYYRIT[kaupunki][kohde]
 *   Merkintä     TARINAKAARI (kaari) tai SAAPUMISTEKSTIT (vanha)
 *   Luenta       SAAPUMISLUENNAT ('lauta:kaupunki')
 *   Sää          SAATIEDOT[kaupunki]
 *   Kohtaam.     KOHTAAMISET[kaupunki]
 *   Ääni         kaupungin oma ambience-kenttä laudalla
 *   Kuvat        KAIKKI_VALOKUVAT[kaupunki]
 *   Visa         laudan questions[kaupunki]
 *   Maalehti     MAA_KATEGORIAT[maatunnus]
 *   Maakartta    MAAKARTAT[maatunnus]
 *   Lippu        maailmankartan countryShapes[maatunnus].lippu
 *   Luvut        MAATIEDOT[maatunnus]
 *   Radio        RADIOT[maatunnus]
 *
 * Lehden viimeinen sivu on KIINTIÖT (omistajan tilaus 21.8.2026):
 * R2-tilankäyttö, repon koko sekä ElevenLabsin ja pöllön kuukausi-
 * kiintiöt. Ne piirrettiin ennen hampurilaisvalikon alaosaan; data ja
 * hakulogiikka siirtyivät tänne sellaisenaan (ks. osio KIINTIÖT).
 */

import { PACKS } from './pack.js';
import { html, kehittajaTilaPaalla } from './ui-apurit.js';
import { POLLOPALVELIN } from './packs/pollo-asetukset.js';
import { POLLO_KEHITTAJAKOODI_AVAIN } from './pollo.js';
import { PEILI_JUURI } from './media.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import { KAUPUNKIKARTAT, MAAKARTAT } from './packs/maakartat.js';
import { JULISTEET } from './packs/julisteet.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { MINIATYYRIT } from './packs/miniatyyrit.js';
import { SAATIEDOT } from './packs/saatiedot.js';
import { KOHTAAMISET } from './packs/kohtaamiset.js';
import { RADIOT } from './packs/radiot.js';
import { TARINAKAARI } from './packs/tarinakaari.js';
import { PELIT as KATKOPELIT } from './tyohuone-pelit.js';
import { TUOREET } from './tyohuone-tilanne.js';
import { viitekuvaTila } from './viitekuva-herot.js';
import {
  SAAPUMISTEKSTIT, MAATIEDOT, KAIKKI_VALOKUVAT, ARTIKKELIT,
  KIELET, SAAPUMISLUENNAT, luentaLauta,
} from './sisaltotaulut.js';

/*
 * Mantereet siinä järjestyksessä, jossa työ etenee — ei
 * aakkosjärjestyksessä. Yhdistelmälaudat maailma ja maailmankartta
 * puuttuvat tarkoituksella: ne toistavat samat kaupungit, ja niiden
 * rivit olisivat kaksinkertaista kirjanpitoa (sama rajaus oli
 * erillisen työhuoneen tauluissa).
 */
const MANTEREET = [
  ['europe', 'Eurooppa'],
  ['middleeast', 'Lähi-itä'],
  ['asia', 'Aasia'],
  ['africa', 'Afrikka'],
  ['oceania', 'Oseania'],
  ['northamerica', 'Pohjois-Amerikka'],
  ['southamerica', 'Etelä-Amerikka'],
];

/** Järjestysvalinnan muistipaikka (omistajan toive 18.8.2026). */
const JARJESTYS_AVAIN = 'matkakirja-tilastot-jarjestys';

/*
 * Tuoreusvärit ja -suodatin (omistajan tilaus 20.8.2026): vasta
 * valmistuneen kaupungin nimi saa vihreän pohjan versionumeroineen ja
 * työn alla olevan keltaisen; "vain tuoreet" -näkymä listaa pelkät
 * nämä rivit avattuina. Lähde on TUOREET-taulu (tyohuone-tilanne.js),
 * jota Fable päivittää julkaisujen tahdissa — taulu itse ei voi
 * tietää tuoreutta pelidatasta, koska paketeissa ei ole aikaleimoja.
 */
const TUORE_VALMIS = new Map((TUOREET?.valmiit ?? []).map((k) => [k.id, k.versio ?? '']));
const TUORE_TYOSSA = new Set((TUOREET?.tyossa ?? []).map((k) => k.id));
const NAKYMA_AVAIN = 'matkakirja-tilastot-nakyma';

function lueTilastoNakyma() {
  try {
    return window.localStorage?.getItem(NAKYMA_AVAIN) === 'tuoreet'
      ? 'tuoreet' : 'kaikki';
  } catch { return 'kaikki'; }
}

function tallennaTilastoNakyma(arvo) {
  try { window.localStorage?.setItem(NAKYMA_AVAIN, arvo); } catch { /* yksityinen tila */ }
}

function lueJarjestys() {
  try {
    return window.localStorage?.getItem(JARJESTYS_AVAIN) === 'valmius'
      ? 'valmius' : 'aakkoset';
  } catch { return 'aakkoset'; }
}

function tallennaJarjestys(arvo) {
  try { window.localStorage?.setItem(JARJESTYS_AVAIN, arvo); } catch { /* yksityinen tila */ }
}

/*
 * Kaupungin osat. Jokainen on yksi yksikkö valmiusasteessa, ja sama
 * lista tuottaa sekä sarakkeet että osuuden — kaksi eri listaa
 * ajautuisi väistämättä erilleen.
 *
 * `arvo` palauttaa joko totuusarvon (✓ / –) tai parin [tehty, kaikki],
 * jolloin solu näyttää suhteen ja osuus saa murto-osan.
 */

/*
 * Onko kaupungilla kaupunkilehti — sama ehto kuin Lehti-sarakkeella.
 *
 * Oma funktio siksi, että kartan kehittäjävärit (js/ui.js drawBoard,
 * omistajan tilaus 20.8.2026) tarvitsevat täsmälleen saman määritelmän.
 * Kaksi rinnakkaista ehtoa ajautuisi ennen pitkää erilleen, ja taulu ja
 * kartta kertoisivat eri tarinaa samasta kaupungista.
 */
export function kaupungillaLehti(id) {
  return (KULTTUURI_KATEGORIAT[id] ?? []).some((k) => k.id === 'kaupunki');
}

/* ------------------------------------------------------------------
 * ALUEET — lehtikohteet, jotka eivät ole kaupunkeja
 *
 * Saari, tunturiseutu, vuoristo tai viidakko on laudalla samanlainen
 * piste kuin kaupunki, mutta sen lehti on rakenteeltaan eri: alueella
 * EI kuulu olla kohdekarttaa eikä matkaopasta (omistajan linjaukset
 * 17.8.2026), koska kartoitettavaa korttelia ei ole. Ilman tätä
 * poikkeusta valmiusasteikko merkitsisi jokaisen valmiin alueen
 * ikuisesti puutteelliseksi ja pyytäisi työtä, jota ei ole tarkoitus
 * tehdä.
 *
 * Lista on käsin ylläpidetty tarkoituksella: alue ei eroa datassa
 * kaupungista millään kentällä, joten koneellista tunnistetta ei ole.
 * Afrikan tulevat alueet lisätään tähän sitten kun ne saavat lehtensä.
 * ------------------------------------------------------------------ */
export const ALUEET = new Set([
  'islanti', 'lappi', 'kreeta', 'sisilia', 'alpit',
  'sumatra', 'borneo', 'kamtsatka', 'sahalin',
  // Lähi-idän aluekohteet (Fablen päätös 23.8.2026): ylänkö, niemimaa
  // ja hiekka-aavikko eivät saa kohdekarttaa koskaan.
  'kapadokia', 'siinai', 'rubalkhali',
]);

/**
 * Onko kaupungilla O6-mallin matkaopas: kansiosion Matkailijalle-lohkon
 * artikkeli, joka on taitettu oppaaksi ja jaettu jaksoihin. Sama ehto
 * kuin lehden oma taitto käyttää (js/nahtavyydet.js: opas).
 */
function kaupungillaOpas(id) {
  const kansi = (KULTTUURI_KATEGORIAT[id] ?? []).find((k) => k.id === 'kaupunki');
  const artikkeli = kansi?.matkailijalle?.artikkeli;
  return artikkeli?.taitto === 'opas' && Boolean(artikkeli.jaksot?.length);
}

/**
 * Kaupungin lehtivalmius kolmena portaana — 'valmis', 'lahes' tai
 * 'puutteellinen' (omistajan tilaus 23.8.2026: kehittäjäkartan värit
 * kertovat lehtien valmiusasteen, eivät enää julistetta ja herokuvia).
 *
 * VALMIS = kansiosio, matkaopas, säätiedot, kohdekartta JA generoidut
 * herokuvat (omistajan tarkennus 23.8.2026: "Kaupunkia ei voi merkata
 * vihreäksi jos heroja ei ole generoitu sinne vielä"). Ilman jotakin
 * näistä sivu on vielä kesken, vaikka se aukeaisi. ALUEILLA riittää
 * kansiosio, säätiedot ja herot (ks. ALUEET).
 * LÄHES VALMIS = kansiosio on, jokin muu puuttuu.
 * PUUTTEELLINEN = ei kansiosiota eli ei lehteä lainkaan.
 *
 * Aste luetaan pelidatasta ajonaikaisesti — käsin ylläpidettävää
 * listaa ei ole, joten kartta ei voi jäädä jälkeen sisällöstä.
 */

/** Onko avauskuvissa generoituja herokuvia (ampari-kenttä). */
function kaupungillaHerot(id) {
  const kansi = (KULTTUURI_KATEGORIAT[id] ?? []).find((k) => k.id === 'kaupunki');
  return (kansi?.avauskuvat ?? []).some((kuva) => kuva.ampari);
}

export function lehtiValmius(id) {
  if (!kaupungillaLehti(id)) return 'puutteellinen';
  const osat = ALUEET.has(id)
    ? [Boolean(SAATIEDOT[id]), kaupungillaHerot(id)]
    : [kaupungillaOpas(id), Boolean(SAATIEDOT[id]), Boolean(KAUPUNKIKARTAT[id]),
       kaupungillaHerot(id)];
  return osat.every(Boolean) ? 'valmis' : 'lahes';
}

const KAUPUNGIN_OSAT = [
  {
    avain: 'lehti',
    otsikko: 'Lehti',
    selite: 'kaupungilla on lehden kansiosio',
    arvo: (c) => kaupungillaLehti(c.id),
  },
  {
    avain: 'aiheet',
    otsikko: 'Aihesivut',
    selite: 'kaupungin omat aihesivut kansiosion lisäksi',
    arvo: (c) => (KULTTUURI_KATEGORIAT[c.id] ?? []).filter((k) => k.id !== 'kaupunki').length > 0,
    luku: (c) => (KULTTUURI_KATEGORIAT[c.id] ?? []).filter((k) => k.id !== 'kaupunki').length,
  },
  {
    avain: 'kartta',
    otsikko: 'Kartta',
    selite: 'piirretty kohdekartta',
    arvo: (c) => Boolean(KAUPUNKIKARTAT[c.id]),
  },
  {
    avain: 'jutut',
    otsikko: 'Jutut',
    selite: 'kartan kohteet, jotka avaavat oman jutun',
    arvo: (c) => {
      const kohteet = KAUPUNKIKARTAT[c.id]?.kohteet ?? [];
      if (!kohteet.length) return null;
      const tehty = kohteet.filter((k) => NAHTAVYYSJUTUT[c.id]?.[k.nimi]?.teksti || k.teksti).length;
      return [tehty, kohteet.length];
    },
  },
  {
    avain: 'miniat',
    otsikko: 'Miniat.',
    selite: 'kartan kohteet, joilla on miniatyyripiirros',
    arvo: (c) => {
      const kohteet = KAUPUNKIKARTAT[c.id]?.kohteet ?? [];
      if (!kohteet.length) return null;
      const tehty = kohteet.filter((k) => MINIATYYRIT[c.id]?.[k.nimi]).length;
      return [tehty, kohteet.length];
    },
  },
  {
    avain: 'herot',
    otsikko: 'Herot',
    selite: 'generoidut herokuvat avauskarusellissa (ampari-kentät)',
    arvo: (c) => kaupungillaHerot(c.id),
    luku: (c) => {
      const kansi = (KULTTUURI_KATEGORIAT[c.id] ?? []).find((k) => k.id === 'kaupunki');
      return (kansi?.avauskuvat ?? []).filter((kuva) => kuva.ampari).length || null;
    },
  },
  {
    avain: 'juliste',
    otsikko: 'Juliste',
    selite: 'aikakausjuliste JULISTEET-taulussa (kuva täydentyy ämpäristä)',
    arvo: (c) => Boolean(JULISTEET[c.id]),
  },
  {
    avain: 'merkinta',
    otsikko: 'Merkintä',
    selite: 'matkakirjamerkintä: "kaari" on uudistettu teksti, "vanha" vanhan mallin saapuminen',
    arvo: (c) => Boolean(TARINAKAARI[c.id] || SAAPUMISTEKSTIT.maailmankartta[c.id]),
    teksti: (c) => {
      if (TARINAKAARI[c.id]) return 'kaari';
      if (SAAPUMISTEKSTIT.maailmankartta[c.id]) return 'vanha';
      return null;
    },
  },
  {
    avain: 'luenta',
    otsikko: 'Luenta',
    selite: 'merkinnän ääniluenta on generoitu',
    arvo: (c, p) => Boolean(luentaLauta(SAAPUMISLUENNAT, p.id, c.id)),
  },
  {
    avain: 'saa',
    otsikko: 'Sää',
    selite: 'säänormaalit vuosigraafiin',
    arvo: (c) => Boolean(SAATIEDOT[c.id]),
  },
  {
    avain: 'kohtaaminen',
    otsikko: 'Kohtaam.',
    selite: 'kaupungin kohtaamishahmo',
    arvo: (c) => Boolean(KOHTAAMISET[c.id]),
  },
  {
    avain: 'aani',
    otsikko: 'Ääni',
    selite: 'äänimaisema',
    arvo: (c) => Boolean(c.ambience),
  },
  {
    avain: 'kuvat',
    otsikko: 'Kuvat',
    selite: 'vanha valokuva eli kuvakortti',
    arvo: (c) => Boolean(KAIKKI_VALOKUVAT[c.id]),
  },
  {
    avain: 'artikkeli',
    otsikko: 'Artikkeli',
    selite: 'oma kirjoitettu artikkeli',
    arvo: (c) => {
      const a = ARTIKKELIT[c.wiki ?? c.name];
      return Boolean(a?.artikkeli ?? a?.teksti);
    },
  },
  {
    avain: 'visa',
    otsikko: 'Visa',
    selite: 'tietovisakysymykset',
    arvo: (c, p) => (p.questions?.[c.id] ?? []).length > 0,
    luku: (c, p) => (p.questions?.[c.id] ?? []).length,
  },
  {
    avain: 'kieli',
    otsikko: 'Kieli',
    selite: 'kielinäyte kaupungista',
    arvo: (c) => Boolean(KIELET.maailmankartta[c.id]),
  },
];

/*
 * Maan omat osat. Ne eivät kuulu millekään yksittäiselle kaupungille
 * vaan koko maalle, ja maalehti on niistä raskain työ (5–6 aihetta ×
 * 4–5 nostoa) — siksi se on omana sarakkeenaan eikä kaupunkirivillä
 * toistettuna.
 */
const MAAN_OSAT = [
  {
    avain: 'maalehti',
    otsikko: 'Maalehti',
    selite: 'maan lehden aihesivut',
    arvo: (iso) => (MAA_KATEGORIAT[iso] ?? []).length > 0,
    luku: (iso) => (MAA_KATEGORIAT[iso] ?? []).length,
  },
  {
    avain: 'maakartta',
    otsikko: 'Maakartta',
    selite: 'maalehden korkokartta',
    arvo: (iso) => Boolean(MAAKARTAT[iso]),
  },
  {
    avain: 'lippu',
    otsikko: 'Lippu',
    selite: 'maalla on lippu kartalla',
    arvo: (iso, maa) => Boolean(maa?.lippu),
  },
  {
    avain: 'luvut',
    otsikko: 'Luvut',
    selite: 'maan tunnusluvut',
    arvo: (iso) => Boolean(MAATIEDOT.maailmankartta[iso]),
  },
  {
    avain: 'radio',
    otsikko: 'Radio',
    selite: 'radiolähetys maasta',
    arvo: (iso) => Boolean(RADIOT[iso]),
  },
];

/** Osan arvo tehty/kaikki-pariksi, jotta osuus lasketaan yhdellä säännöllä. */
function pariksi(arvo) {
  if (arvo === null || arvo === undefined) return null;
  if (Array.isArray(arvo)) return arvo;
  return [arvo ? 1 : 0, 1];
}

/*
 * Yksi kaupunkirivi laskettuna. Lauta annetaan mukaan, koska
 * kysymykset ja luennat ovat laudan omia (sama kaupunki voi olla
 * usealla laudalla).
 */
function kaupunginTila(c, p) {
  const solut = {};
  let tehty = 0;
  let kaikki = 0;
  for (const osa of KAUPUNGIN_OSAT) {
    const pari = pariksi(osa.arvo(c, p));
    solut[osa.avain] = {
      pari,
      teksti: osa.teksti?.(c, p) ?? null,
      luku: osa.luku?.(c, p) ?? null,
    };
    if (pari) { tehty += pari[0]; kaikki += pari[1]; }
  }
  return {
    id: c.id, nimi: c.name, solut, tehty, kaikki,
    osuus: kaikki ? tehty / kaikki : 0,
  };
}

/** Yhden maan omat solut (maalehti, kartta, lippu, luvut, radio). */
function maanTila(iso, maa) {
  const solut = {};
  let tehty = 0;
  let kaikki = 0;
  for (const osa of MAAN_OSAT) {
    const pari = pariksi(osa.arvo(iso, maa));
    solut[osa.avain] = { pari, luku: osa.luku?.(iso, maa) ?? null };
    if (pari) { tehty += pari[0]; kaikki += pari[1]; }
  }
  return { solut, tehty, kaikki };
}

/** Rivijoukon sarakesummat: jokainen sarake omana tehty/kaikki-parinaan. */
function summaa(rivit, avaimet) {
  const summa = {};
  for (const avain of avaimet) {
    let tehty = 0;
    let kaikki = 0;
    let oli = false;
    for (const rivi of rivit) {
      const pari = rivi.solut?.[avain]?.pari ?? rivi.summa?.[avain];
      if (!pari) continue;
      oli = true;
      tehty += pari[0];
      kaikki += pari[1];
    }
    summa[avain] = oli ? [tehty, kaikki] : null;
  }
  return summa;
}

/*
 * Koko taulun tila kerralla: mantereet, niiden maat ja maiden
 * kaupungit. Lasketaan vasta kun lehti avataan, joten pelin
 * käynnistys ei maksa tästä mitään.
 */
export function laskeTilastot() {
  const maailma = PACKS.find((p) => p.id === 'maailmankartta');
  const maaVara = maailma?.map?.cityCountry ?? {};
  const muodot = maailma?.map?.countryShapes ?? {};
  const mantereet = [];
  for (const [id, nimi] of MANTEREET) {
    const p = PACKS.find((x) => x.id === id);
    if (!p) continue;
    const maittain = new Map();
    for (const c of p.cities) {
      const iso = p.map?.cityCountry?.[c.id] ?? maaVara[c.id] ?? null;
      const avain = iso ?? '—';
      if (!maittain.has(avain)) {
        maittain.set(avain, {
          iso,
          nimi: iso ? (muodot[iso]?.nimi ?? iso) : 'maatunnus puuttuu',
          ...maanTila(iso, iso ? muodot[iso] : null),
          kaupungit: [],
        });
      }
      maittain.get(avain).kaupungit.push(kaupunginTila(c, p));
    }
    const maat = [...maittain.values()].map((maa) => {
      const summa = summaa(maa.kaupungit, KAUPUNGIN_OSAT.map((o) => o.avain));
      const kaupunkiTehty = maa.kaupungit.reduce((s, k) => s + k.tehty, 0);
      const kaupunkiKaikki = maa.kaupungit.reduce((s, k) => s + k.kaikki, 0);
      const tehty = kaupunkiTehty + maa.tehty;
      const kaikki = kaupunkiKaikki + maa.kaikki;
      return { ...maa, summa, tehty, kaikki, osuus: kaikki ? tehty / kaikki : 0 };
    });
    const kaupungit = maat.flatMap((m) => m.kaupungit);
    const summa = {
      ...summaa(kaupungit, KAUPUNGIN_OSAT.map((o) => o.avain)),
      ...summaa(maat, MAAN_OSAT.map((o) => o.avain)),
    };
    const tehty = maat.reduce((s, m) => s + m.tehty, 0);
    const kaikki = maat.reduce((s, m) => s + m.kaikki, 0);
    mantereet.push({
      id,
      nimi,
      maat,
      kaupunkeja: kaupungit.length,
      summa,
      tehty,
      kaikki,
      osuus: kaikki ? tehty / kaikki : 0,
    });
  }
  return mantereet;
}

/* ------------------------------------------------------------------ *
 * PIIRTO
 * ------------------------------------------------------------------ */

/*
 * VIITEKUVILLA ANKKUROIDUT HEROT (omistajan tilaus 24.8.2026:
 * "merkkaa oranssilla kaupungit joissa hero kuvat generoitu
 * referenssien avulla").
 *
 * Miksi tämä erottelu on olemassa. Kašgarin herokuva esitti
 * Samarkandin timuridimausoleumia, vaikka kuvateksti lupasi Yusuf
 * Balasagunin mausoleumia — malli ei tuntenut kohdetta ja täytti aukon
 * alueen arkkityypillä. Sen jälkeen generointi ankkuroidaan kohteen
 * omasta Commons-kategoriasta haettuihin oikeisiin valokuviin
 * (tools/hae-viitekuvat.mjs). Ankkuroitu kuva on siis eri luokan
 * väite kuin ankkuroimaton, ja taulun pitää näyttää kumpi on kyseessä.
 *
 * Luku on ANKKUROITUJEN kuvien määrä, ei kaikkien. Osa kaupungeista on
 * välitilassa: niissä yksi kuva on tehty uusiksi viitteillä ja loput
 * ovat vanhoja. Solu näyttää sen suhteena, eikä väitä enempää.
 *
 * Ylläpito: kun uusi viitekuvallinen erä kytketään, lisää kaupunki
 * tänne. Työlistat tools/hero-tyolista-*.mjs kertovat mitkä erät on
 * tehty viitteillä — ne tuovat kuvakulman tools/hero-kuvakulmat.mjs:stä.
 */
const SARAKKEET = [
  ...KAUPUNGIN_OSAT.map((o) => ({ ...o, taso: 'kaupunki' })),
  ...MAAN_OSAT.map((o) => ({ ...o, taso: 'maa' })),
];

/*
 * Solun sävy valmiusasteen mukaan (omistajan tarkennus 18.8.2026:
 * "kevyt väritys sallittu ... hillityt sävyt pelin pergamentti-
 * palettiin sovitettuina"). Kolme luokkaa riittää: valmis, kesken,
 * puuttuu. Sävyt ovat samat kuin Raamatun valmiuschipeissä.
 */
function savy(pari) {
  if (!pari || !pari[1]) return 'tk-tyhja';
  if (pari[0] >= pari[1]) return 'tk-valmis';
  if (pari[0] > 0) return 'tk-kesken';
  return 'tk-puuttuu';
}

/** Solun teksti: ✓/– kaupunkiriveillä, suhde kooterivillä. */
function soluTeksti(pari, { koonti, teksti, luku }) {
  if (!pari) return '·';
  if (teksti) return teksti;
  if (koonti) return `${pari[0]}/${pari[1]}`;
  if (pari[1] === 1) return pari[0] ? (luku ? `✓ ${luku}` : '✓') : '–';
  return `${pari[0]}/${pari[1]}`;
}

function solu(pari, valinnat = {}) {
  const td = html('td', `tk-num ${savy(pari)}`, soluTeksti(pari, valinnat));
  return td;
}

/** Osuuspalkki nimisolun alle: yksi silmäys kertoo missä mennään. */
function palkki(osuus) {
  const kotelo = html('div', 'tk-palkki');
  const tayte = html('div', 'tk-palkki-tayte');
  tayte.style.width = `${Math.round(osuus * 100)}%`;
  kotelo.appendChild(tayte);
  return kotelo;
}

/** Mantereen tiivistelmä nimen alle ("lehdet 28/44 · kartat 12/44"). */
function tiivistelma(manner) {
  const osat = [];
  const lisaa = (nimi, avain) => {
    const pari = manner.summa[avain];
    if (pari) osat.push(`${nimi} ${pari[0]}/${pari[1]}`);
  };
  lisaa('lehdet', 'lehti');
  lisaa('kartat', 'kartta');
  lisaa('merkinnät', 'merkinta');
  lisaa('maalehdet', 'maalehti');
  lisaa('liput', 'lippu');
  return osat.join(' · ');
}

/** Nimisolu: sisennys, avausnuoli ja osuus. */
function nimisolu(nimi, { taso, avattava, osuus, lisa }) {
  const td = html('td', `tk-nimi tk-taso-${taso}`);
  const sisus = html('div', 'tk-nimi-sisus');
  if (avattava) sisus.appendChild(html('span', 'tk-nuoli', '▸'));
  const teksti = html('div', 'tk-nimi-teksti');
  const rivi = html('div', 'tk-nimi-rivi');
  rivi.appendChild(html('b', '', nimi));
  if (osuus != null) {
    rivi.appendChild(html('span', 'tk-osuus', `${Math.round(osuus * 100)} %`));
  }
  teksti.appendChild(rivi);
  if (osuus != null) teksti.appendChild(palkki(osuus));
  if (lisa) teksti.appendChild(html('div', 'tk-lisa', lisa));
  sisus.appendChild(teksti);
  td.appendChild(sisus);
  return td;
}

/**
 * Tilastotaulu kokonaisuudessaan. Rakennetaan uudestaan joka kerta,
 * kun järjestys vaihtuu — taulu on muutaman sadan rivin kokoinen,
 * eikä osittainen päivitys olisi sen arvoista.
 */
/** Kaupungin tuoreusluokka nimisoluun, tai null. */
function tuoreusLuokka(id) {
  if (TUORE_VALMIS.has(id)) return 'tk-tuore-valmis';
  if (TUORE_TYOSSA.has(id)) return 'tk-tuore-tyossa';
  return null;
}

function piirraTaulu(kohde, mantereet, jarjestys, nakyma = 'kaikki') {
  const vainTuoreet = nakyma === 'tuoreet';
  const kotelo = html('div', 'tk-vieri');
  const taulu = html('table', 'tk-taulu');
  const otsikkoRivi = html('tr');
  otsikkoRivi.appendChild(html('th', 'tk-nimi', 'Kohde'));
  for (const s of SARAKKEET) {
    const th = html('th', 'tk-num', s.otsikko);
    th.title = s.selite;
    otsikkoRivi.appendChild(th);
  }
  const paa = html('thead');
  paa.appendChild(otsikkoRivi);
  taulu.appendChild(paa);
  const runko = html('tbody');

  /* Järjestys: aakkoset tai valmiit ylimpänä (omistajan toive). */
  const jarjesta = (lista) => (jarjestys === 'valmius'
    ? [...lista].sort((a, b) => b.osuus - a.osuus || a.nimi.localeCompare(b.nimi, 'fi'))
    : [...lista].sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi')));

  for (const manner of mantereet) {
    /*
     * Vain tuoreet -näkymä (omistaja 20.8.2026): mantereesta jäävät
     * jäljelle vain TUOREET-listan kaupungit maariveineen, valmiiksi
     * avattuina. Manner ilman tuoreita rivejä jää kokonaan pois.
     */
    const suodatettu = vainTuoreet
      ? {
        ...manner,
        maat: manner.maat
          .map((maa) => ({ ...maa, kaupungit: maa.kaupungit.filter((k) => tuoreusLuokka(k.id)) }))
          .filter((maa) => maa.kaupungit.length),
      }
      : manner;
    if (vainTuoreet && !suodatettu.maat.length) continue;
    const mannerRivi = html('tr', 'tk-rivi tk-manner');
    mannerRivi.tabIndex = 0;
    mannerRivi.setAttribute('role', 'button');
    mannerRivi.setAttribute('aria-expanded', String(vainTuoreet));
    if (vainTuoreet) mannerRivi.classList.add('auki');
    const mannerSolu = nimisolu(manner.nimi, {
      taso: 'manner',
      avattava: true,
      osuus: manner.osuus,
      lisa: `${manner.maat.length} maata · ${manner.kaupunkeja} kaupunkia — ${tiivistelma(manner)}`,
    });
    /*
     * Kaupungit esiin -nappi (omistaja 20.8.2026): avaa tai sulkee
     * mantereen KAIKKI maat kaupunkeineen kerralla. stopPropagation,
     * ettei sama napautus laukaise mannerrivin omaa avausta.
     */
    if (!vainTuoreet) {
      const kaikkiNappi = html('button', 'tk-kaikki-nappi', 'kaupungit esiin');
      kaikkiNappi.type = 'button';
      kaikkiNappi.addEventListener('click', (e) => {
        e.stopPropagation();
        const avataan = kaikkiNappi.textContent === 'kaupungit esiin';
        kaikkiNappi.textContent = avataan ? 'piilota kaupungit' : 'kaupungit esiin';
        mannerRivi.setAttribute('aria-expanded', String(avataan));
        mannerRivi.classList.toggle('auki', avataan);
        for (const { maaRivi, kaupunkiRivit } of maaRivit) {
          maaRivi.hidden = !avataan;
          maaRivi.setAttribute('aria-expanded', String(avataan));
          maaRivi.classList.toggle('auki', avataan);
          for (const r of kaupunkiRivit) r.hidden = !avataan;
        }
      });
      mannerSolu.querySelector('.tk-nimi-rivi')?.appendChild(kaikkiNappi);
    }
    mannerRivi.appendChild(mannerSolu);
    for (const s of SARAKKEET) {
      mannerRivi.appendChild(solu(manner.summa[s.avain], { koonti: true }));
    }
    runko.appendChild(mannerRivi);

    const maaRivit = [];
    for (const maa of jarjesta(suodatettu.maat)) {
      const maaRivi = html('tr', 'tk-rivi tk-maa');
      maaRivi.hidden = !vainTuoreet;
      maaRivi.tabIndex = 0;
      maaRivi.setAttribute('role', 'button');
      maaRivi.setAttribute('aria-expanded', String(vainTuoreet));
      if (vainTuoreet) maaRivi.classList.add('auki');
      maaRivi.appendChild(nimisolu(maa.nimi, {
        taso: 'maa',
        avattava: true,
        osuus: maa.osuus,
        lisa: `${maa.kaupungit.length} kaupunkia`,
      }));
      for (const s of SARAKKEET) {
        maaRivi.appendChild(s.taso === 'maa'
          ? solu(maa.solut[s.avain]?.pari, { luku: maa.solut[s.avain]?.luku })
          : solu(maa.summa[s.avain], { koonti: true }));
      }
      runko.appendChild(maaRivi);

      const kaupunkiRivit = [];
      for (const kaupunki of jarjesta(maa.kaupungit)) {
        const rivi = html('tr', 'tk-rivi tk-kaupunki');
        rivi.hidden = !vainTuoreet;
        const tuoreus = tuoreusLuokka(kaupunki.id);
        // HUOM: nimi EI saa olla "solu" — se peittäisi solu()-funktion,
        // jota tarvitaan alempana samassa silmukassa (v948-korjaus:
        // varjostus kaatoi koko taulun "solu is not a function").
        const kaupunkiSolu = nimisolu(kaupunki.nimi, { taso: 'kaupunki', osuus: null });
        if (tuoreus) {
          kaupunkiSolu.classList.add(tuoreus);
          const versio = TUORE_VALMIS.get(kaupunki.id);
          kaupunkiSolu.querySelector('.tk-nimi-rivi')?.appendChild(
            html('span', 'tk-tuore-merkki', versio || 'työn alla'),
          );
        }
        rivi.appendChild(kaupunkiSolu);
        for (const s of SARAKKEET) {
          if (s.taso === 'maa') { rivi.appendChild(html('td', 'tk-num tk-tyhja', '·')); continue; }
          const tieto = kaupunki.solut[s.avain];
          const td = solu(tieto.pari, { teksti: tieto.teksti, luku: tieto.luku });
          /*
           * Oranssi kertoo, että kaupungin herokuvat on ankkuroitu
           * oikeisiin valokuviin. Täysi oranssi = koko erä, ääriviiva =
           * osa kuvista. Sama lista värjää laatan maailmankartalla
           * kehittäjätilassa — ks. js/viitekuva-herot.js.
           */
          if (s.avain === 'herot') {
            const kaikki = tieto.luku ?? 0;
            const tila = viitekuvaTila(kaupunki.id, kaikki);
            if (tila) {
              td.classList.add(tila.taysi ? 'tk-viite-taysi' : 'tk-viite-osa');
              td.title = `${tila.ankkuroitu}/${kaikki || '?'} herokuvaa`
                + ' ankkuroitu kohteen omiin Commons-valokuviin';
            }
          }
          rivi.appendChild(td);
        }
        runko.appendChild(rivi);
        kaupunkiRivit.push(rivi);
      }

      const avaaMaa = () => {
        const auki = maaRivi.getAttribute('aria-expanded') === 'true';
        maaRivi.setAttribute('aria-expanded', auki ? 'false' : 'true');
        maaRivi.classList.toggle('auki', !auki);
        for (const r of kaupunkiRivit) r.hidden = auki;
      };
      maaRivi.addEventListener('click', avaaMaa);
      maaRivi.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avaaMaa(); }
      });
      maaRivit.push({ maaRivi, kaupunkiRivit });
    }

    const avaaManner = () => {
      const auki = mannerRivi.getAttribute('aria-expanded') === 'true';
      mannerRivi.setAttribute('aria-expanded', auki ? 'false' : 'true');
      mannerRivi.classList.toggle('auki', !auki);
      for (const { maaRivi, kaupunkiRivit } of maaRivit) {
        maaRivi.hidden = auki;
        // Mantereen sulkeminen sulkee myös auki jääneet maat, muuten
        // seuraava avaus paljastaisi kaupunkeja ilman maarivejään.
        if (auki) {
          maaRivi.setAttribute('aria-expanded', 'false');
          maaRivi.classList.remove('auki');
          for (const r of kaupunkiRivit) r.hidden = true;
        }
      }
    };
    mannerRivi.addEventListener('click', avaaManner);
    mannerRivi.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avaaManner(); }
    });
  }

  taulu.appendChild(runko);
  kotelo.appendChild(taulu);
  kohde.appendChild(kotelo);
}

/** Järjestysvipu ja ohje taulun yläpuolelle. */
function piirraOhjausrivi(kohde, piirraUudelleen) {
  const rivi = html('div', 'tk-ohjaus');
  rivi.appendChild(html('span', 'tk-ohjaus-nimi', 'Järjestys'));
  const napit = html('div', 'tk-vipu');
  const vaihtoehdot = [['aakkoset', 'aakkosittain'], ['valmius', 'valmiit ylimpänä']];
  for (const [arvo, nimi] of vaihtoehdot) {
    const nappi = html('button', 'tk-vipu-nappi', nimi);
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', String(lueJarjestys() === arvo));
    nappi.addEventListener('click', () => {
      tallennaJarjestys(arvo);
      piirraUudelleen();
    });
    napit.appendChild(nappi);
  }
  rivi.appendChild(napit);
  /* Näytä-vipu (omistaja 20.8.2026): kaikki tai vain tuoreet. */
  rivi.appendChild(html('span', 'tk-ohjaus-nimi', 'Näytä'));
  const nakymaNapit = html('div', 'tk-vipu');
  for (const [arvo, nimi] of [['kaikki', 'kaikki'], ['tuoreet', 'vain tuoreet']]) {
    const nappi = html('button', 'tk-vipu-nappi', nimi);
    nappi.type = 'button';
    nappi.setAttribute('aria-pressed', String(lueTilastoNakyma() === arvo));
    nappi.addEventListener('click', () => {
      tallennaTilastoNakyma(arvo);
      piirraUudelleen();
    });
    nakymaNapit.appendChild(nappi);
  }
  rivi.appendChild(nakymaNapit);
  kohde.appendChild(rivi);
}

/** Koko sivun piirto (kutsutaan kategorian rakenna-koukusta). */
function piirraTilastosivu(kohde) {
  const mantereet = laskeTilastot();
  const piirra = () => {
    // Otsikko on jo piirretty; tyhjennetään vain oma sisältömme.
    kohde.querySelectorAll('.tk-ohjaus, .tk-vieri, .tk-selite').forEach((n) => n.remove());
    piirraOhjausrivi(kohde, piirra);
    piirraTaulu(kohde, mantereet, lueJarjestys(), lueTilastoNakyma());
    kohde.appendChild(html('p', 'tk-selite',
      'Napauta mannerta: sen maat avautuvat, ja maan napautus paljastaa '
      + 'sen kaupungit. ✓ = tehty, – = puuttuu, suhde = tehdyt kaikista. '
      + 'Kooterivien luvut ovat sarakkeen summa. Osuus on rivin kaikkien '
      + 'osien keskiarvo, maan omat osat mukaan lukien. Kaikki luvut '
      + 'lasketaan pelin omista paketeista lehteä avattaessa — käsin '
      + 'ylläpidettyä listaa ei ole.'));
  };
  piirra();
}

/* ------------------------------------------------------------------ *
 * LEHDEN SIVUT
 * ------------------------------------------------------------------ */

/** Kokonaisluvut: montako mitäkin koko pelissä on. */
function kokonaisluvut(mantereet) {
  const kaupungit = new Set();
  const maat = new Set();
  for (const manner of mantereet) {
    for (const maa of manner.maat) {
      if (maa.iso) maat.add(maa.iso);
      for (const k of maa.kaupungit) kaupungit.add(k.id);
    }
  }
  const laske = (avain, taso) => {
    let tehty = 0;
    let kaikki = 0;
    for (const manner of mantereet) {
      const pari = manner.summa[avain];
      if (!pari) continue;
      tehty += pari[0];
      kaikki += pari[1];
    }
    return { tehty, kaikki, taso };
  };
  return {
    kaupunkeja: kaupungit.size,
    maita: maat.size,
    rivit: [...KAUPUNGIN_OSAT, ...MAAN_OSAT]
      .map((o) => ({ nimi: o.otsikko, selite: o.selite, ...laske(o.avain) })),
  };
}

/** Luvut-sivu: sama tieto tekstinä, suurin puute ensin. */
function piirraLuvut(kohde) {
  const mantereet = laskeTilastot();
  const { kaupunkeja, maita, rivit } = kokonaisluvut(mantereet);
  kohde.appendChild(html('p', 'johdanto',
    `${kaupunkeja} eri kaupunkia ${maita} maassa seitsemällä mantereella. `
    + 'Rivit ovat suurin puute ensin: mitä pidempi matka täyteen, sitä '
    + 'ylempänä. Luvut lasketaan samoista paketeista kuin taulu.'));
  kohde.appendChild(html('p', 'tk-selite',
    'Luvut laskevat mannerrivit, joten porttikaupungit (Istanbul, '
    + 'Kairo, Teheran) ovat kokonaismäärissä kahdesti — ne kuuluvat '
    + 'kahdelle laudalle. Kohderivit (Jutut, Miniat.) laskevat '
    + 'kohdekarttojen kohteita, eivät kaupunkeja.'));
  const kotelo = html('div', 'tk-vieri');
  const taulu = html('table', 'tk-taulu tk-luvut');
  const otsikko = html('tr');
  // Kaikista-sarake poistui (omistaja 18.8.2026: "Onko se turha?"
  // — oli: Tehty näyttää saman nimittäjän jo muodossa x/y).
  for (const t of ['Osa', 'Tehty', 'Puuttuu']) {
    otsikko.appendChild(html('th', t === 'Osa' ? 'tk-nimi' : 'tk-num', t));
  }
  const paa = html('thead');
  paa.appendChild(otsikko);
  taulu.appendChild(paa);
  const runko = html('tbody');
  const jarjestetyt = [...rivit].sort((a, b) => (b.kaikki - b.tehty) - (a.kaikki - a.tehty));
  for (const rivi of jarjestetyt) {
    const tr = html('tr', 'tk-rivi');
    const nimi = html('td', 'tk-nimi');
    nimi.appendChild(html('b', '', rivi.nimi));
    nimi.appendChild(html('div', 'tk-lisa', rivi.selite));
    tr.appendChild(nimi);
    tr.appendChild(solu([rivi.tehty, rivi.kaikki], { koonti: true }));
    tr.appendChild(html('td', 'tk-num', String(rivi.kaikki - rivi.tehty)));
    runko.appendChild(tr);
  }
  taulu.appendChild(runko);
  kotelo.appendChild(taulu);
  kohde.appendChild(kotelo);
}

/* ------------------------------------------------------------------ *
 * KIINTIÖT — R2, repo, ElevenLabs ja pöllö
 *
 * Omistajan tilaus 21.8.2026: "Siirrä alaosan tilastot tilasto
 * lehdelle". Palkit asuivat v982 asti hampurilaisvalikon Työhuone-
 * kotelossa (js/main.js). Ne ovat tilastoja siinä missä taulukin,
 * joten ne kuuluvat Tilastot-lehteen; valikkoon jäi vain versiorivi.
 *
 * DATA JA HAKULOGIIKKA OVAT ENNALLAAN — vain esityspaikka vaihtui.
 * Haku lähtee nyt Tilastojen avauksesta, ei enää valikon avauksesta.
 *
 * Alkuperäiset tilaukset 15.8.2026: "tee r2 ja repon koosta
 * hampurilaiseen yksinkertainen graafi vierekkäin (vihreä-kelt-pun)
 * palkki" ja jatko: ElevenLabsin kuukausikiintiö, pöllön käyttö sekä
 * OpenAI+Claude-kulut "jos pystyt näkemään".
 *
 * Luvut tulevat kahdesta lähteestä: repon koko GitHubin julkisesta
 * rajapinnasta ja loput pöllö-workerin tila-haarasta, joka vaatii
 * kehittäjäkoodin (kulut ja kiintiöt ovat omistajan tilitietoja).
 * Workerin puolella vastaus on KV-välimuistissa tunnin; täällä
 * riittää istunnon mittainen muisti, ettei lehden jokainen avaus
 * hae uudestaan. Puuttuva lähde piirtyy vaisuna "ei tietoa" -palkkina
 * — palkisto ei koskaan estä lehden käyttöä.
 * ------------------------------------------------------------------ */

const KIINTIO_RAJAT = {
  // R2:n ilmaistaso on 10 Gt ja GitHubin suositus repolle 1 Gt.
  r2: 10 * 1024 ** 3,
  repo: 1024 ** 2, // kilotavuina (GitHubin size-kenttä on kt)
  /*
   * Kuvageneroinnin kuukausibudjetti dollareina (omistajan tilaus
   * 24.8.2026: "saako Googlen ja openain kulutusta mitenkään tänne
   * näkyviin"). Nämä eivät ole palveluiden asettamia rajoja vaan
   * omistajan omia hälytysrajoja: kumpikaan palvelu ei katkaise
   * mitään näiden kohdalla, vaan palkki vain muuttuu keltaiseksi ja
   * punaiseksi kuten muutkin. Muuta luku jos budjetti muuttuu.
   */
  openaiUsd: 50,
  googleUsd: 50,
};
let kiintioTila = null;
let kiintioHaku = null;

async function haeKiintiotila() {
  /*
   * HUOM: purkujärjestys seuraa listaa — repo, PEILI, PÖLLÖ. Tässä
   * oli v746–v757 ristikkäinen purku [repo, tila, peili], jolloin
   * peilimanifesti meni pöllömuuttujaan ja pöllön vastaus peiliin:
   * kaikki palkit näyttivät tyhjää ja kulurivi syytti admin-avaimia,
   * vaikka molemmat lähteet vastasivat koko ajan oikein. Löytyi
   * v757:n diagnoosirivistä ("peili ok · pöllö ei vastausta" + R2
   * 0 Mt — mahdoton yhdistelmä ilman ristiinmenoa).
   */
  const [repo, peili, tila] = await Promise.all([
    fetch('https://api.github.com/repos/ravelius/Matkakirja')
      .then((v) => (v.ok ? v.json() : null))
      .catch(() => null),
    // Peiliämpärin koko manifestista (omistajan havainto 15.8.2026:
    // "r2 sanoo työhuoneessa tilankäytöksi paljon enemmän" — palkki
    // laski vain puheämpärin 39 Mt, mutta mediapeilissä on ~2 Gt).
    // Ilmaistason 10 Gt on tilikohtainen, joten palkkiin kuuluu
    // ämpärien summa.
    (async () => {
      // no-store: vanhentunut manifesti näyttäisi väärää summaa.
      const res = await fetch(`${PEILI_JUURI}manifesti.json`, { cache: 'no-store' });
      if (!res.ok) return null;
      const m = await res.json();
      let tavut = 0;
      for (const laji of ['kuvat', 'liput', 'aanet', 'tekstit']) {
        for (const t of Object.values(m?.[laji] ?? {})) tavut += t?.koko ?? 0;
      }
      return { tavut };
    })().catch(() => null),
    /*
     * Tila-haun epäonnistumisen SYY talteen (omistajan kysymys
     * 15.8.2026: "miksi sanoo, että admin avaimet puuttuvat?" —
     * ruudulla luki admin-avaimista, vaikka oikeasti koko kutsu jäi
     * tekemättä). Rajattu kehittäjäkoodi ei talleta pöllökoodia
     * laitteelle, jolloin syy on 'koodi'.
     */
    (async () => {
      const koodi = window.localStorage?.getItem(POLLO_KEHITTAJAKOODI_AVAIN);
      if (!koodi) return { syy: 'koodi' };
      const vastaus = await fetch(POLLOPALVELIN, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-pollo-kehittaja': koodi },
        body: JSON.stringify({ tehtava: 'tila' }),
      });
      if (!vastaus.ok) return { syy: `palvelin ${vastaus.status}` };
      return { syy: null, tila: await vastaus.json() };
    })().catch(() => ({ syy: 'verkko' })),
  ]);
  return {
    repoKt: repo?.size ?? null,
    tila: tila?.tila ?? null,
    tilaSyy: tila?.syy ?? null,
    peili,
  };
}

/** Yksi kiintiöpalkki: nimi, ura ja lukema — tk-paletin sävyissä. */
function kiintioPalkki(nimi, osuus, arvoTeksti, tyhjaTeksti) {
  const kotelo = html('div', 'tk-kiintio');
  const rivi = html('div', 'tk-kiintio-rivi');
  rivi.appendChild(html('span', 'tk-kiintio-nimi', nimi));
  rivi.appendChild(html('span', 'tk-kiintio-arvo',
    osuus === null ? tyhjaTeksti : arvoTeksti));
  kotelo.appendChild(rivi);
  const ura = html('div', 'tk-kiintio-ura');
  const tayte = html('div', 'tk-kiintio-tayte');
  if (osuus === null) {
    kotelo.classList.add('tk-kiintio-tyhja');
  } else {
    const p = Math.max(0, Math.min(1, osuus));
    tayte.classList.add(p >= 0.85 ? 'punainen' : (p >= 0.6 ? 'keltainen' : 'vihrea'));
    tayte.style.width = `${Math.max(2, p * 100).toFixed(1)}%`;
  }
  ura.appendChild(tayte);
  kotelo.appendChild(ura);
  return kotelo;
}

/** Neljä palkkia koteloon. `data === null` = haku on vielä kesken. */
function piirraKiintiopalkit(kotelo, data) {
  kotelo.replaceChildren();
  const tyhja = data === null ? 'haetaan…' : 'ei tietoa';
  const { repoKt = null, tila = null, peili = null } = data ?? {};
  // Mt alle gigan (omistajan havainto 15.8.2026: "R2 ei voi olla
  // oikein" — kymmenien megatavujen ämpäri pyöristyi näytöllä
  // 0,0 gigatavuun, mikä näytti tyhjältä vaikka ei ollut).
  const r2Arvo = (tavut) => (tavut >= 1024 ** 3
    ? `${(tavut / 1024 ** 3).toFixed(1)}/10 Gt`
    : `${Math.round(tavut / 1024 ** 2)} Mt/10 Gt`);
  // Molemmat ämpärit: puheämpäri workerilta ja mediapeili
  // manifestistaan — ilmaistason 10 Gt on tilikohtainen.
  const r2Tavut = tila?.r2 || peili
    ? (tila?.r2?.tavut ?? 0) + (peili?.tavut ?? 0)
    : null;
  kotelo.appendChild(kiintioPalkki('R2',
    r2Tavut !== null ? r2Tavut / KIINTIO_RAJAT.r2 : null,
    r2Tavut !== null ? r2Arvo(r2Tavut) : '', tyhja));
  kotelo.appendChild(kiintioPalkki('Repo',
    repoKt !== null ? repoKt / KIINTIO_RAJAT.repo : null,
    repoKt !== null ? `${(repoKt / 1024).toFixed(0)} Mt/1 Gt` : '', tyhja));
  kotelo.appendChild(kiintioPalkki('ElevenLabs',
    tila?.eleven?.raja ? tila.eleven.kaytetty / tila.eleven.raja : null,
    tila?.eleven?.raja
      ? `${Math.round(tila.eleven.kaytetty / 1000)}/${Math.round(tila.eleven.raja / 1000)} t`
      : '', tyhja));
  kotelo.appendChild(kiintioPalkki('Pöllö/kk',
    tila?.pollo?.raja ? (tila.pollo.kuukausi ?? 0) / tila.pollo.raja : null,
    tila?.pollo?.raja ? `${tila.pollo.kuukausi ?? 0} / ${tila.pollo.raja}` : '', tyhja));
  /*
   * Kuvageneroinnin kulut kuluvalta kuukaudelta. Luvut tulevat
   * workerin tila-vastauksesta, joka on hakenut ne palveluiden omista
   * rajapinnoista — peli ei laske niitä itse eikä arvaa.
   *
   * MOLEMMAT VAATIVAT OMAN TUNNUKSENSA workeriin, eikä kumpikaan ole
   * sama avain jolla kuvia generoidaan:
   *   OpenAI  OPENAI_ADMIN_KEY (organisaation kustannusrajapinta)
   *   Google  GOOGLE_BILLING_TOKEN + _PROJECT + _TAULU (BigQueryyn
   *           viety laskutustaulu; Googlella ei ole rajapintaa, joka
   *           kertoisi toteutuneen kulutuksen suoraan)
   * Ilman tunnusta palkki jää haaleaksi "ei tietoa" -palkiksi. Se on
   * oikea tila eikä vika: lukua jota ei voi tietää ei keksitä.
   */
  const kulut = tila?.kulut ?? null;
  const usdArvo = (usd, raja) => `${usd.toFixed(2)} / ${raja} $`;
  kotelo.appendChild(kiintioPalkki('OpenAI/kk',
    typeof kulut?.openai === 'number' ? kulut.openai / KIINTIO_RAJAT.openaiUsd : null,
    typeof kulut?.openai === 'number' ? usdArvo(kulut.openai, KIINTIO_RAJAT.openaiUsd) : '',
    tyhja));
  kotelo.appendChild(kiintioPalkki('Google/kk',
    typeof kulut?.google === 'number' ? kulut.google / KIINTIO_RAJAT.googleUsd : null,
    typeof kulut?.google === 'number' ? usdArvo(kulut.google, KIINTIO_RAJAT.googleUsd) : '',
    tyhja));
  /*
   * Kulurivi ja lähdediagnoosi POISTETTU (omistajan tilaus 15.8.2026
   * "Poista nämä tekstit" — palkit riittävät). Diagnoosirivi ehti
   * tehdä tehtävänsä: se paljasti peili/pöllö-muuttujien ristiinmenon
   * (v758). Workerin tila-vastauksessa kulut ja viat kulkevat yhä,
   * jos niitä joskus taas halutaan näyttää.
   */
}

/**
 * Palkkien täyttö. Onnistunut tulos riittää istunnoksi; KAIKKI vajaat
 * tulokset (virhe, lähdeviat tai kulut tyhjänä mistä syystä hyvänsä —
 * myös vanhan workerin muotoinen vastaus ilman viat-kenttää) haetaan
 * uudestaan seuraavasta avauksesta. Ohimenevä häiriö tai kesken ollut
 * julkaisu ei saa jäädä lehteen koko istunnoksi.
 */
function paivitaKiintiot(kotelo) {
  if (!kehittajaTilaPaalla()) return;
  const vajaa = kiintioTila && (
    kiintioTila.tilaSyy
    || !kiintioTila.tila
    || kiintioTila.tila.kulut?.yhteensa === null
    || kiintioTila.tila.kulut?.yhteensa === undefined
    || (kiintioTila.tila.viat && Object.keys(kiintioTila.tila.viat).length)
  );
  if (kiintioTila && !vajaa) {
    piirraKiintiopalkit(kotelo, kiintioTila);
    return;
  }
  piirraKiintiopalkit(kotelo, null);
  if (!kiintioHaku) {
    kiintioHaku = haeKiintiotila()
      .then((data) => { kiintioTila = data; return data; })
      .catch(() => null)
      .finally(() => { kiintioHaku = null; });
  }
  /*
   * Kotelo kiinnitetään AINA menossa olevaan hakuun. Sivu piirretään
   * uudestaan joka avauksella, joten pelkkä "haku on jo käynnissä"
   * -paluu jättäisi tuoreen kotelon ikuiseen "haetaan…"-tilaan.
   */
  kiintioHaku.then((data) => {
    if (data && kotelo.isConnected) piirraKiintiopalkit(kotelo, data);
  });
}

/** Kiintiöt-sivu: johdanto, palkit ja lähdeselite. */
function piirraKiintiosivu(kohde) {
  kohde.appendChild(html('p', 'johdanto',
    'Tilankäyttö ja kuukausikiintiöt yhdellä silmäyksellä. Palkki on '
    + 'vihreä väljällä, keltainen kun rajasta on käytetty 60 % ja '
    + 'punainen 85 %:sta ylöspäin.'));
  const kotelo = html('div', 'tk-kiintiot');
  kohde.appendChild(kotelo);
  kohde.appendChild(html('p', 'tk-selite',
    'R2 on peiliämpärien yhteiskoko (kuvat, liput, äänet, tekstit) '
    + 'ilmaistason 10 gigatavusta; Repo on GitHubin ilmoittama repon '
    + 'koko suosituksen 1 gigatavusta. ElevenLabs ja Pöllö ovat '
    + 'kuukausikiintiöitä. OpenAI ja Google ovat kuvageneroinnin '
    + 'kuluvan kuukauden kulut dollareina omaa budjettirajaa vasten; '
    + 'ne vaativat workeriin oman tunnuksensa, joka EI ole sama avain '
    + 'jolla kuvia generoidaan. Repon koko tulee GitHubin julkisesta '
    + 'rajapinnasta, muut pöllö-workerilta kehittäjäkoodilla — ilman '
    + 'koodia tai verkkoa palkki jää haaleaksi "ei tietoa" -palkiksi. '
    + 'Vastaus muistetaan istunnon ajan, joten lehden uusi avaus ei hae '
    + 'lukuja turhaan uudestaan.'));
  paivitaKiintiot(kotelo);
}

/* ------------------------------------------------------------------ *
 * RAAMATUN GENEROIDUT TAULUT
 *
 * Poistetun työhuonesivuston Raamattu-välilehti liitti kahteen osioon
 * taulukon, joka luettiin suoraan pelidatasta (omistajan tilaus
 * 11.8.2026: "listata selkeästi kaikki tutki kätkö pelit sekä kaikki
 * aarteet taulukoituna"). Taulut siirtyvät tänne ja liittyvät pelin
 * Raamattu-lehteen omina sivuinaan — ne eivät voi vanhentua, koska
 * lähde on sama kuin pelillä.
 * ------------------------------------------------------------------ */

const MANNERNIMI = {
  europe: 'Eurooppa',
  middleeast: 'Lähi-itä',
  africa: 'Afrikka',
  asia: 'Aasia',
  northamerica: 'Pohjois-Amerikka',
  southamerica: 'Etelä-Amerikka',
  oceania: 'Oseania',
};

/** Yksinkertainen taulukko otsikoineen omassa vierityskotelossaan. */
function pikataulu(otsikot, rivit) {
  const kotelo = html('div', 'tk-vieri');
  const taulu = html('table', 'tk-taulu');
  const paa = html('thead');
  const otsRivi = html('tr');
  for (const o of otsikot) otsRivi.appendChild(html('th', '', o));
  paa.appendChild(otsRivi);
  taulu.appendChild(paa);
  const runko = html('tbody');
  for (const rivi of rivit) {
    const tr = html('tr', 'tk-rivi');
    rivi.forEach((solunSisus, i) => {
      tr.appendChild(html('td', i === 0 ? 'tk-nimi' : '', String(solunSisus)));
    });
    runko.appendChild(tr);
  }
  taulu.appendChild(runko);
  kotelo.appendChild(taulu);
  return kotelo;
}

/** Mantereiden aarteet ja laattojen jakauma maailmankartan datasta. */
function piirraAarretaulut(kohde) {
  const maailma = PACKS.find((p) => p.id === 'maailmankartta');
  const mannerit = Object.entries(maailma?.tokens?.mannerTypes ?? {});
  const eka = mannerit[0]?.[1] ?? {};
  kohde.appendChild(html('p', 'johdanto',
    'Mantereiden aarteet — jokaisella mantereella omansa; laatta '
    + 'paljastaa sen mantereen aarteen, jolta se löytyy. Unohdettu aarre '
    + 'on Aarnin luettelon päämäärä, joka avaa mannerlennon.'));
  kohde.appendChild(pikataulu(
    ['Manner', 'Unohdettu aarre', `Mantereen aarre +${eka.mannerAarre?.value ?? 1000} p`],
    mannerit.map(([manner, t]) => [
      MANNERNIMI[manner] ?? manner,
      t.star?.name ?? '?', t.mannerAarre?.name ?? '?',
    ]),
  ));
  const maarat = maailma?.tokens?.counts ?? {};
  const yhteensa = Object.values(maarat).reduce((a, b) => a + b, 0);
  kohde.appendChild(html('p', 'tk-selite',
    `Laattojen jakauma (${yhteensa} laattaa, yksi joka kaupungissa; `
    + 'laatan alta löytyy aina aarre):'));
  kohde.appendChild(pikataulu(['Laatta', 'Kpl', 'Vaikutus'], [
    ['Pääaarre (unohdettu aarre)', maarat.star ?? 0,
      '+2000 p JA jää matkalaukkuun näkyviin — avaa mannerlennon'],
    ['Mantereen aarre', maarat.mannerAarre ?? 0, 'Kiinteä +1000 p — muuttuu heti rahaksi'],
    ['Iso paikallisaarre', maarat.isoAarre ?? 0, 'Maan oma aarre, +500–800 p löytöhetken mukaan'],
    ['Pieni paikallisaarre', maarat.pieniAarre ?? 0, 'Maan oma aarre, +100–250 p löytöhetken mukaan'],
    ['Ryöstäjä', maarat.robber ?? 0, 'Vie rahat — tai voita kaksintaistelu'],
  ]));
}

/** Tutki kätkö -pelien katalogi (js/tyohuone-pelit.js). */
function piirraPelitaulu(kohde) {
  kohde.appendChild(html('p', 'johdanto',
    `${KATKOPELIT.johdanto} Päivitetty ${KATKOPELIT.paivitetty}; Fable ylläpitää.`));
  kohde.appendChild(pikataulu(['Peli', 'Tila', 'Kuvaus'], [
    ...KATKOPELIT.nykyiset.map((p) => [p.nimi, p.tila, p.kuvaus]),
    ...KATKOPELIT.ehdotukset.map((p) => [p.nimi, 'ehdotus — ei päätetty', p.kuvaus]),
  ]));
  kohde.appendChild(html('p', 'tk-selite',
    'Ehdotuksia EI ole päätetty. Jokaisessa on mietitty valmiiksi, mihin '
    + 'tarinoihin tyyppi istuu; valitut pilotoidaan yhdessä kaupungissa '
    + 'ennen monistusta. Periaatteet: '
    + KATKOPELIT.periaatteet.join(' · ')));
}

/**
 * Raamatun osioon liittyvä generoitu taulusivu, tai null jos osiolla
 * ei sellaista ole. Kutsutaan js/lehti.js:n avaaRaamattuLehti-
 * funktiosta, joka pujottaa sivun osion perään.
 */
export function raamatunTaulusivu(osio, i) {
  if (osio.otsikko.startsWith('Aarteet')) {
    return {
      id: `raamattu-${i}-aarteet`,
      nimi: 'Aarteet taulukkona',
      yksipalsta: true,
      rakenna: piirraAarretaulut,
    };
  }
  if (osio.otsikko.startsWith('Tutki kätkö')) {
    return {
      id: `raamattu-${i}-pelit`,
      // Nimi eroaa Raamatun oman osion otsikosta, muuten sisällys-
      // valikossa olisi kaksi samannimistä riviä peräkkäin.
      nimi: 'Pelit taulukkona',
      yksipalsta: true,
      rakenna: piirraPelitaulu,
    };
  }
  return null;
}

/**
 * Tilastot-lehden sivut. Ensimmäinen sivu on itse taulu — se on
 * lehden koko syy olla olemassa.
 */
export function tilastoSivut() {
  return [
    {
      id: 'tilastot-taulu',
      nimi: 'Mantereet',
      yksipalsta: true,
      rakenna: piirraTilastosivu,
    },
    {
      id: 'tilastot-luvut',
      nimi: 'Luvut',
      yksipalsta: true,
      rakenna: piirraLuvut,
    },
    /*
     * Kiintiöt viimeisenä (omistajan tilaus 21.8.2026): ne eivät kerro
     * rakennustyöstä vaan tilan ja kiintiöiden riittämisestä, joten ne
     * ovat lehden loppulohko eivätkä sekoitu taulun lukuihin.
     */
    {
      id: 'tilastot-kiintiot',
      nimi: 'Kiintiöt',
      yksipalsta: true,
      rakenna: piirraKiintiosivu,
    },
  ];
}
