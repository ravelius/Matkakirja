// Laskee viiden kaupungin sisältöluvut mainin datasta (SK 17.11.2026). Ajo repon juuresta:
//   node docs/raportit/viisi-kaupunkia-sisaltopuutteet-20261117-laske.mjs
// Vain luku; ei kirjoita mitään. Laskutapa: ks. viisi-kaupunkia-sisaltopuutteet-20261117.md kohta 3.
const R = new URL('../../js/packs/', import.meta.url);
const imp = (f) => import(new URL(f, R));
const [m, f, k, n, t] = await Promise.all(['maakartat.js', 'fokusvirrat.js', 'monumentit-eurooppa.js', 'nahtavyysjutut.js', 'tarinakaari.js'].map(imp));
const maa = { pariisi: 'FRA', lontoo: 'GBR', amsterdam: 'NLD', wien: 'AUT', rooma: 'ITA' };
const KADONNEET_MUUT = ['tuileries', 'bastilji', 'vanha-london-bridge'];
const tulos = {};
for (const c of Object.keys(maa)) {
  const kad = k.EUROOPAN_KADONNEET[maa[c]] || [];
  const nj = n.NAHTAVYYSJUTUT[c] || {};
  const fv = f.FOKUSVIRRAT[c];
  const rows = m.KAUPUNKIKARTAT[c].kohteet.map((o) => {
    const nostot = [].concat(o.nosto || []);
    const kadE = kad.find((e) => e.nimi === o.nimi || nostot.includes(e.id));
    const tyyppi = o.tarinapaikka ? 'tarina'
      : (kadE || nostot.some((x) => x.startsWith('hahmotelma-') || KADONNEET_MUUT.includes(x))) ? 'kadonnut' : 'nahtavyys';
    const j = nj[o.nimi] || Object.values(nj).find((e) => e && nostot.includes(e.nosto));
    const tn = (fv.takynostot || []).find((x) => nostot.some((y) => y === 'nosto-' + x.id || y === x.id));
    const ty = (fv.takyt || []).find((x) => nostot.some((y) => y === 'syvennys-' + c + '-' + x.id || y === x.id));
    const kuva = !!(j && j.kuvat && j.kuvat.length) || !!(kadE && (kadE.kuva || kadE.lahi)) || !!(tn && (tn.kuva || tn.valokuva)) || !!(ty && (ty.kuva || ty.valokuva));
    return { nimi: o.nimi, tyyppi, kuva, juttu: !!j };
  });
  const lkm = (x) => rows.filter((r) => r.tyyppi === x).length;
  tulos[c] = {
    kohteita: rows.length, nahtavyydet: lkm('nahtavyys'), tarinapaikat: lkm('tarina'), kadonneet: lkm('kadonnut'),
    kuvattomat: rows.filter((r) => !r.kuva).map((r) => `${r.nimi} [${r.tyyppi}]`),
    ilmanJuttua: rows.filter((r) => r.tyyppi !== 'tarina' && !r.juttu).map((r) => r.nimi),
    takynostoja: fv.takynostot.length, takynostoja_visalla: fv.takynostot.filter((x) => x.visa).length,
    kysymyksia: fv.takynostot.reduce((s, x) => s + (x.kysymykset || []).length, 0),
    takyt: fv.takyt.length, lehtitehtavat: fv.lehtitehtavat.length, kohtaaminen: !!t.TARINAKAARI[c].kohtaaminen,
    nahtavyysjuttuavaimia: Object.keys(nj).length,
  };
}
console.log(JSON.stringify(tulos, null, 1));
