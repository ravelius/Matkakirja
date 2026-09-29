// Dioraaman pintapankki (erä 1, speksi docs/raportit/dioraama-rajapinnat-20260929.md
// kohta 1; erä 2, speksi docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2
// "PINNAT" ja "UV"). Nimet ja arvot ovat sitovia sellaisenaan — rakennuskone (A1,
// tools/dioraama/rakenna.mjs) ja kaikki rakennukset (mm. olavinlinna.js)
// viittaavat näihin id:llä. Väri on baseColorFactorin pohja (leivotaan
// lineaariseksi rakennuskoneessa), toisto_m = tekstuurin toistoväli metreinä
// UV:n laskennassa (number → sama toisto molemmilla akseleilla, [u_m, v_m] →
// eri toisto per akseli). `lahde`: Codexin kuva suhteessa assets/dioraama/
// (puuttuva lähde EI ole virhe — rakennuskone käyttää paikkamerkkiä). `virtaus`
// (vain vesi): UV-siirtymä metriä/sekunti (u, v) pinnan animointiin natiivissa.
// metalli, kangas ja hiillos EIVÄT saa Codex-lähdettä vielä (paikkamerkki jatkuu).
export const PINNAT = {
  kivi: { vari: '#b8ad9c', toisto_m: 2.0, lahde: 'pinnat/kivi.jpg' },
  leikkaus: { vari: '#d9ceb8', toisto_m: [4, 1], lahde: 'pinnat/leikkaus.jpg' },
  rappaus: { vari: '#e7d7bd', toisto_m: 2.0, lahde: 'pinnat/rappaus.jpg' },
  lankku: { vari: '#caa678', toisto_m: 1.5, lahde: 'pinnat/lankku.jpg' },
  puu: { vari: '#8a6a48', toisto_m: 1.0, lahde: 'pinnat/puu.jpg' },
  katto: { vari: '#5c5652', toisto_m: 1.5, lahde: 'pinnat/katto.jpg' },
  tiili: { vari: '#9c7b6a', toisto_m: [4, 1], lahde: 'pinnat/tiili.jpg' },
  kallio: { vari: '#8f8a7e', toisto_m: 4.0, lahde: 'pinnat/kallio.jpg' },
  vesi: {
    vari: '#465e68', toisto_m: 8.0, lahde: 'pinnat/vesi.jpg', virtaus: [0.04, 0.015],
  },
  metalli: { vari: '#3d3a38', toisto_m: 0.5 },
  kangas: { vari: '#cdbf9e', toisto_m: 0.5 },
  hiillos: { vari: '#d38c41', toisto_m: 1.0, hehku: 1 },
};
