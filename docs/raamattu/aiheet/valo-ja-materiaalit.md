# valo-ja-materiaalit · vastuu VS · tarkistettu 20.11.2026

TAVOITE: Maailma näyttää valokuvalta oikeasta paikasta elokuvan lämmöllä. Valo ja sää elävät itsestään, pelaajan säätämättä.

SÄÄNNÖT:
1. Valolla on näkyvä lähde: päivällä aurinko ja taivas, yöllä katu- ja ikkunavalot, linnassa liekit ja kuu, museossa katon kohdevalo. Noston säteet himmeinä, valo ja varjot täysinä. [R-2.180] [R-2.132] [P-261117-117]
2. Omien mallien pinnat ovat valokuvapohjaisia, eivät toistuvia; sävy ja kirkkaus oikean maailman, kontrasti ja terävyys ympäristön mukaan; normaali- ja karheuskartta. Pariisin kaikilla nähtävyyksillä kuten Riemukaarella: kiven saumat ja sävyvaihtelu, katoilla liuske ja sinkki, Eiffelillä rauta. [R-2.93] [R-2.181] [P-261118-32]
3. Omien mallien valo, varjot ja AO leivotaan; malli tuodaan valaisemattomana. Museossa ei reaaliaikaisia varjoja, SSAO:ta eikä GI:tä; juoksupelissä elävä varjo vain pelaajan hahmolla. Kartalla nähtävyyksien varjot leivotaan; 2D-merkin varjo vain maata koskettavien osien alla. [R-2.93] [R-2.133] [R-2.177] [P-261111-2] [R-2.167]
4. Heijastus kevyimmällä hyvännäköisellä tavalla; raskas vain uusimmille. [R-2.133]
5. Kuvalla on yksi elokuvamainen jälkikäsittely ilman säätimiä: syvemmät varjot, lämmin valo ja viileät varjot, maltillinen kylläisyys, filmirae, vinjetti, hento hehku, pehmennys kaukana. Kuumailmapallossa täysi, kartalla kevyt ja terävöity ilman hehkua, juoksupelissä ilman sävykäyrää. [R-2.102] [P-261112-16]
6. Juoksupelin sävyt ja kontrasti havainnekuvan tasolla: mustat eivät liian tummia, värit eivät liian voimakkaita. [P-261024-2]
7. Museon kohdevalon keila on tasainen ilman kuumaa kohtaa eikä heijastu teoksesta; seinä terävä pysähdysetäisyydeltä. Kehysten, patsaiden ja nurkkien varjot pehmeinä, leivottuina. [R-2.132] [R-2.133]
8. Säätä ei valita; oletus selkeä, harvoin lyhyt kuuro pilvien tummuessa, joskus ukkonen ja märät kiiltävät kadut. Hosteet kevyitä. [R-2.99]
9. Taivas (Pariisin maalattu taivas kaikkialla) ja kaupunki elävät kevyesti: pilvet, usva, liput, savu, välke, linnut. Kaupungissa aina selvä valon suunta, talojen varjot ja pilvien lomasta isot valon ja varjon läikät; pallokierroksen pysäkillä kohdevalo kuin nostossa. [R-2.100] [P-261118-29] [P-261118-30] [P-261118-35] [P-261120-7]
10. Yö on loppuilta: taivaanrannassa purppuraa, katu-, mainos- ja ikkunavalot; julkisivut valaistaan pohjapiirroksen mukaan. Kuuron jälkeen voi näkyä sateenkaari. [R-2.101]
11. Pinnat generoidaan vain kaupallisen käytön sallivilla malleilla. [R-2.95]

EI VIKA:
- Eiffel-tornissa ei omaa kultaista valoa eikä kimallusta.
- Sää vaihtuu ilman pelaajan valintaa.

TEKOTAPA:
- Valo- ja kuvapohja: docs/moduulit/yhteiset-pohjat.md. Ortokuvaportti, havainnemittari: mallit-ja-3d; pinnat: grafiikan-tuotanto; kevennys: suorituskyky-ja-muisti.
- Sävy sovitetaan pelikuvasta, todetaan laitekuvasta.
- Museon, linnan ja avaruuden valo: niiden kortit.
