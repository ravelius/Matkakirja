/*
 * AJATTELIJAN AIKAJANA BLENDERIN LUVUISTA (Sokrates v13, omistaja 3.10.2026; Linnanrakentajan sokrates_bysti.py --luvut).
 *
 * Kohtaus on v13:sta lähtien yksi aikajana: kertoja (yksi yhtenäinen otto) kulkee 10 kappaletta, ja lainaukset, kaiut,
 * valot ja taustavirta ajoitetaan sen sanoihin. Web toistaa Blenderin viedyt avaimet sellaisinaan (kamera, aurinko,
 * pyyhkäisyvalo, videotykit, kaiut, taustavirran kerroin); moottori js/linssit/ajattelija.js `aikajana`-tilassa.
 * Korjatut luvut vaihtuvat ajamalla tämä uudelleen — käsin ei muokata generoitua tiedostoa.
 *
 *   node tools/ajattelija-aikajana.mjs <luvut.json> <ulos.js> [--kaiut <ämpärikansio>] [--savu <ämpäripolku atlas.png> [--savu-ydin 0..1]]
 *
 * Ruudut ovat Blenderin 30 r/s -ruutuja (ruutu 1 = musiikin 0,0 s heti prologin jälkeen), koordinaatit Blenderin
 * (z ylös, kasvot −y); moottori muuntaa ne three.js:n koordinaatteihin (b2t).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const A = process.argv.slice(2);
const [LAHDE, ULOS] = A;
if (!LAHDE || !ULOS) throw new Error('käyttö: node tools/ajattelija-aikajana.mjs <luvut.json> <ulos.js> [--kaiut <kansio>]');
const KAIUT = A.includes('--kaiut') ? A[A.indexOf('--kaiut') + 1] : 'ajattelijat/sokrates/v3';
const d = JSON.parse(readFileSync(LAHDE, 'utf8'));
const v = d.v13;
if (!v) throw new Error(`${LAHDE}: ei v13-aikajanaa`);
const pyor = (x) => Math.round(x * 1e4) / 1e4;
const pv = (a) => a.map(pyor);
const F = (s) => Math.round(s * 30) + 1;   // kohtauksen aika → ruutu (sama kuin sokrates_bysti.py v13_kierrokset)
const energia = (valo) => valo.energia_avaimet.filter(([r]) => r > 1).map(([r, e]) => [r, pyor(e)]);
/** Spotin kuva-alan leveys etäisyydellä 0,6 m: spot_size = 2,4 · atan(ala / 2 / 0,6). */
const alaKeilasta = (aste) => pyor(2 * 0.6 * Math.tan(aste * Math.PI / 180 / 2.4));

// Kamera: kaikki avaimet tapoineen (CONSTANT = leikkaus, BEZIER = ajo seuraavaan).
const kamera = d.kamera.map((k) => [k.ruutu, pv(k.sijainti), pv(k.kohde), pyor(k.mm), k.tapa]);

// Aurinko: paikka, energia ja (jos viety) väri avaimittain; tähtäys aurinko_kohde.
const aurinko = {
  kohde: pv(d.aurinko_kohde),
  avaimet: d.aurinko.map((a) => [a.ruutu, pv(a.sijainti), pyor(a.energia), ...(a.vari ? [pv(a.vari)] : [])]),
};

// Pyyhkäisy: kapea sivuvalo nenän ja silmien yli (kohdeavaimet, jos viety; muuten keskiruudun suunta).
const p = d.valot.pyyhkaisy;
// v13b: suunta_avaimet → kohdepisteet 1 m:n päässä (moottori tähtää niihin).
const pyyhkaisy = p && {
  paikka: pv(p.sijainti), keila: pyor(p.keila_aste), blend: p.spot_blend ?? 0.35, energia: energia(p),
  ...(p.vari ? { vari: pv(p.vari) } : {}),
  ...(p.suunta_avaimet
    ? { kohteet: p.suunta_avaimet.filter(([r]) => r > 1).map(([r, s]) => [r, pv(p.sijainti.map((x, i) => x + s[i]))]) }
    : { suunta: pv(p.suunta) }),
};

// Videotykit (lainausnauhat): paalause = nimen loppu (tykki-38a → '38a'); vieritys kohtauksen ruuduissa.
const tykit = v.lainaukset.map((l) => {
  const valo = d.valot[l.nimi];
  return {
    paalause: l.nimi.replace(/^tykki-/, ''),
    paikka: pv(valo.sijainti), suunta: pv(valo.suunta), ala: valo.ala_m ?? alaKeilasta(valo.keila_aste),
    blend: valo.spot_blend ?? 0.45, energia: energia(valo), ...(valo.nauha_kork_m ? { korkeus: valo.nauha_kork_m } : {}),
    ...(l.kiintea ? { kiintea: true } : { vierii: [F(l.vierii_s[0]), F(l.vierii_s[1])] }),
  };
});

// Kaiut: kuva ämpärissä, projektori sijainnista suuntaan 0,6 m (kaiku_projektori), kuva-ala keilasta.
const kaiut = v.kaiut.map((k) => {
  const valo = d.valot[k.nimi];
  return {
    kuva: `${KAIUT}/${k.kuva}`,
    paikka: pv(valo.sijainti), suunta: pv(valo.suunta), ala: alaKeilasta(valo.keila_aste),
    ...(valo.lev_m ? { lev: valo.lev_m, kork: valo.kork_m } : {}),
    blend: valo.spot_blend ?? 0.3, liuku: valo.liuku_uv ?? 0.02, ruudut: [F(k.alku_s), F(k.loppu_s)], energia: energia(valo),
  };
});

// Taustavirran kerroin: virta-0:n energia jaettuna sen ensimmäisellä tasanteella (kaikilla riveillä sama vaiherytmi).
const v0 = d.valot['virta-0'].energia_avaimet;
const perus = v0.find(([, e]) => e > 0)[1];
const virta = v0.filter(([r]) => r > 1).map(([r, e]) => [r, pyor(e / perus)]);

// v13c: tekstivirran väistökehät kaikujen ympärillä ja savumaski (jos viety).
const c = d.v13c ?? {};
const vaisto = (c.virta_vaisto ?? []).map((x) => ({ kohde: pv(x.kohde), sade: x.sade_m, ruudut: x.ruudut }));
const SAVU = A.includes('--savu') ? A[A.indexOf('--savu') + 1] : null;
// Vahvuus: ytimen tummennus (Päätoimittaja 3.10.2026: noin 95 %); ydin = atlaksen tummin arvo (v4: 72/255, v5: 73/255).
const YDIN = A.includes('--savu-ydin') ? Number(A[A.indexOf('--savu-ydin') + 1]) : 0.28;
const savu = c.savu && SAVU ? {
  kuva: SAVU, ala: c.savu.ala_m, kesto: c.savu.kesto_s, fps: c.savu.fps, ruutuja: Math.round(c.savu.kesto_s * c.savu.fps),
  ydin: YDIN, vahvuus: 0.95,
} : null;

const aikajana = {
  versio: 'v13',
  lahde: A.includes('--lahde-nimi') ? A[A.indexOf('--lahde-nimi') + 1] : LAHDE.split('/').pop(),
  loppu: v.loppu,
  kertoja: { alku: v.kertoja_alkaa_s, kappaleet: v.kappaleet_s },
  kamera, aurinko, pyyhkaisy, tykit, kaiut, virta,
  ...(vaisto.length ? { vaisto } : {}),
  ...(savu ? { savu } : {}),
  efektit: v.efektit.map((e) => [e.efekti, e.s]),
};

const teksti = `/*
 * GENEROITU — älä muokkaa käsin: node tools/ajattelija-aikajana.mjs <sokrates-luvut-v13.json> ${ULOS}
 * Sokrateen v13-aikajana Linnanrakentajan Blender-luvuista (js/linssit/ajattelija.js aikajana-tila).
 */
export const SOKRATES_AIKAJANA = Object.freeze(${JSON.stringify(aikajana, null, 1)
  .replace(/\n\s+(-?[\d.]+,?)(?=\n)/g, ' $1')
  .replace(/\[\s+/g, '[').replace(/\s+\]/g, ']')});
`;
writeFileSync(ULOS, teksti);
console.log(`aikajana: ${kamera.length} kamera-avainta, ${aurinko.avaimet.length} aurinkoa, ${tykit.length} tykkiä, ${kaiut.length} kaikua → ${ULOS}`);
