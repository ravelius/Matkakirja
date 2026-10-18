# Juoksupeli J11–J16: suunnittelukuvien QA

Tasan kuusi uutta sisäisen image_genin kutsua, yksi per kuva, ei uusintoja. Huonepohjat ja reitit ovat kuvitteellisia suunnitteluehdotuksia, eivät historiallisten rakennusten mittapiirroksia. Natiivit muuttamatta. Peliä ei toteutettu, eikä Pekingin/Tivolin taukoja muutettu.

Rootin tarkastuksen päärajat: J11 ei ole lähes90° suoraan ylhäältä; porttien9×9-nastoitusta ja kaikkien huoneyhteyksien/toimivan reittigraafin toteutumista ei ole varmennettu. Natiivien suhde on lähellä16:9:ää, ei täsmälleen. Alla kuvakohtaiset havainnot, ei yleistä QA- tai käyttöhyväksyntää.

## part-a-j11-j12

# J11–J12: visuaalinen QA

Tasan kaksi sisäisen image_genin kutsua, yksi per kuva, molemmat onnistuivat. Kokonaan uudet kuvat; vanhoja viitteitä ei muutettu. Kumpikin natiivi on 1672 × 941: vaaka ja lähes 16:9, mutta ei tarkalleen (ero noin 0,053 %). Ei rajausta, retusointia tai pikselimuutoksia. Tekijä katsoi tallennetut natiivit alkuperäiskoossa; root ilmoitti katsoneensa molemmat.

**J11:** laaja kokonainen katoton kortteli, peräkkäisiä ja rinnakkaisia huoneita, kaksi puutarhapihaa sekä risteyksiä ja vaihtoehtoisia väyliä näkyvät. Pieni Puyi erottuu keltaisena juoksijana, hovin hahmoja on eri haaroissa. **Olennainen lähdepoikkeama:** kamera on aiempaa korkeammalla, mutta yhä selvästi yläviisto; lähes 90 asteen suoraan ylhäältä kuvattua pohjapiirrosnäkymää ei saavutettu. Umpikujien, oikoteiden ja kaikkien oviaukkojen yhtenäistä läpikulkua ei varmenneta. Puut ja seinät peittävät osia. Alaportin nastoitus vaikuttaa poikkeavalta; 9 × 9 per ovilehti ei ole laskemalla vahvistettu.

**J12:** kaksi tasoa, parvi/ylägalleria, pitkä pylväskäytävä, tilavat huoneketjut, jyrkät käännökset ja leveät kaiteelliset porrasjaksot näkyvät. Puyi juoksee alatasolla; vartijoita näkyy eri kerroksissa. Portaiden kaikkia tasoliittymiä, yläkäytävän jatkuvuutta ja pelattavia kulkuleveyksiä ei voi varmentaa yhdestä kuvasta. Osa alahuoneista peittyy puiden/parven taakse ja reunat rajautuvat. Laskettavaa 9 × 9 -nastaporttia ei ole varmennettavissa, joten ehtoa ei kuitata täyttyneeksi.

Yleinen kesä-1914-palatsimiljöö ja luonnolliset materiaalipinnat ovat uskottavia suunnittelukuvassa. Moderneja kerrostaloja, aseita, tikkaita tai vaarallisella kattolappeella olevaa lasta ei havaittu. Näkyvät korkeat reitit ovat kaiteellisia, mutta rakenteiden turvallisuutta ei ole simuloitu. Mattoaiheet toistuvat; pienet seinäkalligrafiat, huonejako ja kalusteet ovat keksittyä sisustusta, eivät varmennettuja historiallisia yksityiskohtia. Pienen hahmon lettiä, lohikäärmekirjontaa ja kaikkia ilmeitä ei voi tarkistaa varmasti.

Ei automaattista kokonais-QA-hyväksyntää. Kuvat ovat arviointiehdokkaita; ei omistajahyväksyntää, pelin toteutusta, integraatiota tai julkaisua. Kutsuraja on käytetty.


## part-b-j13-j14

# J13–J14, part B – QA 18.10.2026

Tasan kaksi kutsua, yksi per j13/j14. Molemmat kokonaan uusia muuttamattomia 1672 × 941 RGB-natiiveja. Kuvasuhde on lähes 16:9 (noin 0,053 % kapeampi), ei täsmälleen 16:9. Ei skaalausta, rajausta, retusointia tai uusintaa. Kolme j8–j10-referenssiä katsottiin ja tarkistettiin SHA/tavuilla ennen käyttöä. Promptien täsmätavut säilyvät, kummassakin yksi normaali loppurivinvaihto.

**J13:** aiempaa korkeampi ja laajempi katoton huoneisto. Ylävasemman kirjasto, keskellä keittiön tulisija/kattilat ja oikean makuuhuone tunnistuvat; sivussa on lisää huoneita sekä kirjaston leveät kaideportaat. Kirjasto–keittiö–makuuhuoneen täydellinen peräkkäinen kulkuyhteys ei näy yksiselitteisesti: reitti näyttää kiertävän pihojen kautta ja osa oviaukkojen/paluureittien yhteyksistä jää epäselväksi. Todellista monikerroksista huoneistoa tai navigointiverkkoa ei varmenneta.

**J14:** puutarharisteykset, kiviryhmien ohitukset, keskellä katoton monihuoneinen paviljonki sekä leveät kaiteelliset portaat erottuvat. Paviljongin läpikulku on hahmotettavissa, mutta kaikkia suljettuja paluureittejä ei voi varmentaa puuston, nurkkien ja kuvanreunojen vuoksi.

Puyi on molemmissa pienempi kuin j8–j10:ssä, keltainen kaapu/päähine/letti näkyvät; käsin arvioiden noin 8–9 % kuvan korkeudesta (promptin 3–4 % ei toteudu tarkasti). Hovi kulkee leikkisästi perässä, hahmot ovat pieniä eikä sormia/ilmeitä tai 8 vuoden tarkkaa ikää varmisteta. Näkyvä lapsen reitti on leveällä tasaisella pihalla/polulla; kaiteita näkyy kohotetuissa portaissa ja tasanteissa. Katveiden kaikkia reunoja ei ole fyysisesti tarkistettu.

Kesäinen valo ja vihreys vastaavat referenssejä. Ei ilmeisiä nykyesineitä, turisteja, pyöriä, aseita tai väkivaltaa. Tilat ovat keksittyjä historiallisia suunnitteluratkaisuja, eivät varmennettu vuoden 1914 pohjapiirros. Pieniä hohtavia aikakauden keräilyesineitä näkyy. Porttien tarkkaa 9 × 9-nastoitusta ei voi laskea: näkyvissä on pääosin koriste-/ristikko-ovia, joten nastasääntöä ei merkitä varmistetuksi.

Pinnat ja valo ovat yleistasolla valokuvamaisia, mutta kivien huokosissa, lehdistössä, toistuvassa koristelussa ja etualan pehmennyksessä on generoidun pienoismallin tuntua. Kameran tarkkaa astekulmaa tai pelattavaa reittijatkuvuutta ei ole kalibroitu. **Ei kokonais-QA-passia:** suunnitteluehdokkaat toimitetaan puutteineen vastaanottajan ja omistajan arvioitaviksi. Ei pelin toteutusta, Peking/Tivoli-työtä, mallinnusta tai julkaisua.


## part-c-j15-j16

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
