# Juoksupeli J15/J16 — suunnittelukuvien QA

Tasan kaksi sisäistä image_gen-kutsua, yksi kokonaan uusi kuva per kohde. Ei uusintoja, ei osakorjausta tai API/CLI/Runway-käyttöä. Tämä osatoimitus kattaa vain taskit427/428. Tyyli-/valo-/asuviitteet ovat aiemmat J8–J10-natiivit, eivät uuden kameran pohjia.

Molemmat natiivit1672×941, suhde1.7768331562. Lähellä16:9 mutta eivät täsmälleen16:9 (1672×9 ≠ 941×16). Natiiveja ei skaalattu, rajattu, retusoitu eikä metatietomuokattu: toimitus-PNG on tavuntarkasti sama tiedosto.

## J15

Kamera on aiempaa J8–J10-erää ylempänä ja rajaus selvästi laajempi: useita katottomia huoneita kummallakin rannalla, avoimia oviketjuja ja käytäviä. Kulmaa ei ole kalibroitu asteina. Puyi on selvästi pienempi suhteessa ympäristöön (visuaalinen arvio noin7% kuvan korkeudesta, ei mittakaavavarmennus). Kesäinen valo, keltainen asu, tumma päähine/lettivaikutelma, hyväntuulinen hovi ja hennosti hehkuvat esineet seuraavat viitteitä. Silta ylittää veden yhtenäisellä kannella; pääsillan molemmilla puolilla näkyy pääosin jatkuva kivikaide ja liittyvät rantakaiteet. Puyi juoksee leveällä kannella kaiteiden välissä. Ennen ja jälkeen sillan hahmottuvat vasen/oikea sivureitit huoneisiin; osa ovista ja kauemmista liittymistä peittyy puustoon, joten täydellistä reittigraafia ei ole todennettu. Kaikki taustareunat tai kaiteiden tarkka3D/collision-jatkuvuus eivät ole kuvasta varmennettavissa. Porttipaneelien9×9-nastamäärä ei ole täsmällisesti laskettavissa ja osa näyttää ristikolta tai poikkeavalta ruudukolta: EI QA-passia nastoille. Ei havaittu nykyesineitä, aseita tai putoamista. Kasvillisuus ja kiveys ovat pelikonseptille siistittyjä; veden pienaaltojen ja lehtien tiheässä tekstuurissa on generointiin kuuluvaa toistuvuutta, ei karkeaa kaiverrettua pyörrekuviota.

Natiivi ja toimitus-SHA-256: 4d2577f55d8f64b46f2e8ab171fae8d33da2a6c53702552ff554284586394dd7
Täsmäprompti-SHA-256: 81da3bd728176d4c71152a70b1b538a3330945153392d879a4982263d45409d0

## J16

Laaja korkea yläviisto paljastaa monihuoneisen katottoman kokonaisuuden, oviaukkoja ja risteäviä käytäviä. Kameraero aiempaan näkyy, mutta kamera-astetta ei ole kalibroitu. Leveät matalat portaat nousevat kahdessa selvässä jaksossa väli- ja ylätasanteen kautta muurin leveälle ylätasolle; reitti jatkuu ylhäällä vasemmalle ja oikealle. Pääportaikon kummankin reunan ja pääylätason molempien reunojen kaiteet näkyvät pääosin, lapsen aktiivinen reitti on suojattu. Täsmällistä3D/collision-kaidejatkuvuutta, kaikkia kulmaliittymiä tai taustan kaikkia reunoja ei silti voi varmentaa kuvasta. Pronssiastia keskellä välitasannetta vie kulkutilaa ja on mahdollinen suunnittelun törmäyskohta. Pää-Puyi on pieni keltapukuinen mustapäähineinen juoksija portaiden keskialueella; muut kullansävyiset pystyt hahmot vaikuttavat koristepatsailta/keräilyesineiltä, eikä niitä kirjata lisä-Puyiksi. Hovi seuraa leikkisästi, ei aseita, tikapuita tai näkyvää putoamista. Huoneketjut, sivuovet, pikkupihat ja esineet ovat luettavia, mutta täydellinen saavutettavuus/reittigraafi on todentamatta. Porttien nastoitus näyttää joissakin paneeleissa poikkeavalta eikä9×9-per-lehti ole luotettavasti laskettavissa: EI QA-passia. Kasvisto, kivet ja vesi ovat siistittyä pelikonseptipintaa; pientä säännöllistä yksityiskohtarytmiä on, ei selvää karkeaa kaiverrus-/pyörretekstuuria.

Natiivi ja toimitus-SHA-256: 689800f5530cc866cac064105115eee0bb4a8267568310c3902bb18a6a6daabf
Täsmäprompti-SHA-256: 8dc0599cbf60a78ca6192c20231e81df42495f58635cae4f8d12606aa6a11a8a

## Rajat ja toimitustila

Kaidehavainto on kuvan visuaalinen tarkastus, ei rakenteellinen mittaus, pelitörmäystesti tai kaikkien reunojen turvallisuuden varmennus.9×9-nastoitus ei saa QA-passia kummassakaan kuvassa. Root teki lisäksi oman natiivitarkastuksensa ja samat rajat säilyvät.

Kuvat ovat suunnittelua, eivät varsinaisen pelin toteutusta. Vastaanottajan/omistajan hyväksyntä, pelikytkentä ja julkaisu ovat erillisiä ja todentamatta. Root hoitaa Git-postitoimituksen ja yhteiset ledgerit; tämä osapaketti ei vielä osoita toimitusta. Tivolin tai Pekingin aineistoihin ja taukoihin ei koskettu.
