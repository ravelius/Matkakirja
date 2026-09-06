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

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Pulun tehostelistan oletuspolku. */
export const PULULISTA = resolve(JUURI, 'tools/tehosteet/pulu-tehosteet.json');

/**
 * Freesoundin lisenssiosoitteet luettavaan muotoon. Sama taulukko kuin
 * hae-freesound.mjs:ssä; tuntematon osoite palautuu sellaisenaan, jottei
 * manifestiin päädy tyhjää lisenssikenttää.
 */
export const LISENSSIT = {
  'http://creativecommons.org/publicdomain/zero/1.0/': 'CC0',
  'https://creativecommons.org/publicdomain/zero/1.0/': 'CC0',
  'http://creativecommons.org/licenses/by/4.0/': 'CC BY 4.0',
  'https://creativecommons.org/licenses/by/4.0/': 'CC BY 4.0',
  'http://creativecommons.org/licenses/by/3.0/': 'CC BY 3.0',
  'https://creativecommons.org/licenses/by/3.0/': 'CC BY 3.0',
};

/** Lisenssin luettava nimi. */
export const lisenssiNimi = (url) => LISENSSIT[url] ?? url;

/** Vaatiiko lisenssi tekijän nimeämisen? CC0 ei, CC BY vaatii. */
export const vaatiiAttribuution = (nimi) => !/^CC0/.test(String(nimi ?? ''));

/** Freesoundin filter-syntaksissa sallitut lisenssinimet. */
export const SALLITUT_LISENSSIT = ['Creative Commons 0', 'Attribution'];

/**
 * Yhden tehosteen lisenssisuodatin Freesoundin filter-syntaksissa.
 * Järjestys on listasta: CC0 ensin, koska se on ensisijainen.
 */
export function lisenssisuodatin(tehoste) {
  const nimet = tehoste?.lisenssit?.length ? tehoste.lisenssit : SALLITUT_LISENSSIT;
  return `license:(${nimet.map((n) => `"${n}"`).join(' OR ')})`;
}

/** Koko hakusuodatin: lisenssit ja kestorajat yhdessä. */
export function hakusuodatin(tehoste) {
  return `${lisenssisuodatin(tehoste)} duration:[${tehoste.kestoMin} TO ${tehoste.kestoMax}]`;
}

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
    // Peliavain on kytkentä js/sound.js:ään. Ilman sitä tiedosto
    // päätyisi ämpäriin eikä koskaan peliin — ja se huomattaisiin vasta
    // kun joku ihmettelee, miksi ääni ei soi.
    if (typeof t?.peliavain !== 'string' || !/^pulu\.[a-z0-9-]+$/.test(t.peliavain)) {
      virheet.push(`${nimi}: peliavain puuttuu tai ei ole muotoa pulu.<nimi>`);
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

/** Lukee ja tarkistaa tehostelistan. Kaatuu, jos muoto ei kelpaa. */
export function lueTehostelista(polku = PULULISTA) {
  const data = JSON.parse(readFileSync(polku, 'utf8'));
  const virheet = tarkistaTehostelista(data);
  if (virheet.length) {
    throw new Error(`${polku} ei kelpaa:\n  ${virheet.join('\n  ')}`);
  }
  return data;
}

/**
 * OSUMAN PISTEYTYS: arvosana, lataukset ja kesto.
 *
 * Kone ei kuuntele, joten valinta on tehtävä luvuista. Kolme lukua ja
 * kolme syytä:
 *
 *  - ARVOSANA (paino 3) kertoo, mitä kuuntelijat ovat äänestä mieltä.
 *    Alle kolmen arvion keskiarvo on kohinaa — silloin käytetään
 *    neutraalia 3/5 eikä nollaa, jottei arvioimaton mutta hyvä ääni
 *    putoa pelkästään tuoreutensa takia.
 *  - LATAUKSET (paino 2) on hitaampi mutta rehellisempi mittari: moni
 *    on ottanut äänen käyttöön oikeassa työssä. Logaritmi, koska ero
 *    10:n ja 100:n välillä merkitsee, ero 10 000:n ja 20 000:n ei.
 *  - KESTO (paino 1) suosii haarukan keskikohtaa. Rajojen laidoilla
 *    oleva osuma on tyypillisesti joko katkaistu tai sisältää jotain
 *    muuta perään.
 */
export function pisteytaOsuma(osuma, tehoste) {
  const arvioita = Number(osuma?.num_ratings ?? 0);
  const arvio = arvioita >= 3 ? Number(osuma?.avg_rating ?? 0) : 3;
  const arviopisteet = 3 * (Math.max(0, Math.min(5, arvio)) / 5);

  const lataukset = Math.max(0, Number(osuma?.num_downloads ?? 0));
  const latauspisteet = 2 * Math.min(1, Math.log10(1 + lataukset) / 4);

  const keskikohta = (tehoste.kestoMin + tehoste.kestoMax) / 2;
  const puolikas = (tehoste.kestoMax - tehoste.kestoMin) / 2 || 1;
  const kesto = Number(osuma?.duration ?? 0);
  const kestopisteet = Math.max(0, 1 - Math.abs(kesto - keskikohta) / puolikas);

  return {
    pisteet: Number((arviopisteet + latauspisteet + kestopisteet).toFixed(3)),
    osat: {
      arvio: Number(arviopisteet.toFixed(3)),
      lataukset: Number(latauspisteet.toFixed(3)),
      kesto: Number(kestopisteet.toFixed(3)),
    },
  };
}

/**
 * Paras osuma tehosteelle, tai null jos kelvollisia ei ole.
 *
 * Ilman esikuuntelu-mp3:a osuma on hyödytön: alkuperäinen tiedosto voi
 * olla pakkaamaton wav, jota ei ladata puhelimeen. Kestorajojen
 * ulkopuolelle jäävä osuma karsitaan vielä täällä, vaikka rajaus on jo
 * tehty palvelimen puolella — hakusuodatin pyöristää sekunteihin.
 */
export function valitseParas(osumat, tehoste) {
  const kelpaavat = (osumat ?? [])
    .filter((o) => o?.previews?.['preview-hq-mp3'] || o?.previews?.['preview-lq-mp3'])
    .filter((o) => Number(o.duration) >= tehoste.kestoMin * 0.8
      && Number(o.duration) <= tehoste.kestoMax * 1.2)
    .map((o) => ({ osuma: o, ...pisteytaOsuma(o, tehoste) }));
  if (!kelpaavat.length) return null;
  kelpaavat.sort((a, b) => b.pisteet - a.pisteet);
  return kelpaavat[0];
}

/** Manifestirivi valitusta osumasta — tasan ne kentät, jotka peli ja lisenssi vaativat. */
export function manifestirivi(tehoste, valinta, { kesto }) {
  const o = valinta.osuma;
  const lisenssi = lisenssiNimi(o.license);
  return {
    tunnus: tehoste.tunnus,
    tiedosto: `${tehoste.tunnus}.mp3`,
    kuvaus: tehoste.kuvaus,
    freesoundId: o.id,
    nimi: o.name,
    tekija: o.username,
    lisenssi,
    attribuutio: vaatiiAttribuution(lisenssi)
      ? `"${o.name}" — ${o.username}, Freesound (${lisenssi})`
      : null,
    sivu: o.url,
    kesto: Number(kesto.toFixed(2)),
    pisteet: valinta.pisteet,
  };
}
