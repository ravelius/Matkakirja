/*
 * AVARUUSKÄVELYN NÄKYMÄ (Päätoimittaja 2.10.2026: web pariteettiin, natiivi UI/Linssit/AvaruuskavelyNakyma.cs on malli).
 *
 * Codexin kerrokset (natiivin Resources/KavelyKerrokset, manifest 06a0a84c) WebP:nä ämpärissä: iPhone pysty 1290 × 2796
 * ja iPad vaaka 2732 × 2048, ruudun peittävänä (cover, keskitetty). Ilmalukko: luukku (avautuu saranastaan ulospäin,
 * 2D:ssä vaakapuristuksena saranan ympäri), kehys ja valovuoto. Ulkona takaa eteen: rakenne, paneeli, kaide, köysi,
 * käsine (irti / kiinni), visiiri ja valokerrokset valo-rakenne / -kaide / -käsine. Valokerrosten voimakkuus ISS:n
 * auringosta (reunavalo) ja metallin sävy tummuu varjossa (0,28): auringonnousu pyyhkäisee etualan. Vertailukortti: oma
 * kuva ja astronautin NASA-kuva kortin kuva-alueisiin, tekstit alle. Äänet: ilmalukon paine, luukku, karabiini, suljin
 * ja hengityssilmukka kypärässä (Web Audio). Pulun repliikit ovat pois (omistaja 29.9.: "Ota pulun ääni toistaiseksi kokonaan pois
 * ISS-kohtauksesta"; natiivi PuluPuhuu = false), joten niitä ei soiteta.
 *
 * Kaikki päästää kosketukset läpi (pointer-events: none): napautus menee kyydin kosketuskerroksen kautta kävelylle.
 */
import { VAIHE, jarjestys, TAKAISIN_S } from './iss-kavely.js';
import { tehosteVoima } from '../aani-ehdokkaat.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from '../sound.js';
import { musiikkiKonteksti } from '../musiikkivahvistin.js';

/** Versioitu ämpärikansio (v1): uusi kuva saa uuden kansion. Vientikansio _valmiit/avaruuskavely/v1. */
export const KAVELY_JUURI = 'https://media.matkakirja.app/linssit/avaruuskavely/v1/';
export const KAVELY_AANIJUURI = 'https://media.matkakirja.app/aanet/avaruuskavely/v1/';

/** Ulos-vaiheen ajoitus (s): luukku avautuu, ilmalukko häipyy, etuala liukuu paikalleen (natiivi). */
export const LUUKKU_S = 1.2;
export const LUKKO_POIS_ALKU = 1.0;
export const LUKKO_POIS_S = 1.0;
export const ETUALA_ALKU = 1.2;
export const ETUALA_S = 1.8;
export const ETUALAN_LIUKU = 0.28;
/** Maavalo varjossa (metallin sävy) ja valokerrosten enimmäisvoimakkuus. */
export const VARJOSSA = 0.28;
export const VALO_MAX = 1;
/** Hengityssilmukan voimakkuus suhteessa tehosteisiin. */
export const HENGITYS_VOIMA = 0.35;

export const ULKO = Object.freeze(['rakenne', 'paneeli', 'kaide', 'koysi', 'kasine-irti', 'kasine-kiinni', 'visiiri', 'valo-rakenne', 'valo-kaide', 'valo-kasine']);
export const LUKKO = Object.freeze(['ilmalukko-luukku', 'ilmalukko-kehys', 'ilmalukko-valo']);

/** Kerroksen rajaus kankaalla [x, y, leveys, korkeus] (px, y alas): natiivin generoitu KavelyKerrokset.Rajaukset. */
export const RAJAUKSET = Object.freeze({
  iphone: {
    'ilmalukko-kehys': [0, 0, 1290, 2796], 'ilmalukko-luukku': [126, 530, 1032, 1394], 'ilmalukko-valo': [47, 464, 1197, 1526],
    kaide: [0, 1675, 1290, 1121], 'kasine-irti': [0, 1866, 954, 930], 'kasine-kiinni': [0, 1866, 954, 930],
    koysi: [524, 2205, 338, 591], paneeli: [617, 0, 673, 637], rakenne: [0, 0, 420, 1719],
    'valo-kaide': [250, 1656, 1040, 1140], 'valo-kasine': [402, 1847, 574, 949], 'valo-rakenne': [179, 0, 263, 1738],
    vertailukortti: [0, 0, 1600, 1000], visiiri: [0, 0, 449, 2796],
  },
  ipad: {
    'ilmalukko-kehys': [0, 0, 2732, 2048], 'ilmalukko-luukku': [613, 236, 1500, 1395], 'ilmalukko-valo': [556, 167, 1621, 1525],
    kaide: [0, 1152, 2157, 896], 'kasine-irti': [0, 1227, 1255, 821], 'kasine-kiinni': [0, 1224, 1238, 824],
    koysi: [683, 1633, 374, 415], paneeli: [937, 0, 1335, 440], rakenne: [0, 0, 1057, 1236],
    'valo-kaide': [0, 1134, 2179, 914], 'valo-kasine': [494, 1206, 762, 842], 'valo-rakenne': [466, 0, 612, 1254],
    vertailukortti: [0, 0, 1600, 1000], visiiri: [0, 0, 989, 2048],
  },
});
export const VARIANTIT = Object.freeze({
  iphone: { kangas: [1290, 2796], sarana: [154, 1230], luukunKulma: 108 },
  ipad: { kangas: [2732, 2048], sarana: [632, 962], luukunKulma: 105 },
});
/** Vertailukortin alueet (1600 × 1000): [x0, y0, x1, y1]. */
export const KORTTI = Object.freeze({
  kangas: [1600, 1000],
  kuvaVasen: [112, 170, 760, 665], kuvaOikea: [840, 170, 1488, 665],
  tekstiVasen: [122, 728, 750, 874], tekstiOikea: [850, 728, 1478, 874],
});

/** Variantti ruudun muodosta: vaaka = iPad, pysty = iPhone (natiivi Mitoita). */
export const kavelyVariantti = (leveys, korkeus) => (leveys > korkeus ? 'ipad' : 'iphone');

/** Cover: kangas peittää ruudun keskitettynä → { vasen, yla, leveys, korkeus } (px). */
export function kansi(leveys, korkeus, variantti) {
  const [kw, kh] = VARIANTIT[variantti].kangas;
  const m = Math.max(leveys / kw, korkeus / kh);
  return { vasen: (leveys - kw * m) / 2, yla: (korkeus - kh * m) / 2, leveys: kw * m, korkeus: kh * m };
}

const pehmea = (x) => x * x * (3 - 2 * x);
const rajaa = (x) => Math.max(0, Math.min(1, x));

/**
 * Animaation tila vaiheesta ja vaiheen ajasta t (s), puhdas (natiivi Animoi): luukku 0 → 1 (avautuu), ilmalukon
 * näkyvyys, etuala 0 → 1 (liukuu ylös) ja käsine kiinni köyden jälkeen. Vähennetty liike: ei liukua eikä häivytystä.
 */
export function animaatio(vaihe, t, vahennetty = false) {
  const lukossa = vaihe === VAIHE.ilmalukko;
  const ulos = vaihe === VAIHE.ulos && !vahennetty;
  const auki = lukossa ? 0 : vahennetty ? 1 : rajaa(t / LUUKKU_S);
  const lukkoNakyy = lukossa ? 1 : ulos ? 1 - rajaa((t - LUKKO_POIS_ALKU) / LUKKO_POIS_S) : 0;
  let etuala = lukossa ? 0 : ulos ? pehmea(rajaa((t - ETUALA_ALKU) / ETUALA_S)) : 1;
  if (vaihe === VAIHE.takaisin) etuala = 1 - rajaa(t / TAKAISIN_S);
  return { auki, lukkoNakyy, etuala, kasineKiinni: jarjestys(vaihe) > jarjestys(VAIHE.koysi) };
}

/** Metallin sävy (rgb 0…1) ISS:n aurinkoisuudesta: varjossa 0,28 (sininen 0,35), auringossa 1. */
export function metallinSavy(aurinko) {
  const s = VARJOSSA + (1 - VARJOSSA) * aurinko;
  return [s, s, VARJOSSA * 1.25 + (1 - VARJOSSA * 1.25) * aurinko];
}

/** Vaiheen tehoste (natiivi KavelyAanet.Vaihe): tiedostonimi tai null. */
export function vaiheenTehoste(vanha, uusi) {
  if (uusi === VAIHE.ilmalukko) return 'ilmalukko-paine';
  if (uusi === VAIHE.ulos) return 'ilmalukko-luukku';
  if (uusi === VAIHE.auringonnousu && vanha === VAIHE.koysi) return 'karabiini';
  if (uusi === VAIHE.vertailu) return 'suljin';
  return null;
}

/** Hengitys kuuluu ulkona (ulos … vertailu). */
export const hengittaa = (vaihe) => jarjestys(vaihe) >= jarjestys(VAIHE.ulos) && jarjestys(vaihe) <= jarjestys(VAIHE.vertailu);

const pros = (x, koko) => `${(x / koko) * 100}%`;

/**
 * Näkymä kyydin juureen (`isa`, tai kutsuja liittää `el`:n itse ennen kosketuskerrosta). Palauttaa kahvan: vaihe(uusi, ohje), animoi(...),
 * kortti(...), kuvanKerrokset() (oman kuvan kooste) ja pura().
 */
export function luoKavelyNakyma({ doc, ikkuna = globalThis, isa, reduced = false, juuri = KAVELY_JUURI, aaniJuuri = KAVELY_AANIJUURI } = {}) {
  if (!doc?.createElement) return null;
  const el = doc.createElement('div');
  el.className = 'iss-kavely';
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  const kangas = doc.createElement('div');
  kangas.className = 'iss-kavely-kangas';
  const ulko = doc.createElement('div');
  ulko.className = 'iss-kavely-ulko';
  const lukko = doc.createElement('div');
  lukko.className = 'iss-kavely-lukko';
  kangas.append(ulko, lukko);
  const ohje = doc.createElement('div');
  ohje.className = 'iss-kavely-ohje';
  ohje.setAttribute('role', 'status');
  const korttiJuuri = doc.createElement('div');
  korttiJuuri.className = 'iss-kavely-korttijuuri';
  korttiJuuri.hidden = true;
  const kortti = doc.createElement('div');
  kortti.className = 'iss-kavely-kortti';
  const alue = (r, luokka) => {
    const e = doc.createElement('div');
    e.className = luokka;
    const [kw, kh] = KORTTI.kangas;
    Object.assign(e.style, { left: pros(r[0], kw), top: pros(r[1], kh), width: pros(r[2] - r[0], kw), height: pros(r[3] - r[1], kh) });
    kortti.append(e);
    return e;
  };
  const oma = alue(KORTTI.kuvaVasen, 'iss-kavely-kuva');
  const nasa = alue(KORTTI.kuvaOikea, 'iss-kavely-kuva');
  const omaTeksti = alue(KORTTI.tekstiVasen, 'iss-kavely-teksti');
  const nasaTeksti = alue(KORTTI.tekstiOikea, 'iss-kavely-teksti');
  korttiJuuri.append(kortti);
  el.append(kangas, ohje, korttiJuuri);
  isa?.append?.(el);

  let variantti = null;
  const kerrokset = new Map();
  const kuvat = new Map();
  let vaihe = VAIHE.ei;
  let vaiheAlkoi = 0;
  let viimeisinAnim = null;

  const rakenna = (uusi) => {
    variantti = uusi;
    ulko.replaceChildren();
    lukko.replaceChildren();
    kerrokset.clear();
    const [kw, kh] = VARIANTIT[uusi].kangas;
    const lisaa = (isaEl, nimi) => {
      const r = RAJAUKSET[uusi][nimi];
      const e = doc.createElement('div');
      e.className = `iss-kavely-kerros${nimi.startsWith('valo-') || nimi === 'ilmalukko-valo' ? ' iss-kavely-valo' : ''}`;
      e.dataset.nimi = nimi;
      const osoite = `${juuri}${uusi}/${nimi}.webp`;
      Object.assign(e.style, {
        left: pros(r[0], kw), top: pros(r[1], kh), width: pros(r[2], kw), height: pros(r[3], kh), backgroundImage: `url("${osoite}")`,
      });
      if (ikkuna.Image) {
        const img = new ikkuna.Image();
        img.crossOrigin = 'anonymous';
        img.src = osoite;
        kuvat.set(nimi, img);
      }
      kerrokset.set(nimi, e);
      isaEl.append(e);
    };
    for (const n of ULKO) lisaa(ulko, n);
    for (const n of LUKKO) lisaa(lukko, n);
    const luukku = kerrokset.get('ilmalukko-luukku');
    const r = RAJAUKSET[uusi]['ilmalukko-luukku'];
    const [sx, sy] = VARIANTIT[uusi].sarana;
    if (luukku) luukku.style.transformOrigin = `${((sx - r[0]) / r[2]) * 100}% ${((sy - r[1]) / r[3]) * 100}%`;
    kortti.style.backgroundImage = `url("${juuri}${uusi}/vertailukortti.webp")`;
  };

  const mitoita = () => {
    const w = ikkuna.innerWidth || 390;
    const h = ikkuna.innerHeight || 844;
    const v = kavelyVariantti(w, h);
    if (v !== variantti) rakenna(v);
    const k = kansi(w, h, v);
    Object.assign(kangas.style, { left: `${k.vasen}px`, top: `${k.yla}px`, width: `${k.leveys}px`, height: `${k.korkeus}px` });
    const kl = Math.min(w * 0.92, h * 0.8 * 1.6);
    Object.assign(kortti.style, { width: `${kl}px`, height: `${kl / 1.6}px` });
    const fs = Math.max(12, Math.min(26, (kl / 1600) * 34));
    omaTeksti.style.fontSize = `${fs}px`;
    nasaTeksti.style.fontSize = `${fs}px`;
    return k;
  };
  /* Nimetty kuuntelija, jotta pura() voi poistaa sen (ikkuna elää kyytiä pidempään). */
  const uudelleenMitoita = () => { if (vaihe !== VAIHE.ei) mitoita(); };
  ikkuna.addEventListener?.('resize', uudelleenMitoita);

  /*
   * ---- äänet (Web Audio, kuten js/linssit/cupola-aani.js) ----
   * Pelin oma konteksti (musiikkiKonteksti, EI omaa AudioContextia) ja tehostekanava sfx.bus: kytkin sfx.enabled,
   * taso gainissa (iOS Safari ei noudata HTMLAudion volume-arvoa), taustalle mennessä konteksti nukkuu
   * (sfx.taustaTauko) ja silmukka pysähtyy sen mukana. Puskurit haetaan kerran: fetch → decodeAudioData.
   */
  const puskurit = new Map();
  const soivat = new Set();
  let hengitys = null;
  let hengitysHaluttu = false;
  let purettu = false;
  const taso = () => (sfx?.enabled === false ? 0 : Math.max(0, Math.min(1, tehosteVoima())));
  const kohde = (ctx) => (ctx === sfx?.ctx && sfx.bus ? sfx.bus : ctx.destination);
  const haePuskuri = (ctx, tiedosto) => {
    let p = puskurit.get(tiedosto);
    if (!p) {
      p = (async () => {
        const vastaus = await fetch(`${aaniJuuri}${tiedosto}`, { mode: 'cors' });
        if (!vastaus.ok) throw new Error('http');
        return ctx.decodeAudioData(await vastaus.arrayBuffer());
      })().catch(() => { puskurit.delete(tiedosto); return null; });
      puskurit.set(tiedosto, p);
    }
    return p;
  };
  /** Puskuri → AudioBufferSourceNode → GainNode → sfx.bus; palauttaa { lahde, gain } tai null. */
  const soita = async (tiedosto, voima, silmukka) => {
    const ctx = musiikkiKonteksti();
    if (!ctx || sfx?.taustaTauko || typeof ctx.createBufferSource !== 'function') return null;
    const puskuri = await haePuskuri(ctx, tiedosto);
    if (!puskuri || purettu) return null;
    try {
      const lahde = ctx.createBufferSource();
      lahde.buffer = puskuri;
      lahde.loop = silmukka;
      const gain = ctx.createGain();
      gain.gain.value = voima;
      lahde.connect(gain).connect(kohde(ctx));
      const soi = { lahde, gain };
      soivat.add(soi);
      lahde.onended = () => { soivat.delete(soi); try { gain.disconnect(); } catch { /* jo irti */ } };
      lahde.start();
      return soi;
    } catch { return null; /* konteksti kaatui: kävely toimii ilman ääntä */ }
  };
  const lopetaSoiva = (soi) => {
    if (!soi) return;
    soivat.delete(soi);
    try { soi.lahde.stop(); } catch { /* jo pysäytetty */ }
    try { soi.lahde.disconnect(); } catch { /* jo irti */ }
    try { soi.gain.disconnect(); } catch { /* jo irti */ }
  };
  const tehoste = (nimi) => {
    if (!(taso() > 0)) return;
    soita(`${nimi}.mp3`, taso(), false);
  };
  /** Hengitys päälle tai pois; taso päivitetään joka kutsulla (tehosteliuku, äänikytkin). */
  const asetaHengitys = async (paalla) => {
    hengitysHaluttu = paalla;
    if (!paalla || !(taso() > 0)) {
      if (hengitys) { lopetaSoiva(hengitys); hengitys = null; }
      return;
    }
    if (hengitys) {
      try { hengitys.gain.gain.value = HENGITYS_VOIMA * taso(); } catch { /* konteksti kiinni */ }
      return;
    }
    const soi = await soita('hengitys-silmukka.wav', HENGITYS_VOIMA * taso(), true);
    if (!soi) return;
    /* Lataus kesti: vaihe on voinut vaihtua tai kytkin sammua; kaksi hengitystä ei saa jäädä soimaan. */
    if (!hengitysHaluttu || hengitys || purettu) lopetaSoiva(soi);
    else hengitys = soi;
  };
  const aanivalinta = () => { asetaHengitys(hengitysHaluttu); };
  doc.addEventListener?.(AANIVALINTA_TAPAHTUMA, aanivalinta);

  return {
    el,
    get vaihe() { return vaihe; },
    /** Vaihe vaihtui (kyydin kytkentä): näkyvyys, ohje, kortti ja äänet. */
    vaihe(uusi, ohjeTeksti, nyt) {
      ohje.textContent = ohjeTeksti ?? '';
      ohje.hidden = !ohjeTeksti;
      if (uusi === vaihe) return;
      const vanha = vaihe;
      vaihe = uusi;
      vaiheAlkoi = nyt;
      el.hidden = uusi === VAIHE.ei;
      el.dataset.vaihe = uusi;
      korttiJuuri.hidden = uusi !== VAIHE.vertailu;
      if (uusi !== VAIHE.ei) mitoita();
      const t = vaiheenTehoste(vanha, uusi);
      if (t) tehoste(t);
      asetaHengitys(hengittaa(uusi));
    },
    /** Kehys: ilmalukon avautuminen, etualan liuku ja auringon valo (aurinko ja reuna 0…1). */
    animoi(nyt, aurinko, reuna) {
      if (vaihe === VAIHE.ei) return null;
      const a = animaatio(vaihe, nyt - vaiheAlkoi, reduced);
      viimeisinAnim = a;
      const luukku = kerrokset.get('ilmalukko-luukku');
      if (luukku) {
        const kulma = (a.auki * VARIANTIT[variantti].luukunKulma * Math.PI) / 180;
        luukku.style.transform = `scaleX(${Math.max(0.001, Math.cos(Math.min(kulma, Math.PI / 2 - 0.01)))})`;
        luukku.style.opacity = kulma > Math.PI / 2 ? '0' : '1';
      }
      const lv = kerrokset.get('ilmalukko-valo');
      if (lv) lv.style.opacity = String(a.auki);
      lukko.style.opacity = String(a.lukkoNakyy);
      lukko.hidden = a.lukkoNakyy <= 0.001;
      ulko.style.opacity = String(a.etuala);
      ulko.style.transform = `translateY(${(1 - a.etuala) * ETUALAN_LIUKU * 100}%)`;
      ulko.hidden = a.etuala <= 0.001;
      kerrokset.get('kasine-irti')?.toggleAttribute('hidden', a.kasineKiinni);
      kerrokset.get('kasine-kiinni')?.toggleAttribute('hidden', !a.kasineKiinni);
      // Metallin sävy: natiivin kuvan sävytys (tint) CSS:n brightness-suotimena (sininen kanava ei erotu ruudulla).
      const [r] = metallinSavy(aurinko);
      for (const [nimi, e] of kerrokset) {
        if (nimi.startsWith('valo-')) e.style.opacity = String(reuna * VALO_MAX);
        else if (!nimi.startsWith('ilmalukko')) e.style.filter = `brightness(${r.toFixed(3)})`;
      }
      return a;
    },
    /** Vertailukortti: oma kuva (dataURL) ja NASA-kuva tekstein. */
    kortti({ omaKuva = null, omaTeksti: ot = '', nasaKuva = null, nasaTeksti: nt = '' } = {}) {
      oma.style.backgroundImage = omaKuva ? `url("${omaKuva}")` : '';
      nasa.style.backgroundImage = nasaKuva ? `url("${nasaKuva}")` : '';
      omaTeksti.textContent = ot;
      nasaTeksti.textContent = nt;
    },
    /** Ohje ja kortti piiloon kuvan ajaksi (etuala jää kuvaan). */
    kuvanAjaksi(piiloon) {
      ohje.style.visibility = piiloon ? 'hidden' : '';
      korttiJuuri.style.visibility = piiloon ? 'hidden' : '';
    },
    /**
     * Oman kuvan kooste: piirtää näkyvät etualan kerrokset (kansi, liuku ja läpinäkyvyys kuten ruudulla) kankaalle,
     * jolle kutsuja on jo piirtänyt pallon. `ctx` = 2D-konteksti ruudun kokoisena.
     */
    piirraEtuala(ctx, w, h) {
      if (!variantti || !viimeisinAnim) return;
      const k = kansi(w, h, variantti);
      const [kw] = VARIANTIT[variantti].kangas;
      const m = k.leveys / kw;
      const dy = (1 - viimeisinAnim.etuala) * ETUALAN_LIUKU * k.korkeus;
      for (const nimi of ULKO) {
        const e = kerrokset.get(nimi);
        const img = kuvat.get(nimi);
        if (!e || e.hidden || !img?.complete || !img.naturalWidth) continue;
        const r = RAJAUKSET[variantti][nimi];
        ctx.globalAlpha = viimeisinAnim.etuala * Number(e.style.opacity || 1);
        ctx.drawImage(img, k.vasen + r[0] * m, k.yla + r[1] * m + dy, r[2] * m, r[3] * m);
      }
      ctx.globalAlpha = 1;
    },
    tila: () => ({ vaihe, variantti, kerroksia: kerrokset.size, ohje: ohje.hidden ? null : ohje.textContent, kortti: !korttiJuuri.hidden }),
    pura() {
      purettu = true;
      hengitysHaluttu = false;
      ikkuna.removeEventListener?.('resize', uudelleenMitoita);
      doc.removeEventListener?.(AANIVALINTA_TAPAHTUMA, aanivalinta);
      hengitys = null;
      for (const soi of [...soivat]) lopetaSoiva(soi);
      el.remove();
    },
  };
}
