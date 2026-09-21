/*
 * TÄHTITAIVAS — KOLMAS LEIKKILINSSI (omistaja 21.9.2026 linssisarja;
 * Fablen hyväksymä suunnitelma 21.9.2026, Pelikoodari).
 *
 * MITÄ PELAAJA NÄKEE. Isoisän yön taivas kaupungin yllä: koko ruudun
 * tumma kupu (kanvas pallon päällä), jonka keskellä on zeniitti ja
 * kehällä horisontti ilmansuuntineen — pohjoinen ylhäällä, itä
 * VASEMMALLA kuten taivaalle katsottaessa. Tähdet ovat pelaajan
 * kaupungin leveys- ja pituusasteelta juuri tällä hetkellä (paikallinen
 * tähtiaika), Yale Bright Star -luettelosta. Vaakaveto kääntää taivasta
 * (tunti per 60 px), jotta Otava löytyy mihin vuorokaudenaikaan tahansa.
 *
 * NYT / 1873. Sama taivas (presessio 150 vuodessa ≈ 2°, ei lasketa —
 * pakan otsikko), mutta VALOSAASTE: nyt kaupungin taivaalta näkyvät vain
 * kirkkaimmat tähdet (suurkaupunki mag ≤ 2,5, muut ≤ 3,5), 1873 kaikki
 * 4,5:een. 1873:n ensimmäinen avaus näyttää Horation päiväkirjakortin
 * (Fablen teksti: Seulasista kuusi tähteä, 762 mmHg, kello 22.40).
 *
 * KOSKETUS. Tähdistö syttyy napautuksesta (viivat + nimi suomeksi ja
 * latinaksi + pakan huomio), sammuu seuraavasta. Livia kysyy: sytyttää
 * yhden näkyvän tähdistön ilman nimeä ja antaa neljä nimeä; oikea tuo
 * XP_TAHTITAIVAS tp (js/game.js vastaaTahtitaivaaseen). Repliikit
 * Fablen sanatarkat (mallipohja ilman ääntä).
 *
 * MITEN SE ON RAKENNETTU. Laskenta on js/linssit/tahtitaivas-laskenta.js
 * (testattavissa Nodessa). Kanvas piirretään vain kun näkymä muuttuu
 * (tila, aika, koko, sytytys) — ei rAF-silmukkaa; pallo ei piirrä
 * kuvun alla mitään turhaan, koska portti aikajana-paalla on päällä ja
 * kanvas on läpinäkymätön. Kehys (✕, vivut, kortti) on sama kuin
 * Kelloissa ja Lippuarvauksessa.
 */

import { ilmoitaLivianKasvopuhe } from '../livia-puhetila.js';
import { pallonKaupungit } from '../pallo.js';
import { TAHTITAIVAS } from '../packs/linssi-tahdet.js';
import {
  ARVAUKSEN_TP, HORISONTIN_VARA_AST, LIVIAN_KYSYMYKSET, arvoKysymys, kirkkausraja, kuvioPisteesta, nakyvatKuviot,
  nakyvatTahdet, palaute, tahdenSade, tahdenVari,
} from './tahtitaivas-laskenta.js';

const LINSSIPORTTI = 'aikajana-paalla';
const PALKKI_PIILOON = 'aikajana-palkki-auki';
const TYYLIN_TUNNUS = 'tahtitaivas-tyyli';
/** Vaakaveto: tunti taivasaikaa per näin monta pikseliä. */
export const VEDON_TUNTI_PX = 60;
/** Napautuksen ja vedon raja (px). */
const NAPAUTUKSEN_RAJA_PX = 8;

const TYYLI = `
.tahtitaivas-kupu {
  position: fixed; inset: 0; z-index: 39; display: block; width: 100%; height: 100%; touch-action: none;
  background: #070a16; cursor: crosshair;
}
.tahtitaivas-kehikko {
  position: fixed; left: 0; right: 0; bottom: max(0.6rem, env(safe-area-inset-bottom)); z-index: 41;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem; pointer-events: none; padding: 0 0.75rem;
}
.tahtitaivas-kehikko > * { pointer-events: auto; }
.tahtitaivas-vivut {
  display: flex; gap: 0.35rem; align-items: center; padding: 0.3rem;
  background: rgba(20, 24, 44, 0.88); border: 1px solid rgba(201, 162, 39, 0.55); border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
}
.tahtitaivas-vivut button {
  font: 600 0.92rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2; background: transparent;
  border: 1px solid transparent; border-radius: 999px; padding: 0.5rem 0.9rem; cursor: pointer; min-height: 2.4rem;
}
.tahtitaivas-vivut button[aria-pressed="true"] { background: #c9a227; color: #2f2415; border-color: #e6c765; }
.tahtitaivas-vivut button.tahtitaivas-kysy { border-color: rgba(240, 226, 194, 0.5); }
.tahtitaivas-tila-nimi {
  font: 700 0.85rem/1 "Special Elite", "Courier New", monospace; color: #f0e2c2;
  background: rgba(20, 24, 44, 0.8); padding: 0.4rem 0.7rem; border-radius: 999px; border: 1px solid rgba(201, 162, 39, 0.55);
}
.tahtitaivas-kortti {
  width: min(34rem, 100%); background: #f5ecd6; color: #2f2415; border: 1px solid #b08d4a; border-radius: 0.8rem;
  padding: 0.7rem 0.85rem; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
  font: 400 0.95rem/1.35 "Special Elite", "Courier New", monospace;
}
.tahtitaivas-kortti[hidden] { display: none; }
.tahtitaivas-kortti .tahtitaivas-puhuja { font-weight: 700; color: #7a5b2e; margin-bottom: 0.2rem; }
.tahtitaivas-kortti .tahtitaivas-kysymys { margin: 0 0 0.55rem; }
.tahtitaivas-kortti .tahtitaivas-latina { color: #5a4526; font-style: italic; }
.tahtitaivas-kortti .tahtitaivas-valinnat { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
.tahtitaivas-kortti button {
  font: 600 0.92rem/1.15 "Special Elite", "Courier New", monospace; padding: 0.55rem 0.7rem; border-radius: 0.6rem;
  border: 1px solid #7a5b2e; background: #fffaf0; color: #2f2415; cursor: pointer; min-height: 2.6rem;
}
.tahtitaivas-kortti button.tahtitaivas-oikea { background: #cfe8c3; border-color: #2e6b2e; }
.tahtitaivas-kortti button.tahtitaivas-vaara { background: #f1cfc5; border-color: #8a2f1c; }
.tahtitaivas-kortti button.tahtitaivas-sulje-kortti { background: #c9a227; border-radius: 999px; margin-top: 0.5rem; }
.tahtitaivas-kortti .tahtitaivas-palaute { margin: 0.5rem 0 0; font-weight: 700; }
.tahtitaivas-kortti .tahtitaivas-palaute.oikein { color: #2e6b2e; }
.tahtitaivas-kortti .tahtitaivas-palaute.vaarin { color: #8a2f1c; }
.tahtitaivas-kortti .tahtitaivas-selite { margin: 0.35rem 0 0; font-size: 0.85rem; color: #5a4526; }
.tahtitaivas-linssisulku {
  position: fixed; top: max(0.6rem, env(safe-area-inset-top)); right: 0.75rem; z-index: 42;
  width: 2.3rem; height: 2.3rem; border-radius: 999px; border: 1px solid rgb(170, 170, 170);
  background: rgba(60, 50, 35, 0.6); color: #f0e2c2; font: 1.3rem/1 sans-serif; cursor: pointer;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
@media (max-width: 480px) { .tahtitaivas-kortti { font-size: 0.88rem; } }
`;

function lataaTyyli(doc) {
  if (!doc?.head || doc.getElementById(TYYLIN_TUNNUS)) return;
  const tyyli = doc.createElement('style');
  tyyli.id = TYYLIN_TUNNUS;
  tyyli.textContent = TYYLI;
  doc.head.appendChild(tyyli);
}

/* ------------------------------------------------------------ piirto --- */

/**
 * Kuvun piirto kanvakselle. `nakyma` = { tahdet, kuviot, sytytetty
 * (kuvio-olio tai null), livia (kuvio tai null), cx, cy, R, magRaja }.
 * Puhdas piirto: ei lue DOMia.
 */
export function piirraKupu(ctx, W, H, nakyma) {
  const { cx, cy, R, tahdet, kuviot, sytytetty, livia, ilmansuunnat = true } = nakyma;
  ctx.clearRect(0, 0, W, H);
  // Yö: syvä sini keskellä, hivenen vaaleampi horisontissa (kaupungin kajo).
  const tausta = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
  tausta.addColorStop(0, '#05070f');
  tausta.addColorStop(0.85, '#0a1230');
  tausta.addColorStop(1, nakyma.kajo ? '#2a2a3a' : '#141c3c');
  ctx.fillStyle = '#070a16';
  ctx.fillRect(0, 0, W, H);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = tausta;
  ctx.fill();
  // Horisontti ja korkeusrenkaat 30° ja 60°.
  ctx.strokeStyle = 'rgba(201, 162, 39, 0.55)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(201, 162, 39, 0.14)';
  for (const h of [30, 60]) {
    ctx.beginPath();
    ctx.arc(cx, cy, R * (90 - h) / 90, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Tähdistöviivat: sytytetty (kulta) ja Livian (kulta, paksumpi), ei muita.
  const viivat = (k, vari, paksuus) => {
    if (!k) return;
    ctx.strokeStyle = vari;
    ctx.lineWidth = paksuus;
    ctx.lineJoin = 'round';
    for (const jono of k.viivat) {
      ctx.beginPath();
      let alku = true;
      for (const p of jono) {
        if (p.h < HORISONTIN_VARA_AST - 6) { alku = true; continue; }
        if (alku) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        alku = false;
      }
      ctx.stroke();
    }
  };
  viivat(sytytetty, 'rgba(240, 226, 194, 0.85)', 1.3);
  viivat(livia, 'rgba(201, 162, 39, 0.95)', 1.8);
  // Tähdet: koko ja sävy luettelosta.
  for (const t of tahdet) {
    const r = tahdenSade(t.mag);
    ctx.beginPath();
    ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
    ctx.fillStyle = tahdenVari(t.bv);
    ctx.fill();
    if (t.mag < 1.5) {
      ctx.beginPath();
      ctx.arc(t.x, t.y, r + 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fill();
    }
  }
  // Sytytetyn tähdistön tähdet korostettuina kuvun tähtirajan yli.
  for (const k of [sytytetty, livia]) {
    if (!k) continue;
    for (const p of k.pisteet) {
      if (p.h < HORISONTIN_VARA_AST) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, tahdenSade(p.mag) + 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.9)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  // Ilmansuunnat (itä vasemmalla).
  if (ilmansuunnat) {
    ctx.fillStyle = 'rgba(240, 226, 194, 0.85)';
    ctx.font = '700 13px "Special Elite", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', cx, cy - R - 12);
    ctx.fillText('E', cx, cy + R + 12);
    ctx.fillText('I', cx - R - 12, cy);
    ctx.fillText('L', cx + R + 12, cy);
  }
  // Sytytetyn nimi kuvion viereen.
  const nimi = livia ? null : sytytetty;
  if (nimi) {
    ctx.fillStyle = 'rgba(240, 226, 194, 0.95)';
    ctx.font = '700 13px "Special Elite", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(nimi.kuvio.suomi, nimi.keski.x, nimi.keski.y - 10);
  }
}

/* ------------------------------------------------------------ linssi --- */

function avaa(lauta, tila, ui) {
  const doc = document;
  lataaTyyli(doc);
  const game = ui?.game ?? null;
  const cityId = game?.cityOf?.()?.id ?? null;
  const kaupunki = pallonKaupungit(game?.pack ?? null).find((k) => k.id === cityId)
    ?? { id: null, n: 'Marseille', lat: 43.3, lon: 5.37 };
  let aikatila = 'nyt';
  let siirtoMs = 0; // vedon tuoma aika (ms)
  let sytytetty = null; // kuvio-olio (nakyvatKuviot)
  let liviaKuvio = null;
  let kysymys = null;
  const kysytyt = new Set();
  let kysymyksia = 0;
  let horatioNaytetty = false;
  let suljettu = false;
  let viimeNakyma = null;

  doc.body.classList.add(PALKKI_PIILOON, LINSSIPORTTI);

  const kupu = doc.createElement('canvas');
  kupu.className = 'tahtitaivas-kupu';
  kupu.setAttribute('role', 'img');
  const ctx = kupu.getContext('2d');
  const mitat = () => {
    const W = kupu.clientWidth || globalThis.innerWidth || 390;
    const H = kupu.clientHeight || globalThis.innerHeight || 844;
    const R = Math.min(W, H) / 2 - 26;
    // Kupu ylös: alareunaan jää tila Livian kortille ja vivuille (puhelin).
    return { W, H, cx: W / 2, cy: Math.min(H / 2, R + 44), R };
  };
  const hetki = () => Date.now() + siirtoMs;
  const laske = () => {
    const { W, H, cx, cy, R } = mitat();
    const magRaja = kirkkausraja(aikatila, kaupunki.id);
    const yhteiset = { lat: kaupunki.lat, lon: kaupunki.lon, hetkiMs: hetki(), magRaja, cx, cy, R };
    const tahdet = nakyvatTahdet(yhteiset);
    const kuviot = nakyvatKuviot(yhteiset);
    const etsi = (k) => (k ? kuviot.find((x) => x.kuvio.lyhenne === k.kuvio.lyhenne) ?? null : null);
    sytytetty = etsi(sytytetty);
    liviaKuvio = etsi(liviaKuvio);
    viimeNakyma = { W, H, cx, cy, R, tahdet, kuviot, magRaja, sytytetty, livia: liviaKuvio, kajo: aikatila === 'nyt' };
    return viimeNakyma;
  };
  const piirra = () => {
    if (suljettu || !ctx) return;
    const n = laske();
    const dpr = globalThis.devicePixelRatio || 1;
    if (kupu.width !== Math.round(n.W * dpr) || kupu.height !== Math.round(n.H * dpr)) {
      kupu.width = Math.round(n.W * dpr);
      kupu.height = Math.round(n.H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    piirraKupu(ctx, n.W, n.H, n);
    kupu.setAttribute('aria-label', `${kaupunki.n}: ${n.tahdet.length} tähteä, ${n.kuviot.length} tähdistöä`);
    paivitaTilaNimi(n);
  };

  /* ── kehys ──────────────────────────────────────────────────────── */
  const sulku = doc.createElement('button');
  sulku.type = 'button';
  sulku.className = 'tahtitaivas-linssisulku';
  sulku.textContent = '×';
  sulku.title = 'Poistu linssistä';
  sulku.setAttribute('aria-label', 'Poistu linssistä');
  sulku.addEventListener('click', (e) => { e.stopPropagation?.(); ui?.valitseLinssi?.(null); });
  const kehikko = doc.createElement('div');
  kehikko.className = 'tahtitaivas-kehikko';
  const kortti = doc.createElement('section');
  kortti.className = 'tahtitaivas-kortti';
  kortti.hidden = true;
  kortti.setAttribute('aria-live', 'polite');
  const tilaNimi = doc.createElement('div');
  tilaNimi.className = 'tahtitaivas-tila-nimi';
  const vivut = doc.createElement('nav');
  vivut.className = 'tahtitaivas-vivut';
  vivut.setAttribute('aria-label', 'Tähtitaivas');
  const paivitaTilaNimi = (n) => {
    const aika = new Date(hetki());
    const hh = String(aika.getHours()).padStart(2, '0');
    const mm = String(aika.getMinutes()).padStart(2, '0');
    tilaNimi.textContent = `${kaupunki.n} · ${aikatila === '1873' ? '1873' : 'nyt'} · ${hh}.${mm} · ${n?.tahdet.length ?? 0} tähteä`;
  };
  const asetaTila = (uusi) => {
    if (uusi === aikatila) return;
    aikatila = uusi;
    for (const nappi of vivut.querySelectorAll('[data-tila]')) nappi.setAttribute('aria-pressed', String(nappi.dataset.tila === uusi));
    piirra();
    if (uusi === '1873' && !horatioNaytetty && !kysymys) {
      horatioNaytetty = true;
      naytaKortti('Horatio, Marseille 1873', LINSSI.kortti, suljeNappi());
    }
  };
  const vipu = (teksti, arvo) => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = teksti;
    b.dataset.tila = arvo;
    b.setAttribute('aria-pressed', String(arvo === aikatila));
    b.addEventListener('click', () => asetaTila(arvo));
    vivut.appendChild(b);
    return b;
  };
  vipu('Nyt', 'nyt');
  vipu('1873', '1873');
  const kysy = doc.createElement('button');
  kysy.type = 'button';
  kysy.className = 'tahtitaivas-kysy';
  kysy.textContent = 'Livia kysyy';
  vivut.appendChild(kysy);
  kehikko.append(kortti, tilaNimi, vivut);
  doc.body.append(kupu, sulku, kehikko);

  /* ── kortti ─────────────────────────────────────────────────────── */
  const suljeNappi = (teksti = 'Selvä') => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.className = 'tahtitaivas-sulje-kortti';
    b.textContent = teksti;
    b.addEventListener('click', suljeKortti);
    return b;
  };
  const suljeKortti = () => {
    kortti.hidden = true;
    kortti.replaceChildren();
    ilmoitaLivianKasvopuhe('tahtitaivas', false);
    kysymys = null;
    liviaKuvio = null;
    piirra();
  };
  const naytaKortti = (puhuja, teksti, ...lisat) => {
    kortti.replaceChildren();
    const p = doc.createElement('div');
    p.className = 'tahtitaivas-puhuja';
    p.textContent = puhuja;
    const q = doc.createElement('p');
    q.className = 'tahtitaivas-kysymys';
    q.textContent = teksti;
    kortti.append(p, q, ...lisat.filter(Boolean));
    kortti.hidden = false;
  };

  /* ── kosketus: napautus sytyttää, veto kääntää ─────────────────── */
  let veto = null;
  kupu.addEventListener('pointerdown', (e) => {
    veto = { x: e.clientX, y: e.clientY, siirto: siirtoMs, liikkui: false };
    kupu.setPointerCapture?.(e.pointerId);
  });
  kupu.addEventListener('pointermove', (e) => {
    if (!veto) return;
    const dx = e.clientX - veto.x;
    if (!veto.liikkui && Math.abs(dx) < NAPAUTUKSEN_RAJA_PX && Math.abs(e.clientY - veto.y) < NAPAUTUKSEN_RAJA_PX) return;
    veto.liikkui = true;
    siirtoMs = veto.siirto + (dx / VEDON_TUNTI_PX) * 3600000;
    piirra();
  });
  const vetoLoppui = (e) => {
    if (!veto) return;
    const oli = veto;
    veto = null;
    if (oli.liikkui) return;
    sytyta(e.clientX, e.clientY);
  };
  kupu.addEventListener('pointerup', vetoLoppui);
  kupu.addEventListener('pointercancel', () => { veto = null; });
  const sytyta = (x, y) => {
    if (!viimeNakyma) return;
    const r = kupu.getBoundingClientRect();
    const k = kuvioPisteesta(viimeNakyma.kuviot, x - r.left, y - r.top);
    if (!k || (sytytetty && k.kuvio.lyhenne === sytytetty.kuvio.lyhenne)) { sytytetty = null; piirra(); if (!kysymys) suljeKortti(); return; }
    sytytetty = k;
    piirra();
    if (kysymys) return;
    const latina = doc.createElement('p');
    latina.className = 'tahtitaivas-latina';
    latina.textContent = `${k.kuvio.latina} (${k.kuvio.lyhenne}) · ${k.pisteet.length} tähteä viivoissa, kirkkain mag ${k.kirkkain.toFixed(1)}`;
    naytaKortti(k.kuvio.suomi, k.kuvio.huomio ?? 'Tähdistö, jonka viivat isoisä olisi piirtänyt päiväkirjaansa.', latina, suljeNappi());
  };

  /* ── Livia kysyy ────────────────────────────────────────────────── */
  const kysyLivia = () => {
    const n = laske();
    const q = arvoKysymys(n.kuviot, { kysytyt, jarjestys: kysymyksia });
    if (!q) { naytaKortti('Livia', 'Tältä taivaalta ei nyt erotu tarpeeksi tähdistöjä — kokeile vuotta 1873 tai käännä taivasta.', suljeNappi()); return; }
    kysymyksia += 1;
    kysytyt.add(q.oikea.kuvio.lyhenne);
    kysymys = { ...q, vastattu: false };
    liviaKuvio = q.oikea;
    sytytetty = null;
    piirra();
    ilmoitaLivianKasvopuhe('tahtitaivas', true, q.kysymys.teksti);
    const valinnat = doc.createElement('div');
    valinnat.className = 'tahtitaivas-valinnat';
    valinnat.setAttribute('role', 'group');
    valinnat.setAttribute('aria-label', 'Vaihtoehdot');
    for (const kuvio of q.vaihtoehdot) {
      const b = doc.createElement('button');
      b.type = 'button';
      b.dataset.tahdisto = kuvio.lyhenne;
      b.textContent = kuvio.suomi;
      b.addEventListener('click', () => vastaa(kuvio.lyhenne));
      valinnat.appendChild(b);
    }
    naytaKortti('Livia', q.kysymys.teksti, valinnat);
  };
  const vastaa = (lyhenne) => {
    if (!kysymys || kysymys.vastattu) return;
    const { oikea } = kysymys;
    const oikein = lyhenne === oikea.kuvio.lyhenne;
    kysymys = { ...kysymys, vastattu: true, vastaus: lyhenne, oikein };
    const tp = game?.vastaaTahtitaivaaseen?.(game.player, oikein, { tahdisto: oikea.kuvio.suomi }) ?? 0;
    if (oikein) ui?.onChange?.(game);
    ilmoitaLivianKasvopuhe('tahtitaivas', false);
    for (const b of kortti.querySelectorAll('.tahtitaivas-valinnat button')) {
      b.disabled = true;
      if (b.dataset.tahdisto === oikea.kuvio.lyhenne) b.classList.add('tahtitaivas-oikea');
      else if (b.dataset.tahdisto === lyhenne) b.classList.add('tahtitaivas-vaara');
    }
    const p = doc.createElement('p');
    p.className = `tahtitaivas-palaute ${oikein ? 'oikein' : 'vaarin'}`;
    p.textContent = `${palaute(oikein, oikea.kuvio)}${oikein && tp ? ` (+${tp} tp)` : ''}`;
    const selite = doc.createElement('p');
    selite.className = 'tahtitaivas-selite';
    selite.textContent = oikea.kuvio.huomio ? `${oikea.kuvio.latina} — ${oikea.kuvio.huomio}` : oikea.kuvio.latina;
    kortti.append(p, selite, suljeNappi());
    // Nimi näkyviin kuvun viereen: Livian kuvio jää palamaan kortin sulkuun asti.
    sytytetty = oikea;
    piirra();
  };
  kysy.addEventListener('click', kysyLivia);

  const koonVahti = () => piirra();
  globalThis.addEventListener?.('resize', koonVahti);
  piirra();

  return {
    /** Savukkeet ja vartijat. */
    tila: () => aikatila,
    asetaTila,
    nakyma: () => viimeNakyma,
    kaupunki: () => kaupunki,
    siirra: (tuntia) => { siirtoMs += tuntia * 3600000; piirra(); },
    sytyta: (lyhenne) => {
      const n = laske();
      sytytetty = n.kuviot.find((k) => k.kuvio.lyhenne === lyhenne) ?? null;
      piirra();
      return Boolean(sytytetty);
    },
    sytytetty: () => sytytetty?.kuvio ?? null,
    kysy: kysyLivia,
    kysymys: () => kysymys,
    vastaa,
    pura() {
      if (suljettu) return;
      suljettu = true;
      globalThis.removeEventListener?.('resize', koonVahti);
      ilmoitaLivianKasvopuhe('tahtitaivas', false);
      kupu.remove();
      sulku.remove();
      kehikko.remove();
      doc.body.classList.remove(PALKKI_PIILOON, LINSSIPORTTI);
    },
  };
}

const L = TAHTITAIVAS.lahde;
export const LINSSI = {
  tunnus: 'tahdet',
  jarjestys: 62,
  kerros: false,
  nimi: 'Tähtitaivas',
  lyhyt: 'Isoisän yön taivas kaupungin yllä: tähdistöt syttyvät kosketuksesta, ja vuonna 1873 niitä näkyi enemmän kuin nyt.',
  // Otava kupolin sisällä.
  ikoni: '<path d="M4 18a8 8 0 0 1 16 0"/><path d="M6.5 13.5l2.5-1 2.8.6 2.7-1.2 1.6-2.4"/>'
    + '<circle cx="6.5" cy="13.5" r=".7"/><circle cx="9" cy="12.5" r=".7"/><circle cx="11.8" cy="13.1" r=".7"/><circle cx="14.5" cy="11.9" r=".7"/><circle cx="16.1" cy="9.5" r=".7"/>',
  valokuva: false,
  laudat: ['*'],
  /** Kortin teksti (Horatio 1873, Fable 21.9.2026). */
  kortti: 'Laivastossa tähdet olivat työkaluja: Pohjantähti antoi leveysasteen ja Arcturus tarkisti kronometrin. '
    + 'Täällä majatalon katolla ne ovat taas vain tähtiä, ja niitä on enemmän kuin Lontoossa koskaan. Laskin '
    + 'Seulasista kuusi tähteä paljain silmin; merellä olen nähnyt seitsemän. Seesteistä, 762 mmHg, kello 22.40 '
    + 'kaupungin omaa aikaa. Tähtitaivas on ainoa kartta, jota ei ole tarvinnut korjata.',
  /*
   * NÄKYVÄ ATTRIBUUTIO (Fable 21.9.2026): Yale BSC / CDS, ConstellationLines
   * CC BY 4.0, IAU-nimet CC BY. Lähteen .dat-otsikon BY-SA-ristiriita on
   * kirjattu pakan LUEMINUT-riville (js/packs/linssi-tahdet.js lisenssi).
   */
  lahde: {
    aineisto: `Tähdet: ${L.tahdet} (${L.tahdetViite}). Tähdistöviivat: ${L.kuviot} (${L.kuviotViite}). Nimet: ${L.nimet} (${L.nimetViite}). Suomennimet: ${L.suomiViite}.`,
    lisenssi: 'Yale BSC: NASA ADC / CDS, vapaasti jaettava (VizieR DOI 10.26093/cds/vizier). ConstellationLines: CC BY 4.0 (repon LICENSE; .dat-tiedoston otsikko sanoo CC BY-SA 4.0 — ristiriita on lähteessä, noudatetaan repon virallista lisenssiä). IAU-CSN: CC BY. Wikipedian nimet: tosiasioita, lähde mainittu.',
    osoite: 'https://cdsarc.cds.unistra.fr/ftp/V/50/catalog.gz',
    haettu: L.haettu,
  },
  pallolle(lauta, tila, ui) {
    return avaa(lauta, tila, ui);
  },
};

export { ARVAUKSEN_TP, LIVIAN_KYSYMYKSET };
