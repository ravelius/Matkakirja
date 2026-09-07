/*
 * PERGAMENTIN REPALEINEN REUNA — yhteinen osa (omistaja 7.9.2026 ilta,
 * iPad, Ihmisen matkan avauslaatikko, sanatarkasti: *"Paperin rosoiset
 * reunat ovat aivan liian geometrisiä ja niiden takaa näkyy täysin
 * mustaa, vaikka paperin ympärillä on sitten kevyt hehku. Saisiko sen
 * paperin ääriviivan tehtyä luonnollisemmin? Tämä on kuitenkin monessa
 * paikkaa toistuva osa, niin voi tehdä huolella."*).
 *
 * MIKÄ OLI VIKANA. Reuna oli clip-path-monikulmio, jossa oli kahdeksan
 * pistettä reunaa kohti tasavälein. Silmä lukee tasavälisen sahalaidan
 * kuviona eikä repeämänä. Pahempi vika oli kajo: hehku piirrettiin
 * leikkaamattoman KEHYKSEN suorakulmaisena box-shadow'na, joten
 * jokaisen loven pohjalla — leikatun paperin ja suorakulmaisen hehkun
 * välissä — näkyi puhdasta mustaa.
 *
 * MITEN NYT. Kaksi kuvaa, sama siemen, sama ääriviiva:
 *
 *   1. MASKI (repaleinenPaperi → --pergamentti-maski). Valkoinen
 *      suorakaide, jonka reunaa rikotaan KAHDELLA feTurbulence +
 *      feDisplacementMap -parilla: karkea aalto (baseFrequency 0,022,
 *      2 oktaavia, scale 12) antaa pitkän epäsäännöllisen mutkan ja
 *      hieno kohina (0,075, 3 oktaavia, scale 4,5) kuidun. Lopuksi
 *      feGaussianBlur 0,8 pehmentää leikkauksen kuiduksi, jottei
 *      reuna ole veitsellä leikattu. Kulmat ovat pohjapolussa jo
 *      viistetyt (arvottu 7–19 yksikköä), joten ne kuluvat enemmän
 *      kuin suorat sivut.
 *   2. HEHKU (--pergamentti-hehkukuva). SAMA polku ja samat siemenet,
 *      mutta lämpimänä täyttönä ja kahdesti sumennettuna (σ 9 ja 24)
 *      SVG:n sisällä. Kajo on siis paperin OMAN muodon sumennus: se
 *      myötäilee jokaista lovea eikä mustaa rakoa jää.
 *
 * MIKSI SVG-KUVANA EIKÄ CSS-SUODATTIMENA. Talon mittaus (css/aikajana.css
 * AVAUSJAKSO, 4.9.2026): iOS-kuoressa `filter: blur(...)` ja
 * `backdrop-filter` jäivät piirtymättä, mutta SVG-suodatin KUVANA
 * (background-image, data-URI) on piirtynyt joka kuoressa — paperin
 * kohinakerrokset tehtiin jo samalla tavalla. Siksi sumennus on
 * leivottu kuvan sisään eikä yhtään CSS-filteriä lisätä. Kuvat ovat
 * staattisia: laskenta tehdään kerran, ja lyhtyjen syke muuttaa vain
 * hehkukerroksen `opacity`-arvoa (--lyhty-ulko, js/lyhty.js).
 *
 * MITTASUHTEET. Kuvat venytetään elementin kokoon (`100% 100%`), joten
 * viewBox on laskettava laatikon OMASTA sivusuhteesta — muuten pitkän
 * laatikon pystyreunat venyisivät sileiksi ja vaakareunat rypistyisivät.
 * Leveys on aina 400 yksikköä ja korkeus 400 / suhde, jolloin yksi
 * yksikkö on yhtä monta pikseliä kummallakin akselilla ja repeämä on
 * samanmittainen joka reunalla. `repaleinenPaperi` mittaa suhteen
 * elementistä (getBoundingClientRect), joten kutsu kannattaa tehdä
 * vasta kun laatikko on asettunut.
 *
 * Polku on 12 yksikön marginaalilla; suurin siirtymä on
 * (12 + 4,5) / 2 = 8,25 yksikköä plus sumennus, joten repeämä mahtuu
 * marginaaliin eikä leikkaudu. Hehkukuvan viewBox on 1,3-kertainen ja
 * polku sen keskellä — kerros venytetään CSS:ssä `inset: -15%`, jolloin
 * kumpikin kuva saa AKSELEITTAIN saman venytyksen ja muodot osuvat
 * päällekkäin riippumatta laatikon koosta.
 *
 * SIEMEN. `siemenNimesta('Ihmisen matka')` antaa aina saman luvun,
 * joten sama laatikko saa aina saman reunan mutta kaksi eri laatikkoa
 * eivät ole identtisiä.
 *
 * Käyttö: css/styles.css osio "PERGAMENTIN REPALEINEN REUNA".
 */

/** Maskikuvan piirtoalue (yksikköä). Korkeus tulee laatikon sivusuhteesta. */
const LEVEYS = 400;
/** Oletussivusuhde (leveys / korkeus), kun elementtiä ei voi mitata. */
const OLETUSSUHDE = 4 / 3;
/** Korkeuden rajat: hyvin litteä tai hyvin kapea laatikko ei karkaa. */
const KORKEUS_MIN = 120;
const KORKEUS_MAX = 2400;

/** Sivusuhteesta piirtoalueen korkeus (yksikköä, isotrooppinen venytys). */
function piirtokorkeus(suhde) {
  const s = Number.isFinite(suhde) && suhde > 0 ? suhde : OLETUSSUHDE;
  return Math.round(Math.min(KORKEUS_MAX, Math.max(KORKEUS_MIN, LEVEYS / s)));
}
/** Polun marginaali: repeämä ja sumennus mahtuvat tähän leikkautumatta. */
const MARGINAALI = 12;
/** Hehkukerroksen kasvu joka suuntaan (sama luku CSS:n inset: -15%). */
export const HEHKU_KASVU = 0.15;
const HEHKU_KERROIN = 1 + 2 * HEHKU_KASVU;

/**
 * xorshift32 siemenestä. Sama siemen → sama sarja → sama reuna.
 * Puhdas funktio, jotta testi näkee muodon ilman selainta.
 */
function arpoja(siemen) {
  let s = (Math.abs(Math.trunc(siemen)) * 2654435761 + 1013904223) >>> 0;
  if (s === 0) s = 0x9e3779b9;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/** FNV-1a: nimestä vakaa siemen 0…9999 (sama nimi, sama reuna). */
export function siemenNimesta(nimi) {
  let h = 0x811c9dc5;
  const teksti = String(nimi ?? '');
  for (let i = 0; i < teksti.length; i += 1) {
    h ^= teksti.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h % 10000;
}

/** Pyöristys kahteen desimaaliin ilman turhia nollia (lyhyempi data-URI). */
const p = (n) => Number(n.toFixed(2));

/**
 * Paperin pohjapolku: suorakaide, jonka KULMAT ON VIISTETTY arvotuilla
 * mitoilla ja jonka sivuilla on pari loivaa aaltopistettä. Turbulenssi
 * tekee varsinaisen repeämän — tämä polku huolehtii siitä, ettei
 * lähtömuoto ole täydellinen suorakaide ja että kulmat ovat kuluneempia
 * kuin suorat sivut.
 *
 * @param {number} siemen   vakaa siemen
 * @param {number} korkeus  piirtoalueen korkeus yksikköinä
 * @param {number} dx       polun siirto x-suunnassa (hehkukuvan keskitys)
 * @param {number} dy       polun siirto y-suunnassa
 */
export function reunapolku(siemen, korkeus = piirtokorkeus(OLETUSSUHDE), dx = 0, dy = 0) {
  const arpa = arpoja(siemen);
  const L = dx + MARGINAALI;
  const O = dx + LEVEYS - MARGINAALI;
  const Y = dy + MARGINAALI;
  const A = dy + korkeus - MARGINAALI;
  // Kulmien viisteet: 7–19 yksikköä, jokainen kulma omansa.
  const viiste = () => 7 + arpa() * 12;
  const [vy1, vy2, vy3, vy4] = [viiste(), viiste(), viiste(), viiste()];
  const [vx1, vx2, vx3, vx4] = [viiste(), viiste(), viiste(), viiste()];
  /* Sivun väliaallot: kaksi pistettä epätasaisin välein, poikkeama ±3,5. */
  const aalto = (a, b, kiinnea, pysty) => {
    const pisteet = [];
    for (const osuus of [0.3 + arpa() * 0.12, 0.62 + arpa() * 0.14]) {
      const t = a + (b - a) * osuus;
      const poikkeama = kiinnea + (arpa() - 0.5) * 7;
      pisteet.push(pysty ? [poikkeama, t] : [t, poikkeama]);
    }
    return pisteet;
  };
  const pisteet = [
    [L + vx1, Y],
    ...aalto(L + vx1, O - vx2, Y, false),
    [O - vx2, Y],
    [O, Y + vy2],
    ...aalto(Y + vy2, A - vy3, O, true),
    [O, A - vy3],
    [O - vx3, A],
    ...aalto(O - vx3, L + vx4, A, false),
    [L + vx4, A],
    [L, A - vy4],
    ...aalto(A - vy4, Y + vy1, L, true),
    [L, Y + vy1],
  ];
  return `M${pisteet.map(([x, y]) => `${p(x)} ${p(y)}`).join('L')}Z`;
}

/*
 * Yhteinen repeämäsuodatin (kaksi turbulenssia + pehmennys).
 * `userSpaceOnUse` koko piirtoalueelle: suodatinalue ei silloin riipu
 * polun laatikosta, joten sumennus mahtuu kuvaan yhtä hyvin litteällä
 * kuin kapealla laatikolla — ja turbulenssin kuvio pysyy paikallaan.
 */
function repeamaSuodatin(tunnus, siemen, leveys, korkeus, lisa = '') {
  const s1 = siemen % 97;
  const s2 = (siemen * 7 + 31) % 89;
  return `<filter id="${tunnus}" filterUnits="userSpaceOnUse" `
    + `x="0" y="0" width="${leveys}" height="${korkeus}" `
    + 'color-interpolation-filters="sRGB">'
    + `<feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="${s1}" result="karkea"/>`
    + '<feDisplacementMap in="SourceGraphic" in2="karkea" scale="12" '
    + 'xChannelSelector="R" yChannelSelector="G" result="mutka"/>'
    + `<feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="3" seed="${s2}" result="hieno"/>`
    + '<feDisplacementMap in="mutka" in2="hieno" scale="4.5" '
    + 'xChannelSelector="R" yChannelSelector="G" result="reuna"/>'
    + (lisa || '<feGaussianBlur in="reuna" stdDeviation="0.8"/>')
    + '</filter>';
}

const dataUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/**
 * MASKIKUVA: valkoinen repaleinen arkki mustaa (läpinäkyvää) vasten.
 * `mask-image` lukee kuvan ALFAN, joten muoto on valkoinen ja
 * ulkopuoli tyhjä — mustaa ei saa maalata, se lukisi peittävänä.
 */
export function maskiKuva(siemen = 0, suhde = OLETUSSUHDE) {
  const k = piirtokorkeus(suhde);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LEVEYS}" height="${k}" `
    + `viewBox="0 0 ${LEVEYS} ${k}" preserveAspectRatio="none">`
    + repeamaSuodatin('r', siemen, LEVEYS, k)
    + `<path d="${reunapolku(siemen, k)}" fill="#ffffff" filter="url(#r)"/>`
    + '</svg>';
  return dataUri(svg);
}

/**
 * HEHKUKUVA: sama ääriviiva lämpimänä ja kahdesti sumennettuna. Kerros
 * asuu paperin ALLA ja on 1,3-kertainen (CSS `inset: -15%`), joten
 * sumennus mahtuu kuvaan eikä leikkaudu elementin reunaan.
 */
export function hehkuKuva(siemen = 0, suhde = OLETUSSUHDE, vari = '#ff9c3c') {
  const k = piirtokorkeus(suhde);
  const w = Math.round(LEVEYS * HEHKU_KERROIN);
  const h = Math.round(k * HEHKU_KERROIN);
  const suodatin = repeamaSuodatin('h', siemen, w, h,
    '<feGaussianBlur in="reuna" stdDeviation="9" result="lahi"/>'
    + '<feGaussianBlur in="reuna" stdDeviation="18" result="kauko"/>'
    + '<feMerge><feMergeNode in="kauko"/><feMergeNode in="lahi"/></feMerge>');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `
    + `viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`
    + suodatin
    + `<path d="${reunapolku(siemen, k, (w - LEVEYS) / 2, (h - k) / 2)}" `
    + `fill="${vari}" filter="url(#h)"/>`
    + '</svg>';
  return dataUri(svg);
}

/**
 * Antaa elementille repaleisen paperin reunan.
 *
 *   repaleinenPaperi(laatikko, { siemen: siemenNimesta(otsikko), hehku })
 *
 * Sivusuhde mitataan elementistä, ellei sitä anneta (`suhde`). Kutsu
 * siis VASTA kun laatikko on asettunut, tai anna suhde itse.
 *
 * `hehku` on valinnainen SISARELEMENTTI paperin alla (sama vanhempi,
 * position: relative): se saa saman muodon lämpimänä kajona, jolloin
 * hehku myötäilee reunaa eikä mustaa rakoa jää. Kajon voimakkuus tulee
 * CSS:ssä lyhtyjen muuttujasta --lyhty-ulko (js/lyhty.js).
 *
 * Palauttaa elementin, jotta kutsu voi ketjuttua.
 */
export function repaleinenPaperi(el, { siemen = 0, hehku = null, vari = '#ff9c3c', suhde = 0 } = {}) {
  if (!el?.style?.setProperty) return el;
  let s = suhde;
  if (!(s > 0)) {
    const r = el.getBoundingClientRect?.();
    s = r && r.width > 0 && r.height > 0 ? r.width / r.height : OLETUSSUHDE;
  }
  el.classList?.add?.('pergamentti-repale');
  el.style.setProperty('--pergamentti-maski', `url("${maskiKuva(siemen, s)}")`);
  if (hehku?.style?.setProperty) {
    hehku.classList?.add?.('pergamentti-hehku');
    hehku.style.setProperty('--pergamentti-hehkukuva', `url("${hehkuKuva(siemen, s, vari)}")`);
  }
  return el;
}
