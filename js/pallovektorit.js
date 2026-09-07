/*
 * ======== PALLON VEKTORIVIIVAT: RANTAVIIVA ON RUUDUN PIKSELI =======
 *
 * OMISTAJA 6.9.2026 ilta (Raamattu, VEKTORIT SAMALLA — Fablen ehdotus
 * *"rantaviivat ja nimet vektoreina laattojen päälle, jolloin ne ovat
 * aina tasan pikselin levyisiä"*, omistaja sanatarkasti: *"Tehdään se
 * vektori juttu nyt samalla."*).
 *
 * Poltettu rantaviiva on PAPERIVAKIO laatassa (1,35 px mustetta
 * tools/fokuskartta/piirto.js osiossa 7) mutta KARTTAVAKIO ruudulla:
 * laatan venytys venyttää sen mukanaan, ja liikkeessä Z5-laatoilla se
 * on mitatusti 8 laitepikselin sumea vyö (docs/moduulit/
 * pallon-vektoriviivat.md luku 2.1). Tämä kerros piirtää saman
 * geometrian (Natural Earth 1:10m, sama 0,006°:n harvennus kuin
 * pyramidissa) VEKTOREINA laattojen päälle, jolloin viiva on tasan
 * tavoiteleveytensä laitepikseleitä joka korkeudella, levossa ja
 * liikkeessä — kuten Google Earthissä ja kuten CSS2D-nimet jo nyt.
 *
 * MITEN (suunnitelma docs/moduulit/pallon-vektoriviivat.md luku 4,
 * kaikki luvut mitattu, ei arvattu):
 *
 *  - THREE.JS:N FAT LINE (Line2 / LineSegments2 + LineMaterial), jonka
 *    varjostin laskee leveyden RUUTUPIKSELEINÄ (worldUnits false,
 *    resolution = kotelon koko css-pikseleinä). Luokat luetaan
 *    Globe.gl:n OMASTA NIPUSTA elävän polkuolion kautta — kirjasto
 *    rakentaa pathsDatan Line2:na — joten uutta kirjastoa ei ladata
 *    eikä yhden tiedoston versio muutu. Yksi instanssoitu piirtokutsu
 *    solua kohti (mitattu +22 Ateenan näkymässä, +2 koko pallolla);
 *    kirjaston oma pathsData olisi yksi piirtokutsu per viiva eli
 *    1 923 / 13 917 (luku 2.2, HYLÄTTY).
 *  - TÄSMÄLLEEN PINNAN SÄTEELLÄ (VEKTORIT_KORKEUS 0). Nostettu viiva
 *    kulki lähikuvassa parallaksin takia 2–4 laitepikseliä poltetun
 *    viivan VIERESSÄ (luku 2.3, sama oppi kuin lepokerroksen "hypyssä"
 *    v1641:ssä); järjestys hoidetaan syvyyssiirrolla, ei nostolla.
 *  - LÄPINÄKYVIEN JONOSSA, EI SYVYYSKIRJOITUSTA: renderOrder −0,5
 *    (laatat ja lepokerros ≤ −1, reitit 0, kalvot 1) ja polygonOffset
 *    −12 (laattakerroksen −8:n edelle). Opaakki viiva KATOSI
 *    lepokerroksen alle (magentaa 1 px vs 4 696), koska kerros on
 *    transparent ja piirtyy kaikkien opaakkien jälkeen. Näin viiva ei
 *    koskaan peitä pisteitä, nappulaa eikä reittejä (koepiste 0
 *    kaikissa mitatuissa ajoissa) ja pallon takapuoli leikkautuu
 *    syvyystestillä.
 *  - AINEISTO ÄMPÄRISTÄ tasoittain yksinkertaistettuna (viisi tasoa,
 *    toleranssit 0,1…0) ja 10°:n soluina, int16-deltana; taso valitaan
 *    ruudun tiheydestä samalla mitalla kuin lepokerroksella
 *    (laitepikseliä astetta kohti ruudun keskellä) ja solut näkyvästä
 *    alueesta. Työkalu ja työnkulku: tools/tee-pallovektorit.mjs (erä
 *    V0). Kaikki vuoden välimuistissa versioidussa polussa.
 *  - KAIKKI LIIKE ANIMOIDAAN PEHMEÄSTI (Raamattu 3.9.2026): uusi solu
 *    ei välähdä ruudulle vaan häipyy päälle 260 ms:n ease-outilla
 *    kloonatulla materiaalilla; häiveen jälkeen olio palaa jaettuun
 *    materiaaliin, joten materiaaleja on levossa tasan kaksi.
 *
 * KERROS EI KOSKE MUIHIN: se ei muuta Globe.gl:n kerroksia (pathsData
 * saa hetkeksi nollamittaisen osan `vektorit` luokkien lukemiseksi ja
 * menettää sen heti), laattakerrosta (js/pallolaatat.js, js/pallo.js)
 * eikä pelin merkkejä. Kytkentä tehdään pallolaudassa (erä V2) ja
 * perääntyminen on yksi rivi: `?vektorit=0` tai PALLOVEKTORIT_OLETUS.
 */

/*
 * Laattakerroksen puhtaat apurit tulevat js/pallo.js:n kautta (se vie
 * ne edelleen js/pallolaatat.js:stä): sama pallonPiste-kaava kuin
 * lepokerroksella, sama näkyvän alueen laatikko (sauman aukikierto) ja
 * samat mittaluvut, jotta kaksi kerrosta ei voi eriytyä.
 */
import {
  LEPOKERROS_MITTAMATKA_PX, LEPOKERROS_NAYTTEITA, kolmiulotteinen, kytkePallonKehys,
  lepokerroksenAlue, pallonPiste, pinnanPiste,
} from './pallo.js';

/*
 * pinnanPiste MUUTTI js/pallolaatat.js:ään (vika v1649): sormiveto
 * tarvitsee saman säde–pallo-leikkauksen eikä js/pallo.js voi tuoda
 * tätä moduulia (kehä). Vienti jatkuu tästä, joten kutsujat ja testit
 * näkevät sen edelleen samassa osoitteessa.
 */
export { pinnanPiste };

/** Pelin ämpäri (sama osoite kuin js/pallo.js:ssä). */
const R2 = 'https://media.matkakirja.app/';
/**
 * Vektoriaineiston versio = tools/tee-pallovektorit.mjs:n ajon kansio
 * (erä V0). Polku on versioitu ja ämpäri lähettää sille `immutable`,
 * joten uusi ajo saa AINA uuden version — vanha jää selainten koreihin.
 */
export const PALLOVEKTORIT_VERSIO = '2026-09-06a';
export const PALLOVEKTORIT_JUURI = `${R2}julisteet/pallo/vektorit/${PALLOVEKTORIT_VERSIO}/`;

/*
 * ======== VANHAN KARTAN VIIVA, EI TUSSIA (omistaja 7.9.2026) ========
 *
 * Omistaja työpöydällä sanatarkasti: *"Miksi muuten kartan rajat ovat
 * noin mustia ja röpelöisiä? Ovatko nuo nyt sitä uutta vektorilla
 * piirrettyä? Sitä saisi vähän pehmentää paremmin vanhan kartan tyyliin
 * istuvaksi."* Tyylivertailu on tasokartan rantaviiva: ohut, ruskea,
 * pehmeäreunainen — ei musta nauha.
 *
 * MITATUT SYYT (mittaus 7.9.2026, tools/savukkeet/savuke-pallo-rantaviivat.mjs):
 *
 *  1. PÄÄTYPYÖRYLÄT KASASIVAT MUSTEEN. LineSegments2 piirtää jokaisen
 *     janan pyöreillä päillä, jotka ulottuvat puoli viivanleveyttä
 *     kärkien YLI. Yleiskuvassa (23,8 laitepikseliä astetta kohti,
 *     lod 2 = 0,008°) jana on ruudulla 0,19 px pitkä ja pyörylä 0,75 px
 *     säteinen: JOKAINEN viivan pikseli sai päälleen ~8 läpinäkyvää
 *     kiekkoa, ja 1 − 0,1⁸ ≈ 1 — peitto 0,9 saturoitui mustaksi
 *     riippumatta siitä, mikä RANTA_PEITTO oli. Kärkitiheyden vaihtelu
 *     teki tummuudesta epätasaisen: se on se "röpelöinen".
 *     KORJAUS: varjostin hylkää päätypyörylät (`abs(vUv.y) > 1` →
 *     discard), jolloin janat laatoittavat viivan LIMITTÄMÄTTÄ ja
 *     musteen peitto on tasan se, mikä materiaaliin on kirjoitettu.
 *  2. KOVA REUNA. Kolmion reuna sai vain 4× MSAA:n (mitattu
 *     gl.SAMPLES = 4), eli tummalla ohuella viivalla viisi porrasta —
 *     silmä lukee sen sahalaidaksi. KORJAUS: nelikulmio piirretään
 *     VEKTORIT_PEHMENNYS_LAITEPX verran leveämpänä kummallekin
 *     reunalle ja varjostin häivyttää peiton siinä vyössä nollaan
 *     (smoothstep). Ydin pysyy tavoiteleveydessään.
 *  3. LIIKAA KÄRKIÄ KAUKAA. Ämpärin tasoportaat ovat karkeat
 *     (0,1 / 0,03 / 0,008 / 0,004 / 0), joten yleiskuva lataa 0,008°:n
 *     aineiston, jonka kärkiväli on murto-osa pikselistä. KORJAUS:
 *     Douglas–Peucker AJETAAN VIELÄ SELAIMESSA kameran korkeuden
 *     mukaan (harvennusPorras: viisi porrasta, jotta geometriaa ei
 *     rakenneta uudelleen joka kehyksellä) — lähikuvassa porras on 0
 *     eli täysi yksityiskohta.
 *  4. MUSTE OLI POLTETUN VIIVAN MUSTE. #3a2819 peitto 0,9 on tummempi
 *     kuin tasokartan rantaviiva; uusi arvo on mitattu omistajan
 *     kuvakaappauksesta (ks. RANTA_MUSTE).
 */

/**
 * Rantaviivan tavoiteleveys CSS-pikseleinä [kaukana, lähellä]. Leveys
 * on RUUTUVAKIO (varjostin laskee sen ruutupikseleinä), mutta
 * yleiskuvassa ohuempi: kaukaa katsottuna manner on pelkkää ääriviivaa
 * ja paksu viiva peittäisi maiseman. Vanhan tasokartan rantaviiva on
 * omistajan kuvassa noin 1 css-pikselin levyinen.
 */
export const VEKTORIT_LEVEYS_CSS = [0.8, 1.2];
/** Maiden rajan leveys css-pikseleinä [kaukana, lähellä] (rantaviivaa hennompi). */
export const VEKTORIT_RAJA_LEVEYS_CSS = [0.65, 0.95];
/**
 * Leveyden liukuma ruudun tiheydessä (laitepikseliä astetta kohti):
 * tämän alle kaikki on "kaukana", yli "lähellä", välissä lineaarinen.
 */
export const VEKTORIT_LEVEYS_TIHEYS = [25, 250];
/**
 * Reunan pehmennys LAITEPIKSELEINÄ kummallakin puolella: nelikulmio
 * levitetään tämän verran ja varjostin häivyttää peiton vyössä
 * nollaan. 0 = entinen kova reuna (vain MSAA).
 */
export const VEKTORIT_PEHMENNYS_LAITEPX = 0.65;
/**
 * TÄSMÄLLEEN PINNAN SÄTEELLÄ. Nosto 0,001 (0,1 yksikköä) siirsi viivan
 * lähikuvassa 2–4 laitepikseliä poltetun viivan viereen (parallaksi,
 * luku 2.3) — järjestys hoidetaan syvyyssiirrolla kuten lepokerroksella
 * (LEPOKERROS_KOROTUS 1).
 */
export const VEKTORIT_KORKEUS = 0;
/** Syvyyssiirto kameraa kohti: laattakerroksen −8:n edelle (luku 2.3). */
export const VEKTORIT_SYVYYSSIIRTO = -12;
/** Läpinäkyvien jono: laatat ja lepokerros ≤ −1, viivat, reitit 0, kalvot 1. */
export const VEKTORIT_RENDER_ORDER = -0.5;
/** Yksinkertaistuksen tavoitetarkkuus ruudulla (laitepikseliä). */
export const VEKTORIT_TERAVYYS_PX = 0.5;
/** Kameran liikkeen jarru: päivitys ajetaan korkeintaan näin tiheästi. */
export const VEKTORIT_JARRU_MS = 60;
/** Uuden solun häive päälle (KAIKKI LIIKE ANIMOIDAAN PEHMEASTI). */
export const VEKTORIT_HAIVE_MS = 260;
/** Muistissa pidettävien solujen katto (LRU karsii vanhimmat). */
export const VEKTORIT_SOLUKATTO = 160;
/** Rajat piirretään vasta tästä tiheydestä ylöspäin (laitepikseliä/aste). */
export const VEKTORIT_RAJAT_PX_ASTE = 30;
/** Näkyvän alueen reunus asteina (solu ladataan ennen kuin se tulee ruutuun). */
export const VEKTORIT_VARA_AST = 1;
/**
 * SELAIMEN OMA HARVENNUS: suurin sallittu poikkeama RUUDULLA
 * laitepikseleinä, kun ämpärin taso vielä tihennetään kameran mukaan.
 * Yhdessä VEKTORIT_TERAVYYS_PX:n (tiedostotason valinta) kanssa
 * pahin yhteenlaskettu virhe on 1,1 laitepikseliä eli reilusti alle
 * puoli css-pikseliä.
 */
export const VEKTORIT_HARVENNUS_PX = 0.6;
/**
 * Harvennuksen PORTAAT asteina (karkeasta tarkkaan; 0 = ei harvennusta).
 * Portaita on viisi eikä liukuma, jotta geometriaa ei rakenneta
 * uudelleen joka kehyksellä: porras vaihtuu vasta, kun kamera on
 * liikkunut nelinkertaisen matkan tiheydessä.
 */
export const VEKTORIT_HARVENNUS_PORTAAT = [0.05, 0.012, 0.003, 0.0008, 0];
/** Montako solua saa rakentaa uudelleen yhdellä päivityksellä (portaan vaihtuessa). */
export const VEKTORIT_HARVENNUS_KATTO = 8;
/**
 * Rantaviivan muste. Mitattu omistajan tasokarttakuvasta 7.9.2026:
 * viivan ydin on rgb(55, 47, 24) tienoilla ja paperi rgb(209, 202, 181),
 * eli viiva on RUSKEA eikä musta ja peittää vain osan pohjasta. Peitto
 * 0,58 antaa pergamentin päällä noin rgb(148, 135, 118) — sama
 * vaikutelma kuin tasokartan ohuella ruskealla rannikolla, kun
 * päätypyörylät eivät enää kasaa mustetta (ks. tiedoston alku).
 */
export const RANTA_MUSTE = '#5a4330';
export const RANTA_PEITTO = 0.58;
/** Maiden raja: sama ruskea vaaleampana ja selvästi hennompana. */
export const RAJA_MUSTE = '#6b5539';
export const RAJA_PEITTO = 0.34;
/**
 * Rajan pistekuvio maailmayksikköinä (piste, väli): poltettu raja on
 * 1,5 R piste ja 3 R väli, ja z7:llä R ≈ 1 px ≈ 0,00727 yksikköä.
 */
export const RAJA_KATKO_YKS = [0.011, 0.022];
/** Kerros on oletuksena päällä; `?vektorit=0` ottaa sen pois. */
export const PALLOVEKTORIT_OLETUS = true;
/** Kytkimen muistipaikka (kehittäjän vipu, savukkeet). */
export const PALLOVEKTORIT_AVAIN = 'matkakirja-pallovektorit';

/**
 * Onko vektorikerros päällä: `?vektorit=0|1` voittaa muistetun valinnan,
 * muistettu valinta oletuksen. Apuri on TÄSSÄ MODUULISSA eikä
 * js/ui-apurit.js:ssä (suunnitelma luku 4.3): kerros on pallolaudan oma
 * eikä pelin asetus, ja ui-apurit on toisen erän työn alla.
 */
export function pallovektoritPaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('vektorit');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch {
    /* ei osoitetta (testiajo) */
  }
  try {
    const muistettu = ikkuna.localStorage?.getItem(PALLOVEKTORIT_AVAIN);
    if (muistettu === '0') return false;
    if (muistettu === '1') return true;
  } catch {
    /* yksityinen selaus */
  }
  return PALLOVEKTORIT_OLETUS;
}

/**
 * Yksinkertaistustaso: matalin taso, jonka toleranssi on ruudulla
 * korkeintaan `teravyys` laitepikseliä. Jos mikään ei riitä, syvin —
 * silloin aineisto on jo harventamaton lähde. `pakotus` ohittaa
 * valinnan (savukkeet ja kehittäjän vipu).
 *
 * @param {number[]} lodit tasojen toleranssit asteina (0,1 … 0)
 * @param {number} tarve laitepikseliä astetta kohti ruudun keskellä
 * @param {number} teravyys tavoitetarkkuus laitepikseleinä
 * @param {?number} pakotus pakotettu taso tai null
 */
export function vektoritaso(lodit, tarve, teravyys = VEKTORIT_TERAVYYS_PX, pakotus = null) {
  const lista = Array.isArray(lodit) ? lodit : [];
  if (!lista.length) return 0;
  if (pakotus !== null && Number.isFinite(pakotus)) {
    return Math.max(0, Math.min(lista.length - 1, Math.round(pakotus)));
  }
  for (let k = 0; k < lista.length; k += 1) if (lista[k] * tarve <= teravyys) return k;
  return lista.length - 1;
}

/**
 * Viivan tavoiteleveys CSS-pikseleinä ruudun tiheyden mukaan: kaukana
 * ohut, lähellä hieman paksumpi, välissä lineaarinen liukuma.
 *
 * @param {number} tarve laitepikseliä astetta kohti ruudun keskellä
 * @param {number[]} paate [kaukana, lähellä] css-pikseleinä
 */
export function viivanLeveysCss(tarve, paate = VEKTORIT_LEVEYS_CSS) {
  const [a, b] = VEKTORIT_LEVEYS_TIHEYS;
  const t = Math.max(0, Math.min(1, ((tarve || 0) - a) / (b - a)));
  return paate[0] + (paate[1] - paate[0]) * t;
}

/**
 * Selaimen oman harvennuksen porras ASTEINA: karkein porras, joka
 * pysyy `px` laitepikselin sisällä ruudulla. Portaita on kourallinen
 * (VEKTORIT_HARVENNUS_PORTAAT), jotta geometria ei rakennu uudelleen
 * pienestä kameran nytkähdyksestä. Palauttaa 0, kun mikään porras ei
 * mahdu — silloin aineisto piirretään sellaisenaan (täysi yksityiskohta).
 *
 * @param {number} tarve laitepikseliä astetta kohti
 * @param {number} px suurin sallittu poikkeama laitepikseleinä
 */
export function harvennusPorras(tarve, px = VEKTORIT_HARVENNUS_PX) {
  if (!(tarve > 0)) return 0;
  const kate = px / tarve;
  for (const porras of VEKTORIT_HARVENNUS_PORTAAT) if (porras <= kate) return porras;
  return 0;
}

/**
 * Douglas–Peucker asteissa, leveyspiirin kutistuma huomioiden
 * (pituusaste kerrotaan cos(lat):lla, muuten napojen lähellä
 * harvennettaisiin liian vähän). Sama pinoversio kuin
 * tools/tee-pallovektorit.mjs:n `dp` — tämä ajetaan SELAIMESSA jo
 * harvennetun aineiston päälle kameran korkeuden mukaan.
 *
 * @param {Array<[number, number]>} viiva [lon, lat] -pisteet
 * @param {number} tol toleranssi asteina (0 = ei harvennusta)
 */
export function harvennaViiva(viiva, tol) {
  if (!(tol > 0) || !viiva || viiva.length < 3) return viiva;
  const n = viiva.length;
  const kx = Math.max(0.05, Math.cos((viiva[n >> 1][1] * Math.PI) / 180));
  const pida = new Uint8Array(n);
  pida[0] = 1; pida[n - 1] = 1;
  const pino = [[0, n - 1]];
  const t2 = tol * tol;
  while (pino.length) {
    const [a, b] = pino.pop();
    if (b - a < 2) continue;
    const ax = viiva[a][0] * kx; const ay = viiva[a][1];
    const dx = viiva[b][0] * kx - ax; const dy = viiva[b][1] - ay;
    const l2 = dx * dx + dy * dy;
    let paras = -1; let parasD = -1;
    for (let i = a + 1; i < b; i += 1) {
      const px = viiva[i][0] * kx; const py = viiva[i][1];
      let d;
      if (l2 === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
        d = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2;
      }
      if (d > parasD) { parasD = d; paras = i; }
    }
    if (parasD > t2) { pida[paras] = 1; pino.push([a, paras], [paras, b]); }
  }
  const ulos = [];
  for (let i = 0; i < n; i += 1) if (pida[i]) ulos.push(viiva[i]);
  return ulos;
}

/** Koko solun viivat harvennettuna; tol 0 palauttaa saman taulukon. */
export function harvennaViivat(viivat, tol) {
  if (!(tol > 0) || !viivat?.length) return viivat ?? [];
  return viivat.map((v) => harvennaViiva(v, tol));
}

/**
 * PEHMEÄ REUNA JA EI PÄÄTYPYÖRYLÖITÄ (omistaja 7.9.2026, ks. tiedoston
 * alku). LineMaterial on ShaderMaterial, joten sen varjostinta voi
 * paikata suoraan ennen ensimmäistä käännöstä — uutta kirjastoa ei
 * tarvita eikä muiden Line2-olioiden (reitit, Ihmisen matkan vanat)
 * materiaaleihin kosketa.
 *
 *  - `discard` päätypyörylälle: janat laatoittavat viivan limittämättä,
 *    joten läpinäkyvä muste ei kasaudu mustaksi kärkien kohdalla.
 *  - `pehmennys` (osuus puolileveydestä) häivyttää peiton reunavyössä
 *    nollaan, jolloin viiva on antialiasoitu myös ilman MSAA:ta.
 *
 * Palauttaa true, jos paikka meni läpi; false, jos varjostin ei ole
 * odotetun näköinen (silloin kutsuja jättää leveyden ennalleen).
 */
export function pehmennaLineMaterial(materiaali) {
  if (!materiaali || materiaali.userData?.pallovektoritPehmennys) return Boolean(materiaali);
  const frag = materiaali.fragmentShader;
  const kohta = 'gl_FragColor = vec4( diffuseColor.rgb, alpha );';
  if (typeof frag !== 'string' || !frag.includes(kohta) || !frag.includes('uniform float linewidth;')) {
    return false;
  }
  materiaali.uniforms.pehmennys = { value: 0 };
  materiaali.fragmentShader = frag
    .replace('uniform float linewidth;', 'uniform float linewidth;\n\t\tuniform float pehmennys;')
    .replace(kohta, [
      '#ifndef WORLD_UNITS',
      '  if ( abs( vUv.y ) > 1.0 ) discard;',
      '  if ( pehmennys > 0.0 ) alpha *= 1.0 - smoothstep( 1.0 - pehmennys, 1.0, abs( vUv.x ) );',
      '  if ( alpha < 0.003 ) discard;',
      '#endif',
      kohta,
    ].join('\n\t\t\t'));
  materiaali.needsUpdate = true;
  materiaali.userData.pallovektoritPehmennys = true;
  return true;
}

/** Solun avain (sama kaava kuin tools/tee-pallovektorit.mjs:ssä). */
export function vektorisoluAvain(lon, lat, solu) {
  const sarakkeita = Math.ceil(360 / solu);
  const riveja = Math.ceil(180 / solu);
  const s = Math.min(Math.floor((lon + 180) / solu), sarakkeita - 1);
  const r = Math.min(Math.floor((90 - lat) / solu), riveja - 1);
  return `${s}_${r}`;
}

/**
 * Näkyvän alueen solut. Alueen pituuspiirit ovat AUKIKIERRETTYJÄ
 * (lepokerroksenAlue), joten sauman yli katsova ruutu saa solut
 * molemmilta puolilta ilman koko maailman laatikkoa. Tasoilla, joilla
 * koko maailma on yksi solu (solu ≥ 360), palautetaan aina ['0_0'].
 */
export function vektorisolut(alue, solu) {
  if (!(solu > 0)) return [];
  if (solu >= 360) return ['0_0'];
  if (!alue) return [];
  const sarakkeita = Math.ceil(360 / solu);
  const riveja = Math.ceil(180 / solu);
  const rivi = (lat) => Math.max(0, Math.min(riveja - 1, Math.floor((90 - lat) / solu)));
  const r0 = rivi(Math.min(90, alue.lat1));
  const r1 = rivi(Math.max(-90, alue.lat0));
  const s0 = Math.floor((alue.lon0 + 180) / solu);
  const leveys = Math.min(sarakkeita, Math.floor((alue.lon1 + 180) / solu) - s0 + 1);
  const ulos = [];
  const nahty = new Set();
  for (let r = r0; r <= r1; r += 1) {
    for (let i = 0; i < leveys; i += 1) {
      const s = (((s0 + i) % sarakkeita) + sarakkeita) % sarakkeita;
      const avain = `${s}_${r}`;
      if (nahty.has(avain)) continue;
      nahty.add(avain);
      ulos.push(avain);
    }
  }
  return ulos;
}

/**
 * Solun tiedosto viivoiksi. Muoto (tools/tee-pallovektorit.mjs, erä V0):
 * peräkkäin viivoja, kukin int32 pisteiden määrä, int32 lon·1e4,
 * int32 lat·1e4 ja sitten (n − 1) × (int16 dlon, int16 dlat)
 * 1e-4°-yksikköinä, little-endian. Delta on int16, koska harvennettu
 * kärkiväli on aina alle 3,2° — pidemmät hypyt työkalu katkaisee omaksi
 * viivakseen.
 *
 * @param {ArrayBuffer|ArrayBufferView} puskuri solun .bin
 * @returns {Array<Array<[number, number]>>} viivat [lon, lat] -pisteinä
 */
export function puraDelta(puskuri) {
  if (!puskuri) return [];
  const nakyma = puskuri instanceof ArrayBuffer
    ? new DataView(puskuri)
    : new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  const viivat = [];
  let o = 0;
  while (o + 12 <= nakyma.byteLength) {
    const n = nakyma.getInt32(o, true);
    // Vajaa tai rikki mennyt tiedosto: luetaan se, mikä on ehjää.
    if (!(n >= 2) || o + 12 + (n - 1) * 4 > nakyma.byteLength) break;
    o += 4;
    let x = nakyma.getInt32(o, true);
    let y = nakyma.getInt32(o + 4, true);
    o += 8;
    const viiva = new Array(n);
    viiva[0] = [x / 1e4, y / 1e4];
    for (let k = 1; k < n; k += 1) {
      x += nakyma.getInt16(o, true);
      y += nakyma.getInt16(o + 2, true);
      o += 4;
      viiva[k] = [x / 1e4, y / 1e4];
    }
    viivat.push(viiva);
  }
  return viivat;
}

/**
 * Viivat janoiksi pallon pinnalle: LineSegments2 haluaa PARIT, joten
 * jokainen polyviivan väli kirjoitetaan omana janana (xyz, xyz).
 * Piste on täsmälleen säteellä `sade` (VEKTORIT_KORKEUS 0).
 */
export function vektorijanat(viivat, sade) {
  let janoja = 0;
  for (const v of viivat ?? []) janoja += Math.max(0, v.length - 1);
  const paikat = new Float32Array(janoja * 6);
  let i = 0;
  for (const v of viivat ?? []) {
    if (v.length < 2) continue;
    let p = pallonPiste(v[0][1], v[0][0], sade);
    for (let k = 1; k < v.length; k += 1) {
      const q = pallonPiste(v[k][1], v[k][0], sade);
      paikat[i] = p.x; paikat[i + 1] = p.y; paikat[i + 2] = p.z;
      paikat[i + 3] = q.x; paikat[i + 4] = q.y; paikat[i + 5] = q.z;
      i += 6;
      p = q;
    }
  }
  return { paikat, janoja };
}

/**
 * Line2-luokat elävästä pallosta. Globe.gl 2.46 rakentaa jokaisen
 * pathsData-viivan Line2:na, joten yksi olio scenessä antaa koko
 * konstruktoriketjun — uutta kirjastoa ei ladata eikä vendor-vientiä
 * tarvita. Palauttaa null, kunnes olio on scenessä.
 *
 * Vienti: myös Ihmisen matkan vanat (js/aikajana-vanat.js) piirtää fat
 * lineä samalla temppulla, eikä luokkien hakua kannata kirjoittaa
 * kahdesti.
 */
export function line2Luokat(pallo) {
  let olio = null;
  pallo.scene?.()?.traverse?.((o) => { if (!olio && o.type === 'Line2') olio = o; });
  if (!olio?.geometry || !olio.material?.resolution) return null;
  const Line2 = olio.constructor;
  const LineSegments2 = Object.getPrototypeOf(Line2.prototype).constructor;
  const LineGeometry = olio.geometry.constructor;
  const LineSegmentsGeometry = Object.getPrototypeOf(LineGeometry.prototype).constructor;
  const LineMaterial = olio.material.constructor;
  const Vector2 = olio.material.resolution.constructor;
  return { Line2, LineSegments2, LineGeometry, LineSegmentsGeometry, LineMaterial, Vector2 };
}

/**
 * Vektorikerros yhdelle pallolle. Kytkentä tehdään pallolaudassa
 * (js/pallolauta/lauta.js, erä V2); valikkopallo ei saa kerrosta.
 *
 * @param {object} p.pallo   Globe.gl-instanssi (rakennaPallo)
 * @param {HTMLElement} p.kotelo pallon kotelo (ruudun mitat)
 * @param {object} p.ikkuna  window (testit antavat oman)
 * @param {object} p.reitit  js/pallolauta/reitit.js -kahva (aseta)
 * @returns {{ paivita: function, mittarit: function, pura: function, valmis: Promise }}
 */
export function luoPallovektorit({ pallo, kotelo, ikkuna = globalThis, reitit }) {
  const mittarit = {
    tila: 'kaynnistyy', syy: '', lod: null, tol: null, tarvePxAste: 0, soluja: 0, ladattu: 0,
    janoja: 0, tavua: 0, pyyntoja: 0, paivitaMs: 0, rakennusMs: 0, linewidthCss: 0,
    pikselisuhde: 0, alue: null,
    /** Viivan YDIN css-pikseleinä (linewidthCss on ydin + pehmennysvyöt). */
    leveysCss: 0,
    /** Reunan häivytys osuutena puolileveydestä (0 = kova reuna). */
    pehmennys: 0,
    /** Selaimen oman harvennuksen porras asteina (0 = täysi yksityiskohta). */
    harvennus: 0,
    /** Janoja näkyvää solua kohti — kaukaa vähemmän kuin läheltä. */
    janojaSolua: 0,
    /** Onko varjostimen pehmennyspaikka mennyt läpi. */
    pehmennysPaikka: false,
  };
  const pyydetyt = new Set();
  /** id (`<laji>/l<k>/<solu>`) → { laji, k, avain, lupaus, viivat, olio, janoja, tavua, kaytto } */
  const solut = new Map();
  /** Häiveen ajaksi kloonatut materiaalit (ruutumitat päivitetään näihinkin). */
  const kloonit = new Set();
  let luettelo = null;
  let luokat = null;
  let kolmi = null;
  let materiaalit = null;
  let purettu = false;
  let nakyvat = new Set();
  let kello = 0;
  /*
   * Viimeisimmät kehysmitat piirtokoukusta (js/pallo.js
   * kytkePallonKehys): kamera, pov, ruudun koko ja pikselisuhde SAMASTA
   * kehyksestä kuin laattakerroksella. Null ennen ensimmäistä piirtoa ja
   * yksikkötesteissä — silloin luetaan kuten ennen.
   */
  let kehysmitat = null;
  let kehyspurku = () => {};
  let viimeAjo = -Infinity;
  let viimeTunnus = '';

  const renderer = pallo.renderer?.();
  const nyt = () => ikkuna.performance?.now?.() ?? Date.now();
  const odota = (ms) => new Promise((ok) => { ikkuna.setTimeout(ok, ms); });
  const reduced = () => Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  const sade = () => pallo.getGlobeRadius() * (1 + VEKTORIT_KORKEUS);
  const pikselisuhde = () => kehysmitat?.suhde
    ?? renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1);
  /** Ruudun koko: piirretty koko kehyskoukusta, kotelo varana. */
  const ruutu = () => ({
    W: kehysmitat?.W || kotelo.clientWidth,
    H: kehysmitat?.H || kotelo.clientHeight,
  });
  /*
   * Ruudun tiheys (laitepikseliä astetta kohti) viime päivityksestä:
   * viivan leveys ja selaimen oma harvennus liukuvat sen mukana.
   * Nolla ennen ensimmäistä mittausta = ohuin pää.
   */
  let tiheys = 0;
  /** Selaimen oman harvennuksen porras asteina (0 = täysi yksityiskohta). */
  let harvennus = 0;
  /** Meniko varjostimen pehmennyspaikka läpi (pehmennaLineMaterial). */
  let pehmennysPaikka = false;
  /** Viivan YDIN css-pikseleinä (ilman pehmennysvyötä). */
  const ydinLeveys = (laji) => viivanLeveysCss(
    tiheys, laji === 'rajat' ? VEKTORIT_RAJA_LEVEYS_CSS : VEKTORIT_LEVEYS_CSS,
  );
  /** Pehmennysvyö css-pikseleinä kummallakin reunalla. */
  const pehmennysCss = () => (pehmennysPaikka ? VEKTORIT_PEHMENNYS_LAITEPX / pikselisuhde() : 0);
  /**
   * Nelikulmion leveys css-pikseleinä = ydin + kaksi pehmennysvyötä
   * (varjostin häivyttää vyön nollaan, joten NÄKYVÄ leveys on ydin).
   */
  const cssLeveys = (laji) => ydinLeveys(laji) + 2 * pehmennysCss();
  /** Häivytysvyön osuus puolileveydestä varjostimelle. */
  const pehmennysOsuus = (laji) => {
    const leveys = cssLeveys(laji);
    return leveys > 0 ? Math.min(0.95, (2 * pehmennysCss()) / leveys) : 0;
  };

  const luovuta = (syy) => { mittarit.syy = syy; mittarit.tila = 'ei'; return false; };

  /* ---------------- käynnistys ------------------------------------- */

  const valmis = (async () => {
    if (!reitit?.aseta) return luovuta('reittikerrosta ei annettu');
    // Luettelo revalidoidaan kuten laatat.json (no-cache): polku on
    // versioitu, mutta luettelo voi vaihtua saman version alla.
    const luetteloLupaus = ikkuna.fetch(`${PALLOVEKTORIT_JUURI}luettelo.json`, { cache: 'no-cache' })
      .then((v) => (v?.ok ? v.json() : null))
      .catch(() => null);
    mittarit.pyyntoja += 1;
    pyydetyt.add(`${PALLOVEKTORIT_JUURI}luettelo.json`);
    /*
     * NOLLAMITTAINEN POLKU luokkien lukemiseksi: läpinäkyvä kahden
     * saman pisteen viiva reittikerroksen omana osana, joka poistetaan
     * heti kun kirjasto on rakentanut siitä Line2:n. Osarekisteri
     * (reitit.aseta) takaa, ettei tämä pyyhi pelin reittejä.
     */
    reitit.aseta('vektorit', [{
      avain: 'vektorit-luokat', pisteet: [[0, 0], [0, 0]], paksuus: 1, vari: 'rgba(0,0,0,0)',
    }]);
    for (let i = 0; i < 100 && !purettu; i += 1) {
      luokat = luokat ?? line2Luokat(pallo);
      kolmi = kolmi ?? kolmiulotteinen(pallo);
      if (luokat && kolmi?.juuri) break;
      await odota(50); // eslint-disable-line no-await-in-loop
    }
    reitit.aseta('vektorit', []);
    if (purettu) return false;
    // Ilman luokkia kerros jää pois — pallo toimii täsmälleen kuten ennen.
    if (!luokat) return luovuta('Line2-luokkia ei saatu');
    if (!kolmi?.juuri) return luovuta('pallon ryhmää ei saatu');
    luettelo = await luetteloLupaus;
    if (purettu) return false;
    if (!luettelo?.lodit?.length || !luettelo.lajit) return luovuta('vektoriluetteloa ei saatu');
    materiaalit = teeMateriaalit();
    /*
     * PÄIVITYS PIIRTOKOUKUSSA, EI TAPAHTUMASSA (vika v1649). Ennen tätä
     * kerros heräsi ohjainten `change`-tapahtumasta — eli pointermoven
     * sisältä — ja luki ruudun koon kotelon CSS-laatikosta 60 ms:n
     * ajastimella. Laattakerros luki omansa updatePovista. Kaksi eri
     * lähdettä ja kaksi eri hetkeä tarkoittavat raahauksen aikana kahta
     * eri näkyvää aluetta. Nyt molemmat saavat saman olion samasta
     * kehyksestä (js/pallo.js kytkePallonKehys); jarru ja kaikki V3:n
     * vakiot ovat ennallaan.
     */
    kehyspurku = kytkePallonKehys(pallo, kotelo, kehyksessa, ikkuna);
    mittarit.tila = 'nakyy';
    await paivita();
    return true;
  })().catch((syy) => luovuta(String(syy?.message ?? syy)));

  /**
   * Kaksi materiaalia, ei enempää: rantaviiva ja rajat. Leveys on
   * ruutupikseleitä varjostimessa (worldUnits false), ei syvyyskirjoitusta,
   * syvyystesti pallon pintaa vasten ja polygonOffset laattojen edelle
   * (ks. tiedoston alun mittaukset).
   */
  function teeMateriaalit() {
    const yhteiset = {
      worldUnits: false,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: 0,
      polygonOffsetUnits: VEKTORIT_SYVYYSSIIRTO,
    };
    const ranta = new luokat.LineMaterial({
      ...yhteiset, color: RANTA_MUSTE, opacity: RANTA_PEITTO,
    });
    const raja = new luokat.LineMaterial({
      ...yhteiset, color: RAJA_MUSTE, opacity: RAJA_PEITTO, dashed: true,
    });
    [raja.dashSize, raja.gapSize] = RAJA_KATKO_YKS;
    raja.dashScale = 1;
    /*
     * PEHMEÄ REUNA, EI PÄÄTYPYÖRYLÖITÄ (omistaja 7.9.2026). Paikka
     * tehdään ENNEN ensimmäistä käännöstä ja ennen leveyden asetusta:
     * jos varjostin ei ole odotetun näköinen, pehmennysvyö jää nollaan
     * ja viiva on entisellään.
     */
    pehmennysPaikka = pehmennaLineMaterial(ranta) && pehmennaLineMaterial(raja);
    mittarit.pehmennysPaikka = pehmennysPaikka;
    ranta.linewidth = cssLeveys('rannikko');
    raja.linewidth = cssLeveys('rajat');
    return { rannikko: ranta, rajat: raja };
  }

  /** Ruutumitat materiaaleihin: leveys laitepikseleinä, resoluutio css-pikseleinä. */
  function tahdista() {
    if (!materiaalit) return;
    const { W, H } = ruutu();
    mittarit.linewidthCss = +cssLeveys('rannikko').toFixed(3);
    mittarit.leveysCss = +ydinLeveys('rannikko').toFixed(3);
    mittarit.pehmennys = +pehmennysOsuus('rannikko').toFixed(3);
    mittarit.pikselisuhde = pikselisuhde();
    for (const [laji, m] of Object.entries(materiaalit)) {
      m.linewidth = cssLeveys(laji);
      m.resolution.set(W, H);
      if (m.uniforms?.pehmennys) m.uniforms.pehmennys.value = pehmennysOsuus(laji);
    }
    for (const m of kloonit) {
      m.resolution.set(W, H);
      m.linewidth = cssLeveys(m.userData?.pallovektoritLaji ?? 'rannikko');
      if (m.uniforms?.pehmennys) {
        m.uniforms.pehmennys.value = pehmennysOsuus(m.userData?.pallovektoritLaji ?? 'rannikko');
      }
    }
  }

  /* ---------------- solut ------------------------------------------ */

  /**
   * Solun rakennus: viivat janoiksi, janat instanssoiduksi
   * LineSegments2:ksi pallon ryhmään (piilossa, kunnes se on näkyvien
   * joukossa). Olio ei ota kosketusta vastaan — pelin merkit ja
   * onGlobeClick toimivat kuten ennen.
   */
  function rakenna(s, nakyva = false) {
    /*
     * SELAIMEN OMA HARVENNUS ennen janoiksi purkua: ämpärin tasoportaat
     * ovat karkeat, joten yleiskuvassa lataamme aineistoa, jonka
     * kärkiväli on murto-osa pikselistä. Porras on 0 lähikuvassa =
     * täysi yksityiskohta. Aineiston oma toleranssi (luettelo.lodit[k])
     * kertoo, milloin harvennus ei enää muuttaisi mitään.
     */
    const porras = harvennus > (luettelo?.lodit?.[s.k] ?? 0) ? harvennus : 0;
    s.harvennus = harvennus;
    const viivat = harvennaViivat(s.viivat, porras);
    const { paikat, janoja } = vektorijanat(viivat, sade());
    s.janoja = janoja;
    if (!janoja) return;
    const geometria = new luokat.LineSegmentsGeometry();
    geometria.setPositions(paikat);
    const olio = new luokat.LineSegments2(geometria, materiaalit[s.laji]);
    if (s.laji === 'rajat') olio.computeLineDistances?.();
    olio.renderOrder = VEKTORIT_RENDER_ORDER;
    olio.raycast = () => {};
    olio.visible = nakyva;
    olio.userData.pallovektorit = { laji: s.laji, k: s.k, avain: s.avain };
    kolmi.juuri.add(olio);
    s.olio = olio;
  }

  /**
   * Solun oliot pois, viivat muistiin: harvennusportaan vaihtuessa
   * geometria rakennetaan uudelleen samasta aineistosta (vapauta()
   * heittäisi viivatkin pois ja pakottaisi uuden latauksen).
   */
  function vapautaOlio(s) {
    if (!s.olio) return;
    s.olio.parent?.remove(s.olio);
    s.olio.geometry?.dispose?.();
    const m = s.olio.material;
    if (m && !Object.values(materiaalit ?? {}).includes(m)) { kloonit.delete(m); m.dispose?.(); }
    s.olio = null;
  }

  /**
   * Häive päälle kloonatulla materiaalilla (KAIKKI LIIKE ANIMOIDAAN
   * PEHMEASTI): jaettua materiaalia ei voi häivyttää, koska se on
   * kaikkien saman lajin solujen yhteinen. Häiveen päätteeksi olio
   * palaa jaettuun materiaaliin ja klooni vapautetaan, joten levossa
   * materiaaleja on tasan kaksi.
   */
  function haivyta(s) {
    const jaettu = materiaalit[s.laji];
    const kesto = reduced() ? 0 : VEKTORIT_HAIVE_MS;
    if (!(kesto > 0) || !s.olio) { if (s.olio) s.olio.material = jaettu; return; }
    const oma = jaettu.clone();
    oma.userData.pallovektoritLaji = s.laji;
    oma.linewidth = cssLeveys(s.laji);
    if (oma.uniforms?.pehmennys) oma.uniforms.pehmennys.value = pehmennysOsuus(s.laji);
    oma.resolution.copy?.(jaettu.resolution);
    oma.opacity = 0;
    kloonit.add(oma);
    s.olio.material = oma;
    const t0 = nyt();
    const paata = () => {
      kloonit.delete(oma);
      if (s.olio?.material === oma) s.olio.material = jaettu;
      oma.dispose?.();
    };
    const askel = () => {
      if (purettu || s.olio?.material !== oma) { paata(); return; }
      const t = Math.min(1, (nyt() - t0) / kesto);
      // Ease-out: sisääntulo pehmeällä jarrutuksella (Raamattu).
      oma.opacity = jaettu.opacity * (1 - (1 - t) ** 3);
      if (t < 1) { ikkuna.requestAnimationFrame(askel); return; }
      paata();
    };
    ikkuna.requestAnimationFrame(askel);
  }

  /** Solu muistista tai ämpäristä; palauttaa aina kirjanpito-olion. */
  function lataa(laji, k, avain) {
    const id = `${laji}/l${k}/${avain}`;
    const oli = solut.get(id);
    if (oli) { oli.kaytto = kello; return oli; }
    const taso = luettelo.lajit[laji]?.tasot?.[k];
    const s = {
      laji, k, avain, lupaus: null, viivat: null, olio: null, janoja: 0, tavua: 0,
      kaytto: kello, tyhja: !taso?.tiedostot?.[avain],
    };
    solut.set(id, s);
    if (s.tyhja) { s.lupaus = Promise.resolve(null); return s; }
    const osoite = `${PALLOVEKTORIT_JUURI}${laji}/l${k}/${avain}.bin`;
    mittarit.pyyntoja += 1;
    pyydetyt.add(osoite);
    s.lupaus = ikkuna.fetch(osoite)
      .then((v) => (v?.ok ? v.arrayBuffer() : null))
      .then((puskuri) => {
        if (!puskuri || purettu || !solut.has(id)) return null;
        s.tavua = puskuri.byteLength;
        mittarit.tavua += puskuri.byteLength;
        s.viivat = puraDelta(puskuri);
        const t0 = nyt();
        rakenna(s);
        mittarit.rakennusMs = +(mittarit.rakennusMs + (nyt() - t0)).toFixed(2);
        mittarit.ladattu += 1;
        return s;
      })
      .catch(() => null);
    return s;
  }

  /** Solun oliot ja muisti pois (LRU ja purku). */
  function vapauta(s) {
    vapautaOlio(s);
    s.viivat = null;
  }

  /**
   * Harvennusportaan vaihto: näkyvät solut rakennetaan uudelleen samasta
   * aineistosta, korkeintaan VEKTORIT_HARVENNUS_KATTO kappaletta
   * kerrallaan, jottei zoomaus nykäise. Loput tulevat seuraavilla
   * päivityksillä (jarru 60 ms).
   */
  function tasoitaUudelleen() {
    let jaljella = VEKTORIT_HARVENNUS_KATTO;
    for (const id of nakyvat) {
      if (jaljella <= 0) break;
      const s = solut.get(id);
      if (!s || s.tyhja || !s.viivat || !s.olio || s.harvennus === harvennus) continue;
      const nakyi = s.olio.visible;
      vapautaOlio(s);
      rakenna(s, nakyi);
      jaljella -= 1;
    }
  }

  /** LRU: katon yli menevät, näkymättömät solut pois vanhimmasta alkaen. */
  function karsi() {
    if (solut.size <= VEKTORIT_SOLUKATTO) return;
    const ehdokkaat = [...solut.entries()]
      .filter(([id, s]) => !nakyvat.has(id) && !s.tyhja)
      .sort((a, b) => a[1].kaytto - b[1].kaytto);
    for (const [id, s] of ehdokkaat) {
      if (solut.size <= VEKTORIT_SOLUKATTO) break;
      vapauta(s);
      solut.delete(id);
    }
  }

  /** Näkyvyys päälle ja pois; uusi näkyvä solu häipyy pehmeästi. */
  function nayta() {
    let janoja = 0;
    for (const [id, s] of solut) {
      if (s.tyhja || !s.olio) continue;
      const nakyy = nakyvat.has(id);
      if (nakyy && !s.olio.visible) { s.olio.visible = true; haivyta(s); }
      else if (!nakyy && s.olio.visible) s.olio.visible = false;
      if (nakyy) janoja += s.janoja;
    }
    mittarit.janoja = janoja;
    mittarit.janojaSolua = mittarit.soluja ? Math.round(janoja / mittarit.soluja) : 0;
  }

  /* ---------------- päivitys ---------------------------------------- */

  /** Näkyvä alue ja ruudun tiheys — sama mitta kuin lepokerroksella. */
  function nakyvaAlue() {
    const kamera = kehysmitat?.kamera ?? pallo.camera?.();
    const { W, H } = ruutu();
    const R = kehysmitat?.sade ?? pallo.getGlobeRadius?.();
    if (!kamera || !(W > 0) || !(H > 0) || !(R > 0)) return { alue: null, tarve: 0 };
    const N = LEPOKERROS_NAYTTEITA;
    const naytteet = [];
    for (let j = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) {
        naytteet.push(pinnanPiste(kamera, (W * i) / (N - 1), (H * j) / (N - 1), W, H, R));
      }
    }
    const pov = kehysmitat?.pov ?? pallo.pointOfView?.() ?? { lng: 0 };
    const alue = lepokerroksenAlue(naytteet, pov.lng ?? 0, { vara: VEKTORIT_VARA_AST });
    const keski = pinnanPiste(kamera, W / 2, H / 2, W, H, R);
    const alas = pinnanPiste(kamera, W / 2, H / 2 + LEPOKERROS_MITTAMATKA_PX, W, H, R);
    const ero = keski && alas ? Math.abs(keski.lat - alas.lat) : 0;
    const tarve = ero > 1e-6 ? (LEPOKERROS_MITTAMATKA_PX * pikselisuhde()) / ero : 0;
    return { alue, tarve };
  }

  /** Kehyksen tunnus: kamera ja ruudun mitat. Sama tunnus = ei tarvetta. */
  const kehysTunnus = (k) => (k?.pov
    ? `${k.pov.lat.toFixed(5)},${k.pov.lng.toFixed(5)},${(k.pov.altitude ?? 0).toFixed(6)},${k.W},${k.H},${k.suhde}`
    : '');

  /*
   * Piirtokoukun kuuntelija. Jarru on ennallaan (VEKTORIT_JARRU_MS):
   * kerros päivittyy enintään kerran siinä ajassa ja vain, kun kamera
   * tai ruudun koko on muuttunut. Kehysmitat talletetaan JOKA kehyksellä,
   * jotta materiaalien ruutumitat ja näkyvä alue tulevat aina siitä
   * kehyksestä, jonka kanssa laattakerros laski omansa.
   */
  function kehyksessa(kehys) {
    if (purettu) return;
    kehysmitat = kehys;
    if (kehys.aika - viimeAjo < VEKTORIT_JARRU_MS) return;
    const tunnus = kehysTunnus(kehys);
    if (tunnus === viimeTunnus) return;
    viimeAjo = kehys.aika;
    viimeTunnus = tunnus;
    void paivita();
  }

  async function paivita() {
    if (purettu || !luettelo || !luokat) return false;
    const t0 = nyt();
    kello += 1;
    const { alue, tarve } = nakyvaAlue();
    /*
     * TIHEYS ENSIN, VASTA SITTEN MATERIAALIT: viivan leveys ja
     * harvennusporras liukuvat kameran korkeuden mukana, joten ne on
     * luettava SAMASTA kehyksestä kuin näkyvä alue (sama oppi kuin
     * v1649:n kahdessa kartassa).
     */
    tiheys = tarve;
    harvennus = harvennusPorras(tarve);
    mittarit.harvennus = harvennus;
    tahdista();
    const k = vektoritaso(luettelo.lodit, tarve, VEKTORIT_TERAVYYS_PX);
    mittarit.lod = k;
    mittarit.tol = luettelo.lodit[k];
    mittarit.tarvePxAste = +tarve.toFixed(1);
    mittarit.alue = alue;
    /*
     * RAJAT VASTA MAANÄKYMÄSTÄ SISÄÄNPÄIN: karkeilla tasoilla rajan
     * pistekuvio olisi tiheämpi kuin ruutu ja rajat sulaisivat läiskiksi
     * (luku 4.2; näkyvyysrajan lopullinen arvo on V3:n omistajapäätös).
     */
    const lajit = tarve >= VEKTORIT_RAJAT_PX_ASTE ? ['rannikko', 'rajat'] : ['rannikko'];
    const uudet = new Set();
    const odotettavat = [];
    for (const laji of lajit) {
      const taso = luettelo.lajit[laji]?.tasot?.[k];
      if (!taso) continue;
      for (const avain of vektorisolut(alue, taso.solu ?? luettelo.solu)) {
        const s = lataa(laji, k, avain);
        if (s.tyhja) continue;
        uudet.add(`${laji}/l${k}/${avain}`);
        if (!s.viivat) odotettavat.push(s.lupaus);
      }
    }
    nakyvat = uudet;
    mittarit.soluja = uudet.size;
    tasoitaUudelleen();
    nayta();
    karsi();
    mittarit.paivitaMs = +(nyt() - t0).toFixed(2);
    if (odotettavat.length) {
      await Promise.all(odotettavat);
      if (!purettu) { tasoitaUudelleen(); nayta(); karsi(); }
    }
    return true;
  }

  return {
    valmis,
    paivita,
    /** Mittarit savukkeille ja vartijalle (suunnitelman luku 5). */
    mittarit: () => ({ ...mittarit, pyydetyt: [...pyydetyt] }),
    pura() {
      purettu = true;
      kehyspurku();
      kehyspurku = () => {};
      kehysmitat = null;
      for (const s of solut.values()) vapauta(s);
      solut.clear();
      nakyvat = new Set();
      for (const m of kloonit) m.dispose?.();
      kloonit.clear();
      for (const m of Object.values(materiaalit ?? {})) m.dispose?.();
      materiaalit = null;
      reitit?.aseta?.('vektorit', []);
      mittarit.tila = 'purettu';
    },
  };
}
