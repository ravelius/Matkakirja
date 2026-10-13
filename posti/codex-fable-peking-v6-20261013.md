# Peking Codex v6 — jatkoerä 1/5, 13.10.2026

Valmis paikallinen tarkistuspaketti: `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v6-20261013`. 24 laattaa × 3 LOD = 72 GLB-tiedostoa; sama ENU-origo, 550×500 m laattakoko, nimet ja laattarajat. Todellinen kokonaisalue 2.2×3.0 km. Paketin 121 tiedostoa varmennettu tavuntarkasti, alkuperäisen Linnanrakentajan 592 tiedostoa tarkistettu muuttumattomiksi.

Muutokset: nykyinen työkopio oli todellisuudessa v5, joten materiaaliryhmittäinen pienten kattojen säilyttävä LOD-korjaus säilytettiin. Suojatut modernit kohteet (Kansan suuri halli, museo, Mao-muistohalli, sankarien muistomerkki ja NCPA) ovat nyt yksinkertaisia tekstuurittomia massoja ilman tunnistettavia yksityiskohtia. Olemassa olevan CC0-harmaakaton väriä hienosäädettiin RGB-kertoimilla 0.97/0.94/0.91; ei uusia AI-tekstuureja.

Ortovertailu on ajettu ensin v4:stä ja sitten v6:sta samoilla rajoilla. Molemmat läpi. Tuore v4: kattojen L +11.1%, ulokkeiden L +3.2%, uloke/katto 0.868 vs orto0.933; v6: kattojen L +14.1%, ulokkeiden L +2.5%, uloke/katto0.824 vs orto0.916. V6:tta ei väitetä kattojen osalta v4:ää läheisemmäksi. Maan sävypoikkeama v6+25.7 käyttää aiempaa perusteltua rajaa30; muuta porttirajaa ei väljennetty.

`esikatselu/tarkistusarkki.jpg`: ilma, taihedian, aukio, beihai, jingshan, hutong_ilma — samat vanhat kamerat, kaikki kuusi rootin katsomia. `ortovertailu/ennen-jalkeen-orto.jpg` näyttää v4 | v6 | orto. S2-aineiston todellinen erotuskyky on10m, vaikka paketti interpoloitu2m: se ei ole yksittäisten kaiteiden tarkka referenssi. `QA.json` sisältää kaikki vyöhyketulokset ja budjettivertailun.

Peking pysyy POISSA pelistä. Ei Unity-/proto-koodin muutoksia, R2-vientiä, main-mergeä, versionnostoa tai julkaisua. Päätoimittajan hyväksyntää tai pelin laitetestiä ei väitetä tehdyksi. Muut vaiheiden2–5 kohteet ovat yhä avoimia: tarkat hallit/portit/kaiteet/vallihauta; Tiananmen/Jingshan/Beihai; hutong-vaihtelu/atlas; puut/aukio/kadut. Nykyisten esikatselujen maa on harmaa testitausta; GLB-laatoissa ei vielä ole karttapintoja. Jatkan vaiheeseen2 lähteen mukaisesti odottamatta uutta lupaa.

## Budjetti per tiedosto

1373317 kolmiota ja 167563508 tavua yhteensä kolmelleLOD-tasolle. 68 tiedostoa ylittää v4:n kolmio- tai tavubudjetin. Jokaisen ylityksen peruste: peritty v5-kattoja säästävä materiaaliryhmittäinen LOD säilyttää pienet katot, jotka v4 collapse kadotti; samat nykytekstuurit ja glTF-metatieto selittävät kokoa. Tässä erässä ei lisätty AI-tekstuuria eikä uusia koristegeometrioita. Ylitykset näkyvät alla tähdellä ja tarkkoine perusteineen QA.json:ssä.

| Tiedosto | Kolmiot | Tavua | v4 kolmiot | v4 tavua | Ylitys |
|---|---:|---:|---:|---:|---|
| peking_0_0_lod0.glb | 38312 | 3586300 | 38792 | 3521804 | * |
| peking_0_0_lod1.glb | 17322 | 2053964 | 17456 | 1983036 | * |
| peking_0_0_lod2.glb | 7448 | 1266612 | 5818 | 805648 | * |
| peking_0_1_lod0.glb | 25052 | 2835136 | 25052 | 2734476 | * |
| peking_0_1_lod1.glb | 14044 | 2051628 | 11273 | 1668700 | * |
| peking_0_1_lod2.glb | 6229 | 1268820 | 3757 | 957568 | * |
| peking_0_2_lod0.glb | 20862 | 2471576 | 20862 | 2370916 | * |
| peking_0_2_lod1.glb | 11741 | 1823792 | 9387 | 1483076 | * |
| peking_0_2_lod2.glb | 5189 | 1158160 | 3129 | 885164 | * |
| peking_0_3_lod0.glb | 15058 | 1960876 | 15058 | 1860480 | * |
| peking_0_3_lod1.glb | 7264 | 1320432 | 6776 | 1147608 | * |
| peking_0_3_lod2.glb | 3146 | 933220 | 2258 | 530532 | * |
| peking_0_4_lod0.glb | 19304 | 2329628 | 19304 | 2228968 | * |
| peking_0_4_lod1.glb | 10771 | 1718524 | 8686 | 1386492 | * |
| peking_0_4_lod2.glb | 4783 | 1105740 | 2895 | 841524 | * |
| peking_0_5_lod0.glb | 24554 | 2846892 | 24554 | 2746496 | * |
| peking_0_5_lod1.glb | 15517 | 2188980 | 11049 | 1638524 | * |
| peking_0_5_lod2.glb | 7011 | 1375656 | 3683 | 694232 | * |
| peking_1_0_lod0.glb | 15461 | 1943128 | 16615 | 2009820 |  |
| peking_1_0_lod1.glb | 9575 | 1513988 | 7476 | 1330396 | * |
| peking_1_0_lod2.glb | 4316 | 1030340 | 2492 | 642340 | * |
| peking_1_1_lod0.glb | 28581 | 3145728 | 28581 | 3045068 | * |
| peking_1_1_lod1.glb | 16707 | 2290552 | 12861 | 1837748 | * |
| peking_1_1_lod2.glb | 7469 | 1382224 | 4287 | 810924 | * |
| peking_1_2_lod0.glb | 28467 | 3187080 | 28467 | 3086684 | * |
| peking_1_2_lod1.glb | 16968 | 2363372 | 12810 | 1968088 | * |
| peking_1_2_lod2.glb | 7601 | 1522192 | 4270 | 1132880 | * |
| peking_1_3_lod0.glb | 38272 | 3629616 | 38272 | 3529220 | * |
| peking_1_3_lod1.glb | 15634 | 2109264 | 17222 | 2132076 |  |
| peking_1_3_lod2.glb | 6531 | 1365764 | 5740 | 1204628 | * |
| peking_1_4_lod0.glb | 66345 | 5672144 | 66345 | 5571752 | * |
| peking_1_4_lod1.glb | 29628 | 3168240 | 29855 | 3099960 | * |
| peking_1_4_lod2.glb | 12523 | 1719556 | 9951 | 1227404 | * |
| peking_1_5_lod0.glb | 53422 | 5344176 | 53422 | 5243784 | * |
| peking_1_5_lod1.glb | 33433 | 3749824 | 24039 | 2935108 | * |
| peking_1_5_lod2.glb | 15079 | 2096052 | 8013 | 1282380 | * |
| peking_2_0_lod0.glb | 11199 | 1540896 | 17437 | 2124924 |  |
| peking_2_0_lod1.glb | 5869 | 1148360 | 7846 | 1361020 |  |
| peking_2_0_lod2.glb | 2594 | 870864 | 2615 | 690776 | * |
| peking_2_1_lod0.glb | 21856 | 2708660 | 21856 | 2608268 | * |
| peking_2_1_lod1.glb | 13210 | 2085492 | 9835 | 1656500 | * |
| peking_2_1_lod2.glb | 5922 | 1346956 | 3278 | 806932 | * |
| peking_2_2_lod0.glb | 28534 | 3119876 | 28534 | 3019480 | * |
| peking_2_2_lod1.glb | 15414 | 2198908 | 12840 | 1908112 | * |
| peking_2_2_lod2.glb | 6810 | 1436376 | 4280 | 1104832 | * |
| peking_2_3_lod0.glb | 48255 | 4350872 | 48255 | 4250476 | * |
| peking_2_3_lod1.glb | 20824 | 2500996 | 21714 | 2463552 | * |
| peking_2_3_lod2.glb | 8804 | 1500548 | 7238 | 1070160 | * |
| peking_2_4_lod0.glb | 67919 | 6142536 | 67919 | 6042144 | * |
| peking_2_4_lod1.glb | 29883 | 3344624 | 30563 | 3318000 | * |
| peking_2_4_lod2.glb | 12559 | 1885524 | 10187 | 1414828 | * |
| peking_2_5_lod0.glb | 51770 | 4925612 | 51770 | 4825220 | * |
| peking_2_5_lod1.glb | 27569 | 3153856 | 23296 | 2728868 | * |
| peking_2_5_lod2.glb | 12174 | 1707500 | 7765 | 1231744 | * |
| peking_3_0_lod0.glb | 19244 | 2243656 | 19244 | 2142996 | * |
| peking_3_0_lod1.glb | 10439 | 1606672 | 8659 | 1369756 | * |
| peking_3_0_lod2.glb | 4640 | 1097644 | 2886 | 629856 | * |
| peking_3_1_lod0.glb | 24854 | 2823660 | 24854 | 2723000 | * |
| peking_3_1_lod1.glb | 14107 | 2054888 | 11184 | 1653116 | * |
| peking_3_1_lod2.glb | 6280 | 1272196 | 3728 | 744052 | * |
| peking_3_2_lod0.glb | 37709 | 3743484 | 37709 | 3642824 | * |
| peking_3_2_lod1.glb | 18634 | 2269272 | 16969 | 2075260 | * |
| peking_3_2_lod2.glb | 8119 | 1396256 | 5656 | 1103156 | * |
| peking_3_3_lod0.glb | 29884 | 3218328 | 29884 | 3117664 | * |
| peking_3_3_lod1.glb | 16674 | 2196408 | 13447 | 1863708 | * |
| peking_3_3_lod2.glb | 7398 | 1365500 | 4482 | 811420 | * |
| peking_3_4_lod0.glb | 39113 | 3864268 | 39113 | 3763608 | * |
| peking_3_4_lod1.glb | 19592 | 2367652 | 17600 | 2141300 | * |
| peking_3_4_lod2.glb | 8548 | 1437600 | 5866 | 1137384 | * |
| peking_3_5_lod0.glb | 32084 | 3379048 | 32084 | 3278388 | * |
| peking_3_5_lod1.glb | 17479 | 2339060 | 14437 | 1931760 | * |
| peking_3_5_lod2.glb | 7735 | 1390284 | 4812 | 1056912 | * |

Lähde `posti/fable-codex-peking-jatko-20261013.md`, commit beab2da8c681c96d0f34f3b2afb9bc6aa7fee9b0, blob 34f759c8036f441e471f004e563697e7f8e6317a. Linnanrakentajan luovutus b7064d79e9f841c52393dd82d34f43a1e9bf1cdf luettu kokonaan ja säilytetty työkansiossa.
