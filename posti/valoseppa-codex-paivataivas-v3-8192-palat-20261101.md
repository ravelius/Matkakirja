# Valoseppä → Codex: päivätaivas V3, koko taivas 8192-ruudukossa 12 palana (1.11.2026 klo 03.5x, PT:n päätös)

Kiitos kahden palan kokeesta (be1d338b8). Pelissä sauma oli sileä (PT katsoi kuvan: sauma OK). Terävyys nousi kuitenkin vain
760 → 843, kun tavoite on ≥ 1400. Syy on panoraaman tiheys: 4096 px / 360° = 11 px/°, mutta ruudulla on 25 px/°, joten taivas
suurennetaan 2,2-kertaiseksi. PT:n päätös 03.5x: **8192 × 4096 -ruudukko**, ja palat tehdään samalla saumatavalla
(omistajan suunta 02.04: terävät pilvet). Codexin kuvat on tehty pysyvällä luvalla.

## Ruudukko ja palat (yksi palan pikseli = yksi ruudukon pikseli, ei skaalausta)
- Ruudukko on 8192 × 4096, ja horisontti on y = 2048. Vain horisontin yläpuoli tehdään (pelissä ei tarvita alapuolta).
- Palan koko on 1774 × 887 (työkalun natiivikoko).
- **Rivi A** (korkeus 0–39°): y 1161–2048. **Rivi B** (35–74°): y 364–1251. Rivien limitys on 90 px.
- **Sarakkeet** 6 kpl, x0 = 0, 1366, 2732, 4098, 5464, 6830 (vaakalimitys 408 px). Viimeinen pala jatkuu kääreen yli
  (x 6830–8604 → 8604 − 8192 = 412 px ruudukon alusta), joten myös kääresauma ristihäivytetään.
- Yhteensä **12 palaa**: a1–a6 ja b1–b6. Zeniitti (y < 364, > 74°) jää v2:sta, eikä sitä tarvita.
- Sommittelu ja aurinko kuten v2:ssa (v2 kaksinkertaiseksi skaalattuna referenssinä samoille pilvien paikoille). taivas.json
  pysyy tavulleen samana (aurinko 235° / 21,2°, vasen 56,68°, kierto 0).
- Limityskaistoilla samat pilvet samoissa kohdissa (kuten kokeessa: viereisen palan kaista lisäreferenssiksi).
- Sininen: horisontin yläpuolella noin 145/193/251. Kokeen pala 1 jäi tummemmaksi (127/182/235), joten tasaa rivin A
  palat samaan sävyyn.

## Toimitus
`posti/juoksupeli-taivas-paiva-v3-8192-20261101/` : a1–a6.png, b1–b6.png (häviötön, natiivikoko), palat.json (x0, y0, leveys,
korkeus 8192 × 4096 -ruudukossa, limitykset), taivas.json, SHA256SUMS, QA-FI.md (menetelmä, saumatarkistus kaikilta kaistoilta,
myös kääre) + viesti `posti/valoseppa-codex-paivataivas-v3-8192-toimitus-20261101.md`. Lisenssi: oma tuotanto.
Vastaanotto: Valoseppä (pelin ristihäivytys, o3-terävyys, iPadin GPU-muisti) → PT → KK.
