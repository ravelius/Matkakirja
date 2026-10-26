# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 10.5x, build 13): 73+78, 63, 79 ja linssikerrokset

Testikäännökset: b13i 723206d7 ja b13j 1562bcf9 (juna/b13 + alla olevat haarat), iPhone FB234D08. iPad Pro 11 503000D1:een
b13j asennettiin simctl installilla Laitetestaajan luvalla, ja se sammutettiin heti perään. merge-tree masteria vasten ei
tuottanut konflikteja, ja unity-tarkistus antoi 0 virhettä. Kuvat ovat kansioissa `b13i/` ja `b13j/`.

## natiivi-ui/ylapalkki-73 e0555075 (löydökset 68/73 ja 78)
- Saaren korkeus: Unityn Screen.cutouts ulottuu simulaattorissa ruudun yläreunaan (y 0,3, korkeus 49,7). Saari on nyt
  37/126 leveydestä, ja alareuna pidetään. Loki: "saari (x 137, y 12,5, w 127,7, h 37,5)". Ruudulta mitattu saari on
  y 14–50,3.
- Pilleri ja ☰ ovat saaren korkeudella: palkki keskitti rivin 5,6 pt liian alas, ja korjaus tehtiin alatäytteellä.
  Mitattu ☰ on y 12,5–49,7.
- 78 (omistaja, Fable 25.9.): iPhonen matala palkki 62 → 70 pt (MatalaLisa 8). iPadin palkki 61 → 65, mitattuna iPad
  11:ssä 64 pt (b12 60, web 60). Hyväksytty poikkeama, omistaja 25.9. klo 09.4x.
- Vaaka: palkki on piilossa ja ☰:n paikalla on kolmen väkäsen nappi, josta palkki aukeaa logoineen.
- Kuvat: `b13i/kuvapari-b13-ylapalkki73-iphone.jpg` (web | b13 pysty | vaaka kiinni ja auki),
  `b13i/kuvapari-b13-ylapalkki78-iphone.png` (web 56 | b12 62 | b13 70) ja `b13i/kuvapari-b13-ylapalkki78-ipad.png`
  (web 60 | b12 60 | b13 64).

## natiivi-ui/nahtavyydet-63 c0bc6db9 (löydös 63)
- Aiemmin kuvatun lisäksi korjattiin kolme asiaa. Kohdekartan miniatyyripiirrokset ovat ämpärissä vain webp-muodossa,
  eikä Unity pura WebP:tä, joten Bukarestista puuttui 6/8 piirrosta. Kuvat.cs purkaa nyt webp:n Natiivisepän
  MatkakirjaKuvat_Pura-funktiolla (ImageIO) ja muuntaa alfan suoraksi. KOKORUUTU on webin vaalea pilleri, ja otsikko on
  lehtinimiö NÄHTÄVYYDET. Lokissa ei ole enää yhtään "kuva ei latautunut … webp" -riviä.
- Kuvapari: `b13i/kuvapari-b13-nahtavyydet63-iphone.jpg` (web | ennen | jälkeen).

## natiivi-ui/nostokahva-79 02f2ea05 (löydös 79, omistaja)
- Nostokorttia raahataan vain yläreunan kahvasta: ylärivi, otsikko tai kortin ylin 28 pt. Kuva edellä -kortissa ei ole
  yläriviä, joten siinä kahvana toimii yläkaista. Kahva tunnistetaan osoittimen paikasta, koska ylärivi on
  PickingMode.Ignore. Muu kortti jää vieritykselle ja napautuksille.
- Video: `b13j/video-b13-nostokahva79-iphone.mp4` ja kuvapari `b13j/kuvapari-b13-nostokahva79-iphone.jpg`. Veto kuvan
  keskeltä ei liikuta korttia (kuvat pikselilleen samat). Veto yläkaistalta siirtää korttia +20 / +192 pt, eli täsmälleen
  vedon verran.
- Webissä kahvana on .fokuskohde-ylarivi + .fokuskohde-otsikko (touch-action none), ja muualla kortti on pan-y.

## natiivi-ui/linssikerrokset bf6e86c1 (Linssisepän pariteettiajo b13-linssit, rivit 31/39/41/37)
- Pelikerrokset näytetään linssikohtaisesti webin mukaan. Porttilinssit piilottavat kaiken. Vertailu piilottaa
  matkakirjan, toiminnot ja nostot, mutta maapaneeli jää. Radio piilottaa matkakirjan, toiminnot ja kohteet. Vesistöt,
  maatiedot ja isoisä pitävät kerrokset.
- Testikomento `ui linssi selite auki|kiinni` avaa auki olevan linssin oman selitteen (Linssisepän rivit 12/12b).
- Kuvapari: `b13i/kuvapari-b13-linssikerrokset-iphone.jpg` (web vesistöt | natiivi | web vertailu | natiivi).
- Havainto, ei tässä erässä: natiivin vesistölinssi tummentaa koko ruudun yläpalkkia myöten, kun webissä maasto on
  värikäs ja joet sinisiä. Tämä kuuluu Linssisepälle.

## Tulossa (käännös b13k jonossa)
- natiivi-ui/saaririvi-74e dcffd60a: virtanapit omalle rivilleen vuosiluvun alle, koska b13j:ssä ne peittivät
  vuosiluvun. 74 d2 on todennettu b13j:ssä: kertojan teksti ääriviivoineen pallon päällä (`b13j/n74-arkki.jpg`).
- natiivi-ui/avauskaaro-11 33515600 (Linssisepän rivi 11): aloituslaatikko webin mukaan, eli repaleinen pergamentti,
  musta peite, kapiteelit, anfangi, kultainen Käynnistä ja lyhdyt. Ensimmäinen versio `b13j/kuvapari-b13-avaus11-iphone.jpg`,
  jossa lyhdyt ja leveys on korjattu 33515600:ssa.

## Lisäys klo 12.2x: natiivi-ui/saaririvi-74e dcffd60a (sisältää ihminen-74:n f7918f7, eli 74 a–c ja d2)
- Todennettu b13k:lla (ce7cfb6a): virtanapit (Pää., Eur., Sib., Am., Tyyni) ovat omalla rivillään vuosiluvun alla,
  eikä mikään mene päällekkäin (`b13k/n74e-yla.png`). b13j:ssä napit peittivät vuosiluvun.
- 74 d2 (kertojan teksti ääriviivoineen pallon päällä) on todennettu b13j:ssä: `b13j/n74-arkki.jpg`.
