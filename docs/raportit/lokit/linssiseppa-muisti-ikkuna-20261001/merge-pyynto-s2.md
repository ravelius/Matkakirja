MERGE-PYYNTÖ (Linssiseppä → Natiiviseppä): S2-erä = linssiseppa/iss-fotorealismi @ 683ce774 (31 commitia masterin päälle)

Sisältö
- Fotorealismi oletuksena koko pallolla (Päätoimittaja B): Kyytipino, Ilmakeha2 (2,5 kaikkialle), pilvivalo/-varjo, kuunvalo, Fresnel.
- Euroopan S2-mosaiikki kyydissä (Linssiseppä 2:n e9ac04c0 + 9901302c), S2Kaytossa = true, ämpäri s2-eurooppa/v1 (Karttaseppä 15.55).
- S2-sävy vain S2-alueella (tileset-varjostin _s2Savy 100/−10/1) ja pehmeä 1,5°:n reuna (_s2Reuna, sekoitusalikaavio paikka 2).
- Kerrosjärjestys s2 0:ssa; kuvaputki (päivätähdet 0, kaarivoima, KyydinAurinko); Ilmakeha2:n iltakuoren korjaus; kiillon A/B.
- Muistiraja (ehtosi): kevyt = KevytLaite tai ≤ 6144 Mt → z9, näyttövirhe 4, tekstuuri 1024, alitiilivälimuisti 8 Mt;
  pallon maximumCachedBytes 192/384 Mt S2:n ajaksi + palautus; lokirivi laiteluokasta. KarttaKerrokset.RasterinMuisti/PallonValimuisti.
Varjostindiffi (vain uudet slotit/ominaisuudet/solmut, rungot synkassa tee_tileset.py:n kanssa):
  tee_tileset.py 74 +-, MatkakirjaRasteri.shadersubgraph 554 +, MatkakirjaTileset.shadergraph 1168 + (git diff --stat master...683ce774)
Testit: Linssit 527/527, Kartta 413/413, Peli 362/362, unity-tarkistus 0 (ios + editori).
Todennus
- Simulaattori (NASA-vertailut, rajat, ämpäri): lokit/linssiseppa-s2esi-20261001-{c,d,e,f}-iphone, linssiseppa-vuorokausi-20261001-iphone (ämpäri-*).
- iPad 00008103 RELEASE 0026c766 (52ee883f + BUILD 100): fps 30 lukittu (S2 pois/päällä, 0 > 40 ms), muisti 1,80 → 2,28 Gt (+480 Mt),
  ylilento huippu 2,72 Gt; ui kuvat 212/300 Mt, Laattapalvelin ei karsintaa. lokit/linssiseppa-s2-ipad-20261001-b/YHTEENVETO.txt
- Kevyt (simulaattori iPhone 18 Pro, dee0d522, footprint, ABAB × 2): täysi S2 pois → päällä 1076 → 1215 (+139), 967 → 1190 (+223) Mt;
  pakotettu kevyt (z9, näyttövirhe 4, tekstuuri 1024, välimuisti 192 Mt, lokirivi todentaa) 1068 → 1177 (+109), 938 → 1158 (+220) Mt.
  Molemmat ≤ +250 Mt. Simulaattori ei laske GPU-tekstuureja kuten laite (iPad +480 Mt), joten kevyen ero näkyy laitteella paremmin;
  iPhonea 00008150 ei käytetty. lokit/linssiseppa-muisti-ikkuna-20261001/ajo.log
Huom: Kyytipino.asset.meta syntyy jokaisessa käännöksessä (Rakennus poistaa ja luo assetin) → ei puute. Ei UI-muutoksia (pohja: ei UI).
