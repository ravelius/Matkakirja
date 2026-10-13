## 2026-10-13T20:50:57.455608+00:00 — CODEX → PÄÄTOIMITTAJA: Peking v8, erä 3/5, tekninen toimitus

Paketti `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v8-20261013`. 24 laattaa550×500m ×3LOD=72GLB. ENU Taihedian39.915896/116.390814, 37.9m ellipsoidista. Todelliset GLB-tavut **154537608**, v4 149387500 eli **+3.447%**. Vaiheiden2–4 kokonaisraja164326250tavua. Manifesti SHA256 `0f6a75237f49edcb944f5c140d4a931ef3af227f22a20ad5b0a5026a63f63a09`. Kaikkien pakettitiedostojen tavut ja SHA256 varmennettu.

V8, erä3/5: Tiananmen, Jingshanin viisi paviljonkia ja Beihain valkoinen stupa uusittu nimetyistä OSM-tunnisteista Sisältökirjurin V/A-mittojen ja katsottujen CC0/CC BY-valokuvien perusteella. Tiananmenissa viisi todellista läpi-aukeavaa kaaria, 60 jaetun meshin pylvästä, kaksinkertainen xieshan-katto ja144 kaideinstanssia. Päärakennuksen pohja57.14×20.97m; kokonaiskorkeus34.7m kattoharjan ulokkeet mukaan lukien. Porttiaukkojen leveydet ja13m jalusta ovat A-arvioita; keskiaukon8.82m korkeus on lähdemerkintä V. Kaiteet ovat kerran sijoitettuja pisteitä myös x=0-laattarajan yli.

Wanchun: avoimet20+12 pylvästä, kolme neliönmuotoista räystäskerrostasoa, keltainen katto ja vihreä reunus, korkeus15.38m. 17.2m katon ulkoleveys on johdettu296.5m² pinta-alasta (A). Neljä sivupaviljonkia: kaksi pyöreää sinisellä katolla ja violetilla reunalla, h11.75m; kaksi kahdeksankulmaista vihreällä katolla ja keltaisella reunalla, h12.05m. Pylväitä16 per sivupaviljonki, kaksi kehää. Sisältökirjurin vaihtoehtoiset11.3m ja14.2m lähdearvot säilytetty, eikä valittuja VisitBeijing-lukuja kutsuta maastomittauksiksi. Samanniminen OSM way/685673149 Kielletyssä kaupungissa on eri kohde kuin Jingshanin way/26390235; sille ei enää sovelleta puistopaviljongin mittoja.

Beihain stupa: lovettu neliöjalusta, valkoinen pyöreä runko, neliömuotoinen yläjalusta,13 jaetun meshin rengasta ja yksinkertainen kullattu yläosa; kokonaiskorkeus35.9m. Jalustan6m korkeus on A; valittu17m sivumitta ja lähteen vaihtoehto18.2m kirjattu. Lähdevalokuvan kirjoituksia tai uskonnollisia reliefejä ei kopioitu. Beihain saaren65163.10m² pinta leikattu täsmälleen OSM-vesirenkaan saariaukosta ja laattarajoihin;282 kolmion maasto tulee todellisesta GLO-30-maa-aineistosta25m ruudussa. Maasto ei ole mitattu ja saaren puuston jääminen GLO-30-pintaan on lähteen tunnettu rajoitus. Vallihauta ja järvet sekä saariaukot säilyvät v7:n mukaisina GLB:ssä.

Maamerkkien päämeshit sekä pylväät, renkaat ja kaiteet säilyvät samoina kolmessa LOD:ssa. Muun kaupungin materiaaliryhmittäinen LOD säilyttää katot. 72GLB:tä,154537608tavua = v4+3.4475%, alle164326250tavun rajan. Kaikkien72 GLB:n sisäisten kuvien627 esiintymän todelliset mitat, tavut ja hashit, sekä per-laatan kolmio-/tekstuuri-/tavupoikkeamat on kirjattu qa/budget-texture-QA-v8.json:ään. Perusteluna jaettujen lähdeosien lisäys ja pienten kattojen säilyminen. Alkuperäinen ortoportti, symmetrinen OSM-vesimaski ja kiinteä0.65 yhteisvalodiagnoosi läpäisevät; samat valot, rajat ja maantieteellinen maski myös v4/v7-vertailuille.

V7:n paketti säilyy muuttumattomana. Suojatut modernit rakennukset ovat samat yksinkertaiset tekstuurittomat massat. Ei Mao-kuvaa tai tyhjää kehystä, tekstiä, logoja tai lippuja malleissa. Ei Google/Baidu/Street View/CMAB-aineistoa tai uusia AI-tekstuureja. Muun alueen harmaa maa on edelleen esikatselutausta; aukion ja katujen pinnat sekä puusto vaiheessa5. Hutongien atlas ja vaihtelu vaiheessa4. PT:n hyväksyntä odottaa; Peking pysyy poissa pelistä.


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
| peking_0_5_lod0.glb | 2704432 | 25192 / 25600 | 2746496 | -1.53 | 9 |
| peking_0_5_lod1.glb | 2066860 | 16464 / 16872 | 1638524 | +26.14 | 9 |
| peking_0_5_lod2.glb | 1309132 | 8093 / 8501 | 694232 | +88.57 | 9 |
| peking_1_0_lod0.glb | 1744976 | 15461 / 15461 | 2009820 | -13.18 | 6 |
| peking_1_0_lod1.glb | 1315840 | 9575 / 9575 | 1330396 | -1.09 | 6 |
| peking_1_0_lod2.glb | 832184 | 4316 / 4316 | 642340 | +29.56 | 5 |
| peking_1_1_lod0.glb | 2936520 | 28591 / 28831 | 3045068 | -3.56 | 10 |
| peking_1_1_lod1.glb | 2081336 | 16717 / 16957 | 1837748 | +13.25 | 10 |
| peking_1_1_lod2.glb | 1173020 | 7479 / 7719 | 810924 | +44.65 | 8 |
| peking_1_2_lod0.glb | 2974440 | 28482 / 28482 | 3086684 | -3.64 | 11 |
| peking_1_2_lod1.glb | 2150728 | 16983 / 16983 | 1968088 | +9.28 | 11 |
| peking_1_2_lod2.glb | 1309560 | 7616 / 7616 | 1132880 | +15.60 | 10 |
| peking_1_3_lod0.glb | 3576972 | 38352 / 48706 | 3529220 | +1.35 | 11 |
| peking_1_3_lod1.glb | 2056624 | 15714 / 26068 | 2132076 | -3.54 | 10 |
| peking_1_3_lod2.glb | 1313108 | 6611 / 16965 | 1204628 | +9.01 | 10 |
| peking_1_4_lod0.glb | 5501684 | 66372 / 66372 | 5571752 | -1.26 | 7 |
| peking_1_4_lod1.glb | 2997784 | 29655 / 29655 | 3099960 | -3.30 | 6 |
| peking_1_4_lod2.glb | 1549100 | 12550 / 12550 | 1227404 | +26.21 | 6 |
| peking_1_5_lod0.glb | 5161628 | 53248 / 55440 | 5243784 | -1.57 | 8 |
| peking_1_5_lod1.glb | 3607152 | 33790 / 35982 | 2935108 | +22.90 | 8 |
| peking_1_5_lod2.glb | 1969540 | 15644 / 17836 | 1282380 | +53.58 | 7 |
| peking_2_0_lod0.glb | 1339632 | 11199 / 11199 | 2124924 | -36.96 | 7 |
| peking_2_0_lod1.glb | 947088 | 5869 / 5869 | 1361020 | -30.41 | 6 |
| peking_2_0_lod2.glb | 669608 | 2594 / 2594 | 690776 | -3.06 | 6 |
| peking_2_1_lod0.glb | 2551560 | 22390 / 25576 | 2608268 | -2.17 | 12 |
| peking_2_1_lod1.glb | 1940872 | 13959 / 17145 | 1656500 | +17.17 | 12 |
| peking_2_1_lod2.glb | 1283336 | 6745 / 9931 | 806932 | +59.04 | 11 |
| peking_2_2_lod0.glb | 2907580 | 28558 / 28558 | 3019480 | -3.71 | 11 |
| peking_2_2_lod1.glb | 1986612 | 15438 / 15438 | 1908112 | +4.11 | 11 |
| peking_2_2_lod2.glb | 1224084 | 6834 / 6834 | 1104832 | +10.79 | 10 |
| peking_2_3_lod0.glb | 4306716 | 48107 / 58977 | 4250476 | +1.32 | 10 |
| peking_2_3_lod1.glb | 2464912 | 20836 / 31706 | 2463552 | +0.06 | 9 |
| peking_2_3_lod2.glb | 1471660 | 8898 / 19768 | 1070160 | +37.52 | 9 |
| peking_2_4_lod0.glb | 5976120 | 68578 / 68578 | 6042144 | -1.09 | 11 |
| peking_2_4_lod1.glb | 3154820 | 30151 / 30151 | 3318000 | -4.92 | 10 |
| peking_2_4_lod2.glb | 1681828 | 12682 / 12682 | 1414828 | +18.87 | 10 |
| peking_2_5_lod0.glb | 4718000 | 51668 / 52722 | 4825220 | -2.22 | 10 |
| peking_2_5_lod1.glb | 2941200 | 27850 / 28904 | 2728868 | +7.78 | 8 |
| peking_2_5_lod2.glb | 1587296 | 12616 / 13670 | 1231744 | +28.87 | 8 |
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
