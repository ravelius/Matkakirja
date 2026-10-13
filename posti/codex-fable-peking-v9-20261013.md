## 2026-10-13T20:59:12.579323+00:00 — CODEX → PÄÄTOIMITTAJA: Peking v9, erä 4/5, tekninen toimitus

Paketti `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v9-20261013`. 24 laattaa550×500m ×3LOD=72GLB. ENU Taihedian39.915896/116.390814, 37.9m ellipsoidista. Todelliset GLB-tavut **153421596**, v4 149387500 eli **+2.700%**. Vaiheiden2–4 kokonaisraja164326250tavua. Manifesti SHA256 `39b7f202c4f10f8b603e5142134158dfeace4b7c26fd350e553a2fe2db1ad75b`. Kaikkien pakettitiedostojen tavut ja SHA256 varmennettu.

V9, erä4/5:5 239 pihatalopohjalle deterministinen neljän julkisivun ja neljän katon vaihtelu. Nykyiset Poly Haven CC0-tiili- ja kattokuvat koottu yhteiseen1024×1024 JPEG-atlakseen (123184tavua). Ovet ja ikkunat ovat yksinkertaisia proseduraalisia muotoja. Valokuvaviitteinä katsottu Fabio Achillin Hutong pekin (CC BY2.0) ja Francisco Anzolan Wrapped bushes (CC BY2.0), krediitit ja lähdehashit mukana. Viitevalokuvia ei kopioitu tekstuuriin. Ei uutta AI-kuvaa.

Jokaisen seinä- ja kattotahkon UV:t rajataan oman atlas-solun4px suojareunaan, eikä UV-toisto siirry toiseen materiaalisoluun. Jokaisessa72 GLB:ssä sama atlas on kerran upotettuna ja seinät sekä katot viittaavat siihen. Atlas-UV:t ja todellinen upotettu JPEG-SHA tarkistettu kaikkien72 tiedoston kaikkienLOD:ien primitiiveistä. Todelliset kuvatavut ja mitat kirjattu644 upotetulle kuvaesiintymälle. Kattojen ja harjan uusi materiaalinimi katto_hutong_atlas kuuluu edelleen kattojen LOD-ryhmään. Semanttisen harmaakatto+harja+atlas-ryhmän projisoitu pinta on jokaisessa laatassa vähintään95% v8:n vastaavasta; koko alueella LOD0 100.000%, LOD1 99.995%, LOD2 100.029%. Alkuperäistä pienten kattojen katoamisvirhettä ei palautettu.

Pihatalojen pohjat, siivet, sisäpihat ja räystään profiili säilyvät. Korkeusvaihtelu±0.18m ja pintavariantti ovat lähteen yleistä kaupunkimittakaavan vaihtelua tulkitsevia A-ratkaisuja, eivät mitattuja talokohtaisia eroja. Pihapuut säilyvät perityn mallin mukaisina vaihtelevina6–10m puina; niiden latvukset, tiheys ja kujapinnat viimeistellään erässä5.

Maamerkit ja vesi v8:n mukaisina,7 maamerkkiä kerran perLOD, samat korkeudet ja282 kolmion Beihai-saarimaasto. Suojattujen modernien kohteiden yksinkertaiset tekstuurittomat massat ennallaan. Alkuperäinen ortoportti, symmetrinen OSM-vesimaski sekä kiinteä0.65 yhteisvalodiagnoosi v4/v8/v9 läpäisevät samalla rajauksella ja samoilla rajoilla. 72GLB:tä,153421596tavua = v4+2.7004%, alle164326250tavun rajan. Kolmio-/tekstuuri-/tavupoikkeamat perusteltu QA:ssa. Ei Mao-kuvaa tai kehystä, tekstiä, logoja tai lippuja; ei Google/Baidu/Street View/CMAB. Peking poissa pelistä. PT-hyväksyntä odottaa; puut, kiveys ja kadut erässä5.


Kuvat: `esikatselu/tarkistusarkki.jpg`, kuusi yksittäistä kameraa ja `ortovertailu/ennen-jalkeen-orto.jpg` (ennen|jälkeen|orto). Lähde/data/tekstuurit jäädytetty ennen buildia; `source-snapshot.json`, `QA.json`, `qa/`, `LAHTEET.md` ja `referenssit/` mukana. Historialliset hylkytulokset säilytetty.

Päätoimittajan vastaanotto ja omistajan valtuutuksella tehtävä hyväksyntä ovat **odottavia**. Tämä postitus on tekninen vaihetoimitus. Peli-integraatio ja julkaisu ovat epätosia. Lähdetilauksen mukainen seuraava vaihe jatkuu toimituksen jälkeen ilman uutta lupakysymystä.

### Laattakohtainen budjetti

Kolmiot: uniikki geometria / kaikkien instanssien piirrettävä määrä. V4-poikkeaman peruste: materiaaliryhmittäinen LOD säilyttää pienet katot, ja lähteistetyt vesi- ja perintöosat lisäävät geometriaa. Tekstuurit ovat samoja nykykuvia uudelleen pakattuina; koko ja kuvamäärät QA:ssa.

| GLB | Tavut | Kolmiot uniikki / instanssit | v4-tavut | Δtavut% | Kuvat |
|---|---:|---:|---:|---:|---:|
| peking_0_0_lod0.glb | 3149780 | 38312 / 38312 | 3521804 | -10.56 | 6 |
| peking_0_0_lod1.glb | 1619092 | 17322 / 17322 | 1983036 | -18.35 | 5 |
| peking_0_0_lod2.glb | 831052 | 7448 / 7448 | 805648 | +3.15 | 5 |
| peking_0_1_lod0.glb | 2748252 | 25107 / 25107 | 2734476 | +0.50 | 11 |
| peking_0_1_lod1.glb | 1965484 | 14099 / 14099 | 1668700 | +17.79 | 11 |
| peking_0_1_lod2.glb | 1182840 | 6284 / 6284 | 957568 | +23.53 | 9 |
| peking_0_2_lod0.glb | 2394196 | 20968 / 20968 | 2370916 | +0.98 | 10 |
| peking_0_2_lod1.glb | 1747496 | 11847 / 11847 | 1483076 | +17.83 | 10 |
| peking_0_2_lod2.glb | 1081708 | 5295 / 5295 | 885164 | +22.20 | 8 |
| peking_0_3_lod0.glb | 1887908 | 15137 / 15137 | 1860480 | +1.47 | 11 |
| peking_0_3_lod1.glb | 1248136 | 7343 / 7343 | 1147608 | +8.76 | 9 |
| peking_0_3_lod2.glb | 670876 | 3225 / 3225 | 530532 | +26.45 | 7 |
| peking_0_4_lod0.glb | 2255184 | 19407 / 19407 | 2228968 | +1.18 | 10 |
| peking_0_4_lod1.glb | 1644960 | 10874 / 10874 | 1386492 | +18.64 | 10 |
| peking_0_4_lod2.glb | 1031056 | 4886 / 4886 | 841524 | +22.52 | 8 |
| peking_0_5_lod0.glb | 2828588 | 25192 / 25600 | 2746496 | +2.99 | 10 |
| peking_0_5_lod1.glb | 2192072 | 16464 / 16872 | 1638524 | +33.78 | 10 |
| peking_0_5_lod2.glb | 1434256 | 8093 / 8501 | 694232 | +106.60 | 10 |
| peking_1_0_lod0.glb | 1513248 | 15461 / 15461 | 2009820 | -24.71 | 5 |
| peking_1_0_lod1.glb | 1085288 | 9575 / 9575 | 1330396 | -18.42 | 5 |
| peking_1_0_lod2.glb | 601776 | 4316 / 4316 | 642340 | -6.32 | 4 |
| peking_1_1_lod0.glb | 3060664 | 28591 / 28831 | 3045068 | +0.51 | 11 |
| peking_1_1_lod1.glb | 2206300 | 16717 / 16957 | 1837748 | +20.05 | 11 |
| peking_1_1_lod2.glb | 1107632 | 7479 / 7719 | 810924 | +36.59 | 8 |
| peking_1_2_lod0.glb | 3098568 | 28482 / 28482 | 3086684 | +0.39 | 12 |
| peking_1_2_lod1.glb | 2276312 | 16983 / 16983 | 1968088 | +15.66 | 12 |
| peking_1_2_lod2.glb | 1434816 | 7616 / 7616 | 1132880 | +26.65 | 11 |
| peking_1_3_lod0.glb | 3510768 | 38352 / 48706 | 3529220 | -0.52 | 11 |
| peking_1_3_lod1.glb | 1991404 | 15714 / 26068 | 2132076 | -6.60 | 10 |
| peking_1_3_lod2.glb | 1247492 | 6611 / 16965 | 1204628 | +3.56 | 10 |
| peking_1_4_lod0.glb | 5625848 | 66372 / 66372 | 5571752 | +0.97 | 8 |
| peking_1_4_lod1.glb | 3122928 | 29655 / 29655 | 3099960 | +0.74 | 7 |
| peking_1_4_lod2.glb | 1674164 | 12550 / 12550 | 1227404 | +36.40 | 7 |
| peking_1_5_lod0.glb | 5095388 | 53248 / 55440 | 5243784 | -2.83 | 8 |
| peking_1_5_lod1.glb | 3541912 | 33790 / 35982 | 2935108 | +20.67 | 8 |
| peking_1_5_lod2.glb | 1904296 | 15644 / 17836 | 1282380 | +48.50 | 7 |
| peking_2_0_lod0.glb | 1107888 | 11199 / 11199 | 2124924 | -47.86 | 6 |
| peking_2_0_lod1.glb | 716360 | 5869 / 5869 | 1361020 | -47.37 | 5 |
| peking_2_0_lod2.glb | 438372 | 2594 / 2594 | 690776 | -36.54 | 5 |
| peking_2_1_lod0.glb | 2675716 | 22390 / 25576 | 2608268 | +2.59 | 13 |
| peking_2_1_lod1.glb | 2065972 | 13959 / 17145 | 1656500 | +24.72 | 13 |
| peking_2_1_lod2.glb | 1242916 | 6745 / 9931 | 806932 | +54.03 | 11 |
| peking_2_2_lod0.glb | 3031708 | 28558 / 28558 | 3019480 | +0.40 | 12 |
| peking_2_2_lod1.glb | 2111604 | 15438 / 15438 | 1908112 | +10.66 | 12 |
| peking_2_2_lod2.glb | 1157676 | 6834 / 6834 | 1104832 | +4.78 | 10 |
| peking_2_3_lod0.glb | 4240504 | 48107 / 58977 | 4250476 | -0.23 | 10 |
| peking_2_3_lod1.glb | 2399812 | 20836 / 31706 | 2463552 | -2.59 | 9 |
| peking_2_3_lod2.glb | 1240040 | 8898 / 19768 | 1070160 | +15.87 | 8 |
| peking_2_4_lod0.glb | 5909912 | 68578 / 68578 | 6042144 | -2.19 | 11 |
| peking_2_4_lod1.glb | 3089216 | 30151 / 30151 | 3318000 | -6.90 | 10 |
| peking_2_4_lod2.glb | 1450964 | 12682 / 12682 | 1414828 | +2.55 | 9 |
| peking_2_5_lod0.glb | 4651732 | 51668 / 52722 | 4825220 | -3.60 | 10 |
| peking_2_5_lod1.glb | 2875816 | 27850 / 28904 | 2728868 | +5.38 | 8 |
| peking_2_5_lod2.glb | 1522012 | 12616 / 13670 | 1231744 | +23.57 | 8 |
| peking_3_0_lod0.glb | 1797508 | 19244 / 19244 | 2142996 | -16.12 | 7 |
| peking_3_0_lod1.glb | 1161724 | 10439 / 10439 | 1369756 | -15.19 | 6 |
| peking_3_0_lod2.glb | 652708 | 4640 / 4640 | 629856 | +3.63 | 6 |
| peking_3_1_lod0.glb | 2543016 | 24854 / 24854 | 2723000 | -6.61 | 10 |
| peking_3_1_lod1.glb | 1775180 | 14107 / 14107 | 1653116 | +7.38 | 10 |
| peking_3_1_lod2.glb | 992084 | 6280 / 6280 | 744052 | +33.34 | 8 |
| peking_3_2_lod0.glb | 3462816 | 37709 / 37709 | 3642824 | -4.94 | 10 |
| peking_3_2_lod1.glb | 1989992 | 18634 / 18634 | 2075260 | -4.11 | 8 |
| peking_3_2_lod2.glb | 1116724 | 8119 / 8119 | 1103156 | +1.23 | 8 |
| peking_3_3_lod0.glb | 3128052 | 29884 / 29884 | 3117664 | +0.33 | 11 |
| peking_3_3_lod1.glb | 2107380 | 16674 / 16674 | 1863708 | +13.07 | 10 |
| peking_3_3_lod2.glb | 1085760 | 7398 / 7398 | 811420 | +33.81 | 8 |
| peking_3_4_lod0.glb | 3773984 | 39113 / 39113 | 3763608 | +0.28 | 11 |
| peking_3_4_lod1.glb | 2279072 | 19592 / 19592 | 2141300 | +6.43 | 9 |
| peking_3_4_lod2.glb | 1347732 | 8548 / 8548 | 1137384 | +18.49 | 9 |
| peking_3_5_lod0.glb | 3098392 | 32084 / 32084 | 3278388 | -5.49 | 10 |
| peking_3_5_lod1.glb | 2060040 | 17479 / 17479 | 1931760 | +6.64 | 10 |
| peking_3_5_lod2.glb | 1109472 | 7735 / 7735 | 1056912 | +4.97 | 8 |
