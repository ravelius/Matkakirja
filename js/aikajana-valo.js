/*
 * ELÄVÄ LIEKKIVALO AIKAJANAN LAMPUKSI (js/aikajana.js, keksintölinssi
 * pallolaudalla).
 *
 * Omistaja 5.9.2026 klo 00.45 työpöydältä, sanatarkasti: *"saisiko
 * valopallosta epäsäännöllisemmän ja elävämmän muotoisen ja niin että
 * se sykkisi kuin tulen liekki? … valon syttyminenkin voisi olla
 * animoitu niin että se hetken hehkuu pienempänä ja sitten laajenee.
 * keskiosa saisi olla kirkkaampi ja sitten häipyä pidemmällä matkalla
 * ja pehmeämmin, mutta logaritmisesti (tai ainakin melkein) aivan kuin
 * oikea valo. valot voisivat myös olla hieman erilaisia keskenään
 * varioiden kirkkautta, kokoa, värilämpötilaa ja muotoa."*
 *
 * ── MIKSI OMA MODUULI JA MIKSI CANVAS ─────────────────────────────
 *
 * Lamppu oli neljä SVG-ympyrää liukuvärillä (css/aikajana.css
 * .aikajana-valo-*), ja kolme pyydettyä asiaa ovat sille mahdottomia:
 * epäsäännöllinen reuna, liekin syke ja LIKIMAIN KÄÄNTEINEN NELIÖ eli
 * pitkälle jatkuva pehmeä häntä. `radialGradient` interpoloi
 * pysäkkiensä välit LINEAARISESTI, joten kirkas keskusta ja pitkä
 * häntä eivät mahdu samaan ympyrään ilman kymmentä pysäkkiä — ja
 * silloinkin muoto on ympyrä. Canvas 2D piirtää saman profiilin
 * kerran valmiiksi (offscreen) ja kehyskohtainen työ on kolme
 * `drawImage`-vetoa maskin läpi.
 *
 * MODUULI ON OMA, koska js/aikajana.js on jo 3 500 riviä ja koska
 * toinen sessio yleistää samaan aikaan sen kelloa ja kaarta uudelle
 * linssille. Moottori kutsuu tästä vain kolmea asiaa: `lamppu(n)`,
 * `tila(n, palaa, nykyinen)` ja `pura()`.
 *
 * VAIN PALLOLAUTA (kirjattu tietoisesti). Tasokartan (`?lauta=kartta`)
 * lamput ovat kartan omassa svg:ssä laudan koordinaatistossa: ne
 * skaalautuvat zoomin mukana (js/aikajana.js paivitaMittakaava) ja
 * asuvat kartan maskin kanssa samassa puussa. Canvas-kerros ei ole
 * siellä yhteinen vaan olisi oma rinnakkainen totuutensa, ja vanha
 * kartta suljetaan aallossa 3B (docs/moduulit/karttapallo.md luku 10),
 * joten liekki on pallon oma. Kartan lamput jäävät ennalleen.
 *
 * VARAPOLKU ILMAN CANVASIA: `lamppu()` palauttaa null, jos selain (tai
 * testien tynkäselain) ei anna 2D-kontekstia — kutsuja piirtää silloin
 * entisen SVG-lampun. Näin linssi ei koskaan jää pimeäksi.
 *
 * EI KIRJASTOA. Kohina, arpoja ja profiili ovat tässä omana
 * kymmenrivisenä koodinaan; mitään ei ladata (pelin sääntö: kirjastot
 * tulevat pelin omasta ämpäristä eivätkä CDN:stä, ja tähän ei tarvita
 * yhtään).
 */

/* ==================== MITAT JA VAKIOT ==================== */

/**
 * Valon säde ruutupikseleinä täydessä koossa. Sama mitta kuin vanhan
 * lampun uloimmalla kajolla (js/aikajana.js MERKIN_SADE × KAJON_SUHDE
 * = 7 × 7), jotta kirkkaan keskuksen ja hehkun suhde ruudulla pysyy.
 */
export const VALON_SADE_PX = 49;
/**
 * Piirtoruudun sivu ruutupikseleinä. Kokovariaatio (±20 %) ja sykkeen
 * huojunta kasvattavat suurimman säteen noin 1,3-kertaiseksi, joten
 * ruutu on sen verran kajoa isompi — muuten liekin laita leikkautuisi
 * suoraksi viivaksi juuri siellä, missä sen pitää hävitä olemattomiin.
 */
export const VALON_RUUTU_PX = 128;
/** Piirron tiheys: 30 fps riittää liekille ja jättää kehyksen kevyeksi. */
export const VALON_PIIRTOVALI_MS = 33;
/** Kuinka moni lamppu saa elää yhtä aikaa (koko kaari = 25 pysäkkiä). */
export const VALON_KEHYSKATTO = 25;

/*
 * PROFIILI (omistaja: *"keskiosa saisi olla kirkkaampi ja sitten
 * häipyä pidemmällä matkalla ja pehmeämmin, mutta logaritmisesti (tai
 * ainakin melkein) aivan kuin oikea valo"*).
 *
 * Oikea pistevalo vaimenee käänteisen neliön lailla, ja se on tässä
 * suoraan kaavana:
 *
 *     I(r) = 1 / (1 + (r / r0)^2)
 *
 * — kirkas ja lähes tasainen ytimen sisällä (r < r0), sitten pitkä,
 * hitaasti hiipuvä häntä. Kirjastoissa tapana oleva lineaarinen
 * liukuväri putoaa suoraan viivaa pitkin nollaan; tämä ei putoa, vaan
 * jatkuu himmeänä koko matkan. Ruudun laidalla arvo EI ole nolla
 * (0,025), joten profiili normalisoidaan vähentämällä laidan arvo:
 * reunaviivaa ei jää mihinkään.
 */
export const VALON_YDIN_OSUUS = 0.2;
export const VALON_PROFIILIN_EKSPONENTTI = 2;
/** Gradientin pysäkkien määrä: tiheämmin keskellä (paino alla). */
export const VALON_PYSAKKEJA = 28;
export const VALON_PYSAKIN_PAINO = 1.7;

/*
 * SYTTYMINEN (omistaja: *"valon syttyminen … hetken hehkuu pienempänä
 * ja sitten laajenee"*). Kaksi vaihetta: ensin lyhyt kirkas hehku
 * pienenä, sitten pitkä laajeneminen täyteen kokoon ease-outilla.
 */
export const VALON_HEHKU_MS = 300;
export const VALON_LAAJENNUS_MS = 900;
export const VALON_SYTTYMA_MS = VALON_HEHKU_MS + VALON_LAAJENNUS_MS;
/** Hehkuvaiheen koko täydestä säteestä. */
export const VALON_ALKUKOKO = 0.3;
/** Hehkuvaiheen kirkkaus: yli täyden, siksi se luetaan leimahdukseksi. */
export const VALON_ALKUKIRKKAUS = 1.35;

/*
 * SYKE (omistaja: *"sykkisi kuin tulen liekki"*). Liekki ei sydämen
 * lailla lyö tasaista tahtia, joten perustaajuuden päällä on toinen,
 * epäharmoninen ääni ja sen päällä hidas kohina — sama resepti kuin
 * lyhdyissä (js/lyhty.js), mutta tässä kehyskohtaisena lukuna.
 */
export const VALON_SYKE_HZ = [0.8, 1.6];
export const VALON_SYKE_SADE = 0.07;
export const VALON_SYKE_KIRKKAUS = 0.09;

/*
 * MUOTO (omistaja: *"epäsäännöllisemmän ja elävämmän muotoisen"*).
 * 2–4 kulmaharmonista + hidas kohina: reuna kumpuilee eikä ole
 * ympyrä, ja kumpuilu liikkuu hitaasti kuin liekin laita.
 */
export const VALON_HARMONIOITA = [2, 4];
export const VALON_HARMONIAN_VOIMA = [0.06, 0.17];
export const VALON_KOHINAN_VOIMA = 0.11;
/** Monikulmion kärkiä liekin reunalla: 48 riittää pehmeään laitaan. */
export const VALON_KARKIA = 48;

/*
 * VARIAATIO VALOITTAIN (omistaja: *"valot voisivat myös olla hieman
 * erilaisia keskenään varioiden kirkkautta, kokoa, värilämpötilaa ja
 * muotoa"*). Siemen on tapahtuman numero, joten sama keksintö saa
 * kaaresta toiseen saman valon eikä mikään arvota kahdesti.
 */
export const VALON_VARIAATIO_KIRKKAUS = 0.15;
export const VALON_VARIAATIO_KOKO = 0.2;

/** Ohitettu lamppu jää hehkumaan himmeänä (sama sääntö kuin css:ssä). */
export const VALON_JALJEN_KIRKKAUS = 0.34;
/** Ohitetun lampun säde: hieman pienempi, jotta nykyinen erottuu. */
export const VALON_JALJEN_KOKO = 0.82;
/** Jäljeksi jäämisen liuku (ms): kirkkaus laskee pehmeästi, ei leikaten. */
export const VALON_HIIPUMA_MS = 1600;

/*
 * VÄRILÄMPÖTILA. Lämmin pää on kynttilän oranssi (n. 1 800 K) ja
 * vaalea pää lampun kellertävä (n. 2 700 K); molemmissa ydin on lähes
 * valkoinen, kuten oikeassa ylivalottuvassa liekissä. Sävyt ovat
 * samasta perheestä kuin entisen SVG-lampun liukuväri (#fff7dc,
 * #ffd066, #f09a2a), jotta linssin yleisilme ei muutu.
 */
export const VALON_VARIT = {
  lammin: { ydin: [255, 244, 209], keski: [255, 186, 84], laita: [236, 126, 28] },
  vaalea: { ydin: [255, 252, 236], keski: [255, 220, 148], laita: [246, 196, 92] },
};

/* ==================== PUHTAAT FUNKTIOT ==================== */

/**
 * Valon säteittäinen profiili: 1 keskellä, 0 laidalla, väliltä
 * likimain käänteinen neliö. `r` on 0…1 (osuus säteestä).
 *
 * @param {number} r etäisyys keskeltä, 0…1
 * @param {number} r0 ytimen osuus säteestä
 * @returns {number} intensiteetti 0…1
 */
export function valonProfiili(r, r0 = VALON_YDIN_OSUUS) {
  const x = Math.max(0, Math.min(1, Number.isFinite(r) ? r : 1));
  const laske = (u) => 1 / (1 + ((u / r0) ** VALON_PROFIILIN_EKSPONENTTI));
  const laita = laske(1);
  return (laske(x) - laita) / (1 - laita);
}

/** Kokonaisluku sekoitetaan tasajakoiseksi luvuksi 0…1 (ei kirjastoa). */
function sekoita(n) {
  let x = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/** Tapahtuman numerosta vakaa siemen (sama numero → sama valo). */
export function valonSiemen(n) {
  return (Math.abs(Math.trunc(Number(n) || 0)) * 2654435761) % 4294967291;
}

/** Arpoja, joka antaa aina saman jonon samasta siemenestä. */
export function valonArpoja(siemen) {
  let t = (siemen >>> 0) || 1;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    return sekoita(t);
  };
}

/**
 * Pehmeä arvokohina (value noise) yhdessä ulottuvuudessa: hitaasti
 * vaeltava luku 0…1. Käytetään sykkeen ja muodon epäsäännöllisyyteen.
 */
export function valonKohina(x, siemen = 0) {
  const v = Number.isFinite(x) ? x : 0;
  const i = Math.floor(v);
  const f = v - i;
  const u = f * f * (3 - 2 * f);
  const a = sekoita(i + siemen * 131);
  const b = sekoita(i + 1 + siemen * 131);
  return a + (b - a) * u;
}

/**
 * Yhden valon oma luonne: kirkkaus, koko, värilämpötila, sykkeen tahti
 * ja reunan harmoniat. Determinististä: sama `n` antaa aina saman.
 *
 * @param {number} n tapahtuman numero
 * @returns {object} variaatio
 */
export function valonVariaatio(n) {
  const siemen = valonSiemen(n);
  const arvo = valonArpoja(siemen);
  const kirkkaus = 1 + ((arvo() * 2) - 1) * VALON_VARIAATIO_KIRKKAUS;
  const koko = 1 + ((arvo() * 2) - 1) * VALON_VARIAATIO_KOKO;
  const lampo = arvo();
  const sykeHz = VALON_SYKE_HZ[0] + arvo() * (VALON_SYKE_HZ[1] - VALON_SYKE_HZ[0]);
  const sykeVaihe = arvo() * Math.PI * 2;
  const [vahin, enin] = VALON_HARMONIOITA;
  const maara = vahin + Math.floor(arvo() * (enin - vahin + 1));
  const harmoniat = [];
  for (let i = 0; i < maara; i += 1) {
    harmoniat.push({
      k: 2 + i,
      voima: VALON_HARMONIAN_VOIMA[0] + arvo() * (VALON_HARMONIAN_VOIMA[1] - VALON_HARMONIAN_VOIMA[0]),
      vaihe: arvo() * Math.PI * 2,
      nopeus: 0.15 + arvo() * 0.5,
    });
  }
  return {
    n, siemen, kirkkaus, koko, lampo, sykeHz, sykeVaihe, harmoniat, kohinaSiirto: arvo() * 64,
  };
}

/**
 * SYTTYMISEN KAKSI VAIHETTA. Palauttaa kertoimet, joilla täysi säde ja
 * täysi kirkkaus kerrotaan.
 *
 * @param {number} ms syttymisestä kulunut aika
 * @param {boolean} reducedMotion ei animaatiota: heti täysi valo
 * @returns {{koko:number, kirkkaus:number, vaihe:string}}
 */
export function syttymisenVaihe(ms, reducedMotion = false) {
  if (reducedMotion) return { koko: 1, kirkkaus: 1, vaihe: 'palaa' };
  const t = Number.isFinite(ms) ? ms : 0;
  if (t <= 0) return { koko: VALON_ALKUKOKO * 0.35, kirkkaus: 0, vaihe: 'hehku' };
  if (t < VALON_HEHKU_MS) {
    // Hehku: koko pysyy pienenä, kirkkaus leimahtaa yli täyden.
    const p = t / VALON_HEHKU_MS;
    const nousu = 1 - ((1 - p) ** 2);
    return {
      koko: VALON_ALKUKOKO * (0.35 + 0.65 * nousu),
      kirkkaus: VALON_ALKUKIRKKAUS * nousu,
      vaihe: 'hehku',
    };
  }
  if (t < VALON_SYTTYMA_MS) {
    // Laajeneminen: ease-out täyteen kokoon, kirkkaus laskeutuu yhteen.
    const p = (t - VALON_HEHKU_MS) / VALON_LAAJENNUS_MS;
    const pehmea = 1 - ((1 - p) ** 3);
    return {
      koko: VALON_ALKUKOKO + (1 - VALON_ALKUKOKO) * pehmea,
      kirkkaus: VALON_ALKUKIRKKAUS + (1 - VALON_ALKUKIRKKAUS) * pehmea,
      vaihe: 'laajenee',
    };
  }
  return { koko: 1, kirkkaus: 1, vaihe: 'palaa' };
}

/**
 * Sykkeen kertoimet hetkellä `ms`: säde ja kirkkaus huojuvat 5–10 %
 * eri tahdissa, jottei valo pumppaa yhtenä kappaleena.
 */
export function sykkeenTila(ms, v, reducedMotion = false) {
  if (reducedMotion) return { sade: 1, kirkkaus: 1 };
  const t = (Number.isFinite(ms) ? ms : 0) / 1000;
  const perus = Math.sin(2 * Math.PI * v.sykeHz * t + v.sykeVaihe);
  const sivu = Math.sin(2 * Math.PI * v.sykeHz * 1.73 * t + v.sykeVaihe * 2.1);
  const hidas = (valonKohina(t * 0.6 + v.kohinaSiirto, v.siemen) * 2) - 1;
  const a = 0.5 * perus + 0.25 * sivu + 0.25 * hidas;
  const b = 0.5 * Math.sin(2 * Math.PI * v.sykeHz * t + v.sykeVaihe + 0.9) + 0.3 * sivu + 0.2 * hidas;
  return { sade: 1 + VALON_SYKE_SADE * a, kirkkaus: 1 + VALON_SYKE_KIRKKAUS * b };
}

/**
 * Liekin reunan säde kulmassa `kulma` (rad) hetkellä `ms`: ykkösen
 * ympärillä kumpuileva kerroin.
 */
export function liekinSade(kulma, ms, v, reducedMotion = false) {
  const t = reducedMotion ? 0 : (Number.isFinite(ms) ? ms : 0) / 1000;
  let s = 1;
  for (const h of v.harmoniat) s += h.voima * Math.cos(h.k * kulma + h.vaihe + h.nopeus * t);
  s += VALON_KOHINAN_VOIMA * (valonKohina((kulma * 1.5) / Math.PI + t * 0.35, v.siemen) - 0.5);
  return Math.max(0.5, s);
}

/** Kaksi sävyä sekoitettuna (0 = a, 1 = b). */
function sekoitaVari(a, b, p) {
  const q = Math.max(0, Math.min(1, p));
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * q));
}

/** Valon sävyt värilämpötilan mukaan. */
export function valonSavyt(lampo) {
  const { lammin, vaalea } = VALON_VARIT;
  return {
    ydin: sekoitaVari(lammin.ydin, vaalea.ydin, lampo),
    keski: sekoitaVari(lammin.keski, vaalea.keski, lampo),
    laita: sekoitaVari(lammin.laita, vaalea.laita, lampo),
  };
}

/* ==================== PIIRTO ==================== */

/**
 * Profiili omaan offscreen-canvasiin KERRAN valoa kohti: säteittäinen
 * liukuväri, jonka pysäkit luetaan `valonProfiili`sta. Kehyksessä tämä
 * vain venytetään (`drawImage`), joten kaava lasketaan yhden kerran.
 */
function teeProfiili(luoCanvas, savyt, sivu) {
  const kuva = luoCanvas(sivu, sivu);
  const ctx = kuva?.getContext?.('2d');
  if (!ctx) return null;
  const keski = sivu / 2;
  const liuku = ctx.createRadialGradient(keski, keski, 0, keski, keski, keski);
  for (let i = 0; i <= VALON_PYSAKKEJA; i += 1) {
    // Pysäkit tihenevät keskustaa kohti: siellä käyrä on jyrkin.
    const t = (i / VALON_PYSAKKEJA) ** VALON_PYSAKIN_PAINO;
    const I = valonProfiili(t);
    // Sävy kulkee ytimestä laitaan intensiteetin mukana, ei säteen:
    // kirkas keskusta on lähes valkoinen ja häntä lämmin.
    const vari = I > 0.5
      ? sekoitaVari(savyt.keski, savyt.ydin, (I - 0.5) * 2)
      : sekoitaVari(savyt.laita, savyt.keski, I * 2);
    liuku.addColorStop(Math.min(1, t), `rgba(${vari[0]}, ${vari[1]}, ${vari[2]}, ${I.toFixed(4)})`);
  }
  ctx.fillStyle = liuku;
  ctx.fillRect(0, 0, sivu, sivu);
  return kuva;
}

/**
 * Yksi valo omaan canvasiinsa. Kolme vetoa:
 *   1. pitkä pehmeä häntä (koko profiili),
 *   2. elävä liekinmuoto (profiili epäsäännöllisen maskin läpi),
 *   3. kirkas ydin.
 * Sekoitustapa on `lighter` eli intensiteetit lasketaan yhteen kuten
 * oikeat valot.
 *
 * @param {object} ctx canvasin 2D-konteksti
 * @param {object} valo { variaatio, profiili, alkoi, nykyinen, sammui }
 * @param {number} nyt kello (ms)
 * @param {object} asetukset { sivu, reducedMotion }
 */
export function piirraValo(ctx, valo, nyt, { sivu = VALON_RUUTU_PX, reducedMotion = false } = {}) {
  const v = valo.variaatio;
  ctx.clearRect(0, 0, sivu, sivu);
  if (!valo.palaa || !valo.profiili) return;
  const ika = nyt - valo.alkoi;
  const vaihe = syttymisenVaihe(ika, reducedMotion);
  const syke = sykkeenTila(nyt + v.sykeVaihe * 100, v, reducedMotion);
  // Jäljeksi jääminen on pitkä liuku, ei leikkaus (sama tuntuma kuin
  // vanhan lampun 1,6 s opacity-siirtymällä).
  let hiipuma = 0;
  if (!valo.nykyinen && valo.sammui > 0) {
    // Reduced motion: ei liukua — jälki on heti himmeä (Raamattu, sääntö 4).
    hiipuma = reducedMotion ? 1 : Math.min(1, Math.max(0, (nyt - valo.sammui) / VALON_HIIPUMA_MS));
  }
  const jaljella = valo.nykyinen ? 1 : (1 - hiipuma) + hiipuma * VALON_JALJEN_KIRKKAUS;
  const kokoJaljella = valo.nykyinen ? 1 : (1 - hiipuma) + hiipuma * VALON_JALJEN_KOKO;
  const sade = (sivu / 2) * v.koko * vaihe.koko * syke.sade * kokoJaljella;
  const kirkkaus = Math.max(0, Math.min(1, v.kirkkaus * vaihe.kirkkaus * syke.kirkkaus * jaljella));
  if (!(sade > 0) || kirkkaus <= 0) return;
  const keski = sivu / 2;
  const veda = (r, alfa) => {
    if (!(r > 0) || alfa <= 0) return;
    ctx.globalAlpha = Math.min(1, alfa);
    ctx.drawImage(valo.profiili, keski - r, keski - r, r * 2, r * 2);
  };
  const vanhaSekoitus = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = 'lighter';
  // 1. Häntä: koko profiili täyteen säteeseen.
  veda(sade, kirkkaus * 0.72);
  // 2. Liekin runko epäsäännöllisen maskin läpi. Maski on siellä,
  //    missä profiili on vielä näkyvä (0,85 x säde): siitä tulee valon
  //    ELÄVÄ MUOTO. Uloin häntä jää pyöreäksi kuten oikean valon kajo.
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i <= VALON_KARKIA; i += 1) {
    const kulma = (i / VALON_KARKIA) * Math.PI * 2;
    const r = sade * 0.85 * liekinSade(kulma, ika, v, reducedMotion);
    const x = keski + Math.cos(kulma) * r;
    const y = keski + Math.sin(kulma) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.clip();
  veda(sade * 0.9, kirkkaus * 0.6);
  ctx.restore();
  // 3. Kirkas ydin.
  veda(sade * 0.26, kirkkaus);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = vanhaSekoitus;
}

/* ==================== KERROS ==================== */

/**
 * Liekkivalojen kerros: jokaisella lampulla oma canvas, kaikilla yksi
 * yhteinen kehyssilmukka (30 fps). Kutsuja (js/aikajana.js) antaa
 * lampulle paikan itse — TÄMÄ MODUULI EI KOSKAAN SIIRRÄ ELEMENTTIÄ,
 * joten valo syttyy täsmälleen siinä pisteessä, johon kirjasto sen
 * asetti (omistaja 5.9.2026: *"valopallo tuli nyt jotenkin liikuen
 * paikoilleen"*).
 *
 * @param {object} asetukset { reducedMotion, sivu, dpr, luoCanvas, kello }
 * @returns {object} { tuettu, lamppu, tila, alusta, pura, piirra, valot }
 */
export function luoLiekkivalot({
  reducedMotion = false,
  sivu = VALON_RUUTU_PX,
  dpr = null,
  luoCanvas = null,
  kello = null,
} = {}) {
  const tee = luoCanvas ?? ((w, h) => {
    const c = globalThis.document?.createElement?.('canvas');
    if (!c) return null;
    c.width = w;
    c.height = h;
    return c;
  });
  const nytKello = kello ?? (() => (globalThis.performance?.now?.() ?? Date.now()));
  const tarkkuus = Math.min(2, Math.max(1, dpr ?? globalThis.devicePixelRatio ?? 1));
  const valot = new Map();
  let silmukka = 0;
  let viimeksi = 0;
  let purettu = false;

  /** Onko canvas käytettävissä? Tynkäselain ei anna 2D-kontekstia. */
  const koe = tee(2, 2);
  const tuettu = Boolean(koe?.getContext?.('2d'));

  const piirra = (nyt = nytKello()) => {
    let elavia = 0;
    for (const valo of valot.values()) {
      if (!valo.ctx) continue;
      // Elävä = palava lamppu liikkuvassa tilassa; katto pitää työn
      // kurissa, ja sammunut piirretään vain kerran (likainen).
      const elava = valo.palaa && !reducedMotion && elavia < VALON_KEHYSKATTO;
      if (!elava && !valo.likainen) continue;
      piirraValo(valo.ctx, valo, nyt, { sivu, reducedMotion });
      valo.likainen = false;
      if (valo.palaa) elavia += 1;
    }
    return elavia;
  };

  /*
   * Kehysjono luetaan KUTSUHETKELLÄ eikä moduulia ladattaessa: testien
   * tynkäselain asettaa oman jononsa vasta tuonnin jälkeen, ja Nodessa
   * (yksikkötestit) sitä ei ole lainkaan — silloin kerros piirtää vain
   * tilanvaihdoista eikä silmukkaa synny.
   */
  const kehysta = (fn) => (typeof globalThis.requestAnimationFrame === 'function'
    ? globalThis.requestAnimationFrame(fn) : 0);
  const peruKehys = (id) => { if (id) globalThis.cancelAnimationFrame?.(id); };

  const askel = (nyt) => {
    if (purettu) return;
    if (nyt - viimeksi >= VALON_PIIRTOVALI_MS) {
      viimeksi = nyt;
      piirra(nyt);
    }
    silmukka = kehysta(askel);
  };

  const kaynnista = () => {
    // Reduced motion: ei silmukkaa lainkaan — valo piirtyy kerran
    // staattisena profiilina (Raamattu, sääntö 4).
    if (purettu || silmukka || reducedMotion) return;
    silmukka = kehysta(askel);
  };

  return {
    tuettu,

    /**
     * Yhden lampun canvas. Palauttaa null, jos canvasia ei ole — kutsuja
     * piirtää silloin entisen SVG-lampun.
     */
    lamppu(n) {
      if (!tuettu) return null;
      const c = tee(Math.round(sivu * tarkkuus), Math.round(sivu * tarkkuus));
      const ctx = c?.getContext?.('2d');
      if (!ctx) return null;
      if (c.style) {
        c.style.width = `${sivu}px`;
        c.style.height = `${sivu}px`;
      }
      ctx.scale(tarkkuus, tarkkuus);
      const variaatio = valonVariaatio(n);
      valot.set(n, {
        n,
        el: c,
        ctx,
        variaatio,
        profiili: teeProfiili(tee, valonSavyt(variaatio.lampo), Math.round(sivu * tarkkuus)),
        palaa: false,
        nykyinen: false,
        alkoi: 0,
        sammui: 0,
        likainen: false,
      });
      return c;
    },

    /**
     * Lampun tila. Syttymishetki otetaan talteen VAIN kun lamppu ei
     * ennestään palanut: uudelleen nykyiseksi merkitseminen ei aloita
     * syttymistä alusta.
     */
    tila(n, palaa, nykyinen) {
      const valo = valot.get(n);
      if (!valo) return;
      const nyt = nytKello();
      if (palaa && !valo.palaa) valo.alkoi = nyt;
      if (!nykyinen && valo.nykyinen) valo.sammui = nyt;
      if (nykyinen) valo.sammui = 0;
      valo.palaa = Boolean(palaa);
      valo.nykyinen = Boolean(nykyinen);
      valo.likainen = true;
      if (palaa) kaynnista();
      // Reduced motion piirtää heti eikä jää silmukkaa odottamaan.
      if (reducedMotion || !silmukka) piirra(nyt);
    },

    /** Kaikki sammuksiin (moottorin Alusta). */
    alusta() {
      for (const valo of valot.values()) {
        valo.palaa = false;
        valo.nykyinen = false;
        valo.sammui = 0;
        valo.likainen = true;
      }
      piirra(nytKello());
    },

    pura() {
      purettu = true;
      peruKehys(silmukka);
      silmukka = 0;
      valot.clear();
    },

    /** Mittausta ja testejä varten: yksi kehys käsin. */
    piirra,
    valot,
  };
}
