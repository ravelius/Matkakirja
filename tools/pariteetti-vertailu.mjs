/*
 * Pariteettiajon vertailija: selainpelin (web) ja natiivin iOS-version
 * sama näkymä rinnakkain, koneellisesti.
 *
 *   node tools/pariteetti-vertailu.mjs web.json natiivi.json
 *
 * Kummastakin puolesta saadaan laatikkolista samalla skeemalla:
 *
 *   { "paneeli": { "w", "h" },
 *     "elementit": [ { "teksti"?, "fontti"?, "kuva"?, "versaali"?,
 *                      "x", "y", "w", "h", "opasiteetti",
 *                      "luokat"?, "nimi"? } ] }
 *
 * Web on CSS-pikseleinä (paneeli = viewport), natiivi UI-yksiköinä
 * (paneeli = natiivin paneeli). Natiivi skaalataan web-tilaan leveyden
 * mukaan, tekstit paritetaan normalisoidun tekstin perusteella ja
 * kuvista lasketaan SSIM + reunakarttojen korrelaatio. Lopuksi tuomio:
 * SAMA, ERI tai PUUTTUU, ja lyhyet suomenkieliset syyt.
 *
 * Kaikki exportit ovat puhtaita funktioita (ei tiedostoja, ei verkkoa);
 * ajuri (kaappaus, PNG:n purku, kansiot) on muualla. Kuvien pitää olla
 * samankokoisia harmaasävytaulukoita ennen kuvaEro-kutsua.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Oletusrajat. Kaikki voi ohittaa tuomio(…, rajat)- ja parita(…, rajat)-kutsuissa. */
export const OLETUSRAJAT = Object.freeze({
  sijaintiPx: 8, // keskipisteiden ero web-px (|dx| ja |dy|)
  kokoOsuus: 0.15, // leveys- ja korkeusero suhteessa web-kokoon
  kokoMinPx: 4, // alle tämän absoluuttinen kokoero ei ole virhe (pyöristys)
  puuttuvatOsuus: 0.10, // vain webissä olevia tekstejä enintään tämä osuus
  puuttuvatVahintaan: 1, // … mutta aina vähintään näin monta sallitaan
  ylimaaraisetOsuus: 0.10, // vain natiivissa olevat samalla säännöllä
  puuttuuOsuus: 0.60, // yli tämän osuuden puuttuessa tila on PUUTTUU
  ssim: 0.15, // rakenne sama, kun ssim ≥ tämä … (Chromium ja Unity piirtävät kartan ja fontit eri tavoin: b12g-ajossa samankin näkymän ssim 0,1–0,4, joten raja tunnistaa vain täysin eri näkymän)
  reunat: 0.15, // … JA reunakarttojen korrelaatio ≥ tämä
  opasiteetti: 0.3, // tätä himmeämmät elementit ohitetaan
  pitkaTeksti: 120, // tätä pidempi teksti on leipätekstiä (vain yläreunan dy)
  osittainenAlku: 12, // osittaiseen pariin vaaditaan näin monta yhteistä alkumerkkiä
  sanaPituus: 30, // tätä pidemmät tekstit voivat parittua sanojen päällekkäisyydellä …
  sanaOsuus: 0.6, // … kun lyhyemmän sanoista vähintään tämä osuus on toisessa (sisältymiskerroin)
  kokoamisSade: 48, // katkelmat kootaan yhdeksi tekstiksi tämän säteen sisältä (web-px siirron jälkeen)
  siirtoOsuus: 0.4, // koko näkymän yhteinen siirto (turva-alue) on huomautus, kun ≤ tämä osuus paneelista
  kuvaSiirto: 0.15, // kuvavertailu hakee parhaan pystysiirron ± tämä osuus korkeudesta
  // Webin karttanimet (maa-, vesi- ja kaupunkinimet pallolla) ovat natiivissa 3D-kerrosta eivätkä näy UI-puussa:
  // tekstivertailu ohittaa ne, ja kartan vertaa kuvaero (b12-2-ajo: linssirivien PUUTTUU tuli pelkistä karttanimistä).
  ohitaWebLuokat: ['pallolauta-merkki'],
  // Hyväksytyt poikkeamat: [{ teksti: RegExp normalisoidulle tekstille, yEnintaan?: web-px (keskipiste), syy }].
  // Parin sijainti- ja kokoero ei tee näkymästä ERI:tä, vaan se kerrotaan huomautuksena (esim. iPhonen yläpalkki).
  sallitutPoikkeamat: [],
});

// ---------------------------------------------------------------- teksti

const TAVUVIIVAT = /[\u00AD\u200B-\u200D\u2060\uFEFF]/g; // tavuviiva, nollaleveät
const ERIKOISVALIT = /[\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;
const HEITTOMERKIT = /['`\u00B4\u02BC\u2018\u2019]/g; // "liu'un" → "liuun"
const EI_KIRJAIN = /[^\p{L}\p{N}\s]/gu; // välimerkit, viivat, emojit, symbolit

/**
 * Tekstin vertailumuoto: pienaakkoset (fi-FI), NFKC, ei tavuviivoja,
 * ei erikoisvälejä, ei välimerkkejä eikä emojeja, välit tiivistettynä.
 * "Ateena · Kreikka" ja "ATEENA — KREIKKA" → "ateena kreikka".
 * @param {string} teksti
 * @returns {string}
 */
export function normalisoi(teksti) {
  if (teksti == null) return '';
  return String(teksti)
    .normalize('NFKC')
    .replace(TAVUVIIVAT, '')
    .replace(ERIKOISVALIT, ' ')
    .toLocaleLowerCase('fi-FI')
    .replace(HEITTOMERKIT, '')
    .replace(EI_KIRJAIN, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------- skaalaus

/**
 * Natiivin laatikkolista web-tilaan tasaisella kertoimella leveyden mukaan:
 * k = web.paneeli.w / natiivi.paneeli.w. Palauttaa uuden listan (sama
 * skeema + kerroin); alkuperäistä ei muuteta. Jo skaalatulle lista k = 1.
 * @param {{paneeli:{w:number,h:number}, elementit:object[]}} natiivi
 * @param {{paneeli:{w:number,h:number}}} web
 */
export function skaalaa(natiivi, web) {
  const k = web.paneeli.w / natiivi.paneeli.w;
  if (!Number.isFinite(k) || k <= 0) throw new Error(`skaalaa: kelvoton paneelin leveys (${natiivi.paneeli.w})`);
  return {
    ...natiivi,
    kerroin: k,
    paneeli: { w: natiivi.paneeli.w * k, h: natiivi.paneeli.h * k },
    elementit: (natiivi.elementit || []).map((e) => ({
      ...e,
      x: e.x * k,
      y: e.y * k,
      w: e.w * k,
      h: e.h * k,
      ...(e.fontti != null ? { fontti: e.fontti * k } : {}),
    })),
  };
}

// ---------------------------------------------------------------- paritus

const keski = (e) => ({ x: e.x + e.w / 2, y: e.y + e.h / 2 });
const etaisyys = (a, b) => {
  const p = keski(a), q = keski(b);
  return Math.hypot(p.x - q.x, p.y - q.y);
};
const yhteinenAlku = (a, b) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
};

/** Unkarilainen menetelmä (minimikustannus), n rivejä ≤ m saraketta. */
function unkarilainen(kust) {
  const n = kust.length, m = kust[0].length;
  const u = new Array(n + 1).fill(0), v = new Array(m + 1).fill(0);
  const p = new Array(m + 1).fill(0), tie = new Array(m + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array(m + 1).fill(Infinity);
    const kaytetty = new Array(m + 1).fill(false);
    do {
      kaytetty[j0] = true;
      const i0 = p[j0];
      let delta = Infinity, j1 = 0;
      for (let j = 1; j <= m; j++) {
        if (kaytetty[j]) continue;
        const nyt = kust[i0 - 1][j - 1] - u[i0] - v[j];
        if (nyt < minv[j]) { minv[j] = nyt; tie[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= m; j++) {
        if (kaytetty[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = tie[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
  }
  const tulos = [];
  for (let j = 1; j <= m; j++) if (p[j]) tulos.push([p[j] - 1, j - 1]);
  return tulos;
}

/** Parit [webIndeksi, natiiviIndeksi] lähimpien keskipisteiden mukaan. */
function lahimmat(webit, natiivit) {
  if (!webit.length || !natiivit.length) return [];
  const kaanna = webit.length > natiivit.length;
  const rivit = kaanna ? natiivit : webit;
  const sarakkeet = kaanna ? webit : natiivit;
  const kust = rivit.map((a) => sarakkeet.map((b) => etaisyys(a, b)));
  return unkarilainen(kust).map(([r, s]) => (kaanna ? [s, r] : [r, s]));
}

const lista = (x) => (Array.isArray(x) ? x : x?.elementit || []);

/*
 * NATIIVIN PEITTO (heuristiikka): UI-puu listaa elementit piirtojärjestyksessä (kerros, sitten puu), mutta
 * ei tiedä, mikä jää toisen alle. Koko ruudun näkymä (lehti, linssi, asetukset) peittää kartan nimet.
 * Elementti, jonka päälle myöhemmin piirtyy läpinäkymätön (opasiteetti ≥ 0,9) laatikko, joka peittää
 * vähintään 90 % paneelista ja koko elementin, jätetään pois. Webissä sama tehdään elementFromPointilla.
 */
function piilotaPeitetyt(natiivi) {
  if (!natiivi || Array.isArray(natiivi) || !natiivi.paneeli) return natiivi;
  const el = natiivi.elementit || [];
  const ala = natiivi.paneeli.w * natiivi.paneeli.h;
  const peittajat = [];
  el.forEach((e, i) => {
    if (!e.teksti && (e.opasiteetti ?? 1) >= 0.9 && e.w * e.h >= 0.9 * ala) peittajat.push(i);
  });
  if (!peittajat.length) return natiivi;
  const sisalla = (a, b) => a.x >= b.x - 1 && a.y >= b.y - 1 && a.x + a.w <= b.x + b.w + 1 && a.y + a.h <= b.y + b.h + 1;
  return { ...natiivi, elementit: el.filter((e, i) => !peittajat.some((j) => j > i && sisalla(e, el[j]))) };
}

function tekstit(elementit, rajat) {
  return lista(elementit)
    .filter((e) => typeof e.teksti === 'string'
      && (e.opasiteetti == null || e.opasiteetti >= rajat.opasiteetti))
    .map((e) => ({ ...e, avain: normalisoi(e.teksti) }))
    // Yksittäinen merkki (anfangin "M", nuoli, luettelomerkki) ei ole vertailukelpoinen teksti.
    .filter((e) => e.avain.length > 1);
}

// Sanat vertailuun: yksikirjaimiset pois, mutta numerot säilyvät ("Rivi 1" ≠ "Rivi 10").
const sanat = (t) => new Set(t.split(' ').filter((x) => x.length > 1 || /\d/.test(x)));
/** Sisältymiskerroin: yhteiset sanat / pienemmän joukon sanat (katkelma sisältyy kappaleeseen). */
function sisaltyy(a, b) {
  const A = sanat(a), B = sanat(b);
  if (!A.size || !B.size) return 0;
  let yht = 0;
  for (const x of A) if (B.has(x)) yht++;
  return yht / Math.min(A.size, B.size);
}
const mediaani = (t) => {
  if (!t.length) return 0;
  const j = [...t].sort((a, b) => a - b);
  const k = Math.floor(j.length / 2);
  return j.length % 2 ? j[k] : (j[k - 1] + j[k]) / 2;
};

function teePari(w, n, laatu, rajat) {
  // Osittainen tai koottu pari (katkelma ≠ kappale) mitataan kuten leipäteksti: vain yläreunojen ero.
  const pitka = laatu !== 'tarkka' || w.avain.length > rajat.pitkaTeksti || n.avain.length > rajat.pitkaTeksti;
  const a = keski(w), b = keski(n);
  return {
    web: w,
    natiivi: n,
    dx: b.x - a.x,
    // Leipätekstin rivitys vaihtelee, joten sen pystyero on yläreunojen ero.
    dy: pitka ? n.y - w.y : b.y - a.y,
    dw: n.w - w.w,
    dh: n.h - w.h,
    laatu,
    pitka,
  };
}

/**
 * Tekstielementtien paritus normalisoidun tekstin perusteella.
 * Sama teksti useasti → unkarilainen menetelmä lähimmille keskipisteille.
 * Osittainen pari: lyhyempi on pidemmän alkuosa ja vähintään
 * rajat.osittainenAlku merkkiä (leipätekstille riittää yhteinen alku).
 * Natiivi skaalataan web-tilaan (jo skaalatulle k = 1).
 * @returns {{parit: object[], vainWeb: object[], vainNatiivi: object[]}}
 */
export function parita(web, natiivi, rajat = {}) {
  const r = { ...OLETUSRAJAT, ...rajat };
  const nat = !Array.isArray(natiivi) && !Array.isArray(web) && natiivi?.paneeli && web?.paneeli
    ? skaalaa(natiivi, web) : natiivi;
  const ohita = (e) => r.ohitaWebLuokat.some((l) => String(e.luokat ?? '').split(/\s+/).includes(l));
  const webIlmanKarttaa = Array.isArray(web) ? web.filter((e) => !ohita(e)) : { ...web, elementit: (web?.elementit || []).filter((e) => !ohita(e)) };
  const W = tekstit(webIlmanKarttaa, r), N = tekstit(piilotaPeitetyt(nat), r);
  const parit = [];
  const wKaytetty = new Set(), nKaytetty = new Set();

  // 1. Tarkat: ryhmä per normalisoitu teksti.
  const ryhmat = new Map();
  W.forEach((e, i) => {
    if (!ryhmat.has(e.avain)) ryhmat.set(e.avain, { w: [], n: [] });
    ryhmat.get(e.avain).w.push(i);
  });
  N.forEach((e, i) => ryhmat.get(e.avain)?.n.push(i));
  for (const { w, n } of ryhmat.values()) {
    for (const [a, b] of lahimmat(w.map((i) => W[i]), n.map((i) => N[i]))) {
      parit.push(teePari(W[w[a]], N[n[b]], 'tarkka', r));
      wKaytetty.add(w[a]); nKaytetty.add(n[b]);
    }
  }

  // 2. Osittaiset: ahne, pisin yhteinen alku ensin, sitten lähin.
  const ehdokkaat = [];
  W.forEach((a, i) => {
    if (wKaytetty.has(i)) return;
    N.forEach((b, j) => {
      if (nKaytetty.has(j)) return;
      const alku = yhteinenAlku(a.avain, b.avain);
      const lyhyempi = Math.min(a.avain.length, b.avain.length);
      const pitka = Math.max(a.avain.length, b.avain.length) > r.pitkaTeksti;
      if (alku < r.osittainenAlku) return;
      if (!pitka && alku < lyhyempi) return; // lyhyt teksti: oltava alkuosa
      ehdokkaat.push({ i, j, alku, d: etaisyys(a, b) });
    });
  });
  ehdokkaat.sort((p, q) => q.alku - p.alku || p.d - q.d);
  for (const { i, j } of ehdokkaat) {
    if (wKaytetty.has(i) || nKaytetty.has(j)) continue;
    parit.push(teePari(W[i], N[j], 'osittainen', r));
    wKaytetty.add(i); nKaytetty.add(j);
  }

  /*
   * 3. Sanojen päällekkäisyys pitkille teksteille: anfangi ("M" + "arseille on…") tai lihavoitu
   * sana erillisenä elementtinä pilkkoo webin kappaleen, natiivin Label pitää sen kokonaisena.
   */
  const sanaEhd = [];
  W.forEach((a, i) => {
    if (wKaytetty.has(i) || a.avain.length < r.sanaPituus) return;
    N.forEach((b, j) => {
      if (nKaytetty.has(j) || b.avain.length < r.sanaPituus) return;
      const o = sisaltyy(a.avain, b.avain);
      if (o >= r.sanaOsuus) sanaEhd.push({ i, j, o, d: etaisyys(a, b) });
    });
  });
  sanaEhd.sort((p, q) => q.o - p.o || p.d - q.d);
  for (const { i, j } of sanaEhd) {
    if (wKaytetty.has(i) || nKaytetty.has(j)) continue;
    parit.push(teePari(W[i], N[j], 'osittainen', r));
    wKaytetty.add(i); nKaytetty.add(j);
  }

  /*
   * 4. Upotetut katkelmat: parittamaton teksti, joka sisältyy toisen puolen paritettuun
   * pidempään tekstiin (webin <b>Vanhasatama</b> natiivin kappaleessa), ei puutu.
   */
  const upotettu = (e, toiset) => toiset.some((t) => t.avain.length > e.avain.length && ` ${t.avain} `.includes(` ${e.avain} `));
  const nParitetut = parit.map((p) => p.natiivi), wParitetut = parit.map((p) => p.web);
  W.forEach((e, i) => { if (!wKaytetty.has(i) && upotettu(e, nParitetut)) wKaytetty.add(i); });
  N.forEach((e, j) => { if (!nKaytetty.has(j) && upotettu(e, wParitetut)) nKaytetty.add(j); });

  /*
   * 4b. Katkelmien kokoaminen: webin otsakerivi "France" + "· tasavalta v. 1873" on natiivissa yksi Label
   * (ja päinvastoin). Parittamattomat katkelmat, joiden sanat sisältyvät toisen puolen parittamattomaan
   * tekstiin lähellä (kokoamisSade), kootaan yhdeksi pariksi, kun ne kattavat ≥ sanaOsuus sen sanoista.
   */
  const alustava = (() => {
    const t = parit.filter((p) => p.laatu === 'tarkka' && !p.pitka);
    return t.length >= 3 ? { dx: mediaani(t.map((p) => p.dx)), dy: mediaani(t.map((p) => p.dy)) } : { dx: 0, dy: 0 };
  })();
  const kokoa = (Kohteet, kohdeKaytetty, Palat, palaKaytetty, kohdeOnWeb) => {
    Kohteet.forEach((k, ki) => {
      if (kohdeKaytetty.has(ki)) return;
      const kSanat = sanat(k.avain);
      if (kSanat.size < 2) return;
      const kk = keski(k);
      const valitut = [];
      Palat.forEach((pala, pi) => {
        if (palaKaytetty.has(pi)) return;
        const pk = keski(pala);
        // Palan keskipiste kohteen tilaan: natiivi → web vähennetään siirto, web → natiivi lisätään.
        const sx = kohdeOnWeb ? -alustava.dx : alustava.dx, sy = kohdeOnWeb ? -alustava.dy : alustava.dy;
        if (Math.hypot(pk.x + sx - kk.x, pk.y + sy - kk.y) > r.kokoamisSade + Math.max(k.w, k.h) / 2) return;
        const ps = sanat(pala.avain);
        if (ps.size && [...ps].every((x) => kSanat.has(x))) valitut.push(pi);
      });
      if (!valitut.length) return;
      const katetut = new Set(valitut.flatMap((pi) => [...sanat(Palat[pi].avain)]));
      if (katetut.size / kSanat.size < r.sanaOsuus) return;
      const x0 = Math.min(...valitut.map((pi) => Palat[pi].x)), y0 = Math.min(...valitut.map((pi) => Palat[pi].y));
      const x1 = Math.max(...valitut.map((pi) => Palat[pi].x + Palat[pi].w)), y1 = Math.max(...valitut.map((pi) => Palat[pi].y + Palat[pi].h));
      const koottu = { ...Palat[valitut[0]], teksti: valitut.map((pi) => Palat[pi].teksti).join(' '), avain: k.avain, x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
      parit.push(kohdeOnWeb ? teePari(k, koottu, 'koottu', r) : teePari(koottu, k, 'koottu', r));
      kohdeKaytetty.add(ki);
      valitut.forEach((pi) => palaKaytetty.add(pi));
    });
  };
  kokoa(N, nKaytetty, W, wKaytetty, false);
  kokoa(W, wKaytetty, N, nKaytetty, true);
  // Upotus sanatasolla: katkelma, jonka sanoista ≥ 80 % on paritetussa pidemmässä tekstissä.
  const upotettuSanoin = (e, toiset) => toiset.some((t) => t.avain.length > e.avain.length && sisaltyy(e.avain, t.avain) >= 0.8);
  // Verrataan kaikkiin jo käytettyihin (paritetut, kootut ja upotetut): kappaleen toinen natiivikatkelma
  // on itse upotettu, ja webin lihavoitu sana voi olla juuri siinä.
  for (let kierros = 0; kierros < 2; kierros++) {
    const nK = N.filter((_, j) => nKaytetty.has(j)), wK = W.filter((_, i) => wKaytetty.has(i));
    W.forEach((e, i) => { if (!wKaytetty.has(i) && upotettuSanoin(e, nK)) wKaytetty.add(i); });
    N.forEach((e, j) => { if (!nKaytetty.has(j) && upotettuSanoin(e, wK)) nKaytetty.add(j); });
  }

  /*
   * 5. Koko näkymän yhteinen siirto (mediaani lyhyistä tarkoista pareista): natiivin
   * turva-alue (Dynamic Island, kotipalkki) siirtää koko sisällön, eikä se ole
   * jokaisen tekstin virhe. tuomio vertaa pareja siirron jälkeen.
   */
  const perus = parit.filter((p) => p.laatu === 'tarkka' && !p.pitka);
  const siirto = perus.length >= 3 ? { dx: mediaani(perus.map((p) => p.dx)), dy: mediaani(perus.map((p) => p.dy)) } : { dx: 0, dy: 0 };

  parit.sort((p, q) => p.web.y - q.web.y || p.web.x - q.web.x);
  const riisu = ({ avain, ...e }) => e;
  return {
    parit: parit.map((p) => ({ ...p, web: riisu(p.web), natiivi: riisu(p.natiivi) })),
    vainWeb: W.filter((_, i) => !wKaytetty.has(i)).map(riisu),
    vainNatiivi: N.filter((_, j) => !nKaytetty.has(j)).map(riisu),
    siirto,
    paneeli: web?.paneeli ?? null,
  };
}

// ---------------------------------------------------------------- kuvat

function sobel(g, w, h) {
  const ulos = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const a = g[i - w - 1], b = g[i - w], c = g[i - w + 1];
      const d = g[i - 1], f = g[i + 1];
      const p = g[i + w - 1], q = g[i + w], s = g[i + w + 1];
      const gx = (c + 2 * f + s) - (a + 2 * d + p);
      const gy = (p + 2 * q + s) - (a + 2 * b + c);
      ulos[i] = Math.hypot(gx, gy);
    }
  }
  return ulos;
}

function korrelaatio(a, b) {
  const n = a.length;
  let sa = 0, sb = 0;
  for (let i = 0; i < n; i++) { sa += a[i]; sb += b[i]; }
  const ka = sa / n, kb = sb / n;
  let kov = 0, va = 0, vb = 0;
  for (let i = 0; i < n; i++) {
    const x = a[i] - ka, y = b[i] - kb;
    kov += x * y; va += x * x; vb += y * y;
  }
  if (va === 0 && vb === 0) return 1; // molemmat tasaisia: sama rakenne
  if (va === 0 || vb === 0) return 0;
  return kov / Math.sqrt(va * vb);
}

/**
 * Kahden samankokoisen harmaasävykuvan (0–255) rakenne-ero.
 * ssim: keskimääräinen SSIM 8×8-ikkunoissa (askel 4, C1 = (0.01·255)²,
 * C2 = (0.03·255)²), rajattu välille 0–1. reunat: Sobel-reunakarttojen
 * Pearson-korrelaatio, rajattu välille 0–1.
 * @param {Uint8Array|Uint8ClampedArray|Float32Array|number[]} harmaaA
 * @param {Uint8Array|Uint8ClampedArray|Float32Array|number[]} harmaaB
 * @param {number} leveys
 * @param {number} korkeus
 * @returns {{ssim:number, reunat:number}}
 */
export function kuvaEro(harmaaA, harmaaB, leveys, korkeus) {
  const n = leveys * korkeus;
  if (harmaaA.length !== n || harmaaB.length !== n) {
    throw new Error(`kuvaEro: taulukoiden koko ${harmaaA.length}/${harmaaB.length} ≠ ${leveys}×${korkeus}`);
  }
  const C1 = (0.01 * 255) ** 2, C2 = (0.03 * 255) ** 2;
  const IK = 8, ASKEL = 4;
  const ikkuna = Math.min(IK, leveys, korkeus);
  let summa = 0, lkm = 0;
  const alut = (koko) => {
    const t = [];
    for (let s = 0; s + ikkuna <= koko; s += ASKEL) t.push(s);
    if (t[t.length - 1] !== koko - ikkuna) t.push(koko - ikkuna);
    return t;
  };
  const xt = alut(leveys), yt = alut(korkeus);
  const m = ikkuna * ikkuna;
  for (const y0 of yt) {
    for (const x0 of xt) {
      let sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
      for (let y = y0; y < y0 + ikkuna; y++) {
        const rivi = y * leveys;
        for (let x = x0; x < x0 + ikkuna; x++) {
          const a = harmaaA[rivi + x], b = harmaaB[rivi + x];
          sa += a; sb += b; saa += a * a; sbb += b * b; sab += a * b;
        }
      }
      const ma = sa / m, mb = sb / m;
      const va = saa / m - ma * ma, vb = sbb / m - mb * mb, kov = sab / m - ma * mb;
      summa += ((2 * ma * mb + C1) * (2 * kov + C2))
        / ((ma * ma + mb * mb + C1) * (va + vb + C2));
      lkm++;
    }
  }
  const rajaa = (x) => Math.max(0, Math.min(1, x));
  return {
    ssim: rajaa(summa / lkm),
    reunat: rajaa(korrelaatio(sobel(harmaaA, leveys, korkeus), sobel(harmaaB, leveys, korkeus))),
  };
}

/**
 * Kuvaero parhaalla pystysiirrolla (± rajat.kuvaSiirto korkeudesta): natiivin turva-alue siirtää
 * koko sisältöä, ja pikselikohtainen SSIM romahtaisi siitä, vaikka ulkoasu on sama.
 * Vertaa päällekkäistä osaa; palauttaa { ssim, reunat, siirtoY } (siirtoY kuvan riveinä).
 */
export function kuvaEroSiirrolla(harmaaA, harmaaB, leveys, korkeus, rajat = {}) {
  const r = { ...OLETUSRAJAT, ...rajat };
  const maksimi = Math.floor(korkeus * r.kuvaSiirto);
  let paras = { ...kuvaEro(harmaaA, harmaaB, leveys, korkeus), siirtoY: 0 };
  for (let dy = -maksimi; dy <= maksimi; dy++) {
    if (!dy) continue;
    const h = korkeus - Math.abs(dy);
    const a = dy > 0 ? harmaaA.subarray(0, h * leveys) : harmaaA.subarray(-dy * leveys);
    const b = dy > 0 ? harmaaB.subarray(dy * leveys) : harmaaB.subarray(0, h * leveys);
    const t = kuvaEro(a, b, leveys, h);
    if (t.ssim + t.reunat > paras.ssim + paras.reunat) paras = { ...t, siirtoY: dy };
  }
  return paras;
}

// ---------------------------------------------------------------- tuomio

const lyhenna = (t, n = 40) => {
  const s = String(t ?? '').replace(/\s+/g, ' ').trim();
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
};
const etumerkki = (v) => `${v >= 0 ? '+' : '-'}${Math.abs(Math.round(v))}`;
const pyor1 = (v) => Math.round(v * 10) / 10;

/**
 * Näkymän tuomio.
 * @param {{parit:object[], vainWeb:object[], vainNatiivi:object[], natiiviPuuttuu?:boolean}} paritus
 *   parita()-kutsun tulos; natiiviPuuttuu = natiivin laatikkolista puuttui tai oli tyhjä.
 * @param {{ssim:number, reunat:number}|null} [kuva] kuvaEro()-tulos, tai null
 * @param {object} [rajat] OLETUSRAJAT-ohitukset
 * @returns {{tila:'SAMA'|'ERI'|'PUUTTUU', eroPx:number|null, syyt:string[]}}
 */
export function tuomio(paritus, kuva = null, rajat = {}) {
  const r = { ...OLETUSRAJAT, ...rajat };
  const parit = paritus?.parit || [];
  const vainWeb = paritus?.vainWeb || [];
  const vainNatiivi = paritus?.vainNatiivi || [];
  const webTekstit = parit.length + vainWeb.length;

  // Koko näkymän yhteinen siirto vähennetään, kun se mahtuu rajaan (turva-alue); muuten se on itse ero.
  const siirto = paritus?.siirto ?? { dx: 0, dy: 0 };
  const pan = paritus?.paneeli;
  const siirtoOk = !pan || (Math.abs(siirto.dx) <= pan.w * r.siirtoOsuus && Math.abs(siirto.dy) <= pan.h * r.siirtoOsuus);
  const sx = siirtoOk ? siirto.dx : 0, sy = siirtoOk ? siirto.dy : 0;
  const ero = (p) => ({ dx: p.dx - sx, dy: p.dy - sy });
  const poikkeama = (p) => (r.sallitutPoikkeamat ?? []).find((s) => s.teksti.test(p.web.avain ?? normalisoi(p.web.teksti))
    && (s.yEnintaan == null || p.web.y + p.web.h / 2 <= s.yEnintaan));
  const sallitut = parit.filter(poikkeama);
  const mitattavat = parit.filter((p) => !poikkeama(p));
  const eroPx = mitattavat.length
    ? pyor1(Math.max(...mitattavat.map((p) => { const e = ero(p); return p.pitka ? Math.abs(e.dy) : Math.max(Math.abs(e.dx), Math.abs(e.dy)); })))
    : null;

  // PUUTTUU: natiivista ei saatu mitään tai suurin osa teksteistä puuttuu.
  if (paritus?.natiiviPuuttuu || paritus == null) {
    return { tila: 'PUUTTUU', eroPx: null, syyt: ['natiivin laatikkolista puuttuu tai on tyhjä'] };
  }
  if (webTekstit > 0 && parit.length === 0 && vainNatiivi.length === 0) {
    return { tila: 'PUUTTUU', eroPx: null, syyt: ['natiivissa ei yhtään näkyvää tekstiä', ...vainWeb.slice(0, 5).map((e) => `vain webissä: "${lyhenna(e.teksti)}"`)] };
  }
  if (webTekstit > 0 && vainWeb.length / webTekstit > r.puuttuuOsuus) {
    return {
      tila: 'PUUTTUU',
      eroPx,
      syyt: [`${vainWeb.length}/${webTekstit} webin tekstiä puuttuu natiivista`,
        ...vainWeb.map((e) => `vain webissä: "${lyhenna(e.teksti)}"`)],
    };
  }

  const syyt = [];
  let eri = false;

  const sallittu = Math.max(r.puuttuvatVahintaan, Math.floor(webTekstit * r.puuttuvatOsuus));
  if (vainWeb.length > sallittu) eri = true;
  const sallittuYli = Math.max(r.puuttuvatVahintaan, Math.floor(webTekstit * r.ylimaaraisetOsuus));
  if (vainNatiivi.length > sallittuYli) eri = true;

  // Sijainti ja koko, suurin ero ensin.
  const sijainti = [], koko = [];
  for (const p of mitattavat) {
    const nimi = `"${lyhenna(p.web.teksti)}"`;
    const osat = [];
    const e = ero(p);
    if (!p.pitka && Math.abs(e.dx) > r.sijaintiPx) osat.push(`dx ${etumerkki(e.dx)} px`);
    if (Math.abs(e.dy) > r.sijaintiPx) osat.push(`dy ${etumerkki(e.dy)} px`);
    if (osat.length) {
      sijainti.push({ paino: Math.max(p.pitka ? 0 : Math.abs(e.dx), Math.abs(e.dy)), rivi: `${nimi}: ${osat.join(', ')}` });
    }
    // Koko vain tarkoille lyhyille pareille: katkaistun tai rivittyvän
    // tekstin laatikko ei ole vertailukelpoinen.
    if (p.laatu === 'tarkka' && !p.pitka) {
      const k = [];
      const suht = (d, perus) => (perus > 0 ? d / perus : 0);
      const sw = suht(p.dw, p.web.w), sh = suht(p.dh, p.web.h);
      if (Math.abs(sw) > r.kokoOsuus && Math.abs(p.dw) > r.kokoMinPx) k.push(`leveys ${etumerkki(sw * 100)} %`);
      if (Math.abs(sh) > r.kokoOsuus && Math.abs(p.dh) > r.kokoMinPx) k.push(`korkeus ${etumerkki(sh * 100)} %`);
      if (k.length) koko.push({ paino: Math.max(Math.abs(sw), Math.abs(sh)), rivi: `${nimi}: ${k.join(', ')}` });
    }
  }
  if (sijainti.length) eri = true;
  if (koko.length) eri = true;

  // Rakenne kuvista.
  if (kuva && (kuva.ssim < r.ssim || kuva.reunat < r.reunat)) {
    eri = true;
    syyt.push(`rakenne eri: ssim ${kuva.ssim.toFixed(2)} (raja ${r.ssim}), reunat ${kuva.reunat.toFixed(2)} (raja ${r.reunat})`);
  }

  if (vainWeb.length > sallittu) {
    syyt.push(...vainWeb.map((e) => `vain webissä: "${lyhenna(e.teksti)}"`));
  }
  syyt.push(...sijainti.sort((a, b) => b.paino - a.paino).map((s) => s.rivi));
  syyt.push(...koko.sort((a, b) => b.paino - a.paino).map((s) => s.rivi));
  if (vainNatiivi.length > sallittuYli) {
    syyt.push(...vainNatiivi.map((e) => `vain natiivissa: "${lyhenna(e.teksti)}"`));
  }
  // Sallitut puuttumiset kerrotaan silti, mutta viimeisinä.
  if (vainWeb.length && vainWeb.length <= sallittu) {
    syyt.push(...vainWeb.map((e) => `vain webissä (sallittu): "${lyhenna(e.teksti)}"`));
  }
  if (vainNatiivi.length && vainNatiivi.length <= sallittuYli) {
    syyt.push(...vainNatiivi.map((e) => `vain natiivissa (sallittu): "${lyhenna(e.teksti)}"`));
  }

  for (const p of sallitut) {
    const e = ero(p);
    if (Math.abs(e.dx) > r.sijaintiPx || Math.abs(e.dy) > r.sijaintiPx) {
      syyt.push(`"${lyhenna(p.web.teksti)}": dx ${etumerkki(e.dx)} px, dy ${etumerkki(e.dy)} px (sallittu poikkeama: ${poikkeama(p).syy})`);
    }
  }
  if (sx || sy) syyt.push(`koko näkymä siirtynyt dx ${etumerkki(sx)} px, dy ${etumerkki(sy)} px (turva-alue; vähennetty)`);
  return { tila: eri ? 'ERI' : 'SAMA', eroPx, syyt };
}

/**
 * Koko ketju yhdellä kutsulla: skaalaus, paritus ja tuomio.
 * natiivi null tai tyhjä elementtilista → PUUTTUU.
 */
export function vertaa(web, natiivi, kuva = null, rajat = {}) {
  if (!natiivi || !lista(natiivi).length) {
    return { ...tuomio({ parit: [], vainWeb: [], vainNatiivi: [], natiiviPuuttuu: true }, kuva, rajat), paritus: null };
  }
  const paritus = parita(web, natiivi, rajat);
  return { ...tuomio(paritus, kuva, rajat), paritus };
}

// ---------------------------------------------------------------- raportit

const mdSolu = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

/**
 * Markdown-taulu: | # | Näkymä | Koko | Tulos | Ero | Syyt |, syitä enintään 3.
 * @param {{rivi:number|string, nimi:string, koko:string, tila:string, eroPx:number|null, syyt:string[]}[]} rivit
 */
export function markdownTaulu(rivit) {
  const ulos = ['| # | Näkymä | Koko | Tulos | Ero | Syyt |', '|---|---|---|---|---|---|'];
  for (const r of rivit) {
    const syyt = r.syyt || [];
    const nayta = syyt.slice(0, 3).map(mdSolu).join('; ') + (syyt.length > 3 ? ` (+${syyt.length - 3})` : '');
    const ero = r.eroPx == null ? '–' : `${pyor1(r.eroPx)} px`;
    ulos.push(`| ${mdSolu(r.rivi)} | ${mdSolu(r.nimi)} | ${mdSolu(r.koko)} | ${mdSolu(r.tila)} | ${ero} | ${nayta || '–'} |`);
  }
  return `${ulos.join('\n')}\n`;
}

const html = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

/**
 * Itsenäinen HTML-kontaktiarkki: rivi per näkymä×koko, web- ja natiivikuva
 * rinnakkain (suhteelliset polut), tila värikoodattuna, syyt listana ja
 * suodatinnapit. Ei ulkoisia resursseja, toimii offline.
 */
export function kontaktiarkki(rivit, otsikko = 'Pariteettiajo') {
  // VIRHE = tila ei täsmännyt (tilavartija tai webin todennus): ei ero vaan ajon ongelma.
  const TILAT = ['SAMA', 'ERI', 'PUUTTUU', 'VAIN-NATIIVISSA', 'VIRHE'];
  const maarat = Object.fromEntries(TILAT.map((t) => [t, rivit.filter((r) => r.tila === t).length]));
  const kuva = (polku, kuvaus) => (polku
    ? `<a href="${html(polku)}"><img src="${html(polku)}" alt="${html(kuvaus)}" loading="lazy"></a>`
    : `<div class="eikuvaa">ei kuvaa</div>`);
  const kortit = rivit.map((r) => {
    const tila = TILAT.includes(r.tila) ? r.tila : 'PUUTTUU';
    const syyt = (r.syyt || []).map((s) => `<li>${html(s)}</li>`).join('');
    const ero = r.eroPx == null ? '' : ` · ero ${html(pyor1(r.eroPx))} px`;
    return `<section class="rivi" data-tila="${tila}">
  <header><span class="nro">${html(r.rivi)}</span> <b>${html(r.nimi)}</b> <span class="koko">${html(r.koko)}</span>
    <span class="tila t-${tila}">${tila}</span><span class="ero">${ero}</span></header>
  <div class="kuvat"><figure>${kuva(r.webKuva, `web: ${r.nimi}`)}<figcaption>web</figcaption></figure><figure>${kuva(r.natiiviKuva, `natiivi: ${r.nimi}`)}<figcaption>natiivi</figcaption></figure></div>
  ${syyt ? `<ul class="syyt">${syyt}</ul>` : ''}
</section>`;
  }).join('\n');

  return `<!doctype html>
<html lang="fi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${html(otsikko)}</title>
<style>
:root { --tausta:#f6f4ef; --pinta:#fff; --teksti:#1d1b18; --himmea:#6b665d; --raja:#ddd7cc;
  --sama:#1f7a3a; --eri:#b85c00; --puuttuu:#b3261e; --virhe:#5b5b66; color-scheme: light dark; }
@media (prefers-color-scheme: dark) {
  :root { --tausta:#161513; --pinta:#211f1c; --teksti:#ece8e1; --himmea:#a39d92; --raja:#3a3632;
    --sama:#4cc073; --eri:#f0a040; --puuttuu:#f06a60; --virhe:#a0a0ad; }
}
* { box-sizing: border-box; }
body { margin:0; padding:16px; background:var(--tausta); color:var(--teksti);
  font:15px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; }
h1 { font-size:20px; margin:0 0 12px; }
.suodattimet { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; position:sticky; top:0;
  background:var(--tausta); padding:8px 0; z-index:1; }
.suodattimet button { font:inherit; padding:6px 12px; border-radius:999px; border:1px solid var(--raja);
  background:var(--pinta); color:var(--teksti); cursor:pointer; }
.suodattimet button[aria-pressed="true"] { outline:2px solid currentColor; }
.suodattimet button.t-SAMA { color:var(--sama); } .suodattimet button.t-ERI { color:var(--eri); }
.suodattimet button.t-PUUTTUU { color:var(--puuttuu); } .suodattimet button.t-VIRHE { color:var(--virhe); }
.rivi { background:var(--pinta); border:1px solid var(--raja); border-radius:10px; padding:12px; margin-bottom:14px; }
.rivi header { display:flex; flex-wrap:wrap; gap:8px; align-items:baseline; margin-bottom:8px; }
.nro, .koko, .ero { color:var(--himmea); }
.tila { font-weight:700; padding:1px 8px; border-radius:6px; color:#fff; }
.tila.t-SAMA { background:var(--sama); } .tila.t-ERI { background:var(--eri); } .tila.t-PUUTTUU { background:var(--puuttuu); } .tila.t-VIRHE { background:var(--virhe); } .tila.t-VAIN-NATIIVISSA { background:#6b7280; }
.kuvat { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
figure { margin:0; min-width:0; }
figure img { width:100%; height:auto; display:block; border:1px solid var(--raja); border-radius:6px; }
figcaption { font-size:12px; color:var(--himmea); text-align:center; }
.eikuvaa { aspect-ratio:393/852; display:grid; place-items:center; border:1px dashed var(--raja);
  border-radius:6px; color:var(--himmea); }
.syyt { margin:8px 0 0; padding-left:20px; }
.piilossa { display:none; }
</style>
</head>
<body>
<h1>${html(otsikko)}</h1>
<nav class="suodattimet">
  <button type="button" data-suodatin="kaikki" aria-pressed="true">Kaikki (${rivit.length})</button>
${TILAT.map((t) => `  <button type="button" class="t-${t}" data-suodatin="${t}" aria-pressed="false">${t} (${maarat[t]})</button>`).join('\n')}
</nav>
<main>
${kortit}
</main>
<script>
(function () {
  var napit = document.querySelectorAll('[data-suodatin]');
  var rivit = document.querySelectorAll('.rivi');
  napit.forEach(function (nappi) {
    nappi.addEventListener('click', function () {
      var s = nappi.getAttribute('data-suodatin');
      napit.forEach(function (n) { n.setAttribute('aria-pressed', String(n === nappi)); });
      rivit.forEach(function (r) {
        r.classList.toggle('piilossa', s !== 'kaikki' && r.getAttribute('data-tila') !== s);
      });
    });
  });
})();
</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- komentorivi

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA) {
  const [webPolku, natiiviPolku] = process.argv.slice(2);
  if (!webPolku) {
    console.error('Käyttö: node tools/pariteetti-vertailu.mjs web.json [natiivi.json]');
    process.exit(2);
  }
  const lue = (p) => JSON.parse(readFileSync(p, 'utf8'));
  const tulos = vertaa(lue(webPolku), natiiviPolku ? lue(natiiviPolku) : null);
  console.log(`${tulos.tila}${tulos.eroPx == null ? '' : ` (suurin ero ${tulos.eroPx} px)`}`);
  for (const s of tulos.syyt) console.log(`  - ${s}`);
  process.exit(tulos.tila === 'SAMA' ? 0 : 1);
}
