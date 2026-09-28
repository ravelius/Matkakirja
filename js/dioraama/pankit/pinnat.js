// Dioraaman pintapankki (erä 1, speksi docs/raportit/dioraama-rajapinnat-20260929.md
// kohta 1). Nimet ja arvot ovat sitovia sellaisenaan — rakennuskone (A1,
// tools/dioraama/rakenna.mjs) ja kaikki rakennukset (mm. olavinlinna.js)
// viittaavat näihin id:llä. Väri on baseColorFactorin pohja (leivotaan
// lineaariseksi rakennuskoneessa), toisto_m = tekstuurin toistoväli metreinä
// UV:n laskennassa.
export const PINNAT = {
  kivi: { vari: '#b8ad9c', toisto_m: 2.0 },
  leikkaus: { vari: '#d9ceb8', toisto_m: 1.0 },
  rappaus: { vari: '#e7d7bd', toisto_m: 2.0 },
  lankku: { vari: '#caa678', toisto_m: 1.5 },
  puu: { vari: '#8a6a48', toisto_m: 1.0 },
  katto: { vari: '#5c5652', toisto_m: 1.5 },
  tiili: { vari: '#9c7b6a', toisto_m: 1.0 },
  kallio: { vari: '#8f8a7e', toisto_m: 4.0 },
  vesi: { vari: '#465e68', toisto_m: 8.0 },
  metalli: { vari: '#3d3a38', toisto_m: 0.5 },
  kangas: { vari: '#cdbf9e', toisto_m: 0.5 },
  hiillos: { vari: '#d38c41', toisto_m: 1.0, hehku: 1 },
};
