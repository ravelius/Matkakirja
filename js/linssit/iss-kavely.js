/*
 * AVARUUSKÄVELY — YDIN (omistaja 29.9.2026 "Kyllä, radion jälkeen"; Päätoimittaja 2.10.2026: webiin pariteetin vuoksi,
 * natiivi on malli). Käännetty natiivin Linssit/Ydin/Iss/Avaruuskavely.cs:stä riviltä riville (luvut samat,
 * tests/iss-kavely.test.mjs lukitsee ne).
 *
 * Lyhyt käsikirjoitettu hetki ISS:n ulkopuolella: Ilmalukko (napautus avaa luukun) → Ulos (4 s kaiteelle) → Köysi
 * (napautus kiinnittää) → Auringonnousu (simukello kelaa ISS:n seuraavaan auringonnousuun) → Pulu (repliikki radiossa,
 * aurinko nousee 24×) → Kuva (napautus) → Vertailu (oma kuva + astronautin NASA-kuva lähimmästä kohteesta) → Takaisin
 * (2 s sisään Cupolaan). Ei vapaata liikkumista.
 *
 * Puhdas moduuli: tilakone, auringonnousun ja päivänvalon haku, valon kaavat ja vertailukohde. Näkymä (kerrokset,
 * äänet, vertailukortti) on tiedostossa iss-kavely-nakyma.js ja kytkentä kyytiin iss-kyyti-nakyma.js:ssä.
 */
import { auringonAlihajapiste, jdHetkesta, HAVAINNOLLINEN_KIERROS_S } from './iss-rata.js';
import { ULOS_S, SISAAN_S, suunta } from './iss-kyyti.js';

const DEG = Math.PI / 180;

export const VAIHE = Object.freeze({
  ei: 'ei', ilmalukko: 'ilmalukko', ulos: 'ulos', koysi: 'koysi', auringonnousu: 'auringonnousu',
  pulu: 'pulu', kuva: 'kuva', vertailu: 'vertailu', takaisin: 'takaisin',
});
/** Vaiheiden järjestys (natiivin enum-vertailut: ulkona = ulos … vertailu, käsine kiinni koysi:n jälkeen). */
export const VAIHEJARJESTYS = Object.freeze(['ei', 'ilmalukko', 'ulos', 'koysi', 'auringonnousu', 'pulu', 'kuva', 'vertailu', 'takaisin']);
export const jarjestys = (v) => VAIHEJARJESTYS.indexOf(v);

/** Automaattiset vaiheet (s): ulos kaiteelle (= kyydin ULOS_S), Pulun repliikki ja paluu sisään (= SISAAN_S). */
export const ULOS_VAIHE_S = ULOS_S;
export const PULU_S = 9.5;
export const TAKAISIN_S = SISAAN_S;
/** Kelaus päättyy ENNEN_S ennen auringonnousua; vaihe jatkuu nousun jälkeen JALKEEN_S (simuloitua s). */
export const ENNEN_S = 4;
export const JALKEEN_S = 3;
/** Jos nousua ei löydy, vaihe päättyy tämän jälkeen (s). */
export const NOUSU_VARA_S = 2;
/** Auringonnousun haku: enintään kaksi kierrosta eteenpäin, askel ja tarkkuus (s). */
export const NOUSU_HAKU_S = 2 * HAVAINNOLLINEN_KIERROS_S;
export const NOUSU_ASKEL_S = 10;
export const NOUSU_TARKKUUS_S = 0.5;
/** Aurinko nousee Pulun vaiheessa nopeutettuna (9,5 s × 24 ≈ 4 min); kuvasta eteenpäin 1×. */
export const NOUSU_KERROIN = 24;
/** Kelauksen enimmäiskesto (s): natiivin ylilennon kelaus ≤ 3,6 s (Simu.KelaaHetkeen). */
export const KELAUS_ENINTAAN_S = 3.6;
/** Etualan reunavalo: pohja ja kaista (≈ 45 s ISS:n nousun jälkeen). */
export const REUNA_POHJA = 0.2;
export const REUNA_KAISTA = 0.05;
/** Cupola päivänvaloon: yöpuoli < 0, päivä ≥ 0,25 (≈ 14,5°), haku 20 s:n askelin 3 h. */
export const YO_RAJA = 0;
export const PAIVA_RAJA = 0.25;
export const PAIVA_ASKEL_S = 20;
export const PAIVA_HAKU_S = 3 * 3600;

/** Pulun repliikit (Päätoimittaja 29.9., sanatarkasti; äänitagit ElevenLabsille). */
export const REPLIIKIT = Object.freeze({
  luukku: '[excited] Luukku on auki! [warmly] Kiinnitä köysi kaiteeseen ennen kuin päästät irti – täällä ei ole alas, on vain ympäri.',
  nousu: '[excited] Katso horisonttia! [warmly] Kierrämme maapallon puolessatoista tunnissa, joten aurinko nousee meille noin kuusitoista kertaa vuorokaudessa.',
  kuva: '[amused] Hymyile, kamera on valmis! [warmly] Ota kuva – verrataan sitä astronautin oikeaan kuvaan samalta paikalta.',
});

/** Dokumentin tapahtuma kävelyn alkaessa ja päättyessä (detail.vaihe): Pulun taulu sulkeutuu (natiivi Alkoi). */
export const KAVELY_TAPAHTUMA = 'matkakirja-iss-kavely';

/** Lyhyt ohjeteksti vaiheen napautukselle (null = ei napautettavaa). */
export const OHJEET = Object.freeze({
  ilmalukko: 'Napauta: avaa luukku',
  koysi: 'Napauta: kiinnitä köysi',
  kuva: 'Napauta: ota kuva',
  vertailu: 'Napauta: takaisin sisään',
});

/** Äänitagit pois ("[excited] Luukku…" → "Luukku…"), välilyönnit siistiksi. */
export function ilmanTageja(puhe) {
  if (!puhe) return puhe ?? '';
  return puhe.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Vaiheen repliikin tunnus (luukku ulos lähtiessä ja köydellä, nousu Pulun vaiheessa, kuva kuvausvaiheessa) tai null. */
export function repliikki(vaihe) {
  if (vaihe === VAIHE.ulos || vaihe === VAIHE.koysi) return 'luukku';
  if (vaihe === VAIHE.pulu) return 'nousu';
  if (vaihe === VAIHE.kuva) return 'kuva';
  return null;
}

/**
 * Tilakone. `muuttui(vaihe)` kutsutaan joka siirtymässä (kyydin, kellon ja näkymän kytkentä). Ajat sekunteina samalla
 * kellolla (`nyt`), simuloitu hetki millisekunteina (`simuMs`).
 */
export function luoKavely({ muuttui = null } = {}) {
  let vaihe = VAIHE.ei;
  let vaiheAlkoi = 0;
  let nousuMs = null;

  const siirry = (uusi, nyt) => {
    vaihe = uusi;
    vaiheAlkoi = nyt;
    if (uusi !== VAIHE.auringonnousu) nousuMs = null;
    muuttui?.(uusi);
  };

  return {
    get vaihe() { return vaihe; },
    get kaynnissa() { return vaihe !== VAIHE.ei; },
    get vaiheAlkoi() { return vaiheAlkoi; },
    get nousuMs() { return nousuMs; },
    get ohje() { return OHJEET[vaihe] ?? null; },
    get repliikki() { return repliikki(vaihe); },
    aloita(nyt) { if (vaihe === VAIHE.ei) siirry(VAIHE.ilmalukko, nyt); },
    /** Pelaajan napautus: seuraavaan vaiheeseen, paitsi siirtymien ja kelauksen aikana. */
    napauta(nyt) {
      const seuraava = {
        ilmalukko: VAIHE.ulos, koysi: VAIHE.auringonnousu, pulu: VAIHE.kuva, kuva: VAIHE.vertailu, vertailu: VAIHE.takaisin,
      }[vaihe];
      if (seuraava) siirry(seuraava, nyt);
    },
    /** Keskeytys (linssi suljetaan tai ✕): suoraan pois ilman paluuvaihetta. */
    lopeta(nyt) { if (vaihe !== VAIHE.ei) siirry(VAIHE.ei, nyt); },
    /** Auringonnousu-vaiheen kohde (kytkentä hakee seuraavaNousu:lla vaiheen alkaessa). */
    asetaNousu(ms) { nousuMs = ms ?? null; },
    /** Automaattiset siirtymät. */
    paivita(nyt, simuMs) {
      const t = nyt - vaiheAlkoi;
      if (vaihe === VAIHE.ulos && t >= ULOS_VAIHE_S) siirry(VAIHE.koysi, nyt);
      else if (vaihe === VAIHE.auringonnousu) {
        if (nousuMs !== null ? simuMs >= nousuMs + JALKEEN_S * 1000 : t >= NOUSU_VARA_S) siirry(VAIHE.pulu, nyt);
      } else if (vaihe === VAIHE.pulu && t >= PULU_S) siirry(VAIHE.kuva, nyt);
      else if (vaihe === VAIHE.takaisin && t >= TAKAISIN_S) siirry(VAIHE.ei, nyt);
    },
  };
}

/* ═══════════ AURINKO ISS:LTÄ ═══════════════════════════════════════ */

function alapisteenSini(ms, p) {
  const a = auringonAlihajapiste(jdHetkesta(ms));
  return Math.sin(p.lat * DEG) * Math.sin(a.lat * DEG)
    + Math.cos(p.lat * DEG) * Math.cos(a.lat * DEG) * Math.cos((p.lon - a.lon) * DEG);
}

/**
 * Auringon korkeuskulman sini ISS:n alapisteessä miinus näkyvän horisontin raja: > 0 = ISS auringossa (horisontti on
 * korkeudelta h kulman acos(R / (R + h)) alempana; sama kuin Cupolan valo).
 */
export function valoisuus(ms, alapiste, korkeusKm) {
  const q = 6371 / (6371 + Math.max(0, korkeusKm));
  return alapisteenSini(ms, alapiste) + Math.sqrt(Math.max(0, 1 - q * q));
}

/** Auringon korkeuskulman sini ISS:n alapisteessä (maa ISS:n alla: > 0 = päivä). */
export const maanAurinko = alapisteenSini;

/** ISS auringossa 0…1 pehmeällä reunalla (etualan valokerrokset ja metallin sävy). */
export function aurinkoisuus(ms, issNyt) {
  const p = issNyt.paikka(ms);
  const v = Math.max(0, Math.min(1, valoisuus(ms, p, p.korkeusKm) / 0.02 + 0.5));
  return v * v * (3 - 2 * v);
}

/** Etualan reunavalo: voimakas auringonnousun matalassa valossa, heikko muulloin. */
export function reunaValo(ms, issNyt) {
  const p = issNyt.paikka(ms);
  const v = valoisuus(ms, p, p.korkeusKm);
  return aurinkoisuus(ms, issNyt) * (REUNA_POHJA + (1 - REUNA_POHJA) * Math.max(0, Math.min(1, 1 - v / REUNA_KAISTA)));
}

/** Auringon suunta ISS:n alapisteestä (asteina pohjoisesta, isoympyrä alihajapisteeseen): kävelyn katse. */
export function auringonSuunta(ms, issNyt) {
  const p = issNyt.paikka(ms);
  const a = auringonAlihajapiste(jdHetkesta(ms));
  return suunta(p.lat, p.lon, a.lat, a.lon);
}

/**
 * ISS:n SEURAAVA auringonnousu hetken `alkuMs` jälkeen (varjosta valoon): 10 s:n askelin enintään kaksi kierrosta,
 * sitten puolitus 0,5 s:iin. null = ei nousua.
 */
export function seuraavaNousu(issNyt, alkuMs, hakuS = NOUSU_HAKU_S) {
  const V = (ms) => { const p = issNyt.paikka(ms); return valoisuus(ms, p, p.korkeusKm); };
  let edellinen = V(alkuMs);
  for (let s = NOUSU_ASKEL_S; s <= hakuS; s += NOUSU_ASKEL_S) {
    const t = alkuMs + s * 1000;
    const v = V(t);
    if (edellinen <= 0 && v > 0) {
      let a = t - NOUSU_ASKEL_S * 1000;
      let b = t;
      while (b - a > NOUSU_TARKKUUS_S * 1000) {
        const m = (a + b) / 2;
        if (V(m) > 0) b = m; else a = m;
      }
      return b;
    }
    edellinen = v;
  }
  return null;
}

/** Kelauksen tavoite: ENNEN_S ennen nousua, tai null, jos nousu on jo niin lähellä ettei kelata. */
export function kelausHetki(nousuMs, nytMs) {
  const k = nousuMs - ENNEN_S * 1000;
  return k > nytMs ? k : null;
}

/** Kelauksen huippunopeus niin, että kesto ≤ KELAUS_ENINTAAN_S (simukellon kesto = 1,875 · ero / huippu). */
export function kelauksenHuippu(eroMs) {
  return Math.max(1000, (1.875 * Math.abs(eroMs)) / (KELAUS_ENINTAAN_S * 1000));
}

export const yopuolella = (ms, issNyt) => maanAurinko(ms, issNyt.paikka(ms)) < YO_RAJA;

/** Seuraava hetki, jolloin maa ISS:n alla on päivänvalossa (≥ PAIVA_RAJA); jo valoisassa = alku; null = ei hakuajassa. */
export function seuraavaPaivanvalo(issNyt, alkuMs, hakuS = PAIVA_HAKU_S) {
  const A = (ms) => maanAurinko(ms, issNyt.paikka(ms));
  if (A(alkuMs) >= PAIVA_RAJA) return alkuMs;
  for (let s = PAIVA_ASKEL_S; s <= hakuS; s += PAIVA_ASKEL_S) {
    const t = alkuMs + s * 1000;
    if (A(t) < PAIVA_RAJA) continue;
    let a = t - PAIVA_ASKEL_S * 1000;
    let b = t;
    while (b - a > 1000) {
      const m = (a + b) / 2;
      if (A(m) >= PAIVA_RAJA) b = m; else a = m;
    }
    return b;
  }
  return null;
}

/* ═══════════ VERTAILUKUVA ═════════════════════════════════════════ */

/** Maan pinnan etäisyys (km, isoympyrä). */
export function maaEtaisyysKm(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * DEG;
  const p2 = lat2 * DEG;
  const c = Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos((lon2 - lon1) * DEG);
  return 6371 * Math.acos(Math.max(-1, Math.min(1, c)));
}

/** Astronautin NASA-kuva vertailuun: aineiston kohde lähimpänä ISS:n alapistettä. null = ei kohteita. */
export function lahinKohde(kohteet, lat, lon) {
  let paras = null;
  let parasKm = Infinity;
  for (const k of kohteet ?? []) {
    if (!k || !Number.isFinite(k.lat) || !Number.isFinite(k.lon)) continue;
    const d = maaEtaisyysKm(lat, lon, k.lat, k.lon);
    if (d < parasKm) { parasKm = d; paras = k; }
  }
  return paras ? { kohde: paras, km: parasKm } : null;
}

/** Paikka tekstiksi: "60,2° N, 24,9° E". */
export function paikkaTeksti(lat, lon) {
  const f = (x) => Math.abs(x).toFixed(1).replace('.', ',');
  return `${f(lat)}° ${lat >= 0 ? 'N' : 'S'}, ${f(lon)}° ${lon >= 0 ? 'E' : 'W'}`;
}
