/*
 * KARTAN TIETOKORTIN FAKTAKAAVA (Sisältökirjuri, docs/tuotanto/reseptit/kartan-tietokortti.md osa 1; Raamattu 2.203).
 * Puhtaat muotoilufunktiot (ei verkkoa): laji Wikidatan luokasta (1.3), faktarivit lajeittain (1.4), luvut (1.5), vuodet (1.6)
 * ja alarivi "Laji · Maa" (1.7). Testit tests/tietokortti.test.mjs (reseptin 1.9 taulukko).
 */

const NBSP = ' ';

/** 1.3: [laji, ryhmä, Q-tunnukset] taulukon järjestyksessä; ensimmäinen osuma voittaa. */
export const LAJIT = [
  ['Pääkaupunki', 'asutus', ['Q5119']], ['Kaupunki', 'asutus', ['Q515', 'Q1549591']], ['Pikkukaupunki', 'asutus', ['Q3957']],
  ['Kylä', 'asutus', ['Q532']], ['Kunta', 'asutus', ['Q15284']], ['Asutus', 'asutus', ['Q486972']],
  ['Joki', 'joki', ['Q4022']], ['Järvi', 'vesi', ['Q23397']], ['Vesiputous', 'vesiputous', ['Q34038']], ['Meri', 'vesi', ['Q165']],
  ['Valtameri', 'vesi', ['Q9430']], ['Lahti', 'vesi', ['Q39594']], ['Salmi', 'vesi', ['Q37901']], ['Kanava', 'joki', ['Q12284']],
  ['Vesistö', 'vesi', ['Q15324']],
  ['Tulivuori', 'vuori', ['Q8072']], ['Vuori', 'vuori', ['Q8502']], ['Jäätikkö', 'vuori', ['Q35666']], ['Laakso', 'vuori', ['Q39816']],
  ['Aavikko', 'puisto', ['Q8514']], ['Saari', 'saari', ['Q23442']], ['Niemimaa', 'saari', ['Q34763']], ['Luola', 'puisto', ['Q35509']],
  ['Metsä', 'puisto', ['Q4421']], ['Kansallispuisto', 'puisto', ['Q46169']], ['Puisto', 'puisto', ['Q22698']],
  ['Puutarha', 'puisto', ['Q1107656']],
  ['Tuomiokirkko', 'rakennus', ['Q2977']], ['Kirkko', 'rakennus', ['Q16970']], ['Moskeija', 'rakennus', ['Q32815']],
  ['Temppeli', 'rakennus', ['Q44539']], ['Linna', 'rakennus', ['Q23413']], ['Palatsi', 'rakennus', ['Q16560']],
  ['Linnoitus', 'rakennus', ['Q57821']], ['Museo', 'rakennus', ['Q33506']], ['Teatteri', 'rakennus', ['Q24354']],
  ['Kirjasto', 'rakennus', ['Q7075']], ['Yliopisto', 'rakennus', ['Q3918']], ['Stadion', 'rakennus', ['Q483110']],
  ['Torni', 'torni', ['Q12518']], ['Majakka', 'rakennus', ['Q39715']], ['Rakennus', 'rakennus', ['Q41176']],
  ['Silta', 'silta', ['Q12280']], ['Tunneli', 'silta', ['Q44377']], ['Pato', 'silta', ['Q12323']],
  ['Rautatieasema', 'asema', ['Q55488']], ['Lentoasema', 'asema', ['Q1248784']], ['Satama', 'asema', ['Q44782']],
  ['Tori', 'tila', ['Q174782']], ['Katu', 'tila', ['Q79007']], ['Patsas', 'tila', ['Q179700']], ['Muistomerkki', 'tila', ['Q5003624']],
  ['Hautausmaa', 'tila', ['Q39614']],
  ['Maa', 'maa', ['Q6256']],
];
/** Kaikki taulukon Q-tunnukset (P279-ketjun haku pysähtyy osumaan). */
export const LAJI_QIDS = new Set(LAJIT.flatMap(([, , q]) => q));

/**
 * 1.3: laji P31-arvoista ja niiden P279-esivanhemmista (ylaluokat: Q → [esivanhemmat enintään 4 tasoa]).
 * Taulukon ylin osuma voittaa; ei osumaa → Paikka.
 */
export function laji(p31, ylaluokat = {}) {
  const kaikki = new Set();
  for (const q of p31 ?? []) { kaikki.add(q); for (const y of ylaluokat[q] ?? []) kaikki.add(y); }
  for (const [nimi, ryhma, qids] of LAJIT) if (qids.some((q) => kaikki.has(q))) return { nimi, ryhma };
  return { nimi: 'Paikka', ryhma: 'paikka' };
}

const tuhannet = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
const desimaali = (x, d) => x.toFixed(d).replace('.', ',');

/** Pyöristys merkitseviin numeroihin: { arvo, pyoristetty }. */
function merkitsevat(x, n) {
  if (!(x > 0)) return { arvo: x, pyoristetty: false };
  const k = 10 ** (Math.floor(Math.log10(x)) - n + 1);
  const arvo = Math.round(x / k) * k;
  return { arvo, pyoristetty: Math.abs(arvo - x) > 1e-9 };
}

/** 1.5 asukasluku: kaksi merkitsevää (≥ 1 000), miljoonat ja miljardit, vuosi suluissa. 0/puuttuva → null. */
export function asukasluku(maara, vuosi) {
  if (!(maara > 0)) return null;
  const v = vuosi ? ` (${vuosi})` : '';
  if (maara < 1000) return `${maara} asukas${maara === 1 ? '' : 'ta'}${v}`;
  const { arvo } = merkitsevat(maara, 2);
  if (arvo >= 1e9) return `noin ${desimaali(arvo / 1e9, arvo % 1e9 ? 1 : 0)} miljardia asukasta${v}`;
  if (arvo >= 1e6) return `noin ${desimaali(arvo / 1e6, arvo % 1e6 ? 1 : 0)} miljoonaa asukasta${v}`;
  return `${arvo === maara ? '' : 'noin '}${tuhannet(arvo)} asukasta${v}`;
}

/** Kolme merkitsevää, alle 10 yksi desimaali, "noin" kun pyöristetään. */
function kolmeMerkitsevaa(x, yksikko) {
  if (x < 10) {
    const r = Math.round(x * 10) / 10;
    return `${Math.abs(r - x) > 1e-9 ? 'noin ' : ''}${desimaali(r, r % 1 ? 1 : 0)}${NBSP}${yksikko}`;
  }
  const { arvo, pyoristetty } = merkitsevat(x, 3);
  const d = Math.max(0, 3 - String(Math.floor(arvo)).length);   // kolme merkitsevää: 38,8 / 105 / 1 230
  const teksti = d > 0 && arvo % 1 ? desimaali(arvo, d) : tuhannet(Math.round(arvo));
  return `${pyoristetty ? 'noin ' : ''}${teksti}${NBSP}${yksikko}`;
}

/** 1.5 pituus kilometreinä (alle 1 km metreinä). */
export function pituus(km) {
  if (!(km > 0)) return null;
  return km < 1 ? kolmeMerkitsevaa(km * 1000, 'm') : kolmeMerkitsevaa(km, 'km');
}
/** 1.5 pinta-ala neliökilometreinä (alle 1 km² hehtaareina). */
export function pintaAla(km2) {
  if (!(km2 > 0)) return null;
  return km2 < 1 ? kolmeMerkitsevaa(km2 * 100, 'hehtaaria') : kolmeMerkitsevaa(km2, 'km²');
}
/** 1.5 korkeus kokonaisina metreinä ilman "noin". */
export function korkeus(m) {
  if (!Number.isFinite(m) || m === 0) return null;
  return `${tuhannet(Math.round(m))}${NBSP}m`;
}
/** Syvyys (P4511) metreinä kuten pituus (kolme merkitsevää). */
const syvyys = (m) => (m > 0 ? kolmeMerkitsevaa(m, 'm') : null);

/** 1.6 vuosi Wikidatan ajasta ("+1889-00-00T…", tarkkuus): vuosi, vuosikymmen, vuosisata tai null. */
export function vuosi(aika, tarkkuus) {
  const m = /^([+-])(\d+)/.exec(aika ?? '');
  if (!m) return null;
  const eaa = m[1] === '-';
  const y = Number(m[2]);
  if (tarkkuus >= 9) return eaa ? `${y} eaa.` : String(y);
  if (tarkkuus === 8) return eaa ? null : `${Math.floor(y / 10) * 10}-luvulla`;
  if (tarkkuus === 7) {
    const s = Math.floor(y / 100) * 100;   // resepti 1.9: 1100 (tarkkuus 7) → 1100-luvulla
    if (s === 0) return null;   // "0-luvulla" ei ole suomea: rivi pois
    return `${s}-luvulla${eaa ? ' eaa.' : ''}`;
  }
  return null;
}

/** Wikidatan yksiköt → metrit / neliökilometrit (Wikidatan yksikön oma kerroin). */
const PITUUS_M = { Q11573: 1, Q828224: 1000, Q253276: 1609.344, Q3710: 0.3048, Q174728: 0.01, Q174789: 0.001 };
const ALA_KM2 = { Q712226: 1, Q25343: 1e-6, Q35852: 0.01, Q232291: 2.589988110336, Q81292: 0.004046856422 };

/** Lausuman suure: { maara, yksikko } (yksikkö Q-tunnuksena) tai null. */
function suure(e, p) {
  for (const c of e?.claims?.[p] ?? []) {
    const v = c?.mainsnak?.datavalue?.value;
    const m = Number(v?.amount);
    if (Number.isFinite(m)) return { maara: m, yksikko: String(v?.unit ?? '').split('/').pop() };
  }
  return null;
}
const metreina = (s) => (s && PITUUS_M[s.yksikko] ? s.maara * PITUUS_M[s.yksikko] : null);
const km2ina = (s) => (s && ALA_KM2[s.yksikko] ? s.maara * ALA_KM2[s.yksikko] : null);
const aika = (e, p) => {
  const v = e?.claims?.[p]?.[0]?.mainsnak?.datavalue?.value;
  return v ? vuosi(v.time, v.precision) : null;
};
const viitteet = (e, p) => (e?.claims?.[p] ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean);

/** 1.5 asukasluvun valinta: suositeltu ensin, muuten uusin P585, saman vuoden sisällä suurin. */
export function valitseAsukkaat(e) {
  let paras = null;
  for (const c of e?.claims?.P1082 ?? []) {
    const maara = Number(c?.mainsnak?.datavalue?.value?.amount);
    if (!(maara > 0)) continue;
    const v = /^\+(\d{4})/.exec(c?.qualifiers?.P585?.[0]?.datavalue?.value?.time ?? '')?.[1] ?? null;
    const x = { maara: Math.round(maara), vuosi: v, ensisijainen: c.rank === 'preferred' };
    const parempi = !paras || (x.ensisijainen && !paras.ensisijainen)
      || (x.ensisijainen === paras.ensisijainen && ((x.vuosi ?? '') > (paras.vuosi ?? '')
        || ((x.vuosi ?? '') === (paras.vuosi ?? '') && x.maara > paras.maara)));
    if (parempi) paras = x;
  }
  return paras;
}

/** Lajin rivien Wikidata-viitteet (nimet haetaan ennen kokoamista): kohteet, joiden nimiä rivit tarvitsevat. */
export function viitatut(e, ryhma) {
  const p = { joki: ['P885', 'P403'], vuori: ['P4552'], saari: ['P610'], rakennus: ['P84', 'P149'], torni: ['P84'], silta: ['P177'],
    tila: ['P84', 'P170'], maa: ['P36', 'P30'], asutus: ['P131'], puisto: ['P131'], paikka: ['P131'] }[ryhma] ?? [];
  return [...new Set(p.flatMap((x) => viitteet(e, x)))];
}

/**
 * 1.4 faktarivit "Otsikko: arvo" lajin ryhmälle (enintään viisi). nimi(q) = suomenkielinen nimi viitatulle kohteelle (1.7).
 * alue: P131-ketjun alin ei-maa-taso (kutsuja antaa nimen); pois, jos sama kuin maa.
 */
export function faktarivit(e, { nimi: lajiNimi, ryhma }, nimi = () => null, maa = null) {
  const r = [];
  const lisaa = (otsikko, arvo) => { if (arvo) r.push(`${otsikko}: ${arvo}`); };
  const ensim = (p) => viitteet(e, p).map(nimi).find(Boolean) ?? null;
  const kaksi = (p) => viitteet(e, p).map(nimi).filter(Boolean).slice(0, 2).join(', ') || null;
  const alue = () => { const a = ensim('P131'); return a && a !== maa ? a : null; };
  const as = valitseAsukkaat(e);
  switch (ryhma) {
    case 'asutus':
      if (as) r.push(asukasluku(as.maara, as.vuosi));   // resepti ae5f5e02e: asukasrivi ilman otsikkoa
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      lisaa('Korkeus merenpinnasta', korkeus(metreina(suure(e, 'P2044'))));
      lisaa('Perustettu', aika(e, 'P571'));
      lisaa('Alue', alue());
      break;
    case 'joki':
      lisaa('Pituus', pituus((metreina(suure(e, 'P2043')) ?? NaN) / 1000));
      lisaa('Alkulähde', ensim('P885'));
      lisaa('Laskupaikka', ensim('P403'));
      lisaa('Valuma-alue', pintaAla(km2ina(suure(e, 'P2053'))));
      break;
    case 'vesi':
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      lisaa('Suurin syvyys', syvyys(metreina(suure(e, 'P4511'))));
      lisaa('Korkeus merenpinnasta', korkeus(metreina(suure(e, 'P2044'))));
      break;
    case 'vuori':
      lisaa('Korkeus merenpinnasta', korkeus(metreina(suure(e, 'P2044'))));
      lisaa('Vuoristo', ensim('P4552'));
      if (lajiNimi === 'Jäätikkö' || lajiNimi === 'Laakso') lisaa('Pituus', pituus((metreina(suure(e, 'P2043')) ?? NaN) / 1000));
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      break;
    case 'saari':
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      lisaa('Korkein kohta', ensim('P610'));
      if (as) r.push(asukasluku(as.maara, as.vuosi));
      break;
    case 'vesiputous':
      lisaa('Korkeus', korkeus(metreina(suure(e, 'P2048'))));
      break;
    case 'rakennus':
      lisaa('Rakennettu', aika(e, 'P571'));
      lisaa('Avattu', aika(e, 'P1619'));
      lisaa('Arkkitehti', kaksi('P84'));
      lisaa('Tyyli', ensim('P149'));
      lisaa('Korkeus', korkeus(metreina(suure(e, 'P2048'))));
      break;
    case 'torni':
      lisaa('Korkeus', korkeus(metreina(suure(e, 'P2048'))));
      lisaa('Rakennettu', aika(e, 'P571'));
      lisaa('Arkkitehti', ensim('P84'));
      break;
    case 'silta':
      lisaa('Pituus', pituus((metreina(suure(e, 'P2043')) ?? NaN) / 1000));
      lisaa('Rakennettu', aika(e, 'P571'));
      if (lajiNimi === 'Silta') lisaa('Ylittää', ensim('P177'));
      break;
    case 'puisto':
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      lisaa('Perustettu', aika(e, 'P571'));
      lisaa('Alue', alue());
      break;
    case 'asema':
      lisaa('Avattu', aika(e, 'P1619'));
      break;
    case 'tila':
      lisaa(lajiNimi === 'Patsas' || lajiNimi === 'Muistomerkki' ? 'Paljastettu' : 'Rakennettu', aika(e, 'P571'));
      if (lajiNimi === 'Katu') lisaa('Pituus', pituus((metreina(suure(e, 'P2043')) ?? NaN) / 1000));
      lisaa(lajiNimi === 'Patsas' ? 'Taiteilija' : 'Arkkitehti', lajiNimi === 'Patsas' ? ensim('P170') : ensim('P84'));
      break;
    case 'maa':
      lisaa('Pääkaupunki', ensim('P36'));
      if (as) r.push(asukasluku(as.maara, as.vuosi));
      lisaa('Pinta-ala', pintaAla(km2ina(suure(e, 'P2046'))));
      lisaa('Maanosa', ensim('P30'));
      break;
    default:
      lisaa('Alue', alue());
  }
  return r.slice(0, 5);
}

/** 1.2/1.7 alarivi: "Laji · Maa", useita maita pilkulla (enintään kolme), yli kolme "useita maita", ei maata → pelkkä laji. */
export function alarivi(lajiNimi, maat) {
  const m = (maat ?? []).filter(Boolean);
  if (!m.length || lajiNimi === 'Maa') return lajiNimi;
  return `${lajiNimi} · ${m.length > 3 ? 'useita maita' : m.join(', ')}`;
}
