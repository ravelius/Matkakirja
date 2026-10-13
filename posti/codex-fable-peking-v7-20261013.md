## 2026-10-13T20:32:52.527736+00:00 — CODEX → PÄÄTOIMITTAJA: Peking v7, erä 2/5, tekninen toimitus

Paketti `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v7-20261013`. 24 laattaa550×500m ×3LOD=72GLB. ENU Taihedian39.915896/116.390814, 37.9m ellipsoidista. Todelliset GLB-tavut **153754528**, v4 149387500 eli **+2.923%**. Vaiheiden2–4 kokonaisraja164326250tavua. Manifesti SHA256 `e1e6c34dabcea30507b4b7a361c1af288fd4465ca5e69d67cf1d2413521a2e25`. Kaikkien pakettitiedostojen tavut ja SHA256 varmennettu.

V7 candidate4 jatkaa toimitetusta v6:sta. Taihedianin ja Taihemenin lähdemitoitettu kuisti, pylväät, ovisyvennykset, kolmikerroksinen eteläterassi, portaat ja marmorikaiteet. Muut hallit, portit, muurit ja kulmatornit säilyvät perityn mallin mukaisina; kaikkia yksittäisiä historiallisia yksityiskohtia ei väitetä lopullisiksi. Toistuvat osat yksi mesh per tyyppi ja laatta: 58 pylvästä, 10 ovea, 858 kaidetolppaa, 858 kaidepaneelia, 214 porrasinstanssia, samat sijoitukset kaikissa LOD:eissa, jokainen kerran koko alueella.

Vallihauta, Beihai, Zhonghai ja Nanhai ovat oikeina OSM-vesimesheinä GLB:issä (556 kolmiota per LOD). Kolme saariaukkoa säilyvät. Korkeudet johdettu GLO-30-maa-aineiston todellisista soluista, EI mitattuja: 35.65, 34.85, 34.85 ja 35.35 m ellipsoidista. Alkuperäinen 30 m lähde on interpoloitu 5 m:iin; vallihaudan vaihteluväli ja muukin epävarmuus tiedostoissa. Esikatselun maa lasketaan vesialueella veden alle, saaria muuttamatta. Maa on vielä esikatselutausta eikä GLB-maasto; erä5 ja myöhempi integraatio vastaavat veden näkyvyyden säilymisestä todellisen maan päällä.

Candidate3:n sävyhylky johti lähdeperusteiseen tasa-materiaalin 20% lineaariseen tummennukseen (S2-vertailussa tasakatot +24.1%). Valaistus, altistus, geometria ja kaikki numeeriset rajat säilyivät. Candidate4 läpäisee alkuperäisen ortoportin, symmetrisen OSM-vesimaskin sekä ennalta lukitun 0.65 yhteisvalon vertailun. V4 läpäisee samassa yhteisvalossa; v6:n +16.4% kattoero jää hylkyhistoriana, eikä vanhaa hyväksyntää kirjoiteta uudelleen. Candidate2:n ja candidate3:n alkuperäiset hylkytulokset säilyvät QA-historiassa.

Rakennusten vertex-weld on pois ennen materiaaliryhmittäistä LOD-Decimatea, joten v4:n pienten kattojen katoamista ei palauteta. 72 GLB:tä, 24 laattaa 550×500 m, ENU Taihedian 39.915896/116.390814. Koko 153754528 tavua, v4 +2.9233%, raja164326250. Jokaisen laatan tavut, SHA256, yksilölliset ja piirrettävät instanssikolmiot indeksissä ja QA:ssa. Per-laatan poikkeamat perusteltu katon säilymisellä ja lisätyllä lähdegeometrialla. Olemassa olevat JPEG:t pakattu uudelleen, ei uusia AI-tekstuureja.

Suojatut modernit teokset ovat samat yksinkertaiset tekstuurittomat massat kuin v6:ssa. Ei muotokuvaa tai tyhjää kehystä, luettavaa tekstiä, logoja tai lippuja. Ei Google/Baidu/Street View/CMAB-aineistoa. Peking poissa pelistä. Vaiheet3–5 sekä PT:n tämän erän hyväksyntä ovat avoinna.


Kuvat: `esikatselu/tarkistusarkki.jpg`, kuusi yksittäistä kameraa ja `ortovertailu/ennen-jalkeen-orto.jpg` (ennen|jälkeen|orto). Lähde/data/tekstuurit jäädytetty ennen buildia; `source-snapshot.json`, `QA.json`, `qa/`, `LAHTEET.md` ja `referenssit/` mukana. Historialliset hylkytulokset säilytetty.

Päätoimittajan vastaanotto ja omistajan valtuutuksella tehtävä hyväksyntä ovat **odottavia**. Tämä postitus on tekninen vaihetoimitus. Peli-integraatio ja julkaisu ovat epätosia. Lähdetilauksen mukainen seuraava vaihe jatkuu toimituksen jälkeen ilman uutta lupakysymystä.

### Laattakohtainen budjetti

Kolmiot: uniikki geometria / kaikkien instanssien piirrettävä määrä. V4-poikkeaman peruste: materiaaliryhmittäinen LOD säilyttää pienet katot, ja lähteistetyt vesi- ja perintöosat lisäävät geometriaa. Tekstuurit ovat samoja nykykuvia uudelleen pakattuina; koko ja kuvamäärät QA:ssa.

| GLB | Tavut | Kolmiot uniikki / instanssit | v4-tavut | Δtavut% | Kuvat |
|---|---:|---:|---:|---:|---:|
| peking_0_0_lod0.glb | 3381544 | 38312 / 38312 | 3521804 | -3.98 | 7 |
| peking_0_0_lod1.glb | 1849216 | 17322 / 17322 | 1983036 | -6.75 | 6 |
| peking_0_0_lod2.glb | 1061856 | 7448 / 7448 | 805648 | +31.80 | 6 |
| peking_0_1_lod0.glb | 2624116 | 25107 / 25107 | 2734476 | -4.04 | 10 |
| peking_0_1_lod1.glb | 1840596 | 14099 / 14099 | 1668700 | +10.30 | 10 |
| peking_0_1_lod2.glb | 1057796 | 6284 / 6284 | 957568 | +10.47 | 8 |
| peking_0_2_lod0.glb | 2270060 | 20968 / 20968 | 2370916 | -4.25 | 9 |
| peking_0_2_lod1.glb | 1622280 | 11847 / 11847 | 1483076 | +9.39 | 9 |
| peking_0_2_lod2.glb | 956628 | 5295 / 5295 | 885164 | +8.07 | 7 |
| peking_0_3_lod0.glb | 1763772 | 15137 / 15137 | 1860480 | -5.20 | 10 |
| peking_0_3_lod1.glb | 1123332 | 7343 / 7343 | 1147608 | -2.12 | 8 |
| peking_0_3_lod2.glb | 736120 | 3225 / 3225 | 530532 | +38.75 | 7 |
| peking_0_4_lod0.glb | 2131056 | 19407 / 19407 | 2228968 | -4.39 | 9 |
| peking_0_4_lod1.glb | 1519952 | 10874 / 10874 | 1386492 | +9.63 | 9 |
| peking_0_4_lod2.glb | 907152 | 4886 / 4886 | 841524 | +7.80 | 7 |
| peking_0_5_lod0.glb | 2654520 | 24632 / 24632 | 2746496 | -3.35 | 9 |
| peking_0_5_lod1.glb | 1996624 | 15595 / 15595 | 1638524 | +21.86 | 9 |
| peking_0_5_lod2.glb | 1183296 | 7089 / 7089 | 694232 | +70.45 | 7 |
| peking_1_0_lod0.glb | 1744976 | 15461 / 15461 | 2009820 | -13.18 | 6 |
| peking_1_0_lod1.glb | 1315840 | 9575 / 9575 | 1330396 | -1.09 | 6 |
| peking_1_0_lod2.glb | 832184 | 4316 / 4316 | 642340 | +29.56 | 5 |
| peking_1_1_lod0.glb | 2931324 | 28581 / 28581 | 3045068 | -3.74 | 10 |
| peking_1_1_lod1.glb | 2076136 | 16707 / 16707 | 1837748 | +12.97 | 10 |
| peking_1_1_lod2.glb | 1167824 | 7469 / 7469 | 810924 | +44.01 | 8 |
| peking_1_2_lod0.glb | 2974440 | 28482 / 28482 | 3086684 | -3.64 | 11 |
| peking_1_2_lod1.glb | 2150728 | 16983 / 16983 | 1968088 | +9.28 | 11 |
| peking_1_2_lod2.glb | 1309560 | 7616 / 7616 | 1132880 | +15.60 | 10 |
| peking_1_3_lod0.glb | 3576972 | 38352 / 48706 | 3529220 | +1.35 | 11 |
| peking_1_3_lod1.glb | 2056624 | 15714 / 26068 | 2132076 | -3.54 | 10 |
| peking_1_3_lod2.glb | 1313108 | 6611 / 16965 | 1204628 | +9.01 | 10 |
| peking_1_4_lod0.glb | 5501684 | 66372 / 66372 | 5571752 | -1.26 | 7 |
| peking_1_4_lod1.glb | 2997784 | 29655 / 29655 | 3099960 | -3.30 | 6 |
| peking_1_4_lod2.glb | 1549100 | 12550 / 12550 | 1227404 | +26.21 | 6 |
| peking_1_5_lod0.glb | 5166920 | 53468 / 53468 | 5243784 | -1.47 | 8 |
| peking_1_5_lod1.glb | 3572576 | 33479 / 33479 | 2935108 | +21.72 | 8 |
| peking_1_5_lod2.glb | 1918784 | 15125 / 15125 | 1282380 | +49.63 | 7 |
| peking_2_0_lod0.glb | 1339632 | 11199 / 11199 | 2124924 | -36.96 | 7 |
| peking_2_0_lod1.glb | 947088 | 5869 / 5869 | 1361020 | -30.41 | 6 |
| peking_2_0_lod2.glb | 669608 | 2594 / 2594 | 690776 | -3.06 | 6 |
| peking_2_1_lod0.glb | 2485796 | 21856 / 21856 | 2608268 | -4.70 | 12 |
| peking_2_1_lod1.glb | 1862628 | 13210 / 13210 | 1656500 | +12.44 | 12 |
| peking_2_1_lod2.glb | 1124100 | 5922 / 5922 | 806932 | +39.31 | 10 |
| peking_2_2_lod0.glb | 2907580 | 28558 / 28558 | 3019480 | -3.71 | 11 |
| peking_2_2_lod1.glb | 1986612 | 15438 / 15438 | 1908112 | +4.11 | 11 |
| peking_2_2_lod2.glb | 1224084 | 6834 / 6834 | 1104832 | +10.79 | 10 |
| peking_2_3_lod0.glb | 4306716 | 48107 / 58977 | 4250476 | +1.32 | 10 |
| peking_2_3_lod1.glb | 2464912 | 20836 / 31706 | 2463552 | +0.06 | 9 |
| peking_2_3_lod2.glb | 1471660 | 8898 / 19768 | 1070160 | +37.52 | 9 |
| peking_2_4_lod0.glb | 5930928 | 67930 / 67930 | 6042144 | -1.84 | 11 |
| peking_2_4_lod1.glb | 3133020 | 29894 / 29894 | 3318000 | -5.58 | 10 |
| peking_2_4_lod2.glb | 1673920 | 12570 / 12570 | 1414828 | +18.31 | 10 |
| peking_2_5_lod0.glb | 4724352 | 51770 / 51770 | 4825220 | -2.09 | 10 |
| peking_2_5_lod1.glb | 2952600 | 27569 / 27569 | 2728868 | +8.20 | 8 |
| peking_2_5_lod2.glb | 1506224 | 12174 / 12174 | 1231744 | +22.28 | 7 |
| peking_3_0_lod0.glb | 2029248 | 19244 / 19244 | 2142996 | -5.31 | 8 |
| peking_3_0_lod1.glb | 1392272 | 10439 / 10439 | 1369756 | +1.64 | 7 |
| peking_3_0_lod2.glb | 883240 | 4640 / 4640 | 629856 | +40.23 | 7 |
| peking_3_1_lod0.glb | 2609252 | 24854 / 24854 | 2723000 | -4.18 | 10 |
| peking_3_1_lod1.glb | 1840472 | 14107 / 14107 | 1653116 | +11.33 | 10 |
| peking_3_1_lod2.glb | 1057784 | 6280 / 6280 | 744052 | +42.17 | 8 |
| peking_3_2_lod0.glb | 3529080 | 37709 / 37709 | 3642824 | -3.12 | 10 |
| peking_3_2_lod1.glb | 2054872 | 18634 / 18634 | 2075260 | -0.98 | 8 |
| peking_3_2_lod2.glb | 1181856 | 8119 / 8119 | 1103156 | +7.13 | 8 |
| peking_3_3_lod0.glb | 3003920 | 29884 / 29884 | 3117664 | -3.65 | 10 |
| peking_3_3_lod1.glb | 1981996 | 16674 / 16674 | 1863708 | +6.35 | 9 |
| peking_3_3_lod2.glb | 1151096 | 7398 / 7398 | 811420 | +41.86 | 8 |
| peking_3_4_lod0.glb | 3649864 | 39113 / 39113 | 3763608 | -3.02 | 10 |
| peking_3_4_lod1.glb | 2153252 | 19592 / 19592 | 2141300 | +0.56 | 8 |
| peking_3_4_lod2.glb | 1223196 | 8548 / 8548 | 1137384 | +7.54 | 8 |
| peking_3_5_lod0.glb | 3164644 | 32084 / 32084 | 3278388 | -3.47 | 10 |
| peking_3_5_lod1.glb | 2124660 | 17479 / 17479 | 1931760 | +9.99 | 10 |
| peking_3_5_lod2.glb | 1175884 | 7735 / 7735 | 1056912 | +11.26 | 8 |
