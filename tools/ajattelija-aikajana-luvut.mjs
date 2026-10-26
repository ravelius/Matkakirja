/*
 * AJATTELIJAN AIKAJANA BLENDERIN LUVUISTA kirjastona (tools/ajattelija-aikajana.mjs ja tools/ajattelija-natiivi.mjs).
 * Sama muunnos kuin ennen: Linnanrakentajan luvut (v13/v14) → aikajana-olio (kamera, aurinko, tykit, kaiut, virta, …).
 */
/**
 * @param {object} d luvut (sokrates_bysti.py --luvut)
 * @param {object} o asetukset: kaiut (ämpärikansio), savu (atlaksen polku), savuYdin, paalauseet ({tykki: avain}),
 *   lahdeNimi (lahde-kentän teksti), lahde (virheilmoituksiin)
 */
export function aikajanaLuvuista(d, { kaiut: KAIUT = 'ajattelijat/sokrates/v3', savu: SAVU = null, savuYdin: YDIN = 0.28,
  paalauseet: PAALAUSEET = {}, lahdeNimi = null, lahde = 'luvut' } = {}) {
  const v = d.v13;
  if (!v) throw new Error(`${lahde}: ei v13-aikajanaa`);
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
      paalause: PAALAUSEET[l.nimi.replace(/^tykki-/, '')] ?? l.nimi.replace(/^tykki-/, ''),
      paikka: pv(valo.sijainti), suunta: pv(valo.suunta), ala: valo.ala_m ?? alaKeilasta(valo.keila_aste),
      blend: valo.spot_blend ?? 0.45, energia: energia(valo), ...(valo.nauha_kork_m ? { korkeus: valo.nauha_kork_m } : {}),
      ...(l.kiintea ? { kiintea: true } : { vierii: [F(l.vierii_s[0]), F(l.vierii_s[1])] }),
      ...(valo.nauha_lev_m ? { leveys: valo.nauha_lev_m } : {}),   // v14b: kortin leveys (kiinteä lainaus otsalla)
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
  // Vahvuus: ytimen tummennus (Päätoimittaja 3.10.2026: noin 95 %); ydin = atlaksen tummin arvo (v4: 72/255, v5: 73/255).
  const savu = c.savu && SAVU ? {
    kuva: SAVU, ala: c.savu.ala_m, kesto: c.savu.kesto_s, fps: c.savu.fps, ruutuja: Math.round(c.savu.kesto_s * c.savu.fps),
    ydin: YDIN, vahvuus: 0.95,
  } : null;

  // v14: rakovalo (Blender AREA, suorakaide koko × koko_y, spread ~1°): kapea kaista (silmät); koko Blender-koodin arvoista,
  // jos luvuissa ei ole niitä (sokrates_bysti.py rako_avain).
  // v14b: rako.avaimet = [[ruutu, sijainti, suunta, energia, size, size_y, spread_aste], …] (paikka ja koko avaimittain).
  const rk = d.valot.rako;
  const rako = rk && (rk.avaimet ?? rk.energia_avaimet).some((x) => (rk.avaimet ? x[3] : x[1]) > 0) ? {
    ...(rk.avaimet
      ? { avaimet: rk.avaimet.map(([r, p, su, e, k, ky, sp]) => [r, pv(p), pv(su), e, [k, ky], sp]) }
      : { paikka: pv(rk.sijainti), suunta: pv(rk.suunta), energia: energia(rk), koko: rk.koko ?? [0.34, 0.014] }),
    ...(rk.vari ? { vari: pv(rk.vari) } : {}),
  } : null;
  // v14b: ympäristövalon kerroin avaimittain (0 = ei täytettä; silmä- ja partakuvat) ja näkymätön varjolevy (vain varjo).
  const ymparisto = d.v14?.ymparisto_voima_avaimet ?? null;
  const vl = d.v14?.varjolevy;
  const varjolevy = vl ? { keski: pv(vl.keski), koko: [vl.leveys_x_m, vl.syvyys_y_m], ruudut: vl.ruudut } : null;

  // v13b: tekstiprojektorien (tykki-*, virta-*) väri, jos viety (värittömässä tilassa 1/1/1); kaikilla sama.
  const tykkiVari = d.valot[v.lainaukset[0]?.nimi]?.vari;

  const aikajana = {
    versio: 'v13',
    lahde: lahdeNimi ?? lahde.split('/').pop(),
    loppu: v.loppu,
    kertoja: { alku: v.kertoja_alkaa_s, kappaleet: v.kappaleet_s },
    kamera, aurinko, pyyhkaisy, tykit, kaiut, virta,
    ...(vaisto.length ? { vaisto } : {}),
    ...(savu ? { savu } : {}),
    ...(tykkiVari ? { tykkiVari: pv(tykkiVari) } : {}),
    ...(rako ? { rako } : {}),
    ...(ymparisto ? { ymparisto } : {}),
    ...(varjolevy ? { varjolevy } : {}),
    efektit: v.efektit.map((e) => [e.efekti, e.s]),
  };


  return aikajana;
}
