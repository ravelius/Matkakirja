# valo-ja-materiaalit · vastuu VS · tarkistettu 12.11.2026

TAVOITE: Maailma näyttää valokuvalta oikeasta paikasta, mutta kuvassa on elokuvan lämpö. Valo ja sää elävät hiljaa itsestään, eikä pelaajan tarvitse säätää mitään.

SÄÄNNÖT:
1. Valolla on kohtauksessa näkyvä lähde: päivällä aurinko ja taivas, yöllä katu- ja ikkunavalot, linnassa liekit ja kuu, museossa katon kohdevalo. [R-2.180] [R-2.132]
2. Omien mallien pinnat ovat valokuvapohjaisia, eivät toistuvia tekstuureja; sävy ja kirkkaus oikean maailman, kontrasti ja terävyys ympäristön mukaan. Pinnalla on normaali- ja karheuskartta. [R-2.93] [R-2.181]
3. Omien mallien valo, varjot ja varjostus (AO) leivotaan, ja malli tuodaan valaisemattomana. Museossa ei käytetä reaaliaikaisia varjoja, SSAO:ta eikä Surface Cache GI:tä; juoksupelissä elävä varjo on vain pelaajan hahmolla. [R-2.93] [R-2.133] [R-2.177]
4. Heijastus tehdään kevyimmällä hyvältä näyttävällä tavalla; raskas osa vain uusimmille laitteille. [R-2.133]
5. Kuvalla on yksi elokuvamainen jälkikäsittely ilman säätimiä: syvemmät varjot ja keskisävyt, lämmin valo ja viileät varjot, maltillinen kylläisyys, kevyt filmirae, vinjetti ja hento hehku valoissa, pehmennys vain kaukana. [R-2.102]
6. Juoksupelissä sävyt ja kontrasti tehdään havainnekuvan tasolle: mustat eivät mene liian tummiksi eivätkä värit ole liian voimakkaita. Ero mitataan kuvaparista. [P-261024-2]
7. Museossa kohdevalon keila on tasainen ilman kuumaa kohtaa eikä heijastu teoksesta, ja seinä on terävä pysähdysetäisyydeltä. Kehysten, patsaiden ja nurkkien varjot leivotaan pehmeinä. [R-2.132] [R-2.133]
8. Säätä ei valita. Oletus on selkeä; harvoin tulee lyhyt kuuro pilvien tummuessa, joskus ukkonen ja märät kiiltävät kadut. Säätehosteet ovat kevyitä. [R-2.99]
9. Taivas ja kaupunki elävät kevyesti: pilvet varjoineen, usva kaukana, liput, savu, välke vedessä ja linnut. [R-2.100]
10. Yö on loppuilta: taivaanrannassa purppuraa, katuvalot, valomainokset ja ikkunavalot; julkisivut valaistaan pohjapiirroksen mukaan. Päivällä kuuron jälkeen voi näkyä pala sateenkaarta. [R-2.101]
11. Pintoja generoidaan vain kaupallisen käytön sallivilla malleilla. [R-2.95]

EI VIKA:
- Eiffel-tornissa ei ole sen omaa kultaista valaistusta eikä kimallusta.
- Sää vaihtuu ilman pelaajan valintaa.

TEKOTAPA:
- Yhteinen valo- ja kuvapohja: docs/moduulit/yhteiset-pohjat.md (kortti tyylikirja).
- Ortokuvaportti ja havainnemittari: mallit-ja-3d. Pintojen tilaus: grafiikan-tuotanto. Kevennys: suorituskyky-ja-muisti.
- Sävy sovitetaan pelikuvasta ja todetaan laitekuvasta: muisti gltf-savy-leivotaan-tekstuuriin.
- Museon, linnan ja avaruuden oma valo: niiden kortit.
