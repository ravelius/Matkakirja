# Valosepän luovutus 28.10.2026 klo 02.28 (konteksti 30 %)

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 27.10. 21.3x →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11` (luotu uudelleen 23.1x; Library tuotu). Kaksi haaraa, molemmat pushattu
natiivi-backupiin:
- **linssiseppa2/seinat-211** kärki **67afc1220** (kujakivet, juoksupeli)
- **linssiseppa2/esineet-metalli-213** kärki **8235bb8c7** (esineiden metalli, juna 213 13c59ec1f päällä) – p11 on nyt TÄSSÄ haarassa.
Parit: `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 01 05`.
Metal: `cd p11 && METAL_ETULIITE="Matkakirja/Linssit/DioraamaV" zsh tyokalut/metal-tarkistus.sh <scratchpad-kansio>` – ulos-kansio
scratchpadiin (Unity tyhjentää Temp/:n), etuliite EI koko varjostimen nimi (tyhjä tiedostonimi → pilkkoja ohittaa).

## Tehty 21.3x jälkeen
- **Taivas v2 ämpärissä** (JU 22.30) vientipaketista `_valmiit/juoksupeli-taivas-paiva-codex-v2-vienti-20261027`; NS: seinat-211
  1158e9df0 junassa 213 (runko ef70e678c). Tilapäiset juuret poistettu. Postivahdin levypyyntö: p11 poistettu (luotu myöhemmin uudelleen).
- **Kujakivet (Codexin 1191–1194, LR v86 / juuri-v93m):** LR:lle linja A (laji 0 -polku, JuoksuMaailma). Pari 231817: lattia L* 95
  lähes valkoinen (Codexin albedo lin Y ≈ 0,5 vs viritetyt ~0,25). **1fd0b8c16**: `_KujaKivi`-lippu (V4_kujakivi_*), sävy
  JuoksuKujaKiviSavy 0,52/0,49/0,45 ilman JuoksuMaaKivi/SeinaSavy (QA `valo savy kujakivi`). **67afc1220**: pystypinnat
  JuoksuKujaKiviPysty 0,60/0,58/0,66 (QA `valo savy kujakivipysty`). Pari 234322: lattia L* 68–70 (havainne 68–82), sokkeli 02/05
  45/48 (47/45), reunakiven etupinta 05 40 (43). METAL 440/0. REF 67afc1220 LR:lle KK-pariin.
- **Esineiden metalli (PT 00.xx; J4 hopea mattana, NS 01.0x):** 33acd68dd DioraamaGlb.MetalliKarheus (glTF-kertoimet; puuttuva metalli
  = 1 vain MR-kartan kanssa), SeikkailuEsineet _Metalli/_Karheus (ilman ORM-ASTC:tä kartan keskiarvo), DioraamaValaistu: heijastus +
  Blinn-Phong-kiilto vain kun _Metalli > 0; 58b84be09 kiilto luotaimen hallitsevasta suunnasta (DioraamaLuotainSuunta);
  8235bb8c7 luotaintilassa heijastus vain tasaosasta × 0,35 (LR 021342: usvainen). Testit 2214 (uusi GlbMetalliKarheus), METAL 70/0.
  LR:n glb (`_tyo/linnanrakentaja/olavinlinna-j4/j4_hopea.py`): albedo ~229, K 0,35.
- **KS:** lähikartan rinnevarjon häivytys (23016bffd → 925e647d2, 12,5 → 14) katsottu ja ok; KS vie NS:lle (13c59ec1f:ssä junassa).

## Kesken (seuraava Valoseppä)
1. **Kujakivet:** KK:n kuittaus LR:n parille (REF 67afc1220) → NS: seinat-211 1fd0b8c16 + 67afc1220 junaan 213 (METAL 440/0 ajettu).
   01:n sokkeli/reunakivi ennallaan (ei V4_kujakivi_* siinä palassa) – LR tarkistaa. Lattialla ei aurinko/varjo-jakoa = auringon suunta
   (aurinko 345/30 -ehdotus KK:lla), ei materiaali. Pilarit (_pilari_etu/_sivu) LR:n muurikatteessa – mittaa sävy, kun pari tulee.
2. **J4 hopea:** LR ajaa parin REF 8235bb8c7 → KK. Jos yhä litteä/usvainen: kerroin `tasa * 0.35` (DioraamaValaistu) tai karheus glb:ssä.
   KK:n jälkeen NS: esineet-metalli-213 junaan (puhdas 13c59ec1f:n päällä). Huom: metalli koskee kaikkia esineitä, joiden glb:ssä on
   MR-kartta ilman metallicFactoria (Tripo) → KK-parissa myös muu esine (esim. Pekingin tai koehuoneen rekvisiitta) tarkistukseen.
3. **LT iPad:** keski52-a taivas v2:lla, kun app sisältää junan 213.
4. p11 on esineet-metalli-213:ssa; kujakivityöhön `git switch linssiseppa2/seinat-211` (URP GlobalSettings -muutos Unitysta: checkout pois).
