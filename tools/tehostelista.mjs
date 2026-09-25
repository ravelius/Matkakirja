/*
 * TEHOSTELISTAN LUKU, LISENSSIRAJAUS JA OSUMAN VALINTA.
 *
 * Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti: *"Pululle ja
 * muuallekin tarvitaan ääniefektejä: linnun siivet lentäessä,
 * tömähdyksiä (pulu laskeutuu), hassuja täyteääniä kun pulu sekoilee
 * (doing vieteriääni yms), oven lämähdys kiinni ja auki (pulu tulee tai
 * lähtee), viuhahdusefektejä yms. NÄITÄ EI GENEROIDA."*
 *
 * Siinä on tämän moduulin koko olemassaolon syy. Kohahdus ja pelin muut
 * efektit tulevat ElevenLabsilta (tools/generoi-tehosteet.mjs), mutta
 * pulun tehosteet EIVÄT: ne haetaan valmiina äänitteinä Freesoundista.
 * Siksi tarvitaan lista, jonka mukaan haku ajetaan, ja säännöt sille,
 * mikä osuma valitaan — kone ei kuuntele, joten valinta on tehtävä
 * mitattavista luvuista ja lisenssirajaus palvelimen puolella.
 *
 * MIKSI OMA MODUULI EIKÄ OSA hae-freesound.mjs:ÄÄ. Hakutyökalu lukee
 * API-avaimen moduulitasolla ja poistuu, jos sitä ei ole — sitä ei voi
 * tuoda testiin kutsumatta samalla sen pääohjelmaa. Nämä funktiot ovat
 * puhtaita, ja tests/pulu-tehosteet.test.mjs tuo tasan ne.
 *
 * LISENSSIT. Vain CC0 ja CC BY, ja rajaus tehdään Freesoundin
 * filter-parametrilla eikä jälkikäteen (sama linjaus kuin
 * hae-freesound.mjs:n koreissa). CC BY vaatii attribuution, ja se
 * kirjataan manifestiin: tekijä, lisenssi ja Freesoundin id kulkevat
 * äänen mukana ämpäriin asti, jotta kirjaus ei jää yhden ajon lokiin.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  AANILAHTEET, jarjestaEhdokkaat, KAIKKI_LAHTEET, lisenssiNimi, normalisoiFreesound,
  pisteytaEhdokas, SALLITUT_LISENSSIT, vaatiiAttribuution,
} from './aanilahteet.mjs';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Pulun tehostelistan oletuspolku. */
export const PULULISTA = resolve(JUURI, 'tools/tehosteet/pulu-tehosteet.json');

/**
 * Ihmisen matka -linssin äänimaisemalista (omistajan tilaus 7.9.2026
 * ilta, Raamattu: LINSSIEN AIDOT AANIMAISEMAT). Sama koneisto kuin
 * pulun tehosteilla — eri mitat: taustaääni eikä isku, joten kesto on
 * 30–120 s, taso −30 LUFS ja hiljaisuuden leikkaus pois päältä.
 */
export const MAISEMALISTA = resolve(JUURI, 'tools/tehosteet/ihmisen-matka-maisemat.json');

/**
 * Listan levykansiot johdetaan ämpärin kansiosta eikä kirjoiteta
 * käsin: kaksi listaa tarkoittaisi muuten kaksi paria vakioita, jotka
 * voivat eriytyä. `aanet/tehosteet/pulu` → `media/tehosteet-pulu` ja
 * `media/tehosteet-pulu-raaka` (täsmälleen entiset polut), `aanet/
 * tehosteet/ihmisen-matka` → `media/tehosteet-ihmisen-matka`. Molemmat
 * ovat media/-puolella, joka on .gitignoressa — media kuuluu ämpäriin.
 */
export function listanKansiot(lista) {
  const nimi = String(lista?.amparinKansio ?? '').split('/').filter(Boolean).pop();
  if (!nimi) throw new Error('listalta puuttuu amparinKansio');
  return {
    kohdekansio: `media/tehosteet-${nimi}`,
    raakakansio: `media/tehosteet-${nimi}-raaka`,
  };
}

/*
 * LISENSSIT JA HAKUSUODATIN ASUVAT NYT tools/aanilahteet.mjs:SSÄ.
 *
 * Omistajan päätös 11.9.2026 (*"Lisää ilmaisia lähteitä rinnalle"*)
 * toi Freesoundin rinnalle Wikimedia Commonsin ja Kenneyn CC0-paketit.
 * Lisenssirajaus on se kohta, joka ratkaisee saako ääntä käyttää
 * kaupallisessa pelissä — ja se saa olla vain YHDESSÄ paikassa, tai se
 * rapistuu lähteiden välillä eri tahtiin. Nämä nimet ovat entisellään
 * täällä, jotta kutsupaikkoja ei tarvinnut muuttaa.
 */
export {
  hakusuodatin, LISENSSIT, lisenssisuodatin,
} from './aanilahteet.mjs';
export { lisenssiNimi, SALLITUT_LISENSSIT, vaatiiAttribuution };

/**
 * Listan muototarkistus. Palauttaa virheet listana — tyhjä lista
 * tarkoittaa kelvollista tiedostoa. Sekä testi että työkalu ajavat
 * tämän: työkalu ei saa lähteä lataamaan mitään rikkinäisen listan
 * pohjalta, ja testi kertoo virheen ennen kuin ajo edes yritetään.
 */
export function tarkistaTehostelista(data) {
  const virheet = [];
  if (!data || typeof data !== 'object') return ['lista ei ole olio'];
  if (typeof data.amparinKansio !== 'string' || !data.amparinKansio) {
    virheet.push('amparinKansio puuttuu');
  }
  if (typeof data.manifesti !== 'string' || !data.manifesti.endsWith('.json')) {
    virheet.push('manifesti puuttuu tai ei ole .json');
  }
  if (!Number.isFinite(data.tavoiteLufs)) virheet.push('tavoiteLufs puuttuu');
  if (!Array.isArray(data.tehosteet) || !data.tehosteet.length) {
    virheet.push('tehosteet puuttuu tai on tyhjä');
    return virheet;
  }
  /*
   * Poissuljetut tagit ovat valinnaisia ja pienaakkosia: ne menevät
   * Freesoundin filter-parametriin sellaisenaan (`-tag:music`), joten
   * väli tai iso kirjain rikkoisi hiljaa koko haun.
   */
  const tarkistaTagit = (arvo, nimi) => {
    if (arvo === undefined) return;
    if (!Array.isArray(arvo) || arvo.some((x) => typeof x !== 'string' || !/^[a-z0-9-]+$/.test(x))) {
      virheet.push(`${nimi}: poisTagit pitää olla lista pienaakkosia tageja`);
    }
  };
  tarkistaTagit(data.poisTagit, 'lista');
  /*
   * LÄHTEET (omistajan päätös 11.9.2026: *"Lisää ilmaisia lähteitä
   * rinnalle"*). Lista saa kertoa per tehoste tai koko listalle, mistä
   * lähteistä haetaan; oletus on KAIKKI. Tuntematon nimi on kirjoitus-
   * virhe, ja se pitää kaatua tässä eikä näkyä hiljaisena puuttuvana
   * lähteenä ajon lokissa.
   */
  const tarkistaLahteet = (arvo, nimi) => {
    if (arvo === undefined) return;
    if (!Array.isArray(arvo) || !arvo.length) {
      virheet.push(`${nimi}: lahteet pitää olla ei-tyhjä lista`);
      return;
    }
    for (const l of arvo) {
      if (!KAIKKI_LAHTEET.includes(l)) {
        virheet.push(`${nimi}: tuntematon lähde "${l}" (tunnetut: ${KAIKKI_LAHTEET.join(', ')})`);
      }
    }
  };
  tarkistaLahteet(data.lahteet, 'lista');
  const etuliite = typeof data.peliavainEtuliite === 'string' && data.peliavainEtuliite
    ? data.peliavainEtuliite : 'pulu';
  if (!/^[a-z-]+$/.test(etuliite)) virheet.push('peliavainEtuliite ei ole pienaakkosia');
  const avainMuoto = new RegExp(`^${etuliite}\\.[a-z0-9-]+$`);

  const nahdyt = new Set();
  for (const t of data.tehosteet) {
    const nimi = t?.tunnus ?? '(nimetön)';
    if (typeof t?.tunnus !== 'string' || !/^[a-z0-9-]+$/.test(t.tunnus)) {
      virheet.push(`${nimi}: tunnus puuttuu tai ei ole pienaakkosia ja väliviivoja`);
    } else if (nahdyt.has(t.tunnus)) {
      virheet.push(`${nimi}: tunnus on listassa kahdesti`);
    } else {
      nahdyt.add(t.tunnus);
    }
    if (typeof t?.kuvaus !== 'string' || !t.kuvaus.trim()) {
      virheet.push(`${nimi}: kuvaus puuttuu`);
    }
    /*
     * Peliavain on kytkentä peliin. Ilman sitä tiedosto päätyisi
     * ämpäriin eikä koskaan peliin — ja se huomattaisiin vasta kun joku
     * ihmettelee, miksi ääni ei soi. Etuliite kertoo, mihin kytkentä
     * menee: `pulu.` js/sound.js:n PULUN_TEHOSTEET-taulukkoon, `maisema.`
     * kertomuksen `maisema`-kenttiin (js/linssit/ihmisen-matka-kertomus.js).
     */
    if (typeof t?.peliavain !== 'string' || !avainMuoto.test(t.peliavain)) {
      virheet.push(`${nimi}: peliavain puuttuu tai ei ole muotoa ${etuliite}.<nimi>`);
    }
    if (!Array.isArray(t?.hakusanat) || !t.hakusanat.length
      || t.hakusanat.some((s) => typeof s !== 'string' || !s.trim())) {
      virheet.push(`${nimi}: hakusanat puuttuvat`);
    } else if (t.hakusanat.some((s) => /[äöå]/i.test(s))) {
      // Freesoundin aineisto on merkitty englanniksi: suomenkielinen
      // hakusana löytää muutaman kymmenen tiedostoa koko palvelusta.
      virheet.push(`${nimi}: hakusanojen pitää olla englanniksi`);
    }
    if (!Number.isFinite(t?.kestoMin) || !Number.isFinite(t?.kestoMax)
      || t.kestoMin <= 0 || t.kestoMax <= t.kestoMin) {
      virheet.push(`${nimi}: kestoMin ja kestoMax puuttuvat tai ovat väärin päin`);
    }
    tarkistaTagit(t?.poisTagit, nimi);
    tarkistaLahteet(t?.lahteet, nimi);
    if (!Array.isArray(t?.lisenssit) || !t.lisenssit.length) {
      virheet.push(`${nimi}: lisenssit puuttuvat`);
    } else {
      for (const l of t.lisenssit) {
        if (!SALLITUT_LISENSSIT.includes(l)) {
          virheet.push(`${nimi}: lisenssi "${l}" ei ole CC0 eikä CC BY`);
        }
      }
      if (t.lisenssit[0] !== 'Creative Commons 0') {
        virheet.push(`${nimi}: CC0 pitää olla ensimmäisenä (ensisijainen lisenssi)`);
      }
    }
  }
  return virheet;
}

/**
 * Lukee ja tarkistaa tehostelistan. Kaatuu, jos muoto ei kelpaa.
 *
 * Listan tason `poisTagit` valuu jokaiselle tehosteelle, joka ei
 * määrittele omiaan: viisitoista äänimaisemaa kirjoittaisi muuten saman
 * neljän tagin listan viisitoista kertaa, ja yhden unohtaminen olisi
 * yksi hiljainen musiikkiosuma.
 */
export function lueTehostelista(polku = PULULISTA) {
  const data = JSON.parse(readFileSync(polku, 'utf8'));
  const virheet = tarkistaTehostelista(data);
  if (virheet.length) {
    throw new Error(`${polku} ei kelpaa:\n  ${virheet.join('\n  ')}`);
  }
  const listanPois = Array.isArray(data.poisTagit) && data.poisTagit.length
    ? data.poisTagit : null;
  const listanLahteet = Array.isArray(data.lahteet) && data.lahteet.length
    ? data.lahteet : null;
  if (!listanPois && !listanLahteet) return data;
  return {
    ...data,
    tehosteet: data.tehosteet.map((t) => ({
      ...t,
      ...(listanPois && !t.poisTagit ? { poisTagit: listanPois } : {}),
      ...(listanLahteet && !t.lahteet ? { lahteet: listanLahteet } : {}),
    })),
  };
}

/**
 * OSUMAN PISTEYTYS — entinen nimi, uusi koneisto.
 *
 * Pisteytys itse asuu nyt tools/aanilahteet.mjs:ssä, koska se on
 * kaikille lähteille yhteinen (omistajan päätös 11.9.2026: *"Lisää
 * ilmaisia lähteitä rinnalle"*). Tämä on se sama kutsu Freesoundin
 * raa'alle hakutulokselle: osuma normalisoidaan yhteiseen muotoon ja
 * pisteytetään sillä.
 *
 * `osat.lataukset` on jäljellä entisellä nimellään — Freesoundilla
 * suosioluku ON latausmäärä, ja vanha nimi on lokissa ja manifestissa.
 */
export function pisteytaOsuma(osuma, tehoste) {
  const { pisteet, osat } = pisteytaEhdokas(normalisoiFreesound(osuma), tehoste);
  return {
    pisteet,
    osat: {
      arvio: osat.arvio,
      lataukset: osat.suosio,
      kesto: osat.kesto,
      osuvuus: osat.osuvuus,
      kerroin: osat.kerroin,
    },
  };
}

/**
 * Paras Freesound-osuma tehosteelle, tai null jos kelvollisia ei ole.
 *
 * Ilman esikuuntelu-mp3:a osuma on hyödytön: alkuperäinen tiedosto voi
 * olla pakkaamaton wav, jota ei ladata puhelimeen. Kestorajojen
 * ulkopuolelle jäävä osuma karsitaan vielä täällä, vaikka rajaus on jo
 * tehty palvelimen puolella — hakusuodatin pyöristää sekunteihin.
 *
 * MONILÄHTEINEN AJO KÄYTTÄÄ tools/aanilahteet.mjs:n
 * valitseParasEhdokas-funktiota; tämä on sen Freesound-muotoinen
 * kutsu, ja palauttaa `osuma`-kentässä yhä alkuperäisen hakutuloksen.
 */
export function valitseParas(osumat, tehoste) {
  const raa = new Map();
  const ehdokkaat = (osumat ?? []).map((o) => {
    const e = normalisoiFreesound(o);
    raa.set(`${e.lahde}:${e.id}`, o);
    return e;
  });
  const paras = jarjestaEhdokkaat(ehdokkaat, tehoste)[0];
  if (!paras) return null;
  return {
    osuma: raa.get(`${paras.ehdokas.lahde}:${paras.ehdokas.id}`),
    ehdokas: paras.ehdokas,
    pisteet: paras.pisteet,
    osat: paras.osat,
  };
}

/**
 * Manifestirivi valitusta osumasta — tasan ne kentät, jotka peli ja
 * lisenssi vaativat, plus LÄHDE.
 *
 * Lähde on manifestissa kahdesta syystä. Kuuntelija haluaa tietää,
 * mistä huono osuma tuli (ja mikä lähde kannattaa rajata pois seuraavassa
 * ajossa), ja attribuutioteksti nimeää palvelun: CC BY vaatii tekijän
 * JA lähteen. `freesoundId` on jäljellä entisellä nimellään, koska
 * vanhat manifestirivit ämpärissä kantavat sitä.
 */
export function manifestirivi(tehoste, valinta, { kesto }) {
  const e = valinta.ehdokas ?? normalisoiFreesound(valinta.osuma);
  const palvelu = AANILAHTEET[e.lahde]?.nimi ?? e.lahde;
  return {
    tunnus: tehoste.tunnus,
    tiedosto: `${tehoste.tunnus}.mp3`,
    kuvaus: tehoste.kuvaus,
    lahde: e.lahde,
    lahdeId: e.id,
    ...(e.lahde === 'freesound' ? { freesoundId: Number(e.id) } : {}),
    nimi: e.nimi,
    tekija: e.tekija,
    lisenssi: e.lisenssi,
    attribuutio: vaatiiAttribuution(e.lisenssi)
      ? `"${e.nimi}" — ${e.tekija}, ${palvelu} (${e.lisenssi})`
      : null,
    sivu: e.sivu,
    kesto: Number(kesto.toFixed(2)),
    pisteet: valinta.pisteet,
  };
}
