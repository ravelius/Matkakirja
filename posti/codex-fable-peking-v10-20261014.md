## 2026-10-13T21:36:13.778141+00:00 — CODEX → PÄÄTOIMITTAJA: Peking v10, erä 5/5, tekninen toimitus

Paketti `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v10-20261014`. 24 laattaa 550 × 500 m × 3 LOD = 72 GLB. ENU Taihedian 39.915896/116.390814, 37.9 m ellipsoidista. Todelliset GLB-tavut **111289988**, v4 149387500 eli **-25.502%**. Vaiheiden 2–4 kokonaisraja 164326250 tavua; myös viimeinen vaihe mahtuu siihen. Manifesti SHA256 `b09d1c5ea0df8039de0b89ad2b2101dc5da337ea8d8e9c6eb3f87ef6636c42be`. Kaikkien pakettitiedostojen tavut ja SHA256 varmennettu.

**Vaihe 5/5 – puut, pinnat ja Päätoimittajan neljä korjausta (#241).** V7/2, v8/3 ja v9/4 on hyväksytty välivaiheina: `a86ce15211e9f9ce775b2c6c6f485a3883aad1ae`, `posti/fable-codex-peking-v7-v9-hyvaksynta-20261014.md`. Alkuperäiset toimituspaketit säilyvät muuttumattomina. V10:n hyväksyntä on vielä Päätoimittajalla.

- **Puusto:** neljä jaettua, 96 kolmion leveää ja pyöreää lehtipuulatvusta, epäsäännöllinen kehän muoto ja sileä varjostus. LOD0 7 992 puuta, LOD1 5 823, LOD2 3 292. LOD0:ssa 213 OSM-puupaikkaa, 7 200 arvioitua puisto-/katupuuta ja 579 arvioitua pihapuuta. OSM-pisteet säilyvät kaikissa LOD-tasoissa. Muu puusto ohenee etäisyystasoilla deterministisesti. Paikat suodatettu Karttasepän S2-ortokuvan kasvillisuuden, vesipolygonien, katujen ja rakennuspohjien avulla. Latvus ei ole enää ristikkäinen vinoneliö. Lajit ovat yleisiä lehtipuun hahmoja; yksittäisten puiden lajia, korkeutta tai nykyistä sijaintia ei väitetä mitatuksi.
- **Todellinen maasto GLB:ssä:** koko vesialueiden ulkopuolinen 5 774 500,93 m² maapinta, myös Beihain saari, tulee toimitettavista GLB-tiedostoista. Harmaa esikatselutausta ja erillinen vanha saaren pohjaverkko ovat poissa. Geometria 25 m, fyysinen GLO-30-lähde 30 m; 5 m kuva on uudelleennäytteistys. QA tarkistaa vesirajat, puuttuvat alueet, päällekkäisyydet, laattasaumat ja puun rungon korkeuden maaston tasossa. S2:n fyysinen tarkkuus 10 m, näytekuva 2 m. Tämä ei ole mittausmalli: GLO-30:n puistoissa voi olla latvuston vaikutusta.
- **Pinnat:** palatsinpihat ja Taivaallisen rauhan aukio käyttävät nykyistä kivilaattapintaa; puistojen polut ja hutong-kujat harmaata pintaa, kadut asfalttisävyä. Katujen ja polkujen XY on OSM/Karttaseppä, maaston päälle nostettuna 4/7 cm. Kaistoista johdetut katujen leveydet, aukiolle ja palatsinpihalle valitut rajat sekä pintatyypin yleistykset ovat A. Seitsemästä Karttasepän siltatietueesta viisi tässä rajauksessa leikkaavaa vesijännettä toimitetaan yksinkertaisina kansipintoina; kannen korkeus on johdettu A. Tunnelit eivät muutu maanpäällisiksi teiksi. Tavalliset kadut/polut eivät peitä vesipolygoneja. OSM:n pienet viivavesiuomat eivät ole uusia mitattuja järvipintoja.
- **Guanlitai:** OSM `way/257208023`, `024`, `025`, `026` (`观礼台`) korvattu neljällä matalalla, teksturoimattomalla porrasmassalla. Lähteen paikka ja laajuus säilyvät. Korkeus 3 m ja neljä tasoa ovat A. Ikkunaruudukot ja toimistotalojen hahmo poistuvat. Katsomoista ei tehty yksityiskohtaista modernin teoksen jäljennöstä. QA varmistaa jokaisen kerran jokaisessa LOD-tasossa, korkeuden, laajuuden ja ikkunatekstuurin puuttumisen.
- **Portin takana:** Zhongshan `relation/9054321` ja itäinen puisto `relation/9532091` säilyvät OSM-puistoina. Taimiaon vanhat hallit/käytäväpohjat (`way/60540203`, `684772276`, `684772333`, `685256681`, `685264549`, `685264567`) sekä pitkät porttikäytävät (`637953172`, `637953173`, `638170121`, `638170124`) korjattu punaseinäisiksi tiilikattoisiksi halleiksi. Kellertävä katto perustuu lähialueen OSM:n `roof:colour=#FB994D` / kattotiili-osiin. Nimettömien osien luokittelu ja aiemmat korkeusluvut ovat A. Virheellinen Taimiaon pihalle osuva `3dglobfp/8739` toimistomassa poistettu. OSM:n nimeämä Zhongshanin konserttisali `way/149216919` säilyy yksinkertaisena, teksturoimattomana modernina massana.
- **Keisarikattojen väri:** palautettu nykyisestä tekstuuriaineistosta `kulta_katto_v3.jpg`, ennen myöhempiä v4/v5-tummennuksia, ja lasitetulle katolle pienempi karheus. Sama aurinko, taivas ja valotus v9/v10-kuvissa. Balon Greyjoyn Taihedian-kuvat CC0 ja Tiananmenin CC BY -kuva katsottu uudelleen; niiden valo ja vuodenaika ovat omansa, joten ne ovat rakenne-/sävyviitteitä eivätkä identtisen valon mittauksia. QA:n keskenään vertailtavat mallikuvat käyttävät täsmälleen samaa valoa. Ei uusia tekoälytekstuurikuvia.
- **Harmaat tiilikatot:** kiinteän valon diagnoosissa hutong-atlas oli L=93,68 ja samat S2-pikselit L=120,67; muu harmaa tiili L=101,34 / 125,67. Nykyisten harmaiden kattotekstuurien sRGB-kirkkautta nostettu 25 %, atlas-seinien rakenne ja UV-solut säilyvät. Kujien liian kirkasta pintaa sekä maan/katujen sävyjä korjattu. Lähdekuvan 10 m pikselit sisältävät sekoittuneita pintoja; tulos ei ole väite mitatusta materiaalin heijastuksesta.
- **LOD2:n pienet katot:** uuden halligeometrian kanssa 10 % kattokolmioiden säilytys pienensi yhden laatan harmaita kattoja liikaa. LOD2 säilyttää nyt 15 % kattokolmioista, muut ryhmät ja LOD0/LOD1 ennallaan. Kaikkien 24 laatan harmaiden kattojen projektio tarkistetaan v8:aan nähden samalla 95 % vähimmäisrajalla. Poikkeavat laattakohtaiset kolmio-, instanssi-, tekstuuri- ja tavumäärät on eritelty `qa/budget-texture-QA-v10.json`-tiedostossa. Maasto/kadut ja jaetut puut lisäävät piirrettäviä instanssikolmioita mutta vähentävät tallennettua geometriaa.

**QA:** alkuperäinen ortokuvaportti, sama vesimaski ja kiinteän valon yhteiset pikselit tarkistetaan alkuperäisillä rajoilla ja valolla. Lisäksi kohde-/materiaalitunnisteisiin ja alkuperäiseen maaston korkeuteen perustuva erottelu näyttää erikseen maan, puut ja rakennukset. Se ei korvaa alkuperäisen portin tulosta. Ehdokkaiden 1–3 hylkytulokset säilyvät työ- ja QA-historiassa; lopullisen ehdokkaan numero ja SHA256 ovat paketissa. Avoimet lähderajat kirjattu yllä. V7–v9 hyväksytty vain välivaiheina, v10 odottaa Päätoimittajan lopullista katselmusta.

**Peking pysyy poissa pelistä.** Ei Unity-kytkentää, R2-toimitusta, main-mergeä, peliversion nostoa tai julkaisua. Omistajan päätös tauon päättymisestä ja Clauden myöhempi kytkentä ovat erillisiä toimia.


Kuvat: `esikatselu/tarkistusarkki.jpg`, kuusi yksittäistä kameraa ja `ortovertailu/ennen-jalkeen-orto.jpg` (ennen|jälkeen|orto). Lähde/data/tekstuurit jäädytetty ennen buildia; `source-snapshot.json`, `QA.json`, `qa/`, `LAHTEET.md` ja `referenssit/` mukana. Historialliset hylkytulokset säilytetty.

V7–v9 on hyväksytty välivaiheina. V10:n vastaanotto ja omistajan valtuutuksella tehtävä Päätoimittajan hyväksyntä ovat **odottavia**. Kaikki viisi mallinnusvaihetta on teknisesti toimitettu. Peli-integraatio ja julkaisu ovat epätosia.

### Laattakohtainen budjetti

Kolmiot: uniikki geometria / kaikkien instanssien piirrettävä määrä. V4-poikkeaman peruste: materiaaliryhmittäinen LOD säilyttää pienet katot; lähteistetyt vesi- ja perintöosat sekä vaiheessa 5 maasto, kadut ja jaetut puut lisäävät geometriaa. Tekstuurit ovat nykykuvia ja proseduraalinen atlas, vaiheessa 5 lähdepohjaisesti sävykorjattuina; koko ja kuvamäärät QA:ssa.

| GLB | Tavut | Kolmiot uniikki / instanssit | v4-tavut | Δtavut% | Kuvat |
|---|---:|---:|---:|---:|---:|---:|
| peking_0_0_lod0.glb | 2654416 | 33149 / 43997 | 3521804 | -24.63 | 6 |
| peking_0_0_lod1.glb | 1286000 | 14338 / 22114 | 1983036 | -35.15 | 6 |
| peking_0_0_lod2.glb | 873212 | 8777 / 12425 | 805648 | +8.39 | 6 |
| peking_0_1_lod0.glb | 1833036 | 14369 / 38273 | 2734476 | -32.97 | 11 |
| peking_0_1_lod1.glb | 1195232 | 6747 / 23739 | 1668700 | -28.37 | 10 |
| peking_0_1_lod2.glb | 1013956 | 4541 / 14813 | 957568 | +5.89 | 10 |
| peking_0_2_lod0.glb | 1620560 | 11245 / 46189 | 2370916 | -31.65 | 10 |
| peking_0_2_lod1.glb | 1082516 | 5036 / 29516 | 1483076 | -27.01 | 9 |
| peking_0_2_lod2.glb | 924612 | 3309 / 16941 | 885164 | +4.46 | 9 |
| peking_0_3_lod0.glb | 1639076 | 11768 / 28472 | 1860480 | -11.90 | 11 |
| peking_0_3_lod1.glb | 889716 | 5186 / 17378 | 1147608 | -22.47 | 9 |
| peking_0_3_lod2.glb | 689328 | 3278 / 10670 | 530532 | +29.93 | 8 |
| peking_0_4_lod0.glb | 1575240 | 11391 / 27519 | 2228968 | -29.33 | 10 |
| peking_0_4_lod1.glb | 1060196 | 5406 / 18558 | 1386492 | -23.53 | 9 |
| peking_0_4_lod2.glb | 917308 | 3646 / 11038 | 841524 | +9.01 | 9 |
| peking_0_5_lod0.glb | 1572840 | 9442 / 69754 | 2746496 | -42.73 | 10 |
| peking_0_5_lod1.glb | 962228 | 5212 / 47860 | 1638524 | -41.27 | 8 |
| peking_0_5_lod2.glb | 816772 | 3982 / 26374 | 694232 | +17.65 | 8 |
| peking_1_0_lod0.glb | 898612 | 8514 / 19362 | 2009820 | -55.29 | 6 |
| peking_1_0_lod1.glb | 661324 | 5322 / 13770 | 1330396 | -50.29 | 6 |
| peking_1_0_lod2.glb | 580808 | 4367 / 8783 | 642340 | -9.58 | 6 |
| peking_1_1_lod0.glb | 2015632 | 15669 / 47973 | 3045068 | -33.81 | 12 |
| peking_1_1_lod1.glb | 1196304 | 8279 / 31559 | 1837748 | -34.90 | 10 |
| peking_1_1_lod2.glb | 1012004 | 6103 / 19399 | 810924 | +24.80 | 10 |
| peking_1_2_lod0.glb | 1956116 | 13974 / 65526 | 3086684 | -36.63 | 13 |
| peking_1_2_lod1.glb | 1243744 | 7016 / 44168 | 1968088 | -36.80 | 12 |
| peking_1_2_lod2.glb | 1044520 | 4987 / 23323 | 1132880 | -7.80 | 12 |
| peking_1_3_lod0.glb | 3379404 | 36506 / 65292 | 3529220 | -4.25 | 11 |
| peking_1_3_lod1.glb | 1935320 | 15054 / 39712 | 2132076 | -9.23 | 11 |
| peking_1_3_lod2.glb | 1441488 | 8924 / 28014 | 1204628 | +19.66 | 11 |
| peking_1_4_lod0.glb | 4645124 | 54303 / 93375 | 5571752 | -16.63 | 9 |
| peking_1_4_lod1.glb | 2417216 | 21642 / 51402 | 3099960 | -22.02 | 9 |
| peking_1_4_lod2.glb | 1485192 | 12599 / 31223 | 1227404 | +21.00 | 8 |
| peking_1_5_lod0.glb | 2236840 | 19010 / 149362 | 5243784 | -57.34 | 8 |
| peking_1_5_lod1.glb | 1351324 | 9136 / 102816 | 2935108 | -53.96 | 7 |
| peking_1_5_lod2.glb | 1020400 | 6246 / 53558 | 1282380 | -20.43 | 7 |
| peking_2_0_lod0.glb | 968112 | 9499 / 15355 | 2124924 | -54.44 | 7 |
| peking_2_0_lod1.glb | 664916 | 5345 / 10145 | 1361020 | -51.15 | 7 |
| peking_2_0_lod2.glb | 571424 | 4082 / 7826 | 690776 | -17.28 | 7 |
| peking_2_1_lod0.glb | 1791808 | 12603 / 41997 | 2608268 | -31.30 | 12 |
| peking_2_1_lod1.glb | 1235408 | 7693 / 31711 | 1656500 | -25.42 | 11 |
| peking_2_1_lod2.glb | 1112520 | 6284 / 23102 | 806932 | +37.87 | 11 |
| peking_2_2_lod0.glb | 2298012 | 19819 / 47083 | 3019480 | -23.89 | 13 |
| peking_2_2_lod1.glb | 1377804 | 9629 / 29597 | 1908112 | -27.79 | 12 |
| peking_2_2_lod2.glb | 1137684 | 6675 / 17331 | 1104832 | +2.97 | 12 |
| peking_2_3_lod0.glb | 3789512 | 42642 / 69256 | 4250476 | -10.84 | 11 |
| peking_2_3_lod1.glb | 2103036 | 17628 / 40018 | 2463552 | -14.63 | 11 |
| peking_2_3_lod2.glb | 1342792 | 10509 / 27811 | 1070160 | +25.48 | 10 |
| peking_2_4_lod0.glb | 4908932 | 56867 / 89699 | 6042144 | -18.76 | 11 |
| peking_2_4_lod1.glb | 2350868 | 22377 / 45513 | 3318000 | -29.15 | 11 |
| peking_2_4_lod2.glb | 1591344 | 12908 / 26636 | 1414828 | +12.48 | 11 |
| peking_2_5_lod0.glb | 3068768 | 32003 / 103041 | 4825220 | -36.40 | 10 |
| peking_2_5_lod1.glb | 1634776 | 14051 / 62625 | 2728868 | -40.09 | 9 |
| peking_2_5_lod2.glb | 1193692 | 8763 / 35929 | 1231744 | -3.09 | 9 |
| peking_3_0_lod0.glb | 1242732 | 12361 / 39913 | 2142996 | -42.01 | 7 |
| peking_3_0_lod1.glb | 754232 | 5818 / 26554 | 1369756 | -44.94 | 7 |
| peking_3_0_lod2.glb | 583348 | 3817 / 15433 | 629856 | -7.38 | 7 |
| peking_3_1_lod0.glb | 1656468 | 14658 / 32706 | 2723000 | -39.17 | 10 |
| peking_3_1_lod1.glb | 1043524 | 7359 / 20511 | 1653116 | -36.88 | 9 |
| peking_3_1_lod2.glb | 873432 | 5211 / 12795 | 744052 | +17.39 | 9 |
| peking_3_2_lod0.glb | 2626596 | 27812 / 51524 | 3642824 | -27.90 | 10 |
| peking_3_2_lod1.glb | 1393524 | 12039 / 29895 | 2075260 | -32.85 | 9 |
| peking_3_2_lod2.glb | 1038764 | 7421 / 17981 | 1103156 | -5.84 | 9 |
| peking_3_3_lod0.glb | 2043156 | 17246 / 36830 | 3117664 | -34.47 | 11 |
| peking_3_3_lod1.glb | 1095680 | 7999 / 21727 | 1863708 | -41.21 | 9 |
| peking_3_3_lod2.glb | 886472 | 5300 / 13268 | 811420 | +9.25 | 9 |
| peking_3_4_lod0.glb | 2801460 | 27601 / 49489 | 3763608 | -25.56 | 11 |
| peking_3_4_lod1.glb | 1559456 | 11710 / 27646 | 2141300 | -27.17 | 10 |
| peking_3_4_lod2.glb | 1212672 | 7078 / 17638 | 1137384 | +6.62 | 10 |
| peking_3_5_lod0.glb | 2062612 | 19927 / 46711 | 3278388 | -37.08 | 10 |
| peking_3_5_lod1.glb | 1198508 | 9259 / 28843 | 1931760 | -37.96 | 9 |
| peking_3_5_lod2.glb | 948328 | 6120 / 17736 | 1056912 | -10.27 | 9 |
