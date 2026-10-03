/*
 * AJATTELIJAT-LINSSI (pilotti Sokrates; omistaja 1.10.2026, Päätoimittajan tilaus 2.10.2026). Web on linssien
 * malli, natiivi (Linssiseppä) tekee perään. Visuaalinen malli: Linnanrakentajan Blender-video v7–v10
 * (docs/raportit/kuvat/sokrates-20261001/, haara linnanrakentaja-sokrates-bysti).
 *
 * VAIHE 1 (kehityslipun takana, ?ajattelija=sokrates; ei pelaajille ennen omistajan OK:ta): three.js-näkymä,
 * GLB (L1 + normaalikartta), musta tausta, kova avainvalo (Rembrandt) ja pystyvinjetti laajassa otoksessa,
 * kamera liukuu otsalle, ja Puolustuspuhe 38a kulkee videotykin valona pinnan yli (js/linssit/ajattelija-projektori.js).
 *
 * three.js r185 + GLTFLoader (MIT) ladataan R2:n vendor/-kansiosta vasta, kun linssi avataan (ei etusivun
 * latausta), samaan selaimen välimuistiin kuin pallon kirjasto (js/pallo.js PALLO_KIRJASTO).
 */
import { SOKRATES } from './ajattelija-sokrates.js';
import { MARCUS } from './ajattelija-marcus.js';
import { piirraAtlas, lisaaProjektorit, asetaProjektori, lisaaKipsinPinta } from './ajattelija-projektori.js';
import { pohjatLataaTyyli, luoPohjaKuvanakyma, luoPohjaNostokortti } from '../pohjat/pohjat.js';

const R2 = 'https://media.matkakirja.app/';
/**
 * Prologin kytkimen napsahdus, yhteinen kaikille ajattelijoille. v2 (omistaja 3.10.2026 klo 00.1x: "naksahdus ääni alussa
 * on todella outo. hae siihen oikea ääni"): aito katkaisijaäänite ja konserttisalin konvoluutiokaiku, CC0, 1,8 s
 * (Sisältökirjuri; lähteet ämpärissä ajattelijat/yhteiset/v2/LAHTEET.txt).
 */
export const AJATTELIJA_KYTKIN = 'ajattelijat/yhteiset/v2/kytkin-kaiku.mp3';
export const AJATTELIJA_KIRJASTO = `${R2}vendor/three-gltf-r185.min.js`;
/** ✕ häipyy näin kauan viimeisen napautuksen jälkeen (sama kuin astronautin kameran AUTO_HILJAA_MS). */
export const AJATTELIJA_SULKU_PIILOON_MS = 4000;
/*
 * AJATTELIJAT OVAT DATAA (Päätoimittaja 2.10.2026): uusi ajattelija = uusi js/linssit/ajattelija-<nimi>.js samalla
 * rakenteella kuin SOKRATES + rivi tähän rekisteriin; ?ajattelija=<nimi> avaa sen. Moottori ei tunne yhtäkään ajattelijaa
 * nimeltä. tarkistaAjattelija() vaatii kentät (tests/ajattelija.test.mjs ajaa sen jokaiselle rekisterin ajattelijalle).
 */
export const AJATTELIJAT = Object.freeze({ sokrates: SOKRATES, marcus: MARCUS });

/** Puuttuvat pakolliset kentät (tyhjä lista = kelpaa). */
export function tarkistaAjattelija(a) {
  const puuttuu = [];
  const vaadi = (ehto, nimi) => { if (!ehto) puuttuu.push(nimi); };
  vaadi(a && typeof a.tunnus === 'string', 'tunnus');
  if (!a) return puuttuu;
  for (const k of ['nimi', 'vuodet', 'kysymys', 'malli', 'kipsi']) vaadi(typeof a[k] === 'string' && a[k], k);
  for (const k of ['paa', 'tausta', 'linssi', 'kierto', 'liuku', 'ca', 'syvyys']) vaadi(a[k] != null, k);
  vaadi(a.avainvalo?.suunta && a.avainvalo?.tahtays, 'avainvalo');
  vaadi(a.otokset?.rembrandt?.paikka, 'otokset.rembrandt');
  const lause = a.paalauseet?.[a.kierros?.paalause];
  vaadi(lause?.fi && lause?.el && lause?.viite && lause?.sade && lause?.vino, 'kierros.paalause → paalauseet');
  for (const k of ['nimi', 'kysymys', 'lahesty', 'vieritys', 'lahde', 'kaariLoppu', 'kaiku', 'pito']) vaadi(a.ajat?.[k] != null, `ajat.${k}`);
  vaadi(a.prologi?.valot?.length, 'prologi');
  vaadi(a.intro?.otokset?.length && a.intro?.valo?.length, 'intro');
  vaadi(a.taustavirta?.rivit?.length && a.taustavirta?.projektorit?.length && a.taustavirta?.nopeus?.mms > 0, 'taustavirta');
  vaadi(a.fontit?.iowan, 'fontit.iowan');
  // Valinnaiset: kaiku (null = ei kaikua), syke, elama (lappu), pulunKysymykset (PULU); jos annettu, oltava kokonaisia.
  if (a.kaiku != null) vaadi(a.kaiku.kuva && a.kaiku.kamera, 'kaiku');
  if (a.elama != null) vaadi(a.elama.otsikko && a.elama.kappaleet?.length, 'elama');
  if (a.pulunKysymykset != null) vaadi(Array.isArray(a.pulunKysymykset) && a.pulunKysymykset.length, 'pulunKysymykset');
  vaadi(a.aani?.puhe && a.aani?.musiikki, 'aani');
  vaadi(a.tykki?.vari, 'tykki');
  // Valinnainen aikajana (v13): kamera, aurinko, tykit (päälauseet atlakseen), kaiut, virta ja ääni.
  if (a.aikajana != null) {
    const aj = a.aikajana;
    vaadi(aj.loppu > 0 && aj.kamera?.length && aj.aurinko?.avaimet?.length && aj.virta?.length, 'aikajana');
    vaadi(aj.aani?.puhe && aj.aani?.musiikki, 'aikajana.aani');
    (aj.tykit ?? []).forEach((t, i) => vaadi(a.paalauseet?.[t.paalause]?.fi && a.paalauseet[t.paalause].korkeus, `aikajana.tykit[${i}]`));
    (aj.kaiut ?? []).forEach((k, i) => vaadi(k.kuva && k.energia?.length, `aikajana.kaiut[${i}]`));
  }
  // Valinnaiset kierrokset 2– (Blender v9/v10): päälause, ajat, kaiku ja kameran avaimet.
  if (a.kierrokset != null) {
    const kr = a.kierrokset;
    vaadi(kr.aani?.puhe && kr.aani?.musiikki && kr.loppu > (a.ajat?.pito ?? 0), 'kierrokset.aani/loppu');
    vaadi(kr.kamera?.length >= 2 && kr.kamera[0][0] === a.ajat?.pito && kr.kamera.at(-1)[0] === kr.loppu, 'kierrokset.kamera');
    (kr.lista ?? []).forEach((k, i) => {
      const l = a.paalauseet?.[k.paalause];
      vaadi(l?.fi && l?.el && l?.viite && (l?.sade || l?.sivulta) && l?.vino && l?.ala && l?.korkeus, `kierrokset.lista[${i}].paalause`);
      for (const avain of ['vieritys', 'lahde', 'virta']) vaadi(Array.isArray(k[avain]), `kierrokset.lista[${i}].${avain}`);
      if (k.kaiku != null) vaadi(k.kaiku.kuva && (k.kaiku.kohde?.sade || k.kaiku.kohde?.sivulta) && k.kaiku.ruudut, `kierrokset.lista[${i}].kaiku`);
    });
    vaadi(kr.lista?.length, 'kierrokset.lista');
  }
  return puuttuu;
}
const RUUTUA_S = 30;   // Blender-mallin ruudut

let kolmeLupaus = null;
/** three.js + GLTFLoader yhtenä ES-moduulina (tools/vie-three-vendor.mjs). */
export function lataaKolme() {
  kolmeLupaus ??= import(AJATTELIJA_KIRJASTO).catch((syy) => { kolmeLupaus = null; throw syy; });
  return kolmeLupaus;
}

/** ?ajattelija=<tunnus> → tunnus, jos ajattelija on olemassa (kehityslippu). */
export function ajattelijaLipusta(haku = globalThis.location?.search ?? '') {
  try {
    const t = new URLSearchParams(haku).get('ajattelija');
    return t && AJATTELIJAT[t] ? t : null;
  } catch { return null; }
}

/** Blender (z ylös, kasvot −y) → three.js (y ylös, kasvot +z): (x, y, z) → (x, z, −y). Kierto, ei peilaus. */
export function b2t(THREE, [x, y, z]) { return new THREE.Vector3(x, z, -y); }

/** Pystykenttä asteina Blenderin pystysensorista (24 mm) ja polttovälistä. */
export function kenttaMm(mm) { return 2 * Math.atan(12 / mm) * 180 / Math.PI; }

/**
 * Taustavirran omat fontit (OFL, `tiedosto` ämpärissä) FontFacella ennen atlaksen piirtoa. Puuttuva tai hidas fontti ei
 * estä kohtausta: 4 s:n katto, ja selain käyttää perheen varafonttia (serif).
 */
export async function lataaAjattelijaFontit(a, nimet) {
  if (typeof FontFace !== 'function' || !globalThis.document?.fonts) return;
  const tarvitaan = [...new Set(nimet)].map((n) => a.fontit?.[n]).filter((f) => f?.tiedosto);
  const lataukset = tarvitaan.map(async (f) => {
    const perhe = f.perhe.split(',')[0].replace(/"/g, '').trim();
    if ([...document.fonts].some((ff) => ff.family.replace(/"/g, '') === perhe)) return;
    const ff = new FontFace(perhe, `url(${R2}${f.tiedosto})`);
    document.fonts.add(await ff.load());
  });
  const katto = new Promise((ok) => { setTimeout(ok, 4000); });
  await Promise.race([Promise.allSettled(lataukset), katto]);
}

/** Toistettava satunnaisluku (mulberry32): sama siemen → sama taustavirta joka avauksella. */
function ajattelijaSiemenluku(siemen) {
  let s = siemen >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
function sekoitaSiemenella(lista, satunnainen) {
  for (let i = lista.length - 1; i > 0; i -= 1) {
    const j = Math.floor(satunnainen() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}
const pehmea = (t) => { const x = Math.min(1, Math.max(0, t)); return x * x * (3 - 2 * x); };
const valilla = (r, a, b) => (r - a) / (b - a);

/**
 * Blenderin kamera-avaimet ([ruutu, paikka, katse, mm]) käyränä: jokainen kanava erikseen kuutiollisena Hermite-käyränä,
 * jonka kulmakertoimet ovat Blenderin AUTO_CLAMPED-kahvat (naapurien välinen kulmakerroin; ääriarvossa ja päissä vaaka).
 * Palauttaa funktion ruutu → { paikka, katse, mm } (samat koordinaatit kuin avaimissa).
 */
export function kamerakayra(avaimet) {
  const ruudut = avaimet.map((k) => k[0]);
  const kanavat = avaimet.map(([, c, q, mm]) => [...c, ...q, mm]);
  const kulmat = kanavat.map((arvot, i) => arvot.map((v, j) => {
    if (i === 0 || i === kanavat.length - 1) return 0;
    const e = kanavat[i - 1][j], s = kanavat[i + 1][j];
    if ((v >= e && v >= s) || (v <= e && v <= s)) return 0;
    return (s - e) / (ruudut[i + 1] - ruudut[i - 1]);
  }));
  return (r) => {
    let i = 0;
    while (i < ruudut.length - 2 && r > ruudut[i + 1]) i += 1;
    const dt = ruudut[i + 1] - ruudut[i];
    const t = Math.min(1, Math.max(0, (r - ruudut[i]) / dt));
    const t2 = t * t, t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + t, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
    const x = kanavat[i].map((p0, j) => h00 * p0 + h10 * dt * kulmat[i][j] + h01 * kanavat[i + 1][j] + h11 * dt * kulmat[i + 1][j]);
    return { paikka: x.slice(0, 3), katse: x.slice(3, 6), mm: x[6] };
  };
}

/** Säde edestä (Blender: y = −2 → +y) bystiin: osumapiste ja pinnan normaali three-koordinaateissa. */
function osuma(THREE, mesh, [x, z]) {
  const sade = new THREE.Raycaster(b2t(THREE, [x, -2, z]), b2t(THREE, [0, 1, 0]));
  const o = sade.intersectObject(mesh, false)[0];
  if (!o) return null;
  return { p: o.point.clone(), n: o.face.normal.clone().transformDirection(mesh.matrixWorld).normalize() };
}

/** Lineaarinen arvo avaimista [[ruutu, arvo | [x, y, z]], …]; päiden ulkopuolella ensimmäinen tai viimeinen. */
export function avainArvo(avaimet, r) {
  if (r <= avaimet[0][0]) return avaimet[0][1];
  for (let i = 1; i < avaimet.length; i += 1) {
    const [r1, b] = avaimet[i];
    if (r <= r1) {
      const [r0, a] = avaimet[i - 1];
      const t = r1 > r0 ? (r - r0) / (r1 - r0) : 1;
      return Array.isArray(a) ? a.map((x, j) => x + (b[j] - x) * t) : a + (b - a) * t;
    }
  }
  return avaimet.at(-1)[1];
}

/**
 * Aikajanan kamera (Blender v13): CONSTANT-avain pitää arvonsa seuraavaan avaimeen (leikkaus), BEZIER-avaimista
 * seuraavaan ajetaan; peräkkäiset ajot ovat yksi AUTO_CLAMPED-käyrä (kamerakayra), joka päättyy pitoon tai leikkaukseen.
 */
export function aikajanaKamera(avaimet) {
  const ajot = [];
  let i = 0;
  while (i < avaimet.length - 1) {
    if (avaimet[i][4] !== 'BEZIER') { i += 1; continue; }
    let e = i;
    while (e < avaimet.length - 1 && avaimet[e][4] === 'BEZIER') e += 1;
    ajot.push({ alku: avaimet[i][0], loppu: avaimet[e][0], kayra: kamerakayra(avaimet.slice(i, e + 1)) });
    i = e;
  }
  return (r) => {
    const ajo = ajot.find((x) => r >= x.alku && r < x.loppu);
    if (ajo) return ajo.kayra(r);
    let k = avaimet[0];
    for (const x of avaimet) if (r >= x[0]) k = x;
    return { paikka: k[1], katse: k[2], mm: k[3] };
  };
}

/**
 * Aikajanan aurinko: paikka avaimista suunnan ja etäisyyden mukaan (kierto ei oikaise ympyrän läpi), energia ja väri
 * lineaarisesti. Palauttaa funktion ruutu → { paikka, energia, vari? } (Blender-koordinaatit).
 */
export function aikajanaAurinko({ kohde, avaimet }) {
  const suhteessa = avaimet.map(([r, p, e, vari]) => {
    const d = p.map((x, i) => x - kohde[i]);
    const pituus = Math.hypot(...d);
    return { r, suunta: d.map((x) => x / pituus), pituus, e, vari };
  });
  return (r) => {
    let i = suhteessa.findIndex((x) => r <= x.r);
    if (i <= 0) i = i < 0 ? suhteessa.length - 1 : 0;
    const b = suhteessa[i], a = suhteessa[Math.max(0, i - 1)];
    const t = b.r > a.r ? Math.min(1, Math.max(0, (r - a.r) / (b.r - a.r))) : 1;
    const s = a.suunta.map((x, j) => x + (b.suunta[j] - x) * t);
    const n = Math.hypot(...s) || 1;
    const pituus = a.pituus + (b.pituus - a.pituus) * t;
    const vari = a.vari && b.vari ? a.vari.map((x, j) => x + (b.vari[j] - x) * t) : (b.vari ?? a.vari);
    return { paikka: s.map((x, j) => kohde[j] + x / n * pituus), energia: a.e + (b.e - a.e) * t, vari };
  };
}

/** Säde sivulta (Blender: x = 2 → −x) bystiin, kuten sokrates_bysti.py sivulta(y, z). */
function osumaSivulta(THREE, mesh, [y, z]) {
  const sade = new THREE.Raycaster(b2t(THREE, [2, y, z]), b2t(THREE, [-1, 0, 0]));
  const o = sade.intersectObject(mesh, false)[0];
  if (!o) return null;
  return { p: o.point.clone(), n: o.face.normal.clone().transformDirection(mesh.matrixWorld).normalize() };
}
/** Kohta bystillä: { sade: [x, z] } edestä tai { sivulta: [y, z] }. */
function kohta(THREE, mesh, k) {
  return k.sivulta ? osumaSivulta(THREE, mesh, k.sivulta) : osuma(THREE, mesh, k.sade);
}

/** Blenderin lentoasento: kamera pinnan alapuolelta katsoen ylös pintaa pitkin; nostetaan, jos pinta peittää. */
export function lentoasento(THREE, mesh, p, n, kulma = 38, matka = 0.09) {
  const ylos = new THREE.Vector3(0, 1, 0);
  const u = ylos.clone().sub(n.clone().multiplyScalar(ylos.dot(n))).normalize();
  const t = u.clone().cross(n).normalize();
  let a = kulma * Math.PI / 180;
  let c = null;
  const sade = new THREE.Raycaster();
  for (let k = 0; k < 8; k += 1) {
    const f = u.clone().multiplyScalar(Math.cos(a)).sub(n.clone().multiplyScalar(Math.sin(a))).normalize();
    c = p.clone().sub(f.multiplyScalar(matka));
    const suunta = p.clone().sub(c);
    const pituus = suunta.length();
    sade.set(c, suunta.normalize());
    sade.far = pituus - 0.004;
    if (!sade.intersectObject(mesh, false).length) break;
    a += 6 * Math.PI / 180;
  }
  return { c, t, u };
}

/**
 * Avaa ajattelijan näkymän. Palauttaa { sulje, mittari } tai null, jos WebGL/kirjasto puuttuu.
 * asetukset.malliUrl ohittaa R2-osoitteen (testit), asetukset.koti = isäntäelementti (oletus body).
 */
export async function avaaAjattelija(tunnus, { koti = document.body, malliUrl = null, sulkeutui = null } = {}) {
  const a = AJATTELIJAT[tunnus];
  if (!a) return null;
  const puuttuu = tarkistaAjattelija(a);
  if (puuttuu.length) { console.warn('ajattelija: puuttuvat kentät', tunnus, puuttuu); return null; }
  const THREE = await lataaKolme();
  const { GLTFLoader } = THREE;

  // Pohja: KUVANÄKYMÄ (tumma, ✕ lasia, veto alas, Esc; js/pohjat/pohjat.js). Sisältö pohjan sisalto-solmuun.
  const pohja = luoPohjaKuvanakyma({ nimi: `${a.nimi}: ajattelija`, sulje: () => sulje() });
  const juuri = pohja.sisalto;
  pohja.el.classList.add('ajattelija');
  /*
   * ✕ PIILOSSA, KUNNES NAPAUTETAAN (omistaja 3.10.2026 klo 00.1x: "yläreunan x saa olla piilossa kunnes pelaaja
   * napauttaa ruutua, ja katoaa sitten taas hetken päästä"). Sama mekanismi ja ajoitus kuin astronautin kameran
   * AUTO-hiljaisuudessa (js/linssit/satelliitti.js AUTO_HILJAA_MS): napautus mihin tahansa tuo ✕:n, ja se häipyy
   * AJATTELIJA_SULKU_PIILOON_MS:n kuluttua viimeisestä napautuksesta. Esc ja veto alas sulkevat kuten ennenkin.
   */
  pohja.el.classList.add('ajattelija-sulku-piilossa');
  let sulkuAjastin = 0;
  pohja.el.addEventListener('pointerdown', () => {
    pohja.el.classList.remove('ajattelija-sulku-piilossa');
    clearTimeout(sulkuAjastin);
    sulkuAjastin = setTimeout(() => pohja.el.classList.add('ajattelija-sulku-piilossa'), AJATTELIJA_SULKU_PIILOON_MS);
  }, true);
  const renderoija = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderoija.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderoija.toneMapping = THREE.AgXToneMapping;
  renderoija.outputColorSpace = THREE.SRGBColorSpace;
  renderoija.shadowMap.enabled = true;
  renderoija.shadowMap.type = THREE.PCFShadowMap;
  Object.assign(renderoija.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
  // Pystyvinjetti laajoihin otoksiin (sokrates_vinjetti.py): 52 %:sta alas smoothstep ×0,35 ja lievä säteittäinen.
  const vinjetti = document.createElement('div');
  Object.assign(vinjetti.style, {
    position: 'absolute', inset: '0', pointerEvents: 'none', transition: 'opacity 1.2s',
    background: 'linear-gradient(to bottom, transparent 52%, rgba(0,0,0,0.05) 62%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0.58) 92%, rgba(0,0,0,0.65) 100%),'
      + ' radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)',
  });
  // Nimi, kysymys ja lähderivi (css/pohjat/pinnat/ajattelija.css); näkyvyys aikajanalta.
  pohjatLataaTyyli();
  const nimi = document.createElement('p');
  nimi.className = 'ajattelija-teksti ajattelija-nimi';
  (a.nimiRivit ?? [a.nimi]).forEach((rivi, i) => { if (i) nimi.append(document.createElement('br')); nimi.append(rivi); });
  const vuodet = document.createElement('span');
  vuodet.className = 'ajattelija-vuodet';
  vuodet.textContent = a.vuodet;
  nimi.append(vuodet);
  const kysymys = document.createElement('p');
  kysymys.className = 'ajattelija-teksti ajattelija-kysymys';
  kysymys.textContent = a.kysymys;
  const lahde = document.createElement('p');
  lahde.className = 'ajattelija-lahde';
  const lahdeEl = document.createElement('span');
  lahdeEl.className = 'ajattelija-lahde__kreikka';
  const lahdeViite = document.createElement('span');
  lahdeViite.className = 'ajattelija-lahde__viite';
  lahde.append(lahdeEl, lahdeViite);
  juuri.append(renderoija.domElement, vinjetti, nimi, kysymys, lahde);
  koti.appendChild(pohja.el);
  pohja.avaa();

  const kohtaus = new THREE.Scene();
  // Blenderin maailma 0,012 (lineaarinen) näkyy AgX:n jälkeen lähes mustana (#0b0c10 mallikuvissa); tausta
  // piirretään suoraan näyttöväriin, ja maailman valo on heikko täyte (varjopuoli ei ole täysin musta).
  const taustaVari = new THREE.Color().setRGB(11 / 255, 12 / 255, 16 / 255, THREE.SRGBColorSpace);
  const mustaVari = new THREE.Color(0, 0, 0);   // prologi: maailma 0 (Blender --prologi), vain ääriviivavalo
  kohtaus.background = taustaVari;
  const haku = new URLSearchParams(location.search);
  const TAYTE = Number(haku.get('tayte')) || 0.12;
  const maailma = new THREE.HemisphereLight(new THREE.Color(0.9, 0.92, 1.0), new THREE.Color(0.25, 0.25, 0.28), TAYTE);
  kohtaus.add(maailma);
  const kamera = new THREE.PerspectiveCamera(kenttaMm(a.otokset.rembrandt.mm), 1, 0.003, 10);

  const gltf = await new GLTFLoader().loadAsync(malliUrl ?? `${R2}${a.malli}`);
  let mesh = null;
  gltf.scene.traverse((o) => { if (o.isMesh && !mesh) mesh = o; });
  const mat = mesh.material;
  mat.side = THREE.FrontSide;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  kohtaus.add(gltf.scene);
  gltf.scene.updateMatrixWorld(true);

  // Avainvalo (v7 "aurinko" Rembrandt-asennossa, v10 vinjetti: keila 32° täydellä pehmeydellä pään keskelle).
  const av = a.avainvalo;
  const valo = new THREE.SpotLight(new THREE.Color(1.0, 0.95, 0.88), 1, 0, av.keila / 2 * Math.PI / 180, 1.0, 2);
  const paa = b2t(THREE, a.paa);
  const suunta = b2t(THREE, av.suunta).normalize();
  valo.position.copy(paa).add(suunta.clone().multiplyScalar(av.etaisyys));
  valo.target.position.copy(b2t(THREE, av.tahtays));
  valo.castShadow = true;
  valo.shadow.mapSize.set(2048, 2048);
  valo.shadow.camera.near = 0.6;
  valo.shadow.camera.far = 2.2;
  valo.shadow.bias = -0.0004;
  valo.shadow.normalBias = 0.002;
  const AVAIN = Number(haku.get('avain')) || 8.5;
  valo.intensity = AVAIN;
  kohtaus.add(valo, valo.target);

  // Päälause 38a videotykkinä otsalla; kierrokset 2– (a.kierrokset) vaihtavat lauseen, paikan ja atlasrivin.
  const AJ = a.aikajana ?? null;   // v13: koko kohtaus yhtenä aikajanana (kierrokset eivät ole käytössä)
  const KR = AJ ? null : (a.kierrokset ?? null);
  const lause = a.paalauseet[a.kierros.paalause];
  const tv = a.taustavirta;
  // Rivien kirkkaus päälauseeseen nähden: Blenderin AgX puristaa kirkkaan päälauseen, webin AgX vähemmän (v10-kuva).
  const RIVIT = Number(haku.get('rivit')) || 0.75;
  const fontti = (nimi) => a.fontit[nimi] ?? a.fontit.iowan;
  await lataaAjattelijaFontit(a, tv.rivit.map(([, f]) => f));
  // Päälause: kirjaimet 1,15 × gobon mittasuhde (mitattu v10-kuvasta: v10:n päälausegobo oli väljempi kuin v4:n).
  const lauseRivi = (l) => ({ teksti: l.fi, fontti: fontti('iowan').perhe, paino: fontti('iowan').paino, korkeus: 192, sumea: true, emOsuus: 1.15 });
  const { kangas, paikat } = piirraAtlas([
    lauseRivi(lause),
    ...tv.rivit.map(([, f, teksti]) => ({ teksti, fontti: fontti(f).perhe, paino: fontti(f).paino, korkeus: 96, toisto: true })),
    ...(KR?.lista ?? []).map((k) => lauseRivi(a.paalauseet[k.paalause])),
    ...(AJ?.tykit ?? []).map((t) => lauseRivi(a.paalauseet[t.paalause])),
  ]);
  const atlas = new THREE.CanvasTexture(kangas);
  atlas.flipY = false;
  atlas.colorSpace = THREE.NoColorSpace;
  atlas.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  atlas.minFilter = THREE.LinearMipmapLinearFilter;
  atlas.wrapS = THREE.RepeatWrapping;   // toistorivit (päälause rajataan varjostimessa)
  const u = lisaaProjektorit(THREE, mat, atlas);
  // Terävä kipsi (v9-palaute): normaalikartan anisotropia ja mikronormaali (lataus taustalla; ilman sitä pinta on GLB:n).
  if (mat.normalMap) mat.normalMap.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  const detalji = new THREE.TextureLoader().load(`${R2}${a.kipsi}`);
  detalji.wrapS = detalji.wrapT = THREE.RepeatWrapping;
  detalji.colorSpace = THREE.NoColorSpace;
  detalji.anisotropy = renderoija.capabilities.getMaxAnisotropy();
  lisaaKipsinPinta(THREE, mat, detalji);
  u.pVari.value.setRGB(...a.tykki.vari);
  const os = osuma(THREE, mesh, lause.sade);
  // Blender: tykin teho 220 W vs. auringon 95 W samalla säteilymallilla → sama suhde three.js:n voimiin.
  const TYKKI = AVAIN * 220 / 95 * (Number(haku.get('tykki')) || 1.6);
  /** Päälauseen videotykki pinnan kohdassa kp (osuma): paikka normaalin ja vinouden suunnassa, vieritysväli s0. */
  const lauseTykki = (l, kp, rivi) => ({
    lause: l, rivi, kohde: kp.p, etaisyys: l.etaisyys, nauhaKork: l.korkeus, ala: l.ala,
    paikka: kp.p.clone().add(kp.n.clone().add(b2t(THREE, l.vino)).normalize().multiplyScalar(l.etaisyys)),
    s0: 0.5 + l.ala / 2 / (l.korkeus * rivi.lev / rivi.korkeus),
  });

  /*
   * Taustavirta (paan_virta): rivit jaetaan projektoreille tasaisin välein kuva-alan korkeudelle. Siemen määrää koot,
   * kirkkaudet, kulmat ja tahdit; kierrokset 2– asettelevat saman 20 riviä omalla siemenellään (Blender virta2/virta3).
   */
  function asetaVirta(siemen) {
    const satunnainen = ajattelijaSiemenluku(siemen);
    /*
     * NOPEUDET LÄHES SAMAT (omistaja 3.10.2026 klo 00.0x: "tekstit saisivat liikkua suurinpiirtein samalla nopeudella
     * vaikka pieniä eroja nopeudessa on hyvä olla. nyt erot liian suuria"; Blender v11): nopeus PINNALLA mm/s ± vaihtelu,
     * kertoimet tasavälein ja sekoitettuina samalla siemenellä kuin ennen. uv/ruutu = m/s / 30 / rivin leveys pinnalla.
     * (v10:n 0,0007 × 1,18^k uv/ruutu teki pinnalla 4,5–102 mm/s.)
     */
    const { mms, vaihtelu } = tv.nopeus;
    const nopeudet = tv.rivit.map((_, k) => 1 - vaihtelu + 2 * vaihtelu * k / Math.max(1, tv.rivit.length - 1));
    sekoitaSiemenella(nopeudet, satunnainen);
    const lista = [];
    let ri = 0;
    for (const pj of tv.projektorit) {
      const kohde = b2t(THREE, pj.kohde);
      const paikka = kohde.clone().add(b2t(THREE, pj.suunta).normalize().multiplyScalar(tv.etaisyys));
      for (let k = 0; k < pj.riveja && ri < tv.rivit.length; k += 1, ri += 1) {
        const [kieli] = tv.rivit[ri];
        const koot = kieli === 'fi' ? [...tv.rivikork].sort((x, y) => x - y).slice(0, 2) : tv.rivikork;
        const kork = koot[Math.floor(satunnainen() * koot.length)];
        const [kMin, kMax] = tv.kirkkaus[kieli] ?? tv.kirkkaus.el;
        const kirkkaus = kMin + (kMax - kMin) * satunnainen();
        const vM = (-0.4 + 0.8 * (k + 0.5) / pj.riveja) * pj.ala + (satunnainen() * 2 - 1) * 0.01;
        const kulma = (satunnainen() * 2 - 1) * tv.kulma * Math.PI / 180;
        const i = 1 + ri;
        asetaProjektori(THREE, u, i, {
          paikka, kohde, etaisyys: tv.etaisyys, nauhaKork: kork, rivi: paikat[i], ala: pj.ala, blend: tv.blend,
          kulma, vM, toisto: true, atlasKorkeus: kangas.height,
        });
        const riviLev = kork * paikat[i].lev / paikat[i].korkeus;   // laatta pinnalla (m), u:n yksikkö
        const nopeus = mms / 1000 * nopeudet[ri] / RUUTUA_S / riviLev;
        lista.push({ i, nopeus: nopeus * (ri % 2 ? 1 : -1), mms: mms * nopeudet[ri], voima: TYKKI * tv.voimaKerroin * kirkkaus * RIVIT });
      }
    }
    return lista;
  }
  let virta = asetaVirta(tv.siemen);
  u.pMaara.value = 1 + virta.length;
  const kaikuIndeksi = 1 + virta.length;

  // Kamera: Rembrandt → lentoasento otsalle (35 → 18 mm) → kaari ±22° ja liuku ±8 mm tekstin aikana → pito.
  const rem = a.otokset.rembrandt;
  const remPaikka = b2t(THREE, rem.paikka), remKatse = b2t(THREE, rem.katse);
  const lento = lentoasento(THREE, mesh, os.p, os.n, lause.kameraKulma, lause.kameraMatka);
  const kaari = (osuus) => {
    const kierto = new THREE.Quaternion().setFromAxisAngle(os.n, (-a.kierto + 2 * a.kierto * osuus) * Math.PI / 180);
    const liuku = lento.t.clone().multiplyScalar(-a.liuku + 2 * a.liuku * osuus);
    return {
      paikka: os.p.clone().add(lento.c.clone().sub(os.p).applyQuaternion(kierto)).add(liuku),
      katse: os.p.clone().add(liuku.clone().multiplyScalar(0.5)),
    };
  };
  const T = a.ajat;
  const LOPPU = AJ ? AJ.loppu : KR ? KR.loppu : T.pito;
  const W = AVAIN / 95;   // Blenderin wateista three.js:n voimaksi (aurinko 95 W = AVAIN)

  // PROLOGI: kaksi reunavaloa takaa (ääriviivavalo; ei varjoja eikä taustaa), kiinteä kamera.
  const pr0 = a.prologi;
  const prologiValot = pr0.valot.map((v) => {
    const s = new THREE.SpotLight(new THREE.Color(...pr0.vari), 0, 0, v.keila / 2 * Math.PI / 180, v.blend, 2);
    s.position.copy(b2t(THREE, v.paikka));
    s.target.position.copy(b2t(THREE, v.kohde));
    kohtaus.add(s, s.target);
    return { s, teho: v.teho * W };
  });
  const prKamera = { paikka: b2t(THREE, pr0.kamera.paikka), katse: b2t(THREE, pr0.kamera.katse), mm: pr0.kamera.mm };
  const hehku = (r) => (r < pr0.kytkin ? 0 : r < pr0.taysi
    ? valilla(r, pr0.kytkin, pr0.taysi) ** 2.2 * (1 + 0.08 * Math.sin(r * 2.7)) : 1);

  // INTRO: leikkaukset ja auringon polku (avaimet; pehmeä siirtymä avainten välillä).
  /*
   * Intron avaimet [ruutu, paikka, katse, mm, tapa?]: oletus CONSTANT (leikkaus iskuun), 'BEZIER' = hidas ajo seuraavaan
   * avaimeen (Blender v12: yksi ajo profiilista ¾-kuvaan ruuduissa 1→520 ennen leikkauksia).
   */
  const otokset = a.intro.otokset.map(([r, c, q, mm, tapa], i, kaikki) => {
    const seuraava = kaikki[i + 1];
    return {
      r, paikka: b2t(THREE, c), katse: b2t(THREE, q), mm,
      ajo: tapa === 'BEZIER' && seuraava ? kamerakayra([[r, c, q, mm], seuraava.slice(0, 4)]) : null,
    };
  });
  const valoAvaimet = a.intro.valo.map(([r, s]) => ({ r, suunta: b2t(THREE, s).normalize() }));
  const tahtays = b2t(THREE, av.tahtays);
  function auringonSuunta(r) {
    let e = valoAvaimet[0];
    for (const v of valoAvaimet) {
      if (r <= v.r) {
        if (v === e) return v.suunta.clone();
        return e.suunta.clone().lerp(v.suunta, pehmea(valilla(r, e.r, v.r))).normalize();
      }
      e = v;
    }
    return e.suunta.clone();
  }

  /*
   * KAIKU: kaikukuva videotykillä (oma tekstuuri) ainoana valona, täyte ja syke. Kierroksella 1 otsalla (a.kaiku),
   * kierroksilla 2– kierroksen oma kaiku (kylix silmämunassa, David kasvojen sivulla). Yksi kaikupaikka projektoreissa:
   * kaiut eivät ole päällekkäin, joten paikka suunnataan ja tekstuuri vaihdetaan kierroksen vaihtuessa.
   */
  const kk = AJ ? null : a.kaiku;   // aikajanassa kaiut tulevat aikajanasta
  const KAIKU_TAYTE = Number(haku.get('kaikutayte')) || 0.5;
  const KAIKU_VOIMA = Number(haku.get('kaikuvoima')) || 1.5;
  const tayteMalli = kk?.tayte ?? { osuus: 0.10, vari: [0.90, 0.94, 1.0], keila: 45, blend: 0.7 };
  let syke = {};
  // Kaiku on valinnainen (Marcuksella ei vielä ole): ilman sitä kaaren kamera jatkuu pitoon ja aurinko pysyy.
  let kaikuTayte = null;
  let kaikuKamera = null;
  const kaiut = [];   // kierroksittain: null tai { kuva, paikka, kohde, etaisyys, lev, blend, voima, liuku, ruudut, savy, tayte, tk }
  if (kk) {
    kaiut[0] = {
      kuva: kk.kuva, kohde: os.p, etaisyys: kk.etaisyys, lev: kk.lev, blend: kk.blend, voima: kk.voima, liuku: kk.liuku,
      ruudut: T.kaiku, savy: kk.savy, tayte: kk.tayte.suunta,
      paikka: os.p.clone().add(os.n.clone().add(b2t(THREE, kk.vino)).normalize().multiplyScalar(kk.etaisyys)),
    };
    // Kaiun kamera (v10): lähempänä tasaisempaa otsan pintaa, hidas ajo ja liuku.
    const kaikuSuunta = os.n.clone().add(b2t(THREE, kk.kamera.suunta)).normalize();
    kaikuKamera = (osuus) => {
      const liuku = lento.t.clone().multiplyScalar(kk.kamera.liuku * osuus);
      const matka = kk.kamera.matka[0] + (kk.kamera.matka[1] - kk.kamera.matka[0]) * osuus;
      return { paikka: os.p.clone().add(kaikuSuunta.clone().multiplyScalar(matka)).add(liuku), katse: os.p.clone().add(liuku) };
    };
  }

  // Kierrokset: 0 = kierros 1 (otsa), 1– = a.kierrokset.lista.
  const kierrokset = [{
    ...lauseTykki(lause, os, paikat[0]), vieritys: T.vieritys, lahde: T.lahde, virta: tv.ajat, siemen: tv.siemen, alku: 0,
  }];
  (KR?.lista ?? []).forEach((k, j) => {
    const l = a.paalauseet[k.paalause];
    const kp = kohta(THREE, mesh, l);
    if (!kp) { console.warn('ajattelija: kierroksen päälause ei osu bystiin', k.paalause); return; }
    kierrokset.push({
      ...lauseTykki(l, kp, paikat[1 + tv.rivit.length + j]), vieritys: k.vieritys, lahde: k.lahde, virta: k.virta,
      siemen: k.siemen ?? tv.siemen, alku: k.virta[0],
    });
    const kc = k.kaiku;
    const ko = kc && kohta(THREE, mesh, kc.kohde);
    if (!ko) return;
    kaiut[kierrokset.length - 1] = {
      kuva: kc.kuva, kohde: ko.p, etaisyys: kc.etaisyys, lev: kc.lev, blend: kc.blend ?? kk?.blend ?? 0.3, voima: kc.voima,
      liuku: kc.liuku, ruudut: kc.ruudut, savy: kc.savy ?? kk?.savy ?? [1.0, 0.78, 0.52], tayte: kc.tayte?.suunta ?? tayteMalli.suunta,
      paikka: ko.p.clone().add(ko.n.clone().add(b2t(THREE, kc.vino)).normalize().multiplyScalar(kc.etaisyys)),
    };
  });
  // Auringon hiipumisen ikkunat: kaikki kaiut (aurinko ja maailma hiipuvat 45 ruudussa kunkin kaiun ajaksi).
  const kaikuIkkunat = kaiut.filter(Boolean).map((e) => e.ruudut);
  if (kaiut.some(Boolean)) {
    kaikuTayte = new THREE.SpotLight(new THREE.Color(...tayteMalli.vari), 0, 0, tayteMalli.keila / 2 * Math.PI / 180, tayteMalli.blend, 2);
    kohtaus.add(kaikuTayte, kaikuTayte.target);
  }
  let nykyKierros = -1;
  /** Kaikupaikka kierroksen k kaiulle (tai pois, jos kaikua ei ole tai kuva ei ole vielä latautunut). */
  function sovitaKaiku(k) {
    const e = kaiut[k];
    u.pMaara.value = 1 + virta.length;
    if (!e) return;
    kaikuTayte.position.copy(e.kohde).add(b2t(THREE, e.tayte).normalize());
    kaikuTayte.target.position.copy(e.kohde);
    if (!e.tk) return;
    u.pKaiku.value = e.tk;
    u.pKaikuVari.value.setRGB(...e.savy);
    const korkeus = e.lev * e.tk.image.height / e.tk.image.width;
    asetaProjektori(THREE, u, kaikuIndeksi, {
      paikka: e.paikka, kohde: e.kohde, etaisyys: e.etaisyys, nauhaKork: korkeus,
      rivi: { lev: e.tk.image.width, korkeus: e.tk.image.height, uMax: 1 }, ala: Math.max(e.lev, korkeus), blend: e.blend,
      atlasKorkeus: e.tk.image.height, kaiku: true,
    });
    u.pMaara.value = kaikuIndeksi + 1;
  }
  kaiut.forEach((e, k) => {
    if (!e) return;
    new THREE.TextureLoader().loadAsync(`${R2}${e.kuva}`).then((tk) => {
      tk.colorSpace = THREE.NoColorSpace;
      // Varjostin lukee kuvan rivit ylhäältä alas (1 − v) kuten atlaksen; ilman tätä kaiku piirtyi ylösalaisin.
      tk.flipY = false;
      e.tk = tk;
      if (k === nykyKierros) sovitaKaiku(k);
    }).catch((syy) => console.warn('ajattelija: kaikukuva', e.kuva, syy));
  });
  const sykeLahde = AJ ? AJ.syke : KR ? KR.syke : a.syke;
  if ((AJ || kaiut.some(Boolean)) && sykeLahde) fetch(`${R2}${sykeLahde}`).then((v) => (v.ok ? v.json() : {})).then((j) => { syke = j; }).catch(() => {});

  /** Kierros k päälle: päälauseen tykki, lähderivi, taustavirran asettelu ja kaiku. */
  function asetaKierros(k) {
    if (k === nykyKierros) return;
    const edellinen = kierrokset[nykyKierros];
    nykyKierros = k;
    const kt = kierrokset[k];
    asetaProjektori(THREE, u, 0, {
      paikka: kt.paikka, kohde: kt.kohde, etaisyys: kt.etaisyys, nauhaKork: kt.nauhaKork, rivi: kt.rivi, ala: kt.ala,
      ca: a.ca, syvyys: a.syvyys, atlasKorkeus: kangas.height,
    });
    lahdeEl.textContent = kt.lause.el;
    lahdeViite.textContent = kt.lause.viite;
    if (edellinen && edellinen.siemen !== kt.siemen) virta = asetaVirta(kt.siemen);
    sovitaKaiku(k);
  }
  const kierrosRuudussa = (r) => {
    let k = 0;
    for (let j = 1; j < kierrokset.length; j += 1) if (r >= kierrokset[j].alku) k = j;
    return k;
  };
  asetaKierros(0);
  // Kierrosten 2– kamera: Blenderin avaimet; ensimmäinen avain (kierroksen 1 pito) tämän näkymän omasta pidosta.
  const t2b = (v) => [v.x, -v.z, v.y];
  let kierrosKamera = null;
  if (KR && kierrokset.length > 1) {
    const pito = kk ? kaikuKamera(1) : kaari(1);
    const pitoMm = kk ? kk.kamera.mm : a.linssi;
    kierrosKamera = kamerakayra([[T.pito, t2b(pito.paikka), t2b(pito.katse), pitoMm], ...KR.kamera.slice(1)]);
  }

  const nayta = (el, r, [a0, a1], hai = 15) => {
    el.style.opacity = String(r < a0 || r > a1 ? 0 : Math.min(1, (r - a0) / hai, (a1 - r) / hai));
  };
  function asetaKamera(paikka, katse, mm) {
    kamera.position.copy(paikka);
    kamera.lookAt(katse);
    kamera.fov = kenttaMm(mm);
    kamera.updateProjectionMatrix();
  }

  /** Prologin ruutu p (1–120). */
  function asetaPrologi(p) {
    const h = hehku(p);
    for (const v of prologiValot) v.s.intensity = v.teho * h;
    kohtaus.background = mustaVari;
    valo.intensity = 0;
    maailma.intensity = 0;
    if (kaikuTayte) kaikuTayte.intensity = 0;
    u.pB.value.forEach((b) => { b.w = 0; });
    asetaKamera(prKamera.paikka, prKamera.katse, prKamera.mm);
    vinjetti.style.opacity = '0';
    for (const el of [nimi, kysymys, lahde]) el.style.opacity = '0';
  }

  /** Kierrosten ruutu r (1–LOPPU; Blender v7–v10, kierrokset 2– v9/v10). */
  function asetaRuutu(r) {
    for (const v of prologiValot) v.s.intensity = 0;
    kohtaus.background = taustaVari;
    const k = kierrosRuudussa(r);
    asetaKierros(k);
    const kt = kierrokset[k];
    let paikka, katse, mm;
    if (r < T.nimi[0]) {
      let o = otokset[0];
      for (const x of otokset) if (r >= x.r) o = x;
      if (o.ajo) {
        const k = o.ajo(r);
        paikka = b2t(THREE, k.paikka); katse = b2t(THREE, k.katse); mm = k.mm;
      } else ({ paikka, katse, mm } = o);
    } else if (r <= T.lahesty[0]) { paikka = remPaikka; katse = remKatse; mm = rem.mm; }
    else if (r <= T.lahesty[1]) {
      const kv = pehmea(valilla(r, T.lahesty[0], T.lahesty[1]));
      const loppu = kaari(0);
      paikka = remPaikka.clone().lerp(loppu.paikka, kv); katse = remKatse.clone().lerp(loppu.katse, kv);
      mm = rem.mm + (a.linssi - rem.mm) * kv;
    } else if (kierrosKamera && r > T.pito) {
      const kc = kierrosKamera(r);
      paikka = b2t(THREE, kc.paikka); katse = b2t(THREE, kc.katse); mm = kc.mm;
    } else if (!kk || r <= T.kaiku[0]) {
      const kk2 = kaari(pehmea(valilla(Math.min(r, T.kaariLoppu), T.lahesty[1], T.kaariLoppu)));
      paikka = kk2.paikka; katse = kk2.katse; mm = a.linssi;
    } else {
      // Kaiku: siirtymä kaaren lopusta kaiun kameraan (45 ruutua), sitten hidas ajo kaiun loppuun.
      const [ka0, kl0] = T.kaiku;
      const kaarenLoppu = kaari(1);
      const k1 = pehmea(valilla(r, ka0, ka0 + kk.kamera.siirtyma));
      const kp = kaikuKamera(Math.min(1, Math.max(0, valilla(r, ka0 + kk.kamera.siirtyma, kl0))));
      paikka = kaarenLoppu.paikka.clone().lerp(kp.paikka, k1);
      katse = kaarenLoppu.katse.clone().lerp(kp.katse, k1);
      mm = a.linssi + (kk.kamera.mm - a.linssi) * k1;
    }
    asetaKamera(paikka, katse, mm);
    vinjetti.style.opacity = r >= T.nimi[0] && r < T.lahesty[0] + 20 ? '1' : '0';
    nayta(nimi, r, T.nimi);
    nayta(kysymys, r, T.kysymys);
    nayta(lahde, r, kt.lahde, 10);

    // Aurinko: polku introssa, Rembrandt sen jälkeen; hiipuu nollaan jokaisen kaiun ajaksi (45 ruutua), samoin maailma.
    const sv = auringonSuunta(r);
    valo.position.copy(paa).add(sv.multiplyScalar(av.etaisyys));
    valo.target.position.copy(tahtays);
    let hiipuu = 1;
    for (const [ka, kl] of kaikuIkkunat) {
      if (r > ka && r < kl) hiipuu = Math.min(hiipuu, Math.max(0, 1 - Math.min(1, (r - ka) / 45, (kl - r) / 45)));
    }
    valo.intensity = AVAIN * hiipuu;
    // v11 (omistaja 3.10.): alkukuvissa varjopuoli lähes mustaksi, jotta kasvoille piirtyy vain valon ääriviiva.
    maailma.intensity = TAYTE * hiipuu * (r < T.nimi[0] ? (a.intro.tayte ?? 1) : 1);
    const kaikuK = 1 - hiipuu;
    // Webin AgX nostaa himmeää täytettä enemmän kuin Blenderin "Medium High Contrast": 0,10 → 0,05 (v9-täytekoe).
    if (kaikuTayte) kaikuTayte.intensity = AVAIN * tayteMalli.osuus * KAIKU_TAYTE * kaikuK;
    const e = kaiut[k];
    if (e?.tk) {
      const [ka, kl] = e.ruudut;
      u.pA.value[kaikuIndeksi].w = -e.liuku + 2 * e.liuku * Math.min(1, Math.max(0, valilla(r, ka, kl)));
      u.pB.value[kaikuIndeksi].w = e.voima * W * KAIKU_VOIMA * kaikuK * (syke[String(Math.round(r))] ?? 1);
    }

    // Päälause vierii lineaarisesti −s0 → s0; teho nousee ja laskee 6 ruudussa (v4_projektori).
    const [va, vl] = kt.vieritys;
    u.pA.value[0].w = -kt.s0 + 2 * kt.s0 * Math.min(1, Math.max(0, valilla(r, va, vl)));
    const teho = r < va || r > vl ? 0 : Math.min(1, (r - va) / 6, (vl - r) / 6);
    u.pB.value[0].w = TYKKI * Math.max(0, teho);
    // Taustavirta: lineaarinen häivytys (r0 → r1 sisään, r2 → r3 ulos), siirto = nopeus × ruudut.
    const [r0, r1, r2, r3] = kt.virta;
    const vk = r <= r0 || r >= r3 ? 0 : Math.min(1, (r - r0) / (r1 - r0), (r3 - r) / (r3 - r2));
    for (const v of virta) {
      u.pA.value[v.i].w = v.nopeus * (r - r0);
      u.pB.value[v.i].w = v.voima * vk;
    }
  }

  /*
   * AIKAJANA (v13, Sokrates; tools/ajattelija-aikajana.mjs Linnanrakentajan luvuista): kohtaus kulkee yhtenä aikajanana
   * kertojan kymmenen kappaleen mukaan, ja web toistaa Blenderin avaimet sellaisinaan — kamera (leikkaukset ja ajot),
   * aurinko (paikka, energia, väri), pyyhkäisyvalo, lainausten videotykit, kaiut ja taustavirran kerroin. Prologi,
   * nimi ja kysymys kulkevat kuten ennen. Projektoripaikat: 0 tykki (suunnataan lainaus kerrallaan), 1–20 taustavirta,
   * kaikuIndeksi ja kaikuIndeksi + 1 kaksi kaikua (voivat olla päällekkäin ristihäivytyksessä).
   */
  let asetaAikajana = null;
  if (AJ) {
    const kameraAj = aikajanaKamera(AJ.kamera);
    const aurinkoAj = aikajanaAurinko(AJ.aurinko);
    const auringonKohde = b2t(THREE, AJ.aurinko.kohde);
    const PERUSVARI = [1.0, 0.95, 0.88];
    // Pyyhkäisy: kapea sivuvalo (Blender spot 7°, pehmeys 0,35, varjo).
    const py = AJ.pyyhkaisy;
    let pyyhkaisy = null;
    if (py) {
      pyyhkaisy = new THREE.SpotLight(new THREE.Color(...(py.vari ?? [1.0, 0.95, 0.88])), 0, 0, py.keila / 2 * Math.PI / 180, py.blend, 2);
      pyyhkaisy.position.copy(b2t(THREE, py.paikka));
      pyyhkaisy.castShadow = true;
      pyyhkaisy.shadow.mapSize.set(1024, 1024);
      pyyhkaisy.shadow.camera.near = 0.3;
      pyyhkaisy.shadow.camera.far = 1.8;
      pyyhkaisy.shadow.bias = -0.0004;
      kohtaus.add(pyyhkaisy, pyyhkaisy.target);
    }
    const pyyhkaisynKohde = (r) => {
      if (py.kohteet) {
        const k = avainArvo(py.kohteet.map(([rr, q]) => [rr, q]), r);
        return b2t(THREE, k);
      }
      return b2t(THREE, py.paikka.map((x, i) => x + py.suunta[i] * 0.6));
    };
    // Lainausten videotykit: yksi projektoripaikka (0), suunnataan lainaus kerrallaan.
    const tykitAj = AJ.tykit.map((t, j) => {
      const l = a.paalauseet[t.paalause];
      const rivi = paikat[1 + tv.rivit.length + j];
      const paikka = b2t(THREE, t.paikka);
      const kohde = b2t(THREE, t.paikka.map((x, i) => x + t.suunta[i] * 0.6));
      const korkeus = t.korkeus ?? l.korkeus;
      const nauhaLev = korkeus * rivi.lev / rivi.korkeus;
      return {
        ...t, korkeus, lause: l, rivi, paikkaT: paikka, kohdeT: kohde, s0: 0.5 + t.ala / 2 / nauhaLev,
        alku: t.energia[0][0], loppu: t.energia.at(-1)[0],
      };
    });
    let tykkiNyt = -1;
    const suuntaaTykki = (j) => {
      if (j === tykkiNyt) return;
      tykkiNyt = j;
      const t = tykitAj[j];
      asetaProjektori(THREE, u, 0, {
        paikka: t.paikkaT, kohde: t.kohdeT, etaisyys: 0.6, nauhaKork: t.korkeus, rivi: t.rivi, ala: t.ala, blend: t.blend,
        ca: a.ca, syvyys: a.syvyys, atlasKorkeus: kangas.height,
      });
    };
    /*
     * KAIKUSARJA JA VÄRI (omistaja vertaa, Päätoimittaja 3.10.2026): ?kaikusarja=<nimi> valitsee AJ.kaikusarjat-kentästä
     * (oletus AJ.kaikusarja, nyt A = Sisältökirjurin rajatut hahmot alfalla); ?kaikusarja=v13b näyttää aikajanan omat kuvat.
     * Sarjan kuvalla voi olla valmiit harmaa- ja seepiaversiot: väri tulee silloin kuvasta ja projektorin valo on
     * neutraali; ilman versioita seepia tehdään valon värillä kuten ennen.
     */
    const sarjanNimi = haku.get('kaikusarja') ?? AJ.kaikusarja;
    const sarja = AJ.kaikusarjat?.[sarjanNimi] ?? null;
    const seepiana = haku.get('kaikuvari') === 'seepia';
    const sarjanKuva = (j) => {
      const e = sarja?.[j];
      if (!e) return null;
      if (typeof e === 'string') return { kuva: e, varissa: false };
      return seepiana && e.seepia ? { kuva: e.seepia, varissa: true } : { kuva: e.harmaa ?? e.kuva, varissa: false };
    };
    // Kaiut: kaksi paikkaa vuorotellen (kaiut 1, 3 → A; 2, 4 → B), kummallakin oma tekstuuri.
    const kaiutAj = AJ.kaiut.map((k, j) => ({
      ...k,
      ...(sarjanKuva(j) ? { kuva: sarjanKuva(j).kuva, varissa: sarjanKuva(j).varissa, sovita: true } : {}), paikka: kaikuIndeksi + (j % 2), naytteenotin: j % 2 ? 'pKaiku2' : 'pKaiku', liukuAlku: k.energia[0][0],
      liukuLoppu: k.energia.at(-1)[0], paikkaT: b2t(THREE, k.paikka), kohdeT: b2t(THREE, k.paikka.map((x, i) => x + k.suunta[i] * 0.6)),
      tk: null,
    }));
    const kaikuPaikassa = [-1, -1];
    const suuntaaKaiku = (j) => {
      const k = kaiutAj[j];
      const s = j % 2;
      if (kaikuPaikassa[s] === j || !k.tk) return;
      kaikuPaikassa[s] = j;
      u[k.naytteenotin].value = k.tk;
      const { width: w, height: h } = k.tk.image;
      // v13b: kuva-alan mitat viennistä (lev_m, kork_m); sarjan kuva sovitetaan samaan suurimpaan mittaan omalla
      // mittasuhteellaan; muuten keilasta ja kuvan mittasuhteesta.
      const koko = k.lev ? Math.max(k.lev, k.kork) : k.ala;
      const lev = k.lev && !k.sovita ? k.lev : (w >= h ? koko : koko * w / h);
      const kork = k.kork && !k.sovita ? k.kork : lev * h / w;
      u.pKaikuVari.value.setRGB(...(k.varissa ? [1, 1, 1] : kaikuValo));
      asetaProjektori(THREE, u, k.paikka, {
        paikka: k.paikkaT, kohde: k.kohdeT, etaisyys: 0.6, nauhaKork: kork, rivi: { lev: w, korkeus: h, uMax: 1 },
        ala: Math.max(lev, kork), blend: k.blend, atlasKorkeus: h, kaiku: s + 1,
      });
    };
    for (const k of kaiutAj) {
      new THREE.TextureLoader().loadAsync(`${R2}${k.kuva}`).then((tk) => {
        tk.colorSpace = THREE.NoColorSpace;
        tk.flipY = false;
        k.tk = tk;
      }).catch((syy) => console.warn('ajattelija: kaikukuva', k.kuva, syy));
    }
    /*
     * KAIKUJEN VÄRI (omistaja vertaa, Päätoimittaja 3.10.2026): oletus väritön (projektorin valo neutraali), seepia
     * kehityslipulla ?kaikuvari=seepia. Oletus voimassa, kunnes omistaja päättää.
     */
    const SEEPIA = a.kaiku?.savy ?? [1.0, 0.78, 0.52];
    const kaikuValo = haku.get('kaikuvari') === 'seepia' ? SEEPIA : (AJ.kaikuVari ?? [1.0, 1.0, 1.0]);
    u.pKaikuVari.value.setRGB(...kaikuValo);
    u.pMaara.value = kaikuIndeksi + 2;
    const virranAlku = AJ.virta.find(([, k]) => k > 0)?.[0] ?? 0;

    asetaAikajana = (r) => {
      for (const v of prologiValot) v.s.intensity = 0;
      kohtaus.background = taustaVari;
      const kc = kameraAj(r);
      asetaKamera(b2t(THREE, kc.paikka), b2t(THREE, kc.katse), kc.mm);
      vinjetti.style.opacity = r >= T.nimi[0] && r < T.kysymys[1] + 20 ? '1' : '0';
      nayta(nimi, r, T.nimi);
      nayta(kysymys, r, T.kysymys);
      lahde.style.opacity = '0';

      // Aurinko avaimista; ei maailman täytettä (v12–v13: tausta pimeä).
      const au = aurinkoAj(r);
      valo.position.copy(b2t(THREE, au.paikka));
      valo.target.position.copy(auringonKohde);
      valo.intensity = au.energia * W;
      valo.color.setRGB(...(au.vari ?? PERUSVARI));
      maailma.intensity = TAYTE * (a.intro.tayte ?? 1);
      if (kaikuTayte) kaikuTayte.intensity = 0;
      if (pyyhkaisy) {
        pyyhkaisy.intensity = avainArvo(py.energia, r) * W;
        pyyhkaisy.target.position.copy(pyyhkaisynKohde(r));
      }

      // Lainaus: tykki, jonka energia-avainten väli sisältää ruudun (muuten seuraava, sammuksissa).
      let j = tykitAj.findIndex((t) => r >= t.alku && r <= t.loppu);
      if (j < 0) j = Math.max(0, tykitAj.findIndex((t) => r < t.alku));
      suuntaaTykki(j);
      const t = tykitAj[j];
      const vieritys = t.kiintea ? 0 : -t.s0 + 2 * t.s0 * Math.min(1, Math.max(0, valilla(r, t.vierii[0], t.vierii[1])));
      u.pA.value[0].w = vieritys;
      u.pB.value[0].w = TYKKI * avainArvo(t.energia, r) / 220;

      // Kaiut: kummassakin paikassa sen hetken kaiku (tai viimeksi ollut).
      for (let s = 0; s < 2; s += 1) {
        const omat = kaiutAj.map((k, i) => i).filter((i) => i % 2 === s);
        let i = omat.find((x) => r >= kaiutAj[x].liukuAlku && r <= kaiutAj[x].liukuLoppu);
        if (i === undefined) i = omat.filter((x) => kaiutAj[x].liukuAlku <= r).at(-1) ?? omat[0];
        suuntaaKaiku(i);
        const k = kaiutAj[i];
        const ind = kaikuIndeksi + s;
        if (kaikuPaikassa[s] !== i) { u.pB.value[ind].w = 0; continue; }
        u.pA.value[ind].w = -k.liuku + 2 * k.liuku * Math.min(1, Math.max(0, valilla(r, k.liukuAlku, k.liukuLoppu)));
        u.pB.value[ind].w = avainArvo(k.energia, r) * W * KAIKU_VOIMA * (syke[String(Math.round(r))] ?? 1);
      }

      // Taustavirta: vaiheittainen kerroin, siirto = nopeus × ruudut virran alusta.
      const vk = avainArvo(AJ.virta, r);
      for (const v of virta) {
        u.pA.value[v.i].w = v.nopeus * (r - virranAlku);
        u.pB.value[v.i].w = v.voima * vk;
      }
    };
  }

  // Ääniraita on kierroksen kello (luennat ja leikkaukset osuvat musiikkiin); prologi kulkee omalla kellollaan.
  /*
   * Musiikkiversio (omistaja vertaa, Päätoimittaja 3.10.2026): oletus aikajanan oma musiikki; testikomento
   * ?ajattelijamusiikki=<nimi> valitsee aani.vaihtoehdot-kentästä (esim. zarathustra). Ajoitus on sama kaikissa.
   */
  const aaniPohja = AJ?.aani ?? KR?.aani ?? a.aani;
  const musiikkiValinta = haku.get('ajattelijamusiikki');
  const aaniLahde = musiikkiValinta && aaniPohja.vaihtoehdot?.[musiikkiValinta]
    ? { ...aaniPohja, musiikki: aaniPohja.vaihtoehdot[musiikkiValinta] } : aaniPohja;
  const aani = new Audio(`${R2}${aaniLahde.puhe}`);
  aani.preload = 'auto';
  const musiikkiAani = new Audio(`${R2}${aaniLahde.musiikki}`);
  musiikkiAani.preload = 'auto';
  musiikkiAani.onerror = () => { musiikkiAani.dataset.puuttuu = '1'; };
  // Prologin kytkimen napsahdus ruudussa pr0.kytkin (Linnanrakentaja 2.10.2026: kaksi Kenney CC0 -iskua ja hallin kaiku).
  const kytkinAani = new Audio(`${R2}${AJATTELIJA_KYTKIN}`);
  kytkinAani.preload = 'auto';
  let kytkinSoi = false;
  let aaniSoi = false;
  /** Globaali ruutu G: 1–120 prologi, sen jälkeen kierros (r = G − 120). */
  // Kierroksen lopussa "Sokrateen elämä" -lappu NOSTOKORTTI-pohjalla (teema tumma) KUVANÄKYMÄN sisällä.
  // Samalla PULU (osa CHAT, js/pohjat/pulu.js; Päätoimittaja 2.10.2026): minipulu ja viisi kysymystä, isännän teema
  // lasi (lämmin linssi, Natiivi-UI). Kulma nousee lapun yläpuolelle, kun lappu on auki (molemmat ovat alareunassa).
  let lappu = null;
  let pulu = null;
  let lopetusAvattu = false;
  let lapunVahti = null;
  function avaaLappu() {
    if (lopetusAvattu) return;
    lopetusAvattu = true;
    // Lappu ja PULU ovat valinnaisia (sisältö Sisältökirjurilta ajattelija kerrallaan).
    lappu = a.elama && luoPohjaNostokortti({ yla: a.nimi, otsikko: a.elama.otsikko, kappaleet: a.elama.kappaleet }, {
      teema: 'tumma',
      sulje: () => { if (pulu) { pulu.kulma.style.bottom = ''; pulu.kulma.style.right = ''; pulu.kulma.style.removeProperty('--tk-pulu-tila'); } },
    });
    if (lappu) {
      pohja.el.appendChild(lappu.el);
      lappu.avaa();
    }
    if (!a.pulunKysymykset?.length) return;
    // PULU laiskasti (minipulu ja Pulun kortti vasta lopussa; yhden tiedoston versio ei niputa linssiä eikä sen ketjua).
    import('../pohjat/pulu.js').then(({ luoPohjaPulu }) => {
      if (!pohja.el.isConnected) return;
      pulu = luoPohjaPulu({ luokka: 'tk', teema: 'lasi', aihe: a.nimi, kysymykset: a.pulunKysymykset });
      pohja.el.appendChild(pulu.kulma);
      if (lappu && typeof ResizeObserver === 'function') {
        // Kortti mahtuu lapun ja ✕:n väliin: ✕ (44 pt + 12 + turva-alue) jää aina näkyviin.
        lapunVahti = new ResizeObserver(() => {
          if (!lappu?.auki) return;
          const kortti = lappu.el.getBoundingClientRect();
          const isa = pohja.el.getBoundingClientRect();
          const ylaRaja = pohja.sulku.getBoundingClientRect().bottom + 12 - isa.top;
          // SIVUKORTTI (leveä ruutu, iPad): kortti ulottuu yläreunaan, joten Pulu sen yläpuolella osuisi ✕:n päälle
          // (Linssiseppä 2:n pariteettiajo 2.10.2026). Pulu siirtyy kortin vasemmalle puolelle alareunaan.
          const sivukortti = kortti.left - isa.left > isa.width * 0.25;
          let tila;
          if (sivukortti) {
            pulu.kulma.style.bottom = '';
            pulu.kulma.style.right = `${Math.round(isa.right - kortti.left + 12)}px`;
            tila = isa.height - 12 - pulu.nappi.getBoundingClientRect().height - 8 - ylaRaja;
          } else {
            pulu.kulma.style.right = '';
            pulu.kulma.style.bottom = `${Math.round(isa.bottom - kortti.top + 8)}px`;
            tila = kortti.top - isa.top - 8 - pulu.nappi.getBoundingClientRect().height - 8 - ylaRaja;
          }
          pulu.kulma.style.setProperty('--tk-pulu-tila', `${Math.max(120, Math.round(tila))}px`);
        });
        lapunVahti.observe(lappu.el);
      }
    }).catch((syy) => console.warn('ajattelija: PULU', syy));
  }
  function asetaGlobaali(G) {
    if (G <= pr0.loppu) asetaPrologi(Math.max(1, G));
    else (asetaAikajana ?? asetaRuutu)(Math.min(G - pr0.loppu, LOPPU));
    if (G - pr0.loppu >= LOPPU && ruutuOhitus == null) avaaLappu();
  }

  // Koko ja kuvasuhde.
  const koko = () => {
    const l = juuri.clientWidth || 1, k = juuri.clientHeight || 1;
    renderoija.setSize(l, k, false);
    kamera.aspect = l / k;
    kamera.updateProjectionMatrix();
  };
  koko();
  const kokoVahti = new ResizeObserver(koko);
  kokoVahti.observe(juuri);

  // Mittari (sujuvuus): ruutuvälit ms; savuke lukee window.matkakirjaAjattelija.mittari().
  const valit = [];
  let edellinen = 0;
  const alku = performance.now();
  let kaynnissa = true;
  let ruutuOhitus = null;
  let aaniEsto = false;
  function kierros(nyt) {
    if (!kaynnissa) return;
    if (edellinen) { valit.push(nyt - edellinen); if (valit.length > 600) valit.shift(); }
    edellinen = nyt;
    let G;
    if (ruutuOhitus != null) G = ruutuOhitus;
    else if (aaniSoi && !aani.paused) {
      G = pr0.loppu + aani.currentTime * RUUTUA_S;
      // Musiikki seuraa puheraitaa (yli 0,12 s:n ero korjataan).
      if (!musiikkiAani.dataset.puuttuu && !musiikkiAani.ended && Math.abs(musiikkiAani.currentTime - aani.currentTime) > 0.12
        && aani.currentTime < musiikkiAani.duration) musiikkiAani.currentTime = aani.currentTime;
    }
    else {
      G = (nyt - alku) / 1000 * RUUTUA_S;
      if (G > pr0.loppu && !aaniSoi) {
        aaniSoi = true;
        aani.currentTime = (G - pr0.loppu) / RUUTUA_S;
        aani.play().catch(() => { aaniSoi = false; aaniEsto = true; });
        musiikkiAani.currentTime = aani.currentTime;
        musiikkiAani.play().catch(() => {});
      }
      if (aaniEsto) aaniSoi = true;   // ei ääntä (ei eleen jälkeen avattu): kello jatkuu ajastimella
    }
    if (!kytkinSoi && ruutuOhitus == null && G >= pr0.kytkin && G < pr0.loppu) {
      kytkinSoi = true;
      kytkinAani.play().catch(() => {});
    }
    asetaGlobaali(G);
    renderoija.render(kohtaus, kamera);
    requestAnimationFrame(kierros);
  }
  requestAnimationFrame(kierros);

  const mittari = () => {
    const j = [...valit].sort((x, y) => x - y);
    const p = (q) => (j.length ? j[Math.min(j.length - 1, Math.floor(q * j.length))] : 0);
    return { ruutuja: j.length, fps: j.length ? 1000 / (j.reduce((s, v) => s + v, 0) / j.length) : 0, p50: p(0.5), p95: p(0.95), yli33: j.filter((v) => v > 33.4).length };
  };
  // ?mittari=1: sujuvuus ruudulle laitemittausta varten (Laitetestaaja kuvaa ruudun; ei verkkoliikennettä).
  let mittariAjastin = null;
  if (haku.get('mittari')) {
    const nayta = document.createElement('pre');
    Object.assign(nayta.style, { position: 'absolute', left: '8px', bottom: 'calc(8px + env(safe-area-inset-bottom, 0px))', margin: '0',
      padding: '6px 8px', font: '12px/1.35 ui-monospace, monospace', color: '#cfe', background: 'rgba(0,0,0,0.6)', zIndex: '3', pointerEvents: 'none' });
    juuri.appendChild(nayta);
    const gl = renderoija.getContext();
    const tiedot = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = tiedot ? gl.getParameter(tiedot.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    mittariAjastin = setInterval(() => {
      const m = mittari();
      const kp = renderoija.getDrawingBufferSize(new THREE.Vector2());
      nayta.textContent = `fps ${m.fps.toFixed(1)}  p50 ${m.p50.toFixed(1)}  p95 ${m.p95.toFixed(1)} ms\n`
        + `>33 ms ${m.yli33}/${m.ruutuja}  ${kp.x}×${kp.y} @${renderoija.getPixelRatio()}\n${gpu}`;
    }, 1000);
  }
  function sulje() {
    if (!kaynnissa) return;
    kaynnissa = false;
    clearInterval(mittariAjastin);
    clearTimeout(sulkuAjastin);
    kokoVahti.disconnect();
    pohja.sulje();
    for (const x of [aani, musiikkiAani, kytkinAani]) { x.pause(); x.src = ''; }
    lapunVahti?.disconnect();
    pulu?.tuhoa();
    renderoija.dispose();
    atlas.dispose();
    detalji.dispose();
    for (const e of kaiut) e?.tk?.dispose();
    pohja.el.remove();
    sulkeutui?.();
  }
  const kahva = {
    sulje, mittari,
    /** Testeille: pysäytä aika kierrosten ruutuun r (1–LOPPU; null = juokse). */
    ruutu: (r) => { ruutuOhitus = r == null ? null : pr0.loppu + r; },
    /** Testeille: prologin ruutu p (1–120). */
    prologi: (p) => { ruutuOhitus = p; },
    nollaaMittari: () => { valit.length = 0; edellinen = 0; },
    /** Testeille: avaa lappu heti. */
    lappu: () => avaaLappu(),
    /** Testeille: ääniraitojen tila (kello = pääraita). */
    /** Testeille: nykyinen kierros (0 = kierros 1) ja kierrosten loppuruutu. */
    kierros: () => ({ kierros: nykyKierros, loppu: LOPPU, kierroksia: kierrokset.length }),
    /** Testeille: kierrosten tykit ja kaiut Blender-koordinaateissa (vertailu sokrates-luvut.json:iin). */
    paikat: () => ({
      tykit: kierrokset.map((kt) => ({ paikka: t2b(kt.paikka), kohde: t2b(kt.kohde) })),
      kaiut: kaiut.map((e) => e && { paikka: t2b(e.paikka), kohde: t2b(e.kohde) }),
      virta: virta.map((v) => Math.round(v.mms * 10) / 10),
    }),
    aanitila: () => ({ puhe: aani.currentTime, musiikki: musiikkiAani.currentTime, soi: !aani.paused, musiikkiSoi: !musiikkiAani.paused }),
  };
  globalThis.matkakirjaAjattelija = kahva;
  return kahva;
}
