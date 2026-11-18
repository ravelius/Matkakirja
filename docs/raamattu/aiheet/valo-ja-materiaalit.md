# valo-ja-materiaalit · vastuu VS · tarkistettu 17.11.2026

TAVOITE: Maailma näyttää valokuvalta oikeasta paikasta, mutta kuvassa on elokuvan lämpö. Valo ja sää elävät hiljaa itsestään, eikä pelaajan tarvitse säätää mitään.

SÄÄNNÖT:
1. Valolla on kohtauksessa näkyvä lähde: päivällä aurinko ja taivas, yöllä katu- ja ikkunavalot, linnassa liekit ja kuu, museossa katon kohdevalo. Noston auringonsäteet himmeinä, valo ja varjot täysinä. [R-2.180] [R-2.132] [P-261117-117]
2. Omien mallien pinnat ovat valokuvapohjaisia, eivät toistuvia tekstuureja; sävy ja kirkkaus oikean maailman, kontrasti ja terävyys ympäristön mukaan. Pinnalla on normaali- ja karheuskartta. [R-2.93] [R-2.181]
3. Omien mallien valo, varjot ja varjostus (AO) leivotaan, ja malli tuodaan valaisemattomana. Museossa ei reaaliaikaisia varjoja, SSAO:ta eikä GI:tä; juoksupelissä elävä varjo on vain pelaajan hahmolla. Kartalla nähtävyyksien varjot ovat leivottuja, ja 2D-merkin varjo on vain maata koskettavien osien alla. [R-2.93] [R-2.133] [R-2.177] [P-261111-2] [R-2.167]
4. Heijastus kevyimmällä hyvältä näyttävällä tavalla; raskas osa vain uusimmille laitteille. [R-2.133]
5. Kuvalla on yksi elokuvamainen jälkikäsittely ilman säätimiä: syvemmät varjot, lämmin valo ja viileät varjot, maltillinen kylläisyys, filmirae, vinjetti, hento hehku, pehmennys kaukana. Se annostellaan näkymän mukaan: kuumailmapallossa täysi, kartalla kevyt ja terävöity ilman hehkua, juoksupelissä ilman sävykäyrää. [R-2.102] [P-261112-16]
6. Juoksupelin sävyt ja kontrasti havainnekuvan tasolla: mustat eivät liian tummia, värit eivät liian voimakkaita. [P-261024-2]
7. Museossa kohdevalon keila on tasainen ilman kuumaa kohtaa eikä heijastu teoksesta, ja seinä on terävä pysähdysetäisyydeltä. Kehysten, patsaiden ja nurkkien varjot leivotaan pehmeinä. [R-2.132] [R-2.133]
8. Säätä ei valita. Oletus on selkeä; harvoin tulee lyhyt kuuro pilvien tummuessa, joskus ukkonen ja märät kiiltävät kadut. Säätehosteet ovat kevyitä. [R-2.99]
9. Taivas ja kaupunki elävät kevyesti: pilvet varjoineen, usva, liput, savu, välke vedessä, linnut. Kaupungissa on aina selvä valon suunta ja talojen varjot; pallokierroksen pysäkillä kohdevalo kuin nostossa. [R-2.100] [P-261118-29] [P-261118-30]
10. Yö on loppuilta: taivaanrannassa purppuraa, katuvalot, valomainokset ja ikkunavalot; julkisivut valaistaan pohjapiirroksen mukaan. Kuuron jälkeen voi näkyä sateenkaaren pala. [R-2.101]
11. Pintoja generoidaan vain kaupallisen käytön sallivilla malleilla. [R-2.95]

EI VIKA:
- Eiffel-tornissa ei omaa kultaista valoa eikä kimallusta.
- Sää vaihtuu ilman pelaajan valintaa.

TEKOTAPA:
- Valo- ja kuvapohja: docs/moduulit/yhteiset-pohjat.md.
- Ortokuvaportti ja havainnemittari: mallit-ja-3d. Pintojen tilaus: grafiikan-tuotanto. Kevennys: suorituskyky-ja-muisti.
- Sävy sovitetaan pelikuvasta ja todetaan laitekuvasta: muisti gltf-savy-leivotaan-tekstuuriin.
- Museon, linnan ja avaruuden oma valo: niiden kortit.
