// Kierrosjärjestysten optimointi (Päätoimittaja / omistaja 8.10. 08.4x): pienin kokonaiskierto (yaw), sitten matka.
// Käyttää workerin omia funktioita (tools/pollo origin/mainista), joten "vanha" = tuotannon järjestys.
const P = process.argv[2];
const { kuvalista, kaupunginKohteet, LUKITTU_VAHINTAAN } = await import(P + '/opas-kuvat.js');
const { lyhinReitti, KIERROKSEN_PITUUS } = await import(P + '/opas.js');
const { oppaanEsittely, omatKohteet, esittelynAlku } = await import(P + '/opas-esittely.js');
const { OPAS_SALLITUT, pisteSallittu } = await import(P + '/sallitut.js');
const R = 6371000, rad = Math.PI / 180;
const km = (a, b) => { const dl = (b.lat - a.lat) * rad, dn = (b.lon - a.lon) * rad, x = Math.sin(dl / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)) / 1000; };
const suunta = (a, b) => { const f1 = a.lat * rad, f2 = b.lat * rad, dl = (b.lon - a.lon) * rad; return (Math.atan2(Math.sin(dl) * Math.cos(f2), Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl)) / rad + 360) % 360; };
const ero = (a, b) => { let d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const AVAUS_SUUNTA = 40;   // OpasSilmukka.Avauskuva
// Kamera katsoo kohdetta tulosuunnasta (+ vakio sivukulma), joten kierto = lentosuuntien muutokset (avauksesta 1. osuuteen ja osuuksien välillä).
function mittaa(alku, j) {
  let kierto = 0, matka = 0, ed = AVAUS_SUUNTA, p = alku;
  for (const k of j) { const s = suunta(p, k); kierto += ero(ed, s); ed = s; matka += km(p, k); p = k; }
  return { kierto, matka };
}
function* perm(a) { if (a.length <= 1) { yield a; return; } for (let i = 0; i < a.length; i++) for (const r of perm([...a.slice(0, i), ...a.slice(i + 1)])) yield [a[i], ...r]; }
const env = {};
const lista = await kuvalista(env);
const rivit = [];
for (const kaup of OPAS_SALLITUT.sallitut) {
  const nimi = kaup.nimi, keski = { lat: kaup.lat, lon: kaup.lon };
  let kohteet, vanha;
  const omat = omatKohteet(nimi, env);
  if (omat) { kohteet = omat.kohteet; vanha = (omat.kierros ?? kohteet.map((k) => k.id)).map((id) => kohteet.find((k) => k.id === id)).filter(Boolean); }
  else {
    const lukitut = kaupunginKohteet(lista, nimi).filter((k) => pisteSallittu(k, nimi, env));
    if (lukitut.length < LUKITTU_VAHINTAAN) continue;
    const valitut = lukitut.slice(0, KIERROKSEN_PITUUS);
    let alkuId = null; try { alkuId = esittelynAlku(await oppaanEsittely(env, nimi), nimi); } catch { }
    vanha = lyhinReitti(valitut, keski, { ensimmainen: valitut.find((k) => k.id === alkuId) ?? null });
  }
  if (!vanha || vanha.length < 3) continue;
  const v = mittaa(keski, vanha);
  let paras = null;
  for (const r of perm(vanha.slice(1))) {
    const j = [vanha[0], ...r], m = mittaa(keski, j);
    if (m.matka > v.matka * 1.3) continue;
    if (!paras || m.kierto < paras.m.kierto - 1e-6 || (Math.abs(m.kierto - paras.m.kierto) < 1e-6 && m.matka < paras.m.matka)) paras = { j, m };
  }
  rivit.push({ kaupunki: nimi, vanha: vanha.map((k) => k.nimi), uusi: paras.j.map((k) => k.nimi), uusiId: paras.j.map((k) => k.id),
    kiertoVanha: Math.round(v.kierto), kiertoUusi: Math.round(paras.m.kierto), matkaVanha: +v.matka.toFixed(1), matkaUusi: +paras.m.matka.toFixed(1), omat: Boolean(omat) });
}
console.log(JSON.stringify(rivit, null, 1));
