/*
 * ÄÄNILÄHTEET — monta ilmaista lähdettä samaan hakuputkeen.
 *
 * Omistajan päätös 11.9.2026, sanatarkasti: *"Lisää ilmaisia lähteitä
 * rinnalle."* Taustalla on laatuongelma, ei puute: kone valitsee osuman
 * mitattavista luvuista eikä korvalla, ja yhden lähteen aineistosta
 * paras mitattu osuma voi silti olla väärä ääni (riemuääneksi tuli
 * ensin "Cute Computer Squeak" ja sitten "Upset Bird Chirp").
 * Useammasta lähteestä haettu joukko antaa valinnalle enemmän varaa —
 * ja tämän moduulin OSUVUUS-piste antaa koneelle vihdoin mittarin
 * sille, puhuuko osuman nimi samasta asiasta kuin hakusana.
 *
 * ──────────────────────────────────────────────────────────────────
 * MITÄ LÄHTEITÄ, JA MIKSI JUURI NÄMÄ (selvitys 11.9.2026)
 * ──────────────────────────────────────────────────────────────────
 *
 * Jokainen lähde joutui samaan testiin: (1) kaupallinen käyttö
 * sallittu, (2) ei nimeämispakkoa tai nimeäminen hoidettavissa
 * manifestilla, (3) OHJELMALLINEN haku ja lataus sallittu, (4)
 * uudelleenjakelu pelin mediapalvelimelta sallittu.
 *
 * LÄPI MENIVÄT:
 *
 *  1. FREESOUND (entinen, avain vaaditaan) — https://freesound.org/docs/api/
 *     CC0 ja CC BY palvelimen puolen filter-rajauksella.
 *  2. WIKIMEDIA COMMONS (uusi, EI AVAINTA) — MediaWiki Action API,
 *     https://commons.wikimedia.org/w/api.php. Ohjelmallinen käyttö on
 *     rajapinnan koko tarkoitus; ehtona on tunnistautuva User-Agent
 *     (https://foundation.wikimedia.org/wiki/Policy:User-Agent_policy).
 *     Aineisto on PD / CC0 / CC BY / CC BY-SA — tästä otetaan vain
 *     kolme ensimmäistä (ks. LISENSSIT alla).
 *  3. KENNEY (uusi, EI AVAINTA) — https://kenney.nl/assets/category:Audio
 *     CC0-pelipaketteja zip-nippuina. Ei hakurajapintaa: paketti
 *     ladataan kerran ajossa ja sen sisältö luetaan hakemistosta.
 *     CC0 tarkoittaa, ettei jakelulle ole ehtoja lainkaan.
 *
 * EIVÄT MENNEET LÄPI (näitä EI ole toteutettu — älä lisää):
 *
 *  - PIXABAY. Kaksi estettä. (a) Äänille EI ole rajapintaa: Pixabayn
 *    API-dokumentaatio (https://pixabay.com/api/docs/) tuntee vain
 *    kuvat (https://pixabay.com/api/) ja videot (.../api/videos/) —
 *    musiikki ja tehosteet ovat vain selattavaa sisältöä. (b) Käyttö-
 *    ehdot (https://pixabay.com/service/terms/) kieltävät nimenomaan
 *    ohjelmallisen keruun: *"Data mining, extraction, scraping and the
 *    use of programs or robots for automatic data collection … is
 *    strictly prohibited"*, ja lisäksi *"Bulk, large-scale or
 *    systematic copying of Content is strictly prohibited"*. Lisenssi
 *    itsessään olisi kelvannut (kaupallinen käyttö sallittu, ei
 *    nimeämispakkoa), mutta ilman rajapintaa ja ilman lupaa
 *    ohjelmalliseen hakuun lähdettä ei voi ottaa.
 *
 *  - MIXKIT. Ei rajapintaa, ja käyttöehdot (https://mixkit.co/terms/)
 *    kieltävät sekä koneellisen latauksen — *"use scripts or bots to
 *    mass download Items"* — että sen, mitä tämä putki tekee
 *    tuloksellaan: *"aggregate or collate an Item(s) and make
 *    available on a stock or inventory basis"* ja *"sublicense, sell …
 *    or otherwise commercially exploit or make … any Item available to
 *    any third party"*. Ääni ämpärissä julkisen osoitteen takana on
 *    juuri sitä. Lisenssi sallii pelikäytön, ehdot eivät salli tätä
 *    tapaa hankkia ja jakaa sitä.
 *
 *  - INTERNET ARCHIVE. Rajapinta on (advancedsearch.php) ja lisenssin
 *    voi rajata kentällä licenseurl, mutta aineisto on kokonaisia
 *    nauhoituksia ja radio-ohjelmia: lisenssi on niteen eikä tiedoston
 *    tasolla, kestoa ei saa hakutuloksesta, ja lyhyitä tehosteita
 *    siellä ei käytännössä ole. Ehdot eivät estä — osumien laatu estää.
 *
 *  - BBC Sound Effects, Zapsplat, SoundBible: nimeämispakko ilman
 *    koneellista tapaa hoitaa sitä, uudelleenjakelukielto tai
 *    ei-kaupallinen rajaus. Ei toteuteta.
 *
 * ──────────────────────────────────────────────────────────────────
 * MIKSI PUHDAS MODUULI
 * ──────────────────────────────────────────────────────────────────
 *
 * Sama syy kuin tools/tehostelista.mjs:llä: tools/hae-freesound.mjs
 * lukee API-avaimen moduulitasolla ja poistuu, jos sitä ei ole, joten
 * sitä ei voi tuoda testiin. Täällä avain on funktion parametri eikä
 * ympäristöluku, joten tests/aanilahteet.test.mjs tuo tämän tiedoston
 * sellaisenaan ja testaa lisenssirajauksen ja pisteytyksen ilman
 * verkkoa ja ilman avainta.
 */

import { inflateRawSync } from 'node:zlib';

/* ================================================================== *
 * LISENSSIT — yksi taulukko koko putkelle
 *
 * Tämä on se kohta, jossa kaupallinen käyttö ratkaistaan. Sääntö on
 * ollut alusta asti sama (tools/hae-freesound.mjs): vain CC0 ja CC BY.
 * Monilähteisyys tuo mukaan kaksi uutta tapausta:
 *
 *  - PUBLIC DOMAIN (Commonsin vanhat äänitteet, PD-old, PDM). Sama
 *    asia kuin CC0: ei ehtoja, ei nimeämispakkoa. Kelpaa.
 *  - CC BY-SA. Kaupallinen käyttö olisi sallittua, mutta share-alike
 *    tarttuu johdannaiseen, ja tässä putkessa ääntä LEIKATAAN ja sen
 *    taso NORMALISOIDAAN — lopputulos on johdannainen. Peliin ei oteta
 *    ehtoa, joka voi koskea peliä itseään. EI KELPAA.
 *  - NC (ei-kaupallinen) ja ND (ei johdannaisia): eivät kelpaa,
 *    kumpikin rikkoutuisi tässä putkessa heti.
 * ================================================================== */

/** Freesoundin lisenssiosoitteet luettavaan muotoon (entinen taulukko). */
export const LISENSSIT = {
  'http://creativecommons.org/publicdomain/zero/1.0/': 'CC0',
  'https://creativecommons.org/publicdomain/zero/1.0/': 'CC0',
  'http://creativecommons.org/licenses/by/4.0/': 'CC BY 4.0',
  'https://creativecommons.org/licenses/by/4.0/': 'CC BY 4.0',
  'http://creativecommons.org/licenses/by/3.0/': 'CC BY 3.0',
  'https://creativecommons.org/licenses/by/3.0/': 'CC BY 3.0',
};

/** Lisenssin luettava nimi. Tuntematon palautuu sellaisenaan. */
export const lisenssiNimi = (url) => LISENSSIT[url] ?? tunnistaLisenssi(url).nimi;

/** Vaatiiko lisenssi tekijän nimeämisen? CC0 ja PD eivät, CC BY vaatii. */
export const vaatiiAttribuution = (nimi) => !/^(CC0|Public domain)/i.test(String(nimi ?? ''));

/** Freesoundin filter-syntaksissa sallitut lisenssinimet. */
export const SALLITUT_LISENSSIT = ['Creative Commons 0', 'Attribution'];

/**
 * Lisenssitunnisteesta (osoite TAI lyhenne) kolme tietoa: luettava
 * nimi, kelpaako kaupalliseen käyttöön ja vaatiiko nimeämisen.
 *
 * Tuntematon tunniste EI kelpaa. Se on tahallinen: lähde voi lisätä
 * uuden lisenssin milloin tahansa, ja oletuksena "ei tiedetä" pitää
 * tarkoittaa "ei käytetä" eikä "käytetään ja toivotaan parasta".
 */
export function tunnistaLisenssi(tunniste) {
  const teksti = String(tunniste ?? '').trim();
  const m = teksti.toLowerCase();
  const ei = (nimi) => ({ nimi, kaupallinen: false, attribuutio: true });
  if (!m) return ei('tuntematon');

  if (/publicdomain\/zero/.test(m) || /^cc[ -]?0\b/.test(m) || /^creative commons 0\b/.test(m)) {
    return { nimi: 'CC0', kaupallinen: true, attribuutio: false };
  }
  if (/publicdomain\/mark/.test(m) || /^pdm\b/.test(m) || /^pd([ -]|$)/.test(m)
    || /^public domain\b/.test(m)) {
    return { nimi: 'Public domain', kaupallinen: true, attribuutio: false };
  }
  // Huom: "licenses/by/" ei osu osoitteeseen "licenses/by-sa/" eikä
  // "by-nc/" — vinoviiva heti by:n jälkeen on koko rajaus.
  const osoite = m.match(/creativecommons\.org\/licenses\/by\/(\d+(?:\.\d+)?)/);
  if (osoite) return { nimi: `CC BY ${osoite[1]}`, kaupallinen: true, attribuutio: true };
  const lyhenne = m.match(/^cc[ -]by[ -](\d+(?:\.\d+)?)$/);
  if (lyhenne) return { nimi: `CC BY ${lyhenne[1]}`, kaupallinen: true, attribuutio: true };
  if (/^(attribution|cc[ -]by)$/.test(m)) {
    return { nimi: 'CC BY', kaupallinen: true, attribuutio: true };
  }
  return ei(teksti);
}

/** Kelpaako lisenssi kaupalliseen peliin? Ainoa portti, jonka läpi ääni pääsee. */
export const kelpaakoLisenssi = (tunniste) => tunnistaLisenssi(tunniste).kaupallinen;

/**
 * Yhden tehosteen lisenssisuodatin Freesoundin filter-syntaksissa.
 * Järjestys on listasta: CC0 ensin, koska se on ensisijainen.
 */
export function lisenssisuodatin(tehoste) {
  const nimet = tehoste?.lisenssit?.length ? tehoste.lisenssit : SALLITUT_LISENSSIT;
  return `license:(${nimet.map((n) => `"${n}"`).join(' OR ')})`;
}

/** Koko Freesound-hakusuodatin: lisenssit, kestorajat ja poissuljetut tagit. */
export function hakusuodatin(tehoste) {
  const perus = `${lisenssisuodatin(tehoste)} duration:[${tehoste.kestoMin} TO ${tehoste.kestoMax}]`;
  const pois = (tehoste?.poisTagit ?? []).map((t) => `-tag:${t}`).join(' ');
  return pois ? `${perus} ${pois}` : perus;
}

/* ================================================================== *
 * LÄHDEREKISTERI
 *
 * `suosioAsteikko` on se lukema, jolla lähteen suosiomittari on
 * täydessä arvossaan. Se ON pakko olla lähdekohtainen: Freesoundissa
 * hyvä ääni on ladattu kymmeniätuhansia kertoja, Commonsissa hyvä ääni
 * on käytössä kahdellakymmenellä sivulla. Ilman lähdekohtaista
 * asteikkoa Freesound voittaisi jokaisen vertailun pelkällä
 * mittakaavallaan, ja monilähteisyys olisi teatteria.
 *
 * `suosioAsteikko: null` tarkoittaa, ettei lähteellä ole suosiolukua
 * lainkaan (Kenney) — silloin mittari saa neutraalin puolikkaan
 * pisteen eikä nollaa, jottei lähde putoa sen takia mitä se ei kerro.
 * ================================================================== */

export const AANILAHTEET = {
  freesound: {
    nimi: 'Freesound',
    avain: true,
    suosioAsteikko: 10000,
    suosioSelite: 'latauksia',
    osoite: 'https://freesound.org/',
  },
  commons: {
    nimi: 'Wikimedia Commons',
    avain: false,
    suosioAsteikko: 20,
    suosioSelite: 'käyttöjä wikeissä',
    osoite: 'https://commons.wikimedia.org/',
  },
  kenney: {
    nimi: 'Kenney',
    avain: false,
    suosioAsteikko: null,
    suosioSelite: 'ei suosiolukua (käsin koottu CC0-paketti)',
    osoite: 'https://kenney.nl/',
  },
};

/** Kaikki tunnetut lähteet listan oletusjärjestyksessä. */
export const KAIKKI_LAHTEET = Object.keys(AANILAHTEET);

/** Lähteet, jotka eivät tarvitse mitään avainta. */
export const AVAIMETTOMAT_LAHTEET = KAIKKI_LAHTEET.filter((l) => !AANILAHTEET[l].avain);

/**
 * Mitkä lähteet ajetaan tälle tehosteelle. Lista voi kertoa sen
 * tehosteella tai koko listalla; oletus on KAIKKI sallitut. Avaimeton
 * ajo pudottaa Freesoundin pois — se on parempi kuin kaatua, koska
 * kaksi muuta lähdettä toimivat ilman avaimia.
 */
export function tehosteenLahteet(tehoste, { sallitut = KAIKKI_LAHTEET, lista = null } = {}) {
  const toive = tehoste?.lahteet ?? lista?.lahteet ?? KAIKKI_LAHTEET;
  return toive.filter((l) => sallitut.includes(l) && KAIKKI_LAHTEET.includes(l));
}

/* ================================================================== *
 * EHDOKKAAN YHTEINEN MUOTO
 *
 * Jokainen lähde normalisoidaan tähän muotoon HETI haun jälkeen, ja
 * kaikki myöhempi — lisenssirajaus, pisteytys, lataus, manifestirivi —
 * tuntee vain tämän. Muuten jokainen uusi lähde tarkoittaisi uuden
 * haaran jokaisessa vaiheessa.
 *
 *   { lahde, id, nimi, tekija, lisenssi, lisenssiUrl, attribuutio,
 *     sivu, kesto, latausUrl, nippu, sanat, arvio, arvioita, suosio }
 *
 * `nippu` on vain Kenneyllä: tiedosto ei ole oma osoitteensa vaan
 * merkintä paketin sisällä.
 * ================================================================== */

/** Freesoundin hakutulos yhteiseen muotoon. */
export function normalisoiFreesound(osuma) {
  const lisenssi = lisenssiNimi(osuma?.license);
  return {
    lahde: 'freesound',
    id: String(osuma?.id ?? ''),
    nimi: osuma?.name ?? '',
    tekija: osuma?.username ?? '',
    lisenssi,
    lisenssiUrl: osuma?.license ?? '',
    attribuutio: vaatiiAttribuution(lisenssi),
    sivu: osuma?.url ?? '',
    kesto: Number.isFinite(Number(osuma?.duration)) ? Number(osuma.duration) : null,
    latausUrl: osuma?.previews?.['preview-hq-mp3'] ?? osuma?.previews?.['preview-lq-mp3'] ?? null,
    sanat: [osuma?.name ?? '', ...(osuma?.tags ?? [])].join(' '),
    arvio: Number(osuma?.avg_rating ?? 0),
    arvioita: Number(osuma?.num_ratings ?? 0),
    suosio: Math.max(0, Number(osuma?.num_downloads ?? 0)),
  };
}

/**
 * Commonsin hakutulos yhteiseen muotoon.
 *
 * Lisenssi luetaan ENSISIJAISESTI LicenseUrl-kentästä ja vasta sitten
 * lyhenteestä: lyhenne on vapaata tekstiä, jonka kuka tahansa on voinut
 * kirjoittaa kuvasivulle, osoite on koneellinen.
 */
export function normalisoiCommons(sivu) {
  const tiedot = sivu?.videoinfo?.[0] ?? sivu?.imageinfo?.[0] ?? {};
  const meta = tiedot.extmetadata ?? {};
  const arvo = (kentta) => String(meta[kentta]?.value ?? '').replace(/<[^>]*>/g, '').trim();
  const url = arvo('LicenseUrl');
  const lyhenne = arvo('LicenseShortName');
  const tunnistettu = tunnistaLisenssi(url || lyhenne);
  return {
    lahde: 'commons',
    id: String(sivu?.pageid ?? ''),
    nimi: String(sivu?.title ?? '').replace(/^File:/, ''),
    tekija: arvo('Artist') || tiedot.user || '',
    lisenssi: tunnistettu.nimi,
    lisenssiUrl: url,
    attribuutio: tunnistettu.attribuutio,
    sivu: tiedot.descriptionurl ?? '',
    kesto: Number.isFinite(Number(tiedot.duration)) && Number(tiedot.duration) > 0
      ? Number(tiedot.duration) : null,
    // Osoitteesta pois Commonsin oma seurantahäntä: se ei kuulu
    // manifestiin eikä lataukseen.
    latausUrl: tiedot.url ? String(tiedot.url).split('?')[0] : null,
    sanat: String(sivu?.title ?? '').replace(/^File:/, ''),
    arvio: 0,
    arvioita: 0,
    suosio: Array.isArray(sivu?.globalusage) ? sivu.globalusage.length : 0,
  };
}

/** Kenneyn paketin yksi äänitiedosto yhteiseen muotoon. */
export function normalisoiKenney(merkinta, paketti) {
  return {
    lahde: 'kenney',
    id: `${paketti.tunnus}/${merkinta.nimi}`,
    nimi: merkinta.nimi.split('/').pop(),
    tekija: 'Kenney',
    lisenssi: 'CC0',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    attribuutio: false,
    sivu: paketti.sivu,
    kesto: Number.isFinite(merkinta.kesto) ? merkinta.kesto : null,
    latausUrl: null,
    nippu: { paketti: paketti.tunnus, merkinta: merkinta.nimi },
    sanat: merkinta.nimi.split('/').pop(),
    taustasanat: paketti.aiheet.join(' '),
    arvio: 0,
    arvioita: 0,
    suosio: null,
  };
}

/* ================================================================== *
 * PISTEYTYS
 *
 * Neljä lukua ja neljä syytä. Kolme ensimmäistä ovat entiset
 * (tools/tehostelista.mjs pisteytaOsuma); neljäs on uusi ja se on
 * koko monilähteisyyden tärkein osa.
 *
 *  - ARVOSANA (0–3). Mitä kuuntelijat ovat äänestä mieltä. Alle kolmen
 *    arvion keskiarvo on kohinaa; silloin neutraali 3/5 eikä nolla,
 *    jottei arvioimaton mutta hyvä ääni putoa tuoreutensa takia. Sama
 *    neutraali koskee lähteitä, joissa arvioita ei ole lainkaan.
 *  - SUOSIO (0–2). Hitaampi mutta rehellisempi mittari: moni on ottanut
 *    äänen käyttöön oikeassa työssä. Logaritmi, koska ero 10:n ja 100:n
 *    välillä merkitsee, ero 10 000:n ja 20 000:n ei. Asteikko on
 *    lähdekohtainen (ks. AANILAHTEET).
 *  - KESTO (0–1). Suosii haarukan keskikohtaa: rajojen laidoilla oleva
 *    osuma on tyypillisesti katkaistu tai sisältää jotain muuta perään.
 *  - OSUVUUS (0–1) EI OLE NELJÄS YHTEENLASKETTAVA VAAN KERROIN.
 *    UUSI 11.9.2026. Puhuuko osuman nimi samasta asiasta kuin
 *    hakusana? "Cute Computer Squeak" sai hakusanalla "cartoon boing
 *    spring" täydet pisteet arvosanasta, latauksista JA kestosta —
 *    eikä yhtään osuvuudesta. Yhteenlaskettuna piste ei olisi
 *    riittänyt kumoamaan viittäkymmentätuhatta latausta, ja vika olisi
 *    jäänyt paikalleen. Kerroin sanoo sen, mikä on totta: suosio ja
 *    arvosana ratkaisevat OSUVIEN ÄÄNTEN KESKEN, eivät niiden ohi.
 *
 *    Kerroin on 0,3 + 0,7 × osuvuus eikä pelkkä osuvuus: Freesoundin
 *    tiedostonimi on usein vain "Door 03.wav", ja nollakerroin
 *    hylkäisi hyvän äänen sen takia, ettei sen nimi ole kuvaus.
 * ================================================================== */

/** Teksti vertailumuotoon: camelCase auki, välimerkit väleiksi. */
export function sanoiksi(teksti) {
  return String(teksti ?? '')
    .replace(/([a-zäöå])([A-ZÄÖÅ])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^a-zäöå0-9]+/g, ' ')
    .trim();
}

/**
 * Osuvuus 0–1: paras yksittäinen hakulause ratkaisee.
 *
 * Hakulauseita on kolme per tehoste, ja ne ovat vaihtoehtoja eivätkä
 * vaatimuksia ("pigeon wings flapping" TAI "bird wing flap take off").
 * Siksi maksimi eikä keskiarvo — keskiarvo rankaisisi osumaa siitä,
 * ettei se vastaa niitä kahta muuta.
 *
 * Alle kolmen kirjaimen sanat jätetään pois ("of", "a"), ja hakusana
 * osuu myös taivutettuun muotoon ("flap" ⊂ "flapping"). Ilman
 * hakusanoja palautetaan neutraali 0,5 — silloin mittaria ei ole, ja
 * nolla rankaisisi kaikkia yhtä paljon eli turhaan.
 */
export function osuvuus(ehdokas, tehoste) {
  const hakusanat = tehoste?.hakusanat ?? [];
  if (!hakusanat.length) return 0.5;
  const mittaa = (lahdeteksti) => {
    const teksti = ` ${sanoiksi(lahdeteksti)} `;
    let paras = 0;
    for (const lause of hakusanat) {
      const osat = sanoiksi(lause).split(' ').filter((s) => s.length >= 3);
      if (!osat.length) continue;
      paras = Math.max(paras, osat.filter((s) => teksti.includes(s)).length / osat.length);
    }
    return paras;
  };
  /*
   * VAIN EHDOKKAAN OMA NIMI JA TAGIT LASKETAAN — ei paketin aiheita.
   * Kenneyn ehdokas kantaa myös paketin aiheet (`taustasanat`), ja
   * kokeilu 11.9.2026 osoitti, miksi ne EIVÄT kelpaa osuvuudeksi edes
   * puolella painolla: sci-fi-sounds-paketin aiheissa on "whoosh",
   * joten "explosionCrunch_002" voitti viuhahduksen, ja rpg-audion
   * aiheissa on "door", joten "metalPot1" voitti paperin kahinan.
   * Paketin aihe kertoo paketista, ei tiedostosta.
   */
  return mittaa(ehdokas?.sanat || ehdokas?.nimi);
}

/**
 * OSUVUUDEN LATTIA. Alle kolmanneksen osuvuus tarkoittaa, että nimessä
 * on korkeintaan yksi hakusanan sanoista — ja se yksi on yleensä
 * sattuma: "doorClose_1" osui hakuun "dove wings flapping close"
 * sanalla "close". Sellainen ei ole ehdokas vaan kohina.
 */
export const OSUVUUS_LATTIA = 1 / 3;

/** Yhden ehdokkaan pisteet ja niiden osat. */
export function pisteytaEhdokas(ehdokas, tehoste) {
  const laji = AANILAHTEET[ehdokas?.lahde] ?? {};

  const arvioita = Number(ehdokas?.arvioita ?? 0);
  const arvio = arvioita >= 3 ? Number(ehdokas?.arvio ?? 0) : 3;
  const arviopisteet = 3 * (Math.max(0, Math.min(5, arvio)) / 5);

  let suosiopisteet = 1;
  if (laji.suosioAsteikko) {
    const n = Math.max(0, Number(ehdokas?.suosio ?? 0));
    suosiopisteet = 2 * Math.min(1, Math.log10(1 + n) / Math.log10(1 + laji.suosioAsteikko));
  }

  const keskikohta = (tehoste.kestoMin + tehoste.kestoMax) / 2;
  const puolikas = (tehoste.kestoMax - tehoste.kestoMin) / 2 || 1;
  const kesto = ehdokas?.kesto;
  const kestopisteet = Number.isFinite(kesto)
    ? Math.max(0, 1 - Math.abs(kesto - keskikohta) / puolikas)
    : 0.5;

  const osuma = osuvuus(ehdokas, tehoste);
  const kerroin = 0.3 + 0.7 * osuma;

  return {
    pisteet: Number(((arviopisteet + suosiopisteet + kestopisteet) * kerroin).toFixed(3)),
    osat: {
      arvio: Number(arviopisteet.toFixed(3)),
      suosio: Number(suosiopisteet.toFixed(3)),
      kesto: Number(kestopisteet.toFixed(3)),
      osuvuus: Number(osuma.toFixed(3)),
      kerroin: Number(kerroin.toFixed(3)),
    },
  };
}

/**
 * LISENSSIRAJAUS JA KARSINTA, kaikille lähteille sama.
 *
 * Freesoundilla rajaus tehdään jo palvelimen puolella filter-
 * parametrilla, ja se on oikein: jälkikäteen suodattava haku
 * palauttaisi kymmenen osumaa, joista kaksi kelpaa, ja näyttäisi siltä
 * ettei aineistoa ole. Commonsin ja Kenneyn kohdalla palvelin ei osaa
 * rajata, joten rajaus tehdään HETI haun jälkeen — ja Freesoundinkin
 * tulos ajetaan tämän läpi vielä kerran, koska kaksi rajausta samasta
 * säännöstä on halvempaa kuin yksi unohtunut.
 */
export function suodataEhdokkaat(ehdokkaat, tehoste, { vaadiLataus = true } = {}) {
  const pois = (tehoste?.poisTagit ?? []).map((t) => sanoiksi(t)).filter(Boolean);
  const min = Number(tehoste?.kestoMin ?? 0) * 0.8;
  const max = Number(tehoste?.kestoMax ?? 0) * 1.2;
  return (ehdokkaat ?? []).filter((e) => {
    if (!e) return false;
    if (!kelpaakoLisenssi(e.lisenssiUrl || e.lisenssi)) return false;
    if (vaadiLataus && !e.latausUrl && !e.nippu) return false;
    // Tuntematon kesto päästetään läpi: Kenneyn paketissa se luetaan
    // vasta tiedostosta, ja karsinta tekisi koko lähteestä tyhjän.
    if (Number.isFinite(e.kesto) && max > 0 && (e.kesto < min || e.kesto > max)) return false;
    if (pois.length) {
      const teksti = ` ${sanoiksi(e.sanat || e.nimi)} `;
      if (pois.some((p) => teksti.includes(p))) return false;
    }
    return true;
  });
}

/**
 * Kaikki kelpaavat ehdokkaat pisteineen, paras ensin.
 *
 * OSUVUUDEN LATTIA ON MUKAUTUVA: kohina karsitaan vain, jos jäljelle
 * jää edes yksi kunnollinen osuma. Kiinteä lattia tyhjentäisi listan
 * silloin, kun aineistoa oikeasti on vähän — ja tyhjä tulos on
 * huonompi kuin heikko ehdokas, jonka ihminen voi kuunnella ja hylätä.
 */
export function jarjestaEhdokkaat(ehdokkaat, tehoste, asetukset = {}) {
  const kaikki = suodataEhdokkaat(ehdokkaat, tehoste, asetukset)
    .map((e) => ({ ehdokas: e, ...pisteytaEhdokas(e, tehoste) }))
    .sort((a, b) => b.pisteet - a.pisteet);
  const osuvat = kaikki.filter((x) => x.osat.osuvuus >= OSUVUUS_LATTIA);
  return osuvat.length ? osuvat : kaikki;
}

/** Paras ehdokas tehosteelle, tai null jos kelvollisia ei ole. */
export function valitseParasEhdokas(ehdokkaat, tehoste, asetukset = {}) {
  return jarjestaEhdokkaat(ehdokkaat, tehoste, asetukset)[0] ?? null;
}

/* ================================================================== *
 * HAKU — lähde kerrallaan, yhteinen muoto ulos
 * ================================================================== */

/**
 * Wikimedian User-Agent-käytäntö vaatii tunnistettavan otsakkeen ja
 * yhteystiedon (https://foundation.wikimedia.org/wiki/Policy:User-Agent_policy).
 * Ilman sitä pyyntö voidaan estää, ja estot ovat pysyviä — siksi
 * osoite on kovakoodattu eikä valinnainen.
 */
export const WIKI_TUNNISTE = 'Matkakirja-aanihaku/1.0 (https://github.com/ravelius/Matkakirja)';

const odota = (ms) => new Promise((r) => { setTimeout(r, ms); });

/** Yksi hakupyyntö neljällä yrityksellä; palauttaa null jos ei onnistu. */
async function haeJson(osoite, { otsakkeet = {}, loki = () => {}, nimi = 'haku' } = {}) {
  for (let yritys = 0; yritys < 4; yritys += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const vastaus = await fetch(osoite, {
        headers: otsakkeet, signal: AbortSignal.timeout(20000),
      });
      if (vastaus.ok) return await vastaus.json();
      if (vastaus.status === 401 || vastaus.status === 403) {
        throw new Error(`${nimi} vastasi ${vastaus.status}: avain tai käyttöoikeus ei kelpaa.`);
      }
      if (vastaus.status < 500 && vastaus.status !== 429) {
        loki(`   ${nimi} vastasi ${vastaus.status}.`);
        return null;
      }
    } catch (virhe) {
      if (/40[13]/.test(virhe.message)) throw virhe;
      loki(`   ${nimi} ei onnistunut: ${virhe.message} (${yritys + 1}/4)`);
    }
    // eslint-disable-next-line no-await-in-loop
    await odota(3000 * (yritys + 1));
  }
  return null;
}

/** FREESOUND: yksi hakulause. Avain on parametri eikä ympäristöluku. */
export async function haeFreesound(sanat, tehoste, { avain, loki = () => {} }) {
  if (!avain) return [];
  const p = new URLSearchParams({
    query: sanat,
    page_size: '30',
    token: avain,
    fields: 'id,name,username,license,previews,duration,avg_rating,num_ratings,num_downloads,url,tags',
    filter: hakusuodatin(tehoste),
    sort: 'rating_desc',
  });
  const data = await haeJson(`https://freesound.org/apiv2/search/text/?${p}`, { loki, nimi: 'Freesound' });
  return (data?.results ?? []).map(normalisoiFreesound);
}

/**
 * COMMONSIN KYSELY: sanat OR-muodossa, ei AND-muodossa.
 *
 * CirrusSearch vaatii oletuksena KAIKKIEN sanojen esiintyvän, ja
 * Commonsin äänitiedostojen nimet ovat lyhyitä: "ocean waves shore
 * surf ambience" löytää NOLLA tiedostoa ja "ocean waves ambience"
 * myös. OR-muodossa sama haku löytää "Ocean Waves on a Tropical
 * Beach.ogg" ja "Sea waves.wav" — ja hakukoneen oma pisteytys nostaa
 * useaan sanaan osuvat kärkeen.
 *
 * Väljyys on turvallista, koska karsinta tehdään meillä: lisenssi,
 * kesto, poissuljetut sanat ja osuvuusmittari. Freesound ei tarvitse
 * tätä — se pisteyttää osumansa itse suhteellisesti.
 */
export function commonsinKysely(sanat) {
  const osat = String(sanat ?? '').trim().split(/\s+/).filter(Boolean);
  if (!osat.length) return '';
  return `filetype:audio ${osat.join(' OR ')}`;
}

/**
 * ONKO TIEDOSTO ÄÄNTÄMISNÄYTE? Commonsin suurin ansa.
 *
 * Commonsin ääniaineistosta valtaosa on Wikisanakirjan ja Lingua
 * Libren ÄÄNTÄMISNÄYTTEITÄ: ihminen sanoo yhden sanan mikrofoniin.
 * Ne on nimetty koneellisesti ("Nl-boing.ogg", "En-uk-air.ogg",
 * "LL-Q1860 (eng)-Flame, not lame-flutter in the dovecote.wav"), ja
 * juuri siksi ne osuvat hakusanaan TÄYDELLISESTI — hollantilainen
 * ääntämässä sanan "boing" voitti 11.9.2026 kuivassa ajossa
 * sarjakuvavieterin, koska nimessä luki tasan se, mitä haettiin.
 *
 * Rajaus on nimimuotoihin, koska ne ovat koneellisia ja siksi
 * luotettavia: kielikoodialku ("Nl-", "En-us-") ja Lingua Libren
 * "LL-Q<numero>". Tavallinen äänitys ei ole noin nimetty.
 */
export function onkoAantamisnayte(nimi) {
  const n = String(nimi ?? '').replace(/^File:/, '').trim();
  if (/^LL-Q\d+/i.test(n)) return true;
  if (/^[a-z]{2}(-[a-z]{2,3})?-[^/]+\.(ogg|oga|wav|flac|mp3|opus)$/i.test(n)) return true;
  return /\bpronunciation\b/i.test(n);
}

/**
 * WIKIMEDIA COMMONS: yksi hakulause. Ei avainta.
 *
 * `filetype:audio` on CirrusSearchin oma rajaus ja se on tehtävä
 * kyselyssä: nimiavaruus 6 sisältää kaikki tiedostot, ja ilman rajausta
 * tuloksissa on kuvia, joilla ei ole kestoa eikä ääntä.
 *
 * `videoinfo` (TimedMediaHandler) eikä `imageinfo`: vain se palauttaa
 * kentän `duration`, ja ilman kestoa ehdokasta ei voi pisteyttää.
 */
export async function haeCommons(sanat, tehoste, { loki = () => {} } = {}) {
  const kysely = commonsinKysely(sanat);
  if (!kysely) return [];
  const p = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '1',
    generator: 'search',
    gsrsearch: kysely,
    gsrnamespace: '6',
    gsrlimit: '30',
    prop: 'videoinfo|globalusage',
    viprop: 'url|extmetadata|mime|size|user',
    viextmetadatafilter: 'LicenseShortName|LicenseUrl|Artist|UsageTerms',
    gulimit: '100',
  });
  const data = await haeJson(`https://commons.wikimedia.org/w/api.php?${p}`, {
    otsakkeet: { 'User-Agent': WIKI_TUNNISTE, 'Api-User-Agent': WIKI_TUNNISTE },
    loki,
    nimi: 'Commons',
  });
  return Object.values(data?.query?.pages ?? {})
    .filter((sivu) => !onkoAantamisnayte(sivu?.title))
    .map(normalisoiCommons);
}

/* ------------------------------------------------------------------ *
 * KENNEY — CC0-paketit zip-nippuina
 *
 * Hakurajapintaa ei ole, eikä zipin osoitetta voi rakentaa käsin:
 * polussa on paketin oma tiiviste (…/interface-sounds/fa43c1dd4d-…/).
 * Siksi ketju on: pakettisivu kerran → sivulta zipin osoite → zip
 * kerran ajossa muistiin → keskushakemisto → äänitiedostot ehdokkaiksi.
 *
 * Yhteensä noin 11 Mt, ja se haetaan KERRAN prosessia kohti eikä
 * kerran tehostetta kohti — kaksitoista tehostetta tekisi muuten
 * 130 Mt latausta saman aineiston hakemiseksi uudestaan.
 * ================================================================== */

/**
 * Kenneyn äänipaketit. `aiheet` ei ole koriste: se menee ehdokkaan
 * hakusanoihin, jotta paketin aihe vaikuttaa osuvuuteen silloinkin kun
 * tiedostonimi on pelkkä "impactSoft_medium_000".
 */
export const KENNEY_PAKETIT = [
  { tunnus: 'interface-sounds', aiheet: ['interface', 'ui', 'click', 'button', 'switch', 'select', 'error', 'confirm'] },
  { tunnus: 'ui-audio', aiheet: ['ui', 'interface', 'click', 'tick', 'switch', 'rollover', 'toggle'] },
  { tunnus: 'impact-sounds', aiheet: ['impact', 'thud', 'thump', 'hit', 'drop', 'bump', 'plate', 'wood', 'metal', 'glass'] },
  { tunnus: 'rpg-audio', aiheet: ['door', 'book', 'paper', 'cloth', 'creak', 'footstep', 'coins', 'metal', 'chest', 'handle'] },
  { tunnus: 'digital-audio', aiheet: ['digital', 'beep', 'phone', 'toggle', 'confirm', 'zap', 'pluck', 'jingle'] },
  { tunnus: 'music-jingles', aiheet: ['jingle', 'fanfare', 'retro', 'win', 'achievement', 'music'] },
  { tunnus: 'casino-audio', aiheet: ['casino', 'chip', 'card', 'dice', 'coin', 'shuffle', 'deal'] },
  { tunnus: 'sci-fi-sounds', aiheet: ['sci fi', 'laser', 'computer', 'beep', 'whoosh', 'forcefield', 'engine'] },
].map((p) => ({ ...p, sivu: `https://kenney.nl/assets/${p.tunnus}` }));

/** Yhden ajon nippuvälimuisti: paketin tunnus → { ehdokkaat, zip }. */
const kenneyValimuisti = new Map();

/** Zipin keskushakemisto ilman riippuvuuksia (vain node:zlib). */
export function lueZipHakemisto(puskuri) {
  let loppu = -1;
  const raja = Math.max(0, puskuri.length - 70000);
  for (let i = puskuri.length - 22; i >= raja; i -= 1) {
    if (puskuri.readUInt32LE(i) === 0x06054b50) { loppu = i; break; }
  }
  if (loppu < 0) throw new Error('zip: keskushakemistoa ei löydy');
  const maara = puskuri.readUInt16LE(loppu + 10);
  let p = puskuri.readUInt32LE(loppu + 16);
  const merkinnat = [];
  for (let i = 0; i < maara; i += 1) {
    if (puskuri.readUInt32LE(p) !== 0x02014b50) throw new Error('zip: rikkinäinen hakemisto');
    const nimiPit = puskuri.readUInt16LE(p + 28);
    merkinnat.push({
      nimi: puskuri.toString('utf8', p + 46, p + 46 + nimiPit),
      menetelma: puskuri.readUInt16LE(p + 10),
      pakattu: puskuri.readUInt32LE(p + 20),
      koko: puskuri.readUInt32LE(p + 24),
      siirtyma: puskuri.readUInt32LE(p + 42),
    });
    p += 46 + nimiPit + puskuri.readUInt16LE(p + 30) + puskuri.readUInt16LE(p + 32);
  }
  return merkinnat;
}

/** Yksi merkintä ulos zipistä. */
export function puraZipMerkinta(puskuri, merkinta) {
  if (puskuri.readUInt32LE(merkinta.siirtyma) !== 0x04034b50) {
    throw new Error('zip: paikallinen otsake ei kelpaa');
  }
  const alku = merkinta.siirtyma + 30
    + puskuri.readUInt16LE(merkinta.siirtyma + 26)
    + puskuri.readUInt16LE(merkinta.siirtyma + 28);
  const data = puskuri.subarray(alku, alku + merkinta.pakattu);
  if (merkinta.menetelma === 0) return Buffer.from(data);
  if (merkinta.menetelma === 8) return inflateRawSync(data);
  throw new Error(`zip: tuntematon pakkausmenetelmä ${merkinta.menetelma}`);
}

/**
 * Ogg-tiedoston kesto ilman ffprobea.
 *
 * MIKSI OMA LUKIJA: Kenneyn ehdokkaiden kesto pitää tietää ENNEN
 * valintaa, mutta paketti puretaan muistiin eikä levylle, eikä
 * kuivassa ajossa (--kuiva) ole ffmpegiä lainkaan. Ogg kertoo keston
 * ilman dekoodausta: viimeisen sivun granule-luku jaettuna
 * näytetaajuudella, joka on ensimmäisen sivun otsakkeessa.
 */
export function oggKesto(puskuri) {
  const eka = puskuri.indexOf('OggS');
  if (eka < 0) return null;
  const hyoty = eka + 27 + puskuri[eka + 26];
  let taajuus = null;
  if (puskuri.toString('latin1', hyoty, hyoty + 7) === '\x01vorbis') {
    taajuus = puskuri.readUInt32LE(hyoty + 12);
  } else if (puskuri.toString('latin1', hyoty, hyoty + 8) === 'OpusHead') {
    taajuus = 48000; // Opusin granule-luku on aina 48 kHz:ssä.
  }
  if (!taajuus) return null;
  let viimeinen = -1;
  for (let i = puskuri.length - 27; i >= 0; i -= 1) {
    if (puskuri[i] === 0x4f && puskuri[i + 1] === 0x67
      && puskuri[i + 2] === 0x67 && puskuri[i + 3] === 0x53) { viimeinen = i; break; }
  }
  if (viimeinen < 0) return null;
  const granule = Number(puskuri.readBigUInt64LE(viimeinen + 6));
  return granule > 0 ? granule / taajuus : null;
}

/** WAV-tiedoston kesto otsakkeesta (Kenneyn vanhemmat paketit). */
export function wavKesto(puskuri) {
  if (puskuri.toString('latin1', 0, 4) !== 'RIFF') return null;
  let p = 12;
  let tavuaSekunnissa = 0;
  while (p + 8 <= puskuri.length) {
    const tunnus = puskuri.toString('latin1', p, p + 4);
    const koko = puskuri.readUInt32LE(p + 4);
    if (tunnus === 'fmt ') tavuaSekunnissa = puskuri.readUInt32LE(p + 16);
    if (tunnus === 'data' && tavuaSekunnissa > 0) return koko / tavuaSekunnissa;
    p += 8 + koko + (koko % 2);
  }
  return null;
}

/** Kesto tiedostonimen päätteen mukaan; null jos ei osata lukea. */
export const aanenKestoPuskurista = (nimi, puskuri) => (/\.wav$/i.test(nimi)
  ? wavKesto(puskuri) : oggKesto(puskuri));

/** Paketin zipin osoite pakettisivulta (polussa on tiiviste — ei arvattavissa). */
export async function kenneynZipOsoite(paketti, { loki = () => {} } = {}) {
  const vastaus = await fetch(paketti.sivu, {
    headers: { 'User-Agent': WIKI_TUNNISTE }, signal: AbortSignal.timeout(20000),
  });
  if (!vastaus.ok) {
    loki(`   Kenney: pakettisivu ${paketti.tunnus} vastasi ${vastaus.status}.`);
    return null;
  }
  const html = await vastaus.text();
  const osuma = html.match(/https:\/\/kenney\.nl\/media\/pages\/assets\/[^"'\s]+\.zip/);
  if (!osuma) loki(`   Kenney: paketin ${paketti.tunnus} sivulta ei löytynyt zipiä.`);
  return osuma?.[0] ?? null;
}

/** Paketin sisältö ehdokkaiksi — kerran ajossa, sitten välimuistista. */
export async function haeKenneynPaketti(paketti, { loki = () => {} } = {}) {
  if (kenneyValimuisti.has(paketti.tunnus)) return kenneyValimuisti.get(paketti.tunnus);
  const tyhja = { ehdokkaat: [], zip: null };
  kenneyValimuisti.set(paketti.tunnus, tyhja);
  const osoite = await kenneynZipOsoite(paketti, { loki });
  if (!osoite) return tyhja;
  const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(120000) });
  if (!vastaus.ok) {
    loki(`   Kenney: ${paketti.tunnus} lataus ${vastaus.status}.`);
    return tyhja;
  }
  const zip = Buffer.from(await vastaus.arrayBuffer());
  if (zip.length > 60 * 1024 * 1024) {
    loki(`   Kenney: ${paketti.tunnus} on liian iso (${zip.length} tavua) — ohitetaan.`);
    return tyhja;
  }
  const ehdokkaat = [];
  for (const merkinta of lueZipHakemisto(zip)) {
    // Preview.ogg on paketin esittelyraita eikä tehoste: se on
    // kymmeniä sekunteja pitkä läpileikkaus koko paketista.
    if (!/\.(ogg|wav|mp3)$/i.test(merkinta.nimi)) continue;
    if (/(^|\/)preview\./i.test(merkinta.nimi)) continue;
    let kesto = null;
    try {
      kesto = aanenKestoPuskurista(merkinta.nimi, puraZipMerkinta(zip, merkinta));
    } catch (virhe) {
      loki(`   Kenney: ${merkinta.nimi} ei auennut (${virhe.message}).`);
      continue;
    }
    ehdokkaat.push(normalisoiKenney({ ...merkinta, kesto }, paketti));
  }
  const tulos = { ehdokkaat, zip };
  kenneyValimuisti.set(paketti.tunnus, tulos);
  loki(`   Kenney: ${paketti.tunnus} — ${ehdokkaat.length} ääntä.`);
  return tulos;
}

/** KENNEY: kaikki paketit ehdokkaiksi (haku tehdään osuvuudella, ei palvelimella). */
export async function haeKenney(tehoste, { loki = () => {}, paketit = KENNEY_PAKETIT } = {}) {
  const kaikki = [];
  for (const paketti of paketit) {
    // eslint-disable-next-line no-await-in-loop
    const { ehdokkaat } = await haeKenneynPaketti(paketti, { loki });
    kaikki.push(...ehdokkaat);
  }
  /*
   * Kenneyn paketit ovat yhteensä satoja tiedostoja, ja valtaosa ei
   * liity haettuun ääneen mitenkään. Karsinta osuvuudella EI ole sama
   * asia kuin pisteytys: tässä pudotetaan pois ne, joiden nimi ei
   * kerro haetusta asiasta — muuten pelkkä kestoon osuva "footstep07"
   * voisi voittaa siipien räpytyksen.
   */
  return kaikki.filter((e) => osuvuus(e, tehoste) >= OSUVUUS_LATTIA);
}

/**
 * KAIKKI SALLITUT LÄHTEET yhdelle tehosteelle, kaksoiskappaleet pois.
 *
 * Yhden lähteen kaatuminen ei kaada hakua: Commonsin katkos ei saa
 * viedä Freesoundin osumia mukanaan. Poikkeus on avainvirhe (401),
 * joka kerrotaan heti — se on asetusvirhe eikä katkos.
 */
export async function haeEhdokkaat(tehoste, {
  lahteet = KAIKKI_LAHTEET, avain = '', loki = () => {},
} = {}) {
  const nahdyt = new Map();
  const lisaa = (ehdokkaat) => {
    for (const e of ehdokkaat) {
      const avainrivi = `${e.lahde}:${e.id}`;
      if (!nahdyt.has(avainrivi)) nahdyt.set(avainrivi, e);
    }
  };
  for (const lahde of lahteet) {
    try {
      if (lahde === 'freesound') {
        for (const sanat of tehoste.hakusanat ?? []) {
          // eslint-disable-next-line no-await-in-loop
          lisaa(await haeFreesound(sanat, tehoste, { avain, loki }));
        }
      } else if (lahde === 'commons') {
        for (const sanat of tehoste.hakusanat ?? []) {
          // eslint-disable-next-line no-await-in-loop
          lisaa(await haeCommons(sanat, tehoste, { loki }));
        }
      } else if (lahde === 'kenney') {
        // eslint-disable-next-line no-await-in-loop
        lisaa(await haeKenney(tehoste, { loki }));
      }
    } catch (virhe) {
      if (/40[13]/.test(virhe.message)) throw virhe;
      loki(`   lähde ${lahde} epäonnistui: ${virhe.message}`);
    }
  }
  return [...nahdyt.values()];
}

/**
 * Ehdokkaan tiedosto levylle. Freesound ja Commons ovat osoitteita,
 * Kenney on merkintä paketissa, joka on jo muistissa.
 */
export async function noudaEhdokas(ehdokas, kohde, { kirjoita }) {
  if (ehdokas.nippu) {
    const paketti = KENNEY_PAKETIT.find((p) => p.tunnus === ehdokas.nippu.paketti);
    const { zip } = await haeKenneynPaketti(paketti);
    if (!zip) throw new Error(`Kenneyn pakettia ${ehdokas.nippu.paketti} ei saatu`);
    const merkinta = lueZipHakemisto(zip).find((m) => m.nimi === ehdokas.nippu.merkinta);
    if (!merkinta) throw new Error(`merkintää ${ehdokas.nippu.merkinta} ei ole paketissa`);
    const data = puraZipMerkinta(zip, merkinta);
    kirjoita(kohde, data);
    return data.length;
  }
  if (!ehdokas.latausUrl) throw new Error(`ehdokkaalla ${ehdokas.id} ei ole latausosoitetta`);
  const otsakkeet = ehdokas.lahde === 'commons' ? { 'User-Agent': WIKI_TUNNISTE } : {};
  const vastaus = await fetch(ehdokas.latausUrl, {
    headers: otsakkeet, signal: AbortSignal.timeout(120000),
  });
  if (!vastaus.ok) throw new Error(`lataus ${vastaus.status}: ${ehdokas.latausUrl}`);
  const data = Buffer.from(await vastaus.arrayBuffer());
  kirjoita(kohde, data);
  return data.length;
}

/** Ladatun tiedoston pääte: ffmpeg lukee kaikki, mutta nimi kertoo mitä tuli. */
export function ehdokkaanPaate(ehdokas) {
  const lahde = ehdokas?.nippu?.merkinta ?? ehdokas?.latausUrl ?? '';
  const osuma = String(lahde).split('?')[0].match(/\.(ogg|oga|wav|flac|mp3|opus|m4a)$/i);
  return osuma ? osuma[1].toLowerCase() : 'mp3';
}
