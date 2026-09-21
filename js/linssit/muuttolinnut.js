/*
 * MUUTTOLINNUT — NELJÄS LEIKKILINSSI (omistaja 21.9.2026 linssisarja;
 * Fablen hyväksymä suunnitelma ja taulukko 21.9.2026, Pelikoodari).
 *
 * MITÄ PELAAJA NÄKEE. Kuuden Suomessa pesivän lajin muuttoreitit
 * pallolla polkuina (kurki, haarapääsky, tervapääsky, kiuru,
 * valkoposkihanhi, käki; js/packs/linssi-muuttolinnut.js) ja jokaisen
 * lajin PARVI-merkki siinä, missä laji on valittuna kuukautena:
 * pesimäalueella, levähdyspaikalla, talvehtimassa tai matkalla kahden
 * pisteen välillä. Kuukausi luetaan aluksi kellosta (nyt) ja sitä
 * selataan ◀ ▶ -napeilla vuodenkierron läpi. Napautus parveen avaa
 * lajin kortin (matka, nopeus, korkeus, lähtö ja paluu, Fablen
 * huomio). Horation kortti (kurkiaura satamasta, 163°) avautuu
 * "Horatio"-napista.
 *
 * LEIKKI. Livia kysyy, missä maassa laji on tiettynä kuukautena
 * ({LAJI}, {KUUKAUSI}); pelaaja napauttaa MAATA pallolla (maapolygonit
 * kuten Lippuarvauksen kartta-muodossa). Kysymyksen ajaksi kuukausi
 * vaihtuu kysyttyyn ja kysytyn lajin parvi piilotetaan (se kertoisi
 * vastauksen); muut parvet jäävät. Oikea tuo XP_MUUTTOLINNUT tp
 * (js/game.js vastaaMuuttolintuihin); oikea maa värjäytyy vihreäksi,
 * väärin napautettu punaiseksi. Repliikit Fablen sanatarkat.
 *
 * MITEN SE ON RAKENNETTU. Sama kaava kuin muissa leikkilinsseissä:
 * laskenta js/linssit/muuttolinnut-laskenta.js, polut ja merkit
 * linssimoottorista (js/pallolauta/linssit.js), muutokset aina
 * merkkikerroksen kautta, polygonit maapolygonitPallolle-apurilla
 * (js/vertailu.js).
 */

import { ilmoitaLivianKasvopuhe } from '../livia-puhetila.js';
import { KUUKAUSIEN_NIMET, MUUTTOLINNUT, MUUTTOLINNUT_LAHDE } from '../packs/linssi-muuttolinnut.js';
import { maapolygonitPallolle } from '../vertailu.js';
import {
  ARVAUKSEN_TP, LIVIAN_KYSYMYKSET, arvoKysymys, kuukausiHetkesta, kysymyksenTeksti, palaute, parvenPaikka, reitinPisteet,
} from './muuttolinnut-laskenta.js';

const POLUT_OSA = 'muuttolinnut-reitit';
const PARVET_OSA = 'muuttolinnut-parvet';
const MAAT_OSA = 'muuttolinnut-maat';
const LINSSIPORTTI = 'aikajana-paalla';
const PALKKI_PIILOON = 'aikajana-palkki-auki';
const TYYLIN_TUNNUS = 'muuttolinnut-tyyli';
/** Maapolygonin sävyt kysymyksessä (sama muste kuin Lippuarvauksessa). */
export const MAIDEN_SAVYT = {
  tavallinen: { vari: 'rgba(140, 110, 70, 0.06)', reuna: 'rgba(70, 51, 31, 0.5)' },
  oikea: { vari: 'rgba(46, 107, 46, 0.35)', reuna: 'rgba(30, 90, 30, 0.95)' },
  vaara: { vari: 'rgba(176, 34, 34, 0.35)', reuna: 'rgba(140, 30, 30, 0.95)' },
};
const polygoniMuisti = new WeakMap();

const TYYLI = `
.muuttolinnut-parvi { pointer-events: none; transform: translate(-50%, -50%); text-align: center; }
.muuttolinnut-parvi svg { display: block; margin: 0 auto; overflow: visible; }
.muuttolinnut-parvi .muuttolinnut-lintu { fill: var(--parvi-vari, #3b3b3b); stroke: rgba(245, 236, 214, 0.9); stroke-width: 0.9; }
.muuttolinnut-parvi .muuttolinnut-nimi {
  display: inline-block; white-space: nowrap; font: 700 11px/1.2 "Special Elite", "Courier New", monospace; color: #2f2415;
  background: rgba(245, 236, 214, 0.92); border: 1px solid #b08d4a; border-radius: 999px; padding: 1px 7px; margin-top: 2px;
}
.muuttolinnut-parvi.muuttolinnut-matkalla .muuttolinnut-nimi { font-style: italic; opacity: 0.85; }
.muuttolinnut-parvi.muuttolinnut-valittu .muuttolinnut-nimi { background: #ffe9a8; border-color: #c9a227; }
.muuttolinnut-kehikko {
  position: fixed; left: 0; right: 0; bottom: max(0.6rem, env(safe-area-inset-bottom)); z-index: 41;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem; pointer-events: none; padding: 0 0.75rem;
}
.muuttolinnut-kehikko > * { pointer-events: auto; }
.muuttolinnut-vivut {
  display: flex; gap: 0.35rem; align-items: center; padding: 0.3rem;
  background: rgba(38, 28, 16, 0.86); border: 1px solid rgba(201, 162, 39, 0.55); border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}
.muuttolinnut-vivut button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2; background: transparent;
  border: 1px solid transparent; border-radius: 999px; padding: 0.5rem 0.8rem; cursor: pointer; min-height: 2.4rem;
}
.muuttolinnut-vivut .muuttolinnut-kuukausi { min-width: 7.2rem; text-align: center; font-weight: 700; color: #ffe9a8; }
.muuttolinnut-vivut button.muuttolinnut-kysy { border-color: rgba(240, 226, 194, 0.5); }
.muuttolinnut-tila-nimi {
  font: 700 0.85rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2;
  background: rgba(38, 28, 16, 0.78); padding: 0.4rem 0.7rem; border-radius: 999px; border: 1px solid rgba(201, 162, 39, 0.55);
}
.muuttolinnut-kortti {
  width: min(34rem, 100%); background: #f5ecd6; color: #2f2415; border: 1px solid #b08d4a; border-radius: 0.8rem;
  padding: 0.7rem 0.85rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  font: 400 0.95rem/1.35 "Special Elite", "Courier New", monospace;
}
.muuttolinnut-kortti[hidden] { display: none; }
.muuttolinnut-kortti .muuttolinnut-puhuja { font-weight: 700; color: #7a5b2e; margin-bottom: 0.2rem; }
.muuttolinnut-kortti .muuttolinnut-kysymys { margin: 0 0 0.55rem; }
.muuttolinnut-kortti .muuttolinnut-latina { color: #5a4526; font-style: italic; margin: 0 0 0.4rem; }
.muuttolinnut-kortti dl { display: grid; grid-template-columns: auto 1fr; gap: 0.15rem 0.7rem; margin: 0 0 0.5rem; font-size: 0.88rem; }
.muuttolinnut-kortti dt { color: #7a5b2e; }
.muuttolinnut-kortti dd { margin: 0; }
.muuttolinnut-kortti button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; padding: 0.5rem 0.9rem; border-radius: 999px;
  border: 1px solid #7a5b2e; background: #c9a227; color: #2f2415; cursor: pointer; min-height: 2.4rem; margin-top: 0.3rem;
}
.muuttolinnut-kortti button.muuttolinnut-toissijainen { background: transparent; }
.muuttolinnut-kortti .muuttolinnut-palaute { margin: 0.5rem 0 0; font-weight: 700; }
.muuttolinnut-kortti .muuttolinnut-palaute.oikein { color: #2e6b2e; }
.muuttolinnut-kortti .muuttolinnut-palaute.vaarin { color: #8a2f1c; }
.muuttolinnut-linssisulku {
  position: fixed; top: max(0.6rem, env(safe-area-inset-top)); right: 0.75rem; z-index: 42;
  width: 2.3rem; height: 2.3rem; border-radius: 999px; border: 1px solid rgb(170, 170, 170);
  background: rgba(60, 50, 35, 0.6); color: #f0e2c2; font: 1.3rem/1 sans-serif; cursor: pointer;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
@media (max-width: 480px) { .muuttolinnut-kortti { font-size: 0.88rem; } .muuttolinnut-vivut button { padding: 0.5rem 0.6rem; } }
`;

function lataaTyyli(doc) {
  if (!doc?.head || doc.getElementById(TYYLIN_TUNNUS)) return;
  const tyyli = doc.createElement('style');
  tyyli.id = TYYLIN_TUNNUS;
  tyyli.textContent = TYYLI;
  doc.head.appendChild(tyyli);
}

/* ------------------------------------------------------------- parvi --- */

const SVG = 'http://www.w3.org/2000/svg';
/** Lintusiluetti (yksi lintu, siivet levällään) — sama kaikille, väri lajin. */
const LINTU_POLKU = 'M12 5c-2.2 0-4.5 1.9-8 3.2 2.1 0.3 3.9 0.1 5.4-0.2-0.6 1.3-1 2.8-1 4.6l1.6-2.6 0.9 3.2 1.1-3.2 1.1 3.2 0.9-3.2 1.6 2.6c0-1.8-0.4-3.3-1-4.6 1.5 0.3 3.3 0.5 5.4 0.2C16.5 6.9 14.2 5 12 5z';

/** Parven elementti: kolme lintua auran muodossa ja lajin nimi. */
export function parviElementti(d) {
  const el = document.createElement('div');
  el.className = 'muuttolinnut-parvi';
  el.dataset.laji = d.tunnus;
  el.style.setProperty('--parvi-vari', d.vari);
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '34');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 34 24');
  svg.setAttribute('aria-hidden', 'true');
  for (const [x, y, s] of [[5, 2, 0.55], [12, 8, 0.7], [20, 2, 0.55]]) {
    const p = document.createElementNS(SVG, 'path');
    p.setAttribute('class', 'muuttolinnut-lintu');
    p.setAttribute('d', LINTU_POLKU);
    p.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
    svg.appendChild(p);
  }
  const nimi = document.createElement('span');
  nimi.className = 'muuttolinnut-nimi';
  el.append(svg, nimi);
  el.setAttribute('role', 'img');
  asetteleParvi(el, d);
  return el;
}

/** Parven nimi ja tila (matkalla / valittu). */
export function asetteleParvi(el, d) {
  const nimi = el.querySelector('.muuttolinnut-nimi');
  if (nimi) nimi.textContent = d.paikallaan ? d.nimi : `${d.nimi} · matkalla`;
  el.classList.toggle('muuttolinnut-matkalla', !d.paikallaan);
  el.classList.toggle('muuttolinnut-valittu', Boolean(d.valittu));
  el.setAttribute('aria-label', `${d.nimi}: ${d.paikallaan ? d.paikanNimi : 'matkalla'}`);
}

/* ------------------------------------------------------------ linssi --- */

function avaa(lauta, tila, ui) {
  const doc = document;
  lataaTyyli(doc);
  if (!lauta?.linssit) return { pura() {} };
  const game = ui?.game ?? null;
  let kuukausi = kuukausiHetkesta();
  let valittu = null; // lajin tunnus (kortti auki)
  let kysymys = null; // { laji, kuukausi, maa, piste, kysymys, vastattu }
  const kysytyt = new Set();
  let kysymyksia = 0;
  let maaVarit = new Map();
  let maaPolygonit = null;
  let suljettu = false;

  doc.body.classList.add(PALKKI_PIILOON, LINSSIPORTTI);

  /* ── polut ja parvet ────────────────────────────────────────────── */
  lauta.linssit.polut(POLUT_OSA, MUUTTOLINNUT.map((l) => ({
    avain: `reitti:${l.tunnus}`, pisteet: reitinPisteet(l), vari: l.vari, paksuus: 1.6, katko: 0.4,
  })));
  const datumit = new Map(MUUTTOLINNUT.map((l) => [l.tunnus, {
    avain: `parvi:${l.tunnus}`, tunnus: l.tunnus, nimi: l.nimi, vari: l.vari, lat: l.reitti[0].lat, lng: l.reitti[0].lon,
    paikallaan: true, paikanNimi: l.reitti[0].nimi, valittu: false,
    elementti: parviElementti, asettele: asetteleParvi,
    napautus: (d) => avaaLaji(d.tunnus),
  }]));
  const tyonnaParvet = () => {
    if (suljettu) return;
    const lista = [];
    for (const l of MUUTTOLINNUT) {
      // Kysytyn lajin parvi on piilossa kysymyksen ajan: se kertoisi vastauksen.
      if (kysymys && !kysymys.vastattu && kysymys.laji.tunnus === l.tunnus) continue;
      const d = datumit.get(l.tunnus);
      const p = parvenPaikka(l, kuukausi);
      d.lat = p.lat;
      d.lng = p.lon;
      d.paikallaan = p.paikallaan;
      d.paikanNimi = p.paikallaan ? p.piste.nimi : `${p.mista.nimi} → ${p.mihin.nimi}`;
      d.valittu = valittu === l.tunnus;
      lista.push(d);
    }
    lauta.linssit.merkit(PARVET_OSA, lista);
  };
  const tyonnaMaat = () => {
    if (suljettu) return;
    if (!kysymys) { lauta.linssit.pura?.(MAAT_OSA); return; }
    if (!maaPolygonit) {
      const map = game?.pack?.map ?? null;
      maaPolygonit = (map && polygoniMuisti.get(map)) ?? null;
      if (!maaPolygonit) {
        maaPolygonit = maapolygonitPallolle(map, lauta.asteet);
        if (map && maaPolygonit.size) polygoniMuisti.set(map, maaPolygonit);
      }
    }
    const lista = [];
    for (const [iso, p] of maaPolygonit) {
      const savy = MAIDEN_SAVYT[maaVarit.get(iso) ?? 'tavallinen'];
      lista.push({ avain: `maa:${iso}`, geometry: p.geometry, vari: savy.vari, reuna: savy.reuna, korkeus: 0.004, napautus: () => vastaa(iso) });
    }
    lauta.linssit.polygonit(MAAT_OSA, lista);
  };
  const maanNimi = (iso) => game?.pack?.map?.countryShapes?.[iso]?.nimi ?? iso;

  /* ── kehys ──────────────────────────────────────────────────────── */
  const sulku = doc.createElement('button');
  sulku.type = 'button';
  sulku.className = 'muuttolinnut-linssisulku';
  sulku.textContent = '×';
  sulku.title = 'Poistu linssistä';
  sulku.setAttribute('aria-label', 'Poistu linssistä');
  sulku.addEventListener('click', (e) => { e.stopPropagation?.(); ui?.valitseLinssi?.(null); });
  const kehikko = doc.createElement('div');
  kehikko.className = 'muuttolinnut-kehikko';
  const kortti = doc.createElement('section');
  kortti.className = 'muuttolinnut-kortti';
  kortti.hidden = true;
  kortti.setAttribute('aria-live', 'polite');
  const tilaNimi = doc.createElement('div');
  tilaNimi.className = 'muuttolinnut-tila-nimi';
  const vivut = doc.createElement('nav');
  vivut.className = 'muuttolinnut-vivut';
  vivut.setAttribute('aria-label', 'Muuttolinnut');
  const nappi = (teksti, luokka, toiminto, otsikko = null) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = teksti;
    if (luokka) b.className = luokka;
    if (otsikko) { b.title = otsikko; b.setAttribute('aria-label', otsikko); }
    b.addEventListener('click', toiminto);
    vivut.appendChild(b);
    return b;
  };
  const kuukausiNimi = doc.createElement('span');
  kuukausiNimi.className = 'muuttolinnut-kuukausi';
  const paivitaTilaNimi = () => {
    kuukausiNimi.textContent = KUUKAUSIEN_NIMET[kuukausi];
    const paikallaan = MUUTTOLINNUT.filter((l) => parvenPaikka(l, kuukausi).paikallaan).length;
    tilaNimi.textContent = `Muuttolinnut · ${KUUKAUSIEN_NIMET[kuukausi]} · ${paikallaan}/${MUUTTOLINNUT.length} parvea perillä, ${MUUTTOLINNUT.length - paikallaan} matkalla`;
  };
  const asetaKuukausi = (uusi) => {
    kuukausi = ((uusi % 12) + 12) % 12;
    paivitaTilaNimi();
    tyonnaParvet();
  };
  nappi('◀', 'muuttolinnut-edellinen', () => asetaKuukausi(kuukausi - 1), 'Edellinen kuukausi');
  vivut.appendChild(kuukausiNimi);
  nappi('▶', 'muuttolinnut-seuraava', () => asetaKuukausi(kuukausi + 1), 'Seuraava kuukausi');
  nappi('Horatio', 'muuttolinnut-horatio', () => naytaKortti('Horatio, Marseille 1873', LINSSI.kortti, suljeNappi()));
  const kysy = nappi('Livia kysyy', 'muuttolinnut-kysy', () => kysyLivia());
  kehikko.append(kortti, tilaNimi, vivut);
  doc.body.append(sulku, kehikko);

  /* ── kortti ─────────────────────────────────────────────────────── */
  const suljeNappi = (teksti = 'Selvä', luokka = '') => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.className = luokka;
    b.textContent = teksti;
    b.addEventListener('click', suljeKortti);
    return b;
  };
  const suljeKortti = () => {
    kortti.hidden = true;
    kortti.replaceChildren();
    ilmoitaLivianKasvopuhe('muuttolinnut', false);
    valittu = null;
    if (kysymys) { kysymys = null; maaVarit = new Map(); tyonnaMaat(); }
    tyonnaParvet();
  };
  const naytaKortti = (puhuja, teksti, ...lisat) => {
    kortti.replaceChildren();
    const p = doc.createElement('div');
    p.className = 'muuttolinnut-puhuja';
    p.textContent = puhuja;
    const q = doc.createElement('p');
    q.className = 'muuttolinnut-kysymys';
    q.textContent = teksti;
    kortti.append(p, q, ...lisat.filter(Boolean));
    kortti.hidden = false;
  };
  const avaaLaji = (tunnus) => {
    if (kysymys && !kysymys.vastattu) return;
    const l = MUUTTOLINNUT.find((x) => x.tunnus === tunnus);
    if (!l) return;
    valittu = tunnus;
    if (kysymys) { kysymys = null; maaVarit = new Map(); tyonnaMaat(); }
    tyonnaParvet();
    const p = parvenPaikka(l, kuukausi);
    const latina = doc.createElement('p');
    latina.className = 'muuttolinnut-latina';
    latina.textContent = `${l.latina} · ${KUUKAUSIEN_NIMET[kuukausi]}: ${p.paikallaan ? `${p.piste.nimi} (${p.piste.rooli})` : `matkalla ${p.mista.nimi} → ${p.mihin.nimi}`}`;
    const dl = doc.createElement('dl');
    for (const [k, v] of [['Matka', `${l.matkaKm.toLocaleString('fi-FI')} km`], ['Nopeus', `${l.nopeusKmh} km/h`], ['Korkeus', `${l.korkeusM} m`], ['Lähtö', l.lahto], ['Paluu', l.paluu]]) {
      const dt = doc.createElement('dt');
      dt.textContent = k;
      const dd = doc.createElement('dd');
      dd.textContent = v;
      dl.append(dt, dd);
    }
    naytaKortti(l.nimi, l.huomio ?? '', latina, dl, suljeNappi());
  };

  /* ── Livia kysyy ────────────────────────────────────────────────── */
  const kysyLivia = () => {
    const q = arvoKysymys({ kysytyt, jarjestys: kysymyksia });
    if (!q) return;
    kysymyksia += 1;
    kysytyt.add(q.laji.tunnus);
    valittu = null;
    kysymys = { ...q, vastattu: false };
    asetaKuukausi(q.kuukausi);
    maaVarit = new Map();
    tyonnaMaat();
    const teksti = kysymyksenTeksti(q.kysymys, q.laji, q.kuukausi);
    ilmoitaLivianKasvopuhe('muuttolinnut', true, teksti);
    naytaKortti('Livia', teksti, suljeNappi('Ei nyt', 'muuttolinnut-toissijainen'));
  };
  const vastaa = (iso) => {
    if (!kysymys || kysymys.vastattu) return;
    const { laji, maa } = kysymys;
    const oikein = iso === maa;
    kysymys = { ...kysymys, vastattu: true, vastaus: iso, oikein };
    const tp = game?.vastaaMuuttolintuihin?.(game.player, oikein, { laji: laji.nimi, maa: maanNimi(maa) }) ?? 0;
    if (oikein) ui?.onChange?.(game);
    ilmoitaLivianKasvopuhe('muuttolinnut', false);
    maaVarit = new Map([[maa, 'oikea'], ...(oikein ? [] : [[iso, 'vaara']])]);
    tyonnaMaat();
    tyonnaParvet();
    const p = doc.createElement('p');
    p.className = `muuttolinnut-palaute ${oikein ? 'oikein' : 'vaarin'}`;
    p.textContent = `${palaute(oikein, maanNimi(maa))}${oikein && tp ? ` (+${tp} tp)` : ''}`;
    const selite = doc.createElement('p');
    selite.className = 'muuttolinnut-latina';
    selite.textContent = `${laji.nimi}, ${KUUKAUSIEN_NIMET[kysymys.kuukausi]}: ${kysymys.piste?.nimi ?? ''} (${kysymys.piste?.rooli ?? ''}).`;
    kortti.querySelector('.muuttolinnut-toissijainen')?.remove();
    kortti.append(p, selite, suljeNappi());
  };

  paivitaTilaNimi();
  tyonnaParvet();

  return {
    /** Savukkeet ja vartijat. */
    kuukausi: () => kuukausi,
    asetaKuukausi,
    lajit: () => MUUTTOLINNUT,
    avaaLaji,
    kysy: kysyLivia,
    kysymys: () => kysymys,
    vastaa,
    pura() {
      if (suljettu) return;
      suljettu = true;
      ilmoitaLivianKasvopuhe('muuttolinnut', false);
      for (const osa of [POLUT_OSA, PARVET_OSA, MAAT_OSA]) lauta.linssit.pura?.(osa);
      sulku.remove();
      kehikko.remove();
      doc.body.classList.remove(PALKKI_PIILOON, LINSSIPORTTI);
    },
  };
}

export const LINSSI = {
  tunnus: 'muuttolinnut',
  jarjestys: 63,
  kerros: false,
  nimi: 'Muuttolinnut',
  lyhyt: 'Kurjet, pääskyt ja hanhet vuodenkierron mukaan: missä parvi on nyt, ja minne se lentää. Livia kysyy maata.',
  // Kurkiaura.
  ikoni: '<path d="M4 15l4-2 4 2 4-2 4 2"/><path d="M6 10l3-1.5 3 1.5 3-1.5 3 1.5"/><path d="M9 6l3-1.5 3 1.5"/>',
  valokuva: false,
  laudat: ['*'],
  /** Horation kortti (Fable 21.9.2026). */
  kortti: 'Kolmas lokakuuta, tuulinen. Aamulla satamasta laskin kurkiauran: neljäkymmentäkaksi lintua, kärki etelään kuin '
    + 'kompassineula. Satamavahti sanoi, että ne lentävät Afrikkaan asti ja palaavat keväällä samaa tietä. Minä tarvitsen '
    + 'laivan, luotsin ja kaksitoista karttaa; ne tarvitsevat vain tuulen. Merkitsin auran suunnan marginaaliin: 163 astetta.',
  lahde: MUUTTOLINNUT_LAHDE,
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};

export { ARVAUKSEN_TP, LIVIAN_KYSYMYKSET };
