/*
 * LIPPUARVAUS — TOINEN LEIKKILINSSI (omistaja 21.9.2026 linssisarja;
 * Fablen hyväksymä suunnitelma 21.9.2026, Pelikoodari).
 *
 * MITÄ PELAAJA NÄKEE. Pallolle nousee jokaisen maan keskukseen pieni
 * lipputanko (CSS2D-merkki, lippu repon assets/liput-kuvasta); vipu
 * "Eurooppa / Maailma" rajaa maat (Eurooppa oletus, pelin painopiste).
 * Napautus lippuun näyttää maan nimen hetkeksi — ei lehteä, se on
 * Maiden tiedot -linssin asia (js/linssit/maatiedot.js).
 *
 * LEIKKI. Livia (pulu) nostaa yhden lipun kortille tankoon ilman nimeä
 * ja antaa neljä maan nimeä: oikea ja kolme LÄHINTÄ naapuria
 * (js/linssit/lippuarvaus-peli.js vaihtoehdot). Oikea tuo
 * XP_LIPPUARVAUS tp (js/game.js vastaaLippuarvaukseen), väärä näyttää
 * oikean; vastauksen jälkeen lippu välähtää paikallaan pallolla
 * (.lippuarvaus-valahtaa), jotta pelaaja näkee, missä maa on. Livian
 * repliikit ovat Fablen sanatarkat (mallipohja ilman ääntä, Fablen
 * sääntö 21.9.2026).
 *
 * MITEN SE ON RAKENNETTU. Sama kaava kuin Kelloissa
 * (js/linssit/kellot.js): oma näkymä pallolla (portti aikajana-paalla,
 * kelluva ✕, alapalkki), liput linssimoottorin merkkeinä, joita
 * päivitetään vain merkkikerroksen kautta (omat datumit eivät saa
 * `el`iä), napautus datumin `napautus`-kentästä (lauta.js
 * lahinLinssimerkki: linssin merkki voittaa aina).
 *
 * NAPAUTUSMUOTO JA SARJAT (Fablen jatkoerä 21.9.2026). Vipu "Nimet /
 * Kartta": kartta-muodossa Livia näyttää lipun ja pelaaja napauttaa
 * MAATA pallolla — maat ovat linssimoottorin polygoneja (sama
 * maapolygonitPallolle kuin Maiden tiedot -linssillä, js/vertailu.js),
 * ja liput ovat kysymyksen ajan piilossa, koska ne kertoisivat
 * vastauksen. Oikea maa värjäytyy vihreäksi, väärin napautettu
 * punaiseksi. Peräkkäiset oikeat ovat SARJA ja pisin sarja laitteen
 * ENNÄTYS (localStorage, lippuarvaus-peli.js paivitaSarja); molemmat
 * näkyvät tilarivillä.
 */

import { ilmoitaLivianKasvopuhe } from '../livia-puhetila.js';
import { lippuUrl } from '../packs/africa-valokuvat.js';
import {
  ARVAUKSEN_TP, LIVIAN_KYSYMYKSET, NAPAUTUSOHJE, arvoKysymys, euroopassa, lippumaat, lueEnnatys, paivitaSarja,
  palaute, tallennaEnnatys,
} from './lippuarvaus-peli.js';
import { maapolygonitPallolle } from '../vertailu.js';

const LIPUT_OSA = 'lippuarvaus';
const MAAT_OSA = 'lippuarvaus-maat';
/** Maapolygonin sävyt napautusmuodossa (sama muste kuin Maiden tiedot -linssillä). */
export const MAIDEN_SAVYT = {
  tavallinen: { vari: 'rgba(140, 110, 70, 0.06)', reuna: 'rgba(70, 51, 31, 0.55)' },
  oikea: { vari: 'rgba(46, 107, 46, 0.35)', reuna: 'rgba(30, 90, 30, 0.95)' },
  vaara: { vari: 'rgba(176, 34, 34, 0.35)', reuna: 'rgba(140, 30, 30, 0.95)' },
};
/** Maapolygonit lasketaan kerran pakkaa kohti (26 000 pistettä). */
const polygoniMuisti = new WeakMap();
const LINSSIPORTTI = 'aikajana-paalla';
const PALKKI_PIILOON = 'aikajana-palkki-auki';
const TYYLIN_TUNNUS = 'lippuarvaus-tyyli';
/** Lipun leveys pallolla (px) ja kortilla. */
const LIPUN_LEVEYS_PX = 26;
const KORTIN_LIPPU_PX = 150;
/** Kuinka kauan napautettu nimi ja välähdys näkyvät (ms). */
export const NIMEN_NAYTTO_MS = 2600;
export const VALAHDYKSEN_MS = 3200;

const TYYLI = `
.lippuarvaus-lippu { pointer-events: none; transform: translate(-50%, -100%); text-align: center; width: ${LIPUN_LEVEYS_PX + 8}px; }
.lippuarvaus-lippu .lippuarvaus-tanko {
  display: inline-block; width: ${LIPUN_LEVEYS_PX}px; height: ${Math.round(LIPUN_LEVEYS_PX * 0.66)}px; object-fit: cover;
  border: 1px solid rgba(58, 42, 22, 0.75); box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.35); background: #f5ecd6;
  transition: transform 160ms ease-out, box-shadow 160ms ease-out;
}
.lippuarvaus-lippu::after {
  content: ''; display: block; margin: 0 auto; width: 2px; height: 9px; background: #5a4526; border-radius: 0 0 1px 1px;
}
.lippuarvaus-lippu .lippuarvaus-nimi {
  position: absolute; left: 50%; top: 100%; transform: translate(-50%, 2px); white-space: nowrap;
  font: 700 11px/1.2 "Special Elite", "Courier New", monospace; color: #2f2415; background: rgba(245, 236, 214, 0.94);
  border: 1px solid #b08d4a; border-radius: 999px; padding: 2px 7px; opacity: 0; transition: opacity 180ms ease-out;
}
.lippuarvaus-lippu.lippuarvaus-nimi-esilla .lippuarvaus-nimi { opacity: 1; }
.lippuarvaus-lippu.lippuarvaus-oma .lippuarvaus-tanko { box-shadow: 0 0 0 2px #c9a227, 1px 2px 4px rgba(0, 0, 0, 0.4); }
.lippuarvaus-lippu.lippuarvaus-valahtaa .lippuarvaus-tanko {
  animation: lippuarvaus-valahdys 800ms ease-in-out 4; transform: scale(1.6); box-shadow: 0 0 0 3px #c9a227, 0 0 18px 6px rgba(201, 162, 39, 0.75);
}
.lippuarvaus-lippu.lippuarvaus-valahtaa .lippuarvaus-nimi { opacity: 1; }
@keyframes lippuarvaus-valahdys { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .lippuarvaus-lippu.lippuarvaus-valahtaa .lippuarvaus-tanko { animation: none; } }
.lippuarvaus-kehikko {
  position: fixed; left: 0; right: 0; bottom: max(0.6rem, env(safe-area-inset-bottom)); z-index: 41;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem; pointer-events: none; padding: 0 0.75rem;
}
.lippuarvaus-kehikko > * { pointer-events: auto; }
.lippuarvaus-vivut {
  display: flex; gap: 0.35rem; align-items: center; padding: 0.3rem;
  background: rgba(38, 28, 16, 0.86); border: 1px solid rgba(201, 162, 39, 0.55); border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}
.lippuarvaus-vivut button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2; background: transparent;
  border: 1px solid transparent; border-radius: 999px; padding: 0.5rem 0.9rem; cursor: pointer; min-height: 2.4rem;
}
.lippuarvaus-vivut button[aria-pressed="true"] { background: #c9a227; color: #2f2415; border-color: #e6c765; }
.lippuarvaus-vivut button.lippuarvaus-kysy { border-color: rgba(240, 226, 194, 0.5); }
.lippuarvaus-tila-nimi {
  font: 700 0.85rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2;
  background: rgba(38, 28, 16, 0.78); padding: 0.4rem 0.7rem; border-radius: 999px; border: 1px solid rgba(201, 162, 39, 0.55);
}
.lippuarvaus-kortti {
  width: min(34rem, 100%); background: #f5ecd6; color: #2f2415; border: 1px solid #b08d4a; border-radius: 0.8rem;
  padding: 0.7rem 0.85rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  font: 400 0.95rem/1.35 "Special Elite", "Courier New", monospace;
}
.lippuarvaus-kortti[hidden] { display: none; }
.lippuarvaus-kortti .lippuarvaus-puhuja { font-weight: 700; color: #7a5b2e; margin-bottom: 0.2rem; }
.lippuarvaus-kortti .lippuarvaus-kysymys { margin: 0 0 0.55rem; }
.lippuarvaus-kortti .lippuarvaus-iso {
  display: flex; align-items: flex-end; gap: 0.5rem; margin: 0 0 0.6rem;
}
.lippuarvaus-kortti .lippuarvaus-iso img {
  width: ${KORTIN_LIPPU_PX}px; max-width: 45vw; height: auto; border: 1px solid #5a4526; box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.35); background: #fff;
}
.lippuarvaus-kortti .lippuarvaus-iso::before { content: ''; width: 3px; height: ${Math.round(KORTIN_LIPPU_PX * 0.66) + 22}px; background: #5a4526; border-radius: 2px; }
.lippuarvaus-kortti .lippuarvaus-valinnat { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
.lippuarvaus-kortti button {
  font: 600 0.92rem/1.15 "Special Elite", "Courier New", monospace; padding: 0.55rem 0.7rem; border-radius: 0.6rem;
  border: 1px solid #7a5b2e; background: #fffaf0; color: #2f2415; cursor: pointer; min-height: 2.6rem;
}
.lippuarvaus-kortti button.lippuarvaus-oikea { background: #cfe8c3; border-color: #2e6b2e; }
.lippuarvaus-kortti button.lippuarvaus-vaara { background: #f1cfc5; border-color: #8a2f1c; }
.lippuarvaus-kortti button.lippuarvaus-sulje-kortti { background: #c9a227; border-radius: 999px; margin-top: 0.5rem; }
.lippuarvaus-kortti .lippuarvaus-palaute { margin: 0.5rem 0 0; font-weight: 700; }
.lippuarvaus-kortti .lippuarvaus-palaute.oikein { color: #2e6b2e; }
.lippuarvaus-kortti .lippuarvaus-palaute.vaarin { color: #8a2f1c; }
.lippuarvaus-linssisulku {
  position: fixed; top: max(0.6rem, env(safe-area-inset-top)); right: 0.75rem; z-index: 42;
  width: 2.3rem; height: 2.3rem; border-radius: 999px; border: 1px solid rgb(170, 170, 170);
  background: rgba(60, 50, 35, 0.6); color: #f0e2c2; font: 1.3rem/1 sans-serif; cursor: pointer;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
@media (max-width: 480px) { .lippuarvaus-kortti { font-size: 0.88rem; } }
`;

function lataaTyyli(doc) {
  if (!doc?.head || doc.getElementById(TYYLIN_TUNNUS)) return;
  const tyyli = doc.createElement('style');
  tyyli.id = TYYLIN_TUNNUS;
  tyyli.textContent = TYYLI;
  doc.head.appendChild(tyyli);
}

/* ------------------------------------------------------------- lippu --- */

/** Lipputangon elementti: kuva, tanko (::after) ja piilotettu nimi. */
export function lippuElementti(d) {
  const el = document.createElement('div');
  el.className = 'lippuarvaus-lippu';
  el.dataset.maa = d.iso;
  const kuva = document.createElement('img');
  kuva.className = 'lippuarvaus-tanko';
  kuva.alt = '';
  kuva.decoding = 'async';
  kuva.loading = 'lazy';
  kuva.src = lippuUrl(d.lippu, 120);
  const nimi = document.createElement('span');
  nimi.className = 'lippuarvaus-nimi';
  nimi.textContent = d.nimi;
  el.append(kuva, nimi);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', `${d.nimi}: lippu`);
  asetteleLippu(el, d);
  return el;
}

/** Tila luokkina: oma maa, nimi esillä, välähdys. */
export function asetteleLippu(el, d) {
  el.classList.toggle('lippuarvaus-oma', Boolean(d.oma));
  el.classList.toggle('lippuarvaus-nimi-esilla', Boolean(d.nimiEsilla));
  el.classList.toggle('lippuarvaus-valahtaa', Boolean(d.valahtaa));
}

/* ------------------------------------------------------------ linssi --- */

function avaa(lauta, tila, ui) {
  const doc = document;
  lataaTyyli(doc);
  if (!lauta?.linssit) return { pura() {} };
  const game = ui?.game ?? null;
  const omaKaupunki = game?.cityOf?.()?.id ?? null;
  const omaMaa = omaKaupunki ? (game?.pack?.map?.cityCountry?.[omaKaupunki] ?? null) : null;
  const kaikki = lippumaat(game?.pack ?? null);
  let rajaus = 'eurooppa';
  let muoto = 'nimet'; // 'nimet' | 'kartta'
  let sarjatila = { sarja: 0, ennatys: lueEnnatys() };
  let maaPolygonit = null; // Map iso → { geometry, nimi } (kartta-muoto)
  let maaVarit = new Map(); // iso → 'oikea' | 'vaara' (vastauksen jälkeen)
  let kysymys = null; // { maa, vaihtoehdot, kysymys, muoto, vastattu }
  const kysytyt = new Set();
  let kysymyksia = 0;
  let suljettu = false;
  const ajastimet = new Set();
  const myohemmin = (f, ms) => {
    const t = globalThis.setTimeout(() => { ajastimet.delete(t); if (!suljettu) f(); }, ms);
    ajastimet.add(t);
    return t;
  };

  doc.body.classList.add(PALKKI_PIILOON, LINSSIPORTTI);

  const joukko = () => (rajaus === 'eurooppa' ? kaikki.filter(euroopassa) : kaikki);
  // Datumit pysyvät samoina olioina; muutokset kulkevat merkkikerroksen kautta (ks. kellot.js).
  const datumit = new Map(kaikki.map((m) => [m.iso, {
    avain: `lippu:${m.iso}`, iso: m.iso, nimi: m.nimi, lippu: m.lippu, lat: m.lat, lng: m.lon, lon: m.lon,
    oma: m.iso === omaMaa, nimiEsilla: false, valahtaa: false,
    elementti: lippuElementti, asettele: asetteleLippu,
    napautus: (d) => naytaNimi(d.iso),
  }]));
  const tyonnaLiput = () => {
    if (suljettu) return;
    // Kartta-muodon kysymyksen ajan liput ovat piilossa: ne kertoisivat vastauksen.
    const piilossa = muoto === 'kartta' && kysymys && !kysymys.vastattu;
    lauta.linssit.merkit(LIPUT_OSA, piilossa ? [] : joukko().map((m) => datumit.get(m.iso)));
  };
  /** Maapolygonit pallolle kartta-muodossa; nimet-muodossa pois. */
  const tyonnaMaat = () => {
    if (suljettu) return;
    if (muoto !== 'kartta') { lauta.linssit.pura?.(MAAT_OSA); return; }
    if (!maaPolygonit) {
      const map = game?.pack?.map ?? null;
      maaPolygonit = (map && polygoniMuisti.get(map)) ?? null;
      if (!maaPolygonit) {
        maaPolygonit = maapolygonitPallolle(map, lauta.asteet);
        if (map && maaPolygonit.size) polygoniMuisti.set(map, maaPolygonit);
      }
    }
    const lista = [];
    for (const m of joukko()) {
      const p = maaPolygonit.get(m.iso);
      if (!p) continue;
      const savy = MAIDEN_SAVYT[maaVarit.get(m.iso) ?? 'tavallinen'];
      lista.push({
        avain: `maa:${m.iso}`, geometry: p.geometry, vari: savy.vari, reuna: savy.reuna, korkeus: 0.004,
        napautus: () => napautaMaata(m.iso),
      });
    }
    lauta.linssit.polygonit(MAAT_OSA, lista);
  };
  const napautaMaata = (iso) => {
    if (kysymys && !kysymys.vastattu) { vastaa(iso); return; }
    naytaNimi(iso);
  };
  const naytaNimi = (iso) => {
    const d = datumit.get(iso);
    if (!d) return;
    d.nimiEsilla = true;
    tyonnaLiput();
    myohemmin(() => { d.nimiEsilla = false; tyonnaLiput(); }, NIMEN_NAYTTO_MS);
  };
  tyonnaLiput();

  /* ── kehys ──────────────────────────────────────────────────────── */
  const sulku = doc.createElement('button');
  sulku.type = 'button';
  sulku.className = 'lippuarvaus-linssisulku';
  sulku.textContent = '×';
  sulku.title = 'Poistu linssistä';
  sulku.setAttribute('aria-label', 'Poistu linssistä');
  sulku.addEventListener('click', (e) => { e.stopPropagation?.(); ui?.valitseLinssi?.(null); });
  const kehikko = doc.createElement('div');
  kehikko.className = 'lippuarvaus-kehikko';
  const kortti = doc.createElement('section');
  kortti.className = 'lippuarvaus-kortti';
  kortti.hidden = true;
  kortti.setAttribute('aria-live', 'polite');
  const tilaNimi = doc.createElement('div');
  tilaNimi.className = 'lippuarvaus-tila-nimi';
  const vivut = doc.createElement('nav');
  vivut.className = 'lippuarvaus-vivut';
  vivut.setAttribute('aria-label', 'Lippuarvaus');
  const paivitaTilaNimi = () => {
    const sarja = sarjatila.sarja || sarjatila.ennatys ? ` · sarja ${sarjatila.sarja} · ennätys ${sarjatila.ennatys}` : '';
    tilaNimi.textContent = `Lippuarvaus · ${rajaus === 'eurooppa' ? 'Euroopan' : 'maailman'} liput (${joukko().length})${sarja}`;
  };
  const asetaMuoto = (uusi) => {
    if (uusi === muoto) return;
    muoto = uusi;
    for (const nappi of vivut.querySelectorAll('[data-muoto]')) nappi.setAttribute('aria-pressed', String(nappi.dataset.muoto === uusi));
    suljeKortti();
    tyonnaMaat();
    tyonnaLiput();
  };
  const asetaRajaus = (uusi) => {
    if (uusi === rajaus) return;
    rajaus = uusi;
    for (const nappi of vivut.querySelectorAll('[data-rajaus]')) nappi.setAttribute('aria-pressed', String(nappi.dataset.rajaus === uusi));
    paivitaTilaNimi();
    maaVarit = new Map();
    tyonnaMaat();
    tyonnaLiput();
  };
  const vipu = (teksti, arvo) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = teksti;
    b.dataset.rajaus = arvo;
    b.setAttribute('aria-pressed', String(arvo === rajaus));
    b.addEventListener('click', () => asetaRajaus(arvo));
    vivut.appendChild(b);
    return b;
  };
  vipu('Eurooppa', 'eurooppa');
  vipu('Maailma', 'maailma');
  const muotovipu = (teksti, arvo) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = teksti;
    b.dataset.muoto = arvo;
    b.setAttribute('aria-pressed', String(arvo === muoto));
    b.addEventListener('click', () => asetaMuoto(arvo));
    vivut.appendChild(b);
    return b;
  };
  muotovipu('Nimet', 'nimet');
  muotovipu('Kartta', 'kartta');
  const kysy = doc.createElement('button');
  kysy.type = 'button';
  kysy.className = 'lippuarvaus-kysy';
  kysy.textContent = 'Livia kysyy';
  vivut.appendChild(kysy);
  paivitaTilaNimi();
  kehikko.append(kortti, tilaNimi, vivut);
  doc.body.append(sulku, kehikko);

  /* ── Livian kysymys ─────────────────────────────────────────────── */
  const suljeKortti = () => {
    kortti.hidden = true;
    kortti.replaceChildren();
    ilmoitaLivianKasvopuhe('lippuarvaus', false);
    kysymys = null;
    if (maaVarit.size) { maaVarit = new Map(); tyonnaMaat(); }
    tyonnaLiput();
  };
  const kysyLivia = () => {
    const ruudulla = joukko().filter((m) => lauta.ruudulla?.(m.lat, m.lon, -24));
    const q = arvoKysymys(joukko(), ruudulla, { kysytyt, jarjestys: kysymyksia, muoto });
    if (!q) return;
    kysymyksia += 1;
    kysytyt.add(q.maa.iso);
    kysymys = { ...q, vastattu: false };
    maaVarit = new Map();
    tyonnaMaat();
    tyonnaLiput();
    ilmoitaLivianKasvopuhe('lippuarvaus', true, q.kysymys.teksti);
    kortti.replaceChildren();
    const puhuja = doc.createElement('div');
    puhuja.className = 'lippuarvaus-puhuja';
    puhuja.textContent = 'Livia';
    const teksti = doc.createElement('p');
    teksti.className = 'lippuarvaus-kysymys';
    teksti.textContent = muoto === 'kartta' ? `${q.kysymys.teksti} ${NAPAUTUSOHJE}` : q.kysymys.teksti;
    const iso = doc.createElement('div');
    iso.className = 'lippuarvaus-iso';
    const kuva = doc.createElement('img');
    kuva.src = lippuUrl(q.maa.lippu, 120);
    kuva.alt = 'Arvattava lippu';
    kuva.decoding = 'async';
    iso.appendChild(kuva);
    const valinnat = doc.createElement('div');
    valinnat.className = 'lippuarvaus-valinnat';
    valinnat.setAttribute('role', 'group');
    valinnat.setAttribute('aria-label', 'Vaihtoehdot');
    for (const m of q.vaihtoehdot) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.dataset.maa = m.iso;
      b.textContent = m.nimi;
      b.addEventListener('click', () => vastaa(m.iso));
      valinnat.appendChild(b);
    }
    const peru = doc.createElement('button');
    peru.type = 'button';
    peru.className = 'lippuarvaus-sulje-kortti';
    peru.textContent = 'Ei nyt';
    peru.addEventListener('click', suljeKortti);
    kortti.append(puhuja, teksti, iso, muoto === 'kartta' ? peru : valinnat);
    kortti.hidden = false;
  };
  const vastaa = (iso) => {
    if (!kysymys || kysymys.vastattu) return;
    const { maa } = kysymys;
    const oikein = iso === maa.iso;
    kysymys = { ...kysymys, vastattu: true, vastaus: iso, oikein };
    const tp = game?.vastaaLippuarvaukseen?.(game.player, oikein, { maa: maa.nimi }) ?? 0;
    if (oikein) ui?.onChange?.(game);
    ilmoitaLivianKasvopuhe('lippuarvaus', false);
    sarjatila = paivitaSarja(sarjatila, oikein);
    if (sarjatila.uusiEnnatys) tallennaEnnatys(sarjatila.ennatys);
    paivitaTilaNimi();
    if (kysymys.muoto === 'kartta') {
      maaVarit = new Map([[maa.iso, 'oikea'], ...(oikein ? [] : [[iso, 'vaara']])]);
      tyonnaMaat();
      tyonnaLiput();
    }
    for (const b of kortti.querySelectorAll('.lippuarvaus-valinnat button')) {
      b.disabled = true;
      if (b.dataset.maa === maa.iso) b.classList.add('lippuarvaus-oikea');
      else if (b.dataset.maa === iso) b.classList.add('lippuarvaus-vaara');
    }
    const p = doc.createElement('p');
    p.className = `lippuarvaus-palaute ${oikein ? 'oikein' : 'vaarin'}`;
    p.textContent = `${palaute(oikein, maa)}${oikein && tp ? ` (+${tp} tp)` : ''}`
      + (sarjatila.uusiEnnatys && sarjatila.sarja > 1 ? ` Uusi ennätys: ${sarjatila.sarja} peräkkäin!` : (oikein && sarjatila.sarja > 1 ? ` Sarja ${sarjatila.sarja}.` : ''));
    const sulje = doc.createElement('button');
    sulje.type = 'button';
    sulje.className = 'lippuarvaus-sulje-kortti';
    sulje.textContent = 'Selvä';
    sulje.addEventListener('click', suljeKortti);
    kortti.append(p, sulje);
    // Lippu välähtää paikallaan pallolla (Fablen palaute: "siinä se välähtää").
    const d = datumit.get(maa.iso);
    if (d) {
      d.valahtaa = true;
      tyonnaLiput();
      myohemmin(() => { d.valahtaa = false; tyonnaLiput(); }, VALAHDYKSEN_MS);
    }
  };
  kysy.addEventListener('click', kysyLivia);

  return {
    /** Savukkeet ja vartijat. */
    rajaus: () => rajaus,
    asetaRajaus,
    muoto: () => muoto,
    asetaMuoto,
    sarja: () => ({ ...sarjatila }),
    napautaMaata,
    maat: () => joukko(),
    kysy: kysyLivia,
    kysymys: () => kysymys,
    vastaa,
    naytaNimi,
    pura() {
      if (suljettu) return;
      suljettu = true;
      for (const t of ajastimet) globalThis.clearTimeout(t);
      ajastimet.clear();
      ilmoitaLivianKasvopuhe('lippuarvaus', false);
      lauta.linssit.pura?.(LIPUT_OSA);
      lauta.linssit.pura?.(MAAT_OSA);
      sulku.remove();
      kehikko.remove();
      doc.body.classList.remove(PALKKI_PIILOON, LINSSIPORTTI);
    },
  };
}

export const LINSSI = {
  tunnus: 'lippuarvaus',
  jarjestys: 61,
  kerros: false,
  nimi: 'Lippuarvaus',
  lyhyt: 'Maiden liput pallolla. Livia nostaa yhden tankoon — tunnistatko sen naapureidensa joukosta?',
  // Lippu tangossa ja kysymysmerkki.
  ikoni: '<path d="M6 21V4"/><path d="M6 5h10l-2 3 2 3H6"/><path d="M15.5 15.5a2 2 0 1 1 2.5 2c-.7.3-1 .8-1 1.5"/><path d="M17 21v.1"/>',
  valokuva: false,
  laudat: ['*'],
  lahde: {
    aineisto: 'Maiden liput: Wikimedia Commons (tools/fetch-flags.mjs, assets/liput); maiden keskukset laudan countryShapes-taulusta (Natural Earth).',
    lisenssi: 'Valtioiden liput public domain; Natural Earth public domain',
    osoite: 'https://commons.wikimedia.org/',
    haettu: '2026-09-21',
  },
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};

export { ARVAUKSEN_TP, LIVIAN_KYSYMYKSET };
