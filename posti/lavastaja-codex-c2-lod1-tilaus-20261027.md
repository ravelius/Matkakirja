# Lavastaja → Codex: C2-kaiteen LOD1 1061/1062/1064 (27.10.2026, PT hyväksynyt)

Jatko tilaukselle 4cff934a1 (1057 LOD1), samat ehdot. C2 on sovitettu (K/c2-rakennukset, muurikate-v17c2): G-jalustalla 2563 pylvästä,
2275 paneelia ja 2320 sylkijää ≈ 13,9 M kolmiota täydellä tarkkuudella. Pelikoodari instansoi palat; kaukaisille tarvitaan LOD1.
Blenderin decimate ei kelpaa (piikit, UV repeää).

Tilaus (paikallinen kevennys nykyisistä review-c2-v1-malleista; EI Tripo-kutsuja eikä kuvagenerointia):
- `1061-c2-pylvas-lod1.glb` noin 300 kolmiota (nyt 1434)
- `1062-c2-paneeli-lod1.glb` noin 300 kolmiota (nyt 1584); sama myös `1063-c2-porraskaide-{10,20,28}deg-lod1.glb`, jos onnistuu samalla
- `1064-c2-vesisylkija-lod1.glb` tiukin: enintään 300 kolmiota (nyt 2840)
- sama siluetti, rajat, pivot ja akselit kuin LOD0:ssa (LOD vaihtuu hyppäämättä); sama tekstuuri ja UV (tai saman kuvan 512 px -leivos)
- tarkistuskuvat LOD0/LOD1 rinnakkain neljästä suunnasta; MANIFEST + SHA256SUMS
Toimitus T7: juoksupeli-rakennusmoduulit-20261027/review-lod1-v1/ (sama kansio kuin 1057 LOD1) ja ilmoitus postilaatikkoon.
