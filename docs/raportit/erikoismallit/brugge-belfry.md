# Erikoismalli: Bruggen kellotorni (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 0. ELÄMÄNIDEA (omistaja hyväksyi 27.9. klo 07.5x)
- Bruggen Belfort on kaupungin tunnus: 47 kellon kellopeli soi Markt-aukion yllä, ja tornin tunnetuin kuva otetaan reien
  kanavalta (Rozenhoedkaai), jossa kiertoajeluveneet lipuvat porraspäätytalojen ohi. Yöllä torni valaistaan.
- **Perusliike:** kanavavene odottaa laiturilla (20–60 s), liukuu reiellä sillan ali toiseen päähän vanaa jättäen (16 s),
  odottaa (8–25 s), kääntyy (2,2 s) ja palaa.
- **Harvinainen (noin 1/10 matkoista):** kellopeli soi. Kuusi kultaista nuottia nousee kahdeksankulmion kruunusta
  kierteenä 0,5 s:n porrastuksella, kolme kierrosta (noin 11 s, 18 nuottia).
- **Reaktio:** lähestyttäessä odottava vene lähtee. Napautus soittaa kellopelin heti (enintään kerran 20 s:ssa).
- **Yöllä:** tornin eteläpinnat ja lyhdyn kolme kameran puoleista sivua hehkuvat lämpiminä, kruunu hehkuu lyhtynä ja
  sisäpihalla on valoläikkä (valaisematon, ei bloomia, syttyy 1,5 s).

## 1. Tunniste ja paikka
- `kohde:hahmotelma-brugge-belfry`, avain `brugge-belfry`. Belgia, 51,2089 N, 3,224 E, taso 1 (kulttuuri).

## 2. Viitekuvat (Commons)
- Ilmasta: File:1012 Grand-Place of Bruges and Belfry of Bruges Photo by Giles Laurent.jpg (CC BY-SA 4.0, Giles Laurent).
- Etelästä ylhäältä, sama suunta kuin kallistettu kamera: File:1017 Belfry of Bruges Photo by Giles Laurent.jpg
  (CC BY-SA 4.0, Giles Laurent).
- Kanavalta: File:Rozenhoedkaai, Bruges (A. Goethals, 1864).jpg (PD, Albéric Goethals) ja File:1021 Dijver and Belfry
  of Bruges Photo by Giles Laurent.jpg (CC BY-SA 4.0, Giles Laurent).
- Piirros: File:Tower of La Halle with linen Market Bruges (BM 1949,0203.187).jpg (PD, T. Goodman Thomas Allomin mukaan,
  n. 1851), Markt-julkisivu. PD-pohjapiirrosta ei löytynyt. Hallen muoto on Onroerend Erfgoedin inventaariosta (29457):
  epäsäännöllinen suorakulmio ja sisäpiha, itä- ja länsisiivet korkein liuskekatoin ja etelässä avoin arkadigalleria.

## 3. Siluetti ja tunnusmerkit
1. Korkea torni: kaksi neliön muotoista tiilikerrosta (käytävät, neljä kulmatornia ja neljä korkeaa kulmapinaakkelia) ja
   vaalea kahdeksankulmainen hiekkakivilyhty, jonka kruunussa on kaide ja kahdeksan pinaakkelia. Tunnistettavin piirre on
   kaksivärisyys: tumma tiili alhaalla ja vaalea lyhty ylhäällä.
2. U-muotoinen Halle tornin juurella: kaksi pitkää siipeä korkeine lonkkakattoineen ja sisäpiha, jonka pohjoispäässä torni
   seisoo. Etelässä matala vaalea arkadi.
3. Reien kanava kiviranteineen, kivisilta ja kanavavene. Rannalla on neljä flaamilaista porraspäätytaloa.
4. Lähizoomissa näkyvät kellotaulu, kaikuaukot, ikkunat ja joutsenpari.
- Pois jätetään Markt-julkisivun kulmatornit ja parveke, kattoikkunat, tornin koristeaiheet, lippusalko, 87 cm:n kallistus
  sekä Markt ja sen talot.

## 4. Mitat ja koko
- Torni 83 m ja pohja noin 16 × 16 m (arvio ilmakuvasta, suhteutettu Hallen 44 m:n leveyteen). Kahdeksankulmio on
  1480-luvulta. Halle on 44 × 84 m sisäpihoineen, ja harja on kuvista arvioiden noin 25 m.
- Yksikkö: 1,0 ≈ 80 m. Kanava ja talot määräävät leveyden, ja Halle on 0,54 × 0,40 (syvyys lyhennetty 84 m:stä 32 m:iin).
  Torni on 0,19 × 0,19, kruunu 1,09 ja pinaakkelit 1,17, eli pystyliioittelu on noin 1,07. Halle on madallettu 0,19:ään,
  joten torni kohoaa ympäristöstään noin 1,7 kertaa jyrkemmin. Kahdeksankulmio on liioiteltu: 36 % korkeudesta (0,64–1,04)
  ja 0,93 × toisen kerroksen leveys.
- Koko 60 pt (KokoKerroin 1,5). Pohja on x −0,5…0,5 ja z −0,333…0,332, ja juuri on keskellä.
- **Suunta todellinen:** torni on Hallen pohjoispäässä Markt-aukiolla, joten etelästä kallistuva kamera katsoo sisäpihan yli
  torniin. Näkyvissä ovat tornin eteläpinta, kello ja kolme kaikuaukkoa, kuten Oude Burgilta. **Kanava on tyylitelty:**
  Dijver ja Rozenhoedkaai ovat noin 200 m kaakkoon, mutta mallissa reien kulkee Hallen eteläpuolella itä–länsi, jotta
  kuuluisa näkymä kanavasta torniin syntyy kameralle.

## 5. Paletti ja aksentti
- Tiili on lämmin seepia (#8d6d50, toinen kerros #9d7d5d), lyhty hiekkakiveä (#e6dbbf) ja käytävät kivireunaa (#d8c9a6).
  Katot ovat EmKatto räystäskaistalla, aukot tumma #4f4030, vesi EmVesi ja rannat EmKivi. Taloissa on neljä lämmintä
  sävyä, joista yksi kalkittu. Veneen runko on tumma ja sisus vaalea, ja joutsenet ovat EmVaahto.
- Aksentti: kultaiset nuotit (EmKulta), joissa on tumma kaiverrusreuna ja vaalea kimallus. Ne näkyvät vain tapahtumassa.
  Yövalo on EmIkkunavalo ja lyhdyssä vaaleampi #f4d898.

## 6. Animaatio
- **Vene (osa vene):** liuku X-akselilla ±0,36 (smootherstep, 16 s) ja käännös 180° Y:n ympäri 2,2 s:ssa, jolloin keula
  kääntyy etelän kautta kameraa kohti. Vene odottaa länsipäässä 20–60 s ja itäpäässä 8–25 s (siemen noston id:stä).
  Kansi on vedestä 0,03 ylhäällä, joten vene liukuu sillan ali.
- **Vana (osa vana):** seuraa venettä, ja skaala on min(1; 1,6 · 4u(1 − u)) ajon vaiheesta u. Seisova vene ei jätä vanaa.
- **Kellopeli (osat savel0–5, vuorotellen ♪ ja ♫):** pivot on kruunun keskellä. Jokainen nuotti lähtee kultaisen kulman
  (137,5°) verran edellisestä. Kierre loittonee 0,03:sta 0,22:een ja kiertyy 70°, nuotti nousee 0,3 hidastuen, keinuu
  omassa tasossaan ±16° ja syttyy ja hiipuu skaalalla (koko 0,85–1,15). Porrastus on 0,5 s, kierros 3 s, elinaika 2,9 s ja
  kesto 11,4 s. Nuottitaso on kallistettu 45° etelään, joten nuotit näkyvät ylhäältä, 30°:sta ja reunalta.
- **Valot (osat valot, valot1–2 ja kruunu):** Valot(), 1,5 s. Jokaisen osan pivot on hehkun omassa tasossa (eteläpinnan
  juuri, lyhdyn viistosivujen alareuna ja kruunun katto), joten hehku kasvaa pinnassaan juuresta ylös eikä välähdä.
  Suurin askel on 0,042 kehystä kohden.
- Levossa (vene laiturilla, kellopeli hiljaa) piirretään 0 kehystä. Kolmen tunnin testiajossa 58 % kehyksistä oli lepoa,
  ja kellopeli soi 23 matkalla 238:sta (0,10).

## 7. Kolmiot ja LOD
- Runko 831: torni 391 (kerrokset, käytävät, kulmatornit, pinaakkelit, kahdeksankulmio ja kruunu; koristeina ikkunat,
  8 kaikuaukkoa ja kello), Halle 98, kanava 22, silta 56, joutsenet 44 ja talot 4 × 55.
- Osat 212: vene 39, vana 8, nuotit 3 × 17 + 3 × 30, valot 12 + 2 + 2 ja kruunu 8. **Yhteensä 1 043** (Kolmiot0).
- LOD1: ei erillistä (taso 1, rajapinnassa valinnainen).

## 8. Ääriviiva ja perspektiivi
- Ääriviivaosat: torni kokonaisuutena, Halle (molemmat siivet), arkadi, kanava (vesi ja rannat), silta ja jokainen talo.
  Ikkunat, kaikuaukot, kello ja kaaret ovat sisäviivoja kärkiväreinä. Joutsenet ovat liian pieniä ääriviivalle.
- Liikkuvilla osilla ei ole ääriviivaa: vene erottuu tummana vedestä ja nuotit tumman kaiverrusreunansa ansiosta.

## 9. Hyväksyminen
- Kuvat (kuvat/): brugge-belfry-{lepo,tapahtuma,yo}-{ylhaalta,kallistus30,reuna55,kolme,laitekoko}.png ja yövalon
  syttyminen brugge-belfry-yo-syttyy.png. Laitekoko on 60 pt @3x (180 px mallin yksikköä kohden).
- Video 14 s (12 fps, 30°): brugge-belfry-video.mp4. Vene lähtee lähestyttäessä ja liukuu sillan ali, ja kellopeli soi
  3 s:n kohdalla.
