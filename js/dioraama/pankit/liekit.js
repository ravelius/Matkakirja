// Dioraaman liekkipankki (erä 2, speksi docs/raportit/dioraama-rajapinnat-era2-20260929.md
// kohta 2 "LIEKIT"). Nimet ja arvot ovat sitovia sellaisenaan — rakennuskone
// (tools/dioraama/rakenna.mjs + tools/dioraama/media.mjs) ja rakennukset (mm.
// olavinlinna.js) viittaavat näihin id:llä tilan `liekit`-listan kautta:
// `{ liekki: '<id>', paikka: [x,y,z], koko: 1, vaihe: 0–1 }`.
//
// lahde = RGBA-atlaslähde suhteessa `assets/dioraama/` (Codexin piirtämä; puuttuessaan
// rakennuskone käyttää proseduraalista paikkamerkkiä, ks. tools/dioraama/liekki-paikkamerkit.mjs).
// ruutu = atlaksen yhden ruudun koko pikseleinä [leveys, korkeus], sarakkeet = ruutuja
// per rivi (ruudut voivat jatkua usealle riville, ks. rakennuskoneen atlaskoonti),
// ruudut = animaation ruutumäärä, fps = toistonopeus. koko_m = liekin maailmankoko
// metreinä [leveys, korkeus] billboardina, pivot = ankkuri [u-keskitys, y-alhaalta].
export const LIEKIT = {
  // KORJAUS 29.9.2026 (omistaja: "keltainen hehkupallo tulisijan päällä peittää hupun"): koko_m [0.42, 0.52]
  // (oli [1.1, 1.1]) -- yhdessä natiivin DioraamaLiekit.LuoLiekkiMesh-pienennyksen kanssa (era 2b, sama pvm)
  // tulisijan 3D-liekki päätyy noin 0,5 m korkeaksi (0,52 x 0,96 mesh-kerroin ~ 0,5) ja aiempaa kapeammaksi
  // (leveys < korkeus, toisin kuin ennen [1.1,1.1]). ATLAS-VARALLA sama koko_m (DioraamaLiekit.cs:n
  // alkukommentti) -- billboard pienenee/kapenee siis samalla, tarkoituksella.
  tulisija: {
    lahde: 'liekit/tulisija.png', ruutu: [256, 256], sarakkeet: 4, ruudut: 8, fps: 12,
    koko_m: [0.42, 0.52], pivot: [0.5, 0.06],
  },
  kynttila: {
    lahde: 'liekit/kynttila.png', ruutu: [64, 128], sarakkeet: 4, ruudut: 4, fps: 10,
    koko_m: [0.05, 0.1], pivot: [0.5, 0.1],
  },
  soihtu: {
    lahde: 'liekit/soihtu.png', ruutu: [128, 256], sarakkeet: 8, ruudut: 8, fps: 12,
    koko_m: [0.3, 0.6], pivot: [0.5, 0.08],
  },
};
