/**
 * APURAHAN ARVIOIJAN ESITTELYKORTTI (omistaja 30.9.2026, poikkeus web-taukoon).
 *
 * Aloitusportin nappi "Apurahahakemus – katso tämä ensin" avaa kortin
 * (otsikko, kursiivinen alaotsikko, neljä kappaletta, viiden kuvan rivi)
 * ja portin alareunassa on pysyvä huomautus iOS-sovelluksesta. Sisältö
 * on YHDESSÄ tiedostossa, assets/apuraha/esittely.json, jonka myös
 * natiivi lukee (Apuraha.cs: https://matkakirja.app/assets/apuraha/esittely.json):
 * Päätoimittaja päivittää tekstin yhteen paikkaan.
 *
 * Tässä vain lataus ja tarkistus; piirto on ui.js:n naytaApuraha().
 */

export const APURAHA_OSOITE = 'assets/apuraha/esittely.json';

let lataus = null;

/**
 * Tarkistaa ja siistii esittelyn. Palauttaa null, jos pakollinen kenttä
 * puuttuu: silloin nappia ja huomautusta ei näytetä lainkaan (ei tyhjää
 * korttia).
 */
export function tarkistaApuraha(d) {
  if (!d || typeof d !== 'object') return null;
  if (typeof d.nappi !== 'string' || !d.nappi.trim()) return null;
  if (typeof d.otsikko !== 'string' || !Array.isArray(d.kappaleet)) return null;
  // Selainversio: webTeksti korvaa tekstin (kappale tai listarivi {teksti, webTeksti}).
  const web = (x) => (x && typeof x === 'object' ? (x.webTeksti ?? x.teksti) : x);
  const kaikkiKuvat = (Array.isArray(d.kuvat) ? d.kuvat : []).filter((k) => k && typeof k.tiedosto === 'string');
  // Kuva kappaleensa viereen (omistaja 7.10.2026, versio 7): "kappale" = 0-pohjainen indeksi alkuperäiseen listaan.
  const kappaleenKuvat = (i) => kaikkiKuvat.filter((k) => k.kappale === i);
  const kappaleet = d.kappaleet
    .map((k, i) => (k && typeof k === 'object' ? { ...k, kuvat: kappaleenKuvat(i) } : k))
    .filter((k) => k && (k.teksti || k.lista?.length || k.otsikko || k.nappi))
    .map((k) => ({
      ...k,
      teksti: k.webTeksti ?? k.teksti,
      // Korostus (omistaja 1.10.2026): kappale lihavoituna samassa koossa.
      korostus: k.korostus === true,
      lista: Array.isArray(k.lista) ? k.lista.map(web).filter((r) => typeof r === 'string') : k.lista,
    }));
  // Kuvat ilman kelvollista kappaletta kortin loppuun kuvariviksi kuten ennen.
  const kuvat = kaikkiKuvat.filter((k) => !kappaleet.some((x) => x.kuvat.includes(k)));
  return {
    nappi: d.nappi.trim(),
    otsikko: d.otsikko,
    alaotsikko: typeof d.alaotsikko === 'string' ? d.alaotsikko : '',
    kappaleet,
    kuvat,
    webHuomautus: typeof d.webHuomautus === 'string' ? d.webHuomautus : '',
    // "Avaa valmiit linssit" (omistaja 7.10.2026 klo 15.0x): oma kenttä, jota vanhat TF-appit eivät lue.
    valmiitLinssit: valmiitLinssit(d.valmiitLinssit),
    // Versio 9 (omistaja 13.11.2026 22.12–22.25): uusi asettelu, kun hetket on; muuten kentät puuttuvat (null)
    // ja kortti piirretään vanhasta kappaleet + kuvat -muodosta ennallaan.
    ...esittely9(d, web),
  };
}

const RAJAUS = /^\d{1,3}% \d{1,3}%$/;

/**
 * Kuva { tiedosto, rajaus, teksti, muoto? } tai null (ei kelvollista tiedostoa). Rajaus vain muodossa "x% y%".
 * muoto "4:3" = hetken ensimmäinen kuva näytetään kokonaan 4:3-ruudussa (KK 14.11. 22.14); muuten 16:9. Kenttä vain, kun se on 4:3.
 */
function kuva9(k) {
  if (!k || typeof k !== 'object' || typeof k.tiedosto !== 'string' || !k.tiedosto.trim()) return null;
  return {
    tiedosto: k.tiedosto.trim(),
    rajaus: typeof k.rajaus === 'string' && RAJAUS.test(k.rajaus) ? k.rajaus : null,
    teksti: typeof k.teksti === 'string' ? k.teksti : '',
    ...(k.muoto === '4:3' ? { muoto: '4:3' } : {}),
  };
}

/**
 * Version 9 kentät siistittyinä: avaus, hetket, ajatusOtsikko, ajatus, tekeillaTeksti, missa, loppu. Ilman
 * hetket-taulukkoa kaikki null, jolloin ui.js käyttää vanhaa asettelua. Selaimessa webTeksti korvaa tekstin.
 */
function esittely9(d, web) {
  if (!Array.isArray(d.hetket)) {
    return { avaus: null, hetket: null, ajatusOtsikko: '', ajatus: '', tekeillaTeksti: '', missa: null, loppu: '' };
  }
  const teksti = (x) => {
    const t = web(x);
    return typeof t === 'string' ? t : '';
  };
  const avaus = d.avaus && typeof d.avaus === 'object'
    ? {
      kuva: kuva9(d.avaus.kuva),
      kappaleet: (Array.isArray(d.avaus.kappaleet) ? d.avaus.kappaleet : []).map(teksti).filter(Boolean),
    }
    : { kuva: null, kappaleet: [] };
  const hetket = d.hetket
    .filter((h) => h && typeof h === 'object' && (typeof h.otsikko === 'string' || typeof h.teksti === 'string'))
    .map((h) => ({
      otsikko: typeof h.otsikko === 'string' ? h.otsikko : '',
      teksti: teksti(h),
      tekeilla: h.tekeilla === true,
      // 0–3 kuvaa: ensimmäinen kortin levyisenä, loput rivinä sen alla.
      kuvat: (Array.isArray(h.kuvat) ? h.kuvat : []).map(kuva9).filter(Boolean).slice(0, 3),
      video: typeof h.video === 'string' && h.video.trim() ? h.video.trim() : null,
    }))
    .filter((h) => h.otsikko || h.teksti);
  const osio = (o, lista = false) => {
    if (!o || typeof o !== 'object') return null;
    const tulos = { otsikko: typeof o.otsikko === 'string' ? o.otsikko : '', teksti: teksti(o) };
    if (lista) tulos.lista = (Array.isArray(o.lista) ? o.lista : []).map(teksti).filter(Boolean);
    return tulos.otsikko || tulos.teksti || tulos.lista?.length ? tulos : null;
  };
  const m = d.missa && typeof d.missa === 'object' ? d.missa : {};
  const nyt = osio(m.nyt);
  const seuraavaksi = osio(m.seuraavaksi, true);
  return {
    avaus,
    hetket,
    // Väliotsikko ajatukselle datasta (puuttuessa ei väliotsikkoa); tekeillä-merkin sana (oletus "tekeillä").
    ajatusOtsikko: typeof d.ajatusOtsikko === 'string' ? d.ajatusOtsikko.trim() : '',
    ajatus: teksti(d.ajatus),
    tekeillaTeksti: typeof d.tekeillaTeksti === 'string' && d.tekeillaTeksti.trim() ? d.tekeillaTeksti.trim() : 'tekeillä',
    missa: nyt || seuraavaksi ? { nyt, seuraavaksi } : null,
    loppu: teksti(d.loppu),
  };
}

/*
 * SUORA OSOITE (omistaja 13.11.2026, versio 9): matkakirja.app/#esittely avaa kortin heti, kun esittely on
 * ladattu. Napista avattaessa osoitteeseen tulee #esittely (linkin voi kopioida), sulkiessa se poistuu.
 * Muualla pelissä ei käytetä hashia (pelikatalogi- ja linssikatalogisivut ovat omia sivujaan).
 */
export const ESITTELY_HASH = '#esittely';

/** Onko osoitteen hash esittelyn suora osoite (#esittely, kirjainkoosta riippumatta)? */
export function onEsittelyHash(hash) {
  return typeof hash === 'string' && hash.toLowerCase() === ESITTELY_HASH;
}

/**
 * Uusi osoite history.replaceStatelle kortin avautuessa (auki = true) tai sulkeutuessa, tai null, kun osoitetta ei
 * tarvitse muuttaa (jo oikein, tai sulkiessa hash on jokin muu kuin #esittely: sitä ei kosketa).
 */
export function esittelyOsoite({ pathname = '/', search = '', hash = '' } = {}, auki) {
  const onJo = onEsittelyHash(hash);
  if (auki) return onJo ? null : `${pathname}${search}${ESITTELY_HASH}`;
  return onJo ? `${pathname}${search}` : null;
}

/** valmiitLinssit { teksti, nappi, valmis, linssit[] } tai null (puuttuva nappi tai tyhjä lista). */
function valmiitLinssit(v) {
  if (!v || typeof v.nappi !== 'string' || !Array.isArray(v.linssit)) return null;
  const linssit = v.linssit.filter((t) => typeof t === 'string');
  if (!linssit.length) return null;
  return { teksti: typeof v.teksti === 'string' ? v.teksti : '', nappi: v.nappi, valmis: typeof v.valmis === 'string' ? v.valmis : v.nappi, linssit };
}

/** Lataa esittelyn kerran; epäonnistuessa null (portti näkyy ilman nappia). */
export function lataaApuraha(hae = globalThis.fetch) {
  if (!lataus) {
    lataus = Promise.resolve()
      .then(() => hae(APURAHA_OSOITE))
      .then((v) => (v.ok ? v.json() : null))
      .then(tarkistaApuraha)
      .catch(() => null);
  }
  return lataus;
}

/*
 * ESITTELYLINSSIT (omistaja 30.9.2026): kortin nappi avaa kaikki toimivat
 * linssit ilman pisteitä — sama joukko kuin kehittäjätilassa, mutta muu
 * kehittäjätila jää pois. Oma avain, jotta kehittäjätilan kytkin ei avaa
 * tai sulje tätä. js/linssit/omistus.js lukee tämän (linssit ladataan
 * laiskasti, joten avain asuu tässä kevyessä moduulissa).
 */
const ESITTELYLINSSIT_AVAIN = 'matkakirja-esittelylinssit';

export function esittelylinssitAuki() {
  try {
    const arvo = globalThis.localStorage?.getItem(ESITTELYLINSSIT_AVAIN);
    return arvo === '1' || Boolean(arvo?.startsWith('['));
  } catch {
    return false; // yksityinen selaus
  }
}

/**
 * Avaa esittelylinssit. lista (esittely.json nappi.linssit, omistaja 7.10.2026 klo 15.0x "valmiit linssit"): vain
 * nämä tunnukset; ilman listaa vanha tapa (kaikki rekisterin toimivat linssit).
 */
export function avaaEsittelylinssit(lista = null) {
  const arvo = Array.isArray(lista) && lista.length ? JSON.stringify(lista.filter((t) => typeof t === 'string')) : '1';
  try { globalThis.localStorage?.setItem(ESITTELYLINSSIT_AVAIN, arvo); } catch { /* yksityinen selaus */ }
}

/** Avattujen esittelylinssien lista tai null (ei listaa: kaikki toimivat). */
export function esittelylinssiLista() {
  try {
    const arvo = globalThis.localStorage?.getItem(ESITTELYLINSSIT_AVAIN);
    if (!arvo || arvo === '1') return null;
    const l = JSON.parse(arvo);
    return Array.isArray(l) ? l : null;
  } catch {
    return null;
  }
}

/** Testeille: seuraava lataaApuraha hakee uudelleen. */
export function nollaaApuraha() { lataus = null; }
