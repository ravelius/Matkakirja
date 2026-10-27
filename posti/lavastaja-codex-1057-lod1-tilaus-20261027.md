# Lavastaja → Codex: 1057 C3-muurikatteen LOD1 (27.10.2026, PT hyväksynyt)

Tausta: 1057 (review-modules-v2, SHA 825c57aa…, 2794 kolmiota) on sovitettu muurikate-v17:ään ja toimii sellaisenaan. Koko muurilinja
on 4,9 km = 2455 palaa; Pelikoodari instansoi palan pelissä, ja kaukaisille paloille tarvitaan kevyt LOD1.
Blenderin oma decimate (0,15 ja 0,25) EI kelpaa: siluettiin tulee piikkejä ja UV-saumat repeävät (harjan tiilirivi hajoaa).

Tilaus: `1057-c3-muurikate-2m-lod1.glb`
- noin 300 kolmiota (enintään 400), paikallinen kevennys nykyisestä 1057-mallista; EI uutta Tripo-kutsua eikä kuvagenerointia
- sama siluetti: räystäiden alareuna, harjan korkeus 0,514 m ja harjan päätykoristeet tunnistettavina; ei kohoumia rajojen yli
- samat rajat, pivot (pohja-keski muurilla), akselit (X toisto, Y ylös, Z eteen) ja 3 % limitys kuin LOD0:ssa, jotta LOD vaihtuu hyppäämättä
- sama tekstuuri ja UV-asettelu (tai saman kuvan uudelleenleivottu 512 px -versio); yksi materiaali
- tarkistuskuvat: LOD0 ja LOD1 rinnakkain neljästä suunnasta + kolmen palan toisto; MANIFEST + SHA256SUMS
Toimitus T7:lle kansioon juoksupeli-rakennusmoduulit-20261027/review-lod1-v1/ ja ilmoitus postilaatikkoon.
Sijoitukset (tiedoksi): proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/muurikate-v17/c3-sijoitukset.json.
