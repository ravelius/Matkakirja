# Natiivisepän luovutus 7.10.2026 (tilin 5 tunnin tauko 13.45–15.00)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005-iltapaiva.md (käytännöt voimassa).
Tarkempi lokirivistö: muisti natiiviseppa-tila-20261003.md (uusin rivi ylimpänä).

## TILA 9.10. 03.2x (UUSIN)
**BUILD 169 = 5b91b1a2c** (proto master; runko e9802f2d1 = d9c848fa0 + LS1 b92647d44 kohdekaari/kierto; simukäännös 2ee9aea8e 0 shader erroria;
app lokit/natiiviseppa-app-169-e9802f2d1). iOS TF 169 ajo 37864329025 (Julkaisija 03.21), muutosloki #4253. Mac TF -odottaja käynnissä (alaraja
00:21Z, loki lokit/natiiviseppa-mac-tf-169.log). juna/b13 → e9802f2d 03.21 (juna.log).
**JUNA 170 runko natiiviseppa/juna-170 3a3b47a63** (wt/proto-natiiviseppa-j170): BUILD 169 + Siirtoseppä 290f5d4ae + LS1 db9ad39ca + LS2 0a40a8165 +
8a23d6508 + NUI fcc8d81f7 (äänilähteet 54; konflikti 9b7bb7134-cherry-pickin takia → NUI:n versio, metro-kyltti säilyi) + filmi 8309c2f47; testit
453/419/1122, unity 0, tarkista 0. ODOTTAA: simukäännös (Julkaisijan NYT, varjostinehto), Siirtoseppä 778202265 (LS2:n muistitestin jälkeen), kuvaparit.
FILMI-kuvapari: käännös 2fa4e772e (03.20), ajo filmi-ajo.sh scratchpadissa → arkit lokit/filmi170-arkki-{tukholma,pariisi}-2fa4e772.png → PT.
JUNA 171 kärki: NUI a918d7e97 (⊇ a099ee0b5 ⊇ Siirtoseppä a8a454732 ⊇ 0b8999cc7 ⊇ 778202265).

## TILA 9.10. 03.0x
**JUNA 169 LOPULLINEN runko natiiviseppa/juna-169 d9c848fa0** = 71dbfba87 + Siirtoseppä 56fda7154 (kertoja vaikenee pelattavan palan aikana, ⊇ b8a0e4133)
+ NUI 9b7bb7134 cherry-pick (äänilähteet 51; jokiproomu ja laivan torvi soivat jo 169:n pallossa → nimeäminen samaan versioon); testit 453/419/1093,
unity 0, tarkista 0. LS1:n kierron lisäkorjaus → 170 (PT: ei odoteta). ODOTTAA: Julkaisijan KÄÄNNÖS NYT (LS2:n simu 02.57–~03.22) → simukäännös
→ BUILD 169 -merge masterin 6a67a9b19 päälle PT:n muutoslokilla (273 merkkiä, PT 9.10. 02.5x: "Olavinlinna aukeaa taas, kertoja ei puhu pelin päälle …
mikseri löytyy pallosta.") → SHA Julkaisijalle (TF sisäisille) → Mac TF -odottaja + juna/b13.
FILMI-170 **8309c2f47** (PT: ero liian hienovarainen → vahvistettu maltillisesti: varjot −0,16 viileämmät, keskisävyt −0,09, saturaatio −12, rae Medium4
0,45 vaste 0,5, vinjetti 0,24; Linssit 1090/1090). Kuvapari VAAKA + horisontti: skenaarioissa `linssi opas pysayta 1` + `linssi opas katse ylos 40`;
simu tallentaa vaakanäkymän pystyruudulle → `filmi-kuvapari.sh <app> <sha8>` kiertää kuvat ja kokoaa arkit (filmi-arkki.py) lokit/filmi170-arkki-<kaupunki>-<sha8>.png.
Käännös + simu pyydetty Julkaisijalta 169:n jälkeen. Sitten arkit PT:lle.
JUNA 170 kärjet: LS1 avaus-170 db9ad39ca, NUI 9b7bb7134 (⊇ 570917a6e), Siirtoseppä 290f5d4ae (⊇ 28c65e98e), LS2 laivat-170 0a40a8165 (⊇ fa5efa25c, e5edd5e60,
f50d2980e; varjostimet kääntyivät 84bd41d56) + omat-mallit-korkeus 8a23d6508 (ehto data), OMA filmi-170 8309c2f47, + LS1 kierron lisäkorjaus (tulossa).
JUNA 171 (PT kuittasi 03.1x): Siirtoseppä 0b8999cc7 (⊇ 778202265, Olavinlinnan alkuvalinta) + NUI natiivi-ui/olavinlinna-alku-171 f1a459e2f (valintakortit),
koeyhdistelmä 1102/1102. 778202265 junaan 170 vasta LS2:n muistitestin jälkeen (Siirtoseppä ilmoittaa).

## TILA 9.10. 02.5x
**JUNA 169 runko natiiviseppa/juna-169 71dbfba87** (+ LS1 kierros-169 a3ad152f5 ⊇ avaus/sumennus, NUI b58981d4a cherry-pick); testit 453/419/1093,
simukäännös 6657f002d 02.52 0 shader erroria (app lokit/natiiviseppa-app-169-71dbfba87). ODOTTAA: PT:n muutosloki → BUILD 169 -merge masterin 6a67a9b19
päälle → SHA Julkaisijalle; takaraja 06.30 (herätys 06.25). TF aamulla.
FILMI-170 441d17a94: kuvapari OK (terävyys säilyy, tummennus) → PT:lle lähetetty (lokit/todistus-filmi170-{tukholma-…0240,pariisi-…0242}/kuvat).
JUNA 170 kärjet lisäksi: NUI 570917a6e, Siirtoseppä 28c65e98e, LS2 omat-mallit-korkeus 8a23d6508 (ehto data), LS2 laivat-170 (lopullinen tulossa).

## TILA 9.10. 02.2x
JUNA 169 runko natiiviseppa/juna-169 **0f76ca59a** (+ Siirtoseppä b8a0e4133 avainsanat ⊇ 7b8b4353f); testit 453/419/1088, tarkista 0; LS2: linna OK
käännöksellä cc69414f (saapuminen 26,5 s). Odottaa LS1:n lopullista SHA:ta, TAKARAJA 06.30 (herätys 06.25).
JUNA 170 kärjet: Siirtoseppä e65d19131 (⊇ 817eb1f3e), NUI b3bb7a460 (⊇ c247d7872), LS1 avaus-170 db9ad39ca, LS2 laivat-170 4b6f0d820 (+ pilvi-SHA tulossa),
OMA filmi-170 **441d17a94** (DoF POIS: sumensi koko kuvan). Filmi-kuvapari: 1. ajo komennot väärin (`komento opas` → oikein `linssi opas`), 2. ajo paljasti
DoF-vian → UUSINTA ~03.20 Julkaisijan vuorolla: KÄÄNNÖS NYT filmi-170 (LS2:n käännöksen ja simun väliin), sitten SIMU A2A6FEF2 →
`zsh proto-3d/tyokalut/natiiviseppa-ajot/filmi-kuvapari.sh` (APP-polku ja --sha päivitettävä uuteen käännökseen) → tarkista kuvat (ennen ≠ jälkeen, terävyys ei romahda) → PT:lle.
Skenaariot proto-3d/tyokalut/natiiviseppa-ajot/sk-filmi170-{tukholma,pariisi}.txt.

## TILA 9.10. 02.0x
JUNA 169 runko natiiviseppa/juna-169 **6f193cd9d** (+ Siirtoseppä 7b8b4353f, NUI 351657a2c metro-kyltti ⊇ 2e519d7a7); simukäännös 42d7035ab 01.40 0 shader
erroria (6f193cd9d = + NUI, vain C#); testit 453/419/1088. LUKITUS: LS1:n lopullinen 169-SHA (⊇ sumennus-169 8aef6a2ff) tai TAKARAJA 06.30 (herätys
06.25) ilman sitä; muutosloki PT:ltä; TF aamulla. LS2 vahvisti linnan avautuvan (saapuminen 26,5 s).
JUNA 170 (kootaan 169:n jälkeen): LS1 avaus-170 db9ad39ca (⊇ kompassi-glb-170 94a9410e4 ⊇ muotokorostus ⊇ kompassi), NUI c247d7872 (⊇ 552b2b52b ⊇ 501cd4c71
⊇ 179086094), LS2 laivat-170 4b6f0d820 (+ lopullinen pilvi-SHA tulossa; ehto varjostimet), Siirtoseppä juna170 2124ddf2f (⊇ 7b8b4353f), OMA filmi-170
916a367cb (elokuvamainen jälkikäsittely, OMISTAJA HYVÄKSYI; kuvapari skenaariot proto-3d/tyokalut/natiiviseppa-ajot/sk-filmi170-{tukholma,pariisi}.txt,
käännös + iPad13-simu pyydetty Julkaisijalta). Ehdot: KaupunkiYovalot + LS2-varjostimet kääntyvät; kuvaparit päivä/yö PT:lle.

## TILA 9.10. 01.3x
JUNA 169 runko natiiviseppa/juna-169 **a38cb271a** (+ NUI 2e519d7a7 ⊇ 6b087ec39 ⊇ 9649b22b8, + LS1 avaus-169 42f2ec5b2 välivaihe); testit 453/419/1088
(Linssit-satunnaishylkäys kerran, uusinta läpi), tarkista 0. EI LUKITA vielä: odottaa LS1:n lopullista 169-SHA:ta (⊇ sumennus-169 8aef6a2ff;
siltalauseet, kohdekaari, kierto, siirtymä, Concorde, kuvanoston kytkentä) ja Siirtoseppä 7cb1335bc (v45t/v45u, testiluvut Siirtosepältä).
TAKARAJA 06.30 (herätys ajastettu 06.25): lukitse silloin ilman myöhästyneitä (→ 170). Simukäännös, kun LS2:n simu vapautuu (Julkaisija ilmoittaa).
Muutosloki PT:ltä lukituksessa. Seuraava 8K-lisäys → uusi UltraAtlaksetMt (LS2 mittaa).

## TILA 9.10. 01.0x
BUILD 168 6a67a9b19: iOS TF 37847901354, Mac TF käynnistetty 00.51, junavahti T7 4/4 00.50.
**JUNA 169 = natiiviseppa/juna-169 45ac381fd** (PT KUITTASI): BUILD 168 + Siirtoseppä 1b43eb127 + juna169 0d8de8b8a (v45s 8K+POM, TAA, tuulet, hahmolaskuri)
+ LS1 13f809ad1 + ajallinen-169 734ec0ba5 + NUI c6fbfead6 (⊇ a6748a855 ⊇ 01698c19b liput/julisteet, pallon Mikseri) + 3bad314c0 + budjetti-169 9747db7f4;
testit 453/419/1083, unity 0, tarkista 0; simukäännös b0d4bce23 01.01 0 shader erroria (app lokit/natiiviseppa-app-169-45ac381fd).
EI LUKITA ennen LS1:n TF 168 -korjausta (Pariisin esittelyn alku, siirtymien kiihdytys). TF aamulla omistajan TF 168 -palautteen jälkeen.
JUNA 170: LS1 kompassi-glb-170 94a9410e4 (⊇ muotokorostus 429f9d68b ⊇ kompassi 04b5cbc94; ehdot: KaupunkiYovalot kääntyy + kuvaparit päivä/yö).

## TILA 9.10. 00.5x
TF 168 käynnissä 6a67a9b1:stä (iOS 37847901354, 21:35Z; muutosloki #4240 = 268 merkin teksti), Mac-odottaja päällä, juna/b13 = 4d13b1e3.
**JUNA 169 git-runko = natiiviseppa/juna-169 f9c826a1d** (wt/proto-natiiviseppa-j169; BUILD 168 6a67a9b19 + Siirtoseppä 1b43eb127 (latauslaskuri, ASTC-tuki)
+ juna169 1630e8ef1 (v45s, dioraama-TAA ⊇ 95577f871) + LS1 13f809ad1 (ylöskatse) + ajallinen-169 df7c7d41a (kaupunki-TAA oletus pois) + NUI 311bb35ac
(kooste-UI) + budjetti-169 9747db7f4 (UltraAtlaksetMt 300, LS2 kuittasi)) — ei ristiriitoja; TESTIT + simukäännös vasta TF 168 -käännöksen jälkeen.
Muutosloki 169: mainitse "Olavinlinna avautuu varmemmin" + ylöskatse. Kuvapari Ajallinen pois/päällä (LS1 sk-ajallinen169.txt) junan 169 käännöksestä.

## TILA 9.10. 00.4x
**BUILD 168 = proto master 6a67a9b19273488b811e530272b8be27d6ffae79** (runko natiiviseppa/juna-168 4d13b1e3e = 7f0dcae51 + Siirtoseppä d4c3bf1f4 (v45r)
+ LS1 pallo-168 9f6ac8bfe + tf167-168 6265a62ac + NUI 901b20232 + LS2 989685f09 + kaupunki-sse; simukäännös 6a67a9b19 00.35 0 shader erroria,
app lokit/natiiviseppa-app-168-4d13b1e3e; muutosloki 268 PT:n). Julkaisijalle lähetetty; AVOINNA: iOS-alkuaika → Mac-odottaja, juna/b13 51b873a2 → 4d13b1e3.
JUNA 169: natiiviseppa/budjetti-169 9747db7f4 (UltraAtlaksetMt 300, LS2 mittaus), Siirtoseppä juna169 1630e8ef1 (v45s + TAA-dioraama), LS1 ajallinen-169
df7c7d41a (kaupunki-TAA oletus pois + ylöskatsekorjaus), NUI kaupunkikooste 311bb35ac; LS1 katuliikenne-170 7c479ff82 odottaa PT:tä.

## TILA 9.10. 00.0x
BUILD 167 7f0dcae51: iOS TF 37837955397, Mac TF 37840129681 (23.31), junavahti asensi 3 T7-simuun 23.30 (3622D89D ohitettu, LT:n video).
**JUNA 168 RUNKO = natiiviseppa/juna-168 f3fea94b5** (wt/proto-natiiviseppa-j168) = 7f0dcae51 + Siirtoseppä a8e1c0b12 (⊇ kaupunki-sse 1b755328f) +
LS1 pallo-168 9f6ac8bfe + NUI fa18d88de + LS2 911f772d8; testit 452/419/1081, unity 0, tarkista 0; simukäännös 7e2269a18 00.03 0 shader erroria
(app lokit/natiiviseppa-app-168-f3fea94b5). Odottaa PT:n kuittausta + muutoslokia → BUILD 168 -merge masterin 7f0dcae51 päälle.
JUNA 169 ehdokkaat: Siirtoseppä 56e65053c (⊇ ajallinen 95577f871, dioraama-TAA), LS1 680efb22d (kaupunki-TAA, oletus pois; kuvaparin skenaario
proto-3d/tyokalut/linssiseppa-ajot/sk-ajallinen169.txt), NUI 93bf5d6fa (kooste-UI ⊇ pohjavahti 84f67b536); yhdistyvät 168:aan.

## TILA 8.10. 23.2x
**LOPULLINEN BUILD 167 = proto master 7f0dcae51785f0b5b924288976d8853f4e68e843** (runko 51b873a22 = C 02405da71 + Siirtoseppä dbb374284 repliikit-v4
+ LS1 aanimaisema-167 a84f1d97e + NUI 95ab08f29; käännös 32197b326 23.12; app lokit/natiiviseppa-app-167c-51b873a22). Aiemmat BUILD 167 -mergit
680acf3eb ja 4cd403df1 jäivät historiaan (TF 37834556090 peruttiin). TF 167 37837955397 (20:14Z), Mac-odottaja käynnissä, juna/b13 = 51b873a2.
JUNA 168: natiiviseppa/kaupunki-sse 1b755328f (SSE+välimuisti ccdf86105 KUITATTU ehdoin + pinnat 150/70 + UltraAtlaksetMt 135; c30631fed:n päällä
→ yhdistä BUILD 167:ään), NUI fa18d88de (⊇ 37540261e), LS1 korostus-168/pallo-168, Siirtoseppä juna168-v45o 2406bf795, LS1 2cdb87923.
JUNA 169: ajallinen-169 95577f871 (TAA; kuittaus pyydetty; dioraama Siirtoseppä, kaupunki estyy kamerapinoon → LS1), NUI 84f67b536.

## TILA 8.10. 22.5x
**BUILD 167 = proto master 680acf3eb4be7f1b131ab2b29304d63fd531b203** (runko C natiiviseppa/juna-167-c 02405da71, käännös d625c7cf8 22.43, 0 shader
erroria; app lokit/natiiviseppa-app-167c-02405da71; muutosloki 278 merkkiä PT:n hyväksymä, Julkaisijalla). AVOINNA: iOS TF 167 alkuaika → Mac TF
-odottaja (`mac-tf-odottaja.sh 680acf3e 167 <alku>`), juna/b13 0c786156 → 02405da71 Julkaisijan luvalla + juna.log.
JUNA 168: kaupunki-sse ccdf86105 (KUITATTU, ehdot LS1 tahdistus + LS2 muisti + TF 168 -loki), NUI 37540261e (kuvakkeet + isoisä 1873), LS1 lapipeluu
cdd0e711e on jo 167:ssä. JUNA 169: NUI 35c3c5312 → 3e6560f4c (pohjavahti 11, ehto #4236). Worktreet: j144 (A), j167b (B), j167c (C), g169, sse.

## JUNA 167 = RUNKO C 8.10. 21.3x ( omistaja: "julkaistaan kun valmis", "viivytä junaa jotta kaikki ehtii")
natiiviseppa/juna-167-c **c30631fed** (wt/proto-natiiviseppa-j167c) = B 46bb3721d + Siirtoseppä 4447fbfe7 (⊇ 7f14020fb ⊇ ab25fd73f ⊇ historia-m
5330ca53f; v45n) + c4c3018ba (Ultra + budjetti) + NUI a9cffd2a0, fecc37c10, c60be8514 (thief-hud) + LS1 376d59705 (kupu) + cdd0e711e + LS2
ab8b8a06e (ilmakehä/vesi, ODbL) + Pelikoodari cd3f3c770 + e49be4764 (LS1 katselmoi). OpasSovitin-kommenttiristiriita → LS1:n versio.
POIS: LS1 d8e4f69e6 (tuplaluokka Kehityskaupungit; LS1 hylkäsi). Simukäännös 2384e555f 21.31 0 shader erroria (app lokit/natiiviseppa-app-167c-2384e555f).
LOPULLINEN LUKITUS 23.00 (herätys ajastettu): uudet testatut kärjet → testit → simukäännös → muutosloki PT:lle 23.10 → BUILD-merge
(`git merge --no-ff <C> -m "BUILD 167 (TF 1.1 (167)): …"` masterissa, master nyt bdd0e8c5) → SHA Julkaisijalle + Laitetestaajalle (.app) →
juna/b13 → C (Julkaisijan luvalla) → Mac TF -odottaja. Muutosloki C hyväksytty 275 merkkiä (päivitettävä uusilla asioilla).

## JUNALISTAT 8.10. 20.4x
- JUNA 167 = RUNKO B natiiviseppa/juna-167-ik **46bb3721d** (+ Siirtoseppä 2b4d59890 aanet-fp-v3); A cd20157b1 varalla. Lukitus 21.30, käännös 22.00.
- JUNA 168: LS1 dbc488776 + cdd0e711e (⊇ juna-167-ik d9ca9d63c); NUI 4758e5316 (EHTO Siirtoseppä c15eb5b8a) → NUI f0b94520e (harmaat pallot,
  ⊇ 4758e5316, KUITATTU); NUI a9cffd2a0 (äänilähteet) odottaa kuittausta + Pelikoodarin NC-korjaus samaan junaan.
- JUNA 169: grafiikka-169 c4c3018ba (KUITATTU) + Siirtoseppä grafiikka-169 f09dc4728; NUI fecc37c10 (äänilähteet ⊇ 1f12fee65 harmaat ⊇ 346435604
  terävä ⊇ e56225d0b pohjavahti 9; EHTO web-PR #4225 mainissa) — jos #4225 puuttuu: NUI e9c9de7a3 (pohjavahti 6, ehto täyttyi #4223).
  LS2 odottaa BUILD 169 -SHA:ta (muistitestin viittaus LinnaMuistibudjettiin).
- JUNA 170: LS1 pallo-grafiikka-170 fa4ec528a; pallon laattojen SSE/välimuisti budjetista; STP/TAA.

## TILA 8.10. 19.4x

**JUNA 167 = RUNKO B** (Päätoimittaja 19.3x): natiiviseppa/juna-167-ik **d9ca9d63c** (wt/proto-natiiviseppa-j167b) = runko A 3c6377160 + Siirtoseppä
final-ik-167 71d34bb97 (Final IK + Grounder, Peli-testien unity-tarkistus kääntää firstpassin); testit 448/419/1018, unity 0, tarkista 0.
Runko A = natiiviseppa/juna-167 3c6377160 (wt/proto-natiiviseppa-j144) = BUILD 166 + Siirtoseppä 96b04efb3 + LS1 7df28c8c4 + NUI 896d6b823 (⊇ eaedca9c5,
24372c44d) + ce9d0c4d5 (burst) + e70e9a65e. KÄÄNNÖS 22.00 (Julkaisijan NYT varattu) muutosloki B:llä (273 merkkiä, PT hyväksyi). B kaatuu
IL2CPP/RootMotion → käännä A kysymättä. 21.15 asti kuittaukset molempiin (tyojonot.md JUNA 167). Herätys 21.25 ajastettu.
RUNKO B nyt 58ca707ab (+ LS1 mikseri-167 2c157e79d); runko A cd20157b1.
JUNA 169 (omistaja 19.5x grafiikka + muisti; KUITATTU c4c3018ba = budjetit LS2:n mittauksen mukaan): proto natiiviseppa/grafiikka-169 c4c3018ba (ennen c40e6228c) (wt/proto-natiiviseppa-g169) =
Ultra 773372d34 (Ultra_RPAsset/Renderer, Laitetaso/Laatutaso, kuumana MSAA pois) + linnan muistibudjetti c0558d09c/c40e6228c (LinnaMuisti,
Ydin LinnaMuistibudjetti, Mac ennallaan). Siirtoseppä siirtoseppa/grafiikka-169 f09dc4728 ⊇ tämä (valot, KuvaSkaala, Forward+-silmukka).
NUI e9c9de7a3 (pohjavahti 6, ⊇ defbce8e8/eef13ea8e; EHTO web-PR #4222 + #4223 mainissa) junaan 169. LS1 pallo-grafiikka-170 fa4ec528a (⊇ e8d98f0f8, VariKuvanTarve) junaan 170.
VANHA SISÄINEN SIMUSARJA POISTETTU (omistaja 8.10. ilta) → vain T7-sarja; skriptit ilman simusarja.sh:ta saavat "Invalid device". Jono 169/170: pallon laattojen SSE/välimuisti
budjetista, STP/TAA (vs. MSAA). LS1 pallo-grafiikka-170 c0ab01481 (väreily tapa (a)).
JUNA 168 -ehdokkaat: NUI 4758e5316 (⊇ 0426a8f26; EHTO Siirtosepän c15eb5b8a samaan junaan) + NUI pohjavahti-168c b62e2569d.

## TILA 8.10. 17.3x

**BUILD 166 = proto master bdd0e8c5fbad51b8028b0637e2f417e246d94884** (runko natiiviseppa/juna-166 0c7861567 = 8adddd2c + Siirtoseppä 0d5c33250
+ LS1 d3b9f48e8 + NUI a7953991e; käännös 93e99b966 17.22; omistajan pyynnöstä aikaistettu, yön juna peruttu; muutosloki 203 merkkiä).
VALMIS 17.3x: juna/b13 = 0c786156, T7-asennus 17.33, iOS TF 166 37791987373, Mac TF 166 workflow 37793591409 (seuraa).
JUNA 167: NUI 24372c44d (Olavinlinnan latauskuva, KUITATTU). Jonon kohta 3 (mono-segv-juurikorjaus): proto-3d/tyokalut/burst-jit.sh (testattu)
→ KUITATTU proto natiiviseppa/burst-jit-pois 9a98cd437 + README ce9d0c4d5 (junaan 167), ELÄVÄNÄ 17.4x proto-kaanna.sh + mac-kaanna.sh
(varmuuskopio proto-kaanna.sh.ennen-burst-20261008); TF-workflow'n Unity-vienti Julkaisijalle kerrottu. Segv-uusinta (Native Crash Reporting) jo elävänä.
Worktreet: vain wt/proto-natiiviseppa-j144 jäljellä.

## TILA 8.10. 09.5x

**BUILD 164 VALMIS**: iOS TF 164 (37736834965) + Mac TF 164 (37738691540) ladattu; junavahti asensi 164:n 4 T7-simuun 09.41 (ensimmäinen
T7-junaasennus OK; 09.27 satunnainen Unity mono-segv, uusinta onnistui). mac-tf.sh käyttää nyt proto-3d/tyokalut/mac-kaanna.sh (master-kopio).
**BUILD 165 = proto master 8adddd2c376fca44fc69eb58f106417b3a57b7d6** (runko natiiviseppa/juna-165 8c35a7cf6 = df24a24d + Siirtoseppä becd20404
+ NUI cf66d208, 0484007f, 39d43932, 9417aa6a + LS1 ee3b7207b; käännös 868821345 09.50; app lokit/natiiviseppa-app-165-8c35a7cf6; muutosloki
Julkaisijalla). VALMIS 10.07: iOS TF 165 (37740538758) + Mac TF 165 (37741564392) ladattu, juna/b13 = 8c35a7cf, T7-asennus OK.
JUNA 166 -ehdokkaat (PT:n lista auki, runkoa ei vielä): Siirtoseppä historia-valot 0d5c33250 (v44z 1499), LS1 juna-166 67f6eaab5 (⊇ 4d62e0675); tulossa LS1 latauskuvan kytkentä + ukkosen äänet.

## TILA 8.10. 07.4x

**T7-TYÖKALUVAIHTO VALMIS JA TODENNETTU** (Päätoimittaja hyväksyi). Elävät: proto-3d/tyokalut/simusarja.sh (kääre: `source … || exit 2`
→ `xcrun simctl` → --set T7, vanha sisäinen UDID → samannimisen T7-laitteen UDID; `simusarja.sh simctl|udid|lista|luo`),
proto-kaanna.sh, juna-ajo.sh (junavahdin 4 laitetta T7:ltä), siivoa-pariteettisimut.sh (varmuuskopiot *.ennen-t7-20261008).
Proto-haara natiiviseppa/t7-simusarja 77a806aa7 (todistusajo, sarja.sh, simkosketus deviceSetWithPath/MK_SIMSET, aja.sh, savukkeet,
palvelu-kopio). Todennus Julkaisijan vuorolla: lokit/natiiviseppa-t7-todennus/t7-tyokalut-20261008.png. Roolien ohje Postivahdille.
Avoinna: MCP-simutyökalu näkee vain sisäisen sarjan; vanhojen sarjojen poisto omistajan Run-rivillä päivän käytön jälkeen.

**BUILD 164 = proto master df24a24d63e953c2edb189d6cbd280a62950afae** (runko f5c5f0ed3 = esirunko + LS1 e9207b4cc; käännös a129f4d80
KÄÄNNETTY 09.13; app lokit/natiiviseppa-app-164-f5c5f0ed3; muutosloki a8d599d4 mergetty). SEURAAVAKSI: (1) Julkaisija ajaa iOS TF 164
LS1:n videon jälkeen ~09.30 → lähettää ajon alkuajan → `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV'
proto-3d/lokit/natiiviseppa-skriptit/mac-tf-odottaja.sh df24a24d 164 <alku UTC>` (Julkaisijan lupa 09.2x); (2) kun Julkaisija ilmoittaa
LS1-simun vapaaksi: `git update-ref refs/heads/juna/b13 f5c5f0ed3… d78cd0e00…` + juna.log-rivi → junavahti asentaa 4 T7-simuun.

**JUNA 165 (ilta, iltapäivän työt; NUI:n mukaan Päätoimittaja kuittasi 08.0x):** NUI metro-kaksirivi 0484007f2 (⊇ 69e0b05ae) +
NUI kasittely-veto cf66d2088 (⊇ 24d40fb9c, KUITATTU NUI:n mukaan; uusi Ydin/Seikkailu/KasittelyVeto.cs; Siirtosepän kytkentä historia-valot 10294000f erillisenä SHA:na) + NUI latauskuva 39d43932a (⊇ 7d366ce92; LATAUSKUVA-pohja, LatausLiike.cs, tyylikirja #4188; KUITATTU NUI:n mukaan); molemmat yhdistyvät
juna-164:ään ilman ristiriitoja. JUNA 164 AIKAISTUI AAMUPÄIVÄÄN (Päätoimittaja 08.0x): esirunko ae7523be8 (+ Siirtoseppä ebd86fc24 ⊇ da5fdf62a, + T7 nohup-korjaus 09cdc7680,
+ kansio-.metat Vefects/VolumetricLights); odottaa LS1 611ea1781 -kuittausta → Julkaisijan NYT → käännös → TF sisäisille.

**JUNA 164 = ILLAN JUNA** (Päätoimittaja 07.4x): ESIRUNKO natiiviseppa/juna-164 **29817f360** (myöh. + NUI 67727816f, b529268aa, 69e0b05ae ⊇ 8b4659e98, 7d366ce92 tyylikirja-pariteetti — kaikki KUITATTU; tyylikirjan ristiriita ratkaistu 7d366ce92:n generoiduilla; testit 448/419/882, unity 0); alkuperäinen b85458f10 (wt/proto-natiiviseppa-j144) = 062bb439 +
Siirtoseppä välikärki 844b24ac1 + NUI f25875292 (⊇ 8aa55e02) + 8b4659e98 + LS2 08a6891a0 + 7d66739d0 + 77a806aa7; testit 448/419/882,
unity 0, ei ristiriitoja. EI KÄÄNNETÄ ennen Siirtosepän Olavinlinna-palan kuittausta (iltapäivä; lopullinen kärki korvaa 844b:n).
LS1 eec1a9283 lisätään vasta Päätoimittajan videokatselmuksen jälkeen (koeyhdistelmä ok, Linssit 885).

## ALOITUS TILINVAIHDON JÄLKEEN (7.10. ilta) — LUE TÄMÄ ENSIN

Olet Natiiviseppä (Opus, high). Lue tämä osio, MEMORY.md (erit. testaus-kevyemmin-20261007, mac-gui-automaatio-omistajan-naytolla)
ja natiiviseppa-tila-20261003.md. Kytke Remote Control päälle. Kerro Julkaisijalle ja PÄÄTOIMITTAJALLE, että olet paikalla.
Juna-SHA:t vain PÄÄTOIMITTAJAN kuittauksella; käännökset Julkaisijan NYT-viestillä. EI savua/Laitetestaajaa/stillejä ennen junaa
(omistaja 15.5x), EI roolien omia käännöksiä (16.0x), enintään 2 junaa/pv ellei omistaja pyydä.

**TF 163 + MAC TF 163 LADATTU 23.06/23.15 (iOS 37678690889, Mac 37679671606; BUILD 163 = 062bb439).** Seuraavaksi T7-simusarja (kohta 7),
sitten juna 164 BUILD 163:n päälle (kohta 6).

**KORJAUSJUNA TÄNÄ ILTANA (Päätoimittaja 22.1x)** — VIE-VALMISTELU TEHTY 22.56: BUILD 163 = proto master 062bb439af8764e00edcafb9f6acac78e085c215
(runko d78cd0e00 = 79462cbae + LS1 d3d243595 avaustauko 2,3 s; käännös c0c4d9de5, app lokit/natiiviseppa-app-163-d78cd0e0;
juna/b13 → d78cd0e0; aiemmat BUILD 163 -mergit ecb11b78 ja 9457e8da jäivät historiaan, ei julkaistu). PÄÄTOIMITTAJA KIRJOITTAA
tf163-luvan itse LS1:n lukijamittauksen jälkeen. Mac TF 163 -odottaja käynnissä (mac-tf-odottaja.sh 062bb439 163 2026-10-07T19:57:16Z, irrotettu, 2 h). tf163-lupa VASTA Päätoimittajan kuittauksella (LS1:n reittitarkistus), sitten Mac TF -odottaja
(ALKU = kuittaushetki UTC). Alla historia: haara natiiviseppa/korjausjuna-163 (wt/proto-natiiviseppa-j144) BUILD 162 30fbc374:n
päällä: Siirtoseppä 0bfc86e0 + LS1 71cf7b97b (KUITATTU) + LS1 4e35edbde (avausnäkymä) + LS2 2739ded66 (kaupunkipallot maailmanäkymässä) = runko **2739ded66** (Kartta 448, Peli 419,
Linssit 862, unity 0), KÄÄNNETTY 22.37 (dd94a2766, app lokit/natiiviseppa-app-163-2739ded6; aiemmat 5a99dda77/a69df1186 ja EI julkaista aiempaa 40faaf311/bc66ba1e2,
app lokit/natiiviseppa-app-163-40faaf31; vaiheajat luo 23 s, vienti 44 s, xcodebuild 95 s -jobs 12). LS1 ottaa kuvat → Päätoimittajan
kuittaus → VIE (juna/b13 f524d89b → 2739ded6, BUILD 163 -merge 30fbc374:n päälle) → BUILD 163 -SHA tiedostoon /Users/Shared/Claude/julkaisija-tyokalut/tf163-lupa (Julkaisija vahvisti) → Mac TF:
`perl … lokit/natiiviseppa-skriptit/mac-tf-odottaja.sh <sha8> 163 <VIE-hetki UTC ISO>` (irrotettu). Muutosloki #4175 mergetty.
Ulkoinen ryhmä EI saa 163:a ennen omistajan kuittausta (Julkaisija hoitaa).
HUOM numerointi: korjausjuna = BUILD 163; aiemmin "juna 163":ksi suunniteltu kokoonpano = JUNA 164 huomenna (Päätoimittaja).

**JUNA 162 VALMIS: BUILD 162 = proto master 30fbc3748a19e96b369d1ae82617d181b019b570; iOS TF 162 (37669475818) ja Mac TF 162
(37671078899, build 162) LADATTU ~22.04.** (juna/b13 c076765c → f524d89ba, juna.log
kirjattu; käännös 6059542ee; tf162-lupa kirjoitettu → Julkaisijan odottaja käynnisti iOS TF 162:n, ajo 18:47Z käynnissä).
Mac TF 162: irrotettu odottaja lokit/natiiviseppa-skriptit/mac-tf-162-odottaja.sh käynnistää mac-tf.sh 30fbc374 162, kun iOS TF onnistuu;
tila lokit/natiiviseppa-mac-tf-vahti.txt + gh run list proto3d-mac-testflight. Tarkista tulos ja ilmoita Julkaisijalle + Päätoimittajalle.
LS1 e3d40e096 (kuvatekstin piirtojärjestys; ⊇ 0d53b5567) → JUNA 163.

**JUNA 162 TÄNÄÄN (omistaja: "tee tänään yksi päivitys klo 22")** — runko natiiviseppa/juna-162-koe **31249f1c4** (wt/proto-natiiviseppa-j144),
HYVÄKSYTTY (Päätoimittaja 16.2x + 16.4x) = BUILD 161 9572eaff + LS1 b9f37ee8f + NUI 3f07c49b + NUI 34cf54b0 + LS2 f6e4a8495 + Siirtoseppä
ef6b092d (⊇ 78e56088) + LS1 alkulento-v3-korjaus 19dcb1d15 + Siirtoseppä historia-juna163 2d19eb49 (⊇ ee0084ee; E2 heitto + E3 kappeli, Päätoimittaja 18.0x). + NUI seikkailu-toiminto f9f48082 (toimintonappi + löytö) + LS1 alkulento-ääni b11f5e253 (18.0x) + NUI seikkailu-tietokerros cbc92a25 + Siirtoseppä historia-juna164 6d2b1149 (⊇ 1e48174e ⊇ ad6ebba6 ⊇ 2d19eb49; E3 LR v44i -mallit, tietokerros, kaatumiskorjaus, Foggin nousu laiturille; 18.5x) + LS2 E3-nousu d75b33031 (18.2x) + LS1 äänetön esitys 7568a39bc (18.4x, omistaja: kuumailmapallo valmiiksi) + LS1 kori-pehmea 18d854a13 (⊇ kori-vahvempi 42597b009; uusi kerros 18 vapaa, tarkistettu; 19.1x). Testit 447/419/856, unity 0, kaikilla .cs:llä .meta. Testit 447/419/842, tarkista, unity iOS/Mac 0, editori ok. Testit 447/419/835, unity iOS/Mac 0. Tarkista ensin, onko jokin vaihe jo tehty (`git -C proto-3d/Matkakirja-proto
log -1 master`, `tail -3 proto-3d/lokit/kaannospalvelu/juna.log`, `tail -5 proto-3d/lokit/natiiviseppa-mac-tf-vahti.txt`).
1. 21.15 runko lukittu → muutoslokin SISÄLTÖLISTA Julkaisijalle heti: apurahakortti v7 kuvineen + Valmiit linssit -nappi (9 linssiä
   ilman kehittäjätilaa); kuumailmapallon latauskuva kaupunkiin siirryttäessä; kuumailmapallon kaupunkiesitys: yksityiskohtakuvat kerronnan aikana ja äänetön esitys (teksti chatissa) 31 kaupunkiin; korin keinunta, vastaliike ja äänet vahvemmiksi, kori ja köydet pehmeämmiksi; ISS-kyydin Euroopan satelliittikuva vuodenajan mukaan
   (syksy); aloituslento: ei yöpuolta, kone näkyy heti, pehmeä kameran aloitus, lentoääni ilman nykäystä; kehittäjävalikkoon "Olavinlinna – pelattava pala (kokeilu)" laiturilta kappeliin (Fogg, vene, kävely, vartijat, heitto, kappeli, Pulun tietokortit, lopun drone-nousu; puhelimen ohjaustapit ja toimintonappi).
2. Lukko vapaa 21.10 alkaen: `cd proto-3d && PROTO_APP_KOPIO=lokit/natiiviseppa-app-162-13c1c026 zsh tyokalut/proto-kaanna.sh 31249f1c4` (app-kopio …-162-31249f1c)
   (EI savua). Tulos KÄÄNNETTY → "lukko vapaa" Julkaisijalle.
3. VIE (Päätoimittaja hyväksyi): `git update-ref refs/heads/juna/b13 31249f1c4… c076765c4…` (täydet SHA:t, tarkista nykyinen
   juna/b13 = c076765c) + juna.log-rivi (malli edelliset natiiviseppa-rivit), proto-masterissa `git merge --no-ff juna/b13 -m "BUILD 162
   (TF 1.1 (162)): merge juna/b13 31249f1c BUILD 161:n masterin 9572eaff päälle"` + Co-Authored-By, `git diff --quiet 31249f1c4 HEAD`.
4. Täysi BUILD 162 -SHA Julkaisijalle + Päätoimittajalle. Julkaisija ajaa TF 162:n.
5. Mac TF 162 (lupa annettu): iOS-latauksen jälkeen `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV'
   proto-3d/lokit/natiiviseppa-skriptit/mac-tf.sh <BUILD162-sha8> 162`, tulos mac-tf-vahti.txt + gh run list proto3d-mac-testflight.
6. JUNA 164 (LS1:n kokonaishaara linssiseppa/juna-164 4020d4b59 simukäännetty 23.28 → 08188463f, app lokit/natiiviseppa-app-164koe-4020d4b5;
   HUOM 4020d4b59 EI ole BUILD 163:n päällä → pyydetty LS1:ltä yhdistämään 062bb439; + Päätoimittaja 23.0x: LS1 kortti-teksti 7c4122bc9 (⊇ d3d243595; tekijärivi pois, KuvaLahteet) + NUI opas-lahteet
   8b4659e9 (⊇ 48878725; Päätoimittaja vahvisti 8b4659e9); ent. "163"; huomenna 8.10.; LS1-osuus jo korjausjunassa 163 (71cf7b97b ⊇ e5c4b145e, 578d1186c), KUITATTU Päätoimittaja 20.0x–21.5x; POHJA BUILD 162 30fbc374; LS1 lappu-katolle 6ad4244fc POIS):
   LISÄKSI: LS1 kortti-teksti e5c4b145e (⊇ ee5f54a81 ⊇ e3d40e096 + cbd2b6abc; liikkeen palautus; uusi KorttiAsettelu.cs + .meta) ja Natiiviseppä kaannos-jobs 7d66739d.
   Siirtoseppä historia-valot-juna b91278bf (⊇ 463fefc7 ⊇ 2d1c133e ⊇ e4dab248 ⊇ 787f0092 ⊇ 6d23aed1; kuoren leikkaukset 16 paikkaan; kehittäjävalikon Volumetriset valot PÄÄLLÄ/POIS + Candle VFX + Volumetric Lights 2 laatutasokytkimen takana, Asset Store -paketit ENSIMMÄISTÄ KERTAA junassa; jos käännös kaatuu pakettien takia → varahaara historia-fp-juna-2 8b071c07 (⊇ 6f9ad1e5 ⊇ 9cddc246, korvaa 6d23aed1) viivyttämättä + yksi rivi Päätoimittajalle) +
   NUI-kärki seikkailu-kuvakkeet 8aa55e02 (⊇ jatka 6af3eb9f ⊇ tekstivahti ⊇ verbi ⊇ fp eb115fc3 ⊇ tietokerros cbc92a25) + LS1 äänetön
   esitys 578d1186c (korvaa 7568a39bc) + LS2 S2-kevät 08a6891a0. Pohja: BUILD 162 -master. Ajankohta sovitaan Julkaisijan kanssa.
   Muut ehdokkaat (eivät kuitattuja tähän): LS1 yksityiskohdat-haarat sisältyvät 578d1186c:hen.
7. T7-SIMULAATTORISARJA (omistaja 23.0x, valmis 8.10. ennen ensimmäistä junaa, ALOITA vasta TF 163:n jälkeen): uusi laitesarja
   "/Volumes/T7 4TB/Simulaattorit/Sarja" (EI vanhan 112 Gt:n Devices-kopion päälle; symlinkki ei toimi); roolien laitteet samoilla nimillä,
   UDID-taulu + MK_SIMSET + funktio simctl (xcrun simctl --set) tiedostoon proto-3d/tyokalut/simusarja.sh; proto-kaanna.sh, aja.sh,
   todistusajo.sh, simkosketus ja roolien skriptit käyttämään sitä (roolikohtainen ohje Postivahdin kautta); T7 puuttuu → selvä virhe,
   EI hiljaista paluuta sisäiselle; todennus: yksi käännös asennettuna + kuvakaappaus T7-sarjasta; vanhojen sarjojen (105 + 112 Gt)
   poisto vasta omistajan Run-rivillä päivän toimivuuden jälkeen.
   VALMISTELTU 23.0x: proto-3d/tyokalut/simusarja.sh (MK_SIMSET, simctl, mk_udid; `zsh simusarja.sh luo` luo laitteet T7-sarjaan
   ja kirjoittaa simusarja-udid.tsv) + simusarja-laitteet-sisainen-20261007.tsv (26 laitetta: nimi, tyyppi, runtime, vanha UDID). EI VIELÄ
   AJETTU.
   23.16 TULOS: `zsh simusarja.sh luo` EPÄONNISTUI kaikilla 26:lla — CoreSimulatorService (koodaus) ei saa kirjoittaa T7:lle (CoreSimulator.log
   NSCocoaErrorDomain 513 "You don’t have permission to save the file … in the folder Sarja"; POSIX-oikeudet ok → macOS-tietosuoja).
   Tarvitaan OMISTAJAN asetus: Täysi levyn käyttöoikeus CoreSimulatorService.xpc:lle (Päätoimittajalle kerrottu), sitten CoreSimulatorService
   uudelleen ja luo uudelleen. Sarja tyhjä, ei jäänteitä; simusarja.sh hylkää nyt virhetekstit (vain UDID kelpaa). Työkaluja EI vaihdettu
   (Päätoimittaja: vaihto, todennus ja roolien ohje 8.10. aamulla ennen junaa 164).
   23.28 KORJATTU: omistaja antoi CoreSimulatorService.xpc:lle täyden levyn käyttöoikeuden, palvelu käynnistetty uudelleen → KAIKKI 26 LAITETTA
   LUOTU T7-sarjaan, UDID-taulu proto-3d/tyokalut/simusarja-udid.tsv (natiiviseppa-iPhone = CDA479DE-8554-450B-B75B-A4B56EFF122A).
   23.30 TODENNUSYRITYS: `simctl boot` T7-sarjan natiiviseppa-iPhone (CDA479DE…) KAATUI: "Failed to start launchd_sim: could not bind to
   session" (NSPOSIXErrorDomain 60). SYY LÖYTYI 23.4x: macOS kysyi "SimulatorTrampoline.xpc haluaa käyttää irrotettavan taltion
   tiedostoja" (omistaja ei saanut napsautettua; pyytäjä pid 72602 suljettu) → omistajalle ohje: Täysi levyn käyttöoikeus myös
   /Library/Developer/PrivateFrameworks/CoreSimulator.framework/Versions/A/XPCServices/SimulatorTrampoline.xpc (koodaus-käyttäjällä),
   sitten boot-todennus uudelleen. 23.5x TODENNETTU: omistaja lisäsi SimulatorTrampoline.xpc:n FDA-listaan, palvelut uudelleen →
   T7:n natiiviseppa-iPhone BOOT OK, 164koe asennettu ja käynnistetty, kuvakaappaus lokit/natiiviseppa-t7-todennus/t7-164koe.png
   (aloitusnäkymä), sammutettu. Seuraavaksi pelkkä työkaluvaihto (ja MCP-simulaattorityökalun/Simulator.app:n sarjakysymys). Aiempi teksti: (mahdollisesti Simulator.app/launchd_sim vs. ulkoinen levy tai
   palvelun tila uudelleenkäynnistyksen jälkeen; kokeile ensin oletussarjan simun boot, sitten T7). Lisäksi ratkaistava: MCP-simulaattorityökalu
   ja Simulator.app näkevät vain oletussarjan (oikeat napautukset!). Työkaluja EI muutettu (kaikki vanhassa sarjassa, yhtenäinen tila).
   Inventaario: proto-3d/tyokalut/proto-kaanna.sh, Matkakirja-proto/aja.sh, tyokalut/palvelu/{proto-kaanna,siivoa-pariteettisimut}.sh,
   tyokalut/todistusajo/{sarja,todistusajo}.sh + 234 lokit/*-skriptit (kiinteät UDID:t) + junavahti (asentaa 1572C658/3B4CDACB/C1D5E34C/993F8873).
   Seuraavaksi (8.10. aamulla): työkalut (proto-kaanna.sh SIMS-UDID:t, aja.sh, todistusajo.sh, simkosketus, roolien skriptit) → todennus.
   T7: /Volumes/T7 4TB, 1,5 Ti vapaana.
8. KÄÄNNÖSNOPEUTUS (omistaja 21.5x): proto-kaanna.sh muutettu (jobs 12 joutilaana, välitiedostot säilyvät >36 Gi, vaiheajat; varmuuskopio
   .ennen-jobs12-20261007); proto natiiviseppa/kaannos-jobs 7d66739d (aja.sh) → JUNAAN 163; Matkakirja-haara natiiviseppa/tf-jobs 93c2e7c76
   (wt/natiiviseppa-tf-jobs) → push + PR Julkaisijalle, KUN TF 162 on valmis (KUITATTU). Huomenna ensimmäisen käännöksen vaiheajat
   ennen/jälkeen yhdellä rivillä Päätoimittajalle (ennen: 7.10. junakäännökset kesto lokit/kaannospalvelu/*.log alku–KÄÄNNETTY, esim. 21:43→21:46).
9. Muut: PR ravelius/Matkakirja#4149 (mono_crash) Julkaisijalle; Mac-ohjauslevyvika: odota omistajan Player.log (DIAGNOOSI-rivit).

## OMISTAJAN PÄÄTÖS 15.5x (SITOVA): TESTAUS KEVYEMMIN
Ennen junaa/TF:ää vain automaattiset testit (Kartta/Peli/Linssit-testit, tarkista.sh zsh, unity-tarkistus iOS+Mac, editori) ja
käännös. EI savua, EI Laitetestaajaa, EI stillejä, EI iPad-mittauksia, EI toistoja ennen korjausta. Juna 1–2/pv, kun valmista on.
Muisti testaus-kevyemmin-20261007.

## JUNA 162 TÄNÄÄN (omistaja 16.1x: "tee tänään yksi päivitys klo 22"): runko nyt **13c1c0269** (+ Siirtoseppä ef6b092d ⊇ a7adab9f ⊇ 78e56088, v44g-peili palalle; Päätoimittajalta pyydetty hyväksyntä ef6b092d:lle; testit 447/419/835, unity 0). Aiempi **3bc7680c1** (= baaa24445 + NUI 34cf54b0, KUITATTU).
Siirtoseppä 78e56088 KUITATTU → hän yhdistää 3bc7680c1:n ja ratkaisee LinssiOhjain.cs:n, SHA viimeistään 21.00.
21.15 runko lukittu → muutoslokin SISÄLTÖLISTA Julkaisijalle heti (hän tekee PR:n ennen SHA:ta) → testit → ~21.25 proto-kaanna
(lukko vapaa 21.10 alkaen) → VIE ilman savua → update-ref juna/b13 c076765c → <runko> + juna.log → BUILD 162 master-merge →
täysi SHA Julkaisijalle + Päätoimittajalle ~21.35 → Mac TF: `perl … lokit/natiiviseppa-skriptit/mac-tf.sh <sha8> 162` iOS-latauksen jälkeen.

## TILA 16.0x: JUNA 162 -RUNKO natiiviseppa/juna-162-koe **baaa24445** (wt/proto-natiiviseppa-j144) = BUILD 161 9572eaff + LS1 b9f37ee8f +
NUI 3f07c49b + LS2 f6e4a8495 + Siirtoseppä a5cd9d81 (kaikki Päätoimittajan kuittaamia 16.1x). Testit 447/419/835, tarkista, unity
iOS/Mac/App Store 0, editori ok (lokit/natiiviseppa-juna162-testit.txt).
- Omistaja: enintään 2 junaa/pv, MUTTA Julkaisijan mukaan TF 162 tänään klo 22 (omistajan pyyntö): lukko vapaana 21.10 alkaen, runko
  lukitaan ~21.15 → testit → proto-kaanna (EI savua) → VIE/AVAUS → BUILD 162 master-merge → SHA + muutoslokin sisältölista Julkaisijalle →
  Mac TF 162 heti iOS-latauksen jälkeen (lupa annettu; lokit/natiiviseppa-skriptit/mac-tf-161.sh mallina, vaihda SHA/build 162).
- Odottaa Päätoimittajan vahvistusta: Siirtoseppä 78e56088 (⊇ a5cd9d81, E1; KONFLIKTI LinssiOhjain.cs → Siirtoseppä ratkaisee
  yhdistämällä baaa24445:n) + NUI seikkailu-tapit 34cf54b0 (puhdas).

## TILA 16.1x: TF 161 + MAC TF 161 LADATTU (iOS 37623777958, Mac 37624780571; fi.matkakirja.peli build 161 = 9572eaff).
Omistaja 16.0x: roolit eivät tee omia käännöksiä; täysi käännös vain junalle (minä) ja TF:lle (Julkaisija).
JUNA 162 -ehdokkaat: LS1 pallo-latauskuva **b9f37ee8f** (korvaa cc6176356, LS1:n mukaan kuitattu), NUI apuraha-kuvat **3f07c49b** (korvaa 5e45d1da; NUI:n mukaan kuitattu, ⊇ kehittaja-tf),
LS2 s2-kaudet f6e4a8495 (LS2:n mukaan kuitattu) — pyydetty Päätoimittajalta yhden rivin vahvistus. Kokoa BUILD 161 9572eaff:n päälle
(wt/proto-natiiviseppa-j144, uusi haara natiiviseppa/juna-162-koe), aja automaattiset testit, yksi käännös, VIE.
Worktree proto-natiiviseppa-ohjauslevy poistettu (mergetty); proto-natiiviseppa-kirjoitus jäi (cherry-pickatut commitit).

## TILA 16.0x: iOS TF 161 ladattu 15.56 (37623777958). Mac TF 161 -ketju (mac-tf-161.sh) käynnissä setsid, jonottaa lukkoa.
PR ravelius/Matkakirja#4149 (mono_crash talteen) Julkaisijalle. Juna 162 -ehdokkaat: LS1 cc6176356, NUI 5e45d1da (kuittaus?),
LS2 f6e4a8495 (varmista).

## TILA 15.4x: BUILD 161 = proto master **9572eaff** (juna/b13 2309f55d → c076765c, juna.log kirjattu). Julkaisija: muutosloki-PR + TF 161;
Mac TF 161 Julkaisijan luvalla iOS-latauksen jälkeen: `MATKAKIRJA_APPSTORE=1 MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli zsh
wt/proto-natiiviseppa-mac/tyokalut/mac-kaanna.sh 9572eaff 1.1 161` → ditto lokit/natiiviseppa-mac-tf-161-9572eaff → gh workflow run
proto3d-mac-testflight.yml -f app_polku=… -f versio=1.1 -f build=161 -f lataa=true (malli: lokit/natiiviseppa-skriptit/mac-tf-160-ja-lepo.sh).

## TILA 15.2x (myöhempi): JUNA 161 VALMIS VIE-PÄÄTÖKSEEN

- VIE-EHDOT (Päätoimittaja 15.3x): Laitetestaajan rutiini OK JA LS2 todentaa pallojen klikkauksen junan koekäännöksellä 68429b27b
  (simkosketus Ateena + Kreeta, iPhone + iPad, still + lokirivi). Mac-savu TF:n jälkeen tai omistaja itse.
- Runko **c076765c4**, koekäännös 68429b27b (app lokit/natiiviseppa-app-161koe-c076765c), loppusavu OK 15.19 (stillit
  lokit/natiiviseppa-savu161-juna/, 0 poikkeusta, kirjoitusääni 16 lyöntiä). Odottaa: Laitetestaajan rutiini → Päätoimittajan VIE →
  Julkaisijan JUNAN AVAUS NYT → `git update-ref refs/heads/juna/b13 c076765c4 2309f55d…` (tarkista nykyinen juna/b13!) + juna.log,
  BUILD 161 master-merge d8b0e0fc:n päälle, SHA Julkaisijalle (hän tekee muutosloki-PR:n), Mac TF 161 Julkaisijan luvalla
  (mac-kaanna <BUILD 161 master> 1.1 161, APPSTORE=1, kopio lokit/natiiviseppa-mac-tf-161-<sha>, gh workflow run lataa=true).
- Junaan 162: LS1 pallo-latauskuva cc6176356, NUI apuraha-kuvat 5e45d1da (odottaa kuittausta), LS2 s2-kaudet f6e4a8495 (LS2:n mukaan
  Päätoimittaja kuittasi 15.4x — varmista Päätoimittajalta kokoamisessa).

## TILA 15.3x

- **JUNA 161 -RUNKO c076765c4** (= 012faf6b6 + LS2 2d8da858f pallojen klikkaus + ui hiiri; testit 419/833, unity 0). Aiempi: **012faf6b6** (Päätoimittaja vahvisti 15.1x NUI 89d98b7e + Siirtoseppä 49888505, korvaa 227529f3; EI apuraha-kuvat
  5e45d1da → 162). Testit 447/419/833, tarkista, unity iOS/Mac 0, editori ok. KÄÄNNÖS NYT + SIMULAATTORI NYT pyydetty Julkaisijalta.
  LS2 pallojen klikkaus ja LS1:n kuitattavat vain jos ehtivät ennen koekäännöstä, muuten 162.

## TILA 15.2x

- **JUNA 161 -RUNKO f3d710212** = ea1a60e73 + natiiviseppa/mac-ohjauslevy **73794c17** (DIAGNOOSI-lokirivi; Päätoimittaja: diagnostiikka
  junaan 161). Unity iOS/Mac 0. Odottaa Päätoimittajan vahvistusta: NUI pariisi-esitys **89d98b7e** ja Siirtoseppä osoitin-varmistus
  **49888505** (merge-tree puhtaat). Sitten kaikki testit (tarkista.sh zsh:llä), proto-kaanna-koekäännös, savu (Mac: piiloon → takaisin →
  panorointi + ääni; kirjoitusääni aloitusruudussa; ei hiiri-/näppäinautomaatiota omistajan käyttäessä konetta).
- Ohjauslevy: omistaja vastasi "kaikki lakkaa", Matkakirja oli aktiivinen → ei taustafokus. Omistajan loki: Päätteessä
  `cp ~/Library/Containers/fi.matkakirja.peli/Data/Library/Logs/Matkakirja/"Matkakirja 3D"/Player.log ~/Desktop/matkakirja-loki.txt`.

## TILA 15.0x

- **MAC-OHJAUSLEVYVIKA (omistaja, Mac TF 160: panorointi/zoomaus lakkaa, kunnes klikkaa karttaa):** haara natiiviseppa/mac-ohjauslevy
  **84f44457** (wt/proto-natiiviseppa-ohjauslevy, BUILD 160:n päällä): diagnostiikka (ele UI:lle → peittäjä; kartta estetty → SyoteLukko-
  omistajat/EleetMuualla) + testikomennot ui mac paikka / ui mac hiiri pohjaan|irti. Toisto lokit/natiiviseppa-skriptit/mac-ohjauslevy-
  toisto.sh (vain komentotiedostot): EI toistunut (jumiutunut nappi, lukko, peitto → kartta ottaa eleet). Havainto: maan panoraja
  (laatikko × 1,3, loitonnuksen katto) pysäyttää reunalla ilman palautetta. Kysytty Päätoimittajalta omistajan tarkennus (kaikki
  suunnat? aktiivinen ohjelma?). Epäily 2: ei-aktiivinen appi (klikkaus aktivoi) — ei testattavissa ilman fokuksen viemistä omistajalta.
  Appin käynnistys vie omistajan fokuksen → ei Mac-ajoja hänen käyttäessään konetta.
- LS2: Ateenan pallon klikkaus (eri vika), haara linssiseppa2/hiiri-testi 2d8da858f (KaupunkiPallot.cs + testikomento), merge-tree puhdas.

## TILA 14.2x

- **JUNA 161 -ESIRUNKO natiiviseppa/juna-161-koe ea1a60e73** (c4fbdd6f5 + LS2 swe-rajat 95cf8eb97 14.2x, maarajat 200 todennettu;
  Kartta 447, unity iOS/Mac 0). Aiempi: c4fbdd6f5 (wt/proto-natiiviseppa-j144) = BUILD 160 d8b0e0fc + LS1 741625b8d +
  Siirtoseppä historia-juna161 526c9373 (korvaa eleet-2 67728f0b) + NUI kehittaja-tf 767c70eb + LS2 aa32b618b + 074c95a3 →
  755597cf (kirjoitusääni + vSync + Mac lepo, KUITATTU 14.2x). Testit 447/419/833, tarkista (zsh!), unity iOS/Mac 0, editori ok.
  PUUTTUU: NUI pariisi-esitys (metrolinjan stillit Päätoimittajalle), LS2 swe-rajat 95cf8eb97 (vasta kun Karttaseppä vahvistaa
  maarajapolut, nyt 404). Karttasepän #4140 kuitattu (main-repon PR, ei proto). Karttaseppä 14.3x: maarajojen vienti
  Julkaisijalla ~15.30–16; Karttaseppä ilmoittaa, kun molemmat 200 → vasta sitten 95cf8eb97 runkoon ja TF. Juna kootaan vasta NUI:n stillikuittauksen jälkeen.
- **Junan savu (Päätoimittaja):** Mac: piiloon → takaisin → panorointi lataa uudet laatat ja ääni palaa; kirjoitusääni aloitusruudussa.
  EI hiiri/näppäinautomaatiota, kun omistaja käyttää Macia (muisti mac-gui-automaatio-omistajan-naytolla).
- **Mac lepo mitattu:** 755597cf piilossa 2,1–2,6 %, ei valittuna 7,5 % (4975a36c), täysi 15–16 %. Omistaja todentaa Mac TF 161:llä.
- **Juna 162 -ehdokas:** Siirtoseppä osoitin-varmistus **227529f3** (peilin vaihto lataa rakennuksen uudelleen; kehittäjäkomennon
  vika, pelaajilla ei) — KUITATTU junaan 162 (14.3x). Siihen asti peilivaihdossa "poikki lataa" tai puhdas asennus.
- **FACEIT VALMIS 14.30 (raportoitu):** +0,03 ms/kehys GPU (B 9,39 − A 9,36), raja 0,3 → ALLE; iPad riittää. Päätoimittaja: EI uusia
  iPad-ajoja vanhaan Olavinlinnan esittelyyn; seuraavat iPad-ajot: juna 161:n todennus ja Siirtosepän pelattava pala (E1).
- (vanha) FACEIT-uusinta 14.21 (LOHKOT "B A", puhdas asennus per lohko; aiempi 14.06-ajo antoi 2 A-jaksoa), käynnissä 14.06 (puhdas uudelleenasennus korjasi latausvirheen), tulos lokit/natiiviseppa-faceit-uusinta.txt.

## TILA 14.0x (tauko peruttu 13.47)

- **Mac lepo:** 13.36-ajon "vika" oli mittausvirhe (selain peitti ikkunan → oikein "piilossa"). mac-cpu.sh korjattu (ikkuna
  400,100 ja eteen open -a + napsautus; C = sovellus piilotettu cmd+H, koska Spacen vaihtoa ei saa automatisoitua).
  4975a36c (Cesium suspendUpdate + piirtoväli 30 piilossa): A 16,3 / B 7,5 / C 3,0 % (TF 159 ~15 % kaikissa).
  **755597cf** (+ runInBackground pois piilossa) Julkaisijan jonossa ~14.14 → mac-cpu.sh → luvut Päätoimittajalle.
- **FACEIT:** 14.02-ajo: A-peili a0e53749 antaa nyt latausvirheen (12.48 toimi) → kysytty Siirtosepältä, ajo pysäytetty.

## TAUON TILA (13.34)

- **Mac TF 160 LADATTU** (run 37606997700 success; app lokit/natiiviseppa-mac-tf-160-d8b0e0fc, fi.matkakirja.peli, build 160).
- **Mac lepo -dev 28da7435** käännetty (lokit/natiiviseppa-mac-lepo-28da7435, Nakyvyys-symboli mukana). mac-cpu.sh jälkeen-ajo
  käynnistetty 13.34 setsid → lokit/natiiviseppa-mac-cpu/jalkeen-28da7435/cpu.txt (+ "Mac-ikkuna"-lokirivit). Tarkista ja lähetä
  luvut Päätoimittajalle (ennen A 14,8 / B 14,9 / C 15,5 %; tavoite C < 2 %). Sen jälkeen Mac-intro-kaappaus ja panorointi.
- **LEPO-MITTAUS 13.36 (28da7435) — VIKA, EI VIELÄ PÄÄTOIMITTAJALLE:** A 3,7 / B 4,0 / C 4,4 / D 4,6 %. Lokissa vain YKSI rivi
  "Mac-ikkuna piilossa → 1 fps" koko ajon ajan → MatkakirjaMacSyote_Nakyvyys palautti bitin 0 = 0 myös näkyvänä, joten peli oli
  1 fps:ssä kaikissa tiloissa (A:kin). Tutki: kutsutaanko pääsäikeeltä (AppKit-ominaisuudet muualta = roskaa → dispatch_sync main
  tai NSWindowDidChangeOcclusionStateNotification-tarkkailija, joka päivittää atomista tilaa), onko Unityn ikkuna [NSApp windows]-
  listassa, occlusionState-arvo. Lisäksi 1 fps maksaa silti ~4 % → tavoite < 2 % vaatii myös esim. Cesiumin/taustasäikeiden
  pysäytyksen tai OnDemandRendering-välin. Ikkuna oli eri paikassa (560,50 1440×928), joten napsautukset eivät osuneet: aseta
  mac-cpu.sh:ssa ikkunan paikka (System Events set position/size) ennen napsautuksia. Mac TF 161:een vasta korjattuna.
- **FACEIT-uusinta KESKEN**: ipad-faceit-aabb.sh korjattu (rivinumero ilman välilyöntejä — se hylkäsi hyvät jaksot; lämmityksen
  jälkeen linssi pois + 30 s). Viimeisin ajo 13.23 kaatui: devicectl "application failed to launch (error 10002, Invalid
  argument)" — todennäköisesti edellisen konsoliajon tappamisen jälkeen. 15.00 jälkeen: tarkista iPad (devicectl list devices),
  aja `perl … faceit-uusinta-ajo.sh` (Julkaisijan lupa on), tulos lokit/natiiviseppa-faceit-uusinta.txt → yksi rivi Päätoimittajalle.
- **JUNA 161 KUITATUT (Päätoimittaja 13.3x, kokoa tauon jälkeen BUILD 160 d8b0e0fc:n päälle):** LS1 esitys-giza **741625b8d**
  (ehto: Giza vain kokeilukytkimen takana), eleet-2 **67728f0b**, kirjoitusääni **074c95a3**, kehittaja-tf **767c70eb** (⊇ 270992bd),
  kaupunkipallot **aa32b618b**, worldview-vakiot LS2:lta (SHA kysyttävä LS2:lta). EI VIELÄ: NUI pariisi-esitys (uusi SHA tauon
  jälkeen stilleistä, EI 5c3d45e6), Macin vSync + lepo 28da7435 (CPU-luvut ensin; vSync 107fabeb on 074c95a3:ssa — jos lepo ei
  ehdi, kysy Päätoimittajalta, meneekö 074c95a3 vSyncin kanssa). LS1 torjunnan kesto / NUI lippurivi: tarkista Päätoimittajalta.

## TILA HETI

- **BUILD 159 = master b00c06f7**; TF 159 ja Mac TF 159 ladattu. Mac TF -työnkulku: proto3d-mac-testflight.yml
  (`mac-kaanna.sh <SHA> 1.1 <build>` MATKAKIRJA_APPSTORE=1 + MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli, kopio
  lokit/natiiviseppa-mac-tf-<build>-<sha>, lataus vasta Julkaisijan luvalla).
- **BUILD 160 = proto master d8b0e0fc** (12.5x: juna/b13 603cfd8a → 2309f55d, juna.log kirjattu). Julkaisija tekee
  muutosloki-PR:n ja TF 160:n; Mac TF 160 (`mac-kaanna.sh d8b0e0fc 1.1 160`, APPSTORE=1) vasta Julkaisijan luvalla.
  Mac-kaanna 074c95a3 (dev) vasta NUI pariisi-esityksen jälkeen Julkaisijan uudella KÄÄNNÖS NYT -viestillä.
- **JUNA 161 -korjaukset:** haara natiiviseppa/juna161-korjaukset **074c95a3** (wt/proto-natiiviseppa-kirjoitus) =
  kirjoituskoneääni f222e5eb (Aloitusnakyma soittaa Tehoste("pen") sanoittain, kuten webin KIRJOITUSRYTMI; iOS + Mac) +
  Mac vSync 107fabeb (Ruudunpaivitys: Macilla vSyncCount = näyttö/fps, oli 0 → repeämä) + lokirivi "MATKAKIRJA ruutu: Mac vSync".
  - KÄÄNNETTY 12.53 (yhdistelmä af5922b95, polku ilmoitettu Julkaisijalle, LS1:lle ja LS2:lle): iOS-yhdistelmä 074c95a3+47622521f(LS1 yövalot)+e16d100db(LS2 pallo-puoli), loki
    lokit/kaannospalvelu/20261007-124705-*.log, app-kopio lokit/natiiviseppa-juna161-koe/. Valmistuttua appin polku ja
    yhdistelmän SHA Julkaisijalle, LS1:lle ja LS2:lle. Sitten mac-kaanna 074c95a3 (dev, 1.1).
  - iOS TODENNETTU 13.01 (Päätoimittajalle ilmoitettu): lokit/natiiviseppa-savu161-ennen/intro-ennen-aani.wav (a5b381a7) vs
    natiiviseppa-savu161b/intro-jalkeen-aani.wav (af5922b9), molemmat "Laita äänet päälle" + Aloita seikkailu, kaappaa 16:
    puhe kohdistuu 0,99, jälkeen 19 lyöntiä yli puheen (yläkaista > +10 dB), ennen 0. ÄÄNET PÄÄLLE TARVITAAN (pois = mykistys).
  - Päätoimittaja KUITTASI kirjoitusäänen junaan 161. VSync + Macin lepo kuitataan Mac-todennuksen jälkeen.
  - MACIN AUTOMAATTINEN LEPO (Päätoimittaja 13.0x, omistajan Mac TF: ~30 % CPU piilossa): **28da7435** (sama haara, 074c95a3:n
    päällä). MatkakirjaMacSyote_Nakyvyys (occlusionState/isMiniaturized/isHidden/isActive+keyWindow) → Ruudunpaivitys.MacLepo:
    piilossa 1 fps + AudioListener.pause, ei valittuna ≤ 10 fps (ääni soi), vSync-jakaja > 4,5 → vSyncCount 0. Lokirivi
    "MATKAKIRJA ruutu: Mac-ikkuna …". unity-tarkistus 0 virhettä (Mac ja iOS).
  - MAC-KÄÄNNÖS: mac-kaanna **28da7435** (dev, 1.1) Julkaisijan jonossa 15.00 jälkeen (LS1 gizan perään). Sitten
    `zsh lokit/natiiviseppa-skriptit/mac-cpu.sh "<proto-3d/Matkakirja-proto-mac/Build/mac/Matkakirja 3D.app>" lokit/natiiviseppa-mac-cpu/jalkeen-28da7435`
    (A valittuna, B näkyy ei valittuna = ikkunaton Tyhja.app etualalla, C kokonäyttö toisessa Spacessa, D takaisin) + intro-kaappaus
    + nopea panorointi. ENNEN (TF 159, aloitusnäkymä): A 14,8 %, B 14,9 %, C 15,5 %, D 15,5 % (lokit/natiiviseppa-mac-cpu/ennen-159).
    Tavoite C < 2 %. Luvut Päätoimittajalle. Huom: mac-cpu.sh:n napsautukset eivät edenneet aloitusnäkymästä (sama tila jälkeen-ajossa).
  - Mac repeämä ENNEN: TF 159 -kopiolla lokit/natiiviseppa-mac-repeama/ennen-panorointi.mov (hiiri veda 700 550 1300 550 0.25 16).
    screencapture tallentaa koostetun pinnan, joten repeämä ei näy kuvissa; juurisyy on koodissa (vSyncCount 0).
- **Muut juna 161 -ehdokkaat (odottavat Päätoimittajan SHA-vahvistusta):** LS1 torjunnan kesto, Siirtoseppä eleet-2 **67728f0b**
  (korvaa 1ca51a6b; kytkimet poikki eleet / poikki puolilahi), NUI lippurivin kielikorjaus, NUI kehittaja-tf **767c70eb**
  (korvaa 270992bd ja bb05c48a; testaajatilan pois kytkentä sulkee sen avaamat esittelylinssit, apurahakortin linssit jäävät). kehittaja-tf todennetaan App Store -käännöksellä: ilman koodia ei Kehittäjä-riviä; testaajakoodilla
  (Päätoimittajalla) kaikki linssit ja vapaa liikkuminen ilman Kehittäjä-riviä; täydellä koodilla (POLLO_KEHITTAJAKOODI
  tiedostossa ~/.matkakirja-avaimet-koodaus.zsh) kaikki, myös Giza-kytkin. Koodia ei lokiin eikä viesteihin.
- **iPad FACEIT ABAB MITÄTÖN** (lokit/natiiviseppa-ipad-faceit-20261007-1248, ilmoitettu Päätoimittajalle + Siirtosepälle): A peitto-tilassa
  300/300 piirretty (16,68 ms, GPU 9,4 ms), B jäi paikallaan-tilaan (piirretty 2–108), pari 2:n poikkileikkaus aukesi 5 min viiveellä.
  UUSINTA PÄÄTETTY (Päätoimittaja 13.1x): 15.00 jälkeen Julkaisijan iPad-vuorolla
  `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV' lokit/natiiviseppa-skriptit/ipad-faceit-aabb.sh` (lohkot A B B A, lämmitys +
  2 jaksoa, tilavahti 300/300 peitto, hylkäys), sitten `python3 faceit-analyysi.py <O>` → YKSI RIVI Päätoimittajalle:
  FACEIT-hinta ms ja raja 0,3 ms. faceit-analyysi.py regex korjattu (rivi\s+).
  SIIRTOSEPÄN SYY: DioraamaLevyvalimuisti.SiivoaVanhat pitää vain nykyisen paketin → jokainen A↔B-vaihto lataa erot uudelleen
  (Wi-Fi minuutteja). Uusinnassa: odota ennen "tila kappeli" lokia 'saapuminen alkaa|latausvirhe' (aikaraja 600 s) + 20 s, ja aja
  lohkoina AABB / BBAA (yksi vaihto, ensimmäinen avaus lämmittää).
- **Actions-ajurit** siirretty /Users/Shared/Claude/actions-runner(-2) (muisti actions-ajurit-shared-polussa).
